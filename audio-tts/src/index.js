const ALLOWED_ORIGIN = "https://tgpsc-exam-companion-v2.battulaprajwaldeep.workers.dev";
const MODEL = "openai/tts-1";
const VOICES = new Set(["alloy", "echo", "fable", "onyx", "nova", "shimmer"]);

function cors(origin) {
  const allowed = origin === ALLOWED_ORIGIN ? origin : ALLOWED_ORIGIN;
  return {
    "Access-Control-Allow-Origin": allowed,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Vary": "Origin"
  };
}

export default {
  async fetch(request, env) {
    const origin = request.headers.get("Origin") || "";
    const headers = cors(origin);
    if (request.method === "OPTIONS") return new Response(null, { headers });
    const url = new URL(request.url);
    if (url.pathname !== "/api/tts" || request.method !== "POST") {
      return new Response("Not found", { status: 404, headers });
    }
    if (origin && origin !== ALLOWED_ORIGIN) {
      return new Response("Origin not allowed", { status: 403, headers });
    }
    const suppliedKey = (request.headers.get("Authorization") || "").replace(/^Bearer\s+/i, "");
    if (!env.AUDIO_API_KEY || suppliedKey !== env.AUDIO_API_KEY) {
      return new Response("Unauthorized: configure and provide the private audio generation key", { status: 401, headers });
    }
    let input;
    try { input = await request.json(); }
    catch { return new Response("Invalid JSON body", { status: 400, headers }); }
    const text = typeof input.text === "string" ? input.text.trim() : "";
    const voice = VOICES.has(input.voice) ? input.voice : "nova";
    const speed = Number(input.speed ?? 0.95);
    if (!text || text.length > 4096) {
      return new Response("Text must contain 1–4096 characters per request", { status: 400, headers });
    }
    if (!Number.isFinite(speed) || speed < 0.25 || speed > 4) {
      return new Response("Invalid speech speed", { status: 400, headers });
    }
    try {
      const result = await env.AI.run(MODEL, {
        text, voice, response_format: "mp3", speed
      });
      let audio = result?.audio ?? result;
      if (typeof audio === "string" && /^https:\/\//i.test(audio)) {
        const fetched = await fetch(audio);
        if (!fetched.ok) throw new Error("Could not retrieve generated MP3");
        audio = await fetched.arrayBuffer();
      } else if (typeof audio === "string") {
        const binary = atob(audio);
        const bytes = new Uint8Array(binary.length);
        for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
        audio = bytes;
      }
      if (!(audio instanceof ArrayBuffer) && !ArrayBuffer.isView(audio)) {
        throw new Error("TTS provider returned an unsupported audio response");
      }
      return new Response(audio, {
        status: 200,
        headers: {
          ...headers,
          "Content-Type": "audio/mpeg",
          "Content-Disposition": 'attachment; filename="lesson.mp3"',
          "Cache-Control": "no-store"
        }
      });
    } catch (error) {
      return new Response("TTS generation failed: " + (error?.message || "unknown error"), {
        status: 502, headers
      });
    }
  }
};
