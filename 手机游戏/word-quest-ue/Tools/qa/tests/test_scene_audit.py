"""D26 场景质检测试（PIL 合成图 + 合成 checker 报告）。"""
import json
import sys
from pathlib import Path

import pytest
from PIL import Image, ImageDraw

TOOLS = Path(__file__).resolve().parents[2]
if str(TOOLS) not in sys.path:
    sys.path.insert(0, str(TOOLS))

from qa import scene_audit as sa  # noqa: E402


def make_image(path: Path, mode: str) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    if mode == "black":
        Image.new("RGB", (64, 36), (0, 0, 0)).save(path)
    elif mode == "white":
        Image.new("RGB", (64, 36), (255, 255, 255)).save(path)
    elif mode == "flat":
        Image.new("RGB", (64, 36), (120, 80, 40)).save(path)
    elif mode == "busy":
        image = Image.new("RGB", (64, 36), (30, 30, 30))
        draw = ImageDraw.Draw(image)
        for x in range(0, 64, 4):
            draw.line([(x, 0), (63 - x, 35)], fill=(220, 220, 220), width=1)
        image.save(path)


def test_image_metrics_extremes(tmp_path: Path):
    for mode in ("black", "white", "flat", "busy"):
        make_image(tmp_path / f"{mode}.png", mode)
    black = sa.image_metrics(tmp_path / "black.png")
    assert black["dark_ratio"] > 0.95 and black["mean_luma"] < 5
    white = sa.image_metrics(tmp_path / "white.png")
    assert white["bright_ratio"] > 0.95 and white["mean_luma"] > 250
    flat = sa.image_metrics(tmp_path / "flat.png")
    assert flat["flat_ratio"] > 0.95
    busy = sa.image_metrics(tmp_path / "busy.png")
    assert busy["edge_ratio"] > flat["edge_ratio"]


def test_parse_decals():
    assert sa.parse_decals(["decals 7/10", "other issue"]) == 7
    assert sa.parse_decals(["nothing here"]) == 0
    assert sa.parse_decals(None) == 0


def make_report(project: Path) -> None:
    for n in (1, 2):
        shots = []
        for i, mode in enumerate(("flat", "busy")):
            rel = f"Docs/qa/scenes/u0{n}a_s{i + 1}/wide.png"
            make_image(project / rel, mode)
            shots.append(rel)
        report = {
            "resolution": [3840, 2160],
            "scenes": [
                {"scene": f"u0{n}a_s1", "props": 10, "cameras": 3, "needs_final_asset": 2, "placeholders": 3,
                 "issues": ["decals 4/10"], "quality": "FAIL", "shots": [shots[0]]},
                {"scene": f"u0{n}a_s2", "props": 8, "cameras": 2, "needs_final_asset": 0, "placeholders": 0,
                 "issues": ["decals 12/10"], "quality": "PASS", "shots": [shots[1]]},
            ],
        }
        (project / "Docs/qa").mkdir(parents=True, exist_ok=True)
        (project / f"Docs/qa/textbook-scenes-unit{n:02}.json").write_text(json.dumps(report), encoding="utf-8")


def test_audit_and_dashboard(tmp_path: Path):
    make_report(tmp_path)
    audit = sa.audit_project(tmp_path)
    assert audit["totals"]["reports"] == 2
    assert audit["totals"]["scenes"] == 4
    unit1 = audit["units"][0]
    assert unit1["scenes"][0]["decals"] == 4
    assert any(flag.startswith("decals:") for flag in unit1["scenes"][0]["flags"])
    assert unit1["scenes"][1]["decals"] == 12
    assert unit1["scenes"][1]["quality"] == "PASS"
    # 其余单元报告缺失 -> N/A
    assert any(unit.get("missing_report") for unit in audit["units"])

    text = sa.render_dashboard(audit)
    assert "# 场景质检 Dashboard（D26）" in text
    assert "N/A (report missing)" in text
    assert "u01a_s1" in text

    out_md = tmp_path / "out/dashboard.md"
    out_json = tmp_path / "out/audit.json"
    code = sa.main(["--project", str(tmp_path), "--out-md", str(out_md), "--out-json", str(out_json)])
    assert code == 0
    assert out_md.exists() and out_json.exists()
