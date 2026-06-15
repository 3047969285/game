import type { ContextScene, ContextSegment, LevelDef, WordEntry, ZoneDef } from "../../core/types";
import { pickPhilosophy } from "./philosophy";
import { pickLine, pickWords, sentenceToSegments } from "./sceneUtils";

/** 区域剧情节拍 */
interface StoryBeat {
  opening: string;
  openingZh: string;
  middle: string;
  closing: string;
  closingZh: string;
}

const ZONE_BEATS: Record<string, StoryBeat[]> = {
  vocabulary: [
    {
      opening: "Dawn breaks over the Vocabulary Forest. The mist does not hide the trees — it hides the reasons you once cared to remember.",
      openingZh: "清晨，词汇森林苏醒。雾遮住的不是树，而是你曾经在意去记住的理由。",
      middle: "Lin kneels by a stone carved with questions, not answers. \"A word without context,\" she says, \"is a name without a soul.\"",
      closing: "You breathe slowly. The passage below is not a test — it is a mirror.",
      closingZh: "你放慢呼吸。下面的段落不是考卷，而是一面镜子。",
    },
    {
      opening: "Footprints end at a clearing where students used to debate whether language creates reality, or merely reveals it.",
      openingZh: "脚印止于一片空地——这里曾有人争论：语言创造现实，还是只是揭示现实。",
      middle: "The wind turns pages no one is holding. Lin smiles: \"Read until the sentence feels like a thought you almost had.\"",
      closing: "You step into the text, willing to be changed by a few honest words.",
      closingZh: "你走进文字，甘愿被几个诚恳的词改变。",
    },
    {
      opening: "Fireflies hover between trunks, each flash a syllable the forest forgot to finish.",
      openingZh: "萤火在树干间明灭，每一次闪烁都是森林忘了说完的音节。",
      middle: "Your journal trembles. Not from fear — from recognition. Something in you knows these words already.",
      closing: "The story opens like a question you are finally ready to answer.",
      closingZh: "故事像一道你终于准备回答的问题那样展开。",
    },
  ],
  listening: [
    {
      opening: "In the Listening Cavern, sound becomes philosophy: what reaches your ears is not noise, but the world asking to be understood.",
      openingZh: "听力洞穴里，声音就是哲学——抵达你耳边的不是噪音，而是渴望被理解的世界。",
      middle: "Kai's radio hums: \"Don't memorize voices. Hear the intention behind them.\"",
      closing: "You listen — not to pass a level, but to let meaning arrive.",
      closingZh: "你倾听——不为过关，只为让意义抵达。",
    },
    {
      opening: "Water drips in the dark, marking time the way patience marks learning — one drop, one attention.",
      openingZh: "暗处水滴计时，如同耐心记录学习：一滴，一份专注。",
      middle: "Echoes return your own breathing. Kai says, \"Every clip is someone trying to mean something. Meet them halfway.\"",
      closing: "The transcript glows. Understanding is a kind of hospitality.",
      closingZh: "原文浮现。理解，是一种款待。",
    },
  ],
  reading: [
    {
      opening: "The Reading Ruins stand like a library after history — still insisting that ideas deserve a home.",
      openingZh: "阅读废墟像一部历史之后的图书馆——仍坚持思想值得被安放。",
      middle: "Chen's note reads: \"We do not read to finish. We read to become someone who can finish.\"",
      closing: "Dust lifts from the page. Today's passage asks what you are willing to notice.",
      closingZh: "尘土从书页扬起。今天的段落问你：你愿注意到什么。",
    },
    {
      opening: "Stained glass colors the rubble. Beauty survives in ruins because meaning refuses to die quietly.",
      openingZh: "彩色玻璃为瓦砾上色。美能在废墟里存活，因为意义拒绝无声死去。",
      middle: "A margin note: Context first. Definition second. Life always third.",
      closing: "You read on, granting the text the dignity of your attention.",
      closingZh: "你继续读下去，把专注这份尊严交给文本。",
    },
  ],
  translation: [
    {
      opening: "The Translation Workshop smells of ink and distance — every bilingual sign is a small treaty between two worlds.",
      openingZh: "翻译工坊弥漫着墨香与距离——每块双语招牌都是两个世界之间的小条约。",
      middle: "Chen says, \"To translate is to admit that no language owns the truth alone.\"",
      closing: "You listen beneath the market noise for sentences that still want to be understood.",
      closingZh: "你在市集喧嚣底下，打捞仍想被理解的句子。",
    },
    {
      opening: "Postcards spin in the doorway, each sentence a traveler who once crossed an ocean of meaning.",
      openingZh: "明信片在门口旋转，每句话都是曾渡过意义之海的旅人。",
      middle: "A student translator asks, \"What if the right word is not correct, but true in context?\"",
      closing: "You join the table where language becomes bridge, not border.",
      closingZh: "你坐到桌前——语言在此是桥，不是界。",
    },
  ],
  unit: [
    {
      opening: "The seminar room is quiet in the way philosophy prefers — not empty, but full of unspoken questions.",
      openingZh: "研讨室的安静是哲学偏爱那种：并不空，而是盛满未说出口的问题。",
      middle: "Chen writes on the board: \"A unit is not a list. It is a worldview trying to introduce itself.\"",
      closing: "You turn to the passage, ready to let this chapter rename what you see.",
      closingZh: "你转向段落，准备让这一章重新命名你所见。",
    },
    {
      opening: "Morning light lands on your textbook like an argument for beginning again.",
      openingZh: "晨光落在课本上，像在为重新开始辩护。",
      middle: "Lin leaves a note: \"Learn the words, but keep the questions.\"",
      closing: "The unit opens — not as homework, but as a scene in a larger life.",
      closingZh: "单元展开——不是作业，而是更大人生中的一幕。",
    },
  ],
  boss: [
    {
      opening: "The Temple of Return stands at the road's end. Exams measure performance; journeys measure becoming.",
      openingZh: "归返圣殿立在路尽头。考试衡量表现，旅程衡量蜕变。",
      middle: "Lin and Chen meet you at the gate. \"This is not a battle,\" Lin says. \"It is everything you learned, speaking at once.\"",
      closing: "The doors open. The final passage is not an ending — it is a verdict you write yourself.",
      closingZh: "大门开启。终章不是结局——是你写给自己的裁决。",
    },
  ],
};

function pickBeat(zone: ZoneDef, levelIndex: number): StoryBeat {
  const pool = ZONE_BEATS[zone.type] ?? ZONE_BEATS.vocabulary;
  return pool[levelIndex % pool.length];
}

/** 构建哲学语境场景 */
export function buildContextScene(
  level: LevelDef,
  zone: ZoneDef,
  wordMap: Map<string, WordEntry>,
  levelIndex = 0,
  totalInZone = 1
): ContextScene | null {
  const words: WordEntry[] = [];
  for (const id of level.word_ids) {
    const w = wordMap.get(id);
    if (w) words.push(w);
  }
  if (words.length === 0) return null;

  const beat = pickBeat(zone, levelIndex);
  const thought = pickPhilosophy(levelIndex, zone.order ?? levelIndex);
  const picked = pickWords(words, Math.min(6, words.length));
  const contextLines = picked.map((w, i) => pickLine(w, levelIndex + i));

  const segments: ContextSegment[] = [];
  segments.push({ type: "text", content: beat.opening + " " });
  segments.push({ type: "text", content: beat.middle + " " });
  segments.push({ type: "text", content: thought.en + " " });

  const half = Math.ceil(picked.length / 2);
  for (let i = 0; i < half; i++) {
    segments.push(...sentenceToSegments(contextLines[i], picked[i]));
  }

  segments.push({ type: "text", content: " " });
  for (let i = half; i < picked.length; i++) {
    segments.push(...sentenceToSegments(contextLines[i], picked[i]));
  }

  segments.push({ type: "text", content: beat.closing + " " });
  segments.push({
    type: "text",
    content: " Tap each glowing word — not to collect it, but to understand why it matters here.",
  });

  return {
    levelId: level.id,
    title: level.title,
    settingEn: zone.name_en,
    chapter: `${zone.name} · 第 ${levelIndex + 1}/${totalInZone} 幕`,
    plotZh: `${beat.openingZh} ${thought.zh} ${beat.closingZh}`,
    philosophyZh: thought.zh,
    philosophyEn: thought.en,
    segments,
    words: picked.map((w, i) => ({
      id: w.id,
      word: w.word,
      pos: w.pos,
      meaning: w.meaning,
      contextLine: contextLines[i],
    })),
  };
}
