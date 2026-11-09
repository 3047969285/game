"""Claude · textbook scenes: import hero props (baked-PBR, code-built) into UE.

Input : SourceArt/Props/Hero/SM_<kit>.fbx + SM_<kit>.hero.json + T_<kit>_<slot>_*.png (Tools/props/hero_common.py)
Output: /Game/Memory/Props/Hero/SM_<kit>                       static mesh, Nanite on
        /Game/Memory/Props/Hero/Textures/T_<kit>_<slot>_<map>   BaseColor (sRGB) / Normal (green flipped) / ARM (masks)
        /Game/Memory/Props/Hero/Materials/M_HeroPBR            BaseColor + Normal + ARM (AO, Roughness, Metallic)
        /Game/Memory/Props/Hero/Materials/M_HeroScreen         emissive image x EmissiveStrength (screens, signs)
        /Game/Memory/Props/Hero/Materials/MI_<kit>_<slot>      one instance per slot
kit_assets.json then maps the kit to /Game/Memory/Props/Hero/SM_<kit> (scale 1, the FBX is real size).

Run in the full editor through the project lock (Docs/tasks/ue-run-rules.md):
  HERO_KITS=phone PROP_QUIT=1 UE_LOCK_WHO=claude Tools/run_ue_serial.sh "$ED" "$PWD/WordQuestUE.uproject" \\
      -ExecutePythonScript="$PWD/Tools/import_hero_props.py" -unattended -nosplash
"""
import glob
import json
import os

import unreal

ROOT = unreal.Paths.project_dir()
SRC = os.path.join(ROOT, "SourceArt", "Props", "Hero")
DEST = "/Game/Memory/Props/Hero"
TEX = f"{DEST}/Textures"
MATS = f"{DEST}/Materials"
MEL = unreal.MaterialEditingLibrary
EAL = unreal.EditorAssetLibrary
TOOLS = unreal.AssetToolsHelpers.get_asset_tools()


def log(m):
    unreal.log_warning(f"[import_hero] {m}")


def tex_param(m, name, sampler, x, y):
    n = MEL.create_material_expression(m, unreal.MaterialExpressionTextureSampleParameter2D, x, y)
    n.set_editor_property("parameter_name", name)
    n.set_editor_property("sampler_type", sampler)
    return n


def master_pbr():
    path = f"{MATS}/M_HeroPBR"
    if EAL.does_asset_exist(path):
        return EAL.load_asset(path)
    m = TOOLS.create_asset("M_HeroPBR", MATS, unreal.Material, unreal.MaterialFactoryNew())
    base = tex_param(m, "BaseColor", unreal.MaterialSamplerType.SAMPLERTYPE_COLOR, -800, -300)
    normal = tex_param(m, "Normal", unreal.MaterialSamplerType.SAMPLERTYPE_NORMAL, -800, 0)
    arm = tex_param(m, "ARM", unreal.MaterialSamplerType.SAMPLERTYPE_MASKS, -800, 300)
    MEL.connect_material_property(base, "RGB", unreal.MaterialProperty.MP_BASE_COLOR)
    MEL.connect_material_property(normal, "RGB", unreal.MaterialProperty.MP_NORMAL)
    MEL.connect_material_property(arm, "R", unreal.MaterialProperty.MP_AMBIENT_OCCLUSION)
    MEL.connect_material_property(arm, "G", unreal.MaterialProperty.MP_ROUGHNESS)
    MEL.connect_material_property(arm, "B", unreal.MaterialProperty.MP_METALLIC)
    MEL.recompile_material(m)
    EAL.save_asset(path)
    return m


def master_screen():
    path = f"{MATS}/M_HeroScreen"
    if EAL.does_asset_exist(path):
        return EAL.load_asset(path)
    m = TOOLS.create_asset("M_HeroScreen", MATS, unreal.Material, unreal.MaterialFactoryNew())
    em = tex_param(m, "Emissive", unreal.MaterialSamplerType.SAMPLERTYPE_COLOR, -800, 0)
    s = MEL.create_material_expression(m, unreal.MaterialExpressionScalarParameter, -800, 300)
    s.set_editor_property("parameter_name", "EmissiveStrength")
    s.set_editor_property("default_value", 2.0)
    mul = MEL.create_material_expression(m, unreal.MaterialExpressionMultiply, -500, 100)
    MEL.connect_material_expressions(em, "RGB", mul, "A")
    MEL.connect_material_expressions(s, "", mul, "B")
    MEL.connect_material_property(mul, "", unreal.MaterialProperty.MP_EMISSIVE_COLOR)
    dark = MEL.create_material_expression(m, unreal.MaterialExpressionConstant3Vector, -500, -200)
    dark.set_editor_property("constant", unreal.LinearColor(0.002, 0.0025, 0.003, 1))
    MEL.connect_material_property(dark, "", unreal.MaterialProperty.MP_BASE_COLOR)
    rough = MEL.create_material_expression(m, unreal.MaterialExpressionConstant, -500, 300)
    rough.set_editor_property("r", 0.05)
    MEL.connect_material_property(rough, "", unreal.MaterialProperty.MP_ROUGHNESS)
    MEL.recompile_material(m)
    EAL.save_asset(path)
    return m


def import_texture(png, role):
    name = os.path.splitext(os.path.basename(png))[0]
    task = unreal.AssetImportTask()
    task.filename = png
    task.destination_path = TEX
    task.destination_name = name
    task.automated = True
    task.replace_existing = True
    task.save = False
    TOOLS.import_asset_tasks([task])
    t = unreal.load_asset(f"{TEX}/{name}")
    if role == "Normal":
        t.set_editor_property("compression_settings", unreal.TextureCompressionSettings.TC_NORMALMAP)
        t.set_editor_property("flip_green_channel", True)          # baked in Blender = OpenGL convention
        t.set_editor_property("srgb", False)
    elif role == "ARM":
        t.set_editor_property("compression_settings", unreal.TextureCompressionSettings.TC_MASKS)
        t.set_editor_property("srgb", False)
    EAL.save_asset(f"{TEX}/{name}")
    return t


def import_kit(manifest_path, pbr, screen):
    man = json.load(open(manifest_path, encoding="utf-8"))
    kit = man["kit"]
    task = unreal.AssetImportTask()
    task.filename = os.path.join(SRC, f"SM_{kit}.fbx")
    task.destination_path = DEST
    task.destination_name = f"SM_{kit}"
    task.automated = True
    task.replace_existing = True
    task.save = True
    opts = unreal.FbxImportUI()
    opts.import_mesh = True
    opts.import_as_skeletal = False
    opts.import_materials = False
    opts.import_textures = False
    opts.mesh_type_to_import = unreal.FBXImportType.FBXIT_STATIC_MESH
    opts.static_mesh_import_data.combine_meshes = True
    opts.static_mesh_import_data.generate_lightmap_u_vs = False
    opts.static_mesh_import_data.auto_generate_collision = True
    task.options = opts
    TOOLS.import_asset_tasks([task])
    mesh = unreal.load_asset(f"{DEST}/SM_{kit}")
    if mesh is None:
        log(f"FAILED {kit}: no mesh")
        return False
    nanite = mesh.get_editor_property("nanite_settings")
    nanite.set_editor_property("enabled", True)
    mesh.set_editor_property("nanite_settings", nanite)
    by_mat = {s["material"]: s for s in man["slots"]}
    missing = []
    for i, sm in enumerate(mesh.static_materials):
        sname = str(sm.material_slot_name).split(".")[0]
        s = by_mat.get(sname)
        if s is None:
            missing.append(sname)
            continue
        if "Material" in s:                                     # existing UE material (memory FX)
            ext = unreal.load_asset(s["Material"])
            if ext is None:
                missing.append(s["Material"])
                continue
            mesh.set_material(i, ext)
            continue
        name = f"MI_{kit}_{s['slot']}"
        path = f"{MATS}/{name}"
        mi = EAL.load_asset(path) if EAL.does_asset_exist(path) else \
            TOOLS.create_asset(name, MATS, unreal.MaterialInstanceConstant, unreal.MaterialInstanceConstantFactoryNew())
        if "Emissive" in s:
            MEL.set_material_instance_parent(mi, screen)
            src = s["Emissive"] if os.path.isabs(s["Emissive"]) else os.path.join(SRC, "screens", s["Emissive"])
            MEL.set_material_instance_texture_parameter_value(mi, "Emissive", import_texture(src, "Emissive"))
            MEL.set_material_instance_scalar_parameter_value(mi, "EmissiveStrength", float(s.get("strength", 2.0)))
        else:
            MEL.set_material_instance_parent(mi, pbr)
            for role in ("BaseColor", "Normal", "ARM"):
                MEL.set_material_instance_texture_parameter_value(mi, role, import_texture(os.path.join(SRC, s[role]), role))
        EAL.save_asset(path)
        mesh.set_material(i, mi)
    EAL.save_asset(f"{DEST}/SM_{kit}")
    b = mesh.get_bounding_box()
    log(f"imported {kit}: slots {len(mesh.static_materials)} missing {missing} nanite on "
        f"size_cm {b.max.x - b.min.x:.1f}x{b.max.y - b.min.y:.1f}x{b.max.z - b.min.z:.1f}")
    return not missing


def main():
    for d in (DEST, TEX, MATS):
        if not EAL.does_directory_exist(d):
            EAL.make_directory(d)
    pbr, screen = master_pbr(), master_screen()
    only = {k.strip() for k in os.environ.get("HERO_KITS", "").split(",") if k.strip()}
    files = sorted(glob.glob(os.path.join(SRC, "SM_*.hero.json")))
    if only:
        files = [f for f in files if os.path.basename(f)[3:-10] in only]
    ok = sum(import_kit(f, pbr, screen) for f in files)
    log(f"HERO IMPORT DONE {ok}/{len(files)}")


try:
    main()
except Exception as e:  # noqa: BLE001
    unreal.log_error(f"[import_hero] FAILED: {e}")
finally:
    if os.environ.get("PROP_QUIT") == "1":
        unreal.SystemLibrary.execute_console_command(None, "log flush")
        os._exit(0)
