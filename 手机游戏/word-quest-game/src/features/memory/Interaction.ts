import * as THREE from "three";
import type { Materializer } from "./Materializer";

/**
 * 触碰：射线拾取（鼠标点 / 触屏轻点；you 模式下走到 1.7 m 内按 E）。
 * 命中体是每个物件一颗隐形的大球（比物件本身好点中，手机上尤其重要），不进场景图。
 * 可点的物件持续有微弱的边缘光脉冲，悬停时更亮；靠近 / 悬停时浮出一枚小词签（DOM：单词 + 音标，跟随物件屏幕坐标）。
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
  /** 玩家位置（you 模式下用于“靠近显示词签”和按 E）；没有则用相机位置 */
  getPlayer?: () => THREE.Vector3 | null;
}

interface Entry {
  target: InteractTarget;
  proxy: THREE.Mesh;
  center0: THREE.Vector3;
  objPos0: THREE.Vector3;
  radius: number;
  tag?: HTMLElement;
}

const NEAR_LABEL = 3.8;
const E_RANGE = 1.7;
const MAX_LABELS = 3;
const TAP_MOVE = 10;
const TAP_MS = 650;

export class Interaction {
  private readonly o: InteractionOptions;
  private entries: Entry[] = [];
  private onHit: ((id: string) => void) | null = null;
  private showLabels = true;
  private baseGlow = 0.35;
  private hoverId: string | null = null;
  private readonly ray = new THREE.Raycaster();
  private readonly ndc = new THREE.Vector2();
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
  enable(targets: InteractTarget[], onHit: (id: string) => void, opts: { labels?: boolean; baseGlow?: number } = {}): void {
    this.disable();
    this.onHit = onHit;
    this.showLabels = opts.labels ?? true;
    this.baseGlow = opts.baseGlow ?? 0.35;
    for (const target of targets) this.add(target);
  }

  /** 追加一个目标（不影响已有的） */
  add(target: InteractTarget): void {
    const box = new THREE.Box3().setFromObject(target.object);
    const sphere = box.getBoundingSphere(new THREE.Sphere());
    const radius = Math.max(0.32, sphere.radius * 1.15);
    const proxy = new THREE.Mesh(new THREE.SphereGeometry(radius, 10, 8), new THREE.MeshBasicMaterial({ visible: false }));
    proxy.position.copy(sphere.center);
    proxy.updateMatrixWorld(true);
    const entry: Entry = { target, proxy, center0: sphere.center.clone(), objPos0: target.object.position.clone(), radius };
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
    this.entries.push(entry);
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
    e.proxy.geometry.dispose();
    (e.proxy.material as THREE.Material).dispose();
    e.tag?.remove();
  }

  private pick(clientX: number, clientY: number): Entry | null {
    const rect = this.o.canvas.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return null;
    this.ndc.set(((clientX - rect.left) / rect.width) * 2 - 1, -((clientY - rect.top) / rect.height) * 2 + 1);
    this.ray.setFromCamera(this.ndc, this.o.camera);
    let best: Entry | null = null;
    let bestDist = Infinity;
    for (const e of this.entries) {
      if (!e.target.object.visible) continue; // 还没出现的物件不可点
      const hit = this.ray.intersectObject(e.proxy, false)[0];
      if (hit && hit.distance < bestDist) {
        best = e;
        bestDist = hit.distance;
      }
    }
    return best;
  }

  private readonly onPointerDown = (e: PointerEvent): void => {
    if (!this.onHit) return;
    this.down = { id: e.pointerId, x: e.clientX, y: e.clientY, t: performance.now() };
  };

  private readonly onPointerUp = (e: PointerEvent): void => {
    const d = this.down;
    this.down = null;
    if (!d || d.id !== e.pointerId || !this.onHit) return;
    if (Math.hypot(e.clientX - d.x, e.clientY - d.y) > TAP_MOVE || performance.now() - d.t > TAP_MS) return;
    const hit = this.pick(e.clientX, e.clientY);
    if (hit) this.onHit(hit.target.id);
  };

  private readonly onPointerMove = (e: PointerEvent): void => {
    if (!this.onHit || e.pointerType !== "mouse") return;
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
      const d = Math.hypot(en.proxy.position.x - p.x, en.proxy.position.z - p.z);
      if (d < bestD) {
        best = en;
        bestD = d;
      }
    }
    if (best) this.onHit(best.target.id);
  };

  /** 逐帧：命中体跟随物件、脉冲、词签位置 */
  update(): void {
    if (this.entries.length === 0) return;
    const player = this.o.getPlayer?.() ?? this.o.camera.position;
    const cam = this.o.camera;
    const rect = this.o.canvas.getBoundingClientRect();
    const visibleTags: Array<{ e: Entry; d: number }> = [];
    for (const e of this.entries) {
      const obj = e.target.object;
      e.proxy.position.copy(e.center0).add(obj.position).sub(e.objPos0);
      e.proxy.updateMatrixWorld();
      this.o.materializer.setPulse(obj, e.target.id === this.hoverId ? 1.15 : this.baseGlow);
      if (!e.tag) continue;
      const d = Math.hypot(e.proxy.position.x - player.x, e.proxy.position.z - player.z);
      if (obj.visible && (e.target.id === this.hoverId || d < NEAR_LABEL)) visibleTags.push({ e, d });
      else e.tag.classList.remove("on");
    }
    visibleTags.sort((a, b) => a.d - b.d);
    visibleTags.forEach(({ e }, i) => {
      const tag = e.tag!;
      if (i >= MAX_LABELS && e.target.id !== this.hoverId) {
        tag.classList.remove("on");
        return;
      }
      this.tmp.copy(e.proxy.position);
      this.tmp.y += e.radius * 0.95;
      this.tmp.project(cam);
      const onScreen = this.tmp.z > -1 && this.tmp.z < 1 && Math.abs(this.tmp.x) < 1.05 && Math.abs(this.tmp.y) < 1.05;
      if (!onScreen) {
        tag.classList.remove("on");
        return;
      }
      const x = (this.tmp.x * 0.5 + 0.5) * rect.width;
      const y = (-this.tmp.y * 0.5 + 0.5) * rect.height;
      tag.style.transform = `translate(${x.toFixed(1)}px, ${y.toFixed(1)}px) translate(-50%, -100%)`;
      tag.classList.add("on");
    });
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
