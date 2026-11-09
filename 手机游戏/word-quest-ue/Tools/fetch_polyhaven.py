#!/usr/bin/env python3
"""Claude · textbook scenes: download the Poly Haven (CC0) assets listed in Content/Data/memory/kit_assets.json.

Models  -> SourceArt/PolyHaven/models/<id>/   glTF 2k (+ .bin + textures, folder layout kept so UE Interchange
                                               imports PBR materials automatically)
Textures-> SourceArt/PolyHaven/textures/<id>/ 2k diffuse / nor_gl / arm (AO-rough-metal) jpg
HDRIs   -> SourceArt/PolyHaven/hdris/<id>.hdr 4k
Writes SourceArt/PolyHaven/MANIFEST.json (id, type, files, licence CC0, source URL). Idempotent: existing files are skipped.

Usage: python3 Tools/fetch_polyhaven.py [--only models|textures|hdris]
"""
import argparse
import json
import os
import sys
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
KITS = ROOT / "Content" / "Data" / "memory" / "kit_assets.json"
OUT = ROOT / "SourceArt" / "PolyHaven"
API = "https://api.polyhaven.com"
UA = {"User-Agent": "WordQuest-asset-fetch/1.0"}


def get_json(url):
    with urllib.request.urlopen(urllib.request.Request(url, headers=UA), timeout=60) as r:
        return json.load(r)


def download(url, dest: Path):
    if dest.exists() and dest.stat().st_size > 0:
        return 0
    dest.parent.mkdir(parents=True, exist_ok=True)
    tmp = dest.with_suffix(dest.suffix + ".part")
    with urllib.request.urlopen(urllib.request.Request(url, headers=UA), timeout=300) as r, open(tmp, "wb") as fh:
        while chunk := r.read(1 << 20):
            fh.write(chunk)
    tmp.rename(dest)
    return dest.stat().st_size


def fetch_model(aid):
    files = get_json(f"{API}/files/{aid}")
    fmt = "gltf" if "gltf" in files else "fbx"          # a few models ship only as fbx/blend
    g = files[fmt]["2k"][fmt]
    base = OUT / "models" / aid
    got = [download(g["url"], base / f"{aid}_2k.{fmt}")]
    for rel, inc in g.get("include", {}).items():
        got.append(download(inc["url"], base / rel))
    return base, sum(got)


def fetch_texture(aid):
    files = get_json(f"{API}/files/{aid}")
    base = OUT / "textures" / aid
    got = 0
    for key in ("Diffuse", "nor_gl", "arm"):
        if key in files and "2k" in files[key]:
            fmt = "jpg" if "jpg" in files[key]["2k"] else next(iter(files[key]["2k"]))
            got += download(files[key]["2k"][fmt]["url"], base / f"{aid}_{key.lower()}_2k.{fmt}")
    return base, got


def fetch_hdri(aid):
    files = get_json(f"{API}/files/{aid}")
    dest = OUT / "hdris" / f"{aid}_4k.hdr"
    return dest, download(files["hdri"]["4k"]["hdr"]["url"], dest)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--only", choices=["models", "textures", "hdris"])
    args = ap.parse_args()
    kits = json.loads(KITS.read_text(encoding="utf-8"))
    models = sorted({v["polyhaven"] for v in kits["kits"].values() if v.get("polyhaven")} | set(kits.get("clutter_polyhaven", [])))
    textures = sorted(set(kits.get("textures_polyhaven", {}).values()))
    hdris = sorted({v for v in kits.get("hdris_polyhaven", {}).values() if v})
    manifest_path = OUT / "MANIFEST.json"
    manifest = json.loads(manifest_path.read_text()) if manifest_path.exists() else {}
    jobs = [("models", models, fetch_model), ("textures", textures, fetch_texture), ("hdris", hdris, fetch_hdri)]
    total = 0
    for kind, ids, fn in jobs:
        if args.only and args.only != kind:
            continue
        for aid in ids:
            try:
                path, n = fn(aid)
                total += n
                manifest[aid] = {"type": kind, "path": str(path.relative_to(ROOT)), "licence": "CC0",
                                 "source": f"https://polyhaven.com/a/{aid}"}
                print(f"[{kind}] {aid}: {n // 1024} KB new", flush=True)
            except Exception as e:  # noqa: BLE001
                print(f"[{kind}] {aid}: FAILED {e}", flush=True)
    OUT.mkdir(parents=True, exist_ok=True)
    manifest_path.write_text(json.dumps(manifest, indent=1, ensure_ascii=False))
    print(f"POLYHAVEN DONE {total / 1e6:.1f} MB new, {len(manifest)} assets in manifest")


if __name__ == "__main__":
    sys.exit(main())
