import * as THREE from "three";
import { LAYER_COUNT, generateLayerTexture, type LayerId, type LayerPalette } from "./terrainLayers";

export interface TerrainTextureSet {
  key: string;
  albedo: THREE.DataArrayTexture;
  normal: THREE.DataArrayTexture;
  dispose(): void;
}

function pack(layers: Uint8Array[], size: number, srgb: boolean, aniso: number): THREE.DataArrayTexture {
  const per = size * size * 4;
  const data = new Uint8Array(per * layers.length);
  layers.forEach((l, i) => data.set(l, i * per));
  const tex = new THREE.DataArrayTexture(data, size, size, layers.length);
  tex.format = THREE.RGBAFormat;
  tex.type = THREE.UnsignedByteType;
  tex.colorSpace = srgb ? THREE.SRGBColorSpace : THREE.NoColorSpace;
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.magFilter = THREE.LinearFilter;
  tex.minFilter = THREE.LinearMipmapLinearFilter;
  tex.generateMipmaps = true;
  tex.anisotropy = aniso;
  tex.needsUpdate = true;
  return tex;
}

/** 生成 5 层 albedo / normal 数组纹理（调用方负责 dispose） */
export function buildTerrainTextureSet(palette: LayerPalette, size: number, seed: number, aniso = 4): TerrainTextureSet {
  const a: Uint8Array[] = [];
  const n: Uint8Array[] = [];
  for (let l = 0; l < LAYER_COUNT; l++) {
    const t = generateLayerTexture(l as LayerId, size, seed, palette);
    a.push(t.albedo);
    n.push(t.normal);
  }
  const albedo = pack(a, size, true, aniso);
  const normal = pack(n, size, false, aniso);
  return {
    key: `${palette.grass}-${palette.dirt}-${palette.rock}-${size}`,
    albedo,
    normal,
    dispose() {
      albedo.dispose();
      normal.dispose();
    },
  };
}
