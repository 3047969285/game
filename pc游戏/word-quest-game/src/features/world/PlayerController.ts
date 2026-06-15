import * as THREE from "three";
import { PLAYER_SPEED, sampleTerrainY } from "./worldConfig";
import { terrainHeight } from "./utils";

const MOVE_KEYS = new Set(["w", "a", "s", "d", "arrowup", "arrowdown", "arrowleft", "arrowright"]);

export class PlayerController {
  readonly position = new THREE.Vector3();
  yaw = 0;
  private moveTarget: THREE.Vector3 | null = null;
  private keys = new Set<string>();
  private stick = { x: 0, z: 0 };
  private enabled = true;
  private sprint = false;

  constructor() {
    window.addEventListener("keydown", this.onKeyDown);
    window.addEventListener("keyup", this.onKeyUp);
  }

  dispose(): void {
    window.removeEventListener("keydown", this.onKeyDown);
    window.removeEventListener("keyup", this.onKeyUp);
  }

  setEnabled(on: boolean): void {
    this.enabled = on;
    if (!on) {
      this.keys.clear();
      this.moveTarget = null;
    }
  }

  setPosition(x: number, y: number, z: number): void {
    this.position.set(x, y, z);
    this.moveTarget = null;
  }

  /** 点击地面移动 */
  setMoveTarget(x: number, z: number): void {
    this.moveTarget = new THREE.Vector3(x, 0, z);
  }

  clearMoveTarget(): void {
    this.moveTarget = null;
  }

  setStickInput(x: number, z: number): void {
    this.stick.x = x;
    this.stick.z = z;
    if (Math.abs(x) > 0.12 || Math.abs(z) > 0.12) this.moveTarget = null;
  }

  isMoving(): boolean {
    return this.keys.size > 0 || this.moveTarget !== null || Math.abs(this.stick.x) > 0.1 || Math.abs(this.stick.z) > 0.1;
  }

  update(dt: number, cameraYaw: number): void {
    if (!this.enabled) return;

    let dx = 0;
    let dz = 0;

    if (this.moveTarget) {
      const to = new THREE.Vector3().subVectors(this.moveTarget, this.position);
      to.y = 0;
      const dist = to.length();
      if (dist < 0.45) {
        this.moveTarget = null;
      } else {
        to.normalize();
        dx = to.x;
        dz = to.z;
        this.yaw = Math.atan2(dx, dz);
      }
    } else {
      let forward = (this.keys.has("w") || this.keys.has("arrowup") ? 1 : 0) - (this.keys.has("s") || this.keys.has("arrowdown") ? 1 : 0);
      let strafe = (this.keys.has("d") || this.keys.has("arrowright") ? 1 : 0) - (this.keys.has("a") || this.keys.has("arrowleft") ? 1 : 0);
      if (Math.abs(this.stick.x) > 0.1 || Math.abs(this.stick.z) > 0.1) {
        forward = this.stick.z;
        strafe = this.stick.x;
      }
      if (forward !== 0 || strafe !== 0) {
        const sin = Math.sin(cameraYaw);
        const cos = Math.cos(cameraYaw);
        dx = strafe * cos + forward * sin;
        dz = strafe * -sin + forward * cos;
        const len = Math.hypot(dx, dz) || 1;
        dx /= len;
        dz /= len;
        this.yaw = Math.atan2(dx, dz);
      }
    }

    if (dx !== 0 || dz !== 0) {
      const speed = PLAYER_SPEED * (this.sprint ? 1.85 : 1) * dt;
      this.position.x += dx * speed;
      this.position.z += dz * speed;
    }

    this.position.y = sampleTerrainY(this.position.x, this.position.z, terrainHeight) + 0.05;
  }

  isSprinting(): boolean {
    return this.sprint && this.isMoving();
  }

  private onKeyDown = (e: KeyboardEvent): void => {
    if (!this.enabled) return;
    const k = e.key.toLowerCase();
    if (MOVE_KEYS.has(k)) this.keys.add(k);
    if (k === "shift") this.sprint = true;
  };

  private onKeyUp = (e: KeyboardEvent): void => {
    const k = e.key.toLowerCase();
    this.keys.delete(k);
    if (k === "shift") this.sprint = false;
  };
}
