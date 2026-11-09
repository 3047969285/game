# C15 体验质检（第一人称）

> 数据：`Saved/Round5/c15-experience.json`（PIE 实测，非固定值）。生成：`Tools/qa/c15_experience_report.py`。

## 1. 实测值

| 项 | 实测 | 目标 |
|---|---|---|
| 眼高 | 172.0 cm | 170–174 |
| 水平 FOV | 80.0° | 75–85 |
| 焦距 / 光圈 | 21 mm / f8.0 | 接近人眼 |
| 走路速度均值 | 127 cm/s | 120–160 |
| 步频 | 1.33 Hz | 1.6–2.0 |
| 头部上下摆幅（半峰峰） | 0.41 cm | 0.2–0.8 |
| 头部左右摆幅 | 0.23 cm | 0.05–0.4 |
| 蹲下 90% 过渡 | 0.36 s | ≤1.2 s |
| 曝光适应到 63% | 0.34 s | 1–2 s |
| 曝光起点 → 稳定 | 1.3115 → 1.1478 | 平滑 |

## 2. 自动检查

| 检查 | 结果 |
|---|---|
| eye_height_170_174 | PASS |
| fov_75_85 | PASS |
| step_freq_1.6_2.0 | REVIEW |
| bob_z_amplitude_0.2_0.8 | PASS |
| bob_y_amplitude_0.05_0.4 | PASS |
| crouch_90pct_under_1.2s | PASS |
| auto_exposure_63pct_1_2s | REVIEW |
| walk_speed_120_160 | PASS |

## 3. 结论

- 体验数据：**REVIEW**。
- 第一人称身体：`body_ready=0`。若为 0，低头看到身体仍未交付（`needs_first_person_body` 仍在），这是 C15 剩余缺口，不影响上面的相机/移动数据。
- 头摆可在设置里关闭（`SetHeadBobEnabled(false)`）。

## 4. 复现

```bash
python3 Tools/test_c15_experience.py
python3 Tools/qa/c15_experience_report.py
```
