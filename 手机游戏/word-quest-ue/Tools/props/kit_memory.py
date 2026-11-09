"""Memory-effect prop kits for the textbook scenes (run inside Blender 4.5).

    "$B" -b -P Tools/props/kit_memory.py

Kits (sizes from Content/Data/memory/textbook_scenes/unit01.json):
  bubble        1.4 x 1.4 x 1.8  translucent person-sized bubble on a glowing base ring
  message_drop  0.12 cube        glowing rounded chat-bubble with a small tail
  tone_ripple   1.6 x 1.6 x 0.02 three flat concentric glowing rings
  network_node  0.3 cube         glowing node sphere with three thin spokes
"""
import math
import os
import sys

import bmesh
import bpy
from mathutils import Vector

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import kit_common as kc  # noqa: E402
from kit_common import *  # noqa: E402,F401,F403

GLOW = "#B8D1D5"
VOID = "#0B1418"


def fresh():
    """reset() wipes bpy.data, so the kit_common material cache must be cleared too."""
    reset()
    kc._MATS.clear()


def glow(role, strength, roughness=0.35):
    return mat(role, VOID, roughness, emission=GLOW, emission_strength=strength)


def ring(name, major, minor, loc, material, major_seg=48, minor_seg=8):
    """Torus lying flat (XY plane) with low segment counts to keep tris down."""
    bpy.ops.mesh.primitive_torus_add(major_segments=major_seg, minor_segments=minor_seg,
                                     major_radius=major, minor_radius=minor, location=loc)
    o = bpy.context.active_object
    o.name = name
    bpy.ops.object.shade_smooth()
    o.data.materials.clear()
    o.data.materials.append(material)
    return o


def build_bubble():
    fresh()
    body_m = mat("bubble_glass", "#8FB8C4", roughness=0.05, alpha=0.12, emission=GLOW, emission_strength=0.4)
    if hasattr(body_m, "surface_render_method"):
        body_m.surface_render_method = "BLENDED"
    ring_m = glow("bubble_ring", 3.0, roughness=0.3)
    # elongated sphere: 0.7 m radius in plan, 0.9 m half-height, centred at z = 0.9
    body = sphere("bubble_body", 0.7, (0, 0, 0.9), body_m, segments=32, scale=(1, 1, 0.9 / 0.7))
    base = ring("bubble_base", 0.7, 0.015, (0, 0, 0.0), ring_m)
    finish("bubble", [body, base])


def prism(name, pts, y0, y1, material):
    """Extrude a closed (x, z) polygon along Y from y0 to y1 (used for the chat-bubble tail)."""
    bm = bmesh.new()
    bot = [bm.verts.new((x, y0, z)) for x, z in pts]
    top = [bm.verts.new((x, y1, z)) for x, z in pts]
    bm.faces.new(bot[::-1])
    bm.faces.new(top)
    for i in range(len(pts)):
        j = (i + 1) % len(pts)
        bm.faces.new((bot[i], bot[j], top[j], top[i]))
    me = bpy.data.meshes.new(name)
    bm.normal_update()
    bm.to_mesh(me)
    bm.free()
    obj = bpy.data.objects.new(name, me)
    bpy.context.collection.objects.link(obj)
    obj.data.materials.append(material)
    return obj


def build_message_drop():
    fresh()
    m = glow("message", 4.0, roughness=0.3)
    dot = mat("message_dot", VOID, 0.5)
    w, h, d, r, zc = 0.14, 0.10, 0.03, 0.02, 0.06     # upright rounded rectangle in the XZ plane, faces +Y
    parts = [
        box("message_core", (w - 2 * r, d, h), (0, 0, zc), m, bevel=0.0),
        box("message_band", (w, d, h - 2 * r), (0, 0, zc), m, bevel=0.0),
    ]
    for sx in (-1, 1):
        for sz in (-1, 1):
            parts.append(cyl(f"corner_{sx}_{sz}", r, d, (sx * (w / 2 - r), 0, zc + sz * (h / 2 - r)), m,
                             verts=24, rot=(90, 0, 0), bevel=0.0))
    # tail: triangle at the bottom-left as seen from the face (+Y side, viewer's left = +X)
    parts.append(prism("message_tail", [(0.04, 0.03), (0.072, -0.004), (0.02, 0.012)], -d / 2, d / 2, m))
    # three small dots on the face
    for i, x in enumerate((-0.03, 0.0, 0.03)):
        parts.append(sphere(f"message_dot{i}", 0.008, (x, d / 2 + 0.001, zc), dot, segments=16, scale=(1, 0.3, 1)))
    finish("message_drop", parts)


def build_tone_ripple():
    fresh()
    m = glow("tone", 2.0, roughness=0.3)
    parts = [ring(f"tone_ring{i}", r, 0.01, (0, 0, 0.01), m) for i, r in enumerate((0.27, 0.53, 0.79))]
    finish("tone_ripple", parts)


def build_network_node():
    fresh()
    m = glow("node", 3.0, roughness=0.3)
    centre = (0.0, 0.0, 0.15)
    parts = [sphere("node_core", 0.045, centre, m, segments=24)]
    # three spokes: (azimuth deg, elevation deg); tips at 0.175 m horizontal reach, +/-40 deg tilt
    rc, elev_deg = 0.175, 40.0
    e = math.radians(elev_deg)
    reach = rc / math.cos(e)
    for i, (az_deg, sign) in enumerate(((0.0, 1), (120.0, -1), (240.0, 1))):
        az = math.radians(az_deg)
        d = Vector((math.cos(e) * math.cos(az), math.cos(e) * math.sin(az), sign * math.sin(e)))
        mid = Vector(centre) + d * (reach / 2)
        euler = Vector((0, 0, 1)).rotation_difference(d).to_euler()
        parts.append(cyl(f"node_spoke{i}", 0.008, reach, tuple(mid), m, verts=12,
                         rot=tuple(math.degrees(a) for a in euler)))
    finish("network_node", parts)


if __name__ == "__main__":
    only = {k for k in os.environ.get("KITS", "").split(",") if k}
    for build in (build_bubble, build_message_drop, build_tone_ripple, build_network_node):
        if not only or build.__name__[len("build_"):] in only:
            build()
