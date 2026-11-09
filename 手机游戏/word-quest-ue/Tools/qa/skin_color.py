#!/usr/bin/env python3
"""D21-1：渲染 vs 参考图的肤色对比（CIE Lab + ΔE2000）。

用法：skin_color.py <render.png> <ref.png> [--json out.json]

流程：
1) 用四边像素中位数估计白点（参考图白底 / 渲染灰底），对渲染做白平衡（逐通道缩放）。
2) MediaPipe 468 点定位 5 个采样区（两颊、额头中部、鼻梁、下巴、颈部），小圆盘内取像素：
   剔除头发/深色（V<50）、高光（V>250）、高饱和（S>90）与L离群值，取 Lab 中位数。
3) 参考图同区域中位 Lab → ΔE2000 与 ΔL*/Δa*/Δb*。

局限（写进报告）：背景不是中性灰/白时白平衡失效；渲染与参考的光照方向/环境光不同会带来
5–10 ΔE 的系统差；MediaPipe 关键点在小图/侧面时可能不准；颈部区域无关键点，用下巴几何外推。
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
from metrics import hair_mask  # noqa: E402

# ---- CIE Lab / ΔE2000 ----
def srgb_to_linear(c: np.ndarray) -> np.ndarray:
    c = np.asarray(c, dtype=float) / 255.0
    return np.where(c <= 0.04045, c / 12.92, ((c + 0.055) / 1.055) ** 2.4)


def rgb_to_lab(rgb) -> np.ndarray:
    r, g, b = srgb_to_linear(np.asarray(rgb, dtype=float)).T if np.ndim(rgb) > 1 else srgb_to_linear(np.asarray(rgb, dtype=float))
    x = 0.4124564 * r + 0.3575761 * g + 0.1804375 * b
    y = 0.2126729 * r + 0.7151522 * g + 0.0721750 * b
    z = 0.0193339 * r + 0.1191920 * g + 0.9503041 * b
    x /= 0.95047
    z /= 1.08883
    eps = 216 / 24389
    kappa = 24389 / 27
    fx = np.where(x > eps, np.cbrt(x), (kappa * x + 16) / 116)
    fy = np.where(y > eps, np.cbrt(y), (kappa * y + 16) / 116)
    fz = np.where(z > eps, np.cbrt(z), (kappa * z + 16) / 116)
    L = 116 * fy - 16
    a = 500 * (fx - fy)
    b = 200 * (fy - fz)
    return np.stack([L, a, b], axis=-1)


def _de2000_one(lab1, lab2) -> float:
    L1, a1, b1 = lab1
    L2, a2, b2 = lab2
    C1 = np.hypot(a1, b1); C2 = np.hypot(a2, b2)
    Cbar = (C1 + C2) / 2.0
    G = 0.5 * (1 - np.sqrt(Cbar ** 7 / (Cbar ** 7 + 25 ** 7))) if Cbar > 0 else 0.0
    a1p = (1 + G) * a1; a2p = (1 + G) * a2
    C1p = np.hypot(a1p, b1); C2p = np.hypot(a2p, b2)
    h1p = np.degrees(np.arctan2(b1, a1p)) % 360
    h2p = np.degrees(np.arctan2(b2, a2p)) % 360
    dLp = L2 - L1
    dCp = C2p - C1p
    dhp = h2p - h1p
    if C1p * C2p == 0:
        dhp = 0.0
    elif dhp > 180:
        dhp -= 360
    elif dhp < -180:
        dhp += 360
    dHp = 2 * np.sqrt(C1p * C2p) * np.sin(np.radians(dhp) / 2)
    Lbar = (L1 + L2) / 2.0
    Cbarp = (C1p + C2p) / 2.0
    hsum = h1p + h2p
    hbar = np.where(abs(h1p - h2p) > 180, (hsum + 360) / 2 if hsum < 360 else (hsum - 360) / 2, hsum / 2)
    T = (1 - 0.17 * np.cos(np.radians(hbar - 30)) + 0.24 * np.cos(np.radians(2 * hbar))
         + 0.32 * np.cos(np.radians(3 * hbar + 6)) - 0.20 * np.cos(np.radians(4 * hbar - 63)))
    dtheta = 30 * np.exp(-((hbar - 275) / 25) ** 2)
    Rc = 2 * np.sqrt(Cbarp ** 7 / (Cbarp ** 7 + 25 ** 7)) if Cbarp > 0 else 0.0
    Sl = 1 + (0.015 * (Lbar - 50) ** 2) / np.sqrt(20 + (Lbar - 50) ** 2)
    Sc = 1 + 0.045 * Cbarp
    Sh = 1 + 0.015 * Cbarp * T
    Rt = -np.sin(np.radians(2 * dtheta)) * Rc
    return float(np.sqrt((dLp / Sl) ** 2 + (dCp / Sc) ** 2 + (dHp / Sh) ** 2 + Rt * (dCp / Sc) * (dHp / Sh)))


def delta_e_2000(lab1, lab2) -> float:
    a = np.asarray(lab1, dtype=float); b = np.asarray(lab2, dtype=float)
    if a.ndim == 1 and b.ndim == 1:
        return _de2000_one(a, b)
    return np.array([_de2000_one(x, y) for x, y in zip(a.reshape(-1, 3), b.reshape(-1, 3))])


# ---- 白平衡 ----
def border_color(img: np.ndarray, margin: int = 6) -> np.ndarray:
    a = np.asarray(img, dtype=float)
    parts = [a[:margin].reshape(-1, 3), a[-margin:].reshape(-1, 3),
             a[:, :margin].reshape(-1, 3), a[:, -margin:].reshape(-1, 3)]
    return np.median(np.concatenate(parts), axis=0)


def white_balance(render: np.ndarray, ref_white, render_white, clamp=(0.5, 2.0)) -> np.ndarray:
    scale = np.asarray(ref_white, dtype=float) / np.maximum(np.asarray(render_white, dtype=float), 1.0)
    scale = np.clip(scale, clamp[0], clamp[1])
    return np.clip(np.asarray(render, dtype=float) * scale, 0, 255)


# ---- 区域采样 ----
CANDIDATES = {
    "cheek_l": [50, 116, 205],
    "cheek_r": [280, 345, 425],
    "forehead": [151, 9, 8],
    "nose": [168],
    "chin": [199, 175, 18],
    "neck": [],   # 无关键点，用下巴几何外推
}
REGION_RADIUS = {"cheek_l": 0.028, "cheek_r": 0.028, "forehead": 0.040,
                 "nose": 0.014, "chin": 0.028, "neck": 0.060}


def is_skin_lab(lab, L_range=(35, 92), a_range=(-8, 32), b_range=(2, 48)) -> bool:
    L, a, b = lab
    return L_range[0] <= L <= L_range[1] and a_range[0] <= a <= a_range[1] and b_range[0] <= b <= b_range[1]


def region_candidates(pts: np.ndarray) -> tuple[dict, float]:
    P = lambda i: np.asarray(pts[i], dtype=float)
    face_w = float(np.linalg.norm(P(454) - P(234)))
    cand = {name: [P(i) for i in idxs] for name, idxs in CANDIDATES.items()}
    chin, low = P(152), P(17)
    cand["neck"] = [chin + (chin - low) / max(np.linalg.norm(chin - low), 1e-6) * face_w * 0.38]
    return cand, face_w


def sample_disk(rgb: np.ndarray, center, radius_px: float):
    h, w = rgb.shape[:2]
    x0, x1 = max(0, int(center[0] - radius_px)), min(w, int(center[0] + radius_px) + 1)
    y0, y1 = max(0, int(center[1] - radius_px)), min(h, int(center[1] + radius_px) + 1)
    if x1 - x0 < 3 or y1 - y0 < 3:
        return None
    yy, xx = np.mgrid[y0:y1, x0:x1]
    inside = ((xx - center[0]) ** 2 + (yy - center[1]) ** 2) <= radius_px ** 2
    patch = rgb[y0:y1, x0:x1].astype(float)[inside]
    if len(patch) < 20:
        return None
    v = patch.max(axis=1)
    s = np.where(v > 0, (v - patch.min(axis=1)) / np.maximum(v, 1) * 255, 0)
    lab = rgb_to_lab(patch)
    L = lab[:, 0]
    lo, hi = np.percentile(L, [15, 90])
    keep = (v > 40) & (v < 252) & (s < 150) & (L >= lo) & (L <= hi)
    if keep.sum() < 10:
        return None
    rgb_med = np.median(patch[keep], axis=0)
    lab_med = np.median(lab[keep], axis=0)
    return (rgb_med, lab_med) if is_skin_lab(lab_med) else None


def sample_region(rgb: np.ndarray, centers: list, radius_px: float):
    """多候选点采样：只保留符合肤色范围的盘，再取中位；全部失败返回 None。"""
    got = [r for c in centers if (r := sample_disk(rgb, c, radius_px)) is not None]
    if not got:
        return None
    rgbs = np.array([g[0] for g in got]); labs = np.array([g[1] for g in got])
    return np.median(rgbs, axis=0), np.median(labs, axis=0)


def measure(render_path: Path, ref_path: Path) -> dict:
    ref_img = np.asarray(Image.open(ref_path).convert("RGB"))
    ren_img = np.asarray(Image.open(render_path).convert("RGB"))
    ref_white = border_color(ref_img)
    ren_white = border_color(ren_img)
    ref_pts, _, _ = cl.landmarks(ref_path)
    ren_pts, _, _ = cl.landmarks(render_path)
    ref_cand, ref_fw = region_candidates(ref_pts)
    ren_cand, ren_fw = region_candidates(ren_pts)
    rows = []
    for name in ("cheek_l", "cheek_r", "forehead", "nose", "chin", "neck"):
        rr = sample_region(ren_img, ren_cand[name], REGION_RADIUS[name] * ren_fw)
        rf = sample_region(ref_img, ref_cand[name], REGION_RADIUS[name] * ref_fw)
        if rr is None or rf is None:
            rows.append({"region": name, "ok": False})
            continue
        rgb_r, lab_r = rr
        rgb_f, lab_f = rf
        rows.append({
            "region": name, "ok": True,
            "render_rgb": [int(v) for v in rgb_r], "ref_rgb": [int(v) for v in rgb_f],
            "render_lab": [round(float(v), 2) for v in lab_r],
            "ref_lab": [round(float(v), 2) for v in lab_f],
            "dL": round(float(lab_f[0] - lab_r[0]), 2),
            "da": round(float(lab_f[1] - lab_r[1]), 2),
            "db": round(float(lab_f[2] - lab_r[2]), 2),
            "dE00": round(float(delta_e_2000(lab_r, lab_f)), 2),
        })
    # 参考阴影：鼻部采样若明显暗于颊部 → 视为阴影，剔除
    cheek_L = [r["render_lab"][0] for r in rows if r["ok"] and r["region"].startswith("cheek")]
    for r in rows:
        if r.get("ok") and r["region"] == "nose" and cheek_L:
            if r["render_lab"][0] < float(np.median(cheek_L)) - 12:
                r["ok"] = False
                r["note"] = "鼻部采样受阴影影响，已剔除"
    ok = [r for r in rows if r["ok"]]
    agg = {}
    if ok:
        agg = {"dL": round(float(np.median([r["dL"] for r in ok])), 2),
               "da": round(float(np.median([r["da"] for r in ok])), 2),
               "db": round(float(np.median([r["db"] for r in ok])), 2),
               "dE00": round(float(np.median([r["dE00"] for r in ok])), 2)}
    return {"render": str(render_path), "ref": str(ref_path),
            "white": {"render": [round(float(v), 1) for v in ren_white],
                      "ref": [round(float(v), 1) for v in ref_white]},
            "rows": rows, "aggregate": agg}


def main(argv=None) -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("render")
    ap.add_argument("ref")
    ap.add_argument("--json", default=None)
    args = ap.parse_args(argv)
    res = measure(Path(args.render).expanduser(), Path(args.ref).expanduser())
    print(json.dumps(res, ensure_ascii=False, indent=1))
    if args.json:
        Path(args.json).expanduser().write_text(json.dumps(res, ensure_ascii=False, indent=1), encoding="utf-8")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
