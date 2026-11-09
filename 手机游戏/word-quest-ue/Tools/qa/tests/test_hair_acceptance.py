"""D20 验收：发丝剪影合理性（配角）与无头发场景的 N/A 处理。"""
import sys
from pathlib import Path

import numpy as np
from PIL import Image

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

import dashboard as db  # noqa: E402


def face_pts(w=512, h=512):
    pts = np.zeros((468, 2), dtype=float)
    pts[10] = (256, 120)      # 额顶
    pts[152] = (256, 340)     # 下巴
    pts[234] = (176, 240)     # 左颧
    pts[454] = (336, 240)     # 右颧
    return pts


def make_render(tmp_path, hair_box=None, bg=140):
    img = np.full((512, 512, 3), bg, dtype=np.uint8)
    img[140:400, 156:356] = (225, 195, 175)   # 脸/身体
    if hair_box is not None:
        y0, y1, x0, x1 = hair_box
        img[y0:y1, x0:x1] = (28, 24, 22)
    p = tmp_path / "render.png"
    Image.fromarray(img).save(p)
    return p


def test_buzz_cut_close_to_head_pass(tmp_path):
    p = make_render(tmp_path, hair_box=(90, 170, 166, 346))
    r = db.hair_acceptance("an", p, pts=face_pts())
    assert r["status"] == "PASS", r


def test_high_ponytail_above_crown_pass(tmp_path):
    p = make_render(tmp_path, hair_box=(60, 360, 180, 332))
    r = db.hair_acceptance("mei", p, pts=face_pts())
    assert r["status"] == "PASS", r


def test_bald_preview_is_na(tmp_path):
    p = make_render(tmp_path, hair_box=None)
    r = db.hair_acceptance("mei", p, pts=face_pts())
    assert r["status"] == "N/A"
    assert "无头发" in r["note"]


def test_floating_hair_fails(tmp_path):
    p = make_render(tmp_path, hair_box=(60, 120, 420, 500))    # 头顶以上有发、但整体飞出头部
    r = db.hair_acceptance("an", p, pts=face_pts())
    assert r["status"] == "FAIL"


def test_capture_missing_does_not_abort(tmp_path, monkeypatch):
    monkeypatch.setattr(db, "PROJECT", tmp_path)
    d = tmp_path / "Saved" / "Compare" / "x"
    d.mkdir(parents=True)
    img = Image.new("RGB", (64, 64), (140, 140, 140))
    for view in ("front", "q34", "side", "back", "closeup"):
        img.save(d / f"{view}.png")
    # 避免依赖 mediapipe：直接让关键点函数与发丝检查返回固定值
    monkeypatch.setattr(db.cr, "landmark_compare", lambda a, b: {"mean": 4.0, "max": 8.0, "p95": 5.0})
    monkeypatch.setattr(db, "hair_acceptance", lambda cid, render, pts=None: {"status": "N/A", "note": "test"})
    ch = db.collect_character("x")
    assert any("capture.json 缺失" in n for n in ch["notes"])
