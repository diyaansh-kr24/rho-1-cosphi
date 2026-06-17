import os
from pathlib import Path
from dotenv import load_dotenv

load_dotenv()

GROQ_API_KEY = os.getenv("GROQ_API_KEY", "")
SARVAM_API_KEY = os.getenv("SARVAM_API_KEY", "")


def validate_keys():
    """Call this at server startup (main.py lifespan). Not needed by ingest.py."""
    if not GROQ_API_KEY:
        raise RuntimeError("GROQ_API_KEY is not set. Copy .env.example to .env and fill in your key.")
    if not SARVAM_API_KEY:
        import warnings
        warnings.warn("SARVAM_API_KEY is not set. Audio proxy endpoints will not work until it is added.")

# Paths
BASE_DIR = Path(__file__).resolve().parent.parent
CHROMA_DIR = BASE_DIR / "chroma_store"
DATA_DIR = BASE_DIR / "data"
FRONTEND_DIR = BASE_DIR / "frontend"
PROMPTS_DIR = BASE_DIR / "backend" / "prompts"
OFFICES_HYDERABAD = DATA_DIR / "raw" / "bihar_hyd" / "offices_hyderabad.json"
OFFICES_MUMBAI = DATA_DIR / "raw" / "up_mumbai" / "offices_mumbai.json"

# LLM models — primary + fallback
LLM_PRIMARY = "llama-3.3-70b-versatile"
LLM_FALLBACK = "llama-3.1-8b-instant"

# ChromaDB
CHROMA_COLLECTION = "migrant_schemes"
EMBED_MODEL = "BAAI/bge-small-en-v1.5"

# Server
PORT = 8000

# Corridor-to-allowed corridor_ids mapping
CORRIDOR_FILTER = {
    "bihar_hyd": ["bihar_hyd", "all"],
    "up_mumbai": ["up_mumbai", "all"],
}