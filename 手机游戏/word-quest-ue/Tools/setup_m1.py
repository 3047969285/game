"""M1: put the imported hero into L_Main with lighting and a camera.

Run headless:
  UnrealEditor-Cmd <project>.uproject -run=pythonscript -script=Tools/setup_m1.py -unattended -nosplash -nullrhi
"""
import unreal

MAP_PATH = "/Game/Maps/L_Main"
HERO = "/Game/Heroes/me2026/SkeletalMeshes/Human"


def main():
    les = unreal.get_editor_subsystem(unreal.LevelEditorSubsystem)
    if unreal.EditorAssetLibrary.does_asset_exist(MAP_PATH):
        les.load_level(MAP_PATH)
        unreal.log("loaded " + MAP_PATH)
    else:
        les.new_level(MAP_PATH)
        unreal.log("created " + MAP_PATH)

    eas = unreal.get_editor_subsystem(unreal.EditorActorSubsystem)

    # clear previous generated actors (idempotent-ish: delete by label prefix "M1_")
    for a in eas.get_all_level_actors():
        if a.get_actor_label().startswith("M1_"):
            eas.destroy_actor(a)

    mesh = unreal.load_asset(HERO)
    if mesh is None:
        unreal.log_error("hero mesh not found: " + HERO)
        return
    try:
        morphs = mesh.get_editor_property("morph_targets")
        mesh_names = [m.get_name() for m in morphs] if morphs else []
        unreal.log("hero morph targets: " + str(mesh_names))
    except Exception as exc:  # noqa: BLE001
        unreal.log_warning("could not read morph targets: " + str(exc))

    hero = eas.spawn_actor_from_class(unreal.SkeletalMeshActor, unreal.Vector(-200, 0, 0), unreal.Rotator(0, 0, 0))
    hero.set_actor_label("M1_Hero")
    try:
        hero.skeletal_mesh_component.set_skeletal_mesh(mesh)
        hero.skeletal_mesh_component.set_animation_mode(unreal.AnimationMode.ANIMATION_SINGLE_NODE)
        unreal.log("hero spawned with mesh")
    except Exception as exc:  # noqa: BLE001
        unreal.log_error("could not assign hero mesh: " + str(exc))

    sun = eas.spawn_actor_from_class(unreal.DirectionalLight, unreal.Vector(0, 0, 600), unreal.Rotator(-45, 30, 0))
    sun.set_actor_label("M1_Sun")
    sun.light_component.set_editor_property("intensity", 4.0)
    sky = eas.spawn_actor_from_class(unreal.SkyLight, unreal.Vector(0, 0, 400), unreal.Rotator(0, 0, 0))
    sky.set_actor_label("M1_SkyLight")
    sky.light_component.set_editor_property("intensity", 0.8)
    eas.spawn_actor_from_class(unreal.SkyAtmosphere, unreal.Vector(0, 0, 0), unreal.Rotator(0, 0, 0)).set_actor_label("M1_Atmosphere")
    eas.spawn_actor_from_class(unreal.ExponentialHeightFog, unreal.Vector(0, 0, 0), unreal.Rotator(0, 0, 0)).set_actor_label("M1_Fog")

    cam = eas.spawn_actor_from_class(unreal.CineCameraActor, unreal.Vector(-420, 0, 100), unreal.Rotator(0, 0, 0))
    cam.set_actor_label("M1_Camera")
    cam.set_actor_rotation(unreal.Rotator(pitch=-5, yaw=0, roll=0), False)

    les.save_current_level()
    unreal.log("M1 SETUP DONE")


if __name__ == "__main__":
    main()
