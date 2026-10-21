#!/usr/bin/env python3
"""D3-3：单个角色的验收报告。

用法：report.py <id> [--render-dir DIR] [--out PATH]

id：`me2026` / `lin`（也接受 male / female 别名）。
渲染：Codex 输出到 `Saved/Compare/<id>/`，命名为 front / q34 / side / back / closeup（png）。
参考：男主 `~/Downloads/lian1,2,3,7.png` + `male_sheet.png`；女主 `lian5,6,8,7.png` + `female_sheet.png`。
阈值来自 `Docs/character-production-plan.md` 第 4 节：
  正面关键点平均误差 ≤ 3 px；3/4 视角 ≤ 8 px；侧面脸部剪影 IoU ≥ 0.95；头发剪影 IoU ≥ 0.85。
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
from metrics import difference_rgb  # noqa: E402

PROJECT = Path(__file__).resolve().parents[2]
DOWNLOADS = Path.home() / "Downloads"
THRESHOLDS = {"front_mean_px": 3.0, "q34_mean_px": 8.0, "side_face_iou": 0.95, "hair_iou": 0.85}

PROFILES = {
    "me2026": {
        "label": "男主 me2026（2026）",
        # Claude 2026-10-21 指定：front=lian1, q34=lian3, side=lian2, back/closeup=male_sheet
        "refs": {"front": "lian1.png", "q34": "lian3.png", "side": "lian2.png",
                 "back": "male_sheet.png", "closeup": "male_sheet.png"},
        "hair_vmax": 100.0,
    },
    "lin": {
        "label": "女主 lin",
        # Claude 更正（2026-10-21 第五轮）：front=lian5, q34=lian7, side=lian6；lian8 也是侧面
        "refs": {"front": "lian5.png", "q34": "lian7.png", "side": "lian6.png",
                 "back": "female_sheet.png", "closeup": "female_sheet.png"},
        "hair_vmax": 130.0,
    },
}
ALIASES = {"male": "me2026", "female": "lin"}


def find_render(folder: Path, view: str) -> Path | None:
    if not folder.is_dir():
        return None
    exact = folder / f"{view}.png"
    if exact.is_file():
        return exact
    for p in sorted(folder.glob("*.png")):
        if view.lower() in p.name.lower():
            return p
    return None


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


def masked_image(render: Path, ref: Path, region: str, hair_vmax: float, out: Path) -> None:
    ref_rgb = cs.load_rgb(ref)
    render_rgb = cs.load_rgb(render, size=(ref_rgb.shape[1], ref_rgb.shape[0]))
    rm = cs.region_mask(ref_rgb, region, hair_vmax, 200.0)
    om = cs.region_mask(render_rgb, region, hair_vmax, 200.0)
    out.parent.mkdir(parents=True, exist_ok=True)
    Image.fromarray(difference_rgb(rm, om)).save(out)


def verdict_icon(ok: bool | None) -> str:
    return "N/A" if ok is None else ("PASS" if ok else "FAIL")


def main(argv=None) -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("id")
    ap.add_argument("--render-dir", default=None)
    ap.add_argument("--out", default=None)
    args = ap.parse_args(argv)
    cid = ALIASES.get(args.id, args.id)
    if cid not in PROFILES:
        raise SystemExit(f"unknown id: {args.id} (use me2026|lin)")
    prof = PROFILES[cid]
    render_dir = Path(args.render_dir).expanduser() if args.render_dir else PROJECT / "Saved" / "Compare" / cid
    out_md = Path(args.out).expanduser() if args.out else PROJECT / "Docs" / "qa" / f"{cid}-report.md"
    img_dir = out_md.parent / cid
    rows = []      # (检查项, 数值, 阈值, 判定, 说明)
    images = []    # markdown image lines
    notes = []

    for view, ref_name in prof["refs"].items():
        ref = DOWNLOADS / ref_name
        render = find_render(render_dir, view)
        if not ref.is_file():
            notes.append(f"参考图缺失：{ref}")
            rows.append((f"{view} 参考图", "—", "—", "N/A", f"缺少 {ref}"))
            continue
        if render is None:
            rows.append((f"{view} 渲染", "—", "—", "N/A", f"缺少 {render_dir}/{view}.png（Codex 尚未输出）"))
            continue
        pair = img_dir / f"{view}_side_by_side.png"
        side_by_side(ref, render, pair)
        images.append(f"![{view}]({cid}/{view}_side_by_side.png)")
        if view in ("front", "q34"):
            ref_pts, _, ref_img = cl.landmarks(ref)
            ren_pts, _, _ = cl.landmarks(render)
            from metrics import apply_affine, similarity_align, landmark_errors
            aligned = apply_affine(ren_pts, similarity_align(ren_pts, ref_pts))
            err = landmark_errors(aligned, ref_pts)
            th = THRESHOLDS["front_mean_px" if view == "front" else "q34_mean_px"]
            ok = err["mean"] <= th
            rows.append((f"{view} 关键点平均误差", f"{err['mean']:.2f} px", f"≤ {th:g} px", verdict_icon(ok),
                         f"max {err['max']:.1f} px / p95 {err['p95']:.1f} px"))
        if view == "side":
            ref_rgb = cs.load_rgb(ref)
            render_rgb = cs.load_rgb(render, size=(ref_rgb.shape[1], ref_rgb.shape[0]))
            rm = cs.region_mask(ref_rgb, "face", prof["hair_vmax"], 200.0)
            om = cs.region_mask(render_rgb, "face", prof["hair_vmax"], 200.0)
            iou = float(np.logical_and(rm, om).sum() / max(np.logical_or(rm, om).sum(), 1))
            th = THRESHOLDS["side_face_iou"]
            rows.append(("side 脸部剪影 IoU", f"{iou:.3f}", f"≥ {th:g}", verdict_icon(iou >= th),
                         "白底前景去掉头发"))
            heat = img_dir / "side_face_diff.png"
            masked_image(render, ref, "face", prof["hair_vmax"], heat)
            images.append(f"![side face diff]({cid}/side_face_diff.png)")
        if view == "front":
            ref_rgb = cs.load_rgb(ref)
            render_rgb = cs.load_rgb(render, size=(ref_rgb.shape[1], ref_rgb.shape[0]))
            rm = cs.region_mask(ref_rgb, "hair", prof["hair_vmax"], 200.0)
            om = cs.region_mask(render_rgb, "hair", prof["hair_vmax"], 200.0)
            iou = float(np.logical_and(rm, om).sum() / max(np.logical_or(rm, om).sum(), 1))
            th = THRESHOLDS["hair_iou"]
            rows.append(("front 头发剪影 IoU", f"{iou:.3f}", f"≥ {th:g}", verdict_icon(iou >= th),
                         "暗色低饱和区域"))
            heat = img_dir / "front_hair_diff.png"
            masked_image(render, ref, "hair", prof["hair_vmax"], heat)
            images.append(f"![hair diff]({cid}/front_hair_diff.png)")
        if view in ("back", "closeup"):
            rows.append((f"{view} 并排图", "已生成", "人工检查", "N/A", "背面/特写以人工确认为准"))

    fails = [r for r in rows if r[3] == "FAIL"]
    lines = [
        f"# {prof['label']} 验收报告",
        "",
        f"- 生成：`Tools/qa/report.py {cid}`（DeepSeek D3）",
        f"- 渲染目录：`{render_dir}`",
        f"- 阈值来源：`Docs/character-production-plan.md` 第 4 节",
        f"- 结论：**{'全部通过' if not fails and any(r[3]=='PASS' for r in rows) else ('存在 FAIL' if fails else '数据不足（N/A）')}**",
        "",
        "## PASS / FAIL 表",
        "",
        "| 检查项 | 数值 | 阈值 | 判定 | 说明 |",
        "|--------|------|------|------|------|",
    ]
    lines += [f"| {a} | {b} | {c} | {d} | {e} |" for a, b, c, d, e in rows]
    lines += ["", "## 并排图与差异图", ""] + images + [""]
    if notes:
        lines += ["## 备注", ""] + [f"- {n}" for n in notes] + [""]
    lines += ["## 人工检查项（未自动判定）", "",
              "- [ ] 发丝是否有碎片/发片边缘", "- [ ] 眼睛高光与虹膜质感", "- [ ] 牙齿与口腔",
              "- [ ] 表情极值（眨眼/张嘴/微笑）", "- [ ] 布料自交与穿模", "- [ ] LOD 远近切换",
              "- [ ] 1440p Lumen 下单英雄 LOD0 ≤ 2.5 ms GPU", ""]
    out_md.parent.mkdir(parents=True, exist_ok=True)
    out_md.write_text("\n".join(lines), encoding="utf-8")
    print(json.dumps({"report": str(out_md), "rows": len(rows), "fails": len(fails)}, ensure_ascii=False))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
