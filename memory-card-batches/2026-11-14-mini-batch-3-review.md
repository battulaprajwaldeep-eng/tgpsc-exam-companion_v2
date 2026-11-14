# Memory cards and MCQ mini-batch — 14 November 2026 (Batch 015)

## Summary
- Proposed **10 original MCQs** and **10 memory cards**.
- Split in each set: **4 Paper I / 6 Paper II** (40% / 60%).
- Proposed question-bank count on this branch: **1,201** (Paper I 477; Paper II 724).
- Proposed memory-card count on this branch: **94** (Paper I 36; Paper II 58).
- Base branch: `feat/memory-tricks-visual-learning-aids` (PR #64). This batch is intentionally stacked on PR #64 so the new cards use its topic-specific visual-aid renderer; PR #64 itself is not modified or merged.

## Official syllabus mapping and card visuals

### Paper I — 4
| Topic ID | New subtopic | Visual aid |
|---|---|---|
| p1-01 | International Year of Rangelands and Pastoralists 2026 | Rangelands → pastoralists → stewardship; FAO lead-agency cue |
| p1-03 | Aditya-L1 halo orbit around Sun–Earth L1 | Schematic Sun–L1 halo orbit–Earth diagram, explicitly not to scale |
| p1-04 | IMD heat-wave criteria for plains | Separate departure-from-normal and actual-maximum threshold paths |
| p1-11 | 103rd Constitutional Amendment: EWS provisions | Article 15(6) education / Article 16(6) public-employment comparison |

### Paper II — 6
| Topic ID | New subtopic | Visual aid |
|---|---|---|
| p2-04 | Asynchronous versus synchronous reset | Clock-edge versus immediate-reset timing comparison |
| p2-06 | Signed overflow and unsigned wraparound in C | Side-by-side language-semantics comparison |
| p2-11 | Phantom reads in transaction isolation | Two-transaction predicate-query timeline |
| p2-12 | UML shared aggregation versus composition | Hollow versus filled diamond whole–part notation |
| p2-15 | Java Object.wait and monitor ownership | Wait / notify / monitor-reacquisition sequence |
| p2-16 | Closed versus maximal frequent itemsets | Definition and support-information comparison |

Every card includes a concise hook, plain-English explanation/scene, a specific exam trap, and an active-recall question with answer. The topic-first card data remains in the existing expandable-card schema. The renderer supplies the Learn visual, while the existing Exam Traps, Practice and Quick Revision modes use each card's trap, recall question/answer and hook. Pagination remains six cards per page. All visuals are inline SVG with text captions; no remote image dependency was added.

## MCQ quality and answer checks
- Every question has four distinct options, a valid zero-based answer index, four option-specific explanations, difficulty, exact official topic ID/title, subtopic and source/basis.
- Difficulty distribution: 2 standard, 4 moderate, 4 advanced.
- Paper I facts checked against FAO, ISRO, IMD and Government of India/PIB sources.
- Paper II facts checked against NPTEL/IIT Kharagpur, the WG14 C standard draft and SEI CERT C, PostgreSQL documentation, OMG UML 2.5.1, Oracle Java API documentation, and LMU Munich data-mining lecture notes.

## Duplicate audit
- Main-branch question bank before this batch: **1,191** records (473 Paper I; 718 Paper II).
- Existing main-branch memory cards before this batch: **84**.
- Open content PR proposals screened: PR #8 (100 question records), PR #27 (no question IDs new to current main), PR #58 (10), PR #59 (10), PR #61 (10), PR #62 (10).
- PR #6 is an index/UI change; PR #64 is a Memory Tricks visual-renderer change and contains no new question/card proposals.
- Candidate stems were compared with the complete main bank and all net-new question records in the open content PR branches; no exact stem duplicate, reused question ID or high-similarity stem match was found.
- The 10 card titles/subtopics were checked against the main card set and pending content PR card arrays; no exact title/subtopic duplicate was found.
- Existing questions and existing card text were not edited or removed.

## Source references
- FAO, International Year of Rangelands and Pastoralists 2026: https://www.fao.org/rangelands-pastoralists-2026/about/
- ISRO, Aditya-L1 mission and Sun–Earth L1 halo orbit: https://www.isro.gov.in/Aditya_L1.html
- India Meteorological Department, heat-wave definition/criteria table, 23 October 2024: https://internal.imd.gov.in/press_release/20241023_pr_3356.pdf
- PIB, Ministry of Social Justice and Empowerment, EWS provisions under Articles 15(6) and 16(6), 9 July 2019: https://www.pib.gov.in/PressReleseDetailm.aspx?PRID=1577969
- NPTEL, Digital Electronic Circuits, IIT Kharagpur: https://www.nptel.ac.in/courses/108105132
- ISO/IEC WG14 C11 draft N1570: https://www.open-std.org/jtc1/sc22/wg14/www/docs/n1570.pdf
- SEI CERT C INT32-C: https://cmu-sei.github.io/secure-coding-standards/sei-cert-c-coding-standard/rules/integers-int/int32-c/
- PostgreSQL 18, Transaction Isolation: https://www.postgresql.org/docs/18/transaction-iso.html
- OMG UML 2.5.1 specification: https://www.omg.org/spec/UML/2.5.1/PDF
- Oracle Java SE 8, java.lang.Object wait/notify: https://docs.oracle.com/javase/8/docs/api/java/lang/Object.html
- LMU Munich, Knowledge Discovery and Data Mining 1, frequent-pattern mining, pp. 161–162: https://www.dbs.ifi.lmu.de/Lehre/KDD/WS1920/lecture_notes/KDD1_IV_III_1.pdf

## Review status
This is a review proposal only. It is based on PR #64's feature branch; merge PR #64 first, then retarget/rebase this batch onto main as needed. Other open content PRs #58–#62 also modify the bank/card data, so the batch may need rebasing after those are reviewed. No existing PR was modified, merged or closed, and production deployment is not claimed.
