"""Review-capture resolution contract; Unreal execution remains in the locked editor."""
import sys
import unittest
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from room_review import CAPTURE_TIMEOUT_SECONDS, REVIEW_TIMEOUT_SECONDS, parse_resolution  # noqa: E402


class RoomReviewResolutionTests(unittest.TestCase):
    def test_capture_timeout_allows_temporal_capture_to_finish(self):
        self.assertGreaterEqual(CAPTURE_TIMEOUT_SECONDS, 35)
        self.assertGreater(REVIEW_TIMEOUT_SECONDS, 4 * CAPTURE_TIMEOUT_SECONDS)

    def test_supported_sizes(self):
        self.assertEqual(parse_resolution("1920x1080"), (1920, 1080))
        self.assertEqual(parse_resolution("640x360"), (640, 360))
        self.assertEqual(parse_resolution("4096x2160"), (4096, 2160))

    def test_malformed_size_fails(self):
        for value in ("", "fullhd", "1920", "1920x1080x1"):
            with self.subTest(value=value), self.assertRaises(ValueError):
                parse_resolution(value)

    def test_unsafe_size_fails(self):
        for value in ("639x360", "640x359", "4097x2160", "1920x2161"):
            with self.subTest(value=value), self.assertRaises(ValueError):
                parse_resolution(value)


if __name__ == "__main__":
    unittest.main()
