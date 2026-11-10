# TGPSC Audio TTS Worker

This small Cloudflare Worker converts English lesson text into MP3 using Cloudflare Workers AI's `openai/tts-1` model. It is intentionally separate from the static exam website.

## Deploy once

1. Install Node.js, then run `npm install -g wrangler`.
2. From this folder, run `wrangler login`.
3. In the Cloudflare dashboard, enable Workers AI for the account and check the model pricing/terms.
4. Create a private key (use a password manager to generate a long random value), then run `wrangler secret put AUDIO_API_KEY` and paste the key.\n5. Run `wrangler deploy`.
6. Copy the generated `https://tgpsc-audio-tts.<your-account-subdomain>.workers.dev` URL.
7. Paste that URL into **Audio Study → Generate an English MP3 lesson → Audio generation service URL**.

The website sends text only when you press Generate. Enter the same private key in the page. The key is held in session storage for that browser tab and is not committed to GitHub. The worker returns MP3 bytes; the browser joins the sections into one downloadable MP3.

## Cost and limits

- The model documentation currently lists `openai/tts-1` at approximately USD $0.000015 per character.
- Each API request is capped at 4,096 characters. The website splits longer lessons into sections.
- Voice choices are English: nova (default), alloy, echo, fable, onyx, shimmer.
- Speed is configurable.
- Usage is billed by the provider/account. Check current pricing before use.

## Security note

The worker restricts browser CORS to the production exam website and limits each request to 4,096 characters. The endpoint requires a private bearer key and restricts browser CORS to the production exam website. Also configure Cloudflare rate limiting and monitor AI usage before wider use; never commit the key to GitHub. Keep the Worker AI binding enabled; no API key is placed in the website.

## Background listening

The generated MP3 is a normal audio file. Download it and use the website's MP3 player or the Android media player. Background/lock-screen controls depend on Android browser support and battery settings.
