import type { ActorPose } from "../memory/types";
import { RW3_WORLDS } from "./rw3Worlds";

/** 单元探索世界里的 NPC 设定：位置相对单元中心，对话由 NpcDialog 驱动。 */
export interface NpcDef {
  id: string;
  name: string;
  /** 身份称谓：显示在名牌上 */
  role: string;
  unitId: string;
  /** 相对单元中心的偏移（米） */
  dx: number;
  dz: number;
  /** 面向角（弧度，0 = +z） */
  yaw: number;
  pose: ActorPose;
  look: Record<string, unknown>;
  /** 性格：决定闲聊口吻与朗读音色 */
  voice: "young" | "old" | "system";
  greeting: string;
  /** 闲聊台词（按友好度解锁更深一层） */
  chat: string[][];
  /** 一句鼓励 / 提示（答对时说） */
  cheer: string[];
  /** 答错时的安慰 */
  comfort: string[];
  /** 好友度满级后赠送的“秘密”：一条学习技巧 */
  secret: string;
}

const MENTOR_LOOK = { shirt: 0x5a6f5c, trousers: 0x3d3a36, hairStyle: "bun" as const, glasses: true, outfit: "coat" as const };

interface NpcTemplate {
  keeper: Omit<NpcDef, "unitId" | "dx" | "dz" | "yaw">;
  traveler: Omit<NpcDef, "unitId" | "dx" | "dz" | "yaw">;
}

const COMMON: NpcTemplate = {
  keeper: {
    id: "keeper",
    name: "Echo 回声",
    role: "词语守护者",
    pose: "stand",
    voice: "system",
    look: { shirt: 0x6b5b95, trousers: 0x2f2f3a, hairStyle: "long", scarf: 0xe0b44c, outfit: "hoodie" },
    greeting: "你好，旅行者。我守着这片土地上散落的词语——每一个词都有一整个家族，一起去看看？",
    chat: [
      ["我从小就在这片地方长大。词语在这里不是死的，走近它们，它们会自己开口。", "你有没有发现，有的词球离得远，却比近的更亮？那是最久没被想起的词在发光。"],
      ["我最喜欢的是词根。认识一个词根，等于一次认识十个词。", "听起来很傻，但我每次念出一个新词，都会想想它第一次被人说出口的样子。"],
      ["说实话，我也会忘词。区别只是：我忘了就回来问一问，不觉得丢人。"],
    ],
    cheer: ["对！你的耳朵越来越准了。", "漂亮，这个词现在是你的了。", "就是它——再来一个？"],
    comfort: ["没关系，选错的词反而记得更牢。", "差一点点，我们再看一眼它的词根。", "别急，想想刚才它出现的那句话。"],
    secret: "秘密技巧：把一个词放进你自己的一天里——早饭、通勤、晚上——造三个只属于你的句子，比抄十遍管用。",
  },
  traveler: {
    id: "traveler",
    name: "Kai 凯",
    role: "同路的学长",
    pose: "stand",
    voice: "young",
    look: { shirt: 0xc2603c, trousers: 0x2d3a4a, backpack: 0x3f4f68, outfit: "tee" },
    greeting: "嘿，新来的？我去年也卡在这一关。来，我教你几招背词不会忘的办法，顺便考考你。",
    chat: [
      ["我以前背单词就是硬背，结果一周后全还给老师了。后来改成‘遇到一个，就用一次’，好多了。", "你猜我最怕什么？考试前一晚才开始背。相信我，别那样。"],
      ["考试那天我碰到一个熟悉的词，心里一下子就稳了。那种感觉，值得你现在多花点力气。", "我用手机把自己念的例句录下来，坐车时回放。耳朵比眼睛更不容易偷懒。"],
      ["我们学校的图书馆三楼靠窗那个位置，下午三点没人，自己去试试。"],
    ],
    cheer: ["可以啊！", "这你都知道，我服了。", "稳！再来一道？"],
    comfort: ["哈哈，我当年也错在这里。", "没事，这题本来就爱挖坑。", "记下来，下回就不会掉进去了。"],
    secret: "秘密技巧：睡前十分钟只看当天错过的三个词，睡眠会帮你整理记忆——别刷手机把它冲掉。",
  },
};

/** 每个单元三位 NPC：导师（世界设定里的 mentor）、词语守护者、同路学长 */
export function buildUnitNpcs(unitId: string): NpcDef[] {
  const world = RW3_WORLDS[unitId];
  const mentorName = world?.mentor ?? "导师";
  const mentor: NpcDef = {
    id: "mentor",
    name: mentorName,
    role: "单元导师",
    unitId,
    dx: 13.5,
    dz: -6,
    yaw: -Math.PI * 0.62,
    pose: "talk",
    voice: "old",
    look: MENTOR_LOOK,
    greeting: world
      ? `欢迎来到「${world.worldName.split("·")[0].trim()}」。${world.worldTagline}想问什么词、想知道下一步去哪，随时问我。`
      : "欢迎。想问什么词、想知道下一步去哪，随时问我。",
    chat: [
      world ? [world.opening, `你的任务：${world.mission}`] : ["这里有很多值得慢慢看的地方。"],
      world ? [`这里有四处地标：${world.landmarks.join("、")}。每一处都藏着一段课文里的记忆。`, "记忆不是背出来的，是‘住’出来的。住进去几次，就是你的了。"] : ["学语言像交朋友，见多了，自然熟。"],
      world ? [world.turningPoint, "先别急着通关。真正学会，是以后你在别的地方也想起了它。"] : ["谢谢你愿意停下来听我说这么多。"],
    ],
    cheer: ["很好，你已经在用这个词思考了。", "完全正确。把它带进你的下一个句子里。", "你的记忆路径正在变得清晰。"],
    comfort: ["错误是记忆的入口，不是终点。", "回忆一下它出现的那个场景，再试一次。", "慢一点，没有人在催你。"],
    secret: world
      ? `秘密：${world.methods[0]?.title ?? "画面编码"}——${world.methods[0]?.action ?? "把抽象词变成看得见的画面。"}`
      : "秘密：每天固定的地点与时间，是最便宜的记忆辅助。",
  };
  const keeper: NpcDef = { ...COMMON.keeper, id: "keeper", unitId, dx: -11, dz: 9, yaw: Math.PI * 0.8 };
  const traveler: NpcDef = { ...COMMON.traveler, id: "traveler", unitId, dx: 4, dz: -15, yaw: Math.PI * 0.12 };
  return [mentor, keeper, traveler];
}

/** 全局唯一 NPC id：用于好友度存档 */
export function npcKey(def: NpcDef): string {
  return `${def.unitId}:${def.id}`;
}
