import { describe, expect, it, vi } from "vitest";
import { MemoryStage } from "./MemoryStage";
import type { MemoryAct } from "./types";

describe("MemoryStage 第一人称对话中断", () => {
  it("切换视角时尚未回答的对话会在返回第一人称后重播", async () => {
    const stage = Object.create(MemoryStage.prototype) as {
      meAct(act: MemoryAct): Promise<boolean>;
      exited: boolean;
      session: { aborted: boolean };
      dialogDone: Set<number>;
      ensureStudy(): { handout: { hide(): void }; notebook: { hide(): void }; phone: null };
      hideStudyOverlays(): void;
      enterActPov(pov: "me"): void;
      learnStateFor(act: MemoryAct): { step: "done" };
      meDialog(dialog: NonNullable<MemoryAct["dialog"]>): Promise<void>;
      runNotebook(act: MemoryAct, mode: "tasks"): Promise<boolean>;
    };
    const handout = { hide: () => undefined };
    const notebook = { hide: () => undefined };
    let dialogs = 0;
    Object.assign(stage, {
      exited: false,
      session: { aborted: false },
      dialogDone: new Set<number>(),
      ensureStudy: () => ({ handout, notebook, phone: null }),
      hideStudyOverlays: () => undefined,
      enterActPov: () => undefined,
      learnStateFor: () => ({ step: "done" as const }),
      meDialog: async () => {
        dialogs++;
        if (dialogs === 1) stage.session.aborted = true;
      },
      runNotebook: async () => true,
    });
    const act = { index: 0, dialog: {} } as MemoryAct;

    expect(await stage.meAct(act)).toBe(false);
    stage.session = { aborted: false };
    expect(await stage.meAct(act)).toBe(true);
    expect(dialogs).toBe(2);
  });
});


describe("MemoryStage 入场准备握手", () => {
  it("首帧渲染后才揭开入口；揭开期间退出不得再弹出开场 gate", async () => {
    const frames: FrameRequestCallback[] = [];
    vi.stubGlobal("requestAnimationFrame", (callback: FrameRequestCallback) => { frames.push(callback); return frames.length; });
    const order: string[] = [];
    const gate = vi.fn();
    const stage = Object.create(MemoryStage.prototype) as MemoryStage;
    Object.assign(stage, {
      opts: { gate: true, onSceneReady: async () => { order.push("ready"); Object.assign(stage, { disposed: true }); } },
      exited: false, disposed: false,
      prepare: async () => undefined,
      startLoop: () => requestAnimationFrame(() => { order.push("render"); }),
      until: async (promise: Promise<unknown>) => promise,
      hud: { setFadeInstant: vi.fn(), gate },
    });
    try {
      const done = stage.play({ beats: [] } as unknown as Parameters<MemoryStage["play"]>[0]);
      await Promise.resolve();
      expect(order).toEqual([]);
      frames.forEach((callback) => callback(16));
      expect(await done).toMatchObject({ completed: false, exited: true });
      expect(order).toEqual(["render", "ready"]);
      expect(gate).not.toHaveBeenCalled();
    } finally { vi.unstubAllGlobals(); }
  });
});
