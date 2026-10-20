import { describe, expect, it } from "vitest";
import { comicify } from "./comicFilter";

function image(w: number, h: number, paint: (x: number, y: number) => [number, number, number]): Uint8ClampedArray {
  const d = new Uint8ClampedArray(w * h * 4);
  for (let y = 0; y < h; y++)
    for (let x = 0; x < w; x++) {
      const [r, g, b] = paint(x, y);
      d.set([r, g, b, 255], (y * w + x) * 4);
    }
  return d;
}

describe("comicify 手绘风格滤镜", () => {
  it("降低饱和度：纯红变成偏暖的灰红", () => {
    const d = image(8, 8, () => [255, 0, 0]);
    comicify(d, 8, 8);
    const i = (4 * 8 + 4) * 4;
    expect(d[i]).toBeGreaterThan(d[i + 1]); // 仍然偏红
    expect(d[i] - d[i + 1]).toBeLessThan(255 * 0.9); // 但没有原来那么红
  });

  it("沿明暗边缘描墨线：交界处比两侧更暗", () => {
    const w = 16;
    const d = image(w, 16, (x) => (x < 8 ? [230, 230, 230] : [40, 40, 40]));
    const plain = Uint8ClampedArray.from(d);
    comicify(d, w, 16, { ink: 0 });
    comicify(plain, w, 16, { ink: 1 });
    const at = (arr: Uint8ClampedArray, x: number): number => arr[(8 * w + x) * 4];
    // 有墨线时亮的一侧靠边缘的像素被压暗
    expect(at(plain, 7)).toBeLessThan(at(d, 7));
  });

  it("同样的输入得到同样的输出；alpha 为 255", () => {
    const a = image(10, 10, (x, y) => [x * 20, y * 20, 128]);
    const b = Uint8ClampedArray.from(a);
    comicify(a, 10, 10, { seed: 3 });
    comicify(b, 10, 10, { seed: 3 });
    expect([...a]).toEqual([...b]);
    for (let i = 3; i < a.length; i += 4) expect(a[i]).toBe(255);
  });
});
