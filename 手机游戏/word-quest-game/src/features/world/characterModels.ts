import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { CORE_BONES, FINGERS, SIDES } from "./humanRig";

export const HERO_MODELS = { me2026: "heroes/me2026.glb", lin: "heroes/lin.glb" } as const;
export const HERO_MORPHS = ["eyeBlinkLeft", "eyeBlinkRight", "jawOpen", "mouthSmileLeft", "mouthSmileRight", "browInnerUp"] as const;
export interface CharacterModelReport {
  height: number; feetY: number; triangles: number; materials: number;
  missingMorphs: string[]; missingFingers: string[]; warnings: string[];
}
export type CharacterModelResult = { path: string; status: "ready"; report: CharacterModelReport } | { path: string; status: "missing" | "invalid" | "failed"; message: string };
const templates = new Map<string, { scene: THREE.Group; report: CharacterModelReport }>();
const pending = new Map<string, Promise<CharacterModelResult>>();

/** Project-local model path, relative to public/models/. No external fetches. */
export function validCharacterModelPath(path: string): boolean {
  return /^(?:[a-zA-Z0-9_-]+\/)*[a-zA-Z0-9_-]+\.glb$/.test(path);
}

export function inspectCharacterModel(scene: THREE.Group): CharacterModelReport {
  scene.updateMatrixWorld(true);
  const names = new Set<string>(), morphs = new Set<string>(), materials = new Set<THREE.Material>();
  let skinned = 0, triangles = 0;
  const box = new THREE.Box3();
  scene.traverse(object => {
    if ((object as THREE.Bone).isBone) names.add(object.name);
    const mesh = object as THREE.Mesh;
    if (!mesh.isMesh) return;
    if ((mesh as THREE.SkinnedMesh).isSkinnedMesh) skinned++;
    const position = mesh.geometry.getAttribute("position");
    if (!position) throw new Error(`Mesh ${mesh.name} has no positions`);
    for (let i=0;i<position.count;i++) if (!Number.isFinite(position.getX(i)+position.getY(i)+position.getZ(i))) throw new Error("Non-finite model geometry");
    triangles += (mesh.geometry.index?.count ?? position.count)/3;
    for (const material of Array.isArray(mesh.material) ? mesh.material : [mesh.material]) materials.add(material);
    for (const name of Object.keys(mesh.morphTargetDictionary ?? {})) morphs.add(name);
    box.expandByObject(mesh);
  });
  if (!skinned) throw new Error("Character must contain a skinned mesh");
  const missing = CORE_BONES.filter(name=>!names.has(name));
  if (missing.length) throw new Error(`Missing core bones: ${missing.join(", ")}`);
  const height = box.max.y-box.min.y;
  if (!Number.isFinite(height) || height<.5 || height>3) throw new Error("Character dimensions must use meters (height 0.5–3 m)");
  const missingFingers: string[] = [];
  for (const side of SIDES) for (const finger of FINGERS) for (const joint of [1,2,3]) {
    const name=`${side}Hand${finger}${joint}`;if(!names.has(name))missingFingers.push(name);
  }
  const missingMorphs = HERO_MORPHS.filter(name=>!morphs.has(name));
  const warnings: string[] = [];
  if (Math.abs(box.min.y)>.03) warnings.push(`Feet y=${box.min.y.toFixed(3)}, expected 0`);
  if (triangles>60000) warnings.push(`Triangle budget exceeded: ${Math.round(triangles)}`);
  if (materials.size>3) warnings.push(`Material budget exceeded: ${materials.size}`);
  if (missingMorphs.length) warnings.push(`Missing morphs: ${missingMorphs.join(", ")}`);
  if (missingFingers.length) warnings.push(`Missing ${missingFingers.length} finger joints`);
  return {height,feetY:box.min.y,triangles,materials:materials.size,missingMorphs:[...missingMorphs],missingFingers,warnings};
}

export function registerCharacterModel(path: string, scene: THREE.Group): CharacterModelReport {
  if(!validCharacterModelPath(path)) throw new Error("Invalid local character model path");
  const report=inspectCharacterModel(scene);
  const expected = path === HERO_MODELS.me2026 ? 1.84 : path === HERO_MODELS.lin ? 1.68 : undefined;
  if (expected && Math.abs(report.height-expected)>.025) report.warnings.push(`Height ${report.height.toFixed(3)} m; expected ${expected.toFixed(2)} m`);
  scene.traverse(object=>{
    const mesh=object as THREE.Mesh;if(!mesh.isMesh)return;
    for(const material of Array.isArray(mesh.material)?mesh.material:[mesh.material]) {
      for(const value of Object.values(material)) if(value instanceof THREE.Texture) value.userData.shared=true;
    }
  });
  templates.set(path,{scene,report});
  return report;
}
export function getCharacterModel(path: string | undefined): THREE.Group | undefined { return path ? templates.get(path)?.scene : undefined; }
export function getCharacterModelReport(path: string): CharacterModelReport | undefined { return templates.get(path)?.report; }

/** Coalesces concurrent requests; missing/failed assets can be retried on the next entry. */
export async function loadCharacterModel(path: string): Promise<CharacterModelResult> {
  if(!validCharacterModelPath(path))return{path,status:"invalid",message:"Invalid local character model path"};
  const ready=templates.get(path);if(ready)return{path,status:"ready",report:ready.report};
  const flight=pending.get(path);if(flight)return flight;
  const job=(async():Promise<CharacterModelResult>=>{
    try {
      const url=`${import.meta.env.BASE_URL}models/${path}`;
      const response=await fetch(url);
      if(response.status===404)return{path,status:"missing",message:"Not delivered yet; using fallback"};
      if(!response.ok)return{path,status:"failed",message:`HTTP ${response.status}`};
      const bytes=await response.arrayBuffer();
      // Some static hosts return their index.html for a missing .glb route.
      if(bytes.byteLength<12 || new DataView(bytes).getUint32(0,true)!==0x46546c67) return{path,status:"invalid",message:"Response is not a GLB file"};
      const gltf=await new GLTFLoader().parseAsync(bytes,url.slice(0,url.lastIndexOf("/")+1));
      return{path,status:"ready",report:registerCharacterModel(path,gltf.scene)};
    } catch(error) {return{path,status:"failed",message:error instanceof Error?error.message:String(error)};}
  })();
  pending.set(path,job);
  try{return await job;}finally{if(pending.get(path)===job)pending.delete(path);}
}
export async function loadCharacterModels(paths: readonly string[]): Promise<CharacterModelResult[]> {
  return Promise.all([...new Set(paths)].map(loadCharacterModel));
}
