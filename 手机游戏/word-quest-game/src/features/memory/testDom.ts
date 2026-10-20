import { vi } from "vitest";

/** 仅供测试：node 环境下 PovRig / 画布纹理需要的最小 window / document 桩 */
export function fakeContext2d(): unknown {
  const store: Record<string | symbol, unknown> = {};
  const handler: ProxyHandler<object> = {
    get: (_t, key) => (key in store ? store[key] : () => new Proxy({}, handler)),
    set: (_t, key, value) => {
      store[key] = value;
      return true;
    },
  };
  return new Proxy({}, handler);
}

export function installDomStubs(): void {
  const noop = (): void => undefined;
  vi.stubGlobal("window", { addEventListener: noop, removeEventListener: noop });
  vi.stubGlobal("document", {
    createElement: () => ({ width: 0, height: 0, getContext: () => fakeContext2d(), style: {} }),
  });
}
