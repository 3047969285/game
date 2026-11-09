"""Claude · post-assembly finishing of a built MetaHuman (Tools/char_assemble.py output).

Groom instance parameters are empty in a headless editor (no preview assembly), so hair colour is set on the
material instances the build wrote under <ASSEMBLE_PATH>/<id>/Grooms instead. Writes every scalar/vector
parameter it finds to Saved/CharV2/<id>_groom_params.json, then applies FINISH below.

  CHAR_IDS=lins_v2 ASSEMBLE_PATH=/Game/MetaHumans/v2 UE_LOCK_WHO=claude Tools/run_ue_serial.sh "$UE" \\
      "$PWD/WordQuestUE.uproject" -ExecutePythonScript="$PWD/Tools/char_finish.py" -unattended -nosplash
"""
import json
import os
from pathlib import Path

import unreal

ROOT = Path(__file__).resolve().parents[1]
OUT = os.environ.get("ASSEMBLE_PATH", "/Game/MetaHumans")
IDS = [c for c in os.environ.get("CHAR_IDS", "").split(",") if c]
MEL = unreal.MaterialEditingLibrary
# per character: material-name substring -> {parameter: value}; names follow the groom (Hair_*, Eyebrows_*, ...)
FINISH = {
    # MetaHuman hair materials call them hairMelanin / hairRedness (Saved/CharV2/<id>_groom_params.json)
    "me2026s_v2": {"Hair_": {"hairMelanin": 0.95, "hairRedness": 0.05}, "Eyebrows_": {"hairMelanin": 0.95, "hairRedness": 0.05}},
    "lins_v2": {"Hair_": {"hairMelanin": 0.45, "hairRedness": 0.92}, "Eyebrows_": {"hairMelanin": 0.55, "hairRedness": 0.5}},
    # Offline-day family (personas paul/maria/jason/jack.json: appearance.hair)
    "paul": {"Hair_": {"hairMelanin": 0.78, "hairRedness": 0.22}, "Eyebrows_": {"hairMelanin": 0.8, "hairRedness": 0.2}},
    "maria": {"Hair_": {"hairMelanin": 0.85, "hairRedness": 0.25}, "Eyebrows_": {"hairMelanin": 0.85, "hairRedness": 0.2}},
    "jason": {"Hair_": {"hairMelanin": 0.92, "hairRedness": 0.08}, "Eyebrows_": {"hairMelanin": 0.9, "hairRedness": 0.08}},
    "jack": {"Hair_": {"hairMelanin": 0.62, "hairRedness": 0.35}, "Eyebrows_": {"hairMelanin": 0.65, "hairRedness": 0.3}},
}


def log(m):
    unreal.log_warning(f"[char_finish] {m}")


def finish(cid):
    folder = f"{OUT}/{cid}/Grooms"
    report = {}
    for path in unreal.EditorAssetLibrary.list_assets(folder, recursive=True):
        mi = unreal.load_asset(path.split(".")[0])
        if not isinstance(mi, unreal.MaterialInstanceConstant):
            continue
        name = mi.get_name()
        report[name] = {"scalars": [str(n) for n in MEL.get_scalar_parameter_names(mi)],
                        "vectors": [str(n) for n in MEL.get_vector_parameter_names(mi)]}
        for key, params in FINISH.get(cid, {}).items():
            if key in name:
                for p, v in params.items():
                    if p in report[name]["scalars"]:
                        MEL.set_material_instance_scalar_parameter_value(mi, p, v)
                        log(f"{cid} {name}.{p} = {v}")
                unreal.EditorAssetLibrary.save_loaded_asset(mi)
    (ROOT / f"Saved/CharV2/{cid}_groom_params.json").write_text(json.dumps(report, indent=1))
    log(f"{cid}: {len(report)} groom material instances")


try:
    for c in IDS:
        try:
            finish(c)
        except Exception as e:  # noqa: BLE001
            log(f"{c} FAILED {e}")
finally:
    unreal.SystemLibrary.execute_console_command(None, "log flush")
    os._exit(0)
