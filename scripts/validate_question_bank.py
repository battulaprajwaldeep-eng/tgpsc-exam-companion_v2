#!/usr/bin/env python3
"""Validate the live TGPSC question bank and pending JSON batches.

Exit code 0 means structural integrity passed. Near-duplicate matches are
reported as warnings for human review and never silently removed.
"""
import argparse
import json
import re
import sys
import unicodedata
from difflib import SequenceMatcher
from pathlib import Path

DIFFICULTIES = {"easy", "standard", "moderate", "difficult", "advanced"}
FIELDS = {"id", "paper", "topicId", "topic", "subtopic", "difficulty",
          "stem", "options", "answer", "explanations", "basis"}


def load_json(path):
    try:
        return json.loads(Path(path).read_text(encoding="utf-8"))
    except Exception as exc:
        raise ValueError(f"{path}: cannot parse JSON: {exc}") from exc


def normalize(value):
    value = unicodedata.normalize("NFKC", str(value or "")).casefold()
    # Preserve mathematical operators so distinct answer choices such as V+E
    # and V-E, A'B and AB, or |A|+|B| and |A|-|B| stay distinct.
    value = value.replace("−", "-").replace("–", "-").replace("×", "*").replace("÷", "/")
    operators = r"[+\-*/=<>|^%~!'′¬⊕⊙∧∨∩∪≤≥≠→←]"
    value = re.sub(rf"\s*({operators})\s*", r"\1", value)
    value = re.sub(rf"[^\w{operators[1:-1]}]+", " ", value, flags=re.UNICODE)
    return re.sub(r"\s+", " ", value).strip()


def question_list(payload, label):
    questions = payload if isinstance(payload, list) else payload.get("questions") if isinstance(payload, dict) else None
    if not isinstance(questions, list):
        raise ValueError(f"{label}: expected an array or an object with a questions array")
    return questions


def validate_question(q, index, topics, errors, label):
    where = f"{label} question #{index}"
    if not isinstance(q, dict):
        errors.append(f"{where}: must be an object")
        return
    missing = FIELDS - set(q)
    extra = set(q) - FIELDS
    if missing:
        errors.append(f"{where}: missing fields {sorted(missing)}")
    if extra:
        errors.append(f"{where}: unexpected fields {sorted(extra)}")
    if q.get("paper") not in (1, 2):
        errors.append(f"{where}: paper must be 1 or 2")
        return
    paper = q["paper"]
    topic_id = q.get("topicId")
    if topic_id not in topics[paper]:
        errors.append(f"{where}: topicId {topic_id!r} is not in official Paper {paper} syllabus")
    # topicId is the canonical syllabus key. Historical bank entries may use
    # shortened display labels, so do not invalidate them for harmless wording.
    for key in ("id", "topicId", "topic", "subtopic", "stem", "basis"):
        if not isinstance(q.get(key), str) or not q[key].strip():
            errors.append(f"{where}: {key} must be a non-empty string")
    if q.get("difficulty") not in DIFFICULTIES:
        errors.append(f"{where}: unsupported difficulty {q.get('difficulty')!r}")
    options = q.get("options")
    if not isinstance(options, list) or len(options) != 4 or any(not isinstance(x, str) or not x.strip() for x in options):
        errors.append(f"{where}: exactly four non-empty options are required")
    elif len({normalize(x) for x in options}) != 4:
        errors.append(f"{where}: options contain duplicates after normalization")
    answer = q.get("answer")
    if isinstance(answer, bool) or not isinstance(answer, int) or answer not in range(4):
        errors.append(f"{where}: answer must be integer index 0..3")
    explanations = q.get("explanations")
    if not isinstance(explanations, list) or len(explanations) != 4 or any(not isinstance(x, str) or not x.strip() for x in explanations):
        errors.append(f"{where}: four non-empty option-specific explanations are required")
    roman = "I" if paper == 1 else "II"
    basis = q.get("basis", "")
    if not isinstance(basis, str) or not re.search(rf"(?:official\s+)?paper\s+{roman}\b", basis, re.IGNORECASE):
        errors.append(f"{where}: basis must identify Paper {roman} syllabus")


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--bank", default="question-bank.json")
    parser.add_argument("--study", default="study-data.json")
    parser.add_argument("--batch-dir", default="generated-batches")
    args = parser.parse_args()

    bank = load_json(args.bank)
    study = load_json(args.study)
    live = question_list(bank, args.bank)
    topics = {
        1: {x["id"]: x["title"] for x in study["syllabus"]["paper1"]},
        2: {x["id"]: x["title"] for x in study["syllabus"]["paper2"]},
    }
    errors, warnings = [], []
    ids, stems = {}, {}
    for i, q in enumerate(live, 1):
        validate_question(q, i, topics, errors, "live bank")
        if not isinstance(q, dict):
            continue
        qid = q.get("id")
        stem = normalize(q.get("stem"))
        if qid:
            if qid in ids:
                errors.append(f"duplicate question ID {qid!r} in live bank")
            ids[qid] = True
        if stem:
            if stem in stems:
                warnings.append(f"pre-existing exact duplicate in live bank: {qid!r} and {stems[stem]!r}")
            else:
                stems[stem] = qid
    batch_count = 0
    batch_root = Path(args.batch_dir)
    if batch_root.exists():
        for path in sorted(batch_root.glob("*.json")):
            payload = load_json(path)
            batch = question_list(payload, str(path))
            batch_count += len(batch)
            for i, q in enumerate(batch, 1):
                validate_question(q, i, topics, errors, str(path))
                if not isinstance(q, dict):
                    continue
                qid, stem = q.get("id"), normalize(q.get("stem"))
                if qid and qid in ids:
                    errors.append(f"{path}: question ID {qid!r} already exists in live/earlier batch")
                if qid:
                    ids[qid] = True
                if stem and stem in stems:
                    errors.append(f"{path}: exact duplicate stem for {qid!r}; existing ID {stems[stem]!r}")
                if stem:
                    stems[stem] = qid

    # Similarity is deliberately advisory; a human must decide conceptual overlap.
    all_q = live[:]
    if batch_root.exists():
        for path in sorted(batch_root.glob("*.json")):
            all_q.extend(question_list(load_json(path), str(path)))
    normalized = [(q.get("id", "?"), normalize(q.get("stem"))) for q in all_q if isinstance(q, dict)]
    for i, (qid, stem) in enumerate(normalized):
        if not stem:
            continue
        for other_id, other_stem in normalized[i + 1:]:
            if other_id != qid and other_stem and SequenceMatcher(None, stem, other_stem).ratio() >= 0.92:
                warnings.append(f"possible near-duplicate: {qid} ↔ {other_id}")

    if errors:
        print("QUESTION BANK VALIDATION FAILED")
        for item in errors:
            print("ERROR:", item)
        return 1
    p1 = sum(q.get("paper") == 1 for q in live if isinstance(q, dict))
    p2 = sum(q.get("paper") == 2 for q in live if isinstance(q, dict))
    print(f"PASS: {len(live)} live questions ({p1} Paper I, {p2} Paper II); {batch_count} pending batch questions checked.")
    if warnings:
        print(f"REVIEW: {len(warnings)} possible near-duplicate pairs (advisory only):")
        for item in warnings[:100]:
            print("WARNING:", item)
    else:
        print("PASS: no high-similarity pairs detected.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
