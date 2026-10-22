# Word Quest · 四六级 RPG 学习内容库

手机游戏《四六级 RPG》的学习数据工程。包含三套课程模板：

| 模板 ID | 名称 | 词汇量 | 结构 |
|---------|------|--------|------|
| `cet4` | 大学英语四级 | 当前 4543 词 | 词汇/听力/阅读/翻译/Boss |
| `cet6` | 大学英语六级 | 当前 3991 词 | 词汇/听力/阅读/翻译/Boss |
| `college_english_rw3` | 大学英语读写教程3（第四版） | 当前 130 词（6单元） | 按教材单元闯关 |

## 目录结构

```
word-quest/
├── data/
│   ├── schema/              # JSON Schema
│   ├── vocabulary/          # 词汇库
│   ├── content/             # 听力/阅读/翻译/单元内容
│   ├── templates/           # 三套课程模板
│   └── textbook/            # 读写教程3 教材原文与校对稿（qa/ 为数据层输入）
├── scripts/                 # 数据构建脚本
└── docs/                    # 说明文档
```

## 构建数据

```bash
python scripts/build_all.py
```

或分步执行：

```bash
python scripts/build_vocabulary.py   # 四级/六级词汇
python scripts/build_rw3_content.py  # 读写3单元内容
python scripts/build_exam_content.py # 四六级仿真题
python scripts/build_templates.py    # 生成模板
```

构建最后会校验数据引用与关键约束；也可独立执行 `python3 scripts/validate_data.py`。回归测试：`python3 -m unittest discover -s tests -v`。详见[课程数据完整性](docs/data-quality.md)。

## 数据来源

- **CET4/CET6 词汇**：`KyleBing/english-vocabulary` 开源词表（`_sources/cet4-words.txt`, `cet6-words.txt`）
- **读写教程3**：教材原文（《新视野大学英语（第四版）读写教程 Book 3（思政智慧版）》），由教师授权用于本教学应用；答案/听力稿为本项目自编

## 模板说明

每个模板包含：

- `zones`：学习区域（词汇森林、听力洞穴等）
- `levels`：关卡（含 `word_ids`、`content_refs`、`stamina_cost`）
- `rank_tiers`：段位（青铜→王者）
- `game_rules`：体力、Streak、冲刺模式等规则参数

## 许可说明

- 开源词表仅供学习应用。
- 读写教程3 内容取自教材原文（《新视野大学英语（第四版）读写教程 3（思政智慧版）》），由教师授权用于本教学应用；对外分发前需确认授权范围，不得商业转售。
