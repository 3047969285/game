"""Texture a generated character mesh by projecting the turnaround views onto it.

Usage: Blender -b -P project_texture.py -- <mesh.glb> <views_dir> <who> <sheet.png> <out_dir> [tex_size]

Steps: import mesh -> normalise (feet on ground, facing -Y, height from sheet) -> UV unwrap ->
bake world position + normal per texel -> sample front / back / left / right views with
facing-weighted blending -> save texture, assign material, render a preview turnaround.
"""
import bpy, bmesh, sys, os, math
import numpy as np
from mathutils import Vector

a = sys.argv[sys.argv.index("--") + 1:]
MESH, VIEWS, WHO, SHEET, OUT = a[0], a[1], a[2], a[3], a[4]
TEX = int(a[5]) if len(a) > 5 else 4096
os.makedirs(OUT, exist_ok=True)

for o in list(bpy.data.objects):
    bpy.data.objects.remove(o, do_unlink=True)
bpy.ops.import_scene.gltf(filepath=MESH)
obj = next(o for o in bpy.context.scene.objects if o.type == "MESH")
bpy.context.view_layer.objects.active = obj
obj.select_set(True)
bpy.ops.object.transform_apply(location=True, rotation=True, scale=True)

# ---------------------------------------------------------------- orientation
me = obj.data
co = np.array([v.co[:] for v in me.vertices])
ext = co.max(0) - co.min(0)
up = int(np.argmax(ext))  # tallest axis is "up"
print("extents", ext, "up axis", up)
# Rotate so that the tallest axis becomes +Z.
if up == 1:  # Y-up (glTF default) -> Z-up
    obj.rotation_euler = (math.radians(90), 0, 0)
elif up == 0:
    obj.rotation_euler = (0, math.radians(-90), 0)
bpy.ops.object.transform_apply(rotation=True)
co = np.array([v.co[:] for v in obj.data.vertices])

# Decide which horizontal direction is the front: the face/chest bulges forward.
# Compare depth spread of the upper body: nose/toes point toward the front.
zmin, zmax = co[:, 2].min(), co[:, 2].max()
H = zmax - zmin
feet = co[co[:, 2] < zmin + H * 0.04]
head = co[co[:, 2] > zmax - H * 0.12]
# toes extend forward from the ankles; use feet centroid offset in x / y relative to the body centre
body_c = co.mean(0)
toe_dir = feet[:, :2].mean(0) - body_c[:2]
fx = np.sign(toe_dir[0]) if abs(toe_dir[0]) > abs(toe_dir[1]) else 0
fy = np.sign(toe_dir[1]) if abs(toe_dir[1]) >= abs(toe_dir[0]) else 0
print("toe_dir", toe_dir)
# We want the front to face -Y.
rot = 0.0
if fy > 0:
    rot = math.pi
elif fx > 0:
    rot = -math.pi / 2
elif fx < 0:
    rot = math.pi / 2
obj.rotation_euler = (0, 0, rot)
bpy.ops.object.transform_apply(rotation=True)

# Scale to a real height and put the feet on the ground, centred.
TARGET_H = 1.84 if WHO == "male" else 1.68
co = np.array([v.co[:] for v in obj.data.vertices])
s = TARGET_H / (co[:, 2].max() - co[:, 2].min())
obj.scale = (s, s, s)
bpy.ops.object.transform_apply(scale=True)
co = np.array([v.co[:] for v in obj.data.vertices])
c = (co.max(0) + co.min(0)) / 2
obj.location = (-c[0], -c[1], -co[:, 2].min())
bpy.ops.object.transform_apply(location=True)
co = np.array([v.co[:] for v in obj.data.vertices])
bbmin, bbmax = co.min(0), co.max(0)
print("bbox", bbmin, bbmax)

# ---------------------------------------------------------------- view images


def load_rgb(path):
    im = bpy.data.images.load(path)
    w, h = im.size
    px = np.array(im.pixels[:], dtype=np.float32).reshape(h, w, 4)[::-1, :, :3]  # top-down
    return px


def erode(m, r):
    out = m.copy()
    for dy in range(-r, r + 1):
        for dx in range(-r, r + 1):
            out &= np.roll(np.roll(m, dy, 0), dx, 1)
    return out


def figure_box(px):
    fg = np.abs(px - 1.0).sum(-1) > 0.12
    ys, xs = np.where(fg)
    return xs.min(), xs.max(), ys.min(), ys.max(), erode(fg, 3)


views = {}
for name in ("front", "back", "left"):
    px = load_rgb(os.path.join(VIEWS, f"{WHO}_{name}.png"))
    views[name] = px
# the right view is the original (un-mirrored) side image
views["right"] = views["left"][:, ::-1, :].copy()

# For every view, map world coordinates to image pixels: the figure's bounding box in the image
# corresponds to the mesh bbox projected on that view's horizontal axis and height.
VERTS = np.array([v.co[:] for v in obj.data.vertices], np.float32)
REG = {}


def view_axes(name):
    if name in ("front", "back"):
        return 0, (1 if name == "front" else -1)
    return 1, (-1 if name == "left" else 1)


def make_sampler(name):
    px = views[name]
    x0, x1, y0, y1, fg = figure_box(px)
    raw_fg = np.abs(px - 1.0).sum(-1) > 0.12
    haxis, sign = view_axes(name)
    hmin, hmax = bbmin[haxis], bbmax[haxis]
    base_scale = (y1 - y0) / (bbmax[2] - bbmin[2])
    cx_img = (x0 + x1) / 2
    cx_w = (hmin + hmax) / 2

    def project(Pt, sc, du, dv):
        u = cx_img + du + sign * (Pt[..., haxis] - cx_w) * sc
        v = y1 + dv - (Pt[..., 2] - bbmin[2]) * sc
        return u, v

    # register: maximise overlap between the projected vertex silhouette and the image silhouette
    sub = VERTS[:: max(1, len(VERTS) // 140000)]
    best = (-1, base_scale, 0, 0)
    Hh, Ww = raw_fg.shape

    # work at half resolution for speed
    small = raw_fg[::2, ::2]
    hs, ws = small.shape
    fg_count = small.sum()

    def score_of(sc, du, dv):
        u, v = project(sub, sc, du, dv)
        ui = np.clip((u / 2).astype(int), 0, ws - 1); vi = np.clip((v / 2).astype(int), 0, hs - 1)
        sil = np.zeros((hs, ws), bool)
        sil[vi, ui] = True
        sil = sil | np.roll(sil, 1, 0) | np.roll(sil, 1, 1) | np.roll(sil, -1, 0) | np.roll(sil, -1, 1)
        inter = (sil & small).sum()
        union = fg_count + sil.sum() - inter
        return inter / max(union, 1)

    for ds in np.linspace(-0.1, 0.08, 10):
        for du in range(-24, 25, 4):
            for dv in range(-90, 31, 6):
                sc = base_scale * (1 + ds)
                sv = score_of(sc, du, dv)
                if sv > best[0]:
                    best = (sv, sc, du, dv)
    _, sc0, du0, dv0 = best
    for ds in np.linspace(-0.012, 0.012, 7):
        for du in range(du0 - 4, du0 + 5, 2):
            for dv in range(dv0 - 6, dv0 + 7, 2):
                sc = sc0 * (1 + ds)
                sv = score_of(sc, du, dv)
                if sv > best[0]:
                    best = (sv, sc, du, dv)
    _, SC, DU, DV = best
    print("register", name, "body IoU", round(best[0], 4), "scale", round(SC / base_scale, 3), "du", DU, "dv", DV, flush=True)

    # head: local registration of offsets only (scale stays the body scale)
    Htot = bbmax[2] - bbmin[2]
    zcut = bbmin[2] + Htot * 0.84
    head_sub = sub[sub[:, 2] > zcut]
    _, vhead = project(np.array([[cx_w, 0, zcut]], np.float32) if haxis == 0 else np.array([[0, cx_w, zcut]], np.float32), SC, DU, DV)
    row_cut = int(vhead[0] / 2)
    small_head = small.copy(); small_head[row_cut:, :] = False
    hc = small_head.sum()
    bestH = (-1, DU, DV)
    for du in range(DU - 16, DU + 17, 2):
        for dv in range(DV - 16, DV + 17, 2):
            u, v = project(head_sub, SC, du, dv)
            ui = np.clip((u / 2).astype(int), 0, ws - 1); vi = np.clip((v / 2).astype(int), 0, hs - 1)
            sil = np.zeros((hs, ws), bool); sil[vi, ui] = True
            sil = sil | np.roll(sil, 1, 0) | np.roll(sil, 1, 1) | np.roll(sil, -1, 0) | np.roll(sil, -1, 1)
            inter = (sil & small_head).sum(); union = hc + sil.sum() - inter
            sc_ = inter / max(union, 1)
            if sc_ > bestH[0]:
                bestH = (sc_, du, dv)
    _, HDU, HDV = bestH
    print("register", name, "head IoU", round(bestH[0], 4), "du", HDU, "dv", HDV, flush=True)
    z0b, z1b = bbmin[2] + Htot * 0.80, bbmin[2] + Htot * 0.845
    REG[name] = dict(SC=SC, DU=DU, DV=DV, HDU=HDU, HDV=HDV, cx_img=cx_img, cx_w=cx_w, y1=y1, haxis=haxis, sign=sign, fg=raw_fg)

    def sample(P):
        t = np.clip((P[..., 2] - z0b) / (z1b - z0b), 0, 1)
        du = DU + (HDU - DU) * t
        dv = DV + (HDV - DV) * t
        u, v = project(P, SC, du, dv)
        ui = np.clip(np.round(u).astype(int), 0, px.shape[1] - 1)
        vi = np.clip(np.round(v).astype(int), 0, px.shape[0] - 1)
        return px[vi, ui], fg[vi, ui]
    return sample



# ---------------------------------------------------------------- fit head depth to the side silhouette
make_sampler("left")
r = REG["left"]
Htot = bbmax[2] - bbmin[2]
z_lo = bbmin[2] + Htot * 0.79
mesh_co = np.array([v.co[:] for v in obj.data.vertices], np.float64)
head = mesh_co[:, 2] > z_lo
rows = np.linspace(z_lo, bbmax[2], 80)
tgt = []
for z in rows:
    t = np.clip((z - (bbmin[2] + Htot * 0.80)) / (Htot * 0.045), 0, 1)
    dv = r["DV"] + (r["HDV"] - r["DV"]) * t
    du = r["DU"] + (r["HDU"] - r["DU"]) * t
    v = int(round(r["y1"] + dv - (z - bbmin[2]) * r["SC"]))
    if v < 0 or v >= r["fg"].shape[0]:
        tgt.append(None); continue
    cols = np.where(r["fg"][v])[0]
    if len(cols) < 3:
        tgt.append(None); continue
    ys = [(u - r["cx_img"] - du) / (r["sign"] * r["SC"]) + r["cx_w"] for u in (cols.min(), cols.max())]
    tgt.append((min(ys), max(ys)))
fixed = 0
dz = rows[1] - rows[0]
S = np.full(len(rows), np.nan); O = np.full(len(rows), np.nan)
for k, z in enumerate(rows):
    if tgt[k] is None:
        continue
    sel = head & (np.abs(mesh_co[:, 2] - z) <= dz * 0.5)
    if sel.sum() < 10:
        continue
    y = mesh_co[sel, 1]
    lo, hi = y.min(), y.max()
    a, b = tgt[k]
    sc = np.clip((b - a) / max(hi - lo, 1e-4), 0.8, 1.2)
    S[k] = sc
    O[k] = (a + b) / 2 - sc * (lo + hi) / 2
# fill gaps and smooth along height
idx = np.arange(len(rows)); ok = ~np.isnan(S)
S = np.interp(idx, idx[ok], S[ok]); O = np.interp(idx, idx[ok], O[ok])
ker = np.ones(11) / 11
Sp = np.convolve(np.pad(S, 5, mode="edge"), ker, mode="valid")
Op = np.convolve(np.pad(O, 5, mode="edge"), ker, mode="valid")
zs = mesh_co[head, 2]
s_v = np.interp(zs, rows, Sp); o_v = np.interp(zs, rows, Op)
wgt = np.clip((zs - z_lo) / (Htot * 0.03), 0, 1)
y0 = mesh_co[head, 1]
mesh_co[head, 1] = y0 + ((y0 * s_v + o_v) - y0) * wgt
fixed = int(head.sum())
print("depth scale range", round(Sp.min(), 3), round(Sp.max(), 3), flush=True)
for i, v in enumerate(obj.data.vertices):
    if head[i]:
        v.co.y = mesh_co[i, 1]
obj.data.update()
print("head depth fitted; vertices moved", fixed, flush=True)
co = np.array([v.co[:] for v in obj.data.vertices])
bbmin, bbmax = co.min(0), co.max(0)
VERTS = np.array([v.co[:] for v in obj.data.vertices], np.float32)
REG.clear()

# ---------------------------------------------------------------- UV unwrap
bpy.ops.object.mode_set(mode="EDIT")
bpy.ops.mesh.select_all(action="SELECT")
bpy.ops.uv.smart_project(angle_limit=math.radians(66), island_margin=0.003, area_weight=0.0)
bpy.ops.object.mode_set(mode="OBJECT")
bpy.ops.object.shade_smooth()

# ---------------------------------------------------------------- bake position & normal
scene = bpy.context.scene
scene.render.engine = "CYCLES"
scene.cycles.device = "GPU"
try:
    prefs = bpy.context.preferences.addons["cycles"].preferences
    prefs.compute_device_type = "METAL"
    prefs.get_devices()
    for d in prefs.devices:
        d.use = True
except Exception as e:  # noqa: BLE001
    print("gpu setup", e)
scene.cycles.samples = 1
scene.render.bake.margin = 8

mat = bpy.data.materials.new("bake")
mat.use_nodes = True
obj.data.materials.clear()
obj.data.materials.append(mat)
nt = mat.node_tree
for n in list(nt.nodes):
    nt.nodes.remove(n)
outn = nt.nodes.new("ShaderNodeOutputMaterial")
emit = nt.nodes.new("ShaderNodeEmission")
geo = nt.nodes.new("ShaderNodeNewGeometry")
nt.links.new(emit.outputs[0], outn.inputs["Surface"])
img_node = nt.nodes.new("ShaderNodeTexImage")
nt.nodes.active = img_node


def bake_vec(socket_name, name):
    img = bpy.data.images.new(name, TEX, TEX, alpha=False, float_buffer=True)
    img.colorspace_settings.name = "Non-Color"
    img_node.image = img
    for l in list(nt.links):
        if l.to_node == emit:
            nt.links.remove(l)
    nt.links.new(geo.outputs[socket_name], emit.inputs["Color"])
    bpy.ops.object.bake(type="EMIT")
    arr = np.array(img.pixels[:], dtype=np.float32).reshape(TEX, TEX, 4)[..., :3]
    return arr


pos = bake_vec("Position", "pos")
nor = bake_vec("Normal", "nor")
filled = np.linalg.norm(nor, axis=-1) > 0.5
print("baked; filled texels", int(filled.sum()))

dirs = {"front": np.array([0, -1, 0]), "back": np.array([0, 1, 0]), "left": np.array([-1, 0, 0]), "right": np.array([1, 0, 0])}
# The character faces -Y: its left side is +X? MPFB-style convention: character's left = +X when facing -Y.
dirs["left"] = np.array([1, 0, 0])
dirs["right"] = np.array([-1, 0, 0])

from mathutils.bvhtree import BVHTree
dg = bpy.context.evaluated_depsgraph_get()
bvh = BVHTree.FromObject(obj, dg)

acc = np.zeros(pos.shape, np.float32)
wsum = np.zeros(pos.shape[:2], np.float32)
P = pos[filled]
N = nor[filled]
POWER = {"front": 6, "back": 6, "left": 8, "right": 8}
for name in ("front", "back", "left", "right"):
    d = dirs[name].astype(np.float32)
    facing = N @ d
    thresh = 0.05 if name in ("front", "back") else 0.45
    cand = np.where(facing > thresh)[0]
    # occlusion: cast toward the view camera; anything in the way means this view did not see the texel
    visible = np.zeros(len(P), bool)
    dv = Vector(d.tolist())
    for i in cand:
        o = Vector(P[i].tolist()) + dv * 0.002
        if bvh.ray_cast(o, dv, 3.0)[0] is None:
            visible[i] = True
    col, inside = make_sampler(name)(P)
    w = np.clip(facing, 0, 1) ** POWER[name]
    w = w * inside * visible
    if name in ("left", "right"):
        fb = np.maximum(N @ dirs["front"], N @ dirs["back"])
        w = w * np.clip(1.0 - fb / 0.45, 0, 1)
    tmp = np.zeros(pos.shape, np.float32); tmp[filled] = col * w[:, None]
    acc += tmp
    tw = np.zeros(pos.shape[:2], np.float32); tw[filled] = w
    wsum += tw
    print("view", name, "candidates", len(cand), "visible", int(visible.sum()), flush=True)
tex = np.where(wsum[..., None] > 1e-4, acc / np.maximum(wsum[..., None], 1e-4), 0)
# fill texels nobody saw (top of head, under the chin, soles) with the nearest view colour average
unseen = filled & (wsum < 1e-4)
print("unseen texels", int(unseen.sum()))


def push_pull(img, mask):
    """Fill pixels where mask is False with smooth averages of known pixels (pyramid)."""
    levels = [(img * mask[..., None], mask.astype(np.float32))]
    while levels[-1][1].shape[0] > 8:
        c, m = levels[-1]
        h, w = m.shape
        c2 = c.reshape(h // 2, 2, w // 2, 2, 3).sum((1, 3))
        m2 = m.reshape(h // 2, 2, w // 2, 2).sum((1, 3))
        levels.append((c2, m2))
    c, m = levels[-1]
    cur = np.where(m[..., None] > 0, c / np.maximum(m[..., None], 1e-6), c.mean((0, 1)))
    for c, m in reversed(levels[:-1]):
        up = np.repeat(np.repeat(cur, 2, 0), 2, 1)
        known = m > 0
        cur = np.where(known[..., None], c / np.maximum(m[..., None], 1e-6), up)
    return cur


seen = wsum > 1e-4
from mathutils.kdtree import KDTree
seen_idx = np.argwhere(seen & filled)
uns_idx = np.argwhere(filled & ~seen)
step = max(1, len(seen_idx) // 400000)
ref = seen_idx[::step]
kd = KDTree(len(ref))
for k, (y, x) in enumerate(ref):
    kd.insert(pos[y, x].tolist(), k)
kd.balance()
for (y, x) in uns_idx:
    acc_c = np.zeros(3, np.float32); n_ = 0
    for (_co, k, _d) in kd.find_n(pos[y, x].tolist(), 6):
        yy, xx = ref[k]; acc_c += tex[yy, xx]; n_ += 1
    tex[y, x] = acc_c / max(1, n_)
print("filled unseen by 3D nearest", len(uns_idx), flush=True)
tex = push_pull(tex, filled)  # only pads UV-island gutters now

out_img = bpy.data.images.new(f"{WHO}_albedo", TEX, TEX, alpha=True)
rgba = np.concatenate([tex, np.ones(tex.shape[:2] + (1,), np.float32)], -1)
out_img.pixels[:] = rgba.ravel()
out_img.filepath_raw = os.path.join(OUT, f"{WHO}_albedo.png")
out_img.file_format = "PNG"
out_img.save()

# ---------------------------------------------------------------- final material
for n in list(nt.nodes):
    nt.nodes.remove(n)
outn = nt.nodes.new("ShaderNodeOutputMaterial")
bsdf = nt.nodes.new("ShaderNodeBsdfPrincipled")
t = nt.nodes.new("ShaderNodeTexImage"); t.image = out_img
nt.links.new(t.outputs[0], bsdf.inputs["Base Color"])
bsdf.inputs["Roughness"].default_value = 0.6
nt.links.new(bsdf.outputs[0], outn.inputs["Surface"])

bpy.ops.wm.save_as_mainfile(filepath=os.path.join(OUT, f"{WHO}_textured.blend"))
bpy.ops.export_scene.gltf(filepath=os.path.join(OUT, f"{WHO}_textured.glb"), export_format="GLB")
print("TEXTURED", WHO)

# ---------------------------------------------------------------- comparison renders (same angles as the sheet)
scene.render.engine = "BLENDER_EEVEE_NEXT"
scene.render.resolution_x = 700
scene.render.resolution_y = 1100
scene.view_settings.view_transform = "Standard"
world = bpy.data.worlds.new("w"); world.use_nodes = True
world.node_tree.nodes["Background"].inputs[0].default_value = (1, 1, 1, 1)
world.node_tree.nodes["Background"].inputs[1].default_value = 1.0
scene.world = world
# unlit-ish preview: emission from the albedo so colours compare 1:1 with the sheet
for n in list(nt.nodes):
    nt.nodes.remove(n)
o2 = nt.nodes.new("ShaderNodeOutputMaterial"); em = nt.nodes.new("ShaderNodeEmission")
t2 = nt.nodes.new("ShaderNodeTexImage"); t2.image = out_img
nt.links.new(t2.outputs[0], em.inputs[0]); nt.links.new(em.outputs[0], o2.inputs["Surface"])
bpy.ops.object.camera_add()
cam = bpy.context.active_object; scene.camera = cam
cam.data.type = "ORTHO"; cam.data.ortho_scale = (bbmax[2] - bbmin[2]) * 1.06
zc = (bbmax[2] + bbmin[2]) / 2
for name, loc in (("front", (0, -6, zc)), ("side", (-6, 0, zc)), ("back", (0, 6, zc))):
    cam.location = loc
    cam.rotation_euler = (Vector((0, 0, zc)) - Vector(loc)).to_track_quat("-Z", "Y").to_euler()
    scene.render.filepath = os.path.join(OUT, f"{WHO}_cmp_{name}.png")
    bpy.ops.render.render(write_still=True)
print("RENDERED", WHO)

# ---------------------------------------------------------------- head close-ups (perspective)
cam.data.type = "PERSP"; cam.data.lens = 85
zc = bbmin[2] + (bbmax[2] - bbmin[2]) * 0.905
scene.render.resolution_x = 800; scene.render.resolution_y = 800
for name, loc in (("headfront", (0, -1.15, zc)), ("head34", (-0.8, -0.85, zc)), ("headside", (-1.15, 0, zc))):
    cam.location = loc
    cam.rotation_euler = (Vector((0, 0, zc)) - Vector(loc)).to_track_quat("-Z", "Y").to_euler()
    scene.render.filepath = os.path.join(OUT, f"{WHO}_{name}.png")
    bpy.ops.render.render(write_still=True)
print("HEADS", WHO)
