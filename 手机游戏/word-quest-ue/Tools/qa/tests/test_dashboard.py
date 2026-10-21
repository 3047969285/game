"""D18 验收：用假数据验证看板表格、趋势计算、历史读写。"""
import csv
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

import dashboard as db  # noqa: E402


def fake_row(cid="me2026", front=5.0, q34=7.0, face=0.8, hair=0.5, photo=4.0, tmhc=5.0):
    return {"id": cid, "verdict": "FAIL",
            "metrics": {"front_px": front, "q34_px": q34, "face_iou": face, "hair_iou": hair,
                        "photo_target_px": photo, "target_mhc_px": tmhc},
            "timestamp": "2026-10-21 22:30",
            "raw": {"id": cid, "landmarks": {}, "hull_iou": {}, "hair_iou": {}, "ratios": {},
                    "photo_target": {}, "renders": {}, "notes": [], "timestamp": "2026-10-21 22:30"}}


def test_trend_directions():
    assert db.trend(4.0, {"front_px": "6.0"}, "front_px") == "变好"
    assert db.trend(7.0, {"front_px": "6.0"}, "front_px") == "变差"
    assert db.trend(6.0, {"front_px": "6.0"}, "front_px") == "持平"
    assert db.trend(0.9, {"face_iou": "0.8"}, "face_iou") == "变好"     # 越高越好
    assert db.trend(0.7, {"face_iou": "0.8"}, "face_iou") == "变差"
    assert db.trend(None, {"front_px": "6.0"}, "front_px") == "—"
    assert db.trend(5.0, {}, "front_px") == "—"


def test_verdict():
    assert db.verdict({"metrics": {"front_px": 2, "q34_px": 7, "face_iou": 0.96, "hair_iou": 0.9}}) == "PASS"
    assert db.verdict({"metrics": {"front_px": 4, "q34_px": 7, "face_iou": 0.96, "hair_iou": 0.9}}) == "FAIL"
    assert db.verdict({"metrics": {}}) == "N/A"


def test_row_from_character_and_markdown():
    ch = {"id": "mei", "renders": {}, "target": {}, "landmarks": {"front": {"mean": 4.5, "max": 9.0}},
          "hull_iou": {"front": 0.9}, "hair_iou": {}, "ratios": {}, "photo_target": {},
          "timestamp": "2026-10-21 22:30", "notes": []}
    row = db.row_from_character(ch)
    row["verdict"] = db.verdict(row)
    assert row["metrics"]["front_px"] == 4.5
    md = db.render_markdown([row], {}, "2026-10-21 22:31")
    assert "全员验收看板" in md and "mei" in md and "4.50" in md


def test_markdown_na_when_empty():
    ch = {"id": "rui", "renders": {}, "target": {}, "landmarks": {}, "hull_iou": {}, "hair_iou": {},
          "ratios": {}, "photo_target": {}, "timestamp": None, "notes": ["Codex 渲染未完成"]}
    row = db.row_from_character(ch)
    row["verdict"] = db.verdict(row)
    md = db.render_markdown([row], {}, "now")
    assert row["verdict"] == "N/A"
    assert "N/A" in md


def test_history_append_and_previous(tmp_path):
    path = tmp_path / "history.csv"
    r1 = fake_row(front=6.0, face=0.8)
    r1["verdict"] = "FAIL"
    db.append_history([r1], path)
    r2 = fake_row(front=4.0, face=0.9)
    r2["verdict"] = "FAIL"
    db.append_history([r2], path)
    prev = db.previous_rows(path)
    assert prev["me2026"]["front_px"] == "4.0"
    with path.open(encoding="utf-8-sig", newline="") as fh:
        rows = list(csv.DictReader(fh))
    assert len(rows) == 2
    assert set(rows[0].keys()) == set(db.HISTORY_FIELDS)
