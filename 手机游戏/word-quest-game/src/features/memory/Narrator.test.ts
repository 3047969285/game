import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { Narrator, SECONDS_PER_WORD, setNarratorFast, splitWords } from "./Narrator";

const g = globalThis as Record<string, unknown>;

describe("Narrator 计时降级（没有 speechSynthesis）", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    delete g.speechSynthesis;
    delete g.SpeechSynthesisUtterance;
  });
  afterEach(() => vi.useRealTimers());

  it("在 词数 × 0.33 ± 0.2 秒内 resolve，且不会提前", async () => {
    const text = "You remember a courtyard by the library.";
    const n = splitWords(text).length;
    const expected = n * SECONDS_PER_WORD * 1000;
    const narrator = new Narrator();
    let done = false;
    const p = narrator.speak(text).then(() => (done = true));
    await vi.advanceTimersByTimeAsync(expected - 200 - 1);
    expect(done).toBe(false);
    await vi.advanceTimersByTimeAsync(401);
    await p;
    expect(done).toBe(true);
  });

  it("逐词事件按顺序、各发一次", async () => {
    const narrator = new Narrator();
    const seen: number[] = [];
    narrator.onWord((e) => seen.push(e.index));
    const p = narrator.speak("one two three four");
    await vi.advanceTimersByTimeAsync(2000);
    await p;
    expect(seen).toEqual([0, 1, 2, 3]);
  });

  it("cancel 立即 resolve，新的 speak 会取代旧的", async () => {
    const narrator = new Narrator();
    let first = false;
    void narrator.speak("a long sentence that would take a while to read").then(() => (first = true));
    narrator.cancel();
    await vi.advanceTimersByTimeAsync(0);
    expect(first).toBe(true);
    expect(narrator.busy).toBe(false);
  });

  it("空文本也会 resolve", async () => {
    const p = new Narrator().speak("   ");
    await vi.advanceTimersByTimeAsync(10);
    await expect(p).resolves.toBeUndefined();
  });
});

describe("Narrator：引擎被拦截时 1.5 秒后降级为计时", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    class Utterance {
      onstart?: () => void;
      onend?: () => void;
      onerror?: () => void;
      onboundary?: () => void;
      constructor(public text: string) {}
    }
    g.SpeechSynthesisUtterance = Utterance;
    // 引擎收下了话，但永远不开口（speaking 始终为 false）
    g.speechSynthesis = { speaking: false, speak: vi.fn(), cancel: vi.fn(), getVoices: () => [] };
  });
  afterEach(() => {
    vi.useRealTimers();
    delete g.speechSynthesis;
    delete g.SpeechSynthesisUtterance;
  });

  it("没有 onstart 也不会卡死", async () => {
    const text = "Memory recall begins now.";
    const n = splitWords(text).length;
    let done = false;
    const p = new Narrator().speak(text).then(() => (done = true));
    await vi.advanceTimersByTimeAsync(1400);
    expect(done).toBe(false);
    await vi.advanceTimersByTimeAsync(1500 - 1400 + n * SECONDS_PER_WORD * 1000 + 300);
    await p;
    expect(done).toBe(true);
  });

  it("正常发声：onstart 之后由 onend 结束", async () => {
    const synth = g.speechSynthesis as { speak: ReturnType<typeof vi.fn> };
    let done = false;
    const p = new Narrator().speak("Hello there.").then(() => (done = true));
    const utt = synth.speak.mock.calls[0][0] as { onstart: () => void; onend: () => void };
    utt.onstart();
    await vi.advanceTimersByTimeAsync(2000);
    expect(done).toBe(false);
    utt.onend();
    await p;
    expect(done).toBe(true);
  });
});

describe("?memfast=1：旁白不用 TTS，计时降级 ×4", () => {
  afterEach(() => {
    setNarratorFast(1);
    vi.useRealTimers();
    delete g.speechSynthesis;
    delete g.SpeechSynthesisUtterance;
  });

  it("即使有 speechSynthesis 也不调用它，且在 词数 × 0.33 / 4 秒内 resolve", async () => {
    vi.useFakeTimers();
    const speak = vi.fn();
    g.speechSynthesis = { speak, cancel: vi.fn(), getVoices: () => [], speaking: false };
    g.SpeechSynthesisUtterance = class {};
    setNarratorFast(4);
    const text = "You remember a courtyard by the library today.";
    const n = splitWords(text).length;
    const narrator = new Narrator();
    let done = false;
    const p = narrator.speak(text).then(() => (done = true));
    await vi.advanceTimersByTimeAsync((n * SECONDS_PER_WORD * 1000) / 4 + 50);
    await p;
    expect(done).toBe(true);
    expect(speak).not.toHaveBeenCalled();
    expect(Narrator.estimate(text)).toBeCloseTo((n * SECONDS_PER_WORD) / 4, 5);
  });
});
