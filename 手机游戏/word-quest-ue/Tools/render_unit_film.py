"""Claude · showcase film: render every authored shot of a unit as a slow camera move (frames for an MP4).

Per shot (Content/Data/memory/textbook_scenes/unitNN.json): only that set is visible / lit (same isolation as
check_textbook_scene.py), its PPV is used with the exposure bias the checker calibrated for that shot
(Docs/qa/textbook-scenes-unitNN.json), the SceneCapture warms up TAA/Lumen history, then FILM_FRAMES frames are
rendered while the camera pushes in 12% toward its look target with a gentle lateral arc.
Output: Saved/Film/unitNN/<section letter><NNN>_<sceneId>_<shot>/frame_00000.png ... and shots_<section>.json.
Tools/compose_unit_film.py turns them into the MP4 (title card, captions, memory transitions).

Run in the full editor through the project lock, one level per process (map on the command line):
  WQ_TEXTBOOK_UNIT=1 FILM_SECTION=section_a UE_LOCK_WHO=claude Tools/run_ue_serial.sh "$ED" "$PWD/WordQuestUE.uproject" \\
      /Game/Memory/Scenes/U01/L_U01_A -ExecutePythonScript="$PWD/Tools/render_unit_film.py" -unattended -nosplash
Env: FILM_FRAMES (72), FILM_RES (1920x1080), FILM_SHOTS ("u01a_s1/wide,..." to limit), FILM_WARMUP (60).
"""
import json
import math
import os
import sys
import time
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from textbook_scene_contract import ROOT, level_path, read_unit, world_cm  # noqa: E402

UNIT = int(os.environ.get("WQ_TEXTBOOK_UNIT", "1"))
FRAMES = int(os.environ.get("FILM_FRAMES", "72"))
WARMUP = int(os.environ.get("FILM_WARMUP", "60"))
SAMPLES = int(os.environ.get("FILM_SAMPLES", "1"))
RES = [int(v) for v in os.environ.get("FILM_RES", "1920x1080").split("x")]
ONLY = {s for s in os.environ.get("FILM_SHOTS", "").split(",") if s}
OUT = ROOT / "Saved" / "Film" / f"unit{UNIT:02d}"


def editor_main(u):
    data = read_unit(UNIT)
    report = ROOT / f"Docs/qa/textbook-scenes-unit{UNIT:02d}.json"
    bias = {}
    if report.exists():
        for s in json.loads(report.read_text()).get("scenes", []):
            for c in s.get("captures", []):
                bias[c["path"]] = float(c.get("exposure_bias", -3.0))
    section = os.environ.get("FILM_SECTION")                  # one level per editor process (see setup)
    plan_name = os.environ.get("FILM_PLAN", "plan.json")
    plan_path = OUT / plan_name                              # Tools/film_narration.py: frames per shot
    plan = json.loads(plan_path.read_text())["shots"] if plan_path.exists() else {}
    jobs = [(a, s, sh) for a in data["articles"] for s in a["scenes"] for sh in s["shots"]
            if (not ONLY or f"{s['id']}/{sh['name']}" in ONLY) and (not section or a["section"] == section)
            and (not plan or f"{s['id']}/{sh['name']}" in plan)]        # the plan picks the shots
    les = u.get_editor_subsystem(u.LevelEditorSubsystem)
    eas = u.get_editor_subsystem(u.EditorActorSubsystem)
    OUT.mkdir(parents=True, exist_ok=True)
    meta = []
    st = {"i": 0, "cap": None, "loaded": None, "k": -WARMUP}
    u.EditorPythonScripting.set_keep_python_script_alive(True)

    def setup(article, scene, shot):
        # The level is opened on the editor command line; LoadLevel while the startup world is still referenced
        # crashed the editor ("Old World not cleaned up by GC"), so only load when a different map is current.
        path = level_path(data, article)
        current = u.get_editor_subsystem(u.UnrealEditorSubsystem).get_editor_world().get_path_name().split(".")[0]
        if current != path.split(".")[0] and st["loaded"] != path:
            assert les.load_level(path)
        st["loaded"] = path
        actors = list(eas.get_all_level_actors())
        for a in actors:
            if any(str(t).startswith("set:") for t in a.tags):
                active = a.actor_has_tag("set:" + scene["id"])
                a.set_is_temporarily_hidden_in_editor(not active)
                a.set_actor_hidden_in_game(not active)
                if isinstance(a, u.PostProcessVolume):
                    a.set_editor_property("enabled", active)
                for light in a.get_components_by_class(u.LightComponent):
                    light.set_visibility(active)
        loc0 = world_cm(scene, shot["pos"])
        look = world_cm(scene, shot["look"])
        world = u.get_editor_subsystem(u.UnrealEditorSubsystem).get_editor_world()
        cap = eas.spawn_actor_from_class(u.SceneCapture2D, u.Vector(*loc0))
        c = cap.get_component_by_class(u.SceneCaptureComponent2D)
        target = u.RenderingLibrary.create_render_target2d(world, RES[0], RES[1], u.TextureRenderTargetFormat.RTF_RGBA8)
        c.set_editor_property("texture_target", target)
        c.set_editor_property("capture_source", u.SceneCaptureSource.SCS_FINAL_COLOR_LDR)
        c.set_editor_property("fov_angle", shot.get("fov", 40))
        c.set_editor_property("capture_every_frame", False)
        c.set_editor_property("capture_on_movement", False)
        c.set_editor_property("always_persist_rendering_state", True)
        u.WordQuestRenderDiagnostics.configure_capture(c)
        vols = [a for a in actors if isinstance(a, u.PostProcessVolume) and a.get_editor_property("enabled")]
        if vols:
            s = vols[0].get_editor_property("settings")
            key = f"Docs/qa/scenes/{scene['id']}/{shot['name']}.png"
            for name, value in (("auto_exposure_method", u.AutoExposureMethod.AEM_MANUAL),
                                ("auto_exposure_apply_physical_camera_exposure", False),
                                ("auto_exposure_bias", bias.get(key, -3.0)), ("motion_blur_amount", 0.35)):
                s.set_editor_property("override_" + name, True)
                s.set_editor_property(name, value)
            c.set_editor_property("post_process_settings", s)
            c.set_editor_property("post_process_blend_weight", 1.0)
        folder = OUT / f"{article['section'][-1]}{st['i']:03d}_{scene['id']}_{shot['name']}"
        folder.mkdir(parents=True, exist_ok=True)
        meta.append({"index": st["i"], "scene": scene["id"], "shot": shot["name"], "title": scene.get("title", ""),
                     "section": article["section"], "paragraphs": scene.get("paragraphs", []), "folder": folder.name,
                     "frames": FRAMES})
        st.update(cap=cap, comp=c, target=target, world=world, loc0=loc0, look=look, k=-WARMUP, folder=folder,
                  n=int(plan.get(f"{scene['id']}/{shot['name']}", FRAMES)))
        meta[-1]["frames"] = st["n"]

    def pose(t):
        """Ease-in-out push toward the look target with a small lateral arc."""
        e = 0.5 - 0.5 * math.cos(math.pi * t)
        lx, ly, lz = st["loc0"]
        tx, ty, tz = st["look"]
        dx, dy, dz = tx - lx, ty - ly, tz - lz
        dist = math.sqrt(dx * dx + dy * dy + dz * dz) or 1.0
        side = (-dy / dist, dx / dist)                         # horizontal perpendicular
        arc = 30.0 * math.sin(math.pi * (e - 0.5))            # +-30 cm
        loc = (lx + dx * 0.12 * e + side[0] * arc, ly + dy * 0.12 * e + side[1] * arc, lz + dz * 0.12 * e)
        rot = u.MathLibrary.find_look_at_rotation(u.Vector(*loc), u.Vector(*st["look"]))
        return u.Vector(*loc), rot

    def tick(_dt):
        try:
            if st["cap"] is None:
                if st["i"] >= len(jobs):
                    (OUT / f"shots_{section or 'all'}.json").write_text(json.dumps(meta, indent=1, ensure_ascii=False))
                    print("WQ_FILM_DONE " + str(len(meta)), flush=True)
                    sys.stdout.flush()
                    os._exit(0)
                setup(*jobs[st["i"]])
            k = st["k"]
            t = min(1.0, max(0.0, k / max(1, st["n"] - 1)))
            loc, rot = pose(t)
            st["cap"].set_actor_location_and_rotation(loc, rot, False, True)
            st["comp"].capture_scene()
            if k >= 0:
                if SAMPLES > 1:                                # extra sample per frame; slow push-ins converge without it
                    st["comp"].capture_scene()
                u.RenderingLibrary.export_render_target(st["world"], st["target"], str(st["folder"]), f"frame_{k:05d}.png")
            st["k"] += 1
            if st["k"] >= st["n"]:
                eas.destroy_actor(st["cap"])
                print(f"WQ_FILM_SHOT {st['i']} {st['folder'].name}", flush=True)
                st.update(cap=None, i=st["i"] + 1)
        except Exception:
            import traceback
            traceback.print_exc()
            sys.stderr.flush()
            os._exit(1)

    u.register_slate_post_tick_callback(tick)


if __name__ == "__main__":
    import unreal
    editor_main(unreal)
