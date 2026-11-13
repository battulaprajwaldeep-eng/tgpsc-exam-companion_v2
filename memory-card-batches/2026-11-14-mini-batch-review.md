# Batch 013 — 14 November 2026 memory cards and MCQ review audit

- Base main commit: `7b1f8c550b168726c2b300d04aa19fa99fdb7f22`
- Additions: 10 original MCQs and 10 memory cards
- Paper split: 4 Paper I / 6 Paper II (40% / 60%)
- Difficulty: 5 standard / 5 moderate
- Main before: 1201 questions (Paper I 473; Paper II 718); 84 memory cards
- This branch after: 1211 questions (Paper I 477; Paper II 724); 94 memory cards

## Official syllabus coverage

- `p1-02`: 1
- `p1-06`: 1
- `p1-08`: 1
- `p1-11`: 1
- `p2-06`: 1
- `p2-09`: 1
- `p2-12`: 1
- `p2-13`: 1
- `p2-14`: 1
- `p2-16`: 1

## Content notes

- Paper I: ICC complementarity under Rome Statute Article 17; northeast-monsoon rainfall over Tamil Nadu and adjoining southeast India; the Ali Brothers in the Khilafat movement; Article 30(1) and minority educational institutions.
- Paper II: C11 volatile versus atomic synchronization; loop unrolling; UML sequence-diagram lifelines; Stop-and-Wait ARQ utilisation; servlet forward versus redirect; the SVM kernel trick.
- Stop-and-Wait arithmetic was recomputed: for a = 4, U = 1/(1+2a) = 1/9 ≈ 11.1%.
- Article 30(1) was checked against the Government of India's 2025 Constitution edition. Article 29(1), Article 26 and Article 16 are used as distinct distractor provisions.

## Duplicate and pending-PR audit

- Screened against all 1201 main-bank questions.
- Open PR #8: all 237 branch records inspected; 100 questions not present on main were included in duplicate screening.
- Open PR #27: all 781 branch records inspected; 100 alternate stems whose IDs already exist on main were treated as pending proposals and screened.
- Open PR #58 and PR #59: all 20 pending questions and both card sets were screened.
- Open PR #60 changes only the memory-card page styling/rendering; it does not add card data. Open PR #6 changes only quiz-topic styling in `index.html`.
- The published Batch 005–010 archive history is already represented in the main question bank; these records were included through the full main-bank scan.
- Exact candidate ID/stem duplicates: 0. Maximum candidate-to-existing stem token Jaccard similarity: 0.261. Nearest matches were manually reviewed; they test different concepts.
- Duplicate card titles against main and PR #58/#59: 0.
- No existing question, card or open PR was modified. No pending PR was merged.

## Primary references

- ICC, Complementarity and Rome Statute Article 17: https://asp.icc-cpi.int/complementarity
- India Meteorological Department, Northeast Monsoon 2024 seasonal report: https://mausam.imd.gov.in/chennai/mcdata/ne_monsoon_2024.pdf
- INFLIBNET e-content, Non-Cooperation and Khilafat movements: https://ebooks.inflibnet.ac.in/icp01/chapter/non-cooperation-movement/
- Government of India, Legislative Department, Constitution of India (as on 11 November 2025), Article 30(1): https://www.legislative.gov.in/static/uploads/2025/07/359f70a69695affb9d72f8393102bd2e.pdf
- SEI CERT C CON02-C, volatile is not a synchronization primitive: https://cmu-sei.github.io/secure-coding-standards/sei-cert-c-coding-standard/recommendations/concurrency-con/con02-c/
- WG14 N1479, C atomics and volatile rationale: https://www.open-std.org/jtc1/sc22/wg14/www/docs/n1479.htm
- LLVM, loop-unroll optimisation pass: https://www.llvm.org/docs/Passes.html
- Object Management Group, UML 2.5.1 specification: https://www.omg.org/spec/UML/2.5.1/PDF
- NIT Srinagar, Stop-and-Wait ARQ link utilisation notes: https://nitsri.ac.in/Department/Electronics%20%26%20Communication%20Engineering/Unit_III.pdf
- Jakarta Servlet 6.0, RequestDispatcher.forward and HttpServletResponse.sendRedirect: https://jakarta.ee/specifications/servlet/6.0/apidocs/jakarta.servlet/jakarta/servlet/requestdispatcher and https://jakarta.ee/specifications/servlet/6.0/apidocs/jakarta.servlet/jakarta/servlet/http/httpservletresponse
- scikit-learn, Support Vector Machines and kernel functions: https://scikit-learn.org/stable/modules/svm.html

## Validation

- Pre-write checks passed: official topic IDs and labels, unique question IDs, four distinct options, valid answer indexes, four option-specific explanations, difficulty labels and official-syllabus basis fields.
- Card data uses the existing `p/t/hook/scene/trap/q/a` schema and is appended without removing existing cards.
- The Python validator, question-selection regression tests and syntax checks will run in GitHub Actions on this PR.
- This PR is for review only. No merge or production deployment is claimed.
