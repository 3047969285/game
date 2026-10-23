"""Real PIE entry-to-article verification; explicit engine QA does not waive visual acceptance."""
import os,sys,time,json
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
def editor_main(u):
 les=u.get_editor_subsystem(u.LevelEditorSubsystem);ues=u.get_editor_subsystem(u.UnrealEditorSubsystem)
 assert les.load_level('/Game/Maps/L_Opening2090')
 u.EditorPythonScripting.set_keep_python_script_alive(True)
 evidence=ROOT/'Saved/Opening2090'/('ready-'+str(time.time_ns())+'.png')
 room_evidence=evidence.with_name(evidence.stem+'-first-room.png')
 state={'phase':'start','records':[],'started':time.monotonic()}
 def tick(dt):
  try:
   if time.monotonic()-state['started']>600:raise RuntimeError('Opening-to-article timeout')
   if state['phase']=='start':les.editor_request_begin_play();state['phase']='opening';return
   world=ues.get_game_world()
   if not world:return
   gm=u.GameplayStatics.get_game_mode(world)
   if not gm:return
   if 'L_U01_A' in u.GameplayStatics.get_current_level_name(world,True):
    director=gm.get_component_by_class(u.WordQuestMemoryDirector);assert director
    info=director.get_playback_state();assert info.endswith('error='),info
    pc=u.GameplayStatics.get_player_controller(world,0);view=pc.get_view_target();nav=gm.get_component_by_class(u.WordQuestMemoryNavigation);assert nav
    if state['phase']=='travel':
     state['records'].append({'map':u.GameplayStatics.get_current_level_name(world,True),'state':info})
     state.update(phase='room_settle',room_started=time.monotonic());return
    if state['phase']=='room_settle':
     if time.monotonic()-state['room_started']<2.:return
     print('WQ_NAV_INITIAL '+nav.get_navigation_state(),flush=True)
     assert u.WordQuestRenderDiagnostics.request_world_capture(world,2560,1440,str(room_evidence))
     state['phase']='room_capture';return
    if state['phase']=='room_capture':
     if not room_evidence.is_file():return
     pos=view.get_actor_location();state['position']=[pos.x,pos.y,pos.z]
     u.WordQuestRenderDiagnostics.inject_navigation_key(world,'W',True,1.0);state.update(phase='walking',walk_started=time.monotonic());return
    if state['phase']=='walking':
     if time.monotonic()-state['walk_started']<1.:return
     u.WordQuestRenderDiagnostics.inject_navigation_key(world,'W',False,0.)
     pos=view.get_actor_location();before=state['position'];distance=((pos.x-before[0])**2+(pos.y-before[1])**2)**.5
     assert distance>5,'WASD did not move actual camera: '+nav.get_navigation_state()
     assert abs(pos.z-before[2])<30,'Eye height jumped during walking'
     state['records'].append({'navigation':nav.get_navigation_state(),'walk_cm':distance,'capture':str(room_evidence)})
     u.GameplayStatics.set_game_paused(world,True);state.update(phase='pause_check',pause_started=time.monotonic(),pause_position=[pos.x,pos.y,pos.z]);return
    if state['phase']=='pause_check':
     if time.monotonic()-state['pause_started']<.5:return
     pos=view.get_actor_location();before=state['pause_position'];assert max(abs(a-b) for a,b in zip((pos.x,pos.y,pos.z),before))<.1
     u.GameplayStatics.set_game_paused(world,False)
     out=ROOT/'Saved/Opening2090/playthrough.json';out.write_text(json.dumps({'technical':'PASS','visual':'NOT_ACCEPTED','records':state['records']},indent=2));print('WQ_OPENING_PLAYTHROUGH_PASS',flush=True);os._exit(0)
    return
   flow=gm.get_component_by_class(u.WordQuestOpeningFlow)
   if not flow:return
   info=flow.get_opening_state();assert 'phase=error' not in info,info
   if state.get('last')!=info:state['records'].append({'map':u.GameplayStatics.get_current_level_name(world,True),'state':info});state['last']=info
   if 'phase=narration' in info:flow.advance_opening()
   elif 'phase=waiting' in info and state['phase']=='opening':
    assert u.WordQuestRenderDiagnostics.request_world_capture(world,1280,720,str(evidence))
    state['phase']='capture';state['waiting_since']=time.monotonic()
   elif state['phase']=='capture':
    assert 'phase=waiting' in info,'Recall started without confirmation: '+info
    if evidence.is_file() and time.monotonic()-state['waiting_since']>=4:
     state['records'].append({'capture':str(evidence),'waiting_confirmed':True});flow.wait_before_recall();state['phase']='wait'
   elif 'phase=waiting' in info and state['phase']=='wait':flow.confirm_recall();state['phase']='travel'
  except Exception:
   import traceback;traceback.print_exc();sys.stderr.flush();os._exit(1)
 u.register_slate_post_tick_callback(tick)
if __name__=='__main__':
 try:import unreal
 except ImportError:
  sys.path.insert(0,str(ROOT/'Tools'));from ue_character_common import run_locked_editor
  log=ROOT/'Saved/Opening2090/playthrough.log';r=run_locked_editor(__file__,{},log)
  if r.returncode or 'WQ_OPENING_PLAYTHROUGH_PASS' not in log.read_text(errors='replace'):raise SystemExit('Opening playthrough failed: '+str(log))
 else:editor_main(unreal)
