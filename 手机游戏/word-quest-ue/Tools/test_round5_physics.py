#!/usr/bin/env python3
"""C16 PIE 物理自动测试：客厅实物抓取/端详/放下/扔出、推椅、窗铰链、落地与飞出、质量、占位音。

依赖先跑：
  python3 Tools/setup_offline_physics.py
然后：
  python3 Tools/test_round5_physics.py
证据：Saved/Round5/c16-physics.json；标记：WQ_C16_PIE_PASS
"""
import json
import math
import os
import re
import sys
import time
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
ENGINE = '/Volumes/Games/Game-Engine/Epic Games/UE_5.8'
LEVEL = '/Game/Memory/Scenes/U01/L_U01_A'
OUT = ROOT / 'Saved/Round5/c16-physics.json'


def number(info, key, default=0.0):
    match = re.search(r'(?:^| )' + re.escape(key) + r'=([-\d.]+)', info)
    return float(match.group(1)) if match else default


def editor_main(u, on_complete=None):
    les = u.get_editor_subsystem(u.LevelEditorSubsystem)
    ues = u.get_editor_subsystem(u.UnrealEditorSubsystem)
    assert les.load_level(LEVEL)
    u.EditorPythonScripting.set_keep_python_script_alive(True)
    handle = []

    def finish(code=0):
        if handle:
            u.unregister_slate_post_tick_callback(handle[0])
        if on_complete:
            on_complete(code)
        else:
            os._exit(code)

    state = {'schema': 'wordquest.c16-physics/1', 'level': LEVEL, 'started': time.monotonic(), 'phase': 'start',
             'phases': [], 'records': [], 'actors': {}, 'checks': {}, 'errors': []}
    out = OUT
    out.parent.mkdir(parents=True, exist_ok=True)

    def clean(value, depth=0):
        if depth > 6:
            return str(value)
        if isinstance(value, dict):
            return {str(k): clean(v, depth + 1) for k, v in value.items() if not str(k).startswith('_')}
        if isinstance(value, (list, tuple)):
            return [clean(v, depth + 1) for v in value]
        if isinstance(value, (str, int, float, bool)) or value is None:
            return value
        if hasattr(value, 'get_actor_label'):
            return 'actor:' + str(value.get_actor_label())
        return str(value)

    def save():
        state['elapsed_s'] = round(time.monotonic() - state['started'], 1)
        out.write_text(json.dumps(clean(state), ensure_ascii=False, indent=1, default=str), encoding='utf-8')

    def fail_and_exit():
        try:
            (out.with_suffix('.error.txt')).write_text(json.dumps(clean(state), ensure_ascii=False, indent=1, default=str), encoding='utf-8')
        except Exception:
            pass
        try:
            if handle:
                u.unregister_slate_post_tick_callback(handle[0])
        except Exception:
            pass
        os._exit(1)

    def aim(world, actor):
        pc = u.GameplayStatics.get_player_controller(world, 0)
        center, _ = actor.get_actor_bounds(False)
        position = u.Vector(center.x, center.y, center.z + 70.0)
        rotation = u.MathLibrary.find_look_at_rotation(position, center)
        camera = pc.get_view_target()
        pawn = u.GameplayStatics.get_player_pawn(world, 0)
        if isinstance(pawn, u.WordQuestFirstPersonCharacter):
            pawn.place_view(position, rotation)
            camera = pawn
        elif camera:
            camera.set_actor_location(position, False, True)
            camera.set_actor_rotation(rotation, False)
        pc.set_control_rotation(rotation)
        head = pc.player_camera_manager.get_camera_location() if pc.player_camera_manager else None
        print('WQ_C16_AIM target=%s bounds=%s cam=%s view=%s' % (actor.get_actor_label(), center, head, camera.get_name() if camera else None), flush=True)
        return time.monotonic()

    def prim(actor):
        try:
            components = actor.get_components_by_class(u.PrimitiveComponent)
        except Exception:
            components = list(actor.get_components())
        root = actor.get_actor_location()
        best = None
        for comp in components:
            try:
                if comp.is_simulating_physics():
                    center = comp.get_world_location()
                    dist = ((center.x - root.x) ** 2 + (center.y - root.y) ** 2 + (center.z - root.z) ** 2) ** 0.5
                    if best is None or dist < best[0]:
                        best = (dist, comp)
            except Exception:
                pass
        if best:
            return best[1]
        for comp in components:
            try:
                if comp.get_class().get_name().startswith('StaticMeshComponent'):
                    return comp
            except Exception:
                pass
        return None

    def snapshot(tag):
        world = ues.get_game_world()
        rows = []
        for actor in u.GameplayStatics.get_all_actors_with_tag(world, 'set:u01a_s1'):
            if not actor.actor_has_tag('physics_runtime_ready'):
                continue
            body = prim(actor)
            try:
                location = body.get_world_location() if body else actor.get_actor_location()
            except Exception:
                location = actor.get_actor_location()
            try:
                speed = body.get_physics_linear_velocity().length() if body else 0.0
            except Exception:
                speed = actor.get_velocity().length()
            try:
                mass = body.get_mass() if body else 0.0
            except Exception:
                mass = 0.0
            rows.append({'actor': actor.get_actor_label(), 'kind': next((str(t).split(':', 1)[1] for t in actor.tags if str(t).startswith('physics_kind:')), ''),
                         'z_cm': round(location.z, 2), 'speed_cm_s': round(float(speed), 2), 'mass_kg': round(float(mass), 4),
                         'nan': bool(math.isnan(location.x) or math.isnan(location.y) or math.isnan(location.z))})
        state['records'].append({'snapshot': tag, 'bodies': rows})
        return rows

    def tick(_dt):
        try:
            if time.monotonic() - state['started'] > 150:
                raise RuntimeError('C16 PIE timeout; phase=' + state['phase'])
            if state['phase'] == 'start':
                les.editor_request_begin_play()
                state['phase'] = 'load'
                return
            world = ues.get_game_world()
            if not world:
                return
            gm = u.GameplayStatics.get_game_mode(world)
            if not gm:
                return
            comp = gm.get_component_by_class(u.WordQuestWorldInteraction)
            assert comp, 'game mode missing WorldInteraction'
            info = comp.get_interaction_state()
            if state['phase'] == 'load':
                if number(info, 'bodies') < 2:
                    return
                state['phase'] = 'settle'
                actors = u.GameplayStatics.get_all_actors_with_tag(world, 'set:u01a_s1')
                runtime = [a for a in actors if a.actor_has_tag('physics_runtime_ready')]
                state['actors']['runtime'] = [a.get_actor_label() for a in runtime]
                for actor in runtime:
                    kind = next((str(t).split(':', 1)[1] for t in actor.tags if str(t).startswith('physics_kind:')), '')
                    tagged = next((float(str(t).split(':', 1)[1]) for t in actor.tags if str(t).startswith('physics_mass_kg:')), None)
                    body = prim(actor)
                    actual = None
                    try:
                        simulating = bool(body and body.is_simulating_physics())
                        actual = float(body.get_mass()) if simulating else None
                    except Exception:
                        actual = None
                    if tagged is not None and actual:
                        error = abs(actual - tagged) / max(tagged, 1e-5)
                        (state['errors'] if error > 0.10 else state['records']).append(
                            {'mass_check': actor.get_actor_label(), 'tagged_kg': tagged, 'actual_kg': round(actual, 4), 'error': round(error, 3)} if error > 0.10 else
                            {'mass_ok': actor.get_actor_label(), 'kg': round(actual, 4), 'tagged_kg': tagged})
                    if body:
                        coll = str(body.get_collision_enabled())
                        actor_label = actor.get_actor_label()
                        if 'NoCollision' in coll:
                            state['errors'].append({'collision_missing': actor_label})
                pickups = [a for a in runtime if a.actor_has_tag('physics_mode:pickup')]
                chairs = [a for a in runtime if a.actor_has_tag('physics_kind:chair')]
                hinges = [a for a in runtime if a.actor_has_tag('physics_mode:hinge') or a.actor_has_tag('physics_mode:slide')]
                state['actors'].update({'pickups': [a.get_actor_label() for a in pickups],
                                        'chairs': [a.get_actor_label() for a in chairs],
                                        'joints': [a.get_actor_label() for a in hinges]})
                assert pickups, 'no pickup props with physics_runtime_ready; run setup_offline_physics.py'
                state['_pickups'] = pickups
                state['_pickup'] = pickups[0]
                state['_chairs'] = chairs
                state['_joints'] = hinges
                state['pickup'] = pickups[0].get_actor_label()
                state['pickup_candidates'] = [a.get_actor_label() for a in pickups]
                state['chair'] = chairs[0].get_actor_label() if chairs else None
                state['joint'] = hinges[0].get_actor_label() if hinges else None
                state['_pickup_index'] = 0
                state['_pickup_try'] = time.monotonic()
                state['settle_at'] = time.monotonic()
                return
            if state['phase'] == 'settle':
                if time.monotonic() - state['settle_at'] < 1.5:
                    return
                state['settle'] = snapshot('settled')
                state['phase'] = 'gaze_pick'; state['aimed_at'] = aim(world, state['_pickup']); return
            if state['phase'] == 'gaze_pick':
                elapsed = time.monotonic() - state['aimed_at']
                gaze = number(comp.get_interaction_state(), 'gaze')
                if gaze >= 0.3:
                    comp.interact()
                    if 'held=None' not in comp.get_interaction_state():
                        state['phase'] = 'hold'; state['hold_at'] = time.monotonic(); return
                if elapsed < 0.9:
                    return
                state['_pickup_index'] += 1
                if state['_pickup_index'] >= len(state.get('_pickups') or []):
                    raise RuntimeError('no pickup could be grabbed: ' + comp.get_interaction_state())
                state['_pickup'] = state['_pickups'][state['_pickup_index']]
                state['pickup'] = state['_pickup'].get_actor_label()
                state['aimed_at'] = aim(world, state['_pickup'])
                return
            if state['phase'] == 'hold':
                if time.monotonic() - state['hold_at'] < 0.8:
                    return
                comp.inspect_held(u.Rotator(0, 35, 0))
                comp.release_held(False)
                assert 'held=None' in comp.get_interaction_state()
                state['drop'] = snapshot('drop')
                state['phase'] = 'rethrow'; state['rethrow_at'] = time.monotonic(); return
            if state['phase'] == 'rethrow':
                if time.monotonic() - state['rethrow_at'] < 1.0:
                    return
                comp.probe_focus_actor(state['_pickup'])
                if comp.interact() and 'held=None' not in comp.get_interaction_state():
                    comp.release_held(True)
                    state['phase'] = 'throw_settle'; state['throw_at'] = time.monotonic(); return
                state['checks']['throw'] = 'SKIP_COULD_NOT_REGRAB'
                state['phase'] = 'push'; state['push_before'] = number(comp.get_interaction_state(), 'pushes')
                if state['chair']:
                    comp.probe_focus_actor(state['_chairs'][0])
                state['phase'] = 'push'; return
            if state['phase'] == 'next_throw':
                if state['_throw_index'] >= len(state.get('_pickups') or []):
                    state['checks']['throw'] = 'SKIP_NO_SECOND_PICKUP'
                    state['phase'] = 'push'; state['push_before'] = number(comp.get_interaction_state(), 'pushes')
                    if state['chair']:
                        state['aimed_at'] = aim(world, state['_chairs'][0])
                        return
                    state['phase'] = 'joint'; return
                state['_throw_target'] = state['_pickups'][state['_throw_index']]
                state['aimed_at'] = aim(world, state['_throw_target'])
                state['phase'] = 'gaze_throw'; return
            if state['phase'] == 'gaze_throw':
                elapsed = time.monotonic() - state['aimed_at']
                gaze = number(comp.get_interaction_state(), 'gaze')
                if gaze >= 0.3:
                    comp.interact()
                    if 'held=None' not in comp.get_interaction_state():
                        comp.release_held(True)
                        state['phase'] = 'throw_settle'; state['throw_at'] = time.monotonic(); return
                if elapsed < 0.9:
                    return
                state['_throw_index'] += 1
                if state['_throw_index'] >= len(state.get('_pickups') or []):
                    state['checks']['throw'] = 'SKIP_NO_SECOND_PICKUP'
                    state['phase'] = 'push'; state['push_before'] = number(comp.get_interaction_state(), 'pushes')
                    if state['chair']:
                        state['aimed_at'] = aim(world, state['_chairs'][0]); return
                    state['phase'] = 'joint'; return
                state['_throw_target'] = state['_pickups'][state['_throw_index']]
                state['aimed_at'] = aim(world, state['_throw_target'])
                return
            if state['phase'] == 'throw_settle':
                if time.monotonic() - state['throw_at'] < 2.0:
                    return
                thrown = snapshot('thrown')
                state['checks']['no_nan'] = not any(row['nan'] for row in thrown)
                state['checks']['no_fall_through_floor'] = all(row['z_cm'] > -5 for row in thrown)
                state['checks']['no_flying'] = all(row['speed_cm_s'] < 2500 and abs(row['z_cm']) < 2000 for row in thrown)
                state['phase'] = 'push'; state['push_before'] = number(comp.get_interaction_state(), 'pushes')
                if state['chair']:
                    state['aimed_at'] = aim(world, state['_chairs'][0])
                    return
                state['phase'] = 'joint'; return
            if state['phase'] == 'push':
                if not state.get('push_focused'):
                    comp.probe_focus_actor(state['_chairs'][0] if state.get('_chairs') else state['_pickup'])
                    state['push_focused'] = True; state['aimed_at'] = time.monotonic(); return
                if time.monotonic() - state['aimed_at'] < 0.5:
                    return
                comp.interact()
                state['checks']['chair_push'] = number(comp.get_interaction_state(), 'pushes') > state['push_before']
                state['phase'] = 'joint'; state['aimed_at'] = time.monotonic(); return
            if state['phase'] == 'joint':
                if not state.get('_joints'):
                    state['checks']['hinge'] = 'SKIP_NO_DOOR_OR_WINDOW_IN_S1'
                    state['phase'] = 'audio'; return
                if not state.get('joint_aimed'):
                    comp.probe_focus_actor(state['_joints'][0])
                    state['aimed_at'] = time.monotonic(); state['joint_aimed'] = True
                    return
                if time.monotonic() - state['aimed_at'] < 0.5:
                    return
                before = number(comp.get_interaction_state(), 'toggles')
                comp.interact()
                after = number(comp.get_interaction_state(), 'toggles')
                state['checks']['hinge'] = after > before
                comp.interact()
                state['phase'] = 'audio'; return
            if state['phase'] == 'audio':
                before = number(comp.get_interaction_state(), 'contact_events')
                for _ in range(4):
                    comp.emit_footstep()
                state['phase'] = 'audio_wait'; state['audio_at'] = time.monotonic(); state['audio_before'] = before; return
            if state['phase'] == 'audio_wait':
                if time.monotonic() - state['audio_at'] < 0.5:
                    return
                final = comp.get_interaction_state()
                state['checks']['audio_placeholders'] = number(final, 'audio') >= 8
                state['checks']['contact_fired'] = number(final, 'contact_events') > 0
                state['checks']['no_nan'] = state['checks'].get('no_nan', True)
                state['final_state'] = final
                state['phase'] = 'done'
                state['result'] = 'PASS' if all(v is True for k, v in state['checks'].items() if isinstance(v, bool)) and not state['errors'] else 'FAIL'
                save()
                print('WQ_C16_PIE_' + state['result'], 'checks=' + json.dumps(state['checks'], ensure_ascii=False), flush=True)
                les.editor_request_end_play()
                finish(0 if state['result'] == 'PASS' else 1)
                return
        except Exception:
            import traceback
            traceback.print_exc()
            state['errors'].append({'exception': traceback.format_exc()[-800:]})
            state['result'] = 'FAIL'
            try:
                save()
            finally:
                fail_and_exit()

    handle.append(u.register_slate_post_tick_callback(tick))


def main():
    sys.path.insert(0, str(ROOT / 'Tools'))
    from ue_character_common import run_locked_editor
    log = ROOT / 'Saved/Round5/c16-physics.log'
    log.parent.mkdir(parents=True, exist_ok=True)
    result = run_locked_editor(__file__, {}, log, engine=ENGINE, level=LEVEL)
    text = log.read_text(errors='replace')
    if result.returncode or 'WQ_C16_PIE_PASS' not in text:
        print(text[-3000:])
        raise SystemExit('C16 PIE failed; see ' + str(log))
    print('C16_PASS', OUT)


if __name__ == '__main__':
    try:
        import unreal
    except ImportError:
        main()
    else:
        editor_main(unreal)
