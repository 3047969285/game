# 读写教程3 教材数据（数据层源）

《新视野大学英语（第四版）读写教程 3（思政智慧版）》的提取与校对结果。用户是授课教师，本书经其授权用于本教学应用。

## 目录

```
data/textbook/rw3/
├── textbook.json       OCR 提取的原始结构化数据（6 单元：Text A/B、Stories of China、New words、练习、翻译）
├── pages/              176 页 OCR 页文本（复核用，每行 y / x / text）
├── qa/                 校对后的干净内容（unit01–06.json）+ 音标（phonetics/、phonetics.json），生成数据层的唯一输入
├── README.md           本文件
└── ../textbook-qa-spec.md、../textbook-phonetics-spec.md （在 word-quest/docs/）
```

## 生成数据层

```bash
cd 手机游戏/word-quest
python3 scripts/build_rw3_content.py   # qa/*.json -> vocabulary + content/college_english_rw3
python3 scripts/build_templates.py     # 按教材词表重建关卡模板
python3 scripts/validate_data.py       # 引用/计数/答案校验
python3 -m unittest discover -s tests -v
```

## 规则

- `qa/unit*.json` 是**唯一可信输入**：课文只做 OCR 纠错，题目做成四选一并补答案（教材无答案页，答案为推导/命题所得）。
- 音标由 `scripts/build_rw3_content.py` 从 CET4/CET6 词库匹配，找不到就留空，不编造。
- 教材原文由教师授权用于本应用；对外分发需确认授权范围，不得商业转售。
