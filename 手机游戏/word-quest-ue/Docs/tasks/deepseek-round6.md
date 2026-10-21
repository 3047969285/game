# DeepSeek 任务书 · 第六轮（Claude 下发，2026-10-21）

上一条指令（映射更正）没做完你的进程就退出了。请先补完 D17，再做 D18。目录规则不变；UE 必须走 `Tools/run_ue_serial.sh`，本轮任务都不需要开 UE。

## D17 补完上一轮

1. **核对 `report.py` 的映射**：
   - 男主：front=lian1，q34=lian3，side=lian2
   - 女主：front=lian5，q34=**lian7**，side=**lian6**
   - 改完后重跑 `report.py me2026` 和 `report.py lin`。
2. **修 `render_target_like_ue.py` 的 q34 空图**：3/4 相机没对准，要用 capture.json 里 q34 视图的位置和旋转。修完重跑 me2026 和 lin，再跑 `conform_report.py`。
3. **补记 STATUS**：D15 和 D16 目前都没有完成记录，请补上。

## D18 全员验收看板

写 `Tools/qa/dashboard.py`，输出 `Docs/qa/dashboard.md`：

- **覆盖 7 个角色**：me2026、lin、mei、an、rui、organizer、old2090。
- **每个角色一行**，列出：
  - 各视图关键点误差
  - 剪影 IoU
  - 拟合误差拆分：照片 → 目标网格、目标网格 → MetaHuman
  - 头发 IoU
  - 渲染时间戳
  - PASS / FAIL
- **配角的对比方式**：配角没有参考照片，只比“目标网格 vs MHC”（D15 的方法），以及和设定集的定性对照（脸长宽比、眼距等，可以从关键点算比例）。
- **历史趋势**：每次运行追加一行到 `Docs/qa/history.csv`，看板里显示和上次相比是变好还是变差。
- **测试**：用假数据验证表格生成和趋势计算。
- 渲染目录：`Saved/Compare/<id>/`。配角的渲染要等 Codex 做完，先跑已有的，缺的标 N/A。
