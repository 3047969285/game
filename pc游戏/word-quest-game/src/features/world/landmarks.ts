import * as THREE from "three";
import type { MapNode } from "../../core/types";
import { glassCrystal, stone } from "./materials";
import { createLantern } from "./props";
import { getTheme, type ThemeProfile } from "./theme";

type LandmarkBuilder = (root: THREE.Group, theme: ThemeProfile, crystalMat: THREE.MeshPhysicalMaterial) => THREE.Mesh;

/** 森林神龛 */
function buildForest(root: THREE.Group, _t: ThemeProfile, crystalMat: THREE.MeshPhysicalMaterial): THREE.Mesh {
  const shrine = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.55, 1.6, 16), stone(0x5c4033, 0.75));
  shrine.position.y = 1.1;
  shrine.castShadow = true;
  const arch = new THREE.Mesh(new THREE.TorusGeometry(1.1, 0.14, 10, 24, Math.PI), stone(0x4a6741, 0.7));
  arch.rotation.z = Math.PI;
  arch.position.y = 2.2;
  const crystal = new THREE.Mesh(new THREE.IcosahedronGeometry(0.95, 1), crystalMat);
  crystal.position.y = 3.5;
  crystal.castShadow = true;
  root.add(shrine, arch, crystal);
  return crystal;
}

/** 海岸灯塔 */
function buildCoast(root: THREE.Group, theme: ThemeProfile, crystalMat: THREE.MeshPhysicalMaterial): THREE.Mesh {
  const pier = new THREE.Mesh(new THREE.BoxGeometry(2.2, 0.2, 1.4), stone(0x6b5a4a, 0.65));
  pier.position.set(0, 0.55, 0.4);
  const tower = new THREE.Mesh(new THREE.CylinderGeometry(0.45, 0.6, 2.8, 16), stone(0xcbd5e1, 0.45));
  tower.position.y = 1.8;
  tower.castShadow = true;
  const beacon = new THREE.Mesh(new THREE.OctahedronGeometry(0.75, 1), crystalMat);
  beacon.position.y = 3.6;
  const lamp = new THREE.PointLight(theme.crystal, 1.2, 10);
  lamp.position.y = 3.6;
  root.add(pier, tower, beacon, lamp);
  return beacon;
}

/** 图书馆亭阁 */
function buildLibrary(root: THREE.Group, theme: ThemeProfile, crystalMat: THREE.MeshPhysicalMaterial): THREE.Mesh {
  const base = new THREE.Mesh(new THREE.BoxGeometry(2.6, 0.5, 2.2), stone(0x9ca3af, 0.35));
  base.position.y = 0.55;
  const roof = new THREE.Mesh(
    new THREE.ConeGeometry(1.8, 1.2, 4),
    new THREE.MeshStandardMaterial({ color: theme.primary, roughness: 0.4, metalness: 0.2 })
  );
  roof.position.y = 1.4;
  roof.rotation.y = Math.PI / 4;
  const pillar = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.15, 2.2, 12), stone(0xd1d5db, 0.3));
  pillar.position.set(-0.9, 1.3, 0);
  const pillarR = pillar.clone();
  pillarR.position.x = 0.9;
  const crystal = new THREE.Mesh(new THREE.TorusKnotGeometry(0.55, 0.16, 64, 12), crystalMat);
  crystal.position.y = 3.2;
  root.add(base, roof, pillar, pillarR, crystal);
  return crystal;
}

/** 市集摊位 */
function buildMarket(root: THREE.Group, theme: ThemeProfile, crystalMat: THREE.MeshPhysicalMaterial): THREE.Mesh {
  const stall = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.15, 1.8), stone(0x8b6914, 0.7));
  stall.position.y = 0.55;
  const canopy = new THREE.Mesh(
    new THREE.CylinderGeometry(0, 1.6, 0.9, 4),
    new THREE.MeshStandardMaterial({ color: theme.secondary, roughness: 0.55, side: THREE.DoubleSide })
  );
  canopy.position.y = 1.8;
  canopy.rotation.y = Math.PI / 4;
  const crystal = new THREE.Mesh(new THREE.DodecahedronGeometry(0.8, 0), crystalMat);
  crystal.position.y = 3.1;
  const lantern = createLantern(theme.accent);
  lantern.position.set(1.1, 0, 0.6);
  root.add(stall, canopy, crystal, lantern);
  return crystal;
}

/** 神殿方尖碑 */
function buildTemple(root: THREE.Group, theme: ThemeProfile, crystalMat: THREE.MeshPhysicalMaterial): THREE.Mesh {
  const steps = new THREE.Mesh(new THREE.BoxGeometry(3, 0.25, 2.4), stone(0x9d8189, 0.55));
  steps.position.y = 0.5;
  const obelisk = new THREE.Mesh(new THREE.CylinderGeometry(0.25, 0.4, 3.2, 8), stone(0xc4a5b5, 0.4));
  obelisk.position.y = 2.1;
  obelisk.castShadow = true;
  const halo = new THREE.Mesh(
    new THREE.TorusGeometry(1.3, 0.06, 8, 40),
    new THREE.MeshStandardMaterial({ color: theme.accent, emissive: theme.accent, emissiveIntensity: 0.6, metalness: 0.8, roughness: 0.2 })
  );
  halo.rotation.x = Math.PI / 2;
  halo.position.y = 3.8;
  const crystal = new THREE.Mesh(new THREE.OctahedronGeometry(0.9, 2), crystalMat);
  crystal.position.y = 4.5;
  root.add(steps, obelisk, halo, crystal);
  return crystal;
}

const BUILDERS: Record<string, LandmarkBuilder> = {
  forest: buildForest,
  coast: buildCoast,
  library: buildLibrary,
  market: buildMarket,
  temple: buildTemple,
};

/** 创建站点地标（基座 + 主题建筑 + 可点击水晶） */
export function createLandmark(node: MapNode, isCurrent: boolean): THREE.Group {
  const theme = getTheme(node.theme);
  const root = new THREE.Group();
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

  const crystalMat = glassCrystal(
    unlocked ? theme.crystal : 0x6b7280,
    node.cleared ? 0.85 : unlocked ? 0.55 : 0.12
  );
  const crystal = (BUILDERS[node.theme] ?? buildForest)(root, theme, crystalMat);
  crystal.userData.isCrystal = true;

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

  return root;
}
