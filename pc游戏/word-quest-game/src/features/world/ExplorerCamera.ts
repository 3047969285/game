import * as THREE from "three";
import { CAMERA_DISTANCE, CAMERA_HEIGHT } from "./worldConfig";

/** 第三人称跟随相机 */
export class ExplorerCamera {
  private yaw = 0;
  private pitch = 0.28;
  private readonly targetPos = new THREE.Vector3();
  private readonly desiredPos = new THREE.Vector3();

  /** 鼠标/触摸拖拽转向 */
  addYaw(delta: number): void {
    this.yaw += delta;
  }

  resetBehind(playerYaw: number): void {
    this.yaw = playerYaw;
  }

  update(camera: THREE.PerspectiveCamera, playerPos: THREE.Vector3, playerYaw: number, dt: number): number {
    if (!this.isDragging) {
      this.yaw += (playerYaw - this.yaw) * Math.min(1, dt * 2.5);
    }

    const cos = Math.cos(this.yaw);
    const sin = Math.sin(this.yaw);
    const dist = CAMERA_DISTANCE;
    const height = CAMERA_HEIGHT + Math.sin(this.pitch) * 3;

    this.desiredPos.set(
      playerPos.x - sin * dist,
      playerPos.y + height,
      playerPos.z - cos * dist
    );

    camera.position.lerp(this.desiredPos, 1 - Math.exp(-5 * dt));
    this.targetPos.set(playerPos.x, playerPos.y + 1.55, playerPos.z);
    camera.lookAt(this.targetPos);

    return this.yaw;
  }

  private isDragging = false;
  private lastX = 0;
  private downX = 0;

  bindDrag(el: HTMLElement): void {
    const onDown = (e: PointerEvent) => {
      this.downX = e.clientX;
      this.lastX = e.clientX;
      this.isDragging = false;
    };
    const onMove = (e: PointerEvent) => {
      const dx = e.clientX - this.lastX;
      this.lastX = e.clientX;
      if (!this.isDragging && Math.abs(e.clientX - this.downX) > 10) {
        this.isDragging = true;
      }
      if (!this.isDragging) return;
      this.addYaw(-dx * 0.006);
    };
    const onUp = () => {
      this.isDragging = false;
    };
    el.addEventListener("pointerdown", onDown);
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerup", onUp);
    el.addEventListener("pointercancel", onUp);
  }
}
