#!/usr/bin/env python3
"""Project a CC0 equirectangular HDRI into a view-sized LDR window panorama.

Run with OpenCV and NumPy available, for example:
  uvx --offline --with opencv-python-headless --with numpy -- python Tools/build_window_panorama.py
"""
from __future__ import annotations

import argparse
from pathlib import Path

import cv2
import numpy as np

ROOT = Path(__file__).resolve().parents[1]
HDRI = ROOT / "SourceArt/PolyHaven/hdris/suburban_garden_4k.hdr"
OUTPUT = ROOT / "SourceArt/PolyHaven/hdris/suburban_garden_window_4k.png"


def project_panorama(image: np.ndarray, yaw_degrees: float, horizontal_fov_degrees: float,
                     output_size: tuple[int, int]) -> np.ndarray:
    """Return a rectilinear RGB view from a linear equirectangular OpenCV HDR image."""
    if image.ndim != 3 or image.shape[2] < 3 or not np.isfinite(image).all():
        raise ValueError("HDRI must be a finite HxWx3 image")
    width, height = output_size
    if width < 1 or height < 1:
        raise ValueError("output dimensions must be positive")
    if not 1.0 <= horizontal_fov_degrees < 170.0:
        raise ValueError("horizontal FOV must be between 1 and 170 degrees")

    source_height, source_width = image.shape[:2]
    fov_x = np.deg2rad(horizontal_fov_degrees)
    fov_y = 2.0 * np.arctan(np.tan(fov_x / 2.0) * height / width)
    x = (np.arange(width, dtype=np.float32) + 0.5 - width / 2.0) / (width / 2.0)
    y = (height / 2.0 - np.arange(height, dtype=np.float32) - 0.5) / (height / 2.0)
    x *= np.tan(fov_x / 2.0)
    y *= np.tan(fov_y / 2.0)
    xx, yy = np.meshgrid(x, y)

    yaw = np.deg2rad(yaw_degrees)
    dx = xx * np.cos(yaw) + np.sin(yaw)
    dz = -xx * np.sin(yaw) + np.cos(yaw)
    norm = np.sqrt(dx * dx + yy * yy + dz * dz)
    lon = np.arctan2(dx / norm, dz / norm)
    lat = np.arcsin(np.clip(yy / norm, -1.0, 1.0))
    map_x = ((lon / (2.0 * np.pi) + 0.5) * source_width).astype(np.float32)
    map_y = ((0.5 - lat / np.pi) * source_height).astype(np.float32)
    return cv2.remap(image, map_x, map_y, cv2.INTER_LINEAR, borderMode=cv2.BORDER_WRAP)[..., ::-1]


def tone_map_aces(linear_rgb: np.ndarray) -> np.ndarray:
    """Convert linear HDR radiance to display-referred sRGB with a soft ACES fit."""
    rgb = np.maximum(linear_rgb, 0.0)
    mapped = (rgb * (2.51 * rgb + 0.03)) / (rgb * (2.43 * rgb + 0.59) + 0.14)
    return np.clip(mapped, 0.0, 1.0) ** (1.0 / 2.2)


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--yaw", type=float, default=45.0)
    parser.add_argument("--fov", type=float, default=100.0)
    parser.add_argument("--width", type=int, default=4096)
    parser.add_argument("--height", type=int, default=2048)
    parser.add_argument("--output", type=Path, default=OUTPUT)
    args = parser.parse_args()
    image_bytes = np.fromfile(HDRI, dtype=np.uint8)
    image = cv2.imdecode(image_bytes, cv2.IMREAD_UNCHANGED)
    if image is None:
        raise FileNotFoundError(HDRI)
    view = project_panorama(image, args.yaw, args.fov, (args.width, args.height))
    display = np.clip(tone_map_aces(view) * 255.0 + 0.5, 0, 255).astype(np.uint8)
    args.output.parent.mkdir(parents=True, exist_ok=True)
    success, encoded = cv2.imencode(".png", cv2.cvtColor(display, cv2.COLOR_RGB2BGR),
                                    [cv2.IMWRITE_PNG_COMPRESSION, 4])
    if not success:
        raise RuntimeError("Failed to encode window panorama")
    try:
        encoded.tofile(args.output)
    except OSError as exc:
        raise RuntimeError(f"Failed to write {args.output}") from exc
    print(f"Wrote {args.output} ({args.width}x{args.height}, yaw={args.yaw:g}, fov={args.fov:g})")


if __name__ == "__main__":
    main()
