/**
 * 开发期测试开关（只在 dev 构建里读，生产构建里恒为关）：
 *  - ?memauto=1：回忆里每个需要玩家操作的节拍，约 1.2 秒后自动作答（按顺序触碰每个目标、选对断片 / 选项、填对笔记本、点开场的 “轻触”）
 *  - ?memfast=1：旁白不用 TTS，直接用计时降级，速度 ×4
 */
export interface MemoryDevFlags {
  auto: boolean;
  fast: boolean;
}

/** 纯函数：从 query string 解析（便于测试）。dev=false 时恒为关 */
export function parseMemoryDevFlags(search: string, dev: boolean): MemoryDevFlags {
  if (!dev) return { auto: false, fast: false };
  const q = new URLSearchParams(search);
  const on = (k: string): boolean => q.get(k) === "1" || q.get(k) === "true";
  return { auto: on("memauto"), fast: on("memfast") };
}

export function memoryDevFlags(): MemoryDevFlags {
  const dev = Boolean(import.meta.env?.DEV);
  const search = typeof location !== "undefined" ? location.search : "";
  return parseMemoryDevFlags(search, dev);
}

/** 自动作答的间隔（毫秒） */
export const AUTO_DELAY_MS = 1200;
