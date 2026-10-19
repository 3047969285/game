import { PAPER_SLOT_RE, type PaperPage } from "./types";
import { seededRandom, hashSeed } from "./text";

/**
 * 二维旧笔记本：纸张质感的全屏 DOM 层（背景是被 CSS 虚化的三维记忆）。
 * 被时间晕开的位置显示墨渍，下方一排词块（正确词 + 干扰词）：点选词块再点墨渍，或直接把词块拖到墨渍上。
 * 填对 → 墨渍变成手写字；填错 → 纸面轻抖。判定逻辑是纯函数 checkPaperFill，可在 node 下测试。
 */

export interface PaperSlot {
  /** 全页按阅读顺序的序号 */
  index: number;
  line: number;
  wordId: string;
}

export type PaperSegment = { type: "text"; text: string } | { type: "slot"; slot: number; wordId: string };

/** 页面里的全部空位（阅读顺序） */
export function paperSlots(page: PaperPage): PaperSlot[] {
  const slots: PaperSlot[] = [];
  page.lines.forEach((line, lineIndex) => {
    for (const m of line.matchAll(PAPER_SLOT_RE)) slots.push({ index: slots.length, line: lineIndex, wordId: m[1] });
  });
  return slots;
}

/** 把一行拆成文字与空位片段 */
export function parsePaperLine(page: PaperPage, lineIndex: number): PaperSegment[] {
  const before = paperSlots({ ...page, lines: page.lines.slice(0, lineIndex) }).length;
  const segments: PaperSegment[] = [];
  const line = page.lines[lineIndex] ?? "";
  let cursor = 0;
  let n = 0;
  for (const m of line.matchAll(PAPER_SLOT_RE)) {
    const start = m.index ?? 0;
    if (start > cursor) segments.push({ type: "text", text: line.slice(cursor, start) });
    segments.push({ type: "slot", slot: before + n, wordId: m[1] });
    n++;
    cursor = start + m[0].length;
  }
  if (cursor < line.length) segments.push({ type: "text", text: line.slice(cursor) });
  return segments;
}

export interface PaperFillResult {
  /** 全部空位都填对 */
  complete: boolean;
  correct: number[];
  wrong: number[];
  empty: number[];
}

/**
 * 判定：fills 是 “空位序号 → 玩家放进去的词 id”。
 * 空位序号是整页按阅读顺序的序号（paperSlots 的 index）。
 */
export function checkPaperFill(page: PaperPage, fills: Readonly<Record<number, string | undefined>>): PaperFillResult {
  const result: PaperFillResult = { complete: false, correct: [], wrong: [], empty: [] };
  for (const slot of paperSlots(page)) {
    const given = fills[slot.index];
    if (given === undefined || given === "") result.empty.push(slot.index);
    else if (given === slot.wordId) result.correct.push(slot.index);
    else result.wrong.push(slot.index);
  }
  const total = result.correct.length + result.wrong.length + result.empty.length;
  result.complete = total > 0 && result.correct.length === total;
  return result;
}

export interface PaperWordInfo {
  word: string;
  meaning?: string;
}

let fontInjected = false;
function ensureHandwritingFont(): void {
  if (fontInjected || typeof document === "undefined") return;
  fontInjected = true;
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = "https://fonts.googleapis.com/css2?family=Caveat:wght@500;700&family=Patrick+Hand&display=swap";
  document.head.appendChild(link);
}

export class PaperLayer {
  private readonly root: HTMLElement;
  private current: { resolve: (ok: boolean) => void } | null = null;
  private finishFn: ((ok: boolean) => void) | null = null;
  private cleanup: Array<() => void> = [];

  constructor(
    container: HTMLElement,
    private readonly resolveWord: (wordId: string) => PaperWordInfo | undefined,
    lowQuality = false
  ) {
    this.root = document.createElement("div");
    this.root.className = `mem-paper${lowQuality ? " mem-paper-flat" : ""}`;
    this.root.hidden = true;
    container.appendChild(this.root);
    ensureHandwritingFont();
  }

  get visible(): boolean {
    return !this.root.hidden;
  }

  /** 展示一页笔记。全部填对 resolve(true)；被 hide() 打断 resolve(false) */
  show(page: PaperPage): Promise<boolean> {
    this.hide();
    const slots = paperSlots(page);
    const fills: Record<number, string> = {};
    let selected: string | null = null;
    const rand = seededRandom(hashSeed(page.title + slots.length));

    this.root.hidden = false;
    this.root.innerHTML = "";
    this.root.classList.remove("mem-paper-in");
    const sheet = document.createElement("div");
    sheet.className = `mem-sheet mem-sheet-${page.style}`;
    const title = document.createElement("div");
    title.className = "mem-sheet-title";
    title.textContent = page.title;
    sheet.appendChild(title);

    const body = document.createElement("div");
    body.className = "mem-sheet-body";
    page.lines.forEach((_, li) => {
      const row = document.createElement("p");
      row.className = "mem-sheet-line";
      for (const seg of parsePaperLine(page, li)) {
        if (seg.type === "text") {
          row.appendChild(document.createTextNode(seg.text));
        } else {
          const blot = document.createElement("button");
          blot.type = "button";
          blot.className = "mem-ink";
          blot.dataset.slot = String(seg.slot);
          blot.setAttribute("aria-label", "被晕开的词，选一个词块填进来");
          const info = this.resolveWord(seg.wordId);
          blot.style.minWidth = `${Math.max(4.2, (info?.word.length ?? 6) * 0.62)}em`;
          row.appendChild(blot);
        }
      }
      body.appendChild(row);
    });
    sheet.appendChild(body);

    const hint = document.createElement("div");
    hint.className = "mem-sheet-hint";
    hint.textContent = "笔记被晕开了 · 选词补全";
    sheet.appendChild(hint);

    const tray = document.createElement("div");
    tray.className = "mem-chips";
    const wordIds = [...new Set([...slots.map((s) => s.wordId), ...page.decoyWordIds])];
    for (let i = wordIds.length - 1; i > 0; i--) {
      const j = Math.floor(rand() * (i + 1));
      [wordIds[i], wordIds[j]] = [wordIds[j], wordIds[i]];
    }
    const chipEls = new Map<string, HTMLButtonElement>();
    for (const id of wordIds) {
      const info = this.resolveWord(id);
      const chip = document.createElement("button");
      chip.type = "button";
      chip.className = "mem-chip";
      chip.dataset.word = id;
      chip.textContent = info?.word ?? id;
      if (info?.meaning) chip.title = info.meaning;
      tray.appendChild(chip);
      chipEls.set(id, chip);
    }
    sheet.appendChild(tray);
    this.root.appendChild(sheet);
    requestAnimationFrame(() => this.root.classList.add("mem-paper-in"));

    return new Promise<boolean>((resolve) => {
      this.current = { resolve };
      const blots = [...body.querySelectorAll<HTMLButtonElement>(".mem-ink")];
      const select = (id: string | null): void => {
        selected = id;
        chipEls.forEach((el, key) => el.classList.toggle("selected", key === id));
      };

      const tryFill = (slotIndex: number, wordId: string): void => {
        if (fills[slotIndex] !== undefined) return;
        const trial = { ...fills, [slotIndex]: wordId };
        const verdict = checkPaperFill(page, trial);
        if (verdict.wrong.includes(slotIndex)) {
          sheet.classList.remove("shake");
          void sheet.offsetWidth; // 重启动画
          sheet.classList.add("shake");
          select(null);
          return;
        }
        fills[slotIndex] = wordId;
        const blot = blots[slotIndex];
        const info = this.resolveWord(wordId);
        blot.classList.add("filled");
        blot.textContent = info?.word ?? wordId;
        blot.disabled = true;
        chipEls.get(wordId)?.classList.add("used");
        const chip = chipEls.get(wordId);
        if (chip) chip.disabled = true;
        select(null);
        if (verdict.complete) {
          sheet.classList.add("done");
          const t = window.setTimeout(() => finish(true), 1100);
          this.cleanup.push(() => window.clearTimeout(t));
        }
      };

      // 点选词块 → 点墨渍
      chipEls.forEach((chip, id) => {
        chip.addEventListener("click", () => {
          if (chip.dataset.dragged === "1") {
            chip.dataset.dragged = "0";
            return;
          }
          select(selected === id ? null : id);
        });
        // 拖到墨渍上
        chip.addEventListener("pointerdown", (e) => {
          if (chip.disabled) return;
          const startX = e.clientX;
          const startY = e.clientY;
          let ghost: HTMLElement | null = null;
          const move = (ev: PointerEvent): void => {
            if (!ghost && Math.hypot(ev.clientX - startX, ev.clientY - startY) > 8) {
              ghost = chip.cloneNode(true) as HTMLElement;
              ghost.classList.add("mem-chip-ghost");
              document.body.appendChild(ghost);
              chip.dataset.dragged = "1";
            }
            if (ghost) {
              ghost.style.transform = `translate(${ev.clientX}px, ${ev.clientY}px) translate(-50%, -50%)`;
            }
          };
          const up = (ev: PointerEvent): void => {
            window.removeEventListener("pointermove", move);
            window.removeEventListener("pointerup", up);
            window.removeEventListener("pointercancel", up);
            if (ghost) {
              ghost.remove();
              const hit = document.elementFromPoint(ev.clientX, ev.clientY)?.closest<HTMLButtonElement>(".mem-ink");
              if (hit && hit.dataset.slot !== undefined) tryFill(Number(hit.dataset.slot), id);
              // click 事件会在 pointerup 之后触发，标记在那里被清掉
              window.setTimeout(() => (chip.dataset.dragged = "0"), 0);
            }
          };
          window.addEventListener("pointermove", move);
          window.addEventListener("pointerup", up);
          window.addEventListener("pointercancel", up);
          this.cleanup.push(() => {
            window.removeEventListener("pointermove", move);
            window.removeEventListener("pointerup", up);
            window.removeEventListener("pointercancel", up);
            ghost?.remove();
          });
        });
      });
      blots.forEach((blot, i) => {
        blot.addEventListener("click", () => {
          if (selected) tryFill(i, selected);
        });
      });

      const finish = (ok: boolean): void => {
        if (!this.current) return;
        const cur = this.current;
        this.current = null;
        this.root.classList.remove("mem-paper-in");
        const t = window.setTimeout(() => {
          this.root.hidden = true;
          this.root.innerHTML = "";
        }, 450);
        this.cleanup.push(() => window.clearTimeout(t));
        cur.resolve(ok);
      };
      this.finishFn = finish;
    });
  }

  /** 关闭当前页（未完成则 resolve(false)） */
  hide(): void {
    if (this.current && this.finishFn) this.finishFn(false);
    for (const fn of this.cleanup.splice(0)) fn();
    if (!this.current) {
      this.root.hidden = true;
      this.root.innerHTML = "";
      this.root.classList.remove("mem-paper-in");
    }
  }

  dispose(): void {
    this.hide();
    for (const fn of this.cleanup.splice(0)) fn();
    this.root.remove();
  }
}
