from typing import Optional
from pydantic import BaseModel


# ── Input ─────────────────────────────────────────────────────────────────────

class ChatRequest(BaseModel):
    message: str
    conversation_history: list
    corridor_id: str          # bihar_hyd | up_mumbai
    flow_mode: str            # emergency | planning


# ── Output sub-models ─────────────────────────────────────────────────────────

class Source(BaseModel):
    scheme_id: str
    official_portal: str
    source_tier: str          # official_gov | curated_sample


class Provenance(BaseModel):
    oldest_verified_date: str  # ISO 8601, computed by Python min()
    contains_curated_sample: bool


class MapPin(BaseModel):
    id: str
    label: str
    lat: float
    lng: float
    address: str
    emergency_category: Optional[str] = None  # medical | police | shelter (emergency pins only)


class TimelineStep(BaseModel):
    step: str
    has_location: bool
    pin_ids: list[str]


class SchemeCard(BaseModel):
    scheme_id: str
    status: str               # green | yellow | red
    name: str
    summary: str              # one line
    detail: str
    document_checklist: list[str]
    timeline: list[TimelineStep]
    map_pins: list[MapPin]


class Refusal(BaseModel):
    type: Optional[str]       # A | B | C | null
    reason: str


# ── Output ────────────────────────────────────────────────────────────────────

class ChatResponse(BaseModel):
    response: str
    mode: str                 # crisis | planning
    verification_required: bool
    sources: list[Source]
    provenance: Provenance
    cards: list[SchemeCard]
    map_pins: list[MapPin] = []  # top-level pins for emergency mode
    flow_mode: str            # emergency | planning | out_of_scope
    refusal: Refusal