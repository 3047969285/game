import { normalizeToken } from "./text";
import type { ActPov, Pov } from "./types";

/**
 * 回忆的极简 HUD：底部字幕条（英文大、中文小，可开关）、右上角视角标记、左上角小 ×（二次确认）、
 * 选择条（≤ 3 行）、词卡、触碰提示、断片空位、定格题注、虚拟摇杆。默认不出现任何大面板。
 * 手机竖屏：字幕 + 选项合计不超过屏幕高度的 30%（见 memory.css）。
 */

const POV_LABEL: Record<Pov, string> = { you: "YOU", watch: "WATCHING", me: "ME", paper: "PAPER" };
const ZH_KEY = "word_quest_mem_zh";

export interface SubtitleOptions {
  /** 需要强调的词（本单元词）的原形；屈折形式也会命中 */
  vocab?: readonly string[];
  /** 把句子里的 [index, index+length) 换成闪烁的空位（断片） */
  blank?: { index: number; length: number };
}

export interface ChoiceItem {
  label: string;
  sub?: string;
}

/** 视角切换器上三个按钮：他（第三人称）/ 我（第一人称）/ 纸（二维笔记本） */
const ACT_POVS: Array<{ pov: ActPov; zh: string; label: string }> = [
  { pov: "watch", zh: "他", label: "第三人称 · 看当年的我" },
  { pov: "me", zh: "我", label: "第一人称 · 坐在当年我的位子上上课" },
  { pov: "paper", zh: "纸", label: "二维 · 当年的笔记本" },
];

export interface WordCardInfo {
  word: string;
  phonetic?: string;
  meaning?: string;
  line?: string;
}

function el<K extends keyof HTMLElementTagNameMap>(tag: K, className: string, parent?: HTMLElement, text?: string): HTMLElementTagNameMap[K] {
  const node = document.createElement(tag);
  node.className = className;
  if (text !== undefined) node.textContent = text;
  parent?.appendChild(node);
  return node;
}

function readZhPref(): boolean {
  try {
    return localStorage.getItem(ZH_KEY) !== "0";
  } catch {
    return true;
  }
}

export class MemoryHud {
  readonly root: HTMLElement;
  /** 词签层：Interaction 往这里放跟随物件的小标签 */
  readonly labels: HTMLElement;

  onExit?: () => void;
  onSkip?: () => void;
  /** 视角切换器：玩家点了某个视角 */
  onPickPov?: (pov: ActPov) => void;
  /** 虚拟摇杆：x 右为正，z 前为正，范围 -1..1 */
  onStick?: (x: number, z: number) => void;

  private readonly exitBtn: HTMLButtonElement;
  private readonly povTag: HTMLElement;
  private readonly switcher: HTMLElement;
  private readonly switchBtns = new Map<ActPov, HTMLButtonElement>();
  private readonly dots: HTMLElement;
  private readonly prompt: HTMLElement;
  private readonly choices: HTMLElement;
  private readonly quiz: HTMLElement;
  private readonly subtitle: HTMLElement;
  private readonly subEn: HTMLElement;
  private readonly subZh: HTMLElement;
  private readonly skipBtn: HTMLButtonElement;
  private readonly zhBtn: HTMLButtonElement;
  private readonly card: HTMLElement;
  private readonly fadeEl: HTMLElement;
  private readonly gateEl: HTMLElement;
  private readonly captionEl: HTMLElement;
  private epilogueEl: HTMLElement | null = null;
  private readonly barTop: HTMLElement;
  private readonly stick: HTMLElement;
  private readonly knob: HTMLElement;
  private readonly cleanups: Array<() => void> = [];
  private tokens: HTMLElement[] = [];
  private blankEl: HTMLElement | null = null;
  private showZh = readZhPref();
  private exitArmed = false;
  private exitTimer = 0;
  private cardTimer = 0;
  private stickPointer: number | null = null;
  private stickWanted = false;
  private readonly coarse: boolean;

  constructor(container: HTMLElement) {
    this.coarse = typeof matchMedia === "function" && matchMedia("(pointer: coarse)").matches;
    this.root = el("div", "mem-hud");
    container.appendChild(this.root);
    this.labels = el("div", "mem-labels", this.root);
    this.barTop = el("div", "mem-bar mem-bar-top", this.root);
    el("div", "mem-bar mem-bar-bottom", this.root);

    this.exitBtn = el("button", "mem-exit", this.root, "×");
    this.exitBtn.type = "button";
    this.exitBtn.setAttribute("aria-label", "退出回忆");
    this.exitBtn.addEventListener("click", () => this.onExitClick());

    this.povTag = el("div", "mem-pov", this.root);

    // 视角切换器（只在 “幕” 里出现）：右上角三个小按钮 + 下面一排幕的小点
    this.switcher = el("div", "mem-switch", this.root);
    this.switcher.hidden = true;
    const group = el("div", "mem-switch-group", this.switcher);
    for (const def of ACT_POVS) {
      const b = el("button", "mem-switch-btn", group, def.zh);
      b.type = "button";
      b.setAttribute("aria-label", def.label);
      b.title = def.label;
      b.dataset.pov = def.pov;
      b.addEventListener("click", () => this.onPickPov?.(def.pov));
      this.switchBtns.set(def.pov, b);
    }
    this.dots = el("div", "mem-act-dots", this.switcher);

    // 词卡是浮在物件旁边的小卡片（不进底部堆叠区，见 placeCard）
    this.card = el("div", "mem-card", this.labels);
    // 底部堆叠区：提示 / 选项 / 字幕自上而下排列，互不遮挡，合计不超过屏幕高度的 ~30%
    const stack = el("div", "mem-stack", this.root);
    this.prompt = el("div", "mem-prompt", stack);
    this.choices = el("div", "mem-choices", stack);
    this.quiz = el("div", "mem-choices mem-quiz", stack);

    this.subtitle = el("div", "mem-sub", stack);
    this.subEn = el("div", "mem-sub-en", this.subtitle);
    this.subZh = el("div", "mem-sub-zh", this.subtitle);
    this.skipBtn = el("button", "mem-skip", this.subtitle, "▸▸");
    this.skipBtn.type = "button";
    this.skipBtn.setAttribute("aria-label", "跳过当前句");
    this.skipBtn.addEventListener("click", () => this.onSkip?.());
    this.zhBtn = el("button", "mem-zh", this.subtitle, "中");
    this.zhBtn.type = "button";
    this.zhBtn.setAttribute("aria-label", "显示或隐藏中文");
    this.zhBtn.addEventListener("click", () => {
      this.showZh = !this.showZh;
      try {
        localStorage.setItem(ZH_KEY, this.showZh ? "1" : "0");
      } catch {
        // 偏好存不下来也无所谓
      }
      this.applyZh();
    });
    this.applyZh();

    this.stick = el("div", "mem-stick", this.root);
    this.knob = el("div", "mem-stick-knob", this.stick);
    this.bindStick();

    this.captionEl = el("div", "mem-caption", this.root);
    this.fadeEl = el("div", "mem-fade", this.root);
    this.gateEl = el("div", "mem-gate", this.root);
    this.gateEl.hidden = true;

    this.setSkipVisible(false);
    this.clearSubtitle();
  }

  // ───────── 基础 ─────────

  setPov(pov: Pov): void {
    this.povTag.textContent = POV_LABEL[pov];
    this.povTag.dataset.pov = pov;
    this.stickWanted = pov === "you";
    this.stick.classList.toggle("on", this.stickWanted && this.coarse);
  }

  /** 视角切换器：显示 / 隐藏。显示时右上角的 YOU / WATCHING 标记让位 */
  setActSwitcher(on: boolean): void {
    this.switcher.hidden = !on;
    this.root.classList.toggle("mem-acts-on", on);
  }

  /** 当前视角高亮 */
  setActPov(pov: ActPov): void {
    for (const [key, b] of this.switchBtns) {
      b.classList.toggle("on", key === pov);
      b.setAttribute("aria-pressed", key === pov ? "true" : "false");
    }
  }

  /** 幕的小点：当前幕高亮，看过的实心，笔记还空着的带小圈 */
  setActDots(total: number, current: number, seen: readonly boolean[], notesOpen: readonly boolean[]): void {
    this.dots.textContent = "";
    for (let i = 0; i < total; i++) {
      const d = el("i", "mem-act-dot", this.dots);
      if (i === current) d.classList.add("cur");
      if (seen[i]) d.classList.add("seen");
      if (notesOpen[i]) d.classList.add("open");
      d.title = `第 ${i + 1} 幕${notesOpen[i] ? " · 笔记还空着" : ""}`;
    }
  }

  setLetterbox(on: boolean): void {
    this.root.classList.toggle("mem-letterbox", on);
  }

  setSkipVisible(v: boolean): void {
    this.skipBtn.hidden = !v;
  }

  private applyZh(): void {
    this.subtitle.classList.toggle("zh-off", !this.showZh);
    this.zhBtn.classList.toggle("off", !this.showZh);
  }

  private onExitClick(): void {
    if (!this.exitArmed) {
      this.exitArmed = true;
      this.exitBtn.classList.add("armed");
      this.exitBtn.textContent = "再点一次退出";
      this.exitTimer = window.setTimeout(() => this.disarmExit(), 3000);
      return;
    }
    this.disarmExit();
    this.onExit?.();
  }

  private disarmExit(): void {
    window.clearTimeout(this.exitTimer);
    this.exitArmed = false;
    this.exitBtn.classList.remove("armed");
    this.exitBtn.textContent = "×";
  }

  // ───────── 字幕 ─────────

  setSubtitle(text: string, zh?: string, opts: SubtitleOptions = {}): void {
    this.subEn.textContent = "";
    this.tokens = [];
    this.blankEl = null;
    const vocab = (opts.vocab ?? []).map((v) => v.toLowerCase());
    let pos = 0;
    const blank = opts.blank;
    const pushText = (t: string, parent: HTMLElement): void => {
      if (t) parent.appendChild(document.createTextNode(t));
    };
    for (const m of text.matchAll(/\S+/g)) {
      const start = m.index ?? 0;
      const token = m[0];
      pushText(text.slice(pos, start), this.subEn);
      pos = start + token.length;
      const span = el("span", "w", this.subEn);
      this.tokens.push(span);
      const norm = normalizeToken(token);
      if (vocab.some((v) => norm === v || (norm.startsWith(v) && norm.length - v.length <= 3))) span.classList.add("vocab");
      if (blank && blank.index >= start && blank.index < start + token.length) {
        const rel = blank.index - start;
        pushText(token.slice(0, rel), span);
        const b = el("span", "blank", span, "_".repeat(Math.max(5, Math.min(11, blank.length))));
        this.blankEl = b;
        pushText(token.slice(rel + blank.length), span);
      } else {
        span.textContent = token;
      }
    }
    pushText(text.slice(pos), this.subEn);
    this.subZh.textContent = zh ?? "";
    this.subZh.hidden = !zh;
    this.subtitle.classList.add("on");
    this.subtitle.classList.remove("reading");
    this.subtitle.classList.remove("gap-wrong");
  }

  /** 开始“逐词点亮”模式：之后用 setReadProgress 推进 */
  beginReading(): void {
    this.subtitle.classList.add("reading");
    this.tokens.forEach((t) => t.classList.remove("read"));
  }

  setReadProgress(index: number): void {
    for (let i = 0; i < this.tokens.length; i++) this.tokens[i].classList.toggle("read", i <= index);
  }

  endReading(): void {
    this.subtitle.classList.remove("reading");
  }

  /** 断片：把空位填上答案词 */
  fillBlank(text: string): void {
    if (!this.blankEl) return;
    this.blankEl.textContent = text;
    this.blankEl.classList.add("filled");
  }

  /** 断片答错：字幕条轻微抖动 */
  shakeSubtitle(): void {
    this.subtitle.classList.remove("gap-wrong");
    void this.subtitle.offsetWidth;
    this.subtitle.classList.add("gap-wrong");
  }

  clearSubtitle(): void {
    this.subEn.textContent = "";
    this.subZh.textContent = "";
    this.tokens = [];
    this.blankEl = null;
    this.subtitle.classList.remove("on", "reading");
  }

  setPrompt(text?: string, zh?: string): void {
    this.prompt.textContent = "";
    if (!text) {
      this.prompt.classList.remove("on");
      return;
    }
    el("span", "mem-prompt-en", this.prompt, text);
    if (zh) el("span", "mem-prompt-zh", this.prompt, zh);
    this.prompt.classList.add("on");
  }

  // ───────── 选项（附身对话，最多 3 行） ─────────

  showChoices(items: ChoiceItem[], onPick: (index: number) => void): void {
    this.choices.textContent = "";
    items.slice(0, 3).forEach((item, i) => {
      const b = el("button", "mem-choice", this.choices);
      b.type = "button";
      el("strong", "", b, item.label);
      if (item.sub) el("small", "", b, item.sub);
      b.addEventListener("click", () => onPick(i));
    });
    this.choices.classList.add("on");
  }

  markChoice(index: number, verdict: "right" | "wrong"): void {
    const b = this.choices.children[index] as HTMLElement | undefined;
    if (!b) return;
    b.classList.remove("wrong", "right");
    void b.offsetWidth;
    b.classList.add(verdict);
  }

  hideChoices(): void {
    this.choices.classList.remove("on");
    this.choices.textContent = "";
  }

  // ───────── 课堂提问的选项（第一人称，最多 4 行，长选项可展开） ─────────

  showQuiz(items: readonly string[], onPick: (index: number) => void): void {
    this.quiz.textContent = "";
    items.slice(0, 4).forEach((text, i) => {
      const b = el("button", "mem-choice mem-quiz-opt", this.quiz);
      b.type = "button";
      el("b", "mem-quiz-key", b, "ABCD"[i]);
      el("span", "mem-quiz-text", b, text);
      if (text.length > 62) {
        const more = el("i", "mem-quiz-more", b, "⌄");
        more.setAttribute("role", "button");
        more.setAttribute("aria-label", "展开全文");
        more.addEventListener("click", (e) => {
          e.stopPropagation();
          b.classList.toggle("open");
        });
      }
      b.addEventListener("click", () => onPick(i));
    });
    this.quiz.classList.add("on");
  }

  markQuiz(index: number, verdict: "right" | "wrong"): void {
    const b = this.quiz.children[index] as HTMLButtonElement | undefined;
    if (!b) return;
    b.classList.remove("wrong", "right");
    void b.offsetWidth;
    b.classList.add(verdict);
    if (verdict === "wrong") b.disabled = true;
  }

  hideQuiz(): void {
    this.quiz.classList.remove("on");
    this.quiz.textContent = "";
  }

  // ───────── 词卡 ─────────

  /** 词卡是否正在显示 */
  get cardOn(): boolean {
    return this.card.classList.contains("on");
  }

  showWordCard(info: WordCardInfo, ms = 2500): void {
    window.clearTimeout(this.cardTimer);
    this.card.textContent = "";
    this.card.style.visibility = "hidden"; // 第一次定位之前不显示，避免从左上角闪过来
    const head = el("div", "mem-card-head", this.card);
    el("strong", "mem-card-word", head, info.word);
    if (info.phonetic) el("span", "mem-card-ph", head, info.phonetic);
    if (info.meaning) el("div", "mem-card-mean", this.card, info.meaning);
    if (info.line) el("div", "mem-card-line", this.card, info.line);
    this.card.classList.add("on");
    this.cardTimer = window.setTimeout(() => this.hideWordCard(), ms);
  }

  /**
   * 把词卡放在屏幕坐标 (x, y)（物件的投影点，y 是物件顶部）附近：优先在物件上方，放不下就放到下方，
   * 并夹在屏幕内（避开底部的提示条与顶部角标）。
   */
  placeCard(x: number, y: number, viewW: number, viewH: number, below?: number): void {
    const w = this.card.offsetWidth || 220;
    const h = this.card.offsetHeight || 90;
    const margin = 10;
    // 宽银幕黑边（watch 视角）也要让开
    const bar = this.barTop.offsetHeight || 0;
    const topSafe = Math.max(44, bar + 12);
    const bottomSafe = Math.max(92, viewH * 0.16) + bar;
    let cx = Math.min(Math.max(x, w / 2 + margin), viewW - w / 2 - margin);
    let top = y - h - 14;
    if (top < topSafe) top = (below ?? y) + 18;
    top = Math.min(Math.max(top, topSafe), viewH - bottomSafe - h);
    cx = Math.round(cx);
    this.card.style.transform = `translate(${cx - w / 2}px, ${Math.round(top)}px)`;
    this.card.style.visibility = "visible";
  }

  hideWordCard(): void {
    window.clearTimeout(this.cardTimer);
    this.card.classList.remove("on");
    this.card.style.visibility = "hidden";
  }

  // ───────── 转场 ─────────

  /** 黑场：toBlack=true 渐黑，false 渐亮 */
  fade(toBlack: boolean, ms = 900, color = "#000"): Promise<void> {
    this.fadeEl.style.transitionDuration = `${ms}ms`;
    if (toBlack) this.fadeEl.style.background = color;
    // 下一帧再改 class，保证过渡生效
    requestAnimationFrame(() => this.fadeEl.classList.toggle("on", toBlack));
    return new Promise((resolve) => {
      const t = window.setTimeout(resolve, ms + 40);
      this.cleanups.push(() => window.clearTimeout(t));
    });
  }

  setFadeInstant(black: boolean): void {
    this.fadeEl.style.transitionDuration = "0ms";
    this.fadeEl.classList.toggle("on", black);
  }

  /** “轻触开始”：浏览器朗读需要用户手势，开场时用它拿到手势 */
  gate(text: string, zh?: string, onTap?: () => void): Promise<void> {
    this.gateEl.textContent = "";
    el("span", "mem-gate-en", this.gateEl, text);
    if (zh) el("span", "mem-gate-zh", this.gateEl, zh);
    this.gateEl.hidden = false;
    return new Promise((resolve) => {
      const done = (): void => {
        onTap?.();
        this.gateEl.removeEventListener("pointerdown", done);
        window.removeEventListener("keydown", onKey);
        this.gateEl.hidden = true;
        resolve();
      };
      const onKey = (e: KeyboardEvent): void => {
        if (e.key === "Enter" || e.key === " ") done();
      };
      this.gateEl.addEventListener("pointerdown", done);
      window.addEventListener("keydown", onKey);
      this.cleanups.push(() => {
        this.gateEl.removeEventListener("pointerdown", done);
        window.removeEventListener("keydown", onKey);
        resolve();
      });
    });
  }

  /** 2090 年的尾声：深蓝夜色 + 雨丝，中间一句老年的他的话（定格淡白之后） */
  showEpilogue(text: string, zh?: string): void {
    this.hideEpilogue();
    const root = el("div", "mem-epilogue");
    for (let i = 0; i < 26; i++) {
      const drop = el("i", "mem-rain", root);
      drop.style.left = `${(i * 37.7) % 100}%`;
      drop.style.animationDelay = `${-((i * 0.37) % 2.4)}s`;
      drop.style.animationDuration = `${1.5 + ((i * 7) % 10) / 10}s`;
      drop.style.opacity = String(0.25 + ((i * 13) % 10) / 22);
    }
    const line = el("div", "mem-epilogue-line", root);
    el("span", "mem-epilogue-en", line, text);
    if (zh) el("span", "mem-epilogue-zh", line, zh);
    this.root.insertBefore(root, this.fadeEl);
    this.epilogueEl = root;
    requestAnimationFrame(() => root.classList.add("on"));
  }

  hideEpilogue(): void {
    this.epilogueEl?.remove();
    this.epilogueEl = null;
  }

  /** 测试开关 ?memauto=1：替玩家点一下 “轻触开始” */
  tapGate(): void {
    if (!this.gateEl.hidden) this.gateEl.dispatchEvent(new Event("pointerdown"));
  }

  /** 定格后的题注 */
  setCaption(text?: string, zh?: string): void {
    this.captionEl.textContent = "";
    if (!text) {
      this.captionEl.classList.remove("on");
      return;
    }
    el("span", "mem-caption-en", this.captionEl, text);
    if (zh) el("span", "mem-caption-zh", this.captionEl, zh);
    this.captionEl.classList.add("on");
  }

  /** 隐藏全部交互 UI（定格时） */
  setChromeHidden(hidden: boolean): void {
    this.root.classList.toggle("mem-chrome-off", hidden);
  }

  // ───────── 虚拟摇杆 ─────────

  private bindStick(): void {
    const radius = 38;
    const update = (e: PointerEvent): void => {
      const rect = this.stick.getBoundingClientRect();
      let dx = e.clientX - (rect.left + rect.width / 2);
      let dy = e.clientY - (rect.top + rect.height / 2);
      const len = Math.hypot(dx, dy);
      if (len > radius) {
        dx = (dx / len) * radius;
        dy = (dy / len) * radius;
      }
      this.knob.style.transform = `translate(${dx}px, ${dy}px)`;
      this.onStick?.(dx / radius, -dy / radius);
    };
    const down = (e: PointerEvent): void => {
      if (this.stickPointer !== null) return;
      this.stickPointer = e.pointerId;
      try {
        this.stick.setPointerCapture(e.pointerId);
      } catch {
        // 部分内嵌 WebView 不支持指针捕获
      }
      update(e);
      e.preventDefault();
    };
    const move = (e: PointerEvent): void => {
      if (e.pointerId === this.stickPointer) update(e);
    };
    const up = (e: PointerEvent): void => {
      if (e.pointerId !== this.stickPointer) return;
      this.stickPointer = null;
      this.knob.style.transform = "";
      this.onStick?.(0, 0);
    };
    this.stick.addEventListener("pointerdown", down);
    this.stick.addEventListener("pointermove", move);
    this.stick.addEventListener("pointerup", up);
    this.stick.addEventListener("pointercancel", up);
  }

  dispose(): void {
    window.clearTimeout(this.exitTimer);
    window.clearTimeout(this.cardTimer);
    for (const fn of this.cleanups.splice(0)) fn();
    this.root.remove();
  }
}
