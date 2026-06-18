import json
from groq import Groq, RateLimitError

from backend.config import GROQ_API_KEY, LLM_FALLBACK, LLM_PRIMARY, PROMPTS_DIR

_client = None


def _get_client() -> Groq:
    global _client
    if _client is None:
        _client = Groq(api_key=GROQ_API_KEY)
    return _client


def _load_system_prompt() -> str:
    return (PROMPTS_DIR / "system_prompt.txt").read_text(encoding="utf-8")


def call_llm(user_message: str, conversation_history: list, retrieved_context: str) -> dict:
    """
    Send a request to Groq. Falls back from 70B to 8B on any 429.
    Returns parsed JSON dict from the model, or raises on hard failure.
    """
    system_prompt = _load_system_prompt()
    context_block = f"\n\nRELEVANT SCHEME INFORMATION (use ONLY this — do not invent facts):\n{retrieved_context}"

    messages = [{"role": "system", "content": system_prompt + context_block}]
    for turn in conversation_history:
        messages.append(turn)
    messages.append({"role": "user", "content": user_message})

    for model in (LLM_PRIMARY, LLM_FALLBACK):
        try:
            response = _get_client().chat.completions.create(
                model=model,
                messages=messages,
                temperature=0.2,
                max_tokens=3072,
            )
            raw = response.choices[0].message.content.strip()
            # Strip markdown fences
            if "```" in raw:
                raw = raw.split("```")[1]
                if raw.startswith("json"):
                    raw = raw[4:]
            # Find the first { in case the model prepends plain text
            brace = raw.find("{")
            if brace < 0:
                raise ValueError(f"No JSON object found in response. Raw: {raw[:300]}")
            raw = raw[brace:]
            # Extract balanced JSON object to handle trailing text
            depth, end = 0, 0
            for i, ch in enumerate(raw):
                if ch == "{":
                    depth += 1
                elif ch == "}":
                    depth -= 1
                    if depth == 0:
                        end = i + 1
                        break
            raw = raw[:end] if end else raw
            return json.loads(raw)
        except RateLimitError:
            if model == LLM_FALLBACK:
                raise
            continue
        except (json.JSONDecodeError, ValueError):
            # Model returned plain text (e.g., intake question). Wrap it.
            return {
                "response": raw if raw else "Could you tell me a bit more about your situation?",
                "cards": [],
                "verification_required": False,
                "refusal": {"type": None, "reason": ""},
            }