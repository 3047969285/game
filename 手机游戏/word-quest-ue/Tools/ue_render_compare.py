"""python3 Tools/ue_render_compare.py me2026 [--fit-json PATH]
Renders read-only source/assembled assets to Saved/Compare/<id>/*.png.
Uses a full offscreen renderer; NullRHI cannot produce validation images.
"""
import json
import os
from pathlib import Path
import sys
import time
import hashlib
import shutil
import uuid
sys.path.insert(0,str(Path(__file__).parent))
from ue_character_common import ROOT,VIEWS,character_id,fit_pose,character_profile,inherited_lock,run_locked_editor

def editor_main(unreal):
    unreal.EditorPythonScripting.set_keep_python_script_alive(True)
    unreal.log("WQ_C2_SCRIPT_ENTER")
    cid=character_id(os.environ.get('WQ_CHARACTER_ID','me2026'))
    run_id=character_id(os.environ.get('WQ_COMPARE_RUN_ID',uuid.uuid4().hex))
    out=ROOT/'Saved/Compare'/cid;out.mkdir(parents=True,exist_ok=True)
    run=ROOT/'Saved/CompareRuns'/cid/run_id;run.mkdir(parents=True,exist_ok=True)
    profile=character_profile(cid)
    pose,fit,fit_hash=fit_pose(cid,os.environ.get('WQ_COMPARE_FIT_JSON'))
    les=unreal.get_editor_subsystem(unreal.LevelEditorSubsystem);les.load_level('/Game/Maps/L_CharacterLookdev')
    eas=unreal.get_editor_subsystem(unreal.EditorActorSubsystem)
    rig=next(a for a in eas.get_all_level_actors() if a.get_actor_label()=='WQ_Lookdev_RefCameraRig')
    rig.set_editor_property('q34_pose',unreal.Vector(*pose));rig.set_editor_property('character_height_cm',profile['height_cm'])
    bp=f'/Game/Blueprints/Characters/BP_{cid}'
    source=None;source_asset=None;edited=None;mh=None
    mh_path=f'/Game/Characters/{cid}/MHC_{cid}'
    owned_asset=ROOT/'Content/Characters'/cid/f'MHC_{cid}.uasset'
    asset_hash=hashlib.sha256(owned_asset.read_bytes()).hexdigest() if owned_asset.is_file() else None
    if os.environ.get('WQ_COMPARE_REQUIRE_MHC')!='1' and unreal.EditorAssetLibrary.does_asset_exist(bp):
        actor=eas.spawn_actor_from_class(unreal.load_class(None,bp+f'.BP_{cid}_C'),unreal.Vector(0,0,96));source='BP';source_asset=bp
    elif unreal.EditorAssetLibrary.does_asset_exist(mh_path):
        mh=unreal.get_editor_subsystem(unreal.MetaHumanCharacterEditorSubsystem)
        edited=unreal.load_asset(mh_path)
        if not mh.try_add_object_to_edit(edited):raise RuntimeError('MHC edit session unavailable: '+mh_path)
        try:
            actor=mh.spawn_meta_human_actor(edited,True)
            if not actor:raise RuntimeError('MHC preview spawn failed: '+mh_path)
            actor.set_actor_location(unreal.Vector(),False,False)
            source='MHC';source_asset=mh_path
        except Exception:
            mh.remove_object_to_edit(edited);raise
    else:
        if os.environ.get('WQ_COMPARE_REQUIRE_MHC')=='1':raise RuntimeError('Required MHC missing: '+mh_path)
        who=profile['who']
        source_asset=f'/Game/Characters/{cid}/Source/{who}_body';source='Source'
        if not unreal.EditorAssetLibrary.does_asset_exist(source_asset):raise RuntimeError('No renderable assembled character, MHC or source body: '+source_asset)
        mesh=unreal.load_asset(source_asset)
        actor=eas.spawn_actor_from_class(unreal.StaticMeshActor if isinstance(mesh,unreal.StaticMesh) else unreal.SkeletalMeshActor,unreal.Vector())
        if isinstance(mesh,unreal.StaticMesh):actor.static_mesh_component.set_static_mesh(mesh)
        else:actor.skeletal_mesh_component.set_skeletal_mesh_asset(mesh)
    def cleanup():
        if edited is not None:mh.remove_object_to_edit(edited)
        else:eas.destroy_actor(actor)
    actor.set_actor_label('WQ_Compare_'+cid)
    if edited is not None and not rig.use_preview_skin(edited):raise RuntimeError('Cannot enable transient MHC skin preview')
    groom_assets=[]
    if os.environ.get('WQ_COMPARE_GROOMS')=='1':
        base=f'/Game/Blueprints/Characters/Imported/{cid}/'
        for kind in ('groom','brows'):
            path=base+profile['who']+'_'+kind
            if not unreal.EditorAssetLibrary.does_asset_exist(path):
                if kind=='groom':raise RuntimeError('Imported Groom missing: '+path)
                continue
            groom=unreal.load_asset(path)
            if not rig.attach_preview_groom(actor,groom,os.environ.get('WQ_GROOM_ATTACHMENT','skin')=='skin'):raise RuntimeError('Cannot bind preview Groom: '+path)
            groom_assets.append(path)
    head=unreal.Vector(0,0,(profile['height_cm'])*.91)
    for component in actor.get_components_by_class(unreal.SkeletalMeshComponent):
        if component.get_bone_index('FACIAL_L_Eye')>=0:
            eye=component.get_socket_location('FACIAL_L_Eye');head=unreal.Vector(0,eye.y,eye.z-3);break
    rig.set_editor_property('head_center_cm',head);rig.configure_views()
    for component in rig.get_editor_property('views'):
        pp=component.get_editor_property('post_process_settings');pp.set_editor_property('auto_exposure_bias',-9.5);component.set_editor_property('post_process_settings',pp)
    state={'frame':0,'view':0,'started':time.monotonic(),'bindings_ready':False};out=ROOT/'Saved/Compare'/cid;out.mkdir(parents=True,exist_ok=True)
    report={'run_id':run_id,'status':'complete','character':cid,'character_profile':profile,'source':source,'source_asset':source_asset,'source_preview':source=='Source','unrigged_preview':source=='MHC','preview_material':'Skin' if source=='MHC' else 'asset','groom_assets':groom_assets,'groom_binding':os.environ.get('WQ_GROOM_ATTACHMENT','skin')+' transient FaceMesh' if groom_assets else None,'fit_json':fit,'fit_sha256':fit_hash,'q34_pose':pose,'resolution':[1024,1024],'projection':'orthographic','exposure_ev100_equivalent':9.5,'head_center_cm':str(head),'views':{}}
    def tick(dt):
        try:
            if rig.get_editor_property('failed_groom_bindings'):raise RuntimeError('Groom binding failed')
            if rig.get_editor_property('pending_groom_bindings'):
                if time.monotonic()-state['started']>600:raise RuntimeError('Groom binding timeout')
                return
            if not state['bindings_ready']:
                state['bindings_ready']=True;state['started']=time.monotonic()
            index=state['view'];rig.warm_view(index);state['frame']+=1
            if state['frame']<48 or time.monotonic()-state['started']<5:return
            if not rig.export_run_view(index,cid,run_id):raise RuntimeError('PNG export failed: '+VIEWS[index])
            if index==0 and groom_assets:
                image_size,pixels=unreal.PromotedFrameUtils.get_promoted_frame_as_pixel_array_from_disk(str(run/'front.png'))
                contours=mh.track_face_landmarks_from_image(pixels,image_size.x,image_size.y)
                if isinstance(contours,tuple) and len(contours)==1:contours=contours[0]
                if not contours:raise RuntimeError('Groom render invalid: no visible front face; comparison output preserved')
                report['front_face_contours']=len(contours)
            component=rig.get_editor_property('views')[index]
            report['views'][VIEWS[index]]={'location':str(component.get_world_location()),'rotation':str(component.get_world_rotation()),'ortho_width':component.get_editor_property('ortho_width')}
            unreal.log('WQ_COMPARE_VIEW '+VIEWS[index]);state['frame']=0;state['view']+=1;state['started']=time.monotonic()
            if state['view']==len(VIEWS):
                if source=='MHC' and hashlib.sha256(owned_asset.read_bytes()).hexdigest()!=asset_hash:raise RuntimeError('MHC asset changed during capture')
                report['mhc_asset_sha256']=asset_hash if source=='MHC' else None
                report['mhc_asset_unchanged']=source=='MHC'
                (run/'capture.json').write_text(json.dumps(report,ensure_ascii=False,indent=2));unreal.unregister_slate_post_tick_callback(handle)
                cleanup()
                archive_capture(out,ROOT/'Saved/CompareHistory'/cid/uuid.uuid4().hex)
                for name in [v+'.png' for v in VIEWS]+['capture.json']:shutil.copy2(run/name,out/name)
                unreal.log('WQ_C2_RENDER_PASS');print('WQ_C2_RENDER_PASS',flush=True);os._exit(0)
        except Exception:
            import traceback
            (run/'capture-error.txt').write_text(traceback.format_exc());unreal.unregister_slate_post_tick_callback(handle)
            try:cleanup()
            finally:sys.stderr.flush();os._exit(1)
    handle=unreal.register_slate_post_tick_callback(tick)

def archive_capture(folder, archive):
    """Call only inside the locked editor, never while a CLI is merely queued."""
    previous=[folder/(view+'.png') for view in VIEWS]+[folder/'capture.json',folder/'capture-error.txt']
    existing=[p for p in previous if p.exists()]
    if existing:
        archive.mkdir(parents=True)
        for p in existing:shutil.move(str(p),str(archive/p.name))

def validate_capture(folder, require_mhc=False):
    """Reject stale, partial or misframed evidence before it reaches the QA tool."""
    import struct
    capture=json.loads((folder/'capture.json').read_text())
    if capture.get('status')!='complete':raise RuntimeError('Incomplete capture')
    if require_mhc and capture.get('source')!='MHC':raise RuntimeError('MHC capture required')
    if capture.get('resolution')!=[1024,1024]:raise RuntimeError('Wrong capture resolution')
    for view in VIEWS:
        data=(folder/(view+'.png')).read_bytes()
        if len(data)<24 or data[:8]!=b'\x89PNG\r\n\x1a\n' or struct.unpack('>II',data[16:24])!=(1024,1024):
            raise RuntimeError('Invalid comparison PNG: '+view)
        width=capture['views'][view]['ortho_width']
        if abs(width-(25 if view=='closeup' else 40))>.01:raise RuntimeError('Wrong portrait framing: '+view)
    return capture

def cli():
    import argparse,subprocess,struct
    parser=argparse.ArgumentParser(description=__doc__);parser.add_argument('id');parser.add_argument('--fit-json');parser.add_argument('--grooms',action='store_true');parser.add_argument('--groom-attachment',choices=['skin','rigid'],default='skin');parser.add_argument('--require-mhc',action='store_true');parser.add_argument('--engine',default='/Users/Shared/Epic Games/UE_5.8');args=parser.parse_args()
    cid=character_id(args.id);env=dict(os.environ,WQ_CHARACTER_ID=cid,UE_LOCK_WHO='codex')
    if args.require_mhc:env['WQ_COMPARE_REQUIRE_MHC']='1'
    if args.grooms:env['WQ_COMPARE_GROOMS']='1';env['WQ_GROOM_ATTACHMENT']=args.groom_attachment
    if args.fit_json:env['WQ_COMPARE_FIT_JSON']=str(Path(args.fit_json).resolve())
    binary=Path(args.engine)/'Engine/Binaries/Mac/UnrealEditor.app/Contents/MacOS/UnrealEditor';out=ROOT/'Saved/Compare'/cid;out.mkdir(parents=True,exist_ok=True)
    run_id=uuid.uuid4().hex;env['WQ_COMPARE_RUN_ID']=run_id
    run=ROOT/'Saved/CompareRuns'/cid/run_id;run.mkdir(parents=True)
    log_path=run/'render.log'
    # Old instances started before the shared-lock rule do not own its lock.
    # Wait for those too, without terminating any other person's editor.
    waited=0
    while True:
        running=subprocess.check_output(['ps','-ax','-o','pid=,command='],text=True)
        owners=[]
        for line in running.splitlines():
            parts=line.strip().split(None,1)
            if len(parts)!=2:continue
            pid,command=parts
            if command.startswith(str(Path(args.engine)/'Engine/Binaries/Mac/UnrealEditor')) and str(ROOT/'WordQuestUE.uproject') in command:
                owners.append(pid)
        if not owners:break
        if waited%60==0:print('Waiting for existing project UE processes: '+', '.join(owners),flush=True)
        time.sleep(5);waited+=5
    result=run_locked_editor(__file__,env,log_path,args.engine,'/Game/Maps/L_CharacterLookdev')
    if result.returncode or 'WQ_C2_RENDER_PASS' not in log_path.read_text(errors='replace'):raise RuntimeError(f'Render failed (exit={result.returncode}); inspect '+str(log_path))
    capture=validate_capture(run,args.require_mhc)
    if capture['run_id']!=run_id:raise RuntimeError('Capture run id mismatch')
    # Publish a convenient latest log only if a newer run has not replaced this capture.
    try:
        if json.loads((out/'capture.json').read_text())['run_id']==run_id:shutil.copy2(log_path,out/'render.log')
    except (FileNotFoundError,KeyError):pass
    print('WQ_C2_RENDER_PASS '+str(out))

if __name__=='__main__':
    try:import unreal
    except ImportError:cli()
    else:
        try:editor_main(unreal)
        except Exception:
            import traceback
            cid=character_id(os.environ.get('WQ_CHARACTER_ID','me2026'))
            out=ROOT/'Saved/Compare'/cid;out.mkdir(parents=True,exist_ok=True)
            (out/'capture-error.txt').write_text(traceback.format_exc())
            traceback.print_exc();sys.stderr.flush();os._exit(1)
