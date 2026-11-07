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
- Local session history, topic evidence, syllabus checklist and JSON export/import.
- Imported historical checkpoints and saved instructor prompts displayed from `study-data.json`.
- Government Exam Instructor recruitment dashboard in `government-exams.html`.

## Important limitations

- The question bank currently contains 514 questions (198 Paper I, 316 Paper II; verified 7 November 2026). It remains in progress and is not proof of full syllabus coverage or exam readiness.
- A mobile-friendly bulk JSON importer is available at `batch-import.html`. It validates schema fields, exact duplicate IDs/stems, flags lexical similarity for manual review, and exports a merged JSON file locally. It does not write directly to GitHub; review and commit the exported file through a pull request.
- New quiz attempts are stored in the current browser's local storage. They are not cloud-synchronised between devices; export backups regularly.
- Imported historical aggregates are shown separately from new browser-session records. Uncertain records are not counted.
- No account login, server database, automatic question generation or guaranteed live recruitment feed is implemented.

## Deployment

The repository is connected to a Cloudflare Worker deployment. The production URL is:

`https://tgpsc-exam-companion-v2.battulaprajwaldeep.workers.dev/`

Deployment health and static-file serving must be verified in the Cloudflare dashboard. A GitHub commit alone does not prove that the production website is reachable.

## Exam-first operating priority

Through the December 2026 exam period, prioritise syllabus completion, question practice, revision and mock tests. Defer optional website redesign and feature expansion unless the user explicitly asks to resume them.
