"""Hero prop: wall with a run of tall windows. Kit "window_wall", 5.0 x 0.2 x 3.0 m (room side toward +Y).

Blender -b -P Tools/props/hero_window_wall.py

Plastered wall (CC0 scan) with three 1.2 x 1.8 m openings: deep reveals, powder-coated aluminium frames with a
mullion and transom, opening sash with a handle, clear glass (external M_ArchGlass), stone sills inside and a
radiator under the middle window. Dirt collects in the frame corners and on the sills.
"""
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from hero_common import cylinder, external, finish, pbr, reset, rounded_slab, subdivide  # noqa: E402
from mathutils import Matrix  # noqa: E402

W, T, H = 5.0, 0.2, 3.0
WIN_W, WIN_H, SILL_Z = 1.2, 1.8, 0.85
CENTERS = (-1.6, 0.0, 1.6)

reset()
plaster = pbr("plaster", "#ECE8E0", rough=0.85, metal=0.0, grain=0.04, dirt=0.35, wear=0.25, bump=0.1,
              scan="white_plaster_02", scan_size=1.6)
alu = pbr("frame", "#3B3E42", rough=0.45, metal=0.6, grain=0.04, wear=0.35, wear_color="#7A7D80", dirt=0.6,
          scratches=0.2, bump=0.08)
stone = pbr("sill", "#BDB8AE", rough=0.35, metal=0.0, grain=0.3, grain_scale=900.0, wear=0.3, dirt=0.4,
            scratches=0.25, smudge=0.3, bump=0.05, scan="concrete_wall_003", scan_size=0.8, scan_tint="#E8E4DC")
steel = pbr("radiator", "#E9E7E2", rough=0.4, metal=0.0, grain=0.03, wear=0.3, dirt=0.5, bump=0.05)
glass = external("glass", "/Game/Memory/Materials/FX/M_ArchGlass")


def stand(ob, y, z):
    ob.data.transform(Matrix.Rotation(1.5707963, 4, "X"))   # slab thickness (z) -> wall depth (y)
    ob.data.transform(Matrix.Translation((0, y, z)))
    return ob


def box(name, w, d, h, x, y, z, mat, r=0.003, seg=3):
    return rounded_slab(name, w, d, h, r, r, mat, z0=z, seg=seg, edge_seg=seg, loc=(x, y))


parts = []
# wall built from pieces around the openings (no booleans): below, above, and the piers between windows
parts.append(box("wall_low", W, T, SILL_Z, 0, 0, 0, plaster, r=0.0005))   # tiny radius: joints must not read as grooves
parts.append(box("wall_high", W, T, H - SILL_Z - WIN_H, 0, 0, SILL_Z + WIN_H, plaster, r=0.0005))
edges = [-W / 2] + [c + s * WIN_W / 2 for c in CENTERS for s in (-1, 1)] + [W / 2]
for x0, x1 in zip(edges[0::2], edges[1::2]):
    parts.append(box("pier", x1 - x0, T, WIN_H, (x0 + x1) / 2, 0, SILL_Z, plaster, r=0.0005))
for p in parts:
    subdivide(p, 3)

for cx in CENTERS:
    # frame: outer ring 60 mm, set back 40 mm from the room face
    fy = -0.02
    for (w, h, x, z) in ((WIN_W, 0.06, cx, SILL_Z), (WIN_W, 0.06, cx, SILL_Z + WIN_H - 0.06),
                         (0.06, WIN_H, cx - WIN_W / 2 + 0.03, SILL_Z), (0.06, WIN_H, cx + WIN_W / 2 - 0.03, SILL_Z)):
        parts.append(box("frame", w, 0.07, h, x, fy, z, alu, r=0.004))
    parts.append(box("mullion", 0.05, 0.07, WIN_H - 0.12, cx, fy, SILL_Z + 0.06, alu, r=0.004))
    parts.append(box("transom", WIN_W - 0.12, 0.07, 0.05, cx, fy, SILL_Z + 1.35, alu, r=0.004))
    # glazing: two lower panes + top light, set in the frame plane
    for (w, h, x, z) in ((WIN_W / 2 - 0.085, 1.35 - 0.06 - 0.005, cx - WIN_W / 4 + 0.0125, SILL_Z + 0.06),
                         (WIN_W / 2 - 0.085, 1.35 - 0.06 - 0.005, cx + WIN_W / 4 - 0.0125, SILL_Z + 0.06),
                         (WIN_W - 0.12, WIN_H - 1.35 - 0.11, cx, SILL_Z + 1.4)):
        parts.append(box("pane", w, 0.008, h, x, fy, z, glass, r=0.001, seg=1))
    # sash handle on the right lower pane
    parts.append(box("handle_base", 0.03, 0.02, 0.08, cx + 0.06, fy + 0.045, SILL_Z + 0.65, alu, r=0.006))
    parts.append(cylinder("handle", 0.008, 0.11, alu, loc=(cx + 0.06, fy + 0.06, SILL_Z + 0.69), seg=24, r_edge=0.003))
    # inner stone sill projecting 40 mm into the room
    parts.append(box("sill", WIN_W + 0.1, T / 2 + 0.06, 0.03, cx, T / 4 + 0.03, SILL_Z - 0.03, stone, r=0.005))

# panel radiator under the middle window, on two brackets
for i in range(12):
    parts.append(box("rad_fin", 0.045, 0.06, 0.5, -0.33 + i * 0.06, T / 2 + 0.05, 0.18, steel, r=0.01, seg=4))
parts.append(box("rad_top", 0.74, 0.07, 0.02, 0, T / 2 + 0.05, 0.68, steel, r=0.006))
parts.append(cylinder("valve", 0.022, 0.07, alu, loc=(0.42, T / 2 + 0.05, 0.12), seg=32, r_edge=0.005))

finish("window_wall", parts, dims=(W, T, H), note="room side toward +Y; glass uses M_ArchGlass")
