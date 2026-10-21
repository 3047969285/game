"""D16 验收：动作清单唯一性、角色/类别/循环/优先级/来源合法性、覆盖率、文档一致性。"""
import csv
from pathlib import Path

ROOT = Path(__file__).resolve().parents[3]
CSV = ROOT / "Content" / "Data" / "anim" / "anim_manifest.csv"
DOC = ROOT / "Docs" / "design" / "animation-spec.md"
CHARS = {"me2026", "lin", "mei", "an", "rui", "organizer", "old2090"}
CATEGORIES = {"locomotion", "classroom", "social", "face"}
PRIORITIES = {"P0", "P1", "P2"}
SOURCES = {"mocap", "handkey", "procedural"}


def rows():
    with CSV.open(encoding="utf-8-sig", newline="") as fh:
        return list(csv.DictReader(fh))


def test_unique_ids_and_fields():
    r = rows()
    ids = [x["anim_id"] for x in r]
    assert len(ids) == len(set(ids)) == len(r)
    for x in r:
        assert x["character"] in CHARS, x
        assert x["category"] in CATEGORIES, x
        assert x["loop"] in ("true", "false"), x
        assert x["priority"] in PRIORITIES, x
        assert x["source"] in SOURCES, x
        assert x["anim_id"].startswith(x["character"] + "_"), x


def test_every_character_has_core_actions():
    r = rows()
    cats = {c: set() for c in CHARS}
    for x in r:
        cats[x["character"]].add(x["category"])
    for c in CHARS:
        assert cats[c], c
        assert len(["x" for x in r if x["character"] == c]) >= 4, c
    # 主角/老人必须有面部或社交动作
    for c in ("me2026", "lin", "old2090"):
        assert "face" in cats[c] or "social" in cats[c], c


def test_all_categories_present():
    cats = {x["category"] for x in rows()}
    assert cats == CATEGORIES


def test_doc_has_character_performance_and_face_recipes():
    t = DOC.read_text(encoding="utf-8")
    for c in CHARS:
        assert c in t, c
    for key in ("mouthSmileLeft", "browInnerUp", "eyeSquint", "jawOpen", "eyeWide", "mouthFrown"):
        assert key in t, key
    for sec in ("技术基线", "优先级", "状态机", "与 `acts.json` 时间线对接", "版权"):
        assert sec in t, sec
    assert "anim_manifest.csv" in t


def test_priority_policy():
    r = rows()
    # P0 只用于过场（当前清单无 P0 行也可以接受）；循环动作不应是 P0
    for x in r:
        if x["loop"] == "true":
            assert x["priority"] in ("P1", "P2"), x
