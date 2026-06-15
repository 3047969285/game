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

/** 解析节点应使用的模型配置：节点 ID 优先，否则主题 */
export function resolveNodeModelConfig(
  nodeId: string,
  theme: string,
  manifest: ModelsManifest
): ModelSlotConfig | null {
  return manifest.nodes?.[nodeId] ?? manifest.themes?.[theme] ?? null;
}
