"""MediaPipe FaceMesh: write the 468 landmark pixel positions of one image to json ([] if none).
Usage: python landmarks468.py <image> <out.json>"""
import json, sys
import numpy as np
import mediapipe as mp
from PIL import Image

img = np.array(Image.open(sys.argv[1]).convert("RGB"))
with mp.solutions.face_mesh.FaceMesh(static_image_mode=True, max_num_faces=1, refine_landmarks=False,
                                     min_detection_confidence=0.2) as fm:
    res = fm.process(img)
out = []
if res.multi_face_landmarks:
    h, w = img.shape[:2]
    out = [[p.x * w, p.y * h] for p in res.multi_face_landmarks[0].landmark]
json.dump(out, open(sys.argv[2], "w"))
print("landmarks", len(out))
