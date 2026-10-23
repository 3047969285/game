#!/usr/bin/env python3
"""Claude · download CC0 Poly Haven texture sets (user-approved 2026-10-23) and register them in the manifest.

For each id: 2K JPG diffuse, nor_gl, arm -> SourceArt/PolyHaven/textures/<id>/<id>_{diffuse,nor_gl,arm}_2k.jpg
(the layout Tools/import_polyhaven.py already reads), plus a MANIFEST.json entry (type textures, CC0, source URL)
and a line in Docs/licenses/third-party-assets.md. Existing files are skipped (idempotent).

Usage: python3 Tools/download_polyhaven_textures.py [id ...]     (no ids: the SETS list below)
"""
import json
import sys
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DEST = ROOT / "SourceArt/PolyHaven/textures"
MANIFEST = ROOT / "SourceArt/PolyHaven/MANIFEST.json"
LICENSES = ROOT / "Docs/licenses/third-party-assets.md"
SETS = ["leafy_grass", "sparse_grass", "coast_sand_01", "forest_ground_04", "brown_mud_dry", "rocky_terrain_02",
        "moon_01", "moon_dusted_01", "red_mud_stones", "snow_02",
        "oak_veneer_01", "walnut_veneer_02", "white_maple_veneer", "fine_grained_wood", "wood_table_worn",
        "white_plaster_02", "concrete_wall_003", "rustic_stone_wall_02", "clay_roof_tiles_02", "floor_tiles_06",
        "rusty_metal_02", "rough_linen"]
MAPS = {"Diffuse": "diffuse", "nor_gl": "nor_gl", "arm": "arm"}
UA = {"User-Agent": "WordQuestUE-asset-pipeline/1.0"}


def get(url):
    with urllib.request.urlopen(urllib.request.Request(url, headers=UA), timeout=120) as r:
        return r.read()


def main(ids):
    manifest = json.loads(MANIFEST.read_text())
    lic = LICENSES.read_text(encoding="utf-8") if LICENSES.exists() else "# Third-party assets\n"
    total = 0
    for pid in ids:
        files = json.loads(get(f"https://api.polyhaven.com/files/{pid}"))
        out = DEST / pid
        out.mkdir(parents=True, exist_ok=True)
        for key, tag in MAPS.items():
            entry = files.get(key, {}).get("2k", {}).get("jpg")
            if not entry:
                raise SystemExit(f"{pid}: no 2k jpg for {key}")
            path = out / f"{pid}_{tag}_2k.jpg"
            if not path.exists() or path.stat().st_size != entry.get("size", -1):
                path.write_bytes(get(entry["url"]))
            total += path.stat().st_size
        manifest[pid] = {"type": "textures", "path": f"SourceArt/PolyHaven/textures/{pid}", "licence": "CC0",
                         "source": f"https://polyhaven.com/a/{pid}"}
        if f"polyhaven.com/a/{pid}" not in lic:
            lic += f"\n- Poly Haven `{pid}` — CC0 — https://polyhaven.com/a/{pid} — surface texture (2K diffuse/nor_gl/arm)"
        print(f"OK {pid}", flush=True)
    MANIFEST.write_text(json.dumps(manifest, indent=1) + "\n")
    LICENSES.write_text(lic + "\n", encoding="utf-8")
    print(f"DOWNLOAD DONE {len(ids)} sets, {total / 1e6:.0f} MB")


if __name__ == "__main__":
    main(sys.argv[1:] or SETS)
