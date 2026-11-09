"""Native automation only, full editor, total + external timeout, no credentials."""
import os,re,sys,time,json
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
def editor_main(u):
 u.EditorPythonScripting.set_keep_python_script_alive(True)
 ues=u.get_editor_subsystem(u.UnrealEditorSubsystem);handle=[];started=time.monotonic();state={'requested':False}
 def end(code):
  if handle:u.unregister_slate_post_tick_callback(handle[0])
  sys.stdout.flush();sys.stderr.flush();os._exit(code)
 def tick(dt):
  try:
   assert time.monotonic()-started<90,'Native test total timeout'
   if not state['requested']:
    u.SystemLibrary.execute_console_command(ues.get_editor_world(),'Automation RunTests WordQuest.Npc');state['requested']=True;return
   if time.monotonic()-started<5 or u.AutomationLibrary.are_automated_tests_running():return
   u.SystemLibrary.execute_console_command(ues.get_editor_world(),'log flush')
   text=(ROOT/'Saved/Round6/npc-native.log').read_text(errors='replace')
   results=re.findall(r'Test Completed\. Result=\{([^}]+)\} Name=\{([^}]+)\} Path=\{(WordQuest\.Npc[^}]+)\}',text)
   if len(results)<5:return
   (ROOT/'Saved/Round6/npc-native.json').write_text(json.dumps({'tests':[{'result':r[0],'name':r[2]} for r in results]},indent=2))
   assert all(r[0]=='Success' for r in results),[(r[0],r[2]) for r in results]
   print('WQ_NPC_NATIVE_PASS',flush=True);end(0)
  except Exception:
   import traceback;traceback.print_exc();end(1)
 handle.append(u.register_slate_post_tick_callback(tick))
if __name__=='__main__':
 try:import unreal
 except ImportError:
  sys.path.insert(0,str(ROOT/'Tools'));from ue_character_common import run_locked_editor
  log=ROOT/'Saved/Round6/npc-native.log';r=run_locked_editor(__file__,{},log,level='/Engine/Maps/Entry',total_timeout=420)
  if r.returncode or 'WQ_NPC_NATIVE_PASS' not in log.read_text(errors='replace'):raise SystemExit('Native NPC tests failed; see Saved/Round6/npc-native.log')
 else:editor_main(unreal)
