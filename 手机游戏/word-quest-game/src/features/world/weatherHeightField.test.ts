import * as THREE from "three";
import { it,expect } from 'vitest';
import { WeatherHeightField } from './weatherHeightField';
import { SolarClock } from './solarClock';
it('samples sloping terrain in world coordinates and reuses cache inside the snap cell',()=>{
  let calls=0;const field=new WeatherHeightField((x,z)=>{calls++;return x*.2+z*.1;},40,16);
  expect(field.update(0,0)).toBe(true);expect(calls).toBe(256);
  const data=field.texture.image.data as Uint16Array;
  expect(THREE.DataUtils.fromHalfFloat(data[0])).toBeCloseTo(-18.75*.3,2);
  expect(field.update(.2,.3)).toBe(false);expect(calls).toBe(256);
  expect(field.update(3,1)).toBe(true);expect(field.box.x).toBe(-16);field.dispose();
});
it('crosses midnight smoothly and rejects invalid solar times',()=>{
  const clock=new SolarClock(23);clock.set(1,4);const first=clock.update(.016);
  expect(first).toBeGreaterThan(23);expect(first).toBeLessThan(23.1);
  for(let i=0;i<1200;i++)clock.update(.016);
  expect(clock.hour).toBeCloseTo(1,2);clock.set(NaN);expect(Number.isFinite(clock.hour)).toBe(true);
  clock.set(18.5,0);expect(clock.hour).toBe(18.5);
});
