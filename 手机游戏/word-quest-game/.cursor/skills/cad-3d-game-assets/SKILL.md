---
name: cad-3d-game-assets
description: >-
  Project skill: CAD 三维建模与 GLB 导入 word-quest-game 探险地图。用户提到 CAD、三维、
  GLB、地标、Blender 导出时使用。详见用户目录同名 skill 的 reference.md。
---

# CAD 三维（本项目）

游戏已接入 CAD 模型管线，清单：`public/models/manifest.json`。

## 一键构建地图

```bash
npm run gen:models
npm run validate:models
npm run dev
```

## 文件路径

| 用途 | 路径 |
|------|------|
| GLB 地标 | `public/models/rw3/unit0N.glb` |
| OpenSCAD 源 | `public/models/cad-source/*.scad` |
| 生成脚本 | `scripts/generate_rw3_landmarks.mjs` |
| 清单 | `public/models/manifest.json` |

## 完整规范

读取个人 skill（同机共享）：

`~/.cursor/skills/cad-3d-game-assets/SKILL.md`

或仓库内参考：`scripts/validate_glb.py` + `public/models/manifest.json`
