"""Offline IK retargeting to the real MetaHuman archetype (not an auto-rigged MHC).

Idle/walk: bundled UE tutorial mannequin animation. Sit: a labelled hand-keyed
seated loop on that same source skeleton. All output stays in owned directories.
"""
import json
import csv
import math
import os
from pathlib import Path
import sys
import time
sys.path.insert(0,str(Path(__file__).parent))
from ue_character_common import ROOT, run_locked_editor

BASE='/Game/Animation/CharacterPreview'
SOURCE='/Engine/Tutorial/SubEditors/TutorialAssets/Character/'
TARGET='/MetaHumanCharacter/Body/IdentityTemplate/SKM_Body'

def manifest_actions(path=None):
    path=Path(path) if path else ROOT/'Content/Data/anim/anim_manifest.csv'
    with path.open(encoding='utf-8-sig') as stream:
        rows={r['anim_id']:r for r in csv.DictReader(stream)}
    ids={'idle':'me2026_idle_stand','walk':'me2026_walk','sit':'me2026_idle_sit'}
    for name in ids.values():
        if name not in rows or rows[name]['character']!='me2026' or rows[name]['loop']!='true':
            raise ValueError('Missing looping preview manifest action: '+name)
    return ids


def editor_main(u):
    manifest=manifest_actions()
    tools=u.AssetToolsHelpers.get_asset_tools()
    def load(path):
        asset=u.load_asset(path)
        if not asset:raise RuntimeError('Required asset missing: '+path)
        return asset
    def asset(name,cls,factory,folder=BASE):
        return u.load_asset(folder+'/'+name) if u.EditorAssetLibrary.does_asset_exist(folder+'/'+name) else tools.create_asset(name,folder,cls,factory)
    source=load(SOURCE+'TutorialTPP')
    target=load(BASE+'/SKM_MetaHumanArchetype') if u.EditorAssetLibrary.does_asset_exist(BASE+'/SKM_MetaHumanArchetype') else u.EditorAssetLibrary.duplicate_asset(TARGET,BASE+'/SKM_MetaHumanArchetype')
    # Do not alter the plugin archetype or any MHC package.
    eas=u.get_editor_subsystem(u.EditorActorSubsystem)
    helper=eas.spawn_actor_from_class(u.SkeletalMeshActor,u.Vector())
    comp=helper.skeletal_mesh_component;comp.set_skeletal_mesh_asset(source)
    names=[str(comp.get_bone_name(i)) for i in range(comp.get_num_bones())]
    idle=load(SOURCE+'Tutorial_Idle');walk=load(SOURCE+'Tutorial_Walk_Fwd')
    factory=u.AnimSequenceFactory();factory.set_editor_property('target_skeleton',source.get_editor_property('skeleton'))
    sit=asset('AS_Source_IdleSit_Handkey',u.AnimSequence,factory)
    data=sit.get_controller();data.open_bracket('Author seated preview',False)
    data.remove_all_bone_tracks(False);data.set_frame_rate(u.FrameRate(30,1),False);data.set_number_of_frames(u.FrameNumber(120),False)
    poses=u.AnimationLibrary.get_bone_poses_for_frame(idle,names,0,False,source)
    world={};local={name:pose for name,pose in zip(names,poses)}
    for name in names:
        parent=str(comp.get_parent_bone(name));q=local[name].rotation
        world[name]=world[parent]*q if parent in world else q
    desired=dict(world)
    # Component-space hip flexion; calves keep their standing world direction,
    # giving bent knees, rather than rotating the whole leg like a rigid stick.
    delta=u.Rotator(pitch=90,yaw=0,roll=0).quaternion()
    for name in ['thigh_l','thigh_r']:desired[name]=delta*world[name]
    for name,pose in local.items():
        parent=str(comp.get_parent_bone(name))
        q=pose.rotation
        if name in ['thigh_l','thigh_r','calf_l','calf_r']:
            q=desired[parent].inverse()*desired[name]
        positions=[];rotations=[];scales=[]
        for frame in range(121):
            p=pose.translation
            breath=.12*math.sin(frame/120*2*math.pi)
            positions.append(u.Vector(p.x,p.y,p.z-(45 if name=='pelvis' else 0)+(breath if name=='spine_01' else 0)))
            rotations.append(q);scales.append(pose.scale3d)
        data.add_bone_curve(name,False)
        if not data.set_bone_track_keys(name,positions,rotations,scales,False):raise RuntimeError('Cannot key '+name)
    data.close_bracket(False)
    u.EditorAssetLibrary.save_loaded_asset(sit)
    rigs=[];controllers=[]
    for label,mesh in [('SourceMannequin',source),('MetaHumanArchetype',target)]:
        rig=asset('IK_'+label,u.IKRigDefinition,u.IKRigDefinitionFactory())
        ctrl=u.IKRigController.get_controller(rig)
        if not ctrl.set_skeletal_mesh(mesh):raise RuntimeError('Incompatible mesh '+label)
        if not ctrl.apply_auto_generated_retarget_definition():raise RuntimeError('No recognized skeleton: '+label)
        ctrl.apply_auto_fbik()
        u.EditorAssetLibrary.save_loaded_asset(rig);rigs.append(rig);controllers.append(ctrl)
    rtg=asset('RTG_Mannequin_MetaHumanArchetype',u.IKRetargeter,u.IKRetargetFactory())
    ctrl=u.IKRetargeterController.get_controller(rtg)
    ctrl.set_ik_rig(u.RetargetSourceOrTarget.SOURCE,rigs[0]);ctrl.set_ik_rig(u.RetargetSourceOrTarget.TARGET,rigs[1])
    ctrl.add_default_ops();ctrl.auto_map_chains(u.AutoMapChainType.EXACT,True)
    ctrl.auto_align_all_bones(u.RetargetSourceOrTarget.TARGET)
    u.EditorAssetLibrary.save_loaded_asset(rtg)
    sequences={}
    for state,sequence in [('idle',idle),('walk',walk),('sit',sit)]:
        inputs=u.IKRetargetBatchOperationInputs()
        for name,value in {'assets_to_retarget':[u.EditorAssetLibrary.find_asset_data(sequence.get_path_name())],
                           'source_mesh':source,'target_mesh':target,'ik_retarget_asset':rtg,
                           'target_path':BASE+'/Retargeted','prefix':'MH_','overwrite_existing_files':True,
                           'include_referenced_assets':False}.items():inputs.set_editor_property(name,value)
        outputs=u.IKRetargetBatchOperation.run_batch_retarget(inputs)
        if len(outputs)!=1:raise RuntimeError('Retarget did not export exactly one '+state)
        result=outputs[0].get_asset();u.EditorAssetLibrary.save_loaded_asset(result)
        if result.get_editor_property('skeleton')!=target.get_editor_property('skeleton'):raise RuntimeError('Output skeleton mismatch')
        sequences[state]=result
    path='/Game/Blueprints/Characters/BP_me2026'
    if u.EditorAssetLibrary.does_asset_exist(path):
        bp=load(path)
        if not isinstance(u.get_default_object(bp.generated_class()),u.WordQuestAnimationPreview):raise RuntimeError('Existing BP_me2026 belongs to a different assembly; preserve it')
    else:
        f=u.BlueprintFactory();f.set_editor_property('parent_class',u.WordQuestAnimationPreview)
        bp=tools.create_asset('BP_me2026','/Game/Blueprints/Characters',u.Blueprint,f)
    defaults=u.get_default_object(bp.generated_class());defaults.set_editor_property('preview_mesh',target)
    for state,sequence in sequences.items():defaults.set_editor_property(state,sequence)
    u.BlueprintEditorLibrary.compile_blueprint(bp);u.EditorAssetLibrary.save_loaded_asset(bp)
    u.get_editor_subsystem(u.LevelEditorSubsystem).load_level('/Game/Maps/L_CharacterLookdev')
    for actor in eas.get_all_level_actors():
        if actor.get_actor_label()=='WQ_me2026_ArchetypeAnimationPreview':eas.destroy_actor(actor)
    actor=eas.spawn_actor_from_class(bp.generated_class(),u.Vector(150,0,96))
    actor.set_actor_label('WQ_me2026_ArchetypeAnimationPreview');actor.set_editor_property('cycle_in_editor',False)
    samples={}
    for state in ['idle','walk','sit']:
        values=[]
        for t in [0,.25,.5,.75]:
            sample=actor.evaluate_preview(state,t)
            if len(sample)!=6:raise RuntimeError('Preview pose did not evaluate '+state)
            values.append({str(k):{'position':[v.translation.x,v.translation.y,v.translation.z],
                                   'rotation':[v.rotation.x,v.rotation.y,v.rotation.z,v.rotation.w]} for k,v in sample.items()})
        samples[state]=values
    if max(abs(samples['walk'][0]['foot_l']['position'][i]-samples['walk'][2]['foot_l']['position'][i]) for i in range(3))<1:
        raise RuntimeError('Walk failed: evaluated foot is stationary')
    if samples['idle'][0]['pelvis']['position'][2]-samples['sit'][0]['pelvis']['position'][2]<25:
        raise RuntimeError('Sit failed: pelvis did not lower')
    actor.set_editor_property('cycle_in_editor',True)
    u.get_editor_subsystem(u.LevelEditorSubsystem).save_current_level()
    report={'status':'archetype_preview','auto_rigged_identity':False,'source':source.get_path_name(),
            'target':target.get_path_name(),'retargeter':rtg.get_path_name(),
            'manifest_ids':manifest,
            'animations':{k:v.get_path_name() for k,v in sequences.items()},'samples':samples,
            'sit_source':'handkey: seated hip/knee pose with breathing; not mocap',
            'pending':['Epic user login and identity auto-rig','final foot planting / movement crossfade QA']}
    out=ROOT/'Saved/CharacterEngine/C4-retarget.json'
    actor.set_editor_property('cycle_in_editor',False)
    # Use the same light centre for screenshots; keep the saved editor preview
    # offset from the identity-comparison origin.
    actor.set_actor_location(u.Vector(0,0,96),False,False)
    rig=next(a for a in eas.get_all_level_actors() if a.get_actor_label()=='WQ_Lookdev_RefCameraRig')
    rig.set_editor_property('head_center_cm',u.Vector(0,0,90));rig.configure_views()
    rig.get_editor_property('views')[0].set_editor_property('ortho_width',220)
    state={'index':0,'frames':0,'start':time.monotonic()}
    u.EditorPythonScripting.set_keep_python_script_alive(True)
    def tick(dt):
        try:
            name=['idle','walk','sit'][state['index']]
            actor.evaluate_preview(name,.5)
            rig.warm_view(0);state['frames']+=1
            if state['frames']<48 or time.monotonic()-state['start']<5:return
            if not rig.export_diagnostic_view(0,'animation',name):raise RuntimeError('Animation PNG export failed')
            state['index']+=1;state['frames']=0;state['start']=time.monotonic()
            if state['index']==3:
                u.unregister_slate_post_tick_callback(handle)
                report['screenshots']='Saved/CompareDiagnostics/animation/{idle,walk,sit}.png'
                out.write_text(json.dumps(report,indent=2))
                print('WQ_C4_RETARGET_PASS',flush=True);os._exit(0)
        except Exception:
            import traceback
            traceback.print_exc();sys.stderr.flush();os._exit(1)
    handle=u.register_slate_post_tick_callback(tick)


if __name__=='__main__':
    try:import unreal
    except ImportError:
        log=ROOT/'Saved/CharacterEngine/C4-retarget.log'
        result=run_locked_editor(__file__,{},log)
        if result.returncode or 'WQ_C4_RETARGET_PASS' not in log.read_text():raise RuntimeError('Retarget failed: '+str(log))
        print(log)
    else:
        try:editor_main(unreal)
        except Exception:
            import traceback
            traceback.print_exc();sys.stderr.flush();os._exit(1)
