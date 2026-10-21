import {it,expect} from 'vitest';
import {Locomotion} from './locomotion';
it('keeps stride phase tied to traveled distance at 60 and 120 Hz',()=>{
 const a=new Locomotion(),b=new Locomotion();for(let i=0;i<60;i++)a.update(1/60,2.2,false);for(let i=0;i<120;i++)b.update(1/120,2.2,false);
 expect(a.phase).toBeCloseTo(b.phase,8);expect(a.weight).toBeCloseTo(b.weight,8);expect(a.phase).toBeCloseTo(2.2/1.45*Math.PI*2);
});
it('blends into movement and settles at rest without advancing a stationary gait',()=>{
 const gait=new Locomotion();gait.update(1/60,2.2,false);expect(gait.weight).toBeGreaterThan(0);expect(gait.weight).toBeLessThan(.2);
 const phase=gait.phase;for(let i=0;i<120;i++)gait.update(1/60,0,false);expect(gait.phase).toBe(phase);expect(gait.weight).toBeLessThan(.001);
});
