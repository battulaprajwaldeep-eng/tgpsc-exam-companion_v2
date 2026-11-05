# Gemini question generation

Runs only when manually dispatched from GitHub Actions. Uses the repository secret named exactly Gemini_Api_key and Gemini 3.8 Flash by default.

Each run creates 12 Paper II and 8 Paper I questions (60:40). Checks include schema, official syllabus topic IDs, four options, four explanations, answer index and duplicate/near-duplicate stems. A separate Gemini request reviews the batch.

## Safety boundary
Generated questions are saved only under generated-batches/ and opened as a pull request. They are NOT appended to question-bank.json and are NOT served by the website. A human must verify calculations, code, facts, ambiguity, explanations and syllabus mapping before importing. AI review does not guarantee correctness.

## Run
GitHub → Actions → Generate TGPSC question batch → Run workflow. Start with the default 20-question batch. Check logs and review the PR. Gemini quotas vary by model and project; quota errors mean wait or reduce batch size.

## Secret
Repository Settings → Secrets and variables → Actions. Secret name: Gemini_Api_key. Never commit or print the key.
