import * as THREE from "three";

/**
 * 断片时的候选标记：每个候选物件身后一圈柔和的光晕 + 头顶一个缓缓浮动的小 “?”。
 * 全部是 Sprite（共用两张小画布纹理），不进 Materializer；断片结束 clear() 全部移除。
 */

interface Mark {
  id: string;
  object: THREE.Object3D;
  halo: THREE.Sprite;
  mark: THREE.Sprite;
  center: THREE.Vector3;
  radius: number;
  top: number;
  phase: number;
  alive: number;
  dying: boolean;
}

function haloTexture(): THREE.CanvasTexture {
  const c = document.createElement("canvas");
  c.width = c.height = 128;
  const g = c.getContext("2d");
  if (g) {
    const grad = g.createRadialGradient(64, 64, 0, 64, 64, 64);
    grad.addColorStop(0, "rgba(190,230,255,0.85)");
    grad.addColorStop(0.35, "rgba(140,200,255,0.4)");
    grad.addColorStop(0.7, "rgba(110,170,255,0.12)");
    grad.addColorStop(1, "rgba(110,170,255,0)");
    g.fillStyle = grad;
    g.fillRect(0, 0, 128, 128);
  }
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

function questionTexture(): THREE.CanvasTexture {
  const c = document.createElement("canvas");
  c.width = c.height = 128;
  const g = c.getContext("2d");
  if (g) {
    const glow = g.createRadialGradient(64, 64, 6, 64, 64, 60);
    glow.addColorStop(0, "rgba(200,235,255,0.5)");
    glow.addColorStop(1, "rgba(120,180,255,0)");
    g.fillStyle = glow;
    g.fillRect(0, 0, 128, 128);
    g.font = '700 84px Georgia, "Times New Roman", serif';
    g.textAlign = "center";
    g.textBaseline = "middle";
    g.shadowColor = "rgba(140,200,255,0.95)";
    g.shadowBlur = 14;
    g.fillStyle = "#f2f9ff";
    g.fillText("?", 64, 70);
  }
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

export class CandidateMarks {
  private readonly group = new THREE.Group();
  private readonly marks: Mark[] = [];
  private haloTex: THREE.CanvasTexture | null = null;
  private questionTex: THREE.CanvasTexture | null = null;
  private time = 0;

  constructor(scene: THREE.Scene) {
    this.group.name = "candidate-marks";
    scene.add(this.group);
  }

  /** 给一个候选物件加光晕与问号 */
  add(id: string, object: THREE.Object3D): void {
    this.haloTex ??= haloTexture();
    this.questionTex ??= questionTexture();
    const box = new THREE.Box3().setFromObject(object);
    const sphere = box.getBoundingSphere(new THREE.Sphere());
    const halo = new THREE.Sprite(new THREE.SpriteMaterial({ map: this.haloTex, transparent: true, depthWrite: false, depthTest: true, blending: THREE.AdditiveBlending, opacity: 0, fog: false }));
    halo.renderOrder = 8;
    const mark = new THREE.Sprite(new THREE.SpriteMaterial({ map: this.questionTex, transparent: true, depthWrite: false, depthTest: false, opacity: 0, fog: false }));
    mark.renderOrder = 12;
    halo.raycast = () => undefined;
    mark.raycast = () => undefined;
    this.group.add(halo, mark);
    this.marks.push({
      id,
      object,
      halo,
      mark,
      center: sphere.center.clone().sub(object.position),
      radius: Math.max(0.2, sphere.radius),
      top: box.max.y - object.position.y,
      phase: this.marks.length * 1.3,
      alive: 0,
      dying: false,
    });
  }

  /** 答错的候选：光晕与问号淡出 */
  dismiss(id: string): void {
    const m = this.marks.find((x) => x.id === id);
    if (m) m.dying = true;
  }

  /** 全部淡出并移除 */
  clear(): void {
    for (const m of this.marks) m.dying = true;
  }

  update(dt: number): void {
    this.time += dt;
    for (let i = this.marks.length - 1; i >= 0; i--) {
      const m = this.marks[i];
      m.alive = Math.max(0, Math.min(1, m.alive + (m.dying ? -dt * 2.2 : dt * 2.2)));
      if (m.dying && m.alive <= 0) {
        this.disposeMark(m);
        this.marks.splice(i, 1);
        continue;
      }
      const o = m.object.position;
      const pulse = 0.5 + 0.5 * Math.sin(this.time * 3.1 + m.phase);
      const size = m.radius * (3.4 + pulse * 0.7);
      m.halo.position.set(o.x + m.center.x, o.y + m.center.y, o.z + m.center.z);
      m.halo.scale.set(size, size, 1);
      (m.halo.material as THREE.SpriteMaterial).opacity = m.alive * (0.42 + pulse * 0.3);
      const bob = Math.sin(this.time * 2.0 + m.phase) * 0.05;
      m.mark.position.set(o.x + m.center.x, o.y + m.top + 0.2 + m.radius * 0.25 + bob, o.z + m.center.z);
      const qs = 0.34 + m.radius * 0.28;
      m.mark.scale.set(qs, qs, 1);
      (m.mark.material as THREE.SpriteMaterial).opacity = m.alive * (0.75 + pulse * 0.25);
    }
  }

  private disposeMark(m: Mark): void {
    m.halo.removeFromParent();
    m.mark.removeFromParent();
    (m.halo.material as THREE.Material).dispose();
    (m.mark.material as THREE.Material).dispose();
  }

  dispose(): void {
    for (const m of this.marks) this.disposeMark(m);
    this.marks.length = 0;
    this.haloTex?.dispose();
    this.questionTex?.dispose();
    this.group.removeFromParent();
  }
}


// ───────────────────────── 触碰目标的灯柱 ─────────────────────────

interface Beacon {
  id: string;
  object: THREE.Object3D;
  column: THREE.Sprite;
  mote: THREE.Sprite;
  top: number;
  phase: number;
  alive: number;
  dying: boolean;
}

function columnTexture(): THREE.CanvasTexture {
  const c = document.createElement("canvas");
  c.width = 32;
  c.height = 128;
  const g = c.getContext("2d");
  if (g) {
    const v = g.createLinearGradient(0, 128, 0, 0);
    v.addColorStop(0, "rgba(190,232,255,0.95)");
    v.addColorStop(0.5, "rgba(150,210,255,0.35)");
    v.addColorStop(1, "rgba(120,190,255,0)");
    g.fillStyle = v;
    g.fillRect(0, 0, 32, 128);
    // 左右边缘淡出，成为一道细细的柔光
    const h = g.createLinearGradient(0, 0, 32, 0);
    h.addColorStop(0, "rgba(0,0,0,1)");
    h.addColorStop(0.5, "rgba(0,0,0,0)");
    h.addColorStop(1, "rgba(0,0,0,1)");
    g.globalCompositeOperation = "destination-out";
    g.fillStyle = h;
    g.fillRect(0, 0, 32, 128);
  }
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

/**
 * 触碰阶段，每个还没触碰的目标头顶有一道细细的柔光灯柱和一颗缓缓起伏的光点——
 * 屏幕大小恒定（sizeAttenuation 关闭）、不被家具和人物遮挡，所以站在房间的任何地方都找得到。
 * 触碰后淡出。
 */
export class TargetBeacons {
  private readonly group = new THREE.Group();
  private readonly beacons: Beacon[] = [];
  private columnTex: THREE.CanvasTexture | null = null;
  private moteTex: THREE.CanvasTexture | null = null;
  private time = 0;

  constructor(scene: THREE.Scene) {
    this.group.name = "target-beacons";
    scene.add(this.group);
  }

  add(id: string, object: THREE.Object3D): void {
    if (this.beacons.some((b) => b.id === id && !b.dying)) return;
    this.columnTex ??= columnTexture();
    this.moteTex ??= haloTexture();
    const box = new THREE.Box3().setFromObject(object);
    const column = new THREE.Sprite(new THREE.SpriteMaterial({ map: this.columnTex, transparent: true, depthWrite: false, depthTest: false, blending: THREE.AdditiveBlending, opacity: 0, fog: false, sizeAttenuation: false }));
    column.center.set(0.5, 0);
    column.scale.set(0.016, 0.2, 1);
    column.renderOrder = 11;
    const mote = new THREE.Sprite(new THREE.SpriteMaterial({ map: this.moteTex, transparent: true, depthWrite: false, depthTest: false, blending: THREE.AdditiveBlending, opacity: 0, fog: false, sizeAttenuation: false }));
    mote.scale.set(0.045, 0.045, 1);
    mote.renderOrder = 12;
    column.raycast = () => undefined;
    mote.raycast = () => undefined;
    this.group.add(column, mote);
    this.beacons.push({ id, object, column, mote, top: box.max.y - object.position.y, phase: this.beacons.length * 1.1, alive: 0, dying: false });
  }

  remove(id: string): void {
    for (const b of this.beacons) if (b.id === id) b.dying = true;
  }

  clear(): void {
    for (const b of this.beacons) b.dying = true;
  }

  get count(): number {
    return this.beacons.filter((b) => !b.dying).length;
  }

  update(dt: number): void {
    this.time += dt;
    for (let i = this.beacons.length - 1; i >= 0; i--) {
      const b = this.beacons[i];
      b.alive = Math.max(0, Math.min(1, b.alive + (b.dying ? -dt * 2.5 : dt * 1.6)));
      if (b.dying && b.alive <= 0) {
        b.column.removeFromParent();
        b.mote.removeFromParent();
        (b.column.material as THREE.Material).dispose();
        (b.mote.material as THREE.Material).dispose();
        this.beacons.splice(i, 1);
        continue;
      }
      const o = b.object.position;
      const pulse = 0.5 + 0.5 * Math.sin(this.time * 2.4 + b.phase);
      b.column.position.set(o.x, o.y + b.top + 0.08, o.z);
      (b.column.material as THREE.SpriteMaterial).opacity = b.alive * (0.55 + pulse * 0.35);
      const bob = 0.12 + 0.05 * Math.sin(this.time * 1.7 + b.phase);
      b.mote.position.set(o.x, o.y + b.top + 0.08 + bob, o.z);
      (b.mote.material as THREE.SpriteMaterial).opacity = b.alive * (0.6 + pulse * 0.4);
    }
  }

  dispose(): void {
    for (const b of this.beacons) {
      b.column.removeFromParent();
      b.mote.removeFromParent();
      (b.column.material as THREE.Material).dispose();
      (b.mote.material as THREE.Material).dispose();
    }
    this.beacons.length = 0;
    this.columnTex?.dispose();
    this.moteTex?.dispose();
    this.group.removeFromParent();
  }
}
