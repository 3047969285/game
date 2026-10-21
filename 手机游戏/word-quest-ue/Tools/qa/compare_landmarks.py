#!/usr/bin/env python3
"""D3-1：468 点关键点对比（MediaPipe FaceMesh）。

用法：
  compare_landmarks.py <ref.png> <render.png> [--out overlay.png] [--json out.json]

对齐：渲染侧关键点做相似变换（缩放+旋转+平移，Umeyama）到参考图坐标系，再算像素误差。
输出：平均 / 最大 / P95 像素误差 + 分区（眼、眉、鼻、嘴、脸廓）误差；可选叠加图与 JSON。
"""
from __future__ import annotations

import argparse
import json
import sys
from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw

sys.path.insert(0, str(Path(__file__).resolve().parent))
from metrics import apply_affine, landmark_errors, similarity_align  # noqa: E402


def landmarks(path: Path) -> tuple[np.ndarray, tuple[int, int], Image.Image]:
    import mediapipe as mp

    img = Image.open(path).convert("RGB")
    w, h = img.size
    with mp.solutions.face_mesh.FaceMesh(static_image_mode=True, max_num_faces=1,
                                        refine_landmarks=False) as fm:
        res = fm.process(np.asarray(img))
    if not res.multi_face_landmarks:
        raise SystemExit(f"[compare_landmarks] no face detected in {path}")
    pts = np.array([[p.x * w, p.y * h] for p in res.multi_face_landmarks[0].landmark], dtype=np.float64)
    return pts[:468], (w, h), img


def draw_overlay(ref_img: Image.Image, ref_pts: np.ndarray, aligned: np.ndarray, out: Path) -> None:
    im = ref_img.convert("RGB")
    d = ImageDraw.Draw(im)
    for (x, y), (ax, ay) in zip(ref_pts, aligned):
        d.ellipse([x - 1.5, y - 1.5, x + 1.5, y + 1.5], fill=(40, 200, 90))
        d.ellipse([ax - 1.0, ay - 1.0, ax + 1.0, ay + 1.0], fill=(240, 60, 60))
    out.parent.mkdir(parents=True, exist_ok=True)
    im.save(out)


def main(argv=None) -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("ref")
    ap.add_argument("render")
    ap.add_argument("--out", default=None, help="叠加图输出路径")
    ap.add_argument("--json", default=None, help="JSON 结果输出路径")
    args = ap.parse_args(argv)
    ref = Path(args.ref).expanduser()
    render = Path(args.render).expanduser()
    ref_pts, _, ref_img = landmarks(ref)
    render_pts, _, _ = landmarks(render)
    m = similarity_align(render_pts, ref_pts)
    aligned = apply_affine(render_pts, m)
    err = landmark_errors(aligned, ref_pts)
    err["scale"] = float(m[0, 0] / max(m[1, 1], 1e-9))
    err["ref"] = str(ref)
    err["render"] = str(render)
    print(json.dumps(err, ensure_ascii=False, indent=2))
    if args.out:
        draw_overlay(ref_img, ref_pts, aligned, Path(args.out).expanduser())
    if args.json:
        Path(args.json).expanduser().parent.mkdir(parents=True, exist_ok=True)
        Path(args.json).expanduser().write_text(json.dumps(err, ensure_ascii=False, indent=2), encoding="utf-8")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
