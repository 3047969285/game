# 四名 NPC 语音试听：需求、接口、测试

## 产品需求说明书

对 Paul、Maria、Jason、Jack 的人设声音制作试听录音，便于 Claude 判断声音是否贴合人物。录音应使用游戏 macOS 原生语音所选的本地英文声音、同样的语速和音高，不读取或输出密钥，不下载系统声音；不存在指定声音时显式标识回退。

## 接口文档

`python3 Tools/record_npc_voices_round6.py` 调用本机 Swift + AVFoundation，从 `Content/Data/npc/personas/<role>.json` 读取 voice 及首条 fallback_lines，在 `Saved/Round6/voice-audition/` 为每人写独立 CAF 与清单。语音选择的姓名匹配、语言、品质分数、同分 ID 排序及 WPM、pitch 换算与 `WordQuestNpcSpeech` 一致。此录音为独立 AVFoundation 合成，**不是 UE PIE 游戏内录音**，也不能单凭音频文件证明已实际人工试听或游戏音频链路可用。

## 测试

运行前先对 Swift 代码做类型检查，脚本设置 120 秒外部总超时和每条 25 秒合成超时；生成后检查每段音频存在且非空、清单记录精确匹配或回退、时长和合成设置，再进行人工试听。实际录制留给主任务按 C17 顺序执行。
