import { describe,it,expect } from 'vitest';
import { terrainPatch } from './terrainLod';
import { terrainHeight } from './utils';
describe('terrain LOD continuity',()=>{
  it('matches neighboring tile heights and analytic normals across different LODs',()=>{
    const a=terrainPatch(0,0,60,60,32),b=terrainPatch(60,0,60,60,16);
    for(let i=0;i<=16;i++){
      const ai=i*2*33+32,bi=i*17;
      expect(a.attributes.position.getY(ai)).toBeCloseTo(b.attributes.position.getY(bi),5);
      for(let axis=0;axis<3;axis++)expect(a.attributes.normal.array[ai*3+axis]).toBeCloseTo(b.attributes.normal.array[bi*3+axis],5);
    }a.dispose();b.dispose();
  });
  it('covers tile boundaries and adds skirts without moving walkable height',()=>{
    const g=terrainPatch(50,20,60,60,8),p=g.attributes.position;
    expect(p.getY(0)).toBeCloseTo(terrainHeight(20,-10),5);
    expect(p.count).toBe(81+36);expect(g.index!.count).toBe(8*8*6+4*8*6);
    expect(g.boundingBox!.min.x).toBe(-30);expect(g.boundingBox!.max.z).toBe(30);
    for(const value of p.array)expect(Number.isFinite(value)).toBe(true);g.dispose();
  });
});
