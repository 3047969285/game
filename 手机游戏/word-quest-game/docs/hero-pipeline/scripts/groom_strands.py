"""Strand groom for UE from the code-built hair clumps.

Usage: EXPORT_GUIDES=... first (hair_cards.py dumps <who>_guides.pkl), then
       Blender -b fit/<who>_textured.blend -P groom_strands.py -- <who> <fit_dir> <export_dir> [strands_per_cm]

Every hair clump (card) becomes a ribbon of real strands: strands are spread across the card width
(and a little in depth), converge toward the clump tip, get staggered tip lengths and a little frizz.
Output, in the same real-scale frame as export_metahuman_input.py (feet at 0, 1.84 m / 1.68 m):
  <export>/<who>_groom.abc        Alembic curves (one curve per strand, guides flagged) for UE Groom import
  <export>/<who>_groom_info.json  strand / point counts and scale
  <fit>/<who>_groom_{front,side}.png  Cycles preview with the head
"""
import bpy, sys, os, json, math, pickle
import numpy as np
from mathutils import Vector

a = sys.argv[sys.argv.index("--") + 1:]
WHO, FIT, EXP = a[0], a[1], a[2]
DENS = float(a[3]) if len(a) > 3 else 28.0           # strands per real cm of clump width
os.makedirs(EXP, exist_ok=True)
rng = np.random.default_rng(11)
H_REAL = {"male": 1.84, "female": 1.68}[WHO]
COL = {"male": (0.012, 0.010, 0.010), "female": (0.20, 0.035, 0.04)}[WHO]
NPTS = 16

d = pickle.load(open(os.path.join(FIT, f"{WHO}_guides.pkl"), "rb"))
guides, hc, S = d["guides"], np.array(d["hc"]), d["S"]

# real-scale transform identical to export_metahuman_input.py
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


def to_real(P):
    return np.stack([P[..., 0] * K, P[..., 1] * K, (P[..., 2] - zmin) * K], -1)


def resample(P, n):
    seg = np.r_[0, np.cumsum(np.linalg.norm(np.diff(P, axis=0), axis=1))]
    t = np.linspace(0, seg[-1], n)
    return np.stack([np.interp(t, seg, P[:, k]) for k in range(P.shape[1])], -1)


strands, is_guide, widths = [], [], []
for gd in guides:
    g = to_real(gd["g"]); b = gd["b"]; w = gd["w"] * K
    g = resample(g, NPTS); b = resample(b, NPTS); w = np.interp(np.linspace(0, 1, NPTS), np.linspace(0, 1, len(gd["w"])), w)
    b /= np.linalg.norm(b, axis=1, keepdims=True) + 1e-9
    T = np.gradient(g, axis=0); T /= np.linalg.norm(T, axis=1, keepdims=True) + 1e-9
    nrm = np.cross(b, T); nrm /= np.linalg.norm(nrm, axis=1, keepdims=True) + 1e-9
    n = max(4, int(w[0] * 100 * DENS))
    tt = np.linspace(0, 1, NPTS)[:, None]
    for s in range(n):
        u = rng.uniform(-0.5, 0.5)
        depth = rng.normal(0, 0.0012)
        conv = rng.uniform(0.55, 0.95)                         # clump tip convergence
        frizz = rng.normal(0, 0.0009, (NPTS, 3)) * tt ** 1.5
        P = g + b * (w[:, None] * u * (1 - conv * tt ** 1.3)) + nrm * depth * (1 - 0.5 * tt) + frizz
        cut = rng.uniform(0.80, 1.0)                           # staggered tips
        P = resample(P[: max(3, int(round(NPTS * cut)))], NPTS)
        strands.append(P); is_guide.append(s == 0); widths.append(rng.uniform(0.00006, 0.00009))
strands = np.array(strands)
print("strands", len(strands), "points", strands.size // 3, flush=True)

# ---------------------------------------------------------------- legacy poly curve object (Alembic exports these as curves)
for o in list(bpy.data.objects):
    if o.type == "MESH" and o.name not in ("Human",) and not o.name.endswith("high-poly"):
        o.hide_render = True
cu = bpy.data.curves.new(f"{WHO}_groom", "CURVE"); cu.dimensions = "3D"
cu.bevel_depth = 0.0
for P in strands:
    sp = cu.splines.new("POLY"); sp.points.add(NPTS - 1)
    sp.points.foreach_set("co", np.c_[P, np.ones(NPTS)].ravel().tolist())
groom = bpy.data.objects.new(f"{WHO}_groom", cu)
bpy.context.scene.collection.objects.link(groom)
for o in bpy.data.objects:
    o.select_set(o == groom)
bpy.context.view_layer.objects.active = groom
abc = os.path.join(EXP, f"{WHO}_groom.abc")
bpy.ops.wm.alembic_export(filepath=abc, selected=True, start=1, end=1, uvs=False, normals=False,
                          export_hair=False, export_particles=False, global_scale=1.0)
json.dump({"strands": int(len(strands)), "points_per_strand": NPTS, "guides": int(sum(is_guide)),
           "frame": "real metres, Z-up in Blender (Alembic writes Y-up), feet at 0", "height_m": H_REAL,
           "strand_width_m": [0.00006, 0.00009], "colour_linear": COL},
          open(os.path.join(EXP, f"{WHO}_groom_info.json"), "w"), indent=1)
print("abc", abc, os.path.getsize(abc) // 1024, "KB", flush=True)

# ---------------------------------------------------------------- preview: put the head in the same frame
body.matrix_world = body.matrix_world.copy()
body.scale = tuple(s_ * K for s_ in body.scale)
body.location = (body.location[0] * K, body.location[1] * K, (body.location[2] - zmin) * K)
for o in bpy.data.objects:
    if o.type == "MESH" and o.name.endswith("high-poly") and o.parent is None:
        o.scale = tuple(s_ * K for s_ in o.scale)
        o.location = (o.location[0] * K, o.location[1] * K, (o.location[2] - zmin) * K)
cu.bevel_depth = 0.00004; cu.bevel_resolution = 0
mat = bpy.data.materials.new("groom"); mat.use_nodes = True
nt = mat.node_tree
for n_ in list(nt.nodes):
    if n_.type == "BSDF_PRINCIPLED":
        nt.nodes.remove(n_)
hb = nt.nodes.new("ShaderNodeBsdfHairPrincipled")
hb.parametrization = "COLOR"
hb.inputs["Color"].default_value = (*COL, 1)
hb.inputs["Roughness"].default_value = 0.32
nt.links.new(hb.outputs[0], nt.nodes["Material Output"].inputs["Surface"])
groom.data.materials.append(mat)
sc = bpy.context.scene
sc.render.engine = "CYCLES"; sc.cycles.samples = 48
try:
    pr = bpy.context.preferences.addons["cycles"].preferences; pr.compute_device_type = "METAL"; pr.get_devices()
    for dv in pr.devices:
        dv.use = True
    sc.cycles.device = "GPU"
except Exception:  # noqa: BLE001
    pass
sc.render.resolution_x = sc.render.resolution_y = 900
sc.render.film_transparent = True
cam = sc.camera
cam.data.type = "ORTHO"; cam.data.ortho_scale = 0.40
hc_r = to_real(hc[None])[0] + np.array([0, 0, 0.01])
for name, yaw in (("front", 0), ("q34", 37), ("side", 90), ("back", 180)):
    t = math.radians(yaw)
    dv_ = np.array([math.sin(t), -math.cos(t), 0.0])
    cam.location = Vector((hc_r + dv_ * 3).tolist())
    cam.rotation_euler = (Vector(hc_r.tolist()) - cam.location).to_track_quat("-Z", "Y").to_euler()
    sc.render.filepath = os.path.join(FIT, f"{WHO}_groom_{name}.png")
    bpy.ops.render.render(write_still=True)
print("GROOM DONE", flush=True)
