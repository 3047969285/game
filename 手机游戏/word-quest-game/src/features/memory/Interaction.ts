import * as THREE from "three";
import type { Materializer } from "./Materializer";

/**
 * 触碰：鼠标点 / 触屏轻点；you 模式下走到 1.7 m 内按 E。
 *
 * 拾取是屏幕空间的：把每个目标的中心投影到屏幕上，取离点击位置最近、且在拾取半径内的那个
 * （半径 = max(36 px, 目标投影半径)）。远处只有几个像素大的幽灵物件也能点中，不要求精确命中网格。
 * 点空了（没有目标，或根本没有启用）交给 onMiss（MemoryStage 用它做 “点地面走过去”）。
 *
 * 目标持续有微弱的边缘光脉冲，悬停时更亮。词签：只有悬停 / 离屏幕中心（或鼠标）最近的那个目标显示完整词签
 * （词 + 音标），其余是一个小圆点；词卡打开时所有词签隐藏。屏幕外的目标在屏幕边缘有一个指向它的小箭头。
 */

export interface InteractTarget {
  id: string;
  object: THREE.Object3D;
  label?: { word: string; phonetic?: string };
}

export interface InteractionOptions {
  camera: THREE.PerspectiveCamera;
  canvas: HTMLElement;
  labelLayer: HTMLElement;
  materializer: Materializer;
  /** 玩家位置（you 模式下用于按 E）；没有则用相机位置 */
  getPlayer?: () => THREE.Vector3 | null;
}

interface Entry {
  target: InteractTarget;
  center0: THREE.Vector3;
  objPos0: THREE.Vector3;
  /** 命中体中心（世界坐标，随物件移动） */
  center: THREE.Vector3;
  radius: number;
  tag?: HTMLElement;
  edge?: HTMLElement;
}

/** 屏幕空间拾取半径（像素） */
export const PICK_RADIUS_PX = 36;
const E_RANGE = 1.7;
const TAP_MOVE = 10;
const TAP_MS = 650;

export interface ScreenProjection {
  x: number;
  y: number;
  /** 在相机后面 */
  behind: boolean;
}

/** 世界点 → 画布像素（原点在画布左上）。behind=true 时 x / y 是镜像后的（用于屏幕边缘指示） */
export function projectToPixels(p: THREE.Vector3, camera: THREE.Camera, width: number, height: number, out: ScreenProjection = { x: 0, y: 0, behind: false }, tmp = new THREE.Vector3()): ScreenProjection {
  tmp.copy(p).project(camera);
  const behind = tmp.z > 1 || tmp.z < -1;
  const nx = behind ? -tmp.x : tmp.x;
  const ny = behind ? -tmp.y : tmp.y;
  out.x = (nx * 0.5 + 0.5) * width;
  out.y = (-ny * 0.5 + 0.5) * height;
  out.behind = behind;
  return out;
}

/** 在一组屏幕点里挑离 (px, py) 最近、且落在各自拾取半径内的那个；返回下标或 -1（纯函数，便于测试） */
export function pickNearest(points: Array<{ x: number; y: number; radiusPx: number; behind?: boolean }>, px: number, py: number, minRadius = PICK_RADIUS_PX): number {
  let best = -1;
  let bestScore = Infinity;
  points.forEach((p, i) => {
    if (p.behind) return;
    const d = Math.hypot(p.x - px, p.y - py);
    const limit = Math.max(minRadius, p.radiusPx);
    if (d > limit) return;
    const score = d / limit;
    if (score < bestScore) {
      best = i;
      bestScore = score;
    }
  });
  return best;
}

export class Interaction {
  private readonly o: InteractionOptions;
  private entries: Entry[] = [];
  private onHit: ((id: string) => void) | null = null;
  /** 点空了（没点中任何目标，或没有启用）的回调，参数是 client 坐标 */
  onMiss?: (clientX: number, clientY: number) => void;
  private showLabels = true;
  private alwaysLabels = false;
  private edgeHints = true;
  private suppressed = false;
  private baseGlow = 0.35;
  private hoverId: string | null = null;
  private pointer: { x: number; y: number } | null = null;
  private down: { id: number; x: number; y: number; t: number } | null = null;
  private readonly tmp = new THREE.Vector3();

  constructor(opts: InteractionOptions) {
    this.o = opts;
    opts.canvas.addEventListener("pointerdown", this.onPointerDown);
    opts.canvas.addEventListener("pointerup", this.onPointerUp);
    opts.canvas.addEventListener("pointermove", this.onPointerMove);
    window.addEventListener("keydown", this.onKeyDown);
  }

  get active(): boolean {
    return this.onHit !== null;
  }

  /** 启用一组可触碰的目标。再次调用会替换上一组 */
  enable(targets: InteractTarget[], onHit: (id: string) => void, opts: { labels?: boolean; baseGlow?: number; alwaysLabels?: boolean; edgeHints?: boolean } = {}): void {
    this.disable();
    this.onHit = onHit;
    this.showLabels = opts.labels ?? true;
    this.alwaysLabels = opts.alwaysLabels ?? false;
    this.edgeHints = opts.edgeHints ?? true;
    this.baseGlow = opts.baseGlow ?? 0.35;
    for (const target of targets) this.add(target);
  }

  /** 词卡打开时隐藏全部词签（词签与词卡不能叠在一起） */
  setSuppressed(on: boolean): void {
    this.suppressed = on;
  }

  /** 追加一个目标（不影响已有的） */
  add(target: InteractTarget): void {
    const box = new THREE.Box3().setFromObject(target.object);
    const sphere = box.getBoundingSphere(new THREE.Sphere());
    const radius = Math.max(0.2, sphere.radius);
    const entry: Entry = { target, center0: sphere.center.clone(), objPos0: target.object.position.clone(), center: sphere.center.clone(), radius };
    if (target.label && this.showLabels) {
      const tag = document.createElement("div");
      tag.className = "mem-tag";
      const w = document.createElement("strong");
      w.textContent = target.label.word;
      tag.appendChild(w);
      if (target.label.phonetic) {
        const ph = document.createElement("small");
        ph.textContent = target.label.phonetic;
        tag.appendChild(ph);
      }
      this.o.labelLayer.appendChild(tag);
      entry.tag = tag;
    }
    if (this.edgeHints) {
      const edge = document.createElement("div");
      edge.className = "mem-edge";
      this.o.labelLayer.appendChild(edge);
      entry.edge = edge;
    }
    this.entries.push(entry);
  }

  /** 当前可点目标的世界位置（PovRig 用它判断 “这个物件是不是被 2090 年的他挡住了”） */
  activePositions(out: THREE.Vector3[] = []): THREE.Vector3[] {
    out.length = 0;
    for (const e of this.entries) if (e.target.object.visible) out.push(e.center);
    return out;
  }

  /** 移除单个目标（已触碰 / 已排除） */
  remove(id: string): void {
    const i = this.entries.findIndex((e) => e.target.id === id);
    if (i < 0) return;
    this.release(this.entries[i]);
    this.entries.splice(i, 1);
    if (this.hoverId === id) this.hoverId = null;
  }

  disable(): void {
    for (const e of this.entries) this.release(e);
    this.entries = [];
    this.onHit = null;
    this.hoverId = null;
  }

  private release(e: Entry): void {
    this.o.materializer.setPulse(e.target.object, 0);
    e.tag?.remove();
    e.edge?.remove();
  }

  /** 画布像素 → 离它最近的目标（屏幕空间拾取） */
  private pick(clientX: number, clientY: number): Entry | null {
    const rect = this.o.canvas.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return null;
    const live = this.entries.filter((e) => e.target.object.visible);
    const points = live.map((e) => {
      const p = projectToPixels(e.center, this.o.camera, rect.width, rect.height, { x: 0, y: 0, behind: false }, this.tmp);
      // 投影半径：世界半径 / (距离 · tan(fov/2)) · 半屏高
      const dist = Math.max(0.3, e.center.distanceTo(this.o.camera.position));
      const radiusPx = (e.radius / (dist * Math.tan(THREE.MathUtils.degToRad(this.o.camera.fov) / 2))) * (rect.height / 2);
      return { x: p.x, y: p.y, radiusPx, behind: p.behind };
    });
    const i = pickNearest(points, clientX - rect.left, clientY - rect.top);
    return i >= 0 ? live[i] : null;
  }

  private readonly onPointerDown = (e: PointerEvent): void => {
    this.down = { id: e.pointerId, x: e.clientX, y: e.clientY, t: performance.now() };
  };

  private readonly onPointerUp = (e: PointerEvent): void => {
    const d = this.down;
    this.down = null;
    if (!d || d.id !== e.pointerId) return;
    if (Math.hypot(e.clientX - d.x, e.clientY - d.y) > TAP_MOVE || performance.now() - d.t > TAP_MS) return;
    const hit = this.onHit ? this.pick(e.clientX, e.clientY) : null;
    if (hit && this.onHit) this.onHit(hit.target.id);
    else this.onMiss?.(e.clientX, e.clientY);
  };

  private readonly onPointerMove = (e: PointerEvent): void => {
    if (e.pointerType !== "mouse") return;
    this.pointer = { x: e.clientX, y: e.clientY };
    if (!this.onHit) return;
    this.hoverId = this.pick(e.clientX, e.clientY)?.target.id ?? null;
    this.o.canvas.style.cursor = this.hoverId ? "pointer" : "";
  };

  private readonly onKeyDown = (e: KeyboardEvent): void => {
    if (!this.onHit || e.key.toLowerCase() !== "e") return;
    const p = this.o.getPlayer?.();
    if (!p) return;
    let best: Entry | null = null;
    let bestD = E_RANGE;
    for (const en of this.entries) {
      if (!en.target.object.visible) continue;
      const d = Math.hypot(en.center.x - p.x, en.center.z - p.z);
      if (d < bestD) {
        best = en;
        bestD = d;
      }
    }
    if (best) this.onHit(best.target.id);
  };

  /** 逐帧：命中体跟随物件、脉冲、词签 / 小圆点 / 屏幕边缘箭头 */
  update(): void {
    if (this.entries.length === 0) return;
    const cam = this.o.camera;
    const rect = this.o.canvas.getBoundingClientRect();
    const w = rect.width;
    const h = rect.height;
    // 词签的 “焦点”：悬停的目标；没有悬停就取离鼠标（触屏则屏幕中心）最近的在屏目标
    const fx = this.pointer ? this.pointer.x - rect.left : w / 2;
    const fy = this.pointer ? this.pointer.y - rect.top : h / 2;
    let focusId: string | null = this.hoverId;
    let bestD = Infinity;
    const onScreen = new Map<Entry, ScreenProjection>();
    for (const e of this.entries) {
      const obj = e.target.object;
      e.center.copy(e.center0).add(obj.position).sub(e.objPos0);
      this.o.materializer.setPulse(obj, e.target.id === this.hoverId ? 1.15 : this.baseGlow);
      const p = projectToPixels(e.center, cam, w, h, { x: 0, y: 0, behind: false }, this.tmp);
      onScreen.set(e, p);
      const inFrame = !p.behind && p.x > 0 && p.x < w && p.y > 0 && p.y < h;
      if (inFrame && obj.visible && !this.hoverId) {
        const d = Math.hypot(p.x - fx, p.y - fy);
        if (d < bestD) {
          bestD = d;
          focusId = e.target.id;
        }
      }
    }
    if (this.alwaysLabels && !this.hoverId) focusId = null; // 断片：候选的词签全部完整显示

    for (const e of this.entries) {
      const p = onScreen.get(e)!;
      const obj = e.target.object;
      const inFrame = !p.behind && p.x > 0 && p.x < w && p.y > 0 && p.y < h;
      // 词签
      if (e.tag) {
        if (this.suppressed || !obj.visible || !inFrame) {
          e.tag.classList.remove("on");
        } else {
          const full = this.alwaysLabels || e.target.id === focusId;
          e.tag.classList.toggle("dot", !full);
          const lift = Math.max(10, (e.radius / (Math.max(0.3, e.center.distanceTo(cam.position)) * Math.tan(THREE.MathUtils.degToRad(cam.fov) / 2))) * (h / 2));
          e.tag.style.transform = `translate(${p.x.toFixed(1)}px, ${(p.y - lift - 4).toFixed(1)}px) translate(-50%, -100%)`;
          e.tag.classList.add("on");
        }
      }
      // 屏幕边缘箭头
      if (e.edge) {
        if (!obj.visible || inFrame) {
          e.edge.classList.remove("on");
        } else {
          const cx = w / 2;
          const cy = h / 2;
          let dx = p.x - cx;
          let dy = p.y - cy;
          if (p.behind && Math.abs(dx) < 1 && Math.abs(dy) < 1) dy = h; // 正后方：放在底部
          const scale = Math.min((cx - 26) / Math.max(1, Math.abs(dx)), (cy - 70) / Math.max(1, Math.abs(dy)));
          const ex = cx + dx * scale;
          const ey = cy + dy * scale;
          const angle = Math.atan2(dy, dx);
          e.edge.style.transform = `translate(${ex.toFixed(1)}px, ${ey.toFixed(1)}px) translate(-50%, -50%) rotate(${angle.toFixed(3)}rad)`;
          e.edge.classList.add("on");
        }
      }
    }
  }

  dispose(): void {
    this.disable();
    this.o.canvas.removeEventListener("pointerdown", this.onPointerDown);
    this.o.canvas.removeEventListener("pointerup", this.onPointerUp);
    this.o.canvas.removeEventListener("pointermove", this.onPointerMove);
    window.removeEventListener("keydown", this.onKeyDown);
    this.o.canvas.style.cursor = "";
  }
}
