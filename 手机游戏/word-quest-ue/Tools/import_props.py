"""Claude · textbook scenes: import the code-built prop library into UE.

Input : SourceArt/Props/SM_<kit>.fbx + SM_<kit>.materials.json (written by Tools/props/kit_common.py in Blender)
Output: /Game/Memory/Props/SM_<kit>                  static meshes (what Tools/build_textbook_scene.py places)
        /Game/Memory/Props/Materials/M_PropMaster    opaque master (BaseColor / Roughness / Metallic / Emissive)
        /Game/Memory/Props/Materials/M_PropGlass     translucent master (+ Opacity)
        /Game/Memory/Props/Materials/MI_<kit>_<slot> one instance per material slot, values from the sidecar JSON

Run in the full editor through the project lock (Docs/tasks/ue-run-rules.md):
  UE_LOCK_WHO=claude Tools/run_ue_serial.sh "$ED" "$PWD/WordQuestUE.uproject" \
      -ExecutePythonScript="$PWD/Tools/import_props.py" -unattended -nosplash
Env: PROP_KITS="armchair,sofa" limits the import; PROP_QUIT=1 exits the editor afterwards.
"""
import glob
import json
import os

import unreal

ROOT = unreal.Paths.project_dir()
SRC = os.path.join(ROOT, "SourceArt", "Props")
DEST = "/Game/Memory/Props"
MATS = f"{DEST}/Materials"
MEL = unreal.MaterialEditingLibrary
EAL = unreal.EditorAssetLibrary


def log(m):
    unreal.log_warning(f"[import_props] {m}")


def srgb_to_linear(h):
    h = (h or "#808080").lstrip("#")
    out = []
    for i in (0, 2, 4):
        c = int(h[i:i + 2], 16) / 255.0
        out.append(c / 12.92 if c <= 0.04045 else ((c + 0.055) / 1.055) ** 2.4)
    return unreal.LinearColor(out[0], out[1], out[2], 1.0)


def master(name, translucent):
    path = f"{MATS}/{name}"
    if EAL.does_asset_exist(path):
        return EAL.load_asset(path)
    tools = unreal.AssetToolsHelpers.get_asset_tools()
    m = tools.create_asset(name, MATS, unreal.Material, unreal.MaterialFactoryNew())
    if translucent:
        m.set_editor_property("blend_mode", unreal.BlendMode.BLEND_TRANSLUCENT)
        m.set_editor_property("translucency_lighting_mode", unreal.TranslucencyLightingMode.TLM_SURFACE)

    def vparam(pname, default, x, y):
        n = MEL.create_material_expression(m, unreal.MaterialExpressionVectorParameter, x, y)
        n.set_editor_property("parameter_name", pname)
        n.set_editor_property("default_value", default)
        return n

    def sparam(pname, default, x, y):
        n = MEL.create_material_expression(m, unreal.MaterialExpressionScalarParameter, x, y)
        n.set_editor_property("parameter_name", pname)
        n.set_editor_property("default_value", default)
        return n

    base = vparam("BaseColor", unreal.LinearColor(0.5, 0.5, 0.5, 1), -700, -200)
    rough = sparam("Roughness", 0.6, -700, 0)
    metal = sparam("Metallic", 0.0, -700, 100)
    emis = vparam("EmissiveColor", unreal.LinearColor(0, 0, 0, 1), -900, 250)
    estr = sparam("EmissiveStrength", 0.0, -900, 400)
    mul = MEL.create_material_expression(m, unreal.MaterialExpressionMultiply, -500, 300)
    MEL.connect_material_expressions(emis, "", mul, "A")
    MEL.connect_material_expressions(estr, "", mul, "B")
    MEL.connect_material_property(base, "", unreal.MaterialProperty.MP_BASE_COLOR)
    MEL.connect_material_property(rough, "", unreal.MaterialProperty.MP_ROUGHNESS)
    MEL.connect_material_property(metal, "", unreal.MaterialProperty.MP_METALLIC)
    MEL.connect_material_property(mul, "", unreal.MaterialProperty.MP_EMISSIVE_COLOR)
    if translucent:
        op = sparam("Opacity", 0.3, -700, 500)
        MEL.connect_material_property(op, "", unreal.MaterialProperty.MP_OPACITY)
    MEL.recompile_material(m)
    EAL.save_asset(path)
    log(f"created {name}")
    return m


def instance(kit, slot, params, opaque, glass):
    alpha = float(params.get("alpha", 1.0))
    parent = glass if alpha < 0.99 else opaque
    name = f"MI_{kit}_{slot}".replace(".", "_")
    path = f"{MATS}/{name}"
    tools = unreal.AssetToolsHelpers.get_asset_tools()
    mi = EAL.load_asset(path) if EAL.does_asset_exist(path) else \
        tools.create_asset(name, MATS, unreal.MaterialInstanceConstant, unreal.MaterialInstanceConstantFactoryNew())
    MEL.set_material_instance_parent(mi, parent)
    MEL.set_material_instance_vector_parameter_value(mi, "BaseColor", srgb_to_linear(params.get("color")))
    MEL.set_material_instance_scalar_parameter_value(mi, "Roughness", float(params.get("roughness", 0.6)))
    MEL.set_material_instance_scalar_parameter_value(mi, "Metallic", float(params.get("metallic", 0.0)))
    if params.get("emission"):
        MEL.set_material_instance_vector_parameter_value(mi, "EmissiveColor", srgb_to_linear(params["emission"]))
        MEL.set_material_instance_scalar_parameter_value(mi, "EmissiveStrength", float(params.get("emission_strength", 0.0)))
    if alpha < 0.99:
        MEL.set_material_instance_scalar_parameter_value(mi, "Opacity", alpha)
    EAL.save_asset(path)
    return mi


def import_kit(fbx, opaque, glass):
    kit = os.path.basename(fbx)[3:-4]
    task = unreal.AssetImportTask()
    task.filename = fbx
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
    unreal.AssetToolsHelpers.get_asset_tools().import_asset_tasks([task])
    mesh = unreal.load_asset(f"{DEST}/SM_{kit}")
    if mesh is None:
        log(f"FAILED {kit}")
        return False
    side = os.path.join(SRC, f"SM_{kit}.materials.json")
    params = json.load(open(side, encoding="utf-8"))["materials"] if os.path.exists(side) else {}
    for i, slot in enumerate(mesh.static_materials):
        sname = str(slot.material_slot_name)
        p = params.get(sname) or params.get(sname.split(".")[0]) or {"color": "#8A8A8A"}
        mesh.set_material(i, instance(kit, sname, p, opaque, glass))
    EAL.save_asset(f"{DEST}/SM_{kit}")
    b = mesh.get_bounding_box()
    log(f"imported {kit}: slots {len(mesh.static_materials)} size_cm {round(b.max.x - b.min.x)}x{round(b.max.y - b.min.y)}x{round(b.max.z - b.min.z)}")
    return True


def main():
    opaque = master("M_PropMaster", False)
    glass = master("M_PropGlass", True)
    only = {k.strip() for k in os.environ.get("PROP_KITS", "").split(",") if k.strip()}
    files = sorted(glob.glob(os.path.join(SRC, "SM_*.fbx")))
    if only:
        files = [f for f in files if os.path.basename(f)[3:-4] in only]
    ok = sum(import_kit(f, opaque, glass) for f in files)
    log(f"PROPS DONE {ok}/{len(files)}")


try:
    main()
except Exception as e:  # noqa: BLE001
    unreal.log_error(f"[import_props] FAILED: {e}")
finally:
    if os.environ.get("PROP_QUIT") == "1":
        unreal.SystemLibrary.execute_console_command(None, "log flush")
        os._exit(0)
