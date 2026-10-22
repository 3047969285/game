import { describe, expect, it } from "vitest";
import type { WordEntry } from "../../../core/types";
import type { Rw3UnitContent } from "../../../infra/data";
import { buildAutoScript } from "../autoScript";
import { SECTION_KEYS, memoryScriptId } from "../ids";
import { stageTargets } from "../stages";
import { splitSentences } from "../text";
import { loadUnits, loadVocab } from "../testData";
import { validateScript, type Beat, type MemoryScript } from "../types";
import { PROLOGUE_SCRIPT, resolveMemoryScript } from "./index";

const units = loadUnits();
const vocab = loadVocab();
const unit1 = units[0] as Rw3UnitContent;

const wordsOf = (unit: Rw3UnitContent): WordEntry[] => (unit.word_ids ?? []).map((id) => vocab.get(id)!).filter(Boolean);
const wordMap = vocab;
const unit1Words = wordsOf(unit1);
const cases = units.flatMap((unit) => SECTION_KEYS.map((section) => ({ unit, section, words: wordsOf(unit) })));

const kinds = (script: MemoryScript): string[] => script.beats.map((b) => b.kind);
const of = <K extends Beat["kind"]>(script: MemoryScript, kind: K): Array<Extract<Beat, { kind: K }>> => script.beats.filter((b): b is Extract<Beat, { kind: K }> => b.kind === kind);

describe("手写脚本：开场 prologue", () => {
  it("通过引用校验（舞台部件、actor、选项）", () => {
    expect(validateScript(PROLOGUE_SCRIPT, { stageTargets: stageTargets(PROLOGUE_SCRIPT.stage) })).toEqual([]);
    expect(PROLOGUE_SCRIPT.stage).toBe("apartment2090");
  });

  it("按设计稿的节拍：雨与城市 → 六十四年 → 英语的声音 → 记忆回溯 → Ready / Not yet → 下潜", () => {
    const k = kinds(PROLOGUE_SCRIPT);
    expect(k[k.length - 1]).toBe("dive");
    const old = of(PROLOGUE_SCRIPT, "narrate").filter((n) => n.voice === "old");
    expect(old[0].text).toBe("It has been sixty-four years.");
    expect(old[1].text).toBe("I still remember the sound of English in that classroom.");
    const system = of(PROLOGUE_SCRIPT, "narrate").find((n) => n.voice === "system");
    expect(system?.text).toBe("Memory recall. Destination: 2026. University.");
    const choice = of(PROLOGUE_SCRIPT, "choice")[0];
    expect(choice.line).toBe("Are you ready?");
    expect(choice.options.map((o) => o.label)).toEqual(["Ready.", "Not yet."]);
    expect(choice.options.find((o) => o.label === "Not yet.")?.soft).toBe(true);
    expect(choice.viewer).toBe("old2090");
    // 开头先有几秒没有字幕的雨夜，再出现第一句话
    const firstNarrate = k.indexOf("narrate");
    expect(of(PROLOGUE_SCRIPT, "build").length).toBeGreaterThanOrEqual(3);
    expect(k.slice(0, firstNarrate).every((x) => x === "build" || x === "wait")).toBe(true);
  });

  it("公寓里的一切都会在开场里显形（不留永远看不见的部件）", () => {
    const built = new Set(of(PROLOGUE_SCRIPT, "build").flatMap((b) => b.targets));
    for (const target of stageTargets("apartment2090")) expect(built.has(target), target).toBe(true);
    expect(PROLOGUE_SCRIPT.actors.map((a) => a.id)).toEqual(["old2090"]);
  });

  it("所有字幕都有中文，句子完整", () => {
    for (const n of of(PROLOGUE_SCRIPT, "narrate")) {
      expect(n.zh, n.text).toBeTruthy();
      expect(n.text).toMatch(/^[A-Z].*[.?!]$/);
    }
  });
});

describe("resolveMemoryScript：所有段落都由 autoScript 按教材数据生成", () => {
  it("旧手写剧本《周四的沉默》（u01a）已退役：unit01/section_a 也用真实课文与通用舞台", () => {
    const script = resolveMemoryScript(unit1, unit1Words, "section_a");
    expect(script.id).toBe("u01a");
    expect(script.unitId).toBe("unit01");
    expect(script.section).toBe("section_a");
    expect(script.stage).toBe("emptyRoom");
    expect(script.title).not.toBe("Thursday's Silence");
    expect(script.titleZh).not.toBe("周四的沉默");
    // 通用脚本只有年轻的我与老师，没有旧剧本里的 Lin / Mei / An / Rui
    expect(script.actors.map((a) => a.id).sort()).toEqual(["me2026", "teacher"]);
    const freeze = of(script, "freeze")[0];
    expect(freeze.caption).not.toBe("Thursday's Silence");
    expect(freeze.caption).toBe(unit1.sections.section_a?.title ?? unit1.title);
    // 课文来自数据层，不是旧剧本里的 20 句
    const passage = unit1.sections.section_a?.passage ?? "";
    expect(script.acts!.flatMap((a) => a.sentences)).toEqual(splitSentences(passage));
    expect(script.acts!.flatMap((a) => a.sentences)).not.toHaveLength(20);
  });

  it("18 段回忆的 id / 舞台 / 标题 / 课文都与数据一致，且逐项等于 buildAutoScript", () => {
    expect(cases).toHaveLength(18);
    for (const { unit, section, words } of cases) {
      const script = resolveMemoryScript(unit, words, section);
      const label = `${unit.unit_id}/${section}`;
      expect(script.id, label).toBe(memoryScriptId(unit.unit_id, section));
      expect(script.unitId, label).toBe(unit.unit_id);
      expect(script.section, label).toBe(section);
      expect(script.stage, label).toBe("emptyRoom");
      expect(script.title, label).toBe(unit.sections[section]?.title ?? unit.title);
      expect(script.titleZh, label).toBe(unit.title_zh);
      expect(script, label).toEqual(buildAutoScript(unit, words, section, "emptyRoom"));
      const passage = unit.sections[section]?.passage ?? "";
      expect(script.acts!.flatMap((a) => a.sentences), label).toEqual(splitSentences(passage));
      expect(script.reward?.lightNode, label).toBe(`${unit.unit_id}:${section}`);
    }
  });

  it("18 段回忆都通过引用校验（舞台部件、词表、断片、选项）", () => {
    for (const { unit, section, words } of cases) {
      const script = resolveMemoryScript(unit, words, section);
      const ctx = { stageTargets: stageTargets(script.stage), words: new Map(words.map((w) => [w.id, w])) };
      expect(validateScript(script, ctx), `${unit.unit_id}/${section}`).toEqual([]);
    }
  });

  it("每个单元的第一个段落都有幕、有触碰、以定格收尾；下潜阶段是第二人称", () => {
    for (const { unit, section, words } of cases) {
      const script = resolveMemoryScript(unit, words, section);
      const k = kinds(script);
      expect(k.filter((x) => x === "acts"), `${unit.unit_id}/${section}`).toHaveLength(1);
      expect(k.indexOf("touch"), `${unit.unit_id}/${section}`).toBeGreaterThan(0);
      expect(k.indexOf("acts"), `${unit.unit_id}/${section}`).toBeGreaterThan(k.indexOf("touch"));
      expect(k[k.length - 1], `${unit.unit_id}/${section}`).toBe("freeze");
      for (const b of script.beats.slice(0, k.indexOf("touch"))) if (b.kind === "narrate") expect(b.pov).toBe("you");
    }
  });
});

describe("resolveMemoryScript：导入的教材原文", () => {
  it("passageOverride 传给自动脚本：句子换成原文，配套理解题不混用，断片仍以原文为准", () => {
    const own = Array.from({ length: 9 }, (_, i) => `A private sentence ${i} about a different subject.`).join(" ");
    const script = resolveMemoryScript(unit1, unit1Words, "section_a", own);
    expect(script.stage).toBe("emptyRoom");
    expect(script.acts!.flatMap((a) => a.sentences)).toEqual(splitSentences(own));
    expect(script.acts!.flatMap((a) => a.questions)).toEqual([]);
    expect(script.acts!.flatMap((a) => a.notes).every((note) => note.kind === "fill")).toBe(true);
    // 原文里没有单元词，断片不应凭空保留
    for (const act of script.acts!) {
      if (!act.gap) continue;
      const sentence = act.sentences[act.gap.sentence];
      const answer = wordMap.get(act.gap.answerWordId)!;
      expect(sentence.toLowerCase()).toContain(answer.word.toLowerCase());
    }
    expect(validateScript(script, { stageTargets: stageTargets(script.stage), words: wordMap })).toEqual([]);
  });
});
