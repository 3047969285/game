"""把读写3词汇 JSON 转成 UE DataTable 可导入的 CSV（纯 Python，可在 pytest 里直接测）。

字段与 `Source/WordQuestUE/WordQuestData.h` 的 FWordEntry 对齐：
Word / Phonetic / Pos / Meaning / Example / UnitId / UnitTitle / Meanings(TArray<FString>)

UE CSV 的数组语法是括号包住、元素用逗号分隔：("a","b")。
"""
from __future__ import annotations

import csv
import json
import pathlib

COLUMNS = ["Word", "Phonetic", "Pos", "Meaning", "Example", "UnitId", "UnitTitle", "Meanings"]
ROW_NAME_COLUMN = "Name"  # UE DataTable 的行名（第一列）


def _csv_array(values) -> str:
    parts = []
    for v in values:
        s = str(v).replace('"', '""')
        parts.append(f'"{s}"')
    return "(" + ",".join(parts) + ")"


def load_rows(json_path: pathlib.Path):
    data = json.loads(pathlib.Path(json_path).read_text(encoding="utf-8"))
    words = data.get("words", [])
    rows = []
    for i, w in enumerate(words, start=1):
        rows.append(
            {
                "Name": w.get("id") or f"rw3_{i:05d}",
                "Word": w.get("word", ""),
                "Phonetic": w.get("phonetic", ""),
                "Pos": w.get("pos", ""),
                "Meaning": w.get("meaning", ""),
                "Example": w.get("example", ""),
                "UnitId": w.get("unit_id", ""),
                "UnitTitle": w.get("unit_title", ""),
                "Meanings": _csv_array(w.get("meanings", [])),
            }
        )
    return rows


def write_csv(rows, csv_path: pathlib.Path) -> pathlib.Path:
    csv_path = pathlib.Path(csv_path)
    csv_path.parent.mkdir(parents=True, exist_ok=True)
    with csv_path.open("w", encoding="utf-8-sig", newline="") as fh:
        writer = csv.DictWriter(fh, fieldnames=[ROW_NAME_COLUMN] + COLUMNS)
        writer.writeheader()
        writer.writerows(rows)
    return csv_path


def main() -> int:
    project = pathlib.Path(__file__).resolve().parents[1]
    src = project / "Content" / "Data" / "vocabulary" / "college_english_rw3.json"
    out = project / "Content" / "Data" / "vocabulary" / "college_english_rw3.csv"
    rows = load_rows(src)
    write_csv(rows, out)
    print(f"[data_vocabulary_csv] wrote {len(rows)} rows -> {out}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
