# 第三方资产许可记录

用户授权（2026-10-22）：
- 可以下载 Poly Haven 的 CC0 资产；
- 可以代为接受许可、添加免费 Fab 资产，但每一项都要记在这里；
- 不购买付费资产。

## Fab（个人许可：Fab 最终用户许可协议，Personal 档，免费）

“个人”档适用于年收入低于 10 万美元的个人。项目若商用、收入超过该门槛，要逐项改买 Professional 许可。

| 资产 | 作者 | 许可 | 用于（kit） | 项目内路径 | 添加日期 |
|------|------|------|-------------|------------|----------|
| Executive Office Chair | Hane Studios | Fab Personal（免费） | office_chair | `/Game/Fab/Executive_Office_Chair/Executive_Office_Chair` | 2026-10-22 |
| Generic Sedan Car | MWCWorks | CC BY 4.0（需署名） | car | `/Game/Fab/Generic_Sedan_Car/generic_sedan_car/StaticMeshes/generic_sedan_car` | 2026-10-22 |
| Conference Meeting Table and Chairs | CGDeluxe | CC BY 4.0（需署名） | board_table | `/Game/Fab/Conference_Meeting_Table_and_Chairs/conference_meeting_table_and_chairs/StaticMeshes/conference_meeting_table_and_chairs` | 2026-10-22 |
| Wooden Bookcases with Books | mtcollings | CC BY 4.0（需署名） | library_shelf, bookshelf | **未在已保存的 FabStaging/Content/Fab 中找到；未迁移、未使用。** kit 暂映射到 Poly Haven CC0 木书柜。 | 2026-10-22 |
| White Book（Megascans，高质量） | Quixel Megascans | Fab 标准许可（免费） | book, clutter | `/Game/Fab/Megascans/3D/White_Book_vf0pbfyoa/High/vf0pbfyoa_tier_1/StaticMeshes/vf0pbfyoa_tier_1` | 2026-10-22 |
| Asphalt Fresh（Megascans 表面，高质量） | Quixel Megascans | Fab 标准许可（免费） | street | `/Game/Fab/Megascans/Surfaces/Asphalt_Fresh_sfrofg0a/High/sfrofg0a_tier_1/Materials/MI_sfrofg0a` | 2026-10-22 |
| Striped Asphalt（Megascans 表面，高质量） | Quixel Megascans | Fab 标准许可（免费） | street（可选覆盖） | `/Game/Fab/Megascans/Surfaces/Striped_Asphalt_ufoidcskw/High/ufoidcskw_tier_1/Materials/MI_ufoidcskw` | 2026-10-22 |

CC BY 4.0 的资产要在游戏的“制作人员 / 致谢”页署名作者和作品名。

## Poly Haven（CC0，无需署名）

完整清单见 `SourceArt/PolyHaven/MANIFEST.json`，由 `Tools/fetch_polyhaven.py` 生成。导入路径为 `/Game/PolyHaven/{Models,Textures,Materials,HDRI}`。全部条目标记 CC0；`Saved/Textbook/polyhaven-import.json` 记录本轮资产路径、Nanite 状态与异常。`urban_street_01` 在 UE 5.8 Interchange 中只生成了 HDR Texture2D，因此昼间 SkyLight 使用 `urban_courtyard` 的 TextureCube；原 2D 源仍保留在工程，限制已记录。

- Poly Haven `leafy_grass` — CC0 — https://polyhaven.com/a/leafy_grass — surface texture (2K diffuse/nor_gl/arm)
- Poly Haven `sparse_grass` — CC0 — https://polyhaven.com/a/sparse_grass — surface texture (2K diffuse/nor_gl/arm)
- Poly Haven `coast_sand_01` — CC0 — https://polyhaven.com/a/coast_sand_01 — surface texture (2K diffuse/nor_gl/arm)
- Poly Haven `forest_ground_04` — CC0 — https://polyhaven.com/a/forest_ground_04 — surface texture (2K diffuse/nor_gl/arm)
- Poly Haven `brown_mud_dry` — CC0 — https://polyhaven.com/a/brown_mud_dry — surface texture (2K diffuse/nor_gl/arm)
- Poly Haven `rocky_terrain_02` — CC0 — https://polyhaven.com/a/rocky_terrain_02 — surface texture (2K diffuse/nor_gl/arm)
- Poly Haven `moon_01` — CC0 — https://polyhaven.com/a/moon_01 — surface texture (2K diffuse/nor_gl/arm)
- Poly Haven `moon_dusted_01` — CC0 — https://polyhaven.com/a/moon_dusted_01 — surface texture (2K diffuse/nor_gl/arm)
- Poly Haven `red_mud_stones` — CC0 — https://polyhaven.com/a/red_mud_stones — surface texture (2K diffuse/nor_gl/arm)
- Poly Haven `snow_02` — CC0 — https://polyhaven.com/a/snow_02 — surface texture (2K diffuse/nor_gl/arm)
- Poly Haven `oak_veneer_01` — CC0 — https://polyhaven.com/a/oak_veneer_01 — surface texture (2K diffuse/nor_gl/arm)
- Poly Haven `walnut_veneer_02` — CC0 — https://polyhaven.com/a/walnut_veneer_02 — surface texture (2K diffuse/nor_gl/arm)
- Poly Haven `white_maple_veneer` — CC0 — https://polyhaven.com/a/white_maple_veneer — surface texture (2K diffuse/nor_gl/arm)
- Poly Haven `fine_grained_wood` — CC0 — https://polyhaven.com/a/fine_grained_wood — surface texture (2K diffuse/nor_gl/arm)
- Poly Haven `wood_table_worn` — CC0 — https://polyhaven.com/a/wood_table_worn — surface texture (2K diffuse/nor_gl/arm)
- Poly Haven `white_plaster_02` — CC0 — https://polyhaven.com/a/white_plaster_02 — surface texture (2K diffuse/nor_gl/arm)
- Poly Haven `concrete_wall_003` — CC0 — https://polyhaven.com/a/concrete_wall_003 — surface texture (2K diffuse/nor_gl/arm)
- Poly Haven `rustic_stone_wall_02` — CC0 — https://polyhaven.com/a/rustic_stone_wall_02 — surface texture (2K diffuse/nor_gl/arm)
- Poly Haven `clay_roof_tiles_02` — CC0 — https://polyhaven.com/a/clay_roof_tiles_02 — surface texture (2K diffuse/nor_gl/arm)
- Poly Haven `floor_tiles_06` — CC0 — https://polyhaven.com/a/floor_tiles_06 — surface texture (2K diffuse/nor_gl/arm)
- Poly Haven `rusty_metal_02` — CC0 — https://polyhaven.com/a/rusty_metal_02 — surface texture (2K diffuse/nor_gl/arm)
- Poly Haven `rough_linen` — CC0 — https://polyhaven.com/a/rough_linen — surface texture (2K diffuse/nor_gl/arm)
