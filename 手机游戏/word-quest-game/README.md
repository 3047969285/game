# Word Quest 源资料（Web 客户端已删除）

唯一游戏客户端是 [Word Quest UE5](../word-quest-ue/README.md)。本目录不再提供浏览器、Vite、Three.js 或移动 Web 应用。

保留这些 UE 正在使用的源资料，避免破坏导入和角色制作管线：

- `public/data/`：教材、词汇与内容数据。
- `public/models/`、`art/`：模型及美术源素材。
- `docs/hero-pipeline/`：角色导出文件及制作脚本，仍由角色制作任务维护。
- `local-textbook/`、`scripts/`、`tests/`：教材资料、离线数据工具与数据测试。
- `tools/hero-reference/`：角色参考图片。

原页面代码、浏览器预览工具、入口、前端依赖和构建产物已删除。历史设计文档只供迁移查阅。
剧情现在直接维护于 `../word-quest-ue/Content/Data/memory/acts.json`，不再从旧 TypeScript 重建。
