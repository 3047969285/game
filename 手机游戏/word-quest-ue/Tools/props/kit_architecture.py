"""Architecture, street and outdoor prop kits for the Unit 1 textbook scenes (Blender 4.5).

Run:  "$B" -b -P Tools/props/kit_architecture.py
Each kit: new_kit() -> parts -> finish(kit, parts)  (SourceArt/Props/SM_<kit>.fbx + preview PNG).
Sizes come from Content/Data/memory/textbook_scenes/unit01.json "size".
"""
import math
import os
import sys
import traceback

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

import kit_common as kc
from kit_common import box, cyl, finish, mat, reset


def new_kit():
    reset()
    kc._MATS.clear()  # reset() frees the old datablocks; drop stale material-cache entries


def glass(role, color="#BFD9E6"):
    m = mat(role, color, roughness=0.05, alpha=0.25)
    try:
        m.surface_render_method = "BLENDED"
    except AttributeError:
        pass
    return m


# ---------------------------------------------------------------- walls

def k_wall():
    # size 6.0 x 0.2 x 3.0
    new_kit()
    plaster = mat("plaster", "#EEE6D8", 0.92, noise=0.12)
    trim = mat("trim", "#F6F3EC", 0.45)
    p = [box("core", (6.0, 0.16, 3.0), (0, 0, 1.5), plaster, bevel=0.006)]
    for s in (1, -1):  # skirting + crown on both faces so either orientation reads correctly
        p.append(box("skirting", (5.9, 0.02, 0.12), (0, s * 0.09, 0.06), trim, bevel=0.004))
        p.append(box("crown", (5.9, 0.02, 0.10), (0, s * 0.09, 2.90), trim, bevel=0.004))
    finish("wall", p)


def k_window_wall():
    # size 5.0 x 0.2 x 3.0 ; two framed windows (x = -1.3 and +1.3), openings z 0.95..2.65
    new_kit()
    plaster = mat("plaster", "#EEE6D8", 0.92, noise=0.12)
    frame = mat("frame", "#F4F1EA", 0.4)
    gl = glass("glass", "#CFE6F0")
    p = [
        box("spandrel", (5.0, 0.16, 0.90), (0, 0, 0.45), plaster),
        box("lintel", (5.0, 0.16, 0.30), (0, 0, 2.85), plaster),
        box("pier_l", (0.25, 0.16, 1.8), (-2.375, 0, 1.8), plaster),
        box("pier_c", (0.70, 0.16, 1.8), (0, 0, 1.8), plaster),
        box("pier_r", (0.25, 0.16, 1.8), (2.375, 0, 1.8), plaster),
    ]
    for cx in (-1.3, 1.3):
        p.append(box("pane", (1.8, 0.01, 1.7), (cx, 0, 1.8), gl, bevel=0))
        p.append(box("rail_t", (1.9, 0.06, 0.06), (cx, 0, 2.67), frame))
        p.append(box("rail_b", (1.9, 0.06, 0.06), (cx, 0, 0.93), frame))
        p.append(box("rail_l", (0.06, 0.06, 1.8), (cx - 0.92, 0, 1.8), frame))
        p.append(box("rail_r", (0.06, 0.06, 1.8), (cx + 0.92, 0, 1.8), frame))
        p.append(box("mullion", (0.04, 0.04, 1.7), (cx, 0, 1.8), frame))
        for s in (1, -1):
            p.append(box("sill", (2.1, 0.02, 0.04), (cx, s * 0.09, 0.87), frame))
    finish("window_wall", p)


# ---------------------------------------------------------------- commercial

def k_glass_building():
    # size 10 x 6 x 8 ; core + glass curtain wall on 4 faces, entrance canopy on +Y
    new_kit()
    core_m = mat("core", "#C9D0D8", 0.7)
    gl = glass("glass", "#8FBCD0")
    alu = mat("alu", "#C3C9D1", 0.3, metallic=0.85)
    steel = mat("steel", "#2B3038", 0.4, metallic=0.6)
    yf, yb = 2.72, -2.82  # glass planes, front (+Y) and back
    p = [
        box("core", (9.8, 5.5, 8.0), (0, -0.05, 4.0), core_m, bevel=0.01),
        box("glass_front", (9.8, 0.04, 7.8), (0, yf, 3.9), gl, bevel=0),
        box("glass_back", (9.8, 0.04, 7.8), (0, yb, 3.9), gl, bevel=0),
    ]
    for s in (-1, 1):
        p.append(box("glass_side", (0.04, 5.5, 7.8), (s * 4.92, -0.05, 3.9), gl, bevel=0))
    for i in range(9):  # mullions on the 9.8 m faces
        x = -4.9 + i * 1.225
        p.append(box("mull_f", (0.08, 0.08, 8.0), (x, yf, 4.0), alu, bevel=0.006))
        p.append(box("mull_b", (0.08, 0.08, 8.0), (x, yb, 4.0), alu, bevel=0.006))
    for i in range(5):  # mullions on the 5.5 m side faces
        y = -2.8 + i * 1.375
        for s in (-1, 1):
            p.append(box("mull_s", (0.08, 0.08, 8.0), (s * 4.92, y, 4.0), alu, bevel=0.006))
    for z in (2.667, 5.333):  # floor transoms
        p.append(box("transom_f", (9.84, 0.08, 0.08), (0, yf, z), alu, bevel=0.006))
        p.append(box("transom_b", (9.84, 0.08, 0.08), (0, yb, z), alu, bevel=0.006))
        for s in (-1, 1):
            p.append(box("transom_s", (0.08, 5.5, 0.08), (s * 4.92, -0.05, z), alu, bevel=0.006))
    p.append(box("canopy", (3.2, 0.26, 0.12), (0, 2.87, 2.9), steel, bevel=0.006))
    for x in (-1.4, 1.4):
        p.append(cyl("canopy_post", 0.05, 2.84, (x, 2.9, 1.42), steel, verts=16))
    finish("glass_building", p)


def k_storefront():
    # size 5.0 x 0.4 x 3.6 ; glass window left, door right, sign band on top
    new_kit()
    facade = mat("facade", "#2F4E42", 0.6, noise=0.05)
    frame = mat("frame", "#1B1E22", 0.35, metallic=0.6)
    gl = glass("glass", "#B8D8E4")
    door = mat("door", "#6B4A2E", 0.55, noise=0.1)
    sign = mat("sign", "#1F3D36", 0.4, emission="#FFE2A8", emission_strength=0.6)
    p = [
        box("body", (5.0, 0.36, 3.0), (0, 0, 1.5), facade),
        box("sign_band", (5.0, 0.04, 0.6), (0, 0.19, 3.3), sign, bevel=0.004),
        box("stall_base", (5.0, 0.38, 0.30), (0, 0, 0.15), frame, bevel=0.006),
        box("window_glass", (2.1, 0.02, 2.3), (-0.65, 0.185, 1.75), gl, bevel=0),
        box("win_rail_t", (2.2, 0.04, 0.06), (-0.65, 0.19, 2.93), frame),
        box("win_rail_b", (2.2, 0.04, 0.06), (-0.65, 0.19, 0.60), frame),
        box("win_rail_l", (0.06, 0.04, 2.33), (-1.70, 0.19, 1.75), frame),
        box("win_rail_r", (0.06, 0.04, 2.33), (0.40, 0.19, 1.75), frame),
        box("door", (0.9, 0.03, 2.4), (1.2, 0.18, 1.2), door, bevel=0.004),
        box("door_handle", (0.03, 0.04, 0.2), (1.02, 0.2, 1.2), frame, bevel=0.003),
    ]
    finish("storefront", p)


def k_boutique_front():
    # size 6.0 x 0.4 x 4.0 ; large display windows, central glass door, sloped awning
    new_kit()
    stone = mat("stone", "#E8E1D6", 0.7, noise=0.08)
    gl = glass("glass", "#BFD9E6")
    brass = mat("brass", "#C9A45C", 0.25, metallic=0.9)
    awning = mat("awning", "#1E3B33", 0.8)
    frame = mat("frame", "#1B1E22", 0.35, metallic=0.5)
    p = [
        box("body", (6.0, 0.28, 4.0), (0, -0.04, 2.0), stone),          # y -0.18 .. 0.10
        box("cornice", (6.0, 0.30, 0.14), (0, -0.03, 3.93), stone, bevel=0.005),
        box("awning", (5.0, 0.14, 0.03), (0, 0.16, 3.10), awning, bevel=0.003, rot=(-20, 0, 0)),
        box("door_glass", (0.8, 0.02, 2.5), (0, 0.10, 1.25), gl, bevel=0),
        box("door_post_l", (0.05, 0.03, 2.5), (-0.42, 0.115, 1.25), frame, bevel=0.003),
        box("door_post_r", (0.05, 0.03, 2.5), (0.42, 0.115, 1.25), frame, bevel=0.003),
        box("door_head", (0.9, 0.03, 0.06), (0, 0.115, 2.53), frame, bevel=0.003),
        box("nameplate", (1.4, 0.02, 0.3), (0, 0.11, 3.5), brass, bevel=0.003),
    ]
    for cx in (-1.3, 1.3):
        p.append(box("win_glass", (1.8, 0.02, 2.4), (cx, 0.10, 1.7), gl, bevel=0))
        p.append(box("win_rail_t", (1.9, 0.03, 0.06), (cx, 0.115, 2.93), frame, bevel=0.003))
        p.append(box("win_rail_b", (1.9, 0.03, 0.06), (cx, 0.115, 0.47), frame, bevel=0.003))
        for s in (-1, 1):
            p.append(box("win_post", (0.06, 0.03, 2.5), (cx + s * 0.93, 0.115, 1.7), frame, bevel=0.003))
    finish("boutique_front", p)


def k_mall_atrium():
    # size 14 x 10 x 9 ; open toward +Y ; 3 floors (ground + 2 balcony levels), skylight frame
    new_kit()
    concrete = mat("concrete", "#D8D4CC", 0.8, noise=0.08)
    floor = mat("floor", "#B08A5E", 0.6, noise=0.1)
    rail = mat("rail", "#2A2F36", 0.4, metallic=0.7)
    steel = mat("steel", "#3A4048", 0.45, metallic=0.6)
    gl = glass("glass", "#CFE8F0")
    p = [
        box("back_wall", (14.0, 0.4, 9.0), (0, -4.8, 4.5), concrete),
        box("ground", (14.0, 10.0, 0.3), (0, 0, 0.15), concrete),
    ]
    for s in (-1, 1):
        p.append(box("side_wall", (0.4, 10.0, 9.0), (s * 6.8, 0, 4.5), concrete))
    for z in (3.0, 6.0):
        p.append(box("balc_back", (14.0, 2.0, 0.3), (0, -4.0, z + 0.15), floor))
        rail_z = z + 1.2
        for s in (-1, 1):
            p.append(box("balc_side", (1.5, 8.0, 0.3), (s * 6.25, 1.0, z + 0.15), floor))
            p.append(box("rail_side", (0.04, 8.0, 0.04), (s * 5.5, 1.0, rail_z), rail))
            for y in (-3.0, -1.0, 1.0, 3.0, 5.0):
                p.append(cyl("post", 0.025, 0.9, (s * 5.5, y, z + 0.75), rail, verts=8))
        p.append(box("rail_back", (11.0, 0.04, 0.04), (0, -3.0, rail_z), rail))
        for x in (-5.5, -2.75, 0.0, 2.75, 5.5):
            p.append(cyl("post", 0.025, 0.9, (x, -3.0, z + 0.75), rail, verts=8))
    p.append(box("beam_front", (14.0, 0.3, 0.3), (0, 4.85, 8.85), steel))
    p.append(box("beam_back", (14.0, 0.3, 0.3), (0, -4.85, 8.85), steel))
    for s in (-1, 1):
        p.append(box("beam_side", (0.3, 10.0, 0.3), (s * 6.85, 0, 8.85), steel))
    for x in (-4.5, 0.0, 4.5):
        p.append(box("beam_cross", (0.2, 10.0, 0.2), (x, 0, 8.85), steel))
    p.append(box("skylight", (13.4, 9.4, 0.02), (0, 0, 9.0), gl, bevel=0))
    finish("mall_atrium", p)


def k_city_skyline():
    # size 40 x 6 x 18 ; 12 blocks ; window grids on the +Y faces, 4 blocks emissive
    new_kit()
    walls = [mat("wall_a", "#5B6573", 0.7, noise=0.05), mat("wall_b", "#7C6A5D", 0.75, noise=0.05),
             mat("wall_c", "#8A8F96", 0.6, noise=0.05), mat("wall_d", "#4E5A66", 0.65, noise=0.05)]
    dark = mat("pane_dark", "#2A3440", 0.2, metallic=0.3)
    lit = mat("pane_lit", "#FFD9A8", 0.4, emission="#FFD9A8", emission_strength=2.0)
    widths = [3.2, 2.6, 4.0, 3.0, 3.6, 2.4, 4.2, 3.0, 3.8, 2.8, 3.4, 4.0]
    depths = [4.5, 5.5, 4.0, 6.0, 3.5, 5.0, 4.2, 6.0, 4.6, 3.8, 5.2, 4.0]
    heights = [9.0, 14.0, 6.0, 11.0, 18.0, 7.0, 12.0, 8.0, 16.0, 10.0, 13.0, 6.5]
    lit_ids = {1, 4, 8, 10}
    p = []
    x0 = -20.0
    for i, (w, d, h) in enumerate(zip(widths, depths, heights)):
        cx = x0 + w / 2
        x0 += w
        p.append(box(f"bldg{i}", (w, d, h), (cx, 0, h / 2), walls[i % 4], bevel=0.02))
        cols = int((w - 0.6) // 0.8)
        rows = int((h - 1.0) // 1.0)
        for r in range(rows):
            for c in range(cols):
                px = cx - (cols - 1) * 0.4 + c * 0.8
                pz = 1.3 + r * 1.0
                on = i in lit_ids and (r * 3 + c * 5 + i) % 3 == 0
                p.append(box(f"pane{i}", (0.45, 0.01, 0.6), (px, d / 2 + 0.005, pz),
                             lit if on else dark, bevel=0))
    finish("city_skyline", p)


# ---------------------------------------------------------------- ground / outdoor

def k_street():
    # size 24 x 8 x 0.02 ; flat: kerbs are flush edge strips (a raised kerb would break the 0.02 height)
    new_kit()
    asphalt = mat("asphalt", "#2E3136", 0.9, noise=0.2)
    pave = mat("pavement", "#B7B2A8", 0.8, noise=0.1)
    kerb = mat("kerb", "#D3CFC6", 0.6)
    paint = mat("paint", "#F2F2EE", 0.5)
    p = [box("road", (24.0, 5.0, 0.02), (0, 0, 0.01), asphalt, bevel=0.002)]
    for s in (-1, 1):
        p.append(box("pavement", (24.0, 1.5, 0.02), (0, s * 3.25, 0.01), pave, bevel=0.002))
        p.append(box("kerb", (24.0, 0.12, 0.021), (0, s * 2.44, 0.0105), kerb, bevel=0.001))
        p.append(box("edge_line", (24.0, 0.10, 0.0015), (0, s * 2.2, 0.0205), paint, bevel=0.0005))
    for k in range(8):
        p.append(box("dash", (1.5, 0.12, 0.0015), (-10.5 + 3.0 * k, 0, 0.0205), paint, bevel=0.0005))
    finish("street", p)


def k_lawn():
    # size 14 x 10 x 0.02 ; grass with noise, soil border
    new_kit()
    grass = mat("grass", "#4F7D3A", 0.9, noise=0.3)
    soil = mat("soil", "#5B4A36", 0.95, noise=0.15)
    p = [box("grass", (14.0, 10.0, 0.02), (0, 0, 0.01), grass, bevel=0.009)]
    for s in (-1, 1):
        p.append(box("border_ns", (14.0, 0.1, 0.021), (0, s * 4.95, 0.0105), soil, bevel=0.002))
        p.append(box("border_ew", (0.1, 9.8, 0.021), (s * 6.95, 0, 0.0105), soil, bevel=0.002))
    finish("lawn", p)


def k_playground():
    # footprint 12 x 8 (surface) ; climbing frame + slide need height, so z = 2.43 (see report)
    new_kit()
    rubber = mat("rubber", "#C4553A", 0.9, noise=0.12)
    steel = mat("steel", "#3E6E9E", 0.4, metallic=0.6)
    wood = mat("wood", "#B0844F", 0.7, noise=0.15)
    slide = mat("slide", "#E8B923", 0.35)
    p = [box("surface", (12.0, 8.0, 0.02), (0, 0, 0.01), rubber, bevel=0.005)]
    xc = -2.5  # climbing frame
    for dx in (-1.5, 1.5):
        for dy in (-1.0, 1.0):
            p.append(cyl("post", 0.04, 2.4, (xc + dx, dy, 1.2), steel, verts=12))
    for dy in (-1.0, 1.0):
        p.append(box("rail_x", (3.0, 0.06, 0.06), (xc, dy, 2.4), steel))
    for dx in (-1.5, 1.5):
        p.append(box("rail_y", (0.06, 2.0, 0.06), (xc + dx, 0, 2.4), steel))
    p.append(box("deck", (2.6, 1.6, 0.06), (xc, 0, 1.2), wood))
    for dy, z in ((-1.0, 0.6), (1.0, 1.8)):
        p.append(cyl("bar", 0.02, 3.0, (xc, dy, z), steel, verts=10, rot=(0, 90, 0)))
    tx, ty = 4.0, -2.0  # slide tower
    p.append(box("tower_deck", (1.4, 1.4, 0.08), (tx, ty, 1.2), wood))
    for dx in (-0.6, 0.6):
        for dy in (-0.6, 0.6):
            p.append(cyl("tower_post", 0.035, 1.16, (tx + dx, ty + dy, 0.58), steel, verts=10))
    # slide: top at the deck edge (y -1.3, z 1.2) down to (y 1.2, z 0); angle ~25.6 deg
    p.append(box("slide", (0.6, 2.8, 0.05), (tx, -0.05, 0.6), slide, bevel=0.012, rot=(-25.6, 0, 0)))
    finish("playground", p)


def k_swing():
    # size 2.0 x 1.2 x 2.2 ; A-frames at x = +-0.9, beam along X, two seats on chains
    new_kit()
    steel = mat("steel", "#8C9399", 0.35, metallic=0.75)
    seat_m = mat("seat", "#2B2E33", 0.7)
    chain = mat("chain", "#9AA1A8", 0.3, metallic=0.8)
    p = [box("beam", (2.0, 0.08, 0.08), (0, 0, 2.14), steel, bevel=0.01)]
    L = math.hypot(0.55, 2.1)
    ang = math.degrees(math.asin(0.55 / L))
    for x in (-0.9, 0.9):
        for s in (1, -1):
            p.append(box("leg", (0.05, 0.05, L), (x, s * 0.275, 1.05), steel, bevel=0.006, rot=(s * ang, 0, 0)))
    for sx in (-0.5, 0.5):
        p.append(box("seat", (0.36, 0.26, 0.03), (sx, 0, 0.45), seat_m, bevel=0.008))
        for dx in (-0.15, 0.15):
            p.append(cyl("chain", 0.006, 1.65, (sx + dx, 0, 1.275), chain, verts=8, bevel=0))
    finish("swing", p)


def k_bench():
    # size 1.6 x 0.6 x 0.8: slatted seat on a front leg and a rail, slatted backrest on two rear posts
    new_kit()
    wood = mat("wood", "#8A5A34", 0.7, noise=0.25)
    iron = mat("iron", "#2A2E33", 0.45, metallic=0.7)
    p = []
    for y in (-0.175, -0.065, 0.045, 0.155, 0.265):
        p.append(box("seat_slat", (1.6, 0.09, 0.03), (0, y, 0.44), wood, bevel=0.006))
    for z in (0.50, 0.60, 0.70, 0.785):
        p.append(box("back_slat", (1.6, 0.06, 0.03), (0, -0.28, z), wood, bevel=0.006))
    for sx in (-0.7, 0.7):
        p.append(cyl("front_leg", 0.02, 0.43, (sx, 0.2, 0.215), iron, verts=12))
        p.append(cyl("back_post", 0.02, 0.8, (sx, -0.28, 0.40), iron, verts=12))
        p.append(box("seat_rail", (0.04, 0.6, 0.04), (sx, 0.0, 0.40), iron, bevel=0.003))
        p.append(box("brace", (0.04, 0.5, 0.03), (sx, -0.03, 0.12), iron, bevel=0.003))
    finish("bench", p)


def k_hutong_wall():
    # size 8.0 x 0.4 x 2.8 ; Beijing grey-brick wall, tiled coping, red door
    new_kit()
    brick = mat("brick", "#7D7A72", 0.9, noise=0.25)
    stone = mat("stone", "#A8A69E", 0.85, noise=0.1)
    tile = mat("tile", "#4A5560", 0.45)
    door = mat("door", "#A3262B", 0.5, noise=0.08)
    wood = mat("wood", "#3B2A1E", 0.6)
    p = [
        box("plinth", (8.0, 0.40, 0.15), (0, 0, 0.075), stone, bevel=0.01),
        box("body", (8.0, 0.36, 2.66), (0, 0, 1.33), brick, bevel=0.01),
        box("coping_f", (8.0, 0.2, 0.08), (0, 0.1, 2.72), tile, bevel=0.008, rot=(-10, 0, 0)),
        box("coping_b", (8.0, 0.2, 0.08), (0, -0.1, 2.72), tile, bevel=0.008, rot=(10, 0, 0)),
        box("door", (1.0, 0.03, 2.0), (0, 0.195, 1.0), door, bevel=0.004),
        box("door_lintel", (1.2, 0.04, 0.08), (0, 0.19, 2.06), wood, bevel=0.004),
        box("door_post_l", (0.08, 0.04, 2.0), (-0.54, 0.19, 1.0), wood, bevel=0.004),
        box("door_post_r", (0.08, 0.04, 2.0), (0.54, 0.19, 1.0), wood, bevel=0.004),
    ]
    finish("hutong_wall", p)


KITS = [k_wall, k_window_wall, k_glass_building, k_hutong_wall, k_storefront, k_boutique_front,
        k_mall_atrium, k_city_skyline, k_street, k_lawn, k_playground, k_swing, k_bench]

_only = {k for k in os.environ.get("KITS", "").split(",") if k}
for _fn in KITS:
    if _only and _fn.__name__[2:] not in _only:
        continue
    try:
        _fn()
    except Exception:
        traceback.print_exc()
        print(f"KIT FAILED {_fn.__name__}", flush=True)
