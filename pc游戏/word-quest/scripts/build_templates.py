#!/usr/bin/env python3
"""根据词汇库生成 CET4 / CET6 / 读写3 三套课程模板。"""

from __future__ import annotations

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
VOCAB_DIR = ROOT / "data" / "vocabulary"
CONTENT_DIR = ROOT / "data" / "content"
TEMPLATE_DIR = ROOT / "data" / "templates"

WORDS_PER_LEVEL = 20
CET4_VOCAB_LEVELS = 30
CET6_VOCAB_LEVELS = 30
RW3_WORDS_PER_LEVEL = 5
RW3_LEVELS_PER_UNIT = 4

RANK_TIERS_CET4 = [
    {"id": "bronze", "name": "青铜", "min_score": 0, "max_score": 350},
    {"id": "silver", "name": "白银", "min_score": 351, "max_score": 425},
    {"id": "gold", "name": "黄金", "min_score": 426, "max_score": 500},
    {"id": "platinum", "name": "铂金", "min_score": 501, "max_score": 575},
    {"id": "diamond", "name": "钻石", "min_score": 576, "max_score": 630},
    {"id": "king", "name": "王者", "min_score": 631, "max_score": 710},
]

RANK_TIERS_CET6 = [
    {"id": "bronze", "name": "青铜", "min_score": 0, "max_score": 360},
    {"id": "silver", "name": "白银", "min_score": 361, "max_score": 430},
    {"id": "gold", "name": "黄金", "min_score": 431, "max_score": 500},
    {"id": "platinum", "name": "铂金", "min_score": 501, "max_score": 570},
    {"id": "diamond", "name": "钻石", "min_score": 571, "max_score": 630},
    {"id": "king", "name": "王者", "min_score": 631, "max_score": 710},
]


def load_vocab(name: str) -> list[dict]:
    data = json.loads((VOCAB_DIR / f"{name}.json").read_text(encoding="utf-8"))
    return data["words"]


def chunk_words(words: list[dict], size: int) -> list[list[dict]]:
    return [words[i : i + size] for i in range(0, len(words), size)]


def build_vocab_levels(words: list[dict], zone_id: str, max_levels: int, title_prefix: str) -> list[dict]:
    chunks = chunk_words(words, WORDS_PER_LEVEL)[:max_levels]
    levels = []
    for i, group in enumerate(chunks, start=1):
        levels.append(
            {
                "id": f"{zone_id}_lv{i:02d}",
                "title": f"{title_prefix} 第{i}关",
                "title_en": f"{title_prefix} Level {i}",
                "stamina_cost": 2,
                "word_ids": [w["id"] for w in group],
                "content_refs": [f"vocab_quiz:{w['id']}" for w in group],
                "boss": False,
            }
        )
    return levels


def build_cet_template(course_id: str, name: str, words: list[dict], rank_tiers: list[dict]) -> dict:
    hf_words = [w for w in words if "high_frequency" in w.get("tags", [])]
    if not hf_words:
        hf_words = words[:600]

    vocab_levels = build_vocab_levels(hf_words, f"{course_id}_vocab", CET4_VOCAB_LEVELS, "词汇森林")

    listening_levels = []
    for i in range(1, 16):
        listening_levels.append(
            {
                "id": f"{course_id}_listen_lv{i:02d}",
                "title": f"听力洞穴 第{i}关",
                "title_en": f"Listening Level {i}",
                "stamina_cost": 2,
                "word_ids": [],
                "content_refs": [f"listening:{course_id}_l{i:02d}"],
                "boss": False,
            }
        )

    reading_levels = []
    for i in range(1, 16):
        reading_levels.append(
            {
                "id": f"{course_id}_read_lv{i:02d}",
                "title": f"阅读废墟 第{i}关",
                "title_en": f"Reading Level {i}",
                "stamina_cost": 2,
                "word_ids": [],
                "content_refs": [f"reading:{course_id}_r{i:02d}"],
                "boss": False,
            }
        )

    translation_levels = []
    for i in range(1, 11):
        translation_levels.append(
            {
                "id": f"{course_id}_trans_lv{i:02d}",
                "title": f"翻译工坊 第{i}关",
                "title_en": f"Translation Level {i}",
                "stamina_cost": 2,
                "word_ids": [],
                "content_refs": [f"translation:{course_id}_t{i:02d}"],
                "boss": False,
            }
        )

    boss_levels = []
    for i in range(1, 6):
        boss_levels.append(
            {
                "id": f"{course_id}_boss_lv{i:02d}",
                "title": f"Boss 模考 {i}",
                "title_en": f"Mock Exam {i}",
                "stamina_cost": 3,
                "word_ids": [],
                "content_refs": [f"mock_exam:{course_id}_m{i:02d}"],
                "boss": True,
                "stars_required": 6 if i > 1 else 0,
            }
        )

    return {
        "id": course_id,
        "name": name,
        "name_en": course_id.upper(),
        "description": f"{name} RPG 闯关模板：词汇/听力/阅读/翻译/Boss 模考",
        "version": "1.0.0",
        "source": "考纲词汇 + 原创仿真题",
        "exam_info": {
            "full_score": 710,
            "pass_score": 425,
            "duration_minutes": 125,
        },
        "zones": [
            {
                "id": f"{course_id}_vocab",
                "name": "词汇森林",
                "name_en": "Vocabulary Forest",
                "type": "vocabulary",
                "order": 1,
                "unlock_level": 1,
                "levels": vocab_levels,
            },
            {
                "id": f"{course_id}_listening",
                "name": "听力洞穴",
                "name_en": "Listening Cave",
                "type": "listening",
                "order": 2,
                "unlock_level": 3,
                "levels": listening_levels,
            },
            {
                "id": f"{course_id}_reading",
                "name": "阅读废墟",
                "name_en": "Reading Ruins",
                "type": "reading",
                "order": 3,
                "unlock_level": 5,
                "levels": reading_levels,
            },
            {
                "id": f"{course_id}_translation",
                "name": "翻译工坊",
                "name_en": "Translation Workshop",
                "type": "translation",
                "order": 4,
                "unlock_level": 8,
                "levels": translation_levels,
            },
            {
                "id": f"{course_id}_boss",
                "name": "Boss 圣殿",
                "name_en": "Boss Temple",
                "type": "boss",
                "order": 5,
                "unlock_level": 10,
                "levels": boss_levels,
            },
        ],
        "rank_tiers": rank_tiers,
        "game_rules": {
            "stamina_max": 6,
            "stamina_per_level": 2,
            "daily_level_limit": 3,
            "streak_reward_days": 7,
            "streak_reward_id": "sprint_pack",
            "sprint_mode_days": 30,
        },
    }


def build_rw3_template() -> dict:
    words = load_vocab("college_english_rw3")
    unit_files = sorted((CONTENT_DIR / "college_english_rw3").glob("unit*.json"))
    zones = []

    for order, unit_path in enumerate(unit_files, start=1):
        unit = json.loads(unit_path.read_text(encoding="utf-8"))
        uid = unit["unit_id"]
        unit_words = [w for w in words if w.get("unit_id") == uid]
        chunks = chunk_words(unit_words, RW3_WORDS_PER_LEVEL)

        levels = []
        for i, group in enumerate(chunks[:RW3_LEVELS_PER_UNIT], start=1):
            levels.append(
                {
                    "id": f"rw3_{uid}_lv{i:02d}",
                    "title": f"{unit['title_zh']} · 词汇 {i}",
                    "title_en": f"{unit['title']} Vocab {i}",
                    "stamina_cost": 2,
                    "word_ids": [w["id"] for w in group],
                    "content_refs": [f"rw3_vocab:{w['id']}" for w in group],
                    "boss": False,
                }
            )

        levels.append(
            {
                "id": f"rw3_{uid}_read",
                "title": f"{unit['title_zh']} · 阅读",
                "title_en": f"{unit['title']} Reading",
                "stamina_cost": 2,
                "word_ids": unit.get("word_ids", []),
                "content_refs": [f"rw3_reading:{uid}"],
                "boss": False,
            }
        )
        levels.append(
            {
                "id": f"rw3_{uid}_listen",
                "title": f"{unit['title_zh']} · 听力",
                "title_en": f"{unit['title']} Listening",
                "stamina_cost": 2,
                "word_ids": [],
                "content_refs": [f"rw3_listening:{uid}"],
                "boss": False,
            }
        )
        levels.append(
            {
                "id": f"rw3_{uid}_boss",
                "title": f"{unit['title_zh']} · 单元挑战",
                "title_en": f"{unit['title']} Unit Boss",
                "stamina_cost": 3,
                "word_ids": unit.get("word_ids", []),
                "content_refs": [f"rw3_unit_boss:{uid}"],
                "boss": True,
            }
        )

        zones.append(
            {
                "id": f"rw3_{uid}",
                "name": f"Unit {unit['unit_number']}: {unit['title_zh']}",
                "name_en": unit["title"],
                "type": "unit",
                "order": order,
                "unlock_level": 1 if order == 1 else order,
                "levels": levels,
            }
        )

    return {
        "id": "college_english_rw3",
        "name": "大学英语读写教程3",
        "name_en": "College English Reading & Writing Book 3",
        "description": "新视野大学英语（第四版）读写教程3，按单元闯关",
        "version": "1.1.0",
        "source": "新视野大学英语（第四版）读写教程 Book 3（思政智慧版）单元主题 + 原创学习内容",
        "exam_info": {
            "full_score": 100,
            "pass_score": 60,
            "duration_minutes": 90,
        },
        "zones": zones,
        "rank_tiers": [
            {"id": "bronze", "name": "青铜", "min_score": 0, "max_score": 59},
            {"id": "silver", "name": "白银", "min_score": 60, "max_score": 69},
            {"id": "gold", "name": "黄金", "min_score": 70, "max_score": 79},
            {"id": "platinum", "name": "铂金", "min_score": 80, "max_score": 89},
            {"id": "diamond", "name": "钻石", "min_score": 90, "max_score": 94},
            {"id": "king", "name": "王者", "min_score": 95, "max_score": 100},
        ],
        "game_rules": {
            "stamina_max": 6,
            "stamina_per_level": 2,
            "daily_level_limit": 3,
            "streak_reward_days": 7,
            "streak_reward_id": "sprint_pack",
            "sprint_mode_days": 30,
        },
    }


def main() -> None:
    TEMPLATE_DIR.mkdir(parents=True, exist_ok=True)

    cet4_words = load_vocab("cet4")
    cet6_words = load_vocab("cet6")

    templates = {
        "cet4.json": build_cet_template("cet4", "大学英语四级", cet4_words, RANK_TIERS_CET4),
        "cet6.json": build_cet_template("cet6", "大学英语六级", cet6_words, RANK_TIERS_CET6),
        "college_english_rw3.json": build_rw3_template(),
    }

    for filename, payload in templates.items():
        path = TEMPLATE_DIR / filename
        path.write_text(json.dumps(payload, ensure_ascii=False, indent=2), encoding="utf-8")
        zone_count = len(payload["zones"])
        level_count = sum(len(z["levels"]) for z in payload["zones"])
        print(f"Wrote template {filename}: {zone_count} zones, {level_count} levels")


if __name__ == "__main__":
    main()
