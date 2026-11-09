import hashlib
import tempfile
import unittest
from pathlib import Path
from types import SimpleNamespace

from textbook_character_staging import CAST, SnapshotAssets, mhc_session, person_tags, resolve_cast, source_signature


class CharacterStagingTests(unittest.TestCase):
    def test_explicit_cast_does_not_replace_story_role(self):
        person = {'role': 'teacher', 'character': 'lin'}
        self.assertEqual(resolve_cast(person), ('lin', False))
        tags = person_tags({'id': 'u01a_s1'}, person, 'lin', 'MHC_snapshot')
        self.assertIn('actor:teacher', tags)
        self.assertIn('character:lin', tags)
        self.assertNotIn('actor:lin', tags)
        self.assertIn('needs_rig', tags)

    def test_real_hero_alias_is_distinct_from_story_standin(self):
        self.assertEqual(resolve_cast({'role': 'me'}), ('me2026', False))
        self.assertEqual(resolve_cast({'role': 'paul'}), ('me2026', True))
        self.assertEqual(resolve_cast({'role': 'maria'}), ('lin', True))

    def test_unknown_role_is_deterministic_and_disclosed(self):
        first = resolve_cast({'role': 'worker_17'})
        self.assertEqual(first, resolve_cast({'role': 'worker_17'}))
        self.assertIn(first[0], CAST)
        self.assertTrue(first[1])
        tags = person_tags({'id': 'u06b_s1'}, {'role': 'worker_17', 'pose': 'sit_read'},
                           first[0], 'MHC_snapshot', first[1])
        self.assertIn('cast_standin', tags)
        self.assertIn('needs_pose:sit_read', tags)
        self.assertEqual(len(tags), len(set(tags)))

    def test_unsafe_role_and_unknown_explicit_cast_fail(self):
        for person in ({'role': '../lin'}, {'role': ''}, {'role': 'teacher', 'character': 'new_face'}):
            with self.assertRaises(ValueError):
                resolve_cast(person)

    def test_edit_session_is_closed_on_failure(self):
        class Character:
            def get_path_name(self):
                return '/Game/Characters/lin/MHC_lin'
        class Subsystem:
            closed = 0
            def try_add_object_to_edit(self, value):
                return True
            def spawn_meta_human_actor(self, value, keep_transient):
                self.keep_transient = keep_transient
                return object()
            def remove_object_to_edit(self, value):
                self.closed += 1
        subsystem = Subsystem()
        with self.assertRaisesRegex(RuntimeError, 'capture failed'):
            with mhc_session(subsystem, Character()):
                raise RuntimeError('capture failed')
        self.assertEqual(subsystem.closed, 1)
        self.assertTrue(subsystem.keep_transient)

    def test_failed_registration_is_not_removed(self):
        class Character:
            def get_path_name(self):
                return '/Game/Characters/lin/MHC_lin'
        class Subsystem:
            def try_add_object_to_edit(self, value):
                return False
            def remove_object_to_edit(self, value):
                raise AssertionError('Unowned edit session must not be removed')
        with self.assertRaisesRegex(RuntimeError, 'unavailable'):
            with mhc_session(Subsystem(), Character()):
                self.fail('Failed session yielded')

    def test_source_hash_tracks_author_delivery_without_writing_it(self):
        with tempfile.TemporaryDirectory() as folder:
            path = Path(folder) / 'Content/Characters/lin/MHC_lin.uasset'
            path.parent.mkdir(parents=True)
            path.write_bytes(b'author original')
            result, digest = source_signature('lin', folder)
            self.assertEqual(result, path)
            self.assertEqual(digest, hashlib.sha256(b'author original').hexdigest())
            path.write_bytes(b'author revision')
            self.assertNotEqual(source_signature('lin', folder)[1], digest)

    def test_transient_asset_snapshot_uses_safe_helper_and_keeps_source(self):
        class Asset:
            def __init__(self, path, transient):
                self.path, self.transient = path, transient
            def get_path_name(self):
                return self.path
        class MaterialInstance:
            pass
        class SkeletalMesh:
            pass
        duplicated, saved = [], []
        source = Asset('/Engine/Transient.SkinTexture', True)
        def duplicate(value, folder, name):
            duplicated.append((value, folder, name))
            return Asset(folder + '/' + name + '.' + name, False)
        u = SimpleNamespace(
            MaterialInstance=MaterialInstance, SkeletalMesh=SkeletalMesh,
            AssetToolsHelpers=SimpleNamespace(get_asset_tools=lambda: object()),
            EditorAssetLibrary=SimpleNamespace(does_asset_exist=lambda path: False,
                save_loaded_asset=lambda value: saved.append(value) or True),
            WordQuestCharacterStagingLibrary=SimpleNamespace(
                requires_persistent_snapshot=lambda value: value.transient,
                duplicate_preview_asset=duplicate))
        store = SnapshotAssets(u, 'lin', 'a' * 64)
        result = store.clone(source, 'Face Color')
        self.assertFalse(result.transient)
        self.assertEqual(store.clone(source, 'second'), result)
        self.assertEqual(len(duplicated), 1)
        self.assertEqual(saved, [result])
        self.assertEqual(source.path, '/Engine/Transient.SkinTexture')
        self.assertTrue(source.transient)

    def test_persistent_author_asset_is_referenced_without_copy_or_save(self):
        class Asset:
            def get_path_name(self):
                return '/MetaHumanCharacter/Materials/MI_Skin.MI_Skin'
        source = Asset()
        u = SimpleNamespace(AssetToolsHelpers=SimpleNamespace(get_asset_tools=lambda: object()),
            WordQuestCharacterStagingLibrary=SimpleNamespace(requires_persistent_snapshot=lambda value: False))
        self.assertIs(SnapshotAssets(u, 'lin', 'b' * 64).clone(source, 'skin'), source)


if __name__ == '__main__':
    unittest.main()
