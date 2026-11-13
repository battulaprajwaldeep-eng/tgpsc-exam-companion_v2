# Batch 011 — memory cards and MCQ review audit

- Date: 2026-11-13
- IDs: P1-MEM-20261113-01…04 and P2-MEM-20261113-01…06
- Additions: 10 original MCQs and 10 memory cards
- Split: 4 Paper I / 6 Paper II (40% / 60%)
- Difficulty: 3 standard / 7 moderate
- Pre-import bank: 1191 questions (Paper I 473; Paper II 718)
- Post-import bank: 1201 questions (Paper I 477; Paper II 724)
- Memory cards: 84 before; 94 after

## Exact syllabus coverage

- `p1-05`: 1
- `p1-09`: 1
- `p1-11`: 1
- `p1-13`: 1
- `p2-01`: 1
- `p2-02`: 1
- `p2-03`: 1
- `p2-05`: 1
- `p2-06`: 1
- `p2-10`: 1

## Content notes

- Paper I: crowding-out effect in public finance; Operation Polo and Hyderabad State integration; Article 46 and weaker sections; Telangana's RARE initiative and Kodangal Industrial Hub.
- Paper II: point probability for continuous random variables; counting binary relations; ordinary generating functions; write-invalidate cache coherence; two-stack queue amortized complexity; paging internal fragmentation.
- The Article 46 item tests the Directive Principle on educational and economic interests of weaker sections; it is distinct from the existing Article 39A free-legal-aid item. The RARE/Kodangal item is separate from earlier Telangana scheme questions.
- All 10 MCQs use canonical topic IDs from `study-data.json`, four distinct options, a zero-based answer index and four option-specific explanations.
- All 10 memory cards use the existing `p/t/hook/scene/trap/q/a` schema and preserve existing cards.

## Duplicate and correctness review

- Compared candidate IDs and normalized stems against the complete 1191-question live bank: no exact ID or stem duplicates.
- Reviewed nearest lexical matches manually. Related vocabulary (continuous-density questions, stack/queue questions, and constitutional commission article numbers) represents different tested concepts, not repeated questions.
- Checked card titles against all 84 existing cards: no duplicate titles.
- Recomputed: 2^9 = 512 binary relations; ordinary generating function for a_n=n is x/(1-x)^2 for |x|<1; a 10 KiB process on 4 KiB pages needs three pages and leaves 2 KiB internal fragmentation.
- Current Telangana policy facts checked against the official Telangana State Portal. Constitutional article checked against the Government of India's Legislative Department. Technical facts checked against university-level notes/textbooks listed below.

## Primary references

- Telangana Government, RARE / Kodangal Industrial Hub release, 7 November 2026: https://www.telangana.gov.in/news/press-releases/2026/11/%E0%B0%95%E0%B1%8A%E0%B0%A1%E0%B0%82%E0%B0%97%E0%B0%B2%E0%B1%8D%E0%B0%A8%E0%B1%81-%E0%B0%AA%E0%B0%BE%E0%B0%B0%E0%B0%BF%E0%B0%B6%E0%B1%8D%E0%B0%B0%E0%B0%BE%E0%B0%AE%E0%B0%BF%E0%B0%95-%E0%B0%B9/
- Jangaon District, Government of Telangana, History (Hyderabad State and Operation Polo): https://jangaon.telangana.gov.in/history/
- Constitution of India, Article 46, Legislative Department, Government of India: https://www.legislative.gov.in/static/uploads/2025/07/359f70a69695affb9d72f8393102bd2e.pdf
- Crowding out, NCERT Class XII, Government Budget and the Economy, SATHEE-IITK: https://sathee.iitk.ac.in/sathee-cuet/student-corner/ncert-books/class-12/economics/introductory-to-macroeconomics/chapter-05-government-budget-and-the-economy/
- Continuous random variables, Carnegie Mellon University: https://www.math.cmu.edu/~gautam/c/2026-425/notes/cts-rvs.html
- Relations and generating functions: Rosen, `Discrete Mathematics and Its Applications`.
- Cache coherence, Cornell University CS3410: https://www.cs.cornell.edu/courses/cs3410/2025fa/notes/cachecoherency.html
- Queue using two stacks, Cornell University CS312: https://www.cs.cornell.edu/courses/cs312/2007fa/lectures/lec20.html; Princeton COS 226: https://www.cs.princeton.edu/courses/archive/spring21/cos226/lectures/study/13StacksAndQueues.html
- Paging fragmentation, INFLIBNET e-content: https://ebooks.inflibnet.ac.in/csp3/chapter/memory-management-paging-i/

## Validation and deployment

- Pre-write schema checks passed for topic IDs, paper labels, unique IDs, four options, distinct option text, answer indexes and four explanations per question.
- GitHub Actions repository validators and Cloudflare preview build are to be checked on the pull request. No production deployment or merge is claimed.
