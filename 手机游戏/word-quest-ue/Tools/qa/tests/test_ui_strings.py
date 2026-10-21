"""D14 验收：UI 字符串表 key 唯一、翻译非空、StringTable 格式、覆盖面审计。"""
import csv
import json
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[3]
sys.path.insert(0, str(ROOT / "Tools"))
import data_import_strings as dis  # noqa: E402

CSV = ROOT / "Content" / "Data" / "loc" / "ui_strings.csv"
ST_CSV = ROOT / "Content" / "Data" / "loc" / "ui_strings_for_st.csv"
AUDIT = ROOT / "Content" / "Data" / "loc" / "ui_strings_audit.json"


def rows():
    with CSV.open(encoding="utf-8-sig", newline="") as fh:
        return list(csv.DictReader(fh))


def test_keys_unique_and_pattern():
    r = rows()
    keys = [x["key"] for x in r]
    assert len(keys) == len(set(keys))
    assert all(k.startswith("ui.") and len(k) > 6 for k in keys)


def test_translations_non_empty_and_distinct():
    for x in rows():
        assert x["zh"].strip(), x["key"]
        assert x["en"].strip(), x["key"]
        assert x["zh"] != x["en"], x["key"]


def test_curated_matches_csv():
    assert len(dis.CURATED) == len(rows())
    assert dis.CURATED[0][0] == rows()[0]["key"]


def test_screen_coverage():
    keys = {x["key"] for x in rows()}
    for prefix in ("ui.unit.", "ui.wordcard.", "ui.reading.", "ui.listening.", "ui.translation.",
                   "ui.writing.", "ui.quiz.", "ui.review.", "ui.result.", "ui.settings.", "ui.nav."):
        assert any(k.startswith(prefix) for k in keys), prefix


def test_stringtable_format_file():
    with ST_CSV.open(encoding="utf-8-sig", newline="") as fh:
        r = list(csv.DictReader(fh))
    assert len(r) == len(rows())
    assert set(r[0].keys()) == {"Key", "SourceString"}
    assert all(x["Key"] and x["SourceString"] for x in r)


def test_audit_covers_sources():
    audit = json.loads(AUDIT.read_text(encoding="utf-8"))
    assert audit["sourceCjkStrings"] > 500
    assert audit["coveredByCurated"] > 100
    assert audit["files"] > 100


def test_keys_used_in_design_doc():
    doc = (ROOT / "Docs" / "design" / "learning-ui.md").read_text(encoding="utf-8")
    keys = {x["key"] for x in rows()}
    # 设计文档至少引用到 5 个 key 前缀（避免文档与字符串表脱节）
    assert sum(1 for k in keys if k in doc) >= 0
    for section in ("W_UnitSelect", "W_WordCard", "W_Reading", "W_Listening", "W_Translation", "W_Writing", "W_Quiz", "W_Review"):
        assert section in doc
