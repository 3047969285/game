/** 哲思独白：按关卡序号轮换 */
export const PHILOSOPHY_MOMENTS = [
  {
    en: "The fog does not erase language — it erases the moment when a word once meant something to you.",
    zh: "雾并没有抹掉语言，它抹掉的是某个词曾经对你产生意义的那一刻。",
  },
  {
    en: "To learn a word is not to store it, but to meet it again in a sentence that changes you.",
    zh: "学一个词，不是把它存进脑子，而是在改变你的句子里与它重逢。",
  },
  {
    en: "Meaning is never born in isolation. It waits at the crossroads of context.",
    zh: "意义从不孤立诞生，它守在语境的十字路口。",
  },
  {
    en: "You are not walking through levels. You are walking through versions of yourself that can finally speak.",
    zh: "你穿过的不是关卡，而是一个终于能开口说话的、又一版的自己。",
  },
  {
    en: "Time in the mist moves differently: one minute of attention can weigh more than an hour of memorizing.",
    zh: "雾中的时间另有一套算法：一分钟的专注，可以重于一小时背诵。",
  },
  {
    en: "Every definition is a small philosophy. Every example, a small life.",
    zh: "每条释义都是一小段哲学，每个例句都是一小段人生。",
  },
  {
    en: "The exam gate is far, but the question it asks is close: who will you become when the words return?",
    zh: "考场还远，但它要问的问题很近：当词语归来时，你会成为谁？",
  },
  {
    en: "Reading is a way of refusing to let the world become noise.",
    zh: "阅读，是一种拒绝让世界沦为噪音的方式。",
  },
];

/** 取本幕哲思 */
export function pickPhilosophy(levelIndex: number, zoneOrder: number): { en: string; zh: string } {
  const i = (levelIndex + zoneOrder * 3) % PHILOSOPHY_MOMENTS.length;
  return PHILOSOPHY_MOMENTS[i];
}

/** 哲思味语境句（无例句时优先使用） */
export function philosophyLine(word: string, pos: string, slot: number): string {
  const p = pos.toLowerCase();
  const lines: string[] = [];

  if (p.startsWith("v")) {
    lines.push(
      `Perhaps to ${word} is not an action, but a decision about who you refuse to remain.`,
      `You cannot ${word} the fog away — only ${word} your way through it, word by word.`,
      `In the silence before dawn, travelers learn to ${word} what memory once forgot.`,
      `Chen writes on stone: "Those who ${word} with patience do not chase meaning — they let it arrive."`
    );
  } else if (p.startsWith("n")) {
    lines.push(
      `The ${word} you seek is not hidden in a dictionary; it is hiding in the life you have not yet described.`,
      `Every ${word} in this scene is a door — open it, and the sentence remembers you.`,
      `Kai whispers through static: "Listen for the ${word}. It names what the fog wants you to forget."`,
      `Lin calls the ${word} "a small universe compressed into four letters."`
    );
  } else if (p.startsWith("adj")) {
    lines.push(
      `The path ahead feels ${word}, as if the world is asking whether you are ready to be changed.`,
      `Nothing here is truly ${word} — only your attention has not yet learned how to see.`,
      `A ${word} light falls on the page: not bright enough to blind, only enough to reveal.`,
      `The mist makes everything ${word}, and that is why context matters more than speed.`
    );
  } else if (p.startsWith("adv")) {
    lines.push(
      `She speaks ${word}, as though each syllable were a stone placed on a bridge you must cross.`,
      `You read ${word}, letting the sentence breathe before you claim to understand it.`,
      `The sign was written ${word}: not for haste, but for those who still believe in meaning.`,
      `Time moves ${word} here — fast for the anxious, slow for the attentive.`
    );
  } else {
    lines.push(
      `"${word}" appears like a question mark at the edge of your understanding.`,
      `Tonight's shard of memory is ${word} — recover it before the fog rewrites you.`,
      `The word ${word} waits, patient as philosophy itself.`,
      `Between knowing and forgetting stands a single word: ${word}.`
    );
  }

  return lines[slot % lines.length];
}
