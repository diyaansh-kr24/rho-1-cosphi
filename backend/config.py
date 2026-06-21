import os
from pathlib import Path
from dotenv import load_dotenv

load_dotenv()

GROQ_API_KEY = os.getenv("GROQ_API_KEY", "")
PRIMARY_API_KEY = os.getenv("PRIMARY_API_KEY", "")
SARVAM_API_KEY = os.getenv("SARVAM_API_KEY", "")
JUDGE_CODE = os.getenv("JUDGE_CODE", "")


def validate_keys():
    """Called at server startup (main.py lifespan). Not needed by ingest.py."""
    if not PRIMARY_API_KEY:
        raise RuntimeError("PRIMARY_API_KEY is not set. Copy .env.example to .env and fill in your key.")
    if not GROQ_API_KEY:
        raise RuntimeError("GROQ_API_KEY is not set. Copy .env.example to .env and fill in your key.")
    if not SARVAM_API_KEY:
        import warnings
        warnings.warn("SARVAM_API_KEY is not set. Audio proxy endpoints will not work until it is added.")

BASE_DIR = Path(__file__).resolve().parent.parent
CHROMA_DIR = BASE_DIR / "chroma_store"
DATA_DIR = BASE_DIR / "data"
FRONTEND_DIR = BASE_DIR / "frontend"
PROMPTS_DIR = BASE_DIR / "backend" / "prompts"
OFFICES_HYDERABAD = DATA_DIR / "raw" / "bihar_hyd" / "offices_hyderabad.json"
OFFICES_MUMBAI = DATA_DIR / "raw" / "up_mumbai" / "offices_mumbai.json"

# Primary: DeepSeek V3.2 (aicredits.in); fallback: Groq llama-3.3-70b on rate limit
LLM_PRIMARY  = "deepseek/deepseek-v3.2"
LLM_FALLBACK = "llama-3.3-70b-versatile"

PRIMARY_BASE_URL = "https://aicredits.in/v1"

CHROMA_COLLECTION = "migrant_schemes"
EMBED_MODEL = "BAAI/bge-small-en-v1.5"

PORT = 8000

# Corridor-to-allowed corridor_ids for ChromaDB where-clause filtering
CORRIDOR_FILTER = {
    "bihar_hyd": ["bihar_hyd", "all"],
    "up_mumbai": ["up_mumbai", "all"],
}
