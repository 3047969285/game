import type {
  ClozeItem,
  ContextScene,
  CourseId,
  CourseTemplate,
  LevelDef,
  MapNode,
  SceneMode,
  Rw3Phase,
  ScenePhase,
  WordEntry,
  WordPickup,
  UnitExploreState,
  ZoneDef,
  CetContentBundle,
  CetListeningItem,
  CetReadingItem,
  CetTranslationItem,
} from "../core/types";
import { ALL_COURSES, COURSE_LABELS } from "../core/constants";
import { loadRw3Units, loadTemplate, loadVocabulary, loadCetContent, type Rw3UnitContent } from "../infra/data";
import { buildRw3UnitLevel, migrateRw3Progress } from "../infra/rw3";
import { audio } from "../infra/audio";
import { MusicPlayer } from "../infra/music";
import { authUrl, type AuthProvider } from "../infra/auth";
import { GameState } from "../services/gameState";
import { buildExploreMap, resolveCurrentNode } from "../features/explore/map";
import { buildWordPickups, getUnitCenter } from "../features/explore/wordPickupLayout";
import { buildRw3SubWorldScene, buildRw3UnitScene } from "../features/explore/rw3Story";
import { buildRw3SubWorlds } from "../features/explore/rw3SubWorlds";
import { getRw3World } from "../features/explore/rw3Worlds";
import { buildContextScene } from "../features/explore/story";
import { buildClozeItems } from "../features/learn/cloze";
import { checkTranslation } from "../features/learn/translation";
import { buildReviewScene, buildWeakScene } from "../features/learn/review";
import type { Minimap } from "../features/world/Minimap";
import type { World3D } from "../features/world";
import { el, showToast } from "../shared/components";

type Screen = "map" | "scene";

const GUIDE_KEY = "word_quest_guide_seen";
const CLOZE_BATCH = 5;

/** TTS 朗读英文单词 */
function speakWord(word: string): void {
  if (!("speechSynthesis" in window)) return;
  const utt = new SpeechSynthesisUtterance(word);
  utt.lang = "en-US";
  utt.rate = 0.9;
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(utt);
}

function modeLabel(mode: SceneMode): string {
  if (mode === "review") return "间隔复习";
  if (mode === "weak") return "薄弱巩固";
  return "新词学习";
}

function normalizeClozeAnswer(value: string): string {
  return value
    .normalize("NFKC")
    .replace(/[\u200B-\u200D\uFEFF]/g, "")
    .replace(/\s+/g, "")
    .trim();
}

/** 应用主控制器：三维地图 ↔ 科学学习场景 */
export class App {
  private root: HTMLElement;
  private state = GameState.load();
  private template: CourseTemplate | null = null;
  private wordMap = new Map<string, WordEntry>();
  private mapNodes: MapNode[] = [];
  private levelMap = new Map<string, { level: LevelDef; zone: ZoneDef }>();
  private scene: ContextScene | null = null;
  private sceneMode: SceneMode = "level";
  private phase: ScenePhase = "input";
  private sessionGraded = new Set<string>();
  private answerRevealed = false;
  private selectedWordId: string | null = null;
  private clozeItems: ClozeItem[] = [];
  private clozeIndex = 0;
  private clozeDone = new Set<string>();
  private clozeWrongGraded = new Set<string>();
  private rw3PhaseIndex = 0;
  private rw3QuizIndex = 0;
  private rw3QuizCorrect = new Set<number>();
  private rw3WorldRecallDone = new Set<string>();
  private rw3WorldCheckCorrect = new Set<string>();
  private rw3ClozeIndex = 0;
  private rw3ClozeDone = new Set<string>();
  private rw3TranslationIndex = 0;
  private rw3TranslationDone = false;
  private rw3WritingAck = false;
  private rw3GrammarIndex = 0;
  private rw3GrammarCorrect = new Set<number>();
  private rw3MemoryDone = new Set<string>();
  private activeRw3Utterance: SpeechSynthesisUtterance | null = null;
  private rw3SpeechGeneration = 0;
  private world: World3D | null = null;
  private minimap: Minimap | null = null;
  private worldRuntimePromise: Promise<{
    World3D: typeof World3D;
    Minimap: typeof Minimap;
  }> | null = null;
  private worldRenderVersion = 0;
  private renderedCourse: CourseId | null = null;
  private rw3Units = new Map<string, Rw3UnitContent>();
  private cetContent: CetContentBundle | null = null;
  // CET 非词汇关卡状态
  private cetQuizIndex = 0;
  private cetQuizCorrect = new Set<number>();
  private cetTranslationDone = false;
  // 单元探索模式（原神风格）
  private unitExplore: UnitExploreState | null = null;
  private proximityNode: MapNode | null = null;
  private rw3LearningWorldUnitId?: string;
  // 快速单词卡弹窗计时器
  private wordCardTimer: ReturnType<typeof setTimeout> | null = null;
  private wordCardScrollPosition: { x: number; y: number } | null = null;
  private wordCardFocusReturn: HTMLElement | null = null;
  private readonly music = new MusicPlayer();
  private spectatorMode = false;

  constructor(root: HTMLElement) {
    this.root = root;
  }

  /** 启动应用 */
  async start(): Promise<void> {
    await this.loadCourse(this.state.save.courseId);
    this.mountShell();
    await this.renderMap();
    this.show("map");
  }

  /** 加载课程数据 */
  private async loadCourse(courseId: CourseId): Promise<void> {
    this.template = await loadTemplate(courseId);
    this.wordMap = await loadVocabulary(courseId);
    this.rw3Units = courseId === "college_english_rw3" ? await loadRw3Units() : new Map();
    this.cetContent = (courseId === "cet4" || courseId === "cet6") ? await loadCetContent(courseId) : null;
    this.levelMap.clear();

    if (this.template.id === "college_english_rw3") {
      if (migrateRw3Progress(this.state.save, this.template)) {
        this.state.persist();
      }
      for (const zone of this.template.zones) {
        this.levelMap.set(zone.id, { level: buildRw3UnitLevel(zone), zone });
      }
    } else {
      for (const zone of this.template.zones) {
        for (const level of zone.levels) {
          this.levelMap.set(level.id, { level, zone });
        }
      }
    }

    const cleared = new Set(
      Object.entries(this.state.save.levelProgress)
        .filter(([, p]) => p.cleared)
        .map(([id]) => id)
    );
    this.mapNodes = buildExploreMap(this.template, cleared);
    this.annotateDueCounts();
    this.syncMapNode();
  }

  /** 为各地图站点标注待复习词数 */
  private annotateDueCounts(): void {
    for (const node of this.mapNodes) {
      const ref = this.levelMap.get(node.id);
      node.dueCount = ref ? this.state.countDueInSet(ref.level.word_ids) : 0;
    }
  }

  /** 切换课程后校准地图站点 */
  private syncMapNode(): void {
    let hit = this.mapNodes.find((n) => n.id === this.state.save.mapNodeId);
    if (!hit && this.template?.id === "college_english_rw3") {
      const zone = this.template.zones.find((z) => this.state.save.mapNodeId.startsWith(z.id));
      if (zone) {
        this.state.setMapNode(zone.id);
        hit = this.mapNodes.find((n) => n.id === zone.id);
      }
    }
    if (!hit) {
      const first = this.mapNodes.find((n) => n.unlocked) ?? this.mapNodes[0];
      if (first) this.state.setMapNode(first.id);
    }
  }

  private mountShell(): void {
    this.root.innerHTML = `<div id="screen-map" class="screen active"></div><div id="screen-scene" class="screen"></div>`;
  }

  private show(screen: Screen): void {
    const map = this.root.querySelector("#screen-map");
    const scene = this.root.querySelector(`#screen-${screen}`);
    const keepLearningWorld =
      screen === "scene" &&
      this.phase === "rw3" &&
      Boolean(this.scene?.unitId?.startsWith("rw3_"));

    // Scene DOM is reused between units. Never reopen a new lesson at a stale scroll offset.
    if (screen === "scene" && scene) {
      const sceneViewport = scene as HTMLElement;
      sceneViewport.scrollTop = 0;
      requestAnimationFrame(() => {
        if (scene.classList.contains("active")) sceneViewport.scrollTop = 0;
      });
    }
    if (screen === "map") window.scrollTo(0, 0);

    this.root.querySelectorAll(".screen").forEach((el) => el.classList.remove("active"));
    map?.classList.remove("rw3-world-backdrop");
    this.root.querySelector("#screen-scene")?.classList.remove("rw3-world-overlay");
    if (screen === "map" || keepLearningWorld) map?.classList.add("active");
    scene?.classList.add("active", "screen-enter");
    if (keepLearningWorld) map?.classList.add("rw3-world-backdrop");
    if (keepLearningWorld) scene?.classList.add("rw3-world-overlay");
    setTimeout(() => scene?.classList.remove("screen-enter"), 450);

    if (keepLearningWorld) {
      this.world?.setSpectatorMode(true);
      this.world?.resume();
    } else if (screen === "map") {
      this.world?.setSpectatorMode(this.spectatorMode);
      this.world?.resume();
    } else {
      this.world?.pause();
    }
  }

  /** 从学习场景返回时，保留单元探索上下文，不把用户错误地送回全局地图。 */
  private returnToMapFromScene(): void {
    this.stopRw3Listening();
    audio.play("nav");
    const savedExplore = this.unitExplore;
    if (!savedExplore) {
      void this.renderMap().then(() => this.show("map"));
      return;
    }
    this.loadCourse(this.state.save.courseId).then(async () => {
      await this.renderMap();
      this.show("map");
      this.enterUnitExplore(savedExplore.unitId, savedExplore.collectedIds);
    });
  }

  /** 延迟加载 3D 运行时，避免首屏主包携带 three 和后处理模块。 */
  private loadWorldRuntime(): Promise<{
    World3D: typeof World3D;
    Minimap: typeof Minimap;
  }> {
    this.worldRuntimePromise ??= Promise.all([
      import("../features/world"),
      import("../features/world/Minimap"),
    ]).then(([worldModule, minimapModule]) => ({
      World3D: worldModule.World3D,
      Minimap: minimapModule.Minimap,
    }));
    return this.worldRuntimePromise;
  }

  /** 渲染三维地图 */
  private async renderMap(): Promise<void> {
    this.rw3LearningWorldUnitId = undefined;
    this.world?.setBiome(undefined);
    this.world?.setSubWorld(undefined);
    const renderVersion = ++this.worldRenderVersion;
    const screen = this.root.querySelector("#screen-map");
    if (!screen || !this.template) return;

    const current = resolveCurrentNode(this.mapNodes, this.state.save.mapNodeId);
    const done = this.mapNodes.filter((n) => n.cleared).length;
    const dueIds = this.state.getDueWordIds(this.wordMap.keys());
    const due = dueIds.length;
    const weakIds = this.state.getWeakWordIds(this.wordMap.keys(), 8, new Set(dueIds));
    const stats = this.state.getLearningStats(this.wordMap.keys());
    const rewardCount = this.state.save.rewardIds.length;

    if (this.renderedCourse !== this.state.save.courseId) {
      this.world?.dispose();
      this.world = null;
      screen.innerHTML = "";
      this.renderedCourse = this.state.save.courseId;
    }

    let createdMapShell = false;
    if (!screen.querySelector("#world-viewport")) {
      this.world?.dispose();
      screen.innerHTML = `
        <div class="card map-header" id="map-header"></div>
        <div class="tabs" id="course-tabs">
          ${ALL_COURSES.map((id) => `<button class="tab ${this.state.save.courseId === id ? "active" : ""}" data-course="${id}">${COURSE_LABELS[id]}</button>`).join("")}
        </div>
        <div class="world-viewport" id="world-viewport">
          <div class="explore-hud">
            <div id="proximity-panel" class="proximity-panel hidden">
              <span id="proximity-label" class="proximity-label"></span>
              <button type="button" class="btn-explore-interact" id="btn-world-interact">进入学习 · E</button>
            </div>
            <div id="pickup-panel" class="pickup-panel hidden">
              <span id="pickup-label" class="pickup-word-hint"></span>
              <button type="button" class="btn-collect" id="btn-collect-pickup">收集 · E</button>
            </div>
            <div id="explore-progress-hud" class="explore-progress-hud hidden">
              <div id="explore-progress-text" class="explore-progress-text"></div>
              <button type="button" class="btn-exit-explore" id="btn-exit-explore">← 返回地图</button>
            </div>
            <canvas id="explore-minimap" class="explore-minimap" width="120" height="120" aria-label="探险小地图"></canvas>
            <button type="button" id="btn-spectator-toggle" class="btn-spectator-toggle" title="切换观赏模式">👁️ 观赏世界</button>
            <button type="button" id="btn-music-toggle" class="btn-music-toggle" aria-expanded="false" aria-controls="music-panel">♫ 音乐</button>
            <div id="music-panel" class="music-panel hidden">
              <div class="music-panel-title">🎵 自定义音乐</div>
              <div class="music-panel-row">
                <label class="music-file-label" for="music-file">选择音频</label>
                <input id="music-file" type="file" accept="audio/*" />
                <button type="button" class="music-play-btn" id="btn-music-play" disabled>播放</button>
              </div>
              <div class="music-panel-row music-settings">
                <span id="music-name">未选择音乐</span>
                <label>音量 <input id="music-volume" type="range" min="0" max="1" step="0.05" value="0.55" /></label>
                <label><input id="music-loop" type="checkbox" /> 循环</label>
              </div>
            </div>
            <button type="button" id="btn-avatar-toggle" class="btn-avatar-toggle" title="换装 / 表情" aria-label="换装与表情">🧑‍🎤</button>
            <div id="avatar-toolbox" class="avatar-toolbox hidden">
              <div class="avatar-tool-title">表情</div>
              <div class="avatar-tool-row">
                <button type="button" class="avatar-chip" data-expr="neutral" title="中性">😐</button>
                <button type="button" class="avatar-chip" data-expr="happy" title="开心">😀</button>
                <button type="button" class="avatar-chip" data-expr="surprised" title="惊讶">😮</button>
              </div>
              <div class="avatar-tool-title">换装</div>
              <div class="avatar-tool-row">
                <button type="button" class="avatar-swatch" data-accent="4237567" style="background:#40a8ff" title="湖蓝"></button>
                <button type="button" class="avatar-swatch" data-accent="16737095" style="background:#ff6347" title="赤红"></button>
                <button type="button" class="avatar-swatch" data-accent="6477941" style="background:#62d875" title="翠绿"></button>
                <button type="button" class="avatar-swatch" data-accent="16764496" style="background:#ffce50" title="琥珀"></button>
                <button type="button" class="avatar-swatch" data-accent="12868860" style="background:#c45cfc" title="紫晶"></button>
              </div>
            </div>
            <div id="move-stick" class="move-stick" aria-label="移动摇杆">
              <div class="move-stick-knob" id="move-stick-knob"></div>
            </div>
          </div>
          <div class="world-hint-bar" id="world-hint-bar">WASD 走动 · Shift 奔跑 · 点地前往 · 走近水晶按 E</div>
          <!-- 快速单词卡弹窗（走近光球时弹出） -->
          <div id="word-pickup-card" class="word-pickup-card hidden"></div>
        </div>
        <div id="map-hint"></div>
      `;
      createdMapShell = true;
    }

    if (!this.world || !this.minimap) {
      const runtime = await this.loadWorldRuntime();
      if (renderVersion !== this.worldRenderVersion) return;

      const viewport = screen.querySelector("#world-viewport") as HTMLElement;
      const minimapCanvas = viewport.querySelector("#explore-minimap") as HTMLCanvasElement;
      this.minimap = new runtime.Minimap(minimapCanvas);
      this.minimap.setNodes(this.mapNodes);

      this.world = new runtime.World3D(viewport, {
        onNodeClick: (id) => this.onNodeClick(id),
        onProximity: (node) => this.updateProximityHud(node),
        onExploreUpdate: (state) => {
          this.minimap?.setNodes(state.nodes);
          this.minimap?.draw(state);
        },
        onPickupNear: (pickup) => this.onPickupNear(pickup),
        onPickupCollect: (id) => this.collectPickup(id),
      });
    }

    if (createdMapShell) {
      const viewport = screen.querySelector("#world-viewport") as HTMLElement;
      this.bindExploreControls(viewport);

      screen.querySelectorAll("#course-tabs .tab").forEach((tab) => {
        tab.addEventListener("click", async () => {
          audio.play("click");
          // 课程切换会重建地图；先清掉旧课程的单元探索上下文，避免切回读写3时误用旧单元状态。
          if (this.unitExplore) this.exitUnitExplore();
          this.state.setCourse((tab as HTMLElement).dataset.course as CourseId);
          await this.loadCourse(this.state.save.courseId);
          await this.renderMap();
        });
      });
    }

    const isRw3 = this.state.save.courseId === "college_english_rw3";
    const hintBar = screen.querySelector("#world-hint-bar");
    if (hintBar) {
      hintBar.textContent = isRw3
        ? "WASD/摇杆走动 · Shift 奔跑 · 走近 Unit 水晶 · E 进入学习"
        : "WASD 走动 · Shift 奔跑 · 点地探路 · 走近站点按 E 进入";
    }

    const header = screen.querySelector("#map-header");
    if (header) {
      header.innerHTML = `
        <div class="title">${this.template.name}</div>
        <div class="subtitle">${isRw3 ? "第四版主题练习 · 原创仿学（非教材原文）" : "三维探索 · 科学记忆（语境输入 + 主动回忆 + 间隔重复）"}</div>
        <span class="progress-pill">${isRw3 ? "已完成单元" : "已完成关卡"} ${done}/${this.mapNodes.length}</span>
        <span class="progress-pill reward-pill">徽章 ${rewardCount} · XP ${this.state.save.experience}</span>
        ${stats.learned > 0 ? `<span class="progress-pill stats-pill">已学 ${stats.learned}</span>` : ""}
        ${stats.mastered > 0 ? `<span class="progress-pill stats-pill mastered-pill">掌握 ${stats.mastered}</span>` : ""}
        ${due > 0 ? `<span class="progress-pill review-pill">待复习 ${due}</span>` : ""}
        ${stats.weak > 0 ? `<span class="progress-pill weak-pill">薄弱 ${stats.weak}</span>` : ""}
        <div class="account-actions">
          <span class="account-label">账号</span>
          <button type="button" class="account-btn" data-auth-provider="qq" ${authUrl("qq") ? "" : "disabled"}>QQ 登录</button>
          <button type="button" class="account-btn" data-auth-provider="wechat" ${authUrl("wechat") ? "" : "disabled"}>微信登录</button>
        </div>
      `;
      this.bindAuthButtons(header);
    }

    this.renderPlayGuide();
    this.renderPracticePanel(dueIds, due, weakIds);
    this.renderMapHint(current);
    this.minimap?.setNodes(this.mapNodes);
    this.world?.setNodes(this.mapNodes, current?.id ?? "");
    this.world?.resume();
  }

  private updateProximityHud(node: MapNode | null): void {
    this.proximityNode = node;
    const panel = this.root.querySelector("#proximity-panel");
    const label = this.root.querySelector("#proximity-label");
    if (!panel || !label) return;

    if (!node) {
      panel.classList.add("hidden");
      return;
    }

    const isUnitHub = this.unitExplore?.unitId && node.id === `rw3_${this.unitExplore.unitId}`;
    const zone = !isUnitHub && node.zoneName ? `<span class="proximity-zone">${node.zoneName}</span>` : "";
    const name = isUnitHub ? "本单元学习中枢" : `${node.icon} ${node.name}`;
    label.innerHTML = `${zone}<span class="proximity-name">${name}</span>`;
    const card = this.root.querySelector("#word-pickup-card");
    panel.classList.toggle("hidden", Boolean(card && !card.classList.contains("hidden")));
  }

  private bindExploreControls(viewport: HTMLElement): void {
    viewport.querySelector("#btn-world-interact")?.addEventListener("click", () => {
      audio.play("click");
      this.world?.tryInteract();
    });

    viewport.querySelector("#btn-collect-pickup")?.addEventListener("click", () => {
      audio.play("click");
      this.world?.tryCollectPickup();
    });

    viewport.querySelector("#btn-exit-explore")?.addEventListener("click", () => {
      audio.play("click");
      this.exitUnitExplore();
    });

    viewport.querySelector("#btn-spectator-toggle")?.addEventListener("click", () => {
      this.spectatorMode = !this.spectatorMode;
      this.world?.setSpectatorMode(this.spectatorMode);
      const button = viewport.querySelector("#btn-spectator-toggle");
      if (button) button.textContent = this.spectatorMode ? "🚶 返回行走" : "👁️ 观赏世界";
      const hintBar = viewport.querySelector("#world-hint-bar");
      if (hintBar) {
        hintBar.textContent = this.spectatorMode
          ? "观赏模式：拖动画面查看世界 · 可随时返回行走"
            : this.unitExplore
            ? "走近发光词球按 E 收集词汇 · 中央枢纽进入总览 · 沿路线进入文章世界"
            : "WASD/摇杆走动 · Shift 奔跑 · 走近 Unit 水晶 · E 进入单元地图";
      }
      audio.play("click");
    });

    const musicPanel = viewport.querySelector("#music-panel") as HTMLElement | null;
    const musicToggle = viewport.querySelector<HTMLButtonElement>("#btn-music-toggle");
    musicToggle?.addEventListener("click", () => {
      const expanded = musicPanel?.classList.toggle("hidden") === false;
      musicToggle.setAttribute("aria-expanded", String(expanded));
      audio.play("click");
    });

    const musicFile = viewport.querySelector("#music-file") as HTMLInputElement | null;
    const musicPlay = viewport.querySelector("#btn-music-play") as HTMLButtonElement | null;
    const musicName = viewport.querySelector("#music-name");
    const musicVolume = viewport.querySelector("#music-volume") as HTMLInputElement | null;
    const musicLoop = viewport.querySelector("#music-loop") as HTMLInputElement | null;
    musicFile?.addEventListener("change", async () => {
      const file = musicFile.files?.[0];
      if (!file) return;
      try {
        await this.music.load(file);
        if (musicPlay) musicPlay.disabled = false;
        if (musicName) musicName.textContent = file.name;
        showToast("音乐已载入，仅在本地播放");
      } catch (error) {
        showToast(error instanceof Error ? error.message : "音乐载入失败");
      }
    });
    musicPlay?.addEventListener("click", async () => {
      try {
        const playing = await this.music.toggle();
        musicPlay.textContent = playing ? "暂停" : "播放";
      } catch {
        showToast("浏览器阻止了播放，请再次点击播放");
      }
    });
    musicVolume?.addEventListener("input", () => this.music.setVolume(Number(musicVolume.value)));
    musicLoop?.addEventListener("change", () => this.music.setLoop(musicLoop.checked));

    // 换装 / 表情面板
    const toolbox = viewport.querySelector("#avatar-toolbox") as HTMLElement | null;
    viewport.querySelector("#btn-avatar-toggle")?.addEventListener("click", () => {
      audio.play("click");
      toolbox?.classList.toggle("hidden");
    });
    toolbox?.querySelectorAll<HTMLButtonElement>(".avatar-chip").forEach((btn) => {
      btn.addEventListener("click", () => {
        audio.play("click");
        const expr = btn.dataset.expr as "neutral" | "happy" | "surprised";
        this.world?.setExpression(expr);
        toolbox.querySelectorAll(".avatar-chip").forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
      });
    });
    toolbox?.querySelectorAll<HTMLButtonElement>(".avatar-swatch").forEach((btn) => {
      btn.addEventListener("click", () => {
        audio.play("click");
        const accent = Number(btn.dataset.accent);
        if (!Number.isNaN(accent)) this.world?.setOutfitAccent(accent);
        toolbox.querySelectorAll(".avatar-swatch").forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
      });
    });

    const stick = viewport.querySelector("#move-stick") as HTMLElement | null;
    const knob = viewport.querySelector("#move-stick-knob") as HTMLElement | null;
    if (!stick || !knob) return;

    let active = false;
    const center = { x: 0, y: 0 };
    const maxR = 36;

    const apply = (cx: number, cy: number) => {
      let dx = cx - center.x;
      let dy = cy - center.y;
      const len = Math.hypot(dx, dy);
      if (len > maxR) {
        dx = (dx / len) * maxR;
        dy = (dy / len) * maxR;
      }
      knob.style.transform = `translate(${dx}px, ${dy}px)`;
      this.world?.setStickInput(dx / maxR, -dy / maxR);
    };

    const reset = () => {
      active = false;
      knob.style.transform = "";
      this.world?.setStickInput(0, 0);
    };

    stick.addEventListener("pointerdown", (e) => {
      active = true;
      const r = stick.getBoundingClientRect();
      center.x = r.left + r.width / 2;
      center.y = r.top + r.height / 2;
      stick.setPointerCapture(e.pointerId);
      apply(e.clientX, e.clientY);
    });
    stick.addEventListener("pointermove", (e) => {
      if (!active) return;
      apply(e.clientX, e.clientY);
    });
    stick.addEventListener("pointerup", reset);
    stick.addEventListener("pointercancel", reset);
  }

  private renderPlayGuide(): void {
    if (localStorage.getItem(GUIDE_KEY)) return;

    const existing = this.root.querySelector("#play-guide");
    existing?.remove();

    const card = el("div", "card play-guide");
    card.id = "play-guide";
    card.innerHTML = `
      <div class="play-guide-head">
        <span class="title" style="font-size:1rem">怎么玩？</span>
        <button class="btn-ghost-sm" id="btn-dismiss-guide" type="button">知道了</button>
      </div>
      <ol class="play-guide-list">
        <li><strong>走动探险</strong>：WASD 或左下摇杆移动，拖拽画面转向，走近水晶按 E</li>
        <li><strong>读写3 路线</strong>：6 个单元 = 6 幕场景，按单元词库完成分级词汇</li>
        <li><strong>读文章段落</strong>：一幕内包含 Section A/B/C 仿学段落 + 听力稿，高亮词来自单元词库</li>
        <li><strong>主动回忆</strong>：点高亮词 → 先回忆 → 揭示 → 自评</li>
        <li><strong>语境填空</strong>：按文章句子选释义，答错缩短复习间隔</li>
        <li><strong>间隔复习</strong>：到期词在地图练习卡片，每轮约 12 词</li>
      </ol>
    `;

    const hint = this.root.querySelector("#map-hint");
    hint?.parentElement?.insertBefore(card, hint);
    card.querySelector("#btn-dismiss-guide")?.addEventListener("click", () => {
      localStorage.setItem(GUIDE_KEY, "1");
      card.remove();
    });
  }

  private renderPracticePanel(dueIds: string[], due: number, weakIds: string[]): void {
    const existing = this.root.querySelector("#practice-panel");
    existing?.remove();

    if (due <= 0 && weakIds.length === 0) return;

    const reviewBatch = Math.min(12, dueIds.length);
    const weakBatch = weakIds.length;
    const card = el("div", "card practice-panel");
    card.id = "practice-panel";

    const parts: string[] = [];
    if (due > 0) {
      parts.push(`
        <div class="practice-block">
          <div class="practice-block-head">
            <span class="review-entry-icon">⏳</span>
            <div>
              <div class="title" style="font-size:0.95rem">间隔复习</div>
              <div class="subtitle">${due} 词到期 · 本轮 ${reviewBatch} 词</div>
            </div>
          </div>
          <button class="btn btn-primary" id="btn-start-review" type="button">开始复习</button>
        </div>
      `);
    }
    if (weakBatch > 0) {
      parts.push(`
        <div class="practice-block">
          <div class="practice-block-head">
            <span class="review-entry-icon">🔥</span>
            <div>
              <div class="title" style="font-size:0.95rem">薄弱巩固</div>
              <div class="subtitle">上次回忆困难 · 本轮 ${weakBatch} 词</div>
            </div>
          </div>
          <button class="btn btn-secondary" id="btn-start-weak" type="button">开始巩固</button>
        </div>
      `);
    }

    card.innerHTML = parts.join("");
    const hint = this.root.querySelector("#map-hint");
    hint?.parentElement?.insertBefore(card, hint);

    card.querySelector("#btn-start-review")?.addEventListener("click", () => this.openReview(dueIds));
    card.querySelector("#btn-start-weak")?.addEventListener("click", () => this.openWeak(weakIds));
  }

  private renderMapHint(node: MapNode | null): void {
    const hint = this.root.querySelector("#map-hint");
    if (!hint) return;
    if (!node) {
      hint.innerHTML = "";
      return;
    }

    const isRw3Map = this.state.save.courseId === "college_english_rw3" && !this.unitExplore;
    const nodeIndex = this.mapNodes.findIndex((item) => item.id === node.id);
    const previousNode = isRw3Map ? this.mapNodes[nodeIndex - 1] : undefined;
    const nextNode = isRw3Map ? this.mapNodes[nodeIndex + 1] : undefined;

    hint.innerHTML = `
      <div class="card explore-hint">
        ${isRw3Map ? `
          <nav class="rw3-unit-nav" aria-label="单元导航">
            <button type="button" data-rw3-step="-1" ${previousNode ? "" : "disabled"}>‹ 上一单元</button>
            <span>单元 ${Math.max(0, nodeIndex) + 1} / ${this.mapNodes.length}</span>
            <button type="button" data-rw3-step="1" ${nextNode?.unlocked ? "" : "disabled"} aria-label="${nextNode?.unlocked ? `下一单元：${nextNode.name}` : nextNode ? `完成本单元后解锁：${nextNode.name}` : "已到最后一个单元"}">${nextNode ? (nextNode.unlocked ? "下一单元 ›" : "完成后解锁") : "已到最后"}</button>
          </nav>
        ` : ""}
        <div class="explore-header"><span class="explore-loc">📍 ${node.zoneName}</span></div>
        <div class="title" style="font-size:1rem">${node.icon} ${node.name}</div>
        <div class="subtitle">${node.cleared ? "本单元已完成 · 可重温" : node.unlocked ? (this.state.save.courseId === "college_english_rw3" ? "完整单元：Section A/B/C → 分级词汇关卡 → 阅读题 → 听力 → 填空 → 翻译 → 写作" : "进入后：先读故事 → 回忆释义 → 语境填空") : "完成前一单元后解锁"}${node.dueCount ? ` · <span class="due-inline">${node.dueCount} 词待复习</span>` : ""}</div>
        ${node.unlocked ? `<button class="btn btn-primary" id="btn-enter-scene">进入学习场景</button>` : ""}
      </div>
    `;

    hint.querySelectorAll<HTMLButtonElement>("[data-rw3-step]").forEach((button) => {
      button.addEventListener("click", () => {
        const targetIndex = nodeIndex + Number(button.dataset.rw3Step);
        const target = this.mapNodes[targetIndex];
        if (!target?.unlocked) return;
        this.state.setMapNode(target.id);
        this.world?.setNodes(this.mapNodes, target.id);
        this.renderMapHint(target);
        window.scrollTo(0, 0);
      });
    });
    hint.querySelector("#btn-enter-scene")?.addEventListener("click", () => this.openScene(node.id));
  }

  private bindAuthButtons(header: Element): void {
    header.querySelectorAll<HTMLButtonElement>("[data-auth-provider]").forEach((button) => {
      button.addEventListener("click", () => {
        const provider = button.dataset.authProvider as AuthProvider | undefined;
        if (!provider) return;
        const url = authUrl(provider);
        if (!url) {
          showToast(`${provider === "qq" ? "QQ" : "微信"}登录尚未配置后端回调`);
          return;
        }
        if (!/^https?:\/\//i.test(url)) {
          showToast("登录地址必须是 http 或 https 地址");
          return;
        }
        window.location.assign(url);
      });
    });
  }

  private onNodeClick(nodeId: string): void {
    if (this.state.save.courseId === "college_english_rw3") {
      if (this.unitExplore) {
        // 探索模式内：中央学习圣所重新打开单元总览，外圈水晶进入对应子世界。
        audio.play("click");
        this.state.setMapNode(nodeId);
        if (!nodeId.includes("::")) {
          const unitRef = this.levelMap.get(nodeId);
          if (unitRef) {
            this.world?.setSubWorld("hub");
            this.showUnitEntryCard(
              unitRef.zone,
              this.unitExplore.pickups.length,
              this.unitExplore.collectedIds.size
            );
          }
          return;
        }
        const focusWorldId = nodeId.includes("::") ? nodeId.split("::")[1] : "hub";
        this.world?.setSubWorld(focusWorldId);
        this.world?.pause();
        this.openScene(nodeId);
        return;
      }
      // 概览地图：点击单元水晶 → 进入该单元探索地图
      const node = this.mapNodes.find((n) => n.id === nodeId);
      if (!node?.unlocked) { showToast("请先完成前一个单元"); return; }
      audio.play("click");
      this.state.setMapNode(nodeId);
      this.enterUnitExplore(nodeId);
      return;
    }

    const node = this.mapNodes.find((n) => n.id === nodeId);
    if (!node?.unlocked) {
      showToast("请先完成前一个探索点");
      return;
    }
    audio.play("click");
    this.state.setMapNode(nodeId);
    this.renderMapHint(node);
    this.world?.setNodes(this.mapNodes, nodeId);
    this.openScene(nodeId);
  }

  // ─────────────────────────────────────────────────────────────────────────
  // 单元探索模式（原神风格：每单元一张主题地图，词汇散落全图可拾取）
  // ─────────────────────────────────────────────────────────────────────────

  private enterUnitExplore(unitNodeId: string, restoredCollected?: Set<string>): void {
    const ref = this.levelMap.get(unitNodeId);
    if (!ref) return;
    window.scrollTo(0, 0);

    const { zone } = ref;
    const unitId = zone.id.replace("rw3_", "");
    const rw3Unit = this.rw3Units.get(unitId);
    const unitWorld = getRw3World(unitId);
    const preview = buildRw3UnitScene(zone, this.wordMap, rw3Unit, ref.level.word_ids, zone.order ?? 0);
    const subWorlds = buildRw3SubWorlds(rw3Unit, unitWorld, preview?.rw3Phases ?? []);

    // 收集该 zone 下所有词汇（去重）
    const seen = new Set<string>();
    const words: { id: string; word: string; meaning: string }[] = [];
    for (const lvl of zone.levels) {
      for (const wid of lvl.word_ids) {
        if (seen.has(wid)) continue;
        seen.add(wid);
        const w = this.wordMap.get(wid);
        if (w) words.push({ id: w.id, word: w.word, meaning: w.meaning });
      }
    }

    const collectedIds =
      restoredCollected ??
      new Set(words.map((w) => w.id).filter((id) => this.state.save.discoveredWords.includes(id)));

    const pickups = buildWordPickups(unitId, words);
    for (const p of pickups) {
      if (collectedIds.has(p.id)) p.collected = true;
    }

    this.unitExplore = { unitId, unitLabel: zone.name, subWorlds, pickups, collectedIds };
    this.spectatorMode = false;
    this.world?.setSpectatorMode(false);
    const spectatorButton = this.root.querySelector("#btn-spectator-toggle");
    if (spectatorButton) spectatorButton.textContent = "👁️ 观赏世界";

    // 创建单元圣所节点（固定入口 Portal）— 位于探索区中心
    const center = getUnitCenter(unitId);
    const portalNode: MapNode = {
      id: zone.id,
      zoneName: zone.name,
      name: "📚 学习圣所",
      icon: "📚",
      theme: "library",
      x: center.x,
      y: 0,
      // 学习圣所与词汇探索区共用同一个中心，四条路线从这里向外展开。
      z: center.z,
      unlocked: true,
      cleared: this.state.save.levelProgress[zone.id]?.cleared ?? false,
    };

    const subWorldNodes = subWorlds.map((subWorld, index): MapNode => {
      const angle = Math.PI / 2 + (index / Math.max(1, subWorlds.length)) * Math.PI * 2;
      const radius = 28 + (index % 2) * 7;
      const x = center.x + Math.cos(angle) * radius;
      const z = center.z + Math.sin(angle) * radius;
      const progressId = `${zone.id}::${subWorld.id}`;
      const previous = index === 0 ? null : `${zone.id}::${subWorlds[index - 1].id}`;
      return {
        id: progressId,
        zoneName: zone.name,
        name: subWorld.title,
        icon: subWorld.icon,
        theme: unitWorld?.worldName ?? "library",
        x,
        y: 0,
        z,
        unlocked: index === 0 || Boolean(previous && this.state.save.levelProgress[previous]?.cleared),
        cleared: Boolean(this.state.save.levelProgress[progressId]?.cleared),
      };
    });

    const exploreNodes = [portalNode, ...subWorldNodes];
    this.world?.setBiome(unitId);
    this.world?.setPickups(pickups.filter((p) => !p.collected));
    this.world?.setNodes(exploreNodes, zone.id);
    // 同步小地图范围以包含所有词汇光球
    this.minimap?.setNodes(exploreNodes, pickups);

    this.updateExploreProgressHud();
    this.showExploreHud(true);

    const hintBar = this.root.querySelector("#world-hint-bar");
    if (hintBar) {
      hintBar.textContent = "走近发光词球按 E 收集词汇 · 中央枢纽进入单元总览 · 沿路线进入文章世界";
    }

    // 展示单元入口介绍卡
    this.showUnitEntryCard(zone, words.length, collectedIds.size);
  }

  /** 展示进入单元时的简介卡 */
  private showUnitEntryCard(zone: ZoneDef, totalWords: number, collected: number): void {
    const rw3Unit = this.rw3Units.get(zone.id.replace("rw3_", ""));
    const world = getRw3World(zone.id.replace("rw3_", ""));
    const title = rw3Unit?.title ?? zone.name_en;
    const theme = rw3Unit?.theme ?? "";

    const sections: string[] = [];
    if (rw3Unit?.sections.section_a?.title) sections.push(`Section A: ${rw3Unit.sections.section_a.title}`);
    if (rw3Unit?.sections.section_b?.title) sections.push(`Section B: ${rw3Unit.sections.section_b.title}`);
    if (rw3Unit?.sections.section_c?.title) sections.push(`Section C: ${rw3Unit.sections.section_c.title}`);

    const card = this.root.querySelector("#word-pickup-card");
    if (!card) return;

    if (this.wordCardTimer) clearTimeout(this.wordCardTimer);

    card.innerHTML = `
      <div class="wc-inner unit-entry-card">
        <div class="wc-collected-badge">📍 ${zone.name}</div>
        <div class="unit-entry-title">${world?.worldName ?? title}</div>
        ${world ? `<div class="unit-world-tagline">${world.worldTagline}</div><div class="unit-world-mentor">导师：${world.mentor}</div>` : ""}
        <div class="unit-entry-theme">${theme}</div>
        ${world ? `<div class="unit-world-story">${world.opening}</div><div class="unit-world-mission"><strong>本幕任务</strong> ${world.mission}</div><div class="unit-world-landmarks">${world.landmarks.map((landmark) => `<span>${landmark}</span>`).join("")}</div>` : ""}
        <div class="unit-entry-sections">${sections.map((s) => `<div class="unit-sec-item">${s}</div>`).join("")}</div>
        <div class="unit-world-portals">
          ${(this.unitExplore?.subWorlds ?? []).map((subWorld, index) => {
            const progressId = `${zone.id}::${subWorld.id}`;
            const previous = index === 0 ? null : `${zone.id}::${this.unitExplore?.subWorlds[index - 1].id}`;
            const unlocked = index === 0 || Boolean(previous && this.state.save.levelProgress[previous]?.cleared);
            return `<button class="unit-world-portal${unlocked ? "" : " locked"}" data-world-id="${subWorld.id}" type="button" ${unlocked ? "" : "disabled"}><span>${index + 1}</span><strong>${subWorld.icon} ${subWorld.title}</strong><small>${unlocked ? subWorld.subtitle : "完成前一个世界后解锁"}</small><em>${this.state.save.levelProgress[progressId]?.cleared ? "已完成" : unlocked ? "进入世界 →" : "未解锁"}</em></button>`;
          }).join("")}
        </div>
        <div class="unit-entry-stats">
          <span>词汇 ${totalWords} 词</span>
          <span>已收集 ${collected}/${totalWords}</span>
          <span>阅读 · 听力 · 语法 · 翻译 · 写作 · 记忆</span>
        </div>
        <button class="wc-dismiss" id="btn-unit-entry-ok">开始探索 →</button>
      </div>
    `;
    (card as HTMLElement).scrollTop = 0;
    card.classList.add("unit-entry-open");
    this.prepareWordPickupCard(card as HTMLElement);
    const scrollPosition = this.wordCardScrollPosition;
    card.classList.remove("hidden");
    card.classList.add("wc-enter");
    requestAnimationFrame(() => {
      (card as HTMLElement).scrollTop = 0;
      if (scrollPosition) window.scrollTo(scrollPosition.x, scrollPosition.y);
      requestAnimationFrame(() => {
        if (!card.classList.contains("hidden")) {
          (card as HTMLElement).scrollTop = 0;
          if (scrollPosition) window.scrollTo(scrollPosition.x, scrollPosition.y);
        }
      });
    });
    this.updateProximityHud(this.proximityNode);

    card.querySelector("#btn-unit-entry-ok")?.addEventListener("click", () => this.dismissWordCard());
    card.querySelectorAll<HTMLButtonElement>(".unit-world-portal:not(:disabled)").forEach((button) => {
      button.addEventListener("click", () => {
        const worldId = button.dataset.worldId;
        if (!worldId) return;
        this.dismissWordCard();
        this.state.setMapNode(`${zone.id}::${worldId}`);
        this.world?.setSubWorld(worldId);
        this.world?.pause();
        this.openScene(`${zone.id}::${worldId}`);
      });
    });
  }

  private exitUnitExplore(): void {
    this.unitExplore = null;
    this.spectatorMode = false;
    this.world?.setSpectatorMode(false);
    window.scrollTo(0, 0);

    // 恢复默认生物群系和全局节点
    this.world?.setBiome(undefined);
    this.world?.setSubWorld(undefined);
    this.world?.setPickups([]);
    this.world?.setNodes(this.mapNodes, this.state.save.mapNodeId);

    this.showExploreHud(false);
    this.hidePickupPanel();
    this.updateProximityHud(null);

    const hintBar = this.root.querySelector("#world-hint-bar");
    if (hintBar) {
      hintBar.textContent = "WASD/摇杆走动 · Shift 奔跑 · 走近 Unit 水晶 · E 进入单元地图";
    }

    const selectedUnitId = this.state.save.mapNodeId.split("::")[0];
    const selectedUnit = this.mapNodes.find((node) => node.id === selectedUnitId);
    this.renderMapHint(selectedUnit ?? null);
  }

  private showExploreHud(show: boolean): void {
    const hud = this.root.querySelector("#explore-progress-hud");
    if (hud) hud.classList.toggle("hidden", !show);
  }

  private updateExploreProgressHud(): void {
    if (!this.unitExplore) return;
    const text = this.root.querySelector("#explore-progress-text");
    if (!text) return;

    const total = this.unitExplore.pickups.length;
    const collected = this.unitExplore.collectedIds.size;
    const pct = total > 0 ? Math.round((collected / total) * 100) : 0;
    text.innerHTML = `
      <span class="explore-unit-label">${this.unitExplore.unitLabel}</span>
      <span class="explore-pickup-count">词汇收集 ${collected}/${total}</span>
      <div class="explore-pickup-bar"><div class="explore-pickup-fill" style="width:${pct}%"></div></div>
    `;
  }

  private onPickupNear(pickup: WordPickup | null): void {
    const panel = this.root.querySelector("#pickup-panel");
    const label = this.root.querySelector("#pickup-label");
    if (!panel) return;

    if (!pickup) {
      panel.classList.add("hidden");
      return;
    }

    panel.classList.remove("hidden");
    if (label) label.textContent = `"${pickup.word}" — ${pickup.meaning}`;
  }

  private hidePickupPanel(): void {
    this.root.querySelector("#pickup-panel")?.classList.add("hidden");
    this.root.querySelector("#word-pickup-card")?.classList.add("hidden");
  }

  private collectPickup(id: string): void {
    if (!this.unitExplore) return;

    const pickup = this.unitExplore.pickups.find((p) => p.id === id);
    if (!pickup || pickup.collected) return;

    pickup.collected = true;
    this.unitExplore.collectedIds.add(id);

    // 记录到已发现词汇
    this.state.recordDiscovered(id);

    // 通知 3D 世界播放消失动画
    this.world?.markPickupCollected(id);

    // 隐藏拾取面板
    this.hidePickupPanel();

    // 更新进度 HUD
    this.updateExploreProgressHud();

    // 弹出快速单词卡
    this.showWordPickupCard(pickup);

    audio.play("win");
  }

  private showWordPickupCard(pickup: WordPickup): void {
    const card = this.root.querySelector("#word-pickup-card");
    if (!card) return;

    if (this.wordCardTimer) clearTimeout(this.wordCardTimer);

    const w = this.wordMap.get(pickup.id);
    const pos = w?.pos ? `<span class="wc-pos">${w.pos}</span>` : "";
    const example = w?.example
      ? `<div class="wc-example">${w.example}</div>`
      : "";

    card.innerHTML = `
      <div class="wc-inner">
        <div class="wc-collected-badge">✦ 词汇已收集</div>
        <div class="wc-word">
          ${pickup.word}
          <button class="btn-tts wc-tts" title="朗读">🔊</button>
        </div>
        ${pos}
        <div class="wc-meaning">${pickup.meaning}</div>
        ${example}
        <button class="wc-dismiss">继续探索 →</button>
      </div>
    `;
    (card as HTMLElement).scrollTop = 0;
    this.prepareWordPickupCard(card as HTMLElement);
    card.classList.remove("unit-entry-open");
    card.classList.remove("hidden");
    card.classList.add("wc-enter");
    this.updateProximityHud(this.proximityNode);

    card.querySelector(".btn-tts")?.addEventListener("click", () => speakWord(pickup.word));
    card.querySelector(".wc-dismiss")?.addEventListener("click", () => this.dismissWordCard());

    this.wordCardTimer = setTimeout(() => this.dismissWordCard(), 5000);
  }

  private dismissWordCard(): void {
    const card = this.root.querySelector("#word-pickup-card");
    if (!card) return;
    const scrollPosition = this.wordCardScrollPosition;
    const focusReturn = this.wordCardFocusReturn;
    const active = document.activeElement;
    if (active instanceof HTMLElement && card.contains(active)) active.blur();
    this.wordCardScrollPosition = null;
    this.wordCardFocusReturn = null;
    card.classList.add("hidden");
    card.classList.remove("wc-enter");
    card.classList.remove("unit-entry-open");
    card.removeAttribute("style");
    this.updateProximityHud(this.proximityNode);
    if (this.wordCardTimer) {
      clearTimeout(this.wordCardTimer);
      this.wordCardTimer = null;
    }
    if (scrollPosition) {
      const restorePosition = (): void => {
        if (focusReturn?.isConnected && focusReturn.getClientRects().length > 0) {
          focusReturn.focus({ preventScroll: true });
        }
        window.scrollTo(scrollPosition.x, scrollPosition.y);
      };
      requestAnimationFrame(() => {
        restorePosition();
        requestAnimationFrame(restorePosition);
      });
    }
  }

  private prepareWordPickupCard(card: HTMLElement): void {
    const isUnitEntry = card.querySelector(".unit-entry-card") !== null;
    const world = this.root.querySelector<HTMLElement>("#world-viewport");
    const rect = world?.getBoundingClientRect();
    const isMobile = window.matchMedia("(max-width: 540px)").matches;
    const useMobileSheet = isUnitEntry && isMobile;
    const top = useMobileSheet
      ? 12
      : rect
      ? Math.max(12, Math.min(rect.top + 12, window.innerHeight - 180))
      : 12;
    const bottom = useMobileSheet
      ? 12
      : isMobile
      ? 76
      : rect
      ? Math.max(12, Math.min(window.innerHeight - rect.bottom + 12, window.innerHeight - top - 180))
      : 12;
    card.style.position = "fixed";
    card.style.top = `${top}px`;
    card.style.bottom = `${bottom}px`;
    this.wordCardScrollPosition = { x: window.scrollX, y: window.scrollY };
    const active = document.activeElement;
    this.wordCardFocusReturn =
      active instanceof HTMLElement && active !== document.body && !card.contains(active)
        ? active
        : null;
  }

  /** 进入学习场景 */
  private openScene(levelId: string): void {
    const subWorldMatch = levelId.match(/^(rw3_unit\d+)::(.+)$/);
    const baseLevelId = subWorldMatch?.[1] ?? levelId;
    const ref = this.levelMap.get(baseLevelId);
    if (!ref) {
      showToast("场景加载失败");
      return;
    }

    const { level, zone } = ref;
    const subWorldId = subWorldMatch?.[2];

    // CET 非词汇关卡（听力 / 阅读 / 翻译 / Boss）
    if (level.word_ids.length === 0 && level.content_refs && level.content_refs.length > 0) {
      if (!this.cetContent) {
        showToast("内容加载中，请稍候");
        return;
      }
      this.state.setMapNode(levelId);
      audio.play("start");
      this.cetQuizIndex = 0;
      this.cetQuizCorrect = new Set();
      this.cetTranslationDone = false;
      this.renderCetContentScene(level, zone);
      this.show("scene");
      return;
    }

    if (level.word_ids.length === 0) {
      showToast("场景内容即将更新");
      return;
    }

    const index = this.template!.zones.findIndex((z) => z.id === zone.id);
    let built: ContextScene | null;
    if (this.state.save.courseId === "college_english_rw3") {
      const unitId = zone.id.replace("rw3_", "");
      const rw3Unit = this.rw3Units.get(unitId);
      if (subWorldId) {
        const hub = buildRw3UnitScene(zone, this.wordMap, rw3Unit, level.word_ids, index);
        const subWorld = this.unitExplore?.subWorlds.find((item) => item.id === subWorldId)
          ?? buildRw3SubWorlds(rw3Unit, getRw3World(unitId), hub?.rw3Phases ?? []).find((item) => item.id === subWorldId);
        if (!subWorld) {
          showToast("子世界内容加载失败");
          return;
        }
        built = buildRw3SubWorldScene(zone, this.wordMap, rw3Unit, level.word_ids, subWorld, index);
      } else {
        built = buildRw3UnitScene(zone, this.wordMap, rw3Unit, level.word_ids, index);
      }
    } else {
      built = buildContextScene(level, zone, this.wordMap, zone.levels.findIndex((l) => l.id === level.id), zone.levels.length);
    }
    if (!built) {
      showToast("场景加载失败");
      return;
    }

    this.beginScene(built, "level");
    this.state.setMapNode(levelId);
    audio.play("start");
    this.renderScene();
    this.show("scene");
  }


  /** 渲染 CET 内容场景（听力/阅读/翻译/Boss） */
  private renderCetContentScene(level: LevelDef, zone: ZoneDef): void {
    const screen = this.root.querySelector("#screen-scene");
    if (!screen || !this.cetContent) return;

    const ref = (level.content_refs ?? [])[0] ?? "";
    const [kind] = ref.split(":");

    if (kind === "listening") {
      const id = ref.split(":")[1];
      const item = this.cetContent.listening.get(id);
      if (item) { this.renderCetListening(screen, level, zone, item); return; }
    }
    if (kind === "reading") {
      const id = ref.split(":")[1];
      const item = this.cetContent.reading.get(id);
      if (item) { this.renderCetReading(screen, level, zone, item); return; }
    }
    if (kind === "translation") {
      const id = ref.split(":")[1];
      const item = this.cetContent.translation.get(id);
      if (item) { this.renderCetTranslation(screen, level, zone, item); return; }
    }
    if (kind === "mock_exam") {
      this.renderCetBoss(screen, level, zone);
      return;
    }

    showToast("内容格式错误");
  }

  private cetQuizHeader(level: LevelDef, zone: ZoneDef, icon: string, subtitle: string, correct: number, total: number): string {
    return `
      <div class="card scene-header">
        <span class="progress-pill">${zone.name} · ${level.title}</span>
        <div class="title" style="font-size:1.1rem">${icon} ${level.title}</div>
        <p class="learn-steps">${subtitle}</p>
        <div class="discover-bar"><div class="discover-fill" style="width:${total ? (correct / total) * 100 : 0}%"></div></div>
        <div class="discover-label">题目 <strong>${correct}/${total}</strong></div>
      </div>
    `;
  }

  private renderCetListening(screen: Element, level: LevelDef, zone: ZoneDef, item: CetListeningItem): void {
    const q = item.questions[this.cetQuizIndex];
    const done = this.cetQuizCorrect.size >= item.questions.length;
    const scriptLines = item.script.split("\n");

    screen.innerHTML = `
      ${this.cetQuizHeader(level, zone, "🎧", "① 阅读听力稿 ② 完成理解题", this.cetQuizCorrect.size, item.questions.length)}
      <div class="card listen-script" id="listen-body">
        ${scriptLines.map((l) => `<p style="margin:0.25rem 0">${l}</p>`).join("")}
      </div>
      ${q ? `<div class="card quiz-card" id="quiz-card">
        <p class="quiz-q">${q.question}</p>
        <div class="quiz-choices" id="quiz-choices"></div>
        <p class="quiz-feedback" id="quiz-feedback"></p>
      </div>` : ""}
      <div class="scene-actions">
        <button class="btn btn-ghost" id="btn-back-map" type="button">返回地图</button>
        <button class="btn btn-primary" id="btn-cet-finish" type="button" ${done ? "" : "disabled"}>完成本关</button>
      </div>
    `;

    if (q) this.bindCetQuizChoices(screen, item.questions, "listening", level, zone, item);

    screen.querySelector("#btn-back-map")?.addEventListener("click", () => {
      this.returnToMapFromScene();
    });
    screen.querySelector("#btn-cet-finish")?.addEventListener("click", () => {
      if (done) { this.finishCetScene(level.id); }
    });
  }

  private renderCetReading(screen: Element, level: LevelDef, zone: ZoneDef, item: CetReadingItem): void {
    const q = item.questions[this.cetQuizIndex];
    const done = this.cetQuizCorrect.size >= item.questions.length;

    screen.innerHTML = `
      ${this.cetQuizHeader(level, zone, "📖", "① 阅读短文 ② 完成理解题", this.cetQuizCorrect.size, item.questions.length)}
      <div class="card listen-script" id="passage-body">
        <p style="line-height:1.8">${item.passage}</p>
      </div>
      ${q ? `<div class="card quiz-card" id="quiz-card">
        <p class="quiz-q">${q.question}</p>
        <div class="quiz-choices" id="quiz-choices"></div>
        <p class="quiz-feedback" id="quiz-feedback"></p>
      </div>` : ""}
      <div class="scene-actions">
        <button class="btn btn-ghost" id="btn-back-map" type="button">返回地图</button>
        <button class="btn btn-primary" id="btn-cet-finish" type="button" ${done ? "" : "disabled"}>完成本关</button>
      </div>
    `;

    if (q) this.bindCetQuizChoices(screen, item.questions, "reading", level, zone, item);

    screen.querySelector("#btn-back-map")?.addEventListener("click", () => {
      this.returnToMapFromScene();
    });
    screen.querySelector("#btn-cet-finish")?.addEventListener("click", () => {
      if (done) { this.finishCetScene(level.id); }
    });
  }

  private renderCetTranslation(screen: Element, level: LevelDef, zone: ZoneDef, item: CetTranslationItem): void {
    screen.innerHTML = `
      <div class="card scene-header">
        <span class="progress-pill">${zone.name} · ${level.title}</span>
        <div class="title" style="font-size:1.1rem">✍️ ${level.title}</div>
        <p class="learn-steps">将中文句子译为英文（需包含关键词）</p>
      </div>
      <div class="card translation-card">
        <p class="translation-zh">${item.zh}</p>
        <p class="translation-hint">关键词：${item.keywords.join("、")}</p>
        <textarea class="translation-input" id="translation-input" rows="4" placeholder="在此输入英文译文…"></textarea>
        <p class="translation-ref hidden" id="translation-ref">参考译文：${item.en_reference}</p>
        <p class="translation-feedback" id="translation-feedback"></p>
        <button class="btn btn-primary" id="btn-check-translation" type="button">提交译文</button>
      </div>
      <div class="scene-actions">
        <button class="btn btn-ghost" id="btn-back-map" type="button">返回地图</button>
        <button class="btn btn-primary" id="btn-cet-finish" type="button" ${this.cetTranslationDone ? "" : "disabled"}>完成本关</button>
      </div>
    `;

    screen.querySelector("#btn-check-translation")?.addEventListener("click", () => {
      const input = (screen.querySelector("#translation-input") as HTMLTextAreaElement).value;
      const result = checkTranslation(input, {
        zh: item.zh, enReference: item.en_reference, keywords: item.keywords,
      });
      const feedback = screen.querySelector("#translation-feedback");
      const ref = screen.querySelector("#translation-ref");
      ref?.classList.remove("hidden");
      if (result.ok) {
        this.cetTranslationDone = true;
        audio.play("win");
        if (feedback) feedback.textContent = `关键词命中：${result.matched.join("、")} ✓`;
        const btn = screen.querySelector("#btn-cet-finish") as HTMLButtonElement;
        if (btn) btn.disabled = false;
      } else {
        audio.play("click");
        if (feedback) feedback.textContent = `请再试试，需包含至少 2 个关键词（${item.keywords.join("、")}）。`;
      }
    });
    screen.querySelector("#btn-back-map")?.addEventListener("click", () => {
      this.returnToMapFromScene();
    });
    screen.querySelector("#btn-cet-finish")?.addEventListener("click", () => {
      if (this.cetTranslationDone) { this.finishCetScene(level.id); }
    });
  }

  private renderCetBoss(screen: Element, level: LevelDef, zone: ZoneDef): void {
    if (!this.cetContent) return;
    // Boss 关：听力 + 阅读 + 翻译各取一道
    const listenArr = [...this.cetContent.listening.values()];
    const readArr = [...this.cetContent.reading.values()];
    const bossIdx = zone.levels.findIndex((l) => l.id === level.id);
    const listening = listenArr[bossIdx % listenArr.length];
    const reading = readArr[(bossIdx + 2) % readArr.length];

    // 简化 Boss：合并展示听力 + 阅读各一题 + 翻译
    const allQ = [...(listening?.questions ?? []).slice(0, 1), ...(reading?.questions ?? []).slice(0, 1)];
    const done = this.cetQuizCorrect.size >= allQ.length;

    screen.innerHTML = `
      <div class="card scene-header">
        <span class="progress-pill">${zone.name} · ${level.title} · Boss 挑战</span>
        <div class="title" style="font-size:1.1rem">🏛 ${level.title}</div>
        <p class="learn-steps">听力 + 阅读理解 · 综合挑战</p>
        <div class="discover-bar"><div class="discover-fill" style="width:${allQ.length ? (this.cetQuizCorrect.size / allQ.length) * 100 : 0}%"></div></div>
        <div class="discover-label">题目 <strong>${this.cetQuizCorrect.size}/${allQ.length}</strong></div>
      </div>
      ${listening ? `<div class="card listen-script"><p class="subtitle" style="margin-bottom:0.5rem">🎧 听力稿</p>${listening.script.split("\n").map((l) => `<p style="margin:0.25rem 0">${l}</p>`).join("")}</div>` : ""}
      ${reading ? `<div class="card listen-script"><p class="subtitle" style="margin-bottom:0.5rem">📖 阅读段落</p><p style="line-height:1.8">${reading.passage}</p></div>` : ""}
      ${!done && allQ[this.cetQuizIndex] ? `<div class="card quiz-card" id="quiz-card">
        <p class="quiz-q">${allQ[this.cetQuizIndex].question}</p>
        <div class="quiz-choices" id="quiz-choices"></div>
        <p class="quiz-feedback" id="quiz-feedback"></p>
      </div>` : ""}
      <div class="scene-actions">
        <button class="btn btn-ghost" id="btn-back-map" type="button">返回地图</button>
        <button class="btn btn-primary" id="btn-cet-finish" type="button" ${done ? "" : "disabled"}>Boss 攻克！</button>
      </div>
    `;

    if (!done && allQ[this.cetQuizIndex]) {
      this.bindCetQuizChoices(screen, allQ, "boss", level, zone, null);
    }
    screen.querySelector("#btn-back-map")?.addEventListener("click", () => {
      this.returnToMapFromScene();
    });
    screen.querySelector("#btn-cet-finish")?.addEventListener("click", () => {
      if (done) { this.finishCetScene(level.id); }
    });
  }

  private bindCetQuizChoices(
    screen: Element,
    questions: Array<{ question: string; options: string[]; answer: number; explanation?: string }>,
    _sceneType: string,
    _level: LevelDef,
    _zone: ZoneDef,
    _itemRef: CetListeningItem | CetReadingItem | null
  ): void {
    const q = questions[this.cetQuizIndex];
    if (!q) return;
    const choices = screen.querySelector("#quiz-choices")!;
    q.options.forEach((opt, i) => {
      const btn = el("button", "quiz-choice");
      btn.type = "button";
      btn.textContent = opt;
      btn.addEventListener("click", () => {
        screen.querySelectorAll(".quiz-choice").forEach((b) => { (b as HTMLButtonElement).disabled = true; });
        const feedback = screen.querySelector("#quiz-feedback");
        if (i === q.answer) {
          btn.classList.add("correct");
          this.cetQuizCorrect.add(this.cetQuizIndex);
          audio.play("win");
          if (feedback) feedback.textContent = q.explanation ?? "正确！";
          setTimeout(() => {
            if (this.cetQuizIndex < questions.length - 1) {
              this.cetQuizIndex++;
            }
            const ref = this.levelMap.get(this.state.save.mapNodeId);
            if (ref) this.renderCetContentScene(ref.level, ref.zone);
          }, 700);
        } else {
          btn.classList.add("wrong");
          audio.play("click");
          if (feedback) feedback.textContent = `答案：${q.options[q.answer]}。${q.explanation ?? ""}`;
          setTimeout(() => {
            const ref = this.levelMap.get(this.state.save.mapNodeId);
            if (ref) this.renderCetContentScene(ref.level, ref.zone);
          }, 1100);
        }
      });
      choices.appendChild(btn);
    });
  }

  private finishCetScene(levelId: string): void {
    const wasNew = !this.state.save.levelProgress[levelId]?.cleared;
    const rewardGranted = wasNew ? this.state.grantReward(`level-complete:${levelId}`, 30) : false;
    if (wasNew) this.state.completeLevel(levelId);
    showToast(wasNew ? `本关完成！${rewardGranted ? " · 获得奖励 +30 XP" : ""}` : "重温完成");
    audio.play("win");
    this.loadCourse(this.state.save.courseId).then(async () => {
      await this.renderMap();
      this.show("map");
    });
  }

  /** 进入间隔复习场景 */
  private openReview(dueIds: string[]): void {
    const built = buildReviewScene(dueIds, this.wordMap);
    if (!built) {
      showToast("暂无到期复习词");
      return;
    }
    this.beginScene(built, "review");
    audio.play("start");
    this.renderScene();
    this.show("scene");
  }

  /** 进入薄弱词巩固场景 */
  private openWeak(weakIds: string[]): void {
    const built = buildWeakScene(weakIds, this.wordMap);
    if (!built) {
      showToast("暂无薄弱词");
      return;
    }
    this.beginScene(built, "weak");
    audio.play("start");
    this.renderScene();
    this.show("scene");
  }

  private beginScene(built: ContextScene, mode: SceneMode): void {
    this.scene = built;
    this.sceneMode = mode;
    this.sessionGraded = new Set();
    this.answerRevealed = false;
    this.selectedWordId = null;
    this.clozeWrongGraded = new Set();
    this.rw3PhaseIndex = 0;
    this.rw3QuizIndex = 0;
    this.rw3QuizCorrect = new Set();
    this.rw3WorldRecallDone = new Set();
    this.rw3WorldCheckCorrect = new Set();
    this.rw3ClozeIndex = 0;
    this.rw3ClozeDone = new Set();
    this.rw3TranslationIndex = 0;
    this.rw3TranslationDone = false;
    this.rw3WritingAck = false;
    this.rw3GrammarIndex = 0;
    this.rw3GrammarCorrect = new Set();
    this.rw3MemoryDone = new Set();

    const useRw3 =
      mode === "level" &&
      this.state.save.courseId === "college_english_rw3" &&
      (built.rw3Phases?.length ?? 0) > 0;

    if (useRw3) {
      this.phase = "rw3";
      this.rw3PhaseIndex = this.state.save.levelProgress[built.levelId]?.cleared
        ? 0
        : this.state.getRw3PhaseIndex(built.levelId, built.rw3Phases!.length);
      this.clozeItems = [];
      this.clozeIndex = 0;
      this.clozeDone = new Set();
    } else {
      this.phase = "input";
      this.clozeItems = buildClozeItems(built.words);
      this.clozeIndex = 0;
      this.clozeDone = new Set();
    }
  }

  /** 渲染学习场景 */
  private renderScene(): void {
    if (this.phase === "rw3") this.renderRw3Phase();
    else if (this.phase === "input") this.renderInputPhase();
    else this.renderClozePhase();
  }

  private rw3StepperHtml(): string {
    const phases = this.scene?.rw3Phases ?? [];
    if (!phases.length) return "";
    const current = phases[this.rw3PhaseIndex];
    return `<details class="rw3-route">
      <summary><span>单元路线</span><strong>${current?.label ?? "学习阶段"}</strong><span>${this.rw3PhaseIndex + 1}/${phases.length}</span></summary>
      <div class="rw3-stepper" aria-label="本单元学习路线">${phases
      .map((p, i) => {
        const cls =
          i === this.rw3PhaseIndex ? "active" : i < this.rw3PhaseIndex ? "done" : "";
        const currentStep = i === this.rw3PhaseIndex ? ' aria-current="step"' : "";
        return `<span class="rw3-step ${cls}"${currentStep}>${p.label}</span>`;
      })
      .join("")}</div>
    </details>`;
  }

  /** 把学习科学策略显示为本阶段可执行动作，而不是装饰性口号。 */
  private rw3LearningMethodsHtml(): string {
    const methods = this.scene?.learningMethods ?? [];
    if (!methods.length) return "";
    return `
      <details class="learning-methods">
        <summary>🧠 本阶段的学习动作</summary>
        <div class="learning-method-grid">
          ${methods.map((method) => `<div class="learning-method-item"><strong>${method.title}</strong><span>${method.action}</span></div>`).join("")}
        </div>
      </details>
    `;
  }

  private renderRw3Phase(): void {
    const screen = this.root.querySelector("#screen-scene");
    const phase = this.scene?.rw3Phases?.[this.rw3PhaseIndex];
    if (!screen || !this.scene || !phase) return;

    const totalPhases = this.scene.rw3Phases!.length;
    const phaseNo = this.rw3PhaseIndex + 1;

    if (
      phase.kind === "section_a" ||
      phase.kind === "section_b" ||
      phase.kind === "section_c" ||
      phase.kind === "vocab"
    ) {
      this.renderRw3ReadingPhase(screen, phase, phaseNo, totalPhases);
    } else if (phase.kind === "reading_quiz" || phase.kind === "listening") {
      this.renderRw3QuizPhase(screen, phase, phaseNo, totalPhases);
    } else if (phase.kind === "grammar") {
      this.renderRw3GrammarPhase(screen, phase, phaseNo, totalPhases);
    } else if (phase.kind === "cloze") {
      this.renderRw3ClozePhase(screen, phase, phaseNo, totalPhases);
    } else if (phase.kind === "translation") {
      this.renderRw3TranslationPhase(screen, phase, phaseNo, totalPhases);
    } else if (phase.kind === "writing") {
      this.renderRw3WritingPhase(screen, phase, phaseNo, totalPhases);
    } else if (phase.kind === "memory") {
      this.renderRw3MemoryPhase(screen, phase, phaseNo, totalPhases);
    }

    this.syncRw3LearningWorld(phase, screen);
  }

  private syncRw3LearningWorld(phase: Rw3Phase, screen: Element): void {
    if (!this.scene?.unitId?.startsWith("rw3_")) return;

    const unitId = this.scene.unitId.replace("rw3_", "");
    if (this.rw3LearningWorldUnitId !== unitId) {
      const unitNode = this.mapNodes.find((node) => node.id === this.scene?.unitId);
      if (unitNode) {
        this.world?.setBiome(unitId);
        this.world?.setPickups([]);
        this.world?.setNodes([unitNode], unitNode.id, false);
        this.rw3LearningWorldUnitId = unitId;
      }
    }

    let worldId: string;
    let title: string;
    let landmark = "";
    switch (phase.kind) {
      case "section_a":
      case "section_b":
      case "section_c":
        worldId = phase.worldId ?? `${phase.kind}-world-1`;
        title = phase.worldTitle ?? phase.title;
        landmark = phase.landmark ?? "文章微世界";
        break;
      case "vocab":
        worldId = `lab-vocab-${phase.level}`;
        title = `词汇关卡 ${phase.level}/${phase.totalLevels}`;
        landmark = "词义回忆阵列";
        break;
      case "grammar":
        worldId = "lab-grammar";
        title = phase.title;
        landmark = "句法构造工坊";
        break;
      case "cloze":
        worldId = "lab-cloze";
        title = "语境填空 · 线索桥";
        landmark = "缺词桥梁";
        break;
      case "translation":
        worldId = "lab-translation";
        title = "翻译 · 双语转换门";
        landmark = "意义转换门";
        break;
      case "reading_quiz":
        worldId = "project-reading";
        title = phase.title;
        landmark = "阅读证据档案";
        break;
      case "listening":
        worldId = "project-listening";
        title = phase.title;
        landmark = "听觉回声塔";
        break;
      case "writing":
        worldId = "project-writing";
        title = "写作 · 表达工作台";
        landmark = "表达工作台";
        break;
      case "memory":
        worldId = "project-memory";
        title = phase.title;
        landmark = "记忆路线星图";
        break;
    }

    this.world?.setSubWorld(worldId, title || landmark);

    const ribbon = el("div", "rw3-world-ribbon");
    const eyebrow = el("span", "rw3-world-ribbon-eyebrow");
    eyebrow.textContent = `${this.scene.title} · ${phase.label}`;
    const heading = el("strong", "rw3-world-ribbon-title");
    heading.textContent = landmark || title;
    ribbon.append(eyebrow, heading);
    screen.prepend(ribbon);
  }

  private renderRw3ReadingPhase(
    screen: Element,
    phase: Extract<Rw3Phase, { kind: "section_a" | "section_b" | "section_c" | "vocab" }>,
    phaseNo: number,
    totalPhases: number
  ): void {
    const isArticlePhase =
      phase.kind === "section_a" || phase.kind === "section_b" || phase.kind === "section_c";
    const articlePhases = isArticlePhase
      ? (this.scene?.rw3Phases ?? []).filter((candidate) => candidate.kind === phase.kind)
      : [];
    const currentWorldId = phase.kind === "vocab" ? undefined : phase.worldId;
    const articlePartIndex = currentWorldId
      ? Math.max(0, articlePhases.findIndex((candidate) => "worldId" in candidate && candidate.worldId === currentWorldId)) + 1
      : 0;
    const graded = phase.words.filter((w) => this.sessionGraded.has(w.id)).length;
    const total = phase.words.length;
    const passageWorld = phase.kind === "vocab" ? null : phase;
    const recallRequired = Boolean(passageWorld?.worldId && passageWorld.recallPrompt);
    const recallDone = !recallRequired || this.rw3WorldRecallDone.has(passageWorld!.worldId!);
    const checkpoint = passageWorld?.checkpoint;
    const checkpointRequired = Boolean(passageWorld?.worldId && checkpoint);
    const checkpointDone = !checkpointRequired || this.rw3WorldCheckCorrect.has(passageWorld!.worldId!);
    const done = graded >= total && recallDone && checkpointDone;
    const taskTotal = total + (recallRequired ? 1 : 0) + (checkpointRequired ? 1 : 0);
    const taskDone = graded + (recallRequired && recallDone ? 1 : 0) + (checkpointRequired && checkpointDone ? 1 : 0);
    const progress = taskTotal ? taskDone / taskTotal : 1;
    const vocabHint =
      phase.kind === "vocab" ? ` · 第 ${phase.level}/${phase.totalLevels} 关（每关 5 词）` : "";
    const vocabInstruction = phase.kind === "vocab"
      ? `先主动回忆，再揭示释义并自评；本关需完成全部 ${total} 个词。`
      : `先主动回忆，再揭示释义并自评；通关需完成本段全部 ${total} 个词，并通过理解题与口头复述（至少说出 2 个高亮词）。`;
    const progressLabel = total
      ? `词汇 <strong>${graded}/${total}</strong>${recallRequired ? ` · 复述 <strong>${recallDone ? 1 : 0}/1</strong>` : ""}${checkpointRequired ? ` · 理解 <strong>${checkpointDone ? 1 : 0}/1</strong>` : ""}${vocabHint}`
      : recallRequired || checkpointRequired
        ? `微世界任务 <strong>${taskDone}/${taskTotal}</strong>`
        : "阅读完成";

    const sectionIcon = phase.kind === "section_a" ? "📖 A" : phase.kind === "section_b" ? "📖 B" : phase.kind === "section_c" ? "🏮 C" : "🗝";
    const sectionColor = phase.kind === "section_c" ? "rw3-section-c" : phase.kind === "vocab" ? "rw3-section-vocab" : "";

    screen.innerHTML = `
      <div class="card scene-header ${sectionColor} ${isArticlePhase ? "rw3-article-header" : ""}">
        <span class="progress-pill">读写3 · ${phaseNo}/${totalPhases} · ${phase.label}</span>
        ${this.rw3StepperHtml()}
        <h2 class="rw3-section-badge">${sectionIcon} ${phase.kind === "vocab" ? "词汇专项练习" : phase.title}</h2>
        ${passageWorld?.worldId ? `
          <div class="passage-world-card">
            <div class="passage-memory-anchor"><span>记忆宫殿 · ${passageWorld.label}</span>${passageWorld.memoryImage ?? "把本段核心事件安放在一个清晰地点，再沿地点线索复述。"}</div>
          </div>
        ` : ""}
        <p class="learn-steps">学习闭环：阅读 → 主动回忆 → 证据判断 → 口头复述</p>
        ${this.rw3LearningMethodsHtml()}
      </div>
      <div class="card scene-body rw3-passage-body" id="scene-body"></div>
      ${total ? `
        <div class="card rw3-vocab-practice">
          <div class="rw3-practice-heading"><div><span>主动检索</span><h3>核心词汇</h3></div><strong>${graded}/${total}</strong></div>
          <p>${vocabInstruction}</p>
          <div class="word-chips" id="word-chips">
            ${phase.words
              .map((w) => {
                const g = this.sessionGraded.has(w.id);
                const active = this.selectedWordId === w.id;
                return `<button type="button" class="word-chip${g ? " done" : ""}${active ? " active" : ""}" data-wid="${w.id}" title="${w.meaning}">${w.word}</button>`;
              })
              .join("")}
          </div>
        </div>
      ` : ""}
      ${total ? `<div class="card word-panel" id="word-panel"><p class="subtitle">选择一个核心词，先回忆，再揭示答案并自评。</p></div>` : ""}
      ${checkpoint ? `
        <div class="passage-checkpoint-card ${checkpointDone ? "complete" : ""}">
          <div class="passage-checkpoint-label">理解校准 · ${checkpointDone ? "已通过" : "回到段落，找到支持答案的证据"}</div>
          <p>${checkpoint.question}</p>
          <div class="passage-checkpoint-choices" id="passage-checkpoint-choices"></div>
          <p class="passage-checkpoint-feedback" id="passage-checkpoint-feedback"></p>
        </div>
      ` : ""}
      ${passageWorld?.recallPrompt ? `
        <div class="passage-recall-card ${recallDone ? "complete" : ""}">
          <div class="passage-recall-label">合上段落 · 主动复述 · ${recallDone ? "已完成" : "完成后才能进入下一世界"}</div>
          <p>${passageWorld.recallPrompt}</p>
          <button class="btn btn-ghost" id="btn-rw3-recall" type="button">${recallDone ? "已完成复述 ✓" : "我已完成口头复述"}</button>
        </div>
      ` : ""}
      <div class="rw3-learning-progress">
        <div class="discover-bar"><div class="discover-fill" style="width:${progress * 100}%"></div></div>
        <div class="discover-label">本世界过关进度 · ${progressLabel}</div>
      </div>
      <div class="scene-actions">
        <button class="btn btn-ghost" id="btn-back-map" type="button">返回地图</button>
        <button class="btn btn-primary" id="btn-rw3-next" type="button" ${done ? "" : "disabled"}>${phaseNo >= totalPhases ? "🎉 完成本单元" : "下一阶段 →"}</button>
      </div>
    `;

    const body = screen.querySelector("#scene-body");
    if (phase.kind === "vocab") {
      body?.remove();
    } else if (body) {
      const readingMeta = el("div", "rw3-reading-meta");
      const readingLabel = el("div", "rw3-reading-label");
      readingLabel.textContent = isArticlePhase
        ? `${phase.label} · 分段 ${articlePartIndex}/${articlePhases.length}`
        : `${phase.label} · 学习材料`;
      readingMeta.appendChild(readingLabel);
      if (isArticlePhase) {
        const provenance = el("span", "rw3-material-provenance");
        provenance.textContent = "原创仿学 · 非教材原文";
        readingMeta.appendChild(provenance);
      }
      const paragraph = el("p", "rw3-reading-copy");
      for (const seg of phase.segments) {
        if (seg.type === "text") {
          paragraph.append(seg.content);
          continue;
        }
        const g = this.sessionGraded.has(seg.wordId!);
        const btn = el("button", `ctx-word${g ? " discovered" : ""}${this.selectedWordId === seg.wordId ? " active" : ""}`);
        btn.type = "button";
        btn.textContent = seg.content;
        btn.addEventListener("click", () => this.onWordSelect(seg.wordId!));
        paragraph.appendChild(btn);
      }
      body.append(readingMeta, paragraph);
    }

    if (this.selectedWordId && total) this.renderRecallPanel(this.selectedWordId);

    screen.querySelectorAll("#word-chips .word-chip").forEach((chip) => {
      chip.addEventListener("click", () => {
        const wid = (chip as HTMLElement).dataset.wid;
        if (wid) this.onWordSelect(wid);
      });
    });
    screen.querySelector("#btn-rw3-recall")?.addEventListener("click", () => {
      if (!passageWorld?.worldId) return;
      this.rw3WorldRecallDone.add(passageWorld.worldId);
      audio.play("win");
      this.renderScene();
    });
    if (checkpoint) {
      const choices = screen.querySelector("#passage-checkpoint-choices");
      if (choices) {
        checkpoint.options.forEach((option, index) => {
          const button = el("button", `passage-checkpoint-choice${checkpointDone ? " correct" : ""}`);
          button.type = "button";
          button.textContent = option;
          button.disabled = checkpointDone;
          button.addEventListener("click", () => this.onRw3WorldCheckpointAnswer(passageWorld!, index, button));
          choices.appendChild(button);
        });
      }
    }
    screen.querySelector("#btn-back-map")?.addEventListener("click", () => this.returnToMapFromScene());
    screen.querySelector("#btn-rw3-next")?.addEventListener("click", () => {
      if (!done) return;
      this.advanceRw3Phase();
    });
  }

  private onRw3WorldCheckpointAnswer(
    phase: Extract<Rw3Phase, { kind: "section_a" | "section_b" | "section_c" }>,
    choiceIndex: number,
    button: HTMLButtonElement
  ): void {
    const checkpoint = phase.checkpoint;
    if (!checkpoint || !phase.worldId) return;
    const feedback = this.root.querySelector("#passage-checkpoint-feedback");
    this.root.querySelectorAll("#passage-checkpoint-choices .passage-checkpoint-choice").forEach((choice) => {
      (choice as HTMLButtonElement).disabled = true;
    });

    if (choiceIndex === checkpoint.answer) {
      button.classList.add("correct");
      this.rw3WorldCheckCorrect.add(phase.worldId);
      audio.play("win");
      if (feedback) feedback.textContent = checkpoint.explanation ?? "理解正确。你已经抓住了这一段的关键关系。";
      setTimeout(() => this.renderScene(), 700);
    } else {
      button.classList.add("wrong");
      audio.play("click");
      if (feedback) feedback.textContent = `再回到段落找证据。正确选项：${checkpoint.options[checkpoint.answer]}。${checkpoint.explanation ?? ""}`;
      setTimeout(() => this.renderScene(), 1100);
    }
  }

  /** 语法工坊：讲解 → 例句 → 立即应用 */
  private renderRw3GrammarPhase(
    screen: Element,
    phase: Extract<Rw3Phase, { kind: "grammar" }>,
    phaseNo: number,
    totalPhases: number
  ): void {
    const q = phase.questions[this.rw3GrammarIndex];
    const done = this.rw3GrammarCorrect.size >= phase.questions.length;
    const pointCards = phase.points
      .map(
        (point, index) => `
          <details class="grammar-point" ${index === 0 ? "open" : ""}>
            <summary><span class="grammar-point-index">0${index + 1}</span>${point.title}</summary>
            <p class="grammar-concept">${point.concept}</p>
            <div class="grammar-pattern">${point.pattern}</div>
            <p class="grammar-explanation">${point.explanation}</p>
            <div class="grammar-examples">${point.examples.map((example) => `<div><span class="grammar-en">${example.en}</span><span class="grammar-zh">${example.zh}</span></div>`).join("")}</div>
            <p class="grammar-pitfall">易错点：${point.pitfall}</p>
          </details>
        `
      )
      .join("");

    screen.innerHTML = `
      <div class="card scene-header grammar-header">
        <span class="progress-pill">读写3 单元 · ${phaseNo}/${totalPhases} · ${phase.label}</span>
        ${this.rw3StepperHtml()}
        <div class="title" style="font-size:1.1rem">⚙️ ${phase.title}</div>
        <p class="learn-steps">先理解结构，再用自己的答案完成一次真实运用；答错后要看懂错因再重试。</p>
        <div class="discover-bar"><div class="discover-fill" style="width:${phase.questions.length ? (this.rw3GrammarCorrect.size / phase.questions.length) * 100 : 100}%"></div></div>
        <div class="discover-label">语法应用 <strong>${this.rw3GrammarCorrect.size}/${phase.questions.length}</strong></div>
      </div>
      <div class="card grammar-points-card">
        <div class="grammar-section-label">本单元句法工具</div>
        ${pointCards}
      </div>
      <div class="card quiz-card grammar-quiz-card" id="grammar-quiz-card">
        ${q ? `<div class="grammar-quiz-meta">应用题 ${this.rw3GrammarIndex + 1}/${phase.questions.length}</div><p class="quiz-q">${q.question}</p><div class="quiz-choices" id="grammar-choices"></div><p class="quiz-feedback" id="grammar-feedback"></p>` : `<p class="grammar-complete">本单元语法已经完成。把句型带进下一段阅读或写作。</p>`}
      </div>
      <div class="scene-actions">
        <button class="btn btn-ghost" id="btn-back-map" type="button">返回地图</button>
        <button class="btn btn-primary" id="btn-rw3-next" type="button" ${done ? "" : "disabled"}>下一阶段</button>
      </div>
    `;

    if (q) {
      const choices = screen.querySelector("#grammar-choices")!;
      q.options.forEach((option, index) => {
        const btn = el("button", "quiz-choice");
        btn.type = "button";
        btn.textContent = option;
        btn.addEventListener("click", () => this.onRw3GrammarAnswer(phase, index, btn));
        choices.appendChild(btn);
      });
    }

    screen.querySelector("#btn-back-map")?.addEventListener("click", () => this.returnToMapFromScene());
    screen.querySelector("#btn-rw3-next")?.addEventListener("click", () => {
      if (done) this.advanceRw3Phase();
    });
  }

  private onRw3GrammarAnswer(
    phase: Extract<Rw3Phase, { kind: "grammar" }>,
    choiceIndex: number,
    btn: HTMLButtonElement
  ): void {
    const q = phase.questions[this.rw3GrammarIndex];
    const feedback = this.root.querySelector("#grammar-feedback");
    if (!q) return;

    this.root.querySelectorAll("#grammar-choices .quiz-choice").forEach((b) => {
      (b as HTMLButtonElement).disabled = true;
    });

    if (choiceIndex === q.answer) {
      btn.classList.add("correct");
      this.rw3GrammarCorrect.add(this.rw3GrammarIndex);
      audio.play("win");
      if (feedback) feedback.textContent = q.explanation ?? "正确！你已经把句型放进语境。";
      setTimeout(() => {
        if (this.rw3GrammarIndex < phase.questions.length - 1) {
          this.rw3GrammarIndex += 1;
        }
        this.renderScene();
      }, 700);
    } else {
      btn.classList.add("wrong");
      audio.play("click");
      if (feedback) feedback.textContent = `再试一次。正确选项：${q.options[q.answer]}。${q.explanation ?? ""}`;
      setTimeout(() => this.renderScene(), 1100);
    }
  }

  private renderRw3QuizPhase(
    screen: Element,
    phase: Extract<Rw3Phase, { kind: "reading_quiz" | "listening" }>,
    phaseNo: number,
    totalPhases: number
  ): void {
    const questions = phase.questions;
    const q = questions[this.rw3QuizIndex];
    const quizDone = this.rw3QuizCorrect.size >= questions.length;

    screen.innerHTML = `
      <div class="card scene-header">
        <span class="progress-pill">读写3 单元 · ${phaseNo}/${totalPhases} · ${phase.label}</span>
        ${this.rw3StepperHtml()}
        <div class="title" style="font-size:1.1rem">${phase.title}</div>
        <p class="learn-steps">${phase.kind === "listening" ? "先听英语合成语音，再独立作答；可重播，原文默认收起供核对。" : "阅读理解选择题"}</p>
        ${phase.kind === "listening" ? `
          <div class="rw3-listening-card">
            <div class="rw3-listening-controls">
              <button class="btn btn-primary" id="btn-rw3-listen-play" type="button">▶ 播放听力</button>
              <button class="btn btn-ghost" id="btn-rw3-listen-stop" type="button" disabled>■ 停止</button>
              <label class="rw3-listening-rate" for="rw3-listen-rate">语速
                <select id="rw3-listen-rate">
                  <option value="0.8">慢速 · 0.8×</option>
                  <option value="0.95" selected>标准 · 0.95×</option>
                  <option value="1.1">稍快 · 1.1×</option>
                </select>
              </label>
            </div>
            <p class="rw3-listening-status" id="rw3-listen-status" role="status" aria-live="polite">设备英文合成语音 · 建议先听两遍，再回答问题。</p>
            <details class="rw3-listening-transcript">
              <summary>查看听力原文与重点词（辅助核对）</summary>
              <div class="card listen-script" id="listen-body"></div>
            </details>
          </div>
        ` : ""}
        <div class="discover-label">题目 <strong>${this.rw3QuizCorrect.size}/${questions.length}</strong></div>
      </div>
      <div class="card quiz-card" id="quiz-card"></div>
      <div class="scene-actions">
        <button class="btn btn-ghost" id="btn-back-map" type="button">返回地图</button>
        <button class="btn btn-primary" id="btn-rw3-next" type="button" ${quizDone ? "" : "disabled"}>下一阶段</button>
      </div>
    `;

    if (phase.kind === "listening") {
      const listenBody = screen.querySelector("#listen-body")!;
      for (const seg of phase.segments) {
        if (seg.type === "text") listenBody.append(seg.content);
        else {
          const btn = el("button", "ctx-word discovered");
          btn.type = "button";
          btn.textContent = seg.content;
          btn.disabled = true;
          listenBody.appendChild(btn);
        }
      }

      const playButton = screen.querySelector<HTMLButtonElement>("#btn-rw3-listen-play")!;
      const stopButton = screen.querySelector<HTMLButtonElement>("#btn-rw3-listen-stop")!;
      const rateSelect = screen.querySelector<HTMLSelectElement>("#rw3-listen-rate")!;
      const status = screen.querySelector<HTMLElement>("#rw3-listen-status")!;
      if (!("speechSynthesis" in window)) {
        playButton.disabled = true;
        stopButton.disabled = true;
        status.textContent = "本设备不支持英文语音合成；可展开听力原文，使用字幕阅读模式。";
      } else {
        playButton.addEventListener("click", () => {
          this.stopRw3Listening();
          const utterance = new SpeechSynthesisUtterance(phase.script);
          const generation = this.rw3SpeechGeneration;
          utterance.lang = "en-US";
          utterance.rate = Number(rateSelect.value);
          const voices = window.speechSynthesis.getVoices();
          const englishVoice = voices.find((voice) => /^en-us\b/i.test(voice.lang)) ??
            voices.find((voice) => /^en\b/i.test(voice.lang));
          if (englishVoice) utterance.voice = englishVoice;
          utterance.onstart = () => {
            if (generation !== this.rw3SpeechGeneration) return;
            playButton.textContent = "↻ 重新播放";
            stopButton.disabled = false;
            status.textContent = "正在播放 · 可完整听完或停止后重新播放。";
          };
          utterance.onend = () => {
            if (generation !== this.rw3SpeechGeneration) return;
            this.activeRw3Utterance = null;
            stopButton.disabled = true;
            status.textContent = "播放结束 · 可重播；需要辅助时再展开原文。";
          };
          utterance.onerror = () => {
            if (generation !== this.rw3SpeechGeneration) return;
            this.activeRw3Utterance = null;
            stopButton.disabled = true;
            status.textContent = "语音播放失败 · 请展开原文，使用字幕阅读模式。";
          };
          this.activeRw3Utterance = utterance;
          window.speechSynthesis.speak(utterance);
        });
        stopButton.addEventListener("click", () => {
          this.stopRw3Listening();
          playButton.textContent = "↻ 重新播放";
          stopButton.disabled = true;
          status.textContent = "已停止 · 可重播，或展开原文辅助核对。";
        });
      }
    }

    if (q) {
      const card = screen.querySelector("#quiz-card")!;
      card.innerHTML = `
        <p class="quiz-q">${q.question}</p>
        <div class="quiz-choices" id="quiz-choices"></div>
        <p class="quiz-feedback" id="quiz-feedback"></p>
      `;
      const choices = card.querySelector("#quiz-choices")!;
      for (let i = 0; i < q.options.length; i++) {
        const btn = el("button", "quiz-choice");
        btn.type = "button";
        btn.textContent = q.options[i];
        btn.addEventListener("click", () => this.onRw3QuizAnswer(phase, i, btn));
        choices.appendChild(btn);
      }
    }

    screen.querySelector("#btn-back-map")?.addEventListener("click", () => this.returnToMapFromScene());
    screen.querySelector("#btn-rw3-next")?.addEventListener("click", () => {
      if (!quizDone) return;
      this.advanceRw3Phase();
    });
  }

  private onRw3QuizAnswer(
    phase: Extract<Rw3Phase, { kind: "reading_quiz" | "listening" }>,
    choiceIndex: number,
    btn: HTMLButtonElement
  ): void {
    if (phase.kind === "listening") this.stopRw3Listening();
    const q = phase.questions[this.rw3QuizIndex];
    const feedback = this.root.querySelector("#quiz-feedback");
    if (!q) return;

    this.root.querySelectorAll(".quiz-choice").forEach((b) => {
      (b as HTMLButtonElement).disabled = true;
    });

    if (choiceIndex === q.answer) {
      btn.classList.add("correct");
      this.rw3QuizCorrect.add(this.rw3QuizIndex);
      audio.play("win");
      if (feedback) feedback.textContent = q.explanation ?? "正确！";
      setTimeout(() => {
        if (this.rw3QuizIndex < phase.questions.length - 1) {
          this.rw3QuizIndex += 1;
          this.renderScene();
        } else {
          this.renderScene();
        }
      }, 700);
    } else {
      btn.classList.add("wrong");
      audio.play("click");
      const correct = q.options[q.answer];
      if (feedback) feedback.textContent = `再想想。参考答案：${correct}。${q.explanation ?? ""}`;
      setTimeout(() => this.renderScene(), 1100);
    }
  }

  private renderRw3ClozePhase(
    screen: Element,
    phase: Extract<Rw3Phase, { kind: "cloze" }>,
    phaseNo: number,
    totalPhases: number
  ): void {
    const item = phase.items[this.rw3ClozeIndex];
    const total = phase.items.length;
    const done = this.rw3ClozeDone.size;
    const allDone = done >= total;
    const batchTotal = Math.ceil(total / CLOZE_BATCH);
    const batchNow = Math.floor(this.rw3ClozeIndex / CLOZE_BATCH) + 1;

    screen.innerHTML = `
      <div class="card scene-header">
        <span class="progress-pill">读写3 单元 · ${phaseNo}/${totalPhases} · ${phase.label}</span>
        ${this.rw3StepperHtml()}
        <div class="title" style="font-size:1.1rem">语境填空 · 提取练习</div>
        <div class="discover-bar"><div class="discover-fill" style="width:${(done / total) * 100}%"></div></div>
        <div class="discover-label">填空 <strong>${done}/${total}</strong> · 第 <strong>${batchNow}/${batchTotal}</strong> 组</div>
      </div>
      <div class="card cloze-card" id="cloze-card"></div>
      <div class="scene-actions">
        <button class="btn btn-ghost" id="btn-back-map" type="button">返回地图</button>
        <button class="btn btn-primary" id="btn-rw3-next" type="button" ${allDone ? "" : "disabled"}>下一阶段</button>
      </div>
    `;

    if (item) {
      const card = screen.querySelector("#cloze-card")!;
      card.innerHTML = `
        <p class="cloze-word-hint">${item.word}</p>
        <p class="cloze-sentence en-clue">${item.sentence}</p>
        <div class="cloze-choices" id="cloze-choices"></div>
        <p class="cloze-feedback" id="cloze-feedback"></p>
      `;
      const choices = card.querySelector("#cloze-choices")!;
      for (const choice of item.choices) {
        const btn = el("button", "cloze-choice");
        btn.type = "button";
        btn.textContent = choice;
        btn.addEventListener("click", () => this.onRw3ClozeAnswer(item, choice, btn));
        choices.appendChild(btn);
      }
    }

    screen.querySelector("#btn-back-map")?.addEventListener("click", () => this.returnToMapFromScene());
    screen.querySelector("#btn-rw3-next")?.addEventListener("click", () => {
      if (!allDone) return;
      this.advanceRw3Phase();
    });
  }

  private onRw3ClozeAnswer(item: ClozeItem, choice: string, btn: HTMLButtonElement): void {
    const feedback = this.root.querySelector("#cloze-feedback");
    const correct = normalizeClozeAnswer(choice) === normalizeClozeAnswer(item.answer);
    this.root.querySelectorAll(".cloze-choice").forEach((b) => {
      (b as HTMLButtonElement).disabled = true;
    });
    if (correct) {
      btn.classList.add("correct");
      this.rw3ClozeDone.add(item.wordId);
      audio.play("win");
      if (feedback) feedback.textContent = "正确！";
      setTimeout(() => {
        const cp = this.scene?.rw3Phases?.[this.rw3PhaseIndex];
        if (cp?.kind === "cloze" && this.rw3ClozeIndex < cp.items.length - 1) {
          this.rw3ClozeIndex += 1;
        }
        this.renderScene();
      }, 650);
    } else {
      btn.classList.add("wrong");
      audio.play("click");
      if (!this.clozeWrongGraded.has(item.wordId)) {
        this.state.gradeWord(item.wordId, 2);
        this.clozeWrongGraded.add(item.wordId);
      }
      if (feedback) feedback.textContent = `正确释义：${item.answer}`;
      setTimeout(() => this.renderScene(), 1100);
    }
  }

  private renderRw3TranslationPhase(
    screen: Element,
    phase: Extract<Rw3Phase, { kind: "translation" }>,
    phaseNo: number,
    totalPhases: number
  ): void {
    const total = phase.sentences.length;
    const idx = Math.min(this.rw3TranslationIndex, total - 1);
    const sentence = phase.sentences[idx];
    const allDone = this.rw3TranslationDone;

    screen.innerHTML = `
      <div class="card scene-header">
        <span class="progress-pill">读写3 单元 · ${phaseNo}/${totalPhases} · ${phase.label}</span>
        ${this.rw3StepperHtml()}
        <div class="title" style="font-size:1.1rem">英汉互译练习</div>
        <p class="learn-steps">先独立翻译，提交后再看关键词与参考译文；关键词只提示覆盖，不代替语义或语法评分 · 共 ${total} 句</p>
        <div class="discover-bar"><div class="discover-fill" style="width:${(idx / total) * 100}%"></div></div>
        <div class="discover-label">第 <strong>${idx + 1}/${total}</strong> 句${allDone ? " · 全部完成 ✓" : ""}</div>
      </div>
      <div class="card translation-card">
        <div class="trans-sentence-no">第 ${idx + 1} 句</div>
        <p class="translation-zh">${sentence?.zh ?? ""}</p>
        <div class="trans-keywords hidden" id="translation-keywords">
          ${(sentence?.keywords ?? []).map((kw) => `<span class="trans-kw-chip">${kw}</span>`).join("")}
        </div>
        <textarea class="translation-input" id="translation-input" rows="3" placeholder="在此输入英文译文…"></textarea>
        <p class="translation-ref hidden" id="translation-ref">
          <span class="trans-ref-label">参考译文</span>
          ${sentence?.enReference ?? ""}
        </p>
        <p class="translation-feedback" id="translation-feedback"></p>
        <button class="btn btn-primary" id="btn-check-translation" type="button">核对关键词与参考译文</button>
        <div class="translation-review hidden" id="translation-review">
          <p class="translation-review-note">请对照参考译文，回到上方输入框修订后再自检；系统只统计关键词，不会自动判定译文正确。</p>
          <label><input type="checkbox" class="translation-review-check"> 我完整表达了原句意思，没有漏掉关键关系。</label>
          <label><input type="checkbox" class="translation-review-check"> 我检查了语序、时态和主谓一致。</label>
          <label><input type="checkbox" class="translation-review-check"> 我已修正表达，或确认当前译法无需修改。</label>
          <button class="btn btn-primary" id="btn-translation-reviewed" type="button" disabled>完成自检，继续</button>
        </div>
      </div>
      <div class="scene-actions">
        <button class="btn btn-ghost" id="btn-back-map" type="button">返回地图</button>
        <button class="btn btn-primary" id="btn-rw3-next" type="button" ${allDone ? "" : "disabled"}>下一阶段</button>
      </div>
    `;

    screen.querySelector("#btn-check-translation")?.addEventListener("click", () => {
      if (!sentence) return;
      const translationInput = screen.querySelector<HTMLTextAreaElement>("#translation-input");
      const input = translationInput?.value.trim() ?? "";
      if (!input) return;
      const sentenceForCheck = {
        zh: sentence.zh,
        enReference: sentence.enReference,
        keywords: sentence.keywords,
      };
      const feedback = screen.querySelector("#translation-feedback");
      const ref = screen.querySelector("#translation-ref");
      const keywords = screen.querySelector("#translation-keywords");
      const review = screen.querySelector("#translation-review");
      const checkButton = screen.querySelector<HTMLButtonElement>("#btn-check-translation");
      ref?.classList.remove("hidden");
      keywords?.classList.remove("hidden");
      review?.classList.remove("hidden");
      const updateKeywordCoverage = (): void => {
        const result = checkTranslation(translationInput?.value ?? "", sentenceForCheck);
        const coverage = `${result.matched.length}/${sentence.keywords.length}`;
        const missing = result.missing.length ? ` · 可再检查：${result.missing.join("、")}` : "";
        if (feedback) feedback.innerHTML = `<span class="trans-hint">关键词覆盖 ${coverage}${missing}。这不是语义或语法评分。</span>`;
      };
      updateKeywordCoverage();
      translationInput?.addEventListener("input", updateKeywordCoverage);
      if (checkButton) checkButton.disabled = true;

      const checks = Array.from(review?.querySelectorAll<HTMLInputElement>(".translation-review-check") ?? []);
      const continueButton = screen.querySelector<HTMLButtonElement>("#btn-translation-reviewed");
      const updateContinueButton = (): void => {
        if (continueButton) continueButton.disabled = !checks.length || !checks.every((check) => check.checked);
      };
      checks.forEach((check) => check.addEventListener("change", updateContinueButton));
      continueButton?.addEventListener("click", () => {
        if (continueButton.disabled) return;
        audio.play("win");
        if (this.rw3TranslationIndex < total - 1) {
          this.rw3TranslationIndex += 1;
        } else {
          this.rw3TranslationDone = true;
        }
        this.renderScene();
      });
    });

    screen.querySelector("#btn-back-map")?.addEventListener("click", () => this.returnToMapFromScene());
    screen.querySelector("#btn-rw3-next")?.addEventListener("click", () => {
      if (!allDone) return;
      this.advanceRw3Phase();
    });
  }

  /** 记忆远征：把空间锚点、主动回忆与间隔复习变成可勾选的游戏动作 */
  private renderRw3MemoryPhase(
    screen: Element,
    phase: Extract<Rw3Phase, { kind: "memory" }>,
    phaseNo: number,
    totalPhases: number
  ): void {
    const ids = [
      ...phase.memoryRoute.map((_, index) => `route-${index}`),
      ...phase.methods.map((method) => `method-${method.id}`),
    ];
    const done = ids.every((id) => this.rw3MemoryDone.has(id));

    screen.innerHTML = `
      <div class="card scene-header memory-header">
        <span class="progress-pill">读写3 单元 · ${phaseNo}/${totalPhases} · ${phase.label}</span>
        ${this.rw3StepperHtml()}
        <div class="title" style="font-size:1.1rem">🧠 ${phase.title}</div>
        <p class="learn-steps">导师 ${phase.mentor} · 不靠重复浏览，靠线索把知识从记忆里重新取出来。</p>
        <div class="memory-anchor"><span class="memory-anchor-label">本单元总锚点</span><strong>${phase.memoryAnchor}</strong></div>
        <p class="memory-prompt">${phase.recallPrompt}</p>
        <div class="discover-bar"><div class="discover-fill" id="memory-progress-fill" style="width:${ids.length ? (this.rw3MemoryDone.size / ids.length) * 100 : 100}%"></div></div>
        <div class="discover-label">记忆动作 <strong id="memory-progress-label">${this.rw3MemoryDone.size}/${ids.length}</strong></div>
      </div>
      <div class="card memory-route-card">
        <div class="memory-section-label">记忆宫殿路线 · 从空间找回词义</div>
        <div class="memory-route-list">
          ${phase.memoryRoute.map((stop, index) => `<label class="memory-check"><input type="checkbox" data-memory-id="route-${index}" ${this.rw3MemoryDone.has(`route-${index}`) ? "checked" : ""}/><span class="memory-stop-no">${index + 1}</span><span><strong>${stop.place}</strong><em>${stop.image}</em><small>回忆线索：${stop.recall}</small></span></label>`).join("")}
        </div>
      </div>
      <div class="card method-card">
        <div class="memory-section-label">学习方法 → 游戏动作</div>
        <div class="method-list">
          ${phase.methods.map((method) => `<label class="method-check"><input type="checkbox" data-memory-id="method-${method.id}" ${this.rw3MemoryDone.has(`method-${method.id}`) ? "checked" : ""}/><span><strong>${method.title}</strong><em>${method.principle}</em><small>现在执行：${method.action}</small><b>方法收益：${method.reward}</b></span></label>`).join("")}
        </div>
      </div>
      <div class="scene-actions">
        <button class="btn btn-ghost" id="btn-back-map" type="button">返回地图</button>
        <button class="btn btn-primary" id="btn-rw3-next" type="button" ${done ? "" : "disabled"}>🎉 完成本单元</button>
      </div>
    `;

    const refresh = () => {
      const count = this.rw3MemoryDone.size;
      const fill = screen.querySelector("#memory-progress-fill") as HTMLElement | null;
      const label = screen.querySelector("#memory-progress-label");
      if (fill) fill.style.width = `${ids.length ? (count / ids.length) * 100 : 100}%`;
      if (label) label.textContent = `${count}/${ids.length}`;
      const finish = screen.querySelector("#btn-rw3-next") as HTMLButtonElement | null;
      if (finish) finish.disabled = !ids.every((id) => this.rw3MemoryDone.has(id));
    };

    screen.querySelectorAll<HTMLInputElement>("[data-memory-id]").forEach((input) => {
      input.addEventListener("change", () => {
        const id = input.dataset.memoryId;
        if (!id) return;
        if (input.checked) this.rw3MemoryDone.add(id);
        else this.rw3MemoryDone.delete(id);
        refresh();
      });
    });
    screen.querySelector("#btn-back-map")?.addEventListener("click", () => this.returnToMapFromScene());
    screen.querySelector("#btn-rw3-next")?.addEventListener("click", () => {
      if (ids.every((id) => this.rw3MemoryDone.has(id))) this.finishScene();
    });
  }

  private renderRw3WritingPhase(
    screen: Element,
    phase: Extract<Rw3Phase, { kind: "writing" }>,
    phaseNo: number,
    totalPhases: number
  ): void {
    const grammarPhase = (this.scene?.rw3Phases ?? []).find((candidate) => candidate.kind === "grammar");
    const grammarTargets = grammarPhase?.kind === "grammar"
      ? grammarPhase.points.map((point) => point.title).join("、")
      : "本单元语法结构";
    const writingCriteria = [
      ["position", "立场", "开头直接回应题目，全文围绕一个清晰观点。"],
      ["evidence", "证据", "给出一个具体例子，并解释它如何支持观点。"],
      ["grammar", "语法迁移", `准确运用至少一个本单元结构：${grammarTargets}。`],
      ["cohesion", "连贯与结尾", "用逻辑连接词组织段落，结尾回扣中心观点。"],
    ] as const;
    screen.innerHTML = `
      <div class="card scene-header">
        <span class="progress-pill">读写3 单元 · ${phaseNo}/${totalPhases} · ${phase.label}</span>
        ${this.rw3StepperHtml()}
        <div class="title" style="font-size:1.1rem">写作练习</div>
        <p class="learn-steps">按提纲完成英文短文 · 目标 120–150 词</p>
      </div>
      <div class="card writing-card">
        <div class="writing-prompt-block">
          <div class="writing-prompt-label">写作题目</div>
          <p class="writing-prompt">${phase.prompt}</p>
        </div>
        <details class="writing-outline-details" open>
          <summary class="writing-outline-summary">📋 写作提纲</summary>
          <ol class="writing-outline">${phase.outline.map((o) => `<li>${o}</li>`).join("")}</ol>
        </details>
        <div class="writing-area-wrap">
          <textarea class="writing-input" id="writing-input" rows="9" placeholder="Write your essay here…">${""}</textarea>
          <div class="writing-wordcount" id="writing-wordcount" aria-live="polite">0 / 120–150 词</div>
        </div>
        <div class="writing-progress-bar"><div class="writing-progress-fill" id="writing-progress-fill" style="width:0%"></div></div>
        <section class="writing-self-review" aria-labelledby="writing-self-review-title">
          <div class="writing-self-review-head"><strong id="writing-self-review-title">导师自检</strong><span>自评提示，不是自动评分</span></div>
          ${writingCriteria.map(([id, title, description]) => `<label class="writing-criterion"><input type="checkbox" data-writing-criterion="${id}"/><span><strong>${title}</strong><small>${description}</small></span></label>`).join("")}
          <div class="writing-criteria-progress" id="writing-criteria-progress" aria-live="polite">自检 0/${writingCriteria.length}</div>
        </section>
        <label class="writing-check"><input type="checkbox" id="writing-ack" ${this.rw3WritingAck ? "checked" : ""}/> 我已完成初稿、字数达标并完成四项自检</label>
      </div>
      <div class="scene-actions">
        <button class="btn btn-ghost" id="btn-back-map" type="button">返回地图</button>
        <button class="btn btn-primary" id="btn-rw3-next" type="button" ${this.rw3WritingAck ? "" : "disabled"}>${phaseNo >= totalPhases ? "🎉 完成本单元" : "下一阶段 →"}</button>
      </div>
    `;

    const ack = screen.querySelector("#writing-ack") as HTMLInputElement;
    const textarea = screen.querySelector("#writing-input") as HTMLTextAreaElement;
    const counter = screen.querySelector("#writing-wordcount") as HTMLElement;
    const bar = screen.querySelector("#writing-progress-fill") as HTMLElement;
    const writingDraftKey = `word-quest:rw3-writing-draft:${this.scene?.unitId ?? phaseNo}`;
    try {
      textarea.value = sessionStorage.getItem(writingDraftKey) ?? "";
    } catch {
      // If storage is unavailable, the writing exercise remains usable in memory.
    }
    const TARGET = 120;
    const MAX_WORDS = 150;
    const criteria = Array.from(screen.querySelectorAll<HTMLInputElement>("[data-writing-criterion]"));
    const criteriaProgress = screen.querySelector("#writing-criteria-progress");

    const update = () => {
      const words = textarea.value.trim().split(/\s+/).filter(Boolean).length;
      const pct = Math.min((words / TARGET) * 100, 100);
      const criteriaDone = criteria.filter((input) => input.checked).length;
      const inRange = words >= TARGET && words <= MAX_WORDS;
      counter.textContent = words > MAX_WORDS
        ? `${words} / ${MAX_WORDS} 词 · 请精简`
        : `${words} / ${TARGET}–${MAX_WORDS} 词`;
      counter.className = `writing-wordcount ${words > MAX_WORDS ? "wc-over" : inRange ? "wc-good" : words >= 80 ? "wc-mid" : ""}`;
      bar.style.width = `${pct}%`;
      bar.className = `writing-progress-fill ${words > MAX_WORDS ? "wfill-over" : inRange ? "wfill-good" : words >= 80 ? "wfill-mid" : ""}`;
      if (criteriaProgress) criteriaProgress.textContent = `自检 ${criteriaDone}/${criteria.length}`;
      this.rw3WritingAck = ack.checked && inRange && criteriaDone === criteria.length;
      const finish = screen.querySelector("#btn-rw3-next") as HTMLButtonElement;
      if (finish) finish.disabled = !this.rw3WritingAck;
    };

    ack?.addEventListener("change", update);
    textarea?.addEventListener("input", () => {
      try {
        sessionStorage.setItem(writingDraftKey, textarea.value);
      } catch {
        // Storage quota or browser restrictions must not block writing.
      }
      update();
    });
    criteria.forEach((input) => input.addEventListener("change", update));
    update();

    screen.querySelector("#btn-back-map")?.addEventListener("click", () => this.returnToMapFromScene());
    screen.querySelector("#btn-rw3-next")?.addEventListener("click", () => {
      if (!this.rw3WritingAck) return;
      this.advanceRw3Phase();
    });
  }

  private advanceRw3Phase(): void {
    this.stopRw3Listening();
    const phases = this.scene?.rw3Phases;
    if (!phases) return;
    if (this.rw3PhaseIndex < phases.length - 1) {
      this.rw3PhaseIndex += 1;
      if (this.scene) this.state.setRw3PhaseIndex(this.scene.levelId, this.rw3PhaseIndex);
      this.rw3QuizIndex = 0;
      this.rw3QuizCorrect = new Set();
      this.rw3WorldRecallDone = new Set();
      this.rw3WorldCheckCorrect = new Set();
      this.rw3TranslationIndex = 0;
      this.rw3TranslationDone = false;
      this.rw3GrammarIndex = 0;
      this.rw3GrammarCorrect = new Set();
      this.rw3MemoryDone = new Set();
      this.selectedWordId = null;
      this.answerRevealed = false;
      audio.play("start");
      this.renderScene();
      const sceneScreen = this.root.querySelector<HTMLElement>("#screen-scene");
      if (sceneScreen) sceneScreen.scrollTop = 0;
    } else {
      this.finishScene();
    }
  }

  private stopRw3Listening(): void {
    this.rw3SpeechGeneration += 1;
    const hadActiveSpeech = Boolean(this.activeRw3Utterance);
    this.activeRw3Utterance = null;
    if (
      "speechSynthesis" in window &&
      (hadActiveSpeech || window.speechSynthesis.speaking || window.speechSynthesis.pending)
    ) {
      window.speechSynthesis.cancel();
    }
  }

  /** 阶段一：语境输入 + 主动回忆 */
  private renderInputPhase(): void {
    const screen = this.root.querySelector("#screen-scene");
    if (!screen || !this.scene) return;

    const s = this.scene;
    const graded = this.sessionGraded.size;
    const total = s.words.length;
    const inputDone = graded >= total;

    screen.innerHTML = `
      <div class="card scene-header">
        <span class="progress-pill">${modeLabel(this.sceneMode)} · 阶段 1/2 · 语境输入</span>
        <div class="title" style="font-size:1.1rem">${s.title}</div>
        <p class="learn-steps">① 阅读故事 ② 点击高亮词 ③ 先回忆再揭示 ④ 自评记忆强度</p>
        <p class="plot-zh">${s.plotZh}</p>
        <blockquote class="philosophy-quote">
          <span class="philosophy-label">哲思</span>
          <p class="philosophy-zh">${s.philosophyZh}</p>
        </blockquote>
        <div class="discover-bar"><div class="discover-fill" style="width:${(graded / total) * 100}%"></div></div>
        <div class="discover-label">主动回忆 <strong>${graded}/${total}</strong>${total > 10 ? ` · 建议分批完成，可随时点下方词卡跳转` : ""}</div>
        <div class="word-chips" id="word-chips">
          ${s.words
            .map((w) => {
              const done = this.sessionGraded.has(w.id);
              const active = this.selectedWordId === w.id;
              return `<button type="button" class="word-chip${done ? " done" : ""}${active ? " active" : ""}" data-wid="${w.id}">${w.word}</button>`;
            })
            .join("")}
        </div>
      </div>
      <div class="card scene-body" id="scene-body"></div>
      <div class="card word-panel" id="word-panel"><p class="subtitle">点击高亮词，先在心里回忆释义</p></div>
      <div class="scene-actions">
        <button class="btn btn-ghost" id="btn-back-map" type="button">返回地图</button>
        <button class="btn btn-primary" id="btn-to-cloze" type="button" ${inputDone ? "" : "disabled"}>进入语境填空</button>
      </div>
    `;

    const body = screen.querySelector("#scene-body")!;
    for (const seg of s.segments) {
      if (seg.type === "text") {
        body.append(seg.content);
        continue;
      }
      const gradedWord = this.sessionGraded.has(seg.wordId!);
      const btn = el(
        "button",
        `ctx-word${gradedWord ? " discovered" : ""}${this.selectedWordId === seg.wordId ? " active" : ""}`
      );
      btn.type = "button";
      btn.textContent = seg.content;
      btn.addEventListener("click", () => this.onWordSelect(seg.wordId!));
      body.appendChild(btn);
    }

    if (this.selectedWordId) this.renderRecallPanel(this.selectedWordId);

    screen.querySelectorAll("#word-chips .word-chip").forEach((chip) => {
      chip.addEventListener("click", () => {
        const wid = (chip as HTMLElement).dataset.wid;
        if (wid) this.onWordSelect(wid);
      });
    });

    screen.querySelector("#btn-back-map")?.addEventListener("click", () => this.returnToMapFromScene());
    screen.querySelector("#btn-to-cloze")?.addEventListener("click", () => {
      if (!inputDone) return;
      this.phase = "cloze";
      this.clozeIndex = 0;
      audio.play("start");
      this.renderScene();
    });
  }

  /** 阶段二：语境填空（提取练习） */
  private renderClozePhase(): void {
    const screen = this.root.querySelector("#screen-scene");
    if (!screen || !this.scene) return;

    const item = this.clozeItems[this.clozeIndex];
    const total = this.clozeItems.length;
    const done = this.clozeDone.size;
    const allDone = done >= total;
    const batchTotal = Math.ceil(total / CLOZE_BATCH);
    const batchNow = Math.floor(this.clozeIndex / CLOZE_BATCH) + 1;

    screen.innerHTML = `
      <div class="card scene-header">
        <span class="progress-pill">${modeLabel(this.sceneMode)} · 阶段 2/2 · 语境填空</span>
        <div class="title" style="font-size:1.1rem">提取练习 · 检测语境理解</div>
        <p class="learn-steps">根据句子语境选择正确释义（科学研究：提取练习优于重复阅读）</p>
        <div class="discover-bar"><div class="discover-fill" style="width:${(done / total) * 100}%"></div></div>
        <div class="discover-label">填空进度 <strong>${done}/${total}</strong>${total > CLOZE_BATCH ? ` · 第 <strong>${batchNow}/${batchTotal}</strong> 组（每组 ${CLOZE_BATCH} 题）` : ""}</div>
      </div>
      <div class="card cloze-card" id="cloze-card"></div>
      <div class="scene-actions">
        <button class="btn btn-ghost" id="btn-back-input" type="button">返回阅读</button>
        <button class="btn btn-primary" id="btn-finish-scene" type="button" ${allDone ? "" : "disabled"}>${this.sceneMode === "level" ? "完成本幕" : "完成本轮"}</button>
      </div>
    `;

    if (item) this.renderClozeItem(item);

    screen.querySelector("#btn-back-input")?.addEventListener("click", () => {
      this.phase = "input";
      this.renderScene();
    });
    screen.querySelector("#btn-finish-scene")?.addEventListener("click", () => {
      if (allDone) this.finishScene();
    });
  }

  private renderClozeItem(item: ClozeItem): void {
    const card = this.root.querySelector("#cloze-card");
    if (!card) return;

    card.innerHTML = `
      <p class="cloze-word-hint">${item.word}</p>
      <p class="cloze-sentence en-clue">${item.sentence}</p>
      <div class="cloze-choices" id="cloze-choices"></div>
      <p class="cloze-feedback" id="cloze-feedback"></p>
    `;

    const choices = card.querySelector("#cloze-choices")!;
    for (const choice of item.choices) {
      const btn = el("button", "cloze-choice");
      btn.type = "button";
      btn.textContent = choice;
      btn.addEventListener("click", () => this.onClozeAnswer(item, choice, btn));
      choices.appendChild(btn);
    }
  }

  private onClozeAnswer(item: ClozeItem, choice: string, btn: HTMLButtonElement): void {
    const feedback = this.root.querySelector("#cloze-feedback");
    const correct = choice === item.answer;

    this.root.querySelectorAll(".cloze-choice").forEach((b) => {
      (b as HTMLButtonElement).disabled = true;
    });

    if (correct) {
      btn.classList.add("correct");
      this.clozeDone.add(item.wordId);
      audio.play("win");
      if (feedback) feedback.textContent = "正确！语境理解到位。";
      setTimeout(() => {
        if (this.clozeIndex < this.clozeItems.length - 1) {
          this.clozeIndex += 1;
          this.renderScene();
        } else {
          this.renderScene();
        }
      }, 650);
    } else {
      btn.classList.add("wrong");
      audio.play("click");
      if (!this.clozeWrongGraded.has(item.wordId)) {
        this.state.gradeWord(item.wordId, 2);
        this.clozeWrongGraded.add(item.wordId);
      }
      if (feedback) feedback.textContent = `再想想。正确释义：${item.answer}（已缩短复习间隔）`;
      setTimeout(() => this.renderScene(), 1200);
    }
  }

  private onWordSelect(wordId: string): void {
    if (!this.scene) return;
    audio.play("click");
    this.selectedWordId = wordId;
    this.answerRevealed = false;
    this.renderScene();
  }

  /** 主动回忆面板：先回忆 → 揭示 → 自评 */
  private renderRecallPanel(wordId: string): void {
    const panel = this.root.querySelector("#word-panel");
    const phase = this.scene?.rw3Phases?.[this.rw3PhaseIndex];
    const phaseWord = phase && "words" in phase
      ? phase.words.find((w) => w.id === wordId)
      : undefined;
    const word = phaseWord ?? this.scene?.words.find((w) => w.id === wordId);
    if (!panel || !word) return;

    // 从词库查完整条目（含音标、例句译文、搭配）
    const entry = this.wordMap.get(wordId);
    const phonetic = entry?.phonetic ? `<span class="word-phonetic">${entry.phonetic}</span>` : "";
    const mem = this.state.getMemory(wordId);
    const example = entry?.example?.trim();
    const exampleZh = entry?.example_zh
      ? `<p class="word-example-zh">${entry.example_zh}</p>`
      : "";
    const contextLine = word.contextLine.trim();
    const contextIsDictionaryExample = Boolean(example && contextLine === example);
    const contextLabel = contextIsDictionaryExample
      ? "例句"
      : this.scene?.rw3Phases
        ? "课文语境"
        : "当前语境";
    const contextBlock = `
      <div class="word-context-block">
        <span class="word-context-label">${contextLabel}</span>
        <p class="en-clue recall-ctx">${contextLine}</p>
      </div>
    `;
    const dictionaryExampleBlock = contextIsDictionaryExample
      ? exampleZh
        ? `<div class="word-example-block"><span class="word-context-label">例句译文</span>${exampleZh}</div>`
        : ""
      : entry?.example || entry?.example_zh
        ? `
          <div class="word-example-block">
            <span class="word-context-label">词汇例句与译文</span>
            ${example ? `<p class="word-example-en">${example}</p>` : ""}
            ${exampleZh}
          </div>
        `
        : "";

    const ttsBtn = `<button class="btn-tts" id="btn-tts" type="button" title="朗读单词">🔊</button>`;

    if (!this.answerRevealed) {
      panel.innerHTML = `
        <div class="recall-card">
          <div class="word-detail-head">
            <span class="word-detail-en">${word.word}</span>
            ${phonetic}
            <span class="word-detail-pos">${word.pos}</span>
            ${ttsBtn}
          </div>
          <p class="recall-prompt">先回忆释义，再点开答案（生成效应 + 提取练习）</p>
          ${contextBlock}
          <div class="recall-hidden">释义已隐藏</div>
          <button class="btn btn-primary" id="btn-reveal" type="button">我想好了，显示答案</button>
        </div>
      `;
      panel.querySelector("#btn-reveal")?.addEventListener("click", () => {
        this.answerRevealed = true;
        this.renderRecallPanel(wordId);
      });
      panel.querySelector("#btn-tts")?.addEventListener("click", () => speakWord(word.word));
      return;
    }

    const collocation = entry?.collocation
      ? `<p class="word-collocation"><span class="colloc-label">常用搭配：</span>${entry.collocation}</p>`
      : "";

    panel.innerHTML = `
      <div class="recall-card">
        <div class="word-detail-head">
          <span class="word-detail-en">${word.word}</span>
          ${phonetic}
          <span class="word-detail-pos">${word.pos}</span>
          ${ttsBtn}
        </div>
        <div class="word-detail-meaning">${word.meaning}</div>
        ${contextBlock}
        ${dictionaryExampleBlock}
        ${collocation}
        <p class="recall-grade-label">诚实自评（用于间隔重复调度）：</p>
        <div class="grade-grid">
          <button class="grade-btn grade-1" data-q="1" type="button">忘记</button>
          <button class="grade-btn grade-3" data-q="3" type="button">模糊</button>
          <button class="grade-btn grade-4" data-q="4" type="button">记住</button>
          <button class="grade-btn grade-5" data-q="5" type="button">秒懂</button>
        </div>
        ${mem.reps > 0 ? `<p class="srs-hint">已复习 ${mem.reps} 次 · 下次 ${mem.interval} 天后</p>` : ""}
      </div>
    `;
    panel.querySelector("#btn-tts")?.addEventListener("click", () => speakWord(word.word));

    panel.querySelectorAll(".grade-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const q = Number((btn as HTMLElement).dataset.q);
        this.state.gradeWord(wordId, q);
        this.sessionGraded.add(wordId);
        this.selectedWordId = null;
        this.answerRevealed = false;
        showToast(q >= 4 ? "已纳入间隔复习" : "会更快再次出现");
        this.renderScene();
      });
    });
  }

  private finishScene(): void {
    if (!this.scene) return;

    if (this.sceneMode === "review") {
      showToast("本轮复习完成！到期词已重新排期");
    } else if (this.sceneMode === "weak") {
      showToast("薄弱词巩固完成！继续探索新关卡吧");
    } else {
      const completionId = this.scene.levelId;
      if (this.scene.rw3Phases?.length) this.state.clearRw3PhaseIndex(completionId);
      const isRw3SubWorld = this.state.save.courseId === "college_english_rw3" && Boolean(this.scene.worldId && this.scene.worldId !== "hub");
      const unitId = this.scene.unitId;
      const completesRw3Unit = isRw3SubWorld && this.scene.worldId === "unit-project" && Boolean(unitId);
      const wasNew = !this.state.save.levelProgress[completionId]?.cleared;
      if (wasNew) {
        this.state.completeLevel(completionId);
        const rewardId = isRw3SubWorld ? `world-complete:${completionId}` : `unit-complete:${completionId}`;
        const rewardGranted = this.state.grantReward(rewardId, isRw3SubWorld ? 20 : 100);
        let unitRewardGranted = false;
        if (completesRw3Unit && unitId) {
          this.state.completeLevel(unitId);
          unitRewardGranted = this.state.grantReward(`unit-complete:${unitId}`, 100);
        }
        showToast(
          completesRw3Unit
            ? `单元项目完成 · 本单元已解锁下一单元${unitRewardGranted ? " · 获得单元徽章 +100 XP" : ""}`
            : isRw3SubWorld
            ? `子世界完成 · 记忆结果已进入复习调度${rewardGranted ? " · 获得 +20 XP" : ""}`
            : this.state.save.courseId === "college_english_rw3"
              ? `本单元全部模块完成！20 词已进入间隔复习队列${rewardGranted ? " · 获得徽章 +100 XP" : ""}`
            : "本幕完成！词汇已进入间隔复习队列"
        );
      } else {
        showToast("重温完成");
      }
    }

    audio.play("win");
    // 若处于单元探索模式，完成学习后返回该单元的探索地图
    if (this.unitExplore) {
      const savedExplore = this.unitExplore;
      this.loadCourse(this.state.save.courseId).then(async () => {
        await this.renderMap();
        this.show("map");
        // 重新进入探索模式（保留已收集进度）
        this.enterUnitExplore(savedExplore.unitId, savedExplore.collectedIds);
      });
      return;
    }
    this.loadCourse(this.state.save.courseId).then(async () => {
      await this.renderMap();
      this.show("map");
    });
  }
}
