"""D10 验收：配置映射、掩码 IoU、缺失渲染时报告为 N/A。"""
import sys
from pathlib import Path

import numpy as np
from PIL import Image

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

import run_blender_preview_report as rp  # noqa: E402


def test_resolve_profiles():
    assert rp.resolve("male")[0] == "me2026"
    assert rp.resolve("female")[0] == "lin"
    assert rp.resolve("me2026")[0] == "me2026"
    import pytest
    with pytest.raises(SystemExit):
        rp.resolve("nobody")


def test_hair_iou_identical_masks(tmp_path):
    mask = np.zeros((64, 64), dtype=np.uint8)
    mask[10:50, 12:52] = 255
    ref_mask = tmp_path / "ref.png"
    Image.fromarray(mask).save(ref_mask)
    render = tmp_path / "render.png"
    rgb = np.full((64, 64, 3), 255, dtype=np.uint8)
    rgb[10:50, 12:52] = (20, 20, 20)
    Image.fromarray(rgb).save(render)
    iou = rp.mask_iou_against(ref_mask, render, 100.0)
    assert 0.95 <= iou <= 1.0


def test_report_na_for_missing_renders(tmp_path, monkeypatch):
    out = tmp_path / "x-report.md"
    monkeypatch.setattr(rp, "render_path", lambda prof, view: tmp_path / f"missing_{view}.png")
    res = rp.run("me2026", out)
    text = out.read_text(encoding="utf-8")
    assert res["rows"] >= 5
    assert "N/A" in text and "临时验收" in text


def test_side_by_side(tmp_path):
    a = tmp_path / "a.png"
    b = tmp_path / "b.png"
    Image.new("RGB", (100, 200), (255, 255, 255)).save(a)
    Image.new("RGB", (100, 200), (180, 180, 180)).save(b)
    out = tmp_path / "pair.png"
    rp.side_by_side(a, b, out, height=100)
    assert Image.open(out).height == 100
