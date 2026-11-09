"""C7 quality gate: all-set structural audit and every-shot 3840x2160 evidence.
A successful capture is not a visual PASS. Missing final assets / people / surfaces fail quality.
"""
import os,sys,json,argparse,hashlib,time,subprocess,math,shutil
from pathlib import Path
sys.path.insert(0,str(Path(__file__).resolve().parent))
from textbook_scene_contract import ROOT,read_unit,level_path,prop_tags,props_for,read_asset_map,asset_spec,world_cm
from textbook_environment import scene_hdri_path,spawn_hdri_sky

def editor_main(u):
 data=read_unit(int(os.environ.get('WQ_TEXTBOOK_UNIT','1')),os.environ.get('WQ_TEXTBOOK_SOURCE')); mapping=read_asset_map()
 mapping_doc=json.loads((ROOT/'Content/Data/memory/kit_assets.json').read_text())
 les=u.get_editor_subsystem(u.LevelEditorSubsystem);eas=u.get_editor_subsystem(u.EditorActorSubsystem)
 jobs=[(a,s,shot) for a in data['articles'] for s in a['scenes'] for shot in s['shots']]
 if os.environ.get('WQ_TEXTBOOK_SECTION'):jobs=[job for job in jobs if job[0]['section']==os.environ['WQ_TEXTBOOK_SECTION']]
 if os.environ.get('WQ_TEXTBOOK_SHOT'):jobs=[job for job in jobs if job[1]['id']+'/'+job[2]['name']==os.environ['WQ_TEXTBOOK_SHOT']]
 run_id=str(time.time_ns());qa_python=os.environ.get('WQ_QA_PYTHON',sys.executable)
 results=[];state={'index':0,'capture':None,'loaded':None,'frames':0};u.EditorPythonScripting.set_keep_python_script_alive(True)
 def audit(article,scene,actors):
  selected=[a for a in actors if a.actor_has_tag('set:'+scene['id'])]; props=[a for a in selected if any(str(t).startswith('prop:') for t in a.tags)]; expected=props_for(scene)
  assert len(props)==len(expected),(scene['id'],len(props),len(expected))
  for i,p in enumerate(expected):
   found=[a for a in props if a.actor_has_tag('prop:'+str(i))];assert len(found)==1
   assert all(found[0].actor_has_tag(t) for t in prop_tags(scene,p,i))
  for shot in scene['shots']:assert sum(a.get_actor_label()=='CAM_'+scene['id']+'_'+shot['name'] for a in selected)==1
  for person in scene.get('people',[]):assert any(a.actor_has_tag('actor:'+person['role']) for a in selected)
  issues=[];unfinished=sum(a.actor_has_tag('needs_final_asset') for a in selected);placeholders=sum(a.actor_has_tag('placeholder') for a in selected)
  if unfinished:issues.append(f'{unfinished} actors need final assets')
  if placeholders:issues.append(f'{placeholders} placeholders (including people)')
  missing_kits=sorted({p['kit'] for p in expected if not asset_spec(mapping,p['kit']).get('asset') or not u.EditorAssetLibrary.does_asset_exist(asset_spec(mapping,p['kit']).get('asset',''))})
  if missing_kits:issues.append('kits missing final assets: '+', '.join(missing_kits))
  for tag in ['environment:ppv','environment:fog','environment:sky']:
   if not any(a.actor_has_tag(tag) for a in selected):issues.append('missing '+tag)
  decals=[a for a in selected if a.actor_has_tag('decal') and not a.actor_has_tag('needs_final_asset')]
  if len(decals)<10:issues.append(f'decals {len(decals)}/10')
  if not any(a.actor_has_tag('clutter') for a in selected):issues.append('no CC0 clutter scatter')
  for p in expected:
   spec=asset_spec(mapping,p['kit'])
   if spec.get('asset') and spec.get('source')=='polyhaven' and not spec.get('quality_verified',False):issues.append('Poly Haven scan needs PBR/bevel/triangle visual review: '+p['kit'])
   elif spec.get('asset') and spec.get('source') not in ('fab','megascans','scan','polyhaven') and not spec.get('quality_verified',False):issues.append('non-scan asset needs PBR/bevel/triangle verification: '+p['kit'])
  return {'scene':scene['id'],'props':len(props),'cameras':len(scene['shots']),'needs_final_asset':unfinished,'placeholders':placeholders,'unmapped_kits':missing_kits,'quality':'FAIL' if issues else 'REVIEW_REQUIRED','issues':issues,'shots':[],'captures':[]}
 def tick(dt):
  try:
   if state['capture'] is None:
    if state['index']>=len(jobs):
     report=ROOT/f"Docs/qa/textbook-scenes-unit{data['unit']:02d}.md";report.parent.mkdir(parents=True,exist_ok=True)
     failures=sum(c['capture_quality']=='FAIL' for r in results for c in r['captures'])
     report.write_text('# Textbook scene quality gate\n\n'+f'Run {run_id}; {len(jobs)} 4K captures, {failures} pixel failures. Visual acceptance remains separate.\n\n'+ '\n'.join(f"- {r['quality']} `{r['scene']}`: {r['props']} props, {r['cameras']} cameras; "+'; '.join(r['issues']) for r in results)+'\n',encoding='utf-8')
     (report.with_suffix('.json')).write_text(json.dumps({'run_id':run_id,'capture_quality':'FAIL' if failures else 'PASS','capture_failures':failures,'resolution':[3840,2160],'scene_source_sha256':hashlib.sha256(json.dumps(data,sort_keys=True).encode()).hexdigest(),'scenes':results},ensure_ascii=False,indent=2));print('WQ_C7_CAPTURE_COMPLETE pixel_failures='+str(failures));sys.stdout.flush();os._exit(0)
    article,scene,shot=jobs[state['index']];path=level_path(data,article)
    if state['loaded']!=path:assert les.load_level(path);state['loaded']=path
    actors=list(eas.get_all_level_actors())
    # Older generated levels have a cubemap SkyLight but no visible sky.
    # Recreate the same builder backdrop transiently for P0 diagnosis; the
    # source level remains untouched until its regular rebuild is validated.
    if not any(x.actor_has_tag('set:'+scene['id']) and x.actor_has_tag('environment:hdri_backdrop') for x in actors):
     sky_path=scene_hdri_path(scene,mapping_doc)
     if sky_path and u.EditorAssetLibrary.does_asset_exist(sky_path):
      def temp_spawn(cls,label,loc,tags):
       x=eas.spawn_actor_from_class(cls,u.Vector(*loc));x.set_actor_label(label);x.set_actor_location(u.Vector(*loc),False,True);x.set_editor_property('tags',[u.Name(t) for t in ['textbook_generated']+tags]);return x
      spawn_hdri_sky(u,temp_spawn,scene,u.load_asset(sky_path));actors=list(eas.get_all_level_actors())
    digest=hashlib.sha256(json.dumps(data,sort_keys=True).encode()).hexdigest();assert any(a.actor_has_tag('source:'+digest) for a in actors),'Scene JSON changed since build; rebuild first'
    if not any(r['scene']==scene['id'] for r in results):results.append(audit(article,scene,actors))
    for a in actors:
     is_set=any(str(t).startswith('set:') for t in a.tags)
     if is_set:
      active=a.actor_has_tag('set:'+scene['id']);a.set_is_temporarily_hidden_in_editor(not active)
      a.set_actor_hidden_in_game(not active)
      if isinstance(a,u.PostProcessVolume):a.set_editor_property('enabled',active)
      for light in a.get_components_by_class(u.LightComponent):light.set_visibility(active)
    cam=next(a for a in actors if a.get_actor_label()=='CAM_'+scene['id']+'_'+shot['name'])
    # Camera getters return transient reflected structs. Derive independent XYZ
    # from the authored schema and explicitly set the capture transform after spawn.
    location=u.Vector(*world_cm(scene,shot['pos']));look=u.Vector(*world_cm(scene,shot['look']));rotation=u.MathLibrary.find_look_at_rotation(location,look)
    capture=eas.spawn_actor_from_class(u.SceneCapture2D,location,rotation);capture.set_actor_location(location,False,True);capture.set_actor_rotation(rotation,False);c=capture.get_component_by_class(u.SceneCaptureComponent2D)
    world=u.get_editor_subsystem(u.UnrealEditorSubsystem).get_editor_world();target=u.RenderingLibrary.create_render_target2d(world,3840,2160,u.TextureRenderTargetFormat.RTF_RGBA8)
    c.set_editor_property('texture_target',target);c.set_editor_property('capture_source',u.SceneCaptureSource.SCS_FINAL_COLOR_LDR);c.set_editor_property('fov_angle',shot.get('fov',40));c.set_editor_property('capture_every_frame',False);c.set_editor_property('capture_on_movement',False);c.set_editor_property('always_persist_rendering_state',True);u.WordQuestRenderDiagnostics.configure_capture(c)
    volumes=[a for a in actors if isinstance(a,u.PostProcessVolume) and a.get_editor_property('enabled')];assert len(volumes)==1,'Exactly one set PPV must be active'
    settings=volumes[0].get_editor_property('settings')
    for name,value in [('auto_exposure_method',u.AutoExposureMethod.AEM_MANUAL),('auto_exposure_apply_physical_camera_exposure',False),('motion_blur_amount',0.),('depth_of_field_fstop',cam.get_cine_camera_component().current_aperture),('depth_of_field_focal_distance',(look-location).length())]:
     settings.set_editor_property('override_'+name,True);settings.set_editor_property(name,value)
    settings.set_editor_property('override_auto_exposure_bias',True);c.set_editor_property('post_process_settings',settings);c.set_editor_property('post_process_blend_weight',1.)
    u.get_editor_subsystem(u.UnrealEditorSubsystem).set_level_viewport_camera_info(location,rotation)
    intersections=[];lights=[]
    for a in actors:
     if not a.actor_has_tag('set:'+scene['id']):continue
     if isinstance(a,u.StaticMeshActor) and not a.actor_has_tag('environment:sky'):
      center,extent=a.get_actor_bounds(False)
      if all(abs(getattr(location,k)-getattr(center,k))<getattr(extent,k) for k in ('x','y','z')):intersections.append(a.get_actor_label())
     for lc in a.get_components_by_class(u.LocalLightComponent):lights.append({'actor':a.get_actor_label(),'intensity':lc.intensity,'attenuation_radius_cm':lc.attenuation_radius,'distance_to_subject_cm':(a.get_actor_location()-look).length()})
    state.update(capture=capture,component=c,target=target,world=world,frames=0,started=time.monotonic(),scene=scene,shot=shot,attempts=[],metadata={'saved_camera':str(cam.get_actor_location()),'schema_camera':world_cm(scene,shot['pos']),'capture_camera':str(location),'active_ppv':volumes[0].get_actor_label(),'camera_bounds_intersections':intersections,'local_lights':lights})
   # Slate callbacks are not rendered frames. Explicit CaptureScene with a
   # persistent view state supplies TAA/Lumen history even offscreen.
   state['component'].capture_scene()
   state['frames']+=1
   if state['frames']>=96 and time.monotonic()-state['started']>=3.:
    folder=ROOT/'Docs/qa/scenes'/state['scene']['id'];folder.mkdir(parents=True,exist_ok=True);name=state['shot']['name']+'.png'
    path=folder/name
    if not state['attempts'] and path.exists():
     archive=ROOT/'Saved/Textbook/CaptureHistory'/run_id/state['scene']['id'];archive.mkdir(parents=True,exist_ok=True);shutil.copy2(path,archive/name)
    u.RenderingLibrary.export_render_target(state['world'],state['target'],str(folder),name);assert path.is_file()
    audit_process=subprocess.run([qa_python,str(ROOT/'Tools/textbook_capture_quality.py'),str(path)],capture_output=True,text=True)
    if audit_process.returncode:raise RuntimeError('Pixel gate unavailable: '+audit_process.stderr)
    metrics=json.loads(audit_process.stdout);settings=state['component'].get_editor_property('post_process_settings');bias=float(settings.auto_exposure_bias)
    state['attempts'].append({'mean_luma':metrics['mean_luma'],'exposure_bias':bias,'warmup_frames':state['frames'],'warmup_seconds':round(time.monotonic()-state['started'],3)})
    mean=metrics['mean_luma']
    if (mean<40 or mean>170) and mean>0.1 and len(state['attempts'])<4:
     # Calibrate the actual camera exposure in-engine; PNG pixels stay untouched.
     change=max(-2.,min(2.,math.log2(100./mean)*1.4));settings.set_editor_property('auto_exposure_bias',max(-10.,min(4.,bias+change)));state['component'].set_editor_property('post_process_settings',settings);state.update(frames=0,started=time.monotonic());return
    metrics.update(state['metadata']);metrics.update(run_id=run_id,exposure_bias=bias,attempts=state['attempts']);metrics['path']=str(path.relative_to(ROOT))
    results[-1]['captures'].append(metrics);results[-1]['shots'].append(str(path.relative_to(ROOT)))
    if metrics['capture_quality']=='FAIL':results[-1]['quality']='FAIL';results[-1]['issues'].append('capture '+name+': '+', '.join(metrics['issues']))
    print('WQ_C7_SHOT '+json.dumps(metrics),flush=True);eas.destroy_actor(state['capture']);state.update(index=state['index']+1,capture=None)
  except Exception:
   import traceback;traceback.print_exc();sys.stderr.flush();os._exit(1)
 u.register_slate_post_tick_callback(tick)

def cli():
 from ue_character_common import run_locked_editor
 p=argparse.ArgumentParser();p.add_argument('--unit',type=int,default=1);p.add_argument('--source');p.add_argument('--section');p.add_argument('--shot');a=p.parse_args();read_unit(a.unit,a.source)
 from PIL import Image
 env={'WQ_TEXTBOOK_UNIT':str(a.unit),'WQ_QA_PYTHON':sys.executable}
 if a.source:env['WQ_TEXTBOOK_SOURCE']=str(Path(a.source).resolve())
 if a.section:env['WQ_TEXTBOOK_SECTION']=a.section
 if a.shot:env['WQ_TEXTBOOK_SHOT']=a.shot
 log=ROOT/f'Saved/Textbook/unit{a.unit:02d}-check.log';r=run_locked_editor(__file__,env,log)
 if r.returncode or 'WQ_C7_CAPTURE_COMPLETE' not in log.read_text(errors='replace'):raise SystemExit('Scene validation failed: '+str(log))
 report=json.loads((ROOT/f'Docs/qa/textbook-scenes-unit{a.unit:02d}.json').read_text());print('Pixel gate:',report['capture_quality'],'; failing visual sets:',sum(s['quality']=='FAIL' for s in report['scenes']))
 if report['capture_failures']:raise SystemExit(2)
if __name__=='__main__':
 try:import unreal
 except ImportError:cli()
 else:
  try:editor_main(unreal)
  except Exception:
   import traceback;traceback.print_exc();sys.stderr.flush();os._exit(1)
