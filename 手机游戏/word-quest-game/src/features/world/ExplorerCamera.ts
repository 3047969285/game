import { getGameSettings } from "./gameSettings";
import * as THREE from "three";
import { CAMERA_DISTANCE, CAMERA_HEIGHT } from "./worldConfig";

/** 第三人称跟随相机 */
export class ExplorerCamera {
  private yaw = 0;
  private orbitAnchorYaw = 0;
  private pitch = 0.18;

  constructor(private readonly groundHeight?:(x:number,z:number)=>number,private readonly clipCamera?:(target:THREE.Vector3,position:THREE.Vector3)=>void) {}

  /** 出生时直接放到跟随位置，首帧不从高空俯冲。 */
  snapToPlayer(camera:THREE.PerspectiveCamera,playerPos:THREE.Vector3,playerYaw:number):void {
    this.resetBehind(playerYaw);this.pitch=.18;this.zoom=1;
    this.update(camera,playerPos,playerYaw,0);
    camera.position.copy(this.desiredPos);this.clipCamera?.(this.targetPos,camera.position);camera.lookAt(this.targetPos);
  }
  private readonly targetPos = new THREE.Vector3();
  private readonly desiredPos = new THREE.Vector3();
  private dragElement?: HTMLElement;
  private activePointerId: number | null = null;
  private previousTouchAction = "";
  private lookButton?: HTMLButtonElement;
  private lookStyle?: HTMLStyleElement;
  private inputEnabled = true;
  private manualOrbit=false;
  get heading():number{return this.yaw;}

  get mouseLookActive(): boolean {
    return !!this.dragElement && this.dragElement.ownerDocument.pointerLockElement === this.dragElement;
  }

  /** Mouse movement and touch drags share the same angular response and limits. */
  applyLookDelta(dx: number, dy: number): void {
    if (!Number.isFinite(dx) || !Number.isFinite(dy)) return;
    this.manualOrbit=true;
    const sensitivity = getGameSettings().sensitivity;
    this.addYaw(-dx * .006 * sensitivity);
    this.pitch = THREE.MathUtils.clamp(this.pitch + dy * .004 * sensitivity, -.12, .75);
  }

  setInputEnabled(enabled: boolean): void {
    this.inputEnabled = enabled;
    if (!enabled) {
      this.releaseMouseLook();
      this.activePointerId = null;
      this.isDragging = false;
    }
    if (this.lookButton) this.lookButton.disabled = !enabled;
  }

  releaseMouseLook(): void {
    if (this.mouseLookActive) this.dragElement?.ownerDocument.exitPointerLock();
  }

  private readonly onMouseMove = (event: MouseEvent): void => {
    if (this.inputEnabled && this.mouseLookActive) this.applyLookDelta(event.movementX, event.movementY);
  };

  private readonly onLockChange = (): void => {
    if (!this.inputEnabled) this.releaseMouseLook();
    if (this.lookButton) {
      this.lookButton.textContent = this.mouseLookActive ? "鼠标视角已启用 · Esc 退出" : "启用鼠标视角";
      this.lookButton.setAttribute("aria-pressed", String(this.mouseLookActive));
    }
  };

  private readonly onLockError = (): void => {
    if (this.lookButton) this.lookButton.textContent = "请按住画面拖动视角";
  };

  private readonly onBlur = (): void => {
    this.releaseMouseLook();
    this.activePointerId = null;
    this.isDragging = false;
  };

  private readonly requestMouseLook = (): void => {
    if (!this.inputEnabled || !this.dragElement) return;
    if (this.mouseLookActive) { this.releaseMouseLook(); return; }
    try {
      const request = this.dragElement.requestPointerLock?.();
      if (!this.dragElement.requestPointerLock) this.onLockError();
      request?.catch(this.onLockError);
    } catch { this.onLockError(); }
  };

  /** 鼠标/触摸拖拽转向 */
  addYaw(delta: number): void {
    this.yaw += delta;
  }

  resetBehind(playerYaw: number): void {
    this.yaw = playerYaw;this.manualOrbit=false;
    this.orbitAnchorYaw = playerYaw;
  }

  update(
    camera: THREE.PerspectiveCamera,
    playerPos: THREE.Vector3,
    playerYaw: number,
    dt: number,
    followPlayerYaw = true,
    orbitTarget?: THREE.Vector3
  ): number {
    if (followPlayerYaw && !this.isDragging && !this.mouseLookActive && !this.manualOrbit) {
      const delta=Math.atan2(Math.sin(playerYaw-this.yaw),Math.cos(playerYaw-this.yaw));
      this.yaw += delta * (1-Math.exp(-2.5*dt));
    } else if (!followPlayerYaw) {
      const relativeYaw = Math.atan2(
        Math.sin(this.yaw - this.orbitAnchorYaw),
        Math.cos(this.yaw - this.orbitAnchorYaw)
      );
      this.yaw = this.orbitAnchorYaw + THREE.MathUtils.clamp(relativeYaw, -1.05, 1.05);
    }

    const cos = Math.cos(this.yaw);
    const sin = Math.sin(this.yaw);
    const focusOnLandscape = !followPlayerYaw && Boolean(orbitTarget);
    const anchor = focusOnLandscape ? orbitTarget! : playerPos;
    const dist = (focusOnLandscape ? 26 : (getGameSettings().followDistance??CAMERA_DISTANCE)) * this.zoom;
    const horizontal=focusOnLandscape?dist:Math.cos(this.pitch)*dist;
    const height = focusOnLandscape?7.2+Math.sin(this.pitch)*3:CAMERA_HEIGHT+Math.sin(this.pitch)*dist;

    this.desiredPos.set(
      anchor.x - sin * horizontal,
      anchor.y + height,
      anchor.z - cos * horizontal
    );

    if(this.groundHeight&&!focusOnLandscape)this.desiredPos.y=Math.max(this.desiredPos.y,this.groundHeight(this.desiredPos.x,this.desiredPos.z)+.4);
    camera.position.lerp(this.desiredPos, 1 - Math.exp(-8 * dt));
    this.targetPos.copy(anchor);
    if (!focusOnLandscape) this.targetPos.y += CAMERA_HEIGHT;
    this.clipCamera?.(this.targetPos,camera.position);
    camera.lookAt(this.targetPos);

    return this.yaw;
  }

  /** 鼠标滚轮缩放：靠近可以近距离看角色 / 建筑细节 */
  private zoom = 1;
  private readonly onWheel = (e: WheelEvent): void => {
    if (!this.inputEnabled) return;
    e.preventDefault();
    this.zoom = THREE.MathUtils.clamp(this.zoom * Math.exp(e.deltaY * 0.0012), 0.6, 3.2);
  };

  private isDragging = false;
  private lastX = 0;
  private lastY = 0;
  private downY = 0;
  private downX = 0;

  private readonly onPointerDown = (e: PointerEvent): void => {
    if (!this.inputEnabled || this.mouseLookActive || this.activePointerId !== null || (e.pointerType === "mouse" && e.button !== 0)) return;
    this.activePointerId = e.pointerId;
    this.downX = e.clientX;
    this.lastX = e.clientX;this.lastY=e.clientY;this.downY=e.clientY;
    this.isDragging = false;
    try {
      this.dragElement?.setPointerCapture(e.pointerId);
    } catch {
      // Pointer capture can be unavailable in embedded webviews; the listeners still work in-canvas.
    }
  };

  private readonly onPointerMove = (e: PointerEvent): void => {
    if (!this.inputEnabled || this.mouseLookActive || e.pointerId !== this.activePointerId) return;
    const dx = e.clientX - this.lastX,dy=e.clientY-this.lastY;
    this.lastX = e.clientX;this.lastY=e.clientY;
    if (!this.isDragging && Math.hypot(e.clientX-this.downX,e.clientY-this.downY) > 10) this.isDragging = true;
    if (this.isDragging) this.applyLookDelta(dx,dy);
  };

  private readonly onPointerEnd = (e: PointerEvent): void => {
    if (e.pointerId !== this.activePointerId) return;
    this.activePointerId = null;
    this.isDragging = false;
  };

  bindDrag(el: HTMLElement): void {
    this.disposeDrag();
    this.dragElement = el;
    const doc = el.ownerDocument;
    doc.addEventListener("mousemove", this.onMouseMove);
    doc.addEventListener("pointerlockchange", this.onLockChange);
    doc.addEventListener("pointerlockerror", this.onLockError);
    doc.defaultView?.addEventListener("blur", this.onBlur);
    if (el.parentElement) {
      this.lookStyle = doc.createElement("style");
      this.lookStyle.textContent = ".explorer-mouse-look{position:absolute;right:14px;bottom:48px;z-index:20;padding:8px 12px;border:1px solid #7896ae;border-radius:9px;background:#152c40dd;color:#e3f1ff;cursor:pointer;font:12px system-ui}@media(max-width:540px),(pointer:coarse){.explorer-mouse-look{display:none}}";
      this.lookButton = doc.createElement("button");
      this.lookButton.className = "explorer-mouse-look";
      this.lookButton.type = "button";
      this.lookButton.textContent = "启用鼠标视角";
      this.lookButton.setAttribute("aria-pressed", "false");
      this.lookButton.title = "点击后移动鼠标环顾，Esc 释放；也可按住画面拖动";
      this.lookButton.onclick = this.requestMouseLook;
      el.parentElement.append(this.lookStyle, this.lookButton);
    }
    this.previousTouchAction = el.style.touchAction;
    el.style.touchAction = "none";
    el.addEventListener("pointerdown", this.onPointerDown);
    el.addEventListener("pointermove", this.onPointerMove);
    el.addEventListener("pointerup", this.onPointerEnd);
    el.addEventListener("pointercancel", this.onPointerEnd);
    el.addEventListener("lostpointercapture", this.onPointerEnd);
    el.addEventListener("wheel", this.onWheel, { passive: false });
  }

  disposeDrag(): void {
    const el = this.dragElement;
    if (!el) return;
    this.releaseMouseLook();
    const doc = el.ownerDocument;
    doc.removeEventListener("mousemove", this.onMouseMove);
    doc.removeEventListener("pointerlockchange", this.onLockChange);
    doc.removeEventListener("pointerlockerror", this.onLockError);
    doc.defaultView?.removeEventListener("blur", this.onBlur);
    this.lookButton?.remove();
    this.lookStyle?.remove();
    this.lookButton = undefined;
    this.lookStyle = undefined;
    el.removeEventListener("pointerdown", this.onPointerDown);
    el.removeEventListener("pointermove", this.onPointerMove);
    el.removeEventListener("pointerup", this.onPointerEnd);
    el.removeEventListener("pointercancel", this.onPointerEnd);
    el.removeEventListener("lostpointercapture", this.onPointerEnd);
    el.removeEventListener("wheel", this.onWheel);
    if (this.activePointerId !== null && el.hasPointerCapture(this.activePointerId)) {
      el.releasePointerCapture(this.activePointerId);
    }
    this.activePointerId = null;
    this.isDragging = false;
    el.style.touchAction = this.previousTouchAction;
    this.dragElement = undefined;
  }
}
