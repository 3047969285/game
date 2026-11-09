"""Office / school / home prop kits for the Unit 1 textbook scenes (run inside Blender 4.5).

    "$B" -b -P Tools/props/kit_office.py

Each kit: reset() -> build parts -> centre on XY -> finish(kit, parts)
(finish joins into SM_<kit>, exports SourceArt/Props/SM_<kit>.fbx and writes the preview PNG).
Front of every kit faces Blender +Y. Sizes follow Content/Data/memory/textbook_scenes/unit01.json.
"""
import math
import os
import random
import sys
import traceback

import bpy

try:
    HERE = os.path.dirname(os.path.abspath(__file__))
except NameError:
    HERE = "/Users/shoudaodefengge/项目/.claude/worktrees/game-memory/手机游戏/word-quest-ue/Tools/props"
sys.path.insert(0, HERE)

import kit_common as kc  # noqa: E402
from kit_common import *  # noqa: E402,F401,F403


def center_xy(parts):
    """Shift parts so the kit footprint is centred on the origin (x, y)."""
    bpy.context.view_layer.update()
    xs, ys = [], []
    for p in parts:
        for v in p.data.vertices:
            w = p.matrix_world @ v.co
            xs.append(w.x)
            ys.append(w.y)
    cx = (min(xs) + max(xs)) / 2
    cy = (min(ys) + max(ys)) / 2
    for p in parts:
        p.location.x -= cx
        p.location.y -= cy


# ---------------------------------------------------------------- board_table 5.0 x 1.4 x 0.75
def board_table():
    walnut = mat("walnut", "#5E4330", 0.45, noise=0.2)
    steel = mat("steel", "#2A2D33", 0.4, 0.8)
    parts = [rounded_slab("top", (5.0, 1.4, 0.07), (0, 0, 0.715), walnut, radius=0.03)]
    for x in (-2.3, 2.3):
        parts.append(box("panel_leg", (0.06, 1.2, 0.68), (x, 0, 0.34), steel))
        parts.append(box("foot", (0.1, 1.2, 0.02), (x, 0, 0.01), steel))
    parts.append(box("stretcher", (4.5, 0.05, 0.06), (0, 0, 0.62), steel))
    parts.append(cyl("grommet", 0.03, 0.01, (0.8, 0.2, 0.755), steel, verts=24))
    return parts


# ---------------------------------------------------------------- office_chair 0.6 x 0.6 x 1.1
def office_chair():
    chrome = mat("chrome", "#9AA0A8", 0.2, 1.0)
    plastic = mat("plastic", "#1C1F24", 0.5)
    fabric = mat("seat_fabric", "#2A2E36", 0.9, noise=0.1)
    mesh = mat("back_mesh", "#3B414B", 0.75)
    parts = []
    for i in range(5):                                   # 5-star base with casters
        a = math.radians(72 * i)
        ca, sa = math.cos(a), math.sin(a)
        parts.append(box("arm", (0.27, 0.035, 0.03), (ca * 0.135, sa * 0.135, 0.05), plastic, rot=(0, 0, 72 * i)))
        parts.append(sphere("caster", 0.028, (ca * 0.27, sa * 0.27, 0.028), plastic, segments=12))
    parts.append(cyl("hub", 0.045, 0.04, (0, 0, 0.1), chrome))
    parts.append(cyl("gas_lift", 0.025, 0.3, (0, 0, 0.25), chrome))
    parts.append(rounded_slab("seat", (0.5, 0.5, 0.08), (0, 0, 0.44), fabric, radius=0.06))
    # mesh back: panel + rim frame
    parts.append(box("back_mesh", (0.46, 0.03, 0.52), (0, -0.23, 0.8), mesh))
    parts.append(box("rim_top", (0.48, 0.04, 0.03), (0, -0.23, 1.06), plastic))
    parts.append(box("rim_bottom", (0.48, 0.04, 0.03), (0, -0.23, 0.54), plastic))
    for x in (-0.235, 0.235):
        parts.append(box("rim_side", (0.03, 0.04, 0.52), (x, -0.23, 0.8), plastic))
    parts.append(box("back_post", (0.05, 0.05, 0.08), (0, -0.2, 0.5), plastic))
    for x in (-0.26, 0.26):                               # armrests
        parts.append(box("arm_post", (0.04, 0.04, 0.2), (x, -0.02, 0.58), plastic))
        parts.append(box("arm_pad", (0.06, 0.24, 0.03), (x, -0.02, 0.7), plastic))
    return parts


# ---------------------------------------------------------------- blinds 3.0 x 0.05 x 2.2
def blinds():
    alu = mat("blind_slat", "#D9DCE0", 0.35, 0.7)
    frame = mat("blind_frame", "#F2F1EE", 0.5)
    parts = [
        box("head_rail", (3.0, 0.05, 0.06), (0, 0, 2.17), frame),
        box("bottom_rail", (3.0, 0.05, 0.04), (0, 0, 0.02), frame),
        box("side_l", (0.04, 0.05, 2.2), (-1.48, 0, 1.1), frame),
        box("side_r", (0.04, 0.05, 2.2), (1.48, 0, 1.1), frame),
    ]
    n, z0, z1 = 22, 0.07, 2.12
    pitch = (z1 - z0) / (n - 1)
    for i in range(n):
        parts.append(box("slat", (2.92, 0.022, 0.08), (0, 0, z0 + i * pitch), alu, bevel=0.002, rot=(15, 0, 0)))
    return parts


# ---------------------------------------------------------------- projector_screen 2.4 x 0.05 x 1.5
def projector_screen():
    case = mat("screen_case", "#D9DCE1", 0.3, 0.3)
    surface = mat("screen_surface", "#F3F5F7", 0.85)
    frame = mat("screen_frame", "#2A2D33", 0.5, 0.5)
    parts = [
        rounded_slab("case", (2.4, 0.05, 0.1), (0, 0, 1.45), case, radius=0.02),
        box("surface", (2.36, 0.012, 1.2), (0, 0, 0.8), surface, bevel=0.002),
        box("foot_bar", (2.4, 0.05, 0.04), (0, 0, 0.02), frame),
        cyl("post_l", 0.02, 1.4, (-1.19, 0, 0.7), frame, verts=16),
        cyl("post_r", 0.02, 1.4, (1.19, 0, 0.7), frame, verts=16),
    ]
    return parts


# ---------------------------------------------------------------- office_desk 1.4 x 0.75 x 0.75
def office_desk():
    wood_m = mat("desk_wood", "#8C6A4C", 0.5, noise=0.2)
    metal = mat("desk_metal", "#7D8390", 0.35, 1.0)
    parts = [
        rounded_slab("top", (1.4, 0.75, 0.04), (0, 0, 0.73), wood_m, radius=0.02),
        box("pedestal", (0.42, 0.68, 0.71), (-0.49, 0, 0.355), wood_m),
        box("side_panel", (0.04, 0.7, 0.71), (0.68, 0, 0.355), wood_m),
        box("modesty", (1.32, 0.02, 0.1), (0, -0.33, 0.66), wood_m),
    ]
    for z in (0.6, 0.36, 0.12):                          # drawer fronts + pulls on the pedestal
        parts.append(box("drawer_front", (0.38, 0.02, 0.2), (-0.49, 0.35, z), wood_m))
        parts.append(box("drawer_pull", (0.1, 0.02, 0.015), (-0.49, 0.37, z + 0.06), metal))
    return parts


# ---------------------------------------------------------------- cockpit_console 1.4 x 0.6 x 0.35
def cockpit_console():
    body = mat("console_body", "#262C36", 0.45, 0.2)
    screen = mat("console_screen", "#0A0E14", 0.15, emission="#9FC4E8", emission_strength=2.0)
    strip = mat("console_strip", "#0A0E14", 0.15, emission="#9FC4E8", emission_strength=4.0)
    ring_m = mat("console_ring", "#0A0E14", 0.2, emission="#9FC4E8", emission_strength=3.0)
    metal = mat("console_metal", "#9AA1AB", 0.3, 1.0)
    grip = mat("console_grip", "#14171C", 0.5)
    R, Y0, band, base_h = 0.9, -0.2, 0.22, 0.12      # wrap radius, centre-line y at x = 0, band depth, base height
    tilt = math.radians(20.0)                         # screens lean back

    def arc(x, r):                                    # point on the circle of radius r the console wraps around
        return x, Y0 + R - math.sqrt(r * r - x * x)

    def theta(x):                                     # tangent angle of the centre line at x (radians)
        return math.atan2(x, math.sqrt(R * R - x * x))

    def normal(x, r):                                 # unit normal toward the operator (+Y side)
        return -x / r, math.sqrt(r * r - x * x) / r

    def screen_pt(lx, ly, lz, c, th):                 # screen-local offset -> world, same rotations as rot=(tilt, 0, th)
        y1 = ly * math.cos(tilt) - lz * math.sin(tilt)
        z1 = ly * math.sin(tilt) + lz * math.cos(tilt)
        return (c[0] + lx * math.cos(th) - y1 * math.sin(th),
                c[1] + lx * math.sin(th) + y1 * math.cos(th),
                c[2] + z1)

    parts = []
    # low curved base: 12 segments following the wrap arc
    N = 12
    seg = 1.28 / N
    for i in range(N):
        x = -0.64 + (i + 0.5) * seg
        px, py = arc(x, R)
        parts.append(box(f"base{i}", (seg * 1.06, band, base_h), (px, py, base_h / 2), body,
                         rot=(0, 0, math.degrees(theta(x)))))
    # three wide angled screens with brighter horizontal line strips
    sw, sh = 0.36, 0.24
    zc = base_h + (sh / 2) * math.cos(tilt)
    for k, x in enumerate((-0.44, 0.0, 0.44)):
        px, py = arc(x, R)
        nx, ny = normal(x, R)
        c = (px + 0.06 * nx, py + 0.06 * ny, zc)
        th = theta(x)
        rot = (math.degrees(tilt), 0, math.degrees(th))
        parts.append(box(f"screen{k}", (sw, 0.012, sh), c, screen, bevel=0.004, rot=rot))
        for j, (lz, frac) in enumerate(((-0.07, 0.75), (0.0, 0.5), (0.07, 0.62))):
            ws = frac * (sw - 0.08)
            lx = -sw / 2 + 0.04 + ws / 2
            parts.append(box(f"strip{k}_{j}", (ws, 0.004, 0.012), screen_pt(lx, 0.008, lz, c, th), strip,
                             bevel=0.0, rot=rot))
    # row of small round dials with emissive rings on the front face of the base
    rf = R - band / 2
    for i, x in enumerate((-0.6, -0.4, -0.2, 0.0, 0.2, 0.4, 0.6)):
        px, py = arc(x, rf)
        nx, ny = normal(x, rf)
        p = (px + nx * 0.004, py + ny * 0.004, base_h / 2)
        rot = (90, 0, math.degrees(math.atan2(nx, -ny)))
        parts.append(cyl(f"dial{i}", 0.02, 0.01, p, metal, verts=20, rot=rot, bevel=0.002))
        parts.append(torus(f"dial_ring{i}", 0.016, 0.003, (p[0] + nx * 0.0055, p[1] + ny * 0.0055, p[2]), ring_m,
                           rot=rot))
    # small throttle-style lever on the right end of the base
    bx, by = arc(0.645, R)
    parts.append(cyl("throttle_base", 0.03, 0.02, (bx, by, base_h + 0.01), metal, verts=20, bevel=0.002))
    parts.append(cyl("throttle_stick", 0.009, 0.14, (bx, by, base_h + 0.09), metal, verts=12, bevel=0.0))
    parts.append(sphere("throttle_grip", 0.024, (bx, by, base_h + 0.18), grip))
    return parts


# ---------------------------------------------------------------- door 1.0 x 0.1 x 2.1
def door():
    wood_m = mat("door_wood", "#8A5A36", 0.55, noise=0.2)
    metal = mat("door_metal", "#C0C4CA", 0.3, 1.0)
    parts = [
        box("jamb_l", (0.06, 0.1, 2.1), (-0.47, 0, 1.05), wood_m),
        box("jamb_r", (0.06, 0.1, 2.1), (0.47, 0, 1.05), wood_m),
        box("head", (1.0, 0.1, 0.06), (0, 0, 2.07), wood_m),
        box("leaf", (0.9, 0.04, 2.04), (0, 0, 1.02), wood_m, bevel=0.004),
        box("panel_top", (0.6, 0.012, 0.7), (0, 0.026, 1.5), wood_m, bevel=0.003),
        box("panel_bottom", (0.6, 0.012, 0.8), (0, 0.026, 0.6), wood_m, bevel=0.003),
        cyl("rose", 0.022, 0.012, (0.33, 0.03, 1.0), metal, verts=20, rot=(90, 0, 0)),
        box("lever", (0.12, 0.03, 0.02), (0.37, 0.05, 1.0), metal),
    ]
    return parts


# ---------------------------------------------------------------- cubicle 1.6 x 1.6 x 1.4
def cubicle():
    fabric = mat("cubicle_fabric", "#4E6172", 0.95, noise=0.1)
    core = mat("cubicle_core", "#3A434F", 0.7)
    alu = mat("cubicle_alu", "#B9BEC5", 0.35, 0.8)
    wood_m = mat("cubicle_desk", "#B68A5C", 0.5, noise=0.2)
    parts = [
        # three partitions (back, left, right); front is open
        box("wall_back", (1.6, 0.05, 1.4), (0, -0.775, 0.7), core),
        box("wall_left", (0.05, 1.6, 1.4), (-0.775, 0, 0.7), core),
        box("wall_right", (0.05, 1.6, 1.4), (0.775, 0, 0.7), core),
        box("fabric_back", (1.5, 0.01, 1.3), (0, -0.745, 0.7), fabric, bevel=0.002),
        box("fabric_left", (0.01, 1.5, 1.3), (-0.745, 0, 0.7), fabric, bevel=0.002),
        box("fabric_right", (0.01, 1.5, 1.3), (0.745, 0, 0.7), fabric, bevel=0.002),
        box("cap_back", (1.6, 0.05, 0.03), (0, -0.775, 1.415), alu),
        box("cap_left", (0.05, 1.6, 0.03), (-0.775, 0, 1.415), alu),
        box("cap_right", (0.05, 1.6, 0.03), (0.775, 0, 1.415), alu),
        box("desk_top", (1.5, 0.7, 0.04), (0, -0.4, 0.72), wood_m),
    ]
    for x in (-0.7, 0.7):
        parts.append(box("desk_leg", (0.04, 0.04, 0.7), (x, -0.05, 0.35), alu))
    return parts


# ---------------------------------------------------------------- video_grid 1.6 x 0.05 x 0.9
def video_grid():
    bezel = mat("video_bezel", "#15181D", 0.4, 0.3)
    colours = ["#4FC3F7", "#81C784", "#FFB74D"]
    tiles = [mat(f"video_tile{k}", c, 0.3, emission=c, emission_strength=4.0) for k, c in enumerate(colours)]
    parts = [box("bezel", (1.6, 0.05, 0.9), (0, 0, 0.45), bezel, bevel=0.01)]
    tw = (1.46 - 0.04) / 3
    th_ = (0.8 - 0.04) / 3
    for r in range(3):
        for c in range(3):
            x = -0.73 + 0.02 + tw / 2 + c * (tw + 0.02)
            z = 0.05 + 0.02 + th_ / 2 + r * (th_ + 0.02)
            parts.append(box(f"tile_{r}{c}", (tw, 0.004, th_), (x, 0.0265, z), tiles[(r * 3 + c) % 3], bevel=0.001))
    return parts


# ---------------------------------------------------------------- home_desk 1.2 x 0.6 x 0.75
def home_desk():
    wood_m = mat("home_wood", "#D9B98C", 0.55, noise=0.15)
    metal = mat("home_metal", "#4A4F57", 0.4, 0.6)
    parts = [rounded_slab("top", (1.2, 0.6, 0.03), (0, 0, 0.735), wood_m, radius=0.015)]
    for x in (-0.575, 0.575):
        for y in (-0.275, 0.275):
            parts.append(box("leg", (0.05, 0.05, 0.72), (x, y, 0.36), metal, bevel=0.005))
    parts.append(box("drawer_unit", (0.4, 0.56, 0.68), (0.33, 0, 0.36), wood_m))
    for z in (0.56, 0.34, 0.12):
        parts.append(box("drawer_front", (0.38, 0.02, 0.2), (0.33, 0.29, z), wood_m))
        parts.append(box("drawer_pull", (0.1, 0.02, 0.015), (0.33, 0.31, z + 0.06), metal))
    return parts


# ---------------------------------------------------------------- whiteboard 1.8 x 0.05 x 1.1
def whiteboard():
    alu = mat("wb_alu", "#C5CAD1", 0.35, 0.9)
    face = mat("wb_face", "#F5F6F4", 0.25)
    steel = mat("wb_steel", "#4C525B", 0.4, 0.7)
    marker = mat("wb_marker", "#D2453A", 0.5)
    parts = [
        box("frame", (1.8, 0.03, 0.9), (0, 0, 0.65), alu, bevel=0.004),
        box("face", (1.72, 0.004, 0.82), (0, 0.0165, 0.65), face, bevel=0.002),
        box("tray", (1.6, 0.02, 0.03), (0, 0.025, 0.215), alu, bevel=0.003),
        cyl("marker", 0.008, 0.12, (0.3, 0.025, 0.238), marker, verts=12, rot=(0, 90, 0)),
    ]
    for x in (-0.7, 0.7):
        parts.append(box("leg", (0.04, 0.04, 0.2), (x, 0, 0.1), steel))
    parts.append(box("stretcher", (1.4, 0.02, 0.02), (0, 0, 0.06), steel))
    return parts


# ---------------------------------------------------------------- chair 0.45 x 0.5 x 0.9
def chair():
    wood_m = mat("chair_wood", "#8B5E3C", 0.5, noise=0.15)
    pad = mat("chair_pad", "#7A3B2E", 0.85, noise=0.1)
    parts = [
        rounded_slab("seat", (0.44, 0.5, 0.04), (0, 0, 0.45), wood_m, radius=0.02),
        rounded_slab("cushion", (0.42, 0.46, 0.03), (0, 0, 0.485), pad, radius=0.04),
        box("back_top", (0.44, 0.03, 0.08), (0, -0.22, 0.86), wood_m),
        box("back_mid", (0.38, 0.02, 0.1), (0, -0.22, 0.65), wood_m),
    ]
    for x in (-0.2, 0.2):
        parts.append(box("leg_front", (0.035, 0.035, 0.43), (x, 0.22, 0.215), wood_m))
        parts.append(box("leg_back", (0.035, 0.035, 0.9), (x, -0.22, 0.45), wood_m))
        parts.append(box("stretch_side", (0.02, 0.44, 0.02), (x, 0, 0.12), wood_m))
    parts.append(box("stretch_front", (0.4, 0.02, 0.02), (0, 0.22, 0.12), wood_m))
    return parts


# ---------------------------------------------------------------- reading_table 2.4 x 1.0 x 0.76
def reading_table():
    walnut = mat("rt_walnut", "#5A3E2B", 0.5, noise=0.2)
    brass = mat("rt_brass", "#B08D57", 0.3, 1.0)
    parts = [
        rounded_slab("top", (2.4, 1.0, 0.04), (0, 0, 0.69), walnut, radius=0.02),
        box("lamp_rail", (2.3, 0.05, 0.05), (0, -0.45, 0.735), brass),
    ]
    for x in (-1.1, 1.1):
        for y in (-0.45, 0.45):
            parts.append(box("leg", (0.07, 0.07, 0.71), (x, y, 0.355), walnut))
    parts.append(box("stretch_x", (2.2, 0.03, 0.05), (0, 0.45, 0.2), walnut))
    parts.append(box("stretch_x_back", (2.2, 0.03, 0.05), (0, -0.45, 0.2), walnut))
    for x in (-1.1, 1.1):
        parts.append(box("stretch_y", (0.03, 0.9, 0.05), (x, 0, 0.2), walnut))
    return parts


# ---------------------------------------------------------------- library_shelf 3.0 x 0.45 x 2.2
def library_shelf():
    wood_m = mat("shelf_wood", "#6E4B2E", 0.55, noise=0.15)
    book_cols = ["#8E2C2C", "#2E4E7A", "#3D6B3A", "#B8862E", "#E3DCCB"]
    books = [mat(f"book{i}", c, 0.6) for i, c in enumerate(book_cols)]
    rnd = random.Random(7)
    W, D, H, t = 3.0, 0.45, 2.2, 0.03
    parts = [
        box("side_l", (t, D, H), (-W / 2 + t / 2, 0, H / 2), wood_m),
        box("side_r", (t, D, H), (W / 2 - t / 2, 0, H / 2), wood_m),
        box("base", (W, D, 0.06), (0, 0, 0.03), wood_m),
        box("top", (W, D, 0.03), (0, 0, H - 0.015), wood_m),
    ]
    inner_bottom, inner_top = 0.06, H - 0.03
    bays = 4
    step = (inner_top - inner_bottom) / bays
    for k in range(1, bays):
        parts.append(box("shelf", (W - 2 * t, D, 0.02), (0, 0, inner_bottom + k * step), wood_m))
    for b in range(bays):                                # books stand on both faces (front and back)
        floor = inner_bottom if b == 0 else inner_bottom + b * step + 0.01
        ceil = inner_bottom + (b + 1) * step - 0.01 if b < bays - 1 else inner_top
        for ys in (0.11, -0.11):
            x = -W / 2 + t + 0.01
            while True:
                w = rnd.uniform(0.03, 0.06)
                if x + w > W / 2 - t - 0.01:
                    break
                h = rnd.uniform(0.22, min(0.36, ceil - floor - 0.02))
                parts.append(box("book", (w, 0.2, h), (x + w / 2, ys, floor + h / 2), rnd.choice(books), bevel=0.0))
                x += w + (rnd.uniform(0.0, 0.008) if rnd.random() < 0.25 else 0.0)
    return parts


# ---------------------------------------------------------------- cafe_table 0.7 x 0.7 x 0.74
def cafe_table():
    wood_m = mat("cafe_wood", "#8A6A4B", 0.5, noise=0.15)
    metal = mat("cafe_metal", "#2B2F36", 0.35, 0.8)
    parts = [
        cyl("top", 0.35, 0.03, (0, 0, 0.725), wood_m, verts=48),
        cyl("collar", 0.06, 0.04, (0, 0, 0.69), metal, verts=32),
        cyl("pedestal", 0.035, 0.66, (0, 0, 0.36), metal, verts=24),
        cyl("foot", 0.22, 0.03, (0, 0, 0.015), metal, verts=40),
    ]
    return parts


KITS = [
    ("board_table", board_table),
    ("office_chair", office_chair),
    ("blinds", blinds),
    ("projector_screen", projector_screen),
    ("office_desk", office_desk),
    ("cockpit_console", cockpit_console),
    ("door", door),
    ("cubicle", cubicle),
    ("video_grid", video_grid),
    ("home_desk", home_desk),
    ("whiteboard", whiteboard),
    ("chair", chair),
    ("reading_table", reading_table),
    ("library_shelf", library_shelf),
    ("cafe_table", cafe_table),
]


def main():
    only = {k for k in os.environ.get("KITS", "").split(",") if k}
    for name, make in KITS:
        if only and name not in only:
            continue
        try:
            reset()
            kc._MATS.clear()          # material cache points at datablocks that reset() just deleted
            parts = make()
            center_xy(parts)
            finish(name, parts)
        except Exception as exc:      # keep going so one bad kit does not hide the others
            traceback.print_exc()
            print(f"KIT FAILED {name}: {exc}", flush=True)


main()
