"""校验 UE 原生剧情 JSON。Web 客户端已退役，不再执行 TypeScript / Node 导出。

Content/Data/memory/acts.json 是迁移后的权威剧情数据，直接编辑此文件。
保留原命令及 --check 参数，供既有验收工具兼容调用；缺失数据时明确失败。
"""
from __future__ import annotations
import argparse
import json
from pathlib import Path

PROJECT = Path(__file__).resolve().parents[1]
OUT = PROJECT / "Content" / "Data" / "memory" / "acts.json"


def run_export() -> dict:
    if not OUT.is_file():
        raise SystemExit(f"UE 剧情数据不存在: {OUT}; 请恢复迁移后的 JSON，Web 导出器已退役。")
    return json.loads(OUT.read_text(encoding="utf-8"))


def check(data: dict) -> dict:
    units = data["units"]
    assert len(units) == 6, len(units)
    sections = [s for u in units for s in u["sections"]]
    assert len(sections) == 18
    for s in sections:
        assert s["acts"], f"{s['scriptId']} has no acts"
        assert all(a["sentences"] for a in s["acts"]), f"{s['scriptId']} empty act"
        assert s["title"] and s["titleZh"]
    # 幕数、台词数、说话人统计
    known = {"me2026", "lin", "mei", "an", "rui", "organizer", "old2090", "system", "young", "old"}
    speakers = set()
    act_total = 0
    line_total = len(data["prologue"]["lines"])
    for s in sections:
        act_total += len(s["acts"])
        line_total += len(s["lines"])
        for line in s["lines"]:
            if line.get("speaker"):
                speakers.add(line["speaker"])
    result = {
        "units": len(units), "sections": len(sections), "acts": act_total, "lines": line_total,
        "prologueLines": len(data["prologue"]["lines"]),
        "unknownSpeakers": sorted(speakers - known),
        "actCountBySection": {s["scriptId"]: len(s["acts"]) for s in sections},
    }
    return result


def main(argv=None) -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--check", action="store_true")
    args = ap.parse_args(argv)
    data = run_export()
    result = check(data)
    print("[D9] " + json.dumps(result, ensure_ascii=False))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
