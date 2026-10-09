var bf=Object.defineProperty;var wf=(r,e,t)=>e in r?bf(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t;var $=(r,e,t)=>wf(r,typeof e!="symbol"?e+"":e,t);import{C as Tf,a as Ef,P as Af,s as Bt,t as Ft,b as ti,d as Is,r as $t,T as di,c as Kn,e as Ml,f as Rf,g as Cf,I as Pf}from"./index-BqI4s-5H.js";/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Cc="184",Lf=0,Sl=1,Df=2,Qs=1,If=2,js=3,ai=0,Zt=1,Ct=2,Gn=0,ds=1,rr=2,bl=3,wl=4,Nf=5,Di=100,Uf=101,Ff=102,Of=103,Bf=104,zf=200,kf=201,Gf=202,Vf=203,Aa=204,Ra=205,Hf=206,Wf=207,Xf=208,qf=209,Yf=210,Kf=211,jf=212,Jf=213,Zf=214,Ca=0,Pa=1,La=2,gs=3,Da=4,Ia=5,Na=6,Ua=7,lu=0,$f=1,Qf=2,Vn=0,Pc=1,Lc=2,Dc=3,To=4,Ic=5,Nc=6,Uc=7,Tl="attached",ed="detached",hu=300,Oi=301,_s=302,Io=303,No=304,Eo=306,Bi=1e3,On=1001,fo=1002,Gt=1003,uu=1004,Js=1005,Vt=1006,ro=1007,Bn=1008,ln=1009,fu=1010,du=1011,or=1012,Fc=1013,Hn=1014,yn=1015,sn=1016,Oc=1017,Bc=1018,ar=1020,pu=35902,mu=35899,gu=1021,_u=1022,Mn=1023,ci=1026,Ui=1027,zc=1028,kc=1029,zi=1030,Gc=1031,Vc=1033,oo=33776,ao=33777,co=33778,lo=33779,Fa=35840,Oa=35841,Ba=35842,za=35843,ka=36196,Ga=37492,Va=37496,Ha=37488,Wa=37489,po=37490,Xa=37491,qa=37808,Ya=37809,Ka=37810,ja=37811,Ja=37812,Za=37813,$a=37814,Qa=37815,ec=37816,tc=37817,nc=37818,ic=37819,sc=37820,rc=37821,oc=36492,ac=36494,cc=36495,lc=36283,hc=36284,mo=36285,uc=36286,xu=2200,td=2201,nd=2202,cr=2300,lr=2301,Uo=2302,El=2303,us=2400,fs=2401,go=2402,Hc=2500,id=2501,sd=0,vu=1,fc=2,rd=3200,dc=0,od=1,Fn="",Tt="srgb",un="srgb-linear",_o="linear",pt="srgb",Xi=7680,Al=519,ad=512,cd=513,ld=514,Wc=515,hd=516,ud=517,Xc=518,fd=519,pc=35044,Rl="300 es",zn=2e3,hr=2001;function dd(r){for(let e=r.length-1;e>=0;--e)if(r[e]>=65535)return!0;return!1}function pd(r){return ArrayBuffer.isView(r)&&!(r instanceof DataView)}function ur(r){return document.createElementNS("http://www.w3.org/1999/xhtml",r)}function md(){const r=ur("canvas");return r.style.display="block",r}const Cl={};function xo(...r){const e="THREE."+r.shift();console.log(e,...r)}function yu(r){const e=r[0];if(typeof e=="string"&&e.startsWith("TSL:")){const t=r[1];t&&t.isStackTrace?r[0]+=" "+t.getLocation():r[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return r}function Ue(...r){r=yu(r);const e="THREE."+r.shift();{const t=r[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...r)}}function ke(...r){r=yu(r);const e="THREE."+r.shift();{const t=r[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...r)}}function mc(...r){const e=r.join(" ");e in Cl||(Cl[e]=!0,Ue(...r))}function gd(r,e,t){return new Promise(function(n,i){function s(){switch(r.clientWaitSync(e,r.SYNC_FLUSH_COMMANDS_BIT,0)){case r.WAIT_FAILED:i();break;case r.TIMEOUT_EXPIRED:setTimeout(s,t);break;default:n()}}setTimeout(s,t)})}const _d={[Ca]:Pa,[La]:Na,[Da]:Ua,[gs]:Ia,[Pa]:Ca,[Na]:La,[Ua]:Da,[Ia]:gs};class wi{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){const n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){const n=this._listeners;if(n===void 0)return;const i=n[e];if(i!==void 0){const s=i.indexOf(t);s!==-1&&i.splice(s,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const n=t[e.type];if(n!==void 0){e.target=this;const i=n.slice(0);for(let s=0,o=i.length;s<o;s++)i[s].call(this,e);e.target=null}}}const jt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let Pl=1234567;const er=Math.PI/180,xs=180/Math.PI;function Sn(){const r=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(jt[r&255]+jt[r>>8&255]+jt[r>>16&255]+jt[r>>24&255]+"-"+jt[e&255]+jt[e>>8&255]+"-"+jt[e>>16&15|64]+jt[e>>24&255]+"-"+jt[t&63|128]+jt[t>>8&255]+"-"+jt[t>>16&255]+jt[t>>24&255]+jt[n&255]+jt[n>>8&255]+jt[n>>16&255]+jt[n>>24&255]).toLowerCase()}function ot(r,e,t){return Math.max(e,Math.min(t,r))}function qc(r,e){return(r%e+e)%e}function xd(r,e,t,n,i){return n+(r-e)*(i-n)/(t-e)}function vd(r,e,t){return r!==e?(t-r)/(e-r):0}function tr(r,e,t){return(1-t)*r+t*e}function yd(r,e,t,n){return tr(r,e,1-Math.exp(-t*n))}function Md(r,e=1){return e-Math.abs(qc(r,e*2)-e)}function Sd(r,e,t){return r<=e?0:r>=t?1:(r=(r-e)/(t-e),r*r*(3-2*r))}function bd(r,e,t){return r<=e?0:r>=t?1:(r=(r-e)/(t-e),r*r*r*(r*(r*6-15)+10))}function wd(r,e){return r+Math.floor(Math.random()*(e-r+1))}function Td(r,e){return r+Math.random()*(e-r)}function Ed(r){return r*(.5-Math.random())}function Ad(r){r!==void 0&&(Pl=r);let e=Pl+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function Rd(r){return r*er}function Cd(r){return r*xs}function Pd(r){return(r&r-1)===0&&r!==0}function Ld(r){return Math.pow(2,Math.ceil(Math.log(r)/Math.LN2))}function Dd(r){return Math.pow(2,Math.floor(Math.log(r)/Math.LN2))}function Id(r,e,t,n,i){const s=Math.cos,o=Math.sin,c=s(t/2),l=o(t/2),a=s((e+n)/2),h=o((e+n)/2),u=s((e-n)/2),f=o((e-n)/2),_=s((n-e)/2),p=o((n-e)/2);switch(i){case"XYX":r.set(c*h,l*u,l*f,c*a);break;case"YZY":r.set(l*f,c*h,l*u,c*a);break;case"ZXZ":r.set(l*u,l*f,c*h,c*a);break;case"XZX":r.set(c*h,l*p,l*_,c*a);break;case"YXY":r.set(l*_,c*h,l*p,c*a);break;case"ZYZ":r.set(l*p,l*_,c*h,c*a);break;default:Ue("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+i)}}function En(r,e){switch(e.constructor){case Float32Array:return r;case Uint32Array:return r/4294967295;case Uint16Array:return r/65535;case Uint8Array:return r/255;case Int32Array:return Math.max(r/2147483647,-1);case Int16Array:return Math.max(r/32767,-1);case Int8Array:return Math.max(r/127,-1);default:throw new Error("Invalid component type.")}}function _t(r,e){switch(e.constructor){case Float32Array:return r;case Uint32Array:return Math.round(r*4294967295);case Uint16Array:return Math.round(r*65535);case Uint8Array:return Math.round(r*255);case Int32Array:return Math.round(r*2147483647);case Int16Array:return Math.round(r*32767);case Int8Array:return Math.round(r*127);default:throw new Error("Invalid component type.")}}const gn={DEG2RAD:er,RAD2DEG:xs,generateUUID:Sn,clamp:ot,euclideanModulo:qc,mapLinear:xd,inverseLerp:vd,lerp:tr,damp:yd,pingpong:Md,smoothstep:Sd,smootherstep:bd,randInt:wd,randFloat:Td,randFloatSpread:Ed,seededRandom:Ad,degToRad:Rd,radToDeg:Cd,isPowerOfTwo:Pd,ceilPowerOfTwo:Ld,floorPowerOfTwo:Dd,setQuaternionFromProperEuler:Id,normalize:_t,denormalize:En},cl=class cl{constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6],this.y=i[1]*t+i[4]*n+i[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=ot(this.x,e.x,t.x),this.y=ot(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=ot(this.x,e,t),this.y=ot(this.y,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(ot(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(ot(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),i=Math.sin(t),s=this.x-e.x,o=this.y-e.y;return this.x=s*n-o*i+e.x,this.y=s*i+o*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};cl.prototype.isVector2=!0;let ee=cl;class rn{constructor(e=0,t=0,n=0,i=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=i}static slerpFlat(e,t,n,i,s,o,c){let l=n[i+0],a=n[i+1],h=n[i+2],u=n[i+3],f=s[o+0],_=s[o+1],p=s[o+2],g=s[o+3];if(u!==g||l!==f||a!==_||h!==p){let d=l*f+a*_+h*p+u*g;d<0&&(f=-f,_=-_,p=-p,g=-g,d=-d);let m=1-c;if(d<.9995){const x=Math.acos(d),v=Math.sin(x);m=Math.sin(m*x)/v,c=Math.sin(c*x)/v,l=l*m+f*c,a=a*m+_*c,h=h*m+p*c,u=u*m+g*c}else{l=l*m+f*c,a=a*m+_*c,h=h*m+p*c,u=u*m+g*c;const x=1/Math.sqrt(l*l+a*a+h*h+u*u);l*=x,a*=x,h*=x,u*=x}}e[t]=l,e[t+1]=a,e[t+2]=h,e[t+3]=u}static multiplyQuaternionsFlat(e,t,n,i,s,o){const c=n[i],l=n[i+1],a=n[i+2],h=n[i+3],u=s[o],f=s[o+1],_=s[o+2],p=s[o+3];return e[t]=c*p+h*u+l*_-a*f,e[t+1]=l*p+h*f+a*u-c*_,e[t+2]=a*p+h*_+c*f-l*u,e[t+3]=h*p-c*u-l*f-a*_,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,i){return this._x=e,this._y=t,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,i=e._y,s=e._z,o=e._order,c=Math.cos,l=Math.sin,a=c(n/2),h=c(i/2),u=c(s/2),f=l(n/2),_=l(i/2),p=l(s/2);switch(o){case"XYZ":this._x=f*h*u+a*_*p,this._y=a*_*u-f*h*p,this._z=a*h*p+f*_*u,this._w=a*h*u-f*_*p;break;case"YXZ":this._x=f*h*u+a*_*p,this._y=a*_*u-f*h*p,this._z=a*h*p-f*_*u,this._w=a*h*u+f*_*p;break;case"ZXY":this._x=f*h*u-a*_*p,this._y=a*_*u+f*h*p,this._z=a*h*p+f*_*u,this._w=a*h*u-f*_*p;break;case"ZYX":this._x=f*h*u-a*_*p,this._y=a*_*u+f*h*p,this._z=a*h*p-f*_*u,this._w=a*h*u+f*_*p;break;case"YZX":this._x=f*h*u+a*_*p,this._y=a*_*u+f*h*p,this._z=a*h*p-f*_*u,this._w=a*h*u-f*_*p;break;case"XZY":this._x=f*h*u-a*_*p,this._y=a*_*u-f*h*p,this._z=a*h*p+f*_*u,this._w=a*h*u+f*_*p;break;default:Ue("Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,i=Math.sin(n);return this._x=e.x*i,this._y=e.y*i,this._z=e.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],i=t[4],s=t[8],o=t[1],c=t[5],l=t[9],a=t[2],h=t[6],u=t[10],f=n+c+u;if(f>0){const _=.5/Math.sqrt(f+1);this._w=.25/_,this._x=(h-l)*_,this._y=(s-a)*_,this._z=(o-i)*_}else if(n>c&&n>u){const _=2*Math.sqrt(1+n-c-u);this._w=(h-l)/_,this._x=.25*_,this._y=(i+o)/_,this._z=(s+a)/_}else if(c>u){const _=2*Math.sqrt(1+c-n-u);this._w=(s-a)/_,this._x=(i+o)/_,this._y=.25*_,this._z=(l+h)/_}else{const _=2*Math.sqrt(1+u-n-c);this._w=(o-i)/_,this._x=(s+a)/_,this._y=(l+h)/_,this._z=.25*_}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(ot(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const i=Math.min(1,t/n);return this.slerp(e,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,i=e._y,s=e._z,o=e._w,c=t._x,l=t._y,a=t._z,h=t._w;return this._x=n*h+o*c+i*a-s*l,this._y=i*h+o*l+s*c-n*a,this._z=s*h+o*a+n*l-i*c,this._w=o*h-n*c-i*l-s*a,this._onChangeCallback(),this}slerp(e,t){let n=e._x,i=e._y,s=e._z,o=e._w,c=this.dot(e);c<0&&(n=-n,i=-i,s=-s,o=-o,c=-c);let l=1-t;if(c<.9995){const a=Math.acos(c),h=Math.sin(a);l=Math.sin(l*a)/h,t=Math.sin(t*a)/h,this._x=this._x*l+n*t,this._y=this._y*l+i*t,this._z=this._z*l+s*t,this._w=this._w*l+o*t,this._onChangeCallback()}else this._x=this._x*l+n*t,this._y=this._y*l+i*t,this._z=this._z*l+s*t,this._w=this._w*l+o*t,this.normalize();return this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),i=Math.sqrt(1-n),s=Math.sqrt(n);return this.set(i*Math.sin(e),i*Math.cos(e),s*Math.sin(t),s*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}const ll=class ll{constructor(e=0,t=0,n=0){this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Ll.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Ll.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,i=this.z,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6]*i,this.y=s[1]*t+s[4]*n+s[7]*i,this.z=s[2]*t+s[5]*n+s[8]*i,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,i=this.z,s=e.elements,o=1/(s[3]*t+s[7]*n+s[11]*i+s[15]);return this.x=(s[0]*t+s[4]*n+s[8]*i+s[12])*o,this.y=(s[1]*t+s[5]*n+s[9]*i+s[13])*o,this.z=(s[2]*t+s[6]*n+s[10]*i+s[14])*o,this}applyQuaternion(e){const t=this.x,n=this.y,i=this.z,s=e.x,o=e.y,c=e.z,l=e.w,a=2*(o*i-c*n),h=2*(c*t-s*i),u=2*(s*n-o*t);return this.x=t+l*a+o*u-c*h,this.y=n+l*h+c*a-s*u,this.z=i+l*u+s*h-o*a,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,i=this.z,s=e.elements;return this.x=s[0]*t+s[4]*n+s[8]*i,this.y=s[1]*t+s[5]*n+s[9]*i,this.z=s[2]*t+s[6]*n+s[10]*i,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=ot(this.x,e.x,t.x),this.y=ot(this.y,e.y,t.y),this.z=ot(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=ot(this.x,e,t),this.y=ot(this.y,e,t),this.z=ot(this.z,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(ot(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,i=e.y,s=e.z,o=t.x,c=t.y,l=t.z;return this.x=i*l-s*c,this.y=s*o-n*l,this.z=n*c-i*o,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return Fo.copy(this).projectOnVector(e),this.sub(Fo)}reflect(e){return this.sub(Fo.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(ot(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,i=this.z-e.z;return t*t+n*n+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const i=Math.sin(t)*e;return this.x=i*Math.sin(n),this.y=Math.cos(t)*e,this.z=i*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),i=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=i,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};ll.prototype.isVector3=!0;let L=ll;const Fo=new L,Ll=new rn,hl=class hl{constructor(e,t,n,i,s,o,c,l,a){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,i,s,o,c,l,a)}set(e,t,n,i,s,o,c,l,a){const h=this.elements;return h[0]=e,h[1]=i,h[2]=c,h[3]=t,h[4]=s,h[5]=l,h[6]=n,h[7]=o,h[8]=a,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,i=t.elements,s=this.elements,o=n[0],c=n[3],l=n[6],a=n[1],h=n[4],u=n[7],f=n[2],_=n[5],p=n[8],g=i[0],d=i[3],m=i[6],x=i[1],v=i[4],y=i[7],b=i[2],S=i[5],w=i[8];return s[0]=o*g+c*x+l*b,s[3]=o*d+c*v+l*S,s[6]=o*m+c*y+l*w,s[1]=a*g+h*x+u*b,s[4]=a*d+h*v+u*S,s[7]=a*m+h*y+u*w,s[2]=f*g+_*x+p*b,s[5]=f*d+_*v+p*S,s[8]=f*m+_*y+p*w,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],o=e[4],c=e[5],l=e[6],a=e[7],h=e[8];return t*o*h-t*c*a-n*s*h+n*c*l+i*s*a-i*o*l}invert(){const e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],o=e[4],c=e[5],l=e[6],a=e[7],h=e[8],u=h*o-c*a,f=c*l-h*s,_=a*s-o*l,p=t*u+n*f+i*_;if(p===0)return this.set(0,0,0,0,0,0,0,0,0);const g=1/p;return e[0]=u*g,e[1]=(i*a-h*n)*g,e[2]=(c*n-i*o)*g,e[3]=f*g,e[4]=(h*t-i*l)*g,e[5]=(i*s-c*t)*g,e[6]=_*g,e[7]=(n*l-a*t)*g,e[8]=(o*t-n*s)*g,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,i,s,o,c){const l=Math.cos(s),a=Math.sin(s);return this.set(n*l,n*a,-n*(l*o+a*c)+o+e,-i*a,i*l,-i*(-a*o+l*c)+c+t,0,0,1),this}scale(e,t){return this.premultiply(Oo.makeScale(e,t)),this}rotate(e){return this.premultiply(Oo.makeRotation(-e)),this}translate(e,t){return this.premultiply(Oo.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let i=0;i<9;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}};hl.prototype.isMatrix3=!0;let $e=hl;const Oo=new $e,Dl=new $e().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Il=new $e().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Nd(){const r={enabled:!0,workingColorSpace:un,spaces:{},convert:function(i,s,o){return this.enabled===!1||s===o||!s||!o||(this.spaces[s].transfer===pt&&(i.r=ri(i.r),i.g=ri(i.g),i.b=ri(i.b)),this.spaces[s].primaries!==this.spaces[o].primaries&&(i.applyMatrix3(this.spaces[s].toXYZ),i.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===pt&&(i.r=ps(i.r),i.g=ps(i.g),i.b=ps(i.b))),i},workingToColorSpace:function(i,s){return this.convert(i,this.workingColorSpace,s)},colorSpaceToWorking:function(i,s){return this.convert(i,s,this.workingColorSpace)},getPrimaries:function(i){return this.spaces[i].primaries},getTransfer:function(i){return i===Fn?_o:this.spaces[i].transfer},getToneMappingMode:function(i){return this.spaces[i].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(i,s=this.workingColorSpace){return i.fromArray(this.spaces[s].luminanceCoefficients)},define:function(i){Object.assign(this.spaces,i)},_getMatrix:function(i,s,o){return i.copy(this.spaces[s].toXYZ).multiply(this.spaces[o].fromXYZ)},_getDrawingBufferColorSpace:function(i){return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(i=this.workingColorSpace){return this.spaces[i].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(i,s){return mc("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),r.workingToColorSpace(i,s)},toWorkingColorSpace:function(i,s){return mc("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),r.colorSpaceToWorking(i,s)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return r.define({[un]:{primaries:e,whitePoint:n,transfer:_o,toXYZ:Dl,fromXYZ:Il,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:Tt},outputColorSpaceConfig:{drawingBufferColorSpace:Tt}},[Tt]:{primaries:e,whitePoint:n,transfer:pt,toXYZ:Dl,fromXYZ:Il,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:Tt}}}),r}const at=Nd();function ri(r){return r<.04045?r*.0773993808:Math.pow(r*.9478672986+.0521327014,2.4)}function ps(r){return r<.0031308?r*12.92:1.055*Math.pow(r,.41666)-.055}let qi;class Ud{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{qi===void 0&&(qi=ur("canvas")),qi.width=e.width,qi.height=e.height;const i=qi.getContext("2d");e instanceof ImageData?i.putImageData(e,0,0):i.drawImage(e,0,0,e.width,e.height),n=qi}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=ur("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const i=n.getImageData(0,0,e.width,e.height),s=i.data;for(let o=0;o<s.length;o++)s[o]=ri(s[o]/255)*255;return n.putImageData(i,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(ri(t[n]/255)*255):t[n]=ri(t[n]);return{data:t,width:e.width,height:e.height}}else return Ue("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let Fd=0;class Yc{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Fd++}),this.uuid=Sn(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let s;if(Array.isArray(i)){s=[];for(let o=0,c=i.length;o<c;o++)i[o].isDataTexture?s.push(Bo(i[o].image)):s.push(Bo(i[o]))}else s=Bo(i);n.url=s}return t||(e.images[this.uuid]=n),n}}function Bo(r){return typeof HTMLImageElement<"u"&&r instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&r instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&r instanceof ImageBitmap?Ud.getDataURL(r):r.data?{data:Array.from(r.data),width:r.width,height:r.height,type:r.data.constructor.name}:(Ue("Texture: Unable to serialize Texture."),{})}let Od=0;const zo=new L;class Ht extends wi{constructor(e=Ht.DEFAULT_IMAGE,t=Ht.DEFAULT_MAPPING,n=On,i=On,s=Vt,o=Bn,c=Mn,l=ln,a=Ht.DEFAULT_ANISOTROPY,h=Fn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Od++}),this.uuid=Sn(),this.name="",this.source=new Yc(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=s,this.minFilter=o,this.anisotropy=a,this.format=c,this.internalFormat=null,this.type=l,this.offset=new ee(0,0),this.repeat=new ee(1,1),this.center=new ee(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new $e,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(zo).x}get height(){return this.source.getSize(zo).y}get depth(){return this.source.getSize(zo).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const n=e[t];if(n===void 0){Ue(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const i=this[t];if(i===void 0){Ue(`Texture.setValues(): property '${t}' does not exist.`);continue}i&&n&&i.isVector2&&n.isVector2||i&&n&&i.isVector3&&n.isVector3||i&&n&&i.isMatrix3&&n.isMatrix3?i.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==hu)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Bi:e.x=e.x-Math.floor(e.x);break;case On:e.x=e.x<0?0:1;break;case fo:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Bi:e.y=e.y-Math.floor(e.y);break;case On:e.y=e.y<0?0:1;break;case fo:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Ht.DEFAULT_IMAGE=null;Ht.DEFAULT_MAPPING=hu;Ht.DEFAULT_ANISOTROPY=1;const ul=class ul{constructor(e=0,t=0,n=0,i=1){this.x=e,this.y=t,this.z=n,this.w=i}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,i){return this.x=e,this.y=t,this.z=n,this.w=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,i=this.z,s=this.w,o=e.elements;return this.x=o[0]*t+o[4]*n+o[8]*i+o[12]*s,this.y=o[1]*t+o[5]*n+o[9]*i+o[13]*s,this.z=o[2]*t+o[6]*n+o[10]*i+o[14]*s,this.w=o[3]*t+o[7]*n+o[11]*i+o[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,i,s;const l=e.elements,a=l[0],h=l[4],u=l[8],f=l[1],_=l[5],p=l[9],g=l[2],d=l[6],m=l[10];if(Math.abs(h-f)<.01&&Math.abs(u-g)<.01&&Math.abs(p-d)<.01){if(Math.abs(h+f)<.1&&Math.abs(u+g)<.1&&Math.abs(p+d)<.1&&Math.abs(a+_+m-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const v=(a+1)/2,y=(_+1)/2,b=(m+1)/2,S=(h+f)/4,w=(u+g)/4,M=(p+d)/4;return v>y&&v>b?v<.01?(n=0,i=.707106781,s=.707106781):(n=Math.sqrt(v),i=S/n,s=w/n):y>b?y<.01?(n=.707106781,i=0,s=.707106781):(i=Math.sqrt(y),n=S/i,s=M/i):b<.01?(n=.707106781,i=.707106781,s=0):(s=Math.sqrt(b),n=w/s,i=M/s),this.set(n,i,s,t),this}let x=Math.sqrt((d-p)*(d-p)+(u-g)*(u-g)+(f-h)*(f-h));return Math.abs(x)<.001&&(x=1),this.x=(d-p)/x,this.y=(u-g)/x,this.z=(f-h)/x,this.w=Math.acos((a+_+m-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=ot(this.x,e.x,t.x),this.y=ot(this.y,e.y,t.y),this.z=ot(this.z,e.z,t.z),this.w=ot(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=ot(this.x,e,t),this.y=ot(this.y,e,t),this.z=ot(this.z,e,t),this.w=ot(this.w,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(ot(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};ul.prototype.isVector4=!0;let xt=ul;class Bd extends wi{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Vt,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new xt(0,0,e,t),this.scissorTest=!1,this.viewport=new xt(0,0,e,t),this.textures=[];const i={width:e,height:t,depth:n.depth},s=new Ht(i),o=n.count;for(let c=0;c<o;c++)this.textures[c]=s.clone(),this.textures[c].isRenderTargetTexture=!0,this.textures[c].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview}_setTextureOptions(e={}){const t={minFilter:Vt,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let i=0,s=this.textures.length;i<s;i++)this.textures[i].image.width=e,this.textures[i].image.height=t,this.textures[i].image.depth=n,this.textures[i].isData3DTexture!==!0&&(this.textures[i].isArrayTexture=this.textures[i].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const i=Object.assign({},e.textures[t].image);this.textures[t].source=new Yc(i)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this.multiview=e.multiview,this}dispose(){this.dispatchEvent({type:"dispose"})}}class nn extends Bd{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class Mu extends Ht{constructor(e=null,t=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=Gt,this.minFilter=Gt,this.wrapR=On,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class zd extends Ht{constructor(e=null,t=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=Gt,this.minFilter=Gt,this.wrapR=On,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const wo=class wo{constructor(e,t,n,i,s,o,c,l,a,h,u,f,_,p,g,d){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,i,s,o,c,l,a,h,u,f,_,p,g,d)}set(e,t,n,i,s,o,c,l,a,h,u,f,_,p,g,d){const m=this.elements;return m[0]=e,m[4]=t,m[8]=n,m[12]=i,m[1]=s,m[5]=o,m[9]=c,m[13]=l,m[2]=a,m[6]=h,m[10]=u,m[14]=f,m[3]=_,m[7]=p,m[11]=g,m[15]=d,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new wo().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return this.determinant()===0?(e.set(1,0,0),t.set(0,1,0),n.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){if(e.determinant()===0)return this.identity();const t=this.elements,n=e.elements,i=1/Yi.setFromMatrixColumn(e,0).length(),s=1/Yi.setFromMatrixColumn(e,1).length(),o=1/Yi.setFromMatrixColumn(e,2).length();return t[0]=n[0]*i,t[1]=n[1]*i,t[2]=n[2]*i,t[3]=0,t[4]=n[4]*s,t[5]=n[5]*s,t[6]=n[6]*s,t[7]=0,t[8]=n[8]*o,t[9]=n[9]*o,t[10]=n[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,i=e.y,s=e.z,o=Math.cos(n),c=Math.sin(n),l=Math.cos(i),a=Math.sin(i),h=Math.cos(s),u=Math.sin(s);if(e.order==="XYZ"){const f=o*h,_=o*u,p=c*h,g=c*u;t[0]=l*h,t[4]=-l*u,t[8]=a,t[1]=_+p*a,t[5]=f-g*a,t[9]=-c*l,t[2]=g-f*a,t[6]=p+_*a,t[10]=o*l}else if(e.order==="YXZ"){const f=l*h,_=l*u,p=a*h,g=a*u;t[0]=f+g*c,t[4]=p*c-_,t[8]=o*a,t[1]=o*u,t[5]=o*h,t[9]=-c,t[2]=_*c-p,t[6]=g+f*c,t[10]=o*l}else if(e.order==="ZXY"){const f=l*h,_=l*u,p=a*h,g=a*u;t[0]=f-g*c,t[4]=-o*u,t[8]=p+_*c,t[1]=_+p*c,t[5]=o*h,t[9]=g-f*c,t[2]=-o*a,t[6]=c,t[10]=o*l}else if(e.order==="ZYX"){const f=o*h,_=o*u,p=c*h,g=c*u;t[0]=l*h,t[4]=p*a-_,t[8]=f*a+g,t[1]=l*u,t[5]=g*a+f,t[9]=_*a-p,t[2]=-a,t[6]=c*l,t[10]=o*l}else if(e.order==="YZX"){const f=o*l,_=o*a,p=c*l,g=c*a;t[0]=l*h,t[4]=g-f*u,t[8]=p*u+_,t[1]=u,t[5]=o*h,t[9]=-c*h,t[2]=-a*h,t[6]=_*u+p,t[10]=f-g*u}else if(e.order==="XZY"){const f=o*l,_=o*a,p=c*l,g=c*a;t[0]=l*h,t[4]=-u,t[8]=a*h,t[1]=f*u+g,t[5]=o*h,t[9]=_*u-p,t[2]=p*u-_,t[6]=c*h,t[10]=g*u+f}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(kd,e,Gd)}lookAt(e,t,n){const i=this.elements;return an.subVectors(e,t),an.lengthSq()===0&&(an.z=1),an.normalize(),pi.crossVectors(n,an),pi.lengthSq()===0&&(Math.abs(n.z)===1?an.x+=1e-4:an.z+=1e-4,an.normalize(),pi.crossVectors(n,an)),pi.normalize(),wr.crossVectors(an,pi),i[0]=pi.x,i[4]=wr.x,i[8]=an.x,i[1]=pi.y,i[5]=wr.y,i[9]=an.y,i[2]=pi.z,i[6]=wr.z,i[10]=an.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,i=t.elements,s=this.elements,o=n[0],c=n[4],l=n[8],a=n[12],h=n[1],u=n[5],f=n[9],_=n[13],p=n[2],g=n[6],d=n[10],m=n[14],x=n[3],v=n[7],y=n[11],b=n[15],S=i[0],w=i[4],M=i[8],T=i[12],R=i[1],P=i[5],D=i[9],U=i[13],k=i[2],N=i[6],O=i[10],z=i[14],j=i[3],se=i[7],me=i[11],Ee=i[15];return s[0]=o*S+c*R+l*k+a*j,s[4]=o*w+c*P+l*N+a*se,s[8]=o*M+c*D+l*O+a*me,s[12]=o*T+c*U+l*z+a*Ee,s[1]=h*S+u*R+f*k+_*j,s[5]=h*w+u*P+f*N+_*se,s[9]=h*M+u*D+f*O+_*me,s[13]=h*T+u*U+f*z+_*Ee,s[2]=p*S+g*R+d*k+m*j,s[6]=p*w+g*P+d*N+m*se,s[10]=p*M+g*D+d*O+m*me,s[14]=p*T+g*U+d*z+m*Ee,s[3]=x*S+v*R+y*k+b*j,s[7]=x*w+v*P+y*N+b*se,s[11]=x*M+v*D+y*O+b*me,s[15]=x*T+v*U+y*z+b*Ee,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],i=e[8],s=e[12],o=e[1],c=e[5],l=e[9],a=e[13],h=e[2],u=e[6],f=e[10],_=e[14],p=e[3],g=e[7],d=e[11],m=e[15],x=l*_-a*f,v=c*_-a*u,y=c*f-l*u,b=o*_-a*h,S=o*f-l*h,w=o*u-c*h;return t*(g*x-d*v+m*y)-n*(p*x-d*b+m*S)+i*(p*v-g*b+m*w)-s*(p*y-g*S+d*w)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const i=this.elements;return e.isVector3?(i[12]=e.x,i[13]=e.y,i[14]=e.z):(i[12]=e,i[13]=t,i[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],o=e[4],c=e[5],l=e[6],a=e[7],h=e[8],u=e[9],f=e[10],_=e[11],p=e[12],g=e[13],d=e[14],m=e[15],x=t*c-n*o,v=t*l-i*o,y=t*a-s*o,b=n*l-i*c,S=n*a-s*c,w=i*a-s*l,M=h*g-u*p,T=h*d-f*p,R=h*m-_*p,P=u*d-f*g,D=u*m-_*g,U=f*m-_*d,k=x*U-v*D+y*P+b*R-S*T+w*M;if(k===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const N=1/k;return e[0]=(c*U-l*D+a*P)*N,e[1]=(i*D-n*U-s*P)*N,e[2]=(g*w-d*S+m*b)*N,e[3]=(f*S-u*w-_*b)*N,e[4]=(l*R-o*U-a*T)*N,e[5]=(t*U-i*R+s*T)*N,e[6]=(d*y-p*w-m*v)*N,e[7]=(h*w-f*y+_*v)*N,e[8]=(o*D-c*R+a*M)*N,e[9]=(n*R-t*D-s*M)*N,e[10]=(p*S-g*y+m*x)*N,e[11]=(u*y-h*S-_*x)*N,e[12]=(c*T-o*P-l*M)*N,e[13]=(t*P-n*T+i*M)*N,e[14]=(g*v-p*b-d*x)*N,e[15]=(h*b-u*v+f*x)*N,this}scale(e){const t=this.elements,n=e.x,i=e.y,s=e.z;return t[0]*=n,t[4]*=i,t[8]*=s,t[1]*=n,t[5]*=i,t[9]*=s,t[2]*=n,t[6]*=i,t[10]*=s,t[3]*=n,t[7]*=i,t[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],i=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,i))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),i=Math.sin(t),s=1-n,o=e.x,c=e.y,l=e.z,a=s*o,h=s*c;return this.set(a*o+n,a*c-i*l,a*l+i*c,0,a*c+i*l,h*c+n,h*l-i*o,0,a*l-i*c,h*l+i*o,s*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,i,s,o){return this.set(1,n,s,0,e,1,o,0,t,i,1,0,0,0,0,1),this}compose(e,t,n){const i=this.elements,s=t._x,o=t._y,c=t._z,l=t._w,a=s+s,h=o+o,u=c+c,f=s*a,_=s*h,p=s*u,g=o*h,d=o*u,m=c*u,x=l*a,v=l*h,y=l*u,b=n.x,S=n.y,w=n.z;return i[0]=(1-(g+m))*b,i[1]=(_+y)*b,i[2]=(p-v)*b,i[3]=0,i[4]=(_-y)*S,i[5]=(1-(f+m))*S,i[6]=(d+x)*S,i[7]=0,i[8]=(p+v)*w,i[9]=(d-x)*w,i[10]=(1-(f+g))*w,i[11]=0,i[12]=e.x,i[13]=e.y,i[14]=e.z,i[15]=1,this}decompose(e,t,n){const i=this.elements;e.x=i[12],e.y=i[13],e.z=i[14];const s=this.determinant();if(s===0)return n.set(1,1,1),t.identity(),this;let o=Yi.set(i[0],i[1],i[2]).length();const c=Yi.set(i[4],i[5],i[6]).length(),l=Yi.set(i[8],i[9],i[10]).length();s<0&&(o=-o),bn.copy(this);const a=1/o,h=1/c,u=1/l;return bn.elements[0]*=a,bn.elements[1]*=a,bn.elements[2]*=a,bn.elements[4]*=h,bn.elements[5]*=h,bn.elements[6]*=h,bn.elements[8]*=u,bn.elements[9]*=u,bn.elements[10]*=u,t.setFromRotationMatrix(bn),n.x=o,n.y=c,n.z=l,this}makePerspective(e,t,n,i,s,o,c=zn,l=!1){const a=this.elements,h=2*s/(t-e),u=2*s/(n-i),f=(t+e)/(t-e),_=(n+i)/(n-i);let p,g;if(l)p=s/(o-s),g=o*s/(o-s);else if(c===zn)p=-(o+s)/(o-s),g=-2*o*s/(o-s);else if(c===hr)p=-o/(o-s),g=-o*s/(o-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+c);return a[0]=h,a[4]=0,a[8]=f,a[12]=0,a[1]=0,a[5]=u,a[9]=_,a[13]=0,a[2]=0,a[6]=0,a[10]=p,a[14]=g,a[3]=0,a[7]=0,a[11]=-1,a[15]=0,this}makeOrthographic(e,t,n,i,s,o,c=zn,l=!1){const a=this.elements,h=2/(t-e),u=2/(n-i),f=-(t+e)/(t-e),_=-(n+i)/(n-i);let p,g;if(l)p=1/(o-s),g=o/(o-s);else if(c===zn)p=-2/(o-s),g=-(o+s)/(o-s);else if(c===hr)p=-1/(o-s),g=-s/(o-s);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+c);return a[0]=h,a[4]=0,a[8]=0,a[12]=f,a[1]=0,a[5]=u,a[9]=0,a[13]=_,a[2]=0,a[6]=0,a[10]=p,a[14]=g,a[3]=0,a[7]=0,a[11]=0,a[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let i=0;i<16;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}};wo.prototype.isMatrix4=!0;let Ke=wo;const Yi=new L,bn=new Ke,kd=new L(0,0,0),Gd=new L(1,1,1),pi=new L,wr=new L,an=new L,Nl=new Ke,Ul=new rn;class li{constructor(e=0,t=0,n=0,i=li.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,i=this._order){return this._x=e,this._y=t,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const i=e.elements,s=i[0],o=i[4],c=i[8],l=i[1],a=i[5],h=i[9],u=i[2],f=i[6],_=i[10];switch(t){case"XYZ":this._y=Math.asin(ot(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-h,_),this._z=Math.atan2(-o,s)):(this._x=Math.atan2(f,a),this._z=0);break;case"YXZ":this._x=Math.asin(-ot(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(c,_),this._z=Math.atan2(l,a)):(this._y=Math.atan2(-u,s),this._z=0);break;case"ZXY":this._x=Math.asin(ot(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-u,_),this._z=Math.atan2(-o,a)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-ot(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(f,_),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-o,a));break;case"YZX":this._z=Math.asin(ot(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,a),this._y=Math.atan2(-u,s)):(this._x=0,this._y=Math.atan2(c,_));break;case"XZY":this._z=Math.asin(-ot(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(f,a),this._y=Math.atan2(c,s)):(this._x=Math.atan2(-h,_),this._y=0);break;default:Ue("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return Nl.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Nl,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Ul.setFromEuler(this),this.setFromQuaternion(Ul,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}li.DEFAULT_ORDER="XYZ";class Kc{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let Vd=0;const Fl=new L,Ki=new rn,jn=new Ke,Tr=new L,Ns=new L,Hd=new L,Wd=new rn,Ol=new L(1,0,0),Bl=new L(0,1,0),zl=new L(0,0,1),kl={type:"added"},Xd={type:"removed"},ji={type:"childadded",child:null},ko={type:"childremoved",child:null};class bt extends wi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Vd++}),this.uuid=Sn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=bt.DEFAULT_UP.clone();const e=new L,t=new li,n=new rn,i=new L(1,1,1);function s(){n.setFromEuler(t,!1)}function o(){t.setFromQuaternion(n,void 0,!1)}t._onChange(s),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new Ke},normalMatrix:{value:new $e}}),this.matrix=new Ke,this.matrixWorld=new Ke,this.matrixAutoUpdate=bt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=bt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Kc,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Ki.setFromAxisAngle(e,t),this.quaternion.multiply(Ki),this}rotateOnWorldAxis(e,t){return Ki.setFromAxisAngle(e,t),this.quaternion.premultiply(Ki),this}rotateX(e){return this.rotateOnAxis(Ol,e)}rotateY(e){return this.rotateOnAxis(Bl,e)}rotateZ(e){return this.rotateOnAxis(zl,e)}translateOnAxis(e,t){return Fl.copy(e).applyQuaternion(this.quaternion),this.position.add(Fl.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Ol,e)}translateY(e){return this.translateOnAxis(Bl,e)}translateZ(e){return this.translateOnAxis(zl,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(jn.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?Tr.copy(e):Tr.set(e,t,n);const i=this.parent;this.updateWorldMatrix(!0,!1),Ns.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?jn.lookAt(Ns,Tr,this.up):jn.lookAt(Tr,Ns,this.up),this.quaternion.setFromRotationMatrix(jn),i&&(jn.extractRotation(i.matrixWorld),Ki.setFromRotationMatrix(jn),this.quaternion.premultiply(Ki.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(ke("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(kl),ji.child=e,this.dispatchEvent(ji),ji.child=null):ke("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Xd),ko.child=e,this.dispatchEvent(ko),ko.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),jn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),jn.multiply(e.parent.matrixWorld)),e.applyMatrix4(jn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(kl),ji.child=e,this.dispatchEvent(ji),ji.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,i=this.children.length;n<i;n++){const o=this.children[n].getObjectByProperty(e,t);if(o!==void 0)return o}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const i=this.children;for(let s=0,o=i.length;s<o;s++)i[s].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ns,e,Hd),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ns,Wd,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const e=this.pivot;if(e!==null){const t=e.x,n=e.y,i=e.z,s=this.matrix.elements;s[12]+=t-s[0]*t-s[4]*n-s[8]*i,s[13]+=n-s[1]*t-s[5]*n-s[9]*i,s[14]+=i-s[2]*t-s[6]*n-s[10]*i}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){const n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const i=this.children;for(let s=0,o=i.length;s<o;s++)i[s].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const i={};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),this.static!==!1&&(i.static=this.static),Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.pivot!==null&&(i.pivot=this.pivot.toArray()),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.morphTargetDictionary!==void 0&&(i.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(i.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.geometryInfo=this._geometryInfo.map(c=>({...c,boundingBox:c.boundingBox?c.boundingBox.toJSON():void 0,boundingSphere:c.boundingSphere?c.boundingSphere.toJSON():void 0})),i.instanceInfo=this._instanceInfo.map(c=>({...c})),i.availableInstanceIds=this._availableInstanceIds.slice(),i.availableGeometryIds=this._availableGeometryIds.slice(),i.nextIndexStart=this._nextIndexStart,i.nextVertexStart=this._nextVertexStart,i.geometryCount=this._geometryCount,i.maxInstanceCount=this._maxInstanceCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.matricesTexture=this._matricesTexture.toJSON(e),i.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(i.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(i.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(i.boundingBox=this.boundingBox.toJSON()));function s(c,l){return c[l.uuid]===void 0&&(c[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=s(e.geometries,this.geometry);const c=this.geometry.parameters;if(c!==void 0&&c.shapes!==void 0){const l=c.shapes;if(Array.isArray(l))for(let a=0,h=l.length;a<h;a++){const u=l[a];s(e.shapes,u)}else s(e.shapes,l)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const c=[];for(let l=0,a=this.material.length;l<a;l++)c.push(s(e.materials,this.material[l]));i.material=c}else i.material=s(e.materials,this.material);if(this.children.length>0){i.children=[];for(let c=0;c<this.children.length;c++)i.children.push(this.children[c].toJSON(e).object)}if(this.animations.length>0){i.animations=[];for(let c=0;c<this.animations.length;c++){const l=this.animations[c];i.animations.push(s(e.animations,l))}}if(t){const c=o(e.geometries),l=o(e.materials),a=o(e.textures),h=o(e.images),u=o(e.shapes),f=o(e.skeletons),_=o(e.animations),p=o(e.nodes);c.length>0&&(n.geometries=c),l.length>0&&(n.materials=l),a.length>0&&(n.textures=a),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),f.length>0&&(n.skeletons=f),_.length>0&&(n.animations=_),p.length>0&&(n.nodes=p)}return n.object=i,n;function o(c){const l=[];for(const a in c){const h=c[a];delete h.metadata,l.push(h)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const i=e.children[n];this.add(i.clone())}return this}}bt.DEFAULT_UP=new L(0,1,0);bt.DEFAULT_MATRIX_AUTO_UPDATE=!0;bt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class gt extends bt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const qd={type:"move"};class Go{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new gt,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new gt,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new L,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new L),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new gt,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new L,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new L,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let i=null,s=null,o=null;const c=this._targetRay,l=this._grip,a=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(a&&e.hand){o=!0;for(const g of e.hand.values()){const d=t.getJointPose(g,n),m=this._getHandJoint(a,g);d!==null&&(m.matrix.fromArray(d.transform.matrix),m.matrix.decompose(m.position,m.rotation,m.scale),m.matrixWorldNeedsUpdate=!0,m.jointRadius=d.radius),m.visible=d!==null}const h=a.joints["index-finger-tip"],u=a.joints["thumb-tip"],f=h.position.distanceTo(u.position),_=.02,p=.005;a.inputState.pinching&&f>_+p?(a.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!a.inputState.pinching&&f<=_-p&&(a.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,n),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1,l.eventsEnabled&&l.dispatchEvent({type:"gripUpdated",data:e,target:this})));c!==null&&(i=t.getPose(e.targetRaySpace,n),i===null&&s!==null&&(i=s),i!==null&&(c.matrix.fromArray(i.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,i.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(i.linearVelocity)):c.hasLinearVelocity=!1,i.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(i.angularVelocity)):c.hasAngularVelocity=!1,this.dispatchEvent(qd)))}return c!==null&&(c.visible=i!==null),l!==null&&(l.visible=s!==null),a!==null&&(a.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new gt;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}const Su={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},mi={h:0,s:0,l:0},Er={h:0,s:0,l:0};function Vo(r,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?r+(e-r)*6*t:t<1/2?e:t<2/3?r+(e-r)*6*(2/3-t):r}class Se{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const i=e;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Tt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,at.colorSpaceToWorking(this,t),this}setRGB(e,t,n,i=at.workingColorSpace){return this.r=e,this.g=t,this.b=n,at.colorSpaceToWorking(this,i),this}setHSL(e,t,n,i=at.workingColorSpace){if(e=qc(e,1),t=ot(t,0,1),n=ot(n,0,1),t===0)this.r=this.g=this.b=n;else{const s=n<=.5?n*(1+t):n+t-n*t,o=2*n-s;this.r=Vo(o,s,e+1/3),this.g=Vo(o,s,e),this.b=Vo(o,s,e-1/3)}return at.colorSpaceToWorking(this,i),this}setStyle(e,t=Tt){function n(s){s!==void 0&&parseFloat(s)<1&&Ue("Color: Alpha component of "+e+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const o=i[1],c=i[2];switch(o){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(c))return n(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(c))return n(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(c))return n(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:Ue("Color: Unknown color model "+e)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=i[1],o=s.length;if(o===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(s,16),t);Ue("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Tt){const n=Su[e.toLowerCase()];return n!==void 0?this.setHex(n,t):Ue("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=ri(e.r),this.g=ri(e.g),this.b=ri(e.b),this}copyLinearToSRGB(e){return this.r=ps(e.r),this.g=ps(e.g),this.b=ps(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Tt){return at.workingToColorSpace(Jt.copy(this),e),Math.round(ot(Jt.r*255,0,255))*65536+Math.round(ot(Jt.g*255,0,255))*256+Math.round(ot(Jt.b*255,0,255))}getHexString(e=Tt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=at.workingColorSpace){at.workingToColorSpace(Jt.copy(this),t);const n=Jt.r,i=Jt.g,s=Jt.b,o=Math.max(n,i,s),c=Math.min(n,i,s);let l,a;const h=(c+o)/2;if(c===o)l=0,a=0;else{const u=o-c;switch(a=h<=.5?u/(o+c):u/(2-o-c),o){case n:l=(i-s)/u+(i<s?6:0);break;case i:l=(s-n)/u+2;break;case s:l=(n-i)/u+4;break}l/=6}return e.h=l,e.s=a,e.l=h,e}getRGB(e,t=at.workingColorSpace){return at.workingToColorSpace(Jt.copy(this),t),e.r=Jt.r,e.g=Jt.g,e.b=Jt.b,e}getStyle(e=Tt){at.workingToColorSpace(Jt.copy(this),e);const t=Jt.r,n=Jt.g,i=Jt.b;return e!==Tt?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(e,t,n){return this.getHSL(mi),this.setHSL(mi.h+e,mi.s+t,mi.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(mi),e.getHSL(Er);const n=tr(mi.h,Er.h,t),i=tr(mi.s,Er.s,t),s=tr(mi.l,Er.l,t);return this.setHSL(n,i,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,i=this.b,s=e.elements;return this.r=s[0]*t+s[3]*n+s[6]*i,this.g=s[1]*t+s[4]*n+s[7]*i,this.b=s[2]*t+s[5]*n+s[8]*i,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Jt=new Se;Se.NAMES=Su;class vo{constructor(e,t=25e-5){this.isFogExp2=!0,this.name="",this.color=new Se(e),this.density=t}clone(){return new vo(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}}class Yd extends bt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new li,this.environmentIntensity=1,this.environmentRotation=new li,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}const wn=new L,Jn=new L,Ho=new L,Zn=new L,Ji=new L,Zi=new L,Gl=new L,Wo=new L,Xo=new L,qo=new L,Yo=new xt,Ko=new xt,jo=new xt;class xn{constructor(e=new L,t=new L,n=new L){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,i){i.subVectors(n,t),wn.subVectors(e,t),i.cross(wn);const s=i.lengthSq();return s>0?i.multiplyScalar(1/Math.sqrt(s)):i.set(0,0,0)}static getBarycoord(e,t,n,i,s){wn.subVectors(i,t),Jn.subVectors(n,t),Ho.subVectors(e,t);const o=wn.dot(wn),c=wn.dot(Jn),l=wn.dot(Ho),a=Jn.dot(Jn),h=Jn.dot(Ho),u=o*a-c*c;if(u===0)return s.set(0,0,0),null;const f=1/u,_=(a*l-c*h)*f,p=(o*h-c*l)*f;return s.set(1-_-p,p,_)}static containsPoint(e,t,n,i){return this.getBarycoord(e,t,n,i,Zn)===null?!1:Zn.x>=0&&Zn.y>=0&&Zn.x+Zn.y<=1}static getInterpolation(e,t,n,i,s,o,c,l){return this.getBarycoord(e,t,n,i,Zn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,Zn.x),l.addScaledVector(o,Zn.y),l.addScaledVector(c,Zn.z),l)}static getInterpolatedAttribute(e,t,n,i,s,o){return Yo.setScalar(0),Ko.setScalar(0),jo.setScalar(0),Yo.fromBufferAttribute(e,t),Ko.fromBufferAttribute(e,n),jo.fromBufferAttribute(e,i),o.setScalar(0),o.addScaledVector(Yo,s.x),o.addScaledVector(Ko,s.y),o.addScaledVector(jo,s.z),o}static isFrontFacing(e,t,n,i){return wn.subVectors(n,t),Jn.subVectors(e,t),wn.cross(Jn).dot(i)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,i){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[i]),this}setFromAttributeAndIndices(e,t,n,i){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,i),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return wn.subVectors(this.c,this.b),Jn.subVectors(this.a,this.b),wn.cross(Jn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return xn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return xn.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,i,s){return xn.getInterpolation(e,this.a,this.b,this.c,t,n,i,s)}containsPoint(e){return xn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return xn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,i=this.b,s=this.c;let o,c;Ji.subVectors(i,n),Zi.subVectors(s,n),Wo.subVectors(e,n);const l=Ji.dot(Wo),a=Zi.dot(Wo);if(l<=0&&a<=0)return t.copy(n);Xo.subVectors(e,i);const h=Ji.dot(Xo),u=Zi.dot(Xo);if(h>=0&&u<=h)return t.copy(i);const f=l*u-h*a;if(f<=0&&l>=0&&h<=0)return o=l/(l-h),t.copy(n).addScaledVector(Ji,o);qo.subVectors(e,s);const _=Ji.dot(qo),p=Zi.dot(qo);if(p>=0&&_<=p)return t.copy(s);const g=_*a-l*p;if(g<=0&&a>=0&&p<=0)return c=a/(a-p),t.copy(n).addScaledVector(Zi,c);const d=h*p-_*u;if(d<=0&&u-h>=0&&_-p>=0)return Gl.subVectors(s,i),c=(u-h)/(u-h+(_-p)),t.copy(i).addScaledVector(Gl,c);const m=1/(d+g+f);return o=g*m,c=f*m,t.copy(n).addScaledVector(Ji,o).addScaledVector(Zi,c)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}class Wn{constructor(e=new L(1/0,1/0,1/0),t=new L(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(Tn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(Tn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=Tn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const s=n.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let o=0,c=s.count;o<c;o++)e.isMesh===!0?e.getVertexPosition(o,Tn):Tn.fromBufferAttribute(s,o),Tn.applyMatrix4(e.matrixWorld),this.expandByPoint(Tn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Ar.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Ar.copy(n.boundingBox)),Ar.applyMatrix4(e.matrixWorld),this.union(Ar)}const i=e.children;for(let s=0,o=i.length;s<o;s++)this.expandByObject(i[s],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Tn),Tn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Us),Rr.subVectors(this.max,Us),$i.subVectors(e.a,Us),Qi.subVectors(e.b,Us),es.subVectors(e.c,Us),gi.subVectors(Qi,$i),_i.subVectors(es,Qi),Ai.subVectors($i,es);let t=[0,-gi.z,gi.y,0,-_i.z,_i.y,0,-Ai.z,Ai.y,gi.z,0,-gi.x,_i.z,0,-_i.x,Ai.z,0,-Ai.x,-gi.y,gi.x,0,-_i.y,_i.x,0,-Ai.y,Ai.x,0];return!Jo(t,$i,Qi,es,Rr)||(t=[1,0,0,0,1,0,0,0,1],!Jo(t,$i,Qi,es,Rr))?!1:(Cr.crossVectors(gi,_i),t=[Cr.x,Cr.y,Cr.z],Jo(t,$i,Qi,es,Rr))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Tn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Tn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:($n[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),$n[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),$n[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),$n[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),$n[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),$n[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),$n[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),$n[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints($n),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const $n=[new L,new L,new L,new L,new L,new L,new L,new L],Tn=new L,Ar=new Wn,$i=new L,Qi=new L,es=new L,gi=new L,_i=new L,Ai=new L,Us=new L,Rr=new L,Cr=new L,Ri=new L;function Jo(r,e,t,n,i){for(let s=0,o=r.length-3;s<=o;s+=3){Ri.fromArray(r,s);const c=i.x*Math.abs(Ri.x)+i.y*Math.abs(Ri.y)+i.z*Math.abs(Ri.z),l=e.dot(Ri),a=t.dot(Ri),h=n.dot(Ri);if(Math.max(-Math.max(l,a,h),Math.min(l,a,h))>c)return!1}return!0}const Ut=new L,Pr=new ee;let Kd=0;class It extends wi{constructor(e,t,n=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Kd++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=pc,this.updateRanges=[],this.gpuType=yn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let i=0,s=this.itemSize;i<s;i++)this.array[e+i]=t.array[n+i];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)Pr.fromBufferAttribute(this,t),Pr.applyMatrix3(e),this.setXY(t,Pr.x,Pr.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)Ut.fromBufferAttribute(this,t),Ut.applyMatrix3(e),this.setXYZ(t,Ut.x,Ut.y,Ut.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)Ut.fromBufferAttribute(this,t),Ut.applyMatrix4(e),this.setXYZ(t,Ut.x,Ut.y,Ut.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Ut.fromBufferAttribute(this,t),Ut.applyNormalMatrix(e),this.setXYZ(t,Ut.x,Ut.y,Ut.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Ut.fromBufferAttribute(this,t),Ut.transformDirection(e),this.setXYZ(t,Ut.x,Ut.y,Ut.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=En(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=_t(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=En(t,this.array)),t}setX(e,t){return this.normalized&&(t=_t(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=En(t,this.array)),t}setY(e,t){return this.normalized&&(t=_t(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=En(t,this.array)),t}setZ(e,t){return this.normalized&&(t=_t(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=En(t,this.array)),t}setW(e,t){return this.normalized&&(t=_t(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=_t(t,this.array),n=_t(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,i){return e*=this.itemSize,this.normalized&&(t=_t(t,this.array),n=_t(n,this.array),i=_t(i,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this}setXYZW(e,t,n,i,s){return e*=this.itemSize,this.normalized&&(t=_t(t,this.array),n=_t(n,this.array),i=_t(i,this.array),s=_t(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==pc&&(e.usage=this.usage),e}dispose(){this.dispatchEvent({type:"dispose"})}}class bu extends It{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class wu extends It{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class tt extends It{constructor(e,t,n){super(new Float32Array(e),t,n)}}const jd=new Wn,Fs=new L,Zo=new L;class Xn{constructor(e=new L,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):jd.setFromPoints(e).getCenter(n);let i=0;for(let s=0,o=e.length;s<o;s++)i=Math.max(i,n.distanceToSquared(e[s]));return this.radius=Math.sqrt(i),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Fs.subVectors(e,this.center);const t=Fs.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),i=(n-this.radius)*.5;this.center.addScaledVector(Fs,i/n),this.radius+=i}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Zo.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Fs.copy(e.center).add(Zo)),this.expandByPoint(Fs.copy(e.center).sub(Zo))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}let Jd=0;const mn=new Ke,$o=new bt,ts=new L,cn=new Wn,Os=new Wn,qt=new L;class Et extends wi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Jd++}),this.uuid=Sn(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(dd(e)?wu:bu)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const s=new $e().getNormalMatrix(e);n.applyNormalMatrix(s),n.needsUpdate=!0}const i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(e),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return mn.makeRotationFromQuaternion(e),this.applyMatrix4(mn),this}rotateX(e){return mn.makeRotationX(e),this.applyMatrix4(mn),this}rotateY(e){return mn.makeRotationY(e),this.applyMatrix4(mn),this}rotateZ(e){return mn.makeRotationZ(e),this.applyMatrix4(mn),this}translate(e,t,n){return mn.makeTranslation(e,t,n),this.applyMatrix4(mn),this}scale(e,t,n){return mn.makeScale(e,t,n),this.applyMatrix4(mn),this}lookAt(e){return $o.lookAt(e),$o.updateMatrix(),this.applyMatrix4($o.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(ts).negate(),this.translate(ts.x,ts.y,ts.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const n=[];for(let i=0,s=e.length;i<s;i++){const o=e[i];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new tt(n,3))}else{const n=Math.min(e.length,t.count);for(let i=0;i<n;i++){const s=e[i];t.setXYZ(i,s.x,s.y,s.z||0)}e.length>t.count&&Ue("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Wn);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){ke("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new L(-1/0,-1/0,-1/0),new L(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,i=t.length;n<i;n++){const s=t[n];cn.setFromBufferAttribute(s),this.morphTargetsRelative?(qt.addVectors(this.boundingBox.min,cn.min),this.boundingBox.expandByPoint(qt),qt.addVectors(this.boundingBox.max,cn.max),this.boundingBox.expandByPoint(qt)):(this.boundingBox.expandByPoint(cn.min),this.boundingBox.expandByPoint(cn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&ke('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Xn);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){ke("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new L,1/0);return}if(e){const n=this.boundingSphere.center;if(cn.setFromBufferAttribute(e),t)for(let s=0,o=t.length;s<o;s++){const c=t[s];Os.setFromBufferAttribute(c),this.morphTargetsRelative?(qt.addVectors(cn.min,Os.min),cn.expandByPoint(qt),qt.addVectors(cn.max,Os.max),cn.expandByPoint(qt)):(cn.expandByPoint(Os.min),cn.expandByPoint(Os.max))}cn.getCenter(n);let i=0;for(let s=0,o=e.count;s<o;s++)qt.fromBufferAttribute(e,s),i=Math.max(i,n.distanceToSquared(qt));if(t)for(let s=0,o=t.length;s<o;s++){const c=t[s],l=this.morphTargetsRelative;for(let a=0,h=c.count;a<h;a++)qt.fromBufferAttribute(c,a),l&&(ts.fromBufferAttribute(e,a),qt.add(ts)),i=Math.max(i,n.distanceToSquared(qt))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&ke('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){ke("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.position,i=t.normal,s=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new It(new Float32Array(4*n.count),4));const o=this.getAttribute("tangent"),c=[],l=[];for(let M=0;M<n.count;M++)c[M]=new L,l[M]=new L;const a=new L,h=new L,u=new L,f=new ee,_=new ee,p=new ee,g=new L,d=new L;function m(M,T,R){a.fromBufferAttribute(n,M),h.fromBufferAttribute(n,T),u.fromBufferAttribute(n,R),f.fromBufferAttribute(s,M),_.fromBufferAttribute(s,T),p.fromBufferAttribute(s,R),h.sub(a),u.sub(a),_.sub(f),p.sub(f);const P=1/(_.x*p.y-p.x*_.y);isFinite(P)&&(g.copy(h).multiplyScalar(p.y).addScaledVector(u,-_.y).multiplyScalar(P),d.copy(u).multiplyScalar(_.x).addScaledVector(h,-p.x).multiplyScalar(P),c[M].add(g),c[T].add(g),c[R].add(g),l[M].add(d),l[T].add(d),l[R].add(d))}let x=this.groups;x.length===0&&(x=[{start:0,count:e.count}]);for(let M=0,T=x.length;M<T;++M){const R=x[M],P=R.start,D=R.count;for(let U=P,k=P+D;U<k;U+=3)m(e.getX(U+0),e.getX(U+1),e.getX(U+2))}const v=new L,y=new L,b=new L,S=new L;function w(M){b.fromBufferAttribute(i,M),S.copy(b);const T=c[M];v.copy(T),v.sub(b.multiplyScalar(b.dot(T))).normalize(),y.crossVectors(S,T);const P=y.dot(l[M])<0?-1:1;o.setXYZW(M,v.x,v.y,v.z,P)}for(let M=0,T=x.length;M<T;++M){const R=x[M],P=R.start,D=R.count;for(let U=P,k=P+D;U<k;U+=3)w(e.getX(U+0)),w(e.getX(U+1)),w(e.getX(U+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new It(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let f=0,_=n.count;f<_;f++)n.setXYZ(f,0,0,0);const i=new L,s=new L,o=new L,c=new L,l=new L,a=new L,h=new L,u=new L;if(e)for(let f=0,_=e.count;f<_;f+=3){const p=e.getX(f+0),g=e.getX(f+1),d=e.getX(f+2);i.fromBufferAttribute(t,p),s.fromBufferAttribute(t,g),o.fromBufferAttribute(t,d),h.subVectors(o,s),u.subVectors(i,s),h.cross(u),c.fromBufferAttribute(n,p),l.fromBufferAttribute(n,g),a.fromBufferAttribute(n,d),c.add(h),l.add(h),a.add(h),n.setXYZ(p,c.x,c.y,c.z),n.setXYZ(g,l.x,l.y,l.z),n.setXYZ(d,a.x,a.y,a.z)}else for(let f=0,_=t.count;f<_;f+=3)i.fromBufferAttribute(t,f+0),s.fromBufferAttribute(t,f+1),o.fromBufferAttribute(t,f+2),h.subVectors(o,s),u.subVectors(i,s),h.cross(u),n.setXYZ(f+0,h.x,h.y,h.z),n.setXYZ(f+1,h.x,h.y,h.z),n.setXYZ(f+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)qt.fromBufferAttribute(e,t),qt.normalize(),e.setXYZ(t,qt.x,qt.y,qt.z)}toNonIndexed(){function e(c,l){const a=c.array,h=c.itemSize,u=c.normalized,f=new a.constructor(l.length*h);let _=0,p=0;for(let g=0,d=l.length;g<d;g++){c.isInterleavedBufferAttribute?_=l[g]*c.data.stride+c.offset:_=l[g]*h;for(let m=0;m<h;m++)f[p++]=a[_++]}return new It(f,h,u)}if(this.index===null)return Ue("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new Et,n=this.index.array,i=this.attributes;for(const c in i){const l=i[c],a=e(l,n);t.setAttribute(c,a)}const s=this.morphAttributes;for(const c in s){const l=[],a=s[c];for(let h=0,u=a.length;h<u;h++){const f=a[h],_=e(f,n);l.push(_)}t.morphAttributes[c]=l}t.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let c=0,l=o.length;c<l;c++){const a=o[c];t.addGroup(a.start,a.count,a.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const a in l)l[a]!==void 0&&(e[a]=l[a]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const l in n){const a=n[l];e.data.attributes[l]=a.toJSON(e.data)}const i={};let s=!1;for(const l in this.morphAttributes){const a=this.morphAttributes[l],h=[];for(let u=0,f=a.length;u<f;u++){const _=a[u];h.push(_.toJSON(e.data))}h.length>0&&(i[l]=h,s=!0)}s&&(e.data.morphAttributes=i,e.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));const c=this.boundingSphere;return c!==null&&(e.data.boundingSphere=c.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone());const i=e.attributes;for(const a in i){const h=i[a];this.setAttribute(a,h.clone(t))}const s=e.morphAttributes;for(const a in s){const h=[],u=s[a];for(let f=0,_=u.length;f<_;f++)h.push(u[f].clone(t));this.morphAttributes[a]=h}this.morphTargetsRelative=e.morphTargetsRelative;const o=e.groups;for(let a=0,h=o.length;a<h;a++){const u=o[a];this.addGroup(u.start,u.count,u.materialIndex)}const c=e.boundingBox;c!==null&&(this.boundingBox=c.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Tu{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=pc,this.updateRanges=[],this.version=0,this.uuid=Sn()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let i=0,s=this.stride;i<s;i++)this.array[e+i]=t.array[n+i];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Sn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Sn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const Qt=new L;class fr{constructor(e,t,n,i=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=i}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)Qt.fromBufferAttribute(this,t),Qt.applyMatrix4(e),this.setXYZ(t,Qt.x,Qt.y,Qt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Qt.fromBufferAttribute(this,t),Qt.applyNormalMatrix(e),this.setXYZ(t,Qt.x,Qt.y,Qt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Qt.fromBufferAttribute(this,t),Qt.transformDirection(e),this.setXYZ(t,Qt.x,Qt.y,Qt.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=En(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=_t(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=_t(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=_t(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=_t(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=_t(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=En(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=En(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=En(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=En(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=_t(t,this.array),n=_t(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=_t(t,this.array),n=_t(n,this.array),i=_t(i,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this}setXYZW(e,t,n,i,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=_t(t,this.array),n=_t(n,this.array),i=_t(i,this.array),s=_t(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this.data.array[e+3]=s,this}clone(e){if(e===void 0){xo("InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[i+s])}return new It(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new fr(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){xo("InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[i+s])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}let Zd=0;class Rn extends wi{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Zd++}),this.uuid=Sn(),this.name="",this.type="Material",this.blending=ds,this.side=ai,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Aa,this.blendDst=Ra,this.blendEquation=Di,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Se(0,0,0),this.blendAlpha=0,this.depthFunc=gs,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Al,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Xi,this.stencilZFail=Xi,this.stencilZPass=Xi,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){Ue(`Material: parameter '${t}' has value of undefined.`);continue}const i=this[t];if(i===void 0){Ue(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==ds&&(n.blending=this.blending),this.side!==ai&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Aa&&(n.blendSrc=this.blendSrc),this.blendDst!==Ra&&(n.blendDst=this.blendDst),this.blendEquation!==Di&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==gs&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Al&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Xi&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Xi&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Xi&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.allowOverride===!1&&(n.allowOverride=!1),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(s){const o=[];for(const c in s){const l=s[c];delete l.metadata,o.push(l)}return o}if(t){const s=i(e.textures),o=i(e.images);s.length>0&&(n.textures=s),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const i=t.length;n=new Array(i);for(let s=0;s!==i;++s)n[s]=t[s].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class Si extends Rn{constructor(e){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new Se(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}let ns;const Bs=new L,is=new L,ss=new L,rs=new ee,zs=new ee,Eu=new Ke,Lr=new L,ks=new L,Dr=new L,Vl=new ee,Qo=new ee,Hl=new ee;class Ii extends bt{constructor(e=new Si){if(super(),this.isSprite=!0,this.type="Sprite",ns===void 0){ns=new Et;const t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new Tu(t,5);ns.setIndex([0,1,2,0,2,3]),ns.setAttribute("position",new fr(n,3,0,!1)),ns.setAttribute("uv",new fr(n,2,3,!1))}this.geometry=ns,this.material=e,this.center=new ee(.5,.5),this.count=1}raycast(e,t){e.camera===null&&ke('Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),is.setFromMatrixScale(this.matrixWorld),Eu.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),ss.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&is.multiplyScalar(-ss.z);const n=this.material.rotation;let i,s;n!==0&&(s=Math.cos(n),i=Math.sin(n));const o=this.center;Ir(Lr.set(-.5,-.5,0),ss,o,is,i,s),Ir(ks.set(.5,-.5,0),ss,o,is,i,s),Ir(Dr.set(.5,.5,0),ss,o,is,i,s),Vl.set(0,0),Qo.set(1,0),Hl.set(1,1);let c=e.ray.intersectTriangle(Lr,ks,Dr,!1,Bs);if(c===null&&(Ir(ks.set(-.5,.5,0),ss,o,is,i,s),Qo.set(0,1),c=e.ray.intersectTriangle(Lr,Dr,ks,!1,Bs),c===null))return;const l=e.ray.origin.distanceTo(Bs);l<e.near||l>e.far||t.push({distance:l,point:Bs.clone(),uv:xn.getInterpolation(Bs,Lr,ks,Dr,Vl,Qo,Hl,new ee),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}}function Ir(r,e,t,n,i,s){rs.subVectors(r,t).addScalar(.5).multiply(n),i!==void 0?(zs.x=s*rs.x-i*rs.y,zs.y=i*rs.x+s*rs.y):zs.copy(rs),r.copy(e),r.x+=zs.x,r.y+=zs.y,r.applyMatrix4(Eu)}const Qn=new L,ea=new L,Nr=new L,xi=new L,ta=new L,Ur=new L,na=new L;class _r{constructor(e=new L,t=new L(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Qn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=Qn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Qn.copy(this.origin).addScaledVector(this.direction,t),Qn.distanceToSquared(e))}distanceSqToSegment(e,t,n,i){ea.copy(e).add(t).multiplyScalar(.5),Nr.copy(t).sub(e).normalize(),xi.copy(this.origin).sub(ea);const s=e.distanceTo(t)*.5,o=-this.direction.dot(Nr),c=xi.dot(this.direction),l=-xi.dot(Nr),a=xi.lengthSq(),h=Math.abs(1-o*o);let u,f,_,p;if(h>0)if(u=o*l-c,f=o*c-l,p=s*h,u>=0)if(f>=-p)if(f<=p){const g=1/h;u*=g,f*=g,_=u*(u+o*f+2*c)+f*(o*u+f+2*l)+a}else f=s,u=Math.max(0,-(o*f+c)),_=-u*u+f*(f+2*l)+a;else f=-s,u=Math.max(0,-(o*f+c)),_=-u*u+f*(f+2*l)+a;else f<=-p?(u=Math.max(0,-(-o*s+c)),f=u>0?-s:Math.min(Math.max(-s,-l),s),_=-u*u+f*(f+2*l)+a):f<=p?(u=0,f=Math.min(Math.max(-s,-l),s),_=f*(f+2*l)+a):(u=Math.max(0,-(o*s+c)),f=u>0?s:Math.min(Math.max(-s,-l),s),_=-u*u+f*(f+2*l)+a);else f=o>0?-s:s,u=Math.max(0,-(o*f+c)),_=-u*u+f*(f+2*l)+a;return n&&n.copy(this.origin).addScaledVector(this.direction,u),i&&i.copy(ea).addScaledVector(Nr,f),_}intersectSphere(e,t){Qn.subVectors(e.center,this.origin);const n=Qn.dot(this.direction),i=Qn.dot(Qn)-n*n,s=e.radius*e.radius;if(i>s)return null;const o=Math.sqrt(s-i),c=n-o,l=n+o;return l<0?null:c<0?this.at(l,t):this.at(c,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,i,s,o,c,l;const a=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,f=this.origin;return a>=0?(n=(e.min.x-f.x)*a,i=(e.max.x-f.x)*a):(n=(e.max.x-f.x)*a,i=(e.min.x-f.x)*a),h>=0?(s=(e.min.y-f.y)*h,o=(e.max.y-f.y)*h):(s=(e.max.y-f.y)*h,o=(e.min.y-f.y)*h),n>o||s>i||((s>n||isNaN(n))&&(n=s),(o<i||isNaN(i))&&(i=o),u>=0?(c=(e.min.z-f.z)*u,l=(e.max.z-f.z)*u):(c=(e.max.z-f.z)*u,l=(e.min.z-f.z)*u),n>l||c>i)||((c>n||n!==n)&&(n=c),(l<i||i!==i)&&(i=l),i<0)?null:this.at(n>=0?n:i,t)}intersectsBox(e){return this.intersectBox(e,Qn)!==null}intersectTriangle(e,t,n,i,s){ta.subVectors(t,e),Ur.subVectors(n,e),na.crossVectors(ta,Ur);let o=this.direction.dot(na),c;if(o>0){if(i)return null;c=1}else if(o<0)c=-1,o=-o;else return null;xi.subVectors(this.origin,e);const l=c*this.direction.dot(Ur.crossVectors(xi,Ur));if(l<0)return null;const a=c*this.direction.dot(ta.cross(xi));if(a<0||l+a>o)return null;const h=-c*xi.dot(na);return h<0?null:this.at(h/o,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Ot extends Rn{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Se(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new li,this.combine=lu,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const Wl=new Ke,Ci=new _r,Fr=new Xn,Xl=new L,Or=new L,Br=new L,zr=new L,ia=new L,kr=new L,ql=new L,Gr=new L;class G extends bt{constructor(e=new Et,t=new Ot){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=i.length;s<o;s++){const c=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[c]=s}}}}getVertexPosition(e,t){const n=this.geometry,i=n.attributes.position,s=n.morphAttributes.position,o=n.morphTargetsRelative;t.fromBufferAttribute(i,e);const c=this.morphTargetInfluences;if(s&&c){kr.set(0,0,0);for(let l=0,a=s.length;l<a;l++){const h=c[l],u=s[l];h!==0&&(ia.fromBufferAttribute(u,e),o?kr.addScaledVector(ia,h):kr.addScaledVector(ia.sub(t),h))}t.add(kr)}return t}raycast(e,t){const n=this.geometry,i=this.material,s=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Fr.copy(n.boundingSphere),Fr.applyMatrix4(s),Ci.copy(e.ray).recast(e.near),!(Fr.containsPoint(Ci.origin)===!1&&(Ci.intersectSphere(Fr,Xl)===null||Ci.origin.distanceToSquared(Xl)>(e.far-e.near)**2))&&(Wl.copy(s).invert(),Ci.copy(e.ray).applyMatrix4(Wl),!(n.boundingBox!==null&&Ci.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,Ci)))}_computeIntersections(e,t,n){let i;const s=this.geometry,o=this.material,c=s.index,l=s.attributes.position,a=s.attributes.uv,h=s.attributes.uv1,u=s.attributes.normal,f=s.groups,_=s.drawRange;if(c!==null)if(Array.isArray(o))for(let p=0,g=f.length;p<g;p++){const d=f[p],m=o[d.materialIndex],x=Math.max(d.start,_.start),v=Math.min(c.count,Math.min(d.start+d.count,_.start+_.count));for(let y=x,b=v;y<b;y+=3){const S=c.getX(y),w=c.getX(y+1),M=c.getX(y+2);i=Vr(this,m,e,n,a,h,u,S,w,M),i&&(i.faceIndex=Math.floor(y/3),i.face.materialIndex=d.materialIndex,t.push(i))}}else{const p=Math.max(0,_.start),g=Math.min(c.count,_.start+_.count);for(let d=p,m=g;d<m;d+=3){const x=c.getX(d),v=c.getX(d+1),y=c.getX(d+2);i=Vr(this,o,e,n,a,h,u,x,v,y),i&&(i.faceIndex=Math.floor(d/3),t.push(i))}}else if(l!==void 0)if(Array.isArray(o))for(let p=0,g=f.length;p<g;p++){const d=f[p],m=o[d.materialIndex],x=Math.max(d.start,_.start),v=Math.min(l.count,Math.min(d.start+d.count,_.start+_.count));for(let y=x,b=v;y<b;y+=3){const S=y,w=y+1,M=y+2;i=Vr(this,m,e,n,a,h,u,S,w,M),i&&(i.faceIndex=Math.floor(y/3),i.face.materialIndex=d.materialIndex,t.push(i))}}else{const p=Math.max(0,_.start),g=Math.min(l.count,_.start+_.count);for(let d=p,m=g;d<m;d+=3){const x=d,v=d+1,y=d+2;i=Vr(this,o,e,n,a,h,u,x,v,y),i&&(i.faceIndex=Math.floor(d/3),t.push(i))}}}}function $d(r,e,t,n,i,s,o,c){let l;if(e.side===Zt?l=n.intersectTriangle(o,s,i,!0,c):l=n.intersectTriangle(i,s,o,e.side===ai,c),l===null)return null;Gr.copy(c),Gr.applyMatrix4(r.matrixWorld);const a=t.ray.origin.distanceTo(Gr);return a<t.near||a>t.far?null:{distance:a,point:Gr.clone(),object:r}}function Vr(r,e,t,n,i,s,o,c,l,a){r.getVertexPosition(c,Or),r.getVertexPosition(l,Br),r.getVertexPosition(a,zr);const h=$d(r,e,t,n,Or,Br,zr,ql);if(h){const u=new L;xn.getBarycoord(ql,Or,Br,zr,u),i&&(h.uv=xn.getInterpolatedAttribute(i,c,l,a,u,new ee)),s&&(h.uv1=xn.getInterpolatedAttribute(s,c,l,a,u,new ee)),o&&(h.normal=xn.getInterpolatedAttribute(o,c,l,a,u,new L),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const f={a:c,b:l,c:a,normal:new L,materialIndex:0};xn.getNormal(Or,Br,zr,f.normal),h.face=f,h.barycoord=u}return h}const Gs=new xt,Yl=new xt,Kl=new xt,Qd=new xt,jl=new Ke,Hr=new L,sa=new Xn,Jl=new Ke,ra=new _r;class ep extends G{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=Tl,this.bindMatrix=new Ke,this.bindMatrixInverse=new Ke,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){const e=this.geometry;this.boundingBox===null&&(this.boundingBox=new Wn),this.boundingBox.makeEmpty();const t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,Hr),this.boundingBox.expandByPoint(Hr)}computeBoundingSphere(){const e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new Xn),this.boundingSphere.makeEmpty();const t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,Hr),this.boundingSphere.expandByPoint(Hr)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}raycast(e,t){const n=this.material,i=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),sa.copy(this.boundingSphere),sa.applyMatrix4(i),e.ray.intersectsSphere(sa)!==!1&&(Jl.copy(i).invert(),ra.copy(e.ray).applyMatrix4(Jl),!(this.boundingBox!==null&&ra.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(e,t,ra)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){const e=new xt,t=this.geometry.attributes.skinWeight;for(let n=0,i=t.count;n<i;n++){e.fromBufferAttribute(t,n);const s=1/e.manhattanLength();s!==1/0?e.multiplyScalar(s):e.set(1,0,0,0),t.setXYZW(n,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===Tl?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===ed?this.bindMatrixInverse.copy(this.bindMatrix).invert():Ue("SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(e,t){const n=this.skeleton,i=this.geometry;Yl.fromBufferAttribute(i.attributes.skinIndex,e),Kl.fromBufferAttribute(i.attributes.skinWeight,e),t.isVector4?(Gs.copy(t),t.set(0,0,0,0)):(Gs.set(...t,1),t.set(0,0,0)),Gs.applyMatrix4(this.bindMatrix);for(let s=0;s<4;s++){const o=Kl.getComponent(s);if(o!==0){const c=Yl.getComponent(s);jl.multiplyMatrices(n.bones[c].matrixWorld,n.boneInverses[c]),t.addScaledVector(Qd.copy(Gs).applyMatrix4(jl),o)}}return t.isVector4&&(t.w=Gs.w),t.applyMatrix4(this.bindMatrixInverse)}}class Au extends bt{constructor(){super(),this.isBone=!0,this.type="Bone"}}class jc extends Ht{constructor(e=null,t=1,n=1,i,s,o,c,l,a=Gt,h=Gt,u,f){super(null,o,c,l,a,h,i,s,u,f),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const Zl=new Ke,tp=new Ke;class Jc{constructor(e=[],t=[]){this.uuid=Sn(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.previousBoneMatrices=null,this.boneTexture=null,this.init()}init(){const e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){Ue("Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,i=this.bones.length;n<i;n++)this.boneInverses.push(new Ke)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){const n=new Ke;this.bones[e]&&n.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&n.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){const e=this.bones,t=this.boneInverses,n=this.boneMatrices,i=this.boneTexture;for(let s=0,o=e.length;s<o;s++){const c=e[s]?e[s].matrixWorld:tp;Zl.multiplyMatrices(c,t[s]),Zl.toArray(n,s*16)}i!==null&&(i.needsUpdate=!0)}clone(){return new Jc(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);const t=new Float32Array(e*e*4);t.set(this.boneMatrices);const n=new jc(t,e,e,Mn,yn);return n.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=n,this}getBoneByName(e){for(let t=0,n=this.bones.length;t<n;t++){const i=this.bones[t];if(i.name===e)return i}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let n=0,i=e.bones.length;n<i;n++){const s=e.bones[n];let o=t[s];o===void 0&&(Ue("Skeleton: No bone found with UUID:",s),o=new Au),this.bones.push(o),this.boneInverses.push(new Ke().fromArray(e.boneInverses[n]))}return this.init(),this}toJSON(){const e={metadata:{version:4.7,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;const t=this.bones,n=this.boneInverses;for(let i=0,s=t.length;i<s;i++){const o=t[i];e.bones.push(o.uuid);const c=n[i];e.boneInverses.push(c.toArray())}return e}}class gc extends It{constructor(e,t,n,i=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=i}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const os=new Ke,$l=new Ke,Wr=[],Ql=new Wn,np=new Ke,Vs=new G,Hs=new Xn;class Ru extends G{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new gc(new Float32Array(n*16),16),this.previousInstanceMatrix=null,this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let i=0;i<n;i++)this.setMatrixAt(i,np)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new Wn),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,os),Ql.copy(e.boundingBox).applyMatrix4(os),this.boundingBox.union(Ql)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new Xn),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,os),Hs.copy(e.boundingSphere).applyMatrix4(os),this.boundingSphere.union(Hs)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.previousInstanceMatrix!==null&&(this.previousInstanceMatrix=e.previousInstanceMatrix.clone()),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){return this.instanceColor===null?t.setRGB(1,1,1):t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){return t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){const n=t.morphTargetInfluences,i=this.morphTexture.source.data.data,s=n.length+1,o=e*s+1;for(let c=0;c<n.length;c++)n[c]=i[o+c]}raycast(e,t){const n=this.matrixWorld,i=this.count;if(Vs.geometry=this.geometry,Vs.material=this.material,Vs.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Hs.copy(this.boundingSphere),Hs.applyMatrix4(n),e.ray.intersectsSphere(Hs)!==!1))for(let s=0;s<i;s++){this.getMatrixAt(s,os),$l.multiplyMatrices(n,os),Vs.matrixWorld=$l,Vs.raycast(e,Wr);for(let o=0,c=Wr.length;o<c;o++){const l=Wr[o];l.instanceId=s,l.object=this,t.push(l)}Wr.length=0}}setColorAt(e,t){return this.instanceColor===null&&(this.instanceColor=new gc(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3),this}setMatrixAt(e,t){return t.toArray(this.instanceMatrix.array,e*16),this}setMorphAt(e,t){const n=t.morphTargetInfluences,i=n.length+1;this.morphTexture===null&&(this.morphTexture=new jc(new Float32Array(i*this.count),i,this.count,zc,yn));const s=this.morphTexture.source.data.data;let o=0;for(let a=0;a<n.length;a++)o+=n[a];const c=this.geometry.morphTargetsRelative?1:1-o,l=i*e;return s[l]=c,s.set(n,l+1),this}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}}const oa=new L,ip=new L,sp=new $e;class Mi{constructor(e=new L(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,i){return this.normal.set(e,t,n),this.constant=i,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const i=oa.subVectors(n,t).cross(ip.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(i,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,n=!0){const i=e.delta(oa),s=this.normal.dot(i);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const o=-(e.start.dot(this.normal)+this.constant)/s;return n===!0&&(o<0||o>1)?null:t.copy(e.start).addScaledVector(i,o)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||sp.getNormalMatrix(e),i=this.coplanarPoint(oa).applyMatrix4(e),s=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Pi=new Xn,rp=new ee(.5,.5),Xr=new L;class Zc{constructor(e=new Mi,t=new Mi,n=new Mi,i=new Mi,s=new Mi,o=new Mi){this.planes=[e,t,n,i,s,o]}set(e,t,n,i,s,o){const c=this.planes;return c[0].copy(e),c[1].copy(t),c[2].copy(n),c[3].copy(i),c[4].copy(s),c[5].copy(o),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=zn,n=!1){const i=this.planes,s=e.elements,o=s[0],c=s[1],l=s[2],a=s[3],h=s[4],u=s[5],f=s[6],_=s[7],p=s[8],g=s[9],d=s[10],m=s[11],x=s[12],v=s[13],y=s[14],b=s[15];if(i[0].setComponents(a-o,_-h,m-p,b-x).normalize(),i[1].setComponents(a+o,_+h,m+p,b+x).normalize(),i[2].setComponents(a+c,_+u,m+g,b+v).normalize(),i[3].setComponents(a-c,_-u,m-g,b-v).normalize(),n)i[4].setComponents(l,f,d,y).normalize(),i[5].setComponents(a-l,_-f,m-d,b-y).normalize();else if(i[4].setComponents(a-l,_-f,m-d,b-y).normalize(),t===zn)i[5].setComponents(a+l,_+f,m+d,b+y).normalize();else if(t===hr)i[5].setComponents(l,f,d,y).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Pi.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Pi.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Pi)}intersectsSprite(e){Pi.center.set(0,0,0);const t=rp.distanceTo(e.center);return Pi.radius=.7071067811865476+t,Pi.applyMatrix4(e.matrixWorld),this.intersectsSphere(Pi)}intersectsSphere(e){const t=this.planes,n=e.center,i=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(n)<i)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const i=t[n];if(Xr.x=i.normal.x>0?e.max.x:e.min.x,Xr.y=i.normal.y>0?e.max.y:e.min.y,Xr.z=i.normal.z>0?e.max.z:e.min.z,i.distanceToPoint(Xr)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class Cu extends Rn{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Se(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const yo=new L,Mo=new L,eh=new Ke,Ws=new _r,qr=new Xn,aa=new L,th=new L;class $c extends bt{constructor(e=new Et,t=new Cu){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[0];for(let i=1,s=t.count;i<s;i++)yo.fromBufferAttribute(t,i-1),Mo.fromBufferAttribute(t,i),n[i]=n[i-1],n[i]+=yo.distanceTo(Mo);e.setAttribute("lineDistance",new tt(n,1))}else Ue("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const n=this.geometry,i=this.matrixWorld,s=e.params.Line.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),qr.copy(n.boundingSphere),qr.applyMatrix4(i),qr.radius+=s,e.ray.intersectsSphere(qr)===!1)return;eh.copy(i).invert(),Ws.copy(e.ray).applyMatrix4(eh);const c=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=c*c,a=this.isLineSegments?2:1,h=n.index,f=n.attributes.position;if(h!==null){const _=Math.max(0,o.start),p=Math.min(h.count,o.start+o.count);for(let g=_,d=p-1;g<d;g+=a){const m=h.getX(g),x=h.getX(g+1),v=Yr(this,e,Ws,l,m,x,g);v&&t.push(v)}if(this.isLineLoop){const g=h.getX(p-1),d=h.getX(_),m=Yr(this,e,Ws,l,g,d,p-1);m&&t.push(m)}}else{const _=Math.max(0,o.start),p=Math.min(f.count,o.start+o.count);for(let g=_,d=p-1;g<d;g+=a){const m=Yr(this,e,Ws,l,g,g+1,g);m&&t.push(m)}if(this.isLineLoop){const g=Yr(this,e,Ws,l,p-1,_,p-1);g&&t.push(g)}}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=i.length;s<o;s++){const c=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[c]=s}}}}}function Yr(r,e,t,n,i,s,o){const c=r.geometry.attributes.position;if(yo.fromBufferAttribute(c,i),Mo.fromBufferAttribute(c,s),t.distanceSqToSegment(yo,Mo,aa,th)>n)return;aa.applyMatrix4(r.matrixWorld);const a=e.ray.origin.distanceTo(aa);if(!(a<e.near||a>e.far))return{distance:a,point:th.clone().applyMatrix4(r.matrixWorld),index:o,face:null,faceIndex:null,barycoord:null,object:r}}const nh=new L,ih=new L;class op extends $c{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[];for(let i=0,s=t.count;i<s;i+=2)nh.fromBufferAttribute(t,i),ih.fromBufferAttribute(t,i+1),n[i]=i===0?0:n[i-1],n[i+1]=n[i]+nh.distanceTo(ih);e.setAttribute("lineDistance",new tt(n,1))}else Ue("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class ap extends $c{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type="LineLoop"}}class Qc extends Rn{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Se(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const sh=new Ke,_c=new _r,Kr=new Xn,jr=new L;class Pu extends bt{constructor(e=new Et,t=new Qc){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){const n=this.geometry,i=this.matrixWorld,s=e.params.Points.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Kr.copy(n.boundingSphere),Kr.applyMatrix4(i),Kr.radius+=s,e.ray.intersectsSphere(Kr)===!1)return;sh.copy(i).invert(),_c.copy(e.ray).applyMatrix4(sh);const c=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=c*c,a=n.index,u=n.attributes.position;if(a!==null){const f=Math.max(0,o.start),_=Math.min(a.count,o.start+o.count);for(let p=f,g=_;p<g;p++){const d=a.getX(p);jr.fromBufferAttribute(u,d),rh(jr,d,l,i,e,t,this)}}else{const f=Math.max(0,o.start),_=Math.min(u.count,o.start+o.count);for(let p=f,g=_;p<g;p++)jr.fromBufferAttribute(u,p),rh(jr,p,l,i,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=i.length;s<o;s++){const c=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[c]=s}}}}}function rh(r,e,t,n,i,s,o){const c=_c.distanceSqToPoint(r);if(c<t){const l=new L;_c.closestPointToPoint(r,l),l.applyMatrix4(n);const a=i.ray.origin.distanceTo(l);if(a<i.near||a>i.far)return;s.push({distance:a,distanceToRay:Math.sqrt(c),point:l,index:e,face:null,faceIndex:null,barycoord:null,object:o})}}class Lu extends Ht{constructor(e=[],t=Oi,n,i,s,o,c,l,a,h){super(e,t,n,i,s,o,c,l,a,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class oi extends Ht{constructor(e,t,n,i,s,o,c,l,a){super(e,t,n,i,s,o,c,l,a),this.isCanvasTexture=!0,this.needsUpdate=!0}}class vs extends Ht{constructor(e,t,n=Hn,i,s,o,c=Gt,l=Gt,a,h=ci,u=1){if(h!==ci&&h!==Ui)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const f={width:e,height:t,depth:u};super(f,i,s,o,c,l,h,n,a),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Yc(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}class cp extends vs{constructor(e,t=Hn,n=Oi,i,s,o=Gt,c=Gt,l,a=ci){const h={width:e,height:e,depth:1},u=[h,h,h,h,h,h];super(e,e,t,n,i,s,o,c,l,a),this.image=u,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}}class Du extends Ht{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class ve extends Et{constructor(e=1,t=1,n=1,i=1,s=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:i,heightSegments:s,depthSegments:o};const c=this;i=Math.floor(i),s=Math.floor(s),o=Math.floor(o);const l=[],a=[],h=[],u=[];let f=0,_=0;p("z","y","x",-1,-1,n,t,e,o,s,0),p("z","y","x",1,-1,n,t,-e,o,s,1),p("x","z","y",1,1,e,n,t,i,o,2),p("x","z","y",1,-1,e,n,-t,i,o,3),p("x","y","z",1,-1,e,t,n,i,s,4),p("x","y","z",-1,-1,e,t,-n,i,s,5),this.setIndex(l),this.setAttribute("position",new tt(a,3)),this.setAttribute("normal",new tt(h,3)),this.setAttribute("uv",new tt(u,2));function p(g,d,m,x,v,y,b,S,w,M,T){const R=y/w,P=b/M,D=y/2,U=b/2,k=S/2,N=w+1,O=M+1;let z=0,j=0;const se=new L;for(let me=0;me<O;me++){const Ee=me*P-U;for(let De=0;De<N;De++){const nt=De*R-D;se[g]=nt*x,se[d]=Ee*v,se[m]=k,a.push(se.x,se.y,se.z),se[g]=0,se[d]=0,se[m]=S>0?1:-1,h.push(se.x,se.y,se.z),u.push(De/w),u.push(1-me/M),z+=1}}for(let me=0;me<M;me++)for(let Ee=0;Ee<w;Ee++){const De=f+Ee+N*me,nt=f+Ee+N*(me+1),lt=f+(Ee+1)+N*(me+1),je=f+(Ee+1)+N*me;l.push(De,nt,je),l.push(nt,lt,je),j+=6}c.addGroup(_,j,T),_+=j,f+=z}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ve(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}class ki extends Et{constructor(e=1,t=1,n=4,i=8,s=1){super(),this.type="CapsuleGeometry",this.parameters={radius:e,height:t,capSegments:n,radialSegments:i,heightSegments:s},t=Math.max(0,t),n=Math.max(1,Math.floor(n)),i=Math.max(3,Math.floor(i)),s=Math.max(1,Math.floor(s));const o=[],c=[],l=[],a=[],h=t/2,u=Math.PI/2*e,f=t,_=2*u+f,p=n*2+s,g=i+1,d=new L,m=new L;for(let x=0;x<=p;x++){let v=0,y=0,b=0,S=0;if(x<=n){const T=x/n,R=T*Math.PI/2;y=-h-e*Math.cos(R),b=e*Math.sin(R),S=-e*Math.cos(R),v=T*u}else if(x<=n+s){const T=(x-n)/s;y=-h+T*t,b=e,S=0,v=u+T*f}else{const T=(x-n-s)/n,R=T*Math.PI/2;y=h+e*Math.sin(R),b=e*Math.cos(R),S=e*Math.sin(R),v=u+f+T*u}const w=Math.max(0,Math.min(1,v/_));let M=0;x===0?M=.5/i:x===p&&(M=-.5/i);for(let T=0;T<=i;T++){const R=T/i,P=R*Math.PI*2,D=Math.sin(P),U=Math.cos(P);m.x=-b*U,m.y=y,m.z=b*D,c.push(m.x,m.y,m.z),d.set(-b*U,S,b*D),d.normalize(),l.push(d.x,d.y,d.z),a.push(R+M,w)}if(x>0){const T=(x-1)*g;for(let R=0;R<i;R++){const P=T+R,D=T+R+1,U=x*g+R,k=x*g+R+1;o.push(P,D,U),o.push(D,k,U)}}}this.setIndex(o),this.setAttribute("position",new tt(c,3)),this.setAttribute("normal",new tt(l,3)),this.setAttribute("uv",new tt(a,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ki(e.radius,e.height,e.capSegments,e.radialSegments,e.heightSegments)}}class Ae extends Et{constructor(e=1,t=1,n=1,i=32,s=1,o=!1,c=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:i,heightSegments:s,openEnded:o,thetaStart:c,thetaLength:l};const a=this;i=Math.floor(i),s=Math.floor(s);const h=[],u=[],f=[],_=[];let p=0;const g=[],d=n/2;let m=0;x(),o===!1&&(e>0&&v(!0),t>0&&v(!1)),this.setIndex(h),this.setAttribute("position",new tt(u,3)),this.setAttribute("normal",new tt(f,3)),this.setAttribute("uv",new tt(_,2));function x(){const y=new L,b=new L;let S=0;const w=(t-e)/n;for(let M=0;M<=s;M++){const T=[],R=M/s,P=R*(t-e)+e;for(let D=0;D<=i;D++){const U=D/i,k=U*l+c,N=Math.sin(k),O=Math.cos(k);b.x=P*N,b.y=-R*n+d,b.z=P*O,u.push(b.x,b.y,b.z),y.set(N,w,O).normalize(),f.push(y.x,y.y,y.z),_.push(U,1-R),T.push(p++)}g.push(T)}for(let M=0;M<i;M++)for(let T=0;T<s;T++){const R=g[T][M],P=g[T+1][M],D=g[T+1][M+1],U=g[T][M+1];(e>0||T!==0)&&(h.push(R,P,U),S+=3),(t>0||T!==s-1)&&(h.push(P,D,U),S+=3)}a.addGroup(m,S,0),m+=S}function v(y){const b=p,S=new ee,w=new L;let M=0;const T=y===!0?e:t,R=y===!0?1:-1;for(let D=1;D<=i;D++)u.push(0,d*R,0),f.push(0,R,0),_.push(.5,.5),p++;const P=p;for(let D=0;D<=i;D++){const k=D/i*l+c,N=Math.cos(k),O=Math.sin(k);w.x=T*O,w.y=d*R,w.z=T*N,u.push(w.x,w.y,w.z),f.push(0,R,0),S.x=N*.5+.5,S.y=O*.5*R+.5,_.push(S.x,S.y),p++}for(let D=0;D<i;D++){const U=b+D,k=P+D;y===!0?h.push(k,k+1,U):h.push(k+1,k,U),M+=3}a.addGroup(m,M,y===!0?1:2),m+=M}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ae(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class kt extends Ae{constructor(e=1,t=1,n=32,i=1,s=!1,o=0,c=Math.PI*2){super(0,e,t,n,i,s,o,c),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:n,heightSegments:i,openEnded:s,thetaStart:o,thetaLength:c}}static fromJSON(e){return new kt(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class xr extends Et{constructor(e=[],t=[],n=1,i=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:n,detail:i};const s=[],o=[];c(i),a(n),h(),this.setAttribute("position",new tt(s,3)),this.setAttribute("normal",new tt(s.slice(),3)),this.setAttribute("uv",new tt(o,2)),i===0?this.computeVertexNormals():this.normalizeNormals();function c(x){const v=new L,y=new L,b=new L;for(let S=0;S<t.length;S+=3)_(t[S+0],v),_(t[S+1],y),_(t[S+2],b),l(v,y,b,x)}function l(x,v,y,b){const S=b+1,w=[];for(let M=0;M<=S;M++){w[M]=[];const T=x.clone().lerp(y,M/S),R=v.clone().lerp(y,M/S),P=S-M;for(let D=0;D<=P;D++)D===0&&M===S?w[M][D]=T:w[M][D]=T.clone().lerp(R,D/P)}for(let M=0;M<S;M++)for(let T=0;T<2*(S-M)-1;T++){const R=Math.floor(T/2);T%2===0?(f(w[M][R+1]),f(w[M+1][R]),f(w[M][R])):(f(w[M][R+1]),f(w[M+1][R+1]),f(w[M+1][R]))}}function a(x){const v=new L;for(let y=0;y<s.length;y+=3)v.x=s[y+0],v.y=s[y+1],v.z=s[y+2],v.normalize().multiplyScalar(x),s[y+0]=v.x,s[y+1]=v.y,s[y+2]=v.z}function h(){const x=new L;for(let v=0;v<s.length;v+=3){x.x=s[v+0],x.y=s[v+1],x.z=s[v+2];const y=d(x)/2/Math.PI+.5,b=m(x)/Math.PI+.5;o.push(y,1-b)}p(),u()}function u(){for(let x=0;x<o.length;x+=6){const v=o[x+0],y=o[x+2],b=o[x+4],S=Math.max(v,y,b),w=Math.min(v,y,b);S>.9&&w<.1&&(v<.2&&(o[x+0]+=1),y<.2&&(o[x+2]+=1),b<.2&&(o[x+4]+=1))}}function f(x){s.push(x.x,x.y,x.z)}function _(x,v){const y=x*3;v.x=e[y+0],v.y=e[y+1],v.z=e[y+2]}function p(){const x=new L,v=new L,y=new L,b=new L,S=new ee,w=new ee,M=new ee;for(let T=0,R=0;T<s.length;T+=9,R+=6){x.set(s[T+0],s[T+1],s[T+2]),v.set(s[T+3],s[T+4],s[T+5]),y.set(s[T+6],s[T+7],s[T+8]),S.set(o[R+0],o[R+1]),w.set(o[R+2],o[R+3]),M.set(o[R+4],o[R+5]),b.copy(x).add(v).add(y).divideScalar(3);const P=d(b);g(S,R+0,x,P),g(w,R+2,v,P),g(M,R+4,y,P)}}function g(x,v,y,b){b<0&&x.x===1&&(o[v]=x.x-1),y.x===0&&y.z===0&&(o[v]=b/2/Math.PI+.5)}function d(x){return Math.atan2(x.z,-x.x)}function m(x){return Math.atan2(-x.y,Math.sqrt(x.x*x.x+x.z*x.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new xr(e.vertices,e.indices,e.radius,e.detail)}}class An extends xr{constructor(e=1,t=0){const n=(1+Math.sqrt(5))/2,i=1/n,s=[-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-i,-n,0,-i,n,0,i,-n,0,i,n,-i,-n,0,-i,n,0,i,-n,0,i,n,0,-n,0,-i,n,0,-i,-n,0,i,n,0,i],o=[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9];super(s,o,e,t),this.type="DodecahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new An(e.radius,e.detail)}}class qn{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){Ue("Curve: .getPoint() not implemented.")}getPointAt(e,t){const n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){const e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const t=[];let n,i=this.getPoint(0),s=0;t.push(0);for(let o=1;o<=e;o++)n=this.getPoint(o/e),s+=n.distanceTo(i),t.push(s),i=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){const n=this.getLengths();let i=0;const s=n.length;let o;t?o=t:o=e*n[s-1];let c=0,l=s-1,a;for(;c<=l;)if(i=Math.floor(c+(l-c)/2),a=n[i]-o,a<0)c=i+1;else if(a>0)l=i-1;else{l=i;break}if(i=l,n[i]===o)return i/(s-1);const h=n[i],f=n[i+1]-h,_=(o-h)/f;return(i+_)/(s-1)}getTangent(e,t){let i=e-1e-4,s=e+1e-4;i<0&&(i=0),s>1&&(s=1);const o=this.getPoint(i),c=this.getPoint(s),l=t||(o.isVector2?new ee:new L);return l.copy(c).sub(o).normalize(),l}getTangentAt(e,t){const n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t=!1){const n=new L,i=[],s=[],o=[],c=new L,l=new Ke;for(let _=0;_<=e;_++){const p=_/e;i[_]=this.getTangentAt(p,new L)}s[0]=new L,o[0]=new L;let a=Number.MAX_VALUE;const h=Math.abs(i[0].x),u=Math.abs(i[0].y),f=Math.abs(i[0].z);h<=a&&(a=h,n.set(1,0,0)),u<=a&&(a=u,n.set(0,1,0)),f<=a&&n.set(0,0,1),c.crossVectors(i[0],n).normalize(),s[0].crossVectors(i[0],c),o[0].crossVectors(i[0],s[0]);for(let _=1;_<=e;_++){if(s[_]=s[_-1].clone(),o[_]=o[_-1].clone(),c.crossVectors(i[_-1],i[_]),c.length()>Number.EPSILON){c.normalize();const p=Math.acos(ot(i[_-1].dot(i[_]),-1,1));s[_].applyMatrix4(l.makeRotationAxis(c,p))}o[_].crossVectors(i[_],s[_])}if(t===!0){let _=Math.acos(ot(s[0].dot(s[e]),-1,1));_/=e,i[0].dot(c.crossVectors(s[0],s[e]))>0&&(_=-_);for(let p=1;p<=e;p++)s[p].applyMatrix4(l.makeRotationAxis(i[p],_*p)),o[p].crossVectors(i[p],s[p])}return{tangents:i,normals:s,binormals:o}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){const e={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}}class el extends qn{constructor(e=0,t=0,n=1,i=1,s=0,o=Math.PI*2,c=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=i,this.aStartAngle=s,this.aEndAngle=o,this.aClockwise=c,this.aRotation=l}getPoint(e,t=new ee){const n=t,i=Math.PI*2;let s=this.aEndAngle-this.aStartAngle;const o=Math.abs(s)<Number.EPSILON;for(;s<0;)s+=i;for(;s>i;)s-=i;s<Number.EPSILON&&(o?s=0:s=i),this.aClockwise===!0&&!o&&(s===i?s=-i:s=s-i);const c=this.aStartAngle+e*s;let l=this.aX+this.xRadius*Math.cos(c),a=this.aY+this.yRadius*Math.sin(c);if(this.aRotation!==0){const h=Math.cos(this.aRotation),u=Math.sin(this.aRotation),f=l-this.aX,_=a-this.aY;l=f*h-_*u+this.aX,a=f*u+_*h+this.aY}return n.set(l,a)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){const e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}}class lp extends el{constructor(e,t,n,i,s,o){super(e,t,n,n,i,s,o),this.isArcCurve=!0,this.type="ArcCurve"}}function tl(){let r=0,e=0,t=0,n=0;function i(s,o,c,l){r=s,e=c,t=-3*s+3*o-2*c-l,n=2*s-2*o+c+l}return{initCatmullRom:function(s,o,c,l,a){i(o,c,a*(c-s),a*(l-o))},initNonuniformCatmullRom:function(s,o,c,l,a,h,u){let f=(o-s)/a-(c-s)/(a+h)+(c-o)/h,_=(c-o)/h-(l-o)/(h+u)+(l-c)/u;f*=h,_*=h,i(o,c,f,_)},calc:function(s){const o=s*s,c=o*s;return r+e*s+t*o+n*c}}}const oh=new L,ah=new L,ca=new tl,la=new tl,ha=new tl;class ni extends qn{constructor(e=[],t=!1,n="centripetal",i=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=n,this.tension=i}getPoint(e,t=new L){const n=t,i=this.points,s=i.length,o=(s-(this.closed?0:1))*e;let c=Math.floor(o),l=o-c;this.closed?c+=c>0?0:(Math.floor(Math.abs(c)/s)+1)*s:l===0&&c===s-1&&(c=s-2,l=1);let a,h;this.closed||c>0?a=i[(c-1)%s]:(ah.subVectors(i[0],i[1]).add(i[0]),a=ah);const u=i[c%s],f=i[(c+1)%s];if(this.closed||c+2<s?h=i[(c+2)%s]:(oh.subVectors(i[s-1],i[s-2]).add(i[s-1]),h=oh),this.curveType==="centripetal"||this.curveType==="chordal"){const _=this.curveType==="chordal"?.5:.25;let p=Math.pow(a.distanceToSquared(u),_),g=Math.pow(u.distanceToSquared(f),_),d=Math.pow(f.distanceToSquared(h),_);g<1e-4&&(g=1),p<1e-4&&(p=g),d<1e-4&&(d=g),ca.initNonuniformCatmullRom(a.x,u.x,f.x,h.x,p,g,d),la.initNonuniformCatmullRom(a.y,u.y,f.y,h.y,p,g,d),ha.initNonuniformCatmullRom(a.z,u.z,f.z,h.z,p,g,d)}else this.curveType==="catmullrom"&&(ca.initCatmullRom(a.x,u.x,f.x,h.x,this.tension),la.initCatmullRom(a.y,u.y,f.y,h.y,this.tension),ha.initCatmullRom(a.z,u.z,f.z,h.z,this.tension));return n.set(ca.calc(l),la.calc(l),ha.calc(l)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const i=e.points[t];this.points.push(i.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){const i=this.points[t];e.points.push(i.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const i=e.points[t];this.points.push(new L().fromArray(i))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}}function ch(r,e,t,n,i){const s=(n-e)*.5,o=(i-t)*.5,c=r*r,l=r*c;return(2*t-2*n+s+o)*l+(-3*t+3*n-2*s-o)*c+s*r+t}function hp(r,e){const t=1-r;return t*t*e}function up(r,e){return 2*(1-r)*r*e}function fp(r,e){return r*r*e}function nr(r,e,t,n){return hp(r,e)+up(r,t)+fp(r,n)}function dp(r,e){const t=1-r;return t*t*t*e}function pp(r,e){const t=1-r;return 3*t*t*r*e}function mp(r,e){return 3*(1-r)*r*r*e}function gp(r,e){return r*r*r*e}function ir(r,e,t,n,i){return dp(r,e)+pp(r,t)+mp(r,n)+gp(r,i)}class Iu extends qn{constructor(e=new ee,t=new ee,n=new ee,i=new ee){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=n,this.v3=i}getPoint(e,t=new ee){const n=t,i=this.v0,s=this.v1,o=this.v2,c=this.v3;return n.set(ir(e,i.x,s.x,o.x,c.x),ir(e,i.y,s.y,o.y,c.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class _p extends qn{constructor(e=new L,t=new L,n=new L,i=new L){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=n,this.v3=i}getPoint(e,t=new L){const n=t,i=this.v0,s=this.v1,o=this.v2,c=this.v3;return n.set(ir(e,i.x,s.x,o.x,c.x),ir(e,i.y,s.y,o.y,c.y),ir(e,i.z,s.z,o.z,c.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class Nu extends qn{constructor(e=new ee,t=new ee){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new ee){const n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new ee){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class xp extends qn{constructor(e=new L,t=new L){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new L){const n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new L){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Uu extends qn{constructor(e=new ee,t=new ee,n=new ee){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new ee){const n=t,i=this.v0,s=this.v1,o=this.v2;return n.set(nr(e,i.x,s.x,o.x),nr(e,i.y,s.y,o.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Fu extends qn{constructor(e=new L,t=new L,n=new L){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new L){const n=t,i=this.v0,s=this.v1,o=this.v2;return n.set(nr(e,i.x,s.x,o.x),nr(e,i.y,s.y,o.y),nr(e,i.z,s.z,o.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Ou extends qn{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new ee){const n=t,i=this.points,s=(i.length-1)*e,o=Math.floor(s),c=s-o,l=i[o===0?o:o-1],a=i[o],h=i[o>i.length-2?i.length-1:o+1],u=i[o>i.length-3?i.length-1:o+2];return n.set(ch(c,l.x,a.x,h.x,u.x),ch(c,l.y,a.y,h.y,u.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const i=e.points[t];this.points.push(i.clone())}return this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){const i=this.points[t];e.points.push(i.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const i=e.points[t];this.points.push(new ee().fromArray(i))}return this}}var So=Object.freeze({__proto__:null,ArcCurve:lp,CatmullRomCurve3:ni,CubicBezierCurve:Iu,CubicBezierCurve3:_p,EllipseCurve:el,LineCurve:Nu,LineCurve3:xp,QuadraticBezierCurve:Uu,QuadraticBezierCurve3:Fu,SplineCurve:Ou});class vp extends qn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){const e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){const n=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new So[n](t,e))}return this}getPoint(e,t){const n=e*this.getLength(),i=this.getCurveLengths();let s=0;for(;s<i.length;){if(i[s]>=n){const o=i[s]-n,c=this.curves[s],l=c.getLength(),a=l===0?0:1-o/l;return c.getPointAt(a,t)}s++}return null}getLength(){const e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const e=[];let t=0;for(let n=0,i=this.curves.length;n<i;n++)t+=this.curves[n].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){const t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){const t=[];let n;for(let i=0,s=this.curves;i<s.length;i++){const o=s[i],c=o.isEllipseCurve?e*2:o.isLineCurve||o.isLineCurve3?1:o.isSplineCurve?e*o.points.length:e,l=o.getPoints(c);for(let a=0;a<l.length;a++){const h=l[a];n&&n.equals(h)||(t.push(h),n=h)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){const i=e.curves[t];this.curves.push(i.clone())}return this.autoClose=e.autoClose,this}toJSON(){const e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,n=this.curves.length;t<n;t++){const i=this.curves[t];e.curves.push(i.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){const i=e.curves[t];this.curves.push(new So[i.type]().fromJSON(i))}return this}}class lh extends vp{constructor(e){super(),this.type="Path",this.currentPoint=new ee,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,n=e.length;t<n;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){const n=new Nu(this.currentPoint.clone(),new ee(e,t));return this.curves.push(n),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,n,i){const s=new Uu(this.currentPoint.clone(),new ee(e,t),new ee(n,i));return this.curves.push(s),this.currentPoint.set(n,i),this}bezierCurveTo(e,t,n,i,s,o){const c=new Iu(this.currentPoint.clone(),new ee(e,t),new ee(n,i),new ee(s,o));return this.curves.push(c),this.currentPoint.set(s,o),this}splineThru(e){const t=[this.currentPoint.clone()].concat(e),n=new Ou(t);return this.curves.push(n),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,n,i,s,o){const c=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(e+c,t+l,n,i,s,o),this}absarc(e,t,n,i,s,o){return this.absellipse(e,t,n,n,i,s,o),this}ellipse(e,t,n,i,s,o,c,l){const a=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(e+a,t+h,n,i,s,o,c,l),this}absellipse(e,t,n,i,s,o,c,l){const a=new el(e,t,n,i,s,o,c,l);if(this.curves.length>0){const u=a.getPoint(0);u.equals(this.currentPoint)||this.lineTo(u.x,u.y)}this.curves.push(a);const h=a.getPoint(1);return this.currentPoint.copy(h),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){const e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}}class Fi extends lh{constructor(e){super(e),this.uuid=Sn(),this.type="Shape",this.holes=[]}getPointsHoles(e){const t=[];for(let n=0,i=this.holes.length;n<i;n++)t[n]=this.holes[n].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){const i=e.holes[t];this.holes.push(i.clone())}return this}toJSON(){const e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,n=this.holes.length;t<n;t++){const i=this.holes[t];e.holes.push(i.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){const i=e.holes[t];this.holes.push(new lh().fromJSON(i))}return this}}function yp(r,e,t=2){const n=e&&e.length,i=n?e[0]*t:r.length;let s=Bu(r,0,i,t,!0);const o=[];if(!s||s.next===s.prev)return o;let c,l,a;if(n&&(s=Tp(r,e,s,t)),r.length>80*t){c=r[0],l=r[1];let h=c,u=l;for(let f=t;f<i;f+=t){const _=r[f],p=r[f+1];_<c&&(c=_),p<l&&(l=p),_>h&&(h=_),p>u&&(u=p)}a=Math.max(h-c,u-l),a=a!==0?32767/a:0}return dr(s,o,t,c,l,a,0),o}function Bu(r,e,t,n,i){let s;if(i===Fp(r,e,t,n)>0)for(let o=e;o<t;o+=n)s=hh(o/n|0,r[o],r[o+1],s);else for(let o=t-n;o>=e;o-=n)s=hh(o/n|0,r[o],r[o+1],s);return s&&ys(s,s.next)&&(mr(s),s=s.next),s}function Gi(r,e){if(!r)return r;e||(e=r);let t=r,n;do if(n=!1,!t.steiner&&(ys(t,t.next)||At(t.prev,t,t.next)===0)){if(mr(t),t=e=t.prev,t===t.next)break;n=!0}else t=t.next;while(n||t!==e);return e}function dr(r,e,t,n,i,s,o){if(!r)return;!o&&s&&Pp(r,n,i,s);let c=r;for(;r.prev!==r.next;){const l=r.prev,a=r.next;if(s?Sp(r,n,i,s):Mp(r)){e.push(l.i,r.i,a.i),mr(r),r=a.next,c=a.next;continue}if(r=a,r===c){o?o===1?(r=bp(Gi(r),e),dr(r,e,t,n,i,s,2)):o===2&&wp(r,e,t,n,i,s):dr(Gi(r),e,t,n,i,s,1);break}}}function Mp(r){const e=r.prev,t=r,n=r.next;if(At(e,t,n)>=0)return!1;const i=e.x,s=t.x,o=n.x,c=e.y,l=t.y,a=n.y,h=Math.min(i,s,o),u=Math.min(c,l,a),f=Math.max(i,s,o),_=Math.max(c,l,a);let p=n.next;for(;p!==e;){if(p.x>=h&&p.x<=f&&p.y>=u&&p.y<=_&&Zs(i,c,s,l,o,a,p.x,p.y)&&At(p.prev,p,p.next)>=0)return!1;p=p.next}return!0}function Sp(r,e,t,n){const i=r.prev,s=r,o=r.next;if(At(i,s,o)>=0)return!1;const c=i.x,l=s.x,a=o.x,h=i.y,u=s.y,f=o.y,_=Math.min(c,l,a),p=Math.min(h,u,f),g=Math.max(c,l,a),d=Math.max(h,u,f),m=xc(_,p,e,t,n),x=xc(g,d,e,t,n);let v=r.prevZ,y=r.nextZ;for(;v&&v.z>=m&&y&&y.z<=x;){if(v.x>=_&&v.x<=g&&v.y>=p&&v.y<=d&&v!==i&&v!==o&&Zs(c,h,l,u,a,f,v.x,v.y)&&At(v.prev,v,v.next)>=0||(v=v.prevZ,y.x>=_&&y.x<=g&&y.y>=p&&y.y<=d&&y!==i&&y!==o&&Zs(c,h,l,u,a,f,y.x,y.y)&&At(y.prev,y,y.next)>=0))return!1;y=y.nextZ}for(;v&&v.z>=m;){if(v.x>=_&&v.x<=g&&v.y>=p&&v.y<=d&&v!==i&&v!==o&&Zs(c,h,l,u,a,f,v.x,v.y)&&At(v.prev,v,v.next)>=0)return!1;v=v.prevZ}for(;y&&y.z<=x;){if(y.x>=_&&y.x<=g&&y.y>=p&&y.y<=d&&y!==i&&y!==o&&Zs(c,h,l,u,a,f,y.x,y.y)&&At(y.prev,y,y.next)>=0)return!1;y=y.nextZ}return!0}function bp(r,e){let t=r;do{const n=t.prev,i=t.next.next;!ys(n,i)&&ku(n,t,t.next,i)&&pr(n,i)&&pr(i,n)&&(e.push(n.i,t.i,i.i),mr(t),mr(t.next),t=r=i),t=t.next}while(t!==r);return Gi(t)}function wp(r,e,t,n,i,s){let o=r;do{let c=o.next.next;for(;c!==o.prev;){if(o.i!==c.i&&Ip(o,c)){let l=Gu(o,c);o=Gi(o,o.next),l=Gi(l,l.next),dr(o,e,t,n,i,s,0),dr(l,e,t,n,i,s,0);return}c=c.next}o=o.next}while(o!==r)}function Tp(r,e,t,n){const i=[];for(let s=0,o=e.length;s<o;s++){const c=e[s]*n,l=s<o-1?e[s+1]*n:r.length,a=Bu(r,c,l,n,!1);a===a.next&&(a.steiner=!0),i.push(Dp(a))}i.sort(Ep);for(let s=0;s<i.length;s++)t=Ap(i[s],t);return t}function Ep(r,e){let t=r.x-e.x;if(t===0&&(t=r.y-e.y,t===0)){const n=(r.next.y-r.y)/(r.next.x-r.x),i=(e.next.y-e.y)/(e.next.x-e.x);t=n-i}return t}function Ap(r,e){const t=Rp(r,e);if(!t)return e;const n=Gu(t,r);return Gi(n,n.next),Gi(t,t.next)}function Rp(r,e){let t=e;const n=r.x,i=r.y;let s=-1/0,o;if(ys(r,t))return t;do{if(ys(r,t.next))return t.next;if(i<=t.y&&i>=t.next.y&&t.next.y!==t.y){const u=t.x+(i-t.y)*(t.next.x-t.x)/(t.next.y-t.y);if(u<=n&&u>s&&(s=u,o=t.x<t.next.x?t:t.next,u===n))return o}t=t.next}while(t!==e);if(!o)return null;const c=o,l=o.x,a=o.y;let h=1/0;t=o;do{if(n>=t.x&&t.x>=l&&n!==t.x&&zu(i<a?n:s,i,l,a,i<a?s:n,i,t.x,t.y)){const u=Math.abs(i-t.y)/(n-t.x);pr(t,r)&&(u<h||u===h&&(t.x>o.x||t.x===o.x&&Cp(o,t)))&&(o=t,h=u)}t=t.next}while(t!==c);return o}function Cp(r,e){return At(r.prev,r,e.prev)<0&&At(e.next,r,r.next)<0}function Pp(r,e,t,n){let i=r;do i.z===0&&(i.z=xc(i.x,i.y,e,t,n)),i.prevZ=i.prev,i.nextZ=i.next,i=i.next;while(i!==r);i.prevZ.nextZ=null,i.prevZ=null,Lp(i)}function Lp(r){let e,t=1;do{let n=r,i;r=null;let s=null;for(e=0;n;){e++;let o=n,c=0;for(let a=0;a<t&&(c++,o=o.nextZ,!!o);a++);let l=t;for(;c>0||l>0&&o;)c!==0&&(l===0||!o||n.z<=o.z)?(i=n,n=n.nextZ,c--):(i=o,o=o.nextZ,l--),s?s.nextZ=i:r=i,i.prevZ=s,s=i;n=o}s.nextZ=null,t*=2}while(e>1);return r}function xc(r,e,t,n,i){return r=(r-t)*i|0,e=(e-n)*i|0,r=(r|r<<8)&16711935,r=(r|r<<4)&252645135,r=(r|r<<2)&858993459,r=(r|r<<1)&1431655765,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,r|e<<1}function Dp(r){let e=r,t=r;do(e.x<t.x||e.x===t.x&&e.y<t.y)&&(t=e),e=e.next;while(e!==r);return t}function zu(r,e,t,n,i,s,o,c){return(i-o)*(e-c)>=(r-o)*(s-c)&&(r-o)*(n-c)>=(t-o)*(e-c)&&(t-o)*(s-c)>=(i-o)*(n-c)}function Zs(r,e,t,n,i,s,o,c){return!(r===o&&e===c)&&zu(r,e,t,n,i,s,o,c)}function Ip(r,e){return r.next.i!==e.i&&r.prev.i!==e.i&&!Np(r,e)&&(pr(r,e)&&pr(e,r)&&Up(r,e)&&(At(r.prev,r,e.prev)||At(r,e.prev,e))||ys(r,e)&&At(r.prev,r,r.next)>0&&At(e.prev,e,e.next)>0)}function At(r,e,t){return(e.y-r.y)*(t.x-e.x)-(e.x-r.x)*(t.y-e.y)}function ys(r,e){return r.x===e.x&&r.y===e.y}function ku(r,e,t,n){const i=Zr(At(r,e,t)),s=Zr(At(r,e,n)),o=Zr(At(t,n,r)),c=Zr(At(t,n,e));return!!(i!==s&&o!==c||i===0&&Jr(r,t,e)||s===0&&Jr(r,n,e)||o===0&&Jr(t,r,n)||c===0&&Jr(t,e,n))}function Jr(r,e,t){return e.x<=Math.max(r.x,t.x)&&e.x>=Math.min(r.x,t.x)&&e.y<=Math.max(r.y,t.y)&&e.y>=Math.min(r.y,t.y)}function Zr(r){return r>0?1:r<0?-1:0}function Np(r,e){let t=r;do{if(t.i!==r.i&&t.next.i!==r.i&&t.i!==e.i&&t.next.i!==e.i&&ku(t,t.next,r,e))return!0;t=t.next}while(t!==r);return!1}function pr(r,e){return At(r.prev,r,r.next)<0?At(r,e,r.next)>=0&&At(r,r.prev,e)>=0:At(r,e,r.prev)<0||At(r,r.next,e)<0}function Up(r,e){let t=r,n=!1;const i=(r.x+e.x)/2,s=(r.y+e.y)/2;do t.y>s!=t.next.y>s&&t.next.y!==t.y&&i<(t.next.x-t.x)*(s-t.y)/(t.next.y-t.y)+t.x&&(n=!n),t=t.next;while(t!==r);return n}function Gu(r,e){const t=vc(r.i,r.x,r.y),n=vc(e.i,e.x,e.y),i=r.next,s=e.prev;return r.next=e,e.prev=r,t.next=i,i.prev=t,n.next=t,t.prev=n,s.next=n,n.prev=s,n}function hh(r,e,t,n){const i=vc(r,e,t);return n?(i.next=n.next,i.prev=n,n.next.prev=i,n.next=i):(i.prev=i,i.next=i),i}function mr(r){r.next.prev=r.prev,r.prev.next=r.next,r.prevZ&&(r.prevZ.nextZ=r.nextZ),r.nextZ&&(r.nextZ.prevZ=r.prevZ)}function vc(r,e,t){return{i:r,x:e,y:t,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function Fp(r,e,t,n){let i=0;for(let s=e,o=t-n;s<t;s+=n)i+=(r[o]-r[s])*(r[s+1]+r[o+1]),o=s;return i}class Op{static triangulate(e,t,n=2){return yp(e,t,n)}}class ii{static area(e){const t=e.length;let n=0;for(let i=t-1,s=0;s<t;i=s++)n+=e[i].x*e[s].y-e[s].x*e[i].y;return n*.5}static isClockWise(e){return ii.area(e)<0}static triangulateShape(e,t){const n=[],i=[],s=[];uh(e),fh(n,e);let o=e.length;t.forEach(uh);for(let l=0;l<t.length;l++)i.push(o),o+=t[l].length,fh(n,t[l]);const c=Op.triangulate(n,i);for(let l=0;l<c.length;l+=3)s.push(c.slice(l,l+3));return s}}function uh(r){const e=r.length;e>2&&r[e-1].equals(r[0])&&r.pop()}function fh(r,e){for(let t=0;t<e.length;t++)r.push(e[t].x),r.push(e[t].y)}class gr extends Et{constructor(e=new Fi([new ee(.5,.5),new ee(-.5,.5),new ee(-.5,-.5),new ee(.5,-.5)]),t={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:e,options:t},e=Array.isArray(e)?e:[e];const n=this,i=[],s=[];for(let c=0,l=e.length;c<l;c++){const a=e[c];o(a)}this.setAttribute("position",new tt(i,3)),this.setAttribute("uv",new tt(s,2)),this.computeVertexNormals();function o(c){const l=[],a=t.curveSegments!==void 0?t.curveSegments:12,h=t.steps!==void 0?t.steps:1,u=t.depth!==void 0?t.depth:1;let f=t.bevelEnabled!==void 0?t.bevelEnabled:!0,_=t.bevelThickness!==void 0?t.bevelThickness:.2,p=t.bevelSize!==void 0?t.bevelSize:_-.1,g=t.bevelOffset!==void 0?t.bevelOffset:0,d=t.bevelSegments!==void 0?t.bevelSegments:3;const m=t.extrudePath,x=t.UVGenerator!==void 0?t.UVGenerator:Bp;let v,y=!1,b,S,w,M;if(m){v=m.getSpacedPoints(h),y=!0,f=!1;const Q=m.isCatmullRomCurve3?m.closed:!1;b=m.computeFrenetFrames(h,Q),S=new L,w=new L,M=new L}f||(d=0,_=0,p=0,g=0);const T=c.extractPoints(a);let R=T.shape;const P=T.holes;if(!ii.isClockWise(R)){R=R.reverse();for(let Q=0,oe=P.length;Q<oe;Q++){const te=P[Q];ii.isClockWise(te)&&(P[Q]=te.reverse())}}function U(Q){const te=10000000000000001e-36;let be=Q[0];for(let ge=1;ge<=Q.length;ge++){const Xe=ge%Q.length,I=Q[Xe],Je=I.x-be.x,Ie=I.y-be.y,qe=Je*Je+Ie*Ie,ae=Math.max(Math.abs(I.x),Math.abs(I.y),Math.abs(be.x),Math.abs(be.y)),dt=te*ae*ae;if(qe<=dt){Q.splice(Xe,1),ge--;continue}be=I}}U(R),P.forEach(U);const k=P.length,N=R;for(let Q=0;Q<k;Q++){const oe=P[Q];R=R.concat(oe)}function O(Q,oe,te){return oe||ke("ExtrudeGeometry: vec does not exist"),Q.clone().addScaledVector(oe,te)}const z=R.length;function j(Q,oe,te){let be,ge,Xe;const I=Q.x-oe.x,Je=Q.y-oe.y,Ie=te.x-Q.x,qe=te.y-Q.y,ae=I*I+Je*Je,dt=I*qe-Je*Ie;if(Math.abs(dt)>Number.EPSILON){const C=Math.sqrt(ae),E=Math.sqrt(Ie*Ie+qe*qe),V=oe.x-Je/C,K=oe.y+I/C,ne=te.x-qe/E,ce=te.y+Ie/E,fe=((ne-V)*qe-(ce-K)*Ie)/(I*qe-Je*Ie);be=V+I*fe-Q.x,ge=K+Je*fe-Q.y;const q=be*be+ge*ge;if(q<=2)return new ee(be,ge);Xe=Math.sqrt(q/2)}else{let C=!1;I>Number.EPSILON?Ie>Number.EPSILON&&(C=!0):I<-Number.EPSILON?Ie<-Number.EPSILON&&(C=!0):Math.sign(Je)===Math.sign(qe)&&(C=!0),C?(be=-Je,ge=I,Xe=Math.sqrt(ae)):(be=I,ge=Je,Xe=Math.sqrt(ae/2))}return new ee(be/Xe,ge/Xe)}const se=[];for(let Q=0,oe=N.length,te=oe-1,be=Q+1;Q<oe;Q++,te++,be++)te===oe&&(te=0),be===oe&&(be=0),se[Q]=j(N[Q],N[te],N[be]);const me=[];let Ee,De=se.concat();for(let Q=0,oe=k;Q<oe;Q++){const te=P[Q];Ee=[];for(let be=0,ge=te.length,Xe=ge-1,I=be+1;be<ge;be++,Xe++,I++)Xe===ge&&(Xe=0),I===ge&&(I=0),Ee[be]=j(te[be],te[Xe],te[I]);me.push(Ee),De=De.concat(Ee)}let nt;if(d===0)nt=ii.triangulateShape(N,P);else{const Q=[],oe=[];for(let te=0;te<d;te++){const be=te/d,ge=_*Math.cos(be*Math.PI/2),Xe=p*Math.sin(be*Math.PI/2)+g;for(let I=0,Je=N.length;I<Je;I++){const Ie=O(N[I],se[I],Xe);Fe(Ie.x,Ie.y,-ge),be===0&&Q.push(Ie)}for(let I=0,Je=k;I<Je;I++){const Ie=P[I];Ee=me[I];const qe=[];for(let ae=0,dt=Ie.length;ae<dt;ae++){const C=O(Ie[ae],Ee[ae],Xe);Fe(C.x,C.y,-ge),be===0&&qe.push(C)}be===0&&oe.push(qe)}}nt=ii.triangulateShape(Q,oe)}const lt=nt.length,je=p+g;for(let Q=0;Q<z;Q++){const oe=f?O(R[Q],De[Q],je):R[Q];y?(w.copy(b.normals[0]).multiplyScalar(oe.x),S.copy(b.binormals[0]).multiplyScalar(oe.y),M.copy(v[0]).add(w).add(S),Fe(M.x,M.y,M.z)):Fe(oe.x,oe.y,0)}for(let Q=1;Q<=h;Q++)for(let oe=0;oe<z;oe++){const te=f?O(R[oe],De[oe],je):R[oe];y?(w.copy(b.normals[Q]).multiplyScalar(te.x),S.copy(b.binormals[Q]).multiplyScalar(te.y),M.copy(v[Q]).add(w).add(S),Fe(M.x,M.y,M.z)):Fe(te.x,te.y,u/h*Q)}for(let Q=d-1;Q>=0;Q--){const oe=Q/d,te=_*Math.cos(oe*Math.PI/2),be=p*Math.sin(oe*Math.PI/2)+g;for(let ge=0,Xe=N.length;ge<Xe;ge++){const I=O(N[ge],se[ge],be);Fe(I.x,I.y,u+te)}for(let ge=0,Xe=P.length;ge<Xe;ge++){const I=P[ge];Ee=me[ge];for(let Je=0,Ie=I.length;Je<Ie;Je++){const qe=O(I[Je],Ee[Je],be);y?Fe(qe.x,qe.y+v[h-1].y,v[h-1].x+te):Fe(qe.x,qe.y,u+te)}}}Z(),ye();function Z(){const Q=i.length/3;if(f){let oe=0,te=z*oe;for(let be=0;be<lt;be++){const ge=nt[be];He(ge[2]+te,ge[1]+te,ge[0]+te)}oe=h+d*2,te=z*oe;for(let be=0;be<lt;be++){const ge=nt[be];He(ge[0]+te,ge[1]+te,ge[2]+te)}}else{for(let oe=0;oe<lt;oe++){const te=nt[oe];He(te[2],te[1],te[0])}for(let oe=0;oe<lt;oe++){const te=nt[oe];He(te[0]+z*h,te[1]+z*h,te[2]+z*h)}}n.addGroup(Q,i.length/3-Q,0)}function ye(){const Q=i.length/3;let oe=0;le(N,oe),oe+=N.length;for(let te=0,be=P.length;te<be;te++){const ge=P[te];le(ge,oe),oe+=ge.length}n.addGroup(Q,i.length/3-Q,1)}function le(Q,oe){let te=Q.length;for(;--te>=0;){const be=te;let ge=te-1;ge<0&&(ge=Q.length-1);for(let Xe=0,I=h+d*2;Xe<I;Xe++){const Je=z*Xe,Ie=z*(Xe+1),qe=oe+be+Je,ae=oe+ge+Je,dt=oe+ge+Ie,C=oe+be+Ie;Ge(qe,ae,dt,C)}}}function Fe(Q,oe,te){l.push(Q),l.push(oe),l.push(te)}function He(Q,oe,te){ht(Q),ht(oe),ht(te);const be=i.length/3,ge=x.generateTopUV(n,i,be-3,be-2,be-1);We(ge[0]),We(ge[1]),We(ge[2])}function Ge(Q,oe,te,be){ht(Q),ht(oe),ht(be),ht(oe),ht(te),ht(be);const ge=i.length/3,Xe=x.generateSideWallUV(n,i,ge-6,ge-3,ge-2,ge-1);We(Xe[0]),We(Xe[1]),We(Xe[3]),We(Xe[1]),We(Xe[2]),We(Xe[3])}function ht(Q){i.push(l[Q*3+0]),i.push(l[Q*3+1]),i.push(l[Q*3+2])}function We(Q){s.push(Q.x),s.push(Q.y)}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){const e=super.toJSON(),t=this.parameters.shapes,n=this.parameters.options;return zp(t,n,e)}static fromJSON(e,t){const n=[];for(let s=0,o=e.shapes.length;s<o;s++){const c=t[e.shapes[s]];n.push(c)}const i=e.options.extrudePath;return i!==void 0&&(e.options.extrudePath=new So[i.type]().fromJSON(i)),new gr(n,e.options)}}const Bp={generateTopUV:function(r,e,t,n,i){const s=e[t*3],o=e[t*3+1],c=e[n*3],l=e[n*3+1],a=e[i*3],h=e[i*3+1];return[new ee(s,o),new ee(c,l),new ee(a,h)]},generateSideWallUV:function(r,e,t,n,i,s){const o=e[t*3],c=e[t*3+1],l=e[t*3+2],a=e[n*3],h=e[n*3+1],u=e[n*3+2],f=e[i*3],_=e[i*3+1],p=e[i*3+2],g=e[s*3],d=e[s*3+1],m=e[s*3+2];return Math.abs(c-h)<Math.abs(o-a)?[new ee(o,1-l),new ee(a,1-u),new ee(f,1-p),new ee(g,1-m)]:[new ee(c,1-l),new ee(h,1-u),new ee(_,1-p),new ee(d,1-m)]}};function zp(r,e,t){if(t.shapes=[],Array.isArray(r))for(let n=0,i=r.length;n<i;n++){const s=r[n];t.shapes.push(s.uuid)}else t.shapes.push(r.uuid);return t.options=Object.assign({},e),e.extrudePath!==void 0&&(t.options.extrudePath=e.extrudePath.toJSON()),t}class Ti extends xr{constructor(e=1,t=0){const n=(1+Math.sqrt(5))/2,i=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],s=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(i,s,e,t),this.type="IcosahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new Ti(e.radius,e.detail)}}class Ye extends xr{constructor(e=1,t=0){const n=[1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],i=[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2];super(n,i,e,t),this.type="OctahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new Ye(e.radius,e.detail)}}class hn extends Et{constructor(e=1,t=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:i};const s=e/2,o=t/2,c=Math.floor(n),l=Math.floor(i),a=c+1,h=l+1,u=e/c,f=t/l,_=[],p=[],g=[],d=[];for(let m=0;m<h;m++){const x=m*f-o;for(let v=0;v<a;v++){const y=v*u-s;p.push(y,-x,0),g.push(0,0,1),d.push(v/c),d.push(1-m/l)}}for(let m=0;m<l;m++)for(let x=0;x<c;x++){const v=x+a*m,y=x+a*(m+1),b=x+1+a*(m+1),S=x+1+a*m;_.push(v,y,S),_.push(y,b,S)}this.setIndex(_),this.setAttribute("position",new tt(p,3)),this.setAttribute("normal",new tt(g,3)),this.setAttribute("uv",new tt(d,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new hn(e.width,e.height,e.widthSegments,e.heightSegments)}}class Vi extends Et{constructor(e=.5,t=1,n=32,i=1,s=0,o=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:n,phiSegments:i,thetaStart:s,thetaLength:o},n=Math.max(3,n),i=Math.max(1,i);const c=[],l=[],a=[],h=[];let u=e;const f=(t-e)/i,_=new L,p=new ee;for(let g=0;g<=i;g++){for(let d=0;d<=n;d++){const m=s+d/n*o;_.x=u*Math.cos(m),_.y=u*Math.sin(m),l.push(_.x,_.y,_.z),a.push(0,0,1),p.x=(_.x/t+1)/2,p.y=(_.y/t+1)/2,h.push(p.x,p.y)}u+=f}for(let g=0;g<i;g++){const d=g*(n+1);for(let m=0;m<n;m++){const x=m+d,v=x,y=x+n+1,b=x+n+2,S=x+1;c.push(v,y,S),c.push(y,b,S)}}this.setIndex(c),this.setAttribute("position",new tt(l,3)),this.setAttribute("normal",new tt(a,3)),this.setAttribute("uv",new tt(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Vi(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}}class bo extends Et{constructor(e=new Fi([new ee(0,.5),new ee(-.5,-.5),new ee(.5,-.5)]),t=12){super(),this.type="ShapeGeometry",this.parameters={shapes:e,curveSegments:t};const n=[],i=[],s=[],o=[];let c=0,l=0;if(Array.isArray(e)===!1)a(e);else for(let h=0;h<e.length;h++)a(e[h]),this.addGroup(c,l,h),c+=l,l=0;this.setIndex(n),this.setAttribute("position",new tt(i,3)),this.setAttribute("normal",new tt(s,3)),this.setAttribute("uv",new tt(o,2));function a(h){const u=i.length/3,f=h.extractPoints(t);let _=f.shape;const p=f.holes;ii.isClockWise(_)===!1&&(_=_.reverse());for(let d=0,m=p.length;d<m;d++){const x=p[d];ii.isClockWise(x)===!0&&(p[d]=x.reverse())}const g=ii.triangulateShape(_,p);for(let d=0,m=p.length;d<m;d++){const x=p[d];_=_.concat(x)}for(let d=0,m=_.length;d<m;d++){const x=_[d];i.push(x.x,x.y,0),s.push(0,0,1),o.push(x.x,x.y)}for(let d=0,m=g.length;d<m;d++){const x=g[d],v=x[0]+u,y=x[1]+u,b=x[2]+u;n.push(v,y,b),l+=3}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){const e=super.toJSON(),t=this.parameters.shapes;return kp(t,e)}static fromJSON(e,t){const n=[];for(let i=0,s=e.shapes.length;i<s;i++){const o=t[e.shapes[i]];n.push(o)}return new bo(n,e.curveSegments)}}function kp(r,e){if(e.shapes=[],Array.isArray(r))for(let t=0,n=r.length;t<n;t++){const i=r[t];e.shapes.push(i.uuid)}else e.shapes.push(r.uuid);return e}class re extends Et{constructor(e=1,t=32,n=16,i=0,s=Math.PI*2,o=0,c=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:i,phiLength:s,thetaStart:o,thetaLength:c},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));const l=Math.min(o+c,Math.PI);let a=0;const h=[],u=new L,f=new L,_=[],p=[],g=[],d=[];for(let m=0;m<=n;m++){const x=[],v=m/n;let y=0;m===0&&o===0?y=.5/t:m===n&&l===Math.PI&&(y=-.5/t);for(let b=0;b<=t;b++){const S=b/t;u.x=-e*Math.cos(i+S*s)*Math.sin(o+v*c),u.y=e*Math.cos(o+v*c),u.z=e*Math.sin(i+S*s)*Math.sin(o+v*c),p.push(u.x,u.y,u.z),f.copy(u).normalize(),g.push(f.x,f.y,f.z),d.push(S+y,1-v),x.push(a++)}h.push(x)}for(let m=0;m<n;m++)for(let x=0;x<t;x++){const v=h[m][x+1],y=h[m][x],b=h[m+1][x],S=h[m+1][x+1];(m!==0||o>0)&&_.push(v,y,S),(m!==n-1||l<Math.PI)&&_.push(y,b,S)}this.setIndex(_),this.setAttribute("position",new tt(p,3)),this.setAttribute("normal",new tt(g,3)),this.setAttribute("uv",new tt(d,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new re(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class Ve extends Et{constructor(e=1,t=.4,n=12,i=48,s=Math.PI*2,o=0,c=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:i,arc:s,thetaStart:o,thetaLength:c},n=Math.floor(n),i=Math.floor(i);const l=[],a=[],h=[],u=[],f=new L,_=new L,p=new L;for(let g=0;g<=n;g++){const d=o+g/n*c;for(let m=0;m<=i;m++){const x=m/i*s;_.x=(e+t*Math.cos(d))*Math.cos(x),_.y=(e+t*Math.cos(d))*Math.sin(x),_.z=t*Math.sin(d),a.push(_.x,_.y,_.z),f.x=e*Math.cos(x),f.y=e*Math.sin(x),p.subVectors(_,f).normalize(),h.push(p.x,p.y,p.z),u.push(m/i),u.push(g/n)}}for(let g=1;g<=n;g++)for(let d=1;d<=i;d++){const m=(i+1)*g+d-1,x=(i+1)*(g-1)+d-1,v=(i+1)*(g-1)+d,y=(i+1)*g+d;l.push(m,x,y),l.push(x,v,y)}this.setIndex(l),this.setAttribute("position",new tt(a,3)),this.setAttribute("normal",new tt(h,3)),this.setAttribute("uv",new tt(u,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ve(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}}class nl extends Et{constructor(e=1,t=.4,n=64,i=8,s=2,o=3){super(),this.type="TorusKnotGeometry",this.parameters={radius:e,tube:t,tubularSegments:n,radialSegments:i,p:s,q:o},n=Math.floor(n),i=Math.floor(i);const c=[],l=[],a=[],h=[],u=new L,f=new L,_=new L,p=new L,g=new L,d=new L,m=new L;for(let v=0;v<=n;++v){const y=v/n*s*Math.PI*2;x(y,s,o,e,_),x(y+.01,s,o,e,p),d.subVectors(p,_),m.addVectors(p,_),g.crossVectors(d,m),m.crossVectors(g,d),g.normalize(),m.normalize();for(let b=0;b<=i;++b){const S=b/i*Math.PI*2,w=-t*Math.cos(S),M=t*Math.sin(S);u.x=_.x+(w*m.x+M*g.x),u.y=_.y+(w*m.y+M*g.y),u.z=_.z+(w*m.z+M*g.z),l.push(u.x,u.y,u.z),f.subVectors(u,_).normalize(),a.push(f.x,f.y,f.z),h.push(v/n),h.push(b/i)}}for(let v=1;v<=n;v++)for(let y=1;y<=i;y++){const b=(i+1)*(v-1)+(y-1),S=(i+1)*v+(y-1),w=(i+1)*v+y,M=(i+1)*(v-1)+y;c.push(b,S,M),c.push(S,w,M)}this.setIndex(c),this.setAttribute("position",new tt(l,3)),this.setAttribute("normal",new tt(a,3)),this.setAttribute("uv",new tt(h,2));function x(v,y,b,S,w){const M=Math.cos(v),T=Math.sin(v),R=b/y*v,P=Math.cos(R);w.x=S*(2+P)*.5*M,w.y=S*(2+P)*T*.5,w.z=S*Math.sin(R)*.5}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new nl(e.radius,e.tube,e.tubularSegments,e.radialSegments,e.p,e.q)}}class kn extends Et{constructor(e=new Fu(new L(-1,-1,0),new L(-1,1,0),new L(1,1,0)),t=64,n=1,i=8,s=!1){super(),this.type="TubeGeometry",this.parameters={path:e,tubularSegments:t,radius:n,radialSegments:i,closed:s};const o=e.computeFrenetFrames(t,s);this.tangents=o.tangents,this.normals=o.normals,this.binormals=o.binormals;const c=new L,l=new L,a=new ee;let h=new L;const u=[],f=[],_=[],p=[];g(),this.setIndex(p),this.setAttribute("position",new tt(u,3)),this.setAttribute("normal",new tt(f,3)),this.setAttribute("uv",new tt(_,2));function g(){for(let v=0;v<t;v++)d(v);d(s===!1?t:0),x(),m()}function d(v){h=e.getPointAt(v/t,h);const y=o.normals[v],b=o.binormals[v];for(let S=0;S<=i;S++){const w=S/i*Math.PI*2,M=Math.sin(w),T=-Math.cos(w);l.x=T*y.x+M*b.x,l.y=T*y.y+M*b.y,l.z=T*y.z+M*b.z,l.normalize(),f.push(l.x,l.y,l.z),c.x=h.x+n*l.x,c.y=h.y+n*l.y,c.z=h.z+n*l.z,u.push(c.x,c.y,c.z)}}function m(){for(let v=1;v<=t;v++)for(let y=1;y<=i;y++){const b=(i+1)*(v-1)+(y-1),S=(i+1)*v+(y-1),w=(i+1)*v+y,M=(i+1)*(v-1)+y;p.push(b,S,M),p.push(S,w,M)}}function x(){for(let v=0;v<=t;v++)for(let y=0;y<=i;y++)a.x=v/t,a.y=y/i,_.push(a.x,a.y)}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){const e=super.toJSON();return e.path=this.parameters.path.toJSON(),e}static fromJSON(e){return new kn(new So[e.path.type]().fromJSON(e.path),e.tubularSegments,e.radius,e.radialSegments,e.closed)}}function Ms(r){const e={};for(const t in r){e[t]={};for(const n in r[t]){const i=r[t][n];if(dh(i))i.isRenderTargetTexture?(Ue("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=i.clone();else if(Array.isArray(i))if(dh(i[0])){const s=[];for(let o=0,c=i.length;o<c;o++)s[o]=i[o].clone();e[t][n]=s}else e[t][n]=i.slice();else e[t][n]=i}}return e}function en(r){const e={};for(let t=0;t<r.length;t++){const n=Ms(r[t]);for(const i in n)e[i]=n[i]}return e}function dh(r){return r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)}function Gp(r){const e=[];for(let t=0;t<r.length;t++)e.push(r[t].clone());return e}function Vu(r){const e=r.getRenderTarget();return e===null?r.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:at.workingColorSpace}const Ss={clone:Ms,merge:en};var Vp=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Hp=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Yt extends Rn{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Vp,this.fragmentShader=Hp,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Ms(e.uniforms),this.uniformsGroups=Gp(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const i in this.uniforms){const o=this.uniforms[i].value;o&&o.isTexture?t.uniforms[i]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[i]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[i]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[i]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[i]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[i]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[i]={type:"m4",value:o.toArray()}:t.uniforms[i]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}}class Hu extends Yt{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class _e extends Rn{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Se(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Se(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=dc,this.normalScale=new ee(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new li,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class dn extends _e{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new ee(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return ot(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new Se(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new Se(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new Se(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}}class Wp extends Rn{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=rd,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class Xp extends Rn{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}function $r(r,e){return!r||r.constructor===e?r:typeof e.BYTES_PER_ELEMENT=="number"?new e(r):Array.prototype.slice.call(r)}function qp(r){function e(i,s){return r[i]-r[s]}const t=r.length,n=new Array(t);for(let i=0;i!==t;++i)n[i]=i;return n.sort(e),n}function ph(r,e,t){const n=r.length,i=new r.constructor(n);for(let s=0,o=0;o!==n;++s){const c=t[s]*e;for(let l=0;l!==e;++l)i[o++]=r[c+l]}return i}function Wu(r,e,t,n){let i=1,s=r[0];for(;s!==void 0&&s[n]===void 0;)s=r[i++];if(s===void 0)return;let o=s[n];if(o!==void 0)if(Array.isArray(o))do o=s[n],o!==void 0&&(e.push(s.time),t.push(...o)),s=r[i++];while(s!==void 0);else if(o.toArray!==void 0)do o=s[n],o!==void 0&&(e.push(s.time),o.toArray(t,t.length)),s=r[i++];while(s!==void 0);else do o=s[n],o!==void 0&&(e.push(s.time),t.push(o)),s=r[i++];while(s!==void 0)}class As{constructor(e,t,n,i){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=i!==void 0?i:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){const t=this.parameterPositions;let n=this._cachedIndex,i=t[n],s=t[n-1];e:{t:{let o;n:{i:if(!(e<i)){for(let c=n+2;;){if(i===void 0){if(e<s)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===c)break;if(s=i,i=t[++n],e<i)break t}o=t.length;break n}if(!(e>=s)){const c=t[1];e<c&&(n=2,s=c);for(let l=n-2;;){if(s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===l)break;if(i=s,s=t[--n-1],e>=s)break t}o=n,n=0;break n}break e}for(;n<o;){const c=n+o>>>1;e<t[c]?o=c:n=c+1}if(i=t[n],s=t[n-1],s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,s,i)}return this.interpolate_(n,s,e,i)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){const t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,s=e*i;for(let o=0;o!==i;++o)t[o]=n[s+o];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}}class Yp extends As{constructor(e,t,n,i){super(e,t,n,i),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:us,endingEnd:us}}intervalChanged_(e,t,n){const i=this.parameterPositions;let s=e-2,o=e+1,c=i[s],l=i[o];if(c===void 0)switch(this.getSettings_().endingStart){case fs:s=e,c=2*t-n;break;case go:s=i.length-2,c=t+i[s]-i[s+1];break;default:s=e,c=n}if(l===void 0)switch(this.getSettings_().endingEnd){case fs:o=e,l=2*n-t;break;case go:o=1,l=n+i[1]-i[0];break;default:o=e-1,l=t}const a=(n-t)*.5,h=this.valueSize;this._weightPrev=a/(t-c),this._weightNext=a/(l-n),this._offsetPrev=s*h,this._offsetNext=o*h}interpolate_(e,t,n,i){const s=this.resultBuffer,o=this.sampleValues,c=this.valueSize,l=e*c,a=l-c,h=this._offsetPrev,u=this._offsetNext,f=this._weightPrev,_=this._weightNext,p=(n-t)/(i-t),g=p*p,d=g*p,m=-f*d+2*f*g-f*p,x=(1+f)*d+(-1.5-2*f)*g+(-.5+f)*p+1,v=(-1-_)*d+(1.5+_)*g+.5*p,y=_*d-_*g;for(let b=0;b!==c;++b)s[b]=m*o[h+b]+x*o[a+b]+v*o[l+b]+y*o[u+b];return s}}class Xu extends As{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){const s=this.resultBuffer,o=this.sampleValues,c=this.valueSize,l=e*c,a=l-c,h=(n-t)/(i-t),u=1-h;for(let f=0;f!==c;++f)s[f]=o[a+f]*u+o[l+f]*h;return s}}class Kp extends As{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e){return this.copySampleValue_(e-1)}}class jp extends As{interpolate_(e,t,n,i){const s=this.resultBuffer,o=this.sampleValues,c=this.valueSize,l=e*c,a=l-c,h=this.settings||this.DefaultSettings_,u=h.inTangents,f=h.outTangents;if(!u||!f){const g=(n-t)/(i-t),d=1-g;for(let m=0;m!==c;++m)s[m]=o[a+m]*d+o[l+m]*g;return s}const _=c*2,p=e-1;for(let g=0;g!==c;++g){const d=o[a+g],m=o[l+g],x=p*_+g*2,v=f[x],y=f[x+1],b=e*_+g*2,S=u[b],w=u[b+1];let M=(n-t)/(i-t),T,R,P,D,U;for(let k=0;k<8;k++){T=M*M,R=T*M,P=1-M,D=P*P,U=D*P;const O=U*t+3*D*M*v+3*P*T*S+R*i-n;if(Math.abs(O)<1e-10)break;const z=3*D*(v-t)+6*P*M*(S-v)+3*T*(i-S);if(Math.abs(z)<1e-10)break;M=M-O/z,M=Math.max(0,Math.min(1,M))}s[g]=U*d+3*D*M*y+3*P*T*w+R*m}return s}}class Cn{constructor(e,t,n,i){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=$r(t,this.TimeBufferType),this.values=$r(n,this.ValueBufferType),this.setInterpolation(i||this.DefaultInterpolation)}static toJSON(e){const t=e.constructor;let n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:$r(e.times,Array),values:$r(e.values,Array)};const i=e.getInterpolation();i!==e.DefaultInterpolation&&(n.interpolation=i)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new Kp(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new Xu(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new Yp(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodBezier(e){const t=new jp(this.times,this.values,this.getValueSize(),e);return this.settings&&(t.settings=this.settings),t}setInterpolation(e){let t;switch(e){case cr:t=this.InterpolantFactoryMethodDiscrete;break;case lr:t=this.InterpolantFactoryMethodLinear;break;case Uo:t=this.InterpolantFactoryMethodSmooth;break;case El:t=this.InterpolantFactoryMethodBezier;break}if(t===void 0){const n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return Ue("KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return cr;case this.InterpolantFactoryMethodLinear:return lr;case this.InterpolantFactoryMethodSmooth:return Uo;case this.InterpolantFactoryMethodBezier:return El}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){const t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]+=e}return this}scale(e){if(e!==1){const t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]*=e}return this}trim(e,t){const n=this.times,i=n.length;let s=0,o=i-1;for(;s!==i&&n[s]<e;)++s;for(;o!==-1&&n[o]>t;)--o;if(++o,s!==0||o!==i){s>=o&&(o=Math.max(o,1),s=o-1);const c=this.getValueSize();this.times=n.slice(s,o),this.values=this.values.slice(s*c,o*c)}return this}validate(){let e=!0;const t=this.getValueSize();t-Math.floor(t)!==0&&(ke("KeyframeTrack: Invalid value size in track.",this),e=!1);const n=this.times,i=this.values,s=n.length;s===0&&(ke("KeyframeTrack: Track is empty.",this),e=!1);let o=null;for(let c=0;c!==s;c++){const l=n[c];if(typeof l=="number"&&isNaN(l)){ke("KeyframeTrack: Time is not a valid number.",this,c,l),e=!1;break}if(o!==null&&o>l){ke("KeyframeTrack: Out of order keys.",this,c,l,o),e=!1;break}o=l}if(i!==void 0&&pd(i))for(let c=0,l=i.length;c!==l;++c){const a=i[c];if(isNaN(a)){ke("KeyframeTrack: Value is not a valid number.",this,c,a),e=!1;break}}return e}optimize(){const e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),i=this.getInterpolation()===Uo,s=e.length-1;let o=1;for(let c=1;c<s;++c){let l=!1;const a=e[c],h=e[c+1];if(a!==h&&(c!==1||a!==e[0]))if(i)l=!0;else{const u=c*n,f=u-n,_=u+n;for(let p=0;p!==n;++p){const g=t[u+p];if(g!==t[f+p]||g!==t[_+p]){l=!0;break}}}if(l){if(c!==o){e[o]=e[c];const u=c*n,f=o*n;for(let _=0;_!==n;++_)t[f+_]=t[u+_]}++o}}if(s>0){e[o]=e[s];for(let c=s*n,l=o*n,a=0;a!==n;++a)t[l+a]=t[c+a];++o}return o!==e.length?(this.times=e.slice(0,o),this.values=t.slice(0,o*n)):(this.times=e,this.values=t),this}clone(){const e=this.times.slice(),t=this.values.slice(),n=this.constructor,i=new n(this.name,e,t);return i.createInterpolant=this.createInterpolant,i}}Cn.prototype.ValueTypeName="";Cn.prototype.TimeBufferType=Float32Array;Cn.prototype.ValueBufferType=Float32Array;Cn.prototype.DefaultInterpolation=lr;class Rs extends Cn{constructor(e,t,n){super(e,t,n)}}Rs.prototype.ValueTypeName="bool";Rs.prototype.ValueBufferType=Array;Rs.prototype.DefaultInterpolation=cr;Rs.prototype.InterpolantFactoryMethodLinear=void 0;Rs.prototype.InterpolantFactoryMethodSmooth=void 0;class qu extends Cn{constructor(e,t,n,i){super(e,t,n,i)}}qu.prototype.ValueTypeName="color";class bs extends Cn{constructor(e,t,n,i){super(e,t,n,i)}}bs.prototype.ValueTypeName="number";class Jp extends As{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){const s=this.resultBuffer,o=this.sampleValues,c=this.valueSize,l=(n-t)/(i-t);let a=e*c;for(let h=a+c;a!==h;a+=4)rn.slerpFlat(s,0,o,a-c,o,a,l);return s}}class ws extends Cn{constructor(e,t,n,i){super(e,t,n,i)}InterpolantFactoryMethodLinear(e){return new Jp(this.times,this.values,this.getValueSize(),e)}}ws.prototype.ValueTypeName="quaternion";ws.prototype.InterpolantFactoryMethodSmooth=void 0;class Cs extends Cn{constructor(e,t,n){super(e,t,n)}}Cs.prototype.ValueTypeName="string";Cs.prototype.ValueBufferType=Array;Cs.prototype.DefaultInterpolation=cr;Cs.prototype.InterpolantFactoryMethodLinear=void 0;Cs.prototype.InterpolantFactoryMethodSmooth=void 0;class Ts extends Cn{constructor(e,t,n,i){super(e,t,n,i)}}Ts.prototype.ValueTypeName="vector";class yc{constructor(e="",t=-1,n=[],i=Hc){this.name=e,this.tracks=n,this.duration=t,this.blendMode=i,this.uuid=Sn(),this.userData={},this.duration<0&&this.resetDuration()}static parse(e){const t=[],n=e.tracks,i=1/(e.fps||1);for(let o=0,c=n.length;o!==c;++o)t.push($p(n[o]).scale(i));const s=new this(e.name,e.duration,t,e.blendMode);return s.uuid=e.uuid,s.userData=JSON.parse(e.userData||"{}"),s}static toJSON(e){const t=[],n=e.tracks,i={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode,userData:JSON.stringify(e.userData)};for(let s=0,o=n.length;s!==o;++s)t.push(Cn.toJSON(n[s]));return i}static CreateFromMorphTargetSequence(e,t,n,i){const s=t.length,o=[];for(let c=0;c<s;c++){let l=[],a=[];l.push((c+s-1)%s,c,(c+1)%s),a.push(0,1,0);const h=qp(l);l=ph(l,1,h),a=ph(a,1,h),!i&&l[0]===0&&(l.push(s),a.push(a[0])),o.push(new bs(".morphTargetInfluences["+t[c].name+"]",l,a).scale(1/n))}return new this(e,-1,o)}static findByName(e,t){let n=e;if(!Array.isArray(e)){const i=e;n=i.geometry&&i.geometry.animations||i.animations}for(let i=0;i<n.length;i++)if(n[i].name===t)return n[i];return null}static CreateClipsFromMorphTargetSequences(e,t,n){const i={},s=/^([\w-]*?)([\d]+)$/;for(let c=0,l=e.length;c<l;c++){const a=e[c],h=a.name.match(s);if(h&&h.length>1){const u=h[1];let f=i[u];f||(i[u]=f=[]),f.push(a)}}const o=[];for(const c in i)o.push(this.CreateFromMorphTargetSequence(c,i[c],t,n));return o}static parseAnimation(e,t){if(Ue("AnimationClip: parseAnimation() is deprecated and will be removed with r185"),!e)return ke("AnimationClip: No animation in JSONLoader data."),null;const n=function(u,f,_,p,g){if(_.length!==0){const d=[],m=[];Wu(_,d,m,p),d.length!==0&&g.push(new u(f,d,m))}},i=[],s=e.name||"default",o=e.fps||30,c=e.blendMode;let l=e.length||-1;const a=e.hierarchy||[];for(let u=0;u<a.length;u++){const f=a[u].keys;if(!(!f||f.length===0))if(f[0].morphTargets){const _={};let p;for(p=0;p<f.length;p++)if(f[p].morphTargets)for(let g=0;g<f[p].morphTargets.length;g++)_[f[p].morphTargets[g]]=-1;for(const g in _){const d=[],m=[];for(let x=0;x!==f[p].morphTargets.length;++x){const v=f[p];d.push(v.time),m.push(v.morphTarget===g?1:0)}i.push(new bs(".morphTargetInfluence["+g+"]",d,m))}l=_.length*o}else{const _=".bones["+t[u].name+"]";n(Ts,_+".position",f,"pos",i),n(ws,_+".quaternion",f,"rot",i),n(Ts,_+".scale",f,"scl",i)}}return i.length===0?null:new this(s,l,i,c)}resetDuration(){const e=this.tracks;let t=0;for(let n=0,i=e.length;n!==i;++n){const s=this.tracks[n];t=Math.max(t,s.times[s.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){const e=[];for(let n=0;n<this.tracks.length;n++)e.push(this.tracks[n].clone());const t=new this.constructor(this.name,this.duration,e,this.blendMode);return t.userData=JSON.parse(JSON.stringify(this.userData)),t}toJSON(){return this.constructor.toJSON(this)}}function Zp(r){switch(r.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return bs;case"vector":case"vector2":case"vector3":case"vector4":return Ts;case"color":return qu;case"quaternion":return ws;case"bool":case"boolean":return Rs;case"string":return Cs}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+r)}function $p(r){if(r.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");const e=Zp(r.type);if(r.times===void 0){const t=[],n=[];Wu(r.keys,t,n,"value"),r.times=t,r.values=n}return e.parse!==void 0?e.parse(r):new e(r.name,r.times,r.values,r.interpolation)}const si={enabled:!1,files:{},add:function(r,e){this.enabled!==!1&&(mh(r)||(this.files[r]=e))},get:function(r){if(this.enabled!==!1&&!mh(r))return this.files[r]},remove:function(r){delete this.files[r]},clear:function(){this.files={}}};function mh(r){try{const e=r.slice(r.indexOf(":")+1);return new URL(e).protocol==="blob:"}catch{return!1}}class Qp{constructor(e,t,n){const i=this;let s=!1,o=0,c=0,l;const a=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this._abortController=null,this.itemStart=function(h){c++,s===!1&&i.onStart!==void 0&&i.onStart(h,o,c),s=!0},this.itemEnd=function(h){o++,i.onProgress!==void 0&&i.onProgress(h,o,c),o===c&&(s=!1,i.onLoad!==void 0&&i.onLoad())},this.itemError=function(h){i.onError!==void 0&&i.onError(h)},this.resolveURL=function(h){return l?l(h):h},this.setURLModifier=function(h){return l=h,this},this.addHandler=function(h,u){return a.push(h,u),this},this.removeHandler=function(h){const u=a.indexOf(h);return u!==-1&&a.splice(u,2),this},this.getHandler=function(h){for(let u=0,f=a.length;u<f;u+=2){const _=a[u],p=a[u+1];if(_.global&&(_.lastIndex=0),_.test(h))return p}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}}const e0=new Qp;class Ps{constructor(e){this.manager=e!==void 0?e:e0,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(e,t){const n=this;return new Promise(function(i,s){n.load(e,i,t,s)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}}Ps.DEFAULT_MATERIAL_NAME="__DEFAULT";const ei={};class t0 extends Error{constructor(e,t){super(e),this.response=t}}class Yu extends Ps{constructor(e){super(e),this.mimeType="",this.responseType="",this._abortController=new AbortController}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const s=si.get(`file:${e}`);if(s!==void 0){this.manager.itemStart(e),setTimeout(()=>{t&&t(s),this.manager.itemEnd(e)},0);return}if(ei[e]!==void 0){ei[e].push({onLoad:t,onProgress:n,onError:i});return}ei[e]=[],ei[e].push({onLoad:t,onProgress:n,onError:i});const o=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin",signal:typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal}),c=this.mimeType,l=this.responseType;fetch(o).then(a=>{if(a.status===200||a.status===0){if(a.status===0&&Ue("FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||a.body===void 0||a.body.getReader===void 0)return a;const h=ei[e],u=a.body.getReader(),f=a.headers.get("X-File-Size")||a.headers.get("Content-Length"),_=f?parseInt(f):0,p=_!==0;let g=0;const d=new ReadableStream({start(m){x();function x(){u.read().then(({done:v,value:y})=>{if(v)m.close();else{g+=y.byteLength;const b=new ProgressEvent("progress",{lengthComputable:p,loaded:g,total:_});for(let S=0,w=h.length;S<w;S++){const M=h[S];M.onProgress&&M.onProgress(b)}m.enqueue(y),x()}},v=>{m.error(v)})}}});return new Response(d)}else throw new t0(`fetch for "${a.url}" responded with ${a.status}: ${a.statusText}`,a)}).then(a=>{switch(l){case"arraybuffer":return a.arrayBuffer();case"blob":return a.blob();case"document":return a.text().then(h=>new DOMParser().parseFromString(h,c));case"json":return a.json();default:if(c==="")return a.text();{const u=/charset="?([^;"\s]*)"?/i.exec(c),f=u&&u[1]?u[1].toLowerCase():void 0,_=new TextDecoder(f);return a.arrayBuffer().then(p=>_.decode(p))}}}).then(a=>{si.add(`file:${e}`,a);const h=ei[e];delete ei[e];for(let u=0,f=h.length;u<f;u++){const _=h[u];_.onLoad&&_.onLoad(a)}}).catch(a=>{const h=ei[e];if(h===void 0)throw this.manager.itemError(e),a;delete ei[e];for(let u=0,f=h.length;u<f;u++){const _=h[u];_.onError&&_.onError(a)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}}const as=new WeakMap;class n0 extends Ps{constructor(e){super(e)}load(e,t,n,i){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const s=this,o=si.get(`image:${e}`);if(o!==void 0){if(o.complete===!0)s.manager.itemStart(e),setTimeout(function(){t&&t(o),s.manager.itemEnd(e)},0);else{let u=as.get(o);u===void 0&&(u=[],as.set(o,u)),u.push({onLoad:t,onError:i})}return o}const c=ur("img");function l(){h(),t&&t(this);const u=as.get(this)||[];for(let f=0;f<u.length;f++){const _=u[f];_.onLoad&&_.onLoad(this)}as.delete(this),s.manager.itemEnd(e)}function a(u){h(),i&&i(u),si.remove(`image:${e}`);const f=as.get(this)||[];for(let _=0;_<f.length;_++){const p=f[_];p.onError&&p.onError(u)}as.delete(this),s.manager.itemError(e),s.manager.itemEnd(e)}function h(){c.removeEventListener("load",l,!1),c.removeEventListener("error",a,!1)}return c.addEventListener("load",l,!1),c.addEventListener("error",a,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(c.crossOrigin=this.crossOrigin),si.add(`image:${e}`,c),s.manager.itemStart(e),c.src=e,c}}class i0 extends Ps{constructor(e){super(e)}load(e,t,n,i){const s=new Ht,o=new n0(this.manager);return o.setCrossOrigin(this.crossOrigin),o.setPath(this.path),o.load(e,function(c){s.image=c,s.needsUpdate=!0,t!==void 0&&t(s)},n,i),s}}class vr extends bt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Se(e),this.intensity=t}dispose(){this.dispatchEvent({type:"dispose"})}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}}class s0 extends vr{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(bt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Se(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}toJSON(e){const t=super.toJSON(e);return t.object.groundColor=this.groundColor.getHex(),t}}const ua=new Ke,gh=new L,_h=new L;class il{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new ee(512,512),this.mapType=ln,this.map=null,this.mapPass=null,this.matrix=new Ke,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Zc,this._frameExtents=new ee(1,1),this._viewportCount=1,this._viewports=[new xt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,n=this.matrix;gh.setFromMatrixPosition(e.matrixWorld),t.position.copy(gh),_h.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(_h),t.updateMatrixWorld(),ua.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(ua,t.coordinateSystem,t.reversedDepth),t.coordinateSystem===hr||t.reversedDepth?n.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(ua)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}const Qr=new L,eo=new rn,Dn=new L;class Ku extends bt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Ke,this.projectionMatrix=new Ke,this.projectionMatrixInverse=new Ke,this.coordinateSystem=zn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(Qr,eo,Dn),Dn.x===1&&Dn.y===1&&Dn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Qr,eo,Dn.set(1,1,1)).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorld.decompose(Qr,eo,Dn),Dn.x===1&&Dn.y===1&&Dn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Qr,eo,Dn.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const vi=new L,xh=new ee,vh=new ee;class tn extends Ku{constructor(e=50,t=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=xs*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(er*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return xs*2*Math.atan(Math.tan(er*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){vi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(vi.x,vi.y).multiplyScalar(-e/vi.z),vi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(vi.x,vi.y).multiplyScalar(-e/vi.z)}getViewSize(e,t){return this.getViewBounds(e,xh,vh),t.subVectors(vh,xh)}setViewOffset(e,t,n,i,s,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(er*.5*this.fov)/this.zoom,n=2*t,i=this.aspect*n,s=-.5*i;const o=this.view;if(this.view!==null&&this.view.enabled){const l=o.fullWidth,a=o.fullHeight;s+=o.offsetX*i/l,t-=o.offsetY*n/a,i*=o.width/l,n*=o.height/a}const c=this.filmOffset;c!==0&&(s+=e*c/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+i,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}class r0 extends il{constructor(){super(new tn(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1,this.aspect=1}updateMatrices(e){const t=this.camera,n=xs*2*e.angle*this.focus,i=this.mapSize.width/this.mapSize.height*this.aspect,s=e.distance||t.far;(n!==t.fov||i!==t.aspect||s!==t.far)&&(t.fov=n,t.aspect=i,t.far=s,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this}}class sl extends vr{constructor(e,t,n=0,i=Math.PI/3,s=0,o=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(bt.DEFAULT_UP),this.updateMatrix(),this.target=new bt,this.distance=n,this.angle=i,this.penumbra=s,this.decay=o,this.map=null,this.shadow=new r0}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.map=e.map,this.shadow=e.shadow.clone(),this}toJSON(e){const t=super.toJSON(e);return t.object.distance=this.distance,t.object.angle=this.angle,t.object.decay=this.decay,t.object.penumbra=this.penumbra,t.object.target=this.target.uuid,this.map&&this.map.isTexture&&(t.object.map=this.map.toJSON(e).uuid),t.object.shadow=this.shadow.toJSON(),t}}class o0 extends il{constructor(){super(new tn(90,1,.5,500)),this.isPointLightShadow=!0}}class vn extends vr{constructor(e,t,n=0,i=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=i,this.shadow=new o0}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}toJSON(e){const t=super.toJSON(e);return t.object.distance=this.distance,t.object.decay=this.decay,t.object.shadow=this.shadow.toJSON(),t}}class yr extends Ku{constructor(e=-1,t=1,n=1,i=-1,s=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=i,this.near=s,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,i,s,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2;let s=n-e,o=n+e,c=i+t,l=i-t;if(this.view!==null&&this.view.enabled){const a=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=a*this.view.offsetX,o=s+a*this.view.width,c-=h*this.view.offsetY,l=c-h*this.view.height}this.projectionMatrix.makeOrthographic(s,o,c,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class a0 extends il{constructor(){super(new yr(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Mc extends vr{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(bt.DEFAULT_UP),this.updateMatrix(),this.target=new bt,this.shadow=new a0}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){const t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}}class c0 extends vr{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}}class sr{static extractUrlBase(e){const t=e.lastIndexOf("/");return t===-1?"./":e.slice(0,t+1)}static resolveURL(e,t){return typeof e!="string"||e===""?"":(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}}const fa=new WeakMap;class l0 extends Ps{constructor(e){super(e),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&Ue("ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&Ue("ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"},this._abortController=new AbortController}setOptions(e){return this.options=e,this}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const s=this,o=si.get(`image-bitmap:${e}`);if(o!==void 0){if(s.manager.itemStart(e),o.then){o.then(a=>{fa.has(o)===!0?(i&&i(fa.get(o)),s.manager.itemError(e),s.manager.itemEnd(e)):(t&&t(a),s.manager.itemEnd(e))});return}setTimeout(function(){t&&t(o),s.manager.itemEnd(e)},0);return}const c={};c.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",c.headers=this.requestHeader,c.signal=typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal;const l=fetch(e,c).then(function(a){return a.blob()}).then(function(a){return createImageBitmap(a,Object.assign(s.options,{colorSpaceConversion:"none"}))}).then(function(a){si.add(`image-bitmap:${e}`,a),t&&t(a),s.manager.itemEnd(e)}).catch(function(a){i&&i(a),fa.set(l,a),si.remove(`image-bitmap:${e}`),s.manager.itemError(e),s.manager.itemEnd(e)});si.add(`image-bitmap:${e}`,l),s.manager.itemStart(e)}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}}const cs=-90,ls=1;class h0 extends bt{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const i=new tn(cs,ls,e,t);i.layers=this.layers,this.add(i);const s=new tn(cs,ls,e,t);s.layers=this.layers,this.add(s);const o=new tn(cs,ls,e,t);o.layers=this.layers,this.add(o);const c=new tn(cs,ls,e,t);c.layers=this.layers,this.add(c);const l=new tn(cs,ls,e,t);l.layers=this.layers,this.add(l);const a=new tn(cs,ls,e,t);a.layers=this.layers,this.add(a)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,i,s,o,c,l]=t;for(const a of t)this.remove(a);if(e===zn)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),c.up.set(0,1,0),c.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===hr)n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),c.up.set(0,-1,0),c.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const a of t)this.add(a),a.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,o,c,l,a,h]=this.children,u=e.getRenderTarget(),f=e.getActiveCubeFace(),_=e.getActiveMipmapLevel(),p=e.xr.enabled;e.xr.enabled=!1;const g=n.texture.generateMipmaps;n.texture.generateMipmaps=!1;let d=!1;e.isWebGLRenderer===!0?d=e.state.buffers.depth.getReversed():d=e.reversedDepthBuffer,e.setRenderTarget(n,0,i),d&&e.autoClear===!1&&e.clearDepth(),e.render(t,s),e.setRenderTarget(n,1,i),d&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(n,2,i),d&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),e.setRenderTarget(n,3,i),d&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),e.setRenderTarget(n,4,i),d&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),n.texture.generateMipmaps=g,e.setRenderTarget(n,5,i),d&&e.autoClear===!1&&e.clearDepth(),e.render(t,h),e.setRenderTarget(u,f,_),e.xr.enabled=p,n.texture.needsPMREMUpdate=!0}}class u0 extends tn{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}let f0=class{constructor(){this._previousTime=0,this._currentTime=0,this._startTime=performance.now(),this._delta=0,this._elapsed=0,this._timescale=1,this._document=null,this._pageVisibilityHandler=null}connect(e){this._document=e,e.hidden!==void 0&&(this._pageVisibilityHandler=d0.bind(this),e.addEventListener("visibilitychange",this._pageVisibilityHandler,!1))}disconnect(){this._pageVisibilityHandler!==null&&(this._document.removeEventListener("visibilitychange",this._pageVisibilityHandler),this._pageVisibilityHandler=null),this._document=null}getDelta(){return this._delta/1e3}getElapsed(){return this._elapsed/1e3}getTimescale(){return this._timescale}setTimescale(e){return this._timescale=e,this}reset(){return this._currentTime=performance.now()-this._startTime,this}dispose(){this.disconnect()}update(e){return this._pageVisibilityHandler!==null&&this._document.hidden===!0?this._delta=0:(this._previousTime=this._currentTime,this._currentTime=(e!==void 0?e:performance.now())-this._startTime,this._delta=(this._currentTime-this._previousTime)*this._timescale,this._elapsed+=this._delta),this}};function d0(){this._document.hidden===!1&&this.reset()}class p0{constructor(e,t,n){this.binding=e,this.valueSize=n;let i,s,o;switch(t){case"quaternion":i=this._slerp,s=this._slerpAdditive,o=this._setAdditiveIdentityQuaternion,this.buffer=new Float64Array(n*6),this._workIndex=5;break;case"string":case"bool":i=this._select,s=this._select,o=this._setAdditiveIdentityOther,this.buffer=new Array(n*5);break;default:i=this._lerp,s=this._lerpAdditive,o=this._setAdditiveIdentityNumeric,this.buffer=new Float64Array(n*5)}this._mixBufferRegion=i,this._mixBufferRegionAdditive=s,this._setIdentity=o,this._origIndex=3,this._addIndex=4,this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,this.useCount=0,this.referenceCount=0}accumulate(e,t){const n=this.buffer,i=this.valueSize,s=e*i+i;let o=this.cumulativeWeight;if(o===0){for(let c=0;c!==i;++c)n[s+c]=n[c];o=t}else{o+=t;const c=t/o;this._mixBufferRegion(n,s,0,c,i)}this.cumulativeWeight=o}accumulateAdditive(e){const t=this.buffer,n=this.valueSize,i=n*this._addIndex;this.cumulativeWeightAdditive===0&&this._setIdentity(),this._mixBufferRegionAdditive(t,i,0,e,n),this.cumulativeWeightAdditive+=e}apply(e){const t=this.valueSize,n=this.buffer,i=e*t+t,s=this.cumulativeWeight,o=this.cumulativeWeightAdditive,c=this.binding;if(this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,s<1){const l=t*this._origIndex;this._mixBufferRegion(n,i,l,1-s,t)}o>0&&this._mixBufferRegionAdditive(n,i,this._addIndex*t,1,t);for(let l=t,a=t+t;l!==a;++l)if(n[l]!==n[l+t]){c.setValue(n,i);break}}saveOriginalState(){const e=this.binding,t=this.buffer,n=this.valueSize,i=n*this._origIndex;e.getValue(t,i);for(let s=n,o=i;s!==o;++s)t[s]=t[i+s%n];this._setIdentity(),this.cumulativeWeight=0,this.cumulativeWeightAdditive=0}restoreOriginalState(){const e=this.valueSize*3;this.binding.setValue(this.buffer,e)}_setAdditiveIdentityNumeric(){const e=this._addIndex*this.valueSize,t=e+this.valueSize;for(let n=e;n<t;n++)this.buffer[n]=0}_setAdditiveIdentityQuaternion(){this._setAdditiveIdentityNumeric(),this.buffer[this._addIndex*this.valueSize+3]=1}_setAdditiveIdentityOther(){const e=this._origIndex*this.valueSize,t=this._addIndex*this.valueSize;for(let n=0;n<this.valueSize;n++)this.buffer[t+n]=this.buffer[e+n]}_select(e,t,n,i,s){if(i>=.5)for(let o=0;o!==s;++o)e[t+o]=e[n+o]}_slerp(e,t,n,i){rn.slerpFlat(e,t,e,t,e,n,i)}_slerpAdditive(e,t,n,i,s){const o=this._workIndex*s;rn.multiplyQuaternionsFlat(e,o,e,t,e,n),rn.slerpFlat(e,t,e,t,e,o,i)}_lerp(e,t,n,i,s){const o=1-i;for(let c=0;c!==s;++c){const l=t+c;e[l]=e[l]*o+e[n+c]*i}}_lerpAdditive(e,t,n,i,s){for(let o=0;o!==s;++o){const c=t+o;e[c]=e[c]+e[n+o]*i}}}const rl="\\[\\]\\.:\\/",m0=new RegExp("["+rl+"]","g"),ol="[^"+rl+"]",g0="[^"+rl.replace("\\.","")+"]",_0=/((?:WC+[\/:])*)/.source.replace("WC",ol),x0=/(WCOD+)?/.source.replace("WCOD",g0),v0=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",ol),y0=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",ol),M0=new RegExp("^"+_0+x0+v0+y0+"$"),S0=["material","materials","bones","map"];class b0{constructor(e,t,n){const i=n||mt.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,i)}getValue(e,t){this.bind();const n=this._targetGroup.nCachedObjects_,i=this._bindings[n];i!==void 0&&i.getValue(e,t)}setValue(e,t){const n=this._bindings;for(let i=this._targetGroup.nCachedObjects_,s=n.length;i!==s;++i)n[i].setValue(e,t)}bind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}}class mt{constructor(e,t,n){this.path=t,this.parsedPath=n||mt.parseTrackName(t),this.node=mt.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new mt.Composite(e,t,n):new mt(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(m0,"")}static parseTrackName(e){const t=M0.exec(e);if(t===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);const n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},i=n.nodeName&&n.nodeName.lastIndexOf(".");if(i!==void 0&&i!==-1){const s=n.nodeName.substring(i+1);S0.indexOf(s)!==-1&&(n.nodeName=n.nodeName.substring(0,i),n.objectName=s)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){const n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){const n=function(s){for(let o=0;o<s.length;o++){const c=s[o];if(c.name===t||c.uuid===t)return c;const l=n(c.children);if(l)return l}return null},i=n(e.children);if(i)return i}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){const n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)e[t++]=n[i]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){const n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=e[t++]}_setValue_array_setNeedsUpdate(e,t){const n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){const n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node;const t=this.parsedPath,n=t.objectName,i=t.propertyName;let s=t.propertyIndex;if(e||(e=mt.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){Ue("PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let a=t.objectIndex;switch(n){case"materials":if(!e.material){ke("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){ke("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){ke("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let h=0;h<e.length;h++)if(e[h].name===a){a=h;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){ke("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){ke("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){ke("PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(a!==void 0){if(e[a]===void 0){ke("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[a]}}const o=e[i];if(o===void 0){const a=t.nodeName;ke("PropertyBinding: Trying to update property for track: "+a+"."+i+" but it wasn't found.",e);return}let c=this.Versioning.None;this.targetObject=e,e.isMaterial===!0?c=this.Versioning.NeedsUpdate:e.isObject3D===!0&&(c=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(s!==void 0){if(i==="morphTargetInfluences"){if(!e.geometry){ke("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){ke("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[s]!==void 0&&(s=e.morphTargetDictionary[s])}l=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=s}else o.fromArray!==void 0&&o.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(l=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=i;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][c]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}}mt.Composite=b0;mt.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};mt.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};mt.prototype.GetterByBindingType=[mt.prototype._getValue_direct,mt.prototype._getValue_array,mt.prototype._getValue_arrayElement,mt.prototype._getValue_toArray];mt.prototype.SetterByBindingTypeAndVersioning=[[mt.prototype._setValue_direct,mt.prototype._setValue_direct_setNeedsUpdate,mt.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[mt.prototype._setValue_array,mt.prototype._setValue_array_setNeedsUpdate,mt.prototype._setValue_array_setMatrixWorldNeedsUpdate],[mt.prototype._setValue_arrayElement,mt.prototype._setValue_arrayElement_setNeedsUpdate,mt.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[mt.prototype._setValue_fromArray,mt.prototype._setValue_fromArray_setNeedsUpdate,mt.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];class w0{constructor(e,t,n=null,i=t.blendMode){this._mixer=e,this._clip=t,this._localRoot=n,this.blendMode=i;const s=t.tracks,o=s.length,c=new Array(o),l={endingStart:us,endingEnd:us};for(let a=0;a!==o;++a){const h=s[a].createInterpolant(null);c[a]=h,h.settings&&Object.assign(l,h.settings),h.settings=l}this._interpolantSettings=l,this._interpolants=c,this._propertyBindings=new Array(o),this._cacheIndex=null,this._byClipCacheIndex=null,this._timeScaleInterpolant=null,this._weightInterpolant=null,this.loop=td,this._loopCount=-1,this._startTime=null,this.time=0,this.timeScale=1,this._effectiveTimeScale=1,this.weight=1,this._effectiveWeight=1,this.repetitions=1/0,this.paused=!1,this.enabled=!0,this.clampWhenFinished=!1,this.zeroSlopeAtStart=!0,this.zeroSlopeAtEnd=!0}play(){return this._mixer._activateAction(this),this}stop(){return this._mixer._deactivateAction(this),this.reset()}reset(){return this.paused=!1,this.enabled=!0,this.time=0,this._loopCount=-1,this._startTime=null,this.stopFading().stopWarping()}isRunning(){return this.enabled&&!this.paused&&this.timeScale!==0&&this._startTime===null&&this._mixer._isActiveAction(this)}isScheduled(){return this._mixer._isActiveAction(this)}startAt(e){return this._startTime=e,this}setLoop(e,t){return this.loop=e,this.repetitions=t,this}setEffectiveWeight(e){return this.weight=e,this._effectiveWeight=this.enabled?e:0,this.stopFading()}getEffectiveWeight(){return this._effectiveWeight}fadeIn(e){return this._scheduleFading(e,0,1)}fadeOut(e){return this._scheduleFading(e,1,0)}crossFadeFrom(e,t,n=!1){if(e.fadeOut(t),this.fadeIn(t),n===!0){const i=this._clip.duration,s=e._clip.duration,o=s/i,c=i/s;e.warp(1,o,t),this.warp(c,1,t)}return this}crossFadeTo(e,t,n=!1){return e.crossFadeFrom(this,t,n)}stopFading(){const e=this._weightInterpolant;return e!==null&&(this._weightInterpolant=null,this._mixer._takeBackControlInterpolant(e)),this}setEffectiveTimeScale(e){return this.timeScale=e,this._effectiveTimeScale=this.paused?0:e,this.stopWarping()}getEffectiveTimeScale(){return this._effectiveTimeScale}setDuration(e){return this.timeScale=this._clip.duration/e,this.stopWarping()}syncWith(e){return this.time=e.time,this.timeScale=e.timeScale,this.stopWarping()}halt(e){return this.warp(this._effectiveTimeScale,0,e)}warp(e,t,n){const i=this._mixer,s=i.time,o=this.timeScale;let c=this._timeScaleInterpolant;c===null&&(c=i._lendControlInterpolant(),this._timeScaleInterpolant=c);const l=c.parameterPositions,a=c.sampleValues;return l[0]=s,l[1]=s+n,a[0]=e/o,a[1]=t/o,this}stopWarping(){const e=this._timeScaleInterpolant;return e!==null&&(this._timeScaleInterpolant=null,this._mixer._takeBackControlInterpolant(e)),this}getMixer(){return this._mixer}getClip(){return this._clip}getRoot(){return this._localRoot||this._mixer._root}_update(e,t,n,i){if(!this.enabled){this._updateWeight(e);return}const s=this._startTime;if(s!==null){const l=(e-s)*n;l<0||n===0?t=0:(this._startTime=null,t=n*l)}t*=this._updateTimeScale(e);const o=this._updateTime(t),c=this._updateWeight(e);if(c>0){const l=this._interpolants,a=this._propertyBindings;switch(this.blendMode){case id:for(let h=0,u=l.length;h!==u;++h)l[h].evaluate(o),a[h].accumulateAdditive(c);break;case Hc:default:for(let h=0,u=l.length;h!==u;++h)l[h].evaluate(o),a[h].accumulate(i,c)}}}_updateWeight(e){let t=0;if(this.enabled){t=this.weight;const n=this._weightInterpolant;if(n!==null){const i=n.evaluate(e)[0];t*=i,e>n.parameterPositions[1]&&(this.stopFading(),i===0&&(this.enabled=!1))}}return this._effectiveWeight=t,t}_updateTimeScale(e){let t=0;if(!this.paused){t=this.timeScale;const n=this._timeScaleInterpolant;if(n!==null){const i=n.evaluate(e)[0];t*=i,e>n.parameterPositions[1]&&(this.stopWarping(),t===0?this.paused=!0:this.timeScale=t)}}return this._effectiveTimeScale=t,t}_updateTime(e){const t=this._clip.duration,n=this.loop;let i=this.time+e,s=this._loopCount;const o=n===nd;if(e===0)return s===-1?i:o&&(s&1)===1?t-i:i;if(n===xu){s===-1&&(this._loopCount=0,this._setEndings(!0,!0,!1));e:{if(i>=t)i=t;else if(i<0)i=0;else{this.time=i;break e}this.clampWhenFinished?this.paused=!0:this.enabled=!1,this.time=i,this._mixer.dispatchEvent({type:"finished",action:this,direction:e<0?-1:1})}}else{if(s===-1&&(e>=0?(s=0,this._setEndings(!0,this.repetitions===0,o)):this._setEndings(this.repetitions===0,!0,o)),i>=t||i<0){const c=Math.floor(i/t);i-=t*c,s+=Math.abs(c);const l=this.repetitions-s;if(l<=0)this.clampWhenFinished?this.paused=!0:this.enabled=!1,i=e>0?t:0,this.time=i,this._mixer.dispatchEvent({type:"finished",action:this,direction:e>0?1:-1});else{if(l===1){const a=e<0;this._setEndings(a,!a,o)}else this._setEndings(!1,!1,o);this._loopCount=s,this.time=i,this._mixer.dispatchEvent({type:"loop",action:this,loopDelta:c})}}else this._loopCount=s,this.time=i;if(o&&(s&1)===1)return t-i}return i}_setEndings(e,t,n){const i=this._interpolantSettings;n?(i.endingStart=fs,i.endingEnd=fs):(e?i.endingStart=this.zeroSlopeAtStart?fs:us:i.endingStart=go,t?i.endingEnd=this.zeroSlopeAtEnd?fs:us:i.endingEnd=go)}_scheduleFading(e,t,n){const i=this._mixer,s=i.time;let o=this._weightInterpolant;o===null&&(o=i._lendControlInterpolant(),this._weightInterpolant=o);const c=o.parameterPositions,l=o.sampleValues;return c[0]=s,l[0]=t,c[1]=s+e,l[1]=n,this}}const T0=new Float32Array(1);class E0 extends wi{constructor(e){super(),this._root=e,this._initMemoryManager(),this._accuIndex=0,this.time=0,this.timeScale=1,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}_bindAction(e,t){const n=e._localRoot||this._root,i=e._clip.tracks,s=i.length,o=e._propertyBindings,c=e._interpolants,l=n.uuid,a=this._bindingsByRootAndName;let h=a[l];h===void 0&&(h={},a[l]=h);for(let u=0;u!==s;++u){const f=i[u],_=f.name;let p=h[_];if(p!==void 0)++p.referenceCount,o[u]=p;else{if(p=o[u],p!==void 0){p._cacheIndex===null&&(++p.referenceCount,this._addInactiveBinding(p,l,_));continue}const g=t&&t._propertyBindings[u].binding.parsedPath;p=new p0(mt.create(n,_,g),f.ValueTypeName,f.getValueSize()),++p.referenceCount,this._addInactiveBinding(p,l,_),o[u]=p}c[u].resultBuffer=p.buffer}}_activateAction(e){if(!this._isActiveAction(e)){if(e._cacheIndex===null){const n=(e._localRoot||this._root).uuid,i=e._clip.uuid,s=this._actionsByClip[i];this._bindAction(e,s&&s.knownActions[0]),this._addInactiveAction(e,i,n)}const t=e._propertyBindings;for(let n=0,i=t.length;n!==i;++n){const s=t[n];s.useCount++===0&&(this._lendBinding(s),s.saveOriginalState())}this._lendAction(e)}}_deactivateAction(e){if(this._isActiveAction(e)){const t=e._propertyBindings;for(let n=0,i=t.length;n!==i;++n){const s=t[n];--s.useCount===0&&(s.restoreOriginalState(),this._takeBackBinding(s))}this._takeBackAction(e)}}_initMemoryManager(){this._actions=[],this._nActiveActions=0,this._actionsByClip={},this._bindings=[],this._nActiveBindings=0,this._bindingsByRootAndName={},this._controlInterpolants=[],this._nActiveControlInterpolants=0;const e=this;this.stats={actions:{get total(){return e._actions.length},get inUse(){return e._nActiveActions}},bindings:{get total(){return e._bindings.length},get inUse(){return e._nActiveBindings}},controlInterpolants:{get total(){return e._controlInterpolants.length},get inUse(){return e._nActiveControlInterpolants}}}}_isActiveAction(e){const t=e._cacheIndex;return t!==null&&t<this._nActiveActions}_addInactiveAction(e,t,n){const i=this._actions,s=this._actionsByClip;let o=s[t];if(o===void 0)o={knownActions:[e],actionByRoot:{}},e._byClipCacheIndex=0,s[t]=o;else{const c=o.knownActions;e._byClipCacheIndex=c.length,c.push(e)}e._cacheIndex=i.length,i.push(e),o.actionByRoot[n]=e}_removeInactiveAction(e){const t=this._actions,n=t[t.length-1],i=e._cacheIndex;n._cacheIndex=i,t[i]=n,t.pop(),e._cacheIndex=null;const s=e._clip.uuid,o=this._actionsByClip,c=o[s],l=c.knownActions,a=l[l.length-1],h=e._byClipCacheIndex;a._byClipCacheIndex=h,l[h]=a,l.pop(),e._byClipCacheIndex=null;const u=c.actionByRoot,f=(e._localRoot||this._root).uuid;delete u[f],l.length===0&&delete o[s],this._removeInactiveBindingsForAction(e)}_removeInactiveBindingsForAction(e){const t=e._propertyBindings;for(let n=0,i=t.length;n!==i;++n){const s=t[n];--s.referenceCount===0&&this._removeInactiveBinding(s)}}_lendAction(e){const t=this._actions,n=e._cacheIndex,i=this._nActiveActions++,s=t[i];e._cacheIndex=i,t[i]=e,s._cacheIndex=n,t[n]=s}_takeBackAction(e){const t=this._actions,n=e._cacheIndex,i=--this._nActiveActions,s=t[i];e._cacheIndex=i,t[i]=e,s._cacheIndex=n,t[n]=s}_addInactiveBinding(e,t,n){const i=this._bindingsByRootAndName,s=this._bindings;let o=i[t];o===void 0&&(o={},i[t]=o),o[n]=e,e._cacheIndex=s.length,s.push(e)}_removeInactiveBinding(e){const t=this._bindings,n=e.binding,i=n.rootNode.uuid,s=n.path,o=this._bindingsByRootAndName,c=o[i],l=t[t.length-1],a=e._cacheIndex;l._cacheIndex=a,t[a]=l,t.pop(),delete c[s],Object.keys(c).length===0&&delete o[i]}_lendBinding(e){const t=this._bindings,n=e._cacheIndex,i=this._nActiveBindings++,s=t[i];e._cacheIndex=i,t[i]=e,s._cacheIndex=n,t[n]=s}_takeBackBinding(e){const t=this._bindings,n=e._cacheIndex,i=--this._nActiveBindings,s=t[i];e._cacheIndex=i,t[i]=e,s._cacheIndex=n,t[n]=s}_lendControlInterpolant(){const e=this._controlInterpolants,t=this._nActiveControlInterpolants++;let n=e[t];return n===void 0&&(n=new Xu(new Float32Array(2),new Float32Array(2),1,T0),n.__cacheIndex=t,e[t]=n),n}_takeBackControlInterpolant(e){const t=this._controlInterpolants,n=e.__cacheIndex,i=--this._nActiveControlInterpolants,s=t[i];e.__cacheIndex=i,t[i]=e,s.__cacheIndex=n,t[n]=s}clipAction(e,t,n){const i=t||this._root,s=i.uuid;let o=typeof e=="string"?yc.findByName(i,e):e;const c=o!==null?o.uuid:e,l=this._actionsByClip[c];let a=null;if(n===void 0&&(o!==null?n=o.blendMode:n=Hc),l!==void 0){const u=l.actionByRoot[s];if(u!==void 0&&u.blendMode===n)return u;a=l.knownActions[0],o===null&&(o=a._clip)}if(o===null)return null;const h=new w0(this,o,t,n);return this._bindAction(h,a),this._addInactiveAction(h,c,s),h}existingAction(e,t){const n=t||this._root,i=n.uuid,s=typeof e=="string"?yc.findByName(n,e):e,o=s?s.uuid:e,c=this._actionsByClip[o];return c!==void 0&&c.actionByRoot[i]||null}stopAllAction(){const e=this._actions,t=this._nActiveActions;for(let n=t-1;n>=0;--n)e[n].stop();return this}update(e){e*=this.timeScale;const t=this._actions,n=this._nActiveActions,i=this.time+=e,s=Math.sign(e),o=this._accuIndex^=1;for(let a=0;a!==n;++a)t[a]._update(i,e,s,o);const c=this._bindings,l=this._nActiveBindings;for(let a=0;a!==l;++a)c[a].apply(o);return this}setTime(e){this.time=0;for(let t=0;t<this._actions.length;t++)this._actions[t].time=0;return this.update(e)}getRoot(){return this._root}uncacheClip(e){const t=this._actions,n=e.uuid,i=this._actionsByClip,s=i[n];if(s!==void 0){const o=s.knownActions;for(let c=0,l=o.length;c!==l;++c){const a=o[c];this._deactivateAction(a);const h=a._cacheIndex,u=t[t.length-1];a._cacheIndex=null,a._byClipCacheIndex=null,u._cacheIndex=h,t[h]=u,t.pop(),this._removeInactiveBindingsForAction(a)}delete i[n]}}uncacheRoot(e){const t=e.uuid,n=this._actionsByClip;for(const o in n){const c=n[o].actionByRoot,l=c[t];l!==void 0&&(this._deactivateAction(l),this._removeInactiveAction(l))}const i=this._bindingsByRootAndName,s=i[t];if(s!==void 0)for(const o in s){const c=s[o];c.restoreOriginalState(),this._removeInactiveBinding(c)}}uncacheAction(e,t){const n=this.existingAction(e,t);n!==null&&(this._deactivateAction(n),this._removeInactiveAction(n))}}const yh=new Ke;class A0{constructor(e,t,n=0,i=1/0){this.ray=new _r(e,t),this.near=n,this.far=i,this.camera=null,this.layers=new Kc,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):ke("Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return yh.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(yh),this}intersectObject(e,t=!0,n=[]){return Sc(e,this,n,t),n.sort(Mh),n}intersectObjects(e,t=!0,n=[]){for(let i=0,s=e.length;i<s;i++)Sc(e[i],this,n,t);return n.sort(Mh),n}}function Mh(r,e){return r.distance-e.distance}function Sc(r,e,t,n){let i=!0;if(r.layers.test(e.layers)&&r.raycast(e,t)===!1&&(i=!1),i===!0&&n===!0){const s=r.children;for(let o=0,c=s.length;o<c;o++)Sc(s[o],e,t,!0)}}const fl=class fl{constructor(e,t,n,i){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,n,i)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let n=0;n<4;n++)this.elements[n]=e[n+t];return this}set(e,t,n,i){const s=this.elements;return s[0]=e,s[2]=t,s[1]=n,s[3]=i,this}};fl.prototype.isMatrix2=!0;let Sh=fl;function bh(r,e,t,n){const i=R0(n);switch(t){case gu:return r*e;case zc:return r*e/i.components*i.byteLength;case kc:return r*e/i.components*i.byteLength;case zi:return r*e*2/i.components*i.byteLength;case Gc:return r*e*2/i.components*i.byteLength;case _u:return r*e*3/i.components*i.byteLength;case Mn:return r*e*4/i.components*i.byteLength;case Vc:return r*e*4/i.components*i.byteLength;case oo:case ao:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*8;case co:case lo:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*16;case Oa:case za:return Math.max(r,16)*Math.max(e,8)/4;case Fa:case Ba:return Math.max(r,8)*Math.max(e,8)/2;case ka:case Ga:case Ha:case Wa:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*8;case Va:case po:case Xa:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*16;case qa:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*16;case Ya:return Math.floor((r+4)/5)*Math.floor((e+3)/4)*16;case Ka:return Math.floor((r+4)/5)*Math.floor((e+4)/5)*16;case ja:return Math.floor((r+5)/6)*Math.floor((e+4)/5)*16;case Ja:return Math.floor((r+5)/6)*Math.floor((e+5)/6)*16;case Za:return Math.floor((r+7)/8)*Math.floor((e+4)/5)*16;case $a:return Math.floor((r+7)/8)*Math.floor((e+5)/6)*16;case Qa:return Math.floor((r+7)/8)*Math.floor((e+7)/8)*16;case ec:return Math.floor((r+9)/10)*Math.floor((e+4)/5)*16;case tc:return Math.floor((r+9)/10)*Math.floor((e+5)/6)*16;case nc:return Math.floor((r+9)/10)*Math.floor((e+7)/8)*16;case ic:return Math.floor((r+9)/10)*Math.floor((e+9)/10)*16;case sc:return Math.floor((r+11)/12)*Math.floor((e+9)/10)*16;case rc:return Math.floor((r+11)/12)*Math.floor((e+11)/12)*16;case oc:case ac:case cc:return Math.ceil(r/4)*Math.ceil(e/4)*16;case lc:case hc:return Math.ceil(r/4)*Math.ceil(e/4)*8;case mo:case uc:return Math.ceil(r/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function R0(r){switch(r){case ln:case fu:return{byteLength:1,components:1};case or:case du:case sn:return{byteLength:2,components:1};case Oc:case Bc:return{byteLength:2,components:4};case Hn:case Fc:case yn:return{byteLength:4,components:1};case pu:case mu:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${r}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Cc}}));typeof window<"u"&&(window.__THREE__?Ue("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Cc);/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function ju(){let r=null,e=!1,t=null,n=null;function i(s,o){t(s,o),n=r.requestAnimationFrame(i)}return{start:function(){e!==!0&&t!==null&&r!==null&&(n=r.requestAnimationFrame(i),e=!0)},stop:function(){r!==null&&r.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){r=s}}}function C0(r){const e=new WeakMap;function t(c,l){const a=c.array,h=c.usage,u=a.byteLength,f=r.createBuffer();r.bindBuffer(l,f),r.bufferData(l,a,h),c.onUploadCallback();let _;if(a instanceof Float32Array)_=r.FLOAT;else if(typeof Float16Array<"u"&&a instanceof Float16Array)_=r.HALF_FLOAT;else if(a instanceof Uint16Array)c.isFloat16BufferAttribute?_=r.HALF_FLOAT:_=r.UNSIGNED_SHORT;else if(a instanceof Int16Array)_=r.SHORT;else if(a instanceof Uint32Array)_=r.UNSIGNED_INT;else if(a instanceof Int32Array)_=r.INT;else if(a instanceof Int8Array)_=r.BYTE;else if(a instanceof Uint8Array)_=r.UNSIGNED_BYTE;else if(a instanceof Uint8ClampedArray)_=r.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+a);return{buffer:f,type:_,bytesPerElement:a.BYTES_PER_ELEMENT,version:c.version,size:u}}function n(c,l,a){const h=l.array,u=l.updateRanges;if(r.bindBuffer(a,c),u.length===0)r.bufferSubData(a,0,h);else{u.sort((_,p)=>_.start-p.start);let f=0;for(let _=1;_<u.length;_++){const p=u[f],g=u[_];g.start<=p.start+p.count+1?p.count=Math.max(p.count,g.start+g.count-p.start):(++f,u[f]=g)}u.length=f+1;for(let _=0,p=u.length;_<p;_++){const g=u[_];r.bufferSubData(a,g.start*h.BYTES_PER_ELEMENT,h,g.start,g.count)}l.clearUpdateRanges()}l.onUploadCallback()}function i(c){return c.isInterleavedBufferAttribute&&(c=c.data),e.get(c)}function s(c){c.isInterleavedBufferAttribute&&(c=c.data);const l=e.get(c);l&&(r.deleteBuffer(l.buffer),e.delete(c))}function o(c,l){if(c.isInterleavedBufferAttribute&&(c=c.data),c.isGLBufferAttribute){const h=e.get(c);(!h||h.version<c.version)&&e.set(c,{buffer:c.buffer,type:c.type,bytesPerElement:c.elementSize,version:c.version});return}const a=e.get(c);if(a===void 0)e.set(c,t(c,l));else if(a.version<c.version){if(a.size!==c.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(a.buffer,c,l),a.version=c.version}}return{get:i,remove:s,update:o}}var P0=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,L0=`#ifdef USE_ALPHAHASH
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
#endif`,D0=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,I0=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,N0=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,U0=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,F0=`#ifdef USE_AOMAP
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
#endif`,O0=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,B0=`#ifdef USE_BATCHING
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
#endif`,z0=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,k0=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,G0=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,V0=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,H0=`#ifdef USE_IRIDESCENCE
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
#endif`,W0=`#ifdef USE_BUMPMAP
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
#endif`,X0=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,q0=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Y0=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,K0=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,j0=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,J0=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,Z0=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,$0=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,Q0=`#define PI 3.141592653589793
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
} // validated`,em=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,tm=`vec3 transformedNormal = objectNormal;
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
#endif`,nm=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,im=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,sm=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,rm=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,om="gl_FragColor = linearToOutputTexel( gl_FragColor );",am=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,cm=`#ifdef USE_ENVMAP
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
#endif`,lm=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,hm=`#ifdef USE_ENVMAP
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
#endif`,um=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,fm=`#ifdef USE_ENVMAP
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
#endif`,dm=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,pm=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,mm=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,gm=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,_m=`#ifdef USE_GRADIENTMAP
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
}`,xm=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,vm=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,ym=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Mm=`uniform bool receiveShadow;
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
#include <lightprobes_pars_fragment>`,Sm=`#ifdef USE_ENVMAP
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
#endif`,bm=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,wm=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Tm=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Em=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Am=`PhysicalMaterial material;
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
#endif`,Rm=`uniform sampler2D dfgLUT;
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
}`,Cm=`
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
#endif`,Pm=`#if defined( RE_IndirectDiffuse )
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
#endif`,Lm=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Dm=`#ifdef USE_LIGHT_PROBES_GRID
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
#endif`,Im=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Nm=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Um=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Fm=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Om=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Bm=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,zm=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,km=`#if defined( USE_POINTS_UV )
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
#endif`,Gm=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Vm=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Hm=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Wm=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Xm=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,qm=`#ifdef USE_MORPHTARGETS
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
#endif`,Ym=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Km=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,jm=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,Jm=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Zm=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,$m=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Qm=`#ifdef USE_NORMALMAP
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
}`,Dg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Ig=`#ifdef ENVMAP_TYPE_CUBE
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
}`,e2=`#define STANDARD
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
}`,t2=`#define STANDARD
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
}`,n2=`#define TOON
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
}`,i2=`#define TOON
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
}`,s2=`uniform float size;
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
}`,r2=`uniform vec3 diffuse;
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
}`,o2=`#include <common>
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
}`,a2=`uniform vec3 color;
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
}`,c2=`uniform float rotation;
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
}`,l2=`uniform vec3 diffuse;
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
}`,st={alphahash_fragment:P0,alphahash_pars_fragment:L0,alphamap_fragment:D0,alphamap_pars_fragment:I0,alphatest_fragment:N0,alphatest_pars_fragment:U0,aomap_fragment:F0,aomap_pars_fragment:O0,batching_pars_vertex:B0,batching_vertex:z0,begin_vertex:k0,beginnormal_vertex:G0,bsdfs:V0,iridescence_fragment:H0,bumpmap_pars_fragment:W0,clipping_planes_fragment:X0,clipping_planes_pars_fragment:q0,clipping_planes_pars_vertex:Y0,clipping_planes_vertex:K0,color_fragment:j0,color_pars_fragment:J0,color_pars_vertex:Z0,color_vertex:$0,common:Q0,cube_uv_reflection_fragment:em,defaultnormal_vertex:tm,displacementmap_pars_vertex:nm,displacementmap_vertex:im,emissivemap_fragment:sm,emissivemap_pars_fragment:rm,colorspace_fragment:om,colorspace_pars_fragment:am,envmap_fragment:cm,envmap_common_pars_fragment:lm,envmap_pars_fragment:hm,envmap_pars_vertex:um,envmap_physical_pars_fragment:Sm,envmap_vertex:fm,fog_vertex:dm,fog_pars_vertex:pm,fog_fragment:mm,fog_pars_fragment:gm,gradientmap_pars_fragment:_m,lightmap_pars_fragment:xm,lights_lambert_fragment:vm,lights_lambert_pars_fragment:ym,lights_pars_begin:Mm,lights_toon_fragment:bm,lights_toon_pars_fragment:wm,lights_phong_fragment:Tm,lights_phong_pars_fragment:Em,lights_physical_fragment:Am,lights_physical_pars_fragment:Rm,lights_fragment_begin:Cm,lights_fragment_maps:Pm,lights_fragment_end:Lm,lightprobes_pars_fragment:Dm,logdepthbuf_fragment:Im,logdepthbuf_pars_fragment:Nm,logdepthbuf_pars_vertex:Um,logdepthbuf_vertex:Fm,map_fragment:Om,map_pars_fragment:Bm,map_particle_fragment:zm,map_particle_pars_fragment:km,metalnessmap_fragment:Gm,metalnessmap_pars_fragment:Vm,morphinstance_vertex:Hm,morphcolor_vertex:Wm,morphnormal_vertex:Xm,morphtarget_pars_vertex:qm,morphtarget_vertex:Ym,normal_fragment_begin:Km,normal_fragment_maps:jm,normal_pars_fragment:Jm,normal_pars_vertex:Zm,normal_vertex:$m,normalmap_pars_fragment:Qm,clearcoat_normal_fragment_begin:eg,clearcoat_normal_fragment_maps:tg,clearcoat_pars_fragment:ng,iridescence_pars_fragment:ig,opaque_fragment:sg,packing:rg,premultiplied_alpha_fragment:og,project_vertex:ag,dithering_fragment:cg,dithering_pars_fragment:lg,roughnessmap_fragment:hg,roughnessmap_pars_fragment:ug,shadowmap_pars_fragment:fg,shadowmap_pars_vertex:dg,shadowmap_vertex:pg,shadowmask_pars_fragment:mg,skinbase_vertex:gg,skinning_pars_vertex:_g,skinning_vertex:xg,skinnormal_vertex:vg,specularmap_fragment:yg,specularmap_pars_fragment:Mg,tonemapping_fragment:Sg,tonemapping_pars_fragment:bg,transmission_fragment:wg,transmission_pars_fragment:Tg,uv_pars_fragment:Eg,uv_pars_vertex:Ag,uv_vertex:Rg,worldpos_vertex:Cg,background_vert:Pg,background_frag:Lg,backgroundCube_vert:Dg,backgroundCube_frag:Ig,cube_vert:Ng,cube_frag:Ug,depth_vert:Fg,depth_frag:Og,distance_vert:Bg,distance_frag:zg,equirect_vert:kg,equirect_frag:Gg,linedashed_vert:Vg,linedashed_frag:Hg,meshbasic_vert:Wg,meshbasic_frag:Xg,meshlambert_vert:qg,meshlambert_frag:Yg,meshmatcap_vert:Kg,meshmatcap_frag:jg,meshnormal_vert:Jg,meshnormal_frag:Zg,meshphong_vert:$g,meshphong_frag:Qg,meshphysical_vert:e2,meshphysical_frag:t2,meshtoon_vert:n2,meshtoon_frag:i2,points_vert:s2,points_frag:r2,shadow_vert:o2,shadow_frag:a2,sprite_vert:c2,sprite_frag:l2},xe={common:{diffuse:{value:new Se(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new $e},alphaMap:{value:null},alphaMapTransform:{value:new $e},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new $e}},envmap:{envMap:{value:null},envMapRotation:{value:new $e},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new $e}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new $e}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new $e},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new $e},normalScale:{value:new ee(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new $e},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new $e}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new $e}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new $e}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Se(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new L},probesMax:{value:new L},probesResolution:{value:new L}},points:{diffuse:{value:new Se(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new $e},alphaTest:{value:0},uvTransform:{value:new $e}},sprite:{diffuse:{value:new Se(16777215)},opacity:{value:1},center:{value:new ee(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new $e},alphaMap:{value:null},alphaMapTransform:{value:new $e},alphaTest:{value:0}}},Un={basic:{uniforms:en([xe.common,xe.specularmap,xe.envmap,xe.aomap,xe.lightmap,xe.fog]),vertexShader:st.meshbasic_vert,fragmentShader:st.meshbasic_frag},lambert:{uniforms:en([xe.common,xe.specularmap,xe.envmap,xe.aomap,xe.lightmap,xe.emissivemap,xe.bumpmap,xe.normalmap,xe.displacementmap,xe.fog,xe.lights,{emissive:{value:new Se(0)},envMapIntensity:{value:1}}]),vertexShader:st.meshlambert_vert,fragmentShader:st.meshlambert_frag},phong:{uniforms:en([xe.common,xe.specularmap,xe.envmap,xe.aomap,xe.lightmap,xe.emissivemap,xe.bumpmap,xe.normalmap,xe.displacementmap,xe.fog,xe.lights,{emissive:{value:new Se(0)},specular:{value:new Se(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:st.meshphong_vert,fragmentShader:st.meshphong_frag},standard:{uniforms:en([xe.common,xe.envmap,xe.aomap,xe.lightmap,xe.emissivemap,xe.bumpmap,xe.normalmap,xe.displacementmap,xe.roughnessmap,xe.metalnessmap,xe.fog,xe.lights,{emissive:{value:new Se(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:st.meshphysical_vert,fragmentShader:st.meshphysical_frag},toon:{uniforms:en([xe.common,xe.aomap,xe.lightmap,xe.emissivemap,xe.bumpmap,xe.normalmap,xe.displacementmap,xe.gradientmap,xe.fog,xe.lights,{emissive:{value:new Se(0)}}]),vertexShader:st.meshtoon_vert,fragmentShader:st.meshtoon_frag},matcap:{uniforms:en([xe.common,xe.bumpmap,xe.normalmap,xe.displacementmap,xe.fog,{matcap:{value:null}}]),vertexShader:st.meshmatcap_vert,fragmentShader:st.meshmatcap_frag},points:{uniforms:en([xe.points,xe.fog]),vertexShader:st.points_vert,fragmentShader:st.points_frag},dashed:{uniforms:en([xe.common,xe.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:st.linedashed_vert,fragmentShader:st.linedashed_frag},depth:{uniforms:en([xe.common,xe.displacementmap]),vertexShader:st.depth_vert,fragmentShader:st.depth_frag},normal:{uniforms:en([xe.common,xe.bumpmap,xe.normalmap,xe.displacementmap,{opacity:{value:1}}]),vertexShader:st.meshnormal_vert,fragmentShader:st.meshnormal_frag},sprite:{uniforms:en([xe.sprite,xe.fog]),vertexShader:st.sprite_vert,fragmentShader:st.sprite_frag},background:{uniforms:{uvTransform:{value:new $e},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:st.background_vert,fragmentShader:st.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new $e}},vertexShader:st.backgroundCube_vert,fragmentShader:st.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:st.cube_vert,fragmentShader:st.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:st.equirect_vert,fragmentShader:st.equirect_frag},distance:{uniforms:en([xe.common,xe.displacementmap,{referencePosition:{value:new L},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:st.distance_vert,fragmentShader:st.distance_frag},shadow:{uniforms:en([xe.lights,xe.fog,{color:{value:new Se(0)},opacity:{value:1}}]),vertexShader:st.shadow_vert,fragmentShader:st.shadow_frag}};Un.physical={uniforms:en([Un.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new $e},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new $e},clearcoatNormalScale:{value:new ee(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new $e},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new $e},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new $e},sheen:{value:0},sheenColor:{value:new Se(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new $e},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new $e},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new $e},transmissionSamplerSize:{value:new ee},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new $e},attenuationDistance:{value:0},attenuationColor:{value:new Se(0)},specularColor:{value:new Se(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new $e},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new $e},anisotropyVector:{value:new ee},anisotropyMap:{value:null},anisotropyMapTransform:{value:new $e}}]),vertexShader:st.meshphysical_vert,fragmentShader:st.meshphysical_frag};const to={r:0,b:0,g:0},h2=new Ke,Ju=new $e;Ju.set(-1,0,0,0,1,0,0,0,1);function u2(r,e,t,n,i,s){const o=new Se(0);let c=i===!0?0:1,l,a,h=null,u=0,f=null;function _(x){let v=x.isScene===!0?x.background:null;if(v&&v.isTexture){const y=x.backgroundBlurriness>0;v=e.get(v,y)}return v}function p(x){let v=!1;const y=_(x);y===null?d(o,c):y&&y.isColor&&(d(y,1),v=!0);const b=r.xr.getEnvironmentBlendMode();b==="additive"?t.buffers.color.setClear(0,0,0,1,s):b==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,s),(r.autoClear||v)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),r.clear(r.autoClearColor,r.autoClearDepth,r.autoClearStencil))}function g(x,v){const y=_(v);y&&(y.isCubeTexture||y.mapping===Eo)?(a===void 0&&(a=new G(new ve(1,1,1),new Yt({name:"BackgroundCubeMaterial",uniforms:Ms(Un.backgroundCube.uniforms),vertexShader:Un.backgroundCube.vertexShader,fragmentShader:Un.backgroundCube.fragmentShader,side:Zt,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),a.geometry.deleteAttribute("normal"),a.geometry.deleteAttribute("uv"),a.onBeforeRender=function(b,S,w){this.matrixWorld.copyPosition(w.matrixWorld)},Object.defineProperty(a.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(a)),a.material.uniforms.envMap.value=y,a.material.uniforms.backgroundBlurriness.value=v.backgroundBlurriness,a.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,a.material.uniforms.backgroundRotation.value.setFromMatrix4(h2.makeRotationFromEuler(v.backgroundRotation)).transpose(),y.isCubeTexture&&y.isRenderTargetTexture===!1&&a.material.uniforms.backgroundRotation.value.premultiply(Ju),a.material.toneMapped=at.getTransfer(y.colorSpace)!==pt,(h!==y||u!==y.version||f!==r.toneMapping)&&(a.material.needsUpdate=!0,h=y,u=y.version,f=r.toneMapping),a.layers.enableAll(),x.unshift(a,a.geometry,a.material,0,0,null)):y&&y.isTexture&&(l===void 0&&(l=new G(new hn(2,2),new Yt({name:"BackgroundMaterial",uniforms:Ms(Un.background.uniforms),vertexShader:Un.background.vertexShader,fragmentShader:Un.background.fragmentShader,side:ai,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(l)),l.material.uniforms.t2D.value=y,l.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,l.material.toneMapped=at.getTransfer(y.colorSpace)!==pt,y.matrixAutoUpdate===!0&&y.updateMatrix(),l.material.uniforms.uvTransform.value.copy(y.matrix),(h!==y||u!==y.version||f!==r.toneMapping)&&(l.material.needsUpdate=!0,h=y,u=y.version,f=r.toneMapping),l.layers.enableAll(),x.unshift(l,l.geometry,l.material,0,0,null))}function d(x,v){x.getRGB(to,Vu(r)),t.buffers.color.setClear(to.r,to.g,to.b,v,s)}function m(){a!==void 0&&(a.geometry.dispose(),a.material.dispose(),a=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return o},setClearColor:function(x,v=1){o.set(x),c=v,d(o,c)},getClearAlpha:function(){return c},setClearAlpha:function(x){c=x,d(o,c)},render:p,addToRenderList:g,dispose:m}}function f2(r,e){const t=r.getParameter(r.MAX_VERTEX_ATTRIBS),n={},i=f(null);let s=i,o=!1;function c(P,D,U,k,N){let O=!1;const z=u(P,k,U,D);s!==z&&(s=z,a(s.object)),O=_(P,k,U,N),O&&p(P,k,U,N),N!==null&&e.update(N,r.ELEMENT_ARRAY_BUFFER),(O||o)&&(o=!1,y(P,D,U,k),N!==null&&r.bindBuffer(r.ELEMENT_ARRAY_BUFFER,e.get(N).buffer))}function l(){return r.createVertexArray()}function a(P){return r.bindVertexArray(P)}function h(P){return r.deleteVertexArray(P)}function u(P,D,U,k){const N=k.wireframe===!0;let O=n[D.id];O===void 0&&(O={},n[D.id]=O);const z=P.isInstancedMesh===!0?P.id:0;let j=O[z];j===void 0&&(j={},O[z]=j);let se=j[U.id];se===void 0&&(se={},j[U.id]=se);let me=se[N];return me===void 0&&(me=f(l()),se[N]=me),me}function f(P){const D=[],U=[],k=[];for(let N=0;N<t;N++)D[N]=0,U[N]=0,k[N]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:D,enabledAttributes:U,attributeDivisors:k,object:P,attributes:{},index:null}}function _(P,D,U,k){const N=s.attributes,O=D.attributes;let z=0;const j=U.getAttributes();for(const se in j)if(j[se].location>=0){const Ee=N[se];let De=O[se];if(De===void 0&&(se==="instanceMatrix"&&P.instanceMatrix&&(De=P.instanceMatrix),se==="instanceColor"&&P.instanceColor&&(De=P.instanceColor)),Ee===void 0||Ee.attribute!==De||De&&Ee.data!==De.data)return!0;z++}return s.attributesNum!==z||s.index!==k}function p(P,D,U,k){const N={},O=D.attributes;let z=0;const j=U.getAttributes();for(const se in j)if(j[se].location>=0){let Ee=O[se];Ee===void 0&&(se==="instanceMatrix"&&P.instanceMatrix&&(Ee=P.instanceMatrix),se==="instanceColor"&&P.instanceColor&&(Ee=P.instanceColor));const De={};De.attribute=Ee,Ee&&Ee.data&&(De.data=Ee.data),N[se]=De,z++}s.attributes=N,s.attributesNum=z,s.index=k}function g(){const P=s.newAttributes;for(let D=0,U=P.length;D<U;D++)P[D]=0}function d(P){m(P,0)}function m(P,D){const U=s.newAttributes,k=s.enabledAttributes,N=s.attributeDivisors;U[P]=1,k[P]===0&&(r.enableVertexAttribArray(P),k[P]=1),N[P]!==D&&(r.vertexAttribDivisor(P,D),N[P]=D)}function x(){const P=s.newAttributes,D=s.enabledAttributes;for(let U=0,k=D.length;U<k;U++)D[U]!==P[U]&&(r.disableVertexAttribArray(U),D[U]=0)}function v(P,D,U,k,N,O,z){z===!0?r.vertexAttribIPointer(P,D,U,N,O):r.vertexAttribPointer(P,D,U,k,N,O)}function y(P,D,U,k){g();const N=k.attributes,O=U.getAttributes(),z=D.defaultAttributeValues;for(const j in O){const se=O[j];if(se.location>=0){let me=N[j];if(me===void 0&&(j==="instanceMatrix"&&P.instanceMatrix&&(me=P.instanceMatrix),j==="instanceColor"&&P.instanceColor&&(me=P.instanceColor)),me!==void 0){const Ee=me.normalized,De=me.itemSize,nt=e.get(me);if(nt===void 0)continue;const lt=nt.buffer,je=nt.type,Z=nt.bytesPerElement,ye=je===r.INT||je===r.UNSIGNED_INT||me.gpuType===Fc;if(me.isInterleavedBufferAttribute){const le=me.data,Fe=le.stride,He=me.offset;if(le.isInstancedInterleavedBuffer){for(let Ge=0;Ge<se.locationSize;Ge++)m(se.location+Ge,le.meshPerAttribute);P.isInstancedMesh!==!0&&k._maxInstanceCount===void 0&&(k._maxInstanceCount=le.meshPerAttribute*le.count)}else for(let Ge=0;Ge<se.locationSize;Ge++)d(se.location+Ge);r.bindBuffer(r.ARRAY_BUFFER,lt);for(let Ge=0;Ge<se.locationSize;Ge++)v(se.location+Ge,De/se.locationSize,je,Ee,Fe*Z,(He+De/se.locationSize*Ge)*Z,ye)}else{if(me.isInstancedBufferAttribute){for(let le=0;le<se.locationSize;le++)m(se.location+le,me.meshPerAttribute);P.isInstancedMesh!==!0&&k._maxInstanceCount===void 0&&(k._maxInstanceCount=me.meshPerAttribute*me.count)}else for(let le=0;le<se.locationSize;le++)d(se.location+le);r.bindBuffer(r.ARRAY_BUFFER,lt);for(let le=0;le<se.locationSize;le++)v(se.location+le,De/se.locationSize,je,Ee,De*Z,De/se.locationSize*le*Z,ye)}}else if(z!==void 0){const Ee=z[j];if(Ee!==void 0)switch(Ee.length){case 2:r.vertexAttrib2fv(se.location,Ee);break;case 3:r.vertexAttrib3fv(se.location,Ee);break;case 4:r.vertexAttrib4fv(se.location,Ee);break;default:r.vertexAttrib1fv(se.location,Ee)}}}}x()}function b(){T();for(const P in n){const D=n[P];for(const U in D){const k=D[U];for(const N in k){const O=k[N];for(const z in O)h(O[z].object),delete O[z];delete k[N]}}delete n[P]}}function S(P){if(n[P.id]===void 0)return;const D=n[P.id];for(const U in D){const k=D[U];for(const N in k){const O=k[N];for(const z in O)h(O[z].object),delete O[z];delete k[N]}}delete n[P.id]}function w(P){for(const D in n){const U=n[D];for(const k in U){const N=U[k];if(N[P.id]===void 0)continue;const O=N[P.id];for(const z in O)h(O[z].object),delete O[z];delete N[P.id]}}}function M(P){for(const D in n){const U=n[D],k=P.isInstancedMesh===!0?P.id:0,N=U[k];if(N!==void 0){for(const O in N){const z=N[O];for(const j in z)h(z[j].object),delete z[j];delete N[O]}delete U[k],Object.keys(U).length===0&&delete n[D]}}}function T(){R(),o=!0,s!==i&&(s=i,a(s.object))}function R(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:c,reset:T,resetDefaultState:R,dispose:b,releaseStatesOfGeometry:S,releaseStatesOfObject:M,releaseStatesOfProgram:w,initAttributes:g,enableAttribute:d,disableUnusedAttributes:x}}function d2(r,e,t){let n;function i(l){n=l}function s(l,a){r.drawArrays(n,l,a),t.update(a,n,1)}function o(l,a,h){h!==0&&(r.drawArraysInstanced(n,l,a,h),t.update(a,n,h))}function c(l,a,h){if(h===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,a,0,h);let f=0;for(let _=0;_<h;_++)f+=a[_];t.update(f,n,1)}this.setMode=i,this.render=s,this.renderInstances=o,this.renderMultiDraw=c}function p2(r,e,t,n){let i;function s(){if(i!==void 0)return i;if(e.has("EXT_texture_filter_anisotropic")===!0){const w=e.get("EXT_texture_filter_anisotropic");i=r.getParameter(w.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function o(w){return!(w!==Mn&&n.convert(w)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_FORMAT))}function c(w){const M=w===sn&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(w!==ln&&n.convert(w)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_TYPE)&&w!==yn&&!M)}function l(w){if(w==="highp"){if(r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.HIGH_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.HIGH_FLOAT).precision>0)return"highp";w="mediump"}return w==="mediump"&&r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.MEDIUM_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let a=t.precision!==void 0?t.precision:"highp";const h=l(a);h!==a&&(Ue("WebGLRenderer:",a,"not supported, using",h,"instead."),a=h);const u=t.logarithmicDepthBuffer===!0,f=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control");t.reversedDepthBuffer===!0&&f===!1&&Ue("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");const _=r.getParameter(r.MAX_TEXTURE_IMAGE_UNITS),p=r.getParameter(r.MAX_VERTEX_TEXTURE_IMAGE_UNITS),g=r.getParameter(r.MAX_TEXTURE_SIZE),d=r.getParameter(r.MAX_CUBE_MAP_TEXTURE_SIZE),m=r.getParameter(r.MAX_VERTEX_ATTRIBS),x=r.getParameter(r.MAX_VERTEX_UNIFORM_VECTORS),v=r.getParameter(r.MAX_VARYING_VECTORS),y=r.getParameter(r.MAX_FRAGMENT_UNIFORM_VECTORS),b=r.getParameter(r.MAX_SAMPLES),S=r.getParameter(r.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:c,precision:a,logarithmicDepthBuffer:u,reversedDepthBuffer:f,maxTextures:_,maxVertexTextures:p,maxTextureSize:g,maxCubemapSize:d,maxAttributes:m,maxVertexUniforms:x,maxVaryings:v,maxFragmentUniforms:y,maxSamples:b,samples:S}}function m2(r){const e=this;let t=null,n=0,i=!1,s=!1;const o=new Mi,c=new $e,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(u,f){const _=u.length!==0||f||n!==0||i;return i=f,n=u.length,_},this.beginShadows=function(){s=!0,h(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(u,f){t=h(u,f,0)},this.setState=function(u,f,_){const p=u.clippingPlanes,g=u.clipIntersection,d=u.clipShadows,m=r.get(u);if(!i||p===null||p.length===0||s&&!d)s?h(null):a();else{const x=s?0:n,v=x*4;let y=m.clippingState||null;l.value=y,y=h(p,f,v,_);for(let b=0;b!==v;++b)y[b]=t[b];m.clippingState=y,this.numIntersection=g?this.numPlanes:0,this.numPlanes+=x}};function a(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function h(u,f,_,p){const g=u!==null?u.length:0;let d=null;if(g!==0){if(d=l.value,p!==!0||d===null){const m=_+g*4,x=f.matrixWorldInverse;c.getNormalMatrix(x),(d===null||d.length<m)&&(d=new Float32Array(m));for(let v=0,y=_;v!==g;++v,y+=4)o.copy(u[v]).applyMatrix4(x,c),o.normal.toArray(d,y),d[y+3]=o.constant}l.value=d,l.needsUpdate=!0}return e.numPlanes=g,e.numIntersection=0,d}}const bi=4,wh=[.125,.215,.35,.446,.526,.582],Ni=20,g2=256,Xs=new yr,Th=new Se;let da=null,pa=0,ma=0,ga=!1;const _2=new L;class Eh{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,n=.1,i=100,s={}){const{size:o=256,position:c=_2}=s;da=this._renderer.getRenderTarget(),pa=this._renderer.getActiveCubeFace(),ma=this._renderer.getActiveMipmapLevel(),ga=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(o);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,n,i,l,c),t>0&&this._blur(l,0,0,t),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Ch(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Rh(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(da,pa,ma),this._renderer.xr.enabled=ga,e.scissorTest=!1,hs(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Oi||e.mapping===_s?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),da=this._renderer.getRenderTarget(),pa=this._renderer.getActiveCubeFace(),ma=this._renderer.getActiveMipmapLevel(),ga=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:Vt,minFilter:Vt,generateMipmaps:!1,type:sn,format:Mn,colorSpace:un,depthBuffer:!1},i=Ah(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Ah(e,t,n);const{_lodMax:s}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=x2(s)),this._blurMaterial=y2(s,e,t),this._ggxMaterial=v2(s,e,t)}return i}_compileMaterial(e){const t=new G(new Et,e);this._renderer.compile(t,Xs)}_sceneToCubeUV(e,t,n,i,s){const l=new tn(90,1,t,n),a=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],u=this._renderer,f=u.autoClear,_=u.toneMapping;u.getClearColor(Th),u.toneMapping=Vn,u.autoClear=!1,u.state.buffers.depth.getReversed()&&(u.setRenderTarget(i),u.clearDepth(),u.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new G(new ve,new Ot({name:"PMREM.Background",side:Zt,depthWrite:!1,depthTest:!1})));const g=this._backgroundBox,d=g.material;let m=!1;const x=e.background;x?x.isColor&&(d.color.copy(x),e.background=null,m=!0):(d.color.copy(Th),m=!0);for(let v=0;v<6;v++){const y=v%3;y===0?(l.up.set(0,a[v],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x+h[v],s.y,s.z)):y===1?(l.up.set(0,0,a[v]),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y+h[v],s.z)):(l.up.set(0,a[v],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y,s.z+h[v]));const b=this._cubeSize;hs(i,y*b,v>2?b:0,b,b),u.setRenderTarget(i),m&&u.render(g,l),u.render(e,l)}u.toneMapping=_,u.autoClear=f,e.background=x}_textureToCubeUV(e,t){const n=this._renderer,i=e.mapping===Oi||e.mapping===_s;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=Ch()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Rh());const s=i?this._cubemapMaterial:this._equirectMaterial,o=this._lodMeshes[0];o.material=s;const c=s.uniforms;c.envMap.value=e;const l=this._cubeSize;hs(t,0,0,3*l,2*l),n.setRenderTarget(t),n.render(o,Xs)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;const i=this._lodMeshes.length;for(let s=1;s<i;s++)this._applyGGXFilter(e,s-1,s);t.autoClear=n}_applyGGXFilter(e,t,n){const i=this._renderer,s=this._pingPongRenderTarget,o=this._ggxMaterial,c=this._lodMeshes[n];c.material=o;const l=o.uniforms,a=n/(this._lodMeshes.length-1),h=t/(this._lodMeshes.length-1),u=Math.sqrt(a*a-h*h),f=0+a*1.25,_=u*f,{_lodMax:p}=this,g=this._sizeLods[n],d=3*g*(n>p-bi?n-p+bi:0),m=4*(this._cubeSize-g);l.envMap.value=e.texture,l.roughness.value=_,l.mipInt.value=p-t,hs(s,d,m,3*g,2*g),i.setRenderTarget(s),i.render(c,Xs),l.envMap.value=s.texture,l.roughness.value=0,l.mipInt.value=p-n,hs(e,d,m,3*g,2*g),i.setRenderTarget(e),i.render(c,Xs)}_blur(e,t,n,i,s){const o=this._pingPongRenderTarget;this._halfBlur(e,o,t,n,i,"latitudinal",s),this._halfBlur(o,e,n,n,i,"longitudinal",s)}_halfBlur(e,t,n,i,s,o,c){const l=this._renderer,a=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&ke("blur direction must be either latitudinal or longitudinal!");const h=3,u=this._lodMeshes[i];u.material=a;const f=a.uniforms,_=this._sizeLods[n]-1,p=isFinite(s)?Math.PI/(2*_):2*Math.PI/(2*Ni-1),g=s/p,d=isFinite(s)?1+Math.floor(h*g):Ni;d>Ni&&Ue(`sigmaRadians, ${s}, is too large and will clip, as it requested ${d} samples when the maximum is set to ${Ni}`);const m=[];let x=0;for(let w=0;w<Ni;++w){const M=w/g,T=Math.exp(-M*M/2);m.push(T),w===0?x+=T:w<d&&(x+=2*T)}for(let w=0;w<m.length;w++)m[w]=m[w]/x;f.envMap.value=e.texture,f.samples.value=d,f.weights.value=m,f.latitudinal.value=o==="latitudinal",c&&(f.poleAxis.value=c);const{_lodMax:v}=this;f.dTheta.value=p,f.mipInt.value=v-n;const y=this._sizeLods[i],b=3*y*(i>v-bi?i-v+bi:0),S=4*(this._cubeSize-y);hs(t,b,S,3*y,2*y),l.setRenderTarget(t),l.render(u,Xs)}}function x2(r){const e=[],t=[],n=[];let i=r;const s=r-bi+1+wh.length;for(let o=0;o<s;o++){const c=Math.pow(2,i);e.push(c);let l=1/c;o>r-bi?l=wh[o-r+bi-1]:o===0&&(l=0),t.push(l);const a=1/(c-2),h=-a,u=1+a,f=[h,h,u,h,u,u,h,h,u,u,h,u],_=6,p=6,g=3,d=2,m=1,x=new Float32Array(g*p*_),v=new Float32Array(d*p*_),y=new Float32Array(m*p*_);for(let S=0;S<_;S++){const w=S%3*2/3-1,M=S>2?0:-1,T=[w,M,0,w+2/3,M,0,w+2/3,M+1,0,w,M,0,w+2/3,M+1,0,w,M+1,0];x.set(T,g*p*S),v.set(f,d*p*S);const R=[S,S,S,S,S,S];y.set(R,m*p*S)}const b=new Et;b.setAttribute("position",new It(x,g)),b.setAttribute("uv",new It(v,d)),b.setAttribute("faceIndex",new It(y,m)),n.push(new G(b,null)),i>bi&&i--}return{lodMeshes:n,sizeLods:e,sigmas:t}}function Ah(r,e,t){const n=new nn(r,e,t);return n.texture.mapping=Eo,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function hs(r,e,t,n,i){r.viewport.set(e,t,n,i),r.scissor.set(e,t,n,i)}function v2(r,e,t){return new Yt({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:g2,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${r}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:Ao(),fragmentShader:`

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
		`,blending:Gn,depthTest:!1,depthWrite:!1})}function y2(r,e,t){const n=new Float32Array(Ni),i=new L(0,1,0);return new Yt({name:"SphericalGaussianBlur",defines:{n:Ni,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${r}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:Ao(),fragmentShader:`

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
		`,blending:Gn,depthTest:!1,depthWrite:!1})}function Rh(){return new Yt({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Ao(),fragmentShader:`

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
		`,blending:Gn,depthTest:!1,depthWrite:!1})}function Ch(){return new Yt({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Ao(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Gn,depthTest:!1,depthWrite:!1})}function Ao(){return`

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
			`},i=new ve(5,5,5),s=new Yt({name:"CubemapFromEquirect",uniforms:Ms(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Zt,blending:Gn});s.uniforms.tEquirect.value=t;const o=new G(i,s),c=t.minFilter;return t.minFilter===Bn&&(t.minFilter=Vt),new h0(1,10,this).update(e,o),t.minFilter=c,o.geometry.dispose(),o.material.dispose(),this}clear(e,t=!0,n=!0,i=!0){const s=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,n,i);e.setRenderTarget(s)}}function M2(r){let e=new WeakMap,t=new WeakMap,n=null;function i(f,_=!1){return f==null?null:_?o(f):s(f)}function s(f){if(f&&f.isTexture){const _=f.mapping;if(_===Io||_===No)if(e.has(f)){const p=e.get(f).texture;return c(p,f.mapping)}else{const p=f.image;if(p&&p.height>0){const g=new Zu(p.height);return g.fromEquirectangularTexture(r,f),e.set(f,g),f.addEventListener("dispose",a),c(g.texture,f.mapping)}else return null}}return f}function o(f){if(f&&f.isTexture){const _=f.mapping,p=_===Io||_===No,g=_===Oi||_===_s;if(p||g){let d=t.get(f);const m=d!==void 0?d.texture.pmremVersion:0;if(f.isRenderTargetTexture&&f.pmremVersion!==m)return n===null&&(n=new Eh(r)),d=p?n.fromEquirectangular(f,d):n.fromCubemap(f,d),d.texture.pmremVersion=f.pmremVersion,t.set(f,d),d.texture;if(d!==void 0)return d.texture;{const x=f.image;return p&&x&&x.height>0||g&&x&&l(x)?(n===null&&(n=new Eh(r)),d=p?n.fromEquirectangular(f):n.fromCubemap(f),d.texture.pmremVersion=f.pmremVersion,t.set(f,d),f.addEventListener("dispose",h),d.texture):null}}}return f}function c(f,_){return _===Io?f.mapping=Oi:_===No&&(f.mapping=_s),f}function l(f){let _=0;const p=6;for(let g=0;g<p;g++)f[g]!==void 0&&_++;return _===p}function a(f){const _=f.target;_.removeEventListener("dispose",a);const p=e.get(_);p!==void 0&&(e.delete(_),p.dispose())}function h(f){const _=f.target;_.removeEventListener("dispose",h);const p=t.get(_);p!==void 0&&(t.delete(_),p.dispose())}function u(){e=new WeakMap,t=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:i,dispose:u}}function S2(r){const e={};function t(n){if(e[n]!==void 0)return e[n];const i=r.getExtension(n);return e[n]=i,i}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){const i=t(n);return i===null&&mc("WebGLRenderer: "+n+" extension not supported."),i}}}function b2(r,e,t,n){const i={},s=new WeakMap;function o(u){const f=u.target;f.index!==null&&e.remove(f.index);for(const p in f.attributes)e.remove(f.attributes[p]);f.removeEventListener("dispose",o),delete i[f.id];const _=s.get(f);_&&(e.remove(_),s.delete(f)),n.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,t.memory.geometries--}function c(u,f){return i[f.id]===!0||(f.addEventListener("dispose",o),i[f.id]=!0,t.memory.geometries++),f}function l(u){const f=u.attributes;for(const _ in f)e.update(f[_],r.ARRAY_BUFFER)}function a(u){const f=[],_=u.index,p=u.attributes.position;let g=0;if(p===void 0)return;if(_!==null){const x=_.array;g=_.version;for(let v=0,y=x.length;v<y;v+=3){const b=x[v+0],S=x[v+1],w=x[v+2];f.push(b,S,S,w,w,b)}}else{const x=p.array;g=p.version;for(let v=0,y=x.length/3-1;v<y;v+=3){const b=v+0,S=v+1,w=v+2;f.push(b,S,S,w,w,b)}}const d=new(p.count>=65535?wu:bu)(f,1);d.version=g;const m=s.get(u);m&&e.remove(m),s.set(u,d)}function h(u){const f=s.get(u);if(f){const _=u.index;_!==null&&f.version<_.version&&a(u)}else a(u);return s.get(u)}return{get:c,update:l,getWireframeAttribute:h}}function w2(r,e,t){let n;function i(u){n=u}let s,o;function c(u){s=u.type,o=u.bytesPerElement}function l(u,f){r.drawElements(n,f,s,u*o),t.update(f,n,1)}function a(u,f,_){_!==0&&(r.drawElementsInstanced(n,f,s,u*o,_),t.update(f,n,_))}function h(u,f,_){if(_===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,f,0,s,u,0,_);let g=0;for(let d=0;d<_;d++)g+=f[d];t.update(g,n,1)}this.setMode=i,this.setIndex=c,this.render=l,this.renderInstances=a,this.renderMultiDraw=h}function T2(r){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(s,o,c){switch(t.calls++,o){case r.TRIANGLES:t.triangles+=c*(s/3);break;case r.LINES:t.lines+=c*(s/2);break;case r.LINE_STRIP:t.lines+=c*(s-1);break;case r.LINE_LOOP:t.lines+=c*s;break;case r.POINTS:t.points+=c*s;break;default:ke("WebGLInfo: Unknown draw mode:",o);break}}function i(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:i,update:n}}function E2(r,e,t){const n=new WeakMap,i=new xt;function s(o,c,l){const a=o.morphTargetInfluences,h=c.morphAttributes.position||c.morphAttributes.normal||c.morphAttributes.color,u=h!==void 0?h.length:0;let f=n.get(c);if(f===void 0||f.count!==u){let T=function(){w.dispose(),n.delete(c),c.removeEventListener("dispose",T)};f!==void 0&&f.texture.dispose();const _=c.morphAttributes.position!==void 0,p=c.morphAttributes.normal!==void 0,g=c.morphAttributes.color!==void 0,d=c.morphAttributes.position||[],m=c.morphAttributes.normal||[],x=c.morphAttributes.color||[];let v=0;_===!0&&(v=1),p===!0&&(v=2),g===!0&&(v=3);let y=c.attributes.position.count*v,b=1;y>e.maxTextureSize&&(b=Math.ceil(y/e.maxTextureSize),y=e.maxTextureSize);const S=new Float32Array(y*b*4*u),w=new Mu(S,y,b,u);w.type=yn,w.needsUpdate=!0;const M=v*4;for(let R=0;R<u;R++){const P=d[R],D=m[R],U=x[R],k=y*b*4*R;for(let N=0;N<P.count;N++){const O=N*M;_===!0&&(i.fromBufferAttribute(P,N),S[k+O+0]=i.x,S[k+O+1]=i.y,S[k+O+2]=i.z,S[k+O+3]=0),p===!0&&(i.fromBufferAttribute(D,N),S[k+O+4]=i.x,S[k+O+5]=i.y,S[k+O+6]=i.z,S[k+O+7]=0),g===!0&&(i.fromBufferAttribute(U,N),S[k+O+8]=i.x,S[k+O+9]=i.y,S[k+O+10]=i.z,S[k+O+11]=U.itemSize===4?i.w:1)}}f={count:u,texture:w,size:new ee(y,b)},n.set(c,f),c.addEventListener("dispose",T)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(r,"morphTexture",o.morphTexture,t);else{let _=0;for(let g=0;g<a.length;g++)_+=a[g];const p=c.morphTargetsRelative?1:1-_;l.getUniforms().setValue(r,"morphTargetBaseInfluence",p),l.getUniforms().setValue(r,"morphTargetInfluences",a)}l.getUniforms().setValue(r,"morphTargetsTexture",f.texture,t),l.getUniforms().setValue(r,"morphTargetsTextureSize",f.size)}return{update:s}}function A2(r,e,t,n,i){let s=new WeakMap;function o(a){const h=i.render.frame,u=a.geometry,f=e.get(a,u);if(s.get(f)!==h&&(e.update(f),s.set(f,h)),a.isInstancedMesh&&(a.hasEventListener("dispose",l)===!1&&a.addEventListener("dispose",l),s.get(a)!==h&&(t.update(a.instanceMatrix,r.ARRAY_BUFFER),a.instanceColor!==null&&t.update(a.instanceColor,r.ARRAY_BUFFER),s.set(a,h))),a.isSkinnedMesh){const _=a.skeleton;s.get(_)!==h&&(_.update(),s.set(_,h))}return f}function c(){s=new WeakMap}function l(a){const h=a.target;h.removeEventListener("dispose",l),n.releaseStatesOfObject(h),t.remove(h.instanceMatrix),h.instanceColor!==null&&t.remove(h.instanceColor)}return{update:o,dispose:c}}const R2={[Pc]:"LINEAR_TONE_MAPPING",[Lc]:"REINHARD_TONE_MAPPING",[Dc]:"CINEON_TONE_MAPPING",[To]:"ACES_FILMIC_TONE_MAPPING",[Nc]:"AGX_TONE_MAPPING",[Uc]:"NEUTRAL_TONE_MAPPING",[Ic]:"CUSTOM_TONE_MAPPING"};function C2(r,e,t,n,i){const s=new nn(e,t,{type:r,depthBuffer:n,stencilBuffer:i,depthTexture:n?new vs(e,t):void 0}),o=new nn(e,t,{type:sn,depthBuffer:!1,stencilBuffer:!1}),c=new Et;c.setAttribute("position",new tt([-1,3,0,-1,-1,0,3,-1,0],3)),c.setAttribute("uv",new tt([0,2,0,0,2,0],2));const l=new Hu({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),a=new G(c,l),h=new yr(-1,1,1,-1,0,1);let u=null,f=null,_=!1,p,g=null,d=[],m=!1;this.setSize=function(x,v){s.setSize(x,v),o.setSize(x,v);for(let y=0;y<d.length;y++){const b=d[y];b.setSize&&b.setSize(x,v)}},this.setEffects=function(x){d=x,m=d.length>0&&d[0].isRenderPass===!0;const v=s.width,y=s.height;for(let b=0;b<d.length;b++){const S=d[b];S.setSize&&S.setSize(v,y)}},this.begin=function(x,v){if(_||x.toneMapping===Vn&&d.length===0)return!1;if(g=v,v!==null){const y=v.width,b=v.height;(s.width!==y||s.height!==b)&&this.setSize(y,b)}return m===!1&&x.setRenderTarget(s),p=x.toneMapping,x.toneMapping=Vn,!0},this.hasRenderPass=function(){return m},this.end=function(x,v){x.toneMapping=p,_=!0;let y=s,b=o;for(let S=0;S<d.length;S++){const w=d[S];if(w.enabled!==!1&&(w.render(x,b,y,v),w.needsSwap!==!1)){const M=y;y=b,b=M}}if(u!==x.outputColorSpace||f!==x.toneMapping){u=x.outputColorSpace,f=x.toneMapping,l.defines={},at.getTransfer(u)===pt&&(l.defines.SRGB_TRANSFER="");const S=R2[f];S&&(l.defines[S]=""),l.needsUpdate=!0}l.uniforms.tDiffuse.value=y.texture,x.setRenderTarget(g),x.render(a,h),g=null,_=!1},this.isCompositing=function(){return _},this.dispose=function(){s.depthTexture&&s.depthTexture.dispose(),s.dispose(),o.dispose(),c.dispose(),l.dispose()}}const $u=new Ht,bc=new vs(1,1),Qu=new Mu,ef=new zd,tf=new Lu,Ph=[],Lh=[],Dh=new Float32Array(16),Ih=new Float32Array(9),Nh=new Float32Array(4);function Ls(r,e,t){const n=r[0];if(n<=0||n>0)return r;const i=e*t;let s=Ph[i];if(s===void 0&&(s=new Float32Array(i),Ph[i]=s),e!==0){n.toArray(s,0);for(let o=1,c=0;o!==e;++o)c+=t,r[o].toArray(s,c)}return s}function Wt(r,e){if(r.length!==e.length)return!1;for(let t=0,n=r.length;t<n;t++)if(r[t]!==e[t])return!1;return!0}function Xt(r,e){for(let t=0,n=e.length;t<n;t++)r[t]=e[t]}function Ro(r,e){let t=Lh[e];t===void 0&&(t=new Int32Array(e),Lh[e]=t);for(let n=0;n!==e;++n)t[n]=r.allocateTextureUnit();return t}function P2(r,e){const t=this.cache;t[0]!==e&&(r.uniform1f(this.addr,e),t[0]=e)}function L2(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(r.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Wt(t,e))return;r.uniform2fv(this.addr,e),Xt(t,e)}}function D2(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(r.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(r.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Wt(t,e))return;r.uniform3fv(this.addr,e),Xt(t,e)}}function I2(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(r.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Wt(t,e))return;r.uniform4fv(this.addr,e),Xt(t,e)}}function N2(r,e){const t=this.cache,n=e.elements;if(n===void 0){if(Wt(t,e))return;r.uniformMatrix2fv(this.addr,!1,e),Xt(t,e)}else{if(Wt(t,n))return;Nh.set(n),r.uniformMatrix2fv(this.addr,!1,Nh),Xt(t,n)}}function U2(r,e){const t=this.cache,n=e.elements;if(n===void 0){if(Wt(t,e))return;r.uniformMatrix3fv(this.addr,!1,e),Xt(t,e)}else{if(Wt(t,n))return;Ih.set(n),r.uniformMatrix3fv(this.addr,!1,Ih),Xt(t,n)}}function F2(r,e){const t=this.cache,n=e.elements;if(n===void 0){if(Wt(t,e))return;r.uniformMatrix4fv(this.addr,!1,e),Xt(t,e)}else{if(Wt(t,n))return;Dh.set(n),r.uniformMatrix4fv(this.addr,!1,Dh),Xt(t,n)}}function O2(r,e){const t=this.cache;t[0]!==e&&(r.uniform1i(this.addr,e),t[0]=e)}function B2(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(r.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Wt(t,e))return;r.uniform2iv(this.addr,e),Xt(t,e)}}function z2(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(r.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Wt(t,e))return;r.uniform3iv(this.addr,e),Xt(t,e)}}function k2(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(r.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Wt(t,e))return;r.uniform4iv(this.addr,e),Xt(t,e)}}function G2(r,e){const t=this.cache;t[0]!==e&&(r.uniform1ui(this.addr,e),t[0]=e)}function V2(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(r.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Wt(t,e))return;r.uniform2uiv(this.addr,e),Xt(t,e)}}function H2(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(r.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Wt(t,e))return;r.uniform3uiv(this.addr,e),Xt(t,e)}}function W2(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(r.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Wt(t,e))return;r.uniform4uiv(this.addr,e),Xt(t,e)}}function X2(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i);let s;this.type===r.SAMPLER_2D_SHADOW?(bc.compareFunction=t.isReversedDepthBuffer()?Xc:Wc,s=bc):s=$u,t.setTexture2D(e||s,i)}function q2(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTexture3D(e||ef,i)}function Y2(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTextureCube(e||tf,i)}function K2(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTexture2DArray(e||Qu,i)}function j2(r){switch(r){case 5126:return P2;case 35664:return L2;case 35665:return D2;case 35666:return I2;case 35674:return N2;case 35675:return U2;case 35676:return F2;case 5124:case 35670:return O2;case 35667:case 35671:return B2;case 35668:case 35672:return z2;case 35669:case 35673:return k2;case 5125:return G2;case 36294:return V2;case 36295:return H2;case 36296:return W2;case 35678:case 36198:case 36298:case 36306:case 35682:return X2;case 35679:case 36299:case 36307:return q2;case 35680:case 36300:case 36308:case 36293:return Y2;case 36289:case 36303:case 36311:case 36292:return K2}}function J2(r,e){r.uniform1fv(this.addr,e)}function Z2(r,e){const t=Ls(e,this.size,2);r.uniform2fv(this.addr,t)}function $2(r,e){const t=Ls(e,this.size,3);r.uniform3fv(this.addr,t)}function Q2(r,e){const t=Ls(e,this.size,4);r.uniform4fv(this.addr,t)}function e_(r,e){const t=Ls(e,this.size,4);r.uniformMatrix2fv(this.addr,!1,t)}function t_(r,e){const t=Ls(e,this.size,9);r.uniformMatrix3fv(this.addr,!1,t)}function n_(r,e){const t=Ls(e,this.size,16);r.uniformMatrix4fv(this.addr,!1,t)}function i_(r,e){r.uniform1iv(this.addr,e)}function s_(r,e){r.uniform2iv(this.addr,e)}function r_(r,e){r.uniform3iv(this.addr,e)}function o_(r,e){r.uniform4iv(this.addr,e)}function a_(r,e){r.uniform1uiv(this.addr,e)}function c_(r,e){r.uniform2uiv(this.addr,e)}function l_(r,e){r.uniform3uiv(this.addr,e)}function h_(r,e){r.uniform4uiv(this.addr,e)}function u_(r,e,t){const n=this.cache,i=e.length,s=Ro(t,i);Wt(n,s)||(r.uniform1iv(this.addr,s),Xt(n,s));let o;this.type===r.SAMPLER_2D_SHADOW?o=bc:o=$u;for(let c=0;c!==i;++c)t.setTexture2D(e[c]||o,s[c])}function f_(r,e,t){const n=this.cache,i=e.length,s=Ro(t,i);Wt(n,s)||(r.uniform1iv(this.addr,s),Xt(n,s));for(let o=0;o!==i;++o)t.setTexture3D(e[o]||ef,s[o])}function d_(r,e,t){const n=this.cache,i=e.length,s=Ro(t,i);Wt(n,s)||(r.uniform1iv(this.addr,s),Xt(n,s));for(let o=0;o!==i;++o)t.setTextureCube(e[o]||tf,s[o])}function p_(r,e,t){const n=this.cache,i=e.length,s=Ro(t,i);Wt(n,s)||(r.uniform1iv(this.addr,s),Xt(n,s));for(let o=0;o!==i;++o)t.setTexture2DArray(e[o]||Qu,s[o])}function m_(r){switch(r){case 5126:return J2;case 35664:return Z2;case 35665:return $2;case 35666:return Q2;case 35674:return e_;case 35675:return t_;case 35676:return n_;case 5124:case 35670:return i_;case 35667:case 35671:return s_;case 35668:case 35672:return r_;case 35669:case 35673:return o_;case 5125:return a_;case 36294:return c_;case 36295:return l_;case 36296:return h_;case 35678:case 36198:case 36298:case 36306:case 35682:return u_;case 35679:case 36299:case 36307:return f_;case 35680:case 36300:case 36308:case 36293:return d_;case 36289:case 36303:case 36311:case 36292:return p_}}class g_{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=j2(t.type)}}class __{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=m_(t.type)}}class x_{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const i=this.seq;for(let s=0,o=i.length;s!==o;++s){const c=i[s];c.setValue(e,t[c.id],n)}}}const _a=/(\w+)(\])?(\[|\.)?/g;function Uh(r,e){r.seq.push(e),r.map[e.id]=e}function v_(r,e,t){const n=r.name,i=n.length;for(_a.lastIndex=0;;){const s=_a.exec(n),o=_a.lastIndex;let c=s[1];const l=s[2]==="]",a=s[3];if(l&&(c=c|0),a===void 0||a==="["&&o+2===i){Uh(t,a===void 0?new g_(c,r,e):new __(c,r,e));break}else{let u=t.map[c];u===void 0&&(u=new x_(c),Uh(t,u)),t=u}}}class ho{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let o=0;o<n;++o){const c=e.getActiveUniform(t,o),l=e.getUniformLocation(t,c.name);v_(c,l,this)}const i=[],s=[];for(const o of this.seq)o.type===e.SAMPLER_2D_SHADOW||o.type===e.SAMPLER_CUBE_SHADOW||o.type===e.SAMPLER_2D_ARRAY_SHADOW?i.push(o):s.push(o);i.length>0&&(this.seq=i.concat(s))}setValue(e,t,n,i){const s=this.map[t];s!==void 0&&s.setValue(e,n,i)}setOptional(e,t,n){const i=t[n];i!==void 0&&this.setValue(e,n,i)}static upload(e,t,n,i){for(let s=0,o=t.length;s!==o;++s){const c=t[s],l=n[c.id];l.needsUpdate!==!1&&c.setValue(e,l.value,i)}}static seqWithValue(e,t){const n=[];for(let i=0,s=e.length;i!==s;++i){const o=e[i];o.id in t&&n.push(o)}return n}}function Fh(r,e,t){const n=r.createShader(e);return r.shaderSource(n,t),r.compileShader(n),n}const y_=37297;let M_=0;function S_(r,e){const t=r.split(`
`),n=[],i=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let o=i;o<s;o++){const c=o+1;n.push(`${c===e?">":" "} ${c}: ${t[o]}`)}return n.join(`
`)}const Oh=new $e;function b_(r){at._getMatrix(Oh,at.workingColorSpace,r);const e=`mat3( ${Oh.elements.map(t=>t.toFixed(4))} )`;switch(at.getTransfer(r)){case _o:return[e,"LinearTransferOETF"];case pt:return[e,"sRGBTransferOETF"];default:return Ue("WebGLProgram: Unsupported color space: ",r),[e,"LinearTransferOETF"]}}function Bh(r,e,t){const n=r.getShaderParameter(e,r.COMPILE_STATUS),s=(r.getShaderInfoLog(e)||"").trim();if(n&&s==="")return"";const o=/ERROR: 0:(\d+)/.exec(s);if(o){const c=parseInt(o[1]);return t.toUpperCase()+`

`+s+`

`+S_(r.getShaderSource(e),c)}else return s}function w_(r,e){const t=b_(e);return[`vec4 ${r}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}const T_={[Pc]:"Linear",[Lc]:"Reinhard",[Dc]:"Cineon",[To]:"ACESFilmic",[Nc]:"AgX",[Uc]:"Neutral",[Ic]:"Custom"};function E_(r,e){const t=T_[e];return t===void 0?(Ue("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+r+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+r+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const no=new L;function A_(){at.getLuminanceCoefficients(no);const r=no.x.toFixed(4),e=no.y.toFixed(4),t=no.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${r}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function R_(r){return[r.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",r.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter($s).join(`
`)}function C_(r){const e=[];for(const t in r){const n=r[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function P_(r,e){const t={},n=r.getProgramParameter(e,r.ACTIVE_ATTRIBUTES);for(let i=0;i<n;i++){const s=r.getActiveAttrib(e,i),o=s.name;let c=1;s.type===r.FLOAT_MAT2&&(c=2),s.type===r.FLOAT_MAT3&&(c=3),s.type===r.FLOAT_MAT4&&(c=4),t[o]={type:s.type,location:r.getAttribLocation(e,o),locationSize:c}}return t}function $s(r){return r!==""}function zh(r,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return r.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function kh(r,e){return r.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const L_=/^[ \t]*#include +<([\w\d./]+)>/gm;function wc(r){return r.replace(L_,I_)}const D_=new Map;function I_(r,e){let t=st[e];if(t===void 0){const n=D_.get(e);if(n!==void 0)t=st[n],Ue('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return wc(t)}const N_=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Gh(r){return r.replace(N_,U_)}function U_(r,e,t,n){let i="";for(let s=parseInt(e);s<parseInt(t);s++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return i}function Vh(r){let e=`precision ${r.precision} float;
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
#define LOW_PRECISION`),e}const F_={[Qs]:"SHADOWMAP_TYPE_PCF",[js]:"SHADOWMAP_TYPE_VSM"};function O_(r){return F_[r.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const B_={[Oi]:"ENVMAP_TYPE_CUBE",[_s]:"ENVMAP_TYPE_CUBE",[Eo]:"ENVMAP_TYPE_CUBE_UV"};function z_(r){return r.envMap===!1?"ENVMAP_TYPE_CUBE":B_[r.envMapMode]||"ENVMAP_TYPE_CUBE"}const k_={[_s]:"ENVMAP_MODE_REFRACTION"};function G_(r){return r.envMap===!1?"ENVMAP_MODE_REFLECTION":k_[r.envMapMode]||"ENVMAP_MODE_REFLECTION"}const V_={[lu]:"ENVMAP_BLENDING_MULTIPLY",[$f]:"ENVMAP_BLENDING_MIX",[Qf]:"ENVMAP_BLENDING_ADD"};function H_(r){return r.envMap===!1?"ENVMAP_BLENDING_NONE":V_[r.combine]||"ENVMAP_BLENDING_NONE"}function W_(r){const e=r.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:n,maxMip:t}}function X_(r,e,t,n){const i=r.getContext(),s=t.defines;let o=t.vertexShader,c=t.fragmentShader;const l=O_(t),a=z_(t),h=G_(t),u=H_(t),f=W_(t),_=R_(t),p=C_(s),g=i.createProgram();let d,m,x=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(d=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p].filter($s).join(`
`),d.length>0&&(d+=`
`),m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p].filter($s).join(`
`),m.length>0&&(m+=`
`)):(d=[Vh(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter($s).join(`
`),m=[Vh(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+a:"",t.envMap?"#define "+h:"",t.envMap?"#define "+u:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Vn?"#define TONE_MAPPING":"",t.toneMapping!==Vn?st.tonemapping_pars_fragment:"",t.toneMapping!==Vn?E_("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",st.colorspace_pars_fragment,w_("linearToOutputTexel",t.outputColorSpace),A_(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter($s).join(`
`)),o=wc(o),o=zh(o,t),o=kh(o,t),c=wc(c),c=zh(c,t),c=kh(c,t),o=Gh(o),c=Gh(c),t.isRawShaderMaterial!==!0&&(x=`#version 300 es
`,d=[_,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+d,m=["#define varying in",t.glslVersion===Rl?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Rl?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+m);const v=x+d+o,y=x+m+c,b=Fh(i,i.VERTEX_SHADER,v),S=Fh(i,i.FRAGMENT_SHADER,y);i.attachShader(g,b),i.attachShader(g,S),t.index0AttributeName!==void 0?i.bindAttribLocation(g,0,t.index0AttributeName):t.morphTargets===!0&&i.bindAttribLocation(g,0,"position"),i.linkProgram(g);function w(P){if(r.debug.checkShaderErrors){const D=i.getProgramInfoLog(g)||"",U=i.getShaderInfoLog(b)||"",k=i.getShaderInfoLog(S)||"",N=D.trim(),O=U.trim(),z=k.trim();let j=!0,se=!0;if(i.getProgramParameter(g,i.LINK_STATUS)===!1)if(j=!1,typeof r.debug.onShaderError=="function")r.debug.onShaderError(i,g,b,S);else{const me=Bh(i,b,"vertex"),Ee=Bh(i,S,"fragment");ke("THREE.WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(g,i.VALIDATE_STATUS)+`

Material Name: `+P.name+`
Material Type: `+P.type+`

Program Info Log: `+N+`
`+me+`
`+Ee)}else N!==""?Ue("WebGLProgram: Program Info Log:",N):(O===""||z==="")&&(se=!1);se&&(P.diagnostics={runnable:j,programLog:N,vertexShader:{log:O,prefix:d},fragmentShader:{log:z,prefix:m}})}i.deleteShader(b),i.deleteShader(S),M=new ho(i,g),T=P_(i,g)}let M;this.getUniforms=function(){return M===void 0&&w(this),M};let T;this.getAttributes=function(){return T===void 0&&w(this),T};let R=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return R===!1&&(R=i.getProgramParameter(g,y_)),R},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(g),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=M_++,this.cacheKey=e,this.usedTimes=1,this.program=g,this.vertexShader=b,this.fragmentShader=S,this}let q_=0;class Y_{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,n=e.fragmentShader,i=this._getShaderStage(t),s=this._getShaderStage(n),o=this._getShaderCacheForMaterial(e);return o.has(i)===!1&&(o.add(i),i.usedTimes++),o.has(s)===!1&&(o.add(s),s.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new K_(e),t.set(e,n)),n}}class K_{constructor(e){this.id=q_++,this.code=e,this.usedTimes=0}}function j_(r){return r===zi||r===po||r===mo}function J_(r,e,t,n,i,s){const o=new Kc,c=new Y_,l=new Set,a=[],h=new Map,u=n.logarithmicDepthBuffer;let f=n.precision;const _={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function p(M){return l.add(M),M===0?"uv":`uv${M}`}function g(M,T,R,P,D,U){const k=P.fog,N=D.geometry,O=M.isMeshStandardMaterial||M.isMeshLambertMaterial||M.isMeshPhongMaterial?P.environment:null,z=M.isMeshStandardMaterial||M.isMeshLambertMaterial&&!M.envMap||M.isMeshPhongMaterial&&!M.envMap,j=e.get(M.envMap||O,z),se=j&&j.mapping===Eo?j.image.height:null,me=_[M.type];M.precision!==null&&(f=n.getMaxPrecision(M.precision),f!==M.precision&&Ue("WebGLProgram.getParameters:",M.precision,"not supported, using",f,"instead."));const Ee=N.morphAttributes.position||N.morphAttributes.normal||N.morphAttributes.color,De=Ee!==void 0?Ee.length:0;let nt=0;N.morphAttributes.position!==void 0&&(nt=1),N.morphAttributes.normal!==void 0&&(nt=2),N.morphAttributes.color!==void 0&&(nt=3);let lt,je,Z,ye;if(me){const Qe=Un[me];lt=Qe.vertexShader,je=Qe.fragmentShader}else lt=M.vertexShader,je=M.fragmentShader,c.update(M),Z=c.getVertexShaderID(M),ye=c.getFragmentShaderID(M);const le=r.getRenderTarget(),Fe=r.state.buffers.depth.getReversed(),He=D.isInstancedMesh===!0,Ge=D.isBatchedMesh===!0,ht=!!M.map,We=!!M.matcap,Q=!!j,oe=!!M.aoMap,te=!!M.lightMap,be=!!M.bumpMap,ge=!!M.normalMap,Xe=!!M.displacementMap,I=!!M.emissiveMap,Je=!!M.metalnessMap,Ie=!!M.roughnessMap,qe=M.anisotropy>0,ae=M.clearcoat>0,dt=M.dispersion>0,C=M.iridescence>0,E=M.sheen>0,V=M.transmission>0,K=qe&&!!M.anisotropyMap,ne=ae&&!!M.clearcoatMap,ce=ae&&!!M.clearcoatNormalMap,fe=ae&&!!M.clearcoatRoughnessMap,q=C&&!!M.iridescenceMap,J=C&&!!M.iridescenceThicknessMap,Te=E&&!!M.sheenColorMap,Pe=E&&!!M.sheenRoughnessMap,de=!!M.specularMap,he=!!M.specularColorMap,Ze=!!M.specularIntensityMap,it=V&&!!M.transmissionMap,ft=V&&!!M.thicknessMap,F=!!M.gradientMap,ue=!!M.alphaMap,Y=M.alphaTest>0,Re=!!M.alphaHash,pe=!!M.extensions;let ie=Vn;M.toneMapped&&(le===null||le.isXRRenderTarget===!0)&&(ie=r.toneMapping);const Oe={shaderID:me,shaderType:M.type,shaderName:M.name,vertexShader:lt,fragmentShader:je,defines:M.defines,customVertexShaderID:Z,customFragmentShaderID:ye,isRawShaderMaterial:M.isRawShaderMaterial===!0,glslVersion:M.glslVersion,precision:f,batching:Ge,batchingColor:Ge&&D._colorsTexture!==null,instancing:He,instancingColor:He&&D.instanceColor!==null,instancingMorph:He&&D.morphTexture!==null,outputColorSpace:le===null?r.outputColorSpace:le.isXRRenderTarget===!0?le.texture.colorSpace:at.workingColorSpace,alphaToCoverage:!!M.alphaToCoverage,map:ht,matcap:We,envMap:Q,envMapMode:Q&&j.mapping,envMapCubeUVHeight:se,aoMap:oe,lightMap:te,bumpMap:be,normalMap:ge,displacementMap:Xe,emissiveMap:I,normalMapObjectSpace:ge&&M.normalMapType===od,normalMapTangentSpace:ge&&M.normalMapType===dc,packedNormalMap:ge&&M.normalMapType===dc&&j_(M.normalMap.format),metalnessMap:Je,roughnessMap:Ie,anisotropy:qe,anisotropyMap:K,clearcoat:ae,clearcoatMap:ne,clearcoatNormalMap:ce,clearcoatRoughnessMap:fe,dispersion:dt,iridescence:C,iridescenceMap:q,iridescenceThicknessMap:J,sheen:E,sheenColorMap:Te,sheenRoughnessMap:Pe,specularMap:de,specularColorMap:he,specularIntensityMap:Ze,transmission:V,transmissionMap:it,thicknessMap:ft,gradientMap:F,opaque:M.transparent===!1&&M.blending===ds&&M.alphaToCoverage===!1,alphaMap:ue,alphaTest:Y,alphaHash:Re,combine:M.combine,mapUv:ht&&p(M.map.channel),aoMapUv:oe&&p(M.aoMap.channel),lightMapUv:te&&p(M.lightMap.channel),bumpMapUv:be&&p(M.bumpMap.channel),normalMapUv:ge&&p(M.normalMap.channel),displacementMapUv:Xe&&p(M.displacementMap.channel),emissiveMapUv:I&&p(M.emissiveMap.channel),metalnessMapUv:Je&&p(M.metalnessMap.channel),roughnessMapUv:Ie&&p(M.roughnessMap.channel),anisotropyMapUv:K&&p(M.anisotropyMap.channel),clearcoatMapUv:ne&&p(M.clearcoatMap.channel),clearcoatNormalMapUv:ce&&p(M.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:fe&&p(M.clearcoatRoughnessMap.channel),iridescenceMapUv:q&&p(M.iridescenceMap.channel),iridescenceThicknessMapUv:J&&p(M.iridescenceThicknessMap.channel),sheenColorMapUv:Te&&p(M.sheenColorMap.channel),sheenRoughnessMapUv:Pe&&p(M.sheenRoughnessMap.channel),specularMapUv:de&&p(M.specularMap.channel),specularColorMapUv:he&&p(M.specularColorMap.channel),specularIntensityMapUv:Ze&&p(M.specularIntensityMap.channel),transmissionMapUv:it&&p(M.transmissionMap.channel),thicknessMapUv:ft&&p(M.thicknessMap.channel),alphaMapUv:ue&&p(M.alphaMap.channel),vertexTangents:!!N.attributes.tangent&&(ge||qe),vertexNormals:!!N.attributes.normal,vertexColors:M.vertexColors,vertexAlphas:M.vertexColors===!0&&!!N.attributes.color&&N.attributes.color.itemSize===4,pointsUvs:D.isPoints===!0&&!!N.attributes.uv&&(ht||ue),fog:!!k,useFog:M.fog===!0,fogExp2:!!k&&k.isFogExp2,flatShading:M.wireframe===!1&&(M.flatShading===!0||N.attributes.normal===void 0&&ge===!1&&(M.isMeshLambertMaterial||M.isMeshPhongMaterial||M.isMeshStandardMaterial||M.isMeshPhysicalMaterial)),sizeAttenuation:M.sizeAttenuation===!0,logarithmicDepthBuffer:u,reversedDepthBuffer:Fe,skinning:D.isSkinnedMesh===!0,morphTargets:N.morphAttributes.position!==void 0,morphNormals:N.morphAttributes.normal!==void 0,morphColors:N.morphAttributes.color!==void 0,morphTargetsCount:De,morphTextureStride:nt,numDirLights:T.directional.length,numPointLights:T.point.length,numSpotLights:T.spot.length,numSpotLightMaps:T.spotLightMap.length,numRectAreaLights:T.rectArea.length,numHemiLights:T.hemi.length,numDirLightShadows:T.directionalShadowMap.length,numPointLightShadows:T.pointShadowMap.length,numSpotLightShadows:T.spotShadowMap.length,numSpotLightShadowsWithMaps:T.numSpotLightShadowsWithMaps,numLightProbes:T.numLightProbes,numLightProbeGrids:U.length,numClippingPlanes:s.numPlanes,numClipIntersection:s.numIntersection,dithering:M.dithering,shadowMapEnabled:r.shadowMap.enabled&&R.length>0,shadowMapType:r.shadowMap.type,toneMapping:ie,decodeVideoTexture:ht&&M.map.isVideoTexture===!0&&at.getTransfer(M.map.colorSpace)===pt,decodeVideoTextureEmissive:I&&M.emissiveMap.isVideoTexture===!0&&at.getTransfer(M.emissiveMap.colorSpace)===pt,premultipliedAlpha:M.premultipliedAlpha,doubleSided:M.side===Ct,flipSided:M.side===Zt,useDepthPacking:M.depthPacking>=0,depthPacking:M.depthPacking||0,index0AttributeName:M.index0AttributeName,extensionClipCullDistance:pe&&M.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(pe&&M.extensions.multiDraw===!0||Ge)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:M.customProgramCacheKey()};return Oe.vertexUv1s=l.has(1),Oe.vertexUv2s=l.has(2),Oe.vertexUv3s=l.has(3),l.clear(),Oe}function d(M){const T=[];if(M.shaderID?T.push(M.shaderID):(T.push(M.customVertexShaderID),T.push(M.customFragmentShaderID)),M.defines!==void 0)for(const R in M.defines)T.push(R),T.push(M.defines[R]);return M.isRawShaderMaterial===!1&&(m(T,M),x(T,M),T.push(r.outputColorSpace)),T.push(M.customProgramCacheKey),T.join()}function m(M,T){M.push(T.precision),M.push(T.outputColorSpace),M.push(T.envMapMode),M.push(T.envMapCubeUVHeight),M.push(T.mapUv),M.push(T.alphaMapUv),M.push(T.lightMapUv),M.push(T.aoMapUv),M.push(T.bumpMapUv),M.push(T.normalMapUv),M.push(T.displacementMapUv),M.push(T.emissiveMapUv),M.push(T.metalnessMapUv),M.push(T.roughnessMapUv),M.push(T.anisotropyMapUv),M.push(T.clearcoatMapUv),M.push(T.clearcoatNormalMapUv),M.push(T.clearcoatRoughnessMapUv),M.push(T.iridescenceMapUv),M.push(T.iridescenceThicknessMapUv),M.push(T.sheenColorMapUv),M.push(T.sheenRoughnessMapUv),M.push(T.specularMapUv),M.push(T.specularColorMapUv),M.push(T.specularIntensityMapUv),M.push(T.transmissionMapUv),M.push(T.thicknessMapUv),M.push(T.combine),M.push(T.fogExp2),M.push(T.sizeAttenuation),M.push(T.morphTargetsCount),M.push(T.morphAttributeCount),M.push(T.numDirLights),M.push(T.numPointLights),M.push(T.numSpotLights),M.push(T.numSpotLightMaps),M.push(T.numHemiLights),M.push(T.numRectAreaLights),M.push(T.numDirLightShadows),M.push(T.numPointLightShadows),M.push(T.numSpotLightShadows),M.push(T.numSpotLightShadowsWithMaps),M.push(T.numLightProbes),M.push(T.shadowMapType),M.push(T.toneMapping),M.push(T.numClippingPlanes),M.push(T.numClipIntersection),M.push(T.depthPacking)}function x(M,T){o.disableAll(),T.instancing&&o.enable(0),T.instancingColor&&o.enable(1),T.instancingMorph&&o.enable(2),T.matcap&&o.enable(3),T.envMap&&o.enable(4),T.normalMapObjectSpace&&o.enable(5),T.normalMapTangentSpace&&o.enable(6),T.clearcoat&&o.enable(7),T.iridescence&&o.enable(8),T.alphaTest&&o.enable(9),T.vertexColors&&o.enable(10),T.vertexAlphas&&o.enable(11),T.vertexUv1s&&o.enable(12),T.vertexUv2s&&o.enable(13),T.vertexUv3s&&o.enable(14),T.vertexTangents&&o.enable(15),T.anisotropy&&o.enable(16),T.alphaHash&&o.enable(17),T.batching&&o.enable(18),T.dispersion&&o.enable(19),T.batchingColor&&o.enable(20),T.gradientMap&&o.enable(21),T.packedNormalMap&&o.enable(22),T.vertexNormals&&o.enable(23),M.push(o.mask),o.disableAll(),T.fog&&o.enable(0),T.useFog&&o.enable(1),T.flatShading&&o.enable(2),T.logarithmicDepthBuffer&&o.enable(3),T.reversedDepthBuffer&&o.enable(4),T.skinning&&o.enable(5),T.morphTargets&&o.enable(6),T.morphNormals&&o.enable(7),T.morphColors&&o.enable(8),T.premultipliedAlpha&&o.enable(9),T.shadowMapEnabled&&o.enable(10),T.doubleSided&&o.enable(11),T.flipSided&&o.enable(12),T.useDepthPacking&&o.enable(13),T.dithering&&o.enable(14),T.transmission&&o.enable(15),T.sheen&&o.enable(16),T.opaque&&o.enable(17),T.pointsUvs&&o.enable(18),T.decodeVideoTexture&&o.enable(19),T.decodeVideoTextureEmissive&&o.enable(20),T.alphaToCoverage&&o.enable(21),T.numLightProbeGrids>0&&o.enable(22),M.push(o.mask)}function v(M){const T=_[M.type];let R;if(T){const P=Un[T];R=Ss.clone(P.uniforms)}else R=M.uniforms;return R}function y(M,T){let R=h.get(T);return R!==void 0?++R.usedTimes:(R=new X_(r,T,M,i),a.push(R),h.set(T,R)),R}function b(M){if(--M.usedTimes===0){const T=a.indexOf(M);a[T]=a[a.length-1],a.pop(),h.delete(M.cacheKey),M.destroy()}}function S(M){c.remove(M)}function w(){c.dispose()}return{getParameters:g,getProgramCacheKey:d,getUniforms:v,acquireProgram:y,releaseProgram:b,releaseShaderCache:S,programs:a,dispose:w}}function Z_(){let r=new WeakMap;function e(o){return r.has(o)}function t(o){let c=r.get(o);return c===void 0&&(c={},r.set(o,c)),c}function n(o){r.delete(o)}function i(o,c,l){r.get(o)[c]=l}function s(){r=new WeakMap}return{has:e,get:t,remove:n,update:i,dispose:s}}function $_(r,e){return r.groupOrder!==e.groupOrder?r.groupOrder-e.groupOrder:r.renderOrder!==e.renderOrder?r.renderOrder-e.renderOrder:r.material.id!==e.material.id?r.material.id-e.material.id:r.materialVariant!==e.materialVariant?r.materialVariant-e.materialVariant:r.z!==e.z?r.z-e.z:r.id-e.id}function Hh(r,e){return r.groupOrder!==e.groupOrder?r.groupOrder-e.groupOrder:r.renderOrder!==e.renderOrder?r.renderOrder-e.renderOrder:r.z!==e.z?e.z-r.z:r.id-e.id}function Wh(){const r=[];let e=0;const t=[],n=[],i=[];function s(){e=0,t.length=0,n.length=0,i.length=0}function o(f){let _=0;return f.isInstancedMesh&&(_+=2),f.isSkinnedMesh&&(_+=1),_}function c(f,_,p,g,d,m){let x=r[e];return x===void 0?(x={id:f.id,object:f,geometry:_,material:p,materialVariant:o(f),groupOrder:g,renderOrder:f.renderOrder,z:d,group:m},r[e]=x):(x.id=f.id,x.object=f,x.geometry=_,x.material=p,x.materialVariant=o(f),x.groupOrder=g,x.renderOrder=f.renderOrder,x.z=d,x.group=m),e++,x}function l(f,_,p,g,d,m){const x=c(f,_,p,g,d,m);p.transmission>0?n.push(x):p.transparent===!0?i.push(x):t.push(x)}function a(f,_,p,g,d,m){const x=c(f,_,p,g,d,m);p.transmission>0?n.unshift(x):p.transparent===!0?i.unshift(x):t.unshift(x)}function h(f,_){t.length>1&&t.sort(f||$_),n.length>1&&n.sort(_||Hh),i.length>1&&i.sort(_||Hh)}function u(){for(let f=e,_=r.length;f<_;f++){const p=r[f];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:t,transmissive:n,transparent:i,init:s,push:l,unshift:a,finish:u,sort:h}}function Q_(){let r=new WeakMap;function e(n,i){const s=r.get(n);let o;return s===void 0?(o=new Wh,r.set(n,[o])):i>=s.length?(o=new Wh,s.push(o)):o=s[i],o}function t(){r=new WeakMap}return{get:e,dispose:t}}function ex(){const r={};return{get:function(e){if(r[e.id]!==void 0)return r[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new L,color:new Se};break;case"SpotLight":t={position:new L,direction:new L,color:new Se,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new L,color:new Se,distance:0,decay:0};break;case"HemisphereLight":t={direction:new L,skyColor:new Se,groundColor:new Se};break;case"RectAreaLight":t={color:new Se,position:new L,halfWidth:new L,halfHeight:new L};break}return r[e.id]=t,t}}}function tx(){const r={};return{get:function(e){if(r[e.id]!==void 0)return r[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ee};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ee};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ee,shadowCameraNear:1,shadowCameraFar:1e3};break}return r[e.id]=t,t}}}let nx=0;function ix(r,e){return(e.castShadow?2:0)-(r.castShadow?2:0)+(e.map?1:0)-(r.map?1:0)}function sx(r){const e=new ex,t=tx(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let a=0;a<9;a++)n.probe.push(new L);const i=new L,s=new Ke,o=new Ke;function c(a){let h=0,u=0,f=0;for(let T=0;T<9;T++)n.probe[T].set(0,0,0);let _=0,p=0,g=0,d=0,m=0,x=0,v=0,y=0,b=0,S=0,w=0;a.sort(ix);for(let T=0,R=a.length;T<R;T++){const P=a[T],D=P.color,U=P.intensity,k=P.distance;let N=null;if(P.shadow&&P.shadow.map&&(P.shadow.map.texture.format===zi?N=P.shadow.map.texture:N=P.shadow.map.depthTexture||P.shadow.map.texture),P.isAmbientLight)h+=D.r*U,u+=D.g*U,f+=D.b*U;else if(P.isLightProbe){for(let O=0;O<9;O++)n.probe[O].addScaledVector(P.sh.coefficients[O],U);w++}else if(P.isDirectionalLight){const O=e.get(P);if(O.color.copy(P.color).multiplyScalar(P.intensity),P.castShadow){const z=P.shadow,j=t.get(P);j.shadowIntensity=z.intensity,j.shadowBias=z.bias,j.shadowNormalBias=z.normalBias,j.shadowRadius=z.radius,j.shadowMapSize=z.mapSize,n.directionalShadow[_]=j,n.directionalShadowMap[_]=N,n.directionalShadowMatrix[_]=P.shadow.matrix,x++}n.directional[_]=O,_++}else if(P.isSpotLight){const O=e.get(P);O.position.setFromMatrixPosition(P.matrixWorld),O.color.copy(D).multiplyScalar(U),O.distance=k,O.coneCos=Math.cos(P.angle),O.penumbraCos=Math.cos(P.angle*(1-P.penumbra)),O.decay=P.decay,n.spot[g]=O;const z=P.shadow;if(P.map&&(n.spotLightMap[b]=P.map,b++,z.updateMatrices(P),P.castShadow&&S++),n.spotLightMatrix[g]=z.matrix,P.castShadow){const j=t.get(P);j.shadowIntensity=z.intensity,j.shadowBias=z.bias,j.shadowNormalBias=z.normalBias,j.shadowRadius=z.radius,j.shadowMapSize=z.mapSize,n.spotShadow[g]=j,n.spotShadowMap[g]=N,y++}g++}else if(P.isRectAreaLight){const O=e.get(P);O.color.copy(D).multiplyScalar(U),O.halfWidth.set(P.width*.5,0,0),O.halfHeight.set(0,P.height*.5,0),n.rectArea[d]=O,d++}else if(P.isPointLight){const O=e.get(P);if(O.color.copy(P.color).multiplyScalar(P.intensity),O.distance=P.distance,O.decay=P.decay,P.castShadow){const z=P.shadow,j=t.get(P);j.shadowIntensity=z.intensity,j.shadowBias=z.bias,j.shadowNormalBias=z.normalBias,j.shadowRadius=z.radius,j.shadowMapSize=z.mapSize,j.shadowCameraNear=z.camera.near,j.shadowCameraFar=z.camera.far,n.pointShadow[p]=j,n.pointShadowMap[p]=N,n.pointShadowMatrix[p]=P.shadow.matrix,v++}n.point[p]=O,p++}else if(P.isHemisphereLight){const O=e.get(P);O.skyColor.copy(P.color).multiplyScalar(U),O.groundColor.copy(P.groundColor).multiplyScalar(U),n.hemi[m]=O,m++}}d>0&&(r.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=xe.LTC_FLOAT_1,n.rectAreaLTC2=xe.LTC_FLOAT_2):(n.rectAreaLTC1=xe.LTC_HALF_1,n.rectAreaLTC2=xe.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=u,n.ambient[2]=f;const M=n.hash;(M.directionalLength!==_||M.pointLength!==p||M.spotLength!==g||M.rectAreaLength!==d||M.hemiLength!==m||M.numDirectionalShadows!==x||M.numPointShadows!==v||M.numSpotShadows!==y||M.numSpotMaps!==b||M.numLightProbes!==w)&&(n.directional.length=_,n.spot.length=g,n.rectArea.length=d,n.point.length=p,n.hemi.length=m,n.directionalShadow.length=x,n.directionalShadowMap.length=x,n.pointShadow.length=v,n.pointShadowMap.length=v,n.spotShadow.length=y,n.spotShadowMap.length=y,n.directionalShadowMatrix.length=x,n.pointShadowMatrix.length=v,n.spotLightMatrix.length=y+b-S,n.spotLightMap.length=b,n.numSpotLightShadowsWithMaps=S,n.numLightProbes=w,M.directionalLength=_,M.pointLength=p,M.spotLength=g,M.rectAreaLength=d,M.hemiLength=m,M.numDirectionalShadows=x,M.numPointShadows=v,M.numSpotShadows=y,M.numSpotMaps=b,M.numLightProbes=w,n.version=nx++)}function l(a,h){let u=0,f=0,_=0,p=0,g=0;const d=h.matrixWorldInverse;for(let m=0,x=a.length;m<x;m++){const v=a[m];if(v.isDirectionalLight){const y=n.directional[u];y.direction.setFromMatrixPosition(v.matrixWorld),i.setFromMatrixPosition(v.target.matrixWorld),y.direction.sub(i),y.direction.transformDirection(d),u++}else if(v.isSpotLight){const y=n.spot[_];y.position.setFromMatrixPosition(v.matrixWorld),y.position.applyMatrix4(d),y.direction.setFromMatrixPosition(v.matrixWorld),i.setFromMatrixPosition(v.target.matrixWorld),y.direction.sub(i),y.direction.transformDirection(d),_++}else if(v.isRectAreaLight){const y=n.rectArea[p];y.position.setFromMatrixPosition(v.matrixWorld),y.position.applyMatrix4(d),o.identity(),s.copy(v.matrixWorld),s.premultiply(d),o.extractRotation(s),y.halfWidth.set(v.width*.5,0,0),y.halfHeight.set(0,v.height*.5,0),y.halfWidth.applyMatrix4(o),y.halfHeight.applyMatrix4(o),p++}else if(v.isPointLight){const y=n.point[f];y.position.setFromMatrixPosition(v.matrixWorld),y.position.applyMatrix4(d),f++}else if(v.isHemisphereLight){const y=n.hemi[g];y.direction.setFromMatrixPosition(v.matrixWorld),y.direction.transformDirection(d),g++}}}return{setup:c,setupView:l,state:n}}function Xh(r){const e=new sx(r),t=[],n=[],i=[];function s(f){u.camera=f,t.length=0,n.length=0,i.length=0}function o(f){t.push(f)}function c(f){n.push(f)}function l(f){i.push(f)}function a(){e.setup(t)}function h(f){e.setupView(t,f)}const u={lightsArray:t,shadowsArray:n,lightProbeGridArray:i,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:s,state:u,setupLights:a,setupLightsView:h,pushLight:o,pushShadow:c,pushLightProbeGrid:l}}function rx(r){let e=new WeakMap;function t(i,s=0){const o=e.get(i);let c;return o===void 0?(c=new Xh(r),e.set(i,[c])):s>=o.length?(c=new Xh(r),o.push(c)):c=o[s],c}function n(){e=new WeakMap}return{get:t,dispose:n}}const ox=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,ax=`uniform sampler2D shadow_pass;
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
}`,cx=[new L(1,0,0),new L(-1,0,0),new L(0,1,0),new L(0,-1,0),new L(0,0,1),new L(0,0,-1)],lx=[new L(0,-1,0),new L(0,-1,0),new L(0,0,1),new L(0,0,-1),new L(0,-1,0),new L(0,-1,0)],qh=new Ke,qs=new L,xa=new L;function hx(r,e,t){let n=new Zc;const i=new ee,s=new ee,o=new xt,c=new Wp,l=new Xp,a={},h=t.maxTextureSize,u={[ai]:Zt,[Zt]:ai,[Ct]:Ct},f=new Yt({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new ee},radius:{value:4}},vertexShader:ox,fragmentShader:ax}),_=f.clone();_.defines.HORIZONTAL_PASS=1;const p=new Et;p.setAttribute("position",new It(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const g=new G(p,f),d=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Qs;let m=this.type;this.render=function(S,w,M){if(d.enabled===!1||d.autoUpdate===!1&&d.needsUpdate===!1||S.length===0)return;this.type===If&&(Ue("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."),this.type=Qs);const T=r.getRenderTarget(),R=r.getActiveCubeFace(),P=r.getActiveMipmapLevel(),D=r.state;D.setBlending(Gn),D.buffers.depth.getReversed()===!0?D.buffers.color.setClear(0,0,0,0):D.buffers.color.setClear(1,1,1,1),D.buffers.depth.setTest(!0),D.setScissorTest(!1);const U=m!==this.type;U&&w.traverse(function(k){k.material&&(Array.isArray(k.material)?k.material.forEach(N=>N.needsUpdate=!0):k.material.needsUpdate=!0)});for(let k=0,N=S.length;k<N;k++){const O=S[k],z=O.shadow;if(z===void 0){Ue("WebGLShadowMap:",O,"has no shadow.");continue}if(z.autoUpdate===!1&&z.needsUpdate===!1)continue;i.copy(z.mapSize);const j=z.getFrameExtents();i.multiply(j),s.copy(z.mapSize),(i.x>h||i.y>h)&&(i.x>h&&(s.x=Math.floor(h/j.x),i.x=s.x*j.x,z.mapSize.x=s.x),i.y>h&&(s.y=Math.floor(h/j.y),i.y=s.y*j.y,z.mapSize.y=s.y));const se=r.state.buffers.depth.getReversed();if(z.camera._reversedDepth=se,z.map===null||U===!0){if(z.map!==null&&(z.map.depthTexture!==null&&(z.map.depthTexture.dispose(),z.map.depthTexture=null),z.map.dispose()),this.type===js){if(O.isPointLight){Ue("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}z.map=new nn(i.x,i.y,{format:zi,type:sn,minFilter:Vt,magFilter:Vt,generateMipmaps:!1}),z.map.texture.name=O.name+".shadowMap",z.map.depthTexture=new vs(i.x,i.y,yn),z.map.depthTexture.name=O.name+".shadowMapDepth",z.map.depthTexture.format=ci,z.map.depthTexture.compareFunction=null,z.map.depthTexture.minFilter=Gt,z.map.depthTexture.magFilter=Gt}else O.isPointLight?(z.map=new Zu(i.x),z.map.depthTexture=new cp(i.x,Hn)):(z.map=new nn(i.x,i.y),z.map.depthTexture=new vs(i.x,i.y,Hn)),z.map.depthTexture.name=O.name+".shadowMap",z.map.depthTexture.format=ci,this.type===Qs?(z.map.depthTexture.compareFunction=se?Xc:Wc,z.map.depthTexture.minFilter=Vt,z.map.depthTexture.magFilter=Vt):(z.map.depthTexture.compareFunction=null,z.map.depthTexture.minFilter=Gt,z.map.depthTexture.magFilter=Gt);z.camera.updateProjectionMatrix()}const me=z.map.isWebGLCubeRenderTarget?6:1;for(let Ee=0;Ee<me;Ee++){if(z.map.isWebGLCubeRenderTarget)r.setRenderTarget(z.map,Ee),r.clear();else{Ee===0&&(r.setRenderTarget(z.map),r.clear());const De=z.getViewport(Ee);o.set(s.x*De.x,s.y*De.y,s.x*De.z,s.y*De.w),D.viewport(o)}if(O.isPointLight){const De=z.camera,nt=z.matrix,lt=O.distance||De.far;lt!==De.far&&(De.far=lt,De.updateProjectionMatrix()),qs.setFromMatrixPosition(O.matrixWorld),De.position.copy(qs),xa.copy(De.position),xa.add(cx[Ee]),De.up.copy(lx[Ee]),De.lookAt(xa),De.updateMatrixWorld(),nt.makeTranslation(-qs.x,-qs.y,-qs.z),qh.multiplyMatrices(De.projectionMatrix,De.matrixWorldInverse),z._frustum.setFromProjectionMatrix(qh,De.coordinateSystem,De.reversedDepth)}else z.updateMatrices(O);n=z.getFrustum(),y(w,M,z.camera,O,this.type)}z.isPointLightShadow!==!0&&this.type===js&&x(z,M),z.needsUpdate=!1}m=this.type,d.needsUpdate=!1,r.setRenderTarget(T,R,P)};function x(S,w){const M=e.update(g);f.defines.VSM_SAMPLES!==S.blurSamples&&(f.defines.VSM_SAMPLES=S.blurSamples,_.defines.VSM_SAMPLES=S.blurSamples,f.needsUpdate=!0,_.needsUpdate=!0),S.mapPass===null&&(S.mapPass=new nn(i.x,i.y,{format:zi,type:sn})),f.uniforms.shadow_pass.value=S.map.depthTexture,f.uniforms.resolution.value=S.mapSize,f.uniforms.radius.value=S.radius,r.setRenderTarget(S.mapPass),r.clear(),r.renderBufferDirect(w,null,M,f,g,null),_.uniforms.shadow_pass.value=S.mapPass.texture,_.uniforms.resolution.value=S.mapSize,_.uniforms.radius.value=S.radius,r.setRenderTarget(S.map),r.clear(),r.renderBufferDirect(w,null,M,_,g,null)}function v(S,w,M,T){let R=null;const P=M.isPointLight===!0?S.customDistanceMaterial:S.customDepthMaterial;if(P!==void 0)R=P;else if(R=M.isPointLight===!0?l:c,r.localClippingEnabled&&w.clipShadows===!0&&Array.isArray(w.clippingPlanes)&&w.clippingPlanes.length!==0||w.displacementMap&&w.displacementScale!==0||w.alphaMap&&w.alphaTest>0||w.map&&w.alphaTest>0||w.alphaToCoverage===!0){const D=R.uuid,U=w.uuid;let k=a[D];k===void 0&&(k={},a[D]=k);let N=k[U];N===void 0&&(N=R.clone(),k[U]=N,w.addEventListener("dispose",b)),R=N}if(R.visible=w.visible,R.wireframe=w.wireframe,T===js?R.side=w.shadowSide!==null?w.shadowSide:w.side:R.side=w.shadowSide!==null?w.shadowSide:u[w.side],R.alphaMap=w.alphaMap,R.alphaTest=w.alphaToCoverage===!0?.5:w.alphaTest,R.map=w.map,R.clipShadows=w.clipShadows,R.clippingPlanes=w.clippingPlanes,R.clipIntersection=w.clipIntersection,R.displacementMap=w.displacementMap,R.displacementScale=w.displacementScale,R.displacementBias=w.displacementBias,R.wireframeLinewidth=w.wireframeLinewidth,R.linewidth=w.linewidth,M.isPointLight===!0&&R.isMeshDistanceMaterial===!0){const D=r.properties.get(R);D.light=M}return R}function y(S,w,M,T,R){if(S.visible===!1)return;if(S.layers.test(w.layers)&&(S.isMesh||S.isLine||S.isPoints)&&(S.castShadow||S.receiveShadow&&R===js)&&(!S.frustumCulled||n.intersectsObject(S))){S.modelViewMatrix.multiplyMatrices(M.matrixWorldInverse,S.matrixWorld);const U=e.update(S),k=S.material;if(Array.isArray(k)){const N=U.groups;for(let O=0,z=N.length;O<z;O++){const j=N[O],se=k[j.materialIndex];if(se&&se.visible){const me=v(S,se,T,R);S.onBeforeShadow(r,S,w,M,U,me,j),r.renderBufferDirect(M,null,U,me,S,j),S.onAfterShadow(r,S,w,M,U,me,j)}}}else if(k.visible){const N=v(S,k,T,R);S.onBeforeShadow(r,S,w,M,U,N,null),r.renderBufferDirect(M,null,U,N,S,null),S.onAfterShadow(r,S,w,M,U,N,null)}}const D=S.children;for(let U=0,k=D.length;U<k;U++)y(D[U],w,M,T,R)}function b(S){S.target.removeEventListener("dispose",b);for(const M in a){const T=a[M],R=S.target.uuid;R in T&&(T[R].dispose(),delete T[R])}}}function ux(r,e){function t(){let F=!1;const ue=new xt;let Y=null;const Re=new xt(0,0,0,0);return{setMask:function(pe){Y!==pe&&!F&&(r.colorMask(pe,pe,pe,pe),Y=pe)},setLocked:function(pe){F=pe},setClear:function(pe,ie,Oe,Qe,Pt){Pt===!0&&(pe*=Qe,ie*=Qe,Oe*=Qe),ue.set(pe,ie,Oe,Qe),Re.equals(ue)===!1&&(r.clearColor(pe,ie,Oe,Qe),Re.copy(ue))},reset:function(){F=!1,Y=null,Re.set(-1,0,0,0)}}}function n(){let F=!1,ue=!1,Y=null,Re=null,pe=null;return{setReversed:function(ie){if(ue!==ie){const Oe=e.get("EXT_clip_control");ie?Oe.clipControlEXT(Oe.LOWER_LEFT_EXT,Oe.ZERO_TO_ONE_EXT):Oe.clipControlEXT(Oe.LOWER_LEFT_EXT,Oe.NEGATIVE_ONE_TO_ONE_EXT),ue=ie;const Qe=pe;pe=null,this.setClear(Qe)}},getReversed:function(){return ue},setTest:function(ie){ie?le(r.DEPTH_TEST):Fe(r.DEPTH_TEST)},setMask:function(ie){Y!==ie&&!F&&(r.depthMask(ie),Y=ie)},setFunc:function(ie){if(ue&&(ie=_d[ie]),Re!==ie){switch(ie){case Ca:r.depthFunc(r.NEVER);break;case Pa:r.depthFunc(r.ALWAYS);break;case La:r.depthFunc(r.LESS);break;case gs:r.depthFunc(r.LEQUAL);break;case Da:r.depthFunc(r.EQUAL);break;case Ia:r.depthFunc(r.GEQUAL);break;case Na:r.depthFunc(r.GREATER);break;case Ua:r.depthFunc(r.NOTEQUAL);break;default:r.depthFunc(r.LEQUAL)}Re=ie}},setLocked:function(ie){F=ie},setClear:function(ie){pe!==ie&&(pe=ie,ue&&(ie=1-ie),r.clearDepth(ie))},reset:function(){F=!1,Y=null,Re=null,pe=null,ue=!1}}}function i(){let F=!1,ue=null,Y=null,Re=null,pe=null,ie=null,Oe=null,Qe=null,Pt=null;return{setTest:function(vt){F||(vt?le(r.STENCIL_TEST):Fe(r.STENCIL_TEST))},setMask:function(vt){ue!==vt&&!F&&(r.stencilMask(vt),ue=vt)},setFunc:function(vt,Yn,Pn){(Y!==vt||Re!==Yn||pe!==Pn)&&(r.stencilFunc(vt,Yn,Pn),Y=vt,Re=Yn,pe=Pn)},setOp:function(vt,Yn,Pn){(ie!==vt||Oe!==Yn||Qe!==Pn)&&(r.stencilOp(vt,Yn,Pn),ie=vt,Oe=Yn,Qe=Pn)},setLocked:function(vt){F=vt},setClear:function(vt){Pt!==vt&&(r.clearStencil(vt),Pt=vt)},reset:function(){F=!1,ue=null,Y=null,Re=null,pe=null,ie=null,Oe=null,Qe=null,Pt=null}}}const s=new t,o=new n,c=new i,l=new WeakMap,a=new WeakMap;let h={},u={},f={},_=new WeakMap,p=[],g=null,d=!1,m=null,x=null,v=null,y=null,b=null,S=null,w=null,M=new Se(0,0,0),T=0,R=!1,P=null,D=null,U=null,k=null,N=null;const O=r.getParameter(r.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let z=!1,j=0;const se=r.getParameter(r.VERSION);se.indexOf("WebGL")!==-1?(j=parseFloat(/^WebGL (\d)/.exec(se)[1]),z=j>=1):se.indexOf("OpenGL ES")!==-1&&(j=parseFloat(/^OpenGL ES (\d)/.exec(se)[1]),z=j>=2);let me=null,Ee={};const De=r.getParameter(r.SCISSOR_BOX),nt=r.getParameter(r.VIEWPORT),lt=new xt().fromArray(De),je=new xt().fromArray(nt);function Z(F,ue,Y,Re){const pe=new Uint8Array(4),ie=r.createTexture();r.bindTexture(F,ie),r.texParameteri(F,r.TEXTURE_MIN_FILTER,r.NEAREST),r.texParameteri(F,r.TEXTURE_MAG_FILTER,r.NEAREST);for(let Oe=0;Oe<Y;Oe++)F===r.TEXTURE_3D||F===r.TEXTURE_2D_ARRAY?r.texImage3D(ue,0,r.RGBA,1,1,Re,0,r.RGBA,r.UNSIGNED_BYTE,pe):r.texImage2D(ue+Oe,0,r.RGBA,1,1,0,r.RGBA,r.UNSIGNED_BYTE,pe);return ie}const ye={};ye[r.TEXTURE_2D]=Z(r.TEXTURE_2D,r.TEXTURE_2D,1),ye[r.TEXTURE_CUBE_MAP]=Z(r.TEXTURE_CUBE_MAP,r.TEXTURE_CUBE_MAP_POSITIVE_X,6),ye[r.TEXTURE_2D_ARRAY]=Z(r.TEXTURE_2D_ARRAY,r.TEXTURE_2D_ARRAY,1,1),ye[r.TEXTURE_3D]=Z(r.TEXTURE_3D,r.TEXTURE_3D,1,1),s.setClear(0,0,0,1),o.setClear(1),c.setClear(0),le(r.DEPTH_TEST),o.setFunc(gs),be(!1),ge(Sl),le(r.CULL_FACE),oe(Gn);function le(F){h[F]!==!0&&(r.enable(F),h[F]=!0)}function Fe(F){h[F]!==!1&&(r.disable(F),h[F]=!1)}function He(F,ue){return f[F]!==ue?(r.bindFramebuffer(F,ue),f[F]=ue,F===r.DRAW_FRAMEBUFFER&&(f[r.FRAMEBUFFER]=ue),F===r.FRAMEBUFFER&&(f[r.DRAW_FRAMEBUFFER]=ue),!0):!1}function Ge(F,ue){let Y=p,Re=!1;if(F){Y=_.get(ue),Y===void 0&&(Y=[],_.set(ue,Y));const pe=F.textures;if(Y.length!==pe.length||Y[0]!==r.COLOR_ATTACHMENT0){for(let ie=0,Oe=pe.length;ie<Oe;ie++)Y[ie]=r.COLOR_ATTACHMENT0+ie;Y.length=pe.length,Re=!0}}else Y[0]!==r.BACK&&(Y[0]=r.BACK,Re=!0);Re&&r.drawBuffers(Y)}function ht(F){return g!==F?(r.useProgram(F),g=F,!0):!1}const We={[Di]:r.FUNC_ADD,[Uf]:r.FUNC_SUBTRACT,[Ff]:r.FUNC_REVERSE_SUBTRACT};We[Of]=r.MIN,We[Bf]=r.MAX;const Q={[zf]:r.ZERO,[kf]:r.ONE,[Gf]:r.SRC_COLOR,[Aa]:r.SRC_ALPHA,[Yf]:r.SRC_ALPHA_SATURATE,[Xf]:r.DST_COLOR,[Hf]:r.DST_ALPHA,[Vf]:r.ONE_MINUS_SRC_COLOR,[Ra]:r.ONE_MINUS_SRC_ALPHA,[qf]:r.ONE_MINUS_DST_COLOR,[Wf]:r.ONE_MINUS_DST_ALPHA,[Kf]:r.CONSTANT_COLOR,[jf]:r.ONE_MINUS_CONSTANT_COLOR,[Jf]:r.CONSTANT_ALPHA,[Zf]:r.ONE_MINUS_CONSTANT_ALPHA};function oe(F,ue,Y,Re,pe,ie,Oe,Qe,Pt,vt){if(F===Gn){d===!0&&(Fe(r.BLEND),d=!1);return}if(d===!1&&(le(r.BLEND),d=!0),F!==Nf){if(F!==m||vt!==R){if((x!==Di||b!==Di)&&(r.blendEquation(r.FUNC_ADD),x=Di,b=Di),vt)switch(F){case ds:r.blendFuncSeparate(r.ONE,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case rr:r.blendFunc(r.ONE,r.ONE);break;case bl:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case wl:r.blendFuncSeparate(r.DST_COLOR,r.ONE_MINUS_SRC_ALPHA,r.ZERO,r.ONE);break;default:ke("WebGLState: Invalid blending: ",F);break}else switch(F){case ds:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case rr:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE,r.ONE,r.ONE);break;case bl:ke("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case wl:ke("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:ke("WebGLState: Invalid blending: ",F);break}v=null,y=null,S=null,w=null,M.set(0,0,0),T=0,m=F,R=vt}return}pe=pe||ue,ie=ie||Y,Oe=Oe||Re,(ue!==x||pe!==b)&&(r.blendEquationSeparate(We[ue],We[pe]),x=ue,b=pe),(Y!==v||Re!==y||ie!==S||Oe!==w)&&(r.blendFuncSeparate(Q[Y],Q[Re],Q[ie],Q[Oe]),v=Y,y=Re,S=ie,w=Oe),(Qe.equals(M)===!1||Pt!==T)&&(r.blendColor(Qe.r,Qe.g,Qe.b,Pt),M.copy(Qe),T=Pt),m=F,R=!1}function te(F,ue){F.side===Ct?Fe(r.CULL_FACE):le(r.CULL_FACE);let Y=F.side===Zt;ue&&(Y=!Y),be(Y),F.blending===ds&&F.transparent===!1?oe(Gn):oe(F.blending,F.blendEquation,F.blendSrc,F.blendDst,F.blendEquationAlpha,F.blendSrcAlpha,F.blendDstAlpha,F.blendColor,F.blendAlpha,F.premultipliedAlpha),o.setFunc(F.depthFunc),o.setTest(F.depthTest),o.setMask(F.depthWrite),s.setMask(F.colorWrite);const Re=F.stencilWrite;c.setTest(Re),Re&&(c.setMask(F.stencilWriteMask),c.setFunc(F.stencilFunc,F.stencilRef,F.stencilFuncMask),c.setOp(F.stencilFail,F.stencilZFail,F.stencilZPass)),I(F.polygonOffset,F.polygonOffsetFactor,F.polygonOffsetUnits),F.alphaToCoverage===!0?le(r.SAMPLE_ALPHA_TO_COVERAGE):Fe(r.SAMPLE_ALPHA_TO_COVERAGE)}function be(F){P!==F&&(F?r.frontFace(r.CW):r.frontFace(r.CCW),P=F)}function ge(F){F!==Lf?(le(r.CULL_FACE),F!==D&&(F===Sl?r.cullFace(r.BACK):F===Df?r.cullFace(r.FRONT):r.cullFace(r.FRONT_AND_BACK))):Fe(r.CULL_FACE),D=F}function Xe(F){F!==U&&(z&&r.lineWidth(F),U=F)}function I(F,ue,Y){F?(le(r.POLYGON_OFFSET_FILL),(k!==ue||N!==Y)&&(k=ue,N=Y,o.getReversed()&&(ue=-ue),r.polygonOffset(ue,Y))):Fe(r.POLYGON_OFFSET_FILL)}function Je(F){F?le(r.SCISSOR_TEST):Fe(r.SCISSOR_TEST)}function Ie(F){F===void 0&&(F=r.TEXTURE0+O-1),me!==F&&(r.activeTexture(F),me=F)}function qe(F,ue,Y){Y===void 0&&(me===null?Y=r.TEXTURE0+O-1:Y=me);let Re=Ee[Y];Re===void 0&&(Re={type:void 0,texture:void 0},Ee[Y]=Re),(Re.type!==F||Re.texture!==ue)&&(me!==Y&&(r.activeTexture(Y),me=Y),r.bindTexture(F,ue||ye[F]),Re.type=F,Re.texture=ue)}function ae(){const F=Ee[me];F!==void 0&&F.type!==void 0&&(r.bindTexture(F.type,null),F.type=void 0,F.texture=void 0)}function dt(){try{r.compressedTexImage2D(...arguments)}catch(F){ke("WebGLState:",F)}}function C(){try{r.compressedTexImage3D(...arguments)}catch(F){ke("WebGLState:",F)}}function E(){try{r.texSubImage2D(...arguments)}catch(F){ke("WebGLState:",F)}}function V(){try{r.texSubImage3D(...arguments)}catch(F){ke("WebGLState:",F)}}function K(){try{r.compressedTexSubImage2D(...arguments)}catch(F){ke("WebGLState:",F)}}function ne(){try{r.compressedTexSubImage3D(...arguments)}catch(F){ke("WebGLState:",F)}}function ce(){try{r.texStorage2D(...arguments)}catch(F){ke("WebGLState:",F)}}function fe(){try{r.texStorage3D(...arguments)}catch(F){ke("WebGLState:",F)}}function q(){try{r.texImage2D(...arguments)}catch(F){ke("WebGLState:",F)}}function J(){try{r.texImage3D(...arguments)}catch(F){ke("WebGLState:",F)}}function Te(F){return u[F]!==void 0?u[F]:r.getParameter(F)}function Pe(F,ue){u[F]!==ue&&(r.pixelStorei(F,ue),u[F]=ue)}function de(F){lt.equals(F)===!1&&(r.scissor(F.x,F.y,F.z,F.w),lt.copy(F))}function he(F){je.equals(F)===!1&&(r.viewport(F.x,F.y,F.z,F.w),je.copy(F))}function Ze(F,ue){let Y=a.get(ue);Y===void 0&&(Y=new WeakMap,a.set(ue,Y));let Re=Y.get(F);Re===void 0&&(Re=r.getUniformBlockIndex(ue,F.name),Y.set(F,Re))}function it(F,ue){const Re=a.get(ue).get(F);l.get(ue)!==Re&&(r.uniformBlockBinding(ue,Re,F.__bindingPointIndex),l.set(ue,Re))}function ft(){r.disable(r.BLEND),r.disable(r.CULL_FACE),r.disable(r.DEPTH_TEST),r.disable(r.POLYGON_OFFSET_FILL),r.disable(r.SCISSOR_TEST),r.disable(r.STENCIL_TEST),r.disable(r.SAMPLE_ALPHA_TO_COVERAGE),r.blendEquation(r.FUNC_ADD),r.blendFunc(r.ONE,r.ZERO),r.blendFuncSeparate(r.ONE,r.ZERO,r.ONE,r.ZERO),r.blendColor(0,0,0,0),r.colorMask(!0,!0,!0,!0),r.clearColor(0,0,0,0),r.depthMask(!0),r.depthFunc(r.LESS),o.setReversed(!1),r.clearDepth(1),r.stencilMask(4294967295),r.stencilFunc(r.ALWAYS,0,4294967295),r.stencilOp(r.KEEP,r.KEEP,r.KEEP),r.clearStencil(0),r.cullFace(r.BACK),r.frontFace(r.CCW),r.polygonOffset(0,0),r.activeTexture(r.TEXTURE0),r.bindFramebuffer(r.FRAMEBUFFER,null),r.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),r.bindFramebuffer(r.READ_FRAMEBUFFER,null),r.useProgram(null),r.lineWidth(1),r.scissor(0,0,r.canvas.width,r.canvas.height),r.viewport(0,0,r.canvas.width,r.canvas.height),r.pixelStorei(r.PACK_ALIGNMENT,4),r.pixelStorei(r.UNPACK_ALIGNMENT,4),r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,!1),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,r.BROWSER_DEFAULT_WEBGL),r.pixelStorei(r.PACK_ROW_LENGTH,0),r.pixelStorei(r.PACK_SKIP_PIXELS,0),r.pixelStorei(r.PACK_SKIP_ROWS,0),r.pixelStorei(r.UNPACK_ROW_LENGTH,0),r.pixelStorei(r.UNPACK_IMAGE_HEIGHT,0),r.pixelStorei(r.UNPACK_SKIP_PIXELS,0),r.pixelStorei(r.UNPACK_SKIP_ROWS,0),r.pixelStorei(r.UNPACK_SKIP_IMAGES,0),h={},u={},me=null,Ee={},f={},_=new WeakMap,p=[],g=null,d=!1,m=null,x=null,v=null,y=null,b=null,S=null,w=null,M=new Se(0,0,0),T=0,R=!1,P=null,D=null,U=null,k=null,N=null,lt.set(0,0,r.canvas.width,r.canvas.height),je.set(0,0,r.canvas.width,r.canvas.height),s.reset(),o.reset(),c.reset()}return{buffers:{color:s,depth:o,stencil:c},enable:le,disable:Fe,bindFramebuffer:He,drawBuffers:Ge,useProgram:ht,setBlending:oe,setMaterial:te,setFlipSided:be,setCullFace:ge,setLineWidth:Xe,setPolygonOffset:I,setScissorTest:Je,activeTexture:Ie,bindTexture:qe,unbindTexture:ae,compressedTexImage2D:dt,compressedTexImage3D:C,texImage2D:q,texImage3D:J,pixelStorei:Pe,getParameter:Te,updateUBOMapping:Ze,uniformBlockBinding:it,texStorage2D:ce,texStorage3D:fe,texSubImage2D:E,texSubImage3D:V,compressedTexSubImage2D:K,compressedTexSubImage3D:ne,scissor:de,viewport:he,reset:ft}}function fx(r,e,t,n,i,s,o){const c=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),a=new ee,h=new WeakMap,u=new Set;let f;const _=new WeakMap;let p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(C,E){return p?new OffscreenCanvas(C,E):ur("canvas")}function d(C,E,V){let K=1;const ne=dt(C);if((ne.width>V||ne.height>V)&&(K=V/Math.max(ne.width,ne.height)),K<1)if(typeof HTMLImageElement<"u"&&C instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&C instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&C instanceof ImageBitmap||typeof VideoFrame<"u"&&C instanceof VideoFrame){const ce=Math.floor(K*ne.width),fe=Math.floor(K*ne.height);f===void 0&&(f=g(ce,fe));const q=E?g(ce,fe):f;return q.width=ce,q.height=fe,q.getContext("2d").drawImage(C,0,0,ce,fe),Ue("WebGLRenderer: Texture has been resized from ("+ne.width+"x"+ne.height+") to ("+ce+"x"+fe+")."),q}else return"data"in C&&Ue("WebGLRenderer: Image in DataTexture is too big ("+ne.width+"x"+ne.height+")."),C;return C}function m(C){return C.generateMipmaps}function x(C){r.generateMipmap(C)}function v(C){return C.isWebGLCubeRenderTarget?r.TEXTURE_CUBE_MAP:C.isWebGL3DRenderTarget?r.TEXTURE_3D:C.isWebGLArrayRenderTarget||C.isCompressedArrayTexture?r.TEXTURE_2D_ARRAY:r.TEXTURE_2D}function y(C,E,V,K,ne,ce=!1){if(C!==null){if(r[C]!==void 0)return r[C];Ue("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+C+"'")}let fe;K&&(fe=e.get("EXT_texture_norm16"),fe||Ue("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let q=E;if(E===r.RED&&(V===r.FLOAT&&(q=r.R32F),V===r.HALF_FLOAT&&(q=r.R16F),V===r.UNSIGNED_BYTE&&(q=r.R8),V===r.UNSIGNED_SHORT&&fe&&(q=fe.R16_EXT),V===r.SHORT&&fe&&(q=fe.R16_SNORM_EXT)),E===r.RED_INTEGER&&(V===r.UNSIGNED_BYTE&&(q=r.R8UI),V===r.UNSIGNED_SHORT&&(q=r.R16UI),V===r.UNSIGNED_INT&&(q=r.R32UI),V===r.BYTE&&(q=r.R8I),V===r.SHORT&&(q=r.R16I),V===r.INT&&(q=r.R32I)),E===r.RG&&(V===r.FLOAT&&(q=r.RG32F),V===r.HALF_FLOAT&&(q=r.RG16F),V===r.UNSIGNED_BYTE&&(q=r.RG8),V===r.UNSIGNED_SHORT&&fe&&(q=fe.RG16_EXT),V===r.SHORT&&fe&&(q=fe.RG16_SNORM_EXT)),E===r.RG_INTEGER&&(V===r.UNSIGNED_BYTE&&(q=r.RG8UI),V===r.UNSIGNED_SHORT&&(q=r.RG16UI),V===r.UNSIGNED_INT&&(q=r.RG32UI),V===r.BYTE&&(q=r.RG8I),V===r.SHORT&&(q=r.RG16I),V===r.INT&&(q=r.RG32I)),E===r.RGB_INTEGER&&(V===r.UNSIGNED_BYTE&&(q=r.RGB8UI),V===r.UNSIGNED_SHORT&&(q=r.RGB16UI),V===r.UNSIGNED_INT&&(q=r.RGB32UI),V===r.BYTE&&(q=r.RGB8I),V===r.SHORT&&(q=r.RGB16I),V===r.INT&&(q=r.RGB32I)),E===r.RGBA_INTEGER&&(V===r.UNSIGNED_BYTE&&(q=r.RGBA8UI),V===r.UNSIGNED_SHORT&&(q=r.RGBA16UI),V===r.UNSIGNED_INT&&(q=r.RGBA32UI),V===r.BYTE&&(q=r.RGBA8I),V===r.SHORT&&(q=r.RGBA16I),V===r.INT&&(q=r.RGBA32I)),E===r.RGB&&(V===r.UNSIGNED_SHORT&&fe&&(q=fe.RGB16_EXT),V===r.SHORT&&fe&&(q=fe.RGB16_SNORM_EXT),V===r.UNSIGNED_INT_5_9_9_9_REV&&(q=r.RGB9_E5),V===r.UNSIGNED_INT_10F_11F_11F_REV&&(q=r.R11F_G11F_B10F)),E===r.RGBA){const J=ce?_o:at.getTransfer(ne);V===r.FLOAT&&(q=r.RGBA32F),V===r.HALF_FLOAT&&(q=r.RGBA16F),V===r.UNSIGNED_BYTE&&(q=J===pt?r.SRGB8_ALPHA8:r.RGBA8),V===r.UNSIGNED_SHORT&&fe&&(q=fe.RGBA16_EXT),V===r.SHORT&&fe&&(q=fe.RGBA16_SNORM_EXT),V===r.UNSIGNED_SHORT_4_4_4_4&&(q=r.RGBA4),V===r.UNSIGNED_SHORT_5_5_5_1&&(q=r.RGB5_A1)}return(q===r.R16F||q===r.R32F||q===r.RG16F||q===r.RG32F||q===r.RGBA16F||q===r.RGBA32F)&&e.get("EXT_color_buffer_float"),q}function b(C,E){let V;return C?E===null||E===Hn||E===ar?V=r.DEPTH24_STENCIL8:E===yn?V=r.DEPTH32F_STENCIL8:E===or&&(V=r.DEPTH24_STENCIL8,Ue("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):E===null||E===Hn||E===ar?V=r.DEPTH_COMPONENT24:E===yn?V=r.DEPTH_COMPONENT32F:E===or&&(V=r.DEPTH_COMPONENT16),V}function S(C,E){return m(C)===!0||C.isFramebufferTexture&&C.minFilter!==Gt&&C.minFilter!==Vt?Math.log2(Math.max(E.width,E.height))+1:C.mipmaps!==void 0&&C.mipmaps.length>0?C.mipmaps.length:C.isCompressedTexture&&Array.isArray(C.image)?E.mipmaps.length:1}function w(C){const E=C.target;E.removeEventListener("dispose",w),T(E),E.isVideoTexture&&h.delete(E),E.isHTMLTexture&&u.delete(E)}function M(C){const E=C.target;E.removeEventListener("dispose",M),P(E)}function T(C){const E=n.get(C);if(E.__webglInit===void 0)return;const V=C.source,K=_.get(V);if(K){const ne=K[E.__cacheKey];ne.usedTimes--,ne.usedTimes===0&&R(C),Object.keys(K).length===0&&_.delete(V)}n.remove(C)}function R(C){const E=n.get(C);r.deleteTexture(E.__webglTexture);const V=C.source,K=_.get(V);delete K[E.__cacheKey],o.memory.textures--}function P(C){const E=n.get(C);if(C.depthTexture&&(C.depthTexture.dispose(),n.remove(C.depthTexture)),C.isWebGLCubeRenderTarget)for(let K=0;K<6;K++){if(Array.isArray(E.__webglFramebuffer[K]))for(let ne=0;ne<E.__webglFramebuffer[K].length;ne++)r.deleteFramebuffer(E.__webglFramebuffer[K][ne]);else r.deleteFramebuffer(E.__webglFramebuffer[K]);E.__webglDepthbuffer&&r.deleteRenderbuffer(E.__webglDepthbuffer[K])}else{if(Array.isArray(E.__webglFramebuffer))for(let K=0;K<E.__webglFramebuffer.length;K++)r.deleteFramebuffer(E.__webglFramebuffer[K]);else r.deleteFramebuffer(E.__webglFramebuffer);if(E.__webglDepthbuffer&&r.deleteRenderbuffer(E.__webglDepthbuffer),E.__webglMultisampledFramebuffer&&r.deleteFramebuffer(E.__webglMultisampledFramebuffer),E.__webglColorRenderbuffer)for(let K=0;K<E.__webglColorRenderbuffer.length;K++)E.__webglColorRenderbuffer[K]&&r.deleteRenderbuffer(E.__webglColorRenderbuffer[K]);E.__webglDepthRenderbuffer&&r.deleteRenderbuffer(E.__webglDepthRenderbuffer)}const V=C.textures;for(let K=0,ne=V.length;K<ne;K++){const ce=n.get(V[K]);ce.__webglTexture&&(r.deleteTexture(ce.__webglTexture),o.memory.textures--),n.remove(V[K])}n.remove(C)}let D=0;function U(){D=0}function k(){return D}function N(C){D=C}function O(){const C=D;return C>=i.maxTextures&&Ue("WebGLTextures: Trying to use "+C+" texture units while this GPU supports only "+i.maxTextures),D+=1,C}function z(C){const E=[];return E.push(C.wrapS),E.push(C.wrapT),E.push(C.wrapR||0),E.push(C.magFilter),E.push(C.minFilter),E.push(C.anisotropy),E.push(C.internalFormat),E.push(C.format),E.push(C.type),E.push(C.generateMipmaps),E.push(C.premultiplyAlpha),E.push(C.flipY),E.push(C.unpackAlignment),E.push(C.colorSpace),E.join()}function j(C,E){const V=n.get(C);if(C.isVideoTexture&&qe(C),C.isRenderTargetTexture===!1&&C.isExternalTexture!==!0&&C.version>0&&V.__version!==C.version){const K=C.image;if(K===null)Ue("WebGLRenderer: Texture marked for update but no image data found.");else if(K.complete===!1)Ue("WebGLRenderer: Texture marked for update but image is incomplete");else{Fe(V,C,E);return}}else C.isExternalTexture&&(V.__webglTexture=C.sourceTexture?C.sourceTexture:null);t.bindTexture(r.TEXTURE_2D,V.__webglTexture,r.TEXTURE0+E)}function se(C,E){const V=n.get(C);if(C.isRenderTargetTexture===!1&&C.version>0&&V.__version!==C.version){Fe(V,C,E);return}else C.isExternalTexture&&(V.__webglTexture=C.sourceTexture?C.sourceTexture:null);t.bindTexture(r.TEXTURE_2D_ARRAY,V.__webglTexture,r.TEXTURE0+E)}function me(C,E){const V=n.get(C);if(C.isRenderTargetTexture===!1&&C.version>0&&V.__version!==C.version){Fe(V,C,E);return}t.bindTexture(r.TEXTURE_3D,V.__webglTexture,r.TEXTURE0+E)}function Ee(C,E){const V=n.get(C);if(C.isCubeDepthTexture!==!0&&C.version>0&&V.__version!==C.version){He(V,C,E);return}t.bindTexture(r.TEXTURE_CUBE_MAP,V.__webglTexture,r.TEXTURE0+E)}const De={[Bi]:r.REPEAT,[On]:r.CLAMP_TO_EDGE,[fo]:r.MIRRORED_REPEAT},nt={[Gt]:r.NEAREST,[uu]:r.NEAREST_MIPMAP_NEAREST,[Js]:r.NEAREST_MIPMAP_LINEAR,[Vt]:r.LINEAR,[ro]:r.LINEAR_MIPMAP_NEAREST,[Bn]:r.LINEAR_MIPMAP_LINEAR},lt={[ad]:r.NEVER,[fd]:r.ALWAYS,[cd]:r.LESS,[Wc]:r.LEQUAL,[ld]:r.EQUAL,[Xc]:r.GEQUAL,[hd]:r.GREATER,[ud]:r.NOTEQUAL};function je(C,E){if(E.type===yn&&e.has("OES_texture_float_linear")===!1&&(E.magFilter===Vt||E.magFilter===ro||E.magFilter===Js||E.magFilter===Bn||E.minFilter===Vt||E.minFilter===ro||E.minFilter===Js||E.minFilter===Bn)&&Ue("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),r.texParameteri(C,r.TEXTURE_WRAP_S,De[E.wrapS]),r.texParameteri(C,r.TEXTURE_WRAP_T,De[E.wrapT]),(C===r.TEXTURE_3D||C===r.TEXTURE_2D_ARRAY)&&r.texParameteri(C,r.TEXTURE_WRAP_R,De[E.wrapR]),r.texParameteri(C,r.TEXTURE_MAG_FILTER,nt[E.magFilter]),r.texParameteri(C,r.TEXTURE_MIN_FILTER,nt[E.minFilter]),E.compareFunction&&(r.texParameteri(C,r.TEXTURE_COMPARE_MODE,r.COMPARE_REF_TO_TEXTURE),r.texParameteri(C,r.TEXTURE_COMPARE_FUNC,lt[E.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(E.magFilter===Gt||E.minFilter!==Js&&E.minFilter!==Bn||E.type===yn&&e.has("OES_texture_float_linear")===!1)return;if(E.anisotropy>1||n.get(E).__currentAnisotropy){const V=e.get("EXT_texture_filter_anisotropic");r.texParameterf(C,V.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(E.anisotropy,i.getMaxAnisotropy())),n.get(E).__currentAnisotropy=E.anisotropy}}}function Z(C,E){let V=!1;C.__webglInit===void 0&&(C.__webglInit=!0,E.addEventListener("dispose",w));const K=E.source;let ne=_.get(K);ne===void 0&&(ne={},_.set(K,ne));const ce=z(E);if(ce!==C.__cacheKey){ne[ce]===void 0&&(ne[ce]={texture:r.createTexture(),usedTimes:0},o.memory.textures++,V=!0),ne[ce].usedTimes++;const fe=ne[C.__cacheKey];fe!==void 0&&(ne[C.__cacheKey].usedTimes--,fe.usedTimes===0&&R(E)),C.__cacheKey=ce,C.__webglTexture=ne[ce].texture}return V}function ye(C,E,V){return Math.floor(Math.floor(C/V)/E)}function le(C,E,V,K){const ce=C.updateRanges;if(ce.length===0)t.texSubImage2D(r.TEXTURE_2D,0,0,0,E.width,E.height,V,K,E.data);else{ce.sort((Pe,de)=>Pe.start-de.start);let fe=0;for(let Pe=1;Pe<ce.length;Pe++){const de=ce[fe],he=ce[Pe],Ze=de.start+de.count,it=ye(he.start,E.width,4),ft=ye(de.start,E.width,4);he.start<=Ze+1&&it===ft&&ye(he.start+he.count-1,E.width,4)===it?de.count=Math.max(de.count,he.start+he.count-de.start):(++fe,ce[fe]=he)}ce.length=fe+1;const q=t.getParameter(r.UNPACK_ROW_LENGTH),J=t.getParameter(r.UNPACK_SKIP_PIXELS),Te=t.getParameter(r.UNPACK_SKIP_ROWS);t.pixelStorei(r.UNPACK_ROW_LENGTH,E.width);for(let Pe=0,de=ce.length;Pe<de;Pe++){const he=ce[Pe],Ze=Math.floor(he.start/4),it=Math.ceil(he.count/4),ft=Ze%E.width,F=Math.floor(Ze/E.width),ue=it,Y=1;t.pixelStorei(r.UNPACK_SKIP_PIXELS,ft),t.pixelStorei(r.UNPACK_SKIP_ROWS,F),t.texSubImage2D(r.TEXTURE_2D,0,ft,F,ue,Y,V,K,E.data)}C.clearUpdateRanges(),t.pixelStorei(r.UNPACK_ROW_LENGTH,q),t.pixelStorei(r.UNPACK_SKIP_PIXELS,J),t.pixelStorei(r.UNPACK_SKIP_ROWS,Te)}}function Fe(C,E,V){let K=r.TEXTURE_2D;(E.isDataArrayTexture||E.isCompressedArrayTexture)&&(K=r.TEXTURE_2D_ARRAY),E.isData3DTexture&&(K=r.TEXTURE_3D);const ne=Z(C,E),ce=E.source;t.bindTexture(K,C.__webglTexture,r.TEXTURE0+V);const fe=n.get(ce);if(ce.version!==fe.__version||ne===!0){if(t.activeTexture(r.TEXTURE0+V),(typeof ImageBitmap<"u"&&E.image instanceof ImageBitmap)===!1){const Y=at.getPrimaries(at.workingColorSpace),Re=E.colorSpace===Fn?null:at.getPrimaries(E.colorSpace),pe=E.colorSpace===Fn||Y===Re?r.NONE:r.BROWSER_DEFAULT_WEBGL;t.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,E.flipY),t.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,E.premultiplyAlpha),t.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,pe)}t.pixelStorei(r.UNPACK_ALIGNMENT,E.unpackAlignment);let J=d(E.image,!1,i.maxTextureSize);J=ae(E,J);const Te=s.convert(E.format,E.colorSpace),Pe=s.convert(E.type);let de=y(E.internalFormat,Te,Pe,E.normalized,E.colorSpace,E.isVideoTexture);je(K,E);let he;const Ze=E.mipmaps,it=E.isVideoTexture!==!0,ft=fe.__version===void 0||ne===!0,F=ce.dataReady,ue=S(E,J);if(E.isDepthTexture)de=b(E.format===Ui,E.type),ft&&(it?t.texStorage2D(r.TEXTURE_2D,1,de,J.width,J.height):t.texImage2D(r.TEXTURE_2D,0,de,J.width,J.height,0,Te,Pe,null));else if(E.isDataTexture)if(Ze.length>0){it&&ft&&t.texStorage2D(r.TEXTURE_2D,ue,de,Ze[0].width,Ze[0].height);for(let Y=0,Re=Ze.length;Y<Re;Y++)he=Ze[Y],it?F&&t.texSubImage2D(r.TEXTURE_2D,Y,0,0,he.width,he.height,Te,Pe,he.data):t.texImage2D(r.TEXTURE_2D,Y,de,he.width,he.height,0,Te,Pe,he.data);E.generateMipmaps=!1}else it?(ft&&t.texStorage2D(r.TEXTURE_2D,ue,de,J.width,J.height),F&&le(E,J,Te,Pe)):t.texImage2D(r.TEXTURE_2D,0,de,J.width,J.height,0,Te,Pe,J.data);else if(E.isCompressedTexture)if(E.isCompressedArrayTexture){it&&ft&&t.texStorage3D(r.TEXTURE_2D_ARRAY,ue,de,Ze[0].width,Ze[0].height,J.depth);for(let Y=0,Re=Ze.length;Y<Re;Y++)if(he=Ze[Y],E.format!==Mn)if(Te!==null)if(it){if(F)if(E.layerUpdates.size>0){const pe=bh(he.width,he.height,E.format,E.type);for(const ie of E.layerUpdates){const Oe=he.data.subarray(ie*pe/he.data.BYTES_PER_ELEMENT,(ie+1)*pe/he.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,Y,0,0,ie,he.width,he.height,1,Te,Oe)}E.clearLayerUpdates()}else t.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,Y,0,0,0,he.width,he.height,J.depth,Te,he.data)}else t.compressedTexImage3D(r.TEXTURE_2D_ARRAY,Y,de,he.width,he.height,J.depth,0,he.data,0,0);else Ue("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else it?F&&t.texSubImage3D(r.TEXTURE_2D_ARRAY,Y,0,0,0,he.width,he.height,J.depth,Te,Pe,he.data):t.texImage3D(r.TEXTURE_2D_ARRAY,Y,de,he.width,he.height,J.depth,0,Te,Pe,he.data)}else{it&&ft&&t.texStorage2D(r.TEXTURE_2D,ue,de,Ze[0].width,Ze[0].height);for(let Y=0,Re=Ze.length;Y<Re;Y++)he=Ze[Y],E.format!==Mn?Te!==null?it?F&&t.compressedTexSubImage2D(r.TEXTURE_2D,Y,0,0,he.width,he.height,Te,he.data):t.compressedTexImage2D(r.TEXTURE_2D,Y,de,he.width,he.height,0,he.data):Ue("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):it?F&&t.texSubImage2D(r.TEXTURE_2D,Y,0,0,he.width,he.height,Te,Pe,he.data):t.texImage2D(r.TEXTURE_2D,Y,de,he.width,he.height,0,Te,Pe,he.data)}else if(E.isDataArrayTexture)if(it){if(ft&&t.texStorage3D(r.TEXTURE_2D_ARRAY,ue,de,J.width,J.height,J.depth),F)if(E.layerUpdates.size>0){const Y=bh(J.width,J.height,E.format,E.type);for(const Re of E.layerUpdates){const pe=J.data.subarray(Re*Y/J.data.BYTES_PER_ELEMENT,(Re+1)*Y/J.data.BYTES_PER_ELEMENT);t.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,Re,J.width,J.height,1,Te,Pe,pe)}E.clearLayerUpdates()}else t.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,0,J.width,J.height,J.depth,Te,Pe,J.data)}else t.texImage3D(r.TEXTURE_2D_ARRAY,0,de,J.width,J.height,J.depth,0,Te,Pe,J.data);else if(E.isData3DTexture)it?(ft&&t.texStorage3D(r.TEXTURE_3D,ue,de,J.width,J.height,J.depth),F&&t.texSubImage3D(r.TEXTURE_3D,0,0,0,0,J.width,J.height,J.depth,Te,Pe,J.data)):t.texImage3D(r.TEXTURE_3D,0,de,J.width,J.height,J.depth,0,Te,Pe,J.data);else if(E.isFramebufferTexture){if(ft)if(it)t.texStorage2D(r.TEXTURE_2D,ue,de,J.width,J.height);else{let Y=J.width,Re=J.height;for(let pe=0;pe<ue;pe++)t.texImage2D(r.TEXTURE_2D,pe,de,Y,Re,0,Te,Pe,null),Y>>=1,Re>>=1}}else if(E.isHTMLTexture){if("texElementImage2D"in r){const Y=r.canvas;if(Y.hasAttribute("layoutsubtree")||Y.setAttribute("layoutsubtree","true"),J.parentNode!==Y){Y.appendChild(J),u.add(E),Y.onpaint=Qe=>{const Pt=Qe.changedElements;for(const vt of u)Pt.includes(vt.image)&&(vt.needsUpdate=!0)},Y.requestPaint();return}const Re=0,pe=r.RGBA,ie=r.RGBA,Oe=r.UNSIGNED_BYTE;r.texElementImage2D(r.TEXTURE_2D,Re,pe,ie,Oe,J),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_MIN_FILTER,r.LINEAR),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_WRAP_S,r.CLAMP_TO_EDGE),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_WRAP_T,r.CLAMP_TO_EDGE)}}else if(Ze.length>0){if(it&&ft){const Y=dt(Ze[0]);t.texStorage2D(r.TEXTURE_2D,ue,de,Y.width,Y.height)}for(let Y=0,Re=Ze.length;Y<Re;Y++)he=Ze[Y],it?F&&t.texSubImage2D(r.TEXTURE_2D,Y,0,0,Te,Pe,he):t.texImage2D(r.TEXTURE_2D,Y,de,Te,Pe,he);E.generateMipmaps=!1}else if(it){if(ft){const Y=dt(J);t.texStorage2D(r.TEXTURE_2D,ue,de,Y.width,Y.height)}F&&t.texSubImage2D(r.TEXTURE_2D,0,0,0,Te,Pe,J)}else t.texImage2D(r.TEXTURE_2D,0,de,Te,Pe,J);m(E)&&x(K),fe.__version=ce.version,E.onUpdate&&E.onUpdate(E)}C.__version=E.version}function He(C,E,V){if(E.image.length!==6)return;const K=Z(C,E),ne=E.source;t.bindTexture(r.TEXTURE_CUBE_MAP,C.__webglTexture,r.TEXTURE0+V);const ce=n.get(ne);if(ne.version!==ce.__version||K===!0){t.activeTexture(r.TEXTURE0+V);const fe=at.getPrimaries(at.workingColorSpace),q=E.colorSpace===Fn?null:at.getPrimaries(E.colorSpace),J=E.colorSpace===Fn||fe===q?r.NONE:r.BROWSER_DEFAULT_WEBGL;t.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,E.flipY),t.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,E.premultiplyAlpha),t.pixelStorei(r.UNPACK_ALIGNMENT,E.unpackAlignment),t.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,J);const Te=E.isCompressedTexture||E.image[0].isCompressedTexture,Pe=E.image[0]&&E.image[0].isDataTexture,de=[];for(let ie=0;ie<6;ie++)!Te&&!Pe?de[ie]=d(E.image[ie],!0,i.maxCubemapSize):de[ie]=Pe?E.image[ie].image:E.image[ie],de[ie]=ae(E,de[ie]);const he=de[0],Ze=s.convert(E.format,E.colorSpace),it=s.convert(E.type),ft=y(E.internalFormat,Ze,it,E.normalized,E.colorSpace),F=E.isVideoTexture!==!0,ue=ce.__version===void 0||K===!0,Y=ne.dataReady;let Re=S(E,he);je(r.TEXTURE_CUBE_MAP,E);let pe;if(Te){F&&ue&&t.texStorage2D(r.TEXTURE_CUBE_MAP,Re,ft,he.width,he.height);for(let ie=0;ie<6;ie++){pe=de[ie].mipmaps;for(let Oe=0;Oe<pe.length;Oe++){const Qe=pe[Oe];E.format!==Mn?Ze!==null?F?Y&&t.compressedTexSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ie,Oe,0,0,Qe.width,Qe.height,Ze,Qe.data):t.compressedTexImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ie,Oe,ft,Qe.width,Qe.height,0,Qe.data):Ue("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):F?Y&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ie,Oe,0,0,Qe.width,Qe.height,Ze,it,Qe.data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ie,Oe,ft,Qe.width,Qe.height,0,Ze,it,Qe.data)}}}else{if(pe=E.mipmaps,F&&ue){pe.length>0&&Re++;const ie=dt(de[0]);t.texStorage2D(r.TEXTURE_CUBE_MAP,Re,ft,ie.width,ie.height)}for(let ie=0;ie<6;ie++)if(Pe){F?Y&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ie,0,0,0,de[ie].width,de[ie].height,Ze,it,de[ie].data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ie,0,ft,de[ie].width,de[ie].height,0,Ze,it,de[ie].data);for(let Oe=0;Oe<pe.length;Oe++){const Pt=pe[Oe].image[ie].image;F?Y&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ie,Oe+1,0,0,Pt.width,Pt.height,Ze,it,Pt.data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ie,Oe+1,ft,Pt.width,Pt.height,0,Ze,it,Pt.data)}}else{F?Y&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ie,0,0,0,Ze,it,de[ie]):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ie,0,ft,Ze,it,de[ie]);for(let Oe=0;Oe<pe.length;Oe++){const Qe=pe[Oe];F?Y&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ie,Oe+1,0,0,Ze,it,Qe.image[ie]):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ie,Oe+1,ft,Ze,it,Qe.image[ie])}}}m(E)&&x(r.TEXTURE_CUBE_MAP),ce.__version=ne.version,E.onUpdate&&E.onUpdate(E)}C.__version=E.version}function Ge(C,E,V,K,ne,ce){const fe=s.convert(V.format,V.colorSpace),q=s.convert(V.type),J=y(V.internalFormat,fe,q,V.normalized,V.colorSpace),Te=n.get(E),Pe=n.get(V);if(Pe.__renderTarget=E,!Te.__hasExternalTextures){const de=Math.max(1,E.width>>ce),he=Math.max(1,E.height>>ce);ne===r.TEXTURE_3D||ne===r.TEXTURE_2D_ARRAY?t.texImage3D(ne,ce,J,de,he,E.depth,0,fe,q,null):t.texImage2D(ne,ce,J,de,he,0,fe,q,null)}t.bindFramebuffer(r.FRAMEBUFFER,C),Ie(E)?c.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,K,ne,Pe.__webglTexture,0,Je(E)):(ne===r.TEXTURE_2D||ne>=r.TEXTURE_CUBE_MAP_POSITIVE_X&&ne<=r.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&r.framebufferTexture2D(r.FRAMEBUFFER,K,ne,Pe.__webglTexture,ce),t.bindFramebuffer(r.FRAMEBUFFER,null)}function ht(C,E,V){if(r.bindRenderbuffer(r.RENDERBUFFER,C),E.depthBuffer){const K=E.depthTexture,ne=K&&K.isDepthTexture?K.type:null,ce=b(E.stencilBuffer,ne),fe=E.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT;Ie(E)?c.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,Je(E),ce,E.width,E.height):V?r.renderbufferStorageMultisample(r.RENDERBUFFER,Je(E),ce,E.width,E.height):r.renderbufferStorage(r.RENDERBUFFER,ce,E.width,E.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,fe,r.RENDERBUFFER,C)}else{const K=E.textures;for(let ne=0;ne<K.length;ne++){const ce=K[ne],fe=s.convert(ce.format,ce.colorSpace),q=s.convert(ce.type),J=y(ce.internalFormat,fe,q,ce.normalized,ce.colorSpace);Ie(E)?c.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,Je(E),J,E.width,E.height):V?r.renderbufferStorageMultisample(r.RENDERBUFFER,Je(E),J,E.width,E.height):r.renderbufferStorage(r.RENDERBUFFER,J,E.width,E.height)}}r.bindRenderbuffer(r.RENDERBUFFER,null)}function We(C,E,V){const K=E.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(r.FRAMEBUFFER,C),!(E.depthTexture&&E.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const ne=n.get(E.depthTexture);if(ne.__renderTarget=E,(!ne.__webglTexture||E.depthTexture.image.width!==E.width||E.depthTexture.image.height!==E.height)&&(E.depthTexture.image.width=E.width,E.depthTexture.image.height=E.height,E.depthTexture.needsUpdate=!0),K){if(ne.__webglInit===void 0&&(ne.__webglInit=!0,E.depthTexture.addEventListener("dispose",w)),ne.__webglTexture===void 0){ne.__webglTexture=r.createTexture(),t.bindTexture(r.TEXTURE_CUBE_MAP,ne.__webglTexture),je(r.TEXTURE_CUBE_MAP,E.depthTexture);const Te=s.convert(E.depthTexture.format),Pe=s.convert(E.depthTexture.type);let de;E.depthTexture.format===ci?de=r.DEPTH_COMPONENT24:E.depthTexture.format===Ui&&(de=r.DEPTH24_STENCIL8);for(let he=0;he<6;he++)r.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+he,0,de,E.width,E.height,0,Te,Pe,null)}}else j(E.depthTexture,0);const ce=ne.__webglTexture,fe=Je(E),q=K?r.TEXTURE_CUBE_MAP_POSITIVE_X+V:r.TEXTURE_2D,J=E.depthTexture.format===Ui?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT;if(E.depthTexture.format===ci)Ie(E)?c.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,J,q,ce,0,fe):r.framebufferTexture2D(r.FRAMEBUFFER,J,q,ce,0);else if(E.depthTexture.format===Ui)Ie(E)?c.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,J,q,ce,0,fe):r.framebufferTexture2D(r.FRAMEBUFFER,J,q,ce,0);else throw new Error("Unknown depthTexture format")}function Q(C){const E=n.get(C),V=C.isWebGLCubeRenderTarget===!0;if(E.__boundDepthTexture!==C.depthTexture){const K=C.depthTexture;if(E.__depthDisposeCallback&&E.__depthDisposeCallback(),K){const ne=()=>{delete E.__boundDepthTexture,delete E.__depthDisposeCallback,K.removeEventListener("dispose",ne)};K.addEventListener("dispose",ne),E.__depthDisposeCallback=ne}E.__boundDepthTexture=K}if(C.depthTexture&&!E.__autoAllocateDepthBuffer)if(V)for(let K=0;K<6;K++)We(E.__webglFramebuffer[K],C,K);else{const K=C.texture.mipmaps;K&&K.length>0?We(E.__webglFramebuffer[0],C,0):We(E.__webglFramebuffer,C,0)}else if(V){E.__webglDepthbuffer=[];for(let K=0;K<6;K++)if(t.bindFramebuffer(r.FRAMEBUFFER,E.__webglFramebuffer[K]),E.__webglDepthbuffer[K]===void 0)E.__webglDepthbuffer[K]=r.createRenderbuffer(),ht(E.__webglDepthbuffer[K],C,!1);else{const ne=C.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,ce=E.__webglDepthbuffer[K];r.bindRenderbuffer(r.RENDERBUFFER,ce),r.framebufferRenderbuffer(r.FRAMEBUFFER,ne,r.RENDERBUFFER,ce)}}else{const K=C.texture.mipmaps;if(K&&K.length>0?t.bindFramebuffer(r.FRAMEBUFFER,E.__webglFramebuffer[0]):t.bindFramebuffer(r.FRAMEBUFFER,E.__webglFramebuffer),E.__webglDepthbuffer===void 0)E.__webglDepthbuffer=r.createRenderbuffer(),ht(E.__webglDepthbuffer,C,!1);else{const ne=C.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,ce=E.__webglDepthbuffer;r.bindRenderbuffer(r.RENDERBUFFER,ce),r.framebufferRenderbuffer(r.FRAMEBUFFER,ne,r.RENDERBUFFER,ce)}}t.bindFramebuffer(r.FRAMEBUFFER,null)}function oe(C,E,V){const K=n.get(C);E!==void 0&&Ge(K.__webglFramebuffer,C,C.texture,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,0),V!==void 0&&Q(C)}function te(C){const E=C.texture,V=n.get(C),K=n.get(E);C.addEventListener("dispose",M);const ne=C.textures,ce=C.isWebGLCubeRenderTarget===!0,fe=ne.length>1;if(fe||(K.__webglTexture===void 0&&(K.__webglTexture=r.createTexture()),K.__version=E.version,o.memory.textures++),ce){V.__webglFramebuffer=[];for(let q=0;q<6;q++)if(E.mipmaps&&E.mipmaps.length>0){V.__webglFramebuffer[q]=[];for(let J=0;J<E.mipmaps.length;J++)V.__webglFramebuffer[q][J]=r.createFramebuffer()}else V.__webglFramebuffer[q]=r.createFramebuffer()}else{if(E.mipmaps&&E.mipmaps.length>0){V.__webglFramebuffer=[];for(let q=0;q<E.mipmaps.length;q++)V.__webglFramebuffer[q]=r.createFramebuffer()}else V.__webglFramebuffer=r.createFramebuffer();if(fe)for(let q=0,J=ne.length;q<J;q++){const Te=n.get(ne[q]);Te.__webglTexture===void 0&&(Te.__webglTexture=r.createTexture(),o.memory.textures++)}if(C.samples>0&&Ie(C)===!1){V.__webglMultisampledFramebuffer=r.createFramebuffer(),V.__webglColorRenderbuffer=[],t.bindFramebuffer(r.FRAMEBUFFER,V.__webglMultisampledFramebuffer);for(let q=0;q<ne.length;q++){const J=ne[q];V.__webglColorRenderbuffer[q]=r.createRenderbuffer(),r.bindRenderbuffer(r.RENDERBUFFER,V.__webglColorRenderbuffer[q]);const Te=s.convert(J.format,J.colorSpace),Pe=s.convert(J.type),de=y(J.internalFormat,Te,Pe,J.normalized,J.colorSpace,C.isXRRenderTarget===!0),he=Je(C);r.renderbufferStorageMultisample(r.RENDERBUFFER,he,de,C.width,C.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+q,r.RENDERBUFFER,V.__webglColorRenderbuffer[q])}r.bindRenderbuffer(r.RENDERBUFFER,null),C.depthBuffer&&(V.__webglDepthRenderbuffer=r.createRenderbuffer(),ht(V.__webglDepthRenderbuffer,C,!0)),t.bindFramebuffer(r.FRAMEBUFFER,null)}}if(ce){t.bindTexture(r.TEXTURE_CUBE_MAP,K.__webglTexture),je(r.TEXTURE_CUBE_MAP,E);for(let q=0;q<6;q++)if(E.mipmaps&&E.mipmaps.length>0)for(let J=0;J<E.mipmaps.length;J++)Ge(V.__webglFramebuffer[q][J],C,E,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+q,J);else Ge(V.__webglFramebuffer[q],C,E,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+q,0);m(E)&&x(r.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(fe){for(let q=0,J=ne.length;q<J;q++){const Te=ne[q],Pe=n.get(Te);let de=r.TEXTURE_2D;(C.isWebGL3DRenderTarget||C.isWebGLArrayRenderTarget)&&(de=C.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY),t.bindTexture(de,Pe.__webglTexture),je(de,Te),Ge(V.__webglFramebuffer,C,Te,r.COLOR_ATTACHMENT0+q,de,0),m(Te)&&x(de)}t.unbindTexture()}else{let q=r.TEXTURE_2D;if((C.isWebGL3DRenderTarget||C.isWebGLArrayRenderTarget)&&(q=C.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY),t.bindTexture(q,K.__webglTexture),je(q,E),E.mipmaps&&E.mipmaps.length>0)for(let J=0;J<E.mipmaps.length;J++)Ge(V.__webglFramebuffer[J],C,E,r.COLOR_ATTACHMENT0,q,J);else Ge(V.__webglFramebuffer,C,E,r.COLOR_ATTACHMENT0,q,0);m(E)&&x(q),t.unbindTexture()}C.depthBuffer&&Q(C)}function be(C){const E=C.textures;for(let V=0,K=E.length;V<K;V++){const ne=E[V];if(m(ne)){const ce=v(C),fe=n.get(ne).__webglTexture;t.bindTexture(ce,fe),x(ce),t.unbindTexture()}}}const ge=[],Xe=[];function I(C){if(C.samples>0){if(Ie(C)===!1){const E=C.textures,V=C.width,K=C.height;let ne=r.COLOR_BUFFER_BIT;const ce=C.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,fe=n.get(C),q=E.length>1;if(q)for(let Te=0;Te<E.length;Te++)t.bindFramebuffer(r.FRAMEBUFFER,fe.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+Te,r.RENDERBUFFER,null),t.bindFramebuffer(r.FRAMEBUFFER,fe.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+Te,r.TEXTURE_2D,null,0);t.bindFramebuffer(r.READ_FRAMEBUFFER,fe.__webglMultisampledFramebuffer);const J=C.texture.mipmaps;J&&J.length>0?t.bindFramebuffer(r.DRAW_FRAMEBUFFER,fe.__webglFramebuffer[0]):t.bindFramebuffer(r.DRAW_FRAMEBUFFER,fe.__webglFramebuffer);for(let Te=0;Te<E.length;Te++){if(C.resolveDepthBuffer&&(C.depthBuffer&&(ne|=r.DEPTH_BUFFER_BIT),C.stencilBuffer&&C.resolveStencilBuffer&&(ne|=r.STENCIL_BUFFER_BIT)),q){r.framebufferRenderbuffer(r.READ_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.RENDERBUFFER,fe.__webglColorRenderbuffer[Te]);const Pe=n.get(E[Te]).__webglTexture;r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,Pe,0)}r.blitFramebuffer(0,0,V,K,0,0,V,K,ne,r.NEAREST),l===!0&&(ge.length=0,Xe.length=0,ge.push(r.COLOR_ATTACHMENT0+Te),C.depthBuffer&&C.resolveDepthBuffer===!1&&(ge.push(ce),Xe.push(ce),r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,Xe)),r.invalidateFramebuffer(r.READ_FRAMEBUFFER,ge))}if(t.bindFramebuffer(r.READ_FRAMEBUFFER,null),t.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),q)for(let Te=0;Te<E.length;Te++){t.bindFramebuffer(r.FRAMEBUFFER,fe.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+Te,r.RENDERBUFFER,fe.__webglColorRenderbuffer[Te]);const Pe=n.get(E[Te]).__webglTexture;t.bindFramebuffer(r.FRAMEBUFFER,fe.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+Te,r.TEXTURE_2D,Pe,0)}t.bindFramebuffer(r.DRAW_FRAMEBUFFER,fe.__webglMultisampledFramebuffer)}else if(C.depthBuffer&&C.resolveDepthBuffer===!1&&l){const E=C.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT;r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,[E])}}}function Je(C){return Math.min(i.maxSamples,C.samples)}function Ie(C){const E=n.get(C);return C.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&E.__useRenderToTexture!==!1}function qe(C){const E=o.render.frame;h.get(C)!==E&&(h.set(C,E),C.update())}function ae(C,E){const V=C.colorSpace,K=C.format,ne=C.type;return C.isCompressedTexture===!0||C.isVideoTexture===!0||V!==un&&V!==Fn&&(at.getTransfer(V)===pt?(K!==Mn||ne!==ln)&&Ue("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):ke("WebGLTextures: Unsupported texture color space:",V)),E}function dt(C){return typeof HTMLImageElement<"u"&&C instanceof HTMLImageElement?(a.width=C.naturalWidth||C.width,a.height=C.naturalHeight||C.height):typeof VideoFrame<"u"&&C instanceof VideoFrame?(a.width=C.displayWidth,a.height=C.displayHeight):(a.width=C.width,a.height=C.height),a}this.allocateTextureUnit=O,this.resetTextureUnits=U,this.getTextureUnits=k,this.setTextureUnits=N,this.setTexture2D=j,this.setTexture2DArray=se,this.setTexture3D=me,this.setTextureCube=Ee,this.rebindTextures=oe,this.setupRenderTarget=te,this.updateRenderTargetMipmap=be,this.updateMultisampleRenderTarget=I,this.setupDepthRenderbuffer=Q,this.setupFrameBufferTexture=Ge,this.useMultisampledRTT=Ie,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function dx(r,e){function t(n,i=Fn){let s;const o=at.getTransfer(i);if(n===ln)return r.UNSIGNED_BYTE;if(n===Oc)return r.UNSIGNED_SHORT_4_4_4_4;if(n===Bc)return r.UNSIGNED_SHORT_5_5_5_1;if(n===pu)return r.UNSIGNED_INT_5_9_9_9_REV;if(n===mu)return r.UNSIGNED_INT_10F_11F_11F_REV;if(n===fu)return r.BYTE;if(n===du)return r.SHORT;if(n===or)return r.UNSIGNED_SHORT;if(n===Fc)return r.INT;if(n===Hn)return r.UNSIGNED_INT;if(n===yn)return r.FLOAT;if(n===sn)return r.HALF_FLOAT;if(n===gu)return r.ALPHA;if(n===_u)return r.RGB;if(n===Mn)return r.RGBA;if(n===ci)return r.DEPTH_COMPONENT;if(n===Ui)return r.DEPTH_STENCIL;if(n===zc)return r.RED;if(n===kc)return r.RED_INTEGER;if(n===zi)return r.RG;if(n===Gc)return r.RG_INTEGER;if(n===Vc)return r.RGBA_INTEGER;if(n===oo||n===ao||n===co||n===lo)if(o===pt)if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(n===oo)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===ao)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===co)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===lo)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(n===oo)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===ao)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===co)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===lo)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Fa||n===Oa||n===Ba||n===za)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(n===Fa)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Oa)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Ba)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===za)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===ka||n===Ga||n===Va||n===Ha||n===Wa||n===po||n===Xa)if(s=e.get("WEBGL_compressed_texture_etc"),s!==null){if(n===ka||n===Ga)return o===pt?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(n===Va)return o===pt?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC;if(n===Ha)return s.COMPRESSED_R11_EAC;if(n===Wa)return s.COMPRESSED_SIGNED_R11_EAC;if(n===po)return s.COMPRESSED_RG11_EAC;if(n===Xa)return s.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===qa||n===Ya||n===Ka||n===ja||n===Ja||n===Za||n===$a||n===Qa||n===ec||n===tc||n===nc||n===ic||n===sc||n===rc)if(s=e.get("WEBGL_compressed_texture_astc"),s!==null){if(n===qa)return o===pt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Ya)return o===pt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Ka)return o===pt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===ja)return o===pt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Ja)return o===pt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Za)return o===pt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===$a)return o===pt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Qa)return o===pt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===ec)return o===pt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===tc)return o===pt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===nc)return o===pt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===ic)return o===pt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===sc)return o===pt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===rc)return o===pt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===oc||n===ac||n===cc)if(s=e.get("EXT_texture_compression_bptc"),s!==null){if(n===oc)return o===pt?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===ac)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===cc)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===lc||n===hc||n===mo||n===uc)if(s=e.get("EXT_texture_compression_rgtc"),s!==null){if(n===lc)return s.COMPRESSED_RED_RGTC1_EXT;if(n===hc)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===mo)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===uc)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===ar?r.UNSIGNED_INT_24_8:r[n]!==void 0?r[n]:null}return{convert:t}}const px=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,mx=`
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

}`;class gx{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const n=new Du(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,n=new Yt({vertexShader:px,fragmentShader:mx,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new G(new hn(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class _x extends wi{constructor(e,t){super();const n=this;let i=null,s=1,o=null,c="local-floor",l=1,a=null,h=null,u=null,f=null,_=null,p=null;const g=typeof XRWebGLBinding<"u",d=new gx,m={},x=t.getContextAttributes();let v=null,y=null;const b=[],S=[],w=new ee;let M=null;const T=new tn;T.viewport=new xt;const R=new tn;R.viewport=new xt;const P=[T,R],D=new u0;let U=null,k=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Z){let ye=b[Z];return ye===void 0&&(ye=new Go,b[Z]=ye),ye.getTargetRaySpace()},this.getControllerGrip=function(Z){let ye=b[Z];return ye===void 0&&(ye=new Go,b[Z]=ye),ye.getGripSpace()},this.getHand=function(Z){let ye=b[Z];return ye===void 0&&(ye=new Go,b[Z]=ye),ye.getHandSpace()};function N(Z){const ye=S.indexOf(Z.inputSource);if(ye===-1)return;const le=b[ye];le!==void 0&&(le.update(Z.inputSource,Z.frame,a||o),le.dispatchEvent({type:Z.type,data:Z.inputSource}))}function O(){i.removeEventListener("select",N),i.removeEventListener("selectstart",N),i.removeEventListener("selectend",N),i.removeEventListener("squeeze",N),i.removeEventListener("squeezestart",N),i.removeEventListener("squeezeend",N),i.removeEventListener("end",O),i.removeEventListener("inputsourceschange",z);for(let Z=0;Z<b.length;Z++){const ye=S[Z];ye!==null&&(S[Z]=null,b[Z].disconnect(ye))}U=null,k=null,d.reset();for(const Z in m)delete m[Z];e.setRenderTarget(v),_=null,f=null,u=null,i=null,y=null,je.stop(),n.isPresenting=!1,e.setPixelRatio(M),e.setSize(w.width,w.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Z){s=Z,n.isPresenting===!0&&Ue("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Z){c=Z,n.isPresenting===!0&&Ue("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return a||o},this.setReferenceSpace=function(Z){a=Z},this.getBaseLayer=function(){return f!==null?f:_},this.getBinding=function(){return u===null&&g&&(u=new XRWebGLBinding(i,t)),u},this.getFrame=function(){return p},this.getSession=function(){return i},this.setSession=async function(Z){if(i=Z,i!==null){if(v=e.getRenderTarget(),i.addEventListener("select",N),i.addEventListener("selectstart",N),i.addEventListener("selectend",N),i.addEventListener("squeeze",N),i.addEventListener("squeezestart",N),i.addEventListener("squeezeend",N),i.addEventListener("end",O),i.addEventListener("inputsourceschange",z),x.xrCompatible!==!0&&await t.makeXRCompatible(),M=e.getPixelRatio(),e.getSize(w),g&&"createProjectionLayer"in XRWebGLBinding.prototype){let le=null,Fe=null,He=null;x.depth&&(He=x.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,le=x.stencil?Ui:ci,Fe=x.stencil?ar:Hn);const Ge={colorFormat:t.RGBA8,depthFormat:He,scaleFactor:s};u=this.getBinding(),f=u.createProjectionLayer(Ge),i.updateRenderState({layers:[f]}),e.setPixelRatio(1),e.setSize(f.textureWidth,f.textureHeight,!1),y=new nn(f.textureWidth,f.textureHeight,{format:Mn,type:ln,depthTexture:new vs(f.textureWidth,f.textureHeight,Fe,void 0,void 0,void 0,void 0,void 0,void 0,le),stencilBuffer:x.stencil,colorSpace:e.outputColorSpace,samples:x.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}else{const le={antialias:x.antialias,alpha:!0,depth:x.depth,stencil:x.stencil,framebufferScaleFactor:s};_=new XRWebGLLayer(i,t,le),i.updateRenderState({baseLayer:_}),e.setPixelRatio(1),e.setSize(_.framebufferWidth,_.framebufferHeight,!1),y=new nn(_.framebufferWidth,_.framebufferHeight,{format:Mn,type:ln,colorSpace:e.outputColorSpace,stencilBuffer:x.stencil,resolveDepthBuffer:_.ignoreDepthValues===!1,resolveStencilBuffer:_.ignoreDepthValues===!1})}y.isXRRenderTarget=!0,this.setFoveation(l),a=null,o=await i.requestReferenceSpace(c),je.setContext(i),je.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode},this.getDepthTexture=function(){return d.getDepthTexture()};function z(Z){for(let ye=0;ye<Z.removed.length;ye++){const le=Z.removed[ye],Fe=S.indexOf(le);Fe>=0&&(S[Fe]=null,b[Fe].disconnect(le))}for(let ye=0;ye<Z.added.length;ye++){const le=Z.added[ye];let Fe=S.indexOf(le);if(Fe===-1){for(let Ge=0;Ge<b.length;Ge++)if(Ge>=S.length){S.push(le),Fe=Ge;break}else if(S[Ge]===null){S[Ge]=le,Fe=Ge;break}if(Fe===-1)break}const He=b[Fe];He&&He.connect(le)}}const j=new L,se=new L;function me(Z,ye,le){j.setFromMatrixPosition(ye.matrixWorld),se.setFromMatrixPosition(le.matrixWorld);const Fe=j.distanceTo(se),He=ye.projectionMatrix.elements,Ge=le.projectionMatrix.elements,ht=He[14]/(He[10]-1),We=He[14]/(He[10]+1),Q=(He[9]+1)/He[5],oe=(He[9]-1)/He[5],te=(He[8]-1)/He[0],be=(Ge[8]+1)/Ge[0],ge=ht*te,Xe=ht*be,I=Fe/(-te+be),Je=I*-te;if(ye.matrixWorld.decompose(Z.position,Z.quaternion,Z.scale),Z.translateX(Je),Z.translateZ(I),Z.matrixWorld.compose(Z.position,Z.quaternion,Z.scale),Z.matrixWorldInverse.copy(Z.matrixWorld).invert(),He[10]===-1)Z.projectionMatrix.copy(ye.projectionMatrix),Z.projectionMatrixInverse.copy(ye.projectionMatrixInverse);else{const Ie=ht+I,qe=We+I,ae=ge-Je,dt=Xe+(Fe-Je),C=Q*We/qe*Ie,E=oe*We/qe*Ie;Z.projectionMatrix.makePerspective(ae,dt,C,E,Ie,qe),Z.projectionMatrixInverse.copy(Z.projectionMatrix).invert()}}function Ee(Z,ye){ye===null?Z.matrixWorld.copy(Z.matrix):Z.matrixWorld.multiplyMatrices(ye.matrixWorld,Z.matrix),Z.matrixWorldInverse.copy(Z.matrixWorld).invert()}this.updateCamera=function(Z){if(i===null)return;let ye=Z.near,le=Z.far;d.texture!==null&&(d.depthNear>0&&(ye=d.depthNear),d.depthFar>0&&(le=d.depthFar)),D.near=R.near=T.near=ye,D.far=R.far=T.far=le,(U!==D.near||k!==D.far)&&(i.updateRenderState({depthNear:D.near,depthFar:D.far}),U=D.near,k=D.far),D.layers.mask=Z.layers.mask|6,T.layers.mask=D.layers.mask&-5,R.layers.mask=D.layers.mask&-3;const Fe=Z.parent,He=D.cameras;Ee(D,Fe);for(let Ge=0;Ge<He.length;Ge++)Ee(He[Ge],Fe);He.length===2?me(D,T,R):D.projectionMatrix.copy(T.projectionMatrix),De(Z,D,Fe)};function De(Z,ye,le){le===null?Z.matrix.copy(ye.matrixWorld):(Z.matrix.copy(le.matrixWorld),Z.matrix.invert(),Z.matrix.multiply(ye.matrixWorld)),Z.matrix.decompose(Z.position,Z.quaternion,Z.scale),Z.updateMatrixWorld(!0),Z.projectionMatrix.copy(ye.projectionMatrix),Z.projectionMatrixInverse.copy(ye.projectionMatrixInverse),Z.isPerspectiveCamera&&(Z.fov=xs*2*Math.atan(1/Z.projectionMatrix.elements[5]),Z.zoom=1)}this.getCamera=function(){return D},this.getFoveation=function(){if(!(f===null&&_===null))return l},this.setFoveation=function(Z){l=Z,f!==null&&(f.fixedFoveation=Z),_!==null&&_.fixedFoveation!==void 0&&(_.fixedFoveation=Z)},this.hasDepthSensing=function(){return d.texture!==null},this.getDepthSensingMesh=function(){return d.getMesh(D)},this.getCameraTexture=function(Z){return m[Z]};let nt=null;function lt(Z,ye){if(h=ye.getViewerPose(a||o),p=ye,h!==null){const le=h.views;_!==null&&(e.setRenderTargetFramebuffer(y,_.framebuffer),e.setRenderTarget(y));let Fe=!1;le.length!==D.cameras.length&&(D.cameras.length=0,Fe=!0);for(let We=0;We<le.length;We++){const Q=le[We];let oe=null;if(_!==null)oe=_.getViewport(Q);else{const be=u.getViewSubImage(f,Q);oe=be.viewport,We===0&&(e.setRenderTargetTextures(y,be.colorTexture,be.depthStencilTexture),e.setRenderTarget(y))}let te=P[We];te===void 0&&(te=new tn,te.layers.enable(We),te.viewport=new xt,P[We]=te),te.matrix.fromArray(Q.transform.matrix),te.matrix.decompose(te.position,te.quaternion,te.scale),te.projectionMatrix.fromArray(Q.projectionMatrix),te.projectionMatrixInverse.copy(te.projectionMatrix).invert(),te.viewport.set(oe.x,oe.y,oe.width,oe.height),We===0&&(D.matrix.copy(te.matrix),D.matrix.decompose(D.position,D.quaternion,D.scale)),Fe===!0&&D.cameras.push(te)}const He=i.enabledFeatures;if(He&&He.includes("depth-sensing")&&i.depthUsage=="gpu-optimized"&&g){u=n.getBinding();const We=u.getDepthInformation(le[0]);We&&We.isValid&&We.texture&&d.init(We,i.renderState)}if(He&&He.includes("camera-access")&&g){e.state.unbindTexture(),u=n.getBinding();for(let We=0;We<le.length;We++){const Q=le[We].camera;if(Q){let oe=m[Q];oe||(oe=new Du,m[Q]=oe);const te=u.getCameraImage(Q);oe.sourceTexture=te}}}}for(let le=0;le<b.length;le++){const Fe=S[le],He=b[le];Fe!==null&&He!==void 0&&He.update(Fe,ye,a||o)}nt&&nt(Z,ye),ye.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:ye}),p=null}const je=new ju;je.setAnimationLoop(lt),this.setAnimationLoop=function(Z){nt=Z},this.dispose=function(){}}}const xx=new Ke,nf=new $e;nf.set(-1,0,0,0,1,0,0,0,1);function vx(r,e){function t(d,m){d.matrixAutoUpdate===!0&&d.updateMatrix(),m.value.copy(d.matrix)}function n(d,m){m.color.getRGB(d.fogColor.value,Vu(r)),m.isFog?(d.fogNear.value=m.near,d.fogFar.value=m.far):m.isFogExp2&&(d.fogDensity.value=m.density)}function i(d,m,x,v,y){m.isNodeMaterial?m.uniformsNeedUpdate=!1:m.isMeshBasicMaterial?s(d,m):m.isMeshLambertMaterial?(s(d,m),m.envMap&&(d.envMapIntensity.value=m.envMapIntensity)):m.isMeshToonMaterial?(s(d,m),u(d,m)):m.isMeshPhongMaterial?(s(d,m),h(d,m),m.envMap&&(d.envMapIntensity.value=m.envMapIntensity)):m.isMeshStandardMaterial?(s(d,m),f(d,m),m.isMeshPhysicalMaterial&&_(d,m,y)):m.isMeshMatcapMaterial?(s(d,m),p(d,m)):m.isMeshDepthMaterial?s(d,m):m.isMeshDistanceMaterial?(s(d,m),g(d,m)):m.isMeshNormalMaterial?s(d,m):m.isLineBasicMaterial?(o(d,m),m.isLineDashedMaterial&&c(d,m)):m.isPointsMaterial?l(d,m,x,v):m.isSpriteMaterial?a(d,m):m.isShadowMaterial?(d.color.value.copy(m.color),d.opacity.value=m.opacity):m.isShaderMaterial&&(m.uniformsNeedUpdate=!1)}function s(d,m){d.opacity.value=m.opacity,m.color&&d.diffuse.value.copy(m.color),m.emissive&&d.emissive.value.copy(m.emissive).multiplyScalar(m.emissiveIntensity),m.map&&(d.map.value=m.map,t(m.map,d.mapTransform)),m.alphaMap&&(d.alphaMap.value=m.alphaMap,t(m.alphaMap,d.alphaMapTransform)),m.bumpMap&&(d.bumpMap.value=m.bumpMap,t(m.bumpMap,d.bumpMapTransform),d.bumpScale.value=m.bumpScale,m.side===Zt&&(d.bumpScale.value*=-1)),m.normalMap&&(d.normalMap.value=m.normalMap,t(m.normalMap,d.normalMapTransform),d.normalScale.value.copy(m.normalScale),m.side===Zt&&d.normalScale.value.negate()),m.displacementMap&&(d.displacementMap.value=m.displacementMap,t(m.displacementMap,d.displacementMapTransform),d.displacementScale.value=m.displacementScale,d.displacementBias.value=m.displacementBias),m.emissiveMap&&(d.emissiveMap.value=m.emissiveMap,t(m.emissiveMap,d.emissiveMapTransform)),m.specularMap&&(d.specularMap.value=m.specularMap,t(m.specularMap,d.specularMapTransform)),m.alphaTest>0&&(d.alphaTest.value=m.alphaTest);const x=e.get(m),v=x.envMap,y=x.envMapRotation;v&&(d.envMap.value=v,d.envMapRotation.value.setFromMatrix4(xx.makeRotationFromEuler(y)).transpose(),v.isCubeTexture&&v.isRenderTargetTexture===!1&&d.envMapRotation.value.premultiply(nf),d.reflectivity.value=m.reflectivity,d.ior.value=m.ior,d.refractionRatio.value=m.refractionRatio),m.lightMap&&(d.lightMap.value=m.lightMap,d.lightMapIntensity.value=m.lightMapIntensity,t(m.lightMap,d.lightMapTransform)),m.aoMap&&(d.aoMap.value=m.aoMap,d.aoMapIntensity.value=m.aoMapIntensity,t(m.aoMap,d.aoMapTransform))}function o(d,m){d.diffuse.value.copy(m.color),d.opacity.value=m.opacity,m.map&&(d.map.value=m.map,t(m.map,d.mapTransform))}function c(d,m){d.dashSize.value=m.dashSize,d.totalSize.value=m.dashSize+m.gapSize,d.scale.value=m.scale}function l(d,m,x,v){d.diffuse.value.copy(m.color),d.opacity.value=m.opacity,d.size.value=m.size*x,d.scale.value=v*.5,m.map&&(d.map.value=m.map,t(m.map,d.uvTransform)),m.alphaMap&&(d.alphaMap.value=m.alphaMap,t(m.alphaMap,d.alphaMapTransform)),m.alphaTest>0&&(d.alphaTest.value=m.alphaTest)}function a(d,m){d.diffuse.value.copy(m.color),d.opacity.value=m.opacity,d.rotation.value=m.rotation,m.map&&(d.map.value=m.map,t(m.map,d.mapTransform)),m.alphaMap&&(d.alphaMap.value=m.alphaMap,t(m.alphaMap,d.alphaMapTransform)),m.alphaTest>0&&(d.alphaTest.value=m.alphaTest)}function h(d,m){d.specular.value.copy(m.specular),d.shininess.value=Math.max(m.shininess,1e-4)}function u(d,m){m.gradientMap&&(d.gradientMap.value=m.gradientMap)}function f(d,m){d.metalness.value=m.metalness,m.metalnessMap&&(d.metalnessMap.value=m.metalnessMap,t(m.metalnessMap,d.metalnessMapTransform)),d.roughness.value=m.roughness,m.roughnessMap&&(d.roughnessMap.value=m.roughnessMap,t(m.roughnessMap,d.roughnessMapTransform)),m.envMap&&(d.envMapIntensity.value=m.envMapIntensity)}function _(d,m,x){d.ior.value=m.ior,m.sheen>0&&(d.sheenColor.value.copy(m.sheenColor).multiplyScalar(m.sheen),d.sheenRoughness.value=m.sheenRoughness,m.sheenColorMap&&(d.sheenColorMap.value=m.sheenColorMap,t(m.sheenColorMap,d.sheenColorMapTransform)),m.sheenRoughnessMap&&(d.sheenRoughnessMap.value=m.sheenRoughnessMap,t(m.sheenRoughnessMap,d.sheenRoughnessMapTransform))),m.clearcoat>0&&(d.clearcoat.value=m.clearcoat,d.clearcoatRoughness.value=m.clearcoatRoughness,m.clearcoatMap&&(d.clearcoatMap.value=m.clearcoatMap,t(m.clearcoatMap,d.clearcoatMapTransform)),m.clearcoatRoughnessMap&&(d.clearcoatRoughnessMap.value=m.clearcoatRoughnessMap,t(m.clearcoatRoughnessMap,d.clearcoatRoughnessMapTransform)),m.clearcoatNormalMap&&(d.clearcoatNormalMap.value=m.clearcoatNormalMap,t(m.clearcoatNormalMap,d.clearcoatNormalMapTransform),d.clearcoatNormalScale.value.copy(m.clearcoatNormalScale),m.side===Zt&&d.clearcoatNormalScale.value.negate())),m.dispersion>0&&(d.dispersion.value=m.dispersion),m.iridescence>0&&(d.iridescence.value=m.iridescence,d.iridescenceIOR.value=m.iridescenceIOR,d.iridescenceThicknessMinimum.value=m.iridescenceThicknessRange[0],d.iridescenceThicknessMaximum.value=m.iridescenceThicknessRange[1],m.iridescenceMap&&(d.iridescenceMap.value=m.iridescenceMap,t(m.iridescenceMap,d.iridescenceMapTransform)),m.iridescenceThicknessMap&&(d.iridescenceThicknessMap.value=m.iridescenceThicknessMap,t(m.iridescenceThicknessMap,d.iridescenceThicknessMapTransform))),m.transmission>0&&(d.transmission.value=m.transmission,d.transmissionSamplerMap.value=x.texture,d.transmissionSamplerSize.value.set(x.width,x.height),m.transmissionMap&&(d.transmissionMap.value=m.transmissionMap,t(m.transmissionMap,d.transmissionMapTransform)),d.thickness.value=m.thickness,m.thicknessMap&&(d.thicknessMap.value=m.thicknessMap,t(m.thicknessMap,d.thicknessMapTransform)),d.attenuationDistance.value=m.attenuationDistance,d.attenuationColor.value.copy(m.attenuationColor)),m.anisotropy>0&&(d.anisotropyVector.value.set(m.anisotropy*Math.cos(m.anisotropyRotation),m.anisotropy*Math.sin(m.anisotropyRotation)),m.anisotropyMap&&(d.anisotropyMap.value=m.anisotropyMap,t(m.anisotropyMap,d.anisotropyMapTransform))),d.specularIntensity.value=m.specularIntensity,d.specularColor.value.copy(m.specularColor),m.specularColorMap&&(d.specularColorMap.value=m.specularColorMap,t(m.specularColorMap,d.specularColorMapTransform)),m.specularIntensityMap&&(d.specularIntensityMap.value=m.specularIntensityMap,t(m.specularIntensityMap,d.specularIntensityMapTransform))}function p(d,m){m.matcap&&(d.matcap.value=m.matcap)}function g(d,m){const x=e.get(m).light;d.referencePosition.value.setFromMatrixPosition(x.matrixWorld),d.nearDistance.value=x.shadow.camera.near,d.farDistance.value=x.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:i}}function yx(r,e,t,n){let i={},s={},o=[];const c=r.getParameter(r.MAX_UNIFORM_BUFFER_BINDINGS);function l(x,v){const y=v.program;n.uniformBlockBinding(x,y)}function a(x,v){let y=i[x.id];y===void 0&&(p(x),y=h(x),i[x.id]=y,x.addEventListener("dispose",d));const b=v.program;n.updateUBOMapping(x,b);const S=e.render.frame;s[x.id]!==S&&(f(x),s[x.id]=S)}function h(x){const v=u();x.__bindingPointIndex=v;const y=r.createBuffer(),b=x.__size,S=x.usage;return r.bindBuffer(r.UNIFORM_BUFFER,y),r.bufferData(r.UNIFORM_BUFFER,b,S),r.bindBuffer(r.UNIFORM_BUFFER,null),r.bindBufferBase(r.UNIFORM_BUFFER,v,y),y}function u(){for(let x=0;x<c;x++)if(o.indexOf(x)===-1)return o.push(x),x;return ke("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(x){const v=i[x.id],y=x.uniforms,b=x.__cache;r.bindBuffer(r.UNIFORM_BUFFER,v);for(let S=0,w=y.length;S<w;S++){const M=Array.isArray(y[S])?y[S]:[y[S]];for(let T=0,R=M.length;T<R;T++){const P=M[T];if(_(P,S,T,b)===!0){const D=P.__offset,U=Array.isArray(P.value)?P.value:[P.value];let k=0;for(let N=0;N<U.length;N++){const O=U[N],z=g(O);typeof O=="number"||typeof O=="boolean"?(P.__data[0]=O,r.bufferSubData(r.UNIFORM_BUFFER,D+k,P.__data)):O.isMatrix3?(P.__data[0]=O.elements[0],P.__data[1]=O.elements[1],P.__data[2]=O.elements[2],P.__data[3]=0,P.__data[4]=O.elements[3],P.__data[5]=O.elements[4],P.__data[6]=O.elements[5],P.__data[7]=0,P.__data[8]=O.elements[6],P.__data[9]=O.elements[7],P.__data[10]=O.elements[8],P.__data[11]=0):ArrayBuffer.isView(O)?P.__data.set(new O.constructor(O.buffer,O.byteOffset,P.__data.length)):(O.toArray(P.__data,k),k+=z.storage/Float32Array.BYTES_PER_ELEMENT)}r.bufferSubData(r.UNIFORM_BUFFER,D,P.__data)}}}r.bindBuffer(r.UNIFORM_BUFFER,null)}function _(x,v,y,b){const S=x.value,w=v+"_"+y;if(b[w]===void 0)return typeof S=="number"||typeof S=="boolean"?b[w]=S:ArrayBuffer.isView(S)?b[w]=S.slice():b[w]=S.clone(),!0;{const M=b[w];if(typeof S=="number"||typeof S=="boolean"){if(M!==S)return b[w]=S,!0}else{if(ArrayBuffer.isView(S))return!0;if(M.equals(S)===!1)return M.copy(S),!0}}return!1}function p(x){const v=x.uniforms;let y=0;const b=16;for(let w=0,M=v.length;w<M;w++){const T=Array.isArray(v[w])?v[w]:[v[w]];for(let R=0,P=T.length;R<P;R++){const D=T[R],U=Array.isArray(D.value)?D.value:[D.value];for(let k=0,N=U.length;k<N;k++){const O=U[k],z=g(O),j=y%b,se=j%z.boundary,me=j+se;y+=se,me!==0&&b-me<z.storage&&(y+=b-me),D.__data=new Float32Array(z.storage/Float32Array.BYTES_PER_ELEMENT),D.__offset=y,y+=z.storage}}}const S=y%b;return S>0&&(y+=b-S),x.__size=y,x.__cache={},this}function g(x){const v={boundary:0,storage:0};return typeof x=="number"||typeof x=="boolean"?(v.boundary=4,v.storage=4):x.isVector2?(v.boundary=8,v.storage=8):x.isVector3||x.isColor?(v.boundary=16,v.storage=12):x.isVector4?(v.boundary=16,v.storage=16):x.isMatrix3?(v.boundary=48,v.storage=48):x.isMatrix4?(v.boundary=64,v.storage=64):x.isTexture?Ue("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(x)?(v.boundary=16,v.storage=x.byteLength):Ue("WebGLRenderer: Unsupported uniform value type.",x),v}function d(x){const v=x.target;v.removeEventListener("dispose",d);const y=o.indexOf(v.__bindingPointIndex);o.splice(y,1),r.deleteBuffer(i[v.id]),delete i[v.id],delete s[v.id]}function m(){for(const x in i)r.deleteBuffer(i[x]);o=[],i={},s={}}return{bind:l,update:a,dispose:m}}const Mx=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let In=null;function Sx(){return In===null&&(In=new jc(Mx,16,16,zi,sn),In.name="DFG_LUT",In.minFilter=Vt,In.magFilter=Vt,In.wrapS=On,In.wrapT=On,In.generateMipmaps=!1,In.needsUpdate=!0),In}class bx{constructor(e={}){const{canvas:t=md(),context:n=null,depth:i=!0,stencil:s=!1,alpha:o=!1,antialias:c=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:a=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reversedDepthBuffer:f=!1,outputBufferType:_=ln}=e;this.isWebGLRenderer=!0;let p;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");p=n.getContextAttributes().alpha}else p=o;const g=_,d=new Set([Vc,Gc,kc]),m=new Set([ln,Hn,or,ar,Oc,Bc]),x=new Uint32Array(4),v=new Int32Array(4),y=new L;let b=null,S=null;const w=[],M=[];let T=null;this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Vn,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const R=this;let P=!1,D=null;this._outputColorSpace=Tt;let U=0,k=0,N=null,O=-1,z=null;const j=new xt,se=new xt;let me=null;const Ee=new Se(0);let De=0,nt=t.width,lt=t.height,je=1,Z=null,ye=null;const le=new xt(0,0,nt,lt),Fe=new xt(0,0,nt,lt);let He=!1;const Ge=new Zc;let ht=!1,We=!1;const Q=new Ke,oe=new L,te=new xt,be={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let ge=!1;function Xe(){return N===null?je:1}let I=n;function Je(A,B){return t.getContext(A,B)}try{const A={alpha:!0,depth:i,stencil:s,antialias:c,premultipliedAlpha:l,preserveDrawingBuffer:a,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Cc}`),t.addEventListener("webglcontextlost",ie,!1),t.addEventListener("webglcontextrestored",Oe,!1),t.addEventListener("webglcontextcreationerror",Qe,!1),I===null){const B="webgl2";if(I=Je(B,A),I===null)throw Je(B)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(A){throw ke("WebGLRenderer: "+A.message),A}let Ie,qe,ae,dt,C,E,V,K,ne,ce,fe,q,J,Te,Pe,de,he,Ze,it,ft,F,ue,Y;function Re(){Ie=new S2(I),Ie.init(),F=new dx(I,Ie),qe=new p2(I,Ie,e,F),ae=new ux(I,Ie),qe.reversedDepthBuffer&&f&&ae.buffers.depth.setReversed(!0),dt=new T2(I),C=new Z_,E=new fx(I,Ie,ae,C,qe,F,dt),V=new M2(R),K=new C0(I),ue=new f2(I,K),ne=new b2(I,K,dt,ue),ce=new A2(I,ne,K,ue,dt),Ze=new E2(I,qe,E),Pe=new m2(C),fe=new J_(R,V,Ie,qe,ue,Pe),q=new vx(R,C),J=new Q_,Te=new rx(Ie),he=new u2(R,V,ae,ce,p,l),de=new hx(R,ce,qe),Y=new yx(I,dt,qe,ae),it=new d2(I,Ie,dt),ft=new w2(I,Ie,dt),dt.programs=fe.programs,R.capabilities=qe,R.extensions=Ie,R.properties=C,R.renderLists=J,R.shadowMap=de,R.state=ae,R.info=dt}Re(),g!==ln&&(T=new C2(g,t.width,t.height,i,s));const pe=new _x(R,I);this.xr=pe,this.getContext=function(){return I},this.getContextAttributes=function(){return I.getContextAttributes()},this.forceContextLoss=function(){const A=Ie.get("WEBGL_lose_context");A&&A.loseContext()},this.forceContextRestore=function(){const A=Ie.get("WEBGL_lose_context");A&&A.restoreContext()},this.getPixelRatio=function(){return je},this.setPixelRatio=function(A){A!==void 0&&(je=A,this.setSize(nt,lt,!1))},this.getSize=function(A){return A.set(nt,lt)},this.setSize=function(A,B,X=!0){if(pe.isPresenting){Ue("WebGLRenderer: Can't change size while VR device is presenting.");return}nt=A,lt=B,t.width=Math.floor(A*je),t.height=Math.floor(B*je),X===!0&&(t.style.width=A+"px",t.style.height=B+"px"),T!==null&&T.setSize(t.width,t.height),this.setViewport(0,0,A,B)},this.getDrawingBufferSize=function(A){return A.set(nt*je,lt*je).floor()},this.setDrawingBufferSize=function(A,B,X){nt=A,lt=B,je=X,t.width=Math.floor(A*X),t.height=Math.floor(B*X),this.setViewport(0,0,A,B)},this.setEffects=function(A){if(g===ln){ke("THREE.WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(A){for(let B=0;B<A.length;B++)if(A[B].isOutputPass===!0){Ue("THREE.WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}T.setEffects(A||[])},this.getCurrentViewport=function(A){return A.copy(j)},this.getViewport=function(A){return A.copy(le)},this.setViewport=function(A,B,X,H){A.isVector4?le.set(A.x,A.y,A.z,A.w):le.set(A,B,X,H),ae.viewport(j.copy(le).multiplyScalar(je).round())},this.getScissor=function(A){return A.copy(Fe)},this.setScissor=function(A,B,X,H){A.isVector4?Fe.set(A.x,A.y,A.z,A.w):Fe.set(A,B,X,H),ae.scissor(se.copy(Fe).multiplyScalar(je).round())},this.getScissorTest=function(){return He},this.setScissorTest=function(A){ae.setScissorTest(He=A)},this.setOpaqueSort=function(A){Z=A},this.setTransparentSort=function(A){ye=A},this.getClearColor=function(A){return A.copy(he.getClearColor())},this.setClearColor=function(){he.setClearColor(...arguments)},this.getClearAlpha=function(){return he.getClearAlpha()},this.setClearAlpha=function(){he.setClearAlpha(...arguments)},this.clear=function(A=!0,B=!0,X=!0){let H=0;if(A){let W=!1;if(N!==null){const we=N.texture.format;W=d.has(we)}if(W){const we=N.texture.type,Le=m.has(we),Me=he.getClearColor(),Ne=he.getClearAlpha(),Be=Me.r,et=Me.g,rt=Me.b;Le?(x[0]=Be,x[1]=et,x[2]=rt,x[3]=Ne,I.clearBufferuiv(I.COLOR,0,x)):(v[0]=Be,v[1]=et,v[2]=rt,v[3]=Ne,I.clearBufferiv(I.COLOR,0,v))}else H|=I.COLOR_BUFFER_BIT}B&&(H|=I.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),X&&(H|=I.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),H!==0&&I.clear(H)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(A){A.setRenderer(this),D=A},this.dispose=function(){t.removeEventListener("webglcontextlost",ie,!1),t.removeEventListener("webglcontextrestored",Oe,!1),t.removeEventListener("webglcontextcreationerror",Qe,!1),he.dispose(),J.dispose(),Te.dispose(),C.dispose(),V.dispose(),ce.dispose(),ue.dispose(),Y.dispose(),fe.dispose(),pe.dispose(),pe.removeEventListener("sessionstart",dl),pe.removeEventListener("sessionend",pl),Ei.stop()};function ie(A){A.preventDefault(),xo("WebGLRenderer: Context Lost."),P=!0}function Oe(){xo("WebGLRenderer: Context Restored."),P=!1;const A=dt.autoReset,B=de.enabled,X=de.autoUpdate,H=de.needsUpdate,W=de.type;Re(),dt.autoReset=A,de.enabled=B,de.autoUpdate=X,de.needsUpdate=H,de.type=W}function Qe(A){ke("WebGLRenderer: A WebGL context could not be created. Reason: ",A.statusMessage)}function Pt(A){const B=A.target;B.removeEventListener("dispose",Pt),vt(B)}function vt(A){Yn(A),C.remove(A)}function Yn(A){const B=C.get(A).programs;B!==void 0&&(B.forEach(function(X){fe.releaseProgram(X)}),A.isShaderMaterial&&fe.releaseShaderCache(A))}this.renderBufferDirect=function(A,B,X,H,W,we){B===null&&(B=be);const Le=W.isMesh&&W.matrixWorld.determinant()<0,Me=_f(A,B,X,H,W);ae.setMaterial(H,Le);let Ne=X.index,Be=1;if(H.wireframe===!0){if(Ne=ne.getWireframeAttribute(X),Ne===void 0)return;Be=2}const et=X.drawRange,rt=X.attributes.position;let ze=et.start*Be,yt=(et.start+et.count)*Be;we!==null&&(ze=Math.max(ze,we.start*Be),yt=Math.min(yt,(we.start+we.count)*Be)),Ne!==null?(ze=Math.max(ze,0),yt=Math.min(yt,Ne.count)):rt!=null&&(ze=Math.max(ze,0),yt=Math.min(yt,rt.count));const Lt=yt-ze;if(Lt<0||Lt===1/0)return;ue.setup(W,H,Me,X,Ne);let Rt,Mt=it;if(Ne!==null&&(Rt=K.get(Ne),Mt=ft,Mt.setIndex(Rt)),W.isMesh)H.wireframe===!0?(ae.setLineWidth(H.wireframeLinewidth*Xe()),Mt.setMode(I.LINES)):Mt.setMode(I.TRIANGLES);else if(W.isLine){let Kt=H.linewidth;Kt===void 0&&(Kt=1),ae.setLineWidth(Kt*Xe()),W.isLineSegments?Mt.setMode(I.LINES):W.isLineLoop?Mt.setMode(I.LINE_LOOP):Mt.setMode(I.LINE_STRIP)}else W.isPoints?Mt.setMode(I.POINTS):W.isSprite&&Mt.setMode(I.TRIANGLES);if(W.isBatchedMesh)if(Ie.get("WEBGL_multi_draw"))Mt.renderMultiDraw(W._multiDrawStarts,W._multiDrawCounts,W._multiDrawCount);else{const Kt=W._multiDrawStarts,Ce=W._multiDrawCounts,on=W._multiDrawCount,ut=Ne?K.get(Ne).bytesPerElement:1,pn=C.get(H).currentProgram.getUniforms();for(let Ln=0;Ln<on;Ln++)pn.setValue(I,"_gl_DrawID",Ln),Mt.render(Kt[Ln]/ut,Ce[Ln])}else if(W.isInstancedMesh)Mt.renderInstances(ze,Lt,W.count);else if(X.isInstancedBufferGeometry){const Kt=X._maxInstanceCount!==void 0?X._maxInstanceCount:1/0,Ce=Math.min(X.instanceCount,Kt);Mt.renderInstances(ze,Lt,Ce)}else Mt.render(ze,Lt)};function Pn(A,B,X){A.transparent===!0&&A.side===Ct&&A.forceSinglePass===!1?(A.side=Zt,A.needsUpdate=!0,br(A,B,X),A.side=ai,A.needsUpdate=!0,br(A,B,X),A.side=Ct):br(A,B,X)}this.compile=function(A,B,X=null){X===null&&(X=A),S=Te.get(X),S.init(B),M.push(S),X.traverseVisible(function(W){W.isLight&&W.layers.test(B.layers)&&(S.pushLight(W),W.castShadow&&S.pushShadow(W))}),A!==X&&A.traverseVisible(function(W){W.isLight&&W.layers.test(B.layers)&&(S.pushLight(W),W.castShadow&&S.pushShadow(W))}),S.setupLights();const H=new Set;return A.traverse(function(W){if(!(W.isMesh||W.isPoints||W.isLine||W.isSprite))return;const we=W.material;if(we)if(Array.isArray(we))for(let Le=0;Le<we.length;Le++){const Me=we[Le];Pn(Me,X,W),H.add(Me)}else Pn(we,X,W),H.add(we)}),S=M.pop(),H},this.compileAsync=function(A,B,X=null){const H=this.compile(A,B,X);return new Promise(W=>{function we(){if(H.forEach(function(Le){C.get(Le).currentProgram.isReady()&&H.delete(Le)}),H.size===0){W(A);return}setTimeout(we,10)}Ie.get("KHR_parallel_shader_compile")!==null?we():setTimeout(we,10)})};let Lo=null;function mf(A){Lo&&Lo(A)}function dl(){Ei.stop()}function pl(){Ei.start()}const Ei=new ju;Ei.setAnimationLoop(mf),typeof self<"u"&&Ei.setContext(self),this.setAnimationLoop=function(A){Lo=A,pe.setAnimationLoop(A),A===null?Ei.stop():Ei.start()},pe.addEventListener("sessionstart",dl),pe.addEventListener("sessionend",pl),this.render=function(A,B){if(B!==void 0&&B.isCamera!==!0){ke("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(P===!0)return;D!==null&&D.renderStart(A,B);const X=pe.enabled===!0&&pe.isPresenting===!0,H=T!==null&&(N===null||X)&&T.begin(R,N);if(A.matrixWorldAutoUpdate===!0&&A.updateMatrixWorld(),B.parent===null&&B.matrixWorldAutoUpdate===!0&&B.updateMatrixWorld(),pe.enabled===!0&&pe.isPresenting===!0&&(T===null||T.isCompositing()===!1)&&(pe.cameraAutoUpdate===!0&&pe.updateCamera(B),B=pe.getCamera()),A.isScene===!0&&A.onBeforeRender(R,A,B,N),S=Te.get(A,M.length),S.init(B),S.state.textureUnits=E.getTextureUnits(),M.push(S),Q.multiplyMatrices(B.projectionMatrix,B.matrixWorldInverse),Ge.setFromProjectionMatrix(Q,zn,B.reversedDepth),We=this.localClippingEnabled,ht=Pe.init(this.clippingPlanes,We),b=J.get(A,w.length),b.init(),w.push(b),pe.enabled===!0&&pe.isPresenting===!0){const Le=R.xr.getDepthSensingMesh();Le!==null&&Do(Le,B,-1/0,R.sortObjects)}Do(A,B,0,R.sortObjects),b.finish(),R.sortObjects===!0&&b.sort(Z,ye),ge=pe.enabled===!1||pe.isPresenting===!1||pe.hasDepthSensing()===!1,ge&&he.addToRenderList(b,A),this.info.render.frame++,ht===!0&&Pe.beginShadows();const W=S.state.shadowsArray;if(de.render(W,A,B),ht===!0&&Pe.endShadows(),this.info.autoReset===!0&&this.info.reset(),(H&&T.hasRenderPass())===!1){const Le=b.opaque,Me=b.transmissive;if(S.setupLights(),B.isArrayCamera){const Ne=B.cameras;if(Me.length>0)for(let Be=0,et=Ne.length;Be<et;Be++){const rt=Ne[Be];gl(Le,Me,A,rt)}ge&&he.render(A);for(let Be=0,et=Ne.length;Be<et;Be++){const rt=Ne[Be];ml(b,A,rt,rt.viewport)}}else Me.length>0&&gl(Le,Me,A,B),ge&&he.render(A),ml(b,A,B)}N!==null&&k===0&&(E.updateMultisampleRenderTarget(N),E.updateRenderTargetMipmap(N)),H&&T.end(R),A.isScene===!0&&A.onAfterRender(R,A,B),ue.resetDefaultState(),O=-1,z=null,M.pop(),M.length>0?(S=M[M.length-1],E.setTextureUnits(S.state.textureUnits),ht===!0&&Pe.setGlobalState(R.clippingPlanes,S.state.camera)):S=null,w.pop(),w.length>0?b=w[w.length-1]:b=null,D!==null&&D.renderEnd()};function Do(A,B,X,H){if(A.visible===!1)return;if(A.layers.test(B.layers)){if(A.isGroup)X=A.renderOrder;else if(A.isLOD)A.autoUpdate===!0&&A.update(B);else if(A.isLightProbeGrid)S.pushLightProbeGrid(A);else if(A.isLight)S.pushLight(A),A.castShadow&&S.pushShadow(A);else if(A.isSprite){if(!A.frustumCulled||Ge.intersectsSprite(A)){H&&te.setFromMatrixPosition(A.matrixWorld).applyMatrix4(Q);const Le=ce.update(A),Me=A.material;Me.visible&&b.push(A,Le,Me,X,te.z,null)}}else if((A.isMesh||A.isLine||A.isPoints)&&(!A.frustumCulled||Ge.intersectsObject(A))){const Le=ce.update(A),Me=A.material;if(H&&(A.boundingSphere!==void 0?(A.boundingSphere===null&&A.computeBoundingSphere(),te.copy(A.boundingSphere.center)):(Le.boundingSphere===null&&Le.computeBoundingSphere(),te.copy(Le.boundingSphere.center)),te.applyMatrix4(A.matrixWorld).applyMatrix4(Q)),Array.isArray(Me)){const Ne=Le.groups;for(let Be=0,et=Ne.length;Be<et;Be++){const rt=Ne[Be],ze=Me[rt.materialIndex];ze&&ze.visible&&b.push(A,Le,ze,X,te.z,rt)}}else Me.visible&&b.push(A,Le,Me,X,te.z,null)}}const we=A.children;for(let Le=0,Me=we.length;Le<Me;Le++)Do(we[Le],B,X,H)}function ml(A,B,X,H){const{opaque:W,transmissive:we,transparent:Le}=A;S.setupLightsView(X),ht===!0&&Pe.setGlobalState(R.clippingPlanes,X),H&&ae.viewport(j.copy(H)),W.length>0&&Sr(W,B,X),we.length>0&&Sr(we,B,X),Le.length>0&&Sr(Le,B,X),ae.buffers.depth.setTest(!0),ae.buffers.depth.setMask(!0),ae.buffers.color.setMask(!0),ae.setPolygonOffset(!1)}function gl(A,B,X,H){if((X.isScene===!0?X.overrideMaterial:null)!==null)return;if(S.state.transmissionRenderTarget[H.id]===void 0){const ze=Ie.has("EXT_color_buffer_half_float")||Ie.has("EXT_color_buffer_float");S.state.transmissionRenderTarget[H.id]=new nn(1,1,{generateMipmaps:!0,type:ze?sn:ln,minFilter:Bn,samples:Math.max(4,qe.samples),stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:at.workingColorSpace})}const we=S.state.transmissionRenderTarget[H.id],Le=H.viewport||j;we.setSize(Le.z*R.transmissionResolutionScale,Le.w*R.transmissionResolutionScale);const Me=R.getRenderTarget(),Ne=R.getActiveCubeFace(),Be=R.getActiveMipmapLevel();R.setRenderTarget(we),R.getClearColor(Ee),De=R.getClearAlpha(),De<1&&R.setClearColor(16777215,.5),R.clear(),ge&&he.render(X);const et=R.toneMapping;R.toneMapping=Vn;const rt=H.viewport;if(H.viewport!==void 0&&(H.viewport=void 0),S.setupLightsView(H),ht===!0&&Pe.setGlobalState(R.clippingPlanes,H),Sr(A,X,H),E.updateMultisampleRenderTarget(we),E.updateRenderTargetMipmap(we),Ie.has("WEBGL_multisampled_render_to_texture")===!1){let ze=!1;for(let yt=0,Lt=B.length;yt<Lt;yt++){const Rt=B[yt],{object:Mt,geometry:Kt,material:Ce,group:on}=Rt;if(Ce.side===Ct&&Mt.layers.test(H.layers)){const ut=Ce.side;Ce.side=Zt,Ce.needsUpdate=!0,_l(Mt,X,H,Kt,Ce,on),Ce.side=ut,Ce.needsUpdate=!0,ze=!0}}ze===!0&&(E.updateMultisampleRenderTarget(we),E.updateRenderTargetMipmap(we))}R.setRenderTarget(Me,Ne,Be),R.setClearColor(Ee,De),rt!==void 0&&(H.viewport=rt),R.toneMapping=et}function Sr(A,B,X){const H=B.isScene===!0?B.overrideMaterial:null;for(let W=0,we=A.length;W<we;W++){const Le=A[W],{object:Me,geometry:Ne,group:Be}=Le;let et=Le.material;et.allowOverride===!0&&H!==null&&(et=H),Me.layers.test(X.layers)&&_l(Me,B,X,Ne,et,Be)}}function _l(A,B,X,H,W,we){A.onBeforeRender(R,B,X,H,W,we),A.modelViewMatrix.multiplyMatrices(X.matrixWorldInverse,A.matrixWorld),A.normalMatrix.getNormalMatrix(A.modelViewMatrix),W.onBeforeRender(R,B,X,H,A,we),W.transparent===!0&&W.side===Ct&&W.forceSinglePass===!1?(W.side=Zt,W.needsUpdate=!0,R.renderBufferDirect(X,B,H,W,A,we),W.side=ai,W.needsUpdate=!0,R.renderBufferDirect(X,B,H,W,A,we),W.side=Ct):R.renderBufferDirect(X,B,H,W,A,we),A.onAfterRender(R,B,X,H,W,we)}function br(A,B,X){B.isScene!==!0&&(B=be);const H=C.get(A),W=S.state.lights,we=S.state.shadowsArray,Le=W.state.version,Me=fe.getParameters(A,W.state,we,B,X,S.state.lightProbeGridArray),Ne=fe.getProgramCacheKey(Me);let Be=H.programs;H.environment=A.isMeshStandardMaterial||A.isMeshLambertMaterial||A.isMeshPhongMaterial?B.environment:null,H.fog=B.fog;const et=A.isMeshStandardMaterial||A.isMeshLambertMaterial&&!A.envMap||A.isMeshPhongMaterial&&!A.envMap;H.envMap=V.get(A.envMap||H.environment,et),H.envMapRotation=H.environment!==null&&A.envMap===null?B.environmentRotation:A.envMapRotation,Be===void 0&&(A.addEventListener("dispose",Pt),Be=new Map,H.programs=Be);let rt=Be.get(Ne);if(rt!==void 0){if(H.currentProgram===rt&&H.lightsStateVersion===Le)return vl(A,Me),rt}else Me.uniforms=fe.getUniforms(A),D!==null&&A.isNodeMaterial&&D.build(A,X,Me),A.onBeforeCompile(Me,R),rt=fe.acquireProgram(Me,Ne),Be.set(Ne,rt),H.uniforms=Me.uniforms;const ze=H.uniforms;return(!A.isShaderMaterial&&!A.isRawShaderMaterial||A.clipping===!0)&&(ze.clippingPlanes=Pe.uniform),vl(A,Me),H.needsLights=vf(A),H.lightsStateVersion=Le,H.needsLights&&(ze.ambientLightColor.value=W.state.ambient,ze.lightProbe.value=W.state.probe,ze.directionalLights.value=W.state.directional,ze.directionalLightShadows.value=W.state.directionalShadow,ze.spotLights.value=W.state.spot,ze.spotLightShadows.value=W.state.spotShadow,ze.rectAreaLights.value=W.state.rectArea,ze.ltc_1.value=W.state.rectAreaLTC1,ze.ltc_2.value=W.state.rectAreaLTC2,ze.pointLights.value=W.state.point,ze.pointLightShadows.value=W.state.pointShadow,ze.hemisphereLights.value=W.state.hemi,ze.directionalShadowMatrix.value=W.state.directionalShadowMatrix,ze.spotLightMatrix.value=W.state.spotLightMatrix,ze.spotLightMap.value=W.state.spotLightMap,ze.pointShadowMatrix.value=W.state.pointShadowMatrix),H.lightProbeGrid=S.state.lightProbeGridArray.length>0,H.currentProgram=rt,H.uniformsList=null,rt}function xl(A){if(A.uniformsList===null){const B=A.currentProgram.getUniforms();A.uniformsList=ho.seqWithValue(B.seq,A.uniforms)}return A.uniformsList}function vl(A,B){const X=C.get(A);X.outputColorSpace=B.outputColorSpace,X.batching=B.batching,X.batchingColor=B.batchingColor,X.instancing=B.instancing,X.instancingColor=B.instancingColor,X.instancingMorph=B.instancingMorph,X.skinning=B.skinning,X.morphTargets=B.morphTargets,X.morphNormals=B.morphNormals,X.morphColors=B.morphColors,X.morphTargetsCount=B.morphTargetsCount,X.numClippingPlanes=B.numClippingPlanes,X.numIntersection=B.numClipIntersection,X.vertexAlphas=B.vertexAlphas,X.vertexTangents=B.vertexTangents,X.toneMapping=B.toneMapping}function gf(A,B){if(A.length===0)return null;if(A.length===1)return A[0].texture!==null?A[0]:null;y.setFromMatrixPosition(B.matrixWorld);for(let X=0,H=A.length;X<H;X++){const W=A[X];if(W.texture!==null&&W.boundingBox.containsPoint(y))return W}return null}function _f(A,B,X,H,W){B.isScene!==!0&&(B=be),E.resetTextureUnits();const we=B.fog,Le=H.isMeshStandardMaterial||H.isMeshLambertMaterial||H.isMeshPhongMaterial?B.environment:null,Me=N===null?R.outputColorSpace:N.isXRRenderTarget===!0?N.texture.colorSpace:at.workingColorSpace,Ne=H.isMeshStandardMaterial||H.isMeshLambertMaterial&&!H.envMap||H.isMeshPhongMaterial&&!H.envMap,Be=V.get(H.envMap||Le,Ne),et=H.vertexColors===!0&&!!X.attributes.color&&X.attributes.color.itemSize===4,rt=!!X.attributes.tangent&&(!!H.normalMap||H.anisotropy>0),ze=!!X.morphAttributes.position,yt=!!X.morphAttributes.normal,Lt=!!X.morphAttributes.color;let Rt=Vn;H.toneMapped&&(N===null||N.isXRRenderTarget===!0)&&(Rt=R.toneMapping);const Mt=X.morphAttributes.position||X.morphAttributes.normal||X.morphAttributes.color,Kt=Mt!==void 0?Mt.length:0,Ce=C.get(H),on=S.state.lights;if(ht===!0&&(We===!0||A!==z)){const wt=A===z&&H.id===O;Pe.setState(H,A,wt)}let ut=!1;H.version===Ce.__version?(Ce.needsLights&&Ce.lightsStateVersion!==on.state.version||Ce.outputColorSpace!==Me||W.isBatchedMesh&&Ce.batching===!1||!W.isBatchedMesh&&Ce.batching===!0||W.isBatchedMesh&&Ce.batchingColor===!0&&W.colorTexture===null||W.isBatchedMesh&&Ce.batchingColor===!1&&W.colorTexture!==null||W.isInstancedMesh&&Ce.instancing===!1||!W.isInstancedMesh&&Ce.instancing===!0||W.isSkinnedMesh&&Ce.skinning===!1||!W.isSkinnedMesh&&Ce.skinning===!0||W.isInstancedMesh&&Ce.instancingColor===!0&&W.instanceColor===null||W.isInstancedMesh&&Ce.instancingColor===!1&&W.instanceColor!==null||W.isInstancedMesh&&Ce.instancingMorph===!0&&W.morphTexture===null||W.isInstancedMesh&&Ce.instancingMorph===!1&&W.morphTexture!==null||Ce.envMap!==Be||H.fog===!0&&Ce.fog!==we||Ce.numClippingPlanes!==void 0&&(Ce.numClippingPlanes!==Pe.numPlanes||Ce.numIntersection!==Pe.numIntersection)||Ce.vertexAlphas!==et||Ce.vertexTangents!==rt||Ce.morphTargets!==ze||Ce.morphNormals!==yt||Ce.morphColors!==Lt||Ce.toneMapping!==Rt||Ce.morphTargetsCount!==Kt||!!Ce.lightProbeGrid!=S.state.lightProbeGridArray.length>0)&&(ut=!0):(ut=!0,Ce.__version=H.version);let pn=Ce.currentProgram;ut===!0&&(pn=br(H,B,W),D&&H.isNodeMaterial&&D.onUpdateProgram(H,pn,Ce));let Ln=!1,hi=!1,Hi=!1;const St=pn.getUniforms(),Dt=Ce.uniforms;if(ae.useProgram(pn.program)&&(Ln=!0,hi=!0,Hi=!0),H.id!==O&&(O=H.id,hi=!0),Ce.needsLights){const wt=gf(S.state.lightProbeGridArray,W);Ce.lightProbeGrid!==wt&&(Ce.lightProbeGrid=wt,hi=!0)}if(Ln||z!==A){ae.buffers.depth.getReversed()&&A.reversedDepth!==!0&&(A._reversedDepth=!0,A.updateProjectionMatrix()),St.setValue(I,"projectionMatrix",A.projectionMatrix),St.setValue(I,"viewMatrix",A.matrixWorldInverse);const fi=St.map.cameraPosition;fi!==void 0&&fi.setValue(I,oe.setFromMatrixPosition(A.matrixWorld)),qe.logarithmicDepthBuffer&&St.setValue(I,"logDepthBufFC",2/(Math.log(A.far+1)/Math.LN2)),(H.isMeshPhongMaterial||H.isMeshToonMaterial||H.isMeshLambertMaterial||H.isMeshBasicMaterial||H.isMeshStandardMaterial||H.isShaderMaterial)&&St.setValue(I,"isOrthographic",A.isOrthographicCamera===!0),z!==A&&(z=A,hi=!0,Hi=!0)}if(Ce.needsLights&&(on.state.directionalShadowMap.length>0&&St.setValue(I,"directionalShadowMap",on.state.directionalShadowMap,E),on.state.spotShadowMap.length>0&&St.setValue(I,"spotShadowMap",on.state.spotShadowMap,E),on.state.pointShadowMap.length>0&&St.setValue(I,"pointShadowMap",on.state.pointShadowMap,E)),W.isSkinnedMesh){St.setOptional(I,W,"bindMatrix"),St.setOptional(I,W,"bindMatrixInverse");const wt=W.skeleton;wt&&(wt.boneTexture===null&&wt.computeBoneTexture(),St.setValue(I,"boneTexture",wt.boneTexture,E))}W.isBatchedMesh&&(St.setOptional(I,W,"batchingTexture"),St.setValue(I,"batchingTexture",W._matricesTexture,E),St.setOptional(I,W,"batchingIdTexture"),St.setValue(I,"batchingIdTexture",W._indirectTexture,E),St.setOptional(I,W,"batchingColorTexture"),W._colorsTexture!==null&&St.setValue(I,"batchingColorTexture",W._colorsTexture,E));const ui=X.morphAttributes;if((ui.position!==void 0||ui.normal!==void 0||ui.color!==void 0)&&Ze.update(W,X,pn),(hi||Ce.receiveShadow!==W.receiveShadow)&&(Ce.receiveShadow=W.receiveShadow,St.setValue(I,"receiveShadow",W.receiveShadow)),(H.isMeshStandardMaterial||H.isMeshLambertMaterial||H.isMeshPhongMaterial)&&H.envMap===null&&B.environment!==null&&(Dt.envMapIntensity.value=B.environmentIntensity),Dt.dfgLUT!==void 0&&(Dt.dfgLUT.value=Sx()),hi){if(St.setValue(I,"toneMappingExposure",R.toneMappingExposure),Ce.needsLights&&xf(Dt,Hi),we&&H.fog===!0&&q.refreshFogUniforms(Dt,we),q.refreshMaterialUniforms(Dt,H,je,lt,S.state.transmissionRenderTarget[A.id]),Ce.needsLights&&Ce.lightProbeGrid){const wt=Ce.lightProbeGrid;Dt.probesSH.value=wt.texture,Dt.probesMin.value.copy(wt.boundingBox.min),Dt.probesMax.value.copy(wt.boundingBox.max),Dt.probesResolution.value.copy(wt.resolution)}ho.upload(I,xl(Ce),Dt,E)}if(H.isShaderMaterial&&H.uniformsNeedUpdate===!0&&(ho.upload(I,xl(Ce),Dt,E),H.uniformsNeedUpdate=!1),H.isSpriteMaterial&&St.setValue(I,"center",W.center),St.setValue(I,"modelViewMatrix",W.modelViewMatrix),St.setValue(I,"normalMatrix",W.normalMatrix),St.setValue(I,"modelMatrix",W.matrixWorld),H.uniformsGroups!==void 0){const wt=H.uniformsGroups;for(let fi=0,Wi=wt.length;fi<Wi;fi++){const yl=wt[fi];Y.update(yl,pn),Y.bind(yl,pn)}}return pn}function xf(A,B){A.ambientLightColor.needsUpdate=B,A.lightProbe.needsUpdate=B,A.directionalLights.needsUpdate=B,A.directionalLightShadows.needsUpdate=B,A.pointLights.needsUpdate=B,A.pointLightShadows.needsUpdate=B,A.spotLights.needsUpdate=B,A.spotLightShadows.needsUpdate=B,A.rectAreaLights.needsUpdate=B,A.hemisphereLights.needsUpdate=B}function vf(A){return A.isMeshLambertMaterial||A.isMeshToonMaterial||A.isMeshPhongMaterial||A.isMeshStandardMaterial||A.isShadowMaterial||A.isShaderMaterial&&A.lights===!0}this.getActiveCubeFace=function(){return U},this.getActiveMipmapLevel=function(){return k},this.getRenderTarget=function(){return N},this.setRenderTargetTextures=function(A,B,X){const H=C.get(A);H.__autoAllocateDepthBuffer=A.resolveDepthBuffer===!1,H.__autoAllocateDepthBuffer===!1&&(H.__useRenderToTexture=!1),C.get(A.texture).__webglTexture=B,C.get(A.depthTexture).__webglTexture=H.__autoAllocateDepthBuffer?void 0:X,H.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(A,B){const X=C.get(A);X.__webglFramebuffer=B,X.__useDefaultFramebuffer=B===void 0};const yf=I.createFramebuffer();this.setRenderTarget=function(A,B=0,X=0){N=A,U=B,k=X;let H=null,W=!1,we=!1;if(A){const Me=C.get(A);if(Me.__useDefaultFramebuffer!==void 0){ae.bindFramebuffer(I.FRAMEBUFFER,Me.__webglFramebuffer),j.copy(A.viewport),se.copy(A.scissor),me=A.scissorTest,ae.viewport(j),ae.scissor(se),ae.setScissorTest(me),O=-1;return}else if(Me.__webglFramebuffer===void 0)E.setupRenderTarget(A);else if(Me.__hasExternalTextures)E.rebindTextures(A,C.get(A.texture).__webglTexture,C.get(A.depthTexture).__webglTexture);else if(A.depthBuffer){const et=A.depthTexture;if(Me.__boundDepthTexture!==et){if(et!==null&&C.has(et)&&(A.width!==et.image.width||A.height!==et.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");E.setupDepthRenderbuffer(A)}}const Ne=A.texture;(Ne.isData3DTexture||Ne.isDataArrayTexture||Ne.isCompressedArrayTexture)&&(we=!0);const Be=C.get(A).__webglFramebuffer;A.isWebGLCubeRenderTarget?(Array.isArray(Be[B])?H=Be[B][X]:H=Be[B],W=!0):A.samples>0&&E.useMultisampledRTT(A)===!1?H=C.get(A).__webglMultisampledFramebuffer:Array.isArray(Be)?H=Be[X]:H=Be,j.copy(A.viewport),se.copy(A.scissor),me=A.scissorTest}else j.copy(le).multiplyScalar(je).floor(),se.copy(Fe).multiplyScalar(je).floor(),me=He;if(X!==0&&(H=yf),ae.bindFramebuffer(I.FRAMEBUFFER,H)&&ae.drawBuffers(A,H),ae.viewport(j),ae.scissor(se),ae.setScissorTest(me),W){const Me=C.get(A.texture);I.framebufferTexture2D(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_CUBE_MAP_POSITIVE_X+B,Me.__webglTexture,X)}else if(we){const Me=B;for(let Ne=0;Ne<A.textures.length;Ne++){const Be=C.get(A.textures[Ne]);I.framebufferTextureLayer(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0+Ne,Be.__webglTexture,X,Me)}}else if(A!==null&&X!==0){const Me=C.get(A.texture);I.framebufferTexture2D(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_2D,Me.__webglTexture,X)}O=-1},this.readRenderTargetPixels=function(A,B,X,H,W,we,Le,Me=0){if(!(A&&A.isWebGLRenderTarget)){ke("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ne=C.get(A).__webglFramebuffer;if(A.isWebGLCubeRenderTarget&&Le!==void 0&&(Ne=Ne[Le]),Ne){ae.bindFramebuffer(I.FRAMEBUFFER,Ne);try{const Be=A.textures[Me],et=Be.format,rt=Be.type;if(A.textures.length>1&&I.readBuffer(I.COLOR_ATTACHMENT0+Me),!qe.textureFormatReadable(et)){ke("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!qe.textureTypeReadable(rt)){ke("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}B>=0&&B<=A.width-H&&X>=0&&X<=A.height-W&&I.readPixels(B,X,H,W,F.convert(et),F.convert(rt),we)}finally{const Be=N!==null?C.get(N).__webglFramebuffer:null;ae.bindFramebuffer(I.FRAMEBUFFER,Be)}}},this.readRenderTargetPixelsAsync=async function(A,B,X,H,W,we,Le,Me=0){if(!(A&&A.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Ne=C.get(A).__webglFramebuffer;if(A.isWebGLCubeRenderTarget&&Le!==void 0&&(Ne=Ne[Le]),Ne)if(B>=0&&B<=A.width-H&&X>=0&&X<=A.height-W){ae.bindFramebuffer(I.FRAMEBUFFER,Ne);const Be=A.textures[Me],et=Be.format,rt=Be.type;if(A.textures.length>1&&I.readBuffer(I.COLOR_ATTACHMENT0+Me),!qe.textureFormatReadable(et))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!qe.textureTypeReadable(rt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const ze=I.createBuffer();I.bindBuffer(I.PIXEL_PACK_BUFFER,ze),I.bufferData(I.PIXEL_PACK_BUFFER,we.byteLength,I.STREAM_READ),I.readPixels(B,X,H,W,F.convert(et),F.convert(rt),0);const yt=N!==null?C.get(N).__webglFramebuffer:null;ae.bindFramebuffer(I.FRAMEBUFFER,yt);const Lt=I.fenceSync(I.SYNC_GPU_COMMANDS_COMPLETE,0);return I.flush(),await gd(I,Lt,4),I.bindBuffer(I.PIXEL_PACK_BUFFER,ze),I.getBufferSubData(I.PIXEL_PACK_BUFFER,0,we),I.deleteBuffer(ze),I.deleteSync(Lt),we}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(A,B=null,X=0){const H=Math.pow(2,-X),W=Math.floor(A.image.width*H),we=Math.floor(A.image.height*H),Le=B!==null?B.x:0,Me=B!==null?B.y:0;E.setTexture2D(A,0),I.copyTexSubImage2D(I.TEXTURE_2D,X,0,0,Le,Me,W,we),ae.unbindTexture()};const Mf=I.createFramebuffer(),Sf=I.createFramebuffer();this.copyTextureToTexture=function(A,B,X=null,H=null,W=0,we=0){let Le,Me,Ne,Be,et,rt,ze,yt,Lt;const Rt=A.isCompressedTexture?A.mipmaps[we]:A.image;if(X!==null)Le=X.max.x-X.min.x,Me=X.max.y-X.min.y,Ne=X.isBox3?X.max.z-X.min.z:1,Be=X.min.x,et=X.min.y,rt=X.isBox3?X.min.z:0;else{const Dt=Math.pow(2,-W);Le=Math.floor(Rt.width*Dt),Me=Math.floor(Rt.height*Dt),A.isDataArrayTexture?Ne=Rt.depth:A.isData3DTexture?Ne=Math.floor(Rt.depth*Dt):Ne=1,Be=0,et=0,rt=0}H!==null?(ze=H.x,yt=H.y,Lt=H.z):(ze=0,yt=0,Lt=0);const Mt=F.convert(B.format),Kt=F.convert(B.type);let Ce;B.isData3DTexture?(E.setTexture3D(B,0),Ce=I.TEXTURE_3D):B.isDataArrayTexture||B.isCompressedArrayTexture?(E.setTexture2DArray(B,0),Ce=I.TEXTURE_2D_ARRAY):(E.setTexture2D(B,0),Ce=I.TEXTURE_2D),ae.activeTexture(I.TEXTURE0),ae.pixelStorei(I.UNPACK_FLIP_Y_WEBGL,B.flipY),ae.pixelStorei(I.UNPACK_PREMULTIPLY_ALPHA_WEBGL,B.premultiplyAlpha),ae.pixelStorei(I.UNPACK_ALIGNMENT,B.unpackAlignment);const on=ae.getParameter(I.UNPACK_ROW_LENGTH),ut=ae.getParameter(I.UNPACK_IMAGE_HEIGHT),pn=ae.getParameter(I.UNPACK_SKIP_PIXELS),Ln=ae.getParameter(I.UNPACK_SKIP_ROWS),hi=ae.getParameter(I.UNPACK_SKIP_IMAGES);ae.pixelStorei(I.UNPACK_ROW_LENGTH,Rt.width),ae.pixelStorei(I.UNPACK_IMAGE_HEIGHT,Rt.height),ae.pixelStorei(I.UNPACK_SKIP_PIXELS,Be),ae.pixelStorei(I.UNPACK_SKIP_ROWS,et),ae.pixelStorei(I.UNPACK_SKIP_IMAGES,rt);const Hi=A.isDataArrayTexture||A.isData3DTexture,St=B.isDataArrayTexture||B.isData3DTexture;if(A.isDepthTexture){const Dt=C.get(A),ui=C.get(B),wt=C.get(Dt.__renderTarget),fi=C.get(ui.__renderTarget);ae.bindFramebuffer(I.READ_FRAMEBUFFER,wt.__webglFramebuffer),ae.bindFramebuffer(I.DRAW_FRAMEBUFFER,fi.__webglFramebuffer);for(let Wi=0;Wi<Ne;Wi++)Hi&&(I.framebufferTextureLayer(I.READ_FRAMEBUFFER,I.COLOR_ATTACHMENT0,C.get(A).__webglTexture,W,rt+Wi),I.framebufferTextureLayer(I.DRAW_FRAMEBUFFER,I.COLOR_ATTACHMENT0,C.get(B).__webglTexture,we,Lt+Wi)),I.blitFramebuffer(Be,et,Le,Me,ze,yt,Le,Me,I.DEPTH_BUFFER_BIT,I.NEAREST);ae.bindFramebuffer(I.READ_FRAMEBUFFER,null),ae.bindFramebuffer(I.DRAW_FRAMEBUFFER,null)}else if(W!==0||A.isRenderTargetTexture||C.has(A)){const Dt=C.get(A),ui=C.get(B);ae.bindFramebuffer(I.READ_FRAMEBUFFER,Mf),ae.bindFramebuffer(I.DRAW_FRAMEBUFFER,Sf);for(let wt=0;wt<Ne;wt++)Hi?I.framebufferTextureLayer(I.READ_FRAMEBUFFER,I.COLOR_ATTACHMENT0,Dt.__webglTexture,W,rt+wt):I.framebufferTexture2D(I.READ_FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_2D,Dt.__webglTexture,W),St?I.framebufferTextureLayer(I.DRAW_FRAMEBUFFER,I.COLOR_ATTACHMENT0,ui.__webglTexture,we,Lt+wt):I.framebufferTexture2D(I.DRAW_FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_2D,ui.__webglTexture,we),W!==0?I.blitFramebuffer(Be,et,Le,Me,ze,yt,Le,Me,I.COLOR_BUFFER_BIT,I.NEAREST):St?I.copyTexSubImage3D(Ce,we,ze,yt,Lt+wt,Be,et,Le,Me):I.copyTexSubImage2D(Ce,we,ze,yt,Be,et,Le,Me);ae.bindFramebuffer(I.READ_FRAMEBUFFER,null),ae.bindFramebuffer(I.DRAW_FRAMEBUFFER,null)}else St?A.isDataTexture||A.isData3DTexture?I.texSubImage3D(Ce,we,ze,yt,Lt,Le,Me,Ne,Mt,Kt,Rt.data):B.isCompressedArrayTexture?I.compressedTexSubImage3D(Ce,we,ze,yt,Lt,Le,Me,Ne,Mt,Rt.data):I.texSubImage3D(Ce,we,ze,yt,Lt,Le,Me,Ne,Mt,Kt,Rt):A.isDataTexture?I.texSubImage2D(I.TEXTURE_2D,we,ze,yt,Le,Me,Mt,Kt,Rt.data):A.isCompressedTexture?I.compressedTexSubImage2D(I.TEXTURE_2D,we,ze,yt,Rt.width,Rt.height,Mt,Rt.data):I.texSubImage2D(I.TEXTURE_2D,we,ze,yt,Le,Me,Mt,Kt,Rt);ae.pixelStorei(I.UNPACK_ROW_LENGTH,on),ae.pixelStorei(I.UNPACK_IMAGE_HEIGHT,ut),ae.pixelStorei(I.UNPACK_SKIP_PIXELS,pn),ae.pixelStorei(I.UNPACK_SKIP_ROWS,Ln),ae.pixelStorei(I.UNPACK_SKIP_IMAGES,hi),we===0&&B.generateMipmaps&&I.generateMipmap(Ce),ae.unbindTexture()},this.initRenderTarget=function(A){C.get(A).__webglFramebuffer===void 0&&E.setupRenderTarget(A)},this.initTexture=function(A){A.isCubeTexture?E.setTextureCube(A,0):A.isData3DTexture?E.setTexture3D(A,0):A.isDataArrayTexture||A.isCompressedArrayTexture?E.setTexture2DArray(A,0):E.setTexture2D(A,0),ae.unbindTexture()},this.resetState=function(){U=0,k=0,N=null,ae.reset(),ue.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return zn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=at._getDrawingBufferColorSpace(e),t.unpackColorSpace=at._getUnpackColorSpace()}}class wx{constructor(){this._previousTime=0,this._currentTime=0,this._startTime=performance.now(),this._delta=0,this._elapsed=0,this._timescale=1,this._document=null,this._pageVisibilityHandler=null}connect(e){this._document=e,e.hidden!==void 0&&(this._pageVisibilityHandler=Tx.bind(this),e.addEventListener("visibilitychange",this._pageVisibilityHandler,!1))}disconnect(){this._pageVisibilityHandler!==null&&(this._document.removeEventListener("visibilitychange",this._pageVisibilityHandler),this._pageVisibilityHandler=null),this._document=null}getDelta(){return this._delta/1e3}getElapsed(){return this._elapsed/1e3}getTimescale(){return this._timescale}setTimescale(e){return this._timescale=e,this}reset(){return this._currentTime=performance.now()-this._startTime,this}dispose(){this.disconnect()}update(e){return this._pageVisibilityHandler!==null&&this._document.hidden===!0?this._delta=0:(this._previousTime=this._currentTime,this._currentTime=(e!==void 0?e:performance.now())-this._startTime,this._delta=(this._currentTime-this._previousTime)*this._timescale,this._elapsed+=this._delta),this}}function Tx(){this._document.hidden===!1&&this.reset()}const uo={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

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


		}`};class Ds{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}}const Ex=new yr(-1,1,1,-1,0,1);class Ax extends Et{constructor(){super(),this.setAttribute("position",new tt([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new tt([0,2,0,0,2,0],2))}}const Rx=new Ax;class al{constructor(e){this._mesh=new G(Rx,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,Ex)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}}class Cx extends Ds{constructor(e,t="tDiffuse"){super(),this.textureID=t,this.uniforms=null,this.material=null,e instanceof Yt?(this.uniforms=e.uniforms,this.material=e):e&&(this.uniforms=Ss.clone(e.uniforms),this.material=new Yt({name:e.name!==void 0?e.name:"unspecified",defines:Object.assign({},e.defines),uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader})),this._fsQuad=new al(this.material)}render(e,t,n){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=n.texture),this._fsQuad.material=this.material,this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}}class Yh extends Ds{constructor(e,t){super(),this.scene=e,this.camera=t,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(e,t,n){const i=e.getContext(),s=e.state;s.buffers.color.setMask(!1),s.buffers.depth.setMask(!1),s.buffers.color.setLocked(!0),s.buffers.depth.setLocked(!0);let o,c;this.inverse?(o=0,c=1):(o=1,c=0),s.buffers.stencil.setTest(!0),s.buffers.stencil.setOp(i.REPLACE,i.REPLACE,i.REPLACE),s.buffers.stencil.setFunc(i.ALWAYS,o,4294967295),s.buffers.stencil.setClear(c),s.buffers.stencil.setLocked(!0),e.setRenderTarget(n),this.clear&&e.clear(),e.render(this.scene,this.camera),e.setRenderTarget(t),this.clear&&e.clear(),e.render(this.scene,this.camera),s.buffers.color.setLocked(!1),s.buffers.depth.setLocked(!1),s.buffers.color.setMask(!0),s.buffers.depth.setMask(!0),s.buffers.stencil.setLocked(!1),s.buffers.stencil.setFunc(i.EQUAL,1,4294967295),s.buffers.stencil.setOp(i.KEEP,i.KEEP,i.KEEP),s.buffers.stencil.setLocked(!0)}}class Px extends Ds{constructor(){super(),this.needsSwap=!1}render(e){e.state.buffers.stencil.setLocked(!1),e.state.buffers.stencil.setTest(!1)}}class Lx{constructor(e,t){if(this.renderer=e,this._pixelRatio=e.getPixelRatio(),t===void 0){const n=e.getSize(new ee);this._width=n.width,this._height=n.height,t=new nn(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:sn}),t.texture.name="EffectComposer.rt1"}else this._width=t.width,this._height=t.height;this.renderTarget1=t,this.renderTarget2=t.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new Cx(uo),this.copyPass.material.blending=Gn,this.timer=new f0}swapBuffers(){const e=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=e}addPass(e){this.passes.push(e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(e,t){this.passes.splice(t,0,e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(e){const t=this.passes.indexOf(e);t!==-1&&this.passes.splice(t,1)}isLastEnabledPass(e){for(let t=e+1;t<this.passes.length;t++)if(this.passes[t].enabled)return!1;return!0}render(e){this.timer.update(),e===void 0&&(e=this.timer.getDelta());const t=this.renderer.getRenderTarget();let n=!1;for(let i=0,s=this.passes.length;i<s;i++){const o=this.passes[i];if(o.enabled!==!1){if(o.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(i),o.render(this.renderer,this.writeBuffer,this.readBuffer,e,n),o.needsSwap){if(n){const c=this.renderer.getContext(),l=this.renderer.state.buffers.stencil;l.setFunc(c.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,e),l.setFunc(c.EQUAL,1,4294967295)}this.swapBuffers()}Yh!==void 0&&(o instanceof Yh?n=!0:o instanceof Px&&(n=!1))}}this.renderer.setRenderTarget(t)}reset(e){if(e===void 0){const t=this.renderer.getSize(new ee);this._pixelRatio=this.renderer.getPixelRatio(),this._width=t.width,this._height=t.height,e=this.renderTarget1.clone(),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=e,this.renderTarget2=e.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(e,t){this._width=e,this._height=t;const n=this._width*this._pixelRatio,i=this._height*this._pixelRatio;this.renderTarget1.setSize(n,i),this.renderTarget2.setSize(n,i);for(let s=0;s<this.passes.length;s++)this.passes[s].setSize(n,i)}setPixelRatio(e){this._pixelRatio=e,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}}class Dx extends Ds{constructor(e,t,n=null,i=null,s=null){super(),this.scene=e,this.camera=t,this.overrideMaterial=n,this.clearColor=i,this.clearAlpha=s,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this.isRenderPass=!0,this._oldClearColor=new Se}render(e,t,n){const i=e.autoClear;e.autoClear=!1;let s,o;this.overrideMaterial!==null&&(o=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(e.getClearColor(this._oldClearColor),e.setClearColor(this.clearColor,e.getClearAlpha())),this.clearAlpha!==null&&(s=e.getClearAlpha(),e.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&e.clearDepth(),e.setRenderTarget(this.renderToScreen?null:n),this.clear===!0&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),e.render(this.scene,this.camera),this.clearColor!==null&&e.setClearColor(this._oldClearColor),this.clearAlpha!==null&&e.setClearAlpha(s),this.overrideMaterial!==null&&(this.scene.overrideMaterial=o),e.autoClear=i}}const Ix={uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new Se(0)},defaultOpacity:{value:0}},vertexShader:`

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

		}`};class Es extends Ds{constructor(e,t=1,n,i){super(),this.strength=t,this.radius=n,this.threshold=i,this.resolution=e!==void 0?new ee(e.x,e.y):new ee(256,256),this.clearColor=new Se(0,0,0),this.needsSwap=!1,this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let s=Math.round(this.resolution.x/2),o=Math.round(this.resolution.y/2);this.renderTargetBright=new nn(s,o,{type:sn}),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let h=0;h<this.nMips;h++){const u=new nn(s,o,{type:sn});u.texture.name="UnrealBloomPass.h"+h,u.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(u);const f=new nn(s,o,{type:sn});f.texture.name="UnrealBloomPass.v"+h,f.texture.generateMipmaps=!1,this.renderTargetsVertical.push(f),s=Math.round(s/2),o=Math.round(o/2)}const c=Ix;this.highPassUniforms=Ss.clone(c.uniforms),this.highPassUniforms.luminosityThreshold.value=i,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new Yt({uniforms:this.highPassUniforms,vertexShader:c.vertexShader,fragmentShader:c.fragmentShader}),this.separableBlurMaterials=[];const l=[6,10,14,18,22];s=Math.round(this.resolution.x/2),o=Math.round(this.resolution.y/2);for(let h=0;h<this.nMips;h++)this.separableBlurMaterials.push(this._getSeparableBlurMaterial(l[h])),this.separableBlurMaterials[h].uniforms.invSize.value=new ee(1/s,1/o),s=Math.round(s/2),o=Math.round(o/2);this.compositeMaterial=this._getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=t,this.compositeMaterial.uniforms.bloomRadius.value=.1;const a=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=a,this.bloomTintColors=[new L(1,1,1),new L(1,1,1),new L(1,1,1),new L(1,1,1),new L(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,this.copyUniforms=Ss.clone(uo.uniforms),this.blendMaterial=new Yt({uniforms:this.copyUniforms,vertexShader:uo.vertexShader,fragmentShader:uo.fragmentShader,premultipliedAlpha:!0,blending:rr,depthTest:!1,depthWrite:!1,transparent:!0}),this._oldClearColor=new Se,this._oldClearAlpha=1,this._basic=new Ot,this._fsQuad=new al(null)}dispose(){for(let e=0;e<this.renderTargetsHorizontal.length;e++)this.renderTargetsHorizontal[e].dispose();for(let e=0;e<this.renderTargetsVertical.length;e++)this.renderTargetsVertical[e].dispose();this.renderTargetBright.dispose();for(let e=0;e<this.separableBlurMaterials.length;e++)this.separableBlurMaterials[e].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this._basic.dispose(),this._fsQuad.dispose()}setSize(e,t){let n=Math.round(e/2),i=Math.round(t/2);this.renderTargetBright.setSize(n,i);for(let s=0;s<this.nMips;s++)this.renderTargetsHorizontal[s].setSize(n,i),this.renderTargetsVertical[s].setSize(n,i),this.separableBlurMaterials[s].uniforms.invSize.value=new ee(1/n,1/i),n=Math.round(n/2),i=Math.round(i/2)}render(e,t,n,i,s){e.getClearColor(this._oldClearColor),this._oldClearAlpha=e.getClearAlpha();const o=e.autoClear;e.autoClear=!1,e.setClearColor(this.clearColor,0),s&&e.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this._fsQuad.material=this._basic,this._basic.map=n.texture,e.setRenderTarget(null),e.clear(),this._fsQuad.render(e)),this.highPassUniforms.tDiffuse.value=n.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this._fsQuad.material=this.materialHighPassFilter,e.setRenderTarget(this.renderTargetBright),e.clear(),this._fsQuad.render(e);let c=this.renderTargetBright;for(let l=0;l<this.nMips;l++)this._fsQuad.material=this.separableBlurMaterials[l],this.separableBlurMaterials[l].uniforms.colorTexture.value=c.texture,this.separableBlurMaterials[l].uniforms.direction.value=Es.BlurDirectionX,e.setRenderTarget(this.renderTargetsHorizontal[l]),e.clear(),this._fsQuad.render(e),this.separableBlurMaterials[l].uniforms.colorTexture.value=this.renderTargetsHorizontal[l].texture,this.separableBlurMaterials[l].uniforms.direction.value=Es.BlurDirectionY,e.setRenderTarget(this.renderTargetsVertical[l]),e.clear(),this._fsQuad.render(e),c=this.renderTargetsVertical[l];this._fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,e.setRenderTarget(this.renderTargetsHorizontal[0]),e.clear(),this._fsQuad.render(e),this._fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,s&&e.state.buffers.stencil.setTest(!0),this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(n),this._fsQuad.render(e)),e.setClearColor(this._oldClearColor,this._oldClearAlpha),e.autoClear=o}_getSeparableBlurMaterial(e){const t=[],n=e/3;for(let i=0;i<e;i++)t.push(.39894*Math.exp(-.5*i*i/(n*n))/n);return new Yt({defines:{KERNEL_RADIUS:e},uniforms:{colorTexture:{value:null},invSize:{value:new ee(.5,.5)},direction:{value:new ee(.5,.5)},gaussianCoefficients:{value:t}},vertexShader:`

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

				}`})}_getCompositeMaterial(e){return new Yt({defines:{NUM_MIPS:e},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`

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

				}`})}}Es.BlurDirectionX=new ee(1,0);Es.BlurDirectionY=new ee(0,1);const io={name:"OutputShader",uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
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

		}`};class Nx extends Ds{constructor(){super(),this.isOutputPass=!0,this.uniforms=Ss.clone(io.uniforms),this.material=new Hu({name:io.name,uniforms:this.uniforms,vertexShader:io.vertexShader,fragmentShader:io.fragmentShader}),this._fsQuad=new al(this.material),this._outputColorSpace=null,this._toneMapping=null}render(e,t,n){this.uniforms.tDiffuse.value=n.texture,this.uniforms.toneMappingExposure.value=e.toneMappingExposure,(this._outputColorSpace!==e.outputColorSpace||this._toneMapping!==e.toneMapping)&&(this._outputColorSpace=e.outputColorSpace,this._toneMapping=e.toneMapping,this.material.defines={},at.getTransfer(this._outputColorSpace)===pt&&(this.material.defines.SRGB_TRANSFER=""),this._toneMapping===Pc?this.material.defines.LINEAR_TONE_MAPPING="":this._toneMapping===Lc?this.material.defines.REINHARD_TONE_MAPPING="":this._toneMapping===Dc?this.material.defines.CINEON_TONE_MAPPING="":this._toneMapping===To?this.material.defines.ACES_FILMIC_TONE_MAPPING="":this._toneMapping===Nc?this.material.defines.AGX_TONE_MAPPING="":this._toneMapping===Uc?this.material.defines.NEUTRAL_TONE_MAPPING="":this._toneMapping===Ic&&(this.material.defines.CUSTOM_TONE_MAPPING=""),this.material.needsUpdate=!0),this.renderToScreen===!0?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}}class Co extends G{constructor(e,t={}){super(e),this.isReflector=!0,this.type="Reflector",this.forceUpdate=!1,this._reflectionCameras=new WeakMap;const n=this,i=t.color!==void 0?new Se(t.color):new Se(8355711),s=t.textureWidth||512,o=t.textureHeight||512,c=t.clipBias||0,l=t.shader||Co.ReflectorShader,a=t.multisample!==void 0?t.multisample:4,h=new Mi,u=new L,f=new L,_=new L,p=new Ke,g=new L(0,0,-1),d=new xt,m=new L,x=new L,v=new xt,y=new Ke,b=new nn(s,o,{samples:a,type:sn}),S=new Yt({name:l.name!==void 0?l.name:"unspecified",uniforms:Ss.clone(l.uniforms),fragmentShader:l.fragmentShader,vertexShader:l.vertexShader});S.uniforms.tDiffuse.value=b.texture,S.uniforms.color.value=i,S.uniforms.textureMatrix.value=y,this.material=S,this.onBeforeRender=function(w,M,T){const R=this._getReflectionCamera(T);if(f.setFromMatrixPosition(n.matrixWorld),_.setFromMatrixPosition(T.matrixWorld),p.extractRotation(n.matrixWorld),u.set(0,0,1),u.applyMatrix4(p),m.subVectors(f,_),m.dot(u)>0===!0&&this.forceUpdate===!1)return;m.reflect(u).negate(),m.add(f),p.extractRotation(T.matrixWorld),g.set(0,0,-1),g.applyMatrix4(p),g.add(_),x.subVectors(f,g),x.reflect(u).negate(),x.add(f),R.position.copy(m),R.up.set(0,1,0),R.up.applyMatrix4(p),R.up.reflect(u),R.lookAt(x),R.far=T.far,R.updateMatrixWorld(),R.projectionMatrix.copy(T.projectionMatrix),y.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),y.multiply(R.projectionMatrix),y.multiply(R.matrixWorldInverse),y.multiply(n.matrixWorld),h.setFromNormalAndCoplanarPoint(u,f),h.applyMatrix4(R.matrixWorldInverse),d.set(h.normal.x,h.normal.y,h.normal.z,h.constant);const D=R.projectionMatrix;R.isOrthographicCamera?(v.x=(Math.sign(d.x)+D.elements[8])/D.elements[0],v.y=(Math.sign(d.y)+D.elements[9])/D.elements[5],v.z=-T.far,v.w=1):(v.x=(Math.sign(d.x)+D.elements[8])/D.elements[0],v.y=(Math.sign(d.y)+D.elements[9])/D.elements[5],v.z=-1,v.w=(1+D.elements[10])/D.elements[14]),d.multiplyScalar(2/d.dot(v)),D.elements[2]=d.x,D.elements[6]=d.y,R.isOrthographicCamera?(D.elements[10]=d.z-c,D.elements[14]=d.w-1):(D.elements[10]=d.z+1-c,D.elements[14]=d.w),n.visible=!1;const U=w.getRenderTarget(),k=w.xr.enabled,N=w.shadowMap.autoUpdate;w.xr.enabled=!1,w.shadowMap.autoUpdate=!1,w.setRenderTarget(b),w.state.buffers.depth.setMask(!0),w.autoClear===!1&&w.clear(),w.render(M,R),w.xr.enabled=k,w.shadowMap.autoUpdate=N,w.setRenderTarget(U);const O=T.viewport;O!==void 0&&w.state.viewport(O),n.visible=!0,this.forceUpdate=!1},this.getRenderTarget=function(){return b},this.dispose=function(){b.dispose(),n.material.dispose()},this._getReflectionCamera=function(w){let M=this._reflectionCameras.get(w);return M===void 0&&(M=w.clone(),this._reflectionCameras.set(w,M)),M}}}Co.ReflectorShader={name:"ReflectorShader",uniforms:{color:{value:null},tDiffuse:{value:null},textureMatrix:{value:null}},vertexShader:`
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

		}`};function Kh(r,e){if(e===sd)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),r;if(e===fc||e===vu){let t=r.getIndex();if(t===null){const o=[],c=r.getAttribute("position");if(c!==void 0){for(let l=0;l<c.count;l++)o.push(l);r.setIndex(o),t=r.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),r}const n=t.count-2,i=[];if(e===fc)for(let o=1;o<=n;o++)i.push(t.getX(0)),i.push(t.getX(o)),i.push(t.getX(o+1));else for(let o=0;o<n;o++)o%2===0?(i.push(t.getX(o)),i.push(t.getX(o+1)),i.push(t.getX(o+2))):(i.push(t.getX(o+2)),i.push(t.getX(o+1)),i.push(t.getX(o)));i.length/3!==n&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");const s=r.clone();return s.setIndex(i),s.clearGroups(),s}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",e),r}function Ux(r){const e=new Map,t=new Map,n=r.clone();return sf(r,n,function(i,s){e.set(s,i),t.set(i,s)}),n.traverse(function(i){if(!i.isSkinnedMesh)return;const s=i,o=e.get(i),c=o.skeleton.bones;s.skeleton=o.skeleton.clone(),s.bindMatrix.copy(o.bindMatrix),s.skeleton.bones=c.map(function(l){return t.get(l)}),s.bind(s.skeleton,s.bindMatrix)}),n}function sf(r,e,t){t(r,e);for(let n=0;n<r.children.length;n++)sf(r.children[n],e.children[n],t)}class Fx extends Ps{constructor(e){super(e),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(t){return new Gx(t)}),this.register(function(t){return new Vx(t)}),this.register(function(t){return new Zx(t)}),this.register(function(t){return new $x(t)}),this.register(function(t){return new Qx(t)}),this.register(function(t){return new Wx(t)}),this.register(function(t){return new Xx(t)}),this.register(function(t){return new qx(t)}),this.register(function(t){return new Yx(t)}),this.register(function(t){return new kx(t)}),this.register(function(t){return new Kx(t)}),this.register(function(t){return new Hx(t)}),this.register(function(t){return new Jx(t)}),this.register(function(t){return new jx(t)}),this.register(function(t){return new Bx(t)}),this.register(function(t){return new jh(t,ct.EXT_MESHOPT_COMPRESSION)}),this.register(function(t){return new jh(t,ct.KHR_MESHOPT_COMPRESSION)}),this.register(function(t){return new e1(t)})}load(e,t,n,i){const s=this;let o;if(this.resourcePath!=="")o=this.resourcePath;else if(this.path!==""){const a=sr.extractUrlBase(e);o=sr.resolveURL(a,this.path)}else o=sr.extractUrlBase(e);this.manager.itemStart(e);const c=function(a){i?i(a):console.error(a),s.manager.itemError(e),s.manager.itemEnd(e)},l=new Yu(this.manager);l.setPath(this.path),l.setResponseType("arraybuffer"),l.setRequestHeader(this.requestHeader),l.setWithCredentials(this.withCredentials),l.load(e,function(a){try{s.parse(a,o,function(h){t(h),s.manager.itemEnd(e)},c)}catch(h){c(h)}},n,c)}setDRACOLoader(e){return this.dracoLoader=e,this}setKTX2Loader(e){return this.ktx2Loader=e,this}setMeshoptDecoder(e){return this.meshoptDecoder=e,this}register(e){return this.pluginCallbacks.indexOf(e)===-1&&this.pluginCallbacks.push(e),this}unregister(e){return this.pluginCallbacks.indexOf(e)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}parse(e,t,n,i){let s;const o={},c={},l=new TextDecoder;if(typeof e=="string")s=JSON.parse(e);else if(e instanceof ArrayBuffer)if(l.decode(new Uint8Array(e,0,4))===rf){try{o[ct.KHR_BINARY_GLTF]=new t1(e)}catch(u){i&&i(u);return}s=JSON.parse(o[ct.KHR_BINARY_GLTF].content)}else s=JSON.parse(l.decode(e));else s=e;if(s.asset===void 0||s.asset.version[0]<2){i&&i(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}const a=new p1(s,{path:t||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});a.fileLoader.setRequestHeader(this.requestHeader);for(let h=0;h<this.pluginCallbacks.length;h++){const u=this.pluginCallbacks[h](a);u.name||console.error("THREE.GLTFLoader: Invalid plugin found: missing name"),c[u.name]=u,o[u.name]=!0}if(s.extensionsUsed)for(let h=0;h<s.extensionsUsed.length;++h){const u=s.extensionsUsed[h],f=s.extensionsRequired||[];switch(u){case ct.KHR_MATERIALS_UNLIT:o[u]=new zx;break;case ct.KHR_DRACO_MESH_COMPRESSION:o[u]=new n1(s,this.dracoLoader);break;case ct.KHR_TEXTURE_TRANSFORM:o[u]=new i1;break;case ct.KHR_MESH_QUANTIZATION:o[u]=new s1;break;default:f.indexOf(u)>=0&&c[u]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+u+'".')}}a.setExtensions(o),a.setPlugins(c),a.parse(n,i)}parseAsync(e,t){const n=this;return new Promise(function(i,s){n.parse(e,t,i,s)})}}function Ox(){let r={};return{get:function(e){return r[e]},add:function(e,t){r[e]=t},remove:function(e){delete r[e]},removeAll:function(){r={}}}}function Nt(r,e,t){const n=r.json.materials[e];return n.extensions&&n.extensions[t]?n.extensions[t]:null}const ct={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_DISPERSION:"KHR_materials_dispersion",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_MATERIALS_BUMP:"EXT_materials_bump",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",KHR_MESHOPT_COMPRESSION:"KHR_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"};class Bx{constructor(e){this.parser=e,this.name=ct.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){const e=this.parser,t=this.parser.json.nodes||[];for(let n=0,i=t.length;n<i;n++){const s=t[n];s.extensions&&s.extensions[this.name]&&s.extensions[this.name].light!==void 0&&e._addNodeRef(this.cache,s.extensions[this.name].light)}}_loadLight(e){const t=this.parser,n="light:"+e;let i=t.cache.get(n);if(i)return i;const s=t.json,l=((s.extensions&&s.extensions[this.name]||{}).lights||[])[e];let a;const h=new Se(16777215);l.color!==void 0&&h.setRGB(l.color[0],l.color[1],l.color[2],un);const u=l.range!==void 0?l.range:0;switch(l.type){case"directional":a=new Mc(h),a.target.position.set(0,0,-1),a.add(a.target);break;case"point":a=new vn(h),a.distance=u;break;case"spot":a=new sl(h),a.distance=u,l.spot=l.spot||{},l.spot.innerConeAngle=l.spot.innerConeAngle!==void 0?l.spot.innerConeAngle:0,l.spot.outerConeAngle=l.spot.outerConeAngle!==void 0?l.spot.outerConeAngle:Math.PI/4,a.angle=l.spot.outerConeAngle,a.penumbra=1-l.spot.innerConeAngle/l.spot.outerConeAngle,a.target.position.set(0,0,-1),a.add(a.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+l.type)}return a.position.set(0,0,0),Nn(a,l),l.intensity!==void 0&&(a.intensity=l.intensity),a.name=t.createUniqueName(l.name||"light_"+e),i=Promise.resolve(a),t.cache.add(n,i),i}getDependency(e,t){if(e==="light")return this._loadLight(t)}createNodeAttachment(e){const t=this,n=this.parser,s=n.json.nodes[e],c=(s.extensions&&s.extensions[this.name]||{}).light;return c===void 0?null:this._loadLight(c).then(function(l){return n._getNodeRef(t.cache,c,l)})}}class zx{constructor(){this.name=ct.KHR_MATERIALS_UNLIT}getMaterialType(){return Ot}extendParams(e,t,n){const i=[];e.color=new Se(1,1,1),e.opacity=1;const s=t.pbrMetallicRoughness;if(s){if(Array.isArray(s.baseColorFactor)){const o=s.baseColorFactor;e.color.setRGB(o[0],o[1],o[2],un),e.opacity=o[3]}s.baseColorTexture!==void 0&&i.push(n.assignTexture(e,"map",s.baseColorTexture,Tt))}return Promise.all(i)}}class kx{constructor(e){this.parser=e,this.name=ct.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(e,t){const n=Nt(this.parser,e,this.name);return n===null||n.emissiveStrength!==void 0&&(t.emissiveIntensity=n.emissiveStrength),Promise.resolve()}}class Gx{constructor(e){this.parser=e,this.name=ct.KHR_MATERIALS_CLEARCOAT}getMaterialType(e){return Nt(this.parser,e,this.name)!==null?dn:null}extendMaterialParams(e,t){const n=Nt(this.parser,e,this.name);if(n===null)return Promise.resolve();const i=[];if(n.clearcoatFactor!==void 0&&(t.clearcoat=n.clearcoatFactor),n.clearcoatTexture!==void 0&&i.push(this.parser.assignTexture(t,"clearcoatMap",n.clearcoatTexture)),n.clearcoatRoughnessFactor!==void 0&&(t.clearcoatRoughness=n.clearcoatRoughnessFactor),n.clearcoatRoughnessTexture!==void 0&&i.push(this.parser.assignTexture(t,"clearcoatRoughnessMap",n.clearcoatRoughnessTexture)),n.clearcoatNormalTexture!==void 0&&(i.push(this.parser.assignTexture(t,"clearcoatNormalMap",n.clearcoatNormalTexture)),n.clearcoatNormalTexture.scale!==void 0)){const s=n.clearcoatNormalTexture.scale;t.clearcoatNormalScale=new ee(s,s)}return Promise.all(i)}}class Vx{constructor(e){this.parser=e,this.name=ct.KHR_MATERIALS_DISPERSION}getMaterialType(e){return Nt(this.parser,e,this.name)!==null?dn:null}extendMaterialParams(e,t){const n=Nt(this.parser,e,this.name);return n===null||(t.dispersion=n.dispersion!==void 0?n.dispersion:0),Promise.resolve()}}class Hx{constructor(e){this.parser=e,this.name=ct.KHR_MATERIALS_IRIDESCENCE}getMaterialType(e){return Nt(this.parser,e,this.name)!==null?dn:null}extendMaterialParams(e,t){const n=Nt(this.parser,e,this.name);if(n===null)return Promise.resolve();const i=[];return n.iridescenceFactor!==void 0&&(t.iridescence=n.iridescenceFactor),n.iridescenceTexture!==void 0&&i.push(this.parser.assignTexture(t,"iridescenceMap",n.iridescenceTexture)),n.iridescenceIor!==void 0&&(t.iridescenceIOR=n.iridescenceIor),t.iridescenceThicknessRange===void 0&&(t.iridescenceThicknessRange=[100,400]),n.iridescenceThicknessMinimum!==void 0&&(t.iridescenceThicknessRange[0]=n.iridescenceThicknessMinimum),n.iridescenceThicknessMaximum!==void 0&&(t.iridescenceThicknessRange[1]=n.iridescenceThicknessMaximum),n.iridescenceThicknessTexture!==void 0&&i.push(this.parser.assignTexture(t,"iridescenceThicknessMap",n.iridescenceThicknessTexture)),Promise.all(i)}}class Wx{constructor(e){this.parser=e,this.name=ct.KHR_MATERIALS_SHEEN}getMaterialType(e){return Nt(this.parser,e,this.name)!==null?dn:null}extendMaterialParams(e,t){const n=Nt(this.parser,e,this.name);if(n===null)return Promise.resolve();const i=[];if(t.sheenColor=new Se(0,0,0),t.sheenRoughness=0,t.sheen=1,n.sheenColorFactor!==void 0){const s=n.sheenColorFactor;t.sheenColor.setRGB(s[0],s[1],s[2],un)}return n.sheenRoughnessFactor!==void 0&&(t.sheenRoughness=n.sheenRoughnessFactor),n.sheenColorTexture!==void 0&&i.push(this.parser.assignTexture(t,"sheenColorMap",n.sheenColorTexture,Tt)),n.sheenRoughnessTexture!==void 0&&i.push(this.parser.assignTexture(t,"sheenRoughnessMap",n.sheenRoughnessTexture)),Promise.all(i)}}class Xx{constructor(e){this.parser=e,this.name=ct.KHR_MATERIALS_TRANSMISSION}getMaterialType(e){return Nt(this.parser,e,this.name)!==null?dn:null}extendMaterialParams(e,t){const n=Nt(this.parser,e,this.name);if(n===null)return Promise.resolve();const i=[];return n.transmissionFactor!==void 0&&(t.transmission=n.transmissionFactor),n.transmissionTexture!==void 0&&i.push(this.parser.assignTexture(t,"transmissionMap",n.transmissionTexture)),Promise.all(i)}}class qx{constructor(e){this.parser=e,this.name=ct.KHR_MATERIALS_VOLUME}getMaterialType(e){return Nt(this.parser,e,this.name)!==null?dn:null}extendMaterialParams(e,t){const n=Nt(this.parser,e,this.name);if(n===null)return Promise.resolve();const i=[];t.thickness=n.thicknessFactor!==void 0?n.thicknessFactor:0,n.thicknessTexture!==void 0&&i.push(this.parser.assignTexture(t,"thicknessMap",n.thicknessTexture)),t.attenuationDistance=n.attenuationDistance||1/0;const s=n.attenuationColor||[1,1,1];return t.attenuationColor=new Se().setRGB(s[0],s[1],s[2],un),Promise.all(i)}}class Yx{constructor(e){this.parser=e,this.name=ct.KHR_MATERIALS_IOR}getMaterialType(e){return Nt(this.parser,e,this.name)!==null?dn:null}extendMaterialParams(e,t){const n=Nt(this.parser,e,this.name);return n===null||(t.ior=n.ior!==void 0?n.ior:1.5,t.ior===0&&(t.ior=1e3)),Promise.resolve()}}class Kx{constructor(e){this.parser=e,this.name=ct.KHR_MATERIALS_SPECULAR}getMaterialType(e){return Nt(this.parser,e,this.name)!==null?dn:null}extendMaterialParams(e,t){const n=Nt(this.parser,e,this.name);if(n===null)return Promise.resolve();const i=[];t.specularIntensity=n.specularFactor!==void 0?n.specularFactor:1,n.specularTexture!==void 0&&i.push(this.parser.assignTexture(t,"specularIntensityMap",n.specularTexture));const s=n.specularColorFactor||[1,1,1];return t.specularColor=new Se().setRGB(s[0],s[1],s[2],un),n.specularColorTexture!==void 0&&i.push(this.parser.assignTexture(t,"specularColorMap",n.specularColorTexture,Tt)),Promise.all(i)}}class jx{constructor(e){this.parser=e,this.name=ct.EXT_MATERIALS_BUMP}getMaterialType(e){return Nt(this.parser,e,this.name)!==null?dn:null}extendMaterialParams(e,t){const n=Nt(this.parser,e,this.name);if(n===null)return Promise.resolve();const i=[];return t.bumpScale=n.bumpFactor!==void 0?n.bumpFactor:1,n.bumpTexture!==void 0&&i.push(this.parser.assignTexture(t,"bumpMap",n.bumpTexture)),Promise.all(i)}}class Jx{constructor(e){this.parser=e,this.name=ct.KHR_MATERIALS_ANISOTROPY}getMaterialType(e){return Nt(this.parser,e,this.name)!==null?dn:null}extendMaterialParams(e,t){const n=Nt(this.parser,e,this.name);if(n===null)return Promise.resolve();const i=[];return n.anisotropyStrength!==void 0&&(t.anisotropy=n.anisotropyStrength),n.anisotropyRotation!==void 0&&(t.anisotropyRotation=n.anisotropyRotation),n.anisotropyTexture!==void 0&&i.push(this.parser.assignTexture(t,"anisotropyMap",n.anisotropyTexture)),Promise.all(i)}}class Zx{constructor(e){this.parser=e,this.name=ct.KHR_TEXTURE_BASISU}loadTexture(e){const t=this.parser,n=t.json,i=n.textures[e];if(!i.extensions||!i.extensions[this.name])return null;const s=i.extensions[this.name],o=t.options.ktx2Loader;if(!o){if(n.extensionsRequired&&n.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return t.loadTextureImage(e,s.source,o)}}class $x{constructor(e){this.parser=e,this.name=ct.EXT_TEXTURE_WEBP}loadTexture(e){const t=this.name,n=this.parser,i=n.json,s=i.textures[e];if(!s.extensions||!s.extensions[t])return null;const o=s.extensions[t],c=i.images[o.source];let l=n.textureLoader;if(c.uri){const a=n.options.manager.getHandler(c.uri);a!==null&&(l=a)}return n.loadTextureImage(e,o.source,l)}}class Qx{constructor(e){this.parser=e,this.name=ct.EXT_TEXTURE_AVIF}loadTexture(e){const t=this.name,n=this.parser,i=n.json,s=i.textures[e];if(!s.extensions||!s.extensions[t])return null;const o=s.extensions[t],c=i.images[o.source];let l=n.textureLoader;if(c.uri){const a=n.options.manager.getHandler(c.uri);a!==null&&(l=a)}return n.loadTextureImage(e,o.source,l)}}class jh{constructor(e,t){this.name=t,this.parser=e}loadBufferView(e){const t=this.parser.json,n=t.bufferViews[e];if(n.extensions&&n.extensions[this.name]){const i=n.extensions[this.name],s=this.parser.getDependency("buffer",i.buffer),o=this.parser.options.meshoptDecoder;if(!o||!o.supported){if(t.extensionsRequired&&t.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return s.then(function(c){const l=i.byteOffset||0,a=i.byteLength||0,h=i.count,u=i.byteStride,f=new Uint8Array(c,l,a);return o.decodeGltfBufferAsync?o.decodeGltfBufferAsync(h,u,f,i.mode,i.filter).then(function(_){return _.buffer}):o.ready.then(function(){const _=new ArrayBuffer(h*u);return o.decodeGltfBuffer(new Uint8Array(_),h,u,f,i.mode,i.filter),_})})}else return null}}class e1{constructor(e){this.name=ct.EXT_MESH_GPU_INSTANCING,this.parser=e}createNodeMesh(e){const t=this.parser.json,n=t.nodes[e];if(!n.extensions||!n.extensions[this.name]||n.mesh===void 0)return null;const i=t.meshes[n.mesh];for(const a of i.primitives)if(a.mode!==_n.TRIANGLES&&a.mode!==_n.TRIANGLE_STRIP&&a.mode!==_n.TRIANGLE_FAN&&a.mode!==void 0)return null;const o=n.extensions[this.name].attributes,c=[],l={};for(const a in o)c.push(this.parser.getDependency("accessor",o[a]).then(h=>(l[a]=h,l[a])));return c.length<1?null:(c.push(this.parser.createNodeMesh(e)),Promise.all(c).then(a=>{const h=a.pop(),u=h.isGroup?h.children:[h],f=a[0].count,_=[];for(const p of u){const g=new Ke,d=new L,m=new rn,x=new L(1,1,1),v=new Ru(p.geometry,p.material,f);for(let y=0;y<f;y++)l.TRANSLATION&&d.fromBufferAttribute(l.TRANSLATION,y),l.ROTATION&&m.fromBufferAttribute(l.ROTATION,y),l.SCALE&&x.fromBufferAttribute(l.SCALE,y),v.setMatrixAt(y,g.compose(d,m,x));for(const y in l)if(y==="_COLOR_0"){const b=l[y];v.instanceColor=new gc(b.array,b.itemSize,b.normalized)}else y!=="TRANSLATION"&&y!=="ROTATION"&&y!=="SCALE"&&p.geometry.setAttribute(y,l[y]);bt.prototype.copy.call(v,p),this.parser.assignFinalMaterial(v),_.push(v)}return h.isGroup?(h.clear(),h.add(..._),h):_[0]}))}}const rf="glTF",Ys=12,Jh={JSON:1313821514,BIN:5130562};class t1{constructor(e){this.name=ct.KHR_BINARY_GLTF,this.content=null,this.body=null;const t=new DataView(e,0,Ys),n=new TextDecoder;if(this.header={magic:n.decode(new Uint8Array(e.slice(0,4))),version:t.getUint32(4,!0),length:t.getUint32(8,!0)},this.header.magic!==rf)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");const i=this.header.length-Ys,s=new DataView(e,Ys);let o=0;for(;o<i;){const c=s.getUint32(o,!0);o+=4;const l=s.getUint32(o,!0);if(o+=4,l===Jh.JSON){const a=new Uint8Array(e,Ys+o,c);this.content=n.decode(a)}else if(l===Jh.BIN){const a=Ys+o;this.body=e.slice(a,a+c)}o+=c}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}}class n1{constructor(e,t){if(!t)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=ct.KHR_DRACO_MESH_COMPRESSION,this.json=e,this.dracoLoader=t,this.dracoLoader.preload()}decodePrimitive(e,t){const n=this.json,i=this.dracoLoader,s=e.extensions[this.name].bufferView,o=e.extensions[this.name].attributes,c={},l={},a={};for(const h in o){const u=Tc[h]||h.toLowerCase();c[u]=o[h]}for(const h in e.attributes){const u=Tc[h]||h.toLowerCase();if(o[h]!==void 0){const f=n.accessors[e.attributes[h]],_=ms[f.componentType];a[u]=_.name,l[u]=f.normalized===!0}}return t.getDependency("bufferView",s).then(function(h){return new Promise(function(u,f){i.decodeDracoFile(h,function(_){for(const p in _.attributes){const g=_.attributes[p],d=l[p];d!==void 0&&(g.normalized=d)}u(_)},c,a,un,f)})})}}class i1{constructor(){this.name=ct.KHR_TEXTURE_TRANSFORM}extendTexture(e,t){return(t.texCoord===void 0||t.texCoord===e.channel)&&t.offset===void 0&&t.rotation===void 0&&t.scale===void 0||(e=e.clone(),t.texCoord!==void 0&&(e.channel=t.texCoord),t.offset!==void 0&&e.offset.fromArray(t.offset),t.rotation!==void 0&&(e.rotation=t.rotation),t.scale!==void 0&&e.repeat.fromArray(t.scale),e.needsUpdate=!0),e}}class s1{constructor(){this.name=ct.KHR_MESH_QUANTIZATION}}class of extends As{constructor(e,t,n,i){super(e,t,n,i)}copySampleValue_(e){const t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,s=e*i*3+i;for(let o=0;o!==i;o++)t[o]=n[s+o];return t}interpolate_(e,t,n,i){const s=this.resultBuffer,o=this.sampleValues,c=this.valueSize,l=c*2,a=c*3,h=i-t,u=(n-t)/h,f=u*u,_=f*u,p=e*a,g=p-a,d=-2*_+3*f,m=_-f,x=1-d,v=m-f+u;for(let y=0;y!==c;y++){const b=o[g+y+c],S=o[g+y+l]*h,w=o[p+y+c],M=o[p+y]*h;s[y]=x*b+v*S+d*w+m*M}return s}}const r1=new rn;class o1 extends of{interpolate_(e,t,n,i){const s=super.interpolate_(e,t,n,i);return r1.fromArray(s).normalize().toArray(s),s}}const _n={POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6},ms={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},Zh={9728:Gt,9729:Vt,9984:uu,9985:ro,9986:Js,9987:Bn},$h={33071:On,33648:fo,10497:Bi},va={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},Tc={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},yi={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},a1={CUBICSPLINE:void 0,LINEAR:lr,STEP:cr},ya={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function c1(r){return r.DefaultMaterial===void 0&&(r.DefaultMaterial=new _e({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:ai})),r.DefaultMaterial}function Li(r,e,t){for(const n in t.extensions)r[n]===void 0&&(e.userData.gltfExtensions=e.userData.gltfExtensions||{},e.userData.gltfExtensions[n]=t.extensions[n])}function Nn(r,e){e.extras!==void 0&&(typeof e.extras=="object"?Object.assign(r.userData,e.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+e.extras))}function l1(r,e,t){let n=!1,i=!1,s=!1;for(let a=0,h=e.length;a<h;a++){const u=e[a];if(u.POSITION!==void 0&&(n=!0),u.NORMAL!==void 0&&(i=!0),u.COLOR_0!==void 0&&(s=!0),n&&i&&s)break}if(!n&&!i&&!s)return Promise.resolve(r);const o=[],c=[],l=[];for(let a=0,h=e.length;a<h;a++){const u=e[a];if(n){const f=u.POSITION!==void 0?t.getDependency("accessor",u.POSITION):r.attributes.position;o.push(f)}if(i){const f=u.NORMAL!==void 0?t.getDependency("accessor",u.NORMAL):r.attributes.normal;c.push(f)}if(s){const f=u.COLOR_0!==void 0?t.getDependency("accessor",u.COLOR_0):r.attributes.color;l.push(f)}}return Promise.all([Promise.all(o),Promise.all(c),Promise.all(l)]).then(function(a){const h=a[0],u=a[1],f=a[2];return n&&(r.morphAttributes.position=h),i&&(r.morphAttributes.normal=u),s&&(r.morphAttributes.color=f),r.morphTargetsRelative=!0,r})}function h1(r,e){if(r.updateMorphTargets(),e.weights!==void 0)for(let t=0,n=e.weights.length;t<n;t++)r.morphTargetInfluences[t]=e.weights[t];if(e.extras&&Array.isArray(e.extras.targetNames)){const t=e.extras.targetNames;if(r.morphTargetInfluences.length===t.length){r.morphTargetDictionary={};for(let n=0,i=t.length;n<i;n++)r.morphTargetDictionary[t[n]]=n}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function u1(r){let e;const t=r.extensions&&r.extensions[ct.KHR_DRACO_MESH_COMPRESSION];if(t?e="draco:"+t.bufferView+":"+t.indices+":"+Ma(t.attributes):e=r.indices+":"+Ma(r.attributes)+":"+r.mode,r.targets!==void 0)for(let n=0,i=r.targets.length;n<i;n++)e+=":"+Ma(r.targets[n]);return e}function Ma(r){let e="";const t=Object.keys(r).sort();for(let n=0,i=t.length;n<i;n++)e+=t[n]+":"+r[t[n]]+";";return e}function Ec(r){switch(r){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function f1(r){return r.search(/\.jpe?g($|\?)/i)>0||r.search(/^data\:image\/jpeg/)===0?"image/jpeg":r.search(/\.webp($|\?)/i)>0||r.search(/^data\:image\/webp/)===0?"image/webp":r.search(/\.ktx2($|\?)/i)>0||r.search(/^data\:image\/ktx2/)===0?"image/ktx2":"image/png"}const d1=new Ke;class p1{constructor(e={},t={}){this.json=e,this.extensions={},this.plugins={},this.options=t,this.cache=new Ox,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let n=!1,i=-1,s=!1,o=-1;if(typeof navigator<"u"&&typeof navigator.userAgent<"u"){const c=navigator.userAgent;n=/^((?!chrome|android).)*safari/i.test(c)===!0;const l=c.match(/Version\/(\d+)/);i=n&&l?parseInt(l[1],10):-1,s=c.indexOf("Firefox")>-1,o=s?c.match(/Firefox\/([0-9]+)\./)[1]:-1}typeof createImageBitmap>"u"||n&&i<17||s&&o<98?this.textureLoader=new i0(this.options.manager):this.textureLoader=new l0(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new Yu(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials"&&this.fileLoader.setWithCredentials(!0)}setExtensions(e){this.extensions=e}setPlugins(e){this.plugins=e}parse(e,t){const n=this,i=this.json,s=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(o){return o._markDefs&&o._markDefs()}),Promise.all(this._invokeAll(function(o){return o.beforeRoot&&o.beforeRoot()})).then(function(){return Promise.all([n.getDependencies("scene"),n.getDependencies("animation"),n.getDependencies("camera")])}).then(function(o){const c={scene:o[0][i.scene||0],scenes:o[0],animations:o[1],cameras:o[2],asset:i.asset,parser:n,userData:{}};return Li(s,c,i),Nn(c,i),Promise.all(n._invokeAll(function(l){return l.afterRoot&&l.afterRoot(c)})).then(function(){for(const l of c.scenes)l.updateMatrixWorld();e(c)})}).catch(t)}_markDefs(){const e=this.json.nodes||[],t=this.json.skins||[],n=this.json.meshes||[];for(let i=0,s=t.length;i<s;i++){const o=t[i].joints;for(let c=0,l=o.length;c<l;c++)e[o[c]].isBone=!0}for(let i=0,s=e.length;i<s;i++){const o=e[i];o.mesh!==void 0&&(this._addNodeRef(this.meshCache,o.mesh),o.skin!==void 0&&(n[o.mesh].isSkinnedMesh=!0)),o.camera!==void 0&&this._addNodeRef(this.cameraCache,o.camera)}}_addNodeRef(e,t){t!==void 0&&(e.refs[t]===void 0&&(e.refs[t]=e.uses[t]=0),e.refs[t]++)}_getNodeRef(e,t,n){if(e.refs[t]<=1)return n;const i=n.clone(),s=(o,c)=>{const l=this.associations.get(o);l!=null&&this.associations.set(c,l);for(const[a,h]of o.children.entries())s(h,c.children[a])};return s(n,i),i.name+="_instance_"+e.uses[t]++,i}_invokeOne(e){const t=Object.values(this.plugins);t.push(this);for(let n=0;n<t.length;n++){const i=e(t[n]);if(i)return i}return null}_invokeAll(e){const t=Object.values(this.plugins);t.unshift(this);const n=[];for(let i=0;i<t.length;i++){const s=e(t[i]);s&&n.push(s)}return n}getDependency(e,t){const n=e+":"+t;let i=this.cache.get(n);if(!i){switch(e){case"scene":i=this.loadScene(t);break;case"node":i=this._invokeOne(function(s){return s.loadNode&&s.loadNode(t)});break;case"mesh":i=this._invokeOne(function(s){return s.loadMesh&&s.loadMesh(t)});break;case"accessor":i=this.loadAccessor(t);break;case"bufferView":i=this._invokeOne(function(s){return s.loadBufferView&&s.loadBufferView(t)});break;case"buffer":i=this.loadBuffer(t);break;case"material":i=this._invokeOne(function(s){return s.loadMaterial&&s.loadMaterial(t)});break;case"texture":i=this._invokeOne(function(s){return s.loadTexture&&s.loadTexture(t)});break;case"skin":i=this.loadSkin(t);break;case"animation":i=this._invokeOne(function(s){return s.loadAnimation&&s.loadAnimation(t)});break;case"camera":i=this.loadCamera(t);break;default:if(i=this._invokeOne(function(s){return s!=this&&s.getDependency&&s.getDependency(e,t)}),!i)throw new Error("Unknown type: "+e);break}this.cache.add(n,i)}return i}getDependencies(e){let t=this.cache.get(e);if(!t){const n=this,i=this.json[e+(e==="mesh"?"es":"s")]||[];t=Promise.all(i.map(function(s,o){return n.getDependency(e,o)})),this.cache.add(e,t)}return t}loadBuffer(e){const t=this.json.buffers[e],n=this.fileLoader;if(t.type&&t.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+t.type+" buffer type is not supported.");if(t.uri===void 0&&e===0)return Promise.resolve(this.extensions[ct.KHR_BINARY_GLTF].body);const i=this.options;return new Promise(function(s,o){n.load(sr.resolveURL(t.uri,i.path),s,void 0,function(){o(new Error('THREE.GLTFLoader: Failed to load buffer "'+t.uri+'".'))})})}loadBufferView(e){const t=this.json.bufferViews[e];return this.getDependency("buffer",t.buffer).then(function(n){const i=t.byteLength||0,s=t.byteOffset||0;return n.slice(s,s+i)})}loadAccessor(e){const t=this,n=this.json,i=this.json.accessors[e];if(i.bufferView===void 0&&i.sparse===void 0){const o=va[i.type],c=ms[i.componentType],l=i.normalized===!0,a=new c(i.count*o);return Promise.resolve(new It(a,o,l))}const s=[];return i.bufferView!==void 0?s.push(this.getDependency("bufferView",i.bufferView)):s.push(null),i.sparse!==void 0&&(s.push(this.getDependency("bufferView",i.sparse.indices.bufferView)),s.push(this.getDependency("bufferView",i.sparse.values.bufferView))),Promise.all(s).then(function(o){const c=o[0],l=va[i.type],a=ms[i.componentType],h=a.BYTES_PER_ELEMENT,u=h*l,f=i.byteOffset||0,_=i.bufferView!==void 0?n.bufferViews[i.bufferView].byteStride:void 0,p=i.normalized===!0;let g,d;if(_&&_!==u){const m=Math.floor(f/_),x="InterleavedBuffer:"+i.bufferView+":"+i.componentType+":"+m+":"+i.count;let v=t.cache.get(x);v||(g=new a(c,m*_,i.count*_/h),v=new Tu(g,_/h),t.cache.add(x,v)),d=new fr(v,l,f%_/h,p)}else c===null?g=new a(i.count*l):g=new a(c,f,i.count*l),d=new It(g,l,p);if(i.sparse!==void 0){const m=va.SCALAR,x=ms[i.sparse.indices.componentType],v=i.sparse.indices.byteOffset||0,y=i.sparse.values.byteOffset||0,b=new x(o[1],v,i.sparse.count*m),S=new a(o[2],y,i.sparse.count*l);c!==null&&(d=new It(d.array.slice(),d.itemSize,d.normalized)),d.normalized=!1;for(let w=0,M=b.length;w<M;w++){const T=b[w];if(d.setX(T,S[w*l]),l>=2&&d.setY(T,S[w*l+1]),l>=3&&d.setZ(T,S[w*l+2]),l>=4&&d.setW(T,S[w*l+3]),l>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}d.normalized=p}return d})}loadTexture(e){const t=this.json,n=this.options,s=t.textures[e].source,o=t.images[s];let c=this.textureLoader;if(o.uri){const l=n.manager.getHandler(o.uri);l!==null&&(c=l)}return this.loadTextureImage(e,s,c)}loadTextureImage(e,t,n){const i=this,s=this.json,o=s.textures[e],c=s.images[t],l=(c.uri||c.bufferView)+":"+o.sampler;if(this.textureCache[l])return this.textureCache[l];const a=this.loadImageSource(t,n).then(function(h){h.flipY=!1,h.name=o.name||c.name||"",h.name===""&&typeof c.uri=="string"&&c.uri.startsWith("data:image/")===!1&&(h.name=c.uri);const f=(s.samplers||{})[o.sampler]||{};return h.magFilter=Zh[f.magFilter]||Vt,h.minFilter=Zh[f.minFilter]||Bn,h.wrapS=$h[f.wrapS]||Bi,h.wrapT=$h[f.wrapT]||Bi,h.generateMipmaps=!h.isCompressedTexture&&h.minFilter!==Gt&&h.minFilter!==Vt,i.associations.set(h,{textures:e}),h}).catch(function(){return null});return this.textureCache[l]=a,a}loadImageSource(e,t){const n=this,i=this.json,s=this.options;if(this.sourceCache[e]!==void 0)return this.sourceCache[e].then(u=>u.clone());const o=i.images[e],c=self.URL||self.webkitURL;let l=o.uri||"",a=!1;if(o.bufferView!==void 0)l=n.getDependency("bufferView",o.bufferView).then(function(u){a=!0;const f=new Blob([u],{type:o.mimeType});return l=c.createObjectURL(f),l});else if(o.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+e+" is missing URI and bufferView");const h=Promise.resolve(l).then(function(u){return new Promise(function(f,_){let p=f;t.isImageBitmapLoader===!0&&(p=function(g){const d=new Ht(g);d.needsUpdate=!0,f(d)}),t.load(sr.resolveURL(u,s.path),p,void 0,_)})}).then(function(u){return a===!0&&c.revokeObjectURL(l),Nn(u,o),u.userData.mimeType=o.mimeType||f1(o.uri),u}).catch(function(u){throw console.error("THREE.GLTFLoader: Couldn't load texture",l),u});return this.sourceCache[e]=h,h}assignTexture(e,t,n,i){const s=this;return this.getDependency("texture",n.index).then(function(o){if(!o)return null;if(n.texCoord!==void 0&&n.texCoord>0&&(o=o.clone(),o.channel=n.texCoord),s.extensions[ct.KHR_TEXTURE_TRANSFORM]){const c=n.extensions!==void 0?n.extensions[ct.KHR_TEXTURE_TRANSFORM]:void 0;if(c){const l=s.associations.get(o);o=s.extensions[ct.KHR_TEXTURE_TRANSFORM].extendTexture(o,c),s.associations.set(o,l)}}return i!==void 0&&(o.colorSpace=i),e[t]=o,o})}assignFinalMaterial(e){const t=e.geometry;let n=e.material;const i=t.attributes.tangent===void 0,s=t.attributes.color!==void 0,o=t.attributes.normal===void 0;if(e.isPoints){const c="PointsMaterial:"+n.uuid;let l=this.cache.get(c);l||(l=new Qc,Rn.prototype.copy.call(l,n),l.color.copy(n.color),l.map=n.map,l.sizeAttenuation=!1,this.cache.add(c,l)),n=l}else if(e.isLine){const c="LineBasicMaterial:"+n.uuid;let l=this.cache.get(c);l||(l=new Cu,Rn.prototype.copy.call(l,n),l.color.copy(n.color),l.map=n.map,this.cache.add(c,l)),n=l}if(i||s||o){let c="ClonedMaterial:"+n.uuid+":";i&&(c+="derivative-tangents:"),s&&(c+="vertex-colors:"),o&&(c+="flat-shading:");let l=this.cache.get(c);l||(l=n.clone(),s&&(l.vertexColors=!0),o&&(l.flatShading=!0),i&&(l.normalScale&&(l.normalScale.y*=-1),l.clearcoatNormalScale&&(l.clearcoatNormalScale.y*=-1)),this.cache.add(c,l),this.associations.set(l,this.associations.get(n))),n=l}e.material=n}getMaterialType(){return _e}loadMaterial(e){const t=this,n=this.json,i=this.extensions,s=n.materials[e];let o;const c={},l=s.extensions||{},a=[];if(l[ct.KHR_MATERIALS_UNLIT]){const u=i[ct.KHR_MATERIALS_UNLIT];o=u.getMaterialType(),a.push(u.extendParams(c,s,t))}else{const u=s.pbrMetallicRoughness||{};if(c.color=new Se(1,1,1),c.opacity=1,Array.isArray(u.baseColorFactor)){const f=u.baseColorFactor;c.color.setRGB(f[0],f[1],f[2],un),c.opacity=f[3]}u.baseColorTexture!==void 0&&a.push(t.assignTexture(c,"map",u.baseColorTexture,Tt)),c.metalness=u.metallicFactor!==void 0?u.metallicFactor:1,c.roughness=u.roughnessFactor!==void 0?u.roughnessFactor:1,u.metallicRoughnessTexture!==void 0&&(a.push(t.assignTexture(c,"metalnessMap",u.metallicRoughnessTexture)),a.push(t.assignTexture(c,"roughnessMap",u.metallicRoughnessTexture))),o=this._invokeOne(function(f){return f.getMaterialType&&f.getMaterialType(e)}),a.push(Promise.all(this._invokeAll(function(f){return f.extendMaterialParams&&f.extendMaterialParams(e,c)})))}s.doubleSided===!0&&(c.side=Ct);const h=s.alphaMode||ya.OPAQUE;if(h===ya.BLEND?(c.transparent=!0,c.depthWrite=!1):(c.transparent=!1,h===ya.MASK&&(c.alphaTest=s.alphaCutoff!==void 0?s.alphaCutoff:.5)),s.normalTexture!==void 0&&o!==Ot&&(a.push(t.assignTexture(c,"normalMap",s.normalTexture)),c.normalScale=new ee(1,1),s.normalTexture.scale!==void 0)){const u=s.normalTexture.scale;c.normalScale.set(u,u)}if(s.occlusionTexture!==void 0&&o!==Ot&&(a.push(t.assignTexture(c,"aoMap",s.occlusionTexture)),s.occlusionTexture.strength!==void 0&&(c.aoMapIntensity=s.occlusionTexture.strength)),s.emissiveFactor!==void 0&&o!==Ot){const u=s.emissiveFactor;c.emissive=new Se().setRGB(u[0],u[1],u[2],un)}return s.emissiveTexture!==void 0&&o!==Ot&&a.push(t.assignTexture(c,"emissiveMap",s.emissiveTexture,Tt)),Promise.all(a).then(function(){const u=new o(c);return s.name&&(u.name=s.name),Nn(u,s),t.associations.set(u,{materials:e}),s.extensions&&Li(i,u,s),u})}createUniqueName(e){const t=mt.sanitizeNodeName(e||"");return t in this.nodeNamesUsed?t+"_"+ ++this.nodeNamesUsed[t]:(this.nodeNamesUsed[t]=0,t)}loadGeometries(e){const t=this,n=this.extensions,i=this.primitiveCache;function s(c){return n[ct.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(c,t).then(function(l){return Qh(l,c,t)})}const o=[];for(let c=0,l=e.length;c<l;c++){const a=e[c],h=u1(a),u=i[h];if(u)o.push(u.promise);else{let f;a.extensions&&a.extensions[ct.KHR_DRACO_MESH_COMPRESSION]?f=s(a):f=Qh(new Et,a,t),i[h]={primitive:a,promise:f},o.push(f)}}return Promise.all(o)}loadMesh(e){const t=this,n=this.json,i=this.extensions,s=n.meshes[e],o=s.primitives,c=[];for(let l=0,a=o.length;l<a;l++){const h=o[l].material===void 0?c1(this.cache):this.getDependency("material",o[l].material);c.push(h)}return c.push(t.loadGeometries(o)),Promise.all(c).then(function(l){const a=l.slice(0,l.length-1),h=l[l.length-1],u=[];for(let _=0,p=h.length;_<p;_++){const g=h[_],d=o[_];let m;const x=a[_];if(d.mode===_n.TRIANGLES||d.mode===_n.TRIANGLE_STRIP||d.mode===_n.TRIANGLE_FAN||d.mode===void 0)m=s.isSkinnedMesh===!0?new ep(g,x):new G(g,x),m.isSkinnedMesh===!0&&m.normalizeSkinWeights(),d.mode===_n.TRIANGLE_STRIP?m.geometry=Kh(m.geometry,vu):d.mode===_n.TRIANGLE_FAN&&(m.geometry=Kh(m.geometry,fc));else if(d.mode===_n.LINES)m=new op(g,x);else if(d.mode===_n.LINE_STRIP)m=new $c(g,x);else if(d.mode===_n.LINE_LOOP)m=new ap(g,x);else if(d.mode===_n.POINTS)m=new Pu(g,x);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+d.mode);Object.keys(m.geometry.morphAttributes).length>0&&h1(m,s),m.name=t.createUniqueName(s.name||"mesh_"+e),Nn(m,s),d.extensions&&Li(i,m,d),t.assignFinalMaterial(m),u.push(m)}for(let _=0,p=u.length;_<p;_++)t.associations.set(u[_],{meshes:e,primitives:_});if(u.length===1)return s.extensions&&Li(i,u[0],s),u[0];const f=new gt;s.extensions&&Li(i,f,s),t.associations.set(f,{meshes:e});for(let _=0,p=u.length;_<p;_++)f.add(u[_]);return f})}loadCamera(e){let t;const n=this.json.cameras[e],i=n[n.type];if(!i){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return n.type==="perspective"?t=new tn(gn.radToDeg(i.yfov),i.aspectRatio||1,i.znear||1,i.zfar||2e6):n.type==="orthographic"&&(t=new yr(-i.xmag,i.xmag,i.ymag,-i.ymag,i.znear,i.zfar)),n.name&&(t.name=this.createUniqueName(n.name)),Nn(t,n),Promise.resolve(t)}loadSkin(e){const t=this.json.skins[e],n=[];for(let i=0,s=t.joints.length;i<s;i++)n.push(this._loadNodeShallow(t.joints[i]));return t.inverseBindMatrices!==void 0?n.push(this.getDependency("accessor",t.inverseBindMatrices)):n.push(null),Promise.all(n).then(function(i){const s=i.pop(),o=i,c=[],l=[];for(let a=0,h=o.length;a<h;a++){const u=o[a];if(u){c.push(u);const f=new Ke;s!==null&&f.fromArray(s.array,a*16),l.push(f)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',t.joints[a])}return new Jc(c,l)})}loadAnimation(e){const t=this.json,n=this,i=t.animations[e],s=i.name?i.name:"animation_"+e,o=[],c=[],l=[],a=[],h=[];for(let u=0,f=i.channels.length;u<f;u++){const _=i.channels[u],p=i.samplers[_.sampler],g=_.target,d=g.node,m=i.parameters!==void 0?i.parameters[p.input]:p.input,x=i.parameters!==void 0?i.parameters[p.output]:p.output;g.node!==void 0&&(o.push(this.getDependency("node",d)),c.push(this.getDependency("accessor",m)),l.push(this.getDependency("accessor",x)),a.push(p),h.push(g))}return Promise.all([Promise.all(o),Promise.all(c),Promise.all(l),Promise.all(a),Promise.all(h)]).then(function(u){const f=u[0],_=u[1],p=u[2],g=u[3],d=u[4],m=[];for(let v=0,y=f.length;v<y;v++){const b=f[v],S=_[v],w=p[v],M=g[v],T=d[v];if(b===void 0)continue;b.updateMatrix&&b.updateMatrix();const R=n._createAnimationTracks(b,S,w,M,T);if(R)for(let P=0;P<R.length;P++)m.push(R[P])}const x=new yc(s,void 0,m);return Nn(x,i),x})}createNodeMesh(e){const t=this.json,n=this,i=t.nodes[e];return i.mesh===void 0?null:n.getDependency("mesh",i.mesh).then(function(s){const o=n._getNodeRef(n.meshCache,i.mesh,s);return i.weights!==void 0&&o.traverse(function(c){if(c.isMesh)for(let l=0,a=i.weights.length;l<a;l++)c.morphTargetInfluences[l]=i.weights[l]}),o})}loadNode(e){const t=this.json,n=this,i=t.nodes[e],s=n._loadNodeShallow(e),o=[],c=i.children||[];for(let a=0,h=c.length;a<h;a++)o.push(n.getDependency("node",c[a]));const l=i.skin===void 0?Promise.resolve(null):n.getDependency("skin",i.skin);return Promise.all([s,Promise.all(o),l]).then(function(a){const h=a[0],u=a[1],f=a[2];f!==null&&h.traverse(function(_){_.isSkinnedMesh&&_.bind(f,d1)});for(let _=0,p=u.length;_<p;_++)h.add(u[_]);if(h.userData.pivot!==void 0&&u.length>0){const _=h.userData.pivot,p=u[0];h.pivot=new L().fromArray(_),h.position.x-=_[0],h.position.y-=_[1],h.position.z-=_[2],p.position.set(0,0,0),delete h.userData.pivot}return h})}_loadNodeShallow(e){const t=this.json,n=this.extensions,i=this;if(this.nodeCache[e]!==void 0)return this.nodeCache[e];const s=t.nodes[e],o=s.name?i.createUniqueName(s.name):"",c=[],l=i._invokeOne(function(a){return a.createNodeMesh&&a.createNodeMesh(e)});return l&&c.push(l),s.camera!==void 0&&c.push(i.getDependency("camera",s.camera).then(function(a){return i._getNodeRef(i.cameraCache,s.camera,a)})),i._invokeAll(function(a){return a.createNodeAttachment&&a.createNodeAttachment(e)}).forEach(function(a){c.push(a)}),this.nodeCache[e]=Promise.all(c).then(function(a){let h;if(s.isBone===!0?h=new Au:a.length>1?h=new gt:a.length===1?h=a[0]:h=new bt,h!==a[0])for(let u=0,f=a.length;u<f;u++)h.add(a[u]);if(s.name&&(h.userData.name=s.name,h.name=o),Nn(h,s),s.extensions&&Li(n,h,s),s.matrix!==void 0){const u=new Ke;u.fromArray(s.matrix),h.applyMatrix4(u)}else s.translation!==void 0&&h.position.fromArray(s.translation),s.rotation!==void 0&&h.quaternion.fromArray(s.rotation),s.scale!==void 0&&h.scale.fromArray(s.scale);if(!i.associations.has(h))i.associations.set(h,{});else if(s.mesh!==void 0&&i.meshCache.refs[s.mesh]>1){const u=i.associations.get(h);i.associations.set(h,{...u})}return i.associations.get(h).nodes=e,h}),this.nodeCache[e]}loadScene(e){const t=this.extensions,n=this.json.scenes[e],i=this,s=new gt;n.name&&(s.name=i.createUniqueName(n.name)),Nn(s,n),n.extensions&&Li(t,s,n);const o=n.nodes||[],c=[];for(let l=0,a=o.length;l<a;l++)c.push(i.getDependency("node",o[l]));return Promise.all(c).then(function(l){for(let h=0,u=l.length;h<u;h++){const f=l[h];f.parent!==null?s.add(Ux(f)):s.add(f)}const a=h=>{const u=new Map;for(const[f,_]of i.associations)(f instanceof Rn||f instanceof Ht)&&u.set(f,_);return h.traverse(f=>{const _=i.associations.get(f);_!=null&&u.set(f,_)}),u};return i.associations=a(s),s})}_createAnimationTracks(e,t,n,i,s){const o=[],c=e.name?e.name:e.uuid,l=[];function a(_){_.morphTargetInfluences&&l.push(_.name?_.name:_.uuid)}yi[s.path]===yi.weights?(a(e),e.isGroup&&e.children.forEach(a)):l.push(c);let h;switch(yi[s.path]){case yi.weights:h=bs;break;case yi.rotation:h=ws;break;case yi.translation:case yi.scale:h=Ts;break;default:switch(n.itemSize){case 1:h=bs;break;case 2:case 3:default:h=Ts;break}break}const u=i.interpolation!==void 0?a1[i.interpolation]:lr,f=this._getArrayFromAccessor(n);for(let _=0,p=l.length;_<p;_++){const g=new h(l[_]+"."+yi[s.path],t.array,f,u);i.interpolation==="CUBICSPLINE"&&this._createCubicSplineTrackInterpolant(g),o.push(g)}return o}_getArrayFromAccessor(e){let t=e.array;if(e.normalized){const n=Ec(t.constructor),i=new Float32Array(t.length);for(let s=0,o=t.length;s<o;s++)i[s]=t[s]*n;t=i}return t}_createCubicSplineTrackInterpolant(e){e.createInterpolant=function(n){const i=this instanceof ws?o1:of;return new i(this.times,this.values,this.getValueSize()/3,n)},e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}}function m1(r,e,t){const n=e.attributes,i=new Wn;if(n.POSITION!==void 0){const c=t.json.accessors[n.POSITION],l=c.min,a=c.max;if(l!==void 0&&a!==void 0){if(i.set(new L(l[0],l[1],l[2]),new L(a[0],a[1],a[2])),c.normalized){const h=Ec(ms[c.componentType]);i.min.multiplyScalar(h),i.max.multiplyScalar(h)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;const s=e.targets;if(s!==void 0){const c=new L,l=new L;for(let a=0,h=s.length;a<h;a++){const u=s[a];if(u.POSITION!==void 0){const f=t.json.accessors[u.POSITION],_=f.min,p=f.max;if(_!==void 0&&p!==void 0){if(l.setX(Math.max(Math.abs(_[0]),Math.abs(p[0]))),l.setY(Math.max(Math.abs(_[1]),Math.abs(p[1]))),l.setZ(Math.max(Math.abs(_[2]),Math.abs(p[2]))),f.normalized){const g=Ec(ms[f.componentType]);l.multiplyScalar(g)}c.max(l)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}i.expandByVector(c)}r.boundingBox=i;const o=new Xn;i.getCenter(o.center),o.radius=i.min.distanceTo(i.max)/2,r.boundingSphere=o}function Qh(r,e,t){const n=e.attributes,i=[];function s(o,c){return t.getDependency("accessor",o).then(function(l){r.setAttribute(c,l)})}for(const o in n){const c=Tc[o]||o.toLowerCase();c in r.attributes||i.push(s(n[o],c))}if(e.indices!==void 0&&!r.index){const o=t.getDependency("accessor",e.indices).then(function(c){r.setIndex(c)});i.push(o)}return at.workingColorSpace!==un&&"COLOR_0"in n&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${at.workingColorSpace}" not supported.`),Nn(r,e),m1(r,e,t),Promise.all(i).then(function(){return e.targets!==void 0?l1(r,e.targets,t):r})}const af=new Fx,Sa=new Map;let ba=null;async function cf(){return ba||(ba=fetch("./models/manifest.json").then(r=>r.ok?r.json():null).catch(()=>null)),ba}function lf(r){return r.startsWith("http")?r:`./${r.replace(/^\//,"")}`}async function hf(r){try{return(await fetch(r,{method:"HEAD"})).ok}catch{return!1}}function uf(r,e,t=1){const n=new Wn().setFromObject(r);if(n.isEmpty())return;const i=n.getSize(new L),s=n.getCenter(new L),o=Math.max(i.x,i.y,i.z,.001),c=e/o*t;r.scale.setScalar(c),r.position.sub(s.multiplyScalar(c)),r.position.y+=i.y*c/2}function g1(r,e){const t=new Set(e.map(i=>i.toLowerCase()));let n=null;return r.traverse(i=>{var c;if(n)return;const s=i;if(!s.isMesh)return;const o=s.name.toLowerCase();(t.has(o)||t.has(((c=i.parent)==null?void 0:c.name.toLowerCase())??""))&&(n=s)}),n}function ff(r){r.traverse(e=>{const t=e;if(!t.isMesh)return;t.castShadow=!0,t.receiveShadow=!0;const n=Array.isArray(t.material)?t.material:[t.material];for(const i of n)i&&"color"in i&&i instanceof _e&&(i.envMapIntensity=1)})}async function _1(r,e,t){var i,s;const n=lf(r);if(!await hf(n))return null;try{if(!Sa.has(n)){const c=(await af.loadAsync(n)).scene,l=e.targetHeight??((i=t.defaults)==null?void 0:i.targetHeight)??6;uf(c,l,e.scale??((s=t.defaults)==null?void 0:s.scale)??1),ff(c),Sa.set(n,c)}return Sa.get(n).clone(!0)}catch{return null}}async function x1(r,e,t){var i,s;const n=lf(r);if(!await hf(n))return null;try{const o=await af.loadAsync(n),c=o.scene,l=e.targetHeight??((i=t.defaults)==null?void 0:i.targetHeight)??1.9;return uf(c,l,e.scale??((s=t.defaults)==null?void 0:s.scale)??1),ff(c),{group:c,clips:o.animations??[]}}catch{return null}}function Po(r,e){return new dn({color:r,emissive:r,emissiveIntensity:e,metalness:.15,roughness:.08,clearcoat:1,clearcoatRoughness:.05,reflectivity:1,transparent:!0,opacity:.92,side:Ct})}function fn(r,e=.82){return new _e({color:r,roughness:e,metalness:.06,envMapIntensity:.4})}function wa(r){return new _e({color:r,roughness:.88,metalness:.04,emissive:1718816,emissiveIntensity:.06})}function v1(r){return new _e({color:r?7268279:6000111,emissive:r?3462041:3900150,emissiveIntensity:r?.72:.38,roughness:.18,metalness:.4,transparent:!0,opacity:.88})}function eu(){return new dn({color:1993370,roughness:.06,metalness:.12,transparent:!0,opacity:.72,reflectivity:.95,clearcoat:1,clearcoatRoughness:.08,envMapIntensity:.6})}function y1(r){const t=document.createElement("canvas");t.width=64,t.height=64;const n=t.getContext("2d"),i=n.createRadialGradient(64/2,64/2,0,64/2,64/2,64/2);return i.addColorStop(0,r),i.addColorStop(.4,"rgba(255,220,140,0.35)"),i.addColorStop(1,"rgba(0,0,0,0)"),n.fillStyle=i,n.fillRect(0,0,64,64),new oi(t)}function M1(){return new _e({color:4871528,roughness:.45,metalness:.85})}function S1(r){return new dn({color:r,emissive:r,emissiveIntensity:1.4,roughness:.04,metalness:0,transparent:!0,opacity:.82,clearcoat:1})}function tu(r=1){const e=new gt,t=new G(new Ae(.14*r,.26*r,1.7*r,10),fn(4863784,.95));t.position.y=.85*r,t.castShadow=!0,e.add(t);const n=[2976335,3504728,2580548,3836514],i=[[0,2.5,0,1.05],[.55,2.25,.2,.72],[-.5,2.3,-.25,.7],[.15,2.95,-.1,.78],[-.2,2.7,.45,.6]];for(const[s,o,c,l]of i){const a=new _e({color:n[Math.floor(Math.random()*n.length)],roughness:.82,metalness:.02,flatShading:!0}),h=new G(new Ti(l*r,1),a);h.position.set(s*r,o*r,c*r),h.castShadow=!0,e.add(h)}return e}function nu(r=1){const e=new gt,t=new G(new Ae(.12*r,.2*r,1.2*r,10),fn(4009506,.9));t.position.y=.6*r,t.castShadow=!0;for(let n=0;n<5;n++){const i=new G(new kt((1.15-n*.17)*r,1*r,9),new _e({color:1786674+n*131842,roughness:.72,flatShading:!0}));i.position.y=(1.3+n*.62)*r,i.rotation.y=n*.4,i.castShadow=!0,e.add(i)}return e.add(t),e}function b1(){const r=new hn(.09,.5,1,3);r.translate(0,.25,0);const e=r.clone();e.rotateY(Math.PI/2);const t=w1([r,e]),n=t.attributes.position,i=new Float32Array(n.count*3);for(let s=0;s<n.count;s++){const o=gn.clamp(n.getY(s)/.5,0,1);i[s*3]=.16+o*.22,i[s*3+1]=.3+o*.4,i[s*3+2]=.14+o*.16}return t.setAttribute("color",new It(i,3)),t}function w1(r){const e=new Et;let t=0,n=0;for(const h of r)t+=h.attributes.position.count,n+=h.index?h.index.count:h.attributes.position.count;const i=new Float32Array(t*3),s=new Float32Array(t*3),o=new Float32Array(t*2),c=new Uint32Array(n);let l=0,a=0;for(const h of r){const u=h.attributes.position,f=h.attributes.normal,_=h.attributes.uv;i.set(u.array,l*3),f&&s.set(f.array,l*3),_&&o.set(_.array,l*2);const p=h.index;if(p)for(let g=0;g<p.count;g++)c[a++]=p.getX(g)+l;else for(let g=0;g<u.count;g++)c[a++]=g+l;l+=u.count}return e.setAttribute("position",new It(i,3)),e.setAttribute("normal",new It(s,3)),e.setAttribute("uv",new It(o,2)),e.setIndex(new It(c,1)),e}function so(r=1){const e=new G(new An(.55*r,1),fn(6054768,.88));return e.castShadow=!0,e.receiveShadow=!0,e}function df(r){const e=new gt,t=new G(new Ae(.06,.08,1.4,8),fn(3621201,.6));t.position.y=.7;const n=new G(new ve(.35,.45,.35),Po(r,.5));n.position.y=1.55;const i=new vn(r,.8,6);return i.position.y=1.55,e.add(t,n,i),e}const iu={forest:{primary:2051382,secondary:3462041,accent:7268279,crystal:4906624,ground:1717032},coast:{primary:1981023,secondary:3718648,accent:8246268,crystal:6333946,ground:1715778},library:{primary:3878751,secondary:10980346,accent:12891645,crystal:9133302,ground:2762048},market:{primary:4863776,secondary:16498468,accent:16569165,crystal:16096779,ground:4010016},temple:{primary:4857912,secondary:16020150,accent:16361684,crystal:15485081,ground:3481648},plains:{primary:3359061,secondary:9741240,accent:13358561,crystal:6583435,ground:2765888}};function Mr(r){return iu[r]??iu.plains}function pf(r,e,t){const n=new G(new Ae(.35,.55,1.6,16),fn(6045747,.75));n.position.y=1.1,n.castShadow=!0;const i=new G(new Ve(1.1,.14,10,24,Math.PI),fn(4876097,.7));i.rotation.z=Math.PI,i.position.y=2.2;const s=new G(new Ti(.95,1),t);return s.position.y=3.5,s.castShadow=!0,r.add(n,i,s),s}function T1(r,e,t){const n=new G(new ve(2.2,.2,1.4),fn(7035466,.65));n.position.set(0,.55,.4);const i=new G(new Ae(.45,.6,2.8,16),fn(13358561,.45));i.position.y=1.8,i.castShadow=!0;const s=new G(new Ye(.75,1),t);s.position.y=3.6;const o=new vn(e.crystal,1.2,10);return o.position.y=3.6,r.add(n,i,s,o),s}function E1(r,e,t){const n=new G(new ve(2.6,.5,2.2),fn(10265519,.35));n.position.y=.55;const i=new G(new kt(1.8,1.2,4),new _e({color:e.primary,roughness:.4,metalness:.2}));i.position.y=1.4,i.rotation.y=Math.PI/4;const s=new G(new Ae(.12,.15,2.2,12),fn(13751771,.3));s.position.set(-.9,1.3,0);const o=s.clone();o.position.x=.9;const c=new G(new nl(.55,.16,64,12),t);return c.position.y=3.2,r.add(n,i,s,o,c),c}function A1(r,e,t){const n=new G(new ve(2.4,.15,1.8),fn(9136404,.7));n.position.y=.55;const i=new G(new Ae(0,1.6,.9,4),new _e({color:e.secondary,roughness:.55,side:Ct}));i.position.y=1.8,i.rotation.y=Math.PI/4;const s=new G(new An(.8,0),t);s.position.y=3.1;const o=df(e.accent);return o.position.set(1.1,0,.6),r.add(n,i,s,o),s}function R1(r,e,t){const n=new G(new ve(3,.25,2.4),fn(10322313,.55));n.position.y=.5;const i=new G(new Ae(.25,.4,3.2,8),fn(12887477,.4));i.position.y=2.1,i.castShadow=!0;const s=new G(new Ve(1.3,.06,8,40),new _e({color:e.accent,emissive:e.accent,emissiveIntensity:.6,metalness:.8,roughness:.2}));s.rotation.x=Math.PI/2,s.position.y=3.8;const o=new G(new Ye(.9,2),t);return o.position.y=4.5,r.add(n,i,s,o),o}const C1={forest:pf,coast:T1,library:E1,market:A1,temple:R1};function P1(r,e){const t=Mr(r.theme),n=new gt,i=r.unlocked,s=i?1:.45,o=new G(new Ae(2.4,2.8,.35,24),new _e({color:t.ground,roughness:.55,metalness:.12,transparent:!i,opacity:s}));o.position.y=.18,o.receiveShadow=!0;const c=new G(new Ve(2.1,.08,12,48),new _e({color:t.secondary,emissive:t.accent,emissiveIntensity:i?.35:.08,roughness:.3,metalness:.55,transparent:!i,opacity:s}));c.rotation.x=Math.PI/2,c.position.y=.38,n.add(o,c);const l=Po(i?t.crystal:7041664,r.cleared?.85:i?.55:.12),a=(C1[r.theme]??pf)(n,t,l);if(a.userData.isCrystal=!0,e){const h=new G(new Vi(2.3,2.55,48),new Ot({color:16498468,transparent:!0,opacity:.55,side:Ct}));h.rotation.x=-Math.PI/2,h.position.y=.42,h.userData.isPulse=!0,n.add(h);const u=new sl(16774358,i?2.2:.4,18,Math.PI/5,.4);u.position.set(0,8,2),u.target.position.set(0,2,0),n.add(u,u.target)}if(r.cleared){const h=new G(new re(3.2,24,24),new Ot({color:t.accent,transparent:!0,opacity:.07,depthWrite:!1}));h.position.y=2,n.add(h)}if(r.dueCount&&r.dueCount>0&&i){const h=new G(new Vi(2.65,2.9,48),new Ot({color:16498468,transparent:!0,opacity:.42,side:Ct}));h.rotation.x=-Math.PI/2,h.position.y=.5,h.userData.isDueRing=!0,n.add(h)}return n}let Ta=null;async function L1(){return Ta||(Ta=await cf()),Ta}function D1(r,e){const t=Mr(e.theme),n=e.unlocked,i=n?1:.45,s=new G(new Ae(2.4,2.8,.35,24),new _e({color:t.ground,roughness:.55,metalness:.12,transparent:!n,opacity:i}));s.position.y=.18,s.receiveShadow=!0;const o=new G(new Ve(2.1,.08,12,48),new _e({color:t.secondary,emissive:t.accent,emissiveIntensity:n?.35:.08,roughness:.3,metalness:.55,transparent:!n,opacity:i}));o.rotation.x=Math.PI/2,o.position.y=.38,r.add(s,o)}function I1(r,e,t,n,i){if(t){const s=new G(new Vi(2.3,2.55,48),new Ot({color:16498468,transparent:!0,opacity:.55,side:Ct}));s.rotation.x=-Math.PI/2,s.position.y=.42,s.userData.isPulse=!0,r.add(s);const o=new sl(16774358,n?2.2:.4,18,Math.PI/5,.4);o.position.set(0,8,2),o.target.position.set(0,2,0),r.add(o,o.target)}if(e.cleared){const s=new G(new re(3.2,24,24),new Ot({color:i.accent,transparent:!0,opacity:.07,depthWrite:!1}));s.position.y=2,r.add(s)}if(e.dueCount&&e.dueCount>0&&n){const s=new G(new Vi(2.65,2.9,48),new Ot({color:16498468,transparent:!0,opacity:.42,side:Ct}));s.rotation.x=-Math.PI/2,s.position.y=.5,s.userData.isDueRing=!0,r.add(s)}}function su(r,e){const t=Mr(r.theme),n=new G(new Ti(.85,1),Po(r.unlocked?t.crystal:7041664,.65));return n.position.y=3.6,n.castShadow=!0,n.userData.isCrystal=!0,e.add(n),n}function N1(r){let e=null;return r.traverse(t=>{var i;if(e)return;const n=t;(i=n.userData)!=null&&i.isCrystal&&(e=n)}),e}async function U1(r,e){var l,a,h;const t=await L1(),n=Mr(r.theme),i=r.name.includes("学习圣所"),s=t&&!i?((l=t.nodes)==null?void 0:l[r.id])??((a=t.themes)==null?void 0:a[r.theme])??null:null;if(t&&s){const u=await _1(s.file,s,t);if(u){const f=new gt;D1(f,r),u.position.y=.35,f.add(u);const _=s.pickMeshNames??((h=t.defaults)==null?void 0:h.pickMeshNames)??["Crystal","PICK"];let p=g1(u,_);return p?p.userData.isCrystal=!0:p=su(r,f),I1(f,r,e,r.unlocked,n),{root:f,crystal:p}}}const o=P1(r,e),c=N1(o)??su(r,o);return{root:o,crystal:c}}function ru(r,e,t){const n=new gt,i=.4,s=.38,o=.14,c=.115,l=new G(new ki(o,i,5,10),r);l.position.y=-.24200000000000002,l.castShadow=!0,n.add(l);const a=new gt;a.position.y=-.42800000000000005,n.add(a);const h=new G(new ki(c,s,5,10),e);h.position.y=-.2245,h.castShadow=!0,a.add(h);const u=new G(new ve(.18,.1,.36),t);return u.position.set(0,-.426,.08),u.castShadow=!0,a.add(u),{hip:n,knee:a}}function ou(r,e,t){const n=new gt,i=new G(new ki(t.upperR,t.upperLen,5,10),r);i.position.y=-(t.upperLen/2+t.upperR),i.castShadow=!0,n.add(i);const s=-(t.upperLen+t.upperR*2),o=new G(new ki(t.lowerR,t.lowerLen,5,10),e);o.position.y=s-(t.lowerLen/2+t.lowerR),o.castShadow=!0,n.add(o);const c=s-(t.lowerLen+t.lowerR*2);if(t.footMat){const l=new G(new ve(t.lowerR*2.1,.1,.34),t.footMat);l.position.set(0,c+.04,.08),l.castShadow=!0,n.add(l)}else if(t.endMat&&t.endR){const l=new G(new re(t.endR,12,10),t.endMat);l.position.y=c,l.castShadow=!0,n.add(l)}return n}function F1(){const r=new gt;r.name="Explorer";const e=new _e({color:3100538,roughness:.62,metalness:.08}),t=new _e({color:2765632,roughness:.78,metalness:.04}),n=new _e({color:15713440,roughness:.66,metalness:.02}),i=new _e({color:1713456,roughness:.7,metalness:.06}),s=new _e({color:2759958,roughness:.8,metalness:.02}),o=new _e({color:6000111,roughness:.4,metalness:.3,emissive:1784440,emissiveIntensity:.4}),c=new G(new ve(.46,.26,.3),t);c.position.y=.98,c.castShadow=!0,r.add(c);const l=new G(new ki(.3,.4,6,14),e);l.position.y=1.32,l.scale.set(1.12,1,.78),l.castShadow=!0,r.add(l);const a=new G(new Ve(.26,.04,8,20),o);a.position.y=1.52,a.rotation.x=Math.PI/2,a.scale.set(1.05,.7,1),r.add(a);const h=new G(new ve(.5,.08,.34),o);h.position.y=1.1,r.add(h);const u=new G(new ve(.4,.5,.22),e);u.position.set(0,1.34,-.32),u.castShadow=!0;const f=new G(new ve(.42,.12,.24),o);f.position.set(0,1.5,-.32),r.add(u,f);const _=new gt;_.position.y=1.6;const p=new G(new Ae(.1,.12,.14,10),n);p.position.y=.04;const g=new G(new re(.23,22,22),n);g.position.y=.28,g.castShadow=!0;const d=new G(new re(.245,18,14,0,Math.PI*2,0,Math.PI*.62),s);d.position.y=.31,_.add(p,g,d);const m=new _e({color:1450028,roughness:.3,metalness:.1}),x=new re(.035,10,10),v=new G(x,m);v.position.set(.085,.3,.205);const y=new G(x,m);y.position.set(-.085,.3,.205);const b=new _e({color:2759958,roughness:.8}),S=new G(new ve(.26,.03,.04),b);S.position.set(0,.37,.2);const w=new _e({color:8011824,roughness:.6}),M=new G(new ve(.11,.022,.03),w);M.position.set(0,.2,.216),_.add(v,y,S,M),r.add(_);const T=new gt;T.position.set(0,1.52,-.16);const R=new _e({color:3894230,roughness:.6,metalness:.1,side:Ct,emissive:1320798,emissiveIntensity:.25}),P=new G(new hn(.66,.95,1,5),R);P.position.y=-.45,P.castShadow=!0,T.add(P),T.rotation.x=-.18,r.add(T);const D=ru(t,t,i);D.hip.position.set(.16,.88,0);const U=ru(t,t,i);U.hip.position.set(-.16,.88,0),r.add(D.hip,U.hip);const k=ou(e,e,{upperR:.1,upperLen:.26,lowerR:.088,lowerLen:.24,endMat:n,endR:.095});k.position.set(.42,1.5,0);const N=ou(e,e,{upperR:.1,upperLen:.26,lowerR:.088,lowerLen:.24,endMat:n,endR:.095});N.position.set(-.42,1.5,0),r.add(k,N);const O=new G(new re(.12,14,14),Po(16498468,.9));O.position.set(-.5,1,.12);const z=new vn(16498468,1.2,10);z.position.copy(O.position),r.add(O,z);const j=new G(new Vi(.55,.74,36),new Ot({color:9684477,transparent:!0,opacity:.32,side:Ct}));j.rotation.x=-Math.PI/2,j.position.y=.03,j.userData.isFootRing=!0,r.add(j);const se={leftLeg:D,rightLeg:U,leftArm:k,rightArm:N,head:_,cape:T,eyeL:v,eyeR:y,brow:S,mouth:M,mats:{jacket:e,trim:o,cape:R}};return r.userData.rig=se,r}class O1{constructor(){$(this,"yaw",0);$(this,"pitch",.38);$(this,"targetPos",new L);$(this,"desiredPos",new L);$(this,"isDragging",!1);$(this,"lastX",0);$(this,"downX",0)}addYaw(e){this.yaw+=e}resetBehind(e){this.yaw=e}update(e,t,n,i){this.isDragging||(this.yaw+=(n-this.yaw)*Math.min(1,i*2.5));const s=Math.cos(this.yaw),o=Math.sin(this.yaw),c=Ef,l=Tf+Math.sin(this.pitch)*3;return this.desiredPos.set(t.x-o*c,t.y+l,t.z-s*c),e.position.lerp(this.desiredPos,1-Math.exp(-5*i)),this.targetPos.set(t.x,t.y+1.55,t.z),e.lookAt(this.targetPos),this.yaw}bindDrag(e){const t=s=>{this.downX=s.clientX,this.lastX=s.clientX,this.isDragging=!1},n=s=>{const o=s.clientX-this.lastX;this.lastX=s.clientX,!this.isDragging&&Math.abs(s.clientX-this.downX)>10&&(this.isDragging=!0),this.isDragging&&this.addYaw(-o*.006)},i=()=>{this.isDragging=!1};e.addEventListener("pointerdown",t),e.addEventListener("pointermove",n),e.addEventListener("pointerup",i),e.addEventListener("pointercancel",i)}}const B1=new Set(["w","a","s","d","arrowup","arrowdown","arrowleft","arrowright"]);class z1{constructor(){$(this,"position",new L);$(this,"yaw",0);$(this,"moveTarget",null);$(this,"keys",new Set);$(this,"stick",{x:0,z:0});$(this,"enabled",!0);$(this,"sprint",!1);$(this,"onKeyDown",e=>{if(!this.enabled)return;const t=e.key.toLowerCase();B1.has(t)&&this.keys.add(t),t==="shift"&&(this.sprint=!0)});$(this,"onKeyUp",e=>{const t=e.key.toLowerCase();this.keys.delete(t),t==="shift"&&(this.sprint=!1)});window.addEventListener("keydown",this.onKeyDown),window.addEventListener("keyup",this.onKeyUp)}dispose(){window.removeEventListener("keydown",this.onKeyDown),window.removeEventListener("keyup",this.onKeyUp)}setEnabled(e){this.enabled=e,e||(this.keys.clear(),this.moveTarget=null)}setPosition(e,t,n){this.position.set(e,t,n),this.moveTarget=null}setMoveTarget(e,t){this.moveTarget=new L(e,0,t)}clearMoveTarget(){this.moveTarget=null}setStickInput(e,t){this.stick.x=e,this.stick.z=t,(Math.abs(e)>.12||Math.abs(t)>.12)&&(this.moveTarget=null)}isMoving(){return this.keys.size>0||this.moveTarget!==null||Math.abs(this.stick.x)>.1||Math.abs(this.stick.z)>.1}update(e,t){if(!this.enabled)return;let n=0,i=0;if(this.moveTarget){const s=new L().subVectors(this.moveTarget,this.position);s.y=0,s.length()<.45?this.moveTarget=null:(s.normalize(),n=s.x,i=s.z,this.yaw=Math.atan2(n,i))}else{let s=(this.keys.has("w")||this.keys.has("arrowup")?1:0)-(this.keys.has("s")||this.keys.has("arrowdown")?1:0),o=(this.keys.has("d")||this.keys.has("arrowright")?1:0)-(this.keys.has("a")||this.keys.has("arrowleft")?1:0);if((Math.abs(this.stick.x)>.1||Math.abs(this.stick.z)>.1)&&(s=this.stick.z,o=this.stick.x),s!==0||o!==0){const c=Math.sin(t),l=Math.cos(t);n=o*l+s*c,i=o*-c+s*l;const a=Math.hypot(n,i)||1;n/=a,i/=a,this.yaw=Math.atan2(n,i)}}if(n!==0||i!==0){const s=Af*(this.sprint?1.85:1)*e;this.position.x+=n*s,this.position.z+=i*s}this.position.y=Bt(this.position.x,this.position.z,Ft)+.05}isSprinting(){return this.sprint&&this.isMoving()}}function k1(r,e){const t=document.createElement("canvas");t.width=512,t.height=128;const n=t.getContext("2d");n.fillStyle=e?"rgba(8, 18, 40, 0.72)":"rgba(40, 40, 40, 0.55)",au(n,8,8,496,112,20),n.fill(),n.strokeStyle=e?"rgba(147, 197, 253, 0.55)":"rgba(120, 120, 120, 0.4)",n.lineWidth=3,au(n,8,8,496,112,20),n.stroke(),n.fillStyle=e?"#f3f4f6":"#9ca3af",n.font="bold 28px 'Noto Sans SC', 'Microsoft YaHei', sans-serif";const i=r.length>22?r.slice(0,21)+"…":r;n.fillText(i,24,72);const s=new oi(t);s.colorSpace=Tt;const o=new Si({map:s,transparent:!0,depthWrite:!1}),c=new Ii(o);return c.scale.set(10,2.5,1),c.position.y=7.2,c.userData.isSignpost=!0,c}function au(r,e,t,n,i,s){r.beginPath(),r.moveTo(e+s,t),r.lineTo(e+n-s,t),r.quadraticCurveTo(e+n,t,e+n,t+s),r.lineTo(e+n,t+i-s),r.quadraticCurveTo(e+n,t+i,e+n-s,t+i),r.lineTo(e+s,t+i),r.quadraticCurveTo(e,t+i,e,t+i-s),r.lineTo(e,t+s),r.quadraticCurveTo(e,t,e+s,t),r.closePath()}const G1={unit01:{id:"unit01",label:"数字时代",skyTop:399139,skyMid:1457227,skyBot:7050883,fogColor:4877153,fogDensity:.0026,sunColor:12380115,sunIntensity:1.25,sunDiscScale:20,sunDiscOpacity:.24,sunFocusedDiscScale:24,sunFocusedDiscOpacity:.32,hemiSky:8108723,hemiGround:2177584,ambientColor:4949377,terrainTint:[.06,.42,.1],crystalColor:5286143,orbColor:3531726,glowColor:1609617,pathColor:2391683,decorStyle:"coast"},unit02:{id:"unit02",label:"传记人物",skyTop:4216427,skyMid:10195583,skyBot:14469544,fogColor:9800311,fogDensity:.0024,sunColor:16767398,sunIntensity:1.5,hemiSky:14865855,hemiGround:6443844,ambientColor:10982775,terrainTint:[.34,.28,.19],crystalColor:12158786,orbColor:14861696,glowColor:10317105,pathColor:7755311,decorStyle:"market"},unit03:{id:"unit03",label:"旅行探索",skyTop:1254700,skyMid:4811098,skyBot:9545621,fogColor:5992549,fogDensity:.0028,sunColor:16765345,sunIntensity:1.2,hemiSky:11388607,hemiGround:4014131,ambientColor:9018504,terrainTint:[.15,.23,.13],crystalColor:8631946,orbColor:12112526,glowColor:7448204,pathColor:5467990,decorStyle:"forest"},unit04:{id:"unit04",label:"劳动传统",skyTop:1907482,skyMid:5326395,skyBot:8615781,fogColor:5129275,fogDensity:.0028,sunColor:16766624,sunIntensity:1.25,hemiSky:13351073,hemiGround:3485481,ambientColor:9206116,terrainTint:[.2,.15,.1],crystalColor:13211224,orbColor:14991228,glowColor:11827778,pathColor:7822656,decorStyle:"temple"},unit05:{id:"unit05",label:"航天探索",skyTop:1120556,skyMid:3427178,skyBot:7439252,fogColor:5333879,fogDensity:.0026,sunColor:14018047,sunIntensity:1.15,hemiSky:10992338,hemiGround:3356999,ambientColor:7571880,terrainTint:[.2,.21,.25],crystalColor:9682408,orbColor:14412543,glowColor:7973087,pathColor:5401992,decorStyle:"space"},unit06:{id:"unit06",label:"共益交易城",skyTop:1059642,skyMid:4287600,skyBot:6323577,fogColor:3427666,fogDensity:.0028,sunColor:16765850,sunIntensity:1.25,hemiSky:10207178,hemiGround:4207917,ambientColor:7903642,terrainTint:[.085,.13,.125],crystalColor:14001007,orbColor:8243632,glowColor:5152657,pathColor:3501415,decorStyle:"exchange"}},Ac={id:"default",label:"",skyTop:3824266,skyMid:5929642,skyBot:659488,fogColor:1713472,fogDensity:.0042,sunColor:16774368,sunIntensity:1.45,hemiSky:13164799,hemiGround:2373672,ambientColor:10137804,terrainTint:[.09,.2,.1],crystalColor:6333946,orbColor:8438015,glowColor:4231406,pathColor:3170464,decorStyle:"forest"};function V1(r){return r?G1[r]??Ac:Ac}function Rc(r,e=Tt,t=1024){const n=document.createElement("canvas");n.width=t,n.height=t,r(n.getContext("2d"),t);const i=new oi(n);return i.wrapS=i.wrapT=Bi,i.colorSpace=e,i.generateMipmaps=!0,i.minFilter=Bn,i}function H1(){const r=ti(20260616),e=Rc((n,i)=>{n.fillStyle="#9a9a9a",n.fillRect(0,0,i,i);for(let s=0;s<60;s++){const o=r()*i,c=r()*i,l=30+r()*120,a=110+r()*110,h=n.createRadialGradient(o,c,0,o,c,l);h.addColorStop(0,`rgba(${a},${a},${a},0.5)`),h.addColorStop(1,"rgba(0,0,0,0)"),n.fillStyle=h,n.beginPath(),n.arc(o,c,l,0,Math.PI*2),n.fill()}for(let s=0;s<14e3;s++){const o=120+r()*100;n.fillStyle=`rgba(${o},${o},${o},0.5)`,n.fillRect(r()*i,r()*i,1.5,1.5)}},Fn),t=Rc((n,i)=>{n.fillStyle="#8080ff",n.fillRect(0,0,i,i);for(let s=0;s<12e3;s++){const o=96+r()*64,c=96+r()*64;n.fillStyle=`rgb(${o|0},${c|0},255)`;const l=1.5+r()*2.5;n.fillRect(r()*i,r()*i,l,l)}for(let s=0;s<40;s++){const o=r()*i,c=r()*i,l=24+r()*90,a=n.createRadialGradient(o,c,0,o,c,l);a.addColorStop(0,`rgba(${100+r()*50|0},${100+r()*50|0},255,0.4)`),a.addColorStop(1,"rgba(128,128,255,0)"),n.fillStyle=a,n.beginPath(),n.arc(o,c,l,0,Math.PI*2),n.fill()}},Fn);return e.repeat.set(14,18),t.repeat.set(14,18),{roughness:e,normal:t}}function W1(){const r=ti(20260930),e=Rc((t,n)=>{const i=t.createLinearGradient(0,0,n,n);i.addColorStop(0,"#ece9df"),i.addColorStop(.48,"#e6e6df"),i.addColorStop(1,"#e0e5df"),t.fillStyle=i,t.fillRect(0,0,n,n);for(let s=0;s<88;s++){const o=34+r()*116,c=r()*n,l=r()*n,h=r()>.56?"112,96,72":"76,104,88",u=.018+r()*.026,f=t.createRadialGradient(c,l,0,c,l,o);f.addColorStop(0,`rgba(${h},${u})`),f.addColorStop(1,`rgba(${h},0)`),t.fillStyle=f,t.beginPath(),t.arc(c,l,o,0,Math.PI*2),t.fill()}for(let s=0;s<12e3;s++){const o=r()>.52,c=o?"255,255,248":"62,75,65";t.fillStyle=`rgba(${c},${o?.055:.035+r()*.025})`,t.fillRect(r()*n,r()*n,.5+r()*1.7,.5+r()*1.7)}},Tt,1024);return e.repeat.set(14,18),e}const X1={unit01:{section_a:["message","dialogue","focus","listening-bench"],section_b:["notification","study-desk","filter","offline-rest"],section_c:["clinic","telemedicine","community","community-network"]},unit02:{section_a:["timeline","route-evidence","perseverance","archive-crossroads"],section_b:["spotlight","humanitarian","lasting-service","community-witness"],section_c:["fleet","peace-contact","chart-room","exchange-harbor"]},unit03:{section_a:["itinerary","detour","market-encounter","reflection-garden"],section_b:["hostel","open-route","rain-shelter","confidence"],section_c:["rail-platform","rail-car","landscape-window","route-network"]},unit04:{section_a:["career","bench","violin","work-dignity"],section_b:["caliper","craft-quality","craft-evolution","trust-bridge"],section_c:["loom","embroidery-table","heritage","living-heritage"]},unit05:{section_a:["lunar-probe","relay-bridge","sample-lab","moon-horizon"],section_b:["test-console","orbit-adjustment","systems-simulation","mission-control"],section_c:["training","crew-simulation","science-exhibit","future-frontier"]},unit06:{section_a:["bookshop","exchange","resilience","budget-board"],section_b:["exchange-wall","resource-cycle","trust-ledger","sustainable-market"],section_c:["library","digital-lending","community-library","knowledge-bridge"]}};function q1(r,e,t,n){const i=new gt;i.name=["unit-landscape",r.id,t??"hub"].join("-");const s=K1(r,t),o=new Se(s.accent),c=new Se(s.secondary),l=new Se(...r.terrainTint);l.multiplyScalar(.88);const a=new _e({color:l,roughness:.72,metalness:.16}),h=new _e({color:3426398,roughness:.84,metalness:.12}),u=new _e({color:c,emissive:c,emissiveIntensity:1.2,roughness:.2,metalness:.36}),f=new _e({color:o,emissive:o,emissiveIntensity:.75,roughness:.18,metalness:.42});if(h.fog=!1,u.fog=!1,f.fog=!1,zt(t)&&(u.emissiveIntensity=.56,f.emissiveIntensity=.42,h.color.set(4610672),h.roughness=.86,h.metalness=.08),zt(t)?Y1(i,s.route,f):(Z1(i,a,h,u,f),Q1(i,h,u,f)),zt(t)){const p=new gt;cu(p,t,n,a,h,u,f,o,r.id),p.scale.setScalar(.78),p.position.set(0,1.8,-15),i.add(p)}else cu(i,t,n,a,h,u,f,o,r.id)||$1(i,t,a,h,u,f);zt(t)||J1(i,t,n,s.accent);const _=new gt;switch(r.decorStyle){case"coast":ev(_,h,u,f,zt(t));break;case"market":tv(_,a,h,u);break;case"forest":nv(_,a,u,f,zt(t));break;case"temple":iv(_,a,h,u,f,zt(t));break;case"space":sv(_,h,u,f,zt(t));break;case"exchange":rv(_,a,h,u,f,zt(t));break;default:ov(_,a,h,u,f);break}return zt(t)?(_.scale.setScalar(.72),_.position.z=14):(_.scale.setScalar(.62),_.position.z=1.5),i.add(_),i.traverse(p=>{p.castShadow=p instanceof G,p.receiveShadow=p instanceof G&&!zt(t)}),i}function zt(r){return!!(r&&(/^section_[abc]-world-\d+$/.test(r)||/^lab-vocab-\d+$/.test(r)||["lab-grammar","lab-cloze","lab-translation","project-reading","project-listening","project-writing","project-memory"].includes(r)))}function Y1(r,e,t){const n=new _e({color:e,emissive:e,emissiveIntensity:.12,roughness:.62,metalness:.12});for(let i=0;i<5;i++){const s=1.8+i*2.1,o=.54+i*.32,c=new G(new ve(5.2,.18,3.3),n);c.position.set(i%2===0?-.28:.28,o,s),c.rotation.y=i%2===0?-.035:.035,c.userData.isLandscapeRoute=!0,r.add(c);const l=new G(new Ye(.34,0),t);l.position.set(0,o+.42,s),l.userData.isLandscapeBeacon=!0,r.add(l)}}function K1(r,e){if(!e||e==="hub")return{accent:r.crystalColor,secondary:r.orbColor,route:r.pathColor};const t=e.match(/^(section_[abc])-world-(\d+)$/);if(t){const l={section_a:[{accent:6478079,secondary:12120575,route:2918143},{accent:7992016,secondary:12713968,route:2329464},{accent:16762218,secondary:16769443,route:10316573},{accent:16032511,secondary:16767339,route:10247423}],section_b:[{accent:7977215,secondary:12048639,route:3633083},{accent:11903231,secondary:14735359,route:6900418},{accent:6809765,secondary:12255189,route:2656598},{accent:16760184,secondary:16768948,route:10971945}],section_c:[{accent:16743282,secondary:16761210,route:14046034},{accent:16164541,secondary:16766692,route:11555446},{accent:8185807,secondary:13041648,route:3313017},{accent:16765802,secondary:16772522,route:10384424}]}[t[1]][(Number(t[2])-1)%4];return{accent:new Se(l.accent).lerp(new Se(r.crystalColor),.66).getHex(),secondary:new Se(l.secondary).lerp(new Se(r.orbColor),.56).getHex(),route:new Se(l.route).lerp(new Se(r.pathColor),.6).getHex()}}const n=e.match(/^lab-vocab-(\d+)$/);if(n){const c=[5625599,7659696,11903231,16760425,16748445,9353215],l=c[(Number(n[1])-1)%c.length];return{accent:new Se(l).lerp(new Se(r.crystalColor),.52).getHex(),secondary:r.orbColor,route:r.pathColor}}const s={"lab-grammar":{accent:8246268,secondary:14412542,route:3766200},"lab-cloze":{accent:8703150,secondary:13761253,route:2521693},"lab-translation":{accent:12887551,secondary:15785215,route:7819445},"project-reading":{accent:16763760,secondary:16772533,route:10777384},"project-listening":{accent:7723007,secondary:12251647,route:3636647},"project-writing":{accent:16754812,secondary:16768705,route:10442550},"project-memory":{accent:13869823,secondary:15850751,route:7491766}}[e];return s?{accent:new Se(s.accent).lerp(new Se(r.crystalColor),.58).getHex(),secondary:new Se(s.secondary).lerp(new Se(r.orbColor),.5).getHex(),route:new Se(s.route).lerp(new Se(r.pathColor),.58).getHex()}:{"section-a":{accent:6478079,secondary:12120575,route:2918143},"section-b":{accent:16762218,secondary:16769443,route:10316573},"stories-of-china":{accent:16743282,secondary:16761210,route:14046034},"learning-lab":{accent:9437118,secondary:8246268,route:3257214},"unit-project":{accent:16032511,secondary:16767339,route:10247423}}[e]??{accent:r.crystalColor,secondary:r.orbColor,route:r.pathColor}}function cu(r,e,t,n,i,s,o,c,l){var d,m;if(!e)return!1;const a=(x,v,y,b,S,w=0)=>{const M=new G(x,v);return M.position.set(y,b,S),M.rotation.y=w,r.add(M),M},h=(x=5.2)=>{const v=s.clone();zt(e)&&(v.color.copy(c),v.emissive.copy(c),v.emissiveIntensity=.24,v.roughness=.42,v.metalness=.16);const y=a(new Ye(1.7,1),v,0,x,27);return y.userData.isLandscapeBeacon=!0,y},u=(x,v,y=Math.PI/2)=>{const b=a(new Ve(x,.16,8,40),o,0,v,27);return b.rotation.x=y,b.userData.isLandscapeRing=!0,b},f=e.match(/^(section_[abc])-world-(\d+)$/);if(f){const x=f[1],v=Number(f[2]),y=(t??"").split(" · ")[0],b=/connection|conversation|communication|dialogue|social/i.test(y),S=a(new Ae(7.8,8.8,.48,8),i,0,.92,27);if(S.userData.isLandscapeStage=!0,l==="unit06"&&x==="section_a"&&v===1){const T=new _e({color:6441526,roughness:.78,metalness:.04});a(new ve(9.2,4.8,.42),T,0,3.7,29);for(const z of[-4.2,4.2])a(new ve(.42,5,.5),o,z,3.8,27.2);for(const z of[1.75,2.7,3.65,4.6])a(new ve(7.9,.14,.6),n,0,z,27.15);const R=[15905643,8440756,10205679,14976898].map(z=>new _e({color:z,roughness:.72}));for(let z=0;z<3;z++)for(let j=0;j<8;j++){const se=.42+(z+j)%3*.1,me=a(new ve(.42,se,.34),R[(z*3+j)%R.length],-3.5+j,1.84+z*.95+se/2,26.78);me.userData.isLandscapeStage=!0}a(new ve(6.2,.9,1.05),i,0,1.65,23.7),a(new ve(6.45,.16,1.18),s,0,2.18,23.7);for(let z=0;z<3;z++){const j=a(new ve(.92,.16,.7),R[z],-1.8+z*1.8,2.37,23.7);j.userData.isLandscapeStage=!0}const P=a(new ve(10.2,.32,2.3),n,0,6.25,26.2);P.userData.isLandscapeStage=!0,a(new ve(8.45,1.62,.18),T,0,5.55,27.02);const D=document.createElement("canvas");D.width=1024,D.height=192;const U=D.getContext("2d");if(U){U.fillStyle="#24483f",U.fillRect(0,0,D.width,D.height),U.strokeStyle="#d9b77a",U.lineWidth=8,U.strokeRect(12,12,D.width-24,D.height-24),U.fillStyle="#fff4dc",U.textAlign="center",U.textBaseline="middle",U.font="bold 68px Arial, sans-serif",U.fillText("BOOK EXCHANGE",512,67),U.font="bold 32px Arial, sans-serif",U.fillText("LEAVE ONE  ·  TAKE ONE",512,145);const z=new oi(D);z.colorSpace=Tt;const j=new G(new hn(8.05,1.38),new Ot({map:z,side:Ct,toneMapped:!1}));j.position.set(0,5.55,26.88),j.rotation.y=Math.PI,r.add(j)}const k=new vn(16768160,2.4,18,2);k.position.set(0,5.2,22.6),r.add(k);const N=new ni([new L(-2.2,2.65,24.2),new L(0,3.3,25.4),new L(2.2,2.65,26.6)]),O=new G(new kn(N,16,.065,7,!1),o);return O.userData.isLandscapeRoute=!0,r.add(O),!0}const w=(m=(d=X1[l])==null?void 0:d[x])==null?void 0:m[v-1];if(w&&w!=="bookshop"&&!(w==="dialogue"&&x==="section_a"&&v===1&&b))return j1(r,w,a,n,i,s,o,h,u),!0;if(x==="section_a")if(v===1&&b){a(new ve(6.2,.32,4.8),n,-1.9,4,27,-.12),a(new ve(6.2,.32,4.8),s,1.9,4,27,.12);for(const D of[-1.9,1.9]){const U=a(new Ae(.24,.34,2.7,8),i,D,2.5,27);U.userData.isLandscapeStage=!0}const T=(D,U,k,N)=>{const O=new Fi;O.moveTo(-1.15,-.62),N?(O.lineTo(.22,-.62),O.lineTo(.62,-1.08),O.lineTo(.74,-.62)):(O.lineTo(-.72,-.62),O.lineTo(-.62,-1.08),O.lineTo(-.22,-.62)),O.lineTo(1.02,-.62),O.quadraticCurveTo(1.22,-.62,1.22,-.42),O.lineTo(1.22,.48),O.quadraticCurveTo(1.22,.68,1.02,.68),O.lineTo(-1.02,.68),O.quadraticCurveTo(-1.22,.68,-1.22,.48),O.lineTo(-1.22,-.42),O.quadraticCurveTo(-1.22,-.62,-1.15,-.62);const z=a(new gr(O,{depth:.34,bevelEnabled:!0,bevelSegments:2,steps:1,bevelSize:.055,bevelThickness:.055,curveSegments:8}),k,D,U,26.7);z.userData.isLandscapeStage=!0};T(-2.1,5.6,o,!0),T(2.1,4.9,s,!1);const R=new _e({color:15857919,emissive:12183551,emissiveIntensity:.24,roughness:.34});for(const[D,U]of[[-2.1,5.6],[2.1,4.9]])for(const k of[-.38,0,.38])a(new re(.085,8,6),R,D+k,U,26.62);const P=new G(new kn(new ni([new L(-.9,5.25,26.7),new L(0,4.35,26.7),new L(.9,4.55,26.7)]),20,.08,6,!1),o);P.userData.isLandscapeRoute=!0,r.add(P)}else if(v===1){for(const T of[-3.6,3.6])a(new Ae(.55,.82,5.6,8),n,T,3.8,27);a(new ve(9,.32,.52),o,0,6.7,27),h(5.1),u(3.2,4.4,.18)}else if(v===2){for(const R of[-4,4])a(new Ae(.62,.9,7.2,8),n,R,4.4,27);a(new ve(10,.42,.5),o,0,8.2,27),h(4.9).scale.setScalar(.8),u(3.4,4.9,Math.PI/2.3)}else if(v===3){for(const T of[-1,1]){const R=a(new ve(2.3,.32,10),n,T*2.8,1.35,27,T*.3);R.userData.isLandscapeRoute=!0}h(5.8),u(3.1,1.7)}else{for(const T of[-4.8,4.8])a(new Ae(.72,1,8,8),o,T,4.8,27);a(new Ve(5,.22,8,40,Math.PI),s,0,8.8,27,Math.PI),h(5.2)}else if(x==="section_b")if(v===1){for(const[T,R]of[[-5,5],[0,8],[5,6]])a(new ve(2.4,R,.5),n,T,R/2+1.1,27);for(const T of[3.2,5.8])a(new ve(11,.16,.28),o,0,T,27);h(10)}else if(v===2)a(new Ae(1.8,2.3,7.4,10),s,0,4.7,27),u(4.8,4.7,.42),u(4.8,4.7,-.42),h(9.2);else if(v===3)a(new Ae(5.8,6.5,1,12),n,0,2,27),a(new re(4.2,16,8,0,Math.PI*2,0,Math.PI/2),o,0,2.5,27),a(new Ae(1.1,1.6,6.2,8),i,0,5.4,27),h(9.4);else{a(new Ae(.55,.9,5.5,8),i,0,3.4,27);const T=a(new ve(12,.42,1.1),o,0,6.1,27,.06);T.userData.isLandscapeRoute=!0;for(const R of[-5,5]){const P=a(new re(1.2,12,8),s,R,6.8,27);P.userData.isLandscapeBeacon=!0}u(4.3,1.5)}else if(v===1){for(const[R,P,D]of[[5.8,2.3,8],[4.6,4.3,6],[3.3,6.1,5]])a(new Ae(R,R+.55,.72,D),n,0,P,27);const T=a(new Ye(1.9,1),s,0,9,27);T.userData.isLandscapeBeacon=!0,u(2.8,9)}else if(v===2){for(const T of[0,Math.PI/2,Math.PI,Math.PI*3/2]){const R=Math.cos(T)*4.7,P=27+Math.sin(T)*4.7,D=a(new Ae(.5,.78,5.8,8),n,R,3.8,P);D.userData.isLandscapeBeacon=!0;const U=a(new re(.72,10,8),s,R,7.1,P);U.userData.isLandscapeBeacon=!0}u(6,1.8),h(4.5)}else if(v===3){for(const R of[-5,5])a(new Ae(.65,1,7.4,8),o,R,4.4,27);const T=a(new ve(12,.4,2.6),n,0,3.2,27);T.userData.isLandscapeRoute=!0,a(new Ve(4.2,.18,8,36),s,0,7.5,27,Math.PI/2),h(5.2)}else{for(const[T,R]of[[-4,24],[4,24],[-4,30],[4,30]])a(new ve(1.2,5.6,1.2),n,T,3.8,R);h(8.4),u(4.6,2)}return!0}const _=e.match(/^lab-vocab-(\d+)$/);if(_){const x=Number(_[1]),v={1:Array.from({length:5},(w,M)=>{const T=M/5*Math.PI*2;return[Math.cos(T)*5.1,27+Math.sin(T)*5.1]}),2:[[-6,30],[-3,28.5],[0,27],[3,25.5],[6,24]],3:[[-5.2,30],[-2.6,28.3],[0,26.2],[2.6,28.3],[5.2,30]],4:[[0,23.5],[-4.4,27],[0,27],[4.4,27],[0,30.5]],5:Array.from({length:5},(w,M)=>{const T=-Math.PI/2+M*1.12,R=1.8+M*.92;return[Math.cos(T)*R,27+Math.sin(T)*R]}),6:[[-4.5,24.4],[-4.5,29.6],[0,27],[4.5,24.4],[4.5,29.6]]},y=v[x]??v[1],b=[];for(let w=0;w<5;w++){const[M,T]=y[w],R=x===2?1.7+w*.55:x===3?[2.2,1.6,3.1,1.6,2.2][w]:x===6&&w===2?3.6:2.2+w%2*.65,P=x===2?new Ae(.72,.95,R,7):x===5?new kt(.96,R,5):new ve(1.35,R,1.35),D=a(P,n,M,1+R/2,T,w*.14);D.userData.isLandscapeStage=!0;const U=1+R+(x===6&&w===2?1.15:.9),k=a(new Ye(x===6&&w===2?1.15:.72,1),x===6&&w===2?o:s,M,U,T);k.userData.isLandscapeBeacon=!0,b.push(new L(M,U-.35,T))}if(x>1){const w=a(new kn(new ni(b),36,.055,6,!1),o,0,0,0);w.userData.isLandscapeRoute=!0}const S=a(new Ve(x===5?6.6:6.2,.075,7,40),o,0,.8,27);return S.rotation.x=Math.PI/2,!0}if(e==="lab-grammar"){if(l==="unit01"){const x=[],v=(R,P,D=.085)=>{const U=new ni(R),k=a(new kn(U,24,D,7,!1),P,0,0,0);k.userData.isLandscapeRoute=!0};for(const R of[-1,1]){const P=R*4.1,D=a(new Ae(.68,.92,4.8,8),R<0?n:i,P,3.35,27);D.userData.isLandscapeStage=!0;const U=a(new Ye(.52,1),R<0?s:o,P,6.15,27);U.userData.isLandscapeBeacon=!0,v([new L(P,5.7,27),new L(R*2.5,6.35,26.5),new L(0,5.2,26.2)],R<0?s:o)}const y=a(new Ve(4.35,.13,8,40,Math.PI),o,0,5.35,27,Math.PI);y.scale.y=.55,y.userData.isLandscapeStage=!0;const b=a(new Ye(1.05,1),s,0,5.05,26.15);b.userData.isLandscapeBeacon=!0;for(let R=0;R<3;R++){const P=(R-1)*2.55,D=a(new Ae(.62,.82,.38,6),n,P,1.28,23.6);D.userData.isLandscapeStage=!0;const U=a(new An(.42,0),R===1?o:s,P,2,23.6);U.userData.isLandscapeBeacon=!0,x.push(new L(P,2.35,23.6))}const S=a(new ve(3.3,.28,1.28),i,0,2.72,23.6);S.userData.isLandscapeStage=!0;const w=a(new Ae(.32,.48,1.25,8),o,0,3.5,23.6);w.userData.isLandscapeStage=!0;const M=a(new re(.38,12,8),s,0,4.25,23.6);M.userData.isLandscapeBeacon=!0,v([x[0],new L(-1.8,2.55,23.6),new L(0,2.5,23.6)],s,.065),v([x[2],new L(1.8,2.55,23.6),new L(0,2.5,23.6)],o,.065);const T=new _e({color:5020528,emissive:1522474,emissiveIntensity:.14,roughness:.9});for(const R of[-6.1,6.1])for(const P of[24.4,29.6]){const D=a(new Ae(.42,.62,.52,7),n,R,1.28,P);D.userData.isLandscapeStage=!0;for(const[U,k,N]of[[-.22,1.95,.48],[.22,2.25,.55],[0,2.65,.45]]){const O=a(new An(N,0),T,R+U,k,P);O.userData.isLandscapeStage=!0}}return!0}for(const x of[-4.5,4.5])a(new Ae(.7,.95,7.2,8),n,x,4.4,27);return a(new Ve(4.5,.24,8,40,Math.PI),o,0,8,27,Math.PI),h(4.9),!0}if(e==="lab-cloze"){for(const x of[-4.1,4.1]){const v=a(new ve(4.4,.35,5.6),n,x,2,27);v.userData.isLandscapeRoute=!0}for(const x of[-1.5,0,1.5]){const v=a(new Ye(.62,0),s,x,2.6,27);v.userData.isLandscapeBeacon=!0}return u(5.2,1.2),!0}if(e==="lab-translation"){for(const v of[-4.5,4.5]){a(new Ae(.62,.92,7.4,8),n,v,4.4,27);const y=a(new Ve(2.4,.16,8,32),o,v,5.4,27,Math.PI/2);y.userData.isLandscapeRing=!0}const x=a(new ve(8,.26,.28),s,0,5,27);return x.userData.isLandscapeRoute=!0,!0}const g={"project-reading":"reading","project-listening":"listening","project-writing":"writing","project-memory":"memory"}[e];if(!g)return!1;if(g==="reading")a(new ve(7.4,.34,5.2),n,-2,3.7,27,-.14),a(new ve(7.4,.34,5.2),s,2,3.7,27,.14),a(new ve(.3,2.1,5.3),o,0,2.6,27),u(4.6,1.2);else if(g==="listening"){for(const[x,v]of[[2.4,3],[3.8,4.6],[5.3,6.2]]){const y=a(new Ve(x,.15,8,40),o,0,v,27,Math.PI/2.15);y.userData.isLandscapeRing=!0}h(3.4)}else if(g==="writing"){const x=a(new ve(8.5,.55,5.2),i,0,2.4,27);x.userData.isLandscapeStage=!0;const v=new _e({color:15919832,roughness:.88}),y=a(new ve(5.8,.14,3.4),v,-.25,2.8,27,-.08);y.userData.isLandscapeStage=!0;for(let T=0;T<5;T++){const R=a(new ve(3.6,.035,.045),o,-.25,2.89,26.15+T*.42,-.08);R.userData.isLandscapeRoute=!0}const b=a(new Ae(.035,.06,2.15,8),o,1.95,2.98,27.8);b.rotation.z=Math.PI/2,b.rotation.y+=.08,b.userData.isLandscapeStage=!0;for(const T of[-3.4,3.4])a(new ve(.35,2.6,.35),o,T,1.2,25.4);const S=a(new Ae(.42,.48,.16,12),i,3.05,2.77,26.2);S.userData.isLandscapeStage=!0;const w=a(new Ae(.055,.08,1.15,8),o,3.05,3.35,26.2);w.userData.isLandscapeStage=!0;const M=new G(new re(.42,12,8),s);M.position.set(3.05,4,26.2),M.scale.set(1,.72,.78),M.userData.isLandscapeBeacon=!0,r.add(M)}else{for(let x=0;x<4;x++){const v=x*Math.PI/3,y=a(new re(.72,12,8),s,Math.cos(v)*5.3,2.6+x%2,27+Math.sin(v)*5.3);y.userData.isLandscapeBeacon=!0}u(5.6,1.3,.52),h(6.1)}return!0}function j1(r,e,t,n,i,s,o,c,l){const a=(p,g,d,m,x,v,y=n,b=0)=>{const S=t(new ve(m,x,v),y,p,g,d,b);return S.userData.isLandscapeStage=!0,S},h=(p,g,d,m,x,v=n,y=10)=>{const b=t(new Ae(m*.86,m,x,y),v,p,g,d);return b.userData.isLandscapeStage=!0,b},u=(p,g=o,d=.12)=>{const m=new ni(p.map(([v,y,b])=>new L(v,y,b))),x=new G(new kn(m,28,d,8,!1),g);x.userData.isLandscapeRoute=!0,x.castShadow=!0,x.receiveShadow=!0,r.add(x)},f=(p,g,d=n,m=27,x=0)=>{a(x-p/2,g/2,m,.52,g,.62,d),a(x+p/2,g/2,m,.52,g,.62,d),a(x,g,m,p+.52,.5,.62,d)},_=(p,g,d,m,x=.48)=>{const v=[n,o,s,i];a(p,g,d,x,.74+m%2*.16,.34,v[m%v.length],(m%3-1)*.035)};switch(e){case"message":{const p=new _e({color:10136465,emissive:2438958,emissiveIntensity:.24,roughness:.9,metalness:.02}),g=new _e({color:3427145,roughness:.78}),d=new _e({color:7318181,emissive:1722440,emissiveIntensity:.28,roughness:.34,metalness:.12}),m=new _e({color:7756610,roughness:.88}),x=new _e({color:13806214,roughness:.92});a(0,4.42,31.15,15.8,6.55,.78,p),a(0,7.82,31.15,16.35,.34,1.08,g),a(0,1.28,30.66,15.5,.26,.48,g);for(const S of[-4.55,4.55])a(S,4.62,30.72,3.5,3.28,.16,g),a(S,4.62,30.6,3.18,2.96,.08,d),a(S,4.62,30.53,.12,2.96,.06,o),a(S,4.62,30.53,3.18,.12,.06,o),a(S,4.62,30.53,.1,2.96,.06,g),a(S,4.62,30.53,3.18,.1,.06,g);a(0,2.88,30.62,2.6,3.35,.2,g),a(-.62,2.72,30.47,1.08,2.98,.08,d),a(.62,2.72,30.47,1.08,2.98,.08,d),a(0,2.72,30.4,.1,2.98,.06,o),a(.38,2.72,30.35,.08,.12,.08,m),a(0,1.18,29.95,3.5,.22,1.2,m);const v=document.createElement("canvas");v.width=1024,v.height=192;const y=v.getContext("2d");if(y){y.fillStyle="#263e3b",y.fillRect(0,0,v.width,v.height),y.strokeStyle="#d6c19a",y.lineWidth=8,y.strokeRect(12,12,v.width-24,v.height-24),y.fillStyle="#f4edda",y.textAlign="center",y.textBaseline="middle",y.font="bold 66px Arial, sans-serif",y.fillText("CAMPUS LIBRARY",512,98);const S=new oi(v);S.colorSpace=Tt;const w=new G(new hn(4.4,.82),new Ot({map:S,side:Ct,toneMapped:!1}));w.position.set(0,6.9,30.55),w.rotation.y=Math.PI,r.add(w)}for(const S of[-2.05,2.05]){a(S,1.72,25.9,3.05,.24,.68,m),a(S,2.18,26.18,3.05,.78,.16,m);for(const w of[S-1.2,S+1.2])a(w,1.38,25.9,.12,.62,.14,g),a(w,1.84,26.18,.12,.72,.14,g)}for(const[S,w]of[-2.55,-1.55,1.55,2.55].entries()){const M=S%2===0?o:n,T=t(new Ae(.3,.4,.94,8),M,w,2.64,25.92);T.userData.isLandscapeStage=!0;const R=t(new re(.31,12,10),x,w,3.34,25.92);R.userData.isLandscapeStage=!0,a(w+(S%2===0?.23:-.23),2.53,25.54,.13,.5,.12,M,S%2===0?-.3:.3)}for(const[S,w,M]of[[-2.9,5.15,1.25],[0,5.75,1.45],[2.9,5.15,1.25]]){a(S,w,25.2,M,.68,.12,i,S*.035),a(S,w+.1,25.11,M*.62,.08,.06,o,S*.035);const T=t(new re(.09,8,6),s,S+M*.34,w+.29,25.08);T.userData.isLandscapeBeacon=!0}u([[-2.15,5.12,25.14],[0,5.7,25.14],[2.15,5.12,25.14]],s,.06),u([[0,1.24,34],[0,1.28,31],[0,1.28,28],[0,1.34,26.8]],o,.1);for(const S of[-6.35,6.35]){h(S,1.43,27.65,.48,.46,m,8),h(S,2.75,27.65,.1,2.55,g,8);for(const[w,M,T]of[[-.34,3.55,.72],[.28,3.82,.8],[0,4.38,.72]]){const R=t(new An(T,0),n,S+w,M,27.65);R.userData.isLandscapeStage=!0}}const b=new vn(16766875,.72,16,2);b.position.set(0,5.2,25.2),r.add(b);break}case"dialogue":{for(const[x,v]of[25.1,27.5,29.9].entries()){f(9.3-x*.45,6.45-x*.2,x===1?o:n,v);const y=t(new Ve(3.95-x*.18,.075,7,24,Math.PI),x===1?s:o,0,2.95,v+.05);y.userData.isLandscapeStage=!0}u([[-4.2,6.35,25.1],[-4.1,6.65,27.5],[-3.9,6.45,29.9]],o,.075),u([[4.2,6.35,25.1],[4.1,6.65,27.5],[3.9,6.45,29.9]],o,.075),u([[0,6.6,25.1],[0,6.9,27.5],[0,6.6,29.9]],s,.075),h(0,1.52,26.35,.34,1.32,i,10),h(0,2.24,26.35,1.68,.22,n,12);const p=t(new Ye(.34,1),s,0,2.55,26.35);p.userData.isLandscapeBeacon=!0;const g=[o,s,n];for(const[x,v]of[-3.25,0,3.25].entries()){a(v,1.62,28,1.16,.24,.92,i,v*-.04),a(v,2.02,28.38,1.08,.78,.16,n,v*-.04);const y=t(new Ae(.34,.48,1.22,8),g[x],v,2.82,28);y.userData.isLandscapeStage=!0;const b=t(new re(.4,12,10),n,v,3.72,28);b.userData.isLandscapeStage=!0}const d=new _e({color:6929809,emissive:1457453,emissiveIntensity:.28,roughness:.86});for(const[x,v]of[[-5.3,26.2],[5.3,26.2],[-5.3,29.1],[5.3,29.1]]){h(x,1.55,v,.43,.62,i,8),h(x,2.22,v,.08,1.05,o,7);const y=t(new An(.46,0),d,x,2.95,v);y.scale.set(.8,1.35,.8),y.userData.isLandscapeStage=!0}a(-4.35,1.63,25.55,1.42,.34,.76,i);for(const x of[-4.78,-4.35,-3.92])a(x,1.9,25.48,.24,.08,.38,o);for(const[x,v]of[[.65,4.75],[.98,4.95],[1.31,5.15]]){const y=t(new Ve(x,.055,7,24,Math.PI),s,0,v,27.78);y.userData.isLandscapeRoute=!0}u([[-3.2,4.25,27.78],[0,5.25,27.78],[3.2,4.25,27.78]],o,.07);const m=new vn(10283208,.85,16,2);m.position.set(0,5.4,25.7),r.add(m);break}case"focus":{const p=h(0,1.5,27,3.4,.34,n,12);p.userData.isLandscapeRoute=!0,a(0,2.2,27,2.1,.18,1.6,s,-.08);for(const d of[-3.2,3.2]){const m=t(new Ye(.36,0),i,d,3.4,27);m.userData.isLandscapeBeacon=!0}const g=t(new Ye(1.02,1),o,0,4.25,27);g.userData.isLandscapeBeacon=!0,l(4.7,1.05,.08);break}case"listening-bench":{h(0,1.18,27,5.1,.34,i,12);for(const g of[-2.25,2.25]){a(g,1.78,27,1.85,.22,.78,n),a(g,2.34,g<0?27.38:26.62,1.85,.78,.18,o,g<0?-.04:.04);for(const d of[26.72,27.28])h(g,1.42,d,.1,.58,i,8)}for(const g of[-1.7,1.7]){const d=h(g,2.55,27,.34,1.02,g<0?o:n,8);d.userData.isLandscapeStage=!0;const m=t(new re(.37,12,10),n,g,3.28,27);m.userData.isLandscapeStage=!0}const p=t(new Ye(.46,1),s,0,3.22,27);p.userData.isLandscapeBeacon=!0,u([[-1.18,3.05,27],[-.55,3.55,27],[.42,3.55,27],[1.18,3.05,27]],o,.075);for(const[g,d]of[[.82,4.26],[1.18,4.56],[1.54,4.86]]){const m=t(new Ve(g,.055,7,28,Math.PI),s,0,d,27.25);m.userData.isLandscapeRoute=!0}l(4.75,1.05,.12);break}case"notification":{const p=[{x:-3.4,y:4.1,scale:.86,rows:[.76,1.28,.94,.62]},{x:0,y:5.6,scale:1.08,rows:[1.34,.82,1.12,.68]},{x:3.4,y:4.5,scale:.9,rows:[.92,1.22,.74,1.04]}];for(const{x:g,y:d,scale:m,rows:x}of p){const v=g*.035;a(g,d,27,2.2*m,2.8*m,.42,i,g*.035),a(g,d,26.73,1.88*m,2.44*m,.1,s,v),a(g-.1*m,d+.78*m,26.62,.78*m,.15*m,.06,o,v),x.forEach((b,S)=>{const w=S===1&&g===0?o:i;a(g-.08*m,d+(.34-S*.43)*m,26.62,b*m,.14*m,.06,w,v)});const y=t(new re(.22*m,10,8),o,g+.58*m,d+.68*m,26.6);y.userData.isLandscapeBeacon=!0}u([[-4.4,1.55,27],[0,1.55,27],[4.4,1.55,27]],n,.18);break}case"study-desk":{const p=new _e({color:10318977,emissive:4795195,emissiveIntensity:.2,roughness:.58,metalness:.08}),g=h(0,.24,27,8.1,.42,n,12);g.userData.isLandscapeStage=!0,f(13.2,6.3,o,31.1);const d=t(new Ve(7.25,.08,7,48),n,0,.5,27);d.rotation.x=Math.PI/2;for(const[b,S]of[2.9,4.15,5.4].entries()){const w=-5.55-b*.18,M=a(w,S,26.45,1.48,.9,.18,i,-.08);M.userData.isLandscapeStage=!0,a(w-.12,S+.17,26.33,.82,.1,.06,p),a(w-.12,S-.08,26.33,1.04,.08,.06,o),a(w-.12,S-.28,26.33,.68,.07,.06,o);const T=t(new re(.14,10,8),p,w+.52,S+.22,26.3);T.userData.isLandscapeBeacon=!0}u([[-7.15,1.28,26.8],[-6.2,1.35,26.55],[-5.25,1.42,26.5]],p,.075),a(0,2.45,27,8.2,.42,3.2,n);for(const b of[-3.45,3.45])for(const S of[25.8,28.2])a(b,1.35,S,.24,2,.24,i);a(0,2.12,27,5.2,.18,.22,i),a(-1.35,2.75,26.25,2.1,.1,1.45,s,-.08),a(-1.35,2.82,26.25,.08,.04,1.35,o,-.08);for(const b of[25.82,26.12,26.42])a(-1.38,2.83,b,1.54,.025,.035,o);a(-.05,2.88,26.9,1.1,.07,.09,i,-.38),a(1.9,2.68,27.45,1.55,.16,1.45,i,-.12),a(1.9,2.79,27.45,.72,.09,1.2,o,-.12),a(1.9,2.85,27.45,.56,.025,1.02,i,-.12),a(0,1.18,29.65,1.9,.26,1.6,i),a(0,2.08,30.35,1.9,1.8,.22,i),h(0,.62,29.65,.14,.86,o,8),a(0,4.05,29.2,4.7,2.5,.18,i),a(0,4.05,29.08,4.34,2.16,.05,s),a(0,4.83,29.02,3.25,.08,.04,o),a(-.65,4.35,29.02,1.95,.07,.04,o),a(.65,4.35,29.02,1.1,.07,.04,o),a(-1.05,3.88,29.02,2.75,.07,.04,o),h(3.15,3.15,27,.12,1.3,o,8),a(2.82,3.82,27,.9,.14,.56,o,-.18);const m=t(new re(.3,10,8),s,2.82,3.55,26.73);m.userData.isLandscapeBeacon=!0,h(5.55,1.55,27.45,.2,2.25,i,10);const x=h(5.55,3.86,26.92,1.18,.16,i,12);x.rotation.x=Math.PI/2;const v=t(new Ve(1.22,.12,8,32),o,5.55,3.86,26.78);v.userData.isLandscapeStage=!0;for(const[b,S,w,M]of[[5.55,4.68,.12,.28],[5.55,3.04,.12,.28],[4.73,3.86,.28,.12],[6.37,3.86,.28,.12]])a(b,S,26.72,w,M,.08,o);a(5.55,4.08,26.67,.1,.58,.08,s),a(5.77,3.86,26.66,.48,.1,.08,s);const y=t(new re(.16,12,8),s,5.55,3.86,26.58);y.userData.isLandscapeBeacon=!0;break}case"filter":{const p=h(0,.98,27,7.1,.36,i,12);p.userData.isLandscapeStage=!0,f(10.4,6.4,o,28.1);const g=new _e({color:13198187,emissive:7020586,emissiveIntensity:.22,roughness:.72}),d=[-3.35,0,3.35];for(const[S,w]of d.entries())a(w,3.05,25.72,1.84,2.35,.2,i),a(w,3.05,25.59,1.58,2.08,.06,S===1?n:s),a(w,3.88,25.53,1.08,.1,.06,o);for(const S of[-.2,.2]){const w=t(new Ve(.26,.075,8,20),o,-3.35+S,3.12,25.46);w.rotation.z=S<0?-.62:.62,w.userData.isLandscapeStage=!0}const m=t(new Ve(.32,.075,8,20,Math.PI),o,0,3.42,25.45);m.userData.isLandscapeStage=!0,a(0,2.96,25.45,.72,.56,.16,o);const x=t(new re(.2,10,8),o,3.35,3.34,25.44);x.userData.isLandscapeStage=!0;const v=t(new re(.36,10,8),o,3.35,2.75,25.44);v.scale.set(1.1,.68,.55),v.userData.isLandscapeStage=!0;const y=new Fi;y.moveTo(0,1.16),y.lineTo(1.02,.72),y.lineTo(.86,-.12),y.quadraticCurveTo(.62,-.72,0,-1.08),y.quadraticCurveTo(-.62,-.72,-.86,-.12),y.lineTo(-1.02,.72),y.closePath();const b=t(new gr(y,{depth:.18,bevelEnabled:!0,bevelSegments:2,bevelSize:.06,bevelThickness:.04}),o,0,5.48,28.4);b.userData.isLandscapeBeacon=!0,u([[-3.35,1.65,25.5],[-3.35,1.85,27.2],[0,2.05,28.2]],g,.1),u([[0,1.65,25.5],[0,2.2,26.9],[0,4.25,28.3]],o,.13),u([[3.35,1.65,25.5],[3.35,1.85,27.2],[0,2.05,28.2]],g,.1),l(5.4,1.24,.08);break}case"offline-rest":{const p=h(0,.98,27,7.1,.36,i,12);p.userData.isLandscapeStage=!0,f(7.2,6.2,o,27),a(-3.1,2.15,27,2.65,.24,.78,n),a(-3.1,2.76,27.34,2.65,.84,.18,o);for(const d of[-4.08,-2.12])for(const m of[26.76,27.24])a(d,1.7,m,.14,.72,.14,i);h(2.55,1.82,27,.78,.16,n,10),h(2.55,1.3,27,.14,.96,i,8),a(2.55,1.98,26.86,.72,.08,.34,i,-.12),a(2.55,2.04,26.86,.56,.025,.22,s,-.12);for(const[d,m]of[[-.68,o],[.68,n]]){h(d,2.35,27,.3,1.05,m,8);const x=t(new re(.29,12,10),m,d,3.08,27);x.userData.isLandscapeStage=!0}u([[-.3,3.23,27],[0,3.62,27],[.3,3.23,27]],s,.065);for(const d of[-5.15,5.15]){h(d,1.3,27,.48,.62,n,8);for(const[m,x,v,y]of[[-.28,2.15,0,.5],[.22,2.45,.08,.58],[0,2.92,-.08,.48]]){const b=t(new An(y,0),s,d+m,x,27+v);b.userData.isLandscapeStage=!0}}for(let d=0;d<4;d++){const m=d%2===0?-.32:.32;a(m,1.24,32-d*1.1,.92,.12,.66,d%2===0?n:s,m*.08)}u([[0,1.2,33],[0,1.2,30],[0,1.2,27.5]],o,.1);const g=t(new re(.62,12,10),s,0,4.45,27);g.userData.isLandscapeBeacon=!0;for(const[d,m]of[[.92,4.38],[1.2,4.62]]){const x=t(new Ve(d,.055,7,28),o,0,m,27);x.userData.isLandscapeRing=!0}break}case"clinic":{const p=new _e({color:7112083,emissive:1321270,emissiveIntensity:.18,roughness:.9});p.fog=!1;const g=a(0,3.45,27,8,4.5,2.3,p);g.userData.isLandscapeStage=!0,a(0,5.82,27,8.55,.3,2.75,i);const d=new _e({color:3493729,roughness:.96});d.fog=!1;for(const[y,b,S,w]of[[-7.7,2.55,32,1],[-6.1,1.75,34,.7],[7.6,2.35,33,.88]]){const M=t(new kt(3.1*w,4.8*w,5),d,y,b,S);M.scale.set(1.2,1,.7),M.userData.isLandscapeStage=!0}a(0,3.38,25.78,1.25,3.18,.18,i),a(-.12,3.42,25.66,.78,2.64,.06,s),a(.58,3.05,25.6,.08,.12,.08,o);for(const y of[-2.5,2.5])a(y,4.05,25.78,1.28,1.24,.18,o),a(y,4.05,25.65,1.08,1.02,.06,s),a(y,4.05,25.59,.08,1.02,.035,n),a(y,4.05,25.59,1.08,.07,.035,n),a(y,3.42,25.55,1.5,.12,.36,i);a(0,4.98,25.16,2.55,.2,.92,o),a(0,6.35,25.64,.55,1.8,.18,o),a(0,6.35,25.62,1.8,.55,.2,o),a(0,1.45,25.12,2.6,.22,1.16,n),a(0,1.24,26.1,3.2,.18,.82,i),u([[0,1.18,33],[0,1.2,30],[0,1.32,27.8],[0,1.48,25.5]],o,.12);for(const y of[-5.1,5.1]){a(y,1.72,27.1,1.85,.18,.62,i),a(y,2.22,27.38,1.85,.68,.14,o);for(const b of[-.68,.68])a(y+b,1.42,27.1,.12,.54,.12,n)}const m=a(4.5,2.72,25.42,1.18,2.12,.28,i);m.userData.isLandscapeStage=!0,a(4.5,2.92,25.24,.92,1.38,.06,s);for(const[y,b]of[[4.28,o],[4.72,n]]){const S=t(new re(.13,8,6),b,y,3.28,25.18);S.userData.isLandscapeStage=!0,a(y,2.92,25.18,.22,.34,.07,b)}u([[4.5,4.12,25.2],[3.6,4.75,26],[2.5,5.2,27]],s,.07);const x=h(2.8,6.02,27.5,.09,.62,i,8);x.userData.isLandscapeStage=!0;const v=t(new Ve(.58,.08,8,24),o,2.8,6.38,27.5);v.rotation.y=Math.PI/2,v.userData.isLandscapeBeacon=!0;for(const[y,b]of[[.58,6.15],[.82,6.1]]){const S=t(new Ve(y,.045,7,24,Math.PI),s,2.8,b,27.5);S.rotation.y=Math.PI/2,S.userData.isLandscapeRing=!0}break}case"telemedicine":{const p=h(0,.98,27,7.1,.36,i,12);p.userData.isLandscapeStage=!0,f(9.4,6.5,n,27),a(0,4.5,26.58,4.8,3.2,.16,i),a(0,4.55,26.45,4.18,2.6,.1,s);for(const[x,v]of[[-.88,o],[.88,n]]){const y=t(new re(.27,10,8),v,x,4.98,26.34);y.userData.isLandscapeStage=!0,a(x,4.3,26.34,.68,.72,.1,v)}a(0,4.3,26.32,.12,.68,.08,o),a(0,4.3,26.32,.56,.12,.08,o),a(-3.45,1.92,27,2.55,.28,.88,n),a(-3.45,2.48,27.34,2.55,.82,.2,o);for(const x of[-4.35,-2.55])a(x,1.55,26.72,.14,.72,.14,i),a(x,1.55,27.28,.14,.72,.14,i);const g=h(-3.45,2.63,26.82,.3,.82,n,8);g.userData.isLandscapeStage=!0;const d=t(new re(.27,10,8),n,-3.45,3.26,26.82);d.userData.isLandscapeStage=!0,h(3.15,1.82,27,.76,.16,i,10),h(3.15,1.32,27,.12,.94,i,8),a(3.15,2.3,26.72,.5,.86,.1,o),a(3.15,2.3,26.65,.34,.68,.04,s);const m=t(new Ve(.19,.055,7,18,Math.PI),o,3.15,2.48,26.6);m.userData.isLandscapeStage=!0,a(3.15,2.24,26.6,.34,.22,.08,o);for(const x of[-4.2,4.2]){const v=t(new re(.55,12,10),o,x,2.7,27);v.userData.isLandscapeBeacon=!0}u([[-4.2,2.9,27],[-3.45,3.35,27],[-1.6,3.6,27],[0,3.2,27],[1.7,3.6,27],[3.15,3.4,27],[4.2,2.9,27]],o,.1);break}case"community":{const p=h(0,.96,27,7.1,.36,i,12);p.userData.isLandscapeStage=!0;for(const[S,w]of[[-5.1,2.8],[-3.05,3.5],[3.05,3.1],[5.1,4]]){a(S,1.3+w/2,27.6,1.7,w,1.65,n);const M=t(new kt(1.28,1.08,4),o,S,1.9+w,27.6);M.rotation.y=Math.PI/4,M.userData.isLandscapeStage=!0}a(0,2.55,26.15,2.45,2.7,1.7,n),a(0,3.98,26.15,2.76,.22,1.98,i),a(0,2.05,25.25,.74,1.62,.14,i),a(-.88,2.8,25.24,.56,.65,.14,s),a(.88,2.8,25.24,.56,.65,.14,s),a(0,4.62,25.2,.28,.96,.12,o),a(0,4.62,25.18,.96,.28,.14,o),a(0,1.32,24.82,1.9,.18,.72,n),u([[0,1.16,31],[0,1.2,28.6],[0,1.28,26.8],[0,1.32,25]],o,.12);const g=new _e({color:7973541,emissive:1585455,emissiveIntensity:.3,roughness:.82}),d=new _e({color:14214117,emissive:2307131,emissiveIntensity:.22,roughness:.78}),m=new _e({color:14002824,roughness:.92}),x=(S,w,M)=>{for(const D of[-.16,.16]){const U=t(new Ae(.11,.13,.48,7),i,S+D,1.4,24.18);U.userData.isLandscapeStage=!0}const T=t(new Ae(.3,.38,.9,8),w,S,2.02,24.18);T.userData.isLandscapeStage=!0;const R=t(new re(.32,10,8),m,S,2.67,24.18);R.userData.isLandscapeStage=!0;const P=t(new Ae(.085,.1,.72,6),w,S+(M<0?.31:-.31),2,24.15);P.rotation.z=M,P.userData.isLandscapeStage=!0};x(-1.82,g,-.92),x(1.82,d,.92),a(-3.8,1.46,24.2,1.55,.18,.48,i);for(const S of[-4.38,-3.22])a(S,1.28,24.2,.12,.38,.14,o);const v=h(3.75,1.7,24.2,.11,1.02,i,8);v.rotation.x=-.12,a(3.75,2.34,24.15,.72,.68,.13,s,-.12),a(3.75,2.34,24.06,.12,.4,.06,o,-.12),a(3.75,2.34,24.05,.4,.12,.06,o,-.12);const y=t(new re(.34,12,10),s,0,4.05,26.15);y.userData.isLandscapeBeacon=!0;for(const S of[-5.1,-3.05,3.05,5.1])u([[S,1.36,27.6],[S*.54,1.28,26.6],[Math.sign(S)*.9,1.26,25.7]],o,.075);const b=new vn(16766368,.72,11,2);b.position.set(0,4.1,24.2),r.add(b);break}case"community-library":{h(0,1.06,27,6.2,.4,i,14);const p=h(0,1.62,27,2.05,.28,n,12);p.userData.isLandscapeRoute=!0,h(0,1.8,27,1.86,.08,s,12);for(let g=0;g<6;g++){const d=Math.floor(g/3),m=g%3;_(-.74+m*.74,2.07+d*.04,26.45+d*.9,g,.42)}for(const g of[-4.65,4.65]){a(g,3.05,27,1.42,3.6,1.08,i);for(const d of[2.02,3.12,4.22]){a(g,d,26.38,1.28,.12,.16,o);for(let m=0;m<3;m++)_(g-.4+m*.4,d+.46,26.16,m+Math.round(d*2),.24)}}a(0,4.15,29.35,7.8,4.2,.4,i),a(0,4.15,29.08,7.24,3.62,.08,n);for(const g of[-2.3,0,2.3])a(g,4.12,29,.08,2.8,.06,o);for(const g of[3.18,4.12,5.06])a(0,g,28.98,6.8,.06,.06,o);for(const[g,d,m]of[[-1.4,3.55,s],[.85,3.55,o],[-2.25,4.5,o],[1.55,4.5,s],[-.8,5.42,o],[2.25,5.42,s]]){const x=a(g,d,28.86,.48,.34,.08,m,-.04);x.userData.isLandscapeBeacon=!0}for(const[g,[d,m]]of[[-3.15,27],[3.15,27],[0,24.9]].entries()){const x=h(d,2.05,m,.28,.86,g%2?o:i,8);x.userData.isLandscapeStage=!0;const v=t(new re(.25,10,8),n,d,2.64,m);v.userData.isLandscapeStage=!0}a(0,2,23.35,1.72,1.42,1.06,o),a(0,2.38,22.78,1.12,.12,.08,i),a(0,1.42,22.78,.84,.12,.08,s),u([[-4.2,2.08,27],[-2.5,2.02,26.1],[0,2.08,25.7],[2.5,2.02,26.1],[4.2,2.08,27]],s,.08),u([[0,2.3,24],[0,2.75,25.1],[0,2.9,27],[0,3.6,28.4],[0,4,29]],o,.075),l(5.45,1.28,.12);break}case"community-network":{h(0,.98,27,6.1,.34,i,12);const p=a(0,1.34,25.45,8.3,.24,1.72,n);p.userData.isLandscapeRoute=!0,a(0,1.49,25.45,8.08,.08,1.55,i);for(const b of[24.65,26.25]){a(0,2.06,b,8.05,.1,.12,o);for(const S of[-3.65,-1.85,0,1.85,3.65])a(S,1.77,b,.1,.62,.12,i)}const g=t(new ve(1.72,.16,4.2),n,0,1.35,22.72);g.rotation.x=-.08,g.userData.isLandscapeRoute=!0;for(const b of[-.98,.98]){const S=t(new ve(.08,.09,4.05),o,b,1.76,22.72);S.rotation.x=-.08,S.userData.isLandscapeStage=!0;for(const w of[20.78,24.66]){const M=a(b,1.51,w,.09,.42,.09,i);M.userData.isLandscapeStage=!0}}for(const b of[-4,4])a(b,2.55,27,2.3,2.55,1.8,n),a(b,3.88,27,2.48,.18,1.96,o),a(b-.48,2.55,26.06,.52,.78,.12,s),a(b+.48,2.55,26.06,.52,.78,.12,s);a(-4,4.55,26.02,.28,1.18,.14,o),a(-4,4.55,26.02,1.18,.28,.14,o);for(const b of[-4,0,4]){const S=t(new re(.34,12,10),s,b,b===0?4.1:4.45,27);S.userData.isLandscapeBeacon=!0}const d=a(0,2.15,26.88,1.35,.18,.86,i);d.rotation.z=-.08,a(0,2.72,26.42,.64,.92,.12,o,-.08);const m=a(0,2.75,26.34,.48,.68,.06,s,-.08);m.userData.isLandscapeStage=!0;const x=[7973541,10466753,12163964,8560576],v=new _e({color:14002824,roughness:.92});for(const[b,S]of[-2.75,-1.05,1.05,2.75].entries()){const w=new _e({color:x[b],emissive:x[b],emissiveIntensity:.08,roughness:.86});for(const R of[-.14,.14]){const P=t(new Ae(.1,.12,.43,7),i,S+R,1.69,25.45);P.userData.isLandscapeStage=!0}const M=t(new Ae(.28,.35,.68,8),w,S,2.14,25.45);M.userData.isLandscapeStage=!0;const T=t(new re(.27,10,8),v,S,2.72,25.45);T.userData.isLandscapeStage=!0;for(const R of[-1,1]){const P=S<0&&R>0||S>0&&R<0,D=t(new Ae(.075,.085,.58,6),w,S+R*.29,2.1,25.45);D.rotation.z=-R*(P?.92:.42),D.userData.isLandscapeStage=!0}}u([[-4,4.45,26.65],[-2.35,4.85,26.25],[0,4.15,26.25],[2.35,4.85,26.25],[4,4.45,26.65]],o,.09),u([[-4,1.45,27],[-2.2,1.4,25.9],[0,1.5,25.6],[2.2,1.4,25.9],[4,1.45,27]],s,.08),l(5.35,1.3,.16);const y=new vn(11134719,.9,16,2);y.position.set(0,5.2,25.4),r.add(y);break}case"timeline":{const p=[-4,0,4];for(const[D,U]of p.entries()){const k=D===1?3.75:3.25,N=3.55;h(U,1.28,27,1.22,.34,i,8),a(U,N,27,2.55,k,.48,i),a(U,N,26.7,2.2,k-.32,.1,n),a(U-1.14,N,26.58,.12,k+.08,.1,o),a(U+1.14,N,26.58,.12,k+.08,.1,o),a(U,N+k/2,26.58,2.38,.12,.1,o),a(U,N-k/2,26.58,2.38,.12,.1,o),a(U,2.55,26.55,1.24,.075,.055,o),a(U,2.33,26.55,.92,.075,.055,o)}u([[p[0]-.84,3.7,26.34],[p[0]+.84,3.7,26.34]],o,.1);for(const D of[-4.84,-4.28,-3.72,-3.16]){const U=t(new re(.16,10,8),s,D,3.7,26.3);U.userData.isLandscapeBeacon=!0}const g=t(new kt(.2,.42,4),o,p[0]+.98,3.7,26.3);g.rotation.z=-Math.PI/2,g.userData.isLandscapeStage=!0;const d=new _e({color:4353656,emissive:1059378,emissiveIntensity:.22,roughness:.62,metalness:.12}),m=t(new Ae(2.7,2.9,.22,12),d,0,1.48,25.2);m.scale.z=.58,m.userData.isLandscapeStage=!0;const x=new Fi;x.moveTo(-1.7,.18),x.lineTo(-1.28,-.38),x.lineTo(1.2,-.38),x.lineTo(1.7,.18),x.lineTo(.9,.34),x.lineTo(-1.15,.34),x.closePath();const v=new _e({color:7359281,roughness:.82,metalness:.04}),y=t(new gr(x,{depth:.62,bevelEnabled:!0,bevelSegments:1,steps:1,bevelSize:.06,bevelThickness:.05}),v,0,1.94,24.9);y.userData.isLandscapeStage=!0,u([[-1.48,2.13,24.83],[0,2.23,24.83],[1.48,2.13,24.83]],o,.07);const b=h(0,3.52,25.05,.075,2.95,i,8);b.userData.isLandscapeStage=!0;const S=new _e({color:15916984,roughness:.8,side:Ct}),w=new Fi;w.moveTo(-.08,0),w.lineTo(-.08,2.45),w.lineTo(-1.62,.3),w.closePath();const M=t(new bo(w),S,0,2.34,24.82);M.userData.isLandscapeStage=!0;const T=new Fi;T.moveTo(.08,.08),T.lineTo(.08,1.62),T.lineTo(1.08,.34),T.closePath();const R=t(new bo(T),o,0,2.42,24.8);R.userData.isLandscapeStage=!0,u([[-1.62,2.2,25],[0,5.05,25],[1.12,2.5,25]],s,.045);for(const[D,U]of[[24.3,0],[25.8,.28],[26.55,-.2]])u([[-2.1,1.61,D],[-.8,1.68+U,D-.08],[.7,1.62,D],[2,1.7+U,D+.08]],s,.045);const P=new vn(16767398,.9,13,2);P.position.set(0,5.2,24.9),r.add(P),u([[-5.3,1.52,27],[-4,1.52,26.35],[0,1.52,26.35],[4,1.52,26.35],[5.3,1.52,27]],o,.12);break}case"perseverance":{for(let g=0;g<6;g++)a(-4.2+g*1.45,1.15+g*.53,27,1.55,.28,2.1,g===5?o:n);const p=t(new Ye(.9,1),s,3.3,5.1,27);p.userData.isLandscapeBeacon=!0,u([[-4.2,1.45,26.7],[-1.7,2,26.7],[.2,3.1,26.7],[3.3,5.1,26.7]],o,.09);break}case"route-evidence":{h(0,1.2,27,5.2,.32,i,12),a(0,3.45,27,7.8,3.8,.3,n),a(0,3.45,26.78,7.1,3.1,.08,i),u([[-3.1,2.6,26.62],[-1.7,4.4,26.62],[.4,3.3,26.62],[2.8,4.55,26.62]],o,.09);for(const[p,g]of[-3.1,-1.7,.4,2.8].entries()){const d=t(new Ye(.3,0),p%2===0?s:o,g,p%2===0?2.6:4.4,26.48);d.userData.isLandscapeBeacon=!0}for(const p of[-1.75,1.75])a(p,3.18,26.45,2.05,1.48,.1,p<0?s:o),a(p,3.18,26.36,1.58,1.02,.06,i);l(4.7,1.05,.1);break}case"legacy":{for(let p=0;p<3;p++){const g=(p-1)*3.2;f(2.4,4.6+p*1.1,p===2?o:n,27,g);const d=t(new re(.34+p*.08,10,8),s,g,5+p,26.55);d.userData.isLandscapeBeacon=!0}u([[-4.6,1.4,27],[0,1.4,27],[4.6,1.4,27]],o,.13);break}case"archive-crossroads":{h(0,1.05,27,5.8,.34,i,12);for(const d of[-3.15,3.15])a(d,3.65,27,2.3,3.55,.42,n),a(d,3.65,26.72,1.78,2.98,.08,i),f(1.35,3.5,d<0?s:o,26.58,d);const p=a(0,2.15,26.35,4.1,.3,1.05,o);p.userData.isLandscapeRoute=!0;const g=t(new Ye(.62,1),s,0,3.25,26.18);g.userData.isLandscapeBeacon=!0,u([[-4.4,1.45,27],[-2.5,1.72,26.2],[0,1.9,26.2],[2.5,1.72,26.2],[4.4,1.45,27]],o,.1),l(5.1,1.1,.12);break}case"spotlight":{h(0,1.2,27,4.4,.5,i,12),h(0,1.55,27,2.3,.22,o,12);for(const g of[-4.2,4.2]){const d=t(new kt(1.35,6.8,12,1,!0),s,g,5.1,27);d.rotation.z=g<0?-.22:.22,d.userData.isLandscapeStage=!0}const p=t(new Ye(.62,1),o,0,3.25,26.4);p.userData.isLandscapeBeacon=!0;break}case"humanitarian":{f(6.2,5.6,o,27),a(0,2.15,27,4.2,.42,2.2,n);for(const p of[-1.25,0,1.25]){a(p,2.7,26.85,.78,.62,.6,s);const g=t(new re(.27,10,8),o,p,3.35,26.82);g.userData.isLandscapeBeacon=!0}u([[-4.5,1.25,27],[-2.4,1.65,26.3],[0,1.85,26.3],[2.4,1.65,26.3],[4.5,1.25,27]],o,.1);break}case"lasting-service":{h(0,1.4,27,3.2,.36,n,12),h(0,4.25,27,.32,5.4,i,8);for(const[p,g]of[[-1.1,5.5],[0,6.1],[1.1,5.5],[-.6,7],[.7,7]]){const d=t(new re(1.05,10,8),s,p,g,27);d.userData.isLandscapeStage=!0}for(const p of[-3.5,3.5]){const g=t(new Ye(.42,0),o,p,2.1,27);g.userData.isLandscapeBeacon=!0}break}case"community-witness":{h(0,1.18,27,5.7,.34,i,12),h(0,1.56,27,3.3,.18,o,12);for(const[g,d,m]of[[-2.2,28.2,-.3],[0,28.8,0],[2.2,28.2,.3]]){const x=a(g,1.95,d,1.6,.2,.72,n,m);x.userData.isLandscapeStage=!0,a(g,2.34,d-.34,1.6,.62,.16,o,m)}const p=h(0,2.12,26.15,1.08,.2,n,10);p.userData.isLandscapeStage=!0;for(const g of[-3.5,0,3.5]){const d=t(new re(.3,10,8),s,g,3.15,26.55);d.userData.isLandscapeBeacon=!0}u([[-3.7,2.75,26.6],[-1.8,3.3,26.1],[0,2.9,25.95],[1.8,3.3,26.1],[3.7,2.75,26.6]],o,.075),l(4.95,1.08,.12);break}case"fleet":{const p=a(0,2.4,27,8.8,1.15,2.4,i);p.rotation.z=Math.PI;for(const g of[-2.6,0,2.6]){h(g,5.1,27,.1,5.1,o,8);const d=t(new kt(1.65,3.2,3),g===0?s:n,g,5.1,26.7);d.rotation.z=Math.PI/2,d.rotation.y=Math.PI/2,d.userData.isLandscapeStage=!0}u([[-5.5,1.35,27],[-2.8,1.1,26],[0,1.1,27],[2.8,1.1,28],[5.5,1.35,27]],o,.16);break}case"peace-contact":{for(const g of[-4.5,4.5])a(g,2.2,27,2.2,2.1,2.2,n),a(g,4.1,26.55,1.65,1.1,.8,s);const p=a(0,1.7,27,6.8,.34,1.3,o);p.userData.isLandscapeRoute=!0;for(const g of[-1.8,0,1.8])_(g,2.35,26.25,Math.round(g+2));l(5.5,1.2,.12);break}case"chart-room":{h(0,1.25,27,5.7,.42,i,16),h(0,1.52,27,4.25,.14,n,16);const p=h(0,1.64,27,3.72,.12,o,16);p.scale.z=.68,p.userData.isLandscapeStage=!0,u([[-3.1,1.82,27],[-1.8,2.05,26.5],[0,1.9,27.1],[1.55,2.15,26.4],[3.1,1.82,27]],s,.065),u([[-2.65,1.84,27.6],[-1.4,1.96,27.2],[.2,1.86,26.7],[1.95,1.98,27.35],[2.8,1.84,27.6]],o,.065);for(const[m,x]of[[-3.1,27],[-1.8,26.5],[0,27.1],[1.55,26.4],[3.1,27]]){const v=t(new Ye(.22,0),s,m,2.03,x);v.userData.isLandscapeBeacon=!0}const g=h(0,3.25,26.15,.12,3.2,i,8);g.userData.isLandscapeStage=!0;const d=t(new Ye(.48,1),o,0,4.98,26.15);d.userData.isLandscapeBeacon=!0,l(5.15,1.12,.1);break}case"exchange-harbor":{h(0,1.05,27,6.2,.36,i,14);for(const g of[-4,4]){a(g,1.62,27,2.1,.42,5.4,n);for(const d of[25.2,27,28.8])h(g,1.2,d,.17,1.1,o,8);a(g,2.15,26.2,1.25,.86,1.1,g<0?s:o),a(g,2.15,27.55,1.25,.86,1.1,n)}const p=a(0,1.78,27,5.4,.28,1.25,o);p.userData.isLandscapeRoute=!0;for(const[g,d]of[[-1.55,2.52],[0,3.15],[1.55,2.52]]){const m=t(new Ye(.34,0),s,g,d,26.35);m.userData.isLandscapeBeacon=!0}u([[-4.8,1.42,27],[-2.5,1.72,26.2],[0,2.1,26.2],[2.5,1.72,26.2],[4.8,1.42,27]],s,.085),l(5.55,1.18,.14);break}case"itinerary":{const p=new _e({color:14996397,emissive:3354402,emissiveIntensity:.28,roughness:.96}),g=new _e({color:4348748,emissive:1582364,emissiveIntensity:.12,roughness:.8});a(0,3.5,27,9.4,4.6,.42,i),a(0,3.5,26.7,8.7,3.9,.1,p),u([[-3.4,2.4,26.54],[-1.9,4.2,26.54],[.4,3.2,26.54],[2.7,4.5,26.54],[3.6,2.5,26.54]],g,.1);for(const[M,T]of[[-3.4,2.4],[-1.9,4.2],[.4,3.2],[2.7,4.5],[3.6,2.5]]){const R=t(new re(.22,10,8),s,M,T,26.45);R.userData.isLandscapeBeacon=!0}const d=new _e({color:6708036,roughness:.96});u([[-4.8,1.48,25],[-2.8,1.5,24.2],[-.2,1.52,24.6],[2.2,1.52,25.55],[4.5,1.55,25.35]],d,.18),u([[-.2,1.52,24.6],[-1.6,1.5,26.1],[-2.9,1.52,27.8]],o,.085),a(-4.35,1.95,24.9,1.55,1.12,.95,i),a(-4.35,2.56,24.9,1.62,.18,1.02,o);for(const M of[-4.78,-3.92]){const T=t(new re(.16,10,8),n,M,1.35,24.84);T.userData.isLandscapeStage=!0,h(M,2.83,24.9,.055,.55,n,7)}a(-4.35,3.12,24.9,.92,.11,.12,n),h(2.55,2.55,24.95,.12,2.75,i,8),a(2.05,3.48,24.95,1.62,.35,.18,o,-.08),a(3.03,4.02,24.95,1.5,.35,.18,n,.08);const m=t(new Ye(.26,0),s,2.55,4.35,24.95);m.userData.isLandscapeBeacon=!0;const x=6.85;a(x,2.8,26.45,2.3,2.45,1.5,i),a(x,2.92,25.66,1.9,1.55,.12,p),a(x,4.12,25.72,2.45,.24,1.68,o),a(x,2.1,25.42,2.2,.38,.78,n);for(const M of[x-1.02,x+1.02])a(M,2.92,25.54,.12,1.65,.14,n);for(const M of[x-.5,x,x+.5])a(M,2.42,25.3,.24,.28,.24,s);const v=t(new re(.2,10,8),s,x,4.42,25.56);v.userData.isLandscapeBeacon=!0;const y=t(new Ae(.27,.38,.92,8),o,3.95,2.25,25.1);y.userData.isLandscapeStage=!0;const b=t(new re(.29,10,8),n,3.95,2.95,25.1);b.userData.isLandscapeStage=!0;const S=t(new Ae(.27,.38,.92,8),i,x+.22,2.92,26.25);S.userData.isLandscapeStage=!0;const w=t(new re(.29,10,8),n,x+.22,3.62,26.25);w.userData.isLandscapeStage=!0,u([[4.12,2.72,25.15],[5.1,3.05,25.15],[x-.72,3.1,25.15]],s,.055);break}case"detour":{for(const[p,g,d]of[[-3.8,27,1.2],[-2.5,28.1,1.5],[2.8,26.6,1.2],[4,27.4,.95]]){const m=t(new An(d,0),n,p,1.15,g);m.userData.isLandscapeStage=!0}u([[-5.1,1.35,29],[-2.5,1.5,29.5],[0,1.45,28],[2.1,1.4,25.3],[5,1.3,25.6]],o,.2);for(const p of[-2.4,2.1]){const g=t(new Ye(.46,0),s,p,2.4,27.2);g.userData.isLandscapeBeacon=!0}break}case"market-encounter":{h(0,1.08,27,5.8,.3,i,12);for(const[p,g]of[-3.35,3.35].entries()){a(g,3.05,27,2.8,.18,2.25,p===0?o:n);for(const d of[-1.05,1.05])h(g+d,2.12,27,.08,1.85,i,7);a(g,2.55,27,2.38,.72,1.8,p===0?n:o);for(const d of[26.5,27.5])a(g,1.82,d,.48,.36,.42,s)}for(const[p,g]of[[-.95,o],[.95,s]]){const d=t(new Ae(.24,.33,.88,8),g,p,2.12,25.7);d.userData.isLandscapeStage=!0;const m=t(new re(.25,10,8),n,p,2.78,25.7);m.userData.isLandscapeStage=!0}u([[-4.8,1.38,29],[-2.4,1.46,28.2],[0,1.55,27.6],[2.4,1.46,28.2],[4.8,1.38,29]],s,.08),l(5.1,1.08,.11);break}case"hostel":{a(0,3.2,27,7.6,3.8,2,n),a(0,3,25.9,1.55,2.8,.16,i);for(const g of[-2.3,2.3])a(g,4.05,25.88,1.12,.96,.15,s);const p=t(new re(.42,10,8),o,0,5.55,25.75);p.userData.isLandscapeBeacon=!0,u([[-4.3,1.25,29],[-2.2,1.4,27.6],[0,1.45,26],[2.4,1.35,25]],o,.14);break}case"open-route":{f(8.4,5.4,n,27),u([[0,1.35,30],[0,1.55,28],[-2.5,2.1,26],[-4.1,2.55,24.8]],o,.14),u([[0,1.35,30],[0,1.55,28],[2.5,2.1,26],[4.1,2.55,24.8]],s,.14);for(const p of[-4.1,4.1]){const g=t(new re(.46,10,8),o,p,2.55,24.8);g.userData.isLandscapeBeacon=!0}break}case"confidence":{for(let g=0;g<4;g++)a(0,1.05+g*.47,28-g*.8,7.6-g*1.25,.28,1.2,g===3?o:n);a(0,3.45,24.65,4.6,.28,1.35,i);for(const g of[-1.9,1.9])a(g,3.95,24.65,.22,.9,.22,o);const p=t(new re(.56,12,10),s,0,5.25,24.65);p.userData.isLandscapeBeacon=!0;break}case"reflection-garden":{h(0,1.05,27,6.1,.34,i,14);for(let d=0;d<4;d++)a(0,1.38+d*.42,29-d*1.05,8.2-d*1.25,.24,.82,d%2===0?n:o);const p=h(0,2.05,24.8,2.35,.16,s,16);p.scale.z=.55;for(const d of[-3.45,3.45])a(d,2.1,25.6,1.7,.2,.58,n),a(d,2.62,25.88,1.7,.72,.16,o);const g=t(new Ye(.48,1),s,0,4.05,24.55);g.userData.isLandscapeBeacon=!0,u([[-4.7,1.45,29.4],[-2.4,1.65,27.8],[0,1.86,26.5],[2.4,1.65,27.8],[4.7,1.45,29.4]],o,.075),l(5.3,1.1,.12);break}case"rain-shelter":{h(0,1.04,27,5.7,.34,i,12);for(const p of[-3.2,3.2])h(p,2.75,26.4,.1,3.15,o,8),h(p,2.75,28.1,.1,3.15,o,8);a(0,4.48,27.25,7.25,.24,3.6,n,-.08),a(0,4.63,27.25,7.25,.12,3.6,o,-.08),a(0,1.95,27.45,3.6,.2,.72,i),a(0,2.42,27.78,3.6,.68,.16,s);for(const p of[-4.1,-2.05,0,2.05,4.1])u([[p,3.35,24.8],[p+.35,2.85,24.8]],o,.045);u([[-4.9,1.38,29.4],[-2.3,1.5,28.8],[0,1.55,28.1],[2.4,1.5,28.8],[4.9,1.38,29.4]],s,.08),l(5.15,1.07,.1);break}case"rail-platform":{for(const p of[25.6,28.5])a(0,1.3,p,10.5,.32,1.3,n);for(const p of[-4.6,4.6]){const g=h(p,4.15,27,.18,5.7,i,8),d=t(new re(.38,10,8),o,p,6.55,26.78);d.userData.isLandscapeBeacon=!0,g.userData.isLandscapeStage=!0}f(8.7,5.8,o,27),u([[-5.5,1.12,25.3],[0,1.12,25.3],[5.5,1.12,25.3]],i,.08);break}case"rail-car":{a(0,3.15,27,9.6,3.6,2.6,i),a(0,5.05,27,8.8,.4,2.3,o);for(const p of[-3.5,-1.2,1.2,3.5])a(p,3.8,25.63,1.65,1.35,.12,s);for(const p of[-3.5,3.5]){const g=t(new re(.52,12,10),n,p,1.15,26.1);g.userData.isLandscapeStage=!0}u([[-5.4,.92,27],[0,.92,27],[5.4,.92,27]],o,.14);break}case"landscape-window":{h(0,1.05,27,5.9,.34,i,14),a(0,3.62,27,8.5,4.8,.42,n),a(0,3.64,26.74,7.75,4.05,.08,i),f(6.9,4.2,o,26.58);for(const[g,d,m,x]of[[-2.9,2.3,2.1,s],[-.9,2.5,3.15,o],[1.35,2.9,2.45,n],[3.05,1.65,1.75,s]]){const v=t(new kt(d,m,5),x,g,1.78+m/2,26.48);v.userData.isLandscapeStage=!0}u([[-3.6,1.7,26.3],[-1.5,2.02,26.3],[.4,1.78,26.3],[3.45,2.08,26.3]],o,.075);const p=t(new re(.4,12,10),s,2.6,4.35,26.25);p.userData.isLandscapeBeacon=!0,l(5.2,1.12,.1);break}case"route-network":{h(0,1.06,27,6.2,.34,i,14);for(const[p,g,d,m]of[[-4,28.3,2.1,1.45],[0,26.1,2.7,1.95],[4,28.3,2.1,1.45]]){const x=a(p,2.05,g,d,m,1.15,p===0?n:o);x.userData.isLandscapeStage=!0;const v=t(new Ye(p===0?.38:.28,0),s,p,3.1+m/2,g);v.userData.isLandscapeBeacon=!0}u([[-4.2,2.45,28.05],[-2.2,2.15,27.25],[0,2.12,26.75],[2.2,2.15,27.25],[4.2,2.45,28.05]],s,.1),u([[-4.2,1.18,29],[-2.1,1.2,27],[0,1.22,26],[2.1,1.2,27],[4.2,1.18,29]],o,.085),f(7.8,5.1,o,27),l(5.55,1.16,.13);break}case"career":{h(0,1.15,27,6.15,.3,i,12),h(0,2.15,27,3.25,.42,n,12),f(10.4,7.1,o,30.2),a(0,4.75,30.52,6.8,3.5,.3,i);for(const v of[-2.15,0,2.15])a(v,4.75,30.32,1.72,2.88,.12,v===0?s:n),a(v,6.18,30.21,.88,.12,.08,o),a(v,3.55,30.21,1.1,.1,.08,o);for(const v of[-3.6,0,3.6]){h(v,5.95,27.7,.07,1.55,i,6);const y=t(new re(.3,10,8),s,v,5.05,27.7);y.userData.isLandscapeBeacon=!0}for(const v of[0,Math.PI/3,Math.PI*2/3,Math.PI,Math.PI*4/3,Math.PI*5/3]){const y=Math.cos(v)*4.5,b=27+Math.sin(v)*2.4,S=a(y,1.52,b,1.1,.28,.95,i,v+Math.PI/2);S.userData.isLandscapeStage=!0;const w=a(y+Math.cos(v)*.42,2.02,b+Math.sin(v)*.32,1.02,.82,.2,n,v+Math.PI/2);w.userData.isLandscapeStage=!0,u([[y*.72,2.2,27+(b-27)*.7],[0,2.25,27]],o,.055)}const p=new _e({color:14001271,roughness:.86}),g=[new _e({color:8214333,roughness:.9}),new _e({color:4811890,roughness:.88}),new _e({color:9070660,roughness:.9})],d=[{x:4.5,z:27,coat:g[0],facing:Math.PI},{x:-2.25,z:29.08,coat:g[1],facing:-Math.PI/3},{x:2.25,z:24.92,coat:g[2],facing:Math.PI/3}];for(const v of d){const{x:y,z:b,coat:S,facing:w}=v,M=a(y,1.82,b,.66,.32,.48,S,w),T=a(y,2.32,b,.7,.82,.43,S,w),R=t(new re(.3,10,8),p,y,2.98,b),P=t(new re(.305,8,6),i,y,3.08,b+.045);P.scale.set(1,.48,.92);for(const D of[-1,1]){const U=a(y+D*.4,2.29,b-.06,.2,.62,.24,S,w);U.rotation.z=D*-.12;const k=t(new re(.12,8,6),p,y+D*.43,1.98,b-.15);k.userData.isLandscapeStage=!0}for(const D of[M,T,R,P])D.userData.isLandscapeStage=!0}a(-1.18,2.58,26.45,1.12,.16,.78,n,-.08),a(-1.18,2.7,26.45,.92,.08,.68,s,-.08);const m=t(new Ve(.42,.1,8,16),o,1.25,2.76,26.5);m.userData.isLandscapeStage=!0;const x=t(new Ye(.62,1),s,0,3.1,26.5);x.userData.isLandscapeBeacon=!0;break}case"violin":{const p=t(new re(1.55,16,12),n,-.58,3.25,27);p.scale.set(.82,1,.28),p.userData.isLandscapeStage=!0;const g=t(new re(1.2,16,12),o,.62,3.65,27);g.scale.set(.78,.86,.27),g.userData.isLandscapeStage=!0,a(0,3.7,27,.66,3.25,.48,i,-.1),a(0,5.42,26.65,.92,.16,.2,o);for(const d of[-.16,0,.16])a(d,4.1,26.62,.035,3.05,.05,s);u([[-2.65,1.65,26.5],[.1,1.45,26.5],[2.8,6.2,26.5]],o,.09);break}case"craft-quality":{a(0,2.05,27,8.6,.42,3.1,i);for(const g of[-3.5,3.5])a(g,1.05,26.05,.34,1.65,.34,n),a(g,1.05,27.95,.34,1.65,.34,n);for(const g of[-2.45,0,2.45]){const d=a(g,2.58,26.92,1.72,.58,1.18,g===0?s:n,g===0?0:.08);d.userData.isLandscapeStage=!0,a(g,2.91,26.92,1.32,.08,.82,o,g===0?0:.08)}for(const g of[25.95,28.05])a(0,3.05,g,6.1,.1,.12,o);u([[-3.7,3.28,25.55],[-1.8,3.68,25.18],[0,3.92,25.02],[1.8,3.68,25.18],[3.7,3.28,25.55]],o,.07),c(4.05).scale.setScalar(.54),l(3.6,3.72);break}case"bench":{f(9.2,5.5,i,30.8),a(0,4.55,30.45,5.35,2.9,.24,i),a(0,4.55,30.29,4.95,2.48,.08,n);for(let d=0;d<3;d++){const m=5.35-d*.64,x=t(new Ye(.16,0),o,-1.72,m,30.2);x.userData.isLandscapeStage=!0,a(-.25,m,30.2,2.35,.075,.05,s)}for(const d of[-4,4]){a(d,2.35,28.25,1.65,.18,1.25,n);for(const m of[-.58,.58])for(const x of[-.42,.42])a(d+m,1.65,28.25+x,.12,1.3,.12,i);a(d,1.52,26.25,.9,.2,.82,i),a(d,2.12,26.65,.86,.92,.16,o)}a(0,2.35,27,7.2,.4,2.6,n);for(const d of[-3,3])for(const m of[26.1,27.9])a(d,1.35,m,.2,1.8,.2,i);a(-1.55,2.75,26.48,2.2,.22,.92,o),a(1.55,2.8,26.6,1.35,.3,.72,s),h(2.9,3.4,27,.12,1.6,i,8),u([[-3.4,3,26.6],[-1.6,3.45,26.4],[0,3.1,26.1],[1.55,3.5,26.6]],o,.075);const p=a(3.65,1.66,24.55,.98,.2,.86,s,.12);p.rotation.z=.08,a(3.65,2.28,24.94,.9,.92,.17,o,.12);for(const[d,m,x]of[[-.34,-.28,.72],[.34,-.28,.72],[-.34,.28,.42],[.34,.28,.72]])a(3.65+d,1.24,24.55+m,.12,x,.12,i);const g=t(new Ve(.82,.07,8,24),s,3.65,1.1,24.55);g.rotation.x=Math.PI/2,g.userData.isLandscapeRing=!0;break}case"caliper":{for(const g of[-3.1,3.1])a(g,4.2,27,.42,5.8,.5,o);a(0,7,27,6.6,.42,.5,o),a(-.7,4.95,27,.35,2.5,.45,s),a(.25,3.05,27,2.2,1.25,1.8,n);for(let g=0;g<5;g++)a(-2.35+g*.5,6.55,26.72,.08,.24,.12,i);const p=t(new re(.36,10,8),s,-.78,5.05,26.68);p.userData.isLandscapeBeacon=!0;break}case"trust-bridge":{for(const g of[-5,5])for(const d of[26.2,27.8])h(g,2.5,d,.48,3.4,n,8);const p=a(0,2.25,27,10.5,.42,2.5,o);p.userData.isLandscapeRoute=!0;for(const g of[-4.1,4.1])a(g,4.1,27,.28,3.5,.28,i);u([[-4.1,5.6,27],[0,5.6,27],[4.1,5.6,27]],s,.12);break}case"loom":{f(8.2,6.4,n,27);for(let p=0;p<11;p++){const g=-3.45+p*.69;a(g,3.95,26.55,.075,4.55,.12,p%3===0?o:s)}for(let p=0;p<5;p++)a(0,2.5+p*.65,26.45,7.2,.1,.1,p%2?n:o);l(4.8,1.25,.05);break}case"heritage":{a(0,4.2,27,8.4,5.6,.56,i),a(0,4.2,26.66,7.7,4.9,.12,n);for(let p=0;p<5;p++)for(let g=0;g<7;g++){const d=t(new Ye(.22+(p+g)%2*.08,0),(p+g)%3===0?o:s,-2.85+g*.95,2.4+p*.85,26.5);d.userData.isLandscapeStage=!0}u([[-4.7,1.2,27],[-2.2,1.5,26],[0,1.35,25.8],[2.3,1.5,26],[4.7,1.2,27]],o,.1);break}case"work-dignity":{h(0,1.18,27,5.6,.32,i,12);for(const[g,d]of[-3.75,-1.25,1.25,3.75].entries()){const m=a(d,1.96,27,1.55,1.15,1.5,g%2===0?n:i);m.userData.isLandscapeStage=!0;const x=t(g%2===0?new Ye(.56,0):new Ve(.42,.12,7,16),g%2===0?o:s,d,2.9,26.45);x.userData.isLandscapeStage=!0,u([[d,3.2,26.4],[d/2,3.72,26.2],[0,4.05,26.2]],o,.055)}const p=t(new Ye(.48,1),s,0,4.25,26.15);p.userData.isLandscapeBeacon=!0,l(5.05,1.12,.08);break}case"craft-evolution":{a(0,1.85,27,8.4,.42,2.9,i);for(const d of[-3.2,3.2])a(d,1.12,26.08,.28,1.35,.28,n),a(d,1.12,27.92,.28,1.35,.28,n);const p=t(new Ve(.88,.14,8,24),o,-2.25,3.55,26.72);p.userData.isLandscapeStage=!0,a(-2.25,3.55,26.68,.12,1.38,.08,i,-.46),a(2.25,3.55,26.7,2.35,1.7,.22,n),a(2.25,3.55,26.55,1.85,1.16,.08,s);for(const d of[3.3,3.55,3.8])a(2.25,d,26.49,1.2,.055,.04,o);u([[-1.24,3.55,26.52],[0,4.1,26.52],[1.08,3.55,26.52]],s,.085);const g=t(new Ye(.38,1),o,0,4.45,26.45);g.userData.isLandscapeBeacon=!0;break}case"embroidery-table":{a(0,1.72,27.15,8.2,.4,3.15,i);for(const p of[-3.25,3.25])for(const g of[26.15,28.15])a(p,1.05,g,.24,1.45,.24,n);a(0,3.62,26.58,4.6,3.35,.2,n),a(0,3.62,26.43,4.12,2.88,.08,i);for(let p=0;p<7;p++){const g=-1.5+p*.5,d=a(g,3.62,26.34,.075,2.35,.06,p%2===0?o:s);d.userData.isLandscapeStage=!0}for(let p=0;p<5;p++)a(0,2.68+p*.47,26.32,3.05,.065,.055,p%2===0?s:o);for(const p of[-3.15,3.15]){h(p,2.25,26.55,.3,.85,n,10);const g=t(new Ve(.34,.1,7,16),o,p,2.75,26.55);g.userData.isLandscapeStage=!0}u([[-3.3,2.45,28.1],[-1.8,2.82,27.1],[0,2.55,26.2],[1.8,2.82,27.1],[3.3,2.45,28.1]],s,.06);break}case"living-heritage":{for(const[p,g]of[29.2,27,24.8].entries()){const d=7.8-p*.75;f(d,5.5-p*.3,p===1?o:n,g);for(let m=0;m<5;m++){const x=t(new Ye(.2+m%2*.06,0),m%2===0?s:o,-1.6+m*.8,2.5+m%2*.7,g-.36);x.userData.isLandscapeStage=!0}}u([[-3.2,4.65,29.2],[-1.5,5.1,27],[0,4.45,24.8],[1.5,5.1,27],[3.2,4.65,29.2]],o,.08),u([[-3.2,2.1,29.2],[-1.5,2.25,27],[0,2.12,24.8],[1.5,2.25,27],[3.2,2.1,29.2]],s,.065),l(5.1,1.12,.1);break}case"lunar-probe":{const p=t(new re(4.8,18,12,0,Math.PI*2,0,Math.PI/2),n,0,.3,33.5);p.userData.isLandscapeStage=!0;for(const[y,b,S]of[[-3.2,32.2,.72],[-1.6,34,.52],[2.8,32.5,.84],[3.6,34.1,.44]]){const w=t(new Ve(S,.13,6,18),i,y,.62,b);w.rotation.x=Math.PI/2,w.userData.isLandscapeStage=!0}const g=t(new ve(2.25,.86,1.58),n,-1.8,2.02,24.5);g.userData.isLandscapeStage=!0,a(-1.8,2.47,24.5,2.04,.16,1.4,o);const d=new _e({color:2707312,emissive:1058877,emissiveIntensity:.24,roughness:.58,metalness:.3});for(const y of[-3.72,.12]){a(y,2.56,24.5,1.42,.14,1.62,d);for(let b=0;b<4;b++)a(y,2.65,23.92+b*.38,1.3,.035,.035,o);u([[y<-1.8?-2.86:-.74,2.4,24.5],[y,2.45,24.5]],o,.055)}for(const y of[-3,-1.8,-.6])for(const b of[23.58,25.42]){const S=t(new Ae(.4,.4,.24,12),i,y,1.62,b);S.rotation.z=Math.PI/2,S.userData.isLandscapeStage=!0}h(-1.8,3.32,24.5,.08,1.72,i,8),a(-1.8,4.2,24.5,.82,.42,.52,n);const m=t(new re(.13,10,8),o,-1.8,4.2,24.2);m.userData.isLandscapeBeacon=!0;const x=t(new Ye(.58,0),s,-1.8,4.92,24.5);x.userData.isLandscapeBeacon=!0;const v=t(new re(.19,10,8),o,-1.8,5.72,24.5);v.userData.isLandscapeBeacon=!0,u([[-4.5,.82,24.2],[-3.5,.85,23.8],[-1.8,.85,24.5],[.1,.82,25.4]],o,.09);break}case"test-console":{a(0,2.45,27,7.8,.56,2.6,i),a(0,3.25,26.55,7.2,1.1,.28,n,-.16);for(let p=0;p<7;p++){const g=-2.8+p*.92,d=t(new re(.22+p%2*.07,10,8),p%3===0?o:s,g,3.42,26.28);d.userData.isLandscapeBeacon=!0}for(const p of[-2.3,0,2.3])a(p,4.75,27,1.35,1.45,.65,n);u([[-3.3,1.25,29],[-1.7,1.3,27.9],[0,1.28,27],[1.7,1.3,27.9],[3.3,1.25,29]],o,.1);break}case"lander":{const p=t(new Ye(1.45,1),s,0,5.35,27);p.scale.y=.82,p.userData.isLandscapeStage=!0;for(const[d,m]of[[-2.1,25.2],[2.1,25.2],[-2.1,28.8],[2.1,28.8]]){const x=a(d*.68,3.15,(m+27)/2,.16,3.5,.16,o);x.rotation.z=d<0?-.24:.24,a(d,1.4,m,1.1,.22,.82,i)}for(const d of[-3.7,3.7]){a(d,5.2,27,1.25,1.65,.14,o);for(let m=0;m<4;m++)a(d,4.6+m*.4,26.9,1.1,.055,.08,s)}h(0,7.3,27,.08,2.2,i,6);const g=t(new re(.38,10,8),o,0,8.55,27);g.userData.isLandscapeBeacon=!0;break}case"orbit-adjustment":{const p=t(new re(2.1,16,12),n,0,3.1,27);p.userData.isLandscapeStage=!0;for(const[g,d]of[[.2,0],[.72,.55],[-.5,-.72]]){const m=l(4.4,3.2,g);m.rotation.y=d}for(const[g,d,m]of[[3.6,4.9,27],[-1.8,5.8,27.5],[-2.2,2.2,26.7]]){const x=t(new Ye(.44,0),o,g,d,m);x.userData.isLandscapeBeacon=!0}u([[3.6,4.9,27],[1.9,5.3,27],[0,5.4,27],[-1.8,5.8,27.5]],s,.07);break}case"training":{f(9,6.2,o,30.2),a(0,4.45,30,5.8,2.7,.22,i),a(0,4.45,29.82,5.35,2.3,.08,n);for(let y=0;y<3;y++){const b=5.2-y*.62;for(const S of[-1.55,0,1.55]){const w=t(new Ye(.13,0),y===1?s:o,S,b,29.72);w.userData.isLandscapeStage=!0}a(0,b-.2,29.72,3.8,.035,.03,i)}a(0,1.28,26.5,3.25,.28,1.55,i);for(const y of[-1.05,1.05]){const b=t(new Ae(.42,.42,.18,12),o,y,1.18,26.5);b.rotation.z=Math.PI/2,b.userData.isLandscapeStage=!0,a(y,2.28,26.45,.16,1.78,.16,n)}const p=new _e({color:14213348,roughness:.76,metalness:.04}),g=new _e({color:3300220,roughness:.22,metalness:.34,emissive:1520715,emissiveIntensity:.18}),d=a(0,2.78,25.6,.78,1.18,.55,p),m=t(new re(.4,12,9),p,0,3.62,25.6),x=t(new re(.28,10,8),g,0,3.64,25.31);x.scale.set(1,.72,.45);for(const y of[-1,1]){const b=a(y*.55,2.72,25.56,.22,.82,.25,p);b.rotation.z=y*-.18,a(y*.22,1.96,25.45,.22,.72,.26,p);const S=t(new Ve(.17,.055,7,14),o,y*.9,2,26);S.rotation.x=Math.PI/2,S.userData.isLandscapeStage=!0}for(const y of[d,m,x])y.userData.isLandscapeStage=!0;u([[-.8,3.7,25.7],[-.55,4.55,26.1],[0,5.25,26.4],[.65,5.75,27]],s,.07);const v=t(new re(.3,10,8),o,0,5.7,27);v.userData.isLandscapeBeacon=!0,l(3.2,1.08,.1);break}case"science-exhibit":{for(const[p,g,d]of[[-3.5,3.5,.65],[0,5.1,.88],[3.5,3.5,.65]]){const m=t(new re(d,12,10),p===0?o:s,p,g,27);m.userData.isLandscapeBeacon=!0}for(const p of[-2.5,0,2.5]){const g=h(p,2.2,27,.13,2.7,i,8);g.rotation.z=p*.04}l(4.5,5.4,.44),l(2.7,3.6,-.7);break}case"relay-bridge":{f(10.2,6.2,i,29.7);const p=t(new re(1.15,14,10),o,-4.2,3.7,27.7);p.userData.isLandscapeBeacon=!0;const g=t(new re(1.75,16,12),n,4.2,2.7,28.1);g.userData.isLandscapeStage=!0;for(const[m,x,v]of[[3.35,28.1,.38],[4.8,28.1,.52],[5.05,27.75,.24]]){const y=t(new Ve(v,.09,6,16),i,m,2.72,x);y.rotation.x=Math.PI/2,y.userData.isLandscapeStage=!0}a(0,4.65,27,.92,.68,.7,s);for(const m of[-1.45,1.45]){a(m,4.68,27,1.52,.12,.82,o);for(let x=0;x<3;x++)a(m,4.69,26.72+x*.27,1.38,.035,.035,i)}const d=t(new re(.22,10,8),s,0,5.75,27);d.userData.isLandscapeBeacon=!0,u([[-3.05,4.15,27.5],[-1.5,5.4,27],[0,5.72,27],[1.5,4.3,27.3],[3.2,3.2,27.8]],s,.09),l(3.1,5.2,.36);break}case"sample-lab":{a(0,2.05,27,8.4,.38,3.2,i);for(const g of[-3.4,3.4])for(const d of[25.9,28.1])a(g,1.14,d,.22,1.62,.22,o);a(0,4.7,30,6.8,2.9,.22,n);for(const g of[-2.3,0,2.3]){const d=t(new ve(1.55,1.22,1.06),s,g,3,26.55);d.material=new _e({color:10205388,transparent:!0,opacity:.2,roughness:.28,metalness:.08}),d.userData.isLandscapeStage=!0;const m=t(new An(.42,0),g===0?o:n,g,2.68,26.42);m.scale.set(1,.72,.82),m.userData.isLandscapeStage=!0,h(g,2.35,26.42,.52,.1,i,12)}for(let g=0;g<3;g++)a(0,5.35-g*.6,29.86,3.4,.06,.035,g===1?s:o);const p=h(3.05,3.35,26.55,.16,1.75,o,10);p.rotation.z=.28,a(3.25,4.05,26.55,.85,.14,.14,s,-.28),u([[-3.4,3.1,28.4],[-1.6,3.7,27.7],[0,3.45,27.2],[1.8,3.1,28.4],[3.05,3.7,27.7]],o,.055);break}case"moon-horizon":{const p=t(new re(6.3,20,12,0,Math.PI*2,0,Math.PI/2),n,0,.55,34.5);p.userData.isLandscapeStage=!0;for(const[d,m,x]of[[-4.3,32.2,.72],[-1.8,34.4,.5],[2.1,33.1,.86],[4.2,35,.48]]){const v=t(new Ve(x,.11,6,18),i,d,.8,m);v.rotation.x=Math.PI/2,v.userData.isLandscapeStage=!0}a(0,1.55,25.6,8.8,.34,2.7,i);for(const d of[-3.6,3.6])a(d,2.45,25.7,.24,1.62,.24,o);a(0,3.35,25.7,7.4,.22,.35,s);const g=t(new Ye(.46,0),o,0,4.15,25.7);g.userData.isLandscapeBeacon=!0,u([[-4.1,1.02,28.7],[-2.1,1.06,27.3],[0,1.1,26.6],[2.1,1.06,27.3],[4.1,1.02,28.7]],s,.085);break}case"systems-simulation":{for(const g of[-3.6,0,3.6]){a(g,3.35,27.8,2.35,2.25,.3,i),a(g,3.55,27.58,1.95,1.48,.08,n);for(let d=0;d<3;d++)u([[g-.78,3.05+d*.26,27.48],[g-.18,3.24+d*.26,27.48],[g+.28,3.12+d*.26,27.48],[g+.78,3.36+d*.26,27.48]],d===1?s:o,.035);h(g,1.82,27.8,.1,1.24,o,8)}a(0,1.3,27.7,8.6,.22,2.25,i);const p=t(new Ti(.56,1),s,0,5.25,27.48);p.userData.isLandscapeBeacon=!0,u([[-2.3,4.8,27.45],[0,5.2,27.45],[2.3,4.8,27.45]],o,.07);break}case"mission-control":{f(10.8,6.8,o,30.2),a(0,5,30,7.1,3,.24,i);for(let g=0;g<5;g++){const d=-2.4+g*1.2,m=a(d,5,29.82,.88,1.65,.08,g===2?s:n);for(let x=0;x<4;x++)a(d,4.5+x*.27,29.74,.58,.035,.025,x===2?s:o);m.userData.isLandscapeStage=!0}for(const g of[-3.2,0,3.2]){a(g,2.2,26.7,2.15,.35,1.35,o),a(g,2.65,26.3,1.75,.65,.18,n,-.18);for(const d of[-.72,.72])a(g+d,1.65,26.72,.12,1.1,.12,i)}u([[-4.2,3.1,27.2],[-2.1,3.75,27],[0,4.15,27],[2.1,3.75,27],[4.2,3.1,27.2]],s,.065);const p=t(new Ye(.38,1),s,0,6.95,29.7);p.userData.isLandscapeBeacon=!0;break}case"crew-simulation":{f(8.6,6.1,o,29.5);for(const m of[-3.1,3.1]){const x=t(new re(1.2,12,10),i,m,3.2,27.6);x.scale.set(.9,1.1,.62),x.userData.isLandscapeStage=!0,a(m,3.2,26.96,1.7,.1,.1,s)}const p=new _e({color:14279397,roughness:.78,metalness:.04}),g=new _e({color:3627640,roughness:.24,metalness:.32,emissive:1586250,emissiveIntensity:.16});for(const[m,x,v]of[[-1.8,25.9,-.22],[1.8,25.9,.22]]){const y=a(m,2.55,x,.72,.98,.48,p,v),b=t(new re(.42,12,9),p,m,3.48,x),S=t(new re(.28,10,8),g,m,3.49,x-.22);S.scale.set(1,.72,.48);for(const M of[-1,1])a(m+M*.5,2.48,x-.04,.2,.76,.24,p,v);const w=t(new Ye(.16,0),o,m,2.75,x-.27);for(const M of[y,b,S,w])M.userData.isLandscapeStage=!0}u([[-2.8,2.1,27.2],[-1.2,2.55,26.7],[0,2.7,26.1],[1.2,2.55,26.7],[2.8,2.1,27.2]],s,.065);const d=t(new re(.28,10,8),o,0,5.15,27.15);d.userData.isLandscapeBeacon=!0;break}case"future-frontier":{const p=t(new re(2.55,16,10,0,Math.PI*2,0,Math.PI/2),s,0,1.42,28);p.userData.isLandscapeStage=!0,a(0,1.45,28,5.15,.18,.3,i);for(const d of[-4.2,4.2]){const m=a(d,2.05,27.3,2.35,.12,1.25,o,d<0?-.12:.12);m.userData.isLandscapeStage=!0;for(let x=0;x<3;x++)a(d,2.14,26.86+x*.42,2.12,.03,.03,i);for(const x of[-.92,.92])a(d+x,1.35,27.3,.12,1.35,.12,i)}for(const d of[0,Math.PI/3,Math.PI*2/3,Math.PI,Math.PI*4/3,Math.PI*5/3]){const m=Math.cos(d)*3.2,x=28+Math.sin(d)*2.6,v=t(new re(.16,8,6),o,m,1.25,x);v.userData.isLandscapeBeacon=!0,u([[m,1.05,x],[m*.55,1.12,28+(x-28)*.55],[0,1.12,28]],s,.045)}const g=t(new Ye(.48,1),o,0,5.1,28);g.userData.isLandscapeBeacon=!0,l(5.2,1.2,.1);break}case"exchange":{for(const p of[-3.8,3.8]){a(p,3.7,27,.35,5.8,.48,o);for(let g=0;g<3;g++)a(p*.85,2.15+g*1.45,27,1.4,.12,.62,n)}for(let p=0;p<8;p++)_(-3.1+p%4*2.05,2.65+Math.floor(p/4)*1.45,26.55,p,.34);u([[-4.1,1.35,29],[-2.1,1.6,27.5],[0,1.45,26],[2.1,1.6,27.5],[4.1,1.35,29]],o,.12);break}case"resilience":{f(8.6,5.8,n,27);for(let p=0;p<4;p++){const g=-3+p*2;a(g,2.25,26.1,1.28,1.1,.94,p%2?o:s);const d=t(new re(.27,10,8),s,g,3.05,25.72);d.userData.isLandscapeBeacon=!0}u([[-4.5,1.25,29],[-2.2,1.45,27.4],[0,1.45,26],[2.2,1.45,27.4],[4.5,1.25,29]],o,.14);break}case"exchange-wall":{a(0,4,27,9.2,5.8,.56,i),a(0,4,26.65,8.5,5.15,.12,n);for(const p of[2.2,3.4,4.6,5.8])a(0,p,26.35,8.1,.14,.44,o);for(let p=0;p<3;p++)for(let g=0;g<7;g++)_(-3.3+g*1.1,2.68+p*1.2,26.05,p*7+g,.37);u([[-4.4,1.2,29],[0,1.38,28.2],[4.4,1.2,29]],s,.1);break}case"resource-cycle":{for(let g=0;g<3;g++){const d=g/3*Math.PI*2-Math.PI/2,m=Math.cos(d)*3.4,x=27+Math.sin(d)*2.2;h(m,1.55,x,1.05,.5,n,8),_(m,2.2,x-.35,g,.7)}u([[-3.4,2.6,27],[0,3,24.7],[3.4,2.6,27],[0,2.3,29.2],[-3.4,2.6,27]],o,.11);const p=t(new re(.52,12,10),s,0,3.8,27);p.userData.isLandscapeBeacon=!0;break}case"library":{a(0,3.55,27,8.8,4.8,2.3,n);for(const p of[-3.1,0,3.1]){a(p,3.8,25.78,1.8,3.1,.14,i);for(let g=0;g<3;g++){a(p,2.65+g*.92,25.62,1.56,.12,.18,o);for(let d=0;d<3;d++)_(p-.48+d*.48,3.1+g*.92,25.42,g*3+d,.24)}}a(0,3.1,25.68,1.12,2.6,.18,s),f(9.3,6.3,o,28.1);break}case"digital-lending":{a(0,4.1,27,4.3,6,.62,i),a(0,4.1,26.62,3.72,5.4,.12,s);for(const[p,g]of[[-.62,5.6],[.52,4.25],[-.45,2.9]])a(p,g,26.43,1.68,.28,.08,o);for(const p of[-4.2,4.2]){const g=a(p,3.5,27,1.7,4.6,1.2,n);g.userData.isLandscapeStage=!0;for(let d=0;d<3;d++)a(p,2.15+d*1.25,26.35,1.5,.1,.2,o)}u([[-4,2.2,26.1],[-2.2,2.8,26.1],[0,3.2,26.1],[2.2,2.8,26.1],[4,2.2,26.1]],s,.08);break}case"budget-board":{a(0,4.15,28.7,8.8,5.2,.42,i),a(0,4.15,28.46,8.2,4.62,.08,n);for(const p of[-2.7,0,2.7])a(p,4.05,28.38,.08,3.55,.06,o);for(const p of[2.45,3.65,4.85,6.05])a(0,p,28.38,7.8,.07,.06,o);for(const[p,g]of[1.05,1.7,2.5].entries()){const d=a(-1.8+p*1.8,2.55+g/2,28.18,.92,g,.18,p===2?s:o);d.userData.isLandscapeStage=!0}for(let p=0;p<5;p++)h(3.38,1.48+p*.24,27,.48,.13,p%2?o:s,12);u([[-4.5,1.28,29.2],[-2.2,1.35,27.8],[0,1.4,26.3],[2.1,1.48,25.6],[4.4,1.55,26.4]],o,.1),l(5.1,1.08,.1);break}case"trust-ledger":{h(0,1.18,27,6.1,.34,i,12),a(0,1.92,27,7.4,.28,3.5,n),a(-1.75,2.13,26.72,2.5,.12,2.45,s,-.08),a(1.1,2.13,26.72,2.5,.12,2.45,o,.08);for(const p of[-2.45,-1.72,-.98,.38,1.1,1.82])a(p,2.24,26.35,.08,.04,1.72,i);for(const p of[25.85,26.42,27.02])a(-1.73,2.24,p,2.24,.04,.06,i);for(const p of[-4,4]){const g=t(new Ye(.62,0),p<0?o:s,p,3.45,27);g.userData.isLandscapeBeacon=!0}u([[-4,2.9,27],[-2,2.55,27],[0,2.42,27],[2,2.55,27],[4,2.9,27]],o,.08),l(5.15,1.16,.1);break}case"sustainable-market":{for(const[p,g]of[-3.55,0,3.55].entries()){a(g,2.28,27,2.75,.22,2.2,p===1?o:n);for(const m of[-.98,.98])a(g+m,1.55,27,.16,1.35,.16,i);const d=a(g,4.05,27,3.05,.24,2.5,p===1?s:o,p===1?.03:-.03);d.userData.isLandscapeStage=!0;for(let m=0;m<3;m++){const x=a(g-.78+m*.78,2.76,26.2,.56,.72,.54,m%2?s:i);x.userData.isLandscapeStage=!0}}for(const p of[-1.75,1.75]){const g=t(new Ae(.24,.32,.9,8),p<0?o:i,p,1.82,24.9);g.userData.isLandscapeStage=!0,t(new re(.24,10,8),n,p,2.47,24.9)}u([[-5.1,1.2,29.2],[-3,1.28,27.7],[0,1.35,26],[3,1.28,27.7],[5.1,1.2,29.2]],s,.08),l(5.35,1.08,.1);break}case"knowledge-bridge":{for(const g of[-4.15,4.15]){a(g,3.4,27,1.55,4.3,1.55,n);for(let d=0;d<3;d++){a(g,2.15+d*1.12,26.12,1.28,.12,.18,o);for(let m=0;m<3;m++)_(g-.42+m*.42,2.53+d*1.12,25.96,d*3+m,.22)}}f(10.4,5.35,o,28.8);const p=a(0,2.28,27,7.1,.36,2.35,i);p.userData.isLandscapeRoute=!0;for(const g of[-2.3,0,2.3]){const d=a(g,2.5,27,1.18,.14,1.45,g===0?s:o);d.userData.isLandscapeStage=!0}u([[-4.2,2.58,27],[-2.2,2.68,27],[0,2.72,27],[2.2,2.68,27],[4.2,2.58,27]],s,.08),l(5.3,1.12,.1);break}default:c()}}function J1(r,e,t,n){if(!e||!t||e==="hub"||e==="section-a"||e==="section-b"||e==="stories-of-china"||e==="learning-lab"||e==="unit-project")return;const i=document.createElement("canvas");i.width=1024,i.height=256;const s=i.getContext("2d");if(!s)return;s.fillStyle="rgba(7, 14, 27, 0.88)",s.fillRect(20,24,984,208),s.strokeStyle=`#${n.toString(16).padStart(6,"0")}`,s.lineWidth=8,s.strokeRect(24,28,976,200),s.textAlign="center",s.textBaseline="middle",s.font="bold 52px 'Microsoft YaHei', sans-serif",s.fillStyle="#f8fbff",s.fillText(t.slice(0,26),512,126,920);const o=new oi(i);o.colorSpace=Tt;const c=new Ii(new Si({map:o,transparent:!0,depthWrite:!1,toneMapped:!1}));c.position.set(0,11,14),c.scale.set(19,4.75,1),c.renderOrder=8,r.add(c)}function Z1(r,e,t,n,i){const s=new G(new Ae(13,14.5,.65,8),e);s.position.y=.34,r.add(s);const o=new G(new Ve(11.8,.11,8,48),i);o.rotation.x=Math.PI/2,o.position.y=.72,o.userData.isLandscapeRing=!0,r.add(o);const c=new G(new Ae(7.2,7.6,.16,8),t);c.position.y=.76,r.add(c);const l=new G(new Ve(6.8,.07,8,40),n);l.rotation.x=Math.PI/2,l.position.y=.9,l.userData.isLandscapeRing=!0,r.add(l);const a=new G(new ve(.72,8.5,.72),i);a.position.set(-5.2,4.8,8.5);const h=a.clone();h.position.x=5.2;const u=new G(new ve(11.1,.72,.72),i);u.position.set(0,8.7,8.5),r.add(a,h,u);const f=new G(new Ve(2.75,.1,8,40),n);f.position.set(0,4.65,8.5),r.add(f);for(const[_,p]of[[-7,-7],[7,-7],[-7,7],[7,7]]){const g=new G(new Ae(.28,.42,4.8,8),t);g.position.set(_,2.6,p),r.add(g);const d=new G(new re(.43,10,8),n);d.position.set(_,5.05,p),d.userData.isLandscapeBeacon=!0,r.add(d)}}function $1(r,e,t,n,i,s){if(!e||e==="hub")return;const o=new G(new Ae(7.8,8.8,.4,8),n);switch(o.position.set(0,.86,27),r.add(o),e){case"section-a":{const c=new G(new ve(8.4,.42,5.6),t);c.position.set(-2.2,3.5,27),c.rotation.y=-.18;const l=new G(new ve(5.8,.16,4.4),i);l.position.set(2.2,3.8,27),l.rotation.y=.18;const a=new G(new ve(.32,2.1,5.8),s);a.position.set(0,2.25,27),r.add(c,l,a),Ks(l);break}case"section-b":{for(const a of[-3.8,3.8]){const h=new G(new Ae(.72,1.05,8.2,8),t);h.position.set(a,4.9,27),r.add(h)}const c=new G(new Ve(4.1,.2,8,40,Math.PI),s);c.position.set(0,8.2,27),c.rotation.z=Math.PI,r.add(c);const l=new G(new re(1.25,16,12),i);l.position.set(0,4.9,27),r.add(l),Ks(l);break}case"stories-of-china":{for(const[a,h,u]of[[5.8,2,8],[4.4,4.2,6],[3,6.2,5]]){const f=new G(new Ae(a,a+.55,.7,u),t);f.position.set(0,h,27),r.add(f)}const c=new G(new Ye(1.7,1),i);c.position.set(0,9,27),r.add(c);const l=new G(new Ve(2.5,.13,8,32),s);l.rotation.x=Math.PI/2,l.position.set(0,9,27),r.add(l),Ks(c),Ea(l);break}case"learning-lab":{const c=new G(new Ae(2.4,2.8,6.5,12),i);c.position.set(0,4.3,27),r.add(c);for(const l of[.35,-.35]){const a=new G(new Ve(4.9,.16,8,48),s);a.position.set(0,4.3,27),a.rotation.set(l,.4,l*1.4),r.add(a),Ea(a)}Ks(c);break}case"unit-project":{const c=new G(new Ye(2.8,1),i);c.position.set(0,7.4,27),r.add(c);for(const[a,h]of[[-5.3,24],[5.3,24],[-5.3,30],[5.3,30]]){const u=new G(new Ae(.5,.78,6.8,8),s);u.position.set(a,3.9,h),r.add(u)}const l=new G(new Ve(4.5,.18,8,48),s);l.rotation.x=Math.PI/2,l.position.set(0,1.2,27),r.add(l),Ks(c),Ea(l);break}}}function Ks(r){r.userData.isLandscapeBeacon=!0}function Ea(r){r.userData.isLandscapeRing=!0}function Q1(r,e,t,n){const i=[{x:-21,z:-20,color:3718648},{x:21,z:-20,color:16498468},{x:-21,z:20,color:4906624},{x:21,z:20,color:16020150}];for(const s of i){const o=new G(new Ae(3.3,3.7,.32,6),e);o.position.set(s.x,.7,s.z),r.add(o);const c=t.clone();c.color.setHex(s.color),c.emissive.setHex(s.color),c.emissiveIntensity=1.3;const l=new G(new Ti(.95,1),c);l.position.set(s.x,2.2,s.z),l.userData.isLandscapeBeacon=!0,r.add(l);const a=new G(new Ve(1.55,.08,6,24),n.clone());a.material.color.setHex(s.color),a.material.emissive.setHex(s.color),a.rotation.x=Math.PI/2,a.position.set(s.x,1.25,s.z),a.userData.isLandscapeRing=!0,r.add(a)}}function ev(r,e,t,n,i){if(i){const c=new _e({color:3360862,emissive:1058873,emissiveIntensity:.14,roughness:.78,metalness:.18}),l=new _e({color:5735318,emissive:2646388,emissiveIntensity:.18,roughness:.62,metalness:.12});for(const _ of[-1,1]){const p=new G(new Ae(.3,.46,2.8,7),c);p.position.set(_*13.2,1.4,34),r.add(p);for(const g of[.7,1.35,2]){const d=new G(new ve(.56,.07,.09),l);d.position.set(_*13.2,g,33.56),d.userData.isLandscapeRoute=!0,r.add(d)}}const a=new _e({color:3891573,emissive:2649216,emissiveIntensity:.28,roughness:.52,metalness:.2}),h=new ni([new L(-9,5.5,42),new L(-6,8,42),new L(0,9.2,42),new L(6,8,42),new L(9,5.5,42)]),u=new G(new kn(h,40,.07,6,!1),a);u.userData.isLandscapeRoute=!0,r.add(u);const f=new _e({color:10410461,emissive:5610924,emissiveIntensity:.34,roughness:.4,metalness:.18});for(const _ of[-9,9]){const p=new G(new re(.46,12,8),f);p.position.set(_,5.5,42),p.userData.isLandscapeBeacon=!0,r.add(p)}return}const s=[[-28,35,13],[0,43,18],[28,35,11]];for(const[c,l,a]of s){const h=new G(new Ae(2.4,3.3,a,6),e);h.position.set(c,a/2,l),r.add(h);const u=new G(new re(2.2,12,8),t);u.position.set(c,a+1.1,l),u.userData.isLandscapeBeacon=!0,r.add(u);const f=new G(new Ve(3.6,.08,6,32),n);f.rotation.x=Math.PI/2,f.position.set(c,a*.64,l),f.userData.isLandscapeRing=!0,r.add(f)}const o=new G(new ve(54,.18,.34),e);o.position.set(0,6.5,35),r.add(o)}function tv(r,e,t,n){for(const i of[-28,0,28]){const s=new G(new ve(9,.4,6),e);s.position.set(i,.9,34),r.add(s);const o=new G(new kt(7,3.6,4),t);o.position.set(i,4.2,34),o.rotation.y=Math.PI/4,r.add(o);const c=new G(new re(.7,10,8),n);c.position.set(i,5.3,34),c.userData.isLandscapeBeacon=!0,r.add(c)}}function nv(r,e,t,n,i=!1){if(i)return;const s=new G(new Ae(2.5,4.2,18,8),e);s.position.set(0,9,38),r.add(s);for(const[o,c,l,a]of[[-7,16,38,7],[7,18,38,8],[0,24,38,9]]){const h=new G(new Ti(a,1),t);h.position.set(o,c,l),h.userData.isLandscapeBeacon=!0,r.add(h)}for(const o of[-31,31]){const c=new G(new Ve(4,.16,8,32),n);c.rotation.x=Math.PI/2,c.position.set(o,.9,36),c.userData.isLandscapeRing=!0,r.add(c)}}function iv(r,e,t,n,i,s=!1){if(s){const a=new G(new ve(18,.36,8),e);a.position.set(0,.85,39),r.add(a);for(const _ of[-6.2,6.2]){const p=new G(new ve(.48,5.8,.5),t);p.position.set(_,3.9,39),r.add(p)}const h=new G(new ve(14,.48,6.4),i);h.position.set(0,6.9,39),r.add(h);const u=new G(new ve(5.8,.3,1.35),t);u.position.set(0,1.9,35.5),u.userData.isLandscapeStage=!0,r.add(u);for(const _ of[-2.2,2.2]){const p=new G(new ve(.22,1.6,.22),i);p.position.set(_,1.05,35.5),r.add(p)}const f=new G(new re(.48,10,8),n);f.position.set(0,5.7,38.6),f.userData.isLandscapeBeacon=!0,r.add(f);return}const o=new G(new ve(26,.7,15),e);o.position.set(0,1.1,39),r.add(o);for(const a of[-9,-3,3,9]){const h=new G(new Ae(1.1,1.5,13,8),t);h.position.set(a,7.5,40),r.add(h)}const c=new G(new kt(12,5,4),n);c.position.set(0,17,40),c.rotation.y=Math.PI/4,c.userData.isLandscapeBeacon=!0,r.add(c);const l=new G(new Ve(8,.18,8,48),i);l.rotation.x=Math.PI/2,l.position.set(0,15,40),l.userData.isLandscapeRing=!0,r.add(l)}function sv(r,e,t,n,i=!1){if(i){const a=new G(new Ae(5,5.8,.3,10),e);a.position.set(9,.65,40),r.add(a);const h=new G(new kt(1.65,8,8),t);h.position.set(9,4.8,40),h.userData.isLandscapeBeacon=!0,r.add(h);const u=new G(new Ve(3.7,.13,8,40),n);u.rotation.x=Math.PI/2.4,u.position.set(9,5,40),u.userData.isLandscapeRing=!0,r.add(u);return}const s=new G(new Ae(12,14,.55,8),e);s.position.set(0,1.1,40),r.add(s);const o=new G(new kt(3.2,16,8),t);o.position.set(0,9.5,40),o.userData.isLandscapeBeacon=!0,r.add(o);const c=new G(new Ve(8,.2,8,48),n);c.rotation.x=Math.PI/2.4,c.position.set(0,9,40),c.userData.isLandscapeRing=!0,r.add(c);const l=c.clone();l.rotation.x=-Math.PI/3,l.rotation.z=Math.PI/5,r.add(l)}function rv(r,e,t,n,i,s=!1){const o=new G(new ve(30,.55,18),e);o.position.set(0,1,38),r.add(o);for(const c of[-12,0,12]){const l=new G(new ve(8,.42,5.5),t);l.position.set(c,2,35),r.add(l);const a=new G(new kt(5.7,2.8,4),n);a.position.set(c,5.1,35),a.rotation.y=Math.PI/4,a.userData.isLandscapeBeacon=!0,r.add(a)}if(!s){const c=new G(new ve(13,13,2.2),t);c.position.set(0,7.2,49),r.add(c);const l=new G(new ve(10.5,8.5,.22),n);l.position.set(0,7.4,47.8),l.userData.isLandscapeBeacon=!0,r.add(l);for(let a=-3;a<=3;a++){const h=new G(new ve(7.5,.08,.12),i);h.position.set(0,5+a*1.15,47.62),h.userData.isLandscapeRing=!0,r.add(h)}}}function ov(r,e,t,n,i){const s=new G(new ve(20,1,14),e);s.position.set(0,1.2,38),r.add(s);const o=new G(new Ae(5.5,7,16,8),t);o.position.set(0,9.5,38),r.add(o);const c=new G(new kt(8,5,8),n);c.position.set(0,20,38),c.userData.isLandscapeBeacon=!0,r.add(c);const l=new G(new Ve(7,.18,8,40,Math.PI),i);l.rotation.z=Math.PI,l.position.set(0,11,30),l.userData.isLandscapeRing=!0,r.add(l)}const av={high:{pixelRatio:2,grass:7e3,reflectors:3,reflectRes:512,reflectDist:300,shadowMap:2048,bloom:!0,bloomScale:1},med:{pixelRatio:1.5,grass:3800,reflectors:2,reflectRes:384,reflectDist:220,shadowMap:1536,bloom:!0,bloomScale:.66},low:{pixelRatio:1,grass:1600,reflectors:0,reflectRes:256,reflectDist:160,shadowMap:1024,bloom:!1,bloomScale:.5}};function cv(){var s;if(typeof window>"u")return"med";const r=((s=window.matchMedia)==null?void 0:s.call(window,"(pointer: coarse)").matches)??!1,e=Math.min(window.innerWidth,window.innerHeight)<540,t=navigator.hardwareConcurrency??4,n=navigator.deviceMemory??4,i=r||e;return i&&(t<=4||n<=3)?"low":i||t<=4||n<=4?"med":"high"}const lv=5,hv=new L(0,1,0),uv=new L(1,0,0);class mv{constructor(e,t){$(this,"container");$(this,"renderer");$(this,"resizeObserver");$(this,"scene");$(this,"camera");$(this,"raycaster",new A0);$(this,"pointer",new ee);$(this,"nodeGroups",new Map);$(this,"pickables",[]);$(this,"explorer");$(this,"pathGroup");$(this,"decorGroup");$(this,"waterGroup");$(this,"terrain");$(this,"terrainMaps");$(this,"readableGroundMap");$(this,"mountains");$(this,"skyDome");$(this,"grassMesh");$(this,"grassUniforms");$(this,"clouds");$(this,"unitLandscape");$(this,"dustGroup");$(this,"dustPool",[]);$(this,"lastStep",0);$(this,"sunDisc");$(this,"composer");$(this,"bloomPass");$(this,"walkPhase",0);$(this,"avatarYaw",0);$(this,"avatarLean",0);$(this,"expression","neutral");$(this,"blinkTimer",2);$(this,"blink",0);$(this,"usingGlb",!1);$(this,"mixer");$(this,"glbIdle");$(this,"glbWalk");$(this,"glbClips");$(this,"glbEmoting",!1);$(this,"_n",new L);$(this,"_fwd",new L);$(this,"_right",new L);$(this,"_basis",new Ke);$(this,"_q",new rn);$(this,"_leanQ",new rn);$(this,"sun");$(this,"hemi");$(this,"ambientLight");$(this,"animId",0);$(this,"paused",!0);$(this,"pausedBeforeVisibility",!0);$(this,"spectatorMode",!1);$(this,"clock",new wx);$(this,"_fpsTs",0);$(this,"_fpsFrames",0);$(this,"_fpsAdapted",!1);$(this,"nodes",[]);$(this,"currentId","");$(this,"onNodeClick");$(this,"onProximity");$(this,"onExploreUpdate");$(this,"onPickupNear");$(this,"onPickupCollect");$(this,"waterMeshes",[]);$(this,"reflectors",[]);$(this,"quality",cv());$(this,"qcfg",av[this.quality]);$(this,"dynamicLightLimit",this.quality==="low"?5:this.quality==="med"?8:12);$(this,"dynamicLightBudgetFrames",30);$(this,"_lightPosition",new L);$(this,"rebuildToken",0);$(this,"player",new z1);$(this,"explorerCam",new O1);$(this,"nearNode",null);$(this,"currentBiome",Ac);$(this,"activeUnitId");$(this,"activeWorldId");$(this,"activeWorldTitle");$(this,"pickupGroup");$(this,"pickupMeshes",new Map);$(this,"pickupData",[]);$(this,"nearPickup",null);$(this,"lastExploreUpdateAt",0);$(this,"waterFrame",0);$(this,"onVisibilityChange",()=>{if(document.hidden){this.pausedBeforeVisibility=this.paused,this.pause();return}this.pausedBeforeVisibility||this.resume()});$(this,"onKeyDown",e=>{this.paused||(e.key.toLowerCase()==="e"||e.key==="Enter")&&this.tryInteract()});$(this,"onPointerDown",e=>{var s;if(this.paused)return;const t=this.renderer.domElement.getBoundingClientRect();this.pointer.x=(e.clientX-t.left)/t.width*2-1,this.pointer.y=-((e.clientY-t.top)/t.height)*2+1,this.raycaster.setFromCamera(this.pointer,this.camera);const n=this.raycaster.intersectObjects(this.pickables,!1)[0],i=n==null?void 0:n.object.userData.nodeId;if(i&&((s=this.nearNode)==null?void 0:s.id)===i&&this.nearNode.unlocked){this.onNodeClick(i);return}if(this.terrain){const o=this.raycaster.intersectObject(this.terrain,!1)[0];if(o&&(this.player.setMoveTarget(o.point.x,o.point.z),i)){const c=this.nodes.find(l=>l.id===i);c!=null&&c.unlocked&&this.player.setMoveTarget(c.x+3,c.z+3)}}});$(this,"onResize",()=>{var n;const e=this.container.clientWidth,t=this.container.clientHeight;!e||!t||(this.camera.aspect=e/t,this.camera.updateProjectionMatrix(),this.renderer.setSize(e,t),(n=this.composer)==null||n.setSize(e,t))});$(this,"animate",e=>{var o,c,l;if(this.paused){this.animId=0;return}this.animId=requestAnimationFrame(this.animate),this.clock.update(e);const t=Math.min(this.clock.getDelta(),.05),n=this.clock.getElapsed();if(!this._fpsAdapted){this._fpsFrames++;const a=performance.now();if(this._fpsTs===0&&(this._fpsTs=a),a-this._fpsTs>=3e3){if(this._fpsFrames/((a-this._fpsTs)/1e3)<40){const u=this.renderer.getPixelRatio(),f=Math.max(.75,u-.5);f<u&&(this.renderer.setPixelRatio(f),(o=this.composer)==null||o.setPixelRatio(f)),this._fpsAdapted=!0}this._fpsTs=a,this._fpsFrames=0}}this.mixer&&this.mixer.update(t);const i=this.explorerCam.update(this.camera,this.player.position,this.player.yaw,t);if(this.player.update(t,i),this.explorer){this.explorer.position.lerp(this.player.position,1-Math.exp(-14*t));let a=this.player.yaw-this.avatarYaw;for(;a>Math.PI;)a-=Math.PI*2;for(;a<-Math.PI;)a+=Math.PI*2;this.avatarYaw+=a*Math.min(1,t*12);const h=this.player.isMoving(),u=this.player.isSprinting();if(h){this.walkPhase+=t*(u?15:9.5);const w=Math.floor(this.walkPhase/Math.PI);if(w!==this.lastStep){this.lastStep=w;const M=w%2===0?1:-1,T=Math.cos(this.avatarYaw)*.18*M,R=-Math.sin(this.avatarYaw)*.18*M;this.emitDust(this.player.position.x+T,this.player.position.y,this.player.position.z+R)}}const f=this.explorer.userData.rig;if(f){if(h){const w=u?.95:.6,M=u?1.35:.95,T=Math.sin(this.walkPhase),R=Math.sin(this.walkPhase+Math.PI);f.leftLeg.hip.rotation.x=T*w,f.rightLeg.hip.rotation.x=R*w,f.leftLeg.knee.rotation.x=.12+Math.max(0,-T)*M,f.rightLeg.knee.rotation.x=.12+Math.max(0,-R)*M,f.leftArm.rotation.x=-T*.8,f.rightArm.rotation.x=-R*.8,f.head.rotation.z=0,f.cape.rotation.x=-.18-(.32+Math.abs(Math.sin(this.walkPhase))*.18)*(u?1.3:1),f.cape.rotation.z=Math.sin(this.walkPhase*.5)*.08}else{const w=Math.min(1,t*9);f.leftLeg.hip.rotation.x*=1-w,f.rightLeg.hip.rotation.x*=1-w,f.leftLeg.knee.rotation.x+=(.06-f.leftLeg.knee.rotation.x)*w,f.rightLeg.knee.rotation.x+=(.06-f.rightLeg.knee.rotation.x)*w,f.leftArm.rotation.x*=1-w,f.rightArm.rotation.x*=1-w,f.head.rotation.z=Math.sin(n*1.4)*.05,f.cape.rotation.x+=(-.2-f.cape.rotation.x)*w,f.cape.rotation.z+=(Math.sin(n*1.1)*.04-f.cape.rotation.z)*w}this.updateFace(f,t)}if(this.usingGlb&&this.glbWalk&&this.glbIdle&&!this.glbEmoting){const w=this.glbWalk.getEffectiveWeight(),M=w+((h?1:0)-w)*Math.min(1,t*6);this.glbWalk.setEffectiveWeight(M),this.glbIdle.setEffectiveWeight(1-M)}const _=h?u?.14:.05:0;this.avatarLean+=(_-this.avatarLean)*Math.min(1,t*8);const p=this.explorer.position.x,g=this.explorer.position.z,d=1.6,m=Bt(p-d,g,Ft),x=Bt(p+d,g,Ft),v=Bt(p,g-d,Ft),y=Bt(p,g+d,Ft);this._n.set(m-x,2*d,v-y).normalize(),this._n.lerp(hv,.55).normalize(),this._fwd.set(Math.sin(this.avatarYaw),0,Math.cos(this.avatarYaw)),this._fwd.addScaledVector(this._n,-this._fwd.dot(this._n)).normalize(),this._right.crossVectors(this._n,this._fwd).normalize(),this._fwd.crossVectors(this._right,this._n).normalize(),this._basis.makeBasis(this._right,this._n,this._fwd),this._q.setFromRotationMatrix(this._basis),this._leanQ.setFromAxisAngle(uv,this.avatarLean),this._q.multiply(this._leanQ),this.explorer.quaternion.slerp(this._q,1-Math.exp(-12*t));const b=h?Math.abs(Math.sin(this.walkPhase))*.06:Math.sin(n*1.4)*.01;this.explorer.position.y=this.player.position.y+b;const S=this.explorer.children.find(w=>{var M;return(M=w.userData)==null?void 0:M.isFootRing});if(S){const w=h?1+Math.sin(this.walkPhase)*.08:1;S.scale.set(w,w,w),S.material.opacity=h?.45:.28}}this.updateProximity(),this.updatePickupProximity(),this.updateDust(t),this.tickScene(n,t);const s=performance.now();(s-this.lastExploreUpdateAt>=66||this.lastExploreUpdateAt===0)&&(this.lastExploreUpdateAt=s,(l=this.onExploreUpdate)==null||l.call(this,{playerX:this.player.position.x,playerZ:this.player.position.z,playerYaw:this.player.yaw,nodes:this.nodes,nearNodeId:(c=this.nearNode)==null?void 0:c.id,pickups:this.pickupData,biome:this.minimapPalette()})),this.composer?this.composer.render():this.renderer.render(this.scene,this.camera)});this.container=e,this.onNodeClick=t.onNodeClick,this.onProximity=t.onProximity,this.onExploreUpdate=t.onExploreUpdate,this.onPickupNear=t.onPickupNear,this.onPickupCollect=t.onPickupCollect;const n=e.clientWidth||360,i=e.clientHeight||420;this.scene=new Yd,this.scene.fog=new vo(1713472,.0042),this.camera=new tn(50,n/i,.2,900),this.camera.position.set(0,8,20),this.renderer=new bx({antialias:this.quality!=="low",alpha:!1,powerPreference:"high-performance"}),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,this.qcfg.pixelRatio)),this.renderer.setSize(n,i),this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=Qs,this.renderer.toneMapping=To,this.renderer.toneMappingExposure=1.28,this.renderer.outputColorSpace=Tt,e.appendChild(this.renderer.domElement),this.explorerCam.bindDrag(this.renderer.domElement),this.buildSky(),this.buildClouds(),this.buildLights(),this.buildTerrain(),this.buildMountains(),this.buildGrass(),this.buildDust(),this.spawnExplorer(),this.setupPostFX(n,i),this.bindEvents()}setupPostFX(e,t){if(!this.qcfg.bloom){this.composer=void 0;return}try{const n=new Lx(this.renderer);n.addPass(new Dx(this.scene,this.camera));const i=this.qcfg.bloomScale,s=new Es(new ee(e*i,t*i),.62,.5,.78);n.addPass(s),n.addPass(new Nx),n.setPixelRatio(Math.min(window.devicePixelRatio,this.qcfg.pixelRatio)),n.setSize(e,t),this.composer=n,this.bloomPass=s}catch{this.composer=void 0}}setNodes(e,t,n=!0){if(this.nodes=e,this.currentId=t,this.rebuildPath(),this.rebuildDecor(),n)this.rebuildNodesAsync();else{this.rebuildToken++;for(const i of this.nodeGroups.values())this.scene.remove(i),Is(i);this.nodeGroups.clear(),this.pickables=[]}this.teleportToNode(t),this.updateDynamicLightBudget(!0)}resume(){this.paused&&(this.paused=!1,this.player.setEnabled(!this.spectatorMode),this.onResize(),this.animId||this.animate())}pause(){this.paused=!0,this.player.setEnabled(!1),this.animId&&(cancelAnimationFrame(this.animId),this.animId=0)}setSpectatorMode(e){this.spectatorMode=e,this.player.setStickInput(0,0),this.player.setEnabled(!e&&!this.paused),this.explorer&&(this.explorer.visible=!e)}tryInteract(){var e,t;return this.nearPickup?((e=this.onPickupCollect)==null||e.call(this,this.nearPickup.id),!0):(t=this.nearNode)!=null&&t.unlocked?(this.onNodeClick(this.nearNode.id),!0):!1}setStickInput(e,t){this.player.setStickInput(e,t)}setBiome(e){this.activeUnitId=e,this.activeWorldId=void 0,this.activeWorldTitle=void 0;const t=V1(e);this.currentBiome=t,this.grassMesh&&(this.grassMesh.visible=t.decorStyle!=="space"),this.applyBiomeToSky(t),this.applyBiomeToLights(t),this.applyBiomeToTerrain(t,!1),this.applyOutfitFromBiome(t),this.scene.fog=new vo(t.fogColor,t.fogDensity)}setSubWorld(e,t){if(!(this.activeWorldId===e&&this.activeWorldTitle===t)&&(this.activeWorldId=e,this.activeWorldTitle=t,this.applyBiomeToTerrain(this.currentBiome,zt(e)),this.applySunDiscScale(zt(e)),this.grassMesh&&(this.grassMesh.visible=this.currentBiome.decorStyle!=="space"&&!zt(e)),this.bloomPass&&(this.bloomPass.strength=zt(e)?.2:gn.clamp(.5+(1.5-this.currentBiome.sunIntensity)*.28,.45,1.05)),this.activeUnitId&&this.nodes.length>0&&(this.rebuildUnitLandscape(),zt(e)))){const n=this.nodes.find(i=>i.id===this.currentId)??this.nodes[0];if(n){const i=Bt(n.x,n.z,Ft);this.player.yaw=0,this.player.setPosition(n.x,i,n.z+2.5),this.avatarYaw=0,this.explorerCam.resetBehind(0)}}}setOutfitAccent(e){var n;const t=(n=this.explorer)==null?void 0:n.userData.rig;if(t){t.mats.trim.color.setHex(e),t.mats.trim.emissive.setHex(e).multiplyScalar(.4),t.mats.cape.color.setHex(e),t.mats.cape.emissive.setHex(e).multiplyScalar(.35);return}this.usingGlb&&this.explorer&&this.explorer.traverse(i=>{const s=i,o=s.material;s.isMesh&&o&&"emissive"in o&&o.emissive.setHex(e).multiplyScalar(.45)})}setExpression(e){this.expression=e,this.usingGlb&&this.playGlbEmote(e)}playGlbEmote(e){var o;if(!this.mixer||!this.glbClips||!this.glbIdle)return;const t=e==="happy"?"Wave":e==="surprised"?"Jump":null;if(!t){this.glbEmoting=!1,this.glbIdle.reset().fadeIn(.3).play();return}const n=this.glbClips.find(c=>c.name===t);if(!n)return;const i=this.mixer.clipAction(n);i.setLoop(xu,1),i.clampWhenFinished=!1,i.reset().play(),(o=this.glbWalk)==null||o.setEffectiveWeight(0),this.glbIdle.crossFadeTo(i,.2,!1),this.glbEmoting=!0;const s=c=>{var l;c.action===i&&(this.glbEmoting=!1,i.crossFadeTo(this.glbIdle.reset().play(),.3,!1),(l=this.mixer)==null||l.removeEventListener("finished",s))};this.mixer.addEventListener("finished",s)}applyOutfitFromBiome(e){this.setOutfitAccent(e.crystalColor)}minimapPalette(){const e=this.currentBiome,[t,n,i]=e.terrainTint,s=Math.round(t*255)<<16|Math.round(n*255)<<8|Math.round(i*255),o=Math.min(255,Math.round(t*255)+70)<<16|Math.min(255,Math.round(n*255)+80)<<8|Math.min(255,Math.round(i*255)+60);return{ground:s,highland:o,path:e.pathColor}}updateGrassLOD(){const e=this.grassMesh;if(!(e!=null&&e.userData.grassPositions))return;const t=(e.userData.lodFrame??0)+1;if(e.userData.lodFrame=t,t%30!==0)return;const n=e.userData.grassPositions,i=e.userData.grassScales,s=e.count,o=this.player.position.x,c=this.player.position.z,l=4225,a=new bt;let h=!1;for(let u=0;u<s;u++){const f=n[u*3]-o,_=n[u*3+2]-c,p=f*f+_*_<l,g=i[u],d=p?1:0;if(g!==d){if(i[u]=d,e.getMatrixAt(u,a.matrix),a.matrix.decompose(a.position,a.quaternion,a.scale),d===0)a.scale.setScalar(0);else{const m=.7+Math.abs(n[u*3]*7919+n[u*3+2]*3571)%1e3/1e3*1.2;a.scale.set(m,.8+Math.abs(n[u*3+1]*6271)%1e3/1e3,m)}a.updateMatrix(),e.setMatrixAt(u,a.matrix),h=!0}}h&&(e.instanceMatrix.needsUpdate=!0)}disposeReflectors(){for(const e of this.reflectors)e.getRenderTarget().dispose(),e.geometry.dispose(),e.material.dispose();this.reflectors=[]}updateFace(e,t){this.blinkTimer-=t,this.blinkTimer<=0&&(this.blink=1,this.blinkTimer=2.4+Math.random()*3.2),this.blink=Math.max(0,this.blink-t*9);const n=1-this.blink*.85;e.eyeL.scale.y=n,e.eyeR.scale.y=n;const i=this.nearNode||this.nearPickup?"happy":this.expression;let s=.37,o=1,c=1,l=.2;i==="happy"?(s=.39,o=1.5,c=.85,l=.188):i==="surprised"&&(s=.42,o=.7,c=2.4,l=.192);const a=Math.min(1,t*8);e.brow.position.y+=(s-e.brow.position.y)*a,e.mouth.scale.x+=(o-e.mouth.scale.x)*a,e.mouth.scale.y+=(c-e.mouth.scale.y)*a,e.mouth.position.y+=(l-e.mouth.position.y)*a}setPickups(e){this.pickupData=e,this.rebuildPickups()}markPickupCollected(e){var i,s;const t=this.pickupData.find(o=>o.id===e);t&&(t.collected=!0);const n=this.pickupMeshes.get(e);n&&(n.userData.dying=!0,n.userData.dieTimer=0),((i=this.nearPickup)==null?void 0:i.id)===e&&(this.nearPickup=null,(s=this.onPickupNear)==null||s.call(this,null))}tryCollectPickup(){var e;return this.nearPickup?((e=this.onPickupCollect)==null||e.call(this,this.nearPickup.id),!0):!1}dispose(){var e,t,n,i,s,o,c,l;if(cancelAnimationFrame(this.animId),this.animId=0,this.renderer.domElement.removeEventListener("pointerdown",this.onPointerDown),window.removeEventListener("keydown",this.onKeyDown),window.removeEventListener("resize",this.onResize),document.removeEventListener("visibilitychange",this.onVisibilityChange),(e=this.resizeObserver)==null||e.disconnect(),this.player.dispose(),$t(this.scene,this.pathGroup),$t(this.scene,this.decorGroup),$t(this.scene,this.waterGroup),$t(this.scene,this.mountains),$t(this.scene,this.clouds),$t(this.scene,this.unitLandscape),$t(this.scene,this.explorer),this.removePickupGroup(),this.grassMesh&&(this.scene.remove(this.grassMesh),this.grassMesh.geometry.dispose(),this.grassMesh.material.dispose()),this.sunDisc&&(this.scene.remove(this.sunDisc),(t=this.sunDisc.material.map)==null||t.dispose(),this.sunDisc.material.dispose()),this.dustGroup){this.scene.remove(this.dustGroup);const a=(n=this.dustPool[0])==null?void 0:n.material;(i=a==null?void 0:a.map)==null||i.dispose();for(const h of this.dustPool)h.material.dispose();this.dustPool=[]}this.disposeReflectors(),(s=this.mixer)==null||s.stopAllAction(),(o=this.composer)==null||o.dispose();for(const a of this.nodeGroups.values())Is(a);if(this.pickupMeshes.clear(),this.terrain){this.terrain.geometry.dispose();const a=this.terrain.material;for(const h of new Set([a.map,this.readableGroundMap]))h==null||h.dispose();(c=a.roughnessMap)==null||c.dispose(),(l=a.normalMap)==null||l.dispose(),a.dispose()}this.skyDome&&(this.skyDome.geometry.dispose(),this.skyDome.material.dispose()),this.renderer.dispose(),this.renderer.domElement.remove()}spawnExplorer(){$t(this.scene,this.explorer),this.explorer=F1(),this.scene.add(this.explorer),this.explorer.visible=!this.spectatorMode,this.applyOutfitFromBiome(this.currentBiome),this.tryLoadGlbAvatar()}async tryLoadGlbAvatar(){var e;try{const t=await cf(),n=(e=t==null?void 0:t.world)==null?void 0:e.avatar;if(!t||!n)return;const i=await x1(n.file,n,t);if(!i)return;if($t(this.scene,this.explorer),this.explorer=i.group,this.explorer.position.copy(this.player.position),this.explorer.quaternion.setFromEuler(new li(0,this.avatarYaw,0)),this.scene.add(this.explorer),this.usingGlb=!0,i.clips.length){this.mixer=new E0(this.explorer),this.glbClips=i.clips;const s=i.clips.find(c=>/idle|stand|breath/i.test(c.name))??i.clips[0];this.glbIdle=this.mixer.clipAction(s),this.glbIdle.play();const o=i.clips.find(c=>/walk|run|move/i.test(c.name));o&&(this.glbWalk=this.mixer.clipAction(o),this.glbWalk.play(),this.glbWalk.setEffectiveWeight(0))}}catch{}}teleportToNode(e){const t=this.nodes.find(i=>i.id===e)??this.nodes[0];if(!t)return;const n=Bt(t.x,t.z,Ft);this.player.yaw=0,this.player.setPosition(t.x+4,n,t.z-8),this.explorer&&(this.explorer.position.copy(this.player.position),this.explorer.rotation.set(0,this.player.yaw,0),this.explorer.quaternion.setFromEuler(this.explorer.rotation)),this.avatarYaw=this.player.yaw,this.avatarLean=0,this.explorerCam.resetBehind(this.player.yaw),this.camera.position.set(t.x+10,n+7,t.z-16),this.camera.lookAt(t.x,n+1.5,t.z)}buildSky(){const e=new Yt({side:Zt,depthWrite:!1,uniforms:{topColor:{value:new Se(3824266)},midColor:{value:new Se(5929642)},bottomColor:{value:new Se(659488)},offset:{value:22},exponent:{value:.52}},vertexShader:`
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
      `});this.skyDome=new G(new re(560,48,32),e),this.scene.add(this.skyDome);const t=new Float32Array(2e3*3),n=ti(42);for(let o=0;o<2e3;o++){const c=300+n()*80,l=n()*Math.PI*2,a=n()*Math.PI*.45;t[o*3]=c*Math.sin(a)*Math.cos(l),t[o*3+1]=c*Math.cos(a)+30,t[o*3+2]=c*Math.sin(a)*Math.sin(l)+di}const i=new Et;i.setAttribute("position",new It(t,3)),this.scene.add(new Pu(i,new Qc({color:15265528,size:.42,transparent:!0,opacity:.82,sizeAttenuation:!0})));const s=new Si({map:this.makeGlowTexture(),color:16773320,transparent:!0,depthWrite:!1,blending:rr,fog:!1});this.sunDisc=new Ii(s),this.sunDisc.scale.set(52,52,1),this.scene.add(this.sunDisc)}makeGlowTexture(){const t=document.createElement("canvas");t.width=t.height=256;const n=t.getContext("2d"),i=n.createRadialGradient(256/2,256/2,0,256/2,256/2,256/2);i.addColorStop(0,"rgba(255,255,255,1)"),i.addColorStop(.18,"rgba(255,245,210,0.95)"),i.addColorStop(.5,"rgba(255,210,140,0.35)"),i.addColorStop(1,"rgba(255,200,120,0)"),n.fillStyle=i,n.fillRect(0,0,256,256);const s=new oi(t);return s.colorSpace=Tt,s}buildDust(){const e=this.makeCloudTexture(),t=new gt;for(let n=0;n<28;n++){const i=new Si({map:e,color:13483942,transparent:!0,opacity:0,depthWrite:!1}),s=new Ii(i);s.visible=!1,s.userData={life:0,vx:0,vy:0,vz:0},t.add(s),this.dustPool.push(s)}this.dustGroup=t,this.scene.add(t)}emitDust(e,t,n){let i=0;for(const s of this.dustPool){if(s.userData.life>0)continue;s.position.set(e+(Math.random()-.5)*.2,t+.05,n+(Math.random()-.5)*.2),s.userData.life=1,s.userData.vx=(Math.random()-.5)*.6,s.userData.vy=.3+Math.random()*.45,s.userData.vz=(Math.random()-.5)*.6;const o=.3+Math.random()*.2;if(s.scale.set(o,o,1),s.visible=!0,s.material.opacity=.5,++i>=3)break}}updateDust(e){for(const t of this.dustPool){const n=t.userData.life;if(n<=0)continue;const i=n-e*1.4;if(t.userData.life=i,i<=0){t.visible=!1;continue}t.userData.vy=t.userData.vy-e*.6,t.position.x+=t.userData.vx*e,t.position.y+=t.userData.vy*e,t.position.z+=t.userData.vz*e,t.material.opacity=i*.5;const s=(1.3-i)*.6+.3;t.scale.set(s,s,1)}}buildLights(){this.hemi=new s0(13164799,2373672,.72),this.scene.add(this.hemi),this.ambientLight=new c0(10137804,.32),this.scene.add(this.ambientLight),this.sun=new Mc(16774368,1.45),this.sun.position.set(55,72,35),this.sun.castShadow=!0,this.sun.shadow.mapSize.set(this.qcfg.shadowMap,this.qcfg.shadowMap);const e=this.sun.shadow.camera;e.near=8,e.far=340,e.left=e.bottom=-150,e.right=e.top=150,this.sun.shadow.bias=-35e-5,this.scene.add(this.sun);const t=new Mc(9221375,.5);t.position.set(-40,28,-30);const n=new vn(10864895,.55,160);n.position.set(-35,28,di),n.userData.isGlobalLight=!0,this.scene.add(t,n)}updateDynamicLightBudget(e=!1){if(!e&&++this.dynamicLightBudgetFrames<30)return;this.dynamicLightBudgetFrames=0;const t=[];this.scene.traverse(n=>{const i=n;if(i.userData.isGlobalLight||!i.isLight||!i.isPointLight&&!i.isSpotLight)return;const s=i;s.getWorldPosition(this._lightPosition),t.push({light:s,distance:this._lightPosition.distanceToSquared(this.player.position)})}),t.sort((n,i)=>n.distance-i.distance);for(let n=0;n<t.length;n++)t[n].light.visible=n<this.dynamicLightLimit}applyBiomeToSky(e){if(!this.skyDome)return;const t=this.skyDome.material;t.uniforms.topColor.value.setHex(e.skyTop),t.uniforms.midColor.value.setHex(e.skyMid),t.uniforms.bottomColor.value.setHex(e.skyBot),t.needsUpdate=!0}applyBiomeToLights(e){this.hemi&&(this.hemi.color.setHex(e.hemiSky),this.hemi.groundColor.setHex(e.hemiGround)),this.ambientLight&&this.ambientLight.color.setHex(e.ambientColor),this.sun&&(this.sun.color.setHex(e.sunColor),this.sun.intensity=e.sunIntensity),this.sunDisc&&(this.sunDisc.material.color.setHex(e.sunColor),this.applySunDiscScale(zt(this.activeWorldId))),this.bloomPass&&(this.bloomPass.strength=gn.clamp(.5+(1.5-e.sunIntensity)*.28,.45,1.05))}applySunDiscScale(e){if(!this.sunDisc)return;const t=e?this.currentBiome.sunFocusedDiscScale??this.currentBiome.sunDiscScale??52:this.currentBiome.sunDiscScale??52;this.sunDisc.scale.set(t,t,1)}applyBiomeToTerrain(e,t){if(!this.terrain)return;const[n,i,s]=e.terrainTint,o=this.terrain.material,c=this.readableGroundMap??null,l=o.map!==c||o.vertexColors;o.map=c,o.vertexColors=!1,t?(o.color.setRGB(gn.clamp(.28+n*.34,.26,.48),gn.clamp(.28+i*.34,.26,.46),gn.clamp(.29+s*.32,.27,.44)),o.roughness=.94,o.metalness=.02):(o.color.setRGB(gn.clamp(.27+n*.8,.28,.58),gn.clamp(.28+i*.62,.3,.58),gn.clamp(.29+s*.72,.3,.6)),o.roughness=.9,o.metalness=.02),l&&(o.needsUpdate=!0)}rebuildPickups(){this.removePickupGroup(),this.pickupMeshes.clear(),this.pickupGroup=new gt;for(const e of this.pickupData){if(e.collected)continue;const t=this.createPickupOrb(e);this.pickupGroup.add(t),this.pickupMeshes.set(e.id,t)}this.scene.add(this.pickupGroup),this.updateDynamicLightBudget(!0)}createPickupOrb(e){const t=this.currentBiome,n=new gt;n.position.set(e.x,e.y,e.z),n.userData.pickupId=e.id;const i=new _e({color:t.orbColor,emissive:new Se(t.orbColor),emissiveIntensity:1.8,roughness:.1,metalness:.4,transparent:!0,opacity:.92}),s=new G(new re(.32,14,10),i);s.userData.isOrbCore=!0,n.add(s);const o=new Ot({color:t.glowColor,transparent:!0,opacity:.22,side:Zt,depthWrite:!1}),c=new G(new re(.58,12,8),o);c.userData.isOrbGlow=!0,n.add(c);const l=new Ve(.52,.04,6,24),a=new Ot({color:t.orbColor,transparent:!0,opacity:.55,depthWrite:!1}),h=new G(l,a);h.userData.isOrbRing=!0,h.rotation.x=Math.PI/3,n.add(h);const u=new vn(t.glowColor,.6,8);u.userData.isOrbLight=!0,n.add(u);const f=this.createWordSprite(e.word,t.orbColor);return f.position.y=1.1,f.userData.isWordSprite=!0,n.add(f),n.userData.baseY=e.y,n.userData.pickupId=e.id,n}createWordSprite(e,t){var h;const i=`#${new Se(t).getHexString()}`,s=document.createElement("canvas");s.width=256,s.height=64;const o=s.getContext("2d");o.clearRect(0,0,256,64),o.fillStyle="rgba(0,0,0,0.52)",(h=o.roundRect)==null||h.call(o,4,8,248,48,12),o.fill(),o.font="bold 26px 'Arial', sans-serif",o.fillStyle=i,o.textAlign="center",o.textBaseline="middle",o.shadowColor=i,o.shadowBlur=8,o.fillText(e,128,34);const c=new oi(s),l=new Si({map:c,transparent:!0,depthWrite:!1}),a=new Ii(l);return a.scale.set(2.4,.6,1),a}disposePickupResources(e){Is(e)}removePickupGroup(){this.pickupGroup&&(this.scene.remove(this.pickupGroup),this.disposePickupResources(this.pickupGroup),this.pickupGroup=void 0)}buildTerrain(){const e=new hn(Kn.width,Kn.depth,Ml.w,Ml.d);e.rotateX(-Math.PI/2);const t=e.attributes.position;for(let n=0;n<t.count;n++){const i=t.getX(n),s=t.getZ(n),o=Ft(i,s);t.setY(n,o)}e.computeVertexNormals(),this.terrainMaps=H1(),this.readableGroundMap=W1(),this.terrain=new G(e,new _e({color:16777215,map:this.readableGroundMap,roughnessMap:this.terrainMaps.roughness,normalMap:this.terrainMaps.normal,normalScale:new ee(.85,.85),vertexColors:!1,roughness:.82,metalness:.06})),this.terrain.receiveShadow=!0,this.terrain.position.set(0,Rf,di),this.scene.add(this.terrain),this.applyBiomeToTerrain(this.currentBiome,!1)}buildMountains(){$t(this.scene,this.mountains);const e=new gt,t=ti(7),n=Math.max(Kn.width,Kn.depth)*.5,i=this.quality==="low"?18:this.quality==="med"?24:30,s=this.quality!=="low";for(let o=0;o<i;o++){const c=o/i*Math.PI*2+(t()-.5)*.18,l=n+t()*40,a=Math.cos(c)*l,h=Math.sin(c)*l+di,u=42+t()*78,f=32+t()*46,_=3095634+Math.floor(t()*10)*65793,p=new _e({color:_,roughness:1,metalness:0,flatShading:!0,fog:!0}),g=new G(new kt(f,u,5+Math.floor(t()*3),1),p);if(g.position.set(a,u/2-8,h),g.rotation.y=t()*Math.PI,g.scale.set(1,.8+t()*.5,1),e.add(g),s&&u>70){const d=u*(.18+t()*.12),m=new G(new kt(f*.42,d,5,1),new _e({color:14215416,roughness:.95,metalness:0,flatShading:!0,fog:!0}));m.position.set(a,u-d*.35-8,h),m.rotation.y=g.rotation.y,e.add(m)}}this.mountains=e,this.scene.add(e)}buildGrass(){const e=b1(),t=new _e({vertexColors:!0,roughness:.9,metalness:0,side:Ct});t.onBeforeCompile=l=>{l.uniforms.uTime={value:0},l.uniforms.uPlayer={value:new L(0,0,0)},this.grassUniforms=l.uniforms,l.vertexShader=`uniform float uTime;
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
         transformed.y -= gTramp * gH * 0.4;`)};const n=this.qcfg.grass,i=new Ru(e,t,n);i.frustumCulled=!0,i.castShadow=!1,i.receiveShadow=!0;const s=ti(31337),o=new bt,c=new Float32Array(n*3);for(let l=0;l<n;l++){const a=(s()-.5)*220,h=di+(s()-.5)*Kn.depth*.9,u=Bt(a,h,Ft);c[l*3]=a,c[l*3+1]=u,c[l*3+2]=h,o.position.set(a,u,h),o.rotation.set(0,s()*Math.PI,0);const f=.7+s()*1.2;o.scale.set(f,.8+s()*1,f),o.updateMatrix(),i.setMatrixAt(l,o.matrix)}i.count=n,i.instanceMatrix.needsUpdate=!0,i.userData.grassPositions=c,i.userData.grassScales=new Float32Array(n).fill(1),i.userData.lodFrame=0,this.grassMesh=i,i.visible=this.currentBiome.decorStyle!=="space",this.scene.add(i)}buildClouds(){$t(this.scene,this.clouds);const e=this.makeCloudTexture(),t=new gt;t.position.z=di;const n=ti(5150);for(let i=0;i<18;i++){const s=new Si({map:e,transparent:!0,opacity:.42+n()*.28,depthWrite:!1,fog:!1}),o=new Ii(s),c=n()*Math.PI*2,l=130+n()*260;o.position.set(Math.cos(c)*l,86+n()*70,Math.sin(c)*l);const a=70+n()*140;o.scale.set(a,a*(.42+n()*.2),1),t.add(o)}this.clouds=t,this.scene.add(t)}makeCloudTexture(){const t=document.createElement("canvas");t.width=t.height=256;const n=t.getContext("2d");n.clearRect(0,0,256,256);for(let s=0;s<26;s++){const o=256*(.25+Math.random()*.5),c=256*(.35+Math.random()*.3),l=256*(.08+Math.random()*.18),a=n.createRadialGradient(o,c,0,o,c,l);a.addColorStop(0,"rgba(255,255,255,0.5)"),a.addColorStop(1,"rgba(255,255,255,0)"),n.fillStyle=a,n.beginPath(),n.arc(o,c,l,0,Math.PI*2),n.fill()}const i=new oi(t);return i.colorSpace=Tt,i}rebuildPath(){if($t(this.scene,this.pathGroup),this.pathGroup=new gt,this.nodes.length<2){this.scene.add(this.pathGroup);return}const e=!!this.activeUnitId,t=e?this.nodes.slice(1).map(f=>[this.nodes[0],f]):this.nodes.slice(0,-1).map((f,_)=>[f,this.nodes[_+1]]),n=this.nodes.map(f=>new L(f.x,Bt(f.x,f.z,Ft)+.45,f.z)),i=new ni(n,!1,"catmullrom",.35),s=Math.max(n.length*28,80),o=[];for(const[f,_]of t){const p=f.cleared&&_.cleared,g=Bt(f.x,f.z,Ft)+.45,d=Bt(_.x,_.z,Ft)+.45,m=new ni([new L(f.x,g,f.z),new L(_.x,d,_.z)],!1,"catmullrom",.4);if(o.push(m),!e){const x=new G(new kn(m,16,.48,12,!1),new _e({color:p?4885618:4016732,roughness:.68,metalness:.1}));x.receiveShadow=!0;const v=new G(new kn(m,16,.26,10,!1),v1(p));v.position.y=.08,this.pathGroup.add(x,v)}}const c=wa(e?2834775:7041664),l=wa(e?3493734:9147295),a=wa(e?2504779:5595246),h=[c,l,a],u=new ve(1.05,.13,.72);if(e)t.forEach(([f,_],p)=>{const g=o[p],d=Math.max(16,Math.ceil(Math.hypot(f.x-_.x,f.z-_.z)/1.6));for(let m=0;m<=d;m++){const x=m/d,v=Math.min(1,(m+.5)/d),y=g.getPoint(x);y.y=Bt(y.x,y.z,Ft)+.01;const b=g.getPoint(v),S=new G(u,h[m%h.length]);S.position.copy(y),S.lookAt(b.x,y.y,b.z),S.receiveShadow=!0,this.pathGroup.add(S)}});else for(let f=0;f<=s;f++){const _=f/s,p=Math.min(1,(f+.5)/s),g=i.getPoint(_);g.y=Bt(g.x,g.z,Ft)+.01;const d=i.getPoint(p),m=new G(u,h[f%h.length]);m.position.copy(g),m.lookAt(d.x,g.y,d.z),m.receiveShadow=!0,this.pathGroup.add(m)}if(!e){const f=y1("rgba(255,220,140,1)"),_=new Ae(.055,.07,2.6,7),p=new Ae(.03,.03,.8,5),g=new re(.14,8,6),d=M1(),m=S1(16769152);for(let x=0;x<this.nodes.length;x+=Math.max(1,Math.floor(this.nodes.length/8))){const v=this.nodes[x],y=Math.min(1,(x+.5)/Math.max(1,this.nodes.length-1)),b=i.getTangent(y),S=new L(-b.z,0,b.x).normalize();for(const w of[-1,1]){const M=v.x+S.x*2.2*w,T=v.z+S.z*2.2*w,R=Bt(M,T,Ft),P=new G(_,d);P.position.set(M,R+1.3,T),P.castShadow=!0;const D=new G(p,d);D.rotation.z=Math.PI/2,D.position.set(M+.4*w*-1,R+2.55,T);const U=new G(g,m);U.position.set(M+.8*w*-1,R+2.55,T);const k=new Ii(new Si({map:f,transparent:!0,opacity:.7,depthWrite:!1,blending:rr}));k.scale.setScalar(1.8),k.position.set(M+.8*w*-1,R+2.6,T),this.pathGroup.add(P,D,U,k)}}}this.scene.add(this.pathGroup)}rebuildDecor(){this.disposeReflectors(),$t(this.scene,this.decorGroup),$t(this.scene,this.waterGroup),this.decorGroup=new gt,this.waterGroup=new gt,this.waterMeshes=[];const e=ti(2024),t=new Set,n=this.activeUnitId?this.nodes.find(d=>d.unlocked)??this.nodes[0]:void 0,i=!!(n&&this.activeUnitId),s=(n==null?void 0:n.x)??0,o=(n==null?void 0:n.z)??di,c=(d,m)=>!i&&this.nodes.some(x=>Math.hypot(d-(x.x+4),m-(x.z-8))<26);this.rebuildUnitLandscape();const l=i?this.quality==="low"?8:this.quality==="med"?12:18:this.quality==="low"?16:this.quality==="med"?24:34,a=i?this.quality==="low"?42:this.quality==="med"?64:92:this.quality==="low"?80:this.quality==="med"?120:180;for(const d of this.nodes){const m=ti(d.id.length*997+d.z);for(let x=0;x<l;x++){const v=m()*Math.PI*2,y=i?32+m()*22:6+m()*24,b=d.x+Math.cos(v)*y,S=d.z+Math.sin(v)*y;if(i&&Math.hypot(b-s,S-o)<25||c(b,S))continue;const w=`${Math.round(b)}_${Math.round(S)}`;if(t.has(w))continue;t.add(w);const M=Bt(b,S,Ft),T=i?.65+m()*.75:.75+m()*1.1;this.addDecorAt(i?this.currentBiome.decorStyle:d.theme,b,M,S,T,m)}}const h=ti(909),u=i?145:Kn.width*.46,f=i?190:Kn.depth*.46;for(let d=0;d<a;d++){const m=s+(h()-.5)*2*u,x=o+(h()-.5)*2*f;if(i&&Math.hypot(m-s,x-o)<25||c(m,x)||!i&&Math.abs(m)<14)continue;const v=Bt(m,x,Ft),y=.8+h()*1.5;if(i&&this.currentBiome.decorStyle==="space"){const b=so(y*.72);b.position.set(m,v+.16,x),b.rotation.set(h()*.18,h()*Math.PI*2,h()*.18),this.decorGroup.add(b)}else if(h()>.42){const b=h()>.5?nu(y):tu(y);b.position.set(m,v,x),b.rotation.y=h()*Math.PI*2,this.decorGroup.add(b)}else{const b=so(y*.85);b.position.set(m,v+.2,x),b.rotation.set(h(),h(),h()),this.decorGroup.add(b)}}const _=i&&this.currentBiome.decorStyle==="space"?0:i?2:6,p=this.qcfg.reflectors;for(let d=0;d<_;d++){const m=d%2===0?-1:1,x=s+m*(i?52+e()*18:60+e()*55),v=o-f*.8+d*(f*1.5/_)+e()*18,y=i?34+e()*14:48+e()*26,b=i?24+e()*12:30+e()*18,S=Bt(x,v,Ft)-.6;if(d<p){const M=new Co(new hn(y,b),{textureWidth:this.qcfg.reflectRes,textureHeight:this.qcfg.reflectRes,color:1918038});M.rotation.x=-Math.PI/2,M.position.set(x,S,v),this.reflectors.push(M),this.waterGroup.add(M);const T=new G(new hn(y,b,18,12),eu());T.material.opacity=.26,T.rotation.x=-Math.PI/2,T.position.set(x,S+.05,v),T.userData.isWater=!0,T.userData.baseOpacity=.26,this.waterMeshes.push(T),this.waterGroup.add(T)}else{const M=new G(new hn(y,b,16,10),eu());M.material.opacity=.82,M.rotation.x=-Math.PI/2,M.position.set(x,S+.02,v),M.userData.isWater=!0,M.userData.baseOpacity=.82,this.waterMeshes.push(M),this.waterGroup.add(M)}}const g=new G(new hn(i?u*2.2:Kn.width+40,i?f*2.2:Kn.depth+40),new Ot({color:10406143,transparent:!0,opacity:.038,depthWrite:!1}));g.rotation.x=-Math.PI/2,g.position.set(s,5,o),this.decorGroup.add(g),this.scene.add(this.decorGroup,this.waterGroup),this.updateDynamicLightBudget(!0)}rebuildUnitLandscape(){$t(this.scene,this.unitLandscape),this.unitLandscape=void 0;const e=this.activeUnitId?this.nodes.find(t=>t.unlocked)??this.nodes[0]:void 0;!e||!this.activeUnitId||(this.unitLandscape=q1(this.currentBiome,e,this.activeWorldId,this.activeWorldTitle),this.unitLandscape.position.set(e.x,Bt(e.x,e.z,Ft),e.z),this.scene.add(this.unitLandscape))}addDecorAt(e,t,n,i,s,o){if(e==="forest"||e==="plains"||e==="library"){const c=o()>.4?nu(s):tu(s*1.05);c.position.set(t,n,i),c.rotation.y=o()*Math.PI*2,this.decorGroup.add(c);return}if(e==="coast"&&o()>.45){const c=so(s*.85);c.position.set(t,n+.3,i),c.rotation.set(o(),o(),o()),this.decorGroup.add(c);return}if(o()>.5){const c=so(s*.65);c.position.set(t,n+.2,i),this.decorGroup.add(c)}if(o()>.65){const c=df(Mr(e).accent);c.position.set(t,n,i),this.decorGroup.add(c)}}async rebuildNodesAsync(){const e=++this.rebuildToken;for(const t of this.nodeGroups.values())this.scene.remove(t),Is(t);this.nodeGroups.clear(),this.pickables=[];for(const t of this.nodes){if(e!==this.rebuildToken)return;const n=new gt,i=Bt(t.x,t.z,Ft);n.position.set(t.x,i,t.z),n.userData.nodeId=t.id;const{root:s,crystal:o}=await U1(t,t.id===this.currentId);if(e!==this.rebuildToken){Is(s);return}n.add(s),o.userData.nodeId=t.id,this.pickables.push(o);const c=k1(t.name,t.unlocked);n.add(c),t.unlocked||Cf(n),this.nodeGroups.set(t.id,n),this.scene.add(n),this.updateDynamicLightBudget(!0)}}bindEvents(){this.renderer.domElement.addEventListener("pointerdown",this.onPointerDown),window.addEventListener("keydown",this.onKeyDown),window.addEventListener("resize",this.onResize),typeof ResizeObserver<"u"&&(this.resizeObserver=new ResizeObserver(this.onResize),this.resizeObserver.observe(this.container)),document.addEventListener("visibilitychange",this.onVisibilityChange)}updateProximity(){var n,i;let e=null,t=Pf;for(const s of this.nodes){if(!s.unlocked)continue;const o=this.player.position.x-s.x,c=this.player.position.z-s.z,l=Math.hypot(o,c);l<t&&(t=l,e=s)}(e==null?void 0:e.id)!==((n=this.nearNode)==null?void 0:n.id)&&(this.nearNode=e,(i=this.onProximity)==null||i.call(this,e))}updatePickupProximity(){var n,i;let e=null,t=lv;for(const s of this.pickupData){if(s.collected)continue;const o=this.player.position.x-s.x,c=this.player.position.z-s.z,l=Math.hypot(o,c);l<t&&(t=l,e=s)}(e==null?void 0:e.id)!==((n=this.nearPickup)==null?void 0:n.id)&&(this.nearPickup=e,(i=this.onPickupNear)==null||i.call(this,e))}tickScene(e,t){var l,a,h,u;if(this.updateDynamicLightBudget(),this.waterFrame++,this.sun){const f=e*.03,_=Math.sin(f)*72,p=36+Math.cos(f)*46;this.sun.position.set(_,Math.max(5,p),35);const g=gn.clamp((p+8)/90,.18,1),d=zt(this.activeWorldId);if(this.sun.intensity=this.currentBiome.sunIntensity*(d?.82+g*.18:.52+g*.38),this.renderer.toneMappingExposure=d?1.14+g*.12:1.08+g*.1,this.hemi&&(this.hemi.intensity=d?.78+g*.22:.58+g*.26),this.sunDisc){this.sunDisc.position.set(_*4.2,this.sun.position.y*4.2,this.sun.position.z*4.2+di);const m=d?this.currentBiome.sunFocusedDiscOpacity??this.currentBiome.sunDiscOpacity??1:this.currentBiome.sunDiscOpacity??1;this.sunDisc.material.opacity=gn.clamp(g*1.2*m,0,1)}}this.grassUniforms&&(this.grassUniforms.uTime.value=e,this.grassUniforms.uPlayer.value.copy(this.player.position)),this.updateGrassLOD(),this.clouds&&(this.clouds.rotation.y=e*.006),(l=this.unitLandscape)==null||l.traverse(f=>{var p,g;const _=f;if((p=_.userData)!=null&&p.isLandscapeRing&&(_.rotation.y+=t*.42),(g=_.userData)!=null&&g.isLandscapeBeacon){_.userData.landscapeBaseY===void 0&&(_.userData.landscapeBaseY=_.position.y);const d=_.userData.landscapeBaseY;_.position.y=d+Math.sin(e*1.5+_.position.x*.08)*.24}});for(const[f,_]of this.pickupMeshes){const p=((a=this.nearPickup)==null?void 0:a.id)===f,g=_.userData.baseY??_.position.y;if(_.userData.dying){_.userData.dieTimer=(_.userData.dieTimer??0)+t*1.4;const d=_.userData.dieTimer;_.scale.setScalar(1-d*.9),_.position.y=g+d*3,_.traverse(m=>{const x=m;x.material&&"opacity"in x.material&&(x.material.opacity*=.85)}),d>=1&&((h=this.pickupGroup)==null||h.remove(_),this.disposePickupResources(_),this.pickupMeshes.delete(f));continue}_.position.y=g+Math.sin(e*1.4+f.length*.5)*.28,_.traverse(d=>{var x,v,y,b,S;const m=d;if((x=m.userData)!=null&&x.isOrbCore){m.rotation.y=e*.8+f.length;const w=p?1+Math.sin(e*4)*.15:1+Math.sin(e*2)*.06;m.scale.setScalar(w);const M=m.material;M.emissiveIntensity=p?3.5+Math.sin(e*5)*.8:1.8+Math.sin(e*2)*.3}if((v=m.userData)!=null&&v.isOrbGlow&&(m.material.opacity=p?.42+Math.sin(e*3)*.15:.18+Math.sin(e*1.5)*.06),(y=m.userData)!=null&&y.isOrbRing&&(m.rotation.z=e*1.2+f.length*.3,m.rotation.x=Math.PI/3+Math.sin(e*.5)*.2,m.material.opacity=p?.8:.45),(b=m.userData)!=null&&b.isOrbLight){const w=m;w.intensity=p?1.4+Math.sin(e*4)*.4:.6+Math.sin(e*2)*.1}if((S=m.userData)!=null&&S.isWordSprite){const w=m;w.material.opacity=p?1:.72+Math.sin(e*1.2)*.12}})}for(const[f,_]of this.nodeGroups){const p=((u=this.nearNode)==null?void 0:u.id)===f;_.traverse(g=>{var m,x,v,y;const d=g;if((m=d.userData)!=null&&m.isSignpost&&(d.visible=!p),(x=d.userData)!=null&&x.isCrystal&&(d.userData.baseY===void 0&&(d.userData.baseY=d.position.y),d.rotation.y=e*.6+f.length*.3,d.position.y=d.userData.baseY+Math.sin(e*1.8+f.length)*(p?.28:.15)),(v=d.userData)!=null&&v.isPulse){const b=1+Math.sin(e*3)*.08;d.scale.set(b,b,b),d.material.opacity=.35+Math.sin(e*3)*.2}(y=d.userData)!=null&&y.isDueRing&&(d.material.opacity=.28+Math.sin(e*2.4+f.length)*.18)})}const n=this.player.position.x,i=this.player.position.z,s=90,o=s*s;for(const f of this.waterMeshes){f.userData.baseY===void 0&&(f.userData.baseY=f.position.y);const _=f.userData.baseOpacity??.68,p=f.position.x-n,g=f.position.z-i,m=p*p+g*g<o;if(f.position.y=f.userData.baseY+Math.sin(e*.9+f.position.x*.03)*.04,f.material.opacity=_+Math.sin(e*.7)*Math.min(.08,_*.12),!m||this.waterFrame%2!==0)continue;const x=f.geometry,v=x.attributes.position;f.userData.flat||(f.userData.flat=Float32Array.from(v.array));const y=f.userData.flat;for(let b=0;b<v.count;b++){const S=y[b*3],w=y[b*3+1];v.setZ(b,Math.sin(S*.22+e*1.7)*.12+Math.cos(w*.27+e*1.25)*.1)}v.needsUpdate=!0,x.computeVertexNormals()}const c=this.qcfg.reflectDist*this.qcfg.reflectDist;for(const f of this.reflectors){const _=f.position.x-n,p=f.position.z-i;f.visible=_*_+p*p<c}}}export{mv as World3D};
