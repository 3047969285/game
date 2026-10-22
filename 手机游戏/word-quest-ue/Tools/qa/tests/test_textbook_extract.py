"""教材提取（新视野读写教程3）结构与数据完整性验收。"""
import csv
import json
from pathlib import Path

import pytest

PROJECT = Path(__file__).resolve().parents[3]
DATA = PROJECT / "Content" / "Data" / "textbook" / "rw3"
JSON = DATA / "textbook.json"


@pytest.fixture(scope="module")
def book():
    return json.load(open(JSON, encoding="utf-8"))


def test_six_units_and_counts(book):
    assert book["counts"]["units"] == 6
    assert len(book["units"]) == 6
    c = book["counts"]
    assert c["words"] >= 400
    assert c["questions"] >= 150
    assert c["translation_lines"] >= 20
    assert c["textA_paragraphs"] >= 40


def test_each_unit_has_article_words_questions_translation(book):
    for u in book["units"]:
        for sec in ("A", "B"):
            assert len(u["sections"][sec]["article"]["paragraphs"]) >= 5, u["unit_id"]
            assert len(u["sections"][sec]["words"]) >= 20, u["unit_id"]
        assert len(u["sections"]["A"]["exercises"]) >= 2, u["unit_id"]
        assert len(u["sections"]["A"]["exercises"]) + len(u["sections"]["B"]["exercises"]) >= 3, u["unit_id"]
        assert len(u["sections"]["C"]["story"]["raw"]) > 400, u["unit_id"]
        assert len(u["sections"]["C"]["translation"]) >= 2, u["unit_id"]
        assert u["title"].strip()


def test_page_ranges_ordered(book):
    for u in book["units"]:
        p = u["pages"]
        assert p["opener"] < p["sectionA"] < p["sectionB"] < p["sectionC"] < p["project"], u["unit_id"]


def test_words_csv_matches_json(book):
    rows = list(csv.DictReader(open(DATA / "words.csv", encoding="utf-8-sig")))
    assert len(rows) == book["counts"]["words"]
    for r in rows:
        assert r["word"].strip()
        assert r["phonetic"].startswith("/")


def test_questions_csv_matches_json(book):
    rows = list(csv.DictReader(open(DATA / "questions.csv", encoding="utf-8-sig")))
    assert len(rows) == book["counts"]["questions"]
    for r in rows:
        assert len(r["question"].strip()) >= 12


def test_unit_markdown_exists(book):
    for u in book["units"]:
        md = DATA / "units" / f"{u['unit_id']}.md"
        assert md.is_file(), md
        text = md.read_text(encoding="utf-8")
        assert "## Text A" in text and "## Text B" in text


def test_parser_helpers():
    import sys
    sys.path.insert(0, str(PROJECT / "Tools"))
    import data_textbook as dt

    assert dt.strip_marker("Adense") == "dense"
    assert dt.strip_marker("A convention") == "convention"
    assert dt.strip_marker("American") == "American"
    lines = ["This is a first sentence that is long enough to keep going.",
             "2", "Second paragraph starts here with enough words to keep.",
             "3 More text that also continues for a while so it is kept."]
    paras = dt.paragraphs(lines)
    assert len(paras) >= 2
    qs = dt.parse_questions([
        "1 Answer the following questions.",
        "2 What is the main idea of the passage?",
        "A The first option",
        "B The second option",
        "C The third option",
        "3 Why does the author mention this example?",
    ])
    assert len(qs) == 2
    assert qs[0]["question"].startswith("What is")
    assert qs[0]["options"] == ["The first option", "The second option", "The third option"]
