import importlib.util
import json
import tempfile
import unittest
from pathlib import Path
from unittest.mock import patch

spec = importlib.util.spec_from_file_location(
    "packer", Path(__file__).resolve().parents[1] / "scripts/pack_game_data.py"
)
packer = importlib.util.module_from_spec(spec)
spec.loader.exec_module(packer)


class PackGameDataTests(unittest.TestCase):
    def setUp(self):
        self.temporary = tempfile.TemporaryDirectory()
        self.addCleanup(self.temporary.cleanup)
        self.root = Path(self.temporary.name)
        self.source = self.root / "source"
        self.output = self.root / "public/data"
        for relative in packer.REQUIRED_FILES:
            file = self.source / relative
            file.parent.mkdir(parents=True, exist_ok=True)
            body = {"meta": {}, "words": list(range(650)), "count": 650} if relative.startswith("vocabulary/") else {"id": relative}
            file.write_text(json.dumps(body), encoding="utf-8")

    def old_bundle(self):
        self.output.mkdir(parents=True)
        (self.output / "old.json").write_text('{"progress": 1}', encoding="utf-8")

    def test_complete_pack_keeps_all_courses_and_trims_cet4(self):
        self.old_bundle()
        self.assertTrue(packer.pack_data(self.source, self.output))
        packer.validate_bundle(self.output)
        data = packer.load_json(self.output / "vocabulary/cet4.json")
        self.assertEqual(data["count"], 600)
        self.assertEqual(len(data["words"]), 600)
        self.assertFalse((self.output / "old.json").exists())
        self.assertEqual(len(packer.load_json(self.output / "vocabulary/cet6.json")["words"]), 650)

    def test_missing_source_file_preserves_old_bundle(self):
        self.old_bundle()
        (self.source / "templates/cet6.json").unlink()
        with self.assertRaises(FileNotFoundError):
            packer.pack_data(self.source, self.output)
        self.assertEqual(packer.load_json(self.output / "old.json"), {"progress": 1})
        self.assertEqual(list(self.output.parent.iterdir()), [self.output])

    def test_invalid_json_preserves_old_bundle(self):
        self.old_bundle()
        (self.source / "content/college_english_rw3/unit06.json").write_text("{", encoding="utf-8")
        with self.assertRaises(json.JSONDecodeError):
            packer.pack_data(self.source, self.output)
        self.assertTrue((self.output / "old.json").exists())

    def test_absent_source_reuses_complete_bundle(self):
        packer.pack_data(self.source, self.output)
        self.assertFalse(packer.pack_data(self.root / "missing", self.output))
        packer.validate_bundle(self.output)

    def test_absent_source_with_incomplete_bundle_fails(self):
        self.old_bundle()
        with self.assertRaises(FileNotFoundError):
            packer.pack_data(self.root / "missing", self.output)
        self.assertTrue((self.output / "old.json").exists())

    def test_failed_replacement_restores_previous_bundle(self):
        self.old_bundle()
        original_replace = Path.replace

        def fail_new_bundle(path, destination):
            if path.name == "bundle":
                raise OSError("simulated replacement failure")
            return original_replace(path, destination)

        with patch.object(Path, "replace", fail_new_bundle):
            with self.assertRaisesRegex(OSError, "simulated"):
                packer.pack_data(self.source, self.output)
        self.assertEqual(packer.load_json(self.output / "old.json"), {"progress": 1})
        self.assertEqual(list(self.output.parent.iterdir()), [self.output])

    def test_failed_restore_leaves_old_bundle_available_for_recovery(self):
        self.old_bundle()
        original_replace = Path.replace

        def fail_replace_and_restore(path, destination):
            if path.name == "bundle" or path.name.startswith(".data.backup-"):
                raise OSError("simulated filesystem failure")
            return original_replace(path, destination)

        with patch.object(Path, "replace", fail_replace_and_restore):
            with self.assertRaisesRegex(OSError, "原数据保留在"):
                packer.pack_data(self.source, self.output)
        backup, = self.output.parent.glob(".data.backup-*")
        self.assertEqual(packer.load_json(backup / "old.json"), {"progress": 1})


if __name__ == "__main__":
    unittest.main()
