"""Turn the noodle-like generated hair into a clean sculpted hair mass.

Usage: Blender -b <who>_head.blend -P clean_hair.py -- <who> <out_dir>
Hair is found by the projected albedo colour; those vertices (dilated) are relaxed with a
volume-preserving Laplacian smooth, and the inside of the hair shell is filled by a voxel remesh
of the hair region only.
"""
import bpy, bmesh, sys, os, math, colorsys
import numpy as np
from mathutils import Vector

a = sys.argv[sys.argv.index("--") + 1:]
WHO, OUT = a[0], a[1]
SUFFIX = a[2] if len(a) > 2 else ""
obj = next(o for o in bpy.data.objects if o.type == "MESH")
me = obj.data
img = next(n.image for n in obj.active_material.node_tree.nodes if n.type == "TEX_IMAGE" and n.image)
W, H = img.size
px = np.array(img.pixels[:], dtype=np.float32).reshape(H, W, 4)[..., :3]

uv = me.uv_layers.active.data
vcol = np.zeros((len(me.vertices), 3), np.float32); cnt = np.zeros(len(me.vertices), np.float32)
for loop in me.loops:
    u, v = uv[loop.index].uv
    c = px[min(H - 1, max(0, int(v * H))), min(W - 1, max(0, int(u * W)))]
    vcol[loop.vertex_index] += c; cnt[loop.vertex_index] += 1
vcol /= np.maximum(cnt[:, None], 1)

hsv = np.array([colorsys.rgb_to_hsv(*c) for c in vcol])
co = np.array([v.co[:] for v in me.vertices])
zmin, zmax = co[:, 2].min(), co[:, 2].max()
upper = co[:, 2] > zmin + (zmax - zmin) * 0.30
if WHO == "male":
    hair = (hsv[:, 2] < 0.16) & upper
else:  # wine-red hair: reddish hue, darker than skin
    r, g, b = vcol[:, 0], vcol[:, 1], vcol[:, 2]
    hair = (r > g * 1.35) & (r > b * 1.25) & (hsv[:, 2] < 0.62) & ((vcol.max(1) - vcol.min(1)) > 0.12) & upper
import json
al = json.load(open(os.path.join(OUT, f"{WHO}_align_front.json")))
brow_z = max(-(al["photo"][k][1] - al["tv"]) / al["k"] for k in ("brow_l", "brow_r"))
Hh = zmax - zmin
nrm = np.array([v.normal[:] for v in me.vertices])
face = (nrm[:, 1] < -0.15) & (co[:, 2] < brow_z + 0.025 * Hh)
hair &= ~face
print("hair vertices", int(hair.sum()), "of", len(hair), "face protected", int(face.sum()))

# dilate the selection twice through mesh edges
bm = bmesh.new(); bm.from_mesh(me); bm.verts.ensure_lookup_table()
sel = hair.copy()
for _ in range(3):
    nxt = sel.copy()
    for e in bm.edges:
        i, j = e.verts[0].index, e.verts[1].index
        if sel[i] or sel[j]:
            nxt[i] = nxt[j] = True
    sel = nxt
bm.free()
sel &= ~face
vg = obj.vertex_groups.new(name="hair")
vg.add([int(i) for i in np.where(sel)[0]], 1.0, "REPLACE")

# 1) relax spikes and noodles
lap = obj.modifiers.new("hair_lap", "LAPLACIANSMOOTH")
lap.vertex_group = "hair"; lap.iterations = 40 if WHO == "male" else 90; lap.lambda_factor = 1.2; lap.lambda_border = 0.0
lap.use_volume_preserve = True; lap.use_normalized = True
bpy.context.view_layer.objects.active = obj
bpy.ops.object.modifier_apply(modifier="hair_lap")
# 2) a gentle corrective pass to keep surface tension even
cs = obj.modifiers.new("hair_cs", "CORRECTIVE_SMOOTH")
cs.vertex_group = "hair"; cs.iterations = 20; cs.factor = 0.6; cs.smooth_type = "LENGTH_WEIGHTED"
bpy.ops.object.modifier_apply(modifier="hair_cs")

bpy.ops.wm.save_as_mainfile(filepath=os.path.join(OUT, f"{WHO}_head_clean.blend"))
for o in bpy.data.objects:
    o.select_set(o == obj)
bpy.ops.export_scene.gltf(filepath=os.path.join(OUT, f"{WHO}_head_clean{SUFFIX}.glb"), export_format="GLB",
                          use_selection=True, export_materials="NONE")

# preview renders (texture unchanged; UVs are preserved by smoothing)
sc = bpy.context.scene
sc.render.engine = "BLENDER_EEVEE_NEXT"
w = bpy.data.worlds.new("w"); w.use_nodes = True
w.node_tree.nodes["Background"].inputs[0].default_value = (1, 1, 1, 1); sc.world = w
sc.view_settings.view_transform = "Standard"
sc.render.resolution_x = 900; sc.render.resolution_y = 900
cd = bpy.data.cameras.new("c"); cam = bpy.data.objects.new("c", cd); sc.collection.objects.link(cam); sc.camera = cam
cd.type = "ORTHO"; cd.ortho_scale = float(zmax - zmin) * 1.02
s2 = math.sqrt(0.5)
for name, d in (("front", (0, -1, 0)), ("q34", (s2, -s2, 0)), ("side", (1, 0, 0)), ("back", (0, 1, 0))):
    cam.location = Vector(d) * 10
    cam.rotation_euler = (Vector((0, 0, 0)) - cam.location).to_track_quat("-Z", "Y").to_euler()
    sc.render.filepath = os.path.join(OUT, f"{WHO}_clean_{name}.png")
    bpy.ops.render.render(write_still=True)
print("CLEAN DONE", WHO)
