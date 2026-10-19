import { describe, expect, it } from "vitest";
import { isMemoryDone, isPrologueSeen, markMemoryDone, markPrologueSeen, memoryWordsSeen } from "./progress";

// node 环境没有 localStorage：进度应退回到本次会话的内存副本
describe("progress", () => {
  it("完成的回忆、看过的词、开场标记都能读回", () => {
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
});
