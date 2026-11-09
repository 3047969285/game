"""Hero prop: classroom blackboard with today's lesson. Kit "blackboard", 3.6 x 0.08 x 1.2 m.

Blender -b -P Tools/props/hero_blackboard.py     (chalk design from Tools/props/hero_textures.py first)

Slate panel carrying the chalk design (erased smears, handwritten title, word list, sketch), anodised
aluminium frame with mitred corners and wear, wall brackets behind. Front toward +Y, bottom edge at z = 0
(the scene sets the mounting height). Chalk dust collects on the lower frame through the dirt layer.
"""
import math
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from hero_common import OUT, finish, pbr, reset, rounded_slab, subdivide  # noqa: E402
from mathutils import Matrix  # noqa: E402

W, H, D = 3.6, 1.2, 0.03
F = 0.035                                   # frame width


def stand_up(ob, y, zc):
    ob.data.transform(Matrix.Rotation(math.radians(-90), 4, "X"))
    ob.data.transform(Matrix.Translation((0, y, zc)))
    return ob


reset()
slate = pbr("slate", "#808080", rough=0.86, metal=0.0, grain=0.06, grain_scale=8.0, dirt=0.1, smudge=0.4, bump=0.25,
            bump_scale=1800.0, rough_var=0.08, image=os.path.join(OUT, "designs", "blackboard_u01.png"),
            image_plane="XZ", image_size=(W - 2 * F, H - 2 * F), image_center=(0.0, H / 2))
alu = pbr("frame", "#9DA2A8", rough=0.42, metal=1.0, grain=0.06, wear=0.6, wear_color="#D4D7DA", dirt=0.55,
          scratches=0.45, scratch_scale=30.0, smudge=0.4, bump=0.08)
steel = pbr("bracket", "#3A3D41", rough=0.5, metal=1.0, grain=0.05, wear=0.3, dirt=0.4, bump=0.1)

parts = []
board = stand_up(rounded_slab("slate", W - 2 * F + 0.004, H - 2 * F + 0.004, 0.012, 0.002, 0.001, slate, z0=-0.012,
                              seg=2, edge_seg=1), 0.022, H / 2)
subdivide(board, 6)
parts.append(board)
# frame: four rails with rounded profile, slightly proud of the slate
for (w, h, x, z) in ((W, F, 0, F / 2), (W, F, 0, H - F / 2), (F, H - 2 * F, -W / 2 + F / 2, H / 2), (F, H - 2 * F, W / 2 - F / 2, H / 2)):
    rail = rounded_slab("rail", w, h, D, 0.003, 0.005, alu, z0=-D, seg=3, edge_seg=5)
    stand_up(rail, D, z)
    rail.data.transform(Matrix.Translation((x, 0, 0)))
    parts.append(rail)
# corner keys (mitre covers)
for x in (-W / 2 + F / 2, W / 2 - F / 2):
    for z in (F / 2, H - F / 2):
        k = rounded_slab("corner", F + 0.004, F + 0.004, 0.006, 0.006, 0.002, steel, z0=-0.006, seg=4, edge_seg=3)
        stand_up(k, D + 0.004, z)
        k.data.transform(Matrix.Translation((x, 0, 0)))
        parts.append(k)
# wall brackets (behind, visible from the side)
for x in (-1.2, 0.0, 1.2):
    b = rounded_slab("bracket", 0.08, 0.06, 0.012, 0.006, 0.002, steel, z0=-0.012, seg=3, edge_seg=2)
    stand_up(b, 0.0, H - 0.12)
    b.data.transform(Matrix.Translation((x, 0, 0)))
    parts.append(b)

finish("blackboard", parts, dims=(W, 0.08, H), note="front toward +Y, bottom edge at z = 0")
