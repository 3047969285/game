# 项目总进度（Claude + Codex 双线）

> 分支 `memory-game`，已快进合并到 `main`。最后更新：2026-10-21。
> 分工见 [collab-3d.md](collab-3d.md)：
> - Claude：人物模型 + 记忆玩法设计
> - Codex：世界画质、操控、渲染、接入

## 1. 游戏定位（不变）

2090 年的老人回忆 2026 年的大学英语课。基调：科技记忆感，带一点伤感。

- 世界随着英语声音慢慢建立。
- 默认第三人称；第一人称是真实的学习过程；还有第二人称和 2D 视角。
- 内容覆盖《大学英语读写 3》（第四版，思政智慧版）的全部单词和课文。
- 设计文档：[gdd-memory-game.md](gdd-memory-game.md)。下一步计划：[plan-next.md](plan-next.md)。

## 2. Claude 完成的工作

| 提交 | 内容 |
|------|------|
| beacc25 | 记忆游戏设计文档（2090 回忆框架）和 M1 引擎接口 |
| 9c04716 | M1a：回忆舞台、声音建世界、三种视角、笔记本 |
| 177f145 | M1b：2090 序章；《Thursday's Silence》一章可从头玩到尾 |
| f69cec8 / f3a548c | M1c：自由切换视角、第一人称学习、各幕的完整课文、本地教材导入 |
| e078b6e | `plan-next.md` 下一步计划 |
| cf4c68f | 人物全骨骼绑定，坐姿按椅子校准，加生活化动作 |
| 4c85643 | 同学各有身份：脸型、发型、发色、配饰 |
| caf60d0 | 每个单元不同的冷色回忆调色、天气系统、睁眼入场、流畅度 |
| 6ca1fe6 / 83c2d3b | 主角建模交接文档和流水线脚本（[hero-pipeline/README.md](hero-pipeline/README.md)） |

### 主角建模（进行中）

用户要求用代码建造、质量最高、和参考图完全一致。当前路线是 MPFB 参数化人体 + 照片拟合，全部用代码完成。

- **已完成（男主）**：
  - 脸型拟合：正面 3 px，3/4 视角 10 px，侧面轮廓 2 px。
  - RBF 自由形变。
  - 照片投影出皮肤，带遮罩、去光照、色调补洞。
  - 发片头发初版：约 2600 片，成簇的发尖，体积化法线。
  - 初版材质和布光。
- **对比图**：`hero-pipeline/progress/male_look_vs_ref.png`、`male_skin_vs_ref.png`。
- **还没做**：头发细修（头顶碎片、前额头盔感）、眉毛和睫毛、衣服、骨骼与表情、GLB 导出、女主。详见 hero-pipeline/README.md 第 6 节。
- **脚本**：运行用的在 `~/.local/share/hunyuan3d/work/`，`docs/hero-pipeline/scripts/` 里是备份。

## 3. Codex 完成的工作

| 提交 | 内容 |
|------|------|
| 05f3894 | 用开源授权的人体模型改进记忆里的人物，加面部动画 |
| a169ff3 | 原创钢琴配乐，场景交叉淡入淡出，说话时自动压低音量 |
| d0fd37b | 记忆入场：等资源就绪后才出现的光门过渡 |
| a4bd94a | 去掉记忆场景里失控的合成雨噪声 |
| dd19a1a | 优化记忆重建、室内材质、阳光房细节 |
| 95e286c | 角色脸部雕刻、妆面、头发材质 |
| a46c888 | 回忆入场保持人眼高度，重建配色跟随单元颜色 |
| 247c583 | 接入英雄模型；交付前显示“制作中”提示 |
| 987c2a0 | 物理日光、级联阴影、时间性 HDR 渲染 |
| e12e5ac | 地形分块，LOD 边界连续，近处视差 |
| 1d985fd | 密集的风吹草地，保守的远处树冠 LOD |
| c6e4a61 | 场景水面反射 / 折射，世界表面风化效果 |
| 6e14521 | 天气与太阳时间同步，雨水和湿润效果感知地形 |
| 44742a8 | QHD 渲染优化，加游戏设置，第三人称相机拉近 |

### Codex 进行中（在工作区里，**尚未提交**）

接口文档：[api-world-controls.md](api-world-controls.md)

- **操控**：鼠标锁定环顾（Esc 释放，不支持时回退为拖动），手机拖动环顾 + 摇杆。拖动不再误触发点击寻路。
- **移动**（`PlayerController`）：步行 2.2 m/s、奔跑约 4.07 m/s，起停平滑，去掉了角色上下抖动。
- **碰撞**（`worldCollision.ts`）：静态网格按网格缓存，分小步移动，沿墙滑动，能过门洞和台阶，相机遇墙收缩。不是完整的刚体物理。
- **步态**（`locomotion.ts`）：按实际行走距离推进步伐，加摆臂、屈膝、躯干扭转。
- **画面**：晴天不再泛灰；可调 `hazeStrength`；Bloom 降低。
- **手机**：设置面板不再被裁切。
- **测试**：ExplorerCamera、PlayerController、Locomotion、WorldCollision 都有新增测试。
- **新目录**：`art/characters/`、`scripts/characters/prepare_reference_studio.py`（人物参考图工作室准备脚本）。
- 质量截图在 `docs/quality-shots/10–12-*.png`。

## 4. 下一步

1. **Claude**：按 [hero-pipeline/README.md](hero-pipeline/README.md) 第 6 节继续男主：头发细修 → 眉毛睫毛 → 皮肤色调 → 衣服 → 骨骼 / ARKit 表情 → 导出 `public/models/heroes/me2026.glb`。然后做女主 `lin.glb`。
2. **Codex**：
   - 提交上面那批操控 / 碰撞 / 步态改动，跑完 `npm test` 和构建。
   - 继续往“地平线”级别的世界画质推进。
   - 英雄 GLB 交付后接入并做同角度对比。
3. **玩法内容**（[plan-next.md](plan-next.md)）：单元 1–6 的手写记忆、2D 小游戏、记忆盒。
