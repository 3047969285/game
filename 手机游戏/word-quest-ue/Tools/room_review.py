#!/usr/bin/env python3
"""Claude · eye-level review shots inside an enclosed textbook room (Tools/room_shell.py).

Runs PIE on the section level and captures one 1920x1080 frame per view, from where a person would
actually stand (eye 1.65 m), so the room is judged as a player sees it — not from outside the walls.

  python3 Tools/room_review.py u01a_s1          # all views, one UE process (serial lock, 180 s cap)
Output: Saved/RoomReview/<scene>/<view>.png
"""
import json
import os
import sys
import time
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
ENGINE = '/Volumes/Games/Game-Engine/Epic Games/UE_5.8'
EYE = 1.65
# scene-local metres: (eye position xy, look-at point)
VIEWS = {
    'u01a_s1': {
        'door_to_window': ([2.5, 1.2], [-3.0, 0.4, 1.3]),
        'corner_family': ([2.5, -2.2], [-0.4, 0.8, 0.6]),
        'window_to_shelf': ([-2.4, -1.6], [2.4, 2.6, 1.1]),
        'sofa_to_cabinet': ([-0.9, 2.0], [0.0, -2.6, 0.9]),
    },
}


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
    scene, level = scene_and_level(sid)
    out = ROOT / 'Saved/RoomReview' / sid
    out.mkdir(parents=True, exist_ok=True)
    views = list(VIEWS[sid].items())
    les = u.get_editor_subsystem(u.LevelEditorSubsystem)
    ues = u.get_editor_subsystem(u.UnrealEditorSubsystem)
    assert les.load_level(level)
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
            if time.monotonic() - st['started'] > 180:
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
                assert u.WordQuestRenderDiagnostics.request_world_capture(world, 1920, 1080, str(capture))
                st['phase'], st['at'] = 'capture', time.monotonic()
                return
            if st['phase'] == 'capture':
                if not capture.exists() or capture.stat().st_size < 1000:
                    if time.monotonic() - st['at'] > 30:
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
    sid = sys.argv[1] if len(sys.argv) > 1 else 'u01a_s1'
    _, level = scene_and_level(sid)
    sys.path.insert(0, str(ROOT / 'Tools'))
    from ue_character_common import run_locked_editor
    log = ROOT / 'Saved/RoomReview' / f'{sid}.log'
    log.parent.mkdir(parents=True, exist_ok=True)
    result = run_locked_editor(__file__, {'WQ_ROOM_SCENE': sid}, log, engine=ENGINE, level=level, total_timeout=600)
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
