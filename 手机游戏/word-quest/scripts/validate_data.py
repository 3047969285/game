#!/usr/bin/env python3
"""校验课程之间的引用和关键数据约束，不依赖第三方包。"""
import json
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1] / "data"
COURSES = ("cet4", "cet6", "college_english_rw3")


def load(path):
    return json.loads(path.read_text(encoding="utf-8"))


def validate_data(root: Path) -> list[str]:
    errors = []

    def unique_ids(rows, label):
        ids = [row["id"] for row in rows]
        if len(ids) != len(set(ids)):
            errors.append(f"{label}: 重复 ID")
        return set(ids)

    def check_questions(value, label):
        if isinstance(value, dict):
            if "options" in value and "answer" in value:
                answer = value["answer"]
                if type(answer) is not int or not 0 <= answer < len(value["options"]):
                    errors.append(f"{label}: 答案索引越界")
            for child in value.values():
                check_questions(child, label)
        elif isinstance(value, list):
            for child in value:
                check_questions(child, label)

    for course in COURSES:
        try:
            vocabulary = load(root / "vocabulary" / f"{course}.json")
            words = vocabulary["words"]
            word_ids = unique_ids(words, f"{course}/vocabulary")
            if vocabulary["count"] != len(words):
                errors.append(f"{course}: 词汇计数不一致")
            for word in words:
                if any(not isinstance(word.get(key), str) or not word[key].strip()
                       for key in ("id", "word", "meaning")):
                    errors.append(f"{course}: 词条缺少 ID、单词或释义")

            refs = {"vocab_quiz": word_ids, "rw3_vocab": word_ids}
            if course in ("cet4", "cet6"):
                for kind in ("listening", "reading", "translation"):
                    content = load(root / "content" / course / f"{kind}.json")
                    refs[kind] = unique_ids(content["items"], f"{course}/{kind}")
                    if content["count"] != len(content["items"]):
                        errors.append(f"{course}/{kind}: 题目计数不一致")
                    check_questions(content, f"{course}/{kind}")
            else:
                units = [load(root / "content" / course / f"unit{i:02}.json") for i in range(1, 7)]
                unit_ids = {unit["unit_id"] for unit in units}
                if len(unit_ids) != 6:
                    errors.append(f"{course}: 单元 ID 不唯一")
                for kind in ("rw3_reading", "rw3_listening", "rw3_unit_boss"):
                    refs[kind] = unit_ids
                for unit in units:
                    if set(unit["word_ids"]) - word_ids:
                        errors.append(f"{course}/{unit['unit_id']}: 单元引用不存在的词汇")
                    check_questions(unit, f"{course}/{unit['unit_id']}")

            template = load(root / "templates" / f"{course}.json")
            if template["id"] != course:
                errors.append(f"{course}: 课程 ID 不一致")
            unique_ids(template["zones"], f"{course}/zones")
            levels = [level for zone in template["zones"] for level in zone["levels"]]
            unique_ids(levels, f"{course}/levels")
            for level in levels:
                if set(level.get("word_ids", [])) - word_ids:
                    errors.append(f"{level['id']}: 关卡引用不存在的词汇")
                for reference in level["content_refs"]:
                    kind, separator, key = reference.partition(":")
                    if kind == "mock_exam" and separator and key:
                        continue  # 由游戏运行时组卷，无独立题库文件。
                    if not separator or key not in refs.get(kind, set()):
                        errors.append(f"{level['id']}: 不存在的内容引用 {reference}")
        except (OSError, ValueError, KeyError, TypeError, AttributeError) as error:
            errors.append(f"{course}: 数据格式或文件错误 {error}")
    return errors


def main():
    errors = validate_data(ROOT)
    if errors:
        print("\n".join(errors), file=sys.stderr)
        return 1
    print("三套课程的数据计数、ID、内容引用与答案索引校验通过。")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
