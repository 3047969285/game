"""Repair missing sampler defaults and Nanite usage; preserve all texture overrides."""
import os,sys
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
def editor_main(u):
 mel=u.MaterialEditingLibrary;eal=u.EditorAssetLibrary
 defaults={k:u.load_asset('/Game/Memory/Props/Hero/Textures/T_calendar_board_'+k) for k in ('BaseColor','Normal','ARM')}
 assert all(defaults.values()),'Delivered typed PBR textures missing'
 repaired=[]
 for path in ('/Game/Memory/Props/Hero/Materials/M_HeroPBR','/Game/Memory/Materials/Arch/M_ArchWorld'):
  m=u.load_asset(path);assert m,path
  for expr in mel.get_material_expressions(m):
   if isinstance(expr,(u.MaterialExpressionTextureSampleParameter2D,u.MaterialExpressionTextureObjectParameter)):
    name=str(expr.get_editor_property('parameter_name'))
    if name in defaults:expr.set_editor_property('texture',defaults[name])
  mel.set_material_usage(m,u.MaterialUsage.MATUSAGE_NANITE)
  mel.recompile_material(m);assert eal.save_loaded_asset(m)
  repaired.append(path)
 for folder in ('/Game/Memory/Props/Hero/Materials','/Game/Memory/Materials/Arch'):
  for path in eal.list_assets(folder,recursive=True,include_folder=False):
   asset=u.load_asset(path)
   if isinstance(asset,u.MaterialInstanceConstant):
    # Updating the parent usage is serialized; refresh dependent permutations.
    mel.update_material_instance(asset);assert eal.save_loaded_asset(asset)
 print('WQ_SCENE_SAMPLER_DEFAULTS_REPAIRED '+str(repaired),flush=True);os._exit(0)
if __name__=='__main__':
 try:import unreal
 except ImportError:
  sys.path.insert(0,str(ROOT/'Tools'));from ue_character_common import run_locked_editor
  log=ROOT/'Saved/Opening2090/scene-material-repair.log';r=run_locked_editor(__file__,{},log)
  if r.returncode or 'WQ_SCENE_SAMPLER_DEFAULTS_REPAIRED' not in log.read_text(errors='replace'):raise SystemExit('Scene material repair failed: '+str(log))
 else:
  try:editor_main(unreal)
  except Exception:
   import traceback;traceback.print_exc();sys.stderr.flush();os._exit(1)
