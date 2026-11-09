"""C16 deterministic contracts; --editor runs real Chaos interaction checks through UE lock."""
import json
import math
import os
from pathlib import Path
import re
import sys
import time
import unittest
ROOT=Path(__file__).resolve().parents[1]
sys.path.insert(0,str(ROOT/'Tools'))
from setup_offline_physics import SET,PROFILES,classify,mass_kg,physics_tags

class PhysicsContractTests(unittest.TestCase):
 def test_supported_props_and_separate_chess(self):
  for kit,kind in [('phone','phone'),('cup','cup'),('book','book'),('armchair','chair'),('door_leaf','door'),('drawer','drawer')]:
   self.assertEqual(classify(['set:'+SET,'kit:'+kit]),kind)
  self.assertIsNone(classify(['set:'+SET,'kit:chess_set']))
 def test_scoped_and_character_source_untouched(self):
  self.assertIsNone(classify(['set:u01a_s2','kit:phone']))
  self.assertIsNone(classify(['set:'+SET,'kit:phone','actor:paul']))
 def test_hollow_mug_does_not_use_solid_aabb(self):
  estimated=mass_kg('cup',[9.5,9.5,9.5]);solid=(.095**3)*2400
  self.assertGreater(estimated,.1);self.assertLess(estimated,.4);self.assertLess(estimated,solid*.2)
 def test_phone_and_furniture_have_bounded_plausible_mass(self):
  self.assertAlmostEqual(mass_kg('phone',[7.5,15.5,.9]),.17890875,places=6)
  self.assertLessEqual(mass_kg('chair',[500,500,500]),30)
  self.assertGreaterEqual(mass_kg('chess_piece',[.1,.1,.1]),.004)
 def test_invalid_dimensions_rejected(self):
  for dims in ([1,2],[0,1,2],[-1,2,3],[float('nan'),1,2],[float('inf'),1,2]):
   with self.assertRaises(ValueError):mass_kg('phone',dims)
 def test_labels_idempotent_and_preserve_ownership(self):
  original=['textbook_generated','set:'+SET,'kit:book','layer:always','physics_mass_kg:999']
  once=physics_tags(original,[16,24,3]);self.assertEqual(physics_tags(once,[16,24,3]),once)
  self.assertIn('layer:always',once);self.assertIn('kit:book',once);self.assertNotIn('physics_mass_kg:999',once)
 def test_missing_cloth_and_audio_remain_explicit(self):
  self.assertIn('needs_cloth',physics_tags(['set:'+SET,'kit:curtains'],[100,2,200]))
  tags=physics_tags(['set:'+SET,'kit:cup'],[9,9,10]);self.assertIn('needs_contact_audio',tags);self.assertIn('physics_collision_pending',tags);self.assertNotIn('needs_convex_collision',tags)
 def test_room_shell_identifies_only_door_leaf_and_window_glass(self):
  from room_shell import shell_boxes
  with (ROOT/'Content/Data/memory/textbook_scenes/unit01.json').open(encoding='utf-8') as f:
   data=json.load(f)
  def find(value):
   if isinstance(value,dict):
    if value.get('id')==SET and 'room' in value:return value['room']
    for child in value.values():
     found=find(child)
     if found:return found
   if isinstance(value,list):
    for child in value:
     found=find(child)
     if found:return found
  room=find(data);self.assertIsNotNone(room)
  boxes=shell_boxes(room)
  doors=[b for b in boxes if 'interactive:door' in b['tags']]
  panes=[b for b in boxes if 'interactive:window' in b['tags'] and 'glass' in b['tags']]
  self.assertEqual(len(doors),1);self.assertEqual(len(panes),1)
  self.assertIn('hinge:south',doors[0]['tags'])
  self.assertGreater(doors[0]['size'][1],doors[0]['size'][0])
  self.assertGreater(panes[0]['size'][1],panes[0]['size'][0])
 def test_dressing_classification(self):
  self.assertEqual(classify(['set:'+SET,'dressing:left_book_2']),'book')
  self.assertEqual(classify(['set:'+SET,'dressing:left_cup']),'cup')
  self.assertIsNone(classify(['set:'+SET,'dressing:left_reading_table']))
  self.assertEqual(classify(['set:'+SET,'dressing:seat_jason']),'chair')

def editor_main(u, on_complete=None):
 les=u.get_editor_subsystem(u.LevelEditorSubsystem);ues=u.get_editor_subsystem(u.UnrealEditorSubsystem)
 assert les.load_level('/Game/Memory/Scenes/U01/L_U01_A')
 u.EditorPythonScripting.set_keep_python_script_alive(True)
 handle=[]
 def finish():
  if on_complete:
   if handle:u.unregister_slate_post_tick_callback(handle[0])
   on_complete();return
  os._exit(0)
 state={'phase':'start','started':time.monotonic(),'records':[]}
 def aim(world,actor):
  pc=u.GameplayStatics.get_player_controller(world,0);camera=pc.get_view_target()
  target,_=actor.get_actor_bounds(False);position=u.Vector(target.x-90,target.y,max(172,target.z+40))
  rotation=u.MathLibrary.find_look_at_rotation(position,target)
  if isinstance(camera,u.WordQuestFirstPersonCharacter):camera.place_view(position,rotation)
  else:camera.set_actor_location(position,False,True);camera.set_actor_rotation(rotation,False)
  pc.set_control_rotation(rotation)
  state['gaze_started']=time.monotonic()
 def tick(dt):
  try:
   if state.get('last_phase')!=state['phase']:
    state['last_phase']=state['phase'];print('WQ_C16_PHASE '+state['phase'],flush=True)
   if time.monotonic()-state['started']>90:raise RuntimeError('Physics PIE timeout at '+state['phase'])
   if state['phase']=='start':les.editor_request_begin_play();state['phase']='load';return
   world=ues.get_game_world()
   if not world:return
   gm=u.GameplayStatics.get_game_mode(world)
   if not gm:return
   component=gm.get_component_by_class(u.WordQuestWorldInteraction);assert component,'MemoryGameMode missing WorldInteraction'
   if state['phase']=='load':
    actors=u.GameplayStatics.get_all_actors_with_tag(world,'set:'+SET)
    pickup=[a for a in actors if a.actor_has_tag('physics_mode:pickup') and a.actor_has_tag('physics_runtime_ready')]
    chairs=[a for a in actors if a.actor_has_tag('physics_kind:chair') and a.actor_has_tag('physics_runtime_ready')]
    assert pickup,'No delivered pick-up props configured'
    assert chairs,'No delivered pushable chair configured'
    assert any(a.actor_has_tag('interactive:door') and a.actor_has_tag('physics_runtime_ready') for a in actors),'Room door unavailable'
    state['records'].append({'action':'open_window','result':'NOT_AVAILABLE','reason':'Fixed glass; movable sash not delivered'})
    state['pickup']=pickup[0];state['chairs']=chairs;state['joints']=[a for a in actors if (a.actor_has_tag('physics_mode:hinge') or a.actor_has_tag('physics_mode:slide')) and not a.actor_has_tag('interactive:window')]
    state['start_positions']={a.get_name():a.get_actor_location() for a in pickup+chairs};state['phase']='settle';state['settle_started']=time.monotonic();return
   if state['phase']=='settle':
    if time.monotonic()-state['settle_started']<1:return
    aim(world,state['pickup']);component.probe_focus_actor(state['pickup']);state['records'].append({'action':'focus','result':'PROBE_ASSISTED','reason':'Unassisted ray selected another actor'});state['phase']='gaze_pickup';return
   if state['phase']=='gaze_pickup':
    if time.monotonic()-state['gaze_started']<.6:return
    if 'gaze=0.' in component.get_interaction_state():
     match=re.search(r'gaze=([\d.]+)',component.get_interaction_state())
     if match and float(match.group(1))<.3:return
    assert component.interact(),component.get_interaction_state()
    info=component.get_interaction_state();assert 'held=None' not in info,info
    state['records'].append({'action':'grab','state':info})
    component.inspect_held(u.Rotator(0,45,0));state['hold_started']=time.monotonic();state['phase']='hold';return
   if state['phase']=='hold':
    if time.monotonic()-state['hold_started']<.8:return
    component.release_held(False);assert 'held=None' in component.get_interaction_state()
    state['records'].append({'action':'inspect_drop','state':component.get_interaction_state()})
    aim(world,state['pickup']);component.probe_focus_actor(state['pickup']);state['phase']='gaze_throw';return
   if state['phase']=='gaze_throw':
    if time.monotonic()-state['gaze_started']<.6:return
    if not component.interact():return
    assert 'held=None' not in component.get_interaction_state()
    component.release_held(True);state['records'].append({'action':'throw','state':component.get_interaction_state()})
    state['phase']='settle_throw';state['settle_started']=time.monotonic();return
   if state['phase']=='settle_throw':
    if time.monotonic()-state['settle_started']<1:return
    pos=state['pickup'].get_actor_location();assert all(math.isfinite(v) for v in (pos.x,pos.y,pos.z));assert abs(pos.x)<1800 and abs(pos.y)<1800 and pos.z>-10, ('throw escaped or fell through floor',str(pos))
    if state['chairs']:
     aim(world,state['chairs'][0]);component.probe_focus_actor(state['chairs'][0]);state['phase']='gaze_chair';return
    state['records'].append({'action':'push','result':'NOT_AVAILABLE'});state['phase']='joints';return
   if state['phase']=='gaze_chair':
    if time.monotonic()-state['gaze_started']<.6:return
    assert component.push_focused(),component.get_interaction_state();state['records'].append({'action':'push','state':component.get_interaction_state()});state['phase']='joints';return
   if state['phase']=='joints':
    if not state['joints']:
     if not any(r['action']=='hinge_or_slide' for r in state['records']):raise AssertionError('No door movement verified')
     state['records'].append({'action':'drawer','result':'NOT_AVAILABLE','reason':'Independent drawer not delivered'});state['phase']='done';return
    state['joint']=state['joints'].pop();aim(world,state['joint']);component.probe_focus_actor(state['joint']);state['phase']='gaze_joint';return
   if state['phase']=='gaze_joint':
    if time.monotonic()-state['gaze_started']<.6:return
    joint=state['joint'];state['joint_before']=joint.get_actor_transform()
    assert component.interact(),component.get_interaction_state()
    state['joint_started']=time.monotonic();state['phase']='joint_motion';return
   if state['phase']=='joint_motion':
    if time.monotonic()-state['joint_started']<1.5:return
    joint=state['joint'];before=state['joint_before'];after=joint.get_actor_transform()
    delta=abs((after.rotation.rotator().yaw-before.rotation.rotator().yaw+180)%360-180)
    distance=(after.translation-before.translation).length()
    assert delta>2. or distance>2., ('constraint did not move',joint.get_name(),delta,distance)
    state['records'].append({'action':'hinge_or_slide','actor':joint.get_name(),'delta_yaw':delta,'delta_cm':distance,'state':component.get_interaction_state()})
    component.probe_release_focus();state['phase']='joints';return
   if state['phase']=='done':
    info=component.get_interaction_state();assert 'flying=0' in info,info
    out=ROOT/'Saved/Round6/physics-playthrough.json';out.parent.mkdir(parents=True,exist_ok=True)
    out.write_text(json.dumps({'technical':'PASS','visual':'NOT_ACCEPTED','records':state['records']},indent=2));print('WQ_OFFLINE_PHYSICS_PIE_PASS',flush=True);finish()
  except Exception:
   import traceback;traceback.print_exc();sys.stderr.flush()
   if handle:u.unregister_slate_post_tick_callback(handle[0])
   os._exit(1)
 handle.append(u.register_slate_post_tick_callback(tick))

if __name__=='__main__':
 try:import unreal
 except ImportError:
  if '--editor' in sys.argv:
   sys.path.insert(0,str(ROOT/'Tools'));from ue_character_common import run_locked_editor
   log=ROOT/'Saved/Round6/physics-playthrough.log';r=run_locked_editor(__file__,{},log,total_timeout=600)
   if r.returncode or 'WQ_OFFLINE_PHYSICS_PIE_PASS' not in log.read_text(errors='replace'):raise SystemExit('Physics PIE failed: '+str(log))
  else:unittest.main()
 else:editor_main(unreal)
