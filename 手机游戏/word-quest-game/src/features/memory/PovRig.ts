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
/** 跟随镜头：在 2090 年的他身后很远、偏到肩后，让他只占画面一角，不挡住他身后的物件 */
const FOLLOW_DIST = 3.8;
const FOLLOW_HEIGHT = 1.72;
const FOLLOW_LOOK_HEIGHT = 1.2;
const EYE_HEIGHT = 1.6;
const BLEND_SECONDS = 1.3;
/** 2090 年的他保留清晰人形轮廓，再叠一层克制的冷色边缘光。 */
const OLD_SELF_OPACITY = 0.62;
const OLD_SELF_OPACITY_BEHIND = 0.2;
const TRAIL_COUNT = 56;

const _m = new THREE.Matrix4();
const _up = new THREE.Vector3(0, 1, 0);
const _euler = new THREE.Euler(0, 0, 0, "YXZ");

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

/**
 * 菲涅尔边缘光：中心几乎透明，轮廓一圈冷蓝光。注入在标准材质的 emissivemap_fragment 之后 / opaque_fragment 之前。
 * 先于 Materializer 的溶解补丁执行（applyRevealPatch 会先调用这里的 onBeforeCompile）。
 */
function patchShimmer(mat: THREE.MeshStandardMaterial): void {
  mat.onBeforeCompile = (shader) => {
    shader.fragmentShader = shader.fragmentShader
      .replace(
        "#include <emissivemap_fragment>",
        `#include <emissivemap_fragment>
        float avRim = pow(1.0 - clamp(dot(normalize(vViewPosition), normal), 0.0, 1.0), 2.2);
        totalEmissiveRadiance += vec3(0.22, 0.46, 0.82) * (0.035 + avRim * 0.72);`
      )
      .replace("#include <opaque_fragment>", `diffuseColor.a *= 0.98 + avRim * 0.04;\n#include <opaque_fragment>`);
  };
  mat.customProgramCacheKey = () => "old-self-shimmer-v3";
}

/**
 * 2090 年的他：探险者形体换成冷色、低不透明度的微光身影（不再是一个实心的蓝色人偶），
 * 去掉自带的点光源（动态光源数量不能变，否则全场景重编译），也不参与射线拾取。
 */
function createOldSelf(): THREE.Group {
  const avatar = createExplorerAvatar();
  avatar.name = "old-self";
  const cool = new THREE.Color(0xb5d2ff);
  const swapped = new Map<THREE.Material, THREE.Material>();
  const lights: THREE.Object3D[] = [];
  avatar.traverse((o) => {
    o.raycast = () => undefined; // 射线（以及基于场景图的任何拾取）一律穿过他
    if (o.userData.isFootRing || o.name === "ExplorerLantern") {
      lights.push(o);
      return;
    }
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
        const mat = new THREE.MeshStandardMaterial({
          color: base.lerp(cool, 0.6),
          roughness: 0.5,
          metalness: 0,
          vertexColors: s.vertexColors,
          map: s.map ?? null,
          emissive: 0x3f78d0,
          emissiveIntensity: 0.18,
          transparent: true,
          opacity: OLD_SELF_OPACITY,
          // Front faces write depth so the translucent outer volume hides
          // inner eye, shell and back-facing garment layers instead of reading
          // like stacked wire-frame pieces.
          depthWrite: true,
          side: THREE.FrontSide,
        });
        patchShimmer(mat);
        mat.userData.shimmer = true;
        dst = mat;
      }
      swapped.set(src, dst);
    }
    mesh.material = dst;
    mesh.castShadow = false;
    mesh.receiveShadow = false;
  });
  for (const l of lights) l.removeFromParent();
  return avatar;
}

let dotTexture: THREE.Texture | null = null;
function softDot(): THREE.Texture {
  if (dotTexture) return dotTexture;
  const c = document.createElement("canvas");
  c.width = c.height = 32;
  const g = c.getContext("2d");
  if (g) {
    const grad = g.createRadialGradient(16, 16, 0, 16, 16, 16);
    grad.addColorStop(0, "rgba(255,255,255,1)");
    grad.addColorStop(0.4, "rgba(255,255,255,0.35)");
    grad.addColorStop(1, "rgba(255,255,255,0)");
    g.fillStyle = grad;
    g.fillRect(0, 0, 32, 32);
  }
  dotTexture = new THREE.CanvasTexture(c);
  return dotTexture;
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
  /** 他身后飘散的光尘（世界坐标，需要加进场景，不放在 root 里） */
  readonly trail: THREE.Points;
  readonly player = new THREE.Vector3();
  pov: Pov = "you";

  private readonly camera: THREE.PerspectiveCamera;
  private readonly canvas: HTMLElement;
  private readonly cinema: CinemaDirector;
  private bounds: StageBounds;
  private cameraBounds: StageBounds | null = null;
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
  private eyePitch = 0;
  private lookYaw = 0;
  private lookPitch = 0;
  /** 第一人称 “低头看桌面”：目标值与当前值（弧度，向下为正） */
  private lookDownGoal = 0;
  private lookDownAmt = 0;
  /** 第一人称相机的平滑状态 */
  private meInit = false;
  private meYaw = 0;
  private mePitch = 0;
  private readonly mePos = new THREE.Vector3();
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
  /** 点地面 / 自动走位的目的地（世界坐标，y 忽略）；有手动输入就取消 */
  private dest: THREE.Vector3 | null = null;
  private destSpeed = PLAYER_SPEED;
  /** 跟随镜头的当前值与目标值（框住触碰目标时临时拉近 / 抬高，之后恢复） */
  private followDist = FOLLOW_DIST;
  private followHeight = FOLLOW_HEIGHT;
  private followDistGoal = FOLLOW_DIST;
  private followHeightGoal = FOLLOW_HEIGHT;
  private focus: THREE.Vector3 | null = null;
  private focusAmt = 0;
  /** 当前可点的物件位置（用来判断他有没有挡住它们） */
  private targetsProvider: (() => THREE.Vector3[]) | null = null;
  private avatarMeshes: THREE.Mesh[] = [];
  private avatarOpacity = OLD_SELF_OPACITY;
  private readonly trailPos: Float32Array;
  private readonly trailVel: Float32Array;
  private readonly trailLife: Float32Array;
  private readonly trailMax: Float32Array;
  private readonly trailCol: Float32Array;
  private trailCursor = 0;
  private trailAcc = 0;
  private readonly tmpA = new THREE.Vector3();
  private readonly tmpB = new THREE.Vector3();
  private readonly tmpC = new THREE.Vector3();

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
    this.avatar.traverse((o) => {
      if ((o as THREE.Mesh).isMesh) this.avatarMeshes.push(o as THREE.Mesh);
    });
    this.trailPos = new Float32Array(TRAIL_COUNT * 3);
    this.trailVel = new Float32Array(TRAIL_COUNT * 3);
    this.trailLife = new Float32Array(TRAIL_COUNT);
    this.trailMax = new Float32Array(TRAIL_COUNT).fill(1);
    this.trailCol = new Float32Array(TRAIL_COUNT * 3);
    const trailGeo = new THREE.BufferGeometry();
    trailGeo.setAttribute("position", new THREE.BufferAttribute(this.trailPos, 3).setUsage(THREE.DynamicDrawUsage));
    trailGeo.setAttribute("color", new THREE.BufferAttribute(this.trailCol, 3).setUsage(THREE.DynamicDrawUsage));
    this.trail = new THREE.Points(
      trailGeo,
      new THREE.PointsMaterial({ size: 0.075, map: softDot(), vertexColors: true, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, sizeAttenuation: true })
    );
    this.trail.frustumCulled = false;
    this.trail.name = "old-self-trail";
    this.trail.raycast = () => undefined;
    this.trail.visible = false;
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
      this.dest = null;
      this.keys.clear();
      this.stick.x = this.stick.z = 0;
    }
  }

  /** 开场占位等舞台不显示 2090 年的他 */
  setAvatarHidden(hidden: boolean): void {
    this.avatarHidden = hidden;
    this.root.visible = !hidden && this.pov !== "me";
  }

  /** 换舞台时更新可走范围；cameraBounds 是跟随镜头允许到达的范围（缺省为可走范围外扩 0.3 m） */
  setBounds(bounds: StageBounds, cameraBounds?: StageBounds): void {
    this.bounds = bounds;
    this.cameraBounds = cameraBounds ?? null;
  }

  /**
   * 走到 (x, z)（会夹进可走范围）。点地面 = click-to-move；也用于触碰阶段把 2090 年的他带到一个好位置。
   * 按 WASD / 摇杆会立刻取消。speed 缺省为正常步速
   */
  moveTo(x: number, z: number, speed = PLAYER_SPEED): void {
    this.dest = new THREE.Vector3(THREE.MathUtils.clamp(x, this.bounds.minX, this.bounds.maxX), 0, THREE.MathUtils.clamp(z, this.bounds.minZ, this.bounds.maxZ));
    this.destSpeed = speed;
  }

  cancelMove(): void {
    this.dest = null;
  }

  get walkingToDest(): boolean {
    return this.dest !== null;
  }

  /**
   * 框住一组目标：跟随镜头平滑地拉近 / 抬高，并把视线移向 focus（目标群的中心）。
   * 镜头到位后仍是 “你” 的视角，玩家照常可以走动、拖动（releaseFraming 之后恢复默认的肩后机位）。
   */
  frameFocus(focus: THREE.Vector3, dist: number, height: number): void {
    this.focus = focus.clone();
    this.followDistGoal = dist;
    this.followHeightGoal = height;
  }

  releaseFraming(): void {
    this.focus = null;
    this.followDistGoal = FOLLOW_DIST;
    this.followHeightGoal = FOLLOW_HEIGHT;
  }

  /** 提供当前可点物件的位置：它们被他挡在后面时，他会进一步淡出 */
  setTargetsProvider(fn: (() => THREE.Vector3[]) | null): void {
    this.targetsProvider = fn;
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

  /** 入场用：把相机直接放在 pos 朝 look（不做混合），之后再 setPov("watch") 让运镜从这里起步 */
  placeCamera(pos: THREE.Vector3, look: THREE.Vector3, fov: number): void {
    this.camera.position.copy(pos);
    lookQuat(pos, look, this.camera.quaternion);
    this.camera.fov = fov;
    this.camera.updateProjectionMatrix();
    this.camera.updateMatrixWorld(true);
  }

  /** 丢弃进行中的视角混合（入场 / 眨眼切镜时，相机已经被直接放好） */
  cancelBlend(): void {
    this.blend = null;
  }

  setStick(x: number, z: number): void {
    this.stick.x = x;
    this.stick.z = z;
  }

  /** 第一人称的眼睛位置与朝向（年轻的“我”的头部）；缺省用玩家出生点 */
  setEyeAnchor(pos: THREE.Vector3 | null, yaw = 0, pitch = 0): void {
    this.eyeAnchor = pos ? pos.clone() : null;
    this.eyeYaw = yaw;
    this.eyePitch = pitch;
    this.lookYaw = 0;
    this.lookPitch = 0;
  }

  /** 第一人称低头（看讲义 / 笔记本）或抬头（看老师）：amount 是向下的俯角（弧度），平滑过渡 */
  setLookDown(amount: number): void {
    this.lookDownGoal = THREE.MathUtils.clamp(amount, 0, 1.2);
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
      this.meInit = false;
    }
    this.pov = pov;
    this.root.visible = pov !== "me" && !this.avatarHidden;
    this.keys.clear();
    if (pov !== "you") this.dest = null;
  }

  // ───────── 每帧 ─────────

  update(dt: number): void {
    this.time += dt;
    if (this.pov === "you") this.updatePlayer(dt);
    else this.moving = false;
    this.animateAvatar(dt);
    // 跟随镜头的距离 / 高度 / 视线焦点平滑过渡
    const fk = 1 - Math.exp(-dt * 2.2);
    this.lookDownAmt += (this.lookDownGoal - this.lookDownAmt) * (1 - Math.exp(-dt * 3.2));
    this.followDist += (this.followDistGoal - this.followDist) * fk;
    this.followHeight += (this.followHeightGoal - this.followHeight) * fk;
    this.focusAmt += ((this.focus ? 1 : 0) - this.focusAmt) * fk;
    if (this.focus && this.pov === "you" && this.dragPointer === null) {
      const want = Math.atan2(this.focus.x - this.player.x, this.focus.z - this.player.z);
      this.camYaw += angleDiff(want, this.camYaw) * Math.min(1, dt * 2.4);
    }

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
    // 相机姿态定下来之后再算 “他有没有挡住物件”（用本帧的相机矩阵投影）
    this.camera.updateMatrixWorld(true);
    this.updateShimmer(dt);
  }

  /** 按当前 POV 算出相机目标姿态 */
  private computeTarget(dt: number): void {
    switch (this.pov) {
      case "you": {
        const sin = Math.sin(this.camYaw);
        const cos = Math.cos(this.camYaw);
        const pitchLift = Math.sin(this.camPitch) * 1.4;
        // 偏到肩后：相机与注视点一起沿右手方向平移，他就出现在画面一侧（竖屏更靠边一点点）
        const aspect = this.camera.aspect || 1.6;
        const half = Math.tan(THREE.MathUtils.degToRad(this.baseFov) / 2) * aspect * this.followDist;
        const side = THREE.MathUtils.clamp(half * (aspect < 1 ? 0.42 : 0.58), 0.5, 3.0) * (1 - this.focusAmt * 0.85);
        const rx = -cos;
        const rz = sin;
        const desired = this.pose.set(this.player.x - sin * this.followDist + rx * side, this.player.y + this.followHeight + pitchLift, this.player.z - cos * this.followDist + rz * side);
        // 相机不能穿墙：限制在舞台给的相机范围内（缺省为可走范围略外一圈）
        const cb = this.cameraBounds;
        const m = 0.3;
        desired.x = THREE.MathUtils.clamp(desired.x, cb ? cb.minX : this.bounds.minX - m, cb ? cb.maxX : this.bounds.maxX + m);
        desired.z = THREE.MathUtils.clamp(desired.z, cb ? cb.minZ : this.bounds.minZ - m, cb ? cb.maxZ : this.bounds.maxZ + m);
        if (!this.followInit) {
          this.followPos.copy(desired);
          this.followInit = true;
        } else {
          this.followPos.lerp(desired, 1 - Math.exp(-6 * dt));
        }
        this.targetPos.copy(this.followPos);
        this.poseLook.set(this.player.x + rx * side, this.player.y + FOLLOW_LOOK_HEIGHT, this.player.z + rz * side);
        if (this.focus && this.focusAmt > 0.001) this.poseLook.lerp(this.focus, this.focusAmt);
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
        const t = this.time;
        // 呼吸 + 极缓的头部自然晃动（两个不成比例的频率叠加，看不出周期）
        const dx = Math.sin(t * 0.6) * 0.006;
        const dy = Math.sin(t * 1.7) * 0.012 + Math.sin(t * 0.43 + 0.5) * 0.004;
        const yawN = Math.sin(t * 0.23) * 0.0045 + Math.sin(t * 0.57 + 1.2) * 0.002;
        const pitchN = Math.sin(t * 0.31 + 0.4) * 0.003 + Math.sin(t * 1.7 + 0.8) * 0.004;
        const wantYaw = this.eyeYaw + this.lookYaw + yawN + Math.PI;
        const wantPitch = this.eyePitch + this.lookPitch - this.lookDownAmt + pitchN;
        if (!this.meInit) {
          this.mePos.set(eye.x + dx, eye.y + dy, eye.z);
          this.meYaw = wantYaw;
          this.mePitch = wantPitch;
          this.meInit = true;
        } else {
          // 眼睛位置 / 朝向变化（换人借眼、环顾、低头）都经过临界阻尼，不会瞬移
          const k = 1 - Math.exp(-dt * 6.5);
          this.mePos.x += (eye.x + dx - this.mePos.x) * k;
          this.mePos.y += (eye.y + dy - this.mePos.y) * k;
          this.mePos.z += (eye.z - this.mePos.z) * k;
          this.meYaw += angleDiff(wantYaw, this.meYaw) * k;
          this.mePitch += (wantPitch - this.mePitch) * k;
        }
        this.targetPos.copy(this.mePos);
        _euler.set(this.mePitch, this.meYaw, 0, "YXZ");
        this.targetQuat.setFromEuler(_euler);
        this.targetFov = this.baseFov + 2;
        break;
      }
      default:
        break;
    }
  }

  /**
   * 微光身影：不透明度随 “有没有挡住可点物件” 平滑变化；身后飘散光尘。
   * 材质在 Materializer 注册时已被克隆，所以每次都从网格上取当前材质。
   */
  private updateShimmer(dt: number): void {
    let behind = false;
    if (this.pov === "you" && this.targetsProvider && !this.avatarHidden) {
      const cam = this.camera;
      const feet = this.tmpA.set(this.root.position.x, this.root.position.y, this.root.position.z);
      const dAvatar = feet.distanceTo(cam.position);
      const bottom = this.tmpB.copy(feet).project(cam);
      const top = this.tmpC.set(feet.x, feet.y + 1.9, feet.z).project(cam);
      const halfW = (0.55 / Math.max(0.5, dAvatar)) / (Math.tan(THREE.MathUtils.degToRad(cam.fov) / 2) * (cam.aspect || 1));
      const cx = (bottom.x + top.x) / 2;
      for (const p of this.targetsProvider()) {
        const d = p.distanceTo(cam.position);
        if (d < dAvatar - 0.15) continue; // 物件在他前面，没被挡
        const q = this.tmpA.copy(p).project(cam);
        if (Math.abs(q.x - cx) < halfW + 0.07 && q.y > Math.min(bottom.y, top.y) - 0.12 && q.y < Math.max(bottom.y, top.y) + 0.12) {
          behind = true;
          break;
        }
      }
    }
    const goal = behind ? OLD_SELF_OPACITY_BEHIND : OLD_SELF_OPACITY;
    this.avatarOpacity += (goal - this.avatarOpacity) * (1 - Math.exp(-dt * 7));
    for (const mesh of this.avatarMeshes) {
      const m = mesh.material as THREE.Material;
      // Materializer 注册时克隆了材质，userData 随克隆保留
      if (m.userData.shimmer) m.opacity = this.avatarOpacity;
    }

    // 光尘：静止时缓缓从身上升起，走动时在身后拖出一小段
    const showTrail = this.root.visible && this.avatar.visible && this.pov !== "paper";
    this.trail.visible = showTrail;
    const fadeK = this.avatarOpacity / OLD_SELF_OPACITY;
    if (showTrail) {
      this.trailAcc += dt * (this.moving ? 30 : 7);
      while (this.trailAcc >= 1) {
        this.trailAcc -= 1;
        const i = this.trailCursor;
        this.trailCursor = (this.trailCursor + 1) % TRAIL_COUNT;
        const a = Math.random() * Math.PI * 2;
        const r = Math.random() * 0.2;
        this.trailPos[i * 3] = this.root.position.x + Math.cos(a) * r;
        this.trailPos[i * 3 + 1] = this.root.position.y + 0.15 + Math.random() * 1.5;
        this.trailPos[i * 3 + 2] = this.root.position.z + Math.sin(a) * r;
        const back = this.moving ? -0.5 : 0;
        this.trailVel[i * 3] = Math.sin(this.avatarYaw) * back + (Math.random() - 0.5) * 0.12;
        this.trailVel[i * 3 + 1] = 0.12 + Math.random() * 0.22;
        this.trailVel[i * 3 + 2] = Math.cos(this.avatarYaw) * back + (Math.random() - 0.5) * 0.12;
        this.trailMax[i] = 1.3 + Math.random() * 1.3;
        this.trailLife[i] = this.trailMax[i];
      }
    }
    for (let i = 0; i < TRAIL_COUNT; i++) {
      if (this.trailLife[i] <= 0) {
        this.trailCol[i * 3] = this.trailCol[i * 3 + 1] = this.trailCol[i * 3 + 2] = 0;
        continue;
      }
      this.trailLife[i] -= dt;
      this.trailPos[i * 3] += this.trailVel[i * 3] * dt;
      this.trailPos[i * 3 + 1] += this.trailVel[i * 3 + 1] * dt;
      this.trailPos[i * 3 + 2] += this.trailVel[i * 3 + 2] * dt;
      const k = Math.max(0, this.trailLife[i] / this.trailMax[i]);
      const a = Math.sin(k * Math.PI) * 0.8 * fadeK;
      this.trailCol[i * 3] = 0.42 * a;
      this.trailCol[i * 3 + 1] = 0.7 * a;
      this.trailCol[i * 3 + 2] = 1.0 * a;
    }
    (this.trail.geometry.getAttribute("position") as THREE.BufferAttribute).needsUpdate = true;
    (this.trail.geometry.getAttribute("color") as THREE.BufferAttribute).needsUpdate = true;
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
    const manual = forward !== 0 || strafe !== 0;
    if (manual) this.dest = null; // 手动输入优先
    let dx = 0;
    let dz = 0;
    let stepSpeed = PLAYER_SPEED * (this.sprint ? 1.8 : 1);
    if (manual) {
      const sin = Math.sin(this.camYaw);
      const cos = Math.cos(this.camYaw);
      dx = -strafe * cos + forward * sin;
      dz = strafe * sin + forward * cos;
    } else if (this.dest) {
      const ddx = this.dest.x - this.player.x;
      const ddz = this.dest.z - this.player.z;
      const dd = Math.hypot(ddx, ddz);
      if (dd < 0.12) this.dest = null;
      else {
        dx = ddx;
        dz = ddz;
        stepSpeed = Math.min(this.destSpeed, dd * 4 + 0.4); // 临近目的地减速
      }
    }
    this.moving = dx !== 0 || dz !== 0;
    if (this.moving) {
      const len = Math.hypot(dx, dz) || 1;
      dx /= len;
      dz /= len;
      const speed = stepSpeed * dt;
      this.player.x = THREE.MathUtils.clamp(this.player.x + dx * speed, this.bounds.minX, this.bounds.maxX);
      this.player.z = THREE.MathUtils.clamp(this.player.z + dz * speed, this.bounds.minZ, this.bounds.maxZ);
      this.playerYaw = Math.atan2(dx, dz);
      // 走路时相机缓慢转到背后；拖动时不抢控制
      if (this.dragPointer === null && this.focusAmt < 0.5) this.camYaw += angleDiff(this.playerYaw, this.camYaw) * Math.min(1, dt * 1.6);
    }
  }

  private animateAvatar(dt: number): void {
    this.avatarYaw += angleDiff(this.playerYaw, this.avatarYaw) * Math.min(1, dt * 10);
    this.root.rotation.y = this.avatarYaw;
    this.root.position.x += (this.player.x - this.root.position.x) * Math.min(1, dt * 16);
    this.root.position.z += (this.player.z - this.root.position.z) * Math.min(1, dt * 16);
    const walking = this.moving;
    if (walking) this.walkPhase += dt * (this.sprint ? 11.5 : 8.2);
    const rig = this.avatar.userData.rig as AvatarRig | undefined;
    this.root.position.y = this.player.y;
    if (!rig) return;
    const breath = Math.sin(this.time * 1.65) * 0.008;
    rig.spine.position.y = 0.98 + (walking ? Math.abs(Math.sin(this.walkPhase * 2)) * 0.012 : breath);
    rig.spine.rotation.x = walking ? 0.045 + Math.sin(this.walkPhase) * 0.016 : breath * 0.7;
    rig.spine.rotation.y = Math.sin(this.time * 0.48) * (walking ? 0.014 : 0.009);
    rig.spine.rotation.z = walking ? Math.sin(this.walkPhase) * 0.022 : Math.sin(this.time * 0.72) * 0.009;
    const k = Math.min(1, dt * 8);
    if (walking) {
      const hip = this.sprint ? 0.72 : 0.46;
      const knee = this.sprint ? 1.0 : 0.7;
      const swL = Math.sin(this.walkPhase);
      const swR = Math.sin(this.walkPhase + Math.PI);
      rig.leftLeg.hip.rotation.x = swL * hip;
      rig.rightLeg.hip.rotation.x = swR * hip;
      rig.leftLeg.knee.rotation.x = 0.12 + Math.max(0, -swL) * knee;
      rig.rightLeg.knee.rotation.x = 0.12 + Math.max(0, -swR) * knee;
      rig.leftArm.rotation.x = -swL * 0.56;
      rig.rightArm.rotation.x = -swR * 0.56;
      (rig.leftArm.userData.elbow as THREE.Group).rotation.x = -0.22 - Math.max(0, swL) * 0.36;
      (rig.rightArm.userData.elbow as THREE.Group).rotation.x = -0.22 - Math.max(0, swR) * 0.36;
      rig.leftLeg.ankle.rotation.x = -(rig.leftLeg.hip.rotation.x + rig.leftLeg.knee.rotation.x) * 0.9;
      rig.rightLeg.ankle.rotation.x = -(rig.rightLeg.hip.rotation.x + rig.rightLeg.knee.rotation.x) * 0.9;
      rig.head.rotation.x = -0.015 + Math.sin(this.walkPhase * 2) * 0.012;
    } else {
      rig.leftLeg.hip.rotation.x *= 1 - k;
      rig.rightLeg.hip.rotation.x *= 1 - k;
      rig.leftLeg.knee.rotation.x += (0.06 - rig.leftLeg.knee.rotation.x) * k;
      rig.rightLeg.knee.rotation.x += (0.06 - rig.rightLeg.knee.rotation.x) * k;
      rig.leftArm.rotation.x += (Math.sin(this.time * 0.7) * 0.02 - rig.leftArm.rotation.x) * k;
      rig.rightArm.rotation.x += (Math.sin(this.time * 0.7 + Math.PI) * 0.02 - rig.rightArm.rotation.x) * k;
      (rig.leftArm.userData.elbow as THREE.Group).rotation.x += (-0.22 - (rig.leftArm.userData.elbow as THREE.Group).rotation.x) * k;
      (rig.rightArm.userData.elbow as THREE.Group).rotation.x += (-0.22 - (rig.rightArm.userData.elbow as THREE.Group).rotation.x) * k;
      rig.leftLeg.ankle.rotation.x *= 1 - k;
      rig.rightLeg.ankle.rotation.x *= 1 - k;
      rig.head.rotation.x = -0.015 + Math.sin(this.time * 0.9) * 0.012;
    }
    rig.head.rotation.y = Math.sin(this.time * 0.36) * 0.026;
    rig.head.rotation.z = Math.sin(this.time * 0.66) * 0.018;
    rig.gazeL.position.x = Math.sin(this.time * 0.29) * 0.002;
    rig.gazeR.position.x = rig.gazeL.position.x;
    rig.gazeL.position.y = rig.gazeR.position.y = Math.sin(this.time * 0.21) * 0.001;
    const blinkPhase = THREE.MathUtils.euclideanModulo(this.time + 0.83, 4.5);
    const blink = blinkPhase < 0.14 ? Math.sin((blinkPhase / 0.14) * Math.PI) : 0;
    rig.eyeL.scale.y = 0.94 * (1 - blink * 0.9);
    rig.eyeR.scale.y = 0.94 * (1 - blink * 0.9);
    rig.cape.rotation.x += ((walking ? 0.27 + Math.abs(Math.sin(this.walkPhase)) * 0.18 : 0.16) - rig.cape.rotation.x) * k;
    rig.cape.rotation.z += ((walking ? Math.sin(this.walkPhase * 0.5) * 0.06 : Math.sin(this.time * 0.72) * 0.025) - rig.cape.rotation.z) * k;
    this.avatar.userData.updateHumanVisual?.();
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
    this.trail.removeFromParent();
    this.trail.geometry.dispose();
    (this.trail.material as THREE.Material).dispose();
    const geos = new Set<THREE.BufferGeometry>();
    const skeletons = new Set<THREE.Skeleton>();
    const mats = new Set<THREE.Material>();
    this.avatar.traverse((o) => {
      const mesh = o as THREE.Mesh;
      if (!mesh.isMesh) return;
      geos.add(mesh.geometry);
      if ((mesh as THREE.SkinnedMesh).isSkinnedMesh) skeletons.add((mesh as THREE.SkinnedMesh).skeleton);
      mats.add(mesh.material as THREE.Material);
    });
    geos.forEach((g) => g.dispose());
    skeletons.forEach((skeleton) => skeleton.dispose());
    mats.forEach((m) => m.dispose());
  }
}
