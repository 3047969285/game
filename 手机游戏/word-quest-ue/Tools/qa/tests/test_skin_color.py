"""D21 验收：Lab 转换、ΔE2000、白平衡、区域中位色采样。"""
import sys
from pathlib import Path

import numpy as np

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

import skin_color as sc  # noqa: E402


def test_lab_known_values():
    assert np.allclose(sc.rgb_to_lab([255, 255, 255]), [100, 0, 0], atol=0.05)
    assert np.allclose(sc.rgb_to_lab([0, 0, 0]), [0, 0, 0], atol=0.05)
    g = sc.rgb_to_lab([128, 128, 128])
    assert abs(g[0] - 53.585) < 0.2
    assert abs(g[1]) < 0.2 and abs(g[2]) < 0.2
    red = sc.rgb_to_lab([255, 0, 0])
    assert abs(red[0] - 53.24) < 0.5
    assert abs(red[1] - 80.09) < 0.6
    assert abs(red[2] - 67.20) < 0.6


def test_delta_e_identity_and_symmetry():
    lab = sc.rgb_to_lab([180, 140, 120])
    assert abs(sc.delta_e_2000(lab, lab)) < 1e-9
    a = sc.rgb_to_lab([180, 140, 120])
    b = sc.rgb_to_lab([160, 130, 110])
    assert abs(sc.delta_e_2000(a, b) - sc.delta_e_2000(b, a)) < 1e-9
    assert sc.delta_e_2000(a, b) > 0


def test_delta_e_known_pair():
    # Sharma et al. 标准样例之一
    assert abs(sc.delta_e_2000([50, 2.6772, -79.7751], [50, 0, -82.7485]) - 2.0425) < 0.01


def test_white_balance():
    render = np.array([[[120, 100, 80]]], dtype=float)
    ref_white = [255, 255, 255]
    render_white = [200, 200, 200]
    out = sc.white_balance(render, ref_white, render_white)
    assert np.allclose(out[0, 0], [120 * 1.275, 100 * 1.275, 80 * 1.275])
    # 背景本身校正后应接近白
    bg = sc.white_balance(np.array([[[200, 200, 200]]], dtype=float), ref_white, render_white)
    assert np.allclose(bg[0, 0], [255, 255, 255], atol=0.6)


def test_border_color_estimate():
    img = np.full((60, 60, 3), 120, dtype=np.uint8)
    img[20:40, 20:40] = (230, 190, 170)
    assert np.allclose(sc.border_color(img), [120, 120, 120], atol=1)


def test_sample_region_median():
    img = np.full((200, 200, 3), 130, dtype=np.uint8)
    img[80:120, 80:120] = (210, 170, 150)
    med_rgb, med_lab = sc.sample_region(img, [(100, 100)], 15)
    assert abs(med_rgb[0] - 210) < 6 and abs(med_rgb[1] - 170) < 6
    assert med_lab[0] > 60
