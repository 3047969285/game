# 单元 6 · The economy: power behind everyday life —— 按真实课文重建的场景设计

数据版（供 UE 搭建脚本读取）：`Content/Data/memory/textbook_scenes/unit06.json`。本文是它的说明。

## 总体做法

- 每篇文章一张关卡：`/Game/Memory/Scenes/U06/L_U06_A`、`L_U06_B`、`L_U06_C`。
- 一篇文章里的多个场景是同一关卡里的多个“记忆布景”，沿 X 轴每隔 60 m 摆一个（origin = [i*60, 0, 0]），四周是暗色记忆虚空。
- 场景之间用“记忆溶解”切换；段落按场景播放，英文字幕、旁白和人物表演同步。
- 生词附着在场景物件上：走近物件会浮现单词。
- 练习放进对应场景的“断片”里：场景冻结，在画面中作答。
- then / now 分层：仅在课文确实对照过去与现在时使用。Text A（Sue 从前的高薪生活 vs 汽车旅馆里的现在）与 Text B 第 4 段（同一栋房子的繁荣与崩盘）使用；Text B 其余段落与 Section C 是并列例子或当下叙述，不分层。

## Text A · Surviving an economic crisis（8 个场景，叙事）

课文原标题首行 OCR 残缺（“Surviving an S…”），标题按正文推断，待核对。

| # | 场景 id · 标题 | 段落 | 地点 · 时间 · 光 | 人物 | 关键物件（附着生词） | 断片 / 练习 |
|---|----------------|------|------------------|------|---------------------|-------------|
| A1 | u06a_s1 · Lifeline | 1–2、5 | 郊区住宅厨房餐桌，清晨，阴天冷光 | Sue 独坐餐桌，面前摊着账单 | 账单堆（tumble）、旧相册（remnant）、电话 | 前置阅读 1–3；Understanding 1–3（第 2 题 99ers 见下方说明） |
| A2 | u06a_s2 · Checking account | 3、7 | 同一厨房，两天后，背光室内 | Sue 站在台面前接电话 | 笔记本（account）、催款信（repossess）、响个不停的电话（harassment）、乒乓球（ping pong） | Understanding 4 |
| A3 | u06a_s3 · Plunge（then / now） | 4、8 | then：科技公司办公室，高薪时的桌面与度假海报；now：汽车旅馆的小桌与电视 | then 为 Sue 坐在办公椅；now 为 Sue 在小桌前投简历 | then：业绩仪表盘（sickening）、培训证书（certification 在纸堆中）；now：电视机、冰桶、微波炉 | Word building（sickening / certification / retail 等） |
| A4 | u06a_s4 · Eviction notice | 6、10–11 | 公寓门口，午后，灰白光 | Sue 站在门边 | 门上的驱逐通知（eviction）、两只打包箱、公寓钥匙 | Expressions in use 1–8 |
| A5 | u06a_s5 · Gas cards and a road home | 12–13 | 加油站路边，正午阳光 | Sue 在车里（驾驶位）；朋友在远处用手机转账；收银员 | 汽车、教会捐赠箱（donate）、加油卡、等候名单牌（shelter 等候） | Understanding 5（回家乡的理由） |
| A6 | u06a_s6 · Motel room | 15 | 汽车旅馆房间，夜里，暖黄灯 | Sue 坐在椅子上，电脑上浏览招聘网站 | 电视柜下的食物（subsistence）、冰桶、微波炉、笔记本（surf）、床 | Understanding 6；Words in use（整单元词汇填空） |
| A7 | u06a_s7 · No address | 9、14、16 | 旅馆里的小书桌，晚上，冷白台灯光 | Sue 对着手机 | 申请表（obstacle，地址栏空白）、断线的手机、台灯 | Understanding 7；Banked cloze（整段完形） |
| A8 | u06a_s8 · Ray of hope | 17 | 旅馆房间，黄昏，门口灯 | Sue 站着看桌上信封 | 日历上标着艰难的一周（brutal）、现金信封、门 | Understanding 8；Critical thinking；Structure writing |

**说明**

- Understanding 第 2 题（“99ers”）的答案依据标注为“原文第 4 段”，但当前抽取的 A 段 1–12 中并无该词。A1 先挂载该题，待核对课文原文后再调整。
- Sue 的角色名 `sue` 为本单元新增角色。

## Text B · Economic bubbles: causes and conditions（7 个场景，例子布景）

Text B 是说明文，不是过去/现在对照，因此只在 B4 用 then / now 表示同一栋房子的繁荣与崩盘。其余场景按课文例子各自布景。

| # | 场景 id · 标题 | 段落 | 地点 · 时间 · 光 | 人物 | 关键物件（附着生词） | 断片 / 练习 |
|---|----------------|------|------------------|------|---------------------|-------------|
| B1 | u06b_s1 · Boom and bust | 1 | 交易大厅，室内冷白光 | 两位高管看价格牌 | 价格牌（boom）、油桶（commodity）、交易台 | Reading 1；MCQ 1 |
| B2 | u06b_s2 · Negative feedback | 2 | 户外集市广场，正午阳光 | 两位小贩交谈 | 货架（feedback，货多价跌）、眼睛模型（analogy，瞳孔类比） | Reading 2；MCQ 2 |
| B3 | u06b_s3 · Tulip auction | 3 | 十七世纪荷兰拍卖厅，烛光般暖光 | 两位买家，一人指向拍卖台 | 拍卖台、郁金香箱（tulip）、花床 | Reading 3；MCQ 3–4 |
| B4 | u06b_s4 · The house that doubled（then / now） | 4–5 | then：住宅前街，傍晚暖光，估价 500,000；now：同一街角，崩盘后 | then 一家人在屋前商量；now 其中一人独自站着 | 房屋正面（equity，净值）、估价牌（appraisal）、新车（then）、待售牌与催款文件（now） | Collocation（整段）；MCQ 5 |
| B5 | u06b_s5 · Herd on the floor | 6 | 证券交易大厅，室内冷白光 | 四位经纪人挤在交易栏杆前 | 栏杆（herd，羊群效应）、温度计式价格图（mercury/thermometer 语义）、显示屏 | Reading 4–5；MCQ 6 |
| B6 | u06b_s6 · Dot-com boom | 7 | 写字楼街区，阳光，玻璃幕墙 | 两位工程师，一人在笔记本前 | 广告牌（billboard）、股指牌（5,132.52 与 1,108.49）、办公桌 | Reading 6；MCQ 7 |
| B7 | u06b_s7 · Stuffed-toy fad | 8 | 1990s 玩具摊与家中电脑，室内暖光 | 小孩在摊前，朋友在电脑前查拍卖价 | 玩具摊（fad）、电脑（拍卖网站） | MCQ 8；Critical thinking |

**说明**

- Collocation 整段（13 题）内容是经济危机对社会影响，与 B 段正文无直接对应，本文按其中“房屋不安全、租金无法支付”等词句放在 B4。
- Text B 的 8 个段落中第 1–8 段均已覆盖；问题段落（Q1–Q6）按阅读技能题的位置挂在对应场景末尾。

## Section C · The sharing economy turns a new page with books（7 个场景，叙事）

C 篇是一篇新闻特写，原文未分段。本文按内容切为 7 段（第 1–7 段），第 7 段结尾为“是否真正分享”的评论。第 6 段与第 7 段合并进 C6。

| # | 场景 id · 标题 | 段落 | 地点 · 时间 · 光 | 人物 | 关键物件（附着生词） | 断片 / 练习 |
|---|----------------|------|------------------|------|---------------------|-------------|
| C1 | u06c_s1 · Shared bikes to shared books | 1 | 合肥街头，早间阳光，书店门面 | 学生扫码骑车，学生路过 | 共享单车、停车架、二维码牌 | 无 |
| C2 | u06c_s2 · Sanxiaokou bookstore | 2 | 合肥三孝口新华书店，室内冷光 | 收银员、读者扫码 | 收银台、“押金”告示（deposit）、二维码牌、书架 | 无 |
| C3 | u06c_s3 · Book lending at a bank | 3 | 银行柜台，室内 | 柜员、借书的人在柜台扫码 | 银行柜台、借书册、二维码牌 | 无 |
| C4 | u06c_s4 · Books versus libraries | 4 | 书店阅读角，午后暖光 | 一位爱书的读者坐着看书 | 阅读桌、书、新书堆、书架 | 无 |
| C5 | u06c_s5 · A national survey | 5 | 书店一角，室内 | 一位年轻人看平板，一位在看墙上图表 | 阅读调查图表牌、平板、书架 | 无 |
| C6 | u06c_s6 · A deposit or a fine | 6–7 | 书店收银台，室内 | 收银员；评论者站在旁边 | 收银台、“押金或罚款”告示、借书规则文件（resolve） | 无 |
| C7 | u06c_s7 · Open door | —（无故事段） | 户外，正午，自贸区门楼 | 一位工程师指向门楼 | 自贸区门楼（trade_zone_gate） | Translation（整段汉译英，断片在门楼前作答） |

**说明**

- C 篇没有单独的生词表，生词挂载只能用 A、B 生词表中与本篇重合的词（deposit、resolve），数量少于其它两篇。
- 翻译段落（“开放战略、自由贸易区”）与故事无关，按单元惯例放在末尾场景 C7。

## 单元项目

本单元的单元项目页（`pages.project`）尚未读取，本次不设计项目场景，待读取后补充。

## 物件库新增（Blender 代码建模 → FBX → UE）

复用 unit01 已有物件：墙、窗墙、街道、门、餐桌、椅、沙发、咖啡桌、厨房台面、收银台、银行柜台、书架、图书馆书架、阅读桌、书、教科书堆、电话、平板、笔记本电脑、显示器、办公桌、家庭书桌、台灯、落地灯、日历、相册、文件堆、优惠卡、电视与电视柜、共享单车、停车架、二维码牌、支付告示、汽车、玻璃幕墙、调查图表、拍卖台等。

本单元新增（尺寸单位 m，size = [宽, 深, 高]）：

| 新增 kit | size | 用途 |
|----------|------|------|
| price_board | 4.0 × 0.05 × 2.0（估价牌为 1.4 × 0.05 × 0.9） | 交易价格牌、估价牌 |
| oil_barrel | 0.6 × 0.6 × 0.9 | 大宗商品油桶 |
| eye_model | 1.0 × 0.4 × 1.8 | 瞳孔类比的人眼展示 |
| tulip_crate | 0.6 × 0.4 × 0.3 | 郁金香箱 |
| tulip_bed | 2.2 × 0.8 × 0.4 | 郁金香花床 |
| auction_table | 2.6 × 1.0 × 0.9 | 拍卖台 |
| house_facade | 6.0 × 0.6 × 4.5 | 房屋正面 |
| for_sale_sign | 0.9 × 0.1 × 1.2 | 待售牌 |
| price_thermometer | 0.6 × 0.05 × 2.4 | 竖式价格图 |
| trading_rail | 4.0 × 0.1 × 1.0 | 交易栏杆 |
| stock_index_board | 3.0 × 0.1 × 1.6 | 股指牌 |
| billboard | 5.0 × 0.3 × 2.6 | 广告牌 |
| toy_stall | 2.4 × 1.2 × 2.2 | 玩具摊 |
| bookshop_front | 6.0 × 0.6 × 4.0 | 书店门面 |
| waiting_list_board | 1.2 × 0.05 × 1.6 | 等候名单牌 |
| church_donation_box | 0.6 × 0.5 × 0.9 | 教会捐赠箱 |
| motel_bed | 2.0 × 1.4 × 0.6 | 汽车旅馆床 |
| food_pack | 0.2 × 0.12 × 0.25 | 食品包 |
| ice_bucket | 0.25 × 0.25 × 0.3 | 冰桶 |
| microwave | 0.5 × 0.4 × 0.3 | 微波炉 |
| cash_envelope | 0.16 × 0.08 × 0.01 | 现金信封 |
| ping_pong_ball | 0.04 × 0.04 × 0.04 | 乒乓球（焦虑的隐喻） |
| survey_chart_board | 2.0 × 0.05 × 1.4 | 调查图表牌 |
| trade_zone_gate | 6.0 × 0.4 × 4.0 | 自贸区门楼 |
| apartment_key | 0.05 × 0.03 × 0.01 | 公寓钥匙 |
| moving_box | 0.5 × 0.4 × 0.4 | 打包箱 |

新增角色：`sue`（Text A 主角）。其余人物复用 unit01 角色名。
