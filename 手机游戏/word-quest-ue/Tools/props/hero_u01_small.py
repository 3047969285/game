"""D28 hero props: unit-1 small objects. Shared builders, one per kit.

Run one kit:      HERO_RES=512 HERO_SAMPLES=2 /Applications/Blender.app/Contents/MacOS/Blender -b -P Tools/props/hero_keyboard.py
All at once:      Tools/props/bake_u01_small.sh
Conventions: metres, origin = footprint centre on the floor, front toward +Y, bottom at z = 0.
"""
import math
import os
import sys

from mathutils import Matrix

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from hero_common import OUT, arc, check_contacts, cylinder, extrude_outline, finish, lathe, pbr, reset, rounded_slab  # noqa: E402

DESIGNS = os.path.join(OUT, "designs")

KEYBOARD_ROWS = [
    [("esc", 1), ("1", 1), ("2", 1), ("3", 1), ("4", 1), ("5", 1), ("6", 1), ("7", 1), ("8", 1), ("9", 1), ("0", 1), ("-", 1), ("=", 1), ("back", 2)],
    [("tab", 1.5), ("q", 1), ("w", 1), ("e", 1), ("r", 1), ("t", 1), ("y", 1), ("u", 1), ("i", 1), ("o", 1), ("p", 1), ("[", 1), ("]", 1), ("\\", 1.5)],
    [("caps", 1.75), ("a", 1), ("s", 1), ("d", 1), ("f", 1), ("g", 1), ("h", 1), ("j", 1), ("k", 1), ("l", 1), (";", 1), ("'", 1), ("enter", 2.25)],
    [("shift", 2.25), ("z", 1), ("x", 1), ("c", 1), ("v", 1), ("b", 1), ("n", 1), ("m", 1), (",", 1), (".", 1), ("/", 1), ("shift", 1.75)],
    [("ctrl", 1.25), ("win", 1.25), ("alt", 1.25), ("space", 6.25), ("alt", 1.25), ("fn", 1.25), ("menu", 1.25), ("ctrl", 1.25)],
]



def print_mat(role, name, plane="XZ", size=(0.2, 0.2), center=(0.0, 0.0), rough=0.62, wear=0.25, dirt=0.3,
              smudge=0.35, bump=0.04):
    return pbr(role, "#E8E4DA", rough=rough, metal=0.0, grain=0.03, wear=wear, dirt=dirt, scratches=0.08,
               smudge=smudge, bump=bump, image=os.path.join(DESIGNS, name), image_plane=plane,
               image_size=size, image_center=center)


def rot(ob, deg, axis="Y"):
    ob.data.transform(Matrix.Rotation(math.radians(deg), 4, axis))
    return ob


def move(ob, x, y, z=0.0):
    ob.data.transform(Matrix.Translation((x, y, z)))
    return ob


def belt_segment(name, w, length, thick, material, angle, x, y, z):
    ob = rounded_slab(name, length, w, thick, thick * 0.35, thick * 0.22, material, z0=0.0, seg=6, edge_seg=3)
    rot(ob, angle, "Y")
    return move(ob, x, y, z)


# ------------------------------------------------------------------ builders
def build_keyboard():
    W, L, T = 0.44, 0.14, 0.03
    U = W / 15.0
    rows = KEYBOARD_ROWS
    body = pbr("body", "#2A2C30", rough=0.42, grain=0.06, wear=0.2, dirt=0.35, scratches=0.2, smudge=0.5, bump=0.06)
    keys = pbr("keys", "#3A3D42", rough=0.46, grain=0.05, wear=0.35, wear_color="#565A60", dirt=0.4,
               scratches=0.18, smudge=0.45, bump=0.05)
    legend = print_mat("legend", "keyboard_labels.png", plane="XY", size=(-(W - 0.008), -(L - 0.008)), rough=0.48,
                       wear=0.4, dirt=0.35, smudge=0.5, bump=0.05)
    parts = [rounded_slab("body", W, L, T - 0.016, 0.008, 0.004, body, z0=0.0015, seg=10, edge_seg=5),
             rounded_slab("belly", W - 0.01, L - 0.01, 0.002, 0.006, 0.001, body, z0=0.0, seg=8)]
    row_h = L / len(rows)
    for r, row in enumerate(rows):
        x = -W / 2
        y = L / 2 - (r + 0.5) * row_h
        for label, units in row:
            kw = units * U - 0.0026
            kl = row_h - 0.0034
            cap = rounded_slab("key_%s_%d_%d" % (label, r, int(x * 1000)), kw, kl, 0.0136, 0.0022, 0.0016, keys,
                               z0=0.0162, loc=(x + kw / 2 + 0.0013, y), seg=6, edge_seg=4)
            parts.append(cap)
            parts.append(rounded_slab("legend_%d_%d" % (r, int(x * 1000)), kw - 0.0014, kl - 0.0014, 0.0008,
                                      0.0018, 0.0004, legend, z0=T - 0.0006,
                                      loc=(x + kw / 2 + 0.0013, y), seg=4, edge_seg=2))
            x += units * U
    for sx in (-1, 1):
        for sy in (-1, 1):
            parts.append(cylinder("foot", 0.004, 0.0015, body, loc=(sx * (W / 2 - 0.02), sy * (L / 2 - 0.015), 0.0015), seg=18))
    return parts, (W, L, T), "keycaps carry a projected legend atlas (keyboard_labels.png); front toward +Y"


def build_headphones():
    W, L, H = 0.2, 0.1, 0.22
    metal = pbr("metal", "#B7BCC2", rough=0.3, metal=1.0, grain=0.05, wear=0.5, dirt=0.3, scratches=0.3, smudge=0.35, bump=0.05)
    dark = pbr("dark", "#22262B", rough=0.5, grain=0.05, wear=0.3, dirt=0.35, smudge=0.5, bump=0.06)
    leather = pbr("leather", "#2C2622", rough=0.55, grain=0.08, wear=0.45, wear_color="#4A3E36", dirt=0.45,
                  scratches=0.35, smudge=0.6, bump=0.12, scan="fabric_leather_01", scan_size=0.18, scan_tint="#8A7C70")
    fabric = pbr("fabric", "#1A1C1F", rough=0.9, grain=0.1, dirt=0.5, bump=0.2, scan="dirty_carpet", scan_size=0.08, scan_tint="#55585C")
    parts = []
    pts = arc(0.0, 0.0, 0.098, 18, 162, 36)
    parts.append(extrude_outline("headband", [(x, z + 0.120) for x, z in pts], 0.016, leather, plane="XZ", bevel=0.006, seg=4))
    parts.append(extrude_outline("band_pad", [(x, z + 0.129) for x, z in arc(0.0, 0.0, 0.088, 30, 150, 28)], 0.010, fabric, plane="XZ", bevel=0.004, seg=3))
    for sx in (-1, 1):
        cup_c = sx * 0.096
        # telescopic slider: upper tube overlaps headband, lower tube overlaps cup trunnion
        parts.append(cylinder("slider", 0.006, 0.052, metal, loc=(cup_c, 0.0, 0.132), seg=32, r_edge=0.0015))
        parts.append(rounded_slab("trunnion", 0.012, 0.02, 0.03, 0.004, 0.003, dark, z0=0.100, loc=(cup_c, 0.0), seg=5))
        parts.append(cylinder("arm", 0.007, 0.03, metal, loc=(cup_c, 0.0, 0.098), seg=32))
        parts.append(cylinder("cup_outer", 0.048, 0.034, dark, loc=(cup_c - 0.017, 0.0, 0.012), seg=64, r_edge=0.006, axis="X"))
        parts.append(cylinder("cup_ring", 0.05, 0.004, metal, loc=(sx * 0.113 - 0.002, 0.0, 0.012), seg=64, r_edge=0.0015, axis="X"))
        # bulging leather cushion: lathe with a soft profile, open toward the head (inside)
        parts.append(lathe("cushion", [(0.0, 0.0), (0.042, 0.0), (0.046, 0.006), (0.044, 0.014), (0.038, 0.019), (0.0, 0.020)],
                           leather, loc=(sx * 0.092, 0.0, 0.012), seg=64))
        parts.append(cylinder("mesh", 0.034, 0.003, fabric, loc=(sx * 0.078, 0.0, 0.013), seg=48, axis="X"))
    return parts, (W, L, H), "over-ear headphones: slider tube -> trunnion -> yoke arm, bulging leather cushions"


def build_wifi_router():
    W, L, H = 0.22, 0.15, 0.04
    shell = pbr("shell", "#D8D6D0", rough=0.34, grain=0.04, wear=0.3, dirt=0.4, scratches=0.2, smudge=0.45, bump=0.05)
    dark = pbr("dark", "#26292E", rough=0.55, grain=0.04, wear=0.2, dirt=0.5, bump=0.06)
    metal = pbr("metal", "#9EA4AA", rough=0.3, metal=1.0, grain=0.04, wear=0.3, dirt=0.3, bump=0.04)
    leds = __import__("hero_common").emissive("leds", os.path.join(DESIGNS, "router_leds.png"), strength=3.0)
    parts = [rounded_slab("shell", W, L, H - 0.010, 0.012, 0.006, shell, z0=0.006, seg=8, edge_seg=5),
             rounded_slab("top", W - 0.012, L - 0.018, 0.004, 0.01, 0.003, shell, z0=H - 0.004, seg=6, edge_seg=4)]
    for i in range(7):                                   # ventilation slots on top
        parts.append(rounded_slab("vent", W - 0.035, 0.0035, 0.0012, 0.0014, 0.0006, dark, z0=H - 0.0035,
                                  loc=(0, -0.045 + i * 0.014), seg=3))
    # two external antennas: hinge boss on the housing (contact) + upright antenna, folded slightly back
    for sx in (-1, 1):
        parts.append(cylinder("antenna_boss", 0.010, 0.010, dark, loc=(sx * 0.075, -L / 2 + 0.018, H - 0.006), seg=24))
        ant = rounded_slab("antenna", 0.011, 0.011, 0.085, 0.005, 0.004, dark, z0=H - 0.002,
                           loc=(sx * 0.075, -L / 2 + 0.018), seg=5, edge_seg=3)
        rot(ant, -18, "X")
        parts.append(ant)
    # front status LEDs (emissive strip) and rear RJ45 ports
    parts.append(rounded_slab("led_window", 0.06, 0.010, 0.002, 0.002, 0.001, leds, z0=H - 0.003,
                              loc=(-W / 2 + 0.05, L / 2 - 0.016), seg=3))
    for i in range(4):
        parts.append(rounded_slab("rj45", 0.016, 0.010, 0.010, 0.0015, 0.001, dark, z0=0.012,
                                  loc=(-0.075 + i * 0.032, -L / 2 + 0.002), seg=3))
        parts.append(rounded_slab("rj45_metal", 0.014, 0.006, 0.007, 0.001, 0.001, metal, z0=0.0135,
                                  loc=(-0.075 + i * 0.032, -L / 2 + 0.007), seg=3))
    # rubber feet
    for sx in (-1, 1):
        for sy in (-1, 1):
            parts.append(cylinder("foot", 0.006, 0.006, dark, loc=(sx * (W / 2 - 0.02), sy * (L / 2 - 0.02), 0.0), seg=16))
    return parts, (W, L, H), "wifi router: 2 hinged antennas, 4 RJ45 ports, vents, emissive LED strip, rubber feet"


def build_recipe_book():
    W, L, T = 0.2, 0.26, 0.03
    paper = pbr("paper", "#EFE8D8", rough=0.72, grain=0.03, wear=0.15, dirt=0.25, scratches=0.05, smudge=0.4, bump=0.03)
    cloth = pbr("cloth", "#8A5A42", rough=0.75, grain=0.06, wear=0.35, dirt=0.35, bump=0.08,
                scan="rough_linen", scan_size=0.2, scan_tint="#B08A72")
    cover = print_mat("cover", "recipe_cover.png", plane="XZ", size=(W - 0.008, L - 0.01), center=(0.0, T / 2), rough=0.6, wear=0.3, dirt=0.3)
    parts = [rounded_slab("pages", W - 0.008, L - 0.012, T - 0.006, 0.003, 0.0015, paper, z0=0.003, seg=6, edge_seg=3),
             rounded_slab("boards", W, L, 0.004, 0.003, 0.002, cloth, z0=0.0015, seg=6, edge_seg=3),
             rounded_slab("spine", 0.012, L, T, 0.004, 0.003, cloth, z0=0.0, loc=(-W / 2 + 0.006, 0), seg=6, edge_seg=4),
             rounded_slab("cover_print", W - 0.01, L - 0.012, 0.0012, 0.004, 0.0006, cover, z0=T - 0.002, seg=4, edge_seg=2)]
    for i in range(5):                                  # page-block edge grooves
        parts.append(rounded_slab("page_line", 0.0012, L - 0.014, 0.001, 0.0004, 0.0002, paper,
                                  z0=0.004 + i * 0.004, loc=(W / 2 - 0.002, 0), seg=2))
    return parts, (W, L, T), "hardback cookbook; front cover print (recipe_cover.png) faces +Y"


def build_duster():
    W, L, H = 0.14, 0.06, 0.05
    wood = pbr("wood", "#9A6B3E", rough=0.45, grain=0.08, wear=0.45, dirt=0.45, scratches=0.35, smudge=0.3, bump=0.06,
               wood=0.5, color2="#6E4A26", wood_scale=40.0, scan="fine_grained_wood", scan_size=0.22)
    felt = pbr("felt", "#2E3236", rough=0.95, grain=0.1, wear=0.15, dirt=0.5, bump=0.35,
               scan="dirty_carpet", scan_size=0.1, scan_tint="#585C60")
    dust = pbr("dust", "#D8D2C4", rough=1.0, grain=0.25, wear=0.0, dirt=0.2, bump=0.4)
    parts = [rounded_slab("block", W, L, 0.030, 0.010, 0.006, wood, z0=0.014, seg=8, edge_seg=5),
             rounded_slab("handle", W * 0.55, L * 0.60, 0.016, 0.012, 0.005, wood, z0=0.044, seg=6, edge_seg=4),
             rounded_slab("felt", W - 0.006, L - 0.006, 0.014, 0.010, 0.004, felt, z0=0.0, seg=8, edge_seg=4)]
    for i in range(10):                                  # chalk dust caught in the felt
        x = -W / 2 + 0.012 + (i % 5) * 0.028
        y = -L / 2 + 0.012 + (i // 5) * 0.032
        parts.append(rounded_slab("dust", 0.018, 0.010, 0.001, 0.004, 0.0005, dust, z0=0.0135, loc=(x, y), seg=3))
    return parts, (W, L, H), "blackboard eraser: wooden handle block + felt pad + chalk dust (was 'duster')"


def build_chalk_tray():
    W, L, H = 3.0, 0.08, 0.05
    wood = pbr("wood", "#4A3A2C", rough=0.5, grain=0.08, wear=0.35, dirt=0.5, scratches=0.3, smudge=0.4, bump=0.08,
               wood=0.6, color2="#2E2318", wood_scale=30.0, scan="walnut_veneer_02", scan_size=0.4)
    chalk = pbr("chalk", "#E9E6DC", rough=0.85, grain=0.05, wear=0.1, dirt=0.25, bump=0.15)
    parts = [rounded_slab("base", W, L, 0.012, 0.006, 0.004, wood, z0=0.002, seg=6, edge_seg=4),
             rounded_slab("lip", W, 0.006, 0.028, 0.002, 0.0015, wood, z0=0.012, loc=(0, L / 2 - 0.003), seg=4),
             rounded_slab("back", W, 0.006, 0.038, 0.002, 0.0015, wood, z0=0.012, loc=(0, -L / 2 + 0.003), seg=4)]
    for sx in (-1, 1):
        parts.append(rounded_slab("end", 0.008, L, 0.038, 0.002, 0.0015, wood, z0=0.012, loc=(sx * (W / 2 - 0.004), 0), seg=4))
    for i in range(7):
        x = -W / 2 + 0.10 + i * 0.42
        parts.append(cylinder("chalk", 0.0045, 0.055, chalk, loc=(x - 0.0275, 0.008, 0.014), seg=32, axis="X"))
    for i in range(3):
        parts.append(cylinder("stub", 0.0045, 0.022, chalk, loc=(-1.1 + i * 0.9, -0.018, 0.014), seg=24, axis="X"))
    return parts, (W, L, H), "3 m blackboard chalk tray with 7 chalks; mounts under the board, bottom at z=0"


def build_sandwich_plate():
    W, L, H = 0.24, 0.24, 0.06
    ceramic = pbr("ceramic", "#EDE8DC", rough=0.16, metal=0.0, grain=0.02, wear=0.25, dirt=0.25, scratches=0.12, smudge=0.45, bump=0.02)
    bread = pbr("bread", "#C9964F", rough=0.7, grain=0.12, wear=0.2, wear_color="#E0B46E", dirt=0.35, bump=0.22,
                scan="fine_grained_wood", scan_size=0.08, scan_tint="#E8C48C")
    crust = pbr("crust", "#8E5A28", rough=0.8, grain=0.1, wear=0.2, dirt=0.35, bump=0.25)
    lettuce = pbr("lettuce", "#5E8C3A", rough=0.55, grain=0.2, wear=0.15, dirt=0.25, bump=0.3)
    cheese = pbr("cheese", "#E4B84C", rough=0.5, grain=0.08, wear=0.15, dirt=0.2, bump=0.15)
    tomato = pbr("tomato", "#B23A2A", rough=0.42, grain=0.1, wear=0.15, dirt=0.2, bump=0.12)
    parts = [lathe("plate", [(0.0, 0.0), (0.10, 0.0), (0.118, 0.004), (0.12, 0.012), (0.112, 0.016), (0.10, 0.016),
                             (0.094, 0.014), (0.09, 0.010), (0.0, 0.010)], ceramic, seg=96)]
    # triangular cut sandwich: three wedge layers (bread / filling / bread), crust rim, lettuce frill
    def wedge(name, r, t, z0, m, angle=38):
        pts = arc(0.0, 0.0, r, 0, angle, 24)
        ob = extrude_outline(name, pts, t, m, plane="XY", bevel=0.003, seg=3)
        ob.data.transform(Matrix.Translation((0.0, 0.0, z0)))
        return ob
    parts.append(wedge("bread_bottom", 0.105, 0.014, 0.016, bread))
    parts.append(wedge("crust_rim", 0.108, 0.004, 0.014, crust))
    parts.append(wedge("lettuce", 0.112, 0.004, 0.030, lettuce, 42))
    parts.append(wedge("cheese", 0.104, 0.004, 0.034, cheese))
    parts.append(wedge("tomato", 0.098, 0.005, 0.038, tomato, 42))
    parts.append(wedge("bread_top", 0.104, 0.014, 0.043, bread))
    parts.append(wedge("crust_top", 0.107, 0.004, 0.041, crust))
    for i in range(7):                                   # ruffled lettuce edge peeking out
        a = 4 + i * 6
        parts.append(cylinder("frill", 0.012, 0.004, lettuce, loc=(0.118 * math.cos(math.radians(a)), 0.118 * math.sin(math.radians(a)), 0.030), seg=12))
    parts.append(cylinder("pick", 0.0015, 0.05, crust, loc=(0.03, 0.02, 0.05), seg=12))
    return parts, (W, L, H), "ceramic plate + triangular club sandwich (bread crust, ruffled lettuce, cheese/tomato)"


def build_coupon_card():
    W, L, T = 0.09, 0.055, 0.003
    paper = print_mat("paper", "coupon_face.png", plane="XY", size=(W, L), rough=0.55, wear=0.2, dirt=0.2, smudge=0.4)
    edge = pbr("edge", "#F0E9DA", rough=0.8, grain=0.03, wear=0.1, dirt=0.2, bump=0.03)
    parts = [rounded_slab("card", W, L, 0.0022, 0.003, 0.0012, edge, z0=0.0, seg=8, edge_seg=3),
             rounded_slab("print", W - 0.002, L - 0.002, 0.0008, 0.003, 0.0004, paper, z0=0.0022, seg=6, edge_seg=2)]
    return parts, (W, L, T), "café coupon card lying face-up (+Z); print is coupon_face.png"


def build_qr_sign():
    W, L, H = 0.25, 0.02, 0.32
    metal = pbr("metal", "#9AA0A6", rough=0.32, metal=1.0, grain=0.04, wear=0.35, dirt=0.35, scratches=0.3, bump=0.04)
    dark = pbr("acrylic", "#14181C", rough=0.12, grain=0.02, wear=0.1, dirt=0.2, smudge=0.5, bump=0.01)
    qr = print_mat("qr", "qr_panel.png", plane="XZ", size=(W - 0.03, H - 0.05), center=(0.0, (H - 0.05) / 2), rough=0.2, wear=0.12, dirt=0.2, smudge=0.5)
    parts = [rounded_slab("panel", W, L, H - 0.05, 0.008, 0.004, dark, z0=0.05, seg=8, edge_seg=5),
             rounded_slab("print", W - 0.024, 0.0015, H - 0.06, 0.006, 0.0008, qr, z0=0.055, loc=(0, L / 2 - 0.001), seg=6, edge_seg=2),
             rounded_slab("foot", W * 0.7, 0.02, 0.04, 0.008, 0.004, metal, z0=0.01, seg=8, edge_seg=4),
             rounded_slab("post", 0.02, 0.012, 0.02, 0.004, 0.002, metal, z0=0.04, loc=(0, 0), seg=6)]
    return parts, (W, L, H), "table QR sign; printed face +Y"


def build_payment_sign():
    W, L, H = 0.5, 0.02, 0.35
    metal = pbr("metal", "#B9BEC4", rough=0.28, metal=1.0, grain=0.04, wear=0.4, dirt=0.35, scratches=0.3, bump=0.04)
    dark = pbr("acrylic", "#101418", rough=0.14, grain=0.02, wear=0.12, dirt=0.2, smudge=0.5, bump=0.01)
    face = print_mat("face", "payment_panel.png", plane="XZ", size=(W - 0.04, H - 0.06), center=(0.0, (H - 0.06) / 2), rough=0.22, wear=0.12, dirt=0.2, smudge=0.5)
    parts = [rounded_slab("panel", W, L, H - 0.06, 0.012, 0.006, dark, z0=0.06, seg=8, edge_seg=5),
             rounded_slab("face", W - 0.03, 0.0015, H - 0.07, 0.008, 0.001, face, z0=0.065, loc=(0, L / 2 - 0.001), seg=6, edge_seg=2),
             rounded_slab("base", W * 0.55, 0.02, 0.03, 0.012, 0.006, metal, z0=0.015, seg=8, edge_seg=5),
             rounded_slab("stem", 0.05, 0.02, 0.03, 0.008, 0.004, metal, z0=0.04, seg=6)]
    return parts, (W, L, H), "checkout 'PAY HERE' sign; printed face +Y"


def build_device_box():
    W, L, H = 0.3, 0.2, 0.12
    card = pbr("card", "#C4B9A4", rough=0.8, grain=0.06, wear=0.35, dirt=0.4, scratches=0.2, bump=0.06)
    top = print_mat("top", "box_print.png", plane="XY", size=(W - 0.02, L - 0.02), rough=0.72, wear=0.3, dirt=0.35)
    dark = pbr("foam", "#E8E4D8", rough=0.95, grain=0.04, dirt=0.3, bump=0.1)
    parts = [rounded_slab("box", W, L, H - 0.006, 0.006, 0.004, card, z0=0.004, seg=6, edge_seg=4),
             rounded_slab("lid_print", W - 0.016, L - 0.016, 0.0015, 0.005, 0.0008, top, z0=H - 0.0025, seg=5, edge_seg=2)]
    for sx in (-1, 1):
        parts.append(rounded_slab("flap", W * 0.6, 0.015, 0.002, 0.004, 0.0008, card, z0=H - 0.001, loc=(0, sx * (L / 2 - 0.007)), seg=4))
    parts.append(rounded_slab("tape", 0.03, L - 0.01, 0.001, 0.002, 0.0006, dark, z0=H - 0.0015, loc=(0, 0), seg=3))
    return parts, (W, L, H), "retail smartphone box, printed lid (box_print.png) faces +Z"


def build_school_bag():
    W, L, H = 0.32, 0.18, 0.42
    navy = pbr("navy", "#2A3E56", rough=0.82, grain=0.06, wear=0.4, wear_color="#4E6683", dirt=0.45, scratches=0.15,
               bump=0.18, scan="rough_linen", scan_size=0.22, scan_tint="#8FA4C0")
    strap = pbr("strap", "#1E2C3E", rough=0.75, grain=0.05, wear=0.35, dirt=0.4, bump=0.2,
                scan="dirty_carpet", scan_size=0.16, scan_tint="#8C97A8")
    zipm = pbr("zipper", "#B7A16A", rough=0.35, metal=1.0, grain=0.04, wear=0.3, dirt=0.35, bump=0.04)
    mesh = pbr("mesh", "#3A4450", rough=0.9, grain=0.1, dirt=0.4, bump=0.3, scan="dirty_carpet", scan_size=0.08, scan_tint="#6E7A86")
    parts = [rounded_slab("body", W, L, H - 0.04, 0.035, 0.02, navy, z0=0.02, seg=10, edge_seg=6),
             rounded_slab("lid", W * 0.96, L * 0.9, 0.014, 0.030, 0.008, navy, z0=H - 0.045, seg=8, edge_seg=5),
             rounded_slab("front_pocket", W * 0.7, 0.02, H * 0.30, 0.02, 0.01, navy, z0=0.055, loc=(0, L / 2 + 0.002), seg=8, edge_seg=4)]
    for sx in (-1, 1):
        # curved shoulder straps: several segments leaning back, joined to the body top and bottom
        for i in range(5):
            z = 0.12 + i * 0.055
            y = -L / 2 + 0.01 - i * 0.006
            seg = rounded_slab("strap", 0.028, 0.012, 0.062, 0.006, 0.004, strap, z0=z, loc=(sx * W * 0.22, y), seg=5, edge_seg=3)
            rot(seg, -8 - i * 3, "X")
            parts.append(seg)
        parts.append(rounded_slab("strap_anchor", 0.03, 0.02, 0.02, 0.006, 0.004, strap, z0=0.08, loc=(sx * W * 0.22, -L / 2 + 0.02), seg=5))
        parts.append(rounded_slab("mesh_pocket", 0.03, 0.012, 0.09, 0.008, 0.004, mesh, z0=0.05, loc=(sx * (W / 2 - 0.005), 0), seg=5))
    parts.append(rounded_slab("zip_tape", W * 0.85, 0.010, 0.008, 0.002, 0.002, navy, z0=H - 0.038, loc=(0, L / 2 - 0.015), seg=5))
    for i in range(26):                                  # zipper teeth
        parts.append(rounded_slab("tooth", 0.006, 0.004, 0.003, 0.001, 0.0008, zipm, z0=H - 0.030,
                                  loc=(-W * 0.42 + i * 0.010, L / 2 - 0.010), seg=3))
    parts.append(cylinder("zip_pull", 0.004, 0.022, zipm, loc=(W * 0.30, L / 2 - 0.01, H - 0.032), seg=16, r_edge=0.001))
    parts.append(rounded_slab("top_handle", 0.06, 0.012, 0.012, 0.005, 0.003, strap, z0=H - 0.002, loc=(0, 0), seg=4))
    return parts, (W, L, H), "canvas backpack: main body, lid, front pocket, zipper teeth+pull, curved straps, side mesh pockets, top handle"


def build_griddle():
    W, L, H = 0.5, 0.5, 0.05
    iron = pbr("iron", "#1E1F21", rough=0.35, metal=1.0, grain=0.05, wear=0.45, wear_color="#5A5C5E", dirt=0.55,
               scratches=0.35, smudge=0.9, bump=0.05)
    seasoned = pbr("seasoned", "#141210", rough=0.22, metal=0.0, grain=0.06, wear=0.15, dirt=0.4, smudge=1.0, bump=0.04)
    steel = pbr("steel", "#6E7276", rough=0.4, metal=1.0, grain=0.04, wear=0.4, dirt=0.5, scratches=0.4, bump=0.04)
    parts = [lathe("plate", [(0.0, 0.010), (0.20, 0.010), (0.225, 0.014), (0.23, 0.022), (0.222, 0.028), (0.20, 0.026),
                             (0.0, 0.026)], iron, seg=96),
             lathe("seasoning", [(0.0, 0.0265), (0.19, 0.0265), (0.20, 0.0275), (0.0, 0.028)], seasoned, seg=96)]
    # hob ring/stand under the plate + centre trivet
    parts.append(lathe("stand", [(0.15, 0.0), (0.21, 0.0), (0.215, 0.004), (0.215, 0.010), (0.15, 0.012)], steel, seg=96))
    parts.append(cylinder("trivet", 0.045, 0.010, steel, loc=(0, 0, 0.0), seg=40))
    # scraper resting on the rim
    parts.append(rounded_slab("scraper_handle", 0.12, 0.028, 0.008, 0.008, 0.004, steel, z0=0.026, loc=(0.16, 0.18), seg=6))
    parts.append(rounded_slab("scraper_blade", 0.10, 0.012, 0.0015, 0.004, 0.001, steel, z0=0.0245, loc=(0.16, 0.16), seg=5))
    return parts, (W, L, H), "round cast-iron jianbing griddle: seasoned cooking face, hob ring, scraper on the rim"


def build_dish_rack():
    W, L, H = 0.45, 0.3, 0.25
    wire = pbr("wire", "#B9BEC2", rough=0.3, metal=1.0, grain=0.04, wear=0.4, dirt=0.4, scratches=0.3, bump=0.04)
    tray = pbr("tray", "#8E9498", rough=0.35, metal=0.8, grain=0.04, wear=0.4, dirt=0.45, smudge=0.6, bump=0.05)
    ceramic = pbr("ceramic", "#EDE8DC", rough=0.18, grain=0.02, wear=0.2, dirt=0.25, smudge=0.5, bump=0.02)
    parts = [rounded_slab("tray", W, L, 0.014, 0.008, 0.006, tray, z0=0.0, seg=8, edge_seg=4)]
    # bottom frame + vertical tines welded to it and to the top rails
    parts.append(cylinder("frame_x0", 0.004, W - 0.02, wire, loc=(-(W - 0.02) / 2, -L / 2 + 0.02, 0.02), seg=24, axis="X"))
    parts.append(cylinder("frame_x1", 0.004, W - 0.02, wire, loc=(-(W - 0.02) / 2, L / 2 - 0.02, 0.02), seg=24, axis="X"))
    for i in range(7):
        y = -L / 2 + 0.035 + i * 0.038
        parts.append(cylinder("tine", 0.003, H - 0.035, wire, loc=(0, y, 0.014), seg=20))
    for sx in (-1, 1):
        parts.append(cylinder("rail_x", 0.004, W - 0.02, wire, loc=(-(W - 0.02) / 2, sx * (L / 2 - 0.01), H - 0.02), seg=24, axis="X"))
        parts.append(cylinder("rail_y", 0.004, L - 0.02, wire, loc=(-(W / 2 - 0.012), -(L - 0.02), H - 0.02), seg=24, axis="Y"))
    # side chopstick cup: welded to the right rail
    parts.append(lathe("cup", [(0.0, 0.0), (0.028, 0.0), (0.028, 0.075), (0.024, 0.075), (0.024, 0.006), (0.0, 0.006)],
                       wire, loc=(W / 2 - 0.03, L / 2 - 0.04, 0.02), seg=40))
    parts.append(cylinder("cup_bracket", 0.004, 0.02, wire, loc=(W / 2 - 0.06, L / 2 - 0.04, 0.05), seg=16, axis="X"))
    # drip tray nested into the tray
    parts.append(rounded_slab("drip", W - 0.04, L - 0.04, 0.006, 0.008, 0.003, tray, z0=0.014, seg=6))
    for i in range(4):
        parts.append(rounded_slab("plate", 0.010, 0.16, 0.10, 0.004, 0.002, ceramic, z0=0.020,
                                  loc=(-0.12 + i * 0.07, 0.02), seg=6, edge_seg=3))
    parts.append(rounded_slab("bowl", 0.10, 0.10, 0.045, 0.02, 0.008, ceramic, z0=0.020, loc=(0.10, -0.06), seg=8, edge_seg=4))
    return parts, (W, L, H), "stainless wire dish rack: welded frame, 7 tines, chopstick cup, drip tray, plates/bowl"


def build_sink():
    W, L, H = 0.6, 0.45, 0.2
    steel = pbr("steel", "#B4B8BA", rough=0.24, metal=1.0, grain=0.04, wear=0.35, dirt=0.5, scratches=0.35, smudge=0.8, bump=0.03)
    dark = pbr("seal", "#1A1C1E", rough=0.8, grain=0.03, dirt=0.6, bump=0.05)
    parts = [rounded_slab("deck", W, L, 0.012, 0.02, 0.008, steel, z0=0.012, seg=8, edge_seg=5),
             rounded_slab("bowl_floor", W - 0.06, L - 0.06, 0.006, 0.02, 0.004, steel, z0=0.012, seg=8, edge_seg=4)]
    for sx in (-1, 1):
        parts.append(rounded_slab("wall_x", 0.012, L - 0.05, H - 0.03, 0.008, 0.005, steel, z0=0.02, loc=(sx * (W / 2 - 0.04), 0), seg=5))
    for sy in (-1, 1):
        parts.append(rounded_slab("wall_y", W - 0.06, 0.012, H - 0.03, 0.008, 0.005, steel, z0=0.02, loc=(0, sy * (L / 2 - 0.04)), seg=5))
    parts.append(cylinder("stem", 0.014, 0.15, steel, loc=(0, -L / 2 + 0.055, 0.012), seg=48, r_edge=0.004))
    spout = extrude_outline("spout", [(x, z + 0.16) for x, z in arc(0.0, 0.0, 0.07, 200, 340, 18)], 0.022, steel,
                            plane="XZ", bevel=0.005, seg=4)
    rot(spout, 90, "Z")
    move(spout, 0.0, -L / 2 + 0.055, 0.0)
    parts.append(spout)
    parts.append(cylinder("drain", 0.022, 0.004, dark, loc=(0, 0, 0.013), seg=32))
    parts.append(rounded_slab("tap", 0.012, 0.03, 0.008, 0.004, 0.002, steel, z0=0.185, loc=(0, -L / 2 + 0.055), seg=4))
    return parts, (W, L, H), "kitchen sink with deck, bowl and mixer tap; front toward +Y"


def build_brochure_rack():
    W, L, H = 0.6, 0.3, 1.4
    wood = pbr("wood", "#5A4632", rough=0.45, grain=0.08, wear=0.35, dirt=0.4, scratches=0.25, smudge=0.3, bump=0.06,
               wood=0.5, color2="#3A2C1E", wood_scale=35.0, scan="oak_veneer_01", scan_size=0.5)
    metal = pbr("metal", "#A6ABB0", rough=0.3, metal=1.0, grain=0.04, wear=0.4, dirt=0.35, bump=0.04)
    paper = [pbr("paperA", "#9FB4A4", rough=0.6, grain=0.05, wear=0.25, dirt=0.3, bump=0.05),
             pbr("paperB", "#C9A47A", rough=0.6, grain=0.05, wear=0.25, dirt=0.3, bump=0.05),
             pbr("paperC", "#7E9BB4", rough=0.6, grain=0.05, wear=0.25, dirt=0.3, bump=0.05)]
    label = pbr("label", "#F2EEE2", rough=0.6, grain=0.03, wear=0.15, dirt=0.2, bump=0.03)
    parts = [rounded_slab("base", W * 0.75, L, 0.04, 0.02, 0.01, wood, z0=0.0, seg=8, edge_seg=5)]
    parts.append(cylinder("pole", 0.018, H - 0.02, metal, loc=(0, 0, 0.04), seg=32, r_edge=0.006))
    for i in range(3):
        z = 0.32 + i * 0.34
        parts.append(rounded_slab("tier", W, L * 0.8, 0.012, 0.01, 0.006, metal, z0=z, seg=6, edge_seg=4))
        parts.append(rounded_slab("lip", W, 0.01, 0.05, 0.004, 0.003, metal, z0=z + 0.055, loc=(0, L * 0.4), seg=5))
        for j in range(3):
            parts.append(rounded_slab("brochure", 0.16, 0.006, 0.19, 0.004, 0.002, paper[j], z0=z + 0.02,
                                      loc=(-0.2 + j * 0.2, 0.01), seg=5, edge_seg=3))
            parts.append(rounded_slab("broch_label", 0.10, 0.001, 0.025, 0.002, 0.0006, label,
                                      z0=z + 0.13, loc=(-0.2 + j * 0.2, 0.0135), seg=4, edge_seg=2))
    return parts, (W, L, H), "free-standing brochure rack, 3 tiers of printed travel brochures (brochure_panels.png)"


def build_queue_rope():
    W, L, H = 2.4, 0.1, 0.95
    post = pbr("post", "#B3A46A", rough=0.28, metal=1.0, grain=0.05, wear=0.45, dirt=0.4, scratches=0.3, bump=0.04)
    base = pbr("base", "#24262A", rough=0.6, grain=0.04, wear=0.3, dirt=0.5, bump=0.08)
    belt = pbr("belt", "#6E1A22", rough=0.75, grain=0.08, wear=0.3, wear_color="#A83038", dirt=0.35, scratches=0.1,
               bump=0.12, scan="rough_linen", scan_size=0.15, scan_tint="#A02832")
    parts = []
    for sx in (-1, 1):
        x = sx * (W / 2 - 0.05)
        parts.append(rounded_slab("foot", 0.1, L, 0.04, 0.02, 0.012, base, z0=0.0, loc=(x, 0), seg=10, edge_seg=5))
        parts.append(cylinder("pole", 0.02, 0.85, post, loc=(x, 0, 0.04), seg=48, r_edge=0.006))
        parts.append(lathe("crown", [(0.0, 0.0), (0.03, 0.0), (0.028, 0.03), (0.016, 0.045), (0.012, 0.06), (0.0, 0.062)],
                           post, loc=(x, 0, 0.89), seg=48))
        parts.append(rounded_slab("reel", 0.03, 0.03, 0.05, 0.008, 0.004, base, z0=0.84, loc=(x - sx * 0.02, 0), seg=6))
    x0, x1, z0, sag = -W / 2 + 0.1, W / 2 - 0.1, 0.88, 0.05
    n = 18
    for i in range(n):
        t0, t1 = i / n, (i + 1) / n
        xx = x0 + (x1 - x0) * (t0 + t1) / 2
        zz = z0 - sag * math.sin(math.pi * (t0 + t1) / 2)
        dz = -sag * math.pi * math.cos(math.pi * (t0 + t1) / 2) / (x1 - x0)
        ang = math.degrees(math.atan2(dz, 1.0))
        parts.append(belt_segment("belt", 0.05, (x1 - x0) / n + 0.006, 0.004, belt, ang, xx, 0.0, zz))
    return parts, (W, L, H), "two brass posts with a red retractable belt; front toward +Y"


BUILDERS = {
    "keyboard": build_keyboard, "headphones": build_headphones, "wifi_router": build_wifi_router,
    "recipe_book": build_recipe_book, "duster": build_duster, "chalk_tray": build_chalk_tray,
    "sandwich_plate": build_sandwich_plate, "coupon_card": build_coupon_card, "qr_sign": build_qr_sign,
    "payment_sign": build_payment_sign, "device_box": build_device_box, "school_bag": build_school_bag,
    "griddle": build_griddle, "dish_rack": build_dish_rack, "sink": build_sink,
    "brochure_rack": build_brochure_rack, "queue_rope": build_queue_rope,
}


def _fit(parts, dims):
    """落地（底面 z=0）、水平居中，并把三轴 bbox 校准到场景尺寸（误差来自造型余量，按轴微缩放）。"""
    verts = [(v.co.x, v.co.y, v.co.z) for ob in parts for v in ob.data.vertices]
    mnx, mxx = min(v[0] for v in verts), max(v[0] for v in verts)
    mny, mxy = min(v[1] for v in verts), max(v[1] for v in verts)
    mnz = min(v[2] for v in verts)
    cx, cy = (mnx + mxx) / 2, (mny + mxy) / 2
    ex = max(mxx - mnx, 1e-6); ey = max(mxy - mny, 1e-6); ez = max(max(v[2] for v in verts) - mnz, 1e-6)
    sx, sy, sz = dims[0] / ex, dims[1] / ey, dims[2] / ez
    for ob in parts:
        for v in ob.data.vertices:
            v.co.x = (v.co.x - cx) * sx
            v.co.y = (v.co.y - cy) * sy
            v.co.z = (v.co.z - mnz) * sz


def run(kit):
    reset()
    parts, dims, note = BUILDERS[kit]()
    _fit(parts, dims)
    check_contacts(parts)
    finish(kit, parts, dims, note=note)
