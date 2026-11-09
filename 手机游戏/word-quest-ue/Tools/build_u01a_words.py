"""在 L_Unit01A 生成词物件（word_<wordId>），供 HUD 射线拾取。"""
import json, os, unreal
ROOT = unreal.Paths.project_dir()
LEVEL = "/Game/Memory/Scenes/L_Unit01A"
SCENE_ID = "unit01_section_a"
scenes = json.load(open(os.path.join(ROOT, "Content", "Data", "Memory", "scenes.json"), encoding="utf-8"))["scenes"]
scene = next(s for s in scenes if s["sceneId"] == SCENE_ID)
objects = scene["script"].get("objects", [])
LOG = unreal.log_warning

def wpos(p):
    return unreal.Vector(float(p.get("x", 0)) * 100.0, float(p.get("z", 0)) * 100.0, float(p.get("y", 0)) * 100.0)

les = unreal.get_editor_subsystem(unreal.LevelEditorSubsystem)
eas = unreal.get_editor_subsystem(unreal.EditorActorSubsystem)
les.load_level(LEVEL)
for a in list(eas.get_all_level_actors()):
    if a.get_actor_label().startswith("word_"):
        eas.destroy_actor(a)
mats = {
    "wood": unreal.EditorAssetLibrary.load_asset("/Game/Memory/Materials/M_U01A_Wood"),
    "dark": unreal.EditorAssetLibrary.load_asset("/Game/Memory/Materials/M_U01A_Dark"),
    "paper": unreal.EditorAssetLibrary.load_asset("/Game/Memory/Materials/M_U01A_Paper"),
    "cloth": unreal.EditorAssetLibrary.load_asset("/Game/Memory/Materials/M_U01A_Cloth"),
}
arche = {
    "phone": "/Engine/BasicShapes/Cube.Cube", "phoneRow": "/Engine/BasicShapes/Cube.Cube",
    "chatScreen": "/Engine/BasicShapes/Cube.Cube", "topicCard": "/Engine/BasicShapes/Cube.Cube",
    "flask": "/Engine/BasicShapes/Cylinder.Cylinder", "cup": "/Engine/BasicShapes/Cylinder.Cylinder",
    "cable": "/Engine/BasicShapes/Cylinder.Cylinder", "clock": "/Engine/BasicShapes/Cylinder.Cylinder",
    "compass": "/Engine/BasicShapes/Cylinder.Cylinder", "megaphone": "/Engine/BasicShapes/Cone.Cone",
    "emptyChair": "/Engine/BasicShapes/Cube.Cube", "book": "/Engine/BasicShapes/Cube.Cube",
}
spawned = 0
for obj in objects:
    wid = obj.get("wordId")
    if not wid:
        continue
    mesh_path = arche.get(obj.get("archetype", ""), "/Engine/BasicShapes/Cube.Cube")
    mesh = unreal.EditorAssetLibrary.load_asset(mesh_path)
    a = eas.spawn_actor_from_class(unreal.StaticMeshActor, wpos(obj.get("position", {})))
    a.static_mesh_component.set_static_mesh(mesh)
    a.set_actor_scale3d(unreal.Vector(0.12, 0.12, 0.06))
    a.set_actor_label(f"word_{wid}")
    a.tags = [unreal.Name("WordObject")]
    try:
        a.static_mesh_component.set_collision_profile_name("BlockAll")
    except Exception:
        pass
    key = "dark" if "phone" in (obj.get("archetype") or "") else "wood"
    a.static_mesh_component.set_material(0, mats.get(key))
    spawned += 1
les.save_current_level()
LOG(f"[u01a-words] DONE spawned={spawned}")
