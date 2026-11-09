"""Hero prop: wall-mounted marker whiteboard. Kit "whiteboard", 1.8 x 0.05 x 1.1 m (front toward +Y, bottom at z = 0).

Blender -b -P Tools/props/hero_whiteboard.py     (writing from Tools/props/hero_textures.py first)

Enamel board with marker handwriting and erased ghosts, anodised aluminium frame with grey corner caps, a full
width marker tray holding three markers and an eraser.
"""
import math
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from hero_common import OUT, cylinder, finish, pbr, reset, rounded_slab, subdivide  # noqa: E402
from mathutils import Matrix  # noqa: E402

W, H, F = 1.8, 1.1, 0.02

reset()
enamel = pbr("enamel", "#808080", rough=0.18, metal=0.0, grain=0.02, dirt=0.1, smudge=0.6, bump=0.02, rough_var=0.05,
             image=os.path.join(OUT, "designs", "whiteboard_group.png"), image_plane="XZ",
             image_size=(W - 2 * F, H - 2 * F), image_center=(0.0, H / 2))
alu = pbr("frame", "#B7BBBF", rough=0.35, metal=1.0, grain=0.04, wear=0.4, dirt=0.5, scratches=0.4, smudge=0.4, bump=0.05)
cap = pbr("cap", "#5E6166", rough=0.5, metal=0.0, grain=0.04, wear=0.3, dirt=0.4, bump=0.05)
marker_b = pbr("marker_blue", "#2A4FA8", rough=0.4, metal=0.0, wear=0.2, dirt=0.3, smudge=0.3, bump=0.03)
marker_r = pbr("marker_red", "#B83030", rough=0.4, metal=0.0, wear=0.2, dirt=0.3, smudge=0.3, bump=0.03)
marker_k = pbr("marker_black", "#202124", rough=0.4, metal=0.0, wear=0.2, dirt=0.3, smudge=0.3, bump=0.03)
body = pbr("marker_body", "#F1F1EE", rough=0.45, metal=0.0, wear=0.2, dirt=0.4, smudge=0.4, bump=0.03)
felt = pbr("eraser_felt", "#3C3D40", rough=0.95, metal=0.0, dirt=0.6, bump=0.4, bump_scale=3000.0)


def stand(ob, y, zc):
    ob.data.transform(Matrix.Rotation(math.radians(-90), 4, "X"))
    ob.data.transform(Matrix.Translation((0, y, zc)))
    return ob


parts = []
board = stand(rounded_slab("enamel", W - 2 * F + 0.004, H - 2 * F + 0.004, 0.012, 0.002, 0.001, enamel, z0=-0.012, seg=2, edge_seg=1), 0.016, H / 2)
subdivide(board, 5)
parts.append(board)
for (w, h, x, z) in ((W, F, 0, F / 2), (W, F, 0, H - F / 2), (F, H - 2 * F, -W / 2 + F / 2, H / 2), (F, H - 2 * F, W / 2 - F / 2, H / 2)):
    r = stand(rounded_slab("rail", w, h, 0.025, 0.003, 0.004, alu, z0=-0.025, seg=3, edge_seg=4), 0.025, z)
    r.data.transform(Matrix.Translation((x, 0, 0)))
    parts.append(r)
for x in (-W / 2 + F / 2, W / 2 - F / 2):
    for z in (F / 2, H - F / 2):
        c = stand(rounded_slab("corner", F + 0.006, F + 0.006, 0.03, 0.008, 0.004, cap, z0=-0.03, seg=4, edge_seg=3), 0.028, z)
        c.data.transform(Matrix.Translation((x, 0, 0)))
        parts.append(c)
# tray: L-profile ledge along the bottom
parts.append(rounded_slab("tray", W - 0.1, 0.07, 0.004, 0.003, 0.0015, alu, z0=-0.004, loc=(0, 0.06), seg=3, edge_seg=2))
parts.append(rounded_slab("tray_lip", W - 0.1, 0.004, 0.018, 0.002, 0.0015, alu, z0=-0.004, loc=(0, 0.093), seg=3, edge_seg=2))
for i, (mat, x) in enumerate(((marker_b, -0.4), (marker_r, -0.32), (marker_k, 0.55))):
    m = cylinder("marker", 0.009, 0.12, body, loc=(0, 0, 0), seg=32, r_edge=0.003)
    capm = cylinder("marker_cap", 0.0095, 0.045, mat, loc=(0, 0, 0.12), seg=32, r_edge=0.003)
    for ob in (m, capm):
        ob.data.transform(Matrix.Rotation(math.radians(90), 4, "Y"))
        ob.data.transform(Matrix.Rotation(math.radians(8 * (i - 1)), 4, "Z"))
        ob.data.transform(Matrix.Translation((x, 0.06, 0.0095)))
        parts.append(ob)
parts.append(rounded_slab("eraser", 0.15, 0.055, 0.03, 0.008, 0.004, cap, z0=0.008, loc=(0.25, 0.06), seg=4, edge_seg=3))
parts.append(rounded_slab("eraser_felt", 0.148, 0.053, 0.008, 0.008, 0.002, felt, z0=0.0, loc=(0.25, 0.06), seg=4, edge_seg=2))

finish("whiteboard", parts, dims=(W, 0.05, H), note="front toward +Y, bottom (tray) at z = 0")
