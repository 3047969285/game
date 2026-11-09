"""Build a supporting character's MPFB body + face from its written spec (no reference photos).

Usage: Blender -b -P build_cast.py -- <id> <fit_dir>
Face parameters are the same keys as word-quest-game characters.ts face() (range -1..1); each maps
onto MPFB targets (positive -> *-incr / up / out, negative -> *-decr / down / in). Body macros come
from the character bible (word-quest-ue/Docs/characters/<id>.md): sex, age, height, build, ethnicity.
old2090 reuses the lead's fitted face weights (fit/male_fit.json) and ages them.
Writes <fit>/<id>_fit.blend (object "Human", same layout as fit_face.py output) and <id>_cast.json.
"""
import bpy, sys, os, json
import numpy as np
from bl_ext.user_default.mpfb.services.humanservice import HumanService
from bl_ext.user_default.mpfb.services.targetservice import TargetService
from bl_ext.user_default.mpfb.services.locationservice import LocationService

a = sys.argv[sys.argv.index("--") + 1:]
CID, FIT = a[0], a[1]
DATA = LocationService.get_user_data()
SYS_TARGETS = os.path.join(os.path.dirname(sys.modules["bl_ext.user_default.mpfb"].__file__), "data", "targets")


def age_macro(years):
    # MPFB: 0 -> 1 y, 0.1875 -> 11 y, 0.5 -> 25 y, 1.0 -> 90 y
    if years <= 25:
        return 0.1875 + (years - 11) / 14 * 0.3125
    return 0.5 + (years - 25) / 65 * 0.5


CAST = {
    "mei": dict(sex="female", years=20, height_m=1.63, muscle=0.40, weight=0.30, skin="young_asian_female",
                face=dict(jawWidth=-0.85, jawLength=0.55, cheekbone=0.3, cheekFull=-0.4, noseLength=-0.25, noseWidth=-0.3,
                          noseBridge=0.1, eyeSize=0.65, eyeSpacing=0.1, browArch=0.45, mouthWidth=-0.35, lipThickness=0.45,
                          foreheadHeight=0.0, headAspect=-0.48),
                gains=dict(eyeSize=1.35)),                          # D19: eyes 5.6% too small
    "an": dict(sex="male", years=20, height_m=1.80, muscle=0.80, weight=0.55, skin="young_asian_male", race_shift=0.15,
               face=dict(jawWidth=0.95, jawLength=0.28, cheekbone=-0.1, cheekFull=0.25, noseLength=0.0, noseWidth=0.55,
                         noseBridge=-0.1, eyeSpacing=-0.25, eyeSize=-0.1, browHeight=-0.35, browArch=-0.2, mouthWidth=0.35,
                         lipThickness=0.25, foreheadHeight=-0.3, headAspect=0.35)),
    "rui": dict(sex="male", years=20, height_m=1.87, muscle=0.45, weight=0.25, skin="young_asian_male",
                face=dict(jawWidth=-0.40, jawLength=0.65, cheekbone=0.0, cheekFull=-0.3, noseLength=0.55, noseWidth=-0.2,
                          noseBridge=0.45, eyeSpacing=0.35, eyeSize=-0.25, browHeight=0.25, browArch=0.0, mouthWidth=-0.15,
                          lipThickness=-0.2, foreheadHeight=0.35, headAspect=-0.45, headScaleVert=-0.12),
                gains=dict(headAspect=0.8, foreheadHeight=0.85)),   # D19: head was 12% too tall
    "organizer": dict(sex="female", years=38, height_m=1.70, muscle=0.45, weight=0.35, skin="middleage_asian_female",
                      face=dict(jawWidth=0.1, jawLength=0.05, cheekbone=-0.25, cheekFull=-0.35, noseLength=0.3, noseWidth=0.1,
                                noseBridge=0.2, eyeSpacing=-0.1, eyeSize=-0.30, browHeight=-0.4, browArch=-0.3, mouthWidth=0.35,
                                lipThickness=-0.35, foreheadHeight=0.35, headAspect=0.1),
                      gains=dict(eyeSize=1.2)),
    "old2090": dict(sex="male", years=84, height_m=1.79, muscle=0.30, weight=0.33, skin="old_asian_male",
                    from_fit="male_fit.json", age_targets={"head-age-incr": 0.8, "neck-double-incr": 0.1,
                                                           "l-eye-bag-incr": 0.6, "r-eye-bag-incr": 0.6,
                                                           "mouth-laugh-lines-in": 0.5, "l-cheek-volume-decr": 0.35,
                                                           "r-cheek-volume-decr": 0.35, "mouth-angles-down": 0.35},
                    face=dict(jawWidth=-0.25, jawLength=0.20, neckWidth=-0.15),          # D19: jaw/neck too heavy
                    gains=dict(jawWidth=1.2, jawLength=1.2)),
}[CID]

# face parameter -> [(target stem, gain)], sign picks incr/decr (or the paired direction)
MAP = {
    "jawWidth": [("chin/chin-width", 1.0), ("head/head-square", 0.35)],
    "jawLength": [("chin/chin-height", 1.0)],
    "cheekbone": [("cheek/l-cheek-bones", 1.0), ("cheek/r-cheek-bones", 1.0)],
    "cheekFull": [("cheek/l-cheek-volume", 1.0), ("cheek/r-cheek-volume", 1.0)],
    "noseLength": [("nose/nose-scale-vert", 1.0)],
    "noseWidth": [("nose/nose-scale-horiz", 1.0)],
    "noseBridge": [("nose/nose-scale-depth", 0.7), ("nose/nose-hump", 0.3)],
    "eyeSpacing": [("eyes/l-eye-trans", 1.0), ("eyes/r-eye-trans", 1.0)],
    "eyeSize": [("eyes/l-eye-scale", 1.0), ("eyes/r-eye-scale", 1.0)],
    "browHeight": [("eyebrows/eyebrows-trans", 1.0)],
    "browArch": [("eyebrows/eyebrows-angle", 1.0)],
    "mouthWidth": [("mouth/mouth-scale-horiz", 1.0)],
    "lipThickness": [("mouth/mouth-upperlip-volume", 1.0), ("mouth/mouth-lowerlip-volume", 1.0)],
    "foreheadHeight": [("forehead/forehead-scale-vert", 1.0)],
    "headAspect": [("head/head-scale-horiz", 1.0)],
    "headScaleVert": [("head/head-scale-vert", 1.0)],
    "neckWidth": [("neck/neck-scale-horiz", 1.0)],
}
PAIRS = (("-incr", "-decr"), ("-up", "-down"), ("-out", "-in"))


def target_file(stem, positive):
    for pos, neg in PAIRS:
        f = os.path.join(SYS_TARGETS, stem + (pos if positive else neg) + ".target.gz")
        if os.path.exists(f):
            return f
    f = os.path.join(SYS_TARGETS, stem + ".target.gz")          # unpaired (e.g. head-square)
    return f if os.path.exists(f) and positive else None


for o in list(bpy.data.objects):
    bpy.data.objects.remove(o, do_unlink=True)
male = CAST["sex"] == "male"
macro = {"gender": 1.0 if male else 0.0, "age": age_macro(CAST["years"]), "muscle": CAST["muscle"], "weight": CAST["weight"],
         "proportions": 1.0, "height": 0.5, "cupsize": 0.5, "firmness": 0.5,
         "race": {"asian": 0.8 - CAST.get("race_shift", 0.0), "caucasian": 0.2, "african": CAST.get("race_shift", 0.0)}}
human = HumanService.create_human(macro_detail_dict=macro, feet_on_ground=True, scale=0.1)
human.name = "Human"
eyes_dir = os.path.join(DATA, "eyes", "high-poly")
eyes_file = next(os.path.join(eyes_dir, f) for f in os.listdir(eyes_dir) if f.endswith(".mhclo"))
HumanService.add_mhclo_asset(eyes_file, human, asset_type="Eyes", subdiv_levels=1, material_type="MAKESKIN")
HumanService.set_character_skin(os.path.join(DATA, "skins", CAST["skin"], CAST["skin"] + ".mhmat"), human, skin_type="ENHANCED_SSS")

weights = {}
if "from_fit" in CAST:
    weights.update(json.load(open(os.path.join(FIT, CAST["from_fit"])))["weights"])
GAINS = CAST.get("gains", {})
for k, v in CAST.get("face", {}).items():
    for stem, gain in MAP[k]:
        gain *= GAINS.get(k, 1.0)
        f = target_file(stem, v >= 0)
        if f and abs(v) > 1e-3:
            nm = "fit_" + os.path.basename(f).replace(".target.gz", "")
            weights[nm] = weights.get(nm, 0.0) + abs(v) * gain
for stem, v in CAST.get("age_targets", {}).items():
    region = {"head": "head", "neck": "neck", "l-eye": "eyes", "r-eye": "eyes", "mouth": "mouth", "l-cheek": "cheek", "r-cheek": "cheek"}
    reg = next(r for p, r in region.items() if stem.startswith(p))
    weights["fit_" + stem] = v
loaded = 0
for nm, v in weights.items():
    stem = nm[4:]
    f = next((os.path.join(SYS_TARGETS, r, stem + ".target.gz") for r in os.listdir(SYS_TARGETS)
              if os.path.exists(os.path.join(SYS_TARGETS, r, stem + ".target.gz"))), None)
    if not f:
        print("missing target", stem); continue
    TargetService.load_target(human, f, weight=float(min(1.0, v)), name=nm)
    loaded += 1
bpy.context.view_layer.update()
print("targets", loaded, flush=True)
json.dump({"id": CID, "macro": macro, "height_m": CAST["height_m"], "weights": weights, "skin": CAST["skin"]},
          open(os.path.join(FIT, f"{CID}_cast.json"), "w"), indent=1)
bpy.ops.wm.save_as_mainfile(filepath=os.path.join(FIT, f"{CID}_fit.blend"))
print("CAST DONE", CID, flush=True)
