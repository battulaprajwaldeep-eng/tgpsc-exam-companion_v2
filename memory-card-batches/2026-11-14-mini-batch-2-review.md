# Batch 014 — review and quality audit

- Date: 2026-11-14
- Content: 10 original MCQs and 10 memory cards; Paper I 4 / Paper II 6.
- Difficulty: standard 2, moderate 5, advanced 3.
- IDs: `P1-MEM-20261114-05..08`; `P2-MEM-20261114-07..12`.
- Syllabus mapping: exact IDs and titles checked against `study-data.json`.
- Main-branch snapshot: `7b1f8c550b168726c2b300d04aa19fa99fdb7f22`.
- Bank counts before this proposal: 1,191 (Paper I 473; Paper II 718). Proposed branch counts: 1,201 (Paper I 477; Paper II 724).
- Prior archive review: Batches 005–010 (600 questions) were checked; all 600 archive IDs and normalized stems are already present in the main bank. Batch 004's 100-question DOCX was read in full. Batch 001–003 source DOCX files and both prior 1,000-question practice-bank documents were searched for the new concepts. The older practice bank repeats a generic Montreal Protocol question; this batch instead tests the distinct Kigali HFC phase-down, not the generic Protocol purpose.
- Pending PR screening: open content PRs #8, #27, #58, #59 and #61 were inspected, including changed files and proposed questions/cards. PRs #6 and #60 were reviewed as UI-only changes. Their proposals are treated as already proposed; no pending content is copied. No existing PR was modified or merged.
- Exact normalized-stem duplicates: 0. Candidate stems were screened against the 1,191-question live bank and 230 distinct pending proposals. Highest token-Jaccard similarity: 0.273 (reviewed; no conceptual duplicates). Card titles were checked against the live card set and pending PR card titles; no exact title duplicates.
- Structural checks: four distinct options, one zero-based answer index, four option-specific explanations, accepted difficulty, non-empty subtopic and a basis naming the correct official paper for every question.
- Memory card schema: concept hook, mental scene, common trap and active-recall prompt/answer. One pre-existing sparse-array slot in `memory-tricks.html` was corrected without changing any existing card text, so array length matches the actual number of cards.
- No paid APIs, secrets or dependencies added. No production deployment or merge is claimed.

## Sources checked

1. OpenStax, *University Physics Vol. 2*, first law: https://openstax.org/books/university-physics-volume-2/pages/3-3-first-law-of-thermodynamics
2. Government of India PMO, Kigali Amendment / HFC phase-down: https://www.pmindia.gov.in/en/news_updates/cabinet-approves-ratification-of-kigali-amendment-to-the-montreal-protocol-on-substances-that-deplete-the-ozone-layer-for-phase-down-of-hydrofluorocarbons/
3. Telangana Government, Nirmal District Forest Department: https://nirmal.telangana.gov.in/forest-department/
4. Telangana Tourism, Narayanpet: https://tourism.telangana.gov.in/destinations/narayanpet
5. IIT Kharagpur Virtual Labs, JK flip-flop race-around: https://coa-iitkgp.vlabs.ac.in/exp/synthesis-flip-flops/theory.html
6. Florida International University, centralized daisy-chain bus arbitration: https://users.cs.fiu.edu/~downeyt/cda4101/x-arbiter.htm
7. IIT Kharagpur, view serializability: https://cse.iitkgp.ac.in/~ksrao/pdf/dbms-23/ch18.pdf
8. ANU Centre for Distance Education, Ethernet binary exponential backoff: https://anucde.info/material/202MC24.pdf
9. W3C, XML Schema 1.1 Part 2: https://www.w3.org/TR/2012/REC-xmlschema11-2-20120405/
10. Oracle, Java Language Specification, Chapter 12: https://docs.oracle.com/javase/specs/jls/se7/html/jls-12.html
