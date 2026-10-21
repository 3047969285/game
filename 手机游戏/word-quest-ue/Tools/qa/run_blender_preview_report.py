#!/usr/bin/env python3
"""D10：Blender lookdev 临时验收报告（Codex 的 UE 对比渲染就绪前用）。

用法：run_blender_preview_report.py <who>    # me2026 / lin（或 male / female）

渲染：~/.local/share/hunyuan3d/work/fit/<male|female>_look_{front,q34,side,back,closeup}.png
参考：男主 lian1(front)/lian3(q34)/lian2(side)/male_sheet(back+closeup)；
      女主 lian5/lian6/lian8/female_sheet；头发目标掩码来自 Docs/qa/ref_masks/。
输出：Docs/qa/<id>-blender-preview.md（+ 并排图与差异图）
"""
from __future__ import annotations

import argparse
import json
import sys
from pathlib import Path

import numpy as np
from PIL import Image

sys.path.insert(0, str(Path(__file__).resolve().parent))
import compare_landmarks as cl  # noqa: E402
import compare_silhouette as cs  # noqa: E402
from metrics import difference_rgb, foreground_mask_auto, hair_mask, apply_affine, similarity_align, landmark_errors  # noqa: E402

PROJECT = Path(__file__).resolve().parents[2]
WORK = Path.home() / ".local/share/hunyuan3d/work"
DOWNLOADS = Path.home() / "Downloads"
MASKS = PROJECT / "Docs" / "qa" / "ref_masks"
THRESHOLDS = {"front_mean_px": 3.0, "q34_mean_px": 8.0, "side_face_iou": 0.95, "hair_iou": 0.85}

PROFILES = {
    "me2026": {
        "who": "male", "label": "男主 me2026（Blender lookdev 临时验收）", "hair_vmax": 100.0,
        "refs": {"front": "lian1.png", "q34": "lian3.png", "side": "lian2.png",
                 "back": "male_sheet.png", "closeup": "male_sheet.png"},
        "masks": {"front": "me2026_front.png", "side": "me2026_side.png"},
    },
    "lin": {
        "who": "female", "label": "女主 lin（Blender lookdev 临时验收）", "hair_vmax": 150.0,
        "refs": {"front": "lian5.png", "q34": "lian7.png", "side": "lian6.png",
                 "back": "female_sheet.png", "closeup": "female_sheet.png"},
        "masks": {"front": "lin_front.png", "side": "lin_side.png"},
    },
}
ALIASES = {"male": "me2026", "female": "lin"}


def resolve(who: str) -> tuple[str, dict]:
    cid = ALIASES.get(who, who)
    if cid not in PROFILES:
        raise SystemExit(f"unknown who: {who} (use me2026|lin|male|female)")
    return cid, PROFILES[cid]


def render_path(prof: dict, view: str) -> Path:
    return WORK / "fit" / f"{prof['who']}_look_{view}.png"


def side_by_side(ref: Path, render: Path, out: Path, height: int = 640) -> None:
    a = Image.open(ref).convert("RGB")
    b = Image.open(render).convert("RGB")
    a = a.resize((int(a.width * height / a.height), height), Image.LANCZOS)
    b = b.resize((int(b.width * height / b.height), height), Image.LANCZOS)
    canvas = Image.new("RGB", (a.width + b.width + 8, height), (255, 255, 255))
    canvas.paste(a, (0, 0))
    canvas.paste(b, (a.width + 8, 0))
    out.parent.mkdir(parents=True, exist_ok=True)
    canvas.save(out)


def mask_iou_against(path_mask: Path, render: Path, hair_vmax: float) -> float:
    ref = np.array(Image.open(path_mask).convert("L")) > 127
    rgb = np.array(Image.open(render).convert("RGB"))
    m = hair_mask(rgb, v_max=hair_vmax) & foreground_mask_auto(rgb)
    img = Image.fromarray((m.astype(np.uint8) * 255))
    img = img.resize((ref.shape[1], ref.shape[0]), Image.NEAREST)
    m2 = np.array(img) > 127
    union = np.logical_or(ref, m2).sum()
    return float(np.logical_and(ref, m2).sum() / union) if union else 1.0


def landmark_pair(ref: Path, render: Path) -> dict:
    ref_pts, _, _ = cl.landmarks(ref)
    ren_pts, _, _ = cl.landmarks(render)
    aligned = apply_affine(ren_pts, similarity_align(ren_pts, ref_pts))
    return landmark_errors(aligned, ref_pts)


def silhouette_pair(ref: Path, render: Path, hair_vmax: float) -> float:
    ref_rgb = cs.load_rgb(ref)
    ren_rgb = cs.load_rgb(render, size=(ref_rgb.shape[1], ref_rgb.shape[0]))
    rm = cs.region_mask(ref_rgb, "face", hair_vmax, 200.0)
    om = cs.region_mask(ren_rgb, "face", hair_vmax, 200.0)
    union = np.logical_or(rm, om).sum()
    return float(np.logical_and(rm, om).sum() / union) if union else 1.0


def value_cell(v: float | None, fmt: str = "{:.2f}") -> str:
    return "—" if v is None else fmt.format(v)


def run(who: str, out_md: Path | None = None) -> dict:
    cid, prof = resolve(who)
    out_md = out_md or PROJECT / "Docs" / "qa" / f"{cid}-blender-preview.md"
    img_dir = out_md.parent / f"{cid}_blender_preview"
    rows, images, notes = [], [], []
    for view, ref_name in prof["refs"].items():
        ref = DOWNLOADS / ref_name
        render = render_path(prof, view)
        if not ref.is_file() or not render.is_file():
            rows.append((view, "—", "—", "N/A", f"缺少 {ref.name} 或 {render.name}"))
            notes.append(f"{view}: 缺图")
            continue
        pair = img_dir / f"{view}_side_by_side.png"
        side_by_side(ref, render, pair)
        images.append(f"![{view}]({cid}_blender_preview/{view}_side_by_side.png)")
        if view in ("front", "q34"):
            err = landmark_pair(ref, render)
            th = THRESHOLDS["front_mean_px" if view == "front" else "q34_mean_px"]
            rows.append((f"{view} 关键点平均误差", f"{err['mean']:.2f} px", f"≤ {th:g} px",
                         "PASS" if err["mean"] <= th else "FAIL", f"max {err['max']:.1f} / p95 {err['p95']:.1f}"))
        if view == "side":
            iou = silhouette_pair(ref, render, prof["hair_vmax"])
            th = THRESHOLDS["side_face_iou"]
            rows.append(("side 脸部剪影 IoU", value_cell(iou, "{:.3f}"), f"≥ {th:g}",
                         "PASS" if iou >= th else "FAIL", "白底前景去掉头发；临时渲染构图可能不一致"))
        if view in prof["masks"]:
            mask_path = MASKS / prof["masks"][view]
            if mask_path.is_file():
                iou = mask_iou_against(mask_path, render, prof["hair_vmax"])
                th = THRESHOLDS["hair_iou"]
                rows.append((f"{view} 头发剪影 IoU", value_cell(iou, "{:.3f}"), f"≥ {th:g}",
                             "PASS" if iou >= th else "FAIL", "对比 D7 参考头发掩码"))
            else:
                rows.append((f"{view} 头发剪影 IoU", "—", "—", "N/A", f"缺 {mask_path.name}"))
    fails = [r for r in rows if r[3] == "FAIL"]
    lines = [
        f"# {prof['label']}",
        "",
        f"- 生成：`Tools/qa/run_blender_preview_report.py {cid}`（DeepSeek D10）",
        f"- 渲染：`{WORK / 'fit'}`，`{prof['who']}_look_{{front,q34,side,back,closeup}}.png`",
        "- 性质：**临时验收**（Blender lookdev 渲染，不是 MetaHuman/UE 最终渲染；Codex 的对比相机就绪后以 `report.py` 为准）",
        f"- 结论：**{'存在 FAIL' if fails else ('全部通过' if any(r[3] == 'PASS' for r in rows) else '数据不足（N/A）')}**",
        "",
        "## PASS / FAIL 表",
        "",
        "| 视角 / 指标 | 数值 | 阈值 | 判定 | 说明 |",
        "|-------------|------|------|------|------|",
    ]
    lines += [f"| {a} | {b} | {c} | {d} | {e} |" for a, b, c, d, e in rows]
    lines += ["", "## 并排图（左=参考，右=当前渲染）", ""] + images + [""]
    if notes:
        lines += ["## 备注", ""] + [f"- {n}" for n in notes] + [""]
    lines += ["## 临时验收说明", "",
              "- 本报告用于 Claude 在 MetaHuman 交付前跟踪 Blender 阶段进度，数值只作趋势参考。",
              "- 构图/焦距/背景与参考图不完全一致时，剪影 IoU 会偏低；关键点误差受头部裁切影响。",
              ""]
    out_md.parent.mkdir(parents=True, exist_ok=True)
    out_md.write_text("\n".join(lines), encoding="utf-8")
    result = {"report": str(out_md), "rows": len(rows), "fails": len(fails)}
    print(json.dumps(result, ensure_ascii=False))
    return result


def main(argv=None) -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("who")
    ap.add_argument("--out", default=None)
    args = ap.parse_args(argv)
    run(args.who, Path(args.out).expanduser() if args.out else None)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
