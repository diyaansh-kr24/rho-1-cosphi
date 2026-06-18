# Migrant Worker Interstate Navigator

AI-powered welfare-navigation tool for internal migrant workers in India.

## Setup

### Prerequisites
- Python 3.11 or 3.12
- API keys: Groq, Sarvam AI

### Install

```bash
# Create and activate a virtual environment
python -m venv venv

# Windows
venv\Scripts\activate
# macOS/Linux
source venv/bin/activate

# Install dependencies (one pass, no conflicts)
pip install -r requirements.txt
```

### Configure

```bash
cp .env.example .env
# Edit .env and add your GROQ_API_KEY and SARVAM_API_KEY
```

### Ingest knowledge base

```bash
python -m backend.ingest
```

### Run

```bash
uvicorn backend.main:app --reload --port 8000
```

Open **http://localhost:8000** in your browser.

## Architecture

- **Backend:** FastAPI + Uvicorn, port 8000
- **Frontend:** Vanilla JS + CSS, served statically from `/`
- **Inference:** Groq API (`llama-3.3-70b-versatile` → `llama-3.1-8b-instant` fallback)
- **Vector store:** ChromaDB (local, `chroma_store/`)
- **Embeddings:** `BAAI/bge-small-en-v1.5` via sentence-transformers (CPU)
- **Audio:** Sarvam AI STT/TTS via `/audio/*` backend proxy

## Locations

| Location | Persona |
|---|---|
| `hyd_tg` | Shyam Lal |
| `mumbai_mh` | Sajid |

## Schemes

| ID | Name |
|---|---|
| `eshram` | e-Shram (hub, gateway) |
| `onorc` | One Nation One Ration Card |
| `pmsby` | PM Suraksha Bima Yojana |
| `pmjay` | PM-JAY (Ayushman Bharat) |
| `pm_sym` | PM Shram Yogi Maandhan |
| `bocw` | BOCW (routed-out, non-portable) |
