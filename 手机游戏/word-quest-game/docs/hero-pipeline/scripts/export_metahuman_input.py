"""Export the fitted (target fit + RBF refine) neutral head/body as MetaHuman conform input.

Usage: Blender -b fit/<who>_fit.blend -P export_metahuman_input.py -- <who> <out_dir>
Writes, at real scale (male 1.84 m, female 1.68 m), Z-up metres converted by the exporters:
  <out>/<who>_head.obj        head + neck only (body group, no helper geometry), neutral expression
  <out>/<who>_body.fbx        full neutral body (same mesh), for MetaHuman body conform / clothes
  <out>/<who>_skin_face.png   photo-projected skin texture (if present)
  <out>/<who>_landmarks.json  468 fitted 3D landmarks at export scale (for alignment checks)
"""
import bpy, sys, os, json, shutil
import numpy as np

a = sys.argv[sys.argv.index("--") + 1:]
WHO, OUT = a[0], a[1]
os.makedirs(OUT, exist_ok=True)
FIT = os.path.dirname(bpy.data.filepath)
H_REAL = {"male": 1.84, "female": 1.68}[WHO]

src = bpy.data.objects["Human"]
for o in list(bpy.data.objects):
    if o != src:
        bpy.data.objects.remove(o, do_unlink=True)
bpy.context.view_layer.objects.active = src
src.select_set(True)
for m in list(src.modifiers):
    src.modifiers.remove(m)
bpy.ops.object.shape_key_remove(all=True, apply_mix=True)

# drop helper geometry: keep only the "body" vertex group
gid = src.vertex_groups["body"].index
keep = np.zeros(len(src.data.vertices), bool)
for v in src.data.vertices:
    keep[v.index] = any(g.group == gid and g.weight > 0.5 for g in v.groups)
bpy.ops.object.mode_set(mode="EDIT"); bpy.ops.mesh.select_all(action="DESELECT"); bpy.ops.object.mode_set(mode="OBJECT")
for v in src.data.vertices:
    v.select = not keep[v.index]
bpy.ops.object.mode_set(mode="EDIT"); bpy.ops.mesh.delete(type="VERT"); bpy.ops.object.mode_set(mode="OBJECT")

# real-world scale, feet on the ground
bpy.ops.object.transform_apply(location=True, rotation=True, scale=True)
V = np.array([v.co[:] for v in src.data.vertices])
zmin, zmax = V[:, 2].min(), V[:, 2].max()
k = H_REAL / (zmax - zmin)
for v in src.data.vertices:
    v.co.x *= k; v.co.y *= k; v.co.z = (v.co.z - zmin) * k
src.data.update()
print("scale", round(k, 4), "height", H_REAL, "verts", len(src.data.vertices), flush=True)

lm_path = os.path.join(FIT, f"{WHO}_lm3d.json")
if os.path.exists(lm_path):
    lm = {kk: [p[0] * k, p[1] * k, (p[2] - zmin) * k] for kk, p in json.load(open(lm_path)).items()}
    json.dump(lm, open(os.path.join(OUT, f"{WHO}_landmarks.json"), "w"))
tex = os.path.join(FIT, f"{WHO}_skin_face.png")
if os.path.exists(tex):
    shutil.copy(tex, os.path.join(OUT, f"{WHO}_skin_face.png"))

bpy.ops.export_scene.fbx(filepath=os.path.join(OUT, f"{WHO}_body.fbx"), use_selection=True,
                         apply_unit_scale=True, bake_space_transform=False, add_leaf_bones=False,
                         mesh_smooth_type="FACE", path_mode="STRIP")

# head + neck: everything above the shoulder line (top 15% of the height)
z_cut = H_REAL * 0.85
bpy.ops.object.mode_set(mode="EDIT"); bpy.ops.mesh.select_all(action="DESELECT"); bpy.ops.object.mode_set(mode="OBJECT")
for v in src.data.vertices:
    v.select = v.co.z < z_cut
bpy.ops.object.mode_set(mode="EDIT"); bpy.ops.mesh.delete(type="VERT"); bpy.ops.object.mode_set(mode="OBJECT")
bpy.ops.wm.obj_export(filepath=os.path.join(OUT, f"{WHO}_head.obj"), export_selected_objects=True,
                      export_materials=False, forward_axis="NEGATIVE_Y", up_axis="Z")
print("head verts", len(src.data.vertices), "EXPORT DONE", flush=True)
