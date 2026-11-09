"""D25 配音清单/时间戳测试。"""
import json
import shutil
import sys
from pathlib import Path

import pytest

TOOLS = Path(__file__).resolve().parents[2]
if str(TOOLS) not in sys.path:
    sys.path.insert(0, str(TOOLS))

import data_vo_textbook as vo  # noqa: E402


def write_json(path: Path, payload: dict) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(payload, ensure_ascii=False, indent=1), encoding="utf-8")


def make_project(root: Path) -> None:
    for n in range(1, 7):
        write_json(root / f"Content/Data/textbook/rw3/articles/unit{n:02}.json", {
            "unit": n,
            "texts": [{"section": "section_a", "title": "A", "paragraphs": ["Hello there. This is a test.", "Second paragraph."]}],
        })
        write_json(root / f"Content/Data/textbook/rw3/exercises/unit{n:02}.json", {
            "unit": n,
            "exercises": [{"id": f"u{n:02}_a_understanding", "section": "section_a", "kind": "understanding",
                           "instructions": "Answer the following questions.", "items": []}],
        })
        write_json(root / f"Content/Data/textbook/rw3/answers/draft_unit{n:02}.json", {"unit": n, "items": []})


def test_split_sentences():
    assert vo.split_sentences("One. Two! Three?") == ["One.", "Two!", "Three?"]
    assert vo.split_sentences("He said \"stop.\" Then left.")[0].startswith("He said")


def test_manifest_counts(tmp_path: Path):
    make_project(tmp_path)
    lines = vo.manifest_lines(tmp_path)
    assert len(lines) == 6 * 3  # 每单元 2 段 + 1 条指令
    assert len({line["line_id"] for line in lines}) == len(lines)
    csv_path, md_path = vo.write_manifest(tmp_path, lines)
    assert csv_path.exists() and md_path.exists()
    assert "课文配音清单" in md_path.read_text(encoding="utf-8")
    assert vo.check(tmp_path) == []


@pytest.mark.skipif(not shutil.which("say"), reason="本机没有 say")
def test_synthesize_line(tmp_path: Path):
    make_project(tmp_path)
    line = vo.manifest_lines(tmp_path)[0]
    payload = vo.synthesize_line(line, tmp_path / "Content/Data/vo/textbook/unit01")
    wav_path = tmp_path / f"Content/Data/vo/textbook/unit01/{line['line_id']}.wav"
    json_path = wav_path.with_suffix(".json")
    assert wav_path.exists() and json_path.exists()
    data = json.loads(json_path.read_text())
    assert data["duration"] > 0.3
    starts = [sentence["start"] for sentence in data["sentences"]]
    ends = [sentence["end"] for sentence in data["sentences"]]
    assert starts == sorted(starts)
    assert all(b >= a for a, b in zip(starts, ends))
    assert abs(data["duration"] - ends[-1]) < 0.06
    assert vo.wav_rms(wav_path) > 0.005
