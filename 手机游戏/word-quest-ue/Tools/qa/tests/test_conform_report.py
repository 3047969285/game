"""D15 验收：剪影 IoU、颈部不对称、诊断文本、缺图 N/A。"""
import sys
from pathlib import Path

import numpy as np

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

import conform_report as cr  # noqa: E402


def test_iou_identical_and_disjoint():
    a = np.zeros((20, 20), dtype=bool)
    a[5:15, 5:15] = True
    assert cr.iou(a, a) == 1.0
    b = np.zeros_like(a)
    b[0:3, 0:3] = True
    assert cr.iou(a, b) == 0.0


def test_lower_asymmetry_symmetric_and_skewed():
    m = np.zeros((60, 60), dtype=bool)
    m[5:55, 10:50] = True
    assert cr.lower_asymmetry(m) < 0.02
    skewed = np.zeros((60, 60), dtype=bool)
    skewed[5:55, 10:50] = True
    skewed[35:55, :30] = False
    skewed[35:55, 20:50] = True
    assert cr.lower_asymmetry(skewed) > 0.05


def test_diagnose_flags_mouth_and_neck():
    regions = {"mean": 4.0, "mouth": {"mean": 9.0, "max": 12.0}, "nose": {"mean": 4.5, "max": 9.0},
               "contour": {"mean": 5.0, "max": 10.0}, "brows": {"mean": 2.0, "max": 3.0},
               "left_eye": {"mean": 1.5, "max": 2.0}, "right_eye": {"mean": 1.5, "max": 2.0}}
    tips = cr.diagnose(regions, 0.82, 0.10)
    text = " ".join(tips)
    assert "嘴" in text
    assert "轮廓" in text or "颈部" in text


def test_collect_marks_missing_as_na(tmp_path, monkeypatch):
    monkeypatch.setattr(cr, "PROJECT", tmp_path)
    (tmp_path / "Saved" / "Compare" / "x").mkdir(parents=True)
    data = cr.collect("x")
    assert all(v["status"] == "N/A" for v in data["views"].values())
