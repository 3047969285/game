"""Texture a generated head/bust by projecting the high-res face views.

Usage: Blender -b -P project_head.py -- <head.glb> <headviews_dir> <who> <out_dir> [tex]
Views: front (camera -Y), left (camera +X, the side photo as-is), right (mirror), q34 (camera at +X/-Y 45 deg).
"""
import bpy, sys, os, math
import numpy as np
from mathutils import Vector
from mathutils.bvhtree import BVHTree
from mathutils.kdtree import KDTree

a = sys.argv[sys.argv.index("--") + 1:]
MESH, VIEWS, WHO, OUT = a[0], a[1], a[2], a[3]
TEX = int(a[4]) if len(a) > 4 else 4096
os.makedirs(OUT, exist_ok=True)

for o in list(bpy.data.objects):
    bpy.data.objects.remove(o, do_unlink=True)
bpy.ops.import_scene.gltf(filepath=MESH)
obj = next(o for o in bpy.context.scene.objects if o.type == "MESH")
bpy.context.view_layer.objects.active = obj
obj.select_set(True)
bpy.ops.object.transform_apply(location=True, rotation=True, scale=True)
co = np.array([v.co[:] for v in obj.data.vertices], np.float32)
c = (co.max(0) + co.min(0)) / 2
obj.location = (-c[0], -c[1], -c[2])
bpy.ops.object.transform_apply(location=True)
VERTS = np.array([v.co[:] for v in obj.data.vertices], np.float32)
bbmin, bbmax = VERTS.min(0), VERTS.max(0)

import json
ALIGN = {}
ap = os.path.join(OUT, f"{WHO}_align_front_base.json")
CLEAN = ("_clean" in os.path.basename(MESH))
if os.path.exists(ap) and not CLEAN:
    al = json.load(open(ap))
    if al.get("ok"):
        ALIGN["front"] = al
        k, tu, tv = al["k"], al["tu"], al["tv"]
        meta = json.load(open(os.path.join(OUT, f"{WHO}_clay_front_base.json")))
        n, S = meta["res"], meta["ortho_scale"]
        src, dst = [], []
        for key, rp in al["render"].items():
            wx = (rp[0] - n / 2) * S / n; wz = -(rp[1] - n / 2) * S / n
            pp = al["photo"][key]
            tx = (pp[0] - tu) / k; tz = -(pp[1] - tv) / k
            src.append((wx, wz)); dst.append((tx, tz))
        src = np.array(src); dst = np.array(dst); d = dst - src
        print("landmark offsets (mm)", np.round(np.abs(d).max(0) * 1000, 1), flush=True)
        # Gaussian RBF interpolation of the 2D offset field over the face, front-facing vertices only
        sig = 0.018 * (bbmax[2] - bbmin[2]) / 0.5
        K = np.exp(-((src[:, None, :] - src[None, :, :]) ** 2).sum(-1) / (2 * sig ** 2)) + np.eye(len(src)) * 1e-3
        Wt = np.linalg.solve(K, d)
        q = VERTS[:, [0, 2]]
        G = np.exp(-((q[:, None, :] - src[None, :, :]) ** 2).sum(-1) / (2 * sig ** 2))
        disp = G @ Wt
        # only the frontal half of the head moves; fade toward the ears / back
        depth = (VERTS[:, 1] - bbmin[1]) / (bbmax[1] - bbmin[1])   # 0 = face (front, -Y), 1 = back of head
        wfront = np.clip(1.0 - (depth - 0.35) / 0.25, 0, 1)
        disp *= wfront[:, None]
        for i, v in enumerate(obj.data.vertices):
            v.co.x += disp[i, 0]; v.co.z += disp[i, 1]
        obj.data.update()
        VERTS = np.array([v.co[:] for v in obj.data.vertices], np.float32)
        print("face warped to photo landmarks", flush=True)

# decimate to a game-friendly density before unwrapping (keeps silhouette)
dec = obj.modifiers.new("dec", "DECIMATE")
dec.ratio = 1.0 if ("_clean" in os.path.basename(MESH)) else min(1.0, 120000 / max(1, len(obj.data.polygons)))
bpy.ops.object.modifier_apply(modifier="dec")
bpy.ops.object.mode_set(mode="EDIT")
bpy.ops.mesh.select_all(action="SELECT")
bpy.ops.uv.smart_project(angle_limit=math.radians(66), island_margin=0.003)
bpy.ops.object.mode_set(mode="OBJECT")
bpy.ops.object.shade_smooth()
VERTS = np.array([v.co[:] for v in obj.data.vertices], np.float32)

scene = bpy.context.scene
scene.render.engine = "CYCLES"
scene.cycles.device = "GPU"
try:
    prefs = bpy.context.preferences.addons["cycles"].preferences
    prefs.compute_device_type = "METAL"; prefs.get_devices()
    for d in prefs.devices:
        d.use = True
except Exception:  # noqa: BLE001
    pass
scene.cycles.samples = 1
scene.render.bake.margin = 8
mat = bpy.data.materials.new("bake"); mat.use_nodes = True
obj.data.materials.clear(); obj.data.materials.append(mat)
nt = mat.node_tree
for n in list(nt.nodes):
    nt.nodes.remove(n)
outn = nt.nodes.new("ShaderNodeOutputMaterial"); emit = nt.nodes.new("ShaderNodeEmission")
geo = nt.nodes.new("ShaderNodeNewGeometry"); nt.links.new(emit.outputs[0], outn.inputs["Surface"])
img_node = nt.nodes.new("ShaderNodeTexImage"); nt.nodes.active = img_node


def bake_vec(sock, name):
    img = bpy.data.images.new(name, TEX, TEX, alpha=False, float_buffer=True)
    img.colorspace_settings.name = "Non-Color"; img_node.image = img
    for l in list(nt.links):
        if l.to_node == emit:
            nt.links.remove(l)
    nt.links.new(geo.outputs[sock], emit.inputs["Color"])
    bpy.ops.object.bake(type="EMIT")
    return np.array(img.pixels[:], dtype=np.float32).reshape(TEX, TEX, 4)[..., :3]


pos = bake_vec("Position", "pos"); nor = bake_vec("Normal", "nor")
filled = np.linalg.norm(nor, axis=-1) > 0.5


def load_rgb(path):
    im = bpy.data.images.load(path)
    w, h = im.size
    return np.array(im.pixels[:], dtype=np.float32).reshape(h, w, 4)[::-1, :, :3]


def erode(m, r):
    out = m.copy()
    for dy in range(-r, r + 1):
        for dx in range(-r, r + 1):
            out &= np.roll(np.roll(m, dy, 0), dx, 1)
    return out


s2 = math.sqrt(0.5)
VIEWS_DEF = {
    #        file      camera dir (toward camera)   image-right axis
    "front": ("front", np.array([0, -1, 0.0]), np.array([1, 0, 0.0])),
    "left":  ("left",  np.array([1, 0, 0.0]),  np.array([0, 1, 0.0])),
    "right": ("right", np.array([-1, 0, 0.0]), np.array([0, -1, 0.0])),
    "q34":   ("q34",   np.array([s2, -s2, 0]), np.array([s2, s2, 0.0])),
    "q34r":  ("q34r",  np.array([-s2, -s2, 0]), np.array([s2, -s2, 0.0])),
    "back":  ("back",  np.array([0, 1, 0.0]), np.array([-1, 0, 0.0])),
}
bvh = BVHTree.FromObject(obj, bpy.context.evaluated_depsgraph_get())


def head_sampler(name):
    fname, d, r = VIEWS_DEF[name]
    px = load_rgb(os.path.join(VIEWS, f"{WHO}_{fname}.png"))
    H, W = px.shape[:2]
    raw = np.abs(px - 1.0).sum(-1) > 0.10; fg = erode(raw, 3)
    chin_z = LM3D["chin"][2] if "chin" in LM3D else bbmin[2] + 0.55 * (bbmax[2] - bbmin[2])
    head = VERTS[VERTS[:, 2] > chin_z]
    sub = head[:: max(1, len(head) // 60000)]
    sh = sub @ r
    ys, xs = np.where(raw)
    top = ys.min()
    # rows of the head in the image: from the top down to where the silhouette widens into shoulders
    widths = raw.sum(1)
    head_rows = top + int(np.argmax(widths[top:] > widths[top: top + 400].max() * 1.6)) if (widths[top:] > 0).any() else H
    small = raw[: head_rows : 2, ::2]; hs, ws = small.shape; cnt = small.sum()
    best = (-1, 0, 0, 0)
    base = (xs.max() - xs.min()) / max(1e-6, float(VERTS[:, 0].max() - VERTS[:, 0].min()))
    for sc in base * np.linspace(0.6, 1.6, 41):
        for du in range(-80, 81, 8):
            for dv in range(-40, 41, 8):
                u = W / 2 + du + sh * sc; v = top + dv + (bbmax[2] - sub[:, 2]) * sc
                ok = (v >= 0) & (v < head_rows)
                ui = np.clip((u[ok] / 2).astype(int), 0, ws - 1); vi = np.clip((v[ok] / 2).astype(int), 0, hs - 1)
                sil = np.zeros((hs, ws), bool); sil[vi, ui] = True
                sil = sil | np.roll(sil, 1, 0) | np.roll(sil, 1, 1) | np.roll(sil, -1, 0) | np.roll(sil, -1, 1)
                inter = (sil & small).sum(); iou = inter / max(cnt + sil.sum() - inter, 1)
                if iou > best[0]:
                    best = (iou, sc, du, dv)
    iou, SC, DU, DV = best
    print("register", name, "head IoU", round(iou, 3), flush=True)

    def sample(P):
        u = W / 2 + DU + (P @ r) * SC; v = top + DV + (bbmax[2] - P[:, 2]) * SC
        inb = (v >= 0) & (v < H - 1) & (u >= 0) & (u < W - 1)
        ui = np.clip(np.round(u).astype(int), 0, W - 1); vi = np.clip(np.round(v).astype(int), 0, H - 1)
        return px[vi, ui], fg[vi, ui] & inb
    return sample, d


def make_sampler(name):
    if name == "back":
        return head_sampler(name)
    fname, d, r = VIEWS_DEF[name]
    px = load_rgb(os.path.join(VIEWS, f"{WHO}_{fname}.png"))
    if name in ALIGN:
        al = ALIGN[name]; H, W = px.shape[:2]
        raw = np.abs(px - 1.0).sum(-1) > 0.10; fg = erode(raw, 3)
        def sample(P):
            u = al["tu"] + (P @ r) * al["k"]; v = al["tv"] - P[:, 2] * al["k"]
            inb = (v >= 0) & (v < H - 1) & (u >= 0) & (u < W - 1)
            ui = np.clip(np.round(u).astype(int), 0, W - 1); vi = np.clip(np.round(v).astype(int), 0, H - 1)
            return px[vi, ui], fg[vi, ui] & inb
        print("register", name, "by landmarks", flush=True)
        return sample, d
    raw = np.abs(px - 1.0).sum(-1) > 0.10
    fg = erode(raw, 3)
    ys, xs = np.where(raw)
    H, W = raw.shape
    hcoord = VERTS @ r
    # the photo is cropped at the bottom; align by top-of-head and horizontal centre
    top_img = ys.min()
    small = raw[::2, ::2]; hs, ws = small.shape; cnt = small.sum()
    sub = VERTS[:: max(1, len(VERTS) // 80000)]
    sh = sub @ r
    best = (-1, 0, 0, 0)
    base = (xs.max() - xs.min()) / (hcoord.max() - hcoord.min())
    for sc in base * np.linspace(0.75, 1.25, 26):
        for du in range(-60, 61, 6):
            for dv in range(-60, 61, 6):
                u = W / 2 + du + (sh - 0) * sc
                v = top_img + dv + (bbmax[2] - sub[:, 2]) * sc
                ok = (v >= 0) & (v < H)
                ui = np.clip((u[ok] / 2).astype(int), 0, ws - 1); vi = np.clip((v[ok] / 2).astype(int), 0, hs - 1)
                sil = np.zeros((hs, ws), bool); sil[vi, ui] = True
                sil = sil | np.roll(sil, 1, 0) | np.roll(sil, 1, 1) | np.roll(sil, -1, 0) | np.roll(sil, -1, 1)
                inter = (sil & small).sum(); iou = inter / max(cnt + sil.sum() - inter, 1)
                if iou > best[0]:
                    best = (iou, sc, du, dv)
    iou, SC, DU, DV = best
    for sc in SC * np.linspace(0.985, 1.015, 7):
        for du in range(DU - 5, DU + 6):
            for dv in range(DV - 5, DV + 6):
                u = W / 2 + du + sh * sc
                v = top_img + dv + (bbmax[2] - sub[:, 2]) * sc
                ok = (v >= 0) & (v < H)
                ui = np.clip((u[ok] / 2).astype(int), 0, ws - 1); vi = np.clip((v[ok] / 2).astype(int), 0, hs - 1)
                sil = np.zeros((hs, ws), bool); sil[vi, ui] = True
                sil = sil | np.roll(sil, 1, 0) | np.roll(sil, 1, 1) | np.roll(sil, -1, 0) | np.roll(sil, -1, 1)
                inter = (sil & small).sum(); iou2 = inter / max(cnt + sil.sum() - inter, 1)
                if iou2 > best[0]:
                    best = (iou2, sc, du, dv)
    iou, SC, DU, DV = best
    print("register", name, "IoU", round(iou, 4), flush=True)

    def sample(P):
        u = W / 2 + DU + (P @ r) * SC
        v = top_img + DV + (bbmax[2] - P[:, 2]) * SC
        inb = (v >= 0) & (v < H - 1) & (u >= 0) & (u < W - 1)
        ui = np.clip(np.round(u).astype(int), 0, W - 1); vi = np.clip(np.round(v).astype(int), 0, H - 1)
        return px[vi, ui], fg[vi, ui] & inb
    return sample, d



# ---- landmark alignment for the non-frontal views, done on the (warped) geometry
import subprocess, json as _json
VENV_PY = os.path.expanduser("~/.local/share/hunyuan3d/.venv/bin/python")
ALIGN_PY = os.path.join(os.path.dirname(os.path.abspath(__file__)), "face_align.py")


def clay_align(name):
    fname, d, r = VIEWS_DEF[name]
    sc = bpy.context.scene
    keep_engine = sc.render.engine
    sc.render.engine = "BLENDER_EEVEE_NEXT"
    m = bpy.data.materials.new("clay_tmp"); m.use_nodes = True
    b = m.node_tree.nodes["Principled BSDF"]; b.inputs["Base Color"].default_value = (0.8, 0.66, 0.58, 1)
    old = obj.data.materials[0]; obj.data.materials[0] = m
    w = bpy.data.worlds.new("wtmp"); w.use_nodes = True
    w.node_tree.nodes["Background"].inputs[0].default_value = (1, 1, 1, 1); sc.world = w
    cd = bpy.data.cameras.new("ctmp"); cam = bpy.data.objects.new("ctmp", cd); sc.collection.objects.link(cam); sc.camera = cam
    cd.type = "ORTHO"; S = float(bbmax[2] - bbmin[2]) * 1.02; cd.ortho_scale = S
    n = 1024; sc.render.resolution_x = n; sc.render.resolution_y = n
    cam.location = Vector(d.tolist()) * 10
    cam.rotation_euler = (Vector((0, 0, 0)) - cam.location).to_track_quat("-Z", "Y").to_euler()
    lt = bpy.data.lights.new("ltmp", "AREA"); lo = bpy.data.objects.new("ltmp", lt); sc.collection.objects.link(lo)
    lo.location = Vector(d.tolist()) * 3 + Vector((0, 0, 1)); lt.energy = 250; lt.size = 3
    lo.rotation_euler = (Vector((0, 0, 0)) - lo.location).to_track_quat("-Z", "Y").to_euler()
    png = os.path.join(OUT, f"{WHO}_clay_{name}.png"); sc.render.filepath = png
    bpy.ops.render.render(write_still=True)
    meta = os.path.join(OUT, f"{WHO}_clay_{name}.json")
    _json.dump({"ortho_scale": S, "res": n, "center": [0, 0]}, open(meta, "w"))
    obj.data.materials[0] = old
    bpy.data.objects.remove(cam); bpy.data.objects.remove(lo)
    sc.render.engine = keep_engine
    outj = os.path.join(OUT, f"{WHO}_align_{name}.json")
    subprocess.run([VENV_PY, ALIGN_PY, os.path.join(VIEWS, f"{WHO}_{fname}.png"), png, meta, outj],
                   stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    al = _json.load(open(outj))
    print("landmark align", name, al.get("ok"), round(al.get("rms", -1), 1), flush=True)
    if al.get("ok") and al["rms"] < 40:
        ALIGN[name] = al


# front: refit on the warped geometry (clay detection works well frontally)
clay_align("front")

# 3D landmark positions on the warped mesh: map the front photo landmarks to world (x, z),
# then raycast from the front to get depth.
LM3D = {}
if "front" in ALIGN:
    al = ALIGN["front"]
    for key, pp in al["photo"].items():
        x = (pp[0] - al["tu"]) / al["k"]; z = -(pp[1] - al["tv"]) / al["k"]
        hit = bvh.ray_cast(Vector((x, bbmin[1] - 1.0, z)), Vector((0, 1, 0)), 10.0)
        if hit[0] is not None:
            LM3D[key] = np.array(hit[0][:])
print("3D landmarks", len(LM3D), flush=True)

LM_PY = os.path.join(os.path.dirname(os.path.abspath(__file__)), "face_landmarks.py")


def photo_align(name):
    fname, d, r = VIEWS_DEF[name]
    outj = os.path.join(OUT, f"{WHO}_photo_lm_{name}.json")
    subprocess.run([VENV_PY, LM_PY, os.path.join(VIEWS, f"{WHO}_{fname}.png"), outj],
                   stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    ph = _json.load(open(outj)) if os.path.exists(outj) else {}
    keys = [k for k in ph if k in LM3D]
    # landmarks hidden behind the head in this view are unreliable: keep only those facing the camera side
    keys = [k for k in keys if (LM3D[k] @ d) > -0.05 * float(bbmax[2] - bbmin[2])]
    if len(keys) < 5:
        print("photo align", name, "insufficient landmarks", len(keys), flush=True)
        return
    h = np.array([LM3D[k] @ r for k in keys]); z = np.array([LM3D[k][2] for k in keys])
    B = np.array([ph[k] for k in keys])
    M = np.zeros((2 * len(keys), 3)); y = np.zeros(2 * len(keys))
    M[0::2, 0] = h; M[0::2, 1] = 1; y[0::2] = B[:, 0]
    M[1::2, 0] = -z; M[1::2, 2] = 1; y[1::2] = B[:, 1]
    (k, tu, tv), *_ = np.linalg.lstsq(M, y, rcond=None)
    rms = float(np.sqrt(((M @ np.array([k, tu, tv]) - y) ** 2).mean()))
    print("photo align", name, "landmarks", len(keys), "rms", round(rms, 1), flush=True)
    if rms < 25:
        ALIGN[name] = {"k": float(k), "tu": float(tu), "tv": float(tv), "rms": rms}


for _n in ("q34", "q34r", "left", "right"):
    photo_align(_n)

P = pos[filled]; N = nor[filled]
acc = np.zeros((len(P), 3), np.float32); wsum = np.zeros(len(P), np.float32)
SAMPLES = []
PRIO = {"front": 1.0, "q34": 0.6, "q34r": 0.6, "left": 0.5, "right": 0.5, "back": 0.9}
for name in ("front", "q34", "q34r", "left", "right", "back"):
    sample, d = make_sampler(name)
    facing = N @ d
    cand = np.where(facing > 0.2)[0]
    vis = np.zeros(len(P), bool)
    dv = Vector(d.tolist())
    for i in cand:
        if bvh.ray_cast(Vector(P[i].tolist()) + dv * 0.002, dv, 10.0)[0] is None:
            vis[i] = True
    col, inside = sample(P)
    w = (np.clip(facing, 0, 1) ** 8) * inside * vis * PRIO[name]
    if name != "front":
        ff = np.clip(N @ VIEWS_DEF["front"][1], 0, 1)
        w = w * np.clip(1.0 - (ff - 0.55) / 0.3, 0, 1)   # front view owns the frontal face
    if name not in ALIGN:
        # unaligned side photos: only the ears / sides / back of the head, never the face
        dep = (P[:, 1] - bbmin[1]) / (bbmax[1] - bbmin[1])
        w = w * np.clip((dep - 0.3) / 0.15, 0, 1)
    SAMPLES.append((col.astype(np.float16), w.astype(np.float16)))
    print("view", name, "visible", int(vis.sum()), flush=True)


def hairlike(c):
    c = c.astype(np.float32)
    mx = c.max(1); mn = c.min(1); v = mx
    if WHO == "male":
        return v < 0.18
    r, g, b = c[:, 0], c[:, 1], c[:, 2]
    return (r > g * 1.35) & (r > b * 1.25) & (v < 0.62) & ((mx - mn) > 0.12)


vote = np.zeros(len(P), np.float32); vw = np.zeros(len(P), np.float32)
for col, w in SAMPLES:
    wf = w.astype(np.float32); vote += wf * hairlike(col); vw += wf
is_hair = (vote / np.maximum(vw, 1e-6)) > 0.45
for col, w in SAMPLES:
    wf = w.astype(np.float32)
    ok = np.where(is_hair, hairlike(col), True)
    wf = wf * ok
    acc += col.astype(np.float32) * wf[:, None]; wsum += wf
print("hair texels", int(is_hair.sum()), flush=True)
tex_l = np.where(wsum[:, None] > 1e-4, acc / np.maximum(wsum[:, None], 1e-4), 0)
seen = wsum > 1e-4
# back of the head is never photographed: fill from nearest seen texels in 3D (hair colour)
ref = np.where(seen)[0][:: max(1, seen.sum() // 300000)]
kd = KDTree(len(ref))
for k, i in enumerate(ref):
    kd.insert(P[i].tolist(), k)
kd.balance()
for i in np.where(~seen)[0]:
    cs = [tex_l[ref[k]] for (_c, k, _d) in kd.find_n(P[i].tolist(), 6)]
    tex_l[i] = np.mean(cs, 0)
tex = np.zeros(pos.shape, np.float32); tex[filled] = tex_l
print("unseen filled", int((~seen).sum()), flush=True)

out_img = bpy.data.images.new(f"{WHO}_head_albedo", TEX, TEX, alpha=True)
out_img.pixels[:] = np.concatenate([tex, np.ones(tex.shape[:2] + (1,), np.float32)], -1).ravel()
out_img.filepath_raw = os.path.join(OUT, f"{WHO}_head_albedo.png"); out_img.file_format = "PNG"; out_img.save()
out_img.pack()

for n in list(nt.nodes):
    nt.nodes.remove(n)
o2 = nt.nodes.new("ShaderNodeOutputMaterial"); em = nt.nodes.new("ShaderNodeEmission")
t2 = nt.nodes.new("ShaderNodeTexImage"); t2.image = out_img
nt.links.new(t2.outputs[0], em.inputs[0]); nt.links.new(em.outputs[0], o2.inputs["Surface"])
bpy.ops.wm.save_as_mainfile(filepath=os.path.join(OUT, f"{WHO}_head_final.blend" if ("_clean" in os.path.basename(MESH)) else f"{WHO}_head.blend"))

scene.render.engine = "BLENDER_EEVEE_NEXT"
scene.view_settings.view_transform = "Standard"
scene.render.resolution_x = 900; scene.render.resolution_y = 900
w = bpy.data.worlds.new("w"); w.use_nodes = True
w.node_tree.nodes["Background"].inputs[0].default_value = (1, 1, 1, 1); scene.world = w
cd = bpy.data.cameras.new("c"); cam = bpy.data.objects.new("c", cd); scene.collection.objects.link(cam); scene.camera = cam
cd.type = "ORTHO"; cd.ortho_scale = (bbmax[2] - bbmin[2]) * 1.02
for name, d in (("front", (0, -1, 0)), ("q34", (s2, -s2, 0)), ("side", (1, 0, 0)), ("q34r", (-s2, -s2, 0)), ("back", (0, 1, 0))):
    cam.location = Vector(d) * 10
    cam.rotation_euler = (Vector((0, 0, 0)) - cam.location).to_track_quat("-Z", "Y").to_euler()
    scene.render.filepath = os.path.join(OUT, f"{WHO}_headtex_{name}.png")
    bpy.ops.render.render(write_still=True)
print("HEAD DONE", WHO)
