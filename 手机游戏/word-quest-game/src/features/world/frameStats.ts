export interface FrameSummary { count:number;meanMs:number;medianMs:number;p95Ms:number; }
export function summarizeFrames(samples:readonly number[]):FrameSummary {
  const valid=samples.filter(x=>Number.isFinite(x)&&x>0&&x<250).sort((a,b)=>a-b),n=valid.length;
  return {count:n,meanMs:n?valid.reduce((a,b)=>a+b,0)/n:0,medianMs:n?valid[Math.floor((n-1)*.5)]:0,p95Ms:n?valid[Math.ceil(n*.95)-1]:0};
}
