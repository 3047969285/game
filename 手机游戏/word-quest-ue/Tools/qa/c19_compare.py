#!/usr/bin/env python3
"""C19 对比截图汇总：亮度/差异面积，逐项给出“可测变化”，不做性能验收。"""
import json
from pathlib import Path

import numpy as np
from PIL import Image

ROOT = Path(__file__).resolve().parents[2]
C19 = ROOT / 'Saved/Round5/c19'
OUT = ROOT / 'Docs/qa/c19-render-comparison.md'
GROUPS = [
    ('光追 / Lumen', ['baseline', 'rt_lumen_off', 'rt_lumen_on']),
    ('MegaLights', ['baseline', 'megalights_off', 'megalights_on']),
    ('虚拟纹理', ['baseline', 'virtual_textures_off', 'virtual_textures_on']),
    ('物理曝光', ['exposure_fixed', 'exposure_auto']),
    ('HDRI 天光', ['hdri_off', 'hdri_on']),
]


def load(name):
    path = C19 / (name + '.png')
    if not path.exists():
        return None, None
    image = Image.open(path).convert('RGB')
    array = np.asarray(image, np.float32)
    luma = array[..., 0] * .2126 + array[..., 1] * .7152 + array[..., 2] * .0722
    return luma, path


def main():
    rows = []
    data = {}
    for name in sorted({n for _, names in GROUPS for n in names}):
        luma, path = load(name)
        if luma is None:
            rows.append({'config': name, 'missing': True})
            continue
        payload = {}
        meta = C19 / (name + '.json')
        if meta.exists():
            payload = json.loads(meta.read_text(encoding='utf-8'))
        data[name] = luma
        rows.append({'config': name, 'mean': round(float(luma.mean()), 2),
                     'black': round(float((luma < 3).mean()), 4), 'clipped': round(float((luma > 250).mean()), 4),
                     'notes': payload.get('notes', ''), 'observed_cvars': payload.get('observed_cvars', {})})
    lines = ['# C19 渲染逐项对比', '',
             '> 同一关卡、同一机位（u01a_s1 wide，1920×1080），每个配置单独一次 UE 进程。',
             '> 像素差异只证明“画面有/无变化”，不代表性能或最终画质验收；结论供 Claude 评审。', '',
             '## 1. 单张统计', '', '| 配置 | 平均亮度 | 黑场占比 | 过曝占比 | 说明 |', '|---|---|---|---|---|']
    for row in rows:
        if row.get('missing'):
            lines.append('| %s | — | — | — | 截图缺失（任务未完成） |' % row['config'])
        else:
            lines.append('| %s | %.1f | %.2f%% | %.2f%% | %s |' % (row['config'], row['mean'], row['black'] * 100, row['clipped'] * 100, row['notes']))
    lines += ['', '## 2. 分组对比', '']
    for group, names in GROUPS:
        base_name = names[0] if names[0] in data else None
        base = data.get(base_name)
        lines += ['### %s' % group, '', '| 配置 | 平均亮度 | 相对基准平均绝对差 | 差异像素占比 (>2/255) | 判定 |', '|---|---|---|---|---|']
        for name in names:
            if name not in data:
                lines.append('| %s | — | — | — | 缺失 |' % name)
                continue
            luma = data[name]
            if base is None or luma.shape != base.shape:
                lines.append('| %s | %.1f | — | — | 无基准 |' % (name, float(luma.mean())))
                continue
            diff = np.abs(luma - base)
            fraction = float((diff > 2).mean())
            judgement = '无可见变化' if fraction < 0.01 else ('轻微变化' if fraction < 0.08 else '明显变化')
            lines.append('| %s | %.1f | %.2f | %.2f%% | %s |' % (name, float(luma.mean()), float(diff.mean()), fraction * 100, judgement))
        lines.append('')
    lines += ['## 3. 结论（待 Claude 评审）', '',
              '- 光追/Lumen：比较 `rt_lumen_off` 与 `rt_lumen_on`，若差异明显则说明该视角下 Lumen/RT 路径影响了 GI/反射；否则该视角不敏感。',
              '- MegaLights：比较 `megalights_on/off`；若差异明显，说明本地光路切换生效。',
              '- 虚拟纹理：VT 需要材质/贴图证据；截图差异只能作为辅助信号。',
              '- 物理曝光：`exposure_fixed` 与 `exposure_auto` 的平均亮度差可直接看出自动曝光是否起作用；适应曲线见 C15 报告。',
              '- HDRI：`hdri_on/off` 的差异证明天光/背景是否进入画面；时间和太阳角度需要另外的场景证据。',
              '- 以上均为**单机位单帧**证据；性能（帧时间/显存）本轮未测，不能由这些截图推断。', '',
              '## 4. 复现', '', '```bash',
              'python3 Tools/c19_render_matrix.py', 'python3 Tools/qa/c19_compare.py', '```', '']
    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text('\n'.join(lines), encoding='utf-8')
    print('C19_REPORT', OUT, 'configs', len(data))


if __name__ == '__main__':
    main()
