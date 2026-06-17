from datetime import date


def compute_provenance(metadatas: list[dict]) -> dict:
    dates = []
    has_curated = False
    seen_sources = {}

    for m in metadatas:
        raw = m.get("verified_date", "")
        if raw:
            try:
                dates.append(date.fromisoformat(raw))
            except ValueError:
                pass
        if m.get("source_tier") == "curated_sample":
            has_curated = True
        sid = m.get("scheme_id", "")
        if sid and sid not in seen_sources:
            seen_sources[sid] = {
                "scheme_id": sid,
                "official_portal": m.get("official_portal", ""),
                "source_tier": m.get("source_tier", "official_gov"),
            }

    oldest = min(dates).isoformat() if dates else "2026-01-15"
    return {
        "provenance": {
            "oldest_verified_date": oldest,
            "contains_curated_sample": has_curated,
        },
        "sources": list(seen_sources.values()),
    }