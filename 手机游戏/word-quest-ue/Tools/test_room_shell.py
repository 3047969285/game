"""Offline tests for Tools/room_shell.py geometry (no Unreal): python3 -m unittest Tools/test_room_shell.py"""
import sys
import unittest
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from room_shell import shell_boxes, wall_pieces  # noqa: E402

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

    def test_no_skirting_across_the_door(self):
        for b in shell_boxes(ROOM):
            if b["name"].startswith("SKIRT_east"):
                lo, hi = b["pos"][1] - b["size"][1] / 2, b["pos"][1] + b["size"][1] / 2
                self.assertFalse(lo < 2.35 - 1e-6 and hi > 1.45 + 1e-6, (lo, hi))


if __name__ == "__main__":
    unittest.main()
