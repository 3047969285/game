# 第五轮总计划：真实世界的第一单元（Claude 统筹，2026-10-28）

## 用户要求（原话要点）

- 人物要做成参考多视图里的男女主角（`~/Downloads/male_sheet.png`、lian1–4；`female_sheet.png`、lian5–8），必须完全一致。
- 第一单元各个情景的世界要做好，CG 级画质。
- 玩法以 NPC 为主，NPC 接入 DeepSeek 大模型；不同角色的 NPC 有各自的定制。
- 整个世界和真实世界一致，让人感觉不到这是游戏。视角改成人眼的范围，整个物理世界都要复刻。
- 这是对真实世界的演绎，不是粗制滥造的三维动画。

## 分工

| 方向 | 负责 | 说明 |
|------|------|------|
| 男女主相似度（脸、皮肤、发型、服装） | **Claude** | 最精细的部分，Claude 亲自做 |
| 场景美术方向、精品物件、逐张评审 | **Claude** | 按 quality-bar 把关 |
| 第一人称（人眼视角）、物理交互、真实感渲染 | **Codex** | 引擎侧 |
| NPC 框架（C++）：行为、注视、对话系统、DeepSeek 客户端、TTS | **Codex** | 引擎侧 |
| MetaHuman 组装、Groom 绑定、皮肤 skin_v3 落地 | **Codex** | Claude 交付源资产，Codex 负责进引擎 |
| NPC 人设、提示词、教学目标、评测、成本控制 | **DeepSeek** | 数据和提示词 |
| 场景质检、内容覆盖、答案和配音 | **DeepSeek** | 延续第九轮 |

## 第一单元的 22 个情景（`Content/Data/memory/textbook_scenes/unit01.json`）

- Text A（8 个）：Offline day、Always on、Board meeting、Alone together、Cockpits、Sips and a swallow、Sacred spaces、Look up。
- Text B（8 个）：The digital wave、Classroom、Children、Home、Work、Holidays、One street, four errands、Social life。
- Text C（6 个）：Jianbing at dawn、Checkout、Getting around、Lunch and coupons、Boutique and mall、Evening bills。

每个情景都要做到四点：真实比例的空间；能用的物件（门能开、椅子能推、杯子能拿）；有事可做的 NPC；用人眼视角在空间里走动。

## 真实感标准（在 quality-bar.md 基础上追加）

1. **视角**：
   - 眼高按角色身高（男主约 1.72 m）；
   - 水平 FOV 约 80°，接近人眼的舒适视野；
   - 走路时头部有轻微起伏，起步和停下有惯性；
   - 景深和自动曝光的适应速度接近人眼，从暗处到亮处约 1–2 秒；
   - 看不到 UI 和准星，交互靠注视加轻微高亮。
2. **物理**：
   - 所有可移动的物件都用 Chaos 物理，质量按真实材料和体积计算；
   - 门、抽屉、柜门是铰链或滑轨约束；
   - 窗帘、桌布用布料模拟；
   - 脚步声和碰撞声按材质区分。
3. **NPC**：
   - 每个人有日程和待机行为：看手机、交谈、翻书、做饭；
   - 视线会跟随玩家；
   - 用 DeepSeek 实时生成对话：说英语，难度按学习者水平控制，自然使用本单元生词，必要时温和纠错；
   - 回应速度：先出首句，流式返回，3 秒内开口。
4. **画面**：真实尺寸，扫描材质，Lumen 和光追，物理相机，不出现任何占位体。

## 密钥与安全

- DeepSeek 密钥只存在用户本机 `~/.config/wordquest/deepseek.env`（权限 600，不在仓库里）。开发期由 UE 运行时读取环境变量或这个文件。
- **任何文件、日志、截图、提交里都不能出现密钥。** 发布版必须改走后端代理，不能把密钥打包进客户端。
- 每次对话要记录 token 用量，并设预算上限。

## 视频

公开分享的版本只用原创旁白（`Tools/film_narration.py`）。DeepSeek 用教材原文做的版本 `unit01_showcase_textbook_2k.mp4` 只能内部使用，不能外发。

## 交付顺序

1. **Codex**：先做第一人称和基础物理，在 Unit 1A 的客厅里实测。
2. **Claude**：男女主新版出来后，同步交给 Codex 组装和绑定 Groom。
3. **DeepSeek**：先给 Offline day 的四位家庭成员写人设和提示词。
4. **Codex**：用它们打通 NPC 对话。
5. 先把 Offline day 做成垂直切片：能走、能开门、能拿东西，能和 Paul、Maria、Jason、Jack 自由对话。验收后再铺到其余 21 个情景。
