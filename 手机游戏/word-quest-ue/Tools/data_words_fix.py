#!/usr/bin/env python3
"""D27 词表校对：修 OCR 拼写、重配词典音标（CMUdict，统一美式）、清理中文释义。

用法：
  python3 Tools/data_words_fix.py --check
  python3 Tools/data_words_fix.py --write
  python3 Tools/data_words_fix.py --write --reference <清理后的词表.json> --cmudict <cmudict.dict>

产物：Content/Data/textbook/rw3/words.csv（--write），Docs/qa/words-fix-report.json。
音标来源：CMUdict（美式，ARPAbet→IPA）；CMU 未收词用 --reference 的音标兜底，仍没有则留空并在报告里列出。
"""
from __future__ import annotations

import argparse
import csv
import json
import re
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
WORDS = ROOT / "Content/Data/textbook/rw3/words.csv"
REPORT = ROOT / "Docs/qa/words-fix-report.json"
CMU_URL = "https://raw.githubusercontent.com/cmusphinx/cmudict/master/cmudict.dict"

# 18 个"课文中找不到"的词：OCR 拼写/词性修正（reflective/periodic/infinite/masted/conceive 靠匹配器修正保留）
EXPLICIT = {
    "Furiousty": ("furiously", "adv."),
    "cevice": ("device", "n."),
    "tnihe": ("tribe", "n."),
    "tabiet": ("tablet", "n."),
    "Iuxurious": ("luxurious", "a."),
    "AVia": ("via", "prep."),
    "Adrougnt": ("drought", "n."),
    "ACharitable": ("charitable", "a."),
    "buliying": ("bullying", "n."),
    "Tofty": ("lofty", "a."),
    "milennium": ("millennium", "n."),
    "sizabie": ("sizable", "a."),
    "cllent": ("client", "n."),
    # 常见词被 OCR 大写成专名样式
    "Furious": ("furious", "a."),
    "Keepsake": ("keepsake", "n."),
    "Jeopardize": ("jeopardize", "v."),
    "Jelly": ("jelly", "n."),
    "Ivory": ("ivory", "n."),
}

VOWELS = {"AA": "ɑː", "AE": "æ", "AH": "ʌ", "AO": "ɔː", "AW": "aʊ", "AY": "aɪ",
          "EH": "e", "ER": "ɜːr", "EY": "eɪ", "IH": "ɪ", "IY": "iː",
          "OW": "oʊ", "OY": "ɔɪ", "UH": "ʊ", "UW": "uː"}
CONSONANTS = {"B": "b", "CH": "tʃ", "D": "d", "DH": "ð", "F": "f", "G": "ɡ", "HH": "h",
              "JH": "dʒ", "K": "k", "L": "l", "M": "m", "N": "n", "NG": "ŋ", "P": "p",
              "R": "r", "S": "s", "SH": "ʃ", "T": "t", "TH": "θ", "V": "v", "W": "w",
              "Y": "j", "Z": "z", "ZH": "ʒ"}


def load_cmudict(path: Path) -> dict[str, list[str]]:
    if not path.exists():
        print(f"[words] 下载 CMUdict -> {path}")
        urllib.request.urlretrieve(CMU_URL, path)
    entries: dict[str, list[str]] = {}
    for line in path.read_text(encoding="utf-8", errors="ignore").splitlines():
        if not line.strip() or line.startswith(";;;"):
            continue
        parts = line.split()
        word = re.sub(r"\(\d+\)$", "", parts[0]).lower()
        entries.setdefault(word, parts[1:])
    return entries


def arpabet_to_ipa(phones: list[str]) -> str:
    syllables: list[tuple[list[str], str, str]] = []
    onset: list[str] = []
    for phone in phones:
        match = re.fullmatch(r"([A-Z]+)([012]?)", phone)
        if not match:
            continue
        base, stress = match.group(1), match.group(2)
        if base in VOWELS:
            vowel = VOWELS[base]
            if base == "AH" and stress == "0":
                vowel = "ə"
            if base == "ER" and stress == "0":
                vowel = "ər"
            syllables.append((onset, vowel, stress))
            onset = []
        elif base in CONSONANTS:
            onset.append(CONSONANTS[base])
    tail = "".join(onset)
    out: list[str] = []
    for cons, vowel, stress in syllables:
        mark = "ˈ" if stress == "1" else ("ˌ" if stress == "2" else "")
        out.append(mark + "".join(cons) + vowel)
    return "".join(out) + tail


def ipa_for(word: str, cmu: dict[str, list[str]]) -> tuple[str, str]:
    """返回 (ipa, source)。短语按词拼接；CMU 未收返回空。"""
    key = word.lower().replace("’", "'")
    if key in cmu:
        return "/" + arpabet_to_ipa(cmu[key]) + "/", "cmudict"
    if " " in key:
        parts = []
        for token in key.split():
            token = token.strip("'")
            if token in cmu:
                parts.append(arpabet_to_ipa(cmu[token]))
            else:
                return "", "missing"
        return "/" + " ".join(parts) + "/", "cmudict-composed"
    return "", "missing"


# CMUdict 未收的专名，按通用词典人工补（美式）
MANUAL_IPA = {
    "mencius": "/ˈmɛnʃiəs/",
    "malindi": "/mɑːˈlɪndi/",
    "robert wolders": "/ˈroʊbərt ˈwoʊldərz/",
    "machu picchu": "/ˈmɑːtʃuː ˈpiːtʃuː/",
}

MEANING_FIX = [("旳", "的"), ("钓", "的"), ("便浸没", "使浸没"), ("习份", "习惯"), ("部洛", "部落")]


def clean_meaning(text: str) -> str:
    result = text.strip()
    for old, new in MEANING_FIX:
        result = result.replace(old, new)
    result = re.sub(r"(?<=[\u4e00-\u9fff，；、（）])\s+(?=[\u4e00-\u9fff，；、（）])", "", result)
    result = re.sub(r"\s+", " ", result)
    result = re.sub(r"\s*）", "）", result)
    result = re.sub(r"（\s*", "（", result)
    return result.strip("； ")


def main(argv=None) -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--write", action="store_true")
    parser.add_argument("--check", action="store_true")
    parser.add_argument("--reference", type=Path, default=None)
    parser.add_argument("--cmudict", type=Path, default=Path("/tmp/cmudict.dict"))
    args = parser.parse_args(argv)

    cmu = load_cmudict(args.cmudict)
    reference: dict[str, dict] = {}
    if args.reference and args.reference.exists():
        data = json.loads(args.reference.read_text(encoding="utf-8"))
        reference = {row["word"].strip().lower(): row for row in data["words"]}

    rows = list(csv.DictReader(WORDS.open(encoding="utf-8-sig")))
    report = {"corrected": [], "phonetic_missing": [], "meaning_from_reference": 0,
              "meaning_cleaned": 0, "ipa_sources": {}}
    output = []
    for row in rows:
        word = row["word"].strip()
        pos = row.get("pos", "").strip()
        meaning = row.get("meaning_cn", "").strip()
        if word in EXPLICIT:
            new_word, new_pos = EXPLICIT[word]
            report["corrected"].append({"old": word, "new": new_word, "pos_from": pos, "pos_to": new_pos})
            word, pos = new_word, new_pos
        ref = reference.get(word.lower())
        if ref:
            if ref.get("meaning"):
                meaning = ref["meaning"].strip()
                report["meaning_from_reference"] += 1
            if ref.get("pos") and not pos:
                pos = ref["pos"]
        cleaned = clean_meaning(meaning)
        if cleaned != meaning:
            report["meaning_cleaned"] += 1
        ipa, source = ipa_for(word, cmu)
        if not ipa and MANUAL_IPA.get(word.lower()):
            ipa, source = MANUAL_IPA[word.lower()], "manual"
        if not ipa and ref and (ref.get("phonetic") or "").strip():
            ipa, source = ref["phonetic"].strip(), "reference"
        report["ipa_sources"][source] = report["ipa_sources"].get(source, 0) + 1
        if not ipa:
            report["phonetic_missing"].append(word)
        row.update({"word": word, "pos": pos, "meaning_cn": cleaned, "phonetic": ipa})
        output.append(row)

    REPORT.parent.mkdir(parents=True, exist_ok=True)
    REPORT.write_text(json.dumps(report, ensure_ascii=False, indent=1), encoding="utf-8")
    print(json.dumps({"rows": len(output), "corrected": len(report["corrected"]),
                      "ipa_sources": report["ipa_sources"], "phonetic_missing": len(report["phonetic_missing"]),
                      "meaning_from_reference": report["meaning_from_reference"]}, ensure_ascii=False))
    if report["phonetic_missing"]:
        print("phonetic missing:", report["phonetic_missing"])
    if args.write:
        with WORDS.open("w", encoding="utf-8-sig", newline="") as fh:
            writer = csv.DictWriter(fh, fieldnames=["unit", "section", "word", "phonetic", "pos", "meaning_cn"])
            writer.writeheader()
            writer.writerows(output)
        print("words.csv written:", WORDS)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
