#!/usr/bin/env python3
"""D23 内容覆盖审计：段落 / 生词 / 题目三项覆盖率，输出报告与生词挂载建议。

只读数据，不改场景；引用错误由人工按报告修改（本工具在报告里留出修改记录区）。
用法：
  python3 Tools/qa/content_coverage.py
  python3 Tools/qa/content_coverage.py --json
  python3 Tools/qa/content_coverage.py --project <工程根> --out-md <md> --out-proposals <json>
"""
from __future__ import annotations

import argparse
import csv
import json
import re
import sys
from datetime import datetime, timezone
from pathlib import Path

PROJECT_DEFAULT = Path(__file__).resolve().parents[2]
UNITS = (1, 2, 3, 4, 5, 6)

REF_RE = re.compile(r"^(?P<block>[A-Za-z0-9_]+)(?:#(?P<sel>\d+(?:-\d+)?))?$")

# 词语法线索 -> 场景 kit（用于生词挂载建议；只做候选，最终由 Claude 审核）
KIT_HINTS = [
    (r"\bphone|smartphone|cell ?phone|mobile", "phone"),
    (r"\bbook|novel|page|notebook|diary|magazine|newspaper", "book"),
    (r"\bchair|seat|stool|bench", "chair"),
    (r"\btable|desk|counter", "table"),
    (r"\bwindow|curtain", "window_wall"),
    (r"\blamp|light|bulb|lantern", "floor_lamp"),
    (r"\bclock|watch|calendar", "clock"),
    (r"\bbottle|flask|jar|vase", "bottle"),
    (r"\bcup|mug|glass|teacup", "mug"),
    (r"\bbag|backpack|suitcase|luggage", "backpack"),
    (r"\bcomputer|laptop|pc\b", "laptop"),
    (r"\bscreen|monitor|display", "monitor"),
    (r"\bpaper|letter|document|sheet|note", "paper"),
    (r"\bpen\b|pencil|marker", "pen"),
    (r"\bplant|flower|tree|leaf|seed", "plant"),
    (r"\bdoor|gate|entrance", "door"),
    (r"\bmirror|reflection", "mirror"),
    (r"\bbasket|box|container", "basket"),
    (r"\bblanket|pillow|quilt|bed", "blanket"),
    (r"\bshelf|bookshelf|rack", "bookshelf"),
    (r"\brug|carpet|mat", "rug"),
    (r"\bcamera|photo|lens", "camera"),
    (r"\bradio|speaker|audio", "radio"),
    (r"\btv\b|television|screen", "tv"),
    (r"\bcupboard|cabinet|drawer|fridge|oven|kettle", "cupboard"),
    (r"\bbowl|plate|fork|knife|spoon|dish", "bowl"),
    (r"\bshirt|dress|coat|jacket|uniform|clothes", "shirt"),
    (r"\bshoe|boot|sneaker", "shoe"),
    (r"\bhat|cap|helmet", "hat"),
    (r"\bumbrella", "umbrella"),
    (r"\bticket|passport|map|sign", "ticket"),
    (r"\btrain|bus|car|bike|plane|ship|boat", "train"),
    (r"\bstone|rock|brick|wood|sand|water|rain|snow", "stone"),
    (r"\bspace|rocket|satellite|telescope|moon|star", "rocket"),
]

KIT_SIZE_HINT = {
    "phone": [0.08, 0.16, 0.01], "book": [0.16, 0.24, 0.03], "chair": [0.9, 0.9, 1.0],
    "table": [1.1, 0.6, 0.42], "window_wall": [1.2, 0.2, 1.2], "floor_lamp": [0.35, 0.35, 1.6],
    "clock": [0.3, 0.03, 0.3], "bottle": [0.08, 0.08, 0.28], "mug": [0.09, 0.09, 0.1],
    "backpack": [0.3, 0.2, 0.45], "laptop": [0.35, 0.25, 0.02], "monitor": [0.5, 0.05, 0.32],
    "paper": [0.21, 0.3, 0.005], "pen": [0.15, 0.01, 0.01], "plant": [0.4, 0.4, 0.6],
    "door": [0.9, 0.1, 2.1], "mirror": [0.6, 0.03, 0.8], "basket": [0.35, 0.25, 0.15],
    "blanket": [1.2, 1.6, 0.03], "bookshelf": [1.2, 0.35, 2.0], "rug": [2.6, 1.8, 0.01],
    "camera": [0.12, 0.08, 0.08], "radio": [0.3, 0.12, 0.18], "tv": [0.8, 0.06, 0.5],
    "cupboard": [1.0, 0.5, 1.8], "bowl": [0.18, 0.18, 0.08], "shirt": [0.4, 0.03, 0.6],
    "shoe": [0.26, 0.1, 0.1], "hat": [0.22, 0.22, 0.12], "umbrella": [0.9, 0.9, 0.1],
    "ticket": [0.1, 0.16, 0.002], "train": [3.0, 0.3, 1.2], "stone": [0.3, 0.3, 0.15],
    "rocket": [1.2, 1.2, 3.0],
}


# ----------------------------------------------------------------------------- 数据读取
def read_json(path: Path) -> dict:
    return json.loads(path.read_text(encoding="utf-8"))


def load_words(project: Path) -> dict[str, list[dict]]:
    """读取 words.csv，按 unit（unit01…）分组。"""
    path = project / "Content/Data/textbook/rw3/words.csv"
    units: dict[str, list[dict]] = {f"unit{n:02d}": [] for n in UNITS}
    with path.open(encoding="utf-8-sig", newline="") as fh:
        for row in csv.DictReader(fh):
            unit = (row.get("unit") or "").strip().lower()
            word = (row.get("word") or "").strip()
            if not unit or not word:
                continue
            units.setdefault(unit, []).append(row)
    return units


def load_articles(project: Path, unit: str) -> dict:
    return read_json(project / f"Content/Data/textbook/rw3/articles/{unit}.json")


def load_exercises(project: Path, unit: str) -> dict:
    return read_json(project / f"Content/Data/textbook/rw3/exercises/{unit}.json")


def load_scenes(project: Path, unit: str) -> dict:
    return read_json(project / f"Content/Data/memory/textbook_scenes/{unit}.json")


def load_kits(project: Path) -> list[str]:
    path = project / "Content/Data/memory/kit_assets.json"
    if not path.exists():
        return []
    data = read_json(path)
    return sorted((data.get("kits") or {}).keys())


# ----------------------------------------------------------------------------- 引用解析
def parse_ref(ref: str) -> tuple[str, set[int] | None] | None:
    """'u01_a_understanding#1-3' -> ('u01_a_understanding', {1,2,3})；无 # 返回 (id, None)。"""
    if not isinstance(ref, str):
        return None
    match = REF_RE.match(ref.strip())
    if not match:
        return None
    block = match.group("block")
    sel = match.group("sel")
    if sel is None:
        return block, None
    if "-" in sel:
        start, end = sel.split("-", 1)
        try:
            first, last = int(start), int(end)
        except ValueError:
            return None
        if first > last:
            return None
        return block, set(range(first, last + 1))
    return block, {int(sel)}


def normalize_word(value: str) -> str:
    return re.sub(r"\s+", " ", (value or "").strip().lower())


# ----------------------------------------------------------------------------- 覆盖计算
def _section_scenes(scenes: dict) -> dict[str, list[dict]]:
    out: dict[str, list[dict]] = {}
    for article in scenes.get("articles", []):
        out.setdefault(article.get("section", ""), []).extend(article.get("scenes", []))
    return out


def coverage(project: Path = PROJECT_DEFAULT) -> dict:
    words_by_unit = load_words(project)
    kits = load_kits(project)
    units = []

    for n in UNITS:
        unit = f"unit{n:02d}"
        articles = load_articles(project, unit)
        exercises = load_exercises(project, unit)
        scenes = load_scenes(project, unit)

        blocks = {block["id"]: block for block in exercises.get("exercises", [])}
        block_items = {bid: {int(item["n"]) for item in block.get("items", [])} for bid, block in blocks.items()}
        section_scenes = _section_scenes(scenes)

        # 段落
        paragraph_report = {}
        for text in articles.get("texts", []):
            section = text.get("section", "")
            total = len(text.get("paragraphs", []))
            valid = set(range(1, total + 1))
            referenced: set[int] = set()
            for scene in section_scenes.get(section, []):
                for value in scene.get("paragraphs", []):
                    if isinstance(value, int):
                        referenced.add(value)
                    else:
                        try:
                            referenced.add(int(value))
                        except (TypeError, ValueError):
                            referenced.add(-1)
            paragraph_report[section] = {
                "total": total,
                "covered": len(valid & referenced),
                "missing": sorted(valid - referenced),
                "invalid": sorted(referenced - valid),
            }

        # 生词
        unit_words = words_by_unit.get(unit, [])
        declared = {normalize_word(row["word"]) for row in unit_words}
        placed: set[str] = set()
        placed_unknown: set[str] = set()
        text_word_entries = 0
        text_word_bad_form: list[dict] = []
        paragraphs_by_section = {
            text.get("section", ""): text.get("paragraphs", []) for text in articles.get("texts", [])
        }
        for scene in [s for scenes_ in section_scenes.values() for s in scenes_]:
            # 新口径（2026-10-23 Claude D27）：生词优先挂在漂浮句子的 text_words 上
            for entry in scene.get("text_words", []) or []:
                word = normalize_word(entry.get("word") or "")
                form = (entry.get("form") or "").strip()
                if not word:
                    continue
                placed.add(word)
                text_word_entries += 1
                if word not in declared:
                    placed_unknown.add(word)
                paragraph = entry.get("paragraph")
                section = next((key for key, scenes_list in section_scenes.items() if scene in scenes_list), "")
                paragraphs = paragraphs_by_section.get(section, [])
                if isinstance(paragraph, int) and 1 <= paragraph <= len(paragraphs) and form:
                    if form.lower() not in paragraphs[paragraph - 1].lower():
                        text_word_bad_form.append({"scene": scene.get("id"), "word": word, "form": form, "paragraph": paragraph})
            # 具体名词仍可挂在物件上
            for prop in scene.get("props", []) or []:
                word = normalize_word(prop.get("word") or "")
                if not word:
                    continue
                placed.add(word)
                if word not in declared:
                    placed_unknown.add(word)
        missing_words = sorted(declared - placed)

        # 题目
        covered_items: set[tuple[str, int]] = set()
        invalid_refs: list[dict] = []
        for section, scene_list in section_scenes.items():
            for scene in scene_list:
                for ref in scene.get("exercises", []) or []:
                    parsed = parse_ref(ref)
                    if parsed is None:
                        invalid_refs.append({"scene": scene.get("id"), "section": section, "ref": ref, "reason": "无法解析的引用"})
                        continue
                    block_id, selection = parsed
                    if block_id not in blocks:
                        invalid_refs.append({"scene": scene.get("id"), "section": section, "ref": ref, "reason": "exercise id 不存在"})
                        continue
                    items = block_items[block_id]
                    if selection is None:
                        covered_items.update((block_id, item_n) for item_n in items)
                        continue
                    outside = selection - items
                    if outside:
                        invalid_refs.append({
                            "scene": scene.get("id"), "section": section, "ref": ref,
                            "reason": f"题号越界: {sorted(outside)}（该 block 题号 {sorted(items)}）",
                        })
                    covered_items.update((block_id, item_n) for item_n in selection & items)

        all_items = {(block_id, item_n) for block_id, items in block_items.items() for item_n in items}
        missing_items = sorted(all_items - covered_items)

        units.append({
            "unit": unit,
            "paragraphs": paragraph_report,
            "words": {
                "total": len(declared),
                "covered": len(declared & placed),
                "missing": missing_words,
                "placed_unknown": sorted(placed_unknown),
                "text_words": text_word_entries,
                "bad_text_word_forms": text_word_bad_form,
            },
            "exercises": {
                "blocks": len(blocks),
                "total": len(all_items),
                "covered": len(covered_items),
                "missing": [{"block": b, "n": n_} for b, n_ in missing_items],
                "invalid_refs": invalid_refs,
            },
            "_raw": {"articles": articles, "scenes": scenes, "words": unit_words, "blocks": blocks},
        })

    totals = {
        "paragraphs": {"total": 0, "covered": 0},
        "words": {"total": 0, "covered": 0},
        "exercises": {"total": 0, "covered": 0},
    }
    for unit in units:
        for section in unit["paragraphs"].values():
            totals["paragraphs"]["total"] += section["total"]
            totals["paragraphs"]["covered"] += section["covered"]
        totals["words"]["total"] += unit["words"]["total"]
        totals["words"]["covered"] += unit["words"]["covered"]
        totals["exercises"]["total"] += unit["exercises"]["total"]
        totals["exercises"]["covered"] += unit["exercises"]["covered"]
    return {"generated_at": datetime.now(timezone.utc).isoformat(timespec="seconds"), "kits": kits, "units": units, "totals": totals}


# ----------------------------------------------------------------------------- 生词挂载建议
def _sentence_hits(articles: dict, word: str, limit: int = 3) -> list[dict]:
    """在课文中找包含该词（含常见词形变化）的句子。"""
    forms = {word, word + "s", word + "es", word + "ed", word + "d", word + "ing"}
    if word.endswith("e"):
        forms.add(word[:-1] + "ing")
        forms.add(word[:-1] + "ed")
    if word.endswith("y"):
        forms.add(word[:-1] + "ies")
        forms.add(word[:-1] + "ied")
    pattern = re.compile(r"(?<![A-Za-z])(" + "|".join(sorted((re.escape(f) for f in forms), key=len, reverse=True)) + r")(?![A-Za-z])", re.I)
    hits: list[dict] = []
    for text in articles.get("texts", []):
        for index, paragraph in enumerate(text.get("paragraphs", []), start=1):
            for sentence in re.split(r"(?<=[.!?])\s+", paragraph):
                if pattern.search(sentence):
                    hits.append({"section": text.get("section"), "paragraph": index, "sentence": sentence.strip()[:300]})
                    if len(hits) >= limit:
                        return hits
    return hits


def _kit_for_word(word: str, meaning: str, kits: list[str]) -> tuple[str | None, str]:
    haystack = f"{word} {meaning}".lower()
    for pattern, kit in KIT_HINTS:
        if re.search(pattern, haystack) and (not kits or kit in kits):
            return kit, f"关键词匹配 {pattern}"
    if kits:
        return None, "无关键词匹配"
    return None, "无 kit 清单"


def propose_placements(project: Path, summary: dict) -> dict:
    kits = summary.get("kits") or []
    proposals: list[dict] = []
    for unit_data in summary["units"]:
        raw = unit_data["_raw"]
        articles = raw["articles"]
        section_scenes = _section_scenes(raw["scenes"])
        word_rows = {normalize_word(row["word"]): row for row in raw["words"]}
        for word in unit_data["words"]["missing"]:
            row = word_rows.get(word, {})
            hits = _sentence_hits(articles, word)
            scene = None
            if hits:
                for candidate in section_scenes.get(hits[0]["section"], []):
                    if hits[0]["paragraph"] in (candidate.get("paragraphs") or []):
                        scene = candidate
                        break
            kit, reason = _kit_for_word(word, row.get("meaning_cn") or "", kits)
            attach = None
            if scene is not None:
                for prop in scene.get("props", []) or []:
                    if not prop.get("word") and (kit is None or prop.get("kit") == kit):
                        attach = {"kit": prop.get("kit"), "pos": prop.get("pos"), "yaw": prop.get("yaw")}
                        kit = prop.get("kit")
                        break
            if kit is None:
                kit = "book" if row.get("pos", "").startswith("n") else "paper"
            proposals.append({
                "unit": unit_data["unit"],
                "word": row.get("word") or word,
                "section": row.get("section"),
                "pos": row.get("pos"),
                "meaning_cn": row.get("meaning_cn"),
                "occurrences": hits,
                "suggestion": {
                    "scene": scene.get("id") if scene else None,
                    "kit": kit,
                    "attach_to_existing_prop": attach,
                    "new_prop_size": KIT_SIZE_HINT.get(kit, [0.2, 0.2, 0.05]),
                    "reason": reason,
                    "confidence": "high" if (scene and hits) else ("medium" if hits else "low"),
                },
            })
    return {
        "generated_at": summary.get("generated_at"),
        "total_missing": len(proposals),
        "instructions": "Claude 审核后把采信项合入 textbook_scenes/*.json 的 props[].word；新增物件需遵守 kit_assets.json 的 kit 与 scale。",
        "proposals": proposals,
    }


# ----------------------------------------------------------------------------- 报告
def _pct(covered: int, total: int) -> str:
    if total == 0:
        return "–"
    return f"{covered / total * 100:.1f}%"


def render_markdown(summary: dict, proposals: dict, fix_log: str = "") -> str:
    lines = [
        "# 内容覆盖审计（D23）",
        "",
        f"> 生成：`python3 Tools/qa/content_coverage.py` · {summary['generated_at']}",
        "> 数据：articles / exercises / textbook_scenes / words.csv（真实数据，只读统计）",
        "",
        "## 1. 总览",
        "",
        "| 项 | 覆盖 | 总数 | 覆盖率 |",
        "|----|------|------|--------|",
    ]
    for key, label in (("paragraphs", "课文段落"), ("words", "生词"), ("exercises", "题目")):
        item = summary["totals"][key]
        lines.append(f"| {label} | {item['covered']} | {item['total']} | {_pct(item['covered'], item['total'])} |")
    lines += ["", "## 2. 分单元", "", "| 单元 | 段落 | 生词 | 题目 | 无效引用 |", "|------|------|------|------|----------|"]
    for unit in summary["units"]:
        p_total = sum(s["total"] for s in unit["paragraphs"].values())
        p_cov = sum(s["covered"] for s in unit["paragraphs"].values())
        w = unit["words"]
        e = unit["exercises"]
        invalid = len(e["invalid_refs"])
        lines.append(
            f"| {unit['unit']} | {p_cov}/{p_total} ({_pct(p_cov, p_total)}) | "
            f"{w['covered']}/{w['total']} ({_pct(w['covered'], w['total'])}) | "
            f"{e['covered']}/{e['total']} ({_pct(e['covered'], e['total'])}) | {invalid} |"
        )
    lines += ["", "## 3. 缺口明细", ""]
    for unit in summary["units"]:
        gaps = []
        for section, data in unit["paragraphs"].items():
            if data["missing"]:
                gaps.append(f"- {section} 未引用段落：{data['missing']}")
            if data["invalid"]:
                gaps.append(f"- {section} 引用越界段号：{data['invalid']}")
        if unit["words"]["missing"]:
            sample = "、".join(unit["words"]["missing"][:12])
            gaps.append(f"- 未挂载生词 {len(unit['words']['missing'])} 条：{sample}{' …' if len(unit['words']['missing']) > 12 else ''}")
        for bad in unit["words"].get("bad_text_word_forms", [])[:5]:
            gaps.append(f"- text_words 形式不在原文：`{bad['scene']}` {bad['word']}（form={bad['form']}）")
        if unit["exercises"]["missing"]:
            sample = "、".join(f"{m['block']}#{m['n']}" for m in unit["exercises"]["missing"][:10])
            gaps.append(f"- 未挂题 {len(unit['exercises']['missing'])} 道：{sample}{' …' if len(unit['exercises']['missing']) > 10 else ''}")
        if unit["exercises"]["invalid_refs"]:
            for bad in unit["exercises"]["invalid_refs"]:
                gaps.append(f"- `{bad['scene']}` 引用 `{bad['ref']}`：{bad['reason']}")
        if gaps:
            lines.append(f"### {unit['unit']}")
            lines += gaps + [""]
        else:
            lines.append(f"### {unit['unit']}（100% 覆盖）")
            lines += [""]
    lines += [
        "## 4. 生词口径（2026-10-23 起）",
        "",
        "- 主口径：场景 JSON 的 `text_words[]`（漂浮句子里的词形，Claude 的 `Tools/scene_text_words.py` 生成）；`props[].word` 仍是具体名词的物件挂载。",
        f"- 本次统计：`text_words` 条目 {sum(u['words'].get('text_words', 0) for u in summary['units'])} 条，未挂载 {proposals['total_missing']} 条（旧 word-placement-proposals 仅作历史参考，不再采用）。",
        "- `text_words[].form` 必须出现在对应段落原文中，否则计入下方明细。",
        "",
        "## 5. 修改记录（只允许改引用）",
        "",
        fix_log.strip() or "（本轮尚未修改 scene 引用；发现后在此登记：文件 / set / 旧引用 → 新引用 / 原因）",
        "",
        "## 6. 复现",
        "",
        "```bash",
        "python3 Tools/qa/content_coverage.py",
        "~/.local/share/hunyuan3d/.venv/bin/python -m pytest Tools/qa/tests/test_content_coverage.py -q",
        "```",
        "",
    ]
    return "\n".join(lines)


def main(argv=None) -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--project", type=Path, default=PROJECT_DEFAULT)
    parser.add_argument("--out-md", type=Path, default=None)
    parser.add_argument("--out-proposals", type=Path, default=None)
    parser.add_argument("--fix-log", type=Path, default=None)
    parser.add_argument("--json", action="store_true")
    args = parser.parse_args(argv)

    project = args.project.resolve()
    out_md = args.out_md or project / "Docs/qa/content-coverage.md"
    out_proposals = args.out_proposals or project / "Docs/qa/word-placement-proposals.json"
    fix_log = args.fix_log.read_text(encoding="utf-8") if args.fix_log and args.fix_log.exists() else ""

    summary = coverage(project)
    proposals = propose_placements(project, summary)
    public = {"generated_at": summary["generated_at"], "units": [], "totals": summary["totals"]}
    for unit in summary["units"]:
        public["units"].append({key: value for key, value in unit.items() if not key.startswith("_")})

    out_md.parent.mkdir(parents=True, exist_ok=True)
    out_md.write_text(render_markdown(summary, proposals, fix_log), encoding="utf-8")
    out_proposals.parent.mkdir(parents=True, exist_ok=True)
    out_proposals.write_text(json.dumps(proposals, ensure_ascii=False, indent=1), encoding="utf-8")
    if args.json:
        json.dump(public, sys.stdout, ensure_ascii=False, indent=1)
        print()
    else:
        totals = summary["totals"]
        for key in ("paragraphs", "words", "exercises"):
            item = totals[key]
            print(f"{key}: {item['covered']}/{item['total']} ({_pct(item['covered'], item['total'])})")
        print(f"report: {out_md}")
        print(f"proposals: {out_proposals} ({proposals['total_missing']} words)")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
