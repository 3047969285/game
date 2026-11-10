#!/usr/bin/env python3
"""Claude · eye-level review shots inside an enclosed textbook room (Tools/room_shell.py).

Runs PIE on the section level and captures one 1920x1080 frame per view, from where a person would
actually stand (eye 1.65 m), so the room is judged as a player sees it — not from outside the walls.

  python3 Tools/room_review.py u01a_s1          # all views, one UE process (serial lock, 180 s cap)
Output: Saved/RoomReview/<scene>/<view>.png
"""
import argparse
import json
import os
import sys
import time
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
ENGINE = '/Volumes/Games/Game-Engine/Epic Games/UE_5.8'
EYE = 1.65
CAPTURE_TIMEOUT_SECONDS = 90
REVIEW_TIMEOUT_SECONDS = 480
# scene-local metres: (eye position xy, look-at point)
VIEWS = {
    'u01a_s1': {
        'door_to_window': ([2.5, 1.2], [-3.0, 0.4, 1.3]),
        'corner_family': ([2.5, -2.2], [-0.4, 0.8, 0.6]),
        'window_to_shelf': ([-2.4, -1.6], [2.4, 2.6, 1.1]),
        'sofa_to_cabinet': ([-0.9, 2.0], [0.0, -2.6, 0.9]),
    },
}


def parse_resolution(value):
    try:
        width, height = (int(part) for part in value.lower().split("x", 1))
    except (AttributeError, ValueError) as exc:
        raise ValueError("resolution must be WIDTHxHEIGHT") from exc
    if not 640 <= width <= 4096 or not 360 <= height <= 2160:
        raise ValueError("resolution must be between 640x360 and 4096x2160")
    return width, height


def scene_and_level(sid):
    sys.path.insert(0, str(ROOT / 'Tools'))
    from textbook_scene_contract import read_unit, level_path
    data = read_unit(int(sid[1:3]))
    for article in data['articles']:
        for scene in article['scenes']:
            if scene['id'] == sid:
                return scene, level_path(data, article)
    raise SystemExit('unknown scene ' + sid)


def editor_main(u):
    sid = os.environ['WQ_ROOM_SCENE']
    width, height = parse_resolution(os.environ.get('WQ_ROOM_SIZE', '1920x1080'))
    scene, level = scene_and_level(sid)
    out = ROOT / 'Saved/RoomReview' / sid
    if (width, height) != (1920, 1080):
        out /= f'{width}x{height}'
    if os.environ.get('WQ_HIDE_WINDOW_GLASS') == '1':
        out = out.with_name(out.name + '-noglass')
    if os.environ.get('WQ_HIDE_HDRI_BACKDROP') == '1':
        out = out.with_name(out.name + '-nohdri')
    out.mkdir(parents=True, exist_ok=True)
    views = list(VIEWS[sid].items())
    requested_view = os.environ.get('WQ_ROOM_VIEW')
    if requested_view:
        views = [(name, shot) for name, shot in views if name == requested_view]
        if not views:
            raise ValueError(f'unknown review view {requested_view!r} for {sid}')
    les = u.get_editor_subsystem(u.LevelEditorSubsystem)
    eas = u.get_editor_subsystem(u.EditorActorSubsystem)
    ues = u.get_editor_subsystem(u.UnrealEditorSubsystem)
    assert les.load_level(level)
    if os.environ.get('WQ_HIDE_WINDOW_GLASS') == '1':
        glass = [a for a in eas.get_all_level_actors()
                 if a.actor_has_tag('set:' + sid) and a.actor_has_tag('glass')]
        if not glass:
            raise RuntimeError('window glass actors not found for diagnostic')
        for actor in glass:
            actor.set_actor_hidden_in_game(True)
    if os.environ.get('WQ_HIDE_HDRI_BACKDROP') == '1':
        backdrops = [a for a in eas.get_all_level_actors()
                     if a.actor_has_tag('set:' + sid) and a.actor_has_tag('environment:hdri_backdrop')]
        if not backdrops:
            raise RuntimeError('HDRI backdrop actor not found for diagnostic')
        for actor in backdrops:
            actor.set_actor_hidden_in_game(True)
    u.EditorPythonScripting.set_keep_python_script_alive(True)
    st = {'phase': 'start', 'started': time.monotonic(), 'i': 0}
    handle = []

    def cm(p):
        return u.Vector(*[(float(o) + float(v)) * 100 for o, v in zip(scene['origin'], p)])

    def finish(code):
        if handle:
            u.unregister_slate_post_tick_callback(handle[0])
        sys.stderr.flush()
        os._exit(code)

    def tick(_dt):
        try:
            if time.monotonic() - st['started'] > REVIEW_TIMEOUT_SECONDS:
                raise RuntimeError('room review timeout')
            if st['phase'] == 'start':
                les.editor_request_begin_play()
                st['phase'], st['at'] = 'load', time.monotonic()
                return
            world = ues.get_game_world()
            pc = u.GameplayStatics.get_player_controller(world, 0) if world else None
            pawn = u.GameplayStatics.get_player_pawn(world, 0) if world else None
            if not pc or not pawn or time.monotonic() - st['at'] < 2:
                return
            name, (xy, target) = views[st['i']]
            capture = out / (name + '.png')
            if st['phase'] in ('load', 'next'):
                pos, look = cm([xy[0], xy[1], EYE]), cm(target)
                rot = u.MathLibrary.find_look_at_rotation(pos, look)
                if hasattr(pawn, 'place_view'):
                    pawn.place_view(pos, rot)
                else:
                    pawn.set_actor_location(pos, False, True)
                pc.set_control_rotation(rot)
                if capture.exists():
                    capture.unlink()
                st['phase'], st['at'] = 'settle', time.monotonic()
                return
            if st['phase'] == 'settle':
                if time.monotonic() - st['at'] < 3.0:         # Lumen and exposure settle
                    return
                assert u.WordQuestRenderDiagnostics.request_world_capture(world, width, height, str(capture))
                st['phase'], st['at'] = 'capture', time.monotonic()
                return
            if st['phase'] == 'capture':
                if not capture.exists() or capture.stat().st_size < 1000:
                    if time.monotonic() - st['at'] > CAPTURE_TIMEOUT_SECONDS:
                        raise RuntimeError('capture missing ' + name)
                    return
                print('WQ_ROOM_VIEW ' + name, flush=True)
                st['i'] += 1
                if st['i'] == len(views):
                    print('WQ_ROOM_REVIEW_DONE', flush=True)
                    les.editor_request_end_play()
                    finish(0)
                st['phase'], st['at'] = 'next', time.monotonic()
        except Exception:  # noqa: BLE001 — any failure ends the run instead of spinning in tick
            import traceback
            (out / 'error.txt').write_text(traceback.format_exc())
            finish(1)

    handle.append(u.register_slate_post_tick_callback(tick))


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('scene', nargs='?', default='u01a_s1')
    parser.add_argument('--resolution', default='1920x1080')
    parser.add_argument('--view')
    parser.add_argument('--hide-glass', action='store_true')
    parser.add_argument('--hide-hdri', action='store_true')
    args = parser.parse_args()
    width, height = parse_resolution(args.resolution)
    sid = args.scene
    _, level = scene_and_level(sid)
    sys.path.insert(0, str(ROOT / 'Tools'))
    from ue_character_common import run_locked_editor
    log = ROOT / 'Saved/RoomReview' / f'{sid}.log'
    log.parent.mkdir(parents=True, exist_ok=True)
    env = {'WQ_ROOM_SCENE': sid, 'WQ_ROOM_SIZE': f'{width}x{height}'}
    if args.view:
        env['WQ_ROOM_VIEW'] = args.view
    if args.hide_glass:
        env['WQ_HIDE_WINDOW_GLASS'] = '1'
    if args.hide_hdri:
        env['WQ_HIDE_HDRI_BACKDROP'] = '1'
    result = run_locked_editor(__file__, env, log, engine=ENGINE, level=level, total_timeout=600)
    text = log.read_text(errors='replace')
    print('\n'.join(l for l in text.splitlines() if 'WQ_ROOM' in l))
    if result.returncode or 'WQ_ROOM_REVIEW_DONE' not in text:
        raise SystemExit('room review failed; see ' + str(log))


if __name__ == '__main__':
    try:
        import unreal
    except ImportError:
        main()
    else:
        editor_main(unreal)
