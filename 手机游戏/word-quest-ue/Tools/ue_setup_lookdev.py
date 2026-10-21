"""Editor-only C2 setup. Writes exclusively /Game/Maps and /Game/Blueprints."""
import json
import sys
from pathlib import Path
sys.path.insert(0,str(Path(__file__).parent))
from ue_character_common import ROOT
import unreal

def material(name, unlit):
    path='/Game/Blueprints/Lookdev/'+name
    mat=unreal.load_asset(path) if unreal.EditorAssetLibrary.does_asset_exist(path) else None
    if not mat:
        mat=unreal.AssetToolsHelpers.get_asset_tools().create_asset(name,'/Game/Blueprints/Lookdev',unreal.Material,unreal.MaterialFactoryNew())
        if unlit:mat.set_editor_property('shading_model',unreal.MaterialShadingModel.MSM_UNLIT)
        mat.set_editor_property('two_sided',True)
        color=unreal.MaterialEditingLibrary.create_material_expression(mat,unreal.MaterialExpressionConstant3Vector,0,0)
        color.set_editor_property('constant',unreal.LinearColor(450,450,450,1) if unlit else unreal.LinearColor(.8,.8,.8,1))
        unreal.MaterialEditingLibrary.connect_material_property(color,'',unreal.MaterialProperty.MP_EMISSIVE_COLOR if unlit else unreal.MaterialProperty.MP_BASE_COLOR)
        unreal.MaterialEditingLibrary.recompile_material(mat)
        unreal.EditorAssetLibrary.save_loaded_asset(mat)
    if unlit:
        for expression in unreal.MaterialEditingLibrary.get_material_expressions(mat) if hasattr(unreal.MaterialEditingLibrary,'get_material_expressions') else []:
            if isinstance(expression,unreal.MaterialExpressionConstant3Vector):expression.set_editor_property('constant',unreal.LinearColor(450,450,450,1))
        unreal.MaterialEditingLibrary.recompile_material(mat);unreal.EditorAssetLibrary.save_loaded_asset(mat)
    return mat

def setup():
    les=unreal.get_editor_subsystem(unreal.LevelEditorSubsystem);eas=unreal.get_editor_subsystem(unreal.EditorActorSubsystem)
    path='/Game/Maps/L_CharacterLookdev'
    if unreal.EditorAssetLibrary.does_asset_exist(path):les.load_level(path)
    elif not les.new_level(path):raise RuntimeError('Cannot create lookdev map')
    for actor in eas.get_all_level_actors():
        if actor.get_actor_label().startswith('WQ_Lookdev'):eas.destroy_actor(actor)
    for name,shape,scale,location,mat in [
        ('Backdrop','Sphere',unreal.Vector(30,30,30),unreal.Vector(0,0,0),material('M_GreyWhiteBackdropEV95',True)),
        ('Floor','Plane',unreal.Vector(20,20,20),unreal.Vector(0,0,-.5),material('M_WhiteFloor',False))]:
        actor=eas.spawn_actor_from_class(unreal.StaticMeshActor,location);actor.set_actor_label('WQ_Lookdev_'+name)
        component=actor.static_mesh_component;component.set_static_mesh(unreal.load_asset('/Engine/BasicShapes/'+shape))
        component.set_material(0,mat);actor.set_actor_scale3d(scale)
        if name=='Floor':actor.set_actor_hidden_in_game(True);component.set_visibility(False)
        if name=='Backdrop':component.set_cast_shadow(False);component.set_editor_property('affect_distance_field_lighting',False);component.set_affect_dynamic_indirect_lighting(False);component.set_emissive_light_source(False);component.set_visible_in_ray_tracing(False)
    for name,position,intensity,width in [
        ('Key',(-120,180,230),10000,120),('Fill',(140,160,170),4000,150),('Rim',(0,-140,220),6000,100)]:
        light=eas.spawn_actor_from_class(unreal.RectLight,unreal.Vector(*position));light.set_actor_label('WQ_Lookdev_'+name)
        light.set_actor_rotation(unreal.MathLibrary.find_look_at_rotation(unreal.Vector(*position),unreal.Vector(0,0,125)),False)
        component=light.get_component_by_class(unreal.RectLightComponent);component.set_intensity(intensity)
        component.set_source_width(width);component.set_source_height(width)
    bp_path='/Game/Blueprints/BP_RefCameraRig'
    bp=unreal.load_asset(bp_path) if unreal.EditorAssetLibrary.does_asset_exist(bp_path) else None
    if not bp:
        factory=unreal.BlueprintFactory();factory.set_editor_property('parent_class',unreal.WordQuestRefCameraRig)
        bp=unreal.AssetToolsHelpers.get_asset_tools().create_asset('BP_RefCameraRig','/Game/Blueprints',unreal.Blueprint,factory)
        if not bp:raise RuntimeError('Cannot create reference camera Blueprint')
        unreal.EditorAssetLibrary.save_loaded_asset(bp)
    rig=eas.spawn_actor_from_class(unreal.load_class(None,bp_path+'.BP_RefCameraRig_C'),unreal.Vector())
    rig.set_actor_label('WQ_Lookdev_RefCameraRig')
    # Render targets are allocated only during render, never serialized into the map.
    if not les.save_current_level():raise RuntimeError('Cannot save lookdev map')
    report={'map':path,'camera_blueprint':bp_path,'actors':[a.get_actor_label() for a in eas.get_all_level_actors()],'lumen':True,'exposure':'manual (camera components)'}
    out=ROOT/'Saved/CharacterEngine/C2-setup.json';out.parent.mkdir(parents=True,exist_ok=True);out.write_text(json.dumps(report,indent=2))
    unreal.log('WQ_C2_SETUP_PASS '+json.dumps(report))

if __name__=='__main__':
    import os,traceback
    try:
        setup();print('WQ_C2_SETUP_PASS',flush=True);os._exit(0)
    except Exception:
        traceback.print_exc();sys.stderr.flush();os._exit(1)
