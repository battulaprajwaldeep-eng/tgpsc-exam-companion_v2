# Batch 006 — review and quality audit

- Created: 2026-11-08
- Question count: **100 exactly** (40 Paper I, 60 Paper II)
- IDs: `P1-B006-001…040` and `P2-B006-001…060`
- Difficulty: moderate 50, difficult 34, standard 16
- Topic IDs covered: 31 (all 15 Paper I topic IDs and all 16 Paper II topic IDs)

## Topic coverage

- `p1-01` — 3
- `p1-02` — 2
- `p1-03` — 2
- `p1-04` — 2
- `p1-05` — 2
- `p1-06` — 2
- `p1-07` — 2
- `p1-08` — 2
- `p1-09` — 2
- `p1-10` — 3
- `p1-11` — 4
- `p1-12` — 5
- `p1-13` — 5
- `p1-14` — 3
- `p1-15` — 1
- `p2-16` — 6
- `p2-14` — 5
- `p2-15` — 5
- `p2-03` — 5
- `p2-04` — 4
- `p2-08` — 4
- `p2-12` — 4
- `p2-02` — 4
- `p2-05` — 3
- `p2-06` — 3
- `p2-07` — 3
- `p2-09` — 3
- `p2-10` — 3
- `p2-11` — 3
- `p2-13` — 3
- `p2-01` — 2

## Duplicate audit

Compared all 100 final stems against the 681-question live bank and the 400 extracted stems in the prior Batch 001–004 source DOCX files. The final audit found **zero exact stem duplicates**. High lexical matches were reviewed: the Adivasi-history, constitutional-rights, Pembarthi-craft, combinatorics and decidability stems were rephrased or replaced. The remaining graph-theory lexical similarity is not a conceptual duplicate: the new planar-face calculation uses Euler's planar formula, while the earlier item uses the handshaking lemma; they test different properties and calculations.

## Quality checks

- Exactly four distinct options per question.
- Zero-based answer index in the range 0–3.
- Four non-empty, option-specific explanations for every item.
- Accepted difficulty labels only: standard, moderate, difficult.
- All question topic IDs and topic labels sourced from the current `study-data.json`.
- All basis fields identify the corresponding official paper and give a source or standard reference.
- Existing question-bank records are appended without editing their question content.

## Principal source groups

- Union Budget 2026–27 Speech: https://www.indiabudget.gov.in/doc/eb/allsbe.pdf
- Telangana Cabinet releases, November 2026: https://www.telangana.gov.in/news/2026/11/
- PRS Telangana Budget Analysis 2026–27: https://prsindia.org/budgets/states/telangana-budget-analysis-2026-27
- Telangana Budget 2026–27 Intermediate midday-meal report: https://www.newindianexpress.com/states/telangana/2026/Mar/20/telangana-presents-rs-324-lakh-crore-budget-unveils-new-midday-meal-scheme-to-intermediate-students
- Government of Telangana Socio-Economic Outlook 2024: https://des.telangana.gov.in/publications/Socio%20Economic%20Outlook-2024.pdf
- Constitution of India and statutory provisions, including Articles 23, 24, 39A, 131, 243D, 243ZD and 311.
- Technical standards and references: IETF RFC 9110, RFC 2131 and RFC 8200; IEEE 802.1Q; ISO C11 draft N1570; Java Language Specification SE 21; Jakarta Servlet 6.0; CLRS; Sipser; Rosen; Aho et al.; Silberschatz et al.; Patterson and Hennessy; Han, Kamber and Pei.

## Deployment note

This audit concerns the GitHub question bank and repository quality gate. Cloudflare live deployment must be verified separately and is not implied by a successful repository merge.
