"""D3 验收：用合成数据验证相似变换、分区误差、掩码与 IoU、报告发现的正确性。"""
import sys
from pathlib import Path

import numpy as np
from PIL import Image

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

from metrics import (  # noqa: E402
    REGIONS, apply_affine, difference_rgb, foreground_mask, hair_mask,
    landmark_errors, mask_iou, similarity_align,
)


def test_similarity_align_recovers_scale_and_translation():
    rng = np.random.default_rng(0)
    src = rng.uniform(0, 200, size=(30, 2))
    scale, tx, ty = 1.5, 10.0, -5.0
    dst = src * scale + np.array([tx, ty])
    m = similarity_align(src, dst)
    got = apply_affine(src, m)
    assert np.allclose(got, dst, atol=1e-6)


def test_apply_affine_identity():
    pts = np.array([[1.0, 2.0], [3.0, 4.0]])
    m = np.array([[1.0, 0.0, 0.0], [0.0, 1.0, 0.0]])
    assert np.allclose(apply_affine(pts, m), pts)


def test_landmark_errors_zero_and_regions():
    pts = np.random.default_rng(1).uniform(0, 100, size=(468, 2))
    err = landmark_errors(pts, pts)
    assert err["mean"] == 0.0 and err["max"] == 0.0
    for name in REGIONS:
        assert name in err
        assert err[name]["mean"] == 0.0


def test_landmark_errors_known_offset():
    ref = np.zeros((468, 2))
    out = np.zeros((468, 2))
    out[:10, 0] = 3.0
    err = landmark_errors(out, ref)
    assert np.isclose(err["mean"], 3.0 * 10 / 468)
    assert np.isclose(err["max"], 3.0)


def test_foreground_mask_white_background():
    img = np.full((50, 50, 3), 255, dtype=np.uint8)
    assert foreground_mask(img).sum() == 0
    img[10:20, 10:20] = (0, 0, 0)
    assert foreground_mask(img).sum() == 100


def test_hair_mask_dark_and_red():
    dark = np.zeros((10, 10, 3), dtype=np.uint8)
    dark[:] = (30, 30, 30)
    assert hair_mask(dark).all()
    skin = np.zeros((10, 10, 3), dtype=np.uint8)
    skin[:] = (230, 180, 160)
    assert not hair_mask(skin).any()
    red = np.zeros((10, 10, 3), dtype=np.uint8)
    red[:] = (90, 25, 30)  # 酒红发，v=90 < 100
    assert hair_mask(red).all()


def test_mask_iou_cases():
    a = np.zeros((4, 4), dtype=bool)
    b = a.copy()
    assert mask_iou(a, b) == 1.0
    a[0, 0] = True
    assert mask_iou(a, b) == 0.0
    c = np.zeros((4, 4), dtype=bool)
    c[0, 0] = True
    d = np.zeros((4, 4), dtype=bool)
    d[0, 0] = True
    d[0, 1] = True
    assert np.isclose(mask_iou(c, d), 0.5)


def test_difference_rgb_colors():
    ref = np.zeros((2, 2), dtype=bool)
    out = np.zeros((2, 2), dtype=bool)
    ref[0, 0] = True
    out[1, 1] = True
    rgb = difference_rgb(ref, out)
    assert tuple(rgb[0, 0]) == (230, 60, 60)
    assert tuple(rgb[1, 1]) == (60, 110, 255)
    ref[1, 1] = True
    out[1, 1] = True
    assert tuple(difference_rgb(ref, out)[1, 1]) == (40, 190, 90)


def test_side_by_side_and_find_render(tmp_path):
    from PIL import Image
    from report import find_render, side_by_side

    ref = tmp_path / "a.png"
    ren = tmp_path / "b.png"
    Image.new("RGB", (100, 200), (255, 255, 255)).save(ref)
    Image.new("RGB", (100, 200), (200, 200, 200)).save(ren)
    out = tmp_path / "pair.png"
    side_by_side(ref, ren, out, height=120)
    assert out.is_file()
    assert Image.open(out).height == 120

    folder = tmp_path / "renders"
    folder.mkdir()
    Image.new("RGB", (10, 10)).save(folder / "front_001.png")
    assert find_render(folder, "front") is not None
    assert find_render(folder, "side") is None


def test_report_thresholds_match_plan():
    from report import THRESHOLDS

    assert THRESHOLDS == {"front_mean_px": 3.0, "q34_mean_px": 8.0, "side_face_iou": 0.95, "hair_iou": 0.85}


def test_foreground_mask_auto_on_grey_background():
    from metrics import background_rgb, foreground_mask_auto

    img = np.full((60, 60, 3), 150, dtype=np.uint8)
    img[20:40, 20:40] = (240, 200, 180)   # 面部
    bg = background_rgb(img)
    assert np.allclose(bg, [150, 150, 150], atol=2)
    fg = foreground_mask_auto(img)
    assert fg.sum() == 400
    assert not fg[0, 0]


def test_hair_mask_auto_ignores_dark_background():
    from metrics import hair_mask_auto_bg

    img = np.full((60, 60, 3), 120, dtype=np.uint8)  # 灰色 lookdev 背景
    img[10:50, 10:50] = (230, 200, 180)             # 皮肤
    img[10:20, 10:50] = (25, 20, 18)                 # 深色头发
    hm = hair_mask_auto_bg(img, v_max=100)
    assert hm[15, 30]
    assert not hm[55, 55]   # 背景不算头发
    assert not hm[35, 30]   # 皮肤不算头发
