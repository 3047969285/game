"""Hero prop: desktop monitor on a stand. Kit "monitor", 0.55 x 0.2 x 0.35 m (front toward +Y).

Blender -b -P Tools/props/hero_monitor.py     (screen image from Tools/props/hero_screens.py first)

Parts: 3 mm-bezel panel with matte front, display (desktop + document + chat), back housing with a vent
grid and a status LED, round neck, oval base plate with a rubber foot ring and cable hole.
"""
import math
import os
import sys

import bmesh
from mathutils import Matrix

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from hero_common import OUT, _obj, _rounded_outline, cylinder, emissive, finish, pbr, reset, rounded_slab, subdivide  # noqa: E402

PW, PH, PT = 0.548, 0.318, 0.012           # panel width, height, thickness
ZC = 0.032 + PH / 2                        # panel centre height above the desk
BEZ = 0.0035


def stand_up(ob, y, z):
    """Slabs are built lying in x/y; rotate to stand in the x/z plane with the face toward +Y."""
    ob.data.transform(Matrix.Rotation(math.radians(-90), 4, "X"))
    ob.data.transform(Matrix.Translation((0, y, z)))
    return ob


def screen_quad(name, w, h, material):
    bm = bmesh.new()
    # seen from the front (+Y) +x is the viewer's left, so the image's left edge (u = 0) sits at +x
    vs = [bm.verts.new((x, 0, z)) for x, z in ((w / 2, -h / 2), (-w / 2, -h / 2), (-w / 2, h / 2), (w / 2, h / 2))]
    f = bm.faces.new(vs)
    uv = bm.loops.layers.uv.new("UVMap")
    for loop, c in zip(f.loops, ((0, 0), (1, 0), (1, 1), (0, 1))):
        loop[uv].uv = c
    f.normal_update()
    if f.normal.y < 0:
        bmesh.ops.reverse_faces(bm, faces=[f])
    return _obj(name, bm, material)


reset()
shell = pbr("shell", "#24272C", rough=0.55, metal=0.0, grain=0.08, wear=0.2, dirt=0.35, scratches=0.15, smudge=0.12,
            bump=0.15, bump_scale=1500.0)
bezel = pbr("bezel", "#0C0D0F", rough=0.35, metal=0.0, grain=0.03, wear=0.1, dirt=0.2, smudge=0.4, bump=0.05)
alu = pbr("stand", "#A9AEB5", rough=0.33, metal=1.0, grain=0.06, wear=0.45, dirt=0.35, scratches=0.35, smudge=0.3,
          bump=0.1, bump_scale=1100.0)
rubber = pbr("rubber", "#151617", rough=0.85, metal=0.0, grain=0.05, dirt=0.4, bump=0.3, bump_scale=600.0)
led = pbr("led", "#F2F6FF", rough=0.2, metal=0.0, grain=0.0, dirt=0.0, bump=0.0)
screen = emissive("screen", os.path.join(OUT, "screens", "monitor_desk.png"), strength=1.4)

parts = []
# panel: back housing (thicker in the middle), front bezel frame, display
parts.append(stand_up(rounded_slab("housing", PW, PH, PT, 0.010, 0.004, shell, z0=-PT, edge_seg=6), 0.0, ZC))
parts.append(stand_up(rounded_slab("hump", 0.26, 0.16, 0.022, 0.03, 0.008, shell, z0=-PT - 0.020, edge_seg=6), 0.0, ZC - 0.02))
parts.append(stand_up(rounded_slab("bezel", PW - 0.001, PH - 0.001, 0.0016, 0.0095, 0.0006, bezel, z0=0.0, edge_seg=4), 0.0, ZC))
disp = screen_quad("screen", PW - 2 * BEZ, PH - 2 * BEZ - 0.012, screen)
disp.data.transform(Matrix.Translation((0, 0.00165, ZC + 0.006)))
parts.append(disp)
parts.append(stand_up(rounded_slab("chin", 0.03, 0.0035, 0.0003, 0.0015, 0.0, led, z0=0.0016), 0.0, ZC - PH / 2 + 0.006))
# vent grid on the back hump
for i in range(14):
    v = rounded_slab("vent", 0.0028, 0.05, 0.0012, 0.0012, 0.0, rubber, z0=0.0)
    stand_up(v, 0, 0)
    v.data.transform(Matrix.Translation((-0.04 + i * 0.006, -PT - 0.0205, ZC + 0.02)))
    parts.append(v)
# neck: round column from the base to the hump, base: oval plate with a foot ring and cable hole
neck_y = -PT - 0.034
parts.append(cylinder("neck", 0.016, ZC - 0.006, alu, loc=(0, neck_y, 0.006), seg=72, r_edge=0.002))
base = rounded_slab("base", 0.24, 0.17, 0.0075, 0.08, 0.0025, alu, z0=0.0015, loc=(0, neck_y + 0.02), edge_seg=6)
subdivide(base, 2)
parts.append(base)
parts.append(rounded_slab("foot", 0.226, 0.156, 0.0015, 0.074, 0.0005, rubber, z0=0.0, loc=(0, neck_y + 0.02)))
parts.append(cylinder("cablehole", 0.009, 0.004, rubber, loc=(0, neck_y - 0.002, 0.0255), seg=48, r_edge=0.001, axis="Y"))

finish("monitor", parts, dims=(0.55, 0.2, 0.35), note="front toward +Y, base on z = 0")
