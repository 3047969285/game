"""D8：把读写3 全部学习内容（6 单元的课文段落/阅读题/听力/翻译/写作/微检查）导入 UE。

两段式：
1) 纯 Python：读 `../word-quest-game/public/data/content/college_english_rw3/unit*.json`，
   生成合并 JSON `Content/Data/content/rw3_units.json` 和分类 CSV（`Content/Data/content/*.csv`）。
2) UE Python（有 unreal 时）：为每类内容创建 DataTable（行结构用通用 JSON 包装）
   `/Game/Data/DT_Content_<Category>`，并校验行数。

无头运行：
  UnrealEditor-Cmd WordQuestUE.uproject -run=pythonscript -script=Tools/data_import_content.py -unattended -nosplash -nullrhi
仅生成数据：
  python3 Tools/data_import_content.py --data-only
"""
from __future__ import annotations

import argparse
import csv
import json
import sys
from pathlib import Path

PROJECT = Path(__file__).resolve().parents[1]
GAME = PROJECT.parent / "word-quest-game"
SRC_DIR = GAME / "public" / "data" / "content" / "college_english_rw3"
OUT_DIR = PROJECT / "Content" / "Data" / "content"
DT_DIR = "/Game/Data"

CATEGORIES = ["unit", "section", "reading_question", "listening_question", "micro_check",
              "translation", "writing", "outline_point"]
CSV_COLUMNS = ["Name", "JsonString"]


def load_units() -> list[dict]:
    units = []
    for p in sorted(SRC_DIR.glob("unit*.json")):
        units.append(json.loads(p.read_text(encoding="utf-8")))
    return units


def build_payload(units: list[dict]) -> dict:
    """合并成一份可复用 JSON + 分类行（每行一个 JSON 字符串）。"""
    merged = {"source": "college_english_rw3", "units": units}
    rows: dict[str, list[dict]] = {c: [] for c in CATEGORIES}
    for u in units:
        uid = u["unit_id"]
        rows["unit"].append({
            "name": uid,
            "payload": {k: u[k] for k in ("unit_id", "unit_number", "edition", "title", "title_zh", "theme", "word_ids")},
        })
        secs = u.get("sections", {})
        for skey in ("section_a", "section_b", "section_c"):
            sec = secs.get(skey)
            if sec:
                rows["section"].append({"name": f"{uid}:{skey}", "payload": {"unit_id": uid, "section": skey, **sec}})
        for skey in (["section_a"] if False else ["section_a", "section_b", "section_c"]):
            pass
        for i, item in enumerate(secs.get("reading", {}).get("questions", [])):
            rows["reading_question"].append({"name": f"{uid}:reading:{i}", "payload": {"unit_id": uid, **item}})
        for i, item in enumerate(secs.get("listening", {}).get("questions", [])):
            rows["listening_question"].append({"name": f"{uid}:listening:{i}",
                                               "payload": {"unit_id": uid, "title": secs.get("listening", {}).get("title", ""), **item}})
        for skey, checks in (u.get("micro_world_checks") or {}).items():
            for i, item in enumerate(checks):
                rows["micro_check"].append({"name": f"{uid}:{skey}:{i}", "payload": {"unit_id": uid, "section": skey, **item}})
        for i, item in enumerate(secs.get("translation", {}).get("sentences", [])):
            rows["translation"].append({"name": f"{uid}:translation:{i}", "payload": {"unit_id": uid, **item}})
        writing = secs.get("writing") or {}
        if writing:
            rows["writing"].append({"name": f"{uid}:writing", "payload": {"unit_id": uid, **writing}})
            for i, point in enumerate(writing.get("outline", [])):
                rows["outline_point"].append({"name": f"{uid}:outline:{i}", "payload": {"unit_id": uid, "point": point}})
    return {"merged": merged, "rows": rows}


def write_outputs(built: dict) -> dict:
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    merged_path = OUT_DIR / "rw3_units.json"
    merged_path.write_text(json.dumps(built["merged"], ensure_ascii=False, indent=1), encoding="utf-8")
    counts = {}
    for cat, rows in built["rows"].items():
        path = OUT_DIR / f"dt_{cat}.csv"
        with path.open("w", encoding="utf-8-sig", newline="") as fh:
            w = csv.DictWriter(fh, fieldnames=CSV_COLUMNS)
            w.writeheader()
            for r in rows:
                w.writerow({"Name": r["name"], "JsonString": json.dumps(r["payload"], ensure_ascii=False)})
        counts[cat] = len(rows)
    summary = {"generatedFrom": str(SRC_DIR), "counts": counts, "merged": str(merged_path)}
    (OUT_DIR / "import-summary.json").write_text(json.dumps(summary, ensure_ascii=False, indent=1), encoding="utf-8")
    return summary


def ue_import(counts: dict) -> dict:
    import unreal  # noqa: F401 (only when running inside UE)

    row_struct = unreal.load_object(None, "/Script/JsonUtilities.JsonObjectWrapper")
    if row_struct is None:
        raise RuntimeError("JsonObjectWrapper row struct not available")
    asset_tools = unreal.AssetToolsHelpers.get_asset_tools()
    results = {}
    for cat, expected in counts.items():
        name = "DT_Content_" + "".join(p.capitalize() for p in cat.split("_"))
        path = f"{DT_DIR}/{name}"
        factory = unreal.DataTableFactory()
        try:
            factory.struct = row_struct
        except Exception:
            factory.set_editor_property("struct", row_struct)
        if unreal.EditorAssetLibrary.does_asset_exist(path):
            dt = unreal.load_asset(path)
        else:
            dt = asset_tools.create_asset(name, DT_DIR, unreal.DataTable, factory)
        csv_path = OUT_DIR / f"dt_{cat}.csv"
        ok = unreal.DataTableFunctionLibrary.fill_data_table_from_csv_file(dt, str(csv_path), row_struct)
        rows = len(list(unreal.DataTableFunctionLibrary.get_data_table_row_names(dt)))
        unreal.EditorAssetLibrary.save_loaded_asset(dt)
        results[cat] = {"asset": path, "ok": bool(ok), "rows": rows, "expected": expected}
        unreal.log_error(f"[D8] {cat}: fill={ok} rows={rows} expected={expected}")
        if not ok or rows != expected:
            raise RuntimeError(f"D8 import mismatch for {cat}: ok={ok} rows={rows} expected={expected}")
    return results


def main(argv=None) -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--data-only", action="store_true")
    args = ap.parse_args(argv)
    units = load_units()
    built = build_payload(units)
    summary = write_outputs(built)
    print("[D8] counts:", json.dumps(summary["counts"], ensure_ascii=False))
    if not args.data_only:
        try:
            res = ue_import(summary["counts"])
            print("[D8] UE import:", json.dumps(res, ensure_ascii=False))
        except ImportError:
            print("[D8] unreal not available; data files written only")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
