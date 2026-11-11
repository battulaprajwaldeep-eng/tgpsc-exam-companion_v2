# Memory cards and MCQ mini-batch — 11 November 2026

## Summary
- Added **10 original memory cards** and **10 original MCQs**.
- Paper split in each set: **4 Paper I / 6 Paper II** (40% / 60%).
- Existing memory cards: 74 → **84** (Paper I 28 → 32; Paper II 46 → 52).
- Existing question bank: 1,181 → **1,191** (Paper I 469 → 473; Paper II 712 → 718).
- No paid API, secret, paid dependency, or new runtime dependency added.
- No existing question records were edited or removed.

## Exact official topic mapping

### Paper I (4)
| Topic ID | Official topic | New subtopic |
|---|---|---|
| p1-02 | International Relations and Events | UN Charter Article 4(2): admission of new members |
| p1-06 | Physical, Social and Economic Geography of India | ENSO and Indian summer monsoon rainfall |
| p1-14 | Logical Reasoning; Analytical Ability and Data Interpretation | Fundamental counting principle with positional constraints |
| p1-15 | Basic English (10th class Standard) | Mandative subjunctive after recommendation |

### Paper II (6)
| Topic ID | Official topic | New subtopic |
|---|---|---|
| p2-03 | Combinatorics and Discrete Structures; Graph Theory; Mathematical Logic | Articulation point (cut vertex) |
| p2-09 | Compiler Design | Peephole optimization |
| p2-12 | Information Systems and Software Engineering | Decision table testing |
| p2-14 | Web Technologies | PHP include versus require failure handling |
| p2-15 | OOPS Concepts, Programming in C++ and JAVA | Java generics: type erasure |
| p2-16 | Data Mining | Association-rule conviction |

## Question quality
Each MCQ has four distinct options, a zero-based answer index, four option-specific explanations, an accepted difficulty label, the exact topic ID and official topic title, a subtopic, and a source/basis field. All answer indexes and calculations were independently checked.

## Duplicate audit
- Compared every new stem against all **1,181** existing question stems in the main-branch bank.
- Exact normalized-stem duplicates: **0**.
- Highest lexical Jaccard similarity to an existing stem: **0.278** (below the 0.50 review threshold); all nearest matches were manually reviewed for conceptual distinction.
- Compared all 10 card titles and content against all **74** existing cards.
- Exact card-title duplicates: **0**; highest card-content/title Jaccard similarity: **0.159**.
- First-draft candidates for boundary-value analysis, Apriori downward closure, and loop-invariant code motion were rejected because the existing bank already covered those concepts. They were replaced by decision-table testing, association-rule conviction, and peephole optimization respectively.

## Sources and fact-check basis
- UN Security Council Repertoire, admission of new members (Charter Article 4(2)): https://main.un.org/securitycouncil/en/content/repertoire/membership-united-nations
- UN General Assembly Rules 136–138: https://www.un.org/en/ga/about/ropga/ropga_adms.shtml
- India Meteorological Department, MAUSAM research on ENSO and Indian summer monsoon: https://mausamjournal.imd.gov.in/index.php/MAUSAM/article/view/2557
- India Meteorological Department, ENSO–IOD–MJO interactions and Indian summer monsoon rainfall: https://mausamjournal.imd.gov.in/index.php/MAUSAM/article/view/7811
- Princeton Algorithms, undirected graph bridges and articulation points: https://algs4.cs.princeton.edu/41graph/index.php
- Aho, Lam, Sethi and Ullman, *Compilers: Principles, Techniques, and Tools*, 2nd ed., section on peephole optimization; TITE Compiler Design lecture notes: https://tite.ac.in/assets/frontend/pdf/lecture-notes/btech/4thsem/Compiler-Design-4thsem.pdf
- ISTQB Certified Tester Foundation Level Syllabus v4.0.1, §4.2.3 Decision Table Testing: https://istqb.org/wp-content/uploads/2024/11/ISTQB_CTFL_Syllabus_v4.0.1.pdf
- PHP Manual, include and require: https://www.php.net/manual/en/function.include.php ; https://www.php.net/manual/en/function.require.php
- Oracle Java Tutorials, erasure of generic types: https://docs.oracle.com/javase/tutorial/java/generics/genTypes.html
- eGyanKosh, *Data Mining Fundamentals and Frequent Pattern Mining*, Unit 9, conviction formula: https://egyankosh.ac.in/bitstream/123456789/89133/3/Unit-9.pdf
- Collins English Dictionary, word pattern “recommend”: https://www.collinsdictionary.com/us/dictionary/english/recommend

## Validation performed before PR
- Main-branch question count and card count fetched before drafting.
- Full question-bank JSON parsed and all 1,181 stems screened.
- All 10 question schemas, four-option distinctness, answer indexes, four explanations, accepted difficulty labels, exact official topic IDs/titles, and source/basis fields checked.
- All 10 card titles/content screened against the complete 74-card set.
- Updated memory-tricks inline JavaScript parsed successfully in the V8 syntax check.
- GitHub Actions question-bank validator and regression tests will run on the pull request; their results are reported separately after GitHub completes them.

## Review status
Changes are on a fresh branch and are proposed for review only. **Do not merge this pull request or claim production deployment.**
