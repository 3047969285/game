# 第五轮 Codex → Claude / DeepSeek 交接

日期：2026-10-28（Asia/Shanghai）。用户最新要求：只完成当前 C15 客厅 PIE，然后交接、释放 Codex 的 UE/编译工作并停止。**未提交、未推送**。当前分支 `memory-game`，HEAD 仍为 `ce76e46df947a42360cec53aa55a8a32caf5648e`。

工作树：`/Users/shoudaodefengge/项目/.claude/worktrees/game-memory/手机游戏/word-quest-ue`。不要误用 `/Users/shoudaodefengge/项目/game`，第五轮任务书和本轮代码在上述工作树。

## C15 人眼第一人称：核心运行验证通过，整项尚未最终验收

已经实现并在当前这次 Offline day PIE 实测：

- 实际 ACharacter + CharacterMovement + 胶囊，替换直接移动摄影相机。眼高172cm，胶囊站姿半高92cm、蹲姿56cm。
- CineCamera：水平FOV80°、36mm传感器宽、21.45mm焦距、f/8，微弱运动模糊。可调用 SetHorizontalFov / SetHeadBobEnabled。
- 步行目标140cm/s，有加减速；本次采样最高140cm/s，走动215.68cm。头摆实测上下最大绝对值0.505cm、左右0.226cm，代码步频1.8Hz。
- 蹲下实测眼高112.17cm，站起171.97cm。台阶30cm、坡度45°设置已落地，但尚未在真实楼梯/坡道实测。
- 自动曝光参数up=3、down=2，代替玩家相机固定曝光；记录20个有效实际曝光/亮度样本。它们是走动中的样本，**尚未做暗→亮受控阶跃以验收1–2秒适应时间**，不能用参数冒充该项完成。
- 鼠标/手柄/触屏共享导航语义；真实手机/手柄设备未验收。NPC输入时导航和课文输入让位。

本次结果：`Saved/Round5/c15-firstperson.json`，`result=ENGINE_PASS_VISUAL_REQUIRES_REVIEW`；日志 `Saved/Round5/c15-pie.log` 在 10:57:26 有 `WQ_C15_PIE_PASS`。4K截图：

`Saved/Round5/c15-offline-firstperson-1793155909863670000-4k.png`（3840×2160）

已亲自查看此图，**视觉FAIL**：旧角色脸黑、发丝/头皮异常、预览内衣；房间边界/窗外仍缺真实环境，整体布景未达真实世界标准。第一人称身体缺失，角色tag `needs_first_person_body`、状态 `body_ready=0`；不得把C15全项说成完成。游戏默认入口仍是L_Main，尚未切到新序幕。

## C16 物理：代码与离线测试就绪，UE物理验证未执行

- WorldInteraction已接MemoryGameMode。PhysicsHandle支持拿、端详、放、扔；椅子推动，铰链/滑轨约束和阻尼框架；材质密度+实体填充率质量估计、CCD、分材质接触/脚步声音接口。
- 优先使用源StaticMesh已有simple/convex碰撞；只读源网格。缺少有效碰撞才用运行时Box并标 `needs_convex_collision`，不能把代理当最终碰撞。
- 键鼠F拿放/G扔推/右键端详，手柄X/肩键/左扳机端详，触屏长按/双指旋转/上滑抛出代码已写；均未真实设备验收。导航已让位于端详/拿物手势。
- `python3 Tools/test_offline_physics.py`：8项通过。**setup和--editor尚未跑**；当前C15日志的M_InteractionHint missing正因为setup未执行。
- 源场景缺独立门扇、抽屉、独立棋子，必须补资产后测，不能用合并chess_set假装棋子可拿。布料 `needs_cloth`；真实音频 `needs_contact_audio`。脚步事件接口有了，尚未绑定到实际步频。

## C17 NPC：客户端/世界交互/命名语音代码已实现，核心运行测试未完成

- SSE按字节拼完整事件再解UTF-8，处理CRLF、多行data、usage、[DONE]和大小上限。HTTP流式回调转回GameThread，8秒超时fallback、取消generation、384输出token限制、24000场景token预算、最近6轮记忆和RememberFact。
- 密钥仅运行时读环境或 `~/.config/wordquest/deepseek.env`，文件权限检查；不打印该文件内容、请求头、原始服务端错误。Shipping拒绝直连，需后端代理。日志仅状态、耗时、token；Safe会遮蔽密钥和粘贴的sk-样式串。
- 人设/模板从DeepSeek新交付 `Content/Data/npc/`读取，未修改这些作者数据。默认按任务使用deepseek-chat，可DEEPSEEK_MODEL环境覆盖。官方当前文档列的模型与legacy名有变化风险；不能自动静默升级成更贵模型。参考 https://api-docs.deepseek.com/api/create-chat-completion/ 。
- NPC发现/近距注视0.5秒、世界字幕、文字输入和3建议；无viewport对话面板。API：SubmitToNpc、SelectSuggestion、CloseDialogue、GetNpcState、IsInputActive。
- Mac命名语音：UE TextToSpeech自定义factory/channel + AVSpeechSynthesizer，使用本机Daniel/Samantha/Rishi/Reed英语音色、rate/360及pitch0–100→0.8–1.2倍率。已查本机声音存在，无下载；新原生后端已编译成功，但未实际四人试听，WPM只是归一化控制，不能宣称精确语速。其他平台fallback保留未命名提示。
- **仍未做：真正头/眼骨LookAt、日程动画切换**；目前只算限角并tag needs_npc_gaze_rig。跨端世界输入未实测。
- 离线fixture：`python3 -m unittest discover -s Tools -p test_npc_offline.py` 2项通过。
- 原生测试已写但未跑：WordQuest.Npc.SseUtf8EveryBoundary / SseFramingAndBounds / NamedSpeechControls。
- `Tools/test_npc_client_mock.py`是真UE客户端→本机HTTP mock（只用mock伪凭证，Saved/NpcTests/<run>隔离，不读真实key）；**尚无成功原生运行记录**。早先误用`--help`会启动旧launcher并因外盘descriptor路径失败，不能计PASS。该脚本没有argparse，不要再用--help。
- `Tools/test_npc_online_round5.py`是Paul最多5轮、遇fallback立即停的在线验证，**尚未执行**，真实key未用于任何本轮API调用。

## C18 人物：预检/skin修复准备，未组装

- 仅文件系统预检：7个MHC源存在，已组装MetaHuman BP=0，skin_v3 Face缓存=0；报告 `Saved/Round5/assembly-preflight.json` 的mode=filesystem_only。
- 修复PersistPreviewTexture把`_Animated_Delta_`规范成`_Animated_`后与EFaceTextureType匹配，否则动画皮肤贴图会找不到原始payload；该代码已编译。skin_v3真正重装配和重渲染尚未执行，当前房间仍旧副本。
- 新男女主交付状态以Claude为准，不能凭mtime判“已交付”。本轮没有保存/改写Content/Characters，也没有尝试Epic登录。
- 待跑 `python3 Tools/round5_assembly_preflight.py --editor` 只读查询can_build；之后按作者 `Tools/char_assemble.py` 的Optimized+High逐个组装、每个释放内存。UE/Blender重活不得同时运行。auto-rig/云服务登录需求交Claude协调，不能偷偷登录。

## C19 渲染：运行时能力已采样，未开启对比验收

C15当前真实运行返回：GPU **Apple M6**，RHIHardwareRayTracing=true、RHIInlineRayTracing=true、MegaLights.Supported=true；工程r.RayTracing=0、r.Lumen.HardwareRayTracing=0、MegaLights.EnableForProject=0，Lumen GI/Reflection=1，VSM=1。不能再写“Mac不支持硬件光追”，也不能把硬件能力当成渲染已开启。

能力原始字段在 `c15-firstperson.json.capabilities`。独立工具 `round5_renderer_audit.py` 只有self-test跑过，未运行编辑器入口，尚无硬件RT/MegaLights/VT逐项同机位对比或帧时间验收。真实窗外、太阳时间、完整物理相机曝光和美术仍待做。

## 编译、引擎路径与锁

真实外盘引擎：`/Volumes/Games/Game-Engine/Epic Games/UE_5.8`。
旧路径 `/Users/Shared/Epic Games/UE_5.8` 是symlink。`ue_character_common.run_locked_editor`已改为resolve真实引擎路径，否则UE会把descriptor相对到错误目录，报Failed to open descriptor。

```bash
cd '/Users/shoudaodefengge/项目/.claude/worktrees/game-memory/手机游戏/word-quest-ue'
UE_LOCK_WHO=claude Tools/run_ue_serial.sh  '/Volumes/Games/Game-Engine/Epic Games/UE_5.8/Engine/Build/BatchFiles/Mac/Build.sh'  WordQuestUEEditor Mac Development -project="$PWD/WordQuestUE.uproject"  -NoPCH -MaxParallelActions=2
```

- 引擎迁移后旧PCH造成Core类型重复定义；本轮通过-NoPCH，补齐以前靠共享PCH隐式包含的头文件。不要直接把旧PCH错误当新游戏代码错误。
- 最新成功编译 `Saved/Round5/capture-build.log`：**Result: Succeeded，46.06秒**。包括C15、C16、NPC客户端和Mac AVFoundation后端。
- 成功编译后又有NPC触屏/手柄和编辑焦点修正（NpcDirector.h/.cpp），**当前工作树仍需接手者重新编译**。C15实测针对上次成功binary，不能说所有最新工作树都实测过。
- `run_ue_serial.sh`新增 `Saved/ue_run.lock.build.<pid>` 标记：活着的排队编译优先于新编辑器，避免编译移走dylib时反复弹模块缺失提示；标记由进程清理，dead pid会回收。两个真实shell锁回归测试已通过：旧锁恢复、编译排在新editor之前。
- 用户要求停工后，Codex在未获得锁/未开始Build.sh前取消了自己的排队wrapper pid12134；Codex的build标记已无残留（其他协作者的新标记不能删除）。`possession-build.log`只有等待内容，不是成功编译，不要误读。
- Codex C15 UE已正常通过测试后os._exit(0)退出。当前全局锁是**Claude自己的char_v2.py**（末次核对时wrapper pid13200，11:02:32）；不能为了说“锁空了”删除他人的锁。**Codex已经释放自己的锁，且没有待执行UE/编译。**

## 测试和续跑命令（本次交接后由Claude/DeepSeek执行）

```bash
python3 Tools/test_ue_serial_lock.py                 # 已通过2项；无UE
python3 Tools/test_offline_physics.py                # 已通过8项；无UE
python3 -m unittest discover -s Tools -p test_npc_offline.py  # 已通过2项；无UE
python3 Tools/round5_renderer_audit.py --self-test    # 已通过
python3 Tools/round5_assembly_preflight.py --self-test # 已通过

# 以下均需接手者先确认编译成功、没有Blender重活：
python3 Tools/setup_offline_physics.py
python3 Tools/test_offline_physics.py --editor
python3 Tools/test_npc_client_mock.py
python3 Tools/test_npc_online_round5.py
python3 Tools/round5_assembly_preflight.py --editor
python3 Tools/round5_renderer_audit.py
```

`Tools/verify_round5_batch.py`是**尚未实跑**的单编辑器顺序驱动器：物理setup→PIE→mock→在线Paul→能力→组装预检→原生自动化。目的为避免每项反复载入几百个编辑器插件。相关editor_main增加可选on_complete/exit_editor参数，原独立入口仍保留。先审查再用，不要当已验证的全链路。

4K捕获在16GB机器非常慢，96采样中止后已改为32次稳定时间采样且至少3秒；最终C15图使用32采样完成。不是稳定60fps的证据。普通游戏没有额外4K SceneCapture，验收要另测实际视口帧时间。本轮没有录屏。

## 输出存放

`Saved/Round5`为新建symlink，指向外盘：`/Volumes/Games/Projects/word-quest-ue/产物/round5`。没有搬迁/删除用户已有资产。
主要报告：c15-firstperson.json、c15-pie.log、4K PNG、assembly-preflight.json（仅文件系统预检）、各次build.log。C15json中exposure_curve字段保守写Not measured，records里确有20个有效原始采样；暗亮阶跃验收未做。

## 改过的文件清单

下列为Codex第五轮本轮范围。工作树还有Claude/DeepSeek的既有和同期改动；不要git add全部、不要覆盖作者数据。Config/Mac、char_v2.py、Content/Data/npc及人物源资产不属于本轮Codex修改。

### 修改的既有Source
- `Source/WordQuestUE/WordQuestCharacter.cpp`
- `Source/WordQuestUE/WordQuestCharacterStagingLibrary.cpp`
- `Source/WordQuestUE/WordQuestExerciseWidget.cpp`
- `Source/WordQuestUE/WordQuestMemoryDirector.cpp`
- `Source/WordQuestUE/WordQuestMemoryGameMode.cpp`
- `Source/WordQuestUE/WordQuestMemoryGameMode.h`
- `Source/WordQuestUE/WordQuestMemoryNavigation.cpp`
- `Source/WordQuestUE/WordQuestMemoryNavigation.h`
- `Source/WordQuestUE/WordQuestRefCameraRig.cpp`
- `Source/WordQuestUE/WordQuestRenderDiagnostics.cpp`
- `Source/WordQuestUE/WordQuestRenderDiagnostics.h`
- `Source/WordQuestUE/WordQuestUE.Build.cs`

### 新增的Source
- `Source/WordQuestUE/WordQuestFirstPersonCharacter.cpp`
- `Source/WordQuestUE/WordQuestFirstPersonCharacter.h`
- `Source/WordQuestUE/WordQuestNpcDialogueClient.cpp`
- `Source/WordQuestUE/WordQuestNpcDialogueClient.h`
- `Source/WordQuestUE/WordQuestNpcDirector.cpp`
- `Source/WordQuestUE/WordQuestNpcDirector.h`
- `Source/WordQuestUE/WordQuestNpcProtocol.cpp`
- `Source/WordQuestUE/WordQuestNpcProtocol.h`
- `Source/WordQuestUE/WordQuestNpcProtocolTests.cpp`
- `Source/WordQuestUE/WordQuestNpcSpeech.cpp`
- `Source/WordQuestUE/WordQuestNpcSpeech.h`
- `Source/WordQuestUE/WordQuestNpcSpeech.mm`
- `Source/WordQuestUE/WordQuestWorldInteraction.cpp`
- `Source/WordQuestUE/WordQuestWorldInteraction.h`

### 配置
- `Config/DefaultEngine.ini`（自动曝光开启/扩展EV）
- `WordQuestUE.uproject`（TextToSpeech插件）

### 工具与测试
- `Tools/run_ue_serial.sh`
- `Tools/ue_character_common.py`
- `Tools/test_firstperson_round5.py`
- `Tools/setup_offline_physics.py`
- `Tools/test_offline_physics.py`
- `Tools/test_npc_client_mock.py`
- `Tools/test_npc_offline.py`
- `Tools/test_npc_online_round5.py`
- `Tools/test_ue_serial_lock.py`
- `Tools/round5_renderer_audit.py`
- `Tools/round5_assembly_preflight.py`
- `Tools/verify_round5_batch.py`

### 三件套和进度
- `Docs/engine-firstperson-round5.md`
- `Docs/engine-physics-round5.md`
- `Docs/engine-npc-round5.md`
- `Docs/engine-render-round5.md`
- `Docs/tasks/STATUS.md`
- `Docs/tasks/handoff-codex-round5.md`（本文件）

## 其他已知问题

- UE启动内置Concert反射测试报CreationTimeInTicks未初始化，见c15-pie.log。不是本轮NPC测试，不要记成“所有引擎日志零错误”；本轮未关闭或修改引擎测试。
- idevice_id x86二进制在本机报告Bad CPU type，是编辑器设备枚举警告；未以它为业务验证通过依据。
- 捕获场景内大量旧MHC副本与Groom导致4K极慢；不要同时开第二个UE或Blender。没有证明桌面60fps。
- 双指拿物时导航目前直接return，会跳过该帧剩余移动输入处理，需真机检查不会遗留上一帧移动。
- 地面/家具碰撞、楼梯/坡道、触屏/手柄、四种声音试听、流式在线延迟、预算耗尽、真实头眼/日程动画、完整第一人称身体、最终服装/皮肤、逐项光追/VT对比均未最终验收。

停止交接后不再运行工具编译或UE。剩余由Claude/DeepSeek接手。

末次核对补充：全局锁随后由Claude继续接管（pid13200 / char_v2.py）；新出现build标记13217、13219属于其他协作者的后续编译，Codex未创建、未清理这些标记。已取消的Codex wrapper12134不存在，自己的UE测试进程已结束。
