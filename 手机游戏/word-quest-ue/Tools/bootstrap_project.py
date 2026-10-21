"""UE5 editor bootstrap: create the main map and import the hero GLBs.

Run headless after the engine is installed:
  UnrealEditor-Cmd <project>.uproject -run=pythonscript -script=<this file> -unattended -nosplash
"""
import os
import unreal

HEROES_DIR = os.path.normpath(os.path.join(unreal.Paths.project_dir(), "..", "word-quest-game", "public", "models", "heroes"))
MAP_PATH = "/Game/Maps/L_Main"
HERO_ASSET_DIR = "/Game/Heroes"


def ensure_map():
    if unreal.EditorAssetLibrary.does_asset_exist(MAP_PATH):
        unreal.log("map already exists: " + MAP_PATH)
        return
    les = unreal.get_editor_subsystem(unreal.LevelEditorSubsystem)
    ok = les.new_level(MAP_PATH)
    unreal.log("created level: " + str(ok))
    if ok:
        les.save_current_level()


def import_heroes():
    unreal.EditorAssetLibrary.make_directory(HERO_ASSET_DIR)
    tasks = []
    for name in ("me2026.glb", "lin.glb"):
        path = os.path.join(HEROES_DIR, name)
        if not os.path.exists(path):
            unreal.log_warning("hero glb missing: " + path)
            continue
        task = unreal.AssetImportTask()
        task.filename = path
        task.destination_path = HERO_ASSET_DIR
        task.automated = True
        task.save = True
        task.replace_existing = True
        tasks.append(task)
    if tasks:
        unreal.AssetToolsHelpers.get_asset_tools().import_asset_tasks(tasks)
        for t in tasks:
            for a in (t.imported_object_paths or []):
                unreal.log("imported: " + a)
                asset = unreal.load_asset(a)
                if isinstance(asset, unreal.SkeletalMesh):
                    unreal.log(f"  skeletal mesh: {len(asset.skeleton.bones)} bones")
                    mts = unreal.SkeletalMesh.get_morph_targets(asset) if hasattr(unreal.SkeletalMesh, "get_morph_targets") else None
                    unreal.log("  morph targets: " + str(asset.get_editor_property("morph_targets") if not mts else mts))


if __name__ == "__main__":
    ensure_map()
    import_heroes()
    unreal.log("BOOTSTRAP DONE")
