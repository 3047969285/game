#!/usr/bin/env python3
"""D7：从参考图导出头发剪影掩码（Groom 验收目标）。

用法：ref_hair_masks.py [--out Docs/qa/ref_masks]

输出（白=头发，黑=其它）：<id>_<view>.png；同时输出 <id>_<view>_overlay.png（原图+红色掩码）。
"""
from __future__ import annotations

import argparse
import sys
from pathlib import Path

import numpy as np
from PIL import Image
from scipy import ndimage

sys.path.insert(0, str(Path(__file__).resolve().parent))
from metrics import foreground_mask, hair_mask  # noqa: E402

DOWNLOADS = Path.home() / "Downloads"

# id -> [(view, filename, hair_vmax)]
REFS = {
    "me2026": [("front", "lian1.png", 100.0), ("q34", "lian3.png", 100.0),
               ("side", "lian2.png", 100.0)],
    "lin": [("front", "lian5.png", 150.0), ("q34", "lian6.png", 150.0),
            ("side", "lian8.png", 150.0), ("q34_supplement", "lian7.png", 150.0)],
}


def keep_hair_components(mask: np.ndarray, min_ratio: float = 0.15) -> np.ndarray:
    """去掉眉毛/眼睛/嘴唇等小块暗色区域，只保留与最大头发块同量级的连通域。"""
    labels, n = ndimage.label(mask)
    if n == 0:
        return mask
    areas = ndimage.sum(mask, labels, range(1, n + 1))
    biggest = areas.max()
    keep = {i + 1 for i, a in enumerate(areas) if a >= min_ratio * biggest}
    out = np.isin(labels, list(keep))
    return out


def mask_for(path: Path, v_max: float, s_max: float = 200.0, clean: bool = True) -> np.ndarray:
    rgb = np.array(Image.open(path).convert("RGB"))
    mask = hair_mask(rgb, v_max=v_max, s_max=s_max) & foreground_mask(rgb)
    return keep_hair_components(mask) if clean else mask


def mask_for_sheet(path: Path, v_max: float, s_max: float = 200.0):
    """白底三视图整张 sheet：按连通域切成 3 个视图，各返回一个掩码。"""
    rgb = np.array(Image.open(path).convert("RGB"))
    fg = foreground_mask(rgb)
    labels, n = ndimage.label(fg)
    areas = ndimage.sum(fg, labels, range(1, n + 1))
    comps = []
    for i, a in enumerate(areas):
        if a < 0.02 * fg.sum():
            continue
        ys, xs = np.where(labels == i + 1)
        comps.append((int(xs.min()), int(ys.min()), int(xs.max()), int(ys.max())))
    comps.sort(key=lambda b: b[0])
    masks = []
    base = hair_mask(rgb, v_max=v_max, s_max=s_max)
    for name, (x0, y0, x1, y1) in zip(("front", "side", "back"), comps):
        sub = np.zeros_like(fg)
        sub[y0:y1 + 1, x0:x1 + 1] = True
        m = keep_hair_components(base & fg & sub)
        masks.append((name, m))
    return masks


def save_mask(mask: np.ndarray, out_dir: Path, stem: str) -> Path:
    out_dir.mkdir(parents=True, exist_ok=True)
    img = np.zeros(mask.shape, dtype=np.uint8)
    img[mask] = 255
    path = out_dir / f"{stem}.png"
    Image.fromarray(img, mode="L").save(path)
    return path


def save_overlay(src: Path, mask: np.ndarray, out_dir: Path, stem: str) -> Path:
    rgb = np.array(Image.open(src).convert("RGB")).astype(np.float32)
    rgb[mask] = rgb[mask] * 0.35 + np.array([230, 40, 40]) * 0.65
    path = out_dir / f"{stem}_overlay.png"
    Image.fromarray(rgb.astype(np.uint8)).save(path)
    return path


def generate(out_dir: Path) -> list[dict]:
    results = []
    for cid, entries in REFS.items():
        for view, fname, vmax in entries:
            src = DOWNLOADS / fname
            if not src.is_file():
                print(f"[ref_hair_masks] skip missing {src}", file=sys.stderr)
                continue
            mask = mask_for(src, vmax)
            stem = f"{cid}_{view}"
            p = save_mask(mask, out_dir, stem)
            save_overlay(src, mask, out_dir, stem)
            results.append({"id": cid + ":" + view, "pixels": int(mask.sum()),
                            "ratio": round(float(mask.mean()), 4), "mask": str(p)})

    # 三视图 sheet 逐视图导出
    for cid, fname, vmax in (("lin_sheet", "female_sheet.png", 150.0), ("me2026_sheet", "male_sheet.png", 100.0)):
        src = DOWNLOADS / fname
        if not src.is_file():
            continue
        for view, m in mask_for_sheet(src, 210.0):
            stem = f"{cid}_{view}"
            p = save_mask(m, out_dir, stem)
            save_overlay(src, m, out_dir, stem)
            results.append({"id": cid + ":" + view, "pixels": int(m.sum()),
                            "ratio": round(float(m.mean()), 4), "mask": str(p)})
    return results


def main(argv=None) -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--out", default=str(Path(__file__).resolve().parents[2] / "Docs" / "qa" / "ref_masks"))
    args = ap.parse_args(argv)
    results = generate(Path(args.out).expanduser())
    for r in results:
        print(f"{r['id']:24s} pixels={r['pixels']:8d} ratio={r['ratio']:.3f} -> {r['mask']}")
    print(f"[ref_hair_masks] {len(results)} masks written to {args.out}")
    return 0 if results else 2


if __name__ == "__main__":
    raise SystemExit(main())
