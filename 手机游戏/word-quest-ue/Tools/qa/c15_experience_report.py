#!/usr/bin/env python3
"""C15 体验质检报告：从 Saved/Round5/c15-experience.json 计算步频、头摆、蹲起和曝光适应。"""
import json
import statistics
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
DATA = ROOT / 'Saved/Round5/c15-experience.json'
OUT = ROOT / 'Docs/qa/c15-experience-report.md'


def crossings_up(samples, key):
    count = 0
    previous = None
    for sample in samples:
        current = sample[key]
        if previous is not None and previous < 0 <= current:
            count += 1
        previous = current
    return count


def first_time_to_fraction(samples, key, start_value, end_value, fraction):
    if end_value == start_value:
        return None
    target = start_value + (end_value - start_value) * fraction
    for sample in samples:
        if (end_value - start_value) > 0 and sample[key] >= target:
            return sample['t']
        if (end_value - start_value) < 0 and sample[key] <= target:
            return sample['t']
    return None


def main():
    data = json.loads(DATA.read_text(encoding='utf-8'))
    walk = data.get('walk') or []
    crouch = data.get('crouch') or []
    exposure = data.get('exposure') or []
    samples = data.get('samples') or {}
    duration = walk[-1]['t'] if walk else 0.0
    steps = crossings_up(walk, 'bob_z')
    step_hz = steps / duration if duration else 0.0
    bob_z = [s['bob_z'] for s in walk] or [0.0]
    bob_y = [s['bob_y'] for s in walk] or [0.0]
    speeds = [s['speed'] for s in walk if s['speed'] > 5] or [0.0]
    eye_values = [s['eye_cm'] for s in crouch] or [0.0]
    crouch_target = min(eye_values) if eye_values else 0.0
    stand_eye = samples.get('eye_cm', 172.0)
    crouch_time = first_time_to_fraction(crouch, 'eye_cm', stand_eye, crouch_target, 0.90)
    exposure_start = exposure[0]['exposure'] if exposure else 0.0
    tail = [s['exposure'] for s in exposure[-6:]] if exposure else [0.0]
    exposure_end = statistics.median(tail) if tail else 0.0
    exposure_time = first_time_to_fraction(exposure, 'exposure', exposure_start, exposure_end, 0.63)
    checks = {
        'eye_height_170_174': 170 <= samples.get('eye_cm', 0) <= 174,
        'fov_75_85': 75 <= samples.get('fov', 0) <= 85,
        'step_freq_1.6_2.0': 1.6 <= step_hz <= 2.0,
        'bob_z_amplitude_0.2_0.8': 0.2 <= (max(bob_z) - min(bob_z)) / 2 <= 0.8,
        'bob_y_amplitude_0.05_0.4': 0.05 <= (max(bob_y) - min(bob_y)) / 2 <= 0.4,
        'crouch_90pct_under_1.2s': crouch_time is not None and crouch_time <= 1.2,
        'auto_exposure_63pct_1_2s': exposure_time is not None and 1.0 <= exposure_time <= 2.0,
        'walk_speed_120_160': 120 <= statistics.mean(speeds) <= 160,
    }
    result = 'PASS' if all(checks.values()) else 'REVIEW'
    lines = ['# C15 体验质检（第一人称）', '',
             '> 数据：`Saved/Round5/c15-experience.json`（PIE 实测，非固定值）。生成：`Tools/qa/c15_experience_report.py`。', '',
             '## 1. 实测值', '', '| 项 | 实测 | 目标 |', '|---|---|---|',
             '| 眼高 | %.1f cm | 170–174 |' % samples.get('eye_cm', 0),
             '| 水平 FOV | %.1f° | 75–85 |' % samples.get('fov', 0),
             '| 焦距 / 光圈 | %.0f mm / f%.1f | 接近人眼 |' % (samples.get('focal_mm', 0), samples.get('aperture', 0)),
             '| 走路速度均值 | %.0f cm/s | 120–160 |' % statistics.mean(speeds),
             '| 步频 | %.2f Hz | 1.6–2.0 |' % step_hz,
             '| 头部上下摆幅（半峰峰） | %.2f cm | 0.2–0.8 |' % ((max(bob_z) - min(bob_z)) / 2),
             '| 头部左右摆幅 | %.2f cm | 0.05–0.4 |' % ((max(bob_y) - min(bob_y)) / 2),
             '| 蹲下 90%% 过渡 | %s | ≤1.2 s |' % (('%.2f s' % crouch_time) if crouch_time is not None else 'N/A'),
             '| 曝光适应到 63%% | %s | 1–2 s |' % (('%.2f s' % exposure_time) if exposure_time is not None else 'N/A'),
             '| 曝光起点 → 稳定 | %.4f → %.4f | 平滑 |' % (exposure_start, exposure_end),
             '', '## 2. 自动检查', '', '| 检查 | 结果 |', '|---|---|']
    for key, ok in checks.items():
        lines.append('| %s | %s |' % (key, 'PASS' if ok else 'REVIEW'))
    lines += ['', '## 3. 结论', '',
              '- 体验数据：**%s**。' % result,
              '- 第一人称身体：`body_ready=%d`。若为 0，低头看到身体仍未交付（`needs_first_person_body` 仍在），这是 C15 剩余缺口，不影响上面的相机/移动数据。' % int('body_ready=1' in str(samples.get('standing', ''))),
              '- 头摆可在设置里关闭（`SetHeadBobEnabled(false)`）。', '',
              '## 4. 复现', '', '```bash',
              'python3 Tools/test_c15_experience.py', 'python3 Tools/qa/c15_experience_report.py', '```', '']
    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text('\n'.join(lines), encoding='utf-8')
    print('C15_REPORT', result, 'step_hz=%.2f' % step_hz, 'checks', checks)
    return 0


if __name__ == '__main__':
    raise SystemExit(main())
