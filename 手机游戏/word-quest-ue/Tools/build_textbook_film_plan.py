#!/usr/bin/env python3
"""Build a textbook-original narration plan for the Unit-1 showcase film.

The rendered frames are reused 1:1; only the narration/subtitles are swapped to sentences quoted from the
coursebook (teacher-authorized use), sliced from the D25 paragraph recordings with their sentence timestamps.
Output: Saved/Film/unit01/plan_textbook.json + narration_textbook/*.wav
"""
import json
import wave
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
UNIT = 1
FILM = ROOT / "Saved/Film" / f"unit{UNIT:02d}"
VO = ROOT / "Content/Data/vo/textbook" / f"unit{UNIT:02d}"
SCENES = ROOT / "Content/Data/memory/textbook_scenes" / f"unit{UNIT:02d}.json"
ARTICLES = ROOT / "Content/Data/textbook/rw3/articles" / f"unit{UNIT:02d}.json"
OUT_DIR = FILM / "narration_textbook"
PLAN = FILM / "plan_textbook.json"


def sentences(paragraph):
    out, cur = [], ""
    for ch in paragraph:
        cur += ch
        if ch in ".!?":
            out.append(cur.strip())
            cur = ""
    if cur.strip():
        out.append(cur.strip())
    return out


def slice_wav(src, dst, start, end):
    with wave.open(str(src), "rb") as r:
        params = r.getparams()
        rate = r.getframerate()
        frames = r.readframes(r.getnframes())
        a = int(start * rate)
        b = min(int(end * rate), len(frames) // (r.getnchannels() * r.getsampwidth()))
    with wave.open(str(dst), "wb") as w:
        w.setnchannels(params.nchannels)
        w.setsampwidth(params.sampwidth)
        w.setframerate(rate)
        w.writeframes(frames[a * params.nchannels * params.sampwidth:b * params.nchannels * params.sampwidth])


def silent(dst, seconds=0.8, rate=22050):
    with wave.open(str(dst), "wb") as w:
        w.setnchannels(1); w.setsampwidth(2); w.setframerate(rate)
        w.writeframes(b"\x00\x00" * int(seconds * rate))


def main():
    scene_data = json.loads(SCENES.read_text(encoding="utf-8"))
    articles = json.loads(ARTICLES.read_text(encoding="utf-8"))
    paragraphs = {t["section"]: t["paragraphs"] for t in articles["texts"]}
    titles = {a["section"]: a.get("title", "") for a in scene_data["articles"]}
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    vo_index = {}
    for jf in VO.glob("*.json"):
        d = json.loads(jf.read_text(encoding="utf-8"))
        if d.get("kind") == "paragraph":
            vo_index[(d["section"], d["line_id"].split(".p")[-1])] = d
    scenes_plan, missing = {}, []
    for art in scene_data["articles"]:
        sec = art["section"]
        for sc in art["scenes"]:
            para_no = (sc.get("paragraphs") or [1])[0]
            body = paragraphs.get(sec, [])[para_no - 1] if para_no <= len(paragraphs.get(sec, [])) else ""
            sents = sentences(body)
            if not sents:
                missing.append(sc["id"]); continue
            text = sents[0]
            vo = vo_index.get((sec, f"{para_no:02d}"))
            wav = None
            if vo:
                match = next((s for s in vo.get("sentences", []) if s["text"].strip() == text), None)
                if match:
                    src = VO / f'{vo["line_id"]}.wav'
                    wav = OUT_DIR / f'{sc["id"]}.wav'
                    slice_wav(src, wav, match["start"], match["end"])
                    seconds = max(1.0, match["end"] - match["start"])
            if not wav:
                wav = OUT_DIR / f'{sc["id"]}.wav'
                silent(wav)
                seconds = 1.2
                missing.append(sc["id"])
            scenes_plan[sc["id"]] = {"text": text, "wav": str(wav.relative_to(ROOT)),
                                     "title": sc.get("title", ""), "seconds": round(seconds, 3)}
    cards = {}
    for sec in ("section_a", "section_b", "section_c"):
        p = (paragraphs.get(sec) or [""])[0]
        s = sentences(p)
        cards[sec] = {"text": s[0] if s else titles.get(sec, ""), "wav": str((OUT_DIR / f"card_{sec}.wav").relative_to(ROOT)),
                      "seconds": 2.0}
        silent(OUT_DIR / f"card_{sec}.wav", 2.0)
    first = next(iter(scenes_plan.values()), {"text": "", "wav": ""})
    plan = {
        "fps": 24,
        "intro": [dict(first), dict(first)],
        "cards": cards,
        "scenes": scenes_plan,
        "shots": json.loads((FILM / "plan.json").read_text(encoding="utf-8"))["shots"],
        "outro": dict(first),
    }
    PLAN.write_text(json.dumps(plan, ensure_ascii=False, indent=1), encoding="utf-8")
    print(f"TEXTBOOK_PLAN {PLAN} scenes={len(scenes_plan)} missing_audio={len(set(missing))}")


if __name__ == "__main__":
    main()
