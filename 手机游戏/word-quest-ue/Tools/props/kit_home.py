"""Home / school / car kits for the unit01 textbook scenes (run inside Blender 4.5).

    "$B" -b -P Tools/props/kit_home.py

Sizes come from Content/Data/memory/textbook_scenes/unit01.json ("size" [w, d, h]).
Front faces Blender +Y. Helpers come from kit_common.py (not edited here).
"""
import math
import os
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)

import kit_common as kc
from kit_common import *  # noqa: F401,F403  (reset, mat, box, cyl, torus, finish, ...)


def new_kit():
    """reset() plus a clear material cache: kit_common caches bpy materials that reset() deletes."""
    reset()
    kc._MATS.clear()


# ---------------------------------------------------------------- blackboard 3.6 x 0.08 x 1.2
def blackboard():
    new_kit()
    wood = mat("wood", "#8A5A33", 0.55, noise=0.25)
    slate = mat("slate", "#1F3B2E", 0.8, noise=0.25)
    chalk = mat("chalk_smudge", "#4E6E5C", 0.95, noise=0.9)
    parts = [
        box("frame_top", (3.6, 0.08, 0.06), (0, 0, 1.17), wood),
        box("frame_bottom", (3.6, 0.08, 0.06), (0, 0, 0.03), wood),
        box("frame_left", (0.06, 0.08, 1.2), (-1.77, 0, 0.6), wood),
        box("frame_right", (0.06, 0.08, 1.2), (1.77, 0, 0.6), wood),
        box("slate", (3.48, 0.03, 1.08), (0, 0.022, 0.6), slate),
        box("smudge_a", (0.9, 0.002, 0.32), (-0.8, 0.038, 0.85), chalk, bevel=0.0),
        box("smudge_b", (0.6, 0.002, 0.2), (0.9, 0.038, 0.36), chalk, bevel=0.0),
        box("smudge_c", (1.2, 0.002, 0.12), (0.2, 0.038, 0.7), chalk, bevel=0.0),
    ]
    return finish("blackboard", parts)


# ---------------------------------------------------------------- chalk tray 3.0 x 0.08 x 0.05
def chalk_tray():
    new_kit()
    wood = mat("wood", "#8A5A33", 0.55, noise=0.2)
    chalk = mat("chalk", "#F2EFE6", 0.9)
    parts = [
        box("tray_base", (3.0, 0.08, 0.02), (0, 0, 0.01), wood),
        box("tray_lip", (3.0, 0.025, 0.05), (0, 0.0275, 0.025), wood),
        box("tray_back", (3.0, 0.02, 0.03), (0, -0.03, 0.035), wood),
    ]
    for i, x in enumerate((-0.8, 0.0, 0.8)):
        parts.append(cyl(f"chalk_{i}", 0.009, 0.09, (x, -0.01, 0.029), chalk, verts=16, rot=(0, 90, 0)))
    return finish("chalk_tray", parts)


# ---------------------------------------------------------------- interactive board 3.0 x 0.1 x 1.7
def interactive_board():
    new_kit()
    bezel = mat("bezel", "#1E2024", 0.45)
    screen = mat("screen", "#9FC4E8", 0.2, emission="#9FC4E8", emission_strength=1.2)
    cam = mat("camera", "#101216", 0.3)
    parts = [
        box("bezel", (3.0, 0.1, 1.65), (0, 0, 0.845), bezel, bevel=0.012),
        box("screen", (2.8, 0.004, 1.5), (0, 0.052, 0.85), screen, bevel=0.0),
        box("foot_l", (0.2, 0.08, 0.02), (-0.9, 0, 0.01), bezel, bevel=0.005),
        box("foot_r", (0.2, 0.08, 0.02), (0.9, 0, 0.01), bezel, bevel=0.005),
        box("camera_body", (0.1, 0.03, 0.04), (0, 0.0, 1.69), cam, bevel=0.005),
        cyl("camera_lens", 0.012, 0.01, (0, 0.035, 1.69), cam, verts=16, rot=(90, 0, 0)),
    ]
    return finish("interactive_board", parts)


# ---------------------------------------------------------------- student desk 1.2 x 0.5 x 0.75
def student_desk():
    new_kit()
    wood = mat("beech", "#B98A5E", 0.5, noise=0.2)
    steel = mat("steel", "#7F8A93", 0.35, metallic=0.9)
    red = mat("book_red", "#A33B2E", 0.6)
    blue = mat("book_blue", "#2F4F7A", 0.6)
    parts = [
        box("top", (1.2, 0.5, 0.025), (0, 0, 0.7375), wood),
        box("shelf_upper", (1.09, 0.4, 0.02), (0, 0, 0.40), wood),
        box("shelf_lower", (1.09, 0.4, 0.02), (0, 0, 0.12), wood),
        box("shelf_back", (1.09, 0.01, 0.3), (0, -0.195, 0.26), wood),
        box("book_r1", (0.22, 0.15, 0.03), (-0.25, 0, 0.145), red, bevel=0.003),
        box("book_b1", (0.2, 0.15, 0.04), (0.0, 0, 0.15), blue, bevel=0.003),
        box("book_r2", (0.2, 0.15, 0.03), (0.25, 0, 0.145), red, bevel=0.003),
        box("book_b2", (0.2, 0.15, 0.03), (-0.2, 0, 0.425), blue, bevel=0.003),
        box("book_r3", (0.22, 0.15, 0.03), (0.3, 0, 0.425), red, bevel=0.003),
    ]
    for x in (-0.56, 0.56):
        for y in (-0.2, 0.2):
            parts.append(box("leg", (0.03, 0.03, 0.7), (x, y, 0.35), steel, bevel=0.004))
        parts.append(box("foot_rail", (0.03, 0.4, 0.03), (x, 0, 0.03), steel, bevel=0.004))
    for y in (-0.2, 0.2):
        parts.append(box("top_rail", (1.12, 0.03, 0.03), (0, y, 0.70), steel, bevel=0.004))
        parts.append(box("floor_rail", (1.12, 0.03, 0.03), (0, y, 0.03), steel, bevel=0.004))
    return finish("student_desk", parts)


# ---------------------------------------------------------------- kitchen counter 2.4 x 0.65 x 0.92
def kitchen_counter():
    new_kit()
    paint = mat("cabinet_paint", "#E8E2D4", 0.55)
    plinth = mat("plinth", "#3A3A3A", 0.8)
    stone = mat("stone_top", "#CFC9BE", 0.3, noise=0.2)
    tile = mat("splashback", "#9ECFD4", 0.25)
    steel = mat("handle_steel", "#B8C0C6", 0.3, metallic=1.0)
    parts = [
        box("plinth", (2.36, 0.5, 0.07), (0, -0.04, 0.035), plinth),
        box("carcass", (2.36, 0.58, 0.81), (0, 0, 0.475), paint),
        box("worktop", (2.4, 0.65, 0.04), (0, 0, 0.90), stone),
        box("splashback", (2.4, 0.02, 0.04), (0, -0.31, 0.94), tile, bevel=0.004),
    ]
    for x in (-0.9, -0.3, 0.3, 0.9):
        parts.append(box("door", (0.56, 0.02, 0.78), (x, 0.30, 0.47), paint, bevel=0.004))
        hx = x + (0.2 if x < 0 else -0.2)
        parts.append(box("handle", (0.12, 0.02, 0.02), (hx, 0.33, 0.78), steel, bevel=0.004))
    return finish("kitchen_counter", parts)


# ---------------------------------------------------------------- sink 0.6 x 0.45 x 0.2
def sink():
    new_kit()
    steel = mat("stainless", "#BFC6CC", 0.22, metallic=1.0)
    drain = mat("drain", "#6D757C", 0.4, metallic=0.8)
    parts = [
        # rim (drop-in slab) with a 0.42 x 0.30 opening
        box("rim_front", (0.6, 0.075, 0.02), (0, 0.1875, 0.16), steel),
        box("rim_back", (0.6, 0.075, 0.02), (0, -0.1875, 0.16), steel),
        box("rim_left", (0.09, 0.3, 0.02), (-0.255, 0, 0.16), steel),
        box("rim_right", (0.09, 0.3, 0.02), (0.255, 0, 0.16), steel),
        # basin
        box("bowl_floor", (0.42, 0.3, 0.02), (0, 0, 0.01), steel),
        box("bowl_front", (0.42, 0.02, 0.15), (0, 0.16, 0.085), steel),
        box("bowl_back", (0.42, 0.02, 0.15), (0, -0.16, 0.085), steel),
        box("bowl_left", (0.02, 0.3, 0.15), (-0.21, 0, 0.085), steel),
        box("bowl_right", (0.02, 0.3, 0.15), (0.21, 0, 0.085), steel),
        cyl("drain", 0.03, 0.005, (0, 0, 0.0225), drain, verts=24),
        # tap on the back rim
        cyl("tap_base", 0.02, 0.03, (0, -0.2, 0.185), steel, verts=24),
        cyl("tap_spout", 0.01, 0.1, (0, -0.15, 0.19), steel, verts=16, rot=(90, 0, 0)),
    ]
    return finish("sink", parts)


# ---------------------------------------------------------------- dish rack 0.45 x 0.3 x 0.25
def dish_rack():
    new_kit()
    wire = mat("wire", "#8F979E", 0.35, metallic=0.9)
    plate = mat("plate", "#EFEFE9", 0.2)
    parts = []
    for x in (-0.22, 0.22):
        for y in (-0.14, 0.14):
            parts.append(cyl("post", 0.004, 0.25, (x, y, 0.125), wire, verts=12))
    for y in (-0.14, 0.0, 0.14):          # bottom rods along X
        parts.append(cyl("base_x", 0.003, 0.44, (0, y, 0.01), wire, verts=12, rot=(0, 90, 0)))
        parts.append(cyl("top_x", 0.003, 0.44, (0, y, 0.25), wire, verts=12, rot=(0, 90, 0)))
    for x in (-0.22, 0.0, 0.22):          # rods along Y
        parts.append(cyl("base_y", 0.003, 0.28, (x, 0, 0.01), wire, verts=12, rot=(90, 0, 0)))
        parts.append(cyl("top_y", 0.003, 0.28, (x, 0, 0.25), wire, verts=12, rot=(90, 0, 0)))
    for y in (-0.09, 0.0, 0.09):          # three upright plates
        parts.append(cyl("plate", 0.1, 0.01, (0, y, 0.12), plate, verts=32, rot=(90, 0, 0)))
    return finish("dish_rack", parts)


# ---------------------------------------------------------------- dining table 1.8 x 0.95 x 0.75
def dining_table():
    new_kit()
    wood = mat("oak", "#7B4E2D", 0.5, noise=0.25)
    dark = mat("oak_dark", "#5C3A22", 0.5, noise=0.2)
    runner = mat("runner", "#8E3B33", 0.95)
    parts = [
        box("top", (1.8, 0.95, 0.04), (0, 0, 0.73), wood),
        box("apron_front", (1.64, 0.03, 0.05), (0, -0.4, 0.685), dark),
        box("apron_back", (1.64, 0.03, 0.05), (0, 0.4, 0.685), dark),
        box("apron_left", (0.03, 0.8, 0.05), (-0.8, 0, 0.685), dark),
        box("apron_right", (0.03, 0.8, 0.05), (0.8, 0, 0.685), dark),
        box("runner", (1.5, 0.28, 0.004), (0, 0, 0.752), runner, bevel=0.002),
    ]
    for x in (-0.82, 0.82):
        for y in (-0.4, 0.4):
            parts.append(box("leg", (0.07, 0.07, 0.71), (x, y, 0.355), dark, bevel=0.006))
    return finish("dining_table", parts)


# ---------------------------------------------------------------- car interior 1.8 x 2.4 x 1.3
def car_interior():
    new_kit()
    dash = mat("dash_plastic", "#25262B", 0.6)
    leather = mat("leather", "#4A3A2E", 0.7, noise=0.2)
    carpet = mat("carpet", "#3A3D45", 1.0)
    chrome = mat("chrome", "#9AA3AA", 0.3, metallic=0.9)
    wheel = mat("wheel_rubber", "#161618", 0.5)
    glass = mat("windscreen", "#BFD9E6", 0.05, alpha=0.25)
    dial = mat("dial_glow", "#0A0E14", 0.15, emission="#9FC4E8", emission_strength=2.0)
    screen = mat("centre_screen", "#0A0E14", 0.15, emission="#9FC4E8", emission_strength=0.8)

    R, YC, Rb = 2.0, -1.0, 1.85          # dash wraps the driver: circle centre (0, YC); front face at radius R

    def arc_y(x, r):                     # y of the circle of radius r about (0, YC), front (+Y) side
        return YC + math.sqrt(r * r - x * x)

    def arc_rot(x, r):                   # tangent angle (deg) of that circle at x, for box rot about Z
        return math.degrees(math.atan2(-x, math.sqrt(r * r - x * x)))

    parts = []
    # curved dashboard: 8 angled segments following the arc, body centred on radius Rb
    N, half = 8, 0.85
    seg = 2 * half / N
    for i in range(N):
        x = -half + (i + 0.5) * seg
        parts.append(box(f"dash{i}", (seg * 1.04, 0.30, 0.50), (x, arc_y(x, Rb), 0.36), dash,
                         bevel=0.03, rot=(0, 0, arc_rot(x, Rb))))
        parts.append(box(f"dash_top{i}", (seg * 1.04, 0.34, 0.05), (x, arc_y(x, Rb + 0.02), 0.635), dash,
                         bevel=0.02, rot=(0, 0, arc_rot(x, Rb + 0.02))))
    parts.append(box("centre_screen", (0.36, 0.02, 0.20), (0.0, arc_y(0.0, R) + 0.004, 0.44), screen,
                     bevel=0.004, rot=(15, 0, 0)))
    # instrument cluster: three small emissive dials on the front face, in front of the driver
    for i, x in enumerate((-0.60, -0.44, -0.28)):
        px, py = x, arc_y(x, R)
        nx, ny = x / R, math.sqrt(R * R - x * x) / R       # outward normal of the dash face
        rot = (90, 0, math.degrees(math.atan2(nx, -ny)))   # cylinder axis -> outward normal
        parts.append(cyl(f"dial_bezel{i}", 0.034, 0.012, (px + nx * 0.004, py + ny * 0.004, 0.48), chrome,
                         verts=24, rot=rot, bevel=0.002))
        parts.append(cyl(f"dial_face{i}", 0.026, 0.004, (px + nx * 0.0105, py + ny * 0.0105, 0.48), dial,
                         verts=24, rot=rot, bevel=0.0))

    # windscreen: glass pane between the A-pillars, with header rail (no roof)
    parts.append(box("windscreen", (1.66, 0.008, 0.78), (0.0, 0.74, 0.92), glass, bevel=0.0, rot=(40, 0, 0)))
    for side, sx in (("l", -0.84), ("r", 0.84)):
        parts.append(cyl(f"a_pillar_{side}", 0.022, 0.78, (sx, 0.74, 0.92), dash, verts=16, rot=(40, 0, 0), bevel=0.0))
    parts.append(box("header_rail", (1.72, 0.05, 0.05), (0.0, 0.49, 1.22), dash))

    # floor pan and low door sills
    parts.append(box("floor_pan", (1.7, 2.4, 0.1), (0, 0, 0.05), carpet))
    parts.append(box("sill_l", (0.06, 2.4, 0.1), (-0.87, 0, 0.13), dash))
    parts.append(box("sill_r", (0.06, 2.4, 0.1), (0.87, 0, 0.13), dash))

    # centre console with gear lever
    parts.append(box("console", (0.30, 1.0, 0.14), (0, -0.10, 0.17), dash, bevel=0.02))
    parts.append(cyl("gear_shaft", 0.011, 0.10, (0, -0.20, 0.29), chrome, verts=12, bevel=0.0))
    parts.append(sphere("gear_knob", 0.03, (0, -0.20, 0.36), wheel))

    # two front bucket seats: base, rounded cushion, sculpted backrest with side bolsters, headrest
    for sx in (-0.44, 0.44):
        parts.append(box("seat_base", (0.48, 0.48, 0.20), (sx, 0.10, 0.20), dash, bevel=0.02))
        parts.append(box("seat_cushion", (0.46, 0.46, 0.14), (sx, 0.10, 0.37), leather, bevel=0.05))
        parts.append(box("seat_back", (0.46, 0.12, 0.60), (sx, -0.21, 0.74), leather, bevel=0.05, rot=(14, 0, 0)))
        for side in (-1, 1):
            parts.append(box("bolster", (0.06, 0.14, 0.46), (sx + side * 0.23, -0.21, 0.74), leather,
                             bevel=0.03, rot=(14, 0, 0)))
        parts.append(box("headrest", (0.22, 0.10, 0.16), (sx, -0.31, 1.14), leather, bevel=0.04, rot=(14, 0, 0)))

    # steering wheel on a column that runs from the driver's wheel hub up into the dash
    wx, wy, wz = -0.44, 0.50, 0.80
    tx, ty, tz = -0.44, 0.92, 0.60
    ln = math.sqrt((ty - wy) ** 2 + (tz - wz) ** 2)
    ay, az = (ty - wy) / ln, (tz - wz) / ln
    col_rot = (math.degrees(math.atan2(-ay, az)), 0, 0)   # rotation about X mapping Z to the column axis
    parts.append(cyl("column", 0.02, ln, ((wx + tx) / 2, (wy + ty) / 2, (wz + tz) / 2), chrome,
                     verts=16, rot=col_rot, bevel=0.0))
    parts.append(torus("steering_wheel", 0.17, 0.018, (wx, wy, wz), wheel, rot=col_rot))
    parts.append(cyl("wheel_hub", 0.05, 0.03, (wx, wy, wz), chrome, verts=24, rot=col_rot))

    return finish("car_interior", parts)


# ---------------------------------------------------------------- device box 0.3 x 0.2 x 0.12
def device_box():
    new_kit()
    wood = mat("walnut", "#6B4226", 0.5, noise=0.2)
    brass = mat("brass", "#C8A24A", 0.3, metallic=1.0)
    parts = [
        box("body", (0.3, 0.2, 0.1), (0, 0, 0.05), wood),
        box("lid", (0.31, 0.21, 0.02), (0, 0, 0.11), wood),
        cyl("hinge", 0.005, 0.3, (0, -0.1, 0.1), brass, verts=16, rot=(0, 90, 0)),
        box("clasp", (0.03, 0.01, 0.02), (0, 0.1, 0.1), brass, bevel=0.002),
    ]
    return finish("device_box", parts)


KITS = [
    blackboard,
    chalk_tray,
    interactive_board,
    student_desk,
    kitchen_counter,
    sink,
    dish_rack,
    dining_table,
    car_interior,
    device_box,
]

_ONLY = {k for k in os.environ.get("KITS", "").split(",") if k}
for build in KITS:
    if not _ONLY or build.__name__ in _ONLY:
        build()
