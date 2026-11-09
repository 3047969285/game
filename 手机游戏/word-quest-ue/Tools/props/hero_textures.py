#!/usr/bin/env python3
"""Printed designs for hero props (rug weave, wall calendar page): sRGB images that hero_common.pbr(image=...)
projects and bakes together with wear. Original artwork only.

Usage: <venv>/python Tools/props/hero_textures.py  ->  SourceArt/Props/Hero/designs/*.png
"""
import calendar
import math
import os
import random

import numpy as np
from PIL import Image, ImageDraw, ImageFilter

from hero_screens import CJK, SANS, font

HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(os.path.dirname(os.path.dirname(HERE)), "SourceArt", "Props", "Hero", "designs")


def rug(w=2600, h=1800, seed=7):
    """Hand-knotted look: indigo field, cream lattice, rust border, wool fibre noise, centre wear."""
    rnd = np.random.default_rng(seed)
    yy, xx = np.mgrid[0:h, 0:w].astype(np.float32)
    field = np.zeros((h, w, 3), np.float32)
    indigo, cream, rust, ink = (np.array(c, np.float32) for c in ((44, 58, 92), (226, 214, 190), (150, 74, 52), (24, 28, 40)))
    field[:] = indigo
    # lattice of diamonds inside the field
    m = 190
    u, v = (xx - w / 2) / m, (yy - h / 2) / m
    lattice = (np.abs(np.abs((u + v) % 2 - 1) - 0.5) < 0.035) | (np.abs(np.abs((u - v) % 2 - 1) - 0.5) < 0.035)
    field[lattice] = cream
    # medallion dots at lattice crossings
    dots = ((u % 1 - 0.5) ** 2 + (v % 1 - 0.5) ** 2) < 0.012
    field[dots] = rust
    # borders: outer rust band, thin cream lines, ink guard
    bx = np.minimum(xx, w - 1 - xx)
    by = np.minimum(yy, h - 1 - yy)
    edge = np.minimum(bx, by)
    field[edge < 170] = rust
    field[(edge >= 60) & (edge < 72)] = cream
    field[(edge >= 98) & (edge < 104)] = ink
    field[(edge >= 140) & (edge < 152)] = cream
    field[edge < 22] = ink
    # wool: per-knot jitter + fibre streaks along the pile direction
    knot = rnd.normal(0, 7, (h // 6 + 1, w // 6 + 1, 1)).repeat(6, 0).repeat(6, 1)[:h, :w]
    fibre = rnd.normal(0, 5, (h, w, 1)).astype(np.float32)
    img = field + knot + fibre
    # centre traffic wear: slightly lighter, less saturated
    wear = np.exp(-(((xx - w * 0.52) / (w * 0.28)) ** 2 + ((yy - h * 0.55) / (h * 0.3)) ** 2))[..., None]
    grey = img.mean(-1, keepdims=True)
    img = img * (1 - 0.18 * wear) + (grey + 18) * 0.18 * wear
    out = Image.fromarray(np.clip(img, 0, 255).astype(np.uint8))
    return out.filter(ImageFilter.GaussianBlur(0.6))


def calendar_page(w=1500, h=2000, year=2026, month=9):
    """Wall calendar, September 2026: picture on top, grid below, a few pencil marks."""
    im = Image.new("RGB", (w, h), (244, 241, 233))
    d = ImageDraw.Draw(im)
    # picture: misty campus at dawn (painted gradients + silhouettes)
    pic = Image.new("RGB", (w - 120, 880))
    pd = ImageDraw.Draw(pic)
    for y in range(880):
        t = y / 880
        pd.line([(0, y), (w, y)], fill=(int(200 - 70 * t), int(205 - 60 * t), int(214 - 40 * t)))
    rnd = random.Random(3)
    for layer, (col, base) in enumerate((((150, 158, 170), 520), ((104, 112, 124), 610), ((62, 68, 78), 700))):
        x = 0
        while x < w:
            bw = rnd.randint(60, 180)
            bh = rnd.randint(60, 220) - layer * 30
            pd.rectangle([x, base - bh, x + bw, 880], fill=col)
            x += bw + rnd.randint(0, 30)
    pd.ellipse([w * 0.62, 150, w * 0.62 + 120, 270], fill=(250, 236, 214))
    pic = pic.filter(ImageFilter.GaussianBlur(1.2))
    im.paste(pic, (60, 60))
    d.text((60, 990), "SEPTEMBER", font=font(SANS, 96), fill=(36, 40, 46))
    d.text((w - 60, 1000), str(year), font=font(SANS, 70), fill=(150, 74, 52), anchor="ra")
    cw, ch, x0, y0 = (w - 120) / 7, 128, 60, 1170
    for i, name in enumerate(("MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN")):
        d.text((x0 + i * cw + 12, y0), name, font=font(SANS, 34), fill=(110, 116, 124) if i < 5 else (150, 74, 52))
    weeks = calendar.Calendar(firstweekday=0).monthdayscalendar(year, month)
    for r, wk in enumerate(weeks):
        for c, day in enumerate(wk):
            x, y = x0 + c * cw, y0 + 60 + r * ch
            d.rectangle([x, y, x + cw, y + ch], outline=(214, 210, 200), width=2)
            if day:
                d.text((x + 14, y + 10), str(day), font=font(SANS, 44), fill=(36, 40, 46) if c < 5 else (150, 74, 52))
    # pencil marks: first class circled, a note, a deadline
    def cell(day):
        for r, wk in enumerate(weeks):
            if day in wk:
                return x0 + wk.index(day) * cw, y0 + 60 + r * ch
    x, y = cell(7)
    d.ellipse([x + 4, y + 2, x + 90, y + 72], outline=(60, 70, 140), width=4)
    d.text((x + 10, y + 78), "第一节课", font=font(CJK, 28), fill=(60, 70, 140))
    x, y = cell(18)
    d.text((x + 10, y + 70), "essay due", font=font(SANS, 26), fill=(150, 74, 52))
    x, y = cell(25)
    d.line([(x + 10, y + 100), (x + cw - 14, y + 30)], fill=(90, 90, 96), width=3)
    # binding holes along the top
    for i in range(14):
        cx = 120 + i * (w - 240) / 13
        d.ellipse([cx - 9, 18, cx + 9, 36], fill=(30, 30, 32))
    return im


def chalk_layer(size, draw_fn, seed=5):
    """Chalk strokes: draw crisp, then break up with grain and dust so it reads as chalk on slate."""
    mask = Image.new("L", size, 0)
    draw_fn(ImageDraw.Draw(mask))
    rnd = np.random.default_rng(seed)
    m = np.asarray(mask, np.float32) / 255.0
    grain = rnd.uniform(0.35, 1.0, m.shape)
    m = m * grain
    dust = np.asarray(Image.fromarray((m * 255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(7)), np.float32) / 255.0
    return np.clip(m * 0.95 + dust * 0.22, 0, 1)


def blackboard(w=3600, h=1200):
    """Classroom slate after an English lesson: erased smears, today's title, word list, an underline, a sketch."""
    rnd = np.random.default_rng(21)
    slate = np.zeros((h, w, 3), np.float32) + np.array((38, 52, 46), np.float32)
    slate += rnd.normal(0, 3.5, (h, w, 1))
    # erased smears: wide soft arcs of old chalk
    smear = Image.new("L", (w, h), 0)
    sd = ImageDraw.Draw(smear)
    for i in range(26):
        x, y = rnd.uniform(0, w), rnd.uniform(0, h)
        sd.ellipse([x - 260, y - 60, x + 260, y + 60], fill=int(rnd.uniform(20, 55)))
    smear = np.asarray(smear.filter(ImageFilter.GaussianBlur(40)), np.float32)[..., None] / 255.0
    slate = slate * (1 - smear) + np.array((120, 132, 126), np.float32) * smear * 0.6 + slate * smear * 0.4

    hand = ["ChalkboardSE.ttc", "Chalkboard.ttc"]
    jitter = random.Random(4)

    def line(d, xy, text, size, rot=None):
        """Handwritten line: own layer, slight tilt and baseline drift like a hand at a board."""
        f = font(hand, size)
        box = d.textbbox((0, 0), text, font=f)
        tw, th = box[2] + 20, box[3] + 30
        layer = Image.new("L", (tw, th), 0)
        ImageDraw.Draw(layer).text((10, 10), text, font=f, fill=255)
        layer = layer.rotate(rot if rot is not None else jitter.uniform(-1.4, 1.2), resample=Image.BICUBIC, expand=True)
        d._image.paste(255, (int(xy[0]), int(xy[1] + jitter.uniform(-6, 6))), layer)

    def draw(d):
        line(d, (150, 100), "Unit 1", 130, rot=1.5)
        line(d, (150, 250), "Connection or conversation?", 104, rot=0.6)
        d.line([(150, 392), (900, 386), (1560, 380)], fill=255, width=7, joint="curve")
        words = ["scenario  n.", "convention  n.", "discrete  adj.", "absorbed  adj.", "sip  n. / v."]
        for i, wd in enumerate(words):
            line(d, (185, 470 + i * 120), "- " + wd, 82)
        line(d, (2050, 130), "connection  =/=  conversation", 90)
        d.ellipse([2150, 330, 2550, 730], outline=255, width=8)
        d.ellipse([2425, 335, 2830, 735], outline=255, width=8)
        line(d, (2240, 760), "Do we really listen?", 78, rot=-1.0)
        line(d, (2050, 960), "HW: p.15  Ex. 3, 4", 74)
        line(d, (w - 380, h - 160), "9.10", 74)

    chalk = chalk_layer((w, h), draw)[..., None]
    img = slate * (1 - chalk) + np.array((232, 236, 230), np.float32) * chalk
    return Image.fromarray(np.clip(img, 0, 255).astype(np.uint8))


def shelf_labels(ppm=1400):
    """Front elevation of the stocked market shelf: one label per product at its footprint (see hero_shelf_layout)."""
    import colorsys
    from hero_shelf_layout import H as SH, W as SW, plan
    w, h = int(SW * ppm), int(SH * ppm)
    im = Image.new("RGB", (w, h), (200, 200, 196))
    d = ImageDraw.Draw(im)

    def px(x, z):                                   # front elevation seen from +Y: +x is the viewer's left
        return (SW / 2 - x) * ppm, (SH - z) * ppm

    for it in plan():
        r, g, b = (int(255 * c) for c in colorsys.hsv_to_rgb(it["hue"], 0.42, 0.72))
        x0, y1 = px(it["x"] + it["w"] / 2, it["z"])
        x1, y0 = px(it["x"] - it["w"] / 2, it["z"] + it["h"])
        cx = (x0 + x1) / 2
        if it["kind"] == "bottle":
            d.rectangle([x0, y0, x1, y1], fill=(min(255, r + 40), min(255, g + 40), min(255, b + 40)))
            ly0, ly1 = y0 + (y1 - y0) * 0.45, y0 + (y1 - y0) * 0.8                   # wrap label band
            d.rectangle([x0, ly0, x1, ly1], fill=(244, 240, 230))
            d.rectangle([x0, ly0, x1, ly0 + 8], fill=(r, g, b))
            d.text((cx, (ly0 + ly1) / 2), it["brand"][:6], font=font(CJK + SANS, int((x1 - x0) * 0.22)), fill=(r // 2, g // 2, b // 2), anchor="mm")
        elif it["kind"] == "can":
            d.rectangle([x0, y0, x1, y1], fill=(r, g, b))
            d.rectangle([x0, y0, x1, y0 + 10], fill=(190, 194, 198))
            d.rectangle([x0, y1 - 10, x1, y1], fill=(190, 194, 198))
            d.text((cx, (y0 + y1) / 2), it["brand"][:5], font=font(CJK + SANS, int((x1 - x0) * 0.24)), fill=(250, 250, 245), anchor="mm")
        else:
            # printed carton: vertical gradient, brand band, subtitle, product picture panel, weight, badge
            for yy in range(int(y0), int(y1)):
                t = (yy - y0) / max(1, y1 - y0)
                k = 1.08 - 0.25 * t
                d.line([(x0, yy), (x1, yy)], fill=(min(255, int(r * k)), min(255, int(g * k)), min(255, int(b * k))))
            band = (y1 - y0) * 0.26
            d.rectangle([x0, y0 + band, x1, y0 + band * 1.9], fill=(246, 243, 236))
            d.text((cx, y0 + band * 1.35), it["brand"], font=font(CJK + SANS, int((x1 - x0) * 0.16)), fill=(r // 2, g // 2, b // 2), anchor="mm")
            sub = {"box": "whole grain · 全麦", "bag": "roasted · 烘焙"}[it["kind"]]
            d.text((cx, y0 + band * 2.2), sub, font=font(CJK + SANS, max(10, int((x1 - x0) * 0.07))), fill=(250, 248, 240), anchor="mm")
            pw = (x1 - x0) * 0.62
            py0, py1 = y0 + band * 2.6, y1 - band * 0.55
            for yy in range(int(py0), int(py1)):
                t = (yy - py0) / max(1, py1 - py0)
                d.line([(cx - pw / 2, yy), (cx + pw / 2, yy)], fill=(int(240 - 70 * t), int(214 - 80 * t), int(170 - 90 * t)))
            d.ellipse([x1 - (x1 - x0) * 0.3, y0 + 6, x1 - 6, y0 + (x1 - x0) * 0.24], fill=(250, 210, 80))
            d.text((x0 + 8, y1 - 34), "400g" if it["kind"] == "box" else "250g", font=font(SANS, 24), fill=(250, 250, 245))
    # shelf-edge price strips
    from hero_shelf_layout import SHELF_Z
    for z in SHELF_Z:
        _, y = px(0, z)
        d.rectangle([0, y, w, y + 0.03 * ppm], fill=(245, 245, 240))
        for k in range(14):
            xx = 40 + k * w / 14
            d.text((xx, y + 6), f"¥{(k * 7 + int(z * 10)) % 40 + 3}.{(k * 3) % 10}0", font=font(SANS, 26), fill=(200, 40, 40))
    return im




# ---------------------------------------------------------------- D28 small props (unit 1 prints)
KEYBOARD_ROWS = [
    [("esc", 1), ("1", 1), ("2", 1), ("3", 1), ("4", 1), ("5", 1), ("6", 1), ("7", 1), ("8", 1), ("9", 1), ("0", 1), ("-", 1), ("=", 1), ("back", 2)],
    [("tab", 1.5), ("q", 1), ("w", 1), ("e", 1), ("r", 1), ("t", 1), ("y", 1), ("u", 1), ("i", 1), ("o", 1), ("p", 1), ("[", 1), ("]", 1), ("\\", 1.5)],
    [("caps", 1.75), ("a", 1), ("s", 1), ("d", 1), ("f", 1), ("g", 1), ("h", 1), ("j", 1), ("k", 1), ("l", 1), (";", 1), ("'", 1), ("enter", 2.25)],
    [("shift", 2.25), ("z", 1), ("x", 1), ("c", 1), ("v", 1), ("b", 1), ("n", 1), ("m", 1), (",", 1), (".", 1), ("/", 1), ("shift", 1.75)],
    [("ctrl", 1.25), ("win", 1.25), ("alt", 1.25), ("space", 6.25), ("alt", 1.25), ("fn", 1.25), ("menu", 1.25), ("ctrl", 1.25)],
]
KEY_LEGEND = {"back": "⌫", "tab": "tab", "caps": "caps", "enter": "↵", "shift": "shift", "ctrl": "ctrl",
              "win": "◆", "alt": "alt", "fn": "fn", "menu": "≡", "space": ""}


def keyboard_labels(w=3000, h=900):
    """Laptop keycap legends; projected in XY over the whole keyboard (matches KEYBOARD_ROWS)."""
    im = Image.new("RGB", (w, h), (30, 32, 36))
    d = ImageDraw.Draw(im)
    total = sum(k[1] for k in KEYBOARD_ROWS[0])
    ux = w / total
    row_h = h / len(KEYBOARD_ROWS)
    f = font(SANS, int(row_h * 0.44))
    for r, row in enumerate(KEYBOARD_ROWS):
        y0 = r * row_h + row_h * 0.10
        y1 = (r + 1) * row_h - row_h * 0.10
        x = 0.0
        for label, units in row:
            x0 = x * ux + ux * 0.07
            x1 = (x + units) * ux - ux * 0.07
            d.rounded_rectangle((x0, y0, x1, y1), radius=row_h * 0.16, fill=(52, 55, 60), outline=(70, 74, 80), width=3)
            d.rounded_rectangle((x0 + 5, y0 + 5, x1 - 5, y0 + row_h * 0.16), radius=row_h * 0.10, fill=(62, 66, 72))
            text = KEY_LEGEND.get(label, label.upper())
            if text:
                fs = f if len(text) == 1 else font(SANS, max(12, int(row_h * 0.26)))
                bb = d.textbbox((0, 0), text, font=fs)
                d.text(((x0 + x1) / 2 - (bb[2] - bb[0]) / 2, (y0 + y1) / 2 - (bb[3] - bb[1]) / 2 - bb[1]), text,
                       font=fs, fill=(214, 216, 212))
            x += units
    return im


def qr_panel(w=900, h=1200):
    """Acrylic table sign: QR + original shop name for the campus café."""
    rnd = np.random.default_rng(11)
    im = Image.new("RGB", (w, h), (18, 24, 28))
    d = ImageDraw.Draw(im)
    d.rounded_rectangle((30, 30, w - 30, h - 30), radius=28, outline=(88, 200, 196), width=6)
    d.text((w / 2, 92), "CORNER KITCHEN", font=font(SANS, 62), fill=(236, 232, 220), anchor="mm")
    d.text((w / 2, 160), "SCAN TO ORDER  ·  TABLE 06", font=font(SANS, 30), fill=(150, 200, 198), anchor="mm")
    qx, qy, qs = 120, 250, 660
    d.rounded_rectangle((qx - 24, qy - 24, qx + qs + 24, qy + qs + 24), radius=24, fill=(242, 240, 232))
    n = 25
    cell = qs / n
    grid = rnd.random((n, n)) > 0.52
    for fy in range(7):                                   # finder patterns
        for fx in range(7):
            if fx in (0, 6) or fy in (0, 6) or (2 <= fx <= 4 and 2 <= fy <= 4):
                for yy in range(7):
                    for xx in range(7):
                        pass
    def finder(cx, cy):
        for yy in range(7):
            for xx in range(7):
                on = xx in (0, 6) or yy in (0, 6) or (2 <= xx <= 4 and 2 <= yy <= 4)
                if on:
                    grid[cy + yy, cx + xx] = True
                else:
                    grid[cy + yy, cx + xx] = False
        for yy in range(-1, 8):
            for xx in range(-1, 8):
                if 0 <= cy + yy < n and 0 <= cx + xx < n and (xx in (-1, 7) or yy in (-1, 7)):
                    grid[cy + yy, cx + xx] = False
    finder(1, 1)
    finder(n - 8, 1)
    finder(1, n - 8)
    for yy in range(n):
        for xx in range(n):
            if grid[yy, xx]:
                d.rectangle((qx + xx * cell, qy + yy * cell, qx + (xx + 1) * cell - 1, qy + (yy + 1) * cell - 1), fill=(20, 24, 26))
    d.text((w / 2, 1010), "Open 07:30 – 21:00", font=font(SANS, 30), fill=(200, 198, 190), anchor="mm")
    d.text((w / 2, 1060), "no app · no queue", font=font(CJK, 28), fill=(150, 200, 198), anchor="mm")
    return im


def payment_panel(w=1200, h=840):
    """Countertop card/contactless sign."""
    im = Image.new("RGB", (w, h), (24, 30, 40))
    d = ImageDraw.Draw(im)
    d.rounded_rectangle((24, 24, w - 24, h - 24), radius=26, outline=(120, 196, 230), width=5)
    d.text((w / 2, 130), "PAY HERE", font=font(SANS, 110), fill=(240, 238, 230), anchor="mm")
    d.text((w / 2, 225), "card · phone · watch", font=font(SANS, 40), fill=(150, 205, 228), anchor="mm")
    # contactless waves
    cx, cy = w / 2, 470
    for i, r in enumerate((52, 92, 132, 172)):
        d.arc((cx - r, cy - r, cx + r, cy + r), start=-52, end=52, fill=(140, 220, 240), width=14)
    # card glyph
    d.rounded_rectangle((w / 2 - 300, 620, w / 2 - 60, 730), radius=16, fill=(210, 215, 220))
    d.rectangle((w / 2 - 300, 650, w / 2 - 60, 668), fill=(40, 48, 58))
    d.rounded_rectangle((w / 2 + 60, 620, w / 2 + 300, 730), radius=16, fill=(120, 196, 230))
    d.text((w / 2, 790), "TAP  ·  INSERT  ·  SWIPE", font=font(SANS, 30), fill=(180, 186, 190), anchor="mm")
    return im


def coupon_face(w=900, h=550):
    im = Image.new("RGB", (w, h), (250, 246, 236))
    d = ImageDraw.Draw(im)
    d.rounded_rectangle((16, 16, w - 16, h - 16), radius=18, outline=(196, 120, 80), width=6)
    d.text((60, 70), "CAMPUS CAFÉ", font=font(SANS, 54), fill=(120, 62, 42))
    d.text((60, 170), "10% OFF", font=font(SANS, 110), fill=(146, 66, 40))
    d.text((60, 320), "any hot drink before 11:00", font=font(SANS, 34), fill=(96, 76, 62))
    d.text((60, 430), "code K7-2026  ·  one per student", font=font(SANS, 28), fill=(120, 112, 100))
    d.rounded_rectangle((640, 60, 720, 140), radius=40, fill=(146, 66, 40))
    d.text((680, 100), "☕", font=font(CJK, 44), fill=(250, 246, 236), anchor="mm")
    return im


def recipe_cover(w=800, h=1040):
    im = Image.new("RGB", (w, h), (214, 196, 166))
    d = ImageDraw.Draw(im)
    d.rectangle((0, 0, w, 120), fill=(112, 74, 52))
    d.text((w / 2, 62), "THE EVERYDAY KITCHEN", font=font(SANS, 44), fill=(240, 226, 204), anchor="mm")
    d.text((w / 2, 200), "recipes for small rooms", font=font(SANS, 30), fill=(96, 72, 54), anchor="mm")
    d.rounded_rectangle((140, 300, 660, 720), radius=30, fill=(188, 160, 128), outline=(130, 96, 70), width=5)
    d.ellipse((230, 380, 570, 620), outline=(112, 74, 52), width=10)      # pot
    d.line((250, 620, 550, 620), fill=(112, 74, 52), width=10)
    d.arc((300, 470, 520, 610), start=200, end=340, fill=(112, 74, 52), width=6)
    d.text((w / 2, 800), "36 seasonal plates", font=font(SANS, 28), fill=(96, 72, 54), anchor="mm")
    d.text((w / 2, 860), "notes · substitutions · leftovers", font=font(SANS, 22), fill=(120, 100, 80), anchor="mm")
    return im


def brochure_panels(w=1200, h=800):
    im = Image.new("RGB", (w, h), (238, 234, 222))
    d = ImageDraw.Draw(im)
    cols = [(150, 178, 160), (206, 166, 120), (120, 150, 176)]
    for i in range(3):
        x0 = i * w / 3 + 20
        x1 = (i + 1) * w / 3 - 20
        d.rounded_rectangle((x0, 20, x1, h - 20), radius=16, fill=cols[i])
        d.rounded_rectangle((x0 + 24, 60, x1 - 24, 300), radius=10, fill=(250, 248, 240))
    d.text((w / 6, 340), "OLD TOWN WALKS", font=font(SANS, 40), fill=(250, 248, 240), anchor="mm")
    d.text((w / 2, 340), "MARKET MORNINGS", font=font(SANS, 40), fill=(250, 248, 240), anchor="mm")
    d.text((5 * w / 6, 340), "RIVER AT DUSK", font=font(SANS, 40), fill=(250, 248, 240), anchor="mm")
    for i in range(3):
        d.text((i * w / 3 + w / 6, 430), "3 routes · 2 hours", font=font(SANS, 26), fill=(60, 60, 56), anchor="mm")
        d.text((i * w / 3 + w / 6, 500), "self-guided · free map", font=font(SANS, 24), fill=(60, 60, 56), anchor="mm")
    return im


def box_print(w=1200, h=800):
    im = Image.new("RGB", (w, h), (206, 198, 184))
    d = ImageDraw.Draw(im)
    d.text((70, 80), "ECHO X1", font=font(SANS, 96), fill=(48, 52, 56))
    d.text((70, 200), "SMARTPHONE · 6.1\" · 128 GB", font=font(SANS, 34), fill=(80, 84, 88))
    d.rounded_rectangle((70, 300, 430, 620), radius=24, fill=(44, 48, 54))
    d.rounded_rectangle((90, 320, 410, 600), radius=18, fill=(20, 26, 34))
    d.text((250, 460), "ECHO", font=font(SANS, 44), fill=(120, 200, 210), anchor="mm")
    d.text((70, 680), "echo devices · support: echo.example", font=font(SANS, 22), fill=(110, 104, 96))
    barcode_x = 640
    rnd = np.random.default_rng(3)
    for i in range(46):
        bw = 3 + int(rnd.random() * 7)
        if rnd.random() > 0.35:
            d.rectangle((barcode_x, 300, barcode_x + bw, 600), fill=(40, 40, 40))
        barcode_x += bw + 4
    return im


def router_leds(w=600, h=160):
    im = Image.new("RGB", (w, h), (10, 12, 14))
    d = ImageDraw.Draw(im)
    for i, color in enumerate(((90, 240, 180), (90, 240, 180), (240, 200, 90), (90, 240, 180))):
        cx = 80 + i * 120
        d.ellipse((cx - 22, h / 2 - 22, cx + 22, h / 2 + 22), fill=color)
        d.ellipse((cx - 32, h / 2 - 32, cx + 32, h / 2 + 32), outline=color, width=2)
    return im


def whiteboard(w=1800, h=1100):
    """Marker board after group work: blue/red/black handwriting, ghost of erased text, a mind map."""
    rnd = random.Random(8)
    im = Image.new("RGB", (w, h), (246, 246, 243))
    ghost = Image.new("L", (w, h), 0)
    gd = ImageDraw.Draw(ghost)
    for i in range(7):
        gd.text((rnd.randint(40, w - 500), rnd.randint(40, h - 120)), "erased notes and arrows", font=font(["Bradley Hand Bold.ttf"], 64), fill=40)
    ghost = ghost.filter(ImageFilter.GaussianBlur(6))
    im = Image.composite(Image.new("RGB", (w, h), (215, 218, 222)), im, ghost)
    d = ImageDraw.Draw(im)
    hand = ["Bradley Hand Bold.ttf", "ChalkboardSE.ttc"]
    blue, red, black = (34, 70, 160), (190, 40, 40), (30, 30, 34)
    d.text((70, 50), "Group 3 - Are we closer or further apart?", font=font(hand, 64), fill=black)
    d.ellipse([640, 370, 1160, 610], outline=blue, width=6)
    d.text((900, 490), "SCREENS", font=font(hand, 70), fill=blue, anchor="mm")
    for (x, y, t) in ((120, 260, "video calls with family"), (1250, 260, "group chats at 2 a.m."),
                      (110, 760, "phones at dinner?"), (1220, 760, "online classes")):
        d.text((x, y), t, font=font(hand, 54), fill=blue if y < 500 else red)
        d.line([(x + 250, y + (70 if y < 500 else -10)), (900 if x < 900 else 960, 380 if y < 500 else 600)], fill=black, width=4)
    d.text((80, 960), "+ connected  - attention", font=font(hand, 58), fill=red)
    d.text((1280, 960), "vote: 7 : 5", font=font(hand, 58), fill=black)
    return im.filter(ImageFilter.GaussianBlur(0.7))


def smartboard_slide(w=3000, h=1700):
    """Classroom interactive board: today's lesson slide (original wording), cool palette, page counter."""
    im = Image.new("RGB", (w, h), (242, 244, 246))
    d = ImageDraw.Draw(im)
    d.rectangle([0, 0, w, 170], fill=(28, 52, 84))
    d.text((90, 50), "College English 3 · Unit 1", font=font(SANS, 70), fill=(236, 240, 244))
    d.text((w - 90, 60), "Reading · Text A", font=font(SANS, 56), fill=(184, 209, 213), anchor="ra")
    d.text((120, 260), "Before we read", font=font(SANS, 120), fill=(28, 52, 84))
    qs = ["1. When did you last talk to someone for an hour without a screen?",
          "2. Is a quick message a conversation? Why or why not?",
          "3. Which is harder for you: connecting, or listening?"]
    for i, q in enumerate(qs):
        d.text((140, 480 + i * 150), q, font=font(SANS, 72), fill=(40, 44, 50))
    d.rounded_rectangle([140, 1000, 1500, 1460], radius=30, fill=(255, 236, 214))
    d.text((190, 1050), "Key words", font=font(SANS, 64), fill=(150, 74, 52))
    for i, wd in enumerate(("scenario", "convention", "absorbed", "discrete")):
        d.text((200 + (i % 2) * 620, 1170 + (i // 2) * 120), wd, font=font(SANS, 70), fill=(60, 44, 36))
    d.rounded_rectangle([1650, 1000, 2860, 1460], radius=30, fill=(222, 232, 240))
    d.text((1700, 1050), "Pair work · 5 min", font=font(SANS, 64), fill=(28, 52, 84))
    d.text((1700, 1180), "Share one story with", font=font(SANS, 60), fill=(40, 44, 50))
    d.text((1700, 1270), "your partner.", font=font(SANS, 60), fill=(40, 44, 50))
    d.text((w - 90, h - 90), "3 / 18", font=font(SANS, 50), fill=(120, 126, 134), anchor="ra")
    return im


def main():
    os.makedirs(OUT, exist_ok=True)
    whiteboard().save(os.path.join(OUT, "whiteboard_group.png"))
    smartboard_slide().save(os.path.join(OUT, "smartboard_slide.png"))
    shelf_labels().save(os.path.join(OUT, "shelf_labels.png"))
    for name, fn in (("rug_indigo", rug), ("calendar_2026_09", calendar_page), ("blackboard_u01", blackboard),
                     ("keyboard_labels", keyboard_labels), ("qr_panel", qr_panel), ("payment_panel", payment_panel),
                     ("coupon_face", coupon_face), ("recipe_cover", recipe_cover), ("brochure_panels", brochure_panels),
                     ("box_print", box_print), ("router_leds", router_leds)):
        p = os.path.join(OUT, f"{name}.png")
        fn().save(p)
        print("DESIGN", p)


if __name__ == "__main__":
    main()
