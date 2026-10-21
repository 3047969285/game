"""Find a similarity transform (scale + offset) between a reference photo and a clay render
of the generated head using MediaPipe face landmarks.

Usage: python face_align.py <photo.png> <render.png> <render_meta.json> <out.json>
render_meta.json: {"ortho_scale": s, "res": n, "center": [x, z], "right": [rx, ry, rz]}
Output: {"scale": px_per_m_in_photo, "du": .., "dv": ..} expressed for project_head.py's model
  u = W/2 + du + (P·right) * scale ;  v = top_img + dv + (zmax - P.z) * scale
plus the raw landmark points for debugging.
"""
import json, sys
import numpy as np
import mediapipe as mp
from PIL import Image

photo_p, render_p, meta_p, out_p = sys.argv[1:5]
meta = json.load(open(meta_p))

KEY = {  # MediaPipe FaceMesh indices
    "eye_l": [33, 133, 159, 145], "eye_r": [362, 263, 386, 374],
    "nose": [1, 4], "mouth": [13, 14, 61, 291], "chin": [152], "brow_l": [70, 105], "brow_r": [300, 334],
    "jaw_l": [172], "jaw_r": [397],
}


def landmarks(path):
    img = np.array(Image.open(path).convert("RGB"))
    with mp.solutions.face_mesh.FaceMesh(static_image_mode=True, max_num_faces=1, refine_landmarks=True,
                                         min_detection_confidence=0.2) as fm:
        res = fm.process(img)
    if not res.multi_face_landmarks:
        return None, img.shape
    h, w = img.shape[:2]
    lm = res.multi_face_landmarks[0].landmark
    pts = {k: np.mean([[lm[i].x * w, lm[i].y * h] for i in idx], 0) for k, idx in KEY.items()}
    return pts, img.shape


ph, ph_shape = landmarks(photo_p)
rd, rd_shape = landmarks(render_p)
print("photo landmarks", ph is not None, "render landmarks", rd is not None)
if ph is None or rd is None:
    json.dump({"ok": False}, open(out_p, "w"))
    sys.exit(0)

keys = list(KEY)
A = np.array([rd[k] for k in keys])  # render pixels
B = np.array([ph[k] for k in keys])  # photo pixels
# render pixel -> world (h along `right`, z)
n = meta["res"]; s = meta["ortho_scale"]; cx, cz = meta["center"]
wh = cx + (A[:, 0] - n / 2) * s / n
wz = cz - (A[:, 1] - n / 2) * s / n
# photo pixel = k * world + t  (separately for u from h and v from -z; shared k)
M = np.zeros((2 * len(keys), 3)); y = np.zeros(2 * len(keys))
M[0::2, 0] = wh; M[0::2, 1] = 1; y[0::2] = B[:, 0]
M[1::2, 0] = -wz; M[1::2, 2] = 1; y[1::2] = B[:, 1]
(k, tu, tv), *_ = np.linalg.lstsq(M, y, rcond=None)
resid = M @ np.array([k, tu, tv]) - y
print("scale px/m", round(k, 2), "rms px", round(float(np.sqrt((resid ** 2).mean())), 2))
json.dump({"ok": True, "k": float(k), "tu": float(tu), "tv": float(tv), "rms": float(np.sqrt((resid ** 2).mean())),
           "photo": {kk: list(map(float, v)) for kk, v in ph.items()},
           "render": {kk: list(map(float, v)) for kk, v in rd.items()}}, open(out_p, "w"), indent=1)
