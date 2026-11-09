# 单元 5 · China's space dream —— 按真实课文重建的场景设计

数据版（供 UE 搭建脚本读取）：`Content/Data/memory/textbook_scenes/unit05.json`。本文是它的说明。

## 总体做法

- 每篇文章一张关卡：`/Game/Memory/Scenes/U05/L_U05_A`、`L_U05_B`、`L_U05_C`。
- 一篇文章里的多个场景是同一关卡里的多个“记忆布景”，沿 X 轴每隔 60 m 摆一个（origin = [i×60, 0, 0]），四周是暗色记忆虚空。
- 场景之间用“记忆溶解”切换；课文段落按场景播放，英文字幕，旁白与人物表演同步。
- Text A 是叙事：8 个场景，按事件发生的地点与时刻划分（训练、升空、舱门、轨道、颁奖、操场）。
- Text B 是“过去 / 现在”对照的说明文：布景分 `then` 和 `now` 两层，读到对应句子时 now 覆写 then。
- Section C 是以例证展开的说明文：每个例子一个场景；C5（古今观测）、C7（电视到卫星）为 then / now 对照。
- 生词挂在物件上：走近物件会浮现单词。A 挂 10 个，B 挂 9 个，C 挂 7 个。
- 练习放进对应场景的“断片”里：场景冻结，在画面中作答。14 个练习 id 全部分配到场景中。

## Text A · No limit for China's astronauts（8 个场景）

| # | 场景 | 段落 | 地点 · 时间 · 光 | 人物 | 关键物件（附着生词） | 断片 / 练习 |
|---|---|---|---|---|---|---|
| A1 | 天宫课堂<br>*Lecture from orbit* | 1、4 | 中学教室 · 白天 · 冷白室内光 | 老师站在讲台前指向投影屏；三名学生坐在课桌后看屏 | 投影屏（extravehicular：舱外活动画面）、白板、课桌×3、课本 | `u05_a_pre_reading#1-5`、`u05_a_understanding#1`、`u05_a_expressions_in_use#4` |
| A2 | 一年六十门课<br>*One year, sixty subjects* | 2、5–6 | 训练中心自习室 · 白天 · 冷白室内光 | 两名学员坐在阅读桌旁读书；教员站在白板前 | 书架、阅读桌、试卷堆×2、课本（astronautics：航天学）、白板、落地灯 | `u05_a_understanding#2`、`u05_a_critical#2`、`u05_a_word_building#1-2`、`u05_a_words_in_use#8` |
| A3 | 水池与离心机<br>*Pool and centrifuge* | 7 | 训练馆 · 白天 · 冷白室内光；左侧失重水池，右侧离心机 | 水中穿舱内服的学员；池边长椅上喘息的学员；离心机舱内的学员；教练 | 训练水池（weightlessness）、航天服、长椅、离心机（centrifuge）、控制台、急停键（halt） | `u05_a_understanding#5`、`u05_a_words_in_use#3` |
| A4 | 神舟五号升空<br>*Shenzhou-5 ascent* | 3、8 | 发射场 · 黎明 · 暖日光；左侧发射塔、中间火箭、右侧为舱内景 | 杨利伟坐在舱内；两名地面人员站在台下 | 发射塔（ascend）、火箭、发射台、返回舱与舱内仪表台 | `u05_a_understanding#3`、`u05_a_words_in_use#4-5`、`u05_a_banked_cloze#5-7` |
| A5 | 神舟七号舱门<br>*Hatch* | 8 | 轨道舱内壁 · 昏暗暖光（警示光） | 翟志刚、刘伯明站在舱门前 | 舱门、撬动工具（grit）、舱内控制台、国旗 | `u05_a_understanding#6`、`u05_a_expressions_in_use#6`、`u05_a_word_building#5-7` |
| A6 | 轨道窗口<br>*View from orbit* | 9 | 轨道舱 · 冷蓝光；舷窗外是地球 | 刘旺站在舷窗前 | 舷窗（unforgettable）、地球、仪表屏、控制台 | `u05_a_word_building#3`、`u05_a_critical#1`、`u05_a_words_in_use#6-7` |
| A7 | 奖章·来信·纽约<br>*Medal, letters, New York* | 10–11 | 三个并列布景：颁奖台（黄昏暖光）、室内书桌、纽约街头 | 荆海鹏领奖，两名工程师观礼；王亚平在书桌前读信；杨利伟与一位华裔在纽约街头相握 | 颁奖台、奖章盒（feat）、书桌、来信堆×2、店面、玻璃幕墙大楼、街道 | `u05_a_understanding#4`、`u05_a_understanding#7`、`u05_a_banked_cloze#1-4`、`u05_a_expressions_in_use#1-3`、`u05_a_words_in_use#1-2` |
| A8 | 没有极限·操场仰望<br>*No limit* | 12 | 操场 · 黄昏暖光 · 远处火箭 | 三名孩子：荡秋千、仰望旗帜、坐在长椅上；另一名孩子奔跑 | 秋千、长椅与书包、旗杆、国旗（rejuvenation）、远处火箭 | `u05_a_understanding#8`、`u05_a_critical#3`、`u05_a_word_building#4`、`u05_a_banked_cloze#8-10`、`u05_a_expressions_in_use#5`、`u05_a_expressions_in_use#7-8`、`u05_a_words_in_use#9-10`、`u05_a_structure_analysis`、`u05_a_structured_writing` |

## Text B · Chang'e-4 kicked off a new space odyssey（8 个场景，then / now 覆写）

| # | 场景 | 段落 | 地点 · 时间 · 光 | 人物 | 关键物件（附着生词） | 断片 / 练习 |
|---|---|---|---|---|---|---|
| B1 | 月背的荒原<br>*The far side* | 1、3 | 月球背面 · 夜（无大气，冷灰日光） | 我（观察者） | 月面（desolate）、嫦娥四号着陆器、巡视器、陨石坑（crash）、陨石 | `u05_b_understanding#2`、`u05_b_collocation#1-3` |
| B2 | 月亮与梦<br>*Moon in legend and plan* | 2、6 | 古代庭院（then）→ 现代室内（now）· 夜 · 月光 | then：诗人坐石凳读书、另一位仰望月亮；now：工程师指向进度板，另一位在办公桌前 | then：墙、诗卷（mythology）、茶几、玉兔（jade）、石凳；now：任务进度板、办公桌、显示器、椅子；天上：月亮圆盘（captivating） | `u05_b_reading_skills#1`、`u05_b_understanding#1`、`u05_b_understanding#5` |
| B3 | 第一次看见月背<br>*First looks at the far side* | 4 | 月背夜景；then 为 1959 与 1968 布景，now 为嫦娥四号 | then：苏联工程师、三名阿波罗 8 号宇航员；now：两名工程师 | then：月球三号探测器（spacecraft）、阿波罗 8 号指令舱（轨道上）；now：嫦娥四号着陆器 | `u05_b_understanding#3` |
| B4 | 竞赛与重启<br>*Race, then restart* | 5 | 控制室 · 冷白光；then 为两侧布景，now 为三座控制台 | then：美国与苏联的工程师各站在控制台前；now：三国科学家站在控制台前 | then：两座控制台、两面国旗；now：三座控制台、三面国旗 | `u05_b_understanding#4` |
| B5 | 从嫦娥一号到嫦娥三号<br>*Chang'e-1 to Chang'e-3* | 7 | 月面 · 夜；then 为轨道，now 为近月面 | then：2007 年的工程师；now：2013 年指向着陆器的工程师 | then：嫦娥一号卫星（轨道上）；now：嫦娥三号着陆器、巡视器 | `u05_b_understanding#6` |
| B6 | 鹊桥与崎岖的地形<br>*Relay and rugged terrain* | 8 | 月背崎岖地形 · 夜 | 工程师抬头看鹊桥；专家指向中继星 | 鹊桥中继星（relay）、嫦娥四号着陆器、环形山 | `u05_b_understanding#7`、`u05_b_understanding#8`、`u05_b_collocation#4-7` |
| B7 | 国际仪器与微型生态圈<br>*Instruments and a mini biosphere* | 9、10 | 实验室 · 冷白光 | 一位国际科学家指向仪器；我与访客在微型生态圈前观看 | 四个仪器箱（瑞典、德国、荷兰、沙特，四面国旗区分）、微型生态圈（biosphere）内的幼苗、测温装置、着陆器 | `u05_b_critical#1`、`u05_b_collocation#8-10` |
| B8 | 深空的第一站<br>*Outpost and the next step* | 11–12 | 天文台屋顶 · 黄昏暖光 · 远处月面 | 一名学生站在望远镜旁，一名学生坐在长椅上仰望，我站在屋顶边 | 天文望远镜、长椅与笔记本、远处月面基地（outpost）、月球圆盘 | `u05_b_critical#2`、`u05_b_critical#3`、`u05_b_collocation#11-14` |

## Section C · China aims for peaceful use of space exploration（8 个场景，C5 / C7 为 then / now）

| # | 场景 | 段落 | 地点 · 时间 · 光 | 人物 | 关键物件（附着生词） | 断片 / 练习 |
|---|---|---|---|---|---|---|
| C1 | 月壤样本<br>*Chang'e-5 sample lab* | 1 | 实验室 · 冷白光 | 研究员指向样本罐；我在一旁观看 | 任务进度板（milestone）、样本罐、月岩样本（lunar）、实验台、监控屏 | — |
| C2 | 天宫核心舱发射<br>*Tiangong core module launch* | 1 | 发射场 · 黎明 · 暖日光 | 地面工程师在发射台边待命；我抬头看火箭 | 天宫核心舱（横放在转运台上）、长征五号重型火箭（gigantic）、发射塔 | — |
| C3 | 火星上的天问一号与祝融号<br>*Mars: rover and orbiter* | 1 | 火星表面 · 赭色天空 | 工程师抬头看环绕器；另一名工程师在巡视器旁 | 祝融号巡视器、岩石、天问一号环绕器（accomplish） | — |
| C4 | 中俄签署路线图<br>*Road map signing* | 1 | 会议厅 · 冷白光 | 双方代表坐在会议桌前签字；随员站在一旁 | 会议桌、两国国旗、路线图文件（blueprint）、椅子 | — |
| C5 | 古人仰望星空与今天的观测<br>*Ancient astronomers, modern telescopes* | 2 | 观星台（then）→ 射电望远镜（now）· 黄昏 | then：古代天文学家仰望星空；now：现代天文学家仰望天空 | then：石台、浑天仪（momentous）、圭表；now：射电望远镜 | — |
| C6 | 新的前沿：能源与污染<br>*New frontier: energy and pollution* | 3 | 城市边缘 · 正午 | 我仰望天空；两位市民在太阳能阵列前交谈，一人指向烟囱 | 城市天际线、烟囱、太阳能阵列、地球仪 | — |
| C7 | 从电视到卫星<br>*From TV to satellites* | 4 | 客厅 · 暖室内光；then 为 20 世纪布景，now 为现代布景 | then：父母与孩子在沙发上看电视；now：父母看平板，孩子看手机 | then：电视机、电视柜、固定电话、茶几；now：平板、卫星接收天线（feat） | — |
| C8 | 人类命运共同体<br>*Shared future* | 5–6 | 广场 · 黎明 · 暖日光 | 四名市民在广场上交谈、仰望天空 | 五面国旗、地球仪，远景天宫核心舱与国际月球科研站 | `u05_c_translation` |

## 单元项目

课文数据（`textbook.json`）中没有第 150 页项目页的内容，本设计不含项目卡，待补。

## 新增物件（尺寸单位 m，[宽, 深, 高]；第 1 单元已有的物件沿用原尺寸）

| 物件 | 尺寸 |
|---|---|
| `moon_surface` | [40.0, 30.0, 0.02] |
| `lunar_lander` | [3.0, 3.0, 2.2] |
| `lunar_rover` | [1.5, 1.0, 0.9] |
| `crater_rim` | [8.0, 8.0, 1.2] |
| `meteorite` | [0.6, 0.6, 0.5] |
| `moon_disc` | [6.0, 0.1, 6.0] |
| `jade_rabbit` | [0.35, 0.25, 0.4] |
| `poem_scroll` | [0.6, 0.03, 1.4] |
| `mission_board` | [2.4, 0.1, 1.6] |
| `luna_3_probe` | [1.4, 1.4, 1.6] |
| `apollo_capsule` | [3.9, 3.9, 3.2] |
| `mission_console` | [2.0, 0.8, 1.2] |
| `chang_e1_orbiter` | [2.2, 2.0, 2.2] |
| `relay_satellite` | [3.5, 2.5, 3.0] |
| `instrument_box` | [0.8, 0.6, 0.5] |
| `biosphere_canister` | [0.8, 0.8, 0.9] |
| `plant_sprout` | [0.3, 0.3, 0.25] |
| `moon_outpost` | [6.0, 5.0, 3.0] |
| `observatory_deck` | [8.0, 6.0, 0.8] |
| `telescope` | [0.5, 0.5, 1.4] |
| `spacecraft_cabin` | [2.6, 2.6, 2.4] |
| `rocket` | [3.35, 3.35, 58.0] |
| `launch_pad` | [30.0, 24.0, 1.2] |
| `launch_tower` | [14.0, 10.0, 60.0] |
| `heavy_rocket` | [5.0, 5.0, 60.0] |
| `tiangong_core` | [16.6, 4.2, 4.2] |
| `lunar_base` | [12.0, 8.0, 4.0] |
| `mars_surface` | [30.0, 20.0, 0.02] |
| `mars_rover` | [2.0, 1.6, 1.6] |
| `mars_rock` | [1.0, 0.8, 0.6] |
| `mars_orbiter` | [2.5, 2.0, 2.2] |
| `flag_pole` | [0.15, 0.15, 4.0] |
| `national_flag` | [0.9, 0.02, 0.6] |
| `control_console` | [2.0, 0.8, 1.2] |
| `emergency_stop` | [0.4, 0.1, 0.4] |
| `training_tank` | [10.0, 6.0, 2.2] |
| `spacesuit` | [0.9, 0.6, 1.9] |
| `centrifuge` | [10.0, 10.0, 4.5] |
| `spacecraft_hatch` | [1.0, 0.1, 1.2] |
| `hatch_tool` | [0.8, 0.1, 0.1] |
| `porthole` | [0.6, 0.1, 0.6] |
| `earth_globe` | [18.0, 18.0, 18.0] |
| `medal_box` | [0.3, 0.2, 0.1] |
| `stage_platform` | [6.0, 4.0, 0.4] |
| `podium` | [0.8, 0.5, 1.2] |
| `satellite_dish` | [1.0, 0.3, 1.0] |
| `smokestack` | [1.2, 1.2, 8.0] |
| `solar_array` | [6.0, 3.0, 0.3] |
| `globe_model` | [1.2, 1.2, 1.5] |
| `armillary_sphere` | [1.4, 1.4, 2.0] |
| `gnomon_pillar` | [0.4, 0.4, 3.0] |
| `ancient_platform` | [8.0, 8.0, 1.0] |
| `radio_telescope` | [10.0, 10.0, 8.0] |
| `sample_canister` | [0.5, 0.5, 0.6] |
| `lunar_rock_sample` | [0.2, 0.15, 0.1] |

## 数据注意（待核对）

- A 的结构分析题（`u05_a_structure_analysis`）引用 “Paras. 9–11”，但 `textbook.json` 中 A 只有 8 段，已放在 A8。
- C 的 raw 文本在数据中截断于 “planned International Lunar Research Station”，C8 的台词依据 `u05_c_translation` 的文本行补全。
- `textbook.json` 中 C 没有单独生词表：C 挂载的 7 个词取自 A / B 生词表，并与 C 的内容对应。
- 文章标题取自课文段首的标题（A、B、C 的 raw 首行）。
- 旗帜贴图（B7 的四国旗、C8 的五国旗）由美术替换；场景里只用通用 `national_flag` 物件。
