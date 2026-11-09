"""Hero prop: wall-mounted 50-inch TV. Kit "tv", 1.1 x 0.08 x 0.65 m (front toward +Y, bottom at z = 0).

Blender -b -P Tools/props/hero_tv.py     (screen image from Tools/props/hero_screens.py first)

Ultra-thin panel with 6 mm black bezel and a gunmetal chin strip with a tiny status LED, thicker electronics
housing on the back (vents, VESA mount plate, wall arm). The screen shows a documentary frame (emissive).
"""
import math
import os
import sys

import bmesh
from mathutils import Matrix

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from hero_common import OUT, _obj, emissive, finish, pbr, reset, rounded_slab  # noqa: E402

W, H = 1.105, 0.645
BEZ = 0.006


def stand_up(ob, y, zc):
    ob.data.transform(Matrix.Rotation(math.radians(-90), 4, "X"))
    ob.data.transform(Matrix.Translation((0, y, zc)))
    return ob


def screen_quad(name, w, h, y, zc, mat):
    bm = bmesh.new()
    vs = [bm.verts.new((x, y, zc + z)) for x, z in ((w / 2, -h / 2), (-w / 2, -h / 2), (-w / 2, h / 2), (w / 2, h / 2))]
    f = bm.faces.new(vs)
    uv = bm.loops.layers.uv.new("UVMap")
    for loop, c in zip(f.loops, ((0, 0), (1, 0), (1, 1), (0, 1))):     # seen from +Y: +x is the viewer's left
        loop[uv].uv = c
    f.normal_update()
    if f.normal.y < 0:
        bmesh.ops.reverse_faces(bm, faces=[f])
    return _obj(name, bm, mat)


reset()
black = pbr("bezel", "#0B0C0D", rough=0.3, metal=0.0, grain=0.02, wear=0.1, dirt=0.15, smudge=0.45, bump=0.03)
gun = pbr("chin", "#3B3E43", rough=0.35, metal=1.0, grain=0.04, wear=0.3, dirt=0.3, scratches=0.2, bump=0.04)
back = pbr("housing", "#1B1C1E", rough=0.6, metal=0.0, grain=0.05, dirt=0.45, bump=0.25, bump_scale=2500.0)
steel = pbr("mount", "#4A4D52", rough=0.45, metal=1.0, grain=0.05, wear=0.3, dirt=0.4, bump=0.08)
led = pbr("led", "#FFFFFF", rough=0.2, metal=0.0, dirt=0.0, bump=0.0)
screen = emissive("screen", os.path.join(OUT, "screens", "tv_documentary.png"), strength=1.6)

zc = H / 2
parts = [stand_up(rounded_slab("panel", W, H, 0.007, 0.004, 0.0015, black, z0=-0.007, seg=4, edge_seg=3), 0.072, zc),
         screen_quad("screen", W - 2 * BEZ, H - 2 * BEZ - 0.008, 0.0722, zc + 0.004, screen),
         stand_up(rounded_slab("chin", W - 0.01, 0.007, 0.002, 0.001, 0.0006, gun, z0=0.0, seg=2, edge_seg=2), 0.0722, 0.0045),
         stand_up(rounded_slab("led", 0.004, 0.0015, 0.0004, 0.0006, 0.0, led, z0=0.0, seg=2), 0.0742, 0.0045),
         stand_up(rounded_slab("housing", W * 0.72, H * 0.6, 0.026, 0.03, 0.008, back, z0=-0.026, seg=6, edge_seg=5),
                  0.065, zc - 0.03)]
for i in range(22):                                            # vent slots on the housing top
    v = rounded_slab("vent", 0.012, 0.004, 0.002, 0.0015, 0.0, steel, z0=0.0, seg=2)
    v.data.transform(Matrix.Translation((-0.25 + i * 0.024, 0.052, zc - 0.03 + H * 0.3 - 0.001)))
    parts.append(v)
parts.append(stand_up(rounded_slab("vesa", 0.24, 0.24, 0.004, 0.01, 0.0015, steel, z0=-0.004, seg=4, edge_seg=2), 0.039, zc))
parts.append(stand_up(rounded_slab("arm", 0.06, 0.3, 0.035, 0.01, 0.004, steel, z0=-0.035, seg=4, edge_seg=3), 0.035, zc))
parts.append(stand_up(rounded_slab("wallplate", 0.12, 0.36, 0.006, 0.01, 0.002, steel, z0=-0.006, seg=4, edge_seg=2), 0.006, zc))

finish("tv", parts, dims=(1.1, 0.08, 0.65), note="front toward +Y, back plate on the wall at y = 0, bottom at z = 0")
