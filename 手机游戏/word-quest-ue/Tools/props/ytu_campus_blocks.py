"""Claude · Yantai University main campus massing from OpenStreetMap (Docs/tasks/round7-ytu-memory-world.md).

Reads Content/Data/world/ytu_north_osm.json (metres, x east / y north, OSM ODbL) and writes, per building,
one FBX whose pivot is the footprint centroid at ground level, plus ground meshes (campus paving, roads,
lawns, the lake) and a manifest the UE importer places from. Material slots: "wall", "trim" (cornice band
and parapet cap — the campus's red-orange eaves), "roof", "paving", "road", "grass", "water".

  /Applications/Blender.app/Contents/MacOS/Blender -b --factory-startup -P Tools/props/ytu_campus_blocks.py
Output: SourceArt/YTU/blocks/*.fbx + SourceArt/YTU/blocks/manifest.json
Massing only: the landmarks (clock tower, library, canteen 7, pavilion, bridge, gates) are replaced later by
photo-matched hero models, keyed by OSM id.
"""
import json
import math
import os
import sys

import bmesh
import bpy

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
SRC = os.path.join(ROOT, "Content/Data/world/ytu_north_osm.json")
OUT = os.path.join(ROOT, "SourceArt/YTU/blocks")
STOREY = 3.6            # m per level (1980s–90s campus buildings: 3.3–3.9 m)
PARAPET = 0.6
CORNICE = 0.45
ROAD_WIDTH = {"primary": 14.0, "secondary": 11.0, "tertiary": 8.0, "residential": 6.0, "unclassified": 6.0,
              "service": 4.5, "footway": 3.0, "path": 2.5, "pedestrian": 6.0, "cycleway": 2.5, "steps": 2.5}


def clean():
    bpy.ops.wm.read_factory_settings(use_empty=True)


def material(name, rgb):
    m = bpy.data.materials.get(name) or bpy.data.materials.new(name)
    m.diffuse_color = (*rgb, 1.0)
    return m


COLOURS = {"wall": (0.80, 0.70, 0.52), "trim": (0.62, 0.24, 0.14), "roof": (0.35, 0.35, 0.36),
           "paving": (0.55, 0.40, 0.33), "road": (0.22, 0.22, 0.23), "grass": (0.25, 0.42, 0.18), "water": (0.15, 0.30, 0.38)}
MATS = {}               # created after the factory reset in main()


def polygon_area(pts):
    return 0.5 * sum(a[0] * b[1] - b[0] * a[1] for a, b in zip(pts, pts[1:] + pts[:1]))


def ring(f):
    pts = [tuple(p) for p in f["pts"]]
    if len(pts) > 1 and pts[0] == pts[-1]:
        pts = pts[:-1]
    if polygon_area(pts) < 0:
        pts.reverse()                     # counter-clockwise, so extruded faces point outward
    return pts


def levels(f):
    try:
        return max(1, int(float(f.get("levels") or 0)))
    except ValueError:
        return 0


def default_levels(f, c):
    if f["name"] and "楼" in f["name"] and "教学" in f["name"]:
        return 5
    return 6 if c[1] > 330 else 4          # the dorm blocks north of the teaching area are 6 storeys


def box_uv(bm, scale=1.0):
    """World-scale box projection (1 UV unit = 1 m) so tiling textures keep texel density on every block."""
    uv = bm.loops.layers.uv.verify()
    for face in bm.faces:
        n = face.normal
        ax = max(range(3), key=lambda i: abs(n[i]))
        for loop in face.loops:
            co = loop.vert.co
            u, v = ((co.y, co.z) if ax == 0 else (co.x, co.z) if ax == 1 else (co.x, co.y))
            loop[uv].uv = (u * scale, v * scale)


def extrude_building(f, idx):
    pts = ring(f)
    if len(pts) < 3:
        return None
    cx = sum(p[0] for p in pts) / len(pts)
    cy = sum(p[1] for p in pts) / len(pts)
    lv = levels(f) or default_levels(f, (cx, cy))
    h = lv * STOREY
    mesh = bpy.data.meshes.new(f"B_{f['id']}")
    obj = bpy.data.objects.new(mesh.name, mesh)
    bpy.context.collection.objects.link(obj)
    for m in ("wall", "trim", "roof"):
        obj.data.materials.append(MATS[m])
    bm = bmesh.new()
    base = [bm.verts.new((x - cx, y - cy, 0.0)) for x, y in pts]
    bm.faces.new(base)
    bm.faces.ensure_lookup_table()
    floor = bm.faces[0]
    # three stacked extrusions: wall to the cornice, the cornice band, the parapet; then the roof inset
    top = floor
    for height, slot in ((h - CORNICE, 0), (CORNICE, 1), (PARAPET, 1)):
        r = bmesh.ops.extrude_face_region(bm, geom=[top])
        verts = [e for e in r["geom"] if isinstance(e, bmesh.types.BMVert)]
        bmesh.ops.translate(bm, vec=(0, 0, height), verts=verts)
        top = next(e for e in r["geom"] if isinstance(e, bmesh.types.BMFace))
        for e in r["geom"]:
            if isinstance(e, bmesh.types.BMFace) and e is not top:
                e.material_index = slot
    inset = bmesh.ops.inset_region(bm, faces=[top], thickness=0.35)
    for face in inset["faces"]:
        face.material_index = 1
    r = bmesh.ops.extrude_face_region(bm, geom=[top])
    verts = [e for e in r["geom"] if isinstance(e, bmesh.types.BMVert)]
    bmesh.ops.translate(bm, vec=(0, 0, -PARAPET), verts=verts)
    for e in r["geom"]:
        if isinstance(e, bmesh.types.BMFace):
            e.material_index = 1
    top.material_index = 2
    bmesh.ops.delete(bm, geom=[floor], context="FACES")      # never seen; keeps triangle count down
    bmesh.ops.recalc_face_normals(bm, faces=bm.faces)
    box_uv(bm)
    bm.to_mesh(mesh)
    bm.free()
    return obj, {"id": f["id"], "name": f["name"], "levels": lv, "height_m": round(h + PARAPET, 2),
                 "centroid_m": [round(cx, 2), round(cy, 2)], "area_m2": round(polygon_area(pts), 1)}


def flat_polygon(name, pts, z, mat):
    mesh = bpy.data.meshes.new(name)
    obj = bpy.data.objects.new(name, mesh)
    bpy.context.collection.objects.link(obj)
    obj.data.materials.append(MATS[mat])
    bm = bmesh.new()
    vs = [bm.verts.new((x, y, z)) for x, y in pts]
    try:
        face = bm.faces.new(vs)
        bmesh.ops.triangulate(bm, faces=[face])
    except ValueError:
        pass
    box_uv(bm)
    bm.to_mesh(mesh)
    bm.free()
    return obj


def road_ribbon(name, pts, width, z):
    mesh = bpy.data.meshes.new(name)
    obj = bpy.data.objects.new(name, mesh)
    bpy.context.collection.objects.link(obj)
    obj.data.materials.append(MATS["road" if width >= 4.5 else "paving"])
    bm = bmesh.new()
    left, right = [], []
    for i, (x, y) in enumerate(pts):
        a = pts[max(i - 1, 0)]
        b = pts[min(i + 1, len(pts) - 1)]
        dx, dy = b[0] - a[0], b[1] - a[1]
        n = math.hypot(dx, dy) or 1.0
        nx, ny = -dy / n * width / 2, dx / n * width / 2
        left.append(bm.verts.new((x + nx, y + ny, z)))
        right.append(bm.verts.new((x - nx, y - ny, z)))
    for i in range(len(pts) - 1):
        bm.faces.new((left[i], right[i], right[i + 1], left[i + 1]))
    box_uv(bm)
    bm.to_mesh(mesh)
    bm.free()
    return obj


def export(objs, path):
    bpy.ops.object.select_all(action="DESELECT")
    for o in objs:
        o.select_set(True)
    bpy.context.view_layer.objects.active = objs[0]
    bpy.ops.export_scene.fbx(filepath=path, use_selection=True, apply_unit_scale=True,
                             apply_scale_options="FBX_SCALE_UNITS", axis_forward="-Z", axis_up="Y",
                             mesh_smooth_type="FACE", add_leaf_bones=False, path_mode="STRIP")


def main():
    data = json.load(open(SRC, encoding="utf-8"))
    os.makedirs(OUT, exist_ok=True)
    clean()
    MATS.update({k: material(k, c) for k, c in COLOURS.items()})
    manifest = {"source": data["source"], "origin_latlon": data["origin_latlon"], "storey_m": STOREY,
                "buildings": [], "ground": []}
    campus = next((f for f in data["features"] if f["kind"] == "campus"), None)
    for i, f in enumerate(f for f in data["features"] if f["kind"] == "building"):
        made = extrude_building(f, i)
        if not made:
            continue
        obj, info = made
        path = os.path.join(OUT, f"SM_YTU_B_{f['id']}.fbx")
        export([obj], path)
        info["fbx"] = os.path.basename(path)
        manifest["buildings"].append(info)
        bpy.data.objects.remove(obj)
    ground = []
    if campus:
        ground.append(flat_polygon("G_campus", ring(campus), 0.0, "paving"))
    for f in data["features"]:
        if f["kind"] == "leisure" and len(f["pts"]) > 3:
            ground.append(flat_polygon(f"G_lawn_{f['id']}", ring(f), 0.03, "grass"))
        elif f["kind"] == "water":
            ground.append(flat_polygon(f"G_water_{f['id']}", ring(f), 0.06, "water"))
        elif f["kind"] == "road" and len(f["pts"]) > 1:
            w = ROAD_WIDTH.get(f.get("highway", ""), 4.0)
            ground.append(road_ribbon(f"G_road_{f['id']}", [tuple(p) for p in f["pts"]], w, 0.045))
    export(ground, os.path.join(OUT, "SM_YTU_Ground.fbx"))
    manifest["ground"] = [o.name for o in ground]
    json.dump(manifest, open(os.path.join(OUT, "manifest.json"), "w"), ensure_ascii=False, indent=1)
    print(f"YTU_BLOCKS_DONE buildings={len(manifest['buildings'])} ground={len(ground)}")


main()
sys.exit(0)
