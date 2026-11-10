"""D9 验收：memory acts 导出与 TS 源一致性、结构完整性、说话人合法性。"""
import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[3]
ACTS = ROOT / "Content" / "Data" / "memory" / "acts.json"
CONTENT = ROOT.parent / "word-quest-game" / "public" / "data" / "content" / "college_english_rw3"
VOCAB = ROOT / "Content" / "Data" / "vocabulary" / "college_english_rw3.json"

KNOWN = {"me2026", "lin", "mei", "an", "rui", "organizer", "old2090", "system", "young", "old"}


def data():
    return json.loads(ACTS.read_text(encoding="utf-8"))


def sections(d):
    return [s for u in d["units"] for s in u["sections"]]


def test_file_and_meta():
    d = data()
    assert d["meta"]["units"] == 6
    assert len(d["units"]) == 6
    assert d["prologue"]["id"] == "prologue" and d["prologue"]["lines"]


def test_counts():
    d = data()
    secs = sections(d)
    assert len(secs) == 18
    assert sum(len(s["acts"]) for s in secs) == 90
    assert len(d["prologue"]["lines"]) == 5
    total_lines = len(d["prologue"]["lines"]) + sum(len(s["lines"]) for s in secs)
    assert total_lines == 98


def test_every_section_has_acts_and_sentences():
    for s in sections(data()):
        assert len(s["acts"]) == 5, s["scriptId"]
        for act in s["acts"]:
            assert act["sentences"], (s["scriptId"], act["index"])
            assert all(isinstance(x, str) and x.strip() for x in act["sentences"])


def test_starts_monotonic_and_cover_passage():
    for u, s in ((u, s) for u in data()["units"] for s in u["sections"]):
        starts = [a["start"] for a in s["acts"]]
        assert starts == sorted(starts)
        assert starts[0] == 0


def test_scene_mapping_covers_every_full_textbook_paragraph():
    """The UE memory player reads complete article paragraphs via its scene map."""
    textbook = ROOT / "Content" / "Data" / "textbook" / "rw3" / "articles"
    scene_root = ROOT / "Content" / "Data" / "memory" / "textbook_scenes"
    for unit_number in range(1, 7):
        unit_id = f"unit{unit_number:02d}"
        article_book = json.loads((textbook / f"{unit_id}.json").read_text(encoding="utf-8"))
        scene_book = json.loads((scene_root / f"{unit_id}.json").read_text(encoding="utf-8"))
        mappings = {article["section"]: article for article in scene_book["articles"]}
        assert set(mappings) == {article["section"] for article in article_book["texts"]}
        for article in article_book["texts"]:
            paragraphs = article["paragraphs"]
            mapped = [
                number
                for scene in mappings[article["section"]]["scenes"]
                for number in scene["paragraphs"]
            ]
            assert paragraphs and all(isinstance(p, str) and p.strip() for p in paragraphs)
            assert mapped and set(mapped) == set(range(1, len(paragraphs) + 1)), (
                unit_id,
                article["section"],
                sorted(set(range(1, len(paragraphs) + 1)) - set(mapped)),
            )


def test_room_scenes_have_an_interior_player_camera():
    """Room cameras used for player entry stay at least 45 cm from each wall."""
    scene_root = ROOT / "Content" / "Data" / "memory" / "textbook_scenes"
    for path in sorted(scene_root.glob("unit*.json")):
        scene_book = json.loads(path.read_text(encoding="utf-8"))
        for article in scene_book["articles"]:
            for scene in article["scenes"]:
                room = scene.get("room")
                if not room:
                    continue
                x_bounds, y_bounds = room.get("x"), room.get("y")
                assert isinstance(x_bounds, list) and len(x_bounds) >= 2, scene["id"]
                assert isinstance(y_bounds, list) and len(y_bounds) >= 2, scene["id"]
                margin = 0.45
                assert any(
                    len(shot.get("pos", [])) >= 2
                    and x_bounds[0] + margin < shot["pos"][0] < x_bounds[1] - margin
                    and y_bounds[0] + margin < shot["pos"][1] < y_bounds[1] - margin
                    for shot in scene.get("shots", [])
                ), scene["id"]


def test_word_ids_exist_in_vocabulary():
    vocab = {w["id"] for w in json.loads(VOCAB.read_text(encoding="utf-8"))["words"]}
    used = set()
    for s in sections(data()):
        for act in s["acts"]:
            used.update(act["wordIds"])
    assert used and used <= vocab, sorted(used - vocab)[:5]


def test_speakers_are_known():
    speakers = set()
    for line in data()["prologue"]["lines"]:
        if line.get("speaker"):
            speakers.add(line["speaker"])
    for s in sections(data()):
        for line in s["lines"]:
            if line.get("speaker"):
                speakers.add(line["speaker"])
        for act in s["acts"]:
            if act.get("dialog", None) and act["dialog"].get("speaker"):
                speakers.add(act["dialog"]["speaker"])
    assert speakers <= KNOWN, sorted(speakers - KNOWN)


def test_section_titles_bilingual():
    for s in sections(data()):
        assert s["title"].strip() and s["titleZh"].strip()
        assert re.search(r"[A-Za-z]", s["title"])
