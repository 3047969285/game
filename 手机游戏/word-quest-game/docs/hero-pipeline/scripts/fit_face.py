"""Fit an MPFB (MakeHuman) head to reference photos by solving its face targets against
MediaPipe's 468 face landmarks.

Usage: Blender -b -P fit_face.py -- <who> <out_dir> <front.png> <q34.png>

Stages
 1. build the base human (macro sliders only), skin + eyes + brows + lashes, no hair
 2. render the head orthographically from the front, detect landmarks, raycast each landmark to the
    mesh -> (face, barycentric) anchors; landmark = linear function of vertex positions
 3. load every face/head target as a shape key -> per-anchor deltas (linear basis)
 4. detect landmarks on the photos; solve weights w (bounded, regularised) + per-view similarity
    (scale, offset) by alternating least squares; q34 yaw is searched
 5. apply the weights, save the .blend and comparison renders
"""
import bpy, sys, os, json, math, subprocess
import numpy as np
from mathutils import Vector
from mathutils.bvhtree import BVHTree

from bl_ext.user_default.mpfb.services.humanservice import HumanService
from bl_ext.user_default.mpfb.services.targetservice import TargetService
from bl_ext.user_default.mpfb.services.locationservice import LocationService

a = sys.argv[sys.argv.index("--") + 1:]
WHO, OUT, FRONT, Q34 = a[0], a[1], a[2], a[3]
os.makedirs(OUT, exist_ok=True)
HERE = os.path.dirname(os.path.abspath(__file__))
VENV_PY = os.path.expanduser("~/.local/share/hunyuan3d/.venv/bin/python")
DATA = LocationService.get_user_data()
SYS_TARGETS = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(
    sys.modules["bl_ext.user_default.mpfb"].__file__))), "mpfb", "data", "targets")
if not os.path.isdir(SYS_TARGETS):
    SYS_TARGETS = os.path.join(os.path.dirname(sys.modules["bl_ext.user_default.mpfb"].__file__), "data", "targets")

for o in list(bpy.data.objects):
    bpy.data.objects.remove(o, do_unlink=True)

MACRO = {
    "male": {"gender": 1.0, "age": 0.48, "muscle": 0.6, "weight": 0.38, "proportions": 1.0, "height": 0.82,
             "cupsize": 0.5, "firmness": 0.5, "race": {"asian": 0.72, "caucasian": 0.28, "african": 0.0}},
    "female": {"gender": 0.0, "age": 0.42, "muscle": 0.45, "weight": 0.38, "proportions": 1.0, "height": 0.55,
               "cupsize": 0.55, "firmness": 0.65, "race": {"asian": 0.75, "caucasian": 0.25, "african": 0.0}},
}[WHO]
SKIN = {"male": "skins/young_asian_male/young_asian_male.mhmat",
        "female": "skins/young_asian_female/young_asian_female.mhmat"}[WHO]

basemesh = HumanService.create_human(macro_detail_dict=MACRO, feet_on_ground=True, scale=0.1)
eyes_dir = os.path.join(DATA, "eyes", "high-poly")
eyes_file = next(os.path.join(eyes_dir, f) for f in os.listdir(eyes_dir) if f.endswith(".mhclo"))
HumanService.add_mhclo_asset(eyes_file, basemesh, asset_type="Eyes", subdiv_levels=1, material_type="MAKESKIN")
HumanService.set_character_skin(os.path.join(DATA, SKIN), basemesh, skin_type="ENHANCED_SSS")
bpy.context.view_layer.update()


def eval_verts(obj):
    saved = [(m, m.show_viewport) for m in obj.modifiers]
    for m, _ in saved:
        m.show_viewport = False
    bpy.context.view_layer.update()
    dg = bpy.context.evaluated_depsgraph_get()
    ev = obj.evaluated_get(dg)
    mw = obj.matrix_world
    out = np.array([(mw @ v.co)[:] for v in ev.data.vertices])
    for m, vis in saved:
        m.show_viewport = vis
    bpy.context.view_layer.update()
    return out


V0 = eval_verts(basemesh)
top = V0[:, 2].max()
height = top - V0[:, 2].min()
head_sel = V0[:, 2] > top - height * 0.14
hc = V0[head_sel].mean(0)
HEAD_H = height * 0.135
print("height", round(height, 3), "head centre", np.round(hc, 3), flush=True)

# ---------------------------------------------------------------- render helpers
scene = bpy.context.scene
scene.render.engine = "BLENDER_EEVEE_NEXT"
scene.view_settings.view_transform = "Standard"
w = bpy.data.worlds.new("w"); w.use_nodes = True
w.node_tree.nodes["Background"].inputs[0].default_value = (1, 1, 1, 1)
w.node_tree.nodes["Background"].inputs[1].default_value = 1.0
scene.world = w
cd = bpy.data.cameras.new("cam"); cam = bpy.data.objects.new("cam", cd); scene.collection.objects.link(cam)
scene.camera = cam; cd.type = "ORTHO"
RES = 1024
ORTHO = HEAD_H * 1.6
scene.render.resolution_x = RES; scene.render.resolution_y = RES


def view_axes(yaw_deg):
    t = math.radians(yaw_deg)
    d = np.array([math.sin(t), -math.cos(t), 0.0])   # toward camera
    r = np.array([math.cos(t), math.sin(t), 0.0])    # image right
    return d, r


def render(path, yaw_deg):
    d, r = view_axes(yaw_deg)
    cd.ortho_scale = ORTHO
    cam.location = Vector((hc + d * 3).tolist())
    cam.rotation_euler = (Vector(hc.tolist()) - cam.location).to_track_quat("-Z", "Y").to_euler()
    scene.render.filepath = path
    bpy.ops.render.render(write_still=True)
    return d, r


def detect(path):
    outj = path + ".lm.json"
    subprocess.run([VENV_PY, os.path.join(HERE, "landmarks468.py"), path, outj],
                   stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    pts = json.load(open(outj))
    return np.array(pts) if pts else None


# ---------------------------------------------------------------- stage 2: anchors
front_png = os.path.join(OUT, f"{WHO}_fit_base_front.png")
render(front_png, 0)
L = detect(front_png)
assert L is not None, "no landmarks on base render"
mesh = basemesh.evaluated_get(bpy.context.evaluated_depsgraph_get()).data
vg_ids = {g.name: g.index for g in basemesh.vertex_groups}
# everything outside the "body" group is helper geometry (eye/lash/teeth/tights/hair proxies, joint cubes)
helper_v = np.ones(len(basemesh.data.vertices), bool)
bid = vg_ids.get("body")
for v in basemesh.data.vertices:
    for g in v.groups:
        if g.group == bid and g.weight > 0.5:
            helper_v[v.index] = False
tris = [tuple(p.vertices) for p in basemesh.data.polygons if not any(helper_v[i] for i in p.vertices)]
bvh = BVHTree.FromPolygons([tuple(v) for v in V0], tris)
anchors = []
for (px, py) in L:
    x = hc[0] + (px - RES / 2) * ORTHO / RES
    z = hc[2] - (py - RES / 2) * ORTHO / RES
    hit = bvh.ray_cast(Vector((x, hc[1] - 2.0, z)), Vector((0, 1, 0)), 5.0)
    if hit[0] is None:
        anchors.append(None); continue
    poly = tris[hit[2]]
    P = np.array(hit[0][:])
    # barycentric over the polygon's first triangle fan
    best = None
    for k in range(1, len(poly) - 1):
        A, B, C = V0[poly[0]], V0[poly[k]], V0[poly[k + 1]]
        v0, v1, v2 = B - A, C - A, P - A
        d00, d01, d11, d20, d21 = v0 @ v0, v0 @ v1, v1 @ v1, v2 @ v0, v2 @ v1
        den = d00 * d11 - d01 * d01
        if abs(den) < 1e-12:
            continue
        bv = (d11 * d20 - d01 * d21) / den; bw = (d00 * d21 - d01 * d20) / den; bu = 1 - bv - bw
        err = min(bu, bv, bw)
        if best is None or err > best[0]:
            best = (err, (poly[0], poly[k], poly[k + 1]), (bu, bv, bw))
    anchors.append(best[1:] if best else None)
valid = [i for i, a_ in enumerate(anchors) if a_ is not None]
print("anchors", len(valid), "of", len(L), flush=True)


def anchor_pos(Vx):
    return np.array([sum(b * Vx[i] for i, b in zip(*anchors[k])) for k in valid])


A0 = anchor_pos(V0)
# midline vertices of the face front (for the side-profile fit)
_xc = hc[0]
_zb = A0[valid.index(9), 2] if 9 in valid else top - height * 0.06      # between the brows
_zc = A0[valid.index(152), 2] if 152 in valid else top - height * 0.13  # chin
MID = np.where((np.abs(V0[:, 0] - _xc) < height * 0.03) & (V0[:, 2] < _zb) & (V0[:, 2] > _zc - height * 0.035)
               & (V0[:, 1] < hc[1]) & ~helper_v)[0]
ZBINS = np.linspace(_zc - height * 0.035, _zb, 70)
M0 = V0[MID]
print("midline verts", len(MID), "zb", round(_zb,3), "zc", round(_zc,3), "top", round(top,3), "height", round(height,3), "Mz", np.round([V0[MID,2].min(), V0[MID,2].max()],3), "nose", np.round(A0[valid.index(4)],3), flush=True)

# ---------------------------------------------------------------- stage 3: target basis
REGIONS = ["head", "forehead", "eyebrows", "eyes", "nose", "mouth", "ears", "chin", "cheek", "neck"]
files = []
for reg in REGIONS:
    d = os.path.join(SYS_TARGETS, reg)
    if os.path.isdir(d):
        files += sorted(os.path.join(d, f) for f in os.listdir(d) if f.endswith(".target.gz"))
print("targets", len(files), flush=True)
if not basemesh.data.shape_keys:
    basemesh.shape_key_add(name="Basis", from_mix=False)
names, deltas, mdeltas = [], [], []
for f in files:
    nm = "fit_" + os.path.basename(f).replace(".target.gz", "")
    try:
        sk = TargetService.load_target(basemesh, f, weight=1.0, name=nm)
    except Exception as e:  # noqa: BLE001
        print("skip", f, e); continue
    bpy.context.view_layer.update()
    Vk = eval_verts(basemesh)
    deltas.append(anchor_pos(Vk) - A0)
    mdeltas.append(Vk[MID] - M0)
    sk.value = 0.0
    names.append(nm)
bpy.context.view_layer.update()
D = np.stack(deltas, -1)  # (n_anchor, 3, n_targets)
DM = np.stack(mdeltas, -1)  # (n_mid, 3, n_targets)
print("basis", D.shape, flush=True)

# ---------------------------------------------------------------- stage 4: solve
def photo_lm(path):
    pts = detect(path)
    assert pts is not None, f"no landmarks in {path}"
    return pts[valid]


PF = photo_lm(FRONT)
PQ = photo_lm(Q34)
nT = D.shape[2]


def proj(points, yaw):
    _, r = view_axes(yaw)
    return np.stack([points @ r, -points[:, 2]], -1)  # (u, v) up to similarity


# incr/decr pair coupling: penalise w_incr * w_decr co-activation via off-diagonal terms
PAIR = np.zeros((nT, nT))
for i, n in enumerate(names):
    if n.endswith("-incr"):
        j = names.index(n[:-5] + "-decr") if (n[:-5] + "-decr") in names else -1
        if j >= 0:
            PAIR[i, j] = PAIR[j, i] = 1.0
    for a_, b_ in (("-up", "-down"), ("-in", "-out"), ("-forward", "-backward"), ("-concave", "-convex")):
        if n.endswith(a_) and (n[: -len(a_)] + b_) in names:
            j = names.index(n[: -len(a_)] + b_)
            PAIR[i, j] = PAIR[j, i] = 1.0

# ---------------------------------------------------------------- side-profile contour from the side photo
PROFILE = None
SIDE = os.path.join(os.path.dirname(FRONT), f"{WHO}_left.png")
if os.path.exists(SIDE):
    im = bpy.data.images.load(SIDE); sw, sh = im.size
    spx = np.array(im.pixels[:], dtype=np.float32).reshape(sh, sw, 4)[::-1, :, :3]
    skin = (np.abs(spx - 1.0).sum(-1) > 0.15) & (spx.mean(-1) > 0.2) & (spx[..., 0] - spx[..., 2] > 0.04)
    R0, R1 = [int(x) for x in os.environ.get("PROFILE_ROWS", "380,905").split(",")]
    pts = []
    for y_ in range(R0, R1):
        xs_ = np.nonzero(skin[y_])[0]
        # need a solid run of skin (not a stray strand highlight)
        for x_ in xs_:
            if skin[y_, x_:x_ + 12].all():
                pts.append((x_, y_)); break
    C = np.array(pts, float)
    # resample along arc length so steep and flat parts weigh the same
    seg = np.r_[0, np.cumsum(np.linalg.norm(np.diff(C, axis=0), axis=1))]
    ok_ = np.r_[True, np.diff(seg) < 40]
    C = C[ok_]; seg = np.r_[0, np.cumsum(np.linalg.norm(np.diff(C, axis=0), axis=1))]
    st = np.arange(0, seg[-1], 2.0)
    C = np.stack([np.interp(st, seg, C[:, 0]), np.interp(st, seg, C[:, 1])], -1)
    from mathutils.kdtree import KDTree
    CK = KDTree(len(C))
    for i_, c_ in enumerate(C):
        CK.insert((c_[0], c_[1], 0.0), i_)
    CK.balance()
    CN = np.zeros_like(C)
    for i_, c_ in enumerate(C):
        nn = [C[j] for (_, j, _) in CK.find_n((c_[0], c_[1], 0.0), 9)]
        q = np.array(nn) - np.mean(nn, 0)
        ev_, evec = np.linalg.eigh(q.T @ q)
        n_ = evec[:, 0]
        if n_[0] > 0 or (abs(n_[0]) < 0.2 and False):   # normal points toward the background (left)
            n_ = -n_
        CN[i_] = n_
    PROFILE = (C, CN, CK)
    print("profile contour px", len(C), flush=True)


def side_proj(Pm):
    return np.stack([Pm[:, 1], -Pm[:, 2]], -1)


def lead_idx(Mx):
    """index (into MID) of the most forward vertex in each height bin = the side silhouette."""
    b = np.digitize(Mx[:, 2], ZBINS)
    out = []
    for k in range(1, len(ZBINS)):
        m = np.nonzero(b == k)[0]
        if len(m):
            out.append(m[np.argmin(Mx[m, 1])])
    return np.array(out)


def profile_init(Mx, s0):
    """coarse search: nose tips coincide, scale grid, trimmed chamfer."""
    C, CN, CK = PROFILE
    q = side_proj(Mx[lead_idx(Mx)])
    tip_m = q[np.argmin(q[:, 0])]
    tip_p = C[np.argmin(C[:, 0])]
    SL = detect(SIDE)
    if SL is not None:
        a9, a152 = A0[valid.index(9)], A0[valid.index(152)]
        s_ = (SL[152][1] - SL[9][1]) / (a9[2] - a152[2])
        t_ = tip_p - s_ * tip_m
        print("profile init from side landmarks: scale", round(s_, 1), flush=True)
        return s_, t_
    best = None
    from mathutils.kdtree import KDTree as _KD
    for s_ in np.geomspace(0.5, 6.0, 120) * s0:
        t_ = tip_p - s_ * tip_m
        P_ = s_ * q + t_
        d = np.array([CK.find((p_[0], p_[1], 0.0))[2] for p_ in P_])
        mk = _KD(len(P_))
        for i_, p_ in enumerate(P_):
            mk.insert((p_[0], p_[1], 0.0), i_)
        mk.balance()
        lo, hi = P_[:, 1].min(), P_[:, 1].max()
        Cb = C[(C[:, 1] > lo - 80) & (C[:, 1] < hi + 80)]
        d2 = np.array([mk.find((c_[0], c_[1], 0.0))[2] for c_ in C])  # photo -> model: penalise uncovered contour
        sc = np.sort(d)[: int(len(d) * 0.9)].mean() + np.sort(d2)[: int(len(d2) * 0.9)].mean()
        if best is None or sc < best[0]:
            best = (sc, s_, t_)
    print("profile init scale", round(best[1], 1), "chamfer", round(best[0], 2), flush=True)
    return best[1], best[2]


def fit_similarity(src, dst, wts):
    # dst ≈ s * src + t (shared scale, no rotation)
    wsum = wts.sum()
    ms = (src * wts[:, None]).sum(0) / wsum; md = (dst * wts[:, None]).sum(0) / wsum
    s = ((wts[:, None] * (src - ms) * (dst - md)).sum()) / max(1e-9, (wts[:, None] * (src - ms) ** 2).sum())
    return s, md - s * ms


LAST = {}
# landmarks above the brows sit under the fringe in every photo: MediaPipe only guesses them
VIS = np.where(A0[:, 2] > A0[valid.index(9), 2] + 0.004, 0.0, 1.0)
print("visible landmarks", int(VIS.sum()), flush=True)
PROFILE_W = float(os.environ.get("PROFILE_W", "0.35"))


def solve(yaw_q, iters=8, lam=0.02):
    w = np.zeros(nT)
    wf = VIS.copy(); wq = VIS.copy()
    sp = tp = None; perr = 0.0
    if PROFILE is not None and iters > 0:
        s0, _ = fit_similarity(proj(A0, 0), PF, np.ones(len(valid)))
        sp, tp = profile_init(M0, s0)
    dq, _ = view_axes(yaw_q)
    for it in range(iters):
        X = A0 + (D @ w)
        # down-weight landmarks on the far side of the face in the 3/4 view
        nrm_side = (X - X.mean(0)) @ dq
        wq = np.clip(0.5 + nrm_side / (np.abs(nrm_side).max() + 1e-9), 0.15, 1.0) * VIS
        sf, tf = fit_similarity(proj(X, 0), PF, wf)
        sq, tq = fit_similarity(proj(X, yaw_q), PQ, wq)
        rows, rhs, rw = [], [], []
        for (s, t, yaw, P, ww) in ((sf, tf, 0, PF, wf), (sq, tq, yaw_q, PQ, wq)):
            _, r = view_axes(yaw)
            Ju = s * np.einsum("nct,c->nt", D, r)          # (n, T)
            Jv = -s * D[:, 2, :]
            base = s * proj(A0, yaw) + t
            rows += [Ju, Jv]; rhs += [P[:, 0] - base[:, 0], P[:, 1] - base[:, 1]]; rw += [ww, ww]
        J = np.concatenate(rows); y = np.concatenate(rhs); W = np.concatenate(rw)
        Jw = J * W[:, None]; yw = y * W
        reg = lam * (np.abs(Jw).mean() + 1e-9)
        A_ = Jw.T @ Jw + reg * len(yw) * 1e-3 * np.eye(nT); b_ = Jw.T @ yw
        A_ = A_ + PAIR * (reg * len(yw) * 0.05)
        # side profile silhouette rows (lian2): frontmost point per height row
        if sp is not None:
            Mx = M0 + DM @ w
            li = lead_idx(Mx)
            q = side_proj(Mx[li])
            C, CN, CK = PROFILE
            for _r in range(3):   # refit side similarity on current correspondences
                P_ = sp * q + tp
                nn = [CK.find((p_[0], p_[1], 0.0)) for p_ in P_]
                d = np.array([n_[2] for n_ in nn]); idx = np.array([n_[1] for n_ in nn])
                ok = d < max(6.0, np.percentile(d, 70))
                tp = (C[idx[ok]] - sp * q[ok]).mean(0)   # scale fixed by the init search
            P_ = sp * q + tp
            nn = [CK.find((p_[0], p_[1], 0.0)) for p_ in P_]
            d = np.array([n_[2] for n_ in nn]); idx = np.array([n_[1] for n_ in nn])
            ok = d < max(6.0, np.percentile(d, 80))
            n_ = CN[idx[ok]]
            # point-to-line residual along the contour normal
            DL = DM[li][ok]
            Jp = sp * (n_[:, 0:1] * DL[:, 1, :] - n_[:, 1:2] * DL[:, 2, :])
            base = sp * side_proj(M0[li][ok]) + tp
            yp = ((C[idx[ok]] - base) * n_).sum(1)
            # scale to the landmark rows so the profile counts as much as ~1/3 of the face rows
            wp = PROFILE_W * (len(yw) / max(1, ok.sum())) * (W.mean() ** 2)
            A_ = A_ + wp * (Jp.T @ Jp); b_ = b_ + wp * (Jp.T @ yp)
            perr = float(np.abs(yp - Jp @ w).mean())
        # projected Gauss-Seidel for bounds [0, 1]
        for _ in range(60):
            for j in range(nT):
                if A_[j, j] <= 0:
                    continue
                w[j] = np.clip(w[j] + (b_[j] - A_[j] @ w) / A_[j, j], 0.0, 1.0)
        res = np.sqrt(((J @ w - y) * W) ** 2 / np.maximum(W ** 2, 1e-9))
    X = A0 + D @ w
    sf, tf = fit_similarity(proj(X, 0), PF, VIS)
    ef = (np.sqrt((((sf * proj(X, 0) + tf) - PF) ** 2).sum(1)) * VIS).sum() / VIS.sum()
    sq, tq = fit_similarity(proj(X, yaw_q), PQ, wq)
    eq = np.sqrt((((sq * proj(X, yaw_q) + tq) - PQ) ** 2).sum(1) * wq).sum() / wq.sum()
    LAST[yaw_q] = dict(sf=sf, tf=tf, sq=sq, tq=tq, wq=wq, sp=sp, tp=tp)
    if sp is not None:
        _M = M0 + DM @ w
        json.dump({"model": (sp * side_proj(_M[lead_idx(_M)]) + tp).tolist(), "base": (sp * side_proj(M0[lead_idx(M0)]) + tp).tolist(),
                   "contour": PROFILE[0].tolist(), "raw": _M[lead_idx(_M)].tolist(), "zbins": ZBINS.tolist()}, open(os.path.join(OUT, f"{WHO}_profile_dbg_{yaw_q}.json"), "w"))
        print("  profile mean px", round(perr, 2), "scale", round(sp, 1), flush=True)
    return w, ef, eq


# baseline error
_, ef0, eq0 = solve(35, iters=0)
print("baseline mean px error front", round(ef0, 2), "q34", round(eq0, 2), flush=True)
best = None
for yaw in [int(x) for x in os.environ.get("YAWS", "25,30,35,40,45,50").split(",")]:
    w, ef, eq = solve(yaw)
    print("yaw", yaw, "front px", round(ef, 2), "q34 px", round(eq, 2), flush=True)
    if best is None or ef + eq < best[1] + best[2]:
        best = (w, ef, eq, yaw)
w, ef, eq, yaw = best
print("BEST yaw", yaw, "front px", round(ef, 2), "q34 px", round(eq, 2), "active targets", int((w > 0.02).sum()), flush=True)

# ---------------------------------------------------------------- stage 5: apply + save
for nm, val in zip(names, w):
    kb = basemesh.data.shape_keys.key_blocks.get(nm)
    if kb:
        kb.value = float(val)
json.dump({"yaw_q34": yaw, "weights": {n: float(v) for n, v in zip(names, w) if v > 0.01},
           "err_front_px": ef, "err_q34_px": eq}, open(os.path.join(OUT, f"{WHO}_fit.json"), "w"), indent=1)
bpy.context.view_layer.update()
V1 = eval_verts(basemesh)

# ---------------------------------------------------------------- stage 6: free-form refinement (Laplacian)
if os.environ.get("REFINE", "1") == "1" and PROFILE is not None:
    st = LAST[yaw]
    polys = [list(p_.vertices) for p_ in basemesh.data.polygons]
    flat = np.array([i_ for p_ in polys for i_ in p_]); offs = np.cumsum([0] + [len(p_) for p_ in polys])
    ab = np.array([anchors[k][0] for k in valid]); aw = np.array([anchors[k][1] for k in valid])
    SL = detect(SIDE)
    np.savez(os.path.join(OUT, f"{WHO}_refine_in.npz"), V=V1, flat=flat, offs=offs, helper=helper_v,
             ab=ab, aw=aw, valid=np.array(valid), PF=PF, PQ=PQ, wq=st["wq"], sf=st["sf"], tf=st["tf"],
             sq=st["sq"], tq=st["tq"], yaw=yaw, sp=st["sp"], tp=st["tp"], C=PROFILE[0], CN=PROFILE[1],
             SL=SL if SL is not None else np.zeros((0, 2)), top=top, height=height,
             side=SIDE, front=FRONT, q34=Q34)
    r = subprocess.run([VENV_PY, os.path.join(HERE, "refine_solve.py"), os.path.join(OUT, f"{WHO}_refine_in.npz"),
                        os.path.join(OUT, f"{WHO}_refine_out.npz")], capture_output=True, text=True)
    print(r.stdout[-3000:], r.stderr[-3000:], flush=True)
    Vn = np.load(os.path.join(OUT, f"{WHO}_refine_out.npz"))["V"]
    inv = np.array(basemesh.matrix_world.inverted().to_3x3())
    dl = (Vn - V1) @ inv.T
    basis = basemesh.data.shape_keys.key_blocks[0]
    kb = basemesh.shape_key_add(name="refine", from_mix=False)
    co = np.array([v.co[:] for v in basis.data]) + dl
    kb.data.foreach_set("co", co.ravel()); kb.value = 1.0
    basemesh.data.update(); bpy.context.view_layer.update()
    HumanService.refit(basemesh)
    V1 = eval_verts(basemesh)
    print("refine applied, max move mm", round(float(np.linalg.norm(Vn - V1 + (V1 - V1), axis=1).max() * 0), 1), flush=True)

hc = V1[V1[:, 2] > V1[:, 2].max() - height * 0.14].mean(0)
render(os.path.join(OUT, f"{WHO}_fit_front.png"), 0)
render(os.path.join(OUT, f"{WHO}_fit_q34.png"), yaw)
render(os.path.join(OUT, f"{WHO}_fit_side.png"), 90)
bpy.ops.wm.save_as_mainfile(filepath=os.path.join(OUT, f"{WHO}_fit.blend"))
print("FIT DONE", WHO)
