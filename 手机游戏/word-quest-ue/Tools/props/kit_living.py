"""Living-room / study / market kits for the textbook memory-game prop library (Blender 4.5).

Run:  /Applications/Blender.app/Contents/MacOS/Blender -b -P Tools/props/kit_living.py
Builds: armchair, sofa, coffee_table, bookshelf, book, chess_set, side_table, floor_lamp,
phone_basket, rug, calendar, tv, tv_stand, photo_album.
Sizes (w, d, h) come from textbook_scenes/unit01.json, except side_table (no unit01 entry; assumed).
"""
import math
import os
import random
import sys
import traceback

sys.dont_write_bytecode = True
try:
    HERE = os.path.dirname(os.path.abspath(__file__))
except NameError:
    HERE = "/Users/shoudaodefengge/项目/.claude/worktrees/game-memory/手机游戏/word-quest-ue/Tools/props"
sys.path.insert(0, HERE)

import bmesh  # noqa: E402
import bpy  # noqa: E402
import kit_common as kc  # noqa: E402
from kit_common import box, cyl, finish, mat, reset, sphere  # noqa: E402


def fresh():
    """New empty scene. kit_common caches materials, but reset() deletes them, so drop the cache too."""
    reset()
    kc._MATS.clear()


def bx(name, size, loc, m, bevel=0.003, seg=1, rot=(0, 0, 0)):
    """Small beveled box with a single bevel segment (keeps tri count low for many-part kits)."""
    bpy.ops.mesh.primitive_cube_add(size=1.0, location=loc, rotation=[math.radians(r) for r in rot])
    o = bpy.context.active_object
    o.name = name
    o.scale = size
    bpy.ops.object.transform_apply(scale=True)
    w = min(bevel, min(size) * 0.45)
    if w > 0:
        mod = o.modifiers.new("bevel", "BEVEL")
        mod.width = w
        mod.segments = seg
        mod.limit_method = "ANGLE"
        mod.angle_limit = math.radians(40)
        mod.harden_normals = True
    o.data.materials.append(m)
    return o


def lathe(name, profile, loc, m, segs=10):
    """Solid of revolution about Z. profile = [(radius, z), ...] bottom to top; r=0 makes a single pole vertex."""
    me = bpy.data.meshes.new(name)
    ob = bpy.data.objects.new(name, me)
    bpy.context.collection.objects.link(ob)
    bm = bmesh.new()
    rings = []
    for r, z in profile:
        if r <= 1e-6:
            rings.append([bm.verts.new((0.0, 0.0, z))])
        else:
            rings.append([bm.verts.new((r * math.cos(2 * math.pi * i / segs), r * math.sin(2 * math.pi * i / segs), z))
                          for i in range(segs)])
    for a, b in zip(rings, rings[1:]):
        if len(a) == 1 and len(b) == 1:
            continue
        if len(a) == 1:
            for i in range(segs):
                bm.faces.new((a[0], b[(i + 1) % segs], b[i]))
        elif len(b) == 1:
            for i in range(segs):
                bm.faces.new((a[i], a[(i + 1) % segs], b[0]))
        else:
            for i in range(segs):
                j = (i + 1) % segs
                bm.faces.new((a[i], a[j], b[j], b[i]))
    bmesh.ops.recalc_face_normals(bm, faces=list(bm.faces))
    bm.to_mesh(me)
    bm.free()
    ob.location = loc
    ob.data.materials.append(m)
    for p in me.polygons:
        p.use_smooth = True
    return ob


# ---------------------------------------------------------------- armchair 0.9 x 0.9 x 1.0
def k_armchair():
    fresh()
    wood = mat("walnut", "#4A3526", 0.5)
    fab = mat("linen", "#6F5E4C", 0.92, noise=0.12)
    cush = mat("cushion", "#5F5244", 0.9, noise=0.12)
    p = []
    for x in (-0.34, 0.34):
        for y in (-0.32, 0.32):
            p.append(cyl("leg", 0.02, 0.12, (x, y, 0.06), wood, verts=12, bevel=0.003))
    p.append(box("base_frame", (0.78, 0.8, 0.14), (0, 0, 0.19), wood, bevel=0.006))
    p.append(box("back_frame", (0.8, 0.18, 0.88), (0, -0.36, 0.56), fab, bevel=0.03))
    p.append(box("back_cushion", (0.66, 0.14, 0.46), (0, -0.2, 0.61), cush, bevel=0.035))
    p.append(box("seat_cushion", (0.6, 0.65, 0.12), (0, 0.055, 0.32), cush, bevel=0.03))
    for x in (-0.38, 0.38):
        p.append(box("arm", (0.14, 0.9, 0.36), (x, 0, 0.44), fab, bevel=0.035))
        p.append(box("arm_cap", (0.16, 0.92, 0.03), (x, 0, 0.635), wood, bevel=0.01))
    finish("armchair", p)


# ---------------------------------------------------------------- sofa 2.0 x 0.9 x 0.85
def k_sofa():
    fresh()
    wood = mat("beech", "#3A2C20", 0.5)
    fab = mat("velvet", "#7A6A58", 0.9, noise=0.1)
    pil_a = mat("pillow_a", "#8C7B66", 0.92)
    pil_b = mat("pillow_b", "#5E6B5C", 0.92)
    p = []
    for x in (-0.85, 0.85):
        for y in (-0.36, 0.36):
            p.append(cyl("leg", 0.022, 0.1, (x, y, 0.05), wood, verts=12, bevel=0.003))
    p.append(box("base", (1.96, 0.86, 0.26), (0, 0, 0.23), fab, bevel=0.02))
    for x in (-0.9, 0.9):
        p.append(box("arm", (0.2, 0.88, 0.52), (x, 0, 0.36), fab, bevel=0.05))
    p.append(box("back", (1.6, 0.22, 0.75), (0, -0.33, 0.475), fab, bevel=0.04))
    for x in (-0.4, 0.4):
        p.append(box("seat_cushion", (0.78, 0.64, 0.16), (x, 0.1, 0.44), fab, bevel=0.045))
        p.append(box("back_cushion", (0.78, 0.2, 0.3), (x, -0.12, 0.67), fab, bevel=0.06))
    p.append(box("pillow_a", (0.34, 0.12, 0.32), (-0.5, 0.03, 0.67), pil_a, bevel=0.05, rot=(-12, 0, 0)))
    p.append(box("pillow_b", (0.34, 0.12, 0.32), (0.5, 0.03, 0.67), pil_b, bevel=0.05, rot=(-12, 0, 0)))
    finish("sofa", p)


# ---------------------------------------------------------------- coffee table 1.1 x 0.6 x 0.42
def k_coffee_table():
    fresh()
    top_m = mat("oak_top", "#6B4A32", 0.35, noise=0.1)
    leg_m = mat("oak_leg", "#4D3524", 0.5)
    mag_a = mat("magazine_a", "#8C7A62", 0.75)
    mag_b = mat("magazine_b", "#4F5E63", 0.75)
    p = [box("top", (1.1, 0.6, 0.04), (0, 0, 0.4), top_m, bevel=0.01)]
    for x in (-0.5, 0.5):
        for y in (-0.25, 0.25):
            p.append(box("leg", (0.05, 0.05, 0.33), (x, y, 0.165), leg_m, bevel=0.008))
    for y in (-0.25, 0.25):
        p.append(box("apron_long", (1.0, 0.025, 0.05), (0, y, 0.355), leg_m, bevel=0.006))
    for x in (-0.5, 0.5):
        p.append(box("apron_short", (0.025, 0.5, 0.05), (x, 0, 0.355), leg_m, bevel=0.006))
    p.append(box("lower_shelf", (0.94, 0.42, 0.02), (0, 0, 0.1), leg_m, bevel=0.005))
    p.append(box("magazine_a", (0.22, 0.28, 0.022), (-0.2, 0, 0.121), mag_a, bevel=0.004))
    p.append(box("magazine_b", (0.22, 0.28, 0.022), (0.2, 0, 0.121), mag_b, bevel=0.004, rot=(0, 0, 8)))
    finish("coffee_table", p)


# ---------------------------------------------------------------- bookshelf 1.2 x 0.35 x 2.0
def k_bookshelf():
    fresh()
    oak = mat("oak", "#6A4A33", 0.55, noise=0.15)
    plinth = mat("plinth", "#2E2118", 0.6)
    spines = [mat("spine_brick", "#7A3B2E", 0.7), mat("spine_teal", "#2F4A5A", 0.7),
              mat("spine_olive", "#5C6B4A", 0.7), mat("spine_cream", "#B9AE98", 0.8)]
    rnd = random.Random(11)
    p = [
        box("side_l", (0.03, 0.35, 2.0), (-0.585, 0, 1.0), oak, bevel=0.006),
        box("side_r", (0.03, 0.35, 2.0), (0.585, 0, 1.0), oak, bevel=0.006),
        box("top", (1.2, 0.35, 0.03), (0, 0, 1.985), oak, bevel=0.008),
        box("plinth", (1.14, 0.32, 0.07), (0, -0.01, 0.035), plinth, bevel=0.005),
        box("back_panel", (1.14, 0.01, 1.9), (0, -0.17, 1.02), oak, bevel=0.002),
    ]
    shelf_z = [0.45, 0.83, 1.21, 1.59]
    for z in shelf_z:
        p.append(box("shelf", (1.14, 0.34, 0.025), (0, 0, z), oak, bevel=0.004))
    bottoms = [0.07] + [z + 0.0125 for z in shelf_z]
    tops = [z - 0.0125 for z in shelf_z] + [1.97]
    for b0, b1 in zip(bottoms, tops):
        usable = b1 - b0
        x = -0.555
        x_end = rnd.uniform(0.4, 0.55)
        while x < x_end:
            t = rnd.uniform(0.04, 0.065)
            h = rnd.uniform(0.6, 0.93) * (usable - 0.01)
            d = rnd.uniform(0.2, 0.27)
            yc = -0.16 + d / 2 + rnd.uniform(0.0, 0.02)
            p.append(bx("book", (t, d, h), (x + t / 2, yc, b0 + h / 2), rnd.choice(spines), bevel=0.0012, seg=1))
            x += t + rnd.uniform(0.0, 0.006)
    finish("bookshelf", p)


# ---------------------------------------------------------------- book 0.16 x 0.24 x 0.03
def k_book():
    fresh()
    cover = mat("cover_teal", "#2F4A5A", 0.7)
    pages = mat("pages", "#D9CFBA", 0.85)
    ribbon = mat("ribbon", "#8A3B32", 0.6)
    p = [
        bx("cover_back", (0.16, 0.24, 0.003), (0, 0, 0.0015), cover, bevel=0.001),
        bx("pages", (0.146, 0.23, 0.024), (0.005, 0, 0.015), pages, bevel=0.0008),
        bx("cover_front", (0.16, 0.24, 0.003), (0, 0, 0.0285), cover, bevel=0.001),
        bx("spine", (0.012, 0.24, 0.03), (-0.074, 0, 0.015), cover, bevel=0.002),
        bx("ribbon", (0.006, 0.12, 0.0012), (0.03, -0.06, 0.0306), ribbon, bevel=0.0004),
    ]
    finish("book", p)


# ---------------------------------------------------------------- chess set 0.45 x 0.45 x 0.1
PROFILES = {
    "pawn": [(0, 0), (0.016, 0), (0.016, 0.003), (0.011, 0.006), (0.006, 0.012), (0.006, 0.02),
             (0.0105, 0.024), (0, 0.03)],
    "rook": [(0, 0), (0.017, 0), (0.017, 0.004), (0.012, 0.008), (0.011, 0.012), (0.011, 0.034),
             (0.015, 0.036), (0.015, 0.04), (0, 0.04)],
    "bishop": [(0, 0), (0.016, 0), (0.016, 0.004), (0.010, 0.009), (0.006, 0.016), (0.010, 0.03),
               (0.011, 0.036), (0.007, 0.042), (0.004, 0.047), (0, 0.05)],
    "queen": [(0, 0), (0.018, 0), (0.018, 0.004), (0.011, 0.009), (0.006, 0.02), (0.010, 0.04),
              (0.016, 0.05), (0.012, 0.054), (0.013, 0.057), (0.006, 0.06), (0, 0.06)],
    "king": [(0, 0), (0.018, 0), (0.018, 0.004), (0.011, 0.009), (0.006, 0.02), (0.010, 0.042),
             (0.014, 0.052), (0.009, 0.057), (0.007, 0.06), (0.012, 0.064), (0, 0.066)],
    "knight_base": [(0, 0), (0.017, 0), (0.017, 0.004), (0.011, 0.008), (0.008, 0.016), (0, 0.016)],
}


def k_chess_set():
    fresh()
    board_light = mat("maple", "#CDBB96", 0.45)
    board_dark = mat("walnut_sq", "#4A3322", 0.45)
    ivory = mat("ivory", "#E6DCC6", 0.35)
    ebony = mat("ebony", "#2F2620", 0.35)
    p = [box("board", (0.45, 0.45, 0.028), (0, 0, 0.014), board_light, bevel=0.004)]
    for i in range(8):
        for j in range(8):
            if (i + j) % 2 == 0:  # a1 is dark
                x, y = -0.175 + i * 0.05, -0.175 + j * 0.05
                p.append(bx("sq", (0.05, 0.05, 0.0002), (x, y, 0.0281), board_dark, bevel=0.0))
    files = [-0.175, -0.125, -0.075, -0.025, 0.025, 0.075, 0.125, 0.175]
    z0 = 0.0282
    back = ["rook", "knight", "bishop", "queen", "king", "bishop", "knight", "rook"]
    for side, (m, rank_y, pawn_y) in enumerate(((ivory, -0.175, -0.125), (ebony, 0.175, 0.125))):
        for k, kind in enumerate(back):
            x = files[k]
            if kind == "knight":
                p.append(lathe("knight_base", PROFILES["knight_base"], (x, rank_y, z0), m, segs=10))
                p.append(bx("knight_head", (0.016, 0.03, 0.028), (x, rank_y + 0.005, z0 + 0.03), m,
                            bevel=0.003, rot=(-25, 0, 0)))
            else:
                p.append(lathe(kind, PROFILES[kind], (x, rank_y, z0), m, segs=10))
        for x in files:
            p.append(lathe("pawn", PROFILES["pawn"], (x, pawn_y, z0), m, segs=10))
    # king crosses
    p.append(bx("cross_v", (0.004, 0.004, 0.012), (0.025, -0.175, z0 + 0.072), ivory, bevel=0.0008))
    p.append(bx("cross_h", (0.01, 0.004, 0.004), (0.025, -0.175, z0 + 0.069), ivory, bevel=0.0008))
    p.append(bx("cross_v2", (0.004, 0.004, 0.012), (0.025, 0.175, z0 + 0.072), ebony, bevel=0.0008))
    p.append(bx("cross_h2", (0.01, 0.004, 0.004), (0.025, 0.175, z0 + 0.069), ebony, bevel=0.0008))
    finish("chess_set", p)


# ---------------------------------------------------------------- side table 0.5 x 0.5 x 0.55 (assumed size)
def k_side_table():
    fresh()
    wood_top = mat("wood_top", "#7E5C41", 0.4, noise=0.08)
    wood_base = mat("wood_base", "#5D442F", 0.55)
    p = [
        cyl("top", 0.25, 0.03, (0, 0, 0.535), wood_top, verts=40, bevel=0.008),
        lathe("pedestal", [(0, 0), (0.19, 0), (0.19, 0.012), (0.14, 0.024), (0.035, 0.04), (0.028, 0.07),
                           (0.028, 0.5), (0.04, 0.52), (0, 0.52)], (0, 0, 0), wood_base, segs=20),
    ]
    finish("side_table", p)


# ---------------------------------------------------------------- floor lamp 0.35 x 0.35 x 1.6
def k_floor_lamp():
    fresh()
    brass = mat("brass", "#6E5E45", 0.35, metallic=0.7)
    shade_m = mat("shade_fabric", "#E9DCC0", 0.9, emission="#FFD9A0", emission_strength=3.0)
    bulb_m = mat("bulb", "#FFF1D6", 0.4, emission="#FFE2B0", emission_strength=3.0)
    p = [
        lathe("base", [(0, 0), (0.16, 0), (0.165, 0.008), (0.15, 0.02), (0.09, 0.03), (0, 0.03)],
              (0, 0, 0), brass, segs=24),
        cyl("stem", 0.008, 1.22, (0, 0, 0.64), brass, verts=12, bevel=0.002),
        cyl("socket", 0.02, 0.06, (0, 0, 1.27), brass, verts=16, bevel=0.004),
        lathe("shade", [(0.17, 1.12), (0.12, 1.52), (0.105, 1.53), (0.155, 1.13)], (0, 0, 0), shade_m, segs=24),
        sphere("bulb", 0.035, (0, 0, 1.335), bulb_m, segments=12),
    ]
    finish("floor_lamp", p)


# ---------------------------------------------------------------- phone basket 0.35 x 0.25 x 0.15
def k_phone_basket():
    fresh()
    light = mat("rattan", "#A88956", 0.7, noise=0.1)
    dark = mat("rattan_dk", "#7D6139", 0.75)
    p = [bx("floor", (0.32, 0.22, 0.012), (0, 0, 0.006), light, bevel=0.004, seg=2)]
    rod_z = [0.02, 0.05, 0.08, 0.11, 0.142]
    for side in (1, -1):
        for i in range(10):  # staves on front/back walls
            p.append(bx("stave", (0.012, 0.012, 0.148), (-0.1575 + i * 0.035, side * 0.116, 0.074), dark, bevel=0.002))
        for z in rod_z:  # weaving rods across front/back walls
            p.append(bx("rod", (0.35, 0.012, 0.012), (0, side * 0.122, z), light, bevel=0.003))
        for i in range(6):  # staves on side walls
            p.append(bx("stave", (0.012, 0.012, 0.148), (side * 0.169, -0.1 + i * 0.04, 0.074), dark, bevel=0.002))
        for z in rod_z:
            p.append(bx("rod", (0.012, 0.25, 0.012), (side * 0.175, 0, z), light, bevel=0.003))
    finish("phone_basket", p)


# ---------------------------------------------------------------- rug 2.6 x 1.8 x 0.01
def k_rug():
    fresh()
    base = mat("wool_base", "#7B6A56", 0.95, noise=0.2)
    panel = mat("wool_panel", "#4F5B52", 0.95)
    p = [
        bx("rug_base", (2.6, 1.8, 0.008), (0, 0, 0.004), base, bevel=0.0038, seg=3),
        bx("rug_panel", (2.3, 1.5, 0.002), (0, 0, 0.009), panel, bevel=0.0008, seg=1),
    ]
    finish("rug", p)


# ---------------------------------------------------------------- wall calendar 0.3 x 0.02 x 0.4
def k_calendar():
    fresh()
    board = mat("card", "#D8D0BE", 0.9)
    paper = mat("paper", "#EDE6D6", 0.9)
    photo = mat("photo", "#5E7C84", 0.6, noise=0.2)
    ink = mat("ink", "#7A7466", 0.8)
    wire = mat("wire", "#8E8F92", 0.35, metallic=0.8)
    p = [
        bx("board", (0.3, 0.008, 0.39), (0, -0.004, 0.195), board, bevel=0.002),
        bx("pages", (0.296, 0.004, 0.39), (0, 0.002, 0.195), paper, bevel=0.0008),
        bx("photo", (0.26, 0.0015, 0.17), (0, 0.0047, 0.3), photo, bevel=0.0004),
    ]
    for k in range(6):
        p.append(bx("grid_h", (0.26, 0.0012, 0.0012), (0, 0.0047, 0.02 + k * 0.036), ink, bevel=0.0002))
    for k in range(8):
        p.append(bx("grid_v", (0.0012, 0.0012, 0.18), (-0.13 + k * (0.26 / 7), 0.0047, 0.11), ink, bevel=0.0002))
    p.append(cyl("binding", 0.0035, 0.27, (0, 0.008, 0.392), wire, verts=8, rot=(0, 90, 0), bevel=0.001))
    finish("calendar", p)


# ---------------------------------------------------------------- tv 1.1 x 0.08 x 0.65 (stands on its own foot)
def k_tv():
    fresh()
    body = mat("tv_body", "#202428", 0.5)
    glass = mat("tv_glass", "#0F1419", 0.1)
    foot = mat("tv_foot", "#2A2D31", 0.45)
    p = [
        box("body", (1.1, 0.07, 0.59), (0, -0.02, 0.355), body, bevel=0.012),
        box("glass", (1.04, 0.01, 0.55), (0, 0.02, 0.355), glass, bevel=0.003),
        box("neck", (0.08, 0.04, 0.04), (0, -0.03, 0.04), foot, bevel=0.004),
        box("foot_plate", (0.42, 0.07, 0.02), (0, -0.02, 0.01), foot, bevel=0.005),
    ]
    finish("tv", p)


# ---------------------------------------------------------------- tv stand 1.4 x 0.4 x 0.5
def k_tv_stand():
    fresh()
    wood = mat("stand_wood", "#6B4E36", 0.55, noise=0.1)
    door = mat("stand_door", "#8C6B4C", 0.5, noise=0.1)
    metal = mat("stand_metal", "#5A5650", 0.4, metallic=0.6)
    leg = mat("stand_leg", "#2A231E", 0.6)
    p = [
        box("top", (1.4, 0.4, 0.03), (0, 0, 0.485), wood, bevel=0.008),
        box("side_l", (0.03, 0.4, 0.455), (-0.685, 0, 0.2575), wood, bevel=0.006),
        box("side_r", (0.03, 0.4, 0.455), (0.685, 0, 0.2575), wood, bevel=0.006),
        box("bottom", (1.34, 0.4, 0.02), (0, 0, 0.04), wood, bevel=0.004),
        box("back", (1.34, 0.01, 0.42), (0, -0.195, 0.26), wood, bevel=0.002),
    ]
    for x in (-0.45, 0.0, 0.45):
        p.append(box("door", (0.43, 0.015, 0.4), (x, 0.2075, 0.27), door, bevel=0.006))
    for x in (-0.285, 0.165, 0.285):
        p.append(cyl("handle", 0.006, 0.1, (x, 0.222, 0.27), metal, verts=12, bevel=0.002))
    for x in (-0.64, 0.64):
        for y in (-0.15, 0.15):
            p.append(cyl("foot", 0.02, 0.03, (x, y, 0.015), leg, verts=12, bevel=0.003))
    finish("tv_stand", p)


# ---------------------------------------------------------------- photo album 0.3 x 0.24 x 0.05
def k_photo_album():
    fresh()
    leather = mat("album_leather", "#5B4331", 0.7, noise=0.08)
    pages = mat("album_pages", "#E2D9C4", 0.85)
    photo = mat("album_photo", "#9C8A74", 0.5)
    p = [
        box("cover_bottom", (0.3, 0.24, 0.01), (0, 0, 0.005), leather, bevel=0.003),
        box("cover_top", (0.3, 0.24, 0.01), (0, 0, 0.045), leather, bevel=0.003),
        box("spine", (0.02, 0.24, 0.05), (-0.14, 0, 0.025), leather, bevel=0.003),
        box("pages", (0.28, 0.22, 0.03), (0.01, 0, 0.025), pages, bevel=0.0015),
        box("photo", (0.13, 0.17, 0.0015), (0.03, 0, 0.05075), photo, bevel=0.0005),
    ]
    finish("photo_album", p)


KITS = [
    ("armchair", k_armchair), ("sofa", k_sofa), ("coffee_table", k_coffee_table), ("bookshelf", k_bookshelf),
    ("book", k_book), ("chess_set", k_chess_set), ("side_table", k_side_table), ("floor_lamp", k_floor_lamp),
    ("phone_basket", k_phone_basket), ("rug", k_rug), ("calendar", k_calendar), ("tv", k_tv),
    ("tv_stand", k_tv_stand), ("photo_album", k_photo_album),
]

for _name, _fn in KITS:
    try:
        _fn()
    except Exception:
        print(f"KIT FAILED {_name}", flush=True)
        traceback.print_exc()
