/// <reference types="vite/client" />
import html from "../../../tools/water-test.html?raw";
import { describe, expect, it } from "vitest";
import * as waterApi from "./waterSurface";

describe("开发水面预览页接口", () => {
  it("导入当前水面 API 并驱动共享时间与太阳 uniforms", () => {
    const match = html.match(/import\s*\{([^}]+)\}\s*from\s*["']\/src\/features\/world\/waterSurface\.ts["']/);

    expect(match).not.toBeNull();
    const importedNames = match![1].split(",").map((name) => name.trim());
    for (const name of importedNames) expect(name in waterApi).toBe(true);
    expect(html).toContain("waterUniforms.time.value");
    expect(html).toContain("waterUniforms.sunDir.value");
    expect(html).toContain("waterUniforms.sunColor.value");
  });
});
