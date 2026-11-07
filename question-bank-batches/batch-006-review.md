# Batch 006 — independent review and publication audit

- Date: 2026-11-07
- IDs: P1-B006-001…040 and P2-B006-001…060
- Split: 40 Paper I / 60 Paper II
- Difficulty: 20 standard / 50 moderate / 30 advanced
- Pre-import bank: 681 questions (Paper I 269; Paper II 412)
- Post-import: 781 questions (Paper I 309; Paper II 472)

## Topic coverage

- `p1-01`: 3
- `p1-02`: 2
- `p1-03`: 2
- `p1-04`: 3
- `p1-05`: 3
- `p1-06`: 2
- `p1-07`: 2
- `p1-08`: 2
- `p1-09`: 2
- `p1-10`: 3
- `p1-11`: 3
- `p1-12`: 4
- `p1-13`: 3
- `p1-14`: 3
- `p1-15`: 3
- `p2-01`: 3
- `p2-02`: 3
- `p2-03`: 4
- `p2-04`: 3
- `p2-05`: 4
- `p2-06`: 4
- `p2-07`: 4
- `p2-08`: 4
- `p2-09`: 3
- `p2-10`: 4
- `p2-11`: 4
- `p2-12`: 4
- `p2-13`: 4
- `p2-14`: 4
- `p2-15`: 3
- `p2-16`: 5

## Quality review

- All 100 records use the existing production schema and canonical topic IDs from `study-data.json`.
- Every question has four distinct options, a zero-based answer index and four option-specific explanations.
- Difficulty distribution matches the 20/50/30 standard/moderate/advanced target.
- Compared all candidates against the complete 681-question live bank and prior Batch 004. The indexed text extraction yielded 97 stems; the complete DOCX was separately inspected and all 100 question stems were reviewed. Exact duplicates, high lexical matches and conceptual repeats were replaced before finalization.
- Within-batch exact/near-duplicate scan: no flags.
- Independently recomputed numerical answers: continuous-distribution median, coefficient of variation, matrix-rank consistency, PERT estimate, fiscal/revenue deficits, arithmetic mean/median and precision/recall.
- Legal and current-affairs items checked against Constitution, India Code, PIB, MoEFCC and Telangana Government sources. Technical items use standard textbooks, RFCs, W3C/WHATWG and language specifications.

## Primary references

- Census 2027 phase schedule: PIB, April 2026 — https://static.pib.gov.in/WriteReadData/specificdocs/documents/2026/apr/doc2026430860001.pdf
- India NDC 3.0: MoEFCC — https://netzeroindia.moef.gov.in/about
- UNCLOS Article 57: https://www.un.org/depts/los/convention_agreements/texts/unclos/part5.htm
- IMO mandate: https://www.imo.org/en/about/pages/faqs.aspx
- National Green Hydrogen Mission: https://nghm.mnre.gov.in/
- Hyderabad District Census Handbook 2011: https://censusindia.gov.in/nada/index.php/catalog/120/download/130/DH_2011_2805_PART_A_DCHB_HYDERABAD.pdf
- Krishna Basin / Musi tributary report, CWC: https://cwc.gov.in/sites/default/files/krishna-and-tungbhadracompressed.pdf
- TRS formation profile: https://khammam.telangana.gov.in/kcr-profile/
- Andhra Pradesh Reorganisation Act 2014, Section 5: https://upload.indiacode.nic.in/showfile?actid=AC_CEN_5_5_00058_201406_1517807327989&filename=201406.pdf&type=actfile
- POSH Act 2013: https://www.indiacode.nic.in/bitstream/123456789/5561/1/sexual_harassment.pdf
- SC/ST Prevention of Atrocities Act 1989: https://www.indiacode.nic.in/handle/123456789/18896?locale=en
- Telangana culture and crafts: https://www.tourism.telangana.gov.in/page/arts-crafts and https://www.tourism.telangana.gov.in/experience/heritage
- Telangana schemes: https://yadadri.telangana.gov.in/scheme/mission-bhagiratha/ and https://mulugu.telangana.gov.in/schemes/
- Bala Bharosa release: https://www.telangana.gov.in/news/press-releases/2026/01/honble-cm-sri-a-revanth-reddy-participated-in-the-launch-of-bala-bharosa-and-pranamam-schemes-at-jyotirao-phule-praja-bhavan/
- Algorithms: Cormen et al., Introduction to Algorithms; Rosen, Discrete Mathematics and Its Applications.
- Probability/statistics: Ross, A First Course in Probability; Lay, Linear Algebra and Its Applications.
- COA/digital logic: Patterson & Hennessy, Computer Organization and Design; Mano & Ciletti, Digital Design.
- TOC/compiler: Sipser, Introduction to the Theory of Computation; Aho et al., Compilers: Principles, Techniques, and Tools.
- OS/DBMS/software engineering: Silberschatz et al., Operating System Concepts and Database System Concepts; Pressman & Maxim, Software Engineering.
- Networks/web: IETF RFC 791 and RFC 1035; W3C XML 1.0; WHATWG DOM; PHP Manual; Java Language Specification; OMG UML 2.5.1.

## CI and deployment

The repository validator and regression tests are required on the pull request. Cloudflare deployment is a separate check and is not inferred from a GitHub merge.
