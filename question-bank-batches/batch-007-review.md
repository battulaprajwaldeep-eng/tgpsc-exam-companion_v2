# Batch 007 — review and audit

- Date: 2026-11-08
- Batch sequence: 007
- Questions: exactly 100
- Paper I: 40
- Paper II: 60
- IDs: `P1-B007-001`–`P1-B007-040`; `P2-B007-001`–`P2-B007-060`
- Difficulty labels: standard 23; moderate 56; difficult 21.
- Syllabus mapping: all 31 official topic IDs are represented; Paper I coverage ranges from 2–4 items per topic, and Paper II has 4 items for p2-01 through p2-12 and 3 items for p2-13 through p2-16.

## Question-level integrity
- Four distinct options per item.
- Zero-based answer index in the range 0–3.
- Four option-specific explanations for every question.
- Source/basis field for every question, beginning with the official Paper I or Paper II syllabus mapping.
- Candidate IDs checked for collision with the pre-existing bank before append.

## Duplicate audit
Compared all 100 candidate stems against:
1. All 781 questions in the live bank immediately before this batch.
2. 400 extracted question stems from the user's prior Batch 001–004 source documents.
3. Candidate-to-candidate exact stem normalisation.

No exact or high-similarity matches remained. Repeated or high-overlap candidates were replaced before the batch artifact was written. The first repository validation pass also caught two option pairs that became identical after Unicode/punctuation normalisation; both option sets and their explanations were corrected before the final quality-gate rerun.

## Source and fact-check basis
- Current affairs: Invest Telangana Global Summit 2026; Telangana Innovation Startup Challenge 2026; PMO BRICS New Delhi Declaration (12 September 2026); India–Italy Joint Declaration (20 May 2026).
- Telangana policy and history: Invest Telangana TG-iPASS and Telangana Rising pages; Telangana State Portal tribute to Chityala Ilamma; SCERT Telangana Social Studies; Department of Heritage Telangana; Telangana Tourism.
- Constitutional/statutory material: Legislative Department Constitution of India; India Code Transgender Persons (Protection of Rights) Act, 2019; India Code Rights of Persons with Disabilities Act, 2016.
- Technical material: OpenStax; Rosen; Lay; Mano; Patterson–Hennessy; ISO C11 draft N1570; CLRS; Sipser; Aho et al.; Silberschatz et al.; Elmasri–Navathe; Pressman–Maxim; IETF RFC 9293, RFC 3022 and RFC 4271; WHATWG Fetch/DOM; W3C CSP; C++ working draft; Java Language Specification; Han–Kamber–Pei.

## Independent answer review
- Numerical checks: uniform variance, exponential memoryless probability, sample-mean standard error, joint-density marginal, modular arithmetic, vector-span dimension, set/function counts, graph counts, Amdahl limit, heap/knapsack/sorting complexities, C structure layout, Venn count, percentage change and classifier specificity.
- Technical checks: decoder output, Johnson counter state count, IEEE binary32 fields, RAID 5 tolerance, AVL rotation, C realloc failure handling, automata class distinctions, basic-block leaders, loop-invariant motion, liveness, OS scheduling/journaling/IPC/Clock replacement, 4NF, outer join, cascadeless schedules, materialized views, function-point categories, spiral model, UML use-case relations, TCP handshake, PAT, BGP, CORS, CSP, DOM bubbling, C++ move constructor, Java generic invariance and checked-exception overriding, PCA and single linkage.
- Government facts checked against the cited official sources; source links are embedded in each question's `basis` field.

## Repository quality gate
- Initial validator run caught two option pairs that collapsed under Unicode/punctuation normalisation; both were replaced with distinct wording and matching explanations.
- The near-duplicate scan now uses mathematically safe `real_quick_ratio()` and `quick_ratio()` upper-bound filters before the full SequenceMatcher calculation. The 0.92 warning threshold and detection semantics are unchanged.
- Subsequent PR #30 quality gate passed: `python scripts/validate_question_bank.py`, `node question-bank-tests.js`, `node --check study-tracker.js`, `node --check live-dashboard.js`, and `python -m py_compile scripts/generate_question_batch.py`.
- A final metadata/audit-note update is being rechecked by the same required workflows before merge.

## Live bank counts after append on branch
- Total: 881
- Paper I: 349
- Paper II: 532
- Target remains 3,500 (1,500 Paper I + 2,000 Paper II).
