import { describe, expect, it } from "vitest";
import type { WordEntry } from "../../../core/types";
import { stageTargets } from "../stages";
import { splitSentences } from "../text";
import { loadUnits, loadVocab } from "../testData";
import { findWordToken, validateScript, type Beat, type MemoryScript } from "../types";
import { PROLOGUE_SCRIPT, buildU01aScript, resolveMemoryScript } from "./index";

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
  const U01A_SCRIPT = buildU01aScript(unit1, unitWords);
  const ctx = { stageTargets: stageTargets(U01A_SCRIPT.stage), words: wordMap };
  const acts = U01A_SCRIPT.acts!;

  it("通过引用校验", () => {
    expect(validateScript(U01A_SCRIPT, ctx)).toEqual([]);
    expect(U01A_SCRIPT.id).toBe("u01a");
    expect(U01A_SCRIPT.unitId).toBe("unit01");
    expect(U01A_SCRIPT.section).toBe("section_a");
    expect(U01A_SCRIPT.stage).toBe("clubRoom");
    expect(U01A_SCRIPT.organizer).toBe("rui");
    expect(U01A_SCRIPT.student).toBe("me2026");
  });

  it("是单元 1 的记忆点 A；B、C 仍然由 autoScript 生成", () => {
    expect(resolveMemoryScript(unit1, unitWords, "section_a").acts).toHaveLength(acts.length);
    expect(resolveMemoryScript(unit1, unitWords, "section_a").beats.filter((b) => b.kind === "acts")).toHaveLength(1);
    expect(resolveMemoryScript(unit1, unitWords, "section_b").id).toBe("u01b");
    expect(resolveMemoryScript(unit1, unitWords, "section_c").id).toBe("u01c");
    expect(resolveMemoryScript(unit1, unitWords, "section_b").stage).toBe("emptyRoom");
  });

  it("节拍顺序：下潜(you) → 触碰 6 个 → 同学入场 → 幕时间线 → 定格；触碰之前全是第二人称", () => {
    const k = kinds(U01A_SCRIPT);
    const iTouch = k.indexOf("touch");
    const iActs = k.indexOf("acts");
    expect(iTouch).toBeGreaterThan(0);
    expect(iActs).toBeGreaterThan(iTouch);
    expect(k.filter((x) => x === "acts")).toHaveLength(1);
    expect(k[k.length - 1]).toBe("freeze");
    // 幕里自己播课文，节拍里不再有断片 / 附身 / 旧笔记本
    for (const bad of ["gap", "choice", "paper"]) expect(k).not.toContain(bad);
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

  it("课文 20 句全文都在幕里，顺序不变：5 幕 × 4 句", () => {
    expect(sentences).toHaveLength(20);
    expect(acts.map((a) => a.sentences.length)).toEqual([4, 4, 4, 4, 4]);
    expect(acts.flatMap((a) => a.sentences)).toEqual(sentences);
  });

  it("每一句都有中文字幕和机位；每幕有 1 次断片：答案在句子里、干扰词不在句子里、候选物件都摆好了且靠得近", () => {
    const placed = new Map(U01A_SCRIPT.objects.map((o) => [o.wordId, o]));
    for (const act of acts) {
      expect(act.cues).toHaveLength(act.sentences.length);
      act.cues!.forEach((c, i) => {
        expect(c.zh, act.sentences[i]).toBeTruthy();
        expect(c.camera).toBeDefined();
      });
      const gap = act.gap!;
      expect(gap, `act#${act.index} 没有断片`).toBeDefined();
      const sentence = act.sentences[gap.sentence];
      const answer = wordMap.get(gap.answerWordId)!;
      expect(findWordToken(sentence, answer.word), answer.word).not.toBeNull();
      expect(gap.decoyWordIds.length).toBeGreaterThanOrEqual(2);
      const ids = [gap.answerWordId, ...gap.decoyWordIds];
      expect(new Set(ids).size).toBe(ids.length);
      for (const id of ids) expect(placed.has(id), id).toBe(true);
      for (const id of gap.decoyWordIds) expect(findWordToken(sentence, wordMap.get(id)!.word), id).toBeNull();
      const xs = ids.map((id) => placed.get(id)!.position.x);
      expect(Math.max(...xs) - Math.min(...xs)).toBeLessThan(2.4);
    }
    expect(acts.map((a) => wordMap.get(a.gap!.answerWordId)!.word)).toEqual(["connection", "experiment", "carefully", "purpose", "communication"]);
  });

  it("理解题（section_a 的 4 道校准题 + 3 道阅读题）、4 句翻译、写作提纲都分配进了幕里", () => {
    expect(acts.flatMap((a) => a.questions)).toHaveLength(7);
    const notes = acts.flatMap((a) => a.notes);
    expect(notes.filter((n) => n.kind === "translate")).toHaveLength(4);
    expect(notes.filter((n) => n.kind === "outline")).toHaveLength(1);
    expect(acts[acts.length - 1].notes.some((n) => n.kind === "outline")).toBe(true);
    for (const a of acts) expect(a.notes.some((n) => n.kind === "fill")).toBe(true);
  });

  it("附身对话：Lin 的提问 conversation / purpose 都对，algorithm 不对；Rui 的请求选 offline", () => {
    const lin = acts[0].dialog!;
    const rui = acts[1].dialog!;
    expect(lin.speaker).toBe("Lin");
    expect(lin.line).toBe("So… what do we actually talk about?");
    expect(lin.options.filter((o) => o.correct).map((o) => wordMap.get(o.wordId!)!.word).sort()).toEqual(["conversation", "purpose"]);
    expect(wordMap.get(lin.options.find((o) => !o.correct)!.wordId!)!.word).toBe("algorithm");
    expect(new Set(lin.options.filter((o) => o.correct).map((o) => o.reply)).size).toBe(2);
    expect(rui.speaker).toBe("Rui");
    expect(rui.options.filter((o) => o.correct).map((o) => wordMap.get(o.wordId!)!.word)).toEqual(["offline"]);
    expect(rui.options.map((o) => wordMap.get(o.wordId!)!.word).sort()).toEqual(["cyber", "offline", "virtual"]);
    for (const d of [lin, rui]) {
      expect(d.zh).toBeTruthy();
      expect(U01A_SCRIPT.actors.some((a) => a.name === d.speaker)).toBe(true);
    }
  });

  it("定格：第一次笑起来的一刻，然后回到 2090 年老年的他的一句话；分心时换一句", () => {
    const k = U01A_SCRIPT.beats;
    const laugh = k[k.length - 2];
    expect(laugh.kind === "narrate" && laugh.text).toBe("And then, for the first time, we all laughed together.");
    const freeze = of(U01A_SCRIPT, "freeze")[0];
    expect(freeze.epilogue?.text).toBe("We were so young. And we were learning to listen.");
    expect(freeze.epilogue?.voice).toBe("old");
    expect(freeze.epilogueDistracted?.text).toBeTruthy();
    expect(U01A_SCRIPT.reward?.lightNode).toBe("unit01:section_a");
  });

  it("单元 1 的主题机制：学习时手机偶尔亮起，有一组无关的消息", () => {
    expect(U01A_SCRIPT.distraction?.kind).toBe("phone");
    expect(U01A_SCRIPT.distraction!.messages.length).toBeGreaterThanOrEqual(3);
  });

  it("人物：年轻的我 + Lin、Mei、两位同学，都坐着，每个人都有 phone（低头）与 listen（抬头）两个姿势；桌上的物件在桌面范围内", () => {
    expect(U01A_SCRIPT.actors.map((a) => a.id).sort()).toEqual(["an", "lin", "me2026", "mei", "rui"]);
    const me = U01A_SCRIPT.actors.find((a) => a.id === "me2026")!;
    expect(me.look.outfit).toBe("hoodie");
    expect(me.look.backpack).toBeDefined();
    for (const a of U01A_SCRIPT.actors) expect(a.look.seated).toBe(true);
    const poseBeats = [...U01A_SCRIPT.beats, ...acts.flatMap((a) => a.actorCues ?? [])];
    for (const a of U01A_SCRIPT.actors) {
      const poses = new Set(poseBeats.flatMap((b) => (b.kind === "actor" && b.actorId === a.id && b.pose ? [b.pose] : [])));
      expect(poses.has("phone"), a.id).toBe(true);
      expect(poses.has("listen"), a.id).toBe(true);
    }
    for (const o of U01A_SCRIPT.objects) {
      if (o.position.y > 0.5 && o.position.y < 0.9) {
        expect(Math.abs(o.position.x)).toBeLessThan(2.3);
        expect(o.position.z).toBeGreaterThan(-0.7);
        expect(o.position.z).toBeLessThan(0.2);
      }
      if (o.position.y >= 0.9) {
        // 悬空的词在桌子后沿上空
        expect(Math.abs(o.position.x)).toBeLessThan(2.3);
        expect(o.position.z).toBeGreaterThan(-1.2);
        expect(o.position.z).toBeLessThan(0.2);
      }
    }
  });

  it("舞台里的每一块都会在回忆里依次显形（下潜 / 入场 / 各幕的逐句提示），没有被落下的部件", () => {
    const built = new Set(of(U01A_SCRIPT, "narrate").flatMap((n) => n.build ?? []));
    for (const act of acts) {
      for (const b of act.build ?? []) built.add(b);
      for (const c of act.cues ?? []) for (const b of c.build ?? []) built.add(b);
    }
    for (const target of stageTargets("clubRoom")) expect(built.has(target), target).toBe(true);
  });

  it("所有字幕和选项都有中文", () => {
    for (const n of of(U01A_SCRIPT, "narrate")) expect(n.zh, n.text).toBeTruthy();
    for (const a of acts) {
      for (const c of a.cues ?? []) expect(c.zh).toBeTruthy();
      if (a.dialog) expect(a.dialog.zh).toBeTruthy();
    }
  });

  it("导入教材原文（passageOverride）：舞台不变，句子换成原文，中文字幕不再适用，断片只在确有答案词时保留", () => {
    const own = Array.from({ length: 12 }, (_, i) => `Sentence ${i} of my own book mentions a connection and nothing else here.`).join(" ");
    const script = buildU01aScript(unit1, unitWords, own);
    expect(script.stage).toBe("clubRoom");
    expect(script.acts!.flatMap((a) => a.sentences)).toEqual(splitSentences(own));
    for (const a of script.acts!) for (const c of a.cues ?? []) expect(c.zh).toBeUndefined();
    const gapActs = script.acts!.filter((a) => a.gap);
    for (const a of gapActs) expect(findWordToken(a.sentences[a.gap!.sentence], wordMap.get(a.gap!.answerWordId)!.word)).not.toBeNull();
    expect(validateScript(script, ctx)).toEqual([]);
  });
});
