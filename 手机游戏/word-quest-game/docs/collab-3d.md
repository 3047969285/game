# 协作分工：男主 / 女主三维模型（Claude 指挥，Codex 协同）

> 目标：男主（me2026）、女主（Lin）的游戏内模型与 `~/Downloads/male_sheet.png`、`female_sheet.png`、`lian1–lian8.png` **完全一致**。
> 两个代理同时在 `memory-game` 工作树里工作，**严格按下面的文件归属，不改对方的文件**。

## 分工

| 谁 | 负责 | 只写这些位置 |
|----|------|--------------|
| **Claude（资产管线）** | 本机混元 3D（Hunyuan3D-2mv，已装在 `~/.local/share/hunyuan3d`，权重已下载）从三视图 + 脸部高清图生成身体与头部 → Blender 清理、合并头身、拓扑减面、UV、原图投影贴图 → 绑骨（Rocketbox 骨骼名）→ 表情形变 → 导出 GLB | `public/models/heroes/`（新目录）、`docs/collab-3d.md`、工作树外的 `~/.local/share/hunyuan3d/` |
| **Codex（游戏接入）** | 游戏里加载英雄模型、预览工具 `tools/hero-studio.html`、`src/` 下所有代码（actors、characters、humanVisual/humanRig 适配、镜头 / 天气 / 色调）、测试、提交与推送 | `src/`、`tools/`、`dist/`、其余 `docs/` |

- **提交**：由 Codex 统一提交。Claude 只往 `public/models/heroes/` 放文件，并在本文档“交付记录”里登记。
- Codex **不要**再自己调用混元网页版或重新生成男女主模型，避免重复劳动；需要改模型时在“需求”里写给 Claude。

## 交付格式（Claude → Codex 的接口约定）

| 项 | 约定 |
|----|------|
| 文件 | `public/models/heroes/me2026.glb`、`public/models/heroes/lin.glb`（以及 `*-preview.png` 对比图） |
| 单位 / 朝向 | 1 单位 = 1 米；glTF 标准 Y 朝上；角色正面朝 **+Z**（three.js 默认相机看 -Z 时看到正脸）；脚底在 y = 0 |
| 身高 | 男 1.84 m，女 1.68 m（含鞋） |
| 骨骼 | 与 `public/models/humans/*.glb`（Rocketbox）同名：`Hips, Spine, Spine1, Spine2, Neck, Head, LeftShoulder, LeftArm, LeftForeArm, LeftHand, …, LeftUpLeg, LeftLeg, LeftFoot, LeftToeBase`（右侧同理）+ 手指三节；T/A 姿态与 Rocketbox 一致，方便直接复用 `humanRig.ts` |
| 网格 | 单个蒙皮网格（身体+衣服+头发一体，头发另有一层可选的 alpha 发丝卡片）；≤ 60k 三角形；最多 3 个材质：`body`、`hair`、`eyes` |
| 贴图 | `baseColor` 2048²（脸部区域在 UV 中占比放大），可选 `normal`；sRGB |
| 表情 | morph 名沿用 ARKit：`eyeBlinkLeft/Right`、`jawOpen`、`mouthSmileLeft/Right`、`browInnerUp`（至少这 6 个） |
| 预览 | 每次交付附正面 / 侧面 / 背面 / 脸部特写渲染图，和参考图并排 |

## Codex 的接入任务

1. `characters.ts`：`me2026`、`lin` 改为 `model: "heroes/me2026.glb"` / `"heroes/lin.glb"`，有英雄模型时不再走 Rocketbox 换装 / 发型 / 脸部雕刻逻辑。
2. `humanVisual.ts`：支持加载任意同骨骼名的 GLB；英雄模型的缩放按 GLB 自身尺寸（不再统一缩放到 1.8 m）。
3. `tools/hero-studio.html`：并排显示参考图和模型的同角度渲染，用于逐项核对。
4. 在 Claude 交付之前，用 `public/models/heroes/` 下的占位文件（不存在时回退到旧模型）把加载链路做通，并写测试。

## 主角建模进度

计划、完成情况、下一步和流水线脚本见 [hero-pipeline/README.md](hero-pipeline/README.md)。`docs/hero-pipeline/` 归 Claude 管。

## 交付记录

| 时间 | 文件 | 说明 |
|------|------|------|
| 2026-10-21 | `public/models/heroes/me2026.glb` | 首版：Rocketbox 骨骼 53 joints、6 个 ARKit morph、56,436 tris、1m/Y-up/+Z、脚底 y=0；已合并为 4 mesh（身体+衣服+眉毛睫毛单蒙皮网格、头发卡、头皮、眼睛）、**材质 3 个**（body/hair/eyes）；预览图见 `docs/hero-pipeline/progress/male_hero_*.png`。**待办**：最终对比图、女主 lin |

## 需求 / 问题（双方在这里留言）

- （空）
