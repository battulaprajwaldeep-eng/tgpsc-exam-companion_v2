const MODEL_REPO = "navgurukul-ai-labs/text-to-speech-en-IN-piper";
const MODEL_FILES = new Set([
  "en_IN-dataset=spicor-english-base=ljspeech-epochs=1089.onnx",
  "en_IN-dataset=spicor-english-base=ljspeech-epochs=1089.onnx.json"
]);
const ORT_FILES = new Set([
  "ort-wasm-simd.jsep.mjs",
  "ort-wasm-simd.jsep.wasm",
  "ort-wasm-simd.mjs",
  "ort-wasm-simd.wasm",
  "ort-wasm.wasm",
  "ort-wasm-threaded.jsep.mjs",
  "ort-wasm-threaded.jsep.wasm",
  "ort-wasm-simd-threaded.jsep.mjs",
  "ort-wasm-simd-threaded.jsep.wasm"
]);

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname.startsWith("/onnxruntime/")) {
      if (request.method !== "GET" && request.method !== "HEAD") {
        return new Response("Method not allowed", { status: 405 });
      }
      const filename = decodeURIComponent(url.pathname.slice("/onnxruntime/".length));
      if (!ORT_FILES.has(filename)) {
        return new Response("ONNX Runtime asset not allowed", { status: 404 });
      }
      const upstreamUrl = "https://cdn.jsdelivr.net/npm/onnxruntime-web@1.18.0/dist/" + filename;
      try {
        const headers = new Headers();
        const range = request.headers.get("Range");
        if (range) headers.set("Range", range);
        const upstream = await fetch(upstreamUrl, { method: request.method, headers });
        const responseHeaders = new Headers(upstream.headers);
        responseHeaders.set("Cache-Control", "public, max-age=31536000, immutable");
        responseHeaders.set("Cross-Origin-Resource-Policy", "same-origin");
        responseHeaders.set("X-TTS-Runtime-Source", "cdnjs-onnxruntime-web-1.18.0");
        return new Response(upstream.body, {
          status: upstream.status,
          statusText: upstream.statusText,
          headers: responseHeaders
        });
      } catch (error) {
        return new Response("Unable to retrieve ONNX Runtime asset: " +
          (error && error.message ? error.message : String(error)), { status: 502 });
      }
    }

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
