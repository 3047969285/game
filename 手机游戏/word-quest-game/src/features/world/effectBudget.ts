/** Reduce expensive secondary effects before changing a quality-first pixel target. */
export class EffectBudget {
  level:0|1|2=0;avgMs=16.7;private slow=0;private fast=0;private cooldown=0;
  update(frameMs:number,dt:number):0|1|2|null {
    if(!(dt>0)||dt>.3||!(frameMs>0)||frameMs>250)return null;
    this.avgMs+=(frameMs-this.avgMs)*(1-Math.exp(-dt/.5));
    this.cooldown=Math.max(0,this.cooldown-dt);
    this.slow=this.avgMs>18?this.slow+dt:0;
    this.fast=this.avgMs<12?this.fast+dt:0;
    if(this.cooldown>0)return null;
    if(this.slow>2&&this.level<2){this.level=(this.level+1) as 1|2;this.changed();return this.level;}
    if(this.fast>12&&this.level>0){this.level=(this.level-1) as 0|1;this.changed();return this.level;}
    return null;
  }
  private changed():void {this.slow=this.fast=0;this.cooldown=8;}
}
