"""
Deterministic guardrail classification. Precedence: A → C → B → null.
An LLM may propose a type, but Python finalizes refusal.type here.
"""
from __future__ import annotations

import re
import random

# Type A: jailbreak / out-of-scope / compliance violations
_TYPE_A_PATTERNS = [
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
]

# Type B: real welfare schemes outside the locked five
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

# Type C triggers: verification required
_TYPE_C_PATTERNS = [
    r"chest\s+pain",
    r"can(not|'t)\s+breathe",
    r"difficulty\s+breath",
    r"unconscious",
    r"heart\s+attack",
    r"stroke",
    r"severe\s+(injury|bleeding|pain)",
    r"lost\s+all\s+(my\s+)?documents",
    # document overload: multiple missing/expired critical documents
    r"(don'?t\s+have|lost|expired|no)\s+(my\s+)?(aadhaar|ration\s+card|jan\s+dhan|passbook)",
    r"(aadhaar|ration\s+card|jan\s+dhan|passbook).{0,80}(expired|lost|missing|not\s+linked)",
    r"(expired|lost|missing).{0,80}(aadhaar|ration\s+card|jan\s+dhan|passbook)",
    r"none\s+of\s+(my\s+)?documents",
    r"no\s+(documents?|id\s+proof|proof)",
    r"employer\s+(refuse|won'?t|does\s+not)\s+(register|cooperate|give)",
    r"contractor\s+(already|says|told).{0,60}(register|scheme|uan)",
    r"extreme\s+policy\s+ambiguity",
    r"not\s+linked\s+to\s+anything",
]


def _match_any(text: str, patterns: list[str]) -> bool:
    t = text.lower()
    return any(re.search(p, t) for p in patterns)


def classify(message: str, llm_proposed_type: str | None = None) -> dict:
    """
    Returns {"type": "A"|"B"|"C"|None, "reason": str}.
    Precedence A → C → B → null.
    """
    # Type A — always final, never overridden
    if _match_any(message, _TYPE_A_PATTERNS):
        _TYPE_A_REASONS = [
            (
                "This assistant is here to help you access real welfare schemes. "
                "I cannot help with requests that involve falsifying documents or bypassing eligibility rules. "
                "Please ask me about e-Shram, ONORC, PMSBY, PM-JAY, or PM-SYM."
            ),
            (
                "I can only assist with legitimate government welfare schemes for migrant workers. "
                "Requests to fake documents or game eligibility are outside what I can help with. "
                "Would you like to know what schemes you may genuinely qualify for?"
            ),
            (
                "My role is to guide you to schemes you may honestly be entitled to. "
                "I am not able to assist with anything that involves forging documents or misrepresenting eligibility. "
                "Ask me about e-Shram registration, ration card portability, health cover, or insurance."
            ),
            (
                "That request is outside what I can help with. "
                "This tool covers only legitimate welfare access — e-Shram, ONORC, PMSBY, PM-JAY, and PM-SYM. "
                "I am happy to help you find out which of these you may be eligible for."
            ),
            (
                "I am designed to help migrant workers navigate real government schemes honestly. "
                "I cannot assist with document fraud, eligibility workarounds, or requests to change my behaviour. "
                "Please ask me what schemes may apply to your situation."
            ),
        ]
        return {
            "type": "A",
            "reason": random.choice(_TYPE_A_REASONS),
        }

    # Type C — verification required
    if _match_any(message, _TYPE_C_PATTERNS) or llm_proposed_type == "C":
        return {
            "type": "C",
            "reason": (
                "This situation may require immediate human assistance. "
                "Please call the national helpline 14434 (toll-free) or visit the nearest "
                "Common Service Centre (CSC) or government hospital. "
                "For life-threatening emergencies call 112."
            ),
        }

    # Type B — unsupported scheme
    if _match_any(message, _UNSUPPORTED_SCHEMES) or llm_proposed_type == "B":
        return {
            "type": "B",
            "reason": (
                "That scheme is outside the scope of this tool. "
                "This assistant covers e-Shram, ONORC, PMSBY, PM-JAY, and PM-SYM. "
                "For other schemes please visit the official portal myscheme.gov.in."
            ),
        }

    return {"type": None, "reason": ""}