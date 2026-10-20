import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { MusicPlayer } from "./music";
import { beginSpeech } from "./speechActivity";

class FakeAudio extends EventTarget {
  static all: FakeAudio[] = [];
  static blocked = false;
  static gate: Promise<void> | undefined;
  paused = true;
  volume = 1;
  loop = false;
  preload = "";
  src = "";
  currentTime = 0;
  constructor() { super(); FakeAudio.all.push(this); }
  play = vi.fn(async () => {
    if (FakeAudio.blocked) throw new Error("NotAllowedError");
    if (FakeAudio.gate) await FakeAudio.gate;
    this.paused = false;
  });
  pause = vi.fn(() => { this.paused = true; });
  removeAttribute = vi.fn(() => { this.src = ""; });
  load = vi.fn();
}

const tick = async (ms = 1250): Promise<void> => { await vi.advanceTimersByTimeAsync(ms); };
let players: MusicPlayer[];
let releases: (() => void)[];
function create(): MusicPlayer { const player = new MusicPlayer(); players.push(player); return player; }

beforeEach(() => {
  vi.useFakeTimers(); vi.spyOn(performance, "now").mockImplementation(() => Date.now()); releases = []; FakeAudio.all = []; FakeAudio.blocked = false; FakeAudio.gate = undefined; players = [];
  vi.stubGlobal("Audio", FakeAudio);
  const storage = new Map<string, string>();
  vi.stubGlobal("localStorage", { getItem: (key: string) => storage.get(key) ?? null, setItem: (key: string, value: string) => storage.set(key, value) });
});
afterEach(() => { releases.forEach((release) => release()); players.forEach((player) => player.dispose()); vi.restoreAllMocks(); vi.useRealTimers(); vi.unstubAllGlobals(); });

describe("内置场景配乐", () => {
  it("无需导入文件，首次手势前不播放；解锁后默认音量与循环正确", async () => {
    const player = create();
    expect(player.hasTrack).toBe(true);
    expect(player.name).toBe("光下的远行");
    expect(FakeAudio.all.every((audio) => audio.play.mock.calls.length === 0)).toBe(true);
    player.unlock(); await tick();
    const sounding = FakeAudio.all.filter((audio) => !audio.paused);
    expect(sounding).toHaveLength(1);
    expect(sounding[0].src).toContain("audio/explore.m4a");
    expect(sounding[0].volume).toBeCloseTo(.42);
    expect(sounding[0].loop).toBe(true);
    expect(player.playing).toBe(true);
  });

  it("场景转换中两轨交叠、结束后旧轨停止，快速连续切换只留下最终曲目", async () => {
    const player = create(); player.unlock(); await tick();
    player.setScene("memory"); await tick(600);
    expect(FakeAudio.all.filter((audio) => !audio.paused)).toHaveLength(2);
    expect(FakeAudio.all.every((audio) => audio.volume > 0)).toBe(true);
    await tick();
    expect(FakeAudio.all.filter((audio) => !audio.paused).map((audio) => audio.src)).toEqual([expect.stringContaining("memory.m4a")]);
    player.setScene("study"); player.setScene("explore"); await tick();
    expect(FakeAudio.all.filter((audio) => !audio.paused).map((audio) => audio.src)).toEqual([expect.stringContaining("explore.m4a")]);
  });

  it("用户暂停会跨场景保留，后续手势不会悄悄恢复", async () => {
    const player = create(); player.unlock(); await tick();
    await player.toggle(); player.setScene("study"); player.unlock(); await tick();
    expect(player.playing).toBe(false);
    expect(FakeAudio.all.every((audio) => audio.paused)).toBe(true);
    const restored = create(); restored.unlock(); await tick();
    expect(restored.playing).toBe(false);
    await player.toggle(); await tick();
    expect(player.playing).toBe(true);
    expect(player.name).toBe("窗边的专注");
  });

  it("朗读压低音量，重叠语音最后一个结束后恢复；切歌也保持降低状态", async () => {
    const player = create(); player.unlock(); await tick();
    const finishA = beginSpeech(), finishB = beginSpeech(); releases.push(finishA, finishB);
    expect(FakeAudio.all.find((audio) => !audio.paused)?.volume).toBeCloseTo(.42 * .16);
    finishA(); finishA();
    expect(player.status).toContain("朗读中");
    player.setScene("memory"); await tick();
    expect(FakeAudio.all.find((audio) => !audio.paused)?.volume).toBeCloseTo(.42 * .16);
    finishB();
    expect(FakeAudio.all.find((audio) => !audio.paused)?.volume).toBeCloseTo(.42);
  });

  it("选定曲目与音量持久化，固定曲目不跟随场景；非法数值不进入音量", async () => {
    const player = create(); player.select("memory"); player.setVolume(.25); player.setScene("study");
    player.setVolume(Number.NaN);
    const restored = create(); restored.unlock(); await tick();
    expect(restored.selected).toBe("memory");
    expect(restored.name).toBe("把昨天轻轻拾起");
    expect(restored.level).toBe(.25);
  });

  it("浏览器阻止播放可重试，不产生未处理异常；销毁时停止两个声音", async () => {
    FakeAudio.blocked = true;
    const player = create(); player.unlock(); await tick();
    expect(player.playing).toBe(false);
    expect(player.status).toContain("点击播放");
    FakeAudio.blocked = false;
    await player.toggle(); await tick();
    expect(player.playing).toBe(true);
    player.dispose(); await tick();
    expect(FakeAudio.all.every((audio) => audio.paused && audio.src === "")).toBe(true);
  });

  it("本地文件可替换、循环关闭后自然结束，替换与销毁释放 blob URL", async () => {
    const createUrl = vi.spyOn(URL, "createObjectURL").mockReturnValueOnce("blob:one").mockReturnValueOnce("blob:two");
    const revoke = vi.spyOn(URL, "revokeObjectURL").mockImplementation(() => undefined);
    const player = create(); player.unlock(); await tick();
    await player.load(new File(["sample"], "my.wav", { type: "audio/wav" })); await tick();
    expect(player.selected).toBe("custom"); expect(player.name).toBe("my.wav");
    expect(FakeAudio.all.find((audio) => !audio.paused)?.src).toBe("blob:one");
    player.setLoop(false);
    const custom = FakeAudio.all.find((audio) => !audio.paused)!;
    expect(custom.loop).toBe(false);
    custom.dispatchEvent(new Event("ended")); expect(player.playing).toBe(false);
    await player.load(new File(["sample"], "second.wav", { type: "audio/wav" }));
    expect(revoke).toHaveBeenCalledWith("blob:one");
    player.dispose(); expect(revoke).toHaveBeenCalledWith("blob:two");
    expect(createUrl).toHaveBeenCalledTimes(2);
  });

  it("音频载入未完成就销毁，迟到的 play 完成不会恢复声音或启动淡入计时器", async () => {
    let resume!: () => void;
    FakeAudio.gate = new Promise<void>((resolve) => { resume = resolve; });
    const player = create(); player.unlock(); player.dispose();
    resume(); await tick();
    expect(FakeAudio.all.every((audio) => audio.paused)).toBe(true);
    expect(vi.getTimerCount()).toBe(0);
  });

  it("页面隐藏停止声音，恢复时尊重原有播放意图", async () => {
    const doc = Object.assign(new EventTarget(), { hidden: false }); vi.stubGlobal("document", doc);
    const player = create(); player.unlock(); await tick();
    doc.hidden = true; doc.dispatchEvent(new Event("visibilitychange")); await tick();
    expect(player.playing).toBe(false);
    doc.hidden = false; doc.dispatchEvent(new Event("visibilitychange")); await tick();
    expect(player.playing).toBe(true);
    await player.toggle(); doc.hidden = true; doc.dispatchEvent(new Event("visibilitychange"));
    doc.hidden = false; doc.dispatchEvent(new Event("visibilitychange")); await tick();
    expect(player.playing).toBe(false);
  });
});
