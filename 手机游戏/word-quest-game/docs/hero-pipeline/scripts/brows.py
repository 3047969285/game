"""Eyebrows + eyelashes for the male hero.

The eyebrows are built from code as a dense, dark band of short hairs that follows the
landmark brow ridge (the reference has thick, near-black, fairly straight brows - the
MPFB eyebrow assets are too thin for it). Eyelashes come from the CC0 MPFB asset pack.

Usage: Blender -b <who>_hair.blend -P brows.py -- <who> <out_dir>
Saves <who>_face.blend and close-up previews <who>_face_{front,q34,side,closeup}.png
"""
import bpy, sys, os, math, json
import numpy as np
from mathutils import Vector
from mathutils.bvhtree import BVHTree
from bl_ext.user_default.mpfb.services.humanservice import HumanService

a = sys.argv[sys.argv.index("--") + 1:]
WHO, OUT = a[0], a[1]
HERE = os.path.dirname(os.path.abspath(__file__))
rng = np.random.default_rng(int(os.environ.get("BROW_SEED", "41")))

body = bpy.data.objects["Human"]
for stale in (f"{WHO}_brows", f"{WHO}_lashes"):
    obj = bpy.data.objects.get(stale)
    if obj is not None:
        bpy.data.objects.remove(obj, do_unlink=True)
# the eyelash asset object is named Human.eyelashes01
for o in list(bpy.data.objects):
    if o.name.startswith("Human.eyelashes"):
        bpy.data.objects.remove(o, do_unlink=True)


def eval_mesh(obj):
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


V = eval_mesh(body)
gid = {g.name: g.index for g in body.vertex_groups}
in_body = np.zeros(len(V), bool)
for v in body.data.vertices:
    for g in v.groups:
        if g.weight > 0.5 and g.group == gid["body"]:
            in_body[v.index] = True
tris = [tuple(p.vertices) for p in body.data.polygons if in_body[list(p.vertices)].all()]
bvh = BVHTree.FromPolygons([tuple(v) for v in V], tris)
top = V[in_body, 2].max()
height = top - V[in_body, 2].min()
S = height / {"male": 1.84, "female": 1.68}[WHO]
lm = {int(k): np.array(v) for k, v in json.load(open(os.path.join(OUT, f"{WHO}_lm3d.json"))).items()}


def unit(v):
    return v / (np.linalg.norm(v) + 1e-12)


def smoothstep(e0, e1, x):
    t = np.clip((x - e0) / (e1 - e0 + 1e-9), 0, 1)
    return t * t * (3 - 2 * t)


def project(p, lift=0.0):
    loc, nrm, _ = bvh.find_nearest(Vector(p.tolist()))[:3]
    loc = np.array(loc[:]); nrm = np.array(nrm[:])
    return loc + nrm * lift, nrm


BROW_L = [46, 53, 52, 65, 55, 107, 66, 105, 63, 70]
BROW_R = [276, 283, 282, 295, 285, 336, 296, 334, 293, 300]


def smooth_curve(pts, n):
    """Cheap Catmull-Rom through the landmark points, sampled n times."""
    pts = np.asarray(pts)
    seg = np.r_[0, np.cumsum(np.linalg.norm(np.diff(pts, axis=0), axis=1))]
    out = []
    for t in np.linspace(0, seg[-1], n):
        i = max(1, min(len(pts) - 2, np.searchsorted(seg, t)))
        u = (t - seg[i - 1]) / max(seg[i + 1] - seg[i - 1], 1e-9)
        p0, p1, p2, p3 = pts[max(i - 1, 0)], pts[i], pts[i + 1], pts[min(i + 2, len(pts) - 1)]
        u2, u3 = u * u, u * u * u
        out.append(0.5 * ((2 * p1) + (-p0 + p2) * u + (2 * p0 - 5 * p1 + 4 * p2 - p3) * u2 +
                          (-p0 + 3 * p1 - 3 * p2 + p3) * u3))
    return np.array(out)


def brow_curve(indices, n=16):
    pts = np.array([lm[i] for i in indices])
    pts = pts[np.argsort(pts[:, 0])]           # order along x
    if pts[0, 0] > pts[-1, 0]:
        pts = pts[::-1]
    c = smooth_curve(pts, n)
    # project every station back onto the skin so the band wraps the brow ridge
    return np.array([project(p)[0] for p in c])


# ---------------------------------------------------------------- brow hair atlas
HW, HH = 1024, 256


def make_brow_atlas(path):
    """Dense dark brow band with individual hairs poking past the edges."""
    img = np.zeros((HH, HW, 4), np.float32)
    uu = np.linspace(0, 1, HW)[None, :]
    vv = np.linspace(0, 1, HH)[:, None]
    # opaque band across the ribbon with feathered top / bottom edges
    edge_v = smoothstep(0.0, 0.16, vv) * (1.0 - smoothstep(0.84, 1.0, vv))
    edge_u = smoothstep(0.0, 0.03, uu) * (1.0 - smoothstep(0.97, 1.0, uu))
    band = edge_v * edge_u * (0.88 + 0.12 * np.cos((vv - 0.45) * math.pi))
    col0 = np.array([0.0090, 0.0085, 0.0100])
    col = col0[None, None, :] * (0.80 + 0.35 * (1 - vv))[..., None]
    prem = col * band[..., None]
    cov = band.copy()
    n_h = 520
    for _ in range(n_h):
        x0 = rng.uniform(0.005, 0.995)
        base_v = rng.uniform(-0.06, 0.14)
        end_v = rng.uniform(0.60, 1.10)
        lean = rng.normal(0.10, 0.14)
        curve = rng.normal(0.0, 0.06)
        xs = x0 + lean * (vv - base_v) + curve * (vv - base_v) ** 2
        a_ = np.clip((vv - base_v) / 0.10, 0, 1) * np.clip((end_v - vv) / 0.25, 0, 1)
        a_ = a_ * (0.35 + 0.65 * rng.random())
        rows = np.nonzero(a_[:, 0] > 0)[0]
        if len(rows) == 0:
            continue
        xpix = xs[rows, 0] * HW
        th = rng.uniform(1.2, 2.6)
        dark = rng.uniform(0.55, 1.10)
        cc = np.array([0.009, 0.0085, 0.010]) * dark
        if rng.random() < 0.12:
            cc = np.array([0.050, 0.047, 0.052])
        for dx in range(-2, 3):
            xi = np.floor(xpix).astype(int) + dx
            ok = (xi >= 0) & (xi < HW)
            dist = np.abs(xi + 0.5 - xpix)
            aa = np.clip(th / 2 + 0.5 - dist, 0, 1) * a_[rows, 0]
            good = ok & (aa > 0)
            if not good.any():
                continue
            rows_g = rows[good]
            xi_g = xi[good]
            aa_g = aa[good]
            prem[rows_g, xi_g] += cc * aa_g[:, None]
            cov[rows_g, xi_g] += aa_g
    cov = np.clip(cov, 0, 1)
    safe = np.maximum(cov, 1e-4)[..., None]
    rgb = np.where(cov[..., None] > 0.02, prem / safe, col0)
    img[..., :3] = np.clip(rgb, 0, 1)
    img[..., 3] = cov
    bimg = bpy.data.images.new("brow_atlas", HW, HH, alpha=True)
    bimg.pixels[:] = img[::-1].ravel()
    bimg.alpha_mode = "STRAIGHT"
    bimg.filepath_raw = path
    bimg.file_format = "PNG"
    bimg.save()
    bimg.pack()
    return bimg


atlas = make_brow_atlas(os.path.join(OUT, f"{WHO}_brow_atlas.png"))

# ---------------------------------------------------------------- brow ribbons
verts, faces, uvs = [], [], []


def add_brow(indices, mirror):
    curve = brow_curve(indices)
    if mirror:                      # keep t=0 at the inner end for both brows
        curve = curve[::-1]
    n = len(curve)
    T = np.gradient(curve, axis=0)
    T /= np.linalg.norm(T, axis=1, keepdims=True) + 1e-9
    for i in range(n):
        p, nrm = project(curve[i], lift=0.0011 * S)
        t = i / (n - 1)
        # half height of the brow band in model units, thick inner body, thin tail
        h = (0.0060 - 0.0024 * t) * S
        if t > 0.86:
            h *= 0.45
        up = unit(np.array([0, 0, 1.0]) - (np.array([0, 0, 1.0]) @ nrm) * nrm)
        side = unit(np.cross(nrm, up))
        if (side @ T[i]) < 0:
            side = -side
        # three rows across the band: slight outward bulge in the middle
        rows = [p - up * h, p + nrm * (0.00035 * S), p + up * h]
        vin = (i / (n - 1))
        u = vin if not mirror else 1.0 - vin
        for r_, (q, v) in enumerate(zip(rows, (0.0, 0.5, 1.0))):
            verts.append(q)
            uvs.append((u, v))
    base = len(verts) - 3 * n
    for i in range(n - 1):
        for r_ in range(2):
            k = base + 3 * i + r_
            faces.append((k, k + 3, k + 4, k + 1))


add_brow(BROW_L, mirror=True)
add_brow(BROW_R, mirror=False)
me = bpy.data.meshes.new(f"{WHO}_brows")
me.from_pydata([tuple(v) for v in verts], [], faces)
uvl = me.uv_layers.new(name="UVMap")
for poly in me.polygons:
    for li_ in poly.loop_indices:
        uvl.data[li_].uv = uvs[me.loops[li_].vertex_index]
for p in me.polygons:
    p.use_smooth = True
brow_normals = []
for v in me.vertices:
    _, nrm = project(np.array(v.co[:]))
    brow_normals.append(tuple(float(x) for x in nrm))
me.update()
me.normals_split_custom_set_from_vertices(brow_normals)
me.update()
mat = bpy.data.materials.new(f"{WHO}_brow_mat")
mat.use_nodes = True
nt = mat.node_tree
bsdf = nt.nodes.get("Principled BSDF")
tex = nt.nodes.new("ShaderNodeTexImage")
tex.image = atlas
nt.links.new(tex.outputs["Color"], bsdf.inputs["Base Color"])
nt.links.new(tex.outputs["Alpha"], bsdf.inputs["Alpha"])
for key, val in (("Roughness", 0.55), ("Specular IOR Level", 0.14), ("Coat Weight", 0.0)):
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
me.materials.append(mat)
brows = bpy.data.objects.new(f"{WHO}_brows", me)
bpy.context.scene.collection.objects.link(brows)
print("brows", len(verts), "verts", len(faces), "faces", flush=True)

# ---------------------------------------------------------------- eyelashes (MPFB CC0 asset)
U = os.path.expanduser("~/Library/Application Support/Blender/4.5/extensions/.user/user_default/mpfb/data")
lash_path = os.path.join(U, "eyelashes", "eyelashes01", "eyelashes01.mhclo")
try:
    lash = HumanService.add_mhclo_asset(lash_path, body, asset_type="Eyelashes", subdiv_levels=0,
                                        material_type="MAKESKIN")
    lash.name = f"{WHO}_lashes"
    for slot in lash.material_slots:
        m = slot.material
        if not m or not m.use_nodes:
            continue
        m.node_tree.nodes  # force
        for node in m.node_tree.nodes:
            if node.type == "BSDF_PRINCIPLED":
                pass
        # make sure the alpha map drives transparency and the lashes stay dark
        tex_nodes = [n for n in m.node_tree.nodes if n.type == "TEX_IMAGE" and n.image]
        bsdf_l = next((n for n in m.node_tree.nodes if n.type == "BSDF_PRINCIPLED"), None)
        if tex_nodes and bsdf_l:
            alpha_src = tex_nodes[0].outputs["Alpha"]
            if not bsdf_l.inputs["Alpha"].is_linked:
                m.node_tree.links.new(alpha_src, bsdf_l.inputs["Alpha"])
            if not bsdf_l.inputs["Base Color"].is_linked:
                m.node_tree.links.new(tex_nodes[0].outputs["Color"], bsdf_l.inputs["Base Color"])
        try:
            m.surface_render_method = "DITHERED"
        except Exception:  # noqa: BLE001
            m.blend_method = "HASHED"
        m.use_backface_culling = False
    print("lashes", len(lash.data.vertices), "verts", flush=True)
except Exception as exc:  # noqa: BLE001
    print("LASHES FAILED", repr(exc), flush=True)

bpy.ops.wm.save_as_mainfile(filepath=os.path.join(OUT, f"{WHO}_face.blend"))

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
lmarr = np.array(list(lm.values()))
hc = lmarr.mean(0)
hc[1] += 0.03 * height / 1.84
hc[2] += 0.012 * height / 1.84
UP = np.array([0, 0, 1.0])


def frame(yaw, pitch=0.0):
    t = math.radians(yaw)
    d = np.array([math.sin(t), -math.cos(t), 0.0])
    if pitch:
        pr = math.radians(pitch)
        d = d * math.cos(pr) + UP * math.sin(pr)
    return d


for name, yaw, pitch, scale in (("front", 0, 0, 1.55), ("q34", 37, 0, 1.55), ("side", 90, 0, 1.55),
                                ("closeup", 0, 0, 0.72)):
    d = frame(yaw, pitch)
    cam.location = Vector((hc + d * 3).tolist())
    cam.rotation_euler = (Vector(hc.tolist()) - cam.location).to_track_quat("-Z", "Y").to_euler()
    cam.data.ortho_scale = 0.135 * height * scale
    scene.render.filepath = os.path.join(OUT, f"{WHO}_face_{name}.png")
    bpy.ops.render.render(write_still=True)
print("BROWS DONE", WHO)
