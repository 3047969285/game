import * as THREE from "three";
import { mergeGeometries, mergeVertices } from "three/addons/utils/BufferGeometryUtils.js";
import { fbm, seededRand, smoothstep } from "./utils";

/**
 * 远景山脉：带山脊、侵蚀沟壑与雪线的真实感山体。
 * 取代原先的低多边形圆锥——每座山是一个位移的锥体（脊线噪声 + 径向岩层），
 * 顶点色承载岩层、植被带与积雪；全部合并为一个网格。
 */
export function createMountainRing(opts: {
  count: number;
  ringRadius: number;
  originZ: number;
  snow: boolean;
  seed?: number;
}): THREE.Group {
  const group = new THREE.Group();
  group.name = "mountain-ring";
  const rnd = seededRand(opts.seed ?? 7);
  const geos: THREE.BufferGeometry[] = [];
  const v = new THREE.Vector3();
  const rock = new THREE.Color(0x4a5568);
  const rockWarm = new THREE.Color(0x5b5a5e);
  const forest = new THREE.Color(0x2c4a3c);
  const snowC = new THREE.Color(0xe9f1fb);
  const c = new THREE.Color();

  for (let i = 0; i < opts.count; i++) {
    const a = (i / opts.count) * Math.PI * 2 + (rnd() - 0.5) * 0.18;
    const r = opts.ringRadius + rnd() * 40;
    const x = Math.cos(a) * r;
    const z = Math.sin(a) * r + opts.originZ;
    const h = 46 + rnd() * 82;
    const rad = 34 + rnd() * 48;
    const seed = rnd() * 100;

    const cone = new THREE.ConeGeometry(1, 1, 40, 22, true);
    const welded = mergeVertices(cone, 1e-4);
    const p = welded.attributes.position;
    const colors = new Float32Array(p.count * 3);
    for (let k = 0; k < p.count; k++) {
      v.fromBufferAttribute(p, k);
      const t = v.y + 0.5; // 0 底 → 1 顶
      const ang = Math.atan2(v.z, v.x);

      // 山脊：沿角度的多频率脊线噪声，向山顶收敛
      const ridge =
        Math.abs(Math.sin(ang * 5 + seed)) * 0.22 +
        Math.abs(Math.sin(ang * 11 + seed * 1.7 + t * 4)) * 0.1 +
        (fbm(Math.cos(ang) * 3 + seed, Math.sin(ang) * 3 + t * 6, 3) - 0.5) * 0.28;
      const body = Math.pow(1 - t, 0.82); // 山体轮廓（凹形坡）
      const nr = 0.55 + ridge * (0.4 + 0.6 * (1 - t)) + 0.45 * body;
      let y = t - 0.5;
      // 山顶略尖并带起伏
      y += (fbm(Math.cos(ang) * 2.2 + seed, Math.sin(ang) * 2.2 + seed, 3) - 0.5) * 0.06 * (1 - t);
      p.setXYZ(k, v.x * nr, y, v.z * nr);

      // 颜色：低处林带 → 岩层 → 雪线
      const strata = 0.82 + 0.18 * Math.sin(t * 38 + ridge * 6);
      c.copy(rock).lerp(rockWarm, fbm(ang * 2 + seed, t * 7, 2));
      c.multiplyScalar(strata);
      const forestMix = 1 - smoothstep(0.08, 0.34, t + (fbm(ang * 3, t * 9, 2) - 0.5) * 0.12);
      c.lerp(forest, forestMix * 0.85);
      if (opts.snow) {
        const snowLine = 0.62 + (fbm(ang * 4 + seed, t * 8, 3) - 0.5) * 0.18;
        const snowMix = smoothstep(snowLine - 0.04, snowLine + 0.08, t);
        c.lerp(snowC, snowMix);
      }
      colors[k * 3] = c.r;
      colors[k * 3 + 1] = c.g;
      colors[k * 3 + 2] = c.b;
    }
    welded.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    welded.deleteAttribute("uv");
    welded.computeVertexNormals();
    welded.scale(rad, h, rad);
    welded.rotateY(rnd() * Math.PI * 2);
    welded.translate(x, h / 2 - 8, z);
    geos.push(welded);
  }

  const merged = mergeGeometries(geos, false);
  if (merged) {
    const mesh = new THREE.Mesh(
      merged,
      new THREE.MeshStandardMaterial({ color: 0xffffff, vertexColors: true, roughness: 1, metalness: 0, side: THREE.DoubleSide, fog: true })
    );
    mesh.castShadow = false;
    mesh.receiveShadow = false;
    group.add(mesh);
  }
  return group;
}
