import { HERO_MODELS } from "../world/characterModels";
import { face, type AccessoryId, type FaceShape, type HairStyleId, type HumanLook } from "../world/humanIdentity";

/**
 * 回忆里固定角色的身份表（docs/api-character-identity.md §4）：每个人一份不会变的脸型 / 发型 / 发色 / 配饰 / 衣着。
 * 同一单元的多段回忆、后续单元里出现的同一个人都用同一份身份；当年的“我”在所有场景里一眼能认出。
 */

export interface CharacterIdentity {
  id: "me2026" | "lin" | "mei" | "an" | "rui" | "organizer" | "old2090" | string;
  name: string;
  base: "male" | "female";
  model?: string;
  face: FaceShape;
  hair: { style: HairStyleId; color: string };
  /** −1..1：在现有肤色上变浅 / 变深 */
  skinTone: number;
  freckles?: number;
  moles?: Array<[number, number]>;
  brows?: { color?: string; thickness?: number };
  facialHair?: "none" | "stubble";
  accessories?: AccessoryId[];
  outfit: { top: string; topColor: string; bottom: string; bottomColor: string; shoes?: string };
  /** 0.96–1.04 */
  heightScale: number;
  aged?: boolean;
}

/** 当年的我 和 2090 年的我 共用同一张脸（老年的下垂、眉低、皱纹在应用时叠加，见 agedFace）。 */
const ME_FACE = face({ jawWidth: -0.25, jawLength: 0.15, cheekbone: 0.25, cheekFull: 0.0, noseLength: 0.15, noseWidth: -0.1, noseBridge: 0.35, eyeSpacing: 0.15, eyeSize: 0.25, browHeight: -0.25, browArch: 0.1, mouthWidth: 0.1, lipThickness: 0.1, foreheadHeight: 0.15, headAspect: 0.15 });

export const CHARACTERS: Readonly<Record<string, CharacterIdentity>> = {
  me2026: {
    id: "me2026", name: "Me (2026)", base: "male", model: HERO_MODELS.me2026, face: ME_FACE,
    hair: { style: "messyCrop", color: "#15110f" },
    skinTone: 0, freckles: 0.1, brows: { color: "#0f0c0b", thickness: 1 }, facialHair: "none",
    accessories: ["roundGlasses", "backpack"],
    outfit: { top: "hoodie", topColor: "#7c8088", bottom: "jeans", bottomColor: "#28344f", shoes: "white" },
    heightScale: 1.03,
  },
  old2090: {
    id: "old2090", name: "Me (2090)", base: "male", face: ME_FACE,
    hair: { style: "thinningSwept", color: "#cfd0d4" },
    skinTone: -0.2, freckles: 0, moles: [[262, 196]], brows: { color: "#b9bac0", thickness: 0.7 }, facialHair: "stubble",
    accessories: ["metalRoundGlasses"],
    outfit: { top: "cardigan", topColor: "#7b6a50", bottom: "trousers", bottomColor: "#3a3b44", shoes: "leather" },
    heightScale: 0.98, aged: true,
  },
  lin: {
    id: "lin", name: "Lin", base: "female", model: HERO_MODELS.lin,
    face: face({ jawWidth: 0.7, jawLength: -0.25, cheekbone: 0.1, cheekFull: 0.35, noseLength: -0.1, noseWidth: 0.1, eyeSize: 0.3, eyeSpacing: 0.0, browHeight: 0.1, mouthWidth: 0.15, lipThickness: 0.2, foreheadHeight: -0.2, headAspect: 0.55 }),
    hair: { style: "bob", color: "#6b3f2a" },
    skinTone: 0.4, freckles: 0.6, brows: { color: "#4a2c1e", thickness: 0.35 },
    outfit: { top: "knit", topColor: "#8fc9b0", bottom: "trousers", bottomColor: "#3a4254", shoes: "white" },
    heightScale: 0.98,
  },
  mei: {
    id: "mei", name: "Mei", base: "female",
    face: face({ jawWidth: -0.85, jawLength: 0.55, cheekbone: 0.3, cheekFull: -0.4, noseLength: -0.25, noseWidth: -0.3, noseBridge: 0.1, eyeSize: 0.45, eyeSpacing: 0.1, browArch: 0.45, mouthWidth: -0.35, lipThickness: 0.45, foreheadHeight: 0.1, headAspect: -0.55 }),
    hair: { style: "highPonytail", color: "#100d0c" },
    skinTone: 0.2, moles: [[236, 214]], brows: { color: "#100d0c", thickness: 0.15 },
    accessories: ["hairClip"],
    outfit: { top: "hoodie", topColor: "#e8a0b0", bottom: "trousers", bottomColor: "#40424a", shoes: "white" },
    heightScale: 0.96,
  },
  an: {
    id: "an", name: "An", base: "male",
    face: face({ jawWidth: 0.95, jawLength: 0.2, cheekbone: -0.1, cheekFull: 0.25, noseLength: 0.0, noseWidth: 0.55, noseBridge: -0.1, eyeSpacing: -0.25, eyeSize: -0.1, browHeight: -0.35, browArch: -0.2, mouthWidth: 0.35, lipThickness: 0.25, foreheadHeight: -0.3, headAspect: 0.35 }),
    hair: { style: "buzz", color: "#2a1d14" },
    skinTone: -0.5, brows: { color: "#2a1d14", thickness: 1 }, facialHair: "stubble",
    outfit: { top: "teeShirt", topColor: "#d8a02a", bottom: "jeans", bottomColor: "#33363f", shoes: "canvas" },
    heightScale: 1.0,
  },
  rui: {
    id: "rui", name: "Rui", base: "male",
    face: face({ jawWidth: -0.45, jawLength: 0.65, cheekbone: 0.0, cheekFull: -0.3, noseLength: 0.55, noseWidth: -0.2, noseBridge: 0.45, eyeSpacing: 0.35, eyeSize: -0.25, browHeight: 0.25, browArch: 0.0, mouthWidth: -0.15, lipThickness: -0.2, foreheadHeight: 0.55, headAspect: -0.65 }),
    hair: { style: "wavy", color: "#8a6a48" },
    skinTone: 0.3, freckles: 0.3, brows: { color: "#6f5238", thickness: 0.55 },
    accessories: ["squareGlasses"],
    outfit: { top: "checkShirt", topColor: "#5f7fa8", bottom: "chinos", bottomColor: "#3b3a36", shoes: "leather" },
    heightScale: 1.04,
  },
  organizer: {
    id: "organizer", name: "Ms. Chen", base: "female",
    face: face({ jawWidth: 0.1, jawLength: 0.05, cheekbone: -0.25, cheekFull: -0.35, noseLength: 0.3, noseWidth: 0.1, noseBridge: 0.2, eyeSpacing: -0.1, eyeSize: -0.35, browHeight: -0.4, browArch: -0.3, mouthWidth: 0.35, lipThickness: -0.35, foreheadHeight: 0.35, headAspect: 0.1 }),
    hair: { style: "lowPonytail", color: "#3a2a1e" },
    skinTone: -0.2, brows: { color: "#2d2018", thickness: 0.4 },
    outfit: { top: "cardigan", topColor: "#d9c9ae", bottom: "trousers", bottomColor: "#3b3a36", shoes: "leather" },
    heightScale: 1.0,
  },
};

const hex = (color: string): number => parseInt(color.replace("#", ""), 16);

const TOP_TO_OUTFIT: Record<string, "hoodie" | "tee" | "cardigan" | "knit" | "shirtJacket"> = {
  hoodie: "hoodie", knit: "knit", cardigan: "cardigan", teeShirt: "shirtJacket", checkShirt: "shirtJacket", tee: "tee",
};

export function humanLookOf(identity: CharacterIdentity): HumanLook {
  return {
    face: identity.face,
    hairStyle: identity.hair.style,
    hairColor: hex(identity.hair.color),
    skinTone: identity.skinTone,
    freckles: identity.freckles,
    moles: identity.moles,
    browColor: identity.brows?.color ? hex(identity.brows.color) : undefined,
    browThickness: identity.brows?.thickness,
    facialHair: identity.facialHair ?? "none",
    accessories: identity.accessories,
    aged: identity.aged,
    heightScale: identity.heightScale,
  };
}

/** 身份 → actor.look（createPerson 的参数）：衣着、发色、配饰、真人模型的 humanLook；回退骨架用旧的 hairStyle / glasses / backpack。 */
export function characterLook(id: string, extra: Record<string, unknown> = {}): Record<string, unknown> {
  const c = CHARACTERS[id];
  if (!c) throw new Error(`unknown character ${id}`);
  const accessories = c.accessories ?? [];
  const female = c.base === "female";
  return {
    model: c.model,
    seated: true,
    shirt: hex(c.outfit.topColor),
    trousers: hex(c.outfit.bottomColor),
    hair: hex(c.hair.color),
    // 回退骨架（真人模型未加载）用的旧参数；hairStyle 同时决定男 / 女底模
    hairStyle: female ? (c.hair.style === "sideBun" ? "bun" : "long") : "short",
    glasses: accessories.some((a) => /Glasses/.test(a)),
    ...(accessories.includes("backpack") ? { backpack: 0x17181c } : {}),
    aged: c.aged === true,
    outfit: c.outfit.top === "hoodie" ? "hoodie" : "tee",
    humanOutfit: TOP_TO_OUTFIT[c.outfit.top] ?? "tee",
    humanLook: humanLookOf(c),
    heightScale: c.heightScale,
    ...extra,
  };
}
