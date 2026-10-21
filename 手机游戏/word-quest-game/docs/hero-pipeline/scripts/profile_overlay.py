import json, sys
from PIL import Image, ImageDraw
d = json.load(open(sys.argv[2])); im = Image.open(sys.argv[1]).convert("RGB"); dr = ImageDraw.Draw(im)
for k, c in (("contour", (0, 200, 0)), ("base", (0, 0, 255)), ("model", (255, 0, 0))):
    for x, y in d[k]:
        dr.ellipse((x - 2, y - 2, x + 2, y + 2), fill=c)
im.save(sys.argv[3])
