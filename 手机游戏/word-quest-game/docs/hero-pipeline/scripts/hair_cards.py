"""Procedural hair for the fitted MPFB head: guide strands grown from the scalp, grouped into
clumps, every clump becomes a tapered hair card with a generated strand-alpha texture.

Usage: Blender -b <who>_textured.blend -P hair_cards.py -- <who> <out_dir>

1. scalp roots from the shared hairline rule (hairline.py), Poisson-disk sampled per layer
2. each root grows a guide: lift off the scalp, then follow the style's comb field, with gravity and
   collision against the head (minimum offset grows along the strand -> volume)
3. card = ribbon along the guide, width across the strand, facing out of the head, tapered tip
4. strand atlas (4 variants) painted with numpy: dozens of anti-aliased strands per card,
   converging into a point at the tip like a real clump
Writes <who>_hair.blend, <who>_hair_atlas.png and preview renders <who>_hair_{front,q34,side,back}.png
"""
import bpy, sys, os, math, json
import numpy as np
from mathutils import Vector, Matrix
from mathutils.bvhtree import BVHTree

a = sys.argv[sys.argv.index("--") + 1:]
WHO, OUT = a[0], a[1]
HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)
import hairline  # noqa: E402

rng = np.random.default_rng(7)
body = bpy.data.objects["Human"]


def eval_verts(obj):
    saved = [(m, m.show_viewport) for m in obj.modifiers]
    for m, _ in saved:
        m.show_viewport = False
    bpy.context.view_layer.update()
    ev = obj.evaluated_get(bpy.context.evaluated_depsgraph_get())
    out = np.array([(obj.matrix_world @ v.co)[:] for v in ev.data.vertices])
    for m, vis in saved:
        m.show_viewport = vis
    bpy.context.view_layer.update()
    return out


V = eval_verts(body)
gid = {g.name: g.index for g in body.vertex_groups}
in_body = np.zeros(len(V), bool); in_ears = np.zeros(len(V), bool)
for v in body.data.vertices:
    for g in v.groups:
        if g.weight > 0.5:
            if g.group == gid["body"]:
                in_body[v.index] = True
            if g.group == gid.get("ears", -1):
                in_ears[v.index] = True
tris = [tuple(p.vertices) for p in body.data.polygons if in_body[list(p.vertices)].all()]
bvh = BVHTree.FromPolygons([tuple(v) for v in V], tris)

top = V[in_body, 2].max(); height = top - V[in_body, 2].min()
S = height / {"male": 1.84, "female": 1.68}[WHO]          # model units per real metre
lm = {int(k): np.array(v) for k, v in json.load(open(os.path.join(OUT, f"{WHO}_lm3d.json"))).items()}
z_brow = max(lm[105][2], lm[334][2])
hc = V[in_body & (V[:, 2] > top - height * 0.14)].mean(0)
hc[0] = 0.5 * (lm[234][0] + lm[454][0]) if 234 in lm and 454 in lm else hc[0]
ear_top = V[in_ears, 2].max(); ear_bot = V[in_ears, 2].min()
print("S", round(S, 3), "brow", round(z_brow, 3), "top", round(top, 3), "ears", round(ear_bot, 3), round(ear_top, 3), flush=True)


# ---------------------------------------------------------------- vertex normals of the head surface
def nearest(p):
    loc, nrm, idx, dist = bvh.find_nearest(Vector(p.tolist()))
    return np.array(loc[:]), np.array(nrm[:]), dist


# ---------------------------------------------------------------- style: comb field + lengths
STYLE = {
    "male": dict(fringe_len=0.120, crown_len=0.150, side_len=0.050, back_len=0.060, nape_len=0.075,
                 vol_top=0.028, vol_side=0.006, part_x=0.012, fringe_stop=-0.002,
                 colour=(0.020, 0.019, 0.021), colour_tip=(0.045, 0.042, 0.046)),
    "female": dict(fringe_len=0.11, crown_len=0.40, side_len=0.38, back_len=0.45, nape_len=0.45,
                   vol_top=0.012, vol_side=0.006, part_x=0.0, fringe_stop=-0.004,
                   colour=(0.16, 0.035, 0.04), colour_tip=(0.26, 0.07, 0.07)),
}[WHO]
DOWN = np.array([0, 0, -1.0]); FWD = np.array([0, -1.0, 0]); BACK = -FWD


def unit(v):
    return v / (np.linalg.norm(v) + 1e-12)


WHORL = np.array([hc[0] + 0.012 * S, hc[1] + 0.080 * S, top - 0.030 * S])   # crown whorl (back of the top)


def comb(p, n):
    """hair flows tangentially away from the crown whorl; in front it sweeps forward over the forehead
    (with a slight side sweep), on the sides and back gravity takes over."""
    az = hairline.azimuth(p[None], hc)[0]
    v = p - WHORL
    vt = v - (v @ n) * n
    near_w = np.clip(1 - np.linalg.norm(v) / (0.045 * S), 0, 1) * 0.7
    c = unit(unit(vt) * (1 - near_w) + FWD * near_w)
    side = np.array([np.sign(p[0] - hc[0] - STYLE["part_x"]) or 1.0, 0, 0])
    w_f = np.clip((70 - az) / 30, 0, 1) * np.clip((p[1] - hc[1]) / (-0.04 * S), 0, 1)
    w_b = np.clip((az - 70) / 40, 0, 1)
    c = unit(c + w_f * (FWD * 0.22 + side * 0.22) + DOWN * (0.15 + 0.55 * w_b) + BACK * 0.25 * w_b * (az < 120))
    return unit(c + rng.normal(0, 0.03, 3))


LONG = WHO == "female"          # long straight hair, centre part, curtain bangs
Z_HAIRLINE_FRONT = hairline.hair_height(np.array([[hc[0], hc[1] - 0.1, 0.0]]), hc, z_brow, top, WHO)[0]


def is_bang(p):
    az = hairline.azimuth(p[None], hc)[0]
    return az < 42 and p[2] < Z_HAIRLINE_FRONT + 0.035 * S and p[1] < hc[1]


def comb_long(p, n):
    side = np.array([np.sign(p[0] - hc[0]) or 1.0, 0, 0])
    az = hairline.azimuth(p[None], hc)[0]
    if is_bang(p):
        c = FWD * 0.45 + DOWN * 1.0 + side * 0.18
    else:
        temple = np.clip(1 - abs(az - 70) / 35, 0, 1)        # front-of-ear hair sweeps back past the ear
        front = np.clip((75 - az) / 40, 0, 1)                 # hair from the front hairline: out to the side and back
        c = (side * (0.55 + 0.30 * front) * (1 - np.clip((az - 100) / 60, 0, 1)) + DOWN * (0.9 - 0.5 * front)
             + BACK * (0.12 * (az > 60) + 0.45 * temple + 0.35 * front))
    c = c - (c @ n) * n * 0.7
    return unit(unit(c) + rng.normal(0, 0.02, 3))


def length_for(p):
    if LONG:
        if is_bang(p):
            return 0.10 * S * rng.uniform(0.95, 1.05)
        az = hairline.azimuth(p[None], hc)[0]
        # measured (DeepSeek D7): sides 30-35 cm, behind the ear 55-60 cm, back 95-105 cm (to the hips)
        L = np.interp(az, [0, 60, 100, 130, 180], [0.34, 0.36, 0.58, 0.85, 1.00])
        return L * S * rng.uniform(0.95, 1.05)
    az = hairline.azimuth(p[None], hc)[0]
    if p[2] > top - 0.035 * S and az < 140:
        L = STYLE["crown_len"]
    elif az < 70:
        L = STYLE["fringe_len"]
    elif az < 115:
        L = STYLE["side_len"]
    elif p[2] < ear_bot:
        L = STYLE["nape_len"]
    else:
        L = STYLE["back_len"]
    return L * S * rng.uniform(0.82, 1.12)


def grow(root, layer, n_seg=22, len_k=1.0, vol_k=1.0, off_k=0.0):
    loc, n, _ = nearest(root)
    if LONG:
        n_seg = 64
    c = comb_long(loc, n) if LONG else comb(loc, n)
    bang = LONG and is_bang(loc)
    L = length_for(loc) * len_k
    az = hairline.azimuth(loc[None], hc)[0]
    topness = np.clip((loc[2] - (z_brow + 0.03 * S)) / (top - z_brow - 0.03 * S), 0, 1)
    vol = (STYLE["vol_side"] + (STYLE["vol_top"] - STYLE["vol_side"]) * topness ** 1.5) * S
    if az > 120:
        vol *= 0.6
    vol *= vol_k
    base_off = (0.0015 + 0.0045 * layer + off_k) * S
    d = unit(n * (0.25 + 0.30 * topness) * vol_k ** 0.5 + c)
    pts = [loc + n * base_off]
    jit = rng.uniform(-0.014, 0.008) * S
    step = L / n_seg
    for i in range(1, n_seg + 1):
        t = i / n_seg
        grav = 0.10 + 0.35 * t
        if LONG:
            # long hair: follows the comb over the skull, then hangs; gravity dominates once off the head
            off_head = np.clip((t - (0.30 if az < 75 and not bang else 0.18)) / 0.15, 0, 1)
            d = unit(d * 0.55 + c * 0.5 * (1 - off_head) + DOWN * (0.25 + 1.4 * off_head))
        else:
            d = unit(d * 0.55 + c * 0.60 + DOWN * grav * (0.6 + 0.8 * t if az < 70 else 1.0))
        p = pts[-1] + d * step
        q, qn, dist = nearest(p)
        want = base_off + vol * (math.sin(min(t, 0.55) / 0.55 * math.pi / 2)) * (1 - 0.5 * max(0, t - 0.6))
        side_ = (p - q) @ qn
        if side_ < want:
            p = q + qn * want
        pts.append(p)
        if LONG:
            # curtain bangs: shortest at the centre part, longer toward the temples, pointed staggered tips
            dx = min(1.0, abs(loc[0] - hc[0]) / (0.055 * S))
            bang_z = z_brow + (-0.002 - 0.012 * dx ** 1.5 + 0.004 * (layer == 0)) * S + jit * 0.5
            if bang and p[2] < bang_z:
                break
            continue
        # fringe stops at the brows, sides stay above the ear
        stop_z = z_brow + (STYLE["fringe_stop"] + (0.018 if layer == 0 else 0.0 if layer == 1 else -0.014)) * S
        az_p = hairline.azimuth(p[None], hc)[0]
        if az_p < 62 and p[2] < stop_z + jit and p[1] < hc[1] - 0.03 * S:
            break
        if 70 < az < 112 and p[2] < ear_top - 0.004 * S and abs(p[1] - V[in_ears, 1].mean()) < 0.03 * S:
            break
    return np.array(pts)


# ---------------------------------------------------------------- roots (Poisson disk per layer)
scalp = in_body & (hairline.scalp_weight(V, hc, z_brow, top, WHO, 0.004 * S) > 0.5) & ~in_ears
sw = hairline.scalp_weight(V, hc, z_brow, top, WHO, 0.004 * S) * ~in_ears
tri3 = [(t_[0], t_[k], t_[k + 1]) for t_ in tris for k in range(1, len(t_) - 1)]
st_ = np.array([t_ for t_ in tri3 if sw[list(t_)].mean() > 0.5])
A_, B_, C_ = V[st_[:, 0]], V[st_[:, 1]], V[st_[:, 2]]
area = 0.5 * np.linalg.norm(np.cross(B_ - A_, C_ - A_), axis=1)
pick = rng.choice(len(st_), 40000, p=area / area.sum())
r1, r2 = rng.random(40000), rng.random(40000)
flip = r1 + r2 > 1; r1[flip], r2[flip] = 1 - r1[flip], 1 - r2[flip]
scalp_v = A_[pick] + (B_[pick] - A_[pick]) * r1[:, None] + (C_[pick] - A_[pick]) * r2[:, None]
print("scalp verts", int(scalp.sum()), "samples", len(scalp_v), flush=True)
LAYERS = [dict(r=0.0060, w=0.034, var=(0,), len=0.45, vol=0.25, off=-0.0010),
          dict(r=0.0075, w=0.026, var=(0, 1)), dict(r=0.0095, w=0.021, var=(0, 1, 2)), dict(r=0.0110, w=0.013, var=(2, 3))]


def poisson(points, r):
    order = rng.permutation(len(points)); chosen = []
    from mathutils.kdtree import KDTree
    kd = KDTree(len(points))
    taken = np.zeros(len(points), bool)
    for i, p in enumerate(points):
        kd.insert(p.tolist(), i)
    kd.balance()
    for i in order:
        if taken[i]:
            continue
        chosen.append(i)
        for (_, j, _) in kd.find_range(points[i].tolist(), r):
            taken[j] = True
    return points[chosen]


# ---------------------------------------------------------------- strand atlas
AW, AH, NV = 2048, 2048, 4


def make_atlas(path):
    img = np.zeros((AH, AW, 4), np.float32)
    cov = np.zeros((AH, AW), np.float32)
    col = np.zeros((AH, AW, 3), np.float32)
    vv = np.linspace(0, 1, AH)
    for k in range(NV):
        x0, wcol = k * AW // NV, AW // NV
        n_str = [190, 150, 80, 45][k]
        for s_ in range(n_str):
            root_x = rng.uniform(0.04, 0.96); tip_x = 0.5 + (root_x - 0.5) * rng.uniform(0.05, 0.45)
            end = rng.uniform(0.72, 1.0)
            ph = rng.uniform(0, 6.28); amp = rng.uniform(0.004, 0.018); fq = rng.uniform(1.0, 3.0)
            xs = root_x + (tip_x - root_x) * vv ** 1.4 + amp * np.sin(vv * fq * 6.28 + ph)
            th = rng.uniform(1.8, 3.6) * (1 - 0.7 * (vv / end) ** 2)
            start = rng.uniform(0.0, 0.18)
            a_ = np.clip((end - vv) / 0.08, 0, 1) * np.clip((vv - start) / 0.10, 0, 1) * rng.uniform(0.8, 1.0)
            bright = rng.choice([rng.uniform(0.5, 0.9), rng.uniform(1.2, 2.6)], p=[0.7, 0.3])
            xpix = x0 + xs * wcol
            for dx in range(-4, 5):
                xi = np.floor(xpix).astype(int) + dx
                ok = (xi >= x0) & (xi < x0 + wcol)
                dist = np.abs(xi + 0.5 - xpix)
                aa = np.clip(th / 2 + 0.5 - dist, 0, 1) * a_
                rows = np.nonzero(ok & (aa > 0))[0]
                prev = cov[rows, xi[rows]]
                cov[rows, xi[rows]] = 1 - (1 - prev) * (1 - aa[rows])
                tint = (np.array(STYLE["colour"]) * (1 - vv[rows, None]) + np.array(STYLE["colour_tip"]) * vv[rows, None]) * bright
                col[rows, xi[rows]] = col[rows, xi[rows]] * (1 - aa[rows, None]) + tint * aa[rows, None]
    img[..., :3] = np.where(cov[..., None] > 0, col / np.maximum(cov[..., None], 1e-3) * cov[..., None], np.array(STYLE["colour"]))
    img[..., :3] = np.clip(np.where(cov[..., None] > 1e-3, col, np.array(STYLE["colour"])), 0, 1)
    img[..., 3] = cov
    bimg = bpy.data.images.new(f"{WHO}_hair_atlas", AW, AH, alpha=True)
    bimg.pixels[:] = img[::-1].ravel()
    bimg.filepath_raw = path; bimg.file_format = "PNG"; bimg.save(); bimg.pack()
    return bimg


atlas = make_atlas(os.path.join(OUT, f"{WHO}_hair_atlas.png"))

# ---------------------------------------------------------------- cards
verts, faces, uvs, tints = [], [], [], []
n_cards = 0
# clump leaders: outer cards bundle toward a nearby leader strand -> visible clumps with gaps
LEAD_R = 0.024 * S
lead_roots = poisson(scalp_v, LEAD_R)
lead_g = [grow(r_, 2) for r_ in lead_roots]
from mathutils.kdtree import KDTree as _KDT
lead_kd = _KDT(len(lead_roots))
for i_, r_ in enumerate(lead_roots):
    lead_kd.insert(r_.tolist(), i_)
lead_kd.balance()
print("clump leaders", len(lead_roots), flush=True)


def resample(g, n):
    seg = np.r_[0, np.cumsum(np.linalg.norm(np.diff(g, axis=0), axis=1))]
    t_ = np.linspace(0, seg[-1], n)
    return np.stack([np.interp(t_, seg, g[:, k]) for k in range(3)], -1), seg[-1]


def clumped(g, root, strength):
    _, j, dist = lead_kd.find(root.tolist())
    if dist > LEAD_R * 1.6:
        return g
    L_own = np.linalg.norm(np.diff(g, axis=0), axis=1).sum()
    lg, L_lead = resample(lead_g[j], len(g))
    if L_lead < 0.5 * L_own:
        return g
    off = g[0] - lg[0]
    tt = np.linspace(0, 1, len(g))[:, None]
    c = strength * tt ** 1.2
    out = g * (1 - c) + (lg + off * (1 - 0.85 * tt)) * c
    for i_ in range(1, len(out)):          # keep it outside the head
        q, qn, _ = nearest(out[i_])
        if (out[i_] - q) @ qn < 0.002 * S:
            out[i_] = q + qn * 0.002 * S
    return out


GUIDES = []
for li, lay in enumerate(LAYERS):
    roots = poisson(scalp_v, lay["r"] * S)
    roots = roots + rng.normal(0, 0.002 * S, roots.shape)
    for root in roots:
        az_r = hairline.azimuth(root[None], hc)[0]
        len_k = lay.get("len", 1.0)
        if LONG and li <= 2 and is_bang(root):
            len_k *= 0.75 if li <= 1 else 1.0     # blunt bangs (spec: 8-9 cm, at the brows)
        if li <= 1 and az_r < 60 and root[1] < hc[1] and not LONG:
            len_k *= 0.6                    # thin inner fringe: skin shows between the outer clumps
        if li == 0 and root[2] > top - 0.03 * S:
            continue                        # no flat cap flakes on the very top
        g = grow(root, max(li - 1, 0), len_k=len_k, vol_k=lay.get("vol", 1.0), off_k=lay.get("off", 0.0))
        if len(g) < 4:
            continue
        if li >= 2:
            g = clumped(g, root, 0.75 if li == 3 else 0.55)
        T = np.gradient(g, axis=0); T /= np.linalg.norm(T, axis=1, keepdims=True) + 1e-9
        var = int(rng.choice(lay["var"]))
        u0, u1 = var / NV, (var + 1) / NV
        if rng.random() < 0.5:
            u0, u1 = u1, u0
        w0 = lay["w"] * S * rng.uniform(0.8, 1.2)
        base = len(verts)
        tint = rng.uniform(0.55, 1.6) if li >= 2 else rng.uniform(0.6, 1.0)
        twist = rng.uniform(-0.25, 0.25)
        b = None
        card_b, card_w = [], []
        for i, (p, t) in enumerate(zip(g, T)):
            if b is None:
                _, nrm, _ = nearest(g[min(2, len(g) - 1)])
                out = unit(g[min(2, len(g) - 1)] - hc) * 0.3 + nrm * 0.7
                out = out - (out @ t) * t
                b = unit(np.cross(t, unit(out)))
                b = unit(b * math.cos(twist) + unit(np.cross(t, b)) * math.sin(twist))
            else:
                b = unit(b - (b @ t) * t)
            tt = i / (len(g) - 1)
            w = w0 * (1 - 0.72 * tt ** 1.6) * (0.55 + 0.45 * min(1.0, tt / 0.12))
            verts += [p - b * w / 2, p + b * w / 2]
            card_b.append(b.copy()); card_w.append(w)
            tints += [tint, tint]
            uvs += [(u0, 1 - tt), (u1, 1 - tt)]
            if i:
                k = base + 2 * i
                faces.append((k - 2, k - 1, k + 1, k))
        n_cards += 1
        GUIDES.append(dict(g=np.array(g), b=np.array(card_b), w=np.array(card_w), tint=tint, layer=li))
print("cards", n_cards, "quads", len(faces), flush=True)
if os.environ.get("EXPORT_GUIDES"):
    import pickle
    pickle.dump(dict(guides=GUIDES, hc=hc, S=S, top=top, height=height), open(os.environ["EXPORT_GUIDES"], "wb"))
    print("guides saved", len(GUIDES), flush=True)
    if os.environ.get("GUIDES_ONLY"):
        sys.exit(0)

me = bpy.data.meshes.new(f"{WHO}_hair")
me.from_pydata([tuple(v) for v in verts], [], faces)
uvl = me.uv_layers.new(name="UVMap")
for poly in me.polygons:
    for li_ in poly.loop_indices:
        uvl.data[li_].uv = uvs[me.loops[li_].vertex_index]
for p in me.polygons:
    p.use_smooth = True
# shade the cards as one volume: normals point out of an ellipsoid around the head (game hair trick)
hn = np.array(verts) - (hc + np.array([0, 0.01 * S, -0.02 * S]))
hn /= np.linalg.norm(hn, axis=1, keepdims=True)
me.update()
cn = np.array([v.normal[:] for v in me.vertices])
cn *= np.sign((cn * hn).sum(1, keepdims=True) + 1e-9)       # card normal flipped outward
bn = cn * 0.45 + hn * 0.55; bn /= np.linalg.norm(bn, axis=1, keepdims=True)
me.normals_split_custom_set_from_vertices([tuple(n_) for n_ in bn])
attr = me.color_attributes.new("tint", "FLOAT_COLOR", "POINT")
for i_, t_ in enumerate(tints):
    attr.data[i_].color = (t_, t_, t_, 1.0)
hair = bpy.data.objects.new(f"{WHO}_hair", me)
bpy.context.scene.collection.objects.link(hair)

mat = bpy.data.materials.new("hair"); mat.use_nodes = True
nt = mat.node_tree
bsdf = nt.nodes["Principled BSDF"]
tex = nt.nodes.new("ShaderNodeTexImage"); tex.image = atlas
vc = nt.nodes.new("ShaderNodeVertexColor"); vc.layer_name = "tint"
mul = nt.nodes.new("ShaderNodeMix"); mul.data_type = "RGBA"; mul.blend_type = "MULTIPLY"; mul.inputs[0].default_value = 1.0
nt.links.new(tex.outputs["Color"], mul.inputs[6]); nt.links.new(vc.outputs["Color"], mul.inputs[7])
nt.links.new(mul.outputs[2], bsdf.inputs["Base Color"])
nt.links.new(tex.outputs["Alpha"], bsdf.inputs["Alpha"])
bsdf.inputs["Roughness"].default_value = 0.62
bsdf.inputs["Specular IOR Level"].default_value = 0.07
try:
    mat.surface_render_method = "DITHERED"
except Exception:  # noqa: BLE001
    mat.blend_method = "HASHED"
mat.use_backface_culling = False
hair.data.materials.append(mat)

# darken the scalp under the hair in the preview (exported skin texture gets the same in project_mpfb)
bpy.ops.wm.save_as_mainfile(filepath=os.path.join(OUT, f"{WHO}_hair.blend"))

# ---------------------------------------------------------------- preview renders
scene = bpy.context.scene
scene.render.engine = "BLENDER_EEVEE_NEXT"
scene.render.resolution_x = scene.render.resolution_y = 1024
cam = scene.camera
cam.data.type = "ORTHO"; cam.data.ortho_scale = 0.135 * height * 1.9
hcv = hc.copy(); hcv[2] -= 0.01 * S
for name, yaw in (("front", 0), ("q34", 37), ("side", 90), ("back", 180)):
    t = math.radians(yaw)
    d = np.array([math.sin(t), -math.cos(t), 0.0])
    cam.location = Vector((hcv + d * 3).tolist())
    cam.rotation_euler = (Vector(hcv.tolist()) - cam.location).to_track_quat("-Z", "Y").to_euler()
    scene.render.filepath = os.path.join(OUT, f"{WHO}_hair_{name}.png")
    bpy.ops.render.render(write_still=True)
print("HAIR DONE", WHO)
