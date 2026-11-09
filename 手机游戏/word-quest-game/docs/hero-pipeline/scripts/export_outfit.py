"""Export the code-built outfit in the same real-scale frame as export_metahuman_input.py.

Usage: Blender -b fit/<who>_clothes.blend -P export_outfit.py -- <who> <export_dir>
Writes <export>/<who>_outfit.fbx (one mesh per garment, materials kept) and <who>_outfit_info.json.
Frame: metres, feet at 0, Blender -Y = face (FBX import into UE flips Y -> face toward UE +Y), so the
garments line up with <who>_body.fbx and with the conformed MetaHuman.
"""
import bpy, sys, os, json
import numpy as np

a = sys.argv[sys.argv.index("--") + 1:]
WHO, EXP = a[0], a[1]
os.makedirs(EXP, exist_ok=True)
H_REAL = float(os.environ.get("HEIGHT_M") or {"male": 1.84, "female": 1.68}.get(WHO, 1.75))

body = bpy.data.objects["Human"]
saved = [(m, m.show_viewport) for m in body.modifiers]
for m, _ in saved:
    m.show_viewport = False
bpy.context.view_layer.update()
ev = body.evaluated_get(bpy.context.evaluated_depsgraph_get())
V = np.array([(body.matrix_world @ v.co)[:] for v in ev.data.vertices])
gid = body.vertex_groups["body"].index
keep = np.array([any(g.group == gid and g.weight > 0.5 for g in v.groups) for v in body.data.vertices])
for m, vis in saved:
    m.show_viewport = vis
zmin, zmax = V[keep, 2].min(), V[keep, 2].max()
K = H_REAL / (zmax - zmin)

garments = [o for o in bpy.data.objects if o.type in ("MESH", "CURVE") and o is not body and o.parent is not body
            and not o.name.endswith("high-poly") and "helper" not in o.name.lower()]
garments += [o for o in bpy.data.objects if o.type == "MESH" and o.parent is body
             and not o.name.endswith("high-poly") and o not in garments]
info = []
dg = bpy.context.evaluated_depsgraph_get()
for o in bpy.data.objects:
    o.select_set(False)
for o in garments:
    # bake modifiers / parenting into plain meshes in world space, then to the real-scale frame
    me = bpy.data.meshes.new_from_object(o.evaluated_get(dg), depsgraph=dg)
    me.transform(o.matrix_world)
    co = np.zeros(len(me.vertices) * 3); me.vertices.foreach_get("co", co); co = co.reshape(-1, 3)
    co[:, 0] *= K; co[:, 1] *= K; co[:, 2] = (co[:, 2] - zmin) * K
    me.vertices.foreach_set("co", co.ravel()); me.update()
    for i, m_ in enumerate(o.data.materials if hasattr(o.data, "materials") else []):
        if i >= len(me.materials):
            me.materials.append(m_)
    no = bpy.data.objects.new(o.name + "_export", me)
    bpy.context.scene.collection.objects.link(no)
    no.select_set(True)
    info.append({"name": o.name, "verts": len(me.vertices), "faces": len(me.polygons),
                 "materials": [m_.name for m_ in me.materials if m_]})
    print("garment", o.name, len(me.vertices), "verts", flush=True)
out = os.path.join(EXP, f"{WHO}_outfit.fbx")
bpy.ops.export_scene.fbx(filepath=out, use_selection=True, apply_unit_scale=True, add_leaf_bones=False,
                         mesh_smooth_type="FACE", path_mode="STRIP")
json.dump({"garments": info, "height_m": H_REAL, "frame": "same as <who>_body.fbx (metres, feet at 0, face -Y)"},
          open(os.path.join(EXP, f"{WHO}_outfit_info.json"), "w"), indent=1)
print("OUTFIT DONE", out, os.path.getsize(out) // 1024, "KB", flush=True)
