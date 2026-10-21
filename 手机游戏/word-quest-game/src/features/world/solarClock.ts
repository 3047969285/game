/** Solar-hour interpolation follows the shortest arc through midnight. */
export class SolarClock {
  hour:number;private target:number;private rate=0;private transitioning=false;
  constructor(hour=14){this.hour=this.target=wrap(hour);}
  set(hour:number,seconds=6):void {
    if(!Number.isFinite(hour))return;
    this.target=wrap(hour);this.rate=seconds>0?4/seconds:0;this.transitioning=seconds>0;
    if(seconds<=0)this.hour=this.target;
  }
  update(dt:number):number {
    if(!(dt>0)||!Number.isFinite(dt))return this.hour;
    if(this.transitioning){const delta=((this.target-this.hour+36)%24)-12;
      this.hour=wrap(this.hour+delta*(1-Math.exp(-Math.min(dt,.1)*this.rate)));
      if(Math.abs(delta)<.001){this.hour=this.target;this.transitioning=false;}
    }else this.hour=wrap(this.hour+Math.min(dt,.1)/3600);
    return this.hour;
  }
}
function wrap(hour:number):number{return((hour%24)+24)%24;}
