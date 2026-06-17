"""
Linear RAG pipeline: Route → Retrieve → Synthesize → Assemble.
No loops, no dynamic tool selection, no orchestration framework.
"""
from __future__ import annotations

import json

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

# Module-level singletons — loaded once at import
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


# ── Step 1: Route ─────────────────────────────────────────────────────────────

def _route(request: ChatRequest) -> dict:
    """Deterministic routing — returns guardrail decision before any LLM call."""
    refusal = classify(request.message)
    return {
        "flow_mode": request.flow_mode,
        "corridor_id": request.corridor_id,
        "refusal": refusal,
        "is_emergency": request.flow_mode == "emergency",
        "is_blocked": refusal["type"] in ("A", "B"),
    }


# ── Step 2: Retrieve ──────────────────────────────────────────────────────────

def _retrieve(request: ChatRequest, embed_model, collection) -> tuple[list[str], list[dict]]:
    """Embed query and fetch corridor-filtered chunks from ChromaDB."""
    allowed = CORRIDOR_FILTER.get(request.corridor_id, ["all"])
    q_vec = embed_model.encode(request.message, normalize_embeddings=True).tolist()
    results = collection.query(
        query_embeddings=[q_vec],
        n_results=6,
        where={"corridor_id": {"$in": allowed}},
        include=["documents", "metadatas"],
    )
    docs = results["documents"][0]
    metas = results["metadatas"][0]
    return docs, metas


# ── Step 3: Synthesize ────────────────────────────────────────────────────────

def _synthesize(request: ChatRequest, docs: list[str], metas: list[dict]) -> dict:
    """Call the LLM with retrieved context. Returns parsed JSON dict."""
    context = "\n\n".join(
        f"[{m.get('scheme_id', 'unknown')} | corridor={m.get('corridor_id')}]\n{d}"
        for d, m in zip(docs, metas)
    )
    flow_hint = f"[flow_mode: {request.flow_mode}]"
    augmented_msg = f"{flow_hint} {request.message}"
    return call_llm(augmented_msg, request.conversation_history, context)


# ── Step 4: Assemble ──────────────────────────────────────────────────────────

def _pins_by_scheme(offices: list[dict]) -> dict[str, list[dict]]:
    """Index curated offices by scheme_id. Python assigns pins — not the LLM."""
    idx: dict[str, list[dict]] = {}
    for o in offices:
        sid = o.get("scheme_id", "")
        idx.setdefault(sid, []).append(o)
    return idx


def _build_cards(llm_cards: list[dict], offices: list[dict]) -> list[SchemeCard]:
    scheme_pins = _pins_by_scheme(offices)
    cards = []
    for c in llm_cards:
        sid = c.get("scheme_id", "")

        # Python resolves pins from curated JSON by scheme_id — never from LLM-generated IDs
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
) -> ChatResponse:
    """Deterministically assemble the final response. All facts come from Python."""
    prov_data = compute_provenance(metas)

    # Guardrail finalization — Python decides, not LLM
    llm_refusal_type = llm_output.get("refusal", {}).get("type")
    final_refusal = classify(request.message, llm_proposed_type=llm_refusal_type)

    # verification_required: Python confirms LLM proposal, or guardrail C forces it
    verification_required = (
        final_refusal["type"] == "C"
        or bool(llm_output.get("verification_required", False))
    )

    # Emergency: empty cards, crisis mode
    if route["is_emergency"]:
        # Provide emergency pins (shelter/hospital) from curated JSON
        emergency_pins = [
            MapPin(id=o["id"], label=o["label"], lat=o["lat"], lng=o["lng"], address=o["address"])
            for o in offices if o.get("scheme_id") == "emergency"
        ]
        return ChatResponse(
            response=llm_output.get("response", "Please go to the nearest hospital or shelter immediately."),
            mode="crisis",
            verification_required=False,
            sources=[],
            provenance=Provenance(**prov_data["provenance"]),
            cards=[],
            flow_mode="emergency",
            refusal=Refusal(type=None, reason=""),
        )

    # Type A or B blocked — return refusal only
    if route["is_blocked"] or final_refusal["type"] in ("A", "B"):
        rtype = final_refusal["type"]
        return ChatResponse(
            response=final_refusal["reason"],
            mode="planning",
            verification_required=False,
            sources=[Source(**s) for s in prov_data["sources"]] if rtype == "B" else [],
            provenance=Provenance(**prov_data["provenance"]),
            cards=[],
            flow_mode="out_of_scope",
            refusal=Refusal(type=rtype, reason=final_refusal["reason"]),
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
    )


# ── Public entry point ────────────────────────────────────────────────────────

def run_pipeline(request: ChatRequest) -> ChatResponse:
    embed_model, collection, offices_map = _get_resources()
    corridor_offices = offices_map.get(request.corridor_id, [])

    # Route
    route = _route(request)

    # If Type A, skip Retrieve + Synthesize
    if route["is_blocked"]:
        return _assemble(request, route, {}, [], corridor_offices)

    # Retrieve
    docs, metas = _retrieve(request, embed_model, collection)

    # Emergency: still retrieve (for physical service locations) but skip scheme synthesis
    if route["is_emergency"]:
        # Minimal LLM call for calm response text only
        llm_output = _synthesize(request, docs, metas)
        return _assemble(request, route, llm_output, metas, corridor_offices)

    # Synthesize
    llm_output = _synthesize(request, docs, metas)

    # Assemble
    return _assemble(request, route, llm_output, metas, corridor_offices)