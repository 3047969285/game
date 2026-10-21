"""Import the merged RW3 unit landmarks into UE, lay them out and add a PlayerStart."""
import glob
import os
import unreal

MERGE_DIR = "/tmp/rw3_merged"
DEST = "/Game/RW3"
MAP = "/Game/Maps/L_Main"


def log(m):
    unreal.log_warning("[RW3M] " + str(m))


def cleanup():
    try:
        if unreal.EditorAssetLibrary.does_directory_exist("/Game/Units"):
            unreal.EditorAssetLibrary.delete_directory("/Game/Units")
    except Exception as e:
        log("cleanup old units: " + str(e))


def import_all():
    tasks = []
    for src in sorted(glob.glob(os.path.join(MERGE_DIR, "unit*.glb"))):
        name = os.path.splitext(os.path.basename(src))[0]
        t = unreal.AssetImportTask()
        t.filename = src
        t.destination_path = os.path.join(DEST, name)
        t.automated = True
        t.save = True
        t.replace_existing = True
        tasks.append((name, t))
    unreal.AssetToolsHelpers.get_asset_tools().import_asset_tasks([t for _, t in tasks])
    out = {}
    for name, t in tasks:
        for p in (t.imported_object_paths or []):
            a = unreal.load_asset(p)
            if isinstance(a, unreal.StaticMesh):
                out[name] = a
                log("imported %s -> %s" % (name, p))
    return out


def layout(meshes):
    les = unreal.get_editor_subsystem(unreal.LevelEditorSubsystem)
    les.load_level(MAP)
    eas = unreal.get_editor_subsystem(unreal.EditorActorSubsystem)
    for a in eas.get_all_level_actors():
        lbl = a.get_actor_label()
        if lbl.startswith("RW3_") or lbl.startswith("M1_") and lbl not in ("M1_Sun", "M1_SkyLight", "M1_Atmosphere", "M1_Fog"):
            eas.destroy_actor(a)
    for i in range(1, 7):
        name = "unit%02d" % i
        mesh = meshes.get(name)
        if mesh is None:
            log("missing merged mesh " + name)
            continue
        b = mesh.get_bounding_box()
        size = b.max - b.min
        target_h = 800.0
        scale = target_h / max(size.z, 1.0)
        loc = unreal.Vector((i - 3.5) * 1800.0, 0.0, 0.0)
        actor = eas.spawn_actor_from_class(unreal.StaticMeshActor, loc, unreal.Rotator(0.0, 0.0, 0.0))
        actor.set_actor_label("RW3_" + name)
        actor.static_mesh_component.set_static_mesh(mesh)
        actor.set_actor_scale3d(unreal.Vector(scale, scale, scale))
        log("spawned %s size=%s scale=%.3f" % (name, str(size), scale))
    ps = eas.spawn_actor_from_class(unreal.PlayerStart, unreal.Vector(0.0, -4500.0, 150.0), unreal.Rotator(0.0, -90.0, 0.0))
    ps.set_actor_label("RW3_PlayerStart")
    les.save_current_level()
    log("layout saved")


if __name__ == "__main__":
    cleanup()
    meshes = import_all()
    layout(meshes)
    log("IMPORT MERGED DONE (%d units)" % len(meshes))
