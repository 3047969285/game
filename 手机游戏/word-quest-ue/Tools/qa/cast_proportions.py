#!/usr/bin/env python3
"""D19：配角（及主角校准）脸部比例测量 —— 从 MHC 渲染 + MediaPipe 468 点算比例。

用法：cast_proportions.py [--out Docs/qa/cast-proportions.json] [ids...]

输出比例（以脸宽/脸长为基准）：
  face_lw          脸长 / 脸宽（颧骨）
  forehead_ratio   额头高（10→眉线）/ 脸长
  eye_width_ratio  单眼宽 / 脸宽
  eye_spacing_ratio 内眼角间距 / 脸宽
  nose_width_ratio 鼻翼宽 / 脸宽
  mouth_width_ratio 嘴角宽 / 脸宽
  jaw_cheek_ratio  下颌宽 / 颧骨宽
  chin_protrusion  侧面下巴突出度（相对鼻下点-下唇连线，/脸长）
"""
from __future__ import annotations

import argparse
import json
import sys
from pathlib import Path

import numpy as np

sys.path.insert(0, str(Path(__file__).resolve().parent))
import compare_landmarks as cl  # noqa: E402
from metrics import foreground_mask_auto  # noqa: E402
from PIL import Image  # noqa: E402

PROJECT = Path(__file__).resolve().parents[2]
CAST_IDS = ["mei", "an", "rui", "organizer", "old2090"]
PROTAGONISTS = ["me2026", "lin"]

# 关键点索引（MediaPipe FaceMesh 468）
IDX = {
    "forehead_top": 10, "chin": 152, "cheek_l": 234, "cheek_r": 454,
    "jaw_l": 58, "jaw_r": 288,
    "eye_l_outer": 33, "eye_l_inner": 133, "eye_r_inner": 362, "eye_r_outer": 263,
    "brow_l": 105, "brow_r": 334, "brow_l2": 107, "brow_r2": 336,
    "nose_l": 129, "nose_r": 358, "mouth_l": 61, "mouth_r": 291,
    "nose_tip": 1, "nose_base": 2, "lower_lip": 17,
}


def d(a, b):
    return float(np.linalg.norm(np.asarray(a, dtype=float) - np.asarray(b, dtype=float)))


def proportions_from_points(pts) -> dict:
    """front 视角比例（pts 为 468×(x,y) 像素坐标）。"""
    P = {k: np.asarray(pts[i], dtype=float) for k, i in IDX.items()}
    face_w = d(P["cheek_l"], P["cheek_r"])
    face_len = d(P["forehead_top"], P["chin"])
    brow_y = float(np.mean([P["brow_l"][1], P["brow_r"][1], P["brow_l2"][1], P["brow_r2"][1]]))
    forehead = abs(float(P["forehead_top"][1]) - brow_y)
    eye_w = (d(P["eye_l_outer"], P["eye_l_inner"]) + d(P["eye_r_outer"], P["eye_r_inner"])) / 2.0
    eye_space = d(P["eye_l_inner"], P["eye_r_inner"])
    nose_w = d(P["nose_l"], P["nose_r"])
    mouth_w = d(P["mouth_l"], P["mouth_r"])
    jaw_w = d(P["jaw_l"], P["jaw_r"])
    return {
        "face_width_px": round(face_w, 1),
        "face_length_px": round(face_len, 1),
        "face_lw": round(face_len / max(face_w, 1e-6), 4),
        "forehead_ratio": round(forehead / max(face_len, 1e-6), 4),
        "eye_width_ratio": round(eye_w / max(face_w, 1e-6), 4),
        "eye_spacing_ratio": round(eye_space / max(face_w, 1e-6), 4),
        "nose_width_ratio": round(nose_w / max(face_w, 1e-6), 4),
        "mouth_width_ratio": round(mouth_w / max(face_w, 1e-6), 4),
        "jaw_cheek_ratio": round(jaw_w / max(face_w, 1e-6), 4),
    }


def chin_protrusion_side(pts) -> float:
    """侧面下巴突出度：下巴相对「鼻下点-下唇」连线的水平偏移 / 脸长；正值=向前突出。"""
    P = {k: np.asarray(pts[i], dtype=float) for k, i in IDX.items()}
    nb, ll, chin = P["nose_base"], P["lower_lip"], P["chin"]
    face_len = d(P["forehead_top"], chin)
    if abs(ll[1] - nb[1]) < 1e-6:
        return 0.0
    t = (chin[1] - nb[1]) / (ll[1] - nb[1])
    x_line = nb[0] + t * (ll[0] - nb[0])
    forward = 1.0 if P["nose_tip"][0] >= chin[0] else -1.0
    return round(float((chin[0] - x_line) * forward / max(face_len, 1e-6)), 4)


def crown_ratio(pts, mask) -> float:
    """额顶关键点(10) 到头顶剪影的距离 / 脸长 —— 量化“颅顶过高”。"""
    ys = np.where(mask.any(axis=1))[0]
    if len(ys) == 0:
        return 0.0
    y_top = float(ys.min())
    face_len = d(pts[IDX["forehead_top"]], pts[IDX["chin"]])
    return round((float(pts[IDX["forehead_top"]][1]) - y_top) / max(face_len, 1e-6), 4)


def head_silhouette_metrics(pts, mask) -> dict:
    """颅顶/额头：用剪影顶 + 下巴/眉线关键点（不依赖 10 号点位置）。
    head_aspect = 头高（剪影顶→下巴）/ 脸宽；forehead_visible = 眉线以上 / 头高。
    """
    ys = np.where(mask.any(axis=1))[0]
    if len(ys) == 0:
        return {}
    top = float(ys.min())
    chin_y = float(pts[IDX["chin"]][1])
    brow_y = float(np.mean([pts[IDX["brow_l"]][1], pts[IDX["brow_r"]][1],
                            pts[IDX["brow_l2"]][1], pts[IDX["brow_r2"]][1]]))
    face_w = d(pts[IDX["cheek_l"]], pts[IDX["cheek_r"]])
    head_h = max(1.0, chin_y - top)
    return {
        "head_aspect": round(head_h / max(face_w, 1e-6), 4),
        "forehead_visible": round((brow_y - top) / head_h, 4),
    }


def side_profile_metrics(mask) -> dict:
    """侧面剪影指标（profile 图 MediaPipe 常检测失败，改用剪影几何）：
    - head_height_px: 头顶→颈部最窄处（近似下颌下缘）
    - nose_chin_delta: (下巴前缘 − 鼻尖前缘)/头高；正值=下巴比鼻尖更靠后（后缩）
    - neck_depth_ratio: 颈部最窄处前后宽 / 头高（越大越厚）
    - upper_head_ratio: 鼻尖以上高度 / 头高（颅顶/额部比例）
    """
    ys = np.where(mask.any(axis=1))[0]
    if len(ys) == 0:
        return {}
    y0 = int(ys.min())
    widths = []
    for y in range(y0, mask.shape[0]):
        xs = np.where(mask[y])[0]
        if len(xs):
            widths.append((y, int(xs.max() - xs.min()), int(xs.min()), int(xs.max())))
    if not widths:
        return {}
    ear_row, ear_w = max(((y, w) for y, w, _, _ in widths if y < y0 + 0.75 * (widths[-1][0] - y0)),
                         key=lambda t: t[1])
    # 耳朵/颧骨之后找颈部最窄（先下降再上升）
    neck_row, neck_w = None, None
    for y, w, _, _ in widths:
        if y <= ear_row + 0.05 * (widths[-1][0] - y0):
            continue
        if w < 0.72 * ear_w:
            neck_row, neck_w = y, w
            break
    if neck_row is None:
        neck_row, neck_w = widths[-1][0], widths[-1][1]
    head_h = max(1, neck_row - y0)
    def fwd(y):
        xs = np.where(mask[y])[0]
        return float(xs.min()) if len(xs) else None
    nose_row = None
    best = 1e9
    for y, w, x_min, x_max in widths:
        if y0 + 0.28 * head_h < y < y0 + 0.60 * head_h and x_min < best:
            best, nose_row = x_min, y
    chin_row = int(y0 + 0.88 * head_h)
    nose_x, chin_x = fwd(nose_row or y0), fwd(chin_row)
    return {
        "head_height_px": int(head_h),
        "nose_chin_delta": round(((chin_x - nose_x) / head_h) if (nose_x is not None and chin_x is not None) else 0.0, 4),
        "neck_depth_ratio": round(neck_w / head_h, 4),
        "upper_head_ratio": round(((nose_row or y0) - y0) / head_h, 4),
    }


def detect(path: Path):
    pts, _, _ = cl.landmarks(path)
    return pts


def measure(cid: str) -> dict:
    base = PROJECT / "Saved" / "Compare" / cid
    out = {"id": cid}
    front = base / "front.png"
    side = base / "side.png"
    if front.is_file():
        try:
            pts = detect(front)
            out.update(proportions_from_points(pts))
            mask = foreground_mask_auto(np.array(Image.open(front).convert("RGB")))
            out["crown_ratio"] = crown_ratio(pts, mask)
            out.update(head_silhouette_metrics(pts, mask))
            out["front_ok"] = True
        except SystemExit as exc:
            out["front_error"] = str(exc)
    if side.is_file():
        mask = foreground_mask_auto(np.array(Image.open(side).convert("RGB")))
        out.update(side_profile_metrics(mask))
        out["side_ok"] = True
    return out


def main(argv=None) -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("ids", nargs="*", default=None)
    ap.add_argument("--out", default=str(PROJECT / "Docs" / "qa" / "cast-proportions.json"))
    args = ap.parse_args(argv)
    ids = args.ids or (PROTAGONISTS + CAST_IDS)
    rows = [measure(cid) for cid in ids]
    out = Path(args.out)
    out.parent.mkdir(parents=True, exist_ok=True)
    out.write_text(json.dumps({"images": "Saved/Compare/<id>/{front,side}.png", "rows": rows},
                              ensure_ascii=False, indent=1), encoding="utf-8")
    for r in rows:
        print(json.dumps(r, ensure_ascii=False))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
