"""C18 read-only delivery/build preflight. Does not assemble, save, log in, or infer delivery."""
import argparse
import hashlib
import json
import os
from pathlib import Path
import sys

ROOT = Path(__file__).resolve().parents[1]
CAST = ('me2026', 'lin', 'mei', 'an', 'rui', 'organizer', 'old2090')
REFERENCES = {'me2026': 'male_sheet.png', 'lin': 'female_sheet.png'}


def source_record(cid, root=ROOT):
    if cid not in CAST:
        raise ValueError('Unknown cast ID')
    root = Path(root)
    path = root / 'Content/Characters' / cid / ('MHC_' + cid + '.uasset')
    digest = hashlib.sha256(path.read_bytes()).hexdigest() if path.is_file() else None
    generated = root / 'Content/Memory/Characters' / cid
    skin_v3 = sorted(str(p.relative_to(root)) for p in generated.glob('*_skin_v3/SK_Face.uasset')) if generated.exists() else []
    assembled = root / 'Content/MetaHumans'
    blueprints = sorted(str(p.relative_to(root)) for p in assembled.rglob('BP_*.uasset')
                        if cid.lower() in str(p.relative_to(assembled)).lower()) if assembled.exists() else []
    reference = Path.home() / 'Downloads' / REFERENCES[cid] if cid in REFERENCES else None
    return {
        'id': cid, 'source_asset': '/Game/Characters/' + cid + '/MHC_' + cid,
        'source_exists': path.is_file(), 'source_sha256': digest,
        'new_hero_delivery': 'NOT_CONFIRMED' if cid in REFERENCES else 'NOT_APPLICABLE',
        'reference_sheet_exists': reference.is_file() if reference else None,
        'assembled_blueprints': blueprints, 'skin_v3_faces': skin_v3,
        'skin_v3_pixel_validation': 'REQUIRES_FRESH_EDITOR_TEXTURE_SOURCE_AND_RENDER_CHECK',
        'can_build': 'NOT_QUERIED', 'assembly': 'NOT_RUN', 'visual_acceptance': 'NOT_TESTED',
    }


def write_report(records, mode):
    out = ROOT / 'Saved/Round5/assembly-preflight.json'
    out.parent.mkdir(parents=True, exist_ok=True)
    out.write_text(json.dumps({'schema': 'wordquest.assembly-preflight/1', 'mode': mode,
                             'authored_assets_saved': False, 'characters': records,
                             'note': 'Source files/blueprints do not establish a new hero delivery or visual acceptance.'},
                             ensure_ascii=False, indent=2), encoding='utf-8')
    print('WQ_R5_ASSEMBLY_PREFLIGHT_SAVED', flush=True)


def self_test():
    import tempfile
    with tempfile.TemporaryDirectory() as folder:
        root = Path(folder)
        missing = source_record('me2026', root)
        assert not missing['source_exists'] and missing['new_hero_delivery'] == 'NOT_CONFIRMED'
        path = root / 'Content/Characters/me2026/MHC_me2026.uasset'
        path.parent.mkdir(parents=True)
        path.write_bytes(b'authored-source-not-new-delivery')
        original = path.read_bytes()
        present = source_record('me2026', root)
        assert present['source_exists'] and present['source_sha256'] == hashlib.sha256(original).hexdigest()
        assert present['new_hero_delivery'] == 'NOT_CONFIRMED' and present['can_build'] == 'NOT_QUERIED'
        assert path.read_bytes() == original
        try:
            source_record('../unsafe', root)
        except ValueError:
            pass
        else:
            raise AssertionError('Unsafe ID accepted')
    print('WQ_R5_ASSEMBLY_PREFLIGHT_SELF_TEST_PASS')


def editor_main(u, exit_editor=True):
    mh = u.get_editor_subsystem(u.MetaHumanCharacterEditorSubsystem)
    records = []
    for cid in CAST:
        record = source_record(cid)
        character = None
        opened = False
        try:
            if not record['source_exists']:
                record['status'] = 'SOURCE_MISSING'
                continue
            character = u.load_asset(record['source_asset'])
            opened = bool(character and mh.try_add_object_to_edit(character))
            if not opened:
                record['status'] = 'EDIT_SESSION_UNAVAILABLE'
                continue
            record['can_build'] = bool(mh.can_build_meta_human(character, True))
            record['status'] = 'BUILDABLE_NOT_ASSEMBLED' if record['can_build'] else 'BLOCKED_NOT_BUILDABLE'
            record['assembled_bp_assets'] = [str(p) for p in u.EditorAssetLibrary.list_assets('/Game/MetaHumans', recursive=True)
                                              if '/BP_' in str(p) and cid.lower() in str(p).lower()] \
                if u.EditorAssetLibrary.does_directory_exist('/Game/MetaHumans') else []
        except Exception as exc:
            # This pipeline never reads credentials. Report type only; engine logs
            # contain build diagnostics, while arbitrary external strings are omitted.
            record['status'] = 'PREFLIGHT_ERROR'
            record['error_type'] = type(exc).__name__
        finally:
            if opened and character and mh.is_object_added_for_editing(character):
                mh.remove_object_to_edit(character)
            after = source_record(cid)
            record['source_unchanged'] = after['source_sha256'] == record['source_sha256']
            if not record['source_unchanged']:
                raise RuntimeError('Authored character changed during read-only preflight: ' + cid)
            records.append(record)
            character = None
            u.SystemLibrary.collect_garbage()
    write_report(records, 'editor_readonly')
    print('WQ_R5_ASSEMBLY_PREFLIGHT_EDITOR_DONE', flush=True)
    if exit_editor:os._exit(0)


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--editor', action='store_true', help='Query can_build in locked full editor; never builds')
    parser.add_argument('--self-test', action='store_true')
    args = parser.parse_args()
    if args.self_test:
        return self_test()
    if not args.editor:
        return write_report([source_record(cid) for cid in CAST], 'filesystem_only')
    from ue_character_common import run_locked_editor
    log = ROOT / 'Saved/Round5/assembly-preflight.log'
    result = run_locked_editor(__file__, {}, log, level='/Game/Maps/L_Main')
    if result.returncode or 'WQ_R5_ASSEMBLY_PREFLIGHT_EDITOR_DONE' not in log.read_text(errors='replace'):
        raise SystemExit('Assembly preflight failed; inspect ' + str(log))


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
