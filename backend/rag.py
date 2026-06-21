"""
Linear RAG pipeline: Route → Retrieve → Synthesize → Assemble.
No loops, no dynamic tool selection, no orchestration framework.
"""
from __future__ import annotations

import json
import logging
import re

log = logging.getLogger(__name__)

import chromadb
from sentence_transformers import SentenceTransformer

from backend.config import (
    CHROMA_COLLECTION,
    CHROMA_DIR,
    CORRIDOR_FILTER,
    EMBED_MODEL,
    OFFICES_HYDERABAD,
    OFFICES_MUMBAI,
)
from backend.confidence import assess_confidence
from backend.guardrails import classify
from backend.llm import call_llm
from backend.provenance import compute_provenance
from backend.schemas import (
    ChatRequest,
    ChatResponse,
    MapPin,
    Provenance,
    Refusal,
    SchemeCard,
    Source,
    TimelineStep,
)

# Module-level singletons, loaded once at import
_embed_model: SentenceTransformer | None = None
_chroma_client: chromadb.PersistentClient | None = None
_collection = None
_offices: dict[str, list[dict]] = {}


def _load_offices() -> dict[str, list[dict]]:
    result = {}
    for corridor, path in (("bihar_hyd", OFFICES_HYDERABAD), ("up_mumbai", OFFICES_MUMBAI)):
        try:
            data = json.loads(path.read_text(encoding="utf-8"))
            result[corridor] = data.get("offices", [])
        except FileNotFoundError:
            result[corridor] = []
    return result


def _get_resources():
    global _embed_model, _chroma_client, _collection, _offices
    if _embed_model is None:
        _embed_model = SentenceTransformer(EMBED_MODEL, device="cpu")
        _chroma_client = chromadb.PersistentClient(path=str(CHROMA_DIR))
        _collection = _chroma_client.get_collection(CHROMA_COLLECTION)
        _offices = _load_offices()
    return _embed_model, _collection, _offices


# Structural noise only (<=2 chars, pure non-alphanumeric).
# Contextual filler ("uh", "acha", etc.) is deferred to the system prompt.
_SLOT_QUESTIONS = [
    ("current_need", "What do you need help with most — food, health cover, accident insurance, pension, or worker registration?"),
    ("origin_state", "Which state did you migrate from?"),
    ("age", "How old are you?"),
    ("work_sector", "What kind of work do you do?"),
    ("documentation", "Do you have an Aadhaar card or any government-issued photo ID?"),
    ("doc_followup", "Do you also have a ration card, Jan Dhan bank account, or e-Shram UAN card?"),
]
_STUB_PROV = Provenance(oldest_verified_date="2026-01-15", contains_curated_sample=False)


def _is_intake(state: dict) -> bool:
    """Intake is complete when all 6 slots are filled.
    documentation and doc_followup use None-sentinel (not falsy []) to distinguish
    'never asked' from 'asked, user has no documents'."""
    return not (
        state.get("origin_state")
        and state.get("age")
        and state.get("work_sector")
        and state.get("current_need")
        and state.get("documentation") is not None
        and state.get("doc_followup") is not None
    )


def _is_noise(message: str) -> bool:
    s = message.strip()
    if len(s) <= 1:
        return True
    return bool(re.fullmatch(r'[^a-zA-Z0-9ऀ-ॿ]+', s))  # pure punctuation/whitespace, any script


def _next_question(state: dict) -> str:
    for slot, question in _SLOT_QUESTIONS:
        if slot in ("documentation", "doc_followup"):
            if state.get(slot) is None:
                return question
        elif not state.get(slot):
            return question
    return "Could you tell me a bit more about your situation?"


def _noise_response(state: dict) -> ChatResponse:
    question = _next_question(state)
    return ChatResponse(
        response=f"I did not quite catch that — could you say a little more? {question}",
        mode="planning",
        verification_required=False,
        sources=[],
        provenance=_STUB_PROV,
        cards=[],
        flow_mode="planning",
        refusal=Refusal(type=None, reason=""),
        extracted_state=state,
    )


# Step 1: Route

def _route(request: ChatRequest, embed_model) -> dict:
    """Deterministic routing; returns guardrail decision before any LLM call."""
    refusal = classify(request.message, embed_model, flow_mode=request.flow_mode)
    return {
        "flow_mode": request.flow_mode,
        "corridor_id": request.corridor_id,
        "refusal": refusal,
        "is_emergency": request.flow_mode == "emergency",
        "is_blocked": refusal["type"] in ("A", "B"),
    }


# Step 2: Retrieve

def _retrieve(request: ChatRequest, embed_model, collection) -> tuple[list[str], list[dict]]:
    """Embed query and fetch corridor-filtered chunks from ChromaDB."""
    allowed = CORRIDOR_FILTER.get(request.corridor_id, ["all"])
    q_vec = embed_model.encode(request.message, normalize_embeddings=True).tolist()
    # emergency=2 (response only); planning=3 stays within Groq free-tier token budget
    n_results = 2 if request.flow_mode == "emergency" else 3
    results = collection.query(
        query_embeddings=[q_vec],
        n_results=n_results,
        where={"corridor_id": {"$in": allowed}},
        include=["documents", "metadatas"],
    )
    docs = results["documents"][0]
    metas = results["metadatas"][0]

    # BOCW rarely wins the similarity race; force-inject so it is always present for bihar_hyd
    if request.flow_mode != "emergency" and request.corridor_id == "bihar_hyd":
        if not any(m.get("scheme_id") == "bocw" for m in metas):
            try:
                bocw_r = collection.query(
                    query_embeddings=[q_vec],
                    n_results=1,
                    where={"scheme_id": {"$eq": "bocw"}},
                    include=["documents", "metadatas"],
                )
                if bocw_r["documents"][0]:
                    docs = docs + bocw_r["documents"][0]
                    metas = metas + bocw_r["metadatas"][0]
            except Exception:
                pass

    return docs, metas


_CORRIDOR_DESTINATION = {
    "bihar_hyd": "Hyderabad, Telangana",
    "up_mumbai": "Mumbai, Maharashtra",
}


# Step 3: Synthesize

def _build_context(docs: list[str], metas: list[dict]) -> str:
    """Build the retrieved-context string shared by _synthesize and assess_confidence."""
    return "\n\n".join(
        f"[{m.get('scheme_id', 'unknown')} | corridor={m.get('corridor_id')}]\n{d}"
        for d, m in zip(docs, metas)
    )


def _synthesize(
    request: ChatRequest,
    docs: list[str],
    metas: list[dict],
    prebuilt_context: str | None = None,
) -> dict:
    """Call the LLM with retrieved context. Returns parsed JSON dict."""
    context = prebuilt_context if prebuilt_context is not None else _build_context(docs, metas)
    destination = _CORRIDOR_DESTINATION.get(request.corridor_id, "")
    lang_hint = " [response_language: hi — ALL prose fields (response, summary, detail, document_checklist, timeline steps) MUST be in Hindi/Devanagari ONLY. Zero English words except scheme abbreviations (e-Shram, PMJAY, ONORC, PMSBY, PM-SYM, BOCW). cards[].name MUST always be the official English scheme name. extracted_state values may be Hindi or English — never null for an answered slot.]" if request.language == "hi" else ""
    flow_hint = f"[flow_mode: {request.flow_mode}] [worker current location: {destination}]{lang_hint}"

    # Use explicit None check for lists: [] means "asked, user has no documents", not missing
    state = request.extracted_state
    filled = {k: v for k, v in state.items() if (v is not None and (v or isinstance(v, list)))} if state else {}
    if filled:
        parts = []
        for k, v in filled.items():
            if isinstance(v, list):
                display = ", ".join(v) if v else "none"
            else:
                display = str(v)
            parts.append(f"{k}={display}")
        flow_hint += f" [known so far: {', '.join(parts)}]"

    augmented_msg = f"{flow_hint} {request.message}"

    is_emergency = request.flow_mode == "emergency"
    in_intake = (not is_emergency) and _is_intake(state)

    # Tiered token budget: emergency=400, intake=500, planning=1536
    if is_emergency:
        max_tokens = 400
    elif in_intake:
        max_tokens = 500
    else:
        max_tokens = 1536

    return call_llm(
        augmented_msg,
        request.conversation_history,
        context,
        max_tokens=max_tokens,
        is_intake=in_intake,
        is_emergency=is_emergency,
        req_state=state if in_intake else None,
    )


# Step 4: Assemble

def _pins_by_scheme(offices: list[dict]) -> dict[str, list[dict]]:
    """Index curated offices by scheme_id. Python assigns pins, not the LLM."""
    idx: dict[str, list[dict]] = {}
    for o in offices:
        sid = o.get("scheme_id", "")
        idx.setdefault(sid, []).append(o)
    return idx


_VALID_SCHEME_IDS = {"eshram", "onorc", "pmsby", "pmjay", "pm_sym", "bocw"}


def _build_cards(llm_cards: list[dict], offices: list[dict]) -> list[SchemeCard]:
    scheme_pins = _pins_by_scheme(offices)
    cards = []
    for c in llm_cards:
        sid = c.get("scheme_id", "")
        if sid not in _VALID_SCHEME_IDS:
            log.warning("LLM hallucinated unknown scheme_id %r — dropping card.", sid)
            continue

        # Python resolves pins from curated JSON; LLM pin output is never used
        raw_pins = scheme_pins.get(sid, [])
        map_pins = [
            MapPin(id=o["id"], label=o["label"], lat=o["lat"], lng=o["lng"], address=o["address"])
            for o in raw_pins
        ]
        pin_ids = [p.id for p in map_pins]

        timeline = []
        for step in c.get("timeline", []):
            has_loc = step.get("has_location", False) and bool(map_pins)
            timeline.append(TimelineStep(
                step=step.get("step", ""),
                has_location=has_loc,
                pin_ids=pin_ids if has_loc else [],
            ))

        cards.append(SchemeCard(
            scheme_id=sid,
            status=c.get("status", "yellow"),
            recommended_first=bool(c.get("recommended_first", False)),
            name=c.get("name", ""),
            summary=c.get("summary", ""),
            detail=c.get("detail", ""),
            document_checklist=c.get("document_checklist", []),
            timeline=timeline,
            map_pins=map_pins,
        ))
    return cards


def _assemble(
    request: ChatRequest,
    route: dict,
    llm_output: dict,
    metas: list[dict],
    offices: list[dict],
    embed_model=None,
    confidence: dict | None = None,
) -> ChatResponse:
    """Deterministically assemble the final response. All facts come from Python."""
    prov_data = compute_provenance(metas)

    # Re-run guardrails with LLM's proposed type; Python finalizes the decision
    llm_refusal_type = llm_output.get("refusal", {}).get("type")
    final_refusal = classify(
        request.message, embed_model,
        llm_proposed_type=llm_refusal_type,
        flow_mode=request.flow_mode,
    )

    # Document hedges match distress exemplars; confidence handoff is more precise, suppress Type C
    if confidence is not None and final_refusal["type"] == "C":
        final_refusal = {"type": None, "reason": ""}

    verification_required = (
        final_refusal["type"] == "C"
        or bool(llm_output.get("verification_required", False))
        or (confidence is not None)
    )

    # Overlay only non-null LLM values to prevent a truncated response from regressing slots
    req_state = request.extracted_state or {}
    llm_state = llm_output.get("extracted_state") or {}
    extracted_state = {**req_state, **{k: v for k, v in llm_state.items() if v is not None}}

    if route["is_emergency"]:
        crisis_type = llm_output.get("crisis_type", "distress")
        # Pins only shown once crisis type is identified; "distress" means still intake
        emergency_pins = [
            MapPin(
                id=o["id"], label=o["label"], lat=o["lat"], lng=o["lng"], address=o["address"],
                emergency_category=o.get("emergency_category"),
            )
            for o in offices
            if o.get("scheme_id") == "emergency"
            and crisis_type != "distress"
            and o.get("emergency_category") == crisis_type
        ]
        return ChatResponse(
            response=llm_output.get("response", "Please go to the nearest hospital or shelter immediately."),
            mode="crisis",
            verification_required=False,
            sources=[],
            provenance=Provenance(**prov_data["provenance"]),
            cards=[],
            map_pins=emergency_pins,
            flow_mode="emergency",
            refusal=Refusal(type=None, reason=""),
            extracted_state=extracted_state,
        )

    if route["is_blocked"] or final_refusal["type"] in ("A", "B"):
        rtype = final_refusal["type"]
        return ChatResponse(
            response=final_refusal["reason"],
            mode="planning",
            verification_required=False,
            sources=[Source(**s) for s in prov_data["sources"]] if rtype == "B" else [],
            provenance=Provenance(**prov_data["provenance"]),
            cards=[],
            map_pins=[],
            flow_mode="out_of_scope",
            refusal=Refusal(type=rtype, reason=final_refusal["reason"]),
            extracted_state=request.extracted_state,
        )

    llm_cards = llm_output.get("cards", [])
    cards = _build_cards(llm_cards, offices)
    sources = [Source(**s) for s in prov_data["sources"]]

    return ChatResponse(
        response=llm_output.get("response", ""),
        mode="planning",
        verification_required=verification_required,
        sources=sources,
        provenance=Provenance(**prov_data["provenance"]),
        cards=cards,
        flow_mode="planning" if final_refusal["type"] is None else "out_of_scope",
        refusal=Refusal(
            type=final_refusal["type"],
            reason=final_refusal["reason"],
        ),
        extracted_state=extracted_state,
        confidence_flag=confidence,
        offer_update=bool(llm_output.get("offer_update", False)),
    )


# Public entry point

def run_pipeline(request: ChatRequest) -> ChatResponse:
    embed_model, collection, offices_map = _get_resources()
    corridor_offices = offices_map.get(request.corridor_id, [])
    state = request.extracted_state or {}

    # Noise gate applies during intake only
    if request.flow_mode != "emergency" and _is_intake(state) and _is_noise(request.message):
        return _noise_response(state)

    route = _route(request, embed_model)

    if route["is_blocked"]:
        return _assemble(request, route, {}, [], corridor_offices, embed_model)

    docs, metas = _retrieve(request, embed_model, collection)
    context = _build_context(docs, metas)

    if route["is_emergency"]:
        llm_output = _synthesize(request, docs, metas, prebuilt_context=context)
        return _assemble(request, route, llm_output, metas, corridor_offices, embed_model)

    llm_output = _synthesize(request, docs, metas, prebuilt_context=context)

    # Intake confidence: intercept before the LLM's response is used.
    # "Got it" auto-sends "Please continue." to resume intake.
    if _is_intake(state):
        _intake_conf = assess_confidence(request.message, context)
        if _intake_conf is not None:
            _ack = (
                "Got it, I have made a note of that. "
                "We can look into it more carefully once we have all the details."
            )
            # Exclude doc_followup from merge; that slot waits for the explicit follow-up answer
            _merged = {**state}
            for _k, _v in (llm_output.get("extracted_state") or {}).items():
                if _v is not None and _k != "doc_followup":
                    _merged[_k] = _v
            return _assemble(
                request, route,
                {"response": _ack, "cards": [], "extracted_state": _merged,
                 "verification_required": False, "refusal": {"type": None, "reason": ""},
                 "offer_update": False},
                metas, corridor_offices, embed_model, confidence=_intake_conf,
            )

    confidence = assess_confidence(request.message, context) if not _is_intake(state) else None

    # Auto-transition to planning when the LLM fills the last intake slot.
    # Guard: if the LLM response still contains "?" it is mid-intake and may have
    # hallucinated slot values; do not trust them.
    _intake_response = llm_output.get("response", "")
    _llm_signals_complete = "?" not in _intake_response
    if _is_intake(state) and _llm_signals_complete:
        llm_state = llm_output.get("extracted_state") or {}
        merged = {**state, **{k: v for k, v in llm_state.items() if v is not None}}
        if not _is_intake(merged):
            planning_request = ChatRequest(
                message=request.message,
                conversation_history=request.conversation_history,
                corridor_id=request.corridor_id,
                flow_mode=request.flow_mode,
                extracted_state=merged,
                language=request.language,
            )
            docs, metas = _retrieve(planning_request, embed_model, collection)
            context = _build_context(docs, metas)
            llm_output = _synthesize(planning_request, docs, metas, prebuilt_context=context)
            # "Please continue." sentinel means the user already acknowledged a confidence panel;
            # skip re-fire to avoid a second panel on the same planning transition.
            _CONTINUE_SENTINEL = {"Please continue.", "कृपया जारी रखें।"}
            _is_post_conf = any(
                str(_t.get("content", "")).strip() in _CONTINUE_SENTINEL
                for _t in request.conversation_history[-10:]
                if isinstance(_t, dict) and _t.get("role") == "user"
            )
            if _is_post_conf:
                confidence = None
            else:
                _conf_parts = [planning_request.message]
                for _turn in reversed(request.conversation_history[-6:]):
                    if isinstance(_turn, dict) and _turn.get("role") == "user":
                        _conf_parts.append(str(_turn.get("content", "")))
                        break
                confidence = assess_confidence(" ".join(_conf_parts), context)
            return _assemble(planning_request, route, llm_output, metas, corridor_offices, embed_model, confidence=confidence)

    return _assemble(request, route, llm_output, metas, corridor_offices, embed_model, confidence=confidence)
