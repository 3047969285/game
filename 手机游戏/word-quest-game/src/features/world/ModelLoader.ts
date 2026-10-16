import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

export interface ModelSlotConfig {
  file: string;
  scale?: number;
  targetHeight?: number;
  pickMeshNames?: string[];
  label?: string;
  optional?: boolean;
}

export interface ModelsManifest {
  version: number;
  defaults?: {
    scale?: number;
    targetHeight?: number;
    pickMeshNames?: string[];
  };
  nodes?: Record<string, ModelSlotConfig>;
  themes?: Record<string, ModelSlotConfig>;
  world?: Record<string, ModelSlotConfig>;
}

const gltfLoader = new GLTFLoader();
const cloneCache = new Map<string, THREE.Group>();

let manifestPromise: Promise<ModelsManifest | null> | null = null;

/** 加载模型清单 */
export async function loadModelsManifest(): Promise<ModelsManifest | null> {
  if (!manifestPromise) {
    manifestPromise = fetch(`${import.meta.env.BASE_URL}models/manifest.json`)
      .then((r) => (r.ok ? (r.json() as Promise<ModelsManifest>) : null))
      .catch(() => null);
  }
  return manifestPromise;
}

function assetUrl(path: string): string {
  const base = import.meta.env.BASE_URL;
  return path.startsWith("http") ? path : `${base}${path.replace(/^\//, "")}`;
}

/** 检测 GLB 是否存在 */
async function fileExists(url: string): Promise<boolean> {
  try {
    const res = await fetch(url, { method: "HEAD" });
    return res.ok;
  } catch {
    return false;
  }
}

/** 按目标高度归一化模型 */
export function normalizeModelRoot(
  root: THREE.Object3D,
  targetHeight: number,
  extraScale = 1
): void {
  const box = new THREE.Box3().setFromObject(root);
  if (box.isEmpty()) return;

  const size = box.getSize(new THREE.Vector3());
  const center = box.getCenter(new THREE.Vector3());
  const maxDim = Math.max(size.x, size.y, size.z, 0.001);
  const s = (targetHeight / maxDim) * extraScale;

  root.scale.setScalar(s);
  root.position.sub(center.multiplyScalar(s));
  root.position.y += (size.y * s) / 2;
}

/** 查找可点击水晶网格 */
export function findPickMesh(root: THREE.Object3D, names: string[]): THREE.Mesh | null {
  const set = new Set(names.map((n) => n.toLowerCase()));
  let found: THREE.Mesh | null = null;

  root.traverse((obj) => {
    if (found) return;
    const mesh = obj as THREE.Mesh;
    if (!mesh.isMesh) return;
    const n = mesh.name.toLowerCase();
    if (set.has(n) || set.has(obj.parent?.name.toLowerCase() ?? "")) {
      found = mesh;
    }
  });

  return found;
}

/** 为 CAD 模型启用阴影 */
export function enableModelShadows(root: THREE.Object3D): void {
  root.traverse((obj) => {
    const mesh = obj as THREE.Mesh;
    if (!mesh.isMesh) return;
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
    for (const m of mats) {
      if (m && "color" in m && m instanceof THREE.MeshStandardMaterial) {
        m.envMapIntensity = 1;
      }
    }
  });
}

/** 加载 GLB（带缓存） */
export async function loadGlbModel(
  file: string,
  config: ModelSlotConfig,
  manifest: ModelsManifest
): Promise<THREE.Group | null> {
  const url = assetUrl(file);
  if (!(await fileExists(url))) return null;

  try {
    if (!cloneCache.has(url)) {
      const gltf = await gltfLoader.loadAsync(url);
      const root = gltf.scene;
      const targetH = config.targetHeight ?? manifest.defaults?.targetHeight ?? 6;
      normalizeModelRoot(root, targetH, config.scale ?? manifest.defaults?.scale ?? 1);
      enableModelShadows(root);
      cloneCache.set(url, root as THREE.Group);
    }
    return cloneCache.get(url)!.clone(true) as THREE.Group;
  } catch {
    return null;
  }
}

export interface LoadedAvatar {
  group: THREE.Group;
  clips: THREE.AnimationClip[];
}

/** 加载带动画的角色 GLB（不进缓存，保留 animations） */
export async function loadAvatarGlb(
  file: string,
  config: ModelSlotConfig,
  manifest: ModelsManifest
): Promise<LoadedAvatar | null> {
  const url = assetUrl(file);
  if (!(await fileExists(url))) return null;
  try {
    const gltf = await gltfLoader.loadAsync(url);
    const root = gltf.scene as THREE.Group;
    const targetH = config.targetHeight ?? manifest.defaults?.targetHeight ?? 1.9;
    normalizeModelRoot(root, targetH, config.scale ?? manifest.defaults?.scale ?? 1);
    enableModelShadows(root);
    return { group: root, clips: gltf.animations ?? [] };
  } catch {
    return null;
  }
}

/**
 * 美化角色模型：按材质名给机器人 / 探险家类模型换上可读的配色，
 * 调平粗糙度与金属度，让角色不再是一团灰。
 */
export function enhanceAvatarMaterials(root: THREE.Object3D): void {
  root.traverse((obj) => {
    const mesh = obj as THREE.Mesh;
    if (!mesh.isMesh) return;
    const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
    for (const raw of mats) {
      if (!raw) continue;
      const mat = raw as THREE.MeshStandardMaterial;
      if (mat.name === "Grey") {
        // 机器人骨架 / 关节：深色合金
        mat.color.setHex(0x3d4756);
        mat.roughness = 0.42;
        mat.metalness = 0.62;
        mat.envMapIntensity = 1.1;
      } else if (mat.name === "Main") {
        // 主体装甲：探险家配色（靛蓝 + 暖橙）
        mat.color.setHex(0x2f5f9e);
        mat.roughness = 0.5;
        mat.metalness = 0.34;
        mat.envMapIntensity = 1.15;
      } else if (mat.name === "Black") {
        // 眼镜 / 靴子 / 描边：近黑高光
        mat.color.setHex(0x14181f);
        mat.roughness = 0.32;
        mat.metalness = 0.5;
        mat.envMapIntensity = 1;
      } else {
        mat.roughness = Math.max(0.3, Math.min(0.9, mat.roughness ?? 0.7));
        mat.metalness = Math.max(0.1, Math.min(0.7, mat.metalness ?? 0.1));
        mat.envMapIntensity = 1;
      }
      mat.needsUpdate = true;
    }
  });
}

/** 角色脚下的一圈柔和接地阴影，让角色"站"在地面上而不是浮着 */
export function createContactShadow(height = 1.9): THREE.Mesh {
  const size = height * 1.15;
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = 128;
  const ctx = canvas.getContext("2d")!;
  const g = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
  g.addColorStop(0, "rgba(0,0,0,0.55)");
  g.addColorStop(0.45, "rgba(0,0,0,0.28)");
  g.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 128, 128);
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;

  const mesh = new THREE.Mesh(
    new THREE.PlaneGeometry(size, size),
    new THREE.MeshBasicMaterial({
      map: tex,
      transparent: true,
      opacity: 0.85,
      depthWrite: false,
    })
  );
  mesh.rotation.x = -Math.PI / 2;
  mesh.position.y = 0.06;
  mesh.renderOrder = -1;
  mesh.name = "ContactShadow";
  return mesh;
}

/** 解析节点应使用的模型配置：节点 ID 优先，否则主题 */
export function resolveNodeModelConfig(
  nodeId: string,
  theme: string,
  manifest: ModelsManifest
): ModelSlotConfig | null {
  return manifest.nodes?.[nodeId] ?? manifest.themes?.[theme] ?? null;
}
