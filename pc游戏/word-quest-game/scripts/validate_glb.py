#!/usr/bin/env python3
"""校验 GLB 文件是否可被游戏加载（魔数、JSON chunk、Crystal 命名提示）。"""

from __future__ import annotations

import json
import struct
import sys
from pathlib import Path

GLB_MAGIC = 0x46546C67  # "glTF"
PICK_HINTS = ("crystal", "pick", "clickzone")


def read_glb_json_chunk(data: bytes) -> dict | None:
    if len(data) < 20:
        return None
    magic, _version, _length = struct.unpack("<III", data[:12])
    if magic != GLB_MAGIC:
        return None
    chunk_len, chunk_type = struct.unpack("<II", data[12:20])
    if chunk_type != 0x4E4F534A:  # JSON
        return None
    chunk = data[20 : 20 + chunk_len]
    return json.loads(chunk.decode("utf-8", errors="replace"))


def scan_node_names(gltf: dict) -> list[str]:
    names: list[str] = []
    for node in gltf.get("nodes") or []:
        if "name" in node:
            names.append(str(node["name"]))
    for mesh in gltf.get("meshes") or []:
        if "name" in mesh:
            names.append(str(mesh["name"]))
    return names


def validate_file(path: Path) -> tuple[bool, list[str]]:
    msgs: list[str] = []
    if not path.is_file():
        return False, [f"文件不存在: {path}"]

    data = path.read_bytes()
    if len(data) < 12:
        return False, ["文件过小，不是有效 GLB"]

    magic, version, length = struct.unpack("<III", data[:12])
    if magic != GLB_MAGIC:
        return False, ["魔数错误：不是 GLB（请从 Blender 导出 glTF Binary）"]

    msgs.append(f"GLB v{version}，{length:,} 字节")

    gltf = read_glb_json_chunk(data)
    if gltf:
        meshes = len(gltf.get("meshes") or [])
        nodes = len(gltf.get("nodes") or [])
        msgs.append(f"网格 {meshes}，节点 {nodes}")
        names = [n.lower() for n in scan_node_names(gltf)]
        if any(any(h in name for h in PICK_HINTS) for name in names):
            msgs.append("已发现 Crystal/PICK 命名 [OK]")
        else:
            msgs.append("警告：未找到 Crystal/PICK 命名，游戏中可能无法点击进入")
    else:
        msgs.append("警告：无法解析 JSON chunk，请在 Blender 重新导出")

    return True, msgs


def main() -> int:
    if len(sys.argv) < 2:
        print("用法: python scripts/validate_glb.py <file.glb|目录>")
        return 1

    target = Path(sys.argv[1])
    paths = list(target.glob("*.glb")) if target.is_dir() else [target]
    if not paths:
        print(f"未找到 GLB: {target}")
        return 1

    ok_all = True
    for p in sorted(paths):
        ok, msgs = validate_file(p)
        status = "OK" if ok else "FAIL"
        print(f"[{status}] {p}")
        for m in msgs:
            print(f"  - {m}")
        if not ok:
            ok_all = False

    return 0 if ok_all else 1


if __name__ == "__main__":
    raise SystemExit(main())
