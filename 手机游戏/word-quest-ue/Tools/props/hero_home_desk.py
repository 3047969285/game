"""Hero prop: home study desk. Kit "home_desk", 1.2 x 0.6 x 0.75 m (front toward +Y, user side).

Blender -b -P Tools/props/hero_home_desk.py

Oak top (28 mm, rounded edges, cable grommet), oak two-drawer pedestal on the right with brushed-steel bar
handles and shadow gaps, black powder-coated square-tube legs with levelling feet on the left, oak modesty
panel at the back. Grain runs along the boards; edges and the front lip carry wear, the top carries cup and
pen marks through the smudge/scratch layers.
"""
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from hero_common import cylinder, finish, pbr, reset, rounded_slab, subdivide  # noqa: E402
from mathutils import Matrix  # noqa: E402

W, D, H = 1.2, 0.6, 0.75
TOP = 0.028
PED_W = 0.42                                   # pedestal width (right side)

reset()
oak = pbr("oak", "#B08458", rough=0.48, metal=0.0, grain=0.12, wear=0.35, wear_color="#C89A6A", dirt=0.3,
          scratches=0.25, scratch_scale=12.0, smudge=0.35, bump=0.12, bump_scale=900.0, wood=0.85,
          color2="#7C5634", wood_scale=7.0, scan="oak_veneer_01", scan_size=0.9)
oak_side = pbr("oakside", "#A87C50", rough=0.52, metal=0.0, grain=0.1, wear=0.3, dirt=0.35, bump=0.1, wood=0.8,
               color2="#73502F", wood_scale=9.0, scan="oak_veneer_01", scan_size=0.9)
powder = pbr("legs", "#1C1D1F", rough=0.55, metal=0.0, grain=0.04, wear=0.45, wear_color="#5A5C60", dirt=0.3,
             scratches=0.25, bump=0.25, bump_scale=2500.0)
steel = pbr("handle", "#BFC3C8", rough=0.3, metal=1.0, grain=0.04, wear=0.3, dirt=0.4, scratches=0.4,
            scratch_scale=80.0, smudge=0.4, bump=0.05)
rubber = pbr("feet", "#121314", rough=0.85, metal=0.0, dirt=0.5, bump=0.3)
gap = pbr("shadowgap", "#0E0B09", rough=0.9, metal=0.0, dirt=0.0, bump=0.0)


def box(name, w, d, h, x, y, z, mat, r=0.003, seg=4):
    """Rounded box with its base centre at (x, y, z)."""
    return rounded_slab(name, w, d, h, r, r, mat, z0=z, seg=seg, edge_seg=seg, loc=(x, y))


parts = []
top = rounded_slab("top", W, D, TOP, 0.006, 0.006, oak, z0=H - TOP, seg=8, edge_seg=8)
subdivide(top, 4)
parts.append(top)
# cable grommet: dark ring + cap near the back right
parts.append(cylinder("grommet", 0.03, 0.002, steel, loc=(W / 2 - 0.16, -D / 2 + 0.07, H - 0.0005), seg=64, r_edge=0.0008))
parts.append(cylinder("grommet_hole", 0.024, 0.0025, gap, loc=(W / 2 - 0.16, -D / 2 + 0.07, H - 0.0008), seg=64))

# pedestal (right): carcass, two drawer fronts with shadow gaps, bar handles
px = W / 2 - PED_W / 2 - 0.01
ph = H - TOP - 0.012
parts.append(box("ped", PED_W, D - 0.04, ph, px, -0.01, 0.012, oak_side, r=0.004))
parts.append(box("plinth", PED_W - 0.03, D - 0.08, 0.012, px, -0.01, 0.0, rubber, r=0.002))
dh = (ph - 0.03) / 2
for i in range(2):
    z = 0.025 + i * (dh + 0.006)
    front = box("drawer", PED_W - 0.012, 0.018, dh, px, D / 2 - 0.04 + 0.009 - 0.01, z, oak, r=0.003)
    parts.append(front)
    if i == 0:                                          # shadow gap between the two fronts, 3 mm recessed
        parts.append(box("gap", PED_W - 0.012, 0.016, 0.0055, px, D / 2 - 0.041 - 0.003, z + dh + 0.0003, gap, r=0.0008))
    hz = z + dh - 0.045
    parts.append(box("handle_bar", 0.16, 0.012, 0.012, px, D / 2 - 0.02 + 0.016, hz, steel, r=0.005, seg=6))
    for sx in (-0.07, 0.07):
        parts.append(box("handle_post", 0.012, 0.022, 0.012, px + sx, D / 2 - 0.02 + 0.004, hz, steel, r=0.004, seg=5))

# left legs: square tubes 40 mm with a top rail and levelling feet
lx = -W / 2 + 0.04
for y in (D / 2 - 0.05, -D / 2 + 0.05):
    parts.append(box("leg", 0.04, 0.04, H - TOP - 0.012, lx, y, 0.012, powder, r=0.004, seg=5))
    parts.append(cylinder("foot", 0.016, 0.012, rubber, loc=(lx, y, 0.0), seg=40, r_edge=0.003))
parts.append(box("rail", 0.04, D - 0.1, 0.04, lx, 0.0, H - TOP - 0.04, powder, r=0.004, seg=5))
# modesty panel between legs and pedestal at the back
mp_w = (px - PED_W / 2) - (lx + 0.02) - 0.004
parts.append(box("modesty", mp_w, 0.016, 0.34, lx + 0.02 + mp_w / 2 + 0.002, -D / 2 + 0.06, H - TOP - 0.34, oak_side, r=0.003))

finish("home_desk", parts, dims=(W, D, H), note="front (user side) toward +Y; pedestal on the right")
