#!/usr/bin/env python3
"""D21-2：根据肤色 ΔL/Δa/Δb 给出 MetaHuman 皮肤 U（深浅）/ V（冷暖·红黄）的调整建议。

用法：skin_suggest.py <id> [--json out.json]

标定（来自 Claude 的 me_skin 样本，见 Docs/qa/skin-me2026.md）：
  default  U=0.22 V=0.42  → Lab (67.60, 15.14, 18.38)
  idx12    U=0.06 V=0.30  → Lab (70.69, 13.94, 18.18)
  ⇒ dL/dU ≈ -19.3（U 降低 → 变亮）
     da/dV ≈ +10.0、db/dV ≈ +1.67（V 升高 → 更红、略更黄）
  说明：只有两个可用标定点、U/V 同时变化，因此把 L 归因于 U、把 a/b 归因于 V；线性假设在 ±0.1 内近似。
  idx40 样本（V 更高、b 更低）提示 face_texture_index 也影响 b，必要时同时对比 texture_index。
"""
from __future__ import annotations

import argparse
import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
import skin_color as sc  # noqa: E402

PROJECT = Path(__file__).resolve().parents[2]
DOWNLOADS = Path.home() / "Downloads"
REFS = {"me2026": "lian1.png", "lin": "lian5.png"}

CALIB = {
    "default": {"u": 0.22, "v": 0.42, "lab": (67.60, 15.14, 18.38)},
    "idx12": {"u": 0.06, "v": 0.30, "lab": (70.69, 13.94, 18.18)},
}
K_U_L = (CALIB["idx12"]["lab"][0] - CALIB["default"]["lab"][0]) / (CALIB["idx12"]["u"] - CALIB["default"]["u"])
K_V_A = (CALIB["idx12"]["lab"][1] - CALIB["default"]["lab"][1]) / (CALIB["idx12"]["v"] - CALIB["default"]["v"])
K_V_B = (CALIB["idx12"]["lab"][2] - CALIB["default"]["lab"][2]) / (CALIB["idx12"]["v"] - CALIB["default"]["v"])


def suggest(dL: float, da: float, db: float, max_step: float = 0.10) -> dict:
    """目标：让渲染的 Lab 往参考靠；dL=ref-render（正=渲染偏暗）。"""
    du = dL / K_U_L if abs(K_U_L) > 1e-9 else 0.0
    denom = K_V_A ** 2 + K_V_B ** 2
    dv = (K_V_A * da + K_V_B * db) / denom if denom > 1e-12 else 0.0
    du_raw, dv_raw = du, dv
    du = max(-max_step, min(max_step, du))
    dv = max(-max_step, min(max_step, dv))
    def direction(x, pos, neg):
        return pos if x > 0 else (neg if x < 0 else "不变")
    steps_u = max(1, int(abs(du_raw) / max_step + 0.999)) if abs(du_raw) > max_step else 1
    steps_v = max(1, int(abs(dv_raw) / max_step + 0.999)) if abs(dv_raw) > max_step else 1
    return {
        "calibration": {"dL_dU": round(K_U_L, 2), "da_dV": round(K_V_A, 2), "db_dV": round(K_V_B, 2)},
        "input": {"dL": round(dL, 2), "da": round(da, 2), "db": round(db, 2)},
        "dU": round(du, 2), "dV": round(dv, 2),
        "dU_raw": round(du_raw, 3), "dV_raw": round(dv_raw, 3),
        "direction": {"U": direction(du, "提高 U（更深）", "降低 U（更亮）"),
                      "V": direction(dv, "提高 V（更暖/红）", "降低 V（更冷/去黄红）")},
        "steps": {"U": steps_u, "V": steps_v},
        "note": "每步 ±0.10 上限；建议每次改完重新渲染再测，不要一次跳多档。",
    }


def measure_id(cid: str) -> dict:
    base = PROJECT / "Saved" / "Compare" / cid
    ref = DOWNLOADS / REFS.get(cid, "lian1.png")
    out = {"id": cid, "ref": str(ref), "views": {}}
    for view in ("closeup", "front"):
        rp = base / f"{view}.png"
        if not rp.is_file() or not ref.is_file():
            continue
        try:
            res = sc.measure(rp, ref)
        except SystemExit as exc:
            out["views"][view] = {"error": str(exc)}
            continue
        agg = res["aggregate"]
        out["views"][view] = {"aggregate": agg, "rows": res["rows"], "white": res["white"],
                              "suggest": suggest(agg.get("dL", 0.0), agg.get("da", 0.0), agg.get("db", 0.0))}
    return out


def main(argv=None) -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("id")
    ap.add_argument("--json", default=None)
    args = ap.parse_args(argv)
    res = measure_id(args.id)
    print(json.dumps(res, ensure_ascii=False, indent=1))
    if args.json:
        Path(args.json).expanduser().write_text(json.dumps(res, ensure_ascii=False, indent=1), encoding="utf-8")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
