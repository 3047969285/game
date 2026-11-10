"""Offline tests for Tools/room_shell.py geometry (no Unreal): python3 -m unittest Tools/test_room_shell.py"""
import sys
import unittest
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from room_shell import shell_boxes, wall_pieces, window_garden_plan, window_backdrop_plan, window_backdrop_profile, window_backdrop_source, room_lighting_profile, window_glass_profile  # noqa: E402
from textbook_environment import should_spawn_hdri_dome  # noqa: E402
from build_window_panorama import project_panorama  # noqa: E402

ROOM = {"x": [-3.0, 3.0], "y": [-2.6, 3.0], "height": 2.75, "wall_thickness": 0.15,
        "openings": [{"wall": "west", "type": "window", "center": 0.5, "width": 2.4, "sill": 0.8, "height": 1.5, "mullions": 2},
                     {"wall": "east", "type": "door", "center": 1.9, "width": 0.9, "height": 2.05}]}


def area(pieces):
    return sum((a1 - a0) * (z1 - z0) for a0, a1, z0, z1 in pieces)


class RoomShell(unittest.TestCase):
    def test_openings_are_cut_exactly(self):
        full = 5.6 * 2.75
        self.assertAlmostEqual(area(wall_pieces(ROOM, "west")), full - 2.4 * 1.5)
        self.assertAlmostEqual(area(wall_pieces(ROOM, "east")), full - 0.9 * 2.05)
        self.assertAlmostEqual(area(wall_pieces(ROOM, "north")), 6.0 * 2.75)

    def test_pieces_do_not_overlap_openings(self):
        for a0, a1, z0, z1 in wall_pieces(ROOM, "west"):
            overlaps = a0 < 1.7 and a1 > -0.7 and z0 < 2.3 and z1 > 0.8
            self.assertFalse(overlaps, (a0, a1, z0, z1))

    def test_walls_sit_outside_the_interior(self):
        for b in shell_boxes(ROOM):
            if "wall:west" in b["tags"]:
                self.assertAlmostEqual(b["pos"][0] + b["size"][0] / 2, -3.0)
            if "wall:north" in b["tags"]:
                self.assertAlmostEqual(b["pos"][1] - b["size"][1] / 2, 3.0)

    def test_door_and_window_are_tagged_for_interaction(self):
        tags = [t for b in shell_boxes(ROOM) for t in b["tags"]]
        self.assertIn("interactive:door", tags)
        self.assertIn("interactive:window", tags)
        self.assertEqual(sum(1 for b in shell_boxes(ROOM) if b["name"].endswith("_glass")), 1)
        glass = next(b for b in shell_boxes(ROOM) if b["name"].endswith("_glass"))
        self.assertIn("render:non_nanite", glass["tags"])

    def test_no_skirting_across_the_door(self):
        for b in shell_boxes(ROOM):
            if b["name"].startswith("SKIRT_east"):
                lo, hi = b["pos"][1] - b["size"][1] / 2, b["pos"][1] + b["size"][1] / 2
                self.assertFalse(lo < 2.35 - 1e-6 and hi > 1.45 + 1e-6, (lo, hi))

    def test_window_garden_is_real_depth_and_stays_outside_shell(self):
        plan = window_garden_plan(ROOM)
        self.assertEqual([item["asset"] for item in plan], ["shrub_01", "shrub_01", "tree_small_02"])
        for item in plan:
            self.assertLess(item["pos"][0], ROOM["x"][0])
            self.assertGreaterEqual(item["size"], 0.9)
        self.assertAlmostEqual(plan[0]["pos"][1], 0.5 - 2.4 * 0.20)
        self.assertLess(plan[2]["pos"][0], plan[0]["pos"][0])
        self.assertTrue(all(item["size"] >= 1.6 for item in plan))

    def test_room_window_uses_local_horizon_but_keeps_skylight_hdri(self):
        self.assertFalse(should_spawn_hdri_dome(ROOM))
        self.assertTrue(should_spawn_hdri_dome({"openings": []}))
        self.assertTrue(should_spawn_hdri_dome(None))

    def test_window_glass_keeps_exterior_visible(self):
        profile = window_glass_profile()
        self.assertEqual(profile["opacity"], 0.025)
        self.assertLessEqual(profile["specular"], 0.03)
        self.assertLessEqual(profile["roughness"], 0.03)
        self.assertEqual(profile["base_color"], (0.92, 0.97, 1.0))

    def test_window_backdrop_is_behind_each_wall_opening(self):
        windows = [
            {"wall": wall, "type": "window", "center": 0.25, "width": 1.4, "sill": 0.7, "height": 1.3}
            for wall in ("west", "east", "south", "north")
        ]
        room = {**ROOM, "openings": windows}
        plan = window_backdrop_plan(room)
        self.assertEqual([item["wall"] for item in plan], ["west", "east", "south", "north"])
        self.assertLess(plan[0]["pos"][0], ROOM["x"][0])
        self.assertGreater(plan[1]["pos"][0], ROOM["x"][1])
        self.assertLess(plan[2]["pos"][1], ROOM["y"][0])
        self.assertGreater(plan[3]["pos"][1], ROOM["y"][1])
        self.assertTrue(all(item["size"][2] == 6.0 for item in plan))
        self.assertTrue(all(0.05 <= item["size"][0] <= 18.0 for item in plan))
        self.assertTrue(all(0.05 <= item["size"][1] <= 18.0 for item in plan))
        self.assertAlmostEqual(plan[0]["pos"][2], 1.35)
        self.assertAlmostEqual(plan[0]["size"][1], 18.0)
        self.assertAlmostEqual(abs(plan[0]["pos"][0] - ROOM["x"][0]), 12.0)
        profile = window_backdrop_profile()
        self.assertEqual(profile["luminance"], 40.0)
        self.assertGreater(profile["fallback_color"][2], profile["fallback_color"][1])
        mapping = {
            "hdris_polyhaven": {"suburban_garden": "suburban_garden"},
        }
        asset_id, source = window_backdrop_source(
            {"room": {"exterior_hdri": "suburban_garden"}}, mapping)
        self.assertEqual(asset_id, "suburban_garden")
        self.assertEqual(source.name, "suburban_garden_window_4k.png")

    def test_window_panorama_preserves_sky_above_ground(self):
        import numpy as np
        source = np.zeros((90, 180, 3), dtype=np.float32)
        source[:45] = (0.0, 0.0, 1.0)  # OpenCV BGR red sky
        source[45:] = (1.0, 0.0, 0.0)  # OpenCV BGR blue ground
        view = project_panorama(source, 0.0, 60.0, (100, 100))
        self.assertGreater(view[10, 50, 0], view[10, 50, 2])
        self.assertGreater(view[90, 50, 2], view[90, 50, 0])

    def test_room_lighting_lifts_ambient_and_softens_grade(self):
        scene = {"id": "test", "room": ROOM,
                 "light": {"intensity": 6.5, "fill": 0.55}}
        profile = room_lighting_profile(scene)
        self.assertAlmostEqual(profile["key_intensity"], 1755.0)
        self.assertEqual(profile["key_source_width_cm"], 420.0)
        self.assertEqual(profile["key_source_height_cm"], 320.0)
        self.assertAlmostEqual(profile["fill_intensity"], 2002.0)
        self.assertEqual(profile["fill_radius_cm"], 3000.0)
        self.assertAlmostEqual(profile["ceiling_bounce_intensity"], 3217.5)
        self.assertEqual(profile["ceiling_bounce_width_cm"], 480.0)
        self.assertEqual(profile["ceiling_bounce_height_cm"], 360.0)
        self.assertEqual(profile["skylight_intensity"], 4.0)
        self.assertEqual(profile["grain"], 0.0)
        self.assertEqual(profile["chromatic_aberration"], 0.0)
        self.assertIsNone(room_lighting_profile({"id": "open_set"}))


if __name__ == "__main__":
    unittest.main()
