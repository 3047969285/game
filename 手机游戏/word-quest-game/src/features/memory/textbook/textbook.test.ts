import { describe, expect, it } from "vitest";
import { createTextbookStore, type TextbookDatabasePort } from "./store";
import { decodeTextbookBytes, MAX_TEXTBOOK_CHARS, MAX_TEXTBOOK_FILE_BYTES, parseTextbookText, previewPassage } from "./parse";
import { TextbookInputError, type TextbookPassage } from "./types";
import { analyzeTextbookOverwrites } from "./overwrite";

const sample = `# Unit One\n\n## Section A: Learning Across Borders\n\nMira studies in a quiet room. She writes each new idea in a notebook.\n\n## Text B: Community Gardens\nThe town library opens before sunrise. Students share books and stories.\n\n# Unit 2\n\n### Stories of China\nA small bridge crosses the river. Neighbors repair it together.`;

function memoryDatabase(): TextbookDatabasePort {
  const records = new Map<string, TextbookPassage>();
  return {
    list: async () => [...records.values()].map((record) => ({ ...record })),
    put: async (record) => { records.set(record.id, { ...record }); },
    delete: async (id) => { records.delete(id); },
    clear: async () => { records.clear(); },
  };
}

describe("本机教材文本解析", () => {
  it("识别 Markdown 标题、英文单元名、A/B/C 与章节标题", () => {
    const result = parseTextbookText(sample);
    expect(result.passages.map(({ unit, section, title }) => ({ unit, section, title }))).toEqual([
      { unit: 1, section: "section_a", title: "Learning Across Borders" },
      { unit: 1, section: "section_b", title: "Community Gardens" },
      { unit: 2, section: "section_c", title: "Stories of China" },
    ]);
    expect(result.passages[0].passage).toBe("Mira studies in a quiet room. She writes each new idea in a notebook.");
    expect(result.passages[1].passage).toBe("The town library opens before sunrise. Students share books and stories.");
    expect(result.warnings).toEqual([]);
  });

  it("允许只有 A/B 的书稿，并将无标题粘贴内容标成待核对", () => {
    const onlyAB = parseTextbookText("Unit 3\nSection A: First\nOne sentence here.\nSection B: Second\nTwo sentences here.");
    expect(onlyAB.passages.map((passage) => passage.section)).toEqual(["section_a", "section_b"]);
    expect(onlyAB.passages.some((passage) => passage.section === "section_c")).toBe(false);

    const pasted = parseTextbookText("A complete paragraph that I pasted myself.");
    expect(pasted.passages[0]).toMatchObject({ unit: 1, section: "section_a", needsReview: true });
    expect(pasted.warnings[0]).toContain("请核对");
  });

  it("Section 后直接出现完整首段时保留全文，不误认首句为标题", () => {
    const firstParagraph = "The first paragraph is a complete sentence. It has a second sentence.";
    const secondParagraph = "The next paragraph remains part of the same reading.";
    const parsed = parseTextbookText(`Unit 4\nSection A\n\n${firstParagraph}\n\n${secondParagraph}`);
    expect(parsed.passages[0].title).toBe("");
    expect(parsed.passages[0].passage).toBe(`${firstParagraph}\n\n${secondParagraph}`);
  });

  it("发现 Glossary 后停止把词表内容拼进课文并提示已省略", () => {
    const parsed = parseTextbookText("Unit 1\nSection A\nA short reading sentence.\n\nNew words\njourney /ˈdʒɜːni/ n. a trip");
    expect(parsed.passages[0].passage).toBe("A short reading sentence.");
    expect(parsed.warnings.join(" ")).toContain("已省略该标记之后的词表内容");
  });

  it("清楚拒绝空内容、超长内容、无效 UTF-8 与非文本字节", () => {
    expect(() => parseTextbookText(" \n ")).toThrow(TextbookInputError);
    expect(() => parseTextbookText("x".repeat(MAX_TEXTBOOK_CHARS + 1))).toThrow("字符上限");
    expect(() => decodeTextbookBytes(new Uint8Array(MAX_TEXTBOOK_FILE_BYTES + 1))).toThrow("字节上限");
    expect(() => decodeTextbookBytes(new Uint8Array([0xc3, 0x28]))).toThrow("有效的 UTF-8");
    expect(() => decodeTextbookBytes(new Uint8Array([0x41, 0x00, 0x42]))).toThrow("非 UTF-8");
  });

  it("预览统计首句与句数", () => {
    expect(previewPassage("First sentence. Second sentence!")).toEqual({ sentenceCount: 2, firstSentence: "First sentence." });
  });
});

describe("本机教材 IndexedDB 存储接口", () => {
  it("保存、读取、删除与清除段落，并隔离读取对象", async () => {
    const store = createTextbookStore(memoryDatabase());
    const saved = await store.save({ unit: 4, section: "section_b", title: "My passage", passage: "A sentence from my own book." });
    expect(saved.id).toBe("4:section_b");
    const firstRead = await store.get(4, "section_b");
    expect(firstRead?.passage).toBe("A sentence from my own book.");
    firstRead!.passage = "changed outside";
    expect((await store.get(4, "section_b"))?.passage).toBe("A sentence from my own book.");
    expect((await store.list())).toHaveLength(1);
    await store.remove(4, "section_b");
    expect(await store.list()).toEqual([]);
    await store.save({ unit: 1, section: "section_a", title: "", passage: "One." });
    await store.clear();
    expect(await store.list()).toEqual([]);
  });

  it("拒绝空正文，并将 IndexedDB 失败转成可向用户显示的错误", async () => {
    const store = createTextbookStore(memoryDatabase());
    await expect(store.save({ unit: 1, section: "section_a", title: "", passage: " " })).rejects.toThrow("正文为空");
    const failingDb: TextbookDatabasePort = {
      list: async () => { throw new Error("quota denied"); },
      put: async () => { throw new Error("quota denied"); },
      delete: async () => { throw new Error("quota denied"); },
      clear: async () => { throw new Error("quota denied"); },
    };
    await expect(createTextbookStore(failingDb).list()).rejects.toThrow("本机教材数据库操作失败：quota denied");
  });

  it("浏览器没有 IndexedDB 时明确拒绝读取，不伪装成已保存", async () => {
    if (typeof indexedDB !== "undefined") return;
    const { textbookStore } = await import("./store");
    await expect(textbookStore.list()).rejects.toThrow("此浏览器不支持 IndexedDB");
  });
});

describe("教材覆盖提示", () => {
  it("提示已有目标会被替换，并指出同一批次重复目标的保留规则", () => {
    const result = analyzeTextbookOverwrites(
      [
        { unit: 2, section: "section_a" },
        { unit: 2, section: "section_a" },
        { unit: 3, section: "section_b" },
      ],
      [
        { unit: 2, section: "section_a" },
        { unit: 2, section: "section_a" },
      ]
    );
    expect(result).toEqual({
      replacing: [{ unit: 2, section: "section_a" }],
      duplicateTargets: [{ unit: 2, section: "section_a", count: 2 }],
    });
  });

  it("没有碰撞时不生成覆盖项", () => {
    expect(analyzeTextbookOverwrites(
      [{ unit: 1, section: "section_a" }],
      [{ unit: 1, section: "section_b" }]
    )).toEqual({ replacing: [], duplicateTargets: [] });
  });
});
