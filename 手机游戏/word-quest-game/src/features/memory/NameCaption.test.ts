import { describe, expect, it } from "vitest";
import { CAPTION_SECONDS, captionOpacity, CaptionTracker, captionText } from "./NameCaption";

const state = (over: Partial<{ inView: boolean; speaking: boolean; thirdPerson: boolean; isViewer: boolean }> = {}) => ({ inView: true, speaking: false, thirdPerson: true, isViewer: false, ...over });

describe("第一次出现的名字小字", () => {
  it("当年的我第一次出现在第三人称画面里：Me · 2026，只一次", () => {
    const t = new CaptionTracker();
    expect(t.consider("me2026", "Me (2026)", state({ inView: false }))).toBeNull();
    expect(t.consider("me2026", "Me (2026)", state({ thirdPerson: false }))).toBeNull();
    expect(t.consider("me2026", "Me (2026)", state())).toBe("Me · 2026");
    expect(t.consider("me2026", "Me (2026)", state())).toBeNull();
  });
  it("同学第一次说话时浮出名字，没说话不标；第一人称自己的身体不标", () => {
    const t = new CaptionTracker();
    expect(t.consider("lin", "Lin", state())).toBeNull();
    expect(t.consider("lin", "Lin", state({ speaking: true, inView: false }))).toBeNull();
    expect(t.consider("lin", "Lin", state({ speaking: true }))).toBe("Lin");
    expect(t.consider("lin", "Lin", state({ speaking: true }))).toBeNull();
    expect(t.consider("me2026", "Me", state({ isViewer: true }))).toBeNull();
    expect(captionText("rui", "Rui")).toBe("Rui");
  });
  it("1.5 s 内淡入淡出，结束时完全透明", () => {
    expect(captionOpacity(0)).toBe(0);
    expect(captionOpacity(0.3)).toBe(1);
    expect(captionOpacity(CAPTION_SECONDS - 0.3)).toBeLessThan(0.6);
    expect(captionOpacity(CAPTION_SECONDS)).toBe(0);
    expect(CAPTION_SECONDS).toBe(1.5);
  });
});
