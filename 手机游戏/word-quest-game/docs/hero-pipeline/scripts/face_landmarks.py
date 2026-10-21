"""Detect MediaPipe face landmarks in one image; write {key: [x, y]} (pixels) or {} to json.
Usage: python face_landmarks.py <image> <out.json>"""
import json, sys
import numpy as np
import mediapipe as mp
from PIL import Image

KEY = {
    "eye_l": [33, 133, 159, 145], "eye_r": [362, 263, 386, 374],
    "nose": [1, 4], "mouth": [13, 14, 61, 291], "chin": [152], "brow_l": [70, 105], "brow_r": [300, 334],
    "jaw_l": [172], "jaw_r": [397],
}
img = np.array(Image.open(sys.argv[1]).convert("RGB"))
with mp.solutions.face_mesh.FaceMesh(static_image_mode=True, max_num_faces=1, refine_landmarks=True,
                                     min_detection_confidence=0.2) as fm:
    res = fm.process(img)
out = {}
if res.multi_face_landmarks:
    h, w = img.shape[:2]
    lm = res.multi_face_landmarks[0].landmark
    out = {k: list(map(float, np.mean([[lm[i].x * w, lm[i].y * h] for i in idx], 0))) for k, idx in KEY.items()}
json.dump(out, open(sys.argv[2], "w"))
print("landmarks", len(out))
