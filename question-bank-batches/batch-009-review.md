# Batch 009 — Review and audit

- Date: 2026-11-09
- Exact count: 100 (40 Paper I, 60 Paper II)
- IDs: P1-B009-001..040; P2-B009-001..060
- Live bank before import: 981 questions (389 Paper I, 592 Paper II); after import: 1,081 (429 Paper I, 652 Paper II).
- Topic mapping: all 31 official topic IDs are represented; every candidate maps to the corresponding ID in study-data.json.
- Difficulty distribution: {"standard":20,"moderate":50,"difficult":25,"advanced":5} (20% standard, 50% moderate, 25% difficult, 5% advanced).
- Duplicate audit: compared all 100 candidates against all 981 pre-existing live stems and pairwise within the batch. No exact duplicates and no token-Jaccard overlap at or above 0.72 were found. A candidate on CFL intersection with regular languages was replaced with a distinct Chomsky Normal Form question after a duplicate was detected in the first pass. Other subtopic overlaps were reviewed and replaced where necessary.
- Structural audit: four distinct options, one integer answer index 0–3, four non-empty option-specific explanations, accepted difficulty labels and basis identifying the correct official paper syllabus.
- Independently recalculated numerical items: current-account classification; multiplier 4; average speed 48 km/h; work-rate 7.2 days; data-sufficiency conclusion; hypergeometric probability 15/28; PDF expectation 2/3; exponential median 2 ln 2; determinant −54; subspace intersection 2; quotient dimension 3; recurrence Θ(n log²n); cache tag 19 bits; risk exposure ₹3 lakh; IPv4 fragment offset 800 bytes; Selective Repeat sequence space 16; balanced accuracy 0.70. Conceptual/legal/current-affairs items were checked against the source/basis references.
- Primary current-affairs references: ISRO GSLV-F18/NVS-03 (28 Oct 2026) and Gaganyaan CM-SM separation test (16 Oct 2026); Government of Telangana Mahila Shakti buses (9 Jun 2026), Bala Bharosa/Pranaam (12 Jan 2026), Amma Adarsha Patashala; Gazette of India MeitY notification G.S.R. 846(E) (13 Nov 2025).
- Other official references: UN Charter and ICJ Statute; Constitution of India; Disaster Management Act 2005; RTE Act 2009; RPwD Act 2016; UNESCO Ramappa page; Department of Heritage Telangana; Telangana State Song source; K. Chandrashekar Rao profile from Khammam District; RBI/IMF balance-of-payments references.
- Technical references: Ross; Rosen; Axler; CLRS; Mano; Patterson & Hennessy; Sipser; Aho et al.; Silberschatz et al.; Elmasri & Navathe; Pressman; IETF RFCs 791/826/792; W3C XML 1.0; PHP Manual; Java/Jakarta Servlet documentation; ECMAScript/MDN; scikit-learn User Guide.
- Post-merge fact-check correction: ISRO's GSLV-F18/NVS-03 mission page is dated 28 Oct 2026 (not 30 Oct); the question and source basis were corrected. The arithmetic-right-shift explanation was also corrected to show the proper intermediate byte value.
- Publication gate: GitHub Actions question-bank quality gate and practice-selection regression tests must pass on the correction PR before merge.
