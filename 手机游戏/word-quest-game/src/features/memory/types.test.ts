import { describe, expect, it } from "vitest";
import { findWordToken, paperSlotIds, validateScript, type MemoryScript } from "./types";

const words = new Map([
  ["w1", { word: "message" }],
  ["w2", { word: "lonely" }],
  ["w3", { word: "device" }],
]);

function base(): MemoryScript {
  return {
    id: "t",
    unitId: "unit01",
    section: "section_a",
    title: "T",
    titleZh: "测试",
    stage: "emptyRoom",
    pieces: [{ id: "p-floor", target: "floor" }],
    actors: [{ id: "lin", name: "Lin", look: {}, position: { x: 0, y: 0, z: 0 } }],
    objects: [
      { wordId: "w1", archetype: "letter", position: { x: 0, y: 0, z: 0 } },
      { wordId: "w2", archetype: "emptyChair", position: { x: 1, y: 0, z: 0 } },
    ],
    beats: [
      { kind: "narrate", pov: "you", text: "A short message arrived.", build: ["p-floor", "wall_back"] },
      { kind: "touch", prompt: "Reach.", wordIds: ["w1"] },
      { kind: "gap", sentence: "She felt lonely at night.", answerWordId: "w2", decoyWordIds: ["w1"] },
      { kind: "actor", actorId: "lin", action: "enter" },
      { kind: "paper", page: { style: "notebook", title: "N", lines: ["Every {{w3}} was off."], decoyWordIds: ["w1"] } },
      { kind: "freeze", caption: "End" },
    ],
  };
}

const ctx = { stageTargets: ["floor", "wall_back", "table"], words };

describe("validateScript", () => {
  it("合法脚本通过", () => {
    expect(validateScript(base(), ctx)).toEqual([]);
  });

  it("build 引用既不是 piece 也不是舞台部件时报错", () => {
    const s = base();
    (s.beats[0] as { build: string[] }).build = ["nope"];
    expect(validateScript(s, ctx).join("\n")).toContain("nope");
  });

  it("piece 指向不存在的舞台部件时报错", () => {
    const s = base();
    s.pieces = [{ id: "x", target: "ceiling" }];
    expect(validateScript(s, ctx).join("\n")).toContain("ceiling");
  });

  it("未知 wordId / actorId 报错", () => {
    const s = base();
    s.beats.splice(1, 0, { kind: "touch", prompt: "x", wordIds: ["w9"] }, { kind: "actor", actorId: "ghost", action: "exit" });
    const text = validateScript(s, ctx).join("\n");
    expect(text).toContain("w9");
    expect(text).toContain("ghost");
  });

  it("gap：干扰词等于答案、句子里没有答案词都报错", () => {
    const s = base();
    s.beats[2] = { kind: "gap", sentence: "Nothing here.", answerWordId: "w2", decoyWordIds: ["w2"] };
    const text = validateScript(s, ctx).join("\n");
    expect(text).toContain("干扰词与答案相同");
    expect(text).toContain("没有答案词");
  });

  it("touch / gap 引用的词必须有物件；paper 的词可以只在词表里", () => {
    const s = base();
    s.beats.splice(1, 0, { kind: "touch", prompt: "x", wordIds: ["w3"] });
    expect(validateScript(s, ctx).join("\n")).toContain("必须在 objects 里有物件");
    const ok = base(); // w3 只出现在 paper 里
    expect(validateScript(ok, ctx)).toEqual([]);
  });

  it("choice 至少要有正确选项", () => {
    const s = base();
    s.beats.splice(1, 0, { kind: "choice", speaker: "Lin", line: "So?", options: [{ wordId: "w1", reply: "a", correct: false }, { wordId: "w2", reply: "b", correct: false }] });
    expect(validateScript(s, ctx).join("\n")).toContain("没有正确选项");
  });
});

describe("文本工具", () => {
  it("findWordToken 允许屈折后缀并忽略大小写", () => {
    expect(findWordToken("Several Messages arrived.", "message")?.text).toBe("Messages");
    expect(findWordToken("A device.", "device")).toMatchObject({ index: 2, length: 6 });
    expect(findWordToken("Devices.", "vice")).toBeNull();
  });

  it("paperSlotIds 按阅读顺序给出占位", () => {
    expect(paperSlotIds({ style: "diary", title: "", lines: ["a {{x}} b {{y}}", "{{z}}"], decoyWordIds: [] })).toEqual(["x", "y", "z"]);
  });
});

describe("validateScript：开场用到的节拍", () => {
  const base = (): MemoryScript => ({
    id: "p",
    unitId: "",
    section: "section_a",
    title: "P",
    titleZh: "开场",
    stage: "emptyRoom",
    actors: [{ id: "old", name: "Old", look: {}, position: { x: 0, y: 0, z: 0 } }],
    objects: [],
    beats: [
      { kind: "build", targets: ["floor", "old"] },
      { kind: "choice", speaker: "System", line: "Ready?", viewer: "old", options: [{ label: "Ready.", reply: "Yes.", correct: true }, { label: "Not yet.", reply: "Take your time.", correct: false, soft: true }] },
      { kind: "dive", seconds: 3 },
    ],
  });
  const ctx = { stageTargets: ["floor", "wall_back"], words: new Map<string, { word: string }>() };

  it("build / dive / 用 label 的选项（没有 wordId）都合法", () => {
    expect(validateScript(base(), ctx)).toEqual([]);
  });

  it("build 的目标不存在、选项既没有 wordId 也没有 label、viewer 不存在都会报错", () => {
    const s = base();
    s.beats[0] = { kind: "build", targets: ["nothing"] };
    s.beats[1] = { kind: "choice", speaker: "S", line: "?", viewer: "ghost", options: [{ reply: "a", correct: true }, { label: "B", reply: "b", correct: false }] };
    const text = validateScript(s, ctx).join("\n");
    expect(text).toContain("nothing");
    expect(text).toContain("既没有 wordId 也没有 label");
    expect(text).toContain("ghost");
  });
});
