"""Hero prop: interior door in its frame. Kit "door", 0.9 x 0.1 x 2.1 m (room side toward +Y, closed).

Blender -b -P Tools/props/hero_door.py

Off-white painted four-panel door (raised panels with moulded edges) in an oak frame with architraves on both
faces, stainless lever handle on a round rose with a key escutcheon, three butt hinges, strike plate. Wear:
grime around the handle, scuffed kick zone at the bottom, chipped paint on the edges.
"""
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from hero_common import cylinder, finish, pbr, reset, rounded_slab  # noqa: E402

W, T, H = 0.9, 0.1, 2.1
LEAF_W, LEAF_H, LEAF_T = 0.8, 2.02, 0.04

reset()
paint = pbr("leaf", "#EAE6DD", rough=0.45, metal=0.0, grain=0.04, wear=0.45, wear_color="#B9A88E", dirt=0.5,
            scratches=0.3, scratch_scale=15.0, smudge=0.5, bump=0.08, bump_scale=1500.0)
oak = pbr("frame", "#A8835C", rough=0.45, metal=0.0, grain=0.04, wear=0.4, dirt=0.4, scratches=0.25, bump=0.06,
          scan="oak_veneer_01", scan_size=0.9)
steel = pbr("hardware", "#C3C6CA", rough=0.25, metal=1.0, grain=0.03, wear=0.3, dirt=0.4, scratches=0.4,
            scratch_scale=90.0, smudge=0.6, bump=0.03)
hinge = pbr("hinge", "#8E8A82", rough=0.4, metal=1.0, grain=0.04, wear=0.4, dirt=0.6, bump=0.05)


def box(name, w, d, h, x, y, z, mat, r=0.003, seg=3):
    return rounded_slab(name, w, d, h, r, r, mat, z0=z, seg=seg, edge_seg=seg, loc=(x, y))


parts = []
# frame: two jambs + head, and architraves on both faces
for x in (-(LEAF_W / 2 + 0.025), LEAF_W / 2 + 0.025):
    parts.append(box("jamb", 0.03, T, LEAF_H + 0.01, x, 0, 0, oak))
parts.append(box("head", LEAF_W + 0.08, T, 0.03, 0, 0, LEAF_H + 0.01, oak))
for y in (T / 2 + 0.006, -T / 2 - 0.006):
    for x in (-(W / 2 - 0.035), W / 2 - 0.035):
        parts.append(box("architrave", 0.07, 0.012, H - 0.07, x, y, 0, oak, r=0.004))   # stops under the head piece (no overlap)
    parts.append(box("architrave_head", W, 0.012, 0.07, 0, y, H - 0.07, oak, r=0.004))

# leaf with four raised panels on each face (stiles / rails stay flush)
parts.append(box("leaf", LEAF_W, LEAF_T, LEAF_H, 0, 0, 0.005, paint, r=0.002))
panels = [(-0.17, 1.1, 0.26, 0.78), (0.17, 1.1, 0.26, 0.78), (-0.17, 0.17, 0.26, 0.78), (0.17, 0.17, 0.26, 0.78)]
for sy in (1, -1):
    for (px, pz, pw, ph) in panels:
        parts.append(box("panel", pw, 0.006, ph, px, sy * (LEAF_T / 2 + 0.002), pz, paint, r=0.004, seg=4))
        parts.append(box("moulding", pw + 0.03, 0.004, ph + 0.03, px, sy * (LEAF_T / 2 + 0.001), pz - 0.015, paint, r=0.006, seg=4))

# hardware (both faces): rose, lever, escutcheon; hinges on the left; strike plate on the right jamb
hx, hz = LEAF_W / 2 - 0.065, 1.0
for sy in (1, -1):
    y = sy * (LEAF_T / 2)
    parts.append(cylinder("rose", 0.026, 0.009, steel, loc=(0, 0, 0), seg=48, r_edge=0.003))
    parts[-1].data.transform(__import__("mathutils").Matrix.Rotation(1.5707963 * sy, 4, "X"))
    parts[-1].data.transform(__import__("mathutils").Matrix.Translation((hx, y, hz)))
    parts.append(box("lever_neck", 0.018, 0.05, 0.018, hx, y + sy * 0.03, hz - 0.009, steel, r=0.008, seg=5))
    parts.append(box("lever", 0.13, 0.019, 0.019, hx - 0.06, y + sy * 0.058, hz - 0.0095, steel, r=0.009, seg=5))
    parts.append(cylinder("escutcheon", 0.014, 0.006, steel, loc=(0, 0, 0), seg=32, r_edge=0.002))
    parts[-1].data.transform(__import__("mathutils").Matrix.Rotation(1.5707963 * sy, 4, "X"))
    parts[-1].data.transform(__import__("mathutils").Matrix.Translation((hx, y, hz - 0.16)))
for z in (0.22, 1.0, 1.78):
    parts.append(box("hinge", 0.012, 0.075, 0.1, -LEAF_W / 2 - 0.006, 0, z, hinge, r=0.002))
    parts.append(cylinder("knuckle", 0.007, 0.1, hinge, loc=(-LEAF_W / 2 - 0.006, T / 2 - 0.03, z), seg=24, r_edge=0.002))
parts.append(box("strike", 0.004, 0.025, 0.11, LEAF_W / 2 + 0.011, 0, hz - 0.055, steel, r=0.001))

finish("door", parts, dims=(W, T, H), note="room side toward +Y; closed; hinges on the left seen from +Y side")
