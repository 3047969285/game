import { describe, expect, it } from "vitest";
import { buildActs } from "./acts";
import { buildTranslateTiles, checkFill, checkOutline, checkTranslate, chunkSentence, fillTiles, normalizeText, outlineTiles } from "./noteTasks";
import { loadUnits, loadVocab } from "./testData";
import type { NoteTask } from "./types";

const vocab = loadVocab();
const units = loadUnits();

describe("chunkSentence", () => {
  it("关键词合成一块，虚词和后面的实词合成一块，拼回去等于原句", () => {
    const en = "Not only do scheduled message check-in times protect a focused reading block, but they also leave room for urgent contact.";
    const chunks = chunkSentence(en, ["not only", "protect", "urgent contact"]);
    expect(chunks.map((c) => c.text).join(" ")).toBe(en);
    expect(chunks.find((c) => c.text === "Not only")?.keyword).toBe(true);
    expect(chunks.find((c) => c.text.startsWith("urgent contact"))?.keyword).toBe(true);
    expect(chunks.length).toBeLessThan(en.split(" ").length);
  });
});

describe("translate 词块", () => {
  for (const unit of units) {
    const words = unit.word_ids!.map((id) => vocab.get(id)!.word);
    const tasks = buildActs(unit, unit.word_ids!.map((id) => vocab.get(id)!), "section_a")
      .flatMap((a) => a.notes)
      .filter((n): n is Extract<NoteTask, { kind: "translate" }> => n.kind === "translate");

    it(`${unit.unit_id}：keywords 都在词块里，正确顺序拼出参考译文（忽略大小写和标点），2–3 个干扰词`, () => {
      expect(tasks.length).toBeGreaterThan(0);
      for (const task of tasks) {
        const { tiles, solution } = buildTranslateTiles(task, words);
        const byId = new Map(tiles.map((t) => [t.id, t]));
        const correct = tiles.filter((t) => !t.decoy);
        const decoys = tiles.filter((t) => t.decoy);
        expect(decoys.length).toBeGreaterThanOrEqual(2);
        expect(decoys.length).toBeLessThanOrEqual(3);
        // 每个关键词的每个词都在正确词块里
        const bag = normalizeText(correct.map((t) => t.text).join(" ")).split(" ");
        for (const kw of task.keywords) for (const w of normalizeText(kw).split(" ")) expect(bag.some((b) => b === w || b.startsWith(w) || w.startsWith(b)), `${kw}`).toBe(true);
        const placed = solution.map((id) => byId.get(id)!.text);
        expect(checkTranslate(task, placed)).toBe(true);
        expect(normalizeText(placed.join(" "))).toBe(normalizeText(task.en));
        // 词块被打乱过
        expect(tiles.map((t) => t.id).join()).not.toBe([...solution, ...decoys.map((d) => d.id)].join());
        // 干扰词不在译文里
        for (const d of decoys) for (const w of normalizeText(d.text).split(" ")) expect(normalizeText(task.en).split(" ")).not.toContain(w);
      }
    });

    it(`${unit.unit_id}：顺序错或混入干扰词判错`, () => {
      const task = tasks[0];
      const { tiles, solution } = buildTranslateTiles(task, words);
      const byId = new Map(tiles.map((t) => [t.id, t]));
      const placed = solution.map((id) => byId.get(id)!.text);
      expect(checkTranslate(task, [...placed].reverse())).toBe(false);
      expect(checkTranslate(task, [...placed, tiles.find((t) => t.decoy)!.text])).toBe(false);
      expect(checkTranslate(task, placed.slice(0, -1))).toBe(false);
    });
  }
});

describe("fill / outline 判定", () => {
  const unit = units[0];
  const acts = buildActs(unit, unit.word_ids!.map((id) => vocab.get(id)!), "section_a");
  it("fill：答案判对（忽略大小写），干扰词判错；词块里有答案", () => {
    const fill = acts.flatMap((a) => a.notes).find((n): n is Extract<NoteTask, { kind: "fill" }> => n.kind === "fill")!;
    const tiles = fillTiles(fill);
    expect(tiles.filter((t) => !t.decoy).map((t) => t.text)).toEqual(fill.answers);
    expect(checkFill(fill, 0, fill.answers[0].toUpperCase())).toBe(true);
    expect(checkFill(fill, 0, fill.decoys[0])).toBe(false);
  });

  it("outline：每个要点的词块里有答案，干扰词判错", () => {
    const outline = acts.flatMap((a) => a.notes).find((n): n is Extract<NoteTask, { kind: "outline" }> => n.kind === "outline")!;
    outline.choices.forEach((c, i) => {
      const tiles = outlineTiles(c, `p${i}`);
      expect(tiles.some((t) => !t.decoy)).toBe(true);
      expect(checkOutline(c, c.answers[0])).toBe(true);
      expect(checkOutline(c, c.decoys[0])).toBe(false);
    });
  });
});
