"""Hero prop: city skyline backdrop at dusk. Kit "city_skyline", 40 x 6 x 18 m (city faces +Y).

Blender -b -P Tools/props/hero_city_skyline.py

~26 towers of varied footprint and height (set back in three rows so the silhouette layers), concrete or
dark-glass bodies (CC0 scans), rooftop plant rooms, antennas with red lamps, and window panes as one mesh per
tower: most dark reflective glass, ~30% warm lit windows (emissive) for the evening memory scenes.
"""
import os
import random
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from hero_common import OUT, cylinder, emissive, facade_panes, finish, pbr, reset, rounded_slab  # noqa: E402

W, D, H = 40.0, 6.0, 18.0
rnd = random.Random(26)

reset()
concrete = pbr("concrete", "#9C9A95", rough=0.8, metal=0.0, grain=0.05, dirt=0.4, bump=0.2,
               scan="concrete_wall_003", scan_size=0.9)   # forced perspective: texture scaled with the windows
darkbody = pbr("glassbody", "#2E3742", rough=0.25, metal=0.3, grain=0.05, dirt=0.3, bump=0.03)
roof = pbr("roofplant", "#5C5F63", rough=0.6, metal=0.5, grain=0.05, wear=0.4, dirt=0.6, bump=0.15)
glass = pbr("windowglass", "#1C2630", rough=0.08, metal=0.6, grain=0.04, dirt=0.2, bump=0.0, rough_var=0.05)
os.makedirs(os.path.join(OUT, "designs"), exist_ok=True)
lit = emissive("litwindow", os.path.join(OUT, "designs", "lamp_glow.png"), strength=2.2, base="#E8D2A8")
red = emissive("redlamp", os.path.join(OUT, "designs", "lamp_glow.png"), strength=8.0, base="#FF2A1A")

parts = []
rows = ((D / 2 - 1.2, 0.55, 0.85), (0.0, 0.75, 1.0), (-D / 2 + 1.0, 0.95, 1.0))   # (y, min h frac, max h frac)
for ri, (yc, hmin, hmax) in enumerate(rows):
    x = -W / 2 + rnd.uniform(0.0, 1.5)
    while x < W / 2 - 2.0:
        tw = rnd.uniform(2.2, 4.2)
        td = rnd.uniform(1.6, 2.4)
        th = H * rnd.uniform(hmin, hmax) * (0.55 if ri == 0 else 1.0)
        if x + tw > W / 2:
            break
        cx = x + tw / 2
        body_mat = concrete if rnd.random() < 0.55 else darkbody
        parts.append(rounded_slab("tower", tw, td, th, 0.05, 0.03, body_mat, z0=0.0, loc=(cx, yc), seg=3, edge_seg=2))
        bmin, bmax = (cx - tw / 2, yc - td / 2, 0.0), (cx + tw / 2, yc + td / 2, th)
        lit_set = {(s, f, b) for s in ("+y", "-y", "+x", "-x") for f in range(60) for b in range(30) if rnd.random() < 0.3}
        # forced perspective: a distant backdrop, so storeys are 0.55 m and bays 0.35 m -> 20-30 storey towers
        bay = 0.42 if body_mat is concrete else 0.3
        pane_w = bay * (0.6 if body_mat is concrete else 0.86)
        parts.append(facade_panes("panes", bmin, bmax, 0.55, bay, pane_w, 0.36, 0.5, glass,
                                  keep=lambda s, f, b, L=lit_set: (s, f, b) not in L))
        parts.append(facade_panes("lit", bmin, bmax, 0.55, bay, pane_w, 0.36, 0.5, lit,
                                  keep=lambda s, f, b, L=lit_set: (s, f, b) in L))
        if rnd.random() < 0.7:                       # rooftop plant room
            parts.append(rounded_slab("plant", tw * 0.4, td * 0.4, 0.5, 0.05, 0.03, roof, z0=th, loc=(cx, yc), seg=2, edge_seg=1))
        if th > H * 0.9 and rnd.random() < 0.5:      # antenna + aircraft warning lamp
            parts.append(cylinder("antenna", 0.05, 3.0, roof, loc=(cx, yc, th), seg=12))
            parts.append(cylinder("warning", 0.12, 0.2, red, loc=(cx, yc, th + 3.0), seg=16))
        x += tw + rnd.uniform(0.3, 1.8)

finish("city_skyline", parts, dims=(W, D, H), note="backdrop; city faces +Y; ~30% windows lit")
