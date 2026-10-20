import * as THREE from "three";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { CinemaDirector } from "./CinemaDirector";
import { PovRig } from "./PovRig";
import { installDomStubs } from "./testDom";

function makeRig(): { rig: PovRig; camera: THREE.PerspectiveCamera } {
  const camera = new THREE.PerspectiveCamera(46, 16 / 9, 0.1, 120);
  const canvas = { addEventListener: () => undefined, removeEventListener: () => undefined, style: {}, setPointerCapture: () => undefined } as unknown as HTMLElement;
  const cinema = {
    getPose: (out: { pos: THREE.Vector3; look: THREE.Vector3; fov: number }) => {
      out.pos.set(0, 2, 6);
      out.look.set(0, 1, 0);
      out.fov = 46;
      return out;
    },
    setPoseFrom: () => undefined,
  } as unknown as CinemaDirector;
  const rig = new PovRig({
    camera,
    canvas,
    cinema,
    bounds: { minX: -4, maxX: 4, minZ: -3, maxZ: 3 },
    spawn: { x: 0, y: 0, z: 0, yaw: Math.PI },
    baseFov: 46,
  });
  rig.setBounds({ minX: -4, maxX: 4, minZ: -3, maxZ: 3 }, { minX: -4.5, maxX: 4.5, minZ: -3.5, maxZ: 12 });
  rig.place(0, 0, 0, Math.PI);
  return { rig, camera };
}

function run(rig: PovRig, seconds: number): void {
  for (let t = 0; t < seconds; t += 1 / 60) rig.update(1 / 60);
}

function avatarOpacity(rig: PovRig): number {
  let o = -1;
  rig.avatar.traverse((n) => {
    const m = n as THREE.Mesh;
    if (m.isMesh && (m.material as THREE.Material).userData.shimmer) o = (m.material as THREE.Material).opacity;
  });
  return o;
}

describe("PovRig：2090 年的他是一层微光，不再挡住画面", () => {
  beforeEach(installDomStubs);
  afterEach(() => vi.unstubAllGlobals());

  it("身体材质半透明（0.25–0.35）、不写深度、带菲涅尔边缘光补丁；不参与射线拾取", () => {
    const { rig } = makeRig();
    const mats = new Set<THREE.MeshStandardMaterial>();
    let meshes = 0;
    let rayHits = 0;
    rig.avatar.traverse((n) => {
      const m = n as THREE.Mesh;
      if (m.raycast !== THREE.Object3D.prototype.raycast) rayHits++;
      if (!m.isMesh) return;
      meshes++;
      mats.add(m.material as THREE.MeshStandardMaterial);
    });
    expect(meshes).toBeGreaterThan(5);
    expect(rayHits).toBeGreaterThanOrEqual(meshes); // 所有网格的 raycast 都被替换成了空操作
    for (const m of mats) {
      if (!m.userData.shimmer) continue;
      expect(m.transparent).toBe(true);
      expect(m.opacity).toBeGreaterThanOrEqual(0.25);
      expect(m.opacity).toBeLessThanOrEqual(0.35);
      expect(m.depthWrite).toBe(false);
      expect(m.customProgramCacheKey()).toContain("shimmer");
      const shader = { fragmentShader: "#include <emissivemap_fragment>\n#include <opaque_fragment>", vertexShader: "", uniforms: {} } as unknown as THREE.WebGLProgramParametersWithUniforms;
      m.onBeforeCompile(shader, {} as THREE.WebGLRenderer);
      expect(shader.fragmentShader).toContain("avRim");
    }
    const hit = new THREE.Raycaster(new THREE.Vector3(0, 1, 5), new THREE.Vector3(0, 0, -1)).intersectObject(rig.avatar, true);
    expect(hit).toHaveLength(0);
  });

  it("相机退到他身后很远、偏到肩后：他在画面里偏向一侧而不是正中，且尺寸变小", () => {
    const { rig, camera } = makeRig();
    run(rig, 1.5);
    const dist = camera.position.distanceTo(new THREE.Vector3(0, 1, 0));
    expect(dist).toBeGreaterThan(5);
    const p = new THREE.Vector3(0, 1.0, 0).project(camera);
    expect(Math.abs(p.x)).toBeGreaterThan(0.3); // 偏到一侧
    expect(Math.abs(p.x)).toBeLessThan(0.85); // 但没出画
    // 身高（1.8 m）在画面中的高度不超过屏幕的 40%
    const top = new THREE.Vector3(0, 1.8, 0).project(camera);
    const bottom = new THREE.Vector3(0, 0, 0).project(camera);
    expect((top.y - bottom.y) / 2).toBeLessThan(0.4);
  });

  it("可点的物件在他身后时，他进一步淡出；移开后恢复", () => {
    const { rig } = makeRig();
    run(rig, 1.5);
    const base = avatarOpacity(rig);
    expect(base).toBeCloseTo(0.3, 1);
    // 物件正好在他身后（离相机比他更远，屏幕位置与他重合）
    const cam = (rig as unknown as { camera: THREE.PerspectiveCamera }).camera;
    const behind = new THREE.Vector3(0, 1, 0).sub(cam.position).normalize().multiplyScalar(2.5).add(new THREE.Vector3(0, 1, 0));
    rig.setTargetsProvider(() => [behind]);
    run(rig, 1.0);
    expect(avatarOpacity(rig)).toBeLessThan(0.12);
    rig.setTargetsProvider(() => [new THREE.Vector3(3.5, 1, -1)]);
    run(rig, 1.2);
    expect(avatarOpacity(rig)).toBeGreaterThan(0.25);
  });

  it("身后有光尘拖尾（走动时更密），隐藏身体时拖尾也隐藏；第一人称不显示他", () => {
    const { rig } = makeRig();
    rig.avatar.visible = true;
    run(rig, 2);
    expect(rig.trail.visible).toBe(true);
    const col = rig.trail.geometry.getAttribute("color") as THREE.BufferAttribute;
    let lit = 0;
    for (let i = 0; i < col.count; i++) if (col.getX(i) > 0.01) lit++;
    expect(lit).toBeGreaterThan(3);
    rig.setPov("me");
    run(rig, 0.2);
    expect(rig.root.visible).toBe(false);
    expect(rig.trail.visible).toBe(false);
    rig.setPov("you");
    rig.setAvatarHidden(true);
    run(rig, 0.1);
    expect(rig.trail.visible).toBe(false);
  });

  it("第一人称：眼睛锚点、朝向与俯仰；跟随相机可以退到房间前墙之外", () => {
    const { rig, camera } = makeRig();
    rig.setEyeAnchor(new THREE.Vector3(2.8, 1.35, -0.25), -Math.PI / 2, -0.1);
    rig.setPov("me");
    run(rig, 3);
    expect(camera.position.x).toBeCloseTo(2.8, 1);
    const dir = new THREE.Vector3(0, 0, -1).applyQuaternion(camera.quaternion);
    expect(dir.x).toBeLessThan(-0.9); // 朝 -x 看
    expect(dir.y).toBeLessThan(0); // 略微低头
    rig.setPov("you");
    run(rig, 3);
    expect(camera.position.z).toBeGreaterThan(5); // 退到 maxZ=3 的前墙之外
  });

  it("第一人称低头看讲义 / 笔记本、抬头看老师：setLookDown 平滑改变俯角，位置不动", () => {
    const { rig, camera } = makeRig();
    rig.setEyeAnchor(new THREE.Vector3(2.8, 1.35, -0.25), -Math.PI / 2, 0);
    rig.setPov("me");
    run(rig, 3);
    const level = new THREE.Vector3(0, 0, -1).applyQuaternion(camera.quaternion).y;
    rig.setLookDown(0.9);
    run(rig, 3);
    const down = new THREE.Vector3(0, 0, -1).applyQuaternion(camera.quaternion);
    expect(down.y).toBeLessThan(level - 0.6);
    expect(camera.position.x).toBeCloseTo(2.8, 1);
    rig.setLookDown(0);
    run(rig, 3);
    expect(new THREE.Vector3(0, 0, -1).applyQuaternion(camera.quaternion).y).toBeCloseTo(level, 1);
  });

  it("点地面 / 自动走位：moveTo 走到目的地并停下；按键立刻取消；目的地被夹进可走范围", () => {
    const { rig } = makeRig();
    rig.moveTo(2, -1.5);
    expect(rig.walkingToDest).toBe(true);
    run(rig, 2);
    expect(rig.player.x).toBeCloseTo(2, 0);
    expect(rig.player.z).toBeCloseTo(-1.5, 0);
    expect(rig.walkingToDest).toBe(false);
    rig.moveTo(100, 100);
    run(rig, 6);
    expect(rig.player.x).toBeLessThanOrEqual(4.001);
    expect(rig.player.z).toBeLessThanOrEqual(3.001);
    rig.moveTo(-3, -2);
    rig.setStick(0, 1); // 摇杆输入 → 手动优先
    run(rig, 0.1);
    expect(rig.walkingToDest).toBe(false);
    rig.setStick(0, 0);
  });

  it("框住目标：跟随镜头拉近、视线移向目标群；release 之后回到默认肩后机位", () => {
    const { rig, camera } = makeRig();
    run(rig, 2);
    const far = camera.position.distanceTo(rig.player);
    rig.frameFocus(new THREE.Vector3(0, 0.9, -2), 3, 2.2);
    run(rig, 3);
    const near = camera.position.distanceTo(rig.player);
    expect(near).toBeLessThan(far - 1.5);
    // 视线（相机朝向）指向目标群而不是玩家
    const dir = new THREE.Vector3(0, 0, -1).applyQuaternion(camera.quaternion);
    const toFocus = new THREE.Vector3(0, 0.9, -2).sub(camera.position).normalize();
    expect(dir.dot(toFocus)).toBeGreaterThan(0.97);
    rig.releaseFraming();
    run(rig, 4);
    expect(camera.position.distanceTo(rig.player)).toBeGreaterThan(far - 0.5);
  });
});
