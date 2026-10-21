"""D8 验收：读写3 学习内容条数、必填字段、单元分布、中英配对、CSV 行数。"""
import csv
import json
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[3]
sys.path.insert(0, str(ROOT / "Tools"))

import data_import_content as dic  # noqa: E402

EXPECTED = {"unit": 6, "section": 18, "reading_question": 23, "listening_question": 24,
            "micro_check": 72, "translation": 24, "writing": 6, "outline_point": 24}


def built():
    return dic.build_payload(dic.load_units())


def test_counts_match_source():
    rows = built()["rows"]
    assert {k: len(v) for k, v in rows.items()} == EXPECTED


def test_units_metadata():
    units = built()["merged"]["units"]
    assert len(units) == 6
    assert [u["unit_number"] for u in units] == [1, 2, 3, 4, 5, 6]
    for u in units:
        assert u["title"].strip() and u["title_zh"].strip() and u["theme"].strip()
        assert len(u["word_ids"]) in (20, 30)


def test_sections_passages_non_empty():
    rows = built()["rows"]["section"]
    assert len(rows) == 18
    for r in rows:
        p = r["payload"]
        assert p["unit_id"].startswith("unit")
        assert p["section"] in ("section_a", "section_b", "section_c")
        assert p["title"].strip() and p["passage"].strip()
        assert len(p["passage"]) > 200


def test_questions_required_fields():
    for cat in ("reading_question", "listening_question", "micro_check"):
        for r in built()["rows"][cat]:
            p = r["payload"]
            assert p["question"].strip()
            assert len(p["options"]) == 4 and all(o.strip() for o in p["options"])
            assert 0 <= int(p["answer"]) <= 3
            assert p["explanation"].strip()


def test_translation_zh_en_pairs_complete():
    for r in built()["rows"]["translation"]:
        p = r["payload"]
        assert p["zh"].strip() and len(p["zh"]) > 5
        assert p["en_reference"].strip() and p["en_reference"][0].isascii()
        assert p["keywords"], r


def test_writing_prompt_and_outline():
    rows = built()["rows"]
    assert len(rows["writing"]) == 6
    for r in rows["writing"]:
        p = r["payload"]
        assert p["prompt"].strip()
        assert len(p["outline"]) == 4 and all(s.strip() for s in p["outline"])
    assert len(rows["outline_point"]) == 24


def test_unit_distribution():
    rows = built()["rows"]
    def dist(cat):
        d = {}
        for r in rows[cat]:
            uid = r["payload"]["unit_id"]
            d[uid] = d.get(uid, 0) + 1
        return d
    assert dist("section") == {f"unit0{i}": 3 for i in range(1, 7)}
    assert dist("translation") == {f"unit0{i}": 4 for i in range(1, 7)}
    assert dist("writing") == {f"unit0{i}": 1 for i in range(1, 7)}
    assert dist("micro_check") == {f"unit0{i}": 12 for i in range(1, 7)}


def test_written_csv_matches_counts():
    out = ROOT / "Content" / "Data" / "content"
    summary = json.loads((out / "import-summary.json").read_text(encoding="utf-8"))
    assert summary["counts"] == EXPECTED
    for cat, expected in EXPECTED.items():
        with (out / f"dt_{cat}.csv").open(encoding="utf-8-sig", newline="") as fh:
            got = list(csv.DictReader(fh))
        assert len(got) == expected, cat
        assert all(row["Name"].strip() and row["JsonString"].strip() for row in got), cat
