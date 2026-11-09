"""Read-only animation / preview-skeleton inventory, through the shared editor lock."""
import json
import os
from pathlib import Path
import sys
sys.path.insert(0, str(Path(__file__).parent))
from ue_character_common import ROOT, run_locked_editor


def editor_main(unreal):
    registry = unreal.AssetRegistryHelpers.get_asset_registry()
    registry.search_all_assets(True)
    classes = ['AnimSequence', 'SkeletalMesh', 'Skeleton', 'IKRigDefinition', 'IKRetargeter']
    assets = {}
    for name in classes:
        module = 'IKRig' if name in ['IKRigDefinition', 'IKRetargeter'] else 'Engine'
        found = registry.get_assets_by_class(unreal.TopLevelAssetPath('/Script/' + module, name), True)
        assets[name] = [str(x.package_name) for x in found]
    docs = {}
    for name in ['IKRigController', 'IKRetargeterController', 'IKRetargetBatchOperation',
                 'AnimationDataController', 'AnimationLibrary', 'SubobjectDataSubsystem',
                 'SkeletalMesh', 'Skeleton', 'AnimSequenceFactory']:
        cls = getattr(unreal, name, None)
        if cls:
            docs[name] = {method: str(getattr(cls, method).__doc__) for method in dir(cls)
                          if any(key in method for key in ['retarget', 'bone', 'frame', 'key', 'length',
                                                         'skeletal', 'track', 'blueprint', 'subobject'])}
    body = unreal.load_asset('/MetaHumanCharacter/Body/IdentityTemplate/SKM_Body')
    body_data = {'path': body.get_path_name() if body else None}
    if body:
        actor = unreal.get_editor_subsystem(unreal.EditorActorSubsystem).spawn_actor_from_class(unreal.SkeletalMeshActor, unreal.Vector())
        comp = actor.skeletal_mesh_component
        comp.set_skeletal_mesh_asset(body)
        body_data['bones'] = [str(comp.get_bone_name(i)) for i in range(comp.get_num_bones())]
        body_data['skeleton'] = body.get_editor_property('skeleton').get_path_name()
    out = ROOT / 'Saved/CharacterEngine/C4-inventory.json'
    out.parent.mkdir(parents=True, exist_ok=True)
    out.write_text(json.dumps({'assets': assets, 'body': body_data, 'api': docs}, indent=2))
    print('WQ_C4_INVENTORY_PASS', flush=True)
    os._exit(0)


if __name__ == '__main__':
    try:
        import unreal
    except ImportError:
        log = ROOT / 'Saved/CharacterEngine/C4-inventory.log'
        result = run_locked_editor(__file__, {}, log)
        if result.returncode or 'WQ_C4_INVENTORY_PASS' not in log.read_text():
            raise RuntimeError('Inventory failed: ' + str(log))
        print(log)
    else:
        try:
            editor_main(unreal)
        except Exception:
            import traceback
            traceback.print_exc(); sys.stderr.flush(); os._exit(1)
