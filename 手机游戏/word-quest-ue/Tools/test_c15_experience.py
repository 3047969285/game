#!/usr/bin/env python3
"""C15 体验质检数据采集：眼高/FOV、步频、头摆幅度、蹲起过渡、自动曝光适应曲线。

输出 Saved/Round5/c15-experience.json；报告由 Tools/qa/c15_experience_report.py 生成。
标记：WQ_C15_EXPERIENCE_PASS
"""
import json
import os
import re
import sys
import time
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
ENGINE = '/Volumes/Games/Game-Engine/Epic Games/UE_5.8'
LEVEL = '/Game/Memory/Scenes/U01/L_U01_A'
OUT = ROOT / 'Saved/Round5/c15-experience.json'


def value(info, key, default=0.0):
    match = re.search(r'(?:^| )' + re.escape(key) + r'=([-\d.]+)', info)
    return float(match.group(1)) if match else default


def editor_main(u, on_complete=None):
    les = u.get_editor_subsystem(u.LevelEditorSubsystem)
    ues = u.get_editor_subsystem(u.UnrealEditorSubsystem)
    assert les.load_level(LEVEL)
    u.EditorPythonScripting.set_keep_python_script_alive(True)
    handle = []
    state = {'schema': 'wordquest.c15-experience/1', 'phase': 'start', 'started': time.monotonic(), 'samples': {},
             'walk': [], 'crouch': [], 'exposure': [], 'errors': []}
    out = OUT
    out.parent.mkdir(parents=True, exist_ok=True)

    def save():
        state['elapsed_s'] = round(time.monotonic() - state['started'], 1)
        out.write_text(json.dumps(state, ensure_ascii=False, indent=1), encoding='utf-8')

    def finish(code=0):
        if handle:
            u.unregister_slate_post_tick_callback(handle[0])
        if on_complete:
            on_complete(code)
        else:
            os._exit(code)

    def tick(_dt):
        try:
            if time.monotonic() - state['started'] > 180:
                raise RuntimeError('C15 metrics timeout at ' + state['phase'])
            if state.get('phase') == 'start':
                les.editor_request_begin_play()
                state['phase'] = 'load'
                return
            world = ues.get_game_world()
            if not world:
                return
            pc = u.GameplayStatics.get_player_controller(world, 0)
            pawn = u.GameplayStatics.get_player_pawn(world, 0)
            if not pc or not pawn:
                return
            if not isinstance(pawn, u.WordQuestFirstPersonCharacter):
                if time.monotonic() - state['started'] > 20:
                    raise RuntimeError('first-person pawn missing: ' + str(pawn))
                return
            info = pawn.get_first_person_state()
            exposure = u.WordQuestRenderDiagnostics.view_exposure(world)
            if state['phase'] == 'load':
                state['samples']['state'] = info
                state['samples']['exposure_keys'] = sorted(str(k) for k in exposure)
                state['samples']['eye_cm'] = value(info, 'eye_cm')
                state['samples']['fov'] = value(info, 'fov')
                state['samples']['focal_mm'] = value(info, 'focal_mm')
                state['samples']['aperture'] = value(info, 'aperture')
                state['samples']['step_hz_reported'] = value(info, 'step_hz')
                state['phase'] = 'settle'; state['at'] = time.monotonic(); return
            if state['phase'] == 'settle':
                if time.monotonic() - state['at'] < 2.5:
                    return
                u.WordQuestRenderDiagnostics.inject_navigation_key(world, 'W', True, 1.0)
                state['phase'] = 'walk'; state['at'] = time.monotonic(); return
            if state['phase'] == 'walk':
                t = time.monotonic() - state['at']
                state['walk'].append({'t': round(t, 3), 'speed': value(info, 'speed_cm_s'), 'bob_z': value(info, 'bob_z_cm'),
                                      'bob_y': value(info, 'bob_y_cm'), 'eye_cm': value(info, 'eye_cm'),
                                      'exposure': float(exposure.get('exposure_scale', 0.0)) if exposure else 0.0,
                                      'luminance': float(exposure.get('average_luminance', 0.0)) if exposure else 0.0})
                if t < 6.0:
                    return
                u.WordQuestRenderDiagnostics.inject_navigation_key(world, 'W', False, 1.0)
                state['phase'] = 'crouch'; state['at'] = time.monotonic()
                u.WordQuestRenderDiagnostics.inject_navigation_key(world, 'C', True, 1.0); return
            if state['phase'] == 'crouch':
                state['crouch'].append({'t': round(time.monotonic() - state['at'], 3), 'eye_cm': value(info, 'eye_cm'),
                                        'crouched': value(info, 'crouched')})
                if time.monotonic() - state['at'] < 1.8:
                    return
                u.WordQuestRenderDiagnostics.inject_navigation_key(world, 'C', False, 1.0)
                state['phase'] = 'stand'; state['at'] = time.monotonic(); return
            if state['phase'] == 'stand':
                if time.monotonic() - state['at'] < 0.8:
                    return
                state['samples']['standing'] = info
                # 找一个窗户/明亮方向：先看向室内暗侧 2 s，再转向窗 4 s 采曝光
                windows = [a for a in u.GameplayStatics.get_all_actors_with_tag(world, 'set:u01a_s1') if a.actor_has_tag('kit:window_wall')]
                origin = pawn.get_actor_location()
                if windows:
                    center, _ = windows[0].get_actor_bounds(False)
                    look = u.MathLibrary.find_look_at_rotation(u.Vector(origin.x, origin.y, 172), center)
                else:
                    look = u.Rotator(0, 90, 0)
                pc.set_control_rotation(u.Rotator(0, look.yaw + 180, 0))
                state['phase'] = 'dark_wall'; state['at'] = time.monotonic(); state['window_yaw'] = look.yaw; return
            if state['phase'] == 'dark_wall':
                if time.monotonic() - state['at'] < 2.0:
                    return
                state['phase'] = 'turn_window'; state['at'] = time.monotonic(); return
            if state['phase'] == 'turn_window':
                if time.monotonic() - state['at'] < 0.15:
                    return
                u.GameplayStatics.get_player_controller(world, 0).set_control_rotation(u.Rotator(0, state['window_yaw'], 0))
                state['phase'] = 'exposure'; state['at'] = time.monotonic(); return
            if state['phase'] == 'exposure':
                t = time.monotonic() - state['at']
                state['exposure'].append({'t': round(t, 3), 'exposure': float(exposure.get('exposure_scale', 0.0)) if exposure else 0.0,
                                          'luminance': float(exposure.get('average_luminance', 0.0)) if exposure else 0.0})
                if t < 4.0:
                    return
                state['result'] = 'PASS'
                save()
                print('WQ_C15_EXPERIENCE_PASS', flush=True)
                les.editor_request_end_play(); finish(0); return
        except Exception:
            import traceback
            traceback.print_exc(); state['errors'].append(traceback.format_exc()[-600:]); save(); sys.stderr.flush(); os._exit(1)

    handle.append(u.register_slate_post_tick_callback(tick))


def main():
    sys.path.insert(0, str(ROOT / 'Tools'))
    from ue_character_common import run_locked_editor
    log = ROOT / 'Saved/Round5/c15-experience.log'
    log.parent.mkdir(parents=True, exist_ok=True)
    result = run_locked_editor(__file__, {}, log, engine=ENGINE, level=LEVEL)
    if result.returncode or 'WQ_C15_EXPERIENCE_PASS' not in log.read_text(errors='replace'):
        print(log.read_text(errors='replace')[-2500:])
        raise SystemExit('C15 experience capture failed; see ' + str(log))
    print('C15_CAPTURE_OK', OUT)


if __name__ == '__main__':
    try:
        import unreal
    except ImportError:
        main()
    else:
        editor_main(unreal)
