import * as THREE from "three";
import { glassCrystal } from "./materials";

/** 探险者角色（第三人称） */
export function createExplorerAvatar(): THREE.Group {
  const root = new THREE.Group();
  root.name = "Explorer";

  const bodyMat = new THREE.MeshStandardMaterial({ color: 0x3d4f6f, roughness: 0.55, metalness: 0.15 });
  const trimMat = new THREE.MeshStandardMaterial({ color: 0x5b8def, roughness: 0.4, metalness: 0.25 });
  const skinMat = new THREE.MeshStandardMaterial({ color: 0xf0c8a8, roughness: 0.65, metalness: 0.05 });

  const torso = new THREE.Mesh(new THREE.CapsuleGeometry(0.42, 0.75, 6, 12), bodyMat);
  torso.position.y = 1.15;
  torso.castShadow = true;

  const head = new THREE.Mesh(new THREE.SphereGeometry(0.28, 20, 20), skinMat);
  head.position.y = 1.85;
  head.castShadow = true;

  const hood = new THREE.Mesh(new THREE.SphereGeometry(0.32, 16, 12, 0, Math.PI * 2, 0, Math.PI * 0.55), trimMat);
  hood.position.y = 1.92;
  hood.castShadow = true;

  const pack = new THREE.Mesh(new THREE.BoxGeometry(0.38, 0.5, 0.22), bodyMat);
  pack.position.set(0, 1.2, -0.28);
  pack.castShadow = true;

  const lantern = new THREE.Mesh(new THREE.SphereGeometry(0.12, 12, 12), glassCrystal(0xfbbf24, 0.9));
  lantern.position.set(0.35, 1.45, 0.2);
  const lanternLight = new THREE.PointLight(0xfbbf24, 1.1, 9);
  lanternLight.position.copy(lantern.position);

  const ring = new THREE.Mesh(
    new THREE.RingGeometry(0.55, 0.72, 32),
    new THREE.MeshBasicMaterial({ color: 0x93c5fd, transparent: true, opacity: 0.35, side: THREE.DoubleSide })
  );
  ring.rotation.x = -Math.PI / 2;
  ring.position.y = 0.04;
  ring.userData.isFootRing = true;

  root.add(torso, head, hood, pack, lantern, lanternLight, ring);
  return root;
}
