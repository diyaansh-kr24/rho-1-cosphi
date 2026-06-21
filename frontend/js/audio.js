// Audio module: Sarvam AI STT/TTS via /audio/* backend proxy.
// Auto-play fires only in Emergency flow or when a popup opens (Type-C panel, Help).
// Everything else is manual via the speaker icon.
// Precedence: Emergency auto-play > global voiceover toggle > manual click.

let _ttsQueue = Promise.resolve();
let _currentAudio = null;

// Public API

/**
 * stopAudio() — immediately halt any playing audio and discard the queue.
 * Called on reset session and at the start of every new user message send.
 */
function stopAudio() {
  if (_currentAudio) {
    _currentAudio.pause();
    _currentAudio = null;
  }
  _ttsQueue = Promise.resolve();
}

/**
 * playAudio(text, { auto })
 *   auto – true when called from an auto-play trigger (popup/emergency/voiceover-on)
 *   Always respects the voiceoverEnabled toggle, including emergency mode.
 */
function playAudio(text, { auto = false } = {}) {
  if (!auto) return;
  if (!appState.voiceoverEnabled) return;
  _ttsQueue = _ttsQueue.then(() => _doTTS(text));
}

/**
 * playManual(text) — triggered by 🔊 button; respects global toggle but not auto-play rule
 */
function playManual(text) {
  _ttsQueue = _ttsQueue.then(() => _doTTS(text));
}

/**
 * startSTT(onResult, onError, onLevel, onStopRecording)
 *   onResult(text)       — called after STT API returns
 *   onError(err)         — called on STT API failure
 *   onLevel(rms)         — called every 100ms with audio RMS (0–~0.5) for waveform
 *   onStopRecording()    — called the moment recording stops (before API call)
 *
 * Auto-stops on: 5s silence, 15s hard cap, or caller calls .stop() on returned recorder.
 */
async function startSTT(onResult, onError, onLevel, onStopRecording) {
  let chunks = [], levelInterval = null, hardCapTimeout = null;
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const source = audioCtx.createMediaStreamSource(stream);
    const analyser = audioCtx.createAnalyser();
    analyser.fftSize = 512;
    source.connect(analyser);
    const timeDomain = new Uint8Array(analyser.frequencyBinCount);

    const mimeType = ['audio/webm;codecs=opus', 'audio/webm', 'audio/ogg;codecs=opus', 'audio/mp4']
      .find(t => MediaRecorder.isTypeSupported(t)) || '';
    const mediaRecorder = new MediaRecorder(stream, mimeType ? { mimeType } : {});

    mediaRecorder.ondataavailable = e => { if (e.data.size > 0) chunks.push(e.data); };

    mediaRecorder.onstop = async () => {
      clearInterval(levelInterval);
      clearTimeout(hardCapTimeout);
      stream.getTracks().forEach(t => t.stop());
      try { audioCtx.close(); } catch (_) {}

      if (onStopRecording) onStopRecording();

      const actualType = (mediaRecorder.mimeType || 'audio/webm').split(';')[0];
      const blob = new Blob(chunks, { type: actualType });
      try {
        const text = await _doSTT(blob);
        onResult(text);
      } catch (err) {
        if (onError) onError(err);
      }
    };

    mediaRecorder.start();

    // Hard cap: 15 seconds
    hardCapTimeout = setTimeout(() => {
      if (mediaRecorder.state === 'recording') mediaRecorder.stop();
    }, 15000);

    // Silence detection + level reporting every 100ms
    let silenceStart = null;
    const SILENCE_THRESHOLD = 0.015;
    const SILENCE_DURATION = 5000;

    levelInterval = setInterval(() => {
      if (mediaRecorder.state !== 'recording') { clearInterval(levelInterval); return; }
      analyser.getByteTimeDomainData(timeDomain);
      let sum = 0;
      for (let i = 0; i < timeDomain.length; i++) {
        const v = (timeDomain[i] - 128) / 128;
        sum += v * v;
      }
      const rms = Math.sqrt(sum / timeDomain.length);

      if (onLevel) onLevel(rms);

      if (rms < SILENCE_THRESHOLD) {
        if (!silenceStart) silenceStart = Date.now();
        else if (Date.now() - silenceStart >= SILENCE_DURATION) {
          if (mediaRecorder.state === 'recording') mediaRecorder.stop();
        }
      } else {
        silenceStart = null;
      }
    }, 100);

    return mediaRecorder;
  } catch (err) {
    if (onError) onError(err);
    return null;
  }
}

// Internal

async function _doTTS(text) {
  if (!text || !text.trim()) return;
  // Stop any currently playing audio
  if (_currentAudio) { _currentAudio.pause(); _currentAudio = null; }

  const isHindi = appState.language === 'hi';
  const lang = isHindi ? 'hi-IN' : 'en-IN';
  const body = JSON.stringify({
    inputs: [text.slice(0, 500)],   // Sarvam limit
    target_language_code: lang,
    speaker: isHindi ? 'anushka' : 'arya',
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
    // Sarvam returns { audios: ["<base64 wav>"] } — decode and play inline
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
  const ext = audioBlob.type.includes('mp4') ? 'mp4'
    : audioBlob.type.includes('ogg') ? 'ogg'
    : 'webm';
  console.log('[STT] sending blob:', audioBlob.type, audioBlob.size, 'bytes, lang:', lang);
  const form = new FormData();
  form.append('file', audioBlob, `recording.${ext}`);
  form.append('language_code', lang);
  form.append('model', 'saarika:v2.5');

  const res = await fetch('/audio/stt', { method: 'POST', body: form });
  if (!res.ok) {
    const errBody = await res.text().catch(() => '');
    console.error('[STT] failed', res.status, errBody);
    throw new Error(`STT ${res.status}: ${errBody}`);
  }
  const json = await res.json();
  console.log('[STT] response:', json);
  return (json.transcript || '').trim();
}

function _b64ToBlob(b64, mime) {
  const binary = atob(b64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return new Blob([bytes], { type: mime });
}