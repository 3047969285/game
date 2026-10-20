import { describe, expect, it } from "vitest";
import type { WordEntry } from "../../core/types";
import type { Rw3UnitContent } from "../../infra/data";
import { buildAutoScript } from "./autoScript";
import { SECTION_KEYS, memoryScriptId } from "./ids";
import { MEMORY_OBJECTS } from "./memoryObjects";
import { stageTargets } from "./stages";
import { splitSentences } from "./text";
import { loadUnits, loadVocab } from "./testData";
import { findWordToken, validateScript, type Beat } from "./types";

const vocab = loadVocab();
const units = loadUnits();

function unitWords(unit: Rw3UnitContent): WordEntry[] {
  return (unit.word_ids ?? []).map((id) => vocab.get(id)!).filter(Boolean);
}

const cases = units.flatMap((unit) => SECTION_KEYS.map((section) => ({ unit, section, label: `${unit.unit_id}/${section}` })));

describe("buildAutoScript：6 个单元 × A/B/C 全部可生成（基于幕）", () => {
  it("覆盖 18 段回忆", () => {
    expect(cases).toHaveLength(18);
  });

  for (const { unit, section, label } of cases) {
    describe(label, () => {
      const words = unitWords(unit);
      const wordIds = new Set(words.map((w) => w.id));
      const script = buildAutoScript(unit, words, section);
      const passage = unit.sections[section]?.passage ?? "";
      const acts = script.acts!;

      it("id 与舞台正确，且通过 validateScript", () => {
        expect(script.id).toBe(memoryScriptId(unit.unit_id, section));
        expect(script.unitId).toBe(unit.unit_id);
        const errors = validateScript(script, { stageTargets: stageTargets(script.stage), words: vocab });
        expect(errors).toEqual([]);
      });

      it("全文都在幕里（每幕 3–6 句），题目 / 翻译 / 写作都分配了", () => {
        expect(acts.flatMap((a) => a.sentences)).toEqual(splitSentences(passage));
        for (const a of acts) {
          expect(a.sentences.length).toBeGreaterThanOrEqual(3);
          expect(a.sentences.length).toBeLessThanOrEqual(6);
        }
        expect(acts.flatMap((a) => a.questions).length).toBeGreaterThanOrEqual(4);
        expect(acts.flatMap((a) => a.notes).filter((n) => n.kind === "translate").length).toBe(unit.sections.translation?.sentences?.length);
        expect(acts.flatMap((a) => a.notes).some((n) => n.kind === "outline")).toBe(true);
      });

      it("节拍：下潜(you) → 触碰 → 入场 → 幕 → 定格；旁白里没有课文以外的断片 / 附身", () => {
        const k = script.beats.map((b) => b.kind);
        expect(k.indexOf("touch")).toBeGreaterThan(0);
        expect(k.indexOf("acts")).toBeGreaterThan(k.indexOf("touch"));
        expect(k[k.length - 1]).toBe("freeze");
        const narrates = script.beats.filter((b): b is Extract<Beat, { kind: "narrate" }> => b.kind === "narrate");
        expect(narrates[0].pov).toBe("you");
        for (const bad of ["gap", "choice", "paper"]) expect(k).not.toContain(bad);
      });

      it("断片：每个有单元词的幕都尽量有一次；答案词出现在句子里，干扰词不同于答案、不在句子里、都已摆放", () => {
        const placed = new Set(script.objects.map((o) => o.wordId));
        const gaps = acts.filter((a) => a.gap);
        expect(gaps.length).toBeGreaterThanOrEqual(Math.min(3, acts.length - 1));
        for (const a of gaps) {
          const g = a.gap!;
          const sentence = a.sentences[g.sentence];
          expect(wordIds.has(g.answerWordId)).toBe(true);
          expect(findWordToken(sentence, vocab.get(g.answerWordId)!.word)).not.toBeNull();
          expect(g.decoyWordIds.length).toBeGreaterThanOrEqual(1);
          for (const d of g.decoyWordIds) {
            expect(d).not.toBe(g.answerWordId);
            expect(wordIds.has(d)).toBe(true);
            expect(placed.has(d)).toBe(true);
            expect(findWordToken(sentence, vocab.get(d)!.word)).toBeNull();
          }
          expect(placed.has(g.answerWordId)).toBe(true);
        }
        // 一个词只做一次答案
        expect(new Set(gaps.map((a) => a.gap!.answerWordId)).size).toBe(gaps.length);
      });

      it("touch 在下潜与电影之间，且触碰的词都有物件、不是断片的答案", () => {
        const touch = script.beats.find((b): b is Extract<Beat, { kind: "touch" }> => b.kind === "touch")!;
        expect(touch.wordIds.length).toBeGreaterThanOrEqual(4);
        const placed = new Set(script.objects.map((o) => o.wordId));
        const answers = new Set(acts.flatMap((a) => (a.gap ? [a.gap.answerWordId] : [])));
        for (const id of touch.wordIds) {
          expect(placed.has(id)).toBe(true);
          expect(answers.has(id)).toBe(false);
        }
      });

      it("年轻的我与老师就座，第一人称由老师提问；单元 1 有手机干扰，其它单元没有", () => {
        expect(script.student).toBe("me2026");
        expect(script.organizer).toBe("teacher");
        expect(script.actors.map((a) => a.id).sort()).toEqual(["me2026", "teacher"]);
        expect(script.beats.filter((b) => b.kind === "actor" && b.action === "enter")).toHaveLength(2);
        expect(Boolean(script.distraction)).toBe(unit.unit_id === "unit01");
      });

      it("物件数量在摆放位容量内；同一输入生成同一脚本", () => {
        expect(script.objects.length).toBeLessThanOrEqual(14);
        expect(JSON.stringify(buildAutoScript(unit, words, section))).toBe(JSON.stringify(script));
      });
    });
  }
});

describe("buildAutoScript：导入的教材原文", () => {
  it("passageOverride 替换课文，其余照旧", () => {
    const unit = units[0];
    const own = Array.from({ length: 10 }, (_, i) => `A sentence number ${i} in my own copy of the book, about a device.`).join(" ");
    const script = buildAutoScript(unit, unitWords(unit), "section_a", "emptyRoom", own);
    expect(script.acts!.flatMap((a) => a.sentences)).toEqual(splitSentences(own));
    expect(validateScript(script, { stageTargets: stageTargets(script.stage), words: vocab })).toEqual([]);
  });
});

describe("单元 1 的 30 个词物件", () => {
  it("手写条目与单元词表一一对应", () => {
    const ids = unitWords(units[0]).map((w) => w.id);
    expect(ids).toHaveLength(30);
    for (const id of ids) expect(MEMORY_OBJECTS[id]).toBeDefined();
  });
});
