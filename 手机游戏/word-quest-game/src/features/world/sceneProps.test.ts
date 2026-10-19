import * as THREE from "three";
import { describe, expect, it, vi } from "vitest";

// 几何预算测试无需浏览器；只替代叶片 Canvas 贴图，保留真实的卡片几何生成。
vi.mock('./props', async (importOriginal) => {
  const original = await importOriginal<typeof import('./props')>();
  const three = await import('three');
  const material = new three.MeshStandardMaterial({
    map: new three.DataTexture(new Uint8Array([255, 255, 255, 255]), 1, 1), vertexColors: true,
  });
  return { ...original, getFoliageMaterial: () => material };
});

import { bench, bookStack, createSceneKit, Frame, getHouseFacadeLayout, house, laptop, openBook, planter, type PropDetail } from './sceneProps';
import { createStage, type SceneContext } from './scenes/context';

const builders = { book: openBook, books: bookStack, laptop, bench, planter };
const budgets = { book: 1600, books: 3000, laptop: 2600, bench: 6500, planter: 7000 };

function build(name: keyof typeof builders, detail: PropDetail) {
  const k = createSceneKit(detail);
  builders[name](k, new Frame(k.kit));
  const root = new THREE.Group();
  const meshes = k.kit.build(root);
  const triangles = meshes.reduce((sum, mesh) => sum + (mesh.geometry.index?.count ?? mesh.geometry.attributes.position.count) / 3, 0);
  return { root, meshes, triangles };
}

function clear(result: ReturnType<typeof build>) {
  result.meshes.forEach(mesh => mesh.geometry.dispose());
  // 实际场景也拥有这批独立材质；叶片共享材质由测试模块持有。
  for (const material of new Set(result.meshes.map(mesh => mesh.material as THREE.Material))) {
    if (!(material as THREE.MeshStandardMaterial).map) material.dispose();
  }
}

function buildHouse(detail: PropDetail, yaw = 0) {
  const k = createSceneKit(detail);
  const wall = new THREE.MeshStandardMaterial({ color: 0xe8ddcb, roughness: 0.95 });
  house(k, new Frame(k.kit, 0, 0, 0, yaw), 1.7, 2.0, 1.5, k.m.terracottaRoof, wall);
  const root = new THREE.Group();
  const meshes = k.kit.build(root, 'house-test');
  const triangles = meshes.reduce((sum, mesh) => sum + (mesh.geometry.index?.count ?? mesh.geometry.attributes.position.count) / 3, 0);
  return { k, wall, root, meshes, triangles };
}

function clearHouse(result: ReturnType<typeof buildHouse>) {
  result.meshes.forEach(mesh => mesh.geometry.dispose());
  for (const material of new Set(result.meshes.map(mesh => mesh.material as THREE.Material))) material.dispose();
}

function rayHits(result: ReturnType<typeof buildHouse>, x: number, y: number, z: number, direction = new THREE.Vector3(0, 0, -1)) {
  result.root.updateMatrixWorld(true);
  const ray = new THREE.Raycaster(new THREE.Vector3(x, y, z), direction);
  return ray.intersectObjects(result.meshes) as THREE.Intersection<THREE.Mesh>[];
}

describe('共用道具的画质与性能约束', () => {
  it.each(Object.keys(builders) as Array<keyof typeof builders>)('%s 的小件合并且保持面数预算', (name) => {
    const high = build(name, 'high');
    const low = build(name, 'low');
    expect(high.triangles).toBeLessThanOrEqual(budgets[name]);
    expect(low.triangles).toBeLessThan(high.triangles);
    expect(high.meshes.length).toBeLessThanOrEqual(12);
    expect(low.meshes.length).toBeLessThanOrEqual(high.meshes.length);
    for (const mesh of high.meshes) {
      expect(Array.from(mesh.geometry.attributes.position.array).every(Number.isFinite)).toBe(true);
      expect(mesh.castShadow).toBe(true);
    }
    clear(high); clear(low);
  });

  it.each(['books', 'planter'] as const)('%s 同一默认种子生成相同几何', (name) => {
    const a = build(name, 'high'), b = build(name, 'high');
    expect(a.meshes.length).toBe(b.meshes.length);
    a.meshes.forEach((mesh, index) => {
      expect(mesh.geometry.attributes.position.array).toEqual(b.meshes[index].geometry.attributes.position.array);
      expect(mesh.geometry.index?.array).toEqual(b.meshes[index].geometry.index?.array);
    });
    clear(a); clear(b);
  });

  it('低画质由场景上下文传到道具构建器', () => {
    const ctx = { detail: 'low' } as SceneContext;
    expect(createStage(ctx).k.detail).toBe('low');
    expect(createSceneKit().detail).toBe('high');
  });

  it('花坛的中心露出下凹土壤，不是与石圈重叠的石盖', () => {
    const result = build('planter', 'high');
    const stoneMeshes = result.meshes.filter(mesh => {
      const material = mesh.material as THREE.MeshStandardMaterial;
      return material.color.getHex() === 0xb9b3a6 || material.color.getHex() === 0x8a867d;
    });
    const ray = new THREE.Raycaster(new THREE.Vector3(0, 0.5, 0), new THREE.Vector3(0, -1, 0));
    expect(ray.intersectObjects(stoneMeshes)).toHaveLength(0);
    const soil = result.meshes.find(mesh => (mesh.material as THREE.MeshStandardMaterial).color.getHex() === 0x4a3b2c)!;
    const hits = ray.intersectObject(soil);
    expect(hits.length).toBeGreaterThan(0);
    expect(hits[0].point.y).toBeCloseTo(0.355);
    clear(result);
  });

  it('细小零件跟随 Frame 的平移、转向与缩放，不遗留在原点', () => {
    const local = build('bench', 'high');
    const k = createSceneKit();
    bench(k, new Frame(k.kit, 14, 2, -8, Math.PI / 2, 2));
    const root = new THREE.Group();
    const meshes = k.kit.build(root);
    const expected = new THREE.Box3().setFromObject(local.root).applyMatrix4(
      new THREE.Matrix4().makeTranslation(14, 2, -8)
        .multiply(new THREE.Matrix4().makeRotationY(Math.PI / 2))
        .multiply(new THREE.Matrix4().makeScale(2, 2, 2)),
    );
    const actual = new THREE.Box3().setFromObject(root);
    expect(actual.min.distanceTo(expected.min)).toBeLessThan(1e-5);
    expect(actual.max.distanceTo(expected.max)).toBeLessThan(1e-5);
    clear(local);
    clear({ root, meshes, triangles: 0 });
  });

  it('窄房正面的窗洞、窗台和过梁都与门框留出间隙', () => {
    const [door, ...windows] = getHouseFacadeLayout(1.7, 2.0);
    expect(door).toMatchObject({ kind: 'door', x: 0, y: 0.3, width: 0.82, height: 1.65 });
    for (const window of windows) {
      const outerFrameHalf = 0.045 + window.width / 2;
      const outerEdge = Math.abs(window.x) + outerFrameHalf;
      const sillInnerEdge = Math.abs(window.x) - window.width / 2 - (window.sillOverhang ?? 0.11);
      const lintelInnerEdge = Math.abs(window.x) - window.width / 2 - (window.lintelOverhang ?? 0.1);
      expect(sillInnerEdge - door.width / 2).toBeGreaterThanOrEqual(0.04);
      expect(lintelInnerEdge - door.width / 2).toBeGreaterThanOrEqual(0.04);
      expect(outerEdge).toBeLessThanOrEqual(1.7 / 2 - 0.049);
    }
  });

  it('窄房正面是真洞口，窗玻璃和后退暖光板可见，门口墙段不遮住门窗', () => {
    const result = buildHouse('high');
    const [door, window] = getHouseFacadeLayout(1.7, 2.0);
    const frontZ = 0.75;
    const glassX = window.x + window.width * 0.24;
    const glassY = window.y + window.height * 0.24;
    const glassHits = rayHits(result, glassX, glassY, frontZ + 1);
    expect(glassHits[0]?.object.material).toBe(result.k.m.glass);
    expect(glassHits.some(hit => hit.object.material === result.wall && Math.abs(hit.point.z - frontZ) < 0.002)).toBe(false);
    expect(glassHits.some(hit => hit.point.z < frontZ - 0.16 && hit.point.z > frontZ - 0.22)).toBe(true);

    const doorHits = rayHits(result, door.x, 0.8, frontZ + 1);
    expect(doorHits.some(hit => hit.object.material === result.k.m.wood)).toBe(true);
    expect(doorHits.some(hit => hit.object.material === result.wall && Math.abs(hit.point.z - frontZ) < 0.002)).toBe(false);
    const solidWallHits = rayHits(result, 0.8, 1.5, frontZ + 1);
    expect(solidWallHits.some(hit => hit.object.material === result.wall && Math.abs(hit.point.z - frontZ) < 0.002)).toBe(true);
    clearHouse(result);
  });

  it('房屋窗格朝向跟随 Frame，且 low 保留洞口并降低几何量', () => {
    const high = buildHouse('high');
    const low = buildHouse('low');
    expect(high.triangles).toBeLessThanOrEqual(3500);
    expect(low.triangles).toBeLessThan(high.triangles);
    expect(high.meshes.length).toBeLessThanOrEqual(10);
    expect(low.meshes.length).toBeLessThanOrEqual(high.meshes.length);

    const k = createSceneKit('high');
    const wall = new THREE.MeshStandardMaterial({ color: 0xe8ddcb, roughness: 0.95 });
    const yaw = Math.PI / 2;
    const scale = 1.2;
    const origin = new THREE.Vector3(3, 2, -1);
    house(k, new Frame(k.kit, origin.x, origin.y, origin.z, yaw, scale), 1.7, 2.0, 1.5, k.m.terracottaRoof, wall);
    const root = new THREE.Group();
    const meshes = k.kit.build(root, 'rotated-house-test');
    root.updateMatrixWorld(true);
    const window = getHouseFacadeLayout(1.7, 2.0)[1];
    const localPoint = new THREE.Vector3(window.x + window.width * 0.24, window.y + window.height * 0.24, 0.75 + 0.026);
    const matrix = new THREE.Matrix4().makeTranslation(origin.x, origin.y, origin.z)
      .multiply(new THREE.Matrix4().makeRotationY(yaw))
      .multiply(new THREE.Matrix4().makeScale(scale, scale, scale));
    const point = localPoint.applyMatrix4(matrix);
    const front = new THREE.Vector3(0, 0, 1).applyAxisAngle(new THREE.Vector3(0, 1, 0), yaw);
    const ray = new THREE.Raycaster(point.clone().addScaledVector(front, 0.5), front.negate());
    expect((ray.intersectObjects(meshes)[0]?.object as THREE.Mesh | undefined)?.material).toBe(k.m.glass);

    meshes.forEach(mesh => mesh.geometry.dispose());
    for (const material of new Set(meshes.map(mesh => mesh.material as THREE.Material))) material.dispose();
    clearHouse(high);
    clearHouse(low);
  });
});
