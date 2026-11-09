"""Claude · poses: export the MetaHuman body archetype (skeletal mesh + skeleton) to FBX for pose authoring.

Writes SourceArt/Poses/SKM_MH_Body.fbx and SourceArt/Poses/skeleton.json (bone names, parents, reference
transforms) so Tools/props/pose_author.py (Blender) can key poses on the exact MetaHuman skeleton, and
Tools/import_poses.py can bring the one-frame AnimSequences back onto that skeleton.

Run through the project lock:
  PROP_QUIT=1 UE_LOCK_WHO=claude Tools/run_ue_serial.sh "$ED" "$PWD/WordQuestUE.uproject" \\
      -ExecutePythonScript="$PWD/Tools/export_mh_body.py" -unattended -nosplash
"""
import json
import os

import unreal

SRC = os.environ.get("MH_BODY", "/MetaHumanCharacter/Body/IdentityTemplate/SKM_Body")
OUT = os.path.join(unreal.Paths.project_dir(), "SourceArt", "Poses")


def log(m):
    unreal.log_warning(f"[export_mh_body] {m}")


def main():
    os.makedirs(OUT, exist_ok=True)
    mesh = unreal.load_asset(SRC)
    if mesh is None:
        raise RuntimeError("missing " + SRC)
    skel = mesh.get_editor_property("skeleton")
    log(f"mesh {mesh.get_path_name()} skeleton {skel.get_path_name()}")
    task = unreal.AssetExportTask()
    task.object = mesh
    task.filename = os.path.join(OUT, "SKM_MH_Body.fbx")
    task.automated = True
    task.replace_identical = True
    task.prompt = False
    opts = unreal.FbxExportOption()
    opts.set_editor_property("export_morph_targets", False)
    opts.set_editor_property("level_of_detail", False)
    task.options = opts
    ok = unreal.Exporter.run_asset_export_task(task)
    log(f"export fbx ok={ok}")
    json.dump({"mesh": mesh.get_path_name(), "skeleton": skel.get_path_name()},
              open(os.path.join(OUT, "skeleton.json"), "w"), indent=1)
    log("EXPORT MH BODY DONE")


try:
    main()
except Exception as e:  # noqa: BLE001
    unreal.log_error(f"[export_mh_body] FAILED: {e}")
finally:
    if os.environ.get("PROP_QUIT") == "1":
        unreal.SystemLibrary.execute_console_command(None, "log flush")
        os._exit(0)
