#!/usr/bin/env python3
import json, os, re, sys, time, urllib.error, urllib.request
from pathlib import Path
from difflib import SequenceMatcher
ROOT=Path(__file__).resolve().parents[1]
BANK,STUDY,OUT=ROOT/"question-bank.json",ROOT/"study-data.json",ROOT/"generated-batches"
MODEL=os.getenv("GEMINI_MODEL","gemini-3.8-flash")
FALLBACK_MODEL=os.getenv("GEMINI_FALLBACK_MODEL","gemini-3.5-flash-lite")
MODELS_USED=set()
N2,N1=int(os.getenv("BATCH_P2","12")),int(os.getenv("BATCH_P1","8"))
KEY=os.getenv("Gemini_Api_key") or os.getenv("GEMINI_API_KEY")
if not KEY: raise SystemExit("Missing repository secret Gemini_Api_key.")
def call(prompt,tokens=12000):
 # Try the primary model first, then a current stable Flash-Lite fallback
 # if the primary model is temporarily unavailable or rate-limited.
 models=[MODEL]+([FALLBACK_MODEL] if FALLBACK_MODEL and FALLBACK_MODEL!=MODEL else [])
 last_error=None
 for model in models:
  url=f"https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent?key={KEY}"
  body={"contents":[{"role":"user","parts":[{"text":prompt}]}],"generationConfig":{"responseMimeType":"application/json","maxOutputTokens":tokens}}
  data=json.dumps(body).encode()
  for attempt in range(3):
   req=urllib.request.Request(url,data=data,headers={"Content-Type":"application/json"},method="POST")
   try:
    with urllib.request.urlopen(req,timeout=180) as r:
     MODELS_USED.add(model)
     print(f"Gemini response received from {model}")
     return json.loads(r.read().decode())["candidates"][0]["content"]["parts"][0]["text"]
   except urllib.error.HTTPError as e:
    detail=e.read().decode(errors="replace")[:1000]
    last_error=RuntimeError(f"Gemini {model} HTTP {e.code}: {detail}")
    if e.code not in (429,500,502,503,504):
     raise last_error from e
    if attempt<2:
     h=e.headers.get("Retry-After","")
     wait=int(h) if h.isdigit() else 20*(2**attempt)
     print(f"Gemini {model} HTTP {e.code}; retry in {wait}s",file=sys.stderr)
     time.sleep(wait)
    else:
     print(f"Gemini {model} unavailable after retries; trying fallback if configured.",file=sys.stderr)
   except (urllib.error.URLError,TimeoutError) as e:
    last_error=RuntimeError(f"Gemini {model} connection error: {e}")
    if attempt<2:
     wait=20*(2**attempt)
     print(f"Gemini {model} connection issue; retry in {wait}s",file=sys.stderr)
     time.sleep(wait)
 if last_error: raise last_error
 raise RuntimeError("Gemini request failed without a response")
def norm(s): return re.sub(r"[^a-z0-9]+"," ",s.lower()).strip()
def validate(q,p,ids):
 fields={"id","paper","topicId","topic","subtopic","difficulty","stem","options","answer","explanations","basis"}
 if not isinstance(q,dict) or set(q)!=fields:return "incorrect fields"
 if q["paper"]!=p or q["topicId"] not in ids:return "paper/topic mismatch"
 if q["difficulty"] not in ("easy","standard","moderate","difficult","advanced"):return "bad difficulty"
 if not isinstance(q["stem"],str) or len(q["stem"].strip())<35:return "stem too short"
 if not isinstance(q["options"],list) or len(q["options"])!=4 or any(not isinstance(x,str) or not x.strip() for x in q["options"]):return "needs four options"
 if len({norm(x) for x in q["options"]})!=4:return "duplicate options"
 if not isinstance(q["answer"],int) or isinstance(q["answer"],bool) or q["answer"] not in range(4):return "answer must be index 0..3"
 if not isinstance(q["explanations"],list) or len(q["explanations"])!=4 or any(not isinstance(x,str) or len(x.strip())<12 for x in q["explanations"]):return "needs four explanations"
 if not isinstance(q["basis"],str) or "official paper" not in q["basis"].lower():return "missing official syllabus basis"
 if any(not isinstance(q[k],str) or not q[k].strip() for k in ("id","topic","subtopic")):return "missing metadata"
 return None
def main():
 bank=json.loads(BANK.read_text(encoding="utf-8")); study=json.loads(STUDY.read_text(encoding="utf-8")); old=bank["questions"]
 # Include previously merged candidate batches so IDs and duplicate checks remain global.
 for batch_file in sorted(OUT.glob("batch-*.json")):
  try:
   batch=json.loads(batch_file.read_text(encoding="utf-8"))
   old.extend(batch.get("questions",[]))
  except (OSError,json.JSONDecodeError):
   raise SystemExit(f"Cannot safely read prior batch: {batch_file}")
 lists={1:study["syllabus"]["paper1"],2:study["syllabus"]["paper2"]}
 ids={p:{t["id"] for t in arr} for p,arr in lists.items()}
 counts={p:{t["id"]:0 for t in arr} for p,arr in lists.items()}
 maxid={1:0,2:0}
 for q in old:
  p=q.get("paper")
  if p in counts and q.get("topicId") in counts[p]:counts[p][q["topicId"]]+=1
  m=re.fullmatch(r"P([12])-AI-(\d+)",q.get("id",""))
  if m:maxid[int(m.group(1))]=max(maxid[int(m.group(1))],int(m.group(2)))
 desc={p:"\n".join(f'{t["id"]}: {t["title"]} {t.get("details","")} [bank count {counts[p][t["id"]]}]' for t in lists[p]) for p in (1,2)}
 prior="\n".join("- "+q["stem"][:240] for q in old)
 prompt=f"""You are an expert setter for the TGPSC HMWSSB Manager Engineering exam. Return JSON only: {{"questions":[...]}}.
Generate exactly {N2+N1} original MCQs: {N2} Paper II (paper=2), {N1} Paper I (paper=1).
Official Paper II syllabus topics:\n{desc[2]}\nOfficial Paper I syllabus topics:\n{desc[1]}
Each object has exactly: id,paper,topicId,topic,subtopic,difficulty,stem,options,answer,explanations,basis.
Use temporary IDs. Exactly four plausible option strings; answer is zero-based integer; explanations has four option-specific strings. Difficulty easy/standard/moderate/difficult/advanced. Across the batch target approximately 20% easy+standard, 50% moderate, 25% difficult, and no more than 5% advanced; keep advanced items rare and only where the official syllabus supports them. Basis must begin Official Paper I syllabus: or Official Paper II syllabus: and name the area.
Set degree-level exam difficulty, not beginner trivia. Prefer multi-step numerical problems, code tracing, SQL, algorithm/graph reasoning, scenarios and close conceptual distinctions. Stems must be self-contained and unambiguous; specify assumptions, units, indexing and rounding. Exactly one defensible answer. Avoid all/none, vague wording and unsupported current facts. Cover topics broadly, favour underrepresented areas.
Do not copy or lightly modify these existing stems:\n{prior}\nReturn valid JSON only."""
 generated=json.loads(call(prompt))
 qs=generated.get("questions") if isinstance(generated,dict) else None
 if not isinstance(qs,list) or len(qs)!=N1+N2:raise SystemExit("Wrong generated count; withheld.")
 good=[]; errors=[]
 for q in qs:
  p=q.get("paper") if isinstance(q,dict) else None
  err=validate(q,p,ids.get(p,set())) if p in (1,2) else "invalid paper"
  if err:errors.append(f'{q.get("id","?")}: {err}');continue
  s=norm(q["stem"])
  if any(SequenceMatcher(None,s,norm(x["stem"])).ratio()>=0.84 for x in old+good):errors.append(f'{q["id"]}: near duplicate');continue
  good.append(q)
 if errors or len(good)!=N1+N2:raise SystemExit("Local validation failed; withheld:\n"+"\n".join(errors[:25]))
 review_prompt="""Independently fact-check each MCQ for correctness, exactly one answer, calculation/code accuracy, ambiguity, syllabus alignment and all explanations. Approve only if every criterion passes. Return JSON only: {"approved":[indices],"rejected":[{"index":0,"reason":"..."}]}. Questions:\n"""+json.dumps(good,ensure_ascii=False)
 review=json.loads(call(review_prompt,8000)); approved=set(review.get("approved",[])) if isinstance(review,dict) else set()
 if approved!=set(range(len(good))) or review.get("rejected"):raise SystemExit("Independent review failed; withheld: "+json.dumps(review,ensure_ascii=False)[:4000])
 for q in good:
  p=q["paper"];maxid[p]+=1;q["id"]=f"P{p}-AI-{maxid[p]:06d}"
 counts_out={"paper1":sum(q["paper"]==1 for q in good),"paper2":sum(q["paper"]==2 for q in good)}
 if counts_out!={"paper1":N1,"paper2":N2}:raise SystemExit("Incorrect paper split")
 OUT.mkdir(exist_ok=True);stamp=time.strftime("%Y%m%d-%H%M%S",time.gmtime())
 payload={"status":"pending_human_review","models_used":sorted(MODELS_USED),"generated_at_utc":time.strftime("%Y-%m-%dT%H:%M:%SZ",time.gmtime()),"review_note":"Passed schema/duplicate checks and separate Gemini review; human verification is still required before importing.","counts":counts_out,"questions":good}
 path=OUT/f"batch-{stamp}.json";path.write_text(json.dumps(payload,ensure_ascii=False,indent=2)+"\n",encoding="utf-8")
 print(f"Created {path.relative_to(ROOT)}. Not added to live bank.")
if __name__=="__main__":main()
