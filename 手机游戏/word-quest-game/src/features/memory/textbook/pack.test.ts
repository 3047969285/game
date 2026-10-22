import { describe, expect, it } from "vitest";
import { mergeUnitPacks, packToPassages, parsePack, validatePack } from "./pack";
import { createTextbookStore, type PackDatabasePort, type TextbookDatabasePort } from "./store";
import { TextbookInputError, TextbookStorageError, type SceneSpec, type TextPack, type TextbookPack, type UnitPack } from "./types";

function scene(id: string, paragraphs: number[]): SceneSpec {
  return { id, paragraphs, place: "小镇图书馆", time: "清晨", people: ["Mira"], objects: ["lamp"], mood: "安静", summary_zh: "测试概述。", pov: "me" };
}

function text(section: TextPack["section"]): TextPack {
  const paragraphs = ["The lamp glows softly.", "Mira opens a blue book.", "Rain taps the window.", "She smiles and reads on."];
  return { section, title: `Title ${section}`, paragraphs, scenes: [scene("s1", [1, 2]), scene("s2", [3, 4])] };
}

function unit(n = 1): UnitPack {
  return {
    unit: n,
    title: "A synthetic unit",
    preview: "A short preview.",
    texts: [text("section_a"), text("section_b"), text("section_c")],
    newWords: [{ word: "glow", section: "section_a", phonetic: "/ɡləʊ/", pos: "v.", def_zh: "发光", phrase: false }],
    exercises: [
      {
        id: `u0${n}_a_cloze`, section: "section_a", kind: "banked_cloze", instructions: "Fill in.", bank: ["glow", "read"],
        passage: "The lamp will {{1}} while she can {{2}}.",
        items: [
          { n: 1, prompt: "1", answer: "glow", answer_source: "derived" },
          { n: 2, prompt: "2", answer: "read", answer_source: "derived" },
        ],
      },
      {
        id: `u0${n}_b_mcq`, section: "section_b", kind: "text_b_mcq", instructions: "Choose.",
        items: [{ n: 1, prompt: "Who reads?", options: ["Mira", "Tom"], answer: 0, answer_source: "book" }],
      },
    ],
  };
}

function pack(units: UnitPack[] = [unit()]): TextbookPack {
  return { schema: "rw3-pack/1", book: "Synthetic book", units };
}

const errorsOf = (p: TextbookPack) => validatePack(p).filter((i) => i.level === "error");
const clone = (): TextbookPack => structuredClone(pack());

describe("parsePack", () => {
  it("解析合法 JSON", () => {
    expect(parsePack(JSON.stringify(pack())).units).toHaveLength(1);
  });
  it("拒绝非 JSON 与结构不对的内容", () => {
    expect(() => parsePack("not json")).toThrow(TextbookInputError);
    expect(() => parsePack("not json")).toThrow("不是有效的教材包文件");
    expect(() => parsePack("[]")).toThrow(TextbookInputError);
    expect(() => parsePack(JSON.stringify({ schema: "rw3-pack/1", book: "x", units: [{ texts: 1 }] }))).toThrow(TextbookInputError);
  });
});

describe("validatePack", () => {
  it("最小合法包没有 error 与 warn", () => {
    expect(validatePack(pack())).toEqual([]);
  });
  it("schema 错误", () => {
    const p = clone(); (p as { schema: string }).schema = "x";
    expect(errorsOf(p)[0].path).toBe("schema");
  });
  it("unit 越界与重复", () => {
    const p = pack([unit(1), unit(1)]);
    p.units[1].exercises.forEach((e) => { e.id += "_2"; });
    expect(errorsOf(p).map((i) => i.path)).toEqual(["units[1].unit"]);
    const q = clone(); q.units[0].unit = 7;
    expect(errorsOf(q)[0].path).toBe("units[0].unit");
  });
  it("texts 数量与 section 问题", () => {
    const p = clone(); p.units[0].texts.pop();
    expect(errorsOf(p)[0].path).toBe("units[0].texts");
    const q = clone(); q.units[0].texts[2].section = "section_a";
    expect(errorsOf(q)[0].path).toBe("units[0].texts");
  });
  it("空段落带精确 path", () => {
    const p = clone(); p.units[0].texts[1].paragraphs[3] = "  ";
    expect(errorsOf(p).map((i) => i.path)).toContain("units[0].texts[1].paragraphs[3]");
  });
  it("场景段号越界", () => {
    const p = clone(); p.units[0].texts[0].scenes[0].paragraphs = [0, 5];
    expect(errorsOf(p).map((i) => i.path)).toEqual(["units[0].texts[0].scenes[0].paragraphs[0]", "units[0].texts[0].scenes[0].paragraphs[1]"]);
  });
  it("练习 id 重复", () => {
    const p = clone(); p.units[0].exercises[1].id = p.units[0].exercises[0].id;
    expect(errorsOf(p)[0].path).toBe("units[0].exercises[1].id");
  });
  it("题号不连续", () => {
    const p = clone(); p.units[0].exercises[0].items[1].n = 3;
    expect(errorsOf(p)[0].path).toBe("units[0].exercises[0].items[1].n");
  });
  it("选择题 answer 越界或缺 options", () => {
    const p = clone(); p.units[0].exercises[1].items[0].answer = 2;
    expect(errorsOf(p)[0].path).toBe("units[0].exercises[1].items[0].answer");
    const q = clone(); delete q.units[0].exercises[1].items[0].options;
    expect(errorsOf(q)[0].path).toBe("units[0].exercises[1].items[0].options");
  });
  it("填空 answer 为 null 但非 open", () => {
    const p = clone(); p.units[0].exercises[0].items[0].answer = null;
    expect(errorsOf(p)[0].path).toBe("units[0].exercises[0].items[0].answer_source");
    p.units[0].exercises[0].items[0].answer_source = "open";
    expect(errorsOf(p)).toEqual([]);
  });
  it("banked_cloze 空位数与题数不一致", () => {
    const p = clone(); p.units[0].exercises[0].passage = "Only {{1}} blank.";
    expect(errorsOf(p)[0].path).toBe("units[0].exercises[0].passage");
  });
  it("warn：段落少、OCR 痕迹、场景未覆盖、无生词、缺音标", () => {
    const p = clone();
    const a = p.units[0].texts[0];
    a.paragraphs = ["Fine sentence.", "Broken ==== ~~~~ text", "Third."];
    a.scenes = [scene("s1", [1])];
    p.units[0].texts[1].paragraphs.push("=== image 12");
    p.units[0].newWords[0].phonetic = undefined;
    const warns = validatePack(p).filter((i) => i.level === "warn").map((i) => `${i.path}`);
    expect(warns).toContain("units[0].texts[0].paragraphs");
    expect(warns).toContain("units[0].texts[0].paragraphs[1]");
    expect(warns).toContain("units[0].texts[0].paragraphs[2]");
    expect(warns).toContain("units[0].texts[1].paragraphs[4]");
    expect(warns).toContain("units[0].newWords[0].phonetic");
    p.units[0].newWords = [];
    expect(validatePack(p).map((i) => i.path)).toContain("units[0].newWords");
    expect(errorsOf(p)).toEqual([]);
  });
});

describe("mergeUnitPacks", () => {
  it("按 unit 排序", () => {
    const merged = mergeUnitPacks([unit(3), unit(1), unit(2)]);
    expect(merged.schema).toBe("rw3-pack/1");
    expect(merged.units.map((u) => u.unit)).toEqual([1, 2, 3]);
  });
  it("重复 unit 抛错", () => {
    expect(() => mergeUnitPacks([unit(2), unit(2)])).toThrow(TextbookInputError);
  });
});

describe("packToPassages", () => {
  it("每单元每篇一条，段落以空行连接", () => {
    const passages = packToPassages(pack());
    expect(passages).toHaveLength(3);
    expect(passages[0]).toEqual({ unit: 1, section: "section_a", title: "Title section_a", passage: text("section_a").paragraphs.join("\n\n") });
  });
  it("结果可被现有存储保存", async () => {
    const records = new Map<string, never>();
    const db: TextbookDatabasePort = {
      list: async () => [...records.values()], put: async (r) => { records.set(r.id as never, r as never); },
      delete: async () => {}, clear: async () => {},
    };
    const store = createTextbookStore(db, fakePackDb());
    for (const input of packToPassages(pack())) await store.save(input);
    expect(records.size).toBe(3);
  });
});

function fakePackDb(): PackDatabasePort {
  let saved: TextbookPack | null = null;
  return {
    getPack: async () => saved,
    putPack: async (p) => { saved = p; },
    clearPack: async () => { saved = null; },
  };
}

describe("教材包存储", () => {
  const noPassages: TextbookDatabasePort = { list: async () => [], put: async () => {}, delete: async () => {}, clear: async () => {} };

  it("save / load / clear", async () => {
    const store = createTextbookStore(noPassages, fakePackDb());
    expect(await store.loadPack()).toBeNull();
    await store.savePack(pack());
    expect(await store.loadPack()).toEqual(pack());
    await store.clearPack();
    expect(await store.loadPack()).toBeNull();
  });
  it("读出的是副本", async () => {
    const store = createTextbookStore(noPassages, fakePackDb());
    await store.savePack(pack());
    (await store.loadPack())!.book = "changed";
    expect((await store.loadPack())!.book).toBe("Synthetic book");
  });
  it("底层失败包装成 TextbookStorageError", async () => {
    const failing: PackDatabasePort = { getPack: async () => { throw new Error("boom"); }, putPack: async () => {}, clearPack: async () => {} };
    await expect(createTextbookStore(noPassages, failing).loadPack()).rejects.toThrow(TextbookStorageError);
  });
});
