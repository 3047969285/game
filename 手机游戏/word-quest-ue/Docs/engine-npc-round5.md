# C17 NPC 与 DeepSeek 流式对话

## 产品需求说明书
Offline day 的 Paul、Maria、Jason、Jack 直接复用可见 MetaHuman 演员，近距注视0.5秒后出现头旁世界文字和输入/建议，不增加屏幕面板。人设与提示词只读 DeepSeek 交付的 Content/Data/npc。缺失数据明确报告，不编造人设。请求8秒总超时，本地备用台词降级；记录首字延迟、token用量与场景预算。开发期密钥只读环境/本机600权限文件，不输出、落盘或进入提示词。Shipping禁用直接密钥访问，需要后端代理。

## 接口文档
- UWordQuestNpcDialogueClient：Configure(role,scene)、Submit(text)、Cancel；OnText/OnFinished委托。GetState只含状态码、计数和延迟，不含URL、密钥或对话。
- FWordQuestNpcSseDecoder：原始字节缓冲，按完整SSE事件后做UTF8解码，支持CRLF、多data行、usage与[DONE]。与网络层分离供原生自动化测试。
- UWordQuestNpcDirector：挂到MemoryGameMode，自动发现可见actor:<role>演员；SubmitToNpc、SelectSuggestion、CloseDialogue、IsInputActive、GetNpcState。GameMode需要CreateDefaultSubobject；移动/课文输入应在IsInputActive时让位。世界widget输入Enter提交，Esc离开。
- 模块接线：Build.cs增加HTTP、TextToSpeech；uproject启用TextToSpeech插件。现有UMG/Slate依赖复用。平台TTS通道按NPC隔离，按句排队，不重复朗读流式前缀。UE5.8公开TTS接口仅有rate/volume，没有voice/pitch选择；命名声音和音高暂记needs_voice_backend，不能宣称已实现不同音色。
- 保存：Saved/Player/npc_memory.json，限最近N轮和显式关键事实；不记录凭证、HTTP正文或错误响应。usage审计为数值JSONL，不记录聊天文本。

## 测试
原生Automation测试覆盖任意UTF8分片、SSE CRLF、多行data、usage、结束与畸形JSON；纯离线结构/密钥边界测试在Tools/test_npc_*。主控编译后通过mock HTTP测试真实客户端的流式/超时/降级。在线5轮必须等人设到位且显式运行，报告仅记延迟、token和脱敏内容，不打印本机env。截图只拍世界字幕，不拍密钥设置页。未验证前不记C17完成。

## 2026-10-28 实现与验证边界

- 客户端、字节SSE协议、世界字幕输入/三建议、限角LookAt数据、分NPC记忆和显式RememberFact接口已写。最近6轮和每人12条事实留在Saved；HTTP日志仅应用状态码，不打印headers/body。Shipping客户端返回credentials_unavailable，必须接代理。
- 环境DEEPSEEK_MODEL可覆盖默认deepseek-chat。官方接口文档当前模型名称与任务指定存在版本差异；不自动切到更贵模型，错误走本地fallback。
- 已适配刚交付人设的schedule和完整模板插槽；人设appearance仍归作者，角色重映射不由本组件偷偷改源文件。
- 场景预算24000 tokens；按请求UTF8字节上界+输出384+协议余量预留，收到usage后结算。超时/取消缺usage保守计预留，防止反复取消绕过费用上限。数字审计npc_usage.jsonl不含对话。
- mock仅允许127.0.0.1与固定伪凭证组合，WQ_NPC_MOCK_RUN把所有测试存档隔离在Saved/NpcTests/<run>，不覆盖玩家记忆。离线fixture两项通过，Native协议自动化与完整UE mock仍待主控运行。
- 尚未完成：真实眼骨/头骨LookAt驱动（只有限角数据并打needs_npc_gaze_rig）；真实待机日程动画切换；命名TTS声音/音高（当前插件默认平台音色，标needs_voice_backend）；实际NPC输入/触屏/手柄体验截图；Paul在线5轮与首句3秒目标。不能把这些计为完成。
- 模块接线由主控完成，编译由主控统一串行。此子任务没有启动UE、Blender、请求真实API或读取真实密钥文件，没有提交推送。


## C17 命名语音后端补充（2026-10-28）
### 产品需求说明书
四位家庭成员使用本机已安装的Daniel、Samantha、Rishi、Reed英语声音，真实区分音色、语速和音高，不自动下载。世界字幕仍由原客户端流驱动，完整句子交给UE TextToSpeech渠道队列。
### 接口文档
新增WordQuestNpcSpeech::ConfigureChannel(TTS,Channel,Role,Report)，内部安装自定义ITextToSpeechFactory并AddCustomChannel。macOS后端使用原生AVSpeechSynthesizer，没有shell和文本命令解释。只从speechVoices列表选英语声音，Reed优先en-US，同名优先已安装较高质量；不存在时明确native_english_fallback，其他平台默认plugin通道并报告无法自定义声音和音高。
Native SDK按主线程创建/释放，取消和结束用generation隔离，完成回调再转UE游戏线程，delegate不持有Actor或UObject。MainThreadCall依赖Core，Mac链接AVFoundation。主控只替换通道创建代码，Speak/IsSpeaking/Remove等继续走UE插件接口。
voice.rate为目标WPM，经WPM/360映射为AVSpeechUtterance.rate（SDK没有跨音色精确WPM保证）；voice.pitch为0–100控制映射0.8–1.2倍音高。不会把42误当42Hz或把158直接传给0–1速率。该映射是需要试听校准的产品约定，不宣称测得精确WPM。
### 测试
只读/usr/bin/say -v '?'核对四种目标英语声音均已存在；没有下载或播音。新增原生自动化WordQuest.Npc.NamedSpeechControls，核对参数差异和macOS四种本地命名语音匹配。主控后续编译和实际四人试听仍需做；此子任务没有启动UE/Blender、没有编译、没有读取任何密钥。
