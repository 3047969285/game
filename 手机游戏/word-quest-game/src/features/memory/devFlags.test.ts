import { describe, expect, it } from "vitest";
import { parseMemoryDevFlags } from "./devFlags";

describe("开发期测试开关", () => {
  it("dev 构建里读 ?memauto=1 / ?memfast=1", () => {
    expect(parseMemoryDevFlags("?memauto=1", true)).toEqual({ auto: true, fast: false });
    expect(parseMemoryDevFlags("?x=2&memfast=1&memauto=1", true)).toEqual({ auto: true, fast: true });
    expect(parseMemoryDevFlags("", true)).toEqual({ auto: false, fast: false });
    expect(parseMemoryDevFlags("?memauto=0", true)).toEqual({ auto: false, fast: false });
  });

  it("?mempov=me|paper|watch 指定幕的起始视角，非法值被忽略", () => {
    expect(parseMemoryDevFlags("?mempov=me", true).pov).toBe("me");
    expect(parseMemoryDevFlags("?memauto=1&mempov=paper", true)).toEqual({ auto: true, fast: false, pov: "paper" });
    expect(parseMemoryDevFlags("?mempov=watch", true).pov).toBe("watch");
    expect(parseMemoryDevFlags("?mempov=you", true).pov).toBeUndefined();
    expect(parseMemoryDevFlags("?mempov=me", false).pov).toBeUndefined();
  });

  it("生产构建里恒为关（参数被忽略）", () => {
    expect(parseMemoryDevFlags("?memauto=1&memfast=1", false)).toEqual({ auto: false, fast: false });
  });
});
