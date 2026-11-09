"""Claude · poses: import the authored one-frame poses as AnimSequences on the MetaHuman body skeleton.

Input : SourceArt/Poses/A_MH_<pose>.fbx (Tools/props/pose_author.py), skeleton from SourceArt/Poses/skeleton.json
Output: /Game/Memory/Characters/Poses/A_MH_<pose>   (textbook_character_staging.py plays them as single-node poses)

Run through the project lock:
  PROP_QUIT=1 UE_LOCK_WHO=claude Tools/run_ue_serial.sh "$ED" "$PWD/WordQuestUE.uproject" \\
      -ExecutePythonScript="$PWD/Tools/import_poses.py" -unattended -nosplash
"""
import glob
import json
import os

import unreal

ROOT = unreal.Paths.project_dir()
SRC = os.path.join(ROOT, "SourceArt", "Poses")
DEST = "/Game/Memory/Characters/Poses"


def log(m):
    unreal.log_warning(f"[import_poses] {m}")


def main():
    skel_path = json.load(open(os.path.join(SRC, "skeleton.json")))["skeleton"]
    skeleton = unreal.load_asset(skel_path)
    if skeleton is None:
        raise RuntimeError("missing skeleton " + skel_path)
    tasks = []
    for fbx in sorted(glob.glob(os.path.join(SRC, "A_MH_*.fbx"))):
        name = os.path.splitext(os.path.basename(fbx))[0]
        t = unreal.AssetImportTask()
        t.filename = fbx
        t.destination_path = DEST
        t.destination_name = name
        t.automated = True
        t.replace_existing = True
        t.save = True
        o = unreal.FbxImportUI()
        o.import_mesh = False
        o.import_as_skeletal = True
        o.import_animations = True
        o.import_materials = False
        o.import_textures = False
        o.mesh_type_to_import = unreal.FBXImportType.FBXIT_ANIMATION
        o.skeleton = skeleton
        o.anim_sequence_import_data.set_editor_property("import_bone_tracks", True)
        o.anim_sequence_import_data.set_editor_property("animation_length", unreal.FBXAnimationLengthImportType.FBXALIT_EXPORTED_TIME)
        t.options = o
        tasks.append(t)
    unreal.AssetToolsHelpers.get_asset_tools().import_asset_tasks(tasks)
    made = [a for a in unreal.EditorAssetLibrary.list_assets(DEST, recursive=False)]
    log(f"skeleton {skel_path}; imported {len(made)}: {[a.split('/')[-1].split('.')[0] for a in made]}")
    log("IMPORT POSES DONE")


try:
    main()
except Exception as e:  # noqa: BLE001
    unreal.log_error(f"[import_poses] FAILED: {e}")
finally:
    if os.environ.get("PROP_QUIT") == "1":
        unreal.SystemLibrary.execute_console_command(None, "log flush")
        os._exit(0)
