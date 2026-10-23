"""Read-only MHC staging for textbook sets. Importable without Unreal.

The caller owns the editor process/lock and saves the current level. Never keep
MHC editor actors: the subsystem destroys them when its edit session closes.
"""
from contextlib import contextmanager
import hashlib
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
CAST = ('me2026', 'lin', 'mei', 'an', 'rui', 'organizer', 'old2090')
WHO = {'me2026': 'male', 'lin': 'female'}
ALIASES = {'me': 'me2026', 'male': 'me2026', 'female': 'lin', 'paul': 'me2026',
           'maria': 'lin', 'jason': 'an', 'jack': 'rui'}
SNAPSHOT_VERSION = "skin_v3"
_TEMPLATES = {}


def resolve_cast(person):
    """Keep story role separate from the actor, and disclose generic stand-ins."""
    role = str(person.get('role', ''))
    if not re.fullmatch(r'[A-Za-z0-9_-]+', role):
        raise ValueError('Unsafe/empty person role: ' + role)
    explicit = person.get('character', person.get('character_id'))
    if explicit is not None:
        if explicit not in CAST:
            raise ValueError('Unknown explicit MetaHuman: ' + str(explicit))
        return explicit, False
    if role in CAST:
        return role, False
    if role in ALIASES:
        return ALIASES[role], role not in ('me', 'male', 'female')
    # The cast has seven authored faces; do not suggest arbitrary story people
    # are new fitted identities. An explicit cast_standin tag keeps QA honest.
    candidates = ('mei', 'an', 'rui', 'organizer')
    return candidates[int(hashlib.sha256(role.encode()).hexdigest()[:8], 16) % len(candidates)], True


def source_signature(cid, root=ROOT):
    if cid not in CAST:
        raise ValueError('Unknown MetaHuman id: ' + str(cid))
    path = Path(root) / 'Content/Characters' / cid / ('MHC_' + cid + '.uasset')
    return path, hashlib.sha256(path.read_bytes()).hexdigest()


def person_tags(scene, person, cid, source, standin=False):
    result = ['textbook_generated', 'set:' + scene['id'], 'actor:' + person['role'],
              'character:' + cid, 'layer:' + person.get('layer', 'always'),
              'pose:' + person.get('pose', 'stand'), 'source:' + source, 'memory_speaker']
    if source == 'MHC_snapshot':
        result.append('needs_rig')
    if person.get('pose', 'stand') not in ('stand', 'idle'):
        result.append('needs_pose:' + person['pose'])
    if standin:
        result.append('cast_standin')
    return list(dict.fromkeys(result))


@contextmanager
def mhc_session(subsystem, character):
    if not subsystem.try_add_object_to_edit(character):
        raise RuntimeError('MHC edit session unavailable: ' + character.get_path_name())
    try:
        yield subsystem.spawn_meta_human_actor(character, True)
    finally:
        subsystem.remove_object_to_edit(character)


def _asset_path(obj):
    return str(obj.get_path_name()) if obj else ''


def _persistent(obj):
    path = _asset_path(obj)
    return bool(path and not path.startswith(('/Engine/Transient', '/Temp/', 'Transient.')))


class SnapshotAssets:
    """Clone only transient dependencies into a source-hash-versioned directory."""
    def __init__(self, u, cid, digest):
        self.u = u
        self.folder = f'/Game/Memory/Characters/{cid}/{digest[:16]}_{SNAPSHOT_VERSION}'
        self.tools = u.AssetToolsHelpers.get_asset_tools()
        self.cache = {}
        self.paths = []
        self.character = None

    def clone(self, source, hint):
        if source is None or (_persistent(source) and not self.u.WordQuestCharacterStagingLibrary.requires_persistent_snapshot(source)):
            return source
        key = _asset_path(source)
        if key in self.cache:
            return self.cache[key]
        u = self.u
        name = re.sub(r'[^A-Za-z0-9_]', '_', hint)
        path = self.folder + '/' + name
        existing = u.load_asset(path) if u.EditorAssetLibrary.does_asset_exist(path) else None
        if existing:
            self.cache[key] = existing
            self.paths.append(path)
            return existing
        if isinstance(source, u.MaterialInstance):
            if isinstance(source, u.MaterialInstanceConstant):
                target = u.WordQuestCharacterStagingLibrary.duplicate_preview_asset(source, self.folder, name)
            else:
                target = self.tools.create_asset(name, self.folder, u.MaterialInstanceConstant,
                                                 u.MaterialInstanceConstantFactoryNew())
            if not target:
                raise RuntimeError('Cannot snapshot material: ' + key)
            self.cache[key] = target
            parent = self.clone(source.get_editor_property('parent'), hint + '_Parent')
            if not parent:
                raise RuntimeError('Transient skin material has no parent: ' + key)
            u.MaterialEditingLibrary.set_material_instance_parent(target, parent)
            if not u.WordQuestCharacterStagingLibrary.copy_preview_material(target, source):
                raise RuntimeError('Could not copy complete preview material: ' + key)
            # Only replace transient texture references. Scalar/vector/static
            # parameters were copied natively with their full associations.
            textures = {}
            dynamic = isinstance(source, u.MaterialInstanceDynamic)
            for parameter in u.MaterialEditingLibrary.get_texture_parameter_names(source):
                value = (source.get_texture_parameter_value(parameter) if dynamic else
                         u.MaterialEditingLibrary.get_material_instance_texture_parameter_value(source, parameter))
                if value:
                    copied = self.clone(value, hint + '_' + str(parameter))
                    if copied != value:
                        textures[parameter] = copied
            if textures and not u.WordQuestCharacterStagingLibrary.apply_preview_material_parameters(target, {}, {}, textures):
                raise RuntimeError('Could not remap preview textures: ' + key)
        else:
            target = u.WordQuestCharacterStagingLibrary.duplicate_preview_asset(source, self.folder, name)
            if not target:
                raise RuntimeError('Cannot snapshot transient asset: ' + key)
            self.cache[key] = target
            if isinstance(source, getattr(u, 'Texture2D', ())):
                if not u.WordQuestCharacterStagingLibrary.persist_preview_texture(target, source, self.character, hint):
                    raise RuntimeError('Cannot persist texture source payload: ' + key)
            if isinstance(source, u.SkeletalMesh):
                for prop in ('skeleton', 'physics_asset'):
                    dependency = source.get_editor_property(prop)
                    if dependency:
                        copied = self.clone(dependency, hint + '_' + prop)
                        if not u.WordQuestCharacterStagingLibrary.set_preview_mesh_dependency(target,prop,copied):
                            raise RuntimeError('Cannot persist skeletal mesh dependency: '+prop)
                materials = target.get_editor_property('materials')
                for index, slot in enumerate(materials):
                    old = slot.get_editor_property('material_interface')
                    slot.set_editor_property('material_interface', self.clone(old, f'{hint}_M{index}'))
                target.set_editor_property('materials', materials)
                # MHC's per-mesh user data can point to a separately generated
                # transient DNA asset. Its instanced wrapper was duplicated
                # with the mesh; only replace the clone's external reference.
                for data in target.get_editor_property('asset_user_data'):
                    if str(data.get_class().get_name()) == 'DNAAssetUserData':
                        dna = data.get_editor_property('dna_asset')
                        if dna:
                            data.set_editor_property('dna_asset', self.clone(dna, hint + '_DNA'))
        if not u.EditorAssetLibrary.save_loaded_asset(target):
            raise RuntimeError('Snapshot save failed: ' + path)
        self.paths.append(path)
        return target


def _set_tags(u, actor, values, callback):
    if callback:
        callback(actor, values)
    else:
        actor.set_editor_property('tags', [u.Name(value) for value in values])


def _attach(u, child, parent):
    child.attach_to_actor(parent, u.Name('None'), u.AttachmentRule.KEEP_WORLD,
                          u.AttachmentRule.KEEP_WORLD, u.AttachmentRule.KEEP_WORLD, False)


def _attach_head(u, child, body_actor):
    """Follow the body's head bone (snapshot parts and grooms), so a posed body carries face, eyes and hair.
    Attach while the body is still in its reference pose; the pose is applied afterwards."""
    comp = body_actor.skeletal_mesh_component if hasattr(body_actor, 'skeletal_mesh_component') else None
    if comp is None or comp.get_bone_index('head') < 0:
        _attach(u, child, body_actor)
        return
    child.attach_to_component(comp, u.Name('head'), u.AttachmentRule.KEEP_WORLD,
                              u.AttachmentRule.KEEP_WORLD, u.AttachmentRule.KEEP_WORLD, False)


def _capture_template(u, preview, snapshot):
    components = [c for c in preview.get_components_by_class(u.SkeletalMeshComponent)
                  if c.get_skeletal_mesh_asset()]
    if not components:
        raise RuntimeError('MHC preview has no skeletal meshes')
    # Body root first: face/teeth/eyes preserve their preview-space transforms.
    components.sort(key=lambda c: (0 if 'body' in str(c.get_name()).lower() else 1, str(c.get_name())))
    parts = []
    for index, component in enumerate(components):
        name = str(component.get_name())
        mesh = snapshot.clone(component.get_skeletal_mesh_asset(), 'SK_' + name)
        materials = []
        for slot, material in enumerate(component.get_materials()):
            materials.append(_asset_path(snapshot.clone(material, f'MI_{name}_{slot}')) if material else None)
        loc, rot, scale = component.get_world_location(), component.get_world_rotation(), component.get_world_scale()
        parts.append({'name': name, 'mesh': _asset_path(mesh), 'materials': materials,
                      'location': [loc.x, loc.y, loc.z], 'rotation': [rot.pitch, rot.yaw, rot.roll],
                      'scale': [scale.x, scale.y, scale.z],
                      'face': component.get_bone_index('FACIAL_L_Eye') >= 0})
    return {'parts': parts, 'snapshot_assets': snapshot.paths}


def _spawn_snapshot(u, eas, template, base_tags, set_tags):
    root, parts = None, []
    for part in template['parts']:
        actor = eas.spawn_actor_from_class(u.SkeletalMeshActor, u.Vector(*part['location']),
                                           u.Rotator(*part['rotation']))
        actor.set_actor_scale3d(u.Vector(*part['scale']))
        actor.skeletal_mesh_component.set_skeletal_mesh_asset(u.load_asset(part['mesh']))
        for slot, material in enumerate(part['materials']):
            if material:
                actor.skeletal_mesh_component.set_material(slot, u.load_asset(material))
        actor.skeletal_mesh_component.set_collision_enabled(u.CollisionEnabled.NO_COLLISION)
        if root is None:
            root = actor
            values = base_tags
        else:
            _attach_head(u, actor, root)
            values = [x for x in base_tags if not x.startswith('actor:')] + ['character_part:' + part['name']]
        if part['face']:
            values = list(values) + ['memory_face']
        _set_tags(u, actor, values, set_tags)
        parts.append(actor)
    return root, parts


def _template(u, mh, character, cid, digest):
    key = (cid, digest)
    if key in _TEMPLATES:
        return _TEMPLATES[key]
    manifest = ROOT / 'Saved/Textbook/characters' / (cid + '-' + digest[:16] + '-' + SNAPSHOT_VERSION + '.json')
    if manifest.exists():
        data = json.loads(manifest.read_text())
        paths = [p['mesh'] for p in data.get('parts', [])]
        paths += [x for p in data.get('parts', []) for x in p.get('materials', []) if x]
        if paths and all(not path.startswith(('/Engine/Transient','/Temp/','Transient.')) and u.EditorAssetLibrary.does_asset_exist(path) for path in paths):
            _TEMPLATES[key] = data
            return data
    snapshot = SnapshotAssets(u, cid, digest)
    snapshot.character = character
    with mhc_session(mh, character) as preview:
        if not preview:
            raise RuntimeError('MHC preview spawn failed: ' + character.get_path_name())
        preview.set_actor_location(u.Vector(), False, False)
        if character.get_editor_property('preview_material_type') == u.MetaHumanCharacterSkinPreviewMaterial.DEFAULT:
            helper = u.get_default_object(u.WordQuestRefCameraRig)
            if not helper.use_preview_skin(character):
                raise RuntimeError('Cannot display MHC authored skin')
        data = _capture_template(u, preview, snapshot)
    manifest.parent.mkdir(parents=True, exist_ok=True)
    manifest.write_text(json.dumps(data, indent=2), encoding='utf-8')
    _TEMPLATES[key] = data
    return data


def _stage_grooms(u, eas, cid, root, base_tags, set_tags):
    who = WHO.get(cid, cid)
    paths = []
    for kind in ('groom', 'brows'):
        path = f'/Game/Blueprints/Characters/Imported/{cid}/{who}_{kind}'
        if not u.EditorAssetLibrary.does_asset_exist(path):
            continue
        actor = eas.spawn_actor_from_class(u.GroomActor, u.Vector())
        actor.groom_component.set_groom_asset(u.load_asset(path))
        _attach_head(u, actor, root)
        actor.set_actor_label(root.get_actor_label() + '_' + kind)
        values = [x for x in base_tags if not x.startswith('actor:')] + [
            'character_part:' + kind, 'needs_groom_binding']
        _set_tags(u, actor, values, set_tags)
        paths.append(path)
    return paths


POSES = '/Game/Memory/Characters/Poses'
POSE_ALIAS = {'stand_idle': 'stand', 'walk': 'stand', 'sit_laptop': 'sit_laptop', 'type': 'sit_type'}


def _assembled_bp(u, cid):
    """Blueprint produced by Tools/char_assemble.py under /Game/MetaHumans/<id>/ (None if not assembled yet)."""
    folder = f'/Game/MetaHumans/{cid}'
    if not u.EditorAssetLibrary.does_directory_exist(folder):
        return None
    bps = sorted(a.split('.')[0] for a in u.EditorAssetLibrary.list_assets(folder, recursive=True)
                 if a.split('/')[-1].startswith('BP_'))
    return bps[0] if bps else None


def _apply_pose(u, root, pose):
    """Play the authored one-frame pose (Tools/props/pose_author.py) on the body; the MetaHuman face AnimBP copies
    the head from the body. Editor-time update is on so SceneCapture stills and the showcase film see the pose."""
    name = POSE_ALIAS.get(pose, pose)
    path = f'{POSES}/A_MH_{name}'
    if not u.EditorAssetLibrary.does_asset_exist(path):
        path = f'{POSES}/A_MH_sit' if pose.startswith('sit') else f'{POSES}/A_MH_stand'
    anim = u.load_asset(path)
    bodies = [c for c in root.get_components_by_class(u.SkeletalMeshComponent) if 'body' in str(c.get_name()).lower()]
    if not bodies and hasattr(root, 'skeletal_mesh_component'):      # MHC snapshot: the root actor IS the body
        bodies = [root.skeletal_mesh_component]
    for body in bodies[:1]:
        if not u.WordQuestCharacterStagingLibrary.evaluate_preview_pose(body,anim):
            raise RuntimeError('Pose skeleton incompatible or evaluation failed: '+path)
    return path if bodies else None


def stage_people(u, eas, scene, world_cm, tags=None, strict=True):
    """Build persistent actor snapshots. Return evidence; never save author assets.

    ``world_cm(scene, local_position)`` is the builder's existing conversion.
    A failure leaves a TargetPoint with explicit missing tags, never a cylinder.
    """
    report = {'scene': scene['id'], 'people': [], 'errors': []}
    mh = None
    for index, person in enumerate(scene.get('people', [])):
        cid, standin = resolve_cast(person)
        # prefer the assembled MetaHuman (Tools/char_assemble.py, rigged: face follows the posed body), then the
        # older project BP, then the static MHC snapshot
        bp = _assembled_bp(u, cid) or f'/Game/Blueprints/Characters/BP_{cid}'
        cls = u.load_class(None, bp + '.' + bp.split('/')[-1] + '_C') if u.EditorAssetLibrary.does_asset_exist(bp) else None
        if cls and hasattr(u, 'WordQuestAnimationPreview') and isinstance(u.get_default_object(cls), u.WordQuestAnimationPreview):
            cls = None
        source = 'BP' if cls else 'MHC_snapshot'
        base_tags = person_tags(scene, person, cid, source, standin)
        record = {'role': person['role'], 'character': cid, 'source': source,
                  'standin': standin, 'requested_pose': person.get('pose', 'stand'),
                  'needs_rig': cls is None, 'source_asset': bp, 'snapshot_assets': [], 'grooms': []}
        try:
            if cls:
                root = eas.spawn_actor_from_class(cls, u.Vector())
                _set_tags(u, root, base_tags, tags)
            else:
                owned, digest = source_signature(cid)
                mh_path = f'/Game/Characters/{cid}/MHC_{cid}'
                record['source_asset'] = mh_path
                if not u.EditorAssetLibrary.does_asset_exist(mh_path):
                    raise RuntimeError('MHC asset missing: ' + mh_path)
                if mh is None:
                    mh = u.get_editor_subsystem(u.MetaHumanCharacterEditorSubsystem)
                character = u.load_asset(mh_path)
                template = _template(u, mh, character, cid, digest)
                root, parts = _spawn_snapshot(u, eas, template, base_tags, tags)
                if hashlib.sha256(owned.read_bytes()).hexdigest() != digest:
                    raise RuntimeError('Author MHC changed while staging: ' + mh_path)
                record['source_sha256'] = digest
                record['snapshot_assets'] = template['snapshot_assets']
                record['parts'] = len(parts)
                root.set_actor_label(f"ACTOR_{scene['id']}_{index:02d}_{person['role']}")
                record['grooms'] = _stage_grooms(u, eas, cid, root, base_tags, tags)
                record['pose_asset'] = _apply_pose(u, root, person.get('pose', 'stand'))   # after head attachments
            root.set_actor_label(f"ACTOR_{scene['id']}_{index:02d}_{person['role']}")
            if cls:
                record['pose_asset'] = _apply_pose(u, root, person.get('pose', 'stand'))
            root.set_actor_location(u.Vector(*world_cm(scene, person['pos'])), False, False)
            root.set_actor_rotation(u.Rotator(yaw=float(person.get('yaw', 0))), False)
            record['actor'] = root.get_actor_label()
            record['status'] = 'staged_needs_rig' if source == 'MHC_snapshot' else 'staged'
        except Exception as exc:
            error = f"{scene['id']}/{person['role']}: {exc}"
            record.update(status='FAIL', error=error)
            report['errors'].append(error)
            marker = eas.spawn_actor_from_class(u.TargetPoint, u.Vector(*world_cm(scene, person['pos'])))
            marker.set_actor_label(f"MISSING_PERSON_{scene['id']}_{index:02d}_{person['role']}")
            _set_tags(u, marker, base_tags + ['needs_final_character', 'character_staging_failed'], tags)
            if strict:
                raise RuntimeError(error) from exc
        report['people'].append(record)
    return report
