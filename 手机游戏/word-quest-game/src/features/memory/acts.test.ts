import { describe, expect, it } from "vitest";
import type { WordEntry } from "../../core/types";
import type { Rw3UnitContent } from "../../infra/data";
import { ACT_COUNT_MAX, ACT_COUNT_MIN, ACT_MAX, ACT_MIN, buildActs, parsePassage, planActStarts, zhPrompt } from "./acts";
import { SECTION_KEYS } from "./ids";
import { sentenceHasWord, splitSentences } from "./text";
import { loadUnits, loadVocab } from "./testData";

const vocab = loadVocab();
const units = loadUnits();
const unitWords = (u: Rw3UnitContent): WordEntry[] => (u.word_ids ?? []).map((id) => vocab.get(id)!).filter(Boolean);

const cases = units.flatMap((unit) => SECTION_KEYS.map((section) => ({ unit, section, label: `${unit.unit_id}/${section}` })));

describe("planActStarts：按段落切幕", () => {
  const mk = (n: number): string[] => Array.from({ length: n }, (_, i) => `Sentence number ${i} is here.`);

  it("20 句的单段落课文按每幕约 4 句切成 5 幕", () => {
    expect(planActStarts(mk(20))).toEqual([0, 4, 8, 12, 16]);
  });

  it("每幕 3–6 句；不会在以代词 / 承接词开头的句子前面切开", () => {
    const sentences = mk(20);
    sentences[4] = "That limit changed everything.";
    const starts = planActStarts(sentences);
    expect(starts).not.toContain(4);
    const sizes = starts.map((s, i) => (starts[i + 1] ?? 20) - s);
    for (const size of sizes) {
      expect(size).toBeGreaterThanOrEqual(ACT_MIN);
      expect(size).toBeLessThanOrEqual(ACT_MAX);
    }
  });

  it("有段落标记时段落优先；太短的段落并进下一段，太长的段落均匀切开", () => {
    // 段落：[0,4) [4,6) [6,16)
    const starts = planActStarts(mk(16), [0, 4, 6]);
    expect(starts[0]).toBe(0);
    expect(starts).toContain(4);
    expect(starts).not.toContain(6); // 2 句的短段落并入后一段
    const sizes = starts.map((s, i) => (starts[i + 1] ?? 16) - s);
    for (const size of sizes) {
      expect(size).toBeGreaterThanOrEqual(ACT_MIN);
      expect(size).toBeLessThanOrEqual(ACT_MAX);
    }
    expect(sizes.reduce((a, b) => a + b, 0)).toBe(16);
  });

  it("长课文（59 句）自动增加幕数，不受旧的 4–6 幕限制", () => {
    const n = 59;
    const starts = planActStarts(mk(n));
    // 每幕 3–6 句推导出的幕数上下界；同时不超过 ACT_COUNT_MAX
    expect(starts.length).toBeGreaterThan(6);
    expect(starts.length).toBeGreaterThanOrEqual(Math.ceil(n / ACT_MAX));
    expect(starts.length).toBeLessThanOrEqual(Math.min(ACT_COUNT_MAX, Math.floor(n / ACT_MIN)));
    const sizes = starts.map((s, i) => (starts[i + 1] ?? n) - s);
    for (const size of sizes) {
      expect(size).toBeGreaterThanOrEqual(ACT_MIN);
      expect(size).toBeLessThanOrEqual(ACT_MAX);
    }
    expect(sizes.reduce((a, b) => a + b, 0)).toBe(n);
  });

  it("极长课文也不会切出超过 ACT_COUNT_MAX 幕（每幕仍 3–6 句）", () => {
    const n = 100;
    const starts = planActStarts(mk(n));
    expect(starts.length).toBeLessThanOrEqual(ACT_COUNT_MAX);
    expect(starts.length).toBeGreaterThanOrEqual(Math.ceil(n / ACT_MAX));
    const sizes = starts.map((s, i) => (starts[i + 1] ?? n) - s);
    for (const size of sizes) {
      expect(size).toBeGreaterThanOrEqual(ACT_MIN);
      expect(size).toBeLessThanOrEqual(ACT_MAX);
    }
  });

  it("parsePassage 记录段落起点", () => {
    const { sentences, paragraphStarts } = parsePassage("One is here. Two is here.\n\nThree is here. Four is here. Five is here.");
    expect(sentences).toHaveLength(5);
    expect(paragraphStarts).toEqual([0, 2]);
  });

  it("极短课文也不会出错", () => {
    expect(planActStarts([])).toEqual([]);
    expect(planActStarts(["Only one."])).toEqual([0]);
  });
});

describe("buildActs：6 个单元 × 3 篇", () => {
  it("覆盖 18 篇", () => expect(cases).toHaveLength(18));

  for (const { unit, section, label } of cases) {
    describe(label, () => {
      const words = unitWords(unit);
      const passage = unit.sections[section]?.passage ?? "";
      const sentences = splitSentences(passage);
      const acts = buildActs(unit, words, section);

      it("每一句都被分配，顺序不变；每幕 3–6 句，幕数随句子数增加", () => {
        expect(acts.flatMap((a) => a.sentences)).toEqual(sentences);
        // 幕数从本课实际句数推导：每幕最多 6 句 / 最少 3 句，同时不超过全局上限
        const maxActs = Math.min(ACT_COUNT_MAX, Math.floor(sentences.length / ACT_MIN));
        const minActs = Math.min(ACT_COUNT_MIN, maxActs);
        expect(acts.length).toBeGreaterThanOrEqual(minActs);
        expect(acts.length).toBeLessThanOrEqual(maxActs);
        expect(acts.length).toBeLessThanOrEqual(ACT_COUNT_MAX);
        for (const a of acts) {
          expect(a.sentences.length).toBeGreaterThanOrEqual(ACT_MIN);
          expect(a.sentences.length).toBeLessThanOrEqual(ACT_MAX);
        }
        acts.forEach((a, i) => {
          expect(a.index).toBe(i);
          expect(sentences.slice(a.start, a.start + a.sentences.length)).toEqual(a.sentences);
        });
      });

      it("本段的理解题全部分配（section_a 还包含 reading.questions），每道题只出现一次", () => {
        const expected = (unit.micro_world_checks?.[section] ?? []).length + (section === "section_a" ? (unit.sections.reading?.questions ?? []).length : 0);
        const got = acts.flatMap((a) => a.questions);
        expect(expected).toBeGreaterThanOrEqual(4);
        expect(got).toHaveLength(expected);
        expect(new Set(got.map((q) => JSON.stringify([q.question, q.options]))).size).toBe(expected);
        for (const q of got) {
          expect(q.options.length).toBeGreaterThanOrEqual(2);
          expect(q.answer).toBeGreaterThanOrEqual(0);
          expect(q.answer).toBeLessThan(q.options.length);
        }
        // 题目不会全堆在一幕里
        expect(Math.max(...acts.map((a) => a.questions.length))).toBeLessThanOrEqual(3);
      });

      it("翻译全部分配，写作放在最后一幕，每幕都有填词笔记", () => {
        const translations = unit.sections.translation?.sentences ?? [];
        const notes = acts.flatMap((a) => a.notes);
        const translate = notes.filter((n) => n.kind === "translate");
        expect(translate).toHaveLength(translations.length);
        expect(translate.map((n) => (n.kind === "translate" ? n.en : ""))).toEqual(expect.arrayContaining(translations.map((t) => t.en_reference)));
        for (const n of translate) if (n.kind === "translate") expect(n.zh.startsWith("请将")).toBe(false);
        const outline = acts[acts.length - 1].notes.filter((n) => n.kind === "outline");
        expect(outline).toHaveLength(1);
        if (outline[0].kind === "outline") expect(outline[0].points).toEqual(unit.sections.writing?.outline);
        expect(notes.filter((n) => n.kind === "outline")).toHaveLength(1);
        for (const a of acts) expect(a.notes.some((n) => n.kind === "fill"), `act#${a.index} 缺少填词笔记`).toBe(true);
      });

      it("填词笔记：答案在原句里，空位恰好一个，干扰词不同于答案", () => {
        for (const a of acts) {
          for (const n of a.notes) {
            if (n.kind !== "fill") continue;
            expect(n.line.split("____")).toHaveLength(2);
            const original = n.line.replace("____", n.answers[0]);
            expect(a.sentences).toContain(original);
            expect(n.decoys.length).toBeGreaterThanOrEqual(2);
            for (const d of n.decoys) {
              expect(d.toLowerCase()).not.toBe(n.answers[0].toLowerCase());
              // 干扰词不能也出现在原句里，否则空位有第二个正确答案
              expect(sentenceHasWord(original, d), `干扰词 ${d} 出现在原句里`).toBe(false);
            }
            for (const id of n.wordIds) expect(vocab.has(id)).toBe(true);
          }
        }
      });

      it("写作提纲：每个要点至少有一个可接受的词，干扰词不会也是答案", () => {
        const outline = acts.flatMap((a) => a.notes).find((n) => n.kind === "outline");
        expect(outline).toBeDefined();
        if (outline?.kind !== "outline") return;
        expect(outline.choices).toHaveLength(outline.points.length);
        for (const c of outline.choices) {
          expect(c.answers.length).toBeGreaterThanOrEqual(1);
          expect(c.decoys.length).toBeGreaterThanOrEqual(2);
          for (const d of c.decoys) expect(c.answers.map((x) => x.toLowerCase())).not.toContain(d.toLowerCase());
        }
      });

      it("本幕的单元词确实出现在本幕的句子里", () => {
        for (const a of acts) {
          for (const id of a.wordIds) {
            const w = vocab.get(id)!;
            expect(a.sentences.some((s) => new RegExp(`\\b${w.word}`, "i").test(s))).toBe(true);
          }
        }
      });

      it("同一输入生成同一份幕", () => {
        expect(JSON.stringify(buildActs(unit, words, section))).toBe(JSON.stringify(acts));
      });
    });
  }
});

describe("buildActs：passageOverride（导入的教材原文）", () => {
  const unit = units[0];
  const words = unitWords(unit);
  const own = Array.from({ length: 9 }, (_, i) => `My own sentence number ${i} talks about a device.`).join(" ");

  it("用导入原文切幕，只保留直接来自该文的挖词笔记，不混用配套练习", () => {
    const acts = buildActs(unit, words, "section_a", own);
    const ownSentences = splitSentences(own);
    expect(acts.flatMap((a) => a.sentences)).toEqual(ownSentences);
    // 幕数由导入原文的句数推导（每幕 3–6 句），不再假设固定 4–6 幕
    expect(acts.length).toBeGreaterThanOrEqual(Math.ceil(ownSentences.length / ACT_MAX));
    expect(acts.length).toBeLessThanOrEqual(Math.floor(ownSentences.length / ACT_MIN));
    for (const a of acts) {
      expect(a.sentences.length).toBeGreaterThanOrEqual(ACT_MIN);
      expect(a.sentences.length).toBeLessThanOrEqual(ACT_MAX);
    }
    expect(acts.flatMap((a) => a.questions)).toEqual([]);
    expect(acts.flatMap((a) => a.notes).every((note) => note.kind === "fill")).toBe(true);
    for (const note of acts.flatMap((a) => a.notes)) {
      if (note.kind === "fill") expect(own).toContain(note.line.replace("____", note.answers[0]));
    }
  });

  it("空字符串等于没有导入", () => {
    expect(JSON.stringify(buildActs(unit, words, "section_a", "  "))).toBe(JSON.stringify(buildActs(unit, words, "section_a")));
  });
});

describe("zhPrompt", () => {
  it("去掉 “请将下列句子译为英文：”", () => {
    expect(zhPrompt("请将下列句子译为英文：减少提醒。")).toBe("减少提醒。");
    expect(zhPrompt("没有前缀。")).toBe("没有前缀。");
  });
});
