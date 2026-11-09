# 单元 4 · When work is a pleasure —— 按真实课文重建的场景设计

数据版（供 UE 搭建脚本读取）：`Content/Data/memory/textbook_scenes/unit04.json`。本文是它的说明。

## 总体做法

- 每篇文章一张关卡：`/Game/Memory/Scenes/U04/L_U04_A`、`L_U04_B`、`L_U04_C`。
- 一篇文章里的多个场景是同一关卡里的多个“记忆布景”，沿 X 轴每隔 60 m 摆一个（origin = [i*60, 0, 0]）。
- 场景之间用“记忆溶解”切换。
- 课文段落按场景播放：英文字幕，旁白和人物表演同步。
- 生词附着在场景物件上：走近物件会浮现单词。本单元 A 篇 10 个、B 篇 9 个，均取自课文 `words` 表的规范词头。
- 练习放进对应场景的“断片”里：场景冻结，在画面中作答。
- then / now 分层：A 篇第 6 段（中世纪贵族与现代劳动者的闲暇对照）、B 篇第 14–15 段（老鞋匠在时 / 去世后的店）使用。其余场景只有一层。

## Text A · Will you be a laborer or a worker?（8 个场景，议论文：每段一个具体例子）

议论文没有连续情节，因此每个场景对应课文里的一个例子或论点，地点都来自原文：工厂（wage slaves）、公园与棋（private pastime）、温室与市长（gardener vs. mayor）、茶水间（leisure）、地铁闸机（daily grind）、中世纪贵族 vs. 现代人（then / now）、社区学习班（lifelong learning）、招聘会（the choice）。

| # | 场景 | 段落 | 地点 · 时间 · 光 | 人物 | 关键物件（附着生词） | 断片 / 练习 |
|---|------|------|------------------|------|---------------------|-------------|
| A1 | Wage slaves | 1 | 工厂装配线车间，清晨，冷白光 | worker_a 等待打卡，worker_b 望向墙上的打卡钟 | 装配线、打卡钟、布告栏（abolish） | pre_reading 1–3；understanding #1 |
| A2 | Play is private | 2 | 公园草地，下午，暖阳 | 两位朋友在长凳边下棋；路人边走边看手机，无人在意他们 | 棋盘（pastime）、咖啡桌、长凳 | understanding #2 |
| A3 | Gardener and mayor | 3 | 温室，白天，阳光透过玻璃 | 园丁跪在工作台前；市长坐在办公桌后看手机 | 工作台与园艺工具（manual）、市长的办公椅（mayor）、盆栽 | understanding #3；expressions_in_use 1–4 |
| A4 | Leisure hours | 4 | 办公室茶水间，午休，室内冷光 | 同事在沙发上读报，像在休息以便更有效地工作；另一人站在墙边盯着时钟 | 沙发、咖啡杯、墙上的钟 | understanding #4；structure_writing 1（第 4、5 段对比） |
| A5 | The daily grind | 5 | 地铁站闸机口，清晨，冷白光 | 四名通勤者：排队、张望、边走边看手机、坐在长凳上 | 三台闸机（grind）、长凳 | understanding #5；word_building 1–9 |
| A6 | Then and now: leisure | 6 | 同一室内，**then 层**：挂毯与王座上的贵族打游戏；**now 层**：沙发上的现代劳动者刷手机，墙上电视，服务机器人 | 贵族（then）；劳动者（now） | 王座（aristocracy）、挂毯、电视、服务机器人（automate）、沙发 | understanding #6；banked_cloze；expressions_in_use 5–8 |
| A7 | Lifelong learning | 7 | 社区终身学习中心教室，下午，暖光 | 老师站在白板前；学员一人读书、一人画画、一人弹钢琴 | 白板、画架（outlet）、钢琴（diversion）、书架、课桌 | understanding #7；words_in_use |
| A8 | Look up: the choice | 8–9 | 招聘会大厅，白天，冷白光 | 毕业生抬头看两个展位；左展位的招聘员守着打卡钟（laborer 的倒计时），右展位的招聘员指向笔记本（worker 的热情，coincide） | 两个展位（coincide 在右侧）、打卡钟、笔记本、公告板 | understanding #8；critical 1–3；structure_writing 2 |

## Text B · A prideful tradition（7 个场景，叙事：按地点与时刻分场；B6 为 then / now 覆写）

| # | 场景 | 段落 | then / now | 人物 | 关键物件（附着生词） | 练习 |
|---|------|------|-------------|------|---------------------|------|
| B1 | Hospitality | 1–3 | 鞋店柜台，初见，老鞋匠热情问候 | 老鞋匠站在柜台后，我站在柜台前 | 柜台（hospitality） | collocation 13（cheerful smile） |
| B2 | Stitching and tradition | 4–7 | 鞋匠坐在工作台前缝鞋，我坐着等，鞋子拿下来还没补 | 鞋匠（stitch_shoe）、我（sit_wait） | 工作台（cobbler）、工具（handicraft）、鞋（stitch） | reading_skills 1；understanding 1–4 |
| B3 | Lingering friendship | 8–9 | 店门口，友谊开始；我每天经过都挥手，后来常常进店闲聊 | 鞋匠站在门口挥手，我在街上回应 | 店面（linger）、长凳 | reading_skills 2；understanding 5 |
| B4 | Children and candy | 10、12 | 街边：孩子们吵架，鞋匠出来当裁判、发糖、制止欺负人 | 鞋匠（裁判）、孩子 1–4（玩耍、争吵、荡秋千） | 糖罐（charitable）、秋千（bully）、咖啡桌 | understanding 6 |
| B5 | Painters and advice | 11、13–15 | 店内：我因油漆工的粗活生气，鞋匠沉思后给出建议 | 我站着抱怨；鞋匠坐在椅上思考（ponder） | 柜台、椅子（ponder）、油漆桶 | understanding 7；reading_skills 3；critical 1–2 |
| B6 | Then and now: the closed door | 17–18 | **then 层**：门口工作台前，鞋匠在缝鞋；**now 层**：门上挂着“请到隔壁店取鞋”的牌子，原先的椅子空着（void） | 我站在门前读牌子；then 层中的鞋匠 | 工作台（then）、空椅（void）、告示牌 | collocation 1–7 |
| B7 | Pride and wisdom | 16、19 | 黄昏街边，我坐在长凳上回想，店门关着 | 我 | 长凳、路灯、告示牌 | understanding 8；critical 3；collocation 8–12、14 |

注：B 篇标题取自原文 OCR 残缺的 “…prideful tradition”，若需要以正式标题为准请回查课本。

## Section C · Stories of China（6 个场景，故事：一个人的一生）

故事是邢（Xing）从 1962 年当学徒到后来带儿子传承琉璃（玻璃）工艺的经历。源文本在第 5 段后被 OCR 截断（止于 “She once attended the Glass Innovation”），因此 C6 只取到截断处为止。

| # | 场景 | 段落 | 地点 · 时间 · 光 | 人物 | 关键物件 | 练习 |
|---|------|------|------------------|------|----------|------|
| C1 | Apprentice in 1962 | 1 | 玻璃厂车间，1962 年，炉火暖光 | 年轻的邢在工作台前吹制玻璃；师傅田文远站在旁边指点 | 炉（glass_furnace）、工作台（glass_bench）、花瓶 | 无 |
| C2 | Technology department | 2 | 厂里的技术科设计室，1970 年后，室内暖光 | 邢坐在设计桌前画图；同事站着讨论 | 设计桌、图纸、花瓶样品、展柜 | 无 |
| C3 | Foreign visitors | 3 | 厂区展示大厅，全盛时期，暖光 | 邢现场吹制；两位外宾在看；导游指向工作台 | 工作台、花瓶、展柜 | 无 |
| C4 | Hejian design contest | 4 | 河北省河间市设计比赛展厅，暖光 | 邢与两位老师傅交流；评委在桌前看作品 | 展台（exhibition_table）、三件花瓶、竞赛公告板 | 无 |
| C5 | Teaching the next generation | 5 | 家中的工作间，两个儿子在旁，墙上挂着奖牌 | 邢讲解；大儿子坐着看，小儿子站着看 | 工作台、花瓶、椅子、书架、奖牌（award_plaque） | 无 |
| C6 | Spreading glassware culture | 4 | 玻璃创新展览，暖光 | 邢与参观者交谈；一位参观者在展柜前看 | 两个展柜与顶上的花瓶、展览公告板 | translation 1（整段） |

## 物件库（Blender 代码建模 → FBX → UE）

复用 unit01 已有物件：墙、窗墙、门、椅子、办公椅、办公桌、学生课桌、咖啡桌、咖啡杯、棋盘与棋子、长凳、草坪、街道、店面、落地灯、书架、白板、笔记本、笔记本电脑、键盘、显示器、沙发、电视、电视柜、秋千、罐子、文件堆、书、相册、照明灯等。

本单元新增（尺寸单位 m，宽 × 深 × 高）：

| 物件 | 尺寸 | 用于 |
|------|------|------|
| assembly_line 装配线 | 5.0 × 1.0 × 0.9 | A1 |
| time_clock 打卡钟（墙挂或机身） | 0.25 × 0.1 × 0.35 | A1、A4、A8 |
| notice_board 公告板 | 1.2 × 0.05 × 0.9 | A1、A8、C4、C6 |
| potted_plant 盆栽 | 0.5 × 0.5 × 0.8 | A3 |
| workbench 工作台 | 1.6 × 0.7 × 0.9 | A3、C5 |
| garden_tools 园艺工具 | 0.6 × 0.3 × 0.25 | A3 |
| turnstile 闸机 | 0.9 × 0.5 × 1.1 | A5 |
| tapestry 挂毯 | 2.0 × 0.04 × 2.5 | A6（then） |
| throne 王座 | 1.0 × 1.0 × 1.8 | A6（then） |
| service_robot 服务机器人 | 0.5 × 0.5 × 1.2 | A6（now） |
| easel 画架 | 0.6 × 0.5 × 1.5 | A7 |
| piano 钢琴 | 1.5 × 0.6 × 1.0 | A7 |
| job_booth 招聘展位 | 2.0 × 1.0 × 2.2 | A8 |
| shoe_rack 鞋架 | 1.6 × 0.35 × 1.2 | B1、B2、B5 |
| repair_counter 修鞋柜台 | 2.4 × 0.6 × 1.0 | B1、B5 |
| repair_bench 修鞋工作台 | 1.4 × 0.7 × 0.85 | B2、B5、B6 |
| cobbler_tools 修鞋工具 | 0.6 × 0.4 × 0.2 | B2 |
| shoe_pair 一双鞋 | 0.3 × 0.12 × 0.1 | B2 |
| paint_can 油漆桶 | 0.3 × 0.3 × 0.3 | B5 |
| closed_sign 停业告示牌 | 0.4 × 0.03 × 0.3 | B6、B7 |
| glass_furnace 玻璃炉 | 1.6 × 1.2 × 1.5 | C1 |
| glass_bench 吹制台 | 1.4 × 0.8 × 0.9 | C1、C3 |
| glass_vase 花瓶 | 0.2 × 0.2 × 0.35 | C1–C6 |
| display_case 展柜 | 2.0 × 0.6 × 1.5 | C2、C3、C6 |
| exhibition_table 展台 | 2.4 × 1.0 × 0.8 | C4 |
| award_plaque 奖牌 | 0.4 × 0.03 × 0.3 | C5 |

新增人物姿态（pose）：kneel_plant、sit_wait、stitch_shoe、wave、ponder、blow_glass、sit_design、sit_think、paint、play_piano。

## 注意

- 生词来源：A 篇 10 个（abolish、pastime、manual、mayor、grind、aristocracy、automate、outlet、diversion、coincide），B 篇 9 个（hospitality、cobbler、handicraft、stitch、linger、charitable、bully、ponder、void）。课文 `words` 表里的 `ACharitable`、`buliying`、`toxiC` 等是 OCR 粘连的错误词头，已统一成 charitable、bully 等规范形式，toxic 未附着。
- 练习编号沿用 `Content/Data/textbook/rw3/exercises/unit04.json` 的 id；`#n` 表示题号。
- 单元项目未在本次范围内，未设计。
