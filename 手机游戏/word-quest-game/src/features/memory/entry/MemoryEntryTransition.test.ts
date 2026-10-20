import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { MemoryEntryTransition } from "./MemoryEntryTransition";
import { COVER_MS, REVEAL_MS, drawMemoryEntry, ease, memoryMotes } from "./visual";

let clock = 0, id = 0, reduced = false;
let frames: Map<number, FrameRequestCallback>;
let entries: MemoryEntryTransition[];
let ctx: CanvasRenderingContext2D;
let win: EventTarget & { innerWidth: number; innerHeight: number; devicePixelRatio: number };
const paint = (): CanvasRenderingContext2D => new Proxy({ createRadialGradient: vi.fn(() => ({ addColorStop: vi.fn() })) } as unknown as CanvasRenderingContext2D, {
  get(target, key) { const object = target as unknown as Record<PropertyKey, unknown>; return object[key] ??= vi.fn(); },
});
class Element extends EventTarget {
  children: Element[] = []; attributes = new Map<string, string>(); isConnected = true;
  width = 0; height = 0; className = ""; textContent = ""; type = "";
  style = { setProperty: vi.fn(), opacity: "", backgroundColor: "" };
  append(...children: Element[]): void { this.children.push(...children); }
  setAttribute(key: string, value: string): void { this.attributes.set(key, value); }
  getAttribute(key: string): string | null { return this.attributes.get(key) ?? null; }
  getContext(): CanvasRenderingContext2D { return ctx; }
  remove(): void { this.isConnected = false; }
  focus(): void { /* no browser scroll in this fixture */ }
  getClientRects(): number[] { return [1]; }
}
async function at(time: number): Promise<void> {
  clock = time;
  const callbacks = [...frames.values()]; frames.clear(); callbacks.forEach((fn) => fn(time));
  await Promise.resolve();
}
function make(): MemoryEntryTransition { const entry = new MemoryEntryTransition({ title: "<test> Original title" }); entries.push(entry); return entry; }
beforeEach(() => {
  clock=0; id=0; reduced=false; frames=new Map(); entries=[]; ctx=paint();
  vi.spyOn(performance, "now").mockImplementation(() => clock);
  win=Object.assign(new EventTarget(), { innerWidth: 1280, innerHeight: 720, devicePixelRatio: 3, matchMedia: () => ({ matches: reduced }) });
  vi.stubGlobal("window", win);
  vi.stubGlobal("document", { body: new Element(), activeElement: new Element(), createElement: () => new Element(), querySelector: () => null });
  vi.stubGlobal("requestAnimationFrame", (callback: FrameRequestCallback) => { frames.set(++id, callback); return id; });
  vi.stubGlobal("cancelAnimationFrame", (key: number) => frames.delete(key));
});
afterEach(() => { entries.forEach((entry) => entry.dispose()); vi.restoreAllMocks(); vi.unstubAllGlobals(); });

describe("进入回忆的过渡生命周期", () => {
  it("完全覆盖旧场景后才发出 covered，慢加载时等待，不自行揭开", async () => {
    const entry = make(); let covered = false;
    void entry.covered.then((value) => { covered=value; });
    await at(COVER_MS-1); expect(covered).toBe(false);
    await at(COVER_MS); expect(covered).toBe(true);
    expect((ctx.fillRect as ReturnType<typeof vi.fn>).mock.calls.length).toBeGreaterThan(0);
    await at(30_000);
    expect(entry.element.isConnected).toBe(true);
    expect(entry.element.getAttribute("aria-busy")).toBe("true");
  });

  it("ready 后揭开并移除所有资源，重复 reveal 返回同一个承诺", async () => {
    const entry = make(); await at(COVER_MS);
    const done = entry.reveal(); expect(entry.reveal()).toBe(done);
    await at(COVER_MS+REVEAL_MS/2); expect(entry.element.isConnected).toBe(true);
    await at(COVER_MS+REVEAL_MS); await done;
    expect(entry.element.isConnected).toBe(false);
    expect(frames.size).toBe(0);
    expect((entry.element.children[0] as unknown as Element).width).toBe(1);
  });

  it("取消会解除等待/揭开承诺并调用取消回调，不留下帧循环", async () => {
    const onCancel = vi.fn();
    const entry = new MemoryEntryTransition({ title: "Test", onCancel }); entries.push(entry);
    const reveal = entry.reveal(); entry.cancel(); entry.cancel();
    expect(await entry.covered).toBe(false); expect(await entry.cancelled).toBe(null); await reveal;
    expect(onCancel).toHaveBeenCalledTimes(1);
    expect(entry.isCancelled).toBe(true);
    expect(frames.size).toBe(0);
  });

  it("减少动态效果时用短淡化，手机画布限制像素比且粒子减半", async () => {
    reduced=true; win.innerWidth=390; win.innerHeight=844;
    const entry = make(); let covered=false; void entry.covered.then((value) => { covered=value; });
    expect((entry.element.children[0] as unknown as Element).width).toBe(488);
    await at(360); expect(covered).toBe(true);
    expect((ctx.arc as ReturnType<typeof vi.fn>).mock.calls.length).toBe(0);
    const done = entry.reveal(); await at(780); await done;
    expect(entry.element.isConnected).toBe(false);
  });
});

describe("光尘画面预算和可复现性", () => {
  it("种子固定，低档 64 / 高档 128，无动态随机闪烁", () => {
    expect(memoryMotes(true)).toHaveLength(64); expect(memoryMotes(false)).toHaveLength(128);
    expect(memoryMotes(false)).toEqual(memoryMotes(false));
    for (const value of [-10,0,.2,1,10]) expect(ease(value)).toBeGreaterThanOrEqual(0);
    expect(ease(10)).toBe(1); expect(ease(-10)).toBe(0);
  });
  it("reduced motion 路径没有粒子、环轨或运动文字", () => {
    drawMemoryEntry(ctx,390,844,{time:10,cover:1,reveal:.4,reduced:true},memoryMotes(true));
    expect((ctx.arc as ReturnType<typeof vi.fn>).mock.calls).toHaveLength(0);
    expect((ctx.ellipse as ReturnType<typeof vi.fn>).mock.calls).toHaveLength(0);
    expect((ctx.fillText as ReturnType<typeof vi.fn>).mock.calls).toHaveLength(0);
    expect((ctx.createRadialGradient as ReturnType<typeof vi.fn>).mock.calls).toHaveLength(1); // atmosphere only; reveal is a uniform crossfade
  });
});
