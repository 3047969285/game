"""检查 L_Unit01A 并尽量截一张图到 Saved/Screenshots/u01a.png。"""
import os
import unreal

ROOT = unreal.Paths.project_dir()
LOG = unreal.log_warning
les = unreal.get_editor_subsystem(unreal.LevelEditorSubsystem)
eas = unreal.get_editor_subsystem(unreal.EditorActorSubsystem)
les.load_level("/Game/Memory/Scenes/L_Unit01A")
actors = eas.get_all_level_actors()
by_class = {}
for a in actors:
    by_class[a.get_class().get_name()] = by_class.get(a.get_class().get_name(), 0) + 1
LOG(f"[u01a-check] actors={len(actors)} classes={by_class}")
for a in actors:
    n = a.get_actor_label()
    if n.startswith("cam_"):
        LOG(f"[u01a-check] {n} at {a.get_actor_location()}")
try:
    cam = next(a for a in actors if a.get_actor_label() == "cam_00")
    loc = cam.get_actor_location()
    rot = cam.get_actor_rotation()
    les.set_level_viewport_camera_info(loc, rot)
    out = os.path.join(ROOT, "Saved", "Screenshots", "u01a.png")
    os.makedirs(os.path.dirname(out), exist_ok=True)
    unreal.AutomationLibrary.take_high_res_screenshot(1600, 900, out)
    LOG(f"[u01a-check] screenshot requested {out}")
except Exception as e:
    LOG(f"[u01a-check] screenshot failed: {e}")
