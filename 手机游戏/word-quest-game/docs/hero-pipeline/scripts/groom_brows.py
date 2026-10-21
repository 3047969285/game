"""Eyebrow strand groom from the fitted 468 landmarks (real brow-hair growth pattern).

Usage: Blender -b fit/<who>_textured.blend -P groom_brows.py -- <who> <fit_dir> <export_dir>
Brow band = region between the upper and lower MediaPipe brow contours. Roots are sampled densely
inside the band (densest at the body of the brow, sparse at the tail). Hair direction follows the
classic pattern: head of the brow grows up-and-out, body sweeps outward, tail grows outward-down;
hairs lie close to the skin (~18 deg) and are 5-11 mm long.
Output (same real-scale frame as export_metahuman_input.py): <export>/<who>_brows.abc
"""
import bpy, sys, os, json, math
import numpy as np
from mathutils import Vector
from mathutils.bvhtree import BVHTree

a = sys.argv[sys.argv.index("--") + 1:]
WHO, FIT, EXP = a[0], a[1], a[2]
rng = np.random.default_rng(5)
H_REAL = {"male": 1.84, "female": 1.68}[WHO]
DENS = {"male": 1.0, "female": 0.7}[WHO]          # male lead: thick, dark, fairly straight brows

body = bpy.data.objects["Human"]
saved = [(m, m.show_viewport) for m in body.modifiers]
for m, _ in saved:
    m.show_viewport = False
bpy.context.view_layer.update()
ev = body.evaluated_get(bpy.context.evaluated_depsgraph_get())
V = np.array([(body.matrix_world @ v.co)[:] for v in ev.data.vertices])
gid = body.vertex_groups["body"].index
keep = np.array([any(g.group == gid and g.weight > 0.5 for g in v.groups) for v in body.data.vertices])
tris = [tuple(p.vertices) for p in body.data.polygons if keep[list(p.vertices)].all()]
bvh = BVHTree.FromPolygons([tuple(v) for v in V], tris)
for m, vis in saved:
    m.show_viewport = vis
zmin, zmax = V[keep, 2].min(), V[keep, 2].max()
K = H_REAL / (zmax - zmin)
lm = {int(k): np.array(v) for k, v in json.load(open(os.path.join(FIT, f"{WHO}_lm3d.json"))).items()}

# MediaPipe brow contours, ordered from the head (medial) to the tail (lateral)
BROWS = {
    "right": (dict(upper=[107, 66, 105, 63, 70], lower=[55, 65, 52, 53, 46])),
    "left": (dict(upper=[336, 296, 334, 293, 300], lower=[285, 295, 282, 283, 276])),
}


def curve(ids, n):
    P = np.array([lm[i] for i in ids])
    seg = np.r_[0, np.cumsum(np.linalg.norm(np.diff(P, axis=0), axis=1))]
    t = np.linspace(0, seg[-1], n)
    return np.stack([np.interp(t, seg, P[:, k]) for k in range(3)], -1)


def surf(p):
    loc, nrm, _, _ = bvh.find_nearest(Vector(p.tolist()))
    return np.array(loc[:]), np.array(nrm[:])


strands = []
for side, b in BROWS.items():
    up, lo = curve(b["upper"], 60), curve(b["lower"], 60)
    out_dir = np.sign(up[-1, 0] - up[0, 0])          # +1 if the tail is toward +X
    n_roots = int(1100 * DENS)
    for _ in range(n_roots):
        u = rng.beta(1.3, 1.6)                       # along the brow: denser toward the body
        v = rng.uniform(0.05, 0.95)                  # across the band
        i = min(59, int(u * 59))
        root = lo[i] * (1 - v) + up[i] * v
        # thin the tail and the upper edge a little
        if u > 0.8 and rng.random() < (u - 0.8) * 3:
            continue
        p0, n0 = surf(root)
        tangent = up[min(59, i + 1)] - up[max(0, i - 1)]
        tangent /= np.linalg.norm(tangent) + 1e-9
        upv = np.array([0, 0, 1.0])
        # growth: head (u<0.18) up-and-out, body outward with slight lift, tail outward-down
        lift = np.interp(u, [0, 0.18, 0.55, 1.0], [1.4, 0.45, 0.1, -0.35])
        d = tangent + upv * lift
        d = d - (d @ n0) * n0                        # into the skin tangent plane
        d /= np.linalg.norm(d) + 1e-9
        ang = math.radians(rng.uniform(12, 24))
        d = d * math.cos(ang) + n0 * math.sin(ang)
        L = rng.uniform(0.0050, 0.0110) / K * (1.0 - 0.35 * u)
        pts = []
        for k in range(8):
            t = k / 7
            bend = -n0 * 0.25 * t * t                # curls back toward the skin
            pts.append(p0 + n0 * 0.0002 / K + (d + bend) * L * t)
        P = np.array(pts)
        strands.append(np.stack([P[:, 0] * K, P[:, 1] * K, (P[:, 2] - zmin) * K], -1))
strands = np.array(strands)
print("brow strands", len(strands), flush=True)

cu = bpy.data.curves.new(f"{WHO}_brows", "CURVE"); cu.dimensions = "3D"
for P in strands:
    sp = cu.splines.new("POLY"); sp.points.add(len(P) - 1)
    sp.points.foreach_set("co", np.c_[P, np.ones(len(P))].ravel().tolist())
ob = bpy.data.objects.new(f"{WHO}_brows", cu)
bpy.context.scene.collection.objects.link(ob)
for o in bpy.data.objects:
    o.select_set(o == ob)
bpy.context.view_layer.objects.active = ob
out = os.path.join(EXP, f"{WHO}_brows.abc")
bpy.ops.wm.alembic_export(filepath=out, selected=True, start=1, end=1, uvs=False, normals=False,
                          export_hair=False, export_particles=False, global_scale=1.0)
print("BROWS DONE", out, os.path.getsize(out) // 1024, "KB", flush=True)
