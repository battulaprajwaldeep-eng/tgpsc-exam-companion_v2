# Batch 005 review and import audit

- Date: 2026-11-07
- Added: exactly 100 original MCQs (40 Paper I, 60 Paper II).
- Sequence: Batch 005. Batch 004 was already generated as a separate DOCX and was included in prior-batch overlap screening; Batch 003 is the latest imported batch before this change.
- Starting live bank: 581 questions (229 Paper I, 352 Paper II); question-bank.json SHA 9cf72786675302c98b4f07fc893d811d0c171829.
- Official syllabus source: study-data.json SHA 653d4552289ee7686da393d8b576a87ea9c8285d; every topic ID and display title was read from its official Paper I/Paper II syllabus array.
- New bank count after append: 681 (269 Paper I, 412 Paper II); target remains 3,500 (1,500 Paper I; 2,000 Paper II).
- Difficulty counts: {"moderate":49,"standard":27,"difficult":24}.
- Topic coverage: {"p1-01":4,"p1-02":3,"p1-03":3,"p1-04":3,"p1-05":3,"p1-06":2,"p1-07":2,"p1-08":2,"p1-09":2,"p1-10":4,"p1-11":3,"p1-12":3,"p1-13":3,"p1-14":2,"p1-15":1,"p2-01":3,"p2-02":3,"p2-03":4,"p2-04":3,"p2-05":3,"p2-06":4,"p2-07":4,"p2-08":3,"p2-09":3,"p2-10":4,"p2-11":4,"p2-12":4,"p2-13":4,"p2-14":4,"p2-15":3,"p2-16":7}.
- Duplicate audit: no reused IDs, exact stem matches or high-overlap matches at the 0.42 token-Jaccard review threshold against the complete 581-question live bank. No high-overlap matches were found against 97 Batch 004 DOCX stems extracted by the document reader. Conceptual near-duplicates detected in the first draft were replaced before this artifact was prepared.
- Every item has four distinct options, one zero-based answer index, four option-specific explanations, an official syllabus mapping and a concise basis/source field.
- Current-affairs references include ISRO/PIB NVS-03 mission note (30 October 2026; PIB factsheet 1 November 2026), MoSPI PLFS 2025 Annual Report, and Government of Telangana pages for Indira Mahila Shakti, Rythu Bharosa, Gruha Jyothi and Cheyutha.
- Other references include the Constitution of India (Legislative Department 2025), RPwD Act 2016 section 2(r), UNFCCC Paris Agreement, UNDRR Sendai Framework, Telangana Tourism/state culture pages, IETF RFCs, W3C XML 1.0, Java Language Specification 21 and standard university/open textbooks cited per question.
- Pre-upload structural checks: PASS for 100/100 records. Repository Python validator and Node regression tests remain to be confirmed by GitHub Actions on the pull request.
- No unrelated application or study-data files were changed.
