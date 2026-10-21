"""D6 验收：用合成三视图验证视图切分、像素→厘米换算与横截线宽度。"""
import sys
from pathlib import Path

import numpy as np

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

from measure_sheet import (  # noqa: E402
    dark_mask, extent, light_colored_mask, median_srgb, split_views, width_profile,
)


def synthetic_sheet(w=900, h=600, views=(("front", 50, 250), ("side", 400, 540), ("back", 700, 840))):
    img = np.full((h, w, 3), 255, dtype=np.uint8)
    for _, x0, x1 in views:
        img[100:500, x0:x1] = (200, 120, 100)
    return img


def test_split_views_order_and_names():
    img = synthetic_sheet()
    mask = img.min(axis=-1) < 244
    views = split_views(mask)
    assert [v[0] for v in views] == ["front", "side", "back"]
    assert views[0][1][2] - views[0][1][0] + 1 == 200


def test_px_per_cm_and_width_profile():
    img = synthetic_sheet()
    mask = img.min(axis=-1) < 244
    views = split_views(mask)
    bbox = views[0][1]
    h_px = bbox[3] - bbox[1]
    ppc = h_px / 184.0
    prof = width_profile(mask, bbox)
    for frac in (0.2, 0.5, 0.8):
        assert abs(prof[round(frac, 2)] - 200) <= 1
    # 200 px 宽 -> 200/ppc cm
    assert abs(200 / ppc - 200 * 184 / h_px) < 0.01


def test_dark_mask_and_extent():
    img = np.full((100, 100, 3), 255, dtype=np.uint8)
    img[20:80, 10:30] = (20, 20, 20)
    dm = dark_mask(img)
    assert dm.sum() == 60 * 20
    ext = extent(dm, (0, 0, 99, 99))
    assert ext == {"y0": 20, "y1": 79, "x0": 10, "x1": 29, "h": 60, "w": 20}


def test_light_colored_and_median_color():
    img = np.full((50, 50, 3), 255, dtype=np.uint8)
    img[10:40, 10:40] = (190, 210, 235)  # 浅蓝
    lm = light_colored_mask(img)
    assert lm.sum() > 0
    med = median_srgb(img, lm)
    assert med[2] > med[0]
