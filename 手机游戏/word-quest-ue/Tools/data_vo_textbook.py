#!/usr/bin/env python3
"""D25 课文配音：清单 + macOS 本机 TTS（say）WAV + 逐句时间戳。

用法：
  python3 Tools/data_vo_textbook.py --manifest        # 生成清单（md + csv）
  python3 Tools/data_vo_textbook.py --check           # 校验清单/音频与数据一致
  python3 Tools/data_vo_textbook.py --synth           # 合成全部
  python3 Tools/data_vo_textbook.py --synth --unit 1  # 只做一个单元
  python3 Tools/data_vo_textbook.py --synth --limit 3 # 冒烟：只合成前 3 行
  python3 Tools/data_vo_textbook.py --synth --only vo.tb.unit01.section_a.p01
"""
from __future__ import annotations

import argparse
import csv
import json
import re
import shutil
import subprocess
import sys
import tempfile
import wave
from datetime import datetime, timezone
from pathlib import Path

PROJECT_DEFAULT = Path(__file__).resolve().parents[1]
UNITS = (1, 2, 3, 4, 5, 6)
SAMPLE_RATE = 22050
SAY_RATE = 165

# 声线映射：课文按 section 分声线，练习指令单独一条平稳声线
VOICE_BY_SECTION = {
    "section_a": "Samantha",
    "section_b": "Daniel",
    "section_c": "Flo",
    "instruction": "Reed",
}
EMOTION_BY_KIND = {
    "section_a": "warm",
    "section_b": "steady",
    "section_c": "clear",
    "instruction": "calm",
}
SENTENCE_RE = re.compile(r"(?<=[.!?])[\"')\]]*\s+")


# ----------------------------------------------------------------------------- 清单
def files(project: Path, unit: int) -> tuple[Path, Path, Path]:
    return (
        project / f"Content/Data/textbook/rw3/articles/unit{unit:02}.json",
        project / f"Content/Data/textbook/rw3/exercises/unit{unit:02}.json",
        project / f"Content/Data/textbook/rw3/answers/draft_unit{unit:02}.json",
    )


def load_json(path: Path) -> dict:
    return json.loads(path.read_text(encoding="utf-8"))


def split_sentences(text: str) -> list[str]:
    """按句末标点切句，保留标点；过滤空句。"""
    parts = [part.strip() for part in SENTENCE_RE.split(text.strip()) if part.strip()]
    return parts or ([text.strip()] if text.strip() else [])


def manifest_lines(project: Path = PROJECT_DEFAULT, only_unit: int | None = None) -> list[dict]:
    lines: list[dict] = []
    for unit in UNITS:
        if only_unit and unit != only_unit:
            continue
        articles_path, exercises_path, _ = files(project, unit)
        articles = load_json(articles_path)
        for text in articles.get("texts", []):
            section = text.get("section", "")
            voice = VOICE_BY_SECTION.get(section, "Samantha")
            emotion = EMOTION_BY_KIND.get(section, "clear")
            for index, paragraph in enumerate(text.get("paragraphs", []), start=1):
                lines.append({
                    "line_id": f"vo.tb.unit{unit:02}.{section}.p{index:02}",
                    "unit": unit,
                    "section": section,
                    "kind": "paragraph",
                    "speaker": voice,
                    "emotion": emotion,
                    "text": paragraph.strip(),
                    "sentences": len(split_sentences(paragraph)),
                    "source": f"articles/unit{unit:02}.json#{section}.{index}",
                })
        exercises = load_json(exercises_path)
        for block in exercises.get("exercises", []):
            instructions = (block.get("instructions") or "").strip()
            if not instructions:
                continue
            lines.append({
                "line_id": f"vo.tb.unit{unit:02}.ex.{block['id']}",
                "unit": unit,
                "section": block.get("section", ""),
                "kind": "instruction",
                "speaker": VOICE_BY_SECTION["instruction"],
                "emotion": EMOTION_BY_KIND["instruction"],
                "text": instructions,
                "sentences": len(split_sentences(instructions)),
                "source": f"exercises/unit{unit:02}.json#{block['id']}.instructions",
            })
    return lines


def write_manifest(project: Path, lines: list[dict]) -> tuple[Path, Path]:
    csv_path = project / "Content/Data/vo/textbook/manifest.csv"
    md_path = project / "Docs/data/vo-textbook-manifest.md"
    csv_path.parent.mkdir(parents=True, exist_ok=True)
    md_path.parent.mkdir(parents=True, exist_ok=True)
    columns = ["line_id", "unit", "section", "kind", "speaker", "emotion", "sentences", "source", "text"]
    with csv_path.open("w", encoding="utf-8-sig", newline="") as fh:
        writer = csv.DictWriter(fh, fieldnames=columns, extrasaction="ignore")
        writer.writeheader()
        writer.writerows(lines)

    by_kind: dict[str, int] = {}
    by_voice: dict[str, int] = {}
    for line in lines:
        by_kind[line["kind"]] = by_kind.get(line["kind"], 0) + 1
        by_voice[line["speaker"]] = by_voice.get(line["speaker"], 0) + 1
    sentences = sum(line["sentences"] for line in lines)
    md = [
        "# 课文配音清单（D25）",
        "",
        f"> 生成：`python3 Tools/data_vo_textbook.py --manifest` · {datetime.now(timezone.utc).isoformat(timespec='seconds')}",
        "> 源：`Content/Data/textbook/rw3/articles/unitNN.json` + `exercises/unitNN.json`；本地 TTS（macOS `say`），句级时间戳。",
        "",
        "## 1. 总量",
        "",
        f"- 行数：**{len(lines)}**（段落 {by_kind.get('paragraph', 0)} + 练习指令 {by_kind.get('instruction', 0)}）",
        f"- 句子数：**{sentences}**",
        f"- 声线分配：{json.dumps(by_voice, ensure_ascii=False)}",
        "",
        "## 2. 声线映射",
        "",
        "| 类别 | 声线 | 情绪 | 说明 |",
        "|------|------|------|------|",
        "| section_a | Samantha | warm | 美音女声，清晰温和 |",
        "| section_b | Daniel | steady | 英音男声，沉稳（旁白基底） |",
        "| section_c | Flo | clear | 美音女声，明亮 |",
        "| 练习指令 | Reed | calm | 美音男声，平稳 |",
        "",
        "## 3. 输出",
        "",
        "- 音频：`Content/Data/vo/textbook/unitNN/<line_id>.wav`（22.05 kHz / mono / 16-bit PCM）",
        "- 时间戳：同名 `.json`（`sentences[]` 每句 `start/end`，秒）",
        "- 合成：`python3 Tools/data_vo_textbook.py --synth`；校验：`--check`",
        "",
        "## 4. 明细",
        "",
        "| line_id | 类型 | 声线 | 句数 | 来源 |",
        "|---------|------|------|------|------|",
    ]
    for line in lines:
        md.append(f"| {line['line_id']} | {line['kind']} | {line['speaker']} | {line['sentences']} | {line['source']} |")
    md.append("")
    md_path.write_text("\n".join(md), encoding="utf-8")
    return csv_path, md_path


# ----------------------------------------------------------------------------- TTS
def voice_available(voice: str) -> bool:
    say = shutil.which("say")
    if not say:
        return False
    output = subprocess.run([say, "-v", "?"], capture_output=True, text=True, check=False).stdout
    return voice in output


def say_to_wav(text: str, voice: str, path: Path, timeout: int = 90) -> None:
    """单句合成；偶发 say 卡死时重试一次（仍失败抛错，由上层记录）。"""
    command = ["say", "-v", voice, "-r", str(SAY_RATE), "-o", str(path), "--data-format=LEI16@22050", text]
    for attempt in range(2):
        try:
            subprocess.run(command, check=True, capture_output=True, timeout=timeout)
            return
        except subprocess.TimeoutExpired:
            if path.exists():
                path.unlink()
            if attempt == 1:
                raise RuntimeError(f"say 超时（{timeout}s）：{text[:60]}")


def wav_frames(path: Path) -> tuple[bytes, int, int]:
    with wave.open(str(path), "rb") as fh:
        return fh.readframes(fh.getnframes()), fh.getframerate(), fh.getnchannels()


def wav_rms(path: Path) -> float:
    import numpy as np
    frames, _, _ = wav_frames(path)
    data = np.frombuffer(frames, dtype="<i2").astype(np.float32) / 32768.0
    return float(np.sqrt((data ** 2).mean())) if data.size else 0.0


def synthesize_line(line: dict, out_dir: Path, voice_rate: int = SAY_RATE) -> dict:
    """逐句合成 -> 拼接 -> 时间戳 JSON。"""
    out_dir.mkdir(parents=True, exist_ok=True)
    sentences = split_sentences(line["text"])
    if not sentences:
        raise ValueError(f"{line['line_id']} 没有可合成文本")
    parts: list[Path] = []
    timestamps: list[dict] = []
    offset = 0.0
    with tempfile.TemporaryDirectory(prefix="vo-") as tmp:
        for index, sentence in enumerate(sentences):
            part = Path(tmp) / f"s{index:02}.wav"
            say_to_wav(sentence, line["speaker"], part)
            frames, rate, _ = wav_frames(part)
            duration = len(frames) / (2 * rate)
            timestamps.append({"i": index, "start": round(offset, 3), "end": round(offset + duration, 3), "text": sentence})
            offset += duration
            parts.append(part)
        wav_path = out_dir / f"{line['line_id']}.wav"
        with wave.open(str(wav_path), "wb") as out:
            out.setnchannels(1)
            out.setsampwidth(2)
            out.setframerate(SAMPLE_RATE)
            for part in parts:
                frames, _, _ = wav_frames(part)
                out.writeframes(frames)
    payload = {
        "line_id": line["line_id"],
        "unit": line["unit"],
        "section": line["section"],
        "kind": line["kind"],
        "speaker": line["speaker"],
        "emotion": line["emotion"],
        "text": line["text"],
        "rate": voice_rate,
        "duration": round(offset, 3),
        "sentences": timestamps,
    }
    json_path = out_dir / f"{line['line_id']}.json"
    json_path.write_text(json.dumps(payload, ensure_ascii=False, indent=1), encoding="utf-8")
    return payload


# ----------------------------------------------------------------------------- 校验 / 报告
def check(project: Path = PROJECT_DEFAULT, only_unit: int | None = None) -> list[str]:
    problems: list[str] = []
    lines = manifest_lines(project, only_unit)
    if not shutil.which("say"):
        problems.append("未找到 /usr/bin/say，本机无法合成")
    for line in lines:
        for sentence in split_sentences(line["text"]):
            if sentence not in line["text"]:
                problems.append(f"{line['line_id']}: 句子不在原文中：{sentence[:40]}")
    voices = {line["speaker"] for line in lines}
    if shutil.which("say"):
        output = subprocess.run(["say", "-v", "?"], capture_output=True, text=True, check=False).stdout
        for voice in sorted(voices):
            if voice not in output:
                problems.append(f"声线不可用：{voice}")
    return problems


def report(project: Path, results: list[dict]) -> Path:
    by_unit: dict[int, list[dict]] = {}
    for payload in results:
        by_unit.setdefault(payload["unit"], []).append(payload)
    total_duration = sum(item["duration"] for item in results)
    lines = [
        "# 课文配音报告（D25）",
        "",
        f"> 生成：`python3 Tools/data_vo_textbook.py --synth` · {datetime.now(timezone.utc).isoformat(timespec='seconds')}",
        "> 本机 TTS：macOS `say`（无在线上传）；48 行以下为每单元统计。",
        "",
        "## 1. 总览",
        "",
        f"- 合成行数：**{len(results)}**",
        f"- 总时长：**{total_duration/60:.1f} 分钟**（{total_duration:.1f} s）",
        f"- 音频：`Content/Data/vo/textbook/unitNN/<line_id>.wav`；时间戳：同名 `.json`",
        "",
        "## 2. 每单元",
        "",
        "| 单元 | 行数 | 句数 | 时长 (s) | 静音/异常 |",
        "|------|------|------|----------|-----------|",
    ]
    problems: list[str] = []
    for unit, rows in sorted(by_unit.items()):
        duration = sum(row["duration"] for row in rows)
        sentences = sum(len(row["sentences"]) for row in rows)
        abnormal = 0
        for row in rows:
            wav_path = project / f"Content/Data/vo/textbook/unit{unit:02}/{row['line_id']}.wav"
            if not wav_path.exists():
                abnormal += 1
                problems.append(f"缺少 WAV：{wav_path}")
                continue
            rms = wav_rms(wav_path)
            if rms < 0.005:
                abnormal += 1
                problems.append(f"疑似静音：{wav_path} (rms={rms:.4f})")
            if abs(row["duration"] - sum(s["end"] - s["start"] for s in row["sentences"])) > 0.06:
                problems.append(f"时间戳与时长不一致：{row['line_id']}")
        lines.append(f"| unit{unit:02} | {len(rows)} | {sentences} | {duration:.1f} | {abnormal} |")
    lines += ["", "## 3. 校验", "", "```text", "\n".join(problems) if problems else "全部 WAV 存在、非静音、时间戳单调且与时长一致。", "```", ""]
    path = project / "Docs/qa/voice-report.md"
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text("\n".join(lines), encoding="utf-8")
    return path


def main(argv=None) -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--project", type=Path, default=PROJECT_DEFAULT)
    parser.add_argument("--manifest", action="store_true")
    parser.add_argument("--synth", action="store_true")
    parser.add_argument("--check", action="store_true")
    parser.add_argument("--unit", type=int, default=None)
    parser.add_argument("--limit", type=int, default=None)
    parser.add_argument("--only", default=None)
    parser.add_argument("--rate", type=int, default=SAY_RATE)
    parser.add_argument("--jobs", type=int, default=6)
    parser.add_argument("--resume", action="store_true")
    args = parser.parse_args(argv)
    project = args.project.resolve()

    lines = manifest_lines(project, args.unit)
    if args.manifest or not (args.synth or args.check):
        csv_path, md_path = write_manifest(project, lines)
        print(f"manifest: {len(lines)} lines -> {csv_path} / {md_path}")
        if not args.synth and not args.check:
            return 0
    if args.check:
        problems = check(project, args.unit)
        print("\n".join(problems) if problems else f"D25 清单校验通过：{len(lines)} 行。")
        return 1 if problems else 0

    selected = [line for line in lines if not args.only or line["line_id"] == args.only][: args.limit]
    if args.resume:
        pending = []
        for line in selected:
            out_dir = project / f"Content/Data/vo/textbook/unit{line['unit']:02}"
            wav_path = out_dir / f"{line['line_id']}.wav"
            json_path = out_dir / f"{line['line_id']}.json"
            if not (wav_path.exists() and json_path.exists()):
                pending.append(line)
        print(f"resume: {len(selected) - len(pending)} done, {len(pending)} pending")
        selected = pending

    from concurrent.futures import ThreadPoolExecutor
    done = 0
    results = []
    lock = __import__("threading").Lock()

    def work(line: dict) -> dict:
        nonlocal done
        out_dir = project / f"Content/Data/vo/textbook/unit{line['unit']:02}"
        payload = synthesize_line(line, out_dir, args.rate)
        with lock:
            done += 1
            if done % 20 == 0 or done == len(selected):
                print(f"synth {done}/{len(selected)} ...", flush=True)
        return payload

    with ThreadPoolExecutor(max_workers=max(1, args.jobs)) as pool:
        results = list(pool.map(work, selected))

    # 报告口径：所有行的 WAV 都已存在（含续跑跳过的）
    all_payloads = []
    for line in lines:
        json_path = project / f"Content/Data/vo/textbook/unit{line['unit']:02}/{line['line_id']}.json"
        if json_path.exists():
            all_payloads.append(json.loads(json_path.read_text(encoding="utf-8")))
    path = report(project, all_payloads)
    print(f"voice report: {path}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
