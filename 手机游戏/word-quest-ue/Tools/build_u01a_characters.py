"""在 L_Unit01A 里放 MetaHuman 角色（me2026/lin/mei/an/rui），保存关卡。"""
import os
import unreal

LEVEL = "/Game/Memory/Scenes/L_Unit01A"
LOG = unreal.log_warning
# 角色：id, web 坐标（x 右, y 上, z 前），朝向（UE yaw，面向桌心）
CAST = [
    ("me2026", 2.8, 0.0, -0.25, -90),
    ("lin", 0.9, 0.0, -1.1, 0),
    ("mei", -0.6, 0.0, -1.1, 0),
    ("an", -2.8, 0.0, -0.25, 90),
    ("rui", -1.3, 0.0, 0.6, 180),
]


def wpos(x, y, z):
    return unreal.Vector(float(x) * 100.0, float(z) * 100.0, float(y) * 100.0)


les = unreal.get_editor_subsystem(unreal.LevelEditorSubsystem)
eas = unreal.get_editor_subsystem(unreal.EditorActorSubsystem)
les.load_level(LEVEL)
# 清掉旧的 actor_ 占位
for a in list(eas.get_all_level_actors()):
    if a.get_actor_label().startswith("actor_"):
        eas.destroy_actor(a)

mh = unreal.get_editor_subsystem(unreal.MetaHumanCharacterEditorSubsystem)
BODY = {"me2026": "male_body", "lin": "female_body", "mei": "mei_body", "an": "an_body", "rui": "rui_body"}
spawned = 0
for cid, x, y, z, yaw in CAST:
    bp = f"/Game/Blueprints/Characters/BP_{cid}"
    cls = unreal.load_class(None, bp + f".BP_{cid}_C") if unreal.EditorAssetLibrary.does_asset_exist(bp) else None
    if cls:
        a = eas.spawn_actor_from_class(cls, wpos(x, y, z), unreal.Rotator(0, yaw, 0))
        a.set_actor_label(f"actor_{cid}")
        spawned += 1
        LOG(f"[u01a-cast] spawned BP {cid}")
        continue
    # 没有 BP：用已导入的 Source body 作为持久占位（非 transient，可保存）
    asset_path = f"/Game/Characters/{cid}/Source/{BODY.get(cid, cid + '_body')}"
    mesh = unreal.EditorAssetLibrary.load_asset(asset_path) if unreal.EditorAssetLibrary.does_asset_exist(asset_path) else None
    if mesh is None:
        LOG(f"[u01a-cast] no BP and no body for {cid}")
        continue
    cls = unreal.SkeletalMeshActor if isinstance(mesh, unreal.SkeletalMesh) else unreal.StaticMeshActor
    a = eas.spawn_actor_from_class(cls, wpos(x, y, z), unreal.Rotator(0, yaw, 0))
    if isinstance(mesh, unreal.SkeletalMesh):
        a.skeletal_mesh_component.set_skeletal_mesh_asset(mesh)
    else:
        a.static_mesh_component.set_static_mesh(mesh)
    a.set_actor_label(f"actor_{cid}")
    spawned += 1
    LOG(f"[u01a-cast] spawned body {cid} ({mesh.get_name()})")

les.save_current_level()
LOG(f"[u01a-cast] DONE spawned={spawned}")
