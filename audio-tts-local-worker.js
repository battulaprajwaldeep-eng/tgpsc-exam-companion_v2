// Local-only Piper TTS worker. Speech synthesis runs on-device; no speech text is sent to a TTS API.
let ttsModule = null;
let stage = "loading Piper engine";
const nativeFetch = self.fetch.bind(self);
self.fetch = async (input, init) => {
  const originalUrl = typeof input === "string" ? input : (input && input.url) || String(input);
  let requestUrl = originalUrl;
  try {
    const parsed = new URL(originalUrl, self.location.href);
    const modelPrefix = "https://huggingface.co/" + "navgurukul-ai-labs/text-to-speech-en-IN-piper/resolve/main/";
    const oldOrtPrefix = "https://cdnjs.cloudflare.com/ajax/libs/onnxruntime-web/1.18.0/";
    if (parsed.href.startsWith(modelPrefix)) {
      const filename = decodeURIComponent(parsed.pathname.split("/").pop());
      requestUrl = new URL("/hf-model/" + encodeURIComponent(filename), self.location.origin).href;
    } else if (parsed.href.startsWith(oldOrtPrefix)) {
      const filename = decodeURIComponent(parsed.pathname.split("/").pop());
      requestUrl = new URL("/onnxruntime/" + encodeURIComponent(filename), self.location.origin).href;
    }
    const response = await nativeFetch(requestUrl, init);
    if (!response.ok) {
      const detail = await response.clone().text().catch(() => "");
      throw new Error("HTTP " + response.status + " " + response.statusText + " at " + requestUrl + (detail ? " — " + detail.slice(0, 240) : ""));
    }
    return response;
  } catch (error) {
    const detail = error && error.message ? error.message : String(error);
    throw new Error("Model download failed at " + requestUrl + ": " + detail);
  }
};

self.onmessage = async (event) => {
  const data = event.data || {};
  if (data.type !== "generate") return;

  try {
    if (!ttsModule) {
      stage = "loading the open-source Piper browser package";
      ttsModule = await import("https://esm.sh/@the-vedantic-coder/piper-tts-web@1.0.10?bundle");
    }

    stage = "initializing single-threaded ONNX Runtime from the same-origin asset bridge";
    try {
      Object.defineProperty(self.navigator, "hardwareConcurrency", { configurable: true, value: 1 });
    } catch (_) {}

    stage = "downloading or opening the Indian-English voice model";
    const session = await ttsModule.TtsSession.create({
      voiceId: data.voiceId || "en_IN-spicor-medium",
      progress: (progress) => {
        const total = Number(progress && progress.total) || 0;
        const loaded = Number(progress && progress.loaded) || 0;
        const percent = total > 0 ? Math.round((loaded / total) * 100) : null;
        self.postMessage({
          type: "progress",
          message: percent === null
            ? "Preparing the voice model and speech engine…"
            : "Downloading voice model: " + percent + "%"
        });
      },
      wasmPaths: {
        onnxWasm: self.location.origin + "/onnxruntime/",
        piperData: "https://cdn.jsdelivr.net/npm/@diffusionstudio/piper-wasm@1.0.0/build/piper_phonemize.data",
        piperWasm: "https://cdn.jsdelivr.net/npm/@diffusionstudio/piper-wasm@1.0.0/build/piper_phonemize.wasm"
      }
    });
    const blob = await session.predict(data.text);

    if (!(blob instanceof Blob) || blob.size === 0) {
      throw new Error("The speech engine returned an empty audio file.");
    }

    self.postMessage({ type: "audio", blob, index: data.index, total: data.total });
  } catch (error) {
    const message = error && error.message ? error.message : String(error);
    self.postMessage({
      type: "error",
      message: "Failed while " + stage + ": " + message
    });
  }
};
