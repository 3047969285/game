import { describe, expect, it } from "vitest";
import { detectTone, splitChunks } from "./Narrator";

describe("narrator prosody helpers", () => {
  it("splits text into sentence chunks keeping the original offsets", () => {
    const text = "Hello there. How are you? I am fine!";
    const chunks = splitChunks(text);
    expect(chunks.map((c) => c.kind)).toEqual(["sentence", "question", "exclaim"]);
    for (const c of chunks) expect(text.slice(c.start, c.start + c.text.length)).toBe(c.text);
  });

  it("breaks long sentences at commas into shorter phrases", () => {
    const text = "When the library finally opened its doors this morning, a long line of students, teachers and neighbours walked in together.";
    const chunks = splitChunks(text);
    expect(chunks.length).toBeGreaterThan(1);
    expect(chunks[0].kind).toBe("comma");
    expect(chunks.map((c) => c.text).join("")).toBe(text);
  });

  it("detects a tone from the content", () => {
    expect(detectTone("Where did everyone go?")).toBe("curious");
    expect(detectTone("What a wonderful surprise!")).toBe("excited");
    expect(detectTone("I miss my old friends, and I feel alone.")).toBe("soft");
    expect(detectTone("Please keep the door open.")).toBe("warm");
    expect(detectTone("The book is on the table.")).toBe("neutral");
  });
});
