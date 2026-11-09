"""Hero prop: convenience-store checkout counter. Kit "checkout_counter", 1.8 x 0.7 x 0.95 m (customer side +Y).

Blender -b -P Tools/props/hero_checkout_counter.py     (POS screen from Tools/props/hero_screens.py first)

Laminate carcass with a scuffed kick plate, brushed-stainless worktop with a rolled customer edge, POS screen on a
swivel post (emissive till UI), card terminal, handheld scanner in its cradle, receipt printer with a curl of
paper, and a small rack of gum by the customer edge. Customer side (+Y) has the shop's stripe panel.
"""
import math
import os
import sys

import bmesh
from mathutils import Matrix

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from hero_common import OUT, _obj, cylinder, emissive, finish, pbr, reset, rounded_slab, subdivide  # noqa: E402

W, D, H = 1.8, 0.7, 0.95

reset()
lam = pbr("laminate", "#D9D4CA", rough=0.5, metal=0.0, grain=0.05, wear=0.4, dirt=0.5, scratches=0.35, smudge=0.4,
          bump=0.06, scan="white_maple_veneer", scan_size=1.0)
stripe = pbr("stripe", "#2C5E8C", rough=0.4, metal=0.0, grain=0.03, wear=0.4, wear_color="#8FB1CF", dirt=0.4,
             scratches=0.35, bump=0.05)
steel = pbr("worktop", "#C2C5C8", rough=0.3, metal=1.0, grain=0.04, wear=0.3, dirt=0.4, scratches=0.6,
            scratch_scale=25.0, smudge=0.2, bump=0.03)      # heavy smudge reads as stains on metal
kick = pbr("kick", "#3A3C3F", rough=0.45, metal=1.0, grain=0.04, wear=0.6, dirt=0.7, scratches=0.6, bump=0.08)
plastic = pbr("device", "#1D1F22", rough=0.45, metal=0.0, grain=0.03, wear=0.3, dirt=0.4, smudge=0.6, bump=0.04)
paper = pbr("paper", "#F4F2EC", rough=0.8, metal=0.0, dirt=0.2, bump=0.1)
gum = pbr("gum", "#E04848", rough=0.35, metal=0.0, grain=0.2, wear=0.2, dirt=0.3, bump=0.05)
screen = emissive("screen", os.path.join(OUT, "screens", "pos_ui.png"), strength=1.3)


def box(name, w, d, h, x, y, z, mat, r=0.003, seg=3):
    return rounded_slab(name, w, d, h, r, r, mat, z0=z, seg=seg, edge_seg=seg, loc=(x, y))


def screen_quad(w, h, mat):
    bm = bmesh.new()
    vs = [bm.verts.new((x, 0, z)) for x, z in ((-w / 2, -h / 2), (w / 2, -h / 2), (w / 2, h / 2), (-w / 2, h / 2))]
    f = bm.faces.new(vs)
    uv = bm.loops.layers.uv.new("UVMap")
    for loop, c in zip(f.loops, ((0, 0), (1, 0), (1, 1), (0, 1))):     # faces the cashier (-Y): +x is the viewer's right
        loop[uv].uv = c
    f.normal_update()
    if f.normal.y > 0:
        bmesh.ops.reverse_faces(bm, faces=[f])
    return _obj("screen", bm, mat)


parts = []
parts.append(box("carcass", W, D - 0.05, H - 0.1 - 0.03, 0, -0.025, 0.1, lam, r=0.004))
parts.append(box("kick", W - 0.02, D - 0.1, 0.1, 0, -0.04, 0.0, kick, r=0.003))
parts.append(box("stripe", W - 0.02, 0.012, 0.18, 0, D / 2 - 0.044, 0.55, stripe, r=0.004))
top = box("worktop", W + 0.02, D, 0.03, 0, 0, H - 0.03, steel, r=0.006, seg=5)
subdivide(top, 4)
parts.append(top)
parts.append(cylinder("edge", 0.016, W + 0.02, steel, loc=(0, 0, 0), seg=40))       # rolled customer edge
parts[-1].data.transform(Matrix.Rotation(math.radians(90), 4, "Y"))
parts[-1].data.transform(Matrix.Translation((-(W + 0.02) / 2, D / 2 - 0.01, H - 0.016)))

# POS on a swivel post near the cashier side, screen facing the cashier (-Y)
px, py = -0.45, -0.18
parts.append(cylinder("pos_base", 0.09, 0.02, plastic, loc=(px, py, H), seg=48, r_edge=0.006))
parts.append(cylinder("pos_post", 0.018, 0.22, steel, loc=(px, py, H + 0.02), seg=32))
sc = box("pos_shell", 0.36, 0.04, 0.23, 0, 0, -0.115, plastic, r=0.012, seg=4)
q = screen_quad(0.33, 0.2, screen)
q.data.transform(Matrix.Translation((0, -0.0205, 0)))
for ob in (sc, q):
    ob.data.transform(Matrix.Rotation(math.radians(-12), 4, "X"))
    ob.data.transform(Matrix.Translation((px, py, H + 0.33)))
    parts.append(ob)
# card terminal angled toward the customer
ct = box("card_terminal", 0.08, 0.16, 0.035, 0, 0, 0, plastic, r=0.01, seg=4)
ck = box("card_keys", 0.06, 0.07, 0.004, 0, -0.035, 0.035, paper, r=0.004, seg=3)
for ob in (ct, ck):
    ob.data.transform(Matrix.Rotation(math.radians(-25), 4, "X"))
    ob.data.transform(Matrix.Translation((0.05, D / 2 - 0.16, H + 0.01)))
    parts.append(ob)
# scanner in cradle
parts.append(box("cradle", 0.08, 0.1, 0.05, 0.3, -0.15, H, plastic, r=0.012, seg=4))
sg = box("scanner_head", 0.07, 0.09, 0.05, 0, 0, 0, plastic, r=0.015, seg=5)
sh = box("scanner_grip", 0.035, 0.035, 0.12, 0, -0.02, -0.11, plastic, r=0.012, seg=5)
for ob in (sg, sh):
    ob.data.transform(Matrix.Rotation(math.radians(30), 4, "X"))
    ob.data.transform(Matrix.Translation((0.3, -0.13, H + 0.11)))
    parts.append(ob)
# receipt printer with paper curl
parts.append(box("printer", 0.14, 0.18, 0.13, 0.62, -0.18, H, plastic, r=0.015, seg=4))
curl = box("receipt", 0.08, 0.002, 0.12, 0.62, -0.09, H + 0.13, paper, r=0.0005, seg=1)
for v in curl.data.vertices:
    t = (v.co.z - (H + 0.13)) / 0.12
    v.co.y += 0.04 * t * t
parts.append(curl)
# gum rack at the customer edge
for i in range(4):
    for j in range(2):
        parts.append(box("gum", 0.06, 0.02, 0.09, -0.75 + i * 0.07, D / 2 - 0.08 - j * 0.03, H, gum, r=0.004))

finish("checkout_counter", parts, dims=(W, D, H), note="customer side toward +Y; cashier side -Y")
