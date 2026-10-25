import type { WordEntry } from "../../core/types";
import type { Rw3UnitContent } from "../../infra/data";

/** 一个单词的延伸知识：人工整理（public/data/knowledge）+ 规则推导（词缀、同族词、课文语境）。 */
export interface WordKnowledge {
  /** 词族（带释义的衍生词），先写人工整理的，再补同词表里的同根词 */
  family: string[];
  collocations: string[];
  synonyms: string[];
  antonyms: string[];
  etymology?: string;
  usage?: string;
  mnemonic?: string;
  /** 词缀拆解（规则推导） */
  parts: { text: string; note: string }[];
  /** 本单元课文里出现这个词的原句 */
  contexts: { sentence: string; section: string }[];
  /** 是否有人工整理的内容 */
  curated: boolean;
}

interface CompactEntry {
  f?: string[];
  c?: string[];
  s?: string[];
  a?: string[];
  e?: string;
  u?: string;
  m?: string;
}

const curatedCache = new Map<string, Promise<Record<string, CompactEntry>>>();

/** 读取某个单元的人工整理知识；没有文件时返回空对象（规则推导仍然可用）。 */
export function loadCuratedKnowledge(unitId: string): Promise<Record<string, CompactEntry>> {
  let pending = curatedCache.get(unitId);
  if (!pending) {
    pending = fetch(`${import.meta.env.BASE_URL}data/knowledge/rw3_${unitId}.json`)
      .then((res) => (res.ok ? (res.json() as Promise<Record<string, CompactEntry>>) : {}))
      .catch(() => ({}));
    curatedCache.set(unitId, pending);
  }
  return pending;
}

const PREFIXES: [string, string][] = [
  ["inter", "在……之间 / 相互"], ["under", "在……下面 / 不足"], ["over", "越过 / 过度"], ["trans", "穿过 / 转变"],
  ["super", "超过"], ["sub", "在下面"], ["pre", "在……之前"], ["fore", "预先"], ["post", "在……之后"],
  ["anti", "反对"], ["mis", "错误地"], ["dis", "否定 / 分开"], ["non", "非"], ["out", "超过 / 向外"],
  ["con", "共同 / 完全"], ["com", "共同 / 完全"], ["col", "共同"], ["co", "共同"], ["de", "向下 / 去除"],
  ["re", "再次 / 回"], ["un", "不"], ["im", "进入 / 不"], ["in", "进入 / 不"], ["ex", "向外"],
  ["en", "使……"], ["ad", "朝向"], ["ac", "朝向"], ["ap", "朝向"], ["af", "朝向"], ["as", "朝向"], ["be", "使……"],
  ["ob", "朝向 / 反对"], ["ir", "不"], ["il", "不"], ["ab", "离开"], ["per", "贯穿"], ["pro", "向前"],
];

const SUFFIXES: [string, string][] = [
  ["ization", "名词：……化"], ["ation", "名词：行为 / 结果"], ["ition", "名词：行为 / 结果"], ["ment", "名词：结果 / 手段"],
  ["ness", "名词：性质"], ["ity", "名词：性质"], ["ability", "名词：能力 / 性质"], ["ence", "名词：状态"], ["ance", "名词：状态"],
  ["ship", "名词：关系 / 状态"], ["ism", "名词：主义"], ["ist", "名词：……者"], ["ant", "名词 / 形容词：……的人 / 有……性质的"],
  ["ent", "名词 / 形容词：……的人 / 有……性质的"], ["er", "名词：……的人 / 物"], ["or", "名词：……的人 / 物"],
  ["ive", "形容词：有……倾向的"], ["ous", "形容词：充满……的"], ["ious", "形容词：充满……的"], ["ful", "形容词：充满……的"],
  ["less", "形容词：没有……的"], ["able", "形容词：能……的"], ["ible", "形容词：能……的"], ["ical", "形容词：……的"],
  ["al", "形容词：……的"], ["ic", "形容词：……的"], ["ly", "副词：……地"], ["ize", "动词：使……化"], ["ise", "动词：使……化"],
  ["ify", "动词：使……"], ["ate", "动词：使……"], ["en", "动词：使……"], ["ing", "-ing 形式"], ["ed", "-ed 形式"],
];

/** 规则推导：词缀拆解。只在剩下的词干不少于 3 个字母时才切，避免胡乱拆。 */
export function analyzeParts(word: string): { text: string; note: string }[] {
  const w = word.toLowerCase();
  if (w.includes(" ") || w.length < 6) return [];
  const parts: { text: string; note: string }[] = [];
  let stem = w;
  for (const [prefix, note] of PREFIXES) {
    if (stem.startsWith(prefix) && stem.length - prefix.length >= 4) {
      parts.push({ text: prefix, note: `前缀：${note}` });
      stem = stem.slice(prefix.length);
      break;
    }
  }
  const tail: { text: string; note: string }[] = [];
  for (let guard = 0; guard < 2; guard++) {
    const hit = [...SUFFIXES].sort((a, b) => b[0].length - a[0].length).find(([suffix]) => stem.endsWith(suffix) && stem.length - suffix.length >= 3);
    if (!hit) break;
    tail.unshift({ text: hit[0], note: `后缀：${hit[1]}` });
    stem = stem.slice(0, stem.length - hit[0].length);
  }
  if (parts.length === 0 && tail.length === 0) return [];
  return [...parts, { text: stem, note: "词干" }, ...tail];
}

const STEM_TAIL = /(ization|ation|ition|ments?|ness|ity|ings?|ives?|ious|ous|ful|less|able|ible|ically|ical|ally|ly|al|ic|ed|er|or|es|s|e|y)$/;
function stemOf(word: string): string {
  let s = word.toLowerCase().replace(/[^a-z]/g, "");
  for (let i = 0; i < 2; i++) {
    const next = s.replace(STEM_TAIL, "");
    if (next.length < 4) break;
    s = next;
  }
  return s;
}

/** 规则推导：同词表里的同根词 */
export function relatedWords(entry: WordEntry, all: Iterable<WordEntry>): string[] {
  const stem = stemOf(entry.word);
  if (stem.length < 4 || entry.word.includes(" ")) return [];
  const out: string[] = [];
  for (const other of all) {
    if (other.id === entry.id || other.word.includes(" ")) continue;
    const otherStem = stemOf(other.word);
    if (otherStem.length >= 4 && (otherStem === stem || otherStem.startsWith(stem) || stem.startsWith(otherStem))) {
      out.push(`${other.word} (${other.meaning.split(/[；;,，]/)[0]})`);
    }
  }
  return out.slice(0, 5);
}

function splitSentences(text: string): string[] {
  return text
    .replace(/\s+/g, " ")
    .split(/(?<=[.!?])["”')\]]*\s+(?=[A-Z"“‘'(])/)
    .map((s) => s.trim())
    .filter((s) => s.length > 12);
}

/** 规则推导：本单元三个段落里出现这个词（含变形）的原句 */
export function findContexts(entry: WordEntry, unit: Rw3UnitContent | undefined, limit = 3): { sentence: string; section: string }[] {
  if (!unit) return [];
  const w = entry.word.toLowerCase();
  const root = w.includes(" ") ? w : w.slice(0, Math.max(4, w.length - 2));
  const pattern = new RegExp(`\\b${root.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`, "i");
  const out: { sentence: string; section: string }[] = [];
  const labels: [keyof Rw3UnitContent["sections"], string][] = [["section_a", "Section A"], ["section_b", "Section B"], ["section_c", "Section C"]];
  for (const [key, label] of labels) {
    const passage = (unit.sections[key] as { passage?: string } | undefined)?.passage;
    if (!passage) continue;
    for (const sentence of splitSentences(passage)) {
      if (pattern.test(sentence) && sentence.length < 320) {
        out.push({ sentence, section: label });
        if (out.length >= limit) return out;
        break;
      }
    }
  }
  return out;
}

/** 汇总：人工整理 + 规则推导 */
export async function buildWordKnowledge(
  entry: WordEntry,
  allWords: Iterable<WordEntry>,
  unit: Rw3UnitContent | undefined
): Promise<WordKnowledge> {
  const unitId = entry.id.split("_")[1] ?? "";
  const curated = (await loadCuratedKnowledge(unitId))[entry.id.replace(/^rw3_/, "")];
  const derived = relatedWords(entry, allWords);
  const family = [...(curated?.f ?? [])];
  for (const item of derived) {
    const name = item.split(" ")[0];
    if (!family.some((f) => f.startsWith(name))) family.push(item);
  }
  return {
    family,
    collocations: curated?.c ?? [],
    synonyms: curated?.s ?? [],
    antonyms: curated?.a ?? [],
    etymology: curated?.e,
    usage: curated?.u,
    mnemonic: curated?.m,
    parts: analyzeParts(entry.word),
    contexts: findContexts(entry, unit),
    curated: Boolean(curated),
  };
}
