# Batch 010 — review and audit

## Publication candidate
- Batch: 010
- Date: 9 November 2026
- Exactly 100 questions: 40 Paper I and 60 Paper II.
- IDs: `P1-B010-001`–`P1-B010-040`; `P2-B010-001`–`P2-B010-060`.
- Every item has four distinct options, one zero-based answer index, four option-specific explanations, an official syllabus topic ID, accepted difficulty label and a per-question source/basis.

## Pre-publication repository snapshot
- Live bank before append: 1081 questions (429 Paper I; 652 Paper II).
- Study-data source: current `study-data.json`; all 31 official topic IDs were verified.
- Recent published batch history 005–009 and the full live bank were checked.
- The unmerged Batch 004 DOCX in the user's Library was also read in full; 100 question stems were extracted and compared.

## Difficulty distribution
| Label | Questions |
|---|---:|
| Standard | 20 |
| Moderate | 50 |
| Difficult | 25 |
| Advanced | 5 |
| **Total** | **100** |

## Paper I topic coverage
| Topic ID | Questions |
|---|---:|
| p1-01 | 4 |
| p1-02 | 2 |
| p1-03 | 2 |
| p1-04 | 2 |
| p1-05 | 2 |
| p1-06 | 3 |
| p1-07 | 4 |
| p1-08 | 3 |
| p1-09 | 2 |
| p1-10 | 2 |
| p1-11 | 2 |
| p1-12 | 4 |
| p1-13 | 3 |
| p1-14 | 3 |
| p1-15 | 2 |

## Paper II topic coverage
| Topic ID | Questions |
|---|---:|
| p2-01 | 4 |
| p2-02 | 4 |
| p2-03 | 4 |
| p2-04 | 4 |
| p2-05 | 4 |
| p2-06 | 4 |
| p2-07 | 4 |
| p2-08 | 3 |
| p2-09 | 3 |
| p2-10 | 4 |
| p2-11 | 4 |
| p2-12 | 3 |
| p2-13 | 4 |
| p2-14 | 3 |
| p2-15 | 3 |
| p2-16 | 5 |

## Duplicate audit
- Compared all 100 candidates against the complete 1081-question live bank.
- Compared candidates pairwise.
- Compared all candidates against 100 stems extracted from the unmerged Batch 004 DOCX.
- Exact normalized-stem duplicates: 0.
- Candidate-to-candidate exact duplicates: 0.
- High token-overlap matches after manual replacement/review: 0 at the configured same-topic/cross-topic screening thresholds.
- Batch 004 high-overlap candidates requiring replacement: 0 after review.
- Existing production records were preserved; no older question was removed or rewritten.

## Independent calculation and answer-key checks
Recomputed the weighted concentration (22 mg/L), combined tank filling time (9 h), non-revenue-water reduction (20%), Chebyshev bound (1/4), sample-mean variance (0.64), exponential memoryless probability (e^-1), injective function count (60), 8-bit weight-three patterns (56), cache tag width (18 bits), ideal pipeline cycles (104), two's-complement result/overflow, BCD sum, PERT expected time (5 days), bootstrap out-of-bag fraction (approximately 36.8%), and other numeric/formula items. Formal logic, graph properties, C declarations, protocol fields and language-specification claims were checked against the cited references.

## Current-affairs and official source checks
- Telangana Innovation Startup Challenge 2026 portal: launch 29 Oct, applications close 20 Nov, Demo Day 1 Dec 2026.
- Telangana Cabinet decisions published 5 Nov 2026: Indiramma Family Life Insurance Scheme announced with ₹5 lakh cover per family.
- PIB/MoSPI ASI 2024–25 publication: survey period October 2025 to June 2026.
- RBI Current Rates page snapshot at 1:00 p.m. on 9 Nov 2026: policy repo rate 5.50%.
- Telangana State Profile / 2011 Census values: literacy 66.54%, rural population share 61.12%, density 312 persons/km² and decadal growth 13.58%.
- Other Telangana policy, history, culture and statutory items were checked against the government, SCERT, district, India Code and tourism sources recorded in each question's `basis`.

## Representative references
- TISC Telangana 2026: https://tisc.telangana.gov.in/
- Telangana Cabinet decisions, 5 Nov 2026: https://www.telangana.gov.in/news/2026/11/
- PIB/MoSPI ASI 2024–25 release: https://www.pib.gov.in/PressReleasePage.aspx?PRID=2332475
- RBI Current Rates: https://www.rbi.org.in/home.aspx
- Telangana State Profile: https://www.telangana.gov.in/about/state-profile/
- Constitution of India: https://legislative.gov.in/constitution-of-india/
- UN Charter: https://www.un.org/en/about-us/un-charter/full-text
- ICJ Statute: https://www.icj-cij.org/statute
- India Code: https://www.indiacode.nic.in/
- UNEP Ozone Secretariat: https://ozone.unep.org/science/assessment
- SCERT Telangana: https://scert.telangana.gov.in/
- Telangana Tourism: https://tourism.telangana.gov.in/
- IETF RFCs: RFC 768, 791, 792, 1812 and 8446 — https://www.rfc-editor.org/
- W3C XML Namespaces: https://www.w3.org/TR/xml-names/
- PHP Manual: https://www.php.net/manual/
- ECMAScript specification: https://tc39.es/ecma262/
- PostgreSQL multicolumn indexes: https://www.postgresql.org/docs/current/indexes-multicolumn.html
- scikit-learn user guide: https://scikit-learn.org/stable/modules/

## Local pre-publication structural result
- Candidate count: 100
- Paper split: 40 / 60
- Official syllabus topics represented: 31 / 31
- Difficulty distribution: 20 / 50 / 25 / 5
- Missing fields, invalid answer indexes, duplicate options, invalid topic IDs or missing basis/explanations: 0
- Exact duplicates against live bank, candidate set or Batch 004: 0

The repository's Python validator and Node regression tests are required to pass on the pull request before merge.