/* Supabase Google OAuth + local-first sync.
   Browser data stays usable offline. Cloud rows are protected by auth.uid() RLS.
   This client uses Supabase Auth and PostgREST directly; no privileged key is shipped. */
(function () {
  "use strict";
  const CFG = window.TGPSC_SUPABASE_CONFIG || {};
  const SESSION_KEY = "tgpscSupabaseSession";
  const VERIFIER_KEY = "tgpscSupabasePkce";
  const OWNER_KEY = "tgpscCloudOwner";
  const QUEUE_KEY = "tgpscCloudPending";
  const TABLE = "tgpsc_learner_state";
  const $ = id => document.getElementById(id);
  let session = null, busy = false, timer = null, lastError = "";

  const configured = () => /^https:\/\//.test(CFG.url || "") && !!CFG.anonKey;
  const endpoint = path => CFG.url.replace(/\/$/, "") + path;
  const saveSession = value => { if (value && !value.expires_at) value.expires_at = Date.now() + (Number(value.expires_in) || 3600) * 1000; else if (value && value.expires_at < 1000000000000) value.expires_at *= 1000; session = value; localStorage.setItem(SESSION_KEY, JSON.stringify(value)); };
  const readSession = () => { try { session = JSON.parse(localStorage.getItem(SESSION_KEY) || "null"); } catch (_) { session = null; } return session; };
  const status = (message, error) => {
    const node = $("cloudStatus");
    if (node) { node.textContent = message; node.style.color = error ? "var(--danger)" : "var(--muted)"; }
    const signIn = $("cloudSignIn"), signOut = $("cloudSignOut");
    if (signIn) signIn.hidden = !!session;
    if (signOut) signOut.hidden = !session;
  };
  const b64url = bytes => btoa(String.fromCharCode(...new Uint8Array(bytes))).replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/,"");
  async function sha256(value) { return b64url(await crypto.subtle.digest("SHA-256", new TextEncoder().encode(value))); }
  function randomVerifier() { const bytes = crypto.getRandomValues(new Uint8Array(48)); return b64url(bytes); }
  function redirectUri() { return location.origin + location.pathname; }
  async function signIn() {
    if (!configured()) { status("Add your Supabase project URL and public anon key to supabase-config.js first.", true); return; }
    const verifier = randomVerifier(), challenge = await sha256(verifier);
    localStorage.setItem(VERIFIER_KEY, verifier);
    const url = new URL(endpoint("/auth/v1/authorize"));
    url.searchParams.set("provider", "google");
    url.searchParams.set("redirect_to", redirectUri());
    url.searchParams.set("code_challenge", challenge);
    url.searchParams.set("code_challenge_method", "s256");
    location.assign(url.toString());
  }
  async function authFetch(path, options) {
    const response = await fetch(endpoint(path), { ...options, headers: {
      apikey: CFG.anonKey, "Content-Type": "application/json",
      ...(options && options.headers || {})
    }});
    const body = await response.text();
    let data = null; try { data = body ? JSON.parse(body) : null; } catch (_) { data = body; }
    if (!response.ok) throw new Error((data && (data.msg || data.message || data.error_description || data.error)) || ("Supabase request failed (" + response.status + ")"));
    return data;
  }
  async function exchangeCode() {
    const params = new URLSearchParams(location.search), code = params.get("code");
    if (!code) return false;
    const verifier = localStorage.getItem(VERIFIER_KEY);
    if (!verifier) throw new Error("Google sign-in verifier is missing. Please sign in again.");
    const token = await authFetch("/auth/v1/token?grant_type=pkce", {
      method: "POST", body: JSON.stringify({ auth_code: code, code_verifier: verifier })
    });
    saveSession(token); localStorage.removeItem(VERIFIER_KEY);
    history.replaceState({}, document.title, redirectUri());
    return true;
  }
  async function refreshSession() {
    if (!session || !session.refresh_token) return null;
    if (session.expires_at && Date.now() < session.expires_at - 60000) return session;
    const next = await authFetch("/auth/v1/token?grant_type=refresh_token", {
      method: "POST", body: JSON.stringify({ refresh_token: session.refresh_token })
    });
    saveSession(next); return session;
  }
  async function api(path, options) {
    await refreshSession();
    if (!session || !session.access_token) throw new Error("Sign in to synchronise your progress.");
    return authFetch(path, { ...options, headers: {
      Authorization: "Bearer " + session.access_token,
      Prefer: "return=minimal",
      ...(options && options.headers || {})
    }});
  }
  function emptyState() {
    return { schemaVersion: 3, answers: {}, completed: [], history: [], attemptedIds: [],
      activeSession: null, currentIndex: 0, studiedTopics: [], studyLogs: [] };
  }
  function uniqueBy(items, keyFn) {
    const map = new Map();
    (items || []).forEach(item => map.set(keyFn(item), item));
    return [...map.values()].sort((a,b) => String(a.date || "").localeCompare(String(b.date || "")));
  }
  function mergeState(local, remote) {
    const a = local || emptyState(), b = remote || emptyState();
    const merged = { ...(new Date(b.cloudUpdatedAt || 0) > new Date(a.cloudUpdatedAt || 0) ? a : b),
      ...a, ...b };
    // Preserve all completed sessions and study blocks from both devices.
    merged.history = uniqueBy([...(a.history || []), ...(b.history || [])],
      x => (x.date || "") + "|" + (x.review || []).map(q => q.id + ":" + q.selected).join(","));
    merged.studyLogs = uniqueBy([...(a.studyLogs || []), ...(b.studyLogs || [])],
      x => [x.date,x.topicId,x.activity,x.minutes,x.note].join("|"));
    ["attemptedIds","completed","studiedTopics"].forEach(k => {
      merged[k] = [...new Set([...(a[k] || []), ...(b[k] || [])])];
    });
    // Keep the most recently saved in-progress quiz state; completed records above are never discarded.
    const newer = new Date(b.cloudUpdatedAt || 0) > new Date(a.cloudUpdatedAt || 0) ? b : a;
    ["answers","activeSession","currentIndex","sessionMode"].forEach(k => {
      if (newer[k] !== undefined) merged[k] = newer[k];
    });
    merged.cloudUpdatedAt = new Date(Math.max(
      new Date(a.cloudUpdatedAt || 0).getTime(), new Date(b.cloudUpdatedAt || 0).getTime()
    )).toISOString();
    return merged;
  }
  function storeLocal() {
    if (typeof s === "undefined") return;
    localStorage.setItem("tgpscState", JSON.stringify(s));
    const owner = session && session.user && session.user.id;
    if (owner) localStorage.setItem("tgpscState:" + owner, JSON.stringify(s));
  }
  function activateAccount(userId) {
    const previous = localStorage.getItem(OWNER_KEY);
    if (previous && previous !== userId) {
      if (typeof s !== "undefined") localStorage.setItem("tgpscState:" + previous, JSON.stringify(s));
      try { s = JSON.parse(localStorage.getItem("tgpscState:" + userId) || "null") || emptyState(); }
      catch (_) { s = emptyState(); }
      localStorage.setItem("tgpscState", JSON.stringify(s));
    } else if (!previous && typeof s !== "undefined") {
      // First sign-in: adopt existing local-only preparation history into this account.
      localStorage.setItem("tgpscState:" + userId, JSON.stringify(s));
    }
    localStorage.setItem(OWNER_KEY, userId);
  }
  async function pull() {
    const rows = await api("/rest/v1/" + TABLE + "?select=state,updated_at&user_id=eq." + encodeURIComponent(session.user.id), { method: "GET" });
    return rows && rows[0] ? rows[0].state : null;
  }
  async function push() {
    if (!session || !session.user || !session.user.id || typeof s === "undefined") return;
    s.cloudUpdatedAt = new Date().toISOString();
    storeLocal();
    await api("/rest/v1/" + TABLE + "?on_conflict=user_id", {
      method: "POST",
      headers: { Prefer: "resolution=merge-duplicates,return=minimal" },
      body: JSON.stringify({ user_id: session.user.id, state: s, updated_at: new Date().toISOString() })
    });
    localStorage.removeItem(QUEUE_KEY);
    status("Signed in · all changes synced");
  }
  async function syncNow() {
    if (busy || !session || !navigator.onLine) return;
    busy = true; status("Synchronising…");
    try {
      await refreshSession();
      const remote = await pull();
      s = mergeState(s, remote);
      storeLocal();
      if (typeof stats === "function") stats();
      if (typeof historyView === "function") historyView();
      if (typeof topicMasteryView === "function") topicMasteryView();
      if (typeof syllabusView === "function") syllabusView();
      if (typeof window.renderLiveDashboard === "function") window.renderLiveDashboard();
      await push();
    } catch (error) {
      lastError = error.message || String(error);
      localStorage.setItem(QUEUE_KEY, "1");
      status("Offline / sync pending · " + lastError, true);
    } finally { busy = false; }
  }
  function queueSync() {
    if (!session) { localStorage.setItem(QUEUE_KEY, "1"); return; }
    localStorage.setItem(QUEUE_KEY, "1");
    status(navigator.onLine ? "Changes queued · syncing…" : "Offline · changes saved on this device");
    clearTimeout(timer); timer = setTimeout(syncNow, 900);
  }
  async function init() {
    if (!configured()) { status("Cloud sync setup needed · local progress is safe on this device"); return; }
    readSession();
    try {
      const exchanged = await exchangeCode();
      if (exchanged) readSession();
      if (session) {
        await refreshSession();
        const user = await authFetch("/auth/v1/user", { headers: { Authorization: "Bearer " + session.access_token } });
        session.user = user; saveSession(session);
        activateAccount(user.id);
        status("Signed in · checking cloud progress…");
        await syncNow();
      } else status("Not signed in · progress is stored locally");
    } catch (error) {
      lastError = error.message || String(error);
      status("Sign-in / sync needs attention · " + lastError, true);
    }
  }
  function signOut() {
    // Local progress remains available offline; signing out only ends the cloud session.
    if (session && session.access_token) {
      fetch(endpoint("/auth/v1/logout"), { method: "POST", headers: { apikey: CFG.anonKey, Authorization: "Bearer " + session.access_token } }).catch(() => {});
    }
    session = null; localStorage.removeItem(SESSION_KEY); status("Signed out · local progress remains on this device");
  }
  window.tgpscCloudSync = { signIn, signOut, syncNow, getStatus: () => ({ signedIn: !!session, pending: localStorage.getItem(QUEUE_KEY) === "1", error: lastError }) };
  // Wrap the app's existing save() so every quiz/checklist/study-log change is queued.
  const originalSave = window.save;
  if (typeof originalSave === "function") {
    window.save = function () { const result = originalSave.apply(this, arguments); queueSync(); return result; };
  }
  window.addEventListener("online", () => { if (session || localStorage.getItem(QUEUE_KEY) === "1") syncNow(); });
  window.addEventListener("storage", event => { if (event.key === "tgpscState" && session) syncNow(); });
  document.addEventListener("visibilitychange", () => { if (!document.hidden && session) syncNow(); });\n  setInterval(() => { if (!document.hidden && session && navigator.onLine) syncNow(); }, 60000);\n  document.addEventListener("DOMContentLoaded", () => {
    const signInButton = $("cloudSignIn"), signOutButton = $("cloudSignOut");
    if (signInButton) signInButton.addEventListener("click", signIn);
    if (signOutButton) signOutButton.addEventListener("click", signOut);
    init();
  });
})();
