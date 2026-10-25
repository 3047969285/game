import type { WordEntry } from "../../core/types";
import { buildWordKnowledge, type WordKnowledge } from "../knowledge/wordKnowledge";
import type { Rw3UnitContent } from "../../infra/data";

export interface WordLabDeps {
  speak(text: string): void;
  allWords(): Iterable<WordEntry>;
  unitOf(entry: WordEntry): Rw3UnitContent | undefined;
  /** 学完一个词的探索（打开并看过）时回调 */
  onExplored?(entry: WordEntry): void;
}

const esc = (s: string): string => s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c] as string);

function shuffled<T>(list: T[]): T[] {
  const a = [...list];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** 单词实验室：一个词的全部相关知识 + 即时小测。 */
export class WordLab {
  private readonly el: HTMLElement;
  private token = 0;

  constructor(parent: HTMLElement, private readonly deps: WordLabDeps) {
    this.el = document.createElement("div");
    this.el.id = "word-lab";
    this.el.className = "word-lab hidden";
    this.el.setAttribute("role", "dialog");
    this.el.setAttribute("aria-label", "单词实验室");
    parent.appendChild(this.el);
    this.el.addEventListener("click", (e) => {
      const target = e.target as HTMLElement;
      if (target.closest("[data-lab-close]")) this.close();
    });
  }

  isOpen(): boolean {
    return !this.el.classList.contains("hidden");
  }

  close(): void {
    this.el.classList.add("hidden");
    this.token++;
  }

  dispose(): void {
    this.el.remove();
  }

  async open(entry: WordEntry): Promise<void> {
    const token = ++this.token;
    this.el.classList.remove("hidden");
    this.el.innerHTML = `<div class="wl-card"><div class="wl-head"><strong>${esc(entry.word)}</strong></div><div class="wl-loading">正在翻阅词典…</div></div>`;
    const knowledge = await buildWordKnowledge(entry, this.deps.allWords(), this.deps.unitOf(entry));
    if (token !== this.token) return;
    this.render(entry, knowledge);
    this.deps.onExplored?.(entry);
  }

  private section(title: string, icon: string, body: string): string {
    return body ? `<section class="wl-sec"><h4><span>${icon}</span>${title}</h4>${body}</section>` : "";
  }

  private chips(items: string[], cls = ""): string {
    return items.length ? `<div class="wl-chips">${items.map((i) => `<span class="wl-chip ${cls}">${esc(i)}</span>`).join("")}</div>` : "";
  }

  private render(entry: WordEntry, k: WordKnowledge): void {
    const phonetic = entry.phonetic ? `<span class="wl-phon">${esc(entry.phonetic)}</span>` : "";
    const parts = k.parts.length
      ? `<div class="wl-parts">${k.parts.map((p) => `<span class="wl-part"><b>${esc(p.text)}</b><small>${esc(p.note)}</small></span>`).join('<span class="wl-plus">+</span>')}</div>`
      : "";
    const meanings = entry.meanings?.length ? entry.meanings : [entry.meaning];
    const example = entry.example
      ? `<div class="wl-example"><span>${esc(entry.example)}</span>${entry.example_zh ? `<em>${esc(entry.example_zh)}</em>` : ""}<button class="wl-say" data-say="${esc(entry.example)}" title="朗读例句">🔊</button></div>`
      : "";
    const contexts = k.contexts
      .map((c) => `<div class="wl-example ctx"><small>${esc(c.section)}</small><span>${esc(c.sentence)}</span><button class="wl-say" data-say="${esc(c.sentence)}" title="朗读">🔊</button></div>`)
      .join("");
    const usage = k.usage ? `<p class="wl-text">${esc(k.usage)}</p>` : "";
    const etymology = [k.etymology ? `<p class="wl-text">${esc(k.etymology)}</p>` : "", k.mnemonic ? `<p class="wl-text hook">💡 ${esc(k.mnemonic)}</p>` : ""].join("");
    const syn = [k.synonyms.length ? `<div class="wl-row"><label>近义</label>${this.chips(k.synonyms)}</div>` : "", k.antonyms.length ? `<div class="wl-row"><label>反义</label>${this.chips(k.antonyms, "ant")}</div>` : ""].join("");
    const note = k.curated ? "" : `<p class="wl-note">这个词的深度词条还在整理中，下面是根据词形和课文自动整理的内容。</p>`;
    this.el.innerHTML = `
      <div class="wl-card">
        <button class="wl-close" data-lab-close aria-label="关闭">✕</button>
        <div class="wl-head">
          <strong>${esc(entry.word)}</strong>${phonetic}
          <button class="wl-say big" data-say="${esc(entry.word)}" title="朗读">🔊</button>
        </div>
        <div class="wl-meaning"><span class="wl-pos">${esc(entry.pos)}</span> ${meanings.map(esc).join("；")}</div>
        <div class="wl-scroll">
          ${note}
          ${this.section("词形拆解", "🧩", parts)}
          ${this.section("例句", "💬", example)}
          ${this.section("课文里的它", "📖", contexts)}
          ${this.section("词族", "🌳", this.chips(k.family))}
          ${this.section("常见搭配", "🔗", this.chips(k.collocations, "col"))}
          ${this.section("近义 · 反义", "⚖️", syn)}
          ${this.section("词源与记忆", "🏺", etymology)}
          ${this.section("用法提醒", "⚠️", usage)}
          <section class="wl-sec"><h4><span>🎯</span>即时小测</h4><div class="wl-quiz" id="wl-quiz"></div></section>
        </div>
      </div>`;
    this.el.querySelectorAll<HTMLButtonElement>("[data-say]").forEach((b) =>
      b.addEventListener("click", () => this.deps.speak(b.dataset.say ?? ""))
    );
    this.startQuiz(entry, k);
  }

  /** 两种小测随机抽一种：搭配填空（有搭配时）/ 选释义 */
  private startQuiz(entry: WordEntry, k: WordKnowledge): void {
    const box = this.el.querySelector<HTMLElement>("#wl-quiz");
    if (!box) return;
    const pool = [...this.deps.allWords()].filter((w) => w.id !== entry.id && !w.word.includes(" "));
    const others = shuffled(pool).slice(0, 3);
    const useCloze = Boolean(entry.example) && new RegExp(`\\b${entry.word.slice(0, Math.max(4, entry.word.length - 2))}\\w*`, "i").test(entry.example ?? "") && Math.random() < 0.6;
    let prompt: string;
    let options: { label: string; correct: boolean }[];
    if (useCloze) {
      const re = new RegExp(`\\b${entry.word.slice(0, Math.max(4, entry.word.length - 2))}\\w*`, "i");
      const sentence = (entry.example ?? "").replace(re, "_____");
      const hit = (entry.example ?? "").match(re)?.[0] ?? entry.word;
      prompt = `把词填进空格：<em>${esc(sentence)}</em>`;
      options = shuffled([{ label: hit, correct: true }, ...others.map((o) => ({ label: o.word, correct: false }))]);
    } else {
      prompt = `<em>${esc(entry.word)}</em> 的意思是？`;
      options = shuffled([{ label: entry.meaning, correct: true }, ...others.map((o) => ({ label: o.meaning, correct: false }))]);
    }
    box.innerHTML = `<p class="wl-q">${prompt}</p><div class="wl-opts">${options.map((o, i) => `<button data-i="${i}" class="wl-opt">${esc(o.label)}</button>`).join("")}</div><p class="wl-fb" aria-live="polite"></p>`;
    const feedback = box.querySelector<HTMLElement>(".wl-fb");
    let answered = false;
    box.querySelectorAll<HTMLButtonElement>(".wl-opt").forEach((btn) =>
      btn.addEventListener("click", () => {
        if (answered) return;
        const opt = options[Number(btn.dataset.i)];
        if (opt.correct) {
          answered = true;
          btn.classList.add("ok");
          if (feedback) feedback.textContent = k.collocations[0] ? `答对了 ✓  记住搭配：${k.collocations[0]}` : "答对了 ✓";
          this.deps.speak(entry.word);
        } else {
          btn.classList.add("bad");
          btn.disabled = true;
          if (feedback) feedback.textContent = "再想想，还有机会 ↻";
        }
      })
    );
  }
}
