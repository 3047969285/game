import type { ContextSegment, Rw3Phase, WordEntry, WordInContext, ZoneDef } from "../../core/types";
import type { Rw3UnitContent } from "../../infra/data";
import { buildClozeItems, wordForms } from "../learn/cloze";
import { quizFromUnitListening, quizFromUnitReading } from "../learn/quiz";
import { passageWithAllWords, pickLine, wordInText } from "./sceneUtils";
import { getRw3World } from "./rw3Worlds";

function toWordInContext(
  w: WordEntry,
  passages: string[],
  slot: number
): WordInContext {
  let contextLine = pickLine(w, slot);
  const forms = wordForms(w.word);
  for (const passage of passages) {
    if (!passage) continue;
    const sentences = passage.split(/(?<=[.!?])\s+/);
    const hit = sentences.find((sentence) => forms.some((form) => wordInText(sentence, form)));
    if (hit) {
      contextLine = hit.trim();
      break;
    }
  }
  return { id: w.id, word: w.word, pos: w.pos, meaning: w.meaning, contextLine };
}

function buildSectionSegments(passage: string, words: WordEntry[]): ContextSegment[] {
  const segs: ContextSegment[] = [];
  if (passage) {
    segs.push(...passageWithAllWords(passage, words));
  }
  return segs;
}

interface PassageWorldMeta {
  title: string;
  landmark: string;
  focus: string;
  memoryImage: string;
}

type PassageKind = "section_a" | "section_b" | "section_c";

interface PassageWorldStory {
  places: string[];
  scenes: string[];
}

const PASSAGE_WORLD_STORIES: Record<string, Partial<Record<PassageKind, PassageWorldStory>>> = {
  unit01: {
    section_a: { places: ["校园图书馆庭院", "对话温室", "专注观景台", "回声长椅"], scenes: ["孤独信号", "倾听实验", "主动选择", "被理解的瞬间"] },
    section_b: { places: ["通知走廊", "专注书桌", "数据边界站", "安全休息站"], scenes: ["数字习惯", "注意力消耗", "点击前的安全判断", "线上线下平衡"] },
    section_c: { places: ["山村诊所", "家庭连线", "协作诊疗中心", "协作之桥"], scenes: ["远程诊疗", "居家问诊", "科技向善", "有尊严的连接"] },
  },
  unit02: {
    section_a: { places: ["人生档案馆", "航海证据廊", "使命阅览室", "选择展厅"], scenes: ["跨世纪故事", "航线与证据", "服务与责任", "留下的影响"] },
    section_b: { places: ["银幕灯塔", "使命之路", "公共责任庭", "回声展厅"], scenes: ["公众形象", "援助使命", "倾听与伙伴", "服务超越聚光"] },
    section_c: { places: ["远航码头", "印度洋航线", "海图档案", "交流港湾"], scenes: ["舰队出发", "港口与交换", "证据辨析", "留下的网络"] },
  },
  unit03: {
    section_a: { places: ["行程地图", "迷雾小径", "市集回声廊", "归来观景台"], scenes: ["目的地之外", "在不确定中前行", "意外相遇", "带着新视角归来"] },
    section_b: { places: ["初夜驿站", "开放路线", "雨中市场", "信心观景台"], scenes: ["第一次独行", "留白与发现", "安全适应", "信心生长"] },
    section_c: { places: ["高铁站台", "同行车厢", "山河观景窗", "城市连线桥"], scenes: ["城市相连", "旅途中的人", "流动的地貌", "交通与人的网络"] },
  },
  unit04: {
    section_a: { places: ["职业讨论厅", "服务观察台", "提琴工坊", "贡献圆厅"], scenes: ["标签之外", "日常判断", "精确与责任", "尊严与贡献"] },
    section_b: { places: ["师徒工作台", "测量校准台", "工具试验场", "信任之桥"], scenes: ["问题与代价", "练习的证据", "保留并改进", "责任赢得信任"] },
    section_c: { places: ["苏州织坊", "练习绣台", "共创展廊", "活态传承庭"], scenes: ["读懂纹样", "手上技艺", "共同决定", "代际续写"] },
  },
  unit05: {
    section_a: { places: ["月背观测台", "鹊桥中继舱", "数据样本室", "远征地平线"], scenes: ["不可直达的月背", "信号接力", "证据校准", "把梦想交给下一代"] },
    section_b: { places: ["任务控制厅", "轨道校准室", "系统模拟舱", "协同决策桥"], scenes: ["发现通信盲区", "判断轨道偏差", "用试验比较方案", "记录边界与责任"] },
    section_c: { places: ["基础训练舱", "失重模拟池", "太空科学展厅", "未来前沿舱"], scenes: ["知识与身体准备", "在压力下协作", "把观测变成研究", "让探索延续"] },
  },
  unit06: {
    section_a: { places: ["灯巷书店", "共享书架", "公共账簿", "社区韧性廊"], scenes: ["危机抵达街区", "资源重新流动", "公平与效率取舍", "信任让价值留下"] },
    section_b: { places: ["校园换书墙", "循环分拣站", "透明规则台", "可持续市集"], scenes: ["从需求到设计", "记录建立信任", "把成本摊开", "衡量长期价值"] },
    section_c: { places: ["云河图书馆", "数字借阅屏", "社区协作桌", "知识之桥"], scenes: ["虚构案例提出问题", "数字之外的门槛", "把反馈变成改进", "不落下任何读者"] },
  },
};

const FALLBACK_PASSAGE_WORLD_META: PassageWorldMeta[] = [
  {
    title: "入口信标",
    landmark: "第一座信标",
    focus: "入口信标",
    memoryImage: "把“{title}”压缩成一个夸张动作，安放在“{place}”；回忆时沿主旨、证据、结果重建。",
  },
  {
    title: "关系走廊",
    landmark: "关系走廊",
    focus: "关系与因果",
    memoryImage: "把“{title}”的转折或因果变成动作，放进“{place}”；复述时沿连接关系取回信息。",
  },
  {
    title: "选择高台",
    landmark: "选择高台",
    focus: "观点与证据",
    memoryImage: "把“{title}”的观点放在高台、证据放在台阶；沿证据顺序复述。",
  },
  {
    title: "迁移之门",
    landmark: "迁移之门",
    focus: "现实迁移",
    memoryImage: "把“{title}”的结论变成现实动作，放在“{place}”；用生活例子验证。",
  },
];

function buildPassageWorldMeta(
  unitId: string,
  kind: PassageKind,
  index: number,
  sectionTitle: string,
  landmarks: string[]
): PassageWorldMeta {
  const fallback = FALLBACK_PASSAGE_WORLD_META[index % FALLBACK_PASSAGE_WORLD_META.length];
  const sceneNames: Record<typeof kind, string[]> = {
    section_a: ["证据之门", "关系回廊", "观点高台", "迁移之门"],
    section_b: ["信息前沿", "习惯环道", "边界水库", "平衡观景台"],
    section_c: ["故事源点", "地方现场", "协作之桥", "价值灯塔"],
  };
  const sectionLabel = kind === "section_a" ? "主文" : kind === "section_b" ? "拓展" : "文化";
  const story = PASSAGE_WORLD_STORIES[unitId]?.[kind];
  const memoryPlace = story?.places[index] ?? landmarks[index] ?? fallback.landmark;
  const sceneName = story?.scenes[index] ?? sceneNames[kind][index] ?? fallback.landmark;
  const landmark = `${sectionLabel} · ${memoryPlace} · ${sceneName}`;
  return {
    title: `${sectionTitle} · ${landmark}`,
    landmark,
    focus: sceneName,
    memoryImage: fallback.memoryImage.replace("{title}", sceneName).replace("{place}", memoryPlace),
  };
}

function splitPassageIntoWorldPhases(
  unitId: string,
  kind: PassageKind,
  sectionTitle: string,
  passage: string,
  allWords: WordEntry[],
  landmarks: string[],
  checkpoints: NonNullable<Rw3UnitContent["micro_world_checks"]>["section_a"]
): Rw3Phase[] {
  const sentences = passage.split(/(?<=[.!?])\s+/).map((sentence) => sentence.trim()).filter(Boolean);
  if (!sentences.length) return [];

  // 每个微世界承载约两句；若校准题更多，则扩展场景以免题目无法到达。
  const naturalWorldCount = Math.max(1, Math.ceil(sentences.length / 2));
  const checkpointWorldCount = Math.min(4, checkpoints?.length ?? 0);
  const worldCount = Math.min(
    4,
    sentences.length,
    Math.max(naturalWorldCount, checkpointWorldCount)
  );
  const phases: Rw3Phase[] = [];
  const baseSentencesPerWorld = Math.floor(sentences.length / worldCount);
  const extraSentences = sentences.length % worldCount;
  let sentenceStart = 0;

  for (let worldIndex = 0; worldIndex < worldCount; worldIndex++) {
    // 余句优先分配到前面的世界，让每个入口先获得足够语境且顺序不被打乱。
    const sentenceCount = baseSentencesPerWorld + (worldIndex < extraSentences ? 1 : 0);
    const sentenceEnd = sentenceStart + sentenceCount;
    const paragraph = sentences.slice(sentenceStart, sentenceEnd).join(" ");
    sentenceStart = sentenceEnd;
    const words = allWords.filter((word) => wordInText(paragraph, word.word));
    const meta = buildPassageWorldMeta(unitId, kind, worldIndex, sectionTitle, landmarks);
    const worldId = `${kind}-world-${worldIndex + 1}`;
    const wordInstruction = words.length
      ? `至少回忆并说出 ${Math.min(2, words.length)} 个高亮词的含义。`
      : "先用中文概括，再用一句英文复述本段的核心关系。";

    phases.push({
      kind,
      label: `${kind === "section_a" ? "A" : kind === "section_b" ? "B" : "C"} · 世界 ${worldIndex + 1}`,
      title: sectionTitle,
      segments: buildSectionSegments(paragraph, words),
      words: words.map((word, wordIndex) => toWordInContext(word, [paragraph], wordIndex)),
      worldId,
      worldTitle: meta.title,
      landmark: meta.landmark,
      memoryImage: meta.memoryImage,
      recallPrompt: `离开本世界前，${wordInstruction} 说明“${meta.focus}”如何支撑本段主旨，并指出一条关键证据。`,
      checkpoint: checkpoints?.[worldIndex],
    });
  }

  return phases;
}

/** 按教材结构构建读写3 完整单元学习管线 */
export function buildRw3Phases(
  zone: ZoneDef,
  wordMap: Map<string, WordEntry>,
  unit: Rw3UnitContent | undefined,
  wordIds: string[]
): Rw3Phase[] {
  const allWords: WordEntry[] = [];
  for (const id of wordIds) {
    const w = wordMap.get(id);
    if (w) allWords.push(w);
  }
  if (!allWords.length || !unit) return [];

  const vocabMeta = unit.sections.vocabulary;
  const levelCount = vocabMeta?.level_count ?? 4;
  const perLevel = vocabMeta?.words_per_level ?? 5;

  const passageA = unit.sections.section_a?.passage?.trim() ?? unit.sections.reading?.passage?.trim() ?? "";
  const passageB = unit.sections.section_b?.passage?.trim() ?? "";
  const passageC = unit.sections.section_c?.passage?.trim() ?? "";
  const listenScript = unit.sections.listening?.script?.trim() ?? passageA;
  const coursePassages = [...new Set([
    passageA,
    passageB,
    passageC,
    unit.sections.reading?.passage?.trim() ?? "",
    listenScript,
  ].filter(Boolean))];
  const world = getRw3World(zone.id.replace("rw3_", ""));

  const phases: Rw3Phase[] = [];

  if (passageA) {
    phases.push(
      ...splitPassageIntoWorldPhases(
        unit.unit_id,
        "section_a",
        unit.sections.section_a?.title ?? "Section A",
        passageA,
        allWords,
        world?.landmarks ?? [],
        unit.micro_world_checks?.section_a
      )
    );
  }

  if (passageB) {
    phases.push(
      ...splitPassageIntoWorldPhases(
        unit.unit_id,
        "section_b",
        unit.sections.section_b?.title ?? "Section B",
        passageB,
        allWords,
        world?.landmarks ?? [],
        unit.micro_world_checks?.section_b
      )
    );
  }

  if (passageC) {
    phases.push(
      ...splitPassageIntoWorldPhases(
        unit.unit_id,
        "section_c",
        unit.sections.section_c?.title ?? "Stories of China",
        passageC,
        allWords,
        world?.landmarks ?? [],
        unit.micro_world_checks?.section_c
      )
    );
  }

  for (let lv = 0; lv < levelCount; lv++) {
    const slice = allWords.slice(lv * perLevel, (lv + 1) * perLevel);
    if (!slice.length) continue;
    phases.push({
      kind: "vocab",
      label: `词汇 Lv${lv + 1}`,
      level: lv + 1,
      totalLevels: levelCount,
      words: slice.map((w, i) => toWordInContext(w, coursePassages, lv * perLevel + i)),
    });
  }

  if (world?.grammar.length && world.practiceQuestions.length) {
    phases.push({
      kind: "grammar",
      label: "语法工坊",
      title: `${world.worldName} · 语法运用`,
      points: world.grammar,
      questions: world.practiceQuestions,
    });
  }

  const readingQs = quizFromUnitReading(unit);
  if (readingQs.length) {
    phases.push({
      kind: "reading_quiz",
      label: "阅读理解",
      title: unit.sections.reading?.title ?? "Reading Comprehension",
      questions: readingQs,
    });
  }

  const listeningQs = quizFromUnitListening(unit);
  if (listenScript) {
    const listenWords = allWords.filter((w) => wordInText(listenScript, w.word));
    const segs: ContextSegment[] = [
      { type: "text", content: `${unit.sections.listening?.title ?? "Listening"}. ` },
      ...(listenWords.length
        ? passageWithAllWords(listenScript, listenWords)
        : [{ type: "text" as const, content: listenScript }]),
    ];
    phases.push({
      kind: "listening",
      label: "听力理解",
      title: unit.sections.listening?.title ?? "Listening",
      script: listenScript,
      segments: segs,
      questions: listeningQs,
    });
  }

  const allInContext = allWords.map((w, i) => toWordInContext(w, coursePassages, i));
  phases.push({
    kind: "cloze",
    label: "语境填空",
    items: buildClozeItems(allInContext),
  });

  const trans = unit.sections.translation?.sentences;
  if (trans?.length) {
    phases.push({
      kind: "translation",
      label: "翻译",
      sentences: trans.map((s) => ({
        zh: s.zh,
        enReference: s.en_reference,
        keywords: s.keywords ?? [],
      })),
    });
  }

  const writing = unit.sections.writing;
  if (writing?.prompt) {
    phases.push({
      kind: "writing",
      label: "写作",
      prompt: writing.prompt,
      outline: writing.outline ?? [],
    });
  }

  if (world) {
    phases.push({
      kind: "memory",
      label: "记忆远征",
      title: `${world.worldName} · 记忆远征`,
      mentor: world.mentor,
      methods: world.methods,
      memoryAnchor: world.memoryAnchor,
      memoryRoute: world.memoryRoute,
      recallPrompt: world.recallPrompt,
    });
  }

  return phases;
}
