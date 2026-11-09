#!/usr/bin/env python3
"""校验 Web→UE 导出的 Memory scene 数据（不依赖 UE，纯 Python）。

用法：python3 Tools/validate_memory_scenes.py [--json Content/Data/Memory/scenes.json]

检查：18 个 scene、stage 引用、build 引用的部件存在、slots/shots/acts/objects/actors 非空、
sceneId 唯一、bounds/environment 完整。失败返回非 0。
"""
from __future__ import annotations

import argparse
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
REQUIRED_ENV = ("fogColor", "fogDensity", "skyTop", "skyMid", "skyBot", "sunColor",
                "sunDir", "sunIntensity", "hemiSky", "hemiGround", "hemiIntensity",
                "envIntensity", "shadowRadius")
SECTIONS = {"section_a", "section_b", "section_c"}


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--json", default=str(ROOT / "Content" / "Data" / "Memory" / "scenes.json"))
    args = ap.parse_args()
    data = json.loads(Path(args.json).read_text(encoding="utf-8"))
    errors: list[str] = []
    scenes = data.get("scenes", [])
    stages = data.get("stages", {})
    if data.get("schema") != "wordquest.memory.scenes/1":
        errors.append(f"schema 不符: {data.get('schema')}")
    if len(scenes) != 18:
        errors.append(f"scene 数应为 18，实际 {len(scenes)}")
    if len(stages) != 18:
        errors.append(f"stage 数应为 18，实际 {len(stages)}")
    seen = set()
    for sc in scenes:
        sid = sc.get("sceneId", "?")
        if sid in seen:
            errors.append(f"{sid}: sceneId 重复")
        seen.add(sid)
        if sc.get("unitId") is None or sc.get("section") not in SECTIONS:
            errors.append(f"{sid}: unitId/section 非法")
        stage_name = sc.get("stage")
        st = stages.get(stage_name)
        if not st:
            errors.append(f"{sid}: 引用了不存在的 stage {stage_name}")
            continue
        targets = set(st.get("targetNames", []))
        if not targets:
            errors.append(f"{sid}: stage.targetNames 为空")
        for k in ("bounds", "spawn", "slots", "shots", "environment"):
            if not st.get(k):
                errors.append(f"{sid}: stage.{k} 为空")
        for k in REQUIRED_ENV:
            if k not in st.get("environment", {}):
                errors.append(f"{sid}: environment 缺 {k}")
        slots = st.get("slots", {})
        for k in ("table", "hover", "floor"):
            if not slots.get(k):
                errors.append(f"{sid}: slots.{k} 为空")
        if len(st.get("shots", [])) < 3:
            errors.append(f"{sid}: shots 少于 3 个")
        script = sc.get("script", {})
        if not script.get("acts"):
            errors.append(f"{sid}: script.acts 为空")
        if not script.get("beats"):
            errors.append(f"{sid}: script.beats 为空")
        if not script.get("objects"):
            errors.append(f"{sid}: script.objects 为空（词物件）")
        if not script.get("actors"):
            errors.append(f"{sid}: script.actors 为空")
        for b in script.get("beats", []):
            if b.get("kind") in ("narrate", "gap") and b.get("build"):
                for ref in b["build"]:
                    if ref not in targets:
                        errors.append(f"{sid}: beat build 引用未知部件 {ref}")
        for act in script.get("acts", []):
            for ref in act.get("build", []) or []:
                if ref not in targets:
                    errors.append(f"{sid}: act{act.get('index')} build 引用未知部件 {ref}")
            for cue in act.get("cues", []) or []:
                for ref in cue.get("build", []) or []:
                    if ref not in targets:
                        errors.append(f"{sid}: act{act.get('index')} cue build 引用未知部件 {ref}")
            for q in act.get("questions", []) or []:
                if not isinstance(q.get("answer"), int):
                    errors.append(f"{sid}: act{act.get('index')} 题目缺 answer")
            for n in act.get("notes", []) or []:
                if n.get("kind") not in ("translate", "fill", "outline"):
                    errors.append(f"{sid}: 未知 note kind {n.get('kind')}")
        for obj in script.get("objects", []):
            if not obj.get("wordId"):
                errors.append(f"{sid}: word 物件缺 wordId")
        if not script.get("student"):
            errors.append(f"{sid}: script.student 为空")

    report = {
        "ok": not errors,
        "scenes": len(scenes),
        "stages": len(stages),
        "errors": errors[:50],
    }
    out = ROOT / "Content" / "Data" / "Memory" / "validation.json"
    out.write_text(json.dumps(report, ensure_ascii=False, indent=1), encoding="utf-8")
    print(json.dumps(report, ensure_ascii=False, indent=1))
    return 0 if not errors else 1


if __name__ == "__main__":
    raise SystemExit(main())
