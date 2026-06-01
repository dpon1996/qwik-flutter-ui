#!/usr/bin/env python3
"""Insert v1.3 Forms sections into API_DESIGN.md and renumber §28–§35 → §38–§45."""

from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DOC = ROOT / "docs" / "API_DESIGN.md"
FORMS = ROOT / "scripts" / "forms-sections.md"

MARKER = "## 28. v1.2 scrolling — shared enums review"

HEADER_RENAMES = [
    ("## 35. Final implementation checklist", "## 45. Final implementation checklist"),
    ("## 34. Roadmap", "## 44. Roadmap"),
    ("## 33. Decisions log", "## 43. Decisions log"),
    ("## 32. Summary table", "## 42. Summary table"),
    ("## 31. API consistency review", "## 41. API consistency review"),
    ("## 30. Open questions (approval required)", "## 40. Open questions (approval required)"),
    ("## 29. v1.2 Scrolling open questions", "## 39. v1.2 Scrolling open questions"),
    (MARKER, "## 38. v1.2 scrolling — shared enums review"),
]

# Cross-refs: old section number → new (only apply outside forms block)
REF_MAP = [
    ("§35 ", "§45 "),
    ("§35.", "§45."),
    ("§34.5", "§44.5"),
    ("§34.4", "§44.4"),
    ("§34.3", "§44.3"),
    ("§34 ", "§44 "),
    ("§34.", "§44."),
    ("§33 ", "§43 "),
    ("§33.", "§43."),
    ("§32 ", "§42 "),
    ("§32.", "§42."),
    ("§31.12", "§41.12"),
    ("§31.11", "§41.11"),
    ("§31.10", "§41.10"),
    ("§31.7", "§41.7"),
    ("§31.6", "§41.6"),
    ("§31 ", "§41 "),
    ("§31.", "§41."),
    ("§30.11", "§40.11"),
    ("§30.10", "§40.10"),
    ("§30.9", "§40.9"),
    ("§30.8", "§40.8"),
    ("§30.7", "§40.7"),
    ("§30.6", "§40.6"),
    ("§30.5", "§40.5"),
    ("§30.4", "§40.4"),
    ("§30.3", "§40.3"),
    ("§30.2", "§40.2"),
    ("§30.1", "§40.1"),
    ("§30 ", "§40 "),
    ("§30.", "§40."),
    ("§29 S2", "§39 S2"),
    ("§29 L5", "§39 L5"),
    ("§29 L1", "§39 L1"),
    ("§29 G4", "§39 G4"),
    ("§29 G3", "§39 G3"),
    ("§29 ", "§39 "),
    ("§29.", "§39."),
    ("§28 ", "§38 "),
    ("§28.", "§38."),
]

SUBSECTION_RENAMES = [
    ("### 31.12", "### 41.12"),
    ("### 31.11", "### 41.11"),
    ("### 31.10", "### 41.10"),
    ("### 31.9", "### 41.9"),
    ("### 31.8", "### 41.8"),
    ("### 31.7", "### 41.7"),
    ("### 31.6", "### 41.6"),
    ("### 31.5", "### 41.5"),
    ("### 31.4", "### 41.4"),
    ("### 31.3", "### 41.3"),
    ("### 31.2", "### 41.2"),
    ("### 31.1", "### 41.1"),
    ("### 30.11", "### 40.11"),
    ("### 30.10", "### 40.10"),
    ("### 30.9", "### 40.9"),
    ("### 30.8", "### 40.8"),
    ("### 30.7", "### 40.7"),
    ("### 30.6", "### 40.6"),
    ("### 30.5", "### 40.5"),
    ("### 30.4", "### 40.4"),
    ("### 30.3", "### 40.3"),
    ("### 30.2", "### 40.2"),
    ("### 30.1", "### 40.1"),
]


def main() -> None:
    text = DOC.read_text(encoding="utf-8")
    forms = FORMS.read_text(encoding="utf-8")

    if "## 28. `InputDecoration`" in text:
        print("Forms sections already inserted; skipping insert.")
    else:
        if MARKER not in text:
            raise SystemExit(f"Marker not found: {MARKER}")
        text = text.replace(MARKER, forms.rstrip() + "\n\n---\n\n" + MARKER, 1)

    for old, new in HEADER_RENAMES:
        if old in text:
            text = text.replace(old, new, 1)

    # Subsections in tail only (after forms block start)
    forms_start = text.find("## 28. `InputDecoration`")
    tail = text[forms_start:] if forms_start >= 0 else text
    head = text[:forms_start] if forms_start >= 0 else ""

    for old, new in SUBSECTION_RENAMES:
        tail = tail.replace(old, new)

    # Cross-refs in head + tail (not in forms block body between InputDecoration and §38 scrolling)
    forms_end = tail.find("## 38. v1.2 scrolling")
    if forms_start >= 0 and forms_end >= 0:
        forms_block = tail[:forms_end]
        tail_rest = tail[forms_end:]
        for old, new in REF_MAP:
            head = head.replace(old, new)
            tail_rest = tail_rest.replace(old, new)
        tail = forms_block + tail_rest
    else:
        combined = head + tail
        for old, new in REF_MAP:
            combined = combined.replace(old, new)
        head, tail = "", combined

    text = head + tail
    DOC.write_text(text, encoding="utf-8")
    print(f"Updated {DOC}")


if __name__ == "__main__":
    main()
