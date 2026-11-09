"""C16: semantic physics labels for delivered Offline day props, never source mesh edits."""
import json
import math
import os
from pathlib import Path
import sys
ROOT=Path(__file__).resolve().parents[1]
SET='u01a_s1'
PROFILES={
 'phone':(1800,.95,.08,.45,'plastic','pickup'),
 'window':(650,.20,4.,20.,'glass','hinge'),
 'basket':(800,.55,.8,4.,'wood','pickup'),
 'chess_set':(700,.45,1.,6.,'wood','pickup'),
 'bookshelf':(650,.18,25.,80.,'wood','static'),
 'coffee_table':(650,.20,8.,30.,'wood','static'),
 'floor_lamp':(650,.20,2.,8.,'metal','static'),
 'calendar':(700,.60,.05,.5,'paper','static'),
 'remote':(1800,.95,.08,.45,'plastic','pickup'),
 'cup':(2400,.12,.06,.65,'ceramic','pickup'),
 'book':(700,.80,.05,2.,'paper','pickup'),
 'chess_piece':(650,.35,.004,.12,'wood','pickup'),
 'chair':(650,.035,3.,30.,'wood','push'),
 'drawer':(650,.12,1.,15.,'wood','slide'),
 'door':(650,.45,8.,50.,'wood','hinge'),
 'drawer':(650,.12,1.,15.,'wood','slide'),
}

def classify(tags):
 values=set(map(str,tags))
 if 'set:'+SET not in values or any(v.startswith(('actor:','character_part:')) for v in values):return None
 kit=next((v[4:] for v in values if v.startswith('kit:')),None)
 if kit in ('curtain','curtains','tablecloth','cloth'):return 'needs_cloth'
 exact={'phone':'phone','remote':'remote','remote_control':'remote','cup':'cup','mug':'cup','book':'book','chess_piece':'chess_piece','armchair':'chair','chair':'chair','door_leaf':'door','cabinet_door':'door','window_wall':'window','phone_basket':'basket','drawer_front':'drawer','drawer':'drawer','bookshelf':'bookshelf','coffee_table':'coffee_table','floor_lamp':'floor_lamp','calendar':'calendar'}
 if kit in exact:return exact[kit]
 dressing=next((v[9:] for v in values if v.startswith('dressing:')),'')
 if dressing.endswith('_cup'):return 'cup'
 if '_book_' in dressing or dressing.startswith('shelf_top_book_'):return 'book'
 if dressing.endswith('_chess_chair') or dressing.startswith('seat_'):return 'chair'
 return None

def mass_kg(kind,dimensions_cm):
 if kind not in PROFILES:raise ValueError('Unsupported physical kind')
 if len(dimensions_cm)!=3 or not all(isinstance(v,(int,float)) and math.isfinite(v) and v>0 for v in dimensions_cm):raise ValueError('Finite positive cm dimensions required')
 density,fill,minimum,maximum,_,_=PROFILES[kind]
 return min(maximum,max(minimum,math.prod(dimensions_cm)*1e-6*density*fill))

def physics_tags(tags,dimensions_cm):
 original=list(map(str,tags));kind=classify(original)
 if kind is None:return original
 # Idempotent updates never touch the actor's other ownership/layer tags.
 clean=[x for x in original if not x.startswith(('physics_kind:','physics_material:','physics_mode:','physics_mass_kg:'))]
 if kind=='needs_cloth':return sorted(set(clean+['needs_cloth']))
 density,fill,lo,hi,material,mode=PROFILES[kind]
 return sorted(set(clean+[f'physics_kind:{kind}',f'physics_material:{material}',f'physics_mode:{mode}',f'physics_mass_kg:{mass_kg(kind,dimensions_cm):.4f}','needs_contact_audio','physics_collision_pending']))

def s1_inventory():
 with open(ROOT/'Content/Data/npc/interactions_unit01.json',encoding='utf-8') as handle:data=json.load(handle)
 scene=next(s for s in data['scenes'] if s['scene']==SET)
 return {p['kit']:(p['interactive'],p['actions'],p['material']) for p in scene['props']}

def inventory_gaps():
 gaps=[]
 for kit,(interactive,actions,material) in sorted(s1_inventory().items()):
  if not interactive:continue
  if classify(['set:'+SET,'kit:'+kit]) is None:gaps.append({'kit':kit,'actions':actions,'reason':'no physics profile'})
 return gaps

def make_hint(u):
 path='/Game/Memory/Physics/M_InteractionHint'
 if u.EditorAssetLibrary.does_asset_exist(path):return u.load_asset(path)
 mel=u.MaterialEditingLibrary
 m=u.AssetToolsHelpers.get_asset_tools().create_asset('M_InteractionHint','/Game/Memory/Physics',u.Material,u.MaterialFactoryNew())
 m.set_editor_property('blend_mode',u.BlendMode.BLEND_TRANSLUCENT);m.set_editor_property('shading_model',u.MaterialShadingModel.MSM_UNLIT)
 edge=mel.create_material_expression(m,u.MaterialExpressionFresnel);edge.set_editor_property('exponent',5.)
 amount=mel.create_material_expression(m,u.MaterialExpressionConstant);amount.set_editor_property('r',.07)
 mul=mel.create_material_expression(m,u.MaterialExpressionMultiply);mel.connect_material_expressions(edge,'',mul,'A');mel.connect_material_expressions(amount,'',mul,'B');mel.connect_material_property(mul,'',u.MaterialProperty.MP_OPACITY)
 cold=mel.create_material_expression(m,u.MaterialExpressionConstant3Vector);cold.set_editor_property('constant',u.LinearColor(.6,.85,1.,1.));mel.connect_material_property(cold,'',u.MaterialProperty.MP_EMISSIVE_COLOR)
 mel.recompile_material(m);assert u.EditorAssetLibrary.save_loaded_asset(m);return m

def editor_main(u, exit_editor=True):
 les=u.get_editor_subsystem(u.LevelEditorSubsystem);eas=u.get_editor_subsystem(u.EditorActorSubsystem)
 assert les.load_level('/Game/Memory/Scenes/U01/L_U01_A')
 make_hint(u);records=[];kinds=set();cloth=[]
 for actor in eas.get_all_level_actors():
  tags=list(map(str,actor.tags));kind=classify(tags)
  if not kind:continue
  if not isinstance(actor,u.StaticMeshActor):continue
  centre,ext=actor.get_actor_bounds(False)
  dims=[max(.01,float(getattr(ext,k))*2) for k in 'xyz']
  actor.set_editor_property('tags',[u.Name(t) for t in physics_tags(tags,dims)])
  if kind=='needs_cloth':cloth.append(actor.get_actor_label());continue
  kinds.add(kind);records.append({'actor':actor.get_actor_label(),'kind':kind,'size_cm':dims,'mass_kg':mass_kg(kind,dims)})
 assert les.save_current_level()
 result={'set':SET,'objects':records,'cloth_pending':cloth,'inventory_gaps':inventory_gaps(),'missing':[k for k in ('door','drawer','chess_piece') if k not in kinds],'runtime':'NOT_TESTED','collision':'PREFER_EXISTING_SIMPLE_OR_CONVEX_RUNTIME_REVIEW','audio':'NEEDS_DELIVERED_SAMPLES'}
 target=ROOT/'Saved/Round5/physics-setup.json';target.parent.mkdir(parents=True,exist_ok=True);target.write_text(json.dumps(result,ensure_ascii=False,indent=2))
 print('WQ_OFFLINE_PHYSICS_CONFIGURED objects='+str(len(records)),flush=True)
 if exit_editor:os._exit(0)

if __name__=='__main__':
 try:import unreal
 except ImportError:
  sys.path.insert(0,str(ROOT/'Tools'));from ue_character_common import run_locked_editor
  log=ROOT/'Saved/Round5/physics-setup.log';result=run_locked_editor(__file__,{},log,engine='/Volumes/Games/Game-Engine/Epic Games/UE_5.8',total_timeout=600)
  if result.returncode or 'WQ_OFFLINE_PHYSICS_CONFIGURED' not in log.read_text(errors='replace'):raise SystemExit('C16 setup failed; see '+str(log))
 else:
  try:editor_main(unreal)
  except Exception:
   import traceback;traceback.print_exc();sys.stderr.flush();os._exit(1)
