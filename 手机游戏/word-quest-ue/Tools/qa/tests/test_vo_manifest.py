"""D13 验收：VO 清单唯一性、说话人合法性、字段完整性、统计一致。"""
import csv
import json
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[3]
sys.path.insert(0, str(ROOT / "Tools"))
import data_vo_manifest as dv  # noqa: E402

CSV = ROOT / "Content" / "Data" / "vo" / "vo_manifest.csv"
SUMMARY = ROOT / "Content" / "Data" / "vo" / "vo_summary.json"
ACTS = ROOT / "Content" / "Data" / "memory" / "acts.json"


def rows():
    with CSV.open(encoding="utf-8-sig", newline="") as fh:
        return list(csv.DictReader(fh))


def test_line_ids_unique_and_count_matches_summary():
    r = rows()
    ids = [x["line_id"] for x in r]
    assert len(ids) == len(set(ids))
    summary = json.loads(SUMMARY.read_text(encoding="utf-8"))
    assert summary["total_lines"] == len(r)


def test_speakers_valid():
    allowed = dv.SPEAKERS
    for x in rows():
        assert x["speaker"] in allowed, x["speaker"]
    chars = {"me2026", "lin", "mei", "an", "rui", "organizer", "old2090"}
    assert chars <= allowed


def test_fields_complete():
    for x in rows():
        assert x["text"].strip()
        assert x["context"].strip()
        assert x["language"] == "en"
        assert float(x["est_seconds"]) > 0
        assert x["emotion"].strip()
        assert x["source"].strip()


def test_all_units_have_reading_lines():
    units = {x["line_id"].split(".")[2] for x in rows() if x["line_id"].startswith("vo.reading.")}
    assert units == {f"unit0{i}" for i in range(1, 7)}


def test_tts_reader_dominates_but_protagonists_present():
    speakers = {}
    for x in rows():
        speakers[x["speaker"]] = speakers.get(x["speaker"], 0) + 1
    assert speakers.get("tts_reader", 0) > 300
    assert speakers.get("narrator", 0) > 20
    assert speakers.get("old2090", 0) >= 3


def test_collect_validate_has_no_errors():
    acts = json.loads(ACTS.read_text(encoding="utf-8"))
    collected = dv.collect(acts)
    assert not dv.validate(collected)
    assert len(collected) == len(rows())
