#!/usr/bin/env python3
"""从开源词表生成 CET4/CET6 结构化词汇 JSON。"""

from __future__ import annotations

import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SOURCES = ROOT.parent / "_sources"
OUT_DIR = ROOT / "data" / "vocabulary"


def parse_word_line(line: str) -> dict | None:
    line = line.strip()
    if not line or line.startswith("#"):
        return None

    parts = line.split("\t", 1)
    if len(parts) != 2:
        return None

    word, rest = parts[0].strip(), parts[1].strip()
    if not word or not rest:
        return None

    segments = [s.strip() for s in rest.split(" ") if s.strip()]
    meanings: list[str] = []
    pos = ""
    primary = ""

    for seg in segments:
        m = re.match(r"^([a-z]+\.)$", seg, re.I)
        if m and not primary:
            pos = m.group(1)
            continue
        m2 = re.match(r"^([a-z]+\.)\s*(.+)$", seg, re.I)
        if m2:
            pos = m2.group(1)
            text = m2.group(2).strip()
            meanings.append(f"{pos} {text}")
            if not primary:
                primary = text
        else:
            if pos:
                meanings.append(f"{pos} {seg}")
                if not primary:
                    primary = seg
            else:
                meanings.append(seg)
                if not primary:
                    primary = seg

    if not primary:
        primary = rest

    return {
        "word": word,
        "pos": pos,
        "meaning": primary,
        "meanings": meanings or [rest],
    }


def load_txt_vocab(path: Path, prefix: str) -> list[dict]:
    entries: list[dict] = []
    seen: set[str] = set()

    for line in path.read_text(encoding="utf-8").splitlines():
        parsed = parse_word_line(line)
        if not parsed:
            continue
        key = parsed["word"].lower()
        if key in seen:
            continue
        seen.add(key)

        idx = len(entries) + 1
        entry = {
            "id": f"{prefix}_{idx:05d}",
            "word": parsed["word"],
            "phonetic": "",
            "pos": parsed["pos"],
            "meaning": parsed["meaning"],
            "meanings": parsed["meanings"],
            "example": "",
            "example_zh": "",
            "tags": [],
            "difficulty": 1 + (idx % 5),
        }
        entries.append(entry)

    return entries


def tag_high_frequency(entries: list[dict], count: int = 2000) -> None:
    for i, e in enumerate(entries):
        if i < count:
            e["tags"].append("high_frequency")


def write_vocab(entries: list[dict], out_path: Path, meta: dict) -> None:
    payload = {
        "meta": meta,
        "count": len(entries),
        "words": entries,
    }
    out_path.parent.mkdir(parents=True, exist_ok=True)
    out_path.write_text(json.dumps(payload, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"Wrote {len(entries)} words -> {out_path}")


def main() -> None:
    cet4_src = SOURCES / "cet4-words.txt"
    cet6_src = SOURCES / "cet6-words.txt"

    if not cet4_src.exists() or not cet6_src.exists():
        raise FileNotFoundError("请先确保 _sources/cet4-words.txt 与 cet6-words.txt 存在")

    cet4 = load_txt_vocab(cet4_src, "cet4")
    cet6 = load_txt_vocab(cet6_src, "cet6")
    tag_high_frequency(cet4, 2500)
    tag_high_frequency(cet6, 2000)

    write_vocab(
        cet4,
        OUT_DIR / "cet4.json",
        {
            "course_id": "cet4",
            "name": "大学英语四级词汇",
            "source": "KyleBing/english-vocabulary (CET4 考纲词表整理)",
            "license_note": "开源词表整理，仅供学习应用",
        },
    )

    write_vocab(
        cet6,
        OUT_DIR / "cet6.json",
        {
            "course_id": "cet6",
            "name": "大学英语六级词汇",
            "source": "KyleBing/english-vocabulary (CET6 考纲词表整理)",
            "license_note": "开源词表整理，仅供学习应用",
        },
    )


if __name__ == "__main__":
    main()
