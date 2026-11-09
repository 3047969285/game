# 单元 2 · Life stories —— 按真实课文重建的场景设计

数据版（供 UE 搭建脚本读取）：`Content/Data/memory/textbook_scenes/unit02.json`。本文是它的说明，格式与 `Docs/scenes/unit01.md` 一致。

## 总体做法

- 每篇文章一张关卡：`/Game/Memory/Scenes/U02/L_U02_A`、`L_U02_B`、`L_U02_C`。
- 一篇文章里的多个场景是同一关卡里的多个“记忆布景”，沿 X 轴每隔 60 m 摆一个（origin = [i×60, 0, 0]），四周是暗色记忆虚空。
- 场景之间用“记忆溶解”切换；课文段落按场景播放，英文字幕，旁白与人物表演同步。
- 生词附着在场景物件上（JSON 的 `word` 字段，小写词头）：走近物件会浮现单词。
- 练习放进对应场景的“断片”里：场景冻结，在画面中作答。
- then / now 覆写只用在 Text A：第 1 段是 1999 年的帕泰岛（now），第 2–3 段与 第 11 段的“六百年前的船队”（then）与“今天的博物馆”（now）形成对照。Text B 与 Text C 是顺序叙事，童年与晚年、战时与后来的场景各自独立布景，不做覆写。

## 数据核对（实施前请看）

- **Text A 段落数据有误**：`textbook.json` 的 `A.article.paragraphs` 只有 7 段，第 1、2 段（帕泰岛、船队规模）缺失，第 4/5 段与第 10/11 段被合并。本设计按 `pages/page_047.txt`–`page_049.txt` 的原文划为 11 段，与练习里的 “Para. 3 / Para. 10” 等段号一致。建议修正 `textbook.json`。
- **Text C 无段号、无生词表**：`C.story.raw` 没有自然段编号，本设计按原文自然段编号 1–6（仅用于本设计）；C 没有 new words 列表，因此 C 不附着生词。
- Text B 的 14 段与 `textbook.json` 一致。
- 本单元是叙事与传记，没有 “essay” 式的举例段，所以场景是“每个地点/时刻一景”，不按举例拆分。

## Text A · Zheng He（郑和），8 个场景

| # | 场景 | 段落 | 地点 · 时间 · 光 | 人物 | 关键物件（附着生词） | 断片 / 练习 |
|---|------|------|------------------|------|---------------------|-------------|
| A1 | 帕泰岛 | 1 | then：礁石上搁浅的旧帆船、长颈鹿；now：肯尼亚外海小岛石屋村，1999 年午后，阳光、密林 | 记者、几位老人（now）；水手（then） | 石屋（descendant）、长椅上的瓷瓶（porcelain）、记者的笔记本（vague）、碎瓷片堆 | Understanding Q1 |
| A2 | 印度洋上的船队 | 2–3 | 六百年前的大洋，蓝海，强光 | 郑和站在宝船甲板上，水手 | 宝船（junk）、补给船（escort）、巡逻艇（patrol）、哥伦布的 Santa Maria 作对比、葡萄牙轻帆船 | Understanding Q2–Q3 |
| A3 | 少年郑和的书房 | 4 | 云南家中，室内暖光，壁上四幅肖像 | 祖父、父亲讲远行，少年郑和盘腿听 | 四幅肖像（Confucius、Zhang Qian、Zheng He、Li Shizhen）、书架与经书 | Pre-reading；Understanding Q4 |
| A4 | 造船坞与水密舱 | 5 | 造船坞，白天，阳光 | 两名工匠 | 船体剖面（hull）、压舱石（ballast）、四道水密隔舱 | Word building |
| A5 | 1405 年的诏书 | 6 | 港口码头，皇家牌楼，晴朗 | 皇帝、郑和、两名水手 | 满载的木箱（丝绸、瓷器、漆器）、丝绸卷 | Understanding Q5；Expressions in use；Structure analysis（第 4–8 段时间信号） |
| A6 | 异国港口与马林迪 | 7–8 | 左：外国港口的沙滩与市集，会谈；右：马林迪码头，宝船停靠，夕阳 | 两位外国统治者、郑和（会谈）；当地向导、水手 | 会谈桌（diplomatic）、香料袋、笼中异兽 | Understanding Q6；Banked cloze |
| A7 | 衰落与影响 | 9–10 | 左：干船坞与长城工地，阴天；右：海图桌，午后 | 工人、士兵；郑和在海图前；水手 | 干船坞（maintenance）、长城段、罗盘、火药桶、海图 | Understanding Q7–Q8；Words in use |
| A8 | 今天 | 11 | then：大洋上的宝船幻影；now：现代博物馆展厅，室内暖灯 | 两名参观者、讲解员 | 宝船模型、展牌 | Critical thinking；Structured writing |

生词分布：porcelain、descendant、vague（A1）；junk、escort、patrol（A2）；hull、ballast（A4）；diplomatic（A6）；maintenance（A7）。共 10 个。

## Text B · Audrey Hepburn（赫本），8 个场景

| # | 场景 | 段落 | 地点 · 时间 · 光 | 人物 | 关键物件（附着生词） | 断片 / 练习 |
|---|------|------|------------------|------|---------------------|-------------|
| B1 | 银幕前的赫本 | 1–2 | 影棚，白炽灯，墙上 UNICEF 旗与电影海报 | 赫本、导演、摄影组 | 化妆镜（portray）、摄影机、灯 | MCQ 1 |
| B2 | 战时的街头与地下室 | 3–4 | 左：被占领的街头，阴天、灰冷光；右：地下室，昏暗 | 士兵、幼年赫本（奔跑、蜷缩） | 占领旗、草堆（huddle）、难民包袱（refugee） | Reading 1；MCQ 2–3 |
| B3 | 芭蕾学校 | 5 | 舞蹈教室，早晨，窗光 | 老师、赫本练功、制作人 | 把杆（rigorous）、钢琴 | Reading 2；MCQ 4 |
| B4 | 颁奖之夜 | 6 | 颁奖礼台，聚光，观众席 | 导演、赫本、两名观众 | 奖杯、讲台、幕布 | Reading 3 |
| B5 | 瑞士的家与花园 | 7–8 | 瑞士花园，正午阳光，花坛、长椅 | 赫本与两个儿子 | 相册（cherish） | Reading 4–5；MCQ 5 |
| B6 | UNICEF 任务 | 9–11 | 左：办公室，赫本签下“一美元”合约；右：救援营地，卡车、帐篷、尘土 | 赫本（两处）、出版商、孩子 | 救援卡车（outreach）、粮箱（humanitarian）、帐篷（bleak） | Reading 6；MCQ 6–7 |
| B7 | 最后的圣诞与告别 | 12–13 | 左：客厅，圣诞树；右：卧室，床边，晨光 | 赫本、罗比与儿子；卧床的赫本与设计师 | 床（serene）、圣诞树 | Reading 7；Collocation |
| B8 | 纪念墙 | 14–15 | 纪念厅，暖光，墙上的赫本名言 | 两名学生、讲解员 | 名言墙、花坛、长椅 | Reading 8；MCQ 8；Critical thinking |

生词分布：portray（B1）；refugee、huddle（B2）；rigorous（B3）；cherish（B5）；outreach、humanitarian、bleak（B6）；serene（B7）。共 9 个。

## Text C · Mei Lanfang（梅兰芳），6 个场景（Stories of China）

| # | 场景 | 段落 | 地点 · 时间 · 光 | 人物 | 关键物件 | 断片 / 练习 |
|---|------|------|------------------|------|---------|-------------|
| C1 | 后台化妆镜 | 1 | 戏班后台，化妆灯泡，暖光 | 梅兰芳（镜前）、助手 | 化妆镜、名牌、服装架 | — |
| C2 | 童年学戏与首演 | 2 | 排练厅与小舞台，幕布，织布机 | 少年梅兰芳、老师、父亲与祖父 | 织布机（《天女散花》首演） | — |
| C3 | 黄金时代的戏班 | 3 | 大剧场，白昼光，剧团横幅 | 演员、两名剧评家、观众 | 戏班横幅、长凳 | — |
| C4 | 1927 年票选 | 4 | 投票场，统计桌，灯光 | 四大名旦（dan_1–4）、计票员、两名观众 | 票箱、海报 | — |
| C5 | 现代舞台与卓别林 | 5 | 现代化舞台，聚光灯，布景 | 梅兰芳、卓别林、技师 | 聚光灯架、灯控台、布景 | — |
| C6 | 胡须 | 6 | 占领区的会客室，冷光，告示牌 | 梅兰芳、两名要求他表演的日方人员 | 告示牌、会谈桌 | Translation（春晚段落） |

本篇没有生词列表，C 场景不附着生词。

## Unit project

撰写一篇人物侧写（profile article）：选一位对社会有贡献的中国人，聚焦一个特质或成就，按时间或主题组织正文。

## 物件库（新增 kit，Blender 代码建模 → FBX → UE）

本单元复用了 unit01 的 22 个 kit（扶手椅、棋盘、墙、书架、桌椅、床、树等），新增 74 个如下（尺寸为 `size` [宽, 深, 高]，单位米）：

| kit | size |
|---|---|
| `animal_cage` | [2, 1.2, 1.8] |
| `award_statue` | [0.4, 0.4, 0.9] |
| `ballast_stones` | [1.2, 0.8, 0.5] |
| `ballet_barre` | [6, 0.1, 1.1] |
| `ballot_box` | [0.6, 0.4, 0.5] |
| `bed` | [2.2, 1.5, 0.6] |
| `bulkhead_wall` | [3.2, 0.15, 3.2] |
| `caravel_ship` | [5.5, 16, 15] |
| `cargo_crate` | [1, 0.8, 0.8] |
| `cellar_wall` | [6, 0.2, 2.6] |
| `chart_table` | [2, 1.2, 0.85] |
| `christmas_tree` | [1.4, 1.4, 2.2] |
| `compass_instrument` | [0.2, 0.2, 0.05] |
| `costume_rack` | [1.6, 0.6, 1.8] |
| `dense_trees` | [4, 8, 6] |
| `dressing_table` | [1.8, 0.6, 0.75] |
| `drum_set` | [1, 0.8, 1] |
| `dry_dock` | [14, 4, 1.5] |
| `dry_well` | [1.4, 1.4, 1.2] |
| `film_camera` | [0.6, 1, 1.4] |
| `film_poster` | [1.2, 0.03, 1.8] |
| `flower_bed` | [4, 1.2, 0.4] |
| `food_crate` | [1, 0.8, 0.8] |
| `garden_plot` | [12, 8, 0.02] |
| `giraffe` | [2.2, 0.9, 3.4] |
| `great_wall_segment` | [14, 1.2, 4] |
| `gunpowder_barrel` | [0.6, 0.6, 0.7] |
| `house_facade` | [8, 0.4, 4] |
| `hull_section` | [3.5, 10, 4] |
| `imperial_pavilion` | [8, 5, 5] |
| `lighting_desk` | [1.2, 0.6, 1] |
| `makeup_mirror` | [0.6, 0.1, 0.8] |
| `museum_hall` | [10, 6, 4] |
| `museum_plaque` | [0.6, 0.03, 0.4] |
| `name_placard` | [0.6, 0.03, 0.3] |
| `notice_board` | [2, 0.05, 1.4] |
| `occupation_banner` | [1, 0.03, 1.4] |
| `opera_poster` | [2, 0.03, 2.4] |
| `patrol_boat` | [2.5, 7, 3] |
| `piano` | [1.6, 0.7, 1.1] |
| `porcelain_vase` | [0.22, 0.22, 0.38] |
| `portrait_frame` | [0.5, 0.04, 0.6] |
| `poster_board` | [2, 0.05, 1.2] |
| `quay` | [14, 4, 0.4] |
| `quote_wall` | [6, 0.1, 2.4] |
| `reef_rocks` | [10, 3, 0.6] |
| `refugee_bundle` | [0.5, 0.4, 0.4] |
| `relief_tent` | [3, 2.5, 2.2] |
| `relief_truck` | [5, 2.2, 2.6] |
| `sand_beach` | [14, 5, 0.02] |
| `sea_water` | [60, 50, 0.02] |
| `set_backdrop` | [6, 0.1, 4] |
| `shard_pile` | [0.8, 0.6, 0.03] |
| `shipyard_scaffold` | [12, 4, 9] |
| `silk_bolt` | [0.4, 0.4, 0.25] |
| `spice_sack` | [0.5, 0.35, 0.3] |
| `spotlight_rig` | [8, 0.4, 0.6] |
| `stage_curtain` | [8, 0.1, 4] |
| `stage_platform` | [8, 4, 0.8] |
| `stage_platform_small` | [6, 4, 0.6] |
| `stage_podium` | [1.2, 0.6, 1.1] |
| `stage_riser` | [12, 3, 0.5] |
| `stone_hut` | [3, 3, 2.4] |
| `straw_bed` | [1.6, 1, 0.3] |
| `studio_light` | [0.5, 0.5, 2] |
| `supply_ship` | [6, 16, 12] |
| `treasure_ship` | [9, 30, 26] |
| `treasure_ship_model` | [3, 1, 2.6] |
| `troupe_banner` | [3, 0.03, 2] |
| `unicef_banner` | [1.2, 0.03, 0.8] |
| `vanity_bulbs` | [3, 0.1, 0.2] |
| `weaving_loom` | [1.4, 0.8, 1.6] |
| `world_map` | [4, 0.05, 2.6] |
| `wrecked_junk` | [16, 5, 8] |
