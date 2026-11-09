"""Shared Blender helpers for the textbook-scene prop library (run inside Blender 4.5).

Conventions every kit script follows:
- metres; origin = centre of the footprint on the floor (z = 0); objects stand on z = 0
- the FRONT of an object (seat opening, screen, drawer side) faces Blender +Y; the FBX export below
  maps Blender (x, y, z) -> UE (x, -y, z), so the front then faces UE -Y, toward the scene cameras
- real-world dimensions taken from Content/Data/memory/textbook_scenes/unitNN.json "size" (w, d, h)
- every hard edge gets a bevel (no razor-sharp primitive boxes); 2-6 materials per prop, named M_<role>
- one kit = one Blender object named SM_<kit> (join parts before export)

Usage inside a kit script:
    import sys; sys.path.insert(0, "<repo>/手机游戏/word-quest-ue/Tools/props")
    from kit_common import *
    reset()
    parts = [box("seat", (0.8, 0.8, 0.12), (0, 0, 0.42), mat("fabric", "#6B5A4A", 0.85)), ...]
    finish("armchair", parts)       # joins, applies transforms, exports FBX + preview PNG
"""
import json
import math
import os

import bpy
import bmesh

HERE = os.path.dirname(os.path.abspath(__file__))
UE_ROOT = os.path.dirname(os.path.dirname(HERE))
OUT_FBX = os.path.join(UE_ROOT, "SourceArt", "Props")
OUT_PREVIEW = os.path.join(OUT_FBX, "preview")


def reset():
    """Empty scene (keeps no default cube/camera/light)."""
    bpy.ops.wm.read_factory_settings(use_empty=True)
    bpy.context.scene.unit_settings.system = "METRIC"
    _MATS.clear()   # factory reset deletes the materials; drop the stale cache entries with them


def hex_rgb(h):
    h = h.lstrip("#")
    srgb = [int(h[i:i + 2], 16) / 255.0 for i in (0, 2, 4)]
    return tuple(c / 12.92 if c <= 0.04045 else ((c + 0.055) / 1.055) ** 2.4 for c in srgb) + (1.0,)


_MATS = {}


def mat(role, color, roughness=0.6, metallic=0.0, emission=None, emission_strength=0.0, alpha=1.0, noise=0.0):
    """Principled material M_<role>. noise > 0 adds subtle procedural value variation (wood/fabric/stone)."""
    key = (role, color, roughness, metallic, emission, emission_strength, alpha, noise)
    if key in _MATS:
        return _MATS[key]
    m = bpy.data.materials.new(f"M_{role}")
    # read back by finish() into SM_<kit>.materials.json; UE rebuilds these as material instances
    m["wq_params"] = {"color": color, "roughness": roughness, "metallic": metallic, "emission": emission or "",
                      "emission_strength": emission_strength, "alpha": alpha, "noise": noise}
    m.use_nodes = True
    nt = m.node_tree
    bsdf = nt.nodes["Principled BSDF"]
    bsdf.inputs["Base Color"].default_value = hex_rgb(color)
    bsdf.inputs["Roughness"].default_value = roughness
    bsdf.inputs["Metallic"].default_value = metallic
    if emission:
        bsdf.inputs["Emission Color"].default_value = hex_rgb(emission)
        bsdf.inputs["Emission Strength"].default_value = emission_strength
    if alpha < 1.0:
        bsdf.inputs["Alpha"].default_value = alpha
        m.blend_method = "BLEND" if hasattr(m, "blend_method") else None
    if noise > 0:
        tex = nt.nodes.new("ShaderNodeTexNoise")
        tex.inputs["Scale"].default_value = 18.0
        mix = nt.nodes.new("ShaderNodeMixRGB")
        mix.blend_type = "MULTIPLY"
        mix.inputs["Fac"].default_value = noise
        mix.inputs["Color1"].default_value = hex_rgb(color)
        nt.links.new(tex.outputs["Fac"], mix.inputs["Color2"])
        nt.links.new(mix.outputs["Color"], bsdf.inputs["Base Color"])
    _MATS[key] = m
    return m


def _assign(obj, material):
    obj.data.materials.clear()
    obj.data.materials.append(material)


def _bevel(obj, width, segments=2):
    if width <= 0:
        return
    mod = obj.modifiers.new("bevel", "BEVEL")
    mod.width = width
    mod.segments = segments
    mod.limit_method = "ANGLE"
    mod.angle_limit = math.radians(40)
    mod.harden_normals = True


def box(name, size, loc, material, bevel=0.008, rot=(0, 0, 0)):
    """Axis-aligned box: size (w, d, h), loc = centre of the box."""
    bpy.ops.mesh.primitive_cube_add(size=1.0, location=loc, rotation=[math.radians(r) for r in rot])
    o = bpy.context.active_object
    o.name = name
    o.scale = (size[0], size[1], size[2])
    bpy.ops.object.transform_apply(scale=True)
    _bevel(o, min(bevel, min(size) * 0.45))
    _assign(o, material)
    return o


def cyl(name, radius, depth, loc, material, verts=32, rot=(0, 0, 0), bevel=0.004):
    bpy.ops.mesh.primitive_cylinder_add(vertices=verts, radius=radius, depth=depth, location=loc,
                                        rotation=[math.radians(r) for r in rot])
    o = bpy.context.active_object
    o.name = name
    _bevel(o, min(bevel, radius * 0.4, depth * 0.4))
    _assign(o, material)
    return o


def sphere(name, radius, loc, material, segments=32, scale=(1, 1, 1)):
    bpy.ops.mesh.primitive_uv_sphere_add(segments=segments, ring_count=segments // 2, radius=radius, location=loc)
    o = bpy.context.active_object
    o.name = name
    o.scale = scale
    bpy.ops.object.transform_apply(scale=True)
    bpy.ops.object.shade_smooth()
    _assign(o, material)
    return o


def torus(name, major, minor, loc, material, rot=(0, 0, 0)):
    bpy.ops.mesh.primitive_torus_add(major_radius=major, minor_radius=minor, location=loc,
                                     rotation=[math.radians(r) for r in rot])
    o = bpy.context.active_object
    o.name = name
    bpy.ops.object.shade_smooth()
    _assign(o, material)
    return o


def rounded_slab(name, size, loc, material, radius=0.03, rot=(0, 0, 0)):
    """Slab with rounded vertical corners (table tops, phones, tablets, cushions)."""
    o = box(name, size, loc, material, bevel=0.0, rot=rot)
    mod = o.modifiers.new("round", "BEVEL")
    mod.width = min(radius, min(size[0], size[1]) * 0.45)
    mod.segments = 6
    mod.affect = "EDGES"
    mod.limit_method = "ANGLE"
    _bevel(o, min(0.004, size[2] * 0.3))
    return o


def finish(kit, parts, preview=True):
    """Join parts into SM_<kit>, apply modifiers, sit on the floor, export FBX (+ preview PNG)."""
    bpy.ops.object.select_all(action="DESELECT")
    for p in parts:
        p.select_set(True)
        bpy.context.view_layer.objects.active = p
        for m in list(p.modifiers):
            bpy.ops.object.modifier_apply(modifier=m.name)
    bpy.context.view_layer.objects.active = parts[0]
    bpy.ops.object.join()
    obj = bpy.context.active_object
    obj.name = f"SM_{kit}"
    bpy.ops.object.transform_apply(location=False, rotation=True, scale=True)
    zmin = min((obj.matrix_world @ v.co).z for v in obj.data.vertices)
    obj.location.z -= zmin
    bpy.ops.object.transform_apply(location=True)
    os.makedirs(OUT_FBX, exist_ok=True)
    path = os.path.join(OUT_FBX, f"SM_{kit}.fbx")
    bpy.ops.export_scene.fbx(filepath=path, use_selection=True, apply_unit_scale=True, apply_scale_options="FBX_SCALE_UNITS",
                             axis_forward="-Z", axis_up="Y", mesh_smooth_type="FACE", add_leaf_bones=False, path_mode="STRIP")
    sidecar = {s.material.name: dict(s.material.get("wq_params", {})) for s in obj.material_slots if s.material}
    with open(os.path.join(OUT_FBX, f"SM_{kit}.materials.json"), "w", encoding="utf-8") as fh:
        json.dump({"kit": kit, "dims_m": [round(d, 3) for d in obj.dimensions], "materials": sidecar}, fh, indent=1)
    dims = tuple(round(d, 3) for d in obj.dimensions)
    print(f"KIT DONE {kit} dims {dims} tris {sum(len(p.vertices) - 2 for p in obj.data.polygons)}", flush=True)
    if preview:
        _preview(obj, kit)
    obj.select_set(False)
    return obj


def _preview(obj, kit):
    """3/4 studio render so the kit can be reviewed without UE."""
    scn = bpy.context.scene
    scn.render.engine = "BLENDER_EEVEE_NEXT" if "BLENDER_EEVEE_NEXT" in [e.identifier for e in bpy.types.RenderSettings.bl_rna.properties["engine"].enum_items] else "BLENDER_EEVEE"
    scn.render.resolution_x = scn.render.resolution_y = 512
    scn.world = scn.world or bpy.data.worlds.new("W")
    scn.world.use_nodes = True
    scn.world.node_tree.nodes["Background"].inputs["Color"].default_value = (0.05, 0.06, 0.08, 1)
    scn.world.node_tree.nodes["Background"].inputs["Strength"].default_value = 0.6
    size = max(obj.dimensions)
    cx, cy, cz = (sum(c) / 8 for c in zip(*[obj.matrix_world @ __import__("mathutils").Vector(b) for b in obj.bound_box]))
    cam = bpy.data.objects.new("cam", bpy.data.cameras.new("cam"))
    scn.collection.objects.link(cam)
    d = size * 2.2 + 0.3
    cam.location = (cx + d * 0.55, cy + d * 0.85, cz + d * 0.45)   # front (+Y) three-quarter view
    direction = __import__("mathutils").Vector((cx, cy, cz)) - cam.location
    cam.rotation_euler = direction.to_track_quat("-Z", "Y").to_euler()
    scn.camera = cam
    for name, loc, energy in (("key", (cx + d, cy + d, cz + d), 800 * size * size + 60), ("rim", (cx - d, cy - d, cz + d), 300 * size * size + 30)):
        light = bpy.data.objects.new(name, bpy.data.lights.new(name, "AREA"))
        light.data.energy = energy
        light.data.size = size + 0.5
        light.location = loc
        light.rotation_euler = (__import__("mathutils").Vector((cx, cy, cz)) - light.location).to_track_quat("-Z", "Y").to_euler()
        scn.collection.objects.link(light)
    os.makedirs(OUT_PREVIEW, exist_ok=True)
    scn.render.filepath = os.path.join(OUT_PREVIEW, f"SM_{kit}.png")
    bpy.ops.render.render(write_still=True)
    for o in [o for o in scn.objects if o.type in ("CAMERA", "LIGHT")]:
        bpy.data.objects.remove(o, do_unlink=True)
