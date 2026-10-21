"""Procedural hair v2 for the fitted MPFB head.

Reference: black layered short cut, tall swept crown, asymmetric side-swept fringe
that leaves the mid forehead visible, thin temple locks in front of the ears,
tapered nape. Everything generated from code (guide strands -> clumps -> cards).

Usage: Blender -b <who>_textured.blend -P hair_cards2.py -- <who> <out_dir>
"""
import bpy, sys, os, math, json
import numpy as np
from mathutils import Vector
from mathutils.bvhtree import BVHTree
from mathutils.kdtree import KDTree

a = sys.argv[sys.argv.index("--") + 1:]
WHO, OUT = a[0], a[1]
HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)
import hairline  # noqa: E402

rng = np.random.default_rng(int(os.environ.get("HAIR_SEED", "23")))
UP, DOWN = np.array([0, 0, 1.0]), np.array([0, 0, -1.0])
FWD, BACK = np.array([0, -1.0, 0]), np.array([0, 1.0, 0])
XAX = np.array([1.0, 0, 0])

body = bpy.data.objects["Human"]
for stale in (f"{WHO}_hair", f"{WHO}_scalp"):
    obj = bpy.data.objects.get(stale)
    if obj is not None:
        bpy.data.objects.remove(obj, do_unlink=True)


def eval_mesh(obj):
    saved = [(m, m.show_viewport) for m in obj.modifiers]
    for m, _ in saved:
        m.show_viewport = False
    bpy.context.view_layer.update()
    ev = obj.evaluated_get(bpy.context.evaluated_depsgraph_get())
    out = np.array([(obj.matrix_world @ v.co)[:] for v in ev.data.vertices])
    nrm = np.array([(obj.matrix_world.to_3x3() @ v.normal)[:] for v in ev.data.vertices])
    for m, vis in saved:
        m.show_viewport = vis
    bpy.context.view_layer.update()
    return out, nrm


V, VN = eval_mesh(body)
gid = {g.name: g.index for g in body.vertex_groups}
in_body = np.zeros(len(V), bool)
in_ears = np.zeros(len(V), bool)
for v in body.data.vertices:
    for g in v.groups:
        if g.weight > 0.5:
            if g.group == gid["body"]:
                in_body[v.index] = True
            if g.group == gid.get("ears", -1):
                in_ears[v.index] = True
tris = [tuple(p.vertices) for p in body.data.polygons if in_body[list(p.vertices)].all()]
bvh = BVHTree.FromPolygons([tuple(v) for v in V], tris)

top = V[in_body, 2].max()
height = top - V[in_body, 2].min()
S = height / {"male": 1.84, "female": 1.68}[WHO]           # model units per real metre
lm = {int(k): np.array(v) for k, v in json.load(open(os.path.join(OUT, f"{WHO}_lm3d.json"))).items()}
z_brow = max(lm[105][2], lm[334][2])
hc = V[in_body & (V[:, 2] > top - height * 0.14)].mean(0)
hc[0] = 0.5 * (lm[234][0] + lm[454][0]) if 234 in lm and 454 in lm else hc[0]
ear_top = V[in_ears, 2].max()
ear_bot = V[in_ears, 2].min()
ear_y0, ear_y1 = V[in_ears, 1].min(), V[in_ears, 1].max()
head_span = top - z_brow
print("S", round(S, 3), "top", round(float(top), 3), "brow", round(float(z_brow), 3),
      "ears", round(float(ear_bot), 3), round(float(ear_top), 3), flush=True)

# ---------------------------------------------------------------- style frame
PART_X = -0.011 * S                       # part sits on the character's right of centre
SWEEP = np.array([1.0, 0, 0])             # fringe sweeps toward the character's left
WHORL = np.array([hc[0] + 0.010 * S, hc[1] + 0.080 * S, top - 0.042 * S])
EAR_BOX = dict(x0=0.066 * S, x1=0.120 * S, y0=ear_y0 - 0.004 * S, y1=ear_y1 + 0.004 * S,
               z0=ear_bot - 0.004 * S, z1=ear_top + 0.004 * S)
SIDE_FACE = dict(x0=0.046 * S, y1=-0.028 * S, z0=ear_bot - 0.036 * S, z1=ear_top + 0.012 * S)


def unit(v):
    return v / (np.linalg.norm(v) + 1e-12)


def azimuth(p):
    return float(hairline.azimuth(p[None], hc)[0])


def nearest(p):
    hit = bvh.find_nearest(Vector(p.tolist()))
    return np.array(hit[0][:]), np.array(hit[1][:])


def hits_ear(p):
    return (EAR_BOX["x0"] < abs(p[0]) < EAR_BOX["x1"] and
            EAR_BOX["y0"] < p[1] < EAR_BOX["y1"] and
            EAR_BOX["z0"] < p[2] < EAR_BOX["z1"])


def hits_side_face(p):
    """In front of the ear / on the cheek: only the thin temple locks may live here."""
    return (abs(p[0]) > SIDE_FACE["x0"] and p[1] < SIDE_FACE["y1"] and
            SIDE_FACE["z0"] < p[2] < SIDE_FACE["z1"])


KINDS = {
    # len/width/vol are in real metres (multiplied by S)
    "fringe": dict(len=(0.070, 0.115), nseg=20, width=(0.0060, 0.0115), lift=(0.05, 0.16),
                   vol=(0.0035, 0.0080), grav0=0.06, grav1=0.32, inertia=0.40,
                   off=(0.0018, 0.0036), tipz=None, clump=0.0, tilt=0.0),
    "fringe2": dict(len=(0.040, 0.075), nseg=14, width=(0.0080, 0.0140), lift=(0.04, 0.12),
                    vol=(0.0025, 0.0060), grav0=0.06, grav1=0.28, inertia=0.42,
                    off=(0.0015, 0.0030), tipz=(0.024, 0.052), clump=0.0, tilt=0.0),
    "wisp": dict(len=(0.085, 0.135), nseg=22, width=(0.0026, 0.0058), lift=(0.08, 0.24),
                 vol=(0.003, 0.007), grav0=0.10, grav1=0.34, inertia=0.34,
                 off=(0.0020, 0.0042), tipz=(-0.020, 0.012), clump=0.0, tilt=0.0),
    "temple": dict(len=(0.034, 0.064), nseg=18, width=(0.0050, 0.0100), lift=(0.02, 0.10),
                   vol=(0.0018, 0.0042), grav0=0.15, grav1=0.34, inertia=0.52,
                   off=(0.0015, 0.0030), tipz=(-0.068, -0.032), clump=0.0, tilt=0.0),
    "spike": dict(len=(0.080, 0.145), nseg=16, width=(0.0050, 0.0100), lift=(1.00, 1.70),
                  vol=(0.016, 0.030), grav0=0.00, grav1=0.07, inertia=0.60,
                  off=(0.0022, 0.0040), tipz=None, clump=0.35, tilt=0.55),
    "top": dict(len=(0.080, 0.150), nseg=14, width=(0.0085, 0.0160), lift=(0.55, 1.10),
                vol=(0.024, 0.042), grav0=0.02, grav1=0.15, inertia=0.56,
                off=(0.0022, 0.0040), tipz=None, clump=0.45, tilt=0.50),
    "side": dict(len=(0.024, 0.050), nseg=12, width=(0.0065, 0.0120), lift=(0.10, 0.22),
                 vol=(0.0030, 0.0065), grav0=0.10, grav1=0.28, inertia=0.46,
                 off=(0.0018, 0.0034), tipz=None, clump=0.35, tilt=0.08),
    "back": dict(len=(0.038, 0.072), nseg=14, width=(0.0075, 0.0130), lift=(0.16, 0.32),
                 vol=(0.0045, 0.0095), grav0=0.08, grav1=0.26, inertia=0.48,
                 off=(0.0018, 0.0036), tipz=None, clump=0.40, tilt=0.10),
    "nape": dict(len=(0.015, 0.035), nseg=10, width=(0.0065, 0.0115), lift=(0.06, 0.18),
                 vol=(0.003, 0.007), grav0=0.10, grav1=0.30, inertia=0.42,
                 off=(0.0015, 0.0028), tipz=None, clump=0.30, tilt=0.05),
    "under": dict(len=(0.010, 0.022), nseg=6, width=(0.012, 0.020), lift=(0.02, 0.07),
                  vol=(0.0010, 0.0028), grav0=0.06, grav1=0.18, inertia=0.40,
                  off=(0.0008, 0.0016), tipz=None, clump=0.0, tilt=0.0),
    "mid": dict(len=(0.024, 0.050), nseg=10, width=(0.011, 0.019), lift=(0.08, 0.22),
                vol=(0.003, 0.007), grav0=0.07, grav1=0.22, inertia=0.45,
                off=(0.0012, 0.0024), tipz=None, clump=0.14, tilt=0.05),
    "fly": dict(len=(0.050, 0.120), nseg=14, width=(0.0006, 0.0015), lift=(0.50, 1.20),
                vol=(0.004, 0.014), grav0=0.02, grav1=0.10, inertia=0.60,
                off=(0.0016, 0.0040), tipz=None, clump=0.0, tilt=0.40),
}


def flow_dir(p, n, kind):
    az = azimuth(p)
    v = p - WHORL
    vt = v - (v @ n) * n
    vt = unit(vt) if np.linalg.norm(vt) > 1e-9 else FWD.copy()
    if kind in ("fringe", "fringe2", "wisp"):
        d = FWD * 0.88 + SWEEP * 0.42 + DOWN * 0.22
        d += SWEEP * 0.26 * np.clip((p[0] - PART_X) / (0.05 * S) + 0.5, 0, 1)
    elif kind == "temple":
        out = XAX * np.sign(p[0] - hc[0])
        d = DOWN * 0.94 + FWD * 0.22 + out * 0.04
    elif kind == "spike":
        d = unit(UP * 0.85 + BACK * 0.50 + SWEEP * 0.12)
    elif kind == "top":
        if p[1] < WHORL[1] and az < 85:
            d = BACK * 0.64 + SWEEP * 0.26 + vt * 0.22
        else:
            d = vt * 0.72 + BACK * 0.14 + SWEEP * 0.10
    elif kind == "side":
        d = BACK * 0.44 + DOWN * 0.50 + SWEEP * 0.04
    elif kind == "back":
        d = vt * 0.26 + BACK * 0.20 + DOWN * 0.64
    elif kind == "nape":
        d = DOWN * 0.94 + BACK * 0.18
    elif kind in ("under", "mid"):
        d = vt * 0.50 + (BACK * 0.30 if az > 60 else FWD * 0.10) + DOWN * 0.16
    else:
        d = unit(rng.normal(0.0, 1.0, 3))
    d = d - (d @ n) * n
    return unit(d + rng.normal(0.0, 0.05, 3))


def cut_ear(g, kind):
    for i, p in enumerate(g):
        if i <= 2:
            continue
        if hits_ear(p):
            return g[:i]
        if kind not in ("temple", "fringe", "fringe2", "wisp") and hits_side_face(p):
            return g[:i]
    return g


def fringe_tip(loc):
    """Jagged fringe boundary: deep above the right temple, high over the mid forehead."""
    x = loc[0]
    deep = 0.031 * math.exp(-((x + 0.020 * S) / (0.020 * S)) ** 2)
    deep2 = 0.012 * math.exp(-((x - 0.030 * S) / (0.017 * S)) ** 2)
    return z_brow + (0.031 - deep - deep2 + rng.normal(0, 0.003)) * S


def grow(root, kind):
    P = KINDS[kind]
    loc, n = nearest(root)
    L = rng.uniform(*P["len"]) * S
    nseg = P["nseg"]
    step = L / nseg
    off0 = rng.uniform(*P["off"]) * S
    lift = rng.uniform(*P["lift"])
    vol = rng.uniform(*P["vol"]) * S
    inertia = P["inertia"]
    spin = rng.normal(0, 0.10)
    d = unit(n * lift + flow_dir(loc, n, kind))
    d = unit(d + np.cross(n, d) * spin)
    pts = [loc + n * off0]
    if kind == "fringe":
        tipz = fringe_tip(loc)
    elif P["tipz"] is not None:
        tipz = z_brow + rng.uniform(*P["tipz"]) * S
    else:
        tipz = None
    flick = P["tilt"] * rng.uniform(0.25, 1.0)
    flick_side = rng.normal(0, 0.18) if kind in ("top", "spike", "fly") else 0.0
    for i in range(1, nseg + 1):
        t = i / nseg
        _, n0 = nearest(pts[-1])
        f = flow_dir(pts[-1], n0, kind)
        g = P["grav0"] + P["grav1"] * t
        d = unit(d * inertia + f * (1 - inertia) + DOWN * g)
        if kind in ("top", "spike", "fly") and t > 0.62:
            k = (t - 0.62) / 0.38
            d = unit(d + (UP * flick + SWEEP * flick_side) * k)
        p = pts[-1] + d * step
        q, qn = nearest(p)
        want = off0 + vol * math.sin(min(t, 0.62) / 0.62 * math.pi / 2) * (1 - 0.55 * max(0.0, t - 0.66))
        if (p - q) @ qn < want:
            p = q + qn * want
        pts.append(p)
        if tipz is not None and t > 0.26 and p[2] < tipz:
            break
        if kind == "nape" and p[2] < z_brow - 0.16 * S:
            break
    return cut_ear(np.array(pts), kind)


# ---------------------------------------------------------------- scalp sampling
sw = hairline.scalp_weight(V, hc, z_brow, top, WHO, 0.004 * S) * ~in_ears
tri3 = [(t_[0], t_[k], t_[k + 1]) for t_ in tris for k in range(1, len(t_) - 1)]
st_ = np.array([t_ for t_ in tri3 if sw[list(t_)].mean() > 0.5])
A_, B_, C_ = V[st_[:, 0]], V[st_[:, 1]], V[st_[:, 2]]
area = 0.5 * np.linalg.norm(np.cross(B_ - A_, C_ - A_), axis=1)
NC = 26000
pick = rng.choice(len(st_), NC, p=area / area.sum())
r1, r2 = rng.random(NC), rng.random(NC)
flip = r1 + r2 > 1
r1[flip], r2[flip] = 1 - r1[flip], 1 - r2[flip]
CAND = A_[pick] + (B_[pick] - A_[pick]) * r1[:, None] + (C_[pick] - A_[pick]) * r2[:, None]
CAND_AZ = hairline.azimuth(CAND, hc)
CAND_HL = hairline.hair_height(CAND, hc, z_brow, top, WHO)
CAND_ZR = (CAND[:, 2] - z_brow) / head_span
print("candidates", len(CAND), flush=True)


def poisson(points, r):
    if len(points) == 0:
        return points
    keys = np.floor(points / r).astype(np.int64)
    grid = {}
    order = rng.permutation(len(points))
    chosen = []
    rr = r * r
    for i in order:
        kx, ky, kz = keys[i]
        ok = True
        for dx in (-1, 0, 1):
            for dy in (-1, 0, 1):
                for dz in (-1, 0, 1):
                    lst = grid.get((kx + dx, ky + dy, kz + dz))
                    if not lst:
                        continue
                    for j in lst:
                        dv = points[j] - points[i]
                        if dv @ dv < rr:
                            ok = False
                            break
                    if not ok:
                        break
                if not ok:
                    break
            if not ok:
                break
        if ok:
            chosen.append(i)
            grid.setdefault((kx, ky, kz), []).append(i)
    return points[chosen]


def sample_roots(mask, count, radius):
    pts = CAND[mask]
    if len(pts) == 0:
        return np.zeros((0, 3))
    chosen = poisson(pts, radius * S)
    if len(chosen) > count:
        chosen = chosen[rng.choice(len(chosen), count, replace=False)]
    return chosen


band = CAND[:, 2] - CAND_HL
FRONT_BAND = (CAND_AZ < 58) & (band > 0.0) & (band < 0.016 * S)
FRONT_BAND2 = (CAND_AZ < 58) & (band > 0.010 * S) & (band < 0.030 * S)
TEMPLE_BAND = (CAND_AZ >= 50) & (CAND_AZ < 80) & (band > 0.0) & (band < 0.014 * S)
TOP_MASK = CAND_ZR > 0.56
SPIKE_MASK = (CAND_ZR > 0.58) & (CAND_AZ < 80)
SIDE_MASK = (CAND_AZ >= 52) & (CAND_AZ < 124) & (CAND_ZR <= 0.60)
BACK_MASK = (CAND_AZ >= 118) & (CAND_ZR > 0.24)
NAPE_MASK = (CAND_AZ > 100) & (CAND_ZR <= 0.28)
UNDER_MASK = CAND[:, 2] < top - 0.070 * S
MID_MASK = CAND[:, 2] < top - 0.050 * S
FLY_MASK = (CAND_ZR > 0.52) & (CAND_AZ < 120)


def fringe_roots():
    """Deliberate fringe roots along the front hairline (biased to the swept side)."""
    xs = np.array([-0.058, -0.049, -0.040, -0.031, -0.022, -0.014,
                   -0.003, 0.008, 0.019, 0.030, 0.041, 0.052]) * S
    roots = []
    for xt in xs:
        m = FRONT_BAND & (np.abs(CAND[:, 0] - xt) < 0.020 * S)
        c = CAND[m]
        if len(c) == 0:
            continue
        # the root closest to the target x, preferring the lowest one
        score = np.abs(c[:, 0] - xt) + 0.25 * (c[:, 2] - c[:, 2].min())
        roots.append(c[np.argmin(score)])
    return np.array(roots)


entries = []


def add(kind, roots):
    for r_ in roots:
        entries.append((kind, r_))


fr = fringe_roots()
add("fringe", fr)
add("fringe2", sample_roots(FRONT_BAND2, 18, 0.0065))
add("wisp", fr[[2, 5, 9]] if len(fr) >= 10 else fr[:2])
add("temple", sample_roots(TEMPLE_BAND, 14, 0.0070))
add("spike", sample_roots(SPIKE_MASK, 26, 0.0075))
add("top", sample_roots(TOP_MASK, 300, 0.0072))
add("side", sample_roots(SIDE_MASK, 150, 0.0078))
add("back", sample_roots(BACK_MASK, 180, 0.0080))
add("nape", sample_roots(NAPE_MASK, 70, 0.0072))
add("under", sample_roots(UNDER_MASK, 220, 0.0115))
add("mid", sample_roots(MID_MASK, 200, 0.0105))
add("fly", sample_roots(FLY_MASK, 30, 0.0120))
print("entries", len(entries), flush=True)

# ---------------------------------------------------------------- grow + clump
cards = []
LEAD_R = 0.018 * S
for kind in KINDS:
    idx = [i for i, e in enumerate(entries) if e[0] == kind]
    if not idx:
        continue
    roots = np.stack([entries[i][1] for i in idx])
    guides = [grow(r_, kind) for r_ in roots]
    strength = KINDS[kind]["clump"]
    if strength > 0 and len(roots) >= 8:
        lead_roots = poisson(roots, LEAD_R)
        lead_guides = [grow(r_, kind) for r_ in lead_roots]
        kd = KDTree(len(lead_roots))
        for j, r_ in enumerate(lead_roots):
            kd.insert(r_.tolist(), j)
        kd.balance()
        out_guides = []
        for j, g in enumerate(guides):
            _, li, dist = kd.find(roots[j].tolist())
            lg = lead_guides[li]
            seg = np.r_[0, np.cumsum(np.linalg.norm(np.diff(lg, axis=0), axis=1))]
            L_own = np.linalg.norm(np.diff(g, axis=0), axis=1).sum()
            if dist > LEAD_R * 1.5 or L_own == 0 or seg[-1] < 0.55 * L_own:
                out_guides.append(g)
                continue
            tt = np.linspace(0, seg[-1], len(g))
            lg = np.stack([np.interp(tt, seg, lg[:, k]) for k in range(3)], -1)
            off = g[0] - lg[0]
            t_ = np.linspace(0, 1, len(g))[:, None]
            c = strength * t_ ** 1.15
            g2 = g * (1 - c) + (lg + off * (1 - 0.85 * t_)) * c
            for i_ in range(1, len(g2)):
                q, qn = nearest(g2[i_])
                if (g2[i_] - q) @ qn < 0.0012 * S:
                    g2[i_] = q + qn * 0.0012 * S
            out_guides.append(cut_ear(g2, kind))
        guides = out_guides
    cards.extend((g, kind) for g in guides if len(g) >= 4)
    print("kind", kind, "roots", len(roots), "cards", len(guides), flush=True)

# ---------------------------------------------------------------- strand atlas
AW = AH = 2048
NV = 4
COL_ROOT = np.array([0.010, 0.0095, 0.0115])
COL_TIP = np.array([0.022, 0.021, 0.025])
COL_SPEC = np.array([0.13, 0.14, 0.165])


def smoothstep(e0, e1, x):
    t = np.clip((x - e0) / (e1 - e0 + 1e-9), 0, 1)
    return t * t * (3 - 2 * t)


def make_atlas(path):
    img = np.zeros((AH, AW, 4), np.float32)
    cov = np.zeros((AH, AW), np.float32)
    prem = np.zeros((AH, AW, 3), np.float32)
    vv = np.linspace(0, 1, AH)[:, None]
    for k in range(NV):
        x0 = k * (AW // NV)
        wcol = AW // NV
        n_str = [210, 180, 140, 95][k]
        uu = np.linspace(0, 1, wcol)[None, :]
        clump = (0.66 + 0.34 * np.cos((uu - 0.5) * math.pi * 1.8))[..., None]
        side_fade = smoothstep(0.0, 0.10, uu) * (1 - smoothstep(0.90, 1.0, uu))
        for _ in range(n_str):
            root_x = rng.uniform(0.03, 0.97)
            tip_x = 0.5 + (root_x - 0.5) * rng.uniform(0.25, 0.75)
            end = rng.uniform(0.76, 1.0)
            ph = rng.uniform(0, 6.28)
            amp = rng.uniform(0.002, 0.011)
            fq = rng.uniform(1.0, 2.6)
            xs = root_x + (tip_x - root_x) * vv ** 1.35 + amp * np.sin(vv * fq * 6.28 + ph)
            th = rng.uniform(1.0, 2.2) * (1 - 0.72 * (vv / end) ** 2)
            start = rng.uniform(0.0, 0.14)
            a_ = smoothstep(start - 0.05, start + 0.09, vv) * (0.80 + 0.20 * rng.random())
            a_ = a_ * (1 - smoothstep(end - 0.20, end + 0.02, vv))
            bright = rng.choice([rng.uniform(0.60, 0.95), rng.uniform(1.05, 1.45)], p=[0.85, 0.15])
            col = (COL_ROOT * (1 - vv) + COL_TIP * vv)[:, None, :]
            if rng.random() < 0.08:
                col = col * 0.5 + COL_SPEC * rng.uniform(0.15, 0.45)
            col = col * bright * clump
            xpix = x0 + xs * wcol
            for dx in range(-4, 5):
                xi = np.floor(xpix).astype(int) + dx
                ok = (xi >= x0) & (xi < x0 + wcol)
                dist = np.abs(xi + 0.5 - xpix)
                aa = np.clip(th / 2 + 0.5 - dist, 0, 1) * a_
                rows = np.nonzero(ok & (aa > 0))[0]
                if len(rows) == 0:
                    continue
                xi_r = np.clip(xi[rows], x0, x0 + wcol - 1)
                xi_l = np.clip(xi_r - x0, 0, wcol - 1)
                aa = aa[rows] * side_fade[0, xi_l]
                prem[rows, xi_r] += col[rows, xi_l] * aa[:, None]
                cov[rows, xi_r] += aa
    safe = np.maximum(cov, 1e-4)[..., None]
    rgb = prem / safe
    rgb = np.where(cov[..., None] > 1e-3, rgb, COL_ROOT)
    img[..., :3] = np.clip(rgb, 0, 1)
    img[..., 3] = np.clip(cov, 0, 1)
    bimg = bpy.data.images.new(f"{WHO}_hair_atlas", AW, AH, alpha=True)
    bimg.pixels[:] = img[::-1].ravel()
    bimg.alpha_mode = "STRAIGHT"
    bimg.filepath_raw = path
    bimg.file_format = "PNG"
    bimg.save()
    bimg.pack()
    return bimg


atlas = make_atlas(os.path.join(OUT, f"{WHO}_hair_atlas.png"))

# ---------------------------------------------------------------- cards
verts, faces, uvs, tints = [], [], [], []


def add_card(g, kind, width_scale=1.0, tint_scale=1.0, lateral=0.0):
    global verts, faces, uvs, tints
    P = KINDS[kind]
    nseg = len(g) - 1
    if nseg < 3:
        return
    g = g.copy()
    T = np.gradient(g, axis=0)
    T /= np.linalg.norm(T, axis=1, keepdims=True) + 1e-9
    loc, n0 = nearest(g[0])
    radial = unit(loc - (hc + np.array([0, 0.01 * S, -0.02 * S])))
    out = unit(radial * 0.4 + n0 * 0.6)
    b = unit(np.cross(T[0], out))
    if np.linalg.norm(b) < 1e-6:
        b = unit(np.cross(T[0], UP))
    if lateral:
        g = g + b * (lateral * 0.020 * S)
    twist = rng.uniform(-0.16, 0.16)
    w0 = rng.uniform(*P["width"]) * S * width_scale
    var = int(rng.integers(0, NV))
    u0, u1 = var / NV, (var + 1) / NV
    if rng.random() < 0.5:
        u0, u1 = u1, u0
    tint = (rng.uniform(0.55, 1.10) if kind not in ("under", "mid") else rng.uniform(0.40, 0.75)) * tint_scale
    base = len(verts)
    for i, (p, t_) in enumerate(zip(g, T)):
        if i:
            b = unit(b - (b @ T[i]) * T[i])
            tw = twist * (i / nseg)
            b = unit(b * math.cos(tw) + np.cross(T[i], b) * math.sin(tw))
        tt = i / nseg
        prof = 0.58 + 0.42 * math.sin(math.pi * min(1.0, tt / 0.94)) ** 0.6
        w = w0 * prof * (1 - 0.80 * max(0.0, (tt - 0.80) / 0.20) ** 1.6)
        w = max(w, 0.0004 * S)
        verts += [p - b * w / 2, p + b * w / 2]
        tints += [tint, tint]
        uvs += [(u0, 1 - tt), (u1, 1 - tt)]
        if i:
            kk = base + 2 * i
            faces.append((kk - 2, kk - 1, kk + 1, kk))


for g, kind in cards:
    add_card(g, kind)
    if kind in ("top", "side", "back", "spike") and rng.random() < 0.40:
        add_card(g, kind, width_scale=rng.uniform(0.6, 0.85), tint_scale=rng.uniform(0.55, 0.85),
                 lateral=rng.uniform(0.35, 0.7))
    if kind == "fringe" and rng.random() < 0.30:
        add_card(g, kind, width_scale=0.6, tint_scale=rng.uniform(0.7, 0.95), lateral=0.4)

print("cards", len(cards), "verts", len(verts), "quads", len(faces), flush=True)

me = bpy.data.meshes.new(f"{WHO}_hair")
me.from_pydata([tuple(v) for v in verts], [], faces)
uvl = me.uv_layers.new(name="UVMap")
for poly in me.polygons:
    for li_ in poly.loop_indices:
        uvl.data[li_].uv = uvs[me.loops[li_].vertex_index]
for p in me.polygons:
    p.use_smooth = True
me.update()
vert_arr = np.asarray(verts)
hn = vert_arr - (hc + np.array([0, 0.01 * S, -0.02 * S]))
hn /= np.linalg.norm(hn, axis=1, keepdims=True) + 1e-9
cn = np.array([v.normal[:] for v in me.vertices])
cn *= np.sign((cn * hn).sum(1, keepdims=True) + 1e-9)
bn = cn * 0.50 + hn * 0.50
bn /= np.linalg.norm(bn, axis=1, keepdims=True) + 1e-9
me.normals_split_custom_set_from_vertices([tuple(n_) for n_ in bn])
attr = me.color_attributes.new("tint", "FLOAT_COLOR", "POINT")
for i_, t_ in enumerate(tints):
    attr.data[i_].color = (t_, t_, t_, 1.0)
hair = bpy.data.objects.new(f"{WHO}_hair", me)
bpy.context.scene.collection.objects.link(hair)

mat = bpy.data.materials.new(f"{WHO}_hair_mat")
mat.use_nodes = True
nt = mat.node_tree
bsdf = nt.nodes.get("Principled BSDF")
tex = nt.nodes.new("ShaderNodeTexImage")
tex.image = atlas
vc = nt.nodes.new("ShaderNodeVertexColor")
vc.layer_name = "tint"
mul = nt.nodes.new("ShaderNodeMix")
mul.data_type = "RGBA"
mul.blend_type = "MULTIPLY"
mul.inputs[0].default_value = 1.0
nt.links.new(tex.outputs["Color"], mul.inputs[6])
nt.links.new(vc.outputs["Color"], mul.inputs[7])
nt.links.new(mul.outputs[2], bsdf.inputs["Base Color"])
nt.links.new(tex.outputs["Alpha"], bsdf.inputs["Alpha"])
for key, val in (("Roughness", 0.58), ("Specular IOR Level", 0.12), ("Coat Weight", 0.03),
                 ("Coat Roughness", 0.35), ("Sheen Weight", 0.03), ("Sheen Roughness", 0.40),
                 ("Metallic", 0.0)):
    if key in bsdf.inputs:
        try:
            bsdf.inputs[key].default_value = val
        except Exception:  # noqa: BLE001
            pass
try:
    mat.surface_render_method = "DITHERED"
except Exception:  # noqa: BLE001
    mat.blend_method = "HASHED"
mat.use_backface_culling = False
hair.data.materials.append(mat)

# ---------------------------------------------------------------- scalp shell
shell_mask = in_body & (sw > 0.50) & ~in_ears
shell_faces = [tuple(p.vertices) for p in body.data.polygons if shell_mask[list(p.vertices)].all()]
used = sorted({i for f in shell_faces for i in f})
remap = {v: k for k, v in enumerate(used)}
sv = [V[i] + VN[i] * (0.0020 * S) for i in used]
sme = bpy.data.meshes.new(f"{WHO}_scalp")
sme.from_pydata([tuple(v) for v in sv], [], [tuple(remap[i] for i in f) for f in shell_faces])
sme.update()
smat = bpy.data.materials.new(f"{WHO}_scalp_mat")
smat.use_nodes = True
sbs = smat.node_tree.nodes.get("Principled BSDF")
sbs.inputs["Base Color"].default_value = (0.009, 0.0085, 0.010, 1.0)
sbs.inputs["Roughness"].default_value = 0.60
scalp = bpy.data.objects.new(f"{WHO}_scalp", sme)
for p in sme.polygons:
    p.use_smooth = True
sme.materials.append(smat)
bpy.context.scene.collection.objects.link(scalp)
print("scalp shell faces", len(shell_faces), flush=True)

bpy.ops.wm.save_as_mainfile(filepath=os.path.join(OUT, f"{WHO}_hair.blend"))

# ---------------------------------------------------------------- preview renders
scene = bpy.context.scene
scene.render.engine = "BLENDER_EEVEE_NEXT"
try:
    scene.eevee.taa_render_samples = 96
except Exception:  # noqa: BLE001
    pass
scene.render.resolution_x = scene.render.resolution_y = 1024
cam = scene.camera
cam.data.type = "ORTHO"
cam.data.ortho_scale = 0.135 * height * 1.9
hcv = hc.copy()
hcv[2] -= 0.01 * S
for name, yaw, pitch in (("front", 0, 0), ("q34", 37, 0), ("side", 90, 0), ("back", 180, 0), ("top34", 35, 38)):
    t = math.radians(yaw)
    d = np.array([math.sin(t), -math.cos(t), 0.0])
    if pitch:
        pr = math.radians(pitch)
        d = d * math.cos(pr) + UP * math.sin(pr)
    cam.location = Vector((hcv + d * 3).tolist())
    cam.rotation_euler = (Vector(hcv.tolist()) - cam.location).to_track_quat("-Z", "Y").to_euler()
    scene.render.filepath = os.path.join(OUT, f"{WHO}_hair_{name}.png")
    bpy.ops.render.render(write_still=True)
print("HAIR DONE", WHO)
