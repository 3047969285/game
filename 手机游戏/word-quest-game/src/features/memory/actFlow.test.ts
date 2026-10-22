import { describe, expect, it } from "vitest";
import { actSeen, averageFocus, buildGlossIndex, flowReduce, focusScore, initFlow, initLearnState, nextLearnStep, notesEmpty, planDistractions, relatedSentences, type LearnState } from "./actFlow";
import { buildActs } from "./acts";
import { loadUnits, loadVocab } from "./testData";

const act = { wordIds: ["w1", "w2"], questions: [{ question: "q1", options: ["a", "b"], answer: 0, explanation: "" }, { question: "q2", options: ["a", "b"], answer: 1, explanation: "" }], notes: [{ kind: "fill" as const, line: "x ____", answers: ["y"], wordIds: [], decoys: ["z"] }, { kind: "fill" as const, line: "x ____", answers: ["y"], wordIds: [], decoys: ["z"] }] };

describe("第一人称学习步骤 nextLearnStep", () => {
  it("顺序：预习 → 跟读 → 提问 → 笔记 → 完成", () => {
    let s = initLearnState(act);
    expect(s.step).toBe("preview");
    s = nextLearnStep(s, { type: "tapWord", wordId: "w1" });
    s = nextLearnStep(s, { type: "tapWord", wordId: "w2" });
    s = nextLearnStep(s, { type: "advance" });
    expect(s.step).toBe("read");
    s = nextLearnStep(s, { type: "readFinished" });
    s = nextLearnStep(s, { type: "advance" });
    expect(s.step).toBe("ask");
    s = nextLearnStep(s, { type: "answer", correct: true });
    expect(s).toMatchObject({ step: "ask", questionIndex: 1 });
    s = nextLearnStep(s, { type: "answer", correct: true });
    expect(s.step).toBe("notes");
    s = nextLearnStep(s, { type: "noteDone" });
    expect(s.step).toBe("notes");
    s = nextLearnStep(s, { type: "noteDone" });
    expect(s.step).toBe("done");
  });

  it("未完成不能跳：生词没点完不能 advance，没读完不能 advance，ask / notes 不接受 advance", () => {
    let s = initLearnState(act);
    s = nextLearnStep(s, { type: "tapWord", wordId: "w1" });
    expect(nextLearnStep(s, { type: "advance" }).step).toBe("preview");
    expect(nextLearnStep(s, { type: "readFinished" })).toBe(s);
    s = nextLearnStep(nextLearnStep(s, { type: "tapWord", wordId: "w2" }), { type: "advance" });
    expect(nextLearnStep(s, { type: "advance" }).step).toBe("read");
    s = nextLearnStep(nextLearnStep(s, { type: "readFinished" }), { type: "advance" });
    expect(nextLearnStep(s, { type: "advance" }).step).toBe("ask");
    expect(nextLearnStep(s, { type: "noteDone" }).step).toBe("ask");
  });

  it("重复点同一个生词、点不属于本幕的词，不增加进度", () => {
    let s = initLearnState(act);
    s = nextLearnStep(s, { type: "tapWord", wordId: "w1" });
    expect(nextLearnStep(s, { type: "tapWord", wordId: "w1" })).toBe(s);
    expect(nextLearnStep(s, { type: "tapWord", wordId: "zzz" })).toBe(s);
  });

  it("选错可以重试：留在原题并记次数，答对后清零", () => {
    let s: LearnState = { ...initLearnState(act), step: "ask" };
    s = nextLearnStep(s, { type: "answer", correct: false });
    s = nextLearnStep(s, { type: "answer", correct: false });
    expect(s).toMatchObject({ step: "ask", questionIndex: 0, wrongAttempts: 2 });
    s = nextLearnStep(s, { type: "answer", correct: true });
    expect(s).toMatchObject({ questionIndex: 1, wrongAttempts: 0 });
  });

  it("没有生词 / 题目 / 笔记的幕会跳过对应步骤", () => {
    const bare = { wordIds: [], questions: [], notes: [] };
    let s = initLearnState(bare);
    expect(s.step).toBe("read");
    s = nextLearnStep(nextLearnStep(s, { type: "readFinished" }), { type: "advance" });
    expect(s.step).toBe("done");
    const onlyNotes = initLearnState({ ...bare, notes: act.notes });
    expect(nextLearnStep(nextLearnStep(onlyNotes, { type: "readFinished" }), { type: "advance" }).step).toBe("notes");
  });

  it("从已做完的笔记续上（在纸上做过的笔记不重做）", () => {
    const s = initLearnState(act, 1);
    expect(s.noteIndex).toBe(1);
    let t: LearnState = { ...s, step: "notes" };
    t = nextLearnStep(t, { type: "noteDone" });
    expect(t.step).toBe("done");
  });
});

describe("视角切换与进度 flowReduce", () => {
  it("默认第三人称；切换只改视角，不丢进度", () => {
    let s = initFlow(3);
    expect(s.pov).toBe("watch");
    s = flowReduce(s, { type: "switch", pov: "me" });
    s = flowReduce(s, { type: "complete", pov: "me" });
    s = flowReduce(s, { type: "switch", pov: "paper" });
    s = flowReduce(s, { type: "switch", pov: "watch" });
    expect(s.pov).toBe("watch");
    expect(s.progress[0]).toEqual({ watched: false, learned: true, noted: true });
    expect(s.act).toBe(0);
  });

  it("任一视角完成一幕即算看过", () => {
    for (const pov of ["watch", "me", "paper"] as const) {
      const s = flowReduce(initFlow(2), { type: "complete", pov });
      expect(actSeen(s.progress[0]), pov).toBe(true);
    }
    expect(actSeen(initFlow(2).progress[0])).toBe(false);
  });

  it("第三人称看完自动进下一幕；第一人称 / 二维要点 “下一幕”", () => {
    let s = flowReduce(initFlow(3), { type: "complete", pov: "watch" });
    expect(s.act).toBe(1);
    s = flowReduce(flowReduce(s, { type: "switch", pov: "me" }), { type: "complete", pov: "me" });
    expect(s.act).toBe(1);
    s = flowReduce(s, { type: "next" });
    expect(s.act).toBe(2);
    expect(s.pov).toBe("me"); // 视角不变
  });

  it("没看过的幕不能 next；最后一幕完成后 finished", () => {
    let s = initFlow(2);
    expect(flowReduce(s, { type: "next" })).toBe(s);
    s = flowReduce(s, { type: "complete", pov: "watch" });
    s = flowReduce(s, { type: "complete", pov: "watch" });
    expect(s.finished).toBe(true);
    expect(flowReduce(s, { type: "switch", pov: "me" })).toBe(s);
  });

  it("没做的笔记在记忆匣里标记为 “还空着”", () => {
    let s = flowReduce(initFlow(2), { type: "complete", pov: "watch" });
    expect(notesEmpty(s.progress[0], { notes: act.notes })).toBe(true);
    s = flowReduce(initFlow(2), { type: "complete", pov: "paper" });
    expect(notesEmpty(s.progress[0], { notes: act.notes })).toBe(false);
    expect(notesEmpty(s.progress[0], { notes: [] })).toBe(false);
  });

  it("切换视角并重做同一幕：第三人称完成后再回来学，进度保留", () => {
    let s = initFlow(2);
    s = flowReduce(s, { type: "complete", pov: "paper" });
    s = flowReduce(s, { type: "switch", pov: "watch" });
    s = flowReduce(s, { type: "complete", pov: "watch" });
    expect(s.act).toBe(1);
    expect(s.progress[0]).toEqual({ watched: true, learned: false, noted: true });
  });
});

describe("手机干扰与专注度", () => {
  it("每点开一次无关消息扣一点，不低于 0", () => {
    expect(focusScore(0)).toBe(1);
    expect(focusScore(1)).toBe(0.8);
    expect(focusScore(9)).toBe(0);
    expect(averageFocus([1, 0.6])).toBe(0.8);
    expect(averageFocus([])).toBe(1);
  });
  it("通知时刻 1–2 次、间隔足够长、同一输入相同", () => {
    for (let i = 0; i < 6; i++) {
      const t = planDistractions("u01a", i);
      expect(t.length).toBeGreaterThanOrEqual(1);
      expect(t.length).toBeLessThanOrEqual(2);
      expect(t[0]).toBeGreaterThanOrEqual(14000);
      if (t[1]) expect(t[1] - t[0]).toBeGreaterThanOrEqual(26000);
      expect(planDistractions("u01a", i)).toEqual(t);
    }
  });
});

describe("点词查义与相关句", () => {
  const vocab = loadVocab();
  const unit = loadUnits()[0];
  const words = unit.word_ids!.map((id) => vocab.get(id)!);
  const gloss = buildGlossIndex(words, vocab.values());

  it("先查单元词（含屈折形式和标点），再查整本词表，查不到返回 null", () => {
    expect(gloss.lookup("devices,")?.word).toBe("device");
    expect(gloss.lookup("immersed")?.word).toBe("immerse");
    expect(gloss.lookup("Carefree.")?.word).toBe("carefree");
    expect(gloss.lookup("zzzqx")).toBeNull();
    expect(gloss.lookup("—")).toBeNull();
  });

  it("答错后讲义上闪的句子是题目考的那一句", () => {
    const acts = buildActs(unit, words, "section_a");
    const q = acts.flatMap((a) => a.questions).find((x) => /trusted others/i.test(x.question));
    expect(q).toBeDefined();
    const host = acts.find((a) => a.questions.includes(q!))!;
    const i = relatedSentences(host, q!)[0];
    expect(i).toBeGreaterThanOrEqual(0);
    expect(host.sentences[i]).toMatch(/trusted others/i);
  });

  it("长课文的十几幕也能从第一幕连续推进到 finished", () => {
    const acts = buildActs(unit, words, "section_a");
    expect(acts.length).toBeGreaterThan(6);
    let s = initFlow(acts.length);
    for (let i = 0; i < acts.length; i++) {
      s = flowReduce(s, { type: "complete", pov: "watch" });
      expect(s.progress.filter((p) => p.watched)).toHaveLength(i + 1);
    }
    expect(s.finished).toBe(true);
    expect(s.act).toBe(acts.length - 1);
  });
});
