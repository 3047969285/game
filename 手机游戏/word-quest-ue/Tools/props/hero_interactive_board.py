"""Hero prop: classroom interactive display. Kit "interactive_board", 3.0 x 0.1 x 1.7 m (front toward +Y).

Blender -b -P Tools/props/hero_interactive_board.py     (slide from Tools/props/hero_textures.py first)

86-inch-class touch panel showing the lesson slide (emissive), thin black bezel, front speaker bars on both
sides behind perforated grilles, pen tray with two styluses, side I/O panel and wall bracket.
"""
import math
import os
import sys

import bmesh
from mathutils import Matrix

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from hero_common import OUT, _obj, cylinder, emissive, finish, pbr, reset, rounded_slab  # noqa: E402

W, H = 3.0, 1.7
PW, PH = 2.68, 1.51                     # display area (16:9, 120"-class wall display)
SPK = (W - PW - 0.12) / 2               # speaker bar width each side

reset()
bezel = pbr("bezel", "#141517", rough=0.3, metal=0.0, grain=0.02, wear=0.1, dirt=0.2, smudge=0.6, bump=0.03)
grille = pbr("grille", "#2B2D30", rough=0.55, metal=0.4, grain=0.05, dirt=0.4, bump=0.6, bump_scale=900.0)
alu = pbr("trim", "#8E9297", rough=0.35, metal=1.0, grain=0.04, wear=0.4, dirt=0.4, scratches=0.3, bump=0.05)
pen = pbr("stylus", "#E8E8E6", rough=0.35, metal=0.0, wear=0.2, dirt=0.4, smudge=0.4, bump=0.02)
screen = emissive("screen", os.path.join(OUT, "designs", "smartboard_slide.png"), strength=1.3)


def stand(ob, y, zc):
    ob.data.transform(Matrix.Rotation(math.radians(-90), 4, "X"))
    ob.data.transform(Matrix.Translation((0, y, zc)))
    return ob


def screen_quad(w, h, y, zc, mat):
    bm = bmesh.new()
    vs = [bm.verts.new((x, y, zc + z)) for x, z in ((w / 2, -h / 2), (-w / 2, -h / 2), (-w / 2, h / 2), (w / 2, h / 2))]
    f = bm.faces.new(vs)
    uv = bm.loops.layers.uv.new("UVMap")
    for loop, c in zip(f.loops, ((0, 0), (1, 0), (1, 1), (0, 1))):     # seen from +Y, +x is the viewer's left
        loop[uv].uv = c
    f.normal_update()
    if f.normal.y < 0:
        bmesh.ops.reverse_faces(bm, faces=[f])
    return _obj("screen", bm, mat)


zc = 0.07 + (PH + 0.06) / 2               # pen tray below, camera bar on top keep the total near H
parts = [stand(rounded_slab("panel", PW + 0.06, PH + 0.06, 0.07, 0.01, 0.006, bezel, z0=-0.07, seg=4, edge_seg=4), 0.08, zc),
         screen_quad(PW, PH, 0.0802, zc, screen)]
for sx in (-1, 1):
    x = sx * (PW / 2 + 0.03 + SPK / 2 + 0.03)
    s = stand(rounded_slab("speaker", SPK, PH + 0.06, 0.06, 0.012, 0.008, grille, z0=-0.06, seg=4, edge_seg=4), 0.075, zc)
    s.data.transform(Matrix.Translation((x, 0, 0)))
    parts.append(s)
    t = stand(rounded_slab("speaker_trim", SPK + 0.01, 0.012, 0.062, 0.004, 0.003, alu, z0=-0.062, seg=3, edge_seg=2), 0.076, zc - PH / 2 - 0.035)
    t.data.transform(Matrix.Translation((x, 0, 0)))
    parts.append(t)
# pen tray under the display with two styluses
parts.append(rounded_slab("pen_tray", 0.5, 0.06, 0.012, 0.006, 0.004, alu, z0=zc - PH / 2 - 0.05, loc=(0.6, 0.1), seg=3, edge_seg=2))
for dx in (-0.06, 0.04):
    p = cylinder("pen", 0.0055, 0.15, pen, loc=(0, 0, 0), seg=24, r_edge=0.002)
    p.data.transform(Matrix.Rotation(math.radians(90), 4, "Y"))
    p.data.transform(Matrix.Translation((0.6 + dx - 0.07, 0.1, zc - PH / 2 - 0.032)))
    parts.append(p)
# camera / microphone bar on top
parts.append(stand(rounded_slab("camera_bar", 0.42, 0.06, 0.05, 0.02, 0.01, bezel, z0=-0.05, seg=4, edge_seg=3), 0.085, zc + (PH + 0.06) / 2 + 0.03))
parts.append(cylinder("lens", 0.012, 0.004, alu, loc=(0, 0, 0), seg=32))
parts[-1].data.transform(Matrix.Rotation(math.radians(-90), 4, "X"))
parts[-1].data.transform(Matrix.Translation((0, 0.087, zc + (PH + 0.06) / 2 + 0.03)))
# wall bracket
parts.append(stand(rounded_slab("bracket", 0.8, 0.5, 0.012, 0.01, 0.003, alu, z0=-0.012, seg=3, edge_seg=2), 0.012, zc))

finish("interactive_board", parts, dims=(W, 0.1, H), note="front toward +Y, bottom at z = 0")
