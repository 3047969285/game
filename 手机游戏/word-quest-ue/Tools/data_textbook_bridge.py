"""把教材提取数据转成项目学习内容格式（供后续按教材改造游戏内容）。

输入：`Content/Data/textbook/rw3/textbook.json`（OCR + 人工纠错后的结构化数据）
       `Content/Data/content/rw3_units.json`（现有 6 单元元数据：title_zh/theme）
输出：
- `Content/Data/content/textbook_units.json` —— 教材版单元数据（文章/单词/题目/翻译，答案留空）
- `Content/Data/content/textbook_vocabulary.csv` —— 可导入 DT_Vocabulary 的词表（字段同 D2）

注意：`needsProofreading=true` 表示正文已做 37 处高置信 OCR 纠错，但仍有 OCR 误读；
自动评分题目需要人工补答案（教材未提供答案页），听力/微检查/写作提纲需另写。
"""
from __future__ import annotations

import csv
import json
from pathlib import Path

PROJECT = Path(__file__).resolve().parents[1]
BOOK = PROJECT / "Content" / "Data" / "textbook" / "rw3" / "textbook.json"
OLD = PROJECT / "Content" / "Data" / "content" / "rw3_units.json"
OUT = PROJECT / "Content" / "Data" / "content"


def main() -> int:
    book = json.load(open(BOOK, encoding="utf-8"))
    old = {u["unit_id"]: u for u in json.load(open(OLD, encoding="utf-8"))["units"]}

    units, vocab_rows = [], []
    for u in book["units"]:
        meta = old.get(u["unit_id"], {})
        a, b, c = u["sections"]["A"], u["sections"]["B"], u["sections"]["C"]
        words = [dict(w, section="A") for w in a["words"]] + [dict(w, section="B") for w in b["words"]]
        for w in words:
            w["unit_id"] = u["unit_id"]
            vocab_rows.append({"Word": w["word"], "Phonetic": w["phonetic"], "Pos": w["pos"],
                               "Meaning": w["meaning_cn"], "Example": "",
                               "UnitId": u["unit_id"], "UnitTitle": u["title"],
                               "Meanings": w["meaning_cn"]})
        questions = []
        for sec, blocks in (("A", a["exercises"]), ("B", b["exercises"]), ("C", c["exercises"])):
            for blk in blocks:
                for q in blk["questions"]:
                    questions.append({"section": sec, "kind": blk["heading"], "question": q["question"],
                                      "options": q["options"], "answer": None, "explanation": None,
                                      "source_page": blk["page"], "needs_review": True})
        units.append({
            "unit_id": u["unit_id"], "unit_number": u["unit_number"],
            "title": u["title"], "title_zh": meta.get("title_zh", ""), "theme": meta.get("theme", ""),
            "source": "textbook-rw3-ocr", "needsProofreading": True,
            "sections": {
                "section_a": {"title": "Text A", "passage": "\n\n".join(a["article"]["paragraphs"])},
                "section_b": {"title": "Text B", "passage": "\n\n".join(b["article"]["paragraphs"])},
                "section_c": {"title": "Stories of China", "passage": c["story"]["raw"]},
            },
            "vocabulary": words,
            "questions": questions,
            "translation_prompts": ["".join(c["translation"])] if c["translation"] else [],
            "writing_prompts": [blk for sec in ("A", "B") for blk in u["sections"][sec]["exercises"]
                                if "writing" in blk["heading"].lower() or "structure" in blk["heading"].lower()],
            "counts": {"words": len(words), "questions": len(questions),
                       "translation_lines": len(c["translation"]),
                       "translation_prompts": (1 if c["translation"] else 0)},
        })

    OUT.mkdir(parents=True, exist_ok=True)
    out = {"source": "textbook-rw3-ocr", "generatedBy": "Tools/data_textbook_bridge.py",
           "needsProofreading": True,
           "note": "正文/单词来自用户本地教材 OCR（已做高置信纠错）；题目无答案，听力/微检查/写作提纲需另写。",
           "units": units}
    (OUT / "textbook_units.json").write_text(json.dumps(out, ensure_ascii=False, indent=1), encoding="utf-8")
    with (OUT / "textbook_vocabulary.csv").open("w", encoding="utf-8-sig", newline="") as fh:
        w = csv.DictWriter(fh, fieldnames=["Word", "Phonetic", "Pos", "Meaning", "Example", "UnitId", "UnitTitle", "Meanings"])
        w.writeheader(); w.writerows(vocab_rows)
    print(json.dumps({"out": str(OUT / "textbook_units.json"), "units": len(units),
                      "words": len(vocab_rows),
                      "questions": sum(u["counts"]["questions"] for u in units)}, ensure_ascii=False))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
