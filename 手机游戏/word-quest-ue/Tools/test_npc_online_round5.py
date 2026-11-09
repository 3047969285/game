"""Bounded five-turn Paul test. Credentials are read only inside the runtime client."""
import json,os,re,sys,time
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
QUESTIONS=['Hi Paul. What are you reading today?','Why are the phones in a basket?','I spends too much time on my phone. What can I try?','Can we play a game together instead?','What is one small habit I can try tomorrow?']
def editor_main(u, on_complete=None):
 u.EditorPythonScripting.set_keep_python_script_alive(True)
 les=u.get_editor_subsystem(u.LevelEditorSubsystem);ues=u.get_editor_subsystem(u.UnrealEditorSubsystem)
 handle=[]
 def finish():
  if on_complete:
   if handle:u.unregister_slate_post_tick_callback(handle[0])
   on_complete();return
  os._exit(0)
 state={'phase':'start','started':time.monotonic(),'turn':0,'records':[]}
 def tick(dt):
  try:
   assert time.monotonic()-state['started']<120,'Online verification timeout'
   if state['phase']=='start':les.editor_request_begin_play();state['phase']='world';return
   world=ues.get_game_world()
   if not world:return
   if state['phase']=='world':
    gm=u.GameplayStatics.get_game_mode(world)
    if not gm:return
    c=u.new_object(u.WordQuestNpcDialogueClient,outer=gm);assert c.configure('paul','u01a_s1'),c.get_state()
    state['client']=c;state['phase']='send'
   c=state['client']
   if state['phase']=='send':
    state['submitted']=time.monotonic();c.submit(QUESTIONS[state['turn']]);state['phase']='wait';return
   if state['phase']=='wait' and not c.is_busy():
    info=c.get_state();response=c.get_visible_text()
    state['records'].append({'turn':state['turn']+1,'state':info,'elapsed_s':time.monotonic()-state['submitted'],'response':response,'suggestions':list(c.get_suggestions())})
    first=re.search(r'first_visible_ms=([0-9.]+)',info)
    if 'state=complete' not in info:
     state.setdefault('failures',[]).append('turn_%d_fallback' % (state['turn']+1))
    elif not first or not 0 <= float(first.group(1)) < 3000:
     state.setdefault('failures',[]).append('turn_%d_first_visible_latency' % (state['turn']+1))
    state['turn']+=1;state['phase']='done' if state['turn']==int(os.environ.get('WQ_NPC_TEST_TURNS',len(QUESTIONS))) else 'send';return
   if state['phase']=='done':
    state.pop('client',None);state['result']='FAIL_'+','.join(state['failures']) if state.get('failures') else ('FIVE_TURNS_COMPLETE_REQUIRES_LANGUAGE_REVIEW' if len(state['records'])==5 else 'DIAGNOSTIC_COMPLETE_REQUIRES_LANGUAGE_REVIEW')
    out=ROOT/'Saved/NpcTests'/os.environ['WQ_NPC_ONLINE_RUN']/'online-result.json';out.parent.mkdir(parents=True,exist_ok=True);out.write_text(json.dumps(state,ensure_ascii=False,indent=2));print('WQ_NPC_ONLINE_RECORDED '+state['result'],flush=True)
    if state['result'] not in ('FIVE_TURNS_COMPLETE_REQUIRES_LANGUAGE_REVIEW','DIAGNOSTIC_COMPLETE_REQUIRES_LANGUAGE_REVIEW'):
     if handle:u.unregister_slate_post_tick_callback(handle[0])
     os._exit(1)
    finish()
  except Exception:
   import traceback;traceback.print_exc();sys.stderr.flush()
   if handle:u.unregister_slate_post_tick_callback(handle[0])
   os._exit(1)
 handle.append(u.register_slate_post_tick_callback(tick))
if __name__=='__main__':
 try:import unreal
 except ImportError:
  sys.path.insert(0,str(ROOT/'Tools'));from ue_character_common import run_locked_editor
  log=ROOT/'Saved/Round5/npc-online.log';run='online-'+str(time.time_ns());r=run_locked_editor(__file__,{'WQ_NPC_ONLINE_RUN':run},log,level='/Engine/Maps/Entry',total_timeout=420)
  if r.returncode or 'WQ_NPC_ONLINE_RECORDED' not in log.read_text(errors='replace'):raise SystemExit('Online test failed; inspect redacted log')
 else:editor_main(unreal)
