#!/usr/bin/env python3
"""Claude · textbook scenes: put every New word into the scene where the text uses it.

Design (round 4, immersive): a new word lives in the floating memory sentence that contains it — gaze reveals
meaning, long press "remembers" it. Concrete nouns may additionally sit on an object (props[].word); that stays.
This script fills scene["text_words"] = [{"word", "form", "paragraph", "sentence"}] in
Content/Data/memory/textbook_scenes/unitNN.json from the full text in Content/Data/textbook/rw3/articles/unitNN.json
and the word list Content/Data/textbook/rw3/words.csv. Words the text never uses (OCR-garbled entries, or words
only in exercises) are listed in Docs/qa/text-words-unmatched.md instead of being guessed onto a scene.

Usage: python3 Tools/scene_text_words.py [--check]     (--check: report only, write nothing)
Idempotent: text_words is recomputed from scratch on every run.
"""
import argparse
import csv
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SCENES = ROOT / "Content/Data/memory/textbook_scenes"
ARTICLES = ROOT / "Content/Data/textbook/rw3/articles"
WORDS = ROOT / "Content/Data/textbook/rw3/words.csv"
REPORT = ROOT / "Docs/qa/text-words-unmatched.md"
SECTION = {"A": "section_a", "B": "section_b", "C": "section_c"}
DERIVED = {"conceive": ["inconceivable"]}   # 教材词表收录 conceive，课文只用派生形式 inconceivable
IRREGULAR = {"be": "is|are|was|were|been|being", "go": "went|gone|goes", "take": "took|taken|takes|taking",
             "give": "gave|given", "make": "made", "bring": "brought", "think": "thought", "seek": "sought",
             "lie": "lay|lain|lying|lies", "lead": "led", "hold": "held", "bear": "bore|borne", "strive": "strove|striven",
             "spring": "sprang|sprung", "undergo": "underwent|undergone", "withdraw": "withdrew|withdrawn",
             "overcome": "overcame", "forsake": "forsook|forsaken", "foresee": "foresaw|foreseen"}


def forms(word):
    """Regex alternatives for common inflections of a single word."""
    w = re.escape(word)
    alts = {w, w + "s", w + "es", w + "ed", w + "d", w + "ing", w + "ly", w + "er", w + "est"}
    if word.endswith("e"):
        alts |= {re.escape(word[:-1]) + "ing", re.escape(word[:-1]) + "ion"}
    if word.endswith("y"):
        alts |= {re.escape(word[:-1]) + s for s in ("ies", "ied", "ily", "iness")}
    if word.endswith("ic"):
        alts |= {w + "ally", w + "al"}
    if re.search(r"[^aeiou][aeiou][bdgklmnprt]$", word):
        alts |= {w + word[-1] + s for s in ("ed", "ing", "er")}
    if word in IRREGULAR:
        alts |= set(IRREGULAR[word].split("|"))
    alts |= set(DERIVED.get(word, []))
    return alts


def pattern(entry):
    """Phrase-aware pattern; '(sth.)', 'sb.', '...' placeholders in phrases match any short gap."""
    text = re.sub(r"\(.*?\)", " ", entry.lower()).replace("’", "'")
    toks = [t for t in re.split(r"\s+", text.strip()) if t]
    if not toks:
        return None
    parts = []
    for t in toks:
        if t in ("sth.", "sb.", "sth", "sb", "...", "…", "one's", "oneself"):
            parts.append(r"(?:\S+\s+){0,4}?")
            continue
        t = t.strip(".,;")
        parts.append("(?:" + "|".join(sorted(forms(t), key=len, reverse=True)) + ")")
    body = r"\s+".join(parts)
    # 允许连字符复合词（nine-masted / self-reflection / near-infinite）与句末标点
    return re.compile(r"(?<![\w'])(" + body + r")(?![\w])", re.I)


def sentences(paragraph):
    return [s for s in re.split(r"(?<=[.!?”\"])\s+(?=[A-Z“\"])", paragraph) if s.strip()]


def run(check=False):
    words = list(csv.DictReader(WORDS.open(encoding="utf-8-sig")))
    unmatched, total, placed = [], 0, 0
    for scene_file in sorted(SCENES.glob("unit0*.json")):
        unit = scene_file.stem
        scenes = json.loads(scene_file.read_text(encoding="utf-8"))
        texts = {t["section"]: t["paragraphs"] for t in json.loads((ARTICLES / f"{unit}.json").read_text(encoding="utf-8"))["texts"]}
        owner = {}                                            # (section, paragraph) -> scene
        for art in scenes["articles"]:
            for sc in art["scenes"]:
                sc["text_words"] = []
                for p in sc.get("paragraphs", []):
                    owner.setdefault((art["section"], p), sc)
        for w in (w for w in words if w["unit"] == unit):
            total += 1
            pat = pattern(w["word"])
            hits = []
            sections = [SECTION.get(w["section"], "section_a")] + [s for s in texts if s != SECTION.get(w["section"])]
            for sec in sections:
                for pi, para in enumerate(texts.get(sec, []), start=1):
                    for si, sent in enumerate(sentences(para), start=1):
                        m = pat.search(sent) if pat else None
                        if m:
                            hits.append((sec, pi, si, m.group(1)))
                if hits:
                    break                                     # prefer the section the word list names
            if not hits:
                unmatched.append(w)
                continue
            sec, pi, si, form = hits[0]
            sc = owner.get((sec, pi))
            if sc is None:
                unmatched.append(dict(w, note=f"text uses it in {sec} paragraph {pi}, but no scene shows that paragraph"))
                continue
            sc["text_words"].append({"word": w["word"].strip(), "form": form, "paragraph": pi, "sentence": si})
            placed += 1
        if not check:
            scene_file.write_text(json.dumps(scenes, ensure_ascii=False, indent=1) + "\n", encoding="utf-8")
    lines = ["# 生词未在课文中找到（scene_text_words.py）", "",
             f"共 {total} 条，已放入场景句子 {placed} 条，未找到 {len(unmatched)} 条。",
             "多数是 OCR 拼写错误（例如 cevice、adrougnt），请 DeepSeek 在 words.csv 纠正后重跑本脚本。", "",
             "| 单元 | 段 | 词 | 词性 | 说明 |", "|------|----|----|------|------|"]
    lines += [f"| {w['unit']} | {w['section']} | {w['word']} | {w['pos']} | {w.get('note', '课文中未出现')} |" for w in unmatched]
    if not check:
        REPORT.write_text("\n".join(lines) + "\n", encoding="utf-8")
    print(f"TEXT_WORDS placed {placed}/{total}, unmatched {len(unmatched)}")
    return placed, total, unmatched


if __name__ == "__main__":
    ap = argparse.ArgumentParser()
    ap.add_argument("--check", action="store_true")
    run(ap.parse_args().check)
