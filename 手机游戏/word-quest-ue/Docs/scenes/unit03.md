# 单元 3 · Let's go —— 按真实课文重建的场景设计

数据版（供 UE 搭建脚本读取）：`Content/Data/memory/textbook_scenes/unit03.json`。本文是它的说明。

## 总体做法

- 每篇文章一张关卡：`/Game/Memory/Scenes/U03/L_U03_A`、`L_U03_B`、`L_U03_C`。
- 一篇文章里的多个场景是同一关卡里的多个“记忆布景”，沿 X 轴每隔 60 m 摆一个，四周是暗色记忆虚空。
- 场景之间用“记忆溶解”切换：画面化成光尘，再在下一个布景凝聚。
- 课文段落按场景播放：英文字幕，旁白和人物表演同步。
- 生词附着在场景物件上：走近物件会浮现单词。每篇挂 10 个生词（C 无生词表，不挂）。
- 练习放进对应场景的“断片”里：场景冻结，在画面中作答。
- 只有 Section C 使用 `then` / `now` 两层：C2 讲退休前后的对照（工作与家庭 → 退休后的旅行）。A、B 没有过去与现在的对照，不做覆写层。
- 段号以 `textbook.json` 的 `paragraphs` 为准：A 为 6 段，B 为 13 段；C 故事原文没有段号，按自然段切成 5 段。

## 数据对齐注意（需课文/题库负责人核对）

1. **A 文段号不一致**：`textbook.json` 中 A 只有 6 段，而 `u03_a_understanding` 的中文解析按 9 段标注（“第7–9段”）。本设计按 6 段布景，练习按题目内容挂到最贴近的场景。
2. **A 理解题参考答案与课文不符**：#1（“tedious lesson in the ills of modernity”）和 #2（“face-to-face handshake at a business luncheon”）在 A 原文中找不到对应句，像是别的文章的题。已照常挂在 A2、A6，建议核对题库。
3. **B 搭配题混入 A 文词组**：`u03_b_collocation` 的 #5、#6、#9–#13（foreign travel、disorienting diversity、modern aviation、creative insights、valuable open-mindedness、mental flexibility、globalized world）有的是 A 文原词组。本设计只把与 B 原文相符的（#1–#4、#7、#8）放在对应场景，其余挂在 B4、B6、B8 作为兜底，建议拆分。
4. **C 故事原文在 “But putting” 处截断**：`story.raw` 没有写完（原书续句 “them into practice is the key. Even if you retire…” 缺失）。C 的场景只覆盖到第 5 段，并已在数据中标注。
5. **C 无生词表**：与 unit01 的 C 一致，C 不挂生词。若要挂，需先补 C 的生词表。
6. **B 的印尼段**：B 第 8 段提到印尼少年纠缠，本设计用闪回人物 `flashback_boy`（B5）在同一布景门口表现，不另起场景。

## Text A · The surprising purpose of travel（7 个场景）

| # | 场景 | 段落 | 地点 · 时间 · 光 | 人物 | 关键物件（附着生词） | 断片 / 练习 |
|---|------|------|------------------|------|---------------------|-------------|
| A1 | 为什么要去 | 1 | 客厅，傍晚暖光，窗外昏暗 | 旅客甲坐在扶手椅上压着额头（血压高）；旅客乙在门口拎着箱子 | 墙上热带度假海报（resort_poster）、桌上旅行传单（flyer）、门口行李箱 | pre_reading；understanding #3（“Paris is Paris”） |
| A2 | 比太阳跑得快 | 2 | 机场出发大厅，明亮日光，远处可见天窗 | 乘客甲坐在长椅上候机；乘客乙对着地球仪；柜台后的工作人员 | 大厅（terminal）、地球仪（hemisphere）、出发信息屏、柜台 | understanding #1；expressions_in_use #1–4 |
| A3 | 左岸咖啡馆 | 3–4 | 巴黎咖啡馆露台，午后斜阳 | 旅客坐着托腮沉思；侍者站在旁边 | 甜点盘、咖啡杯（mundane）、笔记本（contemplate） | understanding #4；words_in_use #1–5 |
| A4 | 点头是不，摇头是是 | 7–8 | 保加利亚小餐馆，白墙，暖白光 | 两位当地人隔桌对坐：一人点头，一人摇头 | 墙上“是 / 不是”图表（versus）、咖啡杯 | understanding #5、#6 |
| A5 | 陌生的标识 | 5–6 | 火车站售票窗，冷白光，墙上多语种标识 | 售票员站在窗口；旅客在长椅上 | 多语种标识（diversity）、世界地图（latitude）、售票窗口、行李箱 | understanding #7；word_building |
| A6 | 丢失的行李与风景 | 9 | 行李提取区，明亮日光，墙上是马丘比丘山景壁画 | 旅客甲在传送带旁等；工作人员站在柜台后；旅客乙看壁画 | 传送带（drawback）、卢浮宫展牌（louvre）、行李箱 | understanding #2、#8；expressions_in_use #5–8 |
| A7 | 家还是那个家 | 9 | 客厅，夜晚暖黄灯，箱子已经打开 | 旅客看书；家人在对面说话 | 书架顶上的纪念品盒（keepsake）、沙发、茶几、行李箱 | words_in_use #6–10；banked_cloze；critical；structure_writing |

## Text B · Traveling solo（8 个场景）

| # | 场景 | 段落 | 地点 · 时间 · 光 | 人物 | 关键物件（附着生词） | 断片 / 练习 |
|---|------|------|------------------|------|---------------------|-------------|
| B1 | 准备出发 | 1 | 书房，夜里台灯，墙上挂中国风景海报 | 叙述者坐在书桌前查资料 | 海报（长城、故宫）、雕像（venerable）、行李箱（solo）、书桌台灯 | reading_skills #1 |
| B2 | 没人能陪我去 | 2–3 | 客厅，白天冷光 | 姐姐挺着孕肚坐在沙发上（pregnant）；叙述者在扶手椅上打电话 | 沙发（pregnant）、茶几、手机、墙上日历 | reading_skills #2；collocation #1–2 |
| B3 | 之字形的路线 | 4–5 | 餐桌旁，墙上亚洲地图，暖光 | 两位朋友与叙述者围桌，一人说话，一人听 | 亚洲地图（zigzag）、对话气泡（inconceivable）、餐具 | understanding #1；collocation #3 |
| B4 | 招待所前台与宴席 | 6–7 | 大学招待所前台，中午暖光 | 前台职员；年轻女子从办公室走出；朋友围坐宴席 | 前台（bilingual）、门、宴席长桌、杯子 | understanding #2；collocation #5–6 |
| B5 | 日本的四个女孩 | 8 | 日式公寓，夜里暗光 | 四个女孩睡在地铺上，其中一人打鼾（snore）；叙述者坐在茶几旁；闪回的少年 | 地铺（snore）、茶几、闪回人物 | understanding #3；reading_skills #3；collocation #4 |
| B6 | 意大利旅馆的多收费 | 9 | 旅馆前台，白天室内光 | 前台职员；叙述者争辩 | 账单（irritated）、墙上时钟、墙上海报、前台 | collocation #9–10 |
| B7 | 干草车后面 | 10–11 | 室外道路，明亮日光 | 叙述者坐在干草车上；卡车车斗里坐着英国人、两位澳大利亚人、两位挪威人 | 干草车、干草捆（hay）、卡车车斗 | understanding #4；collocation #7–8 |
| B8 | 带着开放的心跳进去 | 12–14 | 城市十字路口，黄昏日光，远处城市天际线 | 叙述者背着背包准备出发 | 警示牌（caution）、背包、天际线 | understanding #5–8；critical；collocation #11–13 |

## Section C · Touring the world（6 个场景，then / now 对照）

| # | 场景 | 段落 | 地点 · 时间 · 光 | 人物 | 关键物件 | 断片 / 练习 |
|---|------|------|------------------|------|----------|-------------|
| C1 | 护照 | 1 | 书房，白天冷光，墙上世界地图 | 张（Zhang）与王（Wang）在书桌旁，两人都六十来岁 | 护照摞（三叠）、世界地图、背包 | 无 |
| C2 | 过去与现在 | 2 | 同一个房间：`then` 层为办公桌、文件、手机和一个人在工作；`now` 层覆写为餐桌、存折和背包，两人在谈计划 | 张（then 工作、now 讲话）、王（now 站着） | `then`：办公桌、文件堆、手机、椅子；`now`：餐桌（覆写办公桌）、存折（覆写文件堆）、背包（覆写手机） | 无（见下方 then/now 说明） |
| C3 | 虎跳峡 | 3 | 峡谷村口，正午烈日 | 张与王站在山道上；外国游客用英语说话 | 峡谷背景、村屋、步道、路牌、背包 | 无 |
| C4 | 雅典机场迷路 | 4 | 机场大厅，白天室内光 | 张与王在大厅里看告示牌；工作人员站在一旁 | 大厅、出发信息屏、行李车、行李箱、长椅 | 无 |
| C5 | 海拔 5200 米的大本营 | 5 | 珠峰大本营，强日光，雪峰背景，地面一条赤道线 | 张与王在帐篷旁聊天 | 雪峰、大本营帐篷、赤道线 | 无 |
| C6 | 灯下的丽江 | 5–6 | 夜晚书桌，台灯，明信片 | 叙述者坐在书桌前 | 明信片（丽江）、笔记本、笔记本电脑、台灯 | translation（丽江古城段） |

**then / now 说明（只在 C2 使用）**：`then` 物件先凝聚；`now` 物件与 `then` 物件同位置覆写（办公桌→餐桌、文件堆→存折、手机→背包）。数据已校验：每个 `then` 物件都有位置相同的 `now` 物件覆写。

## Unit project

本次输入没有提供 unit03 的 project 任务内容，本设计未编写。待课文 project 页给出后，再补充为单元结尾的任务卡。

## 物件库（Blender 代码建模 → FBX → UE）

复用 unit01 已有的 26 个物件名（如 wall、window_wall、rug、bookshelf、floor_lamp、coffee_table、armchair、sofa、door、chair、bench、cafe_table、coffee_cup、dining_table、home_desk、office_desk、office_chair 等），尺寸与 unit01 保持一致。

**新增物件（37 个，尺寸单位 m，[宽, 深, 高]）**：

- 旅行与机场：flyer [0.21,0.30,0.005]、suitcase [0.6,0.4,0.25]、terminal_hall [14,6,5]、departure_board [2.0,0.1,1.0]、globe [0.45,0.45,0.9]、luggage_carousel [4.0,1.2,0.9]、luggage_trolley [0.6,0.5,1.0]、museum_plaque [0.5,0.05,0.8]、mountain_mural [14,0.4,6]、backpack [0.35,0.25,0.5]、passport_stack [0.12,0.09,0.05]、passbook [0.12,0.17,0.02]、postcard [0.15,0.1,0.005]、trail_sign [0.6,0.05,0.5]、trail_path [12,3,0.02]、gorge_valley [24,4,10]、village_house [3.0,2.0,2.5]、snow_peak [24,4,8]、base_camp_tent [2.4,2.0,1.4]、equator_line [12,0.05,0.01]
- 咖啡馆与标识：bistro_facade [12,0.4,4.0]、dessert_plate [0.22,0.22,0.06]、yes_no_chart [1.6,0.03,1.0]、multilingual_sign [2.4,0.05,1.2]、world_map [2.0,0.03,1.4]、wall_poster [1.4,0.03,1.0]、wall_clock [0.4,0.05,0.4]、speech_bubble [0.5,0.03,0.3]、road_sign [0.6,0.03,0.6]、bill_slip [0.2,0.14,0.005]
- 人物与家居：keepsake_box [0.3,0.2,0.18]、statue_figure [0.3,0.3,0.5]、reception_desk [2.2,0.7,1.05]、futon [1.9,0.9,0.12]、hay_wagon [3.0,1.6,1.0]、hay_bale [0.9,0.5,0.4]、truck_bed [4.5,2.2,0.9]

**新增姿势（16 个）**：lie_read、lie_sleep、nod、shake_head、sit_contemplate、sit_hay、sit_map、sit_pregnant、sit_stressed、sit_truck、sit_wait、stand_argue、stand_menace、stand_pack、stand_ready、walk_out。

**附着生词（共 20 个）**：A：terminal、hemisphere、contemplate、mundane、versus、diversity、latitude、drawback、louvre、keepsake；B：solo、venerable、pregnant、zigzag、inconceivable、bilingual、snore、irritated、hay、caution。
