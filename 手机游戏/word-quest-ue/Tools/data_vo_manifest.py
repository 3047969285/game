"""D13：从 acts.json + 课文数据生成配音清单 Content/Data/vo/vo_manifest.csv。

字段：line_id, speaker, language, text, context, emotion, est_seconds, source
- 课文逐句朗读（TTS）speaker = tts_reader
- 旁白 / 系统提示 speaker = narrator / system
- 角色台词 speaker = 角色 ID（me2026/lin/mei/an/rui/organizer/old2090）
"""
from __future__ import annotations

import argparse
import csv
import json
import re
from pathlib import Path

PROJECT = Path(__file__).resolve().parents[1]
ACTS = PROJECT / "Content" / "Data" / "memory" / "acts.json"
OUT_DIR = PROJECT / "Content" / "Data" / "vo"
OUT_CSV = OUT_DIR / "vo_manifest.csv"
SUMMARY = OUT_DIR / "vo_summary.json"
FIELDS = ["line_id", "speaker", "language", "text", "context", "emotion", "est_seconds", "source"]
SPEAKERS = {"me2026", "lin", "mei", "an", "rui", "organizer", "old2090", "system", "narrator", "tts_reader"}

EMOTION = {
    "prologue": "gentle, nostalgic, quiet",
    "narrate": "calm, reflective",
    "choice": "questioning, warm",
    "gap": "tentative, searching",
    "freeze": "tender, melancholic",
    "reading": "clear, measured (TTS)",
    "dialog": "natural, conversational",
}


def est_seconds(text: str) -> float:
    words = max(1, len(re.findall(r"[A-Za-z']+", text)))
    pauses = len(re.findall(r"[,.!?;:]", text)) * 0.18
    return round(words / 2.6 + pauses + 0.25, 2)


def make_row(line_id, speaker, text, context, emotion, source):
    return {"line_id": line_id, "speaker": speaker, "language": "en", "text": text,
            "context": context, "emotion": emotion, "est_seconds": est_seconds(text), "source": source}


def collect(acts: dict) -> list[dict]:
    rows: list[dict] = []
    # 1) prologue
    for i, line in enumerate(acts["prologue"]["lines"]):
        speaker = line.get("speaker") or "narrator"
        rows.append(make_row(f"vo.prologue.l{i:03d}", speaker, line["text"],
                             f"prologue · {line['kind']} · pov={line.get('pov')}",
                             EMOTION["prologue"], "acts.json:prologue"))
    # 2) 课文逐句朗读 + 剧本台词/对话
    for unit in acts["units"]:
        for sec in unit["sections"]:
            sid = sec["scriptId"]
            for act in sec["acts"]:
                for j, sentence in enumerate(act["sentences"]):
                    rows.append(make_row(f"vo.reading.{unit['unitId']}.{sec['section']}.a{act['index']}.s{j}",
                                         "tts_reader", sentence,
                                         f"{unit['unitId']} {sec['section']} act {act['index']} sentence {j} (read aloud)",
                                         EMOTION["reading"], f"acts.json:{sid}:act{act['index']}"))
                dialog = act.get("dialog")
                if dialog and dialog.get("line"):
                    sp = dialog.get("speaker") or "narrator"
                    rows.append(make_row(f"vo.dialog.{sid}.a{act['index']}", sp, dialog["line"],
                                         f"{sid} act {act['index']} dialog · zh: {dialog.get('zh', '')}",
                                         EMOTION["dialog"], f"acts.json:{sid}:dialog"))
            for i, line in enumerate(sec["lines"]):
                if line["kind"] in ("touch", "gap"):
                    continue  # 这些是提示/答案，不做配音
                speaker = line.get("speaker") or ("narrator" if line["kind"] in ("narrate", "freeze") else "system")
                rows.append(make_row(f"vo.script.{sid}.l{i:03d}", speaker, line["text"],
                                     f"{sid} · {line['kind']} · pov={line.get('pov')} · zh: {line.get('zh', '')}",
                                     EMOTION.get(line["kind"], "calm"), f"acts.json:{sid}:line{i}"))
    return rows


def write(rows: list[dict]) -> dict:
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    with OUT_CSV.open("w", encoding="utf-8-sig", newline="") as fh:
        w = csv.DictWriter(fh, fieldnames=FIELDS)
        w.writeheader()
        w.writerows(rows)
    speaker_stats: dict[str, dict] = {}
    for r in rows:
        st = speaker_stats.setdefault(r["speaker"], {"lines": 0, "seconds": 0.0})
        st["lines"] += 1
        st["seconds"] = round(st["seconds"] + r["est_seconds"], 2)
    summary = {"total_lines": len(rows), "total_seconds": round(sum(r["est_seconds"] for r in rows), 1),
               "speakers": dict(sorted(speaker_stats.items(), key=lambda kv: -kv[1]["lines"]))}
    SUMMARY.write_text(json.dumps(summary, ensure_ascii=False, indent=1), encoding="utf-8")
    return summary


def validate(rows: list[dict]) -> list[str]:
    errors = []
    seen = set()
    for r in rows:
        if r["line_id"] in seen:
            errors.append("duplicate line_id " + r["line_id"])
        seen.add(r["line_id"])
        if r["speaker"] not in SPEAKERS:
            errors.append("unknown speaker " + r["speaker"])
        if not r["text"].strip() or not r["context"].strip():
            errors.append("empty text/context " + r["line_id"])
        if r["est_seconds"] <= 0:
            errors.append("bad est_seconds " + r["line_id"])
    return errors


def main(argv=None) -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--check", action="store_true")
    args = ap.parse_args(argv)
    acts = json.loads(ACTS.read_text(encoding="utf-8"))
    rows = collect(acts)
    errors = validate(rows)
    if errors:
        raise SystemExit("VO manifest errors:\n" + "\n".join(errors[:10]))
    summary = write(rows)
    print("[D13] " + json.dumps(summary, ensure_ascii=False)[:600])
    if args.check:
        print("[D13] check OK")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
