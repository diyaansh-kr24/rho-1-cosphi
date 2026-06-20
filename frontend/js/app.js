// ── Localization dictionary ─────────────────────────────────────────────────
const i18n = {
  en: {
    // Language screen
    app_title: 'Saarthi',

    // Triage screen
    triage_heading: 'Where are you traveling?',
    corridor_label: 'Where are you located now?',
    corridor_hyd: 'Hyderabad (Telangana)',
    corridor_mum: 'Mumbai (Maharashtra)',
    btn_emergency: '🔴 Emergency — I need help now',
    btn_planning: '🔵 Plan my benefits',

    // Emergency screen
    emer_heading: '🔴 Emergency Help',
    emer_placeholder: "Describe your emergency — e.g. 'I need a hospital' or 'I have no shelter'",
    pill_medical: '🚑 Medical',
    pill_police: '👮 Police',
    pill_shelter: '🏠 Shelter',
    btn_get_help: 'Get Help Now',
    emer_error: 'Error — please call 112.',
    emer_chat_heading: '🔴 Emergency Help',
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
    prov_verified: '✓ Verified against official sources as of',
    prov_check: 'View official site',
    prov_curated: '⚠ Some office locations are illustrative sample data. Verify addresses before visiting.',

    // Refusal panels
    refusal_a_title: 'Outside Scope',
    refusal_b_title: 'Scheme Not Covered',
    refusal_b_portal: 'Official portal',
    refusal_b_browse: 'Browse all schemes at myscheme.gov.in →',
    refusal_c_title: '⚠ Human Help Needed',
    refusal_c_helpline: 'Helpline:',
    refusal_c_emergency: 'Emergency:',
    refusal_c_ack: 'I understand — continue',
    refusal_c_acked: 'Acknowledged',

    // Welcome messages
    welcome_hyd: 'Namaste! I am Saarthi. I am here to help you find government benefits you may be eligible for in Hyderabad, Telangana. To get started — what do you need help with most right now? For example: food, health cover, accident insurance, pension, or registering as a worker.',
    welcome_mum: 'Namaste! I am Saarthi. I am here to help you find government benefits you may be eligible for in Mumbai, Maharashtra. To get started — what do you need help with most right now? For example: food, health cover, accident insurance, pension, or registering as a worker.',

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
    btn_emergency: '🔴 आपातकाल — मुझे अभी मदद चाहिए',
    btn_planning: '🔵 मेरे लाभों की योजना बनाएं',

    // Emergency screen
    emer_heading: '🔴 आपातकालीन सहायता',
    emer_placeholder: "अपनी आपातकालीन स्थिति बताएं — जैसे 'मुझे अस्पताल चाहिए' या 'मुझे आश्रय चाहिए'",
    pill_medical: '🚑 चिकित्सा',
    pill_police: '👮 पुलिस',
    pill_shelter: '🏠 आश्रय',
    btn_get_help: 'अभी मदद लें',
    emer_error: 'त्रुटि — कृपया 112 पर कॉल करें।',
    emer_chat_heading: '🔴 आपातकालीन सहायता',
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
    prov_verified: '✓ सरकारी स्रोतों से सत्यापित, तिथि:',
    prov_check: 'आधिकारिक साइट देखें',
    prov_curated: '⚠ कुछ कार्यालय स्थान नमूना डेटा हैं। जाने से पहले पते सत्यापित करें।',

    // Refusal panels
    refusal_a_title: 'दायरे से बाहर',
    refusal_b_title: 'योजना शामिल नहीं',
    refusal_b_portal: 'आधिकारिक पोर्टल',
    refusal_b_browse: 'myscheme.gov.in पर सभी योजनाएं देखें →',
    refusal_c_title: '⚠ मानवीय सहायता आवश्यक',
    refusal_c_helpline: 'हेल्पलाइन:',
    refusal_c_emergency: 'आपातकालीन:',
    refusal_c_ack: 'मैं समझता/समझती हूँ — जारी रखें',
    refusal_c_acked: 'स्वीकृत',

    // Welcome messages
    welcome_hyd: 'नमस्ते! मैं Saarthi हूँ। मैं हैदराबाद, तेलंगाना में आपके लिए सरकारी योजनाएँ खोजने में मदद करूँगा। शुरू करने के लिए — आपको अभी सबसे ज़्यादा किस चीज़ की ज़रूरत है? जैसे: खाना, स्वास्थ्य सुविधा, दुर्घटना बीमा, पेंशन, या मज़दूर पंजीकरण।',
    welcome_mum: 'नमस्ते! मैं Saarthi हूँ। मैं मुंबई, महाराष्ट्र में आपके लिए सरकारी योजनाएँ खोजने में मदद करूँगा। शुरू करने के लिए — आपको अभी सबसे ज़्यादा किस चीज़ की ज़रूरत है? जैसे: खाना, स्वास्थ्य सुविधा, दुर्घटना बीमा, पेंशन, या मज़दूर पंजीकरण।',

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

// ── Localization helper ────────────────────────────────────────────────────
function t(key) {
  const lang = appState.language || 'en';
  return (i18n[lang] && i18n[lang][key]) || i18n.en[key] || key;
}

// Walk the DOM and apply translations to all data-i18n annotated elements
function applyI18n() {
  // textContent for data-i18n
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    const val = t(key);
    // Some keys contain HTML (e.g. detail_steps with <span>), use innerHTML for those
    if (val.includes('<')) {
      el.innerHTML = val;
    } else {
      el.textContent = val;
    }
  });
  // placeholder for data-i18n-placeholder
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    el.placeholder = t(el.getAttribute('data-i18n-placeholder'));
  });
  // title for data-i18n-title
  document.querySelectorAll('[data-i18n-title]').forEach(el => {
    el.title = t(el.getAttribute('data-i18n-title'));
  });
}

// ── Global state ───────────────────────────────────────────────────────────
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
};

// ── Screen routing ─────────────────────────────────────────────────────────
function showScreen(name) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  const el = document.getElementById(`screen-${name}`);
  if (el) el.classList.add('active');
  appState.screen = name;
  applyI18n();   // refresh translations whenever a screen becomes visible
}

// ── Language screen ────────────────────────────────────────────────────────
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

// ── Triage screen ──────────────────────────────────────────────────────────
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

  // Emergency welcome message
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

  // Welcome message: always store the English version in conversation_history
  // (backend only handles English), but display the localized version
  var welcomeEn = appState.corridor_id === 'bihar_hyd'
    ? i18n.en.welcome_hyd
    : i18n.en.welcome_mum;
  appState.conversation_history.push({ role: 'assistant', content: welcomeEn });

  var welcomeDisplay = appState.corridor_id === 'bihar_hyd'
    ? t('welcome_hyd')
    : t('welcome_mum');

  var history = document.getElementById('chat-history');
  var row = document.createElement('div');
  row.className = 'bubble-row agent';
  var ttsBtn = document.createElement('button');
  ttsBtn.className = 'tts-btn';
  ttsBtn.textContent = '🔊';
  ttsBtn.title = t('tts_title');
  ttsBtn.addEventListener('click', function() { playManual(welcomeDisplay); });
  var bubble = document.createElement('div');
  bubble.className = 'bubble agent';
  bubble.textContent = welcomeDisplay;
  row.appendChild(ttsBtn);
  row.appendChild(bubble);
  history.appendChild(row);

  // Auto-play welcome message when voiceover is enabled
  playAudio(welcomeDisplay, { auto: true });
});

// ── Voiceover toggle ───────────────────────────────────────────────────────
function _updateVoiceoverIcon() {
  const isEmergency = appState.flow_mode === 'emergency';
  document.getElementById('btn-voiceover').textContent = appState.voiceoverEnabled
    ? (isEmergency ? '📢' : '🔊')
    : (isEmergency ? '🔕' : '🔇');
}

document.getElementById('btn-voiceover').addEventListener('click', () => {
  appState.voiceoverEnabled = !appState.voiceoverEnabled;
  if (!appState.voiceoverEnabled) stopAudio();
  _updateVoiceoverIcon();
});

// ── Waveform canvas helpers ────────────────────────────────────────────────
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

// ── Mic button (STT) ───────────────────────────────────────────────────────
let _recorder = null;
document.getElementById('mic-btn').addEventListener('click', async () => {
  const micBtn = document.getElementById('mic-btn');
  if (_recorder && _recorder.state === 'recording') {
    _recorder.stop();
    return;
  }
  stopAudio();  // cut any playing TTS before mic opens
  micBtn.classList.add('recording');
  micBtn.textContent = '⏹';
  const inp = document.getElementById('chat-input');
  const prevValue = inp.value;
  const prevPlaceholder = inp.placeholder;
  inp.value = '';
  inp.placeholder = '● Listening…';
  inp.disabled = true;
  _startWaveform();

  _recorder = await startSTT(
    text => {
      // Transcription arrived
      inp.disabled = false;
      inp.placeholder = prevPlaceholder;
      micBtn.classList.remove('recording');
      micBtn.textContent = '🎤';
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
      micBtn.textContent = '🎤';
      console.warn('STT error:', err);
    },
    rms => { _waveformLevel = rms; },
    () => {
      // Recording stopped, API call now in progress
      _stopWaveform();
      micBtn.classList.remove('recording');
      micBtn.textContent = '🎤';
      inp.placeholder = 'Processing…';
    }
  );
});

// ── Chat screen — input dock ───────────────────────────────────────────────
const chatInput = document.getElementById('chat-input');
const sendBtn   = document.getElementById('send-btn');
const inputDock = document.getElementById('input-dock');

// Guard against concurrent sends — true while a /chat request is in flight
let _sending = false;

function _setSending(on) {
  _sending = on;
  // Re-enable send only when not sending AND not waiting for a HITL ack
  sendBtn.disabled    = on || appState.awaitingAck;
  sendBtn.textContent = on ? '■' : '➤';
}

// ── Reset session ──────────────────────────────────────────────────────────
document.getElementById('btn-reset').addEventListener('click', () => {
  try { stopAudio(); } catch (_) {}
  _sending = false;
  appState.conversation_history = [];
  appState.extracted_state = {};
  appState.currentCards = [];
  appState.currentPins = [];
  appState.awaitingAck = false;
  appState.voiceoverEnabled = false;
  sendBtn.disabled    = false;
  sendBtn.textContent = '➤';
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

  // If the user is on a detail card, tell the backend which scheme they're looking at
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

// ── Emergency mode helpers ─────────────────────────────────────────────────
let _emerPillType = null;

// Legacy: the old emergency screen pills still exist in the DOM.
// Attach listeners so they work if someone ever navigates there,
// but the primary path now uses the chat-embedded pills.
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

// Toggle the chat header between normal and emergency styling
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

// Render inline quick-action pills inside the chat history
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
    btn.textContent = t(pd.labelKey);
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

// Render an inline map within the chat history (for emergency responses)
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

// ── Chat response renderer ─────────────────────────────────────────────────
function handleChatResponse(resp) {
  appState.conversation_history.push({ role: 'assistant', content: resp.response });
  if (resp.extracted_state && Object.keys(resp.extracted_state).length > 0) {
    appState.extracted_state = resp.extracted_state;
  }

  // Refusal / HITL panels
  if (resp.refusal && resp.refusal.type) {
    renderRefusalPanel(resp.refusal, resp.sources || []);
    return;
  }

  // Normal agent bubble
  appendBubble(resp.response, 'agent');

  // ── Emergency-specific: inline map + auto-play with safety override ──
  if (appState.flow_mode === 'emergency') {
    // Backend filters pins by crisis_type — only non-empty when crisis is identified
    const pins = resp.map_pins || [];
    _emerPillType = null;

    // Render inline map in chat feed (no-ops if pins is empty)
    appendInlineMap(pins);

    playAudio(resp.response, { auto: true });
    return;
  }

  // Auto-play TTS for new agent message when voiceover toggle is ON
  playAudio(resp.response, { auto: true });

  // Traffic-light cards
  if (resp.cards && resp.cards.length > 0) {
    // Fallback portal map — covers all five schemes regardless of which chunks were retrieved
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
    // Pass confidence scheme_id so the affected card gets a confirmation badge
    const confSchemeId = resp.confidence_flag ? resp.confidence_flag.scheme_id : null;
    appendCards(enrichedCards, confSchemeId);
    // Provenance footer — date only, links moved to detail view
    if (resp.provenance) {
      appendProvenance(resp.provenance);
    }
  }

  // Confidence handoff — non-blocking, conversation continues
  if (resp.confidence_flag) {
    renderConfidencePanel(resp.confidence_flag);
  } else if (resp.verification_required) {
    renderRefusalPanel(
      { type: 'C', reason: (resp.refusal && resp.refusal.reason) || 'This situation needs human verification. Please contact a Common Service Centre (CSC) or call helpline 14434.' },
      resp.sources || []
    );
  }
}

// ── Bubble helpers ─────────────────────────────────────────────────────────
function appendBubble(text, role) {
  const history = document.getElementById('chat-history');
  const row = document.createElement('div');
  row.className = `bubble-row ${role}`;
  const bubble = document.createElement('div');
  bubble.className = `bubble ${role}`;
  bubble.textContent = text;

  if (role === 'agent') {
    const ttsBtn = document.createElement('button');
    ttsBtn.className = 'tts-btn';
    ttsBtn.textContent = '🔊';
    ttsBtn.title = t('tts_title');
    ttsBtn.addEventListener('click', () => playManual(text));
    row.appendChild(ttsBtn);
  }
  row.appendChild(bubble);
  history.appendChild(row);
  history.scrollTop = history.scrollHeight;
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

// ── Provenance footer ──────────────────────────────────────────────────────
function appendProvenance(prov) {
  const history = document.getElementById('chat-history');
  const bar = document.createElement('div');
  bar.className = 'provenance-bar';
  let html = `<span>${escHtml(t('prov_verified'))} ${escHtml(prov.oldest_verified_date)}</span>`;
  if (prov.contains_curated_sample) {
    html += `<span class="curated-warning">${escHtml(t('prov_curated'))}</span>`;
  }
  bar.innerHTML = html;
  history.appendChild(bar);
}

// ── Traffic-light cards ────────────────────────────────────────────────────
function appendCards(cards, confidenceSchemeId = null) {
  const ORDER = { green: 0, yellow: 1, red: 2 };
  const sorted = [...cards].sort((a, b) => (ORDER[a.status] ?? 3) - (ORDER[b.status] ?? 3));

  const history = document.getElementById('chat-history');
  const container = document.createElement('div');
  container.className = 'cards-container';
  sorted.forEach(card => {
    const statusLabel = t(`status_${card.status}`);
    const el = document.createElement('div');
    el.className = `scheme-card ${card.status}`;
    el.innerHTML = `
      <div class="card-dot ${card.status}"></div>
      <div class="card-body">
        <div class="card-name">${escHtml(card.name)}</div>
        <div class="card-summary">${escHtml(card.summary)}</div>
        ${confidenceSchemeId && card.scheme_id === confidenceSchemeId
          ? '<div class="confirmation-badge">⚠ Needs confirmation</div>'
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

// ── Detail split-view ──────────────────────────────────────────────────────
function openDetail(card) {
  appState.activeSchemeId = card.scheme_id || null;
  document.getElementById('detail-scheme-name').textContent = card.name;
  document.getElementById('detail-status-dot').className = `card-dot ${card.status}`;

  document.getElementById('detail-detail').textContent = card.detail;

  const checklist = document.getElementById('detail-checklist');
  checklist.innerHTML = (card.document_checklist || []).map(d => `<li>${escHtml(d)}</li>`).join('');

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

  // Map — collect all pins for this card
  const allCardPins = card.map_pins || [];
  setTimeout(() => {
    initMap('map-container');
    renderPins(allCardPins, 'map-container');
  }, 100);

  // Portal link — "Check current rules" for this scheme
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

// ── Confidence handoff panel (non-blocking) ────────────────────────────────
function renderConfidencePanel(flag) {
  const history = document.getElementById('chat-history');
  const panel = document.createElement('div');
  panel.className = 'refusal-panel type-c confidence-handoff';
  panel.innerHTML = `
    <h4>⚠ One thing to confirm first</h4>
    <p>Before we can be certain: <strong>${escHtml(flag.unresolved_fact)}</strong>.</p>
    <blockquote class="verify-question">"${escHtml(flag.verify_question)}"</blockquote>
    <p class="verify-contact">Ask at: <strong>${escHtml(flag.contact)}</strong></p>
  `;
  history.appendChild(panel);
  history.scrollTop = history.scrollHeight;
  playAudio(flag.unresolved_fact + '. ' + flag.verify_question, { auto: true });
}

// ── Refusal / HITL panel ───────────────────────────────────────────────────
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

  panel.innerHTML = `<h4>${escHtml(title)}</h4><p>${escHtml(body)}</p>${extra}`;
  history.appendChild(panel);
  history.scrollTop = history.scrollHeight;

  if (refusal.type === 'C') {
    playAudio(body, { auto: true });
  }
}

// ── Utility ────────────────────────────────────────────────────────────────
function escHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// ── Initial i18n pass on page load ─────────────────────────────────────────
applyI18n();