# Batch 008 — review and audit

- Date: 2026-11-08
- Batch sequence: 008
- Questions: exactly 100
- Paper I: 40
- Paper II: 60
- IDs: `P1-B008-001`–`P1-B008-040`; `P2-B008-001`–`P2-B008-060`
- Difficulty labels: moderate 54; standard 17; difficult 29.
- Syllabus mapping: all 31 official topic IDs in `study-data.json` are represented. Topic counts are recorded in the JSON artifact.

## Question-level integrity
- Four distinct options per item after NFKC/punctuation normalisation.
- Zero-based answer index in the range 0–3.
- Four option-specific explanations for every question.
- Source/basis field for every question, beginning with the official Paper I or Paper II syllabus mapping.
- IDs use the permanent Batch 008 sequence and do not collide with existing bank IDs.

## Duplicate audit
- Exact normalized-stem comparison performed against all 881 questions in the current live bank.
- Candidate-to-candidate exact normalized-stem comparison performed across all 100 new questions.
- Prior published batch artifacts 005–007 were confirmed in the repository and their questions are included in the live-bank comparison.
- Conceptual screening was performed against the existing topic inventory and recent batch stems; candidates were selected to test distinct facts, procedures, formulas or algorithms rather than paraphrasing prior items.
- No exact stem duplicates or ID collisions were found in the pre-append check. The repository validator's near-duplicate warnings and CI review remain authoritative final gates.

## Source and fact-check basis
- Current affairs and international relations: ISRO GSLV-F17/EOS-05; IndiaAI/MeitY and PIB summit material; Invest Telangana Life Sciences Policy; Telangana State Portal Tholi Mudda release; Council of the EU EU–India summit; ILO Constitution; ICC Rome Statute.
- Science, disaster management, economy and geography: NASA NISAR mission; UNDRR Sendai Framework; WMO Early Warnings for All; NCERT; World Bank; Telangana Irrigation and CAD Department; Telangana State Profile.
- Telangana history, society and policy: SCERT Telangana; Telangana district portals; Telangana Tourism; Bhu Bharati official portal; Indiramma Indlu scheme pages; T-PRIDE district industry material.
- Constitutional and statutory material: Constitution of India, Articles 16 and 169; Rights of Persons with Disabilities Act, 2016; POCSO Act, 2012; SC/ST (Prevention of Atrocities) Act, 1989.
- Technical material: Ross; Devore; Casella–Berger; Lay; Gallian; Rosen; Mano–Ciletti; Patterson–Hennessy; Stallings; ISO C11 draft N1570; Weiss; CLRS; Russell–Norvig; Sipser; Hopcroft–Ullman; Aho et al.; Silberschatz et al.; Elmasri–Navathe; Pressman–Maxim; Kurose–Ross; IETF RFCs; W3C; PHP Manual; Java Language Specification; C++ working draft; Han–Kamber–Pei; Hastie et al.; Bishop. Exact source/basis details are embedded in each question.

## Validation status
- Candidate-level schema, option uniqueness, answer-index, explanation-count, source-prefix, syllabus-ID, ID-collision and exact-stem checks: PASS.
- Repository Python validator, Node regression tests, PR checks and live-bank count verification: pending final PR/CI.
- Cloudflare deployment: not verified by this review.
