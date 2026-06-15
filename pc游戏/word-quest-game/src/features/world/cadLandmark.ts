import * as THREE from "three";
import type { MapNode } from "../../core/types";
import { createLandmark } from "./landmarks";
import { glassCrystal } from "./materials";
import {
  findPickMesh,
  loadGlbModel,
  loadModelsManifest,
  type ModelsManifest,
  type ModelSlotConfig,
} from "./ModelLoader";
import { getTheme } from "./theme";

export interface CadLandmarkResult {
  root: THREE.Group;
  crystal: THREE.Mesh;
}

let manifestCache: ModelsManifest | null = null;

async function getManifest(): Promise<ModelsManifest | null> {
  if (!manifestCache) manifestCache = await loadModelsManifest();
  return manifestCache;
}

function addPlatform(root: THREE.Group, node: MapNode): void {
  const theme = getTheme(node.theme);
  const unlocked = node.unlocked;
  const opacity = unlocked ? 1 : 0.45;

  const platform = new THREE.Mesh(
    new THREE.CylinderGeometry(2.4, 2.8, 0.35, 24),
    new THREE.MeshStandardMaterial({ color: theme.ground, roughness: 0.55, metalness: 0.12, transparent: !unlocked, opacity })
  );
  platform.position.y = 0.18;
  platform.receiveShadow = true;

  const ring = new THREE.Mesh(
    new THREE.TorusGeometry(2.1, 0.08, 12, 48),
    new THREE.MeshStandardMaterial({
      color: theme.secondary,
      emissive: theme.accent,
      emissiveIntensity: unlocked ? 0.35 : 0.08,
      roughness: 0.3,
      metalness: 0.55,
      transparent: !unlocked,
      opacity,
    })
  );
  ring.rotation.x = Math.PI / 2;
  ring.position.y = 0.38;
  root.add(platform, ring);
}

function addLandmarkFx(
  root: THREE.Group,
  node: MapNode,
  isCurrent: boolean,
  unlocked: boolean,
  theme: ReturnType<typeof getTheme>
): void {
  if (isCurrent) {
    const pulse = new THREE.Mesh(
      new THREE.RingGeometry(2.3, 2.55, 48),
      new THREE.MeshBasicMaterial({ color: 0xfbbf24, transparent: true, opacity: 0.55, side: THREE.DoubleSide })
    );
    pulse.rotation.x = -Math.PI / 2;
    pulse.position.y = 0.42;
    pulse.userData.isPulse = true;
    root.add(pulse);

    const spot = new THREE.SpotLight(0xfff4d6, unlocked ? 2.2 : 0.4, 18, Math.PI / 5, 0.4);
    spot.position.set(0, 8, 2);
    spot.target.position.set(0, 2, 0);
    root.add(spot, spot.target);
  }

  if (node.cleared) {
    const aura = new THREE.Mesh(
      new THREE.SphereGeometry(3.2, 24, 24),
      new THREE.MeshBasicMaterial({ color: theme.accent, transparent: true, opacity: 0.07, depthWrite: false })
    );
    aura.position.y = 2;
    root.add(aura);
  }

  if (node.dueCount && node.dueCount > 0 && unlocked) {
    const dueRing = new THREE.Mesh(
      new THREE.RingGeometry(2.65, 2.9, 48),
      new THREE.MeshBasicMaterial({ color: 0xfbbf24, transparent: true, opacity: 0.42, side: THREE.DoubleSide })
    );
    dueRing.rotation.x = -Math.PI / 2;
    dueRing.position.y = 0.5;
    dueRing.userData.isDueRing = true;
    root.add(dueRing);
  }
}

function fallbackCrystal(node: MapNode, parent: THREE.Group): THREE.Mesh {
  const theme = getTheme(node.theme);
  const crystal = new THREE.Mesh(
    new THREE.IcosahedronGeometry(0.85, 1),
    glassCrystal(node.unlocked ? theme.crystal : 0x6b7280, 0.65)
  );
  crystal.position.y = 3.6;
  crystal.castShadow = true;
  crystal.userData.isCrystal = true;
  parent.add(crystal);
  return crystal;
}

function extractCrystal(root: THREE.Group): THREE.Mesh | null {
  let crystal: THREE.Mesh | null = null;
  root.traverse((obj) => {
    if (crystal) return;
    const mesh = obj as THREE.Mesh;
    if (mesh.userData?.isCrystal) crystal = mesh;
  });
  return crystal;
}

/** 用 CAD 导出的 GLB 创建地标；无文件时回退程序生成 */
export async function createLandmarkWithCad(
  node: MapNode,
  isCurrent: boolean
): Promise<CadLandmarkResult> {
  const manifest = await getManifest();
  const theme = getTheme(node.theme);
  const slot: ModelSlotConfig | null =
    manifest ? (manifest.nodes?.[node.id] ?? manifest.themes?.[node.theme] ?? null) : null;

  if (manifest && slot) {
    const model = await loadGlbModel(slot.file, slot, manifest);
    if (model) {
      const root = new THREE.Group();
      addPlatform(root, node);
      model.position.y = 0.35;
      root.add(model);

      const pickNames = slot.pickMeshNames ?? manifest.defaults?.pickMeshNames ?? ["Crystal", "PICK"];
      let crystal = findPickMesh(model, pickNames);
      if (!crystal) crystal = fallbackCrystal(node, root);
      else crystal.userData.isCrystal = true;

      addLandmarkFx(root, node, isCurrent, node.unlocked, theme);
      return { root, crystal };
    }
  }

  const root = createLandmark(node, isCurrent);
  const crystal = extractCrystal(root) ?? fallbackCrystal(node, root);
  return { root, crystal };
}
