"""Hero prop: library reading table. Kit "reading_table", 2.4 x 1.0 x 0.75 m.

Blender -b -P Tools/props/hero_reading_table.py

Solid oak (CC0 veneer scan) 40 mm top with eased edges, apron on four sides, tapered square legs with corner
blocks, a pair of brass banker's lamps with green glass shades down the middle (emissive inner shade), and the
wear of decades of elbows: polished edge along the long sides, ink-dark grime in the apron joints.
"""
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from hero_common import OUT, arc, cylinder, emissive, extrude_outline, finish, lathe, pbr, reset, rounded_slab, subdivide  # noqa: E402
from mathutils import Matrix  # noqa: E402

W, D, H = 2.4, 1.0, 0.75
TOP = 0.04

reset()
oak = pbr("oak", "#B08458", rough=0.42, metal=0.0, grain=0.04, wear=0.55, wear_color="#C9A274", dirt=0.45,
          scratches=0.35, scratch_scale=10.0, smudge=0.45, bump=0.08, scan="oak_veneer_01", scan_size=1.0,
          scan_tint="#D8C2A6")
brass = pbr("brass", "#B8955A", rough=0.3, metal=1.0, grain=0.06, wear=0.5, wear_color="#E2C48A", dirt=0.55,
            scratches=0.35, smudge=0.5, bump=0.04)
glass = pbr("greenglass", "#1E5A3A", rough=0.12, metal=0.0, grain=0.03, dirt=0.2, smudge=0.3, bump=0.02)
os.makedirs(os.path.join(OUT, "designs"), exist_ok=True)
warm = emissive("lampglow", os.path.join(OUT, "designs", "lamp_glow.png"), strength=2.5, base="#E8DCC4")

parts = []
top = rounded_slab("top", W, D, TOP, 0.008, 0.008, oak, z0=H - TOP, seg=6, edge_seg=6)
subdivide(top, 5)
parts.append(top)
ah = 0.11                                            # apron
for (w, d, x, y) in ((W - 0.24, 0.025, 0, D / 2 - 0.09), (W - 0.24, 0.025, 0, -D / 2 + 0.09),
                     (0.025, D - 0.24, W / 2 - 0.09, 0), (0.025, D - 0.24, -W / 2 + 0.09, 0)):
    parts.append(rounded_slab("apron", w, d, ah, 0.003, 0.003, oak, z0=H - TOP - ah, loc=(x, y), seg=3, edge_seg=3))
for sx in (-1, 1):
    for sy in (-1, 1):
        x, y = sx * (W / 2 - 0.09), sy * (D / 2 - 0.09)
        leg = rounded_slab("leg", 0.075, 0.075, H - TOP, 0.006, 0.004, oak, z0=0.0, loc=(x, y), seg=4, edge_seg=4)
        for v in leg.data.vertices:                  # taper to 50 mm at the foot
            t = 1.0 - v.co.z / (H - TOP)
            v.co.x = x + (v.co.x - x) * (1.0 - 0.33 * t)
            v.co.y = y + (v.co.y - y) * (1.0 - 0.33 * t)
        parts.append(leg)
        parts.append(cylinder("glide", 0.017, 0.006, brass, loc=(x, y, 0.0), seg=40, r_edge=0.002))

for lx in (-0.55, 0.55):                             # banker's lamps
    z0 = H
    parts.append(lathe("lampbase", [(0.0, z0), (0.075, z0), (0.078, z0 + 0.008), (0.06, z0 + 0.018), (0.02, z0 + 0.028),
                                    (0.012, z0 + 0.03), (0.0, z0 + 0.03)], brass, loc=(lx, 0, 0), seg=64))
    parts.append(cylinder("stem", 0.007, 0.3, brass, loc=(lx, 0, z0 + 0.03), seg=32))
    sh = [(0.0, 0.0), (0.12, 0.0), (0.12, 0.012), (0.1, 0.045), (0.06, 0.07), (0.0, 0.075)]
    shade = extrude_outline("shade", [(-u, v) for u, v in sh[::-1]] + sh[1:], 0.11, glass, plane="XZ", bevel=0.004, seg=3)
    shade.data.transform(Matrix.Rotation(1.5708, 4, "Z"))
    shade.data.transform(Matrix.Translation((lx, 0, z0 + 0.3)))
    parts.append(shade)
    inner = rounded_slab("glow", 0.09, 0.2, 0.002, 0.02, 0.0, warm, z0=z0 + 0.305, loc=(lx, 0), seg=3)   # inside the (rotated) shade
    parts.append(inner)
    parts.append(cylinder("pull", 0.004, 0.06, brass, loc=(lx + 0.09, 0, z0 + 0.24), seg=16))

finish("reading_table", parts, dims=(W, D, H), note="long sides along X; two banker's lamps")
