"""Hero prop: wooden chess set mid-game. Kit "chess_set", 0.45 x 0.45 x 0.1 m (white at the -Y side).

Blender -b -P Tools/props/hero_chess_set.py

Unit 1 opens on two brothers absorbed in a game, so this is a close-up prop: inlaid maple/walnut board with a
walnut frame and felt underside, Staunton pieces turned on a lathe (boxwood / ebonised), knights from an
extruded, rounded horse-head silhouette, felt pads under every piece, a middlegame position.
"""
import math
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from hero_common import arc, cylinder, extrude_outline, finish, lathe, pbr, reset, rounded_slab  # noqa: E402
from mathutils import Matrix  # noqa: E402

B, BT = 0.45, 0.02                 # board size, board thickness
SQ = 0.05                          # square
Z0 = BT                            # pieces stand on the board top

reset()
maple = pbr("maple", "#E2C79A", rough=0.38, metal=0.0, grain=0.08, wear=0.2, dirt=0.25, scratches=0.2, smudge=0.3,
            bump=0.05, wood=0.5, color2="#C9A774", wood_scale=30.0,
            scan="white_maple_veneer", scan_size=0.35)
walnut = pbr("walnut", "#5C3A22", rough=0.4, metal=0.0, grain=0.1, wear=0.35, wear_color="#7A5234", dirt=0.3,
             scratches=0.25, smudge=0.3, bump=0.06, wood=0.7, color2="#3A2414", wood_scale=26.0,
             scan="walnut_veneer_02", scan_size=0.35, scan_tint="#7A5A44")   # the scan is lighter than real walnut
boxwood = pbr("boxwood", "#E8CFA0", rough=0.3, metal=0.0, grain=0.06, wear=0.25, wear_color="#F2DDB4", dirt=0.35,
              smudge=0.45, bump=0.03, wood=0.35, color2="#D2B07C", wood_scale=60.0,
              scan="white_maple_veneer", scan_size=0.12, scan_tint="#FFF6E6")   # ivory boxwood look
ebony = pbr("ebony", "#24180F", rough=0.28, metal=0.0, grain=0.05, wear=0.4, wear_color="#4A3424", dirt=0.25,
            smudge=0.5, bump=0.03, wood=0.3, color2="#120B06", wood_scale=60.0,
            scan="walnut_veneer_02", scan_size=0.12, scan_tint="#2B211B")   # ebonised
felt = pbr("felt", "#1F4A34", rough=0.95, metal=0.0, grain=0.1, dirt=0.4, bump=0.5, bump_scale=4000.0)


def base(r, h=0.008):
    """Foot shared by all pieces: rounded plinth, cove, bead."""
    return ([(0.0, 0.0), (r * 0.97, 0.0)] + arc(r * 0.97, 0.0015, 0.0015, -90, 0, 4)[1:] +
            [(r, h * 0.35), (r * 0.9, h * 0.55)] + arc(r * 0.82, h * 0.7, h * 0.18, -60, 90, 6) + [(r * 0.62, h)])


def pawn(s):
    p = base(0.0145 * s, 0.009 * s)
    p += [(0.0065 * s, 0.022 * s), (0.0092 * s, 0.024 * s), (0.0092 * s, 0.0255 * s), (0.0045 * s, 0.027 * s)]
    p += arc(0.0, 0.034 * s, 0.0075 * s, -60, 90, 12)
    return p


def rook(s):
    p = base(0.0155 * s, 0.01 * s)
    p += [(0.0085 * s, 0.03 * s), (0.0115 * s, 0.032 * s), (0.0118 * s, 0.045 * s), (0.0118 * s, 0.047 * s),
          (0.0078 * s, 0.047 * s), (0.0078 * s, 0.043 * s), (0.0, 0.043 * s)]
    return p


def bishop(s):
    p = base(0.015 * s, 0.01 * s)
    p += [(0.0062 * s, 0.034 * s), (0.0098 * s, 0.036 * s), (0.0098 * s, 0.0375 * s), (0.005 * s, 0.039 * s)]
    p += [(0.0075 * s, 0.043 * s), (0.0085 * s, 0.048 * s), (0.007 * s, 0.054 * s), (0.0035 * s, 0.058 * s),
          (0.0025 * s, 0.0595 * s)]
    p += arc(0.0, 0.0622 * s, 0.0028 * s, -60, 90, 6)
    return p


def queen(s):
    p = base(0.0165 * s, 0.011 * s)
    p += [(0.0066 * s, 0.04 * s), (0.0105 * s, 0.042 * s), (0.0105 * s, 0.0435 * s), (0.0055 * s, 0.045 * s),
          (0.0085 * s, 0.056 * s), (0.0098 * s, 0.06 * s), (0.0098 * s, 0.062 * s), (0.004 * s, 0.063 * s)]
    p += arc(0.0, 0.0655 * s, 0.0035 * s, -45, 90, 6)
    return p


def king(s):
    p = base(0.017 * s, 0.011 * s)
    p += [(0.0068 * s, 0.043 * s), (0.0108 * s, 0.045 * s), (0.0108 * s, 0.0465 * s), (0.0058 * s, 0.048 * s),
          (0.0088 * s, 0.06 * s), (0.0098 * s, 0.0635 * s), (0.0098 * s, 0.0655 * s), (0.0, 0.0655 * s)]
    return p


KNIGHT = [(-0.0105, 0.0), (0.0105, 0.0), (0.0118, 0.004), (0.0098, 0.010), (0.0110, 0.017), (0.0128, 0.0205),
          (0.0119, 0.0232), (0.0158, 0.0258), (0.0186, 0.0282), (0.0194, 0.0318), (0.0182, 0.0352),
          (0.0128, 0.0384), (0.0092, 0.0404), (0.0072, 0.0448), (0.0066, 0.0480), (0.0042, 0.0546),
          (0.0012, 0.0490), (-0.0008, 0.0532), (-0.0040, 0.0476), (-0.0086, 0.0440), (-0.0121, 0.0380),
          (-0.0139, 0.0300), (-0.0136, 0.0200), (-0.0119, 0.0100), (-0.0110, 0.0040)]   # chest, jaw, muzzle, ears, mane


def place(objs, file_, rank, wood, side):
    x = (file_ - 3.5) * SQ
    y = (rank - 3.5) * SQ
    for o in objs:
        if side > 0:
            o.data.transform(Matrix.Rotation(math.pi, 4, "Z"))
        o.data.transform(Matrix.Translation((x, y, Z0)))
    return objs


def piece(kind, file_, rank, side):
    wood = boxwood if side < 0 else ebony
    s = 1.0
    turned = {"p": pawn, "r": rook, "b": bishop, "q": queen, "k": king}
    objs = [cylinder("pad", 0.0125, 0.0008, felt, seg=48)]
    if kind == "n":
        objs.append(lathe("knight_base", base(0.0155, 0.01) + [(0.0, 0.01)], wood, seg=72))   # closed top
        head = extrude_outline("knight_head", [(u, v + 0.009) for u, v in KNIGHT], 0.0128, wood, bevel=0.0028, seg=4)
        for v in head.data.vertices:                     # muzzle ~40% narrower than the neck, ears pinched
            taper = 1.0 - 0.42 * min(1.0, max(0.0, v.co.x / 0.0195)) - 0.25 * min(1.0, max(0.0, (v.co.z - 0.052) / 0.008))
            v.co.y *= taper
        head.data.transform(Matrix.Rotation(math.radians(90), 4, "Z"))
        objs.append(head)
    else:
        objs.append(lathe(kind, turned[kind](s), wood, seg=72))
        for o in objs[1:]:
            o.data.transform(Matrix.Translation((0, 0, 0.0008)))
        if kind == "k":                                  # cross finial
            objs.append(rounded_slab("cross_v", 0.003, 0.003, 0.014, 0.0008, 0.0006, wood, z0=0.0655 + 0.0008, seg=3, edge_seg=2))
            objs.append(rounded_slab("cross_h", 0.010, 0.003, 0.003, 0.0008, 0.0006, wood, z0=0.0715 + 0.0008, seg=3, edge_seg=2))
        if kind == "q":                                  # coronet beads
            for i in range(8):
                a = 2 * math.pi * i / 8
                b = cylinder("bead", 0.0016, 0.0024, wood, loc=(0.0088 * math.cos(a), 0.0088 * math.sin(a), 0.0618), seg=16, r_edge=0.0007)
                objs.append(b)
        if kind == "r":                                  # crenellations
            for i in range(4):
                a = 2 * math.pi * i / 4 + math.pi / 4
                m = rounded_slab("merlon", 0.007, 0.0045, 0.004, 0.0012, 0.0006, wood, z0=0.0478,
                                 loc=(0.0098 * math.cos(a), 0.0098 * math.sin(a)), seg=3, edge_seg=2)
                m.data.transform(Matrix.Translation((0, 0, 0)))
                objs.append(m)
    return place(objs, file_, rank, wood, side)


parts = []
# board: walnut frame, inlaid squares, felt underside
parts.append(rounded_slab("frame", B, B, BT - 0.002, 0.004, 0.0025, walnut, z0=0.002, seg=4, edge_seg=5))
parts.append(rounded_slab("felt_bottom", B - 0.01, B - 0.01, 0.002, 0.003, 0.0, felt, z0=0.0, seg=4))
for f in range(8):
    for r in range(8):
        mat = maple if (f + r) % 2 else walnut
        parts.append(rounded_slab("sq", SQ - 0.0006, SQ - 0.0006, 0.0012, 0.0004, 0.0002, mat, z0=BT - 0.0009,
                                  loc=((f - 3.5) * SQ, (r - 3.5) * SQ), seg=2, edge_seg=1))

# middlegame (files a..h = 0..7, ranks 1..8 = 0..7); white = -1 (boxwood, -Y side), black = +1
POS = {"w": "Ra1 Qd1 Ke1 Rh1 Bc4 Nf3 Nc3 Pa2 Pb2 Pc2 Pd4 Pf2 Pg2 Ph3 Pe5",
       "b": "Ra8 Qd8 Rf8 Kg8 Bc8 Be7 Nc6 Nf6 Pa7 Pb7 Pc5 Pd5 Pf7 Pg7 Ph7"}
for color, side in (("w", -1), ("b", 1)):
    for tok in POS[color].split():
        kind = tok[0].lower()
        f, r = "abcdefgh".index(tok[1]), int(tok[2]) - 1
        parts += piece(kind, f, r, side)

finish("chess_set", parts, dims=(B, B, 0.1), note="white (boxwood) at -Y; middlegame position")
