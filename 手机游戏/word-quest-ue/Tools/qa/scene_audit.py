#!/usr/bin/env python3
"""D26 场景质检自动化：checker 报告 + 4K 截图 -> metrics / flags / dashboard。

用法：
  python3 Tools/qa/scene_audit.py
  python3 Tools/qa/scene_audit.py --unit 1
  python3 Tools/qa/scene_audit.py --project <工程根> --out-md <md> --out-json <json>
"""
from __future__ import annotations

import argparse
import json
import re
from datetime import datetime, timezone
from pathlib import Path

PROJECT_DEFAULT = Path(__file__).resolve().parents[2]

DARK_LUMA = 16
BRIGHT_LUMA = 240
DARK_RATIO_FAIL = 0.35
BRIGHT_RATIO_FAIL = 0.25
FLAT_RATIO_WARN = 0.45
EMPTY_EDGE_WARN = 0.03
DECALS_MIN = 10
UNITS = (1, 2, 3, 4, 5, 6)

DECALS_RE = re.compile(r"decals\s+(\d+)\s*/\s*10", re.I)
SCENE_RE = re.compile(r"^u(?P<unit>\d{2})(?P<section>[abc])_")


# ----------------------------------------------------------------------------- 图像指标
def image_metrics(path: Path) -> dict:
    """计算曝光 / 纯色 / 空旷度指标。依赖 Pillow + numpy。"""
    import numpy as np
    from PIL import Image

    with Image.open(path) as image:
        rgb = image.convert("RGB")
        width, height = rgb.size
        if max(width, height) > 1600:  # 4K 截图缩到 1600 内，统计口径不变、速度更快
            scale = 1600 / max(width, height)
            rgb = rgb.resize((max(1, int(width * scale)), max(1, int(height * scale))))
        arr = np.asarray(rgb, dtype=np.uint8)
    luma = (arr[:, :, 0] * 0.299 + arr[:, :, 1] * 0.587 + arr[:, :, 2] * 0.114).astype(np.float32)

    dark = float((luma < DARK_LUMA).mean())
    bright = float((luma > BRIGHT_LUMA).mean())
    mean_luma = float(luma.mean())

    # 纯色面积：RGB 量化到 16 级，最大同色 bin 占比
    quant = (arr // 16).astype(np.int32)
    codes = quant[:, :, 0] * 256 + quant[:, :, 1] * 16 + quant[:, :, 2]
    counts = np.bincount(codes.ravel(), minlength=4096)
    flat_ratio = float(counts.max() / codes.size)

    # 空旷度：简化 Sobel 梯度，边缘像素占比
    gx = np.abs(np.diff(luma, axis=1))
    gy = np.abs(np.diff(luma, axis=0))
    edge_x = gx[:-1, :] if gx.shape[0] > gy.shape[0] else gx[: gy.shape[0], :]
    edge = np.maximum(edge_x, gy[:, : edge_x.shape[1]]) if edge_x.size and gy.size else np.zeros_like(luma)
    edge_ratio = float((edge > 24).mean()) if edge.size else 0.0

    return {
        "size": list(rgb.size),
        "mean_luma": round(mean_luma, 1),
        "dark_ratio": round(dark, 3),
        "bright_ratio": round(bright, 3),
        "flat_ratio": round(flat_ratio, 3),
        "edge_ratio": round(edge_ratio, 4),
    }


def parse_decals(issues: list[str] | None) -> int:
    for issue in issues or []:
        match = DECALS_RE.search(issue)
        if match:
            return int(match.group(1))
    return 0


def flags_for(scene: dict, metrics: dict | None) -> list[str]:
    flags: list[str] = []
    if scene.get("needs_final_asset", 0) > 0:
        flags.append(f"needs_final_asset:{scene['needs_final_asset']}")
    if scene.get("placeholders", 0) > 0:
        flags.append(f"placeholders:{scene['placeholders']}")
    decals = parse_decals(scene.get("issues"))
    if decals < DECALS_MIN:
        flags.append(f"decals:{decals}/{DECALS_MIN}")
    if metrics:
        if metrics["dark_ratio"] > DARK_RATIO_FAIL:
            flags.append(f"too_dark:{metrics['dark_ratio']}")
        if metrics["bright_ratio"] > BRIGHT_RATIO_FAIL:
            flags.append(f"too_bright:{metrics['bright_ratio']}")
        if metrics["flat_ratio"] > FLAT_RATIO_WARN:
            flags.append(f"flat_area:{metrics['flat_ratio']}")
        if metrics["edge_ratio"] < EMPTY_EDGE_WARN:
            flags.append(f"empty:{metrics['edge_ratio']}")
    if scene.get("quality") and scene["quality"] != "PASS":
        flags.append(f"checker:{scene['quality']}")
    return flags


# ----------------------------------------------------------------------------- 汇总
def _scene_section(scene_id: str) -> tuple[str, str]:
    match = SCENE_RE.match(scene_id or "")
    if not match:
        return "", ""
    return f"unit{match.group('unit')}", f"section_{match.group('section')}"


def audit_project(project: Path = PROJECT_DEFAULT, only_unit: int | None = None) -> dict:
    qa_dir = project / "Docs/qa"
    units: list[dict] = []
    for unit_number in UNITS:
        if only_unit and unit_number != only_unit:
            continue
        report_path = qa_dir / f"textbook-scenes-unit{unit_number:02}.json"
        unit_key = f"unit{unit_number:02}"
        if not report_path.exists():
            units.append({"unit": unit_key, "report": None, "missing_report": True, "scenes": [], "articles": {}})
            continue
        report = json.loads(report_path.read_text(encoding="utf-8"))
        scenes = []
        articles: dict[str, dict] = {}
        for scene in report.get("scenes", []):
            scene_id = scene.get("scene", "")
            _, section = _scene_section(scene_id)
            metrics: dict | None = None
            shots = scene.get("shots") or []
            per_shot = []
            for shot in shots:
                shot_path = project / shot
                if shot_path.exists():
                    try:
                        per_shot.append(image_metrics(shot_path))
                    except Exception as error:  # 截图损坏不应让整份报告失败
                        per_shot.append({"error": str(error)})
            good = [m for m in per_shot if "error" not in m]
            if good:
                metrics = {
                    key: round(sum(m[key] for m in good) / len(good), 4)
                    for key in ("mean_luma", "dark_ratio", "bright_ratio", "flat_ratio", "edge_ratio")
                }
                metrics["shots_measured"] = len(good)
            flags = flags_for(scene, metrics)
            row = {
                "scene": scene_id,
                "section": section,
                "quality": scene.get("quality"),
                "props": scene.get("props"),
                "cameras": scene.get("cameras"),
                "needs_final_asset": scene.get("needs_final_asset", 0),
                "placeholders": scene.get("placeholders", 0),
                "decals": parse_decals(scene.get("issues")),
                "metrics": metrics,
                "flags": flags,
                "shots": shots,
                "shots_missing": [shot for shot in shots if not (project / shot).exists()],
            }
            scenes.append(row)
            group = articles.setdefault(section or "unknown", {"scene_count": 0, "fail": 0, "needs_final_asset": 0, "placeholders": 0, "shots": 0})
            group["scene_count"] += 1
            group["fail"] += 1 if scene.get("quality") != "PASS" else 0
            group["needs_final_asset"] += row["needs_final_asset"]
            group["placeholders"] += row["placeholders"]
            group["shots"] += len(shots)
        units.append({
            "unit": unit_key,
            "report": str(report_path.relative_to(project)),
            "resolution": report.get("resolution"),
            "missing_report": False,
            "scenes": scenes,
            "articles": articles,
        })

    totals = {"scenes": 0, "fail": 0, "needs_final_asset": 0, "placeholders": 0, "shots": 0, "reports": 0}
    for unit in units:
        if unit["missing_report"]:
            continue
        totals["reports"] += 1
        for scene in unit["scenes"]:
            totals["scenes"] += 1
            totals["fail"] += 1 if scene["quality"] != "PASS" else 0
            totals["needs_final_asset"] += scene["needs_final_asset"]
            totals["placeholders"] += scene["placeholders"]
            totals["shots"] += len(scene["shots"])
    return {"generated_at": datetime.now(timezone.utc).isoformat(timespec="seconds"),
            "thresholds": {"dark": DARK_RATIO_FAIL, "bright": BRIGHT_RATIO_FAIL, "flat": FLAT_RATIO_WARN,
                           "edge": EMPTY_EDGE_WARN, "decals": DECALS_MIN},
            "units": units, "totals": totals}


# ----------------------------------------------------------------------------- dashboard
def _fmt_metric(metrics: dict | None, key: str) -> str:
    if not metrics:
        return "N/A"
    value = metrics.get(key)
    if value is None:
        return "N/A"
    return f"{value:.3f}" if isinstance(value, float) else str(value)


def render_dashboard(audit: dict) -> str:
    lines = [
        "# 场景质检 Dashboard（D26）",
        "",
        f"> 生成：`python3 Tools/qa/scene_audit.py` · {audit['generated_at']}",
        "> 来源：Codex checker 报告 `Docs/qa/textbook-scenes-unitNN.json` + 4K 截图；机器筛查，仅供 Claude 人工评审参考。",
        "",
        "## 1. 阈值",
        "",
        f"- 过暗：dark_ratio > {DARK_RATIO_FAIL}；过曝：bright_ratio > {BRIGHT_RATIO_FAIL}",
        f"- 纯色面积：flat_ratio > {FLAT_RATIO_WARN}；空旷：edge_ratio < {EMPTY_EDGE_WARN}",
        f"- 贴花：< {DECALS_MIN}/10；占位物/缺资产 > 0 都会标出",
        "",
        "## 2. 总览",
        "",
        "| 项 | 值 |",
        "|----|----|",
        f"| 有报告的单元 | {audit['totals']['reports']} / 6 |",
        f"| set 总数 | {audit['totals']['scenes']} |",
        f"| checker FAIL | {audit['totals']['fail']} |",
        f"| 缺最终资产（合计） | {audit['totals']['needs_final_asset']} |",
        f"| 占位物（合计） | {audit['totals']['placeholders']} |",
        f"| 截图 | {audit['totals']['shots']} |",
        "",
    ]
    missing = [unit["unit"] for unit in audit["units"] if unit.get("missing_report")]
    if missing:
        lines += [f"> ⚠️ 报告缺失：{'、'.join(missing)}（checker 尚未产出；表中标 N/A，不伪造数据）", ""]
    lines += ["## 3. 每篇课文（18 关卡）", "", "| 单元/文章 | set 数 | FAIL | 缺资产 | 占位 | 截图 | 状态 |", "|-----------|-------|------|--------|------|------|------|"]
    for unit in audit["units"]:
        if unit.get("missing_report"):
            lines.append(f"| {unit['unit']} | – | – | – | – | – | N/A (report missing) |")
            continue
        for section, group in sorted(unit["articles"].items()):
            status = "OK" if group["fail"] == 0 and group["needs_final_asset"] == 0 else "待修"
            lines.append(
                f"| {unit['unit']}/{section} | {group['scene_count']} | {group['fail']} | "
                f"{group['needs_final_asset']} | {group['placeholders']} | {group['shots']} | {status} |"
            )
    lines += ["", "## 4. 每个 set", "",
              "| set | 文章 | quality | 占位 | 缺资产 | 贴花 | 亮度 | 过暗 | 过曝 | 纯色 | 边缘(空旷) | flags | 缩略图 |",
              "|-----|------|---------|------|--------|------|------|------|------|------|-----------|-------|--------|"]
    for unit in audit["units"]:
        if unit.get("missing_report"):
            continue
        for scene in unit["scenes"]:
            metrics = scene["metrics"]
            thumb = ""
            for shot in scene["shots"]:
                if (PROJECT_DEFAULT / shot).exists():
                    thumb = f"[图]({shot})"
                    break
            if scene["shots_missing"]:
                thumb += " ⚠"
            lines.append(
                f"| {scene['scene']} | {unit['unit']}/{scene['section']} | {scene['quality']} | "
                f"{scene['placeholders']} | {scene['needs_final_asset']} | {scene['decals']} | "
                f"{_fmt_metric(metrics, 'mean_luma')} | {_fmt_metric(metrics, 'dark_ratio')} | "
                f"{_fmt_metric(metrics, 'bright_ratio')} | {_fmt_metric(metrics, 'flat_ratio')} | "
                f"{_fmt_metric(metrics, 'edge_ratio')} | {' '.join(scene['flags']) or '–'} | {thumb} |"
            )
    lines += [
        "",
        "## 5. 复现",
        "",
        "```bash",
        "python3 Tools/qa/scene_audit.py",
        "~/.local/share/hunyuan3d/.venv/bin/python -m pytest Tools/qa/tests/test_scene_audit.py -q",
        "```",
        "",
    ]
    return "\n".join(lines)


def main(argv=None) -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--project", type=Path, default=PROJECT_DEFAULT)
    parser.add_argument("--unit", type=int, default=None)
    parser.add_argument("--out-md", type=Path, default=None)
    parser.add_argument("--out-json", type=Path, default=None)
    args = parser.parse_args(argv)
    project = args.project.resolve()
    audit = audit_project(project, args.unit)
    out_md = args.out_md or project / "Docs/qa/scenes-dashboard.md"
    out_json = args.out_json or project / "Docs/qa/scenes-audit.json"
    out_md.parent.mkdir(parents=True, exist_ok=True)
    out_md.write_text(render_dashboard(audit), encoding="utf-8")
    out_json.write_text(json.dumps(audit, ensure_ascii=False, indent=1), encoding="utf-8")
    print(f"reports={audit['totals']['reports']} scenes={audit['totals']['scenes']} fail={audit['totals']['fail']} shots={audit['totals']['shots']}")
    print(f"dashboard: {out_md}")
    print(f"json: {out_json}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
