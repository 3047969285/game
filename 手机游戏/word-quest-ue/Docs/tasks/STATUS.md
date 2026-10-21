# 协作状态（每人只追加自己那一节）

总方案：[../character-production-plan.md](../character-production-plan.md) · 任务书：[codex-character-engine.md](codex-character-engine.md)、[deepseek-data-qa.md](deepseek-data-qa.md)

## Claude（人物三维）

- 2026-10-21：方案和任务书已下发（Codex、DeepSeek 已收到）。
- 2026-10-21：M-C1 第一步完成。男主的中性网格已导出到 `../word-quest-game/docs/hero-pipeline/export/me2026/`（`male_head.obj`、`male_body.fbx`、1.84 m、468 个 3D 关键点、照片皮肤贴图）。下一步：在 UE 的 MetaHuman Character 里从这个网格做拟合（自动绑定需要用户登录 Epic 账号），然后用代码生成发丝和眉毛的 Groom（Alembic）。

## Codex（引擎侧）

- （待更新）

- **2026-10-21 · C1 工程基础验证完成（Creator Core Data 待用户补装）**
  - 已做：启用任务书全部 10 个插件；Skin Cache、Strands/Cards/Binding 开启，Substrate=0，Lumen GI/反射保留。新增 `Tools/ue_check_character_engine.py` 与三件套文档 `Docs/engine-characters.md`；未修改 Content/Characters、DeepSeek 的文档/工具或人物资产。
  - 验证：UE 5.8.4 / Mac arm64 / Xcode 27.1，5 个项目 C++ 文件强制编译并链接成功；重编译后 `UnrealEditor-Cmd -run=pythonscript -nullrhi -unattended -NoEpicPortal` 退出 0，10/10 插件、8/8 运行时 CVar、8/8 反射类通过，`WQ_C1_PASS`、errors=[]；扫描日志无 Error/Fatal/Python Traceback。报告 `Saved/CharacterEngine/C1-report.json`，日志 `/tmp/ue-c1-final-headless.log`。
  - 还缺：MetaHuman Creator Core Data 缺失，Creator 受限（警告保留）；用户补装和云绑定登录见“需要用户处理”。无头 NullRHI 不代表已验证 Lumen/Groom 画面或 GPU 性能；C2–C6 待按顺序继续。未尝试登录 Epic。


- **2026-10-21 · C2 完成渲染修复与串行稳定性复核（人物 QA 尚未通过）**
  - 已做：两位最新 MHC 五张头肩/脸部图，source=MHC / Skin；固定 EV100 等效 9.5、三点光 1/.4/.6、地面隐藏。标准输出 Saved/Compare/<id>，每轮独立 CompareRuns 快照；不会在排队时搬走已有图，旧图归档在持锁编辑器内执行。MHC 前后 SHA256 不变，不保存人物。
  - 稳定性：普通 CLI 和外层已包 run_ue_serial.sh 两种入口均实际成功（识别祖先锁避免嵌套死锁），完整编辑器、UE_LOCK_WHO=codex；写盘并释放 MHC 会话后 os._exit(0)。两轮退出均 0，Condition failed / Caught signal / Python Error 均 0。历史 8480/9481 的 Slate/ICU 退出崩溃、旧命令行与调用栈已写入 Docs/engine-characters.md；保留引擎 SmokeTests，自动化固定英文避免本地化断言。
  - 验证：C++ Editor 编译成功 51.39 s，12/12 离线安全测试通过。原 Tools/qa/report.py 对两位实际运行成功，均生成 6 行、4 FAIL；完整指标见 Docs/qa/{me2026,lin}-report.md 与 engine-characters.md。两位当前均无张嘴露牙；未修改 QA 工具或阈值。
  - 还缺：Core Data 皮肤微细节纹理缺失，Skin 仍灰白；无 Groom 时头发指标不能验收，灰背景与 QA 白底阈值 244 不一致，side IoU 需结合原图判断。身份/q34 仍 FAIL 由 Claude 继续检查。接下来按新指令扩展 5 配角、C3 Groom 和女主背颈诊断；未修改 Content/Characters、未尝试 Epic 登录。

## DeepSeek（数据 / 文档 / QA 工具）

- （待更新）

## 需要用户处理

- MetaHuman 自动绑定和装配需要在 UE 里登录 Epic 账号（云服务）。只有用户本人能登录。

- 2026-10-21（Codex C1 实测）：UE 5.8 缺少 **MetaHuman Creator Core Data**（MetaHumanCharacter/Content/Optional、TextureSynthesis、BodyTextures）。请用户在 Epic Games Launcher 的 UE 5.8 安装选项中补装；如安装或后续云绑定要求 Epic 登录，请用户本人操作。本轮未尝试登录，未隐藏缺失警告。
