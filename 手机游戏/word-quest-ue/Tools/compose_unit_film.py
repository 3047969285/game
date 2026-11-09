#!/usr/bin/env python3
"""Claude · showcase film: compose rendered shots + original narration into a shareable MP4 (H.264 + AAC, 24 fps).

Input : Saved/Film/unitNN/shots_section_{a,b,c}.json + frame folders (Tools/render_unit_film.py)
        Saved/Film/unitNN/plan.json + narration/*.wav            (Tools/film_narration.py)
Output: Docs/qa/demo/unitNN_showcase.mp4

Timeline: prologue lines over the "MEMORY RECALL" title, a card per text with its line, every shot with the scene
title and the scene's narration revealed word by word as cold-light memory text, memory transitions between shots
(dissolve through a scan line with a slight chromatic split), an outro card. Audio: narration placed on the same
timeline over a very quiet synthesized ambient pad. No textbook prose (see film_narration.py).
Video is written with OpenCV, audio as WAV, then Tools/mux_av.swift (AVFoundation) muxes them.

Usage: <venv>/python Tools/compose_unit_film.py [unit]
"""
import json
import os
import math
import subprocess
import sys
import wave
from pathlib import Path

import cv2
import numpy as np
from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parents[1]
UNIT = int(sys.argv[1]) if len(sys.argv) > 1 else 1
FILM = ROOT / "Saved" / "Film" / f"unit{UNIT:02d}"
OUT = ROOT / "Docs" / "qa" / "demo" / (os.environ.get("COMPOSE_OUT") or f"unit{UNIT:02d}_showcase.mp4")
PLAN_NAME = os.environ.get("COMPOSE_PLAN", "plan.json")
FPS, W, H, SR = 24, 1920, 1080, 22050
INK, ACCENT, WARM, VOID = (236, 237, 229), (184, 209, 213), (255, 217, 176), (4, 6, 11)
TRANS = 14


def font(size, mono=False):
    # PingFang first for text: it covers Latin and CJK (SF has no CJK glyphs -> tofu boxes in the title)
    cands = (["/System/Library/Fonts/SFNSMono.ttf", "/System/Library/Fonts/Menlo.ttc"] if mono else
             ["/System/Library/Fonts/PingFang.ttc", "/System/Library/Fonts/SFNS.ttf"])
    for p in cands:
        try:
            return ImageFont.truetype(p, size)
        except OSError:
            continue
    return ImageFont.load_default()


def wav_samples(rel):
    with wave.open(str(ROOT / rel)) as w:
        return np.frombuffer(w.readframes(w.getnframes()), np.int16).astype(np.float32) / 32768.0


def wrap(d, text, f, width):
    lines, cur = [], ""
    for word in text.split():
        t = (cur + " " + word).strip()
        if d.textlength(t, font=f) > width and cur:
            lines.append(cur)
            cur = word
        else:
            cur = t
    return lines + [cur] if cur else lines


def memory_text(im, text, reveal, alpha, y_center, size=40):
    """Word-by-word cold-light text: revealed words full, the next one fading in, a faint glow under it."""
    d = ImageDraw.Draw(im)
    f = font(size)
    lines = wrap(d, text, f, W * 0.62)
    words = text.split()
    shown = reveal * len(words)
    glow = Image.new("RGBA", im.size, (0, 0, 0, 0))
    gd = ImageDraw.Draw(glow)
    ov = Image.new("RGBA", im.size, (0, 0, 0, 0))
    od = ImageDraw.Draw(ov)
    y = y_center - len(lines) * size * 0.7
    k = 0
    for line in lines:
        x = W / 2 - d.textlength(line, font=f) / 2
        for word in line.split():
            a = max(0.0, min(1.0, shown - k)) * alpha
            if a > 0:
                od.text((x, y), word, font=f, fill=INK + (int(235 * a),))
                gd.text((x, y), word, font=f, fill=ACCENT + (int(140 * a),))
            x += d.textlength(word + " ", font=f)
            k += 1
        y += size * 1.4
    from PIL import ImageFilter
    glow = glow.filter(ImageFilter.GaussianBlur(9))
    return Image.alpha_composite(Image.alpha_composite(im, glow), ov)


_YY, _XX = np.mgrid[0:H, 0:W].astype(np.float32)
_VIGNETTE = (1.0 - 0.38 * (((_XX - W / 2) / (W / 2)) ** 2 + ((_YY - H / 2) / (H / 2)) ** 2) ** 1.4).clip(0.45, 1.0)[..., None]
_BAR = int((H - W / 2.39) / 2)                           # 2.39:1 letterbox
_RNG = np.random.default_rng(7)


def memory_grade(img_bgr):
    """Remembered-past look on the rendered plate: lift + slight desaturation, cool highlights / warm shadows,
    soft vignette, fine moving grain, 2.39:1 bars. Captions are drawn after this, so they stay crisp."""
    f = img_bgr.astype(np.float32) / 255.0
    lum = f @ np.array([0.114, 0.587, 0.299], np.float32)
    f = f * 0.82 + lum[..., None] * 0.18                                   # 18% desaturation
    hi = np.clip((lum - 0.45) / 0.55, 0, 1)[..., None]
    lo = np.clip((0.4 - lum) / 0.4, 0, 1)[..., None]
    f = f + hi * np.array([0.035, 0.012, -0.02], np.float32) + lo * np.array([-0.012, 0.0, 0.018], np.float32)  # BGR
    f = 0.03 + f * 0.95                                                     # gentle lift (memory haze)
    f = f * _VIGNETTE
    f = f + _RNG.normal(0, 0.012, (H, W, 1)).astype(np.float32)             # grain
    out = (np.clip(f, 0, 1) * 255).astype(np.uint8)
    out[:_BAR] = 0
    out[H - _BAR:] = 0
    return out


def frame_with(img_bgr, title=None, tag=None, line=None, reveal=0.0, alpha=1.0, scene_alpha=1.0):
    im = Image.fromarray(cv2.cvtColor(img_bgr, cv2.COLOR_BGR2RGB)).convert("RGBA")
    ov = Image.new("RGBA", im.size, (0, 0, 0, 0))
    d = ImageDraw.Draw(ov)
    for i in range(140):                                    # soft vignette at the bottom for legibility
        d.line([(0, H - i), (W, H - i)], fill=(4, 6, 11, int(150 * (1 - i / 140) ** 2 * scene_alpha)))
    a = int(255 * scene_alpha)
    if title:
        d.line([(80, H - _BAR + 18), (220, H - _BAR + 18)], fill=ACCENT + (a,), width=2)
        d.text((80, H - _BAR + 30), title, font=font(34), fill=INK + (int(a * 0.9),))
    if tag:
        d.text((W - 80, H - _BAR + 38), tag, font=font(20, mono=True), fill=ACCENT + (int(a * 0.6),), anchor="ra")
    im = Image.alpha_composite(im, ov)
    if line:
        im = memory_text(im, line, reveal, alpha, H - _BAR - 120)
    return cv2.cvtColor(np.asarray(im.convert("RGB")), cv2.COLOR_RGB2BGR)


def card(lines, scan=0.0):
    im = Image.new("RGB", (W, H), VOID)
    d = ImageDraw.Draw(im)
    y = H // 2 - 50 * len(lines)
    for text, size, col, mono in lines:
        d.text((W // 2, y), text, font=font(size, mono), fill=col, anchor="mm")
        y += int(size * 1.7)
    if scan > 0:
        sy = int(H * scan)
        d.line([(0, sy), (W, sy)], fill=ACCENT, width=2)
    return cv2.cvtColor(np.asarray(im), cv2.COLOR_RGB2BGR)


def transition(a, b, n=TRANS):
    out = []
    for i in range(n):
        t = (i + 1) / (n + 1)
        f = cv2.addWeighted(a, 1 - t, b, t, 0)
        sy = int(H * t)
        f[max(0, sy - 1):sy + 1, :] = (213, 209, 184)
        shift = int(6 * math.sin(math.pi * t))
        if shift:
            f[:, :, 2] = np.roll(f[:, :, 2], shift, axis=1)
            f[:, :, 0] = np.roll(f[:, :, 0], -shift, axis=1)
        out.append(f)
    return out


class Timeline:
    def __init__(self, path):
        self.vw = cv2.VideoWriter(str(path), cv2.VideoWriter_fourcc(*"avc1"), FPS, (W, H))
        if not self.vw.isOpened():
            self.vw = cv2.VideoWriter(str(path), cv2.VideoWriter_fourcc(*"mp4v"), FPS, (W, H))
        self.frames = 0
        self.clips = []                                      # (start_frame, samples)

    def write(self, f):
        self.vw.write(f)
        self.frames += 1

    def say(self, rel, delay=0.0):
        self.clips.append((self.frames + int(delay * FPS), wav_samples(rel)))

    def audio(self, path):
        n = int(self.frames / FPS * SR) + SR
        t = np.arange(n) / SR
        # ambient pad: soft A-minor-add9 chord, slow swell, very quiet under the voice
        pad = sum(0.012 * np.sin(2 * np.pi * f * t + p) for f, p in ((110, 0), (164.8, 1), (220, 2), (246.9, 3), (329.6, 4)))
        pad *= 0.6 + 0.4 * np.sin(2 * np.pi * t / 23.0)
        pad *= np.minimum(1, t / 4) * np.minimum(1, (t[-1] - t) / 4)
        mix = pad.astype(np.float32)
        for start, s in self.clips:
            i = int(start / FPS * SR)
            j = min(n, i + len(s))
            mix[i:j] += s[: j - i] * 0.9
        mix = np.clip(mix, -1, 1)
        with wave.open(str(path), "w") as w:
            w.setnchannels(1)
            w.setsampwidth(2)
            w.setframerate(SR)
            w.writeframes((mix * 32767).astype(np.int16).tobytes())

    def close(self):
        self.vw.release()


def main():
    plan = json.loads((FILM / PLAN_NAME).read_text())
    shots = [x for sec in ("section_a", "section_b", "section_c") if (FILM / f"shots_{sec}.json").exists()
             for x in json.loads((FILM / f"shots_{sec}.json").read_text())]
    scene_json = json.loads((ROOT / f"Content/Data/memory/textbook_scenes/unit{UNIT:02d}.json").read_text())
    titles = {a["section"]: a["title"] for a in scene_json["articles"]}
    names = {"section_a": "TEXT A", "section_b": "TEXT B", "section_c": "STORIES OF CHINA"}
    OUT.parent.mkdir(parents=True, exist_ok=True)
    silent = OUT.with_name(OUT.stem + "_video.mp4")
    tl = Timeline(silent)

    # prologue: title with a slow scan, the old man's three lines appear one by one
    title = [("MEMORY RECALL", 30, ACCENT, True), ("回溯记忆", 92, INK, False), (f"DESTINATION: 2026  ·  UNIT {UNIT}", 26, ACCENT, True)]
    for _ in range(FPS):
        tl.write(card([]))
    for line in plan["intro"]:
        n = int((line["seconds"] + 0.7) * FPS)
        tl.say(line["wav"], 0.2)
        for i in range(n):
            base = card(title, scan=(tl.frames % (FPS * 6)) / (FPS * 6))
            tl.write(frame_with(base, line=line["text"], reveal=min(1, i / max(1, n - 12)), alpha=min(1, i / 8, (n - i) / 8)))
    prev, section, scene_seen = card(title), None, set()
    for s in shots:
        frames = sorted((FILM / s["folder"]).glob("frame_*.png"))
        if not frames:
            continue
        if s["section"] != section:
            section = s["section"]
            cl = plan["cards"][section]
            c = card([(names.get(section, section), 30, ACCENT, True), (titles.get(section, ""), 66, INK, False)])
            for f in transition(prev, c):
                tl.write(f)
            n = int((cl["seconds"] + 1.2) * FPS)
            tl.say(cl["wav"], 0.3)
            for i in range(n):
                tl.write(frame_with(c, line=cl["text"], reveal=min(1, i / max(1, n - 16)), alpha=min(1, i / 8, (n - i) / 8)))
            prev = c
        imgs = [memory_grade(cv2.resize(cv2.imread(str(p)), (W, H))) for p in frames]
        for f in transition(prev, imgs[0]):
            tl.write(f)
        sc = plan["scenes"][s["scene"]]
        first = s["scene"] not in scene_seen
        if first:
            scene_seen.add(s["scene"])
            tl.say(sc["wav"], 0.5)
            st = {"start": tl.frames + int(0.5 * FPS), "len": int(sc["seconds"] * FPS)}
            s_state = st
        n = len(imgs)
        for k, img in enumerate(imgs):
            el = tl.frames - s_state["start"]
            reveal = min(1, max(0, el / max(1, s_state["len"])))
            a = min(1.0, max(0, el / 8), max(0, (s_state["start"] + s_state["len"] + int(1.2 * FPS) - tl.frames) / 10))
            tl.write(frame_with(img, title=sc["title"], tag=f"{s['scene']} · {s['shot']}", line=sc["text"],
                                reveal=reveal, alpha=max(0.0, a), scene_alpha=min(1, k / 8, (n - 1 - k) / 8)))
        prev = imgs[-1]
    end = card([("END OF MEMORY", 30, ACCENT, True), (f"Unit {UNIT}", 66, INK, False)])
    for f in transition(prev, end):
        tl.write(f)
    o = plan["outro"]
    tl.say(o["wav"], 0.3)
    n = int((o["seconds"] + 2.0) * FPS)
    for i in range(n):
        tl.write(frame_with(end, line=o["text"], reveal=min(1, i / max(1, n - 30)), alpha=min(1, i / 8, (n - i) / 12)))
    tl.close()
    audio = OUT.with_name(OUT.stem + "_audio.wav")
    tl.audio(audio)
    subprocess.run(["swift", str(ROOT / "Tools" / "mux_av.swift"), str(silent), str(audio), str(OUT)], check=True)
    print("FILM", OUT, round(OUT.stat().st_size / 1e6, 1), "MB", f"{tl.frames / FPS:.0f}s")


if __name__ == "__main__":
    main()
