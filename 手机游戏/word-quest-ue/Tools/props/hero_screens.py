#!/usr/bin/env python3
"""Screen images for hero props (phones, tablets, monitors): authored UI textures, emissive in UE.

Palette follows the 2090 memory look (cold blue-grey light, warm only for reminders); text is original,
never textbook prose. Usage: <venv>/python Tools/props/hero_screens.py  ->  SourceArt/Props/Hero/screens/*.png
"""
import math
import os

from PIL import Image, ImageDraw, ImageFilter, ImageFont

HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(os.path.dirname(os.path.dirname(HERE)), "SourceArt", "Props", "Hero", "screens")
FONT_DIRS = ["/System/Library/Fonts", "/System/Library/Fonts/Supplemental", "/Library/Fonts"]


def font(names, size):
    for d in FONT_DIRS:
        for n in names:
            p = os.path.join(d, n)
            if os.path.exists(p):
                try:
                    return ImageFont.truetype(p, size)
                except OSError:
                    pass
    return ImageFont.load_default()


SANS = ["SFNS.ttf", "SF-Pro.ttf", "HelveticaNeue.ttc", "Helvetica.ttc"]
CJK = ["PingFang.ttc", "Hiragino Sans GB.ttc", "STHeiti Light.ttc"]


def wallpaper(w, h):
    """Dusk-blue gradient with soft light blobs (depth without detail that fights the UI)."""
    im = Image.new("RGB", (w, h))
    px = im.load()
    for y in range(h):
        t = y / h
        r, g, b = int(14 + 30 * t), int(22 + 34 * t), int(38 + 40 * (1 - abs(t - 0.45) * 1.6))
        for x in range(w):
            px[x, y] = (r, g, b)
    glow = Image.new("RGB", (w, h), (0, 0, 0))
    d = ImageDraw.Draw(glow)
    for cx, cy, rad, col in ((0.75, 0.32, 0.42, (90, 140, 190)), (0.2, 0.7, 0.35, (60, 90, 140)),
                             (0.55, 0.9, 0.3, (150, 120, 110))):
        d.ellipse([w * (cx - rad), h * (cy - rad * 0.5), w * (cx + rad), h * (cy + rad * 0.5)], fill=col)
    glow = glow.filter(ImageFilter.GaussianBlur(w * 0.18))
    return Image.blend(im, Image.eval(glow, lambda v: v), 0.35)


def notification(im, y, title, body, when, accent=(184, 209, 213)):
    w = im.width
    card = Image.new("RGBA", im.size, (0, 0, 0, 0))
    d = ImageDraw.Draw(card)
    x0, x1, hgt = int(w * 0.05), int(w * 0.95), int(w * 0.2)
    d.rounded_rectangle([x0, y, x1, y + hgt], radius=int(w * 0.05), fill=(235, 240, 245, 52))
    d.rounded_rectangle([x0 + 40, y + 40, x0 + 130, y + 130], radius=24, fill=accent + (255,))
    d.text((x0 + 160, y + 38), title, font=font(SANS, 44), fill=(240, 242, 236, 255))
    d.text((x1 - 40, y + 38), when, font=font(SANS, 38), fill=(200, 210, 215, 200), anchor="ra")
    d.text((x0 + 160, y + 100), body, font=font(CJK + SANS, 42), fill=(225, 230, 228, 235))
    im.alpha_composite(card)


def phone_lock(w=1170, h=2532):
    im = wallpaper(w, h).convert("RGBA")
    d = ImageDraw.Draw(im)
    d.text((w / 2, h * 0.12), "Thursday, September 10", font=font(SANS, 52), fill=(236, 237, 229, 230), anchor="mm")
    d.text((w / 2, h * 0.21), "7:42", font=font(SANS, 300), fill=(236, 237, 229, 245), anchor="mm")
    notification(im, int(h * 0.55), "Messages", "妈妈：早饭在锅里，记得吃。", "now")
    notification(im, int(h * 0.55) + int(w * 0.23), "Calendar", "English class · Room 302 · 8:00", "15m",
                 accent=(255, 217, 176))
    d.rounded_rectangle([w * 0.33, h - 40, w * 0.67, h - 28], radius=6, fill=(236, 237, 229, 220))
    return im.convert("RGB")


def tablet_reader(w=1640, h=2360):
    """E-reader page: warm-paper night mode, original study notes (no textbook prose)."""
    im = Image.new("RGB", (w, h), (24, 26, 30))
    d = ImageDraw.Draw(im)
    d.text((110, 120), "Notes · Unit 1", font=font(SANS, 44), fill=(150, 162, 168))
    d.text((w - 110, 120), "9:41", font=font(SANS, 40), fill=(150, 162, 168), anchor="ra")
    d.line([(110, 200), (w - 110, 200)], fill=(60, 66, 72), width=2)
    d.text((110, 280), "Before class", font=font(SANS, 96), fill=(236, 237, 229))
    body = ["Read the passage twice. Mark every", "word you can guess from context,", "then check only the ones you could not.",
            "", "Write one sentence of your own", "with each new word. Say it aloud.", "",
            "Question for the group:", "What changed when everything became", "a screen away?"]
    y = 470
    for line in body:
        d.text((110, y), line, font=font(SANS, 58), fill=(214, 218, 212))
        y += 92
    d.rounded_rectangle([110, y + 60, w - 110, y + 300], radius=28, fill=(38, 44, 50))
    d.text((160, y + 110), "highlight", font=font(SANS, 40), fill=(255, 217, 176))
    d.text((160, y + 175), "context  ·  guess  ·  check  ·  use", font=font(SANS, 56), fill=(236, 237, 229))
    d.line([(110, h - 160), (w - 110, h - 160)], fill=(60, 66, 72), width=2)
    d.rounded_rectangle([110, h - 120, 110 + int((w - 220) * 0.37), h - 108], radius=6, fill=(184, 209, 213))
    d.text((w - 110, h - 90), "37%", font=font(SANS, 38), fill=(150, 162, 168), anchor="ra")
    return im


def monitor_desk(w=2560, h=1440):
    """Desktop with a document window and a small chat window (study evening, 2026)."""
    im = wallpaper(w, h).convert("RGBA")
    d = ImageDraw.Draw(im)
    d.rectangle([0, 0, w, 44], fill=(18, 20, 24, 235))
    d.text((24, 8), "Notes   Edit   View   Window", font=font(SANS, 26), fill=(214, 218, 212, 255))
    d.text((w - 24, 8), "Thu 21:16", font=font(SANS, 26), fill=(214, 218, 212, 255), anchor="ra")
    win = Image.new("RGBA", im.size, (0, 0, 0, 0))
    wd = ImageDraw.Draw(win)
    x0, y0, x1, y1 = 240, 140, 1700, 1250
    wd.rounded_rectangle([x0 + 10, y0 + 18, x1 + 10, y1 + 18], radius=22, fill=(0, 0, 0, 90))
    wd.rounded_rectangle([x0, y0, x1, y1], radius=22, fill=(246, 245, 240, 255))
    wd.rounded_rectangle([x0, y0, x1, y0 + 64], radius=22, fill=(226, 226, 222, 255))
    for i, c in enumerate(((236, 106, 94), (244, 190, 80), (98, 196, 98))):
        wd.ellipse([x0 + 24 + i * 34, y0 + 22, x0 + 44 + i * 34, y0 + 42], fill=c + (255,))
    wd.text(((x0 + x1) / 2, y0 + 32), "essay draft — v3", font=font(SANS, 28), fill=(80, 84, 90, 255), anchor="mm")
    lines = ["Living with screens", "", "When I was small, a call meant a voice and a", "long cord. Now my grandmother waves at me",
             "through glass every Sunday, and I still cannot", "decide whether we are closer or further apart.", "",
             "Three things I want to argue:", "1. Connection is easy; attention is not.", "2. Tools change habits faster than values.",
             "3. Choosing when to look away is a skill."]
    y = y0 + 130
    for i, ln in enumerate(lines):
        wd.text((x0 + 90, y), ln, font=font(SANS, 54 if i == 0 else 36), fill=(30, 32, 36, 255))
        y += 80 if i == 0 else 56
    wd.line([(x0 + 90, y + 6), (x0 + 92, y + 46)], fill=(40, 90, 200, 255), width=3)
    cx0, cy0 = 1780, 520
    wd.rounded_rectangle([cx0, cy0, cx0 + 620, cy0 + 620], radius=22, fill=(30, 34, 40, 240))
    wd.text((cx0 + 30, cy0 + 26), "Study group", font=font(SANS, 30), fill=(236, 237, 229, 255))
    for j, (who, msg, mine) in enumerate((("Lin", "Did you finish the reading?", False),
                                           ("me", "Almost. Paragraph 5 is hard.", True),
                                           ("Lin", "Read it out loud. It helps.", False))):
        by = cy0 + 110 + j * 150
        bx0 = cx0 + (200 if mine else 30)
        wd.rounded_rectangle([bx0, by, bx0 + 390, by + 100], radius=26,
                             fill=(70, 120, 200, 255) if mine else (60, 66, 74, 255))
        wd.text((bx0 + 24, by + 30), msg, font=font(SANS, 28), fill=(240, 242, 236, 255))
    im.alpha_composite(win)
    d = ImageDraw.Draw(im)
    d.rounded_rectangle([w / 2 - 420, h - 110, w / 2 + 420, h - 22], radius=26, fill=(40, 44, 52, 200))
    for i in range(9):
        d.rounded_rectangle([w / 2 - 380 + i * 88, h - 96, w / 2 - 316 + i * 88, h - 36], radius=14,
                            fill=(90 + i * 12, 130 + (i * 23) % 80, 170 - i * 8, 255))
    return im.convert("RGB")


def tv_documentary(w=1920, h=1080, hdri="kiara_9_dusk_4k.hdr", yaw=0.62, pitch=0.47):
    """Living-room TV frame: a photographic dusk landscape cropped from a local CC0 Poly Haven HDRI
    (SourceArt/PolyHaven/hdris), tone-mapped like broadcast video, small programme caption."""
    import cv2
    import numpy as np
    src = os.path.join(os.path.dirname(OUT), "..", "..", "PolyHaven", "hdris", hdri)
    eq = cv2.imread(os.path.normpath(src), cv2.IMREAD_ANYDEPTH | cv2.IMREAD_COLOR)[..., ::-1].astype(np.float32)
    H, W = eq.shape[:2]
    # 16:9 window around (yaw, pitch) in equirect fractions, ~70 deg horizontal field
    cw = int(W * 70 / 360)
    ch = int(cw * 9 / 16)
    x0, y0 = int(W * yaw - cw / 2), int(H * pitch - ch / 2)
    crop = eq[y0:y0 + ch, x0:x0 + cw]
    crop = np.clip(cv2.resize(crop, (w, h), interpolation=cv2.INTER_AREA), 0, None)
    lum = crop.mean(-1, keepdims=True)
    exp = 0.18 / max(1e-4, float(np.exp(np.log(lum + 1e-4).mean())))
    x = crop * exp
    x = x / (1 + x)                                  # Reinhard
    x = np.clip(x ** (1 / 2.2) * 1.08, 0, 1)
    x = np.clip(0.5 + (x - 0.5) * 1.18, 0, 1)                   # broadcast contrast
    im = Image.fromarray((x * 255).astype(np.uint8))
    d = ImageDraw.Draw(im)
    d.text((60, h - 90), "Valleys at Dusk  ·  Ep. 4", font=font(SANS, 34), fill=(236, 238, 232))
    return im


def pos_ui(w=1366, h=768):
    """Shop till: item list, total, QR / card buttons (original UI)."""
    im = Image.new("RGB", (w, h), (238, 240, 243))
    d = ImageDraw.Draw(im)
    d.rectangle([0, 0, w, 64], fill=(30, 56, 92))
    d.text((24, 16), "Campus Mart · Till 2", font=font(SANS, 30), fill=(236, 240, 244))
    d.text((w - 24, 16), "08:12", font=font(SANS, 30), fill=(236, 240, 244), anchor="ra")
    items = [("Soy milk 250ml", "3.50"), ("Egg sandwich", "8.00"), ("Notebook A5", "6.90"), ("Ballpoint pen x2", "4.00")]
    for k, (n, p_) in enumerate(items):
        y = 100 + k * 70
        d.text((40, y), n, font=font(SANS, 34), fill=(30, 34, 40))
        d.text((760, y), p_, font=font(SANS, 34), fill=(30, 34, 40), anchor="ra")
        d.line([(40, y + 56), (760, y + 56)], fill=(210, 214, 220), width=2)
    d.text((40, 420), "TOTAL", font=font(SANS, 44), fill=(30, 56, 92))
    d.text((760, 420), "¥22.40", font=font(SANS, 56), fill=(30, 56, 92), anchor="ra")
    for k, (t, c) in enumerate((("Scan QR", (46, 160, 90)), ("Card", (40, 90, 170)), ("Cash", (120, 120, 126)))):
        d.rounded_rectangle([830, 100 + k * 190, w - 40, 260 + k * 190], radius=18, fill=c)
        d.text(((830 + w - 40) / 2, 180 + k * 190), t, font=font(SANS, 48), fill=(255, 255, 255), anchor="mm")
    return im


def main():
    os.makedirs(OUT, exist_ok=True)
    for name, fn in (("phone_lock", phone_lock), ("tablet_reader", tablet_reader), ("monitor_desk", monitor_desk),
                     ("tv_documentary", tv_documentary), ("pos_ui", pos_ui)):
        p = os.path.join(OUT, f"{name}.png")
        fn().save(p)
        print("SCREEN", p)


if __name__ == "__main__":
    main()
