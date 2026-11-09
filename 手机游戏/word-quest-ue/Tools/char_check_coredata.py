"""Claude · check that MetaHuman Creator Core Data (Optional Content) is picked up by the editor:
open a MetaHuman Character for edit and report texture-synthesis readiness. Exits with os._exit."""
import os
import unreal

mh = unreal.get_editor_subsystem(unreal.MetaHumanCharacterEditorSubsystem)
c = unreal.load_asset("/Game/Characters/me2026/MHC_me2026")
ok = mh.try_add_object_to_edit(c)
unreal.log_warning(f"[coredata] edit={ok}")
if ok:
    mh.remove_object_to_edit(c)
unreal.log_warning("[coredata] DONE")
unreal.SystemLibrary.execute_console_command(None, "log flush")
os._exit(0)
