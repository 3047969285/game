import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { clone } from "three/addons/utils/SkeletonUtils.js";
import { createAccessories, type AccessorySet } from "./humanAccessories";
import { cullOpacityHair, createHair, hairMaterial, headLandmarks, shrinkBaseHair, type HairObject } from "./humanHair";
import { agedFace, applyFaceShape } from "./humanIdentity";
import { addSkinDetails, extractGlbImages, pickAppearance, recolorBody, recolorHead, rememberSkin, sampleSkin, skinMultiplier, type AppearanceBase, type HumanAppearance } from "./humanAppearance";

/** Rocketbox MIT assets are local: the game never calls an avatar service. */
const templates: Partial<Record<"male" | "female", THREE.Group>> = {};
/** 原始方向的身体 / 头部贴图像素（每个实例据此重新染色；GLTFLoader 的 ImageBitmap 可能已被翻转，所以自己从 GLB 取图） */
const basePixels: Partial<Record<"male" | "female", { body?: ImageData; head?: ImageData; skin?: [number, number, number] }>> = {};
let loading: Promise<void> | undefined;

async function decodePixels(bytes: Uint8Array, mime: string): Promise<ImageData | undefined> {
  if (typeof createImageBitmap !== "function" || typeof document === "undefined") return undefined;
  const bitmap = await createImageBitmap(new Blob([bytes as BlobPart], { type: mime }), { premultiplyAlpha: "none", colorSpaceConversion: "none" });
  const canvas = document.createElement("canvas");
  canvas.width = bitmap.width;
  canvas.height = bitmap.height;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) return undefined;
  ctx.drawImage(bitmap, 0, 0);
  bitmap.close?.();
  return ctx.getImageData(0, 0, canvas.width, canvas.height);
}

/** 登记一个已解析的底模（loadHumanModels 内部使用；测试可直接登记从 GLB 解析出的场景）。 */
export function registerHumanModel(kind: "male" | "female", scene: THREE.Group, pixels?: { body?: ImageData; head?: ImageData; skin?: [number, number, number] }): void {
  templates[kind] = scene;
  if (pixels) basePixels[kind] = pixels;
}

export function loadHumanModels(): Promise<void> {
  return loading ??= Promise.all((["male", "female"] as const).map(async (kind) => {
    const url = `${import.meta.env.BASE_URL}models/humans/${kind}.glb`;
    const buffer = await (await fetch(url)).arrayBuffer();
    const gltf = await new GLTFLoader().parseAsync(buffer, url.slice(0, url.lastIndexOf("/") + 1));
    gltf.scene.traverse((object) => {
      const mesh = object as THREE.Mesh;
      if (!mesh.isMesh) return;
      for (const material of Array.isArray(mesh.material) ? mesh.material : [mesh.material]) {
        for (const value of Object.values(material)) if (value instanceof THREE.Texture) value.userData.shared = true;
      }
    });
    registerHumanModel(kind, gltf.scene);
    try {
      const images = extractGlbImages(buffer);
      const find = (suffix: string): { bytes: Uint8Array; mime: string } | undefined => images.find((image) => image.name.endsWith(suffix));
      const body = find("body_color"), head = find("head_color");
      const headPixels = head ? await decodePixels(head.bytes, head.mime) : undefined;
      registerHumanModel(kind, gltf.scene, {
        body: body ? await decodePixels(body.bytes, body.mime) : undefined,
        head: headPixels,
        skin: headPixels ? sampleSkin(headPixels.data, headPixels.width, kind) ?? undefined : undefined,
      });
    } catch (error) {
      console.warn("[characters] Appearance textures unavailable; using the base outfit", error);
    }
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
export interface HumanVisualInfo {
  visual: THREE.Group;
  faces: THREE.Mesh[];
  kind: "male" | "female";
  appearance: HumanAppearance;
  /** 每实例创建的贴图（dispose 时释放；源贴图共享，不在其中） */
  ownedTextures: THREE.Texture[];
  /** 贴图重染使用的原始像素是否可用 */
  recolored: boolean;
  /** 脚底落在 frame 的 y = 0 时 visual 的 position.y（旧控制器的 update() 会改它；动画器接管时要还原） */
  baseY: number;
  /** 程序头发（绑 Head；有尾端的发型带弹簧）与配饰（眼镜 / 耳机 / 发卡 / 背包） */
  hair?: HairObject;
  accessories?: AccessorySet;
  /** 把所有骨骼还原到 GLB 的休息姿势（旧控制器的初始 update() 已经摆过一次姿势；动画器接管前调用） */
  restoreRest(): void;
}

/** 构造每个实例的染色贴图（node / 无 DOM 时返回 undefined）。 */
function makeTexture(source: THREE.Texture | null, pixels: ImageData, mutate: (data: Uint8ClampedArray) => void): THREE.CanvasTexture | undefined {
  if (typeof document === "undefined") return undefined;
  const canvas = document.createElement("canvas");
  canvas.width = pixels.width;
  canvas.height = pixels.height;
  const ctx = canvas.getContext("2d");
  if (!ctx) return undefined;
  const copy = new ImageData(new Uint8ClampedArray(pixels.data), pixels.width, pixels.height);
  mutate(copy.data);
  ctx.putImageData(copy, 0, 0);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.flipY = false; // glTF 贴图约定
  if (source) {
    texture.wrapS = source.wrapS;
    texture.wrapT = source.wrapT;
    texture.anisotropy = source.anisotropy;
    texture.channel = source.channel;
  }
  return texture;
}

export function attachHumanVisual(root: THREE.Group, controls: HumanControls, kind: "male" | "female" = "male", base: AppearanceBase = {}): (() => void) | undefined {
  const template = templates[kind];
  if (!template) return;
  const appearance = pickAppearance(kind, base, base.seed);
  const ownedTextures: THREE.Texture[] = [];
  const pixels = basePixels[kind];
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
        if (source.name.endsWith("_body") && pixels?.body) {
          const texture = makeTexture(standard.map, pixels.body, (data) => recolorBody(data, pixels.body!.width, pixels.body!.height, appearance, headSkinMul(pixels, appearance)));
          if (texture) { standard.map = texture; ownedTextures.push(texture); }
        } else if (source.name.endsWith("_head") && pixels?.head) {
          const mul = headSkinMul(pixels, appearance);
          const texture = makeTexture(standard.map, pixels.head, (data) => { rememberSkin(data, pixels.head!.width, kind); recolorHead(data, pixels.head!.width, pixels.head!.height, appearance, mul); addSkinDetails(data, pixels.head!.width, appearance); });
          if (texture) { standard.map = texture; ownedTextures.push(texture); }
        } else if (source.name.endsWith("_opacity")) {
          // 睫毛 / 眉毛 / 发丝：白色贴图乘发色
          standard.color = new THREE.Color(appearance.hair);
        }
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
  // ── 身份：脸型（脸部骨骼）、底模头发收缩、opacity 层只留睫毛 / 眉 ──
  const look = base.look;
  const skinned: THREE.SkinnedMesh[] = [];
  visual.traverse((object) => { if ((object as THREE.SkinnedMesh).isSkinnedMesh) skinned.push(object as THREE.SkinnedMesh); });
  const headMesh = skinned.find((mesh) => (mesh.material as THREE.Material).name.endsWith("_head"));
  const opacityMesh = skinned.find((mesh) => (mesh.material as THREE.Material).name.endsWith("_opacity"));
  const bodyMesh = skinned.find((mesh) => (mesh.material as THREE.Material).name.endsWith("_body"));
  const landmarks = headMesh ? headLandmarks(headMesh.geometry, headMesh.skeleton.bones.map((bone) => bone.name)) : null;
  if (look) applyFaceShape(visual, look.aged ? agedFace(look.face) : look.face);
  if (look && headMesh && landmarks) {
    shrinkBaseHair(headMesh.geometry, headMesh.skeleton.bones.map((bone) => bone.name), landmarks);
    if (opacityMesh) {
      if (cullOpacityHair(opacityMesh.geometry, landmarks) === 0) opacityMesh.visible = false;
    }
  }
  visual.updateMatrixWorld(true);
  const box = new THREE.Box3().setFromObject(visual);
  const height = box.max.y - box.min.y;
  const scale = 1.8 / height;
  visual.scale.set(scale * appearance.widthScale, scale * appearance.heightScale, scale * appearance.widthScale);
  visual.position.y -= box.min.y * scale * appearance.heightScale;
  const baseY = visual.position.y;
  visual.updateMatrixWorld(true);
  const restPose: Array<{ node: THREE.Object3D; q: THREE.Quaternion; p: THREE.Vector3 }> = [];
  visual.traverse((node) => { if (node !== visual) restPose.push({ node, q: node.quaternion.clone(), p: node.position.clone() }); });
  const restoreRest = (): void => {
    for (const entry of restPose) { entry.node.quaternion.copy(entry.q); entry.node.position.copy(entry.p); }
    visual.position.y = baseY;
    visual.updateMatrixWorld(true);
  };
  // 程序头发与配饰（在高度归一化与休息姿势快照之后加入，所以不影响身高）
  let hair: HairObject | undefined;
  let accessories: AccessorySet | undefined;
  if (look && headMesh && bodyMesh && landmarks) {
    const material = hairMaterial(look.hairColor);
    owned?.add(material);
    hair = createHair(look.hairStyle, landmarks, headMesh, material, base.seed ?? 1) ?? undefined;
    if (hair) { visual.add(hair.mesh); }
    accessories = createAccessories({ ids: look.accessories ?? [], lm: landmarks, headMesh, bodyMesh, color: look.accessoryColor });
    for (const mesh of accessories.meshes) visual.add(mesh);
    for (const m of accessories.materials) owned?.add(m);
    visual.updateMatrixWorld(true);
  }
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
  root.userData.humanVisual = { visual, faces, kind, appearance, ownedTextures, recolored: ownedTextures.length > 0, baseY, restoreRest, hair, accessories } satisfies HumanVisualInfo;
  update();
  return update;
}

function headSkinMul(pixels: { skin?: [number, number, number] }, app: HumanAppearance): [number, number, number] {
  return skinMultiplier(app.skin, pixels.skin ?? null);
}
