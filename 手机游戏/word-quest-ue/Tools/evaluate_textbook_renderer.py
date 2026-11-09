"""Locked real Metal SM6 baseline / HWRT+MegaLights evaluation. No project settings mutated."""
import os,sys,json,time,statistics
from pathlib import Path
sys.path.insert(0,str(Path(__file__).resolve().parent))
ROOT=Path(__file__).resolve().parents[1]
def editor_main(u):
 variant=os.environ.get('WQ_RENDER_VARIANT','baseline')
 if variant!='baseline':
  world=u.get_editor_subsystem(u.UnrealEditorSubsystem).get_editor_world()
  for command in ['r.Lumen.HardwareRayTracing 1','r.MegaLights.EnableForProject 1','r.MegaLights.Allowed 1']:u.SystemLibrary.execute_console_command(world,command)
 frames=[];state={'n':0};u.EditorPythonScripting.set_keep_python_script_alive(True)
 def tick(dt):
  state['n']+=1
  if state['n']>60:frames.append(float(dt)*1000)
  if state['n']>=150:
   caps=dict(u.WordQuestRenderDiagnostics.capabilities());out={'variant':variant,'capabilities':caps,'editor_frame_ms_mean':statistics.mean(frames),'editor_frame_ms_p95':sorted(frames)[int(len(frames)*.95)],'samples':len(frames),'note':'Editor workload diagnostic, not game FPS acceptance. Final scene visual review pending.'}
   folder=ROOT/'Saved/Textbook/Renderer';folder.mkdir(parents=True,exist_ok=True);(folder/(variant+'.json')).write_text(json.dumps(out,indent=2));print('WQ_RENDER_EVAL_PASS '+json.dumps(out));sys.stdout.flush();os._exit(0)
 u.register_slate_post_tick_callback(tick)
if __name__=='__main__':
 try:import unreal
 except ImportError:
  from ue_character_common import run_locked_editor
  for name,flags in [('baseline',[]),('hwrt_megalights',['-ini:Engine:[/Script/Engine.RendererSettings]:r.RayTracing=True'])]:
   log=ROOT/f'Saved/Textbook/Renderer/{name}.log';r=run_locked_editor(__file__,{'WQ_RENDER_VARIANT':name},log,extra_args=flags)
   if r.returncode or 'WQ_RENDER_EVAL_PASS' not in log.read_text(errors='replace'):raise SystemExit('Renderer evaluation failed: '+str(log))
 else:
  try:editor_main(unreal)
  except Exception:
   import traceback;traceback.print_exc();sys.stderr.flush();os._exit(1)
