"""教材 → 游戏内容格式（textbook_units.json / textbook_vocabulary.csv）验收。"""
import csv
import json
from pathlib import Path

PROJECT = Path(__file__).resolve().parents[3]
DATA = PROJECT / "Content" / "Data" / "content"


def load():
    return json.load(open(DATA / "textbook_units.json", encoding="utf-8"))


def test_six_units_and_sections():
    d = load()
    assert d["source"] == "textbook-rw3-ocr"
    assert d["needsProofreading"] is True
    assert len(d["units"]) == 6
    for u in d["units"]:
        for key in ("section_a", "section_b", "section_c"):
            assert len(u["sections"][key]["passage"]) > 500, (u["unit_id"], key)
        assert u["title"] and u["title_zh"] and u["theme"]


def test_vocabulary_and_questions_counts():
    d = load()
    assert sum(u["counts"]["words"] for u in d["units"]) == 506
    assert sum(u["counts"]["questions"] for u in d["units"]) == 270
    for u in d["units"]:
        assert len(u["vocabulary"]) == u["counts"]["words"]
        assert len(u["questions"]) == u["counts"]["questions"]
        assert u["translation_prompts"] and len(u["translation_prompts"][0]) > 80


def test_vocab_csv_importable():
    rows = list(csv.DictReader(open(DATA / "textbook_vocabulary.csv", encoding="utf-8-sig")))
    assert len(rows) == 506
    assert set(rows[0]) == {"Word", "Phonetic", "Pos", "Meaning", "Example", "UnitId", "UnitTitle", "Meanings"}
    for r in rows:
        assert r["Word"].strip() and r["UnitId"].startswith("unit")
