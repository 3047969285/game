"""Memory FX prop: the "bubble" around each person (Unit 1 "alone together"). Kit "bubble", 1.4 x 1.4 x 1.8 m.

Blender -b -P Tools/props/hero_bubble.py

A smooth ellipsoid shell resting on the floor (pivot at the bottom), plus a slightly smaller inner shell so the
rim reads as thickness. Both use /Game/Memory/Materials/FX/M_MemoryBubble (Tools/make_memory_materials.py).
"""
import os
import sys

import bmesh

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from hero_common import _obj, external, finish, reset  # noqa: E402

W, H = 1.4, 1.8


def shell(name, w, h, mat, rings=64, segs=128):
    bm = bmesh.new()
    bmesh.ops.create_uvsphere(bm, u_segments=segs, v_segments=rings, radius=0.5)
    for v in bm.verts:
        v.co.x *= w
        v.co.y *= w
        v.co.z = (v.co.z + 0.5) * h          # bottom at z = 0
    return _obj(name, bm, mat)


reset()
glass = external("bubble", "/Game/Memory/Materials/FX/M_MemoryBubble")
parts = [shell("outer", W, H, glass), shell("inner", W - 0.02, H - 0.02, glass)]
parts[1].data.transform(__import__("mathutils").Matrix.Translation((0, 0, 0.01)))
finish("bubble", parts, dims=(W, W, H), note="memory FX shell; external translucent material")
