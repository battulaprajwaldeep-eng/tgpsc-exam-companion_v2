# Batch 008 — review and audit

- Date: 2026-11-08
- Batch sequence: 008
- Questions: exactly 100
- Paper I: 40
- Paper II: 60
- IDs: `P1-B008-001`–`P1-B008-040`; `P2-B008-001`–`P2-B008-060`
- Difficulty labels: moderate 58; standard 13; difficult 29.
- All 31 official topic IDs are represented.

## Topic coverage

Paper I: `p1-01`: 4, `p1-02`: 4, `p1-03`: 2, `p1-04`: 2, `p1-05`: 2, `p1-06`: 2, `p1-07`: 2, `p1-08`: 2, `p1-09`: 2, `p1-10`: 1, `p1-11`: 4, `p1-12`: 4, `p1-13`: 4, `p1-14`: 2, `p1-15`: 3.

Paper II: `p2-01`: 4, `p2-02`: 4, `p2-03`: 4, `p2-04`: 4, `p2-05`: 3, `p2-06`: 3, `p2-07`: 3, `p2-08`: 4, `p2-09`: 3, `p2-10`: 3, `p2-11`: 2, `p2-12`: 3, `p2-13`: 3, `p2-14`: 5, `p2-15`: 5, `p2-16`: 7.

## Question-level integrity
- Exactly four distinct options per item after NFKC/punctuation normalisation.
- Zero-based answer index in the range 0–3.
- Exactly four non-empty, option-specific explanations for every question.
- Every basis field begins with the matching official Paper I or Paper II syllabus mapping.
- All IDs use the permanent Batch 008 sequence and are unique.
- Candidate structural checks: PASS.

## Duplicate audit
- Exact normalised-stem comparison performed against all 881 questions in the pre-batch live bank.
- Exact normalised-stem comparison performed within the 100-question candidate batch.
- No exact stem duplicates, duplicate candidate stems or ID collisions were found.
- Token-overlap screening was run against the full pre-batch bank. One generic wording overlap was manually reviewed and found to concern a different subject; no substantive high-overlap duplicate remained.
- Published Batch 005, 006 and 007 artifacts were reviewed; their questions are present in the pre-batch bank. The Batch 007 review records the prior comparison against 400 stems extracted from the Batch 001–004 source documents.
- Thirty-eight first-draft candidates were replaced or substantively rewritten during duplicate and quality screening, including overlaps in statistics, graph theory, cache mapping, pointer arithmetic, parsing, TCP/IPv6, clustering and Telangana/current-affairs material.
- The repository's Python near-duplicate validator and CI checks remain the final automated gate.

## Source and fact-check basis
- Current affairs and international relations: ISRO GSLV-F17/EOS-05; IndiaAI/MeitY and PIB summit material; Invest Telangana Next-Gen Life Sciences Policy; Telangana State Portal Tholi Mudda release; Council of the EU EU–India summit; International Solar Alliance; ILO official material.
- Science, disaster management, economy and geography: NASA NISAR mission; UNDRR Sendai Framework; WMO Early Warnings for All; NCERT; World Bank; Telangana Irrigation and CAD Department; Telangana State Profile.
- Telangana history, society, culture and policy: SCERT Telangana; Telangana district portals; Telangana Tourism; Bhu Bharati official portal; Indiramma Indlu scheme pages; T-PRIDE district industry material.
- Constitutional and statutory material: Constitution of India, Articles 16 and 169; Rights of Persons with Disabilities Act, 2016; POCSO Act, 2012; SC/ST (Prevention of Atrocities) Act, 1989.
- Technical material: Ross; Devore; Casella–Berger; Lay; Gallian; Rosen; Mano–Ciletti; Patterson–Hennessy; Stallings; ISO C11 draft N1570; Weiss; CLRS; Russell–Norvig; Sipser; Hopcroft–Ullman; Aho et al.; Silberschatz et al.; Elmasri–Navathe; Pressman–Maxim; Kurose–Ross; IETF RFCs; W3C; PHP Manual; Java Language Specification; C++ working draft; Han–Kamber–Pei; Hastie et al.; Bishop. Exact source/basis details are embedded in each question.

## Validation and publication status
- Candidate structural checks: PASS.
- Exact duplicate and ID-collision audit: PASS.
- Repository Python validator, Node regression tests, JavaScript syntax checks and generator compilation: pending pull-request CI.
- Live-bank counts on branch: 981 total; Paper I 389; Paper II 592.
- Cloudflare deployment: not verified; repository publication and live deployment are separate checks.
