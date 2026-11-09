"""Claude · character pipeline: dress the MetaHumans before assembly (no more preview underwear).

For each id in CHAR_IDS: put a wardrobe item into the "Outfits" slot of /Game/Characters/<id>/MHC_<id> and
save. Default is MetaHuman's fitted garment (shirt + trousers, body shapes A–F), coloured per character in
OUTFITS below; the leads' own clothes (white open-collar shirt, pale-blue camisole) replace it later.
Colour parameters only exist after assembly, so char_assemble.py applies them (see OUTFITS there).

  CHAR_IDS=mei,an CHAR_QUIT=1 UE_LOCK_WHO=claude Tools/run_ue_serial.sh "$UE" "$PWD/WordQuestUE.uproject" \\
      -ExecutePythonScript="$PWD/Tools/char_outfit.py" -unattended -nosplash
"""
import os

import unreal

DEFAULT = "/MetaHumanCharacter/Optional/Clothing/WI_DefaultGarment"
IDS = [c for c in os.environ.get("CHAR_IDS", "me2026,lin,mei,an,rui,organizer,old2090").split(",") if c]


def log(m):
    unreal.log_warning(f"[char_outfit] {m}")


def dress(cid):
    path = f"/Game/Characters/{cid}/MHC_{cid}"
    character = unreal.load_asset(path)
    if character is None:
        log(f"{cid}: missing {path}")
        return
    collection = character.internal_collection
    item = unreal.load_asset(os.environ.get("OUTFIT", DEFAULT))
    key = collection.try_add_item_from_wardrobe_item("Outfits", item)
    collection.default_instance.try_add_slot_selection(
        unreal.MetaHumanPipelineSlotSelection(slot_name="Outfits", selected_item=key))
    unreal.EditorAssetLibrary.save_asset(path, only_if_is_dirty=False)
    log(f"{cid}: outfit set")


try:
    for cid in IDS:
        try:
            dress(cid)
        except Exception as e:  # noqa: BLE001
            log(f"{cid}: FAILED {e}")
    log("OUTFIT DONE")
finally:
    if os.environ.get("CHAR_QUIT") == "1":
        unreal.SystemLibrary.execute_console_command(None, "log flush")
        os._exit(0)
