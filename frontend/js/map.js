// Map module: Leaflet + OSM tiles with static address-card fallback.
// All pin data comes from the /chat payload; this file only renders.

let _map = null;
let _markers = [];
let _allPins = [];   // all pins for the current card, set by renderPins()

function _leafletAvailable() {
  return typeof L !== 'undefined';
}

// Call once when entering detail view
function initMap(containerId) {
  const el = document.getElementById(containerId);
  if (!el) return;

  if (!_leafletAvailable()) {
    el.innerHTML = '<p style="padding:12px;color:var(--muted)">Map unavailable — see address list below.</p>';
    return;
  }

  // Tear down previous instance
  if (_map) {
    _map.remove();
    _map = null;
    _markers = [];
  }

  // Make the container visible and sized before Leaflet initialises
  el.style.display = 'block';

  _map = L.map(containerId, { zoomControl: true }).setView([20.5937, 78.9629], 5);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    maxZoom: 18,
  }).addTo(_map);
}

// Render all pins for a card; stores them for later updatePins() calls
function renderPins(pins, containerId) {
  _allPins = pins || [];
  if (!_allPins.length) return;

  const el = document.getElementById(containerId);
  if (!el) return;

  if (!_leafletAvailable() || !_map) {
    _renderFallback(_allPins, el);
    return;
  }

  _dropMarkers(_allPins);
}

// Called when a timeline step with has_location=true is clicked
// pinIds: string[] from the step; filters _allPins
function updatePins(pinIds) {
  if (!pinIds || !pinIds.length) return;
  const subset = _allPins.filter(p => pinIds.includes(p.id));
  if (!subset.length) return;

  const containerId = 'map-container';
  const el = document.getElementById(containerId);

  if (!_leafletAvailable() || !_map) {
    if (el) _renderFallback(subset, el);
    return;
  }

  _dropMarkers(subset);
}

// Internal helpers

function _dropMarkers(pins) {
  // Clear existing markers
  _markers.forEach(m => _map.removeLayer(m));
  _markers = [];

  const bounds = [];
  pins.forEach(p => {
    const marker = L.marker([p.lat, p.lng])
      .addTo(_map)
      .bindPopup(`<b>${_esc(p.label)}</b><br>${_esc(p.address)}`);
    _markers.push(marker);
    bounds.push([p.lat, p.lng]);
  });

  if (bounds.length === 1) {
    _map.setView(bounds[0], 14);
  } else if (bounds.length > 1) {
    _map.fitBounds(bounds, { padding: [40, 40] });
  }
}

function _renderFallback(pins, el) {
  el.innerHTML = '<div class="map-fallback">' +
    pins.map(p =>
      `<div class="map-fallback-pin">
        <strong>${_esc(p.label)}</strong>
        <span>${_esc(p.address)}</span>
      </div>`
    ).join('') +
  '</div>';
}

function _esc(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}