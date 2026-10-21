"""Compose a reference-vs-render comparison sheet.

Top row: reference head views (headviews/<who>_<front|q34|left|back>.png).
Bottom row: lookdev renders (fit/<who>_look_<front|q34|side|back>.png).

Usage: python compare_sheet.py <who> <work_dir> <output.png> [tile]
"""
import os
import sys
from PIL import Image

WHO, WORK, OUT = sys.argv[1], sys.argv[2], sys.argv[3]
TILE = int(sys.argv[4]) if len(sys.argv) > 4 else 512
VIEWS = (("front", os.path.join(WORK, "headviews", f"{WHO}_front.png")),
         ("q34", os.path.join(WORK, "headviews", f"{WHO}_q34.png")),
         ("side", os.path.join(WORK, "headviews", f"{WHO}_left.png")),
         ("back", os.path.join(WORK, "headviews", f"{WHO}_back.png")))


def on_white(path, tile):
    im = Image.open(path).convert("RGBA")
    bg = Image.new("RGBA", im.size, (255, 255, 255, 255))
    bg.alpha_composite(im)
    return bg.convert("RGB").resize((tile, tile), Image.LANCZOS)


canvas = Image.new("RGB", (TILE * 4, TILE * 2), "white")
for i, (name, ref) in enumerate(VIEWS):
    if os.path.exists(ref):
        canvas.paste(on_white(ref, TILE), (TILE * i, 0))
    look = os.path.join(WORK, "fit", f"{WHO}_look_{name}.png")
    if os.path.exists(look):
        canvas.paste(on_white(look, TILE), (TILE * i, TILE))
canvas.save(OUT)
print("saved", OUT, canvas.size)
