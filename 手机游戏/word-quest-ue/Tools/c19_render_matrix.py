#!/usr/bin/env python3
"""C19 渲染逐项对比：每个配置单独一次 UE 进程，同一机位、同一 set，输出 PNG + 能力/CVar 证据。

用法：
  python3 Tools/c19_render_matrix.py                 # 依次跑全部配置（走 UE 串行锁）
  C19_CONFIG=baseline python3 Tools/c19_render_matrix.py   # 只跑一个（内部 editor 模式）
输出：Saved/Round5/c19/<config>.png + <config>.json；汇总由 Tools/qa/c19_compare.py 生成。
"""
import json
import os
import sys
import time
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
ENGINE = '/Volumes/Games/Game-Engine/Epic Games/UE_5.8'
LEVEL = '/Game/Memory/Scenes/U01/L_U01_A'
OUT = ROOT / 'Saved/Round5/c19'

CONFIGS = {
    'baseline': {'cvars': [], 'notes': 'project defaults'},
    'rt_lumen_on': {'cvars': [('r.RayTracing', 1), ('r.Lumen.HardwareRayTracing', 1), ('r.DynamicGlobalIlluminationMethod', 1), ('r.ReflectionMethod', 1)], 'notes': 'hardware RT + Lumen'},
    'rt_lumen_off': {'cvars': [('r.RayTracing', 0), ('r.Lumen.HardwareRayTracing', 0), ('r.DynamicGlobalIlluminationMethod', 0)], 'notes': 'RT/Lumen off'},
    'megalights_on': {'cvars': [('r.MegaLights.EnableForProject', 1), ('r.MegaLights.Allowed', 1), ('r.MegaLights.HardwareRayTracing', 1), ('r.MegaLights.SoftwareRayTracing.Allow', 1), ('r.GenerateMeshDistanceFields', 1)], 'notes': 'MegaLights enabled'},
    'megalights_off': {'cvars': [('r.MegaLights.EnableForProject', 0), ('r.MegaLights.Allowed', 0)], 'notes': 'MegaLights disabled'},
    'virtual_textures_on': {'cvars': [('r.VirtualTextures', 1), ('r.VirtualTexturedLightmaps', 1)], 'notes': 'virtual textures on'},
    'virtual_textures_off': {'cvars': [('r.VirtualTextures', 0), ('r.VirtualTexturedLightmaps', 0)], 'notes': 'virtual textures off'},
    'exposure_auto': {'cvars': [('r.DefaultFeature.AutoExposure', 1), ('r.EyeAdaptationQuality', 2)], 'notes': 'physical auto exposure'},
    'exposure_fixed': {'cvars': [('r.DefaultFeature.AutoExposure', 0)], 'notes': 'fixed exposure'},
    'hdri_on': {'cvars': [], 'notes': 'HDRI sky visible', 'hdri': True},
    'hdri_off': {'cvars': [], 'notes': 'HDRI sky hidden', 'hdri': False},
}


def editor_main(u, on_complete=None):
    config_name = os.environ.get('C19_CONFIG', 'baseline')
    config = CONFIGS[config_name]
    les = u.get_editor_subsystem(u.LevelEditorSubsystem)
    ues = u.get_editor_subsystem(u.UnrealEditorSubsystem)
    assert les.load_level(LEVEL)
    u.EditorPythonScripting.set_keep_python_script_alive(True)
    OUT.mkdir(parents=True, exist_ok=True)
    capture = OUT / (config_name + '.png')
    handle = []
    state = {'config': config_name, 'notes': config.get('notes', ''), 'started': time.monotonic(), 'phase': 'start'}

    def finish(code=0):
        if handle:
            u.unregister_slate_post_tick_callback(handle[0])
        if on_complete:
            on_complete(code)
        else:
            os._exit(code)

    def tick(_dt):
        try:
            if time.monotonic() - state['started'] > 120:
                raise RuntimeError('C19 capture timeout ' + config_name)
            if state['phase'] == 'start':
                les.editor_request_begin_play(); state['phase'] = 'load'; return
            world = ues.get_game_world()
            if not world:
                return
            pc = u.GameplayStatics.get_player_controller(world, 0)
            pawn = u.GameplayStatics.get_player_pawn(world, 0)
            if not pc or not pawn:
                return
            if state['phase'] == 'load':
                if time.monotonic() - state['started'] < 2:
                    return
                state['phase'] = 'apply'
                for name, value in config['cvars']:
                    u.SystemLibrary.execute_console_command(world, '%s %s' % (name, value))
                if 'hdri' in config:
                    show = bool(config['hdri'])
                    for actor in u.GameplayStatics.get_all_actors_of_class(world, u.Actor):
                        tags = {str(t) for t in actor.tags}
                        if any(t.startswith(('environment:sky', 'environment:hdri')) for t in tags):
                            actor.set_actor_hidden_in_game(not show)
                # fixed evidence camera: unit01 u01a_s1 wide shot (scene JSON metres -> cm)
                position = u.Vector(0, -550, 170)
                target = u.Vector(0, 40, 80)
                rotation = u.MathLibrary.find_look_at_rotation(position, target)
                if isinstance(pawn, u.WordQuestFirstPersonCharacter) and hasattr(pawn, 'place_view'):
                    pawn.place_view(position, rotation)
                else:
                    pawn.set_actor_location(position, False, True)
                pc.set_control_rotation(rotation)
                state['phase'] = 'settle'; state['at'] = time.monotonic(); return
            if state['phase'] == 'settle':
                if time.monotonic() - state['at'] < 2.5:
                    return
                assert u.WordQuestRenderDiagnostics.request_world_capture(world, 1920, 1080, str(capture))
                state['phase'] = 'capture'; state['at'] = time.monotonic(); return
            if state['phase'] == 'capture':
                if not capture.exists() or capture.stat().st_size < 1000:
                    if time.monotonic() - state['at'] > 30:
                        raise RuntimeError('capture file missing ' + str(capture))
                    return
                capabilities = {str(k): str(v) for k, v in u.WordQuestRenderDiagnostics.capabilities().items()}
                observed = {}
                for name, _ in config['cvars']:
                    observed[name] = str(u.SystemLibrary.get_console_variable_int_value(name))
                payload = {'config': config_name, 'notes': config.get('notes', ''), 'image': str(capture.relative_to(ROOT)),
                           'resolution': [1920, 1080], 'capabilities': capabilities, 'observed_cvars': observed,
                           'engine_version': u.SystemLibrary.get_engine_version(), 'hdri': config.get('hdri')}
                (OUT / (config_name + '.json')).write_text(json.dumps(payload, ensure_ascii=False, indent=1), encoding='utf-8')
                print('WQ_C19_CAPTURE_DONE ' + config_name, flush=True)
                les.editor_request_end_play(); finish(0); return
        except Exception:
            import traceback
            traceback.print_exc(); state['error'] = traceback.format_exc()[-600:]
            (OUT / (config_name + '.json')).write_text(json.dumps(state, ensure_ascii=False, indent=1), encoding='utf-8')
            sys.stderr.flush(); os._exit(1)

    handle.append(u.register_slate_post_tick_callback(tick))


def main():
    sys.path.insert(0, str(ROOT / 'Tools'))
    from ue_character_common import run_locked_editor
    OUT.mkdir(parents=True, exist_ok=True)
    names = [os.environ['C19_CONFIG']] if os.environ.get('C19_CONFIG') else list(CONFIGS)
    for name in names:
        log = ROOT / 'Saved/Round5' / ('c19-' + name + '.log')
        env = {'C19_CONFIG': name}
        result = run_locked_editor(__file__, env, log, engine=ENGINE, level=LEVEL)
        text = log.read_text(errors='replace')
        if result.returncode or 'WQ_C19_CAPTURE_DONE' not in text:
            print(text[-2000:])
            raise SystemExit('C19 config failed: ' + name)
        print('C19_OK', name)


if __name__ == '__main__':
    try:
        import unreal
    except ImportError:
        main()
    else:
        editor_main(unreal)
