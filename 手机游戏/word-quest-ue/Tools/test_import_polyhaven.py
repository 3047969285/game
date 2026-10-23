"""Offline preflight tests for the local CC0 import manifest and kit mappings."""
import unittest
from pathlib import Path

import import_polyhaven as importer


class PolyHavenImportTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.manifest = importer.validate_manifest()

    def test_manifest_files_exist_and_are_classified(self):
        counts = importer.validate_asset_mapping(self.manifest)
        self.assertEqual(set(counts), {"models", "textures", "hdris"})
        self.assertTrue(all(count > 0 for count in counts.values()))

    def test_polyhaven_kits_and_clutter_reference_models(self):
        model_ids = {name for name, row in self.manifest.items() if row["type"] == "models"}
        import json
        data = json.loads(importer.MAP_PATH.read_text(encoding="utf-8"))
        for kit, spec in data["kits"].items():
            if spec.get("source") == "polyhaven":
                self.assertIn(spec.get("polyhaven"), model_ids, kit)
        clutter = data.get("clutter_polyhaven", [])
        model_ids_to_check = clutter.values() if isinstance(clutter, dict) else clutter
        for model_id in model_ids_to_check:
            self.assertIn(model_id, model_ids)

    def test_pbr_texture_sets_have_required_maps(self):
        for name, row in self.manifest.items():
            if row["type"] != "textures":
                continue
            files = {p.name.lower() for p in (importer.ROOT / row["path"]).glob("*") if p.is_file()}
            self.assertTrue(any("_diffuse_" in name or "_diff_" in name or "basecolor" in name for name in files), row["path"])
            self.assertTrue(any("_nor_gl_" in name or "normal" in name for name in files), row["path"])
            self.assertTrue(any("_arm_" in name or "_orm_" in name for name in files), row["path"])

    def test_surface_material_aliases_resolve_to_existing_kits(self):
        import json
        data = json.loads(importer.MAP_PATH.read_text(encoding="utf-8"))
        targets = {"street", "wall", "window_wall", "hutong_wall", "mall_atrium", "rug"}
        self.assertTrue(targets.issubset(data["kits"]))
        self.assertEqual(importer.source_path(self.manifest["asphalt_02"]).name, "asphalt_02")


if __name__ == "__main__":
    unittest.main()
