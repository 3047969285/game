"""D12 验收：学习界面设计规格必须覆盖 8 个界面、数据绑定、双端适配、无障碍与线框。"""
from pathlib import Path

DOC = Path(__file__).resolve().parents[3] / "Docs" / "design" / "learning-ui.md"

SCREENS = ["W_UnitSelect", "W_WordCard", "W_Reading", "W_Listening",
           "W_Translation", "W_Writing", "W_Quiz", "W_Review", "W_Result"]
DT_REFS = ["DT_Content_Unit", "DT_Content_Section", "DT_Content_ReadingQuestion",
           "DT_Content_ListeningQuestion", "DT_Content_Translation", "DT_Content_Writing",
           "DT_Vocabulary"]
SECTIONS = ["布局线框", "数据绑定", "状态机", "适配", "无障碍"]


def text():
    return DOC.read_text(encoding="utf-8")


def test_doc_exists_and_style():
    assert DOC.is_file()
    t = text()
    assert "记忆的界面" in t and "2090" in t and "冷" in t
    assert len(t.splitlines()) > 150


def test_all_screens_covered():
    t = text()
    for s in SCREENS:
        assert s in t, s


def test_data_bindings_and_datatables():
    t = text()
    for d in DT_REFS:
        assert d in t, d
    assert "数据绑定" in t


def test_states_layout_and_adaptation():
    t = text()
    for s in ("状态机", "布局", "桌面", "手机", "┌"):
        assert s in t, s
    assert "桌面 ≥1280dp" in t and "手机 <768dp" in t


def test_accessibility_requirements():
    t = text()
    for s in ("无障碍", "对比度", "字号", "键盘", "手柄", "屏幕阅读", "减少动态"):
        assert s in t, s


def test_localization_keys_section():
    t = text()
    assert "ST_UI" in t and "ui." in t
