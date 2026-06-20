"""
Deterministic confidence assessor — zero LLM calls.
Fires when an eligibility verdict would be unreliable due to hedged facts.
Returns None when confident; returns a structured flag when low-confidence.

Trigger precedence: proxy_doc > status_change > uncertainty (co-occurrence required).
Source-hedge alone (condition 4) never triggers; it only amplifies a user-side signal,
so it is NOT checked as a standalone condition here.
"""
from __future__ import annotations
import re

# ── Condition 1: Uncertainty phrase co-occurring with an eligibility keyword ───
_UNCERTAINTY_PHRASES = re.compile(
    r"\b(i think|i'?m not sure|i don'?t know|not sure|maybe|i don'?t remember|"
    r"i forget|might have|possibly)\b",
    re.IGNORECASE,
)
# Co-occurrence required — hedges about needs ("I think I need food") must NOT fire.
# Only hedges about facts that gate eligibility should fire.
_ELIGIBILITY_KEYWORDS = re.compile(
    r"\b(age|\d{2}\s*year[s]?\s*old|aadhaar|aadhar|ration|jan dhan|e-?shram|uan|"
    r"income|salary|earn|register(?:ed)?|enroll(?:ed)?|card)\b",
    re.IGNORECASE,
)

# ── Condition 2: Status-change signals ────────────────────────────────────────
_STATUS_CHANGE = re.compile(
    r"\b(used to|i had|it expired|expired|i stopped|stopped contributing|"
    r"changed my (?:number|phone|mobile)|closed (?:my )?account|"
    r"haven'?t used it in|no longer have)\b",
    re.IGNORECASE,
)

# ── Condition 3: Proxy-document signals ───────────────────────────────────────
_PROXY_DOC = re.compile(
    r"\b(in (?:my )?(?:wife|husband|father|mother|son|daughter|family member)'?s name|"
    r"not in my name|someone else'?s (?:card|name))\b",
    re.IGNORECASE,
)

# ── Scheme detection keywords ─────────────────────────────────────────────────
_SCHEME_KEYWORDS: dict[str, re.Pattern] = {
    "eshram": re.compile(r"\b(e-?shram|uan|unorganis(?:ed|ed) worker)\b", re.IGNORECASE),
    "pmsby":  re.compile(r"\b(pmsby|accident (?:cover|insurance)|suraksha bima)\b", re.IGNORECASE),
    "pmjay":  re.compile(r"\b(pm-?jay|ayushman|hospitali[sz]ation|cashless)\b", re.IGNORECASE),
    "pm_sym": re.compile(r"\b(pm-?sym|shram yogi|maandhan|pension)\b", re.IGNORECASE),
    "onorc":  re.compile(r"\b(onorc|ration card|ration|fair price shop|pds)\b", re.IGNORECASE),
}

# ── Canned handoff entries — deterministic, never LLM-generated ───────────────
_SCHEME_HANDOFFS: dict[str, dict] = {
    "eshram": {
        "unresolved_fact": "whether your e-Shram registration is still active",
        "verify_question": "Is my e-Shram UAN still active, and what is my UAN number?",
        "contact": "CSC or e-Shram helpline 14434",
    },
    "pmsby": {
        "unresolved_fact": "whether your PMSBY accident cover is currently active",
        "verify_question": "Is my PMSBY accident cover currently active on this account?",
        "contact": "your bank branch",
    },
    "pmjay": {
        "unresolved_fact": "whether your family is listed for PM-JAY",
        "verify_question": "Is my family listed for PM-JAY, and can you generate my Ayushman card?",
        "contact": "empanelled hospital Ayushman Mitra or helpline 14555",
    },
    "pm_sym": {
        "unresolved_fact": "whether your age and income make you eligible for PM-SYM",
        "verify_question": "Given my exact age and income, am I eligible to enrol in PM-SYM?",
        "contact": "CSC or 14434",
    },
    "onorc": {
        "unresolved_fact": "whether your ration card is active and Aadhaar-linked for portability",
        "verify_question": "Is my ration card active and Aadhaar-linked for portability?",
        "contact": "Civil Supplies office",
    },
    "generic": {
        "unresolved_fact": "a key eligibility fact that needs confirming",
        "verify_question": "Can you confirm my eligibility and current status for this scheme?",
        "contact": "nearest Common Service Centre or 14434",
    },
}


def _detect_scheme(message: str, context: str) -> str:
    """Identify the most relevant scheme — message takes priority over context.
    Context alone almost always contains e-Shram (hub scheme), so checking combined
    text first caused e-Shram to win even when the user mentioned ration card."""
    for scheme_id, pattern in _SCHEME_KEYWORDS.items():
        if pattern.search(message):
            return scheme_id
    # Fall back to context only when the message has no scheme signal
    for scheme_id, pattern in _SCHEME_KEYWORDS.items():
        if pattern.search(context):
            return scheme_id
    return "generic"


def assess_confidence(message: str, retrieved_context: str) -> dict | None:
    """
    Returns None when confident (majority of calls).
    Returns a structured low-confidence flag when the user's message hedges
    a fact that directly gates eligibility.

    Zero LLM calls. Runs in O(n) regex over the message string.
    """
    if _PROXY_DOC.search(message):
        trigger = "proxy_doc"
    elif _STATUS_CHANGE.search(message):
        trigger = "status_change"
    elif _UNCERTAINTY_PHRASES.search(message) and _ELIGIBILITY_KEYWORDS.search(message):
        trigger = "uncertainty"
    else:
        return None

    scheme = _detect_scheme(message, retrieved_context)
    handoff = _SCHEME_HANDOFFS[scheme]

    return {
        "low_confidence": True,
        "trigger": trigger,
        "scheme_id": scheme,
        "unresolved_fact": handoff["unresolved_fact"],
        "verify_question": handoff["verify_question"],
        "contact": handoff["contact"],
    }
