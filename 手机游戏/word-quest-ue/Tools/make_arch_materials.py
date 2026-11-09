"""Claude · architecture surfaces: world-aligned PBR materials for walls, floors, streets and ground.

/Game/Memory/Materials/Arch/M_ArchWorld      tri-planar (WorldAlignedTexture) BaseColor x Tint, Normal, ARM;
                                             TileSize (cm) keeps texel density constant when kits are stretched
/Game/Memory/Materials/Arch/MI_Arch_<name>   one instance per surface, textures from the imported Poly Haven sets
                                             (/Game/PolyHaven/Materials/<id>/MI_<id>) or from SourceArt/Arch (generated)

Surfaces are listed in SURFACES below; kit_assets.json maps architecture kits to /Game/Memory/Props/Hero/SM_arch_box
(fit: size) with a material override to one of these instances.

Run through the project lock:
  PROP_QUIT=1 UE_LOCK_WHO=claude Tools/run_ue_serial.sh "$ED" "$PWD/WordQuestUE.uproject" \\
      -ExecutePythonScript="$PWD/Tools/make_arch_materials.py" -unattended -nosplash
"""
import os

import unreal

DEST = "/Game/Memory/Materials/Arch"
MEL = unreal.MaterialEditingLibrary
EAL = unreal.EditorAssetLibrary
WAT = "/Engine/Functions/Engine_MaterialFunctions01/Texturing/WorldAlignedTexture.WorldAlignedTexture"
WAN = "/Engine/Functions/Engine_MaterialFunctions01/Texturing/WorldAlignedNormal.WorldAlignedNormal"

# name: (poly haven id, tile size cm, tint sRGB hex)
SURFACES = {
    "plaster": ("painted_plaster_wall", 220.0, "#FFFFFF"),
    "plaster_warm": ("painted_plaster_wall", 220.0, "#F2E6D6"),
    "asphalt": ("asphalt_02", 300.0, "#FFFFFF"),
    "brick_red": ("brick_4", 160.0, "#FFFFFF"),
    "brick_grey": ("brick_4", 160.0, "#9A9C9E"),           # hutong grey brick: desaturate + darken the red brick
    "concrete": ("concrete_floor_02", 250.0, "#FFFFFF"),
    "pavement": ("checkered_pavement_tiles", 200.0, "#FFFFFF"),
    "wood_floor": ("wood_floor_worn", 200.0, "#FFFFFF"),
    "marble": ("marble_01", 180.0, "#FFFFFF"),
    "carpet": ("dirty_carpet", 200.0, "#FFFFFF"),
    # CC0 scans downloaded 2026-10-23 (Tools/download_polyhaven_textures.py)
    "grass": ("leafy_grass", 260.0, "#FFFFFF"),
    "grass_sparse": ("sparse_grass", 300.0, "#FFFFFF"),
    "sand": ("coast_sand_01", 320.0, "#FFFFFF"),
    "forest_ground": ("forest_ground_04", 300.0, "#FFFFFF"),
    "mud_dry": ("brown_mud_dry", 300.0, "#FFFFFF"),
    "rock": ("rocky_terrain_02", 450.0, "#FFFFFF"),
    "moon": ("moon_01", 500.0, "#FFFFFF"),
    "moon_dust": ("moon_dusted_01", 400.0, "#FFFFFF"),
    "mars": ("red_mud_stones", 400.0, "#F2A57E"),
    "snow": ("snow_02", 350.0, "#FFFFFF"),
    "plaster_white": ("white_plaster_02", 220.0, "#FFFFFF"),
    "concrete_wall": ("concrete_wall_003", 260.0, "#FFFFFF"),
    "stone_wall": ("rustic_stone_wall_02", 260.0, "#FFFFFF"),
    "roof_clay": ("clay_roof_tiles_02", 220.0, "#FFFFFF"),
    "floor_tiles": ("floor_tiles_06", 200.0, "#FFFFFF"),
    "rusty_metal": ("rusty_metal_02", 200.0, "#FFFFFF"),
}


def log(m):
    unreal.log_warning(f"[arch] {m}")


def srgb(h):
    h = h.lstrip("#")
    c = [int(h[i:i + 2], 16) / 255.0 for i in (0, 2, 4)]
    c = [x / 12.92 if x <= 0.04045 else ((x + 0.055) / 1.055) ** 2.4 for x in c]
    return unreal.LinearColor(c[0], c[1], c[2], 1.0)


def expr(m, cls, x, y, **props):
    n = MEL.create_material_expression(m, cls, x, y)
    for k, v in props.items():
        n.set_editor_property(k, v)
    return n


def link(a, a_out, b, b_in):
    if not MEL.connect_material_expressions(a, a_out, b, b_in):
        raise RuntimeError(f"connect failed {a.get_name()}:{a_out} -> {b.get_name()}:{b_in}")


def master():
    path = f"{DEST}/M_ArchWorld"
    if EAL.does_asset_exist(path):
        EAL.delete_asset(path)
    m = unreal.AssetToolsHelpers.get_asset_tools().create_asset("M_ArchWorld", DEST, unreal.Material, unreal.MaterialFactoryNew())
    tile = expr(m, unreal.MaterialExpressionScalarParameter, -1400, 0, parameter_name="TileSize", default_value=200.0)
    tile3 = expr(m, unreal.MaterialExpressionAppendVector, -1250, 0)
    tile2 = expr(m, unreal.MaterialExpressionAppendVector, -1300, 60)
    link(tile, "", tile2, "A")
    link(tile, "", tile2, "B")
    link(tile2, "", tile3, "A")
    link(tile, "", tile3, "B")
    out = {}
    for i, (name, fn) in enumerate((("BaseColor", WAT), ("ARM", WAT), ("Normal", WAN))):
        tex = expr(m, unreal.MaterialExpressionTextureObjectParameter, -1300, -400 + i * 300, parameter_name=name)
        if name == "Normal":
            tex.set_editor_property("sampler_type", unreal.MaterialSamplerType.SAMPLERTYPE_NORMAL)
        elif name == "ARM":
            tex.set_editor_property("sampler_type", unreal.MaterialSamplerType.SAMPLERTYPE_MASKS)
        call = expr(m, unreal.MaterialExpressionMaterialFunctionCall, -900, -400 + i * 300)
        call.set_material_function(unreal.load_asset(fn))
        link(tex, "", call, "TextureObject")
        link(tile3, "", call, "TextureSize")
        out[name] = call
    tint = expr(m, unreal.MaterialExpressionVectorParameter, -700, -600, parameter_name="Tint",
                default_value=unreal.LinearColor(1, 1, 1, 1))
    mul = expr(m, unreal.MaterialExpressionMultiply, -500, -450)
    link(out["BaseColor"], "XYZ Texture", mul, "A")
    link(tint, "", mul, "B")
    MEL.connect_material_property(mul, "", unreal.MaterialProperty.MP_BASE_COLOR)
    for ch, prop in (("R", unreal.MaterialProperty.MP_AMBIENT_OCCLUSION), ("G", unreal.MaterialProperty.MP_ROUGHNESS),
                     ("B", unreal.MaterialProperty.MP_METALLIC)):
        mask = expr(m, unreal.MaterialExpressionComponentMask, -500, -100 + "RGB".index(ch) * 80,
                    r=ch == "R", g=ch == "G", b=ch == "B", a=False)
        link(out["ARM"], "XYZ Texture", mask, "")
        MEL.connect_material_property(mask, "", prop)
    MEL.connect_material_property(out["Normal"], "XYZ Texture", unreal.MaterialProperty.MP_NORMAL)
    MEL.recompile_material(m)
    EAL.save_asset(path)
    return m


def textures_of(ph_id):
    mi = unreal.load_asset(f"/Game/PolyHaven/Materials/{ph_id}/MI_{ph_id}")
    if mi is None:
        raise RuntimeError(f"missing Poly Haven material {ph_id}")
    return {role: MEL.get_material_instance_texture_parameter_value(mi, role) for role in ("BaseColor", "Normal", "ARM")}


def main():
    if not EAL.does_directory_exist(DEST):
        EAL.make_directory(DEST)
    parent = master()
    tools = unreal.AssetToolsHelpers.get_asset_tools()
    for name, (ph, tile, tint) in SURFACES.items():
        path = f"{DEST}/MI_Arch_{name}"
        mi = EAL.load_asset(path) if EAL.does_asset_exist(path) else \
            tools.create_asset(f"MI_Arch_{name}", DEST, unreal.MaterialInstanceConstant, unreal.MaterialInstanceConstantFactoryNew())
        MEL.set_material_instance_parent(mi, parent)
        for role, tex in textures_of(ph).items():
            MEL.set_material_instance_texture_parameter_value(mi, role, tex)
        MEL.set_material_instance_scalar_parameter_value(mi, "TileSize", tile)
        MEL.set_material_instance_vector_parameter_value(mi, "Tint", srgb(tint))
        EAL.save_asset(path)
        log(f"surface {name} <- {ph}")
    log("ARCH DONE")


try:
    main()
except Exception as e:  # noqa: BLE001
    unreal.log_error(f"[arch] FAILED: {e}")
finally:
    if os.environ.get("PROP_QUIT") == "1":
        unreal.SystemLibrary.execute_console_command(None, "log flush")
        os._exit(0)
