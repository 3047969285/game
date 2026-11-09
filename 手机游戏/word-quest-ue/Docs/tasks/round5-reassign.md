# 第五轮改派（Codex 额度将尽，Claude 调整，2026-10-28）

Codex 做完当前这次 C15 客厅 PIE 验证后停下，交接写在 `Docs/tasks/handoff-codex-round5.md`。剩余工作改派如下，原任务细节仍以 `codex-round5.md` 为准。

## 现状（截至 10:55，摘自 STATUS 和 Codex 汇报）

- **C15 人眼第一人称**：代码完成，编译通过，已能在客厅里实际行走。眼高、视野、胶囊和台阶限制都已生效，4K 检查图正在出。还缺：头部注视、低头看到自己的身体、完整验收。
- **C16 物理**：离线 8 项测试通过。还缺：PIE 里实测碰撞和拿放；独立的门、抽屉、棋子资产；布料；音频。
- **C17 NPC**：已有 SSE 流式客户端、安全读取密钥、预算控制、世界空间字幕框架，并已接上人设数据；也补了 macOS 原生命名音色。还缺：和 Paul 在线 5 轮的实测、首字延迟数据、注视触发、日程动画。
- **C18 人物**：离线预检完成，7 个 MHC 源资产都在，BP 为 0。男女主等 Claude 的 v2。
- **C19 渲染**：只写了需求文档，还没开始。

## 新分工

| 项 | 接手 | 说明 |
|----|------|------|
| C15 验收和收尾（注视高光、第一人称身体） | **Claude** | 先读交接文档 |
| C17 NPC 在线对话打通（Paul 5 轮、首字延迟、TTS、注视进入对话） | **Claude** | 涉及密钥，由 Claude 跑 |
| C18 男女主 v2 和组装 | **Claude** | 正在进行（`Tools/char_v2.py`） |
| C16 物理落地：按 `interactions_unit01.json` 给客厅物件配质量、碰撞、门和抽屉约束，接占位音效，再做 PIE 自动测试 | **DeepSeek** | 清单是你自己写的，最熟 |
| C19 渲染逐项对比：光追 / Lumen / MegaLights / 虚拟纹理 / 物理曝光 / HDRI，每项一组对比截图 | **DeepSeek** | 只改渲染配置和截图脚本，结论交 Claude 评审 |
| C15 体验质检：步频、头摆幅度、曝光适应曲线测量和报告 | **DeepSeek** | 用 Codex 留下的测试脚本 |

## 规则

- `Source/**`：C16 物理相关文件（`WordQuestWorldInteraction.*`）归 DeepSeek；其余文件归 Claude。两边不改同一个文件，需要对方改的地方写进 STATUS。
- UE 一律走 `Tools/run_ue_serial.sh`。引擎在外盘，用真实路径 `/Volumes/Games/Game-Engine/Epic Games/UE_5.8/...`，`/Users/Shared` 下的别名会让项目路径解析失败。
- 编译前在 `Saved/ue_run.lock.build.<pid>` 留标记，编译方法见 Codex 的交接文档。
- 16 GB 内存：同一时间只跑一个 UE，跑 UE 时不开 Blender。
- 不提交，不推送；进度写进 STATUS。
