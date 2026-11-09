"""压低 U1A 过曝：调低方向光/天光/点光/面光，加一个手动曝光的 PostProcessVolume。"""
import unreal
LEVEL = "/Game/Memory/Scenes/L_Unit01A"
LOG = unreal.log_warning
les = unreal.get_editor_subsystem(unreal.LevelEditorSubsystem)
eas = unreal.get_editor_subsystem(unreal.EditorActorSubsystem)
les.load_level(LEVEL)
for a in eas.get_all_level_actors():
    label = a.get_actor_label()
    lc = None
    try:
        lc = a.light_component
    except Exception:
        lc = None
    if lc is None:
        continue
    if isinstance(a, unreal.DirectionalLight):
        lc.set_editor_property("intensity", 0.35)
    elif isinstance(a, unreal.SkyLight):
        lc.set_editor_property("intensity", 0.05)
    elif isinstance(a, unreal.RectLight):
        lc.set_editor_property("intensity", 120.0)
    elif isinstance(a, unreal.PointLight):
        lc.set_editor_property("intensity", 18.0)
    LOG(f"[u01a-light] {label} {a.get_class().get_name()} adjusted")

# PostProcessVolume：手动曝光，避免 PIE 里自动曝光把画面冲白
if not any(a.get_class().get_name() == "PostProcessVolume" for a in eas.get_all_level_actors()):
    ppv = eas.spawn_actor_from_class(unreal.PostProcessVolume, unreal.Vector(0, 0, 0))
    ppv.set_actor_label("PPV_Memory")
    ppv.set_editor_property("unbound", True)
    settings = ppv.get_editor_property("settings")
    settings.set_editor_property("override_auto_exposure_bias", True)
    settings.set_editor_property("auto_exposure_bias", -3.0)
    ppv.set_editor_property("settings", settings)
    LOG("[u01a-light] PPV added")
for a in list(eas.get_all_level_actors()):
    if a.get_actor_label().startswith("actor_"):
        eas.destroy_actor(a)
les.save_current_level()
LOG("[u01a-light] DONE")
