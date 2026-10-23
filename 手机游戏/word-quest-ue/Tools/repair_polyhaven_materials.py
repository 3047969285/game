#!/usr/bin/env python3
"""Repair only Poly Haven surface material graphs and their existing instances.

Run from the project root with the editor closed:
    python3 Tools/repair_polyhaven_materials.py
The helper uses the serialized full-editor launcher; it does not import models.
"""
import os
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(Path(__file__).resolve().parent))
from import_polyhaven import ensure_material_parent, pbr_graph_spec


def editor_main(u):
    parent = ensure_material_parent(u)
    paths = u.EditorAssetLibrary.list_assets(
        "/Game/PolyHaven/Materials", recursive=True, include_folder=False
    )
    repaired = 0
    for path in paths:
        asset = u.load_asset(path)
        if not asset or not isinstance(asset, u.MaterialInstanceConstant):
            continue
        if not asset.get_name().startswith("MI_"):
            continue
        u.MaterialEditingLibrary.set_material_instance_parent(asset, parent)
        u.MaterialEditingLibrary.set_material_instance_scalar_parameter_value(
            asset, "MetallicScale", pbr_graph_spec()["metallic_scale_instance"]
        )
        u.EditorAssetLibrary.save_loaded_asset(asset)
        repaired += 1

    u.EditorAssetLibrary.save_loaded_asset(parent)
    u.log(f"WQ_POLYHAVEN_MATERIALS_REPAIRED parent={parent.get_path_name()} instances={repaired}")
    sys.stdout.flush()
    os._exit(0)


def cli():
    from ue_character_common import run_locked_editor
    log_path = ROOT / "Saved/Textbook/polyhaven-material-repair.log"
    result = run_locked_editor(__file__, {}, log_path)
    if result.returncode:
        raise SystemExit(result.returncode)
    log = log_path.read_text(errors="replace") if log_path.exists() else ""
    if "WQ_POLYHAVEN_MATERIALS_REPAIRED" not in log:
        raise SystemExit("Material graph repair did not reach its completion marker")


if __name__ == "__main__":
    try:
        import unreal
    except ImportError:
        cli()
    else:
        try:
            editor_main(unreal)
        except Exception:
            import traceback
            traceback.print_exc()
            sys.stderr.flush()
            os._exit(1)
