"""教材版读写3 数据层验收：教材原文、词表、题目答案、翻译。"""
import json
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / "data"


def load(relative):
    return json.loads((DATA / relative).read_text(encoding="utf-8"))


class Rw3TextbookDataTests(unittest.TestCase):
    def setUp(self):
        self.units = [load(f"content/college_english_rw3/unit{i:02d}.json") for i in range(1, 7)]
        self.vocabulary = load("vocabulary/college_english_rw3.json")

    def test_six_units_from_textbook(self):
        self.assertEqual(len(self.units), 6)
        for unit in self.units:
            self.assertEqual(unit.get("source"), "textbook-rw3", unit["unit_id"])
            for key in ("section_a", "section_b", "section_c"):
                self.assertGreater(len(unit["sections"][key]["passage"]), 800, (unit["unit_id"], key))
            self.assertTrue(unit["sections"]["section_a"]["title"].strip())
            self.assertTrue(unit["sections"]["section_b"]["title"].strip())

    def test_vocabulary_matches_units(self):
        words = self.vocabulary["words"]
        self.assertEqual(self.vocabulary["count"], len(words))
        self.assertGreaterEqual(len(words), 400)
        ids = {w["id"] for w in words}
        self.assertEqual(len(ids), len(words))
        referenced = [word_id for unit in self.units for word_id in unit["word_ids"]]
        self.assertEqual(len(referenced), len(set(referenced)))
        self.assertEqual(set(referenced), ids)
        for word in words:
            self.assertTrue(word["word"].strip())
            self.assertTrue(word["meaning"].strip(), word["id"])
            self.assertIn(word["unit_id"], {unit["unit_id"] for unit in self.units})
        with_phonetic = sum(1 for w in words if w["phonetic"].strip())
        self.assertGreaterEqual(with_phonetic / len(words), 0.55)

    def test_questions_are_gradable(self):
        for unit in self.units:
            for section, questions in unit["micro_world_checks"].items():
                for question in questions:
                    self.assertEqual(len(question["options"]), 4, (unit["unit_id"], section))
                    self.assertIs(type(question["answer"]), int)
                    self.assertTrue(0 <= question["answer"] < 4)
                    self.assertTrue(question["question"].strip())
            self.assertGreaterEqual(len(unit["sections"]["reading"]["questions"]), 3, unit["unit_id"])
            for question in unit["sections"]["reading"]["questions"]:
                self.assertEqual(len(question["options"]), 4)
                self.assertIs(type(question["answer"]), int)

    def test_translation_and_writing(self):
        for unit in self.units:
            sentences = unit["sections"]["translation"]["sentences"]
            self.assertGreaterEqual(len(sentences), 1, unit["unit_id"])
            for sentence in sentences:
                self.assertTrue(sentence["zh"].strip())
                self.assertGreater(len(sentence["en_reference"]), 20)
            writing = unit["sections"]["writing"]
            self.assertTrue(writing["prompt"].strip())
            self.assertGreaterEqual(len(writing["outline"]), 3)

    def test_no_legacy_original_content(self):
        markers = ("campus conversation club", "Two Lives, One Lesson", "原创仿学")
        for unit in self.units:
            blob = json.dumps(unit, ensure_ascii=False)
            for marker in markers:
                self.assertNotIn(marker, blob, unit["unit_id"])


if __name__ == "__main__":
    unittest.main()
