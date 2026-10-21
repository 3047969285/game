#!/usr/bin/env python3
"""D15-2：拟合误差诊断 —— 目标网格（Blender target_*）vs MetaHuman（MHC 渲染）。

用法：conform_report.py <id>

输出 Docs/qa/<id>-conform-diff.md：
  - 每视图：关键点分区误差（MediaPipe）、脸部/头部剪影 IoU、差异热图、颈部左右不对称
  - 分段结论：照片→目标网格（D11 参考对比）vs 目标网格→MetaHuman（本次 target vs MHC）
"""
from __future__ import annotations

import argparse
import json
import sys
from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw

sys.path.insert(0, str(Path(__file__).resolve().parent))
import compare_landmarks as cl  # noqa: E402
from metrics import (apply_affine, difference_rgb, foreground_mask_auto,  # noqa: E402
                     landmark_errors, similarity_align)

PROJECT = Path(__file__).resolve().parents[2]
DOWNLOADS = Path.home() / "Downloads"
REGIONS = ["left_eye", "right_eye", "brows", "nose", "mouth", "contour"]
VIEWS = ["front", "q34", "side", "back", "closeup"]
REF_FILES = {
    "me2026": {"front": "lian1.png", "q34": "lian3.png", "side": "lian2.png"},
    "lin": {"front": "lian5.png", "q34": "lian7.png", "side": "lian6.png"},
}


def log(msg):
    print("[D15]", msg, flush=True)


def side_by_side(a: Path, b: Path, out: Path, height: int = 640) -> None:
    ia = Image.open(a).convert("RGB")
    ib = Image.open(b).convert("RGB")
    ia = ia.resize((int(ia.width * height / ia.height), height), Image.LANCZOS)
    ib = ib.resize((int(ib.width * height / ib.height), height), Image.LANCZOS)
    canvas = Image.new("RGB", (ia.width + ib.width + 8, height), (255, 255, 255))
    canvas.paste(ia, (0, 0))
    canvas.paste(ib, (ia.width + 8, 0))
    out.parent.mkdir(parents=True, exist_ok=True)
    canvas.save(out)


def landmark_compare(ref: Path, out: Path) -> dict:
    ref_pts, _, _ = cl.landmarks(ref)
    out_pts, _, _ = cl.landmarks(out)
    aligned = apply_affine(out_pts, similarity_align(out_pts, ref_pts))
    return landmark_errors(aligned, ref_pts)


def hull_mask(points, shape) -> np.ndarray:
    """468 关键点凸包填充为面部轮廓掩码（不依赖背景色，适合灰底/HDRI 渲染）。"""
    from scipy.spatial import ConvexHull
    from PIL import ImageDraw
    pts = np.asarray(points, dtype=np.float64)
    img = Image.new("L", (shape[1], shape[0]), 0)
    try:
        hull = ConvexHull(pts)
        poly = [tuple(pts[i]) for i in hull.vertices]
        ImageDraw.Draw(img).polygon(poly, fill=255)
        m = np.array(img) > 127
        # 轻微膨胀 2px，抵消轮廓点与皮肤边缘的差
        try:
            from scipy import ndimage
            m = ndimage.binary_dilation(m, iterations=2)
        except Exception:
            pass
        return m
    except Exception:
        return np.array(img) > 127


def mask_pair(a: Path, b: Path):
    ia = np.array(Image.open(a).convert("RGB"))
    ib = np.array(Image.open(b).convert("RGB"))
    if ia.shape != ib.shape:
        ib = np.array(Image.fromarray(ib).resize((ia.shape[1], ia.shape[0]), Image.LANCZOS))
    return foreground_mask_auto(ia), foreground_mask_auto(ib)


def iou(a, b) -> float:
    u = np.logical_or(a, b).sum()
    return float(np.logical_and(a, b).sum() / u) if u else 1.0


def lower_asymmetry(mask: np.ndarray) -> float:
    """头部下半区（下颌/颈）左右宽度差相对值：|left-right|/max。"""
    ys = np.where(mask.any(axis=1))[0]
    if len(ys) < 10:
        return 0.0
    y0, y1 = int(ys.min()), int(ys.max())
    band = mask[int(y0 + 0.62 * (y1 - y0)):int(y0 + 0.85 * (y1 - y0))]
    if band.size == 0:
        return 0.0
    cols = np.where(mask.any(axis=0))[0]
    cx = (float(cols.min()) + float(cols.max())) / 2.0 if len(cols) else band.shape[1] / 2.0
    left = [(np.where(row[: int(cx)])[0]) for row in band]
    right = [(np.where(row[int(cx):])[0] + int(cx)) for row in band]
    lw = [cx - r[0] for r in left if len(r)]
    rw = [r[-1] - cx for r in right if len(r)]
    if not lw or not rw:
        return 0.0
    l, r = float(np.mean(lw)), float(np.mean(rw))
    return abs(l - r) / max(l, r, 1.0)


def diagnose(regions: dict, face_iou: float, asym: float) -> list[str]:
    tips = []
    overall = max(regions.get("mean", 0.0), 1e-6)
    ranked = sorted(((regions.get(k, {}).get("mean", 0.0), k) for k in REGIONS), reverse=True)
    labels = {"mouth": "嘴部（唇形/张口/唇厚）", "nose": "鼻部（鼻梁高度/鼻翼宽度）",
              "contour": "下颌/脸廓/下巴", "brows": "眉区（眉骨/眉形）",
              "left_eye": "左眼（眼型/眼距）", "right_eye": "右眼（眼型/眼距）"}
    for val, key in ranked[:2]:
        if val > max(3.0, 1.4 * overall):
            tips.append(f"{labels[key]} 偏差最大：{val:.1f} px（整体 {overall:.1f} px）")
    if mouth_open_score(regions) > 1.0:
        tips.append("嘴部垂直误差明显 → 可能张嘴露牙/唇缝位置偏移")
    if face_iou < 0.90:
        tips.append(f"头部轮廓 IoU 仅 {face_iou:.3f} → 头型/脸宽或颈部轮廓不一致（注意本渲染无头发，轮廓会偏小）")
    if asym > 0.06:
        tips.append(f"下颌/颈部左右宽度差 {asym*100:.1f}% → 颈部扭转或下颌不对称")
    if not tips:
        tips.append("各区域偏差接近，未见明显局部塌陷")
    return tips


def mouth_open_score(regions: dict) -> float:
    """用嘴区垂直位移代理：嘴区误差 / 整体误差。"""
    return regions.get("mouth", {}).get("mean", 0.0) / max(regions.get("mean", 1.0), 1e-6)


def collect(cid: str) -> dict:
    base = PROJECT / "Saved" / "Compare" / cid
    cap = base / "capture.json"
    capture = json.loads(cap.read_text(encoding="utf-8")) if cap.is_file() else {}
    img_dir = PROJECT / "Docs" / "qa" / f"{cid}_conform"
    views = {}
    for view in VIEWS:
        target = base / f"target_{view}.png"
        mhc = base / f"{view}.png"
        if not target.is_file() or not mhc.is_file():
            views[view] = {"status": "N/A", "reason": f"缺 {target.name} 或 {mhc.name}"}
            continue
        entry = {"status": "OK"}
        try:
            entry["landmarks"] = landmark_compare(target, mhc)
        except SystemExit as exc:
            entry["landmarks"] = None
            entry["landmark_error"] = str(exc)
        # 剪影：用关键点凸包（对灰底/HDRI 渲染稳定）；检测失败再退回背景分割
        if entry.get("landmarks"):
            ref_pts, _, _ = cl.landmarks(target)
            out_pts, _, _ = cl.landmarks(mhc)
            aligned = apply_affine(out_pts, similarity_align(out_pts, ref_pts))
            from PIL import Image as _Im
            shape = np.array(_Im.open(target).convert("RGB")).shape[:2]
            tm = hull_mask(ref_pts, shape)
            mm = hull_mask(aligned, shape)
        else:
            tm, mm = mask_pair(target, mhc)
        entry["face_iou"] = iou(tm, mm)
        entry["asymmetry"] = lower_asymmetry(mm)
        heat = img_dir / f"{view}_mask_diff.png"
        img_dir.mkdir(parents=True, exist_ok=True)
        Image.fromarray(difference_rgb(tm, mm)).save(heat)
        entry["heatmap"] = heat
        pair = img_dir / f"{view}_target_vs_mhc.png"
        side_by_side(target, mhc, pair)
        entry["pair"] = pair
        if entry.get("landmarks"):
            entry["diagnosis"] = diagnose(entry["landmarks"], entry["face_iou"], entry["asymmetry"])
        views[view] = entry
    # 分段：照片→目标网格（参考 vs target）
    ref_stage = {}
    for view, ref_name in REF_FILES.get(cid, {}).items():
        ref = DOWNLOADS / ref_name
        target = base / f"target_{view}.png"
        if ref.is_file() and target.is_file():
            try:
                ref_stage[view] = landmark_compare(ref, target)
            except SystemExit as exc:
                ref_stage[view] = {"error": str(exc)}
    return {"views": views, "ref_to_target": ref_stage, "capture": capture}


def region_table(landmarks: dict) -> list[str]:
    lines = ["| 区域 | 平均误差 (px) | 最大误差 (px) |", "|------|---------------|---------------|"]
    for key in REGIONS:
        if key in landmarks:
            lines.append(f"| {key} | {landmarks[key]['mean']:.2f} | {landmarks[key]['max']:.2f} |")
    lines.append(f"| **整体** | **{landmarks['mean']:.2f}** | **{landmarks['max']:.2f}** |")
    return lines


def write_report(cid: str, data: dict, out_md: Path) -> Path:
    img_dir = PROJECT / "Docs" / "qa" / f"{cid}_conform"
    lines = [
        f"# {cid} 拟合误差诊断（目标网格 vs MetaHuman / MHC）",
        "",
        "- 生成：`Tools/qa/conform_report.py`（DeepSeek D15）",
        "- 目标网格渲染：`Tools/qa/render_target_like_ue.py`（Blender，正弦相机参数来自 `Saved/Compare/<id>/capture.json`）",
        "- MHC 渲染：Codex `ue_render_compare.py` 输出（皮肤预览、无头发/服装）",
        "- 对齐：MediaPipe 468 点（MHC 侧做相似变换到 target 坐标系）+ 前景剪影",
        "",
        "## 1. 分段结论（误差来自哪一段）",
        "",
    ]
    ref_stage = data["ref_to_target"]
    target_stage = {v: e.get("landmarks") for v, e in data["views"].items() if e.get("landmarks")}
    for view in ("front", "q34", "side"):
        a = ref_stage.get(view)
        b = target_stage.get(view)
        if a and "mean" in a and b:
            lines.append(f"- **{view}**：照片→目标网格 {a['mean']:.2f} px；目标网格→MetaHuman {b['mean']:.2f} px")
        else:
            lines.append(f"- **{view}**：分段数据不足（参考/target/MHC 至少缺一项）")
    lines += ["", "## 2. 各视图指标", ""]
    for view in VIEWS:
        e = data["views"][view]
        lines += [f"### {view}", ""]
        if e["status"] != "OK":
            lines += [f"N/A —— {e['reason']}", ""]
            continue
        lm = e.get("landmarks")
        if lm:
            lines += region_table(lm) + [""]
        lines += [f"- 头部剪影 IoU：**{e['face_iou']:.3f}**",
                  f"- 下颌/颈部左右不对称：**{e['asymmetry']*100:.1f}%**",
                  f"- 并排图：`{cid}_conform/{view}_target_vs_mhc.png`",
                  f"- 差异热图：`{cid}_conform/{view}_mask_diff.png`", ""]
        if e.get("diagnosis"):
            lines += ["**诊断：**"] + [f"- {t}" for t in e["diagnosis"]] + [""]
    lines += ["## 3. 建议", "",
              "- 若「照片→目标网格」误差大：先修 Blender 拟合（`fit_face.py` 的关键点/轮廓）。",
              "- 若「目标网格→MetaHuman」误差大：修 MetaHuman 拟合（conform from mesh 后的脸型、眼/鼻/嘴、颈部权重）。",
              "- 本报告中的 MHC 预览为**皮肤+无头发**，轮廓类指标（head silhouette）会系统性偏小，解读时以关键点分区为主。",
              ""]
    out_md.parent.mkdir(parents=True, exist_ok=True)
    out_md.write_text("\n".join(lines), encoding="utf-8")
    return out_md


def main(argv=None) -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("id")
    ap.add_argument("--out", default=None)
    args = ap.parse_args(argv)
    cid = {"male": "me2026", "female": "lin"}.get(args.id, args.id)
    data = collect(cid)
    out = Path(args.out).expanduser() if args.out else PROJECT / "Docs" / "qa" / f"{cid}-conform-diff.md"
    write_report(cid, data, out)
    ok = sum(1 for v in data["views"].values() if v["status"] == "OK")
    print(json.dumps({"report": str(out), "views_compared": ok}, ensure_ascii=False))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
