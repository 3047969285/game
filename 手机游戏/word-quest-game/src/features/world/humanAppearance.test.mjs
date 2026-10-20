import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { extractGlbImages, hexLuminance, pickAppearance, recolorBody, recolorHead, sampleSkin, skinMultiplier } from "./humanAppearance";

const rgb = (hex) => [(hex >> 16) & 255, (hex >> 8) & 255, hex & 255];

/** 合成贴图：夹克 / 裤子区域深色，头部贴图里上半部是深色头发、脸是亮肤色 */
function fakeBody(kind) {
  const w = 512, data = new Uint8ClampedArray(w * w * 4);
  for (let i = 0; i < w * w; i++) { data[i * 4] = 40; data[i * 4 + 1] = 42; data[i * 4 + 2] = 44; data[i * 4 + 3] = 255; }
  return { data, w, jacket: kind === "male" ? [260, 300] : [260, 330], pants: kind === "male" ? [60, 100] : [60, 380] };
}
const at = (data, w, x, y) => { const i = (y * w + x) * 4; return [data[i], data[i + 1], data[i + 2]]; };

function fakeHead(kind) {
  const w = 512, data = new Uint8ClampedArray(w * w * 4);
  for (let y = 0; y < w; y++) for (let x = 0; x < w; x++) {
    const i = (y * w + x) * 4;
    const hair = y < 90 || (kind === "male" && y > 230 && y < 290 && x > 200 && x < 320);
    const c = hair ? [38, 30, 24] : [205, 160, 130];
    data[i] = c[0]; data[i + 1] = c[1]; data[i + 2] = c[2]; data[i + 3] = 255;
  }
  return { data, w };
}

describe("humanAppearance：每个实例的外观", () => {
  it("同一 seed 总是同一个人；不同 seed 的上衣颜色不同，且不是全员深色西装", () => {
    expect(pickAppearance("male", {}, 5)).toEqual(pickAppearance("male", {}, 5));
    const outers = new Set();
    let dark = 0;
    for (let seed = 1; seed <= 20; seed++) {
      const a = pickAppearance("male", {}, seed);
      outers.add(a.outer);
      if (hexLuminance(a.outer) < 0.15) dark++;
    }
    expect(outers.size).toBeGreaterThanOrEqual(8);
    expect(dark).toBe(0);
  });

  it("剧本里的深色上衣被提亮（不会像西装），基色仍然可辨", () => {
    const a = pickAppearance("male", { shirt: 0x33384a }, 3);
    expect(hexLuminance(a.outer)).toBeGreaterThan(0.14);
    const b = pickAppearance("female", { shirt: 0xa05a6a }, 3);
    expect(Math.abs(rgb(b.outer)[0] - rgb(0xa05a6a)[0])).toBeLessThan(60);
  });

  it("同一底模两个实例的上衣贴图颜色不同、裤子颜色不同", () => {
    const x = pickAppearance("male", { shirt: 0x6a6f9a }, 1), y = pickAppearance("male", { shirt: 0x7b8f6a }, 2);
    const a = fakeBody("male"), b = fakeBody("male");
    recolorBody(a.data, a.w, a.w, x);
    recolorBody(b.data, b.w, b.w, y);
    const [ja, jb] = [at(a.data, a.w, ...a.jacket), at(b.data, b.w, ...b.jacket)];
    expect(Math.abs(ja[0] - jb[0]) + Math.abs(ja[1] - jb[1]) + Math.abs(ja[2] - jb[2])).toBeGreaterThan(30);
    // 染色后的上衣接近目标色
    const t = rgb(x.outer);
    expect(Math.abs(ja[2] - t[2])).toBeLessThan(110);
  });

  it("2090 年的他：头发 / 胡子灰白、亮度高于年轻实例，慢动作与含胸由 aged 标志驱动", () => {
    const old = pickAppearance("male", { aged: true, hair: 0x1a1410 }, 90);
    const young = pickAppearance("male", { hair: 0x1a1410 }, 90);
    expect(old.aged).toBe(true);
    expect(old.beard).toBe("full");
    expect(hexLuminance(old.hair)).toBeGreaterThan(0.7);
    expect(hexLuminance(old.hair)).toBeGreaterThan(hexLuminance(young.hair) + 0.5);
    expect(old.heightScale).toBeLessThan(1);
    const o = fakeHead("male"), yg = fakeHead("male");
    const mul = skinMultiplier(0xe0b894, sampleSkin(o.data, o.w, "male"));
    recolorHead(o.data, o.w, o.w, old, mul);
    recolorHead(yg.data, yg.w, yg.w, young, mul);
    const lumAt = (d, x, y) => { const c = at(d.data, d.w, x, y); return (0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2]) / 255; };
    expect(lumAt(o, 100, 40)).toBeGreaterThan(lumAt(yg, 100, 40) + 0.3); // 头发
    // 胡子：老人是灰白（亮、低饱和），年轻实例是干净的下巴（肤色）
    const beard = at(o.data, o.w, 260, 260);
    expect(lumAt(o, 260, 260)).toBeGreaterThan(0.45);
    expect(Math.abs(beard[0] - beard[2])).toBeLessThan(30);
    const chin = at(yg.data, yg.w, 260, 260);
    expect(chin[0] - chin[2]).toBeGreaterThan(30);
    // 皮肤仍是皮肤（脸颊不会被染成头发色）
    expect(lumAt(o, 256, 180)).toBeGreaterThan(0.4);
  });

  it("身高 ±4%，宽度 ±3%", () => {
    for (let seed = 1; seed <= 30; seed++) {
      const a = pickAppearance("female", {}, seed);
      expect(a.heightScale).toBeGreaterThanOrEqual(0.96);
      expect(a.heightScale).toBeLessThanOrEqual(1.04);
      expect(a.widthScale).toBeGreaterThanOrEqual(0.97);
      expect(a.widthScale).toBeLessThanOrEqual(1.03);
    }
  });

  for (const kind of ["male", "female"]) it(`${kind}：从 GLB 里取出原始方向的身体 / 头部贴图`, () => {
    const file = readFileSync(new URL(`../../../public/models/humans/${kind}.glb`, import.meta.url));
    const images = extractGlbImages(file.buffer.slice(file.byteOffset, file.byteOffset + file.byteLength));
    const names = images.map((i) => i.name);
    expect(names.some((n) => n.endsWith("body_color"))).toBe(true);
    expect(names.some((n) => n.endsWith("head_color"))).toBe(true);
    for (const image of images) {
      expect([...image.bytes.slice(0, 4)]).toEqual([0x89, 0x50, 0x4e, 0x47]);
    }
  });
});
