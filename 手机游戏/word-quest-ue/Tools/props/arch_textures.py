#!/usr/bin/env python3
"""Tileable ground surfaces the local Poly Haven set lacks: grass, sand, lunar regolith, Mars soil, dirt path.

Every layer is FFT-filtered white noise, so it is exactly periodic and tiles without seams. Each surface writes
SourceArt/Arch/<name>_{BaseColor,Normal,ARM}.png (2048^2; Normal in OpenGL convention, ARM = AO/Rough/Metal),
which Tools/make_arch_materials.py turns into MI_Arch_<name>.

Usage: <venv>/python Tools/props/arch_textures.py
"""
import os

import numpy as np
from PIL import Image

HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(os.path.dirname(os.path.dirname(HERE)), "SourceArt", "Arch")
N = 2048


def band(seed, lo, hi, aniso=(1.0, 1.0)):
    """Periodic noise with energy between spatial frequencies lo..hi (cycles per tile), unit variance."""
    rnd = np.random.default_rng(seed)
    f = np.fft.fft2(rnd.normal(size=(N, N)))
    ky = np.fft.fftfreq(N)[:, None] * N * aniso[1]
    kx = np.fft.fftfreq(N)[None, :] * N * aniso[0]
    k = np.sqrt(kx ** 2 + ky ** 2)
    mask = np.exp(-((np.log(k + 1e-6) - np.log(np.sqrt(lo * hi))) / (0.5 * np.log(hi / lo) + 1e-6)) ** 2)
    x = np.real(np.fft.ifft2(f * mask))
    return (x - x.mean()) / (x.std() + 1e-9)


def fbm(seed, octaves=((2, 6, 1.0), (6, 24, 0.5), (24, 96, 0.25), (96, 400, 0.12))):
    return sum(w * band(seed + i, lo, hi) for i, (lo, hi, w) in enumerate(octaves))


def normal_from_height(hgt, strength):
    gy, gx = np.gradient(hgt)                         # np.gradient wraps poorly; use periodic differences instead
    gx = (np.roll(hgt, -1, 1) - np.roll(hgt, 1, 1)) / 2
    gy = (np.roll(hgt, -1, 0) - np.roll(hgt, 1, 0)) / 2
    n = np.stack([-gx * strength, gy * strength, np.ones_like(hgt)], -1)       # OpenGL: +Y up in the image
    n /= np.linalg.norm(n, axis=-1, keepdims=True)
    return ((n * 0.5 + 0.5) * 255).astype(np.uint8)


def ao_from_height(hgt):
    blur = sum(np.roll(np.roll(hgt, dy, 0), dx, 1) for dy in (-6, 0, 6) for dx in (-6, 0, 6)) / 9
    return np.clip(1.0 - np.maximum(0.0, blur - hgt) * 1.8, 0.35, 1.0)


def mix(a, b, t):
    return a * (1 - t[..., None]) + b * t[..., None]


def save(name, color, hgt, rough, nstrength):
    os.makedirs(OUT, exist_ok=True)
    Image.fromarray(np.clip(color, 0, 255).astype(np.uint8)).save(os.path.join(OUT, f"{name}_BaseColor.png"))
    Image.fromarray(normal_from_height(hgt, nstrength)).save(os.path.join(OUT, f"{name}_Normal.png"))
    arm = np.stack([ao_from_height(hgt), np.clip(rough, 0, 1), np.zeros_like(hgt)], -1)
    Image.fromarray((arm * 255).astype(np.uint8)).save(os.path.join(OUT, f"{name}_ARM.png"))
    print("SURFACE", name)


def grass():
    clump = band(1, 3, 12)
    blades = band(2, 300, 900, aniso=(1.0, 0.35))        # fine streaks, slightly directional
    patches = band(3, 2, 6)
    hgt = 0.55 * blades + 0.35 * clump
    green_dark, green, dry = (np.array(c, np.float32) for c in ((48, 70, 30), (92, 122, 52), (150, 140, 86)))
    col = mix(green_dark, green, np.clip(0.5 + 0.35 * blades + 0.25 * clump, 0, 1))
    col = mix(col, dry, np.clip(0.25 * patches - 0.15 + 0.1 * band(4, 40, 160), 0, 0.55))
    save("grass", col, hgt, 0.82 + 0.08 * band(5, 20, 80), 6.0)


def sand():
    dunes = band(11, 1, 4)
    ripples = np.sin(np.linspace(0, 2 * np.pi * 60, N, endpoint=False)[None, :] + 3.0 * band(12, 2, 8)) * 0.5
    grains = band(13, 400, 1000)
    hgt = 0.6 * dunes + 0.35 * ripples + 0.25 * grains
    base, light, wet = (np.array(c, np.float32) for c in ((194, 172, 132), (222, 204, 166), (150, 130, 98)))
    col = mix(base, light, np.clip(0.5 + 0.25 * grains + 0.2 * ripples, 0, 1))
    col = mix(col, wet, np.clip(-0.4 * dunes - 0.2, 0, 0.5))
    save("sand", col, hgt, 0.9 - 0.05 * grains, 4.0)


def craters(seed, count, rmin, rmax):
    rnd = np.random.default_rng(seed)
    yy, xx = np.mgrid[0:N, 0:N].astype(np.float32)
    h = np.zeros((N, N), np.float32)
    for _ in range(count):
        cx, cy, r = rnd.uniform(0, N), rnd.uniform(0, N), rnd.uniform(rmin, rmax)
        dx = (xx - cx + N / 2) % N - N / 2                  # periodic distance -> crater wraps across the tile edge
        dy = (yy - cy + N / 2) % N - N / 2
        d = np.sqrt(dx * dx + dy * dy) / r
        h += np.where(d < 1, (d ** 2 - 1) * 0.6, 0) + np.where((d >= 0.85) & (d < 1.4), 0.25 * np.cos((d - 1.0) * 4) , 0)
    return h


def regolith():
    hgt = 0.5 * fbm(21) + craters(22, 60, 10, 90) * 0.8 + 0.3 * band(23, 500, 1000)
    grey = 118 + 22 * fbm(24) + 10 * band(25, 300, 900)
    col = np.stack([grey, grey * 0.99, grey * 0.97], -1)
    save("regolith", col, hgt, 0.95 + 0.0 * hgt, 5.0)


def mars():
    hgt = 0.6 * fbm(31) + craters(32, 25, 20, 120) * 0.5 + 0.4 * band(33, 300, 900)
    rock = np.clip(band(34, 30, 120) - 1.3, 0, 1)
    base, dark = np.array((176, 98, 58), np.float32), np.array((112, 62, 40), np.float32)
    col = mix(base, dark, np.clip(0.35 - 0.25 * fbm(35), 0, 1))
    col = mix(col, np.array((84, 64, 54), np.float32), rock * 0.8)
    save("mars", col, hgt + rock * 2, 0.9 - rock * 0.15, 5.0)


def dirt():
    hgt = 0.5 * fbm(41) + 0.5 * np.clip(band(42, 60, 200) - 0.8, 0, 2) + 0.3 * band(43, 500, 1000)
    pebbles = np.clip(band(44, 120, 300) - 1.6, 0, 1)
    base, dry = np.array((112, 90, 66), np.float32), np.array((150, 128, 98), np.float32)
    col = mix(base, dry, np.clip(0.5 + 0.3 * fbm(45), 0, 1))
    col = mix(col, np.array((168, 160, 150), np.float32), pebbles)
    save("dirt", col, hgt + pebbles * 1.5, 0.88 - pebbles * 0.2, 5.0)


if __name__ == "__main__":
    for fn in (grass, sand, regolith, mars, dirt):
        fn()
