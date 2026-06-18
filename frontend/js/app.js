// ── Localization dictionary ─────────────────────────────────────────────────
const i18n = {
  en: {
    // Language screen
    app_title: 'Migrant Worker Navigator',

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

    // Chat screen
    chat_heading: 'Welfare Navigator',
    reset_title: 'Reset session',
    mic_title: 'Speak',
    chat_placeholder: 'Tell me about your situation…',
    send_title: 'Send',
    chat_error: 'Sorry, something went wrong. Please try again.',

    // Detail screen
    detail_about: 'About this scheme',
    detail_docs: 'Documents you will likely need',
    detail_steps: 'Steps to apply <span style="font-size:.8rem;color:#9e9e9e">(tap 📍 steps to see on map)</span>',
    detail_offices: 'Office locations',

    // Provenance
    prov_verified: '✓ Verified against official sources as of',
    prov_check: 'Check current rules',
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
    welcome_hyd: 'Namaste! I am your Welfare Navigator. I see that you are currently located in Hyderabad, Telangana and I can help you check your eligibility and apply for government benefits and schemes relevant to you. To get started, tell me a little about your situation. What kind of work or labour do you currently do?',
    welcome_mum: 'Namaste! I am your Welfare Navigator. I see that you are currently located in Mumbai, Maharashtra and I can help you check your eligibility and apply for government benefits and schemes relevant to you. To get started, tell me a little about your situation. What kind of work or labour do you currently do?',

    // TTS button
    tts_title: 'Read aloud',
  },
  hi: {
    // Language screen
    app_title: 'प्रवासी कामगार नेविगेटर',

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

    // Chat screen
    chat_heading: 'कल्याण नेविगेटर',
    reset_title: 'सत्र रीसेट करें',
    mic_title: 'बोलें',
    chat_placeholder: 'अपनी स्थिति के बारे में बताएं…',
    send_title: 'भेजें',
    chat_error: 'क्षमा करें, कुछ गलत हो गया। कृपया पुनः प्रयास करें।',

    // Detail screen
    detail_about: 'इस योजना के बारे में',
    detail_docs: 'आवश्यक दस्तावेज़',
    detail_steps: 'आवेदन के चरण <span style="font-size:.8rem;color:#9e9e9e">(📍 चरण पर टैप करें)</span>',
    detail_offices: 'कार्यालय स्थान',

    // Provenance
    prov_verified: '✓ सरकारी स्रोतों से सत्यापित, तिथि:',
    prov_check: 'वर्तमान नियम जाँचें',
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
    welcome_hyd: 'नमस्ते! मैं आपका कल्याण नेविगेटर हूँ। आप अभी हैदराबाद, तेलंगाना में हैं और मैं आपको सरकारी लाभ और योजनाओं के लिए पात्रता जाँचने और आवेदन करने में मदद कर सकता हूँ। शुरू करने के लिए, अपनी स्थिति बताएं। आप किस प्रकार का काम करते हैं?',
    welcome_mum: 'नमस्ते! मैं आपका कल्याण नेविगेटर हूँ। आप अभी मुंबई, महाराष्ट्र में हैं और मैं आपको सरकारी लाभ और योजनाओं के लिए पात्रता जाँचने और आवेदन करने में मदद कर सकता हूँ। शुरू करने के लिए, अपनी स्थिति बताएं। आप किस प्रकार का काम करते हैं?',

    // TTS button
    tts_title: 'ज़ोर से पढ़ें',
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
  currentCards: [],       // last set of scheme cards
  currentPins: [],        // all map pins for current response
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
  clearChat();
  showScreen('emergency');
});

document.getElementById('btn-planning').addEventListener('click', () => {
  appState.flow_mode = 'planning';
  appState.conversation_history = [];
  appState.currentCards = [];
  appState.currentPins = [];
  appState.awaitingAck = false;
  document.getElementById('chat-history').innerHTML = '';
  setDockEnabled(true);
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
});

// ── Voiceover toggle ───────────────────────────────────────────────────────
document.getElementById('btn-voiceover').addEventListener('click', () => {
  appState.voiceoverEnabled = !appState.voiceoverEnabled;
  document.getElementById('btn-voiceover').textContent = appState.voiceoverEnabled ? '🔊' : '🔇';
});

// ── Mic button (STT) ───────────────────────────────────────────────────────
let _recorder = null;
document.getElementById('mic-btn').addEventListener('click', async () => {
  const micBtn = document.getElementById('mic-btn');
  if (_recorder && _recorder.state === 'recording') {
    _recorder.stop();
    micBtn.textContent = '🎤';
    return;
  }
  micBtn.textContent = '⏹';
  _recorder = await startSTT(
    text => {
      micBtn.textContent = '🎤';
      if (text) {
        document.getElementById('chat-input').value = text;
        sendMessage();
      }
    },
    err => {
      micBtn.textContent = '🎤';
      console.warn('STT error:', err);
    }
  );
});

// ── Reset session ──────────────────────────────────────────────────────────
document.getElementById('btn-reset').addEventListener('click', () => {
  appState.conversation_history = [];
  appState.currentCards = [];
  appState.currentPins = [];
  appState.awaitingAck = false;
  clearChat();
  showScreen('language');
});

// ── Chat screen — input dock ───────────────────────────────────────────────
const chatInput = document.getElementById('chat-input');
const sendBtn   = document.getElementById('send-btn');
const inputDock = document.getElementById('input-dock');

chatInput.addEventListener('keydown', e => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    if (!appState.awaitingAck) sendMessage();
  }
});
sendBtn.addEventListener('click', () => {
  if (!appState.awaitingAck) sendMessage();
});

function clearChat() {
  document.getElementById('chat-history').innerHTML = '';
  setDockEnabled(true);
  appState.awaitingAck = false;
}

function setDockEnabled(enabled) {
  inputDock.classList.toggle('disabled', !enabled);
  chatInput.disabled = !enabled;
  sendBtn.disabled   = !enabled;
}

async function sendMessage() {
  const text = chatInput.value.trim();
  if (!text) return;
  chatInput.value = '';

  appendBubble(text, 'user');
  appState.conversation_history.push({ role: 'user', content: text });

  const loading = appendSpinner();
  try {
    const resp = await postChat({
      message: text,
      conversation_history: appState.conversation_history.slice(-10),
      corridor_id: appState.corridor_id,
      flow_mode: appState.flow_mode,
    });
    loading.remove();
    handleChatResponse(resp);
  } catch (err) {
    loading.remove();
    appendBubble(t('chat_error'), 'agent');
    console.error(err);
  }
}

// ── Emergency screen ───────────────────────────────────────────────────────
let _emerPillType = null;

document.querySelectorAll('.emer-pill').forEach(pill => {
  pill.addEventListener('click', () => {
    document.getElementById('emer-input').value = pill.dataset.msg;
    _emerPillType = pill.dataset.type;
    pill.classList.add('pressed');
    setTimeout(() => pill.classList.remove('pressed'), 300);
    sendEmergency();
  });
});

document.getElementById('emer-send-btn').addEventListener('click', sendEmergency);
document.getElementById('emer-input').addEventListener('keydown', e => {
  if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendEmergency(); }
});

async function sendEmergency() {
  const text = document.getElementById('emer-input').value.trim();
  if (!text) return;
  document.getElementById('emer-input').value = '';
  const loading = appendSpinner();
  try {
    const resp = await postChat({
      message: text,
      conversation_history: [],
      corridor_id: appState.corridor_id,
      flow_mode: 'emergency',
    });
    loading.remove();
    renderEmergencyResponse(resp);
  } catch (err) {
    loading.remove();
    document.getElementById('emer-result').innerHTML = '<p style="color:#e74c3c">' + escHtml(t('emer_error')) + '</p>';
  }
}

function renderEmergencyResponse(resp) {
  const el = document.getElementById('emer-result');

  // Format bullet-point response as a styled list
  const lines = (resp.response || '').split('\n').filter(l => l.trim());
  const formatted = lines.map(l => {
    const text = l.replace(/^•\s*/, '');
    return `<li>${escHtml(text)}</li>`;
  }).join('');
  el.innerHTML = `<ul class="emer-bullets">${formatted || '<li>' + escHtml(resp.response) + '</li>'}</ul>`;

  // Filter pins by pill type if a pill was tapped
  let pins = resp.map_pins || [];
  if (_emerPillType && pins.length) {
    pins = pins.filter(p => p.emergency_category === _emerPillType);
  }
  _emerPillType = null;

  if (pins.length) {
    const mapDiv = document.createElement('div');
    mapDiv.id = 'emer-map';
    mapDiv.className = 'emer-map';
    el.appendChild(mapDiv);
    setTimeout(() => {
      initMap('emer-map');
      renderPins(pins, 'emer-map');
    }, 80);
  }

  playAudio(resp.response, { auto: true, forceEmergency: true });
}

// ── Chat response renderer ─────────────────────────────────────────────────
function handleChatResponse(resp) {
  appState.conversation_history.push({ role: 'assistant', content: resp.response });

  // Refusal / HITL panels
  if (resp.refusal && resp.refusal.type) {
    renderRefusalPanel(resp.refusal, resp.sources || []);
    if (resp.refusal.type === 'C') {
      appState.awaitingAck = true;
      setDockEnabled(false);
    }
    return;
  }

  // Normal agent bubble
  appendBubble(resp.response, 'agent');

  // Traffic-light cards
  if (resp.cards && resp.cards.length > 0) {
    appState.currentCards = resp.cards;
    appState.currentPins = resp.cards.flatMap(c => c.map_pins || []);
    appendCards(resp.cards);
    // Provenance footer only when cards are present (end of intake)
    if (resp.provenance) {
      appendProvenance(resp.provenance, resp.sources || []);
    }
  }

  if (resp.verification_required) {
    appState.awaitingAck = true;
    setDockEnabled(false);
    // Render amber HITL panel if backend flagged it outside of a refusal.type:'C' response
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
function appendProvenance(prov, sources) {
  const history = document.getElementById('chat-history');
  const bar = document.createElement('div');
  bar.className = 'provenance-bar';
  let html = `<span>${escHtml(t('prov_verified'))} ${escHtml(prov.oldest_verified_date)}</span>`;
  if (sources.length) {
    html += '<span>' + sources.map(s =>
      `<a href="${escHtml(s.official_portal)}" target="_blank" rel="noopener">${escHtml(t('prov_check'))} (${escHtml(s.scheme_id)}) →</a>`
    ).join(' ') + '</span>';
  }
  if (prov.contains_curated_sample) {
    html += `<span class="curated-warning">${escHtml(t('prov_curated'))}</span>`;
  }
  bar.innerHTML = html;
  history.appendChild(bar);
}

// ── Traffic-light cards ────────────────────────────────────────────────────
function appendCards(cards) {
  const history = document.getElementById('chat-history');
  const container = document.createElement('div');
  container.className = 'cards-container';
  cards.forEach(card => {
    const el = document.createElement('div');
    el.className = `scheme-card ${card.status}`;
    el.innerHTML = `
      <div class="card-dot ${card.status}"></div>
      <div class="card-body">
        <div class="card-name">${escHtml(card.name)}</div>
        <div class="card-summary">${escHtml(card.summary)}</div>
      </div>
    `;
    if (card.status !== 'red') {
      el.addEventListener('click', () => openDetail(card));
    }
    container.appendChild(el);
  });
  history.appendChild(container);
  history.scrollTop = history.scrollHeight;
}

// ── Detail split-view ──────────────────────────────────────────────────────
function openDetail(card) {
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
      <div class="step-text">${escHtml(step.step)}${step.has_location ? '<span class="step-pin-icon">📍</span>' : ''}</div>
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

  showScreen('detail');
}

document.getElementById('btn-back-detail').addEventListener('click', () => {
  showScreen('chat');
});

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
      <button class="ack-btn" id="ack-btn">${escHtml(t('refusal_c_ack'))}</button>
    `;
  }

  panel.innerHTML = `<h4>${escHtml(title)}</h4><p>${escHtml(body)}</p>${extra}`;
  history.appendChild(panel);
  history.scrollTop = history.scrollHeight;

  if (refusal.type === 'C') {
    const ackBtn = document.getElementById('ack-btn');
    if (ackBtn) {
      ackBtn.addEventListener('click', () => {
        appState.awaitingAck = false;
        setDockEnabled(true);
        ackBtn.disabled = true;
        ackBtn.textContent = t('refusal_c_acked');
      });
      playAudio(body, { auto: true });  // Type-C popup auto-play
    }
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