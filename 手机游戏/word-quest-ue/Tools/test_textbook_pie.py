"""Real PIE C8/C9 integration validation and UI-inclusive screenshots, serialized full editor."""
import os,sys,json,time,re
from pathlib import Path
sys.path.insert(0,str(Path(__file__).resolve().parent))
ROOT=Path(__file__).resolve().parents[1]
KINDS=['pre_reading','understanding','critical','words_in_use','word_building','banked_cloze','expressions_in_use','structure_writing','reading_skills','text_b_mcq','collocation','translation']

def archive_previous_outputs(folder, run_id):
    """Keep earlier QA evidence, but never let stale PNGs satisfy this run."""
    names=[f'{kind}.png' for kind in KINDS]
    names += [f'{kind}-{orientation}.png' for kind in ('text_b_mcq','banked_cloze','collocation') for orientation in ('portrait','landscape')]
    names += ['c8-memory-playback.png','c8-memory-dissolve.png','c8-next-set.png','results.json']
    existing=[folder/name for name in names if (folder/name).exists()]
    if not existing:return None
    archive=ROOT/'Saved/Textbook/c9-pie-archive'/run_id
    archive.mkdir(parents=True,exist_ok=False)
    for source in existing:
        source.replace(archive/source.name)
    return archive

def png_dimensions(path):
    with path.open('rb') as stream:data=stream.read(24)
    if len(data)<24 or data[:8]!=b'\x89PNG\r\n\x1a\n' or data[12:16]!=b'IHDR':
        raise AssertionError(f'Not a PNG: {path}')
    return int.from_bytes(data[16:20],'big'),int.from_bytes(data[20:24],'big')

def assert_capture(path, expected_size=None):
    if not path.is_file() or path.stat().st_size<=1000:
        raise AssertionError(f'Missing or empty fresh capture: {path}')
    dimensions=png_dimensions(path)
    if expected_size and dimensions!=expected_size:
        raise AssertionError(f'Capture has wrong dimensions: {path} {dimensions}, expected {expected_size}')

def state_number(info,name):
    prefix=name+'='
    value=next((part[len(prefix):] for part in info.split() if part.startswith(prefix)),None)
    if value is None:raise AssertionError(f'Missing {name} in playback state: {info}')
    try:return int(value)
    except ValueError as exc:raise AssertionError(f'{name} is not an integer in playback state: {info}') from exc

def editor_main(u):
    les=u.get_editor_subsystem(u.LevelEditorSubsystem);ues=u.get_editor_subsystem(u.UnrealEditorSubsystem)
    assert les.load_level('/Game/Memory/Scenes/U01/L_U01_A')
    u.EditorPythonScripting.set_keep_python_script_alive(True)
    run_id=str(time.time_ns());folder=ROOT/'Docs/qa/c9-exercises';folder.mkdir(parents=True,exist_ok=True)
    archive=archive_previous_outputs(folder,run_id)
    state={'frames':0,'phase':'start','index':0,'wait':0,'capture':None};results=[];started=time.monotonic()
    def capture(director,name):
        path=folder/(name+'.png')
        assert not path.exists(),f'Stale capture was not archived: {path}'
        assert director.capture_evidence(name),f'Could not request capture: {name}'
        state['capture']=path
    def verify_pending_capture():
        if state['capture'] is not None:
            assert_capture(state['capture'])
            results.append({'capture':str(state['capture'].relative_to(ROOT)),'run_id':run_id})
            state['capture']=None
    def tick(dt):
        try:
            state['frames']+=1
            if state['phase']=='end':
                if state['frames']-state['wait']>10:os._exit(0)
                return
            if time.monotonic()-started>240:raise RuntimeError('PIE timeout')
            if state['phase']=='start':les.editor_request_begin_play();state['phase']='world';return
            world=ues.get_game_world()
            if not world:return
            gm=u.GameplayStatics.get_game_mode(world)
            director=gm.get_component_by_class(u.WordQuestMemoryDirector) if gm else None
            if not director:return
            if state['phase']=='world':
                if state['frames']<100:return
                info=director.get_playback_state();assert 'error=' in info and info.endswith('error='),info
                capture(director,'c8-memory-playback');state.update(phase='playback',wait=state['frames']);return
            if state['phase']=='playback':
                if state['frames']-state['wait']<20:return
                verify_pending_capture()
                before=director.get_playback_state();director.advance();after=director.get_playback_state()
                assert after.endswith('error='),after
                assert state_number(after,'scene')==state_number(before,'scene'),(before,after)
                assert state_number(after,'sentence')==state_number(before,'sentence')+1,(before,after)
                results.append({'test':'C8 sentence advance','pass':True,'before':before,'after':after});state['phase']='exercise'
            if state['phase']=='exercise':
                if state['index']>=len(KINDS):
                    director.finish_exercise_probe();results.append({'test':'C8 exercise resume','pass':not u.GameplayStatics.is_game_paused(world),'state':director.get_playback_state()});assert results[-1]['pass'],results[-1]
                    state.update(phase='transition',wait=state['frames'],dissolve_requested=False);return
                kind=KINDS[state['index']];ok=director.run_exercise_probe(kind);feedback=director.get_exercise_result();assert ok,(kind,feedback)
                assert u.GameplayStatics.is_game_paused(world)
                results.append({'kind':kind,'pass':ok,'feedback':feedback,'paused':True});capture(director,kind)
                if kind in ('text_b_mcq','banked_cloze','collocation'):
                    for width,height,orientation in ((450,900,'portrait'),(1280,720,'landscape')):
                        name=kind+'-'+orientation;path=folder/(name+'.png');assert not path.exists(),f'Stale responsive capture: {path}'
                        assert director.capture_responsive_ui(width,height,name),f'Could not render responsive UI: {name}'
                        assert_capture(path,(width,height))
                        results.append({'capture':str(path.relative_to(ROOT)),'run_id':run_id,'resolution':[width,height]})
                state.update(phase='shot',wait=state['frames']);return
            if state['phase']=='transition':
                elapsed=state['frames']-state['wait']
                if elapsed>=5 and not state.get('dissolve_requested'):
                    capture(director,'c8-memory-dissolve');state['dissolve_requested']=True
                info=director.get_playback_state()
                if state_number(info,'scene')==1 and state_number(info,'transition')==0:
                    assert info.endswith('error='),info
                    verify_pending_capture()
                    results.append({'test':'C8 dissolve and next camera','pass':True,'state':info});capture(director,'c8-next-set');state.update(phase='done',wait=state['frames'])
                elif elapsed>900:
                    raise RuntimeError('C8 scene transition did not finish: '+info)
                return
            if state['phase']=='done':
                if state['frames']-state['wait']<20:return
                verify_pending_capture()
                path=folder/'results.json';temporary=path.with_suffix('.json.tmp');temporary.write_text(json.dumps(results,ensure_ascii=False,indent=2));temporary.replace(path)
                print('WQ_C9_PIE_PASS run_id='+run_id+' archive='+str(archive or 'none'));sys.stdout.flush();les.editor_request_end_play();state.update(phase='end',wait=state['frames']);return
            if state['phase']=='shot' and state['frames']-state['wait']>20:
                verify_pending_capture()
                state.update(index=state['index']+1,phase='exercise')
            if state['phase']=='end' and state['frames']-state['wait']>10:os._exit(0)
        except Exception:
            import traceback;traceback.print_exc();sys.stderr.flush();os._exit(1)
    u.register_slate_post_tick_callback(tick)
if __name__=='__main__':
    try:import unreal
    except ImportError:
        from ue_character_common import run_locked_editor
        result=run_locked_editor(__file__,{'WQ_TEXTBOOK_ENGINE_QA':'1'},ROOT/'Saved/Textbook/round3-pie.log')
        log=(ROOT/'Saved/Textbook/round3-pie.log').read_text(errors='replace')
        marker=re.search(r'WQ_C9_PIE_PASS run_id=(\d+)',log)
        if result.returncode or not marker:raise SystemExit('PIE validation failed: Saved/Textbook/round3-pie.log')
        report=json.loads((ROOT/'Docs/qa/c9-exercises/results.json').read_text(encoding='utf-8'))
        run_id=marker.group(1);captures={entry['capture']:entry for entry in report if entry.get('capture')}
        required=[f'Docs/qa/c9-exercises/{kind}.png' for kind in KINDS]
        required += [f'Docs/qa/c9-exercises/{name}.png' for name in ('c8-memory-playback','c8-memory-dissolve','c8-next-set')]
        required += [f'Docs/qa/c9-exercises/{kind}-{orientation}.png' for kind in ('text_b_mcq','banked_cloze','collocation') for orientation in ('portrait','landscape')]
        missing=sorted(set(required)-set(captures))
        if missing:raise SystemExit('Current PIE run omitted captures: '+', '.join(missing))
        for name in required:
            entry=captures[name]
            if entry.get('run_id')!=run_id:raise SystemExit('Capture belongs to another PIE run: '+name)
            expected=tuple(entry['resolution']) if 'resolution' in entry else None
            assert_capture(ROOT/name,expected)
    else:
        try:editor_main(unreal)
        except Exception:
            import traceback;traceback.print_exc();sys.stderr.flush();os._exit(1)
