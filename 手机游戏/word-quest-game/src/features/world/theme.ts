/** 区域主题配色 */
export interface ThemeProfile {
  primary: number;
  secondary: number;
  accent: number;
  crystal: number;
  ground: number;
}

export const THEMES: Record<string, ThemeProfile> = {
  forest: { primary: 0x1f4d36, secondary: 0x34d399, accent: 0x6ee7b7, crystal: 0x4ade80, ground: 0x1a3328 },
  coast: { primary: 0x1e3a5f, secondary: 0x38bdf8, accent: 0x7dd3fc, crystal: 0x60a5fa, ground: 0x1a2e42 },
  library: { primary: 0x3b2f5f, secondary: 0xa78bfa, accent: 0xc4b5fd, crystal: 0x8b5cf6, ground: 0x2a2540 },
  market: { primary: 0x4a3720, secondary: 0xfbbf24, accent: 0xfcd34d, crystal: 0xf59e0b, ground: 0x3d3020 },
  temple: { primary: 0x4a2038, secondary: 0xf472b6, accent: 0xf9a8d4, crystal: 0xec4899, ground: 0x352030 },
  plains: { primary: 0x334155, secondary: 0x94a3b8, accent: 0xcbd5e1, crystal: 0x64748b, ground: 0x2a3440 },
};

/** 取主题，缺省为平原 */
export function getTheme(name: string): ThemeProfile {
  return THEMES[name] ?? THEMES.plains;
}
