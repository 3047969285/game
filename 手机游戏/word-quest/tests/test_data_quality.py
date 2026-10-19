import importlib.util
import json
import shutil
import tempfile
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]


def module(name):
    spec = importlib.util.spec_from_file_location(name, ROOT / "scripts" / f"{name}.py")
    loaded = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(loaded)
    return loaded


validator = module("validate_data")
builder = module("build_templates")


class CourseDataTests(unittest.TestCase):
    def setUp(self):
        temp = tempfile.TemporaryDirectory()
        self.addCleanup(temp.cleanup)
        self.data = Path(temp.name) / "data"
        shutil.copytree(ROOT / "data", self.data)

    def change(self, relative, edit):
        path = self.data / relative
        payload = json.loads(path.read_text(encoding="utf-8"))
        edit(payload)
        path.write_text(json.dumps(payload, ensure_ascii=False), encoding="utf-8")

    def test_committed_data_has_no_broken_references(self):
        self.assertEqual(validator.validate_data(self.data), [])

    def test_generated_cet_templates_match_real_content_ids(self):
        for course in ("cet4", "cet6"):
            words = json.loads((self.data / f"vocabulary/{course}.json").read_text())["words"]
            template = builder.build_cet_template(course, course, words, [])
            (self.data / f"templates/{course}.json").write_text(json.dumps(template))
        self.assertEqual(validator.validate_data(self.data), [])

    def test_rw3_generator_keeps_every_vocabulary_lesson(self):
        template = builder.build_rw3_template()
        words = json.loads((self.data / "vocabulary/college_english_rw3.json").read_text())["words"]
        taught = {ref.split(":", 1)[1] for zone in template["zones"]
                  for level in zone["levels"] for ref in level["content_refs"]
                  if ref.startswith("rw3_vocab:")}
        self.assertEqual(taught, {word["id"] for word in words})

    def test_missing_content_reference_is_reported(self):
        self.change("templates/cet4.json", lambda data:
                    data["zones"][1]["levels"][0].update(content_refs=["listening:missing"]))
        self.assertTrue(any("listening:missing" in error for error in validator.validate_data(self.data)))

    def test_duplicate_word_id_is_reported(self):
        self.change("vocabulary/cet4.json", lambda data:
                    data["words"][1].update(id=data["words"][0]["id"]))
        self.assertTrue(any("重复 ID" in error for error in validator.validate_data(self.data)))

    def test_wrong_count_is_reported(self):
        self.change("vocabulary/cet4.json", lambda data: data.update(count=1))
        self.assertTrue(any("计数不一致" in error for error in validator.validate_data(self.data)))

    def test_out_of_range_answer_is_reported(self):
        self.change("content/cet4/reading.json", lambda data:
                    data["items"][0]["questions"][0].update(answer=99))
        self.assertTrue(any("答案索引越界" in error for error in validator.validate_data(self.data)))


if __name__ == "__main__":
    unittest.main()
