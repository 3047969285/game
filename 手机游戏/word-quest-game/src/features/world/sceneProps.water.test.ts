import { describe, expect, it } from "vitest";
import { createSceneKit } from "./sceneProps";

describe("场景道具水材质画质", () => {
  it("把 low/high 道具细节档位传给水面着色器", () => {
    const low = createSceneKit("low");
    const high = createSceneKit("high");

    expect(low.p.water.customProgramCacheKey()).toContain("water-v1-low-");
    expect(high.p.water.customProgramCacheKey()).toContain("water-v1-high-");

    low.p.water.dispose();
    high.p.water.dispose();
  });
});
