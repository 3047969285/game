"""D15 验收：UE→Blender 坐标换算与同一立方体在两条管线中的投影一致性（<1 px）。"""
import math
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from ue_camera import (blender_camera_basis, blender_to_ue, project_blender, project_ue,
                       ue_rotation_basis, ue_to_blender)

CUBE_UE = [(x, y, z) for x in (-10, 10) for y in (-10, 10) for z in (0, 20)]
CAM_UE = (0.0, 40.0, 20.0)
ROT = (0.0, -90.0, 0.0)   # 从 +Y 看向 -Y（正面）
RES = 1024
ORTHO_CM = 40.0


def test_coordinate_roundtrip():
    for p in CUBE_UE:
        b = ue_to_blender(*p)
        back = blender_to_ue(*b)
        assert all(abs(back[i] - p[i]) < 1e-9 for i in range(3))
    # Y 轴取反
    assert ue_to_blender(0, 100, 0)[1] == -1.0


def test_same_cube_projects_identically_in_both_pipelines():
    px_ue = project_ue(CUBE_UE, CAM_UE, *ROT, ORTHO_CM, RES)
    cube_b = [ue_to_blender(*p) for p in CUBE_UE]
    cam_b = ue_to_blender(*CAM_UE)
    px_b = project_blender(cube_b, cam_b, *ROT, ORTHO_CM / 100.0, RES)
    for a, b in zip(px_ue, px_b):
        assert abs(a[0] - b[0]) < 1.0, (a, b)
        assert abs(a[1] - b[1]) < 1.0, (a, b)


def test_pitch_forward_matches_ue_convention():
    f, r, u = ue_rotation_basis(-20, 0, 0)
    assert abs(f[2] - math.sin(math.radians(-20))) < 1e-9   # 俯视 → forward.z < 0
    assert abs(u[2] - math.cos(math.radians(-20))) < 1e-9


def test_rotation_basis_orthonormal():
    for pitch, yaw, roll in [(0, 0, 0), (-3, -127, -9), (10, 45, 5)]:
        f, r, u = ue_rotation_basis(pitch, yaw, roll)
        for a in (f, r, u):
            assert abs(math.sqrt(sum(x * x for x in a)) - 1.0) < 1e-9
        assert abs(sum(f[i] * r[i] for i in range(3))) < 1e-9
        assert abs(sum(f[i] * u[i] for i in range(3))) < 1e-9


def test_blender_basis_columns_are_right_up_and_minus_forward():
    pitch, yaw, roll = (-3, -127, -9)
    f, r, u = ue_rotation_basis(pitch, yaw, roll)
    br, bu, bz = blender_camera_basis(pitch, yaw, roll)
    assert abs(br[0] - r[0]) < 1e-9 and abs(br[1] + r[1]) < 1e-9 and abs(br[2] - r[2]) < 1e-9
    assert abs(bu[0] - u[0]) < 1e-9 and abs(bu[1] + u[1]) < 1e-9 and abs(bu[2] - u[2]) < 1e-9
    assert abs(bz[0] + f[0]) < 1e-9 and abs(bz[1] - f[1]) < 1e-9 and abs(bz[2] + f[2]) < 1e-9
