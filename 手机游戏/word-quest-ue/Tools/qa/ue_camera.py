"""D15 相机/坐标换算：UE（cm，X 朝前、Z 朝上）↔ Blender（m，-Y 朝前、Z 朝上）。

约定（任务书）：UE (x, y, z) cm = Blender (100x, −100y, 100z)
相机：UE 视线 +X、上 +Z；Blender 相机视线 −Z、上 +Y。
所有函数只用 math，方便在 Blender 与 pytest 中共用。
"""
from __future__ import annotations

import math

Vec3 = tuple[float, float, float]


def ue_to_blender(x: float, y: float, z: float) -> Vec3:
    return (x / 100.0, -y / 100.0, z / 100.0)


def blender_to_ue(x: float, y: float, z: float) -> Vec3:
    return (x * 100.0, -y * 100.0, z * 100.0)


def _matmul(a, b):
    return [[sum(a[i][k] * b[k][j] for k in range(3)) for j in range(3)] for i in range(3)]


def _rot_x(d: float):
    c, s = math.cos(math.radians(d)), math.sin(math.radians(d))
    return [[1, 0, 0], [0, c, -s], [0, s, c]]


def _rot_y(d: float):
    c, s = math.cos(math.radians(d)), math.sin(math.radians(d))
    return [[c, 0, s], [0, 1, 0], [-s, 0, c]]


def _rot_z(d: float):
    c, s = math.cos(math.radians(d)), math.sin(math.radians(d))
    return [[c, -s, 0], [s, c, 0], [0, 0, 1]]


def ue_rotation_basis(pitch: float, yaw: float, roll: float):
    """返回 (forward, right, up) 三个 UE 方向向量；R = Rz(yaw)·Ry(pitch)·Rx(roll)。"""
    # UE 的 pitch 正方向 = 抬头（forward.z = sin(pitch)）；
    # 标准 Ry(pitch) 得到 forward.z = -sin(pitch)，所以这里用 -pitch。
    r = _matmul(_matmul(_rot_z(yaw), _rot_y(-pitch)), _rot_x(roll))
    def col(j):
        return (r[0][j], r[1][j], r[2][j])
    return col(0), col(1), col(2)   # +X forward, +Y right, +Z up


def blender_camera_basis(pitch: float, yaw: float, roll: float):
    """UE 相机旋转 → Blender 相机局部轴（列：X=right, Y=up, Z=-view）。Y 轴取反。"""
    f, r, u = ue_rotation_basis(pitch, yaw, roll)
    f = (f[0], -f[1], f[2])
    r = (r[0], -r[1], r[2])
    u = (u[0], -u[1], u[2])
    return r, u, (-f[0], -f[1], -f[2])


def _dot(a: Vec3, b: Vec3) -> float:
    return a[0] * b[0] + a[1] * b[1] + a[2] * b[2]


def _sub(a: Vec3, b: Vec3) -> Vec3:
    return (a[0] - b[0], a[1] - b[1], a[2] - b[2])


def project(points, cam_loc, right, up, forward, ortho_width: float, resolution: int):
    """正交投影：返回像素坐标列表 [(px, py), ...]，原点左上角。depth = dot(rel, forward)。"""
    out = []
    half = resolution / 2.0
    for p in points:
        rel = _sub(p, cam_loc)
        x = _dot(rel, right)
        y = _dot(rel, up)
        out.append((half + x / ortho_width * resolution, half - y / ortho_width * resolution))
    return out


def project_ue(points_cm, cam_loc_cm, pitch, yaw, roll, ortho_width_cm: float, resolution: int):
    f, r, u = ue_rotation_basis(pitch, yaw, roll)
    return project(points_cm, cam_loc_cm, r, u, f, ortho_width_cm, resolution)


def project_blender(points_m, cam_loc_m, pitch, yaw, roll, ortho_scale_m: float, resolution: int):
    r, u, z = blender_camera_basis(pitch, yaw, roll)
    f = (-z[0], -z[1], -z[2])   # 视线 = -Z
    return project(points_m, cam_loc_m, r, u, f, ortho_scale_m, resolution)


def parse_ue_struct(text: str) -> Vec3:
    """解析 capture.json 里 '<Struct ...> {x: .., y: .., z: ..}' 或 {pitch:..,yaw:..,roll:..}。"""
    def grab(key):
        import re
        m = re.search(rf"{key}:\s*(-?[\d.]+)", text)
        if not m:
            raise ValueError(f"missing {key} in {text}")
        return float(m.group(1))
    if "pitch" in text:
        return (grab("pitch"), grab("yaw"), grab("roll"))
    return (grab("x"), grab("y"), grab("z"))
