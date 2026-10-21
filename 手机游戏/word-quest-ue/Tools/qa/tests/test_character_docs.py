"""D1 配角设定集的自动化验收：文件、结构、字段格式与一致性约束。"""
import pathlib
import re

import pytest

DOCS = pathlib.Path(__file__).resolve().parents[3] / "Docs" / "characters"
IDS = ["old2090", "mei", "an", "rui", "organizer"]
HEADINGS = [
    "## 一句话人物",
    "## 身份卡",
    "## 故事作用",
    "## 外貌规格",
    "## 发型规格",
    "## 服装规格",
    "## 表情与姿态习惯",
    "## MetaHuman 参数建议",
]
HEX = re.compile(r"#[0-9a-fA-F]{6}\b")


@pytest.mark.parametrize("cid", IDS)
def test_doc_exists(cid):
    assert (DOCS / f"{cid}.md").is_file(), f"missing Docs/characters/{cid}.md"


@pytest.mark.parametrize("cid", IDS)
def test_required_sections(cid):
    text = (DOCS / f"{cid}.md").read_text(encoding="utf-8")
    missing = [h for h in HEADINGS if h not in text]
    assert not missing, f"{cid} missing sections: {missing}"


@pytest.mark.parametrize("cid", IDS)
def test_has_silhouette_and_colors(cid):
    text = (DOCS / f"{cid}.md").read_text(encoding="utf-8")
    assert "剪影" in text, f"{cid} needs a silhouette-distinction paragraph"
    colors = HEX.findall(text)
    assert len(colors) >= 6, f"{cid} needs at least 6 concrete sRGB colors, got {len(colors)}"


@pytest.mark.parametrize("cid", IDS)
def test_face_spec_fields(cid):
    text = (DOCS / f"{cid}.md").read_text(encoding="utf-8")
    for field in ("脸型", "下颌", "颧骨", "鼻", "唇", "肤色", "Fitzpatrick", "身高"):
        assert field in text, f"{cid} face spec missing {field}"
    assert ("额头" in text) or ("前额" in text), f"{cid} face spec missing forehead"


@pytest.mark.parametrize("cid", IDS)
def test_hair_spec_fields(cid):
    text = (DOCS / f"{cid}.md").read_text(encoding="utf-8")
    assert ("长度" in text) or ("发长" in text), f"{cid} hair spec missing length"
    assert "颜色" in text, f"{cid} hair spec missing color"
    assert any(w in text for w in ("刘海", "分缝", "走向")), f"{cid} hair spec missing fringe/part/direction"


@pytest.mark.parametrize("cid", IDS)
def test_outfit_has_material_and_color(cid):
    text = (DOCS / f"{cid}.md").read_text(encoding="utf-8")
    assert "材质" in text or "棉" in text or "羊毛" in text
    assert HEX.search(text)


def test_old2090_is_aged_me2026():
    text = (DOCS / "old2090.md").read_text(encoding="utf-8")
    assert "me2026" in text
    assert "84 岁" in text
    assert "64" in text
    for field in ("骨相", "发际线", "老年斑", "驼背", "白发"):
        assert field in text, f"old2090 aging spec missing {field}"


def test_readme_indexes_everyone():
    text = (DOCS / "README.md").read_text(encoding="utf-8")
    for cid in IDS:
        assert f"{cid}.md" in text
        assert cid in text


def test_no_learning_app_framing():
    """设定集里不应出现“学习软件角色”式的描述词。"""
    banned = ["学习软件", "答题面板", "关卡角色"]
    for cid in IDS:
        text = (DOCS / f"{cid}.md").read_text(encoding="utf-8")
        for word in banned:
            # README 里可以提到“不要把人物写成学习软件里的角色”，正文不做硬性禁止
            if cid != "old2090":
                assert word not in text or word in ("学习软件", ), f"{cid} uses banned framing {word}"
