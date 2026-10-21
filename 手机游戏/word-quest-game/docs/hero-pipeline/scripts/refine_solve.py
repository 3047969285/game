"""Free-form refinement of the fitted MPFB head with a smooth RBF space warp.

Usage: python refine_solve.py <in.npz> <out.npz>

The displacement field is a sum of Gaussian RBFs centred on control points spread over the
head and neck surface; every vertex (skin, mouth cavity, eye/teeth helpers) moves with the same
smooth field, so nothing folds or pokes through. Coefficients are solved by linear least squares:
  * 468-landmark anchors match the front photo (x, z) and the 3/4 photo (yaw-projected); landmarks
    hidden under the hair (above the brows), eyelids and inner lips are left to the target fit
  * silhouette ICP: model side silhouette -> side photo profile contour,
                    model front jaw outline -> front photo jaw/cheek contour
  * zero displacement on the lower neck; ridge penalty for smoothness
Silhouette correspondences are re-picked for a few outer iterations.
"""
import sys
import numpy as np
from scipy.spatial import cKDTree
from PIL import Image, ImageDraw

d = np.load(sys.argv[1], allow_pickle=True)
V = d["V"].astype(float); n = len(V)
flat, offs, helper = d["flat"], d["offs"], d["helper"].astype(bool)
polys = [flat[offs[i]:offs[i + 1]] for i in range(len(offs) - 1)]
top, height = float(d["top"]), float(d["height"])
ab, aw, valid = d["ab"], d["aw"], [int(v) for v in d["valid"]]
PF, PQ, wq = d["PF"], d["PQ"], d["wq"]
sf, tf, sq, tq, yaw = float(d["sf"]), d["tf"], float(d["sq"]), d["tq"], float(d["yaw"])
sp, tp = float(d["sp"]), d["tp"]
C, CN = d["C"], d["CN"]
W_LM, W_Q, W_SIL, W_PIN, W_STAY, RIDGE = 1.0, 0.4, 1.2, 4.0, 0.12, 2e-3
SIGMA = height * 0.011          # ~2 cm on a 1.8 m figure

body_polys = [p for p in polys if not helper[p].any()]
R = (~helper) & (V[:, 2] > top - height * 0.22)          # head + neck skin
Ri = np.where(R)[0]
reg_polys = [p for p in body_polys if R[p].all()]

# ---------------------------------------------------------------- control points (farthest point sampling)
cand = V[Ri]
K = 420
sel = [int(np.argmax(cand[:, 2]))]
dmin = np.linalg.norm(cand - cand[sel[0]], axis=1)
for _ in range(K - 1):
    j = int(np.argmax(dmin)); sel.append(j)
    dmin = np.minimum(dmin, np.linalg.norm(cand - cand[j], axis=1))
CP = cand[sel]


def phi(X):
    d2 = ((X[:, None, :] - CP[None]) ** 2).sum(-1)
    return np.exp(-d2 / (2 * SIGMA ** 2))


z_pin = top - height * 0.20
pin = Ri[V[Ri, 2] < z_pin]
print("region", len(Ri), "controls", K, "pinned", len(pin), flush=True)

# ---------------------------------------------------------------- landmark constraints
EYE = {33, 7, 163, 144, 145, 153, 154, 155, 133, 173, 157, 158, 159, 160, 161, 246,
       263, 249, 390, 373, 374, 380, 381, 382, 362, 398, 384, 385, 386, 387, 388, 466}
INNER_LIP = {78, 191, 80, 81, 82, 13, 312, 311, 310, 415, 308, 324, 318, 402, 317, 14, 87, 178, 88, 95}
pa0 = np.einsum("kj,kjc->kc", aw, V[ab])
Z_BROW = pa0[valid.index(9), 2]
t = np.radians(yaw)
rq = d["rq"] if "rq" in d else np.array([np.cos(t), np.sin(t), 0.0])
uq = d["uq"] if "uq" in d else np.array([0.0, 0.0, 1.0])
use = [k for k, v in enumerate(valid) if v not in EYE and v not in INNER_LIP and pa0[k, 2] < Z_BROW + 0.004]
PhiA = np.stack([np.einsum("j,jk->k", aw[k], phi(V[ab[k]])) for k in use])   # (nA, K)
print("landmarks used", len(use), "of", len(valid), flush=True)


def rows_for(Phi_rows, coef, target, weight):
    """scalar constraints coef . (V + Phi c) = target  ->  rows over the 3K unknowns (c_x, c_y, c_z)."""
    A = np.concatenate([Phi_rows * coef[0], Phi_rows * coef[1], Phi_rows * coef[2]], 1) * weight[:, None]
    return A, target * weight


def lm_system():
    As, bs = [], []
    pa = pa0[use]
    w1 = np.full(len(use), W_LM)
    As_, b_ = rows_for(PhiA, (1, 0, 0), (PF[use, 0] - tf[0]) / sf - pa[:, 0], w1); As.append(As_); bs.append(b_)
    As_, b_ = rows_for(PhiA, (0, 0, -1), (PF[use, 1] - tf[1]) / sf + pa[:, 2], w1); As.append(As_); bs.append(b_)
    wqq = W_Q * np.where(wq[use] > 0.3, wq[use], 0)
    As_, b_ = rows_for(PhiA, rq, (PQ[use, 0] - tq[0]) / sq - pa @ rq, wqq); As.append(As_); bs.append(b_)
    As_, b_ = rows_for(PhiA, -uq, (PQ[use, 1] - tq[1]) / sq + pa @ uq, wqq); As.append(As_); bs.append(b_)
    return np.concatenate(As), np.concatenate(bs)


LM_A, LM_b = lm_system()
PhiP = phi(V[pin])
PIN_A = np.concatenate([np.kron(np.eye(3), PhiP)]) * W_PIN    # all three coords -> 0
PIN_b = np.zeros(len(PIN_A))
# weak stay-put prior everywhere (keeps the cranium, hidden under the hair, where it is)
stay = Ri[::3]
PhiS0 = phi(V[stay])
STAY_A = np.kron(np.eye(3), PhiS0) * W_STAY
STAY_b = np.zeros(len(STAY_A))


# ---------------------------------------------------------------- photo contours
def skin_mask(path):
    px = np.asarray(Image.open(path).convert("RGB"), dtype=np.float32) / 255.0
    return (np.abs(px - 1.0).sum(-1) > 0.15) & (px.mean(-1) > 0.2) & (px[..., 0] - px[..., 2] > 0.04)


def normals(Cp):
    tr = cKDTree(Cp); out = np.zeros_like(Cp)
    for i, c in enumerate(Cp):
        _, nn = tr.query(c, 9)
        q = Cp[nn] - Cp[nn].mean(0)
        _, ev = np.linalg.eigh(q.T @ q)
        out[i] = ev[:, 0]
    return out


fm = skin_mask(str(d["front"]))
r0 = int(PF[:, 1].min() + 0.55 * (PF[:, 1].max() - PF[:, 1].min()))
r1 = int(PF[:, 1].max() + 4)
FC = []
for y in range(r0, r1):
    xs = np.nonzero(fm[y])[0]
    if len(xs) > 20:
        FC += [(xs[0], y), (xs[-1], y)]
FC = np.array(FC, float); FCN = normals(FC)
print("front contour px", len(FC), "rows", r0, r1, flush=True)


def boundary_px(P2, shape):
    H, W = shape
    im = Image.new("L", (W, H), 0); dr = ImageDraw.Draw(im)
    for p in reg_polys:
        dr.polygon([tuple(P2[j]) for j in p], fill=255)
    msk = np.asarray(im) > 0
    inner = msk.copy()
    for dy, dx in ((1, 0), (-1, 0), (0, 1), (0, -1)):
        inner &= np.roll(np.roll(msk, dy, 0), dx, 1)
    by, bx = np.nonzero(msk & ~inner)
    return np.stack([bx, by], -1).astype(float)


def sil_system(Vc, cu, cv, scale, t2, Cp, Cn, shape, max_d, okf):
    P2 = np.stack([scale * Vc @ cu + t2[0], scale * Vc @ cv + t2[1]], -1)
    bd = boundary_px(P2, shape)
    dv, iv = cKDTree(P2[Ri]).query(bd)
    S = np.unique(Ri[iv[dv < 2.5]])
    S = S[okf(Vc, S)]
    dc, ic = cKDTree(Cp).query(P2[S])
    ok = dc < max_d
    S, ic = S[ok], ic[ok]
    if not len(S):
        return np.zeros((0, 3 * K)), np.zeros(0), 0.0, 0
    nrm = Cn[ic]
    coef = nrm[:, :1] * cu[None] + nrm[:, 1:] * cv[None]                 # (s, 3)
    PhiS = phi(V[S])
    A = np.concatenate([PhiS * coef[:, :1], PhiS * coef[:, 1:2], PhiS * coef[:, 2:]], 1) * W_SIL
    tgt = ((Cp[ic] - t2) * nrm).sum(1) / scale - (V[S] * coef).sum(1)
    return A, tgt * W_SIL, float(dc[ok].mean()), len(S)


side_shape = np.asarray(Image.open(str(d["side"]))).shape[:2]
PhiAll = None
c = np.zeros(3 * K)
Vc = V.copy()
ey = np.array([0, 1.0, 0]); ez = np.array([0, 0, -1.0]); ex = np.array([1.0, 0, 0])
zf = np.percentile(pa0[:, 2], 45)
for it in range(6):
    SA, Sb, se, sn = sil_system(Vc, ey, ez, sp, tp, C, CN, side_shape, 22.0,
                                lambda X, S: (X[S, 1] < X[Ri, 1].mean() + 0.01) & (X[S, 2] < Z_BROW + height * 0.009))
    FA, Fb, fe, fn = sil_system(Vc, ex, ez, sf, tf, FC, FCN, fm.shape, 22.0,
                                lambda X, S: X[S, 2] < zf)
    A = np.concatenate([LM_A, PIN_A, STAY_A, SA, FA]); b = np.concatenate([LM_b, PIN_b, STAY_b, Sb, Fb])
    AtA = A.T @ A + RIDGE * np.eye(3 * K)
    c = np.linalg.solve(AtA, A.T @ b)
    if PhiAll is None:
        near = np.where(V[:, 2] > top - height * 0.26)[0]
        PhiAll = phi(V[near])
    Vc = V.copy()
    Vc[near] += np.stack([PhiAll @ c[:K], PhiAll @ c[K:2 * K], PhiAll @ c[2 * K:]], -1)
    pa = np.einsum("kj,kjc->kc", aw, Vc[ab])
    ef = np.linalg.norm(np.stack([sf * pa[use, 0] + tf[0], -sf * pa[use, 2] + tf[1]], -1) - PF[use], axis=1).mean()
    print(f"iter {it}: side sil {sn} pts {se:.1f}px  front sil {fn} pts {fe:.1f}px  front lm {ef:.2f}px  "
          f"max move {np.linalg.norm(Vc - V, axis=1).max() * 1000:.1f}mm", flush=True)

np.savez(sys.argv[2], V=Vc)
print("REFINE DONE", flush=True)
