"""Full-editor native client against local HTTP, using only mock-local-only credentials.

No real key file is opened. Main thread owns the locked UE lifecycle; do not run
while Blender/another editor is using the 16 GB host. Writes isolated Saved/NpcTests.
"""
import json
import os
import sys
import threading
import time
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
class MockHandler(BaseHTTPRequestHandler):
    def log_message(self,*args):
        pass
    def do_POST(self):
        assert self.path=='/chat/completions'
        assert self.headers.get('Authorization')=='Bearer mock-local-only'
        data=json.loads(self.rfile.read(int(self.headers['Content-Length'])))
        assert data['stream'] is True
        assert data['stream_options']['include_usage'] is True
        assert '{{display_name}}' not in data['messages'][0]['content']
        messages=data['messages']
        assert '{{focus_words}}' not in messages[0]['content']
        prompt=next((m['content'] for m in reversed(messages) if m['role']=='user' and ('repair ' in m['content'] or 'future claim' in m['content'] or 'timeout' in m['content'] or 'offline stream' in m['content'])), '')
        repairing=messages[-1]['role']=='user' and messages[-1]['content'].startswith('Repeat the reply in character.')
        if 'timeout' in prompt:
            time.sleep(9.5)
        try:
            self.send_response(200);self.send_header('Content-Type','text/event-stream');self.end_headers()
            speech = 'I remember living in 2090; a device was different.' if 'future claim' in prompt and not repairing else 'A device can wait. Let us talk — 你好.'
            metadata = '\n@@META ' + json.dumps({'used_words':['device'],'correction':None,'suggested_replies':['What are you reading?','Let us play chess.','Can I sit here?']},ensure_ascii=False)
            if 'repair twice' in prompt or ('repair once' in prompt and not repairing): metadata = ''
            parts=[speech, metadata]
            for text in parts:
                line=('data: '+json.dumps({'choices':[{'delta':{'content':text}}]},ensure_ascii=False)+'\r\n\r\n').encode()
                for b in line:
                    self.wfile.write(bytes([b]));self.wfile.flush()
                time.sleep(.025)
            self.wfile.write(b'data: {"choices":[],"usage":{"total_tokens":23}}\n\ndata: [DONE]\n\n');self.wfile.flush()
        except (BrokenPipeError,ConnectionResetError):
            pass

def editor_main(u, on_complete=None):
    u.EditorPythonScripting.set_keep_python_script_alive(True)
    les=u.get_editor_subsystem(u.LevelEditorSubsystem)
    ues=u.get_editor_subsystem(u.UnrealEditorSubsystem)
    handle=[]
    def finish():
     if on_complete:
      if handle:u.unregister_slate_post_tick_callback(handle[0])
      on_complete();return
     os._exit(0)
    state={'phase':'start','started':time.monotonic(),'records':[]}
    def tick(dt):
        try:
            assert time.monotonic()-state['started']<120,'native mock test timeout'
            if state['phase']=='start':
                les.editor_request_begin_play();state['phase']='waiting_world';return
            world=ues.get_game_world()
            if not world:return
            if state['phase']=='waiting_world':
                gm=u.GameplayStatics.get_game_mode(world)
                if not gm:return
                client=u.new_object(u.WordQuestNpcDialogueClient,outer=gm)
                state['client']=client
                assert client.configure('paul','u01a_s1'),client.get_state()
                assert client.submit('offline stream')
                state['phase']='stream';return
            client=state['client'];info=client.get_state()
            if state['phase']=='stream' and not client.is_busy():
                assert 'state=complete' in info,info
                assert client.get_visible_text()=='A device can wait. Let us talk — 你好.',client.get_visible_text()
                assert len(client.get_suggestions())==3
                assert 'tokens=23' in info
                state['records'].append({'case':'native_utf8_stream','state':info})
                assert client.submit('repair once');state['phase']='repair';return
            if state['phase']=='repair' and not client.is_busy():
                assert 'state=complete' in info and 'retries=1' in info,info
                state['records'].append({'case':'metadata_repair','state':info})
                assert client.submit('repair twice');state['phase']='invalid';return
            if state['phase']=='invalid' and not client.is_busy():
                # Claude 11-02: a clean spoken reply survives a second metadata failure (shown without suggestions)
                assert 'complete_without_metadata:metadata_missing' in info and 'retries=1' in info,info
                state['records'].append({'case':'invalid_metadata_keeps_reply','state':info})
                assert client.submit('future claim'),client.get_state();state['phase']='future';return
            if state['phase']=='future' and not client.is_busy():
                assert 'state=complete' in info and 'retries=1' in info,info
                assert '2090' not in client.get_visible_text()
                state['records'].append({'case':'future_claim_repair','state':info})
                assert client.submit('offline stream'),client.get_state();client.cancel();state['phase']='cancel';state['cancel_started']=time.monotonic();return
            if state['phase']=='cancel':
                if time.monotonic()-state['cancel_started']<1:return
                assert 'state=cancelled' in info and not client.is_busy(),info
                state['records'].append({'case':'native_cancel','state':info})
                assert client.configure('paul','u01a_s2'),client.get_state()
                assert client.submit('timeout please'),client.get_state();state['phase']='timeout';state['timeout_started']=time.monotonic();return
            if state['phase']=='timeout' and not client.is_busy():
                assert 'fallback:' in info,info
                assert 7.0<time.monotonic()-state['timeout_started']<12.0
                assert client.get_visible_text()
                state['records'].append({'case':'native_timeout_fallback','state':info})
                run=os.environ['WQ_NPC_MOCK_RUN'];folder=ROOT/'Saved/NpcTests'/run
                for path in folder.glob('*'):
                    if path.is_file():assert b'Bearer ' not in path.read_bytes()
                (folder/'result.json').write_text(json.dumps({'status':'PASS','records':state['records']},indent=2))
                print('WQ_NPC_CLIENT_MOCK_PASS',flush=True);finish()
        except Exception:
            import traceback
            traceback.print_exc();sys.stderr.flush()
            if handle:u.unregister_slate_post_tick_callback(handle[0])
            os._exit(1)
    handle.append(u.register_slate_post_tick_callback(tick))

def cli():
    server=ThreadingHTTPServer(('127.0.0.1',0),MockHandler)
    threading.Thread(target=server.serve_forever,daemon=True).start()
    sys.path.insert(0,str(ROOT/'Tools'))
    from ue_character_common import run_locked_editor
    run='mock-'+str(time.time_ns())
    log=ROOT/'Saved/NpcTests'/run/'editor.log'
    try:
        result=run_locked_editor(__file__,{'DEEPSEEK_API_KEY':'mock-local-only','DEEPSEEK_BASE_URL':f'http://127.0.0.1:{server.server_port}','WQ_NPC_MOCK_RUN':run},log,level='/Engine/Maps/Entry',total_timeout=420)
        assert result.returncode==0 and 'WQ_NPC_CLIENT_MOCK_PASS' in log.read_text(errors='replace'),'Native mock verification failed; inspect isolated editor log'
        print('WQ_NPC_CLIENT_MOCK_PASS '+str(log.parent/'result.json'))
    finally:
        server.shutdown();server.server_close()
if __name__=='__main__':
    try:import unreal
    except ImportError:cli()
    else:editor_main(unreal)
