"""Claude · character pipeline: cloud auto-rig of the conformed MetaHumans (needs the user's Epic sign-in in UE).

For each id in CHAR_IDS (default all seven): add the MHC for editing, request a blocking auto-rig
(joints + face blend shapes), save. The rig unlocks posing and animation (C4 retarget, C14 staging poses).
Writes a per-character line "[char_autorig] <id> ..." and AUTORIG DONE; errors (e.g. not signed in) are logged.

Run through the project lock:
  CHAR_IDS=me2026 CHAR_QUIT=1 UE_LOCK_WHO=claude Tools/run_ue_serial.sh "$ED" "$PWD/WordQuestUE.uproject" \\
      -ExecutePythonScript="$PWD/Tools/char_autorig.py" -unattended -nosplash
"""
import os
import time

import unreal

IDS = [c for c in os.environ.get("CHAR_IDS", "me2026,lin,mei,an,rui,organizer,old2090").split(",") if c]
RIG = os.environ.get("RIG_TYPE", "JOINTS_AND_BLEND_SHAPES")


def log(m):
    unreal.log_warning(f"[char_autorig] {m}")


def main():
    mh = unreal.get_editor_subsystem(unreal.MetaHumanCharacterEditorSubsystem)
    for cid in IDS:
        path = f"/Game/Characters/{cid}/MHC_{cid}"
        character = unreal.load_asset(path)
        if character is None:
            log(f"{cid} MISSING {path}")
            continue
        if not mh.try_add_object_to_edit(character):
            log(f"{cid} cannot edit")
            continue
        try:
            params = unreal.MetaHumanCharacterAutoRiggingRequestParams()
            params.set_editor_property("rig_type", getattr(unreal.MetaHumanRigType, RIG))
            params.set_editor_property("report_progress", False)
            params.set_editor_property("blocking", True)
            t0 = time.time()
            mh.request_auto_rigging(character, params)
            dt = time.time() - t0
            state = None
            for name in ("rigging_state", "rig_state"):
                try:
                    state = character.get_editor_property(name)
                    break
                except Exception:  # noqa: BLE001
                    pass
            unreal.EditorAssetLibrary.save_asset(path, only_if_is_dirty=False)
            log(f"{cid} requested in {dt:.1f}s state={state}")
        except Exception as e:  # noqa: BLE001
            log(f"{cid} FAILED {e}")
        finally:
            if mh.is_object_added_for_editing(character):
                mh.remove_object_to_edit(character)
    log("AUTORIG DONE")


try:
    main()
except Exception as e:  # noqa: BLE001
    unreal.log_error(f"[char_autorig] FAILED: {e}")
finally:
    if os.environ.get("CHAR_QUIT") == "1":
        unreal.SystemLibrary.execute_console_command(None, "log flush")
        os._exit(0)
