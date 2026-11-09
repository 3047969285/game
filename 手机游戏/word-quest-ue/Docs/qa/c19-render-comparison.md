# C19 渲染逐项对比

> 同一关卡、同一机位（u01a_s1 wide，1920×1080），每个配置单独一次 UE 进程。
> 像素差异只证明“画面有/无变化”，不代表性能或最终画质验收；结论供 Claude 评审。

## 1. 单张统计

| 配置 | 平均亮度 | 黑场占比 | 过曝占比 | 说明 |
|---|---|---|---|---|
| baseline | 85.0 | 22.33% | 0.00% | project defaults |
| exposure_auto | 85.0 | 22.33% | 0.00% | physical auto exposure |
| exposure_fixed | 85.0 | 22.34% | 0.00% | fixed exposure |
| hdri_off | 89.2 | 22.56% | 0.00% | HDRI sky hidden |
| hdri_on | 85.1 | 22.35% | 0.00% | HDRI sky visible |
| megalights_off | 85.0 | 22.35% | 0.00% | MegaLights disabled |
| megalights_on | 85.9 | 22.90% | 0.00% | MegaLights enabled |
| rt_lumen_off | 85.0 | 22.28% | 0.00% | RT/Lumen off |
| rt_lumen_on | 85.1 | 22.40% | 0.00% | hardware RT + Lumen |
| virtual_textures_off | 85.1 | 22.33% | 0.00% | virtual textures off |
| virtual_textures_on | 85.0 | 22.33% | 0.00% | virtual textures on |

## 2. 分组对比

### 光追 / Lumen

| 配置 | 平均亮度 | 相对基准平均绝对差 | 差异像素占比 (>2/255) | 判定 |
|---|---|---|---|---|
| baseline | 85.0 | 0.00 | 0.00% | 无可见变化 |
| rt_lumen_off | 85.0 | 1.14 | 10.39% | 明显变化 |
| rt_lumen_on | 85.1 | 1.35 | 12.12% | 明显变化 |

### MegaLights

| 配置 | 平均亮度 | 相对基准平均绝对差 | 差异像素占比 (>2/255) | 判定 |
|---|---|---|---|---|
| baseline | 85.0 | 0.00 | 0.00% | 无可见变化 |
| megalights_off | 85.0 | 0.89 | 6.66% | 轻微变化 |
| megalights_on | 85.9 | 9.05 | 69.45% | 明显变化 |

### 虚拟纹理

| 配置 | 平均亮度 | 相对基准平均绝对差 | 差异像素占比 (>2/255) | 判定 |
|---|---|---|---|---|
| baseline | 85.0 | 0.00 | 0.00% | 无可见变化 |
| virtual_textures_off | 85.1 | 0.86 | 5.53% | 轻微变化 |
| virtual_textures_on | 85.0 | 0.82 | 5.43% | 轻微变化 |

### 物理曝光

| 配置 | 平均亮度 | 相对基准平均绝对差 | 差异像素占比 (>2/255) | 判定 |
|---|---|---|---|---|
| exposure_fixed | 85.0 | 0.00 | 0.00% | 无可见变化 |
| exposure_auto | 85.0 | 0.90 | 6.10% | 轻微变化 |

### HDRI 天光

| 配置 | 平均亮度 | 相对基准平均绝对差 | 差异像素占比 (>2/255) | 判定 |
|---|---|---|---|---|
| hdri_off | 89.2 | 0.00 | 0.00% | 无可见变化 |
| hdri_on | 85.1 | 4.55 | 68.94% | 明显变化 |

## 3. 结论（DeepSeek 汇总，供 Claude 评审）

- **光追 / Lumen**：相对 baseline 的差异像素 10.4%（off）与 12.1%（on）；但 `rt_lumen_on` 回读 `r.RayTracing=0`（请求 1，未真正激活），所以这组只能证明 GI/反射配置改变了画面，**不能证明硬件光追已生效**。需要重启编辑器后用启动 CVar 再测。
- **MegaLights**：on 相对 baseline 差异 69.5%，off 仅 6.7%，画面变化明显；回读四项 MegaLights CVar 均为请求值，说明本地光路切换生效（视觉验收仍需 Claude 看截图）。
- **虚拟纹理**：on/off 两次回读 `r.VirtualTextures=1`，`r.VirtualTexturedLightmaps` 都是 0；切换未真正生效，差异 5.5% 只能算噪声/光照抖动，**本项无结论**。
- **物理曝光**：auto 与 fixed 的平均亮度都是 85.0，差异像素 6.1%；这个静帧视角下 PPV/曝光被固定值主导，**自动曝光未证明生效**。C15 PIE 实测适应到 63% 为 0.34 s（目标 1–2 s，见 C15 报告）。
- **HDRI 天光**：hdri_off 平均亮度 89.2，hdri_on 85.1，差异像素 68.9%——天光/背景明显进入画面；太阳角度与真实时间未测。
- 以上均为**单机位单帧**证据；性能（帧时间/显存）本轮未测，不能由截图推断。建议 Claude 评审时重点看 `Saved/Round5/c19/{rt_lumen_on,megalights_on,hdri_on,hdri_off}.png`。

## 4. 复现

```bash
python3 Tools/c19_render_matrix.py
python3 Tools/qa/c19_compare.py
```
