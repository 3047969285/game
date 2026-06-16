#!/usr/bin/env python3
"""将 word-quest 学习内容打包为游戏可用的精简 bundle。"""

from __future__ import annotations

import json
import shutil
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DATA_SRC = ROOT.parent / "word-quest" / "data"
OUT = ROOT / "public" / "data"

# MVP：四级词汇前 600 词（30关），完整模板，读写3 全量
CET4_WORD_LIMIT = 600


def load_json(path: Path):
    return json.loads(path.read_text(encoding="utf-8"))


def main() -> None:
    if OUT.exists():
        shutil.rmtree(OUT)
    OUT.mkdir(parents=True)

    # 模板
    (OUT / "templates").mkdir(parents=True, exist_ok=True)
    for name in ["cet4.json", "cet6.json", "college_english_rw3.json"]:
        shutil.copy2(DATA_SRC / "templates" / name, OUT / "templates" / name)

    # 四级词汇（精简）
    cet4 = load_json(DATA_SRC / "vocabulary" / "cet4.json")
    cet4["words"] = cet4["words"][:CET4_WORD_LIMIT]
    cet4["count"] = len(cet4["words"])
    cet4["meta"]["game_bundle"] = True
    (OUT / "vocabulary").mkdir(parents=True, exist_ok=True)
    (OUT / "vocabulary" / "cet4.json").write_text(
        json.dumps(cet4, ensure_ascii=False, indent=2), encoding="utf-8"
    )

    # 六级、读写3 全量（体积可接受）
    shutil.copy2(DATA_SRC / "vocabulary" / "cet6.json", OUT / "vocabulary" / "cet6.json")
    shutil.copy2(DATA_SRC / "vocabulary" / "college_english_rw3.json", OUT / "vocabulary" / "college_english_rw3.json")

    # 内容
    for course in ["cet4", "cet6"]:
        src = DATA_SRC / "content" / course
        dst = OUT / "content" / course
        dst.mkdir(parents=True, exist_ok=True)
        for f in src.glob("*.json"):
            shutil.copy2(f, dst / f.name)

    rw3_src = DATA_SRC / "content" / "college_english_rw3"
    rw3_dst = OUT / "content" / "college_english_rw3"
    rw3_dst.mkdir(parents=True, exist_ok=True)
    for f in rw3_src.glob("unit*.json"):
        shutil.copy2(f, rw3_dst / f.name)

    print(f"Game data packed to {OUT}")


if __name__ == "__main__":
    main()
