import { MUSIC_TRACKS, type MusicPlayer, type MusicSelection } from "../infra/music";
import "./musicControls.css";

/** One persistent, keyboard-accessible control on map, lessons and memory screens. */
export function mountMusicControls(root: HTMLElement, player: MusicPlayer): void {
  const dock = document.createElement("aside");
  dock.className = "bgm-dock";
  dock.setAttribute("aria-label", "背景音乐");
  dock.innerHTML = `
    <button type="button" class="bgm-toggle" aria-expanded="false" aria-controls="bgm-panel">♫ 配乐</button>
    <div id="bgm-panel" class="bgm-panel" hidden>
      <strong>场景配乐</strong>
      <label>曲目<select aria-label="背景音乐曲目">
        <option value="auto">自动跟随场景</option>
        ${Object.entries(MUSIC_TRACKS).map(([key, track]) => `<option value="${key}">${track.title} · ${track.description}</option>`).join("")}
        <option value="custom" disabled>我的本地音乐</option>
      </select></label>
      <p class="bgm-name"></p><div class="bgm-progress"><progress aria-label="配乐播放进度" value="0" max="1"></progress><span class="bgm-time"></span></div><p class="bgm-status" role="status" aria-live="polite"></p>
      <div class="bgm-actions"><button type="button" class="bgm-play">播放配乐</button>
        <label class="bgm-file">导入音乐<input type="file" accept="audio/*" aria-label="导入本地音乐" /></label></div>
      <label>音量<input type="range" min="0" max="1" step="0.01" aria-label="配乐音量" /><output></output></label>
      <label class="bgm-loop"><input type="checkbox" aria-label="本地音乐循环" />本地音乐循环</label>
      <small>三首原创器乐配乐 · 朗读时自动降低音量</small>
    </div>`;
  root.append(dock);
  const toggle = dock.querySelector<HTMLButtonElement>(".bgm-toggle")!;
  const panel = dock.querySelector<HTMLElement>("#bgm-panel")!;
  const select = dock.querySelector<HTMLSelectElement>("select")!;
  const play = dock.querySelector<HTMLButtonElement>(".bgm-play")!;
  const volume = dock.querySelector<HTMLInputElement>('input[type="range"]')!;
  const loop = dock.querySelector<HTMLInputElement>('input[type="checkbox"]')!;
  const file = dock.querySelector<HTMLInputElement>('input[type="file"]')!;
  const name = dock.querySelector<HTMLElement>(".bgm-name")!;
  const status = dock.querySelector<HTMLElement>(".bgm-status")!;
  const output = dock.querySelector<HTMLOutputElement>("output")!;
  const progress = dock.querySelector<HTMLProgressElement>("progress")!;
  const time = dock.querySelector<HTMLElement>(".bgm-time")!;
  const clock = (seconds: number): string => `${Math.floor(seconds / 60)}:${Math.floor(seconds % 60).toString().padStart(2, "0")}`;
  const updateTime = (): void => {
    progress.max = Math.max(1, player.duration);
    progress.value = player.position;
    time.textContent = `${clock(player.position)} / ${clock(player.duration)}`;
  };
  // One persistent dock per App, retained across all three screen containers.
  const timer = setInterval(() => {
    if (!dock.isConnected) { clearInterval(timer); return; }
    if (!panel.hidden) updateTime();
  }, 1000);
  player.subscribe(() => {
    updateTime();
    select.value = player.selected;
    select.querySelector<HTMLOptionElement>('option[value="custom"]')!.disabled = !player.hasCustom;
    play.textContent = player.playing ? "暂停配乐" : "播放配乐";
    name.textContent = player.name;
    status.textContent = player.status;
    volume.value = String(player.level);
    output.textContent = `${Math.round(player.level * 100)}%`;
    loop.checked = player.loop;
    loop.disabled = player.selected !== "custom";
    toggle.setAttribute("aria-label", `背景音乐：${player.name}，${player.playing ? "播放中" : "未播放"}`);
  });
  toggle.addEventListener("click", () => { panel.hidden = !panel.hidden; toggle.setAttribute("aria-expanded", String(!panel.hidden)); });
  select.addEventListener("change", () => player.select(select.value as MusicSelection));
  play.addEventListener("click", () => { void player.toggle(); });
  volume.addEventListener("input", () => player.setVolume(Number(volume.value)));
  loop.addEventListener("change", () => player.setLoop(loop.checked));
  file.addEventListener("change", () => {
    const selected = file.files?.[0];
    if (!selected) return;
    void player.load(selected).catch((error) => { status.textContent = error instanceof Error ? error.message : "音乐载入失败"; });
  });
  dock.addEventListener("keydown", (event) => {
    event.stopPropagation();
    if (event.key === "Escape") { panel.hidden = true; toggle.setAttribute("aria-expanded", "false"); toggle.focus(); }
  });
}
