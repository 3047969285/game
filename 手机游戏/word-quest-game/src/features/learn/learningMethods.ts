import type { LearningMethod } from "../../core/types";

/**
 * 贯穿读写3的学习科学动作。
 * 每一项都对应游戏中的可观察行为，避免把方法论停留在说明文字里。
 */
export const RW3_LEARNING_METHODS: LearningMethod[] = [
  {
    id: "retrieval",
    title: "主动检索",
    principle: "先从记忆中取出，再查看答案，检索本身就是学习。",
    action: "点击词汇后先说出含义和例句，再揭示释义并自评。",
  },
  {
    id: "spacing",
    title: "间隔重复",
    principle: "在即将遗忘时再次回忆，比一次性重复更能保持。",
    action: "答题结果进入 SM-2 复习队列，薄弱词缩短间隔并优先回来。",
  },
  {
    id: "interleaving",
    title: "交错练习",
    principle: "交替调用词汇、语法、阅读和翻译，训练选择方法的能力。",
    action: "学习实验室混合不同题型，不连续刷同一种题超过一组。",
  },
  {
    id: "generation",
    title: "生成效应",
    principle: "自己生成句子或解释，比只看现成答案留下更深线索。",
    action: "翻译和写作先提交自己的表达，再查看参考与反馈。",
  },
  {
    id: "dual-coding",
    title: "双通道编码",
    principle: "语言线索与空间、图像和声音线索互相支撑。",
    action: "把文章段落锚定到三维地标，同时朗读、听读并回忆关键词。",
  },
  {
    id: "transfer",
    title: "迁移练习",
    principle: "能在新情境中使用，才说明知识真正可用。",
    action: "单元项目要求用本单元词汇和句型描述自己的真实经历。",
  },
];
