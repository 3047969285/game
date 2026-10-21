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
POSE = tuple(fit.get("pose_q34", [YAW, 0.0, 0.0]))
POSE_R = (-POSE[0], POSE[1], -POSE[2])     # mirrored 3/4 photo

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


def _rot(v, axis, deg):
    a_ = math.radians(deg); axis = axis / np.linalg.norm(axis)
    return v * math.cos(a_) + np.cross(axis, v) * math.sin(a_) + axis * (axis @ v) * (1 - math.cos(a_))


def frame(pose):
    yaw, pitch, roll = (pose, 0.0, 0.0) if np.isscalar(pose) else pose
    t = math.radians(yaw)
    d = np.array([math.sin(t), -math.cos(t), 0.0]); r = np.array([math.cos(t), math.sin(t), 0.0]); u = np.array([0.0, 0.0, 1.0])
    d, u = _rot(d, r, pitch), _rot(u, r, pitch)
    r, u = _rot(r, d, roll), _rot(u, d, roll)
    return d, r, u


def axes(pose):
    d, r, _ = frame(pose)
    return d, r


def place_cam(pose):
    from mathutils import Matrix
    d, r, u = frame(pose)
    cam.location = Vector((hc + d * 3).tolist())
    cam.rotation_euler = Matrix([[r[0], u[0], d[0]], [r[1], u[1], d[1]], [r[2], u[2], d[2]]]).to_euler()
    return d, r, u


def landmarks(path):
    j = path + ".lm.json"
    subprocess.run([VENV_PY, os.path.join(HERE, "landmarks468.py"), path, j], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    p = json.load(open(j))
    return np.array(p) if p else None


def align_view(yaw, photo):
    d, r, u = place_cam(yaw)
    tag = "_".join(str(int(round(x))) for x in (yaw if not np.isscalar(yaw) else (yaw,)))
    path = os.path.join(OUT, f"{WHO}_mpfb_align_{tag}.png"); scene.render.filepath = path
    bpy.ops.render.render(write_still=True)
    R = landmarks(path); Pp = landmarks(photo)
    if R is None or Pp is None:
        print("align", yaw, "failed", flush=True); return None
    # render pixel -> view coords (h along r, z along u); photo pixel = k * (h, -z) + t
    hw = (R[:, 0] - RES / 2) * ORTHO / RES + hc @ r
    zw = hc @ u - (R[:, 1] - RES / 2) * ORTHO / RES
    M = np.zeros((2 * len(R), 3)); y = np.zeros(2 * len(R))
    M[0::2, 0] = hw; M[0::2, 1] = 1; y[0::2] = Pp[:, 0]
    M[1::2, 0] = -zw; M[1::2, 2] = 1; y[1::2] = Pp[:, 1]
    (k, tu, tv), *_ = np.linalg.lstsq(M, y, rcond=None)
    rms = float(np.sqrt(((M @ np.array([k, tu, tv]) - y) ** 2).mean()))
    print("align", yaw, "rms px", round(rms, 1), flush=True)
    return dict(k=k, tu=tu, tv=tv, r=r, d=d, u=u, rms=rms, lm=Pp)


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


VIEWS_USE = [("front", 0, "front"), ("q34", POSE, "q34"), ("q34r", POSE_R, "q34r")]
BROW = [70, 63, 105, 66, 107, 55, 65, 52, 53, 46, 300, 293, 334, 296, 336, 285, 295, 282, 283, 276]
BROW_L, BROW_R = BROW[:10], BROW[10:]
EYE_L = [33, 7, 163, 144, 145, 153, 154, 155, 133, 173, 157, 158, 159, 160, 161, 246]
EYE_R = [263, 249, 390, 373, 374, 380, 381, 382, 362, 398, 384, 385, 386, 387, 388, 466]
LIPS = [61, 146, 91, 181, 84, 17, 314, 405, 321, 375, 291, 409, 270, 269, 267, 0, 37, 39, 40, 185]


def hull_mask(pts, H, W):
    pts = sorted(map(tuple, pts))
    def half(seq):
        h = []
        for p_ in seq:
            while len(h) >= 2 and (h[-1][0] - h[-2][0]) * (p_[1] - h[-2][1]) - (h[-1][1] - h[-2][1]) * (p_[0] - h[-2][0]) <= 0:
                h.pop()
            h.append(p_)
        return h
    hull = half(pts)[:-1] + half(pts[::-1])[:-1]
    yy, xx = np.mgrid[0:H, 0:W]
    m = np.ones((H, W), bool)
    for a_, b_ in zip(hull, hull[1:] + hull[:1]):
        m &= (b_[0] - a_[0]) * (yy - a_[1]) - (b_[1] - a_[1]) * (xx - a_[0]) >= 0
    return m


def dilate(m, rr):
    out = m.copy()
    for dy in range(-rr, rr + 1):
        for dx in range(-rr, rr + 1):
            out |= np.roll(np.roll(m, dy, 0), dx, 1)
    return out


def usable_pixels(px, lm):
    """True where the photo shows skin of the face: no hair strands, shirt or background."""
    Hh, Ww = px.shape[:2]
    mx, mn, lum = px.max(-1), px.min(-1), px.mean(-1)
    fg = erode(np.abs(px - 1.0).sum(-1) > 0.10, 2)
    if WHO == "male":
        hair = (lum < 0.33) & ((mx - mn) < 0.10)
    else:
        r_, g_, b_ = px[..., 0], px[..., 1], px[..., 2]
        hair = (r_ > g_ * 1.35) & (r_ > b_ * 1.25) & (lum < 0.55) & ((mx - mn) > 0.12)
    # skin has chroma (r > b); hair, shirt, collar shadows and background do not
    nonskin = (px[..., 0] - px[..., 2]) < 0.045
    # brows, lashes and eyes are dark too: protect the face hull below the top of the brows
    # protect only the brows, eyes and lips (they are dark / low-chroma but belong to the face)
    lm = np.asarray(lm)
    protect = np.zeros((Hh, Ww), bool)
    for grp, grow in ((BROW_L, 0.25), (BROW_R, 0.25), (EYE_L, 0.35), (EYE_R, 0.35), (LIPS, 0.15)):
        g = lm[grp]; c_ = g.mean(0)
        protect |= hull_mask(c_ + (g - c_) * (1 + grow), Hh, Ww)
    bad = dilate((hair | nonskin) & ~protect, 6) & ~protect
    ok = fg & ~bad
    # soft confidence: low next to masked pixels (strand edges are mixed colours)
    conf = (ok.astype(np.float32) + erode(ok, 3) + erode(ok, 6) + erode(ok, 10)) / 4.0
    return conf


P = pos[headmask]; N = nor[headmask]
acc = np.zeros((len(P), 3), np.float32); wsum = np.zeros(len(P), np.float32)
for name, pose, fname in VIEWS_USE:
    photo = os.path.join(VIEWS, f"{WHO}_{fname}.png")
    al = align_view(pose, photo)
    if al is None or al["rms"] > 25:
        continue
    px = load_rgb(photo); Hh, Ww = px.shape[:2]
    ok_px = usable_pixels(px, al["lm"])
    u = al["tu"] + (P @ al["r"]) * al["k"]; v = al["tv"] - (P @ al["u"]) * al["k"]
    inb = (u >= 0) & (u < Ww - 1) & (v >= 0) & (v < Hh - 1)
    ui = np.clip(np.round(u).astype(int), 0, Ww - 1); vi = np.clip(np.round(v).astype(int), 0, Hh - 1)
    col = px[vi, ui]; inside = ok_px[vi, ui] * inb
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
    print("view", name, "texels", int((wt > 0).sum()), "usable px", round(float(ok_px.mean()), 3), flush=True)
    if name == "front":
        lmf = np.asarray(al["lm"])
        Z_BROWTOP = (al["tv"] - lmf[BROW, 1].min()) / al["k"]
        Z_CHIN = (al["tv"] - lmf[152, 1]) / al["k"]

seen = wsum > 1e-4
proj = np.where(seen[:, None], acc / np.maximum(wsum[:, None], 1e-4), 0)

# ---- delight: divide out large-scale shading (3D-smoothed luminance)
lum = proj.mean(1)
vox = height * 0.0055
key = np.floor((P - P.min(0)) / vox).astype(int)
G = key.max(0) + 1
FK = (P - P.min(0)) / vox                       # continuous voxel coords
PAD = 12


def _blur(A, passes, width):
    for ax_ in range(3):
        for _ in range(passes):
            c = np.cumsum(np.pad(A, [(width + 1, width) if a == ax_ else (0, 0) for a in range(3)]
                                 + [(0, 0)] * (A.ndim - 3)), axis=ax_)
            sl_hi = [slice(None)] * A.ndim; sl_lo = [slice(None)] * A.ndim
            sl_hi[ax_] = slice(2 * width + 1, None); sl_lo[ax_] = slice(0, -(2 * width + 1))
            A = c[tuple(sl_hi)] - c[tuple(sl_lo)]
    return A


def voxel_field(vals, mask, passes=4, width=3):
    """smoothed average of vals (n, c) over the texels in mask, trilinearly sampled at every texel."""
    c_ = vals.shape[1]
    Gp = tuple(G + 2 * PAD)
    S = np.zeros(Gp + (c_,)); Cn = np.zeros(Gp)
    kk = key[mask] + PAD
    np.add.at(S, tuple(kk.T), vals[mask]); np.add.at(Cn, tuple(kk.T), 1)
    S = _blur(S, passes, width); Cn = _blur(Cn, passes, width)
    f = FK + PAD - 0.5
    i0_ = np.floor(f).astype(int); fr = f - i0_
    outS = np.zeros((len(P), c_)); outC = np.zeros(len(P))
    for dx in (0, 1):
        for dy in (0, 1):
            for dz in (0, 1):
                wgt = (fr[:, 0] if dx else 1 - fr[:, 0]) * (fr[:, 1] if dy else 1 - fr[:, 1]) * (fr[:, 2] if dz else 1 - fr[:, 2])
                idx = (i0_[:, 0] + dx, i0_[:, 1] + dy, i0_[:, 2] + dz)
                outS += S[idx] * wgt[:, None]; outC += Cn[idx] * wgt
    return outS / np.maximum(outC, 1e-9)[:, None], outC


smooth = voxel_field(lum[:, None].astype(np.float64), seen, passes=3, width=2)[0][:, 0]
target = np.median(smooth[seen])
DELIGHT = float(os.environ.get("DELIGHT", "0.7"))
gain = np.where(seen, (target / np.maximum(smooth, 1e-3)) ** DELIGHT, 1.0)
proj = np.clip(proj * gain[:, None], 0, 1)

# ---- fill: stock skin detail carried at the photo's local tone; soft blend into the projection
old = base_px[headmask][:, :3].astype(np.float64)
good = seen & (wsum > 0.05)
glob = proj[good].mean(0) / np.maximum(old[good].mean(0), 1e-3)
Cp, covp = voxel_field(proj, good)
Co, _ = voxel_field(old, np.ones(len(P), bool))
Cp = np.where(covp[:, None] > 1e-6, Cp, Co * glob)
fill = np.clip(old * Cp / np.maximum(Co, 1e-3), 0, 1)
ws, _ = voxel_field(wsum[:, None].astype(np.float64), np.ones(len(P), bool), passes=3, width=1)
alpha = np.clip(np.minimum(wsum / 0.2, ws[:, 0] / 0.12), 0, 1) ** 1.5
alpha *= np.clip((P[:, 2] - (NECK_Z - height * 0.015)) / (height * 0.03), 0, 1)
# forehead above the brows is seen only between fringe strands: take the clean fill there
alpha *= np.clip(1.0 - (P[:, 2] - (Z_BROWTOP + height * 0.002)) / (height * 0.006), 0, 1)
# neck: the collar edge shadows sit there, fade out below the jaw
alpha *= np.clip((P[:, 2] - (Z_CHIN - height * 0.02)) / (height * 0.015), 0, 1)
new = fill * (1 - alpha[:, None]) + proj * alpha[:, None]
# blend into the (globally toned) body texture at the bottom of the head region -> no seam
wb = np.clip((P[:, 2] - (NECK_Z - height * 0.02)) / (height * 0.03), 0, 1)
new = new * wb[:, None] + np.clip(old * glob, 0, 1) * (1 - wb[:, None])
# scalp under the hair: dark hair-root colour so gaps between cards never show bare skin
sys.path.insert(0, HERE)
import hairline
lm3 = {int(k_): np.array(v_) for k_, v_ in json.load(open(os.path.join(OUT, f"{WHO}_lm3d.json"))).items()}
S_ = height / {"male": 1.84, "female": 1.68}[WHO]
hcs = hc.copy(); hcs[0] = 0.5 * (lm3[234][0] + lm3[454][0])
zb_ = max(lm3[105][2], lm3[334][2])
sw_ = hairline.scalp_weight(P, hcs, zb_, top, WHO, 0.010 * S_)
ROOT = {"male": np.array([0.045, 0.036, 0.034]), "female": np.array([0.16, 0.06, 0.055])}[WHO]
new = new * (1 - 0.88 * sw_[:, None]) + ROOT * 0.88 * sw_[:, None]
# hair occlusion baked along the hairline (the fringe and sides shadow the skin right under them)
sw_ao = hairline.scalp_weight(P, hcs, zb_, top, WHO, 0.05 * S_)
new = new * (1 - 0.22 * np.clip(sw_ao - sw_, 0, 1))[:, None]
print("photo/stock tone ratio", np.round(glob, 3), flush=True)
# the rest of the body takes the same tone
base_px[..., :3] = np.clip(base_px[..., :3] * glob, 0, 1)
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
for name, yaw in (("front", 0), ("q34", POSE), ("side", 90)):
    place_cam(yaw)
    scene.render.filepath = os.path.join(OUT, f"{WHO}_mpfb_{name}.png")
    bpy.ops.render.render(write_still=True)
bpy.ops.wm.save_as_mainfile(filepath=os.path.join(OUT, f"{WHO}_textured.blend"))
print("MPFB DONE", WHO)
