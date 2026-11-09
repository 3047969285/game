"""D21 验收：U/V 建议的标定系数、方向与步长上限。"""
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

import skin_suggest as ss  # noqa: E402


def test_calibration_coefficients_sign():
    assert ss.K_U_L < 0          # U 降低 → L 变亮
    assert ss.K_V_A > 0          # V 升高 → 更红
    assert ss.K_V_B > 0          # V 升高 → 略黄


def test_too_dark_suggests_lower_u():
    r = ss.suggest(dL=6.0, da=0.0, db=0.0)   # 参考比渲染亮 6
    assert r["dU"] < 0 and "降低 U" in r["direction"]["U"]


def test_too_yellow_red_suggests_lower_v():
    r = ss.suggest(dL=0.0, da=-4.0, db=-10.0)
    assert r["dV"] < 0 and "降低 V" in r["direction"]["V"]


def test_step_clamped():
    r = ss.suggest(dL=100.0, da=-100.0, db=-100.0)
    assert abs(r["dU"]) <= 0.10
    assert abs(r["dV"]) <= 0.10
    assert r["steps"]["U"] >= 1 and r["steps"]["V"] >= 1


def test_no_change():
    r = ss.suggest(0.0, 0.0, 0.0)
    assert r["dU"] == 0.0 and r["dV"] == 0.0
