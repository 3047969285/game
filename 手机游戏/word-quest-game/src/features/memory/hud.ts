import { normalizeToken } from "./text";
import type { Pov } from "./types";

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
  /** 虚拟摇杆：x 右为正，z 前为正，范围 -1..1 */
  onStick?: (x: number, z: number) => void;

  private readonly exitBtn: HTMLButtonElement;
  private readonly povTag: HTMLElement;
  private readonly prompt: HTMLElement;
  private readonly choices: HTMLElement;
  private readonly subtitle: HTMLElement;
  private readonly subEn: HTMLElement;
  private readonly subZh: HTMLElement;
  private readonly skipBtn: HTMLButtonElement;
  private readonly zhBtn: HTMLButtonElement;
  private readonly card: HTMLElement;
  private readonly fadeEl: HTMLElement;
  private readonly gateEl: HTMLElement;
  private readonly captionEl: HTMLElement;
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
    el("div", "mem-bar mem-bar-top", this.root);
    el("div", "mem-bar mem-bar-bottom", this.root);

    this.exitBtn = el("button", "mem-exit", this.root, "×");
    this.exitBtn.type = "button";
    this.exitBtn.setAttribute("aria-label", "退出回忆");
    this.exitBtn.addEventListener("click", () => this.onExitClick());

    this.povTag = el("div", "mem-pov", this.root);

    // 底部堆叠区：词卡 / 提示 / 选项 / 字幕自上而下排列，互不遮挡，合计不超过屏幕高度的 ~30%
    const stack = el("div", "mem-stack", this.root);
    this.card = el("div", "mem-card", stack);
    this.prompt = el("div", "mem-prompt", stack);
    this.choices = el("div", "mem-choices", stack);

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

  // ───────── 词卡 ─────────

  showWordCard(info: WordCardInfo, ms = 2500): void {
    window.clearTimeout(this.cardTimer);
    this.card.textContent = "";
    const head = el("div", "mem-card-head", this.card);
    el("strong", "mem-card-word", head, info.word);
    if (info.phonetic) el("span", "mem-card-ph", head, info.phonetic);
    if (info.meaning) el("div", "mem-card-mean", this.card, info.meaning);
    if (info.line) el("div", "mem-card-line", this.card, info.line);
    this.card.classList.add("on");
    this.cardTimer = window.setTimeout(() => this.hideWordCard(), ms);
  }

  hideWordCard(): void {
    window.clearTimeout(this.cardTimer);
    this.card.classList.remove("on");
  }

  // ───────── 转场 ─────────

  /** 黑场：toBlack=true 渐黑，false 渐亮 */
  fade(toBlack: boolean, ms = 900): Promise<void> {
    this.fadeEl.style.transitionDuration = `${ms}ms`;
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
