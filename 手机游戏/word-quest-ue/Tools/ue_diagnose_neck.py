"""Read-only MHC neck diagnosis: beauty vs flat/no-shadow vs reversed lighting."""
import hashlib
import json
import os
from pathlib import Path
import sys
import time
sys.path.insert(0,str(Path(__file__).parent))
from ue_character_common import ROOT,character_profile,run_locked_editor

def editor_main(unreal):
    unreal.EditorPythonScripting.set_keep_python_script_alive(True)
    out=ROOT/'Saved/CompareDiagnostics/lin';out.mkdir(parents=True,exist_ok=True)
    asset=ROOT/'Content/Characters/lin/MHC_lin.uasset';before=hashlib.sha256(asset.read_bytes()).hexdigest()
    mh=unreal.get_editor_subsystem(unreal.MetaHumanCharacterEditorSubsystem)
    unreal.get_editor_subsystem(unreal.LevelEditorSubsystem).load_level('/Game/Maps/L_CharacterLookdev')
    eas=unreal.get_editor_subsystem(unreal.EditorActorSubsystem)
    rig=next(a for a in eas.get_all_level_actors() if a.get_actor_label()=='WQ_Lookdev_RefCameraRig')
    character=unreal.load_asset('/Game/Characters/lin/MHC_lin')
    if not mh.try_add_object_to_edit(character):raise RuntimeError('MHC edit unavailable')
    actor=mh.spawn_meta_human_actor(character,True);rig.use_preview_skin(character)
    meshes=actor.get_components_by_class(unreal.SkeletalMeshComponent)
    face=next(c for c in meshes if c.get_bone_index('FACIAL_L_Eye')>=0)
    eye=face.get_socket_location('FACIAL_L_Eye');rig.set_editor_property('head_center_cm',unreal.Vector(0,eye.y,eye.z-3));rig.configure_views()
    lights=[a for a in eas.get_all_level_actors() if a.get_actor_label() in ['WQ_Lookdev_Key','WQ_Lookdev_Fill','WQ_Lookdev_Rim']]
    path='/Game/Blueprints/Lookdev/M_NeckDiagnosticFlat'
    material=unreal.load_asset(path) if unreal.EditorAssetLibrary.does_asset_exist(path) else None
    if not material:
        material=unreal.AssetToolsHelpers.get_asset_tools().create_asset('M_NeckDiagnosticFlat','/Game/Blueprints/Lookdev',unreal.Material,unreal.MaterialFactoryNew())
        color=unreal.MaterialEditingLibrary.create_material_expression(material,unreal.MaterialExpressionConstant3Vector,0,0)
        color.set_editor_property('constant',unreal.LinearColor(.45,.45,.45,1))
        rough=unreal.MaterialEditingLibrary.create_material_expression(material,unreal.MaterialExpressionConstant,0,160);rough.set_editor_property('r',1.0)
        unreal.MaterialEditingLibrary.connect_material_property(color,'',unreal.MaterialProperty.MP_BASE_COLOR)
        unreal.MaterialEditingLibrary.connect_material_property(rough,'',unreal.MaterialProperty.MP_ROUGHNESS)
        unreal.MaterialEditingLibrary.recompile_material(material);unreal.EditorAssetLibrary.save_loaded_asset(material)
    names=['back_beauty','back_flat_no_shadow','back_flat_low_light']
    state={'stage':0,'frame':0,'started':time.monotonic()}
    def prepare(stage):
        if stage==1:
            for mesh in meshes:
                mesh.set_cast_shadow(False)
                for slot in range(mesh.get_num_materials()):mesh.set_material(slot,material)
            for light in lights:light.get_component_by_class(unreal.RectLightComponent).set_cast_shadows(False)
            capture=rig.get_editor_property('views')[3];pp=capture.get_editor_property('post_process_settings')
            for name,value in [('override_ambient_occlusion_intensity',True),('ambient_occlusion_intensity',0),('override_dynamic_global_illumination_method',True),('dynamic_global_illumination_method',unreal.DynamicGlobalIlluminationMethod.NONE),('override_reflection_method',True),('reflection_method',unreal.ReflectionMethod.NONE)]:pp.set_editor_property(name,value)
            capture.set_editor_property('post_process_settings',pp)
        if stage==2:
            for light in lights:
                component=light.get_component_by_class(unreal.RectLightComponent)
                component.set_intensity(6000 if light.get_actor_label()=='WQ_Lookdev_Rim' else 0)
                if light.get_actor_label()=='WQ_Lookdev_Rim':
                    location=unreal.Vector(0,-140,95);light.set_actor_location(location,False,False)
                    light.set_actor_rotation(unreal.MathLibrary.find_look_at_rotation(location,unreal.Vector(0,0,character_profile('lin')['height_cm']*.87)),False)
    def tick(dt):
        try:
            rig.warm_view(3);state['frame']+=1
            if state['frame']<48 or time.monotonic()-state['started']<5:return
            name=names[state['stage']]
            if not rig.export_diagnostic_view(3,'lin',name):raise RuntimeError('Diagnostic export failed')
            state['stage']+=1;state['frame']=0;state['started']=time.monotonic()
            if state['stage']==len(names):
                unreal.unregister_slate_post_tick_callback(handle);mh.remove_object_to_edit(character)
                after=hashlib.sha256(asset.read_bytes()).hexdigest()
                if before!=after:raise RuntimeError('MHC modified during diagnosis')
                (out/'diagnosis.json').write_text(json.dumps({'source':'MHC','asset_sha256':before,'asset_unchanged':True,'views':names,'flat_material':'no normal map, no texture, roughness=1','shadows':False,'ssao':False,'lumen':False,'reversed_light_cm':[0,-140,95]},indent=2))
                print('WQ_NECK_DIAG_PASS',flush=True);os._exit(0)
            prepare(state['stage'])
        except Exception:
            import traceback
            (out/'error.txt').write_text(traceback.format_exc());traceback.print_exc();sys.stderr.flush();os._exit(1)
    handle=unreal.register_slate_post_tick_callback(tick)

def cli():
    log=ROOT/'Saved/CompareDiagnostics/lin/diagnostic.log'
    result=run_locked_editor(__file__,{},log,level='/Game/Maps/L_CharacterLookdev')
    if result.returncode or 'WQ_NECK_DIAG_PASS' not in log.read_text(errors='replace'):raise RuntimeError('Neck diagnosis failed; inspect '+str(log))
    print('WQ_NECK_DIAG_PASS '+str(log.parent))

if __name__=='__main__':
    try:import unreal
    except ImportError:cli()
    else:
        try:editor_main(unreal)
        except Exception:
            import traceback
            traceback.print_exc();sys.stderr.flush();os._exit(1)
