"""D15-1：用 Blender 按 UE 相机参数渲染目标网格（target mesh），与 MHC 渲染同机位对比。

运行（Blender 无头，不需要 UE）：
  /Applications/Blender.app/Contents/MacOS/Blender -b -P Tools/qa/render_target_like_ue.py -- <id>

读取：Saved/Compare/<id>/capture.json（由 Codex 的 ue_render_compare.py 生成）
输入：../word-quest-game/docs/hero-pipeline/export/<id>/<male|female|id>_body.fbx
输出：Saved/Compare/<id>/target_{front,q34,side,back,closeup}.png
"""
import json
import math
import os
import sys

import bpy
import mathutils

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from ue_camera import (blender_camera_basis, parse_ue_struct,  # noqa: E402
                       ue_to_blender)

PROJECT = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
GAME = os.path.abspath(os.path.join(PROJECT, "..", "word-quest-game"))
WHO = {"me2026": "male", "lin": "female"}


def log(msg):
    print("[D15]", msg, flush=True)


def target_fbx(cid: str) -> str:
    name = WHO.get(cid, cid) + "_body.fbx"
    path = os.path.join(GAME, "docs", "hero-pipeline", "export", cid, name)
    if not os.path.isfile(path):
        raise SystemExit(f"target fbx missing: {path}")
    return path


def import_target(cid: str):
    bpy.ops.wm.read_factory_settings(use_empty=True)
    bpy.ops.import_scene.fbx(filepath=target_fbx(cid))
    meshes = [o for o in bpy.data.objects if o.type == "MESH"]
    if not meshes:
        raise SystemExit("no mesh imported")
    mat = bpy.data.materials.new("TargetNeutral")
    mat.use_nodes = True
    bsdf = mat.node_tree.nodes.get("Principled BSDF")
    if bsdf:
        bsdf.inputs["Base Color"].default_value = (0.72, 0.66, 0.60, 1.0)
        bsdf.inputs["Roughness"].default_value = 0.55
    for o in meshes:
        if not o.data.materials:
            o.data.materials.append(mat)
        else:
            o.data.materials[0] = mat
    # 报告包围盒（确认米制、脚底 z=0）
    mn = mathutils.Vector((1e9, 1e9, 1e9))
    mx = mathutils.Vector((-1e9, -1e9, -1e9))
    for o in meshes:
        for corner in o.bound_box:
            w = o.matrix_world @ mathutils.Vector(corner)
            mn = mathutils.Vector((min(mn[i], w[i]) for i in range(3)))
            mx = mathutils.Vector((max(mx[i], w[i]) for i in range(3)))
    log(f"target bbox min={tuple(round(v,3) for v in mn)} max={tuple(round(v,3) for v in mx)}")
    if mx.z - mn.z > 10.0:   # 若 FBX 是厘米
        s = 0.01
        for o in meshes:
            o.scale = (s, s, s)
        log(f"scaled by {s} (bbox height was {mx.z - mn.z:.1f})")
    return meshes


def setup_scene(resolution: int):
    scene = bpy.context.scene
    scene.render.engine = "CYCLES"
    scene.cycles.device = "CPU"
    scene.cycles.samples = 24
    scene.cycles.use_denoising = True
    scene.render.resolution_x = resolution
    scene.render.resolution_y = resolution
    scene.render.resolution_percentage = 100
    scene.render.film_transparent = False
    scene.render.image_settings.file_format = "PNG"
    # 灰色背景
    world = bpy.data.worlds.new("TargetWorld")
    scene.world = world
    world.use_nodes = True
    bg = world.node_tree.nodes.get("Background")
    bg.inputs[0].default_value = (0.55, 0.55, 0.55, 1.0)
    bg.inputs[1].default_value = 0.8
    # 三点光（在米制世界，头高约 1.5-1.8m）
    def add_light(name, kind, loc, energy, size=2.0):
        data = bpy.data.lights.new(name, kind)
        data.energy = energy
        if kind == "AREA":
            data.size = size
        obj = bpy.data.objects.new(name, data)
        obj.location = loc
        scene.collection.objects.link(obj)
        obj.rotation_mode = "QUATERNION"
        direction = mathutils.Vector((0, 0, 1.65)) - obj.location
        obj.rotation_quaternion = direction.to_track_quat("-Z", "Y")
        return obj
    add_light("Key", "AREA", (-1.2, -1.6, 2.0), 220, size=2.5)
    add_light("Fill", "AREA", (1.4, -0.8, 1.6), 90, size=2.0)
    add_light("Rim", "AREA", (0.8, 1.6, 2.0), 120, size=1.5)
    # 相机
    cam_data = bpy.data.cameras.new("TargetCam")
    cam_data.type = "ORTHO"
    cam = bpy.data.objects.new("TargetCam", cam_data)
    scene.collection.objects.link(cam)
    scene.camera = cam
    return cam


def camera_pose(cam, view: dict):
    loc = parse_ue_struct(view["location"])
    rot = parse_ue_struct(view["rotation"])
    bw = ue_to_blender(*loc)
    right, up, z = blender_camera_basis(*rot)
    # 注意：mathutils.Matrix(rows) 的参数是"行"；相机局部轴应作为"列"，
    # 因此先按行传入 right/up/z 再转置（否则 q34 这类非对称旋转会让相机朝向错误、画面空白）。
    mat = mathutils.Matrix((
        (right[0], right[1], right[2]),
        (up[0], up[1], up[2]),
        (z[0], z[1], z[2]),
    )).transposed()
    cam.location = bw
    cam.rotation_mode = "QUATERNION"
    cam.rotation_quaternion = mat.to_quaternion()
    cam.data.ortho_scale = float(view["ortho_width"]) / 100.0   # cm -> m（方形分辨率）
    return bw, rot


def main():
    argv = sys.argv[sys.argv.index("--") + 1:] if "--" in sys.argv else []
    if not argv:
        raise SystemExit("usage: Blender -b -P render_target_like_ue.py -- <id>")
    cid = argv[0]
    cap_path = os.path.join(PROJECT, "Saved", "Compare", cid, "capture.json")
    if not os.path.isfile(cap_path):
        raise SystemExit(f"capture.json missing (Codex render not ready): {cap_path}")
    cap = json.loads(open(cap_path, encoding="utf-8").read())
    resolution = int(cap.get("resolution", [1024, 1024])[0])
    import_target(cid)
    cam = setup_scene(resolution)
    out_dir = os.path.join(PROJECT, "Saved", "Compare", cid)
    for view_name, view in cap.get("views", {}).items():
        if "ortho_width" not in view:
            continue
        loc_b, rot = camera_pose(cam, view)
        out = os.path.join(out_dir, f"target_{view_name}.png")
        bpy.context.scene.render.filepath = out
        bpy.ops.render.render(write_still=True)
        log(f"rendered {view_name} cam={tuple(round(v,3) for v in loc_b)} rot={tuple(round(v,1) for v in rot)} -> {out}")
    log("TARGET RENDER DONE")


if __name__ == "__main__":
    main()
