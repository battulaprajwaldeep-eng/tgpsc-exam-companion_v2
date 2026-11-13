# Batch 012 — second 13 November mini-batch review audit

- Date: 2026-11-13
- Additions: 10 original MCQs and 10 memory cards; 4 Paper I / 6 Paper II
- Difficulty: 3 standard / 7 moderate
- Base main commit: `7b1f8c550b168726c2b300d04aa19fa99fdb7f22`
- Before: 1,191 questions (473 Paper I, 718 Paper II), 84 memory cards
- After this branch: 1,201 questions (477 Paper I, 724 Paper II), 94 memory cards

## Official syllabus coverage

- `p1-01` — Current affairs – Regional, National and International: 1
- `p1-02` — International Relations and Events: 1
- `p1-03` — General Science; India’s Achievements in Science and Technology: 1
- `p1-06` — Physical, Social and Economic Geography of India: 1
- `p2-07` — Algorithms: 1
- `p2-08` — Theory of Computation: 1
- `p2-11` — Databases: 1
- `p2-13` — Computer Networks: 1
- `p2-14` — Web Technologies: 1
- `p2-16` — Data Mining: 1

## Content

- Paper I: Telangana ITIs upgraded to Advanced Technology Centres (11 November 2026); WTO national treatment under GATT Article III; Zener-diode voltage regulation; positive IOD sea-surface-temperature pattern.
- Paper II: amortized stack MULTIPOP; NPDA acceptance-mode equivalence; safe tuple relational calculus; digital signatures; JSP `findAttribute` scope order; DBSCAN core-point threshold.
- IOD tests the SST pattern only; no deterministic monsoon outcome is implied. PDA equivalence is specifically for NPDAs, not DPDAs. DBSCAN `min_samples` includes the point itself.

## Duplicate and pending-PR audit

- Screened against all 1,191 main-bank questions; 600 published archive questions from Batches 005–010; all 237 records on open PR #8's stale branch; all 781 records on open PR #27's stale branch; and all 10 questions plus 10 cards in open PR #58.
- All 600 published archive records matched main by ID and stem.
- PR #27 has 100 Batch 006 proposals whose IDs also exist on main but whose stems differ from the current main records; all 100 were treated as pending and screened. The PR remains untouched.
- PR #8 contains 100 questions not present on main; all were included in screening.
- PR #58 contains 10 new questions and 10 cards; this batch uses distinct concepts and titles. PR #58 remains untouched.
- PR #6 changes only quiz topic-label styling and contains no question/card content.
- Exact candidate ID/stem duplicates: 0. Highest candidate-to-existing-question token Jaccard similarity: 0.250; nearest matches were manually reviewed and test different concepts.
- Duplicate memory-card titles against main and PR #58: 0.
- No existing questions or open PRs were modified.

## Primary references

- Telangana State Portal, 11 November 2026 (ITIs upgraded to ATCs): https://www.telangana.gov.in/news/press-releases/2026/11/honble-cm-sri-a-revanth-reddy-participates-in-national-education-day-minorities-welfare-day-program-on-the-occasion-of-maulana-abul-kalam-azad-jayanti-at-sevalal-banjara-bhavan-banjara-hills-hyd/
- WTO, GATT 1994 Article III: https://www.wto.org/english/docs_e/legal_e/gatt47_e.htm
- Electronics Textbook, Zener diodes: https://www.allaboutcircuits.com/textbook/semiconductors/chpt-3/zener-diodes/
- India Meteorological Department, Indian Ocean Dipole: https://mausam.imd.gov.in/event/innovation.php
- Princeton / Kleinberg–Tardos, MULTIPOP amortized analysis: https://www.cs.princeton.edu/~wayne/kleinberg-tardos/pdf/AmortizedAnalysis.pdf
- Columbia University, PDA acceptance modes: https://www.cs.columbia.edu/~aho/cs3261/Lectures/L8-PDA.html
- Silberschatz, Korth and Sudarshan, Database System Concepts, Chapter 27, safety of expressions: https://codex.cs.yale.edu/avi/db-book/online-chapters-dir/27.pdf
- NIST CSRC, Digital Signature glossary: https://csrc.nist.gov/glossary/term/digital_signature
- Jakarta Server Pages API, JspContext.findAttribute: https://jakarta.ee/specifications/pages/3.0/apidocs/jakarta/servlet/jsp/JspContext.html
- Scikit-learn, DBSCAN core-sample definition: https://scikit-learn.org/stable/modules/clustering.html#dbscan

## Validation

Pre-write checks passed for unique IDs, exact syllabus labels, paper mapping, four distinct options, answer indexes, four option-specific explanations, difficulty labels, basis/source fields and card schema. Repository CI and Cloudflare preview checks must be checked on this PR. No merge or production deployment is claimed.
