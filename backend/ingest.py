"""
Run with: python -m backend.ingest
Reads all scheme .md files, chunks them, embeds with bge-small (CPU),
and upserts into the local ChromaDB collection.
"""

import json
import pathlib
import re
import sys

import chromadb
from sentence_transformers import SentenceTransformer

from backend.config import (
    BASE_DIR,
    CHROMA_COLLECTION,
    CHROMA_DIR,
    DATA_DIR,
    EMBED_MODEL,
)

CHUNK_SIZE = 300   # words per chunk
CHUNK_OVERLAP = 50


def parse_frontmatter(text: str) -> tuple[dict, str]:
    if not text.startswith("---"):
        return {}, text
    end = text.index("---", 3)
    fm_raw = text[3:end].strip()
    body = text[end + 3:].strip()
    meta = {}
    for line in fm_raw.splitlines():
        if ":" in line:
            k, _, v = line.partition(":")
            meta[k.strip()] = v.strip().strip('"')
    return meta, body


def chunk_text(text: str, size: int = CHUNK_SIZE, overlap: int = CHUNK_OVERLAP) -> list[str]:
    words = text.split()
    chunks = []
    start = 0
    while start < len(words):
        end = min(start + size, len(words))
        chunks.append(" ".join(words[start:end]))
        if end == len(words):
            break
        start += size - overlap
    return chunks


def collect_docs() -> list[dict]:
    docs = []
    # Central schemes
    for f in (DATA_DIR / "raw" / "central").glob("*.md"):
        meta, body = parse_frontmatter(f.read_text(encoding="utf-8"))
        docs.append({"meta": meta, "body": body, "file": f.name})
    # Bihar→Hyderabad corridor
    for f in (DATA_DIR / "raw" / "bihar_hyd").glob("*.md"):
        meta, body = parse_frontmatter(f.read_text(encoding="utf-8"))
        docs.append({"meta": meta, "body": body, "file": f.name})
    # UP→Mumbai corridor
    for f in (DATA_DIR / "raw" / "up_mumbai").glob("*.md"):
        meta, body = parse_frontmatter(f.read_text(encoding="utf-8"))
        docs.append({"meta": meta, "body": body, "file": f.name})
    # Routed-out docs (bocw etc.) — included so retrieval can surface the honest decline
    for f in (DATA_DIR / "routed_out").glob("*.md"):
        meta, body = parse_frontmatter(f.read_text(encoding="utf-8"))
        docs.append({"meta": meta, "body": body, "file": f.name})
    return docs


def main():
    print(f"Loading embedding model: {EMBED_MODEL} (CPU)")
    model = SentenceTransformer(EMBED_MODEL, device="cpu")

    client = chromadb.PersistentClient(path=str(CHROMA_DIR))
    # Fresh collection each run
    try:
        client.delete_collection(CHROMA_COLLECTION)
    except Exception:
        pass
    collection = client.create_collection(
        name=CHROMA_COLLECTION,
        metadata={"hnsw:space": "cosine"},
    )

    docs = collect_docs()
    print(f"Found {len(docs)} source documents")

    all_ids, all_embeddings, all_docs, all_metas = [], [], [], []

    for doc in docs:
        meta = doc["meta"]
        chunks = chunk_text(doc["body"])
        for i, chunk in enumerate(chunks):
            chunk_id = f"{meta.get('scheme_id', 'unknown')}_{doc['file']}_{i}"
            embedding = model.encode(chunk, normalize_embeddings=True).tolist()
            flat_meta = {
                "scheme_id":      meta.get("scheme_id", ""),
                "category":       meta.get("category", "planning"),
                "dependency":     meta.get("dependency", "standalone"),
                "corridor_id":    meta.get("corridor_id", "all"),
                "source_url":     meta.get("source_url", ""),
                "official_portal": meta.get("official_portal", ""),
                "verified_date":  meta.get("verified_date", ""),
                "policy_version": meta.get("policy_version", "v1"),
                "source_tier":    meta.get("source_tier", "official_gov"),
            }
            all_ids.append(chunk_id)
            all_embeddings.append(embedding)
            all_docs.append(chunk)
            all_metas.append(flat_meta)

    collection.upsert(
        ids=all_ids,
        embeddings=all_embeddings,
        documents=all_docs,
        metadatas=all_metas,
    )
    print(f"Ingested {len(all_ids)} chunks into ChromaDB at {CHROMA_DIR}")


if __name__ == "__main__":
    main()