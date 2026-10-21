import type * as THREE from 'three';
import type { PostPipeline } from './postPipeline';
import { getGameSettings,subscribeGameSettings,type GameSettings } from './gameSettings';

/** One settings-to-renderer adapter shared by map and memory renderers. Changes
 * touch only the affected subsystem, avoiding resource rebuilds on slider drags. */
export function bindRenderSettings(renderer:THREE.WebGLRenderer,post:PostPipeline|undefined,hooks:{
  resolution:(mode:GameSettings['resolution'])=>void;shadowSize:(size:GameSettings['shadowSize'])=>void;
  stats:()=>void;fov?:(degrees:number)=>void;
}):()=>void {
  let previous:Partial<GameSettings>={};
  const apply=(next:Readonly<GameSettings>):void=>{
    if(next.shadows!==previous.shadows){renderer.shadowMap.enabled=next.shadows;renderer.shadowMap.needsUpdate=true;}
    for(const feature of ['ssr','ao','taa','aerial','bloom'] as const)if(next[feature]!==previous[feature])post?.setFeature(feature,next[feature]);
    if(next.shadowSize!==previous.shadowSize)hooks.shadowSize(next.shadowSize);
    if(next.exploreFov!==previous.exploreFov)hooks.fov?.(next.exploreFov);
    if(next.resolution!==previous.resolution)hooks.resolution(next.resolution);
    if(next.showStats!==previous.showStats)hooks.stats();
    previous={...next};
  };
  apply(getGameSettings());return subscribeGameSettings(apply);
}
