"""Read-only P0 capture probe: original cameras versus schema positions, explicit warmup."""
import json, os, sys, time
from pathlib import Path
sys.path.insert(0,str(Path(__file__).resolve().parent))
from textbook_scene_contract import ROOT,read_unit,world_cm,level_path

def editor_main(u):
 data=read_unit(1);eas=u.get_editor_subsystem(u.EditorActorSubsystem);les=u.get_editor_subsystem(u.LevelEditorSubsystem);ues=u.get_editor_subsystem(u.UnrealEditorSubsystem)
 selected={('u01a_s1','wide'),('u01a_s1','basket'),('u01a_s2','faces'),('u01a_s4','campus'),('u01b_s3','room')}
 jobs=[(a,s,k) for a in data['articles'] for s in a['scenes'] for k in s['shots'] if (s['id'],k['name']) in selected]
 state={'i':0,'capture':None,'loaded':None};rows=[]
 out=ROOT/'Saved/Textbook/RenderDiagnostics';out.mkdir(parents=True,exist_ok=True)
 u.EditorPythonScripting.set_keep_python_script_alive(True)
 def tick(dt):
  try:
   if state['capture'] is None:
    if state['i']==len(jobs):
     (out/'probe.json').write_text(json.dumps(rows,indent=2));print('WQ_CAPTURE_PROBE_DONE',flush=True);os._exit(0)
    a,s,k=jobs[state['i']];path=level_path(data,a)
    if state['loaded']!=path:assert les.load_level(path);state['loaded']=path
    actors=list(eas.get_all_level_actors());cam=next(x for x in actors if x.get_actor_label()=='CAM_'+s['id']+'_'+k['name'])
    expected=u.Vector(*world_cm(s,k['pos']));rotation=u.MathLibrary.find_look_at_rotation(expected,u.Vector(*world_cm(s,k['look'])))
    row={'scene':s['id'],'shot':k['name'],'saved_camera':str(cam.get_actor_location()),'expected_camera':str(expected),'saved_rotation':str(cam.get_actor_rotation()),'expected_rotation':str(rotation),'lights':[],'ppv':[]}
    for x in actors:
     if not any(str(t).startswith('set:') for t in x.tags):continue
     active=x.actor_has_tag('set:'+s['id']);x.set_is_temporarily_hidden_in_editor(not active);x.set_actor_hidden_in_game(not active)
     if isinstance(x,u.PostProcessVolume):
      x.set_editor_property('enabled',active)
      if active:row['ppv'].append({'label':x.get_actor_label(),'exposure':x.get_editor_property('settings').auto_exposure_bias})
     for c in x.get_components_by_class(u.LightComponent):
      c.set_visibility(active)
      if active:row['lights'].append({'label':x.get_actor_label(),'location':str(x.get_actor_location()),'intensity':c.intensity})
    cap=eas.spawn_actor_from_class(u.SceneCapture2D,expected,rotation);cap.set_actor_location(expected,False,True);cap.set_actor_rotation(rotation,False)
    c=cap.get_component_by_class(u.SceneCaptureComponent2D);target=u.RenderingLibrary.create_render_target2d(ues.get_editor_world(),3840,2160,u.TextureRenderTargetFormat.RTF_RGBA8)
    c.set_editor_property('texture_target',target);c.set_editor_property('capture_source',u.SceneCaptureSource.SCS_FINAL_COLOR_LDR);c.set_editor_property('capture_every_frame',False);c.set_editor_property('capture_on_movement',False);c.set_editor_property('always_persist_rendering_state',True);c.set_editor_property('fov_angle',k.get('fov',40));u.WordQuestRenderDiagnostics.configure_capture(c)
    pp=c.get_editor_property('post_process_settings')
    for name,value in [('auto_exposure_method',u.AutoExposureMethod.AEM_MANUAL),('auto_exposure_apply_physical_camera_exposure',False),('auto_exposure_bias',-3.0),('motion_blur_amount',0.0)]:
     pp.set_editor_property('override_'+name,True);pp.set_editor_property(name,value)
    c.set_editor_property('post_process_settings',pp)
    ues.set_level_viewport_camera_info(expected,rotation)
    state.update(capture=cap,component=c,target=target,started=time.monotonic(),frames=0,row=row,name=s['id']+'_'+k['name'])
   state['component'].capture_scene();state['frames']+=1
   if state['frames']>=96 and time.monotonic()-state['started']>=3:
    name=state['name']+'.png';u.RenderingLibrary.export_render_target(ues.get_editor_world(),state['target'],str(out),name)
    state['row']['actual_capture']=str(state['capture'].get_actor_location());state['row']['frames']=state['frames'];state['row']['warmup_seconds']=time.monotonic()-state['started'];rows.append(state['row']);print('WQ_CAPTURE_PROBE '+json.dumps(state['row']),flush=True)
    eas.destroy_actor(state['capture']);state.update(i=state['i']+1,capture=None)
  except Exception:
   import traceback;traceback.print_exc();sys.stderr.flush();os._exit(1)
 u.register_slate_post_tick_callback(tick)

if __name__=='__main__':
 try:import unreal
 except ImportError:
  from ue_character_common import run_locked_editor
  r=run_locked_editor(__file__,{},ROOT/'Saved/Textbook/RenderDiagnostics/probe.log',level='/Game/Memory/Scenes/U01/L_U01_A')
  if r.returncode:raise SystemExit(r.returncode)
 else:editor_main(unreal)
