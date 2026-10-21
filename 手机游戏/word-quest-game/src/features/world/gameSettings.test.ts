import {it,expect} from 'vitest';
import {defaultSettings,sanitizeSettings,getGameSettings,updateGameSettings} from './gameSettings';
import {bindRenderSettings} from './renderSettingsBinding';
import {FrameGate} from './frameGate';
import type * as THREE from 'three';
import type {PostPipeline} from './postPipeline';
it('validates persistent settings and keeps desktop QHD/mobile adaptive defaults',()=>{
  expect(defaultSettings().resolution).toBe('quality');expect(defaultSettings(true).resolution).toBe('balanced');
  const s=sanitizeSettings({resolution:'bad',tier:'ultra',sensitivity:99,exploreFov:NaN,fpsLimit:45,sfxVolume:-1,ssr:'yes'});
  expect(s.resolution).toBe('quality');expect(s.tier).toBe('auto');expect(s.sensitivity).toBe(2.5);expect(s.exploreFov).toBe(50);expect(s.fpsLimit).toBe(0);expect(s.sfxVolume).toBe(0);expect(s.ssr).toBe(true);
  expect(sanitizeSettings({resolution:'1080p',shadows:false}).resolution).toBe('1080p');
});
it('binds changes only to affected render subsystems and unsubscribes on disposal',()=>{
  const previous={...getGameSettings()};let resizes=0,maps=0,features=0;
  const renderer={shadowMap:{enabled:true,needsUpdate:false}} as unknown as THREE.WebGLRenderer;
  const post={setFeature(){features++;}} as unknown as PostPipeline;
  const release=bindRenderSettings(renderer,post,{resolution(){resizes++;},shadowSize(){maps++;},stats(){}});
  expect(resizes).toBe(1);expect(maps).toBe(1);const before=features;
  updateGameSettings({sensitivity:1.5});expect(resizes).toBe(1);expect(maps).toBe(1);expect(features).toBe(before);
  updateGameSettings({ssr:!previous.ssr});expect(features).toBe(before+1);
  release();updateGameSettings(previous);expect(features).toBe(before+1);
});
it('limits rendering to 60/120 while ignoring long background gaps',()=>{
  const gate=new FrameGate();let rendered=0;
  for(let i=1;i<=120;i++)if(gate.ready(i*1000/120,60))rendered++;
  expect(rendered).toBeGreaterThanOrEqual(59);expect(rendered).toBeLessThanOrEqual(61);
  expect(gate.ready(5000,60)).toBe(true);
  expect(new FrameGate().ready(1,0)).toBe(true);
});
