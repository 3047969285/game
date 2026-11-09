"""Claude · poses: author one-frame body poses on the MetaHuman skeleton (Blender 4.5) for the textbook scenes.

Blender -b -P Tools/props/pose_author.py      (needs SourceArt/Poses/SKM_MH_Body.fbx from Tools/export_mh_body.py)

Poses are written as limb DIRECTIONS in the character frame (F forward, L character-left, U up) rather than local
bone rotations, because the UE bone axes are not Blender-friendly. Each limb bone is turned about its own joint so
that joint -> child-joint points along the target (shortest arc, parents first, so twist is kept). Sitting lowers the
pelvis onto a 0.46 m seat; head/neck pitch and yaw are explicit rotations about L / U.
Output: SourceArt/Poses/A_MH_<pose>.fbx (armature only, 2 identical frames) for Tools/import_poses.py.
Pose names match the scene JSON people[].pose values.
"""
import math
import os

import bpy
from mathutils import Matrix, Quaternion, Vector

HERE = os.path.dirname(os.path.abspath(__file__))
UE_ROOT = os.path.dirname(os.path.dirname(HERE))
SRC = os.path.join(UE_ROOT, "SourceArt", "Poses", "SKM_MH_Body.fbx")
OUT = os.path.join(UE_ROOT, "SourceArt", "Poses")

F, L, U = Vector((0, -1, 0)), Vector((1, 0, 0)), Vector((0, 0, 1))   # MetaHuman faces -Y after FBX import
CHAIN = {  # bone -> child joint that defines its direction
    "thigh": "calf", "calf": "foot", "foot": "ball", "upperarm": "lowerarm", "lowerarm": "hand", "hand": "middle_metacarpal",
}


def d(f, l, u, side=1):
    """Direction from (forward, left, up) components; side=-1 mirrors left/right."""
    return (F * f + L * (l * side) + U * u).normalized()


ARMS_DOWN = {"upperarm": (0.06, 0.13, -1.0), "lowerarm": (0.3, 0.06, -1.0), "hand": (0.3, 0.0, -1.0)}
LEGS_STAND = {"thigh": (0.0, 0.05, -1.0), "calf": (-0.02, 0.02, -1.0), "foot": (1.0, 0.05, -0.55)}
LEGS_SIT = {"thigh": (1.0, 0.1, -0.06), "calf": (0.1, 0.04, -1.0), "foot": (1.0, 0.06, -0.45)}
POSES = {
    "stand": {"limbs": {**ARMS_DOWN, **LEGS_STAND}},
    "idle": {"limbs": {**ARMS_DOWN, **LEGS_STAND}},
    "stand_look": {"limbs": {**ARMS_DOWN, **LEGS_STAND}, "head_yaw": 28, "head_pitch": -4},
    "stand_phone": {"limbs": {"upperarm": (0.35, 0.1, -1.0), "lowerarm": (0.55, -0.4, 0.8), "hand": (0.4, -0.4, 0.8), **LEGS_STAND},
                    "head_pitch": 24},
    "sit": {"limbs": {"upperarm": (0.28, 0.1, -1.0), "lowerarm": (1.0, -0.12, -0.25), "hand": (1.0, -0.05, -0.3), **LEGS_SIT},
            "sit": True},
    "sit_type": {"limbs": {"upperarm": (0.4, 0.12, -1.0), "lowerarm": (1.0, -0.14, 0.04), "hand": (1.0, -0.05, -0.12), **LEGS_SIT},
                 "sit": True, "spine_pitch": 7, "head_pitch": 12},
    "sit_laptop": {"limbs": {"upperarm": (0.4, 0.12, -1.0), "lowerarm": (1.0, -0.14, 0.04), "hand": (1.0, -0.05, -0.12), **LEGS_SIT},
                   "sit": True, "spine_pitch": 9, "head_pitch": 16},
    "sit_phone": {"limbs": {"upperarm": (0.45, 0.08, -1.0), "lowerarm": (0.6, -0.38, 0.72), "hand": (0.5, -0.3, 0.75), **LEGS_SIT},
                  "sit": True, "spine_pitch": 10, "head_pitch": 26},
    "sit_tablet": {"limbs": {"upperarm": (0.4, 0.1, -1.0), "lowerarm": (0.9, -0.32, 0.3), "hand": (1.0, -0.2, 0.2), **LEGS_SIT},
                   "sit": True, "spine_pitch": 8, "head_pitch": 22},
    "sit_read": {"limbs": {"upperarm": (0.4, 0.1, -1.0), "lowerarm": (0.8, -0.3, 0.45), "hand": (0.8, -0.2, 0.5), **LEGS_SIT},
                 "sit": True, "spine_pitch": 6, "head_pitch": 18},
}
SEAT = 0.46


def joint(arm, name):
    pb = arm.pose.bones.get(name)
    return arm.matrix_world @ pb.head if pb else None


def rotate_about(arm, pb, q, pivot):
    """Rotate pose bone pb (armature space) by world quaternion q around pivot (world)."""
    mw = arm.matrix_world
    piv = mw.inverted() @ pivot
    rq = (mw.inverted().to_3x3() @ q.to_matrix() @ mw.to_3x3()).to_4x4()
    pb.matrix = Matrix.Translation(piv) @ rq @ Matrix.Translation(-piv) @ pb.matrix
    bpy.context.view_layer.update()


def aim(arm, bone, child, target):
    pb = arm.pose.bones.get(bone)
    a, b = joint(arm, bone), joint(arm, child)
    if pb is None or b is None:
        return
    cur = (b - a).normalized()
    rotate_about(arm, pb, cur.rotation_difference(target), a)


def pitch(arm, bone, deg, axis):
    pb = arm.pose.bones.get(bone)
    if pb is not None:
        rotate_about(arm, pb, Quaternion(axis, math.radians(deg)), joint(arm, bone))


def apply_pose(arm, spec):
    for pb in arm.pose.bones:
        pb.matrix_basis = Matrix.Identity(4)
    bpy.context.view_layer.update()
    if spec.get("sit"):
        pel = arm.pose.bones["pelvis"]
        hip_h = joint(arm, "pelvis").z
        drop = hip_h - (SEAT + 0.1)
        pel.matrix = Matrix.Translation(arm.matrix_world.inverted().to_3x3() @ Vector((0, 0.06, -drop))) @ pel.matrix
        bpy.context.view_layer.update()
    if spec.get("spine_pitch"):
        pitch(arm, "spine_01", spec["spine_pitch"], L)
    for side, sfx in ((1, "_l"), (-1, "_r")):
        for part in ("thigh", "calf", "foot", "upperarm", "lowerarm", "hand"):
            if part in spec["limbs"]:
                child = CHAIN[part] + sfx
                aim(arm, part + sfx, child if part != "hand" else child, d(*spec["limbs"][part], side=side))
    if spec.get("head_pitch"):
        pitch(arm, "neck_01", spec["head_pitch"] * 0.4, L)
        pitch(arm, "head", spec["head_pitch"] * 0.6, L)
    if spec.get("head_yaw"):
        pitch(arm, "neck_01", spec["head_yaw"] * 0.4, U)
        pitch(arm, "head", spec["head_yaw"] * 0.6, U)


def bake_and_export(arm, name):
    act = bpy.data.actions.new(f"A_MH_{name}")
    arm.animation_data_create()
    arm.animation_data.action = act
    for frame in (1, 2):
        for pb in arm.pose.bones:
            pb.keyframe_insert("location", frame=frame)
            pb.keyframe_insert("rotation_quaternion", frame=frame)
            pb.keyframe_insert("scale", frame=frame)
    bpy.context.scene.frame_start, bpy.context.scene.frame_end = 1, 2
    bpy.ops.object.select_all(action="DESELECT")
    arm.select_set(True)
    bpy.context.view_layer.objects.active = arm
    path = os.path.join(OUT, f"A_MH_{name}.fbx")
    bpy.ops.export_scene.fbx(filepath=path, use_selection=True, object_types={"ARMATURE"}, add_leaf_bones=False,
                             bake_anim=True, bake_anim_use_all_actions=False, bake_anim_use_nla_strips=False,
                             bake_anim_force_startend_keying=True, primary_bone_axis="Y", secondary_bone_axis="X",
                             armature_nodetype="NULL", apply_unit_scale=True)
    print(f"POSE {name} -> {path}", flush=True)


def preview(arm, name):
    """Quick viewport-free check: write key joint heights for the log (sit -> knees ~0.5 m, hands near desk)."""
    j = {k: joint(arm, k) for k in ("pelvis", "calf_l", "hand_l", "head")}
    print(f"   {name}: " + ", ".join(f"{k} z={v.z:.2f} y={v.y:.2f}" for k, v in j.items() if v), flush=True)


def main():
    bpy.ops.wm.read_factory_settings(use_empty=True)
    bpy.ops.import_scene.fbx(filepath=SRC, automatic_bone_orientation=False, primary_bone_axis="Y", secondary_bone_axis="X")
    arm = next(o for o in bpy.data.objects if o.type == "ARMATURE")
    for o in [o for o in bpy.data.objects if o.type == "MESH"]:
        bpy.data.objects.remove(o, do_unlink=True)
    for pb in arm.pose.bones:
        pb.rotation_mode = "QUATERNION"
    for name, spec in POSES.items():
        apply_pose(arm, spec)
        preview(arm, name)
        bake_and_export(arm, name)
    print("POSES DONE", len(POSES), flush=True)


main()
