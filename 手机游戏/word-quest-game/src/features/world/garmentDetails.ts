import * as THREE from "three";
import { mergeGeometries } from "three/addons/utils/BufferGeometryUtils.js";
import { sdBox, sdCone, sdEllipsoid, sdTorus, smax, smin } from "./sdf";

/**
 * Character garment surface details. The returned geometries stay in the named
 * body-part's local coordinates; this module never creates meshes or materials.
 * The caller owns and must dispose each returned geometry after merging it.
 */
export type GarmentStyle = "tee" | "hoodie" | "coat";
export type GarmentDetailLevel = "low" | "high";
export type GarmentAnchor = "torso" | "upperArm" | "forearm";
export type GarmentDetailMaterial = "cloth" | "trim";

export interface GarmentDetailsOptions {
  style: GarmentStyle;
  detail: GarmentDetailLevel;
}

export interface GarmentDetailGeometry {
  anchor: GarmentAnchor;
  side: -1 | 0 | 1;
  material: GarmentDetailMaterial;
  geometry: THREE.BufferGeometry;
}

interface DetailBucket {
  anchor: GarmentAnchor;
  side: -1 | 0 | 1;
  material: GarmentDetailMaterial;
  parts: THREE.BufferGeometry[];
}

interface DetailQuality {
  pathSegments: number;
  radialSegments: number;
  lineRadius: number;
  buttonSegments: number;
}

const QUALITY: Record<GarmentDetailLevel, DetailQuality> = {
  low: { pathSegments: 10, radialSegments: 4, lineRadius: 0.0014, buttonSegments: 6 },
  high: { pathSegments: 22, radialSegments: 5, lineRadius: 0.0011, buttonSegments: 8 },
};

function torsoSurfaceDistance(x: number, y: number, z: number): number {
  // Mirror the current jacket SDF so seams follow chest and shoulder volume
  // instead of floating at a guessed ellipsoid depth.
  const ax = Math.abs(x);
  let d = sdEllipsoid(ax, y, z, 0, 1.33, 0, 0.143, 0.17, 0.096);
  d = smin(d, sdEllipsoid(ax, y, z, 0.055, 1.31, 0.028, 0.073, 0.061, 0.071), 0.055);
  d = smin(d, sdEllipsoid(ax, y, z, 0, 1.14, 0, 0.126, 0.17, 0.09), 0.075);
  d = smin(d, sdEllipsoid(ax, y, z, 0, 0.97, -0.004, 0.145, 0.13, 0.104), 0.075);
  d = smin(d, sdCone(ax, y, z, 0.018, 1.492, -0.01, 0.147, 1.417, -0.002, 0.043, 0.047), 0.085);
  d = smin(d, sdEllipsoid(ax, y, z, 0.151, 1.405, 0, 0.048, 0.064, 0.061), 0.058);
  d = smin(d, sdCone(ax, y, z, 0, 1.46, -0.02, 0, 1.535, -0.02, 0.061, 0.046), 0.065);
  d = smin(d, sdTorus(ax, y, z, 0, 1.525, 0, 0.074, 0.026), 0.02);
  d = smin(d, sdBox(ax, y, z, 0.085, 1.27, 0.094, 0.04, 0.03, 0.014, 0.006), 0.006);
  d = smax(d, 0.88 - y, 0.03);
  d = smax(d, -sdCone(ax, y, z, 0, 1.43, -0.006, 0, 1.62, -0.006, 0.058, 0.058), 0.014);
  const ang = Math.atan2(z, x);
  d += (Math.sin(ang * 7 + y * 13) * 0.5 + Math.sin(ang * 12 - y * 8 + 1.7) * 0.3) * (y < 1.15 ? 0.0055 : 0.0028);
  return d;
}

function torsoFrontZ(x: number, y: number): number {
  let inside = 0;
  let outside = 0.32;
  if (torsoSurfaceDistance(x, y, inside) > 0) return 0.066;
  for (let i = 0; i < 18; i++) {
    const mid = (inside + outside) / 2;
    if (torsoSurfaceDistance(x, y, mid) <= 0) inside = mid;
    else outside = mid;
  }
  // A small 4 mm allowance prevents depth fighting while keeping raised seams subtle.
  return (inside + outside) / 2 + 0.004;
}

function sleeveRadii(anchor: "upperArm" | "forearm", y: number): [number, number] {
  const t = THREE.MathUtils.clamp(Math.abs(y) / (anchor === "upperArm" ? 0.28 : 0.255), 0, 1);
  if (anchor === "upperArm") {
    return [THREE.MathUtils.lerp(0.058, 0.046, t), THREE.MathUtils.lerp(0.06, 0.046, t)];
  }
  return [THREE.MathUtils.lerp(0.039, 0.05, 1 - t), THREE.MathUtils.lerp(0.038, 0.046, 1 - t)];
}

function sleeveFrontZ(anchor: "upperArm" | "forearm", x: number, y: number): number {
  const [rx, rz] = sleeveRadii(anchor, y);
  const q = Math.max(0.12, 1 - (x / rx) ** 2);
  return rz * Math.sqrt(q) + 0.0035;
}

function addBucket(
  buckets: Map<string, DetailBucket>,
  anchor: GarmentAnchor,
  side: -1 | 0 | 1,
  material: GarmentDetailMaterial
): DetailBucket {
  const key = `${anchor}:${side}:${material}`;
  let bucket = buckets.get(key);
  if (!bucket) {
    bucket = { anchor, side, material, parts: [] };
    buckets.set(key, bucket);
  }
  return bucket;
}

function addPath(
  bucket: DetailBucket,
  points: THREE.Vector3[],
  quality: DetailQuality,
  radius = quality.lineRadius,
  closed = false
): void {
  if (points.length < 3) return;
  const curve = new THREE.CatmullRomCurve3(points, closed, "centripetal");
  bucket.parts.push(new THREE.TubeGeometry(curve, quality.pathSegments, radius, quality.radialSegments, closed));
}

function torsoPath(points: Array<[number, number]>): THREE.Vector3[] {
  return points.map(([x, y]) => new THREE.Vector3(x, y, torsoFrontZ(x, y)));
}

function addTorsoNeckline(bucket: DetailBucket, quality: DetailQuality): void {
  const points: THREE.Vector3[] = [];
  const count = quality.pathSegments;
  for (let i = 0; i <= count; i++) {
    const t = THREE.MathUtils.lerp(-Math.PI / 2, Math.PI / 2, i / count);
    const x = 0.057 * Math.sin(t);
    const y = 1.495 - 0.043 * Math.cos(t);
    points.push(new THREE.Vector3(x, y, Math.max(torsoFrontZ(x, y), 0.086)));
  }
  addPath(bucket, points, quality, quality.lineRadius * 1.25);
}

function addPocketOutline(
  bucket: DetailBucket,
  centerX: number,
  centerY: number,
  width: number,
  height: number,
  quality: DetailQuality,
  flap = false,
  frontZ?: number
): void {
  const x0 = centerX - width / 2;
  const x1 = centerX + width / 2;
  const y0 = centerY - height / 2;
  const y1 = centerY + height / 2;
  const corners: Array<[number, number]> = [
    [x0 + 0.006, y0],
    [x1 - 0.006, y0],
    [x1, y0 + 0.006],
    [x1, y1 - 0.006],
    [x1 - 0.006, y1],
    [x0 + 0.006, y1],
    [x0, y1 - 0.006],
    [x0, y0 + 0.006],
  ];
  const placeOnPocketFace = (points: THREE.Vector3[]): THREE.Vector3[] => points.map((p) => p.setZ(frontZ ?? p.z));
  const points = placeOnPocketFace(torsoPath(corners));
  addPath(bucket, points, quality, quality.lineRadius * 1.1, true);
  if (flap) {
    addPath(bucket, placeOnPocketFace(torsoPath([[x0 + 0.006, y1 - 0.012], [centerX, y1 - 0.012], [x1 - 0.006, y1 - 0.012]])), quality, quality.lineRadius * 1.15);
  }
}

function addTorsoDetails(style: GarmentStyle, quality: DetailQuality, buckets: Map<string, DetailBucket>): void {
  const cloth = addBucket(buckets, "torso", 0, "cloth");
  addTorsoNeckline(cloth, quality);

  if (style === "tee") {
    for (const side of [-1, 1] as const) {
      addPath(cloth, torsoPath([
        [side * 0.056, 1.48],
        [side * 0.082, 1.455],
        [side * 0.111, 1.425],
        [side * 0.127, 1.395],
      ]), quality, quality.lineRadius);
    }
    addPocketOutline(cloth, -0.077, 1.265, 0.045, 0.061, quality, true, 0.111);
    return;
  }

  if (style === "hoodie") {
    const cord = addBucket(buckets, "torso", 0, "trim");
    for (const side of [-1, 1] as const) {
      addPath(cord, torsoPath([
        [side * 0.012, 1.465],
        [side * 0.016, 1.405],
        [side * 0.021, 1.335],
      ]), quality, quality.lineRadius * 1.4);
    }
    // The hoodie body already carries a soft kangaroo pocket; this outlines its face.
    addPocketOutline(cloth, 0, 1.0, 0.178, 0.066, quality, false, 0.141);
    return;
  }

  const trim = addBucket(buckets, "torso", 0, "trim");
  const placket: Array<[number, number]> = [[0, 1.49], [0, 1.38], [0, 1.25], [0, 1.11], [0, 0.99]];
  addPath(cloth, torsoPath(placket), quality, quality.lineRadius * 1.8);
  for (const side of [-1, 1] as const) {
    addPath(cloth, torsoPath([
      [side * 0.026, 1.49],
      [side * 0.05, 1.43],
      [side * 0.081, 1.35],
      [side * 0.102, 1.26],
    ]), quality, quality.lineRadius * 1.3);
    addPocketOutline(cloth, side * 0.09, 1.045, 0.052, 0.06, quality, true);
  }
  addPocketOutline(cloth, 0.078, 1.267, 0.047, 0.052, quality, true, 0.111);

  const buttonCount = quality.pathSegments > 10 ? 4 : 3;
  for (let i = 0; i < buttonCount; i++) {
    const y = THREE.MathUtils.lerp(1.405, 1.055, i / (buttonCount - 1));
    const geo = new THREE.CylinderGeometry(0.0034, 0.0034, 0.0016, quality.buttonSegments, 1);
    geo.rotateX(Math.PI / 2);
    geo.translate(0, y, torsoFrontZ(0, y));
    trim.parts.push(geo);
  }
}

function ellipsePoints(rx: number, rz: number, y: number, count: number): THREE.Vector3[] {
  const points: THREE.Vector3[] = [];
  for (let i = 0; i < count; i++) {
    const t = (i / count) * Math.PI * 2;
    points.push(new THREE.Vector3(Math.cos(t) * rx, y, Math.sin(t) * rz));
  }
  return points;
}

function addSleeveDetails(anchor: "upperArm" | "forearm", style: GarmentStyle, quality: DetailQuality, buckets: Map<string, DetailBucket>, side: -1 | 1): void {
  const cloth = addBucket(buckets, anchor, side, "cloth");
  const cuffY = anchor === "upperArm" ? -0.265 : -0.226;
  const [cuffX, cuffZ] = sleeveRadii(anchor, cuffY);
  addPath(cloth, ellipsePoints(cuffX * 1.04, cuffZ * 1.04, cuffY, quality.pathSegments), quality, quality.lineRadius * 1.35, true);

  const creaseCount = anchor === "forearm" ? (quality.pathSegments > 10 ? 3 : 1) : 1;
  for (let fold = 0; fold < creaseCount; fold++) {
    const y0 = anchor === "forearm" ? -0.025 - fold * 0.036 : -0.12;
    const [rx] = sleeveRadii(anchor, y0);
    const span = rx * 0.72;
    const points: THREE.Vector3[] = [];
    const count = quality.pathSegments;
    for (let i = 0; i <= count; i++) {
      const u = i / count * 2 - 1;
      const x = u * span;
      const y = y0 + 0.006 * u + Math.sin((u + 1) * Math.PI) * (fold % 2 ? -0.0025 : 0.0025);
      points.push(new THREE.Vector3(x, y, sleeveFrontZ(anchor, x, y) + 0.001));
    }
    addPath(cloth, points, quality, quality.lineRadius * (anchor === "forearm" ? 1.2 : 1.0));
  }

  if (anchor === "upperArm" && style !== "tee" && quality.pathSegments > 10) {
    // A restrained sleeve seam follows the outer contour instead of adding noisy folds.
    const points: THREE.Vector3[] = [];
    for (let i = 0; i <= quality.pathSegments; i++) {
      const y = THREE.MathUtils.lerp(-0.025, -0.23, i / quality.pathSegments);
      const [rx, rz] = sleeveRadii(anchor, y);
      points.push(new THREE.Vector3(side * rx * 1.01, y, rz * 0.18 + 0.002));
    }
    addPath(cloth, points, quality, quality.lineRadius * 0.9);
  }
}

/** Build small, batched garment detail geometries for the existing character bones. */
export function createGarmentDetails(options: GarmentDetailsOptions): GarmentDetailGeometry[] {
  const quality = QUALITY[options.detail];
  const buckets = new Map<string, DetailBucket>();
  addTorsoDetails(options.style, quality, buckets);
  for (const side of [-1, 1] as const) {
    addSleeveDetails("upperArm", options.style, quality, buckets, side);
    addSleeveDetails("forearm", options.style, quality, buckets, side);
  }

  const order: Record<GarmentAnchor, number> = { torso: 0, upperArm: 1, forearm: 2 };
  return [...buckets.values()]
    .sort((a, b) => order[a.anchor] - order[b.anchor] || a.side - b.side || a.material.localeCompare(b.material))
    .map((bucket) => {
      const geometry = mergeGeometries(bucket.parts, false);
      if (!geometry) throw new Error(`Could not merge garment details for ${bucket.anchor}:${bucket.side}:${bucket.material}`);
      bucket.parts.forEach((part) => part.dispose());
      geometry.computeBoundingBox();
      geometry.computeBoundingSphere();
      geometry.userData.garmentDetail = { anchor: bucket.anchor, side: bucket.side, material: bucket.material };
      return { anchor: bucket.anchor, side: bucket.side, material: bucket.material, geometry };
    });
}
