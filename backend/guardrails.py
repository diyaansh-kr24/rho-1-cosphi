"""
Deterministic guardrail classification. Precedence: A → C → B → null.
- Type A: regex (adversarial inputs are explicit; hard, final block)
- Type C: embedding similarity vs. intent exemplars (catches paraphrase; local, zero tokens)
- Type B: regex (scheme proper-nouns don't paraphrase)
An LLM may propose a type, but Python finalizes refusal.type here.
"""
from __future__ import annotations

import json
import re
import random
from pathlib import Path

import numpy as np

# ── Type-C threshold ──────────────────────────────────────────────────────────
# Calibrated against 20-message test set (see calibration report in project docs).
# Raise to reduce false positives; lower to catch more distress paraphrases.
TYPE_C_THRESHOLD = 0.80  # calibrated: trigger floor=0.8085, non-trigger ceiling=0.7986

# ── Load exemplars at module level ────────────────────────────────────────────
_EXEMPLARS_PATH = Path(__file__).parent / "exemplars.json"
_raw = json.loads(_EXEMPLARS_PATH.read_text(encoding="utf-8"))
_TYPE_C_EXEMPLARS: list[str] = [
    sentence
    for sub_class in _raw["type_c"].values()
    for sentence in sub_class
]

# Exemplar embedding matrix — computed once on first classify() call, then cached.
_exemplar_matrix: np.ndarray | None = None


# ── Type A: jailbreak / out-of-scope / compliance violations ──────────────────
_TYPE_A_PATTERNS = [
    # Document fraud / eligibility gaming
    r"fake\s+(\w+\s+)?(document|aadhaar|card|certificate)",
    r"fak(e|ing)\s+(my\s+|the\s+)?(document|aadhaar|card|certificate)",
    r"forge\s+",
    r"cheat\s+(the\s+)?(government|system|scheme)",
    r"game\s+(the\s+)?eligibility",
    r"bypass\s+(eligibility|rules|requirement)",
    r"pretend\s+to\s+be",
    r"claim\s+without\s+(being\s+)?eligible",
    r"ignore\s+(your\s+)?(previous\s+)?instructions?",
    r"you\s+are\s+now\s+a",
    r"act\s+as\s+(a\s+)?different",
    r"jailbreak",
    r"dan\s+mode",
    r"loophole",
    r"fake\s+.*?(aadhaar|document|certificate|card)",
    # Out-of-scope topics (education, housing not via PMAY, employment, finance)
    r"(government|private|free)\s+school",
    r"school\s+(admission|fee|enroll|for\s+(my|the|our|kid|child))",
    r"(my|the|our)\s+(kid|child|son|daughter|beta|beti).{0,30}school",
    r"child.{0,20}(school|admission|education)",
    r"(school|college|university)\s+(for|admission)",
    r"education\s+(loan|fee|scholarship)",
    r"\b(tuition|coaching)\s+(fee|class)",
    r"(home|house|flat|land)\s+(loan|buy|purchase|allot)",
    r"property\s+(dispute|register|buy)",
    r"job\s+(placement|agency|portal|find|search)",
    r"(find|get|looking\s+for)\s+(a\s+)?(job|work|employment|naukri)",
    r"business\s+(loan|start|license|registration\s+(?!e-shram|eshram|worker))",
    r"(divorce|marriage|shaadi|wedding|legal\s+advice)",
    r"income\s+tax\s+(return|filing|refund)",
]

_TYPE_A_REASONS = [
    (
        "That is an important need, and I hope you find the right support for it. "
        "I am set up specifically to help migrant workers with government welfare schemes — "
        "food rations, health cover, accident insurance, pension, or worker registration. "
        "Which of these can I help you with?"
    ),
    (
        "I understand, and I hope you get the help you need for that. "
        "My focus is on welfare schemes for workers like e-Shram, ONORC, PMSBY, PM-JAY, and PM-SYM. "
        "Would you like to know which of these you may be eligible for?"
    ),
    (
        "That falls outside what I am set up to assist with. "
        "I can help you with five government welfare schemes for migrant workers — "
        "food rations, health cover, accident insurance, pension, or worker registration. "
        "Can I help you with any of these?"
    ),
    (
        "I am here specifically to help migrant workers access government welfare schemes. "
        "For other needs, the nearest Common Service Centre (CSC) or district office may be able to guide you. "
        "If you need help with food rations, health cover, accident insurance, pension, or worker registration, I am ready to help."
    ),
    (
        "I am not able to help with that through this tool. "
        "This assistant covers e-Shram registration, ONORC ration card portability, PMSBY accident cover, PM-JAY health cover, and PM-SYM pension. "
        "Please ask me about any of these schemes."
    ),
]

# ── Type B: real welfare schemes outside the locked five ─────────────────────
_UNSUPPORTED_SCHEMES = [
    r"pm\s*awas",
    r"pradhan\s*mantri\s*awas",
    r"pmay",
    r"mnrega",
    r"mgnrega",
    r"nrega",
    r"pm\s*kisan",
    r"fasal\s*bima",
    r"pradhan\s*mantri\s*fasal",
    r"pmfby",
    r"sukanya\s*samridhi",
    r"ujjwala",
    r"saubhagya\s*scheme",
    r"stand\s*up\s*india",
    r"mudra\s*(loan|yojana)",
    r"atmanirbhar",
]

_TYPE_C_REASON = (
    "If you are in immediate danger, call 112 right now — do not wait. "
    "For a medical emergency, go straight to the nearest government hospital. "
    "For urgent help that is not life-threatening, the free helpline 14434 "
    "or a Common Service Centre (CSC) can assist you directly."
)

_TYPE_B_REASON = (
    "That is a real scheme, and your interest in it makes sense — but I am not set up to guide you through it in detail. "
    "I cover five specific schemes for migrant workers: e-Shram, ONORC, PMSBY, PM-JAY, and PM-SYM. "
    "For other central government schemes, myscheme.gov.in has a full list and can point you in the right direction."
)


def _match_any(text: str, patterns: list[str]) -> bool:
    t = text.lower()
    return any(re.search(p, t) for p in patterns)


def _type_c_similarity(message: str, embed_model) -> float:
    """Return max cosine similarity between message and Type-C exemplar matrix."""
    global _exemplar_matrix
    if _exemplar_matrix is None:
        _exemplar_matrix = embed_model.encode(
            _TYPE_C_EXEMPLARS, normalize_embeddings=True, show_progress_bar=False
        )
    msg_vec = embed_model.encode(message, normalize_embeddings=True)
    # Normalized vectors → cosine similarity = dot product
    sims = _exemplar_matrix @ msg_vec
    return float(sims.max())


def classify(
    message: str,
    embed_model=None,
    llm_proposed_type: str | None = None,
    flow_mode: str = "planning",
) -> dict:
    """
    Returns {"type": "A"|"B"|"C"|None, "reason": str}.
    Precedence: A → C → B → null.
    embed_model: loaded SentenceTransformer; if None, embedding check is skipped.
    flow_mode: reserved for future per-flow threshold tuning; not branched on yet.
    """
    _ = flow_mode  # intentionally unused — accepted for forward compatibility
    # Type A — regex, always final, short-circuits before any embedding
    if _match_any(message, _TYPE_A_PATTERNS):
        return {"type": "A", "reason": random.choice(_TYPE_A_REASONS)}

    # Type C — embedding similarity (or LLM proposal)
    is_type_c = llm_proposed_type == "C"
    if not is_type_c and embed_model is not None:
        score = _type_c_similarity(message, embed_model)
        is_type_c = score >= TYPE_C_THRESHOLD
    if is_type_c:
        return {"type": "C", "reason": _TYPE_C_REASON}

    # Type B — regex on scheme proper-nouns
    if _match_any(message, _UNSUPPORTED_SCHEMES) or llm_proposed_type == "B":
        return {"type": "B", "reason": _TYPE_B_REASON}

    return {"type": None, "reason": ""}
