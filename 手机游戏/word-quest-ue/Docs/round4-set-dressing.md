# C12 布景细节与记忆玻璃

## 产品需求说明书

每个教材 set 派生至少 10 处低对比磨损/污迹贴花；有桌面时加入杯印、纸痕与适合的扫描杂物，有墙面时补墙脚污迹，其余贴花落在地面。只复用本地 Poly Haven CC0 扫描 PBR，不新增下载或改写教材 JSON。分布固定种子、重建幂等。磨损是扫描表面的派生贴花，不能宣称为独立摄影扫描贴花资产。

真实窗光使用局部 SpotLight，并在体积雾里投射可见光束，不靠高亮几何掩盖资产缺失。世界内练习需要低透明度、有微弱冷光边缘的细玻璃材质。

## 接口文档

`Tools/textbook_set_dressing.py`：`dressing_plan(scene, mapping_doc)` 返回局部米制的确定性 decal/clutter/light 描述；`build_set_dressing(u, spawn, scene, mapping_doc, world_cm, *, tags=None, include_clutter=True, include_light=True)` 构建 actor 并返回可审计报告。`spawn(cls,label,world_cm,values)` 复用搭建器约定：自动附加 textbook_generated；调用方负责保存关卡和锁。

生成 actor 具有 `set:<id>`、`decal`/`clutter`/`environment:lightshaft`、`source:polyhaven_cc0` 等标签。材质在 `/Game/Memory/Materials/Dressing/`，所有 MaterialEditingLibrary 接线检查返回值。扫描 BaseColor/Normal/ARM 参数从已导入 PolyHaven MI 读取；缺图报错，不使用纯色代替扫描。贴花空间边缘使用 UV 渐隐叠乘低对比噪声与扫描纹理，地面/墙/桌面高度及朝向分别约束。

`ensure_memory_glass(u)` 返回 `/Game/Memory/Materials/M_MemoryFragmentGlass`，用于玻璃碎片；半透明、低不透明度、冷色 Fresnel 边缘、物理 roughness。材质属于代码生成记忆特效，不宣称扫描资产。

## 测试

纯 Python 检查固定种子一致、每 set 至少十条贴花、不改源 JSON、贴花落在地面/墙/桌面、桌面杂物不超出边界、无桌子时不产生漂浮桌面物、材质路径只来自本地映射、窗光数量/位置有限。主流程锁内 UE 验证图节点编译/保存、每处贴花材质可加载、体积光束及玻璃可见；4K 图像验收单独进行，不以 actor 数证明画质。
