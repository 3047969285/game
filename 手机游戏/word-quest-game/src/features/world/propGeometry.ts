import * as THREE from "three";

/** 开书的页面高度；中央装订处凹下，纸页向外轻微拱起。单位为米。 */
export function bookPageHeight(t: number): number {
  const u = THREE.MathUtils.clamp(t, 0, 1);
  return 0.025 + 0.020 * Math.sin(u * Math.PI) + 0.006 * u;
}

export function createBookPageBlock(side: -1 | 1, segments = 10): THREE.BufferGeometry {
  const shape = new THREE.Shape();
  const x = (t: number) => side * (0.004 + t * 0.201);
  shape.moveTo(x(0), 0.014);
  shape.lineTo(x(1), 0.014);
  for (let i = segments; i >= 0; i--) {
    const t = i / segments;
    shape.lineTo(x(t), bookPageHeight(t));
  }
  shape.closePath();
  const geometry = new THREE.ExtrudeGeometry(shape, {
    depth: 0.274, steps: 1, bevelEnabled: false, curveSegments: 1,
  });
  geometry.translate(0, 0, -0.137);
  return geometry;
}

/** 一页分成两段的印刷行，随纸页起伏；使用网格避免额外文字贴图。 */
export function createBookPrint(side: -1 | 1): THREE.BufferGeometry {
  const positions: number[] = [];
  const indices: number[] = [];
  const segments = 2;
  for (let row = 0; row < 10; row++) {
    const z = -0.108 + row * 0.022;
    const end = row === 0 ? 0.68 : row === 5 || row === 9 ? 0.58 : 0.86 + (row % 3) * 0.025;
    const lineWidth = row === 0 ? 0.004 : 0.0018;
    const words = row === 0 ? 2 : 5 + row % 2;
    const gap = 0.023;
    const width = (end - 0.13 - gap * (words - 1)) / words;
    for (let word = 0; word < words; word++) {
      const start = positions.length / 3;
      const begin = 0.13 + word * (width + gap);
      for (let i = 0; i <= segments; i++) {
        const t = begin + width * i / segments;
        const x = side * (0.004 + t * 0.201);
        const y = bookPageHeight(t) + 0.001;
        positions.push(x, y, z, x, y, z + lineWidth);
        if (i === segments) continue;
        const a = start + i * 2;
        const triangles = [a, a + 1, a + 2, a + 1, a + 3, a + 2];
        indices.push(...(side === 1 ? triangles : [a, a + 2, a + 1, a + 1, a + 2, a + 3]));
      }
    }
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();
  return geometry;
}

/** 书签贴住纸面，过了纸页边缘后柔和垂落，不是悬空的硬纸片。 */
export function createBookRibbon(): THREE.BufferGeometry {
  const positions: number[] = [], indices: number[] = [];
  const top = bookPageHeight((0.12 - 0.004) / 0.201) + 0.0018;
  for (let i = 0; i <= 10; i++) {
    const z = 0.065 + i * 0.0115;
    const bend = THREE.MathUtils.clamp((z - 0.137) / 0.043, 0, 1);
    const y = top - bend * bend * 0.032;
    positions.push(0.114, y, z, 0.126, y, z);
    if (i < 10) {
      const a = i * 2;
      indices.push(a, a + 2, a + 1, a + 1, a + 2, a + 3);
    }
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();
  return geometry;
}

/** 石圈为真正有孔的几何，不能用实心圆柱顶盖覆盖土面。 */
export function createPlanterRim(radius: number, height = 0.055): THREE.BufferGeometry {
  const shape = new THREE.Shape();
  shape.absarc(0, 0, radius * 1.05, 0, Math.PI * 2, false);
  const hole = new THREE.Path();
  hole.absarc(0, 0, radius * 0.86, 0, Math.PI * 2, true);
  shape.holes.push(hole);
  const geometry = new THREE.ExtrudeGeometry(shape, {
    depth: height, bevelEnabled: false, steps: 1, curveSegments: 16,
  });
  geometry.rotateX(-Math.PI / 2);
  return geometry;
}

/** 花瓣为带纵向弧度的薄片，花心低、边缘翘起。 */
export function createPetalGeometry(): THREE.BufferGeometry {
  const positions = [0, 0, 0];
  const points = 8;
  for (let i = 0; i < points; i++) {
    const angle = i / points * Math.PI * 2;
    const z = 0.55 + Math.cos(angle) * 0.55;
    positions.push(Math.sin(angle) * 0.32, z * z * 0.2, z);
  }
  const indices: number[] = [];
  for (let i = 0; i < points; i++) indices.push(0, i + 1, (i + 1) % points + 1);
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();
  return geometry;
}
