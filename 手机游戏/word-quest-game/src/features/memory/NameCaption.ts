import * as THREE from "three";

/**
 * 第一次出现时的名字小字（docs/api-character-identity.md §5）：
 * 当年的我第一次出现时浮出 “Me · 2026”，其余同学第一次说话时浮出名字；1.5 s 淡出，不常驻。
 */

export const CAPTION_SECONDS = 1.5;

export function captionText(id: string, name: string): string {
  return id === "me2026" ? "Me · 2026" : name;
}

/** 谁还没有被标注过；纯逻辑，便于测试。 */
export class CaptionTracker {
  private readonly done = new Set<string>();

  /**
   * 每帧对每个人物调用。返回要显示的文字（只会对同一个人返回一次）。
   * - me2026：第一次在第三人称里出现在画面中；
   * - 其他人：第一次说话且在画面中（第一人称里自己的身体不标注）。
   */
  consider(id: string, name: string, state: { inView: boolean; speaking: boolean; thirdPerson: boolean; isViewer: boolean }): string | null {
    if (this.done.has(id) || state.isViewer || !state.inView) return null;
    const first = id === "me2026" ? state.thirdPerson : state.speaking;
    if (!first) return null;
    this.done.add(id);
    return captionText(id, name);
  }

  has(id: string): boolean {
    return this.done.has(id);
  }
}

/** 淡入 0.2 s → 停留 → 在 CAPTION_SECONDS 结束时淡出完毕的不透明度。 */
export function captionOpacity(age: number): number {
  if (age < 0 || age >= CAPTION_SECONDS) return 0;
  const fadeIn = Math.min(1, age / 0.2);
  const fadeOut = Math.min(1, (CAPTION_SECONDS - age) / 0.6);
  return Math.min(fadeIn, fadeOut);
}

interface Item { el: HTMLElement; anchor: () => THREE.Vector3 | null; age: number }

/** 头顶的浮动小字（DOM，每帧按人物头部的屏幕位置摆放）。 */
export class NameCaption {
  private readonly items: Item[] = [];
  private readonly v = new THREE.Vector3();

  constructor(private readonly host: HTMLElement) {}

  show(text: string, anchor: () => THREE.Vector3 | null): void {
    const el = document.createElement("div");
    el.className = "mem-name-caption";
    el.textContent = text;
    el.style.cssText = "position:absolute;left:0;top:0;transform:translate(-50%,-100%);pointer-events:none;color:#fff;font:600 15px/1.2 system-ui,sans-serif;letter-spacing:.04em;text-shadow:0 1px 6px rgba(0,0,0,.65);opacity:0;white-space:nowrap;z-index:5";
    this.host.appendChild(el);
    this.items.push({ el, anchor, age: 0 });
  }

  update(dt: number, camera: THREE.Camera): void {
    const w = this.host.clientWidth || window.innerWidth, h = this.host.clientHeight || window.innerHeight;
    for (let i = this.items.length - 1; i >= 0; i--) {
      const item = this.items[i];
      item.age += dt;
      const p = item.anchor();
      const opacity = captionOpacity(item.age);
      if (!p || opacity <= 0) {
        if (item.age >= CAPTION_SECONDS) { item.el.remove(); this.items.splice(i, 1); } else item.el.style.opacity = "0";
        continue;
      }
      this.v.copy(p).project(camera);
      const visible = this.v.z < 1 && Math.abs(this.v.x) < 1.1 && Math.abs(this.v.y) < 1.1;
      item.el.style.opacity = visible ? String(opacity) : "0";
      item.el.style.transform = `translate(-50%,-100%) translate(${((this.v.x + 1) / 2) * w}px,${((1 - this.v.y) / 2) * h}px)`;
    }
  }

  dispose(): void {
    for (const item of this.items) item.el.remove();
    this.items.length = 0;
  }
}
