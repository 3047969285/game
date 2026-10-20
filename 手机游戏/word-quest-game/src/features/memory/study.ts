import type { WordEntry } from "../../core/types";
import type { GlossIndex } from "./actFlow";
import { BLANK, zhPrompt } from "./acts";
import { buildTranslateTiles, checkFill, checkOutline, checkTranslate, fillTiles, outlineTiles, type Tile } from "./noteTasks";
import { ensureHandwritingFont } from "./paper2d";
import { TileBoard } from "./tileBoard";
import type { MemoryAct, NoteTask, Voice } from "./types";

/**
 * 第一人称的课桌：讲义（预习 / 跟读）、笔记本（翻译 / 填词 / 提纲 + 生词卡 + 漫画格）、手机干扰。
 * 都是纸、墨、笔——用 DOM 排版（比贴在 3D 桌面上的贴图清晰，手机上也能放大），铺在三维教室之上。
 * 纯逻辑（词块判定、步骤状态机）在 noteTasks.ts / actFlow.ts / tileBoard.ts 里，这里只管画和点。
 */

export interface StudyDeps {
  words: ReadonlyMap<string, WordEntry>;
  gloss: GlossIndex;
  /** 朗读（会打断正在读的内容）。resolve 时读完 */
  speak: (text: string, voice?: Voice) => Promise<void>;
  /** 低画质：不做模糊 */
  lowQuality: boolean;
}

function h<K extends keyof HTMLElementTagNameMap>(tag: K, className: string, parent?: HTMLElement, text?: string): HTMLElementTagNameMap[K] {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  parent?.appendChild(node);
  return node;
}

/** 创建课桌层：放在 3D 画布之上、HUD 之下（HUD 的切换器和退出键仍然可点） */
export function createStudyLayer(host: HTMLElement, beforeEl: HTMLElement, lowQuality: boolean): HTMLElement {
  const layer = h("div", `mem-study${lowQuality ? " flat" : ""}`);
  host.insertBefore(layer, beforeEl);
  ensureHandwritingFont();
  return layer;
}

// ═══════════════════════════ 讲义 ═══════════════════════════

export interface HandoutHeader {
  unit: string;
  act: string;
}

/** 句子里的一个词：显示用的文字、查到的词条 */
interface TokenInfo {
  text: string;
  el: HTMLElement;
  entry: WordEntry | null;
  unit: boolean;
}

export class Handout {
  readonly root: HTMLElement;
  onWordTap?: (token: string, entry: WordEntry | null) => void;
  onSentenceTap?: (index: number) => void;
  onNext?: () => void;
  onSpeed?: (scale: number) => void;
  onSkip?: () => void;

  private readonly head: HTMLElement;
  private readonly title: HTMLElement;
  private readonly actTag: HTMLElement;
  private readonly body: HTMLElement;
  private readonly page: HTMLElement;
  private readonly pen: HTMLElement;
  private readonly step: HTMLElement;
  private readonly tools: HTMLElement;
  private readonly speedBtn: HTMLButtonElement;
  private readonly skipBtn: HTMLButtonElement;
  private readonly nextBtn: HTMLButtonElement;
  private sentences: HTMLElement[] = [];
  private tokens: TokenInfo[][] = [];
  private notes: HTMLElement[] = [];
  private curWord: HTMLElement | null = null;
  private curSentence = -1;
  private speed = 1;
  private shown = false;
  private hideTimer = 0;
  private flashTimer = 0;

  constructor(
    layer: HTMLElement,
    private readonly deps: StudyDeps
  ) {
    this.root = h("div", "mem-hand", layer);
    this.root.hidden = true;
    this.head = h("div", "mh-head", this.root);
    this.title = h("span", "mh-title", this.head);
    this.actTag = h("span", "mh-act", this.head);
    this.body = h("div", "mh-body", this.root);
    this.page = h("div", "mh-page", this.body);
    this.pen = h("div", "mh-pen", this.page);
    this.pen.setAttribute("aria-hidden", "true");
    const foot = h("div", "mh-foot", this.root);
    this.step = h("div", "mh-step", foot);
    this.tools = h("div", "mh-tools", foot);
    this.speedBtn = h("button", "mh-tool", this.tools, "1×");
    this.speedBtn.type = "button";
    this.speedBtn.setAttribute("aria-label", "朗读语速");
    this.speedBtn.addEventListener("click", () => {
      this.speed = this.speed === 1 ? 0.8 : 1;
      this.speedBtn.textContent = this.speed === 1 ? "1×" : "0.8×";
      this.onSpeed?.(this.speed);
    });
    this.skipBtn = h("button", "mh-tool", this.tools, "▸▸");
    this.skipBtn.type = "button";
    this.skipBtn.setAttribute("aria-label", "跳过这一句的朗读");
    this.skipBtn.addEventListener("click", () => this.onSkip?.());
    this.nextBtn = h("button", "mh-next", foot, "Next ▸");
    this.nextBtn.type = "button";
    this.nextBtn.addEventListener("click", () => {
      if (!this.nextBtn.disabled) this.onNext?.();
    });
    this.page.addEventListener("click", (e) => this.onPageClick(e));
  }

  get visible(): boolean {
    return this.shown;
  }

  /** 摊开本幕的讲义。unit 词淡淡标出（荧光笔），其它词也可以点 */
  show(act: MemoryAct, header: HandoutHeader): void {
    window.clearTimeout(this.hideTimer);
    this.title.textContent = header.unit;
    this.actTag.textContent = header.act;
    this.page.querySelectorAll(".mh-text, .mh-gloss").forEach((n) => n.remove());
    this.notes = [];
    this.sentences = [];
    this.tokens = [];
    this.curWord = null;
    this.curSentence = -1;
    const text = h("p", "mh-text");
    this.page.insertBefore(text, this.pen);
    act.sentences.forEach((sentence, si) => {
      const s = h("span", "mh-s", text);
      s.dataset.s = String(si);
      const play = h("button", "mh-play", s, "▸");
      play.type = "button";
      play.dataset.play = String(si);
      play.setAttribute("aria-label", "重听这一句");
      const list: TokenInfo[] = [];
      let first = true;
      for (const m of sentence.matchAll(/\S+/g)) {
        if (!first) s.appendChild(document.createTextNode(" "));
        first = false;
        const w = h("span", "mh-w", s, m[0]);
        const ti = list.length;
        w.dataset.s = String(si);
        w.dataset.t = String(ti);
        const entry = this.deps.gloss.lookup(m[0]);
        const unit = !!entry && act.wordIds.includes(entry.id);
        if (unit) w.classList.add("vocab");
        list.push({ text: m[0], el: w, entry, unit });
      }
      text.appendChild(document.createTextNode(" "));
      this.sentences.push(s);
      this.tokens.push(list);
    });
    this.pen.classList.remove("on");
    this.body.scrollTop = 0;
    this.root.hidden = false;
    this.shown = true;
    requestAnimationFrame(() => this.root.classList.add("in"));
  }

  hide(): void {
    if (!this.shown) return;
    this.shown = false;
    window.clearTimeout(this.flashTimer);
    this.root.classList.remove("in");
    window.clearTimeout(this.hideTimer);
    this.hideTimer = window.setTimeout(() => {
      if (!this.shown) this.root.hidden = true;
    }, 520);
  }

  /** 底部的步骤说明与计数 */
  setStep(text: string, counter?: string): void {
    this.step.textContent = "";
    h("span", "mh-step-text", this.step, text);
    if (counter) h("span", "mh-step-count", this.step, counter);
  }

  /** 右下角按钮：label 为 null 时隐藏 */
  setNext(label: string | null, enabled = true): void {
    this.nextBtn.hidden = label === null;
    if (label !== null) this.nextBtn.textContent = label;
    this.nextBtn.disabled = !enabled;
    this.nextBtn.classList.toggle("ready", enabled);
  }

  setTools(opts: { speed: boolean; skip: boolean }): void {
    this.speedBtn.hidden = !opts.speed;
    this.skipBtn.hidden = !opts.skip;
    this.tools.hidden = !opts.speed && !opts.skip;
  }

  /** 点一个词：笔划出下划线，页边出现手写批注（词条查不到就只是闪一下） */
  inkWord(si: number, ti: number): void {
    const info = this.tokens[si]?.[ti];
    if (!info) return;
    const el = info.el;
    el.classList.add("tapped");
    if (!info.entry) return;
    el.classList.add("inked");
    this.movePen(el);
    // 同一位置附近的旧批注淡掉，免得叠在一起
    const note = h("div", "mh-gloss", this.page);
    h("b", "mh-gloss-word", note, info.entry.word);
    if (info.entry.phonetic) h("i", "mh-gloss-ph", note, info.entry.phonetic);
    h("span", "mh-gloss-mean", note, `${info.entry.pos ? info.entry.pos + " " : ""}${info.entry.meaning}`);
    const r = el.getClientRects()[0] ?? el.getBoundingClientRect();
    const pr = this.page.getBoundingClientRect();
    const width = Math.min(note.offsetWidth || 170, pr.width - 8);
    const left = Math.max(2, Math.min(r.left - pr.left, pr.width - width - 4));
    const top = Math.max(0, r.top - pr.top - (note.offsetHeight || 24) - 1);
    note.style.left = `${Math.round(left)}px`;
    note.style.top = `${Math.round(top)}px`;
    for (const old of this.notes) {
      const ox = parseFloat(old.style.left);
      const oy = parseFloat(old.style.top);
      if (Math.abs(oy - top) < 26 && ox < left + width && ox + old.offsetWidth > left) old.classList.add("old");
    }
    this.notes.push(note);
    requestAnimationFrame(() => note.classList.add("in"));
  }

  /** 跟读：当前句高亮、当前词高亮，笔尖跟着走 */
  highlightSentence(si: number | null): void {
    if (this.curSentence >= 0) this.sentences[this.curSentence]?.classList.remove("cur-s");
    this.curSentence = si ?? -1;
    if (si !== null) {
      this.sentences[si]?.classList.add("cur-s");
      this.sentences[si]?.scrollIntoView({ block: "nearest", behavior: "smooth" });
    }
    this.highlightWord(null);
  }

  highlightWord(ti: number | null): void {
    this.curWord?.classList.remove("cur");
    this.curWord = null;
    if (ti === null || this.curSentence < 0) return;
    const el = this.tokens[this.curSentence]?.[ti]?.el;
    if (!el) return;
    el.classList.add("cur");
    this.curWord = el;
    this.movePen(el);
  }

  /** 答错后：相关的那一句在讲义上闪一下 */
  flashSentence(si: number, ms = 1800): void {
    const s = this.sentences[si];
    if (!s) return;
    s.scrollIntoView({ block: "center", behavior: "smooth" });
    s.classList.remove("flash");
    void s.offsetWidth;
    s.classList.add("flash");
    window.clearTimeout(this.flashTimer);
    this.flashTimer = window.setTimeout(() => s.classList.remove("flash"), ms);
  }

  /** 给定 (句序, 词序) 的词元素文字（测试开关用） */
  tokenCount(si: number): number {
    return this.tokens[si]?.length ?? 0;
  }

  /** 本幕里应当预习的单元词在讲义上的位置：[句序, 词序, 词条]，每个词条只取第一次出现 */
  vocabPositions(): Array<{ si: number; ti: number; entry: WordEntry }> {
    const seen = new Set<string>();
    const out: Array<{ si: number; ti: number; entry: WordEntry }> = [];
    this.tokens.forEach((list, si) =>
      list.forEach((t, ti) => {
        if (t.unit && t.entry && !seen.has(t.entry.id)) {
          seen.add(t.entry.id);
          out.push({ si, ti, entry: t.entry });
        }
      })
    );
    return out;
  }

  private movePen(el: HTMLElement): void {
    const r = el.getClientRects()[el.getClientRects().length - 1] ?? el.getBoundingClientRect();
    const pr = this.page.getBoundingClientRect();
    this.pen.style.transform = `translate(${Math.round(r.right - pr.left - 4)}px, ${Math.round(r.bottom - pr.top - 6)}px)`;
    this.pen.classList.add("on");
  }

  private onPageClick(e: MouseEvent): void {
    const target = e.target as HTMLElement | null;
    if (!target) return;
    const play = target.closest<HTMLElement>("[data-play]");
    if (play) {
      this.onSentenceTap?.(Number(play.dataset.play));
      return;
    }
    const w = target.closest<HTMLElement>(".mh-w");
    if (w && w.dataset.s !== undefined && w.dataset.t !== undefined) {
      const si = Number(w.dataset.s);
      const ti = Number(w.dataset.t);
      this.tapToken(si, ti);
    }
  }

  /** 点一个词（玩家点击或测试开关）：画下划线 + 页边批注，再通知外面去朗读 / 记进度 */
  tapToken(si: number, ti: number): void {
    const info = this.tokens[si]?.[ti];
    if (!info) return;
    this.inkWord(si, ti);
    this.onWordTap?.(info.text, info.entry);
  }

  /** 点右下角按钮（测试开关） */
  clickNext(): void {
    if (!this.nextBtn.hidden && !this.nextBtn.disabled) this.onNext?.();
  }

  dispose(): void {
    window.clearTimeout(this.hideTimer);
    window.clearTimeout(this.flashTimer);
    this.root.remove();
  }
}

// ═══════════════════════════ 笔记本 ═══════════════════════════

export interface NotebookShow {
  act: MemoryAct;
  total: number;
  /** full：漫画格 + 生词卡 + 笔记任务（二维视角）；tasks：只有笔记任务（第一人称低头记笔记） */
  mode: "full" | "tasks";
  /** 已经做完的笔记数（在第一人称或纸上做过的不重做） */
  startIndex: number;
  comic?: HTMLCanvasElement | null;
  /** 本幕生词卡 */
  vocab: WordEntry[];
  /** 翻译题干扰词的候选（本单元词的原形） */
  pool: readonly string[];
  finishLabel: string;
  /** 做完笔记后显示的一句小结（第一人称的专注度） */
  summary?: () => string | null;
}

export class Notebook {
  readonly root: HTMLElement;
  onTaskDone?: (index: number, task: NoteTask, wordIds: string[]) => void;
  onMistake?: () => void;
  onFinished?: () => void;
  onCard?: (wordId: string) => void;

  private readonly head: HTMLElement;
  private readonly scroll: HTMLElement;
  private readonly comicBox: HTMLElement;
  private readonly cards: HTMLElement;
  private readonly task: HTMLElement;
  private readonly foot: HTMLElement;
  private readonly progress: HTMLElement;
  private readonly hint: HTMLElement;
  private readonly checkBtn: HTMLButtonElement;
  private readonly nextBtn: HTMLButtonElement;
  private shown = false;
  private hideTimer = 0;
  private opts: NotebookShow | null = null;
  private index = 0;
  private runId = 0;
  private autoMs = 0;
  private readonly timers = new Set<number>();
  private taskDone = false;
  private checkFn: (() => void) | null = null;
  private autoFn: (() => void) | null = null;

  constructor(
    layer: HTMLElement,
    private readonly deps: StudyDeps
  ) {
    this.root = h("div", "mem-note", layer);
    this.root.hidden = true;
    this.head = h("div", "mn-head", this.root);
    this.scroll = h("div", "mn-scroll", this.root);
    this.comicBox = h("div", "mn-comic", this.scroll);
    this.cards = h("div", "mn-cards", this.scroll);
    this.task = h("div", "mn-task", this.scroll);
    this.foot = h("div", "mn-foot", this.root);
    this.progress = h("span", "mn-progress", this.foot);
    this.hint = h("span", "mn-hint", this.foot);
    this.checkBtn = h("button", "mn-btn", this.foot, "Check ✓");
    this.checkBtn.type = "button";
    this.checkBtn.addEventListener("click", () => this.checkFn?.());
    this.nextBtn = h("button", "mn-btn mn-next", this.foot, "Next ▸");
    this.nextBtn.type = "button";
    this.nextBtn.addEventListener("click", () => this.onNextClick());
  }

  get visible(): boolean {
    return this.shown;
  }

  /** 测试开关 ?memauto=1：按间隔自动做完当前页剩下的笔记并点 “下一幕” */
  setAuto(ms: number): void {
    this.autoMs = ms;
  }

  show(opts: NotebookShow): void {
    window.clearTimeout(this.hideTimer);
    this.clearTimers();
    this.runId++;
    this.opts = opts;
    this.index = Math.min(opts.startIndex, opts.act.notes.length);
    this.head.textContent = "";
    h("span", "mn-title", this.head, opts.mode === "full" ? "Notebook" : "Notes");
    h("span", "mn-act", this.head, `Act ${opts.act.index + 1} / ${opts.total}`);
    this.renderComic(opts);
    this.renderCards(opts);
    this.root.classList.toggle("tasks-only", opts.mode === "tasks");
    this.scroll.scrollTop = 0;
    this.root.hidden = false;
    this.shown = true;
    requestAnimationFrame(() => this.root.classList.add("in"));
    this.renderTask();
  }

  hide(): void {
    if (!this.shown) return;
    this.shown = false;
    this.runId++;
    this.clearTimers();
    this.root.classList.remove("in");
    window.clearTimeout(this.hideTimer);
    this.hideTimer = window.setTimeout(() => {
      if (!this.shown) this.root.hidden = true;
    }, 560);
  }

  private clearTimers(): void {
    for (const t of this.timers) window.clearTimeout(t);
    this.timers.clear();
  }

  private later(fn: () => void, ms: number): void {
    const id = this.runId;
    const t = window.setTimeout(() => {
      this.timers.delete(t);
      if (id === this.runId && this.shown) fn();
    }, ms);
    this.timers.add(t);
  }

  // ───── 漫画格与生词卡 ─────

  private renderComic(opts: NotebookShow): void {
    this.comicBox.textContent = "";
    this.comicBox.hidden = opts.mode !== "full" || !opts.comic;
    if (opts.mode !== "full" || !opts.comic) return;
    const panel = h("figure", "mn-panel", this.comicBox);
    h("i", "mn-tape l", panel);
    h("i", "mn-tape r", panel);
    panel.appendChild(opts.comic);
    h("figcaption", "mn-caption", panel, opts.act.sentences[0] ?? "");
  }

  private renderCards(opts: NotebookShow): void {
    this.cards.textContent = "";
    this.cards.hidden = opts.mode !== "full" || opts.vocab.length === 0;
    if (this.cards.hidden) return;
    h("div", "mn-section", this.cards, "New words");
    for (const w of opts.vocab) {
      const card = h("button", "mn-card", this.cards);
      card.type = "button";
      const top = h("div", "mn-card-top", card);
      h("b", "", top, w.word);
      if (w.phonetic) h("i", "", top, w.phonetic);
      h("u", "", top, w.pos);
      h("span", "mn-card-mean", card, w.meaning);
      const ex = opts.act.sentences.find((s) => new RegExp(`\\b${w.word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`, "i").test(s)) ?? w.example;
      if (ex) {
        const p = h("p", "mn-card-ex", card);
        const m = new RegExp(`\\b${w.word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\w*`, "i").exec(ex);
        if (m) {
          p.appendChild(document.createTextNode(ex.slice(0, m.index)));
          h("mark", "", p, m[0]);
          p.appendChild(document.createTextNode(ex.slice(m.index + m[0].length)));
        } else p.textContent = ex;
      }
      card.addEventListener("click", () => {
        void this.deps.speak(w.word, "system");
        this.onCard?.(w.id);
      });
    }
  }

  // ───── 任务 ─────

  private setProgress(): void {
    const o = this.opts!;
    const n = o.act.notes.length;
    this.progress.textContent = n === 0 ? "No notes this time" : this.index >= n ? `Notes ${n} / ${n}` : `Note ${this.index + 1} / ${n}`;
  }

  private setButtons(opts: { check: boolean; next: string | null; hint?: string }): void {
    this.checkBtn.hidden = !opts.check;
    this.nextBtn.hidden = opts.next === null;
    if (opts.next !== null) this.nextBtn.textContent = opts.next;
    this.hint.textContent = opts.hint ?? "";
  }

  private renderTask(): void {
    const o = this.opts!;
    this.clearTimers();
    this.runId++;
    this.task.textContent = "";
    this.checkFn = null;
    this.autoFn = null;
    this.taskDone = false;
    this.setProgress();
    const note = o.act.notes[this.index];
    if (!note) {
      const done = h("div", "mn-alldone", this.task);
      h("b", "", done, o.act.notes.length === 0 ? "Nothing to write down here." : "All notes written ✓");
      const sum = o.summary?.();
      if (sum) h("small", "mn-summary", done, sum);
      this.setButtons({ check: false, next: o.finishLabel });
      this.scheduleAuto();
      return;
    }
    const last = this.index === o.act.notes.length - 1;
    const title = h("div", "mn-task-title", this.task);
    h("span", "", title, note.kind === "translate" ? "Translate it" : note.kind === "fill" ? "Fill the gap" : "Plan your writing");
    h("small", "", title, `${this.index + 1} / ${o.act.notes.length}`);
    const finishTask = (wordIds: string[]): void => {
      this.taskDone = true;
      if (last) {
        const sum = o.summary?.();
        if (sum) h("p", "mn-summary", this.task, sum);
      }
      this.onTaskDone?.(this.index, note, wordIds);
      this.setButtons({ check: false, next: last ? o.finishLabel : "Next note ▸" });
      this.setProgress();
      this.scheduleAuto();
    };
    if (note.kind === "translate") this.renderTranslate(note, finishTask);
    else if (note.kind === "fill") this.renderFill(note, finishTask);
    else this.renderOutline(note, finishTask);
    this.scheduleAuto();
  }

  private onNextClick(): void {
    const o = this.opts;
    if (!o) return;
    if (this.index >= o.act.notes.length) {
      this.onFinished?.();
      return;
    }
    if (!this.taskDone) return;
    this.index++;
    this.renderTask();
  }

  private scheduleAuto(): void {
    if (this.autoMs <= 0) return;
    this.later(() => {
      const o = this.opts;
      if (!o) return;
      if (this.index < o.act.notes.length && !this.taskDone) {
        this.autoFn?.();
        return;
      }
      if (!this.nextBtn.hidden) this.nextBtn.click();
    }, this.autoMs);
  }

  private tileButton(parent: HTMLElement, tile: Tile): HTMLButtonElement {
    const b = h("button", `mn-tile${tile.keyword ? " kw" : ""}`, parent, tile.text);
    b.type = "button";
    b.dataset.id = tile.id;
    return b;
  }

  private renderTranslate(task: Extract<NoteTask, { kind: "translate" }>, finish: (wordIds: string[]) => void): void {
    const { tiles } = buildTranslateTiles(task, this.opts!.pool);
    const board = new TileBoard(tiles);
    h("p", "mn-zh", this.task, zhPrompt(task.zh));
    const line = h("div", "mn-line", this.task);
    const tray = h("div", "mn-tray", this.task);
    const trayBtns = new Map<string, HTMLButtonElement>();
    for (const t of tiles) {
      const b = this.tileButton(tray, t);
      trayBtns.set(t.id, b);
      b.addEventListener("click", () => {
        if (this.taskDone || !board.place(t.id)) return;
        render();
      });
    }
    const render = (): void => {
      line.textContent = "";
      for (const id of board.placedIds) {
        const tile = tiles.find((x) => x.id === id)!;
        const b = this.tileButton(line, tile);
        b.classList.add("placed");
        b.addEventListener("click", () => {
          if (this.taskDone) return;
          board.remove(id);
          render();
        });
      }
      for (const [id, b] of trayBtns) b.classList.toggle("used", board.placedIds.includes(id));
      line.classList.toggle("empty", board.empty);
      this.setButtons({ check: !this.taskDone, next: null, hint: board.empty ? "Tap the word blocks in order." : "" });
      this.checkBtn.disabled = board.empty;
    };
    this.checkFn = () => {
      if (this.taskDone || board.empty) return;
      if (checkTranslate(task, board.texts)) {
        line.classList.add("ok");
        void this.deps.speak(task.en, "system");
        finish([]);
        return;
      }
      line.classList.remove("shake");
      void line.offsetWidth;
      line.classList.add("shake");
      this.hint.textContent = "Not quite. Check the word order and the extra blocks.";
      this.onMistake?.();
    };
    this.autoFn = () => {
      if (this.taskDone) return;
      board.clear();
      // 按参考译文的顺序放：词块 id 是 t0、t1…（buildTranslateTiles 保证）
      for (const t of tiles.filter((x) => !x.decoy).sort((a, b) => Number(a.id.slice(1)) - Number(b.id.slice(1)))) board.place(t.id);
      render();
      this.checkFn?.();
    };
    render();
  }

  private renderFill(task: Extract<NoteTask, { kind: "fill" }>, finish: (wordIds: string[]) => void): void {
    const [before, after = ""] = task.line.split(BLANK);
    const line = h("p", "mn-fill", this.task);
    line.appendChild(document.createTextNode(before));
    const blot = h("span", "mn-blot", line);
    line.appendChild(document.createTextNode(after));
    const tray = h("div", "mn-tray", this.task);
    const tiles = fillTiles(task);
    const pick = (tile: Tile, btn: HTMLButtonElement): void => {
      if (this.taskDone || btn.disabled) return;
      if (checkFill(task, 0, tile.text)) {
        blot.textContent = tile.text;
        blot.classList.add("filled");
        for (const b of tray.querySelectorAll("button")) b.disabled = true;
        void this.deps.speak(task.line.replace(BLANK, task.answers[0]), "system");
        finish(task.wordIds);
        return;
      }
      btn.disabled = true;
      btn.classList.add("wrong");
      line.classList.remove("shake");
      void line.offsetWidth;
      line.classList.add("shake");
      this.onMistake?.();
    };
    const btns = new Map<string, HTMLButtonElement>();
    for (const t of tiles) {
      const b = this.tileButton(tray, t);
      btns.set(t.id, b);
      b.addEventListener("click", () => pick(t, b));
    }
    this.setButtons({ check: false, next: null, hint: "Which word fits?" });
    this.autoFn = () => {
      const t = tiles.find((x) => !x.decoy);
      const b = t && btns.get(t.id);
      if (t && b) pick(t, b);
    };
  }

  private renderOutline(task: Extract<NoteTask, { kind: "outline" }>, finish: (wordIds: string[]) => void): void {
    h("p", "mn-prompt", this.task, task.prompt);
    const list = h("ol", "mn-points", this.task);
    const items = task.points.map((point) => {
      const li = h("li", "", list);
      h("span", "mn-point", li, point);
      const blot = h("span", "mn-blot", li);
      return { li, blot };
    });
    const tray = h("div", "mn-tray", this.task);
    const chosen: string[] = [];
    let cur = 0;
    const showPoint = (): void => {
      tray.textContent = "";
      items.forEach((it, i) => it.li.classList.toggle("cur", i === cur));
      if (cur >= items.length) {
        this.setButtons({ check: false, next: null });
        return;
      }
      const choice = task.choices[cur];
      const tiles = outlineTiles(choice, `${task.prompt}:${cur}`);
      for (const t of tiles) {
        const b = this.tileButton(tray, t);
        b.addEventListener("click", () => pick(t, b));
      }
      this.setButtons({ check: false, next: null, hint: `Point ${cur + 1}: pick the key word.` });
      items[cur].li.scrollIntoView({ block: "nearest", behavior: "smooth" });
    };
    const pick = (tile: Tile, btn: HTMLButtonElement): void => {
      if (this.taskDone || btn.disabled || cur >= items.length) return;
      const choice = task.choices[cur];
      if (checkOutline(choice, tile.text)) {
        items[cur].blot.textContent = tile.text;
        items[cur].blot.classList.add("filled");
        const at = choice.answers.findIndex((a) => a.toLowerCase() === tile.text.toLowerCase());
        const id = choice.wordIds[at] ?? choice.wordIds[0];
        if (id) chosen.push(id);
        cur++;
        showPoint();
        if (cur >= items.length) {
          void this.deps.speak("Good plan. Now you can write it.", "system");
          finish(chosen);
        }
        return;
      }
      btn.disabled = true;
      btn.classList.add("wrong");
      items[cur].li.classList.remove("shake");
      void items[cur].li.offsetWidth;
      items[cur].li.classList.add("shake");
      this.onMistake?.();
    };
    this.autoFn = () => {
      if (this.taskDone) return;
      const btn = [...tray.querySelectorAll<HTMLButtonElement>("button")].find((b) => {
        const t = b.textContent ?? "";
        return task.choices[cur]?.answers.some((a) => a.toLowerCase() === t.toLowerCase());
      });
      btn?.click();
      if (!this.taskDone) this.scheduleAuto();
    };
    showPoint();
  }

  dispose(): void {
    this.clearTimers();
    window.clearTimeout(this.hideTimer);
    this.root.remove();
  }
}

// ═══════════════════════════ 手机干扰 ═══════════════════════════

/**
 * 主题机制（单元 1）：学习时手机偶尔亮起通知。点开会看到一条无关的消息、专注度下降；不理它，几秒后自己暗下去。
 */
export class PhoneNag {
  readonly root: HTMLElement;
  /** 本幕被点开的次数 */
  taps = 0;
  /** 通知亮起的次数（测试用） */
  shownCount = 0;

  private readonly banner: HTMLButtonElement;
  private readonly card: HTMLElement;
  private readonly timers = new Set<number>();
  private cursor = 0;
  private open = false;

  constructor(
    layer: HTMLElement,
    private readonly messages: ReadonlyArray<[string, string]>
  ) {
    this.root = h("div", "mem-phone", layer);
    this.root.hidden = true;
    this.banner = h("button", "mp-banner", this.root);
    this.banner.type = "button";
    this.banner.addEventListener("click", () => this.openMessage());
    this.card = h("div", "mp-card", this.root);
    this.card.hidden = true;
  }

  /** 开始一幕的学习：按时刻表亮起通知（相对现在的毫秒数） */
  begin(plan: readonly number[]): void {
    this.stop();
    this.taps = 0;
    for (const ms of plan) this.timers.add(window.setTimeout(() => this.ring(), ms));
  }

  stop(): void {
    for (const t of this.timers) window.clearTimeout(t);
    this.timers.clear();
    this.root.hidden = true;
    this.banner.classList.remove("on");
    this.card.hidden = true;
    this.open = false;
  }

  private ring(): void {
    if (this.open || this.messages.length === 0) return;
    const [from, text] = this.messages[this.cursor++ % this.messages.length];
    this.shownCount++;
    this.banner.textContent = "";
    h("b", "", this.banner, from);
    h("span", "", this.banner, text);
    this.root.hidden = false;
    this.banner.classList.add("on");
    // 不理它：几秒后自己暗下去
    const t = window.setTimeout(() => {
      if (!this.open) {
        this.banner.classList.remove("on");
        this.root.hidden = true;
      }
    }, 8000);
    this.timers.add(t);
  }

  private openMessage(): void {
    if (this.open) return;
    this.open = true;
    this.taps++;
    const [from, text] = this.messages[(this.cursor - 1 + this.messages.length) % this.messages.length] ?? ["", ""];
    this.banner.classList.remove("on");
    this.card.textContent = "";
    h("b", "mp-from", this.card, from);
    h("p", "mp-text", this.card, text);
    h("small", "mp-warn", this.card, "…you lost your place.");
    const close = h("button", "mp-close", this.card, "Back to the page");
    close.type = "button";
    close.addEventListener("click", () => {
      this.card.hidden = true;
      this.root.hidden = true;
      this.open = false;
    });
    this.card.hidden = false;
  }

  /** 测试开关：自动开的是 “不理它”，所以什么也不做 */
  dispose(): void {
    this.stop();
    this.root.remove();
  }
}
