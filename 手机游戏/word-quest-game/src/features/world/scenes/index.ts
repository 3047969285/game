import type { SceneModule } from "./context";
import { UNIT01_SCENES } from "./unit01";
import { UNIT02_SCENES } from "./unit02";
import { UNIT03_SCENES } from "./unit03";
import { UNIT04_SCENES } from "./unit04";

/** 已重写为独立模块的段落场景（按 PassageSceneKind 分发）；未列出的仍走 unitLandscape.ts 的旧分支。 */
export const SCENE_MODULES: Record<string, SceneModule> = {
  ...UNIT01_SCENES,
  ...UNIT02_SCENES,
  ...UNIT03_SCENES,
  ...UNIT04_SCENES,
};
