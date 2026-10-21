import { it,expect } from 'vitest';
import { renderPixelRatio } from './renderResolution';
import { EffectBudget } from './effectBudget';
it('renders a 16:9 desktop world at true QHD, including 4K screens',()=>{
  expect(renderPixelRatio(1280,720,'quality','high')).toBe(2);
  expect(renderPixelRatio(1920,1080,'quality','high')).toBeCloseTo(4/3);
  expect(renderPixelRatio(3840,2160,'quality','high')).toBeCloseTo(2/3);
});
it('preserves aspect and respects mobile and GPU caps',()=>{
  const r=renderPixelRatio(900,630,'quality','high');expect(630*r).toBe(1440);expect(900*r).toBeLessThan(2560);
  expect(renderPixelRatio(390,700,'balanced','low',3)).toBe(1);
  expect(renderPixelRatio(1280,720,'quality','high',2,2048)).toBe(1.6);
});
it('effect budget waits through spikes, downgrades sustained overload and recovers slowly',()=>{
  const b=new EffectBudget();for(let i=0;i<60;i++)b.update(30,.03);expect(b.level).toBe(0);
  for(let i=0;i<100;i++)b.update(30,.03);expect(b.level).toBe(1);
  for(let i=0;i<400;i++)b.update(30,.03);expect(b.level).toBe(2);
  b.update(5000,5);expect(b.level).toBe(2);
  for(let i=0;i<2800;i++)b.update(8,.008);expect(b.level).toBe(1);
  for(let i=0;i<2800;i++)b.update(8,.008);expect(b.level).toBe(0);
});

it('records a reproducible percentile and excludes background/compile gaps',async()=>{
  const {summarizeFrames}=await import('./frameStats');
  const stats=summarizeFrames([...Array.from({length:100},(_,i)=>i+1),0,NaN,5000]);
  expect(stats.count).toBe(100);expect(stats.meanMs).toBe(50.5);expect(stats.p95Ms).toBe(95);
  expect(summarizeFrames([]).p95Ms).toBe(0);
});
