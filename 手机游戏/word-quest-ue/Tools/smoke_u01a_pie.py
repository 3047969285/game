"""PIE 冒烟：开始 Play In Editor，等 HUD BeginPlay，截屏，结束。"""
import os
import unreal

LEVEL = "/Game/Memory/Scenes/L_Unit01A"
ROOT = unreal.Paths.project_dir()
LOG = unreal.log_warning
unreal.EditorPythonScripting.set_keep_python_script_alive(True)
les = unreal.get_editor_subsystem(unreal.LevelEditorSubsystem)
ues = unreal.get_editor_subsystem(unreal.UnrealEditorSubsystem)
les.load_level(LEVEL)
state = {"frames": 0, "started": False, "done": False, "shot": False, "viewed": False}


def tick(delta):
    if state["done"]:
        return
    state["frames"] += 1
    if not state["started"]:
        state["started"] = True
        ok = les.editor_request_begin_play()
        LOG(f"[u01a-pie] begin_play={ok}")
        return
    world = ues.get_game_world()
    if world is None:
        if state["frames"] > 600:
            LOG("[u01a-pie] timeout: no game world")
            les.editor_request_end_play()
            state["done"] = True
            os._exit(0)
        return
    if state["frames"] >= 60 and not state["viewed"]:
        pc = unreal.GameplayStatics.get_player_controller(world, 0)
        cams = unreal.GameplayStatics.get_all_actors_of_class(world, unreal.CineCameraActor)
        LOG(f"[u01a-pie] frames={state['frames']} pc={pc.get_name() if pc else None} cams={[c.get_actor_label() for c in cams]}")
        if pc and cams:
            pc.set_view_target(cams[0])
            state["viewed"] = True
            hud = pc.get_hud()
            LOG(f"[u01a-pie] view target -> {cams[0].get_actor_label()} hud={hud.get_class().get_name() if hud else None}")
    if state["frames"] >= 200 and not state["shot"]:
        state["shot"] = True
        try:
            out = os.path.join(ROOT, "Saved", "Screenshots", "u01a_pie.png")
            os.makedirs(os.path.dirname(out), exist_ok=True)
            ok = unreal.AutomationLibrary.take_high_res_screenshot(1600, 900, out)
            LOG(f"[u01a-pie] screenshot={ok} path={out}")
        except Exception as e:
            LOG(f"[u01a-pie] screenshot failed: {e}")
    if state["frames"] >= 280:
        LOG("[u01a-pie] ending play")
        les.editor_request_end_play()
        state["done"] = True
        os._exit(0)


unreal.register_slate_post_tick_callback(tick)
