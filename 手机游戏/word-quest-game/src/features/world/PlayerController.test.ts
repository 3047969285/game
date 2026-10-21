import {afterEach,it,expect,vi} from 'vitest';
import {PlayerController} from './PlayerController';
afterEach(()=>vi.unstubAllGlobals());
it('accelerates gently, uses human-scale speed and clears motion on disable',()=>{
 const events=new EventTarget();vi.stubGlobal('window',events);
 const player=new PlayerController({move(start,delta,out){out.copy(start).add(delta);}});
 events.dispatchEvent(Object.assign(new Event('keydown'),{key:'w'}));player.update(1/60,0);expect(player.speed).toBeLessThan(.4);
 for(let i=0;i<60;i++)player.update(1/60,0);expect(player.speed).toBeCloseTo(2.2,2);expect(player.position.z).toBeLessThan(2.3);
 player.setEnabled(false);const pos=player.position.clone();player.update(1,0);expect(player.position.distanceTo(pos)).toBe(0);expect(player.speed).toBe(0);player.dispose();
});
it('reports blocked speed as zero so pushing a wall cannot keep the walking animation running',()=>{
 const events=new EventTarget();vi.stubGlobal('window',events);
 const player=new PlayerController({move(start,_delta,out){out.copy(start);}});events.dispatchEvent(Object.assign(new Event('keydown'),{key:'w'}));player.update(.05,0);expect(player.speed).toBe(0);player.dispose();
});
