"""Rig the assembled hero and export a first game-ready GLB.

Usage: Blender -b fit/male_hero.blend -P rig_export.py -- male fit <dest_dir>
- applies the current 266-key face mix into the mesh (no giant morph dump in the GLB)
- adds the MPFB "game_engine" rig (Hips/Spine/... bone names)
- scales the character to 1.84 m (1 glTF unit = 1 m), Y-up and facing +Z via the exporter
- exports <dest>/me2026.glb and prints a short report
"""
import bpy, sys, os, math, json, struct
import numpy as np
from mathutils import Vector

a = sys.argv[sys.argv.index("--") + 1:]
WHO, OUT, DEST = a[0], a[1], a[2]
os.makedirs(DEST, exist_ok=True)

body = bpy.data.objects["Human"]

# ---------------------------------------------------------------- apply the face mix
bpy.context.view_layer.objects.active = body
for o in bpy.data.objects:
    o.select_set(False)
body.select_set(True)
if body.data.shape_keys:
    try:
        bpy.ops.object.shape_key_remove(all=True, apply_mix=True)
        print("shape keys applied and removed", flush=True)
    except Exception as exc:  # noqa: BLE001
        print("shape key apply failed:", repr(exc), flush=True)

# ---------------------------------------------------------------- rig
from bl_ext.user_default.mpfb.services.humanservice import HumanService
try:
    HumanService.add_builtin_rig(body, "game_engine", import_weights=True)
    print("RIG ADDED", flush=True)
except Exception as exc:  # noqa: BLE001
    print("RIG FAILED:", repr(exc), flush=True)

arms = [o for o in bpy.data.objects if o.type == "ARMATURE"]
for arm in arms:
    print("ARMATURE", arm.name, "bones", len(arm.data.bones), flush=True)
    print("BONES", [b.name for b in arm.data.bones], flush=True)

# ---------------------------------------------------------------- scale to metres
bpy.context.view_layer.update()
ev = body.evaluated_get(bpy.context.evaluated_depsgraph_get())
V = np.array([(body.matrix_world @ v.co)[:] for v in ev.data.vertices])
top = float(V[:, 2].max())
SCALE = 1.84 / top
print("top", round(top, 4), "scale", round(SCALE, 5), flush=True)
for o in bpy.data.objects:
    if o.type in {"MESH", "ARMATURE"}:
        o.location = [c * SCALE for c in o.location]
        o.scale = [s * SCALE for s in o.scale]
for o in bpy.data.objects:
    if o.type in {"MESH", "ARMATURE"}:
        bpy.context.view_layer.objects.active = o
        for x in bpy.data.objects:
            x.select_set(False)
        o.select_set(True)
        try:
            bpy.ops.object.transform_apply(location=False, rotation=False, scale=True)
        except Exception as exc:  # noqa: BLE001
            print("apply scale failed", o.name, repr(exc), flush=True)

bpy.context.view_layer.update()
ev = body.evaluated_get(bpy.context.evaluated_depsgraph_get())
V = np.array([(body.matrix_world @ v.co)[:] for v in ev.data.vertices])
print("scaled bbox", np.round(V.min(0), 3), np.round(V.max(0), 3), flush=True)

# ---------------------------------------------------------------- Rocketbox bone names (delivery spec)
MAP = {"pelvis": "Hips", "spine_01": "Spine", "spine_02": "Spine1", "spine_03": "Spine2",
       "neck_01": "Neck", "head": "Head"}
for side, S in (("l", "Left"), ("r", "Right")):
    MAP.update({f"clavicle_{side}": f"{S}Shoulder", f"upperarm_{side}": f"{S}Arm",
                f"lowerarm_{side}": f"{S}ForeArm", f"hand_{side}": f"{S}Hand",
                f"thigh_{side}": f"{S}UpLeg", f"calf_{side}": f"{S}Leg",
                f"foot_{side}": f"{S}Foot", f"ball_{side}": f"{S}ToeBase"})
    for finger, F in (("index", "Index"), ("middle", "Middle"), ("pinky", "Pinky"),
                      ("ring", "Ring"), ("thumb", "Thumb")):
        for seg in (1, 2, 3):
            MAP[f"{finger}_0{seg}_{side}"] = f"{S}Hand{F}{seg}"
for arm in [o for o in bpy.data.objects if o.type == "ARMATURE"]:
    for b in arm.data.bones:
        if b.name in MAP:
            b.name = MAP[b.name]
    print("BONES RENAMED", [b.name for b in arm.data.bones][:20], flush=True)

# ---------------------------------------------------------------- decimate to <= 60k tris
def decimate(obj, ratio):
    if obj and obj.type == "MESH":
        m = obj.modifiers.new("game_decimate", "DECIMATE")
        m.ratio = ratio
        print("decimate", obj.name, ratio, flush=True)

decimate(bpy.data.objects.get("male_hair"), 0.80)
decimate(body, 0.92)

# apply decimate before adding morphs (Decimate would destroy shape keys)
bpy.context.view_layer.objects.active = body
for o in bpy.data.objects:
    o.select_set(False)
for o in (body, bpy.data.objects.get("male_hair")):
    if o is None:
        continue
    bpy.context.view_layer.objects.active = o
    for m in [m for m in o.modifiers if m.type != "ARMATURE"]:
        try:
            bpy.ops.object.modifier_apply(modifier=m.name)
        except Exception as exc:  # noqa: BLE001
            print("apply decimate failed", o.name, repr(exc), flush=True)

# ---------------------------------------------------------------- ARKit morphology (procedural, landmark driven)
lm3 = {int(k): np.array(v) for k, v in json.load(open(os.path.join(OUT, "male_lm3d.json"))).items()}
SC = 1.84 / 2.0685
LM = {k: v * SC for k, v in lm3.items()}
bpy.context.view_layer.update()
co = np.array([v.co[:] for v in body.data.vertices])
VN = np.array([v.normal[:] for v in body.data.vertices])
front = VN[:, 1] < -0.15


def weight_ball(center, sigma, extra=None):
    d2 = ((co - center) ** 2).sum(1)
    w = np.exp(-d2 / (2 * sigma * sigma)) * front
    if extra is not None:
        w = w * extra
    return w


body.shape_key_add(name="Basis", from_mix=False)


def add_morph(name, offsets):
    kb = body.shape_key_add(name=name, from_mix=False)
    for i, off in enumerate(offsets):
        if off is not None and (abs(off) > 1e-9).any():
            kb.data[i].co = body.data.vertices[i].co + Vector(off)
    print("morph", name, flush=True)


Z = np.array([0, 0, 1.0])
eyeL = 0.5 * (LM[33] + LM[133]); eyeR = 0.5 * (LM[263] + LM[362])
m = weight_ball(eyeL, 0.020)
add_morph("eyeBlinkLeft", [Z * (-0.0045 * w) for w in m])
m = weight_ball(eyeR, 0.020)
add_morph("eyeBlinkRight", [Z * (-0.0045 * w) for w in m])
mouth = 0.5 * (LM[61] + LM[291]); chin = LM[152]
sel = np.clip((mouth[2] - co[:, 2]) / 0.05, 0, 1) * front
add_morph("jawOpen", [np.array([0, 0.002, -0.011]) * w for w in sel])
cornerL = LM[61]
sel = weight_ball(cornerL, 0.014)
add_morph("mouthSmileLeft", [np.array([0.0035, 0, 0.0055]) * w for w in sel])
cornerR = LM[291]
sel = weight_ball(cornerR, 0.014)
add_morph("mouthSmileRight", [np.array([-0.0035, 0, 0.0055]) * w for w in sel])
brow = 0.5 * (LM[105] + LM[334])
sel = weight_ball(brow, 0.018)
add_morph("browInnerUp", [Z * (0.0045 * w) for w in sel])
print("MORPHS", [k.name for k in body.data.shape_keys.key_blocks], flush=True)
_basis = np.array([v.co[:] for v in body.data.shape_keys.key_blocks[0].data])
for kb in body.data.shape_keys.key_blocks[1:]:
    d = np.abs(np.array([v.co[:] for v in kb.data]) - _basis).sum()
    print("MORPH DELTA", kb.name, round(float(d), 5), flush=True)

# ---------------------------------------------------------------- report tris

# ---------------------------------------------------------------- report tris
total = 0
for o in bpy.data.objects:
    if o.type == "MESH":
        ev_ = o.evaluated_get(bpy.context.evaluated_depsgraph_get())
        tris = sum(len(p.vertices) - 2 for p in ev_.data.polygons)
        total += tris
        print("MESH", o.name, "tris", tris, "mats", [m.name if m else None for m in o.data.materials], flush=True)
print("TOTAL TRIS", total, flush=True)

# ---------------------------------------------------------------- export
path = os.path.join(DEST, f"{WHO}.glb")
bpy.ops.object.select_all(action="SELECT")
bpy.ops.export_scene.gltf(
    filepath=path,
    export_format="GLB",
    use_selection=False,
    export_apply=False,
    export_animations=False,
    export_skins=True,
    export_yup=True,
    export_morph=True,
)
print("EXPORTED", path, os.path.getsize(path), flush=True)

# quick structural check of the GLB
with open(path, "rb") as fh:
    magic, version, length = struct.unpack("<III", fh.read(12))
    clen, ctype = struct.unpack("<II", fh.read(8))
    js = json.loads(fh.read(clen))
print("GLB nodes", len(js.get("nodes", [])), "meshes", len(js.get("meshes", [])),
      "skins", len(js.get("skins", [])), "materials", len(js.get("materials", [])),
      "animations", len(js.get("animations", [])), flush=True)
print("MORPH TARGETS", sum(len(p.get("targets", [])) for m_ in js.get("meshes", []) for p in m_.get("primitives", [])), flush=True)
for s in js.get("skins", []):
    print("SKIN joints", len(s.get("joints", [])), flush=True)
