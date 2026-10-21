#!/usr/bin/env python3
"""D3-2：剪影对比（白底前景分割）。

用法：
  compare_silhouette.py <ref.png> <render.png> --region face|hair [--out heatmap.png]
                        [--hair-vmax 100] [--hair-smax 170]

face：前景（白底）去掉头发；hair：暗色低饱和区域（男女发色不同，可配置 vmax/smax）。
输出：IoU + 差异热图（红=参考有/渲染无，蓝=渲染有/参考无，绿=重合）。
"""
from __future__ import annotations

import argparse
import json
import sys
from pathlib import Path

import numpy as np
from PIL import Image

sys.path.insert(0, str(Path(__file__).resolve().parent))
from metrics import difference_rgb, foreground_mask_auto, hair_mask, mask_iou  # noqa: E402


def load_rgb(path: Path, size: tuple[int, int] | None = None) -> np.ndarray:
    img = Image.open(path).convert("RGB")
    if size is not None and img.size != size:
        img = img.resize(size, Image.LANCZOS)
        # 白底重采样会留下浅灰边，再压一次白
        a = np.asarray(img).copy()
        a[a.min(axis=-1) > 235] = 255
        return a
    return np.asarray(img)


def region_mask(rgb: np.ndarray, region: str, hair_vmax: float, hair_smax: float) -> np.ndarray:
    fg = foreground_mask_auto(rgb)
    hair = hair_mask(rgb, v_max=hair_vmax, s_max=hair_smax)
    if region == "hair":
        return hair & fg
    return fg & ~hair


def main(argv=None) -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("ref")
    ap.add_argument("render")
    ap.add_argument("--region", choices=["face", "hair"], default="face")
    ap.add_argument("--out", default=None, help="差异热图输出路径")
    ap.add_argument("--hair-vmax", type=float, default=100.0)
    ap.add_argument("--hair-smax", type=float, default=200.0)
    ap.add_argument("--json", default=None)
    args = ap.parse_args(argv)
    ref_path = Path(args.ref).expanduser().resolve()
    render_path = Path(args.render).expanduser().resolve()
    ref_rgb = load_rgb(ref_path)
    render_rgb = load_rgb(render_path, size=(ref_rgb.shape[1], ref_rgb.shape[0]))
    ref_mask = region_mask(ref_rgb, args.region, args.hair_vmax, args.hair_smax)
    out_mask = region_mask(render_rgb, args.region, args.hair_vmax, args.hair_smax)
    result = {
        "region": args.region,
        "iou": mask_iou(ref_mask, out_mask),
        "ref_pixels": int(ref_mask.sum()),
        "render_pixels": int(out_mask.sum()),
        "ref": str(ref_path),
        "render": str(render_path),
    }
    print(json.dumps(result, ensure_ascii=False, indent=2))
    if args.out:
        Image.fromarray(difference_rgb(ref_mask, out_mask)).save(Path(args.out).expanduser())
    if args.json:
        Path(args.json).expanduser().write_text(json.dumps(result, ensure_ascii=False, indent=2), encoding="utf-8")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
