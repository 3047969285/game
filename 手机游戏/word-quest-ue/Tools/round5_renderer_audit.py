"""Read-only C19 capability/configuration audit. Never equate requested with active."""
import argparse
import json
import os
from pathlib import Path
import sys

ROOT = Path(__file__).resolve().parents[1]
EXTRA_CVARS = (
    'r.RayTracing.Enable', 'r.MegaLights.HardwareRayTracing.Inline',
    'r.MegaLights.SoftwareRayTracing.Allow', 'r.GenerateMeshDistanceFields',
    'r.VirtualTextures', 'r.VirtualTexturedLightmaps', 'r.VT.EnableAutoImport',
    'r.DefaultFeature.AutoExposure', 'r.AntiAliasingMethod',
)


def truth(value):
    return str(value).lower() in ('1', 'true')


def classify(caps):
    """Pure classification, intentionally never returns ACTIVE without view evidence."""
    rt_supported = truth(caps.get('RHIHardwareRayTracing', 'unknown'))
    rt_requested = truth(caps.get('r.RayTracing', '0'))
    hw_lumen = rt_supported and rt_requested and truth(caps.get('r.Lumen.HardwareRayTracing', '0'))
    mega_requested = truth(caps.get('r.MegaLights.EnableForProject', '0')) and truth(caps.get('r.MegaLights.Allowed', '0'))
    mega_hw = rt_supported and rt_requested and truth(caps.get('r.MegaLights.HardwareRayTracing', '0'))
    mega_sw = truth(caps.get('r.MegaLights.SoftwareRayTracing.Allow', '0')) and truth(caps.get('r.GenerateMeshDistanceFields', '0'))
    return {
        'hardware_rt': {'supported': rt_supported, 'project_requested': rt_requested},
        'lumen': {'gi_requested': caps.get('r.DynamicGlobalIlluminationMethod') == '1',
                  'reflections_requested': caps.get('r.ReflectionMethod') == '1',
                  'hardware_route_configured': hw_lumen},
        'megalights': {'project_requested': mega_requested,
                       'hardware_route_configured': mega_hw,
                       'software_route_configured': mega_sw,
                       'status': 'requires_view_evidence' if mega_requested and (mega_hw or mega_sw) else 'not_configured'},
        'virtual_textures': {'project_requested': truth(caps.get('r.VirtualTextures', '0')),
                             'status': 'requires_texture_and_material_evidence'},
        'visual_acceptance': 'NOT_TESTED',
        'performance_acceptance': 'NOT_TESTED',
    }


def self_test():
    a = classify({'RHIHardwareRayTracing': 'true', 'r.RayTracing': '0'})
    assert a['hardware_rt']['supported'] and not a['lumen']['hardware_route_configured']
    b = classify({'RHIHardwareRayTracing': 'false', 'r.RayTracing': '1', 'r.Lumen.HardwareRayTracing': '1'})
    assert not b['hardware_rt']['supported'] and not b['lumen']['hardware_route_configured']
    c = classify({'r.MegaLights.EnableForProject': '1', 'r.MegaLights.Allowed': '1',
                  'r.MegaLights.SoftwareRayTracing.Allow': '1', 'r.GenerateMeshDistanceFields': '1'})
    assert c['megalights']['software_route_configured'] and c['megalights']['status'] == 'requires_view_evidence'
    assert all(x['visual_acceptance'] == 'NOT_TESTED' for x in (a, b, c))
    print('WQ_R5_RENDER_AUDIT_SELF_TEST_PASS')


def editor_main(u, exit_editor=True):
    caps = {str(k): str(v) for k, v in u.WordQuestRenderDiagnostics.capabilities().items()}
    for name in EXTRA_CVARS:
        caps[name] = str(u.SystemLibrary.get_console_variable_int_value(name))
    result = {'schema': 'wordquest.render-capabilities/1', 'engine_version': u.SystemLibrary.get_engine_version(),
              'capabilities': caps, 'assessment': classify(caps),
              'configuration_mutated': False, 'note': 'RHI reported capability and requested settings; no scene/performance acceptance.'}
    out = ROOT / 'Saved/Round5/render-capabilities.json'
    out.parent.mkdir(parents=True, exist_ok=True)
    out.write_text(json.dumps(result, ensure_ascii=False, indent=2), encoding='utf-8')
    print('WQ_R5_RENDER_CAPABILITIES_AUDITED', flush=True)
    if exit_editor:os._exit(0)


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--self-test', action='store_true')
    args = parser.parse_args()
    if args.self_test:
        return self_test()
    from ue_character_common import run_locked_editor
    log = ROOT / 'Saved/Round5/render-capabilities.log'
    result = run_locked_editor(__file__, {}, log, level='/Game/Maps/L_Main')
    if result.returncode or 'WQ_R5_RENDER_CAPABILITIES_AUDITED' not in log.read_text(errors='replace'):
        raise SystemExit('Renderer audit failed; inspect ' + str(log))


if __name__ == '__main__':
    try:
        import unreal
    except ImportError:
        main()
    else:
        try:
            editor_main(unreal)
        except Exception:
            import traceback
            traceback.print_exc()
            sys.stderr.flush()
            os._exit(1)
