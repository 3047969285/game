import unittest

from import_polyhaven import pbr_graph_spec


class PolyHavenMaterialGraphTests(unittest.TestCase):
    def test_normal_and_mask_maps_use_matching_samplers_and_defaults(self):
        graph = pbr_graph_spec()
        self.assertEqual(graph["samples"]["Normal"]["sampler"], "SAMPLERTYPE_NORMAL")
        self.assertEqual(graph["samples"]["Normal"]["default"], "/Engine/EngineMaterials/DefaultNormal")
        self.assertEqual(graph["samples"]["ARM"]["sampler"], "SAMPLERTYPE_MASKS")
        self.assertEqual(
            graph["samples"]["ARM"]["default"],
            "/Engine/EngineMaterials/DefaultDiffuse_TC_Masks",
        )

    def test_arm_channels_feed_the_matching_pbr_outputs(self):
        graph = pbr_graph_spec()
        self.assertEqual(graph["outputs"]["AmbientOcclusion"], ("ARM", "R"))
        self.assertEqual(graph["outputs"]["Roughness"], ("ARM", "G"))
        self.assertEqual(graph["outputs"]["Metallic"], ("ARM", "B"))
        self.assertEqual(graph["metallic_scale_default"], 0.0)
        self.assertEqual(graph["metallic_scale_instance"], 1.0)


if __name__ == "__main__":
    unittest.main()
