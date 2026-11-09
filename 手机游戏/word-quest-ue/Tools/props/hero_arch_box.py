"""Architecture unit box: 1 x 1 x 1 m, pivot at the bottom centre, 1 cm rounded edges. Kit meshes for walls,
floors, streets and ground (kit_assets.json "fit": "size" stretches it per placement; the world-aligned
MI_Arch_* material keeps the texture scale). Default slot: MI_Arch_plaster, overridden per kit.

Blender -b -P Tools/props/hero_arch_box.py
"""
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from hero_common import external, finish, reset, rounded_slab, subdivide  # noqa: E402

reset()
box = rounded_slab("arch_box", 1.0, 1.0, 1.0, 0.01, 0.01, external("arch", "/Game/Memory/Materials/Arch/MI_Arch_plaster"),
                   z0=0.0, seg=3, edge_seg=3)
subdivide(box, 8)                       # dense enough for Nanite displacement / vertex wobble later
finish("arch_box", [box], dims=(1.0, 1.0, 1.0), note="unit box for fit:size architecture kits")
