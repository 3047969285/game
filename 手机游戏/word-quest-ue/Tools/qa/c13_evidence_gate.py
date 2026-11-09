#!/usr/bin/env python3
"""C13 证据像素门禁（Claude 2026-10-23）：亮度 25–200；字幕/单词元素前后截图差异面积 > 0.5%。
用法：python3 Tools/qa/c13_evidence_gate.py [evidence_dir]
退出码 0=通过。"""
import json
import sys
from pathlib import Path

import numpy as np
from PIL import Image

PAIRS = [("c13-subtitle-spawn.png", "c13-subtitle-next.png", "字幕生成/换句"),
         ("c13-word-before.png", "c13-word-gaze.png", "单词浮现")]


def stats(path):
    with Image.open(path) as src:
        rgb = src.convert("RGB")
        size = rgb.size
    a = np.asarray(rgb, np.float32)
    luma = a[..., 0] * .2126 + a[..., 1] * .7152 + a[..., 2] * .0722
    return luma, size


def main():
    folder = Path(sys.argv[1] if len(sys.argv) > 1 else "Docs/qa/immersive")
    report = {"images": [], "pairs": [], "result": "PASS", "issues": []}
    for path in sorted(folder.glob("*.png")):
        luma, size = stats(path)
        mean = float(luma.mean())
        item = {"image": path.name, "size": list(size), "mean_luma": round(mean, 2)}
        if mean < 25 or mean > 200:
            item["issue"] = f"mean luma {mean:.2f} outside 25..200"
            report["issues"].append(item["image"] + ": " + item["issue"])
        report["images"].append(item)
    for before_name, after_name, label in PAIRS:
        before, after = folder / before_name, folder / after_name
        if not (before.exists() and after.exists()):
            report["issues"].append(f"missing pair {before_name} / {after_name}")
            continue
        lb, _ = stats(before)
        la, _ = stats(after)
        if lb.shape != la.shape:
            report["issues"].append(f"pair size mismatch {before_name} vs {after_name}")
            continue
        diff = float((np.abs(la - lb) > 12).mean())
        item = {"pair": label, "before": before_name, "after": after_name,
                "diff_area": round(diff, 5), "min": 0.005}
        if diff < 0.005:
            item["issue"] = f"diff area {diff:.4%} < 0.5%"
            report["issues"].append(label + ": " + item["issue"])
        report["pairs"].append(item)
    report["result"] = "FAIL" if report["issues"] else "PASS"
    (folder / "gate.json").write_text(json.dumps(report, ensure_ascii=False, indent=1), encoding="utf-8")
    print(json.dumps({"result": report["result"], "issues": report["issues"]}, ensure_ascii=False))
    return 0 if report["result"] == "PASS" else 1


if __name__ == "__main__":
    raise SystemExit(main())
