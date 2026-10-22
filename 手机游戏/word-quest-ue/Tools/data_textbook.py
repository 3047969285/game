"""把用户本地提供的《新视野大学英语（第四版）读写教程3》提取进项目（文章/单词/题目）。

输入（页级 OCR 文本，已在项目中）：`Content/Data/textbook/rw3/pages/page_###.txt`
（每行 `y\\tx\\ttext`，由 macOS Vision OCR 从用户本地 docx 的页图提取；见 Docs/data/textbook-rw3.md）

输出：
- `Content/Data/textbook/rw3/textbook.json` —— 6 单元结构化数据（Text A/B、Stories of China、New words、练习）
- `Content/Data/textbook/rw3/words.csv` —— 单词表
- `Content/Data/textbook/rw3/questions.csv` —— 题目（理解题/翻译/写作等）
- `Content/Data/textbook/rw3/units/unit0N.md` —— 单单元可读版

用法：python3 Tools/data_textbook.py [--out DIR]
"""
from __future__ import annotations

import argparse
import csv
import json
import re
from pathlib import Path

PROJECT = Path(__file__).resolve().parents[1]
PAGES = PROJECT / "Content" / "Data" / "textbook" / "rw3" / "pages"
OUT = PROJECT / "Content" / "Data" / "textbook" / "rw3"

PHON = re.compile(r"/[^/]{1,80}/")
CJK = re.compile(r"[\u4e00-\u9fff]")
HEADINGS = ["Reading comprehension", "Language focus", "Words in use", "Word building",
            "Banked cloze", "Expressions in use", "Structure analysis", "Structured writing",
            "Collocation", "Translation", "Writing", "Unit project", "Text A", "Text B",
            "Reading skills", "Pre-reading activities"]
HEAD_RE = re.compile(r"^\s*(?:" + "|".join(re.escape(h) for h in HEADINGS) + r")\b", re.I)
WORD_RE = re.compile(r"^([A-Za-z][A-Za-z' \-]{1,40}?)\s*(/[^/]{1,80}/)\s*(.*)$")


def read_page(path: Path) -> list[str]:
    lines = []
    for ln in path.read_text(encoding="utf-8", errors="ignore").splitlines():
        parts = ln.split("\t")
        text = "\t".join(parts[2:]).strip() if len(parts) >= 3 else ln.strip()
        if text:
            lines.append(text)
    return lines


def load_pages() -> dict[int, list[str]]:
    return {int(p.stem.split("_")[1]): read_page(p) for p in sorted(PAGES.glob("page_*.txt"))}


def order_ocr_lines(lines: list[tuple[float, float, str]]) -> list[str]:
    """OCR 行按阅读顺序：识别双栏（左栏读完再右栏），单栏按 y 排序。"""
    if not lines:
        return []
    left = [l for l in lines if l[1] < 0.48]
    right = [l for l in lines if l[1] >= 0.48]
    two_col = len(left) > 0.25 * len(lines) and len(right) > 0.25 * len(lines)
    seq = (sorted(left, key=lambda t: (t[0], t[1])) + sorted(right, key=lambda t: (t[0], t[1]))) if two_col else sorted(lines, key=lambda t: (t[0], t[1]))
    return [t for _, _, t in seq]


def import_ocr(src: Path) -> int:
    """把 `ocr` 工具输出的 page_###.txt（y\tx\ttext）转成项目内的可读页文本。"""
    PAGES.mkdir(parents=True, exist_ok=True)
    count = 0
    for p in sorted(src.glob("page_*.txt")):
        lines = []
        for ln in p.read_text(encoding="utf-8", errors="ignore").splitlines():
            parts = ln.split("\t")
            if len(parts) >= 3:
                try:
                    lines.append((float(parts[0]), float(parts[1]), "\t".join(parts[2:])))
                except ValueError:
                    continue
        (PAGES / p.name).write_text("\n".join(order_ocr_lines(lines)), encoding="utf-8")
        count += 1
    return count


def has(lines, pat) -> bool:
    return any(re.search(pat, l, re.I) for l in lines[:12])


def find_special(pages: dict[int, list[str]]):
    sa, sb, sc, proj = [], [], [], []
    for n, lines in pages.items():
        if n < 17:
            continue
        head = "\n".join(lines[:10])
        if re.search(r"^Section A", head, re.I | re.M) and re.search(r"pre-reading", head, re.I):
            sa.append(n)
        elif re.search(r"^Section B", head, re.I | re.M):
            sb.append(n)
        elif re.search(r"^Section C", head, re.I | re.M) or re.search(r"^Stories of China", head, re.I | re.M):
            sc.append(n)
        if re.search(r"^Unit project", head, re.I | re.M):
            proj.append(n)
    return sorted(sa), sorted(sb), sorted(sc), sorted(proj)


def vocab_groups(pages: dict[int, list[str]], start: int, end: int):
    """返回 [(page_start, page_end)]：从 start 到 end 之间的词汇表页组。"""
    cand = []
    for n in range(start, min(end + 1, max(pages) + 1)):
        lines = pages.get(n, [])
        ph = sum(1 for l in lines if PHON.search(l))
        head = "\n".join(lines[:6])
        if re.search(r"New wor|Words and expressions|New Words", head, re.I) or ph >= 5:
            cand.append(n)
    groups = []
    for n in cand:
        if groups and n - groups[-1][1] <= 1:
            groups[-1] = (groups[-1][0], n)
        else:
            groups.append((n, n))
    return groups


OCR_FIX = {
    "Cisnye-4": "Chang'e-4", "oayssey": "odyssey", "Ecenemic": "Economic",
    "conaitions": "conditions", "Aamiral": "Admiral", "Betjing": "Beijing",
    "tne": "the", "ofa": "of a", "aream": "dream", "quet": "quiet",
    "trom": "from", "aavanced": "advanced", "erashing": "crashing",
    "ncteorites": "meteorites", "Iives": "lives", "Chilaren": "children",
    "Eaition": "Edition", "Conlection": "Connection", "Crisi": "crisis",
    "Anclent": "ancient", "Iearned": "learned", "Iingering": "lingering",
    "Inalan": "Indian", "Incian": "Indian", "worla": "world", "woras": "words",
    "Horzon": "Horizon", "Funa": "Fund", "Iuxurious": "luxurious",
    "bullding": "building", "Hiepburn": "Hepburn", "Hepbepn": "Hepburn",
    "execulises": "executives", "tals": "falls", "benetits": "benefits",
    "occasiomaly": "occasionally", "NNowind": "No wind", "fure": "lure",
    "allowea": "allowed", "chilaren": "children", "comprenension": "comprehension",
}
ZH_FIX = {"随看": "随着", "技术钓": "技术的", "社会钓": "社会的", "深人": "深入", "一合": "一台", "钓": "的"}


def zh_fix(text: str) -> str:
    for a, b in ZH_FIX.items():
        text = text.replace(a, b)
    return text
PHRASE_FIX = {
    "na quiet Saturday": "On a quiet Saturday", "15-year-ola": "15-year-old",
    "scenarit": "scenario", "furiousiy": "furiously", "Keyboaras": "keyboards",
    "diserete": "discrete", "1am thinking": "I am thinking", "1love you": "I love you",
    "we'1l": "we'll", "it might be hara": "it might be hard", "the hurden": "the burden",
    "companles": "companies", "young associates": "young associates",
    "I1 T'm": "I'm", "T'm": "I'm", "Iam": "I am", "I'm not a critic": "I'm not a critic",
}
_FIX_RE = re.compile(r"\b(" + "|".join(re.escape(k) for k in OCR_FIX) + r")\b")
_HEADER_RE = re.compile(r"Unit\s*\d+\s+(?:The digital age|Life stories|Let's go|When work is a pleasure|China's space|The economy)[^\n]{0,80}", re.I)


def fix_text(text: str) -> tuple[str, int]:
    """应用人工核对过的高置信 OCR 纠错；返回 (文本, 修正数)。"""
    n = 0
    for a, b in PHRASE_FIX.items():
        if a in text:
            text = text.replace(a, b); n += 1
    text = _HEADER_RE.sub("", text)
    def rep(m):
        return OCR_FIX[m.group(1)]
    text, k = _FIX_RE.subn(rep, text)
    # 词级修正后可能拼出新的短语错误（quet->quiet 后 na quiet -> On a quiet）
    for a, b in PHRASE_FIX.items():
        if a in text:
            text = text.replace(a, b); n += 1
    return text, n + k


def clean_article_lines(lines: list[str]) -> list[str]:
    out = []
    for l in lines:
        if re.match(r"^Culture notes?\b", l, re.I):
            break
        if re.fullmatch(r"\d{1,3}", l):
            continue
        if re.match(r"^(New Horizon|Reading and Writing|Unit\s*\d|Section [ABC]|Text [ABC])$", l, re.I):
            continue
        if re.search(r"New Hor(i)?zon|Horzon|Fourth Eaition|Lnglish|rourth|colege|Eaition", l, re.I):
            continue
        if re.match(r"^[（(]?\s*\d{2,4}\s*(words?|woras|Words?)[)）]?\s*$", l):
            continue
        if re.match(r"^\d{2,4}\s*words?$", l, re.I):
            continue
        out.append(l.strip())
    return out


def paragraphs(lines: list[str]) -> list[str]:
    """按段号/空行合并成段落（OCR 的段号常在行首或单独一行）。"""
    paras, cur = [], []
    for l in clean_article_lines(lines):
        m = re.match(r"^(\d{1,2})[\s\.](.*)$", l)
        if m and int(m.group(1)) <= 30 and len("".join(cur)) > 60:
            if cur:
                paras.append(" ".join(cur).strip())
            cur = [m.group(2).strip()] if m.group(2).strip() else []
        else:
            cur.append(l)
    if cur:
        paras.append(" ".join(cur).strip())
    return [re.sub(r"\s+", " ", p).strip() for p in paras if len(p) > 20]


def parse_words(pages: dict[int, list[str]], groups) -> list[dict]:
    words = []
    for g0, g1 in groups:
        entries: list[tuple[str, str, str, list[str]]] = []
        for n in range(g0, g1 + 1):
            for line in pages.get(n, []):
                m = WORD_RE.match(line)
                if not m:
                    continue
                word = m.group(1).strip()
                word = strip_marker(word)
                phon = m.group(2)
                rest = m.group(3).strip()
                entries.append((word, phon, rest, []))
                continue
                # 未匹配：作为上一条的释义续行
            # 把非条目行接到上一条的释义
        # 重新扫描：条目行之间的文本归入上一条
        entries = []
        current = None
        for n in range(g0, g1 + 1):
            for line in pages.get(n, []):
                m = WORD_RE.match(line)
                if m:
                    word = strip_marker(m.group(1).strip())
                    current = {"word": word, "phonetic": m.group(2), "pos": "", "meaning_cn": "",
                               "raw": line, "sentences": [m.group(3).strip()] if m.group(3).strip() else []}
                    entries.append(current)
                elif current is not None and line.strip():
                    if re.search(r"注：|标；|单词为|未做标记|斜体", line):
                        continue
                    current["sentences"].append(line.strip())
        for e in entries:
            body = " ".join(e.pop("sentences"))
            pos = re.match(r"^((?:n|v|a|ad|adj|adv|prep|conj|pron|num|aux|vt|vi)\.?)", body)
            if pos:
                e["pos"] = pos.group(1)
                body = body[pos.end():].strip()
            cn_runs = re.findall(r"[\u4e00-\u9fff][\u4e00-\u9fff，。；、：（）()\s]*", body)
            e["meaning_cn"] = "；".join(c.strip() for c in cn_runs if c.strip())[:160]
            e["definition_en"] = re.sub(r"[\u4e00-\u9fff][\u4e00-\u9fff，。；、：（）()\s]*", "", body).strip()[:400]
            e["unit"] = None
            e["section"] = None
        words.extend(entries)
    return words


_DICT: set[str] | None = None


def _dict_words() -> set[str]:
    global _DICT
    if _DICT is None:
        _DICT = set()
        try:
            for ln in open("/usr/share/dict/words", encoding="utf-8", errors="ignore"):
                _DICT.add(ln.strip().lower())
        except OSError:
            pass
    return _DICT


def strip_marker(word: str) -> str:
    """去掉 OCR 粘在词首的 A/▲/△ 标记（Adense -> dense, A convention -> convention）。
    只在“去掉标记后的词是词典词、原词不是”时剥离，避免误伤 American/African 等。"""
    word = re.sub(r"^[A▲△]\s+(?=[A-Za-z])", "", word).strip()
    m = re.match(r"^[A▲△]([a-z]{3,})$", word)
    if m:
        rest = m.group(1)
        d = _dict_words()
        if rest in d and word.lower() not in d:
            return rest
    return word


CN_ONLY = re.compile(r"^[\u4e00-\u9fff（）()；;，,。.、\s]+$")


def slice_from_heading(lines: list[str], pat: str) -> list[str]:
    for i, l in enumerate(lines):
        if re.match(pat, l, re.I):
            return lines[i:]
    return lines


def first_page(pages: dict[int, list[str]], a: int, b: int, pat: str):
    for n in range(a, b + 1):
        if any(re.match(pat, l, re.I) for l in pages.get(n, [])):
            return n
    return None


def page_text(pages, a, b) -> str:
    return "\n".join("\n".join(pages.get(n, [])) for n in range(a, b + 1))


HEAD_ALIASES = [
    (r"^Reading comp\w*", "Reading comprehension"),
    (r"^Trans?iation$|^Translate the following", "Translation"),
    (r"^Word build\w*", "Word building"),
    (r"^Expressio\w*", "Expressions in use"),
    (r"^Structured writ\w*", "Structured writing"),
    (r"^Structure analys\w*", "Structure analysis"),
    (r"^Collocation$", "Collocation"),
    (r"^Words in use$", "Words in use"),
    (r"^Banked cloze$", "Banked cloze"),
    (r"^Language focus$", "Language focus"),
    (r"^Unit project$", "Unit project"),
]


def match_heading(line: str) -> str | None:
    for pat, canon in HEAD_ALIASES:
        if re.match(pat, line.strip(), re.I):
            return canon
    return None


def split_exercises(pages: dict[int, list[str]], a: int, b: int) -> list[dict]:
    """把 [a,b] 页按标题切成练习块。"""
    blocks, cur = [], None
    for n in range(a, b + 1):
        lines = pages.get(n, [])
        i = 0
        while i < len(lines):
            line = lines[i]
            canon = match_heading(line)
            if canon:
                if cur and cur["lines"]:
                    blocks.append(cur)
                cur = {"heading": canon, "page": n, "lines": []}
                tail = re.sub(r"^(?:" + "|".join(re.escape(h) for h in HEADINGS) + r"|Reading comp\w*|Trans?iation)", "", line, flags=re.I).strip()
                if tail:
                    cur["lines"].append(tail)
            elif cur is not None:
                cur["lines"].append(line)
            i += 1
    if cur and cur["lines"]:
        blocks.append(cur)
    # 合并相邻同名标题（OCR 跨页重复）
    merged = []
    for blk in blocks:
        if merged and merged[-1]["heading"].lower() == blk["heading"].lower():
            merged[-1]["lines"] += blk["lines"]
        else:
            merged.append(blk)
    blocks = merged
    for blk in blocks:
        blk["raw"] = "\n".join(blk["lines"])
        blk["questions"] = parse_questions(blk["lines"])
        for q in blk["questions"]:
            q["question"] = fix_text(q["question"])[0]
            q["options"] = [fix_text(o)[0] for o in q["options"]]
    return blocks


INSTRUCTION_RE = re.compile(r"^(Answer the following|Fill in the blanks|Choose the best|Complete the|Work in|Translate the|Write a|Read the|Match the|Replace the|Rewrite|Study the|Discuss|Each of the following|The following|Use the|Correct the|Combine the)", re.I)


def parse_questions(lines: list[str]) -> list[dict]:
    qs, cur = [], None
    for line in lines:
        m = re.match(r"^(\d{1,2})\s+(.+)$", line)
        om = re.match(r"^([A-D])[\s\.\)]\s*(.+)$", line)
        if m and not om:
            qtext = m.group(2).strip()
            if INSTRUCTION_RE.match(qtext) or len(qtext) < 12:
                continue
            if cur:
                qs.append(cur)
            cur = {"question": qtext, "options": [], "answer": None}
        elif om and cur is not None:
            cur["options"].append(om.group(2).strip())
        elif cur is not None and line.strip():
            if cur["options"]:
                if len(cur["options"][-1]) < 110:
                    cur["options"][-1] += " " + line.strip()
            elif len(cur["question"]) < 400:
                cur["question"] += " " + line.strip()
    if cur:
        qs.append(cur)
    return [q for q in qs if len(q["question"]) > 12]


def parse_translation(lines: list[str]) -> list[str]:
    out = []
    for line in lines:
        if CJK.search(line) and ("译" in line or "translate" in line.lower()):
            out.append(line.strip())
        elif CJK.search(line) and len(line.strip()) > 10 and not out:
            out.append(line.strip())
    return out


TITLE_OVERRIDES = {
    "unit01": "The digital age: Are we ready?",
    "unit02": "Life stories",
    "unit03": "Let's go",
    "unit04": "When work is a pleasure",
    "unit05": "China's space dream",
    "unit06": "The economy: power behind everyday life",
}


def extract_translation(pages, c_start: int, story_end: int, trans_page, proj_end: int) -> list[str]:
    """Section C 翻译练习：抓 Translation 标题后的汉语段落（OCR 可能写成 Transiation）。"""
    out = []
    if trans_page:
        for line in pages.get(trans_page, []):
            if CJK.search(line) and len(line.strip()) > 6:
                out.append(line.strip())
        for n in range(trans_page + 1, max(trans_page + 1, proj_end) + 1):
            for line in pages.get(n, []):
                if re.match(r"^Exercises?$", line, re.I):
                    break
                if CJK.search(line) and len(line.strip()) > 6:
                    out.append(line.strip())
    return out


def unit_title(pages, opener: int, next_page: int, unit_id: str = "") -> tuple[str, str]:
    text = "\n".join(pages.get(opener, []) + pages.get(opener + 1, []))
    lines = [l.strip() for l in text.splitlines() if l.strip()]
    en = [l for l in lines if re.search(r"[A-Za-z]{2,}", l) and not re.search(r"Unit|Preview|Section", l, re.I)]
    title = " ".join(en[:3])[:120] if en else ""
    title = TITLE_OVERRIDES.get(unit_id, title)
    zh = [l for l in lines if CJK.search(l)]
    return title, (zh[0][:60] if zh else "")


def build() -> dict:
    pages = load_pages()
    sa, sb, sc, proj = find_special(pages)
    units = []
    for idx, a0 in enumerate(sa):
        num = idx + 1
        opener = a0 - 2
        next_a = sa[idx + 1] if idx + 1 < len(sa) else max(pages) + 1
        a_end = sb[idx] - 1 if idx < len(sb) else next_a - 1
        b_start = sb[idx] if idx < len(sb) else a_end
        b_end = sc[idx] - 1 if idx < len(sc) else next_a - 1
        c_start = sc[idx] if idx < len(sc) else b_end
        proj_page = next((p for p in proj if c_start <= p <= next_a - 1), next_a - 1)
        # 词汇页
        a_vocab = vocab_groups(pages, a0 + 1, a_end)
        b_vocab = vocab_groups(pages, b_start + 1, b_end)
        a_art_end = (a_vocab[0][0] - 1) if a_vocab else a_end
        b_art_end = (b_vocab[0][0] - 1) if b_vocab else b_end
        title, title_zh = unit_title(pages, opener, a0, f"unit{num:02d}")
        # Text A
        a_art_start = first_page(pages, a0 + 1, a_art_end, r"^Text A$") or (a0 + 1)
        a_lines = []
        for n in range(a_art_start, a_art_end + 1):
            lines_n = pages.get(n, [])
            if n == a_art_start:
                lines_n = slice_from_heading(lines_n, r"^Text A\s*$")
            a_lines += lines_n
        # Text B
        b_art_start = first_page(pages, b_start + 1, b_art_end, r"^Text B$") or (b_start + 1)
        b_lines = []
        for n in range(b_art_start, b_art_end + 1):
            lines_n = pages.get(n, [])
            if n == b_art_start:
                lines_n = slice_from_heading(lines_n, r"^Text B\s*$")
            b_lines += lines_n
        # Section C：同一页可能前半是故事、后半是翻译练习，按标题切分
        c_story, c_trans, in_trans = [], [], False
        for n in range(c_start, proj_page):
            for line in pages.get(n, []):
                if re.match(r"^Trans?iation$|^Translate the following", line, re.I):
                    in_trans = True
                    continue
                if re.match(r"^Exercises?$", line, re.I):
                    continue
                if in_trans:
                    if CJK.search(line) and len(line.strip()) > 6:
                        c_trans.append(line.strip())
                else:
                    c_story.append(line)
        c_lines = [l for l in c_story if len(re.findall(r"[A-Za-z\u4e00-\u9fff]", l)) >= 3]
        c_trans = [zh_fix(l) for l in c_trans]
        a_words = parse_words(pages, a_vocab)
        b_words = parse_words(pages, b_vocab)
        for w in a_words:
            w["unit"], w["section"] = f"unit{num:02d}", "A"
        for w in b_words:
            w["unit"], w["section"] = f"unit{num:02d}", "B"
        a_ex = split_exercises(pages, (a_vocab[-1][1] + 1) if a_vocab else a_art_end + 1, a_end)
        b_ex = split_exercises(pages, (b_vocab[-1][1] + 1) if b_vocab else b_art_end + 1, b_end)
        c_ex = split_exercises(pages, c_start, proj_page - 1) if proj_page > c_start else []
        units.append({
            "unit_id": f"unit{num:02d}", "unit_number": num, "title": title, "title_zh": title_zh,
            "pages": {"opener": opener, "sectionA": a0, "sectionB": b_start, "sectionC": c_start, "project": proj_page},
            "sections": {
                "A": {"article": {"paragraphs": paragraphs(a_lines), "raw": "\n".join(clean_article_lines(a_lines))},
                      "words": a_words, "exercises": a_ex},
                "B": {"article": {"paragraphs": paragraphs(b_lines), "raw": "\n".join(clean_article_lines(b_lines))},
                      "words": b_words, "exercises": b_ex},
                "C": {"story": {"raw": "\n".join([l for l in c_lines if not re.match(r"^(Stories of China|Section C)$", l, re.I)])}, "exercises": c_ex,
                      "translation": c_trans},
            },
        })
    n_fix = 0
    for u in units:
        for sec in ("A", "B"):
            art = u["sections"][sec]["article"]
            art["raw"], c1 = fix_text(art["raw"])
            art["paragraphs"] = [fix_text(p)[0] for p in art["paragraphs"]]
            n_fix += c1
        st = u["sections"]["C"]["story"]
        st["raw"], c2 = fix_text(st["raw"])
        n_fix += c2
    counts = {
        "units": len(units),
        "textA_paragraphs": sum(len(u["sections"]["A"]["article"]["paragraphs"]) for u in units),
        "textB_paragraphs": sum(len(u["sections"]["B"]["article"]["paragraphs"]) for u in units),
        "words": sum(len(u["sections"][s]["words"]) for u in units for s in ("A", "B")),
        "questions": sum(len(b["questions"]) for u in units for s in ("A", "B", "C") for b in u["sections"][s]["exercises"]),
        "translation_lines": sum(len(u["sections"]["C"]["translation"]) for u in units),
    }
    return {"meta": {"source": "新视野大学英语（第四版）读写教程3（思政智慧版），用户本地文件",
                     "method": "macOS Vision OCR（页图）→ 规则解析", "pages": len(pages),
                     "ocr_corrections": n_fix},
            "counts": counts, "units": units}


def write(data: dict):
    OUT.mkdir(parents=True, exist_ok=True)
    (OUT / "textbook.json").write_text(json.dumps(data, ensure_ascii=False, indent=1), encoding="utf-8")
    ud = OUT / "units"; ud.mkdir(exist_ok=True)
    words, questions = [], []
    for u in data["units"]:
        for sec in ("A", "B"):
            for w in u["sections"][sec]["words"]:
                words.append({"unit": w["unit"], "section": w["section"], "word": w["word"],
                              "phonetic": w["phonetic"], "pos": w["pos"], "meaning_cn": w["meaning_cn"]})
            for blk in u["sections"][sec]["exercises"]:
                for q in blk["questions"]:
                    questions.append({"unit": u["unit_id"], "section": sec, "kind": blk["heading"],
                                      "question": q["question"], "options": json.dumps(q["options"], ensure_ascii=False),
                                      "page": blk["page"]})
        for blk in u["sections"]["C"]["exercises"]:
            for q in blk["questions"]:
                questions.append({"unit": u["unit_id"], "section": "C", "kind": blk["heading"],
                                  "question": q["question"], "options": json.dumps(q["options"], ensure_ascii=False),
                                  "page": blk["page"]})
        md = [f"# Unit {u['unit_number']} · {u['title']}", "",
              f"- 页面：A {u['pages']['sectionA']} / B {u['pages']['sectionB']} / C {u['pages']['sectionC']}",
              "", "## Text A（段落）", ""] + [f"{i+1}. {p}" for i, p in enumerate(u["sections"]["A"]["article"]["paragraphs"])]
        md += ["", "## Text A 单词", ""] + [f"- {w['word']} {w['phonetic']} {w['pos']} {w['meaning_cn']}" for w in u["sections"]["A"]["words"]]
        md += ["", "## Text B（段落）", ""] + [f"{i+1}. {p}" for i, p in enumerate(u["sections"]["B"]["article"]["paragraphs"])]
        md += ["", "## Text B 单词", ""] + [f"- {w['word']} {w['phonetic']} {w['pos']} {w['meaning_cn']}" for w in u["sections"]["B"]["words"]]
        md += ["", "## 练习", ""]
        for sec in ("A", "B", "C"):
            for blk in u["sections"][sec]["exercises"]:
                md.append(f"### {sec} · {blk['heading']}（p{blk['page']}）")
                md += [f"- {q['question']}" + (f"  选项：{' / '.join(q['options'])}" if q["options"] else "") for q in blk["questions"]]
        (ud / f"unit{u['unit_number']:02d}.md").write_text("\n".join(md), encoding="utf-8")
    with (OUT / "words.csv").open("w", encoding="utf-8-sig", newline="") as fh:
        w = csv.DictWriter(fh, fieldnames=["unit", "section", "word", "phonetic", "pos", "meaning_cn"])
        w.writeheader(); w.writerows(words)
    with (OUT / "questions.csv").open("w", encoding="utf-8-sig", newline="") as fh:
        w = csv.DictWriter(fh, fieldnames=["unit", "section", "kind", "question", "options", "page"])
        w.writeheader(); w.writerows(questions)


def main(argv=None) -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--out", default=None)
    ap.add_argument("--from-ocr", default=None, help="把 Vision OCR 的 page_*.txt 目录导入 Content/Data/textbook/rw3/pages 后解析")
    args = ap.parse_args(argv)
    if args.from_ocr:
        n = import_ocr(Path(args.from_ocr).expanduser())
        print(json.dumps({"imported_pages": n}, ensure_ascii=False))
    data = build()
    write(data)
    print(json.dumps({"counts": data["counts"], "out": str(OUT)}, ensure_ascii=False))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
