# 第六轮：Claude 和 Codex 分工（Claude 统筹，2026-11-02）

用户要求：“你和 codex 一起做，你俩做好分工”。目标不变，见 `round5-plan.md`：主角和参考图一致；第一单元做到真实世界级；NPC 接 DeepSeek；人眼视角；物理复刻。

先读 `handoff-codex-round5.md`（Codex 上轮交接）和 STATUS 里“第五轮改派”一节（DeepSeek 10-28 下午的进度）。DeepSeek 继续做数据、提示词和质检，不再承担引擎主线。

## 原则

- **Codex 负责引擎、运行时和 `Source/**`**：凡是要编译、要在 PIE 里跑的都归 Codex。
- **Claude 负责人物、美术和评审**：男女主 v2、MetaHuman 组装、场景美术方向、渲染取舍决定、所有截图的验收。
- 文件不交叉：Codex 不改 `Content/Characters/**` 和 `Tools/char_*.py`；Claude 不改 `Source/**`。需要对方改的地方写进 STATUS 的“请求”一行。
- UE 一律走 `Tools/run_ue_serial.sh`，用外盘真实引擎路径；`UE_LOCK_WHO` 写自己的名字。16 GB 内存：同时只跑一个 UE，跑 UE 时不开 Blender。
- 任何自动测试脚本都要有总超时，tick 里出现异常时注销回调并 `os._exit(1)`（10-28 曾有一个测试卡住 25 分钟，占着 UE 锁）。
- 不提交，不推送。截图和录屏路径写进 STATUS，交 Claude 验收。

## Codex（按顺序）

1. **C17 打通 NPC**：
   - 跑原生测试 `WordQuest.Npc.*` 和 `test_npc_client_mock.py`，然后跑在线测试 `test_npc_online_round5.py`（和 Paul 聊 5 轮，首字延迟在 3 秒内）。
   - 按 DeepSeek 模板 v1.2 的 `@@META` 行解析：校验失败重问一次，再失败用备用台词。
   - 四人语音实际试听，录一段音频交给 Claude。
2. **NPC 活起来**：
   - 头和眼骨真实 LookAt（有角度限制、平滑过渡）；
   - 待机和日程动作切换：看手机、看书、坐、站，先用 `/Game/Memory/Characters/Poses/A_MH_*`；
   - 眨眼和呼吸微动。
3. **C16 物理在 PIE 里验证**：在 DeepSeek 的 `setup_offline_physics.py` 基础上跑 `--editor`：拿、放、扔、推、开窗，确认没有穿模、没有飞出。门扇、抽屉、独立棋子缺资产，列成清单交给 Claude。
4. **C15 收尾**：
   - 第一人称身体：低头能看到身体，隐藏头部；
   - 步频调到 1.6–2.0 Hz（DeepSeek 实测只有 1.33 Hz）；
   - 曝光适应改成 1–2 秒（实测 0.34 秒太快），并做一次暗→亮的阶跃测试；
   - 游戏默认入口切到新序幕。
5. **C19 按 Claude 的决定开启渲染项**（决定写在 `Docs/qa/review-c19-claude.md`），做帧时间验收；再加真实窗外环境（HDRI 和太阳角度按情景时间）。
6. 全部通过后，录一段 Offline day 垂直切片：走进客厅，拿起东西，和四个人各说一句话。交给 Claude 验收。

## Claude（按顺序）

1. **男女主 v2**：
   - 预设混合已出第一版，但不合格：皮肤偏橙、有色块，眼睛成了蓝色，头发没有出现在预览里，女主脸太宽；
   - 修好皮肤、虹膜、发型和发色、服装，再迭代脸型（脸宽、下颌 V 线、眼型），直到和参考图并排一眼认得出；
   - 然后用 `char_assemble.py` 组装（Optimized + High）。
2. **C19 评审**：读 `Docs/qa/c19-render-comparison.md`，写 `review-c19-claude.md` 决定开启哪些渲染项，交给 Codex。
3. **审 DeepSeek 的 C15 体验报告和 C16 配置**；审 Codex 每一步的截图和录屏。
4. **场景美术，先做 Offline day 客厅**（C19 评审发现它只是一面墙立在无限地板上，见 `review-c19-claude.md`）：
   - 重建成封闭的真实房间：四面墙、天花板、窗和窗外景、门、灯具；
   - 再补精品物件，以及门扇、抽屉、棋子这类可交互资产（Blender，在 UE 空闲时烘焙）；
   - 房间交付后，Codex 再做 C19 第 5 步。
5. 其余组装好的 5 个 NPC 角色：换 skin_v3、头发、服装，交给 Codex 放进场景。
