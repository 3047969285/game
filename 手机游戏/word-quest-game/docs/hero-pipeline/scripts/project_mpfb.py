"""Project the reference photos onto the fitted MPFB head (proper UVs, separate eyes/lashes).

Usage: Blender -b <who>_fit.blend -P project_mpfb.py -- <who> <out_dir> <headviews_dir>

Front / 3/4 views are aligned by face landmarks measured on renders of the fitted model; the back
view (from the turnaround sheet) by head silhouette. The projection is composited into the MPFB
skin texture (head region only, feathered at the neck), so eyes, lashes and teeth stay as real
geometry with their own materials.
"""
import bpy, sys, os, json, math, subprocess
import numpy as np
from mathutils import Vector
from mathutils.bvhtree import BVHTree

a = sys.argv[sys.argv.index("--") + 1:]
WHO, OUT, VIEWS = a[0], a[1], a[2]
HERE = os.path.dirname(os.path.abspath(__file__))
VENV_PY = os.path.expanduser("~/.local/share/hunyuan3d/.venv/bin/python")
body = next(o for o in bpy.data.objects if o.type == "MESH" and o.name == "Human")
scene = bpy.context.scene
fit = json.load(open(os.path.join(OUT, f"{WHO}_fit.json")))
YAW = fit["yaw_q34"]

dg = bpy.context.evaluated_depsgraph_get()
ev = body.evaluated_get(dg)
V = np.array([(body.matrix_world @ v.co)[:] for v in ev.data.vertices])
top = V[:, 2].max(); height = top - V[:, 2].min()
hc = V[V[:, 2] > top - height * 0.14].mean(0)
HEAD_H = height * 0.135
NECK_Z = top - height * 0.17
bvh = BVHTree.FromObject(body, dg)

# ---------------------------------------------------------------- skin texture to paint into
def find_tex(tree, seen=None):
    seen = seen or set()
    hits = []
    for n in tree.nodes:
        if n.type == "TEX_IMAGE" and n.image:
            hits.append(n)
        if n.type == "GROUP" and n.node_tree and n.node_tree.name not in seen:
            seen.add(n.node_tree.name)
            hits += find_tex(n.node_tree, seen)
    return hits


diff = None
for slot in body.material_slots:
    if not slot.material or not slot.material.use_nodes:
        continue
    for n in find_tex(slot.material.node_tree):
        nm = n.image.name.lower()
        if "diffuse" in nm or "color" in nm or "albedo" in nm:
            diff = n; break
    if diff:
        break
print("diffuse node", diff.image.name if diff else None, flush=True)
SKIN_IMG = diff.image
TW, TH = SKIN_IMG.size
print("skin texture", SKIN_IMG.name, TW, TH, flush=True)
base_px = np.array(SKIN_IMG.pixels[:], dtype=np.float32).reshape(TH, TW, 4)

# ---------------------------------------------------------------- bake position / normal in the body UVs
scene.render.engine = "CYCLES"; scene.cycles.device = "GPU"; scene.cycles.samples = 1
try:
    prefs = bpy.context.preferences.addons["cycles"].preferences
    prefs.compute_device_type = "METAL"; prefs.get_devices()
    for d in prefs.devices:
        d.use = True
except Exception:  # noqa: BLE001
    pass
scene.render.bake.margin = 4
bake_mat = bpy.data.materials.new("bake"); bake_mat.use_nodes = True
bn = bake_mat.node_tree
for n in list(bn.nodes):
    bn.nodes.remove(n)
o_ = bn.nodes.new("ShaderNodeOutputMaterial"); em = bn.nodes.new("ShaderNodeEmission"); geo = bn.nodes.new("ShaderNodeNewGeometry")
bn.links.new(em.outputs[0], o_.inputs["Surface"]); tn = bn.nodes.new("ShaderNodeTexImage"); bn.nodes.active = tn
saved = [s.material for s in body.material_slots]
for s in body.material_slots:
    s.material = bake_mat
for o in bpy.data.objects:
    o.select_set(o == body)
bpy.context.view_layer.objects.active = body


def bake(sock, name):
    img = bpy.data.images.new(name, TW, TH, alpha=False, float_buffer=True)
    img.colorspace_settings.name = "Non-Color"; tn.image = img
    for l in list(bn.links):
        if l.to_node == em:
            bn.links.remove(l)
    bn.links.new(geo.outputs[sock], em.inputs["Color"])
    bpy.ops.object.bake(type="EMIT")
    return np.array(img.pixels[:], dtype=np.float32).reshape(TH, TW, 4)[..., :3]


pos = bake("Position", "pos"); nor = bake("Normal", "nor")
for s, m in zip(body.material_slots, saved):
    s.material = m
filled = np.linalg.norm(nor, axis=-1) > 0.5
headmask = filled & (pos[..., 2] > NECK_Z - height * 0.02)
print("head texels", int(headmask.sum()), flush=True)

# ---------------------------------------------------------------- landmark alignment on renders
scene.render.engine = "BLENDER_EEVEE_NEXT"
scene.view_settings.view_transform = "Standard"
w = bpy.data.worlds.new("w"); w.use_nodes = True
w.node_tree.nodes["Background"].inputs[0].default_value = (1, 1, 1, 1); scene.world = w
cd = bpy.data.cameras.new("c"); cam = bpy.data.objects.new("c", cd); scene.collection.objects.link(cam); scene.camera = cam
cd.type = "ORTHO"; RES = 1024; ORTHO = HEAD_H * 1.6; cd.ortho_scale = ORTHO
scene.render.resolution_x = RES; scene.render.resolution_y = RES


def axes(yaw):
    t = math.radians(yaw)
    return np.array([math.sin(t), -math.cos(t), 0.0]), np.array([math.cos(t), math.sin(t), 0.0])


def landmarks(path):
    j = path + ".lm.json"
    subprocess.run([VENV_PY, os.path.join(HERE, "landmarks468.py"), path, j], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    p = json.load(open(j))
    return np.array(p) if p else None


def align_view(yaw, photo):
    d, r = axes(yaw)
    cam.location = Vector((hc + d * 3).tolist())
    cam.rotation_euler = (Vector(hc.tolist()) - cam.location).to_track_quat("-Z", "Y").to_euler()
    path = os.path.join(OUT, f"{WHO}_mpfb_align_{yaw}.png"); scene.render.filepath = path
    bpy.ops.render.render(write_still=True)
    R = landmarks(path); Pp = landmarks(photo)
    if R is None or Pp is None:
        print("align", yaw, "failed", flush=True); return None
    # render pixel -> world (h, z); photo pixel = k * (h, -z) + t
    hw = (R[:, 0] - RES / 2) * ORTHO / RES + hc @ r
    zw = hc[2] - (R[:, 1] - RES / 2) * ORTHO / RES
    M = np.zeros((2 * len(R), 3)); y = np.zeros(2 * len(R))
    M[0::2, 0] = hw; M[0::2, 1] = 1; y[0::2] = Pp[:, 0]
    M[1::2, 0] = -zw; M[1::2, 2] = 1; y[1::2] = Pp[:, 1]
    (k, tu, tv), *_ = np.linalg.lstsq(M, y, rcond=None)
    rms = float(np.sqrt(((M @ np.array([k, tu, tv]) - y) ** 2).mean()))
    print("align", yaw, "rms px", round(rms, 1), flush=True)
    return dict(k=k, tu=tu, tv=tv, r=r, d=d, rms=rms)


def load_rgb(path):
    im = bpy.data.images.load(path)
    w_, h_ = im.size
    return np.array(im.pixels[:], dtype=np.float32).reshape(h_, w_, 4)[::-1, :, :3]


def erode(m, rr):
    out = m.copy()
    for dy in range(-rr, rr + 1):
        for dx in range(-rr, rr + 1):
            out &= np.roll(np.roll(m, dy, 0), dx, 1)
    return out


VIEWS_USE = [("front", 0, "front"), ("q34", YAW, "q34"), ("q34r", -YAW, "q34r")]
P = pos[headmask]; N = nor[headmask]
acc = np.zeros((len(P), 3), np.float32); wsum = np.zeros(len(P), np.float32)
for name, yaw, fname in VIEWS_USE:
    photo = os.path.join(VIEWS, f"{WHO}_{fname}.png")
    al = align_view(yaw, photo)
    if al is None or al["rms"] > 25:
        continue
    px = load_rgb(photo); Hh, Ww = px.shape[:2]
    fg = erode(np.abs(px - 1.0).sum(-1) > 0.10, 2)
    u = al["tu"] + (P @ al["r"]) * al["k"]; v = al["tv"] - P[:, 2] * al["k"]
    inb = (u >= 0) & (u < Ww - 1) & (v >= 0) & (v < Hh - 1)
    ui = np.clip(np.round(u).astype(int), 0, Ww - 1); vi = np.clip(np.round(v).astype(int), 0, Hh - 1)
    col = px[vi, ui]; inside = fg[vi, ui] & inb
    facing = N @ al["d"]
    vis = np.zeros(len(P), bool)
    dv = Vector(al["d"].tolist())
    for i in np.where(facing > 0.15)[0]:
        if bvh.ray_cast(Vector(P[i].tolist()) + dv * 0.002, dv, 5.0)[0] is None:
            vis[i] = True
    wt = np.clip(facing, 0, 1) ** 6 * inside * vis * (1.0 if name == "front" else 0.55)
    if name != "front":
        ff = np.clip(N @ axes(0)[0], 0, 1)
        wt *= np.clip(1.0 - (ff - 0.6) / 0.3, 0, 1)
    acc += col * wt[:, None]; wsum += wt
    print("view", name, "texels", int((wt > 0).sum()), flush=True)

seen = wsum > 1e-4
proj = np.where(seen[:, None], acc / np.maximum(wsum[:, None], 1e-4), 0)

# match photo colours to the existing skin where they overlap the neck, then composite
old = base_px[headmask][:, :3]
neck_band = seen & (P[:, 2] < NECK_Z + height * 0.03)
if neck_band.sum() > 100:
    gain = old[neck_band].mean(0) / np.maximum(proj[neck_band].mean(0), 1e-3)
    print("neck colour gain", np.round(gain, 3), flush=True)
alpha = np.clip(wsum / 0.25, 0, 1) * np.clip((P[:, 2] - (NECK_Z - height * 0.015)) / (height * 0.03), 0, 1)
new = old * (1 - alpha[:, None]) + proj * alpha[:, None]
out_px = base_px.copy()
tmp = out_px[headmask]; tmp[:, :3] = new; out_px[headmask] = tmp
img = bpy.data.images.new(f"{WHO}_skin_face", TW, TH, alpha=True)
img.pixels[:] = out_px.ravel()
img.filepath_raw = os.path.join(OUT, f"{WHO}_skin_face.png"); img.file_format = "PNG"; img.save(); img.pack()
diff.image = img

# ---------------------------------------------------------------- comparison renders with studio light
for o in [o for o in bpy.data.objects if o.type == "LIGHT"]:
    bpy.data.objects.remove(o)
w.node_tree.nodes["Background"].inputs[1].default_value = 0.6


def area(loc, energy, size):
    ld = bpy.data.lights.new("l", "AREA"); ld.energy = energy; ld.size = size
    lo = bpy.data.objects.new("l", ld); scene.collection.objects.link(lo)
    lo.location = Vector(loc); lo.rotation_euler = (Vector(hc.tolist()) - lo.location).to_track_quat("-Z", "Y").to_euler()


area((hc[0] + 1.2, hc[1] - 1.6, hc[2] + 0.8), 90, 1.2)
area((hc[0] - 1.6, hc[1] - 1.2, hc[2] + 0.3), 35, 2.0)
area((hc[0] - 0.6, hc[1] + 1.5, hc[2] + 1.0), 60, 1.0)
for name, yaw in (("front", 0), ("q34", YAW), ("side", 90)):
    d, r = axes(yaw)
    cam.location = Vector((hc + d * 3).tolist())
    cam.rotation_euler = (Vector(hc.tolist()) - cam.location).to_track_quat("-Z", "Y").to_euler()
    scene.render.filepath = os.path.join(OUT, f"{WHO}_mpfb_{name}.png")
    bpy.ops.render.render(write_still=True)
bpy.ops.wm.save_as_mainfile(filepath=os.path.join(OUT, f"{WHO}_textured.blend"))
print("MPFB DONE", WHO)
