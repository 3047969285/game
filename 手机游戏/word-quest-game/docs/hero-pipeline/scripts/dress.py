"""Code-built outfit for the female lead (lin): pale-blue A-line dress with square neckline and thin
straps, plus black cord necklace with a bar pendant. Measurements: word-quest-ue/Docs/characters/lin-outfit.md
(DeepSeek D6, measured from female_sheet.png at 1.68 m).

Usage: Blender -b fit/female_fit.blend -P dress.py -- female fit
Writes fit/female_clothes.blend (+ previews fit/female_clothes_{front,q34,side,back}.png).
All sizes below are real metres; the fitted body is in model units, converted with K.
"""
import bpy, bmesh, sys, os, math
import numpy as np
from mathutils import Vector
from mathutils.bvhtree import BVHTree

a = sys.argv[sys.argv.index("--") + 1:]
WHO, FIT = a[0], a[1]
H_REAL = 1.68
SPEC = dict(waist_z=1.14, hem_z=0.286, neck_front_drop=0.08, neck_width=0.24, strap_w=0.011,
            strap_inset=0.04, hem_circ=2.26, folds=22, ease=0.006,
            colour=(209, 218, 233), cord_len=0.46, pendant=(0.006, 0.022))

body = bpy.data.objects["Human"]
for m in body.modifiers:
    m.show_viewport = False
bpy.context.view_layer.update()
dg = bpy.context.evaluated_depsgraph_get()
ev = body.evaluated_get(dg)
mw = body.matrix_world
V = np.array([(mw @ v.co)[:] for v in ev.data.vertices])
gid = body.vertex_groups["body"].index
keep = np.array([any(g.group == gid and g.weight > 0.5 for g in v.groups) for v in body.data.vertices])
polys = [list(p.vertices) for p in body.data.polygons]
zmin, zmax = V[keep, 2].min(), V[keep, 2].max()
K = H_REAL / (zmax - zmin)                    # real metres per model unit
S = 1.0 / K                                   # model units per real metre
Zr = lambda zr: zmin + zr * S                 # real height -> model z
bvh = BVHTree.FromPolygons([tuple(v) for v in V], [tuple(p) for p in polys if keep[p].all()])
cx = 0.5 * (V[keep, 0].min() + V[keep, 0].max())


def unit(v):
    return v / (np.linalg.norm(v) + 1e-12)


def section(z, band=0.012):
    """body vertices in a thin horizontal band (model units), torso only (no arms)."""
    m = keep & (np.abs(V[:, 2] - z) < band * S)
    P = V[m]
    if not len(P):
        return P
    # split torso from A-posed arms: largest gap in |x - cx|
    ax = np.sort(np.abs(P[:, 0] - cx))
    gaps = np.diff(ax)
    if len(gaps) and gaps.max() > 0.02 * S:
        cut = ax[np.argmax(gaps)] + 1e-6
        P = P[np.abs(P[:, 0] - cx) <= cut]
    return P


# ---------------------------------------------------------------- skirt: A-line rings from waist to hem
NSEG = 96
rings = []
z_w, z_h = Zr(SPEC["waist_z"]), Zr(SPEC["hem_z"])
NR = 40
r_hem = SPEC["hem_circ"] / (2 * math.pi) * S
# torso-only radius profile per direction at the waist and at the hip (widest point), arms excluded
def radial(sec, c, d):
    return max(((sec[:, :2] - c) @ d).max(), 0.0) if len(sec) else 0.0
waist_sec = section(z_w)
hip_z = Zr(SPEC["waist_z"] - 0.20)
hip_sec = section(hip_z)
hip_sec = hip_sec[np.abs(hip_sec[:, 0] - cx) < (np.abs(waist_sec[:, 0] - cx).max() * 1.6)] if len(hip_sec) else hip_sec
c = np.array([cx, waist_sec[:, 1].mean()])
dirs = [np.array([math.sin(2 * math.pi * k / NSEG), -math.cos(2 * math.pi * k / NSEG)]) for k in range(NSEG)]
r_w = np.array([radial(waist_sec, c, d) for d in dirs]) + SPEC["ease"] * S
r_hip = np.array([radial(hip_sec, c, d) for d in dirs]) + 0.015 * S
for i in range(NR + 1):
    t = i / NR
    z = z_w + (z_h - z_w) * t
    ring = []
    for k, d in enumerate(dirs):
        ang = 2 * math.pi * k / NSEG
        # smooth A-line: waist -> clears the hip -> flares to the hem radius
        base = r_w[k] + (r_hem - r_w[k]) * (t ** 1.15)
        t_hip = (SPEC["waist_z"] - 0.20 - SPEC["waist_z"]) / (SPEC["hem_z"] - SPEC["waist_z"])
        clear = r_hip[k] * min(1.0, t / max(t_hip, 1e-3)) ** 0.5 if t > 0 else 0.0
        r = max(base, clear)
        fold = 1 + (0.06 * t ** 1.4) * math.sin(SPEC["folds"] * ang + 0.7 * math.sin(3 * ang))
        ring.append((c[0] + d[0] * r * fold, c[1] + d[1] * r * fold, z))
    rings.append(ring)
sv, sf = [], []
for ring in rings:
    sv += ring
for i in range(NR):
    for k in range(NSEG):
        a0 = i * NSEG + k; a1 = i * NSEG + (k + 1) % NSEG
        sf.append((a0, a1, a1 + NSEG, a0 + NSEG))
skirt_me = bpy.data.meshes.new("lin_skirt"); skirt_me.from_pydata(sv, [], sf)

# ---------------------------------------------------------------- bodice: torso surface between waist and neckline
z_top_front = Zr(1.38 - SPEC["neck_front_drop"])     # sternal notch ~1.38 m on a 1.68 m figure
z_top_back = Zr(1.30)
half_neck = SPEC["neck_width"] / 2 * S
arm_sec = section(Zr(1.22))
torso_half = np.abs(arm_sec[:, 0] - cx).max() if len(arm_sec) else 0.16 * S
sel = []
for pi_, p in enumerate(polys):
    if not keep[p].all():
        continue
    P = V[p]; c = P.mean(0)
    if c[2] < z_w - 0.01 * S or abs(c[0] - cx) > torso_half - 0.005 * S:
        continue
    front = c[1] < V[keep][np.abs(V[keep, 2] - c[2]) < 0.02 * S][:, 1].mean() if True else True
    top = z_top_front if front else z_top_back
    if c[2] > top:
        continue
    sel.append(pi_)
bm = bmesh.new()
vmap = {}
for pi_ in sel:
    vs = []
    for vi in polys[pi_]:
        if vi not in vmap:
            loc, nrm, _, _ = bvh.find_nearest(Vector(V[vi].tolist()))
            vmap[vi] = bm.verts.new((np.array(loc[:]) + np.array(nrm[:]) * 0.004 * S).tolist())
        vs.append(vmap[vi])
    try:
        bm.faces.new(vs)
    except ValueError:
        pass
bodice_me = bpy.data.meshes.new("lin_bodice"); bm.to_mesh(bodice_me); bm.free()

# ---------------------------------------------------------------- straps: ribbons over the shoulders
def strap(side):
    x = cx + side * (torso_half - SPEC["strap_inset"] * S)
    pts = []
    for ang in np.linspace(-1.2, 1.2, 28):                    # sweep front -> top -> back in the y-z plane
        o = Vector((x, V[keep, 1].mean(), Zr(1.30)))
        d = Vector((0, math.sin(ang), math.cos(ang)))         # ang<0 front (-Y), ang>0 back
        hit = bvh.ray_cast(o + d * 0.4 * S, -d, 0.6 * S)
        if hit[0] is not None:
            pts.append(np.array(hit[0][:]) + np.array(hit[1][:]) * 0.005 * S)
    pts = [p for p in pts if p[2] > Zr(1.24)]
    verts, faces = [], []
    w = SPEC["strap_w"] / 2 * S
    for i, p in enumerate(pts):
        verts += [(p[0] - w, p[1], p[2]), (p[0] + w, p[1], p[2])]
        if i:
            k = 2 * i; faces.append((k - 2, k - 1, k + 1, k))
    me = bpy.data.meshes.new(f"lin_strap_{side}"); me.from_pydata(verts, [], faces)
    return me


# ---------------------------------------------------------------- necklace: cord loop + bar pendant
neck = section(Zr(1.40), 0.01)
nc = neck.mean(0) if len(neck) else np.array([cx, 0, Zr(1.40)])
L = SPEC["cord_len"] * S
rx = (np.abs(neck[:, 0] - nc[0]).max() + 0.004 * S) if len(neck) else 0.06 * S
ry = (np.abs(neck[:, 1] - nc[1]).max() + 0.004 * S) if len(neck) else 0.06 * S
cord_pts = []
for ang in np.linspace(0, 2 * math.pi, 64, endpoint=False):
    drop = max(0.0, math.cos(ang)) ** 2 * (L / 2 - math.pi * (rx + ry) / 2) * 0.8   # hangs lower at the front
    p = np.array([nc[0] + rx * math.sin(ang), nc[1] - ry * math.cos(ang) - drop * 0.35, nc[2] - drop])
    loc, nrm, _, _ = bvh.find_nearest(Vector(p.tolist()))
    q = np.array(loc[:]); n_ = np.array(nrm[:])
    if (p - q) @ n_ < 0.002 * S:
        p = q + n_ * 0.002 * S
    cord_pts.append(p)
cu = bpy.data.curves.new("lin_necklace", "CURVE"); cu.dimensions = "3D"
sp = cu.splines.new("POLY"); sp.points.add(len(cord_pts) - 1); sp.use_cyclic_u = True
sp.points.foreach_set("co", np.c_[np.array(cord_pts), np.ones(len(cord_pts))].ravel().tolist())
cu.bevel_depth = 0.00075 * S; cu.bevel_resolution = 2
front_pt = min(cord_pts, key=lambda p: p[1])
pend = bpy.data.meshes.new("lin_pendant")
pw, ph = SPEC["pendant"][0] / 2 * S, SPEC["pendant"][1] * S
px, py, pz = front_pt
pend.from_pydata([(px - pw, py - 0.002 * S, pz), (px + pw, py - 0.002 * S, pz),
                  (px + pw, py - 0.002 * S, pz - ph), (px - pw, py - 0.002 * S, pz - ph),
                  (px - pw, py + 0.001 * S, pz), (px + pw, py + 0.001 * S, pz),
                  (px + pw, py + 0.001 * S, pz - ph), (px - pw, py + 0.001 * S, pz - ph)], [],
                 [(0, 1, 2, 3), (4, 7, 6, 5), (0, 4, 5, 1), (1, 5, 6, 2), (2, 6, 7, 3), (3, 7, 4, 0)])


# ---------------------------------------------------------------- objects, smoothing, materials
def mat(name, rgb, rough, sheen=0.0, metal=0.0):
    m = bpy.data.materials.new(name); m.use_nodes = True
    b = m.node_tree.nodes["Principled BSDF"]
    lin = [((c / 255) / 12.92) if c / 255 <= 0.04045 else (((c / 255) + 0.055) / 1.055) ** 2.4 for c in rgb]
    b.inputs["Base Color"].default_value = (*lin, 1); b.inputs["Roughness"].default_value = rough
    b.inputs["Metallic"].default_value = metal
    if sheen:
        b.inputs["Sheen Weight"].default_value = sheen
    return m


dress_m = mat("lin_dress", SPEC["colour"], 0.78, sheen=0.4)
cord_m = mat("lin_cord", (28, 28, 30), 0.6)
pend_m = mat("lin_pendant_metal", (42, 44, 48), 0.3, metal=1.0)


def add(me, m, smooth_iter=0, solid=0.0):
    o = bpy.data.objects.new(me.name, me); bpy.context.scene.collection.objects.link(o)
    o.data.materials.append(m)
    if smooth_iter:
        md = o.modifiers.new("smooth", "CORRECTIVE_SMOOTH"); md.iterations = smooth_iter; md.factor = 0.5
    if solid:
        md = o.modifiers.new("solid", "SOLIDIFY"); md.thickness = solid * S; md.offset = 1.0
    for p in o.data.polygons:
        p.use_smooth = True
    return o


skirt = add(skirt_me, dress_m, smooth_iter=6, solid=0.0015)
bodice = add(bodice_me, dress_m, smooth_iter=12, solid=0.0012)
for side in (-1, 1):
    add(strap(side), dress_m, solid=0.0010)
neck_o = bpy.data.objects.new("lin_necklace", cu); bpy.context.scene.collection.objects.link(neck_o)
neck_o.data.materials.append(cord_m)
add(pend, pend_m)
for m in body.modifiers:
    m.show_viewport = True
print("dress parts: skirt", len(skirt_me.polygons), "bodice", len(bodice_me.polygons), flush=True)
bpy.ops.wm.save_as_mainfile(filepath=os.path.join(FIT, f"{WHO}_clothes.blend"))

# ---------------------------------------------------------------- previews
sc = bpy.context.scene
sc.render.engine = "BLENDER_EEVEE_NEXT"; sc.render.resolution_x = 700; sc.render.resolution_y = 1000
if sc.camera is None:
    cd_ = bpy.data.cameras.new("cam"); co_ = bpy.data.objects.new("cam", cd_); sc.collection.objects.link(co_); sc.camera = co_
cam = sc.camera; cam.data.type = "ORTHO"; cam.data.ortho_scale = (zmax - zmin) * 1.08
if sc.world is None:
    sc.world = bpy.data.worlds.new("w")
sc.world.use_nodes = True
sc.world.node_tree.nodes["Background"].inputs[0].default_value = (0.8, 0.8, 0.8, 1)
ctr = np.array([cx, V[keep, 1].mean(), (zmin + zmax) / 2])
for name, yaw in (("front", 0), ("q34", 37), ("side", 90), ("back", 180)):
    t = math.radians(yaw); d = np.array([math.sin(t), -math.cos(t), 0.0])
    cam.location = Vector((ctr + d * 5).tolist())
    cam.rotation_euler = (Vector(ctr.tolist()) - cam.location).to_track_quat("-Z", "Y").to_euler()
    sc.render.filepath = os.path.join(FIT, f"{WHO}_clothes_{name}.png")
    bpy.ops.render.render(write_still=True)
print("DRESS DONE", flush=True)
