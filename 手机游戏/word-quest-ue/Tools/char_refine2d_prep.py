#!/usr/bin/env python3
"""Claude · character pipeline: 2D displacement field for char_refine_2d.py.

The nearest-surface refinement (char_refine_landmarks.py) cannot move features *along* the surface
(eye opening, mouth width, jaw taper), which is where the conformed MetaHuman drifts back toward its
template. This compares MediaPipe's 468 landmarks on the MHC front render and on the target-mesh front
render (same orthographic camera, Saved/Compare/<id>/capture.json) and writes, per landmark, the
MHC position and the target-minus-MHC displacement in UE world cm (x, z) on the front image plane.

Usage: python3 Tools/char_refine2d_prep.py <id>      (uses the hunyuan3d venv for MediaPipe)
Writes Saved/Compare/<id>/refine2d.json and prints the mean displacement.
"""
import json
import os
import re
import subprocess
import sys
from pathlib import Path

import numpy as np

ROOT = Path(__file__).resolve().parents[1]
WORK = Path.home() / ".local/share/hunyuan3d/work"
VENV_PY = Path.home() / ".local/share/hunyuan3d/.venv/bin/python"
OUTLIER_CM = 2.5


def detect(png: Path) -> np.ndarray:
    out = png.with_suffix(".lm.json")
    subprocess.run([str(VENV_PY), str(WORK / "landmarks468.py"), str(png), str(out)],
                   stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, check=False)
    pts = json.loads(out.read_text()) if out.exists() else None
    out.unlink(missing_ok=True)
    if not pts:
        raise SystemExit(f"no landmarks in {png}")
    return np.array(pts, float)[:468, :2]


def main(cid: str) -> None:
    folder = ROOT / "Saved" / "Compare" / cid
    cap = json.loads((folder / "capture.json").read_text())
    front = cap["views"]["front"]
    loc = dict(re.findall(r"([xyz]): (-?[\d.]+)", front["location"]))   # "<Struct 'Vector' {x: .., y: .., z: ..}>"
    cx, cz = float(loc["x"]), float(loc["z"])
    s = front["ortho_width"] / cap["resolution"][0]
    half = cap["resolution"][0] / 2

    def world(px):          # front camera: u -> +x, v -> -z (verified against the target landmarks)
        return np.stack([cx + (px[:, 0] - half) * s, cz - (px[:, 1] - half) * s], 1)

    mh, tg = world(detect(folder / "front.png")), world(detect(folder / "target_front.png"))
    disp = tg - mh
    ok = np.linalg.norm(disp, axis=1) < OUTLIER_CM
    data = {"id": cid, "points": mh[ok].tolist(), "disp": disp[ok].tolist(), "cm_per_px": s,
            "mean_cm": float(np.linalg.norm(disp[ok], axis=1).mean()), "kept": int(ok.sum())}
    (folder / "refine2d.json").write_text(json.dumps(data))
    print(f"REFINE2D_PREP {cid}: kept {ok.sum()}/468, mean {data['mean_cm']:.3f} cm "
          f"({data['mean_cm'] / s:.2f} px)")


if __name__ == "__main__":
    main(sys.argv[1] if len(sys.argv) > 1 else "me2026")
