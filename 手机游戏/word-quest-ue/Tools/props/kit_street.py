"""Street kits for the textbook memory game (Unit 1 Beijing scenes). Run inside Blender 4.5:

    "$B" -b -P Tools/props/kit_street.py

Builds: jianbing_cart, griddle, car, shared_bike, bike_rack.
Sizes [w, d, h] come from Content/Data/memory/textbook_scenes/unit01.json (w = X, d = Y, h = Z).
"""
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

import kit_common as kc
from kit_common import *  # noqa: F403  (reset, mat, box, cyl, torus, finish, ...)
from mathutils import Vector


def new_kit():
    reset()
    kc._MATS.clear()  # materials from the previous kit were deleted by reset()


def tube(name, p0, p1, radius, material, verts=12):
    """Cylinder between two points (no bevel: thin structural tubes)."""
    a, b = Vector(p0), Vector(p1)
    d = b - a
    o = cyl(name, radius, d.length, tuple((a + b) / 2), material, verts=verts, bevel=0.0)
    o.rotation_euler = Vector((0, 0, 1)).rotation_difference(d.normalized()).to_euler()
    return o


# ---------------------------------------------------------------- jianbing_cart  (1.6 x 0.8 x 1.2)
def kit_jianbing_cart():
    new_kit()
    steel = mat("steel", "#C9CED6", 0.3, 0.55)
    cloth = mat("cloth", "#B3141B", 0.9, 0.0, noise=0.15)
    glass = mat("glass", "#A9D3E6", 0.05, 0.0, alpha=0.3)
    rubber = mat("rubber", "#1C1C1E", 0.8)
    iron = mat("iron", "#2A2D31", 0.45, 0.7)
    griddle_m = mat("griddle", "#2B2C30", 0.55, 0.0)
    paper = mat("paper", "#F5F5F0", 0.7)
    ceramic = mat("bowl", "#EFEFE8", 0.3)
    herb = mat("herb", "#5B8C3A", 0.8)

    parts = [
        # tricycle chassis and stainless cart body (cabinet top z 0.85, counter top z 0.95)
        box("chassis", (1.36, 0.50, 0.05), (0, -0.12, 0.25), iron, bevel=0.01),
        box("cabinet", (1.44, 0.48, 0.55), (0, -0.12, 0.575), steel, bevel=0.02),
        box("counter", (1.52, 0.56, 0.10), (0, -0.12, 0.90), steel, bevel=0.012),
        # red cloth banner band round the front and both sides
        box("band_front", (1.44, 0.02, 0.16), (0, 0.13, 0.62), cloth, bevel=0.005),
        box("band_left", (0.02, 0.48, 0.16), (-0.73, -0.12, 0.62), cloth, bevel=0.005),
        box("band_right", (0.02, 0.48, 0.16), (0.73, -0.12, 0.62), cloth, bevel=0.005),
        # round dark griddle on the counter
        cyl("griddle", 0.20, 0.03, (0, -0.20, 0.965), griddle_m, verts=40, bevel=0.006),
        # sneeze guard on three sides (front, left, right): glass panes, stainless posts and top rails
        box("guard_front", (1.32, 0.008, 0.20), (0, 0.04, 1.08), glass, bevel=0.0),
        box("guard_left", (0.008, 0.40, 0.20), (-0.66, -0.16, 1.08), glass, bevel=0.0),
        box("guard_right", (0.008, 0.40, 0.20), (0.66, -0.16, 1.08), glass, bevel=0.0),
        box("guard_top_f", (1.34, 0.02, 0.02), (0, 0.04, 1.18), steel, bevel=0.004),
        box("guard_top_l", (0.02, 0.42, 0.02), (-0.66, -0.16, 1.18), steel, bevel=0.004),
        box("guard_top_r", (0.02, 0.42, 0.02), (0.66, -0.16, 1.18), steel, bevel=0.004),
        cyl("guard_post_fl", 0.01, 0.20, (-0.66, 0.04, 1.08), steel, verts=12, bevel=0.0),
        cyl("guard_post_fr", 0.01, 0.20, (0.66, 0.04, 1.08), steel, verts=12, bevel=0.0),
        cyl("guard_post_rl", 0.01, 0.20, (-0.66, -0.36, 1.08), steel, verts=12, bevel=0.0),
        cyl("guard_post_rr", 0.01, 0.20, (0.66, -0.36, 1.08), steel, verts=12, bevel=0.0),
        # ingredients: stack of three bowls, and a bowl of herbs
        cyl("bowl_1", 0.075, 0.04, (-0.45, -0.28, 0.97), ceramic, verts=28, bevel=0.01),
        cyl("bowl_2", 0.075, 0.04, (-0.45, -0.28, 1.01), ceramic, verts=28, bevel=0.01),
        cyl("bowl_3", 0.075, 0.04, (-0.45, -0.28, 1.05), ceramic, verts=28, bevel=0.01),
        cyl("bowl_herb", 0.075, 0.03, (-0.45, -0.06, 0.965), ceramic, verts=28, bevel=0.01),
        cyl("herbs", 0.062, 0.01, (-0.45, -0.06, 0.98), herb, verts=24, bevel=0.0),
        # small QR stand on the right of the counter: base, post, card facing the customer (+Y)
        box("qr_base", (0.14, 0.08, 0.01), (0.45, -0.28, 0.955), iron, bevel=0.002),
        cyl("qr_post", 0.008, 0.20, (0.45, -0.29, 1.06), iron, verts=12, bevel=0.0),
        box("qr_card", (0.14, 0.006, 0.12), (0.45, -0.29, 1.12), paper, bevel=0.002),
        box("qr_code", (0.10, 0.002, 0.10), (0.45, -0.2855, 1.12), iron, bevel=0.0),
        # rear axle, two rear wheels under the cart body
        tube("axle", (-0.78, -0.18, 0.20), (0.78, -0.18, 0.20), 0.015, steel),
        cyl("tyre_l", 0.20, 0.07, (-0.78, -0.18, 0.20), rubber, verts=28, rot=(0, 90, 0)),
        cyl("tyre_r", 0.20, 0.07, (0.78, -0.18, 0.20), rubber, verts=28, rot=(0, 90, 0)),
        cyl("hub_l", 0.09, 0.075, (-0.78, -0.18, 0.20), steel, verts=24, rot=(0, 90, 0), bevel=0.003),
        cyl("hub_r", 0.09, 0.075, (0.78, -0.18, 0.20), steel, verts=24, rot=(0, 90, 0), bevel=0.003),
        # single front wheel, steering post up to the handlebar, rider saddle on a seat post
        cyl("tyre_front", 0.16, 0.05, (0, 0.26, 0.16), rubber, verts=24, rot=(0, 90, 0)),
        cyl("hub_front", 0.06, 0.055, (0, 0.26, 0.16), steel, verts=20, rot=(0, 90, 0), bevel=0.003),
        tube("fork", (0, 0.26, 0.16), (0, 0.26, 1.00), 0.016, steel),
        tube("handlebar", (-0.22, 0.26, 1.00), (0.22, 0.26, 1.00), 0.016, steel),
        tube("seat_post", (0, 0.30, 0.22), (0, 0.38, 0.72), 0.012, steel),
        box("saddle", (0.20, 0.13, 0.05), (0, 0.38, 0.75), rubber, bevel=0.02),
    ]
    finish("jianbing_cart", parts)


# ---------------------------------------------------------------- griddle  (0.5 x 0.5 x 0.05)
def kit_griddle():
    new_kit()
    iron = mat("iron", "#33373D", 0.4, 0.8)
    steel = mat("steel", "#A9B0B8", 0.3, 1.0)
    parts = [
        cyl("foot", 0.2, 0.02, (0, 0, 0.01), steel, verts=48),                 # short base 0..0.02
        cyl("plate", 0.25, 0.03, (0, 0, 0.035), iron, verts=64),               # cooking plate 0.02..0.05
        torus("rim", 0.24, 0.01, (0, 0, 0.04), iron),                          # raised lip
    ]
    finish("griddle", parts)


# ---------------------------------------------------------------- car  (4.5 x 1.8 x 1.45)
# Long axis is X (size [w, d, h] from unit01.json), so the nose points +X (see report).
def kit_car():
    new_kit()
    paint = mat("paint", "#DDE3E8", 0.28, 0.1)
    glass = mat("glass", "#5E7E92", 0.05, 0.0, alpha=0.3)
    rubber = mat("rubber", "#151719", 0.8)
    chrome = mat("chrome", "#C8CDD3", 0.2, 1.0)
    head = mat("lamp_head", "#FFF7E2", 0.2, 0.0, emission="#FFF7E2", emission_strength=6.0)
    tail = mat("lamp_tail", "#FF2B2B", 0.3, 0.0, emission="#FF2B2B", emission_strength=3.0)

    parts = [
        box("shell", (4.5, 1.7, 0.42), (0, 0, 0.41), paint, bevel=0.1),          # z 0.2..0.62, half-width 0.85
        box("cabin_glass", (2.3, 1.5, 0.55), (-0.15, 0, 0.9), glass, bevel=0.12),  # z 0.62..1.17
        box("roof", (1.9, 1.44, 0.28), (-0.1, 0, 1.31), paint, bevel=0.1),       # z 1.17..1.45
        box("ride_sign", (0.42, 0.16, 0.1), (-0.15, 0, 1.5), head, bevel=0.01),  # z 1.45..1.55
        box("bumper_f", (0.12, 1.7, 0.2), (2.22, 0, 0.3), rubber, bevel=0.03),
        box("bumper_r", (0.12, 1.7, 0.2), (-2.22, 0, 0.3), rubber, bevel=0.03),
        box("grille", (0.03, 0.8, 0.1), (2.245, 0, 0.36), chrome, bevel=0.01),
        box("head_l", (0.04, 0.32, 0.08), (2.245, 0.55, 0.45), head, bevel=0.01),
        box("head_r", (0.04, 0.32, 0.08), (2.245, -0.55, 0.45), head, bevel=0.01),
        box("tail_l", (0.04, 0.3, 0.08), (-2.245, 0.55, 0.45), tail, bevel=0.01),
        box("tail_r", (0.04, 0.3, 0.08), (-2.245, -0.55, 0.45), tail, bevel=0.01),
    ]
    # mirrors on short arms from the front-door pillars
    for s in (1, -1):
        parts.append(box(f"mirror_arm_{s}", (0.14, 0.12, 0.04), (0.55, 0.8 * s, 0.72), paint, bevel=0.01))
        parts.append(box(f"mirror_{s}", (0.14, 0.08, 0.09), (0.55, 0.9 * s, 0.82), paint, bevel=0.02))
    # four wheels outboard of the body so the tyres show: tyre + chrome rim, axis along Y
    for i, (x, y) in enumerate([(1.4, 0.8), (1.4, -0.8), (-1.4, 0.8), (-1.4, -0.8)]):
        parts.append(cyl(f"tyre_{i}", 0.32, 0.22, (x, y, 0.32), rubber, verts=32, rot=(90, 0, 0)))
        parts.append(cyl(f"rim_{i}", 0.19, 0.23, (x, y, 0.32), chrome, verts=24, rot=(90, 0, 0), bevel=0.003))
    finish("car", parts)


# ---------------------------------------------------------------- shared_bike  (1.7 x 0.55 x 1.05)
# Long axis is X (size from unit01.json): front wheel and handlebar at +X.
def kit_shared_bike():
    new_kit()
    paint = mat("paint", "#FFB01F", 0.3, 0.1)
    rubber = mat("rubber", "#1A1B1E", 0.85)
    steel = mat("steel", "#AEB4BC", 0.3, 1.0)
    dark = mat("dark", "#24272C", 0.5, 0.4)
    paper = mat("paper", "#F5F5F0", 0.7)

    rear = (-0.6, 0.0, 0.285)
    front = (0.6, 0.0, 0.285)
    bb = (-0.05, 0.0, 0.32)
    seat_top = (-0.3, 0.0, 0.9)
    head_top = (0.42, 0.0, 0.86)
    head_bot = (0.42, 0.0, 0.7)

    parts = []
    # wheels: tyre torus in the XZ plane (axis Y), spokes as thin diameters, hub
    for name, c in (("rear", rear), ("front", front)):
        parts.append(torus(f"tyre_{name}", 0.255, 0.03, c, rubber, rot=(90, 0, 0)))
        for k, a in enumerate((0, 45, 90, 135)):
            parts.append(cyl(f"spoke_{name}_{k}", 0.0035, 0.5, c, steel, verts=6, rot=(0, 90 - a, 0), bevel=0.0))
        parts.append(cyl(f"hub_{name}", 0.03, 0.07, c, steel, verts=16, rot=(90, 0, 0), bevel=0.0))

    # frame (yellow/orange)
    parts += [
        tube("chainstay", bb, rear, 0.014, paint),
        tube("seat_tube", bb, seat_top, 0.016, paint),
        tube("seat_stay", seat_top, rear, 0.012, paint),
        tube("top_tube", seat_top, head_top, 0.016, paint),
        tube("down_tube", bb, head_bot, 0.018, paint),
        tube("head_tube", head_bot, head_top, 0.022, paint),
        tube("fork", head_bot, front, 0.016, paint),
        tube("stem", head_top, (0.44, 0.0, 1.03), 0.016, steel),
        tube("handlebar", (0.44, -0.27, 1.03), (0.44, 0.27, 1.03), 0.014, dark),
    ]
    # saddle
    parts.append(box("saddle", (0.24, 0.12, 0.06), (-0.28, 0, 0.95), dark, bevel=0.02))
    # front basket: floor + three walls
    parts += [
        box("basket_floor", (0.3, 0.36, 0.012), (0.63, 0, 0.68), dark, bevel=0.003),
        box("basket_front", (0.012, 0.36, 0.2), (0.78, 0, 0.78), dark, bevel=0.003),
        box("basket_back", (0.012, 0.36, 0.2), (0.48, 0, 0.78), dark, bevel=0.003),
        box("basket_side_l", (0.3, 0.012, 0.2), (0.63, 0.18, 0.78), dark, bevel=0.003),
        box("basket_side_r", (0.3, 0.012, 0.2), (0.63, -0.18, 0.78), dark, bevel=0.003),
    ]
    # rear smart lock box above the rear wheel, QR panel on its rear face (-X)
    parts += [
        box("lock_box", (0.16, 0.14, 0.2), (-0.62, 0, 0.72), dark, bevel=0.02),
        box("lock_qr_card", (0.006, 0.1, 0.1), (-0.707, 0, 0.72), paper, bevel=0.002),
        box("lock_qr_code", (0.004, 0.06, 0.06), (-0.712, 0, 0.72), dark, bevel=0.001),
    ]
    finish("shared_bike", parts)


# ---------------------------------------------------------------- bike_rack  (6.0 x 0.6 x 0.8)
def kit_bike_rack():
    new_kit()
    steel = mat("steel", "#9AA3AD", 0.35, 1.0)
    paint = mat("paint", "#F4F4F0", 0.8, 0.0)

    parts = []
    # two ground rails along X
    for y in (-0.25, 0.25):
        parts.append(tube(f"rail_{y:+.2f}", (-3.0, y, 0.03), (3.0, y, 0.03), 0.02, steel))
    # seven inverted-U hoops every 0.9 m
    for i in range(7):
        x = -2.7 + 0.9 * i
        for y in (-0.25, 0.25):
            parts.append(tube(f"leg_{i}_{y:+.2f}", (x, y, 0.03), (x, y, 0.78), 0.018, steel))
        parts.append(tube(f"hoop_{i}", (x, -0.25, 0.78), (x, 0.25, 0.78), 0.018, steel))
    # painted parking lines on the ground: two long lines and six bay dividers
    for s in (1, -1):
        parts.append(box(f"line_long_{s:+d}", (6.0, 0.05, 0.005), (0, 0.3 * s, 0.0025), paint, bevel=0.0))
    for i in range(6):
        x = -2.25 + 0.9 * i
        parts.append(box(f"line_bay_{i}", (0.04, 0.6, 0.005), (x, 0, 0.0025), paint, bevel=0.0))
    finish("bike_rack", parts)


if __name__ == "__main__":
    _only = {k for k in os.environ.get("KITS", "").split(",") if k}
    for name, build in (("jianbing_cart", kit_jianbing_cart), ("griddle", kit_griddle), ("car", kit_car),
                        ("shared_bike", kit_shared_bike), ("bike_rack", kit_bike_rack)):
        if not _only or name in _only:
            build()
