import unreal
LEVEL = "/Game/Memory/Scenes/L_Unit01A"
les = unreal.get_editor_subsystem(unreal.LevelEditorSubsystem)
les.load_level(LEVEL)
world = unreal.get_editor_subsystem(unreal.UnrealEditorSubsystem).get_editor_world()
ws = world.get_world_settings()
cls = unreal.load_class(None, "/Script/WordQuestUE.WordQuestMemoryGameMode")
if cls is None:
    unreal.log_warning("[u01a-gm] class not found")
else:
    ws.set_editor_property("default_game_mode", cls)
    les.save_current_level()
    unreal.log_warning(f"[u01a-gm] game mode set to {cls.get_name()}")
