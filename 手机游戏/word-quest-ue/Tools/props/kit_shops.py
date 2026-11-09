"""Shop / office / cafe prop kits for the Unit 1 textbook scenes (Blender 4.5).

Run:  "$B" -b -P Tools/props/kit_shops.py      (B = /Applications/Blender.app/Contents/MacOS/Blender)

Each kit: begin(kit) -> build parts -> finish(kit, parts). Front faces +Y, origin at floor centre,
sizes follow the "size" [w, d, h] of Content/Data/memory/textbook_scenes/unit01.json.
"""
import math
import os
import random
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
if HERE not in sys.path:
    sys.path.insert(0, HERE)

import bmesh
import bpy
import mathutils
import kit_common as kc
from kit_common import box, cyl, sphere, finish


def mat(role, color, roughness=0.6, metallic=0.0, emission=None, strength=0.0):
    return kc.mat(role, color, roughness, metallic, emission, strength)


def begin(kit):
    kc._MATS.clear()          # cached materials are destroyed by the factory reset
    kc.reset()


def seg(name, a, b, r, material, verts=8):
    """Thin cylinder from point a to point b (rope segments)."""
    a = mathutils.Vector(a)
    b = mathutils.Vector(b)
    d = b - a
    bpy.ops.mesh.primitive_cylinder_add(vertices=verts, radius=r, depth=d.length, location=(a + b) / 2)
    o = bpy.context.active_object
    o.name = name
    o.rotation_euler = d.to_track_quat("Z", "Y").to_euler()
    o.data.materials.append(material)
    return o


def star(name, cx, cz, ro, ri, y0, thick, material):
    """Flat five-point star in the XZ plane, extruded along +Y from y0."""
    me = bpy.data.meshes.new(name)
    ob = bpy.data.objects.new(name, me)
    bpy.context.collection.objects.link(ob)
    bm = bmesh.new()
    pts = []
    for i in range(10):
        ang = math.pi / 2 + i * math.pi / 5
        r = ro if i % 2 == 0 else ri
        pts.append(bm.verts.new((cx + r * math.cos(ang), y0, cz + r * math.sin(ang))))
    pts.reverse()             # clockwise in XZ so the cap normal faces +Y
    face = bm.faces.new(pts)
    res = bmesh.ops.extrude_face_region(bm, geom=[face])
    new_verts = [e for e in res["geom"] if isinstance(e, bmesh.types.BMVert)]
    bmesh.ops.translate(bm, verts=new_verts, vec=(0, thick, 0))
    bm.to_mesh(me)
    bm.free()
    me.materials.append(material)
    return ob


def qr_black(n, seed):
    """Module grid of a QR-like code: three finder squares, timing lines, seeded random data."""
    rnd = random.Random(seed)
    g = [[rnd.random() < 0.5 for _ in range(n)] for _ in range(n)]

    def finder(r0, c0):
        for i in range(-1, 8):
            for j in range(-1, 8):
                r, c = r0 + i, c0 + j
                if 0 <= r < n and 0 <= c < n:
                    inside = 0 <= i <= 6 and 0 <= j <= 6
                    g[r][c] = inside and (i in (0, 6) or j in (0, 6) or (2 <= i <= 4 and 2 <= j <= 4))

    finder(0, 0)
    finder(0, n - 7)
    finder(n - 7, 0)
    for k in range(8, n - 8):
        g[6][k] = (k % 2 == 0)
        g[k][6] = (k % 2 == 0)
    return [(r, c) for r in range(n) for c in range(n) if g[r][c]]


def qr_mesh(name, cx, cz, size, y, n, seed, material):
    """One flat mesh of black modules on the plane y, facing +Y."""
    bm = bmesh.new()
    m = size / n
    for r, c in qr_black(n, seed):
        x0 = cx - size / 2 + c * m
        z0 = cz + size / 2 - (r + 1) * m
        x1, z1 = x0 + m, z0 + m
        bm.faces.new([bm.verts.new((x0, y, z0)), bm.verts.new((x0, y, z1)),
                      bm.verts.new((x1, y, z1)), bm.verts.new((x1, y, z0))])
    me = bpy.data.meshes.new(name)
    bm.to_mesh(me)
    bm.free()
    me.materials.append(material)
    ob = bpy.data.objects.new(name, me)
    bpy.context.collection.objects.link(ob)
    return ob


def qr_block(prefix, cx, cz, y, size, n, seed, white, black):
    """White quiet-zone plate with black modules, both lying on the front plane y."""
    plate = box(f"{prefix}_plate", (size + 0.02, 0.002, size + 0.02), (cx, y + 0.001, cz), white, bevel=0.0)
    return [plate, qr_mesh(f"{prefix}_cells", cx, cz, size, y + 0.0025, n, seed, black)]


# ---------------------------------------------------------------- kits

def travel_counter():
    begin("travel_counter")
    body = mat("counter_body", "#2B4C7E", 0.55)
    top = mat("counter_top", "#E8E2D0", 0.4)
    yellow = mat("paper_yellow", "#F2A900", 0.5)
    red = mat("paper_red", "#D9413A", 0.5)
    green = mat("paper_green", "#3DA35D", 0.5)
    screen = mat("monitor_screen", "#1B3A5C", 0.2, emission="#6FB7FF", strength=0.6)
    parts = [
        box("body", (2.2, 0.6, 0.78), (0, 0, 0.39), body),
        box("top", (2.2, 0.7, 0.04), (0, 0, 0.80), top),
        box("front_strip", (2.1, 0.02, 0.5), (0, 0.31, 0.40), yellow),
        box("slot_block", (1.0, 0.1, 0.12), (0.4, 0.2, 0.88), top),
        box("monitor_foot", (0.18, 0.14, 0.012), (-0.6, -0.15, 0.826), body),
        cyl("monitor_stem", 0.012, 0.068, (-0.6, -0.15, 0.866), body),
        box("monitor_screen", (0.36, 0.03, 0.2), (-0.6, -0.15, 0.95), screen),
    ]
    for i, (x, col) in enumerate([(0.0, yellow), (0.2, red), (0.4, green), (0.6, red), (0.8, yellow)]):
        parts.append(box(f"brochure{i}", (0.16, 0.012, 0.14), (x, 0.2, 0.96), col, bevel=0.002))
    finish("travel_counter", parts)


def brochure_rack():
    begin("brochure_rack")
    metal = mat("wire_metal", "#B8BEC6", 0.3, metallic=0.9)
    cols = [mat("brochure_red", "#E0523B", 0.6), mat("brochure_yellow", "#F2B33D", 0.6),
            mat("brochure_teal", "#3B8EA5", 0.6), mat("brochure_green", "#7BB662", 0.6)]
    parts = []
    for x in (-0.28, 0.28):
        for y in (-0.13, 0.13):
            parts.append(cyl("post", 0.011, 1.4, (x, y, 0.7), metal, verts=12))
    for t, z in enumerate((0.03, 0.43, 0.83, 1.13)):
        parts.append(box("tier", (0.6, 0.28, 0.012), (0, 0, z + 0.006), metal))
        parts.append(box("lip", (0.6, 0.012, 0.05), (0, 0.14, z + 0.025), metal))
        for k, x in enumerate((-0.22, -0.075, 0.075, 0.22)):
            parts.append(box("brochure", (0.13, 0.01, 0.2), (x, 0.0, z + 0.112), cols[(k + t) % 4],
                             bevel=0.002, rot=(-12, 0, 0)))
    finish("brochure_rack", parts)


def resort_poster():
    begin("resort_poster")
    frame = mat("frame_wood", "#3A2A1E", 0.45)
    sky = mat("print_sky", "#7EC8E3", 0.6)
    sea = mat("print_sea", "#1F7A9C", 0.6)
    sand = mat("print_sand", "#E9C46A", 0.7)
    sun = mat("print_sun", "#F4A261", 0.6)
    parts = [
        box("frame_top", (0.7, 0.03, 0.05), (0, 0, 0.975), frame),
        box("frame_bottom", (0.7, 0.03, 0.05), (0, 0, 0.025), frame),
        box("frame_left", (0.05, 0.03, 0.9), (-0.325, 0, 0.5), frame),
        box("frame_right", (0.05, 0.03, 0.9), (0.325, 0, 0.5), frame),
        box("backboard", (0.6, 0.01, 0.9), (0, -0.008, 0.5), frame, bevel=0.0),
        box("print_sky", (0.6, 0.004, 0.4), (0, 0.0135, 0.7), sky, bevel=0.0),
        box("print_sea", (0.6, 0.004, 0.2), (0, 0.0135, 0.4), sea, bevel=0.0),
        box("print_sand", (0.6, 0.004, 0.25), (0, 0.0135, 0.175), sand, bevel=0.0),
        cyl("print_sun", 0.09, 0.004, (0.14, 0.0135, 0.72), sun, rot=(90, 0, 0), bevel=0.0),
    ]
    finish("resort_poster", parts)


def review_panel():
    begin("review_panel")
    body = mat("panel_body", "#1B2330", 0.5)
    screen = mat("panel_screen", "#9FC4E8", 0.3, emission="#9FC4E8", strength=1.0)
    gold = mat("star_gold", "#F2B705", 0.3, metallic=0.3)
    parts = [
        box("body", (1.0, 0.026, 0.68), (0, 0, 0.36), body, bevel=0.003),
        box("screen", (0.92, 0.002, 0.6), (0, 0.0125, 0.36), screen, bevel=0.0),
    ]
    for i, x in enumerate((-0.36, -0.18, 0.0, 0.18, 0.36)):
        parts.append(star(f"star{i}", x, 0.36, 0.045, 0.02, 0.0135, 0.003, gold))
    finish("review_panel", parts)


def bank_counter():
    begin("bank_counter")
    counter = mat("counter_body", "#D9D4C7", 0.6)
    top = mat("counter_top", "#6B4F3A", 0.4)
    brass = mat("brass", "#B5893C", 0.3, metallic=1.0)
    glass = mat("glass", "#A9CCDB", 0.08)
    slot = mat("slot_red", "#C0392B", 0.5)
    parts = [
        box("body", (3.0, 0.6, 0.8), (0, 0, 0.4), counter),
        box("top", (3.0, 0.7, 0.03), (0, 0, 0.815), top),
        box("rail", (3.0, 0.03, 0.03), (0, 0, 1.085), brass),
    ]
    for x in (-1.5, -0.5, 0.5, 1.5):
        parts.append(box("post", (0.03, 0.03, 0.27), (x, 0, 0.965), brass))
    for x in (-1.0, 0.0, 1.0):
        parts.append(box("glass", (0.9, 0.012, 0.24), (x, 0, 0.95), glass, bevel=0.002))
    for x in (-1.0, -0.4, 0.4, 1.0):
        parts.append(box("slot_plate", (0.12, 0.012, 0.07), (x, 0.31, 0.6), slot, bevel=0.002))
    parts.append(box("window", (0.5, 0.012, 0.12), (0, 0.31, 0.5), top))
    finish("bank_counter", parts)


def queue_rope():
    begin("queue_rope")
    chrome = mat("chrome", "#D7DCE2", 0.15, metallic=1.0)
    base = mat("stanchion_base", "#222326", 0.5)
    velvet = mat("velvet_rope", "#7A1620", 0.9)
    parts = []
    for x in (-1.18, 1.18):
        parts.append(box("foot", (0.2, 0.1, 0.02), (x, 0, 0.01), base))
        parts.append(cyl("post", 0.018, 0.87, (x, 0, 0.455), chrome, verts=16))
        parts.append(sphere("knob", 0.035, (x, 0, 0.915), chrome, segments=16))
    n = 14
    pts = []
    for i in range(n + 1):
        t = i / n
        x = -1.18 + 2.36 * t
        z = 0.82 - 0.35 * (1 - (2 * t - 1) ** 2)     # sagging catenary-like curve
        pts.append((x, 0.0, z))
    for i in range(n):
        parts.append(seg(f"rope{i}", pts[i], pts[i + 1], 0.012, velvet))
    finish("queue_rope", parts)


def newsstand():
    begin("newsstand")
    wall = mat("kiosk_wall", "#2F6F5E", 0.6)
    counter = mat("counter_wood", "#D8C9A3", 0.5)
    red = mat("awning_red", "#C0392B", 0.5)
    white = mat("awning_white", "#F4F1EA", 0.5)
    orange = mat("mag_orange", "#E67E22", 0.5)
    blue = mat("mag_blue", "#3498DB", 0.5)
    parts = [
        box("base", (1.6, 0.9, 0.08), (0, 0, 0.04), counter),
        box("back", (1.6, 0.04, 1.78), (0, -0.43, 0.89), wall),
        box("side_l", (0.04, 0.9, 1.78), (-0.78, 0, 0.89), wall),
        box("side_r", (0.04, 0.9, 1.78), (0.78, 0, 0.89), wall),
        box("counter", (1.52, 0.5, 0.9), (0, 0.2, 0.45), counter),
        box("roof", (1.6, 0.9, 0.08), (0, 0, 1.86), wall),
    ]
    for zs in (0.98, 1.22, 1.46):
        parts.append(box("mag_shelf", (1.52, 0.36, 0.02), (0, -0.23, zs), counter))
        for k in range(9):
            x = -0.64 + k * 0.16
            col = orange if (k + int(zs * 10)) % 2 else blue
            parts.append(box("magazine", (0.1, 0.02, 0.22), (x, -0.15, zs + 0.12), col, bevel=0.002))
    for k in range(8):
        x = -0.7 + k * 0.2
        parts.append(box("awning", (0.2, 0.4, 0.04), (x, 0.2, 1.8), red if k % 2 == 0 else white, bevel=0.002))
    finish("newsstand", parts)


def video_shelf():
    begin("video_shelf")
    wood = mat("shelf_wood", "#7A5A3A", 0.6)
    cols = [mat("vhs_red", "#C0392B", 0.5), mat("vhs_blue", "#2E86C1", 0.5),
            mat("vhs_yellow", "#F1C40F", 0.5), mat("vhs_black", "#1E1E1E", 0.4)]
    rnd = random.Random(5)
    parts = [box("side", (0.03, 0.4, 1.9), (x, 0, 0.95), wood) for x in (-0.985, 0.985)]
    parts.append(box("back", (1.94, 0.02, 1.9), (0, -0.19, 0.95), wood))
    parts.append(box("top", (2.0, 0.4, 0.03), (0, 0, 1.885), wood))
    levels = (0.0, 0.32, 0.64, 0.96, 1.28, 1.6)
    for z in levels:
        parts.append(box("shelf", (1.94, 0.38, 0.025), (0, 0, z + 0.0125), wood))
    for z in levels:
        base = z + 0.025
        x = -0.9
        while x < 0.85:
            if rnd.random() > 0.15:
                parts.append(box("vhs", (0.028, 0.1, 0.18), (x, 0.02, base + 0.09), rnd.choice(cols), bevel=0.002))
            x += 0.15
    finish("video_shelf", parts)


def arcade_cabinet():
    begin("arcade_cabinet")
    body = mat("cabinet_black", "#1A1A22", 0.6)
    art = mat("cabinet_art", "#8E24AA", 0.5)
    marquee = mat("marquee", "#FFCC33", 0.4, emission="#FFCC33", strength=0.6)
    screen = mat("crt_screen", "#0B1A2A", 0.2, emission="#4FD1FF", strength=2.0)
    btn = mat("arcade_button", "#E53935", 0.4)
    chrome = mat("joystick_metal", "#C0C6CE", 0.2, metallic=1.0)
    parts = [
        box("lower", (0.66, 0.7, 0.95), (0, -0.05, 0.475), body),
        box("deck", (0.7, 0.3, 0.05), (0, 0.25, 0.97), art),
        box("upright", (0.66, 0.3, 0.75), (0, -0.25, 1.325), body),
        box("marquee", (0.66, 0.03, 0.2), (0, -0.085, 1.6), marquee),
        box("screen", (0.52, 0.01, 0.42), (0, -0.095, 1.25), screen),
        cyl("stick", 0.01, 0.1, (-0.12, 0.25, 1.045), chrome),
        sphere("ball", 0.028, (-0.12, 0.25, 1.115), btn, segments=16),
    ]
    for x in (0.05, 0.14, 0.23, 0.32):
        parts.append(cyl("button", 0.02, 0.03, (x, 0.25, 1.01), btn))
    for s in (-1, 1):
        parts.append(box("side_art", (0.01, 0.6, 0.7), (s * 0.335, -0.05, 0.5), art))
    finish("arcade_cabinet", parts)


def market_shelf():
    begin("market_shelf")
    frame = mat("gondola_frame", "#9AA3AD", 0.35, metallic=0.8)
    shelf = mat("gondola_shelf", "#E9E4DA", 0.5)
    red = mat("prod_red", "#D35400", 0.45)
    blue = mat("prod_blue", "#2E86C1", 0.45)
    green = mat("prod_green", "#27AE60", 0.45)
    bottle = mat("prod_bottle", "#F4D03F", 0.12)
    rnd = random.Random(11)
    parts = []
    for x in (-0.985, 0.985):
        for y in (-0.23, 0.23):
            parts.append(box("upright", (0.03, 0.03, 1.8), (x, y, 0.9), frame))
    parts.append(box("top", (2.0, 0.5, 0.03), (0, 0, 1.785), frame))
    levels = [0.02, 0.5, 0.98, 1.46, 1.78]     # shelf bottoms; the last value is the ceiling
    for i, z in enumerate(levels[:-1]):
        parts.append(box("shelf", (1.94, 0.46, 0.02), (0, 0, z + 0.01), shelf))
        ceiling = levels[i + 1]
        x = -0.92
        while x < 0.9:
            w = rnd.uniform(0.11, 0.17)
            hmax = ceiling - (z + 0.02) - 0.02
            h = rnd.uniform(0.12, min(0.3, hmax))
            d = rnd.uniform(0.14, 0.3)
            y = rnd.uniform(-0.08, 0.08)
            cx = x + w / 2
            if rnd.random() < 0.3:
                parts.append(cyl("bottle", min(w, 0.1) / 2, h, (cx, y, z + 0.02 + h / 2), bottle, verts=14))
            else:
                col = rnd.choice([red, blue, green])
                parts.append(box("product", (w, d, h), (cx, y, z + 0.02 + h / 2), col, bevel=0.004))
            x += w + rnd.uniform(0.0, 0.03)
    finish("market_shelf", parts)


def checkout_counter():
    begin("checkout_counter")
    body = mat("counter_body", "#3D4A5C", 0.6)
    top = mat("counter_top", "#E6E2D8", 0.35)
    belt = mat("belt_rubber", "#22262D", 0.8)
    chrome = mat("rail_metal", "#B8C0C8", 0.25, metallic=1.0)
    screen = mat("pos_screen", "#0E1E2E", 0.2, emission="#3EA8FF", strength=0.8)
    parts = [
        box("body", (1.8, 0.62, 0.72), (0, 0, 0.36), body),
        box("top", (1.8, 0.68, 0.03), (0, 0, 0.735), top),
        box("belt", (1.1, 0.5, 0.012), (-0.3, -0.05, 0.756), belt, bevel=0.002),
        box("rail_front", (1.1, 0.02, 0.03), (-0.3, -0.31, 0.765), chrome),
        box("rail_back", (1.1, 0.02, 0.03), (-0.3, 0.21, 0.765), chrome),
        box("card_reader", (0.12, 0.1, 0.06), (0.65, -0.15, 0.78), belt),
        box("screen_stand", (0.04, 0.04, 0.03), (0.65, 0.2, 0.765), belt),
        box("screen", (0.3, 0.02, 0.17), (0.65, 0.2, 0.865), screen),
    ]
    finish("checkout_counter", parts)


def payment_sign():
    begin("payment_sign")
    card = mat("sign_card", "#F7F4EC", 0.5)
    wood = mat("easel_wood", "#8A6A4F", 0.6)
    black = mat("qr_black", "#111111", 0.5)
    white = mat("qr_white", "#FAFAFA", 0.5)
    parts = [box("card", (0.48, 0.018, 0.23), (0, 0, 0.235), card, bevel=0.003)]
    for s in (-1, 1):
        parts.append(box("easel_leg", (0.02, 0.012, 0.2), (s * 0.12, 0, 0.06), wood, rot=(0, -s * 53, 0)))
    parts += qr_block("pay", 0.0, 0.235, 0.009, 0.18, 21, 7, white, black)
    finish("payment_sign", parts)


def qr_sign():
    begin("qr_sign")
    acrylic = mat("acrylic", "#CDE9F5", 0.08)
    metal = mat("foot_metal", "#B8C0C8", 0.3, metallic=0.8)
    black = mat("qr_black", "#111111", 0.5)
    white = mat("qr_white", "#FAFAFA", 0.5)
    parts = [
        box("foot", (0.22, 0.02, 0.02), (0, 0, 0.01), metal),
        box("panel", (0.25, 0.012, 0.3), (0, 0, 0.17), acrylic, bevel=0.002),
    ]
    parts += qr_block("sign", 0.0, 0.17, 0.006, 0.18, 21, 3, white, black)
    finish("qr_sign", parts)


KITS = [travel_counter, brochure_rack, resort_poster, review_panel, bank_counter, queue_rope,
        newsstand, video_shelf, arcade_cabinet, market_shelf, checkout_counter, payment_sign, qr_sign]

_only = {k for k in os.environ.get("KITS", "").split(",") if k}
for build in KITS:
    if not _only or build.__name__ in _only:
        build()
