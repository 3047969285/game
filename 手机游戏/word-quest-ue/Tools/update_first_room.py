"""Update only the first room's generated dressing/people; preserve all other sets."""
import os,sys,json
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
ENGINE='/Volumes/Games/Game-Engine/Epic Games/UE_5.8'
sys.path.insert(0,str(ROOT/'Tools'))
def editor_main(u):
 from textbook_scene_contract import read_unit,world_cm
 from living_room_dressing import spawn_room_dressing
 from textbook_character_staging import stage_people
 from room_shell import GLASS,spawn_room_shell,apply_room_lighting
 scene=read_unit(1)['articles'][0]['scenes'][0]
 les=u.get_editor_subsystem(u.LevelEditorSubsystem);eas=u.get_editor_subsystem(u.EditorActorSubsystem)
 assert les.load_level('/Game/Memory/Scenes/U01/L_U01_A')
 for actor in list(eas.get_all_level_actors()):
  if actor.actor_has_tag('set:'+scene['id']) and (actor.actor_has_tag('environment:hdri_backdrop') or actor.actor_has_tag('room_shell') or actor.actor_has_tag('room_dressing') or actor.actor_has_tag('clutter') or any(str(t).startswith(('actor:','character_part:')) for t in actor.tags)):
   eas.destroy_actor(actor)
  elif actor.get_actor_label().startswith('NAME_'+scene['id']+'_'):eas.destroy_actor(actor)
 def tags(actor,values):actor.set_editor_property('tags',[u.Name(t) for t in set(['textbook_generated']+values)])
 def spawn(cls,label,loc,values):
  actor=eas.spawn_actor_from_class(cls,u.Vector(*loc));actor.set_actor_label(label);actor.set_actor_location(u.Vector(*loc),False,True);tags(actor,values);return actor
 mapping=json.loads((ROOT/'Content/Data/memory/kit_assets.json').read_text())
 shell=spawn_room_shell(u,spawn,scene,world_cm)
 glass_actors=[a for a in eas.get_all_level_actors() if a.get_actor_label()==f"ROOM_{scene['id']}_WINDOW_0_glass"]
 if len(glass_actors)!=1: raise RuntimeError(f"Expected one window pane, found {len(glass_actors)}")
 glass=glass_actors[0].static_mesh_component.get_material(0)
 glass_path=str(glass.get_path_name()).split(".",1)[0] if glass else ""
 if glass_path!=GLASS: raise RuntimeError(f"Clear window glass was not applied: {glass_path or 'None'}")
 lighting=apply_room_lighting(u,scene)
 report=spawn_room_dressing(u,spawn,scene,mapping)
 people=stage_people(u,eas,scene,world_cm,tags,strict=True)
 assert les.save_current_level()
 result={'spawned_details':len(report['spawned']),'missing':report['missing'],'room_shell':{'spawned':len(shell['spawned']),'missing':shell['missing']},'window_glass_material':glass_path,'lighting':lighting,'people':people,'visual':'REQUIRES_REVIEW'}
 out=ROOT/'Saved/Opening2090/first-room.json';out.parent.mkdir(parents=True,exist_ok=True);out.write_text(json.dumps(result,ensure_ascii=False,indent=2));print('WQ_FIRST_ROOM_UPDATED',flush=True);os._exit(0)
if __name__=='__main__':
 try:import unreal
 except ImportError:
  from ue_character_common import run_locked_editor
  log=ROOT/'Saved/Opening2090/first-room.log';r=run_locked_editor(__file__,{},log,engine=ENGINE,total_timeout=900)
  if r.returncode or 'WQ_FIRST_ROOM_UPDATED' not in log.read_text(errors='replace'):raise SystemExit('First room update failed: '+str(log))
 else:
  try:editor_main(unreal)
  except Exception:
   import traceback;traceback.print_exc();sys.stderr.flush();os._exit(1)
