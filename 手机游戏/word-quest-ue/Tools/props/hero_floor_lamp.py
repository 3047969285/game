"""Hero prop: floor lamp. Kit "floor_lamp", 0.35 x 0.35 x 1.6 m.

Blender -b -P Tools/props/hero_floor_lamp.py

Weighted round base (black powder coat, felt pad), brushed-brass stem with a collar and inline switch, linen
drum shade (outer fabric, inner warm diffuser). The diffuser is an emissive slot (warm gradient image) so the
lamp reads as lit in the scene; the scene's light actor does the actual lighting.
"""
import math
import os
import sys

import bmesh

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from hero_common import OUT, _obj, cylinder, emissive, finish, lathe, pbr, reset  # noqa: E402

H = 1.6
SHADE_R, SHADE_H = 0.17, 0.26


def tube(name, r, h, z0, mat, seg=96, open_ends=True):
    """Thin-walled open cylinder (lamp shade) with UVs wrapped around."""
    bm = bmesh.new()
    uv = bm.loops.layers.uv.new("UVMap")
    rings = []
    for k, z in enumerate((z0, z0 + h)):
        rings.append([bm.verts.new((r * math.cos(2 * math.pi * i / seg), r * math.sin(2 * math.pi * i / seg), z))
                      for i in range(seg)])
    for i in range(seg):
        j = (i + 1) % seg
        f = bm.faces.new((rings[0][i], rings[0][j], rings[1][j], rings[1][i]))
        for loop, (a, b) in zip(f.loops, ((i, 0), (i + 1, 0), (i + 1, 1), (i, 1))):
            loop[uv].uv = (a / seg, b)
    bmesh.ops.subdivide_edges(bm, edges=[e for e in bm.edges if abs(e.verts[0].co.z - e.verts[1].co.z) > 1e-6],
                              cuts=12, use_grid_fill=False)
    return _obj(name, bm, mat)


def warm_glow(path):
    """Diffuser image: warm centre band fading to the rims."""
    if os.path.exists(path):
        return path
    import numpy as np
    y = np.linspace(0, 1, 256)[:, None]
    band = np.exp(-((y - 0.55) / 0.32) ** 2)
    img = np.stack([255 * (0.55 + 0.45 * band), 200 * (0.45 + 0.55 * band), 140 * (0.35 + 0.65 * band)], -1)
    img = np.repeat(img, 64, 1).clip(0, 255).astype("uint8")
    import bpy
    im = bpy.data.images.new("glow", 64, 256)
    px = np.concatenate([img[::-1] / 255.0, np.ones((256, 64, 1))], -1).astype("float32")
    im.pixels = px.ravel()
    im.filepath_raw = path
    im.file_format = "PNG"
    im.save()
    return path


reset()
powder = pbr("base", "#18191B", rough=0.5, metal=0.0, grain=0.04, wear=0.5, wear_color="#55575B", dirt=0.35,
             scratches=0.3, bump=0.25, bump_scale=2500.0)
brass = pbr("brass", "#B8955A", rough=0.3, metal=1.0, grain=0.08, wear=0.5, wear_color="#E2C48A", dirt=0.5,
            scratches=0.35, scratch_scale=90.0, smudge=0.5, bump=0.05)
felt = pbr("felt", "#2A2622", rough=0.95, metal=0.0, dirt=0.4, bump=0.5, bump_scale=3000.0)
linen = pbr("linen", "#E4DCCB", rough=0.88, metal=0.0, grain=0.1, grain_scale=200.0, dirt=0.25, bump=0.6,
            bump_scale=5000.0, scan="rough_linen", scan_size=0.12, scan_tint="#F6EEDC")
switch = pbr("switch", "#141414", rough=0.4, metal=0.0, dirt=0.3, wear=0.3, bump=0.05)
os.makedirs(os.path.join(OUT, "designs"), exist_ok=True)
glow = emissive("diffuser", warm_glow(os.path.join(OUT, "designs", "lamp_glow.png")), strength=3.0, base="#E8DCC4")

parts = [cylinder("base", 0.14, 0.022, powder, loc=(0, 0, 0.003), seg=128, r_edge=0.006, edge_seg=6),
         cylinder("felt", 0.135, 0.003, felt, loc=(0, 0, 0.0), seg=96),
         cylinder("collar", 0.016, 0.03, brass, loc=(0, 0, 0.025), seg=64, r_edge=0.003),
         cylinder("stem", 0.0095, H - SHADE_H - 0.03, brass, loc=(0, 0, 0.05), seg=48),
         cylinder("joint", 0.013, 0.018, brass, loc=(0, 0, 0.82), seg=48, r_edge=0.003),
         cylinder("switch", 0.011, 0.04, switch, loc=(0, 0, 1.08), seg=48, r_edge=0.004),
         cylinder("harp", 0.004, 0.18, brass, loc=(0, 0, H - SHADE_H - 0.02), seg=24),
         cylinder("finial", 0.012, 0.016, brass, loc=(0, 0, H - 0.012), seg=48, r_edge=0.005)]
z0 = H - SHADE_H - 0.01
parts.append(tube("shade", SHADE_R, SHADE_H, z0, linen))
inner = tube("diffuser", SHADE_R - 0.004, SHADE_H - 0.006, z0 + 0.003, glow)
for p in inner.data.polygons:
    p.flip()
parts.append(inner)
for zz in (z0, z0 + SHADE_H - 0.004):                           # brass rings holding the shade (open, not caps)
    ri, ro = SHADE_R - 0.0045, SHADE_R + 0.0015
    parts.append(lathe("rim", [(ri, zz), (ro, zz), (ro, zz + 0.004), (ri, zz + 0.004), (ri, zz)], brass, seg=128))

finish("floor_lamp", parts, dims=(0.35, 0.35, H), note="lit diffuser is emissive; light actor does the lighting")
