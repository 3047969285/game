"""Hero prop: kitchen base-cabinet run with worktop. Kit "kitchen_counter", 2.4 x 0.65 x 0.92 m (front toward +Y).

Blender -b -P Tools/props/hero_kitchen_counter.py

Matte sage lacquered fronts (two doors, a 3-drawer stack, two doors) with 3 mm shadow gaps and brushed-steel
bar handles, recessed dark toe kick, 30 mm speckled quartz worktop with eased edges and a 20 mm overhang.
Wear: edge chips on the fronts near the handles, grime in the gaps, water rings / smudges on the top.
"""
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from hero_common import finish, pbr, reset, rounded_slab, subdivide  # noqa: E402

W, D, H = 2.4, 0.65, 0.92
TOP, KICK, GAP = 0.03, 0.1, 0.003
CD = D - 0.02 - 0.02                        # carcass depth (top overhang 20 mm)

reset()
quartz = pbr("quartz", "#DAD6CE", rough=0.22, metal=0.0, grain=0.35, grain_scale=1500.0, wear=0.15, dirt=0.15,
             scratches=0.2, scratch_scale=25.0, smudge=0.6, bump=0.04, bump_scale=3000.0, rough_var=0.08)
sage = pbr("front", "#9AA592", rough=0.55, metal=0.0, grain=0.05, wear=0.35, wear_color="#C9CCC0", dirt=0.45,
           scratches=0.15, smudge=0.45, bump=0.06, bump_scale=2500.0)
carcass = pbr("carcass", "#E6E2D8", rough=0.6, metal=0.0, grain=0.04, dirt=0.4, bump=0.05)
kick = pbr("kick", "#222324", rough=0.6, metal=0.0, grain=0.04, wear=0.4, dirt=0.7, scratches=0.3, bump=0.15)
steel = pbr("handle", "#BCC0C5", rough=0.28, metal=1.0, grain=0.04, wear=0.3, dirt=0.4, scratches=0.4,
            scratch_scale=90.0, smudge=0.55, bump=0.04)
gap = pbr("gap", "#0F0F0E", rough=0.9, metal=0.0, dirt=0.0, bump=0.0)


def box(name, w, d, h, x, y, z, mat, r=0.002, seg=3):
    return rounded_slab(name, w, d, h, r, r, mat, z0=z, seg=seg, edge_seg=seg, loc=(x, y))


parts = []
top = rounded_slab("top", W, D, TOP, 0.004, 0.004, quartz, z0=H - TOP, seg=6, edge_seg=6)
subdivide(top, 5)
parts.append(top)
cy = -D / 2 + CD / 2                                    # carcass flush with the back
parts.append(box("carcass", W - 0.004, CD, H - TOP - KICK, 0, cy, KICK, carcass))
parts.append(box("kick", W - 0.01, 0.018, KICK - 0.004, 0, cy + CD / 2 - 0.06, 0.0, kick, r=0.002))
parts.append(box("shadow", W - 0.004, 0.006, 0.004, 0, cy + CD / 2 + 0.003, H - TOP - 0.004, gap, r=0.001))

fy = cy + CD / 2 + 0.0095                               # fronts: 19 mm thick, proud of the carcass
fh = H - TOP - KICK - 0.004
bays = [("door", 0.6), ("door", 0.6), ("drawers", 0.6), ("door", 0.6)]
x = -W / 2
for kind, bw in bays:
    xc = x + bw / 2
    if kind == "door":
        parts.append(box("door", bw - GAP, 0.019, fh, xc, fy, KICK + 0.002, sage, r=0.0025))
        hx = xc + (bw / 2 - 0.06) * (1 if xc < 0 else -1)
        parts.append(box("handle", 0.012, 0.012, 0.22, hx, fy + 0.03, KICK + fh - 0.26, steel, r=0.005, seg=5))
        for dz in (0.0, 0.208):
            parts.append(box("post", 0.012, 0.024, 0.012, hx, fy + 0.016, KICK + fh - 0.26 + dz, steel, r=0.004, seg=4))
    else:
        dh = (fh - 2 * GAP) / 3
        for i in range(3):
            z = KICK + 0.002 + i * (dh + GAP)
            parts.append(box("drawer", bw - GAP, 0.019, dh, xc, fy, z, sage, r=0.0025))
            hz = z + dh - 0.06
            parts.append(box("handle", 0.32, 0.012, 0.012, xc, fy + 0.03, hz, steel, r=0.005, seg=5))
            for dx in (-0.15, 0.15):
                parts.append(box("post", 0.012, 0.024, 0.012, xc + dx, fy + 0.016, hz, steel, r=0.004, seg=4))
    parts.append(box("gap", 0.003, 0.004, fh, x + bw, fy - 0.008, KICK + 0.002, gap, r=0.0008))
    x += bw

finish("kitchen_counter", parts, dims=(W, D, H), note="front toward +Y; worktop overhang 20 mm")
