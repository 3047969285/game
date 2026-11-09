"""D19 验收：用合成关键点验证脸部比例计算与侧面下巴突出度。"""
import sys
from pathlib import Path

import numpy as np

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

import cast_proportions as cp  # noqa: E402


def ideal_face() -> np.ndarray:
    """构造一个满足已知比例的“标准脸”：脸宽 200，脸长 280，额头 90，眼宽 40，眼距 60，鼻宽 50，嘴宽 80，下颌宽 160。"""
    pts = np.zeros((468, 2), dtype=float)
    pts[cp.IDX["forehead_top"]] = (500, 100)
    pts[cp.IDX["chin"]] = (500, 380)
    pts[cp.IDX["cheek_l"]] = (400, 240)
    pts[cp.IDX["cheek_r"]] = (600, 240)
    pts[cp.IDX["jaw_l"]] = (420, 330)
    pts[cp.IDX["jaw_r"]] = (580, 330)
    pts[cp.IDX["brow_l"]] = (440, 190)
    pts[cp.IDX["brow_r"]] = (560, 190)
    pts[cp.IDX["brow_l2"]] = (445, 190)
    pts[cp.IDX["brow_r2"]] = (555, 190)
    pts[cp.IDX["eye_l_outer"]] = (430, 230)
    pts[cp.IDX["eye_l_inner"]] = (470, 230)
    pts[cp.IDX["eye_r_inner"]] = (530, 230)
    pts[cp.IDX["eye_r_outer"]] = (570, 230)
    pts[cp.IDX["nose_l"]] = (475, 280)
    pts[cp.IDX["nose_r"]] = (525, 280)
    pts[cp.IDX["mouth_l"]] = (460, 320)
    pts[cp.IDX["mouth_r"]] = (540, 320)
    pts[cp.IDX["nose_tip"]] = (500, 300)
    pts[cp.IDX["nose_base"]] = (500, 280)
    pts[cp.IDX["lower_lip"]] = (500, 315)
    return pts


def test_proportions_known_face():
    r = cp.proportions_from_points(ideal_face())
    assert r["face_lw"] == 1.4            # 280 / 200
    assert abs(r["forehead_ratio"] - 90 / 280) < 1e-3
    assert abs(r["eye_width_ratio"] - 40 / 200) < 1e-3
    assert abs(r["eye_spacing_ratio"] - 60 / 200) < 1e-3
    assert abs(r["nose_width_ratio"] - 50 / 200) < 1e-3
    assert abs(r["mouth_width_ratio"] - 80 / 200) < 1e-3
    assert abs(r["jaw_cheek_ratio"] - 160 / 200) < 1e-3


def test_chin_protrusion_sign_and_zero():
    pts = ideal_face()
    pts[cp.IDX["nose_tip"]] = (520, 300)      # 面朝 +x
    # 下巴在连线前方（右）→ 正值
    pts[cp.IDX["chin"]] = (505, 380)
    assert cp.chin_protrusion_side(pts) > 0
    # 下巴在连线后方 → 负值
    pts[cp.IDX["chin"]] = (495, 380)
    assert cp.chin_protrusion_side(pts) < 0


def test_proportions_scale_invariant():
    pts = ideal_face()
    r1 = cp.proportions_from_points(pts)
    r2 = cp.proportions_from_points(pts * 2.0)
    for key in ("face_lw", "forehead_ratio", "eye_width_ratio", "jaw_cheek_ratio"):
        assert abs(r1[key] - r2[key]) < 1e-3
