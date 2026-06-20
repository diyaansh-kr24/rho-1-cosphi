import json
import logging
import re

from groq import Groq, RateLimitError as GroqRateLimitError
from openai import OpenAI

from backend.config import (
    GROQ_API_KEY,
    LLM_FALLBACK,
    LLM_PRIMARY,
    PRIMARY_API_KEY,
    PRIMARY_BASE_URL,
    PROMPTS_DIR,
)

log = logging.getLogger(__name__)

_primary_client: OpenAI | None = None
_groq_client: Groq | None = None


def _get_primary_client() -> OpenAI:
    global _primary_client
    if _primary_client is None:
        _primary_client = OpenAI(api_key=PRIMARY_API_KEY, base_url=PRIMARY_BASE_URL)
    return _primary_client


def _get_groq_client() -> Groq:
    global _groq_client
    if _groq_client is None:
        _groq_client = Groq(api_key=GROQ_API_KEY)
    return _groq_client


def _load_system_prompt(is_intake: bool, is_emergency: bool = False) -> str:
    if is_emergency:
        fname = "system_prompt_emergency.txt"
    elif is_intake:
        fname = "system_prompt_intake.txt"
    else:
        fname = "system_prompt_planning.txt"
    return (PROMPTS_DIR / fname).read_text(encoding="utf-8")


def _parse_response(raw: str) -> dict:
    if "```" in raw:
        parts = raw.split("```")
        raw = parts[1] if len(parts) > 1 else raw
        if raw.startswith("json"):
            raw = raw[4:]
    brace = raw.find("{")
    if brace < 0:
        raise ValueError(f"No JSON object found. Raw: {raw[:300]}")
    obj, _ = json.JSONDecoder().raw_decode(raw, brace)
    return obj


def _wrap_plain(raw: str, req_state: dict | None = None) -> dict:
    # Try to salvage the "response" field from truncated/malformed JSON.
    # If no JSON at all, use the raw text directly — it is a valid response, just unwrapped.
    m = re.search(r'"response"\s*:\s*"((?:[^"\\]|\\.)*)"', raw)
    if m:
        response_text = m.group(1).encode('raw_unicode_escape').decode('unicode_escape')
    else:
        response_text = raw.strip()
    if not response_text:
        response_text = "Could you tell me a bit more about your situation?"
    result = {
        "response": response_text,
        "cards": [],
        "verification_required": False,
        "refusal": {"type": None, "reason": ""},
    }
    if req_state:
        result["extracted_state"] = req_state
    return result


def _call_primary(messages: list, max_tokens: int) -> str:
    response = _get_primary_client().chat.completions.create(
        model=LLM_PRIMARY,
        messages=messages,
        temperature=0.2,
        max_tokens=max_tokens,
        response_format={"type": "json_object"},
    )
    return (response.choices[0].message.content or "").strip()


def _call_groq(messages: list, max_tokens: int) -> str:
    response = _get_groq_client().chat.completions.create(
        model=LLM_FALLBACK,
        messages=messages,
        temperature=0.2,
        max_tokens=max_tokens,
        response_format={"type": "json_object"},
    )
    return (response.choices[0].message.content or "").strip()


def call_llm(
    user_message: str,
    conversation_history: list,
    retrieved_context: str,
    max_tokens: int = 1536,
    is_intake: bool = False,
    is_emergency: bool = False,
    req_state: dict | None = None,
) -> dict:
    """
    Try SambaNova DeepSeek V3.1 first; fall back to Groq 70B on rate limit or error.
    is_emergency=True loads the dedicated emergency prompt.
    is_intake=True loads the short intake prompt.
    max_tokens is caller-computed: intake=500, emergency=400, planning=1024.
    """
    system_prompt = _load_system_prompt(is_intake, is_emergency=is_emergency)

    history_window = 3 if is_intake else 4
    windowed_history = conversation_history[-history_window:] if conversation_history else []
    # The frontend pushes the current user message before the API call, so it appears
    # at the end of windowed_history. Trim it — we append the augmented version below.
    # Without this, the model sees two consecutive user messages and fails to register
    # the answered slot in extracted_state.
    if windowed_history and windowed_history[-1].get("role") == "user":
        windowed_history = windowed_history[:-1]

    messages = [
        {"role": "system", "content": system_prompt},
        {
            "role": "system",
            "content": f"RELEVANT SCHEME INFORMATION (use ONLY this — do not invent facts):\n{retrieved_context}",
        },
        *windowed_history,
        {"role": "user", "content": user_message},
    ]

    # --- Primary: DeepSeek V3.2 via aicredits.in ---
    raw = ""
    try:
        raw = _call_primary(messages, max_tokens)
        try:
            return _parse_response(raw)
        except (ValueError, json.JSONDecodeError):
            log.warning("DeepSeek V3.2 parse failed — falling back to Groq 70B. Snippet: %s", raw[:200])
            raise ValueError("parse failed, fall to Groq")
    except Exception as primary_exc:
        log.warning("Primary LLM failed (%s: %s) — falling back to Groq 70B.", type(primary_exc).__name__, primary_exc)

    # --- Fallback: Groq 70B instruct ---
    groq_max_tokens = min(max_tokens, 1800)
    raw = ""
    try:
        raw = _call_groq(messages, groq_max_tokens)
        return _parse_response(raw)
    except GroqRateLimitError as exc:
        log.error("Groq 70B fallback also rate-limited: %s", exc)
        raise RuntimeError(
            "Both SambaNova and Groq are unavailable. Wait a moment and retry, or check your API keys."
        ) from exc
    except (ValueError, json.JSONDecodeError):
        return _wrap_plain(raw, req_state)
    except Exception as exc:
        log.error("Groq 70B fallback failed (%s: %s).", type(exc).__name__, exc)
        raise RuntimeError(f"SambaNova DeepSeek V3.1 and Groq 70B both failed. Last error: {exc}") from exc
