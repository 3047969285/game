#!/usr/bin/env python3
"""D18：全员验收看板 → Docs/qa/dashboard.md（+ Docs/qa/history.csv 历史趋势）。

覆盖 7 个角色；主角比参考照片，配角只比目标网格 vs MHC（+ 比例定性）。
用法：dashboard.py [--out PATH] [--no-history]
"""
from __future__ import annotations

import argparse
import csv
import datetime as dt
import json
import sys
from pathlib import Path

import numpy as np
from PIL import Image

sys.path.insert(0, str(Path(__file__).resolve().parent))
import conform_report as cr  # noqa: E402
from metrics import foreground_mask_auto, hair_mask  # noqa: E402

PROJECT = Path(__file__).resolve().parents[2]
CHARACTERS = ["me2026", "lin", "mei", "an", "rui", "organizer", "old2090"]
PROTAGONISTS = {"me2026": "male", "lin": "female"}
VIEWS = ["front", "q34", "side", "back", "closeup"]
THRESHOLDS = {"front": 3.0, "q34": 8.0, "side_iou": 0.95, "hair_iou": 0.85}
HISTORY = PROJECT / "Docs" / "qa" / "history.csv"
HISTORY_FIELDS = ["timestamp", "id", "front_px", "q34_px", "side_px", "face_iou", "hair_iou",
                  "photo_target_px", "target_mhc_px", "verdict"]
NUMERIC = ["front_px", "q34_px", "side_px", "face_iou", "hair_iou", "photo_target_px", "target_mhc_px"]
LOWER_BETTER = {"front_px": True, "q34_px": True, "side_px": True, "face_iou": False,
                "hair_iou": False, "photo_target_px": True, "target_mhc_px": True}


def log(m):
    print("[D18]", m, flush=True)


def ratio_metrics(landmarks_pts):
    """配角定性比例：脸长宽比、眼距/脸宽、鼻宽/脸宽（用 468 点像素坐标）。"""
    pts = np.asarray(landmarks_pts)
    xs, ys = pts[:, 0], pts[:, 1]
    face_w = max(xs.max() - xs.min(), 1e-6)
    face_h = max(ys.max() - ys.min(), 1e-6)
    left_eye = pts[[33, 133]].mean(axis=0)
    right_eye = pts[[362, 263]].mean(axis=0)
    eye_dist = float(np.linalg.norm(left_eye - right_eye))
    nose_w = float(abs(pts[129][0] - pts[358][0]))
    return {"aspect": face_h / face_w, "eye_spacing": eye_dist / face_w, "nose_width": nose_w / face_w}


def collect_character(cid: str) -> dict:
    base = PROJECT / "Saved" / "Compare" / cid
    out = {"id": cid, "renders": {}, "target": {}, "landmarks": {}, "hull_iou": {},
           "hair_iou": {}, "ratios": {}, "photo_target": {}, "timestamp": None, "notes": []}
    cap = base / "capture.json"
    if not cap.is_file():
        out["notes"].append("无 capture.json（Codex 渲染未完成）")
        return out
    mtimes = []
    for view in VIEWS:
        render, target = base / f"{view}.png", base / f"target_{view}.png"
        if render.is_file():
            out["renders"][view] = render
            mtimes.append(render.stat().st_mtime)
        if target.is_file():
            out["target"][view] = target
    if mtimes:
        out["timestamp"] = dt.datetime.fromtimestamp(max(mtimes)).strftime("%Y-%m-%d %H:%M")
    for view in VIEWS:
        r, t = out["renders"].get(view), out["target"].get(view)
        if not (r and t):
            continue
        try:
            lm = cr.landmark_compare(t, r)  # target 为参考：MHC 向 target 对齐
            out["landmarks"][view] = lm
            ref_pts, _, _ = cr.cl.landmarks(t)
            out_pts, _, _ = cr.cl.landmarks(r)
            from metrics import apply_affine, similarity_align
            aligned = apply_affine(out_pts, similarity_align(out_pts, ref_pts))
            shape = np.array(Image.open(t).convert("RGB")).shape[:2]
            out["hull_iou"][view] = cr.iou(cr.hull_mask(ref_pts, shape), cr.hull_mask(aligned, shape))
            out["ratios"][view] = {
                "target": ratio_metrics(ref_pts),
                "mhc": ratio_metrics(aligned),
            }
        except SystemExit as exc:
            out["notes"].append(f"{view}: 关键点检测失败 {exc}")
    # 主角：照片→目标网格 误差
    if cid in cr.REF_FILES:
        for view, ref_name in cr.REF_FILES[cid].items():
            ref = cr.DOWNLOADS / ref_name
            t = out["target"].get(view)
            if ref.is_file() and t:
                try:
                    out["photo_target"][view] = cr.landmark_compare(ref, t)["mean"]
                except SystemExit:
                    pass
    # 主角：头发 IoU（渲染 vs D7 参考掩码）；当前 MHC 预览是"皮肤、无头发"时跳过并标注
    front_render = out["renders"].get("front")
    if front_render:
        rgb = np.array(Image.open(front_render).convert("RGB"))
        hair_px = int((hair_mask(rgb, v_max=100.0 if cid == "me2026" else 130.0) & foreground_mask_auto(rgb)).sum())
        if hair_px < 0.005 * rgb.shape[0] * rgb.shape[1]:
            out["notes"].append("当前渲染为皮肤预览（无头发），头发 IoU 跳过")
            return out
    for view in ("front", "side"):
        mask_path = PROJECT / "Docs" / "qa" / "ref_masks" / f"{cid}_{view}.png"
        render = out["renders"].get(view)
        if mask_path.is_file() and render:
            ref = np.array(Image.open(mask_path).convert("L")) > 127
            rgb = np.array(Image.open(render).convert("RGB"))
            vmax = 100.0 if cid == "me2026" else 130.0
            m = hair_mask(rgb, v_max=vmax) & foreground_mask_auto(rgb)
            m = np.array(Image.fromarray((m.astype(np.uint8) * 255)).resize((ref.shape[1], ref.shape[0]), Image.NEAREST)) > 127
            ref_ratio, out_ratio = float(ref.mean()), float(m.mean())
            if abs(out_ratio - ref_ratio) / max(ref_ratio, 1e-6) > 0.5:
                out["notes"].append(f"{view}: 渲染头发面积与参考差太多（{out_ratio:.1%} vs {ref_ratio:.1%}，可能是发片/皮肤预览），头发 IoU 跳过")
                continue
            union = np.logical_or(ref, m).sum()
            out["hair_iou"][view] = float(np.logical_and(ref, m).sum() / union) if union else 1.0
    return out


def verdict(row: dict) -> str:
    front = row["metrics"].get("front_px")
    q34 = row["metrics"].get("q34_px")
    side = row["metrics"].get("face_iou")
    hair = row["metrics"].get("hair_iou")
    checks = []
    if front is not None: checks.append(front <= THRESHOLDS["front"])
    if q34 is not None: checks.append(q34 <= THRESHOLDS["q34"])
    if side is not None: checks.append(side >= THRESHOLDS["side_iou"])
    if hair is not None: checks.append(hair >= THRESHOLDS["hair_iou"])
    if not checks:
        return "N/A"
    return "PASS" if all(checks) else "FAIL"


def row_from_character(ch: dict) -> dict:
    cid = ch["id"]
    m = {}
    for view in ("front", "q34", "side"):
        lm = ch["landmarks"].get(view)
        if lm:
            m[f"{view}_px"] = lm["mean"]
    face_iou = next((ch["hull_iou"][v] for v in ("side", "q34", "front") if v in ch["hull_iou"]), None)
    if face_iou is not None:
        m["face_iou"] = face_iou
    if "front" in ch["hair_iou"]:
        m["hair_iou"] = ch["hair_iou"]["front"]
    # 拟合误差拆分（front 视角）
    if ch["photo_target"].get("front") is not None:
        m["photo_target_px"] = ch["photo_target"]["front"]
    if ch["landmarks"].get("front"):
        m["target_mhc_px"] = ch["landmarks"]["front"]["mean"]
    return {"id": cid, "metrics": m, "timestamp": ch["timestamp"], "raw": ch}


def fmt(v, nd=2):
    return "—" if v is None else (f"{v:.{nd}f}" if isinstance(v, float) else str(v))


def previous_rows(history_path: Path) -> dict:
    latest = {}
    if not history_path.is_file():
        return latest
    with history_path.open(encoding="utf-8-sig", newline="") as fh:
        for row in csv.DictReader(fh):
            latest[row["id"]] = row
    return latest


def trend(cur, prev, key) -> str:
    if prev is None or cur is None or prev.get(key) in (None, "", "—"):
        return "—"
    try:
        a, b = float(cur), float(prev[key])
    except (TypeError, ValueError):
        return "—"
    if abs(a - b) < 1e-6:
        return "持平"
    better = (a < b) if LOWER_BETTER.get(key, True) else (a > b)
    return "变好" if better else "变差"


def append_history(rows: list[dict], path: Path = HISTORY) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    new_file = not path.is_file()
    with path.open("a", encoding="utf-8-sig", newline="") as fh:
        w = csv.DictWriter(fh, fieldnames=HISTORY_FIELDS)
        if new_file:
            w.writeheader()
        for r in rows:
            w.writerow({"timestamp": r["timestamp"] or "", "id": r["id"],
                        "front_px": r["metrics"].get("front_px", ""),
                        "q34_px": r["metrics"].get("q34_px", ""),
                        "side_px": r["metrics"].get("side_px", ""),
                        "face_iou": r["metrics"].get("face_iou", ""),
                        "hair_iou": r["metrics"].get("hair_iou", ""),
                        "photo_target_px": r["metrics"].get("photo_target_px", ""),
                        "target_mhc_px": r["metrics"].get("target_mhc_px", ""),
                        "verdict": r["verdict"]})


def build_rows(chars: list[dict]) -> list[dict]:
    rows = [row_from_character(c) for c in chars]
    for r in rows:
        r["verdict"] = verdict(r)
    return rows


def render_markdown(rows: list[dict], prev: dict, generated: str) -> str:
    lines = ["# 全员验收看板（D18）", "",
             f"- 生成：`Tools/qa/dashboard.py` · {generated}",
             "- 阈值：正面关键点 ≤ 3 px、3/4 ≤ 8 px、侧面脸部剪影 IoU ≥ 0.95、头发 IoU ≥ 0.85",
             "- 主角比参考照片；配角只比「目标网格 vs MHC」+ 关键点比例（无参考照片）。",
             "- 缺失数据一律 N/A，不估算。", ""]
    # 总览
    lines += ["## 1. 总览", "",
              "| 角色 | 状态 | front px | q34 px | side px | 脸部 IoU | 头发 IoU | 照片→目标 | 目标→MHC | 渲染时间 | 趋势 |",
              "|------|------|----------|--------|---------|----------|----------|-----------|----------|----------|------|"]
    for r in rows:
        m, p = r["metrics"], prev.get(r["id"])
        trend_txt = " / ".join(f"{k}:{trend(m.get(k), p, k)}" for k in ("front_px", "face_iou", "hair_iou")) if p else "—"
        lines.append(f"| {r['id']} | {r['verdict']} | {fmt(m.get('front_px'))} | {fmt(m.get('q34_px'))} | "
                     f"{fmt(m.get('side_px'))} | {fmt(m.get('face_iou'), 3)} | {fmt(m.get('hair_iou'), 3)} | "
                     f"{fmt(m.get('photo_target_px'))} | {fmt(m.get('target_mhc_px'))} | {r['timestamp'] or '—'} | {trend_txt} |")
    # 逐角色细节
    lines += ["", "## 2. 逐角色", ""]
    for r in rows:
        ch = r["raw"]
        lines += [f"### {r['id']}（{r['verdict']}）", ""]
        if ch["notes"]:
            lines += ["- 备注：" + "；".join(ch["notes"]), ""]
        if not ch["landmarks"] and not ch["renders"]:
            lines += ["N/A —— Codex 尚未渲染。", ""]
            continue
        lines += ["| 视图 | 关键点均值 px | 脸部 IoU | 比例（target: 长宽/眼距/鼻宽 → MHC） |",
                  "|------|----------------|----------|----------------------------------------|"]
        for view in VIEWS:
            lm = ch["landmarks"].get(view)
            iou_v = ch["hull_iou"].get(view)
            ratio = ch["ratios"].get(view)
            ratio_txt = "—"
            if ratio:
                rt, rm = ratio["target"], ratio["mhc"]
                ratio_txt = (f"{rt['aspect']:.2f}/{rt['eye_spacing']:.2f}/{rt['nose_width']:.2f} → "
                             f"{rm['aspect']:.2f}/{rm['eye_spacing']:.2f}/{rm['nose_width']:.2f}")
            lines.append(f"| {view} | {fmt(lm['mean'] if lm else None)} | {fmt(iou_v, 3)} | {ratio_txt} |")
        lines.append("")
        if r["id"] in ("me2026", "lin"):
            split = ch["photo_target"]
            lines += [f"- 拟合误差拆分：照片→目标网格 {fmt(split.get('front'))} px（front）；"
                      f"目标网格→MetaHuman {fmt(r['metrics'].get('target_mhc_px'))} px（front）",
                      f"- 头发 IoU：front {fmt(ch['hair_iou'].get('front'), 3)} / side {fmt(ch['hair_iou'].get('side'), 3)}", ""]
    # 历史趋势
    lines += ["## 3. 历史趋势", "", f"历史写入 `Docs/qa/history.csv`（每次运行追加）。", ""]
    if prev:
        lines += ["| 角色 | 上次 front px | 本次 front px | 上次脸部 IoU | 本次脸部 IoU | 结论 |",
                  "|------|----------------|----------------|--------------|--------------|------|"]
        for r in rows:
            p = prev.get(r["id"])
            if not p:
                continue
            lines.append(f"| {r['id']} | {p.get('front_px') or '—'} | {fmt(r['metrics'].get('front_px'))} | "
                         f"{p.get('face_iou') or '—'} | {fmt(r['metrics'].get('face_iou'), 3)} | "
                         f"{trend(r['metrics'].get('front_px'), p, 'front_px')} |")
    else:
        lines += ["首次运行，暂无历史对比。"]
    lines.append("")
    return "\n".join(lines)


def run(out: Path | None = None, write_history: bool = True) -> dict:
    chars = []
    for cid in CHARACTERS:
        try:
            chars.append(collect_character(cid))
        except Exception as exc:  # noqa: BLE001
            log(f"{cid} collect failed: {exc}")
            chars.append({"id": cid, "renders": {}, "target": {}, "landmarks": {}, "hull_iou": {},
                          "hair_iou": {}, "ratios": {}, "photo_target": {}, "timestamp": None,
                          "notes": [f"采集失败: {exc}"]})
    rows = build_rows(chars)
    prev = previous_rows(HISTORY)
    generated = dt.datetime.now().strftime("%Y-%m-%d %H:%M")
    out = out or PROJECT / "Docs" / "qa" / "dashboard.md"
    out.parent.mkdir(parents=True, exist_ok=True)
    out.write_text(render_markdown(rows, prev, generated), encoding="utf-8")
    if write_history:
        append_history(rows)
    summary = {"dashboard": str(out), "rows": {r["id"]: r["verdict"] for r in rows}}
    print(json.dumps(summary, ensure_ascii=False))
    return summary


def main(argv=None) -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--out", default=None)
    ap.add_argument("--no-history", action="store_true")
    args = ap.parse_args(argv)
    run(Path(args.out).expanduser() if args.out else None, not args.no_history)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
