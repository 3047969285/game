"""D2：把读写3词汇 JSON 导入 UE DataTable `/Game/Data/DT_Vocabulary`。

流程：JSON -> CSV（Tools/data_vocabulary_csv.py）-> DataTable 行结构 `/Script/WordQuestUE.WordEntry` -> 导入 -> 校验。
无头运行：
  UnrealEditor-Cmd WordQuestUE.uproject -run=pythonscript -script=Tools/data_import_vocabulary.py -unattended -nosplash -nullrhi
"""
import json
import pathlib
import sys

import unreal

PROJECT = pathlib.Path(unreal.Paths.project_dir()).resolve()
sys.path.insert(0, str(PROJECT / "Tools"))
from data_vocabulary_csv import load_rows, write_csv  # noqa: E402

JSON_PATH = PROJECT / "Content" / "Data" / "vocabulary" / "college_english_rw3.json"
CSV_PATH = PROJECT / "Content" / "Data" / "vocabulary" / "college_english_rw3.csv"
DT_PATH = "/Game/Data/DT_Vocabulary"
ROW_STRUCT = "/Script/WordQuestUE.WordEntry"


def log(msg):
    unreal.log_error("[D2] " + str(msg))


def sync_csv():
    rows = load_rows(JSON_PATH)
    write_csv(rows, CSV_PATH)
    log(f"CSV rows={len(rows)} -> {CSV_PATH}")
    return rows


def get_or_create_datatable(row_struct):
    asset_tools = unreal.AssetToolsHelpers.get_asset_tools()
    package, name = DT_PATH.rsplit("/", 1)
    if unreal.EditorAssetLibrary.does_asset_exist(DT_PATH):
        dt = unreal.load_asset(DT_PATH)
        log("existing DataTable loaded: " + DT_PATH)
        return dt
    factory = unreal.DataTableFactory()
    try:
        factory.struct = row_struct
    except Exception:
        factory.set_editor_property("struct", row_struct)
    dt = asset_tools.create_asset(name, package, unreal.DataTable, factory)
    log("created DataTable: " + DT_PATH)
    return dt


def import_rows(dt, row_struct):
    ok = unreal.DataTableFunctionLibrary.fill_data_table_from_csv_file(dt, str(CSV_PATH), row_struct)
    log(f"fill_data_table_from_csv_file -> {ok}")
    if not ok:
        ok = dt.fill_from_csv_file(str(CSV_PATH))
        log(f"fallback dt.fill_from_csv_file -> {ok}")
    unreal.EditorAssetLibrary.save_loaded_asset(dt)
    return ok


def validate(dt, expected_rows):
    names = list(unreal.DataTableFunctionLibrary.get_data_table_row_names(dt))
    cols = [str(c) for c in unreal.DataTableFunctionLibrary.get_data_table_column_names(dt)]
    log(f"row names={len(names)} columns={cols}")
    if len(names) != expected_rows:
        raise RuntimeError(f"row count mismatch: datatable={len(names)} json={expected_rows}")
    required = {"Word", "Meaning", "UnitId"}
    missing = required - set(cols)
    if missing:
        raise RuntimeError(f"missing columns: {missing}")
    csv_text = str(unreal.DataTableFunctionLibrary.export_data_table_to_csv_string(dt))
    for sample in ("digital", "数字的", "unit01"):
        if sample not in csv_text:
            raise RuntimeError(f"sample value missing from exported DataTable: {sample}")
    log("validation OK: rows=%d, columns=%s" % (len(names), cols))


def main():
    data = json.loads(JSON_PATH.read_text(encoding="utf-8"))
    rows = sync_csv()
    row_struct = unreal.load_object(None, ROW_STRUCT)
    if row_struct is None:
        raise RuntimeError("row struct not found: " + ROW_STRUCT)
    dt = get_or_create_datatable(row_struct)
    import_rows(dt, row_struct)
    validate(dt, data["count"])
    log("D2 DONE")


if __name__ == "__main__":
    main()
