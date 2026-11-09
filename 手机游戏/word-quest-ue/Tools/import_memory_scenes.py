"""从 Content/Data/Memory/scenes.json 生成 UE 白盒关卡（P0/P1 管线验证）。

用法（完整编辑器，串行锁）：
  BUILD_LEVELS=1 UE_LOCK_WHO=deepseek Tools/run_ue_serial.sh "$ED" "$UE/WordQuestUE.uproject" \
    -ExecutePythonScript="$UE/Tools/import_memory_scenes.py" -unattended -nosplash

环境变量：
  SCENE=unit01_section_a   只生成一篇（缺省全部 18 篇）
  BUILD_LEVELS=1           1=生成关卡；0/缺省=只校验
  QUIT=1                   完成后退回码 0（保存后 os._exit，避免析构崩溃）

生成内容（每篇一个 level）：
  - 每个 target 一个命名白盒（按 target 名给近似位置/尺度）
  - cameras：shots 的 to 位置 + 朝向 look
  - target points：slots（table/hover/floor）+ 词物件 wordId + 角色 id
  - 关卡保存到 /Game/Memory/Whitebox/L_<sceneId>
"""
from __future__ import annotations

import json
import math
import os

import unreal

ROOT = unreal.Paths.project_dir()
DATA = os.path.join(ROOT, "Content", "Data", "Memory", "scenes.json")
CUBE = "/Engine/BasicShapes/Cube.Cube"
OUT_DIR = "/Game/Memory/Whitebox"
LOG = unreal.log_warning


def load_scenes():
    with open(DATA, encoding="utf-8") as fh:
        return json.load(fh)


def to_vec(p):
    return unreal.Vector(float(p.get("x", 0)) * 100.0, float(p.get("y", 0)) * 100.0, float(p.get("z", 0)) * 100.0)


def piece_transform(name: str, st: dict):
    b = st["bounds"]
    cx = (b["minX"] + b["maxX"]) / 2
    cz = (b["minZ"] + b["maxZ"]) / 2
    w = b["maxX"] - b["minX"]
    d = b["maxZ"] - b["minZ"]
    if name == "floor":
        return (cx, 0, cz), (w / 100.0, 0.02, d / 100.0)
    if name.startswith("wall_"):
        if name in ("wall_back", "wall_front"):
            z = b["minZ"] if name == "wall_back" else b["maxZ"]
            return (cx, 1.6, z), (w / 100.0, 3.2, 0.02)
        x = b["minX"] if name == "wall_left" else b["maxX"]
        return (x, 1.6, cz), (0.02, 3.2, d / 100.0)
    if name == "ceiling":
        return (cx, 3.1, cz), (w / 100.0, 0.02, d / 100.0)
    slots = st.get("slots", {})
    if name in ("table", "desk", "workbench", "counter", "consoles", "exchange_shelf"):
        pts = slots.get("table") or [{"x": cx, "y": 0.75, "z": cz}]
        avg = {"x": sum(p["x"] for p in pts) / len(pts), "y": sum(p["y"] for p in pts) / len(pts), "z": sum(p["z"] for p in pts) / len(pts)}
        return (avg["x"], max(0.4, avg["y"] - 0.1), avg["z"]), (1.2, 0.1, 0.6)
    if name in ("window",):
        return (cx, 1.6, b["minZ"]), (0.8, 0.8, 0.02)
    if name in ("shelf", "shelves", "cabinet", "bookcase"):
        return (b["maxX"] - 0.3, 1.0, cz), (0.3, 2.0, 1.0)
    # 其它部件：沿相机可读的一侧排开
    n = abs(hash(name)) % 5
    return (cx + (n - 2) * 0.9, 0.8, cz + (n - 2) * 0.5), (0.5, 0.8, 0.5)


def look_rot(from_p, look_p):
    d = (look_p - from_p)
    yaw = math.degrees(math.atan2(d.y, d.x))
    pitch = math.degrees(math.atan2(d.z, math.hypot(d.x, d.y)))
    return unreal.Rotator(roll=0.0, pitch=pitch, yaw=yaw)


def build_scene(sc: dict, st: dict, actor_sys, mesh):
    les = unreal.get_editor_subsystem(unreal.LevelEditorSubsystem)
    path = f"{OUT_DIR}/L_{sc['sceneId']}"
    if not les.new_level(path):
        LOG(f"[memory-import] 新建关卡失败 {path}")
        return False
    for name in st.get("targetNames", []):
        (x, y, z), (sx, sy, sz) = piece_transform(name, st)
        a = actor_sys.spawn_actor_from_class(unreal.StaticMeshActor, to_vec({"x": x, "y": y, "z": z}), unreal.Rotator(0, 0, 0))
        a.static_mesh_component.set_static_mesh(mesh)
        a.set_actor_scale3d(unreal.Vector(sx, sy, sz))
        a.set_actor_label(f"piece_{name}")
    for i, shot in enumerate(st.get("shots", [])):
        to = shot.get("to", {})
        look = shot.get("look", {})
        pos = to_vec(to)
        cam = actor_sys.spawn_actor_from_class(unreal.CameraActor, pos, look_rot(pos, to_vec(look)))
        cam.set_actor_label(f"cam_{i:02d}")
        if shot.get("fov"):
            cam.camera_component.set_field_of_view(float(shot["fov"]))
    slots = st.get("slots", {})
    for kind, pts in slots.items():
        for i, p in enumerate(pts):
            tp = actor_sys.spawn_actor_from_class(unreal.TargetPoint, to_vec(p), unreal.Rotator(0, 0, 0))
            tp.set_actor_label(f"slot_{kind}_{i:02d}")
    for obj in sc.get("script", {}).get("objects", []):
        tp = actor_sys.spawn_actor_from_class(unreal.TargetPoint, to_vec(obj.get("position", {})), unreal.Rotator(0, 0, 0))
        tp.set_actor_label(f"word_{obj.get('wordId', '?')}")
    for actor in sc.get("script", {}).get("actors", []):
        tp = actor_sys.spawn_actor_from_class(unreal.TargetPoint, to_vec(actor.get("position", {})), unreal.Rotator(0, actor.get("rotationY", 0), 0))
        tp.set_actor_label(f"actor_{actor.get('id', '?')}")
    les.save_current_level()
    LOG(f"[memory-import] 白盒已保存 {path}")
    return True


def main():
    data = load_scenes()
    scenes = data.get("scenes", [])
    stages = data.get("stages", {})
    only = os.environ.get("SCENE", "").strip()
    build = os.environ.get("BUILD_LEVELS", "0") == "1"
    LOG(f"[memory-import] scenes={len(scenes)} stages={len(stages)} build={build} only={only or 'ALL'}")
    errors = [s.get("sceneId") for s in scenes if s.get("stage") not in stages]
    if errors:
        LOG(f"[memory-import] 引用缺失: {errors[:5]}")
    if not build:
        LOG("[memory-import] 只校验，未建关卡（BUILD_LEVELS=1 才会建）")
        return
    if not unreal.EditorAssetLibrary.does_directory_exist(OUT_DIR):
        unreal.EditorAssetLibrary.make_directory(OUT_DIR)
    mesh = unreal.EditorAssetLibrary.load_asset(CUBE)
    actor_sys = unreal.get_editor_subsystem(unreal.EditorActorSubsystem)
    built = 0
    for sc in scenes:
        if only and sc.get("sceneId") != only:
            continue
        st = stages.get(sc.get("stage"))
        if not st:
            continue
        if build_scene(sc, st, actor_sys, mesh):
            built += 1
    LOG(f"[memory-import] DONE built={built}")


try:
    main()
finally:
    if os.environ.get("QUIT") == "1":
        unreal.SystemLibrary.execute_console_command(None, "log flush")
        os._exit(0)
