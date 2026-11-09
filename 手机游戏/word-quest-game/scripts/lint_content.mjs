#!/usr/bin/env node
/**
 * 内容质量 lint：检查读写 3 的 6 个单元、词表、模板是否完整可用。
 * 只做“能自动验证的正确性”，不做教学法判断。
 * 输出：docs/content-quality-report.md；有 error 时退出码 1。
 */
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const dataDir = path.join(root, "public/data");
const errors = [];
const warnings = [];
const stats = { units: 0, sections: 0, words: 0, reading: 0, listening: 0, micro: 0, translation: 0, writing: 0, outline: 0 };
const err = (m) => errors.push(m);
const warn = (m) => warnings.push(m);

const read = (p) => JSON.parse(fs.readFileSync(p, "utf8"));
const unitsDir = path.join(dataDir, "content/college_english_rw3");
const unitFiles = fs.readdirSync(unitsDir).filter((f) => /^unit\d+\.json$/.test(f)).sort();
if (unitFiles.length !== 6) err(`单元数应为 6，实际 ${unitFiles.length}`);

const vocab = read(path.join(dataDir, "vocabulary/college_english_rw3.json"));
const words = new Map(vocab.words.map((w) => [w.id, w]));
if (vocab.count !== vocab.words.length) err(`词表 count ${vocab.count} 与 words ${vocab.words.length} 不一致`);
if (vocab.words.length !== 130) warn(`词表条数为 ${vocab.words.length}（D2 预期 130）`);

function checkQuestion(q, where, opts = 4) {
  if (!q.question || typeof q.question !== "string") err(`${where}: 缺 question`);
  if (!Array.isArray(q.options) || q.options.length !== opts) err(`${where}: options 应为 ${opts} 个`);
  if (!Number.isInteger(q.answer) || q.answer < 0 || q.answer >= (q.options?.length ?? 0)) err(`${where}: answer 越界`);
  if (!q.explanation || !q.explanation.trim()) warn(`${where}: 缺 explanation`);
}

for (const file of unitFiles) {
  const unit = read(path.join(unitsDir, file));
  const id = unit.unit_id ?? file.replace(".json", "");
  stats.units++;
  for (const k of ["unit_id", "unit_number", "title", "title_zh", "theme", "word_ids", "sections"]) {
    if (!unit[k]) err(`${id}: 缺 ${k}`);
  }
  if (!Array.isArray(unit.word_ids) || unit.word_ids.length === 0) err(`${id}: word_ids 为空`);
  for (const wid of unit.word_ids ?? []) if (!words.has(wid)) err(`${id}: word_id ${wid} 不在词表`);
  stats.words += unit.word_ids?.length ?? 0;

  const sec = unit.sections ?? {};
  const expected = ["section_a", "section_b", "section_c", "reading", "listening", "translation", "writing"];
  for (const k of expected) if (!sec[k]) err(`${id}: 缺 sections.${k}`);
  for (const k of ["section_a", "section_b", "section_c"]) {
    stats.sections++;
    const p = sec[k]?.passage;
    if (!p || p.trim().length < 200) err(`${id}.${k}: passage 太短/为空`);
    if (!sec[k]?.title) err(`${id}.${k}: 缺 title`);
  }
  const rc = sec.reading?.questions ?? [];
  if (rc.length === 0) err(`${id}: reading.questions 为空`);
  rc.forEach((q, i) => { stats.reading++; checkQuestion(q, `${id}.reading[${i}]`); });
  const lc = sec.listening?.questions ?? [];
  if (lc.length === 0) err(`${id}: listening.questions 为空`);
  if (!sec.listening?.script) err(`${id}: listening.script 为空`);
  lc.forEach((q, i) => { stats.listening++; checkQuestion(q, `${id}.listening[${i}]`); });
  for (const sk of ["section_a", "section_b", "section_c"]) {
    const checks = unit.micro_world_checks?.[sk] ?? [];
    if (checks.length === 0) warn(`${id}.micro_world_checks.${sk}: 为空`);
    checks.forEach((q, i) => { stats.micro++; checkQuestion(q, `${id}.micro[${sk}][${i}]`); });
  }
  const tr = sec.translation?.sentences ?? [];
  if (tr.length === 0) err(`${id}: translation.sentences 为空`);
  for (const [i, s] of tr.entries()) {
    stats.translation++;
    if (!s.zh || !/[\u4e00-\u9fff]/.test(s.zh)) err(`${id}.translation[${i}]: 缺中文题干`);
    if (!s.en_reference || s.en_reference.trim().length < 8) err(`${id}.translation[${i}]: 缺英文参考译`);
    if (!Array.isArray(s.keywords)) warn(`${id}.translation[${i}]: 缺 keywords`);
  }
  if (!sec.writing?.prompt) err(`${id}: writing.prompt 为空`);
  else stats.writing++;
  const outline = sec.writing?.outline ?? [];
  if (outline.length === 0) err(`${id}: writing.outline 为空`);
  stats.outline += outline.length;
}

// 词表逐条检查
for (const [i, w] of vocab.words.entries()) {
  const where = `vocab[${i}] ${w.id ?? w.word}`;
  if (!w.id) err(`${where}: 缺 id`);
  if (!w.word) err(`${where}: 缺 word`);
  if (!w.phonetic || !/^\/.+\/$/.test(w.phonetic)) warn(`${where}: 音标格式异常 "${w.phonetic ?? ""}"`);
  if (!w.pos) warn(`${where}: 缺词性`);
  if (!w.meaning) err(`${where}: 缺中文释义`);
  if (!w.example) warn(`${where}: 缺英文例句`);
  else if (!/[A-Za-z]{3,}/.test(w.example)) warn(`${where}: 例句不是英文`);
}

// 模板关卡引用的词必须在词表
const template = read(path.join(dataDir, "templates/college_english_rw3.json"));
for (const zone of template.zones ?? []) {
  for (const level of zone.levels ?? []) {
    for (const wid of level.word_ids ?? []) if (!words.has(wid)) warn(`template ${level.id}: word_id ${wid} 不在词表`);
  }
}

const lines = [
  "# 读写 3 内容质量检查报告", "",
  `> 生成：\`node scripts/lint_content.mjs\` · 只检查可自动验证的正确性（结构/字段/引用），不代替教学审校。`, "",
  "## 统计", "",
  `- 单元：${stats.units} / 6`,
  `- 课文段落：${stats.sections}（每单元 A/B/C 各一）`,
  `- 词表引用：${stats.words} 次（词表 ${vocab.words.length} 条）`,
  `- 阅读题：${stats.reading}，听力题：${stats.listening}，微检查：${stats.micro}`,
  `- 翻译句：${stats.translation}，写作任务：${stats.writing}，提纲：${stats.outline}`,
  "", "## 错误（必须修）", "",
  ...(errors.length ? errors.map((e) => `- ❌ ${e}`) : ["- 无"]),
  "", "## 警告（建议修）", "",
  ...(warnings.length ? warnings.slice(0, 80).map((w) => `- ⚠️ ${w}`) : ["- 无"]),
  "", "## 不能自动保证的部分", "",
  "- 中文释义/英文例句的教学准确性（需人工/词典审校）",
  "- 题目难度、干扰项质量、答案解析质量",
  "- 语音（浏览器 TTS）与最终音频一致性",
  "- 学习效果（需要试玩与前测/后测）",
  "",
];
fs.mkdirSync(path.join(root, "docs"), { recursive: true });
fs.writeFileSync(path.join(root, "docs/content-quality-report.md"), lines.join("\n"), "utf8");
console.log(JSON.stringify({ stats, errors: errors.length, warnings: warnings.length }));
if (errors.length) process.exitCode = 1;
