"""D2 验收：JSON -> CSV 转换的行数、字段、单元分布。"""
import csv
import json
import pathlib

import pytest

from Tools.data_vocabulary_csv import COLUMNS, ROW_NAME_COLUMN, load_rows, write_csv

ROOT = pathlib.Path(__file__).resolve().parents[3]
JSON_PATH = ROOT / "Content" / "Data" / "vocabulary" / "college_english_rw3.json"
CSV_PATH = ROOT / "Content" / "Data" / "vocabulary" / "college_english_rw3.csv"


def test_source_json_exists():
    assert JSON_PATH.is_file()


def test_row_count_matches_json():
    rows = load_rows(JSON_PATH)
    data = json.loads(JSON_PATH.read_text(encoding="utf-8"))
    assert len(rows) == data["count"]
    assert len(rows) == len(data["words"])


def test_required_fields_not_empty():
    rows = load_rows(JSON_PATH)
    for r in rows:
        assert r["Word"].strip(), r
        assert r["Meaning"].strip(), r
        assert r["UnitId"].strip(), r
        assert r["Meanings"].startswith("(") and r["Meanings"].endswith(")"), r


def test_unit_distribution():
    rows = load_rows(JSON_PATH)
    dist = {}
    for r in rows:
        dist[r["UnitId"]] = dist.get(r["UnitId"], 0) + 1
    assert dist == {"unit01": 30, "unit02": 20, "unit03": 20, "unit04": 20, "unit05": 20, "unit06": 20}


def test_write_csv_roundtrip(tmp_path):
    rows = load_rows(JSON_PATH)
    out = write_csv(rows, tmp_path / "dt.csv")
    with out.open(encoding="utf-8-sig", newline="") as fh:
        got = list(csv.DictReader(fh))
    assert len(got) == len(rows)
    assert got[0]["Name"] == rows[0]["Name"]
    assert set(got[0].keys()) == {ROW_NAME_COLUMN} | set(COLUMNS)
    assert got[0]["UnitId"] == "unit01"


def test_project_csv_is_up_to_date():
    assert CSV_PATH.is_file(), "run: python3 Tools/data_vocabulary_csv.py"
    rows = load_rows(JSON_PATH)
    with CSV_PATH.open(encoding="utf-8-sig", newline="") as fh:
        got = list(csv.DictReader(fh))
    assert len(got) == len(rows)
    assert got[-1]["Name"] == rows[-1]["Name"]
