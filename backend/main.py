from contextlib import asynccontextmanager

import httpx
from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import Response
from fastapi.staticfiles import StaticFiles

from backend.config import FRONTEND_DIR, JUDGE_CODE, SARVAM_API_KEY, validate_keys
from backend.rag import run_pipeline
from backend.schemas import ChatRequest, ChatResponse, VerifyCodeRequest

SARVAM_BASE = "https://api.sarvam.ai"


@asynccontextmanager
async def lifespan(app: FastAPI):
    validate_keys()
    yield


app = FastAPI(title="Migrant Navigator", lifespan=lifespan)

# CORS dev safety net; same-origin static mount is the real fix
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:8000", "http://127.0.0.1:8000"],
    allow_methods=["GET", "POST"],
    allow_headers=["*"],
)


# API routes must be registered before the static catch-all mount

def _normalise(code: str) -> str:
    import re
    return re.sub(r'[^A-Z0-9]', '', code.upper())

@app.post("/verify-code")
async def verify_code(body: VerifyCodeRequest):
    if not JUDGE_CODE:
        raise HTTPException(status_code=503, detail="Access code not configured on server.")
    if _normalise(body.code) != _normalise(JUDGE_CODE):
        raise HTTPException(status_code=401, detail="Invalid access code.")
    return {"ok": True}


@app.post("/chat", response_model=ChatResponse)
async def chat(request: ChatRequest) -> ChatResponse:
    try:
        return run_pipeline(request)
    except RuntimeError as exc:
        raise HTTPException(status_code=503, detail=str(exc))


@app.post("/audio/stt")
async def audio_stt(req: Request):
    """Proxy: browser → /audio/stt → Sarvam STT. Keeps API key off the client."""
    import logging
    body = await req.body()
    headers = {
        "api-subscription-key": SARVAM_API_KEY,
        **{k: v for k, v in req.headers.items() if k.lower() not in ("host", "content-length")},
    }
    async with httpx.AsyncClient(timeout=30) as client:
        resp = await client.post(f"{SARVAM_BASE}/speech-to-text", content=body, headers=headers)
    if resp.status_code != 200:
        logging.error("[STT proxy] Sarvam returned %s: %s", resp.status_code, resp.text[:500])
    return Response(content=resp.content, status_code=resp.status_code, media_type=resp.headers.get("content-type"))


@app.post("/audio/tts")
async def audio_tts(req: Request):
    """Proxy: browser → /audio/tts → Sarvam TTS. Keeps API key off the client."""
    body = await req.body()
    headers = {
        "api-subscription-key": SARVAM_API_KEY,
        "Content-Type": "application/json",
    }
    async with httpx.AsyncClient(timeout=30) as client:
        resp = await client.post(f"{SARVAM_BASE}/text-to-speech", content=body, headers=headers)
    return Response(content=resp.content, status_code=resp.status_code, media_type=resp.headers.get("content-type"))


# Static catch-all must come after API routes
app.mount("/", StaticFiles(directory=str(FRONTEND_DIR), html=True), name="frontend")
