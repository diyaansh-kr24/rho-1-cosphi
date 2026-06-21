// Inline SVG icons; currentColor inherits the parent button colour
const ICON = {
  mic:        '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="2" width="6" height="11" rx="3"/><path d="M5 10a7 7 0 0 0 14 0"/><line x1="12" y1="19" x2="12" y2="22"/><line x1="8" y1="22" x2="16" y2="22"/></svg>',
  send:       '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>',
  stop:       '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="none"><rect x="3" y="3" width="18" height="18" rx="3"/></svg>',
  back:       '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>',
  reset:      '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-4.5"/></svg>',
  speaker_on: '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>',
  speaker_off:'<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg>',
  warning:    '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>',
  check:      '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>',
  pin:        '<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>',
  home:       '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>',
  shield:     '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>',
  plus_circle:'<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>',
};

// Localization dictionary
const i18n = {
  en: {
    // Language screen
    app_title: 'Saarthi',

    // Triage screen
    triage_heading: 'Where are you traveling?',
    corridor_label: 'Where are you located now?',
    corridor_hyd: 'Hyderabad (Telangana)',
    corridor_mum: 'Mumbai (Maharashtra)',
    btn_emergency: 'Emergency',
    btn_planning: 'Plan my benefits',

    // Emergency screen
    emer_heading: 'Emergency Help',
    emer_placeholder: "Describe your emergency, for example: 'I need a hospital' or 'I have no shelter'",
    pill_medical: `${ICON.plus_circle} Medical`,
    pill_police:  `${ICON.shield} Police`,
    pill_shelter: `${ICON.home} Shelter`,
    btn_get_help: 'Get Help Now',
    emer_error: 'Error. Please call 112.',
    emer_chat_heading: 'Emergency Help',
    emer_welcome: 'I am here to help you. Tell me what is happening, or tap a button below for quick help.',
    emer_welcome_hi: 'मैं आपकी मदद के लिए यहाँ हूँ। बताएं क्या हो रहा है, या जल्दी मदद के लिए नीचे बटन दबाएं।',

    // Chat screen
    chat_heading: 'Saarthi',
    reset_title: 'Reset session',
    mic_title: 'Speak',
    chat_placeholder: 'Tell me about your situation…',
    send_title: 'Send',
    chat_error: 'Sorry, something went wrong. Please try again.',

    // Detail screen
    detail_about: 'About this scheme',
    detail_docs: 'Documents you will likely need',
    detail_steps: 'Steps to apply',
    detail_offices: 'Office locations',

    // Provenance
    prov_verified: 'Verified against official sources as of',
    prov_check: 'View official site',
    prov_curated: 'Some office locations are illustrative sample data. Verify addresses before visiting.',

    // Refusal panels
    refusal_a_title: 'Outside Scope',
    refusal_b_title: 'Scheme Not Covered',
    refusal_b_portal: 'Official portal',
    refusal_b_browse: 'Browse all schemes at myscheme.gov.in →',
    refusal_c_title: 'Human Help Needed',
    refusal_c_helpline: 'Helpline:',
    refusal_c_emergency: 'Emergency:',
    refusal_c_ack: 'I understand, let us continue',
    refusal_c_acked: 'Acknowledged',

    // Welcome messages
    welcome_hyd: 'Namaste! I am Saarthi. I am here to help you find government benefits you may be eligible for in Hyderabad, Telangana. To get started: what do you need help with most right now? For example: food, health cover, accident insurance, pension, or registering as a worker.',
    welcome_mum: 'Namaste! I am Saarthi. I am here to help you find government benefits you may be eligible for in Mumbai, Maharashtra. To get started: what do you need help with most right now? For example: food, health cover, accident insurance, pension, or registering as a worker.',

    // Card status labels
    status_green:  'Relevant',
    status_yellow: 'Action Required',
    status_red:    'Not Relevant',

    // TTS button
    tts_title: 'Read aloud',

    // Emergency pill messages (sent as user message)
    pill_medical_msg: 'I have a medical emergency and need urgent help. What should I do?',
    pill_police_msg:  'I need police assistance urgently. What should I do?',
    pill_shelter_msg: 'I need emergency shelter immediately. What should I do?',
  },
  hi: {
    // Language screen
    app_title: 'Saarthi',

    // Triage screen
    triage_heading: 'आप कहाँ जा रहे हैं?',
    corridor_label: 'आप अभी कहाँ हैं?',
    corridor_hyd: 'हैदराबाद (तेलंगाना)',
    corridor_mum: 'मुंबई (महाराष्ट्र)',
    btn_emergency: 'आपातकाल',
    btn_planning: 'मेरे लाभों की योजना बनाएं',

    // Emergency screen
    emer_heading: 'आपातकालीन सहायता',
    emer_placeholder: "अपनी आपातकालीन स्थिति बताएं, जैसे: 'मुझे अस्पताल चाहिए' या 'मुझे आश्रय चाहिए'",
    pill_medical: `${ICON.plus_circle} चिकित्सा`,
    pill_police:  `${ICON.shield} पुलिस`,
    pill_shelter: `${ICON.home} आश्रय`,
    btn_get_help: 'अभी मदद लें',
    emer_error: 'त्रुटि। कृपया 112 पर कॉल करें।',
    emer_chat_heading: 'आपातकालीन सहायता',
    emer_welcome: 'मैं आपकी मदद के लिए यहाँ हूँ। बताएं क्या हो रहा है, या जल्दी मदद के लिए नीचे बटन दबाएं।',
    emer_welcome_hi: 'मैं आपकी मदद के लिए यहाँ हूँ। बताएं क्या हो रहा है, या जल्दी मदद के लिए नीचे बटन दबाएं।',

    // Chat screen
    chat_heading: 'Saarthi',
    reset_title: 'सत्र रीसेट करें',
    mic_title: 'बोलें',
    chat_placeholder: 'अपनी स्थिति के बारे में बताएं…',
    send_title: 'भेजें',
    chat_error: 'क्षमा करें, कुछ गलत हो गया। कृपया पुनः प्रयास करें।',

    // Detail screen
    detail_about: 'इस योजना के बारे में',
    detail_docs: 'आवश्यक दस्तावेज़',
    detail_steps: 'आवेदन के चरण',
    detail_offices: 'कार्यालय स्थान',

    // Provenance
    prov_verified: 'सरकारी स्रोतों से सत्यापित, तिथि:',
    prov_check: 'आधिकारिक साइट देखें',
    prov_curated: 'कुछ कार्यालय स्थान नमूना डेटा हैं। जाने से पहले पते सत्यापित करें।',

    // Refusal panels
    refusal_a_title: 'दायरे से बाहर',
    refusal_b_title: 'योजना शामिल नहीं',
    refusal_b_portal: 'आधिकारिक पोर्टल',
    refusal_b_browse: 'myscheme.gov.in पर सभी योजनाएं देखें →',
    refusal_c_title: 'मानवीय सहायता आवश्यक',
    refusal_c_helpline: 'हेल्पलाइन:',
    refusal_c_emergency: 'आपातकालीन:',
    refusal_c_ack: 'मैं समझता/समझती हूँ, जारी रखें',
    refusal_c_acked: 'स्वीकृत',

    // Welcome messages
    welcome_hyd: 'नमस्ते! मैं आपका सारथी हूँ। मैं हैदराबाद, तेलंगाना में आपके लिए सरकारी योजनाएँ खोजने में मदद करूँगा। बताइए, आपको अभी सबसे ज़्यादा किस चीज़ की ज़रूरत है? जैसे: खाना, स्वास्थ्य सुविधा, दुर्घटना बीमा, पेंशन, या मज़दूर पंजीकरण।',
    welcome_mum: 'नमस्ते! मैं आपका सारथी हूँ। मैं मुंबई, महाराष्ट्र में आपके लिए सरकारी योजनाएँ खोजने में मदद करूँगा। बताइए, आपको अभी सबसे ज़्यादा किस चीज़ की ज़रूरत है? जैसे: खाना, स्वास्थ्य सुविधा, दुर्घटना बीमा, पेंशन, या मज़दूर पंजीकरण।',

    // Card status labels
    status_green:  'प्रासंगिक',
    status_yellow: 'कार्रवाई आवश्यक',
    status_red:    'अप्रासंगिक',

    // TTS button
    tts_title: 'ज़ोर से पढ़ें',

    // Emergency pill messages (sent as user message)
    pill_medical_msg: 'मुझे चिकित्सा आपातकाल है, मुझे तुरंत मदद चाहिए। मुझे क्या करना चाहिए?',
    pill_police_msg:  'मुझे तुरंत पुलिस की मदद चाहिए। मुझे क्या करना चाहिए?',
    pill_shelter_msg: 'मुझे तुरंत आश्रय चाहिए। मुझे क्या करना चाहिए?',
  },
};

// Localization helper
function t(key) {
  const lang = appState.language || 'en';
  return (i18n[lang] && i18n[lang][key]) || i18n.en[key] || key;
}

function applyI18n() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    const val = t(key);
    // Some keys contain HTML; use innerHTML only for those
    if (val.includes('<')) {
      el.innerHTML = val;
    } else {
      el.textContent = val;
    }
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    el.placeholder = t(el.getAttribute('data-i18n-placeholder'));
  });
  document.querySelectorAll('[data-i18n-title]').forEach(el => {
    el.title = t(el.getAttribute('data-i18n-title'));
  });
}

// Global state
const appState = {
  language: 'en',
  corridor_id: 'bihar_hyd',
  flow_mode: 'planning',
  screen: 'language',
  voiceoverEnabled: false,
  awaitingAck: false,
  conversation_history: [],
  extracted_state: {},
  currentCards: [],       // last set of scheme cards
  currentPins: [],        // all map pins for current response
  activeSchemeId: null,   // scheme_id of the detail card currently open
  pendingCardRender: null, // buffered cards held back while confidence panel is open
};

// Screen routing
function showScreen(name) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  const el = document.getElementById(`screen-${name}`);
  if (el) el.classList.add('active');
  appState.screen = name;
  applyI18n();   // refresh translations whenever a screen becomes visible
}

// Access gate
document.getElementById('gate-input').addEventListener('input', e => {
  // Strip everything except alphanumeric, uppercase, limit to 12 raw chars
  let raw = e.target.value.replace(/[^A-Za-z0-9]/g, '').toUpperCase().slice(0, 12);
  // Insert ' - ' separator after the first 4 chars
  e.target.value = raw.length > 4 ? raw.slice(0, 4) + ' - ' + raw.slice(4) : raw;
});

async function submitGateCode() {
  const input = document.getElementById('gate-input');
  const error = document.getElementById('gate-error');
  const btn = document.getElementById('gate-submit');
  // Send raw code without separator
  const code = input.value.replace(/[^A-Za-z0-9]/g, '').toUpperCase();
  if (!code) return;

  btn.disabled = true;
  btn.textContent = '...';
  error.style.display = 'none';

  try {
    const res = await fetch('/verify-code', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code }),
    });
    if (res.ok) {
      showScreen('language');
    } else {
      error.style.display = 'block';
      input.value = '';
      input.focus();
    }
  } catch {
    error.textContent = 'Network error. Please try again.';
    error.style.display = 'block';
  } finally {
    btn.disabled = false;
    btn.textContent = 'Continue';
  }
}

document.getElementById('gate-submit').addEventListener('click', submitGateCode);
document.getElementById('gate-input').addEventListener('keydown', e => {
  if (e.key === 'Enter') submitGateCode();
});

// Language screen
document.getElementById('btn-english').addEventListener('click', () => {
  appState.language = 'en';
  applyI18n();
  showScreen('triage');
});
document.getElementById('btn-hindi').addEventListener('click', () => {
  appState.language = 'hi';
  applyI18n();
  showScreen('triage');
});

// Triage screen
document.getElementById('corridor-select').addEventListener('change', e => {
  appState.corridor_id = e.target.value;
});

document.getElementById('btn-emergency').addEventListener('click', () => {
  appState.flow_mode = 'emergency';
  appState.voiceoverEnabled = true;
  appState.conversation_history = [];
  appState.extracted_state = {};
  appState.currentCards = [];
  appState.currentPins = [];
  appState.awaitingAck = false;
  document.getElementById('chat-history').innerHTML = '';
  setDockEnabled(true);
  setEmergencyMode(true);
  _updateVoiceoverIcon();
  showScreen('chat');

  // Always push the English version to conversation_history; backend only handles English
  const welcomeEn = i18n.en.emer_welcome;
  appState.conversation_history.push({ role: 'assistant', content: welcomeEn });

  const welcomeDisplay = appState.language === 'hi' ? t('emer_welcome_hi') : t('emer_welcome');
  appendBubble(welcomeDisplay, 'agent');

  // Render inline quick-action pills in the chat history
  appendEmergencyPills();

  playAudio(welcomeDisplay, { auto: true });
});

document.getElementById('btn-planning').addEventListener('click', () => {
  appState.flow_mode = 'planning';
  appState.voiceoverEnabled = false;
  appState.conversation_history = [];
  appState.extracted_state = {};
  appState.currentCards = [];
  appState.currentPins = [];
  appState.awaitingAck = false;
  document.getElementById('chat-history').innerHTML = '';
  setDockEnabled(true);
  setEmergencyMode(false);
  _updateVoiceoverIcon();
  showScreen('chat');

  // Always push the English version to conversation_history; display the localized version
  const welcomeEn = appState.corridor_id === 'bihar_hyd'
    ? i18n.en.welcome_hyd
    : i18n.en.welcome_mum;
  appState.conversation_history.push({ role: 'assistant', content: welcomeEn });

  const welcomeDisplay = appState.corridor_id === 'bihar_hyd'
    ? t('welcome_hyd')
    : t('welcome_mum');

  const history = document.getElementById('chat-history');
  const row = document.createElement('div');
  row.className = 'bubble-row agent';
  const ttsBtn = document.createElement('button');
  ttsBtn.className = 'tts-btn';
  ttsBtn.innerHTML = ICON.speaker_on;
  ttsBtn.title = t('tts_title');
  ttsBtn.addEventListener('click', function() { playManual(welcomeDisplay); });
  var bubble = document.createElement('div');
  bubble.className = 'bubble agent';
  bubble.textContent = welcomeDisplay;
  row.appendChild(ttsBtn);
  row.appendChild(bubble);
  history.appendChild(row);

  playAudio(welcomeDisplay, { auto: true });
});

// Voiceover toggle
function _updateVoiceoverIcon() {
  const isEmergency = appState.flow_mode === 'emergency';
  document.getElementById('btn-voiceover').innerHTML = appState.voiceoverEnabled
    ? ICON.speaker_on
    : ICON.speaker_off;
}

document.getElementById('btn-voiceover').addEventListener('click', () => {
  appState.voiceoverEnabled = !appState.voiceoverEnabled;
  if (!appState.voiceoverEnabled) stopAudio();
  _updateVoiceoverIcon();
});

// Waveform canvas helpers
let _waveformRaf = null;
let _waveformLevel = 0;

function _startWaveform() {
  const canvas = document.getElementById('mic-waveform');
  if (!canvas) return;
  canvas.style.display = 'block';
  const ctx = canvas.getContext('2d');
  const W = canvas.width, H = canvas.height;
  const BARS = 9, BAR_W = 3, GAP = 2;
  const totalW = BARS * (BAR_W + GAP) - GAP;
  const startX = Math.round((W - totalW) / 2);
  function frame() {
    ctx.clearRect(0, 0, W, H);
    for (let i = 0; i < BARS; i++) {
      const dist = Math.abs(i - 4) / 4;
      const envelope = 1 - dist * 0.35;
      const noise = _waveformLevel > 0.005 ? (Math.random() - 0.5) * _waveformLevel * H * 0.6 : 0;
      const h = Math.max(2, _waveformLevel * H * 2.8 * envelope + noise);
      const x = startX + i * (BAR_W + GAP);
      ctx.fillStyle = '#2196f3';
      ctx.fillRect(x, Math.round((H - h) / 2), BAR_W, Math.round(h));
    }
    _waveformRaf = requestAnimationFrame(frame);
  }
  frame();
}

function _stopWaveform() {
  if (_waveformRaf) { cancelAnimationFrame(_waveformRaf); _waveformRaf = null; }
  _waveformLevel = 0;
  const canvas = document.getElementById('mic-waveform');
  if (canvas) canvas.style.display = 'none';
}

function _typewriterFill(input, text, onDone) {
  input.value = '';
  let i = 0;
  (function step() {
    if (i <= text.length) { input.value = text.slice(0, i++); setTimeout(step, 18); }
    else if (onDone) onDone();
  })();
}

// Mic button (STT)
let _recorder = null;
document.getElementById('mic-btn').addEventListener('click', async () => {
  const micBtn = document.getElementById('mic-btn');
  if (_recorder && _recorder.state === 'recording') {
    _recorder.stop();
    return;
  }
  stopAudio();  // cut any playing TTS before mic opens
  micBtn.classList.add('recording');
  micBtn.innerHTML = ICON.stop;
  const inp = document.getElementById('chat-input');
  const prevValue = inp.value;
  const prevPlaceholder = inp.placeholder;
  inp.value = '';
  inp.placeholder = '● Listening…';
  inp.disabled = true;
  _startWaveform();

  _recorder = await startSTT(
    text => {
      inp.disabled = false;
      inp.placeholder = prevPlaceholder;
      micBtn.classList.remove('recording');
      micBtn.innerHTML = ICON.mic;
      if (text) {
        _typewriterFill(inp, text, () => sendMessage());
      } else {
        inp.value = prevValue;
      }
    },
    err => {
      inp.disabled = false;
      inp.placeholder = prevPlaceholder;
      inp.value = prevValue;
      micBtn.classList.remove('recording');
      micBtn.innerHTML = ICON.mic;
      console.warn('STT error:', err);
    },
    rms => { _waveformLevel = rms; },
    () => {
      _stopWaveform();
      micBtn.classList.remove('recording');
      micBtn.innerHTML = ICON.mic;
      inp.placeholder = 'Processing…';
    }
  );
});

// Chat screen input dock
const chatInput = document.getElementById('chat-input');
const sendBtn   = document.getElementById('send-btn');
const inputDock = document.getElementById('input-dock');

// True while a /chat request is in flight; prevents concurrent sends
let _sending = false;

function _setSending(on) {
  _sending = on;
  // Re-enable send only when not sending AND not waiting for a HITL ack
  sendBtn.disabled   = on || appState.awaitingAck;
  sendBtn.innerHTML  = on ? ICON.stop : ICON.send;
}

// Reset session
document.getElementById('btn-reset').addEventListener('click', () => {
  try { stopAudio(); } catch (_) {}
  _sending = false;
  appState.conversation_history = [];
  appState.extracted_state = {};
  appState.currentCards = [];
  appState.currentPins = [];
  appState.awaitingAck = false;
  appState.voiceoverEnabled = false;
  sendBtn.disabled   = false;
  sendBtn.innerHTML  = ICON.send;
  setEmergencyMode(false);
  _updateVoiceoverIcon();
  clearChat();
  showScreen('language');
});

chatInput.addEventListener('keydown', e => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    if (!_sending && !appState.awaitingAck) sendMessage();
  }
});
sendBtn.addEventListener('click', () => {
  if (!_sending && !appState.awaitingAck) sendMessage();
});

function clearChat() {
  document.getElementById('chat-history').innerHTML = '';
  setDockEnabled(true);
  appState.awaitingAck = false;
}

function setDockEnabled(enabled) {
  inputDock.classList.toggle('disabled', !enabled);
  chatInput.disabled = !enabled;
  sendBtn.disabled = !enabled || _sending;
}

async function sendMessage() {
  if (_sending || appState.awaitingAck) return;
  const text = chatInput.value.trim();
  if (!text) return;

  stopAudio();
  chatInput.value = '';
  _setSending(true);

  appendBubble(text, 'user');
  appState.conversation_history.push({ role: 'user', content: text });

  // Inject the active scheme id so the backend knows which card the user is asking about
  const messageForApi = appState.activeSchemeId
    ? `[viewing scheme: ${appState.activeSchemeId}] ${text}`
    : text;

  const loading = appendSpinner();
  try {
    const resp = await postChat({
      message: messageForApi,
      conversation_history: appState.conversation_history.slice(-10),
      corridor_id: appState.corridor_id,
      flow_mode: appState.flow_mode,
      extracted_state: appState.extracted_state,
      language: appState.language,
    });
    loading.remove();
    if (resp.refusal && resp.refusal.type === 'A') {
      await new Promise(r => setTimeout(r, 1000 + Math.random() * 500));
    }
    handleChatResponse(resp);
  } catch (err) {
    loading.remove();
    appendBubble(t('chat_error'), 'agent');
    console.error(err);
  } finally {
    _setSending(false);
  }
}

// Emergency mode helpers
let _emerPillType = null;

// Legacy emergency screen pills (DOM still present); primary path uses chat-embedded pills
document.querySelectorAll('.emer-pill').forEach(pill => {
  pill.addEventListener('click', () => {
    // If we're on the chat screen in emergency mode, route through sendMessage
    if (appState.screen === 'chat' && appState.flow_mode === 'emergency') {
      const chatInput = document.getElementById('chat-input');
      chatInput.value = pill.dataset.msg;
      _emerPillType = pill.dataset.type;
      sendMessage();
      return;
    }
  });
});

// Toggle chat header styling between normal and emergency
function setEmergencyMode(active) {
  const header = document.querySelector('.chat-header');
  const heading = header ? header.querySelector('h3') : null;
  if (active) {
    header && header.classList.add('emergency-mode');
    if (heading) heading.textContent = t('emer_chat_heading');
  } else {
    header && header.classList.remove('emergency-mode');
    if (heading) heading.textContent = t('chat_heading');
  }
}

// Render quick-action pills inline in the chat history
function appendEmergencyPills() {
  const history = document.getElementById('chat-history');
  const container = document.createElement('div');
  container.className = 'emer-pills-inline';

  const pillData = [
    { type: 'medical', msgKey: 'pill_medical_msg', labelKey: 'pill_medical', cls: 'medical' },
    { type: 'police',  msgKey: 'pill_police_msg',  labelKey: 'pill_police',  cls: 'police'  },
    { type: 'shelter', msgKey: 'pill_shelter_msg', labelKey: 'pill_shelter', cls: 'shelter' },
  ];

  pillData.forEach(pd => {
    const btn = document.createElement('button');
    btn.className = `emer-pill-chat ${pd.cls}`;
    btn.innerHTML = t(pd.labelKey);
    btn.addEventListener('click', () => {
      _emerPillType = pd.type;
      document.getElementById('chat-input').value = t(pd.msgKey);
      sendMessage();
    });
    container.appendChild(btn);
  });

  history.appendChild(container);
  history.scrollTop = history.scrollHeight;
}

// Render an inline map in the chat history for emergency responses
function appendInlineMap(pins) {
  if (!pins || !pins.length) return;
  const history = document.getElementById('chat-history');
  const mapId = 'emer-map-' + Date.now();
  const mapDiv = document.createElement('div');
  mapDiv.id = mapId;
  mapDiv.className = 'emer-map-inline';
  history.appendChild(mapDiv);
  history.scrollTop = history.scrollHeight;
  setTimeout(() => {
    initMap(mapId);
    renderPins(pins, mapId);
  }, 80);
}

// Chat response renderer
function handleChatResponse(resp) {
  appState.conversation_history.push({ role: 'assistant', content: resp.response });
  if (resp.extracted_state && Object.keys(resp.extracted_state).length > 0) {
    appState.extracted_state = resp.extracted_state;
  }

  if (resp.refusal && resp.refusal.type) {
    renderRefusalPanel(resp.refusal, resp.sources || []);
    return;
  }

  // Skip offer when confidence_flag is also set; hedged fact must be resolved first
  if (resp.offer_update && appState.currentCards.length > 0 && !resp.confidence_flag) {
    renderUpdateOffer(resp.response);
    return;
  }

  // Normal agent bubble
  appendBubble(resp.response, 'agent');

  if (appState.flow_mode === 'emergency') {
    const pins = resp.map_pins || [];
    _emerPillType = null;

    // Render inline map in chat feed (no-ops if pins is empty)
    appendInlineMap(pins);

    playAudio(resp.response, { auto: true });
    return;
  }

  playAudio(resp.response, { auto: true });

  const hasCards = resp.cards && resp.cards.length > 0;
  const hasConfidence = !!resp.confidence_flag;

  if (hasCards) {
    // Fallback portal map covers all five schemes regardless of which chunks were retrieved
    const SCHEME_PORTALS = {
      eshram:  'https://eshram.gov.in',
      onorc:   'https://nfsa.gov.in',
      pmsby:   'https://jansuraksha.gov.in',
      pmjay:   'https://pmjay.gov.in',
      pm_sym:  'https://maandhan.in',
      bocw:    'https://tbocwwb.telangana.gov.in',
    };
    const portalMap = { ...SCHEME_PORTALS };
    (resp.sources || []).forEach(s => { if (s.official_portal) portalMap[s.scheme_id] = s.official_portal; });
    const enrichedCards = resp.cards.map(c => ({ ...c, official_portal: portalMap[c.scheme_id] || null }));
    appState.currentCards = enrichedCards;
    appState.currentPins = enrichedCards.flatMap(c => c.map_pins || []);

    if (hasConfidence) {
      // Buffer cards until the confidence panel is acknowledged
      appState.pendingCardRender = { enrichedCards, provenance: resp.provenance };
    } else {
      const confSchemeId = null;
      appendCards(enrichedCards, confSchemeId);
      if (resp.provenance) appendProvenance(resp.provenance);
    }
  }

  if (hasConfidence) {
    renderConfidencePanel(resp.confidence_flag, hasCards);
  } else if (resp.verification_required && !hasCards) {
    // Suppress HITL when cards were already returned in the same response
    renderRefusalPanel(
      { type: 'C', reason: (resp.refusal && resp.refusal.reason) || 'This situation needs human verification. Please contact a Common Service Centre (CSC) or call helpline 14434.' },
      resp.sources || []
    );
  }
}

// Update-offer banner
function renderUpdateOffer(text) {
  const history = document.getElementById('chat-history');
  const el = document.createElement('div');
  el.className = 'update-offer';

  const msg = document.createElement('p');
  msg.textContent = text;

  const btn = document.createElement('button');
  btn.className = 'update-offer-btn';
  btn.textContent = appState.language === 'hi' ? 'हाँ, अपडेट करें' : 'Yes, update my schemes';
  btn.addEventListener('click', () => {
    el.remove();
    const chatInput = document.getElementById('chat-input');
    chatInput.value = 'Yes, please update my scheme recommendations.';
    sendMessage();
  });

  el.appendChild(msg);
  el.appendChild(btn);
  history.appendChild(el);
  history.scrollTop = history.scrollHeight;
  playAudio(text, { auto: false });
}

// Bubble helpers
function appendBubble(text, role) {
  const history = document.getElementById('chat-history');
  const row = document.createElement('div');
  row.className = `bubble-row ${role}`;
  const bubble = document.createElement('div');
  bubble.className = `bubble ${role}`;

  if (role !== 'agent') {
    bubble.textContent = text;
  }

  if (role === 'agent') {
    const ttsBtn = document.createElement('button');
    ttsBtn.className = 'tts-btn';
    ttsBtn.innerHTML = ICON.speaker_on;
    ttsBtn.title = t('tts_title');
    ttsBtn.addEventListener('click', () => playManual(text));
    row.appendChild(ttsBtn);
  }
  row.appendChild(bubble);
  history.appendChild(row);
  history.scrollTop = history.scrollHeight;

  if (role === 'agent') {
    let i = 0;
    const _tw = setInterval(() => {
      if (i < text.length) {
        bubble.textContent += text[i++];
        history.scrollTop = history.scrollHeight;
      } else {
        clearInterval(_tw);
      }
    }, 18);
  }

  return row;
}

function appendSpinner() {
  const history = document.getElementById('chat-history');
  const el = document.createElement('div');
  el.className = 'spinner';
  history.appendChild(el);
  history.scrollTop = history.scrollHeight;
  return el;
}

// Provenance footer
function appendProvenance(prov) {
  const history = document.getElementById('chat-history');
  const bar = document.createElement('div');
  bar.className = 'provenance-bar';
  let html = `<span>${ICON.check} ${escHtml(t('prov_verified'))} ${escHtml(prov.oldest_verified_date)}</span>`;
  if (prov.contains_curated_sample) {
    html += `<span class="curated-warning">${ICON.warning} ${escHtml(t('prov_curated'))}</span>`;
  }
  bar.innerHTML = html;
  history.appendChild(bar);
}

// Traffic-light cards
function appendCards(cards, confidenceSchemeId = null) {
  const ORDER = { green: 0, yellow: 1, red: 2 };
  const sorted = [...cards].sort((a, b) => (ORDER[a.status] ?? 3) - (ORDER[b.status] ?? 3));

  const history = document.getElementById('chat-history');
  const container = document.createElement('div');
  container.className = 'cards-container';
  sorted.forEach(card => {
    const statusLabel = t(`status_${card.status}`);
    const el = document.createElement('div');
    el.className = `scheme-card ${card.status}${card.recommended_first ? ' recommended-first' : ''}`;
    el.innerHTML = `
      <div class="card-dot ${card.status}"></div>
      <div class="card-body">
        <div class="card-name">${escHtml(card.name)}</div>
        <div class="card-summary">${escHtml(card.summary)}</div>
        ${confidenceSchemeId && card.scheme_id === confidenceSchemeId
          ? `<div class="confirmation-badge">${ICON.warning} Needs confirmation</div>`
          : ''}
      </div>
      <div class="card-status-label ${card.status}">${escHtml(statusLabel)}</div>
    `;
    el.addEventListener('click', () => openDetail(card));
    container.appendChild(el);
  });
  history.appendChild(container);
  history.scrollTop = history.scrollHeight;
}

// Detail split-view
function openDetail(card) {
  appState.activeSchemeId = card.scheme_id || null;
  document.getElementById('detail-scheme-name').textContent = card.name;
  document.getElementById('detail-status-dot').className = `card-dot ${card.status}`;

  document.getElementById('detail-detail').textContent = card.detail;

  const checklist = document.getElementById('detail-checklist');
  checklist.innerHTML = (card.document_checklist || []).map(d => `<li>${escHtml(formatDocName(d))}</li>`).join('');

  const timelineEl = document.getElementById('detail-timeline');
  timelineEl.innerHTML = '';
  (card.timeline || []).forEach((step, i) => {
    const li = document.createElement('li');
    li.className = 'timeline-item' + (step.has_location ? ' has-location' : '');
    li.innerHTML = `
      <div class="step-num">${i + 1}</div>
      <div class="step-text">${escHtml(step.step)}</div>
    `;
    if (step.has_location && step.pin_ids.length) {
      li.addEventListener('click', () => updatePins(step.pin_ids));
    }
    timelineEl.appendChild(li);
  });

  const allCardPins = card.map_pins || [];
  setTimeout(() => {
    initMap('map-container');
    renderPins(allCardPins, 'map-container');
  }, 100);

  const provEl = document.getElementById('detail-provenance');
  if (provEl) {
    if (card.official_portal) {
      provEl.innerHTML = `<a href="${escHtml(card.official_portal)}" target="_blank" rel="noopener">${escHtml(t('prov_check'))} →</a>`;
      provEl.style.display = '';
    } else {
      provEl.style.display = 'none';
    }
  }

  showScreen('detail');
}

document.getElementById('btn-back-detail').addEventListener('click', () => {
  appState.activeSchemeId = null;
  showScreen('chat');
});

// Confidence handoff panel
function renderConfidencePanel(flag, hasPendingCards) {
  const history = document.getElementById('chat-history');
  const panel = document.createElement('div');
  panel.className = 'refusal-panel type-c confidence-handoff';
  panel.innerHTML = `
    <h4>${ICON.warning} One thing to confirm first</h4>
    <p>Before we can be certain: <strong>${escHtml(flag.unresolved_fact)}</strong>.</p>
    <blockquote class="verify-question">"${escHtml(flag.verify_question)}"</blockquote>
    <p class="verify-contact">Ask at: <strong>${escHtml(flag.contact)}</strong></p>
  `;

  const ackBtn = document.createElement('button');
  ackBtn.className = 'confidence-ack-btn';
  ackBtn.textContent = hasPendingCards
    ? (appState.language === 'hi' ? 'ठीक है, मेरी योजनाएँ दिखाएँ' : 'Got it. Show me my scheme recommendations')
    : (appState.language === 'hi' ? 'समझ गया' : 'Got it');

  ackBtn.addEventListener('click', () => {
    panel.remove();
    if (hasPendingCards && appState.pendingCardRender) {
      const { enrichedCards, provenance } = appState.pendingCardRender;
      appState.pendingCardRender = null;
      appendCards(enrichedCards, null);
      if (provenance) appendProvenance(provenance);
    } else if (appState.currentCards.length === 0) {
      const chatInput = document.getElementById('chat-input');
      chatInput.value = appState.language === 'hi' ? 'कृपया जारी रखें।' : 'Please continue.';
      sendMessage();
    }
  });

  panel.appendChild(ackBtn);
  history.appendChild(panel);
  history.scrollTop = history.scrollHeight;
  playAudio(flag.unresolved_fact + '. ' + flag.verify_question, { auto: true });
}

// Refusal and HITL panel
function renderRefusalPanel(refusal, sources) {
  const history = document.getElementById('chat-history');
  const panel = document.createElement('div');
  const typeClass = refusal.type ? `type-${refusal.type.toLowerCase()}` : '';
  panel.className = `refusal-panel ${typeClass}`;

  let title = '', body = '', extra = '';

  if (refusal.type === 'A') {
    title = t('refusal_a_title');
    body = refusal.reason;
  } else if (refusal.type === 'B') {
    title = t('refusal_b_title');
    body = refusal.reason;
    if (sources.length) {
      extra = '<div class="portal-links">' + sources.map(s =>
        `<a href="${escHtml(s.official_portal)}" target="_blank" rel="noopener">${escHtml(t('refusal_b_portal'))}: ${escHtml(s.scheme_id)} →</a>`
      ).join('') + '</div>';
    }
    extra += `<a href="https://myscheme.gov.in" target="_blank" rel="noopener">${escHtml(t('refusal_b_browse'))}</a>`;
  } else if (refusal.type === 'C') {
    title = t('refusal_c_title');
    body = refusal.reason;
    extra = `
      <p>${escHtml(t('refusal_c_helpline'))} <strong>14434</strong> | ${escHtml(t('refusal_c_emergency'))} <strong>112</strong></p>
    `;
  }

  const titleHtml = refusal.type === 'C' ? `${ICON.warning} ${escHtml(title)}` : escHtml(title);
  panel.innerHTML = `<h4>${titleHtml}</h4><p>${escHtml(body)}</p>${extra}`;

  // Type C: lock the input dock until acknowledged
  if (refusal.type === 'C') {
    appState.awaitingAck = true;
    setDockEnabled(false);

    const ackBtn = document.createElement('button');
    ackBtn.className = 'confidence-ack-btn';
    ackBtn.textContent = t('refusal_c_ack');

    ackBtn.addEventListener('click', () => {
      ackBtn.textContent = t('refusal_c_acked');
      ackBtn.disabled = true;
      appState.awaitingAck = false;
      setDockEnabled(true);

      if (appState.currentCards.length === 0) {
        chatInput.value = appState.language === 'hi'
          ? 'कृपया जारी रखें।'
          : 'Please continue.';
        sendMessage();
      }
    });

    panel.appendChild(ackBtn);
    playAudio(body, { auto: true });
  }

  history.appendChild(panel);
  history.scrollTop = history.scrollHeight;
}

// Document name formatter; normalises raw snake_case identifiers from the backend
const _DOC_NAMES = {
  ration_card:     'Ration Card',
  aadhaar:         'Aadhaar card',
  aadhar:          'Aadhaar card',
  uid:             'Aadhaar card',
  jan_dhan:        'Jan Dhan passbook',
  jan_dhan_account:'Jan Dhan passbook',
  eshram_uan:      'e-Shram card / UAN',
  eshram:          'e-Shram card / UAN',
  uan:             'e-Shram UAN',
  mobile:          'Mobile number',
  mobile_number:   'Mobile number',
  bank_account:    'Bank passbook',
  passport:        'Passport',
  voter_id:        'Voter ID card',
  driving_license: 'Driving Licence',
};
function formatDocName(raw) {
  const prefix = raw.match(/^(Obtain first:\s*)/i);
  const name = prefix ? raw.slice(prefix[0].length) : raw;
  const key = name.toLowerCase().trim().replace(/[\s\-/]+/g, '_');
  const formatted = _DOC_NAMES[key] || name.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
  return prefix ? prefix[0] + formatted : formatted;
}

// Utility
function escHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

applyI18n();