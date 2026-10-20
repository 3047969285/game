import { describe, expect, it } from "vitest";
import type { WordEntry } from "../../../core/types";
import { stageTargets } from "../stages";
import { splitSentences } from "../text";
import { loadUnits, loadVocab } from "../testData";
import { findWordToken, paperSlotIds, validateScript, type Beat, type MemoryScript } from "../types";
import { PROLOGUE_SCRIPT, U01A_SCRIPT, resolveMemoryScript } from "./index";

const units = loadUnits();
const unit1 = units[0];
const vocab = loadVocab();
const unitWords: WordEntry[] = (unit1.word_ids ?? []).map((id) => vocab.get(id)!).filter(Boolean);
const wordMap = new Map(unitWords.map((w) => [w.id, w]));
const passage = unit1.sections.section_a?.passage ?? "";
const sentences = splitSentences(passage);

const kinds = (script: MemoryScript): string[] => script.beats.map((b) => b.kind);
const of = <K extends Beat["kind"]>(script: MemoryScript, kind: K): Array<Extract<Beat, { kind: K }>> => script.beats.filter((b): b is Extract<Beat, { kind: K }> => b.kind === kind);

describe("手写脚本：开场 prologue", () => {
  it("通过引用校验（舞台部件、actor、选项）", () => {
    expect(validateScript(PROLOGUE_SCRIPT, { stageTargets: stageTargets(PROLOGUE_SCRIPT.stage) })).toEqual([]);
    expect(PROLOGUE_SCRIPT.stage).toBe("apartment2090");
  });

  it("按设计稿的节拍：雨与城市 → 六十四年 → 英语的声音 → 记忆回溯 → Ready / Not yet → 下潜", () => {
    const k = kinds(PROLOGUE_SCRIPT);
    expect(k[k.length - 1]).toBe("dive");
    const old = of(PROLOGUE_SCRIPT, "narrate").filter((n) => n.voice === "old");
    expect(old[0].text).toBe("It has been sixty-four years.");
    expect(old[1].text).toBe("I still remember the sound of English in that classroom.");
    const system = of(PROLOGUE_SCRIPT, "narrate").find((n) => n.voice === "system");
    expect(system?.text).toBe("Memory recall. Destination: 2026. University.");
    const choice = of(PROLOGUE_SCRIPT, "choice")[0];
    expect(choice.line).toBe("Are you ready?");
    expect(choice.options.map((o) => o.label)).toEqual(["Ready.", "Not yet."]);
    expect(choice.options.find((o) => o.label === "Not yet.")?.soft).toBe(true);
    expect(choice.viewer).toBe("old2090");
    // 开头先有几秒没有字幕的雨夜，再出现第一句话
    const firstNarrate = k.indexOf("narrate");
    expect(of(PROLOGUE_SCRIPT, "build").length).toBeGreaterThanOrEqual(3);
    expect(k.slice(0, firstNarrate).every((x) => x === "build" || x === "wait")).toBe(true);
  });

  it("公寓里的一切都会在开场里显形（不留永远看不见的部件）", () => {
    const built = new Set(of(PROLOGUE_SCRIPT, "build").flatMap((b) => b.targets));
    for (const target of stageTargets("apartment2090")) expect(built.has(target), target).toBe(true);
    expect(PROLOGUE_SCRIPT.actors.map((a) => a.id)).toEqual(["old2090"]);
  });

  it("所有字幕都有中文，句子完整", () => {
    for (const n of of(PROLOGUE_SCRIPT, "narrate")) {
      expect(n.zh, n.text).toBeTruthy();
      expect(n.text).toMatch(/^[A-Z].*[.?!]$/);
    }
  });
});

describe("手写脚本：u01a《周四的沉默》", () => {
  const ctx = { stageTargets: stageTargets(U01A_SCRIPT.stage), words: wordMap };

  it("通过引用校验", () => {
    expect(validateScript(U01A_SCRIPT, ctx)).toEqual([]);
    expect(U01A_SCRIPT.id).toBe("u01a");
    expect(U01A_SCRIPT.unitId).toBe("unit01");
    expect(U01A_SCRIPT.section).toBe("section_a");
    expect(U01A_SCRIPT.stage).toBe("clubRoom");
  });

  it("是单元 1 的记忆点 A；B、C 仍然由 autoScript 生成", () => {
    expect(resolveMemoryScript(unit1, unitWords, "section_a")).toBe(U01A_SCRIPT);
    expect(resolveMemoryScript(unit1, unitWords, "section_b").id).toBe("u01b");
    expect(resolveMemoryScript(unit1, unitWords, "section_c").id).toBe("u01c");
    expect(resolveMemoryScript(unit1, unitWords, "section_b").stage).toBe("emptyRoom");
  });

  it("节拍顺序：下潜(you) → 触碰 6 个 → 我在看我(watch，3 次断片) → 附身(2 次) → 旧笔记本 → 定格", () => {
    const k = kinds(U01A_SCRIPT);
    const iTouch = k.indexOf("touch");
    const iFirstGap = k.indexOf("gap");
    const iFirstChoice = k.indexOf("choice");
    const iPaper = k.indexOf("paper");
    expect(iTouch).toBeGreaterThan(0);
    expect(iFirstGap).toBeGreaterThan(iTouch);
    expect(iFirstChoice).toBeGreaterThan(k.lastIndexOf("gap"));
    expect(iPaper).toBeGreaterThan(k.lastIndexOf("choice"));
    expect(k[k.length - 1]).toBe("freeze");
    expect(of(U01A_SCRIPT, "gap")).toHaveLength(3);
    expect(of(U01A_SCRIPT, "choice")).toHaveLength(2);
    expect(of(U01A_SCRIPT, "touch")).toHaveLength(1);
    // 触碰之前全是第二人称
    for (const b of U01A_SCRIPT.beats.slice(0, iTouch)) if (b.kind === "narrate") expect(b.pov).toBe("you");
  });

  it("下潜阶段的系统旁白是自然的英语，触碰的是设计稿里的 6 个词", () => {
    const youLines = of(U01A_SCRIPT, "narrate").filter((n) => n.pov === "you");
    expect(youLines[0].text).toBe("You remember a Thursday.");
    expect(youLines[1].text).toBe("A room by the library courtyard.");
    for (const n of youLines) {
      expect(n.text).toMatch(/^[A-Z].*[.?!]$/);
      expect(n.zh, n.text).toBeTruthy();
    }
    const touch = of(U01A_SCRIPT, "touch")[0];
    const touchWords = touch.wordIds.map((id) => wordMap.get(id)!.word).sort();
    expect(touchWords).toEqual(["connection", "conversation", "device", "lonely", "message", "notification"]);
  });

  it("“我在看我”的旁白逐句取自文章原文，且顺序与原文一致", () => {
    const told: string[] = [];
    for (const b of U01A_SCRIPT.beats) {
      if (b.kind === "narrate" && b.pov === "watch" && b.voice === "system" && sentences.includes(b.text)) told.push(b.text);
      if (b.kind === "gap") told.push(b.sentence);
    }
    expect(told.length).toBeGreaterThanOrEqual(8);
    expect(told.length).toBeLessThanOrEqual(10);
    const idx = told.map((t) => sentences.indexOf(t));
    expect(idx.every((i) => i >= 0)).toBe(true);
    expect([...idx].sort((a, b) => a - b)).toEqual(idx);
  });

  it("断片：答案在句子里，候选（答案 + 干扰）都有物件，彼此靠得近，镜头才框得住", () => {
    const placed = new Map(U01A_SCRIPT.objects.map((o) => [o.wordId, o]));
    const touched = new Set(of(U01A_SCRIPT, "touch")[0].wordIds);
    for (const gap of of(U01A_SCRIPT, "gap")) {
      const answer = wordMap.get(gap.answerWordId)!;
      expect(findWordToken(gap.sentence, answer.word), answer.word).not.toBeNull();
      expect(passage).toContain(gap.sentence);
      expect(gap.decoyWordIds.length).toBeGreaterThanOrEqual(2);
      expect(touched.has(gap.answerWordId), `${answer.word} 不该已经在触碰阶段出现`).toBe(false);
      const ids = [gap.answerWordId, ...gap.decoyWordIds];
      expect(new Set(ids).size).toBe(ids.length);
      for (const id of ids) expect(placed.has(id), id).toBe(true);
      const xs = ids.map((id) => placed.get(id)!.position.x);
      expect(Math.max(...xs) - Math.min(...xs)).toBeLessThan(1.8);
      for (const id of gap.decoyWordIds) {
        // 干扰词不能出现在句子里，否则也能填进去
        expect(findWordToken(gap.sentence, wordMap.get(id)!.word), id).toBeNull();
      }
    }
    expect(of(U01A_SCRIPT, "gap").map((g) => wordMap.get(g.answerWordId)!.word)).toEqual(["experiment", "anxious", "carefully"]);
  });

  it("附身：Lin 的提问 conversation / purpose 都对，algorithm 不对；组织者的请求选 offline", () => {
    const [lin, rui] = of(U01A_SCRIPT, "choice");
    expect(lin.speaker).toBe("Lin");
    expect(lin.line).toBe("So… what do we actually talk about?");
    const right = lin.options.filter((o) => o.correct).map((o) => wordMap.get(o.wordId!)!.word);
    expect(right.sort()).toEqual(["conversation", "purpose"]);
    expect(wordMap.get(lin.options.find((o) => !o.correct)!.wordId!)!.word).toBe("algorithm");
    expect(new Set(lin.options.filter((o) => o.correct).map((o) => o.reply)).size).toBe(2);
    expect(rui.options.filter((o) => o.correct).map((o) => wordMap.get(o.wordId!)!.word)).toEqual(["offline"]);
    expect(rui.options.map((o) => wordMap.get(o.wordId!)!.word).sort()).toEqual(["cyber", "offline", "virtual"]);
    for (const c of [lin, rui]) {
      expect(c.zh).toBeTruthy();
      expect(U01A_SCRIPT.actors.some((a) => a.name === c.speaker)).toBe(true);
    }
  });

  it("旧笔记本：三行，空位是 device / conversation / connection / attention，干扰词至少 3 个", () => {
    const page = of(U01A_SCRIPT, "paper")[0].page;
    expect(page.lines).toHaveLength(3);
    expect(paperSlotIds(page).map((id) => wordMap.get(id)!.word)).toEqual(["device", "conversation", "connection", "attention"]);
    const plain = page.lines.map((l) => l.replace(/\{\{([^{}]+)\}\}/g, (_m, id: string) => wordMap.get(id)!.word));
    expect(plain).toEqual(["Week 1: we put every device in a basket.", "It felt strange to start a conversation without a screen.", "Real connection needs attention."]);
    expect(page.decoyWordIds.map((id) => wordMap.get(id)!.word).sort()).toEqual(["algorithm", "platform", "scroll"]);
  });

  it("定格：第一次笑起来的一刻，然后回到 2090 年老年的他的一句话", () => {
    const k = U01A_SCRIPT.beats;
    const laugh = k[k.length - 2];
    expect(laugh.kind === "narrate" && laugh.text).toBe("And then, for the first time, we all laughed together.");
    const freeze = of(U01A_SCRIPT, "freeze")[0];
    expect(freeze.epilogue?.text).toBe("We were so young. And we were learning to listen.");
    expect(freeze.epilogue?.voice).toBe("old");
    expect(U01A_SCRIPT.reward?.lightNode).toBe("unit01:section_a");
  });

  it("人物：年轻的我 + Lin、Mei、两位同学，都坐着，座位互不重叠；桌上的物件都在桌面范围内", () => {
    expect(U01A_SCRIPT.actors.map((a) => a.id).sort()).toEqual(["an", "lin", "me2026", "mei", "rui"]);
    const me = U01A_SCRIPT.actors.find((a) => a.id === "me2026")!;
    expect(me.look.outfit).toBe("hoodie");
    expect(me.look.backpack).toBeDefined();
    for (const a of U01A_SCRIPT.actors) expect(a.look.seated).toBe(true);
    // 每个人都有 phone（低头）与 listen（抬头）两个姿势
    for (const a of U01A_SCRIPT.actors) {
      const poses = new Set(U01A_SCRIPT.beats.flatMap((b) => (b.kind === "actor" && b.actorId === a.id && b.pose ? [b.pose] : [])));
      expect(poses.has("phone"), a.id).toBe(true);
      expect(poses.has("listen"), a.id).toBe(true);
    }
    for (const o of U01A_SCRIPT.objects) {
      if (o.position.y > 0.5) {
        expect(Math.abs(o.position.x)).toBeLessThan(2.3);
        expect(o.position.z).toBeGreaterThan(-0.7);
        expect(o.position.z).toBeLessThan(0.2);
      }
    }
  });

  it("舞台里的每一块都会在回忆里依次显形，没有被落下的部件", () => {
    const built = new Set(of(U01A_SCRIPT, "narrate").flatMap((n) => n.build ?? []));
    for (const g of of(U01A_SCRIPT, "gap")) for (const b of g.build ?? []) built.add(b);
    for (const target of stageTargets("clubRoom")) expect(built.has(target), target).toBe(true);
  });

  it("所有字幕和选项都有中文", () => {
    for (const n of of(U01A_SCRIPT, "narrate")) expect(n.zh, n.text).toBeTruthy();
    for (const g of of(U01A_SCRIPT, "gap")) expect(g.zh, g.sentence).toBeTruthy();
    for (const c of of(U01A_SCRIPT, "choice")) expect(c.zh, c.line).toBeTruthy();
  });
});
