import { distantLeafCards, terrainOccludes } from "./vegetationLod";
import * as THREE from "three";
import { applyFoliageShadow, createBush, createPine, createRock, createTree, vcMaterial } from "./props";
import { VARIANTS_PER_KIND, type VegetationInstance, type VegetationKind } from "./vegetationPlan";

export interface VegetationField {
  /** 加入场景的根节点（内含若干 BatchedMesh） */
  group: THREE.Group;
  /** 每帧调用；内部节流（约每 0.4 秒一次）按相机距离切换精细 / 简化几何 */
  update(camera: THREE.Camera): void;
  /** 释放全部 BatchedMesh 几何体；共享材质不释放 */
  dispose(): void;
}

/** 每个变体使用固定的生成器 scale（生成器以 scale 作随机种子），实例缩放走矩阵 */
const VARIANT_SCALE = [1.0, 1.13, 1.27];
const UPDATE_INTERVAL = 0.4;

type Lod = "high" | "low" | "far";

/** 一份可放进 BatchedMesh 的部件：材质 + 归一化几何 */
interface Part {
  material: THREE.Material;
  geometry: THREE.BufferGeometry;
}

function makeModel(kind: VegetationKind, variant: number, lod: "high" | "low"): THREE.Object3D {
  const s = VARIANT_SCALE[variant % VARIANTS_PER_KIND];
  if (kind === "broadleaf") return createTree(s, lod);
  if (kind === "pine") return createPine(s, lod);
  if (kind === "bush") return createBush(s, lod);
  return createRock(s);
}

/** 统一属性集：position / normal / color / uv（植被几何另带 aSway 风摆权重），且一律带索引 */
function normalize(src: THREE.BufferGeometry): THREE.BufferGeometry {
  const n = src.attributes.position.count;
  const g = new THREE.BufferGeometry();
  g.setAttribute("position", src.attributes.position.clone());
  g.setAttribute("normal", src.attributes.normal ? src.attributes.normal.clone() : new THREE.BufferAttribute(new Float32Array(n * 3), 3));
  if (src.attributes.color) {
    g.setAttribute("color", src.attributes.color.clone());
  } else {
    g.setAttribute("color", new THREE.BufferAttribute(new Float32Array(n * 3).fill(1), 3));
  }
  g.setAttribute("uv", src.attributes.uv ? src.attributes.uv.clone() : new THREE.BufferAttribute(new Float32Array(n * 2), 2));
  // 风摆权重：同一材质（同一 BatchedMesh）的几何要么都有要么都没有（树皮 / 叶片由 props 统一生成）
  if (src.attributes.aSway) g.setAttribute("aSway", src.attributes.aSway.clone());
  if (src.index) {
    g.setIndex(src.index.clone());
  } else {
    const idx = new Uint32Array(n);
    for (let i = 0; i < n; i++) idx[i] = i;
    g.setIndex(new THREE.BufferAttribute(idx, 1));
  }
  if (!src.attributes.normal) g.computeVertexNormals();
  return g;
}

/** 取出模型的各子网格（几何已在 Group 局部空间；若有非恒等变换则烘焙进去），按材质返回 */
function extractParts(root: THREE.Object3D): Part[] {
  root.updateMatrixWorld(true);
  const parts: Part[] = [];
  root.traverse((o) => {
    const mesh = o as THREE.Mesh;
    if (!mesh.isMesh) return;
    const geo = normalize(mesh.geometry);
    // 相对 root 的变换（root 自身不计）
    const rel = new THREE.Matrix4().copy(root.matrixWorld).invert().multiply(mesh.matrixWorld);
    if (!rel.equals(new THREE.Matrix4())) geo.applyMatrix4(rel);
    parts.push({ material: mesh.material as THREE.Material, geometry: geo });
    mesh.geometry.dispose(); // 原几何不再使用（材质是共享的，不释放）
  });
  return parts;
}

/** 单个 (类别, 变体) 的两档模型：材质 → 几何 */
interface VariantModel {
  high: Map<THREE.Material, THREE.BufferGeometry>;
  low: Map<THREE.Material, THREE.BufferGeometry>;
  far: Map<THREE.Material, THREE.BufferGeometry>;
}

interface Slot {
  batch: THREE.BatchedMesh;
  instanceId: number;
  highGeo: number; // -1 表示该档缺失
  lowGeo: number;
  farGeo: number;
}

interface Placed {
  x: number;
  z: number;
  slots: Slot[];
  lod: Lod | null;
  crownY: number;
  hidden: boolean;
}

export function buildVegetationField(
  instances: VegetationInstance[],
  opts: { lodDistance?: number; castShadow?: boolean; groundY?:(x:number,z:number)=>number } = {}
): VegetationField {
  const berryMat = vcMaterial(0.5, "berry");
  const lodDistance = opts.lodDistance ?? 70;
  const castShadow = opts.castShadow ?? true;
  const group = new THREE.Group();
  group.name = "vegetation";

  // 1. 生成用到的变体模型
  const models = new Map<string, VariantModel>();
  const modelOf = (kind: VegetationKind, variant: number): VariantModel => {
    const key = `${kind}:${variant}`;
    let m = models.get(key);
    if (!m) {
      m = { high: new Map(), low: new Map(), far:new Map() };
      for (const lod of ["high", "low"] as const) {
        // 岩石只有一档，高低共用（低档直接复用同一份几何）
        if (kind === "rock" && lod === "low") {
          m.low = m.high;
          continue;
        }
        const root = makeModel(kind, variant, lod);
        const parts = extractParts(root);
        const target = lod === "high" ? m.high : m.low;
        for (const p of parts) {
          // 低档不带浆果；同材质只取第一个子网格（生成器每种材质只产出一个）
          if ((lod === "low" && p.material === berryMat) || target.has(p.material)) p.geometry.dispose();
          else target.set(p.material, p.geometry);
        }
      }
      for(const [material, geometry] of m.low){
        m.far.set(material, material instanceof THREE.MeshStandardMaterial && material.alphaTest>0 ? distantLeafCards(geometry) : geometry);
      }
      models.set(key, m);
    }
    return m;
  };

  const used = new Map<string, VegetationInstance[]>();
  for (const inst of instances) {
    const key = `${inst.kind}:${inst.variant}`;
    const list = used.get(key);
    if (list) list.push(inst);
    else used.set(key, [inst]);
  }
  for (const key of used.keys()) {
    const [kind, variant] = key.split(":");
    modelOf(kind as VegetationKind, Number(variant));
  }

  // 2. 按材质建 BatchedMesh：容量由实际用到的唯一几何和实例数决定
  interface BatchPlan {
    material: THREE.Material;
    geos: Set<THREE.BufferGeometry>;
    instanceCount: number;
  }
  const plans = new Map<THREE.Material, BatchPlan>();
  const planOf = (mat: THREE.Material): BatchPlan => {
    let p = plans.get(mat);
    if (!p) {
      p = { material: mat, geos: new Set(), instanceCount: 0 };
      plans.set(mat, p);
    }
    return p;
  };
  for (const [key, list] of used) {
    const m = models.get(key)!;
    const mats = new Set<THREE.Material>([...m.high.keys(), ...m.low.keys(), ...m.far.keys()]);
    for (const mat of mats) {
      const p = planOf(mat);
      const h = m.high.get(mat);
      const l = m.low.get(mat);
      if (h) p.geos.add(h);
      if (l) p.geos.add(l);
      const f=m.far.get(mat);if(f)p.geos.add(f);
      p.instanceCount += list.length;
    }
  }

  const batches = new Map<THREE.Material, THREE.BatchedMesh>();
  const geoIds = new Map<THREE.BufferGeometry, number>();
  const allGeos: THREE.BufferGeometry[] = [];
  for (const [mat, p] of plans) {
    let verts = 0;
    let idx = 0;
    for (const g of p.geos) {
      verts += g.attributes.position.count;
      idx += g.index!.count;
      allGeos.push(g);
    }
    const batch = new THREE.BatchedMesh(Math.max(1, p.instanceCount), Math.max(1, verts), Math.max(1, idx), mat);
    batch.perObjectFrustumCulled = true;
    batch.frustumCulled = false; // 整体包围球会随 LOD 几何变化而过期，改由逐实例裁剪
    batch.castShadow = castShadow;
    batch.receiveShadow = true;
    batch.sortObjects = false;
    applyFoliageShadow(batch, mat); // 叶片 / 树皮的阴影深度材质带同样的风摆与 alpha 裁切
    for (const g of p.geos) geoIds.set(g, batch.addGeometry(g));
    batches.set(mat, batch);
    group.add(batch);
  }

  // 3. 放置实例
  const placed: Placed[] = [];
  const m4 = new THREE.Matrix4();
  const q = new THREE.Quaternion();
  const pos = new THREE.Vector3();
  const scl = new THREE.Vector3();
  const axisY = new THREE.Vector3(0, 1, 0);
  for (const inst of instances) {
    const m = models.get(`${inst.kind}:${inst.variant}`)!;
    pos.set(inst.x, inst.y, inst.z);
    q.setFromAxisAngle(axisY, inst.rotY);
    scl.setScalar(inst.scale);
    m4.compose(pos, q, scl);
    const slots: Slot[] = [];
    const mats = new Set<THREE.Material>([...m.high.keys(), ...m.low.keys(), ...m.far.keys()]);
    for (const mat of mats) {
      const batch = batches.get(mat)!;
      const h = m.high.get(mat);
      const l = m.low.get(mat);
      const highGeo = h ? geoIds.get(h)! : -1;
      const lowGeo = l ? geoIds.get(l)! : -1;
      const f=m.far.get(mat);const farGeo=f?geoIds.get(f)!:-1;
      const instanceId = batch.addInstance(highGeo >= 0 ? highGeo : lowGeo);
      batch.setMatrixAt(instanceId, m4);
      slots.push({ batch, instanceId, highGeo, lowGeo, farGeo });
    }
    placed.push({ x: inst.x, z: inst.z, slots, lod: null, crownY:inst.y+12*inst.scale, hidden:false });
  }

  // 4. LOD 切换（节流）
  const lodSq = lodDistance * lodDistance;
  let acc = UPDATE_INTERVAL; // 首次 update 立即执行
  let last = performance.now();
  const camPos = new THREE.Vector3();
  const apply = (p: Placed, lod: Lod, hidden:boolean): void => {
    p.hidden=hidden;
    p.lod = lod;
    for (const s of p.slots) {
      const gid = lod === "high" ? s.highGeo : lod === "low" ? s.lowGeo : s.farGeo;
      if (gid < 0 || hidden) {
        s.batch.setVisibleAt(s.instanceId, false);
      } else {
        s.batch.setGeometryIdAt(s.instanceId, gid);
        s.batch.setVisibleAt(s.instanceId, true);
      }
    }
  };

  const field: VegetationField = {
    group,
    update(camera) {
      const now = performance.now();
      acc += (now - last) / 1000;
      last = now;
      if (acc < UPDATE_INTERVAL) return;
      acc = 0;
      camera.getWorldPosition(camPos);
      for (const p of placed) {
        const dx = p.x - camPos.x;
        const dz = p.z - camPos.z;
        const distance=dx*dx+dz*dz;
        const near=lodSq*(p.lod==="high"?1.15:.9),far=160*160*(p.lod==="far"?.9:1.1);
        const lod: Lod = distance < near ? "high" : distance < far ? "low" : "far";
        const hidden=opts.groundY?terrainOccludes(camPos,{x:p.x,y:p.crownY,z:p.z},opts.groundY):false;
        if (lod !== p.lod || hidden!==p.hidden) apply(p,lod,hidden);
      }
    },
    dispose() {
      for (const b of batches.values()) {
        group.remove(b);
        b.dispose();
      }
      batches.clear();
      for (const g of allGeos) g.dispose();
      allGeos.length = 0;
      placed.length = 0;
      group.removeFromParent();
    },
  };
  return field;
}
