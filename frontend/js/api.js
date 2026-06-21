// Relative URL, same-origin, no CORS preflight required
async function postChat(payload) {
  const res = await fetch('/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`/chat ${res.status}: ${err.slice(0, 200)}`);
  }
  return res.json();
}