"""D23 内容覆盖审计测试（合成小工程）。"""
import csv
import json
import sys
from pathlib import Path

import pytest

TOOLS = Path(__file__).resolve().parents[2]
if str(TOOLS) not in sys.path:
    sys.path.insert(0, str(TOOLS))

from qa import content_coverage as cc  # noqa: E402


def write_json(path: Path, payload: dict) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(payload, ensure_ascii=False, indent=1), encoding="utf-8")


def make_project(root: Path) -> None:
    words = ["unit,section,word,phonetic,pos,meaning_cn"]
    for n in range(1, 7):
        unit = f"unit{n:02d}"
        extra = []
        if n == 1:
            extra = [
                {"section": "section_a", "scenes": [
                    {"id": "u01a_s1", "paragraphs": [1], "exercises": ["u01_a_understanding#1"],
                     "props": [{"kit": "table", "word": "alpha"}, {"kit": "book"}]},
                    {"id": "u01a_s2", "paragraphs": [4], "exercises": ["u01_b_text_b_mcq#1", "u01_a_understanding#9"],
                     "props": [{"kit": "phone", "word": "unknownword"}]},
                    {"id": "u01a_s3", "paragraphs": [2, 3], "exercises": [],
                     "props": [{"kit": "book"}]},
                ]},
                {"section": "section_b", "scenes": []},
            ]
        write_json(root / f"Content/Data/textbook/rw3/articles/{unit}.json", {
            "unit": n,
            "texts": [{"section": "section_a", "title": "A", "paragraphs": ["Alpha is here.", "Beta is there.", "Gamma absent."]}]
            if n == 1 else [{"section": "section_a", "title": "A", "paragraphs": ["Simple paragraph."]}],
        })
        write_json(root / f"Content/Data/textbook/rw3/exercises/{unit}.json", {
            "unit": n,
            "exercises": [{"id": f"u{n:02d}_a_understanding", "section": "section_a", "kind": "understanding",
                           "items": [{"n": 1}, {"n": 2}]}] if n != 1 else [
                {"id": "u01_a_understanding", "section": "section_a", "kind": "understanding",
                 "items": [{"n": 1}, {"n": 2}]},
                {"id": "u01_b_missing", "section": "section_b", "kind": "understanding", "items": [{"n": 1}]},
            ],
        })
        write_json(root / f"Content/Data/memory/textbook_scenes/{unit}.json", {
            "unit": n,
            "articles": extra if n == 1 else [{"section": "section_a", "scenes": []}],
        })
        if n == 1:
            words += [
                "unit01,section_a,alpha,/x/,adj.,first",
                "unit01,section_a,beta,/x/,n.,second",
                "unit01,section_a,gamma,/x/,n.,third",
                "unit01,section_b,delta,/x/,n.,fourth",
            ]
        else:
            pass
    words_path = root / "Content/Data/textbook/rw3/words.csv"
    words_path.parent.mkdir(parents=True, exist_ok=True)
    words_path.write_text("\n".join(words) + "\n", encoding="utf-8")
    write_json(root / "Content/Data/memory/kit_assets.json", {"kits": {"book": {}, "table": {}, "phone": {}}})


@pytest.fixture()
def project(tmp_path: Path) -> Path:
    make_project(tmp_path)
    return tmp_path


def test_parse_ref():
    assert cc.parse_ref("u01_a_understanding") == ("u01_a_understanding", None)
    assert cc.parse_ref("u01_a_understanding#2") == ("u01_a_understanding", {2})
    assert cc.parse_ref("u01_a_understanding#2-4") == ("u01_a_understanding", {2, 3, 4})
    assert cc.parse_ref("u01_a_understanding#4-2") is None
    assert cc.parse_ref("") is None
    assert cc.parse_ref("bad ref!") is None


def test_coverage_counts(project: Path):
    summary = cc.coverage(project)
    unit1 = summary["units"][0]
    assert unit1["paragraphs"]["section_a"]["total"] == 3
    assert unit1["paragraphs"]["section_a"]["covered"] == 3
    assert unit1["paragraphs"]["section_a"]["missing"] == []
    assert unit1["paragraphs"]["section_a"]["invalid"] == [4]

    assert unit1["words"]["total"] == 4
    assert unit1["words"]["covered"] == 1
    assert unit1["words"]["missing"] == ["beta", "delta", "gamma"]
    assert unit1["words"]["placed_unknown"] == ["unknownword"]

    assert unit1["exercises"]["total"] == 3
    assert unit1["exercises"]["covered"] == 1
    assert unit1["exercises"]["missing"] == [{"block": "u01_a_understanding", "n": 2},
                                             {"block": "u01_b_missing", "n": 1}]
    reasons = {item["ref"]: item["reason"] for item in unit1["exercises"]["invalid_refs"]}
    assert set(reasons) == {"u01_b_text_b_mcq#1", "u01_a_understanding#9"}
    assert "不存在" in reasons["u01_b_text_b_mcq#1"]
    assert "越界" in reasons["u01_a_understanding#9"]

    assert summary["totals"]["paragraphs"]["total"] == 8


def test_proposals_include_occurrence_and_scene(project: Path):
    summary = cc.coverage(project)
    proposals = cc.propose_placements(project, summary)
    assert proposals["total_missing"] == 3
    by_word = {item["word"]: item for item in proposals["proposals"]}
    beta = by_word["beta"]
    assert beta["occurrences"][0]["paragraph"] == 2
    assert beta["suggestion"]["confidence"] == "high"
    assert beta["suggestion"]["kit"]
    gamma = by_word["gamma"]
    assert gamma["occurrences"][0]["paragraph"] == 3
    delta = by_word["delta"]
    assert delta["occurrences"] == []
    assert delta["suggestion"]["confidence"] == "low"
    assert delta["suggestion"]["kit"]


def test_markdown_and_files(project: Path, tmp_path: Path):
    summary = cc.coverage(project)
    proposals = cc.propose_placements(project, summary)
    text = cc.render_markdown(summary, proposals, "u01a_s2: u01_b_missing → u01_a_understanding")
    assert "# 内容覆盖审计（D23）" in text
    assert "| 单元 | 段落 | 生词 | 题目 | 无效引用 |" in text
    assert "u01_b_missing" in text
    assert "修改记录" in text

    out_md = tmp_path / "out/coverage.md"
    out_prop = tmp_path / "out/proposals.json"
    code = cc.main(["--project", str(project), "--out-md", str(out_md), "--out-proposals", str(out_prop)])
    assert code == 0
    assert out_md.exists() and out_prop.exists()
    payload = json.loads(out_prop.read_text(encoding="utf-8"))
    assert payload["total_missing"] == 3
