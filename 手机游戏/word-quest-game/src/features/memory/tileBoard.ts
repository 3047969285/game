import type { Tile } from "./noteTasks";

/**
 * 词块板（纯模型）：托盘里的词块点一下放进答题行，答题行里的词块点一下放回托盘。
 * 翻译题用它拼句子；UI 只负责把它画出来。
 */
export class TileBoard {
  private readonly order: string[] = [];

  constructor(readonly tiles: readonly Tile[]) {}

  /** 放进答题行末尾。已经在答题行里 / 不存在的词块返回 false */
  place(id: string): boolean {
    if (this.order.includes(id) || !this.tiles.some((t) => t.id === id)) return false;
    this.order.push(id);
    return true;
  }

  /** 放回托盘 */
  remove(id: string): boolean {
    const i = this.order.indexOf(id);
    if (i < 0) return false;
    this.order.splice(i, 1);
    return true;
  }

  clear(): void {
    this.order.length = 0;
  }

  get placedIds(): readonly string[] {
    return this.order;
  }

  get trayIds(): string[] {
    return this.tiles.filter((t) => !this.order.includes(t.id)).map((t) => t.id);
  }

  /** 答题行里按顺序的词块文字 */
  get texts(): string[] {
    return this.order.map((id) => this.tiles.find((t) => t.id === id)!.text);
  }

  get empty(): boolean {
    return this.order.length === 0;
  }
}
