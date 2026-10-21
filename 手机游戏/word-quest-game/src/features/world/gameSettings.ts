import type { ResolutionMode } from './renderResolution';
import type { QualityTier } from './postPipeline';
export interface GameSettings {
  tier:QualityTier|'auto';resolution:ResolutionMode;shadows:boolean;ssr:boolean;ao:boolean;taa:boolean;aerial:boolean;bloom:boolean;
  shadowSize:1024|2048;fpsLimit:0|60|120;sensitivity:number;invertY:boolean;exploreFov:number;followDistance:number;showStats:boolean;sfxVolume:number;
}
const KEY='word-quest-settings-v1';
export function defaultSettings(mobile=false):GameSettings {return {tier:'auto',resolution:mobile?'balanced':'quality',shadows:true,ssr:true,ao:true,taa:true,aerial:true,bloom:true,shadowSize:mobile?1024:2048,fpsLimit:0,sensitivity:1,invertY:false,exploreFov:50,followDistance:4.2,showStats:false,sfxVolume:1};}
export function sanitizeSettings(raw:unknown,mobile=false):GameSettings {
  const defaults=defaultSettings(mobile),value=raw&&typeof raw==='object'?raw as Record<string,unknown>:{};
  const result={...defaults};
  for(const key of ['shadows','ssr','ao','taa','aerial','bloom','invertY','showStats'] as const)if(typeof value[key]==='boolean')result[key]=value[key] as boolean;
  if(['auto','high','med','low'].includes(value.tier as string))result.tier=value.tier as GameSettings['tier'];
  if(['quality','1080p','balanced'].includes(value.resolution as string))result.resolution=value.resolution as ResolutionMode;
  if(value.shadowSize===1024||value.shadowSize===2048)result.shadowSize=value.shadowSize;
  if(value.fpsLimit===0||value.fpsLimit===60||value.fpsLimit===120)result.fpsLimit=value.fpsLimit;
  for(const [key,min,max]of [['sensitivity',.25,2.5],['exploreFov',40,75],['followDistance',2.5,12],['sfxVolume',0,1]] as const){const n=value[key];if(typeof n==='number'&&Number.isFinite(n))result[key]=Math.max(min,Math.min(max,n));}
  return result;
}
let cached:GameSettings|undefined;
const listeners=new Set<(settings:GameSettings)=>void>();
function mobile():boolean{return typeof window!=='undefined'&&((window.matchMedia?.('(pointer: coarse)').matches??false)||Math.min(innerWidth,innerHeight)<540);}
export function getGameSettings():Readonly<GameSettings> {
  if(!cached){try{cached=sanitizeSettings(JSON.parse(localStorage.getItem(KEY)??'null'),mobile());
    const legacy=localStorage.getItem('world-resolution-mode');if(!localStorage.getItem(KEY)&&(legacy==='balanced'||legacy==='quality'))cached.resolution=legacy;
  }catch{cached=defaultSettings(mobile());}}
  return cached;
}
export function updateGameSettings(patch:Partial<GameSettings>):void {
  cached=sanitizeSettings({...getGameSettings(),...patch},mobile());
  try{localStorage.setItem(KEY,JSON.stringify(cached));localStorage.setItem('world-resolution-mode',cached.resolution);}catch{/* optional persistence */}
  for(const listener of listeners)listener(cached);
}
export function subscribeGameSettings(listener:(settings:Readonly<GameSettings>)=>void):()=>void {listeners.add(listener);return()=>listeners.delete(listener);}
export function resetGameSettings():void{updateGameSettings(defaultSettings(mobile()));}
