import { getGameSettings } from "./gameSettings";
import { QUALITY_PRESETS,type QualityTier } from './postPipeline';
export type ResolutionMode='quality'|'1080p'|'balanced';
export function mobileViewport():boolean {
  return typeof window!=='undefined' && ((window.matchMedia?.('(pointer: coarse)').matches??false)||Math.min(window.innerWidth,window.innerHeight)<540);
}
export function resolutionMode():ResolutionMode {return getGameSettings().resolution;}
/** Fit the QHD pixel budget to the actual viewport aspect; never stretch the image. */
export function renderPixelRatio(width:number,height:number,mode:ResolutionMode,tier:QualityTier,dpr=1,maxTexture=8192):number {
  if(!(width>0&&height>0))return 1;
  const desired=mode==='quality'?Math.min(2560/width,1440/height):mode==='1080p'?Math.min(1920/width,1080/height):Math.min(dpr,QUALITY_PRESETS[tier].pixelRatio);
  return Math.max(.1,Math.min(desired,maxTexture/Math.max(width,height)));
}
