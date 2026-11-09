"""U1A LevelSequence：相机 Cut Track（按 stage.shots 时长）+ 文章句子事件占位。"""
import json
import os
import unreal

ROOT = unreal.Paths.project_dir()
LEVEL = "/Game/Memory/Scenes/L_Unit01A"
SCENE_ID = "unit01_section_a"
SEQ_PATH = "/Game/Memory/Sequencer"
SEQ_NAME = "LS_Unit01A"
LOG = unreal.log_warning
FPS = 30

stages = json.load(open(os.path.join(ROOT, "Content", "Data", "Memory", "stages.json"), encoding="utf-8"))["stages"]
scenes = json.load(open(os.path.join(ROOT, "Content", "Data", "Memory", "scenes.json"), encoding="utf-8"))["scenes"]
scene = next(s for s in scenes if s["sceneId"] == SCENE_ID)
stage = stages[scene["stage"]]

les = unreal.get_editor_subsystem(unreal.LevelEditorSubsystem)
eas = unreal.get_editor_subsystem(unreal.EditorActorSubsystem)
les.load_level(LEVEL)
cams = {a.get_actor_label(): a for a in eas.get_all_level_actors() if a.get_actor_label().startswith("cam_")}
LOG(f"[u01a-seq] cams={sorted(cams)}")

tools = unreal.AssetToolsHelpers.get_asset_tools()
full = f"{SEQ_PATH}/{SEQ_NAME}"
if unreal.EditorAssetLibrary.does_asset_exist(full):
    unreal.EditorAssetLibrary.delete_asset(full)
seq = tools.create_asset(SEQ_NAME, SEQ_PATH, unreal.LevelSequence, unreal.LevelSequenceFactoryNew())
seq.set_display_rate(unreal.FrameRate(FPS, 1))

cut_track = seq.add_track(unreal.MovieSceneCameraCutTrack)
LOG(f"[u01a-seq] created camera cut track: {cut_track}")

shots = stage.get("shots", [])
cursor = 0
for i, shot in enumerate(shots):
    label = f"cam_{i:02d}"
    cam = cams.get(label)
    if not cam:
        LOG(f"[u01a-seq] missing {label}")
        continue
    frames = max(1, int(round(float(shot.get("duration", 6)) * FPS)))
    binding = seq.add_possessable(cam)
    section = cut_track.add_section()
    section.set_range(cursor, cursor + frames)
    bound = False
    guid = getattr(binding, "binding_id", None)
    candidates = []
    if guid is not None:
        try:
            candidates.append(unreal.MovieSceneObjectBindingID(guid))
        except Exception:
            pass
        for prop in ("Guid", "guid"):
            try:
                bid = unreal.MovieSceneObjectBindingID()
                bid.set_editor_property(prop, guid)
                candidates.append(bid)
            except Exception:
                pass
    for bid in candidates:
        try:
            section.set_camera_binding_id(bid)
            LOG(f"[u01a-seq] bound {label} via MovieSceneObjectBindingID")
            bound = True
            break
        except Exception as e:
            LOG(f"[u01a-seq] {label} binding attempt failed: {e}")
    if not bound:
        LOG(f"[u01a-seq] WARNING unbound camera cut {label}")
    LOG(f"[u01a-seq] shot {i} {label} frames {cursor}-{cursor + frames} binding={binding.get_name()}")
    cursor += frames

seq.set_work_range_start(0)
seq.set_work_range_end(cursor)
seq.set_view_range_start(0)
seq.set_view_range_end(cursor)
unreal.EditorAssetLibrary.save_asset(full)
LOG(f"[u01a-seq] DONE {full} range=0-{cursor}")
