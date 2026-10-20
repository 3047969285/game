import { afterEach, describe, expect, it, vi } from "vitest";
import { applyFilm, createFilmPass } from "./filmPass";

describe("film pass", () => {
  afterEach(() => vi.unstubAllGlobals());

  it("关闭零值效果，并在 reduced motion 下忽略抖动", () => {
    const pass = createFilmPass();
    applyFilm(pass, { film: 0, fade: 0, dim: 0, jitter: 0 }, 0);
    expect(pass.enabled).toBe(false);

    vi.stubGlobal("window", { matchMedia: () => ({ matches: true }) });
    applyFilm(pass, { film: 0, fade: 0, dim: 0, jitter: 1 }, 1);
    expect(pass.uniforms.uJitter.value).toBe(0);
    expect(pass.uniforms.uTime.value).toBe(0);
    expect(pass.enabled).toBe(false);

    applyFilm(pass, { film: 0.5, fade: 0, dim: 0, jitter: 1 }, 2);
    expect(pass.uniforms.uFilm.value).toBe(0.5);
    expect(pass.enabled).toBe(true);
    pass.dispose();
  });
});
