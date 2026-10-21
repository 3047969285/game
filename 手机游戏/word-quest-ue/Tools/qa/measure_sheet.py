#!/usr/bin/env python3
"""D6：从白底三视图量服装尺寸（像素→厘米，按真实身高换算）。

用法：
  measure_sheet.py <sheet.png> --height-cm 184 [--view front|side|back] [--json out.json]

输出：
  - 视图数量与各视图 bbox（自动按前景连通域切分，按 x 排序 = 正/侧/背）
  - px_per_cm、每 5% 身高的横截线宽度（cm）
  - 暗色衣物（裤子/鞋/头发）与浅蓝（连衣裙）区域的上/下边界、底边宽度、中位 sRGB
"""
from __future__ import annotations

import argparse
import json
import sys
from pathlib import Path

import numpy as np
from PIL import Image
from scipy import ndimage

sys.path.insert(0, str(Path(__file__).resolve().parent))
from metrics import foreground_mask  # noqa: E402

VIEW_NAMES = ["front", "side", "back"]
PROFILE_FRACS = [round(f, 2) for f in np.arange(0.05, 1.0, 0.05)]


def load_rgb(path: Path) -> np.ndarray:
    return np.array(Image.open(path).convert("RGB"))


def split_views(mask: np.ndarray, min_area_ratio: float = 0.02):
    """按前景连通域切出 3 个视图，按 x 排序。返回 [(name, (x0,y0,x1,y1))]（bbox 含端点外扩 0）。"""
    labels, n = ndimage.label(mask)
    if n == 0:
        return []
    areas = ndimage.sum(mask, labels, range(1, n + 1))
    keep = [i + 1 for i, a in enumerate(areas) if a >= min_area_ratio * mask.sum()]
    boxes = []
    for lab in keep:
        ys, xs = np.where(labels == lab)
        boxes.append((int(xs.min()), int(ys.min()), int(xs.max()), int(ys.max())))
    boxes.sort(key=lambda b: b[0])
    return [(VIEW_NAMES[i] if i < len(VIEW_NAMES) else f"view{i}", b) for i, b in enumerate(boxes)]


def width_profile(mask: np.ndarray, bbox, n_steps: int = 20):
    """在视图 bbox 内按身高百分比取横截线宽度（像素）。"""
    x0, y0, x1, y1 = bbox
    h = y1 - y0
    out = {}
    for frac in PROFILE_FRACS:
        row = int(round(y0 + frac * (h - 1)))
        row = max(y0, min(y1, row))
        out[frac] = int(mask[row, x0:x1 + 1].sum())
    return out


def dark_mask(rgb: np.ndarray, v_max: int = 80) -> np.ndarray:
    v = rgb.max(axis=-1)
    return v < v_max


def light_colored_mask(rgb: np.ndarray, hue_range=(85, 115), sat_max=0.45, val_min=0.55) -> np.ndarray:
    """浅色衣物（如浅蓝裙）：HSV 中低饱和、较高明度。hue 用 0-179 OpenCV 语义的近似。"""
    r, g, b = [rgb[..., i] / 255.0 for i in range(3)]
    mx = rgb[..., :3].max(axis=-1) / 255.0
    mn = rgb[..., :3].min(axis=-1) / 255.0
    sat = np.where(mx > 0, (mx - mn) / np.maximum(mx, 1e-6), 0.0)
    hue = np.zeros_like(mx)
    d = np.maximum(mx - mn, 1e-6)
    hue = np.where(mx == r, (g - b) / d % 6, np.where(mx == g, (b - r) / d + 2, (r - g) / d + 4)) * 30.0
    return (hue >= hue_range[0]) & (hue <= hue_range[1]) & (sat < sat_max) & (mx >= val_min)


def extent(mask: np.ndarray, bbox):
    x0, y0, x1, y1 = bbox
    sub = mask[y0:y1 + 1, x0:x1 + 1]
    ys, xs = np.where(sub)
    if len(ys) == 0:
        return None
    return {"y0": int(ys.min()), "y1": int(ys.max()), "x0": int(xs.min()), "x1": int(xs.max()),
            "h": int(ys.max() - ys.min() + 1), "w": int(xs.max() - xs.min() + 1)}


def median_srgb(rgb: np.ndarray, mask: np.ndarray) -> list[int] | None:
    px = rgb[mask]
    if len(px) == 0:
        return None
    med = np.median(px[:, :3], axis=0).astype(int)
    return [int(v) for v in med]


def measure(sheet: Path, height_cm: float, view: str | None, json_out: Path | None):
    rgb = load_rgb(sheet)
    fg = foreground_mask(rgb)
    views = split_views(fg)
    out = {"sheet": str(sheet), "height_cm": height_cm, "views": []}
    for name, bbox in views:
        if view and name != view:
            continue
        x0, y0, x1, y1 = bbox
        h_px = y1 - y0
        px_per_cm = h_px / height_cm
        v = {
            "name": name, "bbox": [x0, y0, x1, y1],
            "height_px": int(h_px), "px_per_cm": round(px_per_cm, 4),
            "width_cm_by_frac": {str(f): round(width_profile(fg, bbox)[f] / px_per_cm, 2) for f in PROFILE_FRACS},
        }
        dark = dark_mask(rgb) & fg
        ext = extent(dark, bbox)
        if ext:
            v["dark"] = {**ext, "w_cm": round(ext["w"] / px_per_cm, 2), "median_srgb": median_srgb(rgb, dark & fg)}
        light = light_colored_mask(rgb) & fg
        ext = extent(light, bbox)
        if ext:
            v["light_colored"] = {**ext, "w_cm": round(ext["w"] / px_per_cm, 2), "median_srgb": median_srgb(rgb, light & fg)}
        v["hair_srgb"] = median_srgb(rgb, dark & fg & (np.arange(rgb.shape[0])[:, None] < y0 + 0.28 * h_px)[:rgb.shape[0], :]) if False else None
        out["views"].append(v)
    if json_out:
        Path(json_out).write_text(json.dumps(out, ensure_ascii=False, indent=2), encoding="utf-8")
    return out


def main(argv=None) -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("sheet")
    ap.add_argument("--height-cm", type=float, required=True)
    ap.add_argument("--view", choices=VIEW_NAMES, default=None)
    ap.add_argument("--json", default=None)
    args = ap.parse_args(argv)
    result = measure(Path(args.sheet).expanduser(), args.height_cm, args.view,
                     Path(args.json).expanduser() if args.json else None)
    print(json.dumps(result, ensure_ascii=False, indent=2))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
