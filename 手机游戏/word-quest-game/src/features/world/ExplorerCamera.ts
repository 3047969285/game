import { getGameSettings } from "./gameSettings";
import * as THREE from "three";
import { CAMERA_DISTANCE, CAMERA_HEIGHT } from "./worldConfig";

/** 第三人称跟随相机 */
export class ExplorerCamera {
  private yaw = 0;
  private orbitAnchorYaw = 0;
  private pitch = 0.18;

  constructor(private readonly groundHeight?:(x:number,z:number)=>number) {}

  /** 出生时直接放到跟随位置，首帧不从高空俯冲。 */
  snapToPlayer(camera:THREE.PerspectiveCamera,playerPos:THREE.Vector3,playerYaw:number):void {
    this.resetBehind(playerYaw);this.pitch=.18;this.zoom=1;
    this.update(camera,playerPos,playerYaw,0);
    camera.position.copy(this.desiredPos);camera.lookAt(this.targetPos);
  }
  private readonly targetPos = new THREE.Vector3();
  private readonly desiredPos = new THREE.Vector3();
  private dragElement?: HTMLElement;
  private activePointerId: number | null = null;
  private previousTouchAction = "";

  /** 鼠标/触摸拖拽转向 */
  addYaw(delta: number): void {
    this.yaw += delta;
  }

  resetBehind(playerYaw: number): void {
    this.yaw = playerYaw;
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
    if (followPlayerYaw && !this.isDragging) {
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
    camera.lookAt(this.targetPos);

    return this.yaw;
  }

  /** 鼠标滚轮缩放：靠近可以近距离看角色 / 建筑细节 */
  private zoom = 1;
  private readonly onWheel = (e: WheelEvent): void => {
    e.preventDefault();
    this.zoom = THREE.MathUtils.clamp(this.zoom * Math.exp(e.deltaY * 0.0012), 0.6, 3.2);
  };

  private isDragging = false;
  private lastX = 0;
  private lastY = 0;
  private downY = 0;
  private downX = 0;

  private readonly onPointerDown = (e: PointerEvent): void => {
    if (this.activePointerId !== null || (e.pointerType === "mouse" && e.button !== 0)) return;
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
    if (e.pointerId !== this.activePointerId) return;
    const dx = e.clientX - this.lastX,dy=e.clientY-this.lastY;
    this.lastX = e.clientX;this.lastY=e.clientY;
    if (!this.isDragging && Math.hypot(e.clientX-this.downX,e.clientY-this.downY) > 10) this.isDragging = true;
    if (this.isDragging){const sensitivity=getGameSettings().sensitivity;this.addYaw(-dx*.006*sensitivity);this.pitch=THREE.MathUtils.clamp(this.pitch+dy*.004*sensitivity,-.12,.75);}
  };

  private readonly onPointerEnd = (e: PointerEvent): void => {
    if (e.pointerId !== this.activePointerId) return;
    this.activePointerId = null;
    this.isDragging = false;
  };

  bindDrag(el: HTMLElement): void {
    this.disposeDrag();
    this.dragElement = el;
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
