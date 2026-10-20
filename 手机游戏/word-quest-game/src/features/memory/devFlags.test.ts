import { describe, expect, it } from "vitest";
import { parseMemoryDevFlags } from "./devFlags";

describe("开发期测试开关", () => {
  it("dev 构建里读 ?memauto=1 / ?memfast=1", () => {
    expect(parseMemoryDevFlags("?memauto=1", true)).toEqual({ auto: true, fast: false });
    expect(parseMemoryDevFlags("?x=2&memfast=1&memauto=1", true)).toEqual({ auto: true, fast: true });
    expect(parseMemoryDevFlags("", true)).toEqual({ auto: false, fast: false });
    expect(parseMemoryDevFlags("?memauto=0", true)).toEqual({ auto: false, fast: false });
  });

  it("生产构建里恒为关（参数被忽略）", () => {
    expect(parseMemoryDevFlags("?memauto=1&memfast=1", false)).toEqual({ auto: false, fast: false });
  });
});
