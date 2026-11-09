"""Claude · character pipeline: synthesize MetaHuman skin for every character from its spec.

Needs MetaHuman Creator Core Data (Optional Content / TextureSynthesis) — installed 2026-10-22.
Runs locally (texture synthesis model), no cloud request. Values come from the character bibles
(Docs/characters/*.md: Fitzpatrick type, undertone, cheek/lip colour, freckles, age).

  CHAR_IDS=me2026,lin,... CHAR_QUIT=1 UE_LOCK_WHO=claude Tools/run_ue_serial.sh \\
      UnrealEditor WordQuestUE.uproject -ExecutePythonScript=Tools/char_skin.py -unattended -nosplash

U = skin tone (0 light .. 1 dark), V = undertone (0 cool/olive .. 1 warm/red), per MetaHuman Creator.
"""
import os

import unreal

SKIN = {
    # id:        U     V    roughness face_idx  cheeks(d_red,d_light) lips(d_red,d_sat) freckles
    # Accent values are OFFSETS from MetaHuman's neutral 0.5 (redness/lightness/saturation default 0.5).
    # Until 2026-11-02 they were passed as absolutes near 0, which darkened cheeks, nose, ears and lips
    # into brown patches on every character.
    "me2026":    (0.22, 0.42, 1.00, 0, (0.05, 0.00), (0.06, 0.00), 0.00),   # fair, cool-neutral (lian1-3)
    "lin":       (0.16, 0.55, 0.95, 0, (0.15, 0.03), (0.15, 0.08), 0.00),   # very fair, rosy cheeks (lian5-8)
    "old2090":   (0.30, 0.38, 1.12, 0, (0.05, -0.05), (0.00, -0.05), 0.00), # aged, cooler and greyer
    "mei":       (0.30, 0.62, 0.98, 0, (0.15, 0.03), (0.12, 0.05), 0.00),   # Fitzpatrick III warm pink
    "an":        (0.52, 0.60, 1.02, 0, (0.06, 0.00), (0.05, 0.00), 0.00),   # Fitzpatrick IV warm brown (outdoor)
    "rui":       (0.20, 0.40, 1.00, 0, (0.08, 0.00), (0.05, 0.00), 0.30),   # Fitzpatrick II-III cool, light freckles
    "organizer": (0.32, 0.48, 1.04, 0, (0.04, -0.02), (0.04, 0.00), 0.00), # Fitzpatrick III warm-grey, 38 y
}


def log(m):
    unreal.log_warning(f"[char_skin] {m}")


def accent(d_red, d_light=0.0, d_sat=0.0):
    """Offsets from the neutral 0.5, clamped to the 0..1 range MetaHuman accepts."""
    a = unreal.MetaHumanCharacterAccentRegionProperties()
    a.redness = min(1.0, max(0.0, 0.5 + d_red))
    a.lightness = min(1.0, max(0.0, 0.5 + d_light))
    a.saturation = min(1.0, max(0.0, 0.5 + d_sat))
    return a


def apply(mh, cid):
    path = f"/Game/Characters/{cid}/MHC_{cid}"
    c = unreal.load_asset(path)
    if c is None:
        log(f"{cid}: missing {path}"); return
    if not mh.try_add_object_to_edit(c):
        log(f"{cid}: cannot edit"); return
    try:
        u, v, rough, face_idx, cheeks, lips, frk = SKIN[cid]
        if os.environ.get("SKIN_OVERRIDE"):          # "u,v,face_idx" for calibration runs
            u, v, face_idx = [float(x) for x in os.environ["SKIN_OVERRIDE"].split(",")]; face_idx = int(face_idx)
        sp = unreal.MetaHumanCharacterSkinProperties()
        sp.u = u; sp.v = v; sp.roughness = rough
        sp.face_texture_index = face_idx; sp.body_texture_index = face_idx
        sp.show_top_underwear = True
        fr = unreal.MetaHumanCharacterFrecklesProperties()
        fr.density = frk; fr.strength = 0.5 if frk else 0.0
        acc = unreal.MetaHumanCharacterAccentRegions()
        acc.cheeks = accent(cheeks[0], cheeks[1])
        acc.lips = accent(lips[0], 0.0, lips[1])
        acc.nose = accent(cheeks[0] * 0.6)
        acc.ears = accent(cheeks[0] * 0.5)
        settings = unreal.MetaHumanCharacterSkinSettings()
        settings.skin = sp; settings.freckles = fr; settings.accents = acc
        settings.enable_texture_overrides = False
        c.preview_material_type = unreal.MetaHumanCharacterSkinPreviewMaterial.EDITABLE
        mh.commit_skin_settings(c, settings)
        unreal.EditorAssetLibrary.save_asset(path, only_if_is_dirty=False)
        log(f"{cid}: skin committed u={u} v={v}")
    finally:
        if mh.is_object_added_for_editing(c):
            mh.remove_object_to_edit(c)


try:
    mh = unreal.get_editor_subsystem(unreal.MetaHumanCharacterEditorSubsystem)
    for cid in os.environ.get("CHAR_IDS", ",".join(SKIN)).split(","):
        try:
            apply(mh, cid.strip())
        except Exception as e:  # noqa: BLE001
            log(f"{cid}: FAILED {e}")
    log("SKIN DONE")
finally:
    if os.environ.get("CHAR_QUIT") == "1":
        unreal.SystemLibrary.execute_console_command(None, "log flush")
        os._exit(0)
