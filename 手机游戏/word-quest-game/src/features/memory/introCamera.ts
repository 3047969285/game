import type { Beat, CameraShot, Vec3 } from "./types";
import type { StageBounds } from "./stages/types";

export function firstIntroShot(beats: readonly Beat[]): CameraShot | undefined {
  for (const beat of beats) {
    if (beat.kind === "wait" || beat.kind === "weather") continue;
    if (beat.kind === "pov" && !beat.camera) continue;
    if ("camera" in beat && beat.camera) return beat.camera;
    break;
  }
  return undefined;
}
/** Human-height entry, including scripts beginning with weather/look setup. */
export function closeIntroShot(shot: CameraShot | undefined, spawn: Vec3 & {yaw:number}, bounds: StageBounds): CameraShot {
  const gaze = shot?.look ?? {x:spawn.x+Math.sin(spawn.yaw)*2,y:spawn.y+1.5,z:spawn.z+Math.cos(spawn.yaw)*2};
  const fit = (point: Vec3): Vec3 => {
    let dx=point.x-gaze.x,dz=point.z-gaze.z;
    const distance=Math.hypot(dx,dz);
    if(distance>3.2){dx*=3.2/distance;dz*=3.2/distance;}
    return {x:Math.max(bounds.minX,Math.min(bounds.maxX,gaze.x+dx)),y:spawn.y+Math.max(1.45,Math.min(1.7,point.y-spawn.y)),z:Math.max(bounds.minZ,Math.min(bounds.maxZ,gaze.z+dz))};
  };
  const from=fit(shot?.from??shot?.to??{x:spawn.x,y:spawn.y+1.6,z:spawn.z});
  return {...shot,from,to:shot?fit(shot.to):from,look:{...gaze},fov:Math.max(42,Math.min(54,shot?.fov??46)),duration:shot?.duration??3,move:shot?.move??"still"};
}
