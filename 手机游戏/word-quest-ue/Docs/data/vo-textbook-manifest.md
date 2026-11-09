# 课文配音清单（D25）

> 生成：`python3 Tools/data_vo_textbook.py --manifest` · 2026-10-23T00:58:25+00:00
> 源：`Content/Data/textbook/rw3/articles/unitNN.json` + `exercises/unitNN.json`；本地 TTS（macOS `say`），句级时间戳。

## 1. 总量

- 行数：**267**（段落 187 + 练习指令 80）
- 句子数：**887**
- 声线分配：{"Samantha": 70, "Daniel": 77, "Flo": 40, "Reed": 80}

## 2. 声线映射

| 类别 | 声线 | 情绪 | 说明 |
|------|------|------|------|
| section_a | Samantha | warm | 美音女声，清晰温和 |
| section_b | Daniel | steady | 英音男声，沉稳（旁白基底） |
| section_c | Flo | clear | 美音女声，明亮 |
| 练习指令 | Reed | calm | 美音男声，平稳 |

## 3. 输出

- 音频：`Content/Data/vo/textbook/unitNN/<line_id>.wav`（22.05 kHz / mono / 16-bit PCM）
- 时间戳：同名 `.json`（`sentences[]` 每句 `start/end`，秒）
- 合成：`python3 Tools/data_vo_textbook.py --synth`；校验：`--check`

## 4. 明细

| line_id | 类型 | 声线 | 句数 | 来源 |
|---------|------|------|------|------|
| vo.tb.unit01.section_a.p01 | paragraph | Samantha | 5 | articles/unit01.json#section_a.1 |
| vo.tb.unit01.section_a.p02 | paragraph | Samantha | 5 | articles/unit01.json#section_a.2 |
| vo.tb.unit01.section_a.p03 | paragraph | Samantha | 5 | articles/unit01.json#section_a.3 |
| vo.tb.unit01.section_a.p04 | paragraph | Samantha | 4 | articles/unit01.json#section_a.4 |
| vo.tb.unit01.section_a.p05 | paragraph | Samantha | 8 | articles/unit01.json#section_a.5 |
| vo.tb.unit01.section_a.p06 | paragraph | Samantha | 6 | articles/unit01.json#section_a.6 |
| vo.tb.unit01.section_a.p07 | paragraph | Samantha | 3 | articles/unit01.json#section_a.7 |
| vo.tb.unit01.section_a.p08 | paragraph | Samantha | 3 | articles/unit01.json#section_a.8 |
| vo.tb.unit01.section_a.p09 | paragraph | Samantha | 4 | articles/unit01.json#section_a.9 |
| vo.tb.unit01.section_a.p10 | paragraph | Samantha | 4 | articles/unit01.json#section_a.10 |
| vo.tb.unit01.section_a.p11 | paragraph | Samantha | 7 | articles/unit01.json#section_a.11 |
| vo.tb.unit01.section_a.p12 | paragraph | Samantha | 5 | articles/unit01.json#section_a.12 |
| vo.tb.unit01.section_b.p01 | paragraph | Daniel | 4 | articles/unit01.json#section_b.1 |
| vo.tb.unit01.section_b.p02 | paragraph | Daniel | 6 | articles/unit01.json#section_b.2 |
| vo.tb.unit01.section_b.p03 | paragraph | Daniel | 5 | articles/unit01.json#section_b.3 |
| vo.tb.unit01.section_b.p04 | paragraph | Daniel | 6 | articles/unit01.json#section_b.4 |
| vo.tb.unit01.section_b.p05 | paragraph | Daniel | 5 | articles/unit01.json#section_b.5 |
| vo.tb.unit01.section_b.p06 | paragraph | Daniel | 6 | articles/unit01.json#section_b.6 |
| vo.tb.unit01.section_b.p07 | paragraph | Daniel | 5 | articles/unit01.json#section_b.7 |
| vo.tb.unit01.section_b.p08 | paragraph | Daniel | 5 | articles/unit01.json#section_b.8 |
| vo.tb.unit01.section_b.p09 | paragraph | Daniel | 4 | articles/unit01.json#section_b.9 |
| vo.tb.unit01.section_c.p01 | paragraph | Flo | 3 | articles/unit01.json#section_c.1 |
| vo.tb.unit01.section_c.p02 | paragraph | Flo | 1 | articles/unit01.json#section_c.2 |
| vo.tb.unit01.section_c.p03 | paragraph | Flo | 3 | articles/unit01.json#section_c.3 |
| vo.tb.unit01.section_c.p04 | paragraph | Flo | 1 | articles/unit01.json#section_c.4 |
| vo.tb.unit01.section_c.p05 | paragraph | Flo | 4 | articles/unit01.json#section_c.5 |
| vo.tb.unit01.section_c.p06 | paragraph | Flo | 3 | articles/unit01.json#section_c.6 |
| vo.tb.unit01.section_c.p07 | paragraph | Flo | 1 | articles/unit01.json#section_c.7 |
| vo.tb.unit01.section_c.p08 | paragraph | Flo | 2 | articles/unit01.json#section_c.8 |
| vo.tb.unit01.section_c.p09 | paragraph | Flo | 3 | articles/unit01.json#section_c.9 |
| vo.tb.unit01.section_c.p10 | paragraph | Flo | 2 | articles/unit01.json#section_c.10 |
| vo.tb.unit01.ex.u01_a_pre_reading | instruction | Reed | 3 | exercises/unit01.json#u01_a_pre_reading.instructions |
| vo.tb.unit01.ex.u01_a_understanding | instruction | Reed | 1 | exercises/unit01.json#u01_a_understanding.instructions |
| vo.tb.unit01.ex.u01_a_critical | instruction | Reed | 1 | exercises/unit01.json#u01_a_critical.instructions |
| vo.tb.unit01.ex.u01_a_words_in_use | instruction | Reed | 3 | exercises/unit01.json#u01_a_words_in_use.instructions |
| vo.tb.unit01.ex.u01_a_word_building | instruction | Reed | 3 | exercises/unit01.json#u01_a_word_building.instructions |
| vo.tb.unit01.ex.u01_a_banked_cloze | instruction | Reed | 2 | exercises/unit01.json#u01_a_banked_cloze.instructions |
| vo.tb.unit01.ex.u01_a_expressions_in_use | instruction | Reed | 3 | exercises/unit01.json#u01_a_expressions_in_use.instructions |
| vo.tb.unit01.ex.u01_a_structure_writing | instruction | Reed | 3 | exercises/unit01.json#u01_a_structure_writing.instructions |
| vo.tb.unit01.ex.u01_b_reading_skills | instruction | Reed | 3 | exercises/unit01.json#u01_b_reading_skills.instructions |
| vo.tb.unit01.ex.u01_b_understanding | instruction | Reed | 1 | exercises/unit01.json#u01_b_understanding.instructions |
| vo.tb.unit01.ex.u01_b_critical | instruction | Reed | 1 | exercises/unit01.json#u01_b_critical.instructions |
| vo.tb.unit01.ex.u01_b_collocation | instruction | Reed | 3 | exercises/unit01.json#u01_b_collocation.instructions |
| vo.tb.unit01.ex.u01_c_translation | instruction | Reed | 1 | exercises/unit01.json#u01_c_translation.instructions |
| vo.tb.unit02.section_a.p01 | paragraph | Samantha | 5 | articles/unit02.json#section_a.1 |
| vo.tb.unit02.section_a.p02 | paragraph | Samantha | 4 | articles/unit02.json#section_a.2 |
| vo.tb.unit02.section_a.p03 | paragraph | Samantha | 2 | articles/unit02.json#section_a.3 |
| vo.tb.unit02.section_a.p04 | paragraph | Samantha | 6 | articles/unit02.json#section_a.4 |
| vo.tb.unit02.section_a.p05 | paragraph | Samantha | 4 | articles/unit02.json#section_a.5 |
| vo.tb.unit02.section_a.p06 | paragraph | Samantha | 3 | articles/unit02.json#section_a.6 |
| vo.tb.unit02.section_a.p07 | paragraph | Samantha | 4 | articles/unit02.json#section_a.7 |
| vo.tb.unit02.section_a.p08 | paragraph | Samantha | 2 | articles/unit02.json#section_a.8 |
| vo.tb.unit02.section_a.p09 | paragraph | Samantha | 4 | articles/unit02.json#section_a.9 |
| vo.tb.unit02.section_a.p10 | paragraph | Samantha | 3 | articles/unit02.json#section_a.10 |
| vo.tb.unit02.section_a.p11 | paragraph | Samantha | 1 | articles/unit02.json#section_a.11 |
| vo.tb.unit02.section_b.p01 | paragraph | Daniel | 1 | articles/unit02.json#section_b.1 |
| vo.tb.unit02.section_b.p02 | paragraph | Daniel | 2 | articles/unit02.json#section_b.2 |
| vo.tb.unit02.section_b.p03 | paragraph | Daniel | 4 | articles/unit02.json#section_b.3 |
| vo.tb.unit02.section_b.p04 | paragraph | Daniel | 3 | articles/unit02.json#section_b.4 |
| vo.tb.unit02.section_b.p05 | paragraph | Daniel | 3 | articles/unit02.json#section_b.5 |
| vo.tb.unit02.section_b.p06 | paragraph | Daniel | 5 | articles/unit02.json#section_b.6 |
| vo.tb.unit02.section_b.p07 | paragraph | Daniel | 3 | articles/unit02.json#section_b.7 |
| vo.tb.unit02.section_b.p08 | paragraph | Daniel | 2 | articles/unit02.json#section_b.8 |
| vo.tb.unit02.section_b.p09 | paragraph | Daniel | 2 | articles/unit02.json#section_b.9 |
| vo.tb.unit02.section_b.p10 | paragraph | Daniel | 4 | articles/unit02.json#section_b.10 |
| vo.tb.unit02.section_b.p11 | paragraph | Daniel | 4 | articles/unit02.json#section_b.11 |
| vo.tb.unit02.section_b.p12 | paragraph | Daniel | 2 | articles/unit02.json#section_b.12 |
| vo.tb.unit02.section_b.p13 | paragraph | Daniel | 3 | articles/unit02.json#section_b.13 |
| vo.tb.unit02.section_b.p14 | paragraph | Daniel | 2 | articles/unit02.json#section_b.14 |
| vo.tb.unit02.section_b.p15 | paragraph | Daniel | 2 | articles/unit02.json#section_b.15 |
| vo.tb.unit02.section_c.p01 | paragraph | Flo | 2 | articles/unit02.json#section_c.1 |
| vo.tb.unit02.section_c.p02 | paragraph | Flo | 5 | articles/unit02.json#section_c.2 |
| vo.tb.unit02.section_c.p03 | paragraph | Flo | 3 | articles/unit02.json#section_c.3 |
| vo.tb.unit02.section_c.p04 | paragraph | Flo | 4 | articles/unit02.json#section_c.4 |
| vo.tb.unit02.section_c.p05 | paragraph | Flo | 3 | articles/unit02.json#section_c.5 |
| vo.tb.unit02.section_c.p06 | paragraph | Flo | 2 | articles/unit02.json#section_c.6 |
| vo.tb.unit02.ex.u02_a_pre_reading | instruction | Reed | 3 | exercises/unit02.json#u02_a_pre_reading.instructions |
| vo.tb.unit02.ex.u02_a_understanding | instruction | Reed | 2 | exercises/unit02.json#u02_a_understanding.instructions |
| vo.tb.unit02.ex.u02_a_critical | instruction | Reed | 2 | exercises/unit02.json#u02_a_critical.instructions |
| vo.tb.unit02.ex.u02_a_words_in_use | instruction | Reed | 4 | exercises/unit02.json#u02_a_words_in_use.instructions |
| vo.tb.unit02.ex.u02_a_word_building | instruction | Reed | 4 | exercises/unit02.json#u02_a_word_building.instructions |
| vo.tb.unit02.ex.u02_a_banked_cloze | instruction | Reed | 3 | exercises/unit02.json#u02_a_banked_cloze.instructions |
| vo.tb.unit02.ex.u02_a_expressions_in_use | instruction | Reed | 4 | exercises/unit02.json#u02_a_expressions_in_use.instructions |
| vo.tb.unit02.ex.u02_a_structure_analysis | instruction | Reed | 3 | exercises/unit02.json#u02_a_structure_analysis.instructions |
| vo.tb.unit02.ex.u02_a_structured_writing | instruction | Reed | 4 | exercises/unit02.json#u02_a_structured_writing.instructions |
| vo.tb.unit02.ex.u02_b_reading_skills | instruction | Reed | 2 | exercises/unit02.json#u02_b_reading_skills.instructions |
| vo.tb.unit02.ex.u02_b_understanding_mcq | instruction | Reed | 2 | exercises/unit02.json#u02_b_understanding_mcq.instructions |
| vo.tb.unit02.ex.u02_b_critical | instruction | Reed | 2 | exercises/unit02.json#u02_b_critical.instructions |
| vo.tb.unit02.ex.u02_b_collocation | instruction | Reed | 4 | exercises/unit02.json#u02_b_collocation.instructions |
| vo.tb.unit02.ex.u02_c_translation | instruction | Reed | 2 | exercises/unit02.json#u02_c_translation.instructions |
| vo.tb.unit03.section_a.p01 | paragraph | Samantha | 6 | articles/unit03.json#section_a.1 |
| vo.tb.unit03.section_a.p02 | paragraph | Samantha | 4 | articles/unit03.json#section_a.2 |
| vo.tb.unit03.section_a.p03 | paragraph | Samantha | 4 | articles/unit03.json#section_a.3 |
| vo.tb.unit03.section_a.p04 | paragraph | Samantha | 7 | articles/unit03.json#section_a.4 |
| vo.tb.unit03.section_a.p05 | paragraph | Samantha | 11 | articles/unit03.json#section_a.5 |
| vo.tb.unit03.section_a.p06 | paragraph | Samantha | 8 | articles/unit03.json#section_a.6 |
| vo.tb.unit03.section_a.p07 | paragraph | Samantha | 2 | articles/unit03.json#section_a.7 |
| vo.tb.unit03.section_a.p08 | paragraph | Samantha | 7 | articles/unit03.json#section_a.8 |
| vo.tb.unit03.section_a.p09 | paragraph | Samantha | 6 | articles/unit03.json#section_a.9 |
| vo.tb.unit03.section_b.p01 | paragraph | Daniel | 7 | articles/unit03.json#section_b.1 |
| vo.tb.unit03.section_b.p02 | paragraph | Daniel | 4 | articles/unit03.json#section_b.2 |
| vo.tb.unit03.section_b.p03 | paragraph | Daniel | 8 | articles/unit03.json#section_b.3 |
| vo.tb.unit03.section_b.p04 | paragraph | Daniel | 2 | articles/unit03.json#section_b.4 |
| vo.tb.unit03.section_b.p05 | paragraph | Daniel | 2 | articles/unit03.json#section_b.5 |
| vo.tb.unit03.section_b.p06 | paragraph | Daniel | 5 | articles/unit03.json#section_b.6 |
| vo.tb.unit03.section_b.p07 | paragraph | Daniel | 2 | articles/unit03.json#section_b.7 |
| vo.tb.unit03.section_b.p08 | paragraph | Daniel | 5 | articles/unit03.json#section_b.8 |
| vo.tb.unit03.section_b.p09 | paragraph | Daniel | 3 | articles/unit03.json#section_b.9 |
| vo.tb.unit03.section_b.p10 | paragraph | Daniel | 4 | articles/unit03.json#section_b.10 |
| vo.tb.unit03.section_b.p11 | paragraph | Daniel | 3 | articles/unit03.json#section_b.11 |
| vo.tb.unit03.section_b.p12 | paragraph | Daniel | 5 | articles/unit03.json#section_b.12 |
| vo.tb.unit03.section_b.p13 | paragraph | Daniel | 4 | articles/unit03.json#section_b.13 |
| vo.tb.unit03.section_b.p14 | paragraph | Daniel | 2 | articles/unit03.json#section_b.14 |
| vo.tb.unit03.section_c.p01 | paragraph | Flo | 3 | articles/unit03.json#section_c.1 |
| vo.tb.unit03.section_c.p02 | paragraph | Flo | 3 | articles/unit03.json#section_c.2 |
| vo.tb.unit03.section_c.p03 | paragraph | Flo | 4 | articles/unit03.json#section_c.3 |
| vo.tb.unit03.section_c.p04 | paragraph | Flo | 3 | articles/unit03.json#section_c.4 |
| vo.tb.unit03.section_c.p05 | paragraph | Flo | 9 | articles/unit03.json#section_c.5 |
| vo.tb.unit03.section_c.p06 | paragraph | Flo | 2 | articles/unit03.json#section_c.6 |
| vo.tb.unit03.ex.u03_a_pre_reading | instruction | Reed | 3 | exercises/unit03.json#u03_a_pre_reading.instructions |
| vo.tb.unit03.ex.u03_a_understanding | instruction | Reed | 2 | exercises/unit03.json#u03_a_understanding.instructions |
| vo.tb.unit03.ex.u03_a_critical | instruction | Reed | 2 | exercises/unit03.json#u03_a_critical.instructions |
| vo.tb.unit03.ex.u03_a_words_in_use | instruction | Reed | 4 | exercises/unit03.json#u03_a_words_in_use.instructions |
| vo.tb.unit03.ex.u03_a_word_building | instruction | Reed | 4 | exercises/unit03.json#u03_a_word_building.instructions |
| vo.tb.unit03.ex.u03_a_banked_cloze | instruction | Reed | 3 | exercises/unit03.json#u03_a_banked_cloze.instructions |
| vo.tb.unit03.ex.u03_a_expressions_in_use | instruction | Reed | 4 | exercises/unit03.json#u03_a_expressions_in_use.instructions |
| vo.tb.unit03.ex.u03_a_structure_writing | instruction | Reed | 4 | exercises/unit03.json#u03_a_structure_writing.instructions |
| vo.tb.unit03.ex.u03_b_reading_skills | instruction | Reed | 3 | exercises/unit03.json#u03_b_reading_skills.instructions |
| vo.tb.unit03.ex.u03_b_understanding | instruction | Reed | 2 | exercises/unit03.json#u03_b_understanding.instructions |
| vo.tb.unit03.ex.u03_b_critical | instruction | Reed | 2 | exercises/unit03.json#u03_b_critical.instructions |
| vo.tb.unit03.ex.u03_b_collocation | instruction | Reed | 4 | exercises/unit03.json#u03_b_collocation.instructions |
| vo.tb.unit03.ex.u03_c_translation | instruction | Reed | 1 | exercises/unit03.json#u03_c_translation.instructions |
| vo.tb.unit04.section_a.p01 | paragraph | Samantha | 3 | articles/unit04.json#section_a.1 |
| vo.tb.unit04.section_a.p02 | paragraph | Samantha | 3 | articles/unit04.json#section_a.2 |
| vo.tb.unit04.section_a.p03 | paragraph | Samantha | 5 | articles/unit04.json#section_a.3 |
| vo.tb.unit04.section_a.p04 | paragraph | Samantha | 4 | articles/unit04.json#section_a.4 |
| vo.tb.unit04.section_a.p05 | paragraph | Samantha | 6 | articles/unit04.json#section_a.5 |
| vo.tb.unit04.section_a.p06 | paragraph | Samantha | 5 | articles/unit04.json#section_a.6 |
| vo.tb.unit04.section_a.p07 | paragraph | Samantha | 4 | articles/unit04.json#section_a.7 |
| vo.tb.unit04.section_a.p08 | paragraph | Samantha | 4 | articles/unit04.json#section_a.8 |
| vo.tb.unit04.section_a.p09 | paragraph | Samantha | 5 | articles/unit04.json#section_a.9 |
| vo.tb.unit04.section_b.p01 | paragraph | Daniel | 3 | articles/unit04.json#section_b.1 |
| vo.tb.unit04.section_b.p02 | paragraph | Daniel | 1 | articles/unit04.json#section_b.2 |
| vo.tb.unit04.section_b.p03 | paragraph | Daniel | 2 | articles/unit04.json#section_b.3 |
| vo.tb.unit04.section_b.p04 | paragraph | Daniel | 5 | articles/unit04.json#section_b.4 |
| vo.tb.unit04.section_b.p05 | paragraph | Daniel | 5 | articles/unit04.json#section_b.5 |
| vo.tb.unit04.section_b.p06 | paragraph | Daniel | 3 | articles/unit04.json#section_b.6 |
| vo.tb.unit04.section_b.p07 | paragraph | Daniel | 4 | articles/unit04.json#section_b.7 |
| vo.tb.unit04.section_b.p08 | paragraph | Daniel | 2 | articles/unit04.json#section_b.8 |
| vo.tb.unit04.section_b.p09 | paragraph | Daniel | 5 | articles/unit04.json#section_b.9 |
| vo.tb.unit04.section_b.p10 | paragraph | Daniel | 3 | articles/unit04.json#section_b.10 |
| vo.tb.unit04.section_b.p11 | paragraph | Daniel | 3 | articles/unit04.json#section_b.11 |
| vo.tb.unit04.section_b.p12 | paragraph | Daniel | 6 | articles/unit04.json#section_b.12 |
| vo.tb.unit04.section_b.p13 | paragraph | Daniel | 6 | articles/unit04.json#section_b.13 |
| vo.tb.unit04.section_b.p14 | paragraph | Daniel | 4 | articles/unit04.json#section_b.14 |
| vo.tb.unit04.section_b.p15 | paragraph | Daniel | 1 | articles/unit04.json#section_b.15 |
| vo.tb.unit04.section_b.p16 | paragraph | Daniel | 7 | articles/unit04.json#section_b.16 |
| vo.tb.unit04.section_b.p17 | paragraph | Daniel | 3 | articles/unit04.json#section_b.17 |
| vo.tb.unit04.section_b.p18 | paragraph | Daniel | 3 | articles/unit04.json#section_b.18 |
| vo.tb.unit04.section_b.p19 | paragraph | Daniel | 3 | articles/unit04.json#section_b.19 |
| vo.tb.unit04.section_c.p01 | paragraph | Flo | 3 | articles/unit04.json#section_c.1 |
| vo.tb.unit04.section_c.p02 | paragraph | Flo | 3 | articles/unit04.json#section_c.2 |
| vo.tb.unit04.section_c.p03 | paragraph | Flo | 5 | articles/unit04.json#section_c.3 |
| vo.tb.unit04.section_c.p04 | paragraph | Flo | 4 | articles/unit04.json#section_c.4 |
| vo.tb.unit04.section_c.p05 | paragraph | Flo | 3 | articles/unit04.json#section_c.5 |
| vo.tb.unit04.ex.u04_a_pre_reading | instruction | Reed | 1 | exercises/unit04.json#u04_a_pre_reading.instructions |
| vo.tb.unit04.ex.u04_a_understanding | instruction | Reed | 1 | exercises/unit04.json#u04_a_understanding.instructions |
| vo.tb.unit04.ex.u04_a_critical | instruction | Reed | 1 | exercises/unit04.json#u04_a_critical.instructions |
| vo.tb.unit04.ex.u04_a_words_in_use | instruction | Reed | 3 | exercises/unit04.json#u04_a_words_in_use.instructions |
| vo.tb.unit04.ex.u04_a_word_building | instruction | Reed | 3 | exercises/unit04.json#u04_a_word_building.instructions |
| vo.tb.unit04.ex.u04_a_banked_cloze | instruction | Reed | 2 | exercises/unit04.json#u04_a_banked_cloze.instructions |
| vo.tb.unit04.ex.u04_a_expressions_in_use | instruction | Reed | 3 | exercises/unit04.json#u04_a_expressions_in_use.instructions |
| vo.tb.unit04.ex.u04_a_structure_writing | instruction | Reed | 3 | exercises/unit04.json#u04_a_structure_writing.instructions |
| vo.tb.unit04.ex.u04_b_reading_skills | instruction | Reed | 1 | exercises/unit04.json#u04_b_reading_skills.instructions |
| vo.tb.unit04.ex.u04_b_understanding | instruction | Reed | 1 | exercises/unit04.json#u04_b_understanding.instructions |
| vo.tb.unit04.ex.u04_b_critical | instruction | Reed | 1 | exercises/unit04.json#u04_b_critical.instructions |
| vo.tb.unit04.ex.u04_b_collocation | instruction | Reed | 3 | exercises/unit04.json#u04_b_collocation.instructions |
| vo.tb.unit04.ex.u04_c_translation | instruction | Reed | 1 | exercises/unit04.json#u04_c_translation.instructions |
| vo.tb.unit05.section_a.p01 | paragraph | Samantha | 3 | articles/unit05.json#section_a.1 |
| vo.tb.unit05.section_a.p02 | paragraph | Samantha | 4 | articles/unit05.json#section_a.2 |
| vo.tb.unit05.section_a.p03 | paragraph | Samantha | 2 | articles/unit05.json#section_a.3 |
| vo.tb.unit05.section_a.p04 | paragraph | Samantha | 2 | articles/unit05.json#section_a.4 |
| vo.tb.unit05.section_a.p05 | paragraph | Samantha | 1 | articles/unit05.json#section_a.5 |
| vo.tb.unit05.section_a.p06 | paragraph | Samantha | 2 | articles/unit05.json#section_a.6 |
| vo.tb.unit05.section_a.p07 | paragraph | Samantha | 4 | articles/unit05.json#section_a.7 |
| vo.tb.unit05.section_a.p08 | paragraph | Samantha | 6 | articles/unit05.json#section_a.8 |
| vo.tb.unit05.section_a.p09 | paragraph | Samantha | 5 | articles/unit05.json#section_a.9 |
| vo.tb.unit05.section_a.p10 | paragraph | Samantha | 3 | articles/unit05.json#section_a.10 |
| vo.tb.unit05.section_a.p11 | paragraph | Samantha | 4 | articles/unit05.json#section_a.11 |
| vo.tb.unit05.section_a.p12 | paragraph | Samantha | 2 | articles/unit05.json#section_a.12 |
| vo.tb.unit05.section_b.p01 | paragraph | Daniel | 3 | articles/unit05.json#section_b.1 |
| vo.tb.unit05.section_b.p02 | paragraph | Daniel | 6 | articles/unit05.json#section_b.2 |
| vo.tb.unit05.section_b.p03 | paragraph | Daniel | 5 | articles/unit05.json#section_b.3 |
| vo.tb.unit05.section_b.p04 | paragraph | Daniel | 4 | articles/unit05.json#section_b.4 |
| vo.tb.unit05.section_b.p05 | paragraph | Daniel | 4 | articles/unit05.json#section_b.5 |
| vo.tb.unit05.section_b.p06 | paragraph | Daniel | 6 | articles/unit05.json#section_b.6 |
| vo.tb.unit05.section_b.p07 | paragraph | Daniel | 3 | articles/unit05.json#section_b.7 |
| vo.tb.unit05.section_b.p08 | paragraph | Daniel | 3 | articles/unit05.json#section_b.8 |
| vo.tb.unit05.section_b.p09 | paragraph | Daniel | 4 | articles/unit05.json#section_b.9 |
| vo.tb.unit05.section_b.p10 | paragraph | Daniel | 2 | articles/unit05.json#section_b.10 |
| vo.tb.unit05.section_b.p11 | paragraph | Daniel | 2 | articles/unit05.json#section_b.11 |
| vo.tb.unit05.section_b.p12 | paragraph | Daniel | 2 | articles/unit05.json#section_b.12 |
| vo.tb.unit05.section_c.p01 | paragraph | Flo | 5 | articles/unit05.json#section_c.1 |
| vo.tb.unit05.section_c.p02 | paragraph | Flo | 3 | articles/unit05.json#section_c.2 |
| vo.tb.unit05.section_c.p03 | paragraph | Flo | 3 | articles/unit05.json#section_c.3 |
| vo.tb.unit05.section_c.p04 | paragraph | Flo | 3 | articles/unit05.json#section_c.4 |
| vo.tb.unit05.section_c.p05 | paragraph | Flo | 1 | articles/unit05.json#section_c.5 |
| vo.tb.unit05.section_c.p06 | paragraph | Flo | 2 | articles/unit05.json#section_c.6 |
| vo.tb.unit05.ex.u05_a_pre_reading | instruction | Reed | 2 | exercises/unit05.json#u05_a_pre_reading.instructions |
| vo.tb.unit05.ex.u05_a_understanding | instruction | Reed | 1 | exercises/unit05.json#u05_a_understanding.instructions |
| vo.tb.unit05.ex.u05_a_critical | instruction | Reed | 1 | exercises/unit05.json#u05_a_critical.instructions |
| vo.tb.unit05.ex.u05_a_words_in_use | instruction | Reed | 3 | exercises/unit05.json#u05_a_words_in_use.instructions |
| vo.tb.unit05.ex.u05_a_word_building | instruction | Reed | 3 | exercises/unit05.json#u05_a_word_building.instructions |
| vo.tb.unit05.ex.u05_a_banked_cloze | instruction | Reed | 2 | exercises/unit05.json#u05_a_banked_cloze.instructions |
| vo.tb.unit05.ex.u05_a_expressions_in_use | instruction | Reed | 3 | exercises/unit05.json#u05_a_expressions_in_use.instructions |
| vo.tb.unit05.ex.u05_a_structure_analysis | instruction | Reed | 3 | exercises/unit05.json#u05_a_structure_analysis.instructions |
| vo.tb.unit05.ex.u05_a_structured_writing | instruction | Reed | 3 | exercises/unit05.json#u05_a_structured_writing.instructions |
| vo.tb.unit05.ex.u05_b_reading_skills | instruction | Reed | 2 | exercises/unit05.json#u05_b_reading_skills.instructions |
| vo.tb.unit05.ex.u05_b_understanding | instruction | Reed | 1 | exercises/unit05.json#u05_b_understanding.instructions |
| vo.tb.unit05.ex.u05_b_critical | instruction | Reed | 1 | exercises/unit05.json#u05_b_critical.instructions |
| vo.tb.unit05.ex.u05_b_collocation | instruction | Reed | 3 | exercises/unit05.json#u05_b_collocation.instructions |
| vo.tb.unit05.ex.u05_c_translation | instruction | Reed | 1 | exercises/unit05.json#u05_c_translation.instructions |
| vo.tb.unit06.section_a.p01 | paragraph | Samantha | 6 | articles/unit06.json#section_a.1 |
| vo.tb.unit06.section_a.p02 | paragraph | Samantha | 1 | articles/unit06.json#section_a.2 |
| vo.tb.unit06.section_a.p03 | paragraph | Samantha | 3 | articles/unit06.json#section_a.3 |
| vo.tb.unit06.section_a.p04 | paragraph | Samantha | 2 | articles/unit06.json#section_a.4 |
| vo.tb.unit06.section_a.p05 | paragraph | Samantha | 2 | articles/unit06.json#section_a.5 |
| vo.tb.unit06.section_a.p06 | paragraph | Samantha | 2 | articles/unit06.json#section_a.6 |
| vo.tb.unit06.section_a.p07 | paragraph | Samantha | 5 | articles/unit06.json#section_a.7 |
| vo.tb.unit06.section_a.p08 | paragraph | Samantha | 1 | articles/unit06.json#section_a.8 |
| vo.tb.unit06.section_a.p09 | paragraph | Samantha | 2 | articles/unit06.json#section_a.9 |
| vo.tb.unit06.section_a.p10 | paragraph | Samantha | 3 | articles/unit06.json#section_a.10 |
| vo.tb.unit06.section_a.p11 | paragraph | Samantha | 3 | articles/unit06.json#section_a.11 |
| vo.tb.unit06.section_a.p12 | paragraph | Samantha | 3 | articles/unit06.json#section_a.12 |
| vo.tb.unit06.section_a.p13 | paragraph | Samantha | 5 | articles/unit06.json#section_a.13 |
| vo.tb.unit06.section_a.p14 | paragraph | Samantha | 5 | articles/unit06.json#section_a.14 |
| vo.tb.unit06.section_a.p15 | paragraph | Samantha | 3 | articles/unit06.json#section_a.15 |
| vo.tb.unit06.section_a.p16 | paragraph | Samantha | 2 | articles/unit06.json#section_a.16 |
| vo.tb.unit06.section_a.p17 | paragraph | Samantha | 1 | articles/unit06.json#section_a.17 |
| vo.tb.unit06.section_b.p01 | paragraph | Daniel | 3 | articles/unit06.json#section_b.1 |
| vo.tb.unit06.section_b.p02 | paragraph | Daniel | 9 | articles/unit06.json#section_b.2 |
| vo.tb.unit06.section_b.p03 | paragraph | Daniel | 7 | articles/unit06.json#section_b.3 |
| vo.tb.unit06.section_b.p04 | paragraph | Daniel | 9 | articles/unit06.json#section_b.4 |
| vo.tb.unit06.section_b.p05 | paragraph | Daniel | 6 | articles/unit06.json#section_b.5 |
| vo.tb.unit06.section_b.p06 | paragraph | Daniel | 5 | articles/unit06.json#section_b.6 |
| vo.tb.unit06.section_b.p07 | paragraph | Daniel | 8 | articles/unit06.json#section_b.7 |
| vo.tb.unit06.section_b.p08 | paragraph | Daniel | 4 | articles/unit06.json#section_b.8 |
| vo.tb.unit06.section_c.p01 | paragraph | Flo | 2 | articles/unit06.json#section_c.1 |
| vo.tb.unit06.section_c.p02 | paragraph | Flo | 4 | articles/unit06.json#section_c.2 |
| vo.tb.unit06.section_c.p03 | paragraph | Flo | 2 | articles/unit06.json#section_c.3 |
| vo.tb.unit06.section_c.p04 | paragraph | Flo | 3 | articles/unit06.json#section_c.4 |
| vo.tb.unit06.section_c.p05 | paragraph | Flo | 2 | articles/unit06.json#section_c.5 |
| vo.tb.unit06.section_c.p06 | paragraph | Flo | 1 | articles/unit06.json#section_c.6 |
| vo.tb.unit06.section_c.p07 | paragraph | Flo | 3 | articles/unit06.json#section_c.7 |
| vo.tb.unit06.ex.u06_a_pre_reading | instruction | Reed | 1 | exercises/unit06.json#u06_a_pre_reading.instructions |
| vo.tb.unit06.ex.u06_a_understanding | instruction | Reed | 1 | exercises/unit06.json#u06_a_understanding.instructions |
| vo.tb.unit06.ex.u06_a_critical | instruction | Reed | 1 | exercises/unit06.json#u06_a_critical.instructions |
| vo.tb.unit06.ex.u06_a_words_in_use | instruction | Reed | 3 | exercises/unit06.json#u06_a_words_in_use.instructions |
| vo.tb.unit06.ex.u06_a_word_building | instruction | Reed | 3 | exercises/unit06.json#u06_a_word_building.instructions |
| vo.tb.unit06.ex.u06_a_banked_cloze | instruction | Reed | 2 | exercises/unit06.json#u06_a_banked_cloze.instructions |
| vo.tb.unit06.ex.u06_a_expressions_in_use | instruction | Reed | 3 | exercises/unit06.json#u06_a_expressions_in_use.instructions |
| vo.tb.unit06.ex.u06_a_structure_writing | instruction | Reed | 2 | exercises/unit06.json#u06_a_structure_writing.instructions |
| vo.tb.unit06.ex.u06_b_reading_skills | instruction | Reed | 2 | exercises/unit06.json#u06_b_reading_skills.instructions |
| vo.tb.unit06.ex.u06_b_mcq | instruction | Reed | 1 | exercises/unit06.json#u06_b_mcq.instructions |
| vo.tb.unit06.ex.u06_b_critical | instruction | Reed | 1 | exercises/unit06.json#u06_b_critical.instructions |
| vo.tb.unit06.ex.u06_b_collocation | instruction | Reed | 2 | exercises/unit06.json#u06_b_collocation.instructions |
| vo.tb.unit06.ex.u06_c_translation | instruction | Reed | 1 | exercises/unit06.json#u06_c_translation.instructions |
