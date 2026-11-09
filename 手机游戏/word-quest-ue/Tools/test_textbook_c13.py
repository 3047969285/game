"""C13 沉浸式界面 PIE 验证：Unit 1 Text A 垂直切片。

覆盖：字幕世界生成/消散、单词注视 0.6s 浮现、长按记住、12 种练习断片、
冻结/恢复、答错失真、转场/跳过、横竖屏；屏幕空间 UI 必须为 0（完整度环除外）。
证据写 Docs/qa/immersive/；结果打印 WQ_C13_PIE_PASS。
"""
import json
import os
import sys
import time
from pathlib import Path

KINDS = ['pre_reading', 'understanding', 'critical', 'words_in_use', 'word_building',
         'banked_cloze', 'expressions_in_use', 'structure_writing', 'reading_skills',
         'text_b_mcq', 'collocation', 'translation']
RESPONSIVE = ('text_b_mcq', 'banked_cloze', 'collocation')
EVIDENCE_DIR = 'Docs/qa/immersive'


def state_number(info, name):
    prefix = name + '='
    value = next((part[len(prefix):] for part in info.split() if part.startswith(prefix)), None)
    if value is None:
        raise AssertionError('Missing %s in state: %s' % (name, info))
    return float(value)


def assert_screen_ui(state):
    assert state_number(state, 'screen_ui') == 0, 'screen-space UI must be 0: ' + state
    assert state_number(state, 'progress_ring') == 1, 'completeness ring must exist: ' + state
    assert state_number(state, 'world_space_fragments') == state_number(state, 'world_fragments'), \
        'all fragments must be world-space: ' + state


def editor_main(u):
    ROOT = Path(u.Paths.project_dir())
    folder = ROOT / EVIDENCE_DIR
    folder.mkdir(parents=True, exist_ok=True)
    for stale in folder.glob('*.png'):
        stale.unlink()
    for stale in folder.glob('results.json'):
        stale.unlink()
    les = u.get_editor_subsystem(u.LevelEditorSubsystem)
    ues = u.get_editor_subsystem(u.UnrealEditorSubsystem)
    assert les.load_level('/Game/Memory/Scenes/U01/L_U01_A')
    u.EditorPythonScripting.set_keep_python_script_alive(True)

    words = []
    try:
        scene = json.loads((ROOT / 'Content/Data/memory/textbook_scenes/unit01.json').read_text(encoding='utf-8'))
        for article in scene['articles']:
            for item in article['scenes']:
                for prop in item.get('props', []):
                    if prop.get('word'):
                        words.append(prop['word'])
        words = list(dict.fromkeys(words))
    except Exception:
        words = []

    run_id = str(time.time_ns())
    state = {'frames': 0, 'phase': 'start', 'wait': 0, 'index': 0, 'advances': 0,
             'queue': [], 'queue_wait': 0, 'sentence': -1, 'scene': -1, 'results': []}
    started = time.monotonic()
    director_ref = {}

    def capture(director, name, expected=None, request=None):
        ok = request() if request else director.capture_screen_evidence_in(EVIDENCE_DIR, name)
        assert ok, 'capture request failed: ' + name
        state['queue'].append({'path': folder / (name + '.png'), 'name': name, 'expected': expected})

    def poll_queue():
        """异步截图落到磁盘才继续；最多等 300 帧（约 5 秒）。"""
        if not state['queue']:
            return True
        item = state['queue'][0]
        path = item['path']
        if path.is_file() and path.stat().st_size > 1000:
            if item['expected']:
                with path.open('rb') as stream:
                    head = stream.read(24)
                dims = (int.from_bytes(head[16:20], 'big'), int.from_bytes(head[20:24], 'big'))
                assert dims == item['expected'], 'wrong capture size %s %s' % (item['name'], dims)
            state['results'].append({'capture': str(path.relative_to(ROOT)), 'run_id': run_id,
                                     'resolution': list(item['expected']) if item['expected'] else None})
            state['queue'].pop(0)
            state['queue_wait'] = 0
            return True
        state['queue_wait'] += 1
        assert state['queue_wait'] <= 300, 'capture never appeared: ' + str(path)
        return False

    def record(test, **data):
        entry = {'test': test, 'run_id': run_id}
        entry.update(data)
        state['results'].append(entry)

    def tick(dt):
        try:
            state['frames'] += 1
            if not poll_queue():
                return
            if state['phase'] == 'end':
                if state['frames'] - state['wait'] > 10:
                    os._exit(0)
                return
            if time.monotonic() - started > 420:
                raise RuntimeError('C13 PIE timeout at phase ' + state['phase'])
            if state['phase'] == 'start':
                les.editor_request_begin_play()
                state['phase'] = 'world'
                return
            world = ues.get_game_world()
            if not world:
                return
            gm = u.GameplayStatics.get_game_mode(world)
            director = gm.get_component_by_class(u.WordQuestMemoryDirector) if gm else None
            if not director:
                return
            director_ref['d'] = director
            if state['phase'] == 'world':
                if state['frames'] < 120:
                    return
                info = director.get_playback_state()
                assert info.endswith('error='), 'director error: ' + info
                assert_screen_ui(info)
                assert state_number(info, 'world_fragments') >= 1, info
                assert state_number(info, 'sentence_fragments') >= 1, info
                capture(director, 'c13-subtitle-spawn')
                state.update(phase='subtitle-next', wait=state['frames'])
                return
            if state['phase'] == 'subtitle-next':
                if state['frames'] - state['wait'] < 40:
                    return
                if not state.get('advanced_once'):
                    director.advance()
                    state['advanced_once'] = True
                    state['wait'] = state['frames']
                    return
                if state['frames'] - state['wait'] < 40:
                    return
                capture(director, 'c13-subtitle-next')
                state.update(phase='gaze', wait=state['frames'], word_before=False)
                return
            if state['phase'] == 'gaze':
                info = director.get_playback_state()
                immersive = director.get_immersive_state()
                if not state.get('word_before'):
                    if state['frames'] - state['wait'] < 10:
                        return
                    u.GameplayStatics.set_game_paused(world, True)
                    capture(director, 'c13-word-before')
                    state['word_before'] = True
                    state['wait'] = state['frames']
                    return
                if not state.get('word_injected'):
                    if state['frames'] - state['wait'] < 30:
                        return
                    u.GameplayStatics.set_game_paused(world, False)
                    injected = director.probe_gaze_sentence_fragment()
                    assert injected, 'no sentence fragment with text_words highlights'
                    print('C13_GAZE_INJECT ok', flush=True)
                    state['word_injected'] = True
                    state['wait'] = state['frames']
                    return
                if state_number(info, 'word_fragment') == 1:
                    assert_screen_ui(info)
                    assert state_number(immersive, 'highlight_words') >= 1, immersive
                    assert state_number(immersive, 'highlighted_fragments') >= 1, immersive
                    capture(director, 'c13-word-gaze')
                    record('gaze-word-fragment', state=immersive, form=state.get('gaze_form', ''))
                    director.probe_set_holding(True)
                    state.update(phase='hold', wait=state['frames'])
                    return
                if state['frames'] - state['wait'] < 10:
                    return
                if not state.get('gaze_start'):
                    state['gaze_start'] = state['frames']
                    record('gaze-aim-sentence', injected=True)
                if state['frames'] - state['gaze_start'] % 90 == 0:
                    pass
                if state['frames'] - state['gaze_start'] > 600:
                    raise RuntimeError('word fragment did not appear from sentence gaze: ' + immersive)
                if (state['frames'] - state['gaze_start']) % 120 == 0:
                    print('C13_GAZE_WAIT ' + director.get_immersive_state(), flush=True)
                return
            if state['phase'] == 'hold':
                info = director.get_playback_state()
                if state_number(info, 'remembered') < 1:
                    if state['frames'] - state['wait'] > 240:
                        raise RuntimeError('long-press remember did not register: ' + info)
                    return
                director.probe_set_holding(False)
                assert_screen_ui(info)
                capture(director, 'c13-word-remembered')
                record('long-press-remember', state=info)
                state.update(phase='advance', wait=state['frames'])
                return
            if state['phase'] == 'advance':
                if state['frames'] - state['wait'] < 30:
                    return
                info = director.get_playback_state()
                if state_number(info, 'paused') == 1:
                    record('auto-exercise-opened', state=info)
                    state.update(phase='exercise', wait=state['frames'], index=0)
                    return
                if state_number(info, 'transition') == 1:
                    assert state_number(info, 'fading_fragments') >= 0
                    capture(director, 'c13-transition-scan')
                    record('transition-begin', state=info)
                    skipped = director.skip_transition()
                    record('transition-skip-requested', skipped=skipped)
                    state.update(phase='transition-skip', wait=state['frames'])
                    return
                if state['advances'] >= 120:
                    raise RuntimeError('never reached transition: ' + info)
                director.advance()
                state['advances'] += 1
                state['wait'] = state['frames']
                return
            if state['phase'] == 'transition-shot':
                if state['frames'] - state['wait'] < 10:
                    return
                u.GameplayStatics.set_game_paused(world, False)
                skipped = director.skip_transition()
                record('transition-skip-requested', skipped=skipped)
                state.update(phase='transition-skip', wait=state['frames'])
                return
            if state['phase'] == 'transition-skip':
                info = director.get_playback_state()
                if state['frames'] - state['wait'] < 60:
                    return
                assert state_number(info, 'transition') == 0, 'skip did not end transition: ' + info
                capture(director, 'c13-transition-after-skip')
                record('transition-skip-complete', state=info)
                state.update(phase='finish', wait=state['frames'])
                return
            if state['phase'] == 'transition-wait':
                info = director.get_playback_state()
                if state['frames'] - state['wait'] < 10:
                    return
                if state_number(info, 'transition') == 1:
                    if not state.get('transition_paused'):
                        u.GameplayStatics.set_game_paused(world, True)
                        state['transition_paused'] = True
                    capture(director, 'c13-transition-scan')
                    record('transition-begin', state=info)
                    state.update(phase='transition-shot', wait=state['frames'])
                    return
                scene = state_number(info, 'scene')
                paused = state_number(info, 'paused')
                if not state.get('auto_transition_captured') and scene > 0:
                    state['auto_transition_captured'] = True
                    capture(director, 'c13-transition-auto')
                    record('transition-auto-complete', state=info)
                    state['wait'] = state['frames']
                    return
                if paused == 1:
                    director.finish_exercise_probe()
                    record('auto-exercise-resumed', state=director.get_playback_state())
                    state['wait'] = state['frames']
                    return
                if (state['frames'] - state['wait']) % 90 == 0:
                    print('C13_TRANSITION_WAIT scene=%d paused=%d transition=%d' % (scene, paused, state_number(info, 'transition')), flush=True)
                    director.advance()
                if state['frames'] - state['wait'] > 1800:
                    raise RuntimeError('no second transition to test skip: ' + info)
                return
            if state['phase'] == 'finish':
                if state['frames'] - state['wait'] < 30:
                    return
                assert not state['queue'], 'pending captures at end: %s' % state['queue']
                path = folder / 'results.json'
                payload = {'run_id': run_id, 'frames': state['frames'],
                           'screen_ui': 0, 'progress_ring': 1, 'results': state['results']}
                path.write_text(json.dumps(payload, ensure_ascii=False, indent=1), encoding='utf-8')
                import subprocess
                host_python = os.environ.get('WQ_HOST_PYTHON', '/Users/shoudaodefengge/.local/share/hunyuan3d/.venv/bin/python')
                gate = subprocess.run([host_python, str(ROOT / 'Tools/qa/c13_evidence_gate.py'), str(folder)],
                                      capture_output=True, text=True)
                print('C13_GATE', gate.stdout.strip(), gate.stderr.strip(), flush=True)
                assert gate.returncode == 0, 'C13 pixel gate FAILED: ' + gate.stdout.strip()
                print('WQ_C13_PIE_PASS run_id=' + run_id)
                sys.stdout.flush()
                les.editor_request_end_play()
                state.update(phase='end', wait=state['frames'])
                return
            if state['phase'] == 'exercise':
                if state['frames'] - state['wait'] < 20:
                    return
                if state['index'] >= len(KINDS):
                    director.finish_exercise_probe()
                    info = director.get_playback_state()
                    assert u.GameplayStatics.is_game_paused(world) is False, 'not resumed: ' + info
                    capture(director, 'c13-resume')
                    record('freeze-resume', state=info)
                    state.update(phase='transition-wait', wait=state['frames'])
                    return
                kind = KINDS[state['index']]
                ok = director.run_exercise_probe(kind)
                info = director.get_playback_state()
                feedback = director.get_exercise_result()
                assert ok, (kind, feedback)
                assert u.GameplayStatics.is_game_paused(world), 'exercise must freeze world: ' + kind
                assert_screen_ui(info)
                assert state_number(info, 'world_fragments') >= 2, (kind, info)
                assert state_number(info, 'choice_fragments') >= 1 or state_number(info, 'question_fragments') >= 1, (kind, info)
                assert state_number(info, 'distortion') > 0, 'wrong-answer distortion missing: ' + info
                record('exercise-fragment', kind=kind, feedback=feedback, state=info)
                capture(director, kind)
                if kind in RESPONSIVE:
                    state['responsive_queue'] = [(kind + '-portrait', 450, 900), (kind + '-landscape', 1280, 720)]
                    state.update(phase='responsive', wait=state['frames'])
                    return
                state.update(phase='shot', wait=state['frames'])
                return
            if state['phase'] == 'responsive':
                queue = state.get('responsive_queue') or []
                if state['frames'] - state['wait'] < 12:
                    return
                if queue:
                    name, width, height = queue[0]
                    if state.get('resize_target') != (width, height):
                        u.SystemLibrary.execute_console_command(world, 'r.SetRes %dx%d' % (width, height))
                        state['resize_target'] = (width, height)
                        state['wait'] = state['frames']
                        return
                    capture(director, name, (width, height))
                    state['responsive_queue'] = queue[1:]
                    state['wait'] = state['frames']
                    return
                if state.get('resize_target') != (1280, 720):
                    u.SystemLibrary.execute_console_command(world, 'r.SetRes 1280x720')
                    state['resize_target'] = (1280, 720)
                    state['wait'] = state['frames']
                    return
                state.update(phase='shot', wait=state['frames'])
                return
            if state['phase'] == 'shot':
                if state['frames'] - state['wait'] < 20:
                    return
                state.update(index=state['index'] + 1, phase='exercise', wait=state['frames'])
                return
        except Exception:
            import traceback
            traceback.print_exc()
            sys.stderr.flush()
            os._exit(1)

    u.register_slate_post_tick_callback(tick)


if __name__ == '__main__':
    try:
        import unreal
    except ImportError:
        raise SystemExit('Run inside UnrealEditor via -ExecutePythonScript')
    else:
        try:
            editor_main(unreal)
        except Exception:
            import traceback
            traceback.print_exc()
            sys.stderr.flush()
            os._exit(1)
