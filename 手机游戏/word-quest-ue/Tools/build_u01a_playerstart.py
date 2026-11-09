"""在 L_Unit01A 放 PlayerStart（可 PIE 试玩）。"""
import json, math, os, unreal
ROOT = unreal.Paths.project_dir()
LEVEL = "/Game/Memory/Scenes/L_Unit01A"
stages = json.load(open(os.path.join(ROOT, "Content", "Data", "Memory", "stages.json"), encoding="utf-8"))["stages"]
stage = stages["clubRoom"]
sp = stage["spawn"]
LOG = unreal.log_warning
les = unreal.get_editor_subsystem(unreal.LevelEditorSubsystem)
eas = unreal.get_editor_subsystem(unreal.EditorActorSubsystem)
les.load_level(LEVEL)
for a in list(eas.get_all_level_actors()):
    if a.get_class().get_name() == "PlayerStart":
        eas.destroy_actor(a)
loc = unreal.Vector(0.0, 40.0, 160.0)
yaw = -90.0  # web 的 -z 前进 → UE 的 -Y
ps = eas.spawn_actor_from_class(unreal.PlayerStart, loc, unreal.Rotator(0, yaw, 0))
ps.set_actor_label("PlayerStart_Memory")
les.save_current_level()
LOG(f"[u01a-start] placed at {loc} yaw={yaw}")
