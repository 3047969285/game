# C13 世界内记忆接口

## 产品需求说明书

完整保留 12 类练习的判定、词形修改、翻译和笔记保存。字幕与题目不再绘制到屏幕，独立世界空间文字/玻璃碎片承载它们。阅读时间到后，玩家持续注视当前文字或移动才推进；单词注视 0.6 秒显现，按住记住。屏幕仅一个无文字完整度细环。转场三秒，可跳过，世界内显示时间码与扫描粒子。

## 接口文档

- ExerciseWidget 继续作为题目状态与判定控制器；WorldElements() 提供文本、动作和编辑输入语义；世界碎片调用 HandleAction 和 SetWorldAnswer。隐藏的后端 WidgetTree 不接收屏幕点击。
- MemoryFragment 为独立世界 actor，WidgetComponent 使用 World 空间，文字透明底，动作碎片有低反射薄玻璃；同一反馈不使用彩色按钮或红叉。
- MemoryDirector 管理片段布局、注视、三种输入、冻结恢复和消散。现有 RunExerciseProbe / FinishExerciseProbe / CaptureResponsiveUI 继续可调用；截图改为拍真实世界，而不是导出旧面板。
- Missing assets 的视觉质量阻塞保留，QA 可用 WQ_TEXTBOOK_ENGINE_QA=1 检查功能；不掩盖 FAIL。

## 测试

- 集中加锁编译由主智能体执行。Probe 覆盖每种题型错误/正确/保存和冻结恢复；世界片段数量/屏幕空间控件数暴露到播放状态。
- SceneCapture 验证横竖画幅和字幕/词汇/转场证据；静态审计确认没有底部字幕、继续按钮或彩色答题面板。
- 输入实测：鼠标点击碎片、手柄左右切换并确认、触屏点按/长按、世界内文本输入。未运行的验证在交付时明确列为待验。
