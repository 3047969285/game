"""Hero prop: smartphone (2026, lying screen-up on a table). Kit "phone", 0.075 x 0.155 x 0.009 m.

Blender -b -P Tools/props/hero_phone.py      (screen image from Tools/props/hero_screens.py first)

Parts: brushed-aluminium frame with antenna bands, frosted back glass, front glass with fingerprints, lock-screen
display under a thin black bezel, camera plateau (3 lenses, flash), side buttons, USB-C port, speaker grilles.
The camera plateau props the phone up, so the whole phone is tilted onto it as a real one lies on a table.
"""
import math
import os
import sys

import bmesh
import bpy
from mathutils import Matrix

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from hero_common import OUT, cylinder, emissive, finish, pbr, reset, rounded_slab  # noqa: E402

W, L, T = 0.0716, 0.1476, 0.0082          # body
RC, RE = 0.0098, 0.0011                   # plan corner radius, frame edge radius
BUMP = 0.0019                             # camera plateau height


def screen_quad(name, w, l, r, z, material, seg=14):
    """Rounded-rectangle display surface with planar 0..1 UVs (the lock-screen image maps 1:1)."""
    from hero_common import _obj, _rounded_outline
    bm = bmesh.new()
    vs = [bm.verts.new((x, y, z)) for x, y in _rounded_outline(w, l, r, seg)]
    f = bm.faces.new(vs)
    uv = bm.loops.layers.uv.new("UVMap")
    for loop in f.loops:
        loop[uv].uv = (loop.vert.co.x / w + 0.5, loop.vert.co.y / l + 0.5)
    bmesh.ops.triangulate(bm, faces=[f], ngon_method="EAR_CLIP")
    return _obj(name, bm, material)


def transform(ob, mat):
    ob.data.transform(mat)


reset()
alu = pbr("frame", "#9EA4AC", rough=0.28, metal=1.0, grain=0.08, wear=0.55, dirt=0.3, scratches=0.35,
          scratch_scale=55.0, smudge=0.35, bump=0.1, bump_scale=900.0)
band = pbr("antenna", "#7E848C", rough=0.45, metal=0.0, grain=0.05, dirt=0.2, bump=0.05)
back = pbr("backglass", "#2E3644", rough=0.42, metal=0.0, grain=0.05, wear=0.15, dirt=0.15, scratches=0.15,
           smudge=0.6, bump=0.05)
front = pbr("frontglass", "#040507", rough=0.06, metal=0.0, grain=0.02, dirt=0.05, scratches=0.18,
            scratch_scale=70.0, smudge=0.8, bump=0.02, rough_var=0.03)
lens_glass = pbr("lens", "#05070C", rough=0.04, metal=0.0, grain=0.0, dirt=0.0, smudge=0.25, bump=0.0, rough_var=0.02)
ring = pbr("lensring", "#B8BEC6", rough=0.22, metal=1.0, grain=0.05, wear=0.4, dirt=0.4, scratches=0.2, bump=0.05)
dark = pbr("port", "#0B0C0E", rough=0.65, metal=0.0, grain=0.05, dirt=0.6, bump=0.1)
screen = emissive("screen", os.path.join(OUT, "screens", "phone_lock.png"), strength=1.6)

parts = []
# body: back glass (bottom), aluminium frame, front glass (top)
parts.append(rounded_slab("backglass", W - 0.0012, L - 0.0012, 0.0007, RC - 0.0006, 0.0003, back, z0=0.0))
parts.append(rounded_slab("frame", W, L, T - 0.0013, RC, RE, alu, z0=0.0004, edge_seg=8))
parts.append(rounded_slab("frontglass", W - 0.0010, L - 0.0010, 0.0008, RC - 0.0005, 0.0004, front, z0=T - 0.0010,
                          edge_seg=5))
# display under the glass surface, 1.6 mm bezel; island cut-out on top of it
zs = T - 0.0002 + 0.00002
parts.append(screen_quad("screen", W - 0.0042, L - 0.0042, RC - 0.0022, zs, screen))
parts.append(rounded_slab("island", 0.0124, 0.0037, 0.00002, 0.00185, 0.0, front, z0=zs + 0.000005,
                          loc=(0.0, L / 2 - 0.0042 - 0.0045)))
# antenna bands: thin plastic inlays around the frame
for x, y, w_, l_ in ((W / 2 - 0.0002, L / 2 - 0.016, 0.0006, 0.0016), (-W / 2 + 0.0002, L / 2 - 0.016, 0.0006, 0.0016),
                     (W / 2 - 0.0002, -L / 2 + 0.016, 0.0006, 0.0016), (-W / 2 + 0.0002, -L / 2 + 0.016, 0.0006, 0.0016)):
    parts.append(rounded_slab("band", w_, l_, T - 0.0026, 0.0002, 0.0001, band, z0=0.0011, loc=(x, y)))
# side buttons (+x: power; -x: action + volume)
for x, y, l_ in ((W / 2 + 0.0004, 0.022, 0.0165), (-W / 2 - 0.0004, 0.039, 0.0062),
                 (-W / 2 - 0.0004, 0.024, 0.0098), (-W / 2 - 0.0004, 0.011, 0.0098)):
    parts.append(rounded_slab("button", 0.0012, l_, 0.0033, 0.0005, 0.0003, alu, z0=T / 2 - 0.00165, loc=(x, y)))

# bottom edge: USB-C port and speaker grilles (built in the x/z plane, rotated onto the -y face)
def on_bottom(ob, x, z):
    transform(ob, Matrix.Rotation(math.radians(90), 4, "X"))
    transform(ob, Matrix.Translation((x, -L / 2 + 0.0003, z)))
    return ob


port = rounded_slab("port", 0.0089, 0.0031, 0.0006, 0.00155, 0.0, dark, z0=-0.0003)
parts.append(on_bottom(port, 0.0, T / 2))
for i in range(6):
    for side in (-1, 1):
        h = cylinder("grille", 0.00048, 0.0006, dark, loc=(0, 0, -0.0003), seg=20)
        parts.append(on_bottom(h, side * (0.0105 + i * 0.0019), T / 2))

# camera plateau on the back (below z = 0), three lenses + flash
cx, cy = -W / 2 + 0.0185, L / 2 - 0.0185
parts.append(rounded_slab("plateau", 0.031, 0.031, BUMP, 0.0075, 0.0007, back, z0=-BUMP + 0.0002, loc=(cx, cy)))
for dx, dy in ((-0.0072, 0.0072), (-0.0072, -0.0072), (0.0072, 0.0)):
    r_ = cylinder("ring", 0.0062, 0.0012, ring, loc=(cx + dx, cy + dy, -BUMP - 0.0010), seg=72, r_edge=0.0003)
    g_ = cylinder("lens", 0.0047, 0.0006, lens_glass, loc=(cx + dx, cy + dy, -BUMP - 0.00105), seg=72, r_edge=0.0002)
    parts += [r_, g_]
parts.append(cylinder("flash", 0.0021, 0.0004, lens_glass, loc=(cx + 0.0072, cy + 0.0108, -BUMP - 0.0001), seg=40))

# rest on the table: the lenses touch at z = 0, the bottom edge of the body touches at the far end
lowest = -BUMP - 0.0010
tilt = math.atan2(-lowest, (cy + 0.0108) - (-L / 2))
for p in parts:
    transform(p, Matrix.Translation((0, 0, -lowest)))
    transform(p, Matrix.Translation((0, -L / 2, 0)) @ Matrix.Rotation(-tilt, 4, "X") @ Matrix.Translation((0, L / 2, 0)))

finish("phone", parts, dims=(0.075, 0.155, 0.009), note="lying screen-up, tilted onto the camera plateau")
