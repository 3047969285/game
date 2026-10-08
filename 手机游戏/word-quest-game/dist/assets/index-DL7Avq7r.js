var bf=Object.defineProperty;var wf=(r,e,t)=>e in r?bf(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t;var Q=(r,e,t)=>wf(r,typeof e!="symbol"?e+"":e,t);import{C as Tf,a as Ef,P as Af,s as Ot,t as Ft,b as Qn,d as Ds,r as $t,T as li,c as qn,e as Ml,f as Rf,g as Cf,I as Pf}from"./index-CUzqLqht.js";/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Cc="184",Lf=0,Sl=1,If=2,Qs=1,Df=2,js=3,ii=0,Zt=1,It=2,zn=0,fs=1,rr=2,bl=3,wl=4,Nf=5,Li=100,Uf=101,Ff=102,Of=103,Bf=104,zf=200,kf=201,Gf=202,Vf=203,Aa=204,Ra=205,Hf=206,Wf=207,Xf=208,qf=209,Yf=210,Kf=211,jf=212,Jf=213,Zf=214,Ca=0,Pa=1,La=2,gs=3,Ia=4,Da=5,Na=6,Ua=7,lu=0,$f=1,Qf=2,kn=0,Pc=1,Lc=2,Ic=3,wo=4,Dc=5,Nc=6,Uc=7,Tl="attached",ed="detached",hu=300,Ui=301,_s=302,Do=303,No=304,To=306,Fi=1e3,Fn=1001,uo=1002,Bt=1003,uu=1004,Js=1005,zt=1006,so=1007,On=1008,ln=1009,fu=1010,du=1011,or=1012,Fc=1013,Gn=1014,vn=1015,sn=1016,Oc=1017,Bc=1018,ar=1020,pu=35902,mu=35899,gu=1021,_u=1022,yn=1023,si=1026,Ni=1027,zc=1028,kc=1029,Oi=1030,Gc=1031,Vc=1033,ro=33776,oo=33777,ao=33778,co=33779,Fa=35840,Oa=35841,Ba=35842,za=35843,ka=36196,Ga=37492,Va=37496,Ha=37488,Wa=37489,fo=37490,Xa=37491,qa=37808,Ya=37809,Ka=37810,ja=37811,Ja=37812,Za=37813,$a=37814,Qa=37815,ec=37816,tc=37817,nc=37818,ic=37819,sc=37820,rc=37821,oc=36492,ac=36494,cc=36495,lc=36283,hc=36284,po=36285,uc=36286,xu=2200,td=2201,nd=2202,cr=2300,lr=2301,Uo=2302,El=2303,hs=2400,us=2401,mo=2402,Hc=2500,id=2501,sd=0,vu=1,fc=2,rd=3200,dc=0,od=1,Un="",Et="srgb",hn="srgb-linear",go="linear",pt="srgb",Wi=7680,Al=519,ad=512,cd=513,ld=514,Wc=515,hd=516,ud=517,Xc=518,fd=519,pc=35044,Rl="300 es",Bn=2e3,hr=2001;function dd(r){for(let e=r.length-1;e>=0;--e)if(r[e]>=65535)return!0;return!1}function pd(r){return ArrayBuffer.isView(r)&&!(r instanceof DataView)}function ur(r){return document.createElementNS("http://www.w3.org/1999/xhtml",r)}function md(){const r=ur("canvas");return r.style.display="block",r}const Cl={};function _o(...r){const e="THREE."+r.shift();console.log(e,...r)}function yu(r){const e=r[0];if(typeof e=="string"&&e.startsWith("TSL:")){const t=r[1];t&&t.isStackTrace?r[0]+=" "+t.getLocation():r[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return r}function Ne(...r){r=yu(r);const e="THREE."+r.shift();{const t=r[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...r)}}function ke(...r){r=yu(r);const e="THREE."+r.shift();{const t=r[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...r)}}function mc(...r){const e=r.join(" ");e in Cl||(Cl[e]=!0,Ne(...r))}function gd(r,e,t){return new Promise(function(n,i){function s(){switch(r.clientWaitSync(e,r.SYNC_FLUSH_COMMANDS_BIT,0)){case r.WAIT_FAILED:i();break;case r.TIMEOUT_EXPIRED:setTimeout(s,t);break;default:n()}}setTimeout(s,t)})}const _d={[Ca]:Pa,[La]:Na,[Ia]:Ua,[gs]:Da,[Pa]:Ca,[Na]:La,[Ua]:Ia,[Da]:gs};class bi{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){const n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){const n=this._listeners;if(n===void 0)return;const i=n[e];if(i!==void 0){const s=i.indexOf(t);s!==-1&&i.splice(s,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const n=t[e.type];if(n!==void 0){e.target=this;const i=n.slice(0);for(let s=0,o=i.length;s<o;s++)i[s].call(this,e);e.target=null}}}const jt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let Pl=1234567;const er=Math.PI/180,xs=180/Math.PI;function Mn(){const r=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(jt[r&255]+jt[r>>8&255]+jt[r>>16&255]+jt[r>>24&255]+"-"+jt[e&255]+jt[e>>8&255]+"-"+jt[e>>16&15|64]+jt[e>>24&255]+"-"+jt[t&63|128]+jt[t>>8&255]+"-"+jt[t>>16&255]+jt[t>>24&255]+jt[n&255]+jt[n>>8&255]+jt[n>>16&255]+jt[n>>24&255]).toLowerCase()}function ot(r,e,t){return Math.max(e,Math.min(t,r))}function qc(r,e){return(r%e+e)%e}function xd(r,e,t,n,i){return n+(r-e)*(i-n)/(t-e)}function vd(r,e,t){return r!==e?(t-r)/(e-r):0}function tr(r,e,t){return(1-t)*r+t*e}function yd(r,e,t,n){return tr(r,e,1-Math.exp(-t*n))}function Md(r,e=1){return e-Math.abs(qc(r,e*2)-e)}function Sd(r,e,t){return r<=e?0:r>=t?1:(r=(r-e)/(t-e),r*r*(3-2*r))}function bd(r,e,t){return r<=e?0:r>=t?1:(r=(r-e)/(t-e),r*r*r*(r*(r*6-15)+10))}function wd(r,e){return r+Math.floor(Math.random()*(e-r+1))}function Td(r,e){return r+Math.random()*(e-r)}function Ed(r){return r*(.5-Math.random())}function Ad(r){r!==void 0&&(Pl=r);let e=Pl+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function Rd(r){return r*er}function Cd(r){return r*xs}function Pd(r){return(r&r-1)===0&&r!==0}function Ld(r){return Math.pow(2,Math.ceil(Math.log(r)/Math.LN2))}function Id(r){return Math.pow(2,Math.floor(Math.log(r)/Math.LN2))}function Dd(r,e,t,n,i){const s=Math.cos,o=Math.sin,c=s(t/2),l=o(t/2),a=s((e+n)/2),h=o((e+n)/2),u=s((e-n)/2),f=o((e-n)/2),_=s((n-e)/2),d=o((n-e)/2);switch(i){case"XYX":r.set(c*h,l*u,l*f,c*a);break;case"YZY":r.set(l*f,c*h,l*u,c*a);break;case"ZXZ":r.set(l*u,l*f,c*h,c*a);break;case"XZX":r.set(c*h,l*d,l*_,c*a);break;case"YXY":r.set(l*_,c*h,l*d,c*a);break;case"ZYZ":r.set(l*d,l*_,c*h,c*a);break;default:Ne("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+i)}}function Tn(r,e){switch(e.constructor){case Float32Array:return r;case Uint32Array:return r/4294967295;case Uint16Array:return r/65535;case Uint8Array:return r/255;case Int32Array:return Math.max(r/2147483647,-1);case Int16Array:return Math.max(r/32767,-1);case Int8Array:return Math.max(r/127,-1);default:throw new Error("Invalid component type.")}}function _t(r,e){switch(e.constructor){case Float32Array:return r;case Uint32Array:return Math.round(r*4294967295);case Uint16Array:return Math.round(r*65535);case Uint8Array:return Math.round(r*255);case Int32Array:return Math.round(r*2147483647);case Int16Array:return Math.round(r*32767);case Int8Array:return Math.round(r*127);default:throw new Error("Invalid component type.")}}const mn={DEG2RAD:er,RAD2DEG:xs,generateUUID:Mn,clamp:ot,euclideanModulo:qc,mapLinear:xd,inverseLerp:vd,lerp:tr,damp:yd,pingpong:Md,smoothstep:Sd,smootherstep:bd,randInt:wd,randFloat:Td,randFloatSpread:Ed,seededRandom:Ad,degToRad:Rd,radToDeg:Cd,isPowerOfTwo:Pd,ceilPowerOfTwo:Ld,floorPowerOfTwo:Id,setQuaternionFromProperEuler:Dd,normalize:_t,denormalize:Tn},cl=class cl{constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6],this.y=i[1]*t+i[4]*n+i[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=ot(this.x,e.x,t.x),this.y=ot(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=ot(this.x,e,t),this.y=ot(this.y,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(ot(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(ot(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),i=Math.sin(t),s=this.x-e.x,o=this.y-e.y;return this.x=s*n-o*i+e.x,this.y=s*i+o*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};cl.prototype.isVector2=!0;let ee=cl;class rn{constructor(e=0,t=0,n=0,i=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=i}static slerpFlat(e,t,n,i,s,o,c){let l=n[i+0],a=n[i+1],h=n[i+2],u=n[i+3],f=s[o+0],_=s[o+1],d=s[o+2],m=s[o+3];if(u!==m||l!==f||a!==_||h!==d){let p=l*f+a*_+h*d+u*m;p<0&&(f=-f,_=-_,d=-d,m=-m,p=-p);let g=1-c;if(p<.9995){const x=Math.acos(p),v=Math.sin(x);g=Math.sin(g*x)/v,c=Math.sin(c*x)/v,l=l*g+f*c,a=a*g+_*c,h=h*g+d*c,u=u*g+m*c}else{l=l*g+f*c,a=a*g+_*c,h=h*g+d*c,u=u*g+m*c;const x=1/Math.sqrt(l*l+a*a+h*h+u*u);l*=x,a*=x,h*=x,u*=x}}e[t]=l,e[t+1]=a,e[t+2]=h,e[t+3]=u}static multiplyQuaternionsFlat(e,t,n,i,s,o){const c=n[i],l=n[i+1],a=n[i+2],h=n[i+3],u=s[o],f=s[o+1],_=s[o+2],d=s[o+3];return e[t]=c*d+h*u+l*_-a*f,e[t+1]=l*d+h*f+a*u-c*_,e[t+2]=a*d+h*_+c*f-l*u,e[t+3]=h*d-c*u-l*f-a*_,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,i){return this._x=e,this._y=t,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,i=e._y,s=e._z,o=e._order,c=Math.cos,l=Math.sin,a=c(n/2),h=c(i/2),u=c(s/2),f=l(n/2),_=l(i/2),d=l(s/2);switch(o){case"XYZ":this._x=f*h*u+a*_*d,this._y=a*_*u-f*h*d,this._z=a*h*d+f*_*u,this._w=a*h*u-f*_*d;break;case"YXZ":this._x=f*h*u+a*_*d,this._y=a*_*u-f*h*d,this._z=a*h*d-f*_*u,this._w=a*h*u+f*_*d;break;case"ZXY":this._x=f*h*u-a*_*d,this._y=a*_*u+f*h*d,this._z=a*h*d+f*_*u,this._w=a*h*u-f*_*d;break;case"ZYX":this._x=f*h*u-a*_*d,this._y=a*_*u+f*h*d,this._z=a*h*d-f*_*u,this._w=a*h*u+f*_*d;break;case"YZX":this._x=f*h*u+a*_*d,this._y=a*_*u+f*h*d,this._z=a*h*d-f*_*u,this._w=a*h*u-f*_*d;break;case"XZY":this._x=f*h*u-a*_*d,this._y=a*_*u-f*h*d,this._z=a*h*d+f*_*u,this._w=a*h*u+f*_*d;break;default:Ne("Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,i=Math.sin(n);return this._x=e.x*i,this._y=e.y*i,this._z=e.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],i=t[4],s=t[8],o=t[1],c=t[5],l=t[9],a=t[2],h=t[6],u=t[10],f=n+c+u;if(f>0){const _=.5/Math.sqrt(f+1);this._w=.25/_,this._x=(h-l)*_,this._y=(s-a)*_,this._z=(o-i)*_}else if(n>c&&n>u){const _=2*Math.sqrt(1+n-c-u);this._w=(h-l)/_,this._x=.25*_,this._y=(i+o)/_,this._z=(s+a)/_}else if(c>u){const _=2*Math.sqrt(1+c-n-u);this._w=(s-a)/_,this._x=(i+o)/_,this._y=.25*_,this._z=(l+h)/_}else{const _=2*Math.sqrt(1+u-n-c);this._w=(o-i)/_,this._x=(s+a)/_,this._y=(l+h)/_,this._z=.25*_}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(ot(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const i=Math.min(1,t/n);return this.slerp(e,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,i=e._y,s=e._z,o=e._w,c=t._x,l=t._y,a=t._z,h=t._w;return this._x=n*h+o*c+i*a-s*l,this._y=i*h+o*l+s*c-n*a,this._z=s*h+o*a+n*l-i*c,this._w=o*h-n*c-i*l-s*a,this._onChangeCallback(),this}slerp(e,t){let n=e._x,i=e._y,s=e._z,o=e._w,c=this.dot(e);c<0&&(n=-n,i=-i,s=-s,o=-o,c=-c);let l=1-t;if(c<.9995){const a=Math.acos(c),h=Math.sin(a);l=Math.sin(l*a)/h,t=Math.sin(t*a)/h,this._x=this._x*l+n*t,this._y=this._y*l+i*t,this._z=this._z*l+s*t,this._w=this._w*l+o*t,this._onChangeCallback()}else this._x=this._x*l+n*t,this._y=this._y*l+i*t,this._z=this._z*l+s*t,this._w=this._w*l+o*t,this.normalize();return this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),i=Math.sqrt(1-n),s=Math.sqrt(n);return this.set(i*Math.sin(e),i*Math.cos(e),s*Math.sin(t),s*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}const ll=class ll{constructor(e=0,t=0,n=0){this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Ll.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Ll.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,i=this.z,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6]*i,this.y=s[1]*t+s[4]*n+s[7]*i,this.z=s[2]*t+s[5]*n+s[8]*i,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,i=this.z,s=e.elements,o=1/(s[3]*t+s[7]*n+s[11]*i+s[15]);return this.x=(s[0]*t+s[4]*n+s[8]*i+s[12])*o,this.y=(s[1]*t+s[5]*n+s[9]*i+s[13])*o,this.z=(s[2]*t+s[6]*n+s[10]*i+s[14])*o,this}applyQuaternion(e){const t=this.x,n=this.y,i=this.z,s=e.x,o=e.y,c=e.z,l=e.w,a=2*(o*i-c*n),h=2*(c*t-s*i),u=2*(s*n-o*t);return this.x=t+l*a+o*u-c*h,this.y=n+l*h+c*a-s*u,this.z=i+l*u+s*h-o*a,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,i=this.z,s=e.elements;return this.x=s[0]*t+s[4]*n+s[8]*i,this.y=s[1]*t+s[5]*n+s[9]*i,this.z=s[2]*t+s[6]*n+s[10]*i,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=ot(this.x,e.x,t.x),this.y=ot(this.y,e.y,t.y),this.z=ot(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=ot(this.x,e,t),this.y=ot(this.y,e,t),this.z=ot(this.z,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(ot(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,i=e.y,s=e.z,o=t.x,c=t.y,l=t.z;return this.x=i*l-s*c,this.y=s*o-n*l,this.z=n*c-i*o,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return Fo.copy(this).projectOnVector(e),this.sub(Fo)}reflect(e){return this.sub(Fo.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(ot(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,i=this.z-e.z;return t*t+n*n+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const i=Math.sin(t)*e;return this.x=i*Math.sin(n),this.y=Math.cos(t)*e,this.z=i*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),i=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=i,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};ll.prototype.isVector3=!0;let L=ll;const Fo=new L,Ll=new rn,hl=class hl{constructor(e,t,n,i,s,o,c,l,a){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,i,s,o,c,l,a)}set(e,t,n,i,s,o,c,l,a){const h=this.elements;return h[0]=e,h[1]=i,h[2]=c,h[3]=t,h[4]=s,h[5]=l,h[6]=n,h[7]=o,h[8]=a,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,i=t.elements,s=this.elements,o=n[0],c=n[3],l=n[6],a=n[1],h=n[4],u=n[7],f=n[2],_=n[5],d=n[8],m=i[0],p=i[3],g=i[6],x=i[1],v=i[4],y=i[7],w=i[2],b=i[5],A=i[8];return s[0]=o*m+c*x+l*w,s[3]=o*p+c*v+l*b,s[6]=o*g+c*y+l*A,s[1]=a*m+h*x+u*w,s[4]=a*p+h*v+u*b,s[7]=a*g+h*y+u*A,s[2]=f*m+_*x+d*w,s[5]=f*p+_*v+d*b,s[8]=f*g+_*y+d*A,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],o=e[4],c=e[5],l=e[6],a=e[7],h=e[8];return t*o*h-t*c*a-n*s*h+n*c*l+i*s*a-i*o*l}invert(){const e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],o=e[4],c=e[5],l=e[6],a=e[7],h=e[8],u=h*o-c*a,f=c*l-h*s,_=a*s-o*l,d=t*u+n*f+i*_;if(d===0)return this.set(0,0,0,0,0,0,0,0,0);const m=1/d;return e[0]=u*m,e[1]=(i*a-h*n)*m,e[2]=(c*n-i*o)*m,e[3]=f*m,e[4]=(h*t-i*l)*m,e[5]=(i*s-c*t)*m,e[6]=_*m,e[7]=(n*l-a*t)*m,e[8]=(o*t-n*s)*m,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,i,s,o,c){const l=Math.cos(s),a=Math.sin(s);return this.set(n*l,n*a,-n*(l*o+a*c)+o+e,-i*a,i*l,-i*(-a*o+l*c)+c+t,0,0,1),this}scale(e,t){return this.premultiply(Oo.makeScale(e,t)),this}rotate(e){return this.premultiply(Oo.makeRotation(-e)),this}translate(e,t){return this.premultiply(Oo.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let i=0;i<9;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}};hl.prototype.isMatrix3=!0;let Ze=hl;const Oo=new Ze,Il=new Ze().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Dl=new Ze().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Nd(){const r={enabled:!0,workingColorSpace:hn,spaces:{},convert:function(i,s,o){return this.enabled===!1||s===o||!s||!o||(this.spaces[s].transfer===pt&&(i.r=ni(i.r),i.g=ni(i.g),i.b=ni(i.b)),this.spaces[s].primaries!==this.spaces[o].primaries&&(i.applyMatrix3(this.spaces[s].toXYZ),i.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===pt&&(i.r=ds(i.r),i.g=ds(i.g),i.b=ds(i.b))),i},workingToColorSpace:function(i,s){return this.convert(i,this.workingColorSpace,s)},colorSpaceToWorking:function(i,s){return this.convert(i,s,this.workingColorSpace)},getPrimaries:function(i){return this.spaces[i].primaries},getTransfer:function(i){return i===Un?go:this.spaces[i].transfer},getToneMappingMode:function(i){return this.spaces[i].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(i,s=this.workingColorSpace){return i.fromArray(this.spaces[s].luminanceCoefficients)},define:function(i){Object.assign(this.spaces,i)},_getMatrix:function(i,s,o){return i.copy(this.spaces[s].toXYZ).multiply(this.spaces[o].fromXYZ)},_getDrawingBufferColorSpace:function(i){return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(i=this.workingColorSpace){return this.spaces[i].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(i,s){return mc("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),r.workingToColorSpace(i,s)},toWorkingColorSpace:function(i,s){return mc("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),r.colorSpaceToWorking(i,s)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return r.define({[hn]:{primaries:e,whitePoint:n,transfer:go,toXYZ:Il,fromXYZ:Dl,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:Et},outputColorSpaceConfig:{drawingBufferColorSpace:Et}},[Et]:{primaries:e,whitePoint:n,transfer:pt,toXYZ:Il,fromXYZ:Dl,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:Et}}}),r}const at=Nd();function ni(r){return r<.04045?r*.0773993808:Math.pow(r*.9478672986+.0521327014,2.4)}function ds(r){return r<.0031308?r*12.92:1.055*Math.pow(r,.41666)-.055}let Xi;class Ud{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{Xi===void 0&&(Xi=ur("canvas")),Xi.width=e.width,Xi.height=e.height;const i=Xi.getContext("2d");e instanceof ImageData?i.putImageData(e,0,0):i.drawImage(e,0,0,e.width,e.height),n=Xi}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=ur("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const i=n.getImageData(0,0,e.width,e.height),s=i.data;for(let o=0;o<s.length;o++)s[o]=ni(s[o]/255)*255;return n.putImageData(i,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(ni(t[n]/255)*255):t[n]=ni(t[n]);return{data:t,width:e.width,height:e.height}}else return Ne("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let Fd=0;class Yc{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Fd++}),this.uuid=Mn(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let s;if(Array.isArray(i)){s=[];for(let o=0,c=i.length;o<c;o++)i[o].isDataTexture?s.push(Bo(i[o].image)):s.push(Bo(i[o]))}else s=Bo(i);n.url=s}return t||(e.images[this.uuid]=n),n}}function Bo(r){return typeof HTMLImageElement<"u"&&r instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&r instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&r instanceof ImageBitmap?Ud.getDataURL(r):r.data?{data:Array.from(r.data),width:r.width,height:r.height,type:r.data.constructor.name}:(Ne("Texture: Unable to serialize Texture."),{})}let Od=0;const zo=new L;class Gt extends bi{constructor(e=Gt.DEFAULT_IMAGE,t=Gt.DEFAULT_MAPPING,n=Fn,i=Fn,s=zt,o=On,c=yn,l=ln,a=Gt.DEFAULT_ANISOTROPY,h=Un){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Od++}),this.uuid=Mn(),this.name="",this.source=new Yc(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=s,this.minFilter=o,this.anisotropy=a,this.format=c,this.internalFormat=null,this.type=l,this.offset=new ee(0,0),this.repeat=new ee(1,1),this.center=new ee(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ze,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(zo).x}get height(){return this.source.getSize(zo).y}get depth(){return this.source.getSize(zo).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const n=e[t];if(n===void 0){Ne(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const i=this[t];if(i===void 0){Ne(`Texture.setValues(): property '${t}' does not exist.`);continue}i&&n&&i.isVector2&&n.isVector2||i&&n&&i.isVector3&&n.isVector3||i&&n&&i.isMatrix3&&n.isMatrix3?i.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==hu)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Fi:e.x=e.x-Math.floor(e.x);break;case Fn:e.x=e.x<0?0:1;break;case uo:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Fi:e.y=e.y-Math.floor(e.y);break;case Fn:e.y=e.y<0?0:1;break;case uo:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Gt.DEFAULT_IMAGE=null;Gt.DEFAULT_MAPPING=hu;Gt.DEFAULT_ANISOTROPY=1;const ul=class ul{constructor(e=0,t=0,n=0,i=1){this.x=e,this.y=t,this.z=n,this.w=i}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,i){return this.x=e,this.y=t,this.z=n,this.w=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,i=this.z,s=this.w,o=e.elements;return this.x=o[0]*t+o[4]*n+o[8]*i+o[12]*s,this.y=o[1]*t+o[5]*n+o[9]*i+o[13]*s,this.z=o[2]*t+o[6]*n+o[10]*i+o[14]*s,this.w=o[3]*t+o[7]*n+o[11]*i+o[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,i,s;const l=e.elements,a=l[0],h=l[4],u=l[8],f=l[1],_=l[5],d=l[9],m=l[2],p=l[6],g=l[10];if(Math.abs(h-f)<.01&&Math.abs(u-m)<.01&&Math.abs(d-p)<.01){if(Math.abs(h+f)<.1&&Math.abs(u+m)<.1&&Math.abs(d+p)<.1&&Math.abs(a+_+g-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const v=(a+1)/2,y=(_+1)/2,w=(g+1)/2,b=(h+f)/4,A=(u+m)/4,M=(d+p)/4;return v>y&&v>w?v<.01?(n=0,i=.707106781,s=.707106781):(n=Math.sqrt(v),i=b/n,s=A/n):y>w?y<.01?(n=.707106781,i=0,s=.707106781):(i=Math.sqrt(y),n=b/i,s=M/i):w<.01?(n=.707106781,i=.707106781,s=0):(s=Math.sqrt(w),n=A/s,i=M/s),this.set(n,i,s,t),this}let x=Math.sqrt((p-d)*(p-d)+(u-m)*(u-m)+(f-h)*(f-h));return Math.abs(x)<.001&&(x=1),this.x=(p-d)/x,this.y=(u-m)/x,this.z=(f-h)/x,this.w=Math.acos((a+_+g-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=ot(this.x,e.x,t.x),this.y=ot(this.y,e.y,t.y),this.z=ot(this.z,e.z,t.z),this.w=ot(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=ot(this.x,e,t),this.y=ot(this.y,e,t),this.z=ot(this.z,e,t),this.w=ot(this.w,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(ot(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};ul.prototype.isVector4=!0;let xt=ul;class Bd extends bi{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:zt,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new xt(0,0,e,t),this.scissorTest=!1,this.viewport=new xt(0,0,e,t),this.textures=[];const i={width:e,height:t,depth:n.depth},s=new Gt(i),o=n.count;for(let c=0;c<o;c++)this.textures[c]=s.clone(),this.textures[c].isRenderTargetTexture=!0,this.textures[c].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview}_setTextureOptions(e={}){const t={minFilter:zt,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let i=0,s=this.textures.length;i<s;i++)this.textures[i].image.width=e,this.textures[i].image.height=t,this.textures[i].image.depth=n,this.textures[i].isData3DTexture!==!0&&(this.textures[i].isArrayTexture=this.textures[i].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const i=Object.assign({},e.textures[t].image);this.textures[t].source=new Yc(i)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this.multiview=e.multiview,this}dispose(){this.dispatchEvent({type:"dispose"})}}class nn extends Bd{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class Mu extends Gt{constructor(e=null,t=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=Bt,this.minFilter=Bt,this.wrapR=Fn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class zd extends Gt{constructor(e=null,t=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=Bt,this.minFilter=Bt,this.wrapR=Fn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const bo=class bo{constructor(e,t,n,i,s,o,c,l,a,h,u,f,_,d,m,p){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,i,s,o,c,l,a,h,u,f,_,d,m,p)}set(e,t,n,i,s,o,c,l,a,h,u,f,_,d,m,p){const g=this.elements;return g[0]=e,g[4]=t,g[8]=n,g[12]=i,g[1]=s,g[5]=o,g[9]=c,g[13]=l,g[2]=a,g[6]=h,g[10]=u,g[14]=f,g[3]=_,g[7]=d,g[11]=m,g[15]=p,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new bo().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return this.determinant()===0?(e.set(1,0,0),t.set(0,1,0),n.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){if(e.determinant()===0)return this.identity();const t=this.elements,n=e.elements,i=1/qi.setFromMatrixColumn(e,0).length(),s=1/qi.setFromMatrixColumn(e,1).length(),o=1/qi.setFromMatrixColumn(e,2).length();return t[0]=n[0]*i,t[1]=n[1]*i,t[2]=n[2]*i,t[3]=0,t[4]=n[4]*s,t[5]=n[5]*s,t[6]=n[6]*s,t[7]=0,t[8]=n[8]*o,t[9]=n[9]*o,t[10]=n[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,i=e.y,s=e.z,o=Math.cos(n),c=Math.sin(n),l=Math.cos(i),a=Math.sin(i),h=Math.cos(s),u=Math.sin(s);if(e.order==="XYZ"){const f=o*h,_=o*u,d=c*h,m=c*u;t[0]=l*h,t[4]=-l*u,t[8]=a,t[1]=_+d*a,t[5]=f-m*a,t[9]=-c*l,t[2]=m-f*a,t[6]=d+_*a,t[10]=o*l}else if(e.order==="YXZ"){const f=l*h,_=l*u,d=a*h,m=a*u;t[0]=f+m*c,t[4]=d*c-_,t[8]=o*a,t[1]=o*u,t[5]=o*h,t[9]=-c,t[2]=_*c-d,t[6]=m+f*c,t[10]=o*l}else if(e.order==="ZXY"){const f=l*h,_=l*u,d=a*h,m=a*u;t[0]=f-m*c,t[4]=-o*u,t[8]=d+_*c,t[1]=_+d*c,t[5]=o*h,t[9]=m-f*c,t[2]=-o*a,t[6]=c,t[10]=o*l}else if(e.order==="ZYX"){const f=o*h,_=o*u,d=c*h,m=c*u;t[0]=l*h,t[4]=d*a-_,t[8]=f*a+m,t[1]=l*u,t[5]=m*a+f,t[9]=_*a-d,t[2]=-a,t[6]=c*l,t[10]=o*l}else if(e.order==="YZX"){const f=o*l,_=o*a,d=c*l,m=c*a;t[0]=l*h,t[4]=m-f*u,t[8]=d*u+_,t[1]=u,t[5]=o*h,t[9]=-c*h,t[2]=-a*h,t[6]=_*u+d,t[10]=f-m*u}else if(e.order==="XZY"){const f=o*l,_=o*a,d=c*l,m=c*a;t[0]=l*h,t[4]=-u,t[8]=a*h,t[1]=f*u+m,t[5]=o*h,t[9]=_*u-d,t[2]=d*u-_,t[6]=c*h,t[10]=m*u+f}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(kd,e,Gd)}lookAt(e,t,n){const i=this.elements;return an.subVectors(e,t),an.lengthSq()===0&&(an.z=1),an.normalize(),hi.crossVectors(n,an),hi.lengthSq()===0&&(Math.abs(n.z)===1?an.x+=1e-4:an.z+=1e-4,an.normalize(),hi.crossVectors(n,an)),hi.normalize(),br.crossVectors(an,hi),i[0]=hi.x,i[4]=br.x,i[8]=an.x,i[1]=hi.y,i[5]=br.y,i[9]=an.y,i[2]=hi.z,i[6]=br.z,i[10]=an.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,i=t.elements,s=this.elements,o=n[0],c=n[4],l=n[8],a=n[12],h=n[1],u=n[5],f=n[9],_=n[13],d=n[2],m=n[6],p=n[10],g=n[14],x=n[3],v=n[7],y=n[11],w=n[15],b=i[0],A=i[4],M=i[8],T=i[12],C=i[1],P=i[5],I=i[9],F=i[13],V=i[2],N=i[6],O=i[10],z=i[14],j=i[3],se=i[7],me=i[11],Te=i[15];return s[0]=o*b+c*C+l*V+a*j,s[4]=o*A+c*P+l*N+a*se,s[8]=o*M+c*I+l*O+a*me,s[12]=o*T+c*F+l*z+a*Te,s[1]=h*b+u*C+f*V+_*j,s[5]=h*A+u*P+f*N+_*se,s[9]=h*M+u*I+f*O+_*me,s[13]=h*T+u*F+f*z+_*Te,s[2]=d*b+m*C+p*V+g*j,s[6]=d*A+m*P+p*N+g*se,s[10]=d*M+m*I+p*O+g*me,s[14]=d*T+m*F+p*z+g*Te,s[3]=x*b+v*C+y*V+w*j,s[7]=x*A+v*P+y*N+w*se,s[11]=x*M+v*I+y*O+w*me,s[15]=x*T+v*F+y*z+w*Te,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],i=e[8],s=e[12],o=e[1],c=e[5],l=e[9],a=e[13],h=e[2],u=e[6],f=e[10],_=e[14],d=e[3],m=e[7],p=e[11],g=e[15],x=l*_-a*f,v=c*_-a*u,y=c*f-l*u,w=o*_-a*h,b=o*f-l*h,A=o*u-c*h;return t*(m*x-p*v+g*y)-n*(d*x-p*w+g*b)+i*(d*v-m*w+g*A)-s*(d*y-m*b+p*A)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const i=this.elements;return e.isVector3?(i[12]=e.x,i[13]=e.y,i[14]=e.z):(i[12]=e,i[13]=t,i[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],o=e[4],c=e[5],l=e[6],a=e[7],h=e[8],u=e[9],f=e[10],_=e[11],d=e[12],m=e[13],p=e[14],g=e[15],x=t*c-n*o,v=t*l-i*o,y=t*a-s*o,w=n*l-i*c,b=n*a-s*c,A=i*a-s*l,M=h*m-u*d,T=h*p-f*d,C=h*g-_*d,P=u*p-f*m,I=u*g-_*m,F=f*g-_*p,V=x*F-v*I+y*P+w*C-b*T+A*M;if(V===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const N=1/V;return e[0]=(c*F-l*I+a*P)*N,e[1]=(i*I-n*F-s*P)*N,e[2]=(m*A-p*b+g*w)*N,e[3]=(f*b-u*A-_*w)*N,e[4]=(l*C-o*F-a*T)*N,e[5]=(t*F-i*C+s*T)*N,e[6]=(p*y-d*A-g*v)*N,e[7]=(h*A-f*y+_*v)*N,e[8]=(o*I-c*C+a*M)*N,e[9]=(n*C-t*I-s*M)*N,e[10]=(d*b-m*y+g*x)*N,e[11]=(u*y-h*b-_*x)*N,e[12]=(c*T-o*P-l*M)*N,e[13]=(t*P-n*T+i*M)*N,e[14]=(m*v-d*w-p*x)*N,e[15]=(h*w-u*v+f*x)*N,this}scale(e){const t=this.elements,n=e.x,i=e.y,s=e.z;return t[0]*=n,t[4]*=i,t[8]*=s,t[1]*=n,t[5]*=i,t[9]*=s,t[2]*=n,t[6]*=i,t[10]*=s,t[3]*=n,t[7]*=i,t[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],i=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,i))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),i=Math.sin(t),s=1-n,o=e.x,c=e.y,l=e.z,a=s*o,h=s*c;return this.set(a*o+n,a*c-i*l,a*l+i*c,0,a*c+i*l,h*c+n,h*l-i*o,0,a*l-i*c,h*l+i*o,s*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,i,s,o){return this.set(1,n,s,0,e,1,o,0,t,i,1,0,0,0,0,1),this}compose(e,t,n){const i=this.elements,s=t._x,o=t._y,c=t._z,l=t._w,a=s+s,h=o+o,u=c+c,f=s*a,_=s*h,d=s*u,m=o*h,p=o*u,g=c*u,x=l*a,v=l*h,y=l*u,w=n.x,b=n.y,A=n.z;return i[0]=(1-(m+g))*w,i[1]=(_+y)*w,i[2]=(d-v)*w,i[3]=0,i[4]=(_-y)*b,i[5]=(1-(f+g))*b,i[6]=(p+x)*b,i[7]=0,i[8]=(d+v)*A,i[9]=(p-x)*A,i[10]=(1-(f+m))*A,i[11]=0,i[12]=e.x,i[13]=e.y,i[14]=e.z,i[15]=1,this}decompose(e,t,n){const i=this.elements;e.x=i[12],e.y=i[13],e.z=i[14];const s=this.determinant();if(s===0)return n.set(1,1,1),t.identity(),this;let o=qi.set(i[0],i[1],i[2]).length();const c=qi.set(i[4],i[5],i[6]).length(),l=qi.set(i[8],i[9],i[10]).length();s<0&&(o=-o),Sn.copy(this);const a=1/o,h=1/c,u=1/l;return Sn.elements[0]*=a,Sn.elements[1]*=a,Sn.elements[2]*=a,Sn.elements[4]*=h,Sn.elements[5]*=h,Sn.elements[6]*=h,Sn.elements[8]*=u,Sn.elements[9]*=u,Sn.elements[10]*=u,t.setFromRotationMatrix(Sn),n.x=o,n.y=c,n.z=l,this}makePerspective(e,t,n,i,s,o,c=Bn,l=!1){const a=this.elements,h=2*s/(t-e),u=2*s/(n-i),f=(t+e)/(t-e),_=(n+i)/(n-i);let d,m;if(l)d=s/(o-s),m=o*s/(o-s);else if(c===Bn)d=-(o+s)/(o-s),m=-2*o*s/(o-s);else if(c===hr)d=-o/(o-s),m=-o*s/(o-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+c);return a[0]=h,a[4]=0,a[8]=f,a[12]=0,a[1]=0,a[5]=u,a[9]=_,a[13]=0,a[2]=0,a[6]=0,a[10]=d,a[14]=m,a[3]=0,a[7]=0,a[11]=-1,a[15]=0,this}makeOrthographic(e,t,n,i,s,o,c=Bn,l=!1){const a=this.elements,h=2/(t-e),u=2/(n-i),f=-(t+e)/(t-e),_=-(n+i)/(n-i);let d,m;if(l)d=1/(o-s),m=o/(o-s);else if(c===Bn)d=-2/(o-s),m=-(o+s)/(o-s);else if(c===hr)d=-1/(o-s),m=-s/(o-s);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+c);return a[0]=h,a[4]=0,a[8]=0,a[12]=f,a[1]=0,a[5]=u,a[9]=0,a[13]=_,a[2]=0,a[6]=0,a[10]=d,a[14]=m,a[3]=0,a[7]=0,a[11]=0,a[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let i=0;i<16;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}};bo.prototype.isMatrix4=!0;let qe=bo;const qi=new L,Sn=new qe,kd=new L(0,0,0),Gd=new L(1,1,1),hi=new L,br=new L,an=new L,Nl=new qe,Ul=new rn;class ri{constructor(e=0,t=0,n=0,i=ri.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,i=this._order){return this._x=e,this._y=t,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const i=e.elements,s=i[0],o=i[4],c=i[8],l=i[1],a=i[5],h=i[9],u=i[2],f=i[6],_=i[10];switch(t){case"XYZ":this._y=Math.asin(ot(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-h,_),this._z=Math.atan2(-o,s)):(this._x=Math.atan2(f,a),this._z=0);break;case"YXZ":this._x=Math.asin(-ot(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(c,_),this._z=Math.atan2(l,a)):(this._y=Math.atan2(-u,s),this._z=0);break;case"ZXY":this._x=Math.asin(ot(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-u,_),this._z=Math.atan2(-o,a)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-ot(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(f,_),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-o,a));break;case"YZX":this._z=Math.asin(ot(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,a),this._y=Math.atan2(-u,s)):(this._x=0,this._y=Math.atan2(c,_));break;case"XZY":this._z=Math.asin(-ot(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(f,a),this._y=Math.atan2(c,s)):(this._x=Math.atan2(-h,_),this._y=0);break;default:Ne("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return Nl.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Nl,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Ul.setFromEuler(this),this.setFromQuaternion(Ul,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}ri.DEFAULT_ORDER="XYZ";class Kc{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let Vd=0;const Fl=new L,Yi=new rn,Yn=new qe,wr=new L,Ns=new L,Hd=new L,Wd=new rn,Ol=new L(1,0,0),Bl=new L(0,1,0),zl=new L(0,0,1),kl={type:"added"},Xd={type:"removed"},Ki={type:"childadded",child:null},ko={type:"childremoved",child:null};class bt extends bi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Vd++}),this.uuid=Mn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=bt.DEFAULT_UP.clone();const e=new L,t=new ri,n=new rn,i=new L(1,1,1);function s(){n.setFromEuler(t,!1)}function o(){t.setFromQuaternion(n,void 0,!1)}t._onChange(s),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new qe},normalMatrix:{value:new Ze}}),this.matrix=new qe,this.matrixWorld=new qe,this.matrixAutoUpdate=bt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=bt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Kc,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Yi.setFromAxisAngle(e,t),this.quaternion.multiply(Yi),this}rotateOnWorldAxis(e,t){return Yi.setFromAxisAngle(e,t),this.quaternion.premultiply(Yi),this}rotateX(e){return this.rotateOnAxis(Ol,e)}rotateY(e){return this.rotateOnAxis(Bl,e)}rotateZ(e){return this.rotateOnAxis(zl,e)}translateOnAxis(e,t){return Fl.copy(e).applyQuaternion(this.quaternion),this.position.add(Fl.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Ol,e)}translateY(e){return this.translateOnAxis(Bl,e)}translateZ(e){return this.translateOnAxis(zl,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Yn.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?wr.copy(e):wr.set(e,t,n);const i=this.parent;this.updateWorldMatrix(!0,!1),Ns.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Yn.lookAt(Ns,wr,this.up):Yn.lookAt(wr,Ns,this.up),this.quaternion.setFromRotationMatrix(Yn),i&&(Yn.extractRotation(i.matrixWorld),Yi.setFromRotationMatrix(Yn),this.quaternion.premultiply(Yi.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(ke("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(kl),Ki.child=e,this.dispatchEvent(Ki),Ki.child=null):ke("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Xd),ko.child=e,this.dispatchEvent(ko),ko.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Yn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Yn.multiply(e.parent.matrixWorld)),e.applyMatrix4(Yn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(kl),Ki.child=e,this.dispatchEvent(Ki),Ki.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,i=this.children.length;n<i;n++){const o=this.children[n].getObjectByProperty(e,t);if(o!==void 0)return o}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const i=this.children;for(let s=0,o=i.length;s<o;s++)i[s].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ns,e,Hd),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ns,Wd,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const e=this.pivot;if(e!==null){const t=e.x,n=e.y,i=e.z,s=this.matrix.elements;s[12]+=t-s[0]*t-s[4]*n-s[8]*i,s[13]+=n-s[1]*t-s[5]*n-s[9]*i,s[14]+=i-s[2]*t-s[6]*n-s[10]*i}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){const n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const i=this.children;for(let s=0,o=i.length;s<o;s++)i[s].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const i={};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),this.static!==!1&&(i.static=this.static),Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.pivot!==null&&(i.pivot=this.pivot.toArray()),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.morphTargetDictionary!==void 0&&(i.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(i.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.geometryInfo=this._geometryInfo.map(c=>({...c,boundingBox:c.boundingBox?c.boundingBox.toJSON():void 0,boundingSphere:c.boundingSphere?c.boundingSphere.toJSON():void 0})),i.instanceInfo=this._instanceInfo.map(c=>({...c})),i.availableInstanceIds=this._availableInstanceIds.slice(),i.availableGeometryIds=this._availableGeometryIds.slice(),i.nextIndexStart=this._nextIndexStart,i.nextVertexStart=this._nextVertexStart,i.geometryCount=this._geometryCount,i.maxInstanceCount=this._maxInstanceCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.matricesTexture=this._matricesTexture.toJSON(e),i.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(i.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(i.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(i.boundingBox=this.boundingBox.toJSON()));function s(c,l){return c[l.uuid]===void 0&&(c[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=s(e.geometries,this.geometry);const c=this.geometry.parameters;if(c!==void 0&&c.shapes!==void 0){const l=c.shapes;if(Array.isArray(l))for(let a=0,h=l.length;a<h;a++){const u=l[a];s(e.shapes,u)}else s(e.shapes,l)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const c=[];for(let l=0,a=this.material.length;l<a;l++)c.push(s(e.materials,this.material[l]));i.material=c}else i.material=s(e.materials,this.material);if(this.children.length>0){i.children=[];for(let c=0;c<this.children.length;c++)i.children.push(this.children[c].toJSON(e).object)}if(this.animations.length>0){i.animations=[];for(let c=0;c<this.animations.length;c++){const l=this.animations[c];i.animations.push(s(e.animations,l))}}if(t){const c=o(e.geometries),l=o(e.materials),a=o(e.textures),h=o(e.images),u=o(e.shapes),f=o(e.skeletons),_=o(e.animations),d=o(e.nodes);c.length>0&&(n.geometries=c),l.length>0&&(n.materials=l),a.length>0&&(n.textures=a),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),f.length>0&&(n.skeletons=f),_.length>0&&(n.animations=_),d.length>0&&(n.nodes=d)}return n.object=i,n;function o(c){const l=[];for(const a in c){const h=c[a];delete h.metadata,l.push(h)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const i=e.children[n];this.add(i.clone())}return this}}bt.DEFAULT_UP=new L(0,1,0);bt.DEFAULT_MATRIX_AUTO_UPDATE=!0;bt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class gt extends bt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const qd={type:"move"};class Go{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new gt,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new gt,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new L,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new L),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new gt,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new L,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new L,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let i=null,s=null,o=null;const c=this._targetRay,l=this._grip,a=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(a&&e.hand){o=!0;for(const m of e.hand.values()){const p=t.getJointPose(m,n),g=this._getHandJoint(a,m);p!==null&&(g.matrix.fromArray(p.transform.matrix),g.matrix.decompose(g.position,g.rotation,g.scale),g.matrixWorldNeedsUpdate=!0,g.jointRadius=p.radius),g.visible=p!==null}const h=a.joints["index-finger-tip"],u=a.joints["thumb-tip"],f=h.position.distanceTo(u.position),_=.02,d=.005;a.inputState.pinching&&f>_+d?(a.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!a.inputState.pinching&&f<=_-d&&(a.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,n),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1,l.eventsEnabled&&l.dispatchEvent({type:"gripUpdated",data:e,target:this})));c!==null&&(i=t.getPose(e.targetRaySpace,n),i===null&&s!==null&&(i=s),i!==null&&(c.matrix.fromArray(i.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,i.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(i.linearVelocity)):c.hasLinearVelocity=!1,i.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(i.angularVelocity)):c.hasAngularVelocity=!1,this.dispatchEvent(qd)))}return c!==null&&(c.visible=i!==null),l!==null&&(l.visible=s!==null),a!==null&&(a.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new gt;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}const Su={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},ui={h:0,s:0,l:0},Tr={h:0,s:0,l:0};function Vo(r,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?r+(e-r)*6*t:t<1/2?e:t<2/3?r+(e-r)*6*(2/3-t):r}class ye{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const i=e;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Et){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,at.colorSpaceToWorking(this,t),this}setRGB(e,t,n,i=at.workingColorSpace){return this.r=e,this.g=t,this.b=n,at.colorSpaceToWorking(this,i),this}setHSL(e,t,n,i=at.workingColorSpace){if(e=qc(e,1),t=ot(t,0,1),n=ot(n,0,1),t===0)this.r=this.g=this.b=n;else{const s=n<=.5?n*(1+t):n+t-n*t,o=2*n-s;this.r=Vo(o,s,e+1/3),this.g=Vo(o,s,e),this.b=Vo(o,s,e-1/3)}return at.colorSpaceToWorking(this,i),this}setStyle(e,t=Et){function n(s){s!==void 0&&parseFloat(s)<1&&Ne("Color: Alpha component of "+e+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const o=i[1],c=i[2];switch(o){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(c))return n(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(c))return n(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(c))return n(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:Ne("Color: Unknown color model "+e)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=i[1],o=s.length;if(o===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(s,16),t);Ne("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Et){const n=Su[e.toLowerCase()];return n!==void 0?this.setHex(n,t):Ne("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=ni(e.r),this.g=ni(e.g),this.b=ni(e.b),this}copyLinearToSRGB(e){return this.r=ds(e.r),this.g=ds(e.g),this.b=ds(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Et){return at.workingToColorSpace(Jt.copy(this),e),Math.round(ot(Jt.r*255,0,255))*65536+Math.round(ot(Jt.g*255,0,255))*256+Math.round(ot(Jt.b*255,0,255))}getHexString(e=Et){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=at.workingColorSpace){at.workingToColorSpace(Jt.copy(this),t);const n=Jt.r,i=Jt.g,s=Jt.b,o=Math.max(n,i,s),c=Math.min(n,i,s);let l,a;const h=(c+o)/2;if(c===o)l=0,a=0;else{const u=o-c;switch(a=h<=.5?u/(o+c):u/(2-o-c),o){case n:l=(i-s)/u+(i<s?6:0);break;case i:l=(s-n)/u+2;break;case s:l=(n-i)/u+4;break}l/=6}return e.h=l,e.s=a,e.l=h,e}getRGB(e,t=at.workingColorSpace){return at.workingToColorSpace(Jt.copy(this),t),e.r=Jt.r,e.g=Jt.g,e.b=Jt.b,e}getStyle(e=Et){at.workingToColorSpace(Jt.copy(this),e);const t=Jt.r,n=Jt.g,i=Jt.b;return e!==Et?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(e,t,n){return this.getHSL(ui),this.setHSL(ui.h+e,ui.s+t,ui.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(ui),e.getHSL(Tr);const n=tr(ui.h,Tr.h,t),i=tr(ui.s,Tr.s,t),s=tr(ui.l,Tr.l,t);return this.setHSL(n,i,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,i=this.b,s=e.elements;return this.r=s[0]*t+s[3]*n+s[6]*i,this.g=s[1]*t+s[4]*n+s[7]*i,this.b=s[2]*t+s[5]*n+s[8]*i,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Jt=new ye;ye.NAMES=Su;class xo{constructor(e,t=25e-5){this.isFogExp2=!0,this.name="",this.color=new ye(e),this.density=t}clone(){return new xo(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}}class Yd extends bt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new ri,this.environmentIntensity=1,this.environmentRotation=new ri,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}const bn=new L,Kn=new L,Ho=new L,jn=new L,ji=new L,Ji=new L,Gl=new L,Wo=new L,Xo=new L,qo=new L,Yo=new xt,Ko=new xt,jo=new xt;class _n{constructor(e=new L,t=new L,n=new L){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,i){i.subVectors(n,t),bn.subVectors(e,t),i.cross(bn);const s=i.lengthSq();return s>0?i.multiplyScalar(1/Math.sqrt(s)):i.set(0,0,0)}static getBarycoord(e,t,n,i,s){bn.subVectors(i,t),Kn.subVectors(n,t),Ho.subVectors(e,t);const o=bn.dot(bn),c=bn.dot(Kn),l=bn.dot(Ho),a=Kn.dot(Kn),h=Kn.dot(Ho),u=o*a-c*c;if(u===0)return s.set(0,0,0),null;const f=1/u,_=(a*l-c*h)*f,d=(o*h-c*l)*f;return s.set(1-_-d,d,_)}static containsPoint(e,t,n,i){return this.getBarycoord(e,t,n,i,jn)===null?!1:jn.x>=0&&jn.y>=0&&jn.x+jn.y<=1}static getInterpolation(e,t,n,i,s,o,c,l){return this.getBarycoord(e,t,n,i,jn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,jn.x),l.addScaledVector(o,jn.y),l.addScaledVector(c,jn.z),l)}static getInterpolatedAttribute(e,t,n,i,s,o){return Yo.setScalar(0),Ko.setScalar(0),jo.setScalar(0),Yo.fromBufferAttribute(e,t),Ko.fromBufferAttribute(e,n),jo.fromBufferAttribute(e,i),o.setScalar(0),o.addScaledVector(Yo,s.x),o.addScaledVector(Ko,s.y),o.addScaledVector(jo,s.z),o}static isFrontFacing(e,t,n,i){return bn.subVectors(n,t),Kn.subVectors(e,t),bn.cross(Kn).dot(i)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,i){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[i]),this}setFromAttributeAndIndices(e,t,n,i){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,i),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return bn.subVectors(this.c,this.b),Kn.subVectors(this.a,this.b),bn.cross(Kn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return _n.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return _n.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,i,s){return _n.getInterpolation(e,this.a,this.b,this.c,t,n,i,s)}containsPoint(e){return _n.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return _n.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,i=this.b,s=this.c;let o,c;ji.subVectors(i,n),Ji.subVectors(s,n),Wo.subVectors(e,n);const l=ji.dot(Wo),a=Ji.dot(Wo);if(l<=0&&a<=0)return t.copy(n);Xo.subVectors(e,i);const h=ji.dot(Xo),u=Ji.dot(Xo);if(h>=0&&u<=h)return t.copy(i);const f=l*u-h*a;if(f<=0&&l>=0&&h<=0)return o=l/(l-h),t.copy(n).addScaledVector(ji,o);qo.subVectors(e,s);const _=ji.dot(qo),d=Ji.dot(qo);if(d>=0&&_<=d)return t.copy(s);const m=_*a-l*d;if(m<=0&&a>=0&&d<=0)return c=a/(a-d),t.copy(n).addScaledVector(Ji,c);const p=h*d-_*u;if(p<=0&&u-h>=0&&_-d>=0)return Gl.subVectors(s,i),c=(u-h)/(u-h+(_-d)),t.copy(i).addScaledVector(Gl,c);const g=1/(p+m+f);return o=m*g,c=f*g,t.copy(n).addScaledVector(ji,o).addScaledVector(Ji,c)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}class Vn{constructor(e=new L(1/0,1/0,1/0),t=new L(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(wn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(wn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=wn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const s=n.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let o=0,c=s.count;o<c;o++)e.isMesh===!0?e.getVertexPosition(o,wn):wn.fromBufferAttribute(s,o),wn.applyMatrix4(e.matrixWorld),this.expandByPoint(wn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Er.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Er.copy(n.boundingBox)),Er.applyMatrix4(e.matrixWorld),this.union(Er)}const i=e.children;for(let s=0,o=i.length;s<o;s++)this.expandByObject(i[s],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,wn),wn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Us),Ar.subVectors(this.max,Us),Zi.subVectors(e.a,Us),$i.subVectors(e.b,Us),Qi.subVectors(e.c,Us),fi.subVectors($i,Zi),di.subVectors(Qi,$i),Ei.subVectors(Zi,Qi);let t=[0,-fi.z,fi.y,0,-di.z,di.y,0,-Ei.z,Ei.y,fi.z,0,-fi.x,di.z,0,-di.x,Ei.z,0,-Ei.x,-fi.y,fi.x,0,-di.y,di.x,0,-Ei.y,Ei.x,0];return!Jo(t,Zi,$i,Qi,Ar)||(t=[1,0,0,0,1,0,0,0,1],!Jo(t,Zi,$i,Qi,Ar))?!1:(Rr.crossVectors(fi,di),t=[Rr.x,Rr.y,Rr.z],Jo(t,Zi,$i,Qi,Ar))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,wn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(wn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Jn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Jn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Jn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Jn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Jn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Jn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Jn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Jn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Jn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const Jn=[new L,new L,new L,new L,new L,new L,new L,new L],wn=new L,Er=new Vn,Zi=new L,$i=new L,Qi=new L,fi=new L,di=new L,Ei=new L,Us=new L,Ar=new L,Rr=new L,Ai=new L;function Jo(r,e,t,n,i){for(let s=0,o=r.length-3;s<=o;s+=3){Ai.fromArray(r,s);const c=i.x*Math.abs(Ai.x)+i.y*Math.abs(Ai.y)+i.z*Math.abs(Ai.z),l=e.dot(Ai),a=t.dot(Ai),h=n.dot(Ai);if(Math.max(-Math.max(l,a,h),Math.min(l,a,h))>c)return!1}return!0}const Ut=new L,Cr=new ee;let Kd=0;class Dt extends bi{constructor(e,t,n=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Kd++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=pc,this.updateRanges=[],this.gpuType=vn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let i=0,s=this.itemSize;i<s;i++)this.array[e+i]=t.array[n+i];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)Cr.fromBufferAttribute(this,t),Cr.applyMatrix3(e),this.setXY(t,Cr.x,Cr.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)Ut.fromBufferAttribute(this,t),Ut.applyMatrix3(e),this.setXYZ(t,Ut.x,Ut.y,Ut.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)Ut.fromBufferAttribute(this,t),Ut.applyMatrix4(e),this.setXYZ(t,Ut.x,Ut.y,Ut.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Ut.fromBufferAttribute(this,t),Ut.applyNormalMatrix(e),this.setXYZ(t,Ut.x,Ut.y,Ut.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Ut.fromBufferAttribute(this,t),Ut.transformDirection(e),this.setXYZ(t,Ut.x,Ut.y,Ut.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=Tn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=_t(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Tn(t,this.array)),t}setX(e,t){return this.normalized&&(t=_t(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Tn(t,this.array)),t}setY(e,t){return this.normalized&&(t=_t(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Tn(t,this.array)),t}setZ(e,t){return this.normalized&&(t=_t(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Tn(t,this.array)),t}setW(e,t){return this.normalized&&(t=_t(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=_t(t,this.array),n=_t(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,i){return e*=this.itemSize,this.normalized&&(t=_t(t,this.array),n=_t(n,this.array),i=_t(i,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this}setXYZW(e,t,n,i,s){return e*=this.itemSize,this.normalized&&(t=_t(t,this.array),n=_t(n,this.array),i=_t(i,this.array),s=_t(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==pc&&(e.usage=this.usage),e}dispose(){this.dispatchEvent({type:"dispose"})}}class bu extends Dt{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class wu extends Dt{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class et extends Dt{constructor(e,t,n){super(new Float32Array(e),t,n)}}const jd=new Vn,Fs=new L,Zo=new L;class Hn{constructor(e=new L,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):jd.setFromPoints(e).getCenter(n);let i=0;for(let s=0,o=e.length;s<o;s++)i=Math.max(i,n.distanceToSquared(e[s]));return this.radius=Math.sqrt(i),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Fs.subVectors(e,this.center);const t=Fs.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),i=(n-this.radius)*.5;this.center.addScaledVector(Fs,i/n),this.radius+=i}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Zo.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Fs.copy(e.center).add(Zo)),this.expandByPoint(Fs.copy(e.center).sub(Zo))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}let Jd=0;const pn=new qe,$o=new bt,es=new L,cn=new Vn,Os=new Vn,Wt=new L;class Tt extends bi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Jd++}),this.uuid=Mn(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(dd(e)?wu:bu)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const s=new Ze().getNormalMatrix(e);n.applyNormalMatrix(s),n.needsUpdate=!0}const i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(e),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return pn.makeRotationFromQuaternion(e),this.applyMatrix4(pn),this}rotateX(e){return pn.makeRotationX(e),this.applyMatrix4(pn),this}rotateY(e){return pn.makeRotationY(e),this.applyMatrix4(pn),this}rotateZ(e){return pn.makeRotationZ(e),this.applyMatrix4(pn),this}translate(e,t,n){return pn.makeTranslation(e,t,n),this.applyMatrix4(pn),this}scale(e,t,n){return pn.makeScale(e,t,n),this.applyMatrix4(pn),this}lookAt(e){return $o.lookAt(e),$o.updateMatrix(),this.applyMatrix4($o.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(es).negate(),this.translate(es.x,es.y,es.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const n=[];for(let i=0,s=e.length;i<s;i++){const o=e[i];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new et(n,3))}else{const n=Math.min(e.length,t.count);for(let i=0;i<n;i++){const s=e[i];t.setXYZ(i,s.x,s.y,s.z||0)}e.length>t.count&&Ne("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Vn);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){ke("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new L(-1/0,-1/0,-1/0),new L(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,i=t.length;n<i;n++){const s=t[n];cn.setFromBufferAttribute(s),this.morphTargetsRelative?(Wt.addVectors(this.boundingBox.min,cn.min),this.boundingBox.expandByPoint(Wt),Wt.addVectors(this.boundingBox.max,cn.max),this.boundingBox.expandByPoint(Wt)):(this.boundingBox.expandByPoint(cn.min),this.boundingBox.expandByPoint(cn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&ke('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Hn);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){ke("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new L,1/0);return}if(e){const n=this.boundingSphere.center;if(cn.setFromBufferAttribute(e),t)for(let s=0,o=t.length;s<o;s++){const c=t[s];Os.setFromBufferAttribute(c),this.morphTargetsRelative?(Wt.addVectors(cn.min,Os.min),cn.expandByPoint(Wt),Wt.addVectors(cn.max,Os.max),cn.expandByPoint(Wt)):(cn.expandByPoint(Os.min),cn.expandByPoint(Os.max))}cn.getCenter(n);let i=0;for(let s=0,o=e.count;s<o;s++)Wt.fromBufferAttribute(e,s),i=Math.max(i,n.distanceToSquared(Wt));if(t)for(let s=0,o=t.length;s<o;s++){const c=t[s],l=this.morphTargetsRelative;for(let a=0,h=c.count;a<h;a++)Wt.fromBufferAttribute(c,a),l&&(es.fromBufferAttribute(e,a),Wt.add(es)),i=Math.max(i,n.distanceToSquared(Wt))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&ke('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){ke("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.position,i=t.normal,s=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Dt(new Float32Array(4*n.count),4));const o=this.getAttribute("tangent"),c=[],l=[];for(let M=0;M<n.count;M++)c[M]=new L,l[M]=new L;const a=new L,h=new L,u=new L,f=new ee,_=new ee,d=new ee,m=new L,p=new L;function g(M,T,C){a.fromBufferAttribute(n,M),h.fromBufferAttribute(n,T),u.fromBufferAttribute(n,C),f.fromBufferAttribute(s,M),_.fromBufferAttribute(s,T),d.fromBufferAttribute(s,C),h.sub(a),u.sub(a),_.sub(f),d.sub(f);const P=1/(_.x*d.y-d.x*_.y);isFinite(P)&&(m.copy(h).multiplyScalar(d.y).addScaledVector(u,-_.y).multiplyScalar(P),p.copy(u).multiplyScalar(_.x).addScaledVector(h,-d.x).multiplyScalar(P),c[M].add(m),c[T].add(m),c[C].add(m),l[M].add(p),l[T].add(p),l[C].add(p))}let x=this.groups;x.length===0&&(x=[{start:0,count:e.count}]);for(let M=0,T=x.length;M<T;++M){const C=x[M],P=C.start,I=C.count;for(let F=P,V=P+I;F<V;F+=3)g(e.getX(F+0),e.getX(F+1),e.getX(F+2))}const v=new L,y=new L,w=new L,b=new L;function A(M){w.fromBufferAttribute(i,M),b.copy(w);const T=c[M];v.copy(T),v.sub(w.multiplyScalar(w.dot(T))).normalize(),y.crossVectors(b,T);const P=y.dot(l[M])<0?-1:1;o.setXYZW(M,v.x,v.y,v.z,P)}for(let M=0,T=x.length;M<T;++M){const C=x[M],P=C.start,I=C.count;for(let F=P,V=P+I;F<V;F+=3)A(e.getX(F+0)),A(e.getX(F+1)),A(e.getX(F+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Dt(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let f=0,_=n.count;f<_;f++)n.setXYZ(f,0,0,0);const i=new L,s=new L,o=new L,c=new L,l=new L,a=new L,h=new L,u=new L;if(e)for(let f=0,_=e.count;f<_;f+=3){const d=e.getX(f+0),m=e.getX(f+1),p=e.getX(f+2);i.fromBufferAttribute(t,d),s.fromBufferAttribute(t,m),o.fromBufferAttribute(t,p),h.subVectors(o,s),u.subVectors(i,s),h.cross(u),c.fromBufferAttribute(n,d),l.fromBufferAttribute(n,m),a.fromBufferAttribute(n,p),c.add(h),l.add(h),a.add(h),n.setXYZ(d,c.x,c.y,c.z),n.setXYZ(m,l.x,l.y,l.z),n.setXYZ(p,a.x,a.y,a.z)}else for(let f=0,_=t.count;f<_;f+=3)i.fromBufferAttribute(t,f+0),s.fromBufferAttribute(t,f+1),o.fromBufferAttribute(t,f+2),h.subVectors(o,s),u.subVectors(i,s),h.cross(u),n.setXYZ(f+0,h.x,h.y,h.z),n.setXYZ(f+1,h.x,h.y,h.z),n.setXYZ(f+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Wt.fromBufferAttribute(e,t),Wt.normalize(),e.setXYZ(t,Wt.x,Wt.y,Wt.z)}toNonIndexed(){function e(c,l){const a=c.array,h=c.itemSize,u=c.normalized,f=new a.constructor(l.length*h);let _=0,d=0;for(let m=0,p=l.length;m<p;m++){c.isInterleavedBufferAttribute?_=l[m]*c.data.stride+c.offset:_=l[m]*h;for(let g=0;g<h;g++)f[d++]=a[_++]}return new Dt(f,h,u)}if(this.index===null)return Ne("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new Tt,n=this.index.array,i=this.attributes;for(const c in i){const l=i[c],a=e(l,n);t.setAttribute(c,a)}const s=this.morphAttributes;for(const c in s){const l=[],a=s[c];for(let h=0,u=a.length;h<u;h++){const f=a[h],_=e(f,n);l.push(_)}t.morphAttributes[c]=l}t.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let c=0,l=o.length;c<l;c++){const a=o[c];t.addGroup(a.start,a.count,a.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const a in l)l[a]!==void 0&&(e[a]=l[a]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const l in n){const a=n[l];e.data.attributes[l]=a.toJSON(e.data)}const i={};let s=!1;for(const l in this.morphAttributes){const a=this.morphAttributes[l],h=[];for(let u=0,f=a.length;u<f;u++){const _=a[u];h.push(_.toJSON(e.data))}h.length>0&&(i[l]=h,s=!0)}s&&(e.data.morphAttributes=i,e.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));const c=this.boundingSphere;return c!==null&&(e.data.boundingSphere=c.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone());const i=e.attributes;for(const a in i){const h=i[a];this.setAttribute(a,h.clone(t))}const s=e.morphAttributes;for(const a in s){const h=[],u=s[a];for(let f=0,_=u.length;f<_;f++)h.push(u[f].clone(t));this.morphAttributes[a]=h}this.morphTargetsRelative=e.morphTargetsRelative;const o=e.groups;for(let a=0,h=o.length;a<h;a++){const u=o[a];this.addGroup(u.start,u.count,u.materialIndex)}const c=e.boundingBox;c!==null&&(this.boundingBox=c.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Tu{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=pc,this.updateRanges=[],this.version=0,this.uuid=Mn()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let i=0,s=this.stride;i<s;i++)this.array[e+i]=t.array[n+i];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Mn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Mn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const Qt=new L;class fr{constructor(e,t,n,i=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=i}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)Qt.fromBufferAttribute(this,t),Qt.applyMatrix4(e),this.setXYZ(t,Qt.x,Qt.y,Qt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Qt.fromBufferAttribute(this,t),Qt.applyNormalMatrix(e),this.setXYZ(t,Qt.x,Qt.y,Qt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Qt.fromBufferAttribute(this,t),Qt.transformDirection(e),this.setXYZ(t,Qt.x,Qt.y,Qt.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=Tn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=_t(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=_t(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=_t(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=_t(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=_t(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=Tn(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=Tn(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=Tn(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=Tn(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=_t(t,this.array),n=_t(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=_t(t,this.array),n=_t(n,this.array),i=_t(i,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this}setXYZW(e,t,n,i,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=_t(t,this.array),n=_t(n,this.array),i=_t(i,this.array),s=_t(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this.data.array[e+3]=s,this}clone(e){if(e===void 0){_o("InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[i+s])}return new Dt(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new fr(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){_o("InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[i+s])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}let Zd=0;class An extends bi{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Zd++}),this.uuid=Mn(),this.name="",this.type="Material",this.blending=fs,this.side=ii,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Aa,this.blendDst=Ra,this.blendEquation=Li,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new ye(0,0,0),this.blendAlpha=0,this.depthFunc=gs,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Al,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Wi,this.stencilZFail=Wi,this.stencilZPass=Wi,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){Ne(`Material: parameter '${t}' has value of undefined.`);continue}const i=this[t];if(i===void 0){Ne(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==fs&&(n.blending=this.blending),this.side!==ii&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Aa&&(n.blendSrc=this.blendSrc),this.blendDst!==Ra&&(n.blendDst=this.blendDst),this.blendEquation!==Li&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==gs&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Al&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Wi&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Wi&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Wi&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.allowOverride===!1&&(n.allowOverride=!1),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(s){const o=[];for(const c in s){const l=s[c];delete l.metadata,o.push(l)}return o}if(t){const s=i(e.textures),o=i(e.images);s.length>0&&(n.textures=s),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const i=t.length;n=new Array(i);for(let s=0;s!==i;++s)n[s]=t[s].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class xi extends An{constructor(e){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new ye(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}let ts;const Bs=new L,ns=new L,is=new L,ss=new ee,zs=new ee,Eu=new qe,Pr=new L,ks=new L,Lr=new L,Vl=new ee,Qo=new ee,Hl=new ee;class Ii extends bt{constructor(e=new xi){if(super(),this.isSprite=!0,this.type="Sprite",ts===void 0){ts=new Tt;const t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new Tu(t,5);ts.setIndex([0,1,2,0,2,3]),ts.setAttribute("position",new fr(n,3,0,!1)),ts.setAttribute("uv",new fr(n,2,3,!1))}this.geometry=ts,this.material=e,this.center=new ee(.5,.5),this.count=1}raycast(e,t){e.camera===null&&ke('Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),ns.setFromMatrixScale(this.matrixWorld),Eu.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),is.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&ns.multiplyScalar(-is.z);const n=this.material.rotation;let i,s;n!==0&&(s=Math.cos(n),i=Math.sin(n));const o=this.center;Ir(Pr.set(-.5,-.5,0),is,o,ns,i,s),Ir(ks.set(.5,-.5,0),is,o,ns,i,s),Ir(Lr.set(.5,.5,0),is,o,ns,i,s),Vl.set(0,0),Qo.set(1,0),Hl.set(1,1);let c=e.ray.intersectTriangle(Pr,ks,Lr,!1,Bs);if(c===null&&(Ir(ks.set(-.5,.5,0),is,o,ns,i,s),Qo.set(0,1),c=e.ray.intersectTriangle(Pr,Lr,ks,!1,Bs),c===null))return;const l=e.ray.origin.distanceTo(Bs);l<e.near||l>e.far||t.push({distance:l,point:Bs.clone(),uv:_n.getInterpolation(Bs,Pr,ks,Lr,Vl,Qo,Hl,new ee),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}}function Ir(r,e,t,n,i,s){ss.subVectors(r,t).addScalar(.5).multiply(n),i!==void 0?(zs.x=s*ss.x-i*ss.y,zs.y=i*ss.x+s*ss.y):zs.copy(ss),r.copy(e),r.x+=zs.x,r.y+=zs.y,r.applyMatrix4(Eu)}const Zn=new L,ea=new L,Dr=new L,pi=new L,ta=new L,Nr=new L,na=new L;class gr{constructor(e=new L,t=new L(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Zn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=Zn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Zn.copy(this.origin).addScaledVector(this.direction,t),Zn.distanceToSquared(e))}distanceSqToSegment(e,t,n,i){ea.copy(e).add(t).multiplyScalar(.5),Dr.copy(t).sub(e).normalize(),pi.copy(this.origin).sub(ea);const s=e.distanceTo(t)*.5,o=-this.direction.dot(Dr),c=pi.dot(this.direction),l=-pi.dot(Dr),a=pi.lengthSq(),h=Math.abs(1-o*o);let u,f,_,d;if(h>0)if(u=o*l-c,f=o*c-l,d=s*h,u>=0)if(f>=-d)if(f<=d){const m=1/h;u*=m,f*=m,_=u*(u+o*f+2*c)+f*(o*u+f+2*l)+a}else f=s,u=Math.max(0,-(o*f+c)),_=-u*u+f*(f+2*l)+a;else f=-s,u=Math.max(0,-(o*f+c)),_=-u*u+f*(f+2*l)+a;else f<=-d?(u=Math.max(0,-(-o*s+c)),f=u>0?-s:Math.min(Math.max(-s,-l),s),_=-u*u+f*(f+2*l)+a):f<=d?(u=0,f=Math.min(Math.max(-s,-l),s),_=f*(f+2*l)+a):(u=Math.max(0,-(o*s+c)),f=u>0?s:Math.min(Math.max(-s,-l),s),_=-u*u+f*(f+2*l)+a);else f=o>0?-s:s,u=Math.max(0,-(o*f+c)),_=-u*u+f*(f+2*l)+a;return n&&n.copy(this.origin).addScaledVector(this.direction,u),i&&i.copy(ea).addScaledVector(Dr,f),_}intersectSphere(e,t){Zn.subVectors(e.center,this.origin);const n=Zn.dot(this.direction),i=Zn.dot(Zn)-n*n,s=e.radius*e.radius;if(i>s)return null;const o=Math.sqrt(s-i),c=n-o,l=n+o;return l<0?null:c<0?this.at(l,t):this.at(c,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,i,s,o,c,l;const a=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,f=this.origin;return a>=0?(n=(e.min.x-f.x)*a,i=(e.max.x-f.x)*a):(n=(e.max.x-f.x)*a,i=(e.min.x-f.x)*a),h>=0?(s=(e.min.y-f.y)*h,o=(e.max.y-f.y)*h):(s=(e.max.y-f.y)*h,o=(e.min.y-f.y)*h),n>o||s>i||((s>n||isNaN(n))&&(n=s),(o<i||isNaN(i))&&(i=o),u>=0?(c=(e.min.z-f.z)*u,l=(e.max.z-f.z)*u):(c=(e.max.z-f.z)*u,l=(e.min.z-f.z)*u),n>l||c>i)||((c>n||n!==n)&&(n=c),(l<i||i!==i)&&(i=l),i<0)?null:this.at(n>=0?n:i,t)}intersectsBox(e){return this.intersectBox(e,Zn)!==null}intersectTriangle(e,t,n,i,s){ta.subVectors(t,e),Nr.subVectors(n,e),na.crossVectors(ta,Nr);let o=this.direction.dot(na),c;if(o>0){if(i)return null;c=1}else if(o<0)c=-1,o=-o;else return null;pi.subVectors(this.origin,e);const l=c*this.direction.dot(Nr.crossVectors(pi,Nr));if(l<0)return null;const a=c*this.direction.dot(ta.cross(pi));if(a<0||l+a>o)return null;const h=-c*pi.dot(na);return h<0?null:this.at(h/o,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class kt extends An{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new ye(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ri,this.combine=lu,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const Wl=new qe,Ri=new gr,Ur=new Hn,Xl=new L,Fr=new L,Or=new L,Br=new L,ia=new L,zr=new L,ql=new L,kr=new L;class G extends bt{constructor(e=new Tt,t=new kt){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=i.length;s<o;s++){const c=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[c]=s}}}}getVertexPosition(e,t){const n=this.geometry,i=n.attributes.position,s=n.morphAttributes.position,o=n.morphTargetsRelative;t.fromBufferAttribute(i,e);const c=this.morphTargetInfluences;if(s&&c){zr.set(0,0,0);for(let l=0,a=s.length;l<a;l++){const h=c[l],u=s[l];h!==0&&(ia.fromBufferAttribute(u,e),o?zr.addScaledVector(ia,h):zr.addScaledVector(ia.sub(t),h))}t.add(zr)}return t}raycast(e,t){const n=this.geometry,i=this.material,s=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Ur.copy(n.boundingSphere),Ur.applyMatrix4(s),Ri.copy(e.ray).recast(e.near),!(Ur.containsPoint(Ri.origin)===!1&&(Ri.intersectSphere(Ur,Xl)===null||Ri.origin.distanceToSquared(Xl)>(e.far-e.near)**2))&&(Wl.copy(s).invert(),Ri.copy(e.ray).applyMatrix4(Wl),!(n.boundingBox!==null&&Ri.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,Ri)))}_computeIntersections(e,t,n){let i;const s=this.geometry,o=this.material,c=s.index,l=s.attributes.position,a=s.attributes.uv,h=s.attributes.uv1,u=s.attributes.normal,f=s.groups,_=s.drawRange;if(c!==null)if(Array.isArray(o))for(let d=0,m=f.length;d<m;d++){const p=f[d],g=o[p.materialIndex],x=Math.max(p.start,_.start),v=Math.min(c.count,Math.min(p.start+p.count,_.start+_.count));for(let y=x,w=v;y<w;y+=3){const b=c.getX(y),A=c.getX(y+1),M=c.getX(y+2);i=Gr(this,g,e,n,a,h,u,b,A,M),i&&(i.faceIndex=Math.floor(y/3),i.face.materialIndex=p.materialIndex,t.push(i))}}else{const d=Math.max(0,_.start),m=Math.min(c.count,_.start+_.count);for(let p=d,g=m;p<g;p+=3){const x=c.getX(p),v=c.getX(p+1),y=c.getX(p+2);i=Gr(this,o,e,n,a,h,u,x,v,y),i&&(i.faceIndex=Math.floor(p/3),t.push(i))}}else if(l!==void 0)if(Array.isArray(o))for(let d=0,m=f.length;d<m;d++){const p=f[d],g=o[p.materialIndex],x=Math.max(p.start,_.start),v=Math.min(l.count,Math.min(p.start+p.count,_.start+_.count));for(let y=x,w=v;y<w;y+=3){const b=y,A=y+1,M=y+2;i=Gr(this,g,e,n,a,h,u,b,A,M),i&&(i.faceIndex=Math.floor(y/3),i.face.materialIndex=p.materialIndex,t.push(i))}}else{const d=Math.max(0,_.start),m=Math.min(l.count,_.start+_.count);for(let p=d,g=m;p<g;p+=3){const x=p,v=p+1,y=p+2;i=Gr(this,o,e,n,a,h,u,x,v,y),i&&(i.faceIndex=Math.floor(p/3),t.push(i))}}}}function $d(r,e,t,n,i,s,o,c){let l;if(e.side===Zt?l=n.intersectTriangle(o,s,i,!0,c):l=n.intersectTriangle(i,s,o,e.side===ii,c),l===null)return null;kr.copy(c),kr.applyMatrix4(r.matrixWorld);const a=t.ray.origin.distanceTo(kr);return a<t.near||a>t.far?null:{distance:a,point:kr.clone(),object:r}}function Gr(r,e,t,n,i,s,o,c,l,a){r.getVertexPosition(c,Fr),r.getVertexPosition(l,Or),r.getVertexPosition(a,Br);const h=$d(r,e,t,n,Fr,Or,Br,ql);if(h){const u=new L;_n.getBarycoord(ql,Fr,Or,Br,u),i&&(h.uv=_n.getInterpolatedAttribute(i,c,l,a,u,new ee)),s&&(h.uv1=_n.getInterpolatedAttribute(s,c,l,a,u,new ee)),o&&(h.normal=_n.getInterpolatedAttribute(o,c,l,a,u,new L),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const f={a:c,b:l,c:a,normal:new L,materialIndex:0};_n.getNormal(Fr,Or,Br,f.normal),h.face=f,h.barycoord=u}return h}const Gs=new xt,Yl=new xt,Kl=new xt,Qd=new xt,jl=new qe,Vr=new L,sa=new Hn,Jl=new qe,ra=new gr;class ep extends G{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=Tl,this.bindMatrix=new qe,this.bindMatrixInverse=new qe,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){const e=this.geometry;this.boundingBox===null&&(this.boundingBox=new Vn),this.boundingBox.makeEmpty();const t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,Vr),this.boundingBox.expandByPoint(Vr)}computeBoundingSphere(){const e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new Hn),this.boundingSphere.makeEmpty();const t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,Vr),this.boundingSphere.expandByPoint(Vr)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}raycast(e,t){const n=this.material,i=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),sa.copy(this.boundingSphere),sa.applyMatrix4(i),e.ray.intersectsSphere(sa)!==!1&&(Jl.copy(i).invert(),ra.copy(e.ray).applyMatrix4(Jl),!(this.boundingBox!==null&&ra.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(e,t,ra)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){const e=new xt,t=this.geometry.attributes.skinWeight;for(let n=0,i=t.count;n<i;n++){e.fromBufferAttribute(t,n);const s=1/e.manhattanLength();s!==1/0?e.multiplyScalar(s):e.set(1,0,0,0),t.setXYZW(n,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===Tl?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===ed?this.bindMatrixInverse.copy(this.bindMatrix).invert():Ne("SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(e,t){const n=this.skeleton,i=this.geometry;Yl.fromBufferAttribute(i.attributes.skinIndex,e),Kl.fromBufferAttribute(i.attributes.skinWeight,e),t.isVector4?(Gs.copy(t),t.set(0,0,0,0)):(Gs.set(...t,1),t.set(0,0,0)),Gs.applyMatrix4(this.bindMatrix);for(let s=0;s<4;s++){const o=Kl.getComponent(s);if(o!==0){const c=Yl.getComponent(s);jl.multiplyMatrices(n.bones[c].matrixWorld,n.boneInverses[c]),t.addScaledVector(Qd.copy(Gs).applyMatrix4(jl),o)}}return t.isVector4&&(t.w=Gs.w),t.applyMatrix4(this.bindMatrixInverse)}}class Au extends bt{constructor(){super(),this.isBone=!0,this.type="Bone"}}class jc extends Gt{constructor(e=null,t=1,n=1,i,s,o,c,l,a=Bt,h=Bt,u,f){super(null,o,c,l,a,h,i,s,u,f),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const Zl=new qe,tp=new qe;class Jc{constructor(e=[],t=[]){this.uuid=Mn(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.previousBoneMatrices=null,this.boneTexture=null,this.init()}init(){const e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){Ne("Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,i=this.bones.length;n<i;n++)this.boneInverses.push(new qe)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){const n=new qe;this.bones[e]&&n.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&n.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){const e=this.bones,t=this.boneInverses,n=this.boneMatrices,i=this.boneTexture;for(let s=0,o=e.length;s<o;s++){const c=e[s]?e[s].matrixWorld:tp;Zl.multiplyMatrices(c,t[s]),Zl.toArray(n,s*16)}i!==null&&(i.needsUpdate=!0)}clone(){return new Jc(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);const t=new Float32Array(e*e*4);t.set(this.boneMatrices);const n=new jc(t,e,e,yn,vn);return n.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=n,this}getBoneByName(e){for(let t=0,n=this.bones.length;t<n;t++){const i=this.bones[t];if(i.name===e)return i}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let n=0,i=e.bones.length;n<i;n++){const s=e.bones[n];let o=t[s];o===void 0&&(Ne("Skeleton: No bone found with UUID:",s),o=new Au),this.bones.push(o),this.boneInverses.push(new qe().fromArray(e.boneInverses[n]))}return this.init(),this}toJSON(){const e={metadata:{version:4.7,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;const t=this.bones,n=this.boneInverses;for(let i=0,s=t.length;i<s;i++){const o=t[i];e.bones.push(o.uuid);const c=n[i];e.boneInverses.push(c.toArray())}return e}}class gc extends Dt{constructor(e,t,n,i=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=i}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const rs=new qe,$l=new qe,Hr=[],Ql=new Vn,np=new qe,Vs=new G,Hs=new Hn;class Ru extends G{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new gc(new Float32Array(n*16),16),this.previousInstanceMatrix=null,this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let i=0;i<n;i++)this.setMatrixAt(i,np)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new Vn),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,rs),Ql.copy(e.boundingBox).applyMatrix4(rs),this.boundingBox.union(Ql)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new Hn),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,rs),Hs.copy(e.boundingSphere).applyMatrix4(rs),this.boundingSphere.union(Hs)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.previousInstanceMatrix!==null&&(this.previousInstanceMatrix=e.previousInstanceMatrix.clone()),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){return this.instanceColor===null?t.setRGB(1,1,1):t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){return t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){const n=t.morphTargetInfluences,i=this.morphTexture.source.data.data,s=n.length+1,o=e*s+1;for(let c=0;c<n.length;c++)n[c]=i[o+c]}raycast(e,t){const n=this.matrixWorld,i=this.count;if(Vs.geometry=this.geometry,Vs.material=this.material,Vs.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Hs.copy(this.boundingSphere),Hs.applyMatrix4(n),e.ray.intersectsSphere(Hs)!==!1))for(let s=0;s<i;s++){this.getMatrixAt(s,rs),$l.multiplyMatrices(n,rs),Vs.matrixWorld=$l,Vs.raycast(e,Hr);for(let o=0,c=Hr.length;o<c;o++){const l=Hr[o];l.instanceId=s,l.object=this,t.push(l)}Hr.length=0}}setColorAt(e,t){return this.instanceColor===null&&(this.instanceColor=new gc(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3),this}setMatrixAt(e,t){return t.toArray(this.instanceMatrix.array,e*16),this}setMorphAt(e,t){const n=t.morphTargetInfluences,i=n.length+1;this.morphTexture===null&&(this.morphTexture=new jc(new Float32Array(i*this.count),i,this.count,zc,vn));const s=this.morphTexture.source.data.data;let o=0;for(let a=0;a<n.length;a++)o+=n[a];const c=this.geometry.morphTargetsRelative?1:1-o,l=i*e;return s[l]=c,s.set(n,l+1),this}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}}const oa=new L,ip=new L,sp=new Ze;class _i{constructor(e=new L(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,i){return this.normal.set(e,t,n),this.constant=i,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const i=oa.subVectors(n,t).cross(ip.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(i,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,n=!0){const i=e.delta(oa),s=this.normal.dot(i);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const o=-(e.start.dot(this.normal)+this.constant)/s;return n===!0&&(o<0||o>1)?null:t.copy(e.start).addScaledVector(i,o)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||sp.getNormalMatrix(e),i=this.coplanarPoint(oa).applyMatrix4(e),s=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Ci=new Hn,rp=new ee(.5,.5),Wr=new L;class Zc{constructor(e=new _i,t=new _i,n=new _i,i=new _i,s=new _i,o=new _i){this.planes=[e,t,n,i,s,o]}set(e,t,n,i,s,o){const c=this.planes;return c[0].copy(e),c[1].copy(t),c[2].copy(n),c[3].copy(i),c[4].copy(s),c[5].copy(o),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=Bn,n=!1){const i=this.planes,s=e.elements,o=s[0],c=s[1],l=s[2],a=s[3],h=s[4],u=s[5],f=s[6],_=s[7],d=s[8],m=s[9],p=s[10],g=s[11],x=s[12],v=s[13],y=s[14],w=s[15];if(i[0].setComponents(a-o,_-h,g-d,w-x).normalize(),i[1].setComponents(a+o,_+h,g+d,w+x).normalize(),i[2].setComponents(a+c,_+u,g+m,w+v).normalize(),i[3].setComponents(a-c,_-u,g-m,w-v).normalize(),n)i[4].setComponents(l,f,p,y).normalize(),i[5].setComponents(a-l,_-f,g-p,w-y).normalize();else if(i[4].setComponents(a-l,_-f,g-p,w-y).normalize(),t===Bn)i[5].setComponents(a+l,_+f,g+p,w+y).normalize();else if(t===hr)i[5].setComponents(l,f,p,y).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Ci.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Ci.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Ci)}intersectsSprite(e){Ci.center.set(0,0,0);const t=rp.distanceTo(e.center);return Ci.radius=.7071067811865476+t,Ci.applyMatrix4(e.matrixWorld),this.intersectsSphere(Ci)}intersectsSphere(e){const t=this.planes,n=e.center,i=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(n)<i)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const i=t[n];if(Wr.x=i.normal.x>0?e.max.x:e.min.x,Wr.y=i.normal.y>0?e.max.y:e.min.y,Wr.z=i.normal.z>0?e.max.z:e.min.z,i.distanceToPoint(Wr)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class Cu extends An{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new ye(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const vo=new L,yo=new L,eh=new qe,Ws=new gr,Xr=new Hn,aa=new L,th=new L;class $c extends bt{constructor(e=new Tt,t=new Cu){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[0];for(let i=1,s=t.count;i<s;i++)vo.fromBufferAttribute(t,i-1),yo.fromBufferAttribute(t,i),n[i]=n[i-1],n[i]+=vo.distanceTo(yo);e.setAttribute("lineDistance",new et(n,1))}else Ne("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const n=this.geometry,i=this.matrixWorld,s=e.params.Line.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Xr.copy(n.boundingSphere),Xr.applyMatrix4(i),Xr.radius+=s,e.ray.intersectsSphere(Xr)===!1)return;eh.copy(i).invert(),Ws.copy(e.ray).applyMatrix4(eh);const c=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=c*c,a=this.isLineSegments?2:1,h=n.index,f=n.attributes.position;if(h!==null){const _=Math.max(0,o.start),d=Math.min(h.count,o.start+o.count);for(let m=_,p=d-1;m<p;m+=a){const g=h.getX(m),x=h.getX(m+1),v=qr(this,e,Ws,l,g,x,m);v&&t.push(v)}if(this.isLineLoop){const m=h.getX(d-1),p=h.getX(_),g=qr(this,e,Ws,l,m,p,d-1);g&&t.push(g)}}else{const _=Math.max(0,o.start),d=Math.min(f.count,o.start+o.count);for(let m=_,p=d-1;m<p;m+=a){const g=qr(this,e,Ws,l,m,m+1,m);g&&t.push(g)}if(this.isLineLoop){const m=qr(this,e,Ws,l,d-1,_,d-1);m&&t.push(m)}}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=i.length;s<o;s++){const c=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[c]=s}}}}}function qr(r,e,t,n,i,s,o){const c=r.geometry.attributes.position;if(vo.fromBufferAttribute(c,i),yo.fromBufferAttribute(c,s),t.distanceSqToSegment(vo,yo,aa,th)>n)return;aa.applyMatrix4(r.matrixWorld);const a=e.ray.origin.distanceTo(aa);if(!(a<e.near||a>e.far))return{distance:a,point:th.clone().applyMatrix4(r.matrixWorld),index:o,face:null,faceIndex:null,barycoord:null,object:r}}const nh=new L,ih=new L;class op extends $c{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[];for(let i=0,s=t.count;i<s;i+=2)nh.fromBufferAttribute(t,i),ih.fromBufferAttribute(t,i+1),n[i]=i===0?0:n[i-1],n[i+1]=n[i]+nh.distanceTo(ih);e.setAttribute("lineDistance",new et(n,1))}else Ne("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class ap extends $c{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type="LineLoop"}}class Qc extends An{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new ye(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const sh=new qe,_c=new gr,Yr=new Hn,Kr=new L;class Pu extends bt{constructor(e=new Tt,t=new Qc){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){const n=this.geometry,i=this.matrixWorld,s=e.params.Points.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Yr.copy(n.boundingSphere),Yr.applyMatrix4(i),Yr.radius+=s,e.ray.intersectsSphere(Yr)===!1)return;sh.copy(i).invert(),_c.copy(e.ray).applyMatrix4(sh);const c=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=c*c,a=n.index,u=n.attributes.position;if(a!==null){const f=Math.max(0,o.start),_=Math.min(a.count,o.start+o.count);for(let d=f,m=_;d<m;d++){const p=a.getX(d);Kr.fromBufferAttribute(u,p),rh(Kr,p,l,i,e,t,this)}}else{const f=Math.max(0,o.start),_=Math.min(u.count,o.start+o.count);for(let d=f,m=_;d<m;d++)Kr.fromBufferAttribute(u,d),rh(Kr,d,l,i,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=i.length;s<o;s++){const c=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[c]=s}}}}}function rh(r,e,t,n,i,s,o){const c=_c.distanceSqToPoint(r);if(c<t){const l=new L;_c.closestPointToPoint(r,l),l.applyMatrix4(n);const a=i.ray.origin.distanceTo(l);if(a<i.near||a>i.far)return;s.push({distance:a,distanceToRay:Math.sqrt(c),point:l,index:e,face:null,faceIndex:null,barycoord:null,object:o})}}class Lu extends Gt{constructor(e=[],t=Ui,n,i,s,o,c,l,a,h){super(e,t,n,i,s,o,c,l,a,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class Mi extends Gt{constructor(e,t,n,i,s,o,c,l,a){super(e,t,n,i,s,o,c,l,a),this.isCanvasTexture=!0,this.needsUpdate=!0}}class vs extends Gt{constructor(e,t,n=Gn,i,s,o,c=Bt,l=Bt,a,h=si,u=1){if(h!==si&&h!==Ni)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const f={width:e,height:t,depth:u};super(f,i,s,o,c,l,h,n,a),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Yc(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}class cp extends vs{constructor(e,t=Gn,n=Ui,i,s,o=Bt,c=Bt,l,a=si){const h={width:e,height:e,depth:1},u=[h,h,h,h,h,h];super(e,e,t,n,i,s,o,c,l,a),this.image=u,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}}class Iu extends Gt{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class we extends Tt{constructor(e=1,t=1,n=1,i=1,s=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:i,heightSegments:s,depthSegments:o};const c=this;i=Math.floor(i),s=Math.floor(s),o=Math.floor(o);const l=[],a=[],h=[],u=[];let f=0,_=0;d("z","y","x",-1,-1,n,t,e,o,s,0),d("z","y","x",1,-1,n,t,-e,o,s,1),d("x","z","y",1,1,e,n,t,i,o,2),d("x","z","y",1,-1,e,n,-t,i,o,3),d("x","y","z",1,-1,e,t,n,i,s,4),d("x","y","z",-1,-1,e,t,-n,i,s,5),this.setIndex(l),this.setAttribute("position",new et(a,3)),this.setAttribute("normal",new et(h,3)),this.setAttribute("uv",new et(u,2));function d(m,p,g,x,v,y,w,b,A,M,T){const C=y/A,P=w/M,I=y/2,F=w/2,V=b/2,N=A+1,O=M+1;let z=0,j=0;const se=new L;for(let me=0;me<O;me++){const Te=me*P-F;for(let Le=0;Le<N;Le++){const tt=Le*C-I;se[m]=tt*x,se[p]=Te*v,se[g]=V,a.push(se.x,se.y,se.z),se[m]=0,se[p]=0,se[g]=b>0?1:-1,h.push(se.x,se.y,se.z),u.push(Le/A),u.push(1-me/M),z+=1}}for(let me=0;me<M;me++)for(let Te=0;Te<A;Te++){const Le=f+Te+N*me,tt=f+Te+N*(me+1),lt=f+(Te+1)+N*(me+1),Ye=f+(Te+1)+N*me;l.push(Le,tt,Ye),l.push(tt,lt,Ye),j+=6}c.addGroup(_,j,T),_+=j,f+=z}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new we(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}class Bi extends Tt{constructor(e=1,t=1,n=4,i=8,s=1){super(),this.type="CapsuleGeometry",this.parameters={radius:e,height:t,capSegments:n,radialSegments:i,heightSegments:s},t=Math.max(0,t),n=Math.max(1,Math.floor(n)),i=Math.max(3,Math.floor(i)),s=Math.max(1,Math.floor(s));const o=[],c=[],l=[],a=[],h=t/2,u=Math.PI/2*e,f=t,_=2*u+f,d=n*2+s,m=i+1,p=new L,g=new L;for(let x=0;x<=d;x++){let v=0,y=0,w=0,b=0;if(x<=n){const T=x/n,C=T*Math.PI/2;y=-h-e*Math.cos(C),w=e*Math.sin(C),b=-e*Math.cos(C),v=T*u}else if(x<=n+s){const T=(x-n)/s;y=-h+T*t,w=e,b=0,v=u+T*f}else{const T=(x-n-s)/n,C=T*Math.PI/2;y=h+e*Math.sin(C),w=e*Math.cos(C),b=e*Math.sin(C),v=u+f+T*u}const A=Math.max(0,Math.min(1,v/_));let M=0;x===0?M=.5/i:x===d&&(M=-.5/i);for(let T=0;T<=i;T++){const C=T/i,P=C*Math.PI*2,I=Math.sin(P),F=Math.cos(P);g.x=-w*F,g.y=y,g.z=w*I,c.push(g.x,g.y,g.z),p.set(-w*F,b,w*I),p.normalize(),l.push(p.x,p.y,p.z),a.push(C+M,A)}if(x>0){const T=(x-1)*m;for(let C=0;C<i;C++){const P=T+C,I=T+C+1,F=x*m+C,V=x*m+C+1;o.push(P,I,F),o.push(I,V,F)}}}this.setIndex(o),this.setAttribute("position",new et(c,3)),this.setAttribute("normal",new et(l,3)),this.setAttribute("uv",new et(a,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Bi(e.radius,e.height,e.capSegments,e.radialSegments,e.heightSegments)}}class ze extends Tt{constructor(e=1,t=1,n=1,i=32,s=1,o=!1,c=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:i,heightSegments:s,openEnded:o,thetaStart:c,thetaLength:l};const a=this;i=Math.floor(i),s=Math.floor(s);const h=[],u=[],f=[],_=[];let d=0;const m=[],p=n/2;let g=0;x(),o===!1&&(e>0&&v(!0),t>0&&v(!1)),this.setIndex(h),this.setAttribute("position",new et(u,3)),this.setAttribute("normal",new et(f,3)),this.setAttribute("uv",new et(_,2));function x(){const y=new L,w=new L;let b=0;const A=(t-e)/n;for(let M=0;M<=s;M++){const T=[],C=M/s,P=C*(t-e)+e;for(let I=0;I<=i;I++){const F=I/i,V=F*l+c,N=Math.sin(V),O=Math.cos(V);w.x=P*N,w.y=-C*n+p,w.z=P*O,u.push(w.x,w.y,w.z),y.set(N,A,O).normalize(),f.push(y.x,y.y,y.z),_.push(F,1-C),T.push(d++)}m.push(T)}for(let M=0;M<i;M++)for(let T=0;T<s;T++){const C=m[T][M],P=m[T+1][M],I=m[T+1][M+1],F=m[T][M+1];(e>0||T!==0)&&(h.push(C,P,F),b+=3),(t>0||T!==s-1)&&(h.push(P,I,F),b+=3)}a.addGroup(g,b,0),g+=b}function v(y){const w=d,b=new ee,A=new L;let M=0;const T=y===!0?e:t,C=y===!0?1:-1;for(let I=1;I<=i;I++)u.push(0,p*C,0),f.push(0,C,0),_.push(.5,.5),d++;const P=d;for(let I=0;I<=i;I++){const V=I/i*l+c,N=Math.cos(V),O=Math.sin(V);A.x=T*O,A.y=p*C,A.z=T*N,u.push(A.x,A.y,A.z),f.push(0,C,0),b.x=N*.5+.5,b.y=O*.5*C+.5,_.push(b.x,b.y),d++}for(let I=0;I<i;I++){const F=w+I,V=P+I;y===!0?h.push(V,V+1,F):h.push(V+1,V,F),M+=3}a.addGroup(g,M,y===!0?1:2),g+=M}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ze(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Yt extends ze{constructor(e=1,t=1,n=32,i=1,s=!1,o=0,c=Math.PI*2){super(0,e,t,n,i,s,o,c),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:n,heightSegments:i,openEnded:s,thetaStart:o,thetaLength:c}}static fromJSON(e){return new Yt(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class _r extends Tt{constructor(e=[],t=[],n=1,i=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:n,detail:i};const s=[],o=[];c(i),a(n),h(),this.setAttribute("position",new et(s,3)),this.setAttribute("normal",new et(s.slice(),3)),this.setAttribute("uv",new et(o,2)),i===0?this.computeVertexNormals():this.normalizeNormals();function c(x){const v=new L,y=new L,w=new L;for(let b=0;b<t.length;b+=3)_(t[b+0],v),_(t[b+1],y),_(t[b+2],w),l(v,y,w,x)}function l(x,v,y,w){const b=w+1,A=[];for(let M=0;M<=b;M++){A[M]=[];const T=x.clone().lerp(y,M/b),C=v.clone().lerp(y,M/b),P=b-M;for(let I=0;I<=P;I++)I===0&&M===b?A[M][I]=T:A[M][I]=T.clone().lerp(C,I/P)}for(let M=0;M<b;M++)for(let T=0;T<2*(b-M)-1;T++){const C=Math.floor(T/2);T%2===0?(f(A[M][C+1]),f(A[M+1][C]),f(A[M][C])):(f(A[M][C+1]),f(A[M+1][C+1]),f(A[M+1][C]))}}function a(x){const v=new L;for(let y=0;y<s.length;y+=3)v.x=s[y+0],v.y=s[y+1],v.z=s[y+2],v.normalize().multiplyScalar(x),s[y+0]=v.x,s[y+1]=v.y,s[y+2]=v.z}function h(){const x=new L;for(let v=0;v<s.length;v+=3){x.x=s[v+0],x.y=s[v+1],x.z=s[v+2];const y=p(x)/2/Math.PI+.5,w=g(x)/Math.PI+.5;o.push(y,1-w)}d(),u()}function u(){for(let x=0;x<o.length;x+=6){const v=o[x+0],y=o[x+2],w=o[x+4],b=Math.max(v,y,w),A=Math.min(v,y,w);b>.9&&A<.1&&(v<.2&&(o[x+0]+=1),y<.2&&(o[x+2]+=1),w<.2&&(o[x+4]+=1))}}function f(x){s.push(x.x,x.y,x.z)}function _(x,v){const y=x*3;v.x=e[y+0],v.y=e[y+1],v.z=e[y+2]}function d(){const x=new L,v=new L,y=new L,w=new L,b=new ee,A=new ee,M=new ee;for(let T=0,C=0;T<s.length;T+=9,C+=6){x.set(s[T+0],s[T+1],s[T+2]),v.set(s[T+3],s[T+4],s[T+5]),y.set(s[T+6],s[T+7],s[T+8]),b.set(o[C+0],o[C+1]),A.set(o[C+2],o[C+3]),M.set(o[C+4],o[C+5]),w.copy(x).add(v).add(y).divideScalar(3);const P=p(w);m(b,C+0,x,P),m(A,C+2,v,P),m(M,C+4,y,P)}}function m(x,v,y,w){w<0&&x.x===1&&(o[v]=x.x-1),y.x===0&&y.z===0&&(o[v]=w/2/Math.PI+.5)}function p(x){return Math.atan2(x.z,-x.x)}function g(x){return Math.atan2(-x.y,Math.sqrt(x.x*x.x+x.z*x.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new _r(e.vertices,e.indices,e.radius,e.detail)}}class vi extends _r{constructor(e=1,t=0){const n=(1+Math.sqrt(5))/2,i=1/n,s=[-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-i,-n,0,-i,n,0,i,-n,0,i,n,-i,-n,0,-i,n,0,i,-n,0,i,n,0,-n,0,-i,n,0,-i,-n,0,i,n,0,i],o=[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9];super(s,o,e,t),this.type="DodecahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new vi(e.radius,e.detail)}}class Wn{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){Ne("Curve: .getPoint() not implemented.")}getPointAt(e,t){const n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){const e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const t=[];let n,i=this.getPoint(0),s=0;t.push(0);for(let o=1;o<=e;o++)n=this.getPoint(o/e),s+=n.distanceTo(i),t.push(s),i=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){const n=this.getLengths();let i=0;const s=n.length;let o;t?o=t:o=e*n[s-1];let c=0,l=s-1,a;for(;c<=l;)if(i=Math.floor(c+(l-c)/2),a=n[i]-o,a<0)c=i+1;else if(a>0)l=i-1;else{l=i;break}if(i=l,n[i]===o)return i/(s-1);const h=n[i],f=n[i+1]-h,_=(o-h)/f;return(i+_)/(s-1)}getTangent(e,t){let i=e-1e-4,s=e+1e-4;i<0&&(i=0),s>1&&(s=1);const o=this.getPoint(i),c=this.getPoint(s),l=t||(o.isVector2?new ee:new L);return l.copy(c).sub(o).normalize(),l}getTangentAt(e,t){const n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t=!1){const n=new L,i=[],s=[],o=[],c=new L,l=new qe;for(let _=0;_<=e;_++){const d=_/e;i[_]=this.getTangentAt(d,new L)}s[0]=new L,o[0]=new L;let a=Number.MAX_VALUE;const h=Math.abs(i[0].x),u=Math.abs(i[0].y),f=Math.abs(i[0].z);h<=a&&(a=h,n.set(1,0,0)),u<=a&&(a=u,n.set(0,1,0)),f<=a&&n.set(0,0,1),c.crossVectors(i[0],n).normalize(),s[0].crossVectors(i[0],c),o[0].crossVectors(i[0],s[0]);for(let _=1;_<=e;_++){if(s[_]=s[_-1].clone(),o[_]=o[_-1].clone(),c.crossVectors(i[_-1],i[_]),c.length()>Number.EPSILON){c.normalize();const d=Math.acos(ot(i[_-1].dot(i[_]),-1,1));s[_].applyMatrix4(l.makeRotationAxis(c,d))}o[_].crossVectors(i[_],s[_])}if(t===!0){let _=Math.acos(ot(s[0].dot(s[e]),-1,1));_/=e,i[0].dot(c.crossVectors(s[0],s[e]))>0&&(_=-_);for(let d=1;d<=e;d++)s[d].applyMatrix4(l.makeRotationAxis(i[d],_*d)),o[d].crossVectors(i[d],s[d])}return{tangents:i,normals:s,binormals:o}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){const e={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}}class el extends Wn{constructor(e=0,t=0,n=1,i=1,s=0,o=Math.PI*2,c=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=i,this.aStartAngle=s,this.aEndAngle=o,this.aClockwise=c,this.aRotation=l}getPoint(e,t=new ee){const n=t,i=Math.PI*2;let s=this.aEndAngle-this.aStartAngle;const o=Math.abs(s)<Number.EPSILON;for(;s<0;)s+=i;for(;s>i;)s-=i;s<Number.EPSILON&&(o?s=0:s=i),this.aClockwise===!0&&!o&&(s===i?s=-i:s=s-i);const c=this.aStartAngle+e*s;let l=this.aX+this.xRadius*Math.cos(c),a=this.aY+this.yRadius*Math.sin(c);if(this.aRotation!==0){const h=Math.cos(this.aRotation),u=Math.sin(this.aRotation),f=l-this.aX,_=a-this.aY;l=f*h-_*u+this.aX,a=f*u+_*h+this.aY}return n.set(l,a)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){const e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}}class lp extends el{constructor(e,t,n,i,s,o){super(e,t,n,n,i,s,o),this.isArcCurve=!0,this.type="ArcCurve"}}function tl(){let r=0,e=0,t=0,n=0;function i(s,o,c,l){r=s,e=c,t=-3*s+3*o-2*c-l,n=2*s-2*o+c+l}return{initCatmullRom:function(s,o,c,l,a){i(o,c,a*(c-s),a*(l-o))},initNonuniformCatmullRom:function(s,o,c,l,a,h,u){let f=(o-s)/a-(c-s)/(a+h)+(c-o)/h,_=(c-o)/h-(l-o)/(h+u)+(l-c)/u;f*=h,_*=h,i(o,c,f,_)},calc:function(s){const o=s*s,c=o*s;return r+e*s+t*o+n*c}}}const oh=new L,ah=new L,ca=new tl,la=new tl,ha=new tl;class zi extends Wn{constructor(e=[],t=!1,n="centripetal",i=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=n,this.tension=i}getPoint(e,t=new L){const n=t,i=this.points,s=i.length,o=(s-(this.closed?0:1))*e;let c=Math.floor(o),l=o-c;this.closed?c+=c>0?0:(Math.floor(Math.abs(c)/s)+1)*s:l===0&&c===s-1&&(c=s-2,l=1);let a,h;this.closed||c>0?a=i[(c-1)%s]:(ah.subVectors(i[0],i[1]).add(i[0]),a=ah);const u=i[c%s],f=i[(c+1)%s];if(this.closed||c+2<s?h=i[(c+2)%s]:(oh.subVectors(i[s-1],i[s-2]).add(i[s-1]),h=oh),this.curveType==="centripetal"||this.curveType==="chordal"){const _=this.curveType==="chordal"?.5:.25;let d=Math.pow(a.distanceToSquared(u),_),m=Math.pow(u.distanceToSquared(f),_),p=Math.pow(f.distanceToSquared(h),_);m<1e-4&&(m=1),d<1e-4&&(d=m),p<1e-4&&(p=m),ca.initNonuniformCatmullRom(a.x,u.x,f.x,h.x,d,m,p),la.initNonuniformCatmullRom(a.y,u.y,f.y,h.y,d,m,p),ha.initNonuniformCatmullRom(a.z,u.z,f.z,h.z,d,m,p)}else this.curveType==="catmullrom"&&(ca.initCatmullRom(a.x,u.x,f.x,h.x,this.tension),la.initCatmullRom(a.y,u.y,f.y,h.y,this.tension),ha.initCatmullRom(a.z,u.z,f.z,h.z,this.tension));return n.set(ca.calc(l),la.calc(l),ha.calc(l)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const i=e.points[t];this.points.push(i.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){const i=this.points[t];e.points.push(i.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const i=e.points[t];this.points.push(new L().fromArray(i))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}}function ch(r,e,t,n,i){const s=(n-e)*.5,o=(i-t)*.5,c=r*r,l=r*c;return(2*t-2*n+s+o)*l+(-3*t+3*n-2*s-o)*c+s*r+t}function hp(r,e){const t=1-r;return t*t*e}function up(r,e){return 2*(1-r)*r*e}function fp(r,e){return r*r*e}function nr(r,e,t,n){return hp(r,e)+up(r,t)+fp(r,n)}function dp(r,e){const t=1-r;return t*t*t*e}function pp(r,e){const t=1-r;return 3*t*t*r*e}function mp(r,e){return 3*(1-r)*r*r*e}function gp(r,e){return r*r*r*e}function ir(r,e,t,n,i){return dp(r,e)+pp(r,t)+mp(r,n)+gp(r,i)}class Du extends Wn{constructor(e=new ee,t=new ee,n=new ee,i=new ee){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=n,this.v3=i}getPoint(e,t=new ee){const n=t,i=this.v0,s=this.v1,o=this.v2,c=this.v3;return n.set(ir(e,i.x,s.x,o.x,c.x),ir(e,i.y,s.y,o.y,c.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class _p extends Wn{constructor(e=new L,t=new L,n=new L,i=new L){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=n,this.v3=i}getPoint(e,t=new L){const n=t,i=this.v0,s=this.v1,o=this.v2,c=this.v3;return n.set(ir(e,i.x,s.x,o.x,c.x),ir(e,i.y,s.y,o.y,c.y),ir(e,i.z,s.z,o.z,c.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class Nu extends Wn{constructor(e=new ee,t=new ee){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new ee){const n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new ee){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class xp extends Wn{constructor(e=new L,t=new L){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new L){const n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new L){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Uu extends Wn{constructor(e=new ee,t=new ee,n=new ee){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new ee){const n=t,i=this.v0,s=this.v1,o=this.v2;return n.set(nr(e,i.x,s.x,o.x),nr(e,i.y,s.y,o.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Fu extends Wn{constructor(e=new L,t=new L,n=new L){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new L){const n=t,i=this.v0,s=this.v1,o=this.v2;return n.set(nr(e,i.x,s.x,o.x),nr(e,i.y,s.y,o.y),nr(e,i.z,s.z,o.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Ou extends Wn{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new ee){const n=t,i=this.points,s=(i.length-1)*e,o=Math.floor(s),c=s-o,l=i[o===0?o:o-1],a=i[o],h=i[o>i.length-2?i.length-1:o+1],u=i[o>i.length-3?i.length-1:o+2];return n.set(ch(c,l.x,a.x,h.x,u.x),ch(c,l.y,a.y,h.y,u.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const i=e.points[t];this.points.push(i.clone())}return this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){const i=this.points[t];e.points.push(i.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const i=e.points[t];this.points.push(new ee().fromArray(i))}return this}}var Mo=Object.freeze({__proto__:null,ArcCurve:lp,CatmullRomCurve3:zi,CubicBezierCurve:Du,CubicBezierCurve3:_p,EllipseCurve:el,LineCurve:Nu,LineCurve3:xp,QuadraticBezierCurve:Uu,QuadraticBezierCurve3:Fu,SplineCurve:Ou});class vp extends Wn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){const e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){const n=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new Mo[n](t,e))}return this}getPoint(e,t){const n=e*this.getLength(),i=this.getCurveLengths();let s=0;for(;s<i.length;){if(i[s]>=n){const o=i[s]-n,c=this.curves[s],l=c.getLength(),a=l===0?0:1-o/l;return c.getPointAt(a,t)}s++}return null}getLength(){const e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const e=[];let t=0;for(let n=0,i=this.curves.length;n<i;n++)t+=this.curves[n].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){const t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){const t=[];let n;for(let i=0,s=this.curves;i<s.length;i++){const o=s[i],c=o.isEllipseCurve?e*2:o.isLineCurve||o.isLineCurve3?1:o.isSplineCurve?e*o.points.length:e,l=o.getPoints(c);for(let a=0;a<l.length;a++){const h=l[a];n&&n.equals(h)||(t.push(h),n=h)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){const i=e.curves[t];this.curves.push(i.clone())}return this.autoClose=e.autoClose,this}toJSON(){const e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,n=this.curves.length;t<n;t++){const i=this.curves[t];e.curves.push(i.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){const i=e.curves[t];this.curves.push(new Mo[i.type]().fromJSON(i))}return this}}class lh extends vp{constructor(e){super(),this.type="Path",this.currentPoint=new ee,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,n=e.length;t<n;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){const n=new Nu(this.currentPoint.clone(),new ee(e,t));return this.curves.push(n),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,n,i){const s=new Uu(this.currentPoint.clone(),new ee(e,t),new ee(n,i));return this.curves.push(s),this.currentPoint.set(n,i),this}bezierCurveTo(e,t,n,i,s,o){const c=new Du(this.currentPoint.clone(),new ee(e,t),new ee(n,i),new ee(s,o));return this.curves.push(c),this.currentPoint.set(s,o),this}splineThru(e){const t=[this.currentPoint.clone()].concat(e),n=new Ou(t);return this.curves.push(n),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,n,i,s,o){const c=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(e+c,t+l,n,i,s,o),this}absarc(e,t,n,i,s,o){return this.absellipse(e,t,n,n,i,s,o),this}ellipse(e,t,n,i,s,o,c,l){const a=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(e+a,t+h,n,i,s,o,c,l),this}absellipse(e,t,n,i,s,o,c,l){const a=new el(e,t,n,i,s,o,c,l);if(this.curves.length>0){const u=a.getPoint(0);u.equals(this.currentPoint)||this.lineTo(u.x,u.y)}this.curves.push(a);const h=a.getPoint(1);return this.currentPoint.copy(h),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){const e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}}class ps extends lh{constructor(e){super(e),this.uuid=Mn(),this.type="Shape",this.holes=[]}getPointsHoles(e){const t=[];for(let n=0,i=this.holes.length;n<i;n++)t[n]=this.holes[n].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){const i=e.holes[t];this.holes.push(i.clone())}return this}toJSON(){const e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,n=this.holes.length;t<n;t++){const i=this.holes[t];e.holes.push(i.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){const i=e.holes[t];this.holes.push(new lh().fromJSON(i))}return this}}function yp(r,e,t=2){const n=e&&e.length,i=n?e[0]*t:r.length;let s=Bu(r,0,i,t,!0);const o=[];if(!s||s.next===s.prev)return o;let c,l,a;if(n&&(s=Tp(r,e,s,t)),r.length>80*t){c=r[0],l=r[1];let h=c,u=l;for(let f=t;f<i;f+=t){const _=r[f],d=r[f+1];_<c&&(c=_),d<l&&(l=d),_>h&&(h=_),d>u&&(u=d)}a=Math.max(h-c,u-l),a=a!==0?32767/a:0}return dr(s,o,t,c,l,a,0),o}function Bu(r,e,t,n,i){let s;if(i===Fp(r,e,t,n)>0)for(let o=e;o<t;o+=n)s=hh(o/n|0,r[o],r[o+1],s);else for(let o=t-n;o>=e;o-=n)s=hh(o/n|0,r[o],r[o+1],s);return s&&ys(s,s.next)&&(mr(s),s=s.next),s}function ki(r,e){if(!r)return r;e||(e=r);let t=r,n;do if(n=!1,!t.steiner&&(ys(t,t.next)||At(t.prev,t,t.next)===0)){if(mr(t),t=e=t.prev,t===t.next)break;n=!0}else t=t.next;while(n||t!==e);return e}function dr(r,e,t,n,i,s,o){if(!r)return;!o&&s&&Pp(r,n,i,s);let c=r;for(;r.prev!==r.next;){const l=r.prev,a=r.next;if(s?Sp(r,n,i,s):Mp(r)){e.push(l.i,r.i,a.i),mr(r),r=a.next,c=a.next;continue}if(r=a,r===c){o?o===1?(r=bp(ki(r),e),dr(r,e,t,n,i,s,2)):o===2&&wp(r,e,t,n,i,s):dr(ki(r),e,t,n,i,s,1);break}}}function Mp(r){const e=r.prev,t=r,n=r.next;if(At(e,t,n)>=0)return!1;const i=e.x,s=t.x,o=n.x,c=e.y,l=t.y,a=n.y,h=Math.min(i,s,o),u=Math.min(c,l,a),f=Math.max(i,s,o),_=Math.max(c,l,a);let d=n.next;for(;d!==e;){if(d.x>=h&&d.x<=f&&d.y>=u&&d.y<=_&&Zs(i,c,s,l,o,a,d.x,d.y)&&At(d.prev,d,d.next)>=0)return!1;d=d.next}return!0}function Sp(r,e,t,n){const i=r.prev,s=r,o=r.next;if(At(i,s,o)>=0)return!1;const c=i.x,l=s.x,a=o.x,h=i.y,u=s.y,f=o.y,_=Math.min(c,l,a),d=Math.min(h,u,f),m=Math.max(c,l,a),p=Math.max(h,u,f),g=xc(_,d,e,t,n),x=xc(m,p,e,t,n);let v=r.prevZ,y=r.nextZ;for(;v&&v.z>=g&&y&&y.z<=x;){if(v.x>=_&&v.x<=m&&v.y>=d&&v.y<=p&&v!==i&&v!==o&&Zs(c,h,l,u,a,f,v.x,v.y)&&At(v.prev,v,v.next)>=0||(v=v.prevZ,y.x>=_&&y.x<=m&&y.y>=d&&y.y<=p&&y!==i&&y!==o&&Zs(c,h,l,u,a,f,y.x,y.y)&&At(y.prev,y,y.next)>=0))return!1;y=y.nextZ}for(;v&&v.z>=g;){if(v.x>=_&&v.x<=m&&v.y>=d&&v.y<=p&&v!==i&&v!==o&&Zs(c,h,l,u,a,f,v.x,v.y)&&At(v.prev,v,v.next)>=0)return!1;v=v.prevZ}for(;y&&y.z<=x;){if(y.x>=_&&y.x<=m&&y.y>=d&&y.y<=p&&y!==i&&y!==o&&Zs(c,h,l,u,a,f,y.x,y.y)&&At(y.prev,y,y.next)>=0)return!1;y=y.nextZ}return!0}function bp(r,e){let t=r;do{const n=t.prev,i=t.next.next;!ys(n,i)&&ku(n,t,t.next,i)&&pr(n,i)&&pr(i,n)&&(e.push(n.i,t.i,i.i),mr(t),mr(t.next),t=r=i),t=t.next}while(t!==r);return ki(t)}function wp(r,e,t,n,i,s){let o=r;do{let c=o.next.next;for(;c!==o.prev;){if(o.i!==c.i&&Dp(o,c)){let l=Gu(o,c);o=ki(o,o.next),l=ki(l,l.next),dr(o,e,t,n,i,s,0),dr(l,e,t,n,i,s,0);return}c=c.next}o=o.next}while(o!==r)}function Tp(r,e,t,n){const i=[];for(let s=0,o=e.length;s<o;s++){const c=e[s]*n,l=s<o-1?e[s+1]*n:r.length,a=Bu(r,c,l,n,!1);a===a.next&&(a.steiner=!0),i.push(Ip(a))}i.sort(Ep);for(let s=0;s<i.length;s++)t=Ap(i[s],t);return t}function Ep(r,e){let t=r.x-e.x;if(t===0&&(t=r.y-e.y,t===0)){const n=(r.next.y-r.y)/(r.next.x-r.x),i=(e.next.y-e.y)/(e.next.x-e.x);t=n-i}return t}function Ap(r,e){const t=Rp(r,e);if(!t)return e;const n=Gu(t,r);return ki(n,n.next),ki(t,t.next)}function Rp(r,e){let t=e;const n=r.x,i=r.y;let s=-1/0,o;if(ys(r,t))return t;do{if(ys(r,t.next))return t.next;if(i<=t.y&&i>=t.next.y&&t.next.y!==t.y){const u=t.x+(i-t.y)*(t.next.x-t.x)/(t.next.y-t.y);if(u<=n&&u>s&&(s=u,o=t.x<t.next.x?t:t.next,u===n))return o}t=t.next}while(t!==e);if(!o)return null;const c=o,l=o.x,a=o.y;let h=1/0;t=o;do{if(n>=t.x&&t.x>=l&&n!==t.x&&zu(i<a?n:s,i,l,a,i<a?s:n,i,t.x,t.y)){const u=Math.abs(i-t.y)/(n-t.x);pr(t,r)&&(u<h||u===h&&(t.x>o.x||t.x===o.x&&Cp(o,t)))&&(o=t,h=u)}t=t.next}while(t!==c);return o}function Cp(r,e){return At(r.prev,r,e.prev)<0&&At(e.next,r,r.next)<0}function Pp(r,e,t,n){let i=r;do i.z===0&&(i.z=xc(i.x,i.y,e,t,n)),i.prevZ=i.prev,i.nextZ=i.next,i=i.next;while(i!==r);i.prevZ.nextZ=null,i.prevZ=null,Lp(i)}function Lp(r){let e,t=1;do{let n=r,i;r=null;let s=null;for(e=0;n;){e++;let o=n,c=0;for(let a=0;a<t&&(c++,o=o.nextZ,!!o);a++);let l=t;for(;c>0||l>0&&o;)c!==0&&(l===0||!o||n.z<=o.z)?(i=n,n=n.nextZ,c--):(i=o,o=o.nextZ,l--),s?s.nextZ=i:r=i,i.prevZ=s,s=i;n=o}s.nextZ=null,t*=2}while(e>1);return r}function xc(r,e,t,n,i){return r=(r-t)*i|0,e=(e-n)*i|0,r=(r|r<<8)&16711935,r=(r|r<<4)&252645135,r=(r|r<<2)&858993459,r=(r|r<<1)&1431655765,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,r|e<<1}function Ip(r){let e=r,t=r;do(e.x<t.x||e.x===t.x&&e.y<t.y)&&(t=e),e=e.next;while(e!==r);return t}function zu(r,e,t,n,i,s,o,c){return(i-o)*(e-c)>=(r-o)*(s-c)&&(r-o)*(n-c)>=(t-o)*(e-c)&&(t-o)*(s-c)>=(i-o)*(n-c)}function Zs(r,e,t,n,i,s,o,c){return!(r===o&&e===c)&&zu(r,e,t,n,i,s,o,c)}function Dp(r,e){return r.next.i!==e.i&&r.prev.i!==e.i&&!Np(r,e)&&(pr(r,e)&&pr(e,r)&&Up(r,e)&&(At(r.prev,r,e.prev)||At(r,e.prev,e))||ys(r,e)&&At(r.prev,r,r.next)>0&&At(e.prev,e,e.next)>0)}function At(r,e,t){return(e.y-r.y)*(t.x-e.x)-(e.x-r.x)*(t.y-e.y)}function ys(r,e){return r.x===e.x&&r.y===e.y}function ku(r,e,t,n){const i=Jr(At(r,e,t)),s=Jr(At(r,e,n)),o=Jr(At(t,n,r)),c=Jr(At(t,n,e));return!!(i!==s&&o!==c||i===0&&jr(r,t,e)||s===0&&jr(r,n,e)||o===0&&jr(t,r,n)||c===0&&jr(t,e,n))}function jr(r,e,t){return e.x<=Math.max(r.x,t.x)&&e.x>=Math.min(r.x,t.x)&&e.y<=Math.max(r.y,t.y)&&e.y>=Math.min(r.y,t.y)}function Jr(r){return r>0?1:r<0?-1:0}function Np(r,e){let t=r;do{if(t.i!==r.i&&t.next.i!==r.i&&t.i!==e.i&&t.next.i!==e.i&&ku(t,t.next,r,e))return!0;t=t.next}while(t!==r);return!1}function pr(r,e){return At(r.prev,r,r.next)<0?At(r,e,r.next)>=0&&At(r,r.prev,e)>=0:At(r,e,r.prev)<0||At(r,r.next,e)<0}function Up(r,e){let t=r,n=!1;const i=(r.x+e.x)/2,s=(r.y+e.y)/2;do t.y>s!=t.next.y>s&&t.next.y!==t.y&&i<(t.next.x-t.x)*(s-t.y)/(t.next.y-t.y)+t.x&&(n=!n),t=t.next;while(t!==r);return n}function Gu(r,e){const t=vc(r.i,r.x,r.y),n=vc(e.i,e.x,e.y),i=r.next,s=e.prev;return r.next=e,e.prev=r,t.next=i,i.prev=t,n.next=t,t.prev=n,s.next=n,n.prev=s,n}function hh(r,e,t,n){const i=vc(r,e,t);return n?(i.next=n.next,i.prev=n,n.next.prev=i,n.next=i):(i.prev=i,i.next=i),i}function mr(r){r.next.prev=r.prev,r.prev.next=r.next,r.prevZ&&(r.prevZ.nextZ=r.nextZ),r.nextZ&&(r.nextZ.prevZ=r.prevZ)}function vc(r,e,t){return{i:r,x:e,y:t,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function Fp(r,e,t,n){let i=0;for(let s=e,o=t-n;s<t;s+=n)i+=(r[o]-r[s])*(r[s+1]+r[o+1]),o=s;return i}class Op{static triangulate(e,t,n=2){return yp(e,t,n)}}class ei{static area(e){const t=e.length;let n=0;for(let i=t-1,s=0;s<t;i=s++)n+=e[i].x*e[s].y-e[s].x*e[i].y;return n*.5}static isClockWise(e){return ei.area(e)<0}static triangulateShape(e,t){const n=[],i=[],s=[];uh(e),fh(n,e);let o=e.length;t.forEach(uh);for(let l=0;l<t.length;l++)i.push(o),o+=t[l].length,fh(n,t[l]);const c=Op.triangulate(n,i);for(let l=0;l<c.length;l+=3)s.push(c.slice(l,l+3));return s}}function uh(r){const e=r.length;e>2&&r[e-1].equals(r[0])&&r.pop()}function fh(r,e){for(let t=0;t<e.length;t++)r.push(e[t].x),r.push(e[t].y)}class Eo extends Tt{constructor(e=new ps([new ee(.5,.5),new ee(-.5,.5),new ee(-.5,-.5),new ee(.5,-.5)]),t={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:e,options:t},e=Array.isArray(e)?e:[e];const n=this,i=[],s=[];for(let c=0,l=e.length;c<l;c++){const a=e[c];o(a)}this.setAttribute("position",new et(i,3)),this.setAttribute("uv",new et(s,2)),this.computeVertexNormals();function o(c){const l=[],a=t.curveSegments!==void 0?t.curveSegments:12,h=t.steps!==void 0?t.steps:1,u=t.depth!==void 0?t.depth:1;let f=t.bevelEnabled!==void 0?t.bevelEnabled:!0,_=t.bevelThickness!==void 0?t.bevelThickness:.2,d=t.bevelSize!==void 0?t.bevelSize:_-.1,m=t.bevelOffset!==void 0?t.bevelOffset:0,p=t.bevelSegments!==void 0?t.bevelSegments:3;const g=t.extrudePath,x=t.UVGenerator!==void 0?t.UVGenerator:Bp;let v,y=!1,w,b,A,M;if(g){v=g.getSpacedPoints(h),y=!0,f=!1;const $=g.isCatmullRomCurve3?g.closed:!1;w=g.computeFrenetFrames(h,$),b=new L,A=new L,M=new L}f||(p=0,_=0,d=0,m=0);const T=c.extractPoints(a);let C=T.shape;const P=T.holes;if(!ei.isClockWise(C)){C=C.reverse();for(let $=0,re=P.length;$<re;$++){const te=P[$];ei.isClockWise(te)&&(P[$]=te.reverse())}}function F($){const te=10000000000000001e-36;let Me=$[0];for(let ge=1;ge<=$.length;ge++){const We=ge%$.length,D=$[We],Ke=D.x-Me.x,Ie=D.y-Me.y,Xe=Ke*Ke+Ie*Ie,oe=Math.max(Math.abs(D.x),Math.abs(D.y),Math.abs(Me.x),Math.abs(Me.y)),dt=te*oe*oe;if(Xe<=dt){$.splice(We,1),ge--;continue}Me=D}}F(C),P.forEach(F);const V=P.length,N=C;for(let $=0;$<V;$++){const re=P[$];C=C.concat(re)}function O($,re,te){return re||ke("ExtrudeGeometry: vec does not exist"),$.clone().addScaledVector(re,te)}const z=C.length;function j($,re,te){let Me,ge,We;const D=$.x-re.x,Ke=$.y-re.y,Ie=te.x-$.x,Xe=te.y-$.y,oe=D*D+Ke*Ke,dt=D*Xe-Ke*Ie;if(Math.abs(dt)>Number.EPSILON){const R=Math.sqrt(oe),S=Math.sqrt(Ie*Ie+Xe*Xe),k=re.x-Ke/R,K=re.y+D/R,ne=te.x-Xe/S,ae=te.y+Ie/S,ue=((ne-k)*Xe-(ae-K)*Ie)/(D*Xe-Ke*Ie);Me=k+D*ue-$.x,ge=K+Ke*ue-$.y;const q=Me*Me+ge*ge;if(q<=2)return new ee(Me,ge);We=Math.sqrt(q/2)}else{let R=!1;D>Number.EPSILON?Ie>Number.EPSILON&&(R=!0):D<-Number.EPSILON?Ie<-Number.EPSILON&&(R=!0):Math.sign(Ke)===Math.sign(Xe)&&(R=!0),R?(Me=-Ke,ge=D,We=Math.sqrt(oe)):(Me=D,ge=Ke,We=Math.sqrt(oe/2))}return new ee(Me/We,ge/We)}const se=[];for(let $=0,re=N.length,te=re-1,Me=$+1;$<re;$++,te++,Me++)te===re&&(te=0),Me===re&&(Me=0),se[$]=j(N[$],N[te],N[Me]);const me=[];let Te,Le=se.concat();for(let $=0,re=V;$<re;$++){const te=P[$];Te=[];for(let Me=0,ge=te.length,We=ge-1,D=Me+1;Me<ge;Me++,We++,D++)We===ge&&(We=0),D===ge&&(D=0),Te[Me]=j(te[Me],te[We],te[D]);me.push(Te),Le=Le.concat(Te)}let tt;if(p===0)tt=ei.triangulateShape(N,P);else{const $=[],re=[];for(let te=0;te<p;te++){const Me=te/p,ge=_*Math.cos(Me*Math.PI/2),We=d*Math.sin(Me*Math.PI/2)+m;for(let D=0,Ke=N.length;D<Ke;D++){const Ie=O(N[D],se[D],We);Ue(Ie.x,Ie.y,-ge),Me===0&&$.push(Ie)}for(let D=0,Ke=V;D<Ke;D++){const Ie=P[D];Te=me[D];const Xe=[];for(let oe=0,dt=Ie.length;oe<dt;oe++){const R=O(Ie[oe],Te[oe],We);Ue(R.x,R.y,-ge),Me===0&&Xe.push(R)}Me===0&&re.push(Xe)}}tt=ei.triangulateShape($,re)}const lt=tt.length,Ye=d+m;for(let $=0;$<z;$++){const re=f?O(C[$],Le[$],Ye):C[$];y?(A.copy(w.normals[0]).multiplyScalar(re.x),b.copy(w.binormals[0]).multiplyScalar(re.y),M.copy(v[0]).add(A).add(b),Ue(M.x,M.y,M.z)):Ue(re.x,re.y,0)}for(let $=1;$<=h;$++)for(let re=0;re<z;re++){const te=f?O(C[re],Le[re],Ye):C[re];y?(A.copy(w.normals[$]).multiplyScalar(te.x),b.copy(w.binormals[$]).multiplyScalar(te.y),M.copy(v[$]).add(A).add(b),Ue(M.x,M.y,M.z)):Ue(te.x,te.y,u/h*$)}for(let $=p-1;$>=0;$--){const re=$/p,te=_*Math.cos(re*Math.PI/2),Me=d*Math.sin(re*Math.PI/2)+m;for(let ge=0,We=N.length;ge<We;ge++){const D=O(N[ge],se[ge],Me);Ue(D.x,D.y,u+te)}for(let ge=0,We=P.length;ge<We;ge++){const D=P[ge];Te=me[ge];for(let Ke=0,Ie=D.length;Ke<Ie;Ke++){const Xe=O(D[Ke],Te[Ke],Me);y?Ue(Xe.x,Xe.y+v[h-1].y,v[h-1].x+te):Ue(Xe.x,Xe.y,u+te)}}}Z(),xe();function Z(){const $=i.length/3;if(f){let re=0,te=z*re;for(let Me=0;Me<lt;Me++){const ge=tt[Me];Ve(ge[2]+te,ge[1]+te,ge[0]+te)}re=h+p*2,te=z*re;for(let Me=0;Me<lt;Me++){const ge=tt[Me];Ve(ge[0]+te,ge[1]+te,ge[2]+te)}}else{for(let re=0;re<lt;re++){const te=tt[re];Ve(te[2],te[1],te[0])}for(let re=0;re<lt;re++){const te=tt[re];Ve(te[0]+z*h,te[1]+z*h,te[2]+z*h)}}n.addGroup($,i.length/3-$,0)}function xe(){const $=i.length/3;let re=0;ce(N,re),re+=N.length;for(let te=0,Me=P.length;te<Me;te++){const ge=P[te];ce(ge,re),re+=ge.length}n.addGroup($,i.length/3-$,1)}function ce($,re){let te=$.length;for(;--te>=0;){const Me=te;let ge=te-1;ge<0&&(ge=$.length-1);for(let We=0,D=h+p*2;We<D;We++){const Ke=z*We,Ie=z*(We+1),Xe=re+Me+Ke,oe=re+ge+Ke,dt=re+ge+Ie,R=re+Me+Ie;Ge(Xe,oe,dt,R)}}}function Ue($,re,te){l.push($),l.push(re),l.push(te)}function Ve($,re,te){ht($),ht(re),ht(te);const Me=i.length/3,ge=x.generateTopUV(n,i,Me-3,Me-2,Me-1);He(ge[0]),He(ge[1]),He(ge[2])}function Ge($,re,te,Me){ht($),ht(re),ht(Me),ht(re),ht(te),ht(Me);const ge=i.length/3,We=x.generateSideWallUV(n,i,ge-6,ge-3,ge-2,ge-1);He(We[0]),He(We[1]),He(We[3]),He(We[1]),He(We[2]),He(We[3])}function ht($){i.push(l[$*3+0]),i.push(l[$*3+1]),i.push(l[$*3+2])}function He($){s.push($.x),s.push($.y)}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){const e=super.toJSON(),t=this.parameters.shapes,n=this.parameters.options;return zp(t,n,e)}static fromJSON(e,t){const n=[];for(let s=0,o=e.shapes.length;s<o;s++){const c=t[e.shapes[s]];n.push(c)}const i=e.options.extrudePath;return i!==void 0&&(e.options.extrudePath=new Mo[i.type]().fromJSON(i)),new Eo(n,e.options)}}const Bp={generateTopUV:function(r,e,t,n,i){const s=e[t*3],o=e[t*3+1],c=e[n*3],l=e[n*3+1],a=e[i*3],h=e[i*3+1];return[new ee(s,o),new ee(c,l),new ee(a,h)]},generateSideWallUV:function(r,e,t,n,i,s){const o=e[t*3],c=e[t*3+1],l=e[t*3+2],a=e[n*3],h=e[n*3+1],u=e[n*3+2],f=e[i*3],_=e[i*3+1],d=e[i*3+2],m=e[s*3],p=e[s*3+1],g=e[s*3+2];return Math.abs(c-h)<Math.abs(o-a)?[new ee(o,1-l),new ee(a,1-u),new ee(f,1-d),new ee(m,1-g)]:[new ee(c,1-l),new ee(h,1-u),new ee(_,1-d),new ee(p,1-g)]}};function zp(r,e,t){if(t.shapes=[],Array.isArray(r))for(let n=0,i=r.length;n<i;n++){const s=r[n];t.shapes.push(s.uuid)}else t.shapes.push(r.uuid);return t.options=Object.assign({},e),e.extrudePath!==void 0&&(t.options.extrudePath=e.extrudePath.toJSON()),t}class wi extends _r{constructor(e=1,t=0){const n=(1+Math.sqrt(5))/2,i=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],s=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(i,s,e,t),this.type="IcosahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new wi(e.radius,e.detail)}}class Je extends _r{constructor(e=1,t=0){const n=[1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],i=[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2];super(n,i,e,t),this.type="OctahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new Je(e.radius,e.detail)}}class xn extends Tt{constructor(e=1,t=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:i};const s=e/2,o=t/2,c=Math.floor(n),l=Math.floor(i),a=c+1,h=l+1,u=e/c,f=t/l,_=[],d=[],m=[],p=[];for(let g=0;g<h;g++){const x=g*f-o;for(let v=0;v<a;v++){const y=v*u-s;d.push(y,-x,0),m.push(0,0,1),p.push(v/c),p.push(1-g/l)}}for(let g=0;g<l;g++)for(let x=0;x<c;x++){const v=x+a*g,y=x+a*(g+1),w=x+1+a*(g+1),b=x+1+a*g;_.push(v,y,b),_.push(y,w,b)}this.setIndex(_),this.setAttribute("position",new et(d,3)),this.setAttribute("normal",new et(m,3)),this.setAttribute("uv",new et(p,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new xn(e.width,e.height,e.widthSegments,e.heightSegments)}}class Gi extends Tt{constructor(e=.5,t=1,n=32,i=1,s=0,o=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:n,phiSegments:i,thetaStart:s,thetaLength:o},n=Math.max(3,n),i=Math.max(1,i);const c=[],l=[],a=[],h=[];let u=e;const f=(t-e)/i,_=new L,d=new ee;for(let m=0;m<=i;m++){for(let p=0;p<=n;p++){const g=s+p/n*o;_.x=u*Math.cos(g),_.y=u*Math.sin(g),l.push(_.x,_.y,_.z),a.push(0,0,1),d.x=(_.x/t+1)/2,d.y=(_.y/t+1)/2,h.push(d.x,d.y)}u+=f}for(let m=0;m<i;m++){const p=m*(n+1);for(let g=0;g<n;g++){const x=g+p,v=x,y=x+n+1,w=x+n+2,b=x+1;c.push(v,y,b),c.push(y,w,b)}}this.setIndex(c),this.setAttribute("position",new et(l,3)),this.setAttribute("normal",new et(a,3)),this.setAttribute("uv",new et(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Gi(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}}class So extends Tt{constructor(e=new ps([new ee(0,.5),new ee(-.5,-.5),new ee(.5,-.5)]),t=12){super(),this.type="ShapeGeometry",this.parameters={shapes:e,curveSegments:t};const n=[],i=[],s=[],o=[];let c=0,l=0;if(Array.isArray(e)===!1)a(e);else for(let h=0;h<e.length;h++)a(e[h]),this.addGroup(c,l,h),c+=l,l=0;this.setIndex(n),this.setAttribute("position",new et(i,3)),this.setAttribute("normal",new et(s,3)),this.setAttribute("uv",new et(o,2));function a(h){const u=i.length/3,f=h.extractPoints(t);let _=f.shape;const d=f.holes;ei.isClockWise(_)===!1&&(_=_.reverse());for(let p=0,g=d.length;p<g;p++){const x=d[p];ei.isClockWise(x)===!0&&(d[p]=x.reverse())}const m=ei.triangulateShape(_,d);for(let p=0,g=d.length;p<g;p++){const x=d[p];_=_.concat(x)}for(let p=0,g=_.length;p<g;p++){const x=_[p];i.push(x.x,x.y,0),s.push(0,0,1),o.push(x.x,x.y)}for(let p=0,g=m.length;p<g;p++){const x=m[p],v=x[0]+u,y=x[1]+u,w=x[2]+u;n.push(v,y,w),l+=3}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){const e=super.toJSON(),t=this.parameters.shapes;return kp(t,e)}static fromJSON(e,t){const n=[];for(let i=0,s=e.shapes.length;i<s;i++){const o=t[e.shapes[i]];n.push(o)}return new So(n,e.curveSegments)}}function kp(r,e){if(e.shapes=[],Array.isArray(r))for(let t=0,n=r.length;t<n;t++){const i=r[t];e.shapes.push(i.uuid)}else e.shapes.push(r.uuid);return e}class fe extends Tt{constructor(e=1,t=32,n=16,i=0,s=Math.PI*2,o=0,c=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:i,phiLength:s,thetaStart:o,thetaLength:c},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));const l=Math.min(o+c,Math.PI);let a=0;const h=[],u=new L,f=new L,_=[],d=[],m=[],p=[];for(let g=0;g<=n;g++){const x=[],v=g/n;let y=0;g===0&&o===0?y=.5/t:g===n&&l===Math.PI&&(y=-.5/t);for(let w=0;w<=t;w++){const b=w/t;u.x=-e*Math.cos(i+b*s)*Math.sin(o+v*c),u.y=e*Math.cos(o+v*c),u.z=e*Math.sin(i+b*s)*Math.sin(o+v*c),d.push(u.x,u.y,u.z),f.copy(u).normalize(),m.push(f.x,f.y,f.z),p.push(b+y,1-v),x.push(a++)}h.push(x)}for(let g=0;g<n;g++)for(let x=0;x<t;x++){const v=h[g][x+1],y=h[g][x],w=h[g+1][x],b=h[g+1][x+1];(g!==0||o>0)&&_.push(v,y,b),(g!==n-1||l<Math.PI)&&_.push(y,w,b)}this.setIndex(_),this.setAttribute("position",new et(d,3)),this.setAttribute("normal",new et(m,3)),this.setAttribute("uv",new et(p,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new fe(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class it extends Tt{constructor(e=1,t=.4,n=12,i=48,s=Math.PI*2,o=0,c=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:i,arc:s,thetaStart:o,thetaLength:c},n=Math.floor(n),i=Math.floor(i);const l=[],a=[],h=[],u=[],f=new L,_=new L,d=new L;for(let m=0;m<=n;m++){const p=o+m/n*c;for(let g=0;g<=i;g++){const x=g/i*s;_.x=(e+t*Math.cos(p))*Math.cos(x),_.y=(e+t*Math.cos(p))*Math.sin(x),_.z=t*Math.sin(p),a.push(_.x,_.y,_.z),f.x=e*Math.cos(x),f.y=e*Math.sin(x),d.subVectors(_,f).normalize(),h.push(d.x,d.y,d.z),u.push(g/i),u.push(m/n)}}for(let m=1;m<=n;m++)for(let p=1;p<=i;p++){const g=(i+1)*m+p-1,x=(i+1)*(m-1)+p-1,v=(i+1)*(m-1)+p,y=(i+1)*m+p;l.push(g,x,y),l.push(x,v,y)}this.setIndex(l),this.setAttribute("position",new et(a,3)),this.setAttribute("normal",new et(h,3)),this.setAttribute("uv",new et(u,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new it(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}}class nl extends Tt{constructor(e=1,t=.4,n=64,i=8,s=2,o=3){super(),this.type="TorusKnotGeometry",this.parameters={radius:e,tube:t,tubularSegments:n,radialSegments:i,p:s,q:o},n=Math.floor(n),i=Math.floor(i);const c=[],l=[],a=[],h=[],u=new L,f=new L,_=new L,d=new L,m=new L,p=new L,g=new L;for(let v=0;v<=n;++v){const y=v/n*s*Math.PI*2;x(y,s,o,e,_),x(y+.01,s,o,e,d),p.subVectors(d,_),g.addVectors(d,_),m.crossVectors(p,g),g.crossVectors(m,p),m.normalize(),g.normalize();for(let w=0;w<=i;++w){const b=w/i*Math.PI*2,A=-t*Math.cos(b),M=t*Math.sin(b);u.x=_.x+(A*g.x+M*m.x),u.y=_.y+(A*g.y+M*m.y),u.z=_.z+(A*g.z+M*m.z),l.push(u.x,u.y,u.z),f.subVectors(u,_).normalize(),a.push(f.x,f.y,f.z),h.push(v/n),h.push(w/i)}}for(let v=1;v<=n;v++)for(let y=1;y<=i;y++){const w=(i+1)*(v-1)+(y-1),b=(i+1)*v+(y-1),A=(i+1)*v+y,M=(i+1)*(v-1)+y;c.push(w,b,M),c.push(b,A,M)}this.setIndex(c),this.setAttribute("position",new et(l,3)),this.setAttribute("normal",new et(a,3)),this.setAttribute("uv",new et(h,2));function x(v,y,w,b,A){const M=Math.cos(v),T=Math.sin(v),C=w/y*v,P=Math.cos(C);A.x=b*(2+P)*.5*M,A.y=b*(2+P)*T*.5,A.z=b*Math.sin(C)*.5}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new nl(e.radius,e.tube,e.tubularSegments,e.radialSegments,e.p,e.q)}}class Si extends Tt{constructor(e=new Fu(new L(-1,-1,0),new L(-1,1,0),new L(1,1,0)),t=64,n=1,i=8,s=!1){super(),this.type="TubeGeometry",this.parameters={path:e,tubularSegments:t,radius:n,radialSegments:i,closed:s};const o=e.computeFrenetFrames(t,s);this.tangents=o.tangents,this.normals=o.normals,this.binormals=o.binormals;const c=new L,l=new L,a=new ee;let h=new L;const u=[],f=[],_=[],d=[];m(),this.setIndex(d),this.setAttribute("position",new et(u,3)),this.setAttribute("normal",new et(f,3)),this.setAttribute("uv",new et(_,2));function m(){for(let v=0;v<t;v++)p(v);p(s===!1?t:0),x(),g()}function p(v){h=e.getPointAt(v/t,h);const y=o.normals[v],w=o.binormals[v];for(let b=0;b<=i;b++){const A=b/i*Math.PI*2,M=Math.sin(A),T=-Math.cos(A);l.x=T*y.x+M*w.x,l.y=T*y.y+M*w.y,l.z=T*y.z+M*w.z,l.normalize(),f.push(l.x,l.y,l.z),c.x=h.x+n*l.x,c.y=h.y+n*l.y,c.z=h.z+n*l.z,u.push(c.x,c.y,c.z)}}function g(){for(let v=1;v<=t;v++)for(let y=1;y<=i;y++){const w=(i+1)*(v-1)+(y-1),b=(i+1)*v+(y-1),A=(i+1)*v+y,M=(i+1)*(v-1)+y;d.push(w,b,M),d.push(b,A,M)}}function x(){for(let v=0;v<=t;v++)for(let y=0;y<=i;y++)a.x=v/t,a.y=y/i,_.push(a.x,a.y)}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){const e=super.toJSON();return e.path=this.parameters.path.toJSON(),e}static fromJSON(e){return new Si(new Mo[e.path.type]().fromJSON(e.path),e.tubularSegments,e.radius,e.radialSegments,e.closed)}}function Ms(r){const e={};for(const t in r){e[t]={};for(const n in r[t]){const i=r[t][n];if(dh(i))i.isRenderTargetTexture?(Ne("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=i.clone();else if(Array.isArray(i))if(dh(i[0])){const s=[];for(let o=0,c=i.length;o<c;o++)s[o]=i[o].clone();e[t][n]=s}else e[t][n]=i.slice();else e[t][n]=i}}return e}function en(r){const e={};for(let t=0;t<r.length;t++){const n=Ms(r[t]);for(const i in n)e[i]=n[i]}return e}function dh(r){return r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)}function Gp(r){const e=[];for(let t=0;t<r.length;t++)e.push(r[t].clone());return e}function Vu(r){const e=r.getRenderTarget();return e===null?r.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:at.workingColorSpace}const Ss={clone:Ms,merge:en};var Vp=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Hp=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Xt extends An{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Vp,this.fragmentShader=Hp,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Ms(e.uniforms),this.uniformsGroups=Gp(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const i in this.uniforms){const o=this.uniforms[i].value;o&&o.isTexture?t.uniforms[i]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[i]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[i]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[i]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[i]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[i]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[i]={type:"m4",value:o.toArray()}:t.uniforms[i]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}}class Hu extends Xt{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class Pe extends An{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new ye(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new ye(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=dc,this.normalScale=new ee(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ri,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class fn extends Pe{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new ee(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return ot(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new ye(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new ye(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new ye(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}}class Wp extends An{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=rd,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class Xp extends An{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}function Zr(r,e){return!r||r.constructor===e?r:typeof e.BYTES_PER_ELEMENT=="number"?new e(r):Array.prototype.slice.call(r)}function qp(r){function e(i,s){return r[i]-r[s]}const t=r.length,n=new Array(t);for(let i=0;i!==t;++i)n[i]=i;return n.sort(e),n}function ph(r,e,t){const n=r.length,i=new r.constructor(n);for(let s=0,o=0;o!==n;++s){const c=t[s]*e;for(let l=0;l!==e;++l)i[o++]=r[c+l]}return i}function Wu(r,e,t,n){let i=1,s=r[0];for(;s!==void 0&&s[n]===void 0;)s=r[i++];if(s===void 0)return;let o=s[n];if(o!==void 0)if(Array.isArray(o))do o=s[n],o!==void 0&&(e.push(s.time),t.push(...o)),s=r[i++];while(s!==void 0);else if(o.toArray!==void 0)do o=s[n],o!==void 0&&(e.push(s.time),o.toArray(t,t.length)),s=r[i++];while(s!==void 0);else do o=s[n],o!==void 0&&(e.push(s.time),t.push(o)),s=r[i++];while(s!==void 0)}class As{constructor(e,t,n,i){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=i!==void 0?i:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){const t=this.parameterPositions;let n=this._cachedIndex,i=t[n],s=t[n-1];e:{t:{let o;n:{i:if(!(e<i)){for(let c=n+2;;){if(i===void 0){if(e<s)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===c)break;if(s=i,i=t[++n],e<i)break t}o=t.length;break n}if(!(e>=s)){const c=t[1];e<c&&(n=2,s=c);for(let l=n-2;;){if(s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===l)break;if(i=s,s=t[--n-1],e>=s)break t}o=n,n=0;break n}break e}for(;n<o;){const c=n+o>>>1;e<t[c]?o=c:n=c+1}if(i=t[n],s=t[n-1],s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,s,i)}return this.interpolate_(n,s,e,i)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){const t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,s=e*i;for(let o=0;o!==i;++o)t[o]=n[s+o];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}}class Yp extends As{constructor(e,t,n,i){super(e,t,n,i),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:hs,endingEnd:hs}}intervalChanged_(e,t,n){const i=this.parameterPositions;let s=e-2,o=e+1,c=i[s],l=i[o];if(c===void 0)switch(this.getSettings_().endingStart){case us:s=e,c=2*t-n;break;case mo:s=i.length-2,c=t+i[s]-i[s+1];break;default:s=e,c=n}if(l===void 0)switch(this.getSettings_().endingEnd){case us:o=e,l=2*n-t;break;case mo:o=1,l=n+i[1]-i[0];break;default:o=e-1,l=t}const a=(n-t)*.5,h=this.valueSize;this._weightPrev=a/(t-c),this._weightNext=a/(l-n),this._offsetPrev=s*h,this._offsetNext=o*h}interpolate_(e,t,n,i){const s=this.resultBuffer,o=this.sampleValues,c=this.valueSize,l=e*c,a=l-c,h=this._offsetPrev,u=this._offsetNext,f=this._weightPrev,_=this._weightNext,d=(n-t)/(i-t),m=d*d,p=m*d,g=-f*p+2*f*m-f*d,x=(1+f)*p+(-1.5-2*f)*m+(-.5+f)*d+1,v=(-1-_)*p+(1.5+_)*m+.5*d,y=_*p-_*m;for(let w=0;w!==c;++w)s[w]=g*o[h+w]+x*o[a+w]+v*o[l+w]+y*o[u+w];return s}}class Xu extends As{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){const s=this.resultBuffer,o=this.sampleValues,c=this.valueSize,l=e*c,a=l-c,h=(n-t)/(i-t),u=1-h;for(let f=0;f!==c;++f)s[f]=o[a+f]*u+o[l+f]*h;return s}}class Kp extends As{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e){return this.copySampleValue_(e-1)}}class jp extends As{interpolate_(e,t,n,i){const s=this.resultBuffer,o=this.sampleValues,c=this.valueSize,l=e*c,a=l-c,h=this.settings||this.DefaultSettings_,u=h.inTangents,f=h.outTangents;if(!u||!f){const m=(n-t)/(i-t),p=1-m;for(let g=0;g!==c;++g)s[g]=o[a+g]*p+o[l+g]*m;return s}const _=c*2,d=e-1;for(let m=0;m!==c;++m){const p=o[a+m],g=o[l+m],x=d*_+m*2,v=f[x],y=f[x+1],w=e*_+m*2,b=u[w],A=u[w+1];let M=(n-t)/(i-t),T,C,P,I,F;for(let V=0;V<8;V++){T=M*M,C=T*M,P=1-M,I=P*P,F=I*P;const O=F*t+3*I*M*v+3*P*T*b+C*i-n;if(Math.abs(O)<1e-10)break;const z=3*I*(v-t)+6*P*M*(b-v)+3*T*(i-b);if(Math.abs(z)<1e-10)break;M=M-O/z,M=Math.max(0,Math.min(1,M))}s[m]=F*p+3*I*M*y+3*P*T*A+C*g}return s}}class Rn{constructor(e,t,n,i){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=Zr(t,this.TimeBufferType),this.values=Zr(n,this.ValueBufferType),this.setInterpolation(i||this.DefaultInterpolation)}static toJSON(e){const t=e.constructor;let n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:Zr(e.times,Array),values:Zr(e.values,Array)};const i=e.getInterpolation();i!==e.DefaultInterpolation&&(n.interpolation=i)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new Kp(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new Xu(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new Yp(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodBezier(e){const t=new jp(this.times,this.values,this.getValueSize(),e);return this.settings&&(t.settings=this.settings),t}setInterpolation(e){let t;switch(e){case cr:t=this.InterpolantFactoryMethodDiscrete;break;case lr:t=this.InterpolantFactoryMethodLinear;break;case Uo:t=this.InterpolantFactoryMethodSmooth;break;case El:t=this.InterpolantFactoryMethodBezier;break}if(t===void 0){const n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return Ne("KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return cr;case this.InterpolantFactoryMethodLinear:return lr;case this.InterpolantFactoryMethodSmooth:return Uo;case this.InterpolantFactoryMethodBezier:return El}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){const t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]+=e}return this}scale(e){if(e!==1){const t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]*=e}return this}trim(e,t){const n=this.times,i=n.length;let s=0,o=i-1;for(;s!==i&&n[s]<e;)++s;for(;o!==-1&&n[o]>t;)--o;if(++o,s!==0||o!==i){s>=o&&(o=Math.max(o,1),s=o-1);const c=this.getValueSize();this.times=n.slice(s,o),this.values=this.values.slice(s*c,o*c)}return this}validate(){let e=!0;const t=this.getValueSize();t-Math.floor(t)!==0&&(ke("KeyframeTrack: Invalid value size in track.",this),e=!1);const n=this.times,i=this.values,s=n.length;s===0&&(ke("KeyframeTrack: Track is empty.",this),e=!1);let o=null;for(let c=0;c!==s;c++){const l=n[c];if(typeof l=="number"&&isNaN(l)){ke("KeyframeTrack: Time is not a valid number.",this,c,l),e=!1;break}if(o!==null&&o>l){ke("KeyframeTrack: Out of order keys.",this,c,l,o),e=!1;break}o=l}if(i!==void 0&&pd(i))for(let c=0,l=i.length;c!==l;++c){const a=i[c];if(isNaN(a)){ke("KeyframeTrack: Value is not a valid number.",this,c,a),e=!1;break}}return e}optimize(){const e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),i=this.getInterpolation()===Uo,s=e.length-1;let o=1;for(let c=1;c<s;++c){let l=!1;const a=e[c],h=e[c+1];if(a!==h&&(c!==1||a!==e[0]))if(i)l=!0;else{const u=c*n,f=u-n,_=u+n;for(let d=0;d!==n;++d){const m=t[u+d];if(m!==t[f+d]||m!==t[_+d]){l=!0;break}}}if(l){if(c!==o){e[o]=e[c];const u=c*n,f=o*n;for(let _=0;_!==n;++_)t[f+_]=t[u+_]}++o}}if(s>0){e[o]=e[s];for(let c=s*n,l=o*n,a=0;a!==n;++a)t[l+a]=t[c+a];++o}return o!==e.length?(this.times=e.slice(0,o),this.values=t.slice(0,o*n)):(this.times=e,this.values=t),this}clone(){const e=this.times.slice(),t=this.values.slice(),n=this.constructor,i=new n(this.name,e,t);return i.createInterpolant=this.createInterpolant,i}}Rn.prototype.ValueTypeName="";Rn.prototype.TimeBufferType=Float32Array;Rn.prototype.ValueBufferType=Float32Array;Rn.prototype.DefaultInterpolation=lr;class Rs extends Rn{constructor(e,t,n){super(e,t,n)}}Rs.prototype.ValueTypeName="bool";Rs.prototype.ValueBufferType=Array;Rs.prototype.DefaultInterpolation=cr;Rs.prototype.InterpolantFactoryMethodLinear=void 0;Rs.prototype.InterpolantFactoryMethodSmooth=void 0;class qu extends Rn{constructor(e,t,n,i){super(e,t,n,i)}}qu.prototype.ValueTypeName="color";class bs extends Rn{constructor(e,t,n,i){super(e,t,n,i)}}bs.prototype.ValueTypeName="number";class Jp extends As{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){const s=this.resultBuffer,o=this.sampleValues,c=this.valueSize,l=(n-t)/(i-t);let a=e*c;for(let h=a+c;a!==h;a+=4)rn.slerpFlat(s,0,o,a-c,o,a,l);return s}}class ws extends Rn{constructor(e,t,n,i){super(e,t,n,i)}InterpolantFactoryMethodLinear(e){return new Jp(this.times,this.values,this.getValueSize(),e)}}ws.prototype.ValueTypeName="quaternion";ws.prototype.InterpolantFactoryMethodSmooth=void 0;class Cs extends Rn{constructor(e,t,n){super(e,t,n)}}Cs.prototype.ValueTypeName="string";Cs.prototype.ValueBufferType=Array;Cs.prototype.DefaultInterpolation=cr;Cs.prototype.InterpolantFactoryMethodLinear=void 0;Cs.prototype.InterpolantFactoryMethodSmooth=void 0;class Ts extends Rn{constructor(e,t,n,i){super(e,t,n,i)}}Ts.prototype.ValueTypeName="vector";class yc{constructor(e="",t=-1,n=[],i=Hc){this.name=e,this.tracks=n,this.duration=t,this.blendMode=i,this.uuid=Mn(),this.userData={},this.duration<0&&this.resetDuration()}static parse(e){const t=[],n=e.tracks,i=1/(e.fps||1);for(let o=0,c=n.length;o!==c;++o)t.push($p(n[o]).scale(i));const s=new this(e.name,e.duration,t,e.blendMode);return s.uuid=e.uuid,s.userData=JSON.parse(e.userData||"{}"),s}static toJSON(e){const t=[],n=e.tracks,i={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode,userData:JSON.stringify(e.userData)};for(let s=0,o=n.length;s!==o;++s)t.push(Rn.toJSON(n[s]));return i}static CreateFromMorphTargetSequence(e,t,n,i){const s=t.length,o=[];for(let c=0;c<s;c++){let l=[],a=[];l.push((c+s-1)%s,c,(c+1)%s),a.push(0,1,0);const h=qp(l);l=ph(l,1,h),a=ph(a,1,h),!i&&l[0]===0&&(l.push(s),a.push(a[0])),o.push(new bs(".morphTargetInfluences["+t[c].name+"]",l,a).scale(1/n))}return new this(e,-1,o)}static findByName(e,t){let n=e;if(!Array.isArray(e)){const i=e;n=i.geometry&&i.geometry.animations||i.animations}for(let i=0;i<n.length;i++)if(n[i].name===t)return n[i];return null}static CreateClipsFromMorphTargetSequences(e,t,n){const i={},s=/^([\w-]*?)([\d]+)$/;for(let c=0,l=e.length;c<l;c++){const a=e[c],h=a.name.match(s);if(h&&h.length>1){const u=h[1];let f=i[u];f||(i[u]=f=[]),f.push(a)}}const o=[];for(const c in i)o.push(this.CreateFromMorphTargetSequence(c,i[c],t,n));return o}static parseAnimation(e,t){if(Ne("AnimationClip: parseAnimation() is deprecated and will be removed with r185"),!e)return ke("AnimationClip: No animation in JSONLoader data."),null;const n=function(u,f,_,d,m){if(_.length!==0){const p=[],g=[];Wu(_,p,g,d),p.length!==0&&m.push(new u(f,p,g))}},i=[],s=e.name||"default",o=e.fps||30,c=e.blendMode;let l=e.length||-1;const a=e.hierarchy||[];for(let u=0;u<a.length;u++){const f=a[u].keys;if(!(!f||f.length===0))if(f[0].morphTargets){const _={};let d;for(d=0;d<f.length;d++)if(f[d].morphTargets)for(let m=0;m<f[d].morphTargets.length;m++)_[f[d].morphTargets[m]]=-1;for(const m in _){const p=[],g=[];for(let x=0;x!==f[d].morphTargets.length;++x){const v=f[d];p.push(v.time),g.push(v.morphTarget===m?1:0)}i.push(new bs(".morphTargetInfluence["+m+"]",p,g))}l=_.length*o}else{const _=".bones["+t[u].name+"]";n(Ts,_+".position",f,"pos",i),n(ws,_+".quaternion",f,"rot",i),n(Ts,_+".scale",f,"scl",i)}}return i.length===0?null:new this(s,l,i,c)}resetDuration(){const e=this.tracks;let t=0;for(let n=0,i=e.length;n!==i;++n){const s=this.tracks[n];t=Math.max(t,s.times[s.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){const e=[];for(let n=0;n<this.tracks.length;n++)e.push(this.tracks[n].clone());const t=new this.constructor(this.name,this.duration,e,this.blendMode);return t.userData=JSON.parse(JSON.stringify(this.userData)),t}toJSON(){return this.constructor.toJSON(this)}}function Zp(r){switch(r.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return bs;case"vector":case"vector2":case"vector3":case"vector4":return Ts;case"color":return qu;case"quaternion":return ws;case"bool":case"boolean":return Rs;case"string":return Cs}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+r)}function $p(r){if(r.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");const e=Zp(r.type);if(r.times===void 0){const t=[],n=[];Wu(r.keys,t,n,"value"),r.times=t,r.values=n}return e.parse!==void 0?e.parse(r):new e(r.name,r.times,r.values,r.interpolation)}const ti={enabled:!1,files:{},add:function(r,e){this.enabled!==!1&&(mh(r)||(this.files[r]=e))},get:function(r){if(this.enabled!==!1&&!mh(r))return this.files[r]},remove:function(r){delete this.files[r]},clear:function(){this.files={}}};function mh(r){try{const e=r.slice(r.indexOf(":")+1);return new URL(e).protocol==="blob:"}catch{return!1}}class Qp{constructor(e,t,n){const i=this;let s=!1,o=0,c=0,l;const a=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this._abortController=null,this.itemStart=function(h){c++,s===!1&&i.onStart!==void 0&&i.onStart(h,o,c),s=!0},this.itemEnd=function(h){o++,i.onProgress!==void 0&&i.onProgress(h,o,c),o===c&&(s=!1,i.onLoad!==void 0&&i.onLoad())},this.itemError=function(h){i.onError!==void 0&&i.onError(h)},this.resolveURL=function(h){return l?l(h):h},this.setURLModifier=function(h){return l=h,this},this.addHandler=function(h,u){return a.push(h,u),this},this.removeHandler=function(h){const u=a.indexOf(h);return u!==-1&&a.splice(u,2),this},this.getHandler=function(h){for(let u=0,f=a.length;u<f;u+=2){const _=a[u],d=a[u+1];if(_.global&&(_.lastIndex=0),_.test(h))return d}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}}const em=new Qp;class Ps{constructor(e){this.manager=e!==void 0?e:em,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(e,t){const n=this;return new Promise(function(i,s){n.load(e,i,t,s)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}}Ps.DEFAULT_MATERIAL_NAME="__DEFAULT";const $n={};class tm extends Error{constructor(e,t){super(e),this.response=t}}class Yu extends Ps{constructor(e){super(e),this.mimeType="",this.responseType="",this._abortController=new AbortController}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const s=ti.get(`file:${e}`);if(s!==void 0){this.manager.itemStart(e),setTimeout(()=>{t&&t(s),this.manager.itemEnd(e)},0);return}if($n[e]!==void 0){$n[e].push({onLoad:t,onProgress:n,onError:i});return}$n[e]=[],$n[e].push({onLoad:t,onProgress:n,onError:i});const o=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin",signal:typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal}),c=this.mimeType,l=this.responseType;fetch(o).then(a=>{if(a.status===200||a.status===0){if(a.status===0&&Ne("FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||a.body===void 0||a.body.getReader===void 0)return a;const h=$n[e],u=a.body.getReader(),f=a.headers.get("X-File-Size")||a.headers.get("Content-Length"),_=f?parseInt(f):0,d=_!==0;let m=0;const p=new ReadableStream({start(g){x();function x(){u.read().then(({done:v,value:y})=>{if(v)g.close();else{m+=y.byteLength;const w=new ProgressEvent("progress",{lengthComputable:d,loaded:m,total:_});for(let b=0,A=h.length;b<A;b++){const M=h[b];M.onProgress&&M.onProgress(w)}g.enqueue(y),x()}},v=>{g.error(v)})}}});return new Response(p)}else throw new tm(`fetch for "${a.url}" responded with ${a.status}: ${a.statusText}`,a)}).then(a=>{switch(l){case"arraybuffer":return a.arrayBuffer();case"blob":return a.blob();case"document":return a.text().then(h=>new DOMParser().parseFromString(h,c));case"json":return a.json();default:if(c==="")return a.text();{const u=/charset="?([^;"\s]*)"?/i.exec(c),f=u&&u[1]?u[1].toLowerCase():void 0,_=new TextDecoder(f);return a.arrayBuffer().then(d=>_.decode(d))}}}).then(a=>{ti.add(`file:${e}`,a);const h=$n[e];delete $n[e];for(let u=0,f=h.length;u<f;u++){const _=h[u];_.onLoad&&_.onLoad(a)}}).catch(a=>{const h=$n[e];if(h===void 0)throw this.manager.itemError(e),a;delete $n[e];for(let u=0,f=h.length;u<f;u++){const _=h[u];_.onError&&_.onError(a)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}}const os=new WeakMap;class nm extends Ps{constructor(e){super(e)}load(e,t,n,i){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const s=this,o=ti.get(`image:${e}`);if(o!==void 0){if(o.complete===!0)s.manager.itemStart(e),setTimeout(function(){t&&t(o),s.manager.itemEnd(e)},0);else{let u=os.get(o);u===void 0&&(u=[],os.set(o,u)),u.push({onLoad:t,onError:i})}return o}const c=ur("img");function l(){h(),t&&t(this);const u=os.get(this)||[];for(let f=0;f<u.length;f++){const _=u[f];_.onLoad&&_.onLoad(this)}os.delete(this),s.manager.itemEnd(e)}function a(u){h(),i&&i(u),ti.remove(`image:${e}`);const f=os.get(this)||[];for(let _=0;_<f.length;_++){const d=f[_];d.onError&&d.onError(u)}os.delete(this),s.manager.itemError(e),s.manager.itemEnd(e)}function h(){c.removeEventListener("load",l,!1),c.removeEventListener("error",a,!1)}return c.addEventListener("load",l,!1),c.addEventListener("error",a,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(c.crossOrigin=this.crossOrigin),ti.add(`image:${e}`,c),s.manager.itemStart(e),c.src=e,c}}class im extends Ps{constructor(e){super(e)}load(e,t,n,i){const s=new Gt,o=new nm(this.manager);return o.setCrossOrigin(this.crossOrigin),o.setPath(this.path),o.load(e,function(c){s.image=c,s.needsUpdate=!0,t!==void 0&&t(s)},n,i),s}}class xr extends bt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new ye(e),this.intensity=t}dispose(){this.dispatchEvent({type:"dispose"})}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}}class sm extends xr{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(bt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new ye(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}toJSON(e){const t=super.toJSON(e);return t.object.groundColor=this.groundColor.getHex(),t}}const ua=new qe,gh=new L,_h=new L;class il{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new ee(512,512),this.mapType=ln,this.map=null,this.mapPass=null,this.matrix=new qe,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Zc,this._frameExtents=new ee(1,1),this._viewportCount=1,this._viewports=[new xt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,n=this.matrix;gh.setFromMatrixPosition(e.matrixWorld),t.position.copy(gh),_h.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(_h),t.updateMatrixWorld(),ua.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(ua,t.coordinateSystem,t.reversedDepth),t.coordinateSystem===hr||t.reversedDepth?n.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(ua)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}const $r=new L,Qr=new rn,Ln=new L;class Ku extends bt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new qe,this.projectionMatrix=new qe,this.projectionMatrixInverse=new qe,this.coordinateSystem=Bn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose($r,Qr,Ln),Ln.x===1&&Ln.y===1&&Ln.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose($r,Qr,Ln.set(1,1,1)).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorld.decompose($r,Qr,Ln),Ln.x===1&&Ln.y===1&&Ln.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose($r,Qr,Ln.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const mi=new L,xh=new ee,vh=new ee;class tn extends Ku{constructor(e=50,t=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=xs*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(er*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return xs*2*Math.atan(Math.tan(er*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){mi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(mi.x,mi.y).multiplyScalar(-e/mi.z),mi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(mi.x,mi.y).multiplyScalar(-e/mi.z)}getViewSize(e,t){return this.getViewBounds(e,xh,vh),t.subVectors(vh,xh)}setViewOffset(e,t,n,i,s,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(er*.5*this.fov)/this.zoom,n=2*t,i=this.aspect*n,s=-.5*i;const o=this.view;if(this.view!==null&&this.view.enabled){const l=o.fullWidth,a=o.fullHeight;s+=o.offsetX*i/l,t-=o.offsetY*n/a,i*=o.width/l,n*=o.height/a}const c=this.filmOffset;c!==0&&(s+=e*c/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+i,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}class rm extends il{constructor(){super(new tn(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1,this.aspect=1}updateMatrices(e){const t=this.camera,n=xs*2*e.angle*this.focus,i=this.mapSize.width/this.mapSize.height*this.aspect,s=e.distance||t.far;(n!==t.fov||i!==t.aspect||s!==t.far)&&(t.fov=n,t.aspect=i,t.far=s,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this}}class sl extends xr{constructor(e,t,n=0,i=Math.PI/3,s=0,o=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(bt.DEFAULT_UP),this.updateMatrix(),this.target=new bt,this.distance=n,this.angle=i,this.penumbra=s,this.decay=o,this.map=null,this.shadow=new rm}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.map=e.map,this.shadow=e.shadow.clone(),this}toJSON(e){const t=super.toJSON(e);return t.object.distance=this.distance,t.object.angle=this.angle,t.object.decay=this.decay,t.object.penumbra=this.penumbra,t.object.target=this.target.uuid,this.map&&this.map.isTexture&&(t.object.map=this.map.toJSON(e).uuid),t.object.shadow=this.shadow.toJSON(),t}}class om extends il{constructor(){super(new tn(90,1,.5,500)),this.isPointLightShadow=!0}}class En extends xr{constructor(e,t,n=0,i=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=i,this.shadow=new om}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}toJSON(e){const t=super.toJSON(e);return t.object.distance=this.distance,t.object.decay=this.decay,t.object.shadow=this.shadow.toJSON(),t}}class vr extends Ku{constructor(e=-1,t=1,n=1,i=-1,s=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=i,this.near=s,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,i,s,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2;let s=n-e,o=n+e,c=i+t,l=i-t;if(this.view!==null&&this.view.enabled){const a=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=a*this.view.offsetX,o=s+a*this.view.width,c-=h*this.view.offsetY,l=c-h*this.view.height}this.projectionMatrix.makeOrthographic(s,o,c,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class am extends il{constructor(){super(new vr(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Mc extends xr{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(bt.DEFAULT_UP),this.updateMatrix(),this.target=new bt,this.shadow=new am}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){const t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}}class cm extends xr{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}}class sr{static extractUrlBase(e){const t=e.lastIndexOf("/");return t===-1?"./":e.slice(0,t+1)}static resolveURL(e,t){return typeof e!="string"||e===""?"":(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}}const fa=new WeakMap;class lm extends Ps{constructor(e){super(e),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&Ne("ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&Ne("ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"},this._abortController=new AbortController}setOptions(e){return this.options=e,this}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const s=this,o=ti.get(`image-bitmap:${e}`);if(o!==void 0){if(s.manager.itemStart(e),o.then){o.then(a=>{fa.has(o)===!0?(i&&i(fa.get(o)),s.manager.itemError(e),s.manager.itemEnd(e)):(t&&t(a),s.manager.itemEnd(e))});return}setTimeout(function(){t&&t(o),s.manager.itemEnd(e)},0);return}const c={};c.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",c.headers=this.requestHeader,c.signal=typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal;const l=fetch(e,c).then(function(a){return a.blob()}).then(function(a){return createImageBitmap(a,Object.assign(s.options,{colorSpaceConversion:"none"}))}).then(function(a){ti.add(`image-bitmap:${e}`,a),t&&t(a),s.manager.itemEnd(e)}).catch(function(a){i&&i(a),fa.set(l,a),ti.remove(`image-bitmap:${e}`),s.manager.itemError(e),s.manager.itemEnd(e)});ti.add(`image-bitmap:${e}`,l),s.manager.itemStart(e)}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}}const as=-90,cs=1;class hm extends bt{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const i=new tn(as,cs,e,t);i.layers=this.layers,this.add(i);const s=new tn(as,cs,e,t);s.layers=this.layers,this.add(s);const o=new tn(as,cs,e,t);o.layers=this.layers,this.add(o);const c=new tn(as,cs,e,t);c.layers=this.layers,this.add(c);const l=new tn(as,cs,e,t);l.layers=this.layers,this.add(l);const a=new tn(as,cs,e,t);a.layers=this.layers,this.add(a)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,i,s,o,c,l]=t;for(const a of t)this.remove(a);if(e===Bn)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),c.up.set(0,1,0),c.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===hr)n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),c.up.set(0,-1,0),c.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const a of t)this.add(a),a.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,o,c,l,a,h]=this.children,u=e.getRenderTarget(),f=e.getActiveCubeFace(),_=e.getActiveMipmapLevel(),d=e.xr.enabled;e.xr.enabled=!1;const m=n.texture.generateMipmaps;n.texture.generateMipmaps=!1;let p=!1;e.isWebGLRenderer===!0?p=e.state.buffers.depth.getReversed():p=e.reversedDepthBuffer,e.setRenderTarget(n,0,i),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,s),e.setRenderTarget(n,1,i),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(n,2,i),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),e.setRenderTarget(n,3,i),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),e.setRenderTarget(n,4,i),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),n.texture.generateMipmaps=m,e.setRenderTarget(n,5,i),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,h),e.setRenderTarget(u,f,_),e.xr.enabled=d,n.texture.needsPMREMUpdate=!0}}class um extends tn{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}let fm=class{constructor(){this._previousTime=0,this._currentTime=0,this._startTime=performance.now(),this._delta=0,this._elapsed=0,this._timescale=1,this._document=null,this._pageVisibilityHandler=null}connect(e){this._document=e,e.hidden!==void 0&&(this._pageVisibilityHandler=dm.bind(this),e.addEventListener("visibilitychange",this._pageVisibilityHandler,!1))}disconnect(){this._pageVisibilityHandler!==null&&(this._document.removeEventListener("visibilitychange",this._pageVisibilityHandler),this._pageVisibilityHandler=null),this._document=null}getDelta(){return this._delta/1e3}getElapsed(){return this._elapsed/1e3}getTimescale(){return this._timescale}setTimescale(e){return this._timescale=e,this}reset(){return this._currentTime=performance.now()-this._startTime,this}dispose(){this.disconnect()}update(e){return this._pageVisibilityHandler!==null&&this._document.hidden===!0?this._delta=0:(this._previousTime=this._currentTime,this._currentTime=(e!==void 0?e:performance.now())-this._startTime,this._delta=(this._currentTime-this._previousTime)*this._timescale,this._elapsed+=this._delta),this}};function dm(){this._document.hidden===!1&&this.reset()}class pm{constructor(e,t,n){this.binding=e,this.valueSize=n;let i,s,o;switch(t){case"quaternion":i=this._slerp,s=this._slerpAdditive,o=this._setAdditiveIdentityQuaternion,this.buffer=new Float64Array(n*6),this._workIndex=5;break;case"string":case"bool":i=this._select,s=this._select,o=this._setAdditiveIdentityOther,this.buffer=new Array(n*5);break;default:i=this._lerp,s=this._lerpAdditive,o=this._setAdditiveIdentityNumeric,this.buffer=new Float64Array(n*5)}this._mixBufferRegion=i,this._mixBufferRegionAdditive=s,this._setIdentity=o,this._origIndex=3,this._addIndex=4,this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,this.useCount=0,this.referenceCount=0}accumulate(e,t){const n=this.buffer,i=this.valueSize,s=e*i+i;let o=this.cumulativeWeight;if(o===0){for(let c=0;c!==i;++c)n[s+c]=n[c];o=t}else{o+=t;const c=t/o;this._mixBufferRegion(n,s,0,c,i)}this.cumulativeWeight=o}accumulateAdditive(e){const t=this.buffer,n=this.valueSize,i=n*this._addIndex;this.cumulativeWeightAdditive===0&&this._setIdentity(),this._mixBufferRegionAdditive(t,i,0,e,n),this.cumulativeWeightAdditive+=e}apply(e){const t=this.valueSize,n=this.buffer,i=e*t+t,s=this.cumulativeWeight,o=this.cumulativeWeightAdditive,c=this.binding;if(this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,s<1){const l=t*this._origIndex;this._mixBufferRegion(n,i,l,1-s,t)}o>0&&this._mixBufferRegionAdditive(n,i,this._addIndex*t,1,t);for(let l=t,a=t+t;l!==a;++l)if(n[l]!==n[l+t]){c.setValue(n,i);break}}saveOriginalState(){const e=this.binding,t=this.buffer,n=this.valueSize,i=n*this._origIndex;e.getValue(t,i);for(let s=n,o=i;s!==o;++s)t[s]=t[i+s%n];this._setIdentity(),this.cumulativeWeight=0,this.cumulativeWeightAdditive=0}restoreOriginalState(){const e=this.valueSize*3;this.binding.setValue(this.buffer,e)}_setAdditiveIdentityNumeric(){const e=this._addIndex*this.valueSize,t=e+this.valueSize;for(let n=e;n<t;n++)this.buffer[n]=0}_setAdditiveIdentityQuaternion(){this._setAdditiveIdentityNumeric(),this.buffer[this._addIndex*this.valueSize+3]=1}_setAdditiveIdentityOther(){const e=this._origIndex*this.valueSize,t=this._addIndex*this.valueSize;for(let n=0;n<this.valueSize;n++)this.buffer[t+n]=this.buffer[e+n]}_select(e,t,n,i,s){if(i>=.5)for(let o=0;o!==s;++o)e[t+o]=e[n+o]}_slerp(e,t,n,i){rn.slerpFlat(e,t,e,t,e,n,i)}_slerpAdditive(e,t,n,i,s){const o=this._workIndex*s;rn.multiplyQuaternionsFlat(e,o,e,t,e,n),rn.slerpFlat(e,t,e,t,e,o,i)}_lerp(e,t,n,i,s){const o=1-i;for(let c=0;c!==s;++c){const l=t+c;e[l]=e[l]*o+e[n+c]*i}}_lerpAdditive(e,t,n,i,s){for(let o=0;o!==s;++o){const c=t+o;e[c]=e[c]+e[n+o]*i}}}const rl="\\[\\]\\.:\\/",mm=new RegExp("["+rl+"]","g"),ol="[^"+rl+"]",gm="[^"+rl.replace("\\.","")+"]",_m=/((?:WC+[\/:])*)/.source.replace("WC",ol),xm=/(WCOD+)?/.source.replace("WCOD",gm),vm=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",ol),ym=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",ol),Mm=new RegExp("^"+_m+xm+vm+ym+"$"),Sm=["material","materials","bones","map"];class bm{constructor(e,t,n){const i=n||mt.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,i)}getValue(e,t){this.bind();const n=this._targetGroup.nCachedObjects_,i=this._bindings[n];i!==void 0&&i.getValue(e,t)}setValue(e,t){const n=this._bindings;for(let i=this._targetGroup.nCachedObjects_,s=n.length;i!==s;++i)n[i].setValue(e,t)}bind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}}class mt{constructor(e,t,n){this.path=t,this.parsedPath=n||mt.parseTrackName(t),this.node=mt.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new mt.Composite(e,t,n):new mt(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(mm,"")}static parseTrackName(e){const t=Mm.exec(e);if(t===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);const n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},i=n.nodeName&&n.nodeName.lastIndexOf(".");if(i!==void 0&&i!==-1){const s=n.nodeName.substring(i+1);Sm.indexOf(s)!==-1&&(n.nodeName=n.nodeName.substring(0,i),n.objectName=s)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){const n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){const n=function(s){for(let o=0;o<s.length;o++){const c=s[o];if(c.name===t||c.uuid===t)return c;const l=n(c.children);if(l)return l}return null},i=n(e.children);if(i)return i}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){const n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)e[t++]=n[i]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){const n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=e[t++]}_setValue_array_setNeedsUpdate(e,t){const n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){const n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node;const t=this.parsedPath,n=t.objectName,i=t.propertyName;let s=t.propertyIndex;if(e||(e=mt.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){Ne("PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let a=t.objectIndex;switch(n){case"materials":if(!e.material){ke("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){ke("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){ke("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let h=0;h<e.length;h++)if(e[h].name===a){a=h;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){ke("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){ke("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){ke("PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(a!==void 0){if(e[a]===void 0){ke("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[a]}}const o=e[i];if(o===void 0){const a=t.nodeName;ke("PropertyBinding: Trying to update property for track: "+a+"."+i+" but it wasn't found.",e);return}let c=this.Versioning.None;this.targetObject=e,e.isMaterial===!0?c=this.Versioning.NeedsUpdate:e.isObject3D===!0&&(c=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(s!==void 0){if(i==="morphTargetInfluences"){if(!e.geometry){ke("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){ke("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[s]!==void 0&&(s=e.morphTargetDictionary[s])}l=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=s}else o.fromArray!==void 0&&o.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(l=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=i;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][c]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}}mt.Composite=bm;mt.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};mt.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};mt.prototype.GetterByBindingType=[mt.prototype._getValue_direct,mt.prototype._getValue_array,mt.prototype._getValue_arrayElement,mt.prototype._getValue_toArray];mt.prototype.SetterByBindingTypeAndVersioning=[[mt.prototype._setValue_direct,mt.prototype._setValue_direct_setNeedsUpdate,mt.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[mt.prototype._setValue_array,mt.prototype._setValue_array_setNeedsUpdate,mt.prototype._setValue_array_setMatrixWorldNeedsUpdate],[mt.prototype._setValue_arrayElement,mt.prototype._setValue_arrayElement_setNeedsUpdate,mt.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[mt.prototype._setValue_fromArray,mt.prototype._setValue_fromArray_setNeedsUpdate,mt.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];class wm{constructor(e,t,n=null,i=t.blendMode){this._mixer=e,this._clip=t,this._localRoot=n,this.blendMode=i;const s=t.tracks,o=s.length,c=new Array(o),l={endingStart:hs,endingEnd:hs};for(let a=0;a!==o;++a){const h=s[a].createInterpolant(null);c[a]=h,h.settings&&Object.assign(l,h.settings),h.settings=l}this._interpolantSettings=l,this._interpolants=c,this._propertyBindings=new Array(o),this._cacheIndex=null,this._byClipCacheIndex=null,this._timeScaleInterpolant=null,this._weightInterpolant=null,this.loop=td,this._loopCount=-1,this._startTime=null,this.time=0,this.timeScale=1,this._effectiveTimeScale=1,this.weight=1,this._effectiveWeight=1,this.repetitions=1/0,this.paused=!1,this.enabled=!0,this.clampWhenFinished=!1,this.zeroSlopeAtStart=!0,this.zeroSlopeAtEnd=!0}play(){return this._mixer._activateAction(this),this}stop(){return this._mixer._deactivateAction(this),this.reset()}reset(){return this.paused=!1,this.enabled=!0,this.time=0,this._loopCount=-1,this._startTime=null,this.stopFading().stopWarping()}isRunning(){return this.enabled&&!this.paused&&this.timeScale!==0&&this._startTime===null&&this._mixer._isActiveAction(this)}isScheduled(){return this._mixer._isActiveAction(this)}startAt(e){return this._startTime=e,this}setLoop(e,t){return this.loop=e,this.repetitions=t,this}setEffectiveWeight(e){return this.weight=e,this._effectiveWeight=this.enabled?e:0,this.stopFading()}getEffectiveWeight(){return this._effectiveWeight}fadeIn(e){return this._scheduleFading(e,0,1)}fadeOut(e){return this._scheduleFading(e,1,0)}crossFadeFrom(e,t,n=!1){if(e.fadeOut(t),this.fadeIn(t),n===!0){const i=this._clip.duration,s=e._clip.duration,o=s/i,c=i/s;e.warp(1,o,t),this.warp(c,1,t)}return this}crossFadeTo(e,t,n=!1){return e.crossFadeFrom(this,t,n)}stopFading(){const e=this._weightInterpolant;return e!==null&&(this._weightInterpolant=null,this._mixer._takeBackControlInterpolant(e)),this}setEffectiveTimeScale(e){return this.timeScale=e,this._effectiveTimeScale=this.paused?0:e,this.stopWarping()}getEffectiveTimeScale(){return this._effectiveTimeScale}setDuration(e){return this.timeScale=this._clip.duration/e,this.stopWarping()}syncWith(e){return this.time=e.time,this.timeScale=e.timeScale,this.stopWarping()}halt(e){return this.warp(this._effectiveTimeScale,0,e)}warp(e,t,n){const i=this._mixer,s=i.time,o=this.timeScale;let c=this._timeScaleInterpolant;c===null&&(c=i._lendControlInterpolant(),this._timeScaleInterpolant=c);const l=c.parameterPositions,a=c.sampleValues;return l[0]=s,l[1]=s+n,a[0]=e/o,a[1]=t/o,this}stopWarping(){const e=this._timeScaleInterpolant;return e!==null&&(this._timeScaleInterpolant=null,this._mixer._takeBackControlInterpolant(e)),this}getMixer(){return this._mixer}getClip(){return this._clip}getRoot(){return this._localRoot||this._mixer._root}_update(e,t,n,i){if(!this.enabled){this._updateWeight(e);return}const s=this._startTime;if(s!==null){const l=(e-s)*n;l<0||n===0?t=0:(this._startTime=null,t=n*l)}t*=this._updateTimeScale(e);const o=this._updateTime(t),c=this._updateWeight(e);if(c>0){const l=this._interpolants,a=this._propertyBindings;switch(this.blendMode){case id:for(let h=0,u=l.length;h!==u;++h)l[h].evaluate(o),a[h].accumulateAdditive(c);break;case Hc:default:for(let h=0,u=l.length;h!==u;++h)l[h].evaluate(o),a[h].accumulate(i,c)}}}_updateWeight(e){let t=0;if(this.enabled){t=this.weight;const n=this._weightInterpolant;if(n!==null){const i=n.evaluate(e)[0];t*=i,e>n.parameterPositions[1]&&(this.stopFading(),i===0&&(this.enabled=!1))}}return this._effectiveWeight=t,t}_updateTimeScale(e){let t=0;if(!this.paused){t=this.timeScale;const n=this._timeScaleInterpolant;if(n!==null){const i=n.evaluate(e)[0];t*=i,e>n.parameterPositions[1]&&(this.stopWarping(),t===0?this.paused=!0:this.timeScale=t)}}return this._effectiveTimeScale=t,t}_updateTime(e){const t=this._clip.duration,n=this.loop;let i=this.time+e,s=this._loopCount;const o=n===nd;if(e===0)return s===-1?i:o&&(s&1)===1?t-i:i;if(n===xu){s===-1&&(this._loopCount=0,this._setEndings(!0,!0,!1));e:{if(i>=t)i=t;else if(i<0)i=0;else{this.time=i;break e}this.clampWhenFinished?this.paused=!0:this.enabled=!1,this.time=i,this._mixer.dispatchEvent({type:"finished",action:this,direction:e<0?-1:1})}}else{if(s===-1&&(e>=0?(s=0,this._setEndings(!0,this.repetitions===0,o)):this._setEndings(this.repetitions===0,!0,o)),i>=t||i<0){const c=Math.floor(i/t);i-=t*c,s+=Math.abs(c);const l=this.repetitions-s;if(l<=0)this.clampWhenFinished?this.paused=!0:this.enabled=!1,i=e>0?t:0,this.time=i,this._mixer.dispatchEvent({type:"finished",action:this,direction:e>0?1:-1});else{if(l===1){const a=e<0;this._setEndings(a,!a,o)}else this._setEndings(!1,!1,o);this._loopCount=s,this.time=i,this._mixer.dispatchEvent({type:"loop",action:this,loopDelta:c})}}else this._loopCount=s,this.time=i;if(o&&(s&1)===1)return t-i}return i}_setEndings(e,t,n){const i=this._interpolantSettings;n?(i.endingStart=us,i.endingEnd=us):(e?i.endingStart=this.zeroSlopeAtStart?us:hs:i.endingStart=mo,t?i.endingEnd=this.zeroSlopeAtEnd?us:hs:i.endingEnd=mo)}_scheduleFading(e,t,n){const i=this._mixer,s=i.time;let o=this._weightInterpolant;o===null&&(o=i._lendControlInterpolant(),this._weightInterpolant=o);const c=o.parameterPositions,l=o.sampleValues;return c[0]=s,l[0]=t,c[1]=s+e,l[1]=n,this}}const Tm=new Float32Array(1);class Em extends bi{constructor(e){super(),this._root=e,this._initMemoryManager(),this._accuIndex=0,this.time=0,this.timeScale=1,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}_bindAction(e,t){const n=e._localRoot||this._root,i=e._clip.tracks,s=i.length,o=e._propertyBindings,c=e._interpolants,l=n.uuid,a=this._bindingsByRootAndName;let h=a[l];h===void 0&&(h={},a[l]=h);for(let u=0;u!==s;++u){const f=i[u],_=f.name;let d=h[_];if(d!==void 0)++d.referenceCount,o[u]=d;else{if(d=o[u],d!==void 0){d._cacheIndex===null&&(++d.referenceCount,this._addInactiveBinding(d,l,_));continue}const m=t&&t._propertyBindings[u].binding.parsedPath;d=new pm(mt.create(n,_,m),f.ValueTypeName,f.getValueSize()),++d.referenceCount,this._addInactiveBinding(d,l,_),o[u]=d}c[u].resultBuffer=d.buffer}}_activateAction(e){if(!this._isActiveAction(e)){if(e._cacheIndex===null){const n=(e._localRoot||this._root).uuid,i=e._clip.uuid,s=this._actionsByClip[i];this._bindAction(e,s&&s.knownActions[0]),this._addInactiveAction(e,i,n)}const t=e._propertyBindings;for(let n=0,i=t.length;n!==i;++n){const s=t[n];s.useCount++===0&&(this._lendBinding(s),s.saveOriginalState())}this._lendAction(e)}}_deactivateAction(e){if(this._isActiveAction(e)){const t=e._propertyBindings;for(let n=0,i=t.length;n!==i;++n){const s=t[n];--s.useCount===0&&(s.restoreOriginalState(),this._takeBackBinding(s))}this._takeBackAction(e)}}_initMemoryManager(){this._actions=[],this._nActiveActions=0,this._actionsByClip={},this._bindings=[],this._nActiveBindings=0,this._bindingsByRootAndName={},this._controlInterpolants=[],this._nActiveControlInterpolants=0;const e=this;this.stats={actions:{get total(){return e._actions.length},get inUse(){return e._nActiveActions}},bindings:{get total(){return e._bindings.length},get inUse(){return e._nActiveBindings}},controlInterpolants:{get total(){return e._controlInterpolants.length},get inUse(){return e._nActiveControlInterpolants}}}}_isActiveAction(e){const t=e._cacheIndex;return t!==null&&t<this._nActiveActions}_addInactiveAction(e,t,n){const i=this._actions,s=this._actionsByClip;let o=s[t];if(o===void 0)o={knownActions:[e],actionByRoot:{}},e._byClipCacheIndex=0,s[t]=o;else{const c=o.knownActions;e._byClipCacheIndex=c.length,c.push(e)}e._cacheIndex=i.length,i.push(e),o.actionByRoot[n]=e}_removeInactiveAction(e){const t=this._actions,n=t[t.length-1],i=e._cacheIndex;n._cacheIndex=i,t[i]=n,t.pop(),e._cacheIndex=null;const s=e._clip.uuid,o=this._actionsByClip,c=o[s],l=c.knownActions,a=l[l.length-1],h=e._byClipCacheIndex;a._byClipCacheIndex=h,l[h]=a,l.pop(),e._byClipCacheIndex=null;const u=c.actionByRoot,f=(e._localRoot||this._root).uuid;delete u[f],l.length===0&&delete o[s],this._removeInactiveBindingsForAction(e)}_removeInactiveBindingsForAction(e){const t=e._propertyBindings;for(let n=0,i=t.length;n!==i;++n){const s=t[n];--s.referenceCount===0&&this._removeInactiveBinding(s)}}_lendAction(e){const t=this._actions,n=e._cacheIndex,i=this._nActiveActions++,s=t[i];e._cacheIndex=i,t[i]=e,s._cacheIndex=n,t[n]=s}_takeBackAction(e){const t=this._actions,n=e._cacheIndex,i=--this._nActiveActions,s=t[i];e._cacheIndex=i,t[i]=e,s._cacheIndex=n,t[n]=s}_addInactiveBinding(e,t,n){const i=this._bindingsByRootAndName,s=this._bindings;let o=i[t];o===void 0&&(o={},i[t]=o),o[n]=e,e._cacheIndex=s.length,s.push(e)}_removeInactiveBinding(e){const t=this._bindings,n=e.binding,i=n.rootNode.uuid,s=n.path,o=this._bindingsByRootAndName,c=o[i],l=t[t.length-1],a=e._cacheIndex;l._cacheIndex=a,t[a]=l,t.pop(),delete c[s],Object.keys(c).length===0&&delete o[i]}_lendBinding(e){const t=this._bindings,n=e._cacheIndex,i=this._nActiveBindings++,s=t[i];e._cacheIndex=i,t[i]=e,s._cacheIndex=n,t[n]=s}_takeBackBinding(e){const t=this._bindings,n=e._cacheIndex,i=--this._nActiveBindings,s=t[i];e._cacheIndex=i,t[i]=e,s._cacheIndex=n,t[n]=s}_lendControlInterpolant(){const e=this._controlInterpolants,t=this._nActiveControlInterpolants++;let n=e[t];return n===void 0&&(n=new Xu(new Float32Array(2),new Float32Array(2),1,Tm),n.__cacheIndex=t,e[t]=n),n}_takeBackControlInterpolant(e){const t=this._controlInterpolants,n=e.__cacheIndex,i=--this._nActiveControlInterpolants,s=t[i];e.__cacheIndex=i,t[i]=e,s.__cacheIndex=n,t[n]=s}clipAction(e,t,n){const i=t||this._root,s=i.uuid;let o=typeof e=="string"?yc.findByName(i,e):e;const c=o!==null?o.uuid:e,l=this._actionsByClip[c];let a=null;if(n===void 0&&(o!==null?n=o.blendMode:n=Hc),l!==void 0){const u=l.actionByRoot[s];if(u!==void 0&&u.blendMode===n)return u;a=l.knownActions[0],o===null&&(o=a._clip)}if(o===null)return null;const h=new wm(this,o,t,n);return this._bindAction(h,a),this._addInactiveAction(h,c,s),h}existingAction(e,t){const n=t||this._root,i=n.uuid,s=typeof e=="string"?yc.findByName(n,e):e,o=s?s.uuid:e,c=this._actionsByClip[o];return c!==void 0&&c.actionByRoot[i]||null}stopAllAction(){const e=this._actions,t=this._nActiveActions;for(let n=t-1;n>=0;--n)e[n].stop();return this}update(e){e*=this.timeScale;const t=this._actions,n=this._nActiveActions,i=this.time+=e,s=Math.sign(e),o=this._accuIndex^=1;for(let a=0;a!==n;++a)t[a]._update(i,e,s,o);const c=this._bindings,l=this._nActiveBindings;for(let a=0;a!==l;++a)c[a].apply(o);return this}setTime(e){this.time=0;for(let t=0;t<this._actions.length;t++)this._actions[t].time=0;return this.update(e)}getRoot(){return this._root}uncacheClip(e){const t=this._actions,n=e.uuid,i=this._actionsByClip,s=i[n];if(s!==void 0){const o=s.knownActions;for(let c=0,l=o.length;c!==l;++c){const a=o[c];this._deactivateAction(a);const h=a._cacheIndex,u=t[t.length-1];a._cacheIndex=null,a._byClipCacheIndex=null,u._cacheIndex=h,t[h]=u,t.pop(),this._removeInactiveBindingsForAction(a)}delete i[n]}}uncacheRoot(e){const t=e.uuid,n=this._actionsByClip;for(const o in n){const c=n[o].actionByRoot,l=c[t];l!==void 0&&(this._deactivateAction(l),this._removeInactiveAction(l))}const i=this._bindingsByRootAndName,s=i[t];if(s!==void 0)for(const o in s){const c=s[o];c.restoreOriginalState(),this._removeInactiveBinding(c)}}uncacheAction(e,t){const n=this.existingAction(e,t);n!==null&&(this._deactivateAction(n),this._removeInactiveAction(n))}}const yh=new qe;class Am{constructor(e,t,n=0,i=1/0){this.ray=new gr(e,t),this.near=n,this.far=i,this.camera=null,this.layers=new Kc,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):ke("Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return yh.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(yh),this}intersectObject(e,t=!0,n=[]){return Sc(e,this,n,t),n.sort(Mh),n}intersectObjects(e,t=!0,n=[]){for(let i=0,s=e.length;i<s;i++)Sc(e[i],this,n,t);return n.sort(Mh),n}}function Mh(r,e){return r.distance-e.distance}function Sc(r,e,t,n){let i=!0;if(r.layers.test(e.layers)&&r.raycast(e,t)===!1&&(i=!1),i===!0&&n===!0){const s=r.children;for(let o=0,c=s.length;o<c;o++)Sc(s[o],e,t,!0)}}const fl=class fl{constructor(e,t,n,i){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,n,i)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let n=0;n<4;n++)this.elements[n]=e[n+t];return this}set(e,t,n,i){const s=this.elements;return s[0]=e,s[2]=t,s[1]=n,s[3]=i,this}};fl.prototype.isMatrix2=!0;let Sh=fl;function bh(r,e,t,n){const i=Rm(n);switch(t){case gu:return r*e;case zc:return r*e/i.components*i.byteLength;case kc:return r*e/i.components*i.byteLength;case Oi:return r*e*2/i.components*i.byteLength;case Gc:return r*e*2/i.components*i.byteLength;case _u:return r*e*3/i.components*i.byteLength;case yn:return r*e*4/i.components*i.byteLength;case Vc:return r*e*4/i.components*i.byteLength;case ro:case oo:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*8;case ao:case co:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*16;case Oa:case za:return Math.max(r,16)*Math.max(e,8)/4;case Fa:case Ba:return Math.max(r,8)*Math.max(e,8)/2;case ka:case Ga:case Ha:case Wa:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*8;case Va:case fo:case Xa:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*16;case qa:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*16;case Ya:return Math.floor((r+4)/5)*Math.floor((e+3)/4)*16;case Ka:return Math.floor((r+4)/5)*Math.floor((e+4)/5)*16;case ja:return Math.floor((r+5)/6)*Math.floor((e+4)/5)*16;case Ja:return Math.floor((r+5)/6)*Math.floor((e+5)/6)*16;case Za:return Math.floor((r+7)/8)*Math.floor((e+4)/5)*16;case $a:return Math.floor((r+7)/8)*Math.floor((e+5)/6)*16;case Qa:return Math.floor((r+7)/8)*Math.floor((e+7)/8)*16;case ec:return Math.floor((r+9)/10)*Math.floor((e+4)/5)*16;case tc:return Math.floor((r+9)/10)*Math.floor((e+5)/6)*16;case nc:return Math.floor((r+9)/10)*Math.floor((e+7)/8)*16;case ic:return Math.floor((r+9)/10)*Math.floor((e+9)/10)*16;case sc:return Math.floor((r+11)/12)*Math.floor((e+9)/10)*16;case rc:return Math.floor((r+11)/12)*Math.floor((e+11)/12)*16;case oc:case ac:case cc:return Math.ceil(r/4)*Math.ceil(e/4)*16;case lc:case hc:return Math.ceil(r/4)*Math.ceil(e/4)*8;case po:case uc:return Math.ceil(r/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function Rm(r){switch(r){case ln:case fu:return{byteLength:1,components:1};case or:case du:case sn:return{byteLength:2,components:1};case Oc:case Bc:return{byteLength:2,components:4};case Gn:case Fc:case vn:return{byteLength:4,components:1};case pu:case mu:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${r}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Cc}}));typeof window<"u"&&(window.__THREE__?Ne("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Cc);/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function ju(){let r=null,e=!1,t=null,n=null;function i(s,o){t(s,o),n=r.requestAnimationFrame(i)}return{start:function(){e!==!0&&t!==null&&r!==null&&(n=r.requestAnimationFrame(i),e=!0)},stop:function(){r!==null&&r.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){r=s}}}function Cm(r){const e=new WeakMap;function t(c,l){const a=c.array,h=c.usage,u=a.byteLength,f=r.createBuffer();r.bindBuffer(l,f),r.bufferData(l,a,h),c.onUploadCallback();let _;if(a instanceof Float32Array)_=r.FLOAT;else if(typeof Float16Array<"u"&&a instanceof Float16Array)_=r.HALF_FLOAT;else if(a instanceof Uint16Array)c.isFloat16BufferAttribute?_=r.HALF_FLOAT:_=r.UNSIGNED_SHORT;else if(a instanceof Int16Array)_=r.SHORT;else if(a instanceof Uint32Array)_=r.UNSIGNED_INT;else if(a instanceof Int32Array)_=r.INT;else if(a instanceof Int8Array)_=r.BYTE;else if(a instanceof Uint8Array)_=r.UNSIGNED_BYTE;else if(a instanceof Uint8ClampedArray)_=r.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+a);return{buffer:f,type:_,bytesPerElement:a.BYTES_PER_ELEMENT,version:c.version,size:u}}function n(c,l,a){const h=l.array,u=l.updateRanges;if(r.bindBuffer(a,c),u.length===0)r.bufferSubData(a,0,h);else{u.sort((_,d)=>_.start-d.start);let f=0;for(let _=1;_<u.length;_++){const d=u[f],m=u[_];m.start<=d.start+d.count+1?d.count=Math.max(d.count,m.start+m.count-d.start):(++f,u[f]=m)}u.length=f+1;for(let _=0,d=u.length;_<d;_++){const m=u[_];r.bufferSubData(a,m.start*h.BYTES_PER_ELEMENT,h,m.start,m.count)}l.clearUpdateRanges()}l.onUploadCallback()}function i(c){return c.isInterleavedBufferAttribute&&(c=c.data),e.get(c)}function s(c){c.isInterleavedBufferAttribute&&(c=c.data);const l=e.get(c);l&&(r.deleteBuffer(l.buffer),e.delete(c))}function o(c,l){if(c.isInterleavedBufferAttribute&&(c=c.data),c.isGLBufferAttribute){const h=e.get(c);(!h||h.version<c.version)&&e.set(c,{buffer:c.buffer,type:c.type,bytesPerElement:c.elementSize,version:c.version});return}const a=e.get(c);if(a===void 0)e.set(c,t(c,l));else if(a.version<c.version){if(a.size!==c.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(a.buffer,c,l),a.version=c.version}}return{get:i,remove:s,update:o}}var Pm=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Lm=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,Im=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Dm=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Nm=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Um=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Fm=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,Om=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Bm=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,zm=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,km=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Gm=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Vm=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,Hm=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,Wm=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,Xm=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,qm=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Ym=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Km=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,jm=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,Jm=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,Zm=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,$m=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,Qm=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,e0=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,t0=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,n0=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,i0=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,s0=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,r0=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,o0="gl_FragColor = linearToOutputTexel( gl_FragColor );",a0=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,c0=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,l0=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,h0=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,u0=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,f0=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,d0=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,p0=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,m0=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,g0=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,_0=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,x0=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,v0=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,y0=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,M0=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,S0=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,b0=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,w0=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,T0=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,E0=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,A0=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,R0=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
		vec3 iridescenceFresnelDielectric;
		vec3 iridescenceFresnelMetallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
vec3 BRDF_GGX_Multiscatter( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 singleScatter = BRDF_GGX( lightDir, viewDir, normal, material );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 dfgV = texture2D( dfgLUT, vec2( material.roughness, dotNV ) ).rg;
	vec2 dfgL = texture2D( dfgLUT, vec2( material.roughness, dotNL ) ).rg;
	vec3 FssEss_V = material.specularColorBlended * dfgV.x + material.specularF90 * dfgV.y;
	vec3 FssEss_L = material.specularColorBlended * dfgL.x + material.specularF90 * dfgL.y;
	float Ess_V = dfgV.x + dfgV.y;
	float Ess_L = dfgL.x + dfgL.y;
	float Ems_V = 1.0 - Ess_V;
	float Ems_L = 1.0 - Ess_L;
	vec3 Favg = material.specularColorBlended + ( 1.0 - material.specularColorBlended ) * 0.047619;
	vec3 Fms = FssEss_V * FssEss_L * Favg / ( 1.0 - Ems_V * Ems_L * Favg + EPSILON );
	float compensationFactor = Ems_V * Ems_L;
	vec3 multiScatter = Fms * compensationFactor;
	return singleScatter + multiScatter;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX_Multiscatter( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnelDielectric, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceFresnelMetallic, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,C0=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( material.iridescenceFresnelDielectric, material.iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#ifdef USE_LIGHT_PROBES_GRID
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = inverseTransformDirection( geometryNormal, viewMatrix );
		irradiance += getLightProbeGridIrradiance( probeWorldPos, probeWorldNormal );
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,P0=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,L0=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,I0=`#ifdef USE_LIGHT_PROBES_GRID
uniform highp sampler3D probesSH;
uniform vec3 probesMin;
uniform vec3 probesMax;
uniform vec3 probesResolution;
vec3 getLightProbeGridIrradiance( vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 resMinusOne = res - 1.0;
	vec3 probeSpacing = gridRange / resMinusOne;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.0, 1.0 );
	uvw = uvw * resMinusOne / res + 0.5 / res;
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,D0=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,N0=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,U0=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,F0=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,O0=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,B0=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,z0=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,k0=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,G0=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,V0=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,H0=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,W0=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,X0=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,q0=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,Y0=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,K0=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,j0=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,J0=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Z0=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,$0=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Q0=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,eg=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,tg=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,ng=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,ig=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,sg=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,rg=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,og=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,ag=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,cg=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,lg=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,hg=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,ug=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,fg=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,dg=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,pg=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,mg=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,gg=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,_g=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,xg=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,vg=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,yg=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Mg=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Sg=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,bg=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,wg=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,Tg=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,Eg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Ag=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Rg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,Cg=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Pg=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Lg=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Ig=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Dg=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Ng=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Ug=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Fg=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,Og=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,Bg=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,zg=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,kg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Gg=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Vg=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Hg=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Wg=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,Xg=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,qg=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Yg=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Kg=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,jg=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Jg=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,Zg=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,$g=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Qg=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,e_=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,t_=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,n_=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,i_=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,s_=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,r_=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,o_=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,a_=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,c_=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,l_=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,st={alphahash_fragment:Pm,alphahash_pars_fragment:Lm,alphamap_fragment:Im,alphamap_pars_fragment:Dm,alphatest_fragment:Nm,alphatest_pars_fragment:Um,aomap_fragment:Fm,aomap_pars_fragment:Om,batching_pars_vertex:Bm,batching_vertex:zm,begin_vertex:km,beginnormal_vertex:Gm,bsdfs:Vm,iridescence_fragment:Hm,bumpmap_pars_fragment:Wm,clipping_planes_fragment:Xm,clipping_planes_pars_fragment:qm,clipping_planes_pars_vertex:Ym,clipping_planes_vertex:Km,color_fragment:jm,color_pars_fragment:Jm,color_pars_vertex:Zm,color_vertex:$m,common:Qm,cube_uv_reflection_fragment:e0,defaultnormal_vertex:t0,displacementmap_pars_vertex:n0,displacementmap_vertex:i0,emissivemap_fragment:s0,emissivemap_pars_fragment:r0,colorspace_fragment:o0,colorspace_pars_fragment:a0,envmap_fragment:c0,envmap_common_pars_fragment:l0,envmap_pars_fragment:h0,envmap_pars_vertex:u0,envmap_physical_pars_fragment:S0,envmap_vertex:f0,fog_vertex:d0,fog_pars_vertex:p0,fog_fragment:m0,fog_pars_fragment:g0,gradientmap_pars_fragment:_0,lightmap_pars_fragment:x0,lights_lambert_fragment:v0,lights_lambert_pars_fragment:y0,lights_pars_begin:M0,lights_toon_fragment:b0,lights_toon_pars_fragment:w0,lights_phong_fragment:T0,lights_phong_pars_fragment:E0,lights_physical_fragment:A0,lights_physical_pars_fragment:R0,lights_fragment_begin:C0,lights_fragment_maps:P0,lights_fragment_end:L0,lightprobes_pars_fragment:I0,logdepthbuf_fragment:D0,logdepthbuf_pars_fragment:N0,logdepthbuf_pars_vertex:U0,logdepthbuf_vertex:F0,map_fragment:O0,map_pars_fragment:B0,map_particle_fragment:z0,map_particle_pars_fragment:k0,metalnessmap_fragment:G0,metalnessmap_pars_fragment:V0,morphinstance_vertex:H0,morphcolor_vertex:W0,morphnormal_vertex:X0,morphtarget_pars_vertex:q0,morphtarget_vertex:Y0,normal_fragment_begin:K0,normal_fragment_maps:j0,normal_pars_fragment:J0,normal_pars_vertex:Z0,normal_vertex:$0,normalmap_pars_fragment:Q0,clearcoat_normal_fragment_begin:eg,clearcoat_normal_fragment_maps:tg,clearcoat_pars_fragment:ng,iridescence_pars_fragment:ig,opaque_fragment:sg,packing:rg,premultiplied_alpha_fragment:og,project_vertex:ag,dithering_fragment:cg,dithering_pars_fragment:lg,roughnessmap_fragment:hg,roughnessmap_pars_fragment:ug,shadowmap_pars_fragment:fg,shadowmap_pars_vertex:dg,shadowmap_vertex:pg,shadowmask_pars_fragment:mg,skinbase_vertex:gg,skinning_pars_vertex:_g,skinning_vertex:xg,skinnormal_vertex:vg,specularmap_fragment:yg,specularmap_pars_fragment:Mg,tonemapping_fragment:Sg,tonemapping_pars_fragment:bg,transmission_fragment:wg,transmission_pars_fragment:Tg,uv_pars_fragment:Eg,uv_pars_vertex:Ag,uv_vertex:Rg,worldpos_vertex:Cg,background_vert:Pg,background_frag:Lg,backgroundCube_vert:Ig,backgroundCube_frag:Dg,cube_vert:Ng,cube_frag:Ug,depth_vert:Fg,depth_frag:Og,distance_vert:Bg,distance_frag:zg,equirect_vert:kg,equirect_frag:Gg,linedashed_vert:Vg,linedashed_frag:Hg,meshbasic_vert:Wg,meshbasic_frag:Xg,meshlambert_vert:qg,meshlambert_frag:Yg,meshmatcap_vert:Kg,meshmatcap_frag:jg,meshnormal_vert:Jg,meshnormal_frag:Zg,meshphong_vert:$g,meshphong_frag:Qg,meshphysical_vert:e_,meshphysical_frag:t_,meshtoon_vert:n_,meshtoon_frag:i_,points_vert:s_,points_frag:r_,shadow_vert:o_,shadow_frag:a_,sprite_vert:c_,sprite_frag:l_},_e={common:{diffuse:{value:new ye(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ze},alphaMap:{value:null},alphaMapTransform:{value:new Ze},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ze}},envmap:{envMap:{value:null},envMapRotation:{value:new Ze},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ze}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ze}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ze},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ze},normalScale:{value:new ee(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ze},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ze}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ze}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ze}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new ye(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new L},probesMax:{value:new L},probesResolution:{value:new L}},points:{diffuse:{value:new ye(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ze},alphaTest:{value:0},uvTransform:{value:new Ze}},sprite:{diffuse:{value:new ye(16777215)},opacity:{value:1},center:{value:new ee(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ze},alphaMap:{value:null},alphaMapTransform:{value:new Ze},alphaTest:{value:0}}},Nn={basic:{uniforms:en([_e.common,_e.specularmap,_e.envmap,_e.aomap,_e.lightmap,_e.fog]),vertexShader:st.meshbasic_vert,fragmentShader:st.meshbasic_frag},lambert:{uniforms:en([_e.common,_e.specularmap,_e.envmap,_e.aomap,_e.lightmap,_e.emissivemap,_e.bumpmap,_e.normalmap,_e.displacementmap,_e.fog,_e.lights,{emissive:{value:new ye(0)},envMapIntensity:{value:1}}]),vertexShader:st.meshlambert_vert,fragmentShader:st.meshlambert_frag},phong:{uniforms:en([_e.common,_e.specularmap,_e.envmap,_e.aomap,_e.lightmap,_e.emissivemap,_e.bumpmap,_e.normalmap,_e.displacementmap,_e.fog,_e.lights,{emissive:{value:new ye(0)},specular:{value:new ye(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:st.meshphong_vert,fragmentShader:st.meshphong_frag},standard:{uniforms:en([_e.common,_e.envmap,_e.aomap,_e.lightmap,_e.emissivemap,_e.bumpmap,_e.normalmap,_e.displacementmap,_e.roughnessmap,_e.metalnessmap,_e.fog,_e.lights,{emissive:{value:new ye(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:st.meshphysical_vert,fragmentShader:st.meshphysical_frag},toon:{uniforms:en([_e.common,_e.aomap,_e.lightmap,_e.emissivemap,_e.bumpmap,_e.normalmap,_e.displacementmap,_e.gradientmap,_e.fog,_e.lights,{emissive:{value:new ye(0)}}]),vertexShader:st.meshtoon_vert,fragmentShader:st.meshtoon_frag},matcap:{uniforms:en([_e.common,_e.bumpmap,_e.normalmap,_e.displacementmap,_e.fog,{matcap:{value:null}}]),vertexShader:st.meshmatcap_vert,fragmentShader:st.meshmatcap_frag},points:{uniforms:en([_e.points,_e.fog]),vertexShader:st.points_vert,fragmentShader:st.points_frag},dashed:{uniforms:en([_e.common,_e.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:st.linedashed_vert,fragmentShader:st.linedashed_frag},depth:{uniforms:en([_e.common,_e.displacementmap]),vertexShader:st.depth_vert,fragmentShader:st.depth_frag},normal:{uniforms:en([_e.common,_e.bumpmap,_e.normalmap,_e.displacementmap,{opacity:{value:1}}]),vertexShader:st.meshnormal_vert,fragmentShader:st.meshnormal_frag},sprite:{uniforms:en([_e.sprite,_e.fog]),vertexShader:st.sprite_vert,fragmentShader:st.sprite_frag},background:{uniforms:{uvTransform:{value:new Ze},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:st.background_vert,fragmentShader:st.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ze}},vertexShader:st.backgroundCube_vert,fragmentShader:st.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:st.cube_vert,fragmentShader:st.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:st.equirect_vert,fragmentShader:st.equirect_frag},distance:{uniforms:en([_e.common,_e.displacementmap,{referencePosition:{value:new L},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:st.distance_vert,fragmentShader:st.distance_frag},shadow:{uniforms:en([_e.lights,_e.fog,{color:{value:new ye(0)},opacity:{value:1}}]),vertexShader:st.shadow_vert,fragmentShader:st.shadow_frag}};Nn.physical={uniforms:en([Nn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ze},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ze},clearcoatNormalScale:{value:new ee(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ze},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ze},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ze},sheen:{value:0},sheenColor:{value:new ye(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ze},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ze},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ze},transmissionSamplerSize:{value:new ee},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ze},attenuationDistance:{value:0},attenuationColor:{value:new ye(0)},specularColor:{value:new ye(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ze},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ze},anisotropyVector:{value:new ee},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ze}}]),vertexShader:st.meshphysical_vert,fragmentShader:st.meshphysical_frag};const eo={r:0,b:0,g:0},h_=new qe,Ju=new Ze;Ju.set(-1,0,0,0,1,0,0,0,1);function u_(r,e,t,n,i,s){const o=new ye(0);let c=i===!0?0:1,l,a,h=null,u=0,f=null;function _(x){let v=x.isScene===!0?x.background:null;if(v&&v.isTexture){const y=x.backgroundBlurriness>0;v=e.get(v,y)}return v}function d(x){let v=!1;const y=_(x);y===null?p(o,c):y&&y.isColor&&(p(y,1),v=!0);const w=r.xr.getEnvironmentBlendMode();w==="additive"?t.buffers.color.setClear(0,0,0,1,s):w==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,s),(r.autoClear||v)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),r.clear(r.autoClearColor,r.autoClearDepth,r.autoClearStencil))}function m(x,v){const y=_(v);y&&(y.isCubeTexture||y.mapping===To)?(a===void 0&&(a=new G(new we(1,1,1),new Xt({name:"BackgroundCubeMaterial",uniforms:Ms(Nn.backgroundCube.uniforms),vertexShader:Nn.backgroundCube.vertexShader,fragmentShader:Nn.backgroundCube.fragmentShader,side:Zt,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),a.geometry.deleteAttribute("normal"),a.geometry.deleteAttribute("uv"),a.onBeforeRender=function(w,b,A){this.matrixWorld.copyPosition(A.matrixWorld)},Object.defineProperty(a.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(a)),a.material.uniforms.envMap.value=y,a.material.uniforms.backgroundBlurriness.value=v.backgroundBlurriness,a.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,a.material.uniforms.backgroundRotation.value.setFromMatrix4(h_.makeRotationFromEuler(v.backgroundRotation)).transpose(),y.isCubeTexture&&y.isRenderTargetTexture===!1&&a.material.uniforms.backgroundRotation.value.premultiply(Ju),a.material.toneMapped=at.getTransfer(y.colorSpace)!==pt,(h!==y||u!==y.version||f!==r.toneMapping)&&(a.material.needsUpdate=!0,h=y,u=y.version,f=r.toneMapping),a.layers.enableAll(),x.unshift(a,a.geometry,a.material,0,0,null)):y&&y.isTexture&&(l===void 0&&(l=new G(new xn(2,2),new Xt({name:"BackgroundMaterial",uniforms:Ms(Nn.background.uniforms),vertexShader:Nn.background.vertexShader,fragmentShader:Nn.background.fragmentShader,side:ii,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(l)),l.material.uniforms.t2D.value=y,l.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,l.material.toneMapped=at.getTransfer(y.colorSpace)!==pt,y.matrixAutoUpdate===!0&&y.updateMatrix(),l.material.uniforms.uvTransform.value.copy(y.matrix),(h!==y||u!==y.version||f!==r.toneMapping)&&(l.material.needsUpdate=!0,h=y,u=y.version,f=r.toneMapping),l.layers.enableAll(),x.unshift(l,l.geometry,l.material,0,0,null))}function p(x,v){x.getRGB(eo,Vu(r)),t.buffers.color.setClear(eo.r,eo.g,eo.b,v,s)}function g(){a!==void 0&&(a.geometry.dispose(),a.material.dispose(),a=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return o},setClearColor:function(x,v=1){o.set(x),c=v,p(o,c)},getClearAlpha:function(){return c},setClearAlpha:function(x){c=x,p(o,c)},render:d,addToRenderList:m,dispose:g}}function f_(r,e){const t=r.getParameter(r.MAX_VERTEX_ATTRIBS),n={},i=f(null);let s=i,o=!1;function c(P,I,F,V,N){let O=!1;const z=u(P,V,F,I);s!==z&&(s=z,a(s.object)),O=_(P,V,F,N),O&&d(P,V,F,N),N!==null&&e.update(N,r.ELEMENT_ARRAY_BUFFER),(O||o)&&(o=!1,y(P,I,F,V),N!==null&&r.bindBuffer(r.ELEMENT_ARRAY_BUFFER,e.get(N).buffer))}function l(){return r.createVertexArray()}function a(P){return r.bindVertexArray(P)}function h(P){return r.deleteVertexArray(P)}function u(P,I,F,V){const N=V.wireframe===!0;let O=n[I.id];O===void 0&&(O={},n[I.id]=O);const z=P.isInstancedMesh===!0?P.id:0;let j=O[z];j===void 0&&(j={},O[z]=j);let se=j[F.id];se===void 0&&(se={},j[F.id]=se);let me=se[N];return me===void 0&&(me=f(l()),se[N]=me),me}function f(P){const I=[],F=[],V=[];for(let N=0;N<t;N++)I[N]=0,F[N]=0,V[N]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:I,enabledAttributes:F,attributeDivisors:V,object:P,attributes:{},index:null}}function _(P,I,F,V){const N=s.attributes,O=I.attributes;let z=0;const j=F.getAttributes();for(const se in j)if(j[se].location>=0){const Te=N[se];let Le=O[se];if(Le===void 0&&(se==="instanceMatrix"&&P.instanceMatrix&&(Le=P.instanceMatrix),se==="instanceColor"&&P.instanceColor&&(Le=P.instanceColor)),Te===void 0||Te.attribute!==Le||Le&&Te.data!==Le.data)return!0;z++}return s.attributesNum!==z||s.index!==V}function d(P,I,F,V){const N={},O=I.attributes;let z=0;const j=F.getAttributes();for(const se in j)if(j[se].location>=0){let Te=O[se];Te===void 0&&(se==="instanceMatrix"&&P.instanceMatrix&&(Te=P.instanceMatrix),se==="instanceColor"&&P.instanceColor&&(Te=P.instanceColor));const Le={};Le.attribute=Te,Te&&Te.data&&(Le.data=Te.data),N[se]=Le,z++}s.attributes=N,s.attributesNum=z,s.index=V}function m(){const P=s.newAttributes;for(let I=0,F=P.length;I<F;I++)P[I]=0}function p(P){g(P,0)}function g(P,I){const F=s.newAttributes,V=s.enabledAttributes,N=s.attributeDivisors;F[P]=1,V[P]===0&&(r.enableVertexAttribArray(P),V[P]=1),N[P]!==I&&(r.vertexAttribDivisor(P,I),N[P]=I)}function x(){const P=s.newAttributes,I=s.enabledAttributes;for(let F=0,V=I.length;F<V;F++)I[F]!==P[F]&&(r.disableVertexAttribArray(F),I[F]=0)}function v(P,I,F,V,N,O,z){z===!0?r.vertexAttribIPointer(P,I,F,N,O):r.vertexAttribPointer(P,I,F,V,N,O)}function y(P,I,F,V){m();const N=V.attributes,O=F.getAttributes(),z=I.defaultAttributeValues;for(const j in O){const se=O[j];if(se.location>=0){let me=N[j];if(me===void 0&&(j==="instanceMatrix"&&P.instanceMatrix&&(me=P.instanceMatrix),j==="instanceColor"&&P.instanceColor&&(me=P.instanceColor)),me!==void 0){const Te=me.normalized,Le=me.itemSize,tt=e.get(me);if(tt===void 0)continue;const lt=tt.buffer,Ye=tt.type,Z=tt.bytesPerElement,xe=Ye===r.INT||Ye===r.UNSIGNED_INT||me.gpuType===Fc;if(me.isInterleavedBufferAttribute){const ce=me.data,Ue=ce.stride,Ve=me.offset;if(ce.isInstancedInterleavedBuffer){for(let Ge=0;Ge<se.locationSize;Ge++)g(se.location+Ge,ce.meshPerAttribute);P.isInstancedMesh!==!0&&V._maxInstanceCount===void 0&&(V._maxInstanceCount=ce.meshPerAttribute*ce.count)}else for(let Ge=0;Ge<se.locationSize;Ge++)p(se.location+Ge);r.bindBuffer(r.ARRAY_BUFFER,lt);for(let Ge=0;Ge<se.locationSize;Ge++)v(se.location+Ge,Le/se.locationSize,Ye,Te,Ue*Z,(Ve+Le/se.locationSize*Ge)*Z,xe)}else{if(me.isInstancedBufferAttribute){for(let ce=0;ce<se.locationSize;ce++)g(se.location+ce,me.meshPerAttribute);P.isInstancedMesh!==!0&&V._maxInstanceCount===void 0&&(V._maxInstanceCount=me.meshPerAttribute*me.count)}else for(let ce=0;ce<se.locationSize;ce++)p(se.location+ce);r.bindBuffer(r.ARRAY_BUFFER,lt);for(let ce=0;ce<se.locationSize;ce++)v(se.location+ce,Le/se.locationSize,Ye,Te,Le*Z,Le/se.locationSize*ce*Z,xe)}}else if(z!==void 0){const Te=z[j];if(Te!==void 0)switch(Te.length){case 2:r.vertexAttrib2fv(se.location,Te);break;case 3:r.vertexAttrib3fv(se.location,Te);break;case 4:r.vertexAttrib4fv(se.location,Te);break;default:r.vertexAttrib1fv(se.location,Te)}}}}x()}function w(){T();for(const P in n){const I=n[P];for(const F in I){const V=I[F];for(const N in V){const O=V[N];for(const z in O)h(O[z].object),delete O[z];delete V[N]}}delete n[P]}}function b(P){if(n[P.id]===void 0)return;const I=n[P.id];for(const F in I){const V=I[F];for(const N in V){const O=V[N];for(const z in O)h(O[z].object),delete O[z];delete V[N]}}delete n[P.id]}function A(P){for(const I in n){const F=n[I];for(const V in F){const N=F[V];if(N[P.id]===void 0)continue;const O=N[P.id];for(const z in O)h(O[z].object),delete O[z];delete N[P.id]}}}function M(P){for(const I in n){const F=n[I],V=P.isInstancedMesh===!0?P.id:0,N=F[V];if(N!==void 0){for(const O in N){const z=N[O];for(const j in z)h(z[j].object),delete z[j];delete N[O]}delete F[V],Object.keys(F).length===0&&delete n[I]}}}function T(){C(),o=!0,s!==i&&(s=i,a(s.object))}function C(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:c,reset:T,resetDefaultState:C,dispose:w,releaseStatesOfGeometry:b,releaseStatesOfObject:M,releaseStatesOfProgram:A,initAttributes:m,enableAttribute:p,disableUnusedAttributes:x}}function d_(r,e,t){let n;function i(l){n=l}function s(l,a){r.drawArrays(n,l,a),t.update(a,n,1)}function o(l,a,h){h!==0&&(r.drawArraysInstanced(n,l,a,h),t.update(a,n,h))}function c(l,a,h){if(h===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,a,0,h);let f=0;for(let _=0;_<h;_++)f+=a[_];t.update(f,n,1)}this.setMode=i,this.render=s,this.renderInstances=o,this.renderMultiDraw=c}function p_(r,e,t,n){let i;function s(){if(i!==void 0)return i;if(e.has("EXT_texture_filter_anisotropic")===!0){const A=e.get("EXT_texture_filter_anisotropic");i=r.getParameter(A.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function o(A){return!(A!==yn&&n.convert(A)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_FORMAT))}function c(A){const M=A===sn&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(A!==ln&&n.convert(A)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_TYPE)&&A!==vn&&!M)}function l(A){if(A==="highp"){if(r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.HIGH_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.HIGH_FLOAT).precision>0)return"highp";A="mediump"}return A==="mediump"&&r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.MEDIUM_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let a=t.precision!==void 0?t.precision:"highp";const h=l(a);h!==a&&(Ne("WebGLRenderer:",a,"not supported, using",h,"instead."),a=h);const u=t.logarithmicDepthBuffer===!0,f=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control");t.reversedDepthBuffer===!0&&f===!1&&Ne("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");const _=r.getParameter(r.MAX_TEXTURE_IMAGE_UNITS),d=r.getParameter(r.MAX_VERTEX_TEXTURE_IMAGE_UNITS),m=r.getParameter(r.MAX_TEXTURE_SIZE),p=r.getParameter(r.MAX_CUBE_MAP_TEXTURE_SIZE),g=r.getParameter(r.MAX_VERTEX_ATTRIBS),x=r.getParameter(r.MAX_VERTEX_UNIFORM_VECTORS),v=r.getParameter(r.MAX_VARYING_VECTORS),y=r.getParameter(r.MAX_FRAGMENT_UNIFORM_VECTORS),w=r.getParameter(r.MAX_SAMPLES),b=r.getParameter(r.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:c,precision:a,logarithmicDepthBuffer:u,reversedDepthBuffer:f,maxTextures:_,maxVertexTextures:d,maxTextureSize:m,maxCubemapSize:p,maxAttributes:g,maxVertexUniforms:x,maxVaryings:v,maxFragmentUniforms:y,maxSamples:w,samples:b}}function m_(r){const e=this;let t=null,n=0,i=!1,s=!1;const o=new _i,c=new Ze,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(u,f){const _=u.length!==0||f||n!==0||i;return i=f,n=u.length,_},this.beginShadows=function(){s=!0,h(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(u,f){t=h(u,f,0)},this.setState=function(u,f,_){const d=u.clippingPlanes,m=u.clipIntersection,p=u.clipShadows,g=r.get(u);if(!i||d===null||d.length===0||s&&!p)s?h(null):a();else{const x=s?0:n,v=x*4;let y=g.clippingState||null;l.value=y,y=h(d,f,v,_);for(let w=0;w!==v;++w)y[w]=t[w];g.clippingState=y,this.numIntersection=m?this.numPlanes:0,this.numPlanes+=x}};function a(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function h(u,f,_,d){const m=u!==null?u.length:0;let p=null;if(m!==0){if(p=l.value,d!==!0||p===null){const g=_+m*4,x=f.matrixWorldInverse;c.getNormalMatrix(x),(p===null||p.length<g)&&(p=new Float32Array(g));for(let v=0,y=_;v!==m;++v,y+=4)o.copy(u[v]).applyMatrix4(x,c),o.normal.toArray(p,y),p[y+3]=o.constant}l.value=p,l.needsUpdate=!0}return e.numPlanes=m,e.numIntersection=0,p}}const yi=4,wh=[.125,.215,.35,.446,.526,.582],Di=20,g_=256,Xs=new vr,Th=new ye;let da=null,pa=0,ma=0,ga=!1;const __=new L;class Eh{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,n=.1,i=100,s={}){const{size:o=256,position:c=__}=s;da=this._renderer.getRenderTarget(),pa=this._renderer.getActiveCubeFace(),ma=this._renderer.getActiveMipmapLevel(),ga=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(o);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,n,i,l,c),t>0&&this._blur(l,0,0,t),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Ch(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Rh(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(da,pa,ma),this._renderer.xr.enabled=ga,e.scissorTest=!1,ls(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Ui||e.mapping===_s?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),da=this._renderer.getRenderTarget(),pa=this._renderer.getActiveCubeFace(),ma=this._renderer.getActiveMipmapLevel(),ga=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:zt,minFilter:zt,generateMipmaps:!1,type:sn,format:yn,colorSpace:hn,depthBuffer:!1},i=Ah(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Ah(e,t,n);const{_lodMax:s}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=x_(s)),this._blurMaterial=y_(s,e,t),this._ggxMaterial=v_(s,e,t)}return i}_compileMaterial(e){const t=new G(new Tt,e);this._renderer.compile(t,Xs)}_sceneToCubeUV(e,t,n,i,s){const l=new tn(90,1,t,n),a=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],u=this._renderer,f=u.autoClear,_=u.toneMapping;u.getClearColor(Th),u.toneMapping=kn,u.autoClear=!1,u.state.buffers.depth.getReversed()&&(u.setRenderTarget(i),u.clearDepth(),u.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new G(new we,new kt({name:"PMREM.Background",side:Zt,depthWrite:!1,depthTest:!1})));const m=this._backgroundBox,p=m.material;let g=!1;const x=e.background;x?x.isColor&&(p.color.copy(x),e.background=null,g=!0):(p.color.copy(Th),g=!0);for(let v=0;v<6;v++){const y=v%3;y===0?(l.up.set(0,a[v],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x+h[v],s.y,s.z)):y===1?(l.up.set(0,0,a[v]),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y+h[v],s.z)):(l.up.set(0,a[v],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y,s.z+h[v]));const w=this._cubeSize;ls(i,y*w,v>2?w:0,w,w),u.setRenderTarget(i),g&&u.render(m,l),u.render(e,l)}u.toneMapping=_,u.autoClear=f,e.background=x}_textureToCubeUV(e,t){const n=this._renderer,i=e.mapping===Ui||e.mapping===_s;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=Ch()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Rh());const s=i?this._cubemapMaterial:this._equirectMaterial,o=this._lodMeshes[0];o.material=s;const c=s.uniforms;c.envMap.value=e;const l=this._cubeSize;ls(t,0,0,3*l,2*l),n.setRenderTarget(t),n.render(o,Xs)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;const i=this._lodMeshes.length;for(let s=1;s<i;s++)this._applyGGXFilter(e,s-1,s);t.autoClear=n}_applyGGXFilter(e,t,n){const i=this._renderer,s=this._pingPongRenderTarget,o=this._ggxMaterial,c=this._lodMeshes[n];c.material=o;const l=o.uniforms,a=n/(this._lodMeshes.length-1),h=t/(this._lodMeshes.length-1),u=Math.sqrt(a*a-h*h),f=0+a*1.25,_=u*f,{_lodMax:d}=this,m=this._sizeLods[n],p=3*m*(n>d-yi?n-d+yi:0),g=4*(this._cubeSize-m);l.envMap.value=e.texture,l.roughness.value=_,l.mipInt.value=d-t,ls(s,p,g,3*m,2*m),i.setRenderTarget(s),i.render(c,Xs),l.envMap.value=s.texture,l.roughness.value=0,l.mipInt.value=d-n,ls(e,p,g,3*m,2*m),i.setRenderTarget(e),i.render(c,Xs)}_blur(e,t,n,i,s){const o=this._pingPongRenderTarget;this._halfBlur(e,o,t,n,i,"latitudinal",s),this._halfBlur(o,e,n,n,i,"longitudinal",s)}_halfBlur(e,t,n,i,s,o,c){const l=this._renderer,a=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&ke("blur direction must be either latitudinal or longitudinal!");const h=3,u=this._lodMeshes[i];u.material=a;const f=a.uniforms,_=this._sizeLods[n]-1,d=isFinite(s)?Math.PI/(2*_):2*Math.PI/(2*Di-1),m=s/d,p=isFinite(s)?1+Math.floor(h*m):Di;p>Di&&Ne(`sigmaRadians, ${s}, is too large and will clip, as it requested ${p} samples when the maximum is set to ${Di}`);const g=[];let x=0;for(let A=0;A<Di;++A){const M=A/m,T=Math.exp(-M*M/2);g.push(T),A===0?x+=T:A<p&&(x+=2*T)}for(let A=0;A<g.length;A++)g[A]=g[A]/x;f.envMap.value=e.texture,f.samples.value=p,f.weights.value=g,f.latitudinal.value=o==="latitudinal",c&&(f.poleAxis.value=c);const{_lodMax:v}=this;f.dTheta.value=d,f.mipInt.value=v-n;const y=this._sizeLods[i],w=3*y*(i>v-yi?i-v+yi:0),b=4*(this._cubeSize-y);ls(t,w,b,3*y,2*y),l.setRenderTarget(t),l.render(u,Xs)}}function x_(r){const e=[],t=[],n=[];let i=r;const s=r-yi+1+wh.length;for(let o=0;o<s;o++){const c=Math.pow(2,i);e.push(c);let l=1/c;o>r-yi?l=wh[o-r+yi-1]:o===0&&(l=0),t.push(l);const a=1/(c-2),h=-a,u=1+a,f=[h,h,u,h,u,u,h,h,u,u,h,u],_=6,d=6,m=3,p=2,g=1,x=new Float32Array(m*d*_),v=new Float32Array(p*d*_),y=new Float32Array(g*d*_);for(let b=0;b<_;b++){const A=b%3*2/3-1,M=b>2?0:-1,T=[A,M,0,A+2/3,M,0,A+2/3,M+1,0,A,M,0,A+2/3,M+1,0,A,M+1,0];x.set(T,m*d*b),v.set(f,p*d*b);const C=[b,b,b,b,b,b];y.set(C,g*d*b)}const w=new Tt;w.setAttribute("position",new Dt(x,m)),w.setAttribute("uv",new Dt(v,p)),w.setAttribute("faceIndex",new Dt(y,g)),n.push(new G(w,null)),i>yi&&i--}return{lodMeshes:n,sizeLods:e,sigmas:t}}function Ah(r,e,t){const n=new nn(r,e,t);return n.texture.mapping=To,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function ls(r,e,t,n,i){r.viewport.set(e,t,n,i),r.scissor.set(e,t,n,i)}function v_(r,e,t){return new Xt({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:g_,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${r}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:Ao(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:zn,depthTest:!1,depthWrite:!1})}function y_(r,e,t){const n=new Float32Array(Di),i=new L(0,1,0);return new Xt({name:"SphericalGaussianBlur",defines:{n:Di,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${r}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:Ao(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:zn,depthTest:!1,depthWrite:!1})}function Rh(){return new Xt({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Ao(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:zn,depthTest:!1,depthWrite:!1})}function Ch(){return new Xt({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Ao(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:zn,depthTest:!1,depthWrite:!1})}function Ao(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}class Zu extends nn{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},i=[n,n,n,n,n,n];this.texture=new Lu(i),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},i=new we(5,5,5),s=new Xt({name:"CubemapFromEquirect",uniforms:Ms(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Zt,blending:zn});s.uniforms.tEquirect.value=t;const o=new G(i,s),c=t.minFilter;return t.minFilter===On&&(t.minFilter=zt),new hm(1,10,this).update(e,o),t.minFilter=c,o.geometry.dispose(),o.material.dispose(),this}clear(e,t=!0,n=!0,i=!0){const s=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,n,i);e.setRenderTarget(s)}}function M_(r){let e=new WeakMap,t=new WeakMap,n=null;function i(f,_=!1){return f==null?null:_?o(f):s(f)}function s(f){if(f&&f.isTexture){const _=f.mapping;if(_===Do||_===No)if(e.has(f)){const d=e.get(f).texture;return c(d,f.mapping)}else{const d=f.image;if(d&&d.height>0){const m=new Zu(d.height);return m.fromEquirectangularTexture(r,f),e.set(f,m),f.addEventListener("dispose",a),c(m.texture,f.mapping)}else return null}}return f}function o(f){if(f&&f.isTexture){const _=f.mapping,d=_===Do||_===No,m=_===Ui||_===_s;if(d||m){let p=t.get(f);const g=p!==void 0?p.texture.pmremVersion:0;if(f.isRenderTargetTexture&&f.pmremVersion!==g)return n===null&&(n=new Eh(r)),p=d?n.fromEquirectangular(f,p):n.fromCubemap(f,p),p.texture.pmremVersion=f.pmremVersion,t.set(f,p),p.texture;if(p!==void 0)return p.texture;{const x=f.image;return d&&x&&x.height>0||m&&x&&l(x)?(n===null&&(n=new Eh(r)),p=d?n.fromEquirectangular(f):n.fromCubemap(f),p.texture.pmremVersion=f.pmremVersion,t.set(f,p),f.addEventListener("dispose",h),p.texture):null}}}return f}function c(f,_){return _===Do?f.mapping=Ui:_===No&&(f.mapping=_s),f}function l(f){let _=0;const d=6;for(let m=0;m<d;m++)f[m]!==void 0&&_++;return _===d}function a(f){const _=f.target;_.removeEventListener("dispose",a);const d=e.get(_);d!==void 0&&(e.delete(_),d.dispose())}function h(f){const _=f.target;_.removeEventListener("dispose",h);const d=t.get(_);d!==void 0&&(t.delete(_),d.dispose())}function u(){e=new WeakMap,t=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:i,dispose:u}}function S_(r){const e={};function t(n){if(e[n]!==void 0)return e[n];const i=r.getExtension(n);return e[n]=i,i}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){const i=t(n);return i===null&&mc("WebGLRenderer: "+n+" extension not supported."),i}}}function b_(r,e,t,n){const i={},s=new WeakMap;function o(u){const f=u.target;f.index!==null&&e.remove(f.index);for(const d in f.attributes)e.remove(f.attributes[d]);f.removeEventListener("dispose",o),delete i[f.id];const _=s.get(f);_&&(e.remove(_),s.delete(f)),n.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,t.memory.geometries--}function c(u,f){return i[f.id]===!0||(f.addEventListener("dispose",o),i[f.id]=!0,t.memory.geometries++),f}function l(u){const f=u.attributes;for(const _ in f)e.update(f[_],r.ARRAY_BUFFER)}function a(u){const f=[],_=u.index,d=u.attributes.position;let m=0;if(d===void 0)return;if(_!==null){const x=_.array;m=_.version;for(let v=0,y=x.length;v<y;v+=3){const w=x[v+0],b=x[v+1],A=x[v+2];f.push(w,b,b,A,A,w)}}else{const x=d.array;m=d.version;for(let v=0,y=x.length/3-1;v<y;v+=3){const w=v+0,b=v+1,A=v+2;f.push(w,b,b,A,A,w)}}const p=new(d.count>=65535?wu:bu)(f,1);p.version=m;const g=s.get(u);g&&e.remove(g),s.set(u,p)}function h(u){const f=s.get(u);if(f){const _=u.index;_!==null&&f.version<_.version&&a(u)}else a(u);return s.get(u)}return{get:c,update:l,getWireframeAttribute:h}}function w_(r,e,t){let n;function i(u){n=u}let s,o;function c(u){s=u.type,o=u.bytesPerElement}function l(u,f){r.drawElements(n,f,s,u*o),t.update(f,n,1)}function a(u,f,_){_!==0&&(r.drawElementsInstanced(n,f,s,u*o,_),t.update(f,n,_))}function h(u,f,_){if(_===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,f,0,s,u,0,_);let m=0;for(let p=0;p<_;p++)m+=f[p];t.update(m,n,1)}this.setMode=i,this.setIndex=c,this.render=l,this.renderInstances=a,this.renderMultiDraw=h}function T_(r){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(s,o,c){switch(t.calls++,o){case r.TRIANGLES:t.triangles+=c*(s/3);break;case r.LINES:t.lines+=c*(s/2);break;case r.LINE_STRIP:t.lines+=c*(s-1);break;case r.LINE_LOOP:t.lines+=c*s;break;case r.POINTS:t.points+=c*s;break;default:ke("WebGLInfo: Unknown draw mode:",o);break}}function i(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:i,update:n}}function E_(r,e,t){const n=new WeakMap,i=new xt;function s(o,c,l){const a=o.morphTargetInfluences,h=c.morphAttributes.position||c.morphAttributes.normal||c.morphAttributes.color,u=h!==void 0?h.length:0;let f=n.get(c);if(f===void 0||f.count!==u){let T=function(){A.dispose(),n.delete(c),c.removeEventListener("dispose",T)};f!==void 0&&f.texture.dispose();const _=c.morphAttributes.position!==void 0,d=c.morphAttributes.normal!==void 0,m=c.morphAttributes.color!==void 0,p=c.morphAttributes.position||[],g=c.morphAttributes.normal||[],x=c.morphAttributes.color||[];let v=0;_===!0&&(v=1),d===!0&&(v=2),m===!0&&(v=3);let y=c.attributes.position.count*v,w=1;y>e.maxTextureSize&&(w=Math.ceil(y/e.maxTextureSize),y=e.maxTextureSize);const b=new Float32Array(y*w*4*u),A=new Mu(b,y,w,u);A.type=vn,A.needsUpdate=!0;const M=v*4;for(let C=0;C<u;C++){const P=p[C],I=g[C],F=x[C],V=y*w*4*C;for(let N=0;N<P.count;N++){const O=N*M;_===!0&&(i.fromBufferAttribute(P,N),b[V+O+0]=i.x,b[V+O+1]=i.y,b[V+O+2]=i.z,b[V+O+3]=0),d===!0&&(i.fromBufferAttribute(I,N),b[V+O+4]=i.x,b[V+O+5]=i.y,b[V+O+6]=i.z,b[V+O+7]=0),m===!0&&(i.fromBufferAttribute(F,N),b[V+O+8]=i.x,b[V+O+9]=i.y,b[V+O+10]=i.z,b[V+O+11]=F.itemSize===4?i.w:1)}}f={count:u,texture:A,size:new ee(y,w)},n.set(c,f),c.addEventListener("dispose",T)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(r,"morphTexture",o.morphTexture,t);else{let _=0;for(let m=0;m<a.length;m++)_+=a[m];const d=c.morphTargetsRelative?1:1-_;l.getUniforms().setValue(r,"morphTargetBaseInfluence",d),l.getUniforms().setValue(r,"morphTargetInfluences",a)}l.getUniforms().setValue(r,"morphTargetsTexture",f.texture,t),l.getUniforms().setValue(r,"morphTargetsTextureSize",f.size)}return{update:s}}function A_(r,e,t,n,i){let s=new WeakMap;function o(a){const h=i.render.frame,u=a.geometry,f=e.get(a,u);if(s.get(f)!==h&&(e.update(f),s.set(f,h)),a.isInstancedMesh&&(a.hasEventListener("dispose",l)===!1&&a.addEventListener("dispose",l),s.get(a)!==h&&(t.update(a.instanceMatrix,r.ARRAY_BUFFER),a.instanceColor!==null&&t.update(a.instanceColor,r.ARRAY_BUFFER),s.set(a,h))),a.isSkinnedMesh){const _=a.skeleton;s.get(_)!==h&&(_.update(),s.set(_,h))}return f}function c(){s=new WeakMap}function l(a){const h=a.target;h.removeEventListener("dispose",l),n.releaseStatesOfObject(h),t.remove(h.instanceMatrix),h.instanceColor!==null&&t.remove(h.instanceColor)}return{update:o,dispose:c}}const R_={[Pc]:"LINEAR_TONE_MAPPING",[Lc]:"REINHARD_TONE_MAPPING",[Ic]:"CINEON_TONE_MAPPING",[wo]:"ACES_FILMIC_TONE_MAPPING",[Nc]:"AGX_TONE_MAPPING",[Uc]:"NEUTRAL_TONE_MAPPING",[Dc]:"CUSTOM_TONE_MAPPING"};function C_(r,e,t,n,i){const s=new nn(e,t,{type:r,depthBuffer:n,stencilBuffer:i,depthTexture:n?new vs(e,t):void 0}),o=new nn(e,t,{type:sn,depthBuffer:!1,stencilBuffer:!1}),c=new Tt;c.setAttribute("position",new et([-1,3,0,-1,-1,0,3,-1,0],3)),c.setAttribute("uv",new et([0,2,0,0,2,0],2));const l=new Hu({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),a=new G(c,l),h=new vr(-1,1,1,-1,0,1);let u=null,f=null,_=!1,d,m=null,p=[],g=!1;this.setSize=function(x,v){s.setSize(x,v),o.setSize(x,v);for(let y=0;y<p.length;y++){const w=p[y];w.setSize&&w.setSize(x,v)}},this.setEffects=function(x){p=x,g=p.length>0&&p[0].isRenderPass===!0;const v=s.width,y=s.height;for(let w=0;w<p.length;w++){const b=p[w];b.setSize&&b.setSize(v,y)}},this.begin=function(x,v){if(_||x.toneMapping===kn&&p.length===0)return!1;if(m=v,v!==null){const y=v.width,w=v.height;(s.width!==y||s.height!==w)&&this.setSize(y,w)}return g===!1&&x.setRenderTarget(s),d=x.toneMapping,x.toneMapping=kn,!0},this.hasRenderPass=function(){return g},this.end=function(x,v){x.toneMapping=d,_=!0;let y=s,w=o;for(let b=0;b<p.length;b++){const A=p[b];if(A.enabled!==!1&&(A.render(x,w,y,v),A.needsSwap!==!1)){const M=y;y=w,w=M}}if(u!==x.outputColorSpace||f!==x.toneMapping){u=x.outputColorSpace,f=x.toneMapping,l.defines={},at.getTransfer(u)===pt&&(l.defines.SRGB_TRANSFER="");const b=R_[f];b&&(l.defines[b]=""),l.needsUpdate=!0}l.uniforms.tDiffuse.value=y.texture,x.setRenderTarget(m),x.render(a,h),m=null,_=!1},this.isCompositing=function(){return _},this.dispose=function(){s.depthTexture&&s.depthTexture.dispose(),s.dispose(),o.dispose(),c.dispose(),l.dispose()}}const $u=new Gt,bc=new vs(1,1),Qu=new Mu,ef=new zd,tf=new Lu,Ph=[],Lh=[],Ih=new Float32Array(16),Dh=new Float32Array(9),Nh=new Float32Array(4);function Ls(r,e,t){const n=r[0];if(n<=0||n>0)return r;const i=e*t;let s=Ph[i];if(s===void 0&&(s=new Float32Array(i),Ph[i]=s),e!==0){n.toArray(s,0);for(let o=1,c=0;o!==e;++o)c+=t,r[o].toArray(s,c)}return s}function Vt(r,e){if(r.length!==e.length)return!1;for(let t=0,n=r.length;t<n;t++)if(r[t]!==e[t])return!1;return!0}function Ht(r,e){for(let t=0,n=e.length;t<n;t++)r[t]=e[t]}function Ro(r,e){let t=Lh[e];t===void 0&&(t=new Int32Array(e),Lh[e]=t);for(let n=0;n!==e;++n)t[n]=r.allocateTextureUnit();return t}function P_(r,e){const t=this.cache;t[0]!==e&&(r.uniform1f(this.addr,e),t[0]=e)}function L_(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(r.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Vt(t,e))return;r.uniform2fv(this.addr,e),Ht(t,e)}}function I_(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(r.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(r.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Vt(t,e))return;r.uniform3fv(this.addr,e),Ht(t,e)}}function D_(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(r.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Vt(t,e))return;r.uniform4fv(this.addr,e),Ht(t,e)}}function N_(r,e){const t=this.cache,n=e.elements;if(n===void 0){if(Vt(t,e))return;r.uniformMatrix2fv(this.addr,!1,e),Ht(t,e)}else{if(Vt(t,n))return;Nh.set(n),r.uniformMatrix2fv(this.addr,!1,Nh),Ht(t,n)}}function U_(r,e){const t=this.cache,n=e.elements;if(n===void 0){if(Vt(t,e))return;r.uniformMatrix3fv(this.addr,!1,e),Ht(t,e)}else{if(Vt(t,n))return;Dh.set(n),r.uniformMatrix3fv(this.addr,!1,Dh),Ht(t,n)}}function F_(r,e){const t=this.cache,n=e.elements;if(n===void 0){if(Vt(t,e))return;r.uniformMatrix4fv(this.addr,!1,e),Ht(t,e)}else{if(Vt(t,n))return;Ih.set(n),r.uniformMatrix4fv(this.addr,!1,Ih),Ht(t,n)}}function O_(r,e){const t=this.cache;t[0]!==e&&(r.uniform1i(this.addr,e),t[0]=e)}function B_(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(r.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Vt(t,e))return;r.uniform2iv(this.addr,e),Ht(t,e)}}function z_(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(r.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Vt(t,e))return;r.uniform3iv(this.addr,e),Ht(t,e)}}function k_(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(r.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Vt(t,e))return;r.uniform4iv(this.addr,e),Ht(t,e)}}function G_(r,e){const t=this.cache;t[0]!==e&&(r.uniform1ui(this.addr,e),t[0]=e)}function V_(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(r.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Vt(t,e))return;r.uniform2uiv(this.addr,e),Ht(t,e)}}function H_(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(r.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Vt(t,e))return;r.uniform3uiv(this.addr,e),Ht(t,e)}}function W_(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(r.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Vt(t,e))return;r.uniform4uiv(this.addr,e),Ht(t,e)}}function X_(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i);let s;this.type===r.SAMPLER_2D_SHADOW?(bc.compareFunction=t.isReversedDepthBuffer()?Xc:Wc,s=bc):s=$u,t.setTexture2D(e||s,i)}function q_(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTexture3D(e||ef,i)}function Y_(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTextureCube(e||tf,i)}function K_(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTexture2DArray(e||Qu,i)}function j_(r){switch(r){case 5126:return P_;case 35664:return L_;case 35665:return I_;case 35666:return D_;case 35674:return N_;case 35675:return U_;case 35676:return F_;case 5124:case 35670:return O_;case 35667:case 35671:return B_;case 35668:case 35672:return z_;case 35669:case 35673:return k_;case 5125:return G_;case 36294:return V_;case 36295:return H_;case 36296:return W_;case 35678:case 36198:case 36298:case 36306:case 35682:return X_;case 35679:case 36299:case 36307:return q_;case 35680:case 36300:case 36308:case 36293:return Y_;case 36289:case 36303:case 36311:case 36292:return K_}}function J_(r,e){r.uniform1fv(this.addr,e)}function Z_(r,e){const t=Ls(e,this.size,2);r.uniform2fv(this.addr,t)}function $_(r,e){const t=Ls(e,this.size,3);r.uniform3fv(this.addr,t)}function Q_(r,e){const t=Ls(e,this.size,4);r.uniform4fv(this.addr,t)}function ex(r,e){const t=Ls(e,this.size,4);r.uniformMatrix2fv(this.addr,!1,t)}function tx(r,e){const t=Ls(e,this.size,9);r.uniformMatrix3fv(this.addr,!1,t)}function nx(r,e){const t=Ls(e,this.size,16);r.uniformMatrix4fv(this.addr,!1,t)}function ix(r,e){r.uniform1iv(this.addr,e)}function sx(r,e){r.uniform2iv(this.addr,e)}function rx(r,e){r.uniform3iv(this.addr,e)}function ox(r,e){r.uniform4iv(this.addr,e)}function ax(r,e){r.uniform1uiv(this.addr,e)}function cx(r,e){r.uniform2uiv(this.addr,e)}function lx(r,e){r.uniform3uiv(this.addr,e)}function hx(r,e){r.uniform4uiv(this.addr,e)}function ux(r,e,t){const n=this.cache,i=e.length,s=Ro(t,i);Vt(n,s)||(r.uniform1iv(this.addr,s),Ht(n,s));let o;this.type===r.SAMPLER_2D_SHADOW?o=bc:o=$u;for(let c=0;c!==i;++c)t.setTexture2D(e[c]||o,s[c])}function fx(r,e,t){const n=this.cache,i=e.length,s=Ro(t,i);Vt(n,s)||(r.uniform1iv(this.addr,s),Ht(n,s));for(let o=0;o!==i;++o)t.setTexture3D(e[o]||ef,s[o])}function dx(r,e,t){const n=this.cache,i=e.length,s=Ro(t,i);Vt(n,s)||(r.uniform1iv(this.addr,s),Ht(n,s));for(let o=0;o!==i;++o)t.setTextureCube(e[o]||tf,s[o])}function px(r,e,t){const n=this.cache,i=e.length,s=Ro(t,i);Vt(n,s)||(r.uniform1iv(this.addr,s),Ht(n,s));for(let o=0;o!==i;++o)t.setTexture2DArray(e[o]||Qu,s[o])}function mx(r){switch(r){case 5126:return J_;case 35664:return Z_;case 35665:return $_;case 35666:return Q_;case 35674:return ex;case 35675:return tx;case 35676:return nx;case 5124:case 35670:return ix;case 35667:case 35671:return sx;case 35668:case 35672:return rx;case 35669:case 35673:return ox;case 5125:return ax;case 36294:return cx;case 36295:return lx;case 36296:return hx;case 35678:case 36198:case 36298:case 36306:case 35682:return ux;case 35679:case 36299:case 36307:return fx;case 35680:case 36300:case 36308:case 36293:return dx;case 36289:case 36303:case 36311:case 36292:return px}}class gx{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=j_(t.type)}}class _x{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=mx(t.type)}}class xx{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const i=this.seq;for(let s=0,o=i.length;s!==o;++s){const c=i[s];c.setValue(e,t[c.id],n)}}}const _a=/(\w+)(\])?(\[|\.)?/g;function Uh(r,e){r.seq.push(e),r.map[e.id]=e}function vx(r,e,t){const n=r.name,i=n.length;for(_a.lastIndex=0;;){const s=_a.exec(n),o=_a.lastIndex;let c=s[1];const l=s[2]==="]",a=s[3];if(l&&(c=c|0),a===void 0||a==="["&&o+2===i){Uh(t,a===void 0?new gx(c,r,e):new _x(c,r,e));break}else{let u=t.map[c];u===void 0&&(u=new xx(c),Uh(t,u)),t=u}}}class lo{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let o=0;o<n;++o){const c=e.getActiveUniform(t,o),l=e.getUniformLocation(t,c.name);vx(c,l,this)}const i=[],s=[];for(const o of this.seq)o.type===e.SAMPLER_2D_SHADOW||o.type===e.SAMPLER_CUBE_SHADOW||o.type===e.SAMPLER_2D_ARRAY_SHADOW?i.push(o):s.push(o);i.length>0&&(this.seq=i.concat(s))}setValue(e,t,n,i){const s=this.map[t];s!==void 0&&s.setValue(e,n,i)}setOptional(e,t,n){const i=t[n];i!==void 0&&this.setValue(e,n,i)}static upload(e,t,n,i){for(let s=0,o=t.length;s!==o;++s){const c=t[s],l=n[c.id];l.needsUpdate!==!1&&c.setValue(e,l.value,i)}}static seqWithValue(e,t){const n=[];for(let i=0,s=e.length;i!==s;++i){const o=e[i];o.id in t&&n.push(o)}return n}}function Fh(r,e,t){const n=r.createShader(e);return r.shaderSource(n,t),r.compileShader(n),n}const yx=37297;let Mx=0;function Sx(r,e){const t=r.split(`
`),n=[],i=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let o=i;o<s;o++){const c=o+1;n.push(`${c===e?">":" "} ${c}: ${t[o]}`)}return n.join(`
`)}const Oh=new Ze;function bx(r){at._getMatrix(Oh,at.workingColorSpace,r);const e=`mat3( ${Oh.elements.map(t=>t.toFixed(4))} )`;switch(at.getTransfer(r)){case go:return[e,"LinearTransferOETF"];case pt:return[e,"sRGBTransferOETF"];default:return Ne("WebGLProgram: Unsupported color space: ",r),[e,"LinearTransferOETF"]}}function Bh(r,e,t){const n=r.getShaderParameter(e,r.COMPILE_STATUS),s=(r.getShaderInfoLog(e)||"").trim();if(n&&s==="")return"";const o=/ERROR: 0:(\d+)/.exec(s);if(o){const c=parseInt(o[1]);return t.toUpperCase()+`

`+s+`

`+Sx(r.getShaderSource(e),c)}else return s}function wx(r,e){const t=bx(e);return[`vec4 ${r}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}const Tx={[Pc]:"Linear",[Lc]:"Reinhard",[Ic]:"Cineon",[wo]:"ACESFilmic",[Nc]:"AgX",[Uc]:"Neutral",[Dc]:"Custom"};function Ex(r,e){const t=Tx[e];return t===void 0?(Ne("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+r+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+r+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const to=new L;function Ax(){at.getLuminanceCoefficients(to);const r=to.x.toFixed(4),e=to.y.toFixed(4),t=to.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${r}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Rx(r){return[r.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",r.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter($s).join(`
`)}function Cx(r){const e=[];for(const t in r){const n=r[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function Px(r,e){const t={},n=r.getProgramParameter(e,r.ACTIVE_ATTRIBUTES);for(let i=0;i<n;i++){const s=r.getActiveAttrib(e,i),o=s.name;let c=1;s.type===r.FLOAT_MAT2&&(c=2),s.type===r.FLOAT_MAT3&&(c=3),s.type===r.FLOAT_MAT4&&(c=4),t[o]={type:s.type,location:r.getAttribLocation(e,o),locationSize:c}}return t}function $s(r){return r!==""}function zh(r,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return r.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function kh(r,e){return r.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const Lx=/^[ \t]*#include +<([\w\d./]+)>/gm;function wc(r){return r.replace(Lx,Dx)}const Ix=new Map;function Dx(r,e){let t=st[e];if(t===void 0){const n=Ix.get(e);if(n!==void 0)t=st[n],Ne('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return wc(t)}const Nx=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Gh(r){return r.replace(Nx,Ux)}function Ux(r,e,t,n){let i="";for(let s=parseInt(e);s<parseInt(t);s++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return i}function Vh(r){let e=`precision ${r.precision} float;
	precision ${r.precision} int;
	precision ${r.precision} sampler2D;
	precision ${r.precision} samplerCube;
	precision ${r.precision} sampler3D;
	precision ${r.precision} sampler2DArray;
	precision ${r.precision} sampler2DShadow;
	precision ${r.precision} samplerCubeShadow;
	precision ${r.precision} sampler2DArrayShadow;
	precision ${r.precision} isampler2D;
	precision ${r.precision} isampler3D;
	precision ${r.precision} isamplerCube;
	precision ${r.precision} isampler2DArray;
	precision ${r.precision} usampler2D;
	precision ${r.precision} usampler3D;
	precision ${r.precision} usamplerCube;
	precision ${r.precision} usampler2DArray;
	`;return r.precision==="highp"?e+=`
#define HIGH_PRECISION`:r.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:r.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}const Fx={[Qs]:"SHADOWMAP_TYPE_PCF",[js]:"SHADOWMAP_TYPE_VSM"};function Ox(r){return Fx[r.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const Bx={[Ui]:"ENVMAP_TYPE_CUBE",[_s]:"ENVMAP_TYPE_CUBE",[To]:"ENVMAP_TYPE_CUBE_UV"};function zx(r){return r.envMap===!1?"ENVMAP_TYPE_CUBE":Bx[r.envMapMode]||"ENVMAP_TYPE_CUBE"}const kx={[_s]:"ENVMAP_MODE_REFRACTION"};function Gx(r){return r.envMap===!1?"ENVMAP_MODE_REFLECTION":kx[r.envMapMode]||"ENVMAP_MODE_REFLECTION"}const Vx={[lu]:"ENVMAP_BLENDING_MULTIPLY",[$f]:"ENVMAP_BLENDING_MIX",[Qf]:"ENVMAP_BLENDING_ADD"};function Hx(r){return r.envMap===!1?"ENVMAP_BLENDING_NONE":Vx[r.combine]||"ENVMAP_BLENDING_NONE"}function Wx(r){const e=r.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:n,maxMip:t}}function Xx(r,e,t,n){const i=r.getContext(),s=t.defines;let o=t.vertexShader,c=t.fragmentShader;const l=Ox(t),a=zx(t),h=Gx(t),u=Hx(t),f=Wx(t),_=Rx(t),d=Cx(s),m=i.createProgram();let p,g,x=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,d].filter($s).join(`
`),p.length>0&&(p+=`
`),g=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,d].filter($s).join(`
`),g.length>0&&(g+=`
`)):(p=[Vh(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,d,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter($s).join(`
`),g=[Vh(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,d,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+a:"",t.envMap?"#define "+h:"",t.envMap?"#define "+u:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==kn?"#define TONE_MAPPING":"",t.toneMapping!==kn?st.tonemapping_pars_fragment:"",t.toneMapping!==kn?Ex("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",st.colorspace_pars_fragment,wx("linearToOutputTexel",t.outputColorSpace),Ax(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter($s).join(`
`)),o=wc(o),o=zh(o,t),o=kh(o,t),c=wc(c),c=zh(c,t),c=kh(c,t),o=Gh(o),c=Gh(c),t.isRawShaderMaterial!==!0&&(x=`#version 300 es
`,p=[_,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+p,g=["#define varying in",t.glslVersion===Rl?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Rl?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+g);const v=x+p+o,y=x+g+c,w=Fh(i,i.VERTEX_SHADER,v),b=Fh(i,i.FRAGMENT_SHADER,y);i.attachShader(m,w),i.attachShader(m,b),t.index0AttributeName!==void 0?i.bindAttribLocation(m,0,t.index0AttributeName):t.morphTargets===!0&&i.bindAttribLocation(m,0,"position"),i.linkProgram(m);function A(P){if(r.debug.checkShaderErrors){const I=i.getProgramInfoLog(m)||"",F=i.getShaderInfoLog(w)||"",V=i.getShaderInfoLog(b)||"",N=I.trim(),O=F.trim(),z=V.trim();let j=!0,se=!0;if(i.getProgramParameter(m,i.LINK_STATUS)===!1)if(j=!1,typeof r.debug.onShaderError=="function")r.debug.onShaderError(i,m,w,b);else{const me=Bh(i,w,"vertex"),Te=Bh(i,b,"fragment");ke("THREE.WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(m,i.VALIDATE_STATUS)+`

Material Name: `+P.name+`
Material Type: `+P.type+`

Program Info Log: `+N+`
`+me+`
`+Te)}else N!==""?Ne("WebGLProgram: Program Info Log:",N):(O===""||z==="")&&(se=!1);se&&(P.diagnostics={runnable:j,programLog:N,vertexShader:{log:O,prefix:p},fragmentShader:{log:z,prefix:g}})}i.deleteShader(w),i.deleteShader(b),M=new lo(i,m),T=Px(i,m)}let M;this.getUniforms=function(){return M===void 0&&A(this),M};let T;this.getAttributes=function(){return T===void 0&&A(this),T};let C=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return C===!1&&(C=i.getProgramParameter(m,yx)),C},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(m),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=Mx++,this.cacheKey=e,this.usedTimes=1,this.program=m,this.vertexShader=w,this.fragmentShader=b,this}let qx=0;class Yx{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,n=e.fragmentShader,i=this._getShaderStage(t),s=this._getShaderStage(n),o=this._getShaderCacheForMaterial(e);return o.has(i)===!1&&(o.add(i),i.usedTimes++),o.has(s)===!1&&(o.add(s),s.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new Kx(e),t.set(e,n)),n}}class Kx{constructor(e){this.id=qx++,this.code=e,this.usedTimes=0}}function jx(r){return r===Oi||r===fo||r===po}function Jx(r,e,t,n,i,s){const o=new Kc,c=new Yx,l=new Set,a=[],h=new Map,u=n.logarithmicDepthBuffer;let f=n.precision;const _={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function d(M){return l.add(M),M===0?"uv":`uv${M}`}function m(M,T,C,P,I,F){const V=P.fog,N=I.geometry,O=M.isMeshStandardMaterial||M.isMeshLambertMaterial||M.isMeshPhongMaterial?P.environment:null,z=M.isMeshStandardMaterial||M.isMeshLambertMaterial&&!M.envMap||M.isMeshPhongMaterial&&!M.envMap,j=e.get(M.envMap||O,z),se=j&&j.mapping===To?j.image.height:null,me=_[M.type];M.precision!==null&&(f=n.getMaxPrecision(M.precision),f!==M.precision&&Ne("WebGLProgram.getParameters:",M.precision,"not supported, using",f,"instead."));const Te=N.morphAttributes.position||N.morphAttributes.normal||N.morphAttributes.color,Le=Te!==void 0?Te.length:0;let tt=0;N.morphAttributes.position!==void 0&&(tt=1),N.morphAttributes.normal!==void 0&&(tt=2),N.morphAttributes.color!==void 0&&(tt=3);let lt,Ye,Z,xe;if(me){const $e=Nn[me];lt=$e.vertexShader,Ye=$e.fragmentShader}else lt=M.vertexShader,Ye=M.fragmentShader,c.update(M),Z=c.getVertexShaderID(M),xe=c.getFragmentShaderID(M);const ce=r.getRenderTarget(),Ue=r.state.buffers.depth.getReversed(),Ve=I.isInstancedMesh===!0,Ge=I.isBatchedMesh===!0,ht=!!M.map,He=!!M.matcap,$=!!j,re=!!M.aoMap,te=!!M.lightMap,Me=!!M.bumpMap,ge=!!M.normalMap,We=!!M.displacementMap,D=!!M.emissiveMap,Ke=!!M.metalnessMap,Ie=!!M.roughnessMap,Xe=M.anisotropy>0,oe=M.clearcoat>0,dt=M.dispersion>0,R=M.iridescence>0,S=M.sheen>0,k=M.transmission>0,K=Xe&&!!M.anisotropyMap,ne=oe&&!!M.clearcoatMap,ae=oe&&!!M.clearcoatNormalMap,ue=oe&&!!M.clearcoatRoughnessMap,q=R&&!!M.iridescenceMap,J=R&&!!M.iridescenceThicknessMap,be=S&&!!M.sheenColorMap,Re=S&&!!M.sheenRoughnessMap,de=!!M.specularMap,le=!!M.specularColorMap,je=!!M.specularIntensityMap,nt=k&&!!M.transmissionMap,ft=k&&!!M.thicknessMap,U=!!M.gradientMap,he=!!M.alphaMap,Y=M.alphaTest>0,Ee=!!M.alphaHash,pe=!!M.extensions;let ie=kn;M.toneMapped&&(ce===null||ce.isXRRenderTarget===!0)&&(ie=r.toneMapping);const Fe={shaderID:me,shaderType:M.type,shaderName:M.name,vertexShader:lt,fragmentShader:Ye,defines:M.defines,customVertexShaderID:Z,customFragmentShaderID:xe,isRawShaderMaterial:M.isRawShaderMaterial===!0,glslVersion:M.glslVersion,precision:f,batching:Ge,batchingColor:Ge&&I._colorsTexture!==null,instancing:Ve,instancingColor:Ve&&I.instanceColor!==null,instancingMorph:Ve&&I.morphTexture!==null,outputColorSpace:ce===null?r.outputColorSpace:ce.isXRRenderTarget===!0?ce.texture.colorSpace:at.workingColorSpace,alphaToCoverage:!!M.alphaToCoverage,map:ht,matcap:He,envMap:$,envMapMode:$&&j.mapping,envMapCubeUVHeight:se,aoMap:re,lightMap:te,bumpMap:Me,normalMap:ge,displacementMap:We,emissiveMap:D,normalMapObjectSpace:ge&&M.normalMapType===od,normalMapTangentSpace:ge&&M.normalMapType===dc,packedNormalMap:ge&&M.normalMapType===dc&&jx(M.normalMap.format),metalnessMap:Ke,roughnessMap:Ie,anisotropy:Xe,anisotropyMap:K,clearcoat:oe,clearcoatMap:ne,clearcoatNormalMap:ae,clearcoatRoughnessMap:ue,dispersion:dt,iridescence:R,iridescenceMap:q,iridescenceThicknessMap:J,sheen:S,sheenColorMap:be,sheenRoughnessMap:Re,specularMap:de,specularColorMap:le,specularIntensityMap:je,transmission:k,transmissionMap:nt,thicknessMap:ft,gradientMap:U,opaque:M.transparent===!1&&M.blending===fs&&M.alphaToCoverage===!1,alphaMap:he,alphaTest:Y,alphaHash:Ee,combine:M.combine,mapUv:ht&&d(M.map.channel),aoMapUv:re&&d(M.aoMap.channel),lightMapUv:te&&d(M.lightMap.channel),bumpMapUv:Me&&d(M.bumpMap.channel),normalMapUv:ge&&d(M.normalMap.channel),displacementMapUv:We&&d(M.displacementMap.channel),emissiveMapUv:D&&d(M.emissiveMap.channel),metalnessMapUv:Ke&&d(M.metalnessMap.channel),roughnessMapUv:Ie&&d(M.roughnessMap.channel),anisotropyMapUv:K&&d(M.anisotropyMap.channel),clearcoatMapUv:ne&&d(M.clearcoatMap.channel),clearcoatNormalMapUv:ae&&d(M.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ue&&d(M.clearcoatRoughnessMap.channel),iridescenceMapUv:q&&d(M.iridescenceMap.channel),iridescenceThicknessMapUv:J&&d(M.iridescenceThicknessMap.channel),sheenColorMapUv:be&&d(M.sheenColorMap.channel),sheenRoughnessMapUv:Re&&d(M.sheenRoughnessMap.channel),specularMapUv:de&&d(M.specularMap.channel),specularColorMapUv:le&&d(M.specularColorMap.channel),specularIntensityMapUv:je&&d(M.specularIntensityMap.channel),transmissionMapUv:nt&&d(M.transmissionMap.channel),thicknessMapUv:ft&&d(M.thicknessMap.channel),alphaMapUv:he&&d(M.alphaMap.channel),vertexTangents:!!N.attributes.tangent&&(ge||Xe),vertexNormals:!!N.attributes.normal,vertexColors:M.vertexColors,vertexAlphas:M.vertexColors===!0&&!!N.attributes.color&&N.attributes.color.itemSize===4,pointsUvs:I.isPoints===!0&&!!N.attributes.uv&&(ht||he),fog:!!V,useFog:M.fog===!0,fogExp2:!!V&&V.isFogExp2,flatShading:M.wireframe===!1&&(M.flatShading===!0||N.attributes.normal===void 0&&ge===!1&&(M.isMeshLambertMaterial||M.isMeshPhongMaterial||M.isMeshStandardMaterial||M.isMeshPhysicalMaterial)),sizeAttenuation:M.sizeAttenuation===!0,logarithmicDepthBuffer:u,reversedDepthBuffer:Ue,skinning:I.isSkinnedMesh===!0,morphTargets:N.morphAttributes.position!==void 0,morphNormals:N.morphAttributes.normal!==void 0,morphColors:N.morphAttributes.color!==void 0,morphTargetsCount:Le,morphTextureStride:tt,numDirLights:T.directional.length,numPointLights:T.point.length,numSpotLights:T.spot.length,numSpotLightMaps:T.spotLightMap.length,numRectAreaLights:T.rectArea.length,numHemiLights:T.hemi.length,numDirLightShadows:T.directionalShadowMap.length,numPointLightShadows:T.pointShadowMap.length,numSpotLightShadows:T.spotShadowMap.length,numSpotLightShadowsWithMaps:T.numSpotLightShadowsWithMaps,numLightProbes:T.numLightProbes,numLightProbeGrids:F.length,numClippingPlanes:s.numPlanes,numClipIntersection:s.numIntersection,dithering:M.dithering,shadowMapEnabled:r.shadowMap.enabled&&C.length>0,shadowMapType:r.shadowMap.type,toneMapping:ie,decodeVideoTexture:ht&&M.map.isVideoTexture===!0&&at.getTransfer(M.map.colorSpace)===pt,decodeVideoTextureEmissive:D&&M.emissiveMap.isVideoTexture===!0&&at.getTransfer(M.emissiveMap.colorSpace)===pt,premultipliedAlpha:M.premultipliedAlpha,doubleSided:M.side===It,flipSided:M.side===Zt,useDepthPacking:M.depthPacking>=0,depthPacking:M.depthPacking||0,index0AttributeName:M.index0AttributeName,extensionClipCullDistance:pe&&M.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(pe&&M.extensions.multiDraw===!0||Ge)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:M.customProgramCacheKey()};return Fe.vertexUv1s=l.has(1),Fe.vertexUv2s=l.has(2),Fe.vertexUv3s=l.has(3),l.clear(),Fe}function p(M){const T=[];if(M.shaderID?T.push(M.shaderID):(T.push(M.customVertexShaderID),T.push(M.customFragmentShaderID)),M.defines!==void 0)for(const C in M.defines)T.push(C),T.push(M.defines[C]);return M.isRawShaderMaterial===!1&&(g(T,M),x(T,M),T.push(r.outputColorSpace)),T.push(M.customProgramCacheKey),T.join()}function g(M,T){M.push(T.precision),M.push(T.outputColorSpace),M.push(T.envMapMode),M.push(T.envMapCubeUVHeight),M.push(T.mapUv),M.push(T.alphaMapUv),M.push(T.lightMapUv),M.push(T.aoMapUv),M.push(T.bumpMapUv),M.push(T.normalMapUv),M.push(T.displacementMapUv),M.push(T.emissiveMapUv),M.push(T.metalnessMapUv),M.push(T.roughnessMapUv),M.push(T.anisotropyMapUv),M.push(T.clearcoatMapUv),M.push(T.clearcoatNormalMapUv),M.push(T.clearcoatRoughnessMapUv),M.push(T.iridescenceMapUv),M.push(T.iridescenceThicknessMapUv),M.push(T.sheenColorMapUv),M.push(T.sheenRoughnessMapUv),M.push(T.specularMapUv),M.push(T.specularColorMapUv),M.push(T.specularIntensityMapUv),M.push(T.transmissionMapUv),M.push(T.thicknessMapUv),M.push(T.combine),M.push(T.fogExp2),M.push(T.sizeAttenuation),M.push(T.morphTargetsCount),M.push(T.morphAttributeCount),M.push(T.numDirLights),M.push(T.numPointLights),M.push(T.numSpotLights),M.push(T.numSpotLightMaps),M.push(T.numHemiLights),M.push(T.numRectAreaLights),M.push(T.numDirLightShadows),M.push(T.numPointLightShadows),M.push(T.numSpotLightShadows),M.push(T.numSpotLightShadowsWithMaps),M.push(T.numLightProbes),M.push(T.shadowMapType),M.push(T.toneMapping),M.push(T.numClippingPlanes),M.push(T.numClipIntersection),M.push(T.depthPacking)}function x(M,T){o.disableAll(),T.instancing&&o.enable(0),T.instancingColor&&o.enable(1),T.instancingMorph&&o.enable(2),T.matcap&&o.enable(3),T.envMap&&o.enable(4),T.normalMapObjectSpace&&o.enable(5),T.normalMapTangentSpace&&o.enable(6),T.clearcoat&&o.enable(7),T.iridescence&&o.enable(8),T.alphaTest&&o.enable(9),T.vertexColors&&o.enable(10),T.vertexAlphas&&o.enable(11),T.vertexUv1s&&o.enable(12),T.vertexUv2s&&o.enable(13),T.vertexUv3s&&o.enable(14),T.vertexTangents&&o.enable(15),T.anisotropy&&o.enable(16),T.alphaHash&&o.enable(17),T.batching&&o.enable(18),T.dispersion&&o.enable(19),T.batchingColor&&o.enable(20),T.gradientMap&&o.enable(21),T.packedNormalMap&&o.enable(22),T.vertexNormals&&o.enable(23),M.push(o.mask),o.disableAll(),T.fog&&o.enable(0),T.useFog&&o.enable(1),T.flatShading&&o.enable(2),T.logarithmicDepthBuffer&&o.enable(3),T.reversedDepthBuffer&&o.enable(4),T.skinning&&o.enable(5),T.morphTargets&&o.enable(6),T.morphNormals&&o.enable(7),T.morphColors&&o.enable(8),T.premultipliedAlpha&&o.enable(9),T.shadowMapEnabled&&o.enable(10),T.doubleSided&&o.enable(11),T.flipSided&&o.enable(12),T.useDepthPacking&&o.enable(13),T.dithering&&o.enable(14),T.transmission&&o.enable(15),T.sheen&&o.enable(16),T.opaque&&o.enable(17),T.pointsUvs&&o.enable(18),T.decodeVideoTexture&&o.enable(19),T.decodeVideoTextureEmissive&&o.enable(20),T.alphaToCoverage&&o.enable(21),T.numLightProbeGrids>0&&o.enable(22),M.push(o.mask)}function v(M){const T=_[M.type];let C;if(T){const P=Nn[T];C=Ss.clone(P.uniforms)}else C=M.uniforms;return C}function y(M,T){let C=h.get(T);return C!==void 0?++C.usedTimes:(C=new Xx(r,T,M,i),a.push(C),h.set(T,C)),C}function w(M){if(--M.usedTimes===0){const T=a.indexOf(M);a[T]=a[a.length-1],a.pop(),h.delete(M.cacheKey),M.destroy()}}function b(M){c.remove(M)}function A(){c.dispose()}return{getParameters:m,getProgramCacheKey:p,getUniforms:v,acquireProgram:y,releaseProgram:w,releaseShaderCache:b,programs:a,dispose:A}}function Zx(){let r=new WeakMap;function e(o){return r.has(o)}function t(o){let c=r.get(o);return c===void 0&&(c={},r.set(o,c)),c}function n(o){r.delete(o)}function i(o,c,l){r.get(o)[c]=l}function s(){r=new WeakMap}return{has:e,get:t,remove:n,update:i,dispose:s}}function $x(r,e){return r.groupOrder!==e.groupOrder?r.groupOrder-e.groupOrder:r.renderOrder!==e.renderOrder?r.renderOrder-e.renderOrder:r.material.id!==e.material.id?r.material.id-e.material.id:r.materialVariant!==e.materialVariant?r.materialVariant-e.materialVariant:r.z!==e.z?r.z-e.z:r.id-e.id}function Hh(r,e){return r.groupOrder!==e.groupOrder?r.groupOrder-e.groupOrder:r.renderOrder!==e.renderOrder?r.renderOrder-e.renderOrder:r.z!==e.z?e.z-r.z:r.id-e.id}function Wh(){const r=[];let e=0;const t=[],n=[],i=[];function s(){e=0,t.length=0,n.length=0,i.length=0}function o(f){let _=0;return f.isInstancedMesh&&(_+=2),f.isSkinnedMesh&&(_+=1),_}function c(f,_,d,m,p,g){let x=r[e];return x===void 0?(x={id:f.id,object:f,geometry:_,material:d,materialVariant:o(f),groupOrder:m,renderOrder:f.renderOrder,z:p,group:g},r[e]=x):(x.id=f.id,x.object=f,x.geometry=_,x.material=d,x.materialVariant=o(f),x.groupOrder=m,x.renderOrder=f.renderOrder,x.z=p,x.group=g),e++,x}function l(f,_,d,m,p,g){const x=c(f,_,d,m,p,g);d.transmission>0?n.push(x):d.transparent===!0?i.push(x):t.push(x)}function a(f,_,d,m,p,g){const x=c(f,_,d,m,p,g);d.transmission>0?n.unshift(x):d.transparent===!0?i.unshift(x):t.unshift(x)}function h(f,_){t.length>1&&t.sort(f||$x),n.length>1&&n.sort(_||Hh),i.length>1&&i.sort(_||Hh)}function u(){for(let f=e,_=r.length;f<_;f++){const d=r[f];if(d.id===null)break;d.id=null,d.object=null,d.geometry=null,d.material=null,d.group=null}}return{opaque:t,transmissive:n,transparent:i,init:s,push:l,unshift:a,finish:u,sort:h}}function Qx(){let r=new WeakMap;function e(n,i){const s=r.get(n);let o;return s===void 0?(o=new Wh,r.set(n,[o])):i>=s.length?(o=new Wh,s.push(o)):o=s[i],o}function t(){r=new WeakMap}return{get:e,dispose:t}}function e2(){const r={};return{get:function(e){if(r[e.id]!==void 0)return r[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new L,color:new ye};break;case"SpotLight":t={position:new L,direction:new L,color:new ye,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new L,color:new ye,distance:0,decay:0};break;case"HemisphereLight":t={direction:new L,skyColor:new ye,groundColor:new ye};break;case"RectAreaLight":t={color:new ye,position:new L,halfWidth:new L,halfHeight:new L};break}return r[e.id]=t,t}}}function t2(){const r={};return{get:function(e){if(r[e.id]!==void 0)return r[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ee};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ee};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ee,shadowCameraNear:1,shadowCameraFar:1e3};break}return r[e.id]=t,t}}}let n2=0;function i2(r,e){return(e.castShadow?2:0)-(r.castShadow?2:0)+(e.map?1:0)-(r.map?1:0)}function s2(r){const e=new e2,t=t2(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let a=0;a<9;a++)n.probe.push(new L);const i=new L,s=new qe,o=new qe;function c(a){let h=0,u=0,f=0;for(let T=0;T<9;T++)n.probe[T].set(0,0,0);let _=0,d=0,m=0,p=0,g=0,x=0,v=0,y=0,w=0,b=0,A=0;a.sort(i2);for(let T=0,C=a.length;T<C;T++){const P=a[T],I=P.color,F=P.intensity,V=P.distance;let N=null;if(P.shadow&&P.shadow.map&&(P.shadow.map.texture.format===Oi?N=P.shadow.map.texture:N=P.shadow.map.depthTexture||P.shadow.map.texture),P.isAmbientLight)h+=I.r*F,u+=I.g*F,f+=I.b*F;else if(P.isLightProbe){for(let O=0;O<9;O++)n.probe[O].addScaledVector(P.sh.coefficients[O],F);A++}else if(P.isDirectionalLight){const O=e.get(P);if(O.color.copy(P.color).multiplyScalar(P.intensity),P.castShadow){const z=P.shadow,j=t.get(P);j.shadowIntensity=z.intensity,j.shadowBias=z.bias,j.shadowNormalBias=z.normalBias,j.shadowRadius=z.radius,j.shadowMapSize=z.mapSize,n.directionalShadow[_]=j,n.directionalShadowMap[_]=N,n.directionalShadowMatrix[_]=P.shadow.matrix,x++}n.directional[_]=O,_++}else if(P.isSpotLight){const O=e.get(P);O.position.setFromMatrixPosition(P.matrixWorld),O.color.copy(I).multiplyScalar(F),O.distance=V,O.coneCos=Math.cos(P.angle),O.penumbraCos=Math.cos(P.angle*(1-P.penumbra)),O.decay=P.decay,n.spot[m]=O;const z=P.shadow;if(P.map&&(n.spotLightMap[w]=P.map,w++,z.updateMatrices(P),P.castShadow&&b++),n.spotLightMatrix[m]=z.matrix,P.castShadow){const j=t.get(P);j.shadowIntensity=z.intensity,j.shadowBias=z.bias,j.shadowNormalBias=z.normalBias,j.shadowRadius=z.radius,j.shadowMapSize=z.mapSize,n.spotShadow[m]=j,n.spotShadowMap[m]=N,y++}m++}else if(P.isRectAreaLight){const O=e.get(P);O.color.copy(I).multiplyScalar(F),O.halfWidth.set(P.width*.5,0,0),O.halfHeight.set(0,P.height*.5,0),n.rectArea[p]=O,p++}else if(P.isPointLight){const O=e.get(P);if(O.color.copy(P.color).multiplyScalar(P.intensity),O.distance=P.distance,O.decay=P.decay,P.castShadow){const z=P.shadow,j=t.get(P);j.shadowIntensity=z.intensity,j.shadowBias=z.bias,j.shadowNormalBias=z.normalBias,j.shadowRadius=z.radius,j.shadowMapSize=z.mapSize,j.shadowCameraNear=z.camera.near,j.shadowCameraFar=z.camera.far,n.pointShadow[d]=j,n.pointShadowMap[d]=N,n.pointShadowMatrix[d]=P.shadow.matrix,v++}n.point[d]=O,d++}else if(P.isHemisphereLight){const O=e.get(P);O.skyColor.copy(P.color).multiplyScalar(F),O.groundColor.copy(P.groundColor).multiplyScalar(F),n.hemi[g]=O,g++}}p>0&&(r.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=_e.LTC_FLOAT_1,n.rectAreaLTC2=_e.LTC_FLOAT_2):(n.rectAreaLTC1=_e.LTC_HALF_1,n.rectAreaLTC2=_e.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=u,n.ambient[2]=f;const M=n.hash;(M.directionalLength!==_||M.pointLength!==d||M.spotLength!==m||M.rectAreaLength!==p||M.hemiLength!==g||M.numDirectionalShadows!==x||M.numPointShadows!==v||M.numSpotShadows!==y||M.numSpotMaps!==w||M.numLightProbes!==A)&&(n.directional.length=_,n.spot.length=m,n.rectArea.length=p,n.point.length=d,n.hemi.length=g,n.directionalShadow.length=x,n.directionalShadowMap.length=x,n.pointShadow.length=v,n.pointShadowMap.length=v,n.spotShadow.length=y,n.spotShadowMap.length=y,n.directionalShadowMatrix.length=x,n.pointShadowMatrix.length=v,n.spotLightMatrix.length=y+w-b,n.spotLightMap.length=w,n.numSpotLightShadowsWithMaps=b,n.numLightProbes=A,M.directionalLength=_,M.pointLength=d,M.spotLength=m,M.rectAreaLength=p,M.hemiLength=g,M.numDirectionalShadows=x,M.numPointShadows=v,M.numSpotShadows=y,M.numSpotMaps=w,M.numLightProbes=A,n.version=n2++)}function l(a,h){let u=0,f=0,_=0,d=0,m=0;const p=h.matrixWorldInverse;for(let g=0,x=a.length;g<x;g++){const v=a[g];if(v.isDirectionalLight){const y=n.directional[u];y.direction.setFromMatrixPosition(v.matrixWorld),i.setFromMatrixPosition(v.target.matrixWorld),y.direction.sub(i),y.direction.transformDirection(p),u++}else if(v.isSpotLight){const y=n.spot[_];y.position.setFromMatrixPosition(v.matrixWorld),y.position.applyMatrix4(p),y.direction.setFromMatrixPosition(v.matrixWorld),i.setFromMatrixPosition(v.target.matrixWorld),y.direction.sub(i),y.direction.transformDirection(p),_++}else if(v.isRectAreaLight){const y=n.rectArea[d];y.position.setFromMatrixPosition(v.matrixWorld),y.position.applyMatrix4(p),o.identity(),s.copy(v.matrixWorld),s.premultiply(p),o.extractRotation(s),y.halfWidth.set(v.width*.5,0,0),y.halfHeight.set(0,v.height*.5,0),y.halfWidth.applyMatrix4(o),y.halfHeight.applyMatrix4(o),d++}else if(v.isPointLight){const y=n.point[f];y.position.setFromMatrixPosition(v.matrixWorld),y.position.applyMatrix4(p),f++}else if(v.isHemisphereLight){const y=n.hemi[m];y.direction.setFromMatrixPosition(v.matrixWorld),y.direction.transformDirection(p),m++}}}return{setup:c,setupView:l,state:n}}function Xh(r){const e=new s2(r),t=[],n=[],i=[];function s(f){u.camera=f,t.length=0,n.length=0,i.length=0}function o(f){t.push(f)}function c(f){n.push(f)}function l(f){i.push(f)}function a(){e.setup(t)}function h(f){e.setupView(t,f)}const u={lightsArray:t,shadowsArray:n,lightProbeGridArray:i,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:s,state:u,setupLights:a,setupLightsView:h,pushLight:o,pushShadow:c,pushLightProbeGrid:l}}function r2(r){let e=new WeakMap;function t(i,s=0){const o=e.get(i);let c;return o===void 0?(c=new Xh(r),e.set(i,[c])):s>=o.length?(c=new Xh(r),o.push(c)):c=o[s],c}function n(){e=new WeakMap}return{get:t,dispose:n}}const o2=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,a2=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,c2=[new L(1,0,0),new L(-1,0,0),new L(0,1,0),new L(0,-1,0),new L(0,0,1),new L(0,0,-1)],l2=[new L(0,-1,0),new L(0,-1,0),new L(0,0,1),new L(0,0,-1),new L(0,-1,0),new L(0,-1,0)],qh=new qe,qs=new L,xa=new L;function h2(r,e,t){let n=new Zc;const i=new ee,s=new ee,o=new xt,c=new Wp,l=new Xp,a={},h=t.maxTextureSize,u={[ii]:Zt,[Zt]:ii,[It]:It},f=new Xt({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new ee},radius:{value:4}},vertexShader:o2,fragmentShader:a2}),_=f.clone();_.defines.HORIZONTAL_PASS=1;const d=new Tt;d.setAttribute("position",new Dt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const m=new G(d,f),p=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Qs;let g=this.type;this.render=function(b,A,M){if(p.enabled===!1||p.autoUpdate===!1&&p.needsUpdate===!1||b.length===0)return;this.type===Df&&(Ne("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."),this.type=Qs);const T=r.getRenderTarget(),C=r.getActiveCubeFace(),P=r.getActiveMipmapLevel(),I=r.state;I.setBlending(zn),I.buffers.depth.getReversed()===!0?I.buffers.color.setClear(0,0,0,0):I.buffers.color.setClear(1,1,1,1),I.buffers.depth.setTest(!0),I.setScissorTest(!1);const F=g!==this.type;F&&A.traverse(function(V){V.material&&(Array.isArray(V.material)?V.material.forEach(N=>N.needsUpdate=!0):V.material.needsUpdate=!0)});for(let V=0,N=b.length;V<N;V++){const O=b[V],z=O.shadow;if(z===void 0){Ne("WebGLShadowMap:",O,"has no shadow.");continue}if(z.autoUpdate===!1&&z.needsUpdate===!1)continue;i.copy(z.mapSize);const j=z.getFrameExtents();i.multiply(j),s.copy(z.mapSize),(i.x>h||i.y>h)&&(i.x>h&&(s.x=Math.floor(h/j.x),i.x=s.x*j.x,z.mapSize.x=s.x),i.y>h&&(s.y=Math.floor(h/j.y),i.y=s.y*j.y,z.mapSize.y=s.y));const se=r.state.buffers.depth.getReversed();if(z.camera._reversedDepth=se,z.map===null||F===!0){if(z.map!==null&&(z.map.depthTexture!==null&&(z.map.depthTexture.dispose(),z.map.depthTexture=null),z.map.dispose()),this.type===js){if(O.isPointLight){Ne("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}z.map=new nn(i.x,i.y,{format:Oi,type:sn,minFilter:zt,magFilter:zt,generateMipmaps:!1}),z.map.texture.name=O.name+".shadowMap",z.map.depthTexture=new vs(i.x,i.y,vn),z.map.depthTexture.name=O.name+".shadowMapDepth",z.map.depthTexture.format=si,z.map.depthTexture.compareFunction=null,z.map.depthTexture.minFilter=Bt,z.map.depthTexture.magFilter=Bt}else O.isPointLight?(z.map=new Zu(i.x),z.map.depthTexture=new cp(i.x,Gn)):(z.map=new nn(i.x,i.y),z.map.depthTexture=new vs(i.x,i.y,Gn)),z.map.depthTexture.name=O.name+".shadowMap",z.map.depthTexture.format=si,this.type===Qs?(z.map.depthTexture.compareFunction=se?Xc:Wc,z.map.depthTexture.minFilter=zt,z.map.depthTexture.magFilter=zt):(z.map.depthTexture.compareFunction=null,z.map.depthTexture.minFilter=Bt,z.map.depthTexture.magFilter=Bt);z.camera.updateProjectionMatrix()}const me=z.map.isWebGLCubeRenderTarget?6:1;for(let Te=0;Te<me;Te++){if(z.map.isWebGLCubeRenderTarget)r.setRenderTarget(z.map,Te),r.clear();else{Te===0&&(r.setRenderTarget(z.map),r.clear());const Le=z.getViewport(Te);o.set(s.x*Le.x,s.y*Le.y,s.x*Le.z,s.y*Le.w),I.viewport(o)}if(O.isPointLight){const Le=z.camera,tt=z.matrix,lt=O.distance||Le.far;lt!==Le.far&&(Le.far=lt,Le.updateProjectionMatrix()),qs.setFromMatrixPosition(O.matrixWorld),Le.position.copy(qs),xa.copy(Le.position),xa.add(c2[Te]),Le.up.copy(l2[Te]),Le.lookAt(xa),Le.updateMatrixWorld(),tt.makeTranslation(-qs.x,-qs.y,-qs.z),qh.multiplyMatrices(Le.projectionMatrix,Le.matrixWorldInverse),z._frustum.setFromProjectionMatrix(qh,Le.coordinateSystem,Le.reversedDepth)}else z.updateMatrices(O);n=z.getFrustum(),y(A,M,z.camera,O,this.type)}z.isPointLightShadow!==!0&&this.type===js&&x(z,M),z.needsUpdate=!1}g=this.type,p.needsUpdate=!1,r.setRenderTarget(T,C,P)};function x(b,A){const M=e.update(m);f.defines.VSM_SAMPLES!==b.blurSamples&&(f.defines.VSM_SAMPLES=b.blurSamples,_.defines.VSM_SAMPLES=b.blurSamples,f.needsUpdate=!0,_.needsUpdate=!0),b.mapPass===null&&(b.mapPass=new nn(i.x,i.y,{format:Oi,type:sn})),f.uniforms.shadow_pass.value=b.map.depthTexture,f.uniforms.resolution.value=b.mapSize,f.uniforms.radius.value=b.radius,r.setRenderTarget(b.mapPass),r.clear(),r.renderBufferDirect(A,null,M,f,m,null),_.uniforms.shadow_pass.value=b.mapPass.texture,_.uniforms.resolution.value=b.mapSize,_.uniforms.radius.value=b.radius,r.setRenderTarget(b.map),r.clear(),r.renderBufferDirect(A,null,M,_,m,null)}function v(b,A,M,T){let C=null;const P=M.isPointLight===!0?b.customDistanceMaterial:b.customDepthMaterial;if(P!==void 0)C=P;else if(C=M.isPointLight===!0?l:c,r.localClippingEnabled&&A.clipShadows===!0&&Array.isArray(A.clippingPlanes)&&A.clippingPlanes.length!==0||A.displacementMap&&A.displacementScale!==0||A.alphaMap&&A.alphaTest>0||A.map&&A.alphaTest>0||A.alphaToCoverage===!0){const I=C.uuid,F=A.uuid;let V=a[I];V===void 0&&(V={},a[I]=V);let N=V[F];N===void 0&&(N=C.clone(),V[F]=N,A.addEventListener("dispose",w)),C=N}if(C.visible=A.visible,C.wireframe=A.wireframe,T===js?C.side=A.shadowSide!==null?A.shadowSide:A.side:C.side=A.shadowSide!==null?A.shadowSide:u[A.side],C.alphaMap=A.alphaMap,C.alphaTest=A.alphaToCoverage===!0?.5:A.alphaTest,C.map=A.map,C.clipShadows=A.clipShadows,C.clippingPlanes=A.clippingPlanes,C.clipIntersection=A.clipIntersection,C.displacementMap=A.displacementMap,C.displacementScale=A.displacementScale,C.displacementBias=A.displacementBias,C.wireframeLinewidth=A.wireframeLinewidth,C.linewidth=A.linewidth,M.isPointLight===!0&&C.isMeshDistanceMaterial===!0){const I=r.properties.get(C);I.light=M}return C}function y(b,A,M,T,C){if(b.visible===!1)return;if(b.layers.test(A.layers)&&(b.isMesh||b.isLine||b.isPoints)&&(b.castShadow||b.receiveShadow&&C===js)&&(!b.frustumCulled||n.intersectsObject(b))){b.modelViewMatrix.multiplyMatrices(M.matrixWorldInverse,b.matrixWorld);const F=e.update(b),V=b.material;if(Array.isArray(V)){const N=F.groups;for(let O=0,z=N.length;O<z;O++){const j=N[O],se=V[j.materialIndex];if(se&&se.visible){const me=v(b,se,T,C);b.onBeforeShadow(r,b,A,M,F,me,j),r.renderBufferDirect(M,null,F,me,b,j),b.onAfterShadow(r,b,A,M,F,me,j)}}}else if(V.visible){const N=v(b,V,T,C);b.onBeforeShadow(r,b,A,M,F,N,null),r.renderBufferDirect(M,null,F,N,b,null),b.onAfterShadow(r,b,A,M,F,N,null)}}const I=b.children;for(let F=0,V=I.length;F<V;F++)y(I[F],A,M,T,C)}function w(b){b.target.removeEventListener("dispose",w);for(const M in a){const T=a[M],C=b.target.uuid;C in T&&(T[C].dispose(),delete T[C])}}}function u2(r,e){function t(){let U=!1;const he=new xt;let Y=null;const Ee=new xt(0,0,0,0);return{setMask:function(pe){Y!==pe&&!U&&(r.colorMask(pe,pe,pe,pe),Y=pe)},setLocked:function(pe){U=pe},setClear:function(pe,ie,Fe,$e,Ct){Ct===!0&&(pe*=$e,ie*=$e,Fe*=$e),he.set(pe,ie,Fe,$e),Ee.equals(he)===!1&&(r.clearColor(pe,ie,Fe,$e),Ee.copy(he))},reset:function(){U=!1,Y=null,Ee.set(-1,0,0,0)}}}function n(){let U=!1,he=!1,Y=null,Ee=null,pe=null;return{setReversed:function(ie){if(he!==ie){const Fe=e.get("EXT_clip_control");ie?Fe.clipControlEXT(Fe.LOWER_LEFT_EXT,Fe.ZERO_TO_ONE_EXT):Fe.clipControlEXT(Fe.LOWER_LEFT_EXT,Fe.NEGATIVE_ONE_TO_ONE_EXT),he=ie;const $e=pe;pe=null,this.setClear($e)}},getReversed:function(){return he},setTest:function(ie){ie?ce(r.DEPTH_TEST):Ue(r.DEPTH_TEST)},setMask:function(ie){Y!==ie&&!U&&(r.depthMask(ie),Y=ie)},setFunc:function(ie){if(he&&(ie=_d[ie]),Ee!==ie){switch(ie){case Ca:r.depthFunc(r.NEVER);break;case Pa:r.depthFunc(r.ALWAYS);break;case La:r.depthFunc(r.LESS);break;case gs:r.depthFunc(r.LEQUAL);break;case Ia:r.depthFunc(r.EQUAL);break;case Da:r.depthFunc(r.GEQUAL);break;case Na:r.depthFunc(r.GREATER);break;case Ua:r.depthFunc(r.NOTEQUAL);break;default:r.depthFunc(r.LEQUAL)}Ee=ie}},setLocked:function(ie){U=ie},setClear:function(ie){pe!==ie&&(pe=ie,he&&(ie=1-ie),r.clearDepth(ie))},reset:function(){U=!1,Y=null,Ee=null,pe=null,he=!1}}}function i(){let U=!1,he=null,Y=null,Ee=null,pe=null,ie=null,Fe=null,$e=null,Ct=null;return{setTest:function(vt){U||(vt?ce(r.STENCIL_TEST):Ue(r.STENCIL_TEST))},setMask:function(vt){he!==vt&&!U&&(r.stencilMask(vt),he=vt)},setFunc:function(vt,Xn,Cn){(Y!==vt||Ee!==Xn||pe!==Cn)&&(r.stencilFunc(vt,Xn,Cn),Y=vt,Ee=Xn,pe=Cn)},setOp:function(vt,Xn,Cn){(ie!==vt||Fe!==Xn||$e!==Cn)&&(r.stencilOp(vt,Xn,Cn),ie=vt,Fe=Xn,$e=Cn)},setLocked:function(vt){U=vt},setClear:function(vt){Ct!==vt&&(r.clearStencil(vt),Ct=vt)},reset:function(){U=!1,he=null,Y=null,Ee=null,pe=null,ie=null,Fe=null,$e=null,Ct=null}}}const s=new t,o=new n,c=new i,l=new WeakMap,a=new WeakMap;let h={},u={},f={},_=new WeakMap,d=[],m=null,p=!1,g=null,x=null,v=null,y=null,w=null,b=null,A=null,M=new ye(0,0,0),T=0,C=!1,P=null,I=null,F=null,V=null,N=null;const O=r.getParameter(r.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let z=!1,j=0;const se=r.getParameter(r.VERSION);se.indexOf("WebGL")!==-1?(j=parseFloat(/^WebGL (\d)/.exec(se)[1]),z=j>=1):se.indexOf("OpenGL ES")!==-1&&(j=parseFloat(/^OpenGL ES (\d)/.exec(se)[1]),z=j>=2);let me=null,Te={};const Le=r.getParameter(r.SCISSOR_BOX),tt=r.getParameter(r.VIEWPORT),lt=new xt().fromArray(Le),Ye=new xt().fromArray(tt);function Z(U,he,Y,Ee){const pe=new Uint8Array(4),ie=r.createTexture();r.bindTexture(U,ie),r.texParameteri(U,r.TEXTURE_MIN_FILTER,r.NEAREST),r.texParameteri(U,r.TEXTURE_MAG_FILTER,r.NEAREST);for(let Fe=0;Fe<Y;Fe++)U===r.TEXTURE_3D||U===r.TEXTURE_2D_ARRAY?r.texImage3D(he,0,r.RGBA,1,1,Ee,0,r.RGBA,r.UNSIGNED_BYTE,pe):r.texImage2D(he+Fe,0,r.RGBA,1,1,0,r.RGBA,r.UNSIGNED_BYTE,pe);return ie}const xe={};xe[r.TEXTURE_2D]=Z(r.TEXTURE_2D,r.TEXTURE_2D,1),xe[r.TEXTURE_CUBE_MAP]=Z(r.TEXTURE_CUBE_MAP,r.TEXTURE_CUBE_MAP_POSITIVE_X,6),xe[r.TEXTURE_2D_ARRAY]=Z(r.TEXTURE_2D_ARRAY,r.TEXTURE_2D_ARRAY,1,1),xe[r.TEXTURE_3D]=Z(r.TEXTURE_3D,r.TEXTURE_3D,1,1),s.setClear(0,0,0,1),o.setClear(1),c.setClear(0),ce(r.DEPTH_TEST),o.setFunc(gs),Me(!1),ge(Sl),ce(r.CULL_FACE),re(zn);function ce(U){h[U]!==!0&&(r.enable(U),h[U]=!0)}function Ue(U){h[U]!==!1&&(r.disable(U),h[U]=!1)}function Ve(U,he){return f[U]!==he?(r.bindFramebuffer(U,he),f[U]=he,U===r.DRAW_FRAMEBUFFER&&(f[r.FRAMEBUFFER]=he),U===r.FRAMEBUFFER&&(f[r.DRAW_FRAMEBUFFER]=he),!0):!1}function Ge(U,he){let Y=d,Ee=!1;if(U){Y=_.get(he),Y===void 0&&(Y=[],_.set(he,Y));const pe=U.textures;if(Y.length!==pe.length||Y[0]!==r.COLOR_ATTACHMENT0){for(let ie=0,Fe=pe.length;ie<Fe;ie++)Y[ie]=r.COLOR_ATTACHMENT0+ie;Y.length=pe.length,Ee=!0}}else Y[0]!==r.BACK&&(Y[0]=r.BACK,Ee=!0);Ee&&r.drawBuffers(Y)}function ht(U){return m!==U?(r.useProgram(U),m=U,!0):!1}const He={[Li]:r.FUNC_ADD,[Uf]:r.FUNC_SUBTRACT,[Ff]:r.FUNC_REVERSE_SUBTRACT};He[Of]=r.MIN,He[Bf]=r.MAX;const $={[zf]:r.ZERO,[kf]:r.ONE,[Gf]:r.SRC_COLOR,[Aa]:r.SRC_ALPHA,[Yf]:r.SRC_ALPHA_SATURATE,[Xf]:r.DST_COLOR,[Hf]:r.DST_ALPHA,[Vf]:r.ONE_MINUS_SRC_COLOR,[Ra]:r.ONE_MINUS_SRC_ALPHA,[qf]:r.ONE_MINUS_DST_COLOR,[Wf]:r.ONE_MINUS_DST_ALPHA,[Kf]:r.CONSTANT_COLOR,[jf]:r.ONE_MINUS_CONSTANT_COLOR,[Jf]:r.CONSTANT_ALPHA,[Zf]:r.ONE_MINUS_CONSTANT_ALPHA};function re(U,he,Y,Ee,pe,ie,Fe,$e,Ct,vt){if(U===zn){p===!0&&(Ue(r.BLEND),p=!1);return}if(p===!1&&(ce(r.BLEND),p=!0),U!==Nf){if(U!==g||vt!==C){if((x!==Li||w!==Li)&&(r.blendEquation(r.FUNC_ADD),x=Li,w=Li),vt)switch(U){case fs:r.blendFuncSeparate(r.ONE,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case rr:r.blendFunc(r.ONE,r.ONE);break;case bl:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case wl:r.blendFuncSeparate(r.DST_COLOR,r.ONE_MINUS_SRC_ALPHA,r.ZERO,r.ONE);break;default:ke("WebGLState: Invalid blending: ",U);break}else switch(U){case fs:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case rr:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE,r.ONE,r.ONE);break;case bl:ke("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case wl:ke("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:ke("WebGLState: Invalid blending: ",U);break}v=null,y=null,b=null,A=null,M.set(0,0,0),T=0,g=U,C=vt}return}pe=pe||he,ie=ie||Y,Fe=Fe||Ee,(he!==x||pe!==w)&&(r.blendEquationSeparate(He[he],He[pe]),x=he,w=pe),(Y!==v||Ee!==y||ie!==b||Fe!==A)&&(r.blendFuncSeparate($[Y],$[Ee],$[ie],$[Fe]),v=Y,y=Ee,b=ie,A=Fe),($e.equals(M)===!1||Ct!==T)&&(r.blendColor($e.r,$e.g,$e.b,Ct),M.copy($e),T=Ct),g=U,C=!1}function te(U,he){U.side===It?Ue(r.CULL_FACE):ce(r.CULL_FACE);let Y=U.side===Zt;he&&(Y=!Y),Me(Y),U.blending===fs&&U.transparent===!1?re(zn):re(U.blending,U.blendEquation,U.blendSrc,U.blendDst,U.blendEquationAlpha,U.blendSrcAlpha,U.blendDstAlpha,U.blendColor,U.blendAlpha,U.premultipliedAlpha),o.setFunc(U.depthFunc),o.setTest(U.depthTest),o.setMask(U.depthWrite),s.setMask(U.colorWrite);const Ee=U.stencilWrite;c.setTest(Ee),Ee&&(c.setMask(U.stencilWriteMask),c.setFunc(U.stencilFunc,U.stencilRef,U.stencilFuncMask),c.setOp(U.stencilFail,U.stencilZFail,U.stencilZPass)),D(U.polygonOffset,U.polygonOffsetFactor,U.polygonOffsetUnits),U.alphaToCoverage===!0?ce(r.SAMPLE_ALPHA_TO_COVERAGE):Ue(r.SAMPLE_ALPHA_TO_COVERAGE)}function Me(U){P!==U&&(U?r.frontFace(r.CW):r.frontFace(r.CCW),P=U)}function ge(U){U!==Lf?(ce(r.CULL_FACE),U!==I&&(U===Sl?r.cullFace(r.BACK):U===If?r.cullFace(r.FRONT):r.cullFace(r.FRONT_AND_BACK))):Ue(r.CULL_FACE),I=U}function We(U){U!==F&&(z&&r.lineWidth(U),F=U)}function D(U,he,Y){U?(ce(r.POLYGON_OFFSET_FILL),(V!==he||N!==Y)&&(V=he,N=Y,o.getReversed()&&(he=-he),r.polygonOffset(he,Y))):Ue(r.POLYGON_OFFSET_FILL)}function Ke(U){U?ce(r.SCISSOR_TEST):Ue(r.SCISSOR_TEST)}function Ie(U){U===void 0&&(U=r.TEXTURE0+O-1),me!==U&&(r.activeTexture(U),me=U)}function Xe(U,he,Y){Y===void 0&&(me===null?Y=r.TEXTURE0+O-1:Y=me);let Ee=Te[Y];Ee===void 0&&(Ee={type:void 0,texture:void 0},Te[Y]=Ee),(Ee.type!==U||Ee.texture!==he)&&(me!==Y&&(r.activeTexture(Y),me=Y),r.bindTexture(U,he||xe[U]),Ee.type=U,Ee.texture=he)}function oe(){const U=Te[me];U!==void 0&&U.type!==void 0&&(r.bindTexture(U.type,null),U.type=void 0,U.texture=void 0)}function dt(){try{r.compressedTexImage2D(...arguments)}catch(U){ke("WebGLState:",U)}}function R(){try{r.compressedTexImage3D(...arguments)}catch(U){ke("WebGLState:",U)}}function S(){try{r.texSubImage2D(...arguments)}catch(U){ke("WebGLState:",U)}}function k(){try{r.texSubImage3D(...arguments)}catch(U){ke("WebGLState:",U)}}function K(){try{r.compressedTexSubImage2D(...arguments)}catch(U){ke("WebGLState:",U)}}function ne(){try{r.compressedTexSubImage3D(...arguments)}catch(U){ke("WebGLState:",U)}}function ae(){try{r.texStorage2D(...arguments)}catch(U){ke("WebGLState:",U)}}function ue(){try{r.texStorage3D(...arguments)}catch(U){ke("WebGLState:",U)}}function q(){try{r.texImage2D(...arguments)}catch(U){ke("WebGLState:",U)}}function J(){try{r.texImage3D(...arguments)}catch(U){ke("WebGLState:",U)}}function be(U){return u[U]!==void 0?u[U]:r.getParameter(U)}function Re(U,he){u[U]!==he&&(r.pixelStorei(U,he),u[U]=he)}function de(U){lt.equals(U)===!1&&(r.scissor(U.x,U.y,U.z,U.w),lt.copy(U))}function le(U){Ye.equals(U)===!1&&(r.viewport(U.x,U.y,U.z,U.w),Ye.copy(U))}function je(U,he){let Y=a.get(he);Y===void 0&&(Y=new WeakMap,a.set(he,Y));let Ee=Y.get(U);Ee===void 0&&(Ee=r.getUniformBlockIndex(he,U.name),Y.set(U,Ee))}function nt(U,he){const Ee=a.get(he).get(U);l.get(he)!==Ee&&(r.uniformBlockBinding(he,Ee,U.__bindingPointIndex),l.set(he,Ee))}function ft(){r.disable(r.BLEND),r.disable(r.CULL_FACE),r.disable(r.DEPTH_TEST),r.disable(r.POLYGON_OFFSET_FILL),r.disable(r.SCISSOR_TEST),r.disable(r.STENCIL_TEST),r.disable(r.SAMPLE_ALPHA_TO_COVERAGE),r.blendEquation(r.FUNC_ADD),r.blendFunc(r.ONE,r.ZERO),r.blendFuncSeparate(r.ONE,r.ZERO,r.ONE,r.ZERO),r.blendColor(0,0,0,0),r.colorMask(!0,!0,!0,!0),r.clearColor(0,0,0,0),r.depthMask(!0),r.depthFunc(r.LESS),o.setReversed(!1),r.clearDepth(1),r.stencilMask(4294967295),r.stencilFunc(r.ALWAYS,0,4294967295),r.stencilOp(r.KEEP,r.KEEP,r.KEEP),r.clearStencil(0),r.cullFace(r.BACK),r.frontFace(r.CCW),r.polygonOffset(0,0),r.activeTexture(r.TEXTURE0),r.bindFramebuffer(r.FRAMEBUFFER,null),r.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),r.bindFramebuffer(r.READ_FRAMEBUFFER,null),r.useProgram(null),r.lineWidth(1),r.scissor(0,0,r.canvas.width,r.canvas.height),r.viewport(0,0,r.canvas.width,r.canvas.height),r.pixelStorei(r.PACK_ALIGNMENT,4),r.pixelStorei(r.UNPACK_ALIGNMENT,4),r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,!1),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,r.BROWSER_DEFAULT_WEBGL),r.pixelStorei(r.PACK_ROW_LENGTH,0),r.pixelStorei(r.PACK_SKIP_PIXELS,0),r.pixelStorei(r.PACK_SKIP_ROWS,0),r.pixelStorei(r.UNPACK_ROW_LENGTH,0),r.pixelStorei(r.UNPACK_IMAGE_HEIGHT,0),r.pixelStorei(r.UNPACK_SKIP_PIXELS,0),r.pixelStorei(r.UNPACK_SKIP_ROWS,0),r.pixelStorei(r.UNPACK_SKIP_IMAGES,0),h={},u={},me=null,Te={},f={},_=new WeakMap,d=[],m=null,p=!1,g=null,x=null,v=null,y=null,w=null,b=null,A=null,M=new ye(0,0,0),T=0,C=!1,P=null,I=null,F=null,V=null,N=null,lt.set(0,0,r.canvas.width,r.canvas.height),Ye.set(0,0,r.canvas.width,r.canvas.height),s.reset(),o.reset(),c.reset()}return{buffers:{color:s,depth:o,stencil:c},enable:ce,disable:Ue,bindFramebuffer:Ve,drawBuffers:Ge,useProgram:ht,setBlending:re,setMaterial:te,setFlipSided:Me,setCullFace:ge,setLineWidth:We,setPolygonOffset:D,setScissorTest:Ke,activeTexture:Ie,bindTexture:Xe,unbindTexture:oe,compressedTexImage2D:dt,compressedTexImage3D:R,texImage2D:q,texImage3D:J,pixelStorei:Re,getParameter:be,updateUBOMapping:je,uniformBlockBinding:nt,texStorage2D:ae,texStorage3D:ue,texSubImage2D:S,texSubImage3D:k,compressedTexSubImage2D:K,compressedTexSubImage3D:ne,scissor:de,viewport:le,reset:ft}}function f2(r,e,t,n,i,s,o){const c=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),a=new ee,h=new WeakMap,u=new Set;let f;const _=new WeakMap;let d=!1;try{d=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function m(R,S){return d?new OffscreenCanvas(R,S):ur("canvas")}function p(R,S,k){let K=1;const ne=dt(R);if((ne.width>k||ne.height>k)&&(K=k/Math.max(ne.width,ne.height)),K<1)if(typeof HTMLImageElement<"u"&&R instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&R instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&R instanceof ImageBitmap||typeof VideoFrame<"u"&&R instanceof VideoFrame){const ae=Math.floor(K*ne.width),ue=Math.floor(K*ne.height);f===void 0&&(f=m(ae,ue));const q=S?m(ae,ue):f;return q.width=ae,q.height=ue,q.getContext("2d").drawImage(R,0,0,ae,ue),Ne("WebGLRenderer: Texture has been resized from ("+ne.width+"x"+ne.height+") to ("+ae+"x"+ue+")."),q}else return"data"in R&&Ne("WebGLRenderer: Image in DataTexture is too big ("+ne.width+"x"+ne.height+")."),R;return R}function g(R){return R.generateMipmaps}function x(R){r.generateMipmap(R)}function v(R){return R.isWebGLCubeRenderTarget?r.TEXTURE_CUBE_MAP:R.isWebGL3DRenderTarget?r.TEXTURE_3D:R.isWebGLArrayRenderTarget||R.isCompressedArrayTexture?r.TEXTURE_2D_ARRAY:r.TEXTURE_2D}function y(R,S,k,K,ne,ae=!1){if(R!==null){if(r[R]!==void 0)return r[R];Ne("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+R+"'")}let ue;K&&(ue=e.get("EXT_texture_norm16"),ue||Ne("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let q=S;if(S===r.RED&&(k===r.FLOAT&&(q=r.R32F),k===r.HALF_FLOAT&&(q=r.R16F),k===r.UNSIGNED_BYTE&&(q=r.R8),k===r.UNSIGNED_SHORT&&ue&&(q=ue.R16_EXT),k===r.SHORT&&ue&&(q=ue.R16_SNORM_EXT)),S===r.RED_INTEGER&&(k===r.UNSIGNED_BYTE&&(q=r.R8UI),k===r.UNSIGNED_SHORT&&(q=r.R16UI),k===r.UNSIGNED_INT&&(q=r.R32UI),k===r.BYTE&&(q=r.R8I),k===r.SHORT&&(q=r.R16I),k===r.INT&&(q=r.R32I)),S===r.RG&&(k===r.FLOAT&&(q=r.RG32F),k===r.HALF_FLOAT&&(q=r.RG16F),k===r.UNSIGNED_BYTE&&(q=r.RG8),k===r.UNSIGNED_SHORT&&ue&&(q=ue.RG16_EXT),k===r.SHORT&&ue&&(q=ue.RG16_SNORM_EXT)),S===r.RG_INTEGER&&(k===r.UNSIGNED_BYTE&&(q=r.RG8UI),k===r.UNSIGNED_SHORT&&(q=r.RG16UI),k===r.UNSIGNED_INT&&(q=r.RG32UI),k===r.BYTE&&(q=r.RG8I),k===r.SHORT&&(q=r.RG16I),k===r.INT&&(q=r.RG32I)),S===r.RGB_INTEGER&&(k===r.UNSIGNED_BYTE&&(q=r.RGB8UI),k===r.UNSIGNED_SHORT&&(q=r.RGB16UI),k===r.UNSIGNED_INT&&(q=r.RGB32UI),k===r.BYTE&&(q=r.RGB8I),k===r.SHORT&&(q=r.RGB16I),k===r.INT&&(q=r.RGB32I)),S===r.RGBA_INTEGER&&(k===r.UNSIGNED_BYTE&&(q=r.RGBA8UI),k===r.UNSIGNED_SHORT&&(q=r.RGBA16UI),k===r.UNSIGNED_INT&&(q=r.RGBA32UI),k===r.BYTE&&(q=r.RGBA8I),k===r.SHORT&&(q=r.RGBA16I),k===r.INT&&(q=r.RGBA32I)),S===r.RGB&&(k===r.UNSIGNED_SHORT&&ue&&(q=ue.RGB16_EXT),k===r.SHORT&&ue&&(q=ue.RGB16_SNORM_EXT),k===r.UNSIGNED_INT_5_9_9_9_REV&&(q=r.RGB9_E5),k===r.UNSIGNED_INT_10F_11F_11F_REV&&(q=r.R11F_G11F_B10F)),S===r.RGBA){const J=ae?go:at.getTransfer(ne);k===r.FLOAT&&(q=r.RGBA32F),k===r.HALF_FLOAT&&(q=r.RGBA16F),k===r.UNSIGNED_BYTE&&(q=J===pt?r.SRGB8_ALPHA8:r.RGBA8),k===r.UNSIGNED_SHORT&&ue&&(q=ue.RGBA16_EXT),k===r.SHORT&&ue&&(q=ue.RGBA16_SNORM_EXT),k===r.UNSIGNED_SHORT_4_4_4_4&&(q=r.RGBA4),k===r.UNSIGNED_SHORT_5_5_5_1&&(q=r.RGB5_A1)}return(q===r.R16F||q===r.R32F||q===r.RG16F||q===r.RG32F||q===r.RGBA16F||q===r.RGBA32F)&&e.get("EXT_color_buffer_float"),q}function w(R,S){let k;return R?S===null||S===Gn||S===ar?k=r.DEPTH24_STENCIL8:S===vn?k=r.DEPTH32F_STENCIL8:S===or&&(k=r.DEPTH24_STENCIL8,Ne("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):S===null||S===Gn||S===ar?k=r.DEPTH_COMPONENT24:S===vn?k=r.DEPTH_COMPONENT32F:S===or&&(k=r.DEPTH_COMPONENT16),k}function b(R,S){return g(R)===!0||R.isFramebufferTexture&&R.minFilter!==Bt&&R.minFilter!==zt?Math.log2(Math.max(S.width,S.height))+1:R.mipmaps!==void 0&&R.mipmaps.length>0?R.mipmaps.length:R.isCompressedTexture&&Array.isArray(R.image)?S.mipmaps.length:1}function A(R){const S=R.target;S.removeEventListener("dispose",A),T(S),S.isVideoTexture&&h.delete(S),S.isHTMLTexture&&u.delete(S)}function M(R){const S=R.target;S.removeEventListener("dispose",M),P(S)}function T(R){const S=n.get(R);if(S.__webglInit===void 0)return;const k=R.source,K=_.get(k);if(K){const ne=K[S.__cacheKey];ne.usedTimes--,ne.usedTimes===0&&C(R),Object.keys(K).length===0&&_.delete(k)}n.remove(R)}function C(R){const S=n.get(R);r.deleteTexture(S.__webglTexture);const k=R.source,K=_.get(k);delete K[S.__cacheKey],o.memory.textures--}function P(R){const S=n.get(R);if(R.depthTexture&&(R.depthTexture.dispose(),n.remove(R.depthTexture)),R.isWebGLCubeRenderTarget)for(let K=0;K<6;K++){if(Array.isArray(S.__webglFramebuffer[K]))for(let ne=0;ne<S.__webglFramebuffer[K].length;ne++)r.deleteFramebuffer(S.__webglFramebuffer[K][ne]);else r.deleteFramebuffer(S.__webglFramebuffer[K]);S.__webglDepthbuffer&&r.deleteRenderbuffer(S.__webglDepthbuffer[K])}else{if(Array.isArray(S.__webglFramebuffer))for(let K=0;K<S.__webglFramebuffer.length;K++)r.deleteFramebuffer(S.__webglFramebuffer[K]);else r.deleteFramebuffer(S.__webglFramebuffer);if(S.__webglDepthbuffer&&r.deleteRenderbuffer(S.__webglDepthbuffer),S.__webglMultisampledFramebuffer&&r.deleteFramebuffer(S.__webglMultisampledFramebuffer),S.__webglColorRenderbuffer)for(let K=0;K<S.__webglColorRenderbuffer.length;K++)S.__webglColorRenderbuffer[K]&&r.deleteRenderbuffer(S.__webglColorRenderbuffer[K]);S.__webglDepthRenderbuffer&&r.deleteRenderbuffer(S.__webglDepthRenderbuffer)}const k=R.textures;for(let K=0,ne=k.length;K<ne;K++){const ae=n.get(k[K]);ae.__webglTexture&&(r.deleteTexture(ae.__webglTexture),o.memory.textures--),n.remove(k[K])}n.remove(R)}let I=0;function F(){I=0}function V(){return I}function N(R){I=R}function O(){const R=I;return R>=i.maxTextures&&Ne("WebGLTextures: Trying to use "+R+" texture units while this GPU supports only "+i.maxTextures),I+=1,R}function z(R){const S=[];return S.push(R.wrapS),S.push(R.wrapT),S.push(R.wrapR||0),S.push(R.magFilter),S.push(R.minFilter),S.push(R.anisotropy),S.push(R.internalFormat),S.push(R.format),S.push(R.type),S.push(R.generateMipmaps),S.push(R.premultiplyAlpha),S.push(R.flipY),S.push(R.unpackAlignment),S.push(R.colorSpace),S.join()}function j(R,S){const k=n.get(R);if(R.isVideoTexture&&Xe(R),R.isRenderTargetTexture===!1&&R.isExternalTexture!==!0&&R.version>0&&k.__version!==R.version){const K=R.image;if(K===null)Ne("WebGLRenderer: Texture marked for update but no image data found.");else if(K.complete===!1)Ne("WebGLRenderer: Texture marked for update but image is incomplete");else{Ue(k,R,S);return}}else R.isExternalTexture&&(k.__webglTexture=R.sourceTexture?R.sourceTexture:null);t.bindTexture(r.TEXTURE_2D,k.__webglTexture,r.TEXTURE0+S)}function se(R,S){const k=n.get(R);if(R.isRenderTargetTexture===!1&&R.version>0&&k.__version!==R.version){Ue(k,R,S);return}else R.isExternalTexture&&(k.__webglTexture=R.sourceTexture?R.sourceTexture:null);t.bindTexture(r.TEXTURE_2D_ARRAY,k.__webglTexture,r.TEXTURE0+S)}function me(R,S){const k=n.get(R);if(R.isRenderTargetTexture===!1&&R.version>0&&k.__version!==R.version){Ue(k,R,S);return}t.bindTexture(r.TEXTURE_3D,k.__webglTexture,r.TEXTURE0+S)}function Te(R,S){const k=n.get(R);if(R.isCubeDepthTexture!==!0&&R.version>0&&k.__version!==R.version){Ve(k,R,S);return}t.bindTexture(r.TEXTURE_CUBE_MAP,k.__webglTexture,r.TEXTURE0+S)}const Le={[Fi]:r.REPEAT,[Fn]:r.CLAMP_TO_EDGE,[uo]:r.MIRRORED_REPEAT},tt={[Bt]:r.NEAREST,[uu]:r.NEAREST_MIPMAP_NEAREST,[Js]:r.NEAREST_MIPMAP_LINEAR,[zt]:r.LINEAR,[so]:r.LINEAR_MIPMAP_NEAREST,[On]:r.LINEAR_MIPMAP_LINEAR},lt={[ad]:r.NEVER,[fd]:r.ALWAYS,[cd]:r.LESS,[Wc]:r.LEQUAL,[ld]:r.EQUAL,[Xc]:r.GEQUAL,[hd]:r.GREATER,[ud]:r.NOTEQUAL};function Ye(R,S){if(S.type===vn&&e.has("OES_texture_float_linear")===!1&&(S.magFilter===zt||S.magFilter===so||S.magFilter===Js||S.magFilter===On||S.minFilter===zt||S.minFilter===so||S.minFilter===Js||S.minFilter===On)&&Ne("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),r.texParameteri(R,r.TEXTURE_WRAP_S,Le[S.wrapS]),r.texParameteri(R,r.TEXTURE_WRAP_T,Le[S.wrapT]),(R===r.TEXTURE_3D||R===r.TEXTURE_2D_ARRAY)&&r.texParameteri(R,r.TEXTURE_WRAP_R,Le[S.wrapR]),r.texParameteri(R,r.TEXTURE_MAG_FILTER,tt[S.magFilter]),r.texParameteri(R,r.TEXTURE_MIN_FILTER,tt[S.minFilter]),S.compareFunction&&(r.texParameteri(R,r.TEXTURE_COMPARE_MODE,r.COMPARE_REF_TO_TEXTURE),r.texParameteri(R,r.TEXTURE_COMPARE_FUNC,lt[S.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(S.magFilter===Bt||S.minFilter!==Js&&S.minFilter!==On||S.type===vn&&e.has("OES_texture_float_linear")===!1)return;if(S.anisotropy>1||n.get(S).__currentAnisotropy){const k=e.get("EXT_texture_filter_anisotropic");r.texParameterf(R,k.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(S.anisotropy,i.getMaxAnisotropy())),n.get(S).__currentAnisotropy=S.anisotropy}}}function Z(R,S){let k=!1;R.__webglInit===void 0&&(R.__webglInit=!0,S.addEventListener("dispose",A));const K=S.source;let ne=_.get(K);ne===void 0&&(ne={},_.set(K,ne));const ae=z(S);if(ae!==R.__cacheKey){ne[ae]===void 0&&(ne[ae]={texture:r.createTexture(),usedTimes:0},o.memory.textures++,k=!0),ne[ae].usedTimes++;const ue=ne[R.__cacheKey];ue!==void 0&&(ne[R.__cacheKey].usedTimes--,ue.usedTimes===0&&C(S)),R.__cacheKey=ae,R.__webglTexture=ne[ae].texture}return k}function xe(R,S,k){return Math.floor(Math.floor(R/k)/S)}function ce(R,S,k,K){const ae=R.updateRanges;if(ae.length===0)t.texSubImage2D(r.TEXTURE_2D,0,0,0,S.width,S.height,k,K,S.data);else{ae.sort((Re,de)=>Re.start-de.start);let ue=0;for(let Re=1;Re<ae.length;Re++){const de=ae[ue],le=ae[Re],je=de.start+de.count,nt=xe(le.start,S.width,4),ft=xe(de.start,S.width,4);le.start<=je+1&&nt===ft&&xe(le.start+le.count-1,S.width,4)===nt?de.count=Math.max(de.count,le.start+le.count-de.start):(++ue,ae[ue]=le)}ae.length=ue+1;const q=t.getParameter(r.UNPACK_ROW_LENGTH),J=t.getParameter(r.UNPACK_SKIP_PIXELS),be=t.getParameter(r.UNPACK_SKIP_ROWS);t.pixelStorei(r.UNPACK_ROW_LENGTH,S.width);for(let Re=0,de=ae.length;Re<de;Re++){const le=ae[Re],je=Math.floor(le.start/4),nt=Math.ceil(le.count/4),ft=je%S.width,U=Math.floor(je/S.width),he=nt,Y=1;t.pixelStorei(r.UNPACK_SKIP_PIXELS,ft),t.pixelStorei(r.UNPACK_SKIP_ROWS,U),t.texSubImage2D(r.TEXTURE_2D,0,ft,U,he,Y,k,K,S.data)}R.clearUpdateRanges(),t.pixelStorei(r.UNPACK_ROW_LENGTH,q),t.pixelStorei(r.UNPACK_SKIP_PIXELS,J),t.pixelStorei(r.UNPACK_SKIP_ROWS,be)}}function Ue(R,S,k){let K=r.TEXTURE_2D;(S.isDataArrayTexture||S.isCompressedArrayTexture)&&(K=r.TEXTURE_2D_ARRAY),S.isData3DTexture&&(K=r.TEXTURE_3D);const ne=Z(R,S),ae=S.source;t.bindTexture(K,R.__webglTexture,r.TEXTURE0+k);const ue=n.get(ae);if(ae.version!==ue.__version||ne===!0){if(t.activeTexture(r.TEXTURE0+k),(typeof ImageBitmap<"u"&&S.image instanceof ImageBitmap)===!1){const Y=at.getPrimaries(at.workingColorSpace),Ee=S.colorSpace===Un?null:at.getPrimaries(S.colorSpace),pe=S.colorSpace===Un||Y===Ee?r.NONE:r.BROWSER_DEFAULT_WEBGL;t.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,S.flipY),t.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),t.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,pe)}t.pixelStorei(r.UNPACK_ALIGNMENT,S.unpackAlignment);let J=p(S.image,!1,i.maxTextureSize);J=oe(S,J);const be=s.convert(S.format,S.colorSpace),Re=s.convert(S.type);let de=y(S.internalFormat,be,Re,S.normalized,S.colorSpace,S.isVideoTexture);Ye(K,S);let le;const je=S.mipmaps,nt=S.isVideoTexture!==!0,ft=ue.__version===void 0||ne===!0,U=ae.dataReady,he=b(S,J);if(S.isDepthTexture)de=w(S.format===Ni,S.type),ft&&(nt?t.texStorage2D(r.TEXTURE_2D,1,de,J.width,J.height):t.texImage2D(r.TEXTURE_2D,0,de,J.width,J.height,0,be,Re,null));else if(S.isDataTexture)if(je.length>0){nt&&ft&&t.texStorage2D(r.TEXTURE_2D,he,de,je[0].width,je[0].height);for(let Y=0,Ee=je.length;Y<Ee;Y++)le=je[Y],nt?U&&t.texSubImage2D(r.TEXTURE_2D,Y,0,0,le.width,le.height,be,Re,le.data):t.texImage2D(r.TEXTURE_2D,Y,de,le.width,le.height,0,be,Re,le.data);S.generateMipmaps=!1}else nt?(ft&&t.texStorage2D(r.TEXTURE_2D,he,de,J.width,J.height),U&&ce(S,J,be,Re)):t.texImage2D(r.TEXTURE_2D,0,de,J.width,J.height,0,be,Re,J.data);else if(S.isCompressedTexture)if(S.isCompressedArrayTexture){nt&&ft&&t.texStorage3D(r.TEXTURE_2D_ARRAY,he,de,je[0].width,je[0].height,J.depth);for(let Y=0,Ee=je.length;Y<Ee;Y++)if(le=je[Y],S.format!==yn)if(be!==null)if(nt){if(U)if(S.layerUpdates.size>0){const pe=bh(le.width,le.height,S.format,S.type);for(const ie of S.layerUpdates){const Fe=le.data.subarray(ie*pe/le.data.BYTES_PER_ELEMENT,(ie+1)*pe/le.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,Y,0,0,ie,le.width,le.height,1,be,Fe)}S.clearLayerUpdates()}else t.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,Y,0,0,0,le.width,le.height,J.depth,be,le.data)}else t.compressedTexImage3D(r.TEXTURE_2D_ARRAY,Y,de,le.width,le.height,J.depth,0,le.data,0,0);else Ne("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else nt?U&&t.texSubImage3D(r.TEXTURE_2D_ARRAY,Y,0,0,0,le.width,le.height,J.depth,be,Re,le.data):t.texImage3D(r.TEXTURE_2D_ARRAY,Y,de,le.width,le.height,J.depth,0,be,Re,le.data)}else{nt&&ft&&t.texStorage2D(r.TEXTURE_2D,he,de,je[0].width,je[0].height);for(let Y=0,Ee=je.length;Y<Ee;Y++)le=je[Y],S.format!==yn?be!==null?nt?U&&t.compressedTexSubImage2D(r.TEXTURE_2D,Y,0,0,le.width,le.height,be,le.data):t.compressedTexImage2D(r.TEXTURE_2D,Y,de,le.width,le.height,0,le.data):Ne("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):nt?U&&t.texSubImage2D(r.TEXTURE_2D,Y,0,0,le.width,le.height,be,Re,le.data):t.texImage2D(r.TEXTURE_2D,Y,de,le.width,le.height,0,be,Re,le.data)}else if(S.isDataArrayTexture)if(nt){if(ft&&t.texStorage3D(r.TEXTURE_2D_ARRAY,he,de,J.width,J.height,J.depth),U)if(S.layerUpdates.size>0){const Y=bh(J.width,J.height,S.format,S.type);for(const Ee of S.layerUpdates){const pe=J.data.subarray(Ee*Y/J.data.BYTES_PER_ELEMENT,(Ee+1)*Y/J.data.BYTES_PER_ELEMENT);t.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,Ee,J.width,J.height,1,be,Re,pe)}S.clearLayerUpdates()}else t.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,0,J.width,J.height,J.depth,be,Re,J.data)}else t.texImage3D(r.TEXTURE_2D_ARRAY,0,de,J.width,J.height,J.depth,0,be,Re,J.data);else if(S.isData3DTexture)nt?(ft&&t.texStorage3D(r.TEXTURE_3D,he,de,J.width,J.height,J.depth),U&&t.texSubImage3D(r.TEXTURE_3D,0,0,0,0,J.width,J.height,J.depth,be,Re,J.data)):t.texImage3D(r.TEXTURE_3D,0,de,J.width,J.height,J.depth,0,be,Re,J.data);else if(S.isFramebufferTexture){if(ft)if(nt)t.texStorage2D(r.TEXTURE_2D,he,de,J.width,J.height);else{let Y=J.width,Ee=J.height;for(let pe=0;pe<he;pe++)t.texImage2D(r.TEXTURE_2D,pe,de,Y,Ee,0,be,Re,null),Y>>=1,Ee>>=1}}else if(S.isHTMLTexture){if("texElementImage2D"in r){const Y=r.canvas;if(Y.hasAttribute("layoutsubtree")||Y.setAttribute("layoutsubtree","true"),J.parentNode!==Y){Y.appendChild(J),u.add(S),Y.onpaint=$e=>{const Ct=$e.changedElements;for(const vt of u)Ct.includes(vt.image)&&(vt.needsUpdate=!0)},Y.requestPaint();return}const Ee=0,pe=r.RGBA,ie=r.RGBA,Fe=r.UNSIGNED_BYTE;r.texElementImage2D(r.TEXTURE_2D,Ee,pe,ie,Fe,J),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_MIN_FILTER,r.LINEAR),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_WRAP_S,r.CLAMP_TO_EDGE),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_WRAP_T,r.CLAMP_TO_EDGE)}}else if(je.length>0){if(nt&&ft){const Y=dt(je[0]);t.texStorage2D(r.TEXTURE_2D,he,de,Y.width,Y.height)}for(let Y=0,Ee=je.length;Y<Ee;Y++)le=je[Y],nt?U&&t.texSubImage2D(r.TEXTURE_2D,Y,0,0,be,Re,le):t.texImage2D(r.TEXTURE_2D,Y,de,be,Re,le);S.generateMipmaps=!1}else if(nt){if(ft){const Y=dt(J);t.texStorage2D(r.TEXTURE_2D,he,de,Y.width,Y.height)}U&&t.texSubImage2D(r.TEXTURE_2D,0,0,0,be,Re,J)}else t.texImage2D(r.TEXTURE_2D,0,de,be,Re,J);g(S)&&x(K),ue.__version=ae.version,S.onUpdate&&S.onUpdate(S)}R.__version=S.version}function Ve(R,S,k){if(S.image.length!==6)return;const K=Z(R,S),ne=S.source;t.bindTexture(r.TEXTURE_CUBE_MAP,R.__webglTexture,r.TEXTURE0+k);const ae=n.get(ne);if(ne.version!==ae.__version||K===!0){t.activeTexture(r.TEXTURE0+k);const ue=at.getPrimaries(at.workingColorSpace),q=S.colorSpace===Un?null:at.getPrimaries(S.colorSpace),J=S.colorSpace===Un||ue===q?r.NONE:r.BROWSER_DEFAULT_WEBGL;t.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,S.flipY),t.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),t.pixelStorei(r.UNPACK_ALIGNMENT,S.unpackAlignment),t.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,J);const be=S.isCompressedTexture||S.image[0].isCompressedTexture,Re=S.image[0]&&S.image[0].isDataTexture,de=[];for(let ie=0;ie<6;ie++)!be&&!Re?de[ie]=p(S.image[ie],!0,i.maxCubemapSize):de[ie]=Re?S.image[ie].image:S.image[ie],de[ie]=oe(S,de[ie]);const le=de[0],je=s.convert(S.format,S.colorSpace),nt=s.convert(S.type),ft=y(S.internalFormat,je,nt,S.normalized,S.colorSpace),U=S.isVideoTexture!==!0,he=ae.__version===void 0||K===!0,Y=ne.dataReady;let Ee=b(S,le);Ye(r.TEXTURE_CUBE_MAP,S);let pe;if(be){U&&he&&t.texStorage2D(r.TEXTURE_CUBE_MAP,Ee,ft,le.width,le.height);for(let ie=0;ie<6;ie++){pe=de[ie].mipmaps;for(let Fe=0;Fe<pe.length;Fe++){const $e=pe[Fe];S.format!==yn?je!==null?U?Y&&t.compressedTexSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ie,Fe,0,0,$e.width,$e.height,je,$e.data):t.compressedTexImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ie,Fe,ft,$e.width,$e.height,0,$e.data):Ne("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):U?Y&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ie,Fe,0,0,$e.width,$e.height,je,nt,$e.data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ie,Fe,ft,$e.width,$e.height,0,je,nt,$e.data)}}}else{if(pe=S.mipmaps,U&&he){pe.length>0&&Ee++;const ie=dt(de[0]);t.texStorage2D(r.TEXTURE_CUBE_MAP,Ee,ft,ie.width,ie.height)}for(let ie=0;ie<6;ie++)if(Re){U?Y&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ie,0,0,0,de[ie].width,de[ie].height,je,nt,de[ie].data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ie,0,ft,de[ie].width,de[ie].height,0,je,nt,de[ie].data);for(let Fe=0;Fe<pe.length;Fe++){const Ct=pe[Fe].image[ie].image;U?Y&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ie,Fe+1,0,0,Ct.width,Ct.height,je,nt,Ct.data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ie,Fe+1,ft,Ct.width,Ct.height,0,je,nt,Ct.data)}}else{U?Y&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ie,0,0,0,je,nt,de[ie]):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ie,0,ft,je,nt,de[ie]);for(let Fe=0;Fe<pe.length;Fe++){const $e=pe[Fe];U?Y&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ie,Fe+1,0,0,je,nt,$e.image[ie]):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ie,Fe+1,ft,je,nt,$e.image[ie])}}}g(S)&&x(r.TEXTURE_CUBE_MAP),ae.__version=ne.version,S.onUpdate&&S.onUpdate(S)}R.__version=S.version}function Ge(R,S,k,K,ne,ae){const ue=s.convert(k.format,k.colorSpace),q=s.convert(k.type),J=y(k.internalFormat,ue,q,k.normalized,k.colorSpace),be=n.get(S),Re=n.get(k);if(Re.__renderTarget=S,!be.__hasExternalTextures){const de=Math.max(1,S.width>>ae),le=Math.max(1,S.height>>ae);ne===r.TEXTURE_3D||ne===r.TEXTURE_2D_ARRAY?t.texImage3D(ne,ae,J,de,le,S.depth,0,ue,q,null):t.texImage2D(ne,ae,J,de,le,0,ue,q,null)}t.bindFramebuffer(r.FRAMEBUFFER,R),Ie(S)?c.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,K,ne,Re.__webglTexture,0,Ke(S)):(ne===r.TEXTURE_2D||ne>=r.TEXTURE_CUBE_MAP_POSITIVE_X&&ne<=r.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&r.framebufferTexture2D(r.FRAMEBUFFER,K,ne,Re.__webglTexture,ae),t.bindFramebuffer(r.FRAMEBUFFER,null)}function ht(R,S,k){if(r.bindRenderbuffer(r.RENDERBUFFER,R),S.depthBuffer){const K=S.depthTexture,ne=K&&K.isDepthTexture?K.type:null,ae=w(S.stencilBuffer,ne),ue=S.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT;Ie(S)?c.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,Ke(S),ae,S.width,S.height):k?r.renderbufferStorageMultisample(r.RENDERBUFFER,Ke(S),ae,S.width,S.height):r.renderbufferStorage(r.RENDERBUFFER,ae,S.width,S.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,ue,r.RENDERBUFFER,R)}else{const K=S.textures;for(let ne=0;ne<K.length;ne++){const ae=K[ne],ue=s.convert(ae.format,ae.colorSpace),q=s.convert(ae.type),J=y(ae.internalFormat,ue,q,ae.normalized,ae.colorSpace);Ie(S)?c.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,Ke(S),J,S.width,S.height):k?r.renderbufferStorageMultisample(r.RENDERBUFFER,Ke(S),J,S.width,S.height):r.renderbufferStorage(r.RENDERBUFFER,J,S.width,S.height)}}r.bindRenderbuffer(r.RENDERBUFFER,null)}function He(R,S,k){const K=S.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(r.FRAMEBUFFER,R),!(S.depthTexture&&S.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const ne=n.get(S.depthTexture);if(ne.__renderTarget=S,(!ne.__webglTexture||S.depthTexture.image.width!==S.width||S.depthTexture.image.height!==S.height)&&(S.depthTexture.image.width=S.width,S.depthTexture.image.height=S.height,S.depthTexture.needsUpdate=!0),K){if(ne.__webglInit===void 0&&(ne.__webglInit=!0,S.depthTexture.addEventListener("dispose",A)),ne.__webglTexture===void 0){ne.__webglTexture=r.createTexture(),t.bindTexture(r.TEXTURE_CUBE_MAP,ne.__webglTexture),Ye(r.TEXTURE_CUBE_MAP,S.depthTexture);const be=s.convert(S.depthTexture.format),Re=s.convert(S.depthTexture.type);let de;S.depthTexture.format===si?de=r.DEPTH_COMPONENT24:S.depthTexture.format===Ni&&(de=r.DEPTH24_STENCIL8);for(let le=0;le<6;le++)r.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+le,0,de,S.width,S.height,0,be,Re,null)}}else j(S.depthTexture,0);const ae=ne.__webglTexture,ue=Ke(S),q=K?r.TEXTURE_CUBE_MAP_POSITIVE_X+k:r.TEXTURE_2D,J=S.depthTexture.format===Ni?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT;if(S.depthTexture.format===si)Ie(S)?c.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,J,q,ae,0,ue):r.framebufferTexture2D(r.FRAMEBUFFER,J,q,ae,0);else if(S.depthTexture.format===Ni)Ie(S)?c.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,J,q,ae,0,ue):r.framebufferTexture2D(r.FRAMEBUFFER,J,q,ae,0);else throw new Error("Unknown depthTexture format")}function $(R){const S=n.get(R),k=R.isWebGLCubeRenderTarget===!0;if(S.__boundDepthTexture!==R.depthTexture){const K=R.depthTexture;if(S.__depthDisposeCallback&&S.__depthDisposeCallback(),K){const ne=()=>{delete S.__boundDepthTexture,delete S.__depthDisposeCallback,K.removeEventListener("dispose",ne)};K.addEventListener("dispose",ne),S.__depthDisposeCallback=ne}S.__boundDepthTexture=K}if(R.depthTexture&&!S.__autoAllocateDepthBuffer)if(k)for(let K=0;K<6;K++)He(S.__webglFramebuffer[K],R,K);else{const K=R.texture.mipmaps;K&&K.length>0?He(S.__webglFramebuffer[0],R,0):He(S.__webglFramebuffer,R,0)}else if(k){S.__webglDepthbuffer=[];for(let K=0;K<6;K++)if(t.bindFramebuffer(r.FRAMEBUFFER,S.__webglFramebuffer[K]),S.__webglDepthbuffer[K]===void 0)S.__webglDepthbuffer[K]=r.createRenderbuffer(),ht(S.__webglDepthbuffer[K],R,!1);else{const ne=R.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,ae=S.__webglDepthbuffer[K];r.bindRenderbuffer(r.RENDERBUFFER,ae),r.framebufferRenderbuffer(r.FRAMEBUFFER,ne,r.RENDERBUFFER,ae)}}else{const K=R.texture.mipmaps;if(K&&K.length>0?t.bindFramebuffer(r.FRAMEBUFFER,S.__webglFramebuffer[0]):t.bindFramebuffer(r.FRAMEBUFFER,S.__webglFramebuffer),S.__webglDepthbuffer===void 0)S.__webglDepthbuffer=r.createRenderbuffer(),ht(S.__webglDepthbuffer,R,!1);else{const ne=R.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,ae=S.__webglDepthbuffer;r.bindRenderbuffer(r.RENDERBUFFER,ae),r.framebufferRenderbuffer(r.FRAMEBUFFER,ne,r.RENDERBUFFER,ae)}}t.bindFramebuffer(r.FRAMEBUFFER,null)}function re(R,S,k){const K=n.get(R);S!==void 0&&Ge(K.__webglFramebuffer,R,R.texture,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,0),k!==void 0&&$(R)}function te(R){const S=R.texture,k=n.get(R),K=n.get(S);R.addEventListener("dispose",M);const ne=R.textures,ae=R.isWebGLCubeRenderTarget===!0,ue=ne.length>1;if(ue||(K.__webglTexture===void 0&&(K.__webglTexture=r.createTexture()),K.__version=S.version,o.memory.textures++),ae){k.__webglFramebuffer=[];for(let q=0;q<6;q++)if(S.mipmaps&&S.mipmaps.length>0){k.__webglFramebuffer[q]=[];for(let J=0;J<S.mipmaps.length;J++)k.__webglFramebuffer[q][J]=r.createFramebuffer()}else k.__webglFramebuffer[q]=r.createFramebuffer()}else{if(S.mipmaps&&S.mipmaps.length>0){k.__webglFramebuffer=[];for(let q=0;q<S.mipmaps.length;q++)k.__webglFramebuffer[q]=r.createFramebuffer()}else k.__webglFramebuffer=r.createFramebuffer();if(ue)for(let q=0,J=ne.length;q<J;q++){const be=n.get(ne[q]);be.__webglTexture===void 0&&(be.__webglTexture=r.createTexture(),o.memory.textures++)}if(R.samples>0&&Ie(R)===!1){k.__webglMultisampledFramebuffer=r.createFramebuffer(),k.__webglColorRenderbuffer=[],t.bindFramebuffer(r.FRAMEBUFFER,k.__webglMultisampledFramebuffer);for(let q=0;q<ne.length;q++){const J=ne[q];k.__webglColorRenderbuffer[q]=r.createRenderbuffer(),r.bindRenderbuffer(r.RENDERBUFFER,k.__webglColorRenderbuffer[q]);const be=s.convert(J.format,J.colorSpace),Re=s.convert(J.type),de=y(J.internalFormat,be,Re,J.normalized,J.colorSpace,R.isXRRenderTarget===!0),le=Ke(R);r.renderbufferStorageMultisample(r.RENDERBUFFER,le,de,R.width,R.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+q,r.RENDERBUFFER,k.__webglColorRenderbuffer[q])}r.bindRenderbuffer(r.RENDERBUFFER,null),R.depthBuffer&&(k.__webglDepthRenderbuffer=r.createRenderbuffer(),ht(k.__webglDepthRenderbuffer,R,!0)),t.bindFramebuffer(r.FRAMEBUFFER,null)}}if(ae){t.bindTexture(r.TEXTURE_CUBE_MAP,K.__webglTexture),Ye(r.TEXTURE_CUBE_MAP,S);for(let q=0;q<6;q++)if(S.mipmaps&&S.mipmaps.length>0)for(let J=0;J<S.mipmaps.length;J++)Ge(k.__webglFramebuffer[q][J],R,S,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+q,J);else Ge(k.__webglFramebuffer[q],R,S,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+q,0);g(S)&&x(r.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(ue){for(let q=0,J=ne.length;q<J;q++){const be=ne[q],Re=n.get(be);let de=r.TEXTURE_2D;(R.isWebGL3DRenderTarget||R.isWebGLArrayRenderTarget)&&(de=R.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY),t.bindTexture(de,Re.__webglTexture),Ye(de,be),Ge(k.__webglFramebuffer,R,be,r.COLOR_ATTACHMENT0+q,de,0),g(be)&&x(de)}t.unbindTexture()}else{let q=r.TEXTURE_2D;if((R.isWebGL3DRenderTarget||R.isWebGLArrayRenderTarget)&&(q=R.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY),t.bindTexture(q,K.__webglTexture),Ye(q,S),S.mipmaps&&S.mipmaps.length>0)for(let J=0;J<S.mipmaps.length;J++)Ge(k.__webglFramebuffer[J],R,S,r.COLOR_ATTACHMENT0,q,J);else Ge(k.__webglFramebuffer,R,S,r.COLOR_ATTACHMENT0,q,0);g(S)&&x(q),t.unbindTexture()}R.depthBuffer&&$(R)}function Me(R){const S=R.textures;for(let k=0,K=S.length;k<K;k++){const ne=S[k];if(g(ne)){const ae=v(R),ue=n.get(ne).__webglTexture;t.bindTexture(ae,ue),x(ae),t.unbindTexture()}}}const ge=[],We=[];function D(R){if(R.samples>0){if(Ie(R)===!1){const S=R.textures,k=R.width,K=R.height;let ne=r.COLOR_BUFFER_BIT;const ae=R.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,ue=n.get(R),q=S.length>1;if(q)for(let be=0;be<S.length;be++)t.bindFramebuffer(r.FRAMEBUFFER,ue.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+be,r.RENDERBUFFER,null),t.bindFramebuffer(r.FRAMEBUFFER,ue.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+be,r.TEXTURE_2D,null,0);t.bindFramebuffer(r.READ_FRAMEBUFFER,ue.__webglMultisampledFramebuffer);const J=R.texture.mipmaps;J&&J.length>0?t.bindFramebuffer(r.DRAW_FRAMEBUFFER,ue.__webglFramebuffer[0]):t.bindFramebuffer(r.DRAW_FRAMEBUFFER,ue.__webglFramebuffer);for(let be=0;be<S.length;be++){if(R.resolveDepthBuffer&&(R.depthBuffer&&(ne|=r.DEPTH_BUFFER_BIT),R.stencilBuffer&&R.resolveStencilBuffer&&(ne|=r.STENCIL_BUFFER_BIT)),q){r.framebufferRenderbuffer(r.READ_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.RENDERBUFFER,ue.__webglColorRenderbuffer[be]);const Re=n.get(S[be]).__webglTexture;r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,Re,0)}r.blitFramebuffer(0,0,k,K,0,0,k,K,ne,r.NEAREST),l===!0&&(ge.length=0,We.length=0,ge.push(r.COLOR_ATTACHMENT0+be),R.depthBuffer&&R.resolveDepthBuffer===!1&&(ge.push(ae),We.push(ae),r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,We)),r.invalidateFramebuffer(r.READ_FRAMEBUFFER,ge))}if(t.bindFramebuffer(r.READ_FRAMEBUFFER,null),t.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),q)for(let be=0;be<S.length;be++){t.bindFramebuffer(r.FRAMEBUFFER,ue.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+be,r.RENDERBUFFER,ue.__webglColorRenderbuffer[be]);const Re=n.get(S[be]).__webglTexture;t.bindFramebuffer(r.FRAMEBUFFER,ue.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+be,r.TEXTURE_2D,Re,0)}t.bindFramebuffer(r.DRAW_FRAMEBUFFER,ue.__webglMultisampledFramebuffer)}else if(R.depthBuffer&&R.resolveDepthBuffer===!1&&l){const S=R.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT;r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,[S])}}}function Ke(R){return Math.min(i.maxSamples,R.samples)}function Ie(R){const S=n.get(R);return R.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&S.__useRenderToTexture!==!1}function Xe(R){const S=o.render.frame;h.get(R)!==S&&(h.set(R,S),R.update())}function oe(R,S){const k=R.colorSpace,K=R.format,ne=R.type;return R.isCompressedTexture===!0||R.isVideoTexture===!0||k!==hn&&k!==Un&&(at.getTransfer(k)===pt?(K!==yn||ne!==ln)&&Ne("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):ke("WebGLTextures: Unsupported texture color space:",k)),S}function dt(R){return typeof HTMLImageElement<"u"&&R instanceof HTMLImageElement?(a.width=R.naturalWidth||R.width,a.height=R.naturalHeight||R.height):typeof VideoFrame<"u"&&R instanceof VideoFrame?(a.width=R.displayWidth,a.height=R.displayHeight):(a.width=R.width,a.height=R.height),a}this.allocateTextureUnit=O,this.resetTextureUnits=F,this.getTextureUnits=V,this.setTextureUnits=N,this.setTexture2D=j,this.setTexture2DArray=se,this.setTexture3D=me,this.setTextureCube=Te,this.rebindTextures=re,this.setupRenderTarget=te,this.updateRenderTargetMipmap=Me,this.updateMultisampleRenderTarget=D,this.setupDepthRenderbuffer=$,this.setupFrameBufferTexture=Ge,this.useMultisampledRTT=Ie,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function d2(r,e){function t(n,i=Un){let s;const o=at.getTransfer(i);if(n===ln)return r.UNSIGNED_BYTE;if(n===Oc)return r.UNSIGNED_SHORT_4_4_4_4;if(n===Bc)return r.UNSIGNED_SHORT_5_5_5_1;if(n===pu)return r.UNSIGNED_INT_5_9_9_9_REV;if(n===mu)return r.UNSIGNED_INT_10F_11F_11F_REV;if(n===fu)return r.BYTE;if(n===du)return r.SHORT;if(n===or)return r.UNSIGNED_SHORT;if(n===Fc)return r.INT;if(n===Gn)return r.UNSIGNED_INT;if(n===vn)return r.FLOAT;if(n===sn)return r.HALF_FLOAT;if(n===gu)return r.ALPHA;if(n===_u)return r.RGB;if(n===yn)return r.RGBA;if(n===si)return r.DEPTH_COMPONENT;if(n===Ni)return r.DEPTH_STENCIL;if(n===zc)return r.RED;if(n===kc)return r.RED_INTEGER;if(n===Oi)return r.RG;if(n===Gc)return r.RG_INTEGER;if(n===Vc)return r.RGBA_INTEGER;if(n===ro||n===oo||n===ao||n===co)if(o===pt)if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(n===ro)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===oo)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===ao)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===co)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(n===ro)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===oo)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===ao)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===co)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Fa||n===Oa||n===Ba||n===za)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(n===Fa)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Oa)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Ba)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===za)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===ka||n===Ga||n===Va||n===Ha||n===Wa||n===fo||n===Xa)if(s=e.get("WEBGL_compressed_texture_etc"),s!==null){if(n===ka||n===Ga)return o===pt?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(n===Va)return o===pt?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC;if(n===Ha)return s.COMPRESSED_R11_EAC;if(n===Wa)return s.COMPRESSED_SIGNED_R11_EAC;if(n===fo)return s.COMPRESSED_RG11_EAC;if(n===Xa)return s.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===qa||n===Ya||n===Ka||n===ja||n===Ja||n===Za||n===$a||n===Qa||n===ec||n===tc||n===nc||n===ic||n===sc||n===rc)if(s=e.get("WEBGL_compressed_texture_astc"),s!==null){if(n===qa)return o===pt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Ya)return o===pt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Ka)return o===pt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===ja)return o===pt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Ja)return o===pt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Za)return o===pt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===$a)return o===pt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Qa)return o===pt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===ec)return o===pt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===tc)return o===pt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===nc)return o===pt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===ic)return o===pt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===sc)return o===pt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===rc)return o===pt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===oc||n===ac||n===cc)if(s=e.get("EXT_texture_compression_bptc"),s!==null){if(n===oc)return o===pt?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===ac)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===cc)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===lc||n===hc||n===po||n===uc)if(s=e.get("EXT_texture_compression_rgtc"),s!==null){if(n===lc)return s.COMPRESSED_RED_RGTC1_EXT;if(n===hc)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===po)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===uc)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===ar?r.UNSIGNED_INT_24_8:r[n]!==void 0?r[n]:null}return{convert:t}}const p2=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,m2=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class g2{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const n=new Iu(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,n=new Xt({vertexShader:p2,fragmentShader:m2,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new G(new xn(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class _2 extends bi{constructor(e,t){super();const n=this;let i=null,s=1,o=null,c="local-floor",l=1,a=null,h=null,u=null,f=null,_=null,d=null;const m=typeof XRWebGLBinding<"u",p=new g2,g={},x=t.getContextAttributes();let v=null,y=null;const w=[],b=[],A=new ee;let M=null;const T=new tn;T.viewport=new xt;const C=new tn;C.viewport=new xt;const P=[T,C],I=new um;let F=null,V=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Z){let xe=w[Z];return xe===void 0&&(xe=new Go,w[Z]=xe),xe.getTargetRaySpace()},this.getControllerGrip=function(Z){let xe=w[Z];return xe===void 0&&(xe=new Go,w[Z]=xe),xe.getGripSpace()},this.getHand=function(Z){let xe=w[Z];return xe===void 0&&(xe=new Go,w[Z]=xe),xe.getHandSpace()};function N(Z){const xe=b.indexOf(Z.inputSource);if(xe===-1)return;const ce=w[xe];ce!==void 0&&(ce.update(Z.inputSource,Z.frame,a||o),ce.dispatchEvent({type:Z.type,data:Z.inputSource}))}function O(){i.removeEventListener("select",N),i.removeEventListener("selectstart",N),i.removeEventListener("selectend",N),i.removeEventListener("squeeze",N),i.removeEventListener("squeezestart",N),i.removeEventListener("squeezeend",N),i.removeEventListener("end",O),i.removeEventListener("inputsourceschange",z);for(let Z=0;Z<w.length;Z++){const xe=b[Z];xe!==null&&(b[Z]=null,w[Z].disconnect(xe))}F=null,V=null,p.reset();for(const Z in g)delete g[Z];e.setRenderTarget(v),_=null,f=null,u=null,i=null,y=null,Ye.stop(),n.isPresenting=!1,e.setPixelRatio(M),e.setSize(A.width,A.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Z){s=Z,n.isPresenting===!0&&Ne("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Z){c=Z,n.isPresenting===!0&&Ne("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return a||o},this.setReferenceSpace=function(Z){a=Z},this.getBaseLayer=function(){return f!==null?f:_},this.getBinding=function(){return u===null&&m&&(u=new XRWebGLBinding(i,t)),u},this.getFrame=function(){return d},this.getSession=function(){return i},this.setSession=async function(Z){if(i=Z,i!==null){if(v=e.getRenderTarget(),i.addEventListener("select",N),i.addEventListener("selectstart",N),i.addEventListener("selectend",N),i.addEventListener("squeeze",N),i.addEventListener("squeezestart",N),i.addEventListener("squeezeend",N),i.addEventListener("end",O),i.addEventListener("inputsourceschange",z),x.xrCompatible!==!0&&await t.makeXRCompatible(),M=e.getPixelRatio(),e.getSize(A),m&&"createProjectionLayer"in XRWebGLBinding.prototype){let ce=null,Ue=null,Ve=null;x.depth&&(Ve=x.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,ce=x.stencil?Ni:si,Ue=x.stencil?ar:Gn);const Ge={colorFormat:t.RGBA8,depthFormat:Ve,scaleFactor:s};u=this.getBinding(),f=u.createProjectionLayer(Ge),i.updateRenderState({layers:[f]}),e.setPixelRatio(1),e.setSize(f.textureWidth,f.textureHeight,!1),y=new nn(f.textureWidth,f.textureHeight,{format:yn,type:ln,depthTexture:new vs(f.textureWidth,f.textureHeight,Ue,void 0,void 0,void 0,void 0,void 0,void 0,ce),stencilBuffer:x.stencil,colorSpace:e.outputColorSpace,samples:x.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}else{const ce={antialias:x.antialias,alpha:!0,depth:x.depth,stencil:x.stencil,framebufferScaleFactor:s};_=new XRWebGLLayer(i,t,ce),i.updateRenderState({baseLayer:_}),e.setPixelRatio(1),e.setSize(_.framebufferWidth,_.framebufferHeight,!1),y=new nn(_.framebufferWidth,_.framebufferHeight,{format:yn,type:ln,colorSpace:e.outputColorSpace,stencilBuffer:x.stencil,resolveDepthBuffer:_.ignoreDepthValues===!1,resolveStencilBuffer:_.ignoreDepthValues===!1})}y.isXRRenderTarget=!0,this.setFoveation(l),a=null,o=await i.requestReferenceSpace(c),Ye.setContext(i),Ye.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode},this.getDepthTexture=function(){return p.getDepthTexture()};function z(Z){for(let xe=0;xe<Z.removed.length;xe++){const ce=Z.removed[xe],Ue=b.indexOf(ce);Ue>=0&&(b[Ue]=null,w[Ue].disconnect(ce))}for(let xe=0;xe<Z.added.length;xe++){const ce=Z.added[xe];let Ue=b.indexOf(ce);if(Ue===-1){for(let Ge=0;Ge<w.length;Ge++)if(Ge>=b.length){b.push(ce),Ue=Ge;break}else if(b[Ge]===null){b[Ge]=ce,Ue=Ge;break}if(Ue===-1)break}const Ve=w[Ue];Ve&&Ve.connect(ce)}}const j=new L,se=new L;function me(Z,xe,ce){j.setFromMatrixPosition(xe.matrixWorld),se.setFromMatrixPosition(ce.matrixWorld);const Ue=j.distanceTo(se),Ve=xe.projectionMatrix.elements,Ge=ce.projectionMatrix.elements,ht=Ve[14]/(Ve[10]-1),He=Ve[14]/(Ve[10]+1),$=(Ve[9]+1)/Ve[5],re=(Ve[9]-1)/Ve[5],te=(Ve[8]-1)/Ve[0],Me=(Ge[8]+1)/Ge[0],ge=ht*te,We=ht*Me,D=Ue/(-te+Me),Ke=D*-te;if(xe.matrixWorld.decompose(Z.position,Z.quaternion,Z.scale),Z.translateX(Ke),Z.translateZ(D),Z.matrixWorld.compose(Z.position,Z.quaternion,Z.scale),Z.matrixWorldInverse.copy(Z.matrixWorld).invert(),Ve[10]===-1)Z.projectionMatrix.copy(xe.projectionMatrix),Z.projectionMatrixInverse.copy(xe.projectionMatrixInverse);else{const Ie=ht+D,Xe=He+D,oe=ge-Ke,dt=We+(Ue-Ke),R=$*He/Xe*Ie,S=re*He/Xe*Ie;Z.projectionMatrix.makePerspective(oe,dt,R,S,Ie,Xe),Z.projectionMatrixInverse.copy(Z.projectionMatrix).invert()}}function Te(Z,xe){xe===null?Z.matrixWorld.copy(Z.matrix):Z.matrixWorld.multiplyMatrices(xe.matrixWorld,Z.matrix),Z.matrixWorldInverse.copy(Z.matrixWorld).invert()}this.updateCamera=function(Z){if(i===null)return;let xe=Z.near,ce=Z.far;p.texture!==null&&(p.depthNear>0&&(xe=p.depthNear),p.depthFar>0&&(ce=p.depthFar)),I.near=C.near=T.near=xe,I.far=C.far=T.far=ce,(F!==I.near||V!==I.far)&&(i.updateRenderState({depthNear:I.near,depthFar:I.far}),F=I.near,V=I.far),I.layers.mask=Z.layers.mask|6,T.layers.mask=I.layers.mask&-5,C.layers.mask=I.layers.mask&-3;const Ue=Z.parent,Ve=I.cameras;Te(I,Ue);for(let Ge=0;Ge<Ve.length;Ge++)Te(Ve[Ge],Ue);Ve.length===2?me(I,T,C):I.projectionMatrix.copy(T.projectionMatrix),Le(Z,I,Ue)};function Le(Z,xe,ce){ce===null?Z.matrix.copy(xe.matrixWorld):(Z.matrix.copy(ce.matrixWorld),Z.matrix.invert(),Z.matrix.multiply(xe.matrixWorld)),Z.matrix.decompose(Z.position,Z.quaternion,Z.scale),Z.updateMatrixWorld(!0),Z.projectionMatrix.copy(xe.projectionMatrix),Z.projectionMatrixInverse.copy(xe.projectionMatrixInverse),Z.isPerspectiveCamera&&(Z.fov=xs*2*Math.atan(1/Z.projectionMatrix.elements[5]),Z.zoom=1)}this.getCamera=function(){return I},this.getFoveation=function(){if(!(f===null&&_===null))return l},this.setFoveation=function(Z){l=Z,f!==null&&(f.fixedFoveation=Z),_!==null&&_.fixedFoveation!==void 0&&(_.fixedFoveation=Z)},this.hasDepthSensing=function(){return p.texture!==null},this.getDepthSensingMesh=function(){return p.getMesh(I)},this.getCameraTexture=function(Z){return g[Z]};let tt=null;function lt(Z,xe){if(h=xe.getViewerPose(a||o),d=xe,h!==null){const ce=h.views;_!==null&&(e.setRenderTargetFramebuffer(y,_.framebuffer),e.setRenderTarget(y));let Ue=!1;ce.length!==I.cameras.length&&(I.cameras.length=0,Ue=!0);for(let He=0;He<ce.length;He++){const $=ce[He];let re=null;if(_!==null)re=_.getViewport($);else{const Me=u.getViewSubImage(f,$);re=Me.viewport,He===0&&(e.setRenderTargetTextures(y,Me.colorTexture,Me.depthStencilTexture),e.setRenderTarget(y))}let te=P[He];te===void 0&&(te=new tn,te.layers.enable(He),te.viewport=new xt,P[He]=te),te.matrix.fromArray($.transform.matrix),te.matrix.decompose(te.position,te.quaternion,te.scale),te.projectionMatrix.fromArray($.projectionMatrix),te.projectionMatrixInverse.copy(te.projectionMatrix).invert(),te.viewport.set(re.x,re.y,re.width,re.height),He===0&&(I.matrix.copy(te.matrix),I.matrix.decompose(I.position,I.quaternion,I.scale)),Ue===!0&&I.cameras.push(te)}const Ve=i.enabledFeatures;if(Ve&&Ve.includes("depth-sensing")&&i.depthUsage=="gpu-optimized"&&m){u=n.getBinding();const He=u.getDepthInformation(ce[0]);He&&He.isValid&&He.texture&&p.init(He,i.renderState)}if(Ve&&Ve.includes("camera-access")&&m){e.state.unbindTexture(),u=n.getBinding();for(let He=0;He<ce.length;He++){const $=ce[He].camera;if($){let re=g[$];re||(re=new Iu,g[$]=re);const te=u.getCameraImage($);re.sourceTexture=te}}}}for(let ce=0;ce<w.length;ce++){const Ue=b[ce],Ve=w[ce];Ue!==null&&Ve!==void 0&&Ve.update(Ue,xe,a||o)}tt&&tt(Z,xe),xe.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:xe}),d=null}const Ye=new ju;Ye.setAnimationLoop(lt),this.setAnimationLoop=function(Z){tt=Z},this.dispose=function(){}}}const x2=new qe,nf=new Ze;nf.set(-1,0,0,0,1,0,0,0,1);function v2(r,e){function t(p,g){p.matrixAutoUpdate===!0&&p.updateMatrix(),g.value.copy(p.matrix)}function n(p,g){g.color.getRGB(p.fogColor.value,Vu(r)),g.isFog?(p.fogNear.value=g.near,p.fogFar.value=g.far):g.isFogExp2&&(p.fogDensity.value=g.density)}function i(p,g,x,v,y){g.isNodeMaterial?g.uniformsNeedUpdate=!1:g.isMeshBasicMaterial?s(p,g):g.isMeshLambertMaterial?(s(p,g),g.envMap&&(p.envMapIntensity.value=g.envMapIntensity)):g.isMeshToonMaterial?(s(p,g),u(p,g)):g.isMeshPhongMaterial?(s(p,g),h(p,g),g.envMap&&(p.envMapIntensity.value=g.envMapIntensity)):g.isMeshStandardMaterial?(s(p,g),f(p,g),g.isMeshPhysicalMaterial&&_(p,g,y)):g.isMeshMatcapMaterial?(s(p,g),d(p,g)):g.isMeshDepthMaterial?s(p,g):g.isMeshDistanceMaterial?(s(p,g),m(p,g)):g.isMeshNormalMaterial?s(p,g):g.isLineBasicMaterial?(o(p,g),g.isLineDashedMaterial&&c(p,g)):g.isPointsMaterial?l(p,g,x,v):g.isSpriteMaterial?a(p,g):g.isShadowMaterial?(p.color.value.copy(g.color),p.opacity.value=g.opacity):g.isShaderMaterial&&(g.uniformsNeedUpdate=!1)}function s(p,g){p.opacity.value=g.opacity,g.color&&p.diffuse.value.copy(g.color),g.emissive&&p.emissive.value.copy(g.emissive).multiplyScalar(g.emissiveIntensity),g.map&&(p.map.value=g.map,t(g.map,p.mapTransform)),g.alphaMap&&(p.alphaMap.value=g.alphaMap,t(g.alphaMap,p.alphaMapTransform)),g.bumpMap&&(p.bumpMap.value=g.bumpMap,t(g.bumpMap,p.bumpMapTransform),p.bumpScale.value=g.bumpScale,g.side===Zt&&(p.bumpScale.value*=-1)),g.normalMap&&(p.normalMap.value=g.normalMap,t(g.normalMap,p.normalMapTransform),p.normalScale.value.copy(g.normalScale),g.side===Zt&&p.normalScale.value.negate()),g.displacementMap&&(p.displacementMap.value=g.displacementMap,t(g.displacementMap,p.displacementMapTransform),p.displacementScale.value=g.displacementScale,p.displacementBias.value=g.displacementBias),g.emissiveMap&&(p.emissiveMap.value=g.emissiveMap,t(g.emissiveMap,p.emissiveMapTransform)),g.specularMap&&(p.specularMap.value=g.specularMap,t(g.specularMap,p.specularMapTransform)),g.alphaTest>0&&(p.alphaTest.value=g.alphaTest);const x=e.get(g),v=x.envMap,y=x.envMapRotation;v&&(p.envMap.value=v,p.envMapRotation.value.setFromMatrix4(x2.makeRotationFromEuler(y)).transpose(),v.isCubeTexture&&v.isRenderTargetTexture===!1&&p.envMapRotation.value.premultiply(nf),p.reflectivity.value=g.reflectivity,p.ior.value=g.ior,p.refractionRatio.value=g.refractionRatio),g.lightMap&&(p.lightMap.value=g.lightMap,p.lightMapIntensity.value=g.lightMapIntensity,t(g.lightMap,p.lightMapTransform)),g.aoMap&&(p.aoMap.value=g.aoMap,p.aoMapIntensity.value=g.aoMapIntensity,t(g.aoMap,p.aoMapTransform))}function o(p,g){p.diffuse.value.copy(g.color),p.opacity.value=g.opacity,g.map&&(p.map.value=g.map,t(g.map,p.mapTransform))}function c(p,g){p.dashSize.value=g.dashSize,p.totalSize.value=g.dashSize+g.gapSize,p.scale.value=g.scale}function l(p,g,x,v){p.diffuse.value.copy(g.color),p.opacity.value=g.opacity,p.size.value=g.size*x,p.scale.value=v*.5,g.map&&(p.map.value=g.map,t(g.map,p.uvTransform)),g.alphaMap&&(p.alphaMap.value=g.alphaMap,t(g.alphaMap,p.alphaMapTransform)),g.alphaTest>0&&(p.alphaTest.value=g.alphaTest)}function a(p,g){p.diffuse.value.copy(g.color),p.opacity.value=g.opacity,p.rotation.value=g.rotation,g.map&&(p.map.value=g.map,t(g.map,p.mapTransform)),g.alphaMap&&(p.alphaMap.value=g.alphaMap,t(g.alphaMap,p.alphaMapTransform)),g.alphaTest>0&&(p.alphaTest.value=g.alphaTest)}function h(p,g){p.specular.value.copy(g.specular),p.shininess.value=Math.max(g.shininess,1e-4)}function u(p,g){g.gradientMap&&(p.gradientMap.value=g.gradientMap)}function f(p,g){p.metalness.value=g.metalness,g.metalnessMap&&(p.metalnessMap.value=g.metalnessMap,t(g.metalnessMap,p.metalnessMapTransform)),p.roughness.value=g.roughness,g.roughnessMap&&(p.roughnessMap.value=g.roughnessMap,t(g.roughnessMap,p.roughnessMapTransform)),g.envMap&&(p.envMapIntensity.value=g.envMapIntensity)}function _(p,g,x){p.ior.value=g.ior,g.sheen>0&&(p.sheenColor.value.copy(g.sheenColor).multiplyScalar(g.sheen),p.sheenRoughness.value=g.sheenRoughness,g.sheenColorMap&&(p.sheenColorMap.value=g.sheenColorMap,t(g.sheenColorMap,p.sheenColorMapTransform)),g.sheenRoughnessMap&&(p.sheenRoughnessMap.value=g.sheenRoughnessMap,t(g.sheenRoughnessMap,p.sheenRoughnessMapTransform))),g.clearcoat>0&&(p.clearcoat.value=g.clearcoat,p.clearcoatRoughness.value=g.clearcoatRoughness,g.clearcoatMap&&(p.clearcoatMap.value=g.clearcoatMap,t(g.clearcoatMap,p.clearcoatMapTransform)),g.clearcoatRoughnessMap&&(p.clearcoatRoughnessMap.value=g.clearcoatRoughnessMap,t(g.clearcoatRoughnessMap,p.clearcoatRoughnessMapTransform)),g.clearcoatNormalMap&&(p.clearcoatNormalMap.value=g.clearcoatNormalMap,t(g.clearcoatNormalMap,p.clearcoatNormalMapTransform),p.clearcoatNormalScale.value.copy(g.clearcoatNormalScale),g.side===Zt&&p.clearcoatNormalScale.value.negate())),g.dispersion>0&&(p.dispersion.value=g.dispersion),g.iridescence>0&&(p.iridescence.value=g.iridescence,p.iridescenceIOR.value=g.iridescenceIOR,p.iridescenceThicknessMinimum.value=g.iridescenceThicknessRange[0],p.iridescenceThicknessMaximum.value=g.iridescenceThicknessRange[1],g.iridescenceMap&&(p.iridescenceMap.value=g.iridescenceMap,t(g.iridescenceMap,p.iridescenceMapTransform)),g.iridescenceThicknessMap&&(p.iridescenceThicknessMap.value=g.iridescenceThicknessMap,t(g.iridescenceThicknessMap,p.iridescenceThicknessMapTransform))),g.transmission>0&&(p.transmission.value=g.transmission,p.transmissionSamplerMap.value=x.texture,p.transmissionSamplerSize.value.set(x.width,x.height),g.transmissionMap&&(p.transmissionMap.value=g.transmissionMap,t(g.transmissionMap,p.transmissionMapTransform)),p.thickness.value=g.thickness,g.thicknessMap&&(p.thicknessMap.value=g.thicknessMap,t(g.thicknessMap,p.thicknessMapTransform)),p.attenuationDistance.value=g.attenuationDistance,p.attenuationColor.value.copy(g.attenuationColor)),g.anisotropy>0&&(p.anisotropyVector.value.set(g.anisotropy*Math.cos(g.anisotropyRotation),g.anisotropy*Math.sin(g.anisotropyRotation)),g.anisotropyMap&&(p.anisotropyMap.value=g.anisotropyMap,t(g.anisotropyMap,p.anisotropyMapTransform))),p.specularIntensity.value=g.specularIntensity,p.specularColor.value.copy(g.specularColor),g.specularColorMap&&(p.specularColorMap.value=g.specularColorMap,t(g.specularColorMap,p.specularColorMapTransform)),g.specularIntensityMap&&(p.specularIntensityMap.value=g.specularIntensityMap,t(g.specularIntensityMap,p.specularIntensityMapTransform))}function d(p,g){g.matcap&&(p.matcap.value=g.matcap)}function m(p,g){const x=e.get(g).light;p.referencePosition.value.setFromMatrixPosition(x.matrixWorld),p.nearDistance.value=x.shadow.camera.near,p.farDistance.value=x.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:i}}function y2(r,e,t,n){let i={},s={},o=[];const c=r.getParameter(r.MAX_UNIFORM_BUFFER_BINDINGS);function l(x,v){const y=v.program;n.uniformBlockBinding(x,y)}function a(x,v){let y=i[x.id];y===void 0&&(d(x),y=h(x),i[x.id]=y,x.addEventListener("dispose",p));const w=v.program;n.updateUBOMapping(x,w);const b=e.render.frame;s[x.id]!==b&&(f(x),s[x.id]=b)}function h(x){const v=u();x.__bindingPointIndex=v;const y=r.createBuffer(),w=x.__size,b=x.usage;return r.bindBuffer(r.UNIFORM_BUFFER,y),r.bufferData(r.UNIFORM_BUFFER,w,b),r.bindBuffer(r.UNIFORM_BUFFER,null),r.bindBufferBase(r.UNIFORM_BUFFER,v,y),y}function u(){for(let x=0;x<c;x++)if(o.indexOf(x)===-1)return o.push(x),x;return ke("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(x){const v=i[x.id],y=x.uniforms,w=x.__cache;r.bindBuffer(r.UNIFORM_BUFFER,v);for(let b=0,A=y.length;b<A;b++){const M=Array.isArray(y[b])?y[b]:[y[b]];for(let T=0,C=M.length;T<C;T++){const P=M[T];if(_(P,b,T,w)===!0){const I=P.__offset,F=Array.isArray(P.value)?P.value:[P.value];let V=0;for(let N=0;N<F.length;N++){const O=F[N],z=m(O);typeof O=="number"||typeof O=="boolean"?(P.__data[0]=O,r.bufferSubData(r.UNIFORM_BUFFER,I+V,P.__data)):O.isMatrix3?(P.__data[0]=O.elements[0],P.__data[1]=O.elements[1],P.__data[2]=O.elements[2],P.__data[3]=0,P.__data[4]=O.elements[3],P.__data[5]=O.elements[4],P.__data[6]=O.elements[5],P.__data[7]=0,P.__data[8]=O.elements[6],P.__data[9]=O.elements[7],P.__data[10]=O.elements[8],P.__data[11]=0):ArrayBuffer.isView(O)?P.__data.set(new O.constructor(O.buffer,O.byteOffset,P.__data.length)):(O.toArray(P.__data,V),V+=z.storage/Float32Array.BYTES_PER_ELEMENT)}r.bufferSubData(r.UNIFORM_BUFFER,I,P.__data)}}}r.bindBuffer(r.UNIFORM_BUFFER,null)}function _(x,v,y,w){const b=x.value,A=v+"_"+y;if(w[A]===void 0)return typeof b=="number"||typeof b=="boolean"?w[A]=b:ArrayBuffer.isView(b)?w[A]=b.slice():w[A]=b.clone(),!0;{const M=w[A];if(typeof b=="number"||typeof b=="boolean"){if(M!==b)return w[A]=b,!0}else{if(ArrayBuffer.isView(b))return!0;if(M.equals(b)===!1)return M.copy(b),!0}}return!1}function d(x){const v=x.uniforms;let y=0;const w=16;for(let A=0,M=v.length;A<M;A++){const T=Array.isArray(v[A])?v[A]:[v[A]];for(let C=0,P=T.length;C<P;C++){const I=T[C],F=Array.isArray(I.value)?I.value:[I.value];for(let V=0,N=F.length;V<N;V++){const O=F[V],z=m(O),j=y%w,se=j%z.boundary,me=j+se;y+=se,me!==0&&w-me<z.storage&&(y+=w-me),I.__data=new Float32Array(z.storage/Float32Array.BYTES_PER_ELEMENT),I.__offset=y,y+=z.storage}}}const b=y%w;return b>0&&(y+=w-b),x.__size=y,x.__cache={},this}function m(x){const v={boundary:0,storage:0};return typeof x=="number"||typeof x=="boolean"?(v.boundary=4,v.storage=4):x.isVector2?(v.boundary=8,v.storage=8):x.isVector3||x.isColor?(v.boundary=16,v.storage=12):x.isVector4?(v.boundary=16,v.storage=16):x.isMatrix3?(v.boundary=48,v.storage=48):x.isMatrix4?(v.boundary=64,v.storage=64):x.isTexture?Ne("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(x)?(v.boundary=16,v.storage=x.byteLength):Ne("WebGLRenderer: Unsupported uniform value type.",x),v}function p(x){const v=x.target;v.removeEventListener("dispose",p);const y=o.indexOf(v.__bindingPointIndex);o.splice(y,1),r.deleteBuffer(i[v.id]),delete i[v.id],delete s[v.id]}function g(){for(const x in i)r.deleteBuffer(i[x]);o=[],i={},s={}}return{bind:l,update:a,dispose:g}}const M2=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let In=null;function S2(){return In===null&&(In=new jc(M2,16,16,Oi,sn),In.name="DFG_LUT",In.minFilter=zt,In.magFilter=zt,In.wrapS=Fn,In.wrapT=Fn,In.generateMipmaps=!1,In.needsUpdate=!0),In}class b2{constructor(e={}){const{canvas:t=md(),context:n=null,depth:i=!0,stencil:s=!1,alpha:o=!1,antialias:c=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:a=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reversedDepthBuffer:f=!1,outputBufferType:_=ln}=e;this.isWebGLRenderer=!0;let d;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");d=n.getContextAttributes().alpha}else d=o;const m=_,p=new Set([Vc,Gc,kc]),g=new Set([ln,Gn,or,ar,Oc,Bc]),x=new Uint32Array(4),v=new Int32Array(4),y=new L;let w=null,b=null;const A=[],M=[];let T=null;this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=kn,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const C=this;let P=!1,I=null;this._outputColorSpace=Et;let F=0,V=0,N=null,O=-1,z=null;const j=new xt,se=new xt;let me=null;const Te=new ye(0);let Le=0,tt=t.width,lt=t.height,Ye=1,Z=null,xe=null;const ce=new xt(0,0,tt,lt),Ue=new xt(0,0,tt,lt);let Ve=!1;const Ge=new Zc;let ht=!1,He=!1;const $=new qe,re=new L,te=new xt,Me={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let ge=!1;function We(){return N===null?Ye:1}let D=n;function Ke(E,B){return t.getContext(E,B)}try{const E={alpha:!0,depth:i,stencil:s,antialias:c,premultipliedAlpha:l,preserveDrawingBuffer:a,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Cc}`),t.addEventListener("webglcontextlost",ie,!1),t.addEventListener("webglcontextrestored",Fe,!1),t.addEventListener("webglcontextcreationerror",$e,!1),D===null){const B="webgl2";if(D=Ke(B,E),D===null)throw Ke(B)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(E){throw ke("WebGLRenderer: "+E.message),E}let Ie,Xe,oe,dt,R,S,k,K,ne,ae,ue,q,J,be,Re,de,le,je,nt,ft,U,he,Y;function Ee(){Ie=new S_(D),Ie.init(),U=new d2(D,Ie),Xe=new p_(D,Ie,e,U),oe=new u2(D,Ie),Xe.reversedDepthBuffer&&f&&oe.buffers.depth.setReversed(!0),dt=new T_(D),R=new Zx,S=new f2(D,Ie,oe,R,Xe,U,dt),k=new M_(C),K=new Cm(D),he=new f_(D,K),ne=new b_(D,K,dt,he),ae=new A_(D,ne,K,he,dt),je=new E_(D,Xe,S),Re=new m_(R),ue=new Jx(C,k,Ie,Xe,he,Re),q=new v2(C,R),J=new Qx,be=new r2(Ie),le=new u_(C,k,oe,ae,d,l),de=new h2(C,ae,Xe),Y=new y2(D,dt,Xe,oe),nt=new d_(D,Ie,dt),ft=new w_(D,Ie,dt),dt.programs=ue.programs,C.capabilities=Xe,C.extensions=Ie,C.properties=R,C.renderLists=J,C.shadowMap=de,C.state=oe,C.info=dt}Ee(),m!==ln&&(T=new C_(m,t.width,t.height,i,s));const pe=new _2(C,D);this.xr=pe,this.getContext=function(){return D},this.getContextAttributes=function(){return D.getContextAttributes()},this.forceContextLoss=function(){const E=Ie.get("WEBGL_lose_context");E&&E.loseContext()},this.forceContextRestore=function(){const E=Ie.get("WEBGL_lose_context");E&&E.restoreContext()},this.getPixelRatio=function(){return Ye},this.setPixelRatio=function(E){E!==void 0&&(Ye=E,this.setSize(tt,lt,!1))},this.getSize=function(E){return E.set(tt,lt)},this.setSize=function(E,B,X=!0){if(pe.isPresenting){Ne("WebGLRenderer: Can't change size while VR device is presenting.");return}tt=E,lt=B,t.width=Math.floor(E*Ye),t.height=Math.floor(B*Ye),X===!0&&(t.style.width=E+"px",t.style.height=B+"px"),T!==null&&T.setSize(t.width,t.height),this.setViewport(0,0,E,B)},this.getDrawingBufferSize=function(E){return E.set(tt*Ye,lt*Ye).floor()},this.setDrawingBufferSize=function(E,B,X){tt=E,lt=B,Ye=X,t.width=Math.floor(E*X),t.height=Math.floor(B*X),this.setViewport(0,0,E,B)},this.setEffects=function(E){if(m===ln){ke("THREE.WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(E){for(let B=0;B<E.length;B++)if(E[B].isOutputPass===!0){Ne("THREE.WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}T.setEffects(E||[])},this.getCurrentViewport=function(E){return E.copy(j)},this.getViewport=function(E){return E.copy(ce)},this.setViewport=function(E,B,X,H){E.isVector4?ce.set(E.x,E.y,E.z,E.w):ce.set(E,B,X,H),oe.viewport(j.copy(ce).multiplyScalar(Ye).round())},this.getScissor=function(E){return E.copy(Ue)},this.setScissor=function(E,B,X,H){E.isVector4?Ue.set(E.x,E.y,E.z,E.w):Ue.set(E,B,X,H),oe.scissor(se.copy(Ue).multiplyScalar(Ye).round())},this.getScissorTest=function(){return Ve},this.setScissorTest=function(E){oe.setScissorTest(Ve=E)},this.setOpaqueSort=function(E){Z=E},this.setTransparentSort=function(E){xe=E},this.getClearColor=function(E){return E.copy(le.getClearColor())},this.setClearColor=function(){le.setClearColor(...arguments)},this.getClearAlpha=function(){return le.getClearAlpha()},this.setClearAlpha=function(){le.setClearAlpha(...arguments)},this.clear=function(E=!0,B=!0,X=!0){let H=0;if(E){let W=!1;if(N!==null){const Se=N.texture.format;W=p.has(Se)}if(W){const Se=N.texture.type,Ce=g.has(Se),ve=le.getClearColor(),De=le.getClearAlpha(),Oe=ve.r,Qe=ve.g,rt=ve.b;Ce?(x[0]=Oe,x[1]=Qe,x[2]=rt,x[3]=De,D.clearBufferuiv(D.COLOR,0,x)):(v[0]=Oe,v[1]=Qe,v[2]=rt,v[3]=De,D.clearBufferiv(D.COLOR,0,v))}else H|=D.COLOR_BUFFER_BIT}B&&(H|=D.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),X&&(H|=D.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),H!==0&&D.clear(H)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(E){E.setRenderer(this),I=E},this.dispose=function(){t.removeEventListener("webglcontextlost",ie,!1),t.removeEventListener("webglcontextrestored",Fe,!1),t.removeEventListener("webglcontextcreationerror",$e,!1),le.dispose(),J.dispose(),be.dispose(),R.dispose(),k.dispose(),ae.dispose(),he.dispose(),Y.dispose(),ue.dispose(),pe.dispose(),pe.removeEventListener("sessionstart",dl),pe.removeEventListener("sessionend",pl),Ti.stop()};function ie(E){E.preventDefault(),_o("WebGLRenderer: Context Lost."),P=!0}function Fe(){_o("WebGLRenderer: Context Restored."),P=!1;const E=dt.autoReset,B=de.enabled,X=de.autoUpdate,H=de.needsUpdate,W=de.type;Ee(),dt.autoReset=E,de.enabled=B,de.autoUpdate=X,de.needsUpdate=H,de.type=W}function $e(E){ke("WebGLRenderer: A WebGL context could not be created. Reason: ",E.statusMessage)}function Ct(E){const B=E.target;B.removeEventListener("dispose",Ct),vt(B)}function vt(E){Xn(E),R.remove(E)}function Xn(E){const B=R.get(E).programs;B!==void 0&&(B.forEach(function(X){ue.releaseProgram(X)}),E.isShaderMaterial&&ue.releaseShaderCache(E))}this.renderBufferDirect=function(E,B,X,H,W,Se){B===null&&(B=Me);const Ce=W.isMesh&&W.matrixWorld.determinant()<0,ve=_f(E,B,X,H,W);oe.setMaterial(H,Ce);let De=X.index,Oe=1;if(H.wireframe===!0){if(De=ne.getWireframeAttribute(X),De===void 0)return;Oe=2}const Qe=X.drawRange,rt=X.attributes.position;let Be=Qe.start*Oe,yt=(Qe.start+Qe.count)*Oe;Se!==null&&(Be=Math.max(Be,Se.start*Oe),yt=Math.min(yt,(Se.start+Se.count)*Oe)),De!==null?(Be=Math.max(Be,0),yt=Math.min(yt,De.count)):rt!=null&&(Be=Math.max(Be,0),yt=Math.min(yt,rt.count));const Pt=yt-Be;if(Pt<0||Pt===1/0)return;he.setup(W,H,ve,X,De);let Rt,Mt=nt;if(De!==null&&(Rt=K.get(De),Mt=ft,Mt.setIndex(Rt)),W.isMesh)H.wireframe===!0?(oe.setLineWidth(H.wireframeLinewidth*We()),Mt.setMode(D.LINES)):Mt.setMode(D.TRIANGLES);else if(W.isLine){let Kt=H.linewidth;Kt===void 0&&(Kt=1),oe.setLineWidth(Kt*We()),W.isLineSegments?Mt.setMode(D.LINES):W.isLineLoop?Mt.setMode(D.LINE_LOOP):Mt.setMode(D.LINE_STRIP)}else W.isPoints?Mt.setMode(D.POINTS):W.isSprite&&Mt.setMode(D.TRIANGLES);if(W.isBatchedMesh)if(Ie.get("WEBGL_multi_draw"))Mt.renderMultiDraw(W._multiDrawStarts,W._multiDrawCounts,W._multiDrawCount);else{const Kt=W._multiDrawStarts,Ae=W._multiDrawCounts,on=W._multiDrawCount,ut=De?K.get(De).bytesPerElement:1,dn=R.get(H).currentProgram.getUniforms();for(let Pn=0;Pn<on;Pn++)dn.setValue(D,"_gl_DrawID",Pn),Mt.render(Kt[Pn]/ut,Ae[Pn])}else if(W.isInstancedMesh)Mt.renderInstances(Be,Pt,W.count);else if(X.isInstancedBufferGeometry){const Kt=X._maxInstanceCount!==void 0?X._maxInstanceCount:1/0,Ae=Math.min(X.instanceCount,Kt);Mt.renderInstances(Be,Pt,Ae)}else Mt.render(Be,Pt)};function Cn(E,B,X){E.transparent===!0&&E.side===It&&E.forceSinglePass===!1?(E.side=Zt,E.needsUpdate=!0,Sr(E,B,X),E.side=ii,E.needsUpdate=!0,Sr(E,B,X),E.side=It):Sr(E,B,X)}this.compile=function(E,B,X=null){X===null&&(X=E),b=be.get(X),b.init(B),M.push(b),X.traverseVisible(function(W){W.isLight&&W.layers.test(B.layers)&&(b.pushLight(W),W.castShadow&&b.pushShadow(W))}),E!==X&&E.traverseVisible(function(W){W.isLight&&W.layers.test(B.layers)&&(b.pushLight(W),W.castShadow&&b.pushShadow(W))}),b.setupLights();const H=new Set;return E.traverse(function(W){if(!(W.isMesh||W.isPoints||W.isLine||W.isSprite))return;const Se=W.material;if(Se)if(Array.isArray(Se))for(let Ce=0;Ce<Se.length;Ce++){const ve=Se[Ce];Cn(ve,X,W),H.add(ve)}else Cn(Se,X,W),H.add(Se)}),b=M.pop(),H},this.compileAsync=function(E,B,X=null){const H=this.compile(E,B,X);return new Promise(W=>{function Se(){if(H.forEach(function(Ce){R.get(Ce).currentProgram.isReady()&&H.delete(Ce)}),H.size===0){W(E);return}setTimeout(Se,10)}Ie.get("KHR_parallel_shader_compile")!==null?Se():setTimeout(Se,10)})};let Lo=null;function mf(E){Lo&&Lo(E)}function dl(){Ti.stop()}function pl(){Ti.start()}const Ti=new ju;Ti.setAnimationLoop(mf),typeof self<"u"&&Ti.setContext(self),this.setAnimationLoop=function(E){Lo=E,pe.setAnimationLoop(E),E===null?Ti.stop():Ti.start()},pe.addEventListener("sessionstart",dl),pe.addEventListener("sessionend",pl),this.render=function(E,B){if(B!==void 0&&B.isCamera!==!0){ke("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(P===!0)return;I!==null&&I.renderStart(E,B);const X=pe.enabled===!0&&pe.isPresenting===!0,H=T!==null&&(N===null||X)&&T.begin(C,N);if(E.matrixWorldAutoUpdate===!0&&E.updateMatrixWorld(),B.parent===null&&B.matrixWorldAutoUpdate===!0&&B.updateMatrixWorld(),pe.enabled===!0&&pe.isPresenting===!0&&(T===null||T.isCompositing()===!1)&&(pe.cameraAutoUpdate===!0&&pe.updateCamera(B),B=pe.getCamera()),E.isScene===!0&&E.onBeforeRender(C,E,B,N),b=be.get(E,M.length),b.init(B),b.state.textureUnits=S.getTextureUnits(),M.push(b),$.multiplyMatrices(B.projectionMatrix,B.matrixWorldInverse),Ge.setFromProjectionMatrix($,Bn,B.reversedDepth),He=this.localClippingEnabled,ht=Re.init(this.clippingPlanes,He),w=J.get(E,A.length),w.init(),A.push(w),pe.enabled===!0&&pe.isPresenting===!0){const Ce=C.xr.getDepthSensingMesh();Ce!==null&&Io(Ce,B,-1/0,C.sortObjects)}Io(E,B,0,C.sortObjects),w.finish(),C.sortObjects===!0&&w.sort(Z,xe),ge=pe.enabled===!1||pe.isPresenting===!1||pe.hasDepthSensing()===!1,ge&&le.addToRenderList(w,E),this.info.render.frame++,ht===!0&&Re.beginShadows();const W=b.state.shadowsArray;if(de.render(W,E,B),ht===!0&&Re.endShadows(),this.info.autoReset===!0&&this.info.reset(),(H&&T.hasRenderPass())===!1){const Ce=w.opaque,ve=w.transmissive;if(b.setupLights(),B.isArrayCamera){const De=B.cameras;if(ve.length>0)for(let Oe=0,Qe=De.length;Oe<Qe;Oe++){const rt=De[Oe];gl(Ce,ve,E,rt)}ge&&le.render(E);for(let Oe=0,Qe=De.length;Oe<Qe;Oe++){const rt=De[Oe];ml(w,E,rt,rt.viewport)}}else ve.length>0&&gl(Ce,ve,E,B),ge&&le.render(E),ml(w,E,B)}N!==null&&V===0&&(S.updateMultisampleRenderTarget(N),S.updateRenderTargetMipmap(N)),H&&T.end(C),E.isScene===!0&&E.onAfterRender(C,E,B),he.resetDefaultState(),O=-1,z=null,M.pop(),M.length>0?(b=M[M.length-1],S.setTextureUnits(b.state.textureUnits),ht===!0&&Re.setGlobalState(C.clippingPlanes,b.state.camera)):b=null,A.pop(),A.length>0?w=A[A.length-1]:w=null,I!==null&&I.renderEnd()};function Io(E,B,X,H){if(E.visible===!1)return;if(E.layers.test(B.layers)){if(E.isGroup)X=E.renderOrder;else if(E.isLOD)E.autoUpdate===!0&&E.update(B);else if(E.isLightProbeGrid)b.pushLightProbeGrid(E);else if(E.isLight)b.pushLight(E),E.castShadow&&b.pushShadow(E);else if(E.isSprite){if(!E.frustumCulled||Ge.intersectsSprite(E)){H&&te.setFromMatrixPosition(E.matrixWorld).applyMatrix4($);const Ce=ae.update(E),ve=E.material;ve.visible&&w.push(E,Ce,ve,X,te.z,null)}}else if((E.isMesh||E.isLine||E.isPoints)&&(!E.frustumCulled||Ge.intersectsObject(E))){const Ce=ae.update(E),ve=E.material;if(H&&(E.boundingSphere!==void 0?(E.boundingSphere===null&&E.computeBoundingSphere(),te.copy(E.boundingSphere.center)):(Ce.boundingSphere===null&&Ce.computeBoundingSphere(),te.copy(Ce.boundingSphere.center)),te.applyMatrix4(E.matrixWorld).applyMatrix4($)),Array.isArray(ve)){const De=Ce.groups;for(let Oe=0,Qe=De.length;Oe<Qe;Oe++){const rt=De[Oe],Be=ve[rt.materialIndex];Be&&Be.visible&&w.push(E,Ce,Be,X,te.z,rt)}}else ve.visible&&w.push(E,Ce,ve,X,te.z,null)}}const Se=E.children;for(let Ce=0,ve=Se.length;Ce<ve;Ce++)Io(Se[Ce],B,X,H)}function ml(E,B,X,H){const{opaque:W,transmissive:Se,transparent:Ce}=E;b.setupLightsView(X),ht===!0&&Re.setGlobalState(C.clippingPlanes,X),H&&oe.viewport(j.copy(H)),W.length>0&&Mr(W,B,X),Se.length>0&&Mr(Se,B,X),Ce.length>0&&Mr(Ce,B,X),oe.buffers.depth.setTest(!0),oe.buffers.depth.setMask(!0),oe.buffers.color.setMask(!0),oe.setPolygonOffset(!1)}function gl(E,B,X,H){if((X.isScene===!0?X.overrideMaterial:null)!==null)return;if(b.state.transmissionRenderTarget[H.id]===void 0){const Be=Ie.has("EXT_color_buffer_half_float")||Ie.has("EXT_color_buffer_float");b.state.transmissionRenderTarget[H.id]=new nn(1,1,{generateMipmaps:!0,type:Be?sn:ln,minFilter:On,samples:Math.max(4,Xe.samples),stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:at.workingColorSpace})}const Se=b.state.transmissionRenderTarget[H.id],Ce=H.viewport||j;Se.setSize(Ce.z*C.transmissionResolutionScale,Ce.w*C.transmissionResolutionScale);const ve=C.getRenderTarget(),De=C.getActiveCubeFace(),Oe=C.getActiveMipmapLevel();C.setRenderTarget(Se),C.getClearColor(Te),Le=C.getClearAlpha(),Le<1&&C.setClearColor(16777215,.5),C.clear(),ge&&le.render(X);const Qe=C.toneMapping;C.toneMapping=kn;const rt=H.viewport;if(H.viewport!==void 0&&(H.viewport=void 0),b.setupLightsView(H),ht===!0&&Re.setGlobalState(C.clippingPlanes,H),Mr(E,X,H),S.updateMultisampleRenderTarget(Se),S.updateRenderTargetMipmap(Se),Ie.has("WEBGL_multisampled_render_to_texture")===!1){let Be=!1;for(let yt=0,Pt=B.length;yt<Pt;yt++){const Rt=B[yt],{object:Mt,geometry:Kt,material:Ae,group:on}=Rt;if(Ae.side===It&&Mt.layers.test(H.layers)){const ut=Ae.side;Ae.side=Zt,Ae.needsUpdate=!0,_l(Mt,X,H,Kt,Ae,on),Ae.side=ut,Ae.needsUpdate=!0,Be=!0}}Be===!0&&(S.updateMultisampleRenderTarget(Se),S.updateRenderTargetMipmap(Se))}C.setRenderTarget(ve,De,Oe),C.setClearColor(Te,Le),rt!==void 0&&(H.viewport=rt),C.toneMapping=Qe}function Mr(E,B,X){const H=B.isScene===!0?B.overrideMaterial:null;for(let W=0,Se=E.length;W<Se;W++){const Ce=E[W],{object:ve,geometry:De,group:Oe}=Ce;let Qe=Ce.material;Qe.allowOverride===!0&&H!==null&&(Qe=H),ve.layers.test(X.layers)&&_l(ve,B,X,De,Qe,Oe)}}function _l(E,B,X,H,W,Se){E.onBeforeRender(C,B,X,H,W,Se),E.modelViewMatrix.multiplyMatrices(X.matrixWorldInverse,E.matrixWorld),E.normalMatrix.getNormalMatrix(E.modelViewMatrix),W.onBeforeRender(C,B,X,H,E,Se),W.transparent===!0&&W.side===It&&W.forceSinglePass===!1?(W.side=Zt,W.needsUpdate=!0,C.renderBufferDirect(X,B,H,W,E,Se),W.side=ii,W.needsUpdate=!0,C.renderBufferDirect(X,B,H,W,E,Se),W.side=It):C.renderBufferDirect(X,B,H,W,E,Se),E.onAfterRender(C,B,X,H,W,Se)}function Sr(E,B,X){B.isScene!==!0&&(B=Me);const H=R.get(E),W=b.state.lights,Se=b.state.shadowsArray,Ce=W.state.version,ve=ue.getParameters(E,W.state,Se,B,X,b.state.lightProbeGridArray),De=ue.getProgramCacheKey(ve);let Oe=H.programs;H.environment=E.isMeshStandardMaterial||E.isMeshLambertMaterial||E.isMeshPhongMaterial?B.environment:null,H.fog=B.fog;const Qe=E.isMeshStandardMaterial||E.isMeshLambertMaterial&&!E.envMap||E.isMeshPhongMaterial&&!E.envMap;H.envMap=k.get(E.envMap||H.environment,Qe),H.envMapRotation=H.environment!==null&&E.envMap===null?B.environmentRotation:E.envMapRotation,Oe===void 0&&(E.addEventListener("dispose",Ct),Oe=new Map,H.programs=Oe);let rt=Oe.get(De);if(rt!==void 0){if(H.currentProgram===rt&&H.lightsStateVersion===Ce)return vl(E,ve),rt}else ve.uniforms=ue.getUniforms(E),I!==null&&E.isNodeMaterial&&I.build(E,X,ve),E.onBeforeCompile(ve,C),rt=ue.acquireProgram(ve,De),Oe.set(De,rt),H.uniforms=ve.uniforms;const Be=H.uniforms;return(!E.isShaderMaterial&&!E.isRawShaderMaterial||E.clipping===!0)&&(Be.clippingPlanes=Re.uniform),vl(E,ve),H.needsLights=vf(E),H.lightsStateVersion=Ce,H.needsLights&&(Be.ambientLightColor.value=W.state.ambient,Be.lightProbe.value=W.state.probe,Be.directionalLights.value=W.state.directional,Be.directionalLightShadows.value=W.state.directionalShadow,Be.spotLights.value=W.state.spot,Be.spotLightShadows.value=W.state.spotShadow,Be.rectAreaLights.value=W.state.rectArea,Be.ltc_1.value=W.state.rectAreaLTC1,Be.ltc_2.value=W.state.rectAreaLTC2,Be.pointLights.value=W.state.point,Be.pointLightShadows.value=W.state.pointShadow,Be.hemisphereLights.value=W.state.hemi,Be.directionalShadowMatrix.value=W.state.directionalShadowMatrix,Be.spotLightMatrix.value=W.state.spotLightMatrix,Be.spotLightMap.value=W.state.spotLightMap,Be.pointShadowMatrix.value=W.state.pointShadowMatrix),H.lightProbeGrid=b.state.lightProbeGridArray.length>0,H.currentProgram=rt,H.uniformsList=null,rt}function xl(E){if(E.uniformsList===null){const B=E.currentProgram.getUniforms();E.uniformsList=lo.seqWithValue(B.seq,E.uniforms)}return E.uniformsList}function vl(E,B){const X=R.get(E);X.outputColorSpace=B.outputColorSpace,X.batching=B.batching,X.batchingColor=B.batchingColor,X.instancing=B.instancing,X.instancingColor=B.instancingColor,X.instancingMorph=B.instancingMorph,X.skinning=B.skinning,X.morphTargets=B.morphTargets,X.morphNormals=B.morphNormals,X.morphColors=B.morphColors,X.morphTargetsCount=B.morphTargetsCount,X.numClippingPlanes=B.numClippingPlanes,X.numIntersection=B.numClipIntersection,X.vertexAlphas=B.vertexAlphas,X.vertexTangents=B.vertexTangents,X.toneMapping=B.toneMapping}function gf(E,B){if(E.length===0)return null;if(E.length===1)return E[0].texture!==null?E[0]:null;y.setFromMatrixPosition(B.matrixWorld);for(let X=0,H=E.length;X<H;X++){const W=E[X];if(W.texture!==null&&W.boundingBox.containsPoint(y))return W}return null}function _f(E,B,X,H,W){B.isScene!==!0&&(B=Me),S.resetTextureUnits();const Se=B.fog,Ce=H.isMeshStandardMaterial||H.isMeshLambertMaterial||H.isMeshPhongMaterial?B.environment:null,ve=N===null?C.outputColorSpace:N.isXRRenderTarget===!0?N.texture.colorSpace:at.workingColorSpace,De=H.isMeshStandardMaterial||H.isMeshLambertMaterial&&!H.envMap||H.isMeshPhongMaterial&&!H.envMap,Oe=k.get(H.envMap||Ce,De),Qe=H.vertexColors===!0&&!!X.attributes.color&&X.attributes.color.itemSize===4,rt=!!X.attributes.tangent&&(!!H.normalMap||H.anisotropy>0),Be=!!X.morphAttributes.position,yt=!!X.morphAttributes.normal,Pt=!!X.morphAttributes.color;let Rt=kn;H.toneMapped&&(N===null||N.isXRRenderTarget===!0)&&(Rt=C.toneMapping);const Mt=X.morphAttributes.position||X.morphAttributes.normal||X.morphAttributes.color,Kt=Mt!==void 0?Mt.length:0,Ae=R.get(H),on=b.state.lights;if(ht===!0&&(He===!0||E!==z)){const wt=E===z&&H.id===O;Re.setState(H,E,wt)}let ut=!1;H.version===Ae.__version?(Ae.needsLights&&Ae.lightsStateVersion!==on.state.version||Ae.outputColorSpace!==ve||W.isBatchedMesh&&Ae.batching===!1||!W.isBatchedMesh&&Ae.batching===!0||W.isBatchedMesh&&Ae.batchingColor===!0&&W.colorTexture===null||W.isBatchedMesh&&Ae.batchingColor===!1&&W.colorTexture!==null||W.isInstancedMesh&&Ae.instancing===!1||!W.isInstancedMesh&&Ae.instancing===!0||W.isSkinnedMesh&&Ae.skinning===!1||!W.isSkinnedMesh&&Ae.skinning===!0||W.isInstancedMesh&&Ae.instancingColor===!0&&W.instanceColor===null||W.isInstancedMesh&&Ae.instancingColor===!1&&W.instanceColor!==null||W.isInstancedMesh&&Ae.instancingMorph===!0&&W.morphTexture===null||W.isInstancedMesh&&Ae.instancingMorph===!1&&W.morphTexture!==null||Ae.envMap!==Oe||H.fog===!0&&Ae.fog!==Se||Ae.numClippingPlanes!==void 0&&(Ae.numClippingPlanes!==Re.numPlanes||Ae.numIntersection!==Re.numIntersection)||Ae.vertexAlphas!==Qe||Ae.vertexTangents!==rt||Ae.morphTargets!==Be||Ae.morphNormals!==yt||Ae.morphColors!==Pt||Ae.toneMapping!==Rt||Ae.morphTargetsCount!==Kt||!!Ae.lightProbeGrid!=b.state.lightProbeGridArray.length>0)&&(ut=!0):(ut=!0,Ae.__version=H.version);let dn=Ae.currentProgram;ut===!0&&(dn=Sr(H,B,W),I&&H.isNodeMaterial&&I.onUpdateProgram(H,dn,Ae));let Pn=!1,oi=!1,Vi=!1;const St=dn.getUniforms(),Lt=Ae.uniforms;if(oe.useProgram(dn.program)&&(Pn=!0,oi=!0,Vi=!0),H.id!==O&&(O=H.id,oi=!0),Ae.needsLights){const wt=gf(b.state.lightProbeGridArray,W);Ae.lightProbeGrid!==wt&&(Ae.lightProbeGrid=wt,oi=!0)}if(Pn||z!==E){oe.buffers.depth.getReversed()&&E.reversedDepth!==!0&&(E._reversedDepth=!0,E.updateProjectionMatrix()),St.setValue(D,"projectionMatrix",E.projectionMatrix),St.setValue(D,"viewMatrix",E.matrixWorldInverse);const ci=St.map.cameraPosition;ci!==void 0&&ci.setValue(D,re.setFromMatrixPosition(E.matrixWorld)),Xe.logarithmicDepthBuffer&&St.setValue(D,"logDepthBufFC",2/(Math.log(E.far+1)/Math.LN2)),(H.isMeshPhongMaterial||H.isMeshToonMaterial||H.isMeshLambertMaterial||H.isMeshBasicMaterial||H.isMeshStandardMaterial||H.isShaderMaterial)&&St.setValue(D,"isOrthographic",E.isOrthographicCamera===!0),z!==E&&(z=E,oi=!0,Vi=!0)}if(Ae.needsLights&&(on.state.directionalShadowMap.length>0&&St.setValue(D,"directionalShadowMap",on.state.directionalShadowMap,S),on.state.spotShadowMap.length>0&&St.setValue(D,"spotShadowMap",on.state.spotShadowMap,S),on.state.pointShadowMap.length>0&&St.setValue(D,"pointShadowMap",on.state.pointShadowMap,S)),W.isSkinnedMesh){St.setOptional(D,W,"bindMatrix"),St.setOptional(D,W,"bindMatrixInverse");const wt=W.skeleton;wt&&(wt.boneTexture===null&&wt.computeBoneTexture(),St.setValue(D,"boneTexture",wt.boneTexture,S))}W.isBatchedMesh&&(St.setOptional(D,W,"batchingTexture"),St.setValue(D,"batchingTexture",W._matricesTexture,S),St.setOptional(D,W,"batchingIdTexture"),St.setValue(D,"batchingIdTexture",W._indirectTexture,S),St.setOptional(D,W,"batchingColorTexture"),W._colorsTexture!==null&&St.setValue(D,"batchingColorTexture",W._colorsTexture,S));const ai=X.morphAttributes;if((ai.position!==void 0||ai.normal!==void 0||ai.color!==void 0)&&je.update(W,X,dn),(oi||Ae.receiveShadow!==W.receiveShadow)&&(Ae.receiveShadow=W.receiveShadow,St.setValue(D,"receiveShadow",W.receiveShadow)),(H.isMeshStandardMaterial||H.isMeshLambertMaterial||H.isMeshPhongMaterial)&&H.envMap===null&&B.environment!==null&&(Lt.envMapIntensity.value=B.environmentIntensity),Lt.dfgLUT!==void 0&&(Lt.dfgLUT.value=S2()),oi){if(St.setValue(D,"toneMappingExposure",C.toneMappingExposure),Ae.needsLights&&xf(Lt,Vi),Se&&H.fog===!0&&q.refreshFogUniforms(Lt,Se),q.refreshMaterialUniforms(Lt,H,Ye,lt,b.state.transmissionRenderTarget[E.id]),Ae.needsLights&&Ae.lightProbeGrid){const wt=Ae.lightProbeGrid;Lt.probesSH.value=wt.texture,Lt.probesMin.value.copy(wt.boundingBox.min),Lt.probesMax.value.copy(wt.boundingBox.max),Lt.probesResolution.value.copy(wt.resolution)}lo.upload(D,xl(Ae),Lt,S)}if(H.isShaderMaterial&&H.uniformsNeedUpdate===!0&&(lo.upload(D,xl(Ae),Lt,S),H.uniformsNeedUpdate=!1),H.isSpriteMaterial&&St.setValue(D,"center",W.center),St.setValue(D,"modelViewMatrix",W.modelViewMatrix),St.setValue(D,"normalMatrix",W.normalMatrix),St.setValue(D,"modelMatrix",W.matrixWorld),H.uniformsGroups!==void 0){const wt=H.uniformsGroups;for(let ci=0,Hi=wt.length;ci<Hi;ci++){const yl=wt[ci];Y.update(yl,dn),Y.bind(yl,dn)}}return dn}function xf(E,B){E.ambientLightColor.needsUpdate=B,E.lightProbe.needsUpdate=B,E.directionalLights.needsUpdate=B,E.directionalLightShadows.needsUpdate=B,E.pointLights.needsUpdate=B,E.pointLightShadows.needsUpdate=B,E.spotLights.needsUpdate=B,E.spotLightShadows.needsUpdate=B,E.rectAreaLights.needsUpdate=B,E.hemisphereLights.needsUpdate=B}function vf(E){return E.isMeshLambertMaterial||E.isMeshToonMaterial||E.isMeshPhongMaterial||E.isMeshStandardMaterial||E.isShadowMaterial||E.isShaderMaterial&&E.lights===!0}this.getActiveCubeFace=function(){return F},this.getActiveMipmapLevel=function(){return V},this.getRenderTarget=function(){return N},this.setRenderTargetTextures=function(E,B,X){const H=R.get(E);H.__autoAllocateDepthBuffer=E.resolveDepthBuffer===!1,H.__autoAllocateDepthBuffer===!1&&(H.__useRenderToTexture=!1),R.get(E.texture).__webglTexture=B,R.get(E.depthTexture).__webglTexture=H.__autoAllocateDepthBuffer?void 0:X,H.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(E,B){const X=R.get(E);X.__webglFramebuffer=B,X.__useDefaultFramebuffer=B===void 0};const yf=D.createFramebuffer();this.setRenderTarget=function(E,B=0,X=0){N=E,F=B,V=X;let H=null,W=!1,Se=!1;if(E){const ve=R.get(E);if(ve.__useDefaultFramebuffer!==void 0){oe.bindFramebuffer(D.FRAMEBUFFER,ve.__webglFramebuffer),j.copy(E.viewport),se.copy(E.scissor),me=E.scissorTest,oe.viewport(j),oe.scissor(se),oe.setScissorTest(me),O=-1;return}else if(ve.__webglFramebuffer===void 0)S.setupRenderTarget(E);else if(ve.__hasExternalTextures)S.rebindTextures(E,R.get(E.texture).__webglTexture,R.get(E.depthTexture).__webglTexture);else if(E.depthBuffer){const Qe=E.depthTexture;if(ve.__boundDepthTexture!==Qe){if(Qe!==null&&R.has(Qe)&&(E.width!==Qe.image.width||E.height!==Qe.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");S.setupDepthRenderbuffer(E)}}const De=E.texture;(De.isData3DTexture||De.isDataArrayTexture||De.isCompressedArrayTexture)&&(Se=!0);const Oe=R.get(E).__webglFramebuffer;E.isWebGLCubeRenderTarget?(Array.isArray(Oe[B])?H=Oe[B][X]:H=Oe[B],W=!0):E.samples>0&&S.useMultisampledRTT(E)===!1?H=R.get(E).__webglMultisampledFramebuffer:Array.isArray(Oe)?H=Oe[X]:H=Oe,j.copy(E.viewport),se.copy(E.scissor),me=E.scissorTest}else j.copy(ce).multiplyScalar(Ye).floor(),se.copy(Ue).multiplyScalar(Ye).floor(),me=Ve;if(X!==0&&(H=yf),oe.bindFramebuffer(D.FRAMEBUFFER,H)&&oe.drawBuffers(E,H),oe.viewport(j),oe.scissor(se),oe.setScissorTest(me),W){const ve=R.get(E.texture);D.framebufferTexture2D(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_CUBE_MAP_POSITIVE_X+B,ve.__webglTexture,X)}else if(Se){const ve=B;for(let De=0;De<E.textures.length;De++){const Oe=R.get(E.textures[De]);D.framebufferTextureLayer(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0+De,Oe.__webglTexture,X,ve)}}else if(E!==null&&X!==0){const ve=R.get(E.texture);D.framebufferTexture2D(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_2D,ve.__webglTexture,X)}O=-1},this.readRenderTargetPixels=function(E,B,X,H,W,Se,Ce,ve=0){if(!(E&&E.isWebGLRenderTarget)){ke("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let De=R.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&Ce!==void 0&&(De=De[Ce]),De){oe.bindFramebuffer(D.FRAMEBUFFER,De);try{const Oe=E.textures[ve],Qe=Oe.format,rt=Oe.type;if(E.textures.length>1&&D.readBuffer(D.COLOR_ATTACHMENT0+ve),!Xe.textureFormatReadable(Qe)){ke("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Xe.textureTypeReadable(rt)){ke("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}B>=0&&B<=E.width-H&&X>=0&&X<=E.height-W&&D.readPixels(B,X,H,W,U.convert(Qe),U.convert(rt),Se)}finally{const Oe=N!==null?R.get(N).__webglFramebuffer:null;oe.bindFramebuffer(D.FRAMEBUFFER,Oe)}}},this.readRenderTargetPixelsAsync=async function(E,B,X,H,W,Se,Ce,ve=0){if(!(E&&E.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let De=R.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&Ce!==void 0&&(De=De[Ce]),De)if(B>=0&&B<=E.width-H&&X>=0&&X<=E.height-W){oe.bindFramebuffer(D.FRAMEBUFFER,De);const Oe=E.textures[ve],Qe=Oe.format,rt=Oe.type;if(E.textures.length>1&&D.readBuffer(D.COLOR_ATTACHMENT0+ve),!Xe.textureFormatReadable(Qe))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Xe.textureTypeReadable(rt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Be=D.createBuffer();D.bindBuffer(D.PIXEL_PACK_BUFFER,Be),D.bufferData(D.PIXEL_PACK_BUFFER,Se.byteLength,D.STREAM_READ),D.readPixels(B,X,H,W,U.convert(Qe),U.convert(rt),0);const yt=N!==null?R.get(N).__webglFramebuffer:null;oe.bindFramebuffer(D.FRAMEBUFFER,yt);const Pt=D.fenceSync(D.SYNC_GPU_COMMANDS_COMPLETE,0);return D.flush(),await gd(D,Pt,4),D.bindBuffer(D.PIXEL_PACK_BUFFER,Be),D.getBufferSubData(D.PIXEL_PACK_BUFFER,0,Se),D.deleteBuffer(Be),D.deleteSync(Pt),Se}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(E,B=null,X=0){const H=Math.pow(2,-X),W=Math.floor(E.image.width*H),Se=Math.floor(E.image.height*H),Ce=B!==null?B.x:0,ve=B!==null?B.y:0;S.setTexture2D(E,0),D.copyTexSubImage2D(D.TEXTURE_2D,X,0,0,Ce,ve,W,Se),oe.unbindTexture()};const Mf=D.createFramebuffer(),Sf=D.createFramebuffer();this.copyTextureToTexture=function(E,B,X=null,H=null,W=0,Se=0){let Ce,ve,De,Oe,Qe,rt,Be,yt,Pt;const Rt=E.isCompressedTexture?E.mipmaps[Se]:E.image;if(X!==null)Ce=X.max.x-X.min.x,ve=X.max.y-X.min.y,De=X.isBox3?X.max.z-X.min.z:1,Oe=X.min.x,Qe=X.min.y,rt=X.isBox3?X.min.z:0;else{const Lt=Math.pow(2,-W);Ce=Math.floor(Rt.width*Lt),ve=Math.floor(Rt.height*Lt),E.isDataArrayTexture?De=Rt.depth:E.isData3DTexture?De=Math.floor(Rt.depth*Lt):De=1,Oe=0,Qe=0,rt=0}H!==null?(Be=H.x,yt=H.y,Pt=H.z):(Be=0,yt=0,Pt=0);const Mt=U.convert(B.format),Kt=U.convert(B.type);let Ae;B.isData3DTexture?(S.setTexture3D(B,0),Ae=D.TEXTURE_3D):B.isDataArrayTexture||B.isCompressedArrayTexture?(S.setTexture2DArray(B,0),Ae=D.TEXTURE_2D_ARRAY):(S.setTexture2D(B,0),Ae=D.TEXTURE_2D),oe.activeTexture(D.TEXTURE0),oe.pixelStorei(D.UNPACK_FLIP_Y_WEBGL,B.flipY),oe.pixelStorei(D.UNPACK_PREMULTIPLY_ALPHA_WEBGL,B.premultiplyAlpha),oe.pixelStorei(D.UNPACK_ALIGNMENT,B.unpackAlignment);const on=oe.getParameter(D.UNPACK_ROW_LENGTH),ut=oe.getParameter(D.UNPACK_IMAGE_HEIGHT),dn=oe.getParameter(D.UNPACK_SKIP_PIXELS),Pn=oe.getParameter(D.UNPACK_SKIP_ROWS),oi=oe.getParameter(D.UNPACK_SKIP_IMAGES);oe.pixelStorei(D.UNPACK_ROW_LENGTH,Rt.width),oe.pixelStorei(D.UNPACK_IMAGE_HEIGHT,Rt.height),oe.pixelStorei(D.UNPACK_SKIP_PIXELS,Oe),oe.pixelStorei(D.UNPACK_SKIP_ROWS,Qe),oe.pixelStorei(D.UNPACK_SKIP_IMAGES,rt);const Vi=E.isDataArrayTexture||E.isData3DTexture,St=B.isDataArrayTexture||B.isData3DTexture;if(E.isDepthTexture){const Lt=R.get(E),ai=R.get(B),wt=R.get(Lt.__renderTarget),ci=R.get(ai.__renderTarget);oe.bindFramebuffer(D.READ_FRAMEBUFFER,wt.__webglFramebuffer),oe.bindFramebuffer(D.DRAW_FRAMEBUFFER,ci.__webglFramebuffer);for(let Hi=0;Hi<De;Hi++)Vi&&(D.framebufferTextureLayer(D.READ_FRAMEBUFFER,D.COLOR_ATTACHMENT0,R.get(E).__webglTexture,W,rt+Hi),D.framebufferTextureLayer(D.DRAW_FRAMEBUFFER,D.COLOR_ATTACHMENT0,R.get(B).__webglTexture,Se,Pt+Hi)),D.blitFramebuffer(Oe,Qe,Ce,ve,Be,yt,Ce,ve,D.DEPTH_BUFFER_BIT,D.NEAREST);oe.bindFramebuffer(D.READ_FRAMEBUFFER,null),oe.bindFramebuffer(D.DRAW_FRAMEBUFFER,null)}else if(W!==0||E.isRenderTargetTexture||R.has(E)){const Lt=R.get(E),ai=R.get(B);oe.bindFramebuffer(D.READ_FRAMEBUFFER,Mf),oe.bindFramebuffer(D.DRAW_FRAMEBUFFER,Sf);for(let wt=0;wt<De;wt++)Vi?D.framebufferTextureLayer(D.READ_FRAMEBUFFER,D.COLOR_ATTACHMENT0,Lt.__webglTexture,W,rt+wt):D.framebufferTexture2D(D.READ_FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_2D,Lt.__webglTexture,W),St?D.framebufferTextureLayer(D.DRAW_FRAMEBUFFER,D.COLOR_ATTACHMENT0,ai.__webglTexture,Se,Pt+wt):D.framebufferTexture2D(D.DRAW_FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_2D,ai.__webglTexture,Se),W!==0?D.blitFramebuffer(Oe,Qe,Ce,ve,Be,yt,Ce,ve,D.COLOR_BUFFER_BIT,D.NEAREST):St?D.copyTexSubImage3D(Ae,Se,Be,yt,Pt+wt,Oe,Qe,Ce,ve):D.copyTexSubImage2D(Ae,Se,Be,yt,Oe,Qe,Ce,ve);oe.bindFramebuffer(D.READ_FRAMEBUFFER,null),oe.bindFramebuffer(D.DRAW_FRAMEBUFFER,null)}else St?E.isDataTexture||E.isData3DTexture?D.texSubImage3D(Ae,Se,Be,yt,Pt,Ce,ve,De,Mt,Kt,Rt.data):B.isCompressedArrayTexture?D.compressedTexSubImage3D(Ae,Se,Be,yt,Pt,Ce,ve,De,Mt,Rt.data):D.texSubImage3D(Ae,Se,Be,yt,Pt,Ce,ve,De,Mt,Kt,Rt):E.isDataTexture?D.texSubImage2D(D.TEXTURE_2D,Se,Be,yt,Ce,ve,Mt,Kt,Rt.data):E.isCompressedTexture?D.compressedTexSubImage2D(D.TEXTURE_2D,Se,Be,yt,Rt.width,Rt.height,Mt,Rt.data):D.texSubImage2D(D.TEXTURE_2D,Se,Be,yt,Ce,ve,Mt,Kt,Rt);oe.pixelStorei(D.UNPACK_ROW_LENGTH,on),oe.pixelStorei(D.UNPACK_IMAGE_HEIGHT,ut),oe.pixelStorei(D.UNPACK_SKIP_PIXELS,dn),oe.pixelStorei(D.UNPACK_SKIP_ROWS,Pn),oe.pixelStorei(D.UNPACK_SKIP_IMAGES,oi),Se===0&&B.generateMipmaps&&D.generateMipmap(Ae),oe.unbindTexture()},this.initRenderTarget=function(E){R.get(E).__webglFramebuffer===void 0&&S.setupRenderTarget(E)},this.initTexture=function(E){E.isCubeTexture?S.setTextureCube(E,0):E.isData3DTexture?S.setTexture3D(E,0):E.isDataArrayTexture||E.isCompressedArrayTexture?S.setTexture2DArray(E,0):S.setTexture2D(E,0),oe.unbindTexture()},this.resetState=function(){F=0,V=0,N=null,oe.reset(),he.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Bn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=at._getDrawingBufferColorSpace(e),t.unpackColorSpace=at._getUnpackColorSpace()}}class w2{constructor(){this._previousTime=0,this._currentTime=0,this._startTime=performance.now(),this._delta=0,this._elapsed=0,this._timescale=1,this._document=null,this._pageVisibilityHandler=null}connect(e){this._document=e,e.hidden!==void 0&&(this._pageVisibilityHandler=T2.bind(this),e.addEventListener("visibilitychange",this._pageVisibilityHandler,!1))}disconnect(){this._pageVisibilityHandler!==null&&(this._document.removeEventListener("visibilitychange",this._pageVisibilityHandler),this._pageVisibilityHandler=null),this._document=null}getDelta(){return this._delta/1e3}getElapsed(){return this._elapsed/1e3}getTimescale(){return this._timescale}setTimescale(e){return this._timescale=e,this}reset(){return this._currentTime=performance.now()-this._startTime,this}dispose(){this.disconnect()}update(e){return this._pageVisibilityHandler!==null&&this._document.hidden===!0?this._delta=0:(this._previousTime=this._currentTime,this._currentTime=(e!==void 0?e:performance.now())-this._startTime,this._delta=(this._currentTime-this._previousTime)*this._timescale,this._elapsed+=this._delta),this}}function T2(){this._document.hidden===!1&&this.reset()}const ho={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform float opacity;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = opacity * texel;


		}`};class Is{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}}const E2=new vr(-1,1,1,-1,0,1);class A2 extends Tt{constructor(){super(),this.setAttribute("position",new et([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new et([0,2,0,0,2,0],2))}}const R2=new A2;class al{constructor(e){this._mesh=new G(R2,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,E2)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}}class C2 extends Is{constructor(e,t="tDiffuse"){super(),this.textureID=t,this.uniforms=null,this.material=null,e instanceof Xt?(this.uniforms=e.uniforms,this.material=e):e&&(this.uniforms=Ss.clone(e.uniforms),this.material=new Xt({name:e.name!==void 0?e.name:"unspecified",defines:Object.assign({},e.defines),uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader})),this._fsQuad=new al(this.material)}render(e,t,n){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=n.texture),this._fsQuad.material=this.material,this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}}class Yh extends Is{constructor(e,t){super(),this.scene=e,this.camera=t,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(e,t,n){const i=e.getContext(),s=e.state;s.buffers.color.setMask(!1),s.buffers.depth.setMask(!1),s.buffers.color.setLocked(!0),s.buffers.depth.setLocked(!0);let o,c;this.inverse?(o=0,c=1):(o=1,c=0),s.buffers.stencil.setTest(!0),s.buffers.stencil.setOp(i.REPLACE,i.REPLACE,i.REPLACE),s.buffers.stencil.setFunc(i.ALWAYS,o,4294967295),s.buffers.stencil.setClear(c),s.buffers.stencil.setLocked(!0),e.setRenderTarget(n),this.clear&&e.clear(),e.render(this.scene,this.camera),e.setRenderTarget(t),this.clear&&e.clear(),e.render(this.scene,this.camera),s.buffers.color.setLocked(!1),s.buffers.depth.setLocked(!1),s.buffers.color.setMask(!0),s.buffers.depth.setMask(!0),s.buffers.stencil.setLocked(!1),s.buffers.stencil.setFunc(i.EQUAL,1,4294967295),s.buffers.stencil.setOp(i.KEEP,i.KEEP,i.KEEP),s.buffers.stencil.setLocked(!0)}}class P2 extends Is{constructor(){super(),this.needsSwap=!1}render(e){e.state.buffers.stencil.setLocked(!1),e.state.buffers.stencil.setTest(!1)}}class L2{constructor(e,t){if(this.renderer=e,this._pixelRatio=e.getPixelRatio(),t===void 0){const n=e.getSize(new ee);this._width=n.width,this._height=n.height,t=new nn(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:sn}),t.texture.name="EffectComposer.rt1"}else this._width=t.width,this._height=t.height;this.renderTarget1=t,this.renderTarget2=t.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new C2(ho),this.copyPass.material.blending=zn,this.timer=new fm}swapBuffers(){const e=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=e}addPass(e){this.passes.push(e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(e,t){this.passes.splice(t,0,e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(e){const t=this.passes.indexOf(e);t!==-1&&this.passes.splice(t,1)}isLastEnabledPass(e){for(let t=e+1;t<this.passes.length;t++)if(this.passes[t].enabled)return!1;return!0}render(e){this.timer.update(),e===void 0&&(e=this.timer.getDelta());const t=this.renderer.getRenderTarget();let n=!1;for(let i=0,s=this.passes.length;i<s;i++){const o=this.passes[i];if(o.enabled!==!1){if(o.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(i),o.render(this.renderer,this.writeBuffer,this.readBuffer,e,n),o.needsSwap){if(n){const c=this.renderer.getContext(),l=this.renderer.state.buffers.stencil;l.setFunc(c.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,e),l.setFunc(c.EQUAL,1,4294967295)}this.swapBuffers()}Yh!==void 0&&(o instanceof Yh?n=!0:o instanceof P2&&(n=!1))}}this.renderer.setRenderTarget(t)}reset(e){if(e===void 0){const t=this.renderer.getSize(new ee);this._pixelRatio=this.renderer.getPixelRatio(),this._width=t.width,this._height=t.height,e=this.renderTarget1.clone(),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=e,this.renderTarget2=e.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(e,t){this._width=e,this._height=t;const n=this._width*this._pixelRatio,i=this._height*this._pixelRatio;this.renderTarget1.setSize(n,i),this.renderTarget2.setSize(n,i);for(let s=0;s<this.passes.length;s++)this.passes[s].setSize(n,i)}setPixelRatio(e){this._pixelRatio=e,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}}class I2 extends Is{constructor(e,t,n=null,i=null,s=null){super(),this.scene=e,this.camera=t,this.overrideMaterial=n,this.clearColor=i,this.clearAlpha=s,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this.isRenderPass=!0,this._oldClearColor=new ye}render(e,t,n){const i=e.autoClear;e.autoClear=!1;let s,o;this.overrideMaterial!==null&&(o=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(e.getClearColor(this._oldClearColor),e.setClearColor(this.clearColor,e.getClearAlpha())),this.clearAlpha!==null&&(s=e.getClearAlpha(),e.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&e.clearDepth(),e.setRenderTarget(this.renderToScreen?null:n),this.clear===!0&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),e.render(this.scene,this.camera),this.clearColor!==null&&e.setClearColor(this._oldClearColor),this.clearAlpha!==null&&e.setClearAlpha(s),this.overrideMaterial!==null&&(this.scene.overrideMaterial=o),e.autoClear=i}}const D2={uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new ye(0)},defaultOpacity:{value:0}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform sampler2D tDiffuse;
		uniform vec3 defaultColor;
		uniform float defaultOpacity;
		uniform float luminosityThreshold;
		uniform float smoothWidth;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );

			float v = luminance( texel.xyz );

			vec4 outputColor = vec4( defaultColor.rgb, defaultOpacity );

			float alpha = smoothstep( luminosityThreshold, luminosityThreshold + smoothWidth, v );

			gl_FragColor = mix( outputColor, texel, alpha );

		}`};class Es extends Is{constructor(e,t=1,n,i){super(),this.strength=t,this.radius=n,this.threshold=i,this.resolution=e!==void 0?new ee(e.x,e.y):new ee(256,256),this.clearColor=new ye(0,0,0),this.needsSwap=!1,this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let s=Math.round(this.resolution.x/2),o=Math.round(this.resolution.y/2);this.renderTargetBright=new nn(s,o,{type:sn}),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let h=0;h<this.nMips;h++){const u=new nn(s,o,{type:sn});u.texture.name="UnrealBloomPass.h"+h,u.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(u);const f=new nn(s,o,{type:sn});f.texture.name="UnrealBloomPass.v"+h,f.texture.generateMipmaps=!1,this.renderTargetsVertical.push(f),s=Math.round(s/2),o=Math.round(o/2)}const c=D2;this.highPassUniforms=Ss.clone(c.uniforms),this.highPassUniforms.luminosityThreshold.value=i,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new Xt({uniforms:this.highPassUniforms,vertexShader:c.vertexShader,fragmentShader:c.fragmentShader}),this.separableBlurMaterials=[];const l=[6,10,14,18,22];s=Math.round(this.resolution.x/2),o=Math.round(this.resolution.y/2);for(let h=0;h<this.nMips;h++)this.separableBlurMaterials.push(this._getSeparableBlurMaterial(l[h])),this.separableBlurMaterials[h].uniforms.invSize.value=new ee(1/s,1/o),s=Math.round(s/2),o=Math.round(o/2);this.compositeMaterial=this._getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=t,this.compositeMaterial.uniforms.bloomRadius.value=.1;const a=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=a,this.bloomTintColors=[new L(1,1,1),new L(1,1,1),new L(1,1,1),new L(1,1,1),new L(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,this.copyUniforms=Ss.clone(ho.uniforms),this.blendMaterial=new Xt({uniforms:this.copyUniforms,vertexShader:ho.vertexShader,fragmentShader:ho.fragmentShader,premultipliedAlpha:!0,blending:rr,depthTest:!1,depthWrite:!1,transparent:!0}),this._oldClearColor=new ye,this._oldClearAlpha=1,this._basic=new kt,this._fsQuad=new al(null)}dispose(){for(let e=0;e<this.renderTargetsHorizontal.length;e++)this.renderTargetsHorizontal[e].dispose();for(let e=0;e<this.renderTargetsVertical.length;e++)this.renderTargetsVertical[e].dispose();this.renderTargetBright.dispose();for(let e=0;e<this.separableBlurMaterials.length;e++)this.separableBlurMaterials[e].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this._basic.dispose(),this._fsQuad.dispose()}setSize(e,t){let n=Math.round(e/2),i=Math.round(t/2);this.renderTargetBright.setSize(n,i);for(let s=0;s<this.nMips;s++)this.renderTargetsHorizontal[s].setSize(n,i),this.renderTargetsVertical[s].setSize(n,i),this.separableBlurMaterials[s].uniforms.invSize.value=new ee(1/n,1/i),n=Math.round(n/2),i=Math.round(i/2)}render(e,t,n,i,s){e.getClearColor(this._oldClearColor),this._oldClearAlpha=e.getClearAlpha();const o=e.autoClear;e.autoClear=!1,e.setClearColor(this.clearColor,0),s&&e.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this._fsQuad.material=this._basic,this._basic.map=n.texture,e.setRenderTarget(null),e.clear(),this._fsQuad.render(e)),this.highPassUniforms.tDiffuse.value=n.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this._fsQuad.material=this.materialHighPassFilter,e.setRenderTarget(this.renderTargetBright),e.clear(),this._fsQuad.render(e);let c=this.renderTargetBright;for(let l=0;l<this.nMips;l++)this._fsQuad.material=this.separableBlurMaterials[l],this.separableBlurMaterials[l].uniforms.colorTexture.value=c.texture,this.separableBlurMaterials[l].uniforms.direction.value=Es.BlurDirectionX,e.setRenderTarget(this.renderTargetsHorizontal[l]),e.clear(),this._fsQuad.render(e),this.separableBlurMaterials[l].uniforms.colorTexture.value=this.renderTargetsHorizontal[l].texture,this.separableBlurMaterials[l].uniforms.direction.value=Es.BlurDirectionY,e.setRenderTarget(this.renderTargetsVertical[l]),e.clear(),this._fsQuad.render(e),c=this.renderTargetsVertical[l];this._fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,e.setRenderTarget(this.renderTargetsHorizontal[0]),e.clear(),this._fsQuad.render(e),this._fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,s&&e.state.buffers.stencil.setTest(!0),this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(n),this._fsQuad.render(e)),e.setClearColor(this._oldClearColor,this._oldClearAlpha),e.autoClear=o}_getSeparableBlurMaterial(e){const t=[],n=e/3;for(let i=0;i<e;i++)t.push(.39894*Math.exp(-.5*i*i/(n*n))/n);return new Xt({defines:{KERNEL_RADIUS:e},uniforms:{colorTexture:{value:null},invSize:{value:new ee(.5,.5)},direction:{value:new ee(.5,.5)},gaussianCoefficients:{value:t}},vertexShader:`

				varying vec2 vUv;

				void main() {

					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

				}`,fragmentShader:`

				#include <common>

				varying vec2 vUv;

				uniform sampler2D colorTexture;
				uniform vec2 invSize;
				uniform vec2 direction;
				uniform float gaussianCoefficients[KERNEL_RADIUS];

				void main() {

					float weightSum = gaussianCoefficients[0];
					vec3 diffuseSum = texture2D( colorTexture, vUv ).rgb * weightSum;

					for ( int i = 1; i < KERNEL_RADIUS; i ++ ) {

						float x = float( i );
						float w = gaussianCoefficients[i];
						vec2 uvOffset = direction * invSize * x;
						vec3 sample1 = texture2D( colorTexture, vUv + uvOffset ).rgb;
						vec3 sample2 = texture2D( colorTexture, vUv - uvOffset ).rgb;
						diffuseSum += ( sample1 + sample2 ) * w;

					}

					gl_FragColor = vec4( diffuseSum, 1.0 );

				}`})}_getCompositeMaterial(e){return new Xt({defines:{NUM_MIPS:e},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`

				varying vec2 vUv;

				void main() {

					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

				}`,fragmentShader:`

				varying vec2 vUv;

				uniform sampler2D blurTexture1;
				uniform sampler2D blurTexture2;
				uniform sampler2D blurTexture3;
				uniform sampler2D blurTexture4;
				uniform sampler2D blurTexture5;
				uniform float bloomStrength;
				uniform float bloomRadius;
				uniform float bloomFactors[NUM_MIPS];
				uniform vec3 bloomTintColors[NUM_MIPS];

				float lerpBloomFactor( const in float factor ) {

					float mirrorFactor = 1.2 - factor;
					return mix( factor, mirrorFactor, bloomRadius );

				}

				void main() {

					// 3.0 for backwards compatibility with previous alpha-based intensity
					vec3 bloom = 3.0 * bloomStrength * (
						lerpBloomFactor( bloomFactors[ 0 ] ) * bloomTintColors[ 0 ] * texture2D( blurTexture1, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 1 ] ) * bloomTintColors[ 1 ] * texture2D( blurTexture2, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 2 ] ) * bloomTintColors[ 2 ] * texture2D( blurTexture3, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 3 ] ) * bloomTintColors[ 3 ] * texture2D( blurTexture4, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 4 ] ) * bloomTintColors[ 4 ] * texture2D( blurTexture5, vUv ).rgb
					);

					float bloomAlpha = max( bloom.r, max( bloom.g, bloom.b ) );
					gl_FragColor = vec4( bloom, bloomAlpha );

				}`})}}Es.BlurDirectionX=new ee(1,0);Es.BlurDirectionY=new ee(0,1);const no={name:"OutputShader",uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
		precision highp float;

		uniform mat4 modelViewMatrix;
		uniform mat4 projectionMatrix;

		attribute vec3 position;
		attribute vec2 uv;

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		precision highp float;

		uniform sampler2D tDiffuse;

		#include <tonemapping_pars_fragment>
		#include <colorspace_pars_fragment>

		varying vec2 vUv;

		void main() {

			gl_FragColor = texture2D( tDiffuse, vUv );

			// tone mapping

			#ifdef LINEAR_TONE_MAPPING

				gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );

			#elif defined( REINHARD_TONE_MAPPING )

				gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );

			#elif defined( CINEON_TONE_MAPPING )

				gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );

			#elif defined( ACES_FILMIC_TONE_MAPPING )

				gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );

			#elif defined( AGX_TONE_MAPPING )

				gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );

			#elif defined( NEUTRAL_TONE_MAPPING )

				gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );

			#elif defined( CUSTOM_TONE_MAPPING )

				gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );

			#endif

			// color space

			#ifdef SRGB_TRANSFER

				gl_FragColor = sRGBTransferOETF( gl_FragColor );

			#endif

		}`};class N2 extends Is{constructor(){super(),this.isOutputPass=!0,this.uniforms=Ss.clone(no.uniforms),this.material=new Hu({name:no.name,uniforms:this.uniforms,vertexShader:no.vertexShader,fragmentShader:no.fragmentShader}),this._fsQuad=new al(this.material),this._outputColorSpace=null,this._toneMapping=null}render(e,t,n){this.uniforms.tDiffuse.value=n.texture,this.uniforms.toneMappingExposure.value=e.toneMappingExposure,(this._outputColorSpace!==e.outputColorSpace||this._toneMapping!==e.toneMapping)&&(this._outputColorSpace=e.outputColorSpace,this._toneMapping=e.toneMapping,this.material.defines={},at.getTransfer(this._outputColorSpace)===pt&&(this.material.defines.SRGB_TRANSFER=""),this._toneMapping===Pc?this.material.defines.LINEAR_TONE_MAPPING="":this._toneMapping===Lc?this.material.defines.REINHARD_TONE_MAPPING="":this._toneMapping===Ic?this.material.defines.CINEON_TONE_MAPPING="":this._toneMapping===wo?this.material.defines.ACES_FILMIC_TONE_MAPPING="":this._toneMapping===Nc?this.material.defines.AGX_TONE_MAPPING="":this._toneMapping===Uc?this.material.defines.NEUTRAL_TONE_MAPPING="":this._toneMapping===Dc&&(this.material.defines.CUSTOM_TONE_MAPPING=""),this.material.needsUpdate=!0),this.renderToScreen===!0?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}}class Co extends G{constructor(e,t={}){super(e),this.isReflector=!0,this.type="Reflector",this.forceUpdate=!1,this._reflectionCameras=new WeakMap;const n=this,i=t.color!==void 0?new ye(t.color):new ye(8355711),s=t.textureWidth||512,o=t.textureHeight||512,c=t.clipBias||0,l=t.shader||Co.ReflectorShader,a=t.multisample!==void 0?t.multisample:4,h=new _i,u=new L,f=new L,_=new L,d=new qe,m=new L(0,0,-1),p=new xt,g=new L,x=new L,v=new xt,y=new qe,w=new nn(s,o,{samples:a,type:sn}),b=new Xt({name:l.name!==void 0?l.name:"unspecified",uniforms:Ss.clone(l.uniforms),fragmentShader:l.fragmentShader,vertexShader:l.vertexShader});b.uniforms.tDiffuse.value=w.texture,b.uniforms.color.value=i,b.uniforms.textureMatrix.value=y,this.material=b,this.onBeforeRender=function(A,M,T){const C=this._getReflectionCamera(T);if(f.setFromMatrixPosition(n.matrixWorld),_.setFromMatrixPosition(T.matrixWorld),d.extractRotation(n.matrixWorld),u.set(0,0,1),u.applyMatrix4(d),g.subVectors(f,_),g.dot(u)>0===!0&&this.forceUpdate===!1)return;g.reflect(u).negate(),g.add(f),d.extractRotation(T.matrixWorld),m.set(0,0,-1),m.applyMatrix4(d),m.add(_),x.subVectors(f,m),x.reflect(u).negate(),x.add(f),C.position.copy(g),C.up.set(0,1,0),C.up.applyMatrix4(d),C.up.reflect(u),C.lookAt(x),C.far=T.far,C.updateMatrixWorld(),C.projectionMatrix.copy(T.projectionMatrix),y.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),y.multiply(C.projectionMatrix),y.multiply(C.matrixWorldInverse),y.multiply(n.matrixWorld),h.setFromNormalAndCoplanarPoint(u,f),h.applyMatrix4(C.matrixWorldInverse),p.set(h.normal.x,h.normal.y,h.normal.z,h.constant);const I=C.projectionMatrix;C.isOrthographicCamera?(v.x=(Math.sign(p.x)+I.elements[8])/I.elements[0],v.y=(Math.sign(p.y)+I.elements[9])/I.elements[5],v.z=-T.far,v.w=1):(v.x=(Math.sign(p.x)+I.elements[8])/I.elements[0],v.y=(Math.sign(p.y)+I.elements[9])/I.elements[5],v.z=-1,v.w=(1+I.elements[10])/I.elements[14]),p.multiplyScalar(2/p.dot(v)),I.elements[2]=p.x,I.elements[6]=p.y,C.isOrthographicCamera?(I.elements[10]=p.z-c,I.elements[14]=p.w-1):(I.elements[10]=p.z+1-c,I.elements[14]=p.w),n.visible=!1;const F=A.getRenderTarget(),V=A.xr.enabled,N=A.shadowMap.autoUpdate;A.xr.enabled=!1,A.shadowMap.autoUpdate=!1,A.setRenderTarget(w),A.state.buffers.depth.setMask(!0),A.autoClear===!1&&A.clear(),A.render(M,C),A.xr.enabled=V,A.shadowMap.autoUpdate=N,A.setRenderTarget(F);const O=T.viewport;O!==void 0&&A.state.viewport(O),n.visible=!0,this.forceUpdate=!1},this.getRenderTarget=function(){return w},this.dispose=function(){w.dispose(),n.material.dispose()},this._getReflectionCamera=function(A){let M=this._reflectionCameras.get(A);return M===void 0&&(M=A.clone(),this._reflectionCameras.set(A,M)),M}}}Co.ReflectorShader={name:"ReflectorShader",uniforms:{color:{value:null},tDiffuse:{value:null},textureMatrix:{value:null}},vertexShader:`
		uniform mat4 textureMatrix;
		varying vec4 vUv;

		#include <common>
		#include <logdepthbuf_pars_vertex>

		void main() {

			vUv = textureMatrix * vec4( position, 1.0 );

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

			#include <logdepthbuf_vertex>

		}`,fragmentShader:`
		uniform vec3 color;
		uniform sampler2D tDiffuse;
		varying vec4 vUv;

		#include <logdepthbuf_pars_fragment>

		float blendOverlay( float base, float blend ) {

			return( base < 0.5 ? ( 2.0 * base * blend ) : ( 1.0 - 2.0 * ( 1.0 - base ) * ( 1.0 - blend ) ) );

		}

		vec3 blendOverlay( vec3 base, vec3 blend ) {

			return vec3( blendOverlay( base.r, blend.r ), blendOverlay( base.g, blend.g ), blendOverlay( base.b, blend.b ) );

		}

		void main() {

			#include <logdepthbuf_fragment>

			vec4 base = texture2DProj( tDiffuse, vUv );
			gl_FragColor = vec4( blendOverlay( base.rgb, color ), 1.0 );

			#include <tonemapping_fragment>
			#include <colorspace_fragment>

		}`};function Kh(r,e){if(e===sd)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),r;if(e===fc||e===vu){let t=r.getIndex();if(t===null){const o=[],c=r.getAttribute("position");if(c!==void 0){for(let l=0;l<c.count;l++)o.push(l);r.setIndex(o),t=r.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),r}const n=t.count-2,i=[];if(e===fc)for(let o=1;o<=n;o++)i.push(t.getX(0)),i.push(t.getX(o)),i.push(t.getX(o+1));else for(let o=0;o<n;o++)o%2===0?(i.push(t.getX(o)),i.push(t.getX(o+1)),i.push(t.getX(o+2))):(i.push(t.getX(o+2)),i.push(t.getX(o+1)),i.push(t.getX(o)));i.length/3!==n&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");const s=r.clone();return s.setIndex(i),s.clearGroups(),s}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",e),r}function U2(r){const e=new Map,t=new Map,n=r.clone();return sf(r,n,function(i,s){e.set(s,i),t.set(i,s)}),n.traverse(function(i){if(!i.isSkinnedMesh)return;const s=i,o=e.get(i),c=o.skeleton.bones;s.skeleton=o.skeleton.clone(),s.bindMatrix.copy(o.bindMatrix),s.skeleton.bones=c.map(function(l){return t.get(l)}),s.bind(s.skeleton,s.bindMatrix)}),n}function sf(r,e,t){t(r,e);for(let n=0;n<r.children.length;n++)sf(r.children[n],e.children[n],t)}class F2 extends Ps{constructor(e){super(e),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(t){return new G2(t)}),this.register(function(t){return new V2(t)}),this.register(function(t){return new Z2(t)}),this.register(function(t){return new $2(t)}),this.register(function(t){return new Q2(t)}),this.register(function(t){return new W2(t)}),this.register(function(t){return new X2(t)}),this.register(function(t){return new q2(t)}),this.register(function(t){return new Y2(t)}),this.register(function(t){return new k2(t)}),this.register(function(t){return new K2(t)}),this.register(function(t){return new H2(t)}),this.register(function(t){return new J2(t)}),this.register(function(t){return new j2(t)}),this.register(function(t){return new B2(t)}),this.register(function(t){return new jh(t,ct.EXT_MESHOPT_COMPRESSION)}),this.register(function(t){return new jh(t,ct.KHR_MESHOPT_COMPRESSION)}),this.register(function(t){return new ev(t)})}load(e,t,n,i){const s=this;let o;if(this.resourcePath!=="")o=this.resourcePath;else if(this.path!==""){const a=sr.extractUrlBase(e);o=sr.resolveURL(a,this.path)}else o=sr.extractUrlBase(e);this.manager.itemStart(e);const c=function(a){i?i(a):console.error(a),s.manager.itemError(e),s.manager.itemEnd(e)},l=new Yu(this.manager);l.setPath(this.path),l.setResponseType("arraybuffer"),l.setRequestHeader(this.requestHeader),l.setWithCredentials(this.withCredentials),l.load(e,function(a){try{s.parse(a,o,function(h){t(h),s.manager.itemEnd(e)},c)}catch(h){c(h)}},n,c)}setDRACOLoader(e){return this.dracoLoader=e,this}setKTX2Loader(e){return this.ktx2Loader=e,this}setMeshoptDecoder(e){return this.meshoptDecoder=e,this}register(e){return this.pluginCallbacks.indexOf(e)===-1&&this.pluginCallbacks.push(e),this}unregister(e){return this.pluginCallbacks.indexOf(e)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}parse(e,t,n,i){let s;const o={},c={},l=new TextDecoder;if(typeof e=="string")s=JSON.parse(e);else if(e instanceof ArrayBuffer)if(l.decode(new Uint8Array(e,0,4))===rf){try{o[ct.KHR_BINARY_GLTF]=new tv(e)}catch(u){i&&i(u);return}s=JSON.parse(o[ct.KHR_BINARY_GLTF].content)}else s=JSON.parse(l.decode(e));else s=e;if(s.asset===void 0||s.asset.version[0]<2){i&&i(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}const a=new pv(s,{path:t||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});a.fileLoader.setRequestHeader(this.requestHeader);for(let h=0;h<this.pluginCallbacks.length;h++){const u=this.pluginCallbacks[h](a);u.name||console.error("THREE.GLTFLoader: Invalid plugin found: missing name"),c[u.name]=u,o[u.name]=!0}if(s.extensionsUsed)for(let h=0;h<s.extensionsUsed.length;++h){const u=s.extensionsUsed[h],f=s.extensionsRequired||[];switch(u){case ct.KHR_MATERIALS_UNLIT:o[u]=new z2;break;case ct.KHR_DRACO_MESH_COMPRESSION:o[u]=new nv(s,this.dracoLoader);break;case ct.KHR_TEXTURE_TRANSFORM:o[u]=new iv;break;case ct.KHR_MESH_QUANTIZATION:o[u]=new sv;break;default:f.indexOf(u)>=0&&c[u]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+u+'".')}}a.setExtensions(o),a.setPlugins(c),a.parse(n,i)}parseAsync(e,t){const n=this;return new Promise(function(i,s){n.parse(e,t,i,s)})}}function O2(){let r={};return{get:function(e){return r[e]},add:function(e,t){r[e]=t},remove:function(e){delete r[e]},removeAll:function(){r={}}}}function Nt(r,e,t){const n=r.json.materials[e];return n.extensions&&n.extensions[t]?n.extensions[t]:null}const ct={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_DISPERSION:"KHR_materials_dispersion",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_MATERIALS_BUMP:"EXT_materials_bump",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",KHR_MESHOPT_COMPRESSION:"KHR_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"};class B2{constructor(e){this.parser=e,this.name=ct.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){const e=this.parser,t=this.parser.json.nodes||[];for(let n=0,i=t.length;n<i;n++){const s=t[n];s.extensions&&s.extensions[this.name]&&s.extensions[this.name].light!==void 0&&e._addNodeRef(this.cache,s.extensions[this.name].light)}}_loadLight(e){const t=this.parser,n="light:"+e;let i=t.cache.get(n);if(i)return i;const s=t.json,l=((s.extensions&&s.extensions[this.name]||{}).lights||[])[e];let a;const h=new ye(16777215);l.color!==void 0&&h.setRGB(l.color[0],l.color[1],l.color[2],hn);const u=l.range!==void 0?l.range:0;switch(l.type){case"directional":a=new Mc(h),a.target.position.set(0,0,-1),a.add(a.target);break;case"point":a=new En(h),a.distance=u;break;case"spot":a=new sl(h),a.distance=u,l.spot=l.spot||{},l.spot.innerConeAngle=l.spot.innerConeAngle!==void 0?l.spot.innerConeAngle:0,l.spot.outerConeAngle=l.spot.outerConeAngle!==void 0?l.spot.outerConeAngle:Math.PI/4,a.angle=l.spot.outerConeAngle,a.penumbra=1-l.spot.innerConeAngle/l.spot.outerConeAngle,a.target.position.set(0,0,-1),a.add(a.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+l.type)}return a.position.set(0,0,0),Dn(a,l),l.intensity!==void 0&&(a.intensity=l.intensity),a.name=t.createUniqueName(l.name||"light_"+e),i=Promise.resolve(a),t.cache.add(n,i),i}getDependency(e,t){if(e==="light")return this._loadLight(t)}createNodeAttachment(e){const t=this,n=this.parser,s=n.json.nodes[e],c=(s.extensions&&s.extensions[this.name]||{}).light;return c===void 0?null:this._loadLight(c).then(function(l){return n._getNodeRef(t.cache,c,l)})}}class z2{constructor(){this.name=ct.KHR_MATERIALS_UNLIT}getMaterialType(){return kt}extendParams(e,t,n){const i=[];e.color=new ye(1,1,1),e.opacity=1;const s=t.pbrMetallicRoughness;if(s){if(Array.isArray(s.baseColorFactor)){const o=s.baseColorFactor;e.color.setRGB(o[0],o[1],o[2],hn),e.opacity=o[3]}s.baseColorTexture!==void 0&&i.push(n.assignTexture(e,"map",s.baseColorTexture,Et))}return Promise.all(i)}}class k2{constructor(e){this.parser=e,this.name=ct.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(e,t){const n=Nt(this.parser,e,this.name);return n===null||n.emissiveStrength!==void 0&&(t.emissiveIntensity=n.emissiveStrength),Promise.resolve()}}class G2{constructor(e){this.parser=e,this.name=ct.KHR_MATERIALS_CLEARCOAT}getMaterialType(e){return Nt(this.parser,e,this.name)!==null?fn:null}extendMaterialParams(e,t){const n=Nt(this.parser,e,this.name);if(n===null)return Promise.resolve();const i=[];if(n.clearcoatFactor!==void 0&&(t.clearcoat=n.clearcoatFactor),n.clearcoatTexture!==void 0&&i.push(this.parser.assignTexture(t,"clearcoatMap",n.clearcoatTexture)),n.clearcoatRoughnessFactor!==void 0&&(t.clearcoatRoughness=n.clearcoatRoughnessFactor),n.clearcoatRoughnessTexture!==void 0&&i.push(this.parser.assignTexture(t,"clearcoatRoughnessMap",n.clearcoatRoughnessTexture)),n.clearcoatNormalTexture!==void 0&&(i.push(this.parser.assignTexture(t,"clearcoatNormalMap",n.clearcoatNormalTexture)),n.clearcoatNormalTexture.scale!==void 0)){const s=n.clearcoatNormalTexture.scale;t.clearcoatNormalScale=new ee(s,s)}return Promise.all(i)}}class V2{constructor(e){this.parser=e,this.name=ct.KHR_MATERIALS_DISPERSION}getMaterialType(e){return Nt(this.parser,e,this.name)!==null?fn:null}extendMaterialParams(e,t){const n=Nt(this.parser,e,this.name);return n===null||(t.dispersion=n.dispersion!==void 0?n.dispersion:0),Promise.resolve()}}class H2{constructor(e){this.parser=e,this.name=ct.KHR_MATERIALS_IRIDESCENCE}getMaterialType(e){return Nt(this.parser,e,this.name)!==null?fn:null}extendMaterialParams(e,t){const n=Nt(this.parser,e,this.name);if(n===null)return Promise.resolve();const i=[];return n.iridescenceFactor!==void 0&&(t.iridescence=n.iridescenceFactor),n.iridescenceTexture!==void 0&&i.push(this.parser.assignTexture(t,"iridescenceMap",n.iridescenceTexture)),n.iridescenceIor!==void 0&&(t.iridescenceIOR=n.iridescenceIor),t.iridescenceThicknessRange===void 0&&(t.iridescenceThicknessRange=[100,400]),n.iridescenceThicknessMinimum!==void 0&&(t.iridescenceThicknessRange[0]=n.iridescenceThicknessMinimum),n.iridescenceThicknessMaximum!==void 0&&(t.iridescenceThicknessRange[1]=n.iridescenceThicknessMaximum),n.iridescenceThicknessTexture!==void 0&&i.push(this.parser.assignTexture(t,"iridescenceThicknessMap",n.iridescenceThicknessTexture)),Promise.all(i)}}class W2{constructor(e){this.parser=e,this.name=ct.KHR_MATERIALS_SHEEN}getMaterialType(e){return Nt(this.parser,e,this.name)!==null?fn:null}extendMaterialParams(e,t){const n=Nt(this.parser,e,this.name);if(n===null)return Promise.resolve();const i=[];if(t.sheenColor=new ye(0,0,0),t.sheenRoughness=0,t.sheen=1,n.sheenColorFactor!==void 0){const s=n.sheenColorFactor;t.sheenColor.setRGB(s[0],s[1],s[2],hn)}return n.sheenRoughnessFactor!==void 0&&(t.sheenRoughness=n.sheenRoughnessFactor),n.sheenColorTexture!==void 0&&i.push(this.parser.assignTexture(t,"sheenColorMap",n.sheenColorTexture,Et)),n.sheenRoughnessTexture!==void 0&&i.push(this.parser.assignTexture(t,"sheenRoughnessMap",n.sheenRoughnessTexture)),Promise.all(i)}}class X2{constructor(e){this.parser=e,this.name=ct.KHR_MATERIALS_TRANSMISSION}getMaterialType(e){return Nt(this.parser,e,this.name)!==null?fn:null}extendMaterialParams(e,t){const n=Nt(this.parser,e,this.name);if(n===null)return Promise.resolve();const i=[];return n.transmissionFactor!==void 0&&(t.transmission=n.transmissionFactor),n.transmissionTexture!==void 0&&i.push(this.parser.assignTexture(t,"transmissionMap",n.transmissionTexture)),Promise.all(i)}}class q2{constructor(e){this.parser=e,this.name=ct.KHR_MATERIALS_VOLUME}getMaterialType(e){return Nt(this.parser,e,this.name)!==null?fn:null}extendMaterialParams(e,t){const n=Nt(this.parser,e,this.name);if(n===null)return Promise.resolve();const i=[];t.thickness=n.thicknessFactor!==void 0?n.thicknessFactor:0,n.thicknessTexture!==void 0&&i.push(this.parser.assignTexture(t,"thicknessMap",n.thicknessTexture)),t.attenuationDistance=n.attenuationDistance||1/0;const s=n.attenuationColor||[1,1,1];return t.attenuationColor=new ye().setRGB(s[0],s[1],s[2],hn),Promise.all(i)}}class Y2{constructor(e){this.parser=e,this.name=ct.KHR_MATERIALS_IOR}getMaterialType(e){return Nt(this.parser,e,this.name)!==null?fn:null}extendMaterialParams(e,t){const n=Nt(this.parser,e,this.name);return n===null||(t.ior=n.ior!==void 0?n.ior:1.5,t.ior===0&&(t.ior=1e3)),Promise.resolve()}}class K2{constructor(e){this.parser=e,this.name=ct.KHR_MATERIALS_SPECULAR}getMaterialType(e){return Nt(this.parser,e,this.name)!==null?fn:null}extendMaterialParams(e,t){const n=Nt(this.parser,e,this.name);if(n===null)return Promise.resolve();const i=[];t.specularIntensity=n.specularFactor!==void 0?n.specularFactor:1,n.specularTexture!==void 0&&i.push(this.parser.assignTexture(t,"specularIntensityMap",n.specularTexture));const s=n.specularColorFactor||[1,1,1];return t.specularColor=new ye().setRGB(s[0],s[1],s[2],hn),n.specularColorTexture!==void 0&&i.push(this.parser.assignTexture(t,"specularColorMap",n.specularColorTexture,Et)),Promise.all(i)}}class j2{constructor(e){this.parser=e,this.name=ct.EXT_MATERIALS_BUMP}getMaterialType(e){return Nt(this.parser,e,this.name)!==null?fn:null}extendMaterialParams(e,t){const n=Nt(this.parser,e,this.name);if(n===null)return Promise.resolve();const i=[];return t.bumpScale=n.bumpFactor!==void 0?n.bumpFactor:1,n.bumpTexture!==void 0&&i.push(this.parser.assignTexture(t,"bumpMap",n.bumpTexture)),Promise.all(i)}}class J2{constructor(e){this.parser=e,this.name=ct.KHR_MATERIALS_ANISOTROPY}getMaterialType(e){return Nt(this.parser,e,this.name)!==null?fn:null}extendMaterialParams(e,t){const n=Nt(this.parser,e,this.name);if(n===null)return Promise.resolve();const i=[];return n.anisotropyStrength!==void 0&&(t.anisotropy=n.anisotropyStrength),n.anisotropyRotation!==void 0&&(t.anisotropyRotation=n.anisotropyRotation),n.anisotropyTexture!==void 0&&i.push(this.parser.assignTexture(t,"anisotropyMap",n.anisotropyTexture)),Promise.all(i)}}class Z2{constructor(e){this.parser=e,this.name=ct.KHR_TEXTURE_BASISU}loadTexture(e){const t=this.parser,n=t.json,i=n.textures[e];if(!i.extensions||!i.extensions[this.name])return null;const s=i.extensions[this.name],o=t.options.ktx2Loader;if(!o){if(n.extensionsRequired&&n.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return t.loadTextureImage(e,s.source,o)}}class $2{constructor(e){this.parser=e,this.name=ct.EXT_TEXTURE_WEBP}loadTexture(e){const t=this.name,n=this.parser,i=n.json,s=i.textures[e];if(!s.extensions||!s.extensions[t])return null;const o=s.extensions[t],c=i.images[o.source];let l=n.textureLoader;if(c.uri){const a=n.options.manager.getHandler(c.uri);a!==null&&(l=a)}return n.loadTextureImage(e,o.source,l)}}class Q2{constructor(e){this.parser=e,this.name=ct.EXT_TEXTURE_AVIF}loadTexture(e){const t=this.name,n=this.parser,i=n.json,s=i.textures[e];if(!s.extensions||!s.extensions[t])return null;const o=s.extensions[t],c=i.images[o.source];let l=n.textureLoader;if(c.uri){const a=n.options.manager.getHandler(c.uri);a!==null&&(l=a)}return n.loadTextureImage(e,o.source,l)}}class jh{constructor(e,t){this.name=t,this.parser=e}loadBufferView(e){const t=this.parser.json,n=t.bufferViews[e];if(n.extensions&&n.extensions[this.name]){const i=n.extensions[this.name],s=this.parser.getDependency("buffer",i.buffer),o=this.parser.options.meshoptDecoder;if(!o||!o.supported){if(t.extensionsRequired&&t.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return s.then(function(c){const l=i.byteOffset||0,a=i.byteLength||0,h=i.count,u=i.byteStride,f=new Uint8Array(c,l,a);return o.decodeGltfBufferAsync?o.decodeGltfBufferAsync(h,u,f,i.mode,i.filter).then(function(_){return _.buffer}):o.ready.then(function(){const _=new ArrayBuffer(h*u);return o.decodeGltfBuffer(new Uint8Array(_),h,u,f,i.mode,i.filter),_})})}else return null}}class ev{constructor(e){this.name=ct.EXT_MESH_GPU_INSTANCING,this.parser=e}createNodeMesh(e){const t=this.parser.json,n=t.nodes[e];if(!n.extensions||!n.extensions[this.name]||n.mesh===void 0)return null;const i=t.meshes[n.mesh];for(const a of i.primitives)if(a.mode!==gn.TRIANGLES&&a.mode!==gn.TRIANGLE_STRIP&&a.mode!==gn.TRIANGLE_FAN&&a.mode!==void 0)return null;const o=n.extensions[this.name].attributes,c=[],l={};for(const a in o)c.push(this.parser.getDependency("accessor",o[a]).then(h=>(l[a]=h,l[a])));return c.length<1?null:(c.push(this.parser.createNodeMesh(e)),Promise.all(c).then(a=>{const h=a.pop(),u=h.isGroup?h.children:[h],f=a[0].count,_=[];for(const d of u){const m=new qe,p=new L,g=new rn,x=new L(1,1,1),v=new Ru(d.geometry,d.material,f);for(let y=0;y<f;y++)l.TRANSLATION&&p.fromBufferAttribute(l.TRANSLATION,y),l.ROTATION&&g.fromBufferAttribute(l.ROTATION,y),l.SCALE&&x.fromBufferAttribute(l.SCALE,y),v.setMatrixAt(y,m.compose(p,g,x));for(const y in l)if(y==="_COLOR_0"){const w=l[y];v.instanceColor=new gc(w.array,w.itemSize,w.normalized)}else y!=="TRANSLATION"&&y!=="ROTATION"&&y!=="SCALE"&&d.geometry.setAttribute(y,l[y]);bt.prototype.copy.call(v,d),this.parser.assignFinalMaterial(v),_.push(v)}return h.isGroup?(h.clear(),h.add(..._),h):_[0]}))}}const rf="glTF",Ys=12,Jh={JSON:1313821514,BIN:5130562};class tv{constructor(e){this.name=ct.KHR_BINARY_GLTF,this.content=null,this.body=null;const t=new DataView(e,0,Ys),n=new TextDecoder;if(this.header={magic:n.decode(new Uint8Array(e.slice(0,4))),version:t.getUint32(4,!0),length:t.getUint32(8,!0)},this.header.magic!==rf)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");const i=this.header.length-Ys,s=new DataView(e,Ys);let o=0;for(;o<i;){const c=s.getUint32(o,!0);o+=4;const l=s.getUint32(o,!0);if(o+=4,l===Jh.JSON){const a=new Uint8Array(e,Ys+o,c);this.content=n.decode(a)}else if(l===Jh.BIN){const a=Ys+o;this.body=e.slice(a,a+c)}o+=c}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}}class nv{constructor(e,t){if(!t)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=ct.KHR_DRACO_MESH_COMPRESSION,this.json=e,this.dracoLoader=t,this.dracoLoader.preload()}decodePrimitive(e,t){const n=this.json,i=this.dracoLoader,s=e.extensions[this.name].bufferView,o=e.extensions[this.name].attributes,c={},l={},a={};for(const h in o){const u=Tc[h]||h.toLowerCase();c[u]=o[h]}for(const h in e.attributes){const u=Tc[h]||h.toLowerCase();if(o[h]!==void 0){const f=n.accessors[e.attributes[h]],_=ms[f.componentType];a[u]=_.name,l[u]=f.normalized===!0}}return t.getDependency("bufferView",s).then(function(h){return new Promise(function(u,f){i.decodeDracoFile(h,function(_){for(const d in _.attributes){const m=_.attributes[d],p=l[d];p!==void 0&&(m.normalized=p)}u(_)},c,a,hn,f)})})}}class iv{constructor(){this.name=ct.KHR_TEXTURE_TRANSFORM}extendTexture(e,t){return(t.texCoord===void 0||t.texCoord===e.channel)&&t.offset===void 0&&t.rotation===void 0&&t.scale===void 0||(e=e.clone(),t.texCoord!==void 0&&(e.channel=t.texCoord),t.offset!==void 0&&e.offset.fromArray(t.offset),t.rotation!==void 0&&(e.rotation=t.rotation),t.scale!==void 0&&e.repeat.fromArray(t.scale),e.needsUpdate=!0),e}}class sv{constructor(){this.name=ct.KHR_MESH_QUANTIZATION}}class of extends As{constructor(e,t,n,i){super(e,t,n,i)}copySampleValue_(e){const t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,s=e*i*3+i;for(let o=0;o!==i;o++)t[o]=n[s+o];return t}interpolate_(e,t,n,i){const s=this.resultBuffer,o=this.sampleValues,c=this.valueSize,l=c*2,a=c*3,h=i-t,u=(n-t)/h,f=u*u,_=f*u,d=e*a,m=d-a,p=-2*_+3*f,g=_-f,x=1-p,v=g-f+u;for(let y=0;y!==c;y++){const w=o[m+y+c],b=o[m+y+l]*h,A=o[d+y+c],M=o[d+y]*h;s[y]=x*w+v*b+p*A+g*M}return s}}const rv=new rn;class ov extends of{interpolate_(e,t,n,i){const s=super.interpolate_(e,t,n,i);return rv.fromArray(s).normalize().toArray(s),s}}const gn={POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6},ms={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},Zh={9728:Bt,9729:zt,9984:uu,9985:so,9986:Js,9987:On},$h={33071:Fn,33648:uo,10497:Fi},va={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},Tc={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},gi={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},av={CUBICSPLINE:void 0,LINEAR:lr,STEP:cr},ya={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function cv(r){return r.DefaultMaterial===void 0&&(r.DefaultMaterial=new Pe({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:ii})),r.DefaultMaterial}function Pi(r,e,t){for(const n in t.extensions)r[n]===void 0&&(e.userData.gltfExtensions=e.userData.gltfExtensions||{},e.userData.gltfExtensions[n]=t.extensions[n])}function Dn(r,e){e.extras!==void 0&&(typeof e.extras=="object"?Object.assign(r.userData,e.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+e.extras))}function lv(r,e,t){let n=!1,i=!1,s=!1;for(let a=0,h=e.length;a<h;a++){const u=e[a];if(u.POSITION!==void 0&&(n=!0),u.NORMAL!==void 0&&(i=!0),u.COLOR_0!==void 0&&(s=!0),n&&i&&s)break}if(!n&&!i&&!s)return Promise.resolve(r);const o=[],c=[],l=[];for(let a=0,h=e.length;a<h;a++){const u=e[a];if(n){const f=u.POSITION!==void 0?t.getDependency("accessor",u.POSITION):r.attributes.position;o.push(f)}if(i){const f=u.NORMAL!==void 0?t.getDependency("accessor",u.NORMAL):r.attributes.normal;c.push(f)}if(s){const f=u.COLOR_0!==void 0?t.getDependency("accessor",u.COLOR_0):r.attributes.color;l.push(f)}}return Promise.all([Promise.all(o),Promise.all(c),Promise.all(l)]).then(function(a){const h=a[0],u=a[1],f=a[2];return n&&(r.morphAttributes.position=h),i&&(r.morphAttributes.normal=u),s&&(r.morphAttributes.color=f),r.morphTargetsRelative=!0,r})}function hv(r,e){if(r.updateMorphTargets(),e.weights!==void 0)for(let t=0,n=e.weights.length;t<n;t++)r.morphTargetInfluences[t]=e.weights[t];if(e.extras&&Array.isArray(e.extras.targetNames)){const t=e.extras.targetNames;if(r.morphTargetInfluences.length===t.length){r.morphTargetDictionary={};for(let n=0,i=t.length;n<i;n++)r.morphTargetDictionary[t[n]]=n}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function uv(r){let e;const t=r.extensions&&r.extensions[ct.KHR_DRACO_MESH_COMPRESSION];if(t?e="draco:"+t.bufferView+":"+t.indices+":"+Ma(t.attributes):e=r.indices+":"+Ma(r.attributes)+":"+r.mode,r.targets!==void 0)for(let n=0,i=r.targets.length;n<i;n++)e+=":"+Ma(r.targets[n]);return e}function Ma(r){let e="";const t=Object.keys(r).sort();for(let n=0,i=t.length;n<i;n++)e+=t[n]+":"+r[t[n]]+";";return e}function Ec(r){switch(r){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function fv(r){return r.search(/\.jpe?g($|\?)/i)>0||r.search(/^data\:image\/jpeg/)===0?"image/jpeg":r.search(/\.webp($|\?)/i)>0||r.search(/^data\:image\/webp/)===0?"image/webp":r.search(/\.ktx2($|\?)/i)>0||r.search(/^data\:image\/ktx2/)===0?"image/ktx2":"image/png"}const dv=new qe;class pv{constructor(e={},t={}){this.json=e,this.extensions={},this.plugins={},this.options=t,this.cache=new O2,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let n=!1,i=-1,s=!1,o=-1;if(typeof navigator<"u"&&typeof navigator.userAgent<"u"){const c=navigator.userAgent;n=/^((?!chrome|android).)*safari/i.test(c)===!0;const l=c.match(/Version\/(\d+)/);i=n&&l?parseInt(l[1],10):-1,s=c.indexOf("Firefox")>-1,o=s?c.match(/Firefox\/([0-9]+)\./)[1]:-1}typeof createImageBitmap>"u"||n&&i<17||s&&o<98?this.textureLoader=new im(this.options.manager):this.textureLoader=new lm(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new Yu(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials"&&this.fileLoader.setWithCredentials(!0)}setExtensions(e){this.extensions=e}setPlugins(e){this.plugins=e}parse(e,t){const n=this,i=this.json,s=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(o){return o._markDefs&&o._markDefs()}),Promise.all(this._invokeAll(function(o){return o.beforeRoot&&o.beforeRoot()})).then(function(){return Promise.all([n.getDependencies("scene"),n.getDependencies("animation"),n.getDependencies("camera")])}).then(function(o){const c={scene:o[0][i.scene||0],scenes:o[0],animations:o[1],cameras:o[2],asset:i.asset,parser:n,userData:{}};return Pi(s,c,i),Dn(c,i),Promise.all(n._invokeAll(function(l){return l.afterRoot&&l.afterRoot(c)})).then(function(){for(const l of c.scenes)l.updateMatrixWorld();e(c)})}).catch(t)}_markDefs(){const e=this.json.nodes||[],t=this.json.skins||[],n=this.json.meshes||[];for(let i=0,s=t.length;i<s;i++){const o=t[i].joints;for(let c=0,l=o.length;c<l;c++)e[o[c]].isBone=!0}for(let i=0,s=e.length;i<s;i++){const o=e[i];o.mesh!==void 0&&(this._addNodeRef(this.meshCache,o.mesh),o.skin!==void 0&&(n[o.mesh].isSkinnedMesh=!0)),o.camera!==void 0&&this._addNodeRef(this.cameraCache,o.camera)}}_addNodeRef(e,t){t!==void 0&&(e.refs[t]===void 0&&(e.refs[t]=e.uses[t]=0),e.refs[t]++)}_getNodeRef(e,t,n){if(e.refs[t]<=1)return n;const i=n.clone(),s=(o,c)=>{const l=this.associations.get(o);l!=null&&this.associations.set(c,l);for(const[a,h]of o.children.entries())s(h,c.children[a])};return s(n,i),i.name+="_instance_"+e.uses[t]++,i}_invokeOne(e){const t=Object.values(this.plugins);t.push(this);for(let n=0;n<t.length;n++){const i=e(t[n]);if(i)return i}return null}_invokeAll(e){const t=Object.values(this.plugins);t.unshift(this);const n=[];for(let i=0;i<t.length;i++){const s=e(t[i]);s&&n.push(s)}return n}getDependency(e,t){const n=e+":"+t;let i=this.cache.get(n);if(!i){switch(e){case"scene":i=this.loadScene(t);break;case"node":i=this._invokeOne(function(s){return s.loadNode&&s.loadNode(t)});break;case"mesh":i=this._invokeOne(function(s){return s.loadMesh&&s.loadMesh(t)});break;case"accessor":i=this.loadAccessor(t);break;case"bufferView":i=this._invokeOne(function(s){return s.loadBufferView&&s.loadBufferView(t)});break;case"buffer":i=this.loadBuffer(t);break;case"material":i=this._invokeOne(function(s){return s.loadMaterial&&s.loadMaterial(t)});break;case"texture":i=this._invokeOne(function(s){return s.loadTexture&&s.loadTexture(t)});break;case"skin":i=this.loadSkin(t);break;case"animation":i=this._invokeOne(function(s){return s.loadAnimation&&s.loadAnimation(t)});break;case"camera":i=this.loadCamera(t);break;default:if(i=this._invokeOne(function(s){return s!=this&&s.getDependency&&s.getDependency(e,t)}),!i)throw new Error("Unknown type: "+e);break}this.cache.add(n,i)}return i}getDependencies(e){let t=this.cache.get(e);if(!t){const n=this,i=this.json[e+(e==="mesh"?"es":"s")]||[];t=Promise.all(i.map(function(s,o){return n.getDependency(e,o)})),this.cache.add(e,t)}return t}loadBuffer(e){const t=this.json.buffers[e],n=this.fileLoader;if(t.type&&t.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+t.type+" buffer type is not supported.");if(t.uri===void 0&&e===0)return Promise.resolve(this.extensions[ct.KHR_BINARY_GLTF].body);const i=this.options;return new Promise(function(s,o){n.load(sr.resolveURL(t.uri,i.path),s,void 0,function(){o(new Error('THREE.GLTFLoader: Failed to load buffer "'+t.uri+'".'))})})}loadBufferView(e){const t=this.json.bufferViews[e];return this.getDependency("buffer",t.buffer).then(function(n){const i=t.byteLength||0,s=t.byteOffset||0;return n.slice(s,s+i)})}loadAccessor(e){const t=this,n=this.json,i=this.json.accessors[e];if(i.bufferView===void 0&&i.sparse===void 0){const o=va[i.type],c=ms[i.componentType],l=i.normalized===!0,a=new c(i.count*o);return Promise.resolve(new Dt(a,o,l))}const s=[];return i.bufferView!==void 0?s.push(this.getDependency("bufferView",i.bufferView)):s.push(null),i.sparse!==void 0&&(s.push(this.getDependency("bufferView",i.sparse.indices.bufferView)),s.push(this.getDependency("bufferView",i.sparse.values.bufferView))),Promise.all(s).then(function(o){const c=o[0],l=va[i.type],a=ms[i.componentType],h=a.BYTES_PER_ELEMENT,u=h*l,f=i.byteOffset||0,_=i.bufferView!==void 0?n.bufferViews[i.bufferView].byteStride:void 0,d=i.normalized===!0;let m,p;if(_&&_!==u){const g=Math.floor(f/_),x="InterleavedBuffer:"+i.bufferView+":"+i.componentType+":"+g+":"+i.count;let v=t.cache.get(x);v||(m=new a(c,g*_,i.count*_/h),v=new Tu(m,_/h),t.cache.add(x,v)),p=new fr(v,l,f%_/h,d)}else c===null?m=new a(i.count*l):m=new a(c,f,i.count*l),p=new Dt(m,l,d);if(i.sparse!==void 0){const g=va.SCALAR,x=ms[i.sparse.indices.componentType],v=i.sparse.indices.byteOffset||0,y=i.sparse.values.byteOffset||0,w=new x(o[1],v,i.sparse.count*g),b=new a(o[2],y,i.sparse.count*l);c!==null&&(p=new Dt(p.array.slice(),p.itemSize,p.normalized)),p.normalized=!1;for(let A=0,M=w.length;A<M;A++){const T=w[A];if(p.setX(T,b[A*l]),l>=2&&p.setY(T,b[A*l+1]),l>=3&&p.setZ(T,b[A*l+2]),l>=4&&p.setW(T,b[A*l+3]),l>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}p.normalized=d}return p})}loadTexture(e){const t=this.json,n=this.options,s=t.textures[e].source,o=t.images[s];let c=this.textureLoader;if(o.uri){const l=n.manager.getHandler(o.uri);l!==null&&(c=l)}return this.loadTextureImage(e,s,c)}loadTextureImage(e,t,n){const i=this,s=this.json,o=s.textures[e],c=s.images[t],l=(c.uri||c.bufferView)+":"+o.sampler;if(this.textureCache[l])return this.textureCache[l];const a=this.loadImageSource(t,n).then(function(h){h.flipY=!1,h.name=o.name||c.name||"",h.name===""&&typeof c.uri=="string"&&c.uri.startsWith("data:image/")===!1&&(h.name=c.uri);const f=(s.samplers||{})[o.sampler]||{};return h.magFilter=Zh[f.magFilter]||zt,h.minFilter=Zh[f.minFilter]||On,h.wrapS=$h[f.wrapS]||Fi,h.wrapT=$h[f.wrapT]||Fi,h.generateMipmaps=!h.isCompressedTexture&&h.minFilter!==Bt&&h.minFilter!==zt,i.associations.set(h,{textures:e}),h}).catch(function(){return null});return this.textureCache[l]=a,a}loadImageSource(e,t){const n=this,i=this.json,s=this.options;if(this.sourceCache[e]!==void 0)return this.sourceCache[e].then(u=>u.clone());const o=i.images[e],c=self.URL||self.webkitURL;let l=o.uri||"",a=!1;if(o.bufferView!==void 0)l=n.getDependency("bufferView",o.bufferView).then(function(u){a=!0;const f=new Blob([u],{type:o.mimeType});return l=c.createObjectURL(f),l});else if(o.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+e+" is missing URI and bufferView");const h=Promise.resolve(l).then(function(u){return new Promise(function(f,_){let d=f;t.isImageBitmapLoader===!0&&(d=function(m){const p=new Gt(m);p.needsUpdate=!0,f(p)}),t.load(sr.resolveURL(u,s.path),d,void 0,_)})}).then(function(u){return a===!0&&c.revokeObjectURL(l),Dn(u,o),u.userData.mimeType=o.mimeType||fv(o.uri),u}).catch(function(u){throw console.error("THREE.GLTFLoader: Couldn't load texture",l),u});return this.sourceCache[e]=h,h}assignTexture(e,t,n,i){const s=this;return this.getDependency("texture",n.index).then(function(o){if(!o)return null;if(n.texCoord!==void 0&&n.texCoord>0&&(o=o.clone(),o.channel=n.texCoord),s.extensions[ct.KHR_TEXTURE_TRANSFORM]){const c=n.extensions!==void 0?n.extensions[ct.KHR_TEXTURE_TRANSFORM]:void 0;if(c){const l=s.associations.get(o);o=s.extensions[ct.KHR_TEXTURE_TRANSFORM].extendTexture(o,c),s.associations.set(o,l)}}return i!==void 0&&(o.colorSpace=i),e[t]=o,o})}assignFinalMaterial(e){const t=e.geometry;let n=e.material;const i=t.attributes.tangent===void 0,s=t.attributes.color!==void 0,o=t.attributes.normal===void 0;if(e.isPoints){const c="PointsMaterial:"+n.uuid;let l=this.cache.get(c);l||(l=new Qc,An.prototype.copy.call(l,n),l.color.copy(n.color),l.map=n.map,l.sizeAttenuation=!1,this.cache.add(c,l)),n=l}else if(e.isLine){const c="LineBasicMaterial:"+n.uuid;let l=this.cache.get(c);l||(l=new Cu,An.prototype.copy.call(l,n),l.color.copy(n.color),l.map=n.map,this.cache.add(c,l)),n=l}if(i||s||o){let c="ClonedMaterial:"+n.uuid+":";i&&(c+="derivative-tangents:"),s&&(c+="vertex-colors:"),o&&(c+="flat-shading:");let l=this.cache.get(c);l||(l=n.clone(),s&&(l.vertexColors=!0),o&&(l.flatShading=!0),i&&(l.normalScale&&(l.normalScale.y*=-1),l.clearcoatNormalScale&&(l.clearcoatNormalScale.y*=-1)),this.cache.add(c,l),this.associations.set(l,this.associations.get(n))),n=l}e.material=n}getMaterialType(){return Pe}loadMaterial(e){const t=this,n=this.json,i=this.extensions,s=n.materials[e];let o;const c={},l=s.extensions||{},a=[];if(l[ct.KHR_MATERIALS_UNLIT]){const u=i[ct.KHR_MATERIALS_UNLIT];o=u.getMaterialType(),a.push(u.extendParams(c,s,t))}else{const u=s.pbrMetallicRoughness||{};if(c.color=new ye(1,1,1),c.opacity=1,Array.isArray(u.baseColorFactor)){const f=u.baseColorFactor;c.color.setRGB(f[0],f[1],f[2],hn),c.opacity=f[3]}u.baseColorTexture!==void 0&&a.push(t.assignTexture(c,"map",u.baseColorTexture,Et)),c.metalness=u.metallicFactor!==void 0?u.metallicFactor:1,c.roughness=u.roughnessFactor!==void 0?u.roughnessFactor:1,u.metallicRoughnessTexture!==void 0&&(a.push(t.assignTexture(c,"metalnessMap",u.metallicRoughnessTexture)),a.push(t.assignTexture(c,"roughnessMap",u.metallicRoughnessTexture))),o=this._invokeOne(function(f){return f.getMaterialType&&f.getMaterialType(e)}),a.push(Promise.all(this._invokeAll(function(f){return f.extendMaterialParams&&f.extendMaterialParams(e,c)})))}s.doubleSided===!0&&(c.side=It);const h=s.alphaMode||ya.OPAQUE;if(h===ya.BLEND?(c.transparent=!0,c.depthWrite=!1):(c.transparent=!1,h===ya.MASK&&(c.alphaTest=s.alphaCutoff!==void 0?s.alphaCutoff:.5)),s.normalTexture!==void 0&&o!==kt&&(a.push(t.assignTexture(c,"normalMap",s.normalTexture)),c.normalScale=new ee(1,1),s.normalTexture.scale!==void 0)){const u=s.normalTexture.scale;c.normalScale.set(u,u)}if(s.occlusionTexture!==void 0&&o!==kt&&(a.push(t.assignTexture(c,"aoMap",s.occlusionTexture)),s.occlusionTexture.strength!==void 0&&(c.aoMapIntensity=s.occlusionTexture.strength)),s.emissiveFactor!==void 0&&o!==kt){const u=s.emissiveFactor;c.emissive=new ye().setRGB(u[0],u[1],u[2],hn)}return s.emissiveTexture!==void 0&&o!==kt&&a.push(t.assignTexture(c,"emissiveMap",s.emissiveTexture,Et)),Promise.all(a).then(function(){const u=new o(c);return s.name&&(u.name=s.name),Dn(u,s),t.associations.set(u,{materials:e}),s.extensions&&Pi(i,u,s),u})}createUniqueName(e){const t=mt.sanitizeNodeName(e||"");return t in this.nodeNamesUsed?t+"_"+ ++this.nodeNamesUsed[t]:(this.nodeNamesUsed[t]=0,t)}loadGeometries(e){const t=this,n=this.extensions,i=this.primitiveCache;function s(c){return n[ct.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(c,t).then(function(l){return Qh(l,c,t)})}const o=[];for(let c=0,l=e.length;c<l;c++){const a=e[c],h=uv(a),u=i[h];if(u)o.push(u.promise);else{let f;a.extensions&&a.extensions[ct.KHR_DRACO_MESH_COMPRESSION]?f=s(a):f=Qh(new Tt,a,t),i[h]={primitive:a,promise:f},o.push(f)}}return Promise.all(o)}loadMesh(e){const t=this,n=this.json,i=this.extensions,s=n.meshes[e],o=s.primitives,c=[];for(let l=0,a=o.length;l<a;l++){const h=o[l].material===void 0?cv(this.cache):this.getDependency("material",o[l].material);c.push(h)}return c.push(t.loadGeometries(o)),Promise.all(c).then(function(l){const a=l.slice(0,l.length-1),h=l[l.length-1],u=[];for(let _=0,d=h.length;_<d;_++){const m=h[_],p=o[_];let g;const x=a[_];if(p.mode===gn.TRIANGLES||p.mode===gn.TRIANGLE_STRIP||p.mode===gn.TRIANGLE_FAN||p.mode===void 0)g=s.isSkinnedMesh===!0?new ep(m,x):new G(m,x),g.isSkinnedMesh===!0&&g.normalizeSkinWeights(),p.mode===gn.TRIANGLE_STRIP?g.geometry=Kh(g.geometry,vu):p.mode===gn.TRIANGLE_FAN&&(g.geometry=Kh(g.geometry,fc));else if(p.mode===gn.LINES)g=new op(m,x);else if(p.mode===gn.LINE_STRIP)g=new $c(m,x);else if(p.mode===gn.LINE_LOOP)g=new ap(m,x);else if(p.mode===gn.POINTS)g=new Pu(m,x);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+p.mode);Object.keys(g.geometry.morphAttributes).length>0&&hv(g,s),g.name=t.createUniqueName(s.name||"mesh_"+e),Dn(g,s),p.extensions&&Pi(i,g,p),t.assignFinalMaterial(g),u.push(g)}for(let _=0,d=u.length;_<d;_++)t.associations.set(u[_],{meshes:e,primitives:_});if(u.length===1)return s.extensions&&Pi(i,u[0],s),u[0];const f=new gt;s.extensions&&Pi(i,f,s),t.associations.set(f,{meshes:e});for(let _=0,d=u.length;_<d;_++)f.add(u[_]);return f})}loadCamera(e){let t;const n=this.json.cameras[e],i=n[n.type];if(!i){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return n.type==="perspective"?t=new tn(mn.radToDeg(i.yfov),i.aspectRatio||1,i.znear||1,i.zfar||2e6):n.type==="orthographic"&&(t=new vr(-i.xmag,i.xmag,i.ymag,-i.ymag,i.znear,i.zfar)),n.name&&(t.name=this.createUniqueName(n.name)),Dn(t,n),Promise.resolve(t)}loadSkin(e){const t=this.json.skins[e],n=[];for(let i=0,s=t.joints.length;i<s;i++)n.push(this._loadNodeShallow(t.joints[i]));return t.inverseBindMatrices!==void 0?n.push(this.getDependency("accessor",t.inverseBindMatrices)):n.push(null),Promise.all(n).then(function(i){const s=i.pop(),o=i,c=[],l=[];for(let a=0,h=o.length;a<h;a++){const u=o[a];if(u){c.push(u);const f=new qe;s!==null&&f.fromArray(s.array,a*16),l.push(f)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',t.joints[a])}return new Jc(c,l)})}loadAnimation(e){const t=this.json,n=this,i=t.animations[e],s=i.name?i.name:"animation_"+e,o=[],c=[],l=[],a=[],h=[];for(let u=0,f=i.channels.length;u<f;u++){const _=i.channels[u],d=i.samplers[_.sampler],m=_.target,p=m.node,g=i.parameters!==void 0?i.parameters[d.input]:d.input,x=i.parameters!==void 0?i.parameters[d.output]:d.output;m.node!==void 0&&(o.push(this.getDependency("node",p)),c.push(this.getDependency("accessor",g)),l.push(this.getDependency("accessor",x)),a.push(d),h.push(m))}return Promise.all([Promise.all(o),Promise.all(c),Promise.all(l),Promise.all(a),Promise.all(h)]).then(function(u){const f=u[0],_=u[1],d=u[2],m=u[3],p=u[4],g=[];for(let v=0,y=f.length;v<y;v++){const w=f[v],b=_[v],A=d[v],M=m[v],T=p[v];if(w===void 0)continue;w.updateMatrix&&w.updateMatrix();const C=n._createAnimationTracks(w,b,A,M,T);if(C)for(let P=0;P<C.length;P++)g.push(C[P])}const x=new yc(s,void 0,g);return Dn(x,i),x})}createNodeMesh(e){const t=this.json,n=this,i=t.nodes[e];return i.mesh===void 0?null:n.getDependency("mesh",i.mesh).then(function(s){const o=n._getNodeRef(n.meshCache,i.mesh,s);return i.weights!==void 0&&o.traverse(function(c){if(c.isMesh)for(let l=0,a=i.weights.length;l<a;l++)c.morphTargetInfluences[l]=i.weights[l]}),o})}loadNode(e){const t=this.json,n=this,i=t.nodes[e],s=n._loadNodeShallow(e),o=[],c=i.children||[];for(let a=0,h=c.length;a<h;a++)o.push(n.getDependency("node",c[a]));const l=i.skin===void 0?Promise.resolve(null):n.getDependency("skin",i.skin);return Promise.all([s,Promise.all(o),l]).then(function(a){const h=a[0],u=a[1],f=a[2];f!==null&&h.traverse(function(_){_.isSkinnedMesh&&_.bind(f,dv)});for(let _=0,d=u.length;_<d;_++)h.add(u[_]);if(h.userData.pivot!==void 0&&u.length>0){const _=h.userData.pivot,d=u[0];h.pivot=new L().fromArray(_),h.position.x-=_[0],h.position.y-=_[1],h.position.z-=_[2],d.position.set(0,0,0),delete h.userData.pivot}return h})}_loadNodeShallow(e){const t=this.json,n=this.extensions,i=this;if(this.nodeCache[e]!==void 0)return this.nodeCache[e];const s=t.nodes[e],o=s.name?i.createUniqueName(s.name):"",c=[],l=i._invokeOne(function(a){return a.createNodeMesh&&a.createNodeMesh(e)});return l&&c.push(l),s.camera!==void 0&&c.push(i.getDependency("camera",s.camera).then(function(a){return i._getNodeRef(i.cameraCache,s.camera,a)})),i._invokeAll(function(a){return a.createNodeAttachment&&a.createNodeAttachment(e)}).forEach(function(a){c.push(a)}),this.nodeCache[e]=Promise.all(c).then(function(a){let h;if(s.isBone===!0?h=new Au:a.length>1?h=new gt:a.length===1?h=a[0]:h=new bt,h!==a[0])for(let u=0,f=a.length;u<f;u++)h.add(a[u]);if(s.name&&(h.userData.name=s.name,h.name=o),Dn(h,s),s.extensions&&Pi(n,h,s),s.matrix!==void 0){const u=new qe;u.fromArray(s.matrix),h.applyMatrix4(u)}else s.translation!==void 0&&h.position.fromArray(s.translation),s.rotation!==void 0&&h.quaternion.fromArray(s.rotation),s.scale!==void 0&&h.scale.fromArray(s.scale);if(!i.associations.has(h))i.associations.set(h,{});else if(s.mesh!==void 0&&i.meshCache.refs[s.mesh]>1){const u=i.associations.get(h);i.associations.set(h,{...u})}return i.associations.get(h).nodes=e,h}),this.nodeCache[e]}loadScene(e){const t=this.extensions,n=this.json.scenes[e],i=this,s=new gt;n.name&&(s.name=i.createUniqueName(n.name)),Dn(s,n),n.extensions&&Pi(t,s,n);const o=n.nodes||[],c=[];for(let l=0,a=o.length;l<a;l++)c.push(i.getDependency("node",o[l]));return Promise.all(c).then(function(l){for(let h=0,u=l.length;h<u;h++){const f=l[h];f.parent!==null?s.add(U2(f)):s.add(f)}const a=h=>{const u=new Map;for(const[f,_]of i.associations)(f instanceof An||f instanceof Gt)&&u.set(f,_);return h.traverse(f=>{const _=i.associations.get(f);_!=null&&u.set(f,_)}),u};return i.associations=a(s),s})}_createAnimationTracks(e,t,n,i,s){const o=[],c=e.name?e.name:e.uuid,l=[];function a(_){_.morphTargetInfluences&&l.push(_.name?_.name:_.uuid)}gi[s.path]===gi.weights?(a(e),e.isGroup&&e.children.forEach(a)):l.push(c);let h;switch(gi[s.path]){case gi.weights:h=bs;break;case gi.rotation:h=ws;break;case gi.translation:case gi.scale:h=Ts;break;default:switch(n.itemSize){case 1:h=bs;break;case 2:case 3:default:h=Ts;break}break}const u=i.interpolation!==void 0?av[i.interpolation]:lr,f=this._getArrayFromAccessor(n);for(let _=0,d=l.length;_<d;_++){const m=new h(l[_]+"."+gi[s.path],t.array,f,u);i.interpolation==="CUBICSPLINE"&&this._createCubicSplineTrackInterpolant(m),o.push(m)}return o}_getArrayFromAccessor(e){let t=e.array;if(e.normalized){const n=Ec(t.constructor),i=new Float32Array(t.length);for(let s=0,o=t.length;s<o;s++)i[s]=t[s]*n;t=i}return t}_createCubicSplineTrackInterpolant(e){e.createInterpolant=function(n){const i=this instanceof ws?ov:of;return new i(this.times,this.values,this.getValueSize()/3,n)},e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}}function mv(r,e,t){const n=e.attributes,i=new Vn;if(n.POSITION!==void 0){const c=t.json.accessors[n.POSITION],l=c.min,a=c.max;if(l!==void 0&&a!==void 0){if(i.set(new L(l[0],l[1],l[2]),new L(a[0],a[1],a[2])),c.normalized){const h=Ec(ms[c.componentType]);i.min.multiplyScalar(h),i.max.multiplyScalar(h)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;const s=e.targets;if(s!==void 0){const c=new L,l=new L;for(let a=0,h=s.length;a<h;a++){const u=s[a];if(u.POSITION!==void 0){const f=t.json.accessors[u.POSITION],_=f.min,d=f.max;if(_!==void 0&&d!==void 0){if(l.setX(Math.max(Math.abs(_[0]),Math.abs(d[0]))),l.setY(Math.max(Math.abs(_[1]),Math.abs(d[1]))),l.setZ(Math.max(Math.abs(_[2]),Math.abs(d[2]))),f.normalized){const m=Ec(ms[f.componentType]);l.multiplyScalar(m)}c.max(l)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}i.expandByVector(c)}r.boundingBox=i;const o=new Hn;i.getCenter(o.center),o.radius=i.min.distanceTo(i.max)/2,r.boundingSphere=o}function Qh(r,e,t){const n=e.attributes,i=[];function s(o,c){return t.getDependency("accessor",o).then(function(l){r.setAttribute(c,l)})}for(const o in n){const c=Tc[o]||o.toLowerCase();c in r.attributes||i.push(s(n[o],c))}if(e.indices!==void 0&&!r.index){const o=t.getDependency("accessor",e.indices).then(function(c){r.setIndex(c)});i.push(o)}return at.workingColorSpace!==hn&&"COLOR_0"in n&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${at.workingColorSpace}" not supported.`),Dn(r,e),mv(r,e,t),Promise.all(i).then(function(){return e.targets!==void 0?lv(r,e.targets,t):r})}const af=new F2,Sa=new Map;let ba=null;async function cf(){return ba||(ba=fetch("./models/manifest.json").then(r=>r.ok?r.json():null).catch(()=>null)),ba}function lf(r){return r.startsWith("http")?r:`./${r.replace(/^\//,"")}`}async function hf(r){try{return(await fetch(r,{method:"HEAD"})).ok}catch{return!1}}function uf(r,e,t=1){const n=new Vn().setFromObject(r);if(n.isEmpty())return;const i=n.getSize(new L),s=n.getCenter(new L),o=Math.max(i.x,i.y,i.z,.001),c=e/o*t;r.scale.setScalar(c),r.position.sub(s.multiplyScalar(c)),r.position.y+=i.y*c/2}function gv(r,e){const t=new Set(e.map(i=>i.toLowerCase()));let n=null;return r.traverse(i=>{var c;if(n)return;const s=i;if(!s.isMesh)return;const o=s.name.toLowerCase();(t.has(o)||t.has(((c=i.parent)==null?void 0:c.name.toLowerCase())??""))&&(n=s)}),n}function ff(r){r.traverse(e=>{const t=e;if(!t.isMesh)return;t.castShadow=!0,t.receiveShadow=!0;const n=Array.isArray(t.material)?t.material:[t.material];for(const i of n)i&&"color"in i&&i instanceof Pe&&(i.envMapIntensity=1)})}async function _v(r,e,t){var i,s;const n=lf(r);if(!await hf(n))return null;try{if(!Sa.has(n)){const c=(await af.loadAsync(n)).scene,l=e.targetHeight??((i=t.defaults)==null?void 0:i.targetHeight)??6;uf(c,l,e.scale??((s=t.defaults)==null?void 0:s.scale)??1),ff(c),Sa.set(n,c)}return Sa.get(n).clone(!0)}catch{return null}}async function xv(r,e,t){var i,s;const n=lf(r);if(!await hf(n))return null;try{const o=await af.loadAsync(n),c=o.scene,l=e.targetHeight??((i=t.defaults)==null?void 0:i.targetHeight)??1.9;return uf(c,l,e.scale??((s=t.defaults)==null?void 0:s.scale)??1),ff(c),{group:c,clips:o.animations??[]}}catch{return null}}function Po(r,e){return new fn({color:r,emissive:r,emissiveIntensity:e,metalness:.15,roughness:.08,clearcoat:1,clearcoatRoughness:.05,reflectivity:1,transparent:!0,opacity:.92,side:It})}function un(r,e=.82){return new Pe({color:r,roughness:e,metalness:.06,envMapIntensity:.4})}function wa(r){return new Pe({color:r,roughness:.88,metalness:.04,emissive:1718816,emissiveIntensity:.06})}function vv(r){return new Pe({color:r?7268279:6000111,emissive:r?3462041:3900150,emissiveIntensity:r?.72:.38,roughness:.18,metalness:.4,transparent:!0,opacity:.88})}function eu(){return new fn({color:1993370,roughness:.06,metalness:.12,transparent:!0,opacity:.72,reflectivity:.95,clearcoat:1,clearcoatRoughness:.08,envMapIntensity:.6})}function yv(r){const t=document.createElement("canvas");t.width=64,t.height=64;const n=t.getContext("2d"),i=n.createRadialGradient(64/2,64/2,0,64/2,64/2,64/2);return i.addColorStop(0,r),i.addColorStop(.4,"rgba(255,220,140,0.35)"),i.addColorStop(1,"rgba(0,0,0,0)"),n.fillStyle=i,n.fillRect(0,0,64,64),new Mi(t)}function Mv(){return new Pe({color:4871528,roughness:.45,metalness:.85})}function Sv(r){return new fn({color:r,emissive:r,emissiveIntensity:1.4,roughness:.04,metalness:0,transparent:!0,opacity:.82,clearcoat:1})}function tu(r=1){const e=new gt,t=new G(new ze(.14*r,.26*r,1.7*r,10),un(4863784,.95));t.position.y=.85*r,t.castShadow=!0,e.add(t);const n=[2976335,3504728,2580548,3836514],i=[[0,2.5,0,1.05],[.55,2.25,.2,.72],[-.5,2.3,-.25,.7],[.15,2.95,-.1,.78],[-.2,2.7,.45,.6]];for(const[s,o,c,l]of i){const a=new Pe({color:n[Math.floor(Math.random()*n.length)],roughness:.82,metalness:.02,flatShading:!0}),h=new G(new wi(l*r,1),a);h.position.set(s*r,o*r,c*r),h.castShadow=!0,e.add(h)}return e}function nu(r=1){const e=new gt,t=new G(new ze(.12*r,.2*r,1.2*r,10),un(4009506,.9));t.position.y=.6*r,t.castShadow=!0;for(let n=0;n<5;n++){const i=new G(new Yt((1.15-n*.17)*r,1*r,9),new Pe({color:1786674+n*131842,roughness:.72,flatShading:!0}));i.position.y=(1.3+n*.62)*r,i.rotation.y=n*.4,i.castShadow=!0,e.add(i)}return e.add(t),e}function bv(){const r=new xn(.09,.5,1,3);r.translate(0,.25,0);const e=r.clone();e.rotateY(Math.PI/2);const t=wv([r,e]),n=t.attributes.position,i=new Float32Array(n.count*3);for(let s=0;s<n.count;s++){const o=mn.clamp(n.getY(s)/.5,0,1);i[s*3]=.16+o*.22,i[s*3+1]=.3+o*.4,i[s*3+2]=.14+o*.16}return t.setAttribute("color",new Dt(i,3)),t}function wv(r){const e=new Tt;let t=0,n=0;for(const h of r)t+=h.attributes.position.count,n+=h.index?h.index.count:h.attributes.position.count;const i=new Float32Array(t*3),s=new Float32Array(t*3),o=new Float32Array(t*2),c=new Uint32Array(n);let l=0,a=0;for(const h of r){const u=h.attributes.position,f=h.attributes.normal,_=h.attributes.uv;i.set(u.array,l*3),f&&s.set(f.array,l*3),_&&o.set(_.array,l*2);const d=h.index;if(d)for(let m=0;m<d.count;m++)c[a++]=d.getX(m)+l;else for(let m=0;m<u.count;m++)c[a++]=m+l;l+=u.count}return e.setAttribute("position",new Dt(i,3)),e.setAttribute("normal",new Dt(s,3)),e.setAttribute("uv",new Dt(o,2)),e.setIndex(new Dt(c,1)),e}function io(r=1){const e=new G(new vi(.55*r,1),un(6054768,.88));return e.castShadow=!0,e.receiveShadow=!0,e}function df(r){const e=new gt,t=new G(new ze(.06,.08,1.4,8),un(3621201,.6));t.position.y=.7;const n=new G(new we(.35,.45,.35),Po(r,.5));n.position.y=1.55;const i=new En(r,.8,6);return i.position.y=1.55,e.add(t,n,i),e}const iu={forest:{primary:2051382,secondary:3462041,accent:7268279,crystal:4906624,ground:1717032},coast:{primary:1981023,secondary:3718648,accent:8246268,crystal:6333946,ground:1715778},library:{primary:3878751,secondary:10980346,accent:12891645,crystal:9133302,ground:2762048},market:{primary:4863776,secondary:16498468,accent:16569165,crystal:16096779,ground:4010016},temple:{primary:4857912,secondary:16020150,accent:16361684,crystal:15485081,ground:3481648},plains:{primary:3359061,secondary:9741240,accent:13358561,crystal:6583435,ground:2765888}};function yr(r){return iu[r]??iu.plains}function pf(r,e,t){const n=new G(new ze(.35,.55,1.6,16),un(6045747,.75));n.position.y=1.1,n.castShadow=!0;const i=new G(new it(1.1,.14,10,24,Math.PI),un(4876097,.7));i.rotation.z=Math.PI,i.position.y=2.2;const s=new G(new wi(.95,1),t);return s.position.y=3.5,s.castShadow=!0,r.add(n,i,s),s}function Tv(r,e,t){const n=new G(new we(2.2,.2,1.4),un(7035466,.65));n.position.set(0,.55,.4);const i=new G(new ze(.45,.6,2.8,16),un(13358561,.45));i.position.y=1.8,i.castShadow=!0;const s=new G(new Je(.75,1),t);s.position.y=3.6;const o=new En(e.crystal,1.2,10);return o.position.y=3.6,r.add(n,i,s,o),s}function Ev(r,e,t){const n=new G(new we(2.6,.5,2.2),un(10265519,.35));n.position.y=.55;const i=new G(new Yt(1.8,1.2,4),new Pe({color:e.primary,roughness:.4,metalness:.2}));i.position.y=1.4,i.rotation.y=Math.PI/4;const s=new G(new ze(.12,.15,2.2,12),un(13751771,.3));s.position.set(-.9,1.3,0);const o=s.clone();o.position.x=.9;const c=new G(new nl(.55,.16,64,12),t);return c.position.y=3.2,r.add(n,i,s,o,c),c}function Av(r,e,t){const n=new G(new we(2.4,.15,1.8),un(9136404,.7));n.position.y=.55;const i=new G(new ze(0,1.6,.9,4),new Pe({color:e.secondary,roughness:.55,side:It}));i.position.y=1.8,i.rotation.y=Math.PI/4;const s=new G(new vi(.8,0),t);s.position.y=3.1;const o=df(e.accent);return o.position.set(1.1,0,.6),r.add(n,i,s,o),s}function Rv(r,e,t){const n=new G(new we(3,.25,2.4),un(10322313,.55));n.position.y=.5;const i=new G(new ze(.25,.4,3.2,8),un(12887477,.4));i.position.y=2.1,i.castShadow=!0;const s=new G(new it(1.3,.06,8,40),new Pe({color:e.accent,emissive:e.accent,emissiveIntensity:.6,metalness:.8,roughness:.2}));s.rotation.x=Math.PI/2,s.position.y=3.8;const o=new G(new Je(.9,2),t);return o.position.y=4.5,r.add(n,i,s,o),o}const Cv={forest:pf,coast:Tv,library:Ev,market:Av,temple:Rv};function Pv(r,e){const t=yr(r.theme),n=new gt,i=r.unlocked,s=i?1:.45,o=new G(new ze(2.4,2.8,.35,24),new Pe({color:t.ground,roughness:.55,metalness:.12,transparent:!i,opacity:s}));o.position.y=.18,o.receiveShadow=!0;const c=new G(new it(2.1,.08,12,48),new Pe({color:t.secondary,emissive:t.accent,emissiveIntensity:i?.35:.08,roughness:.3,metalness:.55,transparent:!i,opacity:s}));c.rotation.x=Math.PI/2,c.position.y=.38,n.add(o,c);const l=Po(i?t.crystal:7041664,r.cleared?.85:i?.55:.12),a=(Cv[r.theme]??pf)(n,t,l);if(a.userData.isCrystal=!0,e){const h=new G(new Gi(2.3,2.55,48),new kt({color:16498468,transparent:!0,opacity:.55,side:It}));h.rotation.x=-Math.PI/2,h.position.y=.42,h.userData.isPulse=!0,n.add(h);const u=new sl(16774358,i?2.2:.4,18,Math.PI/5,.4);u.position.set(0,8,2),u.target.position.set(0,2,0),n.add(u,u.target)}if(r.cleared){const h=new G(new fe(3.2,24,24),new kt({color:t.accent,transparent:!0,opacity:.07,depthWrite:!1}));h.position.y=2,n.add(h)}if(r.dueCount&&r.dueCount>0&&i){const h=new G(new Gi(2.65,2.9,48),new kt({color:16498468,transparent:!0,opacity:.42,side:It}));h.rotation.x=-Math.PI/2,h.position.y=.5,h.userData.isDueRing=!0,n.add(h)}return n}let Ta=null;async function Lv(){return Ta||(Ta=await cf()),Ta}function Iv(r,e){const t=yr(e.theme),n=e.unlocked,i=n?1:.45,s=new G(new ze(2.4,2.8,.35,24),new Pe({color:t.ground,roughness:.55,metalness:.12,transparent:!n,opacity:i}));s.position.y=.18,s.receiveShadow=!0;const o=new G(new it(2.1,.08,12,48),new Pe({color:t.secondary,emissive:t.accent,emissiveIntensity:n?.35:.08,roughness:.3,metalness:.55,transparent:!n,opacity:i}));o.rotation.x=Math.PI/2,o.position.y=.38,r.add(s,o)}function Dv(r,e,t,n,i){if(t){const s=new G(new Gi(2.3,2.55,48),new kt({color:16498468,transparent:!0,opacity:.55,side:It}));s.rotation.x=-Math.PI/2,s.position.y=.42,s.userData.isPulse=!0,r.add(s);const o=new sl(16774358,n?2.2:.4,18,Math.PI/5,.4);o.position.set(0,8,2),o.target.position.set(0,2,0),r.add(o,o.target)}if(e.cleared){const s=new G(new fe(3.2,24,24),new kt({color:i.accent,transparent:!0,opacity:.07,depthWrite:!1}));s.position.y=2,r.add(s)}if(e.dueCount&&e.dueCount>0&&n){const s=new G(new Gi(2.65,2.9,48),new kt({color:16498468,transparent:!0,opacity:.42,side:It}));s.rotation.x=-Math.PI/2,s.position.y=.5,s.userData.isDueRing=!0,r.add(s)}}function su(r,e){const t=yr(r.theme),n=new G(new wi(.85,1),Po(r.unlocked?t.crystal:7041664,.65));return n.position.y=3.6,n.castShadow=!0,n.userData.isCrystal=!0,e.add(n),n}function Nv(r){let e=null;return r.traverse(t=>{var i;if(e)return;const n=t;(i=n.userData)!=null&&i.isCrystal&&(e=n)}),e}async function Uv(r,e){var l,a,h;const t=await Lv(),n=yr(r.theme),i=r.name.includes("学习圣所"),s=t&&!i?((l=t.nodes)==null?void 0:l[r.id])??((a=t.themes)==null?void 0:a[r.theme])??null:null;if(t&&s){const u=await _v(s.file,s,t);if(u){const f=new gt;Iv(f,r),u.position.y=.35,f.add(u);const _=s.pickMeshNames??((h=t.defaults)==null?void 0:h.pickMeshNames)??["Crystal","PICK"];let d=gv(u,_);return d?d.userData.isCrystal=!0:d=su(r,f),Dv(f,r,e,r.unlocked,n),{root:f,crystal:d}}}const o=Pv(r,e),c=Nv(o)??su(r,o);return{root:o,crystal:c}}function ru(r,e,t){const n=new gt,i=.4,s=.38,o=.14,c=.115,l=new G(new Bi(o,i,5,10),r);l.position.y=-.24200000000000002,l.castShadow=!0,n.add(l);const a=new gt;a.position.y=-.42800000000000005,n.add(a);const h=new G(new Bi(c,s,5,10),e);h.position.y=-.2245,h.castShadow=!0,a.add(h);const u=new G(new we(.18,.1,.36),t);return u.position.set(0,-.426,.08),u.castShadow=!0,a.add(u),{hip:n,knee:a}}function ou(r,e,t){const n=new gt,i=new G(new Bi(t.upperR,t.upperLen,5,10),r);i.position.y=-(t.upperLen/2+t.upperR),i.castShadow=!0,n.add(i);const s=-(t.upperLen+t.upperR*2),o=new G(new Bi(t.lowerR,t.lowerLen,5,10),e);o.position.y=s-(t.lowerLen/2+t.lowerR),o.castShadow=!0,n.add(o);const c=s-(t.lowerLen+t.lowerR*2);if(t.footMat){const l=new G(new we(t.lowerR*2.1,.1,.34),t.footMat);l.position.set(0,c+.04,.08),l.castShadow=!0,n.add(l)}else if(t.endMat&&t.endR){const l=new G(new fe(t.endR,12,10),t.endMat);l.position.y=c,l.castShadow=!0,n.add(l)}return n}function Fv(){const r=new gt;r.name="Explorer";const e=new Pe({color:3100538,roughness:.62,metalness:.08}),t=new Pe({color:2765632,roughness:.78,metalness:.04}),n=new Pe({color:15713440,roughness:.66,metalness:.02}),i=new Pe({color:1713456,roughness:.7,metalness:.06}),s=new Pe({color:2759958,roughness:.8,metalness:.02}),o=new Pe({color:6000111,roughness:.4,metalness:.3,emissive:1784440,emissiveIntensity:.4}),c=new G(new we(.46,.26,.3),t);c.position.y=.98,c.castShadow=!0,r.add(c);const l=new G(new Bi(.3,.4,6,14),e);l.position.y=1.32,l.scale.set(1.12,1,.78),l.castShadow=!0,r.add(l);const a=new G(new it(.26,.04,8,20),o);a.position.y=1.52,a.rotation.x=Math.PI/2,a.scale.set(1.05,.7,1),r.add(a);const h=new G(new we(.5,.08,.34),o);h.position.y=1.1,r.add(h);const u=new G(new we(.4,.5,.22),e);u.position.set(0,1.34,-.32),u.castShadow=!0;const f=new G(new we(.42,.12,.24),o);f.position.set(0,1.5,-.32),r.add(u,f);const _=new gt;_.position.y=1.6;const d=new G(new ze(.1,.12,.14,10),n);d.position.y=.04;const m=new G(new fe(.23,22,22),n);m.position.y=.28,m.castShadow=!0;const p=new G(new fe(.245,18,14,0,Math.PI*2,0,Math.PI*.62),s);p.position.y=.31,_.add(d,m,p);const g=new Pe({color:1450028,roughness:.3,metalness:.1}),x=new fe(.035,10,10),v=new G(x,g);v.position.set(.085,.3,.205);const y=new G(x,g);y.position.set(-.085,.3,.205);const w=new Pe({color:2759958,roughness:.8}),b=new G(new we(.26,.03,.04),w);b.position.set(0,.37,.2);const A=new Pe({color:8011824,roughness:.6}),M=new G(new we(.11,.022,.03),A);M.position.set(0,.2,.216),_.add(v,y,b,M),r.add(_);const T=new gt;T.position.set(0,1.52,-.16);const C=new Pe({color:3894230,roughness:.6,metalness:.1,side:It,emissive:1320798,emissiveIntensity:.25}),P=new G(new xn(.66,.95,1,5),C);P.position.y=-.45,P.castShadow=!0,T.add(P),T.rotation.x=-.18,r.add(T);const I=ru(t,t,i);I.hip.position.set(.16,.88,0);const F=ru(t,t,i);F.hip.position.set(-.16,.88,0),r.add(I.hip,F.hip);const V=ou(e,e,{upperR:.1,upperLen:.26,lowerR:.088,lowerLen:.24,endMat:n,endR:.095});V.position.set(.42,1.5,0);const N=ou(e,e,{upperR:.1,upperLen:.26,lowerR:.088,lowerLen:.24,endMat:n,endR:.095});N.position.set(-.42,1.5,0),r.add(V,N);const O=new G(new fe(.12,14,14),Po(16498468,.9));O.position.set(-.5,1,.12);const z=new En(16498468,1.2,10);z.position.copy(O.position),r.add(O,z);const j=new G(new Gi(.55,.74,36),new kt({color:9684477,transparent:!0,opacity:.32,side:It}));j.rotation.x=-Math.PI/2,j.position.y=.03,j.userData.isFootRing=!0,r.add(j);const se={leftLeg:I,rightLeg:F,leftArm:V,rightArm:N,head:_,cape:T,eyeL:v,eyeR:y,brow:b,mouth:M,mats:{jacket:e,trim:o,cape:C}};return r.userData.rig=se,r}class Ov{constructor(){Q(this,"yaw",0);Q(this,"pitch",.38);Q(this,"targetPos",new L);Q(this,"desiredPos",new L);Q(this,"isDragging",!1);Q(this,"lastX",0);Q(this,"downX",0)}addYaw(e){this.yaw+=e}resetBehind(e){this.yaw=e}update(e,t,n,i){this.isDragging||(this.yaw+=(n-this.yaw)*Math.min(1,i*2.5));const s=Math.cos(this.yaw),o=Math.sin(this.yaw),c=Ef,l=Tf+Math.sin(this.pitch)*3;return this.desiredPos.set(t.x-o*c,t.y+l,t.z-s*c),e.position.lerp(this.desiredPos,1-Math.exp(-5*i)),this.targetPos.set(t.x,t.y+1.55,t.z),e.lookAt(this.targetPos),this.yaw}bindDrag(e){const t=s=>{this.downX=s.clientX,this.lastX=s.clientX,this.isDragging=!1},n=s=>{const o=s.clientX-this.lastX;this.lastX=s.clientX,!this.isDragging&&Math.abs(s.clientX-this.downX)>10&&(this.isDragging=!0),this.isDragging&&this.addYaw(-o*.006)},i=()=>{this.isDragging=!1};e.addEventListener("pointerdown",t),e.addEventListener("pointermove",n),e.addEventListener("pointerup",i),e.addEventListener("pointercancel",i)}}const Bv=new Set(["w","a","s","d","arrowup","arrowdown","arrowleft","arrowright"]);class zv{constructor(){Q(this,"position",new L);Q(this,"yaw",0);Q(this,"moveTarget",null);Q(this,"keys",new Set);Q(this,"stick",{x:0,z:0});Q(this,"enabled",!0);Q(this,"sprint",!1);Q(this,"onKeyDown",e=>{if(!this.enabled)return;const t=e.key.toLowerCase();Bv.has(t)&&this.keys.add(t),t==="shift"&&(this.sprint=!0)});Q(this,"onKeyUp",e=>{const t=e.key.toLowerCase();this.keys.delete(t),t==="shift"&&(this.sprint=!1)});window.addEventListener("keydown",this.onKeyDown),window.addEventListener("keyup",this.onKeyUp)}dispose(){window.removeEventListener("keydown",this.onKeyDown),window.removeEventListener("keyup",this.onKeyUp)}setEnabled(e){this.enabled=e,e||(this.keys.clear(),this.moveTarget=null)}setPosition(e,t,n){this.position.set(e,t,n),this.moveTarget=null}setMoveTarget(e,t){this.moveTarget=new L(e,0,t)}clearMoveTarget(){this.moveTarget=null}setStickInput(e,t){this.stick.x=e,this.stick.z=t,(Math.abs(e)>.12||Math.abs(t)>.12)&&(this.moveTarget=null)}isMoving(){return this.keys.size>0||this.moveTarget!==null||Math.abs(this.stick.x)>.1||Math.abs(this.stick.z)>.1}update(e,t){if(!this.enabled)return;let n=0,i=0;if(this.moveTarget){const s=new L().subVectors(this.moveTarget,this.position);s.y=0,s.length()<.45?this.moveTarget=null:(s.normalize(),n=s.x,i=s.z,this.yaw=Math.atan2(n,i))}else{let s=(this.keys.has("w")||this.keys.has("arrowup")?1:0)-(this.keys.has("s")||this.keys.has("arrowdown")?1:0),o=(this.keys.has("d")||this.keys.has("arrowright")?1:0)-(this.keys.has("a")||this.keys.has("arrowleft")?1:0);if((Math.abs(this.stick.x)>.1||Math.abs(this.stick.z)>.1)&&(s=this.stick.z,o=this.stick.x),s!==0||o!==0){const c=Math.sin(t),l=Math.cos(t);n=o*l+s*c,i=o*-c+s*l;const a=Math.hypot(n,i)||1;n/=a,i/=a,this.yaw=Math.atan2(n,i)}}if(n!==0||i!==0){const s=Af*(this.sprint?1.85:1)*e;this.position.x+=n*s,this.position.z+=i*s}this.position.y=Ot(this.position.x,this.position.z,Ft)+.05}isSprinting(){return this.sprint&&this.isMoving()}}function kv(r,e){const t=document.createElement("canvas");t.width=512,t.height=128;const n=t.getContext("2d");n.fillStyle=e?"rgba(8, 18, 40, 0.72)":"rgba(40, 40, 40, 0.55)",au(n,8,8,496,112,20),n.fill(),n.strokeStyle=e?"rgba(147, 197, 253, 0.55)":"rgba(120, 120, 120, 0.4)",n.lineWidth=3,au(n,8,8,496,112,20),n.stroke(),n.fillStyle=e?"#f3f4f6":"#9ca3af",n.font="bold 28px 'Noto Sans SC', 'Microsoft YaHei', sans-serif";const i=r.length>22?r.slice(0,21)+"…":r;n.fillText(i,24,72);const s=new Mi(t);s.colorSpace=Et;const o=new xi({map:s,transparent:!0,depthWrite:!1}),c=new Ii(o);return c.scale.set(10,2.5,1),c.position.y=7.2,c.userData.isSignpost=!0,c}function au(r,e,t,n,i,s){r.beginPath(),r.moveTo(e+s,t),r.lineTo(e+n-s,t),r.quadraticCurveTo(e+n,t,e+n,t+s),r.lineTo(e+n,t+i-s),r.quadraticCurveTo(e+n,t+i,e+n-s,t+i),r.lineTo(e+s,t+i),r.quadraticCurveTo(e,t+i,e,t+i-s),r.lineTo(e,t+s),r.quadraticCurveTo(e,t,e+s,t),r.closePath()}const Gv={unit01:{id:"unit01",label:"数字时代",skyTop:265758,skyMid:795204,skyBot:529968,fogColor:925752,fogDensity:.003,sunColor:5286655,sunIntensity:1,hemiSky:2121904,hemiGround:530472,ambientColor:1593504,terrainTint:[.04,.14,.28],crystalColor:4237567,orbColor:54527,glowColor:35071,pathColor:1073328,decorStyle:"coast"},unit02:{id:"unit02",label:"传记人物",skyTop:4216427,skyMid:10195583,skyBot:14469544,fogColor:9800311,fogDensity:.0024,sunColor:16767398,sunIntensity:1.5,hemiSky:14865855,hemiGround:6443844,ambientColor:10982775,terrainTint:[.34,.28,.19],crystalColor:12158786,orbColor:14861696,glowColor:10317105,pathColor:7755311,decorStyle:"market"},unit03:{id:"unit03",label:"旅行探索",skyTop:1254700,skyMid:4811098,skyBot:9545621,fogColor:5992549,fogDensity:.0028,sunColor:16765345,sunIntensity:1.2,hemiSky:11388607,hemiGround:4014131,ambientColor:9018504,terrainTint:[.15,.23,.13],crystalColor:8631946,orbColor:12112526,glowColor:7448204,pathColor:5467990,decorStyle:"forest"},unit04:{id:"unit04",label:"劳动传统",skyTop:1907482,skyMid:5326395,skyBot:8615781,fogColor:5129275,fogDensity:.0028,sunColor:16766624,sunIntensity:1.25,hemiSky:13351073,hemiGround:3485481,ambientColor:9206116,terrainTint:[.2,.15,.1],crystalColor:13211224,orbColor:14991228,glowColor:11827778,pathColor:7822656,decorStyle:"temple"},unit05:{id:"unit05",label:"航天探索",skyTop:1120556,skyMid:3427178,skyBot:7439252,fogColor:5333879,fogDensity:.0026,sunColor:14018047,sunIntensity:1.15,hemiSky:10992338,hemiGround:3356999,ambientColor:7571880,terrainTint:[.2,.21,.25],crystalColor:9682408,orbColor:14412543,glowColor:7973087,pathColor:5401992,decorStyle:"space"},unit06:{id:"unit06",label:"共益交易城",skyTop:1059642,skyMid:4287600,skyBot:6323577,fogColor:3427666,fogDensity:.0028,sunColor:16765850,sunIntensity:1.25,hemiSky:10207178,hemiGround:4207917,ambientColor:7903642,terrainTint:[.085,.13,.125],crystalColor:14001007,orbColor:8243632,glowColor:5152657,pathColor:3501415,decorStyle:"exchange"}},Ac={id:"default",label:"",skyTop:3824266,skyMid:5929642,skyBot:659488,fogColor:1713472,fogDensity:.0042,sunColor:16774368,sunIntensity:1.45,hemiSky:13164799,hemiGround:2373672,ambientColor:10137804,terrainTint:[.09,.2,.1],crystalColor:6333946,orbColor:8438015,glowColor:4231406,pathColor:3170464,decorStyle:"forest"};function Vv(r){return r?Gv[r]??Ac:Ac}function Rc(r,e=Et,t=1024){const n=document.createElement("canvas");n.width=t,n.height=t,r(n.getContext("2d"),t);const i=new Mi(n);return i.wrapS=i.wrapT=Fi,i.colorSpace=e,i.generateMipmaps=!0,i.minFilter=On,i}function Hv(){const r=Qn(20260616),e=Rc((n,i)=>{n.fillStyle="#9a9a9a",n.fillRect(0,0,i,i);for(let s=0;s<60;s++){const o=r()*i,c=r()*i,l=30+r()*120,a=110+r()*110,h=n.createRadialGradient(o,c,0,o,c,l);h.addColorStop(0,`rgba(${a},${a},${a},0.5)`),h.addColorStop(1,"rgba(0,0,0,0)"),n.fillStyle=h,n.beginPath(),n.arc(o,c,l,0,Math.PI*2),n.fill()}for(let s=0;s<14e3;s++){const o=120+r()*100;n.fillStyle=`rgba(${o},${o},${o},0.5)`,n.fillRect(r()*i,r()*i,1.5,1.5)}},Un),t=Rc((n,i)=>{n.fillStyle="#8080ff",n.fillRect(0,0,i,i);for(let s=0;s<12e3;s++){const o=96+r()*64,c=96+r()*64;n.fillStyle=`rgb(${o|0},${c|0},255)`;const l=1.5+r()*2.5;n.fillRect(r()*i,r()*i,l,l)}for(let s=0;s<40;s++){const o=r()*i,c=r()*i,l=24+r()*90,a=n.createRadialGradient(o,c,0,o,c,l);a.addColorStop(0,`rgba(${100+r()*50|0},${100+r()*50|0},255,0.4)`),a.addColorStop(1,"rgba(128,128,255,0)"),n.fillStyle=a,n.beginPath(),n.arc(o,c,l,0,Math.PI*2),n.fill()}},Un);return e.repeat.set(14,18),t.repeat.set(14,18),{roughness:e,normal:t}}function Wv(){const r=Qn(20260930),e=Rc((t,n)=>{const i=t.createLinearGradient(0,0,n,n);i.addColorStop(0,"#ece9df"),i.addColorStop(.48,"#e6e6df"),i.addColorStop(1,"#e0e5df"),t.fillStyle=i,t.fillRect(0,0,n,n);for(let s=0;s<88;s++){const o=34+r()*116,c=r()*n,l=r()*n,h=r()>.56?"112,96,72":"76,104,88",u=.018+r()*.026,f=t.createRadialGradient(c,l,0,c,l,o);f.addColorStop(0,`rgba(${h},${u})`),f.addColorStop(1,`rgba(${h},0)`),t.fillStyle=f,t.beginPath(),t.arc(c,l,o,0,Math.PI*2),t.fill()}for(let s=0;s<12e3;s++){const o=r()>.52,c=o?"255,255,248":"62,75,65";t.fillStyle=`rgba(${c},${o?.055:.035+r()*.025})`,t.fillRect(r()*n,r()*n,.5+r()*1.7,.5+r()*1.7)}},Et,1024);return e.repeat.set(14,18),e}const Xv={unit01:{section_a:["message","dialogue","focus","listening-bench"],section_b:["notification","study-desk","filter","offline-rest"],section_c:["clinic","telemedicine","community","community-network"]},unit02:{section_a:["timeline","route-evidence","perseverance","archive-crossroads"],section_b:["spotlight","humanitarian","lasting-service","community-witness"],section_c:["fleet","peace-contact","chart-room","exchange-harbor"]},unit03:{section_a:["itinerary","detour","market-encounter","reflection-garden"],section_b:["hostel","open-route","rain-shelter","confidence"],section_c:["rail-platform","rail-car","landscape-window","route-network"]},unit04:{section_a:["career","bench","violin","work-dignity"],section_b:["caliper","craft-quality","craft-evolution","trust-bridge"],section_c:["loom","embroidery-table","heritage","living-heritage"]},unit05:{section_a:["lunar-probe","relay-bridge","sample-lab","moon-horizon"],section_b:["test-console","orbit-adjustment","systems-simulation","mission-control"],section_c:["training","crew-simulation","science-exhibit","future-frontier"]},unit06:{section_a:["bookshop","exchange","resilience","budget-board"],section_b:["exchange-wall","resource-cycle","trust-ledger","sustainable-market"],section_c:["library","digital-lending","community-library","knowledge-bridge"]}};function qv(r,e,t,n){const i=new gt;i.name=["unit-landscape",r.id,t??"hub"].join("-");const s=Kv(r,t),o=new ye(s.accent),c=new ye(s.secondary),l=new ye(...r.terrainTint);l.multiplyScalar(.88);const a=new Pe({color:l,roughness:.72,metalness:.16}),h=new Pe({color:3426398,roughness:.84,metalness:.12}),u=new Pe({color:c,emissive:c,emissiveIntensity:1.2,roughness:.2,metalness:.36}),f=new Pe({color:o,emissive:o,emissiveIntensity:.75,roughness:.18,metalness:.42});if(h.fog=!1,u.fog=!1,f.fog=!1,qt(t)&&(u.emissiveIntensity=.56,f.emissiveIntensity=.42,h.color.set(4610672),h.roughness=.86,h.metalness=.08),qt(t)?Yv(i,s.route,f):(Zv(i,a,h,u,f),Qv(i,h,u,f)),qt(t)){const d=new gt;cu(d,t,n,a,h,u,f,o,r.id),d.scale.setScalar(.78),d.position.set(0,1.8,-15),i.add(d)}else cu(i,t,n,a,h,u,f,o,r.id)||$v(i,t,a,h,u,f);qt(t)||Jv(i,t,n,s.accent);const _=new gt;switch(r.decorStyle){case"coast":e1(_,h,u,f,qt(t));break;case"market":t1(_,a,h,u);break;case"forest":n1(_,a,u,f,qt(t));break;case"temple":i1(_,a,h,u,f,qt(t));break;case"space":s1(_,h,u,f,qt(t));break;case"exchange":r1(_,a,h,u,f,qt(t));break;default:o1(_,a,h,u,f);break}return qt(t)?(_.scale.setScalar(.72),_.position.z=14):(_.scale.setScalar(.62),_.position.z=1.5),i.add(_),i.traverse(d=>{d.castShadow=d instanceof G,d.receiveShadow=d instanceof G&&!qt(t)}),i}function qt(r){return!!(r&&(/^section_[abc]-world-\d+$/.test(r)||/^lab-vocab-\d+$/.test(r)||["lab-grammar","lab-cloze","lab-translation","project-reading","project-listening","project-writing","project-memory"].includes(r)))}function Yv(r,e,t){const n=new Pe({color:e,emissive:e,emissiveIntensity:.12,roughness:.62,metalness:.12});for(let i=0;i<5;i++){const s=1.8+i*2.1,o=.54+i*.32,c=new G(new we(5.2,.18,3.3),n);c.position.set(i%2===0?-.28:.28,o,s),c.rotation.y=i%2===0?-.035:.035,c.userData.isLandscapeRoute=!0,r.add(c);const l=new G(new Je(.34,0),t);l.position.set(0,o+.42,s),l.userData.isLandscapeBeacon=!0,r.add(l)}}function Kv(r,e){if(!e||e==="hub")return{accent:r.crystalColor,secondary:r.orbColor,route:r.pathColor};const t=e.match(/^(section_[abc])-world-(\d+)$/);if(t){const l={section_a:[{accent:6478079,secondary:12120575,route:2918143},{accent:7992016,secondary:12713968,route:2329464},{accent:16762218,secondary:16769443,route:10316573},{accent:16032511,secondary:16767339,route:10247423}],section_b:[{accent:7977215,secondary:12048639,route:3633083},{accent:11903231,secondary:14735359,route:6900418},{accent:6809765,secondary:12255189,route:2656598},{accent:16760184,secondary:16768948,route:10971945}],section_c:[{accent:16743282,secondary:16761210,route:14046034},{accent:16164541,secondary:16766692,route:11555446},{accent:8185807,secondary:13041648,route:3313017},{accent:16765802,secondary:16772522,route:10384424}]}[t[1]][(Number(t[2])-1)%4];return{accent:new ye(l.accent).lerp(new ye(r.crystalColor),.66).getHex(),secondary:new ye(l.secondary).lerp(new ye(r.orbColor),.56).getHex(),route:new ye(l.route).lerp(new ye(r.pathColor),.6).getHex()}}const n=e.match(/^lab-vocab-(\d+)$/);if(n){const c=[5625599,7659696,11903231,16760425,16748445,9353215],l=c[(Number(n[1])-1)%c.length];return{accent:new ye(l).lerp(new ye(r.crystalColor),.52).getHex(),secondary:r.orbColor,route:r.pathColor}}const s={"lab-grammar":{accent:8246268,secondary:14412542,route:3766200},"lab-cloze":{accent:8703150,secondary:13761253,route:2521693},"lab-translation":{accent:12887551,secondary:15785215,route:7819445},"project-reading":{accent:16763760,secondary:16772533,route:10777384},"project-listening":{accent:7723007,secondary:12251647,route:3636647},"project-writing":{accent:16754812,secondary:16768705,route:10442550},"project-memory":{accent:13869823,secondary:15850751,route:7491766}}[e];return s?{accent:new ye(s.accent).lerp(new ye(r.crystalColor),.58).getHex(),secondary:new ye(s.secondary).lerp(new ye(r.orbColor),.5).getHex(),route:new ye(s.route).lerp(new ye(r.pathColor),.58).getHex()}:{"section-a":{accent:6478079,secondary:12120575,route:2918143},"section-b":{accent:16762218,secondary:16769443,route:10316573},"stories-of-china":{accent:16743282,secondary:16761210,route:14046034},"learning-lab":{accent:9437118,secondary:8246268,route:3257214},"unit-project":{accent:16032511,secondary:16767339,route:10247423}}[e]??{accent:r.crystalColor,secondary:r.orbColor,route:r.pathColor}}function cu(r,e,t,n,i,s,o,c,l){var p,g;if(!e)return!1;const a=(x,v,y,w,b,A=0)=>{const M=new G(x,v);return M.position.set(y,w,b),M.rotation.y=A,r.add(M),M},h=(x=5.2)=>{const v=s.clone();qt(e)&&(v.color.copy(c),v.emissive.copy(c),v.emissiveIntensity=.24,v.roughness=.42,v.metalness=.16);const y=a(new Je(1.7,1),v,0,x,27);return y.userData.isLandscapeBeacon=!0,y},u=(x,v,y=Math.PI/2)=>{const w=a(new it(x,.16,8,40),o,0,v,27);return w.rotation.x=y,w.userData.isLandscapeRing=!0,w},f=e.match(/^(section_[abc])-world-(\d+)$/);if(f){const x=f[1],v=Number(f[2]),y=(t??"").split(" · ")[0],w=/connection|conversation|communication|dialogue|social/i.test(y),b=a(new ze(7.8,8.8,.48,8),i,0,.92,27);if(b.userData.isLandscapeStage=!0,l==="unit06"&&x==="section_a"&&v===1){const T=new Pe({color:6441526,roughness:.78,metalness:.04});a(new we(9.2,4.8,.42),T,0,3.7,29);for(const z of[-4.2,4.2])a(new we(.42,5,.5),o,z,3.8,27.2);for(const z of[1.75,2.7,3.65,4.6])a(new we(7.9,.14,.6),n,0,z,27.15);const C=[15905643,8440756,10205679,14976898].map(z=>new Pe({color:z,roughness:.72}));for(let z=0;z<3;z++)for(let j=0;j<8;j++){const se=.42+(z+j)%3*.1,me=a(new we(.42,se,.34),C[(z*3+j)%C.length],-3.5+j,1.84+z*.95+se/2,26.78);me.userData.isLandscapeStage=!0}a(new we(6.2,.9,1.05),i,0,1.65,23.7),a(new we(6.45,.16,1.18),s,0,2.18,23.7);for(let z=0;z<3;z++){const j=a(new we(.92,.16,.7),C[z],-1.8+z*1.8,2.37,23.7);j.userData.isLandscapeStage=!0}const P=a(new we(10.2,.32,2.3),n,0,6.25,26.2);P.userData.isLandscapeStage=!0,a(new we(8.45,1.62,.18),T,0,5.55,27.02);const I=document.createElement("canvas");I.width=1024,I.height=192;const F=I.getContext("2d");if(F){F.fillStyle="#24483f",F.fillRect(0,0,I.width,I.height),F.strokeStyle="#d9b77a",F.lineWidth=8,F.strokeRect(12,12,I.width-24,I.height-24),F.fillStyle="#fff4dc",F.textAlign="center",F.textBaseline="middle",F.font="bold 68px Arial, sans-serif",F.fillText("BOOK EXCHANGE",512,67),F.font="bold 32px Arial, sans-serif",F.fillText("LEAVE ONE  ·  TAKE ONE",512,145);const z=new Mi(I);z.colorSpace=Et;const j=new G(new xn(8.05,1.38),new kt({map:z,side:It,toneMapped:!1}));j.position.set(0,5.55,26.88),j.rotation.y=Math.PI,r.add(j)}const V=new En(16768160,2.4,18,2);V.position.set(0,5.2,22.6),r.add(V);const N=new zi([new L(-2.2,2.65,24.2),new L(0,3.3,25.4),new L(2.2,2.65,26.6)]),O=new G(new Si(N,16,.065,7,!1),o);return O.userData.isLandscapeRoute=!0,r.add(O),!0}const A=(g=(p=Xv[l])==null?void 0:p[x])==null?void 0:g[v-1];if(A&&A!=="bookshop"&&!(A==="dialogue"&&x==="section_a"&&v===1&&w))return jv(r,A,a,n,i,s,o,h,u),!0;if(x==="section_a")if(v===1&&w){a(new we(6.2,.32,4.8),n,-1.9,4,27,-.12),a(new we(6.2,.32,4.8),s,1.9,4,27,.12);for(const I of[-1.9,1.9]){const F=a(new ze(.24,.34,2.7,8),i,I,2.5,27);F.userData.isLandscapeStage=!0}const T=(I,F,V,N)=>{const O=new ps;O.moveTo(-1.15,-.62),N?(O.lineTo(.22,-.62),O.lineTo(.62,-1.08),O.lineTo(.74,-.62)):(O.lineTo(-.72,-.62),O.lineTo(-.62,-1.08),O.lineTo(-.22,-.62)),O.lineTo(1.02,-.62),O.quadraticCurveTo(1.22,-.62,1.22,-.42),O.lineTo(1.22,.48),O.quadraticCurveTo(1.22,.68,1.02,.68),O.lineTo(-1.02,.68),O.quadraticCurveTo(-1.22,.68,-1.22,.48),O.lineTo(-1.22,-.42),O.quadraticCurveTo(-1.22,-.62,-1.15,-.62);const z=a(new Eo(O,{depth:.34,bevelEnabled:!0,bevelSegments:2,steps:1,bevelSize:.055,bevelThickness:.055,curveSegments:8}),V,I,F,26.7);z.userData.isLandscapeStage=!0};T(-2.1,5.6,o,!0),T(2.1,4.9,s,!1);const C=new Pe({color:15857919,emissive:12183551,emissiveIntensity:.24,roughness:.34});for(const[I,F]of[[-2.1,5.6],[2.1,4.9]])for(const V of[-.38,0,.38])a(new fe(.085,8,6),C,I+V,F,26.62);const P=new G(new Si(new zi([new L(-.9,5.25,26.7),new L(0,4.35,26.7),new L(.9,4.55,26.7)]),20,.08,6,!1),o);P.userData.isLandscapeRoute=!0,r.add(P)}else if(v===1){for(const T of[-3.6,3.6])a(new ze(.55,.82,5.6,8),n,T,3.8,27);a(new we(9,.32,.52),o,0,6.7,27),h(5.1),u(3.2,4.4,.18)}else if(v===2){for(const C of[-4,4])a(new ze(.62,.9,7.2,8),n,C,4.4,27);a(new we(10,.42,.5),o,0,8.2,27),h(4.9).scale.setScalar(.8),u(3.4,4.9,Math.PI/2.3)}else if(v===3){for(const T of[-1,1]){const C=a(new we(2.3,.32,10),n,T*2.8,1.35,27,T*.3);C.userData.isLandscapeRoute=!0}h(5.8),u(3.1,1.7)}else{for(const T of[-4.8,4.8])a(new ze(.72,1,8,8),o,T,4.8,27);a(new it(5,.22,8,40,Math.PI),s,0,8.8,27,Math.PI),h(5.2)}else if(x==="section_b")if(v===1){for(const[T,C]of[[-5,5],[0,8],[5,6]])a(new we(2.4,C,.5),n,T,C/2+1.1,27);for(const T of[3.2,5.8])a(new we(11,.16,.28),o,0,T,27);h(10)}else if(v===2)a(new ze(1.8,2.3,7.4,10),s,0,4.7,27),u(4.8,4.7,.42),u(4.8,4.7,-.42),h(9.2);else if(v===3)a(new ze(5.8,6.5,1,12),n,0,2,27),a(new fe(4.2,16,8,0,Math.PI*2,0,Math.PI/2),o,0,2.5,27),a(new ze(1.1,1.6,6.2,8),i,0,5.4,27),h(9.4);else{a(new ze(.55,.9,5.5,8),i,0,3.4,27);const T=a(new we(12,.42,1.1),o,0,6.1,27,.06);T.userData.isLandscapeRoute=!0;for(const C of[-5,5]){const P=a(new fe(1.2,12,8),s,C,6.8,27);P.userData.isLandscapeBeacon=!0}u(4.3,1.5)}else if(v===1){for(const[C,P,I]of[[5.8,2.3,8],[4.6,4.3,6],[3.3,6.1,5]])a(new ze(C,C+.55,.72,I),n,0,P,27);const T=a(new Je(1.9,1),s,0,9,27);T.userData.isLandscapeBeacon=!0,u(2.8,9)}else if(v===2){for(const T of[0,Math.PI/2,Math.PI,Math.PI*3/2]){const C=Math.cos(T)*4.7,P=27+Math.sin(T)*4.7,I=a(new ze(.5,.78,5.8,8),n,C,3.8,P);I.userData.isLandscapeBeacon=!0;const F=a(new fe(.72,10,8),s,C,7.1,P);F.userData.isLandscapeBeacon=!0}u(6,1.8),h(4.5)}else if(v===3){for(const C of[-5,5])a(new ze(.65,1,7.4,8),o,C,4.4,27);const T=a(new we(12,.4,2.6),n,0,3.2,27);T.userData.isLandscapeRoute=!0,a(new it(4.2,.18,8,36),s,0,7.5,27,Math.PI/2),h(5.2)}else{for(const[T,C]of[[-4,24],[4,24],[-4,30],[4,30]])a(new we(1.2,5.6,1.2),n,T,3.8,C);h(8.4),u(4.6,2)}return!0}const _=e.match(/^lab-vocab-(\d+)$/);if(_){const x=Number(_[1]);for(let v=0;v<5;v++){const y=v/5*Math.PI*2,w=Math.cos(y)*5.1,b=27+Math.sin(y)*5.1,A=a(new we(1.35,2.2+(v+x)%2*.8,1.35),n,w,2.1,b,y);A.userData.isLandscapeStage=!0;const M=a(new Je(.82,1),s,w,4.2,b);M.userData.isLandscapeBeacon=!0}return u(6.4,1.1),!0}if(e==="lab-grammar"){for(const x of[-4.5,4.5])a(new ze(.7,.95,7.2,8),n,x,4.4,27);return a(new it(4.5,.24,8,40,Math.PI),o,0,8,27,Math.PI),h(4.9),!0}if(e==="lab-cloze"){for(const x of[-4.1,4.1]){const v=a(new we(4.4,.35,5.6),n,x,2,27);v.userData.isLandscapeRoute=!0}for(const x of[-1.5,0,1.5]){const v=a(new Je(.62,0),s,x,2.6,27);v.userData.isLandscapeBeacon=!0}return u(5.2,1.2),!0}if(e==="lab-translation"){for(const v of[-4.5,4.5]){a(new ze(.62,.92,7.4,8),n,v,4.4,27);const y=a(new it(2.4,.16,8,32),o,v,5.4,27,Math.PI/2);y.userData.isLandscapeRing=!0}const x=a(new we(8,.26,.28),s,0,5,27);return x.userData.isLandscapeRoute=!0,!0}const m={"project-reading":"reading","project-listening":"listening","project-writing":"writing","project-memory":"memory"}[e];if(!m)return!1;if(m==="reading")a(new we(7.4,.34,5.2),n,-2,3.7,27,-.14),a(new we(7.4,.34,5.2),s,2,3.7,27,.14),a(new we(.3,2.1,5.3),o,0,2.6,27),u(4.6,1.2);else if(m==="listening"){for(const[x,v]of[[2.4,3],[3.8,4.6],[5.3,6.2]]){const y=a(new it(x,.15,8,40),o,0,v,27,Math.PI/2.15);y.userData.isLandscapeRing=!0}h(3.4)}else if(m==="writing"){a(new we(8.5,.55,5.2),i,0,2.4,27),a(new we(5.8,.18,3.4),s,0,2.8,27,-.08);for(const x of[-3.4,3.4])a(new we(.35,2.6,.35),o,x,1.2,25.4);h(5.2)}else{for(let x=0;x<4;x++){const v=x*Math.PI/3,y=a(new fe(.72,12,8),s,Math.cos(v)*5.3,2.6+x%2,27+Math.sin(v)*5.3);y.userData.isLandscapeBeacon=!0}u(5.6,1.3,.52),h(6.1)}return!0}function jv(r,e,t,n,i,s,o,c,l){const a=(d,m,p,g,x,v,y=n,w=0)=>{const b=t(new we(g,x,v),y,d,m,p,w);return b.userData.isLandscapeStage=!0,b},h=(d,m,p,g,x,v=n,y=10)=>{const w=t(new ze(g*.86,g,x,y),v,d,m,p);return w.userData.isLandscapeStage=!0,w},u=(d,m=o,p=.12)=>{const g=new zi(d.map(([v,y,w])=>new L(v,y,w))),x=new G(new Si(g,28,p,8,!1),m);x.userData.isLandscapeRoute=!0,x.castShadow=!0,x.receiveShadow=!0,r.add(x)},f=(d,m,p=n,g=27,x=0)=>{a(x-d/2,m/2,g,.52,m,.62,p),a(x+d/2,m/2,g,.52,m,.62,p),a(x,m,g,d+.52,.5,.62,p)},_=(d,m,p,g,x=.48)=>{const v=[n,o,s,i];a(d,m,p,x,.74+g%2*.16,.34,v[g%v.length],(g%3-1)*.035)};switch(e){case"message":{const d=new Pe({color:3495284,roughness:.92,metalness:.02});for(const[y,w,b,A,M,T]of[[-6.15,4.25,28.7,1.35,2.05,.76],[-7.45,3.55,25.65,1.05,1.55,.65],[6.15,4.25,28.7,1.35,2.05,.76],[7.45,3.55,25.65,1.05,1.55,.65]]){const C=t(new vi(1.6,0),d,y,w,b);C.scale.set(A,M,T),C.rotation.z=y<0?-.035:.035,C.userData.isLandscapeStage=!0}a(-3.9,3.95,26.35,1.9,3.55,.48,i),a(-3.9,3.95,26.06,1.48,3.05,.08,n);for(const[y,w,b]of[[-4.12,4.75,1.08],[-3.65,4.18,.94],[-4.08,3.55,1.12]])a(y,w,25.98,b,.18,.08,o);const m=t(new fe(.2,10,8),s,-3.9,6.18,25.98);m.userData.isLandscapeBeacon=!0;for(const[y,w,b]of[[-1.65,4.7,o],[0,5.45,s],[1.62,4.82,o]]){a(y,w,26.35,1.05,.66,.16,b,y*.035);for(const A of[-.2,0,.2]){const M=t(new fe(.055,7,6),i,y+A,w,26.24);M.userData.isLandscapeBeacon=!0}}a(3.72,1.8,27.1,2.25,.3,.9,n);for(const y of[2.9,4.54])a(y,1.42,27.1,.14,.55,.16,i);const p=t(new ze(.36,.52,1.36,8),i,3.72,2.72,27.1);p.userData.isLandscapeStage=!0;const g=t(new fe(.44,12,10),n,3.72,3.72,27.1);g.userData.isLandscapeStage=!0;const x=a(-1.8,1.74,25.35,1.8,.42,.72,n);x.rotation.z=-.08;for(const y of[-2.28,-1.8,-1.32])a(y,2.03,25.26,.3,.06,.42,o);u([[-3.15,5.9,26.22],[-1.72,5.2,26.22],[0,5.7,26.22],[1.75,5.05,26.22],[3.18,4.4,26.22]],o,.075),u([[-5.5,1.35,27],[-3.7,1.35,25.4],[0,1.35,25.4],[3.7,1.35,25.4],[5.5,1.35,27]],s,.095);const v=new En(7393279,.9,15,2);v.position.set(0,5.4,25.2),r.add(v);break}case"dialogue":{for(const[x,v]of[25.1,27.5,29.9].entries()){f(9.3-x*.45,6.45-x*.2,x===1?o:n,v);const y=t(new it(3.95-x*.18,.075,7,24,Math.PI),x===1?s:o,0,2.95,v+.05);y.userData.isLandscapeStage=!0}u([[-4.2,6.35,25.1],[-4.1,6.65,27.5],[-3.9,6.45,29.9]],o,.075),u([[4.2,6.35,25.1],[4.1,6.65,27.5],[3.9,6.45,29.9]],o,.075),u([[0,6.6,25.1],[0,6.9,27.5],[0,6.6,29.9]],s,.075),h(0,1.52,26.35,.34,1.32,i,10),h(0,2.24,26.35,1.68,.22,n,12);const d=t(new Je(.34,1),s,0,2.55,26.35);d.userData.isLandscapeBeacon=!0;const m=[o,s,n];for(const[x,v]of[-3.25,0,3.25].entries()){a(v,1.62,28,1.16,.24,.92,i,v*-.04),a(v,2.02,28.38,1.08,.78,.16,n,v*-.04);const y=t(new ze(.34,.48,1.22,8),m[x],v,2.82,28);y.userData.isLandscapeStage=!0;const w=t(new fe(.4,12,10),n,v,3.72,28);w.userData.isLandscapeStage=!0}const p=new Pe({color:6929809,emissive:1457453,emissiveIntensity:.28,roughness:.86});for(const[x,v]of[[-5.3,26.2],[5.3,26.2],[-5.3,29.1],[5.3,29.1]]){h(x,1.55,v,.43,.62,i,8),h(x,2.22,v,.08,1.05,o,7);const y=t(new vi(.46,0),p,x,2.95,v);y.scale.set(.8,1.35,.8),y.userData.isLandscapeStage=!0}a(-4.35,1.63,25.55,1.42,.34,.76,i);for(const x of[-4.78,-4.35,-3.92])a(x,1.9,25.48,.24,.08,.38,o);for(const[x,v]of[[.65,4.75],[.98,4.95],[1.31,5.15]]){const y=t(new it(x,.055,7,24,Math.PI),s,0,v,27.78);y.userData.isLandscapeRoute=!0}u([[-3.2,4.25,27.78],[0,5.25,27.78],[3.2,4.25,27.78]],o,.07);const g=new En(10283208,.85,16,2);g.position.set(0,5.4,25.7),r.add(g);break}case"focus":{const d=h(0,1.5,27,3.4,.34,n,12);d.userData.isLandscapeRoute=!0,a(0,2.2,27,2.1,.18,1.6,s,-.08);for(const p of[-3.2,3.2]){const g=t(new Je(.36,0),i,p,3.4,27);g.userData.isLandscapeBeacon=!0}const m=t(new Je(1.02,1),o,0,4.25,27);m.userData.isLandscapeBeacon=!0,l(4.7,1.05,.08);break}case"listening-bench":{h(0,1.18,27,5.1,.34,i,12);for(const m of[-2.25,2.25]){a(m,1.78,27,1.85,.22,.78,n),a(m,2.34,m<0?27.38:26.62,1.85,.78,.18,o,m<0?-.04:.04);for(const p of[26.72,27.28])h(m,1.42,p,.1,.58,i,8)}for(const m of[-1.7,1.7]){const p=h(m,2.55,27,.34,1.02,m<0?o:n,8);p.userData.isLandscapeStage=!0;const g=t(new fe(.37,12,10),n,m,3.28,27);g.userData.isLandscapeStage=!0}const d=t(new Je(.46,1),s,0,3.22,27);d.userData.isLandscapeBeacon=!0,u([[-1.18,3.05,27],[-.55,3.55,27],[.42,3.55,27],[1.18,3.05,27]],o,.075);for(const[m,p]of[[.82,4.26],[1.18,4.56],[1.54,4.86]]){const g=t(new it(m,.055,7,28,Math.PI),s,0,p,27.25);g.userData.isLandscapeRoute=!0}l(4.75,1.05,.12);break}case"notification":{for(const[d,m,p]of[[-3.4,4.1,.86],[0,5.6,1.08],[3.4,4.5,.9]]){a(d,m,27,2.2*p,2.8*p,.42,i,d*.035),a(d,m,26.73,1.88*p,2.44*p,.1,s,d*.035);const g=t(new fe(.22*p,10,8),o,d+.58*p,m+.68*p,26.6);g.userData.isLandscapeBeacon=!0}u([[-4.4,1.55,27],[0,1.55,27],[4.4,1.55,27]],n,.18);break}case"study-desk":{a(0,2.45,27,6.4,.42,2.6,n);for(const m of[-2.65,2.65])for(const p of[26.15,27.85])a(m,1.35,p,.22,2,.22,i);a(-.55,2.75,26.45,1.5,.16,1,s,-.12),h(2.15,3.15,27,.12,1.3,o,8),a(1.82,3.82,27,.8,.14,.54,o,-.18);const d=t(new fe(.3,10,8),s,1.82,3.55,26.73);d.userData.isLandscapeBeacon=!0;break}case"filter":{for(const[d,m,p]of[[-4,4.1,n],[0,5.8,o],[4,4.1,n]]){f(2.2,4.2,p,27,d);const g=t(new it(1.5,.11,8,28),s,d,m,26.5);g.userData.isLandscapeRing=!0}u([[-4,2,27],[-2,2.7,27],[0,3.7,27],[2,2.7,27],[4,2,27]],o,.16);break}case"offline-rest":{f(7.2,6.2,o,27),a(-2.4,2.2,27,2.2,.24,.74,n);for(const m of[-3.15,-1.65])a(m,1.72,27,.14,.76,.16,i);const d=t(new fe(.72,12,10),s,2.15,3.5,27);d.userData.isLandscapeBeacon=!0,u([[-4.8,1.15,27],[-2.4,1.35,27],[0,1.2,27],[2.2,2.1,27]],o,.12);break}case"clinic":{a(0,3.45,27,8,4.5,2.3,n),a(0,3.38,25.78,1.25,3.18,.18,i);for(const d of[-2.5,2.5])a(d,4.05,25.78,1.14,1.1,.18,s);a(0,6.35,25.72,.55,1.8,.18,o),a(0,6.35,25.7,1.8,.55,.2,o),u([[0,1.2,29],[0,1.25,27],[0,1.3,25.8]],o,.14);break}case"telemedicine":{f(9.4,6.5,n,27),a(0,4.5,26.58,4.8,3.2,.16,i),a(0,4.55,26.45,4.18,2.6,.1,s);for(const d of[-4.2,4.2]){const m=t(new fe(.55,12,10),o,d,2.7,27);m.userData.isLandscapeBeacon=!0}u([[-4.2,2.9,27],[-2.3,3.5,27],[0,3.2,27],[2.3,3.5,27],[4.2,2.9,27]],o,.1);break}case"community":{for(const[m,p]of[[-4,2.8],[-1.4,4.1],[1.5,3.1],[4,4.5]]){a(m,1.3+p/2,27,1.8,p,1.8,n);const g=t(new Yt(1.4,1.2,4),o,m,2+p,27);g.rotation.y=Math.PI/4,g.userData.isLandscapeStage=!0}const d=t(new fe(.58,12,10),s,0,2.7,26);d.userData.isLandscapeBeacon=!0;for(const m of[-4,-1.4,1.5,4])u([[m,2.4,27],[m/2,2.15,26],[0,2.7,26]],o,.075);break}case"community-library":{h(0,1.06,27,6.2,.4,i,14);const d=h(0,1.62,27,2.05,.28,n,12);d.userData.isLandscapeRoute=!0,h(0,1.8,27,1.86,.08,s,12);for(let m=0;m<6;m++){const p=Math.floor(m/3),g=m%3;_(-.74+g*.74,2.07+p*.04,26.45+p*.9,m,.42)}for(const m of[-4.65,4.65]){a(m,3.05,27,1.42,3.6,1.08,i);for(const p of[2.02,3.12,4.22]){a(m,p,26.38,1.28,.12,.16,o);for(let g=0;g<3;g++)_(m-.4+g*.4,p+.46,26.16,g+Math.round(p*2),.24)}}a(0,4.15,29.35,7.8,4.2,.4,i),a(0,4.15,29.08,7.24,3.62,.08,n);for(const m of[-2.3,0,2.3])a(m,4.12,29,.08,2.8,.06,o);for(const m of[3.18,4.12,5.06])a(0,m,28.98,6.8,.06,.06,o);for(const[m,p,g]of[[-1.4,3.55,s],[.85,3.55,o],[-2.25,4.5,o],[1.55,4.5,s],[-.8,5.42,o],[2.25,5.42,s]]){const x=a(m,p,28.86,.48,.34,.08,g,-.04);x.userData.isLandscapeBeacon=!0}for(const[m,[p,g]]of[[-3.15,27],[3.15,27],[0,24.9]].entries()){const x=h(p,2.05,g,.28,.86,m%2?o:i,8);x.userData.isLandscapeStage=!0;const v=t(new fe(.25,10,8),n,p,2.64,g);v.userData.isLandscapeStage=!0}a(0,2,23.35,1.72,1.42,1.06,o),a(0,2.38,22.78,1.12,.12,.08,i),a(0,1.42,22.78,.84,.12,.08,s),u([[-4.2,2.08,27],[-2.5,2.02,26.1],[0,2.08,25.7],[2.5,2.02,26.1],[4.2,2.08,27]],s,.08),u([[0,2.3,24],[0,2.75,25.1],[0,2.9,27],[0,3.6,28.4],[0,4,29]],o,.075),l(5.45,1.28,.12);break}case"community-network":{h(0,.98,27,6.1,.34,i,12);for(const g of[-4,4])a(g,2.55,27,2.3,2.55,1.8,n),a(g,3.88,27,2.48,.18,1.96,o),a(g-.48,2.55,26.06,.52,.78,.12,s),a(g+.48,2.55,26.06,.52,.78,.12,s);a(-4,4.55,26.02,.28,1.18,.14,o),a(-4,4.55,26.02,1.18,.28,.14,o);for(const g of[-4,0,4]){const x=t(new fe(.34,12,10),s,g,g===0?4.1:4.45,27);x.userData.isLandscapeBeacon=!0}const d=a(0,2.15,26.88,1.35,.18,.86,i);d.rotation.z=-.08,a(0,2.72,26.42,.64,.92,.12,o,-.08);const m=a(0,2.75,26.34,.48,.68,.06,s,-.08);m.userData.isLandscapeStage=!0,u([[-4,4.45,26.65],[-2.35,4.85,26.25],[0,4.15,26.25],[2.35,4.85,26.25],[4,4.45,26.65]],o,.09),u([[-4,1.45,27],[-2.2,1.4,25.9],[0,1.5,25.6],[2.2,1.4,25.9],[4,1.45,27]],s,.08),l(5.35,1.3,.16);const p=new En(11134719,.9,16,2);p.position.set(0,5.2,25.4),r.add(p);break}case"timeline":{const d=[-4,0,4];for(const[I,F]of d.entries()){const V=I===1?3.75:3.25,N=3.55;h(F,1.28,27,1.22,.34,i,8),a(F,N,27,2.55,V,.48,i),a(F,N,26.7,2.2,V-.32,.1,n),a(F-1.14,N,26.58,.12,V+.08,.1,o),a(F+1.14,N,26.58,.12,V+.08,.1,o),a(F,N+V/2,26.58,2.38,.12,.1,o),a(F,N-V/2,26.58,2.38,.12,.1,o),a(F,2.55,26.55,1.24,.075,.055,o),a(F,2.33,26.55,.92,.075,.055,o)}u([[d[0]-.84,3.7,26.34],[d[0]+.84,3.7,26.34]],o,.1);for(const I of[-4.84,-4.28,-3.72,-3.16]){const F=t(new fe(.16,10,8),s,I,3.7,26.3);F.userData.isLandscapeBeacon=!0}const m=t(new Yt(.2,.42,4),o,d[0]+.98,3.7,26.3);m.rotation.z=-Math.PI/2,m.userData.isLandscapeStage=!0;const p=new Pe({color:4353656,emissive:1059378,emissiveIntensity:.22,roughness:.62,metalness:.12}),g=t(new ze(2.7,2.9,.22,12),p,0,1.48,25.2);g.scale.z=.58,g.userData.isLandscapeStage=!0;const x=new ps;x.moveTo(-1.7,.18),x.lineTo(-1.28,-.38),x.lineTo(1.2,-.38),x.lineTo(1.7,.18),x.lineTo(.9,.34),x.lineTo(-1.15,.34),x.closePath();const v=new Pe({color:7359281,roughness:.82,metalness:.04}),y=t(new Eo(x,{depth:.62,bevelEnabled:!0,bevelSegments:1,steps:1,bevelSize:.06,bevelThickness:.05}),v,0,1.94,24.9);y.userData.isLandscapeStage=!0,u([[-1.48,2.13,24.83],[0,2.23,24.83],[1.48,2.13,24.83]],o,.07);const w=h(0,3.52,25.05,.075,2.95,i,8);w.userData.isLandscapeStage=!0;const b=new Pe({color:15916984,roughness:.8,side:It}),A=new ps;A.moveTo(-.08,0),A.lineTo(-.08,2.45),A.lineTo(-1.62,.3),A.closePath();const M=t(new So(A),b,0,2.34,24.82);M.userData.isLandscapeStage=!0;const T=new ps;T.moveTo(.08,.08),T.lineTo(.08,1.62),T.lineTo(1.08,.34),T.closePath();const C=t(new So(T),o,0,2.42,24.8);C.userData.isLandscapeStage=!0,u([[-1.62,2.2,25],[0,5.05,25],[1.12,2.5,25]],s,.045);for(const[I,F]of[[24.3,0],[25.8,.28],[26.55,-.2]])u([[-2.1,1.61,I],[-.8,1.68+F,I-.08],[.7,1.62,I],[2,1.7+F,I+.08]],s,.045);const P=new En(16767398,.9,13,2);P.position.set(0,5.2,24.9),r.add(P),u([[-5.3,1.52,27],[-4,1.52,26.35],[0,1.52,26.35],[4,1.52,26.35],[5.3,1.52,27]],o,.12);break}case"perseverance":{for(let m=0;m<6;m++)a(-4.2+m*1.45,1.15+m*.53,27,1.55,.28,2.1,m===5?o:n);const d=t(new Je(.9,1),s,3.3,5.1,27);d.userData.isLandscapeBeacon=!0,u([[-4.2,1.45,26.7],[-1.7,2,26.7],[.2,3.1,26.7],[3.3,5.1,26.7]],o,.09);break}case"route-evidence":{h(0,1.2,27,5.2,.32,i,12),a(0,3.45,27,7.8,3.8,.3,n),a(0,3.45,26.78,7.1,3.1,.08,i),u([[-3.1,2.6,26.62],[-1.7,4.4,26.62],[.4,3.3,26.62],[2.8,4.55,26.62]],o,.09);for(const[d,m]of[-3.1,-1.7,.4,2.8].entries()){const p=t(new Je(.3,0),d%2===0?s:o,m,d%2===0?2.6:4.4,26.48);p.userData.isLandscapeBeacon=!0}for(const d of[-1.75,1.75])a(d,3.18,26.45,2.05,1.48,.1,d<0?s:o),a(d,3.18,26.36,1.58,1.02,.06,i);l(4.7,1.05,.1);break}case"legacy":{for(let d=0;d<3;d++){const m=(d-1)*3.2;f(2.4,4.6+d*1.1,d===2?o:n,27,m);const p=t(new fe(.34+d*.08,10,8),s,m,5+d,26.55);p.userData.isLandscapeBeacon=!0}u([[-4.6,1.4,27],[0,1.4,27],[4.6,1.4,27]],o,.13);break}case"archive-crossroads":{h(0,1.05,27,5.8,.34,i,12);for(const p of[-3.15,3.15])a(p,3.65,27,2.3,3.55,.42,n),a(p,3.65,26.72,1.78,2.98,.08,i),f(1.35,3.5,p<0?s:o,26.58,p);const d=a(0,2.15,26.35,4.1,.3,1.05,o);d.userData.isLandscapeRoute=!0;const m=t(new Je(.62,1),s,0,3.25,26.18);m.userData.isLandscapeBeacon=!0,u([[-4.4,1.45,27],[-2.5,1.72,26.2],[0,1.9,26.2],[2.5,1.72,26.2],[4.4,1.45,27]],o,.1),l(5.1,1.1,.12);break}case"spotlight":{h(0,1.2,27,4.4,.5,i,12),h(0,1.55,27,2.3,.22,o,12);for(const m of[-4.2,4.2]){const p=t(new Yt(1.35,6.8,12,1,!0),s,m,5.1,27);p.rotation.z=m<0?-.22:.22,p.userData.isLandscapeStage=!0}const d=t(new Je(.62,1),o,0,3.25,26.4);d.userData.isLandscapeBeacon=!0;break}case"humanitarian":{f(6.2,5.6,o,27),a(0,2.15,27,4.2,.42,2.2,n);for(const d of[-1.25,0,1.25]){a(d,2.7,26.85,.78,.62,.6,s);const m=t(new fe(.27,10,8),o,d,3.35,26.82);m.userData.isLandscapeBeacon=!0}u([[-4.5,1.25,27],[-2.4,1.65,26.3],[0,1.85,26.3],[2.4,1.65,26.3],[4.5,1.25,27]],o,.1);break}case"lasting-service":{h(0,1.4,27,3.2,.36,n,12),h(0,4.25,27,.32,5.4,i,8);for(const[d,m]of[[-1.1,5.5],[0,6.1],[1.1,5.5],[-.6,7],[.7,7]]){const p=t(new fe(1.05,10,8),s,d,m,27);p.userData.isLandscapeStage=!0}for(const d of[-3.5,3.5]){const m=t(new Je(.42,0),o,d,2.1,27);m.userData.isLandscapeBeacon=!0}break}case"community-witness":{h(0,1.18,27,5.7,.34,i,12),h(0,1.56,27,3.3,.18,o,12);for(const[m,p,g]of[[-2.2,28.2,-.3],[0,28.8,0],[2.2,28.2,.3]]){const x=a(m,1.95,p,1.6,.2,.72,n,g);x.userData.isLandscapeStage=!0,a(m,2.34,p-.34,1.6,.62,.16,o,g)}const d=h(0,2.12,26.15,1.08,.2,n,10);d.userData.isLandscapeStage=!0;for(const m of[-3.5,0,3.5]){const p=t(new fe(.3,10,8),s,m,3.15,26.55);p.userData.isLandscapeBeacon=!0}u([[-3.7,2.75,26.6],[-1.8,3.3,26.1],[0,2.9,25.95],[1.8,3.3,26.1],[3.7,2.75,26.6]],o,.075),l(4.95,1.08,.12);break}case"fleet":{const d=a(0,2.4,27,8.8,1.15,2.4,i);d.rotation.z=Math.PI;for(const m of[-2.6,0,2.6]){h(m,5.1,27,.1,5.1,o,8);const p=t(new Yt(1.65,3.2,3),m===0?s:n,m,5.1,26.7);p.rotation.z=Math.PI/2,p.rotation.y=Math.PI/2,p.userData.isLandscapeStage=!0}u([[-5.5,1.35,27],[-2.8,1.1,26],[0,1.1,27],[2.8,1.1,28],[5.5,1.35,27]],o,.16);break}case"peace-contact":{for(const m of[-4.5,4.5])a(m,2.2,27,2.2,2.1,2.2,n),a(m,4.1,26.55,1.65,1.1,.8,s);const d=a(0,1.7,27,6.8,.34,1.3,o);d.userData.isLandscapeRoute=!0;for(const m of[-1.8,0,1.8])_(m,2.35,26.25,Math.round(m+2));l(5.5,1.2,.12);break}case"chart-room":{h(0,1.25,27,5.7,.42,i,16),h(0,1.52,27,4.25,.14,n,16);const d=h(0,1.64,27,3.72,.12,o,16);d.scale.z=.68,d.userData.isLandscapeStage=!0,u([[-3.1,1.82,27],[-1.8,2.05,26.5],[0,1.9,27.1],[1.55,2.15,26.4],[3.1,1.82,27]],s,.065),u([[-2.65,1.84,27.6],[-1.4,1.96,27.2],[.2,1.86,26.7],[1.95,1.98,27.35],[2.8,1.84,27.6]],o,.065);for(const[g,x]of[[-3.1,27],[-1.8,26.5],[0,27.1],[1.55,26.4],[3.1,27]]){const v=t(new Je(.22,0),s,g,2.03,x);v.userData.isLandscapeBeacon=!0}const m=h(0,3.25,26.15,.12,3.2,i,8);m.userData.isLandscapeStage=!0;const p=t(new Je(.48,1),o,0,4.98,26.15);p.userData.isLandscapeBeacon=!0,l(5.15,1.12,.1);break}case"exchange-harbor":{h(0,1.05,27,6.2,.36,i,14);for(const m of[-4,4]){a(m,1.62,27,2.1,.42,5.4,n);for(const p of[25.2,27,28.8])h(m,1.2,p,.17,1.1,o,8);a(m,2.15,26.2,1.25,.86,1.1,m<0?s:o),a(m,2.15,27.55,1.25,.86,1.1,n)}const d=a(0,1.78,27,5.4,.28,1.25,o);d.userData.isLandscapeRoute=!0;for(const[m,p]of[[-1.55,2.52],[0,3.15],[1.55,2.52]]){const g=t(new Je(.34,0),s,m,p,26.35);g.userData.isLandscapeBeacon=!0}u([[-4.8,1.42,27],[-2.5,1.72,26.2],[0,2.1,26.2],[2.5,1.72,26.2],[4.8,1.42,27]],s,.085),l(5.55,1.18,.14);break}case"itinerary":{const d=new Pe({color:14996397,emissive:3354402,emissiveIntensity:.28,roughness:.96}),m=new Pe({color:4348748,emissive:1582364,emissiveIntensity:.12,roughness:.8});a(0,3.5,27,9.4,4.6,.42,i),a(0,3.5,26.7,8.7,3.9,.1,d),u([[-3.4,2.4,26.54],[-1.9,4.2,26.54],[.4,3.2,26.54],[2.7,4.5,26.54],[3.6,2.5,26.54]],m,.1);for(const[M,T]of[[-3.4,2.4],[-1.9,4.2],[.4,3.2],[2.7,4.5],[3.6,2.5]]){const C=t(new fe(.22,10,8),s,M,T,26.45);C.userData.isLandscapeBeacon=!0}const p=new Pe({color:6708036,roughness:.96});u([[-4.8,1.48,25],[-2.8,1.5,24.2],[-.2,1.52,24.6],[2.2,1.52,25.55],[4.5,1.55,25.35]],p,.18),u([[-.2,1.52,24.6],[-1.6,1.5,26.1],[-2.9,1.52,27.8]],o,.085),a(-4.35,1.95,24.9,1.55,1.12,.95,i),a(-4.35,2.56,24.9,1.62,.18,1.02,o);for(const M of[-4.78,-3.92]){const T=t(new fe(.16,10,8),n,M,1.35,24.84);T.userData.isLandscapeStage=!0,h(M,2.83,24.9,.055,.55,n,7)}a(-4.35,3.12,24.9,.92,.11,.12,n),h(2.55,2.55,24.95,.12,2.75,i,8),a(2.05,3.48,24.95,1.62,.35,.18,o,-.08),a(3.03,4.02,24.95,1.5,.35,.18,n,.08);const g=t(new Je(.26,0),s,2.55,4.35,24.95);g.userData.isLandscapeBeacon=!0;const x=6.85;a(x,2.8,26.45,2.3,2.45,1.5,i),a(x,2.92,25.66,1.9,1.55,.12,d),a(x,4.12,25.72,2.45,.24,1.68,o),a(x,2.1,25.42,2.2,.38,.78,n);for(const M of[x-1.02,x+1.02])a(M,2.92,25.54,.12,1.65,.14,n);for(const M of[x-.5,x,x+.5])a(M,2.42,25.3,.24,.28,.24,s);const v=t(new fe(.2,10,8),s,x,4.42,25.56);v.userData.isLandscapeBeacon=!0;const y=t(new ze(.27,.38,.92,8),o,3.95,2.25,25.1);y.userData.isLandscapeStage=!0;const w=t(new fe(.29,10,8),n,3.95,2.95,25.1);w.userData.isLandscapeStage=!0;const b=t(new ze(.27,.38,.92,8),i,x+.22,2.92,26.25);b.userData.isLandscapeStage=!0;const A=t(new fe(.29,10,8),n,x+.22,3.62,26.25);A.userData.isLandscapeStage=!0,u([[4.12,2.72,25.15],[5.1,3.05,25.15],[x-.72,3.1,25.15]],s,.055);break}case"detour":{for(const[d,m,p]of[[-3.8,27,1.2],[-2.5,28.1,1.5],[2.8,26.6,1.2],[4,27.4,.95]]){const g=t(new vi(p,0),n,d,1.15,m);g.userData.isLandscapeStage=!0}u([[-5.1,1.35,29],[-2.5,1.5,29.5],[0,1.45,28],[2.1,1.4,25.3],[5,1.3,25.6]],o,.2);for(const d of[-2.4,2.1]){const m=t(new Je(.46,0),s,d,2.4,27.2);m.userData.isLandscapeBeacon=!0}break}case"market-encounter":{h(0,1.08,27,5.8,.3,i,12);for(const[d,m]of[-3.35,3.35].entries()){a(m,3.05,27,2.8,.18,2.25,d===0?o:n);for(const p of[-1.05,1.05])h(m+p,2.12,27,.08,1.85,i,7);a(m,2.55,27,2.38,.72,1.8,d===0?n:o);for(const p of[26.5,27.5])a(m,1.82,p,.48,.36,.42,s)}for(const[d,m]of[[-.95,o],[.95,s]]){const p=t(new ze(.24,.33,.88,8),m,d,2.12,25.7);p.userData.isLandscapeStage=!0;const g=t(new fe(.25,10,8),n,d,2.78,25.7);g.userData.isLandscapeStage=!0}u([[-4.8,1.38,29],[-2.4,1.46,28.2],[0,1.55,27.6],[2.4,1.46,28.2],[4.8,1.38,29]],s,.08),l(5.1,1.08,.11);break}case"hostel":{a(0,3.2,27,7.6,3.8,2,n),a(0,3,25.9,1.55,2.8,.16,i);for(const m of[-2.3,2.3])a(m,4.05,25.88,1.12,.96,.15,s);const d=t(new fe(.42,10,8),o,0,5.55,25.75);d.userData.isLandscapeBeacon=!0,u([[-4.3,1.25,29],[-2.2,1.4,27.6],[0,1.45,26],[2.4,1.35,25]],o,.14);break}case"open-route":{f(8.4,5.4,n,27),u([[0,1.35,30],[0,1.55,28],[-2.5,2.1,26],[-4.1,2.55,24.8]],o,.14),u([[0,1.35,30],[0,1.55,28],[2.5,2.1,26],[4.1,2.55,24.8]],s,.14);for(const d of[-4.1,4.1]){const m=t(new fe(.46,10,8),o,d,2.55,24.8);m.userData.isLandscapeBeacon=!0}break}case"confidence":{for(let m=0;m<4;m++)a(0,1.05+m*.47,28-m*.8,7.6-m*1.25,.28,1.2,m===3?o:n);a(0,3.45,24.65,4.6,.28,1.35,i);for(const m of[-1.9,1.9])a(m,3.95,24.65,.22,.9,.22,o);const d=t(new fe(.56,12,10),s,0,5.25,24.65);d.userData.isLandscapeBeacon=!0;break}case"reflection-garden":{h(0,1.05,27,6.1,.34,i,14);for(let p=0;p<4;p++)a(0,1.38+p*.42,29-p*1.05,8.2-p*1.25,.24,.82,p%2===0?n:o);const d=h(0,2.05,24.8,2.35,.16,s,16);d.scale.z=.55;for(const p of[-3.45,3.45])a(p,2.1,25.6,1.7,.2,.58,n),a(p,2.62,25.88,1.7,.72,.16,o);const m=t(new Je(.48,1),s,0,4.05,24.55);m.userData.isLandscapeBeacon=!0,u([[-4.7,1.45,29.4],[-2.4,1.65,27.8],[0,1.86,26.5],[2.4,1.65,27.8],[4.7,1.45,29.4]],o,.075),l(5.3,1.1,.12);break}case"rain-shelter":{h(0,1.04,27,5.7,.34,i,12);for(const d of[-3.2,3.2])h(d,2.75,26.4,.1,3.15,o,8),h(d,2.75,28.1,.1,3.15,o,8);a(0,4.48,27.25,7.25,.24,3.6,n,-.08),a(0,4.63,27.25,7.25,.12,3.6,o,-.08),a(0,1.95,27.45,3.6,.2,.72,i),a(0,2.42,27.78,3.6,.68,.16,s);for(const d of[-4.1,-2.05,0,2.05,4.1])u([[d,3.35,24.8],[d+.35,2.85,24.8]],o,.045);u([[-4.9,1.38,29.4],[-2.3,1.5,28.8],[0,1.55,28.1],[2.4,1.5,28.8],[4.9,1.38,29.4]],s,.08),l(5.15,1.07,.1);break}case"rail-platform":{for(const d of[25.6,28.5])a(0,1.3,d,10.5,.32,1.3,n);for(const d of[-4.6,4.6]){const m=h(d,4.15,27,.18,5.7,i,8),p=t(new fe(.38,10,8),o,d,6.55,26.78);p.userData.isLandscapeBeacon=!0,m.userData.isLandscapeStage=!0}f(8.7,5.8,o,27),u([[-5.5,1.12,25.3],[0,1.12,25.3],[5.5,1.12,25.3]],i,.08);break}case"rail-car":{a(0,3.15,27,9.6,3.6,2.6,i),a(0,5.05,27,8.8,.4,2.3,o);for(const d of[-3.5,-1.2,1.2,3.5])a(d,3.8,25.63,1.65,1.35,.12,s);for(const d of[-3.5,3.5]){const m=t(new fe(.52,12,10),n,d,1.15,26.1);m.userData.isLandscapeStage=!0}u([[-5.4,.92,27],[0,.92,27],[5.4,.92,27]],o,.14);break}case"landscape-window":{h(0,1.05,27,5.9,.34,i,14),a(0,3.62,27,8.5,4.8,.42,n),a(0,3.64,26.74,7.75,4.05,.08,i),f(6.9,4.2,o,26.58);for(const[m,p,g,x]of[[-2.9,2.3,2.1,s],[-.9,2.5,3.15,o],[1.35,2.9,2.45,n],[3.05,1.65,1.75,s]]){const v=t(new Yt(p,g,5),x,m,1.78+g/2,26.48);v.userData.isLandscapeStage=!0}u([[-3.6,1.7,26.3],[-1.5,2.02,26.3],[.4,1.78,26.3],[3.45,2.08,26.3]],o,.075);const d=t(new fe(.4,12,10),s,2.6,4.35,26.25);d.userData.isLandscapeBeacon=!0,l(5.2,1.12,.1);break}case"route-network":{h(0,1.06,27,6.2,.34,i,14);for(const[d,m,p,g]of[[-4,28.3,2.1,1.45],[0,26.1,2.7,1.95],[4,28.3,2.1,1.45]]){const x=a(d,2.05,m,p,g,1.15,d===0?n:o);x.userData.isLandscapeStage=!0;const v=t(new Je(d===0?.38:.28,0),s,d,3.1+g/2,m);v.userData.isLandscapeBeacon=!0}u([[-4.2,2.45,28.05],[-2.2,2.15,27.25],[0,2.12,26.75],[2.2,2.15,27.25],[4.2,2.45,28.05]],s,.1),u([[-4.2,1.18,29],[-2.1,1.2,27],[0,1.22,26],[2.1,1.2,27],[4.2,1.18,29]],o,.085),f(7.8,5.1,o,27),l(5.55,1.16,.13);break}case"career":{h(0,1.15,27,6.15,.3,i,12),h(0,2.15,27,3.25,.42,n,12),f(10.4,7.1,o,30.2),a(0,4.75,30.52,6.8,3.5,.3,i);for(const v of[-2.15,0,2.15])a(v,4.75,30.32,1.72,2.88,.12,v===0?s:n),a(v,6.18,30.21,.88,.12,.08,o),a(v,3.55,30.21,1.1,.1,.08,o);for(const v of[-3.6,0,3.6]){h(v,5.95,27.7,.07,1.55,i,6);const y=t(new fe(.3,10,8),s,v,5.05,27.7);y.userData.isLandscapeBeacon=!0}for(const v of[0,Math.PI/3,Math.PI*2/3,Math.PI,Math.PI*4/3,Math.PI*5/3]){const y=Math.cos(v)*4.5,w=27+Math.sin(v)*2.4,b=a(y,1.52,w,1.1,.28,.95,i,v+Math.PI/2);b.userData.isLandscapeStage=!0;const A=a(y+Math.cos(v)*.42,2.02,w+Math.sin(v)*.32,1.02,.82,.2,n,v+Math.PI/2);A.userData.isLandscapeStage=!0,u([[y*.72,2.2,27+(w-27)*.7],[0,2.25,27]],o,.055)}const d=new Pe({color:14001271,roughness:.86}),m=[new Pe({color:8214333,roughness:.9}),new Pe({color:4811890,roughness:.88}),new Pe({color:9070660,roughness:.9})],p=[{x:4.5,z:27,coat:m[0],facing:Math.PI},{x:-2.25,z:29.08,coat:m[1],facing:-Math.PI/3},{x:2.25,z:24.92,coat:m[2],facing:Math.PI/3}];for(const v of p){const{x:y,z:w,coat:b,facing:A}=v,M=a(y,1.82,w,.66,.32,.48,b,A),T=a(y,2.32,w,.7,.82,.43,b,A),C=t(new fe(.3,10,8),d,y,2.98,w),P=t(new fe(.305,8,6),i,y,3.08,w+.045);P.scale.set(1,.48,.92);for(const I of[-1,1]){const F=a(y+I*.4,2.29,w-.06,.2,.62,.24,b,A);F.rotation.z=I*-.12;const V=t(new fe(.12,8,6),d,y+I*.43,1.98,w-.15);V.userData.isLandscapeStage=!0}for(const I of[M,T,C,P])I.userData.isLandscapeStage=!0}a(-1.18,2.58,26.45,1.12,.16,.78,n,-.08),a(-1.18,2.7,26.45,.92,.08,.68,s,-.08);const g=t(new it(.42,.1,8,16),o,1.25,2.76,26.5);g.userData.isLandscapeStage=!0;const x=t(new Je(.62,1),s,0,3.1,26.5);x.userData.isLandscapeBeacon=!0;break}case"violin":{const d=t(new fe(1.55,16,12),n,-.58,3.25,27);d.scale.set(.82,1,.28),d.userData.isLandscapeStage=!0;const m=t(new fe(1.2,16,12),o,.62,3.65,27);m.scale.set(.78,.86,.27),m.userData.isLandscapeStage=!0,a(0,3.7,27,.66,3.25,.48,i,-.1),a(0,5.42,26.65,.92,.16,.2,o);for(const p of[-.16,0,.16])a(p,4.1,26.62,.035,3.05,.05,s);u([[-2.65,1.65,26.5],[.1,1.45,26.5],[2.8,6.2,26.5]],o,.09);break}case"craft-quality":{a(0,2.05,27,8.6,.42,3.1,i);for(const m of[-3.5,3.5])a(m,1.05,26.05,.34,1.65,.34,n),a(m,1.05,27.95,.34,1.65,.34,n);for(const m of[-2.45,0,2.45]){const p=a(m,2.58,26.92,1.72,.58,1.18,m===0?s:n,m===0?0:.08);p.userData.isLandscapeStage=!0,a(m,2.91,26.92,1.32,.08,.82,o,m===0?0:.08)}for(const m of[25.95,28.05])a(0,3.05,m,6.1,.1,.12,o);u([[-3.7,3.28,25.55],[-1.8,3.68,25.18],[0,3.92,25.02],[1.8,3.68,25.18],[3.7,3.28,25.55]],o,.07),c(4.05).scale.setScalar(.54),l(3.6,3.72);break}case"bench":{f(9.2,5.5,i,30.8),a(0,4.55,30.45,5.35,2.9,.24,i),a(0,4.55,30.29,4.95,2.48,.08,n);for(let p=0;p<3;p++){const g=5.35-p*.64,x=t(new Je(.16,0),o,-1.72,g,30.2);x.userData.isLandscapeStage=!0,a(-.25,g,30.2,2.35,.075,.05,s)}for(const p of[-4,4]){a(p,2.35,28.25,1.65,.18,1.25,n);for(const g of[-.58,.58])for(const x of[-.42,.42])a(p+g,1.65,28.25+x,.12,1.3,.12,i);a(p,1.52,26.25,.9,.2,.82,i),a(p,2.12,26.65,.86,.92,.16,o)}a(0,2.35,27,7.2,.4,2.6,n);for(const p of[-3,3])for(const g of[26.1,27.9])a(p,1.35,g,.2,1.8,.2,i);a(-1.55,2.75,26.48,2.2,.22,.92,o),a(1.55,2.8,26.6,1.35,.3,.72,s),h(2.9,3.4,27,.12,1.6,i,8),u([[-3.4,3,26.6],[-1.6,3.45,26.4],[0,3.1,26.1],[1.55,3.5,26.6]],o,.075);const d=a(3.65,1.66,24.55,.98,.2,.86,s,.12);d.rotation.z=.08,a(3.65,2.28,24.94,.9,.92,.17,o,.12);for(const[p,g,x]of[[-.34,-.28,.72],[.34,-.28,.72],[-.34,.28,.42],[.34,.28,.72]])a(3.65+p,1.24,24.55+g,.12,x,.12,i);const m=t(new it(.82,.07,8,24),s,3.65,1.1,24.55);m.rotation.x=Math.PI/2,m.userData.isLandscapeRing=!0;break}case"caliper":{for(const m of[-3.1,3.1])a(m,4.2,27,.42,5.8,.5,o);a(0,7,27,6.6,.42,.5,o),a(-.7,4.95,27,.35,2.5,.45,s),a(.25,3.05,27,2.2,1.25,1.8,n);for(let m=0;m<5;m++)a(-2.35+m*.5,6.55,26.72,.08,.24,.12,i);const d=t(new fe(.36,10,8),s,-.78,5.05,26.68);d.userData.isLandscapeBeacon=!0;break}case"trust-bridge":{for(const m of[-5,5])for(const p of[26.2,27.8])h(m,2.5,p,.48,3.4,n,8);const d=a(0,2.25,27,10.5,.42,2.5,o);d.userData.isLandscapeRoute=!0;for(const m of[-4.1,4.1])a(m,4.1,27,.28,3.5,.28,i);u([[-4.1,5.6,27],[0,5.6,27],[4.1,5.6,27]],s,.12);break}case"loom":{f(8.2,6.4,n,27);for(let d=0;d<11;d++){const m=-3.45+d*.69;a(m,3.95,26.55,.075,4.55,.12,d%3===0?o:s)}for(let d=0;d<5;d++)a(0,2.5+d*.65,26.45,7.2,.1,.1,d%2?n:o);l(4.8,1.25,.05);break}case"heritage":{a(0,4.2,27,8.4,5.6,.56,i),a(0,4.2,26.66,7.7,4.9,.12,n);for(let d=0;d<5;d++)for(let m=0;m<7;m++){const p=t(new Je(.22+(d+m)%2*.08,0),(d+m)%3===0?o:s,-2.85+m*.95,2.4+d*.85,26.5);p.userData.isLandscapeStage=!0}u([[-4.7,1.2,27],[-2.2,1.5,26],[0,1.35,25.8],[2.3,1.5,26],[4.7,1.2,27]],o,.1);break}case"work-dignity":{h(0,1.18,27,5.6,.32,i,12);for(const[m,p]of[-3.75,-1.25,1.25,3.75].entries()){const g=a(p,1.96,27,1.55,1.15,1.5,m%2===0?n:i);g.userData.isLandscapeStage=!0;const x=t(m%2===0?new Je(.56,0):new it(.42,.12,7,16),m%2===0?o:s,p,2.9,26.45);x.userData.isLandscapeStage=!0,u([[p,3.2,26.4],[p/2,3.72,26.2],[0,4.05,26.2]],o,.055)}const d=t(new Je(.48,1),s,0,4.25,26.15);d.userData.isLandscapeBeacon=!0,l(5.05,1.12,.08);break}case"craft-evolution":{a(0,1.85,27,8.4,.42,2.9,i);for(const p of[-3.2,3.2])a(p,1.12,26.08,.28,1.35,.28,n),a(p,1.12,27.92,.28,1.35,.28,n);const d=t(new it(.88,.14,8,24),o,-2.25,3.55,26.72);d.userData.isLandscapeStage=!0,a(-2.25,3.55,26.68,.12,1.38,.08,i,-.46),a(2.25,3.55,26.7,2.35,1.7,.22,n),a(2.25,3.55,26.55,1.85,1.16,.08,s);for(const p of[3.3,3.55,3.8])a(2.25,p,26.49,1.2,.055,.04,o);u([[-1.24,3.55,26.52],[0,4.1,26.52],[1.08,3.55,26.52]],s,.085);const m=t(new Je(.38,1),o,0,4.45,26.45);m.userData.isLandscapeBeacon=!0;break}case"embroidery-table":{a(0,1.72,27.15,8.2,.4,3.15,i);for(const d of[-3.25,3.25])for(const m of[26.15,28.15])a(d,1.05,m,.24,1.45,.24,n);a(0,3.62,26.58,4.6,3.35,.2,n),a(0,3.62,26.43,4.12,2.88,.08,i);for(let d=0;d<7;d++){const m=-1.5+d*.5,p=a(m,3.62,26.34,.075,2.35,.06,d%2===0?o:s);p.userData.isLandscapeStage=!0}for(let d=0;d<5;d++)a(0,2.68+d*.47,26.32,3.05,.065,.055,d%2===0?s:o);for(const d of[-3.15,3.15]){h(d,2.25,26.55,.3,.85,n,10);const m=t(new it(.34,.1,7,16),o,d,2.75,26.55);m.userData.isLandscapeStage=!0}u([[-3.3,2.45,28.1],[-1.8,2.82,27.1],[0,2.55,26.2],[1.8,2.82,27.1],[3.3,2.45,28.1]],s,.06);break}case"living-heritage":{for(const[d,m]of[29.2,27,24.8].entries()){const p=7.8-d*.75;f(p,5.5-d*.3,d===1?o:n,m);for(let g=0;g<5;g++){const x=t(new Je(.2+g%2*.06,0),g%2===0?s:o,-1.6+g*.8,2.5+g%2*.7,m-.36);x.userData.isLandscapeStage=!0}}u([[-3.2,4.65,29.2],[-1.5,5.1,27],[0,4.45,24.8],[1.5,5.1,27],[3.2,4.65,29.2]],o,.08),u([[-3.2,2.1,29.2],[-1.5,2.25,27],[0,2.12,24.8],[1.5,2.25,27],[3.2,2.1,29.2]],s,.065),l(5.1,1.12,.1);break}case"lunar-probe":{const d=t(new fe(4.8,18,12,0,Math.PI*2,0,Math.PI/2),n,0,.3,33.5);d.userData.isLandscapeStage=!0;for(const[y,w,b]of[[-3.2,32.2,.72],[-1.6,34,.52],[2.8,32.5,.84],[3.6,34.1,.44]]){const A=t(new it(b,.13,6,18),i,y,.62,w);A.rotation.x=Math.PI/2,A.userData.isLandscapeStage=!0}const m=t(new we(2.25,.86,1.58),n,-1.8,2.02,24.5);m.userData.isLandscapeStage=!0,a(-1.8,2.47,24.5,2.04,.16,1.4,o);const p=new Pe({color:2707312,emissive:1058877,emissiveIntensity:.24,roughness:.58,metalness:.3});for(const y of[-3.72,.12]){a(y,2.56,24.5,1.42,.14,1.62,p);for(let w=0;w<4;w++)a(y,2.65,23.92+w*.38,1.3,.035,.035,o);u([[y<-1.8?-2.86:-.74,2.4,24.5],[y,2.45,24.5]],o,.055)}for(const y of[-3,-1.8,-.6])for(const w of[23.58,25.42]){const b=t(new ze(.4,.4,.24,12),i,y,1.62,w);b.rotation.z=Math.PI/2,b.userData.isLandscapeStage=!0}h(-1.8,3.32,24.5,.08,1.72,i,8),a(-1.8,4.2,24.5,.82,.42,.52,n);const g=t(new fe(.13,10,8),o,-1.8,4.2,24.2);g.userData.isLandscapeBeacon=!0;const x=t(new Je(.58,0),s,-1.8,4.92,24.5);x.userData.isLandscapeBeacon=!0;const v=t(new fe(.19,10,8),o,-1.8,5.72,24.5);v.userData.isLandscapeBeacon=!0,u([[-4.5,.82,24.2],[-3.5,.85,23.8],[-1.8,.85,24.5],[.1,.82,25.4]],o,.09);break}case"test-console":{a(0,2.45,27,7.8,.56,2.6,i),a(0,3.25,26.55,7.2,1.1,.28,n,-.16);for(let d=0;d<7;d++){const m=-2.8+d*.92,p=t(new fe(.22+d%2*.07,10,8),d%3===0?o:s,m,3.42,26.28);p.userData.isLandscapeBeacon=!0}for(const d of[-2.3,0,2.3])a(d,4.75,27,1.35,1.45,.65,n);u([[-3.3,1.25,29],[-1.7,1.3,27.9],[0,1.28,27],[1.7,1.3,27.9],[3.3,1.25,29]],o,.1);break}case"lander":{const d=t(new Je(1.45,1),s,0,5.35,27);d.scale.y=.82,d.userData.isLandscapeStage=!0;for(const[p,g]of[[-2.1,25.2],[2.1,25.2],[-2.1,28.8],[2.1,28.8]]){const x=a(p*.68,3.15,(g+27)/2,.16,3.5,.16,o);x.rotation.z=p<0?-.24:.24,a(p,1.4,g,1.1,.22,.82,i)}for(const p of[-3.7,3.7]){a(p,5.2,27,1.25,1.65,.14,o);for(let g=0;g<4;g++)a(p,4.6+g*.4,26.9,1.1,.055,.08,s)}h(0,7.3,27,.08,2.2,i,6);const m=t(new fe(.38,10,8),o,0,8.55,27);m.userData.isLandscapeBeacon=!0;break}case"orbit-adjustment":{const d=t(new fe(2.1,16,12),n,0,3.1,27);d.userData.isLandscapeStage=!0;for(const[m,p]of[[.2,0],[.72,.55],[-.5,-.72]]){const g=l(4.4,3.2,m);g.rotation.y=p}for(const[m,p,g]of[[3.6,4.9,27],[-1.8,5.8,27.5],[-2.2,2.2,26.7]]){const x=t(new Je(.44,0),o,m,p,g);x.userData.isLandscapeBeacon=!0}u([[3.6,4.9,27],[1.9,5.3,27],[0,5.4,27],[-1.8,5.8,27.5]],s,.07);break}case"training":{f(9,6.2,o,30.2),a(0,4.45,30,5.8,2.7,.22,i),a(0,4.45,29.82,5.35,2.3,.08,n);for(let y=0;y<3;y++){const w=5.2-y*.62;for(const b of[-1.55,0,1.55]){const A=t(new Je(.13,0),y===1?s:o,b,w,29.72);A.userData.isLandscapeStage=!0}a(0,w-.2,29.72,3.8,.035,.03,i)}a(0,1.28,26.5,3.25,.28,1.55,i);for(const y of[-1.05,1.05]){const w=t(new ze(.42,.42,.18,12),o,y,1.18,26.5);w.rotation.z=Math.PI/2,w.userData.isLandscapeStage=!0,a(y,2.28,26.45,.16,1.78,.16,n)}const d=new Pe({color:14213348,roughness:.76,metalness:.04}),m=new Pe({color:3300220,roughness:.22,metalness:.34,emissive:1520715,emissiveIntensity:.18}),p=a(0,2.78,25.6,.78,1.18,.55,d),g=t(new fe(.4,12,9),d,0,3.62,25.6),x=t(new fe(.28,10,8),m,0,3.64,25.31);x.scale.set(1,.72,.45);for(const y of[-1,1]){const w=a(y*.55,2.72,25.56,.22,.82,.25,d);w.rotation.z=y*-.18,a(y*.22,1.96,25.45,.22,.72,.26,d);const b=t(new it(.17,.055,7,14),o,y*.9,2,26);b.rotation.x=Math.PI/2,b.userData.isLandscapeStage=!0}for(const y of[p,g,x])y.userData.isLandscapeStage=!0;u([[-.8,3.7,25.7],[-.55,4.55,26.1],[0,5.25,26.4],[.65,5.75,27]],s,.07);const v=t(new fe(.3,10,8),o,0,5.7,27);v.userData.isLandscapeBeacon=!0,l(3.2,1.08,.1);break}case"science-exhibit":{for(const[d,m,p]of[[-3.5,3.5,.65],[0,5.1,.88],[3.5,3.5,.65]]){const g=t(new fe(p,12,10),d===0?o:s,d,m,27);g.userData.isLandscapeBeacon=!0}for(const d of[-2.5,0,2.5]){const m=h(d,2.2,27,.13,2.7,i,8);m.rotation.z=d*.04}l(4.5,5.4,.44),l(2.7,3.6,-.7);break}case"relay-bridge":{f(10.2,6.2,i,29.7);const d=t(new fe(1.15,14,10),o,-4.2,3.7,27.7);d.userData.isLandscapeBeacon=!0;const m=t(new fe(1.75,16,12),n,4.2,2.7,28.1);m.userData.isLandscapeStage=!0;for(const[g,x,v]of[[3.35,28.1,.38],[4.8,28.1,.52],[5.05,27.75,.24]]){const y=t(new it(v,.09,6,16),i,g,2.72,x);y.rotation.x=Math.PI/2,y.userData.isLandscapeStage=!0}a(0,4.65,27,.92,.68,.7,s);for(const g of[-1.45,1.45]){a(g,4.68,27,1.52,.12,.82,o);for(let x=0;x<3;x++)a(g,4.69,26.72+x*.27,1.38,.035,.035,i)}const p=t(new fe(.22,10,8),s,0,5.75,27);p.userData.isLandscapeBeacon=!0,u([[-3.05,4.15,27.5],[-1.5,5.4,27],[0,5.72,27],[1.5,4.3,27.3],[3.2,3.2,27.8]],s,.09),l(3.1,5.2,.36);break}case"sample-lab":{a(0,2.05,27,8.4,.38,3.2,i);for(const m of[-3.4,3.4])for(const p of[25.9,28.1])a(m,1.14,p,.22,1.62,.22,o);a(0,4.7,30,6.8,2.9,.22,n);for(const m of[-2.3,0,2.3]){const p=t(new we(1.55,1.22,1.06),s,m,3,26.55);p.material=new Pe({color:10205388,transparent:!0,opacity:.2,roughness:.28,metalness:.08}),p.userData.isLandscapeStage=!0;const g=t(new vi(.42,0),m===0?o:n,m,2.68,26.42);g.scale.set(1,.72,.82),g.userData.isLandscapeStage=!0,h(m,2.35,26.42,.52,.1,i,12)}for(let m=0;m<3;m++)a(0,5.35-m*.6,29.86,3.4,.06,.035,m===1?s:o);const d=h(3.05,3.35,26.55,.16,1.75,o,10);d.rotation.z=.28,a(3.25,4.05,26.55,.85,.14,.14,s,-.28),u([[-3.4,3.1,28.4],[-1.6,3.7,27.7],[0,3.45,27.2],[1.8,3.1,28.4],[3.05,3.7,27.7]],o,.055);break}case"moon-horizon":{const d=t(new fe(6.3,20,12,0,Math.PI*2,0,Math.PI/2),n,0,.55,34.5);d.userData.isLandscapeStage=!0;for(const[p,g,x]of[[-4.3,32.2,.72],[-1.8,34.4,.5],[2.1,33.1,.86],[4.2,35,.48]]){const v=t(new it(x,.11,6,18),i,p,.8,g);v.rotation.x=Math.PI/2,v.userData.isLandscapeStage=!0}a(0,1.55,25.6,8.8,.34,2.7,i);for(const p of[-3.6,3.6])a(p,2.45,25.7,.24,1.62,.24,o);a(0,3.35,25.7,7.4,.22,.35,s);const m=t(new Je(.46,0),o,0,4.15,25.7);m.userData.isLandscapeBeacon=!0,u([[-4.1,1.02,28.7],[-2.1,1.06,27.3],[0,1.1,26.6],[2.1,1.06,27.3],[4.1,1.02,28.7]],s,.085);break}case"systems-simulation":{for(const m of[-3.6,0,3.6]){a(m,3.35,27.8,2.35,2.25,.3,i),a(m,3.55,27.58,1.95,1.48,.08,n);for(let p=0;p<3;p++)u([[m-.78,3.05+p*.26,27.48],[m-.18,3.24+p*.26,27.48],[m+.28,3.12+p*.26,27.48],[m+.78,3.36+p*.26,27.48]],p===1?s:o,.035);h(m,1.82,27.8,.1,1.24,o,8)}a(0,1.3,27.7,8.6,.22,2.25,i);const d=t(new wi(.56,1),s,0,5.25,27.48);d.userData.isLandscapeBeacon=!0,u([[-2.3,4.8,27.45],[0,5.2,27.45],[2.3,4.8,27.45]],o,.07);break}case"mission-control":{f(10.8,6.8,o,30.2),a(0,5,30,7.1,3,.24,i);for(let m=0;m<5;m++){const p=-2.4+m*1.2,g=a(p,5,29.82,.88,1.65,.08,m===2?s:n);for(let x=0;x<4;x++)a(p,4.5+x*.27,29.74,.58,.035,.025,x===2?s:o);g.userData.isLandscapeStage=!0}for(const m of[-3.2,0,3.2]){a(m,2.2,26.7,2.15,.35,1.35,o),a(m,2.65,26.3,1.75,.65,.18,n,-.18);for(const p of[-.72,.72])a(m+p,1.65,26.72,.12,1.1,.12,i)}u([[-4.2,3.1,27.2],[-2.1,3.75,27],[0,4.15,27],[2.1,3.75,27],[4.2,3.1,27.2]],s,.065);const d=t(new Je(.38,1),s,0,6.95,29.7);d.userData.isLandscapeBeacon=!0;break}case"crew-simulation":{f(8.6,6.1,o,29.5);for(const g of[-3.1,3.1]){const x=t(new fe(1.2,12,10),i,g,3.2,27.6);x.scale.set(.9,1.1,.62),x.userData.isLandscapeStage=!0,a(g,3.2,26.96,1.7,.1,.1,s)}const d=new Pe({color:14279397,roughness:.78,metalness:.04}),m=new Pe({color:3627640,roughness:.24,metalness:.32,emissive:1586250,emissiveIntensity:.16});for(const[g,x,v]of[[-1.8,25.9,-.22],[1.8,25.9,.22]]){const y=a(g,2.55,x,.72,.98,.48,d,v),w=t(new fe(.42,12,9),d,g,3.48,x),b=t(new fe(.28,10,8),m,g,3.49,x-.22);b.scale.set(1,.72,.48);for(const M of[-1,1])a(g+M*.5,2.48,x-.04,.2,.76,.24,d,v);const A=t(new Je(.16,0),o,g,2.75,x-.27);for(const M of[y,w,b,A])M.userData.isLandscapeStage=!0}u([[-2.8,2.1,27.2],[-1.2,2.55,26.7],[0,2.7,26.1],[1.2,2.55,26.7],[2.8,2.1,27.2]],s,.065);const p=t(new fe(.28,10,8),o,0,5.15,27.15);p.userData.isLandscapeBeacon=!0;break}case"future-frontier":{const d=t(new fe(2.55,16,10,0,Math.PI*2,0,Math.PI/2),s,0,1.42,28);d.userData.isLandscapeStage=!0,a(0,1.45,28,5.15,.18,.3,i);for(const p of[-4.2,4.2]){const g=a(p,2.05,27.3,2.35,.12,1.25,o,p<0?-.12:.12);g.userData.isLandscapeStage=!0;for(let x=0;x<3;x++)a(p,2.14,26.86+x*.42,2.12,.03,.03,i);for(const x of[-.92,.92])a(p+x,1.35,27.3,.12,1.35,.12,i)}for(const p of[0,Math.PI/3,Math.PI*2/3,Math.PI,Math.PI*4/3,Math.PI*5/3]){const g=Math.cos(p)*3.2,x=28+Math.sin(p)*2.6,v=t(new fe(.16,8,6),o,g,1.25,x);v.userData.isLandscapeBeacon=!0,u([[g,1.05,x],[g*.55,1.12,28+(x-28)*.55],[0,1.12,28]],s,.045)}const m=t(new Je(.48,1),o,0,5.1,28);m.userData.isLandscapeBeacon=!0,l(5.2,1.2,.1);break}case"exchange":{for(const d of[-3.8,3.8]){a(d,3.7,27,.35,5.8,.48,o);for(let m=0;m<3;m++)a(d*.85,2.15+m*1.45,27,1.4,.12,.62,n)}for(let d=0;d<8;d++)_(-3.1+d%4*2.05,2.65+Math.floor(d/4)*1.45,26.55,d,.34);u([[-4.1,1.35,29],[-2.1,1.6,27.5],[0,1.45,26],[2.1,1.6,27.5],[4.1,1.35,29]],o,.12);break}case"resilience":{f(8.6,5.8,n,27);for(let d=0;d<4;d++){const m=-3+d*2;a(m,2.25,26.1,1.28,1.1,.94,d%2?o:s);const p=t(new fe(.27,10,8),s,m,3.05,25.72);p.userData.isLandscapeBeacon=!0}u([[-4.5,1.25,29],[-2.2,1.45,27.4],[0,1.45,26],[2.2,1.45,27.4],[4.5,1.25,29]],o,.14);break}case"exchange-wall":{a(0,4,27,9.2,5.8,.56,i),a(0,4,26.65,8.5,5.15,.12,n);for(const d of[2.2,3.4,4.6,5.8])a(0,d,26.35,8.1,.14,.44,o);for(let d=0;d<3;d++)for(let m=0;m<7;m++)_(-3.3+m*1.1,2.68+d*1.2,26.05,d*7+m,.37);u([[-4.4,1.2,29],[0,1.38,28.2],[4.4,1.2,29]],s,.1);break}case"resource-cycle":{for(let m=0;m<3;m++){const p=m/3*Math.PI*2-Math.PI/2,g=Math.cos(p)*3.4,x=27+Math.sin(p)*2.2;h(g,1.55,x,1.05,.5,n,8),_(g,2.2,x-.35,m,.7)}u([[-3.4,2.6,27],[0,3,24.7],[3.4,2.6,27],[0,2.3,29.2],[-3.4,2.6,27]],o,.11);const d=t(new fe(.52,12,10),s,0,3.8,27);d.userData.isLandscapeBeacon=!0;break}case"library":{a(0,3.55,27,8.8,4.8,2.3,n);for(const d of[-3.1,0,3.1]){a(d,3.8,25.78,1.8,3.1,.14,i);for(let m=0;m<3;m++){a(d,2.65+m*.92,25.62,1.56,.12,.18,o);for(let p=0;p<3;p++)_(d-.48+p*.48,3.1+m*.92,25.42,m*3+p,.24)}}a(0,3.1,25.68,1.12,2.6,.18,s),f(9.3,6.3,o,28.1);break}case"digital-lending":{a(0,4.1,27,4.3,6,.62,i),a(0,4.1,26.62,3.72,5.4,.12,s);for(const[d,m]of[[-.62,5.6],[.52,4.25],[-.45,2.9]])a(d,m,26.43,1.68,.28,.08,o);for(const d of[-4.2,4.2]){const m=a(d,3.5,27,1.7,4.6,1.2,n);m.userData.isLandscapeStage=!0;for(let p=0;p<3;p++)a(d,2.15+p*1.25,26.35,1.5,.1,.2,o)}u([[-4,2.2,26.1],[-2.2,2.8,26.1],[0,3.2,26.1],[2.2,2.8,26.1],[4,2.2,26.1]],s,.08);break}case"budget-board":{a(0,4.15,28.7,8.8,5.2,.42,i),a(0,4.15,28.46,8.2,4.62,.08,n);for(const d of[-2.7,0,2.7])a(d,4.05,28.38,.08,3.55,.06,o);for(const d of[2.45,3.65,4.85,6.05])a(0,d,28.38,7.8,.07,.06,o);for(const[d,m]of[1.05,1.7,2.5].entries()){const p=a(-1.8+d*1.8,2.55+m/2,28.18,.92,m,.18,d===2?s:o);p.userData.isLandscapeStage=!0}for(let d=0;d<5;d++)h(3.38,1.48+d*.24,27,.48,.13,d%2?o:s,12);u([[-4.5,1.28,29.2],[-2.2,1.35,27.8],[0,1.4,26.3],[2.1,1.48,25.6],[4.4,1.55,26.4]],o,.1),l(5.1,1.08,.1);break}case"trust-ledger":{h(0,1.18,27,6.1,.34,i,12),a(0,1.92,27,7.4,.28,3.5,n),a(-1.75,2.13,26.72,2.5,.12,2.45,s,-.08),a(1.1,2.13,26.72,2.5,.12,2.45,o,.08);for(const d of[-2.45,-1.72,-.98,.38,1.1,1.82])a(d,2.24,26.35,.08,.04,1.72,i);for(const d of[25.85,26.42,27.02])a(-1.73,2.24,d,2.24,.04,.06,i);for(const d of[-4,4]){const m=t(new Je(.62,0),d<0?o:s,d,3.45,27);m.userData.isLandscapeBeacon=!0}u([[-4,2.9,27],[-2,2.55,27],[0,2.42,27],[2,2.55,27],[4,2.9,27]],o,.08),l(5.15,1.16,.1);break}case"sustainable-market":{for(const[d,m]of[-3.55,0,3.55].entries()){a(m,2.28,27,2.75,.22,2.2,d===1?o:n);for(const g of[-.98,.98])a(m+g,1.55,27,.16,1.35,.16,i);const p=a(m,4.05,27,3.05,.24,2.5,d===1?s:o,d===1?.03:-.03);p.userData.isLandscapeStage=!0;for(let g=0;g<3;g++){const x=a(m-.78+g*.78,2.76,26.2,.56,.72,.54,g%2?s:i);x.userData.isLandscapeStage=!0}}for(const d of[-1.75,1.75]){const m=t(new ze(.24,.32,.9,8),d<0?o:i,d,1.82,24.9);m.userData.isLandscapeStage=!0,t(new fe(.24,10,8),n,d,2.47,24.9)}u([[-5.1,1.2,29.2],[-3,1.28,27.7],[0,1.35,26],[3,1.28,27.7],[5.1,1.2,29.2]],s,.08),l(5.35,1.08,.1);break}case"knowledge-bridge":{for(const m of[-4.15,4.15]){a(m,3.4,27,1.55,4.3,1.55,n);for(let p=0;p<3;p++){a(m,2.15+p*1.12,26.12,1.28,.12,.18,o);for(let g=0;g<3;g++)_(m-.42+g*.42,2.53+p*1.12,25.96,p*3+g,.22)}}f(10.4,5.35,o,28.8);const d=a(0,2.28,27,7.1,.36,2.35,i);d.userData.isLandscapeRoute=!0;for(const m of[-2.3,0,2.3]){const p=a(m,2.5,27,1.18,.14,1.45,m===0?s:o);p.userData.isLandscapeStage=!0}u([[-4.2,2.58,27],[-2.2,2.68,27],[0,2.72,27],[2.2,2.68,27],[4.2,2.58,27]],s,.08),l(5.3,1.12,.1);break}default:c()}}function Jv(r,e,t,n){if(!e||!t||e==="hub"||e==="section-a"||e==="section-b"||e==="stories-of-china"||e==="learning-lab"||e==="unit-project")return;const i=document.createElement("canvas");i.width=1024,i.height=256;const s=i.getContext("2d");if(!s)return;s.fillStyle="rgba(7, 14, 27, 0.88)",s.fillRect(20,24,984,208),s.strokeStyle=`#${n.toString(16).padStart(6,"0")}`,s.lineWidth=8,s.strokeRect(24,28,976,200),s.textAlign="center",s.textBaseline="middle",s.font="bold 52px 'Microsoft YaHei', sans-serif",s.fillStyle="#f8fbff",s.fillText(t.slice(0,26),512,126,920);const o=new Mi(i);o.colorSpace=Et;const c=new Ii(new xi({map:o,transparent:!0,depthWrite:!1,toneMapped:!1}));c.position.set(0,11,14),c.scale.set(19,4.75,1),c.renderOrder=8,r.add(c)}function Zv(r,e,t,n,i){const s=new G(new ze(13,14.5,.65,8),e);s.position.y=.34,r.add(s);const o=new G(new it(11.8,.11,8,48),i);o.rotation.x=Math.PI/2,o.position.y=.72,o.userData.isLandscapeRing=!0,r.add(o);const c=new G(new ze(7.2,7.6,.16,8),t);c.position.y=.76,r.add(c);const l=new G(new it(6.8,.07,8,40),n);l.rotation.x=Math.PI/2,l.position.y=.9,l.userData.isLandscapeRing=!0,r.add(l);const a=new G(new we(.72,8.5,.72),i);a.position.set(-5.2,4.8,8.5);const h=a.clone();h.position.x=5.2;const u=new G(new we(11.1,.72,.72),i);u.position.set(0,8.7,8.5),r.add(a,h,u);const f=new G(new it(2.75,.1,8,40),n);f.position.set(0,4.65,8.5),r.add(f);for(const[_,d]of[[-7,-7],[7,-7],[-7,7],[7,7]]){const m=new G(new ze(.28,.42,4.8,8),t);m.position.set(_,2.6,d),r.add(m);const p=new G(new fe(.43,10,8),n);p.position.set(_,5.05,d),p.userData.isLandscapeBeacon=!0,r.add(p)}}function $v(r,e,t,n,i,s){if(!e||e==="hub")return;const o=new G(new ze(7.8,8.8,.4,8),n);switch(o.position.set(0,.86,27),r.add(o),e){case"section-a":{const c=new G(new we(8.4,.42,5.6),t);c.position.set(-2.2,3.5,27),c.rotation.y=-.18;const l=new G(new we(5.8,.16,4.4),i);l.position.set(2.2,3.8,27),l.rotation.y=.18;const a=new G(new we(.32,2.1,5.8),s);a.position.set(0,2.25,27),r.add(c,l,a),Ks(l);break}case"section-b":{for(const a of[-3.8,3.8]){const h=new G(new ze(.72,1.05,8.2,8),t);h.position.set(a,4.9,27),r.add(h)}const c=new G(new it(4.1,.2,8,40,Math.PI),s);c.position.set(0,8.2,27),c.rotation.z=Math.PI,r.add(c);const l=new G(new fe(1.25,16,12),i);l.position.set(0,4.9,27),r.add(l),Ks(l);break}case"stories-of-china":{for(const[a,h,u]of[[5.8,2,8],[4.4,4.2,6],[3,6.2,5]]){const f=new G(new ze(a,a+.55,.7,u),t);f.position.set(0,h,27),r.add(f)}const c=new G(new Je(1.7,1),i);c.position.set(0,9,27),r.add(c);const l=new G(new it(2.5,.13,8,32),s);l.rotation.x=Math.PI/2,l.position.set(0,9,27),r.add(l),Ks(c),Ea(l);break}case"learning-lab":{const c=new G(new ze(2.4,2.8,6.5,12),i);c.position.set(0,4.3,27),r.add(c);for(const l of[.35,-.35]){const a=new G(new it(4.9,.16,8,48),s);a.position.set(0,4.3,27),a.rotation.set(l,.4,l*1.4),r.add(a),Ea(a)}Ks(c);break}case"unit-project":{const c=new G(new Je(2.8,1),i);c.position.set(0,7.4,27),r.add(c);for(const[a,h]of[[-5.3,24],[5.3,24],[-5.3,30],[5.3,30]]){const u=new G(new ze(.5,.78,6.8,8),s);u.position.set(a,3.9,h),r.add(u)}const l=new G(new it(4.5,.18,8,48),s);l.rotation.x=Math.PI/2,l.position.set(0,1.2,27),r.add(l),Ks(c),Ea(l);break}}}function Ks(r){r.userData.isLandscapeBeacon=!0}function Ea(r){r.userData.isLandscapeRing=!0}function Qv(r,e,t,n){const i=[{x:-21,z:-20,color:3718648},{x:21,z:-20,color:16498468},{x:-21,z:20,color:4906624},{x:21,z:20,color:16020150}];for(const s of i){const o=new G(new ze(3.3,3.7,.32,6),e);o.position.set(s.x,.7,s.z),r.add(o);const c=t.clone();c.color.setHex(s.color),c.emissive.setHex(s.color),c.emissiveIntensity=1.3;const l=new G(new wi(.95,1),c);l.position.set(s.x,2.2,s.z),l.userData.isLandscapeBeacon=!0,r.add(l);const a=new G(new it(1.55,.08,6,24),n.clone());a.material.color.setHex(s.color),a.material.emissive.setHex(s.color),a.rotation.x=Math.PI/2,a.position.set(s.x,1.25,s.z),a.userData.isLandscapeRing=!0,r.add(a)}}function e1(r,e,t,n,i){if(i){const c=new Pe({color:3360862,emissive:1058873,emissiveIntensity:.14,roughness:.78,metalness:.18}),l=new Pe({color:5735318,emissive:2646388,emissiveIntensity:.18,roughness:.62,metalness:.12});for(const _ of[-1,1]){const d=new G(new we(3.8,5.2,11),c);d.position.set(_*12.8,2.65,34),d.rotation.y=-_*.08,r.add(d);for(const m of[1.25,2.1,2.95]){const p=new G(new we(.08,.07,5.6),l);p.position.set(_*10.84,m,34),p.userData.isLandscapeRoute=!0,r.add(p)}}const a=new Pe({color:3891573,emissive:2649216,emissiveIntensity:.28,roughness:.52,metalness:.2}),h=new zi([new L(-9,5.5,42),new L(-6,8,42),new L(0,9.2,42),new L(6,8,42),new L(9,5.5,42)]),u=new G(new Si(h,40,.07,6,!1),a);u.userData.isLandscapeRoute=!0,r.add(u);const f=new Pe({color:10410461,emissive:5610924,emissiveIntensity:.34,roughness:.4,metalness:.18});for(const _ of[-9,9]){const d=new G(new fe(.46,12,8),f);d.position.set(_,5.5,42),d.userData.isLandscapeBeacon=!0,r.add(d)}return}const s=[[-28,35,13],[0,43,18],[28,35,11]];for(const[c,l,a]of s){const h=new G(new ze(2.4,3.3,a,6),e);h.position.set(c,a/2,l),r.add(h);const u=new G(new fe(2.2,12,8),t);u.position.set(c,a+1.1,l),u.userData.isLandscapeBeacon=!0,r.add(u);const f=new G(new it(3.6,.08,6,32),n);f.rotation.x=Math.PI/2,f.position.set(c,a*.64,l),f.userData.isLandscapeRing=!0,r.add(f)}const o=new G(new we(54,.18,.34),e);o.position.set(0,6.5,35),r.add(o)}function t1(r,e,t,n){for(const i of[-28,0,28]){const s=new G(new we(9,.4,6),e);s.position.set(i,.9,34),r.add(s);const o=new G(new Yt(7,3.6,4),t);o.position.set(i,4.2,34),o.rotation.y=Math.PI/4,r.add(o);const c=new G(new fe(.7,10,8),n);c.position.set(i,5.3,34),c.userData.isLandscapeBeacon=!0,r.add(c)}}function n1(r,e,t,n,i=!1){if(i)return;const s=new G(new ze(2.5,4.2,18,8),e);s.position.set(0,9,38),r.add(s);for(const[o,c,l,a]of[[-7,16,38,7],[7,18,38,8],[0,24,38,9]]){const h=new G(new wi(a,1),t);h.position.set(o,c,l),h.userData.isLandscapeBeacon=!0,r.add(h)}for(const o of[-31,31]){const c=new G(new it(4,.16,8,32),n);c.rotation.x=Math.PI/2,c.position.set(o,.9,36),c.userData.isLandscapeRing=!0,r.add(c)}}function i1(r,e,t,n,i,s=!1){if(s){const a=new G(new we(18,.36,8),e);a.position.set(0,.85,39),r.add(a);for(const _ of[-6.2,6.2]){const d=new G(new we(.48,5.8,.5),t);d.position.set(_,3.9,39),r.add(d)}const h=new G(new we(14,.48,6.4),i);h.position.set(0,6.9,39),r.add(h);const u=new G(new we(5.8,.3,1.35),t);u.position.set(0,1.9,35.5),u.userData.isLandscapeStage=!0,r.add(u);for(const _ of[-2.2,2.2]){const d=new G(new we(.22,1.6,.22),i);d.position.set(_,1.05,35.5),r.add(d)}const f=new G(new fe(.48,10,8),n);f.position.set(0,5.7,38.6),f.userData.isLandscapeBeacon=!0,r.add(f);return}const o=new G(new we(26,.7,15),e);o.position.set(0,1.1,39),r.add(o);for(const a of[-9,-3,3,9]){const h=new G(new ze(1.1,1.5,13,8),t);h.position.set(a,7.5,40),r.add(h)}const c=new G(new Yt(12,5,4),n);c.position.set(0,17,40),c.rotation.y=Math.PI/4,c.userData.isLandscapeBeacon=!0,r.add(c);const l=new G(new it(8,.18,8,48),i);l.rotation.x=Math.PI/2,l.position.set(0,15,40),l.userData.isLandscapeRing=!0,r.add(l)}function s1(r,e,t,n,i=!1){if(i){const a=new G(new ze(5,5.8,.3,10),e);a.position.set(9,.65,40),r.add(a);const h=new G(new Yt(1.65,8,8),t);h.position.set(9,4.8,40),h.userData.isLandscapeBeacon=!0,r.add(h);const u=new G(new it(3.7,.13,8,40),n);u.rotation.x=Math.PI/2.4,u.position.set(9,5,40),u.userData.isLandscapeRing=!0,r.add(u);return}const s=new G(new ze(12,14,.55,8),e);s.position.set(0,1.1,40),r.add(s);const o=new G(new Yt(3.2,16,8),t);o.position.set(0,9.5,40),o.userData.isLandscapeBeacon=!0,r.add(o);const c=new G(new it(8,.2,8,48),n);c.rotation.x=Math.PI/2.4,c.position.set(0,9,40),c.userData.isLandscapeRing=!0,r.add(c);const l=c.clone();l.rotation.x=-Math.PI/3,l.rotation.z=Math.PI/5,r.add(l)}function r1(r,e,t,n,i,s=!1){const o=new G(new we(30,.55,18),e);o.position.set(0,1,38),r.add(o);for(const c of[-12,0,12]){const l=new G(new we(8,.42,5.5),t);l.position.set(c,2,35),r.add(l);const a=new G(new Yt(5.7,2.8,4),n);a.position.set(c,5.1,35),a.rotation.y=Math.PI/4,a.userData.isLandscapeBeacon=!0,r.add(a)}if(!s){const c=new G(new we(13,13,2.2),t);c.position.set(0,7.2,49),r.add(c);const l=new G(new we(10.5,8.5,.22),n);l.position.set(0,7.4,47.8),l.userData.isLandscapeBeacon=!0,r.add(l);for(let a=-3;a<=3;a++){const h=new G(new we(7.5,.08,.12),i);h.position.set(0,5+a*1.15,47.62),h.userData.isLandscapeRing=!0,r.add(h)}}}function o1(r,e,t,n,i){const s=new G(new we(20,1,14),e);s.position.set(0,1.2,38),r.add(s);const o=new G(new ze(5.5,7,16,8),t);o.position.set(0,9.5,38),r.add(o);const c=new G(new Yt(8,5,8),n);c.position.set(0,20,38),c.userData.isLandscapeBeacon=!0,r.add(c);const l=new G(new it(7,.18,8,40,Math.PI),i);l.rotation.z=Math.PI,l.position.set(0,11,30),l.userData.isLandscapeRing=!0,r.add(l)}const a1={high:{pixelRatio:2,grass:7e3,reflectors:3,reflectRes:512,reflectDist:300,shadowMap:2048,bloom:!0,bloomScale:1},med:{pixelRatio:1.5,grass:3800,reflectors:2,reflectRes:384,reflectDist:220,shadowMap:1536,bloom:!0,bloomScale:.66},low:{pixelRatio:1,grass:1600,reflectors:0,reflectRes:256,reflectDist:160,shadowMap:1024,bloom:!1,bloomScale:.5}};function c1(){var s;if(typeof window>"u")return"med";const r=((s=window.matchMedia)==null?void 0:s.call(window,"(pointer: coarse)").matches)??!1,e=Math.min(window.innerWidth,window.innerHeight)<540,t=navigator.hardwareConcurrency??4,n=navigator.deviceMemory??4,i=r||e;return i&&(t<=4||n<=3)?"low":i||t<=4||n<=4?"med":"high"}const l1=5,h1=new L(0,1,0),u1=new L(1,0,0);class m1{constructor(e,t){Q(this,"container");Q(this,"renderer");Q(this,"scene");Q(this,"camera");Q(this,"raycaster",new Am);Q(this,"pointer",new ee);Q(this,"nodeGroups",new Map);Q(this,"pickables",[]);Q(this,"explorer");Q(this,"pathGroup");Q(this,"decorGroup");Q(this,"waterGroup");Q(this,"terrain");Q(this,"terrainMaps");Q(this,"readableGroundMap");Q(this,"mountains");Q(this,"skyDome");Q(this,"grassMesh");Q(this,"grassUniforms");Q(this,"clouds");Q(this,"unitLandscape");Q(this,"dustGroup");Q(this,"dustPool",[]);Q(this,"lastStep",0);Q(this,"sunDisc");Q(this,"composer");Q(this,"bloomPass");Q(this,"walkPhase",0);Q(this,"avatarYaw",0);Q(this,"avatarLean",0);Q(this,"expression","neutral");Q(this,"blinkTimer",2);Q(this,"blink",0);Q(this,"usingGlb",!1);Q(this,"mixer");Q(this,"glbIdle");Q(this,"glbWalk");Q(this,"glbClips");Q(this,"glbEmoting",!1);Q(this,"_n",new L);Q(this,"_fwd",new L);Q(this,"_right",new L);Q(this,"_basis",new qe);Q(this,"_q",new rn);Q(this,"_leanQ",new rn);Q(this,"sun");Q(this,"hemi");Q(this,"ambientLight");Q(this,"animId",0);Q(this,"paused",!0);Q(this,"pausedBeforeVisibility",!0);Q(this,"spectatorMode",!1);Q(this,"clock",new w2);Q(this,"_fpsTs",0);Q(this,"_fpsFrames",0);Q(this,"_fpsAdapted",!1);Q(this,"nodes",[]);Q(this,"currentId","");Q(this,"onNodeClick");Q(this,"onProximity");Q(this,"onExploreUpdate");Q(this,"onPickupNear");Q(this,"onPickupCollect");Q(this,"waterMeshes",[]);Q(this,"reflectors",[]);Q(this,"quality",c1());Q(this,"qcfg",a1[this.quality]);Q(this,"dynamicLightLimit",this.quality==="low"?5:this.quality==="med"?8:12);Q(this,"dynamicLightBudgetFrames",30);Q(this,"_lightPosition",new L);Q(this,"rebuildToken",0);Q(this,"player",new zv);Q(this,"explorerCam",new Ov);Q(this,"nearNode",null);Q(this,"currentBiome",Ac);Q(this,"activeUnitId");Q(this,"activeWorldId");Q(this,"activeWorldTitle");Q(this,"pickupGroup");Q(this,"pickupMeshes",new Map);Q(this,"pickupData",[]);Q(this,"nearPickup",null);Q(this,"lastExploreUpdateAt",0);Q(this,"waterFrame",0);Q(this,"onVisibilityChange",()=>{if(document.hidden){this.pausedBeforeVisibility=this.paused,this.pause();return}this.pausedBeforeVisibility||this.resume()});Q(this,"onKeyDown",e=>{this.paused||(e.key.toLowerCase()==="e"||e.key==="Enter")&&this.tryInteract()});Q(this,"onPointerDown",e=>{var s;if(this.paused)return;const t=this.renderer.domElement.getBoundingClientRect();this.pointer.x=(e.clientX-t.left)/t.width*2-1,this.pointer.y=-((e.clientY-t.top)/t.height)*2+1,this.raycaster.setFromCamera(this.pointer,this.camera);const n=this.raycaster.intersectObjects(this.pickables,!1)[0],i=n==null?void 0:n.object.userData.nodeId;if(i&&((s=this.nearNode)==null?void 0:s.id)===i&&this.nearNode.unlocked){this.onNodeClick(i);return}if(this.terrain){const o=this.raycaster.intersectObject(this.terrain,!1)[0];if(o&&(this.player.setMoveTarget(o.point.x,o.point.z),i)){const c=this.nodes.find(l=>l.id===i);c!=null&&c.unlocked&&this.player.setMoveTarget(c.x+3,c.z+3)}}});Q(this,"onResize",()=>{var n;const e=this.container.clientWidth,t=this.container.clientHeight;!e||!t||(this.camera.aspect=e/t,this.camera.updateProjectionMatrix(),this.renderer.setSize(e,t),(n=this.composer)==null||n.setSize(e,t))});Q(this,"animate",e=>{var o,c,l;if(this.paused){this.animId=0;return}this.animId=requestAnimationFrame(this.animate),this.clock.update(e);const t=Math.min(this.clock.getDelta(),.05),n=this.clock.getElapsed();if(!this._fpsAdapted){this._fpsFrames++;const a=performance.now();if(this._fpsTs===0&&(this._fpsTs=a),a-this._fpsTs>=3e3){if(this._fpsFrames/((a-this._fpsTs)/1e3)<40){const u=this.renderer.getPixelRatio(),f=Math.max(.75,u-.5);f<u&&(this.renderer.setPixelRatio(f),(o=this.composer)==null||o.setPixelRatio(f)),this._fpsAdapted=!0}this._fpsTs=a,this._fpsFrames=0}}this.mixer&&this.mixer.update(t);const i=this.explorerCam.update(this.camera,this.player.position,this.player.yaw,t);if(this.player.update(t,i),this.explorer){this.explorer.position.lerp(this.player.position,1-Math.exp(-14*t));let a=this.player.yaw-this.avatarYaw;for(;a>Math.PI;)a-=Math.PI*2;for(;a<-Math.PI;)a+=Math.PI*2;this.avatarYaw+=a*Math.min(1,t*12);const h=this.player.isMoving(),u=this.player.isSprinting();if(h){this.walkPhase+=t*(u?15:9.5);const A=Math.floor(this.walkPhase/Math.PI);if(A!==this.lastStep){this.lastStep=A;const M=A%2===0?1:-1,T=Math.cos(this.avatarYaw)*.18*M,C=-Math.sin(this.avatarYaw)*.18*M;this.emitDust(this.player.position.x+T,this.player.position.y,this.player.position.z+C)}}const f=this.explorer.userData.rig;if(f){if(h){const A=u?.95:.6,M=u?1.35:.95,T=Math.sin(this.walkPhase),C=Math.sin(this.walkPhase+Math.PI);f.leftLeg.hip.rotation.x=T*A,f.rightLeg.hip.rotation.x=C*A,f.leftLeg.knee.rotation.x=.12+Math.max(0,-T)*M,f.rightLeg.knee.rotation.x=.12+Math.max(0,-C)*M,f.leftArm.rotation.x=-T*.8,f.rightArm.rotation.x=-C*.8,f.head.rotation.z=0,f.cape.rotation.x=-.18-(.32+Math.abs(Math.sin(this.walkPhase))*.18)*(u?1.3:1),f.cape.rotation.z=Math.sin(this.walkPhase*.5)*.08}else{const A=Math.min(1,t*9);f.leftLeg.hip.rotation.x*=1-A,f.rightLeg.hip.rotation.x*=1-A,f.leftLeg.knee.rotation.x+=(.06-f.leftLeg.knee.rotation.x)*A,f.rightLeg.knee.rotation.x+=(.06-f.rightLeg.knee.rotation.x)*A,f.leftArm.rotation.x*=1-A,f.rightArm.rotation.x*=1-A,f.head.rotation.z=Math.sin(n*1.4)*.05,f.cape.rotation.x+=(-.2-f.cape.rotation.x)*A,f.cape.rotation.z+=(Math.sin(n*1.1)*.04-f.cape.rotation.z)*A}this.updateFace(f,t)}if(this.usingGlb&&this.glbWalk&&this.glbIdle&&!this.glbEmoting){const A=this.glbWalk.getEffectiveWeight(),M=A+((h?1:0)-A)*Math.min(1,t*6);this.glbWalk.setEffectiveWeight(M),this.glbIdle.setEffectiveWeight(1-M)}const _=h?u?.14:.05:0;this.avatarLean+=(_-this.avatarLean)*Math.min(1,t*8);const d=this.explorer.position.x,m=this.explorer.position.z,p=1.6,g=Ot(d-p,m,Ft),x=Ot(d+p,m,Ft),v=Ot(d,m-p,Ft),y=Ot(d,m+p,Ft);this._n.set(g-x,2*p,v-y).normalize(),this._n.lerp(h1,.55).normalize(),this._fwd.set(Math.sin(this.avatarYaw),0,Math.cos(this.avatarYaw)),this._fwd.addScaledVector(this._n,-this._fwd.dot(this._n)).normalize(),this._right.crossVectors(this._n,this._fwd).normalize(),this._fwd.crossVectors(this._right,this._n).normalize(),this._basis.makeBasis(this._right,this._n,this._fwd),this._q.setFromRotationMatrix(this._basis),this._leanQ.setFromAxisAngle(u1,this.avatarLean),this._q.multiply(this._leanQ),this.explorer.quaternion.slerp(this._q,1-Math.exp(-12*t));const w=h?Math.abs(Math.sin(this.walkPhase))*.06:Math.sin(n*1.4)*.01;this.explorer.position.y=this.player.position.y+w;const b=this.explorer.children.find(A=>{var M;return(M=A.userData)==null?void 0:M.isFootRing});if(b){const A=h?1+Math.sin(this.walkPhase)*.08:1;b.scale.set(A,A,A),b.material.opacity=h?.45:.28}}this.updateProximity(),this.updatePickupProximity(),this.updateDust(t),this.tickScene(n,t);const s=performance.now();(s-this.lastExploreUpdateAt>=66||this.lastExploreUpdateAt===0)&&(this.lastExploreUpdateAt=s,(l=this.onExploreUpdate)==null||l.call(this,{playerX:this.player.position.x,playerZ:this.player.position.z,playerYaw:this.player.yaw,nodes:this.nodes,nearNodeId:(c=this.nearNode)==null?void 0:c.id,pickups:this.pickupData,biome:this.minimapPalette()})),this.composer?this.composer.render():this.renderer.render(this.scene,this.camera)});this.container=e,this.onNodeClick=t.onNodeClick,this.onProximity=t.onProximity,this.onExploreUpdate=t.onExploreUpdate,this.onPickupNear=t.onPickupNear,this.onPickupCollect=t.onPickupCollect;const n=e.clientWidth||360,i=e.clientHeight||420;this.scene=new Yd,this.scene.fog=new xo(1713472,.0042),this.camera=new tn(50,n/i,.2,900),this.camera.position.set(0,8,20),this.renderer=new b2({antialias:this.quality!=="low",alpha:!1,powerPreference:"high-performance"}),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,this.qcfg.pixelRatio)),this.renderer.setSize(n,i),this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=Qs,this.renderer.toneMapping=wo,this.renderer.toneMappingExposure=1.28,this.renderer.outputColorSpace=Et,e.appendChild(this.renderer.domElement),this.explorerCam.bindDrag(this.renderer.domElement),this.buildSky(),this.buildClouds(),this.buildLights(),this.buildTerrain(),this.buildMountains(),this.buildGrass(),this.buildDust(),this.spawnExplorer(),this.setupPostFX(n,i),this.bindEvents()}setupPostFX(e,t){if(!this.qcfg.bloom){this.composer=void 0;return}try{const n=new L2(this.renderer);n.addPass(new I2(this.scene,this.camera));const i=this.qcfg.bloomScale,s=new Es(new ee(e*i,t*i),.62,.5,.78);n.addPass(s),n.addPass(new N2),n.setPixelRatio(Math.min(window.devicePixelRatio,this.qcfg.pixelRatio)),n.setSize(e,t),this.composer=n,this.bloomPass=s}catch{this.composer=void 0}}setNodes(e,t,n=!0){if(this.nodes=e,this.currentId=t,this.rebuildPath(),this.rebuildDecor(),n)this.rebuildNodesAsync();else{this.rebuildToken++;for(const i of this.nodeGroups.values())this.scene.remove(i),Ds(i);this.nodeGroups.clear(),this.pickables=[]}this.teleportToNode(t),this.updateDynamicLightBudget(!0)}resume(){this.paused&&(this.paused=!1,this.player.setEnabled(!this.spectatorMode),this.onResize(),this.animId||this.animate())}pause(){this.paused=!0,this.player.setEnabled(!1),this.animId&&(cancelAnimationFrame(this.animId),this.animId=0)}setSpectatorMode(e){this.spectatorMode=e,this.player.setStickInput(0,0),this.player.setEnabled(!e&&!this.paused),this.explorer&&(this.explorer.visible=!e)}tryInteract(){var e,t;return this.nearPickup?((e=this.onPickupCollect)==null||e.call(this,this.nearPickup.id),!0):(t=this.nearNode)!=null&&t.unlocked?(this.onNodeClick(this.nearNode.id),!0):!1}setStickInput(e,t){this.player.setStickInput(e,t)}setBiome(e){this.activeUnitId=e,this.activeWorldId=void 0,this.activeWorldTitle=void 0;const t=Vv(e);this.currentBiome=t,this.grassMesh&&(this.grassMesh.visible=t.decorStyle!=="space"),this.applyBiomeToSky(t),this.applyBiomeToLights(t),this.applyBiomeToTerrain(t,!1),this.applyOutfitFromBiome(t),this.scene.fog=new xo(t.fogColor,t.fogDensity)}setSubWorld(e,t){if(!(this.activeWorldId===e&&this.activeWorldTitle===t)&&(this.activeWorldId=e,this.activeWorldTitle=t,this.applyBiomeToTerrain(this.currentBiome,qt(e)),this.grassMesh&&(this.grassMesh.visible=this.currentBiome.decorStyle!=="space"&&!qt(e)),this.bloomPass&&(this.bloomPass.strength=qt(e)?.2:mn.clamp(.5+(1.5-this.currentBiome.sunIntensity)*.28,.45,1.05)),this.activeUnitId&&this.nodes.length>0&&(this.rebuildUnitLandscape(),qt(e)))){const n=this.nodes.find(i=>i.id===this.currentId)??this.nodes[0];if(n){const i=Ot(n.x,n.z,Ft);this.player.yaw=0,this.player.setPosition(n.x,i,n.z+2.5),this.avatarYaw=0,this.explorerCam.resetBehind(0)}}}setOutfitAccent(e){var n;const t=(n=this.explorer)==null?void 0:n.userData.rig;if(t){t.mats.trim.color.setHex(e),t.mats.trim.emissive.setHex(e).multiplyScalar(.4),t.mats.cape.color.setHex(e),t.mats.cape.emissive.setHex(e).multiplyScalar(.35);return}this.usingGlb&&this.explorer&&this.explorer.traverse(i=>{const s=i,o=s.material;s.isMesh&&o&&"emissive"in o&&o.emissive.setHex(e).multiplyScalar(.45)})}setExpression(e){this.expression=e,this.usingGlb&&this.playGlbEmote(e)}playGlbEmote(e){var o;if(!this.mixer||!this.glbClips||!this.glbIdle)return;const t=e==="happy"?"Wave":e==="surprised"?"Jump":null;if(!t){this.glbEmoting=!1,this.glbIdle.reset().fadeIn(.3).play();return}const n=this.glbClips.find(c=>c.name===t);if(!n)return;const i=this.mixer.clipAction(n);i.setLoop(xu,1),i.clampWhenFinished=!1,i.reset().play(),(o=this.glbWalk)==null||o.setEffectiveWeight(0),this.glbIdle.crossFadeTo(i,.2,!1),this.glbEmoting=!0;const s=c=>{var l;c.action===i&&(this.glbEmoting=!1,i.crossFadeTo(this.glbIdle.reset().play(),.3,!1),(l=this.mixer)==null||l.removeEventListener("finished",s))};this.mixer.addEventListener("finished",s)}applyOutfitFromBiome(e){this.setOutfitAccent(e.crystalColor)}minimapPalette(){const e=this.currentBiome,[t,n,i]=e.terrainTint,s=Math.round(t*255)<<16|Math.round(n*255)<<8|Math.round(i*255),o=Math.min(255,Math.round(t*255)+70)<<16|Math.min(255,Math.round(n*255)+80)<<8|Math.min(255,Math.round(i*255)+60);return{ground:s,highland:o,path:e.pathColor}}updateGrassLOD(){const e=this.grassMesh;if(!(e!=null&&e.userData.grassPositions))return;const t=(e.userData.lodFrame??0)+1;if(e.userData.lodFrame=t,t%30!==0)return;const n=e.userData.grassPositions,i=e.userData.grassScales,s=e.count,o=this.player.position.x,c=this.player.position.z,l=4225,a=new bt;let h=!1;for(let u=0;u<s;u++){const f=n[u*3]-o,_=n[u*3+2]-c,d=f*f+_*_<l,m=i[u],p=d?1:0;if(m!==p){if(i[u]=p,e.getMatrixAt(u,a.matrix),a.matrix.decompose(a.position,a.quaternion,a.scale),p===0)a.scale.setScalar(0);else{const g=.7+Math.abs(n[u*3]*7919+n[u*3+2]*3571)%1e3/1e3*1.2;a.scale.set(g,.8+Math.abs(n[u*3+1]*6271)%1e3/1e3,g)}a.updateMatrix(),e.setMatrixAt(u,a.matrix),h=!0}}h&&(e.instanceMatrix.needsUpdate=!0)}disposeReflectors(){for(const e of this.reflectors)e.getRenderTarget().dispose(),e.geometry.dispose(),e.material.dispose();this.reflectors=[]}updateFace(e,t){this.blinkTimer-=t,this.blinkTimer<=0&&(this.blink=1,this.blinkTimer=2.4+Math.random()*3.2),this.blink=Math.max(0,this.blink-t*9);const n=1-this.blink*.85;e.eyeL.scale.y=n,e.eyeR.scale.y=n;const i=this.nearNode||this.nearPickup?"happy":this.expression;let s=.37,o=1,c=1,l=.2;i==="happy"?(s=.39,o=1.5,c=.85,l=.188):i==="surprised"&&(s=.42,o=.7,c=2.4,l=.192);const a=Math.min(1,t*8);e.brow.position.y+=(s-e.brow.position.y)*a,e.mouth.scale.x+=(o-e.mouth.scale.x)*a,e.mouth.scale.y+=(c-e.mouth.scale.y)*a,e.mouth.position.y+=(l-e.mouth.position.y)*a}setPickups(e){this.pickupData=e,this.rebuildPickups()}markPickupCollected(e){var i,s;const t=this.pickupData.find(o=>o.id===e);t&&(t.collected=!0);const n=this.pickupMeshes.get(e);n&&(n.userData.dying=!0,n.userData.dieTimer=0),((i=this.nearPickup)==null?void 0:i.id)===e&&(this.nearPickup=null,(s=this.onPickupNear)==null||s.call(this,null))}tryCollectPickup(){var e;return this.nearPickup?((e=this.onPickupCollect)==null||e.call(this,this.nearPickup.id),!0):!1}dispose(){var e,t,n,i,s,o,c;if(cancelAnimationFrame(this.animId),this.animId=0,this.renderer.domElement.removeEventListener("pointerdown",this.onPointerDown),window.removeEventListener("keydown",this.onKeyDown),window.removeEventListener("resize",this.onResize),document.removeEventListener("visibilitychange",this.onVisibilityChange),this.player.dispose(),$t(this.scene,this.pathGroup),$t(this.scene,this.decorGroup),$t(this.scene,this.waterGroup),$t(this.scene,this.mountains),$t(this.scene,this.clouds),$t(this.scene,this.unitLandscape),$t(this.scene,this.explorer),this.removePickupGroup(),this.grassMesh&&(this.scene.remove(this.grassMesh),this.grassMesh.geometry.dispose(),this.grassMesh.material.dispose()),this.sunDisc&&(this.scene.remove(this.sunDisc),(e=this.sunDisc.material.map)==null||e.dispose(),this.sunDisc.material.dispose()),this.dustGroup){this.scene.remove(this.dustGroup);const l=(t=this.dustPool[0])==null?void 0:t.material;(n=l==null?void 0:l.map)==null||n.dispose();for(const a of this.dustPool)a.material.dispose();this.dustPool=[]}this.disposeReflectors(),(i=this.mixer)==null||i.stopAllAction(),(s=this.composer)==null||s.dispose();for(const l of this.nodeGroups.values())Ds(l);if(this.pickupMeshes.clear(),this.terrain){this.terrain.geometry.dispose();const l=this.terrain.material;for(const a of new Set([l.map,this.readableGroundMap]))a==null||a.dispose();(o=l.roughnessMap)==null||o.dispose(),(c=l.normalMap)==null||c.dispose(),l.dispose()}this.skyDome&&(this.skyDome.geometry.dispose(),this.skyDome.material.dispose()),this.renderer.dispose(),this.renderer.domElement.remove()}spawnExplorer(){$t(this.scene,this.explorer),this.explorer=Fv(),this.scene.add(this.explorer),this.explorer.visible=!this.spectatorMode,this.applyOutfitFromBiome(this.currentBiome),this.tryLoadGlbAvatar()}async tryLoadGlbAvatar(){var e;try{const t=await cf(),n=(e=t==null?void 0:t.world)==null?void 0:e.avatar;if(!t||!n)return;const i=await xv(n.file,n,t);if(!i)return;if($t(this.scene,this.explorer),this.explorer=i.group,this.explorer.position.copy(this.player.position),this.explorer.quaternion.setFromEuler(new ri(0,this.avatarYaw,0)),this.scene.add(this.explorer),this.usingGlb=!0,i.clips.length){this.mixer=new Em(this.explorer),this.glbClips=i.clips;const s=i.clips.find(c=>/idle|stand|breath/i.test(c.name))??i.clips[0];this.glbIdle=this.mixer.clipAction(s),this.glbIdle.play();const o=i.clips.find(c=>/walk|run|move/i.test(c.name));o&&(this.glbWalk=this.mixer.clipAction(o),this.glbWalk.play(),this.glbWalk.setEffectiveWeight(0))}}catch{}}teleportToNode(e){const t=this.nodes.find(i=>i.id===e)??this.nodes[0];if(!t)return;const n=Ot(t.x,t.z,Ft);this.player.yaw=0,this.player.setPosition(t.x+4,n,t.z-8),this.explorer&&(this.explorer.position.copy(this.player.position),this.explorer.rotation.set(0,this.player.yaw,0),this.explorer.quaternion.setFromEuler(this.explorer.rotation)),this.avatarYaw=this.player.yaw,this.avatarLean=0,this.explorerCam.resetBehind(this.player.yaw),this.camera.position.set(t.x+10,n+7,t.z-16),this.camera.lookAt(t.x,n+1.5,t.z)}buildSky(){const e=new Xt({side:Zt,depthWrite:!1,uniforms:{topColor:{value:new ye(3824266)},midColor:{value:new ye(5929642)},bottomColor:{value:new ye(659488)},offset:{value:22},exponent:{value:.52}},vertexShader:`
        varying vec3 vWorldPosition;
        void main() {
          vec4 wp = modelMatrix * vec4(position, 1.0);
          vWorldPosition = wp.xyz;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,fragmentShader:`
        uniform vec3 topColor, midColor, bottomColor;
        uniform float offset, exponent;
        varying vec3 vWorldPosition;
        void main() {
          float h = normalize(vWorldPosition + offset).y;
          vec3 col = mix(bottomColor, midColor, smoothstep(-0.15, 0.35, h));
          col = mix(col, topColor, smoothstep(0.25, 0.95, h));
          gl_FragColor = vec4(col, 1.0);
        }
      `});this.skyDome=new G(new fe(560,48,32),e),this.scene.add(this.skyDome);const t=new Float32Array(2e3*3),n=Qn(42);for(let o=0;o<2e3;o++){const c=300+n()*80,l=n()*Math.PI*2,a=n()*Math.PI*.45;t[o*3]=c*Math.sin(a)*Math.cos(l),t[o*3+1]=c*Math.cos(a)+30,t[o*3+2]=c*Math.sin(a)*Math.sin(l)+li}const i=new Tt;i.setAttribute("position",new Dt(t,3)),this.scene.add(new Pu(i,new Qc({color:15265528,size:.42,transparent:!0,opacity:.82,sizeAttenuation:!0})));const s=new xi({map:this.makeGlowTexture(),color:16773320,transparent:!0,depthWrite:!1,blending:rr,fog:!1});this.sunDisc=new Ii(s),this.sunDisc.scale.set(52,52,1),this.scene.add(this.sunDisc)}makeGlowTexture(){const t=document.createElement("canvas");t.width=t.height=256;const n=t.getContext("2d"),i=n.createRadialGradient(256/2,256/2,0,256/2,256/2,256/2);i.addColorStop(0,"rgba(255,255,255,1)"),i.addColorStop(.18,"rgba(255,245,210,0.95)"),i.addColorStop(.5,"rgba(255,210,140,0.35)"),i.addColorStop(1,"rgba(255,200,120,0)"),n.fillStyle=i,n.fillRect(0,0,256,256);const s=new Mi(t);return s.colorSpace=Et,s}buildDust(){const e=this.makeCloudTexture(),t=new gt;for(let n=0;n<28;n++){const i=new xi({map:e,color:13483942,transparent:!0,opacity:0,depthWrite:!1}),s=new Ii(i);s.visible=!1,s.userData={life:0,vx:0,vy:0,vz:0},t.add(s),this.dustPool.push(s)}this.dustGroup=t,this.scene.add(t)}emitDust(e,t,n){let i=0;for(const s of this.dustPool){if(s.userData.life>0)continue;s.position.set(e+(Math.random()-.5)*.2,t+.05,n+(Math.random()-.5)*.2),s.userData.life=1,s.userData.vx=(Math.random()-.5)*.6,s.userData.vy=.3+Math.random()*.45,s.userData.vz=(Math.random()-.5)*.6;const o=.3+Math.random()*.2;if(s.scale.set(o,o,1),s.visible=!0,s.material.opacity=.5,++i>=3)break}}updateDust(e){for(const t of this.dustPool){const n=t.userData.life;if(n<=0)continue;const i=n-e*1.4;if(t.userData.life=i,i<=0){t.visible=!1;continue}t.userData.vy=t.userData.vy-e*.6,t.position.x+=t.userData.vx*e,t.position.y+=t.userData.vy*e,t.position.z+=t.userData.vz*e,t.material.opacity=i*.5;const s=(1.3-i)*.6+.3;t.scale.set(s,s,1)}}buildLights(){this.hemi=new sm(13164799,2373672,.72),this.scene.add(this.hemi),this.ambientLight=new cm(10137804,.32),this.scene.add(this.ambientLight),this.sun=new Mc(16774368,1.45),this.sun.position.set(55,72,35),this.sun.castShadow=!0,this.sun.shadow.mapSize.set(this.qcfg.shadowMap,this.qcfg.shadowMap);const e=this.sun.shadow.camera;e.near=8,e.far=340,e.left=e.bottom=-150,e.right=e.top=150,this.sun.shadow.bias=-35e-5,this.scene.add(this.sun);const t=new Mc(9221375,.5);t.position.set(-40,28,-30);const n=new En(10864895,.55,160);n.position.set(-35,28,li),n.userData.isGlobalLight=!0,this.scene.add(t,n)}updateDynamicLightBudget(e=!1){if(!e&&++this.dynamicLightBudgetFrames<30)return;this.dynamicLightBudgetFrames=0;const t=[];this.scene.traverse(n=>{const i=n;if(i.userData.isGlobalLight||!i.isLight||!i.isPointLight&&!i.isSpotLight)return;const s=i;s.getWorldPosition(this._lightPosition),t.push({light:s,distance:this._lightPosition.distanceToSquared(this.player.position)})}),t.sort((n,i)=>n.distance-i.distance);for(let n=0;n<t.length;n++)t[n].light.visible=n<this.dynamicLightLimit}applyBiomeToSky(e){if(!this.skyDome)return;const t=this.skyDome.material;t.uniforms.topColor.value.setHex(e.skyTop),t.uniforms.midColor.value.setHex(e.skyMid),t.uniforms.bottomColor.value.setHex(e.skyBot),t.needsUpdate=!0}applyBiomeToLights(e){this.hemi&&(this.hemi.color.setHex(e.hemiSky),this.hemi.groundColor.setHex(e.hemiGround)),this.ambientLight&&this.ambientLight.color.setHex(e.ambientColor),this.sun&&(this.sun.color.setHex(e.sunColor),this.sun.intensity=e.sunIntensity),this.sunDisc&&this.sunDisc.material.color.setHex(e.sunColor),this.bloomPass&&(this.bloomPass.strength=mn.clamp(.5+(1.5-e.sunIntensity)*.28,.45,1.05))}applyBiomeToTerrain(e,t){if(!this.terrain)return;const[n,i,s]=e.terrainTint,o=this.terrain.material,c=this.readableGroundMap??null,l=o.map!==c||o.vertexColors;o.map=c,o.vertexColors=!1,t?(o.color.setRGB(mn.clamp(.28+n*.34,.26,.48),mn.clamp(.28+i*.34,.26,.46),mn.clamp(.29+s*.32,.27,.44)),o.roughness=.94,o.metalness=.02):(o.color.setRGB(mn.clamp(.27+n*.8,.28,.58),mn.clamp(.28+i*.62,.3,.58),mn.clamp(.29+s*.72,.3,.6)),o.roughness=.9,o.metalness=.02),l&&(o.needsUpdate=!0)}rebuildPickups(){this.removePickupGroup(),this.pickupMeshes.clear(),this.pickupGroup=new gt;for(const e of this.pickupData){if(e.collected)continue;const t=this.createPickupOrb(e);this.pickupGroup.add(t),this.pickupMeshes.set(e.id,t)}this.scene.add(this.pickupGroup),this.updateDynamicLightBudget(!0)}createPickupOrb(e){const t=this.currentBiome,n=new gt;n.position.set(e.x,e.y,e.z),n.userData.pickupId=e.id;const i=new Pe({color:t.orbColor,emissive:new ye(t.orbColor),emissiveIntensity:1.8,roughness:.1,metalness:.4,transparent:!0,opacity:.92}),s=new G(new fe(.32,14,10),i);s.userData.isOrbCore=!0,n.add(s);const o=new kt({color:t.glowColor,transparent:!0,opacity:.22,side:Zt,depthWrite:!1}),c=new G(new fe(.58,12,8),o);c.userData.isOrbGlow=!0,n.add(c);const l=new it(.52,.04,6,24),a=new kt({color:t.orbColor,transparent:!0,opacity:.55,depthWrite:!1}),h=new G(l,a);h.userData.isOrbRing=!0,h.rotation.x=Math.PI/3,n.add(h);const u=new En(t.glowColor,.6,8);u.userData.isOrbLight=!0,n.add(u);const f=this.createWordSprite(e.word,t.orbColor);return f.position.y=1.1,f.userData.isWordSprite=!0,n.add(f),n.userData.baseY=e.y,n.userData.pickupId=e.id,n}createWordSprite(e,t){var h;const i=`#${new ye(t).getHexString()}`,s=document.createElement("canvas");s.width=256,s.height=64;const o=s.getContext("2d");o.clearRect(0,0,256,64),o.fillStyle="rgba(0,0,0,0.52)",(h=o.roundRect)==null||h.call(o,4,8,248,48,12),o.fill(),o.font="bold 26px 'Arial', sans-serif",o.fillStyle=i,o.textAlign="center",o.textBaseline="middle",o.shadowColor=i,o.shadowBlur=8,o.fillText(e,128,34);const c=new Mi(s),l=new xi({map:c,transparent:!0,depthWrite:!1}),a=new Ii(l);return a.scale.set(2.4,.6,1),a}disposePickupResources(e){Ds(e)}removePickupGroup(){this.pickupGroup&&(this.scene.remove(this.pickupGroup),this.disposePickupResources(this.pickupGroup),this.pickupGroup=void 0)}buildTerrain(){const e=new xn(qn.width,qn.depth,Ml.w,Ml.d);e.rotateX(-Math.PI/2);const t=e.attributes.position;for(let n=0;n<t.count;n++){const i=t.getX(n),s=t.getZ(n),o=Ft(i,s);t.setY(n,o)}e.computeVertexNormals(),this.terrainMaps=Hv(),this.readableGroundMap=Wv(),this.terrain=new G(e,new Pe({color:16777215,map:this.readableGroundMap,roughnessMap:this.terrainMaps.roughness,normalMap:this.terrainMaps.normal,normalScale:new ee(.85,.85),vertexColors:!1,roughness:.82,metalness:.06})),this.terrain.receiveShadow=!0,this.terrain.position.set(0,Rf,li),this.scene.add(this.terrain),this.applyBiomeToTerrain(this.currentBiome,!1)}buildMountains(){$t(this.scene,this.mountains);const e=new gt,t=Qn(7),n=Math.max(qn.width,qn.depth)*.5,i=this.quality==="low"?18:this.quality==="med"?24:30,s=this.quality!=="low";for(let o=0;o<i;o++){const c=o/i*Math.PI*2+(t()-.5)*.18,l=n+t()*40,a=Math.cos(c)*l,h=Math.sin(c)*l+li,u=42+t()*78,f=32+t()*46,_=3095634+Math.floor(t()*10)*65793,d=new Pe({color:_,roughness:1,metalness:0,flatShading:!0,fog:!0}),m=new G(new Yt(f,u,5+Math.floor(t()*3),1),d);if(m.position.set(a,u/2-8,h),m.rotation.y=t()*Math.PI,m.scale.set(1,.8+t()*.5,1),e.add(m),s&&u>70){const p=u*(.18+t()*.12),g=new G(new Yt(f*.42,p,5,1),new Pe({color:14215416,roughness:.95,metalness:0,flatShading:!0,fog:!0}));g.position.set(a,u-p*.35-8,h),g.rotation.y=m.rotation.y,e.add(g)}}this.mountains=e,this.scene.add(e)}buildGrass(){const e=bv(),t=new Pe({vertexColors:!0,roughness:.9,metalness:0,side:It});t.onBeforeCompile=l=>{l.uniforms.uTime={value:0},l.uniforms.uPlayer={value:new L(0,0,0)},this.grassUniforms=l.uniforms,l.vertexShader=`uniform float uTime;
uniform vec3 uPlayer;
`+l.vertexShader,l.vertexShader=l.vertexShader.replace("#include <begin_vertex>",`#include <begin_vertex>
         float gH = position.y / 0.5;
         vec4 gWp = instanceMatrix * vec4(0.0, 0.0, 0.0, 1.0);
         float gPh = gWp.x * 0.12 + gWp.z * 0.12;
         float gSway = sin(uTime * 1.5 + gPh) * 0.16 + sin(uTime * 2.7 + gPh * 1.6) * 0.06;
         transformed.x += gSway * gH;
         transformed.z += gSway * 0.4 * gH;
         // 角色踩踏：附近草向外侧倒伏并压低
         vec2 gToP = gWp.xz - uPlayer.xz;
         float gd = length(gToP);
         float gTramp = smoothstep(2.4, 0.5, gd);
         vec2 gDir = gToP / max(gd, 0.001);
         transformed.xz += gDir * gTramp * gH * 0.55;
         transformed.y -= gTramp * gH * 0.4;`)};const n=this.qcfg.grass,i=new Ru(e,t,n);i.frustumCulled=!0,i.castShadow=!1,i.receiveShadow=!0;const s=Qn(31337),o=new bt,c=new Float32Array(n*3);for(let l=0;l<n;l++){const a=(s()-.5)*220,h=li+(s()-.5)*qn.depth*.9,u=Ot(a,h,Ft);c[l*3]=a,c[l*3+1]=u,c[l*3+2]=h,o.position.set(a,u,h),o.rotation.set(0,s()*Math.PI,0);const f=.7+s()*1.2;o.scale.set(f,.8+s()*1,f),o.updateMatrix(),i.setMatrixAt(l,o.matrix)}i.count=n,i.instanceMatrix.needsUpdate=!0,i.userData.grassPositions=c,i.userData.grassScales=new Float32Array(n).fill(1),i.userData.lodFrame=0,this.grassMesh=i,i.visible=this.currentBiome.decorStyle!=="space",this.scene.add(i)}buildClouds(){$t(this.scene,this.clouds);const e=this.makeCloudTexture(),t=new gt;t.position.z=li;const n=Qn(5150);for(let i=0;i<18;i++){const s=new xi({map:e,transparent:!0,opacity:.42+n()*.28,depthWrite:!1,fog:!1}),o=new Ii(s),c=n()*Math.PI*2,l=130+n()*260;o.position.set(Math.cos(c)*l,86+n()*70,Math.sin(c)*l);const a=70+n()*140;o.scale.set(a,a*(.42+n()*.2),1),t.add(o)}this.clouds=t,this.scene.add(t)}makeCloudTexture(){const t=document.createElement("canvas");t.width=t.height=256;const n=t.getContext("2d");n.clearRect(0,0,256,256);for(let s=0;s<26;s++){const o=256*(.25+Math.random()*.5),c=256*(.35+Math.random()*.3),l=256*(.08+Math.random()*.18),a=n.createRadialGradient(o,c,0,o,c,l);a.addColorStop(0,"rgba(255,255,255,0.5)"),a.addColorStop(1,"rgba(255,255,255,0)"),n.fillStyle=a,n.beginPath(),n.arc(o,c,l,0,Math.PI*2),n.fill()}const i=new Mi(t);return i.colorSpace=Et,i}rebuildPath(){if($t(this.scene,this.pathGroup),this.pathGroup=new gt,this.nodes.length<2){this.scene.add(this.pathGroup);return}const e=!!this.activeUnitId,t=e?this.nodes.slice(1).map(f=>[this.nodes[0],f]):this.nodes.slice(0,-1).map((f,_)=>[f,this.nodes[_+1]]),n=this.nodes.map(f=>new L(f.x,Ot(f.x,f.z,Ft)+.45,f.z)),i=new zi(n,!1,"catmullrom",.35),s=Math.max(n.length*28,80),o=[];for(const[f,_]of t){const d=f.cleared&&_.cleared,m=Ot(f.x,f.z,Ft)+.45,p=Ot(_.x,_.z,Ft)+.45,g=new zi([new L(f.x,m,f.z),new L(_.x,p,_.z)],!1,"catmullrom",.4);if(o.push(g),!e){const x=new G(new Si(g,16,.48,12,!1),new Pe({color:d?4885618:4016732,roughness:.68,metalness:.1}));x.receiveShadow=!0;const v=new G(new Si(g,16,.26,10,!1),vv(d));v.position.y=.08,this.pathGroup.add(x,v)}}const c=wa(e?2834775:7041664),l=wa(e?3493734:9147295),a=wa(e?2504779:5595246),h=[c,l,a],u=new we(1.05,.13,.72);if(e)t.forEach(([f,_],d)=>{const m=o[d],p=Math.max(16,Math.ceil(Math.hypot(f.x-_.x,f.z-_.z)/1.6));for(let g=0;g<=p;g++){const x=g/p,v=Math.min(1,(g+.5)/p),y=m.getPoint(x);y.y=Ot(y.x,y.z,Ft)+.01;const w=m.getPoint(v),b=new G(u,h[g%h.length]);b.position.copy(y),b.lookAt(w.x,y.y,w.z),b.receiveShadow=!0,this.pathGroup.add(b)}});else for(let f=0;f<=s;f++){const _=f/s,d=Math.min(1,(f+.5)/s),m=i.getPoint(_);m.y=Ot(m.x,m.z,Ft)+.01;const p=i.getPoint(d),g=new G(u,h[f%h.length]);g.position.copy(m),g.lookAt(p.x,m.y,p.z),g.receiveShadow=!0,this.pathGroup.add(g)}if(!e){const f=yv("rgba(255,220,140,1)"),_=new ze(.055,.07,2.6,7),d=new ze(.03,.03,.8,5),m=new fe(.14,8,6),p=Mv(),g=Sv(16769152);for(let x=0;x<this.nodes.length;x+=Math.max(1,Math.floor(this.nodes.length/8))){const v=this.nodes[x],y=Math.min(1,(x+.5)/Math.max(1,this.nodes.length-1)),w=i.getTangent(y),b=new L(-w.z,0,w.x).normalize();for(const A of[-1,1]){const M=v.x+b.x*2.2*A,T=v.z+b.z*2.2*A,C=Ot(M,T,Ft),P=new G(_,p);P.position.set(M,C+1.3,T),P.castShadow=!0;const I=new G(d,p);I.rotation.z=Math.PI/2,I.position.set(M+.4*A*-1,C+2.55,T);const F=new G(m,g);F.position.set(M+.8*A*-1,C+2.55,T);const V=new Ii(new xi({map:f,transparent:!0,opacity:.7,depthWrite:!1,blending:rr}));V.scale.setScalar(1.8),V.position.set(M+.8*A*-1,C+2.6,T),this.pathGroup.add(P,I,F,V)}}}this.scene.add(this.pathGroup)}rebuildDecor(){this.disposeReflectors(),$t(this.scene,this.decorGroup),$t(this.scene,this.waterGroup),this.decorGroup=new gt,this.waterGroup=new gt,this.waterMeshes=[];const e=Qn(2024),t=new Set,n=this.activeUnitId?this.nodes.find(p=>p.unlocked)??this.nodes[0]:void 0,i=!!(n&&this.activeUnitId),s=(n==null?void 0:n.x)??0,o=(n==null?void 0:n.z)??li,c=(p,g)=>!i&&this.nodes.some(x=>Math.hypot(p-(x.x+4),g-(x.z-8))<26);this.rebuildUnitLandscape();const l=i?this.quality==="low"?8:this.quality==="med"?12:18:this.quality==="low"?16:this.quality==="med"?24:34,a=i?this.quality==="low"?42:this.quality==="med"?64:92:this.quality==="low"?80:this.quality==="med"?120:180;for(const p of this.nodes){const g=Qn(p.id.length*997+p.z);for(let x=0;x<l;x++){const v=g()*Math.PI*2,y=i?32+g()*22:6+g()*24,w=p.x+Math.cos(v)*y,b=p.z+Math.sin(v)*y;if(i&&Math.hypot(w-s,b-o)<25||c(w,b))continue;const A=`${Math.round(w)}_${Math.round(b)}`;if(t.has(A))continue;t.add(A);const M=Ot(w,b,Ft),T=i?.65+g()*.75:.75+g()*1.1;this.addDecorAt(i?this.currentBiome.decorStyle:p.theme,w,M,b,T,g)}}const h=Qn(909),u=i?145:qn.width*.46,f=i?190:qn.depth*.46;for(let p=0;p<a;p++){const g=s+(h()-.5)*2*u,x=o+(h()-.5)*2*f;if(i&&Math.hypot(g-s,x-o)<25||c(g,x)||!i&&Math.abs(g)<14)continue;const v=Ot(g,x,Ft),y=.8+h()*1.5;if(i&&this.currentBiome.decorStyle==="space"){const w=io(y*.72);w.position.set(g,v+.16,x),w.rotation.set(h()*.18,h()*Math.PI*2,h()*.18),this.decorGroup.add(w)}else if(h()>.42){const w=h()>.5?nu(y):tu(y);w.position.set(g,v,x),w.rotation.y=h()*Math.PI*2,this.decorGroup.add(w)}else{const w=io(y*.85);w.position.set(g,v+.2,x),w.rotation.set(h(),h(),h()),this.decorGroup.add(w)}}const _=i&&this.currentBiome.decorStyle==="space"?0:i?2:6,d=this.qcfg.reflectors;for(let p=0;p<_;p++){const g=p%2===0?-1:1,x=s+g*(i?52+e()*18:60+e()*55),v=o-f*.8+p*(f*1.5/_)+e()*18,y=i?34+e()*14:48+e()*26,w=i?24+e()*12:30+e()*18,b=Ot(x,v,Ft)-.6;if(p<d){const M=new Co(new xn(y,w),{textureWidth:this.qcfg.reflectRes,textureHeight:this.qcfg.reflectRes,color:1918038});M.rotation.x=-Math.PI/2,M.position.set(x,b,v),this.reflectors.push(M),this.waterGroup.add(M);const T=new G(new xn(y,w,18,12),eu());T.material.opacity=.26,T.rotation.x=-Math.PI/2,T.position.set(x,b+.05,v),T.userData.isWater=!0,T.userData.baseOpacity=.26,this.waterMeshes.push(T),this.waterGroup.add(T)}else{const M=new G(new xn(y,w,16,10),eu());M.material.opacity=.82,M.rotation.x=-Math.PI/2,M.position.set(x,b+.02,v),M.userData.isWater=!0,M.userData.baseOpacity=.82,this.waterMeshes.push(M),this.waterGroup.add(M)}}const m=new G(new xn(i?u*2.2:qn.width+40,i?f*2.2:qn.depth+40),new kt({color:10406143,transparent:!0,opacity:.038,depthWrite:!1}));m.rotation.x=-Math.PI/2,m.position.set(s,5,o),this.decorGroup.add(m),this.scene.add(this.decorGroup,this.waterGroup),this.updateDynamicLightBudget(!0)}rebuildUnitLandscape(){$t(this.scene,this.unitLandscape),this.unitLandscape=void 0;const e=this.activeUnitId?this.nodes.find(t=>t.unlocked)??this.nodes[0]:void 0;!e||!this.activeUnitId||(this.unitLandscape=qv(this.currentBiome,e,this.activeWorldId,this.activeWorldTitle),this.unitLandscape.position.set(e.x,Ot(e.x,e.z,Ft),e.z),this.scene.add(this.unitLandscape))}addDecorAt(e,t,n,i,s,o){if(e==="forest"||e==="plains"||e==="library"){const c=o()>.4?nu(s):tu(s*1.05);c.position.set(t,n,i),c.rotation.y=o()*Math.PI*2,this.decorGroup.add(c);return}if(e==="coast"&&o()>.45){const c=io(s*.85);c.position.set(t,n+.3,i),c.rotation.set(o(),o(),o()),this.decorGroup.add(c);return}if(o()>.5){const c=io(s*.65);c.position.set(t,n+.2,i),this.decorGroup.add(c)}if(o()>.65){const c=df(yr(e).accent);c.position.set(t,n,i),this.decorGroup.add(c)}}async rebuildNodesAsync(){const e=++this.rebuildToken;for(const t of this.nodeGroups.values())this.scene.remove(t),Ds(t);this.nodeGroups.clear(),this.pickables=[];for(const t of this.nodes){if(e!==this.rebuildToken)return;const n=new gt,i=Ot(t.x,t.z,Ft);n.position.set(t.x,i,t.z),n.userData.nodeId=t.id;const{root:s,crystal:o}=await Uv(t,t.id===this.currentId);if(e!==this.rebuildToken){Ds(s);return}n.add(s),o.userData.nodeId=t.id,this.pickables.push(o);const c=kv(t.name,t.unlocked);n.add(c),t.unlocked||Cf(n),this.nodeGroups.set(t.id,n),this.scene.add(n),this.updateDynamicLightBudget(!0)}}bindEvents(){this.renderer.domElement.addEventListener("pointerdown",this.onPointerDown),window.addEventListener("keydown",this.onKeyDown),window.addEventListener("resize",this.onResize),document.addEventListener("visibilitychange",this.onVisibilityChange)}updateProximity(){var n,i;let e=null,t=Pf;for(const s of this.nodes){if(!s.unlocked)continue;const o=this.player.position.x-s.x,c=this.player.position.z-s.z,l=Math.hypot(o,c);l<t&&(t=l,e=s)}(e==null?void 0:e.id)!==((n=this.nearNode)==null?void 0:n.id)&&(this.nearNode=e,(i=this.onProximity)==null||i.call(this,e))}updatePickupProximity(){var n,i;let e=null,t=l1;for(const s of this.pickupData){if(s.collected)continue;const o=this.player.position.x-s.x,c=this.player.position.z-s.z,l=Math.hypot(o,c);l<t&&(t=l,e=s)}(e==null?void 0:e.id)!==((n=this.nearPickup)==null?void 0:n.id)&&(this.nearPickup=e,(i=this.onPickupNear)==null||i.call(this,e))}tickScene(e,t){var l,a,h,u;if(this.updateDynamicLightBudget(),this.waterFrame++,this.sun){const f=e*.03,_=Math.sin(f)*72,d=36+Math.cos(f)*46;this.sun.position.set(_,Math.max(5,d),35);const m=mn.clamp((d+8)/90,.18,1),p=qt(this.activeWorldId);this.sun.intensity=this.currentBiome.sunIntensity*(p?.82+m*.18:.52+m*.38),this.renderer.toneMappingExposure=p?1.14+m*.12:1.08+m*.1,this.hemi&&(this.hemi.intensity=p?.78+m*.22:.58+m*.26),this.sunDisc&&(this.sunDisc.position.set(_*4.2,this.sun.position.y*4.2,this.sun.position.z*4.2+li),this.sunDisc.material.opacity=mn.clamp(m*1.2,0,1))}this.grassUniforms&&(this.grassUniforms.uTime.value=e,this.grassUniforms.uPlayer.value.copy(this.player.position)),this.updateGrassLOD(),this.clouds&&(this.clouds.rotation.y=e*.006),(l=this.unitLandscape)==null||l.traverse(f=>{var d,m;const _=f;if((d=_.userData)!=null&&d.isLandscapeRing&&(_.rotation.y+=t*.42),(m=_.userData)!=null&&m.isLandscapeBeacon){_.userData.landscapeBaseY===void 0&&(_.userData.landscapeBaseY=_.position.y);const p=_.userData.landscapeBaseY;_.position.y=p+Math.sin(e*1.5+_.position.x*.08)*.24}});for(const[f,_]of this.pickupMeshes){const d=((a=this.nearPickup)==null?void 0:a.id)===f,m=_.userData.baseY??_.position.y;if(_.userData.dying){_.userData.dieTimer=(_.userData.dieTimer??0)+t*1.4;const p=_.userData.dieTimer;_.scale.setScalar(1-p*.9),_.position.y=m+p*3,_.traverse(g=>{const x=g;x.material&&"opacity"in x.material&&(x.material.opacity*=.85)}),p>=1&&((h=this.pickupGroup)==null||h.remove(_),this.disposePickupResources(_),this.pickupMeshes.delete(f));continue}_.position.y=m+Math.sin(e*1.4+f.length*.5)*.28,_.traverse(p=>{var x,v,y,w,b;const g=p;if((x=g.userData)!=null&&x.isOrbCore){g.rotation.y=e*.8+f.length;const A=d?1+Math.sin(e*4)*.15:1+Math.sin(e*2)*.06;g.scale.setScalar(A);const M=g.material;M.emissiveIntensity=d?3.5+Math.sin(e*5)*.8:1.8+Math.sin(e*2)*.3}if((v=g.userData)!=null&&v.isOrbGlow&&(g.material.opacity=d?.42+Math.sin(e*3)*.15:.18+Math.sin(e*1.5)*.06),(y=g.userData)!=null&&y.isOrbRing&&(g.rotation.z=e*1.2+f.length*.3,g.rotation.x=Math.PI/3+Math.sin(e*.5)*.2,g.material.opacity=d?.8:.45),(w=g.userData)!=null&&w.isOrbLight){const A=g;A.intensity=d?1.4+Math.sin(e*4)*.4:.6+Math.sin(e*2)*.1}if((b=g.userData)!=null&&b.isWordSprite){const A=g;A.material.opacity=d?1:.72+Math.sin(e*1.2)*.12}})}for(const[f,_]of this.nodeGroups){const d=((u=this.nearNode)==null?void 0:u.id)===f;_.traverse(m=>{var g,x,v,y;const p=m;if((g=p.userData)!=null&&g.isSignpost&&(p.visible=!d),(x=p.userData)!=null&&x.isCrystal&&(p.userData.baseY===void 0&&(p.userData.baseY=p.position.y),p.rotation.y=e*.6+f.length*.3,p.position.y=p.userData.baseY+Math.sin(e*1.8+f.length)*(d?.28:.15)),(v=p.userData)!=null&&v.isPulse){const w=1+Math.sin(e*3)*.08;p.scale.set(w,w,w),p.material.opacity=.35+Math.sin(e*3)*.2}(y=p.userData)!=null&&y.isDueRing&&(p.material.opacity=.28+Math.sin(e*2.4+f.length)*.18)})}const n=this.player.position.x,i=this.player.position.z,s=90,o=s*s;for(const f of this.waterMeshes){f.userData.baseY===void 0&&(f.userData.baseY=f.position.y);const _=f.userData.baseOpacity??.68,d=f.position.x-n,m=f.position.z-i,g=d*d+m*m<o;if(f.position.y=f.userData.baseY+Math.sin(e*.9+f.position.x*.03)*.04,f.material.opacity=_+Math.sin(e*.7)*Math.min(.08,_*.12),!g||this.waterFrame%2!==0)continue;const x=f.geometry,v=x.attributes.position;f.userData.flat||(f.userData.flat=Float32Array.from(v.array));const y=f.userData.flat;for(let w=0;w<v.count;w++){const b=y[w*3],A=y[w*3+1];v.setZ(w,Math.sin(b*.22+e*1.7)*.12+Math.cos(A*.27+e*1.25)*.1)}v.needsUpdate=!0,x.computeVertexNormals()}const c=this.qcfg.reflectDist*this.qcfg.reflectDist;for(const f of this.reflectors){const _=f.position.x-n,d=f.position.z-i;f.visible=_*_+d*d<c}}}export{m1 as World3D};
