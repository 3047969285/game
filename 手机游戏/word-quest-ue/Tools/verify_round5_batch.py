"""One locked editor, sequential worlds; avoids reloading all editor plugins per check."""
import json,os,re,sys,time,threading
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
sys.path.insert(0,str(ROOT/'Tools'))
def editor_main(u):
 from http.server import ThreadingHTTPServer
 from test_npc_client_mock import MockHandler
 import setup_offline_physics,test_offline_physics,test_npc_client_mock,test_npc_online_round5
 import round5_renderer_audit,round5_assembly_preflight
 u.EditorPythonScripting.set_keep_python_script_alive(True)
 les=u.get_editor_subsystem(u.LevelEditorSubsystem);ues=u.get_editor_subsystem(u.UnrealEditorSubsystem)
 state={'phase':'physics_setup','completed':[],'start':time.monotonic(),'at':time.monotonic()}
 saved_env={k:os.environ.get(k) for k in ('DEEPSEEK_API_KEY','DEEPSEEK_BASE_URL','WQ_NPC_MOCK_RUN')}
 def done(next_phase):
  state['completed'].append(state['phase']);les.editor_request_end_play();state.update(phase='end_play',next=next_phase,at=time.monotonic())
 def tick(dt):
  try:
   if time.monotonic()-state['start']>1500:raise RuntimeError('Batch timeout')
   phase=state['phase']
   if phase=='end_play':
    if ues.get_game_world() or time.monotonic()-state['at']<1:return
    u.SystemLibrary.collect_garbage();state['phase']=state['next'];return
   if phase=='physics_setup':
    setup_offline_physics.editor_main(u,False);state['completed'].append('physics_setup')
    state['phase']='physics_running';test_offline_physics.editor_main(u,lambda:done('mock_setup'));return
   if phase=='mock_setup':
    assert les.load_level('/Engine/Maps/Entry')
    server=ThreadingHTTPServer(('127.0.0.1',0),MockHandler);threading.Thread(target=server.serve_forever,daemon=True).start();state['server']=server
    os.environ['DEEPSEEK_API_KEY']='mock-local-only';os.environ['DEEPSEEK_BASE_URL']='http://127.0.0.1:'+str(server.server_port);os.environ['WQ_NPC_MOCK_RUN']='batch-'+str(time.time_ns())
    state['phase']='mock_running';test_npc_client_mock.editor_main(u,lambda:done('online_setup'));return
   if phase=='online_setup':
    state.pop('server').shutdown()
    for k,v in saved_env.items():
     if v is None:os.environ.pop(k,None)
     else:os.environ[k]=v
    assert les.load_level('/Engine/Maps/Entry')
    state['phase']='online_running';test_npc_online_round5.editor_main(u,lambda:done('capabilities'));return
   if phase=='capabilities':
    round5_renderer_audit.editor_main(u,False);state['completed'].append('render_capabilities')
    round5_assembly_preflight.editor_main(u,False);state['completed'].append('assembly_preflight')
    world=ues.get_editor_world();u.SystemLibrary.execute_console_command(world,'Automation RunTests WordQuest.Npc');state.update(phase='native_tests',at=time.monotonic());return
   if phase=='native_tests':
    if time.monotonic()-state['at']<5 or u.AutomationLibrary.are_automated_tests_running():return
    u.SystemLibrary.execute_console_command(ues.get_editor_world(),'log flush')
    text=(ROOT/'Saved/Round5/verification-batch.log').read_text(errors='replace')
    results=re.findall(r'Test Completed\. Result=\{([^}]+)\} Name=\{([^}]+)\} Path=\{(WordQuest\.Npc[^}]+)\}',text)
    if len(results)<3:
     if time.monotonic()-state['at']>60:raise RuntimeError('Native test results missing')
     return
    assert all(r[0]=='Success' for r in results),[(r[0],r[2]) for r in results]
    report={'completed':state['completed'],'native_tests':[{'result':r[0],'name':r[2]} for r in results],'visual_acceptance':'PENDING'}
    (ROOT/'Saved/Round5/verification-batch.json').write_text(json.dumps(report,indent=2));print('WQ_ROUND5_BATCH_FINISHED',flush=True);os._exit(0)
  except Exception:
   import traceback;traceback.print_exc();sys.stderr.flush();os._exit(1)
 u.register_slate_post_tick_callback(tick)
if __name__=='__main__':
 try:import unreal
 except ImportError:
  from ue_character_common import run_locked_editor
  log=ROOT/'Saved/Round5/verification-batch.log';r=run_locked_editor(__file__,{},log,level='/Engine/Maps/Entry')
  if r.returncode or 'WQ_ROUND5_BATCH_FINISHED' not in log.read_text(errors='replace'):raise SystemExit('Round5 batch needs repair; inspect redacted log')
 else:editor_main(unreal)
