"""D24 答案合并测试（合成小工程）。"""
import json
import sys
from pathlib import Path

import pytest

TOOLS = Path(__file__).resolve().parents[2]
if str(TOOLS) not in sys.path:
    sys.path.insert(0, str(TOOLS))

import data_answers as da  # noqa: E402


def write_json(path: Path, payload: dict) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(payload, ensure_ascii=False, indent=1), encoding="utf-8")


def make_project(root: Path) -> None:
    for n in range(1, 7):
        write_json(root / f"Content/Data/textbook/rw3/exercises/unit{n:02}.json", {
            "unit": n,
            "exercises": [
                {"id": f"u{n:02}_a_understanding", "section": "section_a", "kind": "understanding",
                 "items": [{"n": 1, "prompt": "Q1", "answer": "given", "answer_source": "derived"},
                           {"n": 2, "prompt": "Q2", "answer": None, "answer_source": "open"}]},
                {"id": f"u{n:02}_a_text_b_mcq", "section": "section_b", "kind": "text_b_mcq",
                 "items": [{"n": 1, "prompt": "MCQ", "options": ["a", "b", "c", "d"], "answer": 2,
                            "answer_source": "derived"}]},
            ],
        })
        write_json(root / f"Content/Data/textbook/rw3/answers/draft_unit{n:02}.json", {
            "unit": n,
            "items": [
                {"block": f"u{n:02}_a_understanding", "n": 1,
                 "explanation_en": "State the reason from Para. 1.", "draft_answer": None, "needs_review": False},
                {"block": f"u{n:02}_a_understanding", "n": 2,
                 "explanation_en": "A personal answer supported by the text.", "draft_answer": "I think so, because ...", "needs_review": True},
                {"block": f"u{n:02}_a_text_b_mcq", "n": 1,
                 "explanation_en": "Para. 2 states this directly.", "draft_answer": None, "needs_review": False},
            ],
        })


@pytest.fixture()
def project(tmp_path: Path) -> Path:
    make_project(tmp_path)
    return tmp_path


def test_check_passes(project: Path):
    assert all(da.check_unit(n, project) == [] for n in range(1, 7))


def test_merge_and_idempotent(project: Path):
    stats = da.merge_unit(1, project)
    assert stats == {"items": 3, "filled": 1, "drafts": 1, "needs_review": 1, "explanations": 3}
    data = json.loads((project / "Content/Data/textbook/rw3/exercises/unit01.json").read_text())
    items = {item["n"]: item for item in data["exercises"][0]["items"]}
    assert items[1]["answer"] == "given"
    assert items[2]["answer"].startswith("I think")
    assert items[2]["answer_source"] == "draft"
    assert items[2]["needs_review"] is True
    assert items[2]["explanation"].startswith("A personal")
    mcq = data["exercises"][1]["items"][0]
    assert mcq["answer"] == 2 and 0 <= mcq["answer"] <= 3

    again = da.merge_unit(1, project)
    assert again["filled"] == 0  # 已有答案不再覆盖


def test_check_reports_missing_draft(project: Path):
    draft_path = project / "Content/Data/textbook/rw3/answers/draft_unit01.json"
    payload = json.loads(draft_path.read_text())
    payload["items"] = payload["items"][:-1]
    write_json(draft_path, payload)
    problems = da.check_unit(1, project)
    assert any("u01_a_text_b_mcq#1" in p for p in problems)


def test_main_generates_report(project: Path, tmp_path: Path):
    report = tmp_path / "report.md"
    code = da.main(["--project", str(project), "--out-report", str(report)])
    assert code == 0
    text = report.read_text(encoding="utf-8")
    assert "D24 答案" in text and "| unit01 |" in text
