"""Separate rigid attachment from SceneCapture projection artifacts, no character saves."""
import json,math,os,sys,time
from pathlib import Path
sys.path.insert(0,str(Path(__file__).parent))
from ue_character_common import ROOT,run_locked_editor

def editor_main(unreal):
    unreal.EditorPythonScripting.set_keep_python_script_alive(True)
    unreal.get_editor_subsystem(unreal.LevelEditorSubsystem).load_level('/Game/Maps/L_CharacterLookdev')
    if os.environ.get('WQ_GROOM_HW_RASTER')=='1':
        unreal.SystemLibrary.execute_console_command(unreal.get_editor_subsystem(unreal.UnrealEditorSubsystem).get_editor_world(),'r.HairStrands.Visibility.UseHWRaster 1')
    if os.environ.get('WQ_GROOM_REST_ONLY')=='1':
        world=unreal.get_editor_subsystem(unreal.UnrealEditorSubsystem).get_editor_world()
        for command in ['r.HairStrands.Binding 0','r.HairStrands.Simulation 0']:unreal.SystemLibrary.execute_console_command(world,command)
    if os.environ.get('WQ_GROOM_MSAA8')=='1':
        world=unreal.get_editor_subsystem(unreal.UnrealEditorSubsystem).get_editor_world()
        for command in ['r.HairStrands.Visibility.ComputeRaster 0','r.HairStrands.Visibility.MSAA.SamplePerPixel 8']:unreal.SystemLibrary.execute_console_command(world,command)
    eas=unreal.get_editor_subsystem(unreal.EditorActorSubsystem);mh=unreal.get_editor_subsystem(unreal.MetaHumanCharacterEditorSubsystem)
    rig=next(a for a in eas.get_all_level_actors() if a.get_actor_label()=='WQ_Lookdev_RefCameraRig')
    character=unreal.load_asset('/Game/Characters/me2026/MHC_me2026')
    if not mh.try_add_object_to_edit(character):raise RuntimeError('MHC unavailable')
    actor=mh.spawn_meta_human_actor(character,True);rig.use_preview_skin(character)
    face=next(c for c in actor.get_components_by_class(unreal.SkeletalMeshComponent) if c.get_bone_index('FACIAL_L_Eye')>=0)
    unreal.log('WQ_FACE_TRANSFORM '+str(face.get_world_transform()))
    eye=face.get_socket_location('FACIAL_L_Eye');rig.set_editor_property('head_center_cm',unreal.Vector(0,eye.y,eye.z-3));rig.configure_views()
    for name in ['male_groom','male_brows']:
        groom=unreal.load_asset('/Game/Blueprints/Characters/Imported/me2026/'+name)
        if os.environ.get('WQ_GROOM_REST_ONLY')=='1':
            groups=groom.get_editor_property('hair_groups_lod')
            for group in groups:
                lods=group.get_editor_property('LODs')
                for lod in lods:lod.set_editor_property('binding_type',unreal.GroomBindingType.RIGID)
                group.set_editor_property('LODs',lods)
            groom.set_editor_property('hair_groups_lod',groups)
        if not rig.attach_preview_groom(actor,groom,False):raise RuntimeError('Rigid preview failed')
    for component in actor.get_components_by_class(unreal.GroomComponent):
        unreal.log('WQ_GROOM_WORLD '+str(component.get_world_transform())+' '+str(unreal.SystemLibrary.get_component_bounds(component)))
    if os.environ.get('WQ_GROOM_PROBE_ONLY')=='1':
        mh.remove_object_to_edit(character);print('WQ_GROOM_DIAG_PASS',flush=True);os._exit(0)
    state={'view':0,'frame':0,'started':time.monotonic()};names=['groom_rigid_ortho','groom_rigid_perspective']
    if os.environ.get('WQ_GROOM_HW_RASTER')=='1':names=[x+'_hw' for x in names]
    if os.environ.get('WQ_GROOM_REST_ONLY')=='1':names=[x+'_rest' for x in names]
    if os.environ.get('WQ_GROOM_MSAA8')=='1':names=[x+'_msaa8' for x in names]
    def tick(dt):
        try:
            rig.warm_view(0);state['frame']+=1
            if state['frame']<8 or time.monotonic()-state['started']<2:return
            if not rig.export_diagnostic_view(0,'me2026',names[state['view']]):raise RuntimeError('Export failed')
            if state['view']==1:
                unreal.unregister_slate_post_tick_callback(handle);mh.remove_object_to_edit(character);print('WQ_GROOM_DIAG_PASS',flush=True);os._exit(0)
            state['view']=1;state['frame']=0;state['started']=time.monotonic()
            capture=rig.get_editor_property('views')[0];capture.set_editor_property('projection_type',unreal.CameraProjectionMode.PERSPECTIVE)
            capture.set_editor_property('fov_angle',math.degrees(2*math.atan(40/800)))
        except Exception:
            import traceback
            traceback.print_exc();sys.stderr.flush();os._exit(1)
    handle=unreal.register_slate_post_tick_callback(tick)

def cli():
    log=ROOT/'Saved/CompareDiagnostics/me2026/groom-diagnostic.log';result=run_locked_editor(__file__,{'WQ_GROOM_PROBE_ONLY':os.environ.get('WQ_GROOM_PROBE_ONLY','0'),'WQ_GROOM_HW_RASTER':os.environ.get('WQ_GROOM_HW_RASTER','0'),'WQ_GROOM_REST_ONLY':os.environ.get('WQ_GROOM_REST_ONLY','0'),'WQ_GROOM_MSAA8':os.environ.get('WQ_GROOM_MSAA8','0')},log,level='/Game/Maps/L_CharacterLookdev')
    if result.returncode or 'WQ_GROOM_DIAG_PASS' not in log.read_text(errors='replace'):raise RuntimeError('Groom diagnosis failed: '+str(log))
    print('WQ_GROOM_DIAG_PASS')

if __name__=='__main__':
    try:import unreal
    except ImportError:cli()
    else:
        try:editor_main(unreal)
        except Exception:
            import traceback
            traceback.print_exc();sys.stderr.flush();os._exit(1)
