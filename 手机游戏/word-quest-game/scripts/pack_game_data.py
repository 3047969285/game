#!/usr/bin/env python3
"""将 word-quest 学习内容打包为游戏可用的精简 bundle。"""

from __future__ import annotations

import json
import shutil
import tempfile
from uuid import uuid4
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DATA_SRC = ROOT.parent / "word-quest" / "data"
OUT = ROOT / "public" / "data"

# MVP：四级词汇前 600 词（30关），完整模板，读写3 全量
CET4_WORD_LIMIT = 600
COURSES = ("cet4", "cet6", "college_english_rw3")
REQUIRED_FILES = (
    *(f"templates/{course}.json" for course in COURSES),
    *(f"vocabulary/{course}.json" for course in COURSES),
    *(f"content/{course}/{kind}.json" for course in ("cet4", "cet6")
      for kind in ("listening", "reading", "translation")),
    *(f"content/college_english_rw3/unit{unit:02}.json" for unit in range(1, 7)),
)


def load_json(path: Path):
    return json.loads(path.read_text(encoding="utf-8"))


def validate_bundle(directory: Path) -> None:
    for relative in REQUIRED_FILES:
        load_json(directory / relative)
    for file in directory.rglob("*.json"):
        load_json(file)
    for course in COURSES:
        vocabulary = load_json(directory / "vocabulary" / f"{course}.json")
        if not isinstance(vocabulary, dict) or not isinstance(vocabulary.get("words"), list):
            raise ValueError(f"Invalid vocabulary: {course}")
        if not vocabulary["words"] or vocabulary.get("count") != len(vocabulary["words"]):
            raise ValueError(f"Invalid vocabulary count: {course}")


def pack_data(source: Path, output: Path) -> bool:
    if not source.exists():
        validate_bundle(output)
        print(f"Source data not found at {source}; keep validated game bundle.")
        return False

    # 先在目标目录所在文件系统构建完整包；任何解析/复制失败都不触碰旧包。
    validate_bundle(source)
    output.parent.mkdir(parents=True, exist_ok=True)
    with tempfile.TemporaryDirectory(prefix=".word-quest-pack-", dir=output.parent) as temporary:
        staging = Path(temporary) / "bundle"
        for folder in ("templates", "vocabulary", "content"):
            shutil.copytree(source / folder, staging / folder)

        cet4 = load_json(staging / "vocabulary/cet4.json")
        cet4["words"] = cet4["words"][:CET4_WORD_LIMIT]
        cet4["count"] = len(cet4["words"])
        cet4.setdefault("meta", {})["game_bundle"] = True
        (staging / "vocabulary/cet4.json").write_text(
            json.dumps(cet4, ensure_ascii=False, indent=2), encoding="utf-8"
        )
        validate_bundle(staging)

        # 备份不放进自动清理目录：恢复本身失败时仍需留下旧包供恢复。
        previous = output.parent / f".{output.name}.backup-{uuid4().hex}"
        if output.exists():
            output.replace(previous)
        try:
            staging.replace(output)
        except OSError:
            if previous.exists():
                try:
                    previous.replace(output)
                except OSError as error:
                    raise OSError(f"旧数据包恢复失败，原数据保留在 {previous}") from error
            raise
        if previous.exists():
            shutil.rmtree(previous)
    print(f"Game data packed to {output}")
    return True


def main() -> None:
    pack_data(DATA_SRC, OUT)


if __name__ == "__main__":
    main()
