"""Claude · memory FX materials used by hero props with external slots (Tools/props/hero_common.external).

/Game/Memory/Materials/FX/M_MemoryBubble   thin translucent shell: near-invisible face-on, cold Fresnel rim
                                           (#B8D1D5), faint thin-film hue drift, slow shimmer; two-sided.

Run through the project lock:
  PROP_QUIT=1 UE_LOCK_WHO=claude Tools/run_ue_serial.sh "$ED" "$PWD/WordQuestUE.uproject" \\
      -ExecutePythonScript="$PWD/Tools/make_memory_materials.py" -unattended -nosplash
"""
import os

import unreal

DEST = "/Game/Memory/Materials/FX"
MEL = unreal.MaterialEditingLibrary
EAL = unreal.EditorAssetLibrary


def log(m):
    unreal.log_warning(f"[memory_fx] {m}")


def expr(m, cls, x, y, **props):
    n = MEL.create_material_expression(m, cls, x, y)
    for k, v in props.items():
        n.set_editor_property(k, v)
    return n


def link(a, a_out, b, b_in):
    if not MEL.connect_material_expressions(a, a_out, b, b_in):
        raise RuntimeError(f"connect failed {a_out}->{b_in}")


def bubble():
    path = f"{DEST}/M_MemoryBubble"
    if EAL.does_asset_exist(path):
        EAL.delete_asset(path)
    tools = unreal.AssetToolsHelpers.get_asset_tools()
    m = tools.create_asset("M_MemoryBubble", DEST, unreal.Material, unreal.MaterialFactoryNew())
    m.set_editor_property("blend_mode", unreal.BlendMode.BLEND_TRANSLUCENT)
    m.set_editor_property("two_sided", True)
    m.set_editor_property("translucency_lighting_mode", unreal.TranslucencyLightingMode.TLM_SURFACE)
    m.set_editor_property("shading_model", unreal.MaterialShadingModel.MSM_DEFAULT_LIT)

    fres = expr(m, unreal.MaterialExpressionFresnel, -900, 0, exponent=3.5, base_reflect_fraction=0.02)
    rim_col = expr(m, unreal.MaterialExpressionVectorParameter, -900, -250, parameter_name="RimColor",
                   default_value=unreal.LinearColor(0.48, 0.64, 0.68, 1))
    # thin-film drift: hue from world position + time, kept faint
    wp = expr(m, unreal.MaterialExpressionWorldPosition, -1300, 250)
    mask = expr(m, unreal.MaterialExpressionComponentMask, -1150, 250, r=False, g=False, b=True, a=False)
    link(wp, "", mask, "")
    t = expr(m, unreal.MaterialExpressionTime, -1300, 400)
    tsc = expr(m, unreal.MaterialExpressionMultiply, -1150, 400, const_b=0.15)
    link(t, "", tsc, "A")
    zs = expr(m, unreal.MaterialExpressionMultiply, -1000, 250, const_b=0.012)
    link(mask, "", zs, "A")
    ph = expr(m, unreal.MaterialExpressionAdd, -850, 300)
    link(zs, "", ph, "A")
    link(tsc, "", ph, "B")
    sine = expr(m, unreal.MaterialExpressionSine, -700, 300, period=1.0)
    link(ph, "", sine, "")
    film = expr(m, unreal.MaterialExpressionLinearInterpolate, -500, 250)
    warm = expr(m, unreal.MaterialExpressionConstant3Vector, -700, 450, constant=unreal.LinearColor(0.75, 0.55, 0.62, 1))
    link(rim_col, "", film, "A")
    link(warm, "", film, "B")
    s01 = expr(m, unreal.MaterialExpressionMultiply, -600, 350, const_b=0.25)
    link(sine, "", s01, "A")
    link(s01, "", film, "Alpha")
    em = expr(m, unreal.MaterialExpressionMultiply, -300, 0)
    link(film, "", em, "A")
    link(fres, "", em, "B")
    estr = expr(m, unreal.MaterialExpressionScalarParameter, -500, -100, parameter_name="RimStrength", default_value=2.2)
    em2 = expr(m, unreal.MaterialExpressionMultiply, -150, 0)
    link(em, "", em2, "A")
    link(estr, "", em2, "B")
    MEL.connect_material_property(em2, "", unreal.MaterialProperty.MP_EMISSIVE_COLOR)
    # opacity: 0.03 face-on -> ~0.45 at the rim
    op = expr(m, unreal.MaterialExpressionLinearInterpolate, -300, 300, const_a=0.03, const_b=0.45)
    link(fres, "", op, "Alpha")
    MEL.connect_material_property(op, "", unreal.MaterialProperty.MP_OPACITY)
    base = expr(m, unreal.MaterialExpressionConstant3Vector, -300, -300, constant=unreal.LinearColor(0.02, 0.025, 0.03, 1))
    MEL.connect_material_property(base, "", unreal.MaterialProperty.MP_BASE_COLOR)
    rough = expr(m, unreal.MaterialExpressionConstant, -300, -200, r=0.04)
    MEL.connect_material_property(rough, "", unreal.MaterialProperty.MP_ROUGHNESS)
    spec = expr(m, unreal.MaterialExpressionConstant, -300, -150, r=0.9)
    MEL.connect_material_property(spec, "", unreal.MaterialProperty.MP_SPECULAR)
    MEL.recompile_material(m)
    EAL.save_asset(path)
    log(f"created {path}")


def arch_glass():
    """Window glass: clear, faint green-blue edge tint, strong Fresnel reflection, thin-surface translucency."""
    path = f"{DEST}/M_ArchGlass"
    if EAL.does_asset_exist(path):
        EAL.delete_asset(path)
    m = unreal.AssetToolsHelpers.get_asset_tools().create_asset("M_ArchGlass", DEST, unreal.Material, unreal.MaterialFactoryNew())
    m.set_editor_property("blend_mode", unreal.BlendMode.BLEND_TRANSLUCENT)
    m.set_editor_property("two_sided", True)
    m.set_editor_property("translucency_lighting_mode", unreal.TranslucencyLightingMode.TLM_SURFACE)
    fres = expr(m, unreal.MaterialExpressionFresnel, -700, 200, exponent=4.0, base_reflect_fraction=0.04)
    op = expr(m, unreal.MaterialExpressionLinearInterpolate, -400, 200, const_a=0.08, const_b=0.55)
    link(fres, "", op, "Alpha")
    MEL.connect_material_property(op, "", unreal.MaterialProperty.MP_OPACITY)
    base = expr(m, unreal.MaterialExpressionConstant3Vector, -400, -200, constant=unreal.LinearColor(0.55, 0.66, 0.64, 1))
    MEL.connect_material_property(base, "", unreal.MaterialProperty.MP_BASE_COLOR)
    rough = expr(m, unreal.MaterialExpressionConstant, -400, -50, r=0.03)
    MEL.connect_material_property(rough, "", unreal.MaterialProperty.MP_ROUGHNESS)
    spec = expr(m, unreal.MaterialExpressionConstant, -400, 0, r=1.0)
    MEL.connect_material_property(spec, "", unreal.MaterialProperty.MP_SPECULAR)
    MEL.recompile_material(m)
    EAL.save_asset(path)
    log(f"created {path}")


try:
    if not EAL.does_directory_exist(DEST):
        EAL.make_directory(DEST)
    arch_glass()
    bubble()
    log("MEMORY FX DONE")
except Exception as e:  # noqa: BLE001
    unreal.log_error(f"[memory_fx] FAILED: {e}")
finally:
    if os.environ.get("PROP_QUIT") == "1":
        unreal.SystemLibrary.execute_console_command(None, "log flush")
        os._exit(0)
