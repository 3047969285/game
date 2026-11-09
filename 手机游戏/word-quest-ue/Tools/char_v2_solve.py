#!/usr/bin/env python3
"""Claude · solve the v2 face blend weights from MetaHuman's own face tracker.

Saved/CharV2/landmarks.json (char_v2.py CHARV2_MODE=track) holds the contour points of the reference
views and of every preset render. Each shape is Procrustes-aligned to the reference (translation,
scale, rotation removed), then the reference is fitted as a convex combination of the presets
(non-negative least squares with a sum-to-one row). The face model is linear in its coefficients and
the views are near-orthographic portraits, so blending coefficients with these weights approximates
blending the shapes.

  ~/.local/share/hunyuan3d/.venv/bin/python Tools/char_v2_solve.py me2026 male
  ~/.local/share/hunyuan3d/.venv/bin/python Tools/char_v2_solve.py lin female
  optional 3rd arg: comma-separated candidate pool (default: every surveyed preset). Keep the pool to
  young adults — the elderly presets carry sagging and wrinkles that a landmark fit cannot see.

Writes face_blend into Saved/CharV2/<id>_blend.json and a ranking to Saved/CharV2/<id>_solve.txt.
"""
import json
import sys
from pathlib import Path

import numpy as np
from scipy.optimize import nnls

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "Saved/CharV2"
VIEWS = {"front": 1.0, "q34": 0.5}     # the q34 camera angle differs a little from the sheets
MAX_PRESETS = 4                        # a small blend stays a plausible face


def shape(entry, names):
    pts = []
    for n in names:
        pts += entry["curves"][n]
    return np.asarray(pts, float)


def align(x, ref):
    """Similarity-align x onto ref (both Nx2) and return the aligned, unit-scale x."""
    x = x - x.mean(0)
    r = ref - ref.mean(0)
    x /= np.linalg.norm(x)
    r /= np.linalg.norm(r)
    u, _, vt = np.linalg.svd(x.T @ r)
    return x @ (u @ vt)


def solve(cid, who, pool=None):
    lm = json.loads((OUT / "landmarks.json").read_text())
    presets = sorted({k.rsplit("_", 1)[0] for k in lm if not k.startswith("ref_")})
    if pool:
        presets = [p for p in presets if p in pool]
    cols, target, rows_used = [], [], []
    for view, w in VIEWS.items():
        ref = lm.get(f"ref_{who}_{view}")
        if not ref or not ref["curves"]:
            print(f"no tracked reference for {who} {view}; skipped")
            continue
        names = [n for n in sorted(ref["curves"])
                 if all(len(lm.get(f"{p}_{view}", {}).get("curves", {}).get(n, [])) == len(ref["curves"][n])
                        for p in presets)]
        r = shape(ref, names)
        r = (r - r.mean(0)) / np.linalg.norm(r - r.mean(0))
        target.append(w * r.ravel())
        cols.append(np.stack([w * align(shape(lm[f"{p}_{view}"], names), r).ravel() for p in presets], 1))
        rows_used.append(f"{view}: {len(names)} curves, {sum(len(ref['curves'][n]) for n in names)} points")
    if not cols:
        raise SystemExit("nothing to fit")
    a = np.vstack(cols)
    b = np.concatenate(target)

    def fit(idx):
        big = 10.0 * np.abs(a).max()
        aa = np.vstack([a[:, idx], big * np.ones(len(idx))])
        bb = np.append(b, big)
        wts, _ = nnls(aa, bb)
        return wts, float(np.linalg.norm(a[:, idx] @ wts - b))

    single = sorted((float(np.linalg.norm(a[:, i] - b)), presets[i]) for i in range(len(presets)))
    wts, res = fit(list(range(len(presets))))
    keep = [i for i in np.argsort(-wts)[:MAX_PRESETS] if wts[i] > 1e-3]
    wts_k, res_k = fit(keep)
    blend = {presets[i]: round(float(w), 4) for i, w in zip(keep, wts_k) if w > 1e-3}
    total = sum(blend.values())
    blend = {k: round(v / total, 4) for k, v in sorted(blend.items(), key=lambda kv: -kv[1])}

    spec_path = OUT / f"{cid}_blend.json"
    spec = json.loads(spec_path.read_text())
    spec["face_blend"] = blend
    spec["_solve"] = {"residual_all": round(res, 5), "residual_kept": round(res_k, 5),
                      "best_single": [single[0][1], round(single[0][0], 5)], "rows": rows_used}
    spec_path.write_text(json.dumps(spec, indent=2, ensure_ascii=False))
    report = [f"{cid} ({who})", *rows_used, f"blend: {blend}",
              f"residual: blend {res_k:.5f} | all presets {res:.5f} | best single {single[0][1]} {single[0][0]:.5f}",
              "single-preset distance ranking:"] + [f"  {d:.5f}  {p}" for d, p in single]
    (OUT / f"{cid}_solve.txt").write_text("\n".join(report) + "\n")
    print("\n".join(report[:5]))


if __name__ == "__main__":
    solve(sys.argv[1], sys.argv[2], sys.argv[3].split(",") if len(sys.argv) > 3 else None)
