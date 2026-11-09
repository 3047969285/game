"""Device and everyday-object prop kits for the Unit 1 textbook scenes (20 kits).

Run inside Blender 4.5:
    /Applications/Blender.app/Contents/MacOS/Blender -b -P Tools/props/kit_devices.py
Each kit: reset() -> build parts -> finish(kit, parts) -> SourceArt/Props/SM_<kit>.fbx + preview PNG.
"""
import math
import os
import sys
import traceback

import bpy
import bmesh
from mathutils import Vector

_HERE = (os.path.dirname(os.path.abspath(__file__)) if "__file__" in globals()
         else "/Users/shoudaodefengge/项目/.claude/worktrees/game-memory/手机游戏/word-quest-ue/Tools/props")
if _HERE not in sys.path:
    sys.path.insert(0, _HERE)

import kit_common as kc  # noqa: E402
from kit_common import reset, mat, box, cyl, sphere, rounded_slab, finish  # noqa: E402

GLOW = "#9FC4E8"


def glass(role="screen"):
    """Dark glass that glows faintly."""
    return mat(role, "#0A0F18", 0.05, emission=GLOW, emission_strength=1.5)


def cylz(name, r, depth, loc, material, verts=24, rot=(0, 0, 0)):
    """Cylinder without bevel (cheap, for keys/buttons/lenses)."""
    return cyl(name, r, depth, loc, material, verts=verts, rot=rot, bevel=0.0)


def ring(name, major, minor, loc, material, rot=(0, 0, 0), seg=12, minseg=6, sy=1.0):
    bpy.ops.mesh.primitive_torus_add(major_segments=seg, minor_segments=minseg, major_radius=major,
                                     minor_radius=minor, location=loc,
                                     rotation=[math.radians(a) for a in rot])
    o = bpy.context.active_object
    o.name = name
    if sy != 1.0:
        o.scale = (1.0, sy, 1.0)
    kc._assign(o, material)
    return o


def cone(name, r_bottom, r_top, depth, loc, material, verts=28):
    bpy.ops.mesh.primitive_cone_add(vertices=verts, radius1=r_bottom, radius2=r_top, depth=depth, location=loc)
    o = bpy.context.active_object
    o.name = name
    kc._assign(o, material)
    return o


def prism(name, pts, z0, z1, material, bevel=0.002):
    """Convex polygon of (x, y) points in CCW order, extruded from z0 to z1."""
    me = bpy.data.meshes.new(name)
    bm = bmesh.new()
    bot = [bm.verts.new((x, y, z0)) for x, y in pts]
    top = [bm.verts.new((x, y, z1)) for x, y in pts]
    bm.faces.new(bot[::-1])
    bm.faces.new(top)
    n = len(pts)
    for i in range(n):
        j = (i + 1) % n
        bm.faces.new((bot[i], bot[j], top[j], top[i]))
    bmesh.ops.recalc_face_normals(bm, faces=bm.faces[:])
    bm.to_mesh(me)
    bm.free()
    o = bpy.data.objects.new(name, me)
    bpy.context.collection.objects.link(o)
    kc._assign(o, material)
    kc._bevel(o, min(bevel, (z1 - z0) * 0.4))
    return o


# ---------------------------------------------------------------- devices

def screen_glass(role="screen"):
    """Screen base: near-black glass with a faint glow (review: screens read pale)."""
    return mat(role, "#0A0E14", 0.15, emission=GLOW, emission_strength=0.6)


def ui_strip(role="screen_ui"):
    """Slightly brighter inset strip on a screen, reads as UI."""
    return mat(role, "#0A0E14", 0.15, emission=GLOW, emission_strength=1.8)


def k_phone():
    frame = mat("phone_frame", "#C9CED6", 0.3, metallic=1.0)
    lens = mat("phone_lens", "#111418", 0.2)
    scr = screen_glass("phone_screen")
    ui = ui_strip("phone_ui")
    return [
        rounded_slab("phone_body", (0.075, 0.155, 0.0085), (0, 0, 0.00425), frame, radius=0.003),
        box("phone_glass", (0.068, 0.148, 0.0005), (0, 0, 0.00875), scr, bevel=0.0),
        box("phone_ui_top", (0.054, 0.007, 0.0002), (0, 0.062, 0.00915), ui, bevel=0.0),
        box("phone_ui_list", (0.044, 0.020, 0.0002), (0, 0.030, 0.00915), ui, bevel=0.0),
        cylz("phone_cam", 0.0012, 0.0006, (0, 0.0758, 0.00865), lens, verts=12),
    ]


def k_tablet():
    frame = mat("tablet_frame", "#8E949C", 0.3, metallic=1.0)
    lens = mat("tablet_lens", "#111418", 0.2)
    scr = screen_glass("tablet_screen")
    ui = ui_strip("tablet_ui")
    return [
        rounded_slab("tablet_body", (0.18, 0.25, 0.0075), (0, 0, 0.00375), frame, radius=0.004),
        box("tablet_glass", (0.164, 0.234, 0.0005), (0, 0, 0.00775), scr, bevel=0.0),
        box("tablet_ui_bar", (0.140, 0.014, 0.0002), (0, 0.098, 0.00815), ui, bevel=0.0),
        box("tablet_ui_list", (0.120, 0.008, 0.0002), (0, 0.072, 0.00815), ui, bevel=0.0),
        cylz("tablet_cam", 0.0013, 0.0006, (0, 0.1205, 0.0072), lens, verts=12),
    ]


def k_laptop():
    """Opened to ~110 degrees (lid tilted 20 deg back from vertical)."""
    alu = mat("laptop_alu", "#B9BEC6", 0.35, metallic=1.0)
    dark = mat("laptop_dark", "#2A2E36", 0.5)
    key = mat("laptop_key", "#353A43", 0.55)
    scr = screen_glass("laptop_screen_glass")
    ui = ui_strip("laptop_ui")
    lid_angle = math.radians(20.0)
    hinge = Vector((0.0, -0.11, 0.014))
    d = Vector((0.0, -math.sin(lid_angle), math.cos(lid_angle)))   # lid direction from hinge
    n = Vector((0.0, math.cos(lid_angle), math.sin(lid_angle)))    # lid normal, front faces +Y
    up = Vector((0.0, -math.sin(lid_angle), math.cos(lid_angle)))  # screen "up" direction
    L, t = 0.215, 0.008
    c = hinge + d * (L / 2) + n * 0.0
    parts = [
        rounded_slab("laptop_base", (0.32, 0.22, 0.014), (0, 0, 0.007), alu, radius=0.006),
        box("laptop_deck", (0.27, 0.10, 0.001), (0, 0.0, 0.0145), dark, bevel=0.0),
        box("laptop_trackpad", (0.10, 0.05, 0.0008), (0, 0.075, 0.0151), dark, bevel=0.0),
        cylz("laptop_hinge", 0.0035, 0.30, (0, -0.11, 0.014), dark, verts=10, rot=(0, 90, 0)),
        box("laptop_lid", (0.32, t, L), tuple(c), alu, bevel=0.002, rot=(math.degrees(lid_angle), 0, 0)),
    ]
    scr_c = c + n * (t / 2 + 0.0003)
    parts.append(box("laptop_screen", (0.29, 0.0006, 0.19), tuple(scr_c), scr,
                     bevel=0.0, rot=(math.degrees(lid_angle), 0, 0)))
    for j, (v, w_s) in enumerate(((0.072, 0.24), (0.040, 0.16), (-0.030, 0.20))):
        p = scr_c + n * 0.0004 + up * v
        parts.append(box(f"laptop_ui{j}", (w_s, 0.0002, 0.012), tuple(p), ui,
                         bevel=0.0, rot=(math.degrees(lid_angle), 0, 0)))
    for r, y in enumerate([-0.034, -0.0115, 0.011, 0.0335]):
        for col in range(12):
            x = (col - 5.5) * 0.0225
            parts.append(cylz(f"laptop_key_{r}_{col}", 0.0085, 0.0025, (x, y, 0.01625), key, verts=8))
    return parts


def k_keyboard():
    body = mat("kb_body", "#2B2F36", 0.5)
    key = mat("kb_key", "#3E444E", 0.45)
    parts = [rounded_slab("kb_body", (0.44, 0.14, 0.024), (0, 0, 0.012), body, radius=0.008)]
    for r, y in enumerate([-0.039, -0.013, 0.013, 0.039]):
        for col in range(14):
            if r == 0 and 4 <= col <= 9:          # space bar sits in this row
                continue
            x = (col - 6.5) * 0.0275
            parts.append(cylz(f"kb_key_{r}_{col}", 0.0095, 0.005, (x, y, 0.0265), key, verts=8))
    parts.append(box("kb_space", (0.16, 0.02, 0.004), (0, -0.039, 0.026), key, bevel=0.0))
    return parts


def k_monitor():
    bez = mat("monitor_bezel", "#1E2228", 0.4)
    stand = mat("monitor_stand", "#2E333B", 0.45)
    scr = screen_glass("monitor_screen_glass")
    ui = ui_strip("monitor_ui")
    parts = [
        rounded_slab("monitor_foot", (0.22, 0.20, 0.02), (0, 0, 0.01), stand, radius=0.01),
        box("monitor_neck", (0.05, 0.03, 0.12), (0, -0.03, 0.08), stand, bevel=0.004),
        rounded_slab("monitor_panel", (0.55, 0.025, 0.31), (0, -0.03, 0.295), bez, radius=0.01),
        box("monitor_screen", (0.52, 0.001, 0.28), (0, -0.0170, 0.295), scr, bevel=0.0),
        box("monitor_ui_top", (0.46, 0.0002, 0.022), (0, -0.0163, 0.40), ui, bevel=0.0),
        box("monitor_ui_side", (0.30, 0.0002, 0.035), (0, -0.0163, 0.30), ui, bevel=0.0),
    ]
    return parts


def k_headphones():
    plast = mat("hp_plastic", "#1E2024", 0.4)
    pad = mat("hp_pad", "#3A3D44", 0.7)
    accent = mat("hp_accent", "#D9DDE3", 0.3, metallic=0.8)
    a, zc, b = 0.085, 0.10, 0.12
    pts = [(a * math.cos(math.pi * i / 16), zc + b * math.sin(math.pi * i / 16)) for i in range(17)]
    parts = []
    for i in range(16):
        (x0, z0), (x1, z1) = pts[i], pts[i + 1]
        seg = Vector((x1 - x0, 0.0, z1 - z0))
        length = seg.length
        mid = ((x0 + x1) / 2, 0.0, (z0 + z1) / 2)
        e = seg.normalized().to_track_quat("Z", "Y").to_euler()
        parts.append(cylz(f"hp_band_{i}", 0.0045, length * 1.02, mid, plast, verts=8,
                          rot=tuple(math.degrees(v) for v in e)))
    for side, x in (("r", a), ("l", -a)):
        parts.append(cyl(f"hp_cup_{side}", 0.05, 0.03, (x, 0, 0.05), plast, verts=24, rot=(0, 90, 0), bevel=0.0))
        parts.append(cyl(f"hp_pad_{side}", 0.038, 0.012, (x - math.copysign(0.02, x), 0, 0.05), pad,
                         verts=20, rot=(0, 90, 0), bevel=0.0))
        parts.append(cyl(f"hp_logo_{side}", 0.02, 0.002, (math.copysign(0.1005, x), 0, 0.05), accent,
                         verts=20, rot=(0, 90, 0), bevel=0.0))
    return parts


def k_game_console():
    body = mat("gc_body", "#2D3340", 0.45)
    grip = mat("gc_grip", "#E0523A", 0.5)
    scr = mat("gc_screen", "#0E1116", 0.08)
    btn = mat("gc_button", "#1A1D23", 0.4)
    return [
        rounded_slab("gc_body", (0.14, 0.08, 0.024), (0, 0, 0.012), body, radius=0.008),
        rounded_slab("gc_grip_l", (0.02, 0.08, 0.03), (-0.07, 0, 0.015), grip, radius=0.008),
        rounded_slab("gc_grip_r", (0.02, 0.08, 0.03), (0.07, 0, 0.015), grip, radius=0.008),
        box("gc_screen", (0.11, 0.055, 0.0004), (0, 0, 0.0242), scr, bevel=0.0),
        box("gc_dpad_a", (0.01, 0.003, 0.001), (-0.07, 0.0, 0.0310), btn, bevel=0.0),
        box("gc_dpad_b", (0.003, 0.01, 0.001), (-0.07, 0.0, 0.0310), btn, bevel=0.0),
        cylz("gc_btn_a", 0.0035, 0.002, (0.07, -0.010, 0.0305), btn, verts=12),
        cylz("gc_btn_b", 0.0035, 0.002, (0.07, 0.010, 0.0305), btn, verts=12),
    ]


def k_wifi_router():
    body = mat("router_body", "#EDEFF2", 0.5)
    ant = mat("router_antenna", "#1F2329", 0.4)
    led = mat("router_led", "#7CFFB2", 0.3, emission="#7CFFB2", emission_strength=2.0)
    parts = [rounded_slab("router_body", (0.22, 0.14, 0.024), (0, 0, 0.012), body, radius=0.012)]
    tilt = math.radians(25.0)
    dirv = Vector((0.0, -math.sin(tilt), math.cos(tilt)))
    for side, sx in (("l", -0.085), ("r", 0.085)):
        base = Vector((sx, -0.058, 0.024))
        c = base + dirv * 0.01
        parts.append(cyl(f"router_antenna_{side}", 0.0035, 0.02, tuple(c), ant, verts=10,
                         rot=(25, 0, 0), bevel=0.0))
    for i, x in enumerate((-0.06, -0.02, 0.02, 0.06)):
        parts.append(cylz(f"router_led_{i}", 0.0025, 0.001, (x, 0.05, 0.0245), led, verts=12))
    return parts


def k_coffee_cup():
    cer = mat("cup_ceramic", "#F4F1EC", 0.25)
    stripe = mat("cup_stripe", "#2A9D8F", 0.3)
    coffee = mat("cup_coffee", "#3E2415", 0.2)
    return [
        cyl("cup_body", 0.042, 0.1, (0, 0, 0.05), cer, verts=32, bevel=0.003),
        cylz("cup_stripe", 0.0425, 0.02, (0, 0, 0.03), stripe, verts=32),
        cylz("cup_coffee", 0.040, 0.002, (0, 0, 0.1005), coffee, verts=32),
        ring("cup_rim", 0.0415, 0.003, (0, 0, 0.1), cer, seg=32, minseg=8),
        # handle protrudes ~0.011 m past the wall; outer x = 0.0525
        ring("cup_handle", 0.0215, 0.0045, (0.0265, 0, 0.05), cer, rot=(90, 0, 0), seg=16, minseg=8, sy=1.8),
    ]


def _inset(pts, f):
    cx = sum(p[0] for p in pts) / len(pts)
    cy = sum(p[1] for p in pts) / len(pts)
    return [(cx + (x - cx) * f, cy + (y - cy) * f) for x, y in pts]


def k_sandwich_plate():
    plate = mat("plate_ceramic", "#F7F5F0", 0.2)
    bread = mat("sandwich_bread", "#E7B76A", 0.7)
    filling = mat("sandwich_filling", "#7FB36A", 0.6)
    parts = [cyl("plate", 0.12, 0.012, (0, 0, 0.006), plate, verts=40, bevel=0.003)]
    triangles = [
        [(-0.105, -0.05), (-0.005, -0.05), (-0.055, 0.05)],
        [(0.005, -0.05), (0.105, -0.05), (0.055, 0.05)],
    ]
    for i, t in enumerate(triangles):
        parts.append(prism(f"sandwich_bread_bot_{i}", t, 0.012, 0.030, bread))
        parts.append(prism(f"sandwich_filling_{i}", _inset(t, 0.92), 0.030, 0.038, filling))
        parts.append(prism(f"sandwich_bread_top_{i}", t, 0.038, 0.062, bread))
    return parts


def k_coupon_card():
    paper = mat("coupon_paper", "#F7D154", 0.5)
    band = mat("coupon_band", "#E4572E", 0.45)
    ink = mat("coupon_ink", "#1F2430", 0.6)
    return [
        rounded_slab("coupon_body", (0.09, 0.055, 0.0026), (0, 0, 0.0013), paper, radius=0.002),
        box("coupon_band", (0.08, 0.012, 0.0004), (0, 0.012, 0.0028), band, bevel=0.0),
        box("coupon_code", (0.03, 0.01, 0.0002), (-0.025, -0.015, 0.0029), ink, bevel=0.0),
    ]


def k_notebook():
    cover = mat("notebook_cover", "#2D6A9F", 0.5)
    pages = mat("notebook_pages", "#FBFAF5", 0.85)
    wire = mat("notebook_wire", "#C9CED6", 0.3, metallic=1.0)
    parts = [
        rounded_slab("notebook_bottom", (0.18, 0.24, 0.003), (0, 0, 0.0015), cover, radius=0.003),
        box("notebook_pages", (0.172, 0.232, 0.009), (0, 0, 0.0075), pages, bevel=0.003),
        rounded_slab("notebook_top", (0.18, 0.24, 0.003), (0, 0, 0.0135), cover, radius=0.003),
    ]
    for i in range(11):
        y = -0.10 + i * 0.02
        parts.append(ring(f"notebook_coil_{i}", 0.0065, 0.0012, (-0.088, y, 0.0075), wire,
                          rot=(90, 0, 0), seg=10, minseg=6))
    return parts


def k_desk_lamp():
    metal = mat("lamp_metal", "#3C4048", 0.35, metallic=0.6)
    shade = mat("lamp_shade", "#E9E4D8", 0.7)
    bulb = mat("lamp_bulb", "#FFF1D6", 0.4, emission="#FFD59A", emission_strength=8.0)
    return [
        cyl("lamp_base", 0.1, 0.015, (0, 0, 0.0075), metal, verts=40, bevel=0.003),
        cylz("lamp_arm", 0.008, 0.405, (0, 0, 0.2175), metal, verts=16),
        sphere("lamp_joint", 0.012, (0, 0, 0.03), metal, segments=16),
        cone("lamp_shade", 0.1, 0.035, 0.09, (0, 0, 0.40), shade, verts=28),
        sphere("lamp_bulb", 0.028, (0, 0, 0.335), bulb, segments=16),
    ]


def k_dashboard_screen():
    bez = mat("dash_bezel", "#1A1D23", 0.4)
    parts = [
        rounded_slab("dash_panel", (0.6, 0.03, 0.35), (0, 0, 0.175), bez, radius=0.012),
        box("dash_screen", (0.56, 0.001, 0.30), (0, 0.0155, 0.175), glass(), bevel=0.0),
    ]
    return parts


def k_document_stack():
    paper = mat("doc_paper", "#F4F1EA", 0.85)
    manila = mat("doc_folder", "#D7B56D", 0.8)
    parts = [box("doc_folder", (0.22, 0.30, 0.002), (0, 0, 0.001), manila, bevel=0.0005)]
    sheets = [(0.002, -0.002, 0.8), (-0.003, 0.002, -1.2), (0.001, 0.003, 0.6),
              (-0.002, -0.001, -0.5), (0.003, 0.001, 1.0)]
    for i, (dx, dy, yaw) in enumerate(sheets):
        z0 = 0.002 + i * 0.0076
        parts.append(box(f"doc_sheet_{i}", (0.21, 0.29, 0.0076), (dx, dy, z0 + 0.0038), paper,
                         bevel=0.0008, rot=(0, 0, yaw)))
    return parts


def k_recipe_book():
    cover = mat("recipe_cover", "#B5472F", 0.55)
    label = mat("recipe_label", "#F4EBD0", 0.6)
    spine = mat("recipe_spine", "#7A2E1E", 0.5)
    return [
        rounded_slab("recipe_cover", (0.2, 0.26, 0.03), (0, 0, 0.015), cover, radius=0.008),
        box("recipe_spine", (0.012, 0.26, 0.0305), (-0.094, 0, 0.01525), spine, bevel=0.002),
        box("recipe_label", (0.12, 0.15, 0.0006), (0.01, 0, 0.0303), label, bevel=0.0),
    ]


def k_jar():
    amber = mat("jar_glass", "#E3A03A", 0.15)
    lid = mat("jar_lid", "#B8BEC6", 0.3, metallic=1.0)
    label = mat("jar_label", "#F4EBD0", 0.6)
    return [
        cyl("jar_body", 0.06, 0.16, (0, 0, 0.08), amber, verts=40, bevel=0.005),
        cyl("jar_lid", 0.0525, 0.02, (0, 0, 0.17), lid, verts=40, bevel=0.002),
        cylz("jar_label", 0.0605, 0.06, (0, 0, 0.08), label, verts=40),
    ]


def k_duster():
    felt = mat("duster_felt", "#7D8B9C", 0.95)
    wood = mat("duster_wood", "#9C6B3E", 0.55)
    return [
        rounded_slab("duster_felt", (0.14, 0.06, 0.024), (0, 0, 0.012), felt, radius=0.008),
        rounded_slab("duster_handle", (0.12, 0.03, 0.026), (0, 0, 0.037), wood, radius=0.007),
    ]


def k_textbook_stack():
    pages = mat("textbook_pages", "#F3EEDF", 0.8)
    covers = ["#2F6DB5", "#B5472F", "#3E8E5E", "#E2B93B"]
    x_off = [0.0, -0.004, 0.003, -0.002]
    yaw = [1.5, -2.0, 1.0, -1.2]
    parts = []
    for i, col in enumerate(covers):
        z = i * 0.045
        m = mat(f"textbook_cover_{i}", col, 0.55)
        parts.append(box(f"textbook_{i}", (0.22, 0.295, 0.045), (x_off[i], 0, z + 0.0225), m,
                         bevel=0.003, rot=(0, 0, yaw[i])))
        parts.append(box(f"textbook_pages_{i}", (0.2, 0.004, 0.038), (x_off[i], 0.1465, z + 0.0225), pages,
                         bevel=0.0, rot=(0, 0, yaw[i])))
    return parts


def k_school_bag():
    fabric = mat("bag_fabric", "#2F7D6D", 0.8)
    strap = mat("bag_strap", "#2B2F36", 0.7)
    zip_m = mat("bag_zip", "#B8BEC6", 0.3, metallic=1.0)
    return [
        rounded_slab("bag_body", (0.30, 0.15, 0.40), (0, 0, 0.20), fabric, radius=0.03),
        rounded_slab("bag_pocket", (0.22, 0.02, 0.16), (0, 0.085, 0.12), fabric, radius=0.01),
        box("bag_side_l", (0.02, 0.10, 0.20), (-0.16, 0, 0.20), fabric, bevel=0.006),
        box("bag_side_r", (0.02, 0.10, 0.20), (0.16, 0, 0.20), fabric, bevel=0.006),
        box("bag_strap_l", (0.04, 0.02, 0.34), (-0.07, -0.085, 0.22), strap, bevel=0.006),
        box("bag_strap_r", (0.04, 0.02, 0.34), (0.07, -0.085, 0.22), strap, bevel=0.006),
        box("bag_handle", (0.10, 0.03, 0.02), (0, 0, 0.41), strap, bevel=0.006),
        box("bag_zip", (0.24, 0.004, 0.004), (0, 0.0762, 0.33), zip_m, bevel=0.001),
    ]


KITS = [
    ("phone", k_phone), ("tablet", k_tablet), ("laptop", k_laptop), ("keyboard", k_keyboard),
    ("monitor", k_monitor), ("headphones", k_headphones), ("game_console", k_game_console),
    ("wifi_router", k_wifi_router), ("coffee_cup", k_coffee_cup), ("sandwich_plate", k_sandwich_plate),
    ("coupon_card", k_coupon_card), ("notebook", k_notebook), ("desk_lamp", k_desk_lamp),
    ("dashboard_screen", k_dashboard_screen), ("document_stack", k_document_stack),
    ("recipe_book", k_recipe_book), ("jar", k_jar), ("duster", k_duster),
    ("textbook_stack", k_textbook_stack), ("school_bag", k_school_bag),
]


def main():
    only = {k for k in os.environ.get("KITS", "").split(",") if k}
    for name, build in KITS:
        if only and name not in only:
            continue
        try:
            kc._MATS.clear()   # kit_common caches materials; a factory reset deletes them
            reset()
            parts = build()
            finish(name, parts)
        except Exception:
            print(f"KIT FAILED {name}", flush=True)
            traceback.print_exc()


main()
