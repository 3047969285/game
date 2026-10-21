/** Rate limit expensive simulation/render work without blocking input or the browser RAF. */
export class FrameGate {
  private previous=0;private debt=0;
  ready(now:number,limit:0|60|120):boolean {
    if(!limit){this.previous=now;this.debt=0;return true;}
    if(!this.previous||now-this.previous>300){this.previous=now;this.debt=0;return true;}
    this.debt+=Math.max(0,now-this.previous);this.previous=now;
    const interval=1000/limit;if(this.debt<interval-.3)return false;
    this.debt=Math.max(0,this.debt-interval);if(this.debt>interval*2)this.debt=0;return true;
  }
}
