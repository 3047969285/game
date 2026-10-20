import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { clone } from "three/addons/utils/SkeletonUtils.js";

/** Rocketbox MIT assets are local: the game never calls an avatar service. */
const templates: Partial<Record<"male" | "female", THREE.Group>> = {};
let loading: Promise<void> | undefined;
export function loadHumanModels(): Promise<void> {
  return loading ??= Promise.all((["male", "female"] as const).map(async (kind) => {
    const gltf = await new GLTFLoader().loadAsync(`${import.meta.env.BASE_URL}models/humans/${kind}.glb`);
    gltf.scene.traverse((object) => {
      const mesh = object as THREE.Mesh;
      if (!mesh.isMesh) return;
      for (const material of Array.isArray(mesh.material) ? mesh.material : [mesh.material]) {
        for (const value of Object.values(material)) if (value instanceof THREE.Texture) value.userData.shared = true;
      }
    });
    templates[kind] = gltf.scene;
  })).then(() => undefined).catch((error) => {
    loading = undefined;
    console.warn("[characters] Local human model unavailable; keeping fallback", error);
  });
}
export function hasHumanModel(kind: "male" | "female" = "male"): boolean { return !!templates[kind]; }

export interface HumanControls {
  body: THREE.Object3D;
  bodyRestY: number;
  head: THREE.Object3D;
  leftArm: THREE.Object3D;
  rightArm: THREE.Object3D;
  leftElbow: THREE.Object3D;
  rightElbow: THREE.Object3D;
  leftHip: THREE.Object3D;
  rightHip: THREE.Object3D;
  leftKnee: THREE.Object3D;
  rightKnee: THREE.Object3D;
  leftAnkle: THREE.Object3D;
  rightAnkle: THREE.Object3D;
  blinkLeft: () => number;
  blinkRight: () => number;
  mouthOpen: () => number;
  smile: () => number;
  browLift?: () => number;
  props?: { object: THREE.Object3D; hand: string }[];
  grip?: () => number;
  gazeX: () => number;
  gazeY: () => number;
}

const rotationDelta = new THREE.Quaternion();
const inverseRest = new THREE.Quaternion();

/** Convert an anatomical rotation in character axes into a bone's rest axes. */
export function retargetRotation(restLocal: THREE.Quaternion, restWorld: THREE.Quaternion, rotation: THREE.Euler, out: THREE.Quaternion): THREE.Quaternion {
  rotationDelta.setFromEuler(rotation);
  inverseRest.copy(restWorld).invert();
  return out.copy(restLocal).multiply(inverseRest).multiply(rotationDelta).multiply(restWorld).normalize();
}

/** Per-instance skeleton/materials/geometries; source textures remain shared and immutable. */
export function attachHumanVisual(root: THREE.Group, controls: HumanControls, kind: "male" | "female" = "male"): (() => void) | undefined {
  const template = templates[kind];
  if (!template) return;
  const visual = clone(template) as THREE.Group;
  visual.name = "human-visual";
  const materials = new Map<THREE.Material, THREE.Material>();
  const owned = root.userData.ownedMaterials as Set<THREE.Material> | undefined;
  const faces: THREE.Mesh[] = [];
  visual.traverse((object) => {
    const mesh = object as THREE.Mesh;
    if (!mesh.isMesh) return;
    mesh.geometry = mesh.geometry.clone();
    const copyMaterial = (source: THREE.Material): THREE.Material => {
      let material = materials.get(source);
      if (!material) {
        material = source.clone();
        const standard = material as THREE.MeshStandardMaterial;
        standard.roughness = 0.8;
        standard.metalness = 0;
        materials.set(source, material);
        owned?.add(material);
      }
      return material;
    };
    mesh.material = Array.isArray(mesh.material) ? mesh.material.map(copyMaterial) : copyMaterial(mesh.material);
    mesh.castShadow = mesh.receiveShadow = true;
    // Bounds must follow the deformed body (seated / reaching / walking).
    mesh.frustumCulled = false;
    if (mesh.morphTargetDictionary) faces.push(mesh);
  });
  visual.updateMatrixWorld(true);
  const box = new THREE.Box3().setFromObject(visual);
  const height = box.max.y - box.min.y;
  const scale = 1.8 / height;
  visual.scale.multiplyScalar(scale);
  visual.position.y -= box.min.y * scale;
  const baseY = visual.position.y;
  visual.updateMatrixWorld(true);
  const names = ["Spine", "Head", "LeftArm", "RightArm", "LeftForeArm", "RightForeArm", "LeftUpLeg", "RightUpLeg", "LeftLeg", "RightLeg", "LeftFoot", "RightFoot"];
  const sources = [controls.body, controls.head, controls.leftArm, controls.rightArm, controls.leftElbow, controls.rightElbow, controls.leftHip, controls.rightHip, controls.leftKnee, controls.rightKnee, controls.leftAnkle, controls.rightAnkle];
  const bindings = names.map((name, index) => {
    const bone = visual.getObjectByName(name);
    return bone ? { bone, source: sources[index], restLocal: bone.quaternion.clone(), restWorld: bone.getWorldQuaternion(new THREE.Quaternion()) } : undefined;
  }).filter((binding) => binding !== undefined);
  // Retain controls and props; their geometry is superseded by the continuous skin.
  root.traverse((object) => {
    if ((object as THREE.Light).isLight) object.visible = false;
    if ((object as THREE.Mesh).isMesh && !object.userData.isFootRing) {
      let parent: THREE.Object3D | null = object;
      while (parent && parent !== root && !parent.userData.personDynamicAccessory) parent = parent.parent;
      if (!parent?.userData.personDynamicAccessory) object.visible = false;
    }
  });
  root.add(visual);
  // Place props in a wrist frame whose rest axes match the procedural control
  // frame, so FBX bone orientations do not rotate a book through the hand.
  for (const prop of controls.props ?? []) {
    const hand = visual.getObjectByName(prop.hand);
    if (!hand) continue;
    const anchor = new THREE.Group();
    const rootWorld = root.getWorldQuaternion(new THREE.Quaternion());
    anchor.quaternion.copy(hand.getWorldQuaternion(new THREE.Quaternion()).invert().multiply(rootWorld));
    anchor.scale.copy(root.getWorldScale(new THREE.Vector3())).divide(hand.getWorldScale(new THREE.Vector3()));
    hand.add(anchor);
    anchor.add(prop.object);
  }
  const fingers: { bone: THREE.Object3D; local: THREE.Quaternion; world: THREE.Quaternion; sign: number }[] = [];
  visual.traverse((bone) => {
    if (/^(Left|Right)Hand(Index|Middle|Ring|Pinky)[123]$/.test(bone.name)) fingers.push({ bone, local: bone.quaternion.clone(), world: root.getWorldQuaternion(new THREE.Quaternion()).invert().multiply(bone.getWorldQuaternion(new THREE.Quaternion())), sign: bone.name.startsWith("Left") ? -1 : 1 });
  });
  const rotation = new THREE.Euler();
  const setMorph = (name: string, value: number): void => {
    for (const face of faces) {
      const index = face.morphTargetDictionary?.[name];
      if (index !== undefined && face.morphTargetInfluences) face.morphTargetInfluences[index] = THREE.MathUtils.clamp(value, 0, 1);
    }
  };
  const update = (): void => {
    visual.position.y = baseY + controls.body.position.y - controls.bodyRestY;
    for (const binding of bindings) {
      rotation.copy(binding.source.rotation);
      retargetRotation(binding.restLocal, binding.restWorld, rotation, binding.bone.quaternion);
    }
    for (const finger of fingers) {
      rotation.set(0, 0, finger.sign * (controls.grip?.() ?? 0));
      retargetRotation(finger.local, finger.world, rotation, finger.bone.quaternion);
    }
    setMorph("eyeBlinkLeft", controls.blinkLeft());
    setMorph("eyeBlinkRight", controls.blinkRight());
    setMorph("jawOpen", controls.mouthOpen());
    setMorph("mouthSmileLeft", controls.smile());
    setMorph("mouthSmileRight", controls.smile());
    const x = controls.gazeX(), y = controls.gazeY();
    setMorph("eyeLookInLeft", Math.max(0, x));
    setMorph("eyeLookOutRight", Math.max(0, x));
    setMorph("eyeLookOutLeft", Math.max(0, -x));
    setMorph("eyeLookInRight", Math.max(0, -x));
    setMorph("eyeLookUpLeft", Math.max(0, y));
    setMorph("eyeLookUpRight", Math.max(0, y));
    setMorph("eyeLookDownLeft", Math.max(0, -y));
    setMorph("eyeLookDownRight", Math.max(0, -y));
    setMorph("browInnerUp", controls.browLift?.() ?? 0.08);
    setMorph("eyeSquintLeft", controls.smile() * 0.18);
    setMorph("eyeSquintRight", controls.smile() * 0.18);
  };
  root.userData.updateHumanVisual = update;
  root.userData.humanModel = kind;
  update();
  return update;
}
