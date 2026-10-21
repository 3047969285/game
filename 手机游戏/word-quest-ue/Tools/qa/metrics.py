"""D3 共用度量：相似变换对齐、区域关键点、剪影/头发掩码、IoU、并排图。

纯 numpy + PIL，不依赖 mediapipe；mediapipe 只在 compare_landmarks.py 里按需导入。
"""
from __future__ import annotations

import numpy as np

# ---- MediaPipe FaceMesh 468 点的分区索引（常用集合，足够做分区误差） ----
REGIONS = {
    "left_eye": [33, 7, 163, 144, 145, 153, 154, 155, 133],
    "right_eye": [263, 249, 390, 373, 374, 380, 381, 382, 362],
    "brows": [70, 63, 105, 66, 107, 55, 65, 52, 53, 46,
              300, 293, 334, 296, 336, 285, 295, 282, 283, 276],
    "nose": [1, 2, 3, 4, 5, 6, 45, 48, 49, 64, 98, 168, 195, 197, 275, 278, 279, 294, 327, 326, 97],
    "mouth": [61, 185, 40, 39, 37, 0, 267, 269, 270, 409, 291, 375, 321, 405, 314, 17, 84, 181, 91, 146],
    "contour": [10, 338, 297, 332, 284, 251, 389, 356, 454, 323, 361, 288, 397, 365, 379, 378,
                400, 377, 152, 148, 176, 149, 150, 136, 172, 58, 132, 93, 234, 127, 162, 21, 54, 103, 67, 109],
}


def similarity_align(src: np.ndarray, dst: np.ndarray) -> np.ndarray:
    """求 2x3 相似变换 M（缩放+旋转+平移），使 M·src ≈ dst。Umeyama。"""
    src = np.asarray(src, dtype=np.float64)
    dst = np.asarray(dst, dtype=np.float64)
    mu_s = src.mean(axis=0)
    mu_d = dst.mean(axis=0)
    cs = src - mu_s
    cd = dst - mu_d
    cov = (cd.T @ cs) / len(src)
    u, s, vt = np.linalg.svd(cov)
    d = np.eye(2)
    if np.linalg.det(u) * np.linalg.det(vt) < 0:
        d[-1, -1] = -1
    r = u @ d @ vt
    var_s = (cs ** 2).sum() / len(src)
    scale = float(s.sum()) / var_s if var_s > 0 else 1.0
    t = mu_d - scale * (r @ mu_s)
    return np.array([[scale * r[0, 0], scale * r[0, 1], t[0]],
                     [scale * r[1, 0], scale * r[1, 1], t[1]]], dtype=np.float64)


def apply_affine(points: np.ndarray, m: np.ndarray) -> np.ndarray:
    pts = np.asarray(points, dtype=np.float64)
    return pts @ m[:, :2].T + m[:, 2]


def landmark_errors(aligned: np.ndarray, ref: np.ndarray) -> dict:
    """逐点欧氏距离 + 分区统计（像素）。"""
    dist = np.linalg.norm(np.asarray(aligned) - np.asarray(ref), axis=1)
    out = {
        "mean": float(dist.mean()),
        "max": float(dist.max()),
        "p95": float(np.percentile(dist, 95)),
    }
    for name, idx in REGIONS.items():
        sel = [i for i in idx if i < len(dist)]
        if sel:
            d = dist[sel]
            out[name] = {"mean": float(d.mean()), "max": float(d.max())}
    return out


def foreground_mask(img: np.ndarray, white_threshold: int = 244) -> np.ndarray:
    """白底前景：任意通道低于阈值即前景。"""
    a = np.asarray(img, dtype=np.int16)
    if a.ndim == 3 and a.shape[2] >= 3:
        a = a[..., :3]
    return (a.min(axis=-1) < white_threshold)


def background_rgb(img: np.ndarray, margin: float = 0.04) -> np.ndarray:
    """用四角小块的逐通道中位数估计背景色（支持白底、灰底、深色 lookdev 背景）。"""
    a = np.asarray(img, dtype=np.float32)
    if a.ndim == 2:
        a = np.stack([a] * 3, axis=-1)
    h, w = a.shape[:2]
    mh, mw = max(2, int(h * margin)), max(2, int(w * margin))
    patches = [a[:mh, :mw], a[:mh, -mw:], a[-mh:, :mw], a[-mh:, -mw:]]
    return np.median(np.concatenate([p.reshape(-1, 3) for p in patches], axis=0), axis=0)


def foreground_mask_auto(img: np.ndarray, threshold: float = 24.0) -> np.ndarray:
    """通用背景分离：像素与背景色的最大通道差 > threshold 视为前景（白底/灰底都适用）。"""
    a = np.asarray(img, dtype=np.float32)
    if a.ndim == 2:
        a = np.stack([a] * 3, axis=-1)
    bg = background_rgb(a)
    dist = np.abs(a[..., :3] - bg).max(axis=-1)
    return dist > threshold


def hair_mask_auto_bg(img: np.ndarray, threshold: float = 24.0, v_max: float = 100.0, s_max: float = 200.0) -> np.ndarray:
    """通用前景 + 暗色低饱和头发（不会把灰/黑背景误判为头发）。"""
    return hair_mask(img, v_max=v_max, s_max=s_max) & foreground_mask_auto(img, threshold)


def hair_mask(img: np.ndarray, v_max: float = 100.0, s_max: float = 200.0,
              dark_ratio: float = 0.6) -> np.ndarray:
    """暗色、低饱和的头发区域。v_max 可配置：男主黑发用 100，女主深红发可放宽到 120。"""
    a = np.asarray(img, dtype=np.float32)
    if a.ndim != 3 or a.shape[2] < 3:
        return np.zeros(np.shape(a)[:2], dtype=bool)
    r, g, b = a[..., 0] / 255.0, a[..., 1] / 255.0, a[..., 2] / 255.0
    v = a[..., :3].max(axis=-1)          # 0-255
    mx, mn = a[..., :3].max(axis=-1), a[..., :3].min(axis=-1)
    s = np.where(mx > 0, (mx - mn) / np.maximum(mx, 1.0), 0.0) * 255.0
    return (v < v_max) & (s < s_max)


def mask_iou(a: np.ndarray, b: np.ndarray) -> float:
    a = np.asarray(a, dtype=bool)
    b = np.asarray(b, dtype=bool)
    union = np.logical_or(a, b).sum()
    if union == 0:
        return 1.0
    return float(np.logical_and(a, b).sum() / union)


def difference_rgb(ref_mask: np.ndarray, out_mask: np.ndarray) -> np.ndarray:
    """差异热图：红=参考有渲染无，蓝=渲染有参考无，绿=重合。"""
    h, w = ref_mask.shape
    img = np.zeros((h, w, 3), dtype=np.uint8)
    both = np.logical_and(ref_mask, out_mask)
    only_ref = np.logical_and(ref_mask, ~out_mask)
    only_out = np.logical_and(~ref_mask, out_mask)
    img[both] = (40, 190, 90)
    img[only_ref] = (230, 60, 60)
    img[only_out] = (60, 110, 255)
    return img
