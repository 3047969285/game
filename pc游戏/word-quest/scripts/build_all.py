#!/usr/bin/env python3
"""一键构建全部词库、内容与模板。"""

import subprocess
import sys
from pathlib import Path

SCRIPTS = [
    "build_vocabulary.py",
    "build_rw3_content.py",
    "enrich_rw3_vocab.py",   # 覆盖词汇，添加音标/例句译文/搭配
    "build_exam_content.py",
    "build_templates.py",
]


def main() -> None:
    base = Path(__file__).resolve().parent
    for script in SCRIPTS:
        path = base / script
        print(f"\n=== Running {script} ===")
        result = subprocess.run([sys.executable, str(path)], check=False)
        if result.returncode != 0:
            raise SystemExit(result.returncode)
    print("\nAll content built successfully.")


if __name__ == "__main__":
    main()
