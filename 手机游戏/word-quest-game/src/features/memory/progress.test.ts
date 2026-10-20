import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

function installLocalStorage(options: { initial?: Record<string, string>; failWrites?: boolean } = {}): Map<string, string> {
  const values = new Map(Object.entries(options.initial ?? {}));
  vi.stubGlobal("localStorage", {
    getItem: (key: string) => values.get(key) ?? null,
    setItem: (key: string, value: string) => {
      if (options.failWrites) throw new Error("QuotaExceededError");
      values.set(key, value);
    },
  });
  return values;
}

beforeEach(() => vi.resetModules());
afterEach(() => vi.unstubAllGlobals());

// node 环境没有 localStorage：进度应退回到本次会话的内存副本
describe("progress", () => {
  it("完成的回忆、看过的词、开场标记都能读回", async () => {
    installLocalStorage();
    const { isMemoryDone, isPrologueSeen, markMemoryDone, markPrologueSeen, memoryWordsSeen } = await import("./progress");
    expect(isMemoryDone("u01a")).toBe(false);
    markMemoryDone("u01a", ["w1", "w2"]);
    markMemoryDone("u01a", ["w2", "w3"]);
    expect(isMemoryDone("u01a")).toBe(true);
    expect(memoryWordsSeen()).toEqual(["w1", "w2", "w3"]);
    expect(isPrologueSeen()).toBe(false);
    markPrologueSeen();
    expect(isPrologueSeen()).toBe(true);
    expect(isMemoryDone("u01a")).toBe(true);
  });

  it("写入遇到配额错误时，优先读取最新内存进度且返回值不共享数组引用", async () => {
    installLocalStorage({
      initial: {
        word_quest_memory_v1: JSON.stringify({ prologueSeen: false, done: ["old"], wordsSeen: ["w-old"] }),
      },
      failWrites: true,
    });
    const { loadMemoryProgress, writeMemoryProgress } = await import("../../infra/storage");

    writeMemoryProgress({ prologueSeen: true, done: ["old", "new"], wordsSeen: ["w-old", "w-new"] });
    const firstRead = loadMemoryProgress();
    expect(firstRead).toEqual({ prologueSeen: true, done: ["old", "new"], wordsSeen: ["w-old", "w-new"] });

    firstRead.done.push("alias");
    firstRead.wordsSeen.push("w-alias");
    firstRead.prologueSeen = false;
    expect(loadMemoryProgress()).toEqual({ prologueSeen: true, done: ["old", "new"], wordsSeen: ["w-old", "w-new"] });
  });
});
