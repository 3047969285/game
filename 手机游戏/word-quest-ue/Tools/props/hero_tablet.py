"""Hero prop: tablet (lying screen-up). Kit "tablet", 0.18 x 0.25 x 0.008 m.

Blender -b -P Tools/props/hero_tablet.py      (screen image from Tools/props/hero_screens.py first)

Parts: aluminium unibody with chamfered edge, front glass with fingerprints, reading-app display under a 7 mm
bezel, single-lens camera plateau, top button, volume buttons, USB-C port, speaker grilles on both short sides.
"""
import math
import os
import sys

import bmesh
import bpy
from mathutils import Matrix

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from hero_common import OUT, _obj, _rounded_outline, cylinder, emissive, finish, pbr, reset, rounded_slab  # noqa: E402

W, L, T = 0.1785, 0.2477, 0.0061
RC, RE = 0.0185, 0.0009
BUMP = 0.0011


def screen_quad(name, w, l, r, z, material, seg=18):
    bm = bmesh.new()
    vs = [bm.verts.new((x, y, z)) for x, y in _rounded_outline(w, l, r, seg)]
    f = bm.faces.new(vs)
    uv = bm.loops.layers.uv.new("UVMap")
    for loop in f.loops:
        loop[uv].uv = (loop.vert.co.x / w + 0.5, loop.vert.co.y / l + 0.5)
    bmesh.ops.triangulate(bm, faces=[f], ngon_method="EAR_CLIP")
    return _obj(name, bm, material)


reset()
alu = pbr("body", "#B9BEC4", rough=0.38, metal=1.0, grain=0.06, wear=0.5, dirt=0.25, scratches=0.3,
          scratch_scale=45.0, smudge=0.4, bump=0.12, bump_scale=1200.0)
front = pbr("frontglass", "#040507", rough=0.05, metal=0.0, grain=0.02, dirt=0.05, scratches=0.15,
            scratch_scale=60.0, smudge=0.9, bump=0.02, rough_var=0.03)
lens_glass = pbr("lens", "#05070C", rough=0.04, metal=0.0, grain=0.0, dirt=0.0, smudge=0.2, bump=0.0, rough_var=0.02)
ring = pbr("lensring", "#C4C9CF", rough=0.2, metal=1.0, grain=0.05, wear=0.4, dirt=0.4, scratches=0.2, bump=0.05)
dark = pbr("port", "#0B0C0E", rough=0.65, metal=0.0, grain=0.05, dirt=0.6, bump=0.1)
screen = emissive("screen", os.path.join(OUT, "screens", "tablet_reader.png"), strength=1.3)

parts = [rounded_slab("body", W, L, T - 0.0007, RC, RE, alu, z0=0.0, edge_seg=8),
         rounded_slab("frontglass", W - 0.0008, L - 0.0008, 0.0008, RC - 0.0004, 0.0003, front, z0=T - 0.0008, edge_seg=5)]
parts.append(screen_quad("screen", W - 0.014, L - 0.014, RC - 0.007, T + 0.00002, screen))
# buttons: top (short side +y), volume on the long side +x
parts.append(rounded_slab("button", 0.019, 0.0011, 0.0027, 0.0005, 0.0003, alu, z0=T / 2 - 0.00135,
                          loc=(W / 2 - 0.035, L / 2 + 0.0004)))
for y in (L / 2 - 0.040, L / 2 - 0.058):
    parts.append(rounded_slab("button", 0.0011, 0.0135, 0.0027, 0.0005, 0.0003, alu, z0=T / 2 - 0.00135,
                              loc=(W / 2 + 0.0004, y)))


def on_short_side(ob, x, z, side):
    ob.data.transform(Matrix.Rotation(math.radians(90), 4, "X"))
    ob.data.transform(Matrix.Translation((x, side * (L / 2 - 0.0003), z)))
    return ob


parts.append(on_short_side(rounded_slab("port", 0.0089, 0.0031, 0.0006, 0.00155, 0.0, dark, z0=-0.0003), 0.0, T / 2, -1))
for side in (-1, 1):
    for i in range(7):
        for sx in (-1, 1):
            h = cylinder("grille", 0.00045, 0.0006, dark, loc=(0, 0, -0.0003), seg=20)
            parts.append(on_short_side(h, sx * (0.045 + i * 0.0021), T / 2, side))

# camera plateau (back, -z) near the top-left corner
cx, cy = -W / 2 + 0.016, L / 2 - 0.016
parts.append(rounded_slab("plateau", 0.0145, 0.0145, BUMP, 0.0055, 0.0004, alu, z0=-BUMP + 0.0002, loc=(cx, cy)))
parts.append(cylinder("ring", 0.0047, 0.0008, ring, loc=(cx, cy, -BUMP - 0.0006), seg=64, r_edge=0.0002))
parts.append(cylinder("lens", 0.0035, 0.0004, lens_glass, loc=(cx, cy, -BUMP - 0.00065), seg=64, r_edge=0.00015))

# rest on the table, tilted onto the camera plateau
lowest = -BUMP - 0.0006
tilt = math.atan2(-lowest, cy - (-L / 2))
for p in parts:
    p.data.transform(Matrix.Translation((0, 0, -lowest)))
    p.data.transform(Matrix.Translation((0, -L / 2, 0)) @ Matrix.Rotation(-tilt, 4, "X") @ Matrix.Translation((0, L / 2, 0)))

finish("tablet", parts, dims=(0.18, 0.25, 0.008), note="lying screen-up, tilted onto the camera plateau")
