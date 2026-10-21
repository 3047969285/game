"""D7 验收：参考头发掩码生成（合成图 + 真实图数量检查）。"""
import sys
from pathlib import Path

import numpy as np
from PIL import Image

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

from ref_hair_masks import mask_for, save_mask, save_overlay  # noqa: E402


def test_mask_for_synthetic(tmp_path):
    img = np.full((80, 80, 3), 255, dtype=np.uint8)
    img[10:40, 20:60] = (35, 30, 32)  # 黑发块
    p = tmp_path / "syn.png"
    Image.fromarray(img).save(p)
    mask = mask_for(p, v_max=100)
    assert mask[10:40, 20:60].all()
    assert not mask[0:5, :].any()


def test_save_mask_and_overlay(tmp_path):
    img = np.full((40, 40, 3), 255, dtype=np.uint8)
    img[5:20, 5:20] = (20, 20, 20)
    src = tmp_path / "a.png"
    Image.fromarray(img).save(src)
    mask = mask_for(src, v_max=100)
    m = save_mask(mask, tmp_path, "a_mask")
    o = save_overlay(src, mask, tmp_path, "a_mask")
    assert m.is_file() and o.is_file()
    arr = np.array(Image.open(m))
    assert arr.max() == 255 and arr.min() == 0 or mask.sum() == mask.size
    assert (arr > 0).sum() == mask.sum()


def test_real_reference_masks_exist():
    root = Path(__file__).resolve().parents[3] / "Docs" / "qa" / "ref_masks"
    expected = [
        "me2026_front.png", "me2026_q34.png", "me2026_side.png",
        "lin_front.png", "lin_q34.png", "lin_side.png", "lin_q34_supplement.png",
        "lin_sheet_front.png", "lin_sheet_side.png", "lin_sheet_back.png",
    ]
    missing = [e for e in expected if not (root / e).is_file()]
    assert not missing, f"missing ref masks: {missing} (run Tools/qa/ref_hair_masks.py)"
