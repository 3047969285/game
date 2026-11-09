"""Hero prop: wool rug. Kit "rug", 2.6 x 1.8 x 0.01 m.

Blender -b -P Tools/props/hero_rug.py     (design from Tools/props/hero_textures.py first)

A 9 mm pile slab carrying the printed design (bump = pile), slightly sagging edges, and cotton fringe tassels
on both short ends with random length / droop so they do not read as a comb.
"""
import math
import os
import random
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from hero_common import OUT, cylinder, finish, pbr, reset, rounded_slab, subdivide  # noqa: E402
from mathutils import Matrix  # noqa: E402

W, L, T = 2.6, 1.8, 0.009

reset()
wool = pbr("wool", "#808080", rough=0.92, metal=0.0, grain=0.1, grain_scale=30.0, dirt=0.2, bump=0.9, bump_scale=2200.0,
           rough_var=0.05, image=os.path.join(OUT, "designs", "rug_indigo.png"), image_size=(W, L))
cotton = pbr("fringe", "#DCD3C2", rough=0.9, metal=0.0, grain=0.15, dirt=0.45, bump=0.4, bump_scale=3000.0)

parts = []
body = rounded_slab("rug", W, L, T, 0.012, 0.004, wool, z0=0.0, seg=6, edge_seg=3)
subdivide(body, 6)
for v in body.data.vertices:                      # edges settle onto the floor, centre pile stays full
    e = min(W / 2 - abs(v.co.x), L / 2 - abs(v.co.y))
    if v.co.z > T / 2:
        v.co.z -= 0.0025 * math.exp(-e / 0.03)
parts.append(body)

rnd = random.Random(11)
for side in (-1, 1):
    y = -L / 2 + 0.03
    while y < L / 2 - 0.03:
        ln = 0.055 + rnd.uniform(-0.012, 0.012)
        t = cylinder("tassel", 0.0016, ln, cotton, loc=(0, 0, 0), seg=6)
        t.data.transform(Matrix.Rotation(math.radians(90), 4, "Y"))            # lay along x
        t.data.transform(Matrix.Rotation(math.radians(rnd.uniform(-6, 6)), 4, "Z"))
        x0 = side * (W / 2) + (0 if side > 0 else 0)
        t.data.transform(Matrix.Translation((x0 if side > 0 else x0 - ln, y, 0.0017)))
        parts.append(t)
        y += 0.011 + rnd.uniform(-0.002, 0.002)

finish("rug", parts, dims=(W, L, 0.01), note="design projected from designs/rug_indigo.png")
