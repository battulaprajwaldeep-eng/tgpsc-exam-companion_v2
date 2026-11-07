# TGPSC Exam Companion

Mobile-first personal preparation workspace for the TGPSC HMWSSB Manager (Engineering), Notification 04/OG/HM/2026.

## Preparation profile and imported history

The app loads `study-data.json`, which contains:
- The official Paper I and Paper II syllabus structure transcribed from the supplied notification.
- The user's study constraints, preparation plan and topic-by-topic evidence.
- Verified quiz aggregates and individually verified records.
- Explicit audit notes for missing or uncertain historical scores.
- Dedicated instructor, daily-practice, audio-lesson and answer-grading prompts.

Historical data is an evidence-based summary, not a complete transcript of every prior chat or every question. Sets 1–46 do not have a reliable consolidated score; Sets 59–70 do not have individual scores; unmapped answer strings are excluded from score calculations. Do not invent missing results.

## Current features

- One-question-at-a-time practice with 5 Paper II + 5 Paper I as the default session.
- Paper II weighted at 2 marks and Paper I at 1 mark per correct answer.
- Answers hidden until submission; post-submission explanations include distractors.
- Attempted question IDs excluded from normal practice; revision is a separate mode.
- Local session history, first-attempt topic and subtopic evidence, separate Paper I/Paper II readiness summaries, weak-area priorities, syllabus checklist and JSON export/import.
- Imported historical checkpoints and saved instructor prompts displayed from `study-data.json`.
- Government Exam Instructor recruitment dashboard in `government-exams.html`.

## Important limitations

- The question bank currently contains 681 questions (269 Paper I, 412 Paper II; verified 7 November 2026). It remains in progress and is not proof of full syllabus coverage or exam readiness.
- A mobile-friendly bulk JSON importer is available at `batch-import.html`. It validates schema fields, exact duplicate IDs/stems, flags lexical similarity for manual review, and exports a merged JSON file locally. It does not write directly to GitHub; review and commit the exported file through a pull request.
- New quiz attempts are stored in the current browser's local storage. First-attempt dashboard accuracy excludes revision sessions; topic/subtopic evidence is based on completed practice questions only. When the question bank loads, the app backfills topic and subtopic metadata into older saved attempts where matching question IDs still exist. Data is not cloud-synchronised between devices; export backups regularly.
- Imported historical aggregates are shown separately from new browser-session records. Uncertain records are not counted.
- No account login, server database, automatic question generation or guaranteed live recruitment feed is implemented.

## Deployment

The repository is connected to a Cloudflare Worker deployment. The production URL is:

`https://tgpsc-exam-companion-v2.battulaprajwaldeep.workers.dev/`

Deployment health and static-file serving must be verified in the Cloudflare dashboard. A GitHub commit alone does not prove that the production website is reachable.

## Exam-first operating priority

Through the December 2026 exam period, prioritise syllabus completion, question practice, revision and mock tests. Defer optional website redesign and feature expansion unless the user explicitly asks to resume them.


## Evaluated upstream open-source projects

These projects are tracked as optional upstream references for improving authoring and import workflows. They are **not runtime dependencies** of the deployed TGPSC website. The live bank remains `question-bank.json` and must continue to use the notification's Paper I/Paper II topic IDs and the existing question schema.

| Repository | Useful capability | Planned use here | Integration decision |
|---|---|---|---|
| [DQ QuestionBank Core](https://github.com/wzsisshadiao-crypto/dq-questionbank-core) | Python question-bank core; DOCX/JSON/Markdown/LaTeX import/export; review-first intake; validation and duplicate preflight | Evaluate its DOCX adapter and review/evidence concepts for a future DOCX-to-current-schema converter | Keep optional and isolated in an import tool/CI job. Map into our schema and preserve source evidence; do not replace the live bank schema or add its full UI/database. |
| [Exameow](https://github.com/heshengtao/exameow) | Multi-format study-material parsing, batch question generation, XLSX/CSV bank import/export, practice and wrong-answer workflows | Optional authoring/reference tool; evaluate CSV/XLSX interchange for batch preparation | Do not embed its Rust/Vue/Tauri application in this Cloudflare website. Treat generated questions as untrusted drafts requiring our syllabus mapping, answer verification, duplicate checks and human approval. |

### Integration and safety rules

1. Do not copy, mirror, or merge either project's question content into this repository. Only use original/licensed source material and retain attribution for any code actually adapted.
2. Before adapting code, pin an exact upstream commit, inspect its license and dependency tree, retain required copyright/license/NOTICE files, and add a third-party attribution entry.
3. Keep DOCX parsing and any AI-assisted generation out of the browser. No provider API key or GitHub token may be shipped to client-side JavaScript.
4. Convert external formats into our existing question contract: integer `paper` 1/2, official `topicId`, four options, zero-based `answer`, four option-specific explanations, stable unique `id`, and provenance `basis`.
5. Run our validator and a human answer-key review before any import into the production bank. Similarity warnings require review; never silently delete questions.
6. Do not add a large framework, database, Rust runtime, or new production service solely to support an importer. Prefer a small, isolated converter and GitHub Actions quality gate.

**Current decision:** reference both projects now; prototype the DQ DOCX adapter as a separate tool only after its current public API and license are pinned and tested against representative user-owned DOCX batches. Exameow remains an optional authoring tool, not a dependency of the production exam site.

## Reliable batch upload and quality checks

- Use `batch-import.html` to validate a new JSON batch against the current bank before exporting a merged file.
- Keep original batch files separately under `generated-batches/` when they are pending review; do not overwrite the live bank with unreviewed generated content.
- Every pull request that changes the live bank, syllabus, importer, or pending batches runs `.github/workflows/question-bank-quality-gate.yml`.
- The quality gate checks required fields, official syllabus topic IDs and labels, four distinct options, answer indexes, four explanations, unique IDs, exact duplicate stems, and the practice-selection regression suite.
- High-similarity wording matches are reported as warnings for human review. They are not automatically deleted or rejected as conceptual duplicates.
- The validator accepts the five difficulty labels already present in the live bank: easy, standard, moderate, difficult, and advanced.
- The live bank remains the source of truth. Pending batches are not published until reviewed and deliberately merged.

### Recommended batch upload procedure

1. Convert a DOCX question set into the documented JSON schema (or use the JSON template from the importer).
2. Run the importer against the current `question-bank.json` and the new batch.
3. Inspect all rejected questions and near-duplicate warnings; fix or explicitly remove them.
4. Commit the validated output on a feature branch and open a pull request.
5. Wait for the Question bank quality gate to pass; review the actual questions and merge only after human answer-key verification.
