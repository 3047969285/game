"""Hero-prop helpers (Blender 4.5): code-built props at Docs/quality-bar.md level.

Unlike kit_common.py (flat-colour placeholders), a hero prop ships baked PBR textures:
- every part is real geometry with rounded edges (bmesh bevels, no raw primitive boxes)
- each material is a procedural node graph (base + grain, edge wear, cavity dirt, scratches, smudges, bump)
  that Cycles bakes into 2K maps: BaseColor (sRGB), Normal (tangent, OpenGL green), ARM (AO, Roughness, Metallic)
- emissive slots (screens, signs) take an authored image instead of a bake

Layout: parts sharing a material are joined and smart-UV-projected together, baked, then all are joined into one
object SM_<kit>. Frame and conventions are the same as kit_common.py (metres, origin = footprint centre on the
floor, front toward Blender +Y; FBX maps it to UE -Y).

Output (SourceArt/Props/Hero/):
  SM_<kit>.fbx, T_<kit>_<slot>_{BaseColor,Normal,ARM}.png (or _Emissive.png), SM_<kit>.hero.json, preview/<kit>.png
The UE side is Tools/import_hero_props.py.

Usage:
  import sys; sys.path.insert(0, "<repo>/word-quest-ue/Tools/props")
  from hero_common import *
  reset()
  alu = pbr("frame", "#AEB4BC", rough=0.32, metal=1.0, wear=0.6, scratches=0.4)
  parts = [rounded_slab("body", 0.075, 0.155, 0.009, 0.009, 0.0015, alu)]
  finish("phone", parts, dims=(0.075, 0.155, 0.009))
"""
import json
import math
import os

import bmesh
import bpy
import numpy as np

HERE = os.path.dirname(os.path.abspath(__file__))
UE_ROOT = os.path.dirname(os.path.dirname(HERE))
OUT = os.path.join(UE_ROOT, "SourceArt", "Props", "Hero")
RES = int(os.environ.get("HERO_RES", "2048"))
SAMPLES = int(os.environ.get("HERO_SAMPLES", "24"))


def reset():
    bpy.ops.wm.read_factory_settings(use_empty=True)
    sc = bpy.context.scene
    sc.unit_settings.system = "METRIC"
    sc.render.engine = "CYCLES"
    sc.cycles.samples = SAMPLES
    try:                                    # GPU bake when Metal is available
        prefs = bpy.context.preferences.addons["cycles"].preferences
        prefs.compute_device_type = "METAL"
        prefs.get_devices()
        for d in prefs.devices:
            d.use = True
        sc.cycles.device = "GPU"
    except Exception:  # noqa: BLE001
        sc.cycles.device = "CPU"


def hex_rgb(h):
    h = h.lstrip("#")
    srgb = [int(h[i:i + 2], 16) / 255.0 for i in (0, 2, 4)]
    return tuple(c / 12.92 if c <= 0.04045 else ((c + 0.055) / 1.055) ** 2.4 for c in srgb) + (1.0,)


# ------------------------------------------------------------------ materials
def pbr(role, color, rough=0.5, metal=0.0, *, grain=0.15, grain_scale=60.0, wear=0.0, wear_color=None,
        dirt=0.25, scratches=0.0, scratch_scale=40.0, smudge=0.0, bump=0.15, bump_scale=300.0, rough_var=0.12,
        wood=0.0, color2=None, wood_scale=18.0, image=None, image_plane="XY", image_size=(1.0, 1.0),
        image_center=(0.0, 0.0), scan=None, scan_size=0.6, scan_tint="#FFFFFF"):
    """Procedural PBR material M_<role>. All amounts are 0..1.

    grain: low-frequency colour variation; wear: brighter / smoother rounded edges (Bevel-node edge mask);
    dirt: AO-driven darkening in crevices; scratches: thin directional streaks (roughness + colour + bump);
    smudge: fingerprint-like roughness patches; bump: fine surface noise amplitude.
    """
    m = bpy.data.materials.new(f"M_{role}")
    m["hero"] = {"role": role, "metal": metal, "emissive": False}
    m.use_nodes = True
    nt = m.node_tree
    N, L = nt.nodes, nt.links
    bsdf = N["Principled BSDF"]
    tc = N.new("ShaderNodeTexCoord")

    def noise(scale, detail=6.0, rough_=0.55, vec=None):
        n = N.new("ShaderNodeTexNoise")
        n.inputs["Scale"].default_value = scale
        n.inputs["Detail"].default_value = detail
        n.inputs["Roughness"].default_value = rough_
        L.new((vec or tc.outputs["Object"]), n.inputs["Vector"])
        return n.outputs["Fac"]

    def math_(op, a, b=None, clamp=True):
        n = N.new("ShaderNodeMath")
        n.operation = op
        n.use_clamp = clamp
        for i, v in enumerate((a, b)):
            if v is None:
                continue
            if isinstance(v, (int, float)):
                n.inputs[i].default_value = v
            else:
                L.new(v, n.inputs[i])
        return n.outputs[0]

    def mix_rgb(fac, a, b, blend="MIX"):
        n = N.new("ShaderNodeMix")
        n.data_type = "RGBA"
        n.blend_type = blend
        for sock, v in ((n.inputs[0], fac), (n.inputs[6], a), (n.inputs[7], b)):
            if isinstance(v, (int, float)):
                sock.default_value = v
            elif isinstance(v, tuple):
                sock.default_value = v
            else:
                L.new(v, sock)
        return n.outputs[2]

    # colour: base +- grain
    g = math_("MULTIPLY", math_("SUBTRACT", noise(grain_scale / 10.0, 4.0), 0.5, clamp=False), grain * 0.6, clamp=False)
    gcol = N.new("ShaderNodeCombineColor")
    for i in range(3):
        L.new(math_("ADD", g, 0.5), gcol.inputs[i])
    base_col = hex_rgb(color)
    if image:
        # printed design (rug pattern, calendar page): planar projection in object space, sized in metres
        im = N.new("ShaderNodeTexImage")
        im.image = bpy.data.images.load(image, check_existing=True)
        im.extension = "CLIP"
        sep = N.new("ShaderNodeSeparateXYZ")
        L.new(tc.outputs["Object"], sep.inputs["Vector"])
        a_, b_ = {"XY": ("X", "Y"), "XZ": ("X", "Z"), "YZ": ("Y", "Z")}[image_plane]
        comb = N.new("ShaderNodeCombineXYZ")
        # XZ = a vertical face looking toward +Y: seen from the front, +x is the viewer's left, so u runs along -x
        u_sign = -1.0 if image_plane == "XZ" else 1.0
        for out_, src, size, c0 in (("X", a_, image_size[0] * u_sign, image_center[0]), ("Y", b_, image_size[1], image_center[1])):
            L.new(math_("ADD", math_("DIVIDE", math_("SUBTRACT", sep.outputs[src], c0, clamp=False), size, clamp=False),
                        0.5, clamp=False), comb.inputs[out_])
        L.new(comb.outputs["Vector"], im.inputs["Vector"])
        base_col = im.outputs["Color"]
    scan_rough = scan_normal = None
    if scan:
        # photo-scanned surface (Poly Haven CC0, SourceArt/PolyHaven/textures/<id>): box-projected in object space,
        # scan_size metres per tile; wear / dirt / scratches below still layer on top
        sdir = os.path.join(UE_ROOT, "SourceArt", "PolyHaven", "textures", scan)
        smap = N.new("ShaderNodeMapping")
        smap.inputs["Scale"].default_value = (1.0 / scan_size,) * 3
        L.new(tc.outputs["Object"], smap.inputs["Vector"])

        def scan_tex(tag, cs):
            t = N.new("ShaderNodeTexImage")
            t.image = bpy.data.images.load(os.path.join(sdir, f"{scan}_{tag}_2k.jpg"), check_existing=True)
            t.image.colorspace_settings.name = cs
            t.projection = "BOX"
            t.projection_blend = 0.25
            L.new(smap.outputs["Vector"], t.inputs["Vector"])
            return t

        base_col = mix_rgb(1.0, scan_tex("diffuse", "sRGB").outputs["Color"], hex_rgb(scan_tint), "MULTIPLY")
        sep_arm = N.new("ShaderNodeSeparateColor")
        L.new(scan_tex("arm", "Non-Color").outputs["Color"], sep_arm.inputs["Color"])
        scan_rough = sep_arm.outputs["Green"]
        nmap = N.new("ShaderNodeNormalMap")
        L.new(scan_tex("nor_gl", "Non-Color").outputs["Color"], nmap.inputs["Color"])
        scan_normal = nmap.outputs["Normal"]
        grain, wood = min(grain, 0.04), 0.0              # the scan already carries grain / colour variation
    col = mix_rgb(1.0, base_col, gcol.outputs[0], "OVERLAY")
    rough_out = math_("ADD", scan_rough if scan_rough is not None else rough,
                      math_("MULTIPLY", math_("SUBTRACT", noise(grain_scale / 4.0), 0.5, clamp=False), rough_var, clamp=False))
    if wood > 0:
        # growth rings along the board (x), stretched pores; color2 = late-wood tone
        wm = N.new("ShaderNodeMapping")
        wm.inputs["Scale"].default_value = (1.0, wood_scale, wood_scale * 0.6)
        L.new(tc.outputs["Object"], wm.inputs["Vector"])
        rings = N.new("ShaderNodeTexWave")
        rings.wave_type = "BANDS"
        rings.bands_direction = "Y"
        rings.inputs["Scale"].default_value = 1.0
        rings.inputs["Distortion"].default_value = 9.0
        rings.inputs["Detail"].default_value = 4.0
        rings.inputs["Detail Scale"].default_value = 1.5
        L.new(wm.outputs["Vector"], rings.inputs["Vector"])
        pm = N.new("ShaderNodeMapping")
        pm.inputs["Scale"].default_value = (8.0, wood_scale * 40.0, wood_scale * 40.0)
        L.new(tc.outputs["Object"], pm.inputs["Vector"])
        pores = noise(1.0, 2.0, 0.5, vec=pm.outputs["Vector"])
        ring_f = math_("MULTIPLY", math_("POWER", rings.outputs["Fac"], 2.2), wood)
        col = mix_rgb(ring_f, col, hex_rgb(color2 or color))
        col = mix_rgb(math_("MULTIPLY", math_("GREATER_THAN", pores, 0.62), 0.25 * wood), col, hex_rgb("#2A1C12"), "MULTIPLY")
        rough_out = math_("ADD", rough_out, math_("MULTIPLY", ring_f, 0.08))

    # edge wear from the Bevel node: edges where the rounded normal departs from the true normal
    if wear > 0:
        bev = N.new("ShaderNodeBevel")
        bev.samples = 8
        bev.inputs["Radius"].default_value = 0.0012
        geo = N.new("ShaderNodeNewGeometry")
        dot = N.new("ShaderNodeVectorMath")
        dot.operation = "DOT_PRODUCT"
        L.new(bev.outputs["Normal"], dot.inputs[0])
        L.new(geo.outputs["Normal"], dot.inputs[1])
        edge = math_("MULTIPLY", math_("SUBTRACT", 1.0, dot.outputs["Value"]), 18.0)
        edge = math_("MULTIPLY", edge, math_("ADD", 0.35, noise(220.0, 3.0)))       # broken, not a clean line
        edge = math_("MULTIPLY", edge, wear)
        wc = hex_rgb(wear_color) if wear_color else tuple(min(1.0, c * 1.6 + 0.05) for c in hex_rgb(color)[:3]) + (1.0,)
        col = mix_rgb(edge, col, wc)
        rough_out = math_("SUBTRACT", rough_out, math_("MULTIPLY", edge, 0.25 if metal > 0.5 else -0.15, clamp=False))

    # cavity dirt from AO
    if dirt > 0:
        ao = N.new("ShaderNodeAmbientOcclusion")
        ao.inputs["Distance"].default_value = 0.01
        ao.only_local = True
        cav = math_("MULTIPLY", math_("SUBTRACT", 1.0, ao.outputs["AO"]), dirt * 1.5)
        col = mix_rgb(cav, col, hex_rgb("#1E1A16"), "MULTIPLY")
        rough_out = math_("ADD", rough_out, math_("MULTIPLY", cav, 0.25))

    # scratches: stretched wave bands masked by noise
    bump_h = math_("MULTIPLY", noise(bump_scale, 8.0, 0.6), bump * 0.4)
    if scratches > 0:
        mp = N.new("ShaderNodeMapping")
        mp.inputs["Scale"].default_value = (scratch_scale * 6.0, scratch_scale * 0.35, scratch_scale * 0.35)
        mp.inputs["Rotation"].default_value = (0.0, 0.0, 0.7)
        L.new(tc.outputs["Object"], mp.inputs["Vector"])
        wav = N.new("ShaderNodeTexWave")
        wav.wave_profile = "SAW"
        wav.inputs["Distortion"].default_value = 6.0
        wav.inputs["Detail"].default_value = 3.0
        L.new(mp.outputs["Vector"], wav.inputs["Vector"])
        lines = math_("GREATER_THAN", wav.outputs["Fac"], 0.985)
        sc = math_("MULTIPLY", lines, math_("GREATER_THAN", noise(18.0, 2.0), 0.58))
        sc = math_("MULTIPLY", sc, scratches)
        col = mix_rgb(math_("MULTIPLY", sc, 0.35), col, hex_rgb("#E8E8E8"), "SCREEN")
        rough_out = math_("ADD", rough_out, math_("MULTIPLY", sc, 0.3))
        bump_h = math_("SUBTRACT", bump_h, math_("MULTIPLY", sc, 0.4), clamp=False)

    # fingerprints / smudges: soft voronoi blobs raise roughness
    if smudge > 0:
        vor = N.new("ShaderNodeTexVoronoi")
        vor.feature = "SMOOTH_F1"
        vor.inputs["Scale"].default_value = 45.0
        L.new(tc.outputs["Object"], vor.inputs["Vector"])
        sm = math_("MULTIPLY", math_("LESS_THAN", vor.outputs["Distance"], 0.32), math_("GREATER_THAN", noise(9.0, 2.0), 0.55))
        sm = math_("MULTIPLY", math_("MULTIPLY", sm, noise(260.0, 2.0)), smudge)
        rough_out = math_("ADD", rough_out, math_("MULTIPLY", sm, 0.35))

    bmp = N.new("ShaderNodeBump")
    bmp.inputs["Strength"].default_value = 0.35
    bmp.inputs["Distance"].default_value = 0.0004
    L.new(bump_h, bmp.inputs["Height"])
    if scan_normal is not None:
        L.new(scan_normal, bmp.inputs["Normal"])           # wear bump perturbs the scanned normal
    L.new(col, bsdf.inputs["Base Color"])
    L.new(math_("MAXIMUM", math_("MINIMUM", rough_out, 1.0), 0.02), bsdf.inputs["Roughness"])
    bsdf.inputs["Metallic"].default_value = metal
    L.new(bmp.outputs["Normal"], bsdf.inputs["Normal"])
    return m


def emissive(role, image_path, strength=2.0, base="#05070A"):
    """Screen / sign material: authored emissive image on 0..1 UVs (no bake)."""
    m = bpy.data.materials.new(f"M_{role}")
    m["hero"] = {"role": role, "metal": 0.0, "emissive": True, "image": image_path, "strength": strength}
    m.use_nodes = True
    nt = m.node_tree
    bsdf = nt.nodes["Principled BSDF"]
    bsdf.inputs["Base Color"].default_value = hex_rgb(base)
    bsdf.inputs["Roughness"].default_value = 0.05
    tex = nt.nodes.new("ShaderNodeTexImage")
    tex.image = bpy.data.images.load(image_path)
    nt.links.new(tex.outputs["Color"], bsdf.inputs["Emission Color"])
    bsdf.inputs["Emission Strength"].default_value = strength
    return m


def external(role, ue_material):
    """Slot that uses an existing UE material (memory FX glass, etc.): no bake, assigned by path on import."""
    m = bpy.data.materials.new(f"M_{role}")
    m["hero"] = {"role": role, "metal": 0.0, "emissive": False, "external": ue_material}
    m.use_nodes = True
    m.node_tree.nodes["Principled BSDF"].inputs["Alpha"].default_value = 0.15
    return m


# ------------------------------------------------------------------ geometry
def _obj(name, bm, material):
    me = bpy.data.meshes.new(name)
    bm.to_mesh(me)
    bm.free()
    ob = bpy.data.objects.new(name, me)
    bpy.context.scene.collection.objects.link(ob)
    me.materials.append(material)
    for p in me.polygons:
        p.use_smooth = True
    return ob


def _rounded_outline(w, l, r, seg):
    r = min(r, w / 2 - 1e-5, l / 2 - 1e-5)
    pts = []
    for cx, cy, a0 in ((w / 2 - r, l / 2 - r, 0), (-w / 2 + r, l / 2 - r, 90), (-w / 2 + r, -l / 2 + r, 180),
                       (w / 2 - r, -l / 2 + r, 270)):
        for i in range(seg + 1):
            a = math.radians(a0 + 90.0 * i / seg)
            pts.append((cx + r * math.cos(a), cy + r * math.sin(a)))
    return pts


def rounded_slab(name, w, l, t, r_corner, r_edge, material, z0=0.0, seg=16, edge_seg=6, loc=(0, 0)):
    """Box-like slab w (x) by l (y) by t (z) with round corners in plan and rounded top/bottom edges."""
    bm = bmesh.new()
    pts = _rounded_outline(w, l, r_corner, seg)
    bot = [bm.verts.new((x + loc[0], y + loc[1], z0)) for x, y in pts]
    face = bm.faces.new(bot)
    ext = bmesh.ops.extrude_face_region(bm, geom=[face])
    top = [v for v in ext["geom"] if isinstance(v, bmesh.types.BMVert)]
    bmesh.ops.translate(bm, verts=top, vec=(0, 0, t))
    bmesh.ops.recalc_face_normals(bm, faces=bm.faces)
    if r_edge > 0:
        ring = [e for e in bm.edges if all(abs(v.co.z - z0) < 1e-7 or abs(v.co.z - z0 - t) < 1e-7 for v in e.verts)
                and abs(e.verts[0].co.z - e.verts[1].co.z) < 1e-7]
        bmesh.ops.bevel(bm, geom=ring, offset=min(r_edge, t / 2 - 1e-5), segments=edge_seg, profile=0.5,
                        affect="EDGES", clamp_overlap=True)
    _triangulate_caps(bm)
    return _obj(name, bm, material)


def _triangulate_caps(bm):
    """Big n-gon caps -> fan from the centroid (even triangles; ear-clipping left long slivers whose AO bake
    showed as dark lines across table tops)."""
    big = [f for f in bm.faces if len(f.verts) > 8]
    if big:
        bmesh.ops.poke(bm, faces=big)


def cylinder(name, r, h, material, loc=(0, 0, 0), seg=64, r_edge=0.0, edge_seg=4, axis="Z"):
    """Closed cylinder standing on loc (base centre), optional rounded rims."""
    bm = bmesh.new()
    bmesh.ops.create_cone(bm, cap_ends=True, cap_tris=False, segments=seg, radius1=r, radius2=r, depth=h)
    bmesh.ops.translate(bm, verts=bm.verts, vec=(0, 0, h / 2))
    if r_edge > 0:
        rims = [e for e in bm.edges if abs(e.verts[0].co.z - e.verts[1].co.z) < 1e-7 and
                (abs(e.verts[0].co.z) < 1e-7 or abs(e.verts[0].co.z - h) < 1e-7)]
        bmesh.ops.bevel(bm, geom=rims, offset=min(r_edge, h / 2 - 1e-5, r - 1e-5), segments=edge_seg, profile=0.5,
                        affect="EDGES", clamp_overlap=True)
    _triangulate_caps(bm)
    if axis != "Z":
        rot = {"X": (math.radians(90), "Y"), "Y": (math.radians(-90), "X")}[axis]
        bmesh.ops.rotate(bm, verts=bm.verts, cent=(0, 0, 0),
                         matrix=__import__("mathutils").Matrix.Rotation(rot[0], 3, rot[1]))
    bmesh.ops.translate(bm, verts=bm.verts, vec=loc)
    return _obj(name, bm, material)


def lathe(name, profile, material, loc=(0, 0, 0), seg=64):
    """Turned part: profile [(radius, z), ...] bottom to top, spun around Z; ends on the axis are closed."""
    bm = bmesh.new()
    rings = []
    for r, z in profile:
        if r < 1e-6:
            rings.append([bm.verts.new((0.0, 0.0, z))])
            continue
        rings.append([bm.verts.new((r * math.cos(2 * math.pi * i / seg), r * math.sin(2 * math.pi * i / seg), z))
                      for i in range(seg)])
    for a, b in zip(rings, rings[1:]):
        if len(a) == 1 and len(b) == 1:
            continue
        for i in range(seg):
            j = (i + 1) % seg
            if len(a) == 1:
                bm.faces.new((a[0], b[i], b[j]))
            elif len(b) == 1:
                bm.faces.new((a[i], b[0], a[j]))
            else:
                bm.faces.new((a[i], a[j], b[j], b[i]))
    bmesh.ops.recalc_face_normals(bm, faces=bm.faces)
    bmesh.ops.translate(bm, verts=bm.verts, vec=loc)
    return _obj(name, bm, material)


def arc(cx, cz, r, a0, a1, n=10):
    """Profile points on a circle (degrees, 0 = +radius, 90 = +z) for lathe() — balls, collars, rounded feet."""
    return [(cx + r * math.cos(math.radians(a0 + (a1 - a0) * i / n)), cz + r * math.sin(math.radians(a0 + (a1 - a0) * i / n)))
            for i in range(n + 1)]


def extrude_outline(name, pts, thickness, material, plane="XZ", bevel=0.0, seg=3):
    """Flat outline [(u, v), ...] extruded symmetrically along the plane normal, optional rounded edges."""
    bm = bmesh.new()
    if plane == "XZ":
        vs = [bm.verts.new((u, -thickness / 2, v)) for u, v in pts]
        vec = (0, thickness, 0)
    else:
        vs = [bm.verts.new((u, v, 0.0)) for u, v in pts]
        vec = (0, 0, thickness)
    f = bm.faces.new(vs)
    ext = bmesh.ops.extrude_face_region(bm, geom=[f])
    bmesh.ops.translate(bm, verts=[v for v in ext["geom"] if isinstance(v, bmesh.types.BMVert)], vec=vec)
    bmesh.ops.recalc_face_normals(bm, faces=bm.faces)
    if bevel > 0:
        caps = [e for e in bm.edges if len(e.link_faces) == 2 and
                abs(e.link_faces[0].normal.dot(e.link_faces[1].normal)) < 0.5]
        bmesh.ops.bevel(bm, geom=caps, offset=bevel, segments=seg, profile=0.5, affect="EDGES", clamp_overlap=True)
    _triangulate_caps(bm)
    return _obj(name, bm, material)


def facade_panes(name, box_min, box_max, floor_h, bay_w, pane_w, pane_h, sill, material, rnd=None, keep=None,
                 proud=0.01):
    """Window panes on all four sides of an axis-aligned box as ONE mesh (thousands of windows, one object).

    keep(side, floor, bay) -> bool decides which panes go in this mesh (e.g. lit vs dark windows).
    """
    bm = bmesh.new()
    (x0, y0, z0), (x1, y1, z1) = box_min, box_max
    floors = int((z1 - z0 - sill) // floor_h)
    sides = (("+y", (x0, x1), y1 + proud), ("-y", (x0, x1), y0 - proud), ("+x", (y0, y1), x1 + proud), ("-x", (y0, y1), x0 - proud))
    for side, (a0, a1), c in sides:
        bays = max(1, int((a1 - a0) // bay_w))
        pad = ((a1 - a0) - bays * bay_w) / 2
        for f in range(floors):
            zb = z0 + sill + f * floor_h
            for b in range(bays):
                if keep and not keep(side, f, b):
                    continue
                ac = a0 + pad + (b + 0.5) * bay_w
                us = (ac - pane_w / 2, ac + pane_w / 2)
                if side in ("+y", "-y"):
                    pts = [(us[0], c, zb), (us[1], c, zb), (us[1], c, zb + pane_h), (us[0], c, zb + pane_h)]
                else:
                    pts = [(c, us[0], zb), (c, us[1], zb), (c, us[1], zb + pane_h), (c, us[0], zb + pane_h)]
                vs = [bm.verts.new(p) for p in pts]
                f_ = bm.faces.new(vs)
                f_.normal_update()
                outward = {"+y": (0, 1), "-y": (0, -1), "+x": (1, 0), "-x": (-1, 0)}[side]
                if f_.normal.x * outward[0] + f_.normal.y * outward[1] < 0:
                    f_.normal_flip()
    uv = bm.loops.layers.uv.new("UVMap")
    for f_ in bm.faces:
        for loop, c_ in zip(f_.loops, ((0, 0), (1, 0), (1, 1), (0, 1))):
            loop[uv].uv = c_
    return _obj(name, bm, material)


def quad(name, w, l, z, material, loc=(0, 0)):
    """Flat rectangle facing +Z with exact 0..1 UVs (screens, labels)."""
    bm = bmesh.new()
    vs = [bm.verts.new((loc[0] + x, loc[1] + y, z)) for x, y in ((-w / 2, -l / 2), (w / 2, -l / 2), (w / 2, l / 2), (-w / 2, l / 2))]
    f = bm.faces.new(vs)
    uv = bm.loops.layers.uv.new("UVMap")
    for loop, c in zip(f.loops, ((0, 0), (1, 0), (1, 1), (0, 1))):
        loop[uv].uv = c
    return _obj(name, bm, material)


def subdivide(ob, cuts=1):
    """Densify flat areas (Nanite budget, smooth shading of bumps)."""
    bm = bmesh.new()
    bm.from_mesh(ob.data)
    bmesh.ops.subdivide_edges(bm, edges=bm.edges, cuts=cuts, use_grid_fill=True)
    bm.to_mesh(ob.data)
    bm.free()


# ------------------------------------------------------------------ bake + export
def _select(objs):
    bpy.ops.object.select_all(action="DESELECT")
    for o in objs:
        o.select_set(True)
    bpy.context.view_layer.objects.active = objs[0]


def _join(objs, name):
    if len(objs) == 1:
        objs[0].name = name
        return objs[0]
    _select(objs)
    bpy.ops.object.join()
    ob = bpy.context.view_layer.objects.active
    ob.name = name
    return ob


def _bake_material(ob, m, kit, slot):
    """Bake BaseColor / Normal / AO / Roughness of material m on ob into 2K images; returns texture paths."""
    nt = m.node_tree
    out = {}

    def target(tag, colorspace):
        img = bpy.data.images.new(f"T_{kit}_{slot}_{tag}", RES, RES, alpha=False, float_buffer=False)
        img.colorspace_settings.name = colorspace
        node = nt.nodes.new("ShaderNodeTexImage")
        node.image = img
        nt.nodes.active = node
        return img, node

    sc = bpy.context.scene
    _select([ob])
    bk = sc.render.bake
    bk.margin = 16
    imgs = {}
    bsdf = nt.nodes["Principled BSDF"]
    mout = nt.nodes["Material Output"]
    for tag, btype, cs in (("BaseColor", "EMIT", "sRGB"), ("Normal", "NORMAL", "Non-Color"),
                           ("AO", "AO", "Non-Color"), ("Roughness", "ROUGHNESS", "Non-Color")):
        img, node = target(tag, cs)
        if tag == "BaseColor":
            # a DIFFUSE colour bake is black for metals (no diffuse lobe): route the albedo graph through an
            # Emission shader instead and bake EMIT, which is the plain colour for every material
            src = bsdf.inputs["Base Color"].links[0].from_socket
            emit = nt.nodes.new("ShaderNodeEmission")
            nt.links.new(src, emit.inputs["Color"])
            nt.links.new(emit.outputs["Emission"], mout.inputs["Surface"])
        bpy.ops.object.bake(type=btype)
        if tag == "BaseColor":
            nt.links.new(bsdf.outputs["BSDF"], mout.inputs["Surface"])
            nt.nodes.remove(emit)
        imgs[tag] = img
        nt.nodes.remove(node)
    os.makedirs(OUT, exist_ok=True)

    def px(img):
        return np.array(img.pixels[:], np.float32).reshape(RES, RES, 4)

    for tag in ("BaseColor", "Normal"):
        p = os.path.join(OUT, f"T_{kit}_{slot}_{tag}.png")
        imgs[tag].filepath_raw = p
        imgs[tag].file_format = "PNG"
        imgs[tag].save()
        out[tag] = p
    arm = np.ones((RES, RES, 4), np.float32)
    arm[..., 0] = px(imgs["AO"])[..., 0]
    arm[..., 1] = px(imgs["Roughness"])[..., 0]
    arm[..., 2] = float(m["hero"]["metal"])
    a = bpy.data.images.new(f"T_{kit}_{slot}_ARM", RES, RES, alpha=False)
    a.colorspace_settings.name = "Non-Color"
    a.pixels = arm.ravel()
    p = os.path.join(OUT, f"T_{kit}_{slot}_ARM.png")
    a.filepath_raw = p
    a.file_format = "PNG"
    a.save()
    out["ARM"] = p
    return out


def _use_baked(m, tex):
    """Replace the procedural graph with the baked maps (as UE will render them)."""
    nt = m.node_tree
    for n in list(nt.nodes):
        if n.type not in ("BSDF_PRINCIPLED", "OUTPUT_MATERIAL"):
            nt.nodes.remove(n)
    bsdf = nt.nodes["Principled BSDF"]

    def img(tag, cs):
        n = nt.nodes.new("ShaderNodeTexImage")
        n.image = bpy.data.images.load(tex[tag], check_existing=True)
        n.image.colorspace_settings.name = cs
        return n

    nt.links.new(img("BaseColor", "sRGB").outputs["Color"], bsdf.inputs["Base Color"])
    sep = nt.nodes.new("ShaderNodeSeparateColor")
    nt.links.new(img("ARM", "Non-Color").outputs["Color"], sep.inputs["Color"])
    nt.links.new(sep.outputs["Green"], bsdf.inputs["Roughness"])
    nt.links.new(sep.outputs["Blue"], bsdf.inputs["Metallic"])
    nm = nt.nodes.new("ShaderNodeNormalMap")
    nt.links.new(img("Normal", "Non-Color").outputs["Color"], nm.inputs["Color"])
    nt.links.new(nm.outputs["Normal"], bsdf.inputs["Normal"])


def check_contacts(parts, max_gap=0.001):
    """Claude D28 自查：任意两个零件最近距离 > max_gap (1 mm) 就报错（零件必须接触/嵌入）。"""
    import bmesh
    from mathutils.bvhtree import BVHTree
    if len(parts) < 2:
        return
    trees = []
    for ob in parts:
        bm = bmesh.new()
        bm.from_mesh(ob.data)
        bm.transform(ob.matrix_world)
        trees.append(BVHTree.FromBMesh(bm))
    problems = []
    for i in range(len(parts)):
        for j in range(i + 1, len(parts)):
            best = 1e9
            for v in parts[i].data.vertices:
                point = parts[i].matrix_world @ v.co
                hit = trees[j].find_nearest(point)[0]
                if hit is not None:
                    best = min(best, (hit - point).length)
            for v in parts[j].data.vertices:
                point = parts[j].matrix_world @ v.co
                hit = trees[i].find_nearest(point)[0]
                if hit is not None:
                    best = min(best, (hit - point).length)
            if best > max_gap:
                problems.append((parts[i].name, parts[j].name, round(best, 4)))
    if problems:
        raise RuntimeError(f"check_contacts: {len(problems)} gaps > {max_gap*1000:.0f} mm: {problems[:10]}")


def finish(kit, parts, dims, note=""):
    """Group parts by material, UV + bake each group, join into SM_<kit>, export FBX + textures + manifest."""
    groups = {}
    for p in parts:
        groups.setdefault(p.data.materials[0].name, []).append(p)
    baked, slots = [], []
    for mname, objs in groups.items():
        m = bpy.data.materials[mname]
        slot = m["hero"]["role"]
        ob = _join(objs, f"G_{slot}")
        info = {"slot": slot, "material": mname}
        if m["hero"].get("external"):
            info["Material"] = m["hero"]["external"]
        elif m["hero"]["emissive"]:
            info.update({"Emissive": m["hero"]["image"], "strength": m["hero"]["strength"]})
        else:
            _select([ob])
            bpy.ops.object.mode_set(mode="EDIT")
            bpy.ops.mesh.select_all(action="SELECT")
            bpy.ops.uv.smart_project(angle_limit=math.radians(60), island_margin=0.004, area_weight=0.0)
            bpy.ops.object.mode_set(mode="OBJECT")
            info.update(_bake_material(ob, m, kit, slot))
            _use_baked(m, info)                 # the preview then shows the bake, not the procedural graph
        baked.append(ob)
        slots.append(info)
        print(f"[hero] {kit}: slot {slot} done", flush=True)
    final = _join(baked, f"SM_{kit}")
    tris = sum(len(p.vertices) - 2 for p in final.data.polygons)
    bb = np.array([v.co[:] for v in final.data.vertices])
    size = (bb.max(0) - bb.min(0)).round(4).tolist()
    os.makedirs(OUT, exist_ok=True)
    _select([final])
    fbx = os.path.join(OUT, f"SM_{kit}.fbx")
    bpy.ops.export_scene.fbx(filepath=fbx, use_selection=True, apply_unit_scale=True, apply_scale_options="FBX_SCALE_UNITS",
                             axis_forward="-Z", axis_up="Y", mesh_smooth_type="FACE", add_leaf_bones=False,
                             path_mode="STRIP")         # same axes as kit_common.py
    manifest = {"kit": kit, "fbx": fbx, "triangles": tris, "size_m": size, "dims_target_m": list(dims),
                "slots": [{k: (os.path.basename(v) if k in ("BaseColor", "Normal", "ARM", "Emissive") else v)
                           for k, v in s.items()} for s in slots],
                "texture_res": RES, "normal_convention": "OpenGL (flip green in UE)", "note": note}
    json.dump(manifest, open(os.path.join(OUT, f"SM_{kit}.hero.json"), "w"), indent=1)
    _preview(final, kit)
    print(f"HERO DONE {kit} tris {tris} size {size}", flush=True)
    return final


def _preview(ob, kit):
    """Studio render of the finished prop with its baked maps -> preview/<kit>.png."""
    import mathutils
    sc = bpy.context.scene
    bb = np.array([ob.matrix_world @ v.co for v in ob.data.vertices])
    c = (bb.max(0) + bb.min(0)) / 2
    ext = float(np.linalg.norm(bb.max(0) - bb.min(0)))
    cam = bpy.data.objects.new("cam", bpy.data.cameras.new("cam"))
    sc.collection.objects.link(cam)
    d = mathutils.Vector((0.9, 1.4, 0.9)).normalized() * ext * 1.9      # props face +Y
    cam.location = mathutils.Vector(c.tolist()) + d
    cam.rotation_euler = (-d).to_track_quat("-Z", "Y").to_euler()
    cam.data.lens = 70
    sc.camera = cam
    for loc, e, s in (((2, -2, 3), 600, 2.0), ((-3, -1, 2), 200, 3.0), ((0, 3, 2), 300, 1.5)):
        li = bpy.data.objects.new("l", bpy.data.lights.new("l", "AREA"))
        li.data.energy = e * ext ** 2
        li.data.size = s * ext
        li.location = mathutils.Vector(c.tolist()) + mathutils.Vector(loc) * ext
        li.rotation_euler = (mathutils.Vector(c.tolist()) - li.location).to_track_quat("-Z", "Y").to_euler()
        sc.collection.objects.link(li)
    w = bpy.data.worlds.new("w")
    w.use_nodes = True
    w.node_tree.nodes["Background"].inputs["Color"].default_value = (0.16, 0.17, 0.19, 1)   # metals need surroundings
    sc.world = w
    sc.render.resolution_x = sc.render.resolution_y = 1400
    sc.cycles.samples = 96
    os.makedirs(os.path.join(OUT, "preview"), exist_ok=True)
    sc.render.filepath = os.path.join(OUT, "preview", f"{kit}.png")
    bpy.ops.render.render(write_still=True)
