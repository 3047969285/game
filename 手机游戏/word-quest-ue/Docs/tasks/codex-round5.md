# Codex 任务书 · 第五轮（Claude 下发，2026-10-28）

先读 `Docs/tasks/round5-plan.md`。规则不变：
- 走 `Tools/run_ue_serial.sh`；
- 先写需求、接口、测试三件套；
- 不提交、不推送，等用户说；
- 进度写进 STATUS；
- 机器只有 16 GB 内存，UE 和 Blender 重活不要同时跑。

## C15 人眼第一人称（最优先，先在 Unit 1A 的 Offline day 客厅实测）

- **相机**：
  - 胶囊高度和眼高按角色身高设置（男主 184 cm，眼高约 172 cm）；
  - 水平 FOV 约 80°，可调；
  - 用 CineCamera 的物理参数，焦距和光圈接近人眼，轻微景深；
  - 自动曝光的适应速度约 1–2 秒（替代当前的固定曝光）；
  - 运动模糊调到很低。
- **移动**：
  - 走路约 1.4 m/s，有加速和减速惯性；
  - 步伐带轻微的头部上下和左右晃动，可关闭；
  - 能上下楼梯，有坡度限制；
  - 蹲下和起身是平滑过渡；
  - 低头能看到自己的身体（MetaHuman 第一人称身体，隐藏头部）。
- **输入**：鼠标、手柄、触屏三套操作同构。不显示 UI 和准星；注视物件约 0.3 秒后，物件出现极轻的边缘高光。
- **测试**：PIE 里在客厅走一圈，记录眼高、步频、头部晃动幅度、曝光适应曲线，并截图。

## C16 物理世界

- 所有布景物件按尺寸和材质自动设置质量和碰撞。可以拿起的物件（手机、杯子、书、遥控器、棋子……）要能拿起、端详、放下、扔出。
- 门、抽屉、柜门用 Chaos 约束：铰链、滑轨、阻尼。椅子能推动。
- 窗帘、桌布、衣物用 Chaos Cloth，没装配之前先记成 needs_cloth。
- 按物理材质（木、金属、布、陶瓷、玻璃）区分脚步声和碰撞声，音频先用占位，由 DeepSeek 后续补齐清单。
- **测试**：自动化地推、拿、开每类物件，没有穿模，没有飞出。

## C17 NPC 框架和 DeepSeek 对话

- **NPC Actor**：
  - 使用 MetaHuman（BP 或快照），行为有待机、日程、看手机或看书、和别的 NPC 交谈；
  - 视线跟随玩家（头部和眼睛的 LookAt，有角度限制）；
  - 坐姿和站姿用 `/Game/Memory/Characters/Poses/A_MH_*`（Claude 的 10 个姿势），后续再换成动画。
- **对话流程**：
  1. 玩家走近并注视 NPC，约 0.5 秒后进入对话；
  2. 玩家输入：键盘打字，或从 3 个建议回复里选；语音输入以后再做；
  3. 调用 DeepSeek（OpenAI 兼容接口 `POST {DEEPSEEK_BASE_URL}/chat/completions`，model 为 `deepseek-chat`，`stream=true`）；
  4. 流式文本以世界空间字幕显示在 NPC 头旁，冷光细字，没有对话框；
  5. 同时用 UE 的 TextToSpeech 插件（平台 TTS）朗读，不同 NPC 用不同声音。
- **密钥**：
  - 读环境变量 `DEEPSEEK_API_KEY` / `DEEPSEEK_BASE_URL`，没有就读 `~/.config/wordquest/deepseek.env`；
  - 绝不写进工程、配置、日志或截图，日志里一律打 `***`。
- **人设和提示词**：来自 DeepSeek 的数据文件 `Content/Data/npc/personas/<role>.json` 和 `Content/Data/npc/prompts/system_template.md`，格式见 deepseek-round10.md。
- **记忆**：每个 NPC 保留最近 N 轮对话，跨场景的关键事实存进 `Saved/Player/npc_memory.json`。
- **成本**：每次请求记录 token 用量，单场景设预算上限；超时 8 秒后降级为本地备用台词。
- **测试**：
  - 离线：用 mock 服务测流式解析、超时、降级和密钥不落盘；
  - 在线：和 Paul 聊 5 轮，记录首字延迟（目标 3 秒内）和内容。

## C18 人物进引擎

- 用 Claude 的 `Tools/char_assemble.py`（Optimized + High）组装 7 个 MetaHuman。必须在没有 Blender 运行时跑，否则会内存不足。
- 把 skin_v3 落地，绑定 Groom，换成最终服装。
- 男女主的新版源资产会由 Claude 交付，到时重新组装。

## C19 真实感渲染

逐项开启并评估，每项附对比截图：

- 硬件光追和 Lumen；
- MegaLights；
- 虚拟纹理；
- 物理相机曝光；
- HDRI 天光和真实时间的太阳角度；
- 室内窗外有真实景物。

## 交付顺序

C15 → C16（客厅）→ C17（Paul、Maria、Jason、Jack 四人能自由对话）→ 截图和录屏给 Claude 评审 → C18 → C19 → 铺到 Unit 1 其余 21 个情景。
