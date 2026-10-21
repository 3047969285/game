"""Import the RW3 unit landmark models (and avatar) into UE and lay them out in L_Main.

Run headless after the C++ module is built:
  UnrealEditor-Cmd <project>.uproject -run=pythonscript -script=Tools/import_rw3_models.py -unattended -nosplash
"""
import os
import unreal

PROJECT = unreal.Paths.project_dir()
SRC = os.path.normpath(os.path.join(PROJECT, "..", "word-quest-game", "public", "models"))
MAP_PATH = "/Game/Maps/L_Main"


def log(msg):
    unreal.log_warning("[RW3] " + str(msg))


def import_glbs():
    tasks = []
    for i in range(1, 7):
        src = os.path.join(SRC, "rw3", "unit%02d.glb" % i)
        if os.path.exists(src):
            t = unreal.AssetImportTask()
            t.filename = src
            t.destination_path = "/Game/Units/unit%02d" % i
            t.automated = True
            t.save = True
            t.replace_existing = True
            tasks.append(("unit%02d" % i, t))
        else:
            log("missing " + src)
    avatar = os.path.join(SRC, "avatar", "avatar.glb")
    if os.path.exists(avatar):
        t = unreal.AssetImportTask()
        t.filename = avatar
        t.destination_path = "/Game/Avatar"
        t.automated = True
        t.save = True
        t.replace_existing = True
        tasks.append(("avatar", t))
    if tasks:
        unreal.AssetToolsHelpers.get_asset_tools().import_asset_tasks([t for _, t in tasks])
        for name, t in tasks:
            for p in (t.imported_object_paths or []):
                log("imported %s -> %s" % (name, p))


def find_static_mesh(unit):
    # Interchange imports static meshes under the destination folder
    folder = "/Game/Units/" + unit
    try:
        paths = unreal.EditorAssetLibrary.list_assets(folder, recursive=True, include_folder=False)
    except Exception:
        return None
    for p in paths:
        if p.endswith("_StaticMesh") or "StaticMesh" in p or p.split("/")[-1].startswith(unit):
            a = unreal.load_asset(p)
            if isinstance(a, unreal.StaticMesh):
                return a
    for p in paths:
        a = unreal.load_asset(p)
        if isinstance(a, unreal.StaticMesh):
            return a
    return None


def layout():
    les = unreal.get_editor_subsystem(unreal.LevelEditorSubsystem)
    les.load_level(MAP_PATH)
    eas = unreal.get_editor_subsystem(unreal.EditorActorSubsystem)
    for a in eas.get_all_level_actors():
        lbl = a.get_actor_label()
        if lbl.startswith("RW3_") or lbl == "M1_Hero":
            eas.destroy_actor(a)
    for i in range(1, 7):
        mesh = find_static_mesh("unit%02d" % i)
        if mesh is None:
            log("no static mesh for unit%02d" % i)
            continue
        loc = unreal.Vector((i - 3.5) * 1600.0, 0.0, 0.0)
        actor = eas.spawn_actor_from_class(unreal.StaticMeshActor, loc, unreal.Rotator(0, 0, 0))
        actor.set_actor_label("RW3_unit%02d" % i)
        actor.static_mesh_component.set_static_mesh(mesh)
        b = mesh.get_bounding_box()
        log("spawned unit%02d mesh=%s extent=%s" % (i, mesh.get_name(), str(b.max - b.min)))
    les.save_current_level()
    log("layout done")


if __name__ == "__main__":
    import_glbs()
    layout()
    log("IMPORT RW3 DONE")
