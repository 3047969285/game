"""Look development + comparison renders for the finished head (skin, eyes, hair).

Usage: Blender -b <who>_hair.blend -P lookdev.py -- <who> <out_dir> <headviews_dir>
Sets the skin to a matte SSS look, wet glossy eyes with a darker iris, studio lighting close to the
reference sheets (AgX view transform like the game), renders front / 3/4 / side next to the photos.
"""
import bpy, sys, os, math, json
import numpy as np
from mathutils import Vector, Matrix

a = sys.argv[sys.argv.index("--") + 1:]
WHO, OUT, VIEWS = a[0], a[1], a[2]
scene = bpy.context.scene
body = bpy.data.objects["Human"]
fit = json.load(open(os.path.join(OUT, f"{WHO}_fit.json")))
POSE = tuple(fit.get("pose_q34", [fit["yaw_q34"], 0, 0]))

# ---------------------------------------------------------------- skin
for slot in body.material_slots:
    m = slot.material
    if not m or not m.use_nodes:
        continue
    for n in m.node_tree.nodes:
        if n.type == "GROUP":
            ins = n.inputs
            if "Roughness" in ins:
                ins["Roughness"].default_value = 0.62 if "lips" not in m.name else 0.45
            for k, v in (("Clearcoat", 0.0), ("Pore strength", 0.28), ("SSS strength", 0.35), ("colorMixInStrength", 0.0)):
                if k in ins:
                    ins[k].default_value = v

# ---------------------------------------------------------------- eyes
for o in bpy.data.objects:
    if o.type == "MESH" and o.name.endswith("high-poly"):
        for slot in o.material_slots:
            nt = slot.material.node_tree
            mix = nt.nodes.get("diffuseIntensity"); bs = nt.nodes.get("Principled BSDF")
            if mix:
                mix.blend_type = "MULTIPLY"; mix.inputs["Fac"].default_value = 1.0
                mix.inputs["Color1"].default_value = (0.55, 0.45, 0.40, 1.0)
            if bs:
                bs.inputs["Roughness"].default_value = 0.08
                bs.inputs["Coat Weight"].default_value = 1.0
                bs.inputs["Coat Roughness"].default_value = 0.02

# ---------------------------------------------------------------- light rig
for o in [o for o in bpy.data.objects if o.type == "LIGHT"]:
    bpy.data.objects.remove(o)
ev = body.evaluated_get(bpy.context.evaluated_depsgraph_get())
V = np.array([(body.matrix_world @ v.co)[:] for v in ev.data.vertices])
top = V[:, 2].max(); height = top - V[:, 2].min()
LM = np.array(list(json.load(open(os.path.join(OUT, f"{WHO}_lm3d.json"))).values()))
hc = LM.mean(0); hc[1] += 0.03 * height / 1.84 * 1.0; hc[2] += 0.012 * height / 1.84
w = scene.world
w.node_tree.nodes["Background"].inputs[0].default_value = (0.92, 0.93, 0.95, 1)
w.node_tree.nodes["Background"].inputs[1].default_value = float(os.environ.get("AMB", "0.25"))


def area(loc, energy, size, colour=(1, 1, 1)):
    ld = bpy.data.lights.new("l", "AREA"); ld.energy = energy; ld.size = size; ld.color = colour
    lo = bpy.data.objects.new("l", ld); scene.collection.objects.link(lo)
    lo.location = Vector((hc + np.array(loc)).tolist())
    lo.rotation_euler = (Vector(hc.tolist()) - lo.location).to_track_quat("-Z", "Y").to_euler()


area((0.9, -1.5, 0.9), float(os.environ.get("KEY", "260")), 1.6, (1.0, 0.97, 0.94))     # key, soft, front-left above
area((-1.4, -1.0, 0.2), 55, 2.2, (0.92, 0.95, 1.0))     # fill
area((0.2, 1.4, 1.0), 120, 0.9, (0.95, 0.97, 1.0))      # rim / hair light
scene.view_settings.view_transform = os.environ.get("VT", "Standard")
scene.view_settings.look = "None"
scene.render.engine = "BLENDER_EEVEE_NEXT"
try:
    scene.eevee.use_shadows = True; scene.eevee.use_raytracing = True
except Exception:  # noqa: BLE001
    pass
scene.render.resolution_x = scene.render.resolution_y = 1024
scene.render.film_transparent = True
cam = scene.camera
cam.data.type = "ORTHO"; cam.data.ortho_scale = 0.135 * height * 2.0


def rot(v, axis, deg):
    a_ = math.radians(deg); axis = axis / np.linalg.norm(axis)
    return v * math.cos(a_) + np.cross(axis, v) * math.sin(a_) + axis * (axis @ v) * (1 - math.cos(a_))


def frame(pose):
    yaw, pitch, roll = (pose, 0.0, 0.0) if np.isscalar(pose) else pose
    t = math.radians(yaw)
    d = np.array([math.sin(t), -math.cos(t), 0.0]); r = np.array([math.cos(t), math.sin(t), 0.0]); u = np.array([0, 0, 1.0])
    d, u = rot(d, r, pitch), rot(u, r, pitch)
    r, u = rot(r, d, roll), rot(u, d, roll)
    return d, r, u


shots = (("front", 0, "front"), ("q34", POSE, "q34"), ("side", 90, "left"), ("back", 180, "back"))
for name, pose, ref in shots:
    d, r, u = frame(pose)
    cam.location = Vector((hc + d * 3).tolist())
    cam.rotation_euler = Matrix([[r[0], u[0], d[0]], [r[1], u[1], d[1]], [r[2], u[2], d[2]]]).to_euler()
    scene.render.filepath = os.path.join(OUT, f"{WHO}_look_{name}.png")
    bpy.ops.render.render(write_still=True)
bpy.ops.wm.save_as_mainfile(filepath=os.path.join(OUT, f"{WHO}_look.blend"))
print("LOOK DONE", WHO)
