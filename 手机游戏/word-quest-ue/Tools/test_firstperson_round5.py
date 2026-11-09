"""Real PIE locomotion evidence. Values are sampled from the actual character."""
import json,os,sys,time
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
def editor_main(u, on_complete=None):
 les=u.get_editor_subsystem(u.LevelEditorSubsystem);ues=u.get_editor_subsystem(u.UnrealEditorSubsystem)
 assert les.load_level('/Game/Memory/Scenes/U01/L_U01_A')
 u.EditorPythonScripting.set_keep_python_script_alive(True)
 out=ROOT/'Saved/Round5';out.mkdir(parents=True,exist_ok=True)
 capture=out/('c15-offline-firstperson-'+str(time.time_ns())+'-4k.png')
 handle=[]
 def finish():
  if on_complete:
   if handle:u.unregister_slate_post_tick_callback(handle[0])
   on_complete();return
  os._exit(0)
 state={'phase':'start','records':[],'start':time.monotonic(),'capture':str(capture),'capabilities':{str(k):str(v) for k,v in u.WordQuestRenderDiagnostics.capabilities().items()}}
 def key(world,name,down):assert u.WordQuestRenderDiagnostics.inject_navigation_key(world,name,down,1. if down else 0.)
 def tick(dt):
  try:
   if time.monotonic()-state['start']>480:raise RuntimeError('C15 timeout')
   if state['phase']=='start':les.editor_request_begin_play();state.update(phase='settle',at=time.monotonic());return
   world=ues.get_game_world()
   if not world:return
   pc=u.GameplayStatics.get_player_controller(world,0)
   if not pc:return
   pawn=u.GameplayStatics.get_player_pawn(world,0)
   if not isinstance(pawn,u.WordQuestFirstPersonCharacter):
    if time.monotonic()-state['start']>20:raise RuntimeError('Expected first-person possession; actual='+str(pawn.get_class().get_name() if pawn else None)+' view='+str(pc.get_view_target().get_class().get_name() if pc.get_view_target() else None))
    return
   info=pawn.get_first_person_state()
   if state.get('last_phase')!=state['phase']:
    state['last_phase']=state['phase'];print('WQ_C15_PHASE '+state['phase']+' '+info,flush=True)
    (out/'c15-progress.json').write_text(json.dumps({'phase':state['phase'],'state':info},indent=2))
   if state['phase']=='settle':
    if time.monotonic()-state['at']<3:return
    assert 'fov=80.00' in info,info
    assert 'eye_cm=172.00' in info,info
    pos=pawn.get_actor_location();state['initial']=[pos.x,pos.y,pos.z]
    key(world,'W',True);state.update(phase='walking',at=time.monotonic());return
   if state['phase']=='walking':
    state['records'].append({'seconds':time.monotonic()-state['at'],'state':info,'exposure':dict(u.WordQuestRenderDiagnostics.view_exposure(world)) if hasattr(u.WordQuestRenderDiagnostics,'view_exposure') else {'available':0}})
    if time.monotonic()-state['at']<2.:return
    key(world,'W',False);pos=pawn.get_actor_location();x,y,z=state['initial'];dist=((pos.x-x)**2+(pos.y-y)**2)**.5
    assert dist>10,'Character failed to walk: '+info
    state['walk_cm']=dist;key(world,'C',True);state.update(phase='crouch',at=time.monotonic());return
   if state['phase']=='crouch':
    if time.monotonic()-state['at']<1.:return
    assert 'crouched=1' in info,info
    state['crouch']=info;key(world,'C',False);state.update(phase='stand',at=time.monotonic());return
   if state['phase']=='stand':
    if time.monotonic()-state['at']<1.:return
    assert 'crouched=0' in info,info
    pawn.set_head_bob_enabled(False);state['standing']=info
    assert u.WordQuestRenderDiagnostics.request_world_capture(world,3840,2160,str(capture))
    state.update(phase='capture',at=time.monotonic());return
   if state['phase']=='capture':
    if not capture.exists():return
    state['result']='ENGINE_PASS_VISUAL_REQUIRES_REVIEW';state['body']='NEEDS_ASSEMBLED_BODY';state['exposure_curve']='Not measured; settings only'
    (out/'c15-firstperson.json').write_text(json.dumps(state,indent=2));print('WQ_C15_PIE_PASS',flush=True);finish()
  except Exception:
   import traceback;traceback.print_exc();sys.stderr.flush();os._exit(1)
 handle.append(u.register_slate_post_tick_callback(tick))
if __name__=='__main__':
 try:import unreal
 except ImportError:
  sys.path.insert(0,str(ROOT/'Tools'));from ue_character_common import run_locked_editor
  log=ROOT/'Saved/Round5/c15-pie.log';r=run_locked_editor(__file__,{},log)
  if r.returncode or 'WQ_C15_PIE_PASS' not in log.read_text(errors='replace'):raise SystemExit('C15 failed; see '+str(log))
 else:editor_main(unreal)
