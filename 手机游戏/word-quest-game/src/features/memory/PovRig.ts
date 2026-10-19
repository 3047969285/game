import * as THREE from "three";
import { createExplorerAvatar, type AvatarRig } from "../world/explorerAvatar";
import type { CinemaDirector, CameraPose } from "./CinemaDirector";
import type { StageBounds } from "./stages";
import type { Pov, Vec3 } from "./types";

/**
 * 三种相机 + 二维：
 *  - you：第三人称跟随 2090 年的他（半透明、带微光的冷色身影），WASD / 摇杆走动，拖动转视角
 *  - watch：电影机位，姿态来自 CinemaDirector
 *  - me：年轻的“我”的眼睛高度（1.6 m），拖动环顾，轻微呼吸晃动，身体隐藏
 *  - paper：相机不动（背景由 CSS 虚化 + 压暗）
 * 切换 POV 时对相机姿态做 1.3 秒的缓动混合，不硬切。
 */

const PLAYER_SPEED = 2.5;
const FOLLOW_DIST = 3.5;
const FOLLOW_HEIGHT = 1.9;
const EYE_HEIGHT = 1.6;
const BLEND_SECONDS = 1.3;

const _q = new THREE.Quaternion();
const _m = new THREE.Matrix4();
const _up = new THREE.Vector3(0, 1, 0);

function lookQuat(pos: THREE.Vector3, target: THREE.Vector3, out: THREE.Quaternion): THREE.Quaternion {
  _m.lookAt(pos, target, _up);
  return out.setFromRotationMatrix(_m);
}

function angleDiff(a: number, b: number): number {
  let d = a - b;
  while (d > Math.PI) d -= Math.PI * 2;
  while (d < -Math.PI) d += Math.PI * 2;
  return d;
}

/** 2090 年的他：探险者形体换成冷色半透明材质，并去掉自带的点光源（动态光源数量不能变，否则全场景重编译） */
function createOldSelf(): THREE.Group {
  const avatar = createExplorerAvatar();
  avatar.name = "old-self";
  const cool = new THREE.Color(0x9fc4ff);
  const swapped = new Map<THREE.Material, THREE.Material>();
  const lights: THREE.Light[] = [];
  avatar.traverse((o) => {
    if ((o as THREE.Light).isLight) lights.push(o as THREE.Light);
    const mesh = o as THREE.Mesh;
    if (!mesh.isMesh) return;
    const src = mesh.material as THREE.Material;
    let dst = swapped.get(src);
    if (!dst) {
      const s = src as THREE.MeshStandardMaterial;
      if ((src as THREE.MeshBasicMaterial).isMeshBasicMaterial) {
        dst = src;
      } else {
        const base = s.color ? s.color.clone() : new THREE.Color(0xaaaaaa);
        dst = new THREE.MeshStandardMaterial({
          color: base.lerp(cool, 0.42),
          roughness: 0.62,
          metalness: 0.02,
          vertexColors: s.vertexColors,
          map: s.map ?? null,
          emissive: 0x4f86d8,
          emissiveIntensity: 0.32,
          transparent: true,
          opacity: 0.74,
          side: s.side,
        });
      }
      swapped.set(src, dst);
    }
    mesh.material = dst;
    mesh.castShadow = false;
  });
  for (const l of lights) l.removeFromParent();
  return avatar;
}

export interface PovRigOptions {
  camera: THREE.PerspectiveCamera;
  canvas: HTMLElement;
  cinema: CinemaDirector;
  bounds: StageBounds;
  spawn: Vec3 & { yaw: number };
  baseFov: number;
}

export class PovRig {
  /** 外层包装：PovRig 控制它的可见性（第一人称隐藏）；内层 avatar 由 Materializer 控制溶解 */
  readonly root = new THREE.Group();
  readonly avatar: THREE.Group;
  readonly player = new THREE.Vector3();
  pov: Pov = "you";

  private readonly camera: THREE.PerspectiveCamera;
  private readonly canvas: HTMLElement;
  private readonly cinema: CinemaDirector;
  private bounds: StageBounds;
  private baseFov: number;
  private readonly keys = new Set<string>();
  private stick = { x: 0, z: 0 };
  private sprint = false;
  private playerYaw: number;
  private avatarYaw: number;
  private camYaw: number;
  private camPitch = 0.12;
  private walkPhase = 0;
  private moving = false;
  private readonly followPos = new THREE.Vector3();
  private followInit = false;
  private eyeAnchor: THREE.Vector3 | null = null;
  private eyeYaw = 0;
  private lookYaw = 0;
  private lookPitch = 0;
  private time = 0;

  private blend: { t: number; fromPos: THREE.Vector3; fromQuat: THREE.Quaternion; fromFov: number } | null = null;
  private readonly pose = new THREE.Vector3();
  private readonly poseLook = new THREE.Vector3();
  private readonly targetPos = new THREE.Vector3();
  private readonly targetQuat = new THREE.Quaternion();
  private targetFov: number;
  private readonly cine: CameraPose = { pos: new THREE.Vector3(), look: new THREE.Vector3(), fov: 46 };

  private dragPointer: number | null = null;
  private lastX = 0;
  private lastY = 0;
  private enabled = true;
  private avatarHidden = false;

  constructor(opts: PovRigOptions) {
    this.camera = opts.camera;
    this.canvas = opts.canvas;
    this.cinema = opts.cinema;
    this.bounds = opts.bounds;
    this.baseFov = opts.baseFov;
    this.targetFov = opts.baseFov;
    this.player.set(opts.spawn.x, opts.spawn.y, opts.spawn.z);
    this.playerYaw = this.avatarYaw = this.camYaw = opts.spawn.yaw;
    this.avatar = createOldSelf();
    this.root.name = "pov-rig";
    this.root.add(this.avatar);
    this.root.position.copy(this.player);
    this.root.rotation.y = this.avatarYaw;

    window.addEventListener("keydown", this.onKeyDown);
    window.addEventListener("keyup", this.onKeyUp);
    this.canvas.addEventListener("pointerdown", this.onPointerDown);
    this.canvas.addEventListener("pointermove", this.onPointerMove);
    this.canvas.addEventListener("pointerup", this.onPointerEnd);
    this.canvas.addEventListener("pointercancel", this.onPointerEnd);
    this.canvas.style.touchAction = "none";

    // 初始相机直接落在跟随位置，避免开场“飞”过来
    this.computeTarget(0);
    this.camera.position.copy(this.targetPos);
    this.camera.quaternion.copy(this.targetQuat);
    this.camera.fov = this.targetFov;
    this.camera.updateProjectionMatrix();
  }

  // ───────── 外部接口 ─────────

  setEnabled(on: boolean): void {
    this.enabled = on;
    if (!on) {
      this.keys.clear();
      this.stick.x = this.stick.z = 0;
    }
  }

  /** 开场占位等舞台不显示 2090 年的他 */
  setAvatarHidden(hidden: boolean): void {
    this.avatarHidden = hidden;
    this.root.visible = !hidden && this.pov !== "me";
  }

  /** 换舞台时更新可走范围 */
  setBounds(bounds: StageBounds): void {
    this.bounds = bounds;
  }

  /** 窗口比例变化时更新基准 fov */
  setBaseFov(fov: number): void {
    this.baseFov = fov;
  }

  /** 把玩家放到出生点并朝向 yaw，相机立刻落在跟随位置 */
  place(x: number, y: number, z: number, yaw: number): void {
    this.player.set(x, y, z);
    this.playerYaw = this.avatarYaw = this.camYaw = yaw;
    this.root.position.copy(this.player);
    this.root.rotation.y = yaw;
    this.followInit = false;
    this.computeTarget(0);
    this.camera.position.copy(this.targetPos);
    this.camera.quaternion.copy(this.targetQuat);
  }

  setStick(x: number, z: number): void {
    this.stick.x = x;
    this.stick.z = z;
  }

  /** 第一人称的眼睛位置与朝向（年轻的“我”的头部）；缺省用玩家出生点 */
  setEyeAnchor(pos: THREE.Vector3 | null, yaw = 0): void {
    this.eyeAnchor = pos ? pos.clone() : null;
    this.eyeYaw = yaw;
    this.lookYaw = 0;
    this.lookPitch = 0;
  }

  isMoving(): boolean {
    return this.moving;
  }

  setPov(pov: Pov): void {
    if (pov === this.pov) return;
    // 记录当前相机姿态，之后 1.3 秒内缓动过渡
    this.blend = { t: 0, fromPos: this.camera.position.clone(), fromQuat: this.camera.quaternion.clone(), fromFov: this.camera.fov };
    if (pov === "watch") {
      const dir = new THREE.Vector3(0, 0, -1).applyQuaternion(this.camera.quaternion);
      this.cinema.setPoseFrom(this.camera.position, this.camera.position.clone().addScaledVector(dir, 6), this.camera.fov);
    }
    if (pov === "me") {
      this.lookYaw = 0;
      this.lookPitch = 0;
    }
    this.pov = pov;
    this.root.visible = pov !== "me" && !this.avatarHidden;
    this.keys.clear();
  }

  // ───────── 每帧 ─────────

  update(dt: number): void {
    this.time += dt;
    if (this.pov === "you") this.updatePlayer(dt);
    else this.moving = false;
    this.animateAvatar(dt);

    if (this.pov !== "paper") this.computeTarget(dt);
    else {
      this.targetPos.copy(this.camera.position);
      this.targetQuat.copy(this.camera.quaternion);
      this.targetFov = this.camera.fov;
    }

    let k = 1;
    if (this.blend) {
      this.blend.t += dt;
      const x = Math.min(1, this.blend.t / BLEND_SECONDS);
      k = x * x * (3 - 2 * x);
      if (x >= 1) this.blend = null;
    }
    if (this.blend) {
      this.camera.position.lerpVectors(this.blend.fromPos, this.targetPos, k);
      this.camera.quaternion.slerpQuaternions(this.blend.fromQuat, this.targetQuat, k);
      this.camera.fov = THREE.MathUtils.lerp(this.blend.fromFov, this.targetFov, k);
    } else {
      this.camera.position.copy(this.targetPos);
      this.camera.quaternion.copy(this.targetQuat);
      this.camera.fov = this.targetFov;
    }
    this.camera.updateProjectionMatrix();
  }

  /** 按当前 POV 算出相机目标姿态 */
  private computeTarget(dt: number): void {
    switch (this.pov) {
      case "you": {
        const sin = Math.sin(this.camYaw);
        const cos = Math.cos(this.camYaw);
        const pitchLift = Math.sin(this.camPitch) * 2.2;
        const desired = this.pose.set(this.player.x - sin * FOLLOW_DIST, this.player.y + FOLLOW_HEIGHT + pitchLift, this.player.z - cos * FOLLOW_DIST);
        // 相机不能穿墙：限制在可走范围略外一圈
        const m = 0.3;
        desired.x = THREE.MathUtils.clamp(desired.x, this.bounds.minX - m, this.bounds.maxX + m);
        desired.z = THREE.MathUtils.clamp(desired.z, this.bounds.minZ - m, this.bounds.maxZ + m);
        if (!this.followInit) {
          this.followPos.copy(desired);
          this.followInit = true;
        } else {
          this.followPos.lerp(desired, 1 - Math.exp(-6 * dt));
        }
        this.targetPos.copy(this.followPos);
        this.poseLook.set(this.player.x, this.player.y + 1.45, this.player.z);
        lookQuat(this.targetPos, this.poseLook, this.targetQuat);
        this.targetFov = this.baseFov;
        break;
      }
      case "watch": {
        this.cinema.getPose(this.cine);
        this.targetPos.copy(this.cine.pos);
        lookQuat(this.targetPos, this.cine.look, this.targetQuat);
        this.targetFov = this.cine.fov;
        break;
      }
      case "me": {
        const eye = this.eyeAnchor ?? this.pose.set(this.player.x, this.player.y + EYE_HEIGHT, this.player.z);
        const breathe = Math.sin(this.time * 1.7) * 0.012;
        this.targetPos.set(eye.x + Math.sin(this.time * 0.6) * 0.006, eye.y + breathe, eye.z);
        const yaw = this.eyeYaw + this.lookYaw;
        const pitch = this.lookPitch + Math.sin(this.time * 1.7 + 0.8) * 0.004;
        _q.setFromEuler(new THREE.Euler(pitch, yaw + Math.PI, 0, "YXZ"));
        this.targetQuat.copy(_q);
        this.targetFov = this.baseFov + 2;
        break;
      }
      default:
        break;
    }
  }

  private updatePlayer(dt: number): void {
    if (!this.enabled) {
      this.moving = false;
      return;
    }
    let forward = (this.keys.has("w") || this.keys.has("arrowup") ? 1 : 0) - (this.keys.has("s") || this.keys.has("arrowdown") ? 1 : 0);
    let strafe = (this.keys.has("d") || this.keys.has("arrowright") ? 1 : 0) - (this.keys.has("a") || this.keys.has("arrowleft") ? 1 : 0);
    if (Math.abs(this.stick.x) > 0.1 || Math.abs(this.stick.z) > 0.1) {
      forward = this.stick.z;
      strafe = this.stick.x;
    }
    this.moving = forward !== 0 || strafe !== 0;
    if (this.moving) {
      const sin = Math.sin(this.camYaw);
      const cos = Math.cos(this.camYaw);
      let dx = -strafe * cos + forward * sin;
      let dz = strafe * sin + forward * cos;
      const len = Math.hypot(dx, dz) || 1;
      dx /= len;
      dz /= len;
      const speed = PLAYER_SPEED * (this.sprint ? 1.8 : 1) * dt;
      this.player.x = THREE.MathUtils.clamp(this.player.x + dx * speed, this.bounds.minX, this.bounds.maxX);
      this.player.z = THREE.MathUtils.clamp(this.player.z + dz * speed, this.bounds.minZ, this.bounds.maxZ);
      this.playerYaw = Math.atan2(dx, dz);
      // 走路时相机缓慢转到背后；拖动时不抢控制
      if (this.dragPointer === null) this.camYaw += angleDiff(this.playerYaw, this.camYaw) * Math.min(1, dt * 1.6);
    }
  }

  private animateAvatar(dt: number): void {
    this.avatarYaw += angleDiff(this.playerYaw, this.avatarYaw) * Math.min(1, dt * 10);
    this.root.rotation.y = this.avatarYaw;
    this.root.position.x += (this.player.x - this.root.position.x) * Math.min(1, dt * 16);
    this.root.position.z += (this.player.z - this.root.position.z) * Math.min(1, dt * 16);
    const walking = this.moving;
    if (walking) this.walkPhase += dt * (this.sprint ? 14 : 9);
    const rig = this.avatar.userData.rig as AvatarRig | undefined;
    this.root.position.y = this.player.y + (walking ? Math.abs(Math.sin(this.walkPhase)) * 0.05 : Math.sin(this.time * 1.4) * 0.01);
    if (!rig) return;
    const k = Math.min(1, dt * 9);
    if (walking) {
      const hip = this.sprint ? 0.9 : 0.58;
      const knee = this.sprint ? 1.3 : 0.9;
      const swL = Math.sin(this.walkPhase);
      const swR = Math.sin(this.walkPhase + Math.PI);
      rig.leftLeg.hip.rotation.x = swL * hip;
      rig.rightLeg.hip.rotation.x = swR * hip;
      rig.leftLeg.knee.rotation.x = 0.12 + Math.max(0, -swL) * knee;
      rig.rightLeg.knee.rotation.x = 0.12 + Math.max(0, -swR) * knee;
      rig.leftArm.rotation.x = -swL * 0.7;
      rig.rightArm.rotation.x = -swR * 0.7;
      rig.leftLeg.ankle.rotation.x = -(rig.leftLeg.hip.rotation.x + rig.leftLeg.knee.rotation.x) * 0.9;
      rig.rightLeg.ankle.rotation.x = -(rig.rightLeg.hip.rotation.x + rig.rightLeg.knee.rotation.x) * 0.9;
    } else {
      rig.leftLeg.hip.rotation.x *= 1 - k;
      rig.rightLeg.hip.rotation.x *= 1 - k;
      rig.leftLeg.knee.rotation.x += (0.06 - rig.leftLeg.knee.rotation.x) * k;
      rig.rightLeg.knee.rotation.x += (0.06 - rig.rightLeg.knee.rotation.x) * k;
      rig.leftArm.rotation.x *= 1 - k;
      rig.rightArm.rotation.x *= 1 - k;
      rig.leftLeg.ankle.rotation.x *= 1 - k;
      rig.rightLeg.ankle.rotation.x *= 1 - k;
      rig.head.rotation.z = Math.sin(this.time * 1.4) * 0.05;
    }
  }

  // ───────── 输入 ─────────

  private readonly onKeyDown = (e: KeyboardEvent): void => {
    if (!this.enabled || this.pov !== "you") return;
    const tag = (e.target as HTMLElement | null)?.tagName;
    if (tag === "INPUT" || tag === "TEXTAREA") return;
    const key = e.key.toLowerCase();
    if (["w", "a", "s", "d", "arrowup", "arrowdown", "arrowleft", "arrowright"].includes(key)) this.keys.add(key);
    if (key === "shift") this.sprint = true;
  };

  private readonly onKeyUp = (e: KeyboardEvent): void => {
    const key = e.key.toLowerCase();
    this.keys.delete(key);
    if (key === "shift") this.sprint = false;
  };

  private readonly onPointerDown = (e: PointerEvent): void => {
    if (this.dragPointer !== null || (e.pointerType === "mouse" && e.button !== 0)) return;
    if (this.pov !== "you" && this.pov !== "me") return;
    this.dragPointer = e.pointerId;
    this.lastX = e.clientX;
    this.lastY = e.clientY;
    try {
      this.canvas.setPointerCapture(e.pointerId);
    } catch {
      // 内嵌 WebView 可能不支持指针捕获
    }
  };

  private readonly onPointerMove = (e: PointerEvent): void => {
    if (e.pointerId !== this.dragPointer) return;
    const dx = e.clientX - this.lastX;
    const dy = e.clientY - this.lastY;
    this.lastX = e.clientX;
    this.lastY = e.clientY;
    if (this.pov === "you") {
      this.camYaw -= dx * 0.006;
      this.camPitch = THREE.MathUtils.clamp(this.camPitch + dy * 0.004, -0.15, 0.65);
    } else if (this.pov === "me") {
      this.lookYaw = THREE.MathUtils.clamp(this.lookYaw - dx * 0.004, -1.2, 1.2);
      this.lookPitch = THREE.MathUtils.clamp(this.lookPitch - dy * 0.003, -0.6, 0.6);
    }
  };

  private readonly onPointerEnd = (e: PointerEvent): void => {
    if (e.pointerId !== this.dragPointer) return;
    this.dragPointer = null;
  };

  dispose(): void {
    window.removeEventListener("keydown", this.onKeyDown);
    window.removeEventListener("keyup", this.onKeyUp);
    this.canvas.removeEventListener("pointerdown", this.onPointerDown);
    this.canvas.removeEventListener("pointermove", this.onPointerMove);
    this.canvas.removeEventListener("pointerup", this.onPointerEnd);
    this.canvas.removeEventListener("pointercancel", this.onPointerEnd);
    this.root.removeFromParent();
    const geos = new Set<THREE.BufferGeometry>();
    const mats = new Set<THREE.Material>();
    this.avatar.traverse((o) => {
      const mesh = o as THREE.Mesh;
      if (!mesh.isMesh) return;
      geos.add(mesh.geometry);
      mats.add(mesh.material as THREE.Material);
    });
    geos.forEach((g) => g.dispose());
    mats.forEach((m) => m.dispose());
  }
}
