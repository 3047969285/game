import { describe, expect, it } from "vitest";
import type { Tile } from "./noteTasks";
import { TileBoard } from "./tileBoard";

const tiles: Tile[] = [
  { id: "a", text: "Hello", decoy: false },
  { id: "b", text: "world", decoy: false },
  { id: "c", text: "moon", decoy: true },
];

describe("TileBoard", () => {
  it("放入、取回、清空；顺序按点击先后", () => {
    const b = new TileBoard(tiles);
    expect(b.place("b")).toBe(true);
    expect(b.place("a")).toBe(true);
    expect(b.texts).toEqual(["world", "Hello"]);
    expect(b.trayIds).toEqual(["c"]);
    expect(b.remove("b")).toBe(true);
    expect(b.texts).toEqual(["Hello"]);
    b.clear();
    expect(b.empty).toBe(true);
    expect(b.trayIds).toEqual(["a", "b", "c"]);
  });

  it("重复放入、放入不存在的词块、取回不在行里的词块都不改变状态", () => {
    const b = new TileBoard(tiles);
    b.place("a");
    expect(b.place("a")).toBe(false);
    expect(b.place("zzz")).toBe(false);
    expect(b.remove("b")).toBe(false);
    expect(b.texts).toEqual(["Hello"]);
  });
});
