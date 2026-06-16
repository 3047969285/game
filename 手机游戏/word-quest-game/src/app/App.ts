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
import { GameState } from "../services/gameState";
import { buildExploreMap, resolveCurrentNode } from "../features/explore/map";
import { buildWordPickups, getUnitCenter } from "../features/explore/wordPickupLayout";
import { buildRw3UnitScene } from "../features/explore/rw3Story";
import { buildContextScene } from "../features/explore/story";
import { buildClozeItems } from "../features/learn/cloze";
import { checkTranslation } from "../features/learn/translation";
import { buildReviewScene, buildWeakScene } from "../features/learn/review";
import { Minimap } from "../features/world/Minimap";
import { World3D } from "../features/world";
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
  private rw3ClozeIndex = 0;
  private rw3ClozeDone = new Set<string>();
  private rw3TranslationIndex = 0;
  private rw3TranslationDone = false;
  private rw3WritingAck = false;
  private world: World3D | null = null;
  private minimap: Minimap | null = null;
  private renderedCourse: CourseId | null = null;
  private rw3Units = new Map<string, Rw3UnitContent>();
  private cetContent: CetContentBundle | null = null;
  // CET 非词汇关卡状态
  private cetQuizIndex = 0;
  private cetQuizCorrect = new Set<number>();
  private cetTranslationDone = false;
  // 单元探索模式（原神风格）
  private unitExplore: UnitExploreState | null = null;
  // 快速单词卡弹窗计时器
  private wordCardTimer: ReturnType<typeof setTimeout> | null = null;

  constructor(root: HTMLElement) {
    this.root = root;
  }

  /** 启动应用 */
  async start(): Promise<void> {
    await this.loadCourse(this.state.save.courseId);
    this.mountShell();
    this.renderMap();
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
    this.root.querySelectorAll(".screen").forEach((el) => el.classList.remove("active"));
    const node = this.root.querySelector(`#screen-${screen}`);
    node?.classList.add("active", "screen-enter");
    setTimeout(() => node?.classList.remove("screen-enter"), 450);
    screen === "map" ? this.world?.resume() : this.world?.pause();
  }

  /** 渲染三维地图 */
  private renderMap(): void {
    const screen = this.root.querySelector("#screen-map");
    if (!screen || !this.template) return;

    const current = resolveCurrentNode(this.mapNodes, this.state.save.mapNodeId);
    const done = this.mapNodes.filter((n) => n.cleared).length;
    const dueIds = this.state.getDueWordIds(this.wordMap.keys());
    const due = dueIds.length;
    const weakIds = this.state.getWeakWordIds(this.wordMap.keys(), 8, new Set(dueIds));
    const stats = this.state.getLearningStats(this.wordMap.keys());

    if (this.renderedCourse !== this.state.save.courseId) {
      this.world?.dispose();
      this.world = null;
      screen.innerHTML = "";
      this.renderedCourse = this.state.save.courseId;
    }

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

      const viewport = screen.querySelector("#world-viewport") as HTMLElement;
      const minimapCanvas = viewport.querySelector("#explore-minimap") as HTMLCanvasElement;
      this.minimap = new Minimap(minimapCanvas);
      this.minimap.setNodes(this.mapNodes);

      this.world = new World3D(viewport, {
        onNodeClick: (id) => this.onNodeClick(id),
        onProximity: (node) => this.updateProximityHud(node),
        onExploreUpdate: (state) => {
          this.minimap?.setNodes(state.nodes);
          this.minimap?.draw(state);
        },
        onPickupNear: (pickup) => this.onPickupNear(pickup),
        onPickupCollect: (id) => this.collectPickup(id),
      });
      this.bindExploreControls(viewport);

      screen.querySelectorAll("#course-tabs .tab").forEach((tab) => {
        tab.addEventListener("click", async () => {
          audio.play("click");
          this.state.setCourse((tab as HTMLElement).dataset.course as CourseId);
          await this.loadCourse(this.state.save.courseId);
          this.renderMap();
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
        <div class="subtitle">${isRw3 ? "新视野第四版 · Section A/B/C + 词汇4关 + 阅读/听力 + 填空 + 翻译 + 写作" : "三维探索 · 科学记忆（语境输入 + 主动回忆 + 间隔重复）"}</div>
        <span class="progress-pill">${isRw3 ? "单元" : "关卡"} ${done}/${this.mapNodes.length}</span>
        ${stats.learned > 0 ? `<span class="progress-pill stats-pill">已学 ${stats.learned}</span>` : ""}
        ${stats.mastered > 0 ? `<span class="progress-pill stats-pill mastered-pill">掌握 ${stats.mastered}</span>` : ""}
        ${due > 0 ? `<span class="progress-pill review-pill">待复习 ${due}</span>` : ""}
        ${stats.weak > 0 ? `<span class="progress-pill weak-pill">薄弱 ${stats.weak}</span>` : ""}
      `;
    }

    this.renderPlayGuide();
    this.renderPracticePanel(dueIds, due, weakIds);
    this.renderMapHint(current);
    this.minimap?.setNodes(this.mapNodes);
    this.world?.setNodes(this.mapNodes, current?.id ?? "");
    this.world?.resume();
  }

  private updateProximityHud(node: MapNode | null): void {
    const panel = this.root.querySelector("#proximity-panel");
    const label = this.root.querySelector("#proximity-label");
    if (!panel || !label) return;

    if (!node) {
      panel.classList.add("hidden");
      return;
    }

    panel.classList.remove("hidden");
    const zone = node.zoneName ? `<span class="proximity-zone">${node.zoneName}</span>` : "";
    label.innerHTML = `${zone}<span class="proximity-name">${node.icon} ${node.name}</span>`;
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
        <li><strong>读写3 路线</strong>：6 个单元 = 6 幕场景，每幕学完本单元 20 词</li>
        <li><strong>读原文</strong>：一幕内包含阅读篇 + 听力稿，高亮词来自课文</li>
        <li><strong>主动回忆</strong>：点高亮词 → 先回忆 → 揭示 → 自评</li>
        <li><strong>语境填空</strong>：按课文句子选释义，答错缩短复习间隔</li>
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

    hint.innerHTML = `
      <div class="card explore-hint">
        <div class="explore-header"><span class="explore-loc">📍 ${node.zoneName}</span></div>
        <div class="title" style="font-size:1rem">${node.icon} ${node.name}</div>
        <div class="subtitle">${node.cleared ? "本单元已完成 · 可重温" : node.unlocked ? (this.state.save.courseId === "college_english_rw3" ? "完整单元：Section A/B/C → 词汇4关 → 阅读题 → 听力 → 填空 → 翻译 → 写作" : "进入后：先读故事 → 回忆释义 → 语境填空") : "完成前一单元后解锁"}${node.dueCount ? ` · <span class="due-inline">${node.dueCount} 词待复习</span>` : ""}</div>
        ${node.unlocked ? `<button class="btn btn-primary" id="btn-enter-scene">进入学习场景</button>` : ""}
      </div>
    `;
    hint.querySelector("#btn-enter-scene")?.addEventListener("click", () => this.openScene(node.id));
  }

  private onNodeClick(nodeId: string): void {
    if (this.state.save.courseId === "college_english_rw3") {
      if (this.unitExplore) {
        // 探索模式内：找到学习圣所 → 直接进入读写场景
        audio.play("click");
        this.state.setMapNode(nodeId);
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

    const { zone } = ref;
    const unitId = zone.id.replace("rw3_", "");

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

    this.unitExplore = { unitId, unitLabel: zone.name, pickups, collectedIds };

    // 创建单元圣所节点（学习入口 Portal）— 位于探索区中心
    const center = getUnitCenter(unitId);
    const portalNode: MapNode = {
      id: zone.id,
      zoneName: zone.name,
      name: "📚 学习圣所",
      icon: "📚",
      theme: "library",
      x: center.x,
      y: 0,
      z: center.z - 12,
      unlocked: true,
      cleared: this.state.save.levelProgress[zone.id]?.cleared ?? false,
    };

    this.world?.setBiome(unitId);
    this.world?.setPickups(pickups.filter((p) => !p.collected));
    this.world?.setNodes([portalNode], zone.id);
    // 同步小地图范围以包含所有词汇光球
    this.minimap?.setNodes([portalNode], pickups);

    this.updateExploreProgressHud();
    this.showExploreHud(true);

    const hintBar = this.root.querySelector("#world-hint-bar");
    if (hintBar) {
      hintBar.textContent = "走近发光词球按 E 收集词汇 · 前往中央 📚 学习圣所按 E 进入读写场景";
    }

    // 展示单元入口介绍卡
    this.showUnitEntryCard(zone, words.length, collectedIds.size);
  }

  /** 展示进入单元时的简介卡 */
  private showUnitEntryCard(zone: ZoneDef, totalWords: number, collected: number): void {
    const rw3Unit = this.rw3Units.get(zone.id.replace("rw3_", ""));
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
        <div class="unit-entry-title">${title}</div>
        <div class="unit-entry-theme">${theme}</div>
        <div class="unit-entry-sections">${sections.map((s) => `<div class="unit-sec-item">${s}</div>`).join("")}</div>
        <div class="unit-entry-stats">
          <span>词汇 ${totalWords} 词</span>
          <span>已收集 ${collected}/${totalWords}</span>
          <span>阅读 · 听力 · 翻译 · 写作</span>
        </div>
        <button class="wc-dismiss" id="btn-unit-entry-ok">开始探索 →</button>
      </div>
    `;
    card.classList.remove("hidden");
    card.classList.add("wc-enter");

    card.querySelector("#btn-unit-entry-ok")?.addEventListener("click", () => this.dismissWordCard());
    this.wordCardTimer = setTimeout(() => this.dismissWordCard(), 8000);
  }

  private exitUnitExplore(): void {
    this.unitExplore = null;

    // 恢复默认生物群系和全局节点
    this.world?.setBiome(undefined);
    this.world?.setPickups([]);
    this.world?.setNodes(this.mapNodes, this.state.save.mapNodeId);

    this.showExploreHud(false);
    this.hidePickupPanel();

    const hintBar = this.root.querySelector("#world-hint-bar");
    if (hintBar) {
      hintBar.textContent = "WASD/摇杆走动 · Shift 奔跑 · 走近 Unit 水晶 · E 进入单元地图";
    }
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
    card.classList.remove("hidden");
    card.classList.add("wc-enter");

    card.querySelector(".btn-tts")?.addEventListener("click", () => speakWord(pickup.word));
    card.querySelector(".wc-dismiss")?.addEventListener("click", () => this.dismissWordCard());

    this.wordCardTimer = setTimeout(() => this.dismissWordCard(), 5000);
  }

  private dismissWordCard(): void {
    const card = this.root.querySelector("#word-pickup-card");
    if (!card) return;
    card.classList.add("hidden");
    card.classList.remove("wc-enter");
    if (this.wordCardTimer) {
      clearTimeout(this.wordCardTimer);
      this.wordCardTimer = null;
    }
  }

  /** 进入学习场景 */
  private openScene(levelId: string): void {
    const ref = this.levelMap.get(levelId);
    if (!ref) {
      showToast("场景加载失败");
      return;
    }

    const { level, zone } = ref;

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
    const built =
      this.state.save.courseId === "college_english_rw3"
        ? buildRw3UnitScene(zone, this.wordMap, this.rw3Units.get(zone.id.replace("rw3_", "")), level.word_ids, index)
        : buildContextScene(level, zone, this.wordMap, zone.levels.findIndex((l) => l.id === level.id), zone.levels.length);
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
      audio.play("nav"); this.renderMap(); this.show("map");
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
      audio.play("nav"); this.renderMap(); this.show("map");
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
      audio.play("nav"); this.renderMap(); this.show("map");
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
      audio.play("nav"); this.renderMap(); this.show("map");
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
    if (wasNew) this.state.completeLevel(levelId);
    showToast(wasNew ? "本关完成！" : "重温完成");
    audio.play("win");
    this.loadCourse(this.state.save.courseId).then(() => {
      this.renderMap();
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
    this.rw3ClozeIndex = 0;
    this.rw3ClozeDone = new Set();
    this.rw3TranslationIndex = 0;
    this.rw3TranslationDone = false;
    this.rw3WritingAck = false;

    const useRw3 =
      mode === "level" &&
      this.state.save.courseId === "college_english_rw3" &&
      (built.rw3Phases?.length ?? 0) > 0;

    if (useRw3) {
      this.phase = "rw3";
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
    return `<div class="rw3-stepper">${phases
      .map((p, i) => {
        const cls =
          i === this.rw3PhaseIndex ? "active" : i < this.rw3PhaseIndex ? "done" : "";
        return `<span class="rw3-step ${cls}" title="${p.label}">${p.label}</span>`;
      })
      .join("")}</div>`;
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
      return;
    }
    if (phase.kind === "reading_quiz" || phase.kind === "listening") {
      this.renderRw3QuizPhase(screen, phase, phaseNo, totalPhases);
      return;
    }
    if (phase.kind === "cloze") {
      this.renderRw3ClozePhase(screen, phase, phaseNo, totalPhases);
      return;
    }
    if (phase.kind === "translation") {
      this.renderRw3TranslationPhase(screen, phase, phaseNo, totalPhases);
      return;
    }
    if (phase.kind === "writing") {
      this.renderRw3WritingPhase(screen, phase, phaseNo, totalPhases);
    }
  }

  private renderRw3ReadingPhase(
    screen: Element,
    phase: Extract<Rw3Phase, { kind: "section_a" | "section_b" | "section_c" | "vocab" }>,
    phaseNo: number,
    totalPhases: number
  ): void {
    const graded = phase.words.filter((w) => this.sessionGraded.has(w.id)).length;
    const total = phase.words.length;
    const done = graded >= total;
    const vocabHint =
      phase.kind === "vocab" ? ` · 第 ${phase.level}/${phase.totalLevels} 关（每关 5 词）` : "";

    const sectionIcon = phase.kind === "section_a" ? "📖 A" : phase.kind === "section_b" ? "📖 B" : phase.kind === "section_c" ? "🏮 C" : "🗝";
    const sectionColor = phase.kind === "section_c" ? "rw3-section-c" : phase.kind === "vocab" ? "rw3-section-vocab" : "";

    screen.innerHTML = `
      <div class="card scene-header ${sectionColor}">
        <span class="progress-pill">读写3 · ${phaseNo}/${totalPhases} · ${phase.label}</span>
        ${this.rw3StepperHtml()}
        <div class="rw3-section-badge">${sectionIcon} ${phase.kind === "vocab" ? "词汇专项练习" : phase.title}</div>
        <p class="learn-steps">① 阅读段落  ② 点击高亮词  ③ 在心里回忆释义  ④ 自评记忆强度</p>
        <div class="discover-bar"><div class="discover-fill" style="width:${total ? (graded / total) * 100 : 0}%"></div></div>
        <div class="discover-label">已回忆 <strong>${graded}/${total}</strong> 词${vocabHint}</div>
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
      <div class="card scene-body rw3-passage-body" id="scene-body"></div>
      <div class="card word-panel" id="word-panel"><p class="subtitle">点击高亮词 → 主动回忆其中文含义 → 再自评记忆强度</p></div>
      <div class="scene-actions">
        <button class="btn btn-ghost" id="btn-back-map" type="button">返回地图</button>
        <button class="btn btn-primary" id="btn-rw3-next" type="button" ${done ? "" : "disabled"}>${phaseNo >= totalPhases ? "🎉 完成本单元" : "下一阶段 →"}</button>
      </div>
    `;

    const body = screen.querySelector("#scene-body")!;
    for (const seg of phase.kind === "vocab" ? [] : phase.segments) {
      if (seg.type === "text") {
        body.append(seg.content);
        continue;
      }
      const g = this.sessionGraded.has(seg.wordId!);
      const btn = el("button", `ctx-word${g ? " discovered" : ""}${this.selectedWordId === seg.wordId ? " active" : ""}`);
      btn.type = "button";
      btn.textContent = seg.content;
      btn.addEventListener("click", () => this.onWordSelect(seg.wordId!));
      body.appendChild(btn);
    }

    if (phase.kind === "vocab") {
      body.innerHTML = `<p class="subtitle">本关词汇：请逐一点击下方词卡完成主动回忆（无段落阅读）。</p>`;
    }

    if (this.selectedWordId) this.renderRecallPanel(this.selectedWordId);

    screen.querySelectorAll("#word-chips .word-chip").forEach((chip) => {
      chip.addEventListener("click", () => {
        const wid = (chip as HTMLElement).dataset.wid;
        if (wid) this.onWordSelect(wid);
      });
    });
    screen.querySelector("#btn-back-map")?.addEventListener("click", () => {
      audio.play("nav");
      this.renderMap();
      this.show("map");
    });
    screen.querySelector("#btn-rw3-next")?.addEventListener("click", () => {
      if (!done) return;
      this.advanceRw3Phase();
    });
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
        <p class="learn-steps">${phase.kind === "listening" ? "① 阅读听力稿 ② 完成理解题" : "阅读理解选择题"}</p>
        ${phase.kind === "listening" ? `<div class="card listen-script" id="listen-body"></div>` : ""}
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

    screen.querySelector("#btn-back-map")?.addEventListener("click", () => {
      audio.play("nav");
      this.renderMap();
      this.show("map");
    });
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

    screen.querySelector("#btn-back-map")?.addEventListener("click", () => {
      audio.play("nav");
      this.renderMap();
      this.show("map");
    });
    screen.querySelector("#btn-rw3-next")?.addEventListener("click", () => {
      if (!allDone) return;
      this.advanceRw3Phase();
    });
  }

  private onRw3ClozeAnswer(item: ClozeItem, choice: string, btn: HTMLButtonElement): void {
    const feedback = this.root.querySelector("#cloze-feedback");
    const correct = choice === item.answer;
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
        <p class="learn-steps">将中文句子译成英文，需包含关键词 · 共 ${total} 句</p>
        <div class="discover-bar"><div class="discover-fill" style="width:${(idx / total) * 100}%"></div></div>
        <div class="discover-label">第 <strong>${idx + 1}/${total}</strong> 句${allDone ? " · 全部完成 ✓" : ""}</div>
      </div>
      <div class="card translation-card">
        <div class="trans-sentence-no">第 ${idx + 1} 句</div>
        <p class="translation-zh">${sentence?.zh ?? ""}</p>
        <div class="trans-keywords">
          ${(sentence?.keywords ?? []).map((kw) => `<span class="trans-kw-chip">${kw}</span>`).join("")}
        </div>
        <textarea class="translation-input" id="translation-input" rows="3" placeholder="在此输入英文译文…"></textarea>
        <p class="translation-ref hidden" id="translation-ref">
          <span class="trans-ref-label">参考译文</span>
          ${sentence?.enReference ?? ""}
        </p>
        <p class="translation-feedback" id="translation-feedback"></p>
        <button class="btn btn-primary" id="btn-check-translation" type="button">提交 · 检查关键词</button>
      </div>
      <div class="scene-actions">
        <button class="btn btn-ghost" id="btn-back-map" type="button">返回地图</button>
        <button class="btn btn-primary" id="btn-rw3-next" type="button" ${allDone ? "" : "disabled"}>下一阶段</button>
      </div>
    `;

    screen.querySelector("#btn-check-translation")?.addEventListener("click", () => {
      if (!sentence) return;
      const input = (screen.querySelector("#translation-input") as HTMLTextAreaElement).value.trim();
      if (!input) return;
      const result = checkTranslation(input, {
        zh: sentence.zh,
        enReference: sentence.enReference,
        keywords: sentence.keywords,
      });
      const feedback = screen.querySelector("#translation-feedback");
      const ref = screen.querySelector("#translation-ref");
      ref?.classList.remove("hidden");

      if (result.ok) {
        audio.play("win");
        if (feedback) feedback.innerHTML = `<span class="trans-ok">✓ 关键词命中：${result.matched.join("、")}</span>`;
        setTimeout(() => {
          if (this.rw3TranslationIndex < total - 1) {
            this.rw3TranslationIndex += 1;
          } else {
            this.rw3TranslationDone = true;
          }
          this.renderScene();
        }, 900);
      } else {
        audio.play("click");
        if (feedback)
          feedback.innerHTML = `<span class="trans-hint">💡 请包含至少 2 个关键词：${sentence.keywords.join("、")}</span>`;
      }
    });

    screen.querySelector("#btn-back-map")?.addEventListener("click", () => {
      audio.play("nav");
      this.renderMap();
      this.show("map");
    });
    screen.querySelector("#btn-rw3-next")?.addEventListener("click", () => {
      if (!allDone) return;
      this.advanceRw3Phase();
    });
  }

  private renderRw3WritingPhase(
    screen: Element,
    phase: Extract<Rw3Phase, { kind: "writing" }>,
    phaseNo: number,
    totalPhases: number
  ): void {
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
          <div class="writing-wordcount" id="writing-wordcount">0 / 120 词</div>
        </div>
        <div class="writing-progress-bar"><div class="writing-progress-fill" id="writing-progress-fill" style="width:0%"></div></div>
        <label class="writing-check"><input type="checkbox" id="writing-ack" ${this.rw3WritingAck ? "checked" : ""}/> 我已完成初稿并达到 100 词以上</label>
      </div>
      <div class="scene-actions">
        <button class="btn btn-ghost" id="btn-back-map" type="button">返回地图</button>
        <button class="btn btn-primary" id="btn-rw3-finish" type="button" ${this.rw3WritingAck ? "" : "disabled"}>🎉 完成本单元</button>
      </div>
    `;

    const ack = screen.querySelector("#writing-ack") as HTMLInputElement;
    const textarea = screen.querySelector("#writing-input") as HTMLTextAreaElement;
    const counter = screen.querySelector("#writing-wordcount") as HTMLElement;
    const bar = screen.querySelector("#writing-progress-fill") as HTMLElement;
    const TARGET = 120;

    const update = () => {
      const words = textarea.value.trim().split(/\s+/).filter(Boolean).length;
      const pct = Math.min((words / TARGET) * 100, 100);
      counter.textContent = `${words} / ${TARGET} 词`;
      counter.className = `writing-wordcount ${words >= TARGET ? "wc-good" : words >= 80 ? "wc-mid" : ""}`;
      bar.style.width = `${pct}%`;
      bar.className = `writing-progress-fill ${words >= TARGET ? "wfill-good" : words >= 80 ? "wfill-mid" : ""}`;
      this.rw3WritingAck = ack.checked && words >= 100;
      const finish = screen.querySelector("#btn-rw3-finish") as HTMLButtonElement;
      if (finish) finish.disabled = !this.rw3WritingAck;
    };

    ack?.addEventListener("change", update);
    textarea?.addEventListener("input", update);

    screen.querySelector("#btn-back-map")?.addEventListener("click", () => {
      audio.play("nav");
      this.renderMap();
      this.show("map");
    });
    screen.querySelector("#btn-rw3-finish")?.addEventListener("click", () => {
      if (!this.rw3WritingAck) return;
      this.finishScene();
    });
  }

  private advanceRw3Phase(): void {
    const phases = this.scene?.rw3Phases;
    if (!phases) return;
    if (this.rw3PhaseIndex < phases.length - 1) {
      this.rw3PhaseIndex += 1;
      this.rw3QuizIndex = 0;
      this.rw3QuizCorrect = new Set();
      this.rw3TranslationIndex = 0;
      this.rw3TranslationDone = false;
      this.selectedWordId = null;
      this.answerRevealed = false;
      audio.play("start");
      this.renderScene();
    } else {
      this.finishScene();
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

    screen.querySelector("#btn-back-map")?.addEventListener("click", () => {
      audio.play("nav");
      this.renderMap();
      this.show("map");
    });
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
    const word = this.scene?.words.find((w) => w.id === wordId);
    if (!panel || !word) return;

    // 从词库查完整条目（含音标、例句译文、搭配）
    const entry = this.wordMap.get(wordId);
    const phonetic = entry?.phonetic ? `<span class="word-phonetic">${entry.phonetic}</span>` : "";
    const mem = this.state.getMemory(wordId);

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
          <p class="en-clue recall-ctx">${word.contextLine}</p>
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

    const exampleZh = entry?.example_zh
      ? `<p class="word-example-zh">${entry.example_zh}</p>`
      : "";
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
        <p class="en-clue">${word.contextLine}</p>
        ${exampleZh}
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
      const wasNew = !this.state.save.levelProgress[this.scene.levelId]?.cleared;
      if (wasNew) {
        this.state.completeLevel(this.scene.levelId);
        showToast(
          this.state.save.courseId === "college_english_rw3"
            ? "本单元全部模块完成！20 词已进入间隔复习队列"
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
      this.loadCourse(this.state.save.courseId).then(() => {
        this.renderMap();
        this.show("map");
        // 重新进入探索模式（保留已收集进度）
        this.enterUnitExplore(savedExplore.unitId, savedExplore.collectedIds);
      });
      return;
    }
    this.loadCourse(this.state.save.courseId).then(() => {
      this.renderMap();
      this.show("map");
    });
  }
}
