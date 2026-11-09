#!/usr/bin/env python3
"""D24：把英文解析 / 开放题参考作答 / 翻译参考合并进 exercises/unitNN.json。

输入：Content/Data/textbook/rw3/answers/draft_unitNN.json（每个 item 一条草稿）
      Content/Data/textbook/rw3/exercises/unitNN.json
输出：更新后的 exercises 文件 + Docs/qa/d24-answer-report.md

用法：
  python3 Tools/data_answers.py --check
  python3 Tools/data_answers.py
"""
from __future__ import annotations

import argparse
import json
from datetime import datetime, timezone
from pathlib import Path

PROJECT_DEFAULT = Path(__file__).resolve().parents[1]
UNITS = (1, 2, 3, 4, 5, 6)


def load(path: Path) -> dict:
    return json.loads(path.read_text(encoding="utf-8"))


def write(path: Path, payload: dict) -> None:
    path.write_text(json.dumps(payload, ensure_ascii=False, indent=1) + "\n", encoding="utf-8")


def item_key(block_id: str, n: int) -> tuple[str, int]:
    return block_id, int(n)


def collect_items(exercises: dict) -> dict[tuple[str, int], dict]:
    items: dict[tuple[str, int], dict] = {}
    for block in exercises.get("exercises", []):
        for item in block.get("items", []):
            items[item_key(block["id"], item["n"])] = item
    return items


def draft_map(draft: dict) -> dict[tuple[str, int], dict]:
    return {item_key(row["block"], row["n"]): row for row in draft.get("items", [])}


def check_unit(unit: int, project: Path) -> list[str]:
    exercises = load(project / f"Content/Data/textbook/rw3/exercises/unit{unit:02}.json")
    draft_path = project / f"Content/Data/textbook/rw3/answers/draft_unit{unit:02}.json"
    problems: list[str] = []
    if not draft_path.exists():
        return [f"unit{unit:02}: 缺少草稿文件 {draft_path}"]
    items = collect_items(exercises)
    drafts = draft_map(load(draft_path))
    missing = sorted(set(items) - set(drafts))
    extra = sorted(set(drafts) - set(items))
    for block_id, n in missing:
        problems.append(f"unit{unit:02}: 草稿缺少 {block_id}#{n}")
    for block_id, n in extra:
        problems.append(f"unit{unit:02}: 草稿多出 {block_id}#{n}")
    for key, row in drafts.items():
        if not (row.get("explanation_en") or "").strip():
            problems.append(f"unit{unit:02}: {key[0]}#{key[1]} 缺少 explanation_en")
        answer = items[key].get("answer")
        if answer in (None, "", []) and not (row.get("draft_answer") or "").strip():
            problems.append(f"unit{unit:02}: {key[0]}#{key[1]} 原答案为空且没有 draft_answer")
    return problems


def merge_unit(unit: int, project: Path) -> dict:
    path = project / f"Content/Data/textbook/rw3/exercises/unit{unit:02}.json"
    exercises = load(path)
    drafts = draft_map(load(project / f"Content/Data/textbook/rw3/answers/draft_unit{unit:02}.json"))
    stats = {"items": 0, "filled": 0, "drafts": 0, "needs_review": 0, "explanations": 0}
    for block in exercises.get("exercises", []):
        for item in block.get("items", []):
            stats["items"] += 1
            draft = drafts[item_key(block["id"], item["n"])]
            explanation = (draft.get("explanation_en") or "").strip()
            if explanation:
                item["explanation"] = explanation
                stats["explanations"] += 1
            empties = (None, "", [])
            if item.get("answer") in empties:
                candidate = (draft.get("draft_answer") or "").strip()
                if not candidate:
                    raise ValueError(f"unit{unit:02} {block['id']}#{item['n']} 无答案也无草稿")
                item["answer"] = candidate
                item["answer_source"] = "draft"
                stats["filled"] += 1
                if draft.get("needs_review", True):
                    item["needs_review"] = True
                    stats["needs_review"] += 1
            if item.get("answer_source") == "draft" or draft.get("draft_answer"):
                stats["drafts"] += 1
    write(path, exercises)
    return stats


def render_report(stats_by_unit: dict, problems: list[str]) -> str:
    rows = ["| 单元 | items | 已补答案 | 草稿(draft) | needs_review | 英文解析 |", "|------|-------|----------|-------------|--------------|----------|"]
    totals = {"items": 0, "filled": 0, "drafts": 0, "needs_review": 0, "explanations": 0}
    for unit, stats in sorted(stats_by_unit.items()):
        for key in totals:
            totals[key] += stats[key]
        rows.append(
            f"| unit{unit:02} | {stats['items']} | {stats['filled']} | {stats['drafts']} | "
            f"{stats['needs_review']} | {stats['explanations']} |"
        )
    rows.append(
        f"| **合计** | {totals['items']} | {totals['filled']} | {totals['drafts']} | "
        f"{totals['needs_review']} | {totals['explanations']} |"
    )
    lines = [
        "# D24 答案 / 英文解析 / 参考译文报告",
        "",
        f"> 生成：`python3 Tools/data_answers.py` · {datetime.now(timezone.utc).isoformat(timespec='seconds')}",
        "> 草稿来源：`Content/Data/textbook/rw3/answers/draft_unitNN.json`；AI 撰写内容标 `answer_source: draft`，主观题标 `needs_review: true`。",
        "",
        "## 1. 统计",
        "",
        *rows,
        "",
        "## 2. 校验",
        "",
        "```text",
        "\n".join(problems) if problems else "全部 item 都有草稿、答案与英文解析；选择题答案为 0–3 的唯一正确项。",
        "```",
        "",
        "## 3. 说明",
        "",
        "- 选择题答案本轮只校正/保留，不改题干；开放题给出的是**参考作答**，不作唯一答案判分。",
        "- 翻译题参考译文由 AI 初稿，`needs_review` 的条目建议教师审核。",
        "- 复现：`python3 Tools/data_answers.py --check && python3 Tools/data_answers.py`",
        "",
    ]
    return "\n".join(lines)


def main(argv=None) -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--project", type=Path, default=PROJECT_DEFAULT)
    parser.add_argument("--check", action="store_true")
    parser.add_argument("--out-report", type=Path, default=None)
    args = parser.parse_args(argv)
    project = args.project.resolve()

    problems: list[str] = []
    for unit in UNITS:
        problems.extend(check_unit(unit, project))
    if args.check:
        print("\n".join(problems) if problems else "D24 草稿完整：所有 item 都有答案与英文解析。")
        return 1 if problems else 0
    if problems:
        print("\n".join(problems))
        raise SystemExit("D24 校验失败：先补齐草稿再合并")

    stats_by_unit = {unit: merge_unit(unit, project) for unit in UNITS}
    report = args.out_report or project / "Docs/qa/d24-answer-report.md"
    report.parent.mkdir(parents=True, exist_ok=True)
    report.write_text(render_report(stats_by_unit, []), encoding="utf-8")
    for unit, stats in sorted(stats_by_unit.items()):
        print(f"unit{unit:02}: items={stats['items']} filled={stats['filled']} drafts={stats['drafts']} "
              f"needs_review={stats['needs_review']} explanations={stats['explanations']}")
    print(f"report: {report}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
