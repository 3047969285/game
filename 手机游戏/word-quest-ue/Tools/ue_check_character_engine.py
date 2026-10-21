"""C1 offline configuration audit or in-editor, read-only capability smoke test.

python3 Tools/ue_check_character_engine.py --offline
UnrealEditor-Cmd <project> -run=pythonscript -script=<this file> -nullrhi -unattended
No account access, cloud assembly, character import or asset save occurs here.
"""
from pathlib import Path
import configparser
import json
import sys

ROOT = Path(__file__).resolve().parents[1]
PLUGINS = ('MetaHumanCharacter', 'MetaHumanSDK', 'MetaHuman', 'MetaHumanLiveLink',
           'HairStrands', 'LiveLink', 'ChaosCloth', 'ChaosClothAsset', 'AlembicImporter', 'IKRig')
CVARS = {'r.SkinCache.CompileShaders': 1, 'r.SkinCache.DefaultBehavior': 1,
         'r.HairStrands.Strands': 1, 'r.HairStrands.Cards': 1, 'r.HairStrands.Binding': 1,
         'r.Substrate': 0, 'r.DynamicGlobalIlluminationMethod': 1, 'r.ReflectionMethod': 1}


def audit_files(root=ROOT):
    project = json.loads((root / 'WordQuestUE.uproject').read_text())
    enabled = {p['Name'] for p in project['Plugins'] if p.get('Enabled') is True}
    missing = sorted(set(PLUGINS) - enabled)
    config = configparser.ConfigParser(interpolation=None, strict=False)
    config.optionxform = str
    config.read(root / 'Config/DefaultEngine.ini')
    settings = config['/Script/Engine.RendererSettings']
    errors = [f'Plugin disabled/missing: {p}' for p in missing]
    errors += [f'Config {key}: expected {value}, got {settings.get(key)}'
               for key, value in CVARS.items() if settings.get(key) != str(value)]
    return {'plugins': list(PLUGINS), 'config': {k: settings.get(k) for k in CVARS}, 'errors': errors}


def main():
    report = audit_files()
    if '--offline' not in sys.argv:
        import unreal
        enabled = set(unreal.PluginBlueprintLibrary.get_enabled_plugin_names())
        report['engine_version'] = unreal.SystemLibrary.get_engine_version()
        optional = Path(unreal.Paths.engine_plugins_dir()) / 'MetaHuman/MetaHumanCharacter/Content/Optional'
        report['metahuman_core_data_installed'] = all((optional / folder).is_dir() for folder in ('', 'TextureSynthesis', 'BodyTextures'))
        report['warnings'] = [] if report['metahuman_core_data_installed'] else ['MetaHuman Creator Core Data missing; requires user installation in Epic Games Launcher. No login attempted.']
        report['runtime_plugins'] = {p: p in enabled for p in PLUGINS}
        report['runtime_cvars'] = {key: unreal.SystemLibrary.get_console_variable_int_value(key)
                                   for key in CVARS}
        required_classes = ('MetaHumanCharacter', 'MetaHumanPerformance', 'GroomAsset',
                            'LiveLinkComponentController', 'ChaosClothAsset',
                            'AlembicImportFactory', 'IKRigDefinition', 'WordQuestCharacter')
        report['reflected_classes'] = {name: hasattr(unreal, name) for name in required_classes}
        report['errors'] += [f'Runtime plugin missing: {p}' for p, ok in report['runtime_plugins'].items() if not ok]
        report['errors'] += [f'Runtime CVar {key}: {value} != {CVARS[key]}'
                             for key, value in report['runtime_cvars'].items() if value != CVARS[key]]
        report['errors'] += [f'Reflected class missing: {name}' for name, ok in report['reflected_classes'].items() if not ok]
    report['passed'] = not report['errors']
    report['mode'] = 'offline' if '--offline' in sys.argv else 'editor'
    output = ROOT / 'Saved/CharacterEngine' / ('C1-config-report.json' if '--offline' in sys.argv else 'C1-report.json')
    output.parent.mkdir(parents=True, exist_ok=True)
    output.write_text(json.dumps(report, ensure_ascii=False, indent=2) + '\n')
    print(json.dumps(report, ensure_ascii=False, indent=2))
    if not report['passed']:
        raise RuntimeError('WQ_C1_FAIL: ' + '; '.join(report['errors']))
    print('WQ_C1_PASS')


if __name__ == '__main__':
    main()
