import { describe, expect, it } from "vitest";
import type { WordEntry } from "../../core/types";
import type { Rw3UnitContent } from "../../infra/data";
import { buildAutoScript } from "./autoScript";
import { SECTION_KEYS, memoryScriptId } from "./ids";
import { MEMORY_OBJECTS } from "./memoryObjects";
import { stageTargets } from "./stages";
import { loadUnits, loadVocab } from "./testData";
import { paperSlotIds, findWordToken, validateScript, type Beat } from "./types";

const vocab = loadVocab();
const units = loadUnits();

function unitWords(unit: Rw3UnitContent): WordEntry[] {
  return (unit.word_ids ?? []).map((id) => vocab.get(id)!).filter(Boolean);
}

const cases = units.flatMap((unit) => SECTION_KEYS.map((section) => ({ unit, section, label: `${unit.unit_id}/${section}` })));

describe("buildAutoScript：6 个单元 × A/B/C 全部可生成", () => {
  it("覆盖 18 段回忆", () => {
    expect(cases).toHaveLength(18);
  });

  for (const { unit, section, label } of cases) {
    describe(label, () => {
      const words = unitWords(unit);
      const wordIds = new Set(words.map((w) => w.id));
      const script = buildAutoScript(unit, words, section);
      const passage = unit.sections[section]?.passage ?? "";

      it("id 与舞台正确，且通过 validateScript", () => {
        expect(script.id).toBe(memoryScriptId(unit.unit_id, section));
        expect(script.unitId).toBe(unit.unit_id);
        const errors = validateScript(script, { stageTargets: stageTargets(script.stage), words: vocab });
        expect(errors).toEqual([]);
      });

      it("narrate 的文本都是文章原句，前 6 句里至少有 3 句被朗读", () => {
        const narrates = script.beats.filter((b): b is Extract<Beat, { kind: "narrate" }> => b.kind === "narrate");
        expect(narrates.length).toBeGreaterThanOrEqual(3);
        for (const n of narrates) expect(passage.includes(n.text)).toBe(true);
        // 第三人称 / 第二人称的划分：先 you 后 watch
        expect(narrates[0].pov).toBe("you");
      });

      it("gap：答案词出现在句子里，干扰词不同于答案且同属本单元，物件都已摆放", () => {
        const gaps = script.beats.filter((b): b is Extract<Beat, { kind: "gap" }> => b.kind === "gap");
        expect(gaps.length).toBeGreaterThanOrEqual(1);
        const placed = new Set(script.objects.map((o) => o.wordId));
        for (const g of gaps) {
          expect(passage.includes(g.sentence)).toBe(true);
          const answer = vocab.get(g.answerWordId)!;
          expect(wordIds.has(g.answerWordId)).toBe(true);
          expect(findWordToken(g.sentence, answer.word)).not.toBeNull();
          expect(g.decoyWordIds.length).toBeGreaterThanOrEqual(1);
          for (const d of g.decoyWordIds) {
            expect(d).not.toBe(g.answerWordId);
            expect(wordIds.has(d)).toBe(true);
            expect(placed.has(d)).toBe(true);
          }
          expect(placed.has(g.answerWordId)).toBe(true);
        }
      });

      it("touch 在下潜与电影之间，且触碰的词都有物件", () => {
        const touchIndex = script.beats.findIndex((b) => b.kind === "touch");
        expect(touchIndex).toBeGreaterThan(0);
        const touch = script.beats[touchIndex] as Extract<Beat, { kind: "touch" }>;
        expect(touch.wordIds.length).toBeGreaterThanOrEqual(4);
        const placed = new Set(script.objects.map((o) => o.wordId));
        for (const id of touch.wordIds) expect(placed.has(id)).toBe(true);
      });

      it("paper：占位都能在词表里找到，且词块答案能在原文里还原", () => {
        const paper = script.beats.find((b): b is Extract<Beat, { kind: "paper" }> => b.kind === "paper");
        expect(paper).toBeDefined();
        const slots = paperSlotIds(paper!.page);
        expect(slots.length).toBeGreaterThanOrEqual(1);
        expect(slots.length).toBeLessThanOrEqual(3);
        for (const id of slots) {
          const entry = vocab.get(id);
          expect(entry).toBeDefined();
          expect(wordIds.has(id)).toBe(true);
        }
        // 占位两侧的文字都应是原文片段（占位只替换了一个词）
        for (const line of paper!.page.lines) {
          for (const part of line.split(/\{\{[^{}]+\}\}/)) if (part.trim()) expect(passage.includes(part)).toBe(true);
        }
        for (const id of paper!.page.decoyWordIds) expect(vocab.has(id)).toBe(true);
      });

      it("以 freeze 收尾；物件数量在摆放位容量内；同一输入生成同一脚本", () => {
        expect(script.beats[script.beats.length - 1].kind).toBe("freeze");
        expect(script.objects.length).toBeLessThanOrEqual(14);
        expect(JSON.stringify(buildAutoScript(unit, words, section))).toBe(JSON.stringify(script));
      });
    });
  }
});

describe("单元 1 的 30 个词物件", () => {
  it("手写条目与单元词表一一对应", () => {
    const ids = unitWords(units[0]).map((w) => w.id);
    expect(ids).toHaveLength(30);
    for (const id of ids) expect(MEMORY_OBJECTS[id]).toBeDefined();
  });
});
