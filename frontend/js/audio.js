// Audio module — Sarvam AI STT/TTS via /audio/* backend proxy
// Precedence (binding): Emergency auto-play > global voiceover toggle > manual click
// Auto-play fires ONLY: (A) anywhere in Emergency flow, (B) when a popup opens (Type-C panel, Help)
// Everything else is manual via 🔊 icon.

let _ttsQueue = Promise.resolve();   // serialise TTS calls
let _currentAudio = null;            // currently playing HTMLAudioElement

// ── Public API ─────────────────────────────────────────────────────────────

/**
 * playAudio(text, { auto, forceEmergency })
 *   auto          – true when called from an auto-play trigger (popup/emergency)
 *   forceEmergency – true when called from Emergency flow (overrides global toggle)
 */
function playAudio(text, { auto = false, forceEmergency = false } = {}) {
  const isEmergency = forceEmergency || appState.flow_mode === 'emergency';

  // Precedence check
  if (!isEmergency) {
    // Emergency auto-play can never be suppressed — all other cases check toggle
    if (auto && !appState.voiceoverEnabled) return;
    if (!auto) return;  // manual clicks handled separately via 🔊 button handler
  }

  _ttsQueue = _ttsQueue.then(() => _doTTS(text));
}

/**
 * playManual(text) — triggered by 🔊 button; respects global toggle but not auto-play rule
 */
function playManual(text) {
  _ttsQueue = _ttsQueue.then(() => _doTTS(text));
}

/**
 * startSTT(onResult) — records audio and sends to /audio/stt proxy
 * onResult(transcribedText: string) called on success
 * onError(err) called on failure
 */
async function startSTT(onResult, onError) {
  let mediaRecorder, chunks = [];
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorder = new MediaRecorder(stream, { mimeType: 'audio/webm' });
    mediaRecorder.ondataavailable = e => { if (e.data.size > 0) chunks.push(e.data); };
    mediaRecorder.onstop = async () => {
      stream.getTracks().forEach(t => t.stop());
      const blob = new Blob(chunks, { type: 'audio/webm' });
      try {
        const text = await _doSTT(blob);
        onResult(text);
      } catch (err) {
        if (onError) onError(err);
      }
    };
    mediaRecorder.start();
    // Auto-stop after 8 seconds
    setTimeout(() => { if (mediaRecorder.state === 'recording') mediaRecorder.stop(); }, 8000);
    return mediaRecorder;  // caller can call .stop() early
  } catch (err) {
    if (onError) onError(err);
    return null;
  }
}

// ── Internal ───────────────────────────────────────────────────────────────

async function _doTTS(text) {
  if (!text || !text.trim()) return;
  // Stop any currently playing audio
  if (_currentAudio) { _currentAudio.pause(); _currentAudio = null; }

  const lang = appState.language === 'hi' ? 'hi-IN' : 'en-IN';
  const body = JSON.stringify({
    inputs: [text.slice(0, 500)],   // Sarvam limit
    target_language_code: lang,
    speaker: 'anushka',
    model: 'bulbul:v2',
  });

  try {
    const res = await fetch('/audio/tts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body,
    });
    if (!res.ok) throw new Error(`TTS ${res.status}`);
    const json = await res.json();
    // Sarvam returns { audios: ["<base64 wav>"] }
    const b64 = json.audios && json.audios[0];
    if (!b64) return;
    const audioBlob = _b64ToBlob(b64, 'audio/wav');
    const url = URL.createObjectURL(audioBlob);
    _currentAudio = new Audio(url);
    await _currentAudio.play();
    await new Promise(resolve => { _currentAudio.onended = resolve; _currentAudio.onerror = resolve; });
    URL.revokeObjectURL(url);
  } catch (err) {
    console.warn('TTS error:', err);
  }
}

async function _doSTT(audioBlob) {
  const lang = appState.language === 'hi' ? 'hi-IN' : 'en-IN';
  const form = new FormData();
  form.append('file', audioBlob, 'recording.webm');
  form.append('language_code', lang);
  form.append('model', 'saarika:v2');

  const res = await fetch('/audio/stt', { method: 'POST', body: form });
  if (!res.ok) throw new Error(`STT ${res.status}`);
  const json = await res.json();
  // Sarvam returns { transcript: "..." }
  return (json.transcript || '').trim();
}

function _b64ToBlob(b64, mime) {
  const binary = atob(b64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return new Blob([bytes], { type: mime });
}