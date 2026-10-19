import { describe, expect, it } from "vitest";
import { checkPaperFill, paperSlots, parsePaperLine } from "./paper2d";
import type { PaperPage } from "./types";

const page: PaperPage = {
  style: "notebook",
  title: "Week 1",
  lines: ["Week 1: we put every {{device}} in a basket.", "It felt strange to start a {{conversation}} without a screen.", "Real {{connection}} needs {{attention}}."],
  decoyWordIds: ["algorithm"],
};

describe("checkPaperFill", () => {
  it("空位按整页阅读顺序编号", () => {
    expect(paperSlots(page).map((s) => [s.index, s.line, s.wordId])).toEqual([
      [0, 0, "device"],
      [1, 1, "conversation"],
      [2, 2, "connection"],
      [3, 2, "attention"],
    ]);
  });

  it("全部填对 → complete", () => {
    const r = checkPaperFill(page, { 0: "device", 1: "conversation", 2: "connection", 3: "attention" });
    expect(r.complete).toBe(true);
    expect(r.wrong).toEqual([]);
    expect(r.empty).toEqual([]);
  });

  it("填错的位置进入 wrong，没填的进入 empty，且不算完成", () => {
    const r = checkPaperFill(page, { 0: "algorithm", 1: "conversation", 3: "connection" });
    expect(r.complete).toBe(false);
    expect(r.correct).toEqual([1]);
    expect(r.wrong).toEqual([0, 3]);
    expect(r.empty).toEqual([2]);
  });

  it("没有任何空位的页面永远不算完成", () => {
    expect(checkPaperFill({ ...page, lines: ["plain"] }, {}).complete).toBe(false);
  });
});

describe("parsePaperLine", () => {
  it("把一行拆成文字与空位片段，空位序号全页连续", () => {
    expect(parsePaperLine(page, 2)).toEqual([
      { type: "text", text: "Real " },
      { type: "slot", slot: 2, wordId: "connection" },
      { type: "text", text: " needs " },
      { type: "slot", slot: 3, wordId: "attention" },
      { type: "text", text: "." },
    ]);
  });
});
