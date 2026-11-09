"""Claude · character pipeline: assemble the rigged MetaHumans into Blueprints (Optimized pipeline, High quality).

For each id in CHAR_IDS: add the MHC for editing, check CanBuildMetaHuman, BuildMetaHuman with the PIPELINE / QUALITY below
into ASSEMBLE_PATH (default /Game/MetaHumans) named <id>, then list what the build produced.
textbook_character_staging.py spawns these Blueprints (posable, animatable) instead of static MHC snapshots.

Run through the project lock:
  CHAR_IDS=me2026 CHAR_QUIT=1 UE_LOCK_WHO=claude Tools/run_ue_serial.sh "$ED" "$PWD/WordQuestUE.uproject" \\
      -ExecutePythonScript="$PWD/Tools/char_assemble.py" -unattended -nosplash
"""
import os

import unreal

IDS = [c for c in os.environ.get("CHAR_IDS", "me2026,lin,mei,an,rui,organizer,old2090").split(",") if c]
OUT = os.environ.get("ASSEMBLE_PATH", "/Game/MetaHumans")
# Optimized + High (2K textures): the Cinematic build needs 4-8 GB more and was killed on this 16 GB machine
PIPELINE = os.environ.get("ASSEMBLE_PIPELINE", "OPTIMIZED")
QUALITY = os.environ.get("ASSEMBLE_QUALITY", "HIGH")


def log(m):
    unreal.log_warning(f"[char_assemble] {m}")


def main():
    mh = unreal.get_editor_subsystem(unreal.MetaHumanCharacterEditorSubsystem)
    for cid in IDS:
        character = unreal.load_asset(f"/Game/Characters/{cid}/MHC_{cid}")
        if character is None or not mh.try_add_object_to_edit(character):
            log(f"{cid} cannot load/edit")
            continue
        try:
            # The build refuses characters without high-res texture sources ("download texture sources first");
            # fetch them from Epic's service (signed-in editor) before assembling. Blocking for batch runs.
            if os.environ.get("DOWNLOAD_TEXTURES", "1") == "1":
                req = unreal.MetaHumanCharacterTextureRequestParams()
                req.blocking = True
                req.report_progress = False
                mh.request_texture_sources(character, req)
                unreal.EditorAssetLibrary.save_asset(character.get_path_name(), only_if_is_dirty=False)
                log(f"{cid} texture sources requested")
            if not mh.can_build_meta_human(character, True):
                log(f"{cid} cannot build (see error above)")
                continue
            params = unreal.MetaHumanCharacterEditorBuildParameters()
            params.set_editor_property("pipeline_type", getattr(unreal.MetaHumanDefaultPipelineType, PIPELINE))
            params.set_editor_property("pipeline_quality", getattr(unreal.MetaHumanQualityLevel, QUALITY))
            params.set_editor_property("absolute_build_path", OUT)
            params.set_editor_property("name_override", cid)
            mh.build_meta_human(character, params)
            unreal.EditorAssetLibrary.save_directory(OUT, only_if_is_dirty=False, recursive=True)
            made = [a for a in unreal.EditorAssetLibrary.list_assets(OUT, recursive=True) if f"/{cid}" in a or cid in a]
            bps = [a for a in made if "/BP_" in a]
            log(f"{cid} built: {len(made)} assets, blueprints {bps[:3]}")
        except Exception as e:  # noqa: BLE001
            log(f"{cid} FAILED {e}")
        finally:
            if mh.is_object_added_for_editing(character):
                mh.remove_object_to_edit(character)
    log("ASSEMBLE DONE")


try:
    main()
except Exception as e:  # noqa: BLE001
    unreal.log_error(f"[char_assemble] FAILED: {e}")
finally:
    if os.environ.get("CHAR_QUIT") == "1":
        unreal.SystemLibrary.execute_console_command(None, "log flush")
        os._exit(0)
