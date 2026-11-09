"""Hero prop: wall calendar (September 2026). Kit "calendar", 0.3 x 0.02 x 0.4 m, hangs flat on a wall.

Blender -b -P Tools/props/hero_calendar.py     (page design from Tools/props/hero_textures.py first)

Grey-board backing, a stack of slightly fanned paper pages with the printed month on the front page, a
twin-loop wire binding across the top and a hanging hook. Front toward +Y, back against the wall at y = 0,
bottom edge at z = 0 (the scene places it at hanging height).
"""
import math
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from hero_common import OUT, cylinder, finish, pbr, reset, rounded_slab, subdivide  # noqa: E402
from mathutils import Matrix  # noqa: E402

W, H = 0.30, 0.40


def stand_up(ob, y):
    ob.data.transform(Matrix.Rotation(math.radians(-90), 4, "X"))
    ob.data.transform(Matrix.Translation((0, y, H / 2)))
    return ob


reset()
page_img = os.path.join(OUT, "designs", "calendar_2026_09.png")
front = pbr("page", "#F2EFE7", rough=0.78, metal=0.0, grain=0.06, dirt=0.15, smudge=0.25, bump=0.25, bump_scale=4000.0,
            image=page_img, image_plane="XZ", image_size=(W - 0.004, H - 0.006), image_center=(0.0, H / 2 - 0.003))
paper = pbr("paperstack", "#E9E5DA", rough=0.82, metal=0.0, grain=0.08, dirt=0.3, bump=0.3, bump_scale=4000.0)
board = pbr("board", "#7E786E", rough=0.9, metal=0.0, grain=0.15, dirt=0.35, wear=0.3, bump=0.5, bump_scale=2500.0)
wire = pbr("wire", "#C9CCD0", rough=0.3, metal=1.0, grain=0.03, dirt=0.3, scratches=0.2, bump=0.02)

parts = [stand_up(rounded_slab("board", W, H, 0.0022, 0.004, 0.0008, board, z0=0.0, seg=4, edge_seg=2), 0.0)]
# page stack: back pages slightly larger offsets so the edges read as many sheets
for i in range(6):
    pg = rounded_slab("stack", W - 0.004 - i * 0.0004, H - 0.006 - i * 0.0007, 0.0003, 0.003, 0.0001, paper,
                      z0=0.0, seg=3, edge_seg=1)
    stand_up(pg, 0.0022 + i * 0.0003)
    pg.data.transform(Matrix.Translation((0, 0, -0.003 - i * 0.0002)))
    parts.append(pg)
top = rounded_slab("page", W - 0.004, H - 0.006, 0.0002, 0.003, 0.0001, front, z0=0.0, seg=3, edge_seg=1)
subdivide(top, 8)
stand_up(top, 0.0022 + 6 * 0.0003)
top.data.transform(Matrix.Translation((0, 0, -0.003)))
for v in top.data.vertices:                      # the front page curls a little away from the stack at the bottom
    t = max(0.0, (0.12 - v.co.z) / 0.12)
    v.co.y += 0.004 * t * t
parts.append(top)

# twin-loop wire binding: pairs of loops through the top edge
y0, zt = 0.0035, H - 0.009
for i in range(14):
    x = -W / 2 + 0.02 + i * (W - 0.04) / 13
    for dx in (-0.0022, 0.0022):
        loop = cylinder("loop", 0.0045, 0.0007, wire, loc=(0, 0, -0.00035), seg=24)
        loop.data.transform(Matrix.Rotation(math.radians(90), 4, "Y"))
        loop.data.transform(Matrix.Translation((x + dx, y0, zt)))
        parts.append(loop)
# hanging hook (bent wire) at the top centre
hook = cylinder("hook", 0.0009, 0.035, wire, loc=(0, 0, 0), seg=12)
hook.data.transform(Matrix.Translation((0, 0.0015, H - 0.012)))
parts.append(hook)

finish("calendar", parts, dims=(W, 0.02, H), note="front toward +Y, back on the wall at y = 0, bottom at z = 0")
