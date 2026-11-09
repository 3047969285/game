#!/usr/bin/env python3
"""离线校验 D29/D30/D32 的 NPC 数据（不调用 API、不读密钥）。

用法：python3 Tools/qa/check_npc_data.py
退出码 0 = 全部通过。输出 Docs/qa/npc-data-check.md
"""
from __future__ import annotations

import csv
import json
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
SCENES = ROOT / "Content/Data/memory/textbook_scenes/unit01.json"
PERSONAS = ROOT / "Content/Data/npc/personas"
INPUTS = ROOT / "Content/Data/npc/eval/offline_day_inputs.json"
TEMPLATE = ROOT / "Content/Data/npc/prompts/system_template.md"
INTERACTIONS = ROOT / "Content/Data/npc/interactions_unit01.json"
WORDS = ROOT / "Content/Data/textbook/rw3/words.csv"
OUT = ROOT / "Docs/qa/npc-data-check.md"
CHARACTERS = {"me2026", "lin", "mei", "an", "rui", "organizer", "old2090"}
REQUIRED = ("role", "display_name", "age", "occupation", "appearance", "personality", "voice", "scene_ids",
            "backstory", "knowledge", "teaching", "boundaries", "fallback_lines")


def main():
    problems = []
    scenes = json.loads(SCENES.read_text(encoding="utf-8"))
    roles = set()
    for article in scenes["articles"]:
        for scene in article["scenes"]:
            for person in scene.get("people", []):
                roles.add(person["role"])
    declared = {row["word"].lower().strip() for row in csv.DictReader(WORDS.open(encoding="utf-8-sig")) if row.get("word")}
    personas = {path.stem: json.loads(path.read_text(encoding="utf-8")) for path in PERSONAS.glob("*.json")}
    for role in sorted(roles):
        if role not in personas:
            problems.append("missing persona: " + role)
            continue
        persona = personas[role]
        for field in REQUIRED:
            if field not in persona:
                problems.append("%s missing field %s" % (role, field))
        if persona.get("role") != role:
            problems.append("%s role mismatch" % role)
        if persona.get("appearance", {}).get("character") not in CHARACTERS:
            problems.append("%s invalid appearance.character" % role)
        words = persona.get("teaching", {}).get("target_words", [])
        if not 5 <= len(words) <= 10:
            problems.append("%s target_words %d (need 5-10)" % (role, len(words)))
        unknown = [w for w in words if w.lower() not in declared]
        if unknown:
            problems.append("%s target words not in words.csv: %s" % (role, unknown))
        if len(persona.get("fallback_lines", [])) != 5:
            problems.append("%s fallback_lines != 5" % role)
    extra = set(personas) - roles
    if extra:
        problems.append("personas without scene role: %s" % sorted(extra))
    inputs = json.loads(INPUTS.read_text(encoding="utf-8"))
    for role in ("paul", "maria", "jason", "jack"):
        if len(inputs.get(role, [])) != 10:
            problems.append("eval inputs %s != 10" % role)
    template = TEMPLATE.read_text(encoding="utf-8")
    slots = ["display_name", "occupation", "personality_traits", "speaking_style", "knowledge_known",
             "scene_title", "scene_activity", "level", "target_words", "boundaries_avoid"]
    missing_slots = [slot for slot in slots if "{{%s}}" % slot not in template]
    if missing_slots:
        problems.append("template missing slots: %s" % missing_slots)
    interactions = json.loads(INTERACTIONS.read_text(encoding="utf-8"))
    total = sum(len(scene["props"]) for scene in interactions["scenes"])
    interactive = sum(1 for scene in interactions["scenes"] for prop in scene["props"] if prop["interactive"])
    if not interactions.get("audio_requirements", {}).get("footsteps") or not interactions["audio_requirements"].get("collisions"):
        problems.append("interactions missing audio requirements")
    lines = ["# NPC 数据离线校验", "", "| 项 | 值 |", "|---|---|",
             "| 角色 | %d |" % len(roles), "| 人设文件 | %d |" % len(personas),
             "| 评测输入 | %s |" % ", ".join("%s=%d" % (k, len(v)) for k, v in inputs.items()),
             "| 交互物件 | %d（可交互 %d） |" % (total, interactive),
             "| 结果 | %s |" % ("PASS" if not problems else "FAIL (%d)" % len(problems)), ""]
    if problems:
        lines += ["## 问题", ""] + ["- " + problem for problem in problems]
    OUT.write_text("\n".join(lines) + "\n", encoding="utf-8")
    print("NPC_DATA_CHECK", "PASS" if not problems else "FAIL", "problems", len(problems))
    for problem in problems[:20]:
        print(" -", problem)
    return 0 if not problems else 1


if __name__ == "__main__":
    raise SystemExit(main())
