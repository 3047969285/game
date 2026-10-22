#!/usr/bin/env python3
"""用教材提取结果生成读写教程3 的数据层（课文/单词/题目/翻译/写作）。

数据来源：
  data/textbook/rw3/textbook.json       —— OCR 提取的原始结构化教材（复核用）
  data/textbook/rw3/qa/unit01–06.json   —— 人工/agent 校对后的干净内容（本脚本的输入）
音标来源：
  data/vocabulary/cet4.json / cet6.json —— 复用四六级词库里的音标，找不到就留空，不编造。

输出：
  data/vocabulary/college_english_rw3.json
  data/content/college_english_rw3/unit01–06.json

用法：python3 scripts/build_rw3_content.py
"""
from __future__ import annotations

import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / "data"
QA_DIR = DATA / "textbook" / "rw3" / "qa"
OUT_VOCAB = DATA / "vocabulary" / "college_english_rw3.json"
OUT_CONTENT = DATA / "content" / "college_english_rw3"

WORDS_PER_LEVEL = 5
SENTENCE_RE = re.compile(r"(?<=[.!?])\s+")
WORD_CHAR = re.compile(r"[A-Za-z]")


def load_phonetics() -> dict[str, str]:
    """音标优先级：qa/phonetics.json（页图转写/旧词表）> 四六级词库。"""
    mapping: dict[str, str] = {}
    override = QA_DIR / "phonetics.json"
    if override.exists():
        for word, phonetic in json.loads(override.read_text(encoding="utf-8")).items():
            if phonetic and phonetic.strip():
                mapping[word.strip().lower()] = phonetic.strip()
    for course in ("cet4", "cet6"):
        path = DATA / "vocabulary" / f"{course}.json"
        if not path.exists():
            continue
        for word in json.loads(path.read_text(encoding="utf-8"))["words"]:
            phonetic = (word.get("phonetic") or "").strip()
            if phonetic:
                mapping.setdefault(word["word"].strip().lower(), phonetic)
    return mapping


def sentences_of(paragraphs: list[str]) -> list[str]:
    text = " ".join(p.strip() for p in paragraphs if p.strip())
    return [s.strip() for s in SENTENCE_RE.split(text) if len(s.strip()) > 3]


def find_example(paragraphs: list[str], word: str) -> str:
    pattern = re.compile(rf"(?<![A-Za-z]){re.escape(word)}(?![A-Za-z])", re.I)
    for sentence in sentences_of(paragraphs):
        if pattern.search(sentence):
            return sentence
    return ""


def normalize_word(entry: dict) -> dict:
    return {
        "word": (entry.get("word") or "").strip(),
        "pos": (entry.get("pos") or "").strip(),
        "meaning": (entry.get("meaning_cn") or entry.get("meaning") or "").strip(),
        "section": entry.get("section", "A"),
    }


def build_words(unit: dict, phonetics: dict[str, str], title: str) -> list[dict]:
    paragraphs: list[str] = []
    for key in ("section_a", "section_b"):
        paragraphs.extend(unit["texts"][key]["paragraphs"])

    seen: set[str] = set()
    words: list[dict] = []
    for raw in unit["words"]:
        entry = normalize_word(raw)
        key = entry["word"].lower()
        if not entry["word"] or not WORD_CHAR.search(entry["word"]) or key in seen:
            continue
        if not entry["meaning"]:
            continue
        seen.add(key)
        index = len(words) + 1
        meaning, pos = entry["meaning"], entry["pos"]
        words.append(
            {
                "id": f"rw3_{unit['unit_id']}_{index:02d}",
                "word": entry["word"],
                "phonetic": phonetics.get(key, ""),
                "pos": pos,
                "meaning": meaning,
                "meanings": [f"{pos} {meaning}".strip()],
                "example": find_example(paragraphs, entry["word"]),
                "example_zh": "",
                "difficulty": 2 + (index % 3),
                "unit_id": unit["unit_id"],
                "unit_title": title,
                "section": entry["section"],
                "tags": ["college_english_rw3", "edition4", unit["unit_id"], "textbook"],
                "edition": 4,
            }
        )
    return words


def check_question(question: dict, label: str) -> dict:
    options = question.get("options") or []
    answer = question.get("answer")
    text = (question.get("question") or "").strip()
    if len(options) != 4:
        raise ValueError(f"{label}: 选项数量不是 4 -> {text[:60]}")
    if type(answer) is not int or not 0 <= answer < 4:
        raise ValueError(f"{label}: answer 不合法 -> {text[:60]}")
    if not text:
        raise ValueError(f"{label}: 题干为空")
    return {
        "question": text,
        "options": [str(o).strip() for o in options],
        "answer": answer,
        "explanation": (question.get("explanation") or "").strip(),
    }


def pick_questions(questions: list[dict], section: str, limit: int) -> list[dict]:
    return [q for q in questions if q.get("section") == section][:limit]


def build_unit(qa: dict, phonetics: dict[str, str], fallback: dict) -> tuple[dict, list[dict]]:
    unit_id = qa["unit_id"]
    title = qa.get("title") or fallback.get("title", "")
    title_zh = qa.get("title_zh") or fallback.get("title_zh", "")
    theme = qa.get("theme") or fallback.get("theme", "")
    words = build_words(qa, phonetics, title)
    if len(words) < 5:
        raise ValueError(f"{unit_id}: 词条过少（{len(words)}）")

    texts = qa["texts"]
    passage_a = " ".join(" ".join(p.split()) for p in texts["section_a"]["paragraphs"])
    passage_b = " ".join(" ".join(p.split()) for p in texts["section_b"]["paragraphs"])
    passage_c = " ".join(" ".join(p.split()) for p in texts["section_c"]["paragraphs"])

    questions: list[dict] = []
    for index, raw in enumerate(qa.get("questions", []), start=1):
        checked = check_question(raw, f"{unit_id} 第{index}题")
        checked["section"] = raw.get("section", "A")
        checked["heading"] = raw.get("heading", "")
        checked["source_page"] = raw.get("source_page")
        questions.append(checked)

    def quiz(items: list[dict], limit: int = 10) -> list[dict]:
        return [
            {k: q[k] for k in ("question", "options", "answer", "explanation")}
            for q in items[:limit]
        ]

    section_a_qs = pick_questions(questions, "A", 999)
    section_b_qs = pick_questions(questions, "B", 999)
    section_c_qs = pick_questions(questions, "C", 999)

    micro = {
        "section_a": quiz(section_a_qs[:4]),
        "section_b": quiz(section_b_qs[:4]),
        "section_c": quiz(section_c_qs[:4]),
    }

    stop = {"the", "a", "an", "and", "or", "of", "to", "in", "on", "for", "with", "is", "are",
            "was", "were", "be", "been", "it", "its", "this", "that", "as", "at", "by", "from",
            "not", "but", "they", "their", "we", "our", "you", "your", "he", "she", "his", "her"}

    def keywords_of(en: str) -> list[str]:
        result: list[str] = []
        for token in re.findall(r"[A-Za-z][A-Za-z'-]*", en):
            if token.lower() in stop or token.lower() in {r.lower() for r in result}:
                continue
            result.append(token)
            if len(result) == 4:
                break
        return result

    translations = [
        {
            "zh": (item.get("zh") or "").strip(),
            "en_reference": (item.get("en_reference") or "").strip(),
            "keywords": keywords_of((item.get("en_reference") or "").strip()),
        }
        for item in qa.get("translation", [])
    ]
    if not translations:
        raise ValueError(f"{unit_id}: 缺少翻译练习")

    writing = qa.get("writing") or {
        "prompt": f"Write a passage about: {title}.",
        "outline": ["State your view", "Give one example", "Explain the reason", "Conclude"],
    }

    payload = {
        "unit_id": unit_id,
        "unit_number": qa["unit_number"],
        "edition": 4,
        "source": "textbook-rw3",
        "title": title,
        "title_zh": title_zh,
        "theme": theme,
        "word_ids": [w["id"] for w in words],
        "micro_world_checks": micro,
        "sections": {
            "section_a": {"title": texts["section_a"].get("title", ""), "type": "reading", "passage": passage_a},
            "section_b": {"title": texts["section_b"].get("title", ""), "type": "reading", "passage": passage_b},
            "section_c": {"title": texts["section_c"].get("title", ""), "type": "stories_of_china", "passage": passage_c},
            "vocabulary": {"level_count": (len(words) + WORDS_PER_LEVEL - 1) // WORDS_PER_LEVEL, "words_per_level": WORDS_PER_LEVEL},
            "reading": {
                "title": texts["section_a"].get("title", ""),
                "passage": passage_a,
                "questions": quiz(section_a_qs[4:14] or section_a_qs),
            },
            "listening": {
                "title": f"Listening: {title}",
                "script": passage_b,
                "questions": quiz(section_b_qs[4:14] or section_b_qs),
            },
            "translation": {"sentences": translations},
            "writing": writing,
        },
    }
    return payload, words


def main() -> None:
    phonetics = load_phonetics()
    qa_files = sorted(QA_DIR.glob("unit*.json"))
    if len(qa_files) != 6:
        raise SystemExit(f"需要 6 个 QA 文件，实际 {len(qa_files)} 个：{QA_DIR}")

    old_units = {}
    for path in sorted(OUT_CONTENT.glob("unit*.json")):
        old = json.loads(path.read_text(encoding="utf-8"))
        old_units[old["unit_id"]] = old

    all_words: list[dict] = []
    missing_phonetic = 0
    for path in qa_files:
        qa = json.loads(path.read_text(encoding="utf-8"))
        payload, words = build_unit(qa, phonetics, old_units.get(qa["unit_id"], {}))
        OUT_CONTENT.mkdir(parents=True, exist_ok=True)
        (OUT_CONTENT / f"{qa['unit_id']}.json").write_text(
            json.dumps(payload, ensure_ascii=False, indent=2), encoding="utf-8"
        )
        all_words.extend(words)
        missing = sum(1 for w in words if not w["phonetic"])
        missing_phonetic += missing
        micro_count = sum(len(v) for v in payload["micro_world_checks"].values())
        print(
            f"{qa['unit_id']}: 词 {len(words)}（缺音标 {missing}）, 微检查 {micro_count}, "
            f"阅读题 {len(payload['sections']['reading']['questions'])}, "
            f"翻译 {len(payload['sections']['translation']['sentences'])}"
        )

    OUT_VOCAB.write_text(
        json.dumps(
            {
                "meta": {
                    "course_id": "college_english_rw3",
                    "name": "大学英语读写教程3",
                    "textbook": "新视野大学英语（第四版）读写教程 Book 3（思政智慧版）",
                    "edition": 4,
                    "units": 6,
                    "sections_per_unit": ["Section A", "Section B", "Section C Stories of China"],
                    "source": "textbook",
                    "note": "词汇、课文与题目取自教材原文，经教师授权用于本教学应用",
                },
                "count": len(all_words),
                "words": all_words,
            },
            ensure_ascii=False,
            indent=2,
        ),
        encoding="utf-8",
    )
    print(f"Wrote vocabulary: {len(all_words)} words（缺音标 {missing_phonetic} 条，留空不编造）")


if __name__ == "__main__":
    main()
