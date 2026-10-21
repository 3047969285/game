"""Front portrait of the fitted, photo-textured head with an exactly known camera, for UE MetaHuman
"conform to custom mesh" (2D landmark term).

Usage: Blender -b fit/<who>_textured.blend -P render_portrait.py -- <who> <export_dir>
The body is placed in the same real-scale frame as export_metahuman_input.py (feet at 0, Blender -Y = face).
FBX import into UE flips Y, so Blender (x, y, z) m  ->  UE (100x, -100y, 100z) cm and the face looks
toward UE +Y. The camera is written in UE terms (location cm, rotation, horizontal FOV) next to the image.
"""
import bpy, sys, os, json, math
import numpy as np
from mathutils import Vector

a = sys.argv[sys.argv.index("--") + 1:]
WHO, EXP = a[0], a[1]
FIT = os.path.dirname(bpy.data.filepath)
H_REAL = {"male": 1.84, "female": 1.68}[WHO]
FOV = 30.0          # horizontal, degrees
DIST = 0.75         # metres in front of the eyes
RES = 1024

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
for o in bpy.data.objects:
    if o.type == "MESH" and o.parent is None:
        o.scale = tuple(s * K for s in o.scale)
        o.location = (o.location[0] * K, o.location[1] * K, (o.location[2] - zmin) * K)
    elif o.type == "CURVES" or "hair" in o.name.lower():
        o.hide_render = True
lm = json.load(open(os.path.join(FIT, f"{WHO}_lm3d.json")))
EYE_IDS = ("33", "263", "133", "362", "159", "386", "145", "374", "468", "473")
eye = np.mean([np.array(lm[k]) for k in EYE_IDS if k in lm], 0)
eye = np.array([eye[0] * K, eye[1] * K, (eye[2] - zmin) * K])

sc = bpy.context.scene
cam = sc.camera
cam.data.type = "PERSP"
cam.data.sensor_fit = "HORIZONTAL"
cam.data.angle = math.radians(FOV)
cam.data.clip_start = 0.01
loc = np.array([0.0, eye[1] - DIST, eye[2]])
cam.location = Vector(loc.tolist())
cam.rotation_euler = (math.radians(90), 0, 0)       # looking +Y, Z up
sc.render.resolution_x = sc.render.resolution_y = RES
sc.render.engine = "BLENDER_EEVEE_NEXT"
sc.render.film_transparent = False
sc.view_settings.view_transform = "Standard"
w = sc.world
w.node_tree.nodes["Background"].inputs[0].default_value = (0.9, 0.9, 0.9, 1)
w.node_tree.nodes["Background"].inputs[1].default_value = 0.9
for o in [o for o in bpy.data.objects if o.type == "LIGHT"]:
    bpy.data.objects.remove(o)
ld = bpy.data.lights.new("key", "AREA"); ld.energy = 40; ld.size = 1.5
lo = bpy.data.objects.new("key", ld); sc.collection.objects.link(lo)
lo.location = Vector((0.3, eye[1] - 1.2, eye[2] + 0.4))
lo.rotation_euler = (Vector(eye.tolist()) - lo.location).to_track_quat("-Z", "Y").to_euler()
CLAY = os.environ.get("CLAY") == "1"
if CLAY:
    clay = bpy.data.materials.new("clay"); clay.use_nodes = True
    bs = clay.node_tree.nodes["Principled BSDF"]
    bs.inputs["Base Color"].default_value = (0.62, 0.52, 0.47, 1); bs.inputs["Roughness"].default_value = 0.6
    for s_ in body.material_slots:
        s_.material = clay
out = os.path.join(EXP, f"{WHO}_portrait{'_clay' if CLAY else ''}.png")
sc.render.filepath = out
bpy.ops.render.render(write_still=True)
camj = {"image": os.path.basename(out), "image_size": [RES, RES],
        "ue_location_cm": [loc[0] * 100, -loc[1] * 100, loc[2] * 100],
        "ue_rotation": {"pitch": 0.0, "yaw": -90.0, "roll": 0.0},
        "ue_fov_deg_horizontal": FOV, "projection": "perspective",
        "note": "Blender (x,y,z) m -> UE (100x,-100y,100z) cm; face looks toward UE +Y"}
if not CLAY:
  json.dump(camj, open(os.path.join(EXP, f"{WHO}_portrait_camera.json"), "w"), indent=1)
print("PORTRAIT DONE", camj, flush=True)
