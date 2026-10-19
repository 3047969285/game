/** 文本小工具：纯函数，node 下可测 */

/** 把文章段落拆成句子（句末标点后跟空白与大写 / 引号开头） */
export function splitSentences(passage: string): string[] {
  return passage
    .replace(/\s+/g, " ")
    .trim()
    .split(/(?<=[.!?])\s+(?=[A-Z"“‘'])/)
    .map((s) => s.trim())
    .filter((s) => s.length > 0);
}

const escapeRe = (s: string): string => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

/** 句子里是否含某词（允许常见屈折后缀） */
export function sentenceHasWord(sentence: string, word: string): boolean {
  return new RegExp(`\\b${escapeRe(word)}(?:s|es|ed|d|ing)?\\b`, "i").test(sentence);
}

/** 句子里与词原形完全一致的位置（纸页占位用：显示的手写字就是词原形） */
export function findExactWord(sentence: string, word: string): { index: number; length: number } | null {
  const m = new RegExp(`\\b${escapeRe(word)}\\b`, "i").exec(sentence);
  return m ? { index: m.index, length: m[0].length } : null;
}

/** 字符串 → 32 位种子 */
export function hashSeed(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

/** 可重复的伪随机数 */
export function seededRandom(seed: number): () => number {
  let s = seed >>> 0;
  return () => {
    s = (s + 0x6d2b79f5) >>> 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** 去掉词形上的标点后的小写词（字幕高亮比较用） */
export function normalizeToken(token: string): string {
  return token.toLowerCase().replace(/^[^a-z]+|[^a-z]+$/g, "");
}
