#!/usr/bin/env python3
"""Insert v1.4 Selection Controls sections into API_DESIGN.md after §37."""

from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DOC = ROOT / "docs" / "API_DESIGN.md"
SECTIONS = ROOT / "scripts" / "selection-sections.md"

MARKER = "## 38. v1.2 scrolling — shared enums review"


def main() -> None:
    text = DOC.read_text(encoding="utf-8")
    sections = SECTIONS.read_text(encoding="utf-8")

    if "## 46. `Checkbox`" in text:
        print("Selection sections already inserted; skipping insert.")
        return

    if MARKER not in text:
        raise SystemExit(f"Marker not found: {MARKER}")

    text = text.replace(MARKER, sections.rstrip() + "\n\n---\n\n" + MARKER, 1)
    DOC.write_text(text, encoding="utf-8")
    print(f"Updated {DOC}")


if __name__ == "__main__":
    main()
