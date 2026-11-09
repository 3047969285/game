"""U1A《周四的沉默》UE 垂直切片场景（P1）：用正式材质/灯光/相机搭 clubRoom 白盒升级版。

输出：/Game/Memory/Scenes/L_Unit01A
- 房间：地板/四墙/窗洞/天花板/长桌/椅子/黑板/书架/植物/灯具（BasicShapes + 自建无光照材质）
- 灯光：DirectionalLight（低角度暖阳）+ SkyLight + RectLight（窗口）+ 点光
- 相机：stage.shots 的四台 CineCameraActor
- 角色：若存在 BP_<id> 则放 2 个（me2026 / lin）
运行：UE_LOCK_WHO=deepseek Tools/run_ue_serial.sh "$ED" "$UE/WordQuestUE.uproject" \
      -ExecutePythonScript="$UE/Tools/build_unit01a_scene.py" -unattended -nosplash
"""
from __future__ import annotations

import json
import math
import os

import unreal

ROOT = unreal.Paths.project_dir()
SCENE_ID = os.environ.get("SCENE_ID", "unit01_section_a")
LEVEL = os.environ.get("LEVEL_PATH", "/Game/Memory/Scenes/L_Unit01A")
SCENES = os.path.join(ROOT, "Content", "Data", "Memory", "scenes.json")
STAGES = os.path.join(ROOT, "Content", "Data", "Memory", "stages.json")
LOG = unreal.log_warning


def load_json(p):
    with open(p, encoding="utf-8") as fh:
        return json.load(fh)


def vec(x, y, z):
    """UE 坐标（X 右、Y 前、Z 上），单位米。"""
    return unreal.Vector(float(x) * 100.0, float(y) * 100.0, float(z) * 100.0)


def wpos(p):
    """Web 舞台坐标（x 右、y 上、z 前，单位米）→ UE（X=x, Y=z, Z=y）。"""
    return unreal.Vector(float(p.get("x", 0)) * 100.0, float(p.get("z", 0)) * 100.0, float(p.get("y", 0)) * 100.0)


def make_material(name, rgb, roughness):
    assets = unreal.AssetToolsHelpers.get_asset_tools()
    path = "/Game/Memory/Materials"
    full = f"{path}/{name}"
    if unreal.EditorAssetLibrary.does_asset_exist(full):
        return unreal.EditorAssetLibrary.load_asset(full)
    mat = assets.create_asset(name, path, unreal.Material, unreal.MaterialFactoryNew())
    color = unreal.MaterialEditingLibrary.create_material_expression(mat, unreal.MaterialExpressionConstant3Vector, -500, 0)
    color.set_editor_property("constant", unreal.LinearColor(rgb[0], rgb[1], rgb[2], 1.0))
    rugh = unreal.MaterialEditingLibrary.create_material_expression(mat, unreal.MaterialExpressionConstant, -500, 160)
    rugh.set_editor_property("r", roughness)
    unreal.MaterialEditingLibrary.connect_material_property(color, "", unreal.MaterialProperty.MP_BASE_COLOR)
    unreal.MaterialEditingLibrary.connect_material_property(rugh, "", unreal.MaterialProperty.MP_ROUGHNESS)
    unreal.MaterialEditingLibrary.recompile_material(mat)
    unreal.EditorAssetLibrary.save_asset(full)
    LOG(f"[u01a] material {name}")
    return mat


def cube(actor_sys, mesh, label, loc, size, mat):
    a = actor_sys.spawn_actor_from_class(unreal.StaticMeshActor, loc, unreal.Rotator(0, 0, 0))
    a.static_mesh_component.set_static_mesh(mesh)
    a.set_actor_scale3d(unreal.Vector(size[0], size[1], size[2]))
    a.set_actor_label(label)
    if mat:
        a.static_mesh_component.set_material(0, mat)
    return a


def look_rot(frm, to):
    d = to - frm
    yaw = math.degrees(math.atan2(d.y, d.x))
    pitch = math.degrees(math.atan2(d.z, math.hypot(d.x, d.y)))
    return unreal.Rotator(roll=0.0, pitch=pitch, yaw=yaw)


def main():
    scenes = load_json(SCENES)["scenes"]
    stages = load_json(STAGES)["stages"]
    sc = next((s for s in scenes if s["sceneId"] == SCENE_ID), None)
    if not sc:
        raise RuntimeError(f"scene not found: {SCENE_ID}")
    st = stages[sc["stage"]]
    b = st["bounds"]
    W = (b["maxX"] - b["minX"])
    D = (b["maxZ"] - b["minZ"])
    cx = (b["minX"] + b["maxX"]) / 2
    cz = (b["minZ"] + b["maxZ"]) / 2

    les = unreal.get_editor_subsystem(unreal.LevelEditorSubsystem)
    eas = unreal.get_editor_subsystem(unreal.EditorActorSubsystem)
    if unreal.EditorAssetLibrary.does_asset_exist(LEVEL):
        les.load_level(LEVEL)
        for a in list(eas.get_all_level_actors()):
            eas.destroy_actor(a)
    elif not les.new_level(LEVEL):
        raise RuntimeError(f"new_level failed: {LEVEL}")

    mesh = unreal.EditorAssetLibrary.load_asset("/Engine/BasicShapes/Cube.Cube")
    plaster = make_material("M_U01A_Plaster", (0.72, 0.70, 0.66), 0.92)
    wood = make_material("M_U01A_Wood", (0.34, 0.22, 0.13), 0.62)
    dark = make_material("M_U01A_Dark", (0.06, 0.07, 0.08), 0.7)
    cloth = make_material("M_U01A_Cloth", (0.18, 0.22, 0.26), 0.95)
    paper = make_material("M_U01A_Paper", (0.86, 0.83, 0.74), 0.95)
    leaf = make_material("M_U01A_Leaf", (0.10, 0.22, 0.12), 0.9)

    # 房间：5.5×4 边界 → 11×8m，墙高 3.4
    cube(eas, mesh, "floor", vec(cx, cz, -0.06), (W, D, 0.12), wood)
    cube(eas, mesh, "ceiling", vec(cx, cz, 3.45), (W, D, 0.10), plaster)
    cube(eas, mesh, "wall_south", vec(cx, b["maxZ"], 1.7), (W, 0.20, 3.4), plaster)
    cube(eas, mesh, "wall_west", vec(b["minX"], cz, 1.7), (0.20, D, 3.4), plaster)
    cube(eas, mesh, "wall_east", vec(b["maxX"], cz, 1.7), (0.20, D, 3.4), plaster)
    # 北墙（窗）：窗洞 x∈[-2.9,2.9], y∈[0.6,3.0]
    cube(eas, mesh, "wall_north_left", vec(b["minX"] + (2.75 - (-5.5)) / 2, b["minZ"], 1.7), (2.75 - (-5.5), 0.20, 3.4), plaster)
    cube(eas, mesh, "wall_north_right", vec(b["maxX"] - (5.5 - 2.75) / 2, b["minZ"], 1.7), (5.5 - 2.75, 0.20, 3.4), plaster)
    cube(eas, mesh, "wall_north_sill", vec(cx, b["minZ"], 0.3), (5.8, 0.20, 0.6), plaster)
    cube(eas, mesh, "wall_north_header", vec(cx, b["minZ"], 3.2), (5.8, 0.20, 0.4), plaster)
    cube(eas, mesh, "window_glass", vec(cx, b["minZ"] - 0.02, 1.8), (5.8, 0.02, 2.4), dark)

    # 长桌 + 椅子（clubRoom: 4.9×1.0×0.75，z=-0.25）
    cube(eas, mesh, "table_top", vec(0, -0.25, 0.73), (4.9, 1.0, 0.05), wood)
    for x in (-2.2, 2.2):
        for z in (-0.6, 0.1):
            cube(eas, mesh, "table_leg", vec(x, -0.25 + z, 0.37), (0.08, 0.08, 0.72), wood)
    for x, z, yaw in ((2.8, -0.25, 90), (0.9, -1.1, 0), (-0.6, -1.1, 0), (-2.8, -0.25, 90), (-1.3, 0.6, 0)):
        cube(eas, mesh, "chair", vec(x, z, 0.25), (0.42, 0.42, 0.05), cloth)
        cube(eas, mesh, "chair_back", vec(x, z - 0.20, 0.62), (0.42, 0.05, 0.55), cloth)
    cube(eas, mesh, "board", vec(b["minX"] + 0.12, 0.2, 1.6), (0.06, 2.4, 1.2), dark)
    cube(eas, mesh, "shelf", vec(b["maxX"] - 0.3, -1.2, 1.1), (0.45, 2.0, 2.2), wood)
    cube(eas, mesh, "lamp", vec(-2.4, -1.4, 1.5), (0.22, 0.22, 0.35), paper)
    for i in range(4):
        cube(eas, mesh, f"plant_{i}", vec(-4.6 + i * 0.4, 2.6, 0.4 + i * 0.05), (0.25, 0.25, 0.8), leaf)

    # 灯光：低角度暖阳 + 天光 + 窗口面光
    sun = eas.spawn_actor_from_class(unreal.DirectionalLight, vec(-2, 3, 5), unreal.Rotator(0, -28, -35))
    sun.set_actor_label("sun_sunset")
    sun.light_component.set_editor_property("intensity", 8.0)
    sun.light_component.set_editor_property("light_color", unreal.Color(r=255, g=196, b=142, a=255))
    sun.light_component.set_editor_property("cast_shadows", True)
    sky = eas.spawn_actor_from_class(unreal.SkyLight, vec(0, 0, 6))
    sky.set_actor_label("sky_light")
    sky.light_component.set_editor_property("intensity", 0.8)
    rect = eas.spawn_actor_from_class(unreal.RectLight, vec(cx, b["minZ"] + 0.2, 1.8), unreal.Rotator(0, 90, 0))
    rect.set_actor_label("window_light")
    rect.light_component.set_editor_property("intensity", 3000.0)
    rect.light_component.set_editor_property("light_color", unreal.Color(r=255, g=214, b=170, a=255))
    for i, (x, z) in enumerate(((-2.2, -1.2), (2.2, -1.2), (-2.2, 1.0), (2.2, 1.0))):
        p = eas.spawn_actor_from_class(unreal.PointLight, vec(x, z, 2.2))
        p.set_actor_label(f"fill_{i}")
        p.light_component.set_editor_property("intensity", 900.0)
        p.light_component.set_editor_property("light_color", unreal.Color(r=255, g=220, b=180, a=255))
    eas.spawn_actor_from_class(unreal.ExponentialHeightFog, vec(0, 0, 0)).set_actor_label("fog")

    # 相机：shots
    for i, shot in enumerate(st.get("shots", [])):
        to = shot.get("to", {})
        look = shot.get("look", {})
        pos = wpos(to)
        if pos.z <= 0:
            pos.z = 180.0
        cam = eas.spawn_actor_from_class(unreal.CineCameraActor, pos, look_rot(pos, wpos(look)))
        cam.set_actor_label(f"cam_{i:02d}")
        cam.camera_component.set_field_of_view(float(shot.get("fov", 50)))

    # 角色：已有 BP 才放（不修改蓝图）
    for aid, x, z, yaw in (("me2026", 2.8, -0.25, -90), ("lin", 0.9, -1.1, 0)):
        bp = f"/Game/Blueprints/Characters/BP_{aid}"
        if unreal.EditorAssetLibrary.does_asset_exist(bp):
            cls = unreal.load_class(None, bp + f".BP_{aid}_C")
            if cls:
                a = eas.spawn_actor_from_class(cls, vec(x, z, 0), unreal.Rotator(0, yaw, 0))
                a.set_actor_label(f"actor_{aid}")
                LOG(f"[u01a] spawned {aid}")
        else:
            LOG(f"[u01a] no BP for {aid}")

    les.save_current_level()
    LOG(f"[u01a] DONE level={LEVEL}")


try:
    main()
finally:
    if os.environ.get("QUIT") == "1":
        unreal.SystemLibrary.execute_console_command(None, "log flush")
        os._exit(0)
