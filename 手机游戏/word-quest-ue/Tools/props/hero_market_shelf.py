"""Hero prop: stocked supermarket gondola. Kit "market_shelf", 2.0 x 0.5 x 1.8 m (front toward +Y).

Blender -b -P Tools/props/hero_market_shelf.py     (labels from Tools/props/hero_textures.py first)

White powder-coated gondola: base deck with kick plate, pegboard back, uprights, four shelves with price-strip
edges. Products come from hero_shelf_layout.plan(): cartons, bottles (turned), cans (rimmed), snack bags (puffed),
2-4 deep per facing, some front items pulled forward, the odd gap. One packaging material projects the front-
elevation label image along Y, so each product shows its own label; sides and tops carry streaked print.
"""
import math
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from hero_common import OUT, arc, cylinder, finish, lathe, pbr, reset, rounded_slab, subdivide  # noqa: E402
from hero_shelf_layout import D, H, SHELF_Z, W, plan  # noqa: E402

reset()
powder = pbr("gondola", "#E8E8E4", rough=0.5, metal=0.0, grain=0.04, wear=0.45, wear_color="#B9BAB6", dirt=0.5,
             scratches=0.35, scratch_scale=20.0, bump=0.15, bump_scale=3000.0)
peg = pbr("pegboard", "#DCDCD8", rough=0.55, metal=0.0, grain=0.05, dirt=0.45, bump=0.6, bump_scale=60.0)
pack = pbr("packaging", "#808080", rough=0.42, metal=0.0, grain=0.04, dirt=0.15, smudge=0.25, bump=0.05,
           rough_var=0.1, image=os.path.join(OUT, "designs", "shelf_labels.png"), image_plane="XZ",
           image_size=(W, H), image_center=(0.0, H / 2))
can_metal = pbr("canrim", "#C6C9CC", rough=0.25, metal=1.0, grain=0.03, wear=0.3, dirt=0.3, bump=0.03)
kick = pbr("kick", "#5A5D60", rough=0.45, metal=1.0, grain=0.04, wear=0.5, dirt=0.6, scratches=0.5, bump=0.1)

parts = []
back_y = -D / 2 + 0.02
parts.append(rounded_slab("deck", W, D, 0.04, 0.004, 0.003, powder, z0=SHELF_Z[0] - 0.04, seg=3, edge_seg=3))
parts.append(rounded_slab("kick", W, 0.02, SHELF_Z[0] - 0.04, 0.003, 0.002, kick, z0=0.0, loc=(0, D / 2 - 0.03), seg=3, edge_seg=2))
pb = rounded_slab("pegboard", W - 0.06, 0.012, H - SHELF_Z[0], 0.002, 0.001, peg, z0=SHELF_Z[0], loc=(0, back_y), seg=2, edge_seg=1)
subdivide(pb, 3)
parts.append(pb)
for x in (-W / 2 + 0.02, W / 2 - 0.02):
    parts.append(rounded_slab("upright", 0.04, 0.05, H, 0.004, 0.003, powder, z0=0.0, loc=(x, back_y), seg=3, edge_seg=3))
for z in SHELF_Z[1:]:
    parts.append(rounded_slab("shelf", W - 0.08, D - 0.06, 0.02, 0.003, 0.002, powder, z0=z - 0.02, loc=(0, 0.01), seg=3, edge_seg=2))
for z in SHELF_Z:                                    # price-strip channel on the shelf lips
    parts.append(rounded_slab("strip", W - 0.08, 0.012, 0.035, 0.002, 0.001, pack, z0=z - 0.035, loc=(0, D / 2 - 0.006), seg=2, edge_seg=1))

front_y = D / 2 - 0.035
for it in plan():
    x, z, w, d, h = it["x"], it["z"], it["w"], it["d"], it["h"]
    for row in range(it["rows"]):
        y = front_y - d / 2 - row * (d + 0.004) + (it["pull"] if row == 0 else 0.0)
        if y - d / 2 < back_y + 0.01:
            break
        if it["kind"] == "box":
            parts.append(rounded_slab("box", w, d, h, 0.002, 0.0015, pack, z0=z, loc=(x, y), seg=2, edge_seg=2))
        elif it["kind"] == "bag":
            b = rounded_slab("bag", w, d, h, 0.01, 0.008, pack, z0=z, loc=(x, y), seg=4, edge_seg=4)
            for v in b.data.vertices:                     # puffed middle, crimped top seam
                t = (v.co.z - z) / h
                v.co.y = y + (v.co.y - y) * (0.75 + 0.45 * math.sin(math.pi * min(1.0, t * 1.05)))
            parts.append(b)
        elif it["kind"] == "bottle":
            r = w / 2
            prof = [(0.0, 0.0), (r * 0.9, 0.0)] + arc(r * 0.9, r * 0.1, r * 0.1, -90, 0, 3)[1:] + \
                   [(r, h * 0.62), (r * 0.82, h * 0.72), (r * 0.36, h * 0.86), (r * 0.36, h * 0.93),
                    (r * 0.42, h * 0.935), (r * 0.42, h), (0.0, h)]
            parts.append(lathe("bottle", [(a, b + z) for a, b in prof], pack, loc=(x, y, 0), seg=32))
        else:                                             # can: body + rims
            parts.append(cylinder("can", w / 2 - 0.0015, h - 0.008, pack, loc=(x, y, z + 0.004), seg=40))
            parts.append(cylinder("rim", w / 2, 0.004, can_metal, loc=(x, y, z), seg=40, r_edge=0.0012))
            parts.append(cylinder("rim", w / 2, 0.004, can_metal, loc=(x, y, z + h - 0.004), seg=40, r_edge=0.0012))

finish("market_shelf", parts, dims=(W, D, H), note="front toward +Y; labels projected from designs/shelf_labels.png")
