const MODEL_REPO = "navgurukul-ai-labs/text-to-speech-en-IN-piper";
const MODEL_FILES = new Set([
  "en_IN-dataset=spicor-english-base=ljspeech-epochs=1089.onnx",
  "en_IN-dataset=spicor-english-base=ljspeech-epochs=1089.onnx.json"
]);

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname.startsWith("/hf-model/")) {
      if (request.method !== "GET" && request.method !== "HEAD") {
        return new Response("Method not allowed", { status: 405 });
      }

      const filename = decodeURIComponent(url.pathname.slice("/hf-model/".length));
      if (!MODEL_FILES.has(filename)) {
        return new Response("Model file not allowed", {
          status: 404,
          headers: { "Cache-Control": "no-store" }
        });
      }

      const upstreamUrl =
        "https://huggingface.co/" + MODEL_REPO + "/resolve/main/" +
        encodeURIComponent(filename);

      try {
        const headers = new Headers();
        const range = request.headers.get("Range");
        if (range) headers.set("Range", range);

        const upstream = await fetch(upstreamUrl, {
          method: request.method,
          headers,
          redirect: "follow"
        });

        const responseHeaders = new Headers(upstream.headers);
        responseHeaders.set("Access-Control-Allow-Origin", url.origin);
        responseHeaders.set("Access-Control-Allow-Methods", "GET, HEAD, OPTIONS");
        responseHeaders.set("Cross-Origin-Resource-Policy", "same-origin");
        responseHeaders.set("Cache-Control", "public, max-age=86400");
        responseHeaders.set("X-TTS-Model-Source", "Hugging-Face-public-model");

        return new Response(upstream.body, {
          status: upstream.status,
          statusText: upstream.statusText,
          headers: responseHeaders
        });
      } catch (error) {
        return new Response("Unable to retrieve public Piper model: " +
          (error && error.message ? error.message : String(error)), {
          status: 502,
          headers: {
            "Access-Control-Allow-Origin": url.origin,
            "Cache-Control": "no-store",
            "Content-Type": "text/plain; charset=utf-8"
          }
        });
      }
    }

    return env.ASSETS.fetch(request);
  }
};
