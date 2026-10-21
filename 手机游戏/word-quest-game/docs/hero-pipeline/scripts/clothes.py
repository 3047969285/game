"""Procedural outfit for the male hero (me2026): white shirt (rolled sleeves), black
trousers, black leather shoes.

Pipeline:
  * Base garment geometry comes from CC0 MPFB assets fitted to the current (face-fitted,
    A-posed) body via the MPFB human service:
      - shirt    <- male_casualsuit03 (top piece)
      - trousers <- male_elegantsuit01 (lower piece)
      - shoes    <- shoes04
  * Shirt: sleeves cut at mid-forearm (PCA arm axis + snapped planar rim) and covered
    with a procedurally built rolled-cuff ring; hem tucked into the trousers; raised
    button placket + buttons; collar lifted slightly so it stands open.
  * Trousers: waistband ring (built on the real waist boundary loop), fly seam and
    front leg creases.
  * Materials are self-contained Principled setups with flat base color / roughness
    (so a later glTF export stays correct) plus a subtle procedural fabric bump.

Usage:
  Blender -b fit/male_fit.blend -P clothes.py -- male fit
writes fit/male_clothes.blend and fit/male_clothes_{front,q34,side,back}.png.
"""
import bpy
import bmesh
import math
import os
import sys

import numpy as np
from mathutils import Vector, Matrix

TWO_PI = 2.0 * math.pi
MPFB_CLOTHES = os.path.expanduser(
    "~/Library/Application Support/Blender/4.5/extensions/.user/user_default/mpfb/data/clothes")
SHIRT_ASSET = "male_casualsuit03"     # button-up shirt (top piece)
TROUSER_ASSET = "male_elegantsuit01"  # dress-suit trousers (bottom piece)
SHOE_ASSET = "shoes04"                # black derby shoes

DBG = os.environ.get("CLOTHES_DBG", "0") == "1"
NORENDER = os.environ.get("CLOTHES_NORENDER", "0") == "1"


# ---------------------------------------------------------------- small helpers
def srgb(c):
    """sRGB triple -> linear triple."""
    def f(x):
        return x / 12.92 if x <= 0.04045 else ((x + 0.055) / 1.055) ** 2.4
    return tuple(f(x) for x in c)


def smoothstep(x):
    x = min(max(x, 0.0), 1.0)
    return x * x * (3.0 - 2.0 * x)


def world_verts(ob):
    mw = ob.matrix_world
    return np.array([(mw @ v.co)[:] for v in ob.data.vertices], dtype=np.float64)


class RadialFit:
    """Smooth star-shaped radius profile r(theta) per z band (Fourier least squares)."""

    def __init__(self, pts, center=(0.0, -0.015), dz=0.02, nharm=2, min_pts=8):
        self.center = np.array(center, float)
        self.dz = dz
        self.nharm = nharm
        z = pts[:, 2]
        self.zmin, self.zmax = float(z.min()), float(z.max())
        self.nb = int(math.ceil((self.zmax - self.zmin) / dz)) + 3
        X = pts[:, 0] - self.center[0]
        Y = pts[:, 1] - self.center[1]
        r = np.hypot(X, Y)
        th = np.arctan2(Y, X)
        A = self._design(th)
        self.coefs = np.zeros((self.nb, 2 * nharm + 1))
        for k in range(self.nb):
            zc = self.zmin + (k - 1) * dz
            m = np.abs(z - zc) < 1.7 * dz
            if m.sum() < min_pts:
                m = np.abs(z - zc) < 4.0 * dz
            if m.sum() < 3:
                self.coefs[k] = self.coefs[k - 1] if k > 0 else 0.0
                continue
            c, *_ = np.linalg.lstsq(A[m], r[m], rcond=None)
            self.coefs[k] = c

    def _design(self, th):
        cols = [np.ones_like(th)]
        for h in range(1, self.nharm + 1):
            cols.append(np.cos(h * th))
            cols.append(np.sin(h * th))
        return np.stack(cols, axis=-1)

    def __call__(self, x, y, z):
        th = math.atan2(y - self.center[1], x - self.center[0])
        k = int(round((z - self.zmin) / self.dz)) + 1
        k = min(max(k, 0), self.nb - 1)
        return float(self._design(np.array([th]))[0] @ self.coefs[k])


class Fourier1D:
    """Smooth Fourier fit of a scalar around a full circle (theta -> value)."""

    def __init__(self, theta, values, nharm=2):
        cols = [np.ones_like(theta)]
        for h in range(1, nharm + 1):
            cols.append(np.cos(h * theta))
            cols.append(np.sin(h * theta))
        A = np.stack(cols, axis=-1)
        self.nharm = nharm
        self.coef, *_ = np.linalg.lstsq(A, values, rcond=None)

    def __call__(self, theta):
        v = [1.0]
        for h in range(1, self.nharm + 1):
            v.extend([math.cos(h * theta), math.sin(h * theta)])
        return float(np.dot(np.array(v), self.coef))


# ---------------------------------------------------------------- scene / body measurements
args = sys.argv[sys.argv.index("--") + 1:] if "--" in sys.argv else []
WHO = args[0] if args else "male"
OUT = os.path.abspath(args[1] if len(args) > 1 else "fit")
os.makedirs(OUT, exist_ok=True)

scene = bpy.context.scene
body = bpy.data.objects["Human"]

dg = bpy.context.evaluated_depsgraph_get()
ev = body.evaluated_get(dg)
bme = ev.to_mesh()
BP = np.array([(body.matrix_world @ v.co)[:] for v in bme.vertices], dtype=np.float64)
ev.to_mesh_clear()
H = float(BP[:, 2].max() - BP[:, 2].min())
print(f"[clothes] body height {H:.4f} units ({H / 1.12419:.3f} m), {len(BP)} render verts")

from bl_ext.user_default.mpfb.services.humanservice import HumanService


def load_asset(asset):
    path = os.path.join(MPFB_CLOTHES, asset, asset + ".mhclo")
    ob = HumanService.add_mhclo_asset(path, body, asset_type="Clothes", subdiv_levels=0,
                                      material_type="MAKESKIN")
    print(f"[clothes] loaded {asset}: {len(ob.data.vertices)}v "
          f"{sum(len(p.vertices) - 2 for p in ob.data.polygons)} tris")
    return ob


def n_tris(ob):
    return sum(len(p.vertices) - 2 for p in ob.data.polygons)


def smooth_shade(ob):
    for p in ob.data.polygons:
        p.use_smooth = True


def components(ob):
    bm = bmesh.new()
    bm.from_mesh(ob.data)
    bm.faces.ensure_lookup_table()
    bm.verts.ensure_lookup_table()
    seen = set()
    comps = []
    for f in bm.faces:
        if f.index in seen:
            continue
        stack = [f]
        seen.add(f.index)
        comp = []
        while stack:
            cf = stack.pop()
            comp.append(cf.index)
            for e in cf.edges:
                for nf in e.link_faces:
                    if nf.index not in seen:
                        seen.add(nf.index)
                        stack.append(nf)
        comps.append(comp)
    out = []
    for comp in comps:
        vids = set()
        for fi in comp:
            vids.update(v.index for v in bm.faces[fi].verts)
        pts = np.array([tuple((ob.matrix_world @ bm.verts[i].co)[:]) for i in vids])
        out.append({"faces": comp, "n": len(comp), "zmin": pts[:, 2].min(),
                    "zmax": pts[:, 2].max()})
    bm.free()
    out.sort(key=lambda c: -c["n"])
    return out


def keep_component(ob, pick):
    comps = components(ob)
    print(f"[clothes] {ob.name}: " + ", ".join(
        f"n={c['n']} z=[{c['zmin']:.2f},{c['zmax']:.2f}]" for c in comps))
    keep = set(comps[pick(comps)]["faces"])
    bm = bmesh.new()
    bm.from_mesh(ob.data)
    bm.faces.ensure_lookup_table()
    bmesh.ops.delete(bm, geom=[f for f in bm.faces if f.index not in keep],
                     context="FACES_ONLY")
    loose = [v for v in bm.verts if not v.link_faces]
    if loose:
        bmesh.ops.delete(bm, geom=loose, context="VERTS")
    bm.to_mesh(ob.data)
    bm.free()
    ob.data.update()
    print(f"[clothes]   kept -> {len(ob.data.vertices)}v {n_tris(ob)} tris")


def drop_body_delete_masks():
    """MPFB hides the body parts covered by each garment.  Keep the body intact so the
    open collar shows the neck/chest and the body stays a complete skinning target."""
    removed = 0
    for m in list(body.modifiers):
        if m.type == "MASK" and m.vertex_group and m.vertex_group.startswith("Delete."):
            body.modifiers.remove(m)
            removed += 1
    print(f"[clothes] removed {removed} garment body-mask modifiers")


# ---------------------------------------------------------------- materials
def principled(mat):
    return mat.node_tree.nodes["Principled BSDF"]


def set_in(node, name, value):
    if name in node.inputs:
        node.inputs[name].default_value = value


def fabric_material(name, rgb_srgb, rough, sheen=0.1, bump=0.12, coat=0.0):
    mat = bpy.data.materials.new(name)
    mat.use_nodes = True
    nt = mat.node_tree
    bs = principled(mat)
    set_in(bs, "Base Color", (*srgb(rgb_srgb), 1.0))
    set_in(bs, "Roughness", rough)
    set_in(bs, "Metallic", 0.0)
    set_in(bs, "Sheen Weight", sheen)
    set_in(bs, "Sheen Roughness", 0.4)
    set_in(bs, "Coat Weight", coat)
    set_in(bs, "Coat Roughness", 0.15)
    tc = nt.nodes.new("ShaderNodeTexCoord")
    n1 = nt.nodes.new("ShaderNodeTexNoise")
    n1.inputs["Scale"].default_value = 240.0
    n1.inputs["Detail"].default_value = 2.0
    n2 = nt.nodes.new("ShaderNodeTexNoise")
    n2.inputs["Scale"].default_value = 8.0
    n2.inputs["Detail"].default_value = 3.0
    n2.inputs["Roughness"].default_value = 0.55
    b1 = nt.nodes.new("ShaderNodeBump")
    b1.inputs["Strength"].default_value = bump * 0.3
    b1.inputs["Distance"].default_value = 0.004
    b2 = nt.nodes.new("ShaderNodeBump")
    b2.inputs["Strength"].default_value = bump
    b2.inputs["Distance"].default_value = 0.01
    nt.links.new(tc.outputs["Object"], n1.inputs["Vector"])
    nt.links.new(tc.outputs["Object"], n2.inputs["Vector"])
    nt.links.new(n1.outputs["Fac"], b1.inputs["Height"])
    nt.links.new(n2.outputs["Fac"], b2.inputs["Height"])
    nt.links.new(b1.outputs["Normal"], b2.inputs["Normal"])
    nt.links.new(b2.outputs["Normal"], bs.inputs["Normal"])
    mat.diffuse_color = (*srgb(rgb_srgb), 1.0)
    return mat


def leather_material(name):
    mat = bpy.data.materials.new(name)
    mat.use_nodes = True
    bs = principled(mat)
    set_in(bs, "Base Color", (*srgb((0.045, 0.045, 0.052)), 1.0))
    set_in(bs, "Roughness", 0.26)
    set_in(bs, "Metallic", 0.0)
    set_in(bs, "Coat Weight", 0.4)
    set_in(bs, "Coat Roughness", 0.10)
    mat.diffuse_color = (*srgb((0.045, 0.045, 0.052)), 1.0)
    return mat


# ---------------------------------------------------------------- load + trim assets
trousers = load_asset(TROUSER_ASSET)
keep_component(trousers, lambda c: int(np.argmin([x["zmin"] + x["zmax"] for x in c])))
trousers.name = "male_trousers"
trousers.data.name = "male_trousers"

shirt = load_asset(SHIRT_ASSET)
keep_component(shirt, lambda c: int(np.argmax([x["zmin"] + x["zmax"] for x in c])))
shirt.name = "male_shirt"
shirt.data.name = "male_shirt"

shoes = load_asset(SHOE_ASSET)
shoes.name = "male_shoes"
shoes.data.name = "male_shoes"

drop_body_delete_masks()

# materials only now: the asset loader purges unused datablocks
MAT_SHIRT = fabric_material("male_shirt_fabric", (0.930, 0.922, 0.905), 0.64,
                            sheen=0.16, bump=0.26)
MAT_BUTTON = fabric_material("male_shirt_button", (0.86, 0.855, 0.84), 0.32,
                             sheen=0.25, bump=0.0, coat=0.12)
MAT_TROUSER = fabric_material("male_trouser_fabric", (0.050, 0.050, 0.057), 0.72,
                              sheen=0.06, bump=0.38)
MAT_SHOE = leather_material("male_shoe_leather")

shirt.data.materials.clear()
shirt.data.materials.append(MAT_SHIRT)
shirt.data.materials.append(MAT_BUTTON)
trousers.data.materials.clear()
trousers.data.materials.append(MAT_TROUSER)
shoes.data.materials.clear()
shoes.data.materials.append(MAT_SHOE)
for ob in (shirt, trousers, shoes):
    smooth_shade(ob)

# hide the body feet inside the shoes (the shoe asset ships a body delete group for that;
# the rest of the body is kept intact so the open collar shows real skin)
foot_masks = 0
for g in body.vertex_groups:
    if g.name.startswith("Delete.shoes"):
        m = body.modifiers.new("hide_feet_under_shoes", "MASK")
        m.vertex_group = g.name
        m.invert_vertex_group = True
        foot_masks += 1
print(f"[clothes] body vertex groups: {[g.name for g in body.vertex_groups if g.name.startswith('Delete')]}")
print(f"[clothes] added {foot_masks} foot-hide mask modifiers")

# ---------------------------------------------------------------- geometry helpers
def basis_from_axis(axis):
    a = Vector(axis).normalized()
    ref = Vector((0.0, 0.0, 1.0)) if abs(a.z) < 0.9 else Vector((0.0, 1.0, 0.0))
    e1 = a.cross(ref).normalized()
    e2 = a.cross(e1).normalized()
    return a, e1, e2


def add_ring(bm, center, e1, e2, radius_fn, nbins):
    vs = []
    for i in range(nbins):
        a = TWO_PI * i / nbins
        r = radius_fn(a)
        vs.append(bm.verts.new(center + e1 * (r * math.cos(a)) + e2 * (r * math.sin(a))))
    return vs


def bridge_rings(bm, rings, mat_index, smooth=True):
    n = len(rings[0])
    for k in range(len(rings) - 1):
        A, B = rings[k], rings[k + 1]
        for i in range(n):
            j = (i + 1) % n
            try:
                f = bm.faces.new((A[i], A[j], B[j], B[i]))
            except ValueError:
                continue
            f.material_index = mat_index
            f.smooth = smooth


def add_strip(bm, rows, mat_index, smooth=True):
    vs = [[bm.verts.new(p) for p in row] for row in rows]
    for k in range(len(vs) - 1):
        A, B = vs[k], vs[k + 1]
        for i in range(len(A) - 1):
            try:
                f = bm.faces.new((A[i], A[i + 1], B[i + 1], B[i]))
            except ValueError:
                continue
            f.material_index = mat_index
            f.smooth = smooth
    return vs


def add_disc_button(bm, center, normal, radius, thickness, mat_index, nbins=16):
    n = Vector(normal).normalized()
    _, e1, e2 = basis_from_axis(n)
    rings = []
    for off in (-thickness * 0.5, thickness * 0.5):
        c = center + n * off
        rings.append([bm.verts.new(c + e1 * (radius * math.cos(TWO_PI * i / nbins))
                                   + e2 * (radius * math.sin(TWO_PI * i / nbins)))
                      for i in range(nbins)])
    bridge_rings(bm, rings, mat_index)
    for ring in rings:
        c = bm.verts.new(sum((v.co for v in ring), Vector()) / len(ring))
        for i in range(len(ring)):
            j = (i + 1) % len(ring)
            try:
                f = bm.faces.new((ring[i], ring[j], c))
            except ValueError:
                continue
            f.material_index = mat_index
            f.smooth = False


def moving_average(a, w=3):
    a = np.asarray(a, float)
    if len(a) < 2 * w + 1:
        return a
    pad = np.pad(a, w, mode="edge")
    ker = np.ones(2 * w + 1) / (2 * w + 1)
    return np.convolve(pad, ker, mode="valid")


# ---------------------------------------------------------------- sleeve cut + rolled cuffs
SH = world_verts(shirt)
bm = bmesh.new()
bm.from_mesh(shirt.data)
bm.faces.ensure_lookup_table()
bm.verts.ensure_lookup_table()

cuff_planes = {}
for side in (1, -1):
    arm = SH[side * SH[:, 0] > 0.24]
    c = arm.mean(axis=0)
    cov = np.cov((arm - c).T)
    w, v = np.linalg.eigh(cov)
    d = v[:, -1]
    d = d / (np.linalg.norm(d) + 1e-12)
    if np.dot(d, np.array([side * 0.5, -0.2, -0.7])) < 0:
        d = -d
    t = (arm - c) @ d
    t0, t1 = float(t.min()), float(t.max())
    cut_t = t0 + 0.75 * (t1 - t0)
    cuff_planes[side] = (c, d, cut_t)
    print(f"[clothes] arm side {side}: axis={np.round(d, 3)} t=[{t0:.3f},{t1:.3f}] "
          f"cut_t={cut_t:.3f}")

kill = []
for v in bm.verts:
    co = np.array(v.co[:])
    for side, (c, d, cut_t) in cuff_planes.items():
        if side * co[0] > 0.20 and np.dot(co - c, d) > cut_t:
            kill.append(v)
            break
if kill:
    bmesh.ops.delete(bm, geom=kill, context="VERTS")
    bm.verts.ensure_lookup_table()
    bm.faces.ensure_lookup_table()

# snap the ragged rim onto a plane so the rolled cuff band can cover it cleanly
for side, (c, d, cut_t) in cuff_planes.items():
    rim = []
    for v in bm.verts:
        if side * v.co.x <= 0.20:
            continue
        t = float(np.dot(np.array(v.co[:]) - c, d))
        if cut_t - 0.06 < t <= cut_t + 1e-6 and any(e.is_boundary for e in v.link_edges):
            rim.append(v)
    if not rim:
        print(f"[clothes] WARNING no rim for side {side}")
        continue
    rim_t = np.array([float(np.dot(np.array(v.co[:]) - c, d)) for v in rim])
    P = Vector(c.tolist()) + Vector(d.tolist()) * float(rim_t.mean())
    for v in rim:
        off = float(np.dot(np.array(v.co[:]) - np.array(P), d))
        v.co = v.co - Vector(d.tolist()) * off
    centre = sum((v.co for v in rim), Vector()) / len(rim)
    a, e1, e2 = basis_from_axis(d)
    nbins = 24
    prof = np.zeros(nbins)
    for v in rim:
        q = v.co - centre
        ang = math.atan2(q.dot(e2), q.dot(e1))
        b = int((ang + math.pi) / TWO_PI * nbins) % nbins
        prof[b] = max(prof[b], math.hypot(q.dot(e1), q.dot(e2)))
    ok = prof > 0
    idx = np.arange(nbins)
    if ok.sum() >= 4:
        prof = np.interp(idx, idx[ok], prof[ok], period=nbins)
    else:
        prof[:] = prof[ok].mean() if ok.any() else 0.045
    ker = np.array([1, 2, 3, 2, 1], float)
    ker /= ker.sum()
    prof = sum(ker[i] * np.roll(prof, i - 2) for i in range(5))
    base = prof + 0.0030
    spec = [(-0.040, 0.940), (-0.034, 1.005), (-0.017, 1.125),
            (0.000, 1.175), (0.017, 1.125), (0.034, 1.030), (0.043, 0.935)]
    rings = []
    for u, f in spec:
        cc = centre + Vector(d.tolist()) * u
        rings.append(add_ring(bm, cc, e1, e2,
                              lambda ang, f=f: base[int((ang + math.pi) / TWO_PI * nbins) % nbins] * f,
                              nbins))
    bridge_rings(bm, rings, 0)
    print(f"[clothes] cuff side {side}: rim={len(rim)} centre={np.round(np.array(centre), 3)} "
          f"r~{prof.mean():.3f}")

for f in bm.faces:
    f.smooth = True
bm.to_mesh(shirt.data)
bm.free()
shirt.data.update()
print(f"[clothes] shirt after sleeve work: {n_tris(shirt)} tris")

# ---------------------------------------------------------------- tuck the shirt hem
# waist boundary loop of the asset, smoothed into theta -> (z, r)  (needed for the tuck)
CY = -0.015
bm0 = bmesh.new()
bm0.from_mesh(trousers.data)
boundary = [v for v in bm0.verts if any(e.is_boundary for e in v.link_edges)]
top_bound = [v.co.copy() for v in boundary if v.co.z > float(world_verts(trousers)[:, 2].max()) - 0.035]
bm0.free()
th_b = np.array([math.atan2(p.y - CY, p.x) for p in top_bound])
z_b = np.array([p.z for p in top_bound])
r_b = np.array([math.hypot(p.x, p.y - CY) for p in top_bound])
zfit = Fourier1D(th_b, z_b, nharm=2)
rfit = Fourier1D(th_b, r_b, nharm=3)
print(f"[clothes] waist boundary: {len(top_bound)} verts, z range "
      f"[{z_b.min():.3f},{z_b.max():.3f}]")


from mathutils.bvhtree import BVHTree

def bvh_of(ob):
    """World-space BVH of the evaluated mesh (FromObject can be stale in this context)."""
    dg = bpy.context.evaluated_depsgraph_get()
    dg.update()
    ev = ob.evaluated_get(dg)
    me = ev.to_mesh()
    tmp = bmesh.new()
    tmp.from_mesh(me)
    ev.to_mesh_clear()
    mtx = ob.matrix_world.copy()
    if mtx != Matrix.Identity(4):
        for v in tmp.verts:
            v.co = mtx @ v.co
    bvh = BVHTree.FromBMesh(tmp)
    tmp.free()
    return bvh


bvh_body = bvh_of(body)
bvh_pants = bvh_of(trousers)


def radial_surface(bvh, theta, z, r_start, r_max=0.7):
    """Radius (from the vertical body axis) of the first surface hit when casting a ray
    from outside towards the axis."""
    u = Vector((math.cos(theta), math.sin(theta), 0.0))
    origin = Vector((math.cos(theta) * r_start, CY + math.sin(theta) * r_start, z))
    hit = bvh.ray_cast(origin, -u, r_max)
    if hit[0] is None:
        return None
    p = hit[0]
    return math.hypot(p.x, p.y - CY)


bm = bmesh.new()
bm.from_mesh(shirt.data)
moved = 0
for v in bm.verts:
    co = v.co
    z = co.z
    if z > 1.35 or abs(co.x) > 0.27:
        continue
    r = math.hypot(co.x, co.y - CY)
    if r < 1e-6:
        continue
    theta = math.atan2(co.y - CY, co.x)
    zt = zfit(theta)
    if z < zt - 0.030:
        # hidden below the waistband: sink it into the body (the body is inside the trousers)
        rb = radial_surface(bvh_body, theta, z, r + 0.03, 0.6)
        if rb is None:
            continue
        target = rb - 0.0040
    else:
        # just above the waistband the shirt is pulled inside the band; then it eases back
        # to its natural (fitted, non-poking) shape
        sample_z = min(z, zt - 0.006)
        pants_r = radial_surface(bvh_pants, theta, sample_z, r + 0.03, 0.6)
        if pants_r is None:
            continue
        band_r = pants_r + 0.0035
        base = min(r, band_r - 0.0035)
        dz = z - zt
        f = smoothstep((dz - 0.004) / 0.032) if dz > 0.004 else 0.0
        target = min(r, base + (r - base) * f)
    w = 1.0
    if target < r and w > 0:
        k = 1.0 + (target / r - 1.0) * w
        v.co.x = co.x * k
        v.co.y = CY + (co.y - CY) * k
        moved += 1
bm.to_mesh(shirt.data)
bm.free()
shirt.data.update()
print(f"[clothes] tucked {moved} shirt hem verts")

# ---------------------------------------------------------------- placket, buttons, collar
SH = world_verts(shirt)
bm = bmesh.new()
bm.from_mesh(shirt.data)
bm.faces.ensure_lookup_table()
bm.verts.ensure_lookup_table()

# The asset shirt is an open-front button-up: its two front edges run from the hem all
# the way up to the neck and the left panel overlaps the right one.  Visually the open
# collar V starts where the front edges cross the centre line - that is the top button.
apex_z = None
for e in bm.edges:
    if not e.is_boundary:
        continue
    mid = (e.verts[0].co + e.verts[1].co) * 0.5
    if mid.y < -0.08 and abs(mid.x) < 0.006 and 1.50 < mid.z < 1.72:
        if apex_z is None or mid.z < apex_z:
            apex_z = mid.z
print(f"[clothes] collar V apex z={apex_z}")
if apex_z is None:
    apex_z = 1.64


def front_surface(z, half_window=0.02):
    sel = SH[(np.abs(SH[:, 2] - z) < half_window) & (np.abs(SH[:, 0]) < 0.05)]
    if len(sel) < 3:
        return None
    return sel[int(np.argmin(sel[:, 1]))]


# raised button placket from inside the waistband up to the collar V apex
pl_rows = []
for z in np.linspace(1.195, apex_z - 0.004, 30):
    p = front_surface(z, half_window=0.014)
    if p is None:
        continue
    y = p[1]
    pl_rows.append([Vector((-0.0085, y + 0.0015, z)),
                    Vector((0.0, y - 0.0020, z)),
                    Vector((0.0085, y + 0.0015, z))])
if len(pl_rows) > 2:
    add_strip(bm, pl_rows, 0)
print(f"[clothes] placket rows={len(pl_rows)}")

# buttons below the collar V
button_z = [apex_z - dz_ for dz_ in (0.013, 0.100, 0.190, 0.280)]
n_buttons = 0
for z in button_z:
    if z < 1.290:
        continue
    p = front_surface(z, half_window=0.024)
    if p is None:
        continue
    add_disc_button(bm, Vector((0.0, p[1] - 0.0028, z)), (0.0, -1.0, 0.0),
                    0.0064, 0.0034, 1)
    n_buttons += 1
print(f"[clothes] buttons={n_buttons}")

# collar: lift + open the existing collar slightly (stands up like the reference)
for v in bm.verts:
    co = v.co
    if co.z < 1.735:
        continue
    dx, dy = co.x, co.y + 0.03
    r = math.hypot(dx, dy)
    if r > 0.132:
        continue
    w = smoothstep((co.z - 1.740) / 0.070)
    if w <= 0:
        continue
    co.x += dx / max(r, 1e-5) * 0.0045 * w
    co.y += dy / max(r, 1e-5) * 0.0045 * w
    co.z += 0.0030 * w
bm.to_mesh(shirt.data)
bm.free()
shirt.data.update()
print(f"[clothes] shirt final: {n_tris(shirt)} tris")

# ---------------------------------------------------------------- trousers details
TP = world_verts(trousers)
z_top = float(TP[:, 2].max())
fit_pants = RadialFit(TP[TP[:, 2] > 0.12], dz=0.02, nharm=2)

bm = bmesh.new()
bm.from_mesh(trousers.data)
nb_w = 56
angs = np.linspace(-math.pi, math.pi, nb_w, endpoint=False)
zt = np.array([zfit(a) for a in angs])
rb = []
for a, zz in zip(angs, zt):
    rs = []
    for dz_ in (-0.048, -0.025, -0.002):
        r = radial_surface(bvh_pants, a, zz + dz_, 0.45, 0.9)
        if r is not None:
            rs.append(r)
    rb.append((max(rs) if rs else rfit(a)) + 0.0035)
rb = np.array(rb)
spec = [(-0.052, -0.0020), (-0.046, 0.0010), (-0.020, 0.0018),
        (-0.003, 0.0022), (0.0055, 0.0005), (0.0065, -0.0055), (-0.020, -0.0055)]
rings = []
for dz_, extra in spec:
    pts = []
    for a, rr, zz in zip(angs, rb, zt):
        pts.append(Vector(((rr + extra) * math.cos(a),
                           CY + (rr + extra) * math.sin(a), zz + dz_)))
    rings.append([bm.verts.new(p) for p in pts])
bridge_rings(bm, rings, 0)

# fly seam (front centre)
fly_rows = []
for z in np.linspace(z_top - 0.075, z_top - 0.175, 12):
    rf = fit_pants(0.0, CY - 1.0, z)
    y = CY - rf
    fly_rows.append([Vector((-0.006, y - 0.0002, z)),
                     Vector((0.002, y - 0.0011, z)),
                     Vector((0.010, y - 0.0002, z))])
add_strip(bm, fly_rows, 0)

# front creases down each leg
for side in (1, -1):
    zs = np.linspace(0.16, 1.02, 30)
    xs, ys = [], []
    for z in zs:
        sel = TP[(np.abs(TP[:, 2] - z) < 0.035) & (side * TP[:, 0] > 0.03)]
        if len(sel) < 4:
            xs.append(np.nan)
            ys.append(np.nan)
            continue
        xc = float(np.median(sel[:, 0]))
        yc = float(np.median(sel[:, 1]))
        m = sel[np.abs(sel[:, 0] - xc) < 0.10]
        yf = float(m[:, 1].min()) if len(m) else yc
        xs.append(xc)
        ys.append(yf)
    xs = np.array(xs)
    ys = np.array(ys)
    ok = ~np.isnan(xs)
    if ok.sum() < 5:
        continue
    xs = np.interp(zs, zs[ok], xs[ok])
    ys = np.interp(zs, zs[ok], ys[ok])
    xs = moving_average(xs, 3)
    ys = moving_average(ys, 3)
    rows = []
    for z, x, y in zip(zs, xs, ys):
        rows.append([Vector((x - 0.0045, y + 0.0011, z)),
                     Vector((x, y - 0.0015, z)),
                     Vector((x + 0.0045, y + 0.0011, z))])
    add_strip(bm, rows, 0)

for f in bm.faces:
    f.smooth = True
bm.to_mesh(trousers.data)
bm.free()
trousers.data.update()
print(f"[clothes] trousers final: {n_tris(trousers)} tris")

# ---------------------------------------------------------------- subtle cloth wrinkles
def wrinkle(ob, strength, scale, zmin, zmax):
    from mathutils import noise
    bm = bmesh.new()
    bm.from_mesh(ob.data)
    bm.normal_update()
    for v in bm.verts:
        co = v.co
        if co.z < zmin or co.z > zmax:
            continue
        n = noise.noise(Vector((co.x * scale, co.y * scale, co.z * scale)))
        if n > 0:
            v.co += v.normal * (n * strength)
    bm.to_mesh(ob.data)
    bm.free()
    ob.data.update()


wrinkle(shirt, 0.0013, 9.0, 1.0, 1.85)
wrinkle(trousers, 0.0011, 8.0, 0.1, 1.35)
for ob in (shirt, trousers, shoes):
    smooth_shade(ob)
    ob.data.update()

total = n_tris(shirt) + n_tris(trousers) + n_tris(shoes)
print(f"[clothes] TRIANGLES shirt={n_tris(shirt)} trousers={n_tris(trousers)} "
      f"shoes={n_tris(shoes)} TOTAL={total}")
assert total <= 15000, "over triangle budget"

# ---------------------------------------------------------------- preview render
for o in [o for o in bpy.data.objects if o.type in ("LIGHT", "CAMERA")]:
    bpy.data.objects.remove(o)

cam_data = bpy.data.cameras.new("male_clothes_cam")
cam = bpy.data.objects.new("male_clothes_cam", cam_data)
scene.collection.objects.link(cam)
scene.camera = cam
cam_data.type = "ORTHO"
cam_data.ortho_scale = H * 1.16
TARGET = Vector((0.0, 0.0, H * 0.535))


def area_light(name, loc, energy, size, color):
    ld = bpy.data.lights.new(name, "AREA")
    ld.energy = energy
    ld.size = size
    ld.color = color
    lo = bpy.data.objects.new(name, ld)
    scene.collection.objects.link(lo)
    lo.location = loc
    lo.rotation_euler = (TARGET - Vector(loc)).to_track_quat("-Z", "Y").to_euler()


area_light("key", (1.35, -2.6, 2.85), 300.0, 2.0, (1.0, 0.975, 0.94))
area_light("fill", (-2.3, -1.9, 1.7), 110.0, 2.6, (0.93, 0.96, 1.0))
area_light("rim", (0.6, 2.6, 2.75), 190.0, 1.5, (0.96, 0.98, 1.0))

world = scene.world or bpy.data.worlds.new("World")
scene.world = world
world.use_nodes = True
bg = world.node_tree.nodes.get("Background")
bg.inputs[0].default_value = (0.885, 0.89, 0.90, 1.0)
bg.inputs[1].default_value = 0.55

scene.render.engine = "BLENDER_EEVEE_NEXT"
scene.render.resolution_x = scene.render.resolution_y = 1024
scene.render.resolution_percentage = 100
scene.render.image_settings.file_format = "PNG"
scene.render.film_transparent = False
scene.view_settings.view_transform = "AgX"
scene.view_settings.look = "None"
scene.view_settings.exposure = 0.40
try:
    scene.eevee.taa_render_samples = 64
    scene.eevee.use_raytracing = True
    scene.eevee.use_shadows = True
except Exception as exc:  # noqa: BLE001
    print("[clothes] eevee settings warning:", exc)

body.hide_render = False
for ob in (shirt, trousers, shoes):
    ob.hide_render = False


def render_view(name, yaw, scale=None, target=None):
    t = math.radians(yaw)
    d = np.array([math.sin(t), -math.cos(t), 0.0])
    r = np.array([math.cos(t), math.sin(t), 0.0])
    u = np.array([0.0, 0.0, 1.0])
    c = target if target is not None else TARGET
    cam.location = Vector((np.array(c) + d * 6.0).tolist())
    cam.rotation_euler = Matrix([[r[0], u[0], d[0]],
                                 [r[1], u[1], d[1]],
                                 [r[2], u[2], d[2]]]).to_euler()
    cam_data.ortho_scale = scale if scale is not None else H * 1.16
    scene.render.filepath = os.path.join(OUT, f"{WHO}_clothes_{name}.png")
    bpy.ops.render.render(write_still=True)
    print("[clothes] wrote", scene.render.filepath)


if not NORENDER:
    render_view("front", 0.0)
    render_view("q34", 37.0)
    render_view("side", 90.0)
    render_view("back", 180.0)
    if DBG:
        render_view("dbg_waist", 0.0, 0.62, Vector((0.0, 0.0, 1.22)))
        render_view("dbg_collar", 0.0, 0.46, Vector((0.0, 0.0, 1.67)))
        render_view("dbg_collar34", 35.0, 0.46, Vector((0.0, 0.0, 1.67)))
        render_view("dbg_sleeve", 50.0, 0.64, Vector((0.44, -0.18, 1.32)))
        render_view("dbg_sleeve2", -50.0, 0.64, Vector((-0.44, -0.18, 1.32)))
        render_view("dbg_feet", 30.0, 0.5, Vector((0.0, 0.0, 0.13)))
        render_view("dbg_torso34", 37.0, 0.9, Vector((0.0, 0.0, 1.40)))
        render_view("dbg_armpit", 120.0, 0.6, Vector((0.0, 0.0, 1.55)))
        render_view("dbg_armpit34", 210.0, 0.6, Vector((0.0, 0.0, 1.55)))

out_blend = os.path.join(OUT, f"{WHO}_clothes.blend")
for ob in (shirt, trousers, shoes, body):
    ob.select_set(False)
# drop unused datablocks (old MPFB asset textures/materials are no longer used)
for _ in range(3):
    bpy.data.orphans_purge(do_recursive=True)
bpy.ops.wm.save_as_mainfile(filepath=out_blend)
print("[clothes] saved", out_blend)
print("[clothes] DONE")
