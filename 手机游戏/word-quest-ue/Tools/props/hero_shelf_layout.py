"""Shared stocking plan for the market shelf: product boxes / bottles / cans per shelf, deterministic.

Used twice: hero_textures.py draws each product's front label into one front-elevation image at the product's
exact (x, z) footprint, and hero_market_shelf.py builds the 3D products from the same plan; the image is then
projected along Y onto the products, so every label lands on its own product front. Metres, shelf front at +Y.
"""
import random

W, D, H = 2.0, 0.5, 1.8
SHELF_Z = [0.12, 0.48, 0.84, 1.2, 1.56]          # shelf top surfaces (base deck + 4 shelves)
KINDS = ("box", "bottle", "can", "bag")


def plan(seed=12):
    rnd = random.Random(seed)
    items = []
    for si, z in enumerate(SHELF_Z):
        x = -W / 2 + 0.04
        clear = (SHELF_Z[si + 1] - z - 0.06) if si + 1 < len(SHELF_Z) else 0.22
        while x < W / 2 - 0.06:
            kind = rnd.choice(KINDS)
            if kind == "box":
                w, d, h = rnd.uniform(0.09, 0.16), rnd.uniform(0.05, 0.08), rnd.uniform(0.16, min(0.28, clear))
            elif kind == "bottle":
                w = d = rnd.uniform(0.06, 0.075)
                h = rnd.uniform(0.2, min(0.3, clear))
            elif kind == "can":
                w = d = 0.066
                h = 0.12
            else:
                w, d, h = rnd.uniform(0.14, 0.2), rnd.uniform(0.06, 0.09), rnd.uniform(0.18, min(0.26, clear))
            facings = rnd.randint(2, 5)
            hue = rnd.random()
            brand = rnd.choice(("NORDA", "Mira", "BLUE PEAK", "oat & co", "SUNLEAF", "Kumo", "TERRA", "lumi",
                                "清风", "山谷", "Daily Grain", "PURE"))
            for f in range(facings):
                if x + w > W / 2 - 0.04:
                    break
                depth_rows = rnd.randint(2, 4)
                pull = rnd.uniform(0.0, 0.05) if rnd.random() < 0.3 else 0.0    # some front items pulled forward / missing
                if rnd.random() < 0.06:
                    x += w + 0.008
                    continue
                items.append({"kind": kind, "x": x + w / 2, "z": z, "w": w, "d": d, "h": h, "hue": hue,
                              "brand": brand, "rows": depth_rows, "pull": pull, "shelf": si})
                x += w + rnd.uniform(0.004, 0.012)
            x += rnd.uniform(0.01, 0.03)
    return items
