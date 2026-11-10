"""Build the Unit 1 living-room linen curtains as a final, high-density hero prop.

Run only while Unreal is closed (16 GB shared-memory workstation):
  /Applications/Blender.app/Contents/MacOS/Blender -b -P Tools/props/hero_curtains.py

The paired panels use the local X/Z plane; local +Y faces the camera and becomes room-facing
after the room dressing's 90-degree yaw. Linen uses the project's Poly Haven CC0 rough_linen
maps, baked by hero_common into 2K BaseColor, OpenGL Normal, and ORM textures.
"""
import math
import os
import sys

import bpy
import bmesh

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from hero_common import cylinder, finish, pbr, reset, rounded_slab  # noqa: E402

HEIGHT = 2.40
TOP_Z = 0.025
ROD_Z = 2.48
ROD_Y = 0.105
GRID_U = 176
GRID_V = 160
PANELS = (
    {"side": -1, "centre": -1.08, "width": 0.82},
    {"side": 1, "centre": 1.08, "width": 0.82},
)


def cloth_point(panel, t, v, front_offset=0.0):
    """Sample a soft, gathered linen panel in local metres."""
    side = panel["side"]
    gather = math.exp(-((v - 0.45) / 0.075) ** 2)
    header = math.exp(-((v - 0.94) / 0.105) ** 2)
    width = panel["width"] * (1.0 - 0.20 * gather)
    x = panel["centre"] + (t - 0.5) * width + side * 0.06 * gather
    phase = 2.0 * math.pi * 11.0 * t + 0.28 * math.sin(2.0 * math.pi * v + side * 0.3)
    fold = math.cos(phase)
    pleat = 0.030 + 0.018 * gather + 0.012 * header + 0.007 * (1.0 - v)
    y = ROD_Y - 0.018 + pleat * fold + 0.006 * math.sin(phase * 0.48 + v * 2.0)
    y += front_offset
    z = TOP_Z + HEIGHT * v + 0.004 * math.sin(phase * 0.4) * math.sin(math.pi * v)
    return (x, y, z)


def _mesh_object(name, vertices, faces, material, smooth=True):
    mesh = bpy.data.meshes.new(name + "_Mesh")
    mesh.from_pydata(vertices, [], faces)
    mesh.update()
    bm = bmesh.new()
    bm.from_mesh(mesh)
    bmesh.ops.recalc_face_normals(bm, faces=bm.faces)
    bm.to_mesh(mesh)
    bm.free()
    obj = bpy.data.objects.new(name, mesh)
    bpy.context.collection.objects.link(obj)
    obj.data.materials.append(material)
    if smooth:
        for poly in obj.data.polygons:
            poly.use_smooth = True
    return obj


def _sphere(name, radius, loc, material, scale=(1.0, 1.0, 1.0)):
    bpy.ops.mesh.primitive_uv_sphere_add(segments=40, ring_count=24, radius=radius, location=loc)
    obj = bpy.context.object
    obj.name = name
    obj.scale = scale
    bpy.ops.object.transform_apply(location=False, rotation=False, scale=True)
    obj.data.materials.append(material)
    for poly in obj.data.polygons:
        poly.use_smooth = True
    return obj


def _torus(name, major_radius, minor_radius, loc, material, rotation=(0.0, 0.0, 0.0)):
    bpy.ops.mesh.primitive_torus_add(major_segments=48, minor_segments=12,
                                     major_radius=major_radius, minor_radius=minor_radius,
                                     location=loc, rotation=rotation)
    obj = bpy.context.object
    obj.name = name
    obj.data.materials.append(material)
    for poly in obj.data.polygons:
        poly.use_smooth = True
    return obj


def _cloth_shell(panel, material, index):
    """Closed front/back textile shell with dense, smoothly varying gravity folds."""
    columns, rows = GRID_U, GRID_V
    count = (columns + 1) * (rows + 1)
    vertices = []
    for offset in (0.0, -0.012):
        for j in range(rows + 1):
            v = j / rows
            for i in range(columns + 1):
                vertices.append(cloth_point(panel, i / columns, v, offset))

    faces = []
    def idx(j, i, back=False):
        return (count if back else 0) + j * (columns + 1) + i

    for j in range(rows):
        for i in range(columns):
            a, b = idx(j, i), idx(j, i + 1)
            c, d = idx(j + 1, i + 1), idx(j + 1, i)
            # Local +Y is the visible room-facing side.
            faces.append((a, d, c, b))
            a, b = idx(j, i, True), idx(j, i + 1, True)
            c, d = idx(j + 1, i + 1, True), idx(j + 1, i, True)
            faces.append((a, b, c, d))
    for i in range(columns):
        faces.append((idx(0, i), idx(0, i, True), idx(0, i + 1, True), idx(0, i + 1)))
        faces.append((idx(rows, i), idx(rows, i + 1), idx(rows, i + 1, True), idx(rows, i, True)))
    for j in range(rows):
        faces.append((idx(j, 0), idx(j + 1, 0), idx(j + 1, 0, True), idx(j, 0, True)))
        faces.append((idx(j, columns), idx(j, columns, True), idx(j + 1, columns, True), idx(j + 1, columns)))
    return _mesh_object(f"curtain_panel_{index}", vertices, faces, material)


def _front_strip(panel, name, material, t0, t1, v0, v1, offset=0.014, u_steps=176, v_steps=10):
    """A stitched, gently raised fabric strip sampled directly from the curtain surface."""
    vertices, faces = [], []
    for j in range(v_steps + 1):
        v = v0 + (v1 - v0) * j / v_steps
        for i in range(u_steps + 1):
            t = t0 + (t1 - t0) * i / u_steps
            vertices.append(cloth_point(panel, t, v, offset))
    for j in range(v_steps):
        for i in range(u_steps):
            a = j * (u_steps + 1) + i
            b, c, d = a + 1, a + u_steps + 2, a + u_steps + 1
            faces.append((a, d, c, b))
    return _mesh_object(name, vertices, faces, material)


def _tab(panel, name, material, t, index):
    """Short linen hanger tab connects each curtain header to its metal eyelet."""
    cx, cy, _ = cloth_point(panel, t, 0.99, 0.004)
    half = 0.021
    z0, z1 = 2.395, 2.465
    vertices = [
        (cx - half, cy, z0), (cx + half, cy, z0),
        (cx - half, cy, z1), (cx + half, cy, z1),
    ]
    faces = [(0, 2, 3, 1)]
    return _mesh_object(f"{name}_{index}", vertices, faces, material, smooth=False)


def build():
    reset()
    linen = pbr("linen", "#D9C9A9", rough=0.91, grain=0.03, dirt=0.22, bump=0.06,
                scan="rough_linen", scan_size=0.28, scan_tint="#F2DFA8")
    tieback = pbr("tieback", "#A18E6E", rough=0.88, grain=0.02, dirt=0.18, bump=0.05,
                  scan="rough_linen", scan_size=0.22, scan_tint="#E2CF9F")
    hardware = pbr("hardware", "#625A4F", rough=0.32, metal=0.82, grain=0.025,
                   wear=0.26, dirt=0.18, scratches=0.20, bump=0.025)

    for index, panel in enumerate(PANELS):
        _cloth_shell(panel, linen, index)
        _front_strip(panel, f"curtain_top_header_{index}", linen, 0.0, 1.0, 0.945, 0.995, offset=0.004)
        _front_strip(panel, f"curtain_bottom_weighted_hem_{index}", linen, 0.0, 1.0, 0.0, 0.055,
                     offset=0.004, v_steps=12)
        _front_strip(panel, f"curtain_tieback_{index}", tieback, 0.0, 1.0, 0.434, 0.466,
                     offset=0.004, v_steps=8)
        for t in (0.08, 0.205, 0.33, 0.455, 0.58, 0.705, 0.83, 0.955):
            _tab(panel, f"curtain_hanger_{index}", linen, t, round(t * 1000))
            x, _, _ = cloth_point(panel, t, 0.99)
            _torus("curtain_eyelet", 0.022, 0.0026, (x, ROD_Y, ROD_Z), hardware,
                   rotation=(0.0, math.radians(90), 0.0))

    # Powder-coated rod, decorative end caps, and three compact wall brackets.
    rod = cylinder("curtain_rod", 0.014, 3.28, hardware, loc=(-1.64, ROD_Y, ROD_Z),
                   seg=48, r_edge=0.003, edge_seg=4, axis="X")
    for side in (-1, 1):
        _sphere("curtain_finial", 0.041, (side * 1.68, ROD_Y, ROD_Z), hardware,
                scale=(1.0, 0.92, 0.92))
    for x in (-1.22, 0.0, 1.22):
        rounded_slab("curtain_mount_plate", 0.075, 0.014, 0.12, 0.008, 0.004, hardware,
                     z0=2.405, loc=(x, 0.014), seg=6, edge_seg=4)
        cylinder("curtain_bracket_arm", 0.009, 0.105, hardware,
                 loc=(x, 0.025, ROD_Z), seg=24, r_edge=0.002, axis="Y")

    return finish("curtains", list(bpy.context.scene.objects),
                  dims=(3.38, 0.20, 2.52),
                  note="paired floor-length linen panels with shaped folds, stitched hems, gathered tie-bands, rings, powder-coated rod and brackets; local +Y is room-facing")


if __name__ == "__main__":
    try:
        build()
    except Exception:
        import traceback
        traceback.print_exc()
        sys.stderr.flush()
        sys.exit(1)
