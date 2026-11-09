# C17 第六轮：运行时对话闭环

## 产品需求说明书
严格使用v1.2人设与最后一行@@META协议。正文流式进入世界字幕；未完成或非法元数据不得显示/朗读。解析失败保留可用正文、在同轮预算/总8秒内补问一次，仍失败降级为角色备用台词。每轮选择1–2个focus词，不发送未替换插槽；2026角色不能声称拥有2090记忆，困惑式提问不误杀。建议回复三条可点，支持Unicode。四人命名声音需原生测试和实际试听录音，不能只说“声音存在”。

## 接口文档
FWordQuestNpcReply提供SpokenPrefix、Parse、HasFutureClaim；UWordQuestNpcDialogueClient内部StartRequest处理原请求/修复请求，GetState报告retries、provider/visible首字延迟及tokens。Metadata含used_words/string[]、correction/string|null、suggested_replies/三条string；只接受最后一行标记，无额外尾行。不落盘密钥、请求头或服务端raw错误；保留现有600权限凭证读取、24000tokens场景预算、384输出限制和玩家存档隔离。

## 测试
原生WordQuest.Npc.*测UTF8任意分块、SSE结束/usage、@@META严格性/Unicode/未来断言；真实UE HTTP mock测成功、缺失→修复成功、二次失败fallback、8秒总超时、取消、预算和泄密遮蔽。然后Paul真实5轮，记录文本/三建议/首字延迟和token。所有脚本包含总超时及异常注销回调os._exit(1)，外层UE启动含硬超时；UE/Blender串行。四种音色录音和场景截图输出Saved/Round6并写STATUS。不提交不推送。

## 第六轮续作：锁与超时
需求：与其他执行者串行运行，等待锁的时间不得占用 UE 执行时间，整体等待仍需有界。接口：`run_ue_serial.sh` 在取得锁后输出持锁进程标记；`run_locked_command` 最多等锁一小时，见到本进程标记后才开始 `total_timeout`，继承锁时直接计时，超时结束本进程组。测试：用独立锁持有进程模拟排队，验证等待超过运行时限仍可成功，以及执行超时返回 124 并释放锁；然后运行真实 UE mock。


## 在线预算与测试隔离
需求：同场景要支持多轮交流并遵守预算，在线测试不得污染玩家记忆。接口：运行时按 UTF-8 字节数约三分之一加输出限额估算预留，收到 usage 后按实际用量结算；异常时保留估算。该估算不是严格 token 上界，实际调用可能超出剩余预算，生产环境仍须服务端强制限额。非 Shipping 在线测试可设置 WQ_NPC_ONLINE_RUN 将记忆写入独立测试目录。测试：UE mock、五轮在线（含首字与预算状态），确认测试文件在隔离目录。
