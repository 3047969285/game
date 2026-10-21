import { describe,it,expect } from "vitest";
import { closeIntroShot,firstIntroShot } from "./introCamera";
import type { Beat,CameraShot } from "./types";
const bounds={minX:-5,maxX:5,minZ:-4,maxZ:4};
const spawn={x:0,y:0,z:2,yaw:Math.PI};
const wide:CameraShot={from:{x:0,y:5,z:12},to:{x:1,y:3,z:8},look:{x:0,y:1.2,z:0},duration:9,move:"dolly",fov:30};
describe("近距离人眼入场",()=>{
 it("天气与视角设定不会阻断寻找首个镜头",()=>{
  const beats=[{kind:"weather",weather:"lightRain"},{kind:"pov",pov:"you"},{kind:"wait",seconds:.5},{kind:"narrate",text:"Remember",camera:wide}] as Beat[];
  expect(firstIntroShot(beats)).toBe(wide);
 });
 it("起点与终点都在眼高且距离不超过 3.2 米，不改写原镜头",()=>{
  const original=JSON.stringify(wide);const c=closeIntroShot(wide,spawn,bounds);
  for(const p of [c.from!,c.to]){
   expect(p.y).toBeGreaterThanOrEqual(1.45);expect(p.y).toBeLessThanOrEqual(1.7);
   expect(Math.hypot(p.x-c.look.x,p.z-c.look.z)).toBeLessThanOrEqual(3.2+1e-9);
  }
  expect(c.fov).toBeGreaterThanOrEqual(42);expect(JSON.stringify(wide)).toBe(original);
 });
 it("没有剧情镜头也明确放置相机，使用出生点的眼高和朝向",()=>{
  const c=closeIntroShot(undefined,spawn,bounds);
  expect(c.from).toEqual({x:0,y:1.6,z:2});expect(c.look.z).toBeCloseTo(0);expect(c.look.y).toBe(1.5);
 });
});
