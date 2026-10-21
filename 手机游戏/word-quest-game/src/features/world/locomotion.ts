import * as THREE from 'three';
import type {AvatarRig} from './explorerAvatar';

/** Distance-driven gait with longer planted stance, relaxed elbows and opposing torso twist. */
export class Locomotion {
  phase=0;weight=0;
  update(dt:number,speed:number,sprint:boolean):void {
    this.weight+=(THREE.MathUtils.smoothstep(speed,.05,.8)-this.weight)*(1-Math.exp(-dt*10));
    this.phase+=speed*dt/(sprint?2.1:1.45)*Math.PI*2;
  }
  apply(rig:AvatarRig,dt:number,sprint:boolean):void {
    const blend=1-Math.exp(-dt*18),amplitude=sprint?.65:.4;
    const leg=(side:0|1)=>{
      const t=(this.phase/(Math.PI*2)+side*.5)%1,stance=sprint?.46:.62;
      const swing=t<stance?0:Math.sin((t-stance)/(1-stance)*Math.PI);
      const hip=t<stance?amplitude*(1-2*t/stance):-amplitude*Math.cos((t-stance)/(1-stance)*Math.PI);
      return {hip:hip*this.weight,knee:.07+(sprint?1.1:.7)*swing*this.weight};
    };
    const left=leg(0),right=leg(1);
    for(const [joint,pose]of [[rig.leftLeg,left],[rig.rightLeg,right]] as const){
      joint.hip.rotation.x+=(pose.hip-joint.hip.rotation.x)*blend;
      joint.knee.rotation.x+=(pose.knee-joint.knee.rotation.x)*blend;
      const ankle=-(pose.hip+pose.knee)*.85;
      joint.ankle.rotation.x+=(ankle-joint.ankle.rotation.x)*blend;
    }
    rig.leftArm.rotation.x+=(-left.hip*.7-rig.leftArm.rotation.x)*blend;
    rig.rightArm.rotation.x+=(-right.hip*.7-rig.rightArm.rotation.x)*blend;
    for(const arm of [rig.leftArm,rig.rightArm]){
      const elbow=arm.userData.elbow as THREE.Group|undefined;
      if(elbow)elbow.rotation.x+=(-.22-(sprint?.4:.12)*this.weight-elbow.rotation.x)*blend;
    }
    rig.spine.rotation.y+=(Math.sin(this.phase)*.045*this.weight-rig.spine.rotation.y)*blend;
    rig.spine.rotation.z+=(Math.cos(this.phase)*.018*this.weight-rig.spine.rotation.z)*blend;
  }
}
