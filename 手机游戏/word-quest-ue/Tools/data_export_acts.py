"""D9：把记忆剧情脚本（幕/镜头/台词/说话人/视角/触发词）导出为 Content/Data/memory/acts.json。

原理：用 esbuild 把 TS 源（acts.ts / autoScript.ts / scripts/*）打包成临时 mjs，node 执行
`resolveMemoryScript` 对 6 单元 × 3 段生成脚本，再提取为 JSON。

用法：
  python3 Tools/data_export_acts.py          # 生成并校验
  python3 Tools/data_export_acts.py --check   # 只校验已有 JSON
"""
from __future__ import annotations

import argparse
import json
import subprocess
import sys
import tempfile
from pathlib import Path

PROJECT = Path(__file__).resolve().parents[1]
GAME = PROJECT.parent / "word-quest-game"
NODE = Path.home() / "development" / "node" / "bin" / "node"
ESBUILD = GAME / "node_modules" / ".bin" / "esbuild"
CONTENT = GAME / "public" / "data" / "content" / "college_english_rw3"
VOCAB = GAME / "public" / "data" / "vocabulary" / "college_english_rw3.json"
OUT = PROJECT / "Content" / "Data" / "memory" / "acts.json"

RUNNER = r'''
import fs from "node:fs";
import { resolveMemoryScript } from __SCRIPTS_MODULE__;
import { PROLOGUE_SCRIPT } from __PROLOGUE_MODULE__;
import { CHARACTERS } from __CHARACTERS_MODULE__;
const GAME = __GAME__;
const CONTENT = __CONTENT__;
const VOCAB = __VOCAB__;
const OUT = __OUT__;

const units = ["unit01","unit02","unit03","unit04","unit05","unit06"].map((u) =>
  JSON.parse(fs.readFileSync(CONTENT + "/" + u + ".json", "utf8")));
const vocab = JSON.parse(fs.readFileSync(VOCAB, "utf8"));
const byId = new Map(vocab.words.map((w) => [w.id, w]));
const wordsOf = (unit) => unit.word_ids.map((id) => byId.get(id)).filter(Boolean);
const NAME_TO_ID = new Map(Object.values(CHARACTERS).map((c) => [c.name, c.id]));
function speakerId(s) {
  if (!s) return null;
  if (NAME_TO_ID.has(s)) return NAME_TO_ID.get(s);
  if (s === "Memory Recall") return "system";
  return s;
}

function cameraOf(c) {
  if (!c) return null;
  return { from: c.from ?? null, to: c.to ?? null, look: c.look ?? null, duration: c.duration ?? null, fov: c.fov ?? null, move: c.move ?? null };
}

function linesOf(script) {
  const lines = [];
  for (const b of script.beats ?? []) {
    if (b.kind === "narrate") lines.push({ kind: "narrate", pov: b.pov ?? null, speaker: speakerId(b.speaker), voice: b.voice ?? null, text: b.text ?? "", zh: b.zh ?? "", camera: cameraOf(b.camera) });
    else if (b.kind === "choice") lines.push({ kind: "choice", pov: null, speaker: speakerId(b.speaker), text: b.line ?? "", zh: b.zh ?? "", options: (b.options ?? []).map((o) => ({ wordId: o.wordId ?? null, label: o.label ?? null, reply: o.reply ?? "", correct: !!o.correct })), camera: cameraOf(b.camera) });
    else if (b.kind === "gap") lines.push({ kind: "gap", pov: null, speaker: null, text: b.sentence ?? "", zh: b.zh ?? "", answerWordId: b.answerWordId, camera: cameraOf(b.camera) });
    else if (b.kind === "touch") lines.push({ kind: "touch", pov: "you", speaker: null, text: b.prompt ?? "", zh: b.zh ?? "", wordIds: b.wordIds ?? [] });
    else if (b.kind === "freeze") lines.push({ kind: "freeze", pov: null, speaker: null, text: b.caption ?? "", zh: b.zh ?? "", epilogue: b.epilogue ?? null });
  }
  return lines;
}

function camerasOf(script) {
  const out = [];
  for (const b of script.beats ?? []) if (b.camera) out.push(cameraOf(b.camera));
  for (const act of script.acts ?? []) for (const cue of act.cues ?? []) if (cue.camera) out.push(cameraOf(cue.camera));
  return out;
}

function actsOf(script) {
  return (script.acts ?? []).map((a) => ({
    index: a.index, start: a.start, sentences: a.sentences ?? [], wordIds: a.wordIds ?? [],
    questions: a.questions ?? [], notes: a.notes ?? [], build: a.build ?? [], gap: a.gap ?? null,
    dialog: a.dialog ? { ...a.dialog, speaker: speakerId(a.dialog.speaker) } : null,
    cues: (a.cues ?? []).map((c) => ({ zh: c.zh ?? null, build: c.build ?? null, camera: cameraOf(c.camera) })),
  }));
}

const output = {
  meta: { source: "src/features/memory/{acts,autoScript,scripts}", generatedBy: "Tools/data_export_acts.py", units: units.length },
  prologue: {
    id: PROLOGUE_SCRIPT.id, title: PROLOGUE_SCRIPT.title, titleZh: PROLOGUE_SCRIPT.titleZh,
    stage: PROLOGUE_SCRIPT.stage, weather: PROLOGUE_SCRIPT.weather ?? null, look: PROLOGUE_SCRIPT.look ?? null,
    actors: (PROLOGUE_SCRIPT.actors ?? []).map((a) => ({ id: a.id, name: a.name, pose: a.pose ?? null })),
    lines: linesOf(PROLOGUE_SCRIPT), cameras: camerasOf(PROLOGUE_SCRIPT), acts: actsOf(PROLOGUE_SCRIPT),
  },
  units: units.map((unit) => ({
    unitId: unit.unit_id, unitNumber: unit.unit_number, title: unit.title, titleZh: unit.title_zh,
    sections: ["section_a", "section_b", "section_c"].map((section) => {
      const script = resolveMemoryScript(unit, wordsOf(unit), section);
      return {
        section, scriptId: script.id, title: script.title, titleZh: script.titleZh,
        stage: script.stage, weather: script.weather ?? null, look: script.look ?? null,
        organizer: script.organizer ?? null, student: script.student ?? null,
        actors: (script.actors ?? []).map((a) => ({ id: a.id, name: a.name, pose: a.pose ?? null })),
        lines: linesOf(script), cameras: camerasOf(script), acts: actsOf(script),
      };
    }),
  })),
};
fs.mkdirSync(OUT.substring(0, OUT.lastIndexOf("/")), { recursive: true });
fs.writeFileSync(OUT, JSON.stringify(output, null, 1));
const actCount = output.units.reduce((n, u) => n + u.sections.reduce((m, s) => m + s.acts.length, 0), 0);
const lineCount = output.prologue.lines.length + output.units.reduce((n, u) => n + u.sections.reduce((m, s) => m + s.lines.length, 0), 0);
console.log(JSON.stringify({ units: output.units.length, sections: output.units.length * 3, acts: actCount, lines: lineCount }));
'''


def _ts_literal(s: str) -> str:
    return json.dumps(str(s))


def build_runner(tmpdir: Path) -> Path:
    src = RUNNER
    src = src.replace("__SCRIPTS_MODULE__", _ts_literal(str(GAME / "src" / "features" / "memory" / "scripts" / "index.ts")))
    src = src.replace("__PROLOGUE_MODULE__", _ts_literal(str(GAME / "src" / "features" / "memory" / "scripts" / "prologue.ts")))
    src = src.replace("__CHARACTERS_MODULE__", _ts_literal(str(GAME / "src" / "features" / "memory" / "characters.ts")))
    src = src.replace("__GAME__", _ts_literal(str(GAME)))
    src = src.replace("__CONTENT__", _ts_literal(str(CONTENT)))
    src = src.replace("__VOCAB__", _ts_literal(str(VOCAB)))
    src = src.replace("__OUT__", _ts_literal(str(OUT)))
    runner = tmpdir / "acts_runner.ts"
    runner.write_text(src, encoding="utf-8")
    return runner


def run_export() -> dict:
    if not NODE.is_file():
        raise SystemExit(f"node not found: {NODE}")
    if not ESBUILD.is_file():
        raise SystemExit(f"esbuild not found: {ESBUILD}")
    with tempfile.TemporaryDirectory() as td:
        tmpdir = Path(td)
        runner = build_runner(tmpdir)
        bundled = tmpdir / "acts_runner.mjs"
        subprocess.run([str(ESBUILD), str(runner), "--bundle", "--platform=node",
                        "--format=esm", f"--outfile={bundled}", "--log-level=warning"],
                       check=True, capture_output=True, text=True)
        proc = subprocess.run([str(NODE), str(bundled)], capture_output=True, text=True)
        if proc.returncode != 0:
            raise SystemExit(f"node runner failed:\n{proc.stderr[-4000:]}")
        print("[D9] " + proc.stdout.strip())
    return json.loads(OUT.read_text(encoding="utf-8"))


def check(data: dict) -> dict:
    units = data["units"]
    assert len(units) == 6, len(units)
    sections = [s for u in units for s in u["sections"]]
    assert len(sections) == 18
    for s in sections:
        assert s["acts"], f"{s['scriptId']} has no acts"
        assert all(a["sentences"] for a in s["acts"]), f"{s['scriptId']} empty act"
        assert s["title"] and s["titleZh"]
    # 幕数、台词数、说话人统计
    known = {"me2026", "lin", "mei", "an", "rui", "organizer", "old2090", "system", "young", "old"}
    speakers = set()
    act_total = 0
    line_total = len(data["prologue"]["lines"])
    for s in sections:
        act_total += len(s["acts"])
        line_total += len(s["lines"])
        for line in s["lines"]:
            if line.get("speaker"):
                speakers.add(line["speaker"])
    result = {
        "units": len(units), "sections": len(sections), "acts": act_total, "lines": line_total,
        "prologueLines": len(data["prologue"]["lines"]),
        "unknownSpeakers": sorted(speakers - known),
        "actCountBySection": {s["scriptId"]: len(s["acts"]) for s in sections},
    }
    return result


def main(argv=None) -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--check", action="store_true")
    args = ap.parse_args(argv)
    data = json.loads(OUT.read_text(encoding="utf-8")) if args.check and OUT.is_file() else run_export()
    result = check(data)
    print("[D9] " + json.dumps(result, ensure_ascii=False))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
