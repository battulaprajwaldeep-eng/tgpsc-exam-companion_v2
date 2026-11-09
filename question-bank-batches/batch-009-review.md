# Batch 009 — Review and audit

- Date: 2026-11-09
- Exact count: 100 (40 Paper I, 60 Paper II)
- IDs: P1-B009-001..040; P2-B009-001..060
- Live bank before import: 981 questions (389 Paper I, 592 Paper II)
- Topic mapping: all candidates map to official topic IDs in study-data.json.
- Difficulty: {"easy":0,"standard":33,"moderate":37,"difficult":25,"advanced":5}
- Duplicate audit: compared all 100 candidates against all 981 live question stems and pairwise within the candidate batch. No exact duplicates and no token-Jaccard overlaps at or above 0.72 were found. Existing subtopic inventories were also inspected; obvious repeats were replaced before this final pass.
- Structural audit: four distinct options, one integer answer index from 0–3, four non-empty option-specific explanations, accepted difficulty labels and basis identifying the correct official paper syllabus.
- Independently recalculated numerical items: current-account concepts checked against BoP classification; multiplier 4; work-rate 7.2 days; data-sufficiency conclusion; equal-distance average speed 48 km/h; hypergeometric probability 15/28; PDF expectation 2/3; exponential median 2 ln 2; determinant −54; subspace intersection 2; quotient dimension 3; recurrence Θ(n log²n); cache tag 19 bits; risk exposure ₹3 lakh; IPv4 fragment offset 800 bytes; Selective Repeat sequence space 16; entropy and classifier metrics checked from definitions.
- Primary current-affairs sources: ISRO (GSLV-F18/NVS-03; Gaganyaan separation tests); Government of Telangana (Mahila Shakti 553 buses; Bala Bharosa/Pranaam; Amma Adarsha Patashala); Gazette of India MeitY notification G.S.R. 846(E); MoSPI and RBI references.
- Technical references: Ross; Rosen; Axler; CLRS; Mano; Patterson & Hennessy; Sipser; Aho et al.; Silberschatz et al.; Elmasri & Navathe; Pressman; IETF RFCs 791/826/792; W3C XML 1.0; PHP Manual; Java/Jakarta Servlet documentation; ECMAScript/MDN; scikit-learn User Guide.
- Publication gate: GitHub Actions question-bank quality gate and practice-selection regression tests must pass on the PR before merge.
