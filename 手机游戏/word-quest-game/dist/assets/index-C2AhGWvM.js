var Lf=Object.defineProperty;var If=(r,e,t)=>e in r?Lf(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t;var Y=(r,e,t)=>If(r,typeof e!="symbol"?e+"":e,t);import{s as $t,C as Df,a as Cl,P as Nf,b as Ft,t as It,d as Fs,r as Qt,T as Yi,c as pi,e as Rl,f as Uf,g as Er,h as Ff,i as Uo,j as Fo,I as Of}from"./index-CaWn-dB1.js";/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Uc="184",Bf=0,Pl=1,zf=2,nr=1,kf=2,$s=3,ai=0,Yt=1,St=2,Xn=0,gs=1,cr=2,Ll=3,Il=4,Gf=5,Di=100,Vf=101,Hf=102,Wf=103,Xf=104,qf=200,Yf=201,Kf=202,jf=203,La=204,Ia=205,Jf=206,Zf=207,$f=208,Qf=209,ed=210,td=211,nd=212,id=213,sd=214,Da=0,Na=1,Ua=2,vs=3,Fa=4,Oa=5,Ba=6,za=7,_u=0,rd=1,od=2,qn=0,Fc=1,Oc=2,Bc=3,Ao=4,zc=5,kc=6,Gc=7,Dl="attached",ad="detached",xu=300,zi=301,ys=302,Oo=303,Bo=304,Co=306,ki=1e3,Gn=1001,go=1002,zt=1003,vu=1004,Qs=1005,kt=1006,co=1007,Vn=1008,dn=1009,yu=1010,Mu=1011,lr=1012,Vc=1013,Yn=1014,Sn=1015,cn=1016,Hc=1017,Wc=1018,hr=1020,Su=35902,bu=35899,wu=1021,Tu=1022,bn=1023,ci=1026,Fi=1027,Xc=1028,qc=1029,Gi=1030,Yc=1031,Kc=1033,lo=33776,ho=33777,uo=33778,fo=33779,ka=35840,Ga=35841,Va=35842,Ha=35843,Wa=36196,Xa=37492,qa=37496,Ya=37488,Ka=37489,_o=37490,ja=37491,Ja=37808,Za=37809,$a=37810,Qa=37811,ec=37812,tc=37813,nc=37814,ic=37815,sc=37816,rc=37817,oc=37818,ac=37819,cc=37820,lc=37821,hc=36492,uc=36494,fc=36495,dc=36283,pc=36284,xo=36285,mc=36286,Eu=2200,cd=2201,ld=2202,ur=2300,fr=2301,zo=2302,Nl=2303,ps=2400,ms=2401,vo=2402,jc=2500,hd=2501,ud=0,Au=1,gc=2,fd=3200,_c=0,dd=1,kn="",Mt="srgb",pn="srgb-linear",yo="linear",mt="srgb",Ki=7680,Ul=519,pd=512,md=513,gd=514,Jc=515,_d=516,xd=517,Zc=518,vd=519,xc=35044,Fl="300 es",Hn=2e3,dr=2001;function yd(r){for(let e=r.length-1;e>=0;--e)if(r[e]>=65535)return!0;return!1}function Md(r){return ArrayBuffer.isView(r)&&!(r instanceof DataView)}function pr(r){return document.createElementNS("http://www.w3.org/1999/xhtml",r)}function Sd(){const r=pr("canvas");return r.style.display="block",r}const Ol={};function Mo(...r){const e="THREE."+r.shift();console.log(e,...r)}function Cu(r){const e=r[0];if(typeof e=="string"&&e.startsWith("TSL:")){const t=r[1];t&&t.isStackTrace?r[0]+=" "+t.getLocation():r[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return r}function ze(...r){r=Cu(r);const e="THREE."+r.shift();{const t=r[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...r)}}function Xe(...r){r=Cu(r);const e="THREE."+r.shift();{const t=r[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...r)}}function vc(...r){const e=r.join(" ");e in Ol||(Ol[e]=!0,ze(...r))}function bd(r,e,t){return new Promise(function(n,i){function s(){switch(r.clientWaitSync(e,r.SYNC_FLUSH_COMMANDS_BIT,0)){case r.WAIT_FAILED:i();break;case r.TIMEOUT_EXPIRED:setTimeout(s,t);break;default:n()}}setTimeout(s,t)})}const wd={[Da]:Na,[Ua]:Ba,[Fa]:za,[vs]:Oa,[Na]:Da,[Ba]:Ua,[za]:Fa,[Oa]:vs};class Ei{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){const n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){const n=this._listeners;if(n===void 0)return;const i=n[e];if(i!==void 0){const s=i.indexOf(t);s!==-1&&i.splice(s,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const n=t[e.type];if(n!==void 0){e.target=this;const i=n.slice(0);for(let s=0,o=i.length;s<o;s++)i[s].call(this,e);e.target=null}}}const jt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let Bl=1234567;const ir=Math.PI/180,Ms=180/Math.PI;function wn(){const r=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(jt[r&255]+jt[r>>8&255]+jt[r>>16&255]+jt[r>>24&255]+"-"+jt[e&255]+jt[e>>8&255]+"-"+jt[e>>16&15|64]+jt[e>>24&255]+"-"+jt[t&63|128]+jt[t>>8&255]+"-"+jt[t>>16&255]+jt[t>>24&255]+jt[n&255]+jt[n>>8&255]+jt[n>>16&255]+jt[n>>24&255]).toLowerCase()}function lt(r,e,t){return Math.max(e,Math.min(t,r))}function $c(r,e){return(r%e+e)%e}function Td(r,e,t,n,i){return n+(r-e)*(i-n)/(t-e)}function Ed(r,e,t){return r!==e?(t-r)/(e-r):0}function sr(r,e,t){return(1-t)*r+t*e}function Ad(r,e,t,n){return sr(r,e,1-Math.exp(-t*n))}function Cd(r,e=1){return e-Math.abs($c(r,e*2)-e)}function Rd(r,e,t){return r<=e?0:r>=t?1:(r=(r-e)/(t-e),r*r*(3-2*r))}function Pd(r,e,t){return r<=e?0:r>=t?1:(r=(r-e)/(t-e),r*r*r*(r*(r*6-15)+10))}function Ld(r,e){return r+Math.floor(Math.random()*(e-r+1))}function Id(r,e){return r+Math.random()*(e-r)}function Dd(r){return r*(.5-Math.random())}function Nd(r){r!==void 0&&(Bl=r);let e=Bl+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function Ud(r){return r*ir}function Fd(r){return r*Ms}function Od(r){return(r&r-1)===0&&r!==0}function Bd(r){return Math.pow(2,Math.ceil(Math.log(r)/Math.LN2))}function zd(r){return Math.pow(2,Math.floor(Math.log(r)/Math.LN2))}function kd(r,e,t,n,i){const s=Math.cos,o=Math.sin,c=s(t/2),l=o(t/2),a=s((e+n)/2),h=o((e+n)/2),u=s((e-n)/2),f=o((e-n)/2),_=s((n-e)/2),d=o((n-e)/2);switch(i){case"XYX":r.set(c*h,l*u,l*f,c*a);break;case"YZY":r.set(l*f,c*h,l*u,c*a);break;case"ZXZ":r.set(l*u,l*f,c*h,c*a);break;case"XZX":r.set(c*h,l*d,l*_,c*a);break;case"YXY":r.set(l*_,c*h,l*d,c*a);break;case"ZYZ":r.set(l*d,l*_,c*h,c*a);break;default:ze("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+i)}}function Cn(r,e){switch(e.constructor){case Float32Array:return r;case Uint32Array:return r/4294967295;case Uint16Array:return r/65535;case Uint8Array:return r/255;case Int32Array:return Math.max(r/2147483647,-1);case Int16Array:return Math.max(r/32767,-1);case Int8Array:return Math.max(r/127,-1);default:throw new Error("Invalid component type.")}}function _t(r,e){switch(e.constructor){case Float32Array:return r;case Uint32Array:return Math.round(r*4294967295);case Uint16Array:return Math.round(r*65535);case Uint8Array:return Math.round(r*255);case Int32Array:return Math.round(r*2147483647);case Int16Array:return Math.round(r*32767);case Int8Array:return Math.round(r*127);default:throw new Error("Invalid component type.")}}const Oi={DEG2RAD:ir,RAD2DEG:Ms,generateUUID:wn,clamp:lt,euclideanModulo:$c,mapLinear:Td,inverseLerp:Ed,lerp:sr,damp:Ad,pingpong:Cd,smoothstep:Rd,smootherstep:Pd,randInt:Ld,randFloat:Id,randFloatSpread:Dd,seededRandom:Nd,degToRad:Ud,radToDeg:Fd,isPowerOfTwo:Od,ceilPowerOfTwo:Bd,floorPowerOfTwo:zd,setQuaternionFromProperEuler:kd,normalize:_t,denormalize:Cn},ml=class ml{constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6],this.y=i[1]*t+i[4]*n+i[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=lt(this.x,e.x,t.x),this.y=lt(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=lt(this.x,e,t),this.y=lt(this.y,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(lt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(lt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),i=Math.sin(t),s=this.x-e.x,o=this.y-e.y;return this.x=s*n-o*i+e.x,this.y=s*i+o*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};ml.prototype.isVector2=!0;let re=ml;class ln{constructor(e=0,t=0,n=0,i=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=i}static slerpFlat(e,t,n,i,s,o,c){let l=n[i+0],a=n[i+1],h=n[i+2],u=n[i+3],f=s[o+0],_=s[o+1],d=s[o+2],g=s[o+3];if(u!==g||l!==f||a!==_||h!==d){let p=l*f+a*_+h*d+u*g;p<0&&(f=-f,_=-_,d=-d,g=-g,p=-p);let m=1-c;if(p<.9995){const x=Math.acos(p),v=Math.sin(x);m=Math.sin(m*x)/v,c=Math.sin(c*x)/v,l=l*m+f*c,a=a*m+_*c,h=h*m+d*c,u=u*m+g*c}else{l=l*m+f*c,a=a*m+_*c,h=h*m+d*c,u=u*m+g*c;const x=1/Math.sqrt(l*l+a*a+h*h+u*u);l*=x,a*=x,h*=x,u*=x}}e[t]=l,e[t+1]=a,e[t+2]=h,e[t+3]=u}static multiplyQuaternionsFlat(e,t,n,i,s,o){const c=n[i],l=n[i+1],a=n[i+2],h=n[i+3],u=s[o],f=s[o+1],_=s[o+2],d=s[o+3];return e[t]=c*d+h*u+l*_-a*f,e[t+1]=l*d+h*f+a*u-c*_,e[t+2]=a*d+h*_+c*f-l*u,e[t+3]=h*d-c*u-l*f-a*_,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,i){return this._x=e,this._y=t,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,i=e._y,s=e._z,o=e._order,c=Math.cos,l=Math.sin,a=c(n/2),h=c(i/2),u=c(s/2),f=l(n/2),_=l(i/2),d=l(s/2);switch(o){case"XYZ":this._x=f*h*u+a*_*d,this._y=a*_*u-f*h*d,this._z=a*h*d+f*_*u,this._w=a*h*u-f*_*d;break;case"YXZ":this._x=f*h*u+a*_*d,this._y=a*_*u-f*h*d,this._z=a*h*d-f*_*u,this._w=a*h*u+f*_*d;break;case"ZXY":this._x=f*h*u-a*_*d,this._y=a*_*u+f*h*d,this._z=a*h*d+f*_*u,this._w=a*h*u-f*_*d;break;case"ZYX":this._x=f*h*u-a*_*d,this._y=a*_*u+f*h*d,this._z=a*h*d-f*_*u,this._w=a*h*u+f*_*d;break;case"YZX":this._x=f*h*u+a*_*d,this._y=a*_*u+f*h*d,this._z=a*h*d-f*_*u,this._w=a*h*u-f*_*d;break;case"XZY":this._x=f*h*u-a*_*d,this._y=a*_*u-f*h*d,this._z=a*h*d+f*_*u,this._w=a*h*u+f*_*d;break;default:ze("Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,i=Math.sin(n);return this._x=e.x*i,this._y=e.y*i,this._z=e.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],i=t[4],s=t[8],o=t[1],c=t[5],l=t[9],a=t[2],h=t[6],u=t[10],f=n+c+u;if(f>0){const _=.5/Math.sqrt(f+1);this._w=.25/_,this._x=(h-l)*_,this._y=(s-a)*_,this._z=(o-i)*_}else if(n>c&&n>u){const _=2*Math.sqrt(1+n-c-u);this._w=(h-l)/_,this._x=.25*_,this._y=(i+o)/_,this._z=(s+a)/_}else if(c>u){const _=2*Math.sqrt(1+c-n-u);this._w=(s-a)/_,this._x=(i+o)/_,this._y=.25*_,this._z=(l+h)/_}else{const _=2*Math.sqrt(1+u-n-c);this._w=(o-i)/_,this._x=(s+a)/_,this._y=(l+h)/_,this._z=.25*_}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(lt(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const i=Math.min(1,t/n);return this.slerp(e,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,i=e._y,s=e._z,o=e._w,c=t._x,l=t._y,a=t._z,h=t._w;return this._x=n*h+o*c+i*a-s*l,this._y=i*h+o*l+s*c-n*a,this._z=s*h+o*a+n*l-i*c,this._w=o*h-n*c-i*l-s*a,this._onChangeCallback(),this}slerp(e,t){let n=e._x,i=e._y,s=e._z,o=e._w,c=this.dot(e);c<0&&(n=-n,i=-i,s=-s,o=-o,c=-c);let l=1-t;if(c<.9995){const a=Math.acos(c),h=Math.sin(a);l=Math.sin(l*a)/h,t=Math.sin(t*a)/h,this._x=this._x*l+n*t,this._y=this._y*l+i*t,this._z=this._z*l+s*t,this._w=this._w*l+o*t,this._onChangeCallback()}else this._x=this._x*l+n*t,this._y=this._y*l+i*t,this._z=this._z*l+s*t,this._w=this._w*l+o*t,this.normalize();return this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),i=Math.sqrt(1-n),s=Math.sqrt(n);return this.set(i*Math.sin(e),i*Math.cos(e),s*Math.sin(t),s*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}const gl=class gl{constructor(e=0,t=0,n=0){this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(zl.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(zl.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,i=this.z,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6]*i,this.y=s[1]*t+s[4]*n+s[7]*i,this.z=s[2]*t+s[5]*n+s[8]*i,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,i=this.z,s=e.elements,o=1/(s[3]*t+s[7]*n+s[11]*i+s[15]);return this.x=(s[0]*t+s[4]*n+s[8]*i+s[12])*o,this.y=(s[1]*t+s[5]*n+s[9]*i+s[13])*o,this.z=(s[2]*t+s[6]*n+s[10]*i+s[14])*o,this}applyQuaternion(e){const t=this.x,n=this.y,i=this.z,s=e.x,o=e.y,c=e.z,l=e.w,a=2*(o*i-c*n),h=2*(c*t-s*i),u=2*(s*n-o*t);return this.x=t+l*a+o*u-c*h,this.y=n+l*h+c*a-s*u,this.z=i+l*u+s*h-o*a,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,i=this.z,s=e.elements;return this.x=s[0]*t+s[4]*n+s[8]*i,this.y=s[1]*t+s[5]*n+s[9]*i,this.z=s[2]*t+s[6]*n+s[10]*i,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=lt(this.x,e.x,t.x),this.y=lt(this.y,e.y,t.y),this.z=lt(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=lt(this.x,e,t),this.y=lt(this.y,e,t),this.z=lt(this.z,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(lt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,i=e.y,s=e.z,o=t.x,c=t.y,l=t.z;return this.x=i*l-s*c,this.y=s*o-n*l,this.z=n*c-i*o,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return ko.copy(this).projectOnVector(e),this.sub(ko)}reflect(e){return this.sub(ko.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(lt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,i=this.z-e.z;return t*t+n*n+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const i=Math.sin(t)*e;return this.x=i*Math.sin(n),this.y=Math.cos(t)*e,this.z=i*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),i=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=i,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};gl.prototype.isVector3=!0;let P=gl;const ko=new P,zl=new ln,_l=class _l{constructor(e,t,n,i,s,o,c,l,a){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,i,s,o,c,l,a)}set(e,t,n,i,s,o,c,l,a){const h=this.elements;return h[0]=e,h[1]=i,h[2]=c,h[3]=t,h[4]=s,h[5]=l,h[6]=n,h[7]=o,h[8]=a,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,i=t.elements,s=this.elements,o=n[0],c=n[3],l=n[6],a=n[1],h=n[4],u=n[7],f=n[2],_=n[5],d=n[8],g=i[0],p=i[3],m=i[6],x=i[1],v=i[4],y=i[7],b=i[2],S=i[5],w=i[8];return s[0]=o*g+c*x+l*b,s[3]=o*p+c*v+l*S,s[6]=o*m+c*y+l*w,s[1]=a*g+h*x+u*b,s[4]=a*p+h*v+u*S,s[7]=a*m+h*y+u*w,s[2]=f*g+_*x+d*b,s[5]=f*p+_*v+d*S,s[8]=f*m+_*y+d*w,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],o=e[4],c=e[5],l=e[6],a=e[7],h=e[8];return t*o*h-t*c*a-n*s*h+n*c*l+i*s*a-i*o*l}invert(){const e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],o=e[4],c=e[5],l=e[6],a=e[7],h=e[8],u=h*o-c*a,f=c*l-h*s,_=a*s-o*l,d=t*u+n*f+i*_;if(d===0)return this.set(0,0,0,0,0,0,0,0,0);const g=1/d;return e[0]=u*g,e[1]=(i*a-h*n)*g,e[2]=(c*n-i*o)*g,e[3]=f*g,e[4]=(h*t-i*l)*g,e[5]=(i*s-c*t)*g,e[6]=_*g,e[7]=(n*l-a*t)*g,e[8]=(o*t-n*s)*g,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,i,s,o,c){const l=Math.cos(s),a=Math.sin(s);return this.set(n*l,n*a,-n*(l*o+a*c)+o+e,-i*a,i*l,-i*(-a*o+l*c)+c+t,0,0,1),this}scale(e,t){return this.premultiply(Go.makeScale(e,t)),this}rotate(e){return this.premultiply(Go.makeRotation(-e)),this}translate(e,t){return this.premultiply(Go.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let i=0;i<9;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}};_l.prototype.isMatrix3=!0;let it=_l;const Go=new it,kl=new it().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Gl=new it().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Gd(){const r={enabled:!0,workingColorSpace:pn,spaces:{},convert:function(i,s,o){return this.enabled===!1||s===o||!s||!o||(this.spaces[s].transfer===mt&&(i.r=oi(i.r),i.g=oi(i.g),i.b=oi(i.b)),this.spaces[s].primaries!==this.spaces[o].primaries&&(i.applyMatrix3(this.spaces[s].toXYZ),i.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===mt&&(i.r=_s(i.r),i.g=_s(i.g),i.b=_s(i.b))),i},workingToColorSpace:function(i,s){return this.convert(i,this.workingColorSpace,s)},colorSpaceToWorking:function(i,s){return this.convert(i,s,this.workingColorSpace)},getPrimaries:function(i){return this.spaces[i].primaries},getTransfer:function(i){return i===kn?yo:this.spaces[i].transfer},getToneMappingMode:function(i){return this.spaces[i].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(i,s=this.workingColorSpace){return i.fromArray(this.spaces[s].luminanceCoefficients)},define:function(i){Object.assign(this.spaces,i)},_getMatrix:function(i,s,o){return i.copy(this.spaces[s].toXYZ).multiply(this.spaces[o].fromXYZ)},_getDrawingBufferColorSpace:function(i){return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(i=this.workingColorSpace){return this.spaces[i].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(i,s){return vc("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),r.workingToColorSpace(i,s)},toWorkingColorSpace:function(i,s){return vc("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),r.colorSpaceToWorking(i,s)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return r.define({[pn]:{primaries:e,whitePoint:n,transfer:yo,toXYZ:kl,fromXYZ:Gl,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:Mt},outputColorSpaceConfig:{drawingBufferColorSpace:Mt}},[Mt]:{primaries:e,whitePoint:n,transfer:mt,toXYZ:kl,fromXYZ:Gl,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:Mt}}}),r}const ht=Gd();function oi(r){return r<.04045?r*.0773993808:Math.pow(r*.9478672986+.0521327014,2.4)}function _s(r){return r<.0031308?r*12.92:1.055*Math.pow(r,.41666)-.055}let ji;class Vd{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{ji===void 0&&(ji=pr("canvas")),ji.width=e.width,ji.height=e.height;const i=ji.getContext("2d");e instanceof ImageData?i.putImageData(e,0,0):i.drawImage(e,0,0,e.width,e.height),n=ji}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=pr("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const i=n.getImageData(0,0,e.width,e.height),s=i.data;for(let o=0;o<s.length;o++)s[o]=oi(s[o]/255)*255;return n.putImageData(i,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(oi(t[n]/255)*255):t[n]=oi(t[n]);return{data:t,width:e.width,height:e.height}}else return ze("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let Hd=0;class Qc{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Hd++}),this.uuid=wn(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let s;if(Array.isArray(i)){s=[];for(let o=0,c=i.length;o<c;o++)i[o].isDataTexture?s.push(Vo(i[o].image)):s.push(Vo(i[o]))}else s=Vo(i);n.url=s}return t||(e.images[this.uuid]=n),n}}function Vo(r){return typeof HTMLImageElement<"u"&&r instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&r instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&r instanceof ImageBitmap?Vd.getDataURL(r):r.data?{data:Array.from(r.data),width:r.width,height:r.height,type:r.data.constructor.name}:(ze("Texture: Unable to serialize Texture."),{})}let Wd=0;const Ho=new P;class Vt extends Ei{constructor(e=Vt.DEFAULT_IMAGE,t=Vt.DEFAULT_MAPPING,n=Gn,i=Gn,s=kt,o=Vn,c=bn,l=dn,a=Vt.DEFAULT_ANISOTROPY,h=kn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Wd++}),this.uuid=wn(),this.name="",this.source=new Qc(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=s,this.minFilter=o,this.anisotropy=a,this.format=c,this.internalFormat=null,this.type=l,this.offset=new re(0,0),this.repeat=new re(1,1),this.center=new re(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new it,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(Ho).x}get height(){return this.source.getSize(Ho).y}get depth(){return this.source.getSize(Ho).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const n=e[t];if(n===void 0){ze(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const i=this[t];if(i===void 0){ze(`Texture.setValues(): property '${t}' does not exist.`);continue}i&&n&&i.isVector2&&n.isVector2||i&&n&&i.isVector3&&n.isVector3||i&&n&&i.isMatrix3&&n.isMatrix3?i.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==xu)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case ki:e.x=e.x-Math.floor(e.x);break;case Gn:e.x=e.x<0?0:1;break;case go:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case ki:e.y=e.y-Math.floor(e.y);break;case Gn:e.y=e.y<0?0:1;break;case go:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Vt.DEFAULT_IMAGE=null;Vt.DEFAULT_MAPPING=xu;Vt.DEFAULT_ANISOTROPY=1;const xl=class xl{constructor(e=0,t=0,n=0,i=1){this.x=e,this.y=t,this.z=n,this.w=i}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,i){return this.x=e,this.y=t,this.z=n,this.w=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,i=this.z,s=this.w,o=e.elements;return this.x=o[0]*t+o[4]*n+o[8]*i+o[12]*s,this.y=o[1]*t+o[5]*n+o[9]*i+o[13]*s,this.z=o[2]*t+o[6]*n+o[10]*i+o[14]*s,this.w=o[3]*t+o[7]*n+o[11]*i+o[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,i,s;const l=e.elements,a=l[0],h=l[4],u=l[8],f=l[1],_=l[5],d=l[9],g=l[2],p=l[6],m=l[10];if(Math.abs(h-f)<.01&&Math.abs(u-g)<.01&&Math.abs(d-p)<.01){if(Math.abs(h+f)<.1&&Math.abs(u+g)<.1&&Math.abs(d+p)<.1&&Math.abs(a+_+m-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const v=(a+1)/2,y=(_+1)/2,b=(m+1)/2,S=(h+f)/4,w=(u+g)/4,M=(d+p)/4;return v>y&&v>b?v<.01?(n=0,i=.707106781,s=.707106781):(n=Math.sqrt(v),i=S/n,s=w/n):y>b?y<.01?(n=.707106781,i=0,s=.707106781):(i=Math.sqrt(y),n=S/i,s=M/i):b<.01?(n=.707106781,i=.707106781,s=0):(s=Math.sqrt(b),n=w/s,i=M/s),this.set(n,i,s,t),this}let x=Math.sqrt((p-d)*(p-d)+(u-g)*(u-g)+(f-h)*(f-h));return Math.abs(x)<.001&&(x=1),this.x=(p-d)/x,this.y=(u-g)/x,this.z=(f-h)/x,this.w=Math.acos((a+_+m-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=lt(this.x,e.x,t.x),this.y=lt(this.y,e.y,t.y),this.z=lt(this.z,e.z,t.z),this.w=lt(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=lt(this.x,e,t),this.y=lt(this.y,e,t),this.z=lt(this.z,e,t),this.w=lt(this.w,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(lt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};xl.prototype.isVector4=!0;let xt=xl;class Xd extends Ei{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:kt,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new xt(0,0,e,t),this.scissorTest=!1,this.viewport=new xt(0,0,e,t),this.textures=[];const i={width:e,height:t,depth:n.depth},s=new Vt(i),o=n.count;for(let c=0;c<o;c++)this.textures[c]=s.clone(),this.textures[c].isRenderTargetTexture=!0,this.textures[c].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview}_setTextureOptions(e={}){const t={minFilter:kt,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let i=0,s=this.textures.length;i<s;i++)this.textures[i].image.width=e,this.textures[i].image.height=t,this.textures[i].image.depth=n,this.textures[i].isData3DTexture!==!0&&(this.textures[i].isArrayTexture=this.textures[i].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const i=Object.assign({},e.textures[t].image);this.textures[t].source=new Qc(i)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this.multiview=e.multiview,this}dispose(){this.dispatchEvent({type:"dispose"})}}class on extends Xd{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class Ru extends Vt{constructor(e=null,t=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=zt,this.minFilter=zt,this.wrapR=Gn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class qd extends Vt{constructor(e=null,t=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=zt,this.minFilter=zt,this.wrapR=Gn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const Eo=class Eo{constructor(e,t,n,i,s,o,c,l,a,h,u,f,_,d,g,p){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,i,s,o,c,l,a,h,u,f,_,d,g,p)}set(e,t,n,i,s,o,c,l,a,h,u,f,_,d,g,p){const m=this.elements;return m[0]=e,m[4]=t,m[8]=n,m[12]=i,m[1]=s,m[5]=o,m[9]=c,m[13]=l,m[2]=a,m[6]=h,m[10]=u,m[14]=f,m[3]=_,m[7]=d,m[11]=g,m[15]=p,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Eo().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return this.determinant()===0?(e.set(1,0,0),t.set(0,1,0),n.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){if(e.determinant()===0)return this.identity();const t=this.elements,n=e.elements,i=1/Ji.setFromMatrixColumn(e,0).length(),s=1/Ji.setFromMatrixColumn(e,1).length(),o=1/Ji.setFromMatrixColumn(e,2).length();return t[0]=n[0]*i,t[1]=n[1]*i,t[2]=n[2]*i,t[3]=0,t[4]=n[4]*s,t[5]=n[5]*s,t[6]=n[6]*s,t[7]=0,t[8]=n[8]*o,t[9]=n[9]*o,t[10]=n[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,i=e.y,s=e.z,o=Math.cos(n),c=Math.sin(n),l=Math.cos(i),a=Math.sin(i),h=Math.cos(s),u=Math.sin(s);if(e.order==="XYZ"){const f=o*h,_=o*u,d=c*h,g=c*u;t[0]=l*h,t[4]=-l*u,t[8]=a,t[1]=_+d*a,t[5]=f-g*a,t[9]=-c*l,t[2]=g-f*a,t[6]=d+_*a,t[10]=o*l}else if(e.order==="YXZ"){const f=l*h,_=l*u,d=a*h,g=a*u;t[0]=f+g*c,t[4]=d*c-_,t[8]=o*a,t[1]=o*u,t[5]=o*h,t[9]=-c,t[2]=_*c-d,t[6]=g+f*c,t[10]=o*l}else if(e.order==="ZXY"){const f=l*h,_=l*u,d=a*h,g=a*u;t[0]=f-g*c,t[4]=-o*u,t[8]=d+_*c,t[1]=_+d*c,t[5]=o*h,t[9]=g-f*c,t[2]=-o*a,t[6]=c,t[10]=o*l}else if(e.order==="ZYX"){const f=o*h,_=o*u,d=c*h,g=c*u;t[0]=l*h,t[4]=d*a-_,t[8]=f*a+g,t[1]=l*u,t[5]=g*a+f,t[9]=_*a-d,t[2]=-a,t[6]=c*l,t[10]=o*l}else if(e.order==="YZX"){const f=o*l,_=o*a,d=c*l,g=c*a;t[0]=l*h,t[4]=g-f*u,t[8]=d*u+_,t[1]=u,t[5]=o*h,t[9]=-c*h,t[2]=-a*h,t[6]=_*u+d,t[10]=f-g*u}else if(e.order==="XZY"){const f=o*l,_=o*a,d=c*l,g=c*a;t[0]=l*h,t[4]=-u,t[8]=a*h,t[1]=f*u+g,t[5]=o*h,t[9]=_*u-d,t[2]=d*u-_,t[6]=c*h,t[10]=g*u+f}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Yd,e,Kd)}lookAt(e,t,n){const i=this.elements;return un.subVectors(e,t),un.lengthSq()===0&&(un.z=1),un.normalize(),mi.crossVectors(n,un),mi.lengthSq()===0&&(Math.abs(n.z)===1?un.x+=1e-4:un.z+=1e-4,un.normalize(),mi.crossVectors(n,un)),mi.normalize(),Ar.crossVectors(un,mi),i[0]=mi.x,i[4]=Ar.x,i[8]=un.x,i[1]=mi.y,i[5]=Ar.y,i[9]=un.y,i[2]=mi.z,i[6]=Ar.z,i[10]=un.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,i=t.elements,s=this.elements,o=n[0],c=n[4],l=n[8],a=n[12],h=n[1],u=n[5],f=n[9],_=n[13],d=n[2],g=n[6],p=n[10],m=n[14],x=n[3],v=n[7],y=n[11],b=n[15],S=i[0],w=i[4],M=i[8],T=i[12],A=i[1],L=i[5],I=i[9],N=i[13],B=i[2],U=i[6],O=i[10],k=i[14],J=i[3],ae=i[7],pe=i[11],Ee=i[15];return s[0]=o*S+c*A+l*B+a*J,s[4]=o*w+c*L+l*U+a*ae,s[8]=o*M+c*I+l*O+a*pe,s[12]=o*T+c*N+l*k+a*Ee,s[1]=h*S+u*A+f*B+_*J,s[5]=h*w+u*L+f*U+_*ae,s[9]=h*M+u*I+f*O+_*pe,s[13]=h*T+u*N+f*k+_*Ee,s[2]=d*S+g*A+p*B+m*J,s[6]=d*w+g*L+p*U+m*ae,s[10]=d*M+g*I+p*O+m*pe,s[14]=d*T+g*N+p*k+m*Ee,s[3]=x*S+v*A+y*B+b*J,s[7]=x*w+v*L+y*U+b*ae,s[11]=x*M+v*I+y*O+b*pe,s[15]=x*T+v*N+y*k+b*Ee,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],i=e[8],s=e[12],o=e[1],c=e[5],l=e[9],a=e[13],h=e[2],u=e[6],f=e[10],_=e[14],d=e[3],g=e[7],p=e[11],m=e[15],x=l*_-a*f,v=c*_-a*u,y=c*f-l*u,b=o*_-a*h,S=o*f-l*h,w=o*u-c*h;return t*(g*x-p*v+m*y)-n*(d*x-p*b+m*S)+i*(d*v-g*b+m*w)-s*(d*y-g*S+p*w)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const i=this.elements;return e.isVector3?(i[12]=e.x,i[13]=e.y,i[14]=e.z):(i[12]=e,i[13]=t,i[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],o=e[4],c=e[5],l=e[6],a=e[7],h=e[8],u=e[9],f=e[10],_=e[11],d=e[12],g=e[13],p=e[14],m=e[15],x=t*c-n*o,v=t*l-i*o,y=t*a-s*o,b=n*l-i*c,S=n*a-s*c,w=i*a-s*l,M=h*g-u*d,T=h*p-f*d,A=h*m-_*d,L=u*p-f*g,I=u*m-_*g,N=f*m-_*p,B=x*N-v*I+y*L+b*A-S*T+w*M;if(B===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const U=1/B;return e[0]=(c*N-l*I+a*L)*U,e[1]=(i*I-n*N-s*L)*U,e[2]=(g*w-p*S+m*b)*U,e[3]=(f*S-u*w-_*b)*U,e[4]=(l*A-o*N-a*T)*U,e[5]=(t*N-i*A+s*T)*U,e[6]=(p*y-d*w-m*v)*U,e[7]=(h*w-f*y+_*v)*U,e[8]=(o*I-c*A+a*M)*U,e[9]=(n*A-t*I-s*M)*U,e[10]=(d*S-g*y+m*x)*U,e[11]=(u*y-h*S-_*x)*U,e[12]=(c*T-o*L-l*M)*U,e[13]=(t*L-n*T+i*M)*U,e[14]=(g*v-d*b-p*x)*U,e[15]=(h*b-u*v+f*x)*U,this}scale(e){const t=this.elements,n=e.x,i=e.y,s=e.z;return t[0]*=n,t[4]*=i,t[8]*=s,t[1]*=n,t[5]*=i,t[9]*=s,t[2]*=n,t[6]*=i,t[10]*=s,t[3]*=n,t[7]*=i,t[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],i=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,i))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),i=Math.sin(t),s=1-n,o=e.x,c=e.y,l=e.z,a=s*o,h=s*c;return this.set(a*o+n,a*c-i*l,a*l+i*c,0,a*c+i*l,h*c+n,h*l-i*o,0,a*l-i*c,h*l+i*o,s*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,i,s,o){return this.set(1,n,s,0,e,1,o,0,t,i,1,0,0,0,0,1),this}compose(e,t,n){const i=this.elements,s=t._x,o=t._y,c=t._z,l=t._w,a=s+s,h=o+o,u=c+c,f=s*a,_=s*h,d=s*u,g=o*h,p=o*u,m=c*u,x=l*a,v=l*h,y=l*u,b=n.x,S=n.y,w=n.z;return i[0]=(1-(g+m))*b,i[1]=(_+y)*b,i[2]=(d-v)*b,i[3]=0,i[4]=(_-y)*S,i[5]=(1-(f+m))*S,i[6]=(p+x)*S,i[7]=0,i[8]=(d+v)*w,i[9]=(p-x)*w,i[10]=(1-(f+g))*w,i[11]=0,i[12]=e.x,i[13]=e.y,i[14]=e.z,i[15]=1,this}decompose(e,t,n){const i=this.elements;e.x=i[12],e.y=i[13],e.z=i[14];const s=this.determinant();if(s===0)return n.set(1,1,1),t.identity(),this;let o=Ji.set(i[0],i[1],i[2]).length();const c=Ji.set(i[4],i[5],i[6]).length(),l=Ji.set(i[8],i[9],i[10]).length();s<0&&(o=-o),Tn.copy(this);const a=1/o,h=1/c,u=1/l;return Tn.elements[0]*=a,Tn.elements[1]*=a,Tn.elements[2]*=a,Tn.elements[4]*=h,Tn.elements[5]*=h,Tn.elements[6]*=h,Tn.elements[8]*=u,Tn.elements[9]*=u,Tn.elements[10]*=u,t.setFromRotationMatrix(Tn),n.x=o,n.y=c,n.z=l,this}makePerspective(e,t,n,i,s,o,c=Hn,l=!1){const a=this.elements,h=2*s/(t-e),u=2*s/(n-i),f=(t+e)/(t-e),_=(n+i)/(n-i);let d,g;if(l)d=s/(o-s),g=o*s/(o-s);else if(c===Hn)d=-(o+s)/(o-s),g=-2*o*s/(o-s);else if(c===dr)d=-o/(o-s),g=-o*s/(o-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+c);return a[0]=h,a[4]=0,a[8]=f,a[12]=0,a[1]=0,a[5]=u,a[9]=_,a[13]=0,a[2]=0,a[6]=0,a[10]=d,a[14]=g,a[3]=0,a[7]=0,a[11]=-1,a[15]=0,this}makeOrthographic(e,t,n,i,s,o,c=Hn,l=!1){const a=this.elements,h=2/(t-e),u=2/(n-i),f=-(t+e)/(t-e),_=-(n+i)/(n-i);let d,g;if(l)d=1/(o-s),g=o/(o-s);else if(c===Hn)d=-2/(o-s),g=-(o+s)/(o-s);else if(c===dr)d=-1/(o-s),g=-s/(o-s);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+c);return a[0]=h,a[4]=0,a[8]=0,a[12]=f,a[1]=0,a[5]=u,a[9]=0,a[13]=_,a[2]=0,a[6]=0,a[10]=d,a[14]=g,a[3]=0,a[7]=0,a[11]=0,a[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let i=0;i<16;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}};Eo.prototype.isMatrix4=!0;let Qe=Eo;const Ji=new P,Tn=new Qe,Yd=new P(0,0,0),Kd=new P(1,1,1),mi=new P,Ar=new P,un=new P,Vl=new Qe,Hl=new ln;class li{constructor(e=0,t=0,n=0,i=li.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,i=this._order){return this._x=e,this._y=t,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const i=e.elements,s=i[0],o=i[4],c=i[8],l=i[1],a=i[5],h=i[9],u=i[2],f=i[6],_=i[10];switch(t){case"XYZ":this._y=Math.asin(lt(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-h,_),this._z=Math.atan2(-o,s)):(this._x=Math.atan2(f,a),this._z=0);break;case"YXZ":this._x=Math.asin(-lt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(c,_),this._z=Math.atan2(l,a)):(this._y=Math.atan2(-u,s),this._z=0);break;case"ZXY":this._x=Math.asin(lt(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-u,_),this._z=Math.atan2(-o,a)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-lt(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(f,_),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-o,a));break;case"YZX":this._z=Math.asin(lt(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,a),this._y=Math.atan2(-u,s)):(this._x=0,this._y=Math.atan2(c,_));break;case"XZY":this._z=Math.asin(-lt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(f,a),this._y=Math.atan2(c,s)):(this._x=Math.atan2(-h,_),this._y=0);break;default:ze("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return Vl.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Vl,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Hl.setFromEuler(this),this.setFromQuaternion(Hl,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}li.DEFAULT_ORDER="XYZ";class el{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let jd=0;const Wl=new P,Zi=new ln,$n=new Qe,Cr=new P,Os=new P,Jd=new P,Zd=new ln,Xl=new P(1,0,0),ql=new P(0,1,0),Yl=new P(0,0,1),Kl={type:"added"},$d={type:"removed"},$i={type:"childadded",child:null},Wo={type:"childremoved",child:null};class bt extends Ei{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:jd++}),this.uuid=wn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=bt.DEFAULT_UP.clone();const e=new P,t=new li,n=new ln,i=new P(1,1,1);function s(){n.setFromEuler(t,!1)}function o(){t.setFromQuaternion(n,void 0,!1)}t._onChange(s),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new Qe},normalMatrix:{value:new it}}),this.matrix=new Qe,this.matrixWorld=new Qe,this.matrixAutoUpdate=bt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=bt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new el,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Zi.setFromAxisAngle(e,t),this.quaternion.multiply(Zi),this}rotateOnWorldAxis(e,t){return Zi.setFromAxisAngle(e,t),this.quaternion.premultiply(Zi),this}rotateX(e){return this.rotateOnAxis(Xl,e)}rotateY(e){return this.rotateOnAxis(ql,e)}rotateZ(e){return this.rotateOnAxis(Yl,e)}translateOnAxis(e,t){return Wl.copy(e).applyQuaternion(this.quaternion),this.position.add(Wl.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Xl,e)}translateY(e){return this.translateOnAxis(ql,e)}translateZ(e){return this.translateOnAxis(Yl,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4($n.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?Cr.copy(e):Cr.set(e,t,n);const i=this.parent;this.updateWorldMatrix(!0,!1),Os.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?$n.lookAt(Os,Cr,this.up):$n.lookAt(Cr,Os,this.up),this.quaternion.setFromRotationMatrix($n),i&&($n.extractRotation(i.matrixWorld),Zi.setFromRotationMatrix($n),this.quaternion.premultiply(Zi.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(Xe("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Kl),$i.child=e,this.dispatchEvent($i),$i.child=null):Xe("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent($d),Wo.child=e,this.dispatchEvent(Wo),Wo.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),$n.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),$n.multiply(e.parent.matrixWorld)),e.applyMatrix4($n),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Kl),$i.child=e,this.dispatchEvent($i),$i.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,i=this.children.length;n<i;n++){const o=this.children[n].getObjectByProperty(e,t);if(o!==void 0)return o}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const i=this.children;for(let s=0,o=i.length;s<o;s++)i[s].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Os,e,Jd),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Os,Zd,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const e=this.pivot;if(e!==null){const t=e.x,n=e.y,i=e.z,s=this.matrix.elements;s[12]+=t-s[0]*t-s[4]*n-s[8]*i,s[13]+=n-s[1]*t-s[5]*n-s[9]*i,s[14]+=i-s[2]*t-s[6]*n-s[10]*i}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){const n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const i=this.children;for(let s=0,o=i.length;s<o;s++)i[s].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const i={};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),this.static!==!1&&(i.static=this.static),Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.pivot!==null&&(i.pivot=this.pivot.toArray()),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.morphTargetDictionary!==void 0&&(i.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(i.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.geometryInfo=this._geometryInfo.map(c=>({...c,boundingBox:c.boundingBox?c.boundingBox.toJSON():void 0,boundingSphere:c.boundingSphere?c.boundingSphere.toJSON():void 0})),i.instanceInfo=this._instanceInfo.map(c=>({...c})),i.availableInstanceIds=this._availableInstanceIds.slice(),i.availableGeometryIds=this._availableGeometryIds.slice(),i.nextIndexStart=this._nextIndexStart,i.nextVertexStart=this._nextVertexStart,i.geometryCount=this._geometryCount,i.maxInstanceCount=this._maxInstanceCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.matricesTexture=this._matricesTexture.toJSON(e),i.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(i.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(i.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(i.boundingBox=this.boundingBox.toJSON()));function s(c,l){return c[l.uuid]===void 0&&(c[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=s(e.geometries,this.geometry);const c=this.geometry.parameters;if(c!==void 0&&c.shapes!==void 0){const l=c.shapes;if(Array.isArray(l))for(let a=0,h=l.length;a<h;a++){const u=l[a];s(e.shapes,u)}else s(e.shapes,l)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const c=[];for(let l=0,a=this.material.length;l<a;l++)c.push(s(e.materials,this.material[l]));i.material=c}else i.material=s(e.materials,this.material);if(this.children.length>0){i.children=[];for(let c=0;c<this.children.length;c++)i.children.push(this.children[c].toJSON(e).object)}if(this.animations.length>0){i.animations=[];for(let c=0;c<this.animations.length;c++){const l=this.animations[c];i.animations.push(s(e.animations,l))}}if(t){const c=o(e.geometries),l=o(e.materials),a=o(e.textures),h=o(e.images),u=o(e.shapes),f=o(e.skeletons),_=o(e.animations),d=o(e.nodes);c.length>0&&(n.geometries=c),l.length>0&&(n.materials=l),a.length>0&&(n.textures=a),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),f.length>0&&(n.skeletons=f),_.length>0&&(n.animations=_),d.length>0&&(n.nodes=d)}return n.object=i,n;function o(c){const l=[];for(const a in c){const h=c[a];delete h.metadata,l.push(h)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const i=e.children[n];this.add(i.clone())}return this}}bt.DEFAULT_UP=new P(0,1,0);bt.DEFAULT_MATRIX_AUTO_UPDATE=!0;bt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class dt extends bt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Qd={type:"move"};class Xo{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new dt,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new dt,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new P,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new P),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new dt,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new P,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new P,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let i=null,s=null,o=null;const c=this._targetRay,l=this._grip,a=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(a&&e.hand){o=!0;for(const g of e.hand.values()){const p=t.getJointPose(g,n),m=this._getHandJoint(a,g);p!==null&&(m.matrix.fromArray(p.transform.matrix),m.matrix.decompose(m.position,m.rotation,m.scale),m.matrixWorldNeedsUpdate=!0,m.jointRadius=p.radius),m.visible=p!==null}const h=a.joints["index-finger-tip"],u=a.joints["thumb-tip"],f=h.position.distanceTo(u.position),_=.02,d=.005;a.inputState.pinching&&f>_+d?(a.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!a.inputState.pinching&&f<=_-d&&(a.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,n),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1,l.eventsEnabled&&l.dispatchEvent({type:"gripUpdated",data:e,target:this})));c!==null&&(i=t.getPose(e.targetRaySpace,n),i===null&&s!==null&&(i=s),i!==null&&(c.matrix.fromArray(i.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,i.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(i.linearVelocity)):c.hasLinearVelocity=!1,i.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(i.angularVelocity)):c.hasAngularVelocity=!1,this.dispatchEvent(Qd)))}return c!==null&&(c.visible=i!==null),l!==null&&(l.visible=s!==null),a!==null&&(a.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new dt;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}const Pu={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},gi={h:0,s:0,l:0},Rr={h:0,s:0,l:0};function qo(r,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?r+(e-r)*6*t:t<1/2?e:t<2/3?r+(e-r)*6*(2/3-t):r}class ce{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const i=e;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Mt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,ht.colorSpaceToWorking(this,t),this}setRGB(e,t,n,i=ht.workingColorSpace){return this.r=e,this.g=t,this.b=n,ht.colorSpaceToWorking(this,i),this}setHSL(e,t,n,i=ht.workingColorSpace){if(e=$c(e,1),t=lt(t,0,1),n=lt(n,0,1),t===0)this.r=this.g=this.b=n;else{const s=n<=.5?n*(1+t):n+t-n*t,o=2*n-s;this.r=qo(o,s,e+1/3),this.g=qo(o,s,e),this.b=qo(o,s,e-1/3)}return ht.colorSpaceToWorking(this,i),this}setStyle(e,t=Mt){function n(s){s!==void 0&&parseFloat(s)<1&&ze("Color: Alpha component of "+e+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const o=i[1],c=i[2];switch(o){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(c))return n(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(c))return n(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(c))return n(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:ze("Color: Unknown color model "+e)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=i[1],o=s.length;if(o===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(s,16),t);ze("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Mt){const n=Pu[e.toLowerCase()];return n!==void 0?this.setHex(n,t):ze("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=oi(e.r),this.g=oi(e.g),this.b=oi(e.b),this}copyLinearToSRGB(e){return this.r=_s(e.r),this.g=_s(e.g),this.b=_s(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Mt){return ht.workingToColorSpace(Jt.copy(this),e),Math.round(lt(Jt.r*255,0,255))*65536+Math.round(lt(Jt.g*255,0,255))*256+Math.round(lt(Jt.b*255,0,255))}getHexString(e=Mt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=ht.workingColorSpace){ht.workingToColorSpace(Jt.copy(this),t);const n=Jt.r,i=Jt.g,s=Jt.b,o=Math.max(n,i,s),c=Math.min(n,i,s);let l,a;const h=(c+o)/2;if(c===o)l=0,a=0;else{const u=o-c;switch(a=h<=.5?u/(o+c):u/(2-o-c),o){case n:l=(i-s)/u+(i<s?6:0);break;case i:l=(s-n)/u+2;break;case s:l=(n-i)/u+4;break}l/=6}return e.h=l,e.s=a,e.l=h,e}getRGB(e,t=ht.workingColorSpace){return ht.workingToColorSpace(Jt.copy(this),t),e.r=Jt.r,e.g=Jt.g,e.b=Jt.b,e}getStyle(e=Mt){ht.workingToColorSpace(Jt.copy(this),e);const t=Jt.r,n=Jt.g,i=Jt.b;return e!==Mt?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(e,t,n){return this.getHSL(gi),this.setHSL(gi.h+e,gi.s+t,gi.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(gi),e.getHSL(Rr);const n=sr(gi.h,Rr.h,t),i=sr(gi.s,Rr.s,t),s=sr(gi.l,Rr.l,t);return this.setHSL(n,i,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,i=this.b,s=e.elements;return this.r=s[0]*t+s[3]*n+s[6]*i,this.g=s[1]*t+s[4]*n+s[7]*i,this.b=s[2]*t+s[5]*n+s[8]*i,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Jt=new ce;ce.NAMES=Pu;class So{constructor(e,t=25e-5){this.isFogExp2=!0,this.name="",this.color=new ce(e),this.density=t}clone(){return new So(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}}class jl extends bt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new li,this.environmentIntensity=1,this.environmentRotation=new li,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}const En=new P,Qn=new P,Yo=new P,ei=new P,Qi=new P,es=new P,Jl=new P,Ko=new P,jo=new P,Jo=new P,Zo=new xt,$o=new xt,Qo=new xt;class vn{constructor(e=new P,t=new P,n=new P){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,i){i.subVectors(n,t),En.subVectors(e,t),i.cross(En);const s=i.lengthSq();return s>0?i.multiplyScalar(1/Math.sqrt(s)):i.set(0,0,0)}static getBarycoord(e,t,n,i,s){En.subVectors(i,t),Qn.subVectors(n,t),Yo.subVectors(e,t);const o=En.dot(En),c=En.dot(Qn),l=En.dot(Yo),a=Qn.dot(Qn),h=Qn.dot(Yo),u=o*a-c*c;if(u===0)return s.set(0,0,0),null;const f=1/u,_=(a*l-c*h)*f,d=(o*h-c*l)*f;return s.set(1-_-d,d,_)}static containsPoint(e,t,n,i){return this.getBarycoord(e,t,n,i,ei)===null?!1:ei.x>=0&&ei.y>=0&&ei.x+ei.y<=1}static getInterpolation(e,t,n,i,s,o,c,l){return this.getBarycoord(e,t,n,i,ei)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,ei.x),l.addScaledVector(o,ei.y),l.addScaledVector(c,ei.z),l)}static getInterpolatedAttribute(e,t,n,i,s,o){return Zo.setScalar(0),$o.setScalar(0),Qo.setScalar(0),Zo.fromBufferAttribute(e,t),$o.fromBufferAttribute(e,n),Qo.fromBufferAttribute(e,i),o.setScalar(0),o.addScaledVector(Zo,s.x),o.addScaledVector($o,s.y),o.addScaledVector(Qo,s.z),o}static isFrontFacing(e,t,n,i){return En.subVectors(n,t),Qn.subVectors(e,t),En.cross(Qn).dot(i)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,i){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[i]),this}setFromAttributeAndIndices(e,t,n,i){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,i),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return En.subVectors(this.c,this.b),Qn.subVectors(this.a,this.b),En.cross(Qn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return vn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return vn.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,i,s){return vn.getInterpolation(e,this.a,this.b,this.c,t,n,i,s)}containsPoint(e){return vn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return vn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,i=this.b,s=this.c;let o,c;Qi.subVectors(i,n),es.subVectors(s,n),Ko.subVectors(e,n);const l=Qi.dot(Ko),a=es.dot(Ko);if(l<=0&&a<=0)return t.copy(n);jo.subVectors(e,i);const h=Qi.dot(jo),u=es.dot(jo);if(h>=0&&u<=h)return t.copy(i);const f=l*u-h*a;if(f<=0&&l>=0&&h<=0)return o=l/(l-h),t.copy(n).addScaledVector(Qi,o);Jo.subVectors(e,s);const _=Qi.dot(Jo),d=es.dot(Jo);if(d>=0&&_<=d)return t.copy(s);const g=_*a-l*d;if(g<=0&&a>=0&&d<=0)return c=a/(a-d),t.copy(n).addScaledVector(es,c);const p=h*d-_*u;if(p<=0&&u-h>=0&&_-d>=0)return Jl.subVectors(s,i),c=(u-h)/(u-h+(_-d)),t.copy(i).addScaledVector(Jl,c);const m=1/(p+g+f);return o=g*m,c=f*m,t.copy(n).addScaledVector(Qi,o).addScaledVector(es,c)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}class Kn{constructor(e=new P(1/0,1/0,1/0),t=new P(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(An.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(An.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=An.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const s=n.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let o=0,c=s.count;o<c;o++)e.isMesh===!0?e.getVertexPosition(o,An):An.fromBufferAttribute(s,o),An.applyMatrix4(e.matrixWorld),this.expandByPoint(An);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Pr.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Pr.copy(n.boundingBox)),Pr.applyMatrix4(e.matrixWorld),this.union(Pr)}const i=e.children;for(let s=0,o=i.length;s<o;s++)this.expandByObject(i[s],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,An),An.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Bs),Lr.subVectors(this.max,Bs),ts.subVectors(e.a,Bs),ns.subVectors(e.b,Bs),is.subVectors(e.c,Bs),_i.subVectors(ns,ts),xi.subVectors(is,ns),Ci.subVectors(ts,is);let t=[0,-_i.z,_i.y,0,-xi.z,xi.y,0,-Ci.z,Ci.y,_i.z,0,-_i.x,xi.z,0,-xi.x,Ci.z,0,-Ci.x,-_i.y,_i.x,0,-xi.y,xi.x,0,-Ci.y,Ci.x,0];return!ea(t,ts,ns,is,Lr)||(t=[1,0,0,0,1,0,0,0,1],!ea(t,ts,ns,is,Lr))?!1:(Ir.crossVectors(_i,xi),t=[Ir.x,Ir.y,Ir.z],ea(t,ts,ns,is,Lr))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,An).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(An).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(ti[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),ti[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),ti[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),ti[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),ti[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),ti[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),ti[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),ti[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(ti),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const ti=[new P,new P,new P,new P,new P,new P,new P,new P],An=new P,Pr=new Kn,ts=new P,ns=new P,is=new P,_i=new P,xi=new P,Ci=new P,Bs=new P,Lr=new P,Ir=new P,Ri=new P;function ea(r,e,t,n,i){for(let s=0,o=r.length-3;s<=o;s+=3){Ri.fromArray(r,s);const c=i.x*Math.abs(Ri.x)+i.y*Math.abs(Ri.y)+i.z*Math.abs(Ri.z),l=e.dot(Ri),a=t.dot(Ri),h=n.dot(Ri);if(Math.max(-Math.max(l,a,h),Math.min(l,a,h))>c)return!1}return!0}const Bt=new P,Dr=new re;let ep=0;class Rt extends Ei{constructor(e,t,n=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:ep++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=xc,this.updateRanges=[],this.gpuType=Sn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let i=0,s=this.itemSize;i<s;i++)this.array[e+i]=t.array[n+i];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)Dr.fromBufferAttribute(this,t),Dr.applyMatrix3(e),this.setXY(t,Dr.x,Dr.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)Bt.fromBufferAttribute(this,t),Bt.applyMatrix3(e),this.setXYZ(t,Bt.x,Bt.y,Bt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)Bt.fromBufferAttribute(this,t),Bt.applyMatrix4(e),this.setXYZ(t,Bt.x,Bt.y,Bt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Bt.fromBufferAttribute(this,t),Bt.applyNormalMatrix(e),this.setXYZ(t,Bt.x,Bt.y,Bt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Bt.fromBufferAttribute(this,t),Bt.transformDirection(e),this.setXYZ(t,Bt.x,Bt.y,Bt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=Cn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=_t(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Cn(t,this.array)),t}setX(e,t){return this.normalized&&(t=_t(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Cn(t,this.array)),t}setY(e,t){return this.normalized&&(t=_t(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Cn(t,this.array)),t}setZ(e,t){return this.normalized&&(t=_t(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Cn(t,this.array)),t}setW(e,t){return this.normalized&&(t=_t(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=_t(t,this.array),n=_t(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,i){return e*=this.itemSize,this.normalized&&(t=_t(t,this.array),n=_t(n,this.array),i=_t(i,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this}setXYZW(e,t,n,i,s){return e*=this.itemSize,this.normalized&&(t=_t(t,this.array),n=_t(n,this.array),i=_t(i,this.array),s=_t(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==xc&&(e.usage=this.usage),e}dispose(){this.dispatchEvent({type:"dispose"})}}class Lu extends Rt{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class Iu extends Rt{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class Je extends Rt{constructor(e,t,n){super(new Float32Array(e),t,n)}}const tp=new Kn,zs=new P,ta=new P;class jn{constructor(e=new P,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):tp.setFromPoints(e).getCenter(n);let i=0;for(let s=0,o=e.length;s<o;s++)i=Math.max(i,n.distanceToSquared(e[s]));return this.radius=Math.sqrt(i),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;zs.subVectors(e,this.center);const t=zs.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),i=(n-this.radius)*.5;this.center.addScaledVector(zs,i/n),this.radius+=i}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(ta.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(zs.copy(e.center).add(ta)),this.expandByPoint(zs.copy(e.center).sub(ta))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}let np=0;const _n=new Qe,na=new bt,ss=new P,fn=new Kn,ks=new Kn,Xt=new P;class wt extends Ei{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:np++}),this.uuid=wn(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(yd(e)?Iu:Lu)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const s=new it().getNormalMatrix(e);n.applyNormalMatrix(s),n.needsUpdate=!0}const i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(e),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return _n.makeRotationFromQuaternion(e),this.applyMatrix4(_n),this}rotateX(e){return _n.makeRotationX(e),this.applyMatrix4(_n),this}rotateY(e){return _n.makeRotationY(e),this.applyMatrix4(_n),this}rotateZ(e){return _n.makeRotationZ(e),this.applyMatrix4(_n),this}translate(e,t,n){return _n.makeTranslation(e,t,n),this.applyMatrix4(_n),this}scale(e,t,n){return _n.makeScale(e,t,n),this.applyMatrix4(_n),this}lookAt(e){return na.lookAt(e),na.updateMatrix(),this.applyMatrix4(na.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(ss).negate(),this.translate(ss.x,ss.y,ss.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const n=[];for(let i=0,s=e.length;i<s;i++){const o=e[i];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new Je(n,3))}else{const n=Math.min(e.length,t.count);for(let i=0;i<n;i++){const s=e[i];t.setXYZ(i,s.x,s.y,s.z||0)}e.length>t.count&&ze("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Kn);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Xe("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new P(-1/0,-1/0,-1/0),new P(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,i=t.length;n<i;n++){const s=t[n];fn.setFromBufferAttribute(s),this.morphTargetsRelative?(Xt.addVectors(this.boundingBox.min,fn.min),this.boundingBox.expandByPoint(Xt),Xt.addVectors(this.boundingBox.max,fn.max),this.boundingBox.expandByPoint(Xt)):(this.boundingBox.expandByPoint(fn.min),this.boundingBox.expandByPoint(fn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Xe('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new jn);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Xe("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new P,1/0);return}if(e){const n=this.boundingSphere.center;if(fn.setFromBufferAttribute(e),t)for(let s=0,o=t.length;s<o;s++){const c=t[s];ks.setFromBufferAttribute(c),this.morphTargetsRelative?(Xt.addVectors(fn.min,ks.min),fn.expandByPoint(Xt),Xt.addVectors(fn.max,ks.max),fn.expandByPoint(Xt)):(fn.expandByPoint(ks.min),fn.expandByPoint(ks.max))}fn.getCenter(n);let i=0;for(let s=0,o=e.count;s<o;s++)Xt.fromBufferAttribute(e,s),i=Math.max(i,n.distanceToSquared(Xt));if(t)for(let s=0,o=t.length;s<o;s++){const c=t[s],l=this.morphTargetsRelative;for(let a=0,h=c.count;a<h;a++)Xt.fromBufferAttribute(c,a),l&&(ss.fromBufferAttribute(e,a),Xt.add(ss)),i=Math.max(i,n.distanceToSquared(Xt))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&Xe('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){Xe("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.position,i=t.normal,s=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Rt(new Float32Array(4*n.count),4));const o=this.getAttribute("tangent"),c=[],l=[];for(let M=0;M<n.count;M++)c[M]=new P,l[M]=new P;const a=new P,h=new P,u=new P,f=new re,_=new re,d=new re,g=new P,p=new P;function m(M,T,A){a.fromBufferAttribute(n,M),h.fromBufferAttribute(n,T),u.fromBufferAttribute(n,A),f.fromBufferAttribute(s,M),_.fromBufferAttribute(s,T),d.fromBufferAttribute(s,A),h.sub(a),u.sub(a),_.sub(f),d.sub(f);const L=1/(_.x*d.y-d.x*_.y);isFinite(L)&&(g.copy(h).multiplyScalar(d.y).addScaledVector(u,-_.y).multiplyScalar(L),p.copy(u).multiplyScalar(_.x).addScaledVector(h,-d.x).multiplyScalar(L),c[M].add(g),c[T].add(g),c[A].add(g),l[M].add(p),l[T].add(p),l[A].add(p))}let x=this.groups;x.length===0&&(x=[{start:0,count:e.count}]);for(let M=0,T=x.length;M<T;++M){const A=x[M],L=A.start,I=A.count;for(let N=L,B=L+I;N<B;N+=3)m(e.getX(N+0),e.getX(N+1),e.getX(N+2))}const v=new P,y=new P,b=new P,S=new P;function w(M){b.fromBufferAttribute(i,M),S.copy(b);const T=c[M];v.copy(T),v.sub(b.multiplyScalar(b.dot(T))).normalize(),y.crossVectors(S,T);const L=y.dot(l[M])<0?-1:1;o.setXYZW(M,v.x,v.y,v.z,L)}for(let M=0,T=x.length;M<T;++M){const A=x[M],L=A.start,I=A.count;for(let N=L,B=L+I;N<B;N+=3)w(e.getX(N+0)),w(e.getX(N+1)),w(e.getX(N+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Rt(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let f=0,_=n.count;f<_;f++)n.setXYZ(f,0,0,0);const i=new P,s=new P,o=new P,c=new P,l=new P,a=new P,h=new P,u=new P;if(e)for(let f=0,_=e.count;f<_;f+=3){const d=e.getX(f+0),g=e.getX(f+1),p=e.getX(f+2);i.fromBufferAttribute(t,d),s.fromBufferAttribute(t,g),o.fromBufferAttribute(t,p),h.subVectors(o,s),u.subVectors(i,s),h.cross(u),c.fromBufferAttribute(n,d),l.fromBufferAttribute(n,g),a.fromBufferAttribute(n,p),c.add(h),l.add(h),a.add(h),n.setXYZ(d,c.x,c.y,c.z),n.setXYZ(g,l.x,l.y,l.z),n.setXYZ(p,a.x,a.y,a.z)}else for(let f=0,_=t.count;f<_;f+=3)i.fromBufferAttribute(t,f+0),s.fromBufferAttribute(t,f+1),o.fromBufferAttribute(t,f+2),h.subVectors(o,s),u.subVectors(i,s),h.cross(u),n.setXYZ(f+0,h.x,h.y,h.z),n.setXYZ(f+1,h.x,h.y,h.z),n.setXYZ(f+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Xt.fromBufferAttribute(e,t),Xt.normalize(),e.setXYZ(t,Xt.x,Xt.y,Xt.z)}toNonIndexed(){function e(c,l){const a=c.array,h=c.itemSize,u=c.normalized,f=new a.constructor(l.length*h);let _=0,d=0;for(let g=0,p=l.length;g<p;g++){c.isInterleavedBufferAttribute?_=l[g]*c.data.stride+c.offset:_=l[g]*h;for(let m=0;m<h;m++)f[d++]=a[_++]}return new Rt(f,h,u)}if(this.index===null)return ze("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new wt,n=this.index.array,i=this.attributes;for(const c in i){const l=i[c],a=e(l,n);t.setAttribute(c,a)}const s=this.morphAttributes;for(const c in s){const l=[],a=s[c];for(let h=0,u=a.length;h<u;h++){const f=a[h],_=e(f,n);l.push(_)}t.morphAttributes[c]=l}t.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let c=0,l=o.length;c<l;c++){const a=o[c];t.addGroup(a.start,a.count,a.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const a in l)l[a]!==void 0&&(e[a]=l[a]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const l in n){const a=n[l];e.data.attributes[l]=a.toJSON(e.data)}const i={};let s=!1;for(const l in this.morphAttributes){const a=this.morphAttributes[l],h=[];for(let u=0,f=a.length;u<f;u++){const _=a[u];h.push(_.toJSON(e.data))}h.length>0&&(i[l]=h,s=!0)}s&&(e.data.morphAttributes=i,e.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));const c=this.boundingSphere;return c!==null&&(e.data.boundingSphere=c.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone());const i=e.attributes;for(const a in i){const h=i[a];this.setAttribute(a,h.clone(t))}const s=e.morphAttributes;for(const a in s){const h=[],u=s[a];for(let f=0,_=u.length;f<_;f++)h.push(u[f].clone(t));this.morphAttributes[a]=h}this.morphTargetsRelative=e.morphTargetsRelative;const o=e.groups;for(let a=0,h=o.length;a<h;a++){const u=o[a];this.addGroup(u.start,u.count,u.materialIndex)}const c=e.boundingBox;c!==null&&(this.boundingBox=c.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Du{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=xc,this.updateRanges=[],this.version=0,this.uuid=wn()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let i=0,s=this.stride;i<s;i++)this.array[e+i]=t.array[n+i];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=wn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=wn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const en=new P;class mr{constructor(e,t,n,i=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=i}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)en.fromBufferAttribute(this,t),en.applyMatrix4(e),this.setXYZ(t,en.x,en.y,en.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)en.fromBufferAttribute(this,t),en.applyNormalMatrix(e),this.setXYZ(t,en.x,en.y,en.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)en.fromBufferAttribute(this,t),en.transformDirection(e),this.setXYZ(t,en.x,en.y,en.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=Cn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=_t(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=_t(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=_t(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=_t(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=_t(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=Cn(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=Cn(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=Cn(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=Cn(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=_t(t,this.array),n=_t(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=_t(t,this.array),n=_t(n,this.array),i=_t(i,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this}setXYZW(e,t,n,i,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=_t(t,this.array),n=_t(n,this.array),i=_t(i,this.array),s=_t(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this.data.array[e+3]=s,this}clone(e){if(e===void 0){Mo("InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[i+s])}return new Rt(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new mr(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){Mo("InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[i+s])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}let ip=0;class Ln extends Ei{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:ip++}),this.uuid=wn(),this.name="",this.type="Material",this.blending=gs,this.side=ai,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=La,this.blendDst=Ia,this.blendEquation=Di,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new ce(0,0,0),this.blendAlpha=0,this.depthFunc=vs,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Ul,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Ki,this.stencilZFail=Ki,this.stencilZPass=Ki,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){ze(`Material: parameter '${t}' has value of undefined.`);continue}const i=this[t];if(i===void 0){ze(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==gs&&(n.blending=this.blending),this.side!==ai&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==La&&(n.blendSrc=this.blendSrc),this.blendDst!==Ia&&(n.blendDst=this.blendDst),this.blendEquation!==Di&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==vs&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Ul&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Ki&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Ki&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Ki&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.allowOverride===!1&&(n.allowOverride=!1),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(s){const o=[];for(const c in s){const l=s[c];delete l.metadata,o.push(l)}return o}if(t){const s=i(e.textures),o=i(e.images);s.length>0&&(n.textures=s),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const i=t.length;n=new Array(i);for(let s=0;s!==i;++s)n[s]=t[s].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class bi extends Ln{constructor(e){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new ce(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}let rs;const Gs=new P,os=new P,as=new P,cs=new re,Vs=new re,Nu=new Qe,Nr=new P,Hs=new P,Ur=new P,Zl=new re,ia=new re,$l=new re;class Ni extends bt{constructor(e=new bi){if(super(),this.isSprite=!0,this.type="Sprite",rs===void 0){rs=new wt;const t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new Du(t,5);rs.setIndex([0,1,2,0,2,3]),rs.setAttribute("position",new mr(n,3,0,!1)),rs.setAttribute("uv",new mr(n,2,3,!1))}this.geometry=rs,this.material=e,this.center=new re(.5,.5),this.count=1}raycast(e,t){e.camera===null&&Xe('Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),os.setFromMatrixScale(this.matrixWorld),Nu.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),as.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&os.multiplyScalar(-as.z);const n=this.material.rotation;let i,s;n!==0&&(s=Math.cos(n),i=Math.sin(n));const o=this.center;Fr(Nr.set(-.5,-.5,0),as,o,os,i,s),Fr(Hs.set(.5,-.5,0),as,o,os,i,s),Fr(Ur.set(.5,.5,0),as,o,os,i,s),Zl.set(0,0),ia.set(1,0),$l.set(1,1);let c=e.ray.intersectTriangle(Nr,Hs,Ur,!1,Gs);if(c===null&&(Fr(Hs.set(-.5,.5,0),as,o,os,i,s),ia.set(0,1),c=e.ray.intersectTriangle(Nr,Ur,Hs,!1,Gs),c===null))return;const l=e.ray.origin.distanceTo(Gs);l<e.near||l>e.far||t.push({distance:l,point:Gs.clone(),uv:vn.getInterpolation(Gs,Nr,Hs,Ur,Zl,ia,$l,new re),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}}function Fr(r,e,t,n,i,s){cs.subVectors(r,t).addScalar(.5).multiply(n),i!==void 0?(Vs.x=s*cs.x-i*cs.y,Vs.y=i*cs.x+s*cs.y):Vs.copy(cs),r.copy(e),r.x+=Vs.x,r.y+=Vs.y,r.applyMatrix4(Nu)}const ni=new P,sa=new P,Or=new P,vi=new P,ra=new P,Br=new P,oa=new P;class vr{constructor(e=new P,t=new P(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,ni)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=ni.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(ni.copy(this.origin).addScaledVector(this.direction,t),ni.distanceToSquared(e))}distanceSqToSegment(e,t,n,i){sa.copy(e).add(t).multiplyScalar(.5),Or.copy(t).sub(e).normalize(),vi.copy(this.origin).sub(sa);const s=e.distanceTo(t)*.5,o=-this.direction.dot(Or),c=vi.dot(this.direction),l=-vi.dot(Or),a=vi.lengthSq(),h=Math.abs(1-o*o);let u,f,_,d;if(h>0)if(u=o*l-c,f=o*c-l,d=s*h,u>=0)if(f>=-d)if(f<=d){const g=1/h;u*=g,f*=g,_=u*(u+o*f+2*c)+f*(o*u+f+2*l)+a}else f=s,u=Math.max(0,-(o*f+c)),_=-u*u+f*(f+2*l)+a;else f=-s,u=Math.max(0,-(o*f+c)),_=-u*u+f*(f+2*l)+a;else f<=-d?(u=Math.max(0,-(-o*s+c)),f=u>0?-s:Math.min(Math.max(-s,-l),s),_=-u*u+f*(f+2*l)+a):f<=d?(u=0,f=Math.min(Math.max(-s,-l),s),_=f*(f+2*l)+a):(u=Math.max(0,-(o*s+c)),f=u>0?s:Math.min(Math.max(-s,-l),s),_=-u*u+f*(f+2*l)+a);else f=o>0?-s:s,u=Math.max(0,-(o*f+c)),_=-u*u+f*(f+2*l)+a;return n&&n.copy(this.origin).addScaledVector(this.direction,u),i&&i.copy(sa).addScaledVector(Or,f),_}intersectSphere(e,t){ni.subVectors(e.center,this.origin);const n=ni.dot(this.direction),i=ni.dot(ni)-n*n,s=e.radius*e.radius;if(i>s)return null;const o=Math.sqrt(s-i),c=n-o,l=n+o;return l<0?null:c<0?this.at(l,t):this.at(c,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,i,s,o,c,l;const a=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,f=this.origin;return a>=0?(n=(e.min.x-f.x)*a,i=(e.max.x-f.x)*a):(n=(e.max.x-f.x)*a,i=(e.min.x-f.x)*a),h>=0?(s=(e.min.y-f.y)*h,o=(e.max.y-f.y)*h):(s=(e.max.y-f.y)*h,o=(e.min.y-f.y)*h),n>o||s>i||((s>n||isNaN(n))&&(n=s),(o<i||isNaN(i))&&(i=o),u>=0?(c=(e.min.z-f.z)*u,l=(e.max.z-f.z)*u):(c=(e.max.z-f.z)*u,l=(e.min.z-f.z)*u),n>l||c>i)||((c>n||n!==n)&&(n=c),(l<i||i!==i)&&(i=l),i<0)?null:this.at(n>=0?n:i,t)}intersectsBox(e){return this.intersectBox(e,ni)!==null}intersectTriangle(e,t,n,i,s){ra.subVectors(t,e),Br.subVectors(n,e),oa.crossVectors(ra,Br);let o=this.direction.dot(oa),c;if(o>0){if(i)return null;c=1}else if(o<0)c=-1,o=-o;else return null;vi.subVectors(this.origin,e);const l=c*this.direction.dot(Br.crossVectors(vi,Br));if(l<0)return null;const a=c*this.direction.dot(ra.cross(vi));if(a<0||l+a>o)return null;const h=-c*vi.dot(oa);return h<0?null:this.at(h/o,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Ct extends Ln{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new ce(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new li,this.combine=_u,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const Ql=new Qe,Pi=new vr,zr=new jn,eh=new P,kr=new P,Gr=new P,Vr=new P,aa=new P,Hr=new P,th=new P,Wr=new P;class z extends bt{constructor(e=new wt,t=new Ct){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=i.length;s<o;s++){const c=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[c]=s}}}}getVertexPosition(e,t){const n=this.geometry,i=n.attributes.position,s=n.morphAttributes.position,o=n.morphTargetsRelative;t.fromBufferAttribute(i,e);const c=this.morphTargetInfluences;if(s&&c){Hr.set(0,0,0);for(let l=0,a=s.length;l<a;l++){const h=c[l],u=s[l];h!==0&&(aa.fromBufferAttribute(u,e),o?Hr.addScaledVector(aa,h):Hr.addScaledVector(aa.sub(t),h))}t.add(Hr)}return t}raycast(e,t){const n=this.geometry,i=this.material,s=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),zr.copy(n.boundingSphere),zr.applyMatrix4(s),Pi.copy(e.ray).recast(e.near),!(zr.containsPoint(Pi.origin)===!1&&(Pi.intersectSphere(zr,eh)===null||Pi.origin.distanceToSquared(eh)>(e.far-e.near)**2))&&(Ql.copy(s).invert(),Pi.copy(e.ray).applyMatrix4(Ql),!(n.boundingBox!==null&&Pi.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,Pi)))}_computeIntersections(e,t,n){let i;const s=this.geometry,o=this.material,c=s.index,l=s.attributes.position,a=s.attributes.uv,h=s.attributes.uv1,u=s.attributes.normal,f=s.groups,_=s.drawRange;if(c!==null)if(Array.isArray(o))for(let d=0,g=f.length;d<g;d++){const p=f[d],m=o[p.materialIndex],x=Math.max(p.start,_.start),v=Math.min(c.count,Math.min(p.start+p.count,_.start+_.count));for(let y=x,b=v;y<b;y+=3){const S=c.getX(y),w=c.getX(y+1),M=c.getX(y+2);i=Xr(this,m,e,n,a,h,u,S,w,M),i&&(i.faceIndex=Math.floor(y/3),i.face.materialIndex=p.materialIndex,t.push(i))}}else{const d=Math.max(0,_.start),g=Math.min(c.count,_.start+_.count);for(let p=d,m=g;p<m;p+=3){const x=c.getX(p),v=c.getX(p+1),y=c.getX(p+2);i=Xr(this,o,e,n,a,h,u,x,v,y),i&&(i.faceIndex=Math.floor(p/3),t.push(i))}}else if(l!==void 0)if(Array.isArray(o))for(let d=0,g=f.length;d<g;d++){const p=f[d],m=o[p.materialIndex],x=Math.max(p.start,_.start),v=Math.min(l.count,Math.min(p.start+p.count,_.start+_.count));for(let y=x,b=v;y<b;y+=3){const S=y,w=y+1,M=y+2;i=Xr(this,m,e,n,a,h,u,S,w,M),i&&(i.faceIndex=Math.floor(y/3),i.face.materialIndex=p.materialIndex,t.push(i))}}else{const d=Math.max(0,_.start),g=Math.min(l.count,_.start+_.count);for(let p=d,m=g;p<m;p+=3){const x=p,v=p+1,y=p+2;i=Xr(this,o,e,n,a,h,u,x,v,y),i&&(i.faceIndex=Math.floor(p/3),t.push(i))}}}}function sp(r,e,t,n,i,s,o,c){let l;if(e.side===Yt?l=n.intersectTriangle(o,s,i,!0,c):l=n.intersectTriangle(i,s,o,e.side===ai,c),l===null)return null;Wr.copy(c),Wr.applyMatrix4(r.matrixWorld);const a=t.ray.origin.distanceTo(Wr);return a<t.near||a>t.far?null:{distance:a,point:Wr.clone(),object:r}}function Xr(r,e,t,n,i,s,o,c,l,a){r.getVertexPosition(c,kr),r.getVertexPosition(l,Gr),r.getVertexPosition(a,Vr);const h=sp(r,e,t,n,kr,Gr,Vr,th);if(h){const u=new P;vn.getBarycoord(th,kr,Gr,Vr,u),i&&(h.uv=vn.getInterpolatedAttribute(i,c,l,a,u,new re)),s&&(h.uv1=vn.getInterpolatedAttribute(s,c,l,a,u,new re)),o&&(h.normal=vn.getInterpolatedAttribute(o,c,l,a,u,new P),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const f={a:c,b:l,c:a,normal:new P,materialIndex:0};vn.getNormal(kr,Gr,Vr,f.normal),h.face=f,h.barycoord=u}return h}const Ws=new xt,nh=new xt,ih=new xt,rp=new xt,sh=new Qe,qr=new P,ca=new jn,rh=new Qe,la=new vr;class op extends z{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=Dl,this.bindMatrix=new Qe,this.bindMatrixInverse=new Qe,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){const e=this.geometry;this.boundingBox===null&&(this.boundingBox=new Kn),this.boundingBox.makeEmpty();const t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,qr),this.boundingBox.expandByPoint(qr)}computeBoundingSphere(){const e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new jn),this.boundingSphere.makeEmpty();const t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,qr),this.boundingSphere.expandByPoint(qr)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}raycast(e,t){const n=this.material,i=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),ca.copy(this.boundingSphere),ca.applyMatrix4(i),e.ray.intersectsSphere(ca)!==!1&&(rh.copy(i).invert(),la.copy(e.ray).applyMatrix4(rh),!(this.boundingBox!==null&&la.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(e,t,la)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){const e=new xt,t=this.geometry.attributes.skinWeight;for(let n=0,i=t.count;n<i;n++){e.fromBufferAttribute(t,n);const s=1/e.manhattanLength();s!==1/0?e.multiplyScalar(s):e.set(1,0,0,0),t.setXYZW(n,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===Dl?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===ad?this.bindMatrixInverse.copy(this.bindMatrix).invert():ze("SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(e,t){const n=this.skeleton,i=this.geometry;nh.fromBufferAttribute(i.attributes.skinIndex,e),ih.fromBufferAttribute(i.attributes.skinWeight,e),t.isVector4?(Ws.copy(t),t.set(0,0,0,0)):(Ws.set(...t,1),t.set(0,0,0)),Ws.applyMatrix4(this.bindMatrix);for(let s=0;s<4;s++){const o=ih.getComponent(s);if(o!==0){const c=nh.getComponent(s);sh.multiplyMatrices(n.bones[c].matrixWorld,n.boneInverses[c]),t.addScaledVector(rp.copy(Ws).applyMatrix4(sh),o)}}return t.isVector4&&(t.w=Ws.w),t.applyMatrix4(this.bindMatrixInverse)}}class Uu extends bt{constructor(){super(),this.isBone=!0,this.type="Bone"}}class tl extends Vt{constructor(e=null,t=1,n=1,i,s,o,c,l,a=zt,h=zt,u,f){super(null,o,c,l,a,h,i,s,u,f),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const oh=new Qe,ap=new Qe;class nl{constructor(e=[],t=[]){this.uuid=wn(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.previousBoneMatrices=null,this.boneTexture=null,this.init()}init(){const e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){ze("Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,i=this.bones.length;n<i;n++)this.boneInverses.push(new Qe)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){const n=new Qe;this.bones[e]&&n.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&n.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){const e=this.bones,t=this.boneInverses,n=this.boneMatrices,i=this.boneTexture;for(let s=0,o=e.length;s<o;s++){const c=e[s]?e[s].matrixWorld:ap;oh.multiplyMatrices(c,t[s]),oh.toArray(n,s*16)}i!==null&&(i.needsUpdate=!0)}clone(){return new nl(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);const t=new Float32Array(e*e*4);t.set(this.boneMatrices);const n=new tl(t,e,e,bn,Sn);return n.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=n,this}getBoneByName(e){for(let t=0,n=this.bones.length;t<n;t++){const i=this.bones[t];if(i.name===e)return i}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let n=0,i=e.bones.length;n<i;n++){const s=e.bones[n];let o=t[s];o===void 0&&(ze("Skeleton: No bone found with UUID:",s),o=new Uu),this.bones.push(o),this.boneInverses.push(new Qe().fromArray(e.boneInverses[n]))}return this.init(),this}toJSON(){const e={metadata:{version:4.7,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;const t=this.bones,n=this.boneInverses;for(let i=0,s=t.length;i<s;i++){const o=t[i];e.bones.push(o.uuid);const c=n[i];e.boneInverses.push(c.toArray())}return e}}class yc extends Rt{constructor(e,t,n,i=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=i}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const ls=new Qe,ah=new Qe,Yr=[],ch=new Kn,cp=new Qe,Xs=new z,qs=new jn;class tn extends z{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new yc(new Float32Array(n*16),16),this.previousInstanceMatrix=null,this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let i=0;i<n;i++)this.setMatrixAt(i,cp)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new Kn),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,ls),ch.copy(e.boundingBox).applyMatrix4(ls),this.boundingBox.union(ch)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new jn),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,ls),qs.copy(e.boundingSphere).applyMatrix4(ls),this.boundingSphere.union(qs)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.previousInstanceMatrix!==null&&(this.previousInstanceMatrix=e.previousInstanceMatrix.clone()),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){return this.instanceColor===null?t.setRGB(1,1,1):t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){return t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){const n=t.morphTargetInfluences,i=this.morphTexture.source.data.data,s=n.length+1,o=e*s+1;for(let c=0;c<n.length;c++)n[c]=i[o+c]}raycast(e,t){const n=this.matrixWorld,i=this.count;if(Xs.geometry=this.geometry,Xs.material=this.material,Xs.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),qs.copy(this.boundingSphere),qs.applyMatrix4(n),e.ray.intersectsSphere(qs)!==!1))for(let s=0;s<i;s++){this.getMatrixAt(s,ls),ah.multiplyMatrices(n,ls),Xs.matrixWorld=ah,Xs.raycast(e,Yr);for(let o=0,c=Yr.length;o<c;o++){const l=Yr[o];l.instanceId=s,l.object=this,t.push(l)}Yr.length=0}}setColorAt(e,t){return this.instanceColor===null&&(this.instanceColor=new yc(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3),this}setMatrixAt(e,t){return t.toArray(this.instanceMatrix.array,e*16),this}setMorphAt(e,t){const n=t.morphTargetInfluences,i=n.length+1;this.morphTexture===null&&(this.morphTexture=new tl(new Float32Array(i*this.count),i,this.count,Xc,Sn));const s=this.morphTexture.source.data.data;let o=0;for(let a=0;a<n.length;a++)o+=n[a];const c=this.geometry.morphTargetsRelative?1:1-o,l=i*e;return s[l]=c,s.set(n,l+1),this}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}}const ha=new P,lp=new P,hp=new it;class Si{constructor(e=new P(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,i){return this.normal.set(e,t,n),this.constant=i,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const i=ha.subVectors(n,t).cross(lp.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(i,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,n=!0){const i=e.delta(ha),s=this.normal.dot(i);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const o=-(e.start.dot(this.normal)+this.constant)/s;return n===!0&&(o<0||o>1)?null:t.copy(e.start).addScaledVector(i,o)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||hp.getNormalMatrix(e),i=this.coplanarPoint(ha).applyMatrix4(e),s=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Li=new jn,up=new re(.5,.5),Kr=new P;class il{constructor(e=new Si,t=new Si,n=new Si,i=new Si,s=new Si,o=new Si){this.planes=[e,t,n,i,s,o]}set(e,t,n,i,s,o){const c=this.planes;return c[0].copy(e),c[1].copy(t),c[2].copy(n),c[3].copy(i),c[4].copy(s),c[5].copy(o),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=Hn,n=!1){const i=this.planes,s=e.elements,o=s[0],c=s[1],l=s[2],a=s[3],h=s[4],u=s[5],f=s[6],_=s[7],d=s[8],g=s[9],p=s[10],m=s[11],x=s[12],v=s[13],y=s[14],b=s[15];if(i[0].setComponents(a-o,_-h,m-d,b-x).normalize(),i[1].setComponents(a+o,_+h,m+d,b+x).normalize(),i[2].setComponents(a+c,_+u,m+g,b+v).normalize(),i[3].setComponents(a-c,_-u,m-g,b-v).normalize(),n)i[4].setComponents(l,f,p,y).normalize(),i[5].setComponents(a-l,_-f,m-p,b-y).normalize();else if(i[4].setComponents(a-l,_-f,m-p,b-y).normalize(),t===Hn)i[5].setComponents(a+l,_+f,m+p,b+y).normalize();else if(t===dr)i[5].setComponents(l,f,p,y).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Li.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Li.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Li)}intersectsSprite(e){Li.center.set(0,0,0);const t=up.distanceTo(e.center);return Li.radius=.7071067811865476+t,Li.applyMatrix4(e.matrixWorld),this.intersectsSphere(Li)}intersectsSphere(e){const t=this.planes,n=e.center,i=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(n)<i)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const i=t[n];if(Kr.x=i.normal.x>0?e.max.x:e.min.x,Kr.y=i.normal.y>0?e.max.y:e.min.y,Kr.z=i.normal.z>0?e.max.z:e.min.z,i.distanceToPoint(Kr)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class Fu extends Ln{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new ce(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const bo=new P,wo=new P,lh=new Qe,Ys=new vr,jr=new jn,ua=new P,hh=new P;class sl extends bt{constructor(e=new wt,t=new Fu){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[0];for(let i=1,s=t.count;i<s;i++)bo.fromBufferAttribute(t,i-1),wo.fromBufferAttribute(t,i),n[i]=n[i-1],n[i]+=bo.distanceTo(wo);e.setAttribute("lineDistance",new Je(n,1))}else ze("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const n=this.geometry,i=this.matrixWorld,s=e.params.Line.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),jr.copy(n.boundingSphere),jr.applyMatrix4(i),jr.radius+=s,e.ray.intersectsSphere(jr)===!1)return;lh.copy(i).invert(),Ys.copy(e.ray).applyMatrix4(lh);const c=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=c*c,a=this.isLineSegments?2:1,h=n.index,f=n.attributes.position;if(h!==null){const _=Math.max(0,o.start),d=Math.min(h.count,o.start+o.count);for(let g=_,p=d-1;g<p;g+=a){const m=h.getX(g),x=h.getX(g+1),v=Jr(this,e,Ys,l,m,x,g);v&&t.push(v)}if(this.isLineLoop){const g=h.getX(d-1),p=h.getX(_),m=Jr(this,e,Ys,l,g,p,d-1);m&&t.push(m)}}else{const _=Math.max(0,o.start),d=Math.min(f.count,o.start+o.count);for(let g=_,p=d-1;g<p;g+=a){const m=Jr(this,e,Ys,l,g,g+1,g);m&&t.push(m)}if(this.isLineLoop){const g=Jr(this,e,Ys,l,d-1,_,d-1);g&&t.push(g)}}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=i.length;s<o;s++){const c=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[c]=s}}}}}function Jr(r,e,t,n,i,s,o){const c=r.geometry.attributes.position;if(bo.fromBufferAttribute(c,i),wo.fromBufferAttribute(c,s),t.distanceSqToSegment(bo,wo,ua,hh)>n)return;ua.applyMatrix4(r.matrixWorld);const a=e.ray.origin.distanceTo(ua);if(!(a<e.near||a>e.far))return{distance:a,point:hh.clone().applyMatrix4(r.matrixWorld),index:o,face:null,faceIndex:null,barycoord:null,object:r}}const uh=new P,fh=new P;class fp extends sl{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[];for(let i=0,s=t.count;i<s;i+=2)uh.fromBufferAttribute(t,i),fh.fromBufferAttribute(t,i+1),n[i]=i===0?0:n[i-1],n[i+1]=n[i]+uh.distanceTo(fh);e.setAttribute("lineDistance",new Je(n,1))}else ze("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class dp extends sl{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type="LineLoop"}}class rl extends Ln{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new ce(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const dh=new Qe,Mc=new vr,Zr=new jn,$r=new P;class Ou extends bt{constructor(e=new wt,t=new rl){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){const n=this.geometry,i=this.matrixWorld,s=e.params.Points.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Zr.copy(n.boundingSphere),Zr.applyMatrix4(i),Zr.radius+=s,e.ray.intersectsSphere(Zr)===!1)return;dh.copy(i).invert(),Mc.copy(e.ray).applyMatrix4(dh);const c=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=c*c,a=n.index,u=n.attributes.position;if(a!==null){const f=Math.max(0,o.start),_=Math.min(a.count,o.start+o.count);for(let d=f,g=_;d<g;d++){const p=a.getX(d);$r.fromBufferAttribute(u,p),ph($r,p,l,i,e,t,this)}}else{const f=Math.max(0,o.start),_=Math.min(u.count,o.start+o.count);for(let d=f,g=_;d<g;d++)$r.fromBufferAttribute(u,d),ph($r,d,l,i,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=i.length;s<o;s++){const c=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[c]=s}}}}}function ph(r,e,t,n,i,s,o){const c=Mc.distanceSqToPoint(r);if(c<t){const l=new P;Mc.closestPointToPoint(r,l),l.applyMatrix4(n);const a=i.ray.origin.distanceTo(l);if(a<i.near||a>i.far)return;s.push({distance:a,distanceToRay:Math.sqrt(c),point:l,index:e,face:null,faceIndex:null,barycoord:null,object:o})}}class Bu extends Vt{constructor(e=[],t=zi,n,i,s,o,c,l,a,h){super(e,t,n,i,s,o,c,l,a,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class In extends Vt{constructor(e,t,n,i,s,o,c,l,a){super(e,t,n,i,s,o,c,l,a),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Ss extends Vt{constructor(e,t,n=Yn,i,s,o,c=zt,l=zt,a,h=ci,u=1){if(h!==ci&&h!==Fi)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const f={width:e,height:t,depth:u};super(f,i,s,o,c,l,h,n,a),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Qc(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}class pp extends Ss{constructor(e,t=Yn,n=zi,i,s,o=zt,c=zt,l,a=ci){const h={width:e,height:e,depth:1},u=[h,h,h,h,h,h];super(e,e,t,n,i,s,o,c,l,a),this.image=u,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}}class zu extends Vt{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class de extends wt{constructor(e=1,t=1,n=1,i=1,s=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:i,heightSegments:s,depthSegments:o};const c=this;i=Math.floor(i),s=Math.floor(s),o=Math.floor(o);const l=[],a=[],h=[],u=[];let f=0,_=0;d("z","y","x",-1,-1,n,t,e,o,s,0),d("z","y","x",1,-1,n,t,-e,o,s,1),d("x","z","y",1,1,e,n,t,i,o,2),d("x","z","y",1,-1,e,n,-t,i,o,3),d("x","y","z",1,-1,e,t,n,i,s,4),d("x","y","z",-1,-1,e,t,-n,i,s,5),this.setIndex(l),this.setAttribute("position",new Je(a,3)),this.setAttribute("normal",new Je(h,3)),this.setAttribute("uv",new Je(u,2));function d(g,p,m,x,v,y,b,S,w,M,T){const A=y/w,L=b/M,I=y/2,N=b/2,B=S/2,U=w+1,O=M+1;let k=0,J=0;const ae=new P;for(let pe=0;pe<O;pe++){const Ee=pe*L-N;for(let Ue=0;Ue<U;Ue++){const et=Ue*A-I;ae[g]=et*x,ae[p]=Ee*v,ae[m]=B,a.push(ae.x,ae.y,ae.z),ae[g]=0,ae[p]=0,ae[m]=S>0?1:-1,h.push(ae.x,ae.y,ae.z),u.push(Ue/w),u.push(1-pe/M),k+=1}}for(let pe=0;pe<M;pe++)for(let Ee=0;Ee<w;Ee++){const Ue=f+Ee+U*pe,et=f+Ee+U*(pe+1),nt=f+(Ee+1)+U*(pe+1),Ye=f+(Ee+1)+U*pe;l.push(Ue,et,Ye),l.push(et,nt,Ye),J+=6}c.addGroup(_,J,T),_+=J,f+=k}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new de(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}class Ti extends wt{constructor(e=1,t=1,n=4,i=8,s=1){super(),this.type="CapsuleGeometry",this.parameters={radius:e,height:t,capSegments:n,radialSegments:i,heightSegments:s},t=Math.max(0,t),n=Math.max(1,Math.floor(n)),i=Math.max(3,Math.floor(i)),s=Math.max(1,Math.floor(s));const o=[],c=[],l=[],a=[],h=t/2,u=Math.PI/2*e,f=t,_=2*u+f,d=n*2+s,g=i+1,p=new P,m=new P;for(let x=0;x<=d;x++){let v=0,y=0,b=0,S=0;if(x<=n){const T=x/n,A=T*Math.PI/2;y=-h-e*Math.cos(A),b=e*Math.sin(A),S=-e*Math.cos(A),v=T*u}else if(x<=n+s){const T=(x-n)/s;y=-h+T*t,b=e,S=0,v=u+T*f}else{const T=(x-n-s)/n,A=T*Math.PI/2;y=h+e*Math.sin(A),b=e*Math.cos(A),S=e*Math.sin(A),v=u+f+T*u}const w=Math.max(0,Math.min(1,v/_));let M=0;x===0?M=.5/i:x===d&&(M=-.5/i);for(let T=0;T<=i;T++){const A=T/i,L=A*Math.PI*2,I=Math.sin(L),N=Math.cos(L);m.x=-b*N,m.y=y,m.z=b*I,c.push(m.x,m.y,m.z),p.set(-b*N,S,b*I),p.normalize(),l.push(p.x,p.y,p.z),a.push(A+M,w)}if(x>0){const T=(x-1)*g;for(let A=0;A<i;A++){const L=T+A,I=T+A+1,N=x*g+A,B=x*g+A+1;o.push(L,I,N),o.push(I,B,N)}}}this.setIndex(o),this.setAttribute("position",new Je(c,3)),this.setAttribute("normal",new Je(l,3)),this.setAttribute("uv",new Je(a,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ti(e.radius,e.height,e.capSegments,e.radialSegments,e.heightSegments)}}class ol extends wt{constructor(e=1,t=32,n=0,i=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:n,thetaLength:i},t=Math.max(3,t);const s=[],o=[],c=[],l=[],a=new P,h=new re;o.push(0,0,0),c.push(0,0,1),l.push(.5,.5);for(let u=0,f=3;u<=t;u++,f+=3){const _=n+u/t*i;a.x=e*Math.cos(_),a.y=e*Math.sin(_),o.push(a.x,a.y,a.z),c.push(0,0,1),h.x=(o[f]/e+1)/2,h.y=(o[f+1]/e+1)/2,l.push(h.x,h.y)}for(let u=1;u<=t;u++)s.push(u,u+1,0);this.setIndex(s),this.setAttribute("position",new Je(o,3)),this.setAttribute("normal",new Je(c,3)),this.setAttribute("uv",new Je(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ol(e.radius,e.segments,e.thetaStart,e.thetaLength)}}class Me extends wt{constructor(e=1,t=1,n=1,i=32,s=1,o=!1,c=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:i,heightSegments:s,openEnded:o,thetaStart:c,thetaLength:l};const a=this;i=Math.floor(i),s=Math.floor(s);const h=[],u=[],f=[],_=[];let d=0;const g=[],p=n/2;let m=0;x(),o===!1&&(e>0&&v(!0),t>0&&v(!1)),this.setIndex(h),this.setAttribute("position",new Je(u,3)),this.setAttribute("normal",new Je(f,3)),this.setAttribute("uv",new Je(_,2));function x(){const y=new P,b=new P;let S=0;const w=(t-e)/n;for(let M=0;M<=s;M++){const T=[],A=M/s,L=A*(t-e)+e;for(let I=0;I<=i;I++){const N=I/i,B=N*l+c,U=Math.sin(B),O=Math.cos(B);b.x=L*U,b.y=-A*n+p,b.z=L*O,u.push(b.x,b.y,b.z),y.set(U,w,O).normalize(),f.push(y.x,y.y,y.z),_.push(N,1-A),T.push(d++)}g.push(T)}for(let M=0;M<i;M++)for(let T=0;T<s;T++){const A=g[T][M],L=g[T+1][M],I=g[T+1][M+1],N=g[T][M+1];(e>0||T!==0)&&(h.push(A,L,N),S+=3),(t>0||T!==s-1)&&(h.push(L,I,N),S+=3)}a.addGroup(m,S,0),m+=S}function v(y){const b=d,S=new re,w=new P;let M=0;const T=y===!0?e:t,A=y===!0?1:-1;for(let I=1;I<=i;I++)u.push(0,p*A,0),f.push(0,A,0),_.push(.5,.5),d++;const L=d;for(let I=0;I<=i;I++){const B=I/i*l+c,U=Math.cos(B),O=Math.sin(B);w.x=T*O,w.y=p*A,w.z=T*U,u.push(w.x,w.y,w.z),f.push(0,A,0),S.x=U*.5+.5,S.y=O*.5*A+.5,_.push(S.x,S.y),d++}for(let I=0;I<i;I++){const N=b+I,B=L+I;y===!0?h.push(B,B+1,N):h.push(B+1,B,N),M+=3}a.addGroup(m,M,y===!0?1:2),m+=M}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Me(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class qt extends Me{constructor(e=1,t=1,n=32,i=1,s=!1,o=0,c=Math.PI*2){super(0,e,t,n,i,s,o,c),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:n,heightSegments:i,openEnded:s,thetaStart:o,thetaLength:c}}static fromJSON(e){return new qt(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class yr extends wt{constructor(e=[],t=[],n=1,i=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:n,detail:i};const s=[],o=[];c(i),a(n),h(),this.setAttribute("position",new Je(s,3)),this.setAttribute("normal",new Je(s.slice(),3)),this.setAttribute("uv",new Je(o,2)),i===0?this.computeVertexNormals():this.normalizeNormals();function c(x){const v=new P,y=new P,b=new P;for(let S=0;S<t.length;S+=3)_(t[S+0],v),_(t[S+1],y),_(t[S+2],b),l(v,y,b,x)}function l(x,v,y,b){const S=b+1,w=[];for(let M=0;M<=S;M++){w[M]=[];const T=x.clone().lerp(y,M/S),A=v.clone().lerp(y,M/S),L=S-M;for(let I=0;I<=L;I++)I===0&&M===S?w[M][I]=T:w[M][I]=T.clone().lerp(A,I/L)}for(let M=0;M<S;M++)for(let T=0;T<2*(S-M)-1;T++){const A=Math.floor(T/2);T%2===0?(f(w[M][A+1]),f(w[M+1][A]),f(w[M][A])):(f(w[M][A+1]),f(w[M+1][A+1]),f(w[M+1][A]))}}function a(x){const v=new P;for(let y=0;y<s.length;y+=3)v.x=s[y+0],v.y=s[y+1],v.z=s[y+2],v.normalize().multiplyScalar(x),s[y+0]=v.x,s[y+1]=v.y,s[y+2]=v.z}function h(){const x=new P;for(let v=0;v<s.length;v+=3){x.x=s[v+0],x.y=s[v+1],x.z=s[v+2];const y=p(x)/2/Math.PI+.5,b=m(x)/Math.PI+.5;o.push(y,1-b)}d(),u()}function u(){for(let x=0;x<o.length;x+=6){const v=o[x+0],y=o[x+2],b=o[x+4],S=Math.max(v,y,b),w=Math.min(v,y,b);S>.9&&w<.1&&(v<.2&&(o[x+0]+=1),y<.2&&(o[x+2]+=1),b<.2&&(o[x+4]+=1))}}function f(x){s.push(x.x,x.y,x.z)}function _(x,v){const y=x*3;v.x=e[y+0],v.y=e[y+1],v.z=e[y+2]}function d(){const x=new P,v=new P,y=new P,b=new P,S=new re,w=new re,M=new re;for(let T=0,A=0;T<s.length;T+=9,A+=6){x.set(s[T+0],s[T+1],s[T+2]),v.set(s[T+3],s[T+4],s[T+5]),y.set(s[T+6],s[T+7],s[T+8]),S.set(o[A+0],o[A+1]),w.set(o[A+2],o[A+3]),M.set(o[A+4],o[A+5]),b.copy(x).add(v).add(y).divideScalar(3);const L=p(b);g(S,A+0,x,L),g(w,A+2,v,L),g(M,A+4,y,L)}}function g(x,v,y,b){b<0&&x.x===1&&(o[v]=x.x-1),y.x===0&&y.z===0&&(o[v]=b/2/Math.PI+.5)}function p(x){return Math.atan2(x.z,-x.x)}function m(x){return Math.atan2(-x.y,Math.sqrt(x.x*x.x+x.z*x.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new yr(e.vertices,e.indices,e.radius,e.detail)}}class Rn extends yr{constructor(e=1,t=0){const n=(1+Math.sqrt(5))/2,i=1/n,s=[-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-i,-n,0,-i,n,0,i,-n,0,i,n,-i,-n,0,-i,n,0,i,-n,0,i,n,0,-n,0,-i,n,0,-i,-n,0,i,n,0,i],o=[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9];super(s,o,e,t),this.type="DodecahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new Rn(e.radius,e.detail)}}class Jn{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){ze("Curve: .getPoint() not implemented.")}getPointAt(e,t){const n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){const e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const t=[];let n,i=this.getPoint(0),s=0;t.push(0);for(let o=1;o<=e;o++)n=this.getPoint(o/e),s+=n.distanceTo(i),t.push(s),i=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){const n=this.getLengths();let i=0;const s=n.length;let o;t?o=t:o=e*n[s-1];let c=0,l=s-1,a;for(;c<=l;)if(i=Math.floor(c+(l-c)/2),a=n[i]-o,a<0)c=i+1;else if(a>0)l=i-1;else{l=i;break}if(i=l,n[i]===o)return i/(s-1);const h=n[i],f=n[i+1]-h,_=(o-h)/f;return(i+_)/(s-1)}getTangent(e,t){let i=e-1e-4,s=e+1e-4;i<0&&(i=0),s>1&&(s=1);const o=this.getPoint(i),c=this.getPoint(s),l=t||(o.isVector2?new re:new P);return l.copy(c).sub(o).normalize(),l}getTangentAt(e,t){const n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t=!1){const n=new P,i=[],s=[],o=[],c=new P,l=new Qe;for(let _=0;_<=e;_++){const d=_/e;i[_]=this.getTangentAt(d,new P)}s[0]=new P,o[0]=new P;let a=Number.MAX_VALUE;const h=Math.abs(i[0].x),u=Math.abs(i[0].y),f=Math.abs(i[0].z);h<=a&&(a=h,n.set(1,0,0)),u<=a&&(a=u,n.set(0,1,0)),f<=a&&n.set(0,0,1),c.crossVectors(i[0],n).normalize(),s[0].crossVectors(i[0],c),o[0].crossVectors(i[0],s[0]);for(let _=1;_<=e;_++){if(s[_]=s[_-1].clone(),o[_]=o[_-1].clone(),c.crossVectors(i[_-1],i[_]),c.length()>Number.EPSILON){c.normalize();const d=Math.acos(lt(i[_-1].dot(i[_]),-1,1));s[_].applyMatrix4(l.makeRotationAxis(c,d))}o[_].crossVectors(i[_],s[_])}if(t===!0){let _=Math.acos(lt(s[0].dot(s[e]),-1,1));_/=e,i[0].dot(c.crossVectors(s[0],s[e]))>0&&(_=-_);for(let d=1;d<=e;d++)s[d].applyMatrix4(l.makeRotationAxis(i[d],_*d)),o[d].crossVectors(i[d],s[d])}return{tangents:i,normals:s,binormals:o}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){const e={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}}class al extends Jn{constructor(e=0,t=0,n=1,i=1,s=0,o=Math.PI*2,c=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=i,this.aStartAngle=s,this.aEndAngle=o,this.aClockwise=c,this.aRotation=l}getPoint(e,t=new re){const n=t,i=Math.PI*2;let s=this.aEndAngle-this.aStartAngle;const o=Math.abs(s)<Number.EPSILON;for(;s<0;)s+=i;for(;s>i;)s-=i;s<Number.EPSILON&&(o?s=0:s=i),this.aClockwise===!0&&!o&&(s===i?s=-i:s=s-i);const c=this.aStartAngle+e*s;let l=this.aX+this.xRadius*Math.cos(c),a=this.aY+this.yRadius*Math.sin(c);if(this.aRotation!==0){const h=Math.cos(this.aRotation),u=Math.sin(this.aRotation),f=l-this.aX,_=a-this.aY;l=f*h-_*u+this.aX,a=f*u+_*h+this.aY}return n.set(l,a)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){const e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}}class mp extends al{constructor(e,t,n,i,s,o){super(e,t,n,n,i,s,o),this.isArcCurve=!0,this.type="ArcCurve"}}function cl(){let r=0,e=0,t=0,n=0;function i(s,o,c,l){r=s,e=c,t=-3*s+3*o-2*c-l,n=2*s-2*o+c+l}return{initCatmullRom:function(s,o,c,l,a){i(o,c,a*(c-s),a*(l-o))},initNonuniformCatmullRom:function(s,o,c,l,a,h,u){let f=(o-s)/a-(c-s)/(a+h)+(c-o)/h,_=(c-o)/h-(l-o)/(h+u)+(l-c)/u;f*=h,_*=h,i(o,c,f,_)},calc:function(s){const o=s*s,c=o*s;return r+e*s+t*o+n*c}}}const mh=new P,gh=new P,fa=new cl,da=new cl,pa=new cl;class Wn extends Jn{constructor(e=[],t=!1,n="centripetal",i=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=n,this.tension=i}getPoint(e,t=new P){const n=t,i=this.points,s=i.length,o=(s-(this.closed?0:1))*e;let c=Math.floor(o),l=o-c;this.closed?c+=c>0?0:(Math.floor(Math.abs(c)/s)+1)*s:l===0&&c===s-1&&(c=s-2,l=1);let a,h;this.closed||c>0?a=i[(c-1)%s]:(gh.subVectors(i[0],i[1]).add(i[0]),a=gh);const u=i[c%s],f=i[(c+1)%s];if(this.closed||c+2<s?h=i[(c+2)%s]:(mh.subVectors(i[s-1],i[s-2]).add(i[s-1]),h=mh),this.curveType==="centripetal"||this.curveType==="chordal"){const _=this.curveType==="chordal"?.5:.25;let d=Math.pow(a.distanceToSquared(u),_),g=Math.pow(u.distanceToSquared(f),_),p=Math.pow(f.distanceToSquared(h),_);g<1e-4&&(g=1),d<1e-4&&(d=g),p<1e-4&&(p=g),fa.initNonuniformCatmullRom(a.x,u.x,f.x,h.x,d,g,p),da.initNonuniformCatmullRom(a.y,u.y,f.y,h.y,d,g,p),pa.initNonuniformCatmullRom(a.z,u.z,f.z,h.z,d,g,p)}else this.curveType==="catmullrom"&&(fa.initCatmullRom(a.x,u.x,f.x,h.x,this.tension),da.initCatmullRom(a.y,u.y,f.y,h.y,this.tension),pa.initCatmullRom(a.z,u.z,f.z,h.z,this.tension));return n.set(fa.calc(l),da.calc(l),pa.calc(l)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const i=e.points[t];this.points.push(i.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){const i=this.points[t];e.points.push(i.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const i=e.points[t];this.points.push(new P().fromArray(i))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}}function _h(r,e,t,n,i){const s=(n-e)*.5,o=(i-t)*.5,c=r*r,l=r*c;return(2*t-2*n+s+o)*l+(-3*t+3*n-2*s-o)*c+s*r+t}function gp(r,e){const t=1-r;return t*t*e}function _p(r,e){return 2*(1-r)*r*e}function xp(r,e){return r*r*e}function rr(r,e,t,n){return gp(r,e)+_p(r,t)+xp(r,n)}function vp(r,e){const t=1-r;return t*t*t*e}function yp(r,e){const t=1-r;return 3*t*t*r*e}function Mp(r,e){return 3*(1-r)*r*r*e}function Sp(r,e){return r*r*r*e}function or(r,e,t,n,i){return vp(r,e)+yp(r,t)+Mp(r,n)+Sp(r,i)}class ku extends Jn{constructor(e=new re,t=new re,n=new re,i=new re){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=n,this.v3=i}getPoint(e,t=new re){const n=t,i=this.v0,s=this.v1,o=this.v2,c=this.v3;return n.set(or(e,i.x,s.x,o.x,c.x),or(e,i.y,s.y,o.y,c.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class bp extends Jn{constructor(e=new P,t=new P,n=new P,i=new P){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=n,this.v3=i}getPoint(e,t=new P){const n=t,i=this.v0,s=this.v1,o=this.v2,c=this.v3;return n.set(or(e,i.x,s.x,o.x,c.x),or(e,i.y,s.y,o.y,c.y),or(e,i.z,s.z,o.z,c.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class Gu extends Jn{constructor(e=new re,t=new re){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new re){const n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new re){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class wp extends Jn{constructor(e=new P,t=new P){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new P){const n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new P){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Vu extends Jn{constructor(e=new re,t=new re,n=new re){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new re){const n=t,i=this.v0,s=this.v1,o=this.v2;return n.set(rr(e,i.x,s.x,o.x),rr(e,i.y,s.y,o.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Hu extends Jn{constructor(e=new P,t=new P,n=new P){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new P){const n=t,i=this.v0,s=this.v1,o=this.v2;return n.set(rr(e,i.x,s.x,o.x),rr(e,i.y,s.y,o.y),rr(e,i.z,s.z,o.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Wu extends Jn{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new re){const n=t,i=this.points,s=(i.length-1)*e,o=Math.floor(s),c=s-o,l=i[o===0?o:o-1],a=i[o],h=i[o>i.length-2?i.length-1:o+1],u=i[o>i.length-3?i.length-1:o+2];return n.set(_h(c,l.x,a.x,h.x,u.x),_h(c,l.y,a.y,h.y,u.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const i=e.points[t];this.points.push(i.clone())}return this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){const i=this.points[t];e.points.push(i.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const i=e.points[t];this.points.push(new re().fromArray(i))}return this}}var To=Object.freeze({__proto__:null,ArcCurve:mp,CatmullRomCurve3:Wn,CubicBezierCurve:ku,CubicBezierCurve3:bp,EllipseCurve:al,LineCurve:Gu,LineCurve3:wp,QuadraticBezierCurve:Vu,QuadraticBezierCurve3:Hu,SplineCurve:Wu});class Tp extends Jn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){const e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){const n=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new To[n](t,e))}return this}getPoint(e,t){const n=e*this.getLength(),i=this.getCurveLengths();let s=0;for(;s<i.length;){if(i[s]>=n){const o=i[s]-n,c=this.curves[s],l=c.getLength(),a=l===0?0:1-o/l;return c.getPointAt(a,t)}s++}return null}getLength(){const e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const e=[];let t=0;for(let n=0,i=this.curves.length;n<i;n++)t+=this.curves[n].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){const t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){const t=[];let n;for(let i=0,s=this.curves;i<s.length;i++){const o=s[i],c=o.isEllipseCurve?e*2:o.isLineCurve||o.isLineCurve3?1:o.isSplineCurve?e*o.points.length:e,l=o.getPoints(c);for(let a=0;a<l.length;a++){const h=l[a];n&&n.equals(h)||(t.push(h),n=h)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){const i=e.curves[t];this.curves.push(i.clone())}return this.autoClose=e.autoClose,this}toJSON(){const e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,n=this.curves.length;t<n;t++){const i=this.curves[t];e.curves.push(i.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){const i=e.curves[t];this.curves.push(new To[i.type]().fromJSON(i))}return this}}class Sc extends Tp{constructor(e){super(),this.type="Path",this.currentPoint=new re,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,n=e.length;t<n;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){const n=new Gu(this.currentPoint.clone(),new re(e,t));return this.curves.push(n),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,n,i){const s=new Vu(this.currentPoint.clone(),new re(e,t),new re(n,i));return this.curves.push(s),this.currentPoint.set(n,i),this}bezierCurveTo(e,t,n,i,s,o){const c=new ku(this.currentPoint.clone(),new re(e,t),new re(n,i),new re(s,o));return this.curves.push(c),this.currentPoint.set(s,o),this}splineThru(e){const t=[this.currentPoint.clone()].concat(e),n=new Wu(t);return this.curves.push(n),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,n,i,s,o){const c=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(e+c,t+l,n,i,s,o),this}absarc(e,t,n,i,s,o){return this.absellipse(e,t,n,n,i,s,o),this}ellipse(e,t,n,i,s,o,c,l){const a=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(e+a,t+h,n,i,s,o,c,l),this}absellipse(e,t,n,i,s,o,c,l){const a=new al(e,t,n,i,s,o,c,l);if(this.curves.length>0){const u=a.getPoint(0);u.equals(this.currentPoint)||this.lineTo(u.x,u.y)}this.curves.push(a);const h=a.getPoint(1);return this.currentPoint.copy(h),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){const e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}}class yn extends Sc{constructor(e){super(e),this.uuid=wn(),this.type="Shape",this.holes=[]}getPointsHoles(e){const t=[];for(let n=0,i=this.holes.length;n<i;n++)t[n]=this.holes[n].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){const i=e.holes[t];this.holes.push(i.clone())}return this}toJSON(){const e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,n=this.holes.length;t<n;t++){const i=this.holes[t];e.holes.push(i.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){const i=e.holes[t];this.holes.push(new Sc().fromJSON(i))}return this}}function Ep(r,e,t=2){const n=e&&e.length,i=n?e[0]*t:r.length;let s=Xu(r,0,i,t,!0);const o=[];if(!s||s.next===s.prev)return o;let c,l,a;if(n&&(s=Lp(r,e,s,t)),r.length>80*t){c=r[0],l=r[1];let h=c,u=l;for(let f=t;f<i;f+=t){const _=r[f],d=r[f+1];_<c&&(c=_),d<l&&(l=d),_>h&&(h=_),d>u&&(u=d)}a=Math.max(h-c,u-l),a=a!==0?32767/a:0}return gr(s,o,t,c,l,a,0),o}function Xu(r,e,t,n,i){let s;if(i===Vp(r,e,t,n)>0)for(let o=e;o<t;o+=n)s=xh(o/n|0,r[o],r[o+1],s);else for(let o=t-n;o>=e;o-=n)s=xh(o/n|0,r[o],r[o+1],s);return s&&bs(s,s.next)&&(xr(s),s=s.next),s}function Vi(r,e){if(!r)return r;e||(e=r);let t=r,n;do if(n=!1,!t.steiner&&(bs(t,t.next)||Pt(t.prev,t,t.next)===0)){if(xr(t),t=e=t.prev,t===t.next)break;n=!0}else t=t.next;while(n||t!==e);return e}function gr(r,e,t,n,i,s,o){if(!r)return;!o&&s&&Fp(r,n,i,s);let c=r;for(;r.prev!==r.next;){const l=r.prev,a=r.next;if(s?Cp(r,n,i,s):Ap(r)){e.push(l.i,r.i,a.i),xr(r),r=a.next,c=a.next;continue}if(r=a,r===c){o?o===1?(r=Rp(Vi(r),e),gr(r,e,t,n,i,s,2)):o===2&&Pp(r,e,t,n,i,s):gr(Vi(r),e,t,n,i,s,1);break}}}function Ap(r){const e=r.prev,t=r,n=r.next;if(Pt(e,t,n)>=0)return!1;const i=e.x,s=t.x,o=n.x,c=e.y,l=t.y,a=n.y,h=Math.min(i,s,o),u=Math.min(c,l,a),f=Math.max(i,s,o),_=Math.max(c,l,a);let d=n.next;for(;d!==e;){if(d.x>=h&&d.x<=f&&d.y>=u&&d.y<=_&&er(i,c,s,l,o,a,d.x,d.y)&&Pt(d.prev,d,d.next)>=0)return!1;d=d.next}return!0}function Cp(r,e,t,n){const i=r.prev,s=r,o=r.next;if(Pt(i,s,o)>=0)return!1;const c=i.x,l=s.x,a=o.x,h=i.y,u=s.y,f=o.y,_=Math.min(c,l,a),d=Math.min(h,u,f),g=Math.max(c,l,a),p=Math.max(h,u,f),m=bc(_,d,e,t,n),x=bc(g,p,e,t,n);let v=r.prevZ,y=r.nextZ;for(;v&&v.z>=m&&y&&y.z<=x;){if(v.x>=_&&v.x<=g&&v.y>=d&&v.y<=p&&v!==i&&v!==o&&er(c,h,l,u,a,f,v.x,v.y)&&Pt(v.prev,v,v.next)>=0||(v=v.prevZ,y.x>=_&&y.x<=g&&y.y>=d&&y.y<=p&&y!==i&&y!==o&&er(c,h,l,u,a,f,y.x,y.y)&&Pt(y.prev,y,y.next)>=0))return!1;y=y.nextZ}for(;v&&v.z>=m;){if(v.x>=_&&v.x<=g&&v.y>=d&&v.y<=p&&v!==i&&v!==o&&er(c,h,l,u,a,f,v.x,v.y)&&Pt(v.prev,v,v.next)>=0)return!1;v=v.prevZ}for(;y&&y.z<=x;){if(y.x>=_&&y.x<=g&&y.y>=d&&y.y<=p&&y!==i&&y!==o&&er(c,h,l,u,a,f,y.x,y.y)&&Pt(y.prev,y,y.next)>=0)return!1;y=y.nextZ}return!0}function Rp(r,e){let t=r;do{const n=t.prev,i=t.next.next;!bs(n,i)&&Yu(n,t,t.next,i)&&_r(n,i)&&_r(i,n)&&(e.push(n.i,t.i,i.i),xr(t),xr(t.next),t=r=i),t=t.next}while(t!==r);return Vi(t)}function Pp(r,e,t,n,i,s){let o=r;do{let c=o.next.next;for(;c!==o.prev;){if(o.i!==c.i&&zp(o,c)){let l=Ku(o,c);o=Vi(o,o.next),l=Vi(l,l.next),gr(o,e,t,n,i,s,0),gr(l,e,t,n,i,s,0);return}c=c.next}o=o.next}while(o!==r)}function Lp(r,e,t,n){const i=[];for(let s=0,o=e.length;s<o;s++){const c=e[s]*n,l=s<o-1?e[s+1]*n:r.length,a=Xu(r,c,l,n,!1);a===a.next&&(a.steiner=!0),i.push(Bp(a))}i.sort(Ip);for(let s=0;s<i.length;s++)t=Dp(i[s],t);return t}function Ip(r,e){let t=r.x-e.x;if(t===0&&(t=r.y-e.y,t===0)){const n=(r.next.y-r.y)/(r.next.x-r.x),i=(e.next.y-e.y)/(e.next.x-e.x);t=n-i}return t}function Dp(r,e){const t=Np(r,e);if(!t)return e;const n=Ku(t,r);return Vi(n,n.next),Vi(t,t.next)}function Np(r,e){let t=e;const n=r.x,i=r.y;let s=-1/0,o;if(bs(r,t))return t;do{if(bs(r,t.next))return t.next;if(i<=t.y&&i>=t.next.y&&t.next.y!==t.y){const u=t.x+(i-t.y)*(t.next.x-t.x)/(t.next.y-t.y);if(u<=n&&u>s&&(s=u,o=t.x<t.next.x?t:t.next,u===n))return o}t=t.next}while(t!==e);if(!o)return null;const c=o,l=o.x,a=o.y;let h=1/0;t=o;do{if(n>=t.x&&t.x>=l&&n!==t.x&&qu(i<a?n:s,i,l,a,i<a?s:n,i,t.x,t.y)){const u=Math.abs(i-t.y)/(n-t.x);_r(t,r)&&(u<h||u===h&&(t.x>o.x||t.x===o.x&&Up(o,t)))&&(o=t,h=u)}t=t.next}while(t!==c);return o}function Up(r,e){return Pt(r.prev,r,e.prev)<0&&Pt(e.next,r,r.next)<0}function Fp(r,e,t,n){let i=r;do i.z===0&&(i.z=bc(i.x,i.y,e,t,n)),i.prevZ=i.prev,i.nextZ=i.next,i=i.next;while(i!==r);i.prevZ.nextZ=null,i.prevZ=null,Op(i)}function Op(r){let e,t=1;do{let n=r,i;r=null;let s=null;for(e=0;n;){e++;let o=n,c=0;for(let a=0;a<t&&(c++,o=o.nextZ,!!o);a++);let l=t;for(;c>0||l>0&&o;)c!==0&&(l===0||!o||n.z<=o.z)?(i=n,n=n.nextZ,c--):(i=o,o=o.nextZ,l--),s?s.nextZ=i:r=i,i.prevZ=s,s=i;n=o}s.nextZ=null,t*=2}while(e>1);return r}function bc(r,e,t,n,i){return r=(r-t)*i|0,e=(e-n)*i|0,r=(r|r<<8)&16711935,r=(r|r<<4)&252645135,r=(r|r<<2)&858993459,r=(r|r<<1)&1431655765,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,r|e<<1}function Bp(r){let e=r,t=r;do(e.x<t.x||e.x===t.x&&e.y<t.y)&&(t=e),e=e.next;while(e!==r);return t}function qu(r,e,t,n,i,s,o,c){return(i-o)*(e-c)>=(r-o)*(s-c)&&(r-o)*(n-c)>=(t-o)*(e-c)&&(t-o)*(s-c)>=(i-o)*(n-c)}function er(r,e,t,n,i,s,o,c){return!(r===o&&e===c)&&qu(r,e,t,n,i,s,o,c)}function zp(r,e){return r.next.i!==e.i&&r.prev.i!==e.i&&!kp(r,e)&&(_r(r,e)&&_r(e,r)&&Gp(r,e)&&(Pt(r.prev,r,e.prev)||Pt(r,e.prev,e))||bs(r,e)&&Pt(r.prev,r,r.next)>0&&Pt(e.prev,e,e.next)>0)}function Pt(r,e,t){return(e.y-r.y)*(t.x-e.x)-(e.x-r.x)*(t.y-e.y)}function bs(r,e){return r.x===e.x&&r.y===e.y}function Yu(r,e,t,n){const i=eo(Pt(r,e,t)),s=eo(Pt(r,e,n)),o=eo(Pt(t,n,r)),c=eo(Pt(t,n,e));return!!(i!==s&&o!==c||i===0&&Qr(r,t,e)||s===0&&Qr(r,n,e)||o===0&&Qr(t,r,n)||c===0&&Qr(t,e,n))}function Qr(r,e,t){return e.x<=Math.max(r.x,t.x)&&e.x>=Math.min(r.x,t.x)&&e.y<=Math.max(r.y,t.y)&&e.y>=Math.min(r.y,t.y)}function eo(r){return r>0?1:r<0?-1:0}function kp(r,e){let t=r;do{if(t.i!==r.i&&t.next.i!==r.i&&t.i!==e.i&&t.next.i!==e.i&&Yu(t,t.next,r,e))return!0;t=t.next}while(t!==r);return!1}function _r(r,e){return Pt(r.prev,r,r.next)<0?Pt(r,e,r.next)>=0&&Pt(r,r.prev,e)>=0:Pt(r,e,r.prev)<0||Pt(r,r.next,e)<0}function Gp(r,e){let t=r,n=!1;const i=(r.x+e.x)/2,s=(r.y+e.y)/2;do t.y>s!=t.next.y>s&&t.next.y!==t.y&&i<(t.next.x-t.x)*(s-t.y)/(t.next.y-t.y)+t.x&&(n=!n),t=t.next;while(t!==r);return n}function Ku(r,e){const t=wc(r.i,r.x,r.y),n=wc(e.i,e.x,e.y),i=r.next,s=e.prev;return r.next=e,e.prev=r,t.next=i,i.prev=t,n.next=t,t.prev=n,s.next=n,n.prev=s,n}function xh(r,e,t,n){const i=wc(r,e,t);return n?(i.next=n.next,i.prev=n,n.next.prev=i,n.next=i):(i.prev=i,i.next=i),i}function xr(r){r.next.prev=r.prev,r.prev.next=r.next,r.prevZ&&(r.prevZ.nextZ=r.nextZ),r.nextZ&&(r.nextZ.prevZ=r.prevZ)}function wc(r,e,t){return{i:r,x:e,y:t,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function Vp(r,e,t,n){let i=0;for(let s=e,o=t-n;s<t;s+=n)i+=(r[o]-r[s])*(r[s+1]+r[o+1]),o=s;return i}class Hp{static triangulate(e,t,n=2){return Ep(e,t,n)}}class si{static area(e){const t=e.length;let n=0;for(let i=t-1,s=0;s<t;i=s++)n+=e[i].x*e[s].y-e[s].x*e[i].y;return n*.5}static isClockWise(e){return si.area(e)<0}static triangulateShape(e,t){const n=[],i=[],s=[];vh(e),yh(n,e);let o=e.length;t.forEach(vh);for(let l=0;l<t.length;l++)i.push(o),o+=t[l].length,yh(n,t[l]);const c=Hp.triangulate(n,i);for(let l=0;l<c.length;l+=3)s.push(c.slice(l,l+3));return s}}function vh(r){const e=r.length;e>2&&r[e-1].equals(r[0])&&r.pop()}function yh(r,e){for(let t=0;t<e.length;t++)r.push(e[t].x),r.push(e[t].y)}class Bi extends wt{constructor(e=new yn([new re(.5,.5),new re(-.5,.5),new re(-.5,-.5),new re(.5,-.5)]),t={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:e,options:t},e=Array.isArray(e)?e:[e];const n=this,i=[],s=[];for(let c=0,l=e.length;c<l;c++){const a=e[c];o(a)}this.setAttribute("position",new Je(i,3)),this.setAttribute("uv",new Je(s,2)),this.computeVertexNormals();function o(c){const l=[],a=t.curveSegments!==void 0?t.curveSegments:12,h=t.steps!==void 0?t.steps:1,u=t.depth!==void 0?t.depth:1;let f=t.bevelEnabled!==void 0?t.bevelEnabled:!0,_=t.bevelThickness!==void 0?t.bevelThickness:.2,d=t.bevelSize!==void 0?t.bevelSize:_-.1,g=t.bevelOffset!==void 0?t.bevelOffset:0,p=t.bevelSegments!==void 0?t.bevelSegments:3;const m=t.extrudePath,x=t.UVGenerator!==void 0?t.UVGenerator:Wp;let v,y=!1,b,S,w,M;if(m){v=m.getSpacedPoints(h),y=!0,f=!1;const te=m.isCatmullRomCurve3?m.closed:!1;b=m.computeFrenetFrames(h,te),S=new P,w=new P,M=new P}f||(p=0,_=0,d=0,g=0);const T=c.extractPoints(a);let A=T.shape;const L=T.holes;if(!si.isClockWise(A)){A=A.reverse();for(let te=0,ue=L.length;te<ue;te++){const ie=L[te];si.isClockWise(ie)&&(L[te]=ie.reverse())}}function N(te){const ie=10000000000000001e-36;let be=te[0];for(let Se=1;Se<=te.length;Se++){const Ke=Se%te.length,D=te[Ke],Z=D.x-be.x,ee=D.y-be.y,Pe=Z*Z+ee*ee,ne=Math.max(Math.abs(D.x),Math.abs(D.y),Math.abs(be.x),Math.abs(be.y)),Ze=ie*ne*ne;if(Pe<=Ze){te.splice(Ke,1),Se--;continue}be=D}}N(A),L.forEach(N);const B=L.length,U=A;for(let te=0;te<B;te++){const ue=L[te];A=A.concat(ue)}function O(te,ue,ie){return ue||Xe("ExtrudeGeometry: vec does not exist"),te.clone().addScaledVector(ue,ie)}const k=A.length;function J(te,ue,ie){let be,Se,Ke;const D=te.x-ue.x,Z=te.y-ue.y,ee=ie.x-te.x,Pe=ie.y-te.y,ne=D*D+Z*Z,Ze=D*Pe-Z*ee;if(Math.abs(Ze)>Number.EPSILON){const R=Math.sqrt(ne),E=Math.sqrt(ee*ee+Pe*Pe),V=ue.x-Z/R,K=ue.y+D/R,se=ie.x-Pe/E,fe=ie.y+ee/E,ge=((se-V)*Pe-(fe-K)*ee)/(D*Pe-Z*ee);be=V+D*ge-te.x,Se=K+Z*ge-te.y;const q=be*be+Se*Se;if(q<=2)return new re(be,Se);Ke=Math.sqrt(q/2)}else{let R=!1;D>Number.EPSILON?ee>Number.EPSILON&&(R=!0):D<-Number.EPSILON?ee<-Number.EPSILON&&(R=!0):Math.sign(Z)===Math.sign(Pe)&&(R=!0),R?(be=-Z,Se=D,Ke=Math.sqrt(ne)):(be=D,Se=Z,Ke=Math.sqrt(ne/2))}return new re(be/Ke,Se/Ke)}const ae=[];for(let te=0,ue=U.length,ie=ue-1,be=te+1;te<ue;te++,ie++,be++)ie===ue&&(ie=0),be===ue&&(be=0),ae[te]=J(U[te],U[ie],U[be]);const pe=[];let Ee,Ue=ae.concat();for(let te=0,ue=B;te<ue;te++){const ie=L[te];Ee=[];for(let be=0,Se=ie.length,Ke=Se-1,D=be+1;be<Se;be++,Ke++,D++)Ke===Se&&(Ke=0),D===Se&&(D=0),Ee[be]=J(ie[be],ie[Ke],ie[D]);pe.push(Ee),Ue=Ue.concat(Ee)}let et;if(p===0)et=si.triangulateShape(U,L);else{const te=[],ue=[];for(let ie=0;ie<p;ie++){const be=ie/p,Se=_*Math.cos(be*Math.PI/2),Ke=d*Math.sin(be*Math.PI/2)+g;for(let D=0,Z=U.length;D<Z;D++){const ee=O(U[D],ae[D],Ke);Fe(ee.x,ee.y,-Se),be===0&&te.push(ee)}for(let D=0,Z=B;D<Z;D++){const ee=L[D];Ee=pe[D];const Pe=[];for(let ne=0,Ze=ee.length;ne<Ze;ne++){const R=O(ee[ne],Ee[ne],Ke);Fe(R.x,R.y,-Se),be===0&&Pe.push(R)}be===0&&ue.push(Pe)}}et=si.triangulateShape(te,ue)}const nt=et.length,Ye=d+g;for(let te=0;te<k;te++){const ue=f?O(A[te],Ue[te],Ye):A[te];y?(w.copy(b.normals[0]).multiplyScalar(ue.x),S.copy(b.binormals[0]).multiplyScalar(ue.y),M.copy(v[0]).add(w).add(S),Fe(M.x,M.y,M.z)):Fe(ue.x,ue.y,0)}for(let te=1;te<=h;te++)for(let ue=0;ue<k;ue++){const ie=f?O(A[ue],Ue[ue],Ye):A[ue];y?(w.copy(b.normals[te]).multiplyScalar(ie.x),S.copy(b.binormals[te]).multiplyScalar(ie.y),M.copy(v[te]).add(w).add(S),Fe(M.x,M.y,M.z)):Fe(ie.x,ie.y,u/h*te)}for(let te=p-1;te>=0;te--){const ue=te/p,ie=_*Math.cos(ue*Math.PI/2),be=d*Math.sin(ue*Math.PI/2)+g;for(let Se=0,Ke=U.length;Se<Ke;Se++){const D=O(U[Se],ae[Se],be);Fe(D.x,D.y,u+ie)}for(let Se=0,Ke=L.length;Se<Ke;Se++){const D=L[Se];Ee=pe[Se];for(let Z=0,ee=D.length;Z<ee;Z++){const Pe=O(D[Z],Ee[Z],be);y?Fe(Pe.x,Pe.y+v[h-1].y,v[h-1].x+ie):Fe(Pe.x,Pe.y,u+ie)}}}Q(),we();function Q(){const te=i.length/3;if(f){let ue=0,ie=k*ue;for(let be=0;be<nt;be++){const Se=et[be];qe(Se[2]+ie,Se[1]+ie,Se[0]+ie)}ue=h+p*2,ie=k*ue;for(let be=0;be<nt;be++){const Se=et[be];qe(Se[0]+ie,Se[1]+ie,Se[2]+ie)}}else{for(let ue=0;ue<nt;ue++){const ie=et[ue];qe(ie[2],ie[1],ie[0])}for(let ue=0;ue<nt;ue++){const ie=et[ue];qe(ie[0]+k*h,ie[1]+k*h,ie[2]+k*h)}}n.addGroup(te,i.length/3-te,0)}function we(){const te=i.length/3;let ue=0;me(U,ue),ue+=U.length;for(let ie=0,be=L.length;ie<be;ie++){const Se=L[ie];me(Se,ue),ue+=Se.length}n.addGroup(te,i.length/3-te,1)}function me(te,ue){let ie=te.length;for(;--ie>=0;){const be=ie;let Se=ie-1;Se<0&&(Se=te.length-1);for(let Ke=0,D=h+p*2;Ke<D;Ke++){const Z=k*Ke,ee=k*(Ke+1),Pe=ue+be+Z,ne=ue+Se+Z,Ze=ue+Se+ee,R=ue+be+ee;Oe(Pe,ne,Ze,R)}}}function Fe(te,ue,ie){l.push(te),l.push(ue),l.push(ie)}function qe(te,ue,ie){$e(te),$e(ue),$e(ie);const be=i.length/3,Se=x.generateTopUV(n,i,be-3,be-2,be-1);We(Se[0]),We(Se[1]),We(Se[2])}function Oe(te,ue,ie,be){$e(te),$e(ue),$e(be),$e(ue),$e(ie),$e(be);const Se=i.length/3,Ke=x.generateSideWallUV(n,i,Se-6,Se-3,Se-2,Se-1);We(Ke[0]),We(Ke[1]),We(Ke[3]),We(Ke[1]),We(Ke[2]),We(Ke[3])}function $e(te){i.push(l[te*3+0]),i.push(l[te*3+1]),i.push(l[te*3+2])}function We(te){s.push(te.x),s.push(te.y)}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){const e=super.toJSON(),t=this.parameters.shapes,n=this.parameters.options;return Xp(t,n,e)}static fromJSON(e,t){const n=[];for(let s=0,o=e.shapes.length;s<o;s++){const c=t[e.shapes[s]];n.push(c)}const i=e.options.extrudePath;return i!==void 0&&(e.options.extrudePath=new To[i.type]().fromJSON(i)),new Bi(n,e.options)}}const Wp={generateTopUV:function(r,e,t,n,i){const s=e[t*3],o=e[t*3+1],c=e[n*3],l=e[n*3+1],a=e[i*3],h=e[i*3+1];return[new re(s,o),new re(c,l),new re(a,h)]},generateSideWallUV:function(r,e,t,n,i,s){const o=e[t*3],c=e[t*3+1],l=e[t*3+2],a=e[n*3],h=e[n*3+1],u=e[n*3+2],f=e[i*3],_=e[i*3+1],d=e[i*3+2],g=e[s*3],p=e[s*3+1],m=e[s*3+2];return Math.abs(c-h)<Math.abs(o-a)?[new re(o,1-l),new re(a,1-u),new re(f,1-d),new re(g,1-m)]:[new re(c,1-l),new re(h,1-u),new re(_,1-d),new re(p,1-m)]}};function Xp(r,e,t){if(t.shapes=[],Array.isArray(r))for(let n=0,i=r.length;n<i;n++){const s=r[n];t.shapes.push(s.uuid)}else t.shapes.push(r.uuid);return t.options=Object.assign({},e),e.extrudePath!==void 0&&(t.options.extrudePath=e.extrudePath.toJSON()),t}class hi extends yr{constructor(e=1,t=0){const n=(1+Math.sqrt(5))/2,i=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],s=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(i,s,e,t),this.type="IcosahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new hi(e.radius,e.detail)}}class je extends yr{constructor(e=1,t=0){const n=[1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],i=[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2];super(n,i,e,t),this.type="OctahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new je(e.radius,e.detail)}}class rn extends wt{constructor(e=1,t=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:i};const s=e/2,o=t/2,c=Math.floor(n),l=Math.floor(i),a=c+1,h=l+1,u=e/c,f=t/l,_=[],d=[],g=[],p=[];for(let m=0;m<h;m++){const x=m*f-o;for(let v=0;v<a;v++){const y=v*u-s;d.push(y,-x,0),g.push(0,0,1),p.push(v/c),p.push(1-m/l)}}for(let m=0;m<l;m++)for(let x=0;x<c;x++){const v=x+a*m,y=x+a*(m+1),b=x+1+a*(m+1),S=x+1+a*m;_.push(v,y,S),_.push(y,b,S)}this.setIndex(_),this.setAttribute("position",new Je(d,3)),this.setAttribute("normal",new Je(g,3)),this.setAttribute("uv",new Je(p,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new rn(e.width,e.height,e.widthSegments,e.heightSegments)}}class Hi extends wt{constructor(e=.5,t=1,n=32,i=1,s=0,o=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:n,phiSegments:i,thetaStart:s,thetaLength:o},n=Math.max(3,n),i=Math.max(1,i);const c=[],l=[],a=[],h=[];let u=e;const f=(t-e)/i,_=new P,d=new re;for(let g=0;g<=i;g++){for(let p=0;p<=n;p++){const m=s+p/n*o;_.x=u*Math.cos(m),_.y=u*Math.sin(m),l.push(_.x,_.y,_.z),a.push(0,0,1),d.x=(_.x/t+1)/2,d.y=(_.y/t+1)/2,h.push(d.x,d.y)}u+=f}for(let g=0;g<i;g++){const p=g*(n+1);for(let m=0;m<n;m++){const x=m+p,v=x,y=x+n+1,b=x+n+2,S=x+1;c.push(v,y,S),c.push(y,b,S)}}this.setIndex(c),this.setAttribute("position",new Je(l,3)),this.setAttribute("normal",new Je(a,3)),this.setAttribute("uv",new Je(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Hi(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}}class Wi extends wt{constructor(e=new yn([new re(0,.5),new re(-.5,-.5),new re(.5,-.5)]),t=12){super(),this.type="ShapeGeometry",this.parameters={shapes:e,curveSegments:t};const n=[],i=[],s=[],o=[];let c=0,l=0;if(Array.isArray(e)===!1)a(e);else for(let h=0;h<e.length;h++)a(e[h]),this.addGroup(c,l,h),c+=l,l=0;this.setIndex(n),this.setAttribute("position",new Je(i,3)),this.setAttribute("normal",new Je(s,3)),this.setAttribute("uv",new Je(o,2));function a(h){const u=i.length/3,f=h.extractPoints(t);let _=f.shape;const d=f.holes;si.isClockWise(_)===!1&&(_=_.reverse());for(let p=0,m=d.length;p<m;p++){const x=d[p];si.isClockWise(x)===!0&&(d[p]=x.reverse())}const g=si.triangulateShape(_,d);for(let p=0,m=d.length;p<m;p++){const x=d[p];_=_.concat(x)}for(let p=0,m=_.length;p<m;p++){const x=_[p];i.push(x.x,x.y,0),s.push(0,0,1),o.push(x.x,x.y)}for(let p=0,m=g.length;p<m;p++){const x=g[p],v=x[0]+u,y=x[1]+u,b=x[2]+u;n.push(v,y,b),l+=3}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){const e=super.toJSON(),t=this.parameters.shapes;return qp(t,e)}static fromJSON(e,t){const n=[];for(let i=0,s=e.shapes.length;i<s;i++){const o=t[e.shapes[i]];n.push(o)}return new Wi(n,e.curveSegments)}}function qp(r,e){if(e.shapes=[],Array.isArray(r))for(let t=0,n=r.length;t<n;t++){const i=r[t];e.shapes.push(i.uuid)}else e.shapes.push(r.uuid);return e}class he extends wt{constructor(e=1,t=32,n=16,i=0,s=Math.PI*2,o=0,c=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:i,phiLength:s,thetaStart:o,thetaLength:c},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));const l=Math.min(o+c,Math.PI);let a=0;const h=[],u=new P,f=new P,_=[],d=[],g=[],p=[];for(let m=0;m<=n;m++){const x=[],v=m/n;let y=0;m===0&&o===0?y=.5/t:m===n&&l===Math.PI&&(y=-.5/t);for(let b=0;b<=t;b++){const S=b/t;u.x=-e*Math.cos(i+S*s)*Math.sin(o+v*c),u.y=e*Math.cos(o+v*c),u.z=e*Math.sin(i+S*s)*Math.sin(o+v*c),d.push(u.x,u.y,u.z),f.copy(u).normalize(),g.push(f.x,f.y,f.z),p.push(S+y,1-v),x.push(a++)}h.push(x)}for(let m=0;m<n;m++)for(let x=0;x<t;x++){const v=h[m][x+1],y=h[m][x],b=h[m+1][x],S=h[m+1][x+1];(m!==0||o>0)&&_.push(v,y,S),(m!==n-1||l<Math.PI)&&_.push(y,b,S)}this.setIndex(_),this.setAttribute("position",new Je(d,3)),this.setAttribute("normal",new Je(g,3)),this.setAttribute("uv",new Je(p,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new he(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class He extends wt{constructor(e=1,t=.4,n=12,i=48,s=Math.PI*2,o=0,c=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:i,arc:s,thetaStart:o,thetaLength:c},n=Math.floor(n),i=Math.floor(i);const l=[],a=[],h=[],u=[],f=new P,_=new P,d=new P;for(let g=0;g<=n;g++){const p=o+g/n*c;for(let m=0;m<=i;m++){const x=m/i*s;_.x=(e+t*Math.cos(p))*Math.cos(x),_.y=(e+t*Math.cos(p))*Math.sin(x),_.z=t*Math.sin(p),a.push(_.x,_.y,_.z),f.x=e*Math.cos(x),f.y=e*Math.sin(x),d.subVectors(_,f).normalize(),h.push(d.x,d.y,d.z),u.push(m/i),u.push(g/n)}}for(let g=1;g<=n;g++)for(let p=1;p<=i;p++){const m=(i+1)*g+p-1,x=(i+1)*(g-1)+p-1,v=(i+1)*(g-1)+p,y=(i+1)*g+p;l.push(m,x,y),l.push(x,v,y)}this.setIndex(l),this.setAttribute("position",new Je(a,3)),this.setAttribute("normal",new Je(h,3)),this.setAttribute("uv",new Je(u,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new He(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}}class ll extends wt{constructor(e=1,t=.4,n=64,i=8,s=2,o=3){super(),this.type="TorusKnotGeometry",this.parameters={radius:e,tube:t,tubularSegments:n,radialSegments:i,p:s,q:o},n=Math.floor(n),i=Math.floor(i);const c=[],l=[],a=[],h=[],u=new P,f=new P,_=new P,d=new P,g=new P,p=new P,m=new P;for(let v=0;v<=n;++v){const y=v/n*s*Math.PI*2;x(y,s,o,e,_),x(y+.01,s,o,e,d),p.subVectors(d,_),m.addVectors(d,_),g.crossVectors(p,m),m.crossVectors(g,p),g.normalize(),m.normalize();for(let b=0;b<=i;++b){const S=b/i*Math.PI*2,w=-t*Math.cos(S),M=t*Math.sin(S);u.x=_.x+(w*m.x+M*g.x),u.y=_.y+(w*m.y+M*g.y),u.z=_.z+(w*m.z+M*g.z),l.push(u.x,u.y,u.z),f.subVectors(u,_).normalize(),a.push(f.x,f.y,f.z),h.push(v/n),h.push(b/i)}}for(let v=1;v<=n;v++)for(let y=1;y<=i;y++){const b=(i+1)*(v-1)+(y-1),S=(i+1)*v+(y-1),w=(i+1)*v+y,M=(i+1)*(v-1)+y;c.push(b,S,M),c.push(S,w,M)}this.setIndex(c),this.setAttribute("position",new Je(l,3)),this.setAttribute("normal",new Je(a,3)),this.setAttribute("uv",new Je(h,2));function x(v,y,b,S,w){const M=Math.cos(v),T=Math.sin(v),A=b/y*v,L=Math.cos(A);w.x=S*(2+L)*.5*M,w.y=S*(2+L)*T*.5,w.z=S*Math.sin(A)*.5}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ll(e.radius,e.tube,e.tubularSegments,e.radialSegments,e.p,e.q)}}class Pn extends wt{constructor(e=new Hu(new P(-1,-1,0),new P(-1,1,0),new P(1,1,0)),t=64,n=1,i=8,s=!1){super(),this.type="TubeGeometry",this.parameters={path:e,tubularSegments:t,radius:n,radialSegments:i,closed:s};const o=e.computeFrenetFrames(t,s);this.tangents=o.tangents,this.normals=o.normals,this.binormals=o.binormals;const c=new P,l=new P,a=new re;let h=new P;const u=[],f=[],_=[],d=[];g(),this.setIndex(d),this.setAttribute("position",new Je(u,3)),this.setAttribute("normal",new Je(f,3)),this.setAttribute("uv",new Je(_,2));function g(){for(let v=0;v<t;v++)p(v);p(s===!1?t:0),x(),m()}function p(v){h=e.getPointAt(v/t,h);const y=o.normals[v],b=o.binormals[v];for(let S=0;S<=i;S++){const w=S/i*Math.PI*2,M=Math.sin(w),T=-Math.cos(w);l.x=T*y.x+M*b.x,l.y=T*y.y+M*b.y,l.z=T*y.z+M*b.z,l.normalize(),f.push(l.x,l.y,l.z),c.x=h.x+n*l.x,c.y=h.y+n*l.y,c.z=h.z+n*l.z,u.push(c.x,c.y,c.z)}}function m(){for(let v=1;v<=t;v++)for(let y=1;y<=i;y++){const b=(i+1)*(v-1)+(y-1),S=(i+1)*v+(y-1),w=(i+1)*v+y,M=(i+1)*(v-1)+y;d.push(b,S,M),d.push(S,w,M)}}function x(){for(let v=0;v<=t;v++)for(let y=0;y<=i;y++)a.x=v/t,a.y=y/i,_.push(a.x,a.y)}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){const e=super.toJSON();return e.path=this.parameters.path.toJSON(),e}static fromJSON(e){return new Pn(new To[e.path.type]().fromJSON(e.path),e.tubularSegments,e.radius,e.radialSegments,e.closed)}}function ws(r){const e={};for(const t in r){e[t]={};for(const n in r[t]){const i=r[t][n];if(Mh(i))i.isRenderTargetTexture?(ze("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=i.clone();else if(Array.isArray(i))if(Mh(i[0])){const s=[];for(let o=0,c=i.length;o<c;o++)s[o]=i[o].clone();e[t][n]=s}else e[t][n]=i.slice();else e[t][n]=i}}return e}function nn(r){const e={};for(let t=0;t<r.length;t++){const n=ws(r[t]);for(const i in n)e[i]=n[i]}return e}function Mh(r){return r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)}function Yp(r){const e=[];for(let t=0;t<r.length;t++)e.push(r[t].clone());return e}function ju(r){const e=r.getRenderTarget();return e===null?r.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:ht.workingColorSpace}const Ts={clone:ws,merge:nn};var Kp=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,jp=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Gt extends Ln{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Kp,this.fragmentShader=jp,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=ws(e.uniforms),this.uniformsGroups=Yp(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const i in this.uniforms){const o=this.uniforms[i].value;o&&o.isTexture?t.uniforms[i]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[i]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[i]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[i]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[i]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[i]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[i]={type:"m4",value:o.toArray()}:t.uniforms[i]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}}class Ju extends Gt{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class oe extends Ln{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new ce(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new ce(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=_c,this.normalScale=new re(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new li,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class mn extends oe{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new re(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return lt(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new ce(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new ce(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new ce(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}}class Jp extends Ln{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=fd,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class Zp extends Ln{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}function to(r,e){return!r||r.constructor===e?r:typeof e.BYTES_PER_ELEMENT=="number"?new e(r):Array.prototype.slice.call(r)}function $p(r){function e(i,s){return r[i]-r[s]}const t=r.length,n=new Array(t);for(let i=0;i!==t;++i)n[i]=i;return n.sort(e),n}function Sh(r,e,t){const n=r.length,i=new r.constructor(n);for(let s=0,o=0;o!==n;++s){const c=t[s]*e;for(let l=0;l!==e;++l)i[o++]=r[c+l]}return i}function Zu(r,e,t,n){let i=1,s=r[0];for(;s!==void 0&&s[n]===void 0;)s=r[i++];if(s===void 0)return;let o=s[n];if(o!==void 0)if(Array.isArray(o))do o=s[n],o!==void 0&&(e.push(s.time),t.push(...o)),s=r[i++];while(s!==void 0);else if(o.toArray!==void 0)do o=s[n],o!==void 0&&(e.push(s.time),o.toArray(t,t.length)),s=r[i++];while(s!==void 0);else do o=s[n],o!==void 0&&(e.push(s.time),t.push(o)),s=r[i++];while(s!==void 0)}class Ps{constructor(e,t,n,i){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=i!==void 0?i:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){const t=this.parameterPositions;let n=this._cachedIndex,i=t[n],s=t[n-1];e:{t:{let o;n:{i:if(!(e<i)){for(let c=n+2;;){if(i===void 0){if(e<s)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===c)break;if(s=i,i=t[++n],e<i)break t}o=t.length;break n}if(!(e>=s)){const c=t[1];e<c&&(n=2,s=c);for(let l=n-2;;){if(s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===l)break;if(i=s,s=t[--n-1],e>=s)break t}o=n,n=0;break n}break e}for(;n<o;){const c=n+o>>>1;e<t[c]?o=c:n=c+1}if(i=t[n],s=t[n-1],s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,s,i)}return this.interpolate_(n,s,e,i)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){const t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,s=e*i;for(let o=0;o!==i;++o)t[o]=n[s+o];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}}class Qp extends Ps{constructor(e,t,n,i){super(e,t,n,i),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:ps,endingEnd:ps}}intervalChanged_(e,t,n){const i=this.parameterPositions;let s=e-2,o=e+1,c=i[s],l=i[o];if(c===void 0)switch(this.getSettings_().endingStart){case ms:s=e,c=2*t-n;break;case vo:s=i.length-2,c=t+i[s]-i[s+1];break;default:s=e,c=n}if(l===void 0)switch(this.getSettings_().endingEnd){case ms:o=e,l=2*n-t;break;case vo:o=1,l=n+i[1]-i[0];break;default:o=e-1,l=t}const a=(n-t)*.5,h=this.valueSize;this._weightPrev=a/(t-c),this._weightNext=a/(l-n),this._offsetPrev=s*h,this._offsetNext=o*h}interpolate_(e,t,n,i){const s=this.resultBuffer,o=this.sampleValues,c=this.valueSize,l=e*c,a=l-c,h=this._offsetPrev,u=this._offsetNext,f=this._weightPrev,_=this._weightNext,d=(n-t)/(i-t),g=d*d,p=g*d,m=-f*p+2*f*g-f*d,x=(1+f)*p+(-1.5-2*f)*g+(-.5+f)*d+1,v=(-1-_)*p+(1.5+_)*g+.5*d,y=_*p-_*g;for(let b=0;b!==c;++b)s[b]=m*o[h+b]+x*o[a+b]+v*o[l+b]+y*o[u+b];return s}}class $u extends Ps{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){const s=this.resultBuffer,o=this.sampleValues,c=this.valueSize,l=e*c,a=l-c,h=(n-t)/(i-t),u=1-h;for(let f=0;f!==c;++f)s[f]=o[a+f]*u+o[l+f]*h;return s}}class e0 extends Ps{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e){return this.copySampleValue_(e-1)}}class t0 extends Ps{interpolate_(e,t,n,i){const s=this.resultBuffer,o=this.sampleValues,c=this.valueSize,l=e*c,a=l-c,h=this.settings||this.DefaultSettings_,u=h.inTangents,f=h.outTangents;if(!u||!f){const g=(n-t)/(i-t),p=1-g;for(let m=0;m!==c;++m)s[m]=o[a+m]*p+o[l+m]*g;return s}const _=c*2,d=e-1;for(let g=0;g!==c;++g){const p=o[a+g],m=o[l+g],x=d*_+g*2,v=f[x],y=f[x+1],b=e*_+g*2,S=u[b],w=u[b+1];let M=(n-t)/(i-t),T,A,L,I,N;for(let B=0;B<8;B++){T=M*M,A=T*M,L=1-M,I=L*L,N=I*L;const O=N*t+3*I*M*v+3*L*T*S+A*i-n;if(Math.abs(O)<1e-10)break;const k=3*I*(v-t)+6*L*M*(S-v)+3*T*(i-S);if(Math.abs(k)<1e-10)break;M=M-O/k,M=Math.max(0,Math.min(1,M))}s[g]=N*p+3*I*M*y+3*L*T*w+A*m}return s}}class Dn{constructor(e,t,n,i){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=to(t,this.TimeBufferType),this.values=to(n,this.ValueBufferType),this.setInterpolation(i||this.DefaultInterpolation)}static toJSON(e){const t=e.constructor;let n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:to(e.times,Array),values:to(e.values,Array)};const i=e.getInterpolation();i!==e.DefaultInterpolation&&(n.interpolation=i)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new e0(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new $u(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new Qp(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodBezier(e){const t=new t0(this.times,this.values,this.getValueSize(),e);return this.settings&&(t.settings=this.settings),t}setInterpolation(e){let t;switch(e){case ur:t=this.InterpolantFactoryMethodDiscrete;break;case fr:t=this.InterpolantFactoryMethodLinear;break;case zo:t=this.InterpolantFactoryMethodSmooth;break;case Nl:t=this.InterpolantFactoryMethodBezier;break}if(t===void 0){const n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return ze("KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return ur;case this.InterpolantFactoryMethodLinear:return fr;case this.InterpolantFactoryMethodSmooth:return zo;case this.InterpolantFactoryMethodBezier:return Nl}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){const t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]+=e}return this}scale(e){if(e!==1){const t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]*=e}return this}trim(e,t){const n=this.times,i=n.length;let s=0,o=i-1;for(;s!==i&&n[s]<e;)++s;for(;o!==-1&&n[o]>t;)--o;if(++o,s!==0||o!==i){s>=o&&(o=Math.max(o,1),s=o-1);const c=this.getValueSize();this.times=n.slice(s,o),this.values=this.values.slice(s*c,o*c)}return this}validate(){let e=!0;const t=this.getValueSize();t-Math.floor(t)!==0&&(Xe("KeyframeTrack: Invalid value size in track.",this),e=!1);const n=this.times,i=this.values,s=n.length;s===0&&(Xe("KeyframeTrack: Track is empty.",this),e=!1);let o=null;for(let c=0;c!==s;c++){const l=n[c];if(typeof l=="number"&&isNaN(l)){Xe("KeyframeTrack: Time is not a valid number.",this,c,l),e=!1;break}if(o!==null&&o>l){Xe("KeyframeTrack: Out of order keys.",this,c,l,o),e=!1;break}o=l}if(i!==void 0&&Md(i))for(let c=0,l=i.length;c!==l;++c){const a=i[c];if(isNaN(a)){Xe("KeyframeTrack: Value is not a valid number.",this,c,a),e=!1;break}}return e}optimize(){const e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),i=this.getInterpolation()===zo,s=e.length-1;let o=1;for(let c=1;c<s;++c){let l=!1;const a=e[c],h=e[c+1];if(a!==h&&(c!==1||a!==e[0]))if(i)l=!0;else{const u=c*n,f=u-n,_=u+n;for(let d=0;d!==n;++d){const g=t[u+d];if(g!==t[f+d]||g!==t[_+d]){l=!0;break}}}if(l){if(c!==o){e[o]=e[c];const u=c*n,f=o*n;for(let _=0;_!==n;++_)t[f+_]=t[u+_]}++o}}if(s>0){e[o]=e[s];for(let c=s*n,l=o*n,a=0;a!==n;++a)t[l+a]=t[c+a];++o}return o!==e.length?(this.times=e.slice(0,o),this.values=t.slice(0,o*n)):(this.times=e,this.values=t),this}clone(){const e=this.times.slice(),t=this.values.slice(),n=this.constructor,i=new n(this.name,e,t);return i.createInterpolant=this.createInterpolant,i}}Dn.prototype.ValueTypeName="";Dn.prototype.TimeBufferType=Float32Array;Dn.prototype.ValueBufferType=Float32Array;Dn.prototype.DefaultInterpolation=fr;class Ls extends Dn{constructor(e,t,n){super(e,t,n)}}Ls.prototype.ValueTypeName="bool";Ls.prototype.ValueBufferType=Array;Ls.prototype.DefaultInterpolation=ur;Ls.prototype.InterpolantFactoryMethodLinear=void 0;Ls.prototype.InterpolantFactoryMethodSmooth=void 0;class Qu extends Dn{constructor(e,t,n,i){super(e,t,n,i)}}Qu.prototype.ValueTypeName="color";class Es extends Dn{constructor(e,t,n,i){super(e,t,n,i)}}Es.prototype.ValueTypeName="number";class n0 extends Ps{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){const s=this.resultBuffer,o=this.sampleValues,c=this.valueSize,l=(n-t)/(i-t);let a=e*c;for(let h=a+c;a!==h;a+=4)ln.slerpFlat(s,0,o,a-c,o,a,l);return s}}class As extends Dn{constructor(e,t,n,i){super(e,t,n,i)}InterpolantFactoryMethodLinear(e){return new n0(this.times,this.values,this.getValueSize(),e)}}As.prototype.ValueTypeName="quaternion";As.prototype.InterpolantFactoryMethodSmooth=void 0;class Is extends Dn{constructor(e,t,n){super(e,t,n)}}Is.prototype.ValueTypeName="string";Is.prototype.ValueBufferType=Array;Is.prototype.DefaultInterpolation=ur;Is.prototype.InterpolantFactoryMethodLinear=void 0;Is.prototype.InterpolantFactoryMethodSmooth=void 0;class Cs extends Dn{constructor(e,t,n,i){super(e,t,n,i)}}Cs.prototype.ValueTypeName="vector";class Tc{constructor(e="",t=-1,n=[],i=jc){this.name=e,this.tracks=n,this.duration=t,this.blendMode=i,this.uuid=wn(),this.userData={},this.duration<0&&this.resetDuration()}static parse(e){const t=[],n=e.tracks,i=1/(e.fps||1);for(let o=0,c=n.length;o!==c;++o)t.push(s0(n[o]).scale(i));const s=new this(e.name,e.duration,t,e.blendMode);return s.uuid=e.uuid,s.userData=JSON.parse(e.userData||"{}"),s}static toJSON(e){const t=[],n=e.tracks,i={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode,userData:JSON.stringify(e.userData)};for(let s=0,o=n.length;s!==o;++s)t.push(Dn.toJSON(n[s]));return i}static CreateFromMorphTargetSequence(e,t,n,i){const s=t.length,o=[];for(let c=0;c<s;c++){let l=[],a=[];l.push((c+s-1)%s,c,(c+1)%s),a.push(0,1,0);const h=$p(l);l=Sh(l,1,h),a=Sh(a,1,h),!i&&l[0]===0&&(l.push(s),a.push(a[0])),o.push(new Es(".morphTargetInfluences["+t[c].name+"]",l,a).scale(1/n))}return new this(e,-1,o)}static findByName(e,t){let n=e;if(!Array.isArray(e)){const i=e;n=i.geometry&&i.geometry.animations||i.animations}for(let i=0;i<n.length;i++)if(n[i].name===t)return n[i];return null}static CreateClipsFromMorphTargetSequences(e,t,n){const i={},s=/^([\w-]*?)([\d]+)$/;for(let c=0,l=e.length;c<l;c++){const a=e[c],h=a.name.match(s);if(h&&h.length>1){const u=h[1];let f=i[u];f||(i[u]=f=[]),f.push(a)}}const o=[];for(const c in i)o.push(this.CreateFromMorphTargetSequence(c,i[c],t,n));return o}static parseAnimation(e,t){if(ze("AnimationClip: parseAnimation() is deprecated and will be removed with r185"),!e)return Xe("AnimationClip: No animation in JSONLoader data."),null;const n=function(u,f,_,d,g){if(_.length!==0){const p=[],m=[];Zu(_,p,m,d),p.length!==0&&g.push(new u(f,p,m))}},i=[],s=e.name||"default",o=e.fps||30,c=e.blendMode;let l=e.length||-1;const a=e.hierarchy||[];for(let u=0;u<a.length;u++){const f=a[u].keys;if(!(!f||f.length===0))if(f[0].morphTargets){const _={};let d;for(d=0;d<f.length;d++)if(f[d].morphTargets)for(let g=0;g<f[d].morphTargets.length;g++)_[f[d].morphTargets[g]]=-1;for(const g in _){const p=[],m=[];for(let x=0;x!==f[d].morphTargets.length;++x){const v=f[d];p.push(v.time),m.push(v.morphTarget===g?1:0)}i.push(new Es(".morphTargetInfluence["+g+"]",p,m))}l=_.length*o}else{const _=".bones["+t[u].name+"]";n(Cs,_+".position",f,"pos",i),n(As,_+".quaternion",f,"rot",i),n(Cs,_+".scale",f,"scl",i)}}return i.length===0?null:new this(s,l,i,c)}resetDuration(){const e=this.tracks;let t=0;for(let n=0,i=e.length;n!==i;++n){const s=this.tracks[n];t=Math.max(t,s.times[s.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){const e=[];for(let n=0;n<this.tracks.length;n++)e.push(this.tracks[n].clone());const t=new this.constructor(this.name,this.duration,e,this.blendMode);return t.userData=JSON.parse(JSON.stringify(this.userData)),t}toJSON(){return this.constructor.toJSON(this)}}function i0(r){switch(r.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return Es;case"vector":case"vector2":case"vector3":case"vector4":return Cs;case"color":return Qu;case"quaternion":return As;case"bool":case"boolean":return Ls;case"string":return Is}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+r)}function s0(r){if(r.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");const e=i0(r.type);if(r.times===void 0){const t=[],n=[];Zu(r.keys,t,n,"value"),r.times=t,r.values=n}return e.parse!==void 0?e.parse(r):new e(r.name,r.times,r.values,r.interpolation)}const ri={enabled:!1,files:{},add:function(r,e){this.enabled!==!1&&(bh(r)||(this.files[r]=e))},get:function(r){if(this.enabled!==!1&&!bh(r))return this.files[r]},remove:function(r){delete this.files[r]},clear:function(){this.files={}}};function bh(r){try{const e=r.slice(r.indexOf(":")+1);return new URL(e).protocol==="blob:"}catch{return!1}}class r0{constructor(e,t,n){const i=this;let s=!1,o=0,c=0,l;const a=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this._abortController=null,this.itemStart=function(h){c++,s===!1&&i.onStart!==void 0&&i.onStart(h,o,c),s=!0},this.itemEnd=function(h){o++,i.onProgress!==void 0&&i.onProgress(h,o,c),o===c&&(s=!1,i.onLoad!==void 0&&i.onLoad())},this.itemError=function(h){i.onError!==void 0&&i.onError(h)},this.resolveURL=function(h){return l?l(h):h},this.setURLModifier=function(h){return l=h,this},this.addHandler=function(h,u){return a.push(h,u),this},this.removeHandler=function(h){const u=a.indexOf(h);return u!==-1&&a.splice(u,2),this},this.getHandler=function(h){for(let u=0,f=a.length;u<f;u+=2){const _=a[u],d=a[u+1];if(_.global&&(_.lastIndex=0),_.test(h))return d}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}}const o0=new r0;class Ds{constructor(e){this.manager=e!==void 0?e:o0,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(e,t){const n=this;return new Promise(function(i,s){n.load(e,i,t,s)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}}Ds.DEFAULT_MATERIAL_NAME="__DEFAULT";const ii={};class a0 extends Error{constructor(e,t){super(e),this.response=t}}class ef extends Ds{constructor(e){super(e),this.mimeType="",this.responseType="",this._abortController=new AbortController}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const s=ri.get(`file:${e}`);if(s!==void 0){this.manager.itemStart(e),setTimeout(()=>{t&&t(s),this.manager.itemEnd(e)},0);return}if(ii[e]!==void 0){ii[e].push({onLoad:t,onProgress:n,onError:i});return}ii[e]=[],ii[e].push({onLoad:t,onProgress:n,onError:i});const o=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin",signal:typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal}),c=this.mimeType,l=this.responseType;fetch(o).then(a=>{if(a.status===200||a.status===0){if(a.status===0&&ze("FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||a.body===void 0||a.body.getReader===void 0)return a;const h=ii[e],u=a.body.getReader(),f=a.headers.get("X-File-Size")||a.headers.get("Content-Length"),_=f?parseInt(f):0,d=_!==0;let g=0;const p=new ReadableStream({start(m){x();function x(){u.read().then(({done:v,value:y})=>{if(v)m.close();else{g+=y.byteLength;const b=new ProgressEvent("progress",{lengthComputable:d,loaded:g,total:_});for(let S=0,w=h.length;S<w;S++){const M=h[S];M.onProgress&&M.onProgress(b)}m.enqueue(y),x()}},v=>{m.error(v)})}}});return new Response(p)}else throw new a0(`fetch for "${a.url}" responded with ${a.status}: ${a.statusText}`,a)}).then(a=>{switch(l){case"arraybuffer":return a.arrayBuffer();case"blob":return a.blob();case"document":return a.text().then(h=>new DOMParser().parseFromString(h,c));case"json":return a.json();default:if(c==="")return a.text();{const u=/charset="?([^;"\s]*)"?/i.exec(c),f=u&&u[1]?u[1].toLowerCase():void 0,_=new TextDecoder(f);return a.arrayBuffer().then(d=>_.decode(d))}}}).then(a=>{ri.add(`file:${e}`,a);const h=ii[e];delete ii[e];for(let u=0,f=h.length;u<f;u++){const _=h[u];_.onLoad&&_.onLoad(a)}}).catch(a=>{const h=ii[e];if(h===void 0)throw this.manager.itemError(e),a;delete ii[e];for(let u=0,f=h.length;u<f;u++){const _=h[u];_.onError&&_.onError(a)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}}const hs=new WeakMap;class c0 extends Ds{constructor(e){super(e)}load(e,t,n,i){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const s=this,o=ri.get(`image:${e}`);if(o!==void 0){if(o.complete===!0)s.manager.itemStart(e),setTimeout(function(){t&&t(o),s.manager.itemEnd(e)},0);else{let u=hs.get(o);u===void 0&&(u=[],hs.set(o,u)),u.push({onLoad:t,onError:i})}return o}const c=pr("img");function l(){h(),t&&t(this);const u=hs.get(this)||[];for(let f=0;f<u.length;f++){const _=u[f];_.onLoad&&_.onLoad(this)}hs.delete(this),s.manager.itemEnd(e)}function a(u){h(),i&&i(u),ri.remove(`image:${e}`);const f=hs.get(this)||[];for(let _=0;_<f.length;_++){const d=f[_];d.onError&&d.onError(u)}hs.delete(this),s.manager.itemError(e),s.manager.itemEnd(e)}function h(){c.removeEventListener("load",l,!1),c.removeEventListener("error",a,!1)}return c.addEventListener("load",l,!1),c.addEventListener("error",a,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(c.crossOrigin=this.crossOrigin),ri.add(`image:${e}`,c),s.manager.itemStart(e),c.src=e,c}}class l0 extends Ds{constructor(e){super(e)}load(e,t,n,i){const s=new Vt,o=new c0(this.manager);return o.setCrossOrigin(this.crossOrigin),o.setPath(this.path),o.load(e,function(c){s.image=c,s.needsUpdate=!0,t!==void 0&&t(s)},n,i),s}}class Mr extends bt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new ce(e),this.intensity=t}dispose(){this.dispatchEvent({type:"dispose"})}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}}class h0 extends Mr{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(bt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new ce(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}toJSON(e){const t=super.toJSON(e);return t.object.groundColor=this.groundColor.getHex(),t}}const ma=new Qe,wh=new P,Th=new P;class hl{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new re(512,512),this.mapType=dn,this.map=null,this.mapPass=null,this.matrix=new Qe,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new il,this._frameExtents=new re(1,1),this._viewportCount=1,this._viewports=[new xt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,n=this.matrix;wh.setFromMatrixPosition(e.matrixWorld),t.position.copy(wh),Th.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Th),t.updateMatrixWorld(),ma.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(ma,t.coordinateSystem,t.reversedDepth),t.coordinateSystem===dr||t.reversedDepth?n.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(ma)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}const no=new P,io=new ln,Fn=new P;class tf extends bt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Qe,this.projectionMatrix=new Qe,this.projectionMatrixInverse=new Qe,this.coordinateSystem=Hn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(no,io,Fn),Fn.x===1&&Fn.y===1&&Fn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(no,io,Fn.set(1,1,1)).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorld.decompose(no,io,Fn),Fn.x===1&&Fn.y===1&&Fn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(no,io,Fn.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const yi=new P,Eh=new re,Ah=new re;class sn extends tf{constructor(e=50,t=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=Ms*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(ir*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Ms*2*Math.atan(Math.tan(ir*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){yi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(yi.x,yi.y).multiplyScalar(-e/yi.z),yi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(yi.x,yi.y).multiplyScalar(-e/yi.z)}getViewSize(e,t){return this.getViewBounds(e,Eh,Ah),t.subVectors(Ah,Eh)}setViewOffset(e,t,n,i,s,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(ir*.5*this.fov)/this.zoom,n=2*t,i=this.aspect*n,s=-.5*i;const o=this.view;if(this.view!==null&&this.view.enabled){const l=o.fullWidth,a=o.fullHeight;s+=o.offsetX*i/l,t-=o.offsetY*n/a,i*=o.width/l,n*=o.height/a}const c=this.filmOffset;c!==0&&(s+=e*c/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+i,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}class u0 extends hl{constructor(){super(new sn(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1,this.aspect=1}updateMatrices(e){const t=this.camera,n=Ms*2*e.angle*this.focus,i=this.mapSize.width/this.mapSize.height*this.aspect,s=e.distance||t.far;(n!==t.fov||i!==t.aspect||s!==t.far)&&(t.fov=n,t.aspect=i,t.far=s,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this}}class ul extends Mr{constructor(e,t,n=0,i=Math.PI/3,s=0,o=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(bt.DEFAULT_UP),this.updateMatrix(),this.target=new bt,this.distance=n,this.angle=i,this.penumbra=s,this.decay=o,this.map=null,this.shadow=new u0}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.map=e.map,this.shadow=e.shadow.clone(),this}toJSON(e){const t=super.toJSON(e);return t.object.distance=this.distance,t.object.angle=this.angle,t.object.decay=this.decay,t.object.penumbra=this.penumbra,t.object.target=this.target.uuid,this.map&&this.map.isTexture&&(t.object.map=this.map.toJSON(e).uuid),t.object.shadow=this.shadow.toJSON(),t}}class f0 extends hl{constructor(){super(new sn(90,1,.5,500)),this.isPointLightShadow=!0}}class Mn extends Mr{constructor(e,t,n=0,i=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=i,this.shadow=new f0}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}toJSON(e){const t=super.toJSON(e);return t.object.distance=this.distance,t.object.decay=this.decay,t.object.shadow=this.shadow.toJSON(),t}}class Sr extends tf{constructor(e=-1,t=1,n=1,i=-1,s=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=i,this.near=s,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,i,s,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2;let s=n-e,o=n+e,c=i+t,l=i-t;if(this.view!==null&&this.view.enabled){const a=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=a*this.view.offsetX,o=s+a*this.view.width,c-=h*this.view.offsetY,l=c-h*this.view.height}this.projectionMatrix.makeOrthographic(s,o,c,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class d0 extends hl{constructor(){super(new Sr(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Ec extends Mr{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(bt.DEFAULT_UP),this.updateMatrix(),this.target=new bt,this.shadow=new d0}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){const t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}}class p0 extends Mr{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}}class ar{static extractUrlBase(e){const t=e.lastIndexOf("/");return t===-1?"./":e.slice(0,t+1)}static resolveURL(e,t){return typeof e!="string"||e===""?"":(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}}const ga=new WeakMap;class m0 extends Ds{constructor(e){super(e),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&ze("ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&ze("ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"},this._abortController=new AbortController}setOptions(e){return this.options=e,this}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const s=this,o=ri.get(`image-bitmap:${e}`);if(o!==void 0){if(s.manager.itemStart(e),o.then){o.then(a=>{ga.has(o)===!0?(i&&i(ga.get(o)),s.manager.itemError(e),s.manager.itemEnd(e)):(t&&t(a),s.manager.itemEnd(e))});return}setTimeout(function(){t&&t(o),s.manager.itemEnd(e)},0);return}const c={};c.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",c.headers=this.requestHeader,c.signal=typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal;const l=fetch(e,c).then(function(a){return a.blob()}).then(function(a){return createImageBitmap(a,Object.assign(s.options,{colorSpaceConversion:"none"}))}).then(function(a){ri.add(`image-bitmap:${e}`,a),t&&t(a),s.manager.itemEnd(e)}).catch(function(a){i&&i(a),ga.set(l,a),ri.remove(`image-bitmap:${e}`),s.manager.itemError(e),s.manager.itemEnd(e)});ri.add(`image-bitmap:${e}`,l),s.manager.itemStart(e)}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}}const us=-90,fs=1;class g0 extends bt{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const i=new sn(us,fs,e,t);i.layers=this.layers,this.add(i);const s=new sn(us,fs,e,t);s.layers=this.layers,this.add(s);const o=new sn(us,fs,e,t);o.layers=this.layers,this.add(o);const c=new sn(us,fs,e,t);c.layers=this.layers,this.add(c);const l=new sn(us,fs,e,t);l.layers=this.layers,this.add(l);const a=new sn(us,fs,e,t);a.layers=this.layers,this.add(a)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,i,s,o,c,l]=t;for(const a of t)this.remove(a);if(e===Hn)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),c.up.set(0,1,0),c.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===dr)n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),c.up.set(0,-1,0),c.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const a of t)this.add(a),a.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,o,c,l,a,h]=this.children,u=e.getRenderTarget(),f=e.getActiveCubeFace(),_=e.getActiveMipmapLevel(),d=e.xr.enabled;e.xr.enabled=!1;const g=n.texture.generateMipmaps;n.texture.generateMipmaps=!1;let p=!1;e.isWebGLRenderer===!0?p=e.state.buffers.depth.getReversed():p=e.reversedDepthBuffer,e.setRenderTarget(n,0,i),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,s),e.setRenderTarget(n,1,i),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(n,2,i),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),e.setRenderTarget(n,3,i),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),e.setRenderTarget(n,4,i),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),n.texture.generateMipmaps=g,e.setRenderTarget(n,5,i),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,h),e.setRenderTarget(u,f,_),e.xr.enabled=d,n.texture.needsPMREMUpdate=!0}}class _0 extends sn{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}let x0=class{constructor(){this._previousTime=0,this._currentTime=0,this._startTime=performance.now(),this._delta=0,this._elapsed=0,this._timescale=1,this._document=null,this._pageVisibilityHandler=null}connect(e){this._document=e,e.hidden!==void 0&&(this._pageVisibilityHandler=v0.bind(this),e.addEventListener("visibilitychange",this._pageVisibilityHandler,!1))}disconnect(){this._pageVisibilityHandler!==null&&(this._document.removeEventListener("visibilitychange",this._pageVisibilityHandler),this._pageVisibilityHandler=null),this._document=null}getDelta(){return this._delta/1e3}getElapsed(){return this._elapsed/1e3}getTimescale(){return this._timescale}setTimescale(e){return this._timescale=e,this}reset(){return this._currentTime=performance.now()-this._startTime,this}dispose(){this.disconnect()}update(e){return this._pageVisibilityHandler!==null&&this._document.hidden===!0?this._delta=0:(this._previousTime=this._currentTime,this._currentTime=(e!==void 0?e:performance.now())-this._startTime,this._delta=(this._currentTime-this._previousTime)*this._timescale,this._elapsed+=this._delta),this}};function v0(){this._document.hidden===!1&&this.reset()}class y0{constructor(e,t,n){this.binding=e,this.valueSize=n;let i,s,o;switch(t){case"quaternion":i=this._slerp,s=this._slerpAdditive,o=this._setAdditiveIdentityQuaternion,this.buffer=new Float64Array(n*6),this._workIndex=5;break;case"string":case"bool":i=this._select,s=this._select,o=this._setAdditiveIdentityOther,this.buffer=new Array(n*5);break;default:i=this._lerp,s=this._lerpAdditive,o=this._setAdditiveIdentityNumeric,this.buffer=new Float64Array(n*5)}this._mixBufferRegion=i,this._mixBufferRegionAdditive=s,this._setIdentity=o,this._origIndex=3,this._addIndex=4,this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,this.useCount=0,this.referenceCount=0}accumulate(e,t){const n=this.buffer,i=this.valueSize,s=e*i+i;let o=this.cumulativeWeight;if(o===0){for(let c=0;c!==i;++c)n[s+c]=n[c];o=t}else{o+=t;const c=t/o;this._mixBufferRegion(n,s,0,c,i)}this.cumulativeWeight=o}accumulateAdditive(e){const t=this.buffer,n=this.valueSize,i=n*this._addIndex;this.cumulativeWeightAdditive===0&&this._setIdentity(),this._mixBufferRegionAdditive(t,i,0,e,n),this.cumulativeWeightAdditive+=e}apply(e){const t=this.valueSize,n=this.buffer,i=e*t+t,s=this.cumulativeWeight,o=this.cumulativeWeightAdditive,c=this.binding;if(this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,s<1){const l=t*this._origIndex;this._mixBufferRegion(n,i,l,1-s,t)}o>0&&this._mixBufferRegionAdditive(n,i,this._addIndex*t,1,t);for(let l=t,a=t+t;l!==a;++l)if(n[l]!==n[l+t]){c.setValue(n,i);break}}saveOriginalState(){const e=this.binding,t=this.buffer,n=this.valueSize,i=n*this._origIndex;e.getValue(t,i);for(let s=n,o=i;s!==o;++s)t[s]=t[i+s%n];this._setIdentity(),this.cumulativeWeight=0,this.cumulativeWeightAdditive=0}restoreOriginalState(){const e=this.valueSize*3;this.binding.setValue(this.buffer,e)}_setAdditiveIdentityNumeric(){const e=this._addIndex*this.valueSize,t=e+this.valueSize;for(let n=e;n<t;n++)this.buffer[n]=0}_setAdditiveIdentityQuaternion(){this._setAdditiveIdentityNumeric(),this.buffer[this._addIndex*this.valueSize+3]=1}_setAdditiveIdentityOther(){const e=this._origIndex*this.valueSize,t=this._addIndex*this.valueSize;for(let n=0;n<this.valueSize;n++)this.buffer[t+n]=this.buffer[e+n]}_select(e,t,n,i,s){if(i>=.5)for(let o=0;o!==s;++o)e[t+o]=e[n+o]}_slerp(e,t,n,i){ln.slerpFlat(e,t,e,t,e,n,i)}_slerpAdditive(e,t,n,i,s){const o=this._workIndex*s;ln.multiplyQuaternionsFlat(e,o,e,t,e,n),ln.slerpFlat(e,t,e,t,e,o,i)}_lerp(e,t,n,i,s){const o=1-i;for(let c=0;c!==s;++c){const l=t+c;e[l]=e[l]*o+e[n+c]*i}}_lerpAdditive(e,t,n,i,s){for(let o=0;o!==s;++o){const c=t+o;e[c]=e[c]+e[n+o]*i}}}const fl="\\[\\]\\.:\\/",M0=new RegExp("["+fl+"]","g"),dl="[^"+fl+"]",S0="[^"+fl.replace("\\.","")+"]",b0=/((?:WC+[\/:])*)/.source.replace("WC",dl),w0=/(WCOD+)?/.source.replace("WCOD",S0),T0=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",dl),E0=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",dl),A0=new RegExp("^"+b0+w0+T0+E0+"$"),C0=["material","materials","bones","map"];class R0{constructor(e,t,n){const i=n||gt.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,i)}getValue(e,t){this.bind();const n=this._targetGroup.nCachedObjects_,i=this._bindings[n];i!==void 0&&i.getValue(e,t)}setValue(e,t){const n=this._bindings;for(let i=this._targetGroup.nCachedObjects_,s=n.length;i!==s;++i)n[i].setValue(e,t)}bind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}}class gt{constructor(e,t,n){this.path=t,this.parsedPath=n||gt.parseTrackName(t),this.node=gt.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new gt.Composite(e,t,n):new gt(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(M0,"")}static parseTrackName(e){const t=A0.exec(e);if(t===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);const n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},i=n.nodeName&&n.nodeName.lastIndexOf(".");if(i!==void 0&&i!==-1){const s=n.nodeName.substring(i+1);C0.indexOf(s)!==-1&&(n.nodeName=n.nodeName.substring(0,i),n.objectName=s)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){const n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){const n=function(s){for(let o=0;o<s.length;o++){const c=s[o];if(c.name===t||c.uuid===t)return c;const l=n(c.children);if(l)return l}return null},i=n(e.children);if(i)return i}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){const n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)e[t++]=n[i]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){const n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=e[t++]}_setValue_array_setNeedsUpdate(e,t){const n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){const n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node;const t=this.parsedPath,n=t.objectName,i=t.propertyName;let s=t.propertyIndex;if(e||(e=gt.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){ze("PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let a=t.objectIndex;switch(n){case"materials":if(!e.material){Xe("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){Xe("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){Xe("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let h=0;h<e.length;h++)if(e[h].name===a){a=h;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){Xe("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){Xe("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){Xe("PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(a!==void 0){if(e[a]===void 0){Xe("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[a]}}const o=e[i];if(o===void 0){const a=t.nodeName;Xe("PropertyBinding: Trying to update property for track: "+a+"."+i+" but it wasn't found.",e);return}let c=this.Versioning.None;this.targetObject=e,e.isMaterial===!0?c=this.Versioning.NeedsUpdate:e.isObject3D===!0&&(c=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(s!==void 0){if(i==="morphTargetInfluences"){if(!e.geometry){Xe("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){Xe("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[s]!==void 0&&(s=e.morphTargetDictionary[s])}l=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=s}else o.fromArray!==void 0&&o.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(l=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=i;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][c]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}}gt.Composite=R0;gt.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};gt.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};gt.prototype.GetterByBindingType=[gt.prototype._getValue_direct,gt.prototype._getValue_array,gt.prototype._getValue_arrayElement,gt.prototype._getValue_toArray];gt.prototype.SetterByBindingTypeAndVersioning=[[gt.prototype._setValue_direct,gt.prototype._setValue_direct_setNeedsUpdate,gt.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[gt.prototype._setValue_array,gt.prototype._setValue_array_setNeedsUpdate,gt.prototype._setValue_array_setMatrixWorldNeedsUpdate],[gt.prototype._setValue_arrayElement,gt.prototype._setValue_arrayElement_setNeedsUpdate,gt.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[gt.prototype._setValue_fromArray,gt.prototype._setValue_fromArray_setNeedsUpdate,gt.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];class P0{constructor(e,t,n=null,i=t.blendMode){this._mixer=e,this._clip=t,this._localRoot=n,this.blendMode=i;const s=t.tracks,o=s.length,c=new Array(o),l={endingStart:ps,endingEnd:ps};for(let a=0;a!==o;++a){const h=s[a].createInterpolant(null);c[a]=h,h.settings&&Object.assign(l,h.settings),h.settings=l}this._interpolantSettings=l,this._interpolants=c,this._propertyBindings=new Array(o),this._cacheIndex=null,this._byClipCacheIndex=null,this._timeScaleInterpolant=null,this._weightInterpolant=null,this.loop=cd,this._loopCount=-1,this._startTime=null,this.time=0,this.timeScale=1,this._effectiveTimeScale=1,this.weight=1,this._effectiveWeight=1,this.repetitions=1/0,this.paused=!1,this.enabled=!0,this.clampWhenFinished=!1,this.zeroSlopeAtStart=!0,this.zeroSlopeAtEnd=!0}play(){return this._mixer._activateAction(this),this}stop(){return this._mixer._deactivateAction(this),this.reset()}reset(){return this.paused=!1,this.enabled=!0,this.time=0,this._loopCount=-1,this._startTime=null,this.stopFading().stopWarping()}isRunning(){return this.enabled&&!this.paused&&this.timeScale!==0&&this._startTime===null&&this._mixer._isActiveAction(this)}isScheduled(){return this._mixer._isActiveAction(this)}startAt(e){return this._startTime=e,this}setLoop(e,t){return this.loop=e,this.repetitions=t,this}setEffectiveWeight(e){return this.weight=e,this._effectiveWeight=this.enabled?e:0,this.stopFading()}getEffectiveWeight(){return this._effectiveWeight}fadeIn(e){return this._scheduleFading(e,0,1)}fadeOut(e){return this._scheduleFading(e,1,0)}crossFadeFrom(e,t,n=!1){if(e.fadeOut(t),this.fadeIn(t),n===!0){const i=this._clip.duration,s=e._clip.duration,o=s/i,c=i/s;e.warp(1,o,t),this.warp(c,1,t)}return this}crossFadeTo(e,t,n=!1){return e.crossFadeFrom(this,t,n)}stopFading(){const e=this._weightInterpolant;return e!==null&&(this._weightInterpolant=null,this._mixer._takeBackControlInterpolant(e)),this}setEffectiveTimeScale(e){return this.timeScale=e,this._effectiveTimeScale=this.paused?0:e,this.stopWarping()}getEffectiveTimeScale(){return this._effectiveTimeScale}setDuration(e){return this.timeScale=this._clip.duration/e,this.stopWarping()}syncWith(e){return this.time=e.time,this.timeScale=e.timeScale,this.stopWarping()}halt(e){return this.warp(this._effectiveTimeScale,0,e)}warp(e,t,n){const i=this._mixer,s=i.time,o=this.timeScale;let c=this._timeScaleInterpolant;c===null&&(c=i._lendControlInterpolant(),this._timeScaleInterpolant=c);const l=c.parameterPositions,a=c.sampleValues;return l[0]=s,l[1]=s+n,a[0]=e/o,a[1]=t/o,this}stopWarping(){const e=this._timeScaleInterpolant;return e!==null&&(this._timeScaleInterpolant=null,this._mixer._takeBackControlInterpolant(e)),this}getMixer(){return this._mixer}getClip(){return this._clip}getRoot(){return this._localRoot||this._mixer._root}_update(e,t,n,i){if(!this.enabled){this._updateWeight(e);return}const s=this._startTime;if(s!==null){const l=(e-s)*n;l<0||n===0?t=0:(this._startTime=null,t=n*l)}t*=this._updateTimeScale(e);const o=this._updateTime(t),c=this._updateWeight(e);if(c>0){const l=this._interpolants,a=this._propertyBindings;switch(this.blendMode){case hd:for(let h=0,u=l.length;h!==u;++h)l[h].evaluate(o),a[h].accumulateAdditive(c);break;case jc:default:for(let h=0,u=l.length;h!==u;++h)l[h].evaluate(o),a[h].accumulate(i,c)}}}_updateWeight(e){let t=0;if(this.enabled){t=this.weight;const n=this._weightInterpolant;if(n!==null){const i=n.evaluate(e)[0];t*=i,e>n.parameterPositions[1]&&(this.stopFading(),i===0&&(this.enabled=!1))}}return this._effectiveWeight=t,t}_updateTimeScale(e){let t=0;if(!this.paused){t=this.timeScale;const n=this._timeScaleInterpolant;if(n!==null){const i=n.evaluate(e)[0];t*=i,e>n.parameterPositions[1]&&(this.stopWarping(),t===0?this.paused=!0:this.timeScale=t)}}return this._effectiveTimeScale=t,t}_updateTime(e){const t=this._clip.duration,n=this.loop;let i=this.time+e,s=this._loopCount;const o=n===ld;if(e===0)return s===-1?i:o&&(s&1)===1?t-i:i;if(n===Eu){s===-1&&(this._loopCount=0,this._setEndings(!0,!0,!1));e:{if(i>=t)i=t;else if(i<0)i=0;else{this.time=i;break e}this.clampWhenFinished?this.paused=!0:this.enabled=!1,this.time=i,this._mixer.dispatchEvent({type:"finished",action:this,direction:e<0?-1:1})}}else{if(s===-1&&(e>=0?(s=0,this._setEndings(!0,this.repetitions===0,o)):this._setEndings(this.repetitions===0,!0,o)),i>=t||i<0){const c=Math.floor(i/t);i-=t*c,s+=Math.abs(c);const l=this.repetitions-s;if(l<=0)this.clampWhenFinished?this.paused=!0:this.enabled=!1,i=e>0?t:0,this.time=i,this._mixer.dispatchEvent({type:"finished",action:this,direction:e>0?1:-1});else{if(l===1){const a=e<0;this._setEndings(a,!a,o)}else this._setEndings(!1,!1,o);this._loopCount=s,this.time=i,this._mixer.dispatchEvent({type:"loop",action:this,loopDelta:c})}}else this._loopCount=s,this.time=i;if(o&&(s&1)===1)return t-i}return i}_setEndings(e,t,n){const i=this._interpolantSettings;n?(i.endingStart=ms,i.endingEnd=ms):(e?i.endingStart=this.zeroSlopeAtStart?ms:ps:i.endingStart=vo,t?i.endingEnd=this.zeroSlopeAtEnd?ms:ps:i.endingEnd=vo)}_scheduleFading(e,t,n){const i=this._mixer,s=i.time;let o=this._weightInterpolant;o===null&&(o=i._lendControlInterpolant(),this._weightInterpolant=o);const c=o.parameterPositions,l=o.sampleValues;return c[0]=s,l[0]=t,c[1]=s+e,l[1]=n,this}}const L0=new Float32Array(1);class I0 extends Ei{constructor(e){super(),this._root=e,this._initMemoryManager(),this._accuIndex=0,this.time=0,this.timeScale=1,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}_bindAction(e,t){const n=e._localRoot||this._root,i=e._clip.tracks,s=i.length,o=e._propertyBindings,c=e._interpolants,l=n.uuid,a=this._bindingsByRootAndName;let h=a[l];h===void 0&&(h={},a[l]=h);for(let u=0;u!==s;++u){const f=i[u],_=f.name;let d=h[_];if(d!==void 0)++d.referenceCount,o[u]=d;else{if(d=o[u],d!==void 0){d._cacheIndex===null&&(++d.referenceCount,this._addInactiveBinding(d,l,_));continue}const g=t&&t._propertyBindings[u].binding.parsedPath;d=new y0(gt.create(n,_,g),f.ValueTypeName,f.getValueSize()),++d.referenceCount,this._addInactiveBinding(d,l,_),o[u]=d}c[u].resultBuffer=d.buffer}}_activateAction(e){if(!this._isActiveAction(e)){if(e._cacheIndex===null){const n=(e._localRoot||this._root).uuid,i=e._clip.uuid,s=this._actionsByClip[i];this._bindAction(e,s&&s.knownActions[0]),this._addInactiveAction(e,i,n)}const t=e._propertyBindings;for(let n=0,i=t.length;n!==i;++n){const s=t[n];s.useCount++===0&&(this._lendBinding(s),s.saveOriginalState())}this._lendAction(e)}}_deactivateAction(e){if(this._isActiveAction(e)){const t=e._propertyBindings;for(let n=0,i=t.length;n!==i;++n){const s=t[n];--s.useCount===0&&(s.restoreOriginalState(),this._takeBackBinding(s))}this._takeBackAction(e)}}_initMemoryManager(){this._actions=[],this._nActiveActions=0,this._actionsByClip={},this._bindings=[],this._nActiveBindings=0,this._bindingsByRootAndName={},this._controlInterpolants=[],this._nActiveControlInterpolants=0;const e=this;this.stats={actions:{get total(){return e._actions.length},get inUse(){return e._nActiveActions}},bindings:{get total(){return e._bindings.length},get inUse(){return e._nActiveBindings}},controlInterpolants:{get total(){return e._controlInterpolants.length},get inUse(){return e._nActiveControlInterpolants}}}}_isActiveAction(e){const t=e._cacheIndex;return t!==null&&t<this._nActiveActions}_addInactiveAction(e,t,n){const i=this._actions,s=this._actionsByClip;let o=s[t];if(o===void 0)o={knownActions:[e],actionByRoot:{}},e._byClipCacheIndex=0,s[t]=o;else{const c=o.knownActions;e._byClipCacheIndex=c.length,c.push(e)}e._cacheIndex=i.length,i.push(e),o.actionByRoot[n]=e}_removeInactiveAction(e){const t=this._actions,n=t[t.length-1],i=e._cacheIndex;n._cacheIndex=i,t[i]=n,t.pop(),e._cacheIndex=null;const s=e._clip.uuid,o=this._actionsByClip,c=o[s],l=c.knownActions,a=l[l.length-1],h=e._byClipCacheIndex;a._byClipCacheIndex=h,l[h]=a,l.pop(),e._byClipCacheIndex=null;const u=c.actionByRoot,f=(e._localRoot||this._root).uuid;delete u[f],l.length===0&&delete o[s],this._removeInactiveBindingsForAction(e)}_removeInactiveBindingsForAction(e){const t=e._propertyBindings;for(let n=0,i=t.length;n!==i;++n){const s=t[n];--s.referenceCount===0&&this._removeInactiveBinding(s)}}_lendAction(e){const t=this._actions,n=e._cacheIndex,i=this._nActiveActions++,s=t[i];e._cacheIndex=i,t[i]=e,s._cacheIndex=n,t[n]=s}_takeBackAction(e){const t=this._actions,n=e._cacheIndex,i=--this._nActiveActions,s=t[i];e._cacheIndex=i,t[i]=e,s._cacheIndex=n,t[n]=s}_addInactiveBinding(e,t,n){const i=this._bindingsByRootAndName,s=this._bindings;let o=i[t];o===void 0&&(o={},i[t]=o),o[n]=e,e._cacheIndex=s.length,s.push(e)}_removeInactiveBinding(e){const t=this._bindings,n=e.binding,i=n.rootNode.uuid,s=n.path,o=this._bindingsByRootAndName,c=o[i],l=t[t.length-1],a=e._cacheIndex;l._cacheIndex=a,t[a]=l,t.pop(),delete c[s],Object.keys(c).length===0&&delete o[i]}_lendBinding(e){const t=this._bindings,n=e._cacheIndex,i=this._nActiveBindings++,s=t[i];e._cacheIndex=i,t[i]=e,s._cacheIndex=n,t[n]=s}_takeBackBinding(e){const t=this._bindings,n=e._cacheIndex,i=--this._nActiveBindings,s=t[i];e._cacheIndex=i,t[i]=e,s._cacheIndex=n,t[n]=s}_lendControlInterpolant(){const e=this._controlInterpolants,t=this._nActiveControlInterpolants++;let n=e[t];return n===void 0&&(n=new $u(new Float32Array(2),new Float32Array(2),1,L0),n.__cacheIndex=t,e[t]=n),n}_takeBackControlInterpolant(e){const t=this._controlInterpolants,n=e.__cacheIndex,i=--this._nActiveControlInterpolants,s=t[i];e.__cacheIndex=i,t[i]=e,s.__cacheIndex=n,t[n]=s}clipAction(e,t,n){const i=t||this._root,s=i.uuid;let o=typeof e=="string"?Tc.findByName(i,e):e;const c=o!==null?o.uuid:e,l=this._actionsByClip[c];let a=null;if(n===void 0&&(o!==null?n=o.blendMode:n=jc),l!==void 0){const u=l.actionByRoot[s];if(u!==void 0&&u.blendMode===n)return u;a=l.knownActions[0],o===null&&(o=a._clip)}if(o===null)return null;const h=new P0(this,o,t,n);return this._bindAction(h,a),this._addInactiveAction(h,c,s),h}existingAction(e,t){const n=t||this._root,i=n.uuid,s=typeof e=="string"?Tc.findByName(n,e):e,o=s?s.uuid:e,c=this._actionsByClip[o];return c!==void 0&&c.actionByRoot[i]||null}stopAllAction(){const e=this._actions,t=this._nActiveActions;for(let n=t-1;n>=0;--n)e[n].stop();return this}update(e){e*=this.timeScale;const t=this._actions,n=this._nActiveActions,i=this.time+=e,s=Math.sign(e),o=this._accuIndex^=1;for(let a=0;a!==n;++a)t[a]._update(i,e,s,o);const c=this._bindings,l=this._nActiveBindings;for(let a=0;a!==l;++a)c[a].apply(o);return this}setTime(e){this.time=0;for(let t=0;t<this._actions.length;t++)this._actions[t].time=0;return this.update(e)}getRoot(){return this._root}uncacheClip(e){const t=this._actions,n=e.uuid,i=this._actionsByClip,s=i[n];if(s!==void 0){const o=s.knownActions;for(let c=0,l=o.length;c!==l;++c){const a=o[c];this._deactivateAction(a);const h=a._cacheIndex,u=t[t.length-1];a._cacheIndex=null,a._byClipCacheIndex=null,u._cacheIndex=h,t[h]=u,t.pop(),this._removeInactiveBindingsForAction(a)}delete i[n]}}uncacheRoot(e){const t=e.uuid,n=this._actionsByClip;for(const o in n){const c=n[o].actionByRoot,l=c[t];l!==void 0&&(this._deactivateAction(l),this._removeInactiveAction(l))}const i=this._bindingsByRootAndName,s=i[t];if(s!==void 0)for(const o in s){const c=s[o];c.restoreOriginalState(),this._removeInactiveBinding(c)}}uncacheAction(e,t){const n=this.existingAction(e,t);n!==null&&(this._deactivateAction(n),this._removeInactiveAction(n))}}const Ch=new Qe;class D0{constructor(e,t,n=0,i=1/0){this.ray=new vr(e,t),this.near=n,this.far=i,this.camera=null,this.layers=new el,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):Xe("Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return Ch.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Ch),this}intersectObject(e,t=!0,n=[]){return Ac(e,this,n,t),n.sort(Rh),n}intersectObjects(e,t=!0,n=[]){for(let i=0,s=e.length;i<s;i++)Ac(e[i],this,n,t);return n.sort(Rh),n}}function Rh(r,e){return r.distance-e.distance}function Ac(r,e,t,n){let i=!0;if(r.layers.test(e.layers)&&r.raycast(e,t)===!1&&(i=!1),i===!0&&n===!0){const s=r.children;for(let o=0,c=s.length;o<c;o++)Ac(s[o],e,t,!0)}}const vl=class vl{constructor(e,t,n,i){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,n,i)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let n=0;n<4;n++)this.elements[n]=e[n+t];return this}set(e,t,n,i){const s=this.elements;return s[0]=e,s[2]=t,s[1]=n,s[3]=i,this}};vl.prototype.isMatrix2=!0;let Ph=vl;function Lh(r,e,t,n){const i=N0(n);switch(t){case wu:return r*e;case Xc:return r*e/i.components*i.byteLength;case qc:return r*e/i.components*i.byteLength;case Gi:return r*e*2/i.components*i.byteLength;case Yc:return r*e*2/i.components*i.byteLength;case Tu:return r*e*3/i.components*i.byteLength;case bn:return r*e*4/i.components*i.byteLength;case Kc:return r*e*4/i.components*i.byteLength;case lo:case ho:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*8;case uo:case fo:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*16;case Ga:case Ha:return Math.max(r,16)*Math.max(e,8)/4;case ka:case Va:return Math.max(r,8)*Math.max(e,8)/2;case Wa:case Xa:case Ya:case Ka:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*8;case qa:case _o:case ja:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*16;case Ja:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*16;case Za:return Math.floor((r+4)/5)*Math.floor((e+3)/4)*16;case $a:return Math.floor((r+4)/5)*Math.floor((e+4)/5)*16;case Qa:return Math.floor((r+5)/6)*Math.floor((e+4)/5)*16;case ec:return Math.floor((r+5)/6)*Math.floor((e+5)/6)*16;case tc:return Math.floor((r+7)/8)*Math.floor((e+4)/5)*16;case nc:return Math.floor((r+7)/8)*Math.floor((e+5)/6)*16;case ic:return Math.floor((r+7)/8)*Math.floor((e+7)/8)*16;case sc:return Math.floor((r+9)/10)*Math.floor((e+4)/5)*16;case rc:return Math.floor((r+9)/10)*Math.floor((e+5)/6)*16;case oc:return Math.floor((r+9)/10)*Math.floor((e+7)/8)*16;case ac:return Math.floor((r+9)/10)*Math.floor((e+9)/10)*16;case cc:return Math.floor((r+11)/12)*Math.floor((e+9)/10)*16;case lc:return Math.floor((r+11)/12)*Math.floor((e+11)/12)*16;case hc:case uc:case fc:return Math.ceil(r/4)*Math.ceil(e/4)*16;case dc:case pc:return Math.ceil(r/4)*Math.ceil(e/4)*8;case xo:case mc:return Math.ceil(r/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function N0(r){switch(r){case dn:case yu:return{byteLength:1,components:1};case lr:case Mu:case cn:return{byteLength:2,components:1};case Hc:case Wc:return{byteLength:2,components:4};case Yn:case Vc:case Sn:return{byteLength:4,components:1};case Su:case bu:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${r}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Uc}}));typeof window<"u"&&(window.__THREE__?ze("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Uc);/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function nf(){let r=null,e=!1,t=null,n=null;function i(s,o){t(s,o),n=r.requestAnimationFrame(i)}return{start:function(){e!==!0&&t!==null&&r!==null&&(n=r.requestAnimationFrame(i),e=!0)},stop:function(){r!==null&&r.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){r=s}}}function U0(r){const e=new WeakMap;function t(c,l){const a=c.array,h=c.usage,u=a.byteLength,f=r.createBuffer();r.bindBuffer(l,f),r.bufferData(l,a,h),c.onUploadCallback();let _;if(a instanceof Float32Array)_=r.FLOAT;else if(typeof Float16Array<"u"&&a instanceof Float16Array)_=r.HALF_FLOAT;else if(a instanceof Uint16Array)c.isFloat16BufferAttribute?_=r.HALF_FLOAT:_=r.UNSIGNED_SHORT;else if(a instanceof Int16Array)_=r.SHORT;else if(a instanceof Uint32Array)_=r.UNSIGNED_INT;else if(a instanceof Int32Array)_=r.INT;else if(a instanceof Int8Array)_=r.BYTE;else if(a instanceof Uint8Array)_=r.UNSIGNED_BYTE;else if(a instanceof Uint8ClampedArray)_=r.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+a);return{buffer:f,type:_,bytesPerElement:a.BYTES_PER_ELEMENT,version:c.version,size:u}}function n(c,l,a){const h=l.array,u=l.updateRanges;if(r.bindBuffer(a,c),u.length===0)r.bufferSubData(a,0,h);else{u.sort((_,d)=>_.start-d.start);let f=0;for(let _=1;_<u.length;_++){const d=u[f],g=u[_];g.start<=d.start+d.count+1?d.count=Math.max(d.count,g.start+g.count-d.start):(++f,u[f]=g)}u.length=f+1;for(let _=0,d=u.length;_<d;_++){const g=u[_];r.bufferSubData(a,g.start*h.BYTES_PER_ELEMENT,h,g.start,g.count)}l.clearUpdateRanges()}l.onUploadCallback()}function i(c){return c.isInterleavedBufferAttribute&&(c=c.data),e.get(c)}function s(c){c.isInterleavedBufferAttribute&&(c=c.data);const l=e.get(c);l&&(r.deleteBuffer(l.buffer),e.delete(c))}function o(c,l){if(c.isInterleavedBufferAttribute&&(c=c.data),c.isGLBufferAttribute){const h=e.get(c);(!h||h.version<c.version)&&e.set(c,{buffer:c.buffer,type:c.type,bytesPerElement:c.elementSize,version:c.version});return}const a=e.get(c);if(a===void 0)e.set(c,t(c,l));else if(a.version<c.version){if(a.size!==c.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(a.buffer,c,l),a.version=c.version}}return{get:i,remove:s,update:o}}var F0=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,O0=`#ifdef USE_ALPHAHASH
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
#endif`,B0=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,z0=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,k0=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,G0=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,V0=`#ifdef USE_AOMAP
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
#endif`,H0=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,W0=`#ifdef USE_BATCHING
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
#endif`,X0=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,q0=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Y0=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,K0=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,j0=`#ifdef USE_IRIDESCENCE
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
#endif`,J0=`#ifdef USE_BUMPMAP
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
#endif`,Z0=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,$0=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Q0=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,em=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,tm=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,nm=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,im=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,sm=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,rm=`#define PI 3.141592653589793
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
} // validated`,om=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,am=`vec3 transformedNormal = objectNormal;
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
#endif`,cm=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,lm=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,hm=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,um=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,fm="gl_FragColor = linearToOutputTexel( gl_FragColor );",dm=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,pm=`#ifdef USE_ENVMAP
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
#endif`,mm=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,gm=`#ifdef USE_ENVMAP
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
#endif`,_m=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,xm=`#ifdef USE_ENVMAP
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
#endif`,vm=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,ym=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Mm=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Sm=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,bm=`#ifdef USE_GRADIENTMAP
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
}`,wm=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Tm=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Em=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Am=`uniform bool receiveShadow;
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
#include <lightprobes_pars_fragment>`,Cm=`#ifdef USE_ENVMAP
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
#endif`,Rm=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Pm=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Lm=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Im=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Dm=`PhysicalMaterial material;
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
#endif`,Nm=`uniform sampler2D dfgLUT;
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
}`,Um=`
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
#endif`,Fm=`#if defined( RE_IndirectDiffuse )
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
#endif`,Om=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Bm=`#ifdef USE_LIGHT_PROBES_GRID
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
#endif`,zm=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,km=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Gm=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Vm=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Hm=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Wm=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Xm=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,qm=`#if defined( USE_POINTS_UV )
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
#endif`,Ym=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Km=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,jm=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Jm=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Zm=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,$m=`#ifdef USE_MORPHTARGETS
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
#endif`,Qm=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,eg=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,tg=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,ng=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,ig=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,sg=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,rg=`#ifdef USE_NORMALMAP
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
#endif`,og=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,ag=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,cg=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,lg=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,hg=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,ug=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,fg=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,dg=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,pg=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,mg=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,gg=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,_g=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,xg=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,vg=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,yg=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,Mg=`float getShadowMask() {
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
}`,Sg=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,bg=`#ifdef USE_SKINNING
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
#endif`,wg=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Tg=`#ifdef USE_SKINNING
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
#endif`,Eg=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Ag=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Cg=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Rg=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,Pg=`#ifdef USE_TRANSMISSION
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
#endif`,Lg=`#ifdef USE_TRANSMISSION
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
#endif`,Ig=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Dg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Ng=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Ug=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Fg=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Og=`uniform sampler2D t2D;
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
}`,Bg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,zg=`#ifdef ENVMAP_TYPE_CUBE
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
}`,kg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Gg=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Vg=`#include <common>
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
}`,Hg=`#if DEPTH_PACKING == 3200
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
}`,Wg=`#define DISTANCE
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
}`,Xg=`#define DISTANCE
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
}`,qg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Yg=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Kg=`uniform float scale;
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
}`,jg=`uniform vec3 diffuse;
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
}`,Jg=`#include <common>
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
}`,Zg=`uniform vec3 diffuse;
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
}`,$g=`#define LAMBERT
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
}`,Qg=`#define LAMBERT
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
}`,e2=`#define MATCAP
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
}`,t2=`#define MATCAP
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
}`,n2=`#define NORMAL
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
}`,i2=`#define NORMAL
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
}`,s2=`#define PHONG
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
}`,r2=`#define PHONG
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
}`,o2=`#define STANDARD
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
}`,a2=`#define STANDARD
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
}`,c2=`#define TOON
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
}`,l2=`#define TOON
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
}`,h2=`uniform float size;
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
}`,u2=`uniform vec3 diffuse;
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
}`,f2=`#include <common>
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
}`,d2=`uniform vec3 color;
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
}`,p2=`uniform float rotation;
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
}`,m2=`uniform vec3 diffuse;
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
}`,at={alphahash_fragment:F0,alphahash_pars_fragment:O0,alphamap_fragment:B0,alphamap_pars_fragment:z0,alphatest_fragment:k0,alphatest_pars_fragment:G0,aomap_fragment:V0,aomap_pars_fragment:H0,batching_pars_vertex:W0,batching_vertex:X0,begin_vertex:q0,beginnormal_vertex:Y0,bsdfs:K0,iridescence_fragment:j0,bumpmap_pars_fragment:J0,clipping_planes_fragment:Z0,clipping_planes_pars_fragment:$0,clipping_planes_pars_vertex:Q0,clipping_planes_vertex:em,color_fragment:tm,color_pars_fragment:nm,color_pars_vertex:im,color_vertex:sm,common:rm,cube_uv_reflection_fragment:om,defaultnormal_vertex:am,displacementmap_pars_vertex:cm,displacementmap_vertex:lm,emissivemap_fragment:hm,emissivemap_pars_fragment:um,colorspace_fragment:fm,colorspace_pars_fragment:dm,envmap_fragment:pm,envmap_common_pars_fragment:mm,envmap_pars_fragment:gm,envmap_pars_vertex:_m,envmap_physical_pars_fragment:Cm,envmap_vertex:xm,fog_vertex:vm,fog_pars_vertex:ym,fog_fragment:Mm,fog_pars_fragment:Sm,gradientmap_pars_fragment:bm,lightmap_pars_fragment:wm,lights_lambert_fragment:Tm,lights_lambert_pars_fragment:Em,lights_pars_begin:Am,lights_toon_fragment:Rm,lights_toon_pars_fragment:Pm,lights_phong_fragment:Lm,lights_phong_pars_fragment:Im,lights_physical_fragment:Dm,lights_physical_pars_fragment:Nm,lights_fragment_begin:Um,lights_fragment_maps:Fm,lights_fragment_end:Om,lightprobes_pars_fragment:Bm,logdepthbuf_fragment:zm,logdepthbuf_pars_fragment:km,logdepthbuf_pars_vertex:Gm,logdepthbuf_vertex:Vm,map_fragment:Hm,map_pars_fragment:Wm,map_particle_fragment:Xm,map_particle_pars_fragment:qm,metalnessmap_fragment:Ym,metalnessmap_pars_fragment:Km,morphinstance_vertex:jm,morphcolor_vertex:Jm,morphnormal_vertex:Zm,morphtarget_pars_vertex:$m,morphtarget_vertex:Qm,normal_fragment_begin:eg,normal_fragment_maps:tg,normal_pars_fragment:ng,normal_pars_vertex:ig,normal_vertex:sg,normalmap_pars_fragment:rg,clearcoat_normal_fragment_begin:og,clearcoat_normal_fragment_maps:ag,clearcoat_pars_fragment:cg,iridescence_pars_fragment:lg,opaque_fragment:hg,packing:ug,premultiplied_alpha_fragment:fg,project_vertex:dg,dithering_fragment:pg,dithering_pars_fragment:mg,roughnessmap_fragment:gg,roughnessmap_pars_fragment:_g,shadowmap_pars_fragment:xg,shadowmap_pars_vertex:vg,shadowmap_vertex:yg,shadowmask_pars_fragment:Mg,skinbase_vertex:Sg,skinning_pars_vertex:bg,skinning_vertex:wg,skinnormal_vertex:Tg,specularmap_fragment:Eg,specularmap_pars_fragment:Ag,tonemapping_fragment:Cg,tonemapping_pars_fragment:Rg,transmission_fragment:Pg,transmission_pars_fragment:Lg,uv_pars_fragment:Ig,uv_pars_vertex:Dg,uv_vertex:Ng,worldpos_vertex:Ug,background_vert:Fg,background_frag:Og,backgroundCube_vert:Bg,backgroundCube_frag:zg,cube_vert:kg,cube_frag:Gg,depth_vert:Vg,depth_frag:Hg,distance_vert:Wg,distance_frag:Xg,equirect_vert:qg,equirect_frag:Yg,linedashed_vert:Kg,linedashed_frag:jg,meshbasic_vert:Jg,meshbasic_frag:Zg,meshlambert_vert:$g,meshlambert_frag:Qg,meshmatcap_vert:e2,meshmatcap_frag:t2,meshnormal_vert:n2,meshnormal_frag:i2,meshphong_vert:s2,meshphong_frag:r2,meshphysical_vert:o2,meshphysical_frag:a2,meshtoon_vert:c2,meshtoon_frag:l2,points_vert:h2,points_frag:u2,shadow_vert:f2,shadow_frag:d2,sprite_vert:p2,sprite_frag:m2},Te={common:{diffuse:{value:new ce(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new it},alphaMap:{value:null},alphaMapTransform:{value:new it},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new it}},envmap:{envMap:{value:null},envMapRotation:{value:new it},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new it}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new it}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new it},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new it},normalScale:{value:new re(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new it},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new it}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new it}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new it}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new ce(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new P},probesMax:{value:new P},probesResolution:{value:new P}},points:{diffuse:{value:new ce(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new it},alphaTest:{value:0},uvTransform:{value:new it}},sprite:{diffuse:{value:new ce(16777215)},opacity:{value:1},center:{value:new re(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new it},alphaMap:{value:null},alphaMapTransform:{value:new it},alphaTest:{value:0}}},zn={basic:{uniforms:nn([Te.common,Te.specularmap,Te.envmap,Te.aomap,Te.lightmap,Te.fog]),vertexShader:at.meshbasic_vert,fragmentShader:at.meshbasic_frag},lambert:{uniforms:nn([Te.common,Te.specularmap,Te.envmap,Te.aomap,Te.lightmap,Te.emissivemap,Te.bumpmap,Te.normalmap,Te.displacementmap,Te.fog,Te.lights,{emissive:{value:new ce(0)},envMapIntensity:{value:1}}]),vertexShader:at.meshlambert_vert,fragmentShader:at.meshlambert_frag},phong:{uniforms:nn([Te.common,Te.specularmap,Te.envmap,Te.aomap,Te.lightmap,Te.emissivemap,Te.bumpmap,Te.normalmap,Te.displacementmap,Te.fog,Te.lights,{emissive:{value:new ce(0)},specular:{value:new ce(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:at.meshphong_vert,fragmentShader:at.meshphong_frag},standard:{uniforms:nn([Te.common,Te.envmap,Te.aomap,Te.lightmap,Te.emissivemap,Te.bumpmap,Te.normalmap,Te.displacementmap,Te.roughnessmap,Te.metalnessmap,Te.fog,Te.lights,{emissive:{value:new ce(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:at.meshphysical_vert,fragmentShader:at.meshphysical_frag},toon:{uniforms:nn([Te.common,Te.aomap,Te.lightmap,Te.emissivemap,Te.bumpmap,Te.normalmap,Te.displacementmap,Te.gradientmap,Te.fog,Te.lights,{emissive:{value:new ce(0)}}]),vertexShader:at.meshtoon_vert,fragmentShader:at.meshtoon_frag},matcap:{uniforms:nn([Te.common,Te.bumpmap,Te.normalmap,Te.displacementmap,Te.fog,{matcap:{value:null}}]),vertexShader:at.meshmatcap_vert,fragmentShader:at.meshmatcap_frag},points:{uniforms:nn([Te.points,Te.fog]),vertexShader:at.points_vert,fragmentShader:at.points_frag},dashed:{uniforms:nn([Te.common,Te.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:at.linedashed_vert,fragmentShader:at.linedashed_frag},depth:{uniforms:nn([Te.common,Te.displacementmap]),vertexShader:at.depth_vert,fragmentShader:at.depth_frag},normal:{uniforms:nn([Te.common,Te.bumpmap,Te.normalmap,Te.displacementmap,{opacity:{value:1}}]),vertexShader:at.meshnormal_vert,fragmentShader:at.meshnormal_frag},sprite:{uniforms:nn([Te.sprite,Te.fog]),vertexShader:at.sprite_vert,fragmentShader:at.sprite_frag},background:{uniforms:{uvTransform:{value:new it},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:at.background_vert,fragmentShader:at.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new it}},vertexShader:at.backgroundCube_vert,fragmentShader:at.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:at.cube_vert,fragmentShader:at.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:at.equirect_vert,fragmentShader:at.equirect_frag},distance:{uniforms:nn([Te.common,Te.displacementmap,{referencePosition:{value:new P},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:at.distance_vert,fragmentShader:at.distance_frag},shadow:{uniforms:nn([Te.lights,Te.fog,{color:{value:new ce(0)},opacity:{value:1}}]),vertexShader:at.shadow_vert,fragmentShader:at.shadow_frag}};zn.physical={uniforms:nn([zn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new it},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new it},clearcoatNormalScale:{value:new re(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new it},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new it},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new it},sheen:{value:0},sheenColor:{value:new ce(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new it},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new it},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new it},transmissionSamplerSize:{value:new re},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new it},attenuationDistance:{value:0},attenuationColor:{value:new ce(0)},specularColor:{value:new ce(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new it},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new it},anisotropyVector:{value:new re},anisotropyMap:{value:null},anisotropyMapTransform:{value:new it}}]),vertexShader:at.meshphysical_vert,fragmentShader:at.meshphysical_frag};const so={r:0,b:0,g:0},g2=new Qe,sf=new it;sf.set(-1,0,0,0,1,0,0,0,1);function _2(r,e,t,n,i,s){const o=new ce(0);let c=i===!0?0:1,l,a,h=null,u=0,f=null;function _(x){let v=x.isScene===!0?x.background:null;if(v&&v.isTexture){const y=x.backgroundBlurriness>0;v=e.get(v,y)}return v}function d(x){let v=!1;const y=_(x);y===null?p(o,c):y&&y.isColor&&(p(y,1),v=!0);const b=r.xr.getEnvironmentBlendMode();b==="additive"?t.buffers.color.setClear(0,0,0,1,s):b==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,s),(r.autoClear||v)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),r.clear(r.autoClearColor,r.autoClearDepth,r.autoClearStencil))}function g(x,v){const y=_(v);y&&(y.isCubeTexture||y.mapping===Co)?(a===void 0&&(a=new z(new de(1,1,1),new Gt({name:"BackgroundCubeMaterial",uniforms:ws(zn.backgroundCube.uniforms),vertexShader:zn.backgroundCube.vertexShader,fragmentShader:zn.backgroundCube.fragmentShader,side:Yt,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),a.geometry.deleteAttribute("normal"),a.geometry.deleteAttribute("uv"),a.onBeforeRender=function(b,S,w){this.matrixWorld.copyPosition(w.matrixWorld)},Object.defineProperty(a.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(a)),a.material.uniforms.envMap.value=y,a.material.uniforms.backgroundBlurriness.value=v.backgroundBlurriness,a.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,a.material.uniforms.backgroundRotation.value.setFromMatrix4(g2.makeRotationFromEuler(v.backgroundRotation)).transpose(),y.isCubeTexture&&y.isRenderTargetTexture===!1&&a.material.uniforms.backgroundRotation.value.premultiply(sf),a.material.toneMapped=ht.getTransfer(y.colorSpace)!==mt,(h!==y||u!==y.version||f!==r.toneMapping)&&(a.material.needsUpdate=!0,h=y,u=y.version,f=r.toneMapping),a.layers.enableAll(),x.unshift(a,a.geometry,a.material,0,0,null)):y&&y.isTexture&&(l===void 0&&(l=new z(new rn(2,2),new Gt({name:"BackgroundMaterial",uniforms:ws(zn.background.uniforms),vertexShader:zn.background.vertexShader,fragmentShader:zn.background.fragmentShader,side:ai,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(l)),l.material.uniforms.t2D.value=y,l.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,l.material.toneMapped=ht.getTransfer(y.colorSpace)!==mt,y.matrixAutoUpdate===!0&&y.updateMatrix(),l.material.uniforms.uvTransform.value.copy(y.matrix),(h!==y||u!==y.version||f!==r.toneMapping)&&(l.material.needsUpdate=!0,h=y,u=y.version,f=r.toneMapping),l.layers.enableAll(),x.unshift(l,l.geometry,l.material,0,0,null))}function p(x,v){x.getRGB(so,ju(r)),t.buffers.color.setClear(so.r,so.g,so.b,v,s)}function m(){a!==void 0&&(a.geometry.dispose(),a.material.dispose(),a=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return o},setClearColor:function(x,v=1){o.set(x),c=v,p(o,c)},getClearAlpha:function(){return c},setClearAlpha:function(x){c=x,p(o,c)},render:d,addToRenderList:g,dispose:m}}function x2(r,e){const t=r.getParameter(r.MAX_VERTEX_ATTRIBS),n={},i=f(null);let s=i,o=!1;function c(L,I,N,B,U){let O=!1;const k=u(L,B,N,I);s!==k&&(s=k,a(s.object)),O=_(L,B,N,U),O&&d(L,B,N,U),U!==null&&e.update(U,r.ELEMENT_ARRAY_BUFFER),(O||o)&&(o=!1,y(L,I,N,B),U!==null&&r.bindBuffer(r.ELEMENT_ARRAY_BUFFER,e.get(U).buffer))}function l(){return r.createVertexArray()}function a(L){return r.bindVertexArray(L)}function h(L){return r.deleteVertexArray(L)}function u(L,I,N,B){const U=B.wireframe===!0;let O=n[I.id];O===void 0&&(O={},n[I.id]=O);const k=L.isInstancedMesh===!0?L.id:0;let J=O[k];J===void 0&&(J={},O[k]=J);let ae=J[N.id];ae===void 0&&(ae={},J[N.id]=ae);let pe=ae[U];return pe===void 0&&(pe=f(l()),ae[U]=pe),pe}function f(L){const I=[],N=[],B=[];for(let U=0;U<t;U++)I[U]=0,N[U]=0,B[U]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:I,enabledAttributes:N,attributeDivisors:B,object:L,attributes:{},index:null}}function _(L,I,N,B){const U=s.attributes,O=I.attributes;let k=0;const J=N.getAttributes();for(const ae in J)if(J[ae].location>=0){const Ee=U[ae];let Ue=O[ae];if(Ue===void 0&&(ae==="instanceMatrix"&&L.instanceMatrix&&(Ue=L.instanceMatrix),ae==="instanceColor"&&L.instanceColor&&(Ue=L.instanceColor)),Ee===void 0||Ee.attribute!==Ue||Ue&&Ee.data!==Ue.data)return!0;k++}return s.attributesNum!==k||s.index!==B}function d(L,I,N,B){const U={},O=I.attributes;let k=0;const J=N.getAttributes();for(const ae in J)if(J[ae].location>=0){let Ee=O[ae];Ee===void 0&&(ae==="instanceMatrix"&&L.instanceMatrix&&(Ee=L.instanceMatrix),ae==="instanceColor"&&L.instanceColor&&(Ee=L.instanceColor));const Ue={};Ue.attribute=Ee,Ee&&Ee.data&&(Ue.data=Ee.data),U[ae]=Ue,k++}s.attributes=U,s.attributesNum=k,s.index=B}function g(){const L=s.newAttributes;for(let I=0,N=L.length;I<N;I++)L[I]=0}function p(L){m(L,0)}function m(L,I){const N=s.newAttributes,B=s.enabledAttributes,U=s.attributeDivisors;N[L]=1,B[L]===0&&(r.enableVertexAttribArray(L),B[L]=1),U[L]!==I&&(r.vertexAttribDivisor(L,I),U[L]=I)}function x(){const L=s.newAttributes,I=s.enabledAttributes;for(let N=0,B=I.length;N<B;N++)I[N]!==L[N]&&(r.disableVertexAttribArray(N),I[N]=0)}function v(L,I,N,B,U,O,k){k===!0?r.vertexAttribIPointer(L,I,N,U,O):r.vertexAttribPointer(L,I,N,B,U,O)}function y(L,I,N,B){g();const U=B.attributes,O=N.getAttributes(),k=I.defaultAttributeValues;for(const J in O){const ae=O[J];if(ae.location>=0){let pe=U[J];if(pe===void 0&&(J==="instanceMatrix"&&L.instanceMatrix&&(pe=L.instanceMatrix),J==="instanceColor"&&L.instanceColor&&(pe=L.instanceColor)),pe!==void 0){const Ee=pe.normalized,Ue=pe.itemSize,et=e.get(pe);if(et===void 0)continue;const nt=et.buffer,Ye=et.type,Q=et.bytesPerElement,we=Ye===r.INT||Ye===r.UNSIGNED_INT||pe.gpuType===Vc;if(pe.isInterleavedBufferAttribute){const me=pe.data,Fe=me.stride,qe=pe.offset;if(me.isInstancedInterleavedBuffer){for(let Oe=0;Oe<ae.locationSize;Oe++)m(ae.location+Oe,me.meshPerAttribute);L.isInstancedMesh!==!0&&B._maxInstanceCount===void 0&&(B._maxInstanceCount=me.meshPerAttribute*me.count)}else for(let Oe=0;Oe<ae.locationSize;Oe++)p(ae.location+Oe);r.bindBuffer(r.ARRAY_BUFFER,nt);for(let Oe=0;Oe<ae.locationSize;Oe++)v(ae.location+Oe,Ue/ae.locationSize,Ye,Ee,Fe*Q,(qe+Ue/ae.locationSize*Oe)*Q,we)}else{if(pe.isInstancedBufferAttribute){for(let me=0;me<ae.locationSize;me++)m(ae.location+me,pe.meshPerAttribute);L.isInstancedMesh!==!0&&B._maxInstanceCount===void 0&&(B._maxInstanceCount=pe.meshPerAttribute*pe.count)}else for(let me=0;me<ae.locationSize;me++)p(ae.location+me);r.bindBuffer(r.ARRAY_BUFFER,nt);for(let me=0;me<ae.locationSize;me++)v(ae.location+me,Ue/ae.locationSize,Ye,Ee,Ue*Q,Ue/ae.locationSize*me*Q,we)}}else if(k!==void 0){const Ee=k[J];if(Ee!==void 0)switch(Ee.length){case 2:r.vertexAttrib2fv(ae.location,Ee);break;case 3:r.vertexAttrib3fv(ae.location,Ee);break;case 4:r.vertexAttrib4fv(ae.location,Ee);break;default:r.vertexAttrib1fv(ae.location,Ee)}}}}x()}function b(){T();for(const L in n){const I=n[L];for(const N in I){const B=I[N];for(const U in B){const O=B[U];for(const k in O)h(O[k].object),delete O[k];delete B[U]}}delete n[L]}}function S(L){if(n[L.id]===void 0)return;const I=n[L.id];for(const N in I){const B=I[N];for(const U in B){const O=B[U];for(const k in O)h(O[k].object),delete O[k];delete B[U]}}delete n[L.id]}function w(L){for(const I in n){const N=n[I];for(const B in N){const U=N[B];if(U[L.id]===void 0)continue;const O=U[L.id];for(const k in O)h(O[k].object),delete O[k];delete U[L.id]}}}function M(L){for(const I in n){const N=n[I],B=L.isInstancedMesh===!0?L.id:0,U=N[B];if(U!==void 0){for(const O in U){const k=U[O];for(const J in k)h(k[J].object),delete k[J];delete U[O]}delete N[B],Object.keys(N).length===0&&delete n[I]}}}function T(){A(),o=!0,s!==i&&(s=i,a(s.object))}function A(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:c,reset:T,resetDefaultState:A,dispose:b,releaseStatesOfGeometry:S,releaseStatesOfObject:M,releaseStatesOfProgram:w,initAttributes:g,enableAttribute:p,disableUnusedAttributes:x}}function v2(r,e,t){let n;function i(l){n=l}function s(l,a){r.drawArrays(n,l,a),t.update(a,n,1)}function o(l,a,h){h!==0&&(r.drawArraysInstanced(n,l,a,h),t.update(a,n,h))}function c(l,a,h){if(h===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,a,0,h);let f=0;for(let _=0;_<h;_++)f+=a[_];t.update(f,n,1)}this.setMode=i,this.render=s,this.renderInstances=o,this.renderMultiDraw=c}function y2(r,e,t,n){let i;function s(){if(i!==void 0)return i;if(e.has("EXT_texture_filter_anisotropic")===!0){const w=e.get("EXT_texture_filter_anisotropic");i=r.getParameter(w.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function o(w){return!(w!==bn&&n.convert(w)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_FORMAT))}function c(w){const M=w===cn&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(w!==dn&&n.convert(w)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_TYPE)&&w!==Sn&&!M)}function l(w){if(w==="highp"){if(r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.HIGH_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.HIGH_FLOAT).precision>0)return"highp";w="mediump"}return w==="mediump"&&r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.MEDIUM_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let a=t.precision!==void 0?t.precision:"highp";const h=l(a);h!==a&&(ze("WebGLRenderer:",a,"not supported, using",h,"instead."),a=h);const u=t.logarithmicDepthBuffer===!0,f=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control");t.reversedDepthBuffer===!0&&f===!1&&ze("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");const _=r.getParameter(r.MAX_TEXTURE_IMAGE_UNITS),d=r.getParameter(r.MAX_VERTEX_TEXTURE_IMAGE_UNITS),g=r.getParameter(r.MAX_TEXTURE_SIZE),p=r.getParameter(r.MAX_CUBE_MAP_TEXTURE_SIZE),m=r.getParameter(r.MAX_VERTEX_ATTRIBS),x=r.getParameter(r.MAX_VERTEX_UNIFORM_VECTORS),v=r.getParameter(r.MAX_VARYING_VECTORS),y=r.getParameter(r.MAX_FRAGMENT_UNIFORM_VECTORS),b=r.getParameter(r.MAX_SAMPLES),S=r.getParameter(r.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:c,precision:a,logarithmicDepthBuffer:u,reversedDepthBuffer:f,maxTextures:_,maxVertexTextures:d,maxTextureSize:g,maxCubemapSize:p,maxAttributes:m,maxVertexUniforms:x,maxVaryings:v,maxFragmentUniforms:y,maxSamples:b,samples:S}}function M2(r){const e=this;let t=null,n=0,i=!1,s=!1;const o=new Si,c=new it,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(u,f){const _=u.length!==0||f||n!==0||i;return i=f,n=u.length,_},this.beginShadows=function(){s=!0,h(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(u,f){t=h(u,f,0)},this.setState=function(u,f,_){const d=u.clippingPlanes,g=u.clipIntersection,p=u.clipShadows,m=r.get(u);if(!i||d===null||d.length===0||s&&!p)s?h(null):a();else{const x=s?0:n,v=x*4;let y=m.clippingState||null;l.value=y,y=h(d,f,v,_);for(let b=0;b!==v;++b)y[b]=t[b];m.clippingState=y,this.numIntersection=g?this.numPlanes:0,this.numPlanes+=x}};function a(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function h(u,f,_,d){const g=u!==null?u.length:0;let p=null;if(g!==0){if(p=l.value,d!==!0||p===null){const m=_+g*4,x=f.matrixWorldInverse;c.getNormalMatrix(x),(p===null||p.length<m)&&(p=new Float32Array(m));for(let v=0,y=_;v!==g;++v,y+=4)o.copy(u[v]).applyMatrix4(x,c),o.normal.toArray(p,y),p[y+3]=o.constant}l.value=p,l.needsUpdate=!0}return e.numPlanes=g,e.numIntersection=0,p}}const wi=4,Ih=[.125,.215,.35,.446,.526,.582],Ui=20,S2=256,Ks=new Sr,Dh=new ce;let _a=null,xa=0,va=0,ya=!1;const b2=new P;class Cc{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,n=.1,i=100,s={}){const{size:o=256,position:c=b2}=s;_a=this._renderer.getRenderTarget(),xa=this._renderer.getActiveCubeFace(),va=this._renderer.getActiveMipmapLevel(),ya=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(o);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,n,i,l,c),t>0&&this._blur(l,0,0,t),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Fh(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Uh(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(_a,xa,va),this._renderer.xr.enabled=ya,e.scissorTest=!1,ds(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===zi||e.mapping===ys?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),_a=this._renderer.getRenderTarget(),xa=this._renderer.getActiveCubeFace(),va=this._renderer.getActiveMipmapLevel(),ya=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:kt,minFilter:kt,generateMipmaps:!1,type:cn,format:bn,colorSpace:pn,depthBuffer:!1},i=Nh(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Nh(e,t,n);const{_lodMax:s}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=w2(s)),this._blurMaterial=E2(s,e,t),this._ggxMaterial=T2(s,e,t)}return i}_compileMaterial(e){const t=new z(new wt,e);this._renderer.compile(t,Ks)}_sceneToCubeUV(e,t,n,i,s){const l=new sn(90,1,t,n),a=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],u=this._renderer,f=u.autoClear,_=u.toneMapping;u.getClearColor(Dh),u.toneMapping=qn,u.autoClear=!1,u.state.buffers.depth.getReversed()&&(u.setRenderTarget(i),u.clearDepth(),u.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new z(new de,new Ct({name:"PMREM.Background",side:Yt,depthWrite:!1,depthTest:!1})));const g=this._backgroundBox,p=g.material;let m=!1;const x=e.background;x?x.isColor&&(p.color.copy(x),e.background=null,m=!0):(p.color.copy(Dh),m=!0);for(let v=0;v<6;v++){const y=v%3;y===0?(l.up.set(0,a[v],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x+h[v],s.y,s.z)):y===1?(l.up.set(0,0,a[v]),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y+h[v],s.z)):(l.up.set(0,a[v],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y,s.z+h[v]));const b=this._cubeSize;ds(i,y*b,v>2?b:0,b,b),u.setRenderTarget(i),m&&u.render(g,l),u.render(e,l)}u.toneMapping=_,u.autoClear=f,e.background=x}_textureToCubeUV(e,t){const n=this._renderer,i=e.mapping===zi||e.mapping===ys;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=Fh()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Uh());const s=i?this._cubemapMaterial:this._equirectMaterial,o=this._lodMeshes[0];o.material=s;const c=s.uniforms;c.envMap.value=e;const l=this._cubeSize;ds(t,0,0,3*l,2*l),n.setRenderTarget(t),n.render(o,Ks)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;const i=this._lodMeshes.length;for(let s=1;s<i;s++)this._applyGGXFilter(e,s-1,s);t.autoClear=n}_applyGGXFilter(e,t,n){const i=this._renderer,s=this._pingPongRenderTarget,o=this._ggxMaterial,c=this._lodMeshes[n];c.material=o;const l=o.uniforms,a=n/(this._lodMeshes.length-1),h=t/(this._lodMeshes.length-1),u=Math.sqrt(a*a-h*h),f=0+a*1.25,_=u*f,{_lodMax:d}=this,g=this._sizeLods[n],p=3*g*(n>d-wi?n-d+wi:0),m=4*(this._cubeSize-g);l.envMap.value=e.texture,l.roughness.value=_,l.mipInt.value=d-t,ds(s,p,m,3*g,2*g),i.setRenderTarget(s),i.render(c,Ks),l.envMap.value=s.texture,l.roughness.value=0,l.mipInt.value=d-n,ds(e,p,m,3*g,2*g),i.setRenderTarget(e),i.render(c,Ks)}_blur(e,t,n,i,s){const o=this._pingPongRenderTarget;this._halfBlur(e,o,t,n,i,"latitudinal",s),this._halfBlur(o,e,n,n,i,"longitudinal",s)}_halfBlur(e,t,n,i,s,o,c){const l=this._renderer,a=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&Xe("blur direction must be either latitudinal or longitudinal!");const h=3,u=this._lodMeshes[i];u.material=a;const f=a.uniforms,_=this._sizeLods[n]-1,d=isFinite(s)?Math.PI/(2*_):2*Math.PI/(2*Ui-1),g=s/d,p=isFinite(s)?1+Math.floor(h*g):Ui;p>Ui&&ze(`sigmaRadians, ${s}, is too large and will clip, as it requested ${p} samples when the maximum is set to ${Ui}`);const m=[];let x=0;for(let w=0;w<Ui;++w){const M=w/g,T=Math.exp(-M*M/2);m.push(T),w===0?x+=T:w<p&&(x+=2*T)}for(let w=0;w<m.length;w++)m[w]=m[w]/x;f.envMap.value=e.texture,f.samples.value=p,f.weights.value=m,f.latitudinal.value=o==="latitudinal",c&&(f.poleAxis.value=c);const{_lodMax:v}=this;f.dTheta.value=d,f.mipInt.value=v-n;const y=this._sizeLods[i],b=3*y*(i>v-wi?i-v+wi:0),S=4*(this._cubeSize-y);ds(t,b,S,3*y,2*y),l.setRenderTarget(t),l.render(u,Ks)}}function w2(r){const e=[],t=[],n=[];let i=r;const s=r-wi+1+Ih.length;for(let o=0;o<s;o++){const c=Math.pow(2,i);e.push(c);let l=1/c;o>r-wi?l=Ih[o-r+wi-1]:o===0&&(l=0),t.push(l);const a=1/(c-2),h=-a,u=1+a,f=[h,h,u,h,u,u,h,h,u,u,h,u],_=6,d=6,g=3,p=2,m=1,x=new Float32Array(g*d*_),v=new Float32Array(p*d*_),y=new Float32Array(m*d*_);for(let S=0;S<_;S++){const w=S%3*2/3-1,M=S>2?0:-1,T=[w,M,0,w+2/3,M,0,w+2/3,M+1,0,w,M,0,w+2/3,M+1,0,w,M+1,0];x.set(T,g*d*S),v.set(f,p*d*S);const A=[S,S,S,S,S,S];y.set(A,m*d*S)}const b=new wt;b.setAttribute("position",new Rt(x,g)),b.setAttribute("uv",new Rt(v,p)),b.setAttribute("faceIndex",new Rt(y,m)),n.push(new z(b,null)),i>wi&&i--}return{lodMeshes:n,sizeLods:e,sigmas:t}}function Nh(r,e,t){const n=new on(r,e,t);return n.texture.mapping=Co,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function ds(r,e,t,n,i){r.viewport.set(e,t,n,i),r.scissor.set(e,t,n,i)}function T2(r,e,t){return new Gt({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:S2,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${r}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:Ro(),fragmentShader:`

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
		`,blending:Xn,depthTest:!1,depthWrite:!1})}function E2(r,e,t){const n=new Float32Array(Ui),i=new P(0,1,0);return new Gt({name:"SphericalGaussianBlur",defines:{n:Ui,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${r}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:Ro(),fragmentShader:`

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
		`,blending:Xn,depthTest:!1,depthWrite:!1})}function Uh(){return new Gt({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Ro(),fragmentShader:`

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
		`,blending:Xn,depthTest:!1,depthWrite:!1})}function Fh(){return new Gt({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Ro(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Xn,depthTest:!1,depthWrite:!1})}function Ro(){return`

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
	`}class rf extends on{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},i=[n,n,n,n,n,n];this.texture=new Bu(i),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},i=new de(5,5,5),s=new Gt({name:"CubemapFromEquirect",uniforms:ws(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Yt,blending:Xn});s.uniforms.tEquirect.value=t;const o=new z(i,s),c=t.minFilter;return t.minFilter===Vn&&(t.minFilter=kt),new g0(1,10,this).update(e,o),t.minFilter=c,o.geometry.dispose(),o.material.dispose(),this}clear(e,t=!0,n=!0,i=!0){const s=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,n,i);e.setRenderTarget(s)}}function A2(r){let e=new WeakMap,t=new WeakMap,n=null;function i(f,_=!1){return f==null?null:_?o(f):s(f)}function s(f){if(f&&f.isTexture){const _=f.mapping;if(_===Oo||_===Bo)if(e.has(f)){const d=e.get(f).texture;return c(d,f.mapping)}else{const d=f.image;if(d&&d.height>0){const g=new rf(d.height);return g.fromEquirectangularTexture(r,f),e.set(f,g),f.addEventListener("dispose",a),c(g.texture,f.mapping)}else return null}}return f}function o(f){if(f&&f.isTexture){const _=f.mapping,d=_===Oo||_===Bo,g=_===zi||_===ys;if(d||g){let p=t.get(f);const m=p!==void 0?p.texture.pmremVersion:0;if(f.isRenderTargetTexture&&f.pmremVersion!==m)return n===null&&(n=new Cc(r)),p=d?n.fromEquirectangular(f,p):n.fromCubemap(f,p),p.texture.pmremVersion=f.pmremVersion,t.set(f,p),p.texture;if(p!==void 0)return p.texture;{const x=f.image;return d&&x&&x.height>0||g&&x&&l(x)?(n===null&&(n=new Cc(r)),p=d?n.fromEquirectangular(f):n.fromCubemap(f),p.texture.pmremVersion=f.pmremVersion,t.set(f,p),f.addEventListener("dispose",h),p.texture):null}}}return f}function c(f,_){return _===Oo?f.mapping=zi:_===Bo&&(f.mapping=ys),f}function l(f){let _=0;const d=6;for(let g=0;g<d;g++)f[g]!==void 0&&_++;return _===d}function a(f){const _=f.target;_.removeEventListener("dispose",a);const d=e.get(_);d!==void 0&&(e.delete(_),d.dispose())}function h(f){const _=f.target;_.removeEventListener("dispose",h);const d=t.get(_);d!==void 0&&(t.delete(_),d.dispose())}function u(){e=new WeakMap,t=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:i,dispose:u}}function C2(r){const e={};function t(n){if(e[n]!==void 0)return e[n];const i=r.getExtension(n);return e[n]=i,i}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){const i=t(n);return i===null&&vc("WebGLRenderer: "+n+" extension not supported."),i}}}function R2(r,e,t,n){const i={},s=new WeakMap;function o(u){const f=u.target;f.index!==null&&e.remove(f.index);for(const d in f.attributes)e.remove(f.attributes[d]);f.removeEventListener("dispose",o),delete i[f.id];const _=s.get(f);_&&(e.remove(_),s.delete(f)),n.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,t.memory.geometries--}function c(u,f){return i[f.id]===!0||(f.addEventListener("dispose",o),i[f.id]=!0,t.memory.geometries++),f}function l(u){const f=u.attributes;for(const _ in f)e.update(f[_],r.ARRAY_BUFFER)}function a(u){const f=[],_=u.index,d=u.attributes.position;let g=0;if(d===void 0)return;if(_!==null){const x=_.array;g=_.version;for(let v=0,y=x.length;v<y;v+=3){const b=x[v+0],S=x[v+1],w=x[v+2];f.push(b,S,S,w,w,b)}}else{const x=d.array;g=d.version;for(let v=0,y=x.length/3-1;v<y;v+=3){const b=v+0,S=v+1,w=v+2;f.push(b,S,S,w,w,b)}}const p=new(d.count>=65535?Iu:Lu)(f,1);p.version=g;const m=s.get(u);m&&e.remove(m),s.set(u,p)}function h(u){const f=s.get(u);if(f){const _=u.index;_!==null&&f.version<_.version&&a(u)}else a(u);return s.get(u)}return{get:c,update:l,getWireframeAttribute:h}}function P2(r,e,t){let n;function i(u){n=u}let s,o;function c(u){s=u.type,o=u.bytesPerElement}function l(u,f){r.drawElements(n,f,s,u*o),t.update(f,n,1)}function a(u,f,_){_!==0&&(r.drawElementsInstanced(n,f,s,u*o,_),t.update(f,n,_))}function h(u,f,_){if(_===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,f,0,s,u,0,_);let g=0;for(let p=0;p<_;p++)g+=f[p];t.update(g,n,1)}this.setMode=i,this.setIndex=c,this.render=l,this.renderInstances=a,this.renderMultiDraw=h}function L2(r){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(s,o,c){switch(t.calls++,o){case r.TRIANGLES:t.triangles+=c*(s/3);break;case r.LINES:t.lines+=c*(s/2);break;case r.LINE_STRIP:t.lines+=c*(s-1);break;case r.LINE_LOOP:t.lines+=c*s;break;case r.POINTS:t.points+=c*s;break;default:Xe("WebGLInfo: Unknown draw mode:",o);break}}function i(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:i,update:n}}function I2(r,e,t){const n=new WeakMap,i=new xt;function s(o,c,l){const a=o.morphTargetInfluences,h=c.morphAttributes.position||c.morphAttributes.normal||c.morphAttributes.color,u=h!==void 0?h.length:0;let f=n.get(c);if(f===void 0||f.count!==u){let T=function(){w.dispose(),n.delete(c),c.removeEventListener("dispose",T)};f!==void 0&&f.texture.dispose();const _=c.morphAttributes.position!==void 0,d=c.morphAttributes.normal!==void 0,g=c.morphAttributes.color!==void 0,p=c.morphAttributes.position||[],m=c.morphAttributes.normal||[],x=c.morphAttributes.color||[];let v=0;_===!0&&(v=1),d===!0&&(v=2),g===!0&&(v=3);let y=c.attributes.position.count*v,b=1;y>e.maxTextureSize&&(b=Math.ceil(y/e.maxTextureSize),y=e.maxTextureSize);const S=new Float32Array(y*b*4*u),w=new Ru(S,y,b,u);w.type=Sn,w.needsUpdate=!0;const M=v*4;for(let A=0;A<u;A++){const L=p[A],I=m[A],N=x[A],B=y*b*4*A;for(let U=0;U<L.count;U++){const O=U*M;_===!0&&(i.fromBufferAttribute(L,U),S[B+O+0]=i.x,S[B+O+1]=i.y,S[B+O+2]=i.z,S[B+O+3]=0),d===!0&&(i.fromBufferAttribute(I,U),S[B+O+4]=i.x,S[B+O+5]=i.y,S[B+O+6]=i.z,S[B+O+7]=0),g===!0&&(i.fromBufferAttribute(N,U),S[B+O+8]=i.x,S[B+O+9]=i.y,S[B+O+10]=i.z,S[B+O+11]=N.itemSize===4?i.w:1)}}f={count:u,texture:w,size:new re(y,b)},n.set(c,f),c.addEventListener("dispose",T)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(r,"morphTexture",o.morphTexture,t);else{let _=0;for(let g=0;g<a.length;g++)_+=a[g];const d=c.morphTargetsRelative?1:1-_;l.getUniforms().setValue(r,"morphTargetBaseInfluence",d),l.getUniforms().setValue(r,"morphTargetInfluences",a)}l.getUniforms().setValue(r,"morphTargetsTexture",f.texture,t),l.getUniforms().setValue(r,"morphTargetsTextureSize",f.size)}return{update:s}}function D2(r,e,t,n,i){let s=new WeakMap;function o(a){const h=i.render.frame,u=a.geometry,f=e.get(a,u);if(s.get(f)!==h&&(e.update(f),s.set(f,h)),a.isInstancedMesh&&(a.hasEventListener("dispose",l)===!1&&a.addEventListener("dispose",l),s.get(a)!==h&&(t.update(a.instanceMatrix,r.ARRAY_BUFFER),a.instanceColor!==null&&t.update(a.instanceColor,r.ARRAY_BUFFER),s.set(a,h))),a.isSkinnedMesh){const _=a.skeleton;s.get(_)!==h&&(_.update(),s.set(_,h))}return f}function c(){s=new WeakMap}function l(a){const h=a.target;h.removeEventListener("dispose",l),n.releaseStatesOfObject(h),t.remove(h.instanceMatrix),h.instanceColor!==null&&t.remove(h.instanceColor)}return{update:o,dispose:c}}const N2={[Fc]:"LINEAR_TONE_MAPPING",[Oc]:"REINHARD_TONE_MAPPING",[Bc]:"CINEON_TONE_MAPPING",[Ao]:"ACES_FILMIC_TONE_MAPPING",[kc]:"AGX_TONE_MAPPING",[Gc]:"NEUTRAL_TONE_MAPPING",[zc]:"CUSTOM_TONE_MAPPING"};function U2(r,e,t,n,i){const s=new on(e,t,{type:r,depthBuffer:n,stencilBuffer:i,depthTexture:n?new Ss(e,t):void 0}),o=new on(e,t,{type:cn,depthBuffer:!1,stencilBuffer:!1}),c=new wt;c.setAttribute("position",new Je([-1,3,0,-1,-1,0,3,-1,0],3)),c.setAttribute("uv",new Je([0,2,0,0,2,0],2));const l=new Ju({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),a=new z(c,l),h=new Sr(-1,1,1,-1,0,1);let u=null,f=null,_=!1,d,g=null,p=[],m=!1;this.setSize=function(x,v){s.setSize(x,v),o.setSize(x,v);for(let y=0;y<p.length;y++){const b=p[y];b.setSize&&b.setSize(x,v)}},this.setEffects=function(x){p=x,m=p.length>0&&p[0].isRenderPass===!0;const v=s.width,y=s.height;for(let b=0;b<p.length;b++){const S=p[b];S.setSize&&S.setSize(v,y)}},this.begin=function(x,v){if(_||x.toneMapping===qn&&p.length===0)return!1;if(g=v,v!==null){const y=v.width,b=v.height;(s.width!==y||s.height!==b)&&this.setSize(y,b)}return m===!1&&x.setRenderTarget(s),d=x.toneMapping,x.toneMapping=qn,!0},this.hasRenderPass=function(){return m},this.end=function(x,v){x.toneMapping=d,_=!0;let y=s,b=o;for(let S=0;S<p.length;S++){const w=p[S];if(w.enabled!==!1&&(w.render(x,b,y,v),w.needsSwap!==!1)){const M=y;y=b,b=M}}if(u!==x.outputColorSpace||f!==x.toneMapping){u=x.outputColorSpace,f=x.toneMapping,l.defines={},ht.getTransfer(u)===mt&&(l.defines.SRGB_TRANSFER="");const S=N2[f];S&&(l.defines[S]=""),l.needsUpdate=!0}l.uniforms.tDiffuse.value=y.texture,x.setRenderTarget(g),x.render(a,h),g=null,_=!1},this.isCompositing=function(){return _},this.dispose=function(){s.depthTexture&&s.depthTexture.dispose(),s.dispose(),o.dispose(),c.dispose(),l.dispose()}}const of=new Vt,Rc=new Ss(1,1),af=new Ru,cf=new qd,lf=new Bu,Oh=[],Bh=[],zh=new Float32Array(16),kh=new Float32Array(9),Gh=new Float32Array(4);function Ns(r,e,t){const n=r[0];if(n<=0||n>0)return r;const i=e*t;let s=Oh[i];if(s===void 0&&(s=new Float32Array(i),Oh[i]=s),e!==0){n.toArray(s,0);for(let o=1,c=0;o!==e;++o)c+=t,r[o].toArray(s,c)}return s}function Ht(r,e){if(r.length!==e.length)return!1;for(let t=0,n=r.length;t<n;t++)if(r[t]!==e[t])return!1;return!0}function Wt(r,e){for(let t=0,n=e.length;t<n;t++)r[t]=e[t]}function Po(r,e){let t=Bh[e];t===void 0&&(t=new Int32Array(e),Bh[e]=t);for(let n=0;n!==e;++n)t[n]=r.allocateTextureUnit();return t}function F2(r,e){const t=this.cache;t[0]!==e&&(r.uniform1f(this.addr,e),t[0]=e)}function O2(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(r.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Ht(t,e))return;r.uniform2fv(this.addr,e),Wt(t,e)}}function B2(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(r.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(r.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Ht(t,e))return;r.uniform3fv(this.addr,e),Wt(t,e)}}function z2(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(r.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Ht(t,e))return;r.uniform4fv(this.addr,e),Wt(t,e)}}function k2(r,e){const t=this.cache,n=e.elements;if(n===void 0){if(Ht(t,e))return;r.uniformMatrix2fv(this.addr,!1,e),Wt(t,e)}else{if(Ht(t,n))return;Gh.set(n),r.uniformMatrix2fv(this.addr,!1,Gh),Wt(t,n)}}function G2(r,e){const t=this.cache,n=e.elements;if(n===void 0){if(Ht(t,e))return;r.uniformMatrix3fv(this.addr,!1,e),Wt(t,e)}else{if(Ht(t,n))return;kh.set(n),r.uniformMatrix3fv(this.addr,!1,kh),Wt(t,n)}}function V2(r,e){const t=this.cache,n=e.elements;if(n===void 0){if(Ht(t,e))return;r.uniformMatrix4fv(this.addr,!1,e),Wt(t,e)}else{if(Ht(t,n))return;zh.set(n),r.uniformMatrix4fv(this.addr,!1,zh),Wt(t,n)}}function H2(r,e){const t=this.cache;t[0]!==e&&(r.uniform1i(this.addr,e),t[0]=e)}function W2(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(r.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Ht(t,e))return;r.uniform2iv(this.addr,e),Wt(t,e)}}function X2(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(r.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Ht(t,e))return;r.uniform3iv(this.addr,e),Wt(t,e)}}function q2(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(r.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Ht(t,e))return;r.uniform4iv(this.addr,e),Wt(t,e)}}function Y2(r,e){const t=this.cache;t[0]!==e&&(r.uniform1ui(this.addr,e),t[0]=e)}function K2(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(r.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Ht(t,e))return;r.uniform2uiv(this.addr,e),Wt(t,e)}}function j2(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(r.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Ht(t,e))return;r.uniform3uiv(this.addr,e),Wt(t,e)}}function J2(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(r.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Ht(t,e))return;r.uniform4uiv(this.addr,e),Wt(t,e)}}function Z2(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i);let s;this.type===r.SAMPLER_2D_SHADOW?(Rc.compareFunction=t.isReversedDepthBuffer()?Zc:Jc,s=Rc):s=of,t.setTexture2D(e||s,i)}function $2(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTexture3D(e||cf,i)}function Q2(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTextureCube(e||lf,i)}function e_(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTexture2DArray(e||af,i)}function t_(r){switch(r){case 5126:return F2;case 35664:return O2;case 35665:return B2;case 35666:return z2;case 35674:return k2;case 35675:return G2;case 35676:return V2;case 5124:case 35670:return H2;case 35667:case 35671:return W2;case 35668:case 35672:return X2;case 35669:case 35673:return q2;case 5125:return Y2;case 36294:return K2;case 36295:return j2;case 36296:return J2;case 35678:case 36198:case 36298:case 36306:case 35682:return Z2;case 35679:case 36299:case 36307:return $2;case 35680:case 36300:case 36308:case 36293:return Q2;case 36289:case 36303:case 36311:case 36292:return e_}}function n_(r,e){r.uniform1fv(this.addr,e)}function i_(r,e){const t=Ns(e,this.size,2);r.uniform2fv(this.addr,t)}function s_(r,e){const t=Ns(e,this.size,3);r.uniform3fv(this.addr,t)}function r_(r,e){const t=Ns(e,this.size,4);r.uniform4fv(this.addr,t)}function o_(r,e){const t=Ns(e,this.size,4);r.uniformMatrix2fv(this.addr,!1,t)}function a_(r,e){const t=Ns(e,this.size,9);r.uniformMatrix3fv(this.addr,!1,t)}function c_(r,e){const t=Ns(e,this.size,16);r.uniformMatrix4fv(this.addr,!1,t)}function l_(r,e){r.uniform1iv(this.addr,e)}function h_(r,e){r.uniform2iv(this.addr,e)}function u_(r,e){r.uniform3iv(this.addr,e)}function f_(r,e){r.uniform4iv(this.addr,e)}function d_(r,e){r.uniform1uiv(this.addr,e)}function p_(r,e){r.uniform2uiv(this.addr,e)}function m_(r,e){r.uniform3uiv(this.addr,e)}function g_(r,e){r.uniform4uiv(this.addr,e)}function __(r,e,t){const n=this.cache,i=e.length,s=Po(t,i);Ht(n,s)||(r.uniform1iv(this.addr,s),Wt(n,s));let o;this.type===r.SAMPLER_2D_SHADOW?o=Rc:o=of;for(let c=0;c!==i;++c)t.setTexture2D(e[c]||o,s[c])}function x_(r,e,t){const n=this.cache,i=e.length,s=Po(t,i);Ht(n,s)||(r.uniform1iv(this.addr,s),Wt(n,s));for(let o=0;o!==i;++o)t.setTexture3D(e[o]||cf,s[o])}function v_(r,e,t){const n=this.cache,i=e.length,s=Po(t,i);Ht(n,s)||(r.uniform1iv(this.addr,s),Wt(n,s));for(let o=0;o!==i;++o)t.setTextureCube(e[o]||lf,s[o])}function y_(r,e,t){const n=this.cache,i=e.length,s=Po(t,i);Ht(n,s)||(r.uniform1iv(this.addr,s),Wt(n,s));for(let o=0;o!==i;++o)t.setTexture2DArray(e[o]||af,s[o])}function M_(r){switch(r){case 5126:return n_;case 35664:return i_;case 35665:return s_;case 35666:return r_;case 35674:return o_;case 35675:return a_;case 35676:return c_;case 5124:case 35670:return l_;case 35667:case 35671:return h_;case 35668:case 35672:return u_;case 35669:case 35673:return f_;case 5125:return d_;case 36294:return p_;case 36295:return m_;case 36296:return g_;case 35678:case 36198:case 36298:case 36306:case 35682:return __;case 35679:case 36299:case 36307:return x_;case 35680:case 36300:case 36308:case 36293:return v_;case 36289:case 36303:case 36311:case 36292:return y_}}class S_{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=t_(t.type)}}class b_{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=M_(t.type)}}class w_{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const i=this.seq;for(let s=0,o=i.length;s!==o;++s){const c=i[s];c.setValue(e,t[c.id],n)}}}const Ma=/(\w+)(\])?(\[|\.)?/g;function Vh(r,e){r.seq.push(e),r.map[e.id]=e}function T_(r,e,t){const n=r.name,i=n.length;for(Ma.lastIndex=0;;){const s=Ma.exec(n),o=Ma.lastIndex;let c=s[1];const l=s[2]==="]",a=s[3];if(l&&(c=c|0),a===void 0||a==="["&&o+2===i){Vh(t,a===void 0?new S_(c,r,e):new b_(c,r,e));break}else{let u=t.map[c];u===void 0&&(u=new w_(c),Vh(t,u)),t=u}}}class po{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let o=0;o<n;++o){const c=e.getActiveUniform(t,o),l=e.getUniformLocation(t,c.name);T_(c,l,this)}const i=[],s=[];for(const o of this.seq)o.type===e.SAMPLER_2D_SHADOW||o.type===e.SAMPLER_CUBE_SHADOW||o.type===e.SAMPLER_2D_ARRAY_SHADOW?i.push(o):s.push(o);i.length>0&&(this.seq=i.concat(s))}setValue(e,t,n,i){const s=this.map[t];s!==void 0&&s.setValue(e,n,i)}setOptional(e,t,n){const i=t[n];i!==void 0&&this.setValue(e,n,i)}static upload(e,t,n,i){for(let s=0,o=t.length;s!==o;++s){const c=t[s],l=n[c.id];l.needsUpdate!==!1&&c.setValue(e,l.value,i)}}static seqWithValue(e,t){const n=[];for(let i=0,s=e.length;i!==s;++i){const o=e[i];o.id in t&&n.push(o)}return n}}function Hh(r,e,t){const n=r.createShader(e);return r.shaderSource(n,t),r.compileShader(n),n}const E_=37297;let A_=0;function C_(r,e){const t=r.split(`
`),n=[],i=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let o=i;o<s;o++){const c=o+1;n.push(`${c===e?">":" "} ${c}: ${t[o]}`)}return n.join(`
`)}const Wh=new it;function R_(r){ht._getMatrix(Wh,ht.workingColorSpace,r);const e=`mat3( ${Wh.elements.map(t=>t.toFixed(4))} )`;switch(ht.getTransfer(r)){case yo:return[e,"LinearTransferOETF"];case mt:return[e,"sRGBTransferOETF"];default:return ze("WebGLProgram: Unsupported color space: ",r),[e,"LinearTransferOETF"]}}function Xh(r,e,t){const n=r.getShaderParameter(e,r.COMPILE_STATUS),s=(r.getShaderInfoLog(e)||"").trim();if(n&&s==="")return"";const o=/ERROR: 0:(\d+)/.exec(s);if(o){const c=parseInt(o[1]);return t.toUpperCase()+`

`+s+`

`+C_(r.getShaderSource(e),c)}else return s}function P_(r,e){const t=R_(e);return[`vec4 ${r}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}const L_={[Fc]:"Linear",[Oc]:"Reinhard",[Bc]:"Cineon",[Ao]:"ACESFilmic",[kc]:"AgX",[Gc]:"Neutral",[zc]:"Custom"};function I_(r,e){const t=L_[e];return t===void 0?(ze("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+r+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+r+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const ro=new P;function D_(){ht.getLuminanceCoefficients(ro);const r=ro.x.toFixed(4),e=ro.y.toFixed(4),t=ro.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${r}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function N_(r){return[r.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",r.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(tr).join(`
`)}function U_(r){const e=[];for(const t in r){const n=r[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function F_(r,e){const t={},n=r.getProgramParameter(e,r.ACTIVE_ATTRIBUTES);for(let i=0;i<n;i++){const s=r.getActiveAttrib(e,i),o=s.name;let c=1;s.type===r.FLOAT_MAT2&&(c=2),s.type===r.FLOAT_MAT3&&(c=3),s.type===r.FLOAT_MAT4&&(c=4),t[o]={type:s.type,location:r.getAttribLocation(e,o),locationSize:c}}return t}function tr(r){return r!==""}function qh(r,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return r.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Yh(r,e){return r.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const O_=/^[ \t]*#include +<([\w\d./]+)>/gm;function Pc(r){return r.replace(O_,z_)}const B_=new Map;function z_(r,e){let t=at[e];if(t===void 0){const n=B_.get(e);if(n!==void 0)t=at[n],ze('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return Pc(t)}const k_=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Kh(r){return r.replace(k_,G_)}function G_(r,e,t,n){let i="";for(let s=parseInt(e);s<parseInt(t);s++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return i}function jh(r){let e=`precision ${r.precision} float;
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
#define LOW_PRECISION`),e}const V_={[nr]:"SHADOWMAP_TYPE_PCF",[$s]:"SHADOWMAP_TYPE_VSM"};function H_(r){return V_[r.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const W_={[zi]:"ENVMAP_TYPE_CUBE",[ys]:"ENVMAP_TYPE_CUBE",[Co]:"ENVMAP_TYPE_CUBE_UV"};function X_(r){return r.envMap===!1?"ENVMAP_TYPE_CUBE":W_[r.envMapMode]||"ENVMAP_TYPE_CUBE"}const q_={[ys]:"ENVMAP_MODE_REFRACTION"};function Y_(r){return r.envMap===!1?"ENVMAP_MODE_REFLECTION":q_[r.envMapMode]||"ENVMAP_MODE_REFLECTION"}const K_={[_u]:"ENVMAP_BLENDING_MULTIPLY",[rd]:"ENVMAP_BLENDING_MIX",[od]:"ENVMAP_BLENDING_ADD"};function j_(r){return r.envMap===!1?"ENVMAP_BLENDING_NONE":K_[r.combine]||"ENVMAP_BLENDING_NONE"}function J_(r){const e=r.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:n,maxMip:t}}function Z_(r,e,t,n){const i=r.getContext(),s=t.defines;let o=t.vertexShader,c=t.fragmentShader;const l=H_(t),a=X_(t),h=Y_(t),u=j_(t),f=J_(t),_=N_(t),d=U_(s),g=i.createProgram();let p,m,x=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,d].filter(tr).join(`
`),p.length>0&&(p+=`
`),m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,d].filter(tr).join(`
`),m.length>0&&(m+=`
`)):(p=[jh(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,d,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(tr).join(`
`),m=[jh(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,d,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+a:"",t.envMap?"#define "+h:"",t.envMap?"#define "+u:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==qn?"#define TONE_MAPPING":"",t.toneMapping!==qn?at.tonemapping_pars_fragment:"",t.toneMapping!==qn?I_("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",at.colorspace_pars_fragment,P_("linearToOutputTexel",t.outputColorSpace),D_(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(tr).join(`
`)),o=Pc(o),o=qh(o,t),o=Yh(o,t),c=Pc(c),c=qh(c,t),c=Yh(c,t),o=Kh(o),c=Kh(c),t.isRawShaderMaterial!==!0&&(x=`#version 300 es
`,p=[_,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+p,m=["#define varying in",t.glslVersion===Fl?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Fl?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+m);const v=x+p+o,y=x+m+c,b=Hh(i,i.VERTEX_SHADER,v),S=Hh(i,i.FRAGMENT_SHADER,y);i.attachShader(g,b),i.attachShader(g,S),t.index0AttributeName!==void 0?i.bindAttribLocation(g,0,t.index0AttributeName):t.morphTargets===!0&&i.bindAttribLocation(g,0,"position"),i.linkProgram(g);function w(L){if(r.debug.checkShaderErrors){const I=i.getProgramInfoLog(g)||"",N=i.getShaderInfoLog(b)||"",B=i.getShaderInfoLog(S)||"",U=I.trim(),O=N.trim(),k=B.trim();let J=!0,ae=!0;if(i.getProgramParameter(g,i.LINK_STATUS)===!1)if(J=!1,typeof r.debug.onShaderError=="function")r.debug.onShaderError(i,g,b,S);else{const pe=Xh(i,b,"vertex"),Ee=Xh(i,S,"fragment");Xe("THREE.WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(g,i.VALIDATE_STATUS)+`

Material Name: `+L.name+`
Material Type: `+L.type+`

Program Info Log: `+U+`
`+pe+`
`+Ee)}else U!==""?ze("WebGLProgram: Program Info Log:",U):(O===""||k==="")&&(ae=!1);ae&&(L.diagnostics={runnable:J,programLog:U,vertexShader:{log:O,prefix:p},fragmentShader:{log:k,prefix:m}})}i.deleteShader(b),i.deleteShader(S),M=new po(i,g),T=F_(i,g)}let M;this.getUniforms=function(){return M===void 0&&w(this),M};let T;this.getAttributes=function(){return T===void 0&&w(this),T};let A=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return A===!1&&(A=i.getProgramParameter(g,E_)),A},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(g),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=A_++,this.cacheKey=e,this.usedTimes=1,this.program=g,this.vertexShader=b,this.fragmentShader=S,this}let $_=0;class Q_{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,n=e.fragmentShader,i=this._getShaderStage(t),s=this._getShaderStage(n),o=this._getShaderCacheForMaterial(e);return o.has(i)===!1&&(o.add(i),i.usedTimes++),o.has(s)===!1&&(o.add(s),s.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new e1(e),t.set(e,n)),n}}class e1{constructor(e){this.id=$_++,this.code=e,this.usedTimes=0}}function t1(r){return r===Gi||r===_o||r===xo}function n1(r,e,t,n,i,s){const o=new el,c=new Q_,l=new Set,a=[],h=new Map,u=n.logarithmicDepthBuffer;let f=n.precision;const _={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function d(M){return l.add(M),M===0?"uv":`uv${M}`}function g(M,T,A,L,I,N){const B=L.fog,U=I.geometry,O=M.isMeshStandardMaterial||M.isMeshLambertMaterial||M.isMeshPhongMaterial?L.environment:null,k=M.isMeshStandardMaterial||M.isMeshLambertMaterial&&!M.envMap||M.isMeshPhongMaterial&&!M.envMap,J=e.get(M.envMap||O,k),ae=J&&J.mapping===Co?J.image.height:null,pe=_[M.type];M.precision!==null&&(f=n.getMaxPrecision(M.precision),f!==M.precision&&ze("WebGLProgram.getParameters:",M.precision,"not supported, using",f,"instead."));const Ee=U.morphAttributes.position||U.morphAttributes.normal||U.morphAttributes.color,Ue=Ee!==void 0?Ee.length:0;let et=0;U.morphAttributes.position!==void 0&&(et=1),U.morphAttributes.normal!==void 0&&(et=2),U.morphAttributes.color!==void 0&&(et=3);let nt,Ye,Q,we;if(pe){const st=zn[pe];nt=st.vertexShader,Ye=st.fragmentShader}else nt=M.vertexShader,Ye=M.fragmentShader,c.update(M),Q=c.getVertexShaderID(M),we=c.getFragmentShaderID(M);const me=r.getRenderTarget(),Fe=r.state.buffers.depth.getReversed(),qe=I.isInstancedMesh===!0,Oe=I.isBatchedMesh===!0,$e=!!M.map,We=!!M.matcap,te=!!J,ue=!!M.aoMap,ie=!!M.lightMap,be=!!M.bumpMap,Se=!!M.normalMap,Ke=!!M.displacementMap,D=!!M.emissiveMap,Z=!!M.metalnessMap,ee=!!M.roughnessMap,Pe=M.anisotropy>0,ne=M.clearcoat>0,Ze=M.dispersion>0,R=M.iridescence>0,E=M.sheen>0,V=M.transmission>0,K=Pe&&!!M.anisotropyMap,se=ne&&!!M.clearcoatMap,fe=ne&&!!M.clearcoatNormalMap,ge=ne&&!!M.clearcoatRoughnessMap,q=R&&!!M.iridescenceMap,$=R&&!!M.iridescenceThicknessMap,Re=E&&!!M.sheenColorMap,De=E&&!!M.sheenRoughnessMap,ve=!!M.specularMap,_e=!!M.specularColorMap,tt=!!M.specularIntensityMap,ot=V&&!!M.transmissionMap,pt=V&&!!M.thicknessMap,F=!!M.gradientMap,xe=!!M.alphaMap,j=M.alphaTest>0,Le=!!M.alphaHash,ye=!!M.extensions;let le=qn;M.toneMapped&&(me===null||me.isXRRenderTarget===!0)&&(le=r.toneMapping);const ke={shaderID:pe,shaderType:M.type,shaderName:M.name,vertexShader:nt,fragmentShader:Ye,defines:M.defines,customVertexShaderID:Q,customFragmentShaderID:we,isRawShaderMaterial:M.isRawShaderMaterial===!0,glslVersion:M.glslVersion,precision:f,batching:Oe,batchingColor:Oe&&I._colorsTexture!==null,instancing:qe,instancingColor:qe&&I.instanceColor!==null,instancingMorph:qe&&I.morphTexture!==null,outputColorSpace:me===null?r.outputColorSpace:me.isXRRenderTarget===!0?me.texture.colorSpace:ht.workingColorSpace,alphaToCoverage:!!M.alphaToCoverage,map:$e,matcap:We,envMap:te,envMapMode:te&&J.mapping,envMapCubeUVHeight:ae,aoMap:ue,lightMap:ie,bumpMap:be,normalMap:Se,displacementMap:Ke,emissiveMap:D,normalMapObjectSpace:Se&&M.normalMapType===dd,normalMapTangentSpace:Se&&M.normalMapType===_c,packedNormalMap:Se&&M.normalMapType===_c&&t1(M.normalMap.format),metalnessMap:Z,roughnessMap:ee,anisotropy:Pe,anisotropyMap:K,clearcoat:ne,clearcoatMap:se,clearcoatNormalMap:fe,clearcoatRoughnessMap:ge,dispersion:Ze,iridescence:R,iridescenceMap:q,iridescenceThicknessMap:$,sheen:E,sheenColorMap:Re,sheenRoughnessMap:De,specularMap:ve,specularColorMap:_e,specularIntensityMap:tt,transmission:V,transmissionMap:ot,thicknessMap:pt,gradientMap:F,opaque:M.transparent===!1&&M.blending===gs&&M.alphaToCoverage===!1,alphaMap:xe,alphaTest:j,alphaHash:Le,combine:M.combine,mapUv:$e&&d(M.map.channel),aoMapUv:ue&&d(M.aoMap.channel),lightMapUv:ie&&d(M.lightMap.channel),bumpMapUv:be&&d(M.bumpMap.channel),normalMapUv:Se&&d(M.normalMap.channel),displacementMapUv:Ke&&d(M.displacementMap.channel),emissiveMapUv:D&&d(M.emissiveMap.channel),metalnessMapUv:Z&&d(M.metalnessMap.channel),roughnessMapUv:ee&&d(M.roughnessMap.channel),anisotropyMapUv:K&&d(M.anisotropyMap.channel),clearcoatMapUv:se&&d(M.clearcoatMap.channel),clearcoatNormalMapUv:fe&&d(M.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ge&&d(M.clearcoatRoughnessMap.channel),iridescenceMapUv:q&&d(M.iridescenceMap.channel),iridescenceThicknessMapUv:$&&d(M.iridescenceThicknessMap.channel),sheenColorMapUv:Re&&d(M.sheenColorMap.channel),sheenRoughnessMapUv:De&&d(M.sheenRoughnessMap.channel),specularMapUv:ve&&d(M.specularMap.channel),specularColorMapUv:_e&&d(M.specularColorMap.channel),specularIntensityMapUv:tt&&d(M.specularIntensityMap.channel),transmissionMapUv:ot&&d(M.transmissionMap.channel),thicknessMapUv:pt&&d(M.thicknessMap.channel),alphaMapUv:xe&&d(M.alphaMap.channel),vertexTangents:!!U.attributes.tangent&&(Se||Pe),vertexNormals:!!U.attributes.normal,vertexColors:M.vertexColors,vertexAlphas:M.vertexColors===!0&&!!U.attributes.color&&U.attributes.color.itemSize===4,pointsUvs:I.isPoints===!0&&!!U.attributes.uv&&($e||xe),fog:!!B,useFog:M.fog===!0,fogExp2:!!B&&B.isFogExp2,flatShading:M.wireframe===!1&&(M.flatShading===!0||U.attributes.normal===void 0&&Se===!1&&(M.isMeshLambertMaterial||M.isMeshPhongMaterial||M.isMeshStandardMaterial||M.isMeshPhysicalMaterial)),sizeAttenuation:M.sizeAttenuation===!0,logarithmicDepthBuffer:u,reversedDepthBuffer:Fe,skinning:I.isSkinnedMesh===!0,morphTargets:U.morphAttributes.position!==void 0,morphNormals:U.morphAttributes.normal!==void 0,morphColors:U.morphAttributes.color!==void 0,morphTargetsCount:Ue,morphTextureStride:et,numDirLights:T.directional.length,numPointLights:T.point.length,numSpotLights:T.spot.length,numSpotLightMaps:T.spotLightMap.length,numRectAreaLights:T.rectArea.length,numHemiLights:T.hemi.length,numDirLightShadows:T.directionalShadowMap.length,numPointLightShadows:T.pointShadowMap.length,numSpotLightShadows:T.spotShadowMap.length,numSpotLightShadowsWithMaps:T.numSpotLightShadowsWithMaps,numLightProbes:T.numLightProbes,numLightProbeGrids:N.length,numClippingPlanes:s.numPlanes,numClipIntersection:s.numIntersection,dithering:M.dithering,shadowMapEnabled:r.shadowMap.enabled&&A.length>0,shadowMapType:r.shadowMap.type,toneMapping:le,decodeVideoTexture:$e&&M.map.isVideoTexture===!0&&ht.getTransfer(M.map.colorSpace)===mt,decodeVideoTextureEmissive:D&&M.emissiveMap.isVideoTexture===!0&&ht.getTransfer(M.emissiveMap.colorSpace)===mt,premultipliedAlpha:M.premultipliedAlpha,doubleSided:M.side===St,flipSided:M.side===Yt,useDepthPacking:M.depthPacking>=0,depthPacking:M.depthPacking||0,index0AttributeName:M.index0AttributeName,extensionClipCullDistance:ye&&M.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(ye&&M.extensions.multiDraw===!0||Oe)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:M.customProgramCacheKey()};return ke.vertexUv1s=l.has(1),ke.vertexUv2s=l.has(2),ke.vertexUv3s=l.has(3),l.clear(),ke}function p(M){const T=[];if(M.shaderID?T.push(M.shaderID):(T.push(M.customVertexShaderID),T.push(M.customFragmentShaderID)),M.defines!==void 0)for(const A in M.defines)T.push(A),T.push(M.defines[A]);return M.isRawShaderMaterial===!1&&(m(T,M),x(T,M),T.push(r.outputColorSpace)),T.push(M.customProgramCacheKey),T.join()}function m(M,T){M.push(T.precision),M.push(T.outputColorSpace),M.push(T.envMapMode),M.push(T.envMapCubeUVHeight),M.push(T.mapUv),M.push(T.alphaMapUv),M.push(T.lightMapUv),M.push(T.aoMapUv),M.push(T.bumpMapUv),M.push(T.normalMapUv),M.push(T.displacementMapUv),M.push(T.emissiveMapUv),M.push(T.metalnessMapUv),M.push(T.roughnessMapUv),M.push(T.anisotropyMapUv),M.push(T.clearcoatMapUv),M.push(T.clearcoatNormalMapUv),M.push(T.clearcoatRoughnessMapUv),M.push(T.iridescenceMapUv),M.push(T.iridescenceThicknessMapUv),M.push(T.sheenColorMapUv),M.push(T.sheenRoughnessMapUv),M.push(T.specularMapUv),M.push(T.specularColorMapUv),M.push(T.specularIntensityMapUv),M.push(T.transmissionMapUv),M.push(T.thicknessMapUv),M.push(T.combine),M.push(T.fogExp2),M.push(T.sizeAttenuation),M.push(T.morphTargetsCount),M.push(T.morphAttributeCount),M.push(T.numDirLights),M.push(T.numPointLights),M.push(T.numSpotLights),M.push(T.numSpotLightMaps),M.push(T.numHemiLights),M.push(T.numRectAreaLights),M.push(T.numDirLightShadows),M.push(T.numPointLightShadows),M.push(T.numSpotLightShadows),M.push(T.numSpotLightShadowsWithMaps),M.push(T.numLightProbes),M.push(T.shadowMapType),M.push(T.toneMapping),M.push(T.numClippingPlanes),M.push(T.numClipIntersection),M.push(T.depthPacking)}function x(M,T){o.disableAll(),T.instancing&&o.enable(0),T.instancingColor&&o.enable(1),T.instancingMorph&&o.enable(2),T.matcap&&o.enable(3),T.envMap&&o.enable(4),T.normalMapObjectSpace&&o.enable(5),T.normalMapTangentSpace&&o.enable(6),T.clearcoat&&o.enable(7),T.iridescence&&o.enable(8),T.alphaTest&&o.enable(9),T.vertexColors&&o.enable(10),T.vertexAlphas&&o.enable(11),T.vertexUv1s&&o.enable(12),T.vertexUv2s&&o.enable(13),T.vertexUv3s&&o.enable(14),T.vertexTangents&&o.enable(15),T.anisotropy&&o.enable(16),T.alphaHash&&o.enable(17),T.batching&&o.enable(18),T.dispersion&&o.enable(19),T.batchingColor&&o.enable(20),T.gradientMap&&o.enable(21),T.packedNormalMap&&o.enable(22),T.vertexNormals&&o.enable(23),M.push(o.mask),o.disableAll(),T.fog&&o.enable(0),T.useFog&&o.enable(1),T.flatShading&&o.enable(2),T.logarithmicDepthBuffer&&o.enable(3),T.reversedDepthBuffer&&o.enable(4),T.skinning&&o.enable(5),T.morphTargets&&o.enable(6),T.morphNormals&&o.enable(7),T.morphColors&&o.enable(8),T.premultipliedAlpha&&o.enable(9),T.shadowMapEnabled&&o.enable(10),T.doubleSided&&o.enable(11),T.flipSided&&o.enable(12),T.useDepthPacking&&o.enable(13),T.dithering&&o.enable(14),T.transmission&&o.enable(15),T.sheen&&o.enable(16),T.opaque&&o.enable(17),T.pointsUvs&&o.enable(18),T.decodeVideoTexture&&o.enable(19),T.decodeVideoTextureEmissive&&o.enable(20),T.alphaToCoverage&&o.enable(21),T.numLightProbeGrids>0&&o.enable(22),M.push(o.mask)}function v(M){const T=_[M.type];let A;if(T){const L=zn[T];A=Ts.clone(L.uniforms)}else A=M.uniforms;return A}function y(M,T){let A=h.get(T);return A!==void 0?++A.usedTimes:(A=new Z_(r,T,M,i),a.push(A),h.set(T,A)),A}function b(M){if(--M.usedTimes===0){const T=a.indexOf(M);a[T]=a[a.length-1],a.pop(),h.delete(M.cacheKey),M.destroy()}}function S(M){c.remove(M)}function w(){c.dispose()}return{getParameters:g,getProgramCacheKey:p,getUniforms:v,acquireProgram:y,releaseProgram:b,releaseShaderCache:S,programs:a,dispose:w}}function i1(){let r=new WeakMap;function e(o){return r.has(o)}function t(o){let c=r.get(o);return c===void 0&&(c={},r.set(o,c)),c}function n(o){r.delete(o)}function i(o,c,l){r.get(o)[c]=l}function s(){r=new WeakMap}return{has:e,get:t,remove:n,update:i,dispose:s}}function s1(r,e){return r.groupOrder!==e.groupOrder?r.groupOrder-e.groupOrder:r.renderOrder!==e.renderOrder?r.renderOrder-e.renderOrder:r.material.id!==e.material.id?r.material.id-e.material.id:r.materialVariant!==e.materialVariant?r.materialVariant-e.materialVariant:r.z!==e.z?r.z-e.z:r.id-e.id}function Jh(r,e){return r.groupOrder!==e.groupOrder?r.groupOrder-e.groupOrder:r.renderOrder!==e.renderOrder?r.renderOrder-e.renderOrder:r.z!==e.z?e.z-r.z:r.id-e.id}function Zh(){const r=[];let e=0;const t=[],n=[],i=[];function s(){e=0,t.length=0,n.length=0,i.length=0}function o(f){let _=0;return f.isInstancedMesh&&(_+=2),f.isSkinnedMesh&&(_+=1),_}function c(f,_,d,g,p,m){let x=r[e];return x===void 0?(x={id:f.id,object:f,geometry:_,material:d,materialVariant:o(f),groupOrder:g,renderOrder:f.renderOrder,z:p,group:m},r[e]=x):(x.id=f.id,x.object=f,x.geometry=_,x.material=d,x.materialVariant=o(f),x.groupOrder=g,x.renderOrder=f.renderOrder,x.z=p,x.group=m),e++,x}function l(f,_,d,g,p,m){const x=c(f,_,d,g,p,m);d.transmission>0?n.push(x):d.transparent===!0?i.push(x):t.push(x)}function a(f,_,d,g,p,m){const x=c(f,_,d,g,p,m);d.transmission>0?n.unshift(x):d.transparent===!0?i.unshift(x):t.unshift(x)}function h(f,_){t.length>1&&t.sort(f||s1),n.length>1&&n.sort(_||Jh),i.length>1&&i.sort(_||Jh)}function u(){for(let f=e,_=r.length;f<_;f++){const d=r[f];if(d.id===null)break;d.id=null,d.object=null,d.geometry=null,d.material=null,d.group=null}}return{opaque:t,transmissive:n,transparent:i,init:s,push:l,unshift:a,finish:u,sort:h}}function r1(){let r=new WeakMap;function e(n,i){const s=r.get(n);let o;return s===void 0?(o=new Zh,r.set(n,[o])):i>=s.length?(o=new Zh,s.push(o)):o=s[i],o}function t(){r=new WeakMap}return{get:e,dispose:t}}function o1(){const r={};return{get:function(e){if(r[e.id]!==void 0)return r[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new P,color:new ce};break;case"SpotLight":t={position:new P,direction:new P,color:new ce,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new P,color:new ce,distance:0,decay:0};break;case"HemisphereLight":t={direction:new P,skyColor:new ce,groundColor:new ce};break;case"RectAreaLight":t={color:new ce,position:new P,halfWidth:new P,halfHeight:new P};break}return r[e.id]=t,t}}}function a1(){const r={};return{get:function(e){if(r[e.id]!==void 0)return r[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new re};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new re};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new re,shadowCameraNear:1,shadowCameraFar:1e3};break}return r[e.id]=t,t}}}let c1=0;function l1(r,e){return(e.castShadow?2:0)-(r.castShadow?2:0)+(e.map?1:0)-(r.map?1:0)}function h1(r){const e=new o1,t=a1(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let a=0;a<9;a++)n.probe.push(new P);const i=new P,s=new Qe,o=new Qe;function c(a){let h=0,u=0,f=0;for(let T=0;T<9;T++)n.probe[T].set(0,0,0);let _=0,d=0,g=0,p=0,m=0,x=0,v=0,y=0,b=0,S=0,w=0;a.sort(l1);for(let T=0,A=a.length;T<A;T++){const L=a[T],I=L.color,N=L.intensity,B=L.distance;let U=null;if(L.shadow&&L.shadow.map&&(L.shadow.map.texture.format===Gi?U=L.shadow.map.texture:U=L.shadow.map.depthTexture||L.shadow.map.texture),L.isAmbientLight)h+=I.r*N,u+=I.g*N,f+=I.b*N;else if(L.isLightProbe){for(let O=0;O<9;O++)n.probe[O].addScaledVector(L.sh.coefficients[O],N);w++}else if(L.isDirectionalLight){const O=e.get(L);if(O.color.copy(L.color).multiplyScalar(L.intensity),L.castShadow){const k=L.shadow,J=t.get(L);J.shadowIntensity=k.intensity,J.shadowBias=k.bias,J.shadowNormalBias=k.normalBias,J.shadowRadius=k.radius,J.shadowMapSize=k.mapSize,n.directionalShadow[_]=J,n.directionalShadowMap[_]=U,n.directionalShadowMatrix[_]=L.shadow.matrix,x++}n.directional[_]=O,_++}else if(L.isSpotLight){const O=e.get(L);O.position.setFromMatrixPosition(L.matrixWorld),O.color.copy(I).multiplyScalar(N),O.distance=B,O.coneCos=Math.cos(L.angle),O.penumbraCos=Math.cos(L.angle*(1-L.penumbra)),O.decay=L.decay,n.spot[g]=O;const k=L.shadow;if(L.map&&(n.spotLightMap[b]=L.map,b++,k.updateMatrices(L),L.castShadow&&S++),n.spotLightMatrix[g]=k.matrix,L.castShadow){const J=t.get(L);J.shadowIntensity=k.intensity,J.shadowBias=k.bias,J.shadowNormalBias=k.normalBias,J.shadowRadius=k.radius,J.shadowMapSize=k.mapSize,n.spotShadow[g]=J,n.spotShadowMap[g]=U,y++}g++}else if(L.isRectAreaLight){const O=e.get(L);O.color.copy(I).multiplyScalar(N),O.halfWidth.set(L.width*.5,0,0),O.halfHeight.set(0,L.height*.5,0),n.rectArea[p]=O,p++}else if(L.isPointLight){const O=e.get(L);if(O.color.copy(L.color).multiplyScalar(L.intensity),O.distance=L.distance,O.decay=L.decay,L.castShadow){const k=L.shadow,J=t.get(L);J.shadowIntensity=k.intensity,J.shadowBias=k.bias,J.shadowNormalBias=k.normalBias,J.shadowRadius=k.radius,J.shadowMapSize=k.mapSize,J.shadowCameraNear=k.camera.near,J.shadowCameraFar=k.camera.far,n.pointShadow[d]=J,n.pointShadowMap[d]=U,n.pointShadowMatrix[d]=L.shadow.matrix,v++}n.point[d]=O,d++}else if(L.isHemisphereLight){const O=e.get(L);O.skyColor.copy(L.color).multiplyScalar(N),O.groundColor.copy(L.groundColor).multiplyScalar(N),n.hemi[m]=O,m++}}p>0&&(r.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=Te.LTC_FLOAT_1,n.rectAreaLTC2=Te.LTC_FLOAT_2):(n.rectAreaLTC1=Te.LTC_HALF_1,n.rectAreaLTC2=Te.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=u,n.ambient[2]=f;const M=n.hash;(M.directionalLength!==_||M.pointLength!==d||M.spotLength!==g||M.rectAreaLength!==p||M.hemiLength!==m||M.numDirectionalShadows!==x||M.numPointShadows!==v||M.numSpotShadows!==y||M.numSpotMaps!==b||M.numLightProbes!==w)&&(n.directional.length=_,n.spot.length=g,n.rectArea.length=p,n.point.length=d,n.hemi.length=m,n.directionalShadow.length=x,n.directionalShadowMap.length=x,n.pointShadow.length=v,n.pointShadowMap.length=v,n.spotShadow.length=y,n.spotShadowMap.length=y,n.directionalShadowMatrix.length=x,n.pointShadowMatrix.length=v,n.spotLightMatrix.length=y+b-S,n.spotLightMap.length=b,n.numSpotLightShadowsWithMaps=S,n.numLightProbes=w,M.directionalLength=_,M.pointLength=d,M.spotLength=g,M.rectAreaLength=p,M.hemiLength=m,M.numDirectionalShadows=x,M.numPointShadows=v,M.numSpotShadows=y,M.numSpotMaps=b,M.numLightProbes=w,n.version=c1++)}function l(a,h){let u=0,f=0,_=0,d=0,g=0;const p=h.matrixWorldInverse;for(let m=0,x=a.length;m<x;m++){const v=a[m];if(v.isDirectionalLight){const y=n.directional[u];y.direction.setFromMatrixPosition(v.matrixWorld),i.setFromMatrixPosition(v.target.matrixWorld),y.direction.sub(i),y.direction.transformDirection(p),u++}else if(v.isSpotLight){const y=n.spot[_];y.position.setFromMatrixPosition(v.matrixWorld),y.position.applyMatrix4(p),y.direction.setFromMatrixPosition(v.matrixWorld),i.setFromMatrixPosition(v.target.matrixWorld),y.direction.sub(i),y.direction.transformDirection(p),_++}else if(v.isRectAreaLight){const y=n.rectArea[d];y.position.setFromMatrixPosition(v.matrixWorld),y.position.applyMatrix4(p),o.identity(),s.copy(v.matrixWorld),s.premultiply(p),o.extractRotation(s),y.halfWidth.set(v.width*.5,0,0),y.halfHeight.set(0,v.height*.5,0),y.halfWidth.applyMatrix4(o),y.halfHeight.applyMatrix4(o),d++}else if(v.isPointLight){const y=n.point[f];y.position.setFromMatrixPosition(v.matrixWorld),y.position.applyMatrix4(p),f++}else if(v.isHemisphereLight){const y=n.hemi[g];y.direction.setFromMatrixPosition(v.matrixWorld),y.direction.transformDirection(p),g++}}}return{setup:c,setupView:l,state:n}}function $h(r){const e=new h1(r),t=[],n=[],i=[];function s(f){u.camera=f,t.length=0,n.length=0,i.length=0}function o(f){t.push(f)}function c(f){n.push(f)}function l(f){i.push(f)}function a(){e.setup(t)}function h(f){e.setupView(t,f)}const u={lightsArray:t,shadowsArray:n,lightProbeGridArray:i,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:s,state:u,setupLights:a,setupLightsView:h,pushLight:o,pushShadow:c,pushLightProbeGrid:l}}function u1(r){let e=new WeakMap;function t(i,s=0){const o=e.get(i);let c;return o===void 0?(c=new $h(r),e.set(i,[c])):s>=o.length?(c=new $h(r),o.push(c)):c=o[s],c}function n(){e=new WeakMap}return{get:t,dispose:n}}const f1=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,d1=`uniform sampler2D shadow_pass;
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
}`,p1=[new P(1,0,0),new P(-1,0,0),new P(0,1,0),new P(0,-1,0),new P(0,0,1),new P(0,0,-1)],m1=[new P(0,-1,0),new P(0,-1,0),new P(0,0,1),new P(0,0,-1),new P(0,-1,0),new P(0,-1,0)],Qh=new Qe,js=new P,Sa=new P;function g1(r,e,t){let n=new il;const i=new re,s=new re,o=new xt,c=new Jp,l=new Zp,a={},h=t.maxTextureSize,u={[ai]:Yt,[Yt]:ai,[St]:St},f=new Gt({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new re},radius:{value:4}},vertexShader:f1,fragmentShader:d1}),_=f.clone();_.defines.HORIZONTAL_PASS=1;const d=new wt;d.setAttribute("position",new Rt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const g=new z(d,f),p=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=nr;let m=this.type;this.render=function(S,w,M){if(p.enabled===!1||p.autoUpdate===!1&&p.needsUpdate===!1||S.length===0)return;this.type===kf&&(ze("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."),this.type=nr);const T=r.getRenderTarget(),A=r.getActiveCubeFace(),L=r.getActiveMipmapLevel(),I=r.state;I.setBlending(Xn),I.buffers.depth.getReversed()===!0?I.buffers.color.setClear(0,0,0,0):I.buffers.color.setClear(1,1,1,1),I.buffers.depth.setTest(!0),I.setScissorTest(!1);const N=m!==this.type;N&&w.traverse(function(B){B.material&&(Array.isArray(B.material)?B.material.forEach(U=>U.needsUpdate=!0):B.material.needsUpdate=!0)});for(let B=0,U=S.length;B<U;B++){const O=S[B],k=O.shadow;if(k===void 0){ze("WebGLShadowMap:",O,"has no shadow.");continue}if(k.autoUpdate===!1&&k.needsUpdate===!1)continue;i.copy(k.mapSize);const J=k.getFrameExtents();i.multiply(J),s.copy(k.mapSize),(i.x>h||i.y>h)&&(i.x>h&&(s.x=Math.floor(h/J.x),i.x=s.x*J.x,k.mapSize.x=s.x),i.y>h&&(s.y=Math.floor(h/J.y),i.y=s.y*J.y,k.mapSize.y=s.y));const ae=r.state.buffers.depth.getReversed();if(k.camera._reversedDepth=ae,k.map===null||N===!0){if(k.map!==null&&(k.map.depthTexture!==null&&(k.map.depthTexture.dispose(),k.map.depthTexture=null),k.map.dispose()),this.type===$s){if(O.isPointLight){ze("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}k.map=new on(i.x,i.y,{format:Gi,type:cn,minFilter:kt,magFilter:kt,generateMipmaps:!1}),k.map.texture.name=O.name+".shadowMap",k.map.depthTexture=new Ss(i.x,i.y,Sn),k.map.depthTexture.name=O.name+".shadowMapDepth",k.map.depthTexture.format=ci,k.map.depthTexture.compareFunction=null,k.map.depthTexture.minFilter=zt,k.map.depthTexture.magFilter=zt}else O.isPointLight?(k.map=new rf(i.x),k.map.depthTexture=new pp(i.x,Yn)):(k.map=new on(i.x,i.y),k.map.depthTexture=new Ss(i.x,i.y,Yn)),k.map.depthTexture.name=O.name+".shadowMap",k.map.depthTexture.format=ci,this.type===nr?(k.map.depthTexture.compareFunction=ae?Zc:Jc,k.map.depthTexture.minFilter=kt,k.map.depthTexture.magFilter=kt):(k.map.depthTexture.compareFunction=null,k.map.depthTexture.minFilter=zt,k.map.depthTexture.magFilter=zt);k.camera.updateProjectionMatrix()}const pe=k.map.isWebGLCubeRenderTarget?6:1;for(let Ee=0;Ee<pe;Ee++){if(k.map.isWebGLCubeRenderTarget)r.setRenderTarget(k.map,Ee),r.clear();else{Ee===0&&(r.setRenderTarget(k.map),r.clear());const Ue=k.getViewport(Ee);o.set(s.x*Ue.x,s.y*Ue.y,s.x*Ue.z,s.y*Ue.w),I.viewport(o)}if(O.isPointLight){const Ue=k.camera,et=k.matrix,nt=O.distance||Ue.far;nt!==Ue.far&&(Ue.far=nt,Ue.updateProjectionMatrix()),js.setFromMatrixPosition(O.matrixWorld),Ue.position.copy(js),Sa.copy(Ue.position),Sa.add(p1[Ee]),Ue.up.copy(m1[Ee]),Ue.lookAt(Sa),Ue.updateMatrixWorld(),et.makeTranslation(-js.x,-js.y,-js.z),Qh.multiplyMatrices(Ue.projectionMatrix,Ue.matrixWorldInverse),k._frustum.setFromProjectionMatrix(Qh,Ue.coordinateSystem,Ue.reversedDepth)}else k.updateMatrices(O);n=k.getFrustum(),y(w,M,k.camera,O,this.type)}k.isPointLightShadow!==!0&&this.type===$s&&x(k,M),k.needsUpdate=!1}m=this.type,p.needsUpdate=!1,r.setRenderTarget(T,A,L)};function x(S,w){const M=e.update(g);f.defines.VSM_SAMPLES!==S.blurSamples&&(f.defines.VSM_SAMPLES=S.blurSamples,_.defines.VSM_SAMPLES=S.blurSamples,f.needsUpdate=!0,_.needsUpdate=!0),S.mapPass===null&&(S.mapPass=new on(i.x,i.y,{format:Gi,type:cn})),f.uniforms.shadow_pass.value=S.map.depthTexture,f.uniforms.resolution.value=S.mapSize,f.uniforms.radius.value=S.radius,r.setRenderTarget(S.mapPass),r.clear(),r.renderBufferDirect(w,null,M,f,g,null),_.uniforms.shadow_pass.value=S.mapPass.texture,_.uniforms.resolution.value=S.mapSize,_.uniforms.radius.value=S.radius,r.setRenderTarget(S.map),r.clear(),r.renderBufferDirect(w,null,M,_,g,null)}function v(S,w,M,T){let A=null;const L=M.isPointLight===!0?S.customDistanceMaterial:S.customDepthMaterial;if(L!==void 0)A=L;else if(A=M.isPointLight===!0?l:c,r.localClippingEnabled&&w.clipShadows===!0&&Array.isArray(w.clippingPlanes)&&w.clippingPlanes.length!==0||w.displacementMap&&w.displacementScale!==0||w.alphaMap&&w.alphaTest>0||w.map&&w.alphaTest>0||w.alphaToCoverage===!0){const I=A.uuid,N=w.uuid;let B=a[I];B===void 0&&(B={},a[I]=B);let U=B[N];U===void 0&&(U=A.clone(),B[N]=U,w.addEventListener("dispose",b)),A=U}if(A.visible=w.visible,A.wireframe=w.wireframe,T===$s?A.side=w.shadowSide!==null?w.shadowSide:w.side:A.side=w.shadowSide!==null?w.shadowSide:u[w.side],A.alphaMap=w.alphaMap,A.alphaTest=w.alphaToCoverage===!0?.5:w.alphaTest,A.map=w.map,A.clipShadows=w.clipShadows,A.clippingPlanes=w.clippingPlanes,A.clipIntersection=w.clipIntersection,A.displacementMap=w.displacementMap,A.displacementScale=w.displacementScale,A.displacementBias=w.displacementBias,A.wireframeLinewidth=w.wireframeLinewidth,A.linewidth=w.linewidth,M.isPointLight===!0&&A.isMeshDistanceMaterial===!0){const I=r.properties.get(A);I.light=M}return A}function y(S,w,M,T,A){if(S.visible===!1)return;if(S.layers.test(w.layers)&&(S.isMesh||S.isLine||S.isPoints)&&(S.castShadow||S.receiveShadow&&A===$s)&&(!S.frustumCulled||n.intersectsObject(S))){S.modelViewMatrix.multiplyMatrices(M.matrixWorldInverse,S.matrixWorld);const N=e.update(S),B=S.material;if(Array.isArray(B)){const U=N.groups;for(let O=0,k=U.length;O<k;O++){const J=U[O],ae=B[J.materialIndex];if(ae&&ae.visible){const pe=v(S,ae,T,A);S.onBeforeShadow(r,S,w,M,N,pe,J),r.renderBufferDirect(M,null,N,pe,S,J),S.onAfterShadow(r,S,w,M,N,pe,J)}}}else if(B.visible){const U=v(S,B,T,A);S.onBeforeShadow(r,S,w,M,N,U,null),r.renderBufferDirect(M,null,N,U,S,null),S.onAfterShadow(r,S,w,M,N,U,null)}}const I=S.children;for(let N=0,B=I.length;N<B;N++)y(I[N],w,M,T,A)}function b(S){S.target.removeEventListener("dispose",b);for(const M in a){const T=a[M],A=S.target.uuid;A in T&&(T[A].dispose(),delete T[A])}}}function _1(r,e){function t(){let F=!1;const xe=new xt;let j=null;const Le=new xt(0,0,0,0);return{setMask:function(ye){j!==ye&&!F&&(r.colorMask(ye,ye,ye,ye),j=ye)},setLocked:function(ye){F=ye},setClear:function(ye,le,ke,st,Dt){Dt===!0&&(ye*=st,le*=st,ke*=st),xe.set(ye,le,ke,st),Le.equals(xe)===!1&&(r.clearColor(ye,le,ke,st),Le.copy(xe))},reset:function(){F=!1,j=null,Le.set(-1,0,0,0)}}}function n(){let F=!1,xe=!1,j=null,Le=null,ye=null;return{setReversed:function(le){if(xe!==le){const ke=e.get("EXT_clip_control");le?ke.clipControlEXT(ke.LOWER_LEFT_EXT,ke.ZERO_TO_ONE_EXT):ke.clipControlEXT(ke.LOWER_LEFT_EXT,ke.NEGATIVE_ONE_TO_ONE_EXT),xe=le;const st=ye;ye=null,this.setClear(st)}},getReversed:function(){return xe},setTest:function(le){le?me(r.DEPTH_TEST):Fe(r.DEPTH_TEST)},setMask:function(le){j!==le&&!F&&(r.depthMask(le),j=le)},setFunc:function(le){if(xe&&(le=wd[le]),Le!==le){switch(le){case Da:r.depthFunc(r.NEVER);break;case Na:r.depthFunc(r.ALWAYS);break;case Ua:r.depthFunc(r.LESS);break;case vs:r.depthFunc(r.LEQUAL);break;case Fa:r.depthFunc(r.EQUAL);break;case Oa:r.depthFunc(r.GEQUAL);break;case Ba:r.depthFunc(r.GREATER);break;case za:r.depthFunc(r.NOTEQUAL);break;default:r.depthFunc(r.LEQUAL)}Le=le}},setLocked:function(le){F=le},setClear:function(le){ye!==le&&(ye=le,xe&&(le=1-le),r.clearDepth(le))},reset:function(){F=!1,j=null,Le=null,ye=null,xe=!1}}}function i(){let F=!1,xe=null,j=null,Le=null,ye=null,le=null,ke=null,st=null,Dt=null;return{setTest:function(vt){F||(vt?me(r.STENCIL_TEST):Fe(r.STENCIL_TEST))},setMask:function(vt){xe!==vt&&!F&&(r.stencilMask(vt),xe=vt)},setFunc:function(vt,Zn,Nn){(j!==vt||Le!==Zn||ye!==Nn)&&(r.stencilFunc(vt,Zn,Nn),j=vt,Le=Zn,ye=Nn)},setOp:function(vt,Zn,Nn){(le!==vt||ke!==Zn||st!==Nn)&&(r.stencilOp(vt,Zn,Nn),le=vt,ke=Zn,st=Nn)},setLocked:function(vt){F=vt},setClear:function(vt){Dt!==vt&&(r.clearStencil(vt),Dt=vt)},reset:function(){F=!1,xe=null,j=null,Le=null,ye=null,le=null,ke=null,st=null,Dt=null}}}const s=new t,o=new n,c=new i,l=new WeakMap,a=new WeakMap;let h={},u={},f={},_=new WeakMap,d=[],g=null,p=!1,m=null,x=null,v=null,y=null,b=null,S=null,w=null,M=new ce(0,0,0),T=0,A=!1,L=null,I=null,N=null,B=null,U=null;const O=r.getParameter(r.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let k=!1,J=0;const ae=r.getParameter(r.VERSION);ae.indexOf("WebGL")!==-1?(J=parseFloat(/^WebGL (\d)/.exec(ae)[1]),k=J>=1):ae.indexOf("OpenGL ES")!==-1&&(J=parseFloat(/^OpenGL ES (\d)/.exec(ae)[1]),k=J>=2);let pe=null,Ee={};const Ue=r.getParameter(r.SCISSOR_BOX),et=r.getParameter(r.VIEWPORT),nt=new xt().fromArray(Ue),Ye=new xt().fromArray(et);function Q(F,xe,j,Le){const ye=new Uint8Array(4),le=r.createTexture();r.bindTexture(F,le),r.texParameteri(F,r.TEXTURE_MIN_FILTER,r.NEAREST),r.texParameteri(F,r.TEXTURE_MAG_FILTER,r.NEAREST);for(let ke=0;ke<j;ke++)F===r.TEXTURE_3D||F===r.TEXTURE_2D_ARRAY?r.texImage3D(xe,0,r.RGBA,1,1,Le,0,r.RGBA,r.UNSIGNED_BYTE,ye):r.texImage2D(xe+ke,0,r.RGBA,1,1,0,r.RGBA,r.UNSIGNED_BYTE,ye);return le}const we={};we[r.TEXTURE_2D]=Q(r.TEXTURE_2D,r.TEXTURE_2D,1),we[r.TEXTURE_CUBE_MAP]=Q(r.TEXTURE_CUBE_MAP,r.TEXTURE_CUBE_MAP_POSITIVE_X,6),we[r.TEXTURE_2D_ARRAY]=Q(r.TEXTURE_2D_ARRAY,r.TEXTURE_2D_ARRAY,1,1),we[r.TEXTURE_3D]=Q(r.TEXTURE_3D,r.TEXTURE_3D,1,1),s.setClear(0,0,0,1),o.setClear(1),c.setClear(0),me(r.DEPTH_TEST),o.setFunc(vs),be(!1),Se(Pl),me(r.CULL_FACE),ue(Xn);function me(F){h[F]!==!0&&(r.enable(F),h[F]=!0)}function Fe(F){h[F]!==!1&&(r.disable(F),h[F]=!1)}function qe(F,xe){return f[F]!==xe?(r.bindFramebuffer(F,xe),f[F]=xe,F===r.DRAW_FRAMEBUFFER&&(f[r.FRAMEBUFFER]=xe),F===r.FRAMEBUFFER&&(f[r.DRAW_FRAMEBUFFER]=xe),!0):!1}function Oe(F,xe){let j=d,Le=!1;if(F){j=_.get(xe),j===void 0&&(j=[],_.set(xe,j));const ye=F.textures;if(j.length!==ye.length||j[0]!==r.COLOR_ATTACHMENT0){for(let le=0,ke=ye.length;le<ke;le++)j[le]=r.COLOR_ATTACHMENT0+le;j.length=ye.length,Le=!0}}else j[0]!==r.BACK&&(j[0]=r.BACK,Le=!0);Le&&r.drawBuffers(j)}function $e(F){return g!==F?(r.useProgram(F),g=F,!0):!1}const We={[Di]:r.FUNC_ADD,[Vf]:r.FUNC_SUBTRACT,[Hf]:r.FUNC_REVERSE_SUBTRACT};We[Wf]=r.MIN,We[Xf]=r.MAX;const te={[qf]:r.ZERO,[Yf]:r.ONE,[Kf]:r.SRC_COLOR,[La]:r.SRC_ALPHA,[ed]:r.SRC_ALPHA_SATURATE,[$f]:r.DST_COLOR,[Jf]:r.DST_ALPHA,[jf]:r.ONE_MINUS_SRC_COLOR,[Ia]:r.ONE_MINUS_SRC_ALPHA,[Qf]:r.ONE_MINUS_DST_COLOR,[Zf]:r.ONE_MINUS_DST_ALPHA,[td]:r.CONSTANT_COLOR,[nd]:r.ONE_MINUS_CONSTANT_COLOR,[id]:r.CONSTANT_ALPHA,[sd]:r.ONE_MINUS_CONSTANT_ALPHA};function ue(F,xe,j,Le,ye,le,ke,st,Dt,vt){if(F===Xn){p===!0&&(Fe(r.BLEND),p=!1);return}if(p===!1&&(me(r.BLEND),p=!0),F!==Gf){if(F!==m||vt!==A){if((x!==Di||b!==Di)&&(r.blendEquation(r.FUNC_ADD),x=Di,b=Di),vt)switch(F){case gs:r.blendFuncSeparate(r.ONE,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case cr:r.blendFunc(r.ONE,r.ONE);break;case Ll:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case Il:r.blendFuncSeparate(r.DST_COLOR,r.ONE_MINUS_SRC_ALPHA,r.ZERO,r.ONE);break;default:Xe("WebGLState: Invalid blending: ",F);break}else switch(F){case gs:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case cr:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE,r.ONE,r.ONE);break;case Ll:Xe("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Il:Xe("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Xe("WebGLState: Invalid blending: ",F);break}v=null,y=null,S=null,w=null,M.set(0,0,0),T=0,m=F,A=vt}return}ye=ye||xe,le=le||j,ke=ke||Le,(xe!==x||ye!==b)&&(r.blendEquationSeparate(We[xe],We[ye]),x=xe,b=ye),(j!==v||Le!==y||le!==S||ke!==w)&&(r.blendFuncSeparate(te[j],te[Le],te[le],te[ke]),v=j,y=Le,S=le,w=ke),(st.equals(M)===!1||Dt!==T)&&(r.blendColor(st.r,st.g,st.b,Dt),M.copy(st),T=Dt),m=F,A=!1}function ie(F,xe){F.side===St?Fe(r.CULL_FACE):me(r.CULL_FACE);let j=F.side===Yt;xe&&(j=!j),be(j),F.blending===gs&&F.transparent===!1?ue(Xn):ue(F.blending,F.blendEquation,F.blendSrc,F.blendDst,F.blendEquationAlpha,F.blendSrcAlpha,F.blendDstAlpha,F.blendColor,F.blendAlpha,F.premultipliedAlpha),o.setFunc(F.depthFunc),o.setTest(F.depthTest),o.setMask(F.depthWrite),s.setMask(F.colorWrite);const Le=F.stencilWrite;c.setTest(Le),Le&&(c.setMask(F.stencilWriteMask),c.setFunc(F.stencilFunc,F.stencilRef,F.stencilFuncMask),c.setOp(F.stencilFail,F.stencilZFail,F.stencilZPass)),D(F.polygonOffset,F.polygonOffsetFactor,F.polygonOffsetUnits),F.alphaToCoverage===!0?me(r.SAMPLE_ALPHA_TO_COVERAGE):Fe(r.SAMPLE_ALPHA_TO_COVERAGE)}function be(F){L!==F&&(F?r.frontFace(r.CW):r.frontFace(r.CCW),L=F)}function Se(F){F!==Bf?(me(r.CULL_FACE),F!==I&&(F===Pl?r.cullFace(r.BACK):F===zf?r.cullFace(r.FRONT):r.cullFace(r.FRONT_AND_BACK))):Fe(r.CULL_FACE),I=F}function Ke(F){F!==N&&(k&&r.lineWidth(F),N=F)}function D(F,xe,j){F?(me(r.POLYGON_OFFSET_FILL),(B!==xe||U!==j)&&(B=xe,U=j,o.getReversed()&&(xe=-xe),r.polygonOffset(xe,j))):Fe(r.POLYGON_OFFSET_FILL)}function Z(F){F?me(r.SCISSOR_TEST):Fe(r.SCISSOR_TEST)}function ee(F){F===void 0&&(F=r.TEXTURE0+O-1),pe!==F&&(r.activeTexture(F),pe=F)}function Pe(F,xe,j){j===void 0&&(pe===null?j=r.TEXTURE0+O-1:j=pe);let Le=Ee[j];Le===void 0&&(Le={type:void 0,texture:void 0},Ee[j]=Le),(Le.type!==F||Le.texture!==xe)&&(pe!==j&&(r.activeTexture(j),pe=j),r.bindTexture(F,xe||we[F]),Le.type=F,Le.texture=xe)}function ne(){const F=Ee[pe];F!==void 0&&F.type!==void 0&&(r.bindTexture(F.type,null),F.type=void 0,F.texture=void 0)}function Ze(){try{r.compressedTexImage2D(...arguments)}catch(F){Xe("WebGLState:",F)}}function R(){try{r.compressedTexImage3D(...arguments)}catch(F){Xe("WebGLState:",F)}}function E(){try{r.texSubImage2D(...arguments)}catch(F){Xe("WebGLState:",F)}}function V(){try{r.texSubImage3D(...arguments)}catch(F){Xe("WebGLState:",F)}}function K(){try{r.compressedTexSubImage2D(...arguments)}catch(F){Xe("WebGLState:",F)}}function se(){try{r.compressedTexSubImage3D(...arguments)}catch(F){Xe("WebGLState:",F)}}function fe(){try{r.texStorage2D(...arguments)}catch(F){Xe("WebGLState:",F)}}function ge(){try{r.texStorage3D(...arguments)}catch(F){Xe("WebGLState:",F)}}function q(){try{r.texImage2D(...arguments)}catch(F){Xe("WebGLState:",F)}}function $(){try{r.texImage3D(...arguments)}catch(F){Xe("WebGLState:",F)}}function Re(F){return u[F]!==void 0?u[F]:r.getParameter(F)}function De(F,xe){u[F]!==xe&&(r.pixelStorei(F,xe),u[F]=xe)}function ve(F){nt.equals(F)===!1&&(r.scissor(F.x,F.y,F.z,F.w),nt.copy(F))}function _e(F){Ye.equals(F)===!1&&(r.viewport(F.x,F.y,F.z,F.w),Ye.copy(F))}function tt(F,xe){let j=a.get(xe);j===void 0&&(j=new WeakMap,a.set(xe,j));let Le=j.get(F);Le===void 0&&(Le=r.getUniformBlockIndex(xe,F.name),j.set(F,Le))}function ot(F,xe){const Le=a.get(xe).get(F);l.get(xe)!==Le&&(r.uniformBlockBinding(xe,Le,F.__bindingPointIndex),l.set(xe,Le))}function pt(){r.disable(r.BLEND),r.disable(r.CULL_FACE),r.disable(r.DEPTH_TEST),r.disable(r.POLYGON_OFFSET_FILL),r.disable(r.SCISSOR_TEST),r.disable(r.STENCIL_TEST),r.disable(r.SAMPLE_ALPHA_TO_COVERAGE),r.blendEquation(r.FUNC_ADD),r.blendFunc(r.ONE,r.ZERO),r.blendFuncSeparate(r.ONE,r.ZERO,r.ONE,r.ZERO),r.blendColor(0,0,0,0),r.colorMask(!0,!0,!0,!0),r.clearColor(0,0,0,0),r.depthMask(!0),r.depthFunc(r.LESS),o.setReversed(!1),r.clearDepth(1),r.stencilMask(4294967295),r.stencilFunc(r.ALWAYS,0,4294967295),r.stencilOp(r.KEEP,r.KEEP,r.KEEP),r.clearStencil(0),r.cullFace(r.BACK),r.frontFace(r.CCW),r.polygonOffset(0,0),r.activeTexture(r.TEXTURE0),r.bindFramebuffer(r.FRAMEBUFFER,null),r.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),r.bindFramebuffer(r.READ_FRAMEBUFFER,null),r.useProgram(null),r.lineWidth(1),r.scissor(0,0,r.canvas.width,r.canvas.height),r.viewport(0,0,r.canvas.width,r.canvas.height),r.pixelStorei(r.PACK_ALIGNMENT,4),r.pixelStorei(r.UNPACK_ALIGNMENT,4),r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,!1),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,r.BROWSER_DEFAULT_WEBGL),r.pixelStorei(r.PACK_ROW_LENGTH,0),r.pixelStorei(r.PACK_SKIP_PIXELS,0),r.pixelStorei(r.PACK_SKIP_ROWS,0),r.pixelStorei(r.UNPACK_ROW_LENGTH,0),r.pixelStorei(r.UNPACK_IMAGE_HEIGHT,0),r.pixelStorei(r.UNPACK_SKIP_PIXELS,0),r.pixelStorei(r.UNPACK_SKIP_ROWS,0),r.pixelStorei(r.UNPACK_SKIP_IMAGES,0),h={},u={},pe=null,Ee={},f={},_=new WeakMap,d=[],g=null,p=!1,m=null,x=null,v=null,y=null,b=null,S=null,w=null,M=new ce(0,0,0),T=0,A=!1,L=null,I=null,N=null,B=null,U=null,nt.set(0,0,r.canvas.width,r.canvas.height),Ye.set(0,0,r.canvas.width,r.canvas.height),s.reset(),o.reset(),c.reset()}return{buffers:{color:s,depth:o,stencil:c},enable:me,disable:Fe,bindFramebuffer:qe,drawBuffers:Oe,useProgram:$e,setBlending:ue,setMaterial:ie,setFlipSided:be,setCullFace:Se,setLineWidth:Ke,setPolygonOffset:D,setScissorTest:Z,activeTexture:ee,bindTexture:Pe,unbindTexture:ne,compressedTexImage2D:Ze,compressedTexImage3D:R,texImage2D:q,texImage3D:$,pixelStorei:De,getParameter:Re,updateUBOMapping:tt,uniformBlockBinding:ot,texStorage2D:fe,texStorage3D:ge,texSubImage2D:E,texSubImage3D:V,compressedTexSubImage2D:K,compressedTexSubImage3D:se,scissor:ve,viewport:_e,reset:pt}}function x1(r,e,t,n,i,s,o){const c=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),a=new re,h=new WeakMap,u=new Set;let f;const _=new WeakMap;let d=!1;try{d=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(R,E){return d?new OffscreenCanvas(R,E):pr("canvas")}function p(R,E,V){let K=1;const se=Ze(R);if((se.width>V||se.height>V)&&(K=V/Math.max(se.width,se.height)),K<1)if(typeof HTMLImageElement<"u"&&R instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&R instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&R instanceof ImageBitmap||typeof VideoFrame<"u"&&R instanceof VideoFrame){const fe=Math.floor(K*se.width),ge=Math.floor(K*se.height);f===void 0&&(f=g(fe,ge));const q=E?g(fe,ge):f;return q.width=fe,q.height=ge,q.getContext("2d").drawImage(R,0,0,fe,ge),ze("WebGLRenderer: Texture has been resized from ("+se.width+"x"+se.height+") to ("+fe+"x"+ge+")."),q}else return"data"in R&&ze("WebGLRenderer: Image in DataTexture is too big ("+se.width+"x"+se.height+")."),R;return R}function m(R){return R.generateMipmaps}function x(R){r.generateMipmap(R)}function v(R){return R.isWebGLCubeRenderTarget?r.TEXTURE_CUBE_MAP:R.isWebGL3DRenderTarget?r.TEXTURE_3D:R.isWebGLArrayRenderTarget||R.isCompressedArrayTexture?r.TEXTURE_2D_ARRAY:r.TEXTURE_2D}function y(R,E,V,K,se,fe=!1){if(R!==null){if(r[R]!==void 0)return r[R];ze("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+R+"'")}let ge;K&&(ge=e.get("EXT_texture_norm16"),ge||ze("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let q=E;if(E===r.RED&&(V===r.FLOAT&&(q=r.R32F),V===r.HALF_FLOAT&&(q=r.R16F),V===r.UNSIGNED_BYTE&&(q=r.R8),V===r.UNSIGNED_SHORT&&ge&&(q=ge.R16_EXT),V===r.SHORT&&ge&&(q=ge.R16_SNORM_EXT)),E===r.RED_INTEGER&&(V===r.UNSIGNED_BYTE&&(q=r.R8UI),V===r.UNSIGNED_SHORT&&(q=r.R16UI),V===r.UNSIGNED_INT&&(q=r.R32UI),V===r.BYTE&&(q=r.R8I),V===r.SHORT&&(q=r.R16I),V===r.INT&&(q=r.R32I)),E===r.RG&&(V===r.FLOAT&&(q=r.RG32F),V===r.HALF_FLOAT&&(q=r.RG16F),V===r.UNSIGNED_BYTE&&(q=r.RG8),V===r.UNSIGNED_SHORT&&ge&&(q=ge.RG16_EXT),V===r.SHORT&&ge&&(q=ge.RG16_SNORM_EXT)),E===r.RG_INTEGER&&(V===r.UNSIGNED_BYTE&&(q=r.RG8UI),V===r.UNSIGNED_SHORT&&(q=r.RG16UI),V===r.UNSIGNED_INT&&(q=r.RG32UI),V===r.BYTE&&(q=r.RG8I),V===r.SHORT&&(q=r.RG16I),V===r.INT&&(q=r.RG32I)),E===r.RGB_INTEGER&&(V===r.UNSIGNED_BYTE&&(q=r.RGB8UI),V===r.UNSIGNED_SHORT&&(q=r.RGB16UI),V===r.UNSIGNED_INT&&(q=r.RGB32UI),V===r.BYTE&&(q=r.RGB8I),V===r.SHORT&&(q=r.RGB16I),V===r.INT&&(q=r.RGB32I)),E===r.RGBA_INTEGER&&(V===r.UNSIGNED_BYTE&&(q=r.RGBA8UI),V===r.UNSIGNED_SHORT&&(q=r.RGBA16UI),V===r.UNSIGNED_INT&&(q=r.RGBA32UI),V===r.BYTE&&(q=r.RGBA8I),V===r.SHORT&&(q=r.RGBA16I),V===r.INT&&(q=r.RGBA32I)),E===r.RGB&&(V===r.UNSIGNED_SHORT&&ge&&(q=ge.RGB16_EXT),V===r.SHORT&&ge&&(q=ge.RGB16_SNORM_EXT),V===r.UNSIGNED_INT_5_9_9_9_REV&&(q=r.RGB9_E5),V===r.UNSIGNED_INT_10F_11F_11F_REV&&(q=r.R11F_G11F_B10F)),E===r.RGBA){const $=fe?yo:ht.getTransfer(se);V===r.FLOAT&&(q=r.RGBA32F),V===r.HALF_FLOAT&&(q=r.RGBA16F),V===r.UNSIGNED_BYTE&&(q=$===mt?r.SRGB8_ALPHA8:r.RGBA8),V===r.UNSIGNED_SHORT&&ge&&(q=ge.RGBA16_EXT),V===r.SHORT&&ge&&(q=ge.RGBA16_SNORM_EXT),V===r.UNSIGNED_SHORT_4_4_4_4&&(q=r.RGBA4),V===r.UNSIGNED_SHORT_5_5_5_1&&(q=r.RGB5_A1)}return(q===r.R16F||q===r.R32F||q===r.RG16F||q===r.RG32F||q===r.RGBA16F||q===r.RGBA32F)&&e.get("EXT_color_buffer_float"),q}function b(R,E){let V;return R?E===null||E===Yn||E===hr?V=r.DEPTH24_STENCIL8:E===Sn?V=r.DEPTH32F_STENCIL8:E===lr&&(V=r.DEPTH24_STENCIL8,ze("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):E===null||E===Yn||E===hr?V=r.DEPTH_COMPONENT24:E===Sn?V=r.DEPTH_COMPONENT32F:E===lr&&(V=r.DEPTH_COMPONENT16),V}function S(R,E){return m(R)===!0||R.isFramebufferTexture&&R.minFilter!==zt&&R.minFilter!==kt?Math.log2(Math.max(E.width,E.height))+1:R.mipmaps!==void 0&&R.mipmaps.length>0?R.mipmaps.length:R.isCompressedTexture&&Array.isArray(R.image)?E.mipmaps.length:1}function w(R){const E=R.target;E.removeEventListener("dispose",w),T(E),E.isVideoTexture&&h.delete(E),E.isHTMLTexture&&u.delete(E)}function M(R){const E=R.target;E.removeEventListener("dispose",M),L(E)}function T(R){const E=n.get(R);if(E.__webglInit===void 0)return;const V=R.source,K=_.get(V);if(K){const se=K[E.__cacheKey];se.usedTimes--,se.usedTimes===0&&A(R),Object.keys(K).length===0&&_.delete(V)}n.remove(R)}function A(R){const E=n.get(R);r.deleteTexture(E.__webglTexture);const V=R.source,K=_.get(V);delete K[E.__cacheKey],o.memory.textures--}function L(R){const E=n.get(R);if(R.depthTexture&&(R.depthTexture.dispose(),n.remove(R.depthTexture)),R.isWebGLCubeRenderTarget)for(let K=0;K<6;K++){if(Array.isArray(E.__webglFramebuffer[K]))for(let se=0;se<E.__webglFramebuffer[K].length;se++)r.deleteFramebuffer(E.__webglFramebuffer[K][se]);else r.deleteFramebuffer(E.__webglFramebuffer[K]);E.__webglDepthbuffer&&r.deleteRenderbuffer(E.__webglDepthbuffer[K])}else{if(Array.isArray(E.__webglFramebuffer))for(let K=0;K<E.__webglFramebuffer.length;K++)r.deleteFramebuffer(E.__webglFramebuffer[K]);else r.deleteFramebuffer(E.__webglFramebuffer);if(E.__webglDepthbuffer&&r.deleteRenderbuffer(E.__webglDepthbuffer),E.__webglMultisampledFramebuffer&&r.deleteFramebuffer(E.__webglMultisampledFramebuffer),E.__webglColorRenderbuffer)for(let K=0;K<E.__webglColorRenderbuffer.length;K++)E.__webglColorRenderbuffer[K]&&r.deleteRenderbuffer(E.__webglColorRenderbuffer[K]);E.__webglDepthRenderbuffer&&r.deleteRenderbuffer(E.__webglDepthRenderbuffer)}const V=R.textures;for(let K=0,se=V.length;K<se;K++){const fe=n.get(V[K]);fe.__webglTexture&&(r.deleteTexture(fe.__webglTexture),o.memory.textures--),n.remove(V[K])}n.remove(R)}let I=0;function N(){I=0}function B(){return I}function U(R){I=R}function O(){const R=I;return R>=i.maxTextures&&ze("WebGLTextures: Trying to use "+R+" texture units while this GPU supports only "+i.maxTextures),I+=1,R}function k(R){const E=[];return E.push(R.wrapS),E.push(R.wrapT),E.push(R.wrapR||0),E.push(R.magFilter),E.push(R.minFilter),E.push(R.anisotropy),E.push(R.internalFormat),E.push(R.format),E.push(R.type),E.push(R.generateMipmaps),E.push(R.premultiplyAlpha),E.push(R.flipY),E.push(R.unpackAlignment),E.push(R.colorSpace),E.join()}function J(R,E){const V=n.get(R);if(R.isVideoTexture&&Pe(R),R.isRenderTargetTexture===!1&&R.isExternalTexture!==!0&&R.version>0&&V.__version!==R.version){const K=R.image;if(K===null)ze("WebGLRenderer: Texture marked for update but no image data found.");else if(K.complete===!1)ze("WebGLRenderer: Texture marked for update but image is incomplete");else{Fe(V,R,E);return}}else R.isExternalTexture&&(V.__webglTexture=R.sourceTexture?R.sourceTexture:null);t.bindTexture(r.TEXTURE_2D,V.__webglTexture,r.TEXTURE0+E)}function ae(R,E){const V=n.get(R);if(R.isRenderTargetTexture===!1&&R.version>0&&V.__version!==R.version){Fe(V,R,E);return}else R.isExternalTexture&&(V.__webglTexture=R.sourceTexture?R.sourceTexture:null);t.bindTexture(r.TEXTURE_2D_ARRAY,V.__webglTexture,r.TEXTURE0+E)}function pe(R,E){const V=n.get(R);if(R.isRenderTargetTexture===!1&&R.version>0&&V.__version!==R.version){Fe(V,R,E);return}t.bindTexture(r.TEXTURE_3D,V.__webglTexture,r.TEXTURE0+E)}function Ee(R,E){const V=n.get(R);if(R.isCubeDepthTexture!==!0&&R.version>0&&V.__version!==R.version){qe(V,R,E);return}t.bindTexture(r.TEXTURE_CUBE_MAP,V.__webglTexture,r.TEXTURE0+E)}const Ue={[ki]:r.REPEAT,[Gn]:r.CLAMP_TO_EDGE,[go]:r.MIRRORED_REPEAT},et={[zt]:r.NEAREST,[vu]:r.NEAREST_MIPMAP_NEAREST,[Qs]:r.NEAREST_MIPMAP_LINEAR,[kt]:r.LINEAR,[co]:r.LINEAR_MIPMAP_NEAREST,[Vn]:r.LINEAR_MIPMAP_LINEAR},nt={[pd]:r.NEVER,[vd]:r.ALWAYS,[md]:r.LESS,[Jc]:r.LEQUAL,[gd]:r.EQUAL,[Zc]:r.GEQUAL,[_d]:r.GREATER,[xd]:r.NOTEQUAL};function Ye(R,E){if(E.type===Sn&&e.has("OES_texture_float_linear")===!1&&(E.magFilter===kt||E.magFilter===co||E.magFilter===Qs||E.magFilter===Vn||E.minFilter===kt||E.minFilter===co||E.minFilter===Qs||E.minFilter===Vn)&&ze("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),r.texParameteri(R,r.TEXTURE_WRAP_S,Ue[E.wrapS]),r.texParameteri(R,r.TEXTURE_WRAP_T,Ue[E.wrapT]),(R===r.TEXTURE_3D||R===r.TEXTURE_2D_ARRAY)&&r.texParameteri(R,r.TEXTURE_WRAP_R,Ue[E.wrapR]),r.texParameteri(R,r.TEXTURE_MAG_FILTER,et[E.magFilter]),r.texParameteri(R,r.TEXTURE_MIN_FILTER,et[E.minFilter]),E.compareFunction&&(r.texParameteri(R,r.TEXTURE_COMPARE_MODE,r.COMPARE_REF_TO_TEXTURE),r.texParameteri(R,r.TEXTURE_COMPARE_FUNC,nt[E.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(E.magFilter===zt||E.minFilter!==Qs&&E.minFilter!==Vn||E.type===Sn&&e.has("OES_texture_float_linear")===!1)return;if(E.anisotropy>1||n.get(E).__currentAnisotropy){const V=e.get("EXT_texture_filter_anisotropic");r.texParameterf(R,V.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(E.anisotropy,i.getMaxAnisotropy())),n.get(E).__currentAnisotropy=E.anisotropy}}}function Q(R,E){let V=!1;R.__webglInit===void 0&&(R.__webglInit=!0,E.addEventListener("dispose",w));const K=E.source;let se=_.get(K);se===void 0&&(se={},_.set(K,se));const fe=k(E);if(fe!==R.__cacheKey){se[fe]===void 0&&(se[fe]={texture:r.createTexture(),usedTimes:0},o.memory.textures++,V=!0),se[fe].usedTimes++;const ge=se[R.__cacheKey];ge!==void 0&&(se[R.__cacheKey].usedTimes--,ge.usedTimes===0&&A(E)),R.__cacheKey=fe,R.__webglTexture=se[fe].texture}return V}function we(R,E,V){return Math.floor(Math.floor(R/V)/E)}function me(R,E,V,K){const fe=R.updateRanges;if(fe.length===0)t.texSubImage2D(r.TEXTURE_2D,0,0,0,E.width,E.height,V,K,E.data);else{fe.sort((De,ve)=>De.start-ve.start);let ge=0;for(let De=1;De<fe.length;De++){const ve=fe[ge],_e=fe[De],tt=ve.start+ve.count,ot=we(_e.start,E.width,4),pt=we(ve.start,E.width,4);_e.start<=tt+1&&ot===pt&&we(_e.start+_e.count-1,E.width,4)===ot?ve.count=Math.max(ve.count,_e.start+_e.count-ve.start):(++ge,fe[ge]=_e)}fe.length=ge+1;const q=t.getParameter(r.UNPACK_ROW_LENGTH),$=t.getParameter(r.UNPACK_SKIP_PIXELS),Re=t.getParameter(r.UNPACK_SKIP_ROWS);t.pixelStorei(r.UNPACK_ROW_LENGTH,E.width);for(let De=0,ve=fe.length;De<ve;De++){const _e=fe[De],tt=Math.floor(_e.start/4),ot=Math.ceil(_e.count/4),pt=tt%E.width,F=Math.floor(tt/E.width),xe=ot,j=1;t.pixelStorei(r.UNPACK_SKIP_PIXELS,pt),t.pixelStorei(r.UNPACK_SKIP_ROWS,F),t.texSubImage2D(r.TEXTURE_2D,0,pt,F,xe,j,V,K,E.data)}R.clearUpdateRanges(),t.pixelStorei(r.UNPACK_ROW_LENGTH,q),t.pixelStorei(r.UNPACK_SKIP_PIXELS,$),t.pixelStorei(r.UNPACK_SKIP_ROWS,Re)}}function Fe(R,E,V){let K=r.TEXTURE_2D;(E.isDataArrayTexture||E.isCompressedArrayTexture)&&(K=r.TEXTURE_2D_ARRAY),E.isData3DTexture&&(K=r.TEXTURE_3D);const se=Q(R,E),fe=E.source;t.bindTexture(K,R.__webglTexture,r.TEXTURE0+V);const ge=n.get(fe);if(fe.version!==ge.__version||se===!0){if(t.activeTexture(r.TEXTURE0+V),(typeof ImageBitmap<"u"&&E.image instanceof ImageBitmap)===!1){const j=ht.getPrimaries(ht.workingColorSpace),Le=E.colorSpace===kn?null:ht.getPrimaries(E.colorSpace),ye=E.colorSpace===kn||j===Le?r.NONE:r.BROWSER_DEFAULT_WEBGL;t.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,E.flipY),t.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,E.premultiplyAlpha),t.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,ye)}t.pixelStorei(r.UNPACK_ALIGNMENT,E.unpackAlignment);let $=p(E.image,!1,i.maxTextureSize);$=ne(E,$);const Re=s.convert(E.format,E.colorSpace),De=s.convert(E.type);let ve=y(E.internalFormat,Re,De,E.normalized,E.colorSpace,E.isVideoTexture);Ye(K,E);let _e;const tt=E.mipmaps,ot=E.isVideoTexture!==!0,pt=ge.__version===void 0||se===!0,F=fe.dataReady,xe=S(E,$);if(E.isDepthTexture)ve=b(E.format===Fi,E.type),pt&&(ot?t.texStorage2D(r.TEXTURE_2D,1,ve,$.width,$.height):t.texImage2D(r.TEXTURE_2D,0,ve,$.width,$.height,0,Re,De,null));else if(E.isDataTexture)if(tt.length>0){ot&&pt&&t.texStorage2D(r.TEXTURE_2D,xe,ve,tt[0].width,tt[0].height);for(let j=0,Le=tt.length;j<Le;j++)_e=tt[j],ot?F&&t.texSubImage2D(r.TEXTURE_2D,j,0,0,_e.width,_e.height,Re,De,_e.data):t.texImage2D(r.TEXTURE_2D,j,ve,_e.width,_e.height,0,Re,De,_e.data);E.generateMipmaps=!1}else ot?(pt&&t.texStorage2D(r.TEXTURE_2D,xe,ve,$.width,$.height),F&&me(E,$,Re,De)):t.texImage2D(r.TEXTURE_2D,0,ve,$.width,$.height,0,Re,De,$.data);else if(E.isCompressedTexture)if(E.isCompressedArrayTexture){ot&&pt&&t.texStorage3D(r.TEXTURE_2D_ARRAY,xe,ve,tt[0].width,tt[0].height,$.depth);for(let j=0,Le=tt.length;j<Le;j++)if(_e=tt[j],E.format!==bn)if(Re!==null)if(ot){if(F)if(E.layerUpdates.size>0){const ye=Lh(_e.width,_e.height,E.format,E.type);for(const le of E.layerUpdates){const ke=_e.data.subarray(le*ye/_e.data.BYTES_PER_ELEMENT,(le+1)*ye/_e.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,j,0,0,le,_e.width,_e.height,1,Re,ke)}E.clearLayerUpdates()}else t.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,j,0,0,0,_e.width,_e.height,$.depth,Re,_e.data)}else t.compressedTexImage3D(r.TEXTURE_2D_ARRAY,j,ve,_e.width,_e.height,$.depth,0,_e.data,0,0);else ze("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else ot?F&&t.texSubImage3D(r.TEXTURE_2D_ARRAY,j,0,0,0,_e.width,_e.height,$.depth,Re,De,_e.data):t.texImage3D(r.TEXTURE_2D_ARRAY,j,ve,_e.width,_e.height,$.depth,0,Re,De,_e.data)}else{ot&&pt&&t.texStorage2D(r.TEXTURE_2D,xe,ve,tt[0].width,tt[0].height);for(let j=0,Le=tt.length;j<Le;j++)_e=tt[j],E.format!==bn?Re!==null?ot?F&&t.compressedTexSubImage2D(r.TEXTURE_2D,j,0,0,_e.width,_e.height,Re,_e.data):t.compressedTexImage2D(r.TEXTURE_2D,j,ve,_e.width,_e.height,0,_e.data):ze("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):ot?F&&t.texSubImage2D(r.TEXTURE_2D,j,0,0,_e.width,_e.height,Re,De,_e.data):t.texImage2D(r.TEXTURE_2D,j,ve,_e.width,_e.height,0,Re,De,_e.data)}else if(E.isDataArrayTexture)if(ot){if(pt&&t.texStorage3D(r.TEXTURE_2D_ARRAY,xe,ve,$.width,$.height,$.depth),F)if(E.layerUpdates.size>0){const j=Lh($.width,$.height,E.format,E.type);for(const Le of E.layerUpdates){const ye=$.data.subarray(Le*j/$.data.BYTES_PER_ELEMENT,(Le+1)*j/$.data.BYTES_PER_ELEMENT);t.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,Le,$.width,$.height,1,Re,De,ye)}E.clearLayerUpdates()}else t.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,0,$.width,$.height,$.depth,Re,De,$.data)}else t.texImage3D(r.TEXTURE_2D_ARRAY,0,ve,$.width,$.height,$.depth,0,Re,De,$.data);else if(E.isData3DTexture)ot?(pt&&t.texStorage3D(r.TEXTURE_3D,xe,ve,$.width,$.height,$.depth),F&&t.texSubImage3D(r.TEXTURE_3D,0,0,0,0,$.width,$.height,$.depth,Re,De,$.data)):t.texImage3D(r.TEXTURE_3D,0,ve,$.width,$.height,$.depth,0,Re,De,$.data);else if(E.isFramebufferTexture){if(pt)if(ot)t.texStorage2D(r.TEXTURE_2D,xe,ve,$.width,$.height);else{let j=$.width,Le=$.height;for(let ye=0;ye<xe;ye++)t.texImage2D(r.TEXTURE_2D,ye,ve,j,Le,0,Re,De,null),j>>=1,Le>>=1}}else if(E.isHTMLTexture){if("texElementImage2D"in r){const j=r.canvas;if(j.hasAttribute("layoutsubtree")||j.setAttribute("layoutsubtree","true"),$.parentNode!==j){j.appendChild($),u.add(E),j.onpaint=st=>{const Dt=st.changedElements;for(const vt of u)Dt.includes(vt.image)&&(vt.needsUpdate=!0)},j.requestPaint();return}const Le=0,ye=r.RGBA,le=r.RGBA,ke=r.UNSIGNED_BYTE;r.texElementImage2D(r.TEXTURE_2D,Le,ye,le,ke,$),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_MIN_FILTER,r.LINEAR),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_WRAP_S,r.CLAMP_TO_EDGE),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_WRAP_T,r.CLAMP_TO_EDGE)}}else if(tt.length>0){if(ot&&pt){const j=Ze(tt[0]);t.texStorage2D(r.TEXTURE_2D,xe,ve,j.width,j.height)}for(let j=0,Le=tt.length;j<Le;j++)_e=tt[j],ot?F&&t.texSubImage2D(r.TEXTURE_2D,j,0,0,Re,De,_e):t.texImage2D(r.TEXTURE_2D,j,ve,Re,De,_e);E.generateMipmaps=!1}else if(ot){if(pt){const j=Ze($);t.texStorage2D(r.TEXTURE_2D,xe,ve,j.width,j.height)}F&&t.texSubImage2D(r.TEXTURE_2D,0,0,0,Re,De,$)}else t.texImage2D(r.TEXTURE_2D,0,ve,Re,De,$);m(E)&&x(K),ge.__version=fe.version,E.onUpdate&&E.onUpdate(E)}R.__version=E.version}function qe(R,E,V){if(E.image.length!==6)return;const K=Q(R,E),se=E.source;t.bindTexture(r.TEXTURE_CUBE_MAP,R.__webglTexture,r.TEXTURE0+V);const fe=n.get(se);if(se.version!==fe.__version||K===!0){t.activeTexture(r.TEXTURE0+V);const ge=ht.getPrimaries(ht.workingColorSpace),q=E.colorSpace===kn?null:ht.getPrimaries(E.colorSpace),$=E.colorSpace===kn||ge===q?r.NONE:r.BROWSER_DEFAULT_WEBGL;t.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,E.flipY),t.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,E.premultiplyAlpha),t.pixelStorei(r.UNPACK_ALIGNMENT,E.unpackAlignment),t.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,$);const Re=E.isCompressedTexture||E.image[0].isCompressedTexture,De=E.image[0]&&E.image[0].isDataTexture,ve=[];for(let le=0;le<6;le++)!Re&&!De?ve[le]=p(E.image[le],!0,i.maxCubemapSize):ve[le]=De?E.image[le].image:E.image[le],ve[le]=ne(E,ve[le]);const _e=ve[0],tt=s.convert(E.format,E.colorSpace),ot=s.convert(E.type),pt=y(E.internalFormat,tt,ot,E.normalized,E.colorSpace),F=E.isVideoTexture!==!0,xe=fe.__version===void 0||K===!0,j=se.dataReady;let Le=S(E,_e);Ye(r.TEXTURE_CUBE_MAP,E);let ye;if(Re){F&&xe&&t.texStorage2D(r.TEXTURE_CUBE_MAP,Le,pt,_e.width,_e.height);for(let le=0;le<6;le++){ye=ve[le].mipmaps;for(let ke=0;ke<ye.length;ke++){const st=ye[ke];E.format!==bn?tt!==null?F?j&&t.compressedTexSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+le,ke,0,0,st.width,st.height,tt,st.data):t.compressedTexImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+le,ke,pt,st.width,st.height,0,st.data):ze("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):F?j&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+le,ke,0,0,st.width,st.height,tt,ot,st.data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+le,ke,pt,st.width,st.height,0,tt,ot,st.data)}}}else{if(ye=E.mipmaps,F&&xe){ye.length>0&&Le++;const le=Ze(ve[0]);t.texStorage2D(r.TEXTURE_CUBE_MAP,Le,pt,le.width,le.height)}for(let le=0;le<6;le++)if(De){F?j&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+le,0,0,0,ve[le].width,ve[le].height,tt,ot,ve[le].data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+le,0,pt,ve[le].width,ve[le].height,0,tt,ot,ve[le].data);for(let ke=0;ke<ye.length;ke++){const Dt=ye[ke].image[le].image;F?j&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+le,ke+1,0,0,Dt.width,Dt.height,tt,ot,Dt.data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+le,ke+1,pt,Dt.width,Dt.height,0,tt,ot,Dt.data)}}else{F?j&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+le,0,0,0,tt,ot,ve[le]):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+le,0,pt,tt,ot,ve[le]);for(let ke=0;ke<ye.length;ke++){const st=ye[ke];F?j&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+le,ke+1,0,0,tt,ot,st.image[le]):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+le,ke+1,pt,tt,ot,st.image[le])}}}m(E)&&x(r.TEXTURE_CUBE_MAP),fe.__version=se.version,E.onUpdate&&E.onUpdate(E)}R.__version=E.version}function Oe(R,E,V,K,se,fe){const ge=s.convert(V.format,V.colorSpace),q=s.convert(V.type),$=y(V.internalFormat,ge,q,V.normalized,V.colorSpace),Re=n.get(E),De=n.get(V);if(De.__renderTarget=E,!Re.__hasExternalTextures){const ve=Math.max(1,E.width>>fe),_e=Math.max(1,E.height>>fe);se===r.TEXTURE_3D||se===r.TEXTURE_2D_ARRAY?t.texImage3D(se,fe,$,ve,_e,E.depth,0,ge,q,null):t.texImage2D(se,fe,$,ve,_e,0,ge,q,null)}t.bindFramebuffer(r.FRAMEBUFFER,R),ee(E)?c.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,K,se,De.__webglTexture,0,Z(E)):(se===r.TEXTURE_2D||se>=r.TEXTURE_CUBE_MAP_POSITIVE_X&&se<=r.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&r.framebufferTexture2D(r.FRAMEBUFFER,K,se,De.__webglTexture,fe),t.bindFramebuffer(r.FRAMEBUFFER,null)}function $e(R,E,V){if(r.bindRenderbuffer(r.RENDERBUFFER,R),E.depthBuffer){const K=E.depthTexture,se=K&&K.isDepthTexture?K.type:null,fe=b(E.stencilBuffer,se),ge=E.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT;ee(E)?c.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,Z(E),fe,E.width,E.height):V?r.renderbufferStorageMultisample(r.RENDERBUFFER,Z(E),fe,E.width,E.height):r.renderbufferStorage(r.RENDERBUFFER,fe,E.width,E.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,ge,r.RENDERBUFFER,R)}else{const K=E.textures;for(let se=0;se<K.length;se++){const fe=K[se],ge=s.convert(fe.format,fe.colorSpace),q=s.convert(fe.type),$=y(fe.internalFormat,ge,q,fe.normalized,fe.colorSpace);ee(E)?c.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,Z(E),$,E.width,E.height):V?r.renderbufferStorageMultisample(r.RENDERBUFFER,Z(E),$,E.width,E.height):r.renderbufferStorage(r.RENDERBUFFER,$,E.width,E.height)}}r.bindRenderbuffer(r.RENDERBUFFER,null)}function We(R,E,V){const K=E.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(r.FRAMEBUFFER,R),!(E.depthTexture&&E.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const se=n.get(E.depthTexture);if(se.__renderTarget=E,(!se.__webglTexture||E.depthTexture.image.width!==E.width||E.depthTexture.image.height!==E.height)&&(E.depthTexture.image.width=E.width,E.depthTexture.image.height=E.height,E.depthTexture.needsUpdate=!0),K){if(se.__webglInit===void 0&&(se.__webglInit=!0,E.depthTexture.addEventListener("dispose",w)),se.__webglTexture===void 0){se.__webglTexture=r.createTexture(),t.bindTexture(r.TEXTURE_CUBE_MAP,se.__webglTexture),Ye(r.TEXTURE_CUBE_MAP,E.depthTexture);const Re=s.convert(E.depthTexture.format),De=s.convert(E.depthTexture.type);let ve;E.depthTexture.format===ci?ve=r.DEPTH_COMPONENT24:E.depthTexture.format===Fi&&(ve=r.DEPTH24_STENCIL8);for(let _e=0;_e<6;_e++)r.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+_e,0,ve,E.width,E.height,0,Re,De,null)}}else J(E.depthTexture,0);const fe=se.__webglTexture,ge=Z(E),q=K?r.TEXTURE_CUBE_MAP_POSITIVE_X+V:r.TEXTURE_2D,$=E.depthTexture.format===Fi?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT;if(E.depthTexture.format===ci)ee(E)?c.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,$,q,fe,0,ge):r.framebufferTexture2D(r.FRAMEBUFFER,$,q,fe,0);else if(E.depthTexture.format===Fi)ee(E)?c.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,$,q,fe,0,ge):r.framebufferTexture2D(r.FRAMEBUFFER,$,q,fe,0);else throw new Error("Unknown depthTexture format")}function te(R){const E=n.get(R),V=R.isWebGLCubeRenderTarget===!0;if(E.__boundDepthTexture!==R.depthTexture){const K=R.depthTexture;if(E.__depthDisposeCallback&&E.__depthDisposeCallback(),K){const se=()=>{delete E.__boundDepthTexture,delete E.__depthDisposeCallback,K.removeEventListener("dispose",se)};K.addEventListener("dispose",se),E.__depthDisposeCallback=se}E.__boundDepthTexture=K}if(R.depthTexture&&!E.__autoAllocateDepthBuffer)if(V)for(let K=0;K<6;K++)We(E.__webglFramebuffer[K],R,K);else{const K=R.texture.mipmaps;K&&K.length>0?We(E.__webglFramebuffer[0],R,0):We(E.__webglFramebuffer,R,0)}else if(V){E.__webglDepthbuffer=[];for(let K=0;K<6;K++)if(t.bindFramebuffer(r.FRAMEBUFFER,E.__webglFramebuffer[K]),E.__webglDepthbuffer[K]===void 0)E.__webglDepthbuffer[K]=r.createRenderbuffer(),$e(E.__webglDepthbuffer[K],R,!1);else{const se=R.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,fe=E.__webglDepthbuffer[K];r.bindRenderbuffer(r.RENDERBUFFER,fe),r.framebufferRenderbuffer(r.FRAMEBUFFER,se,r.RENDERBUFFER,fe)}}else{const K=R.texture.mipmaps;if(K&&K.length>0?t.bindFramebuffer(r.FRAMEBUFFER,E.__webglFramebuffer[0]):t.bindFramebuffer(r.FRAMEBUFFER,E.__webglFramebuffer),E.__webglDepthbuffer===void 0)E.__webglDepthbuffer=r.createRenderbuffer(),$e(E.__webglDepthbuffer,R,!1);else{const se=R.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,fe=E.__webglDepthbuffer;r.bindRenderbuffer(r.RENDERBUFFER,fe),r.framebufferRenderbuffer(r.FRAMEBUFFER,se,r.RENDERBUFFER,fe)}}t.bindFramebuffer(r.FRAMEBUFFER,null)}function ue(R,E,V){const K=n.get(R);E!==void 0&&Oe(K.__webglFramebuffer,R,R.texture,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,0),V!==void 0&&te(R)}function ie(R){const E=R.texture,V=n.get(R),K=n.get(E);R.addEventListener("dispose",M);const se=R.textures,fe=R.isWebGLCubeRenderTarget===!0,ge=se.length>1;if(ge||(K.__webglTexture===void 0&&(K.__webglTexture=r.createTexture()),K.__version=E.version,o.memory.textures++),fe){V.__webglFramebuffer=[];for(let q=0;q<6;q++)if(E.mipmaps&&E.mipmaps.length>0){V.__webglFramebuffer[q]=[];for(let $=0;$<E.mipmaps.length;$++)V.__webglFramebuffer[q][$]=r.createFramebuffer()}else V.__webglFramebuffer[q]=r.createFramebuffer()}else{if(E.mipmaps&&E.mipmaps.length>0){V.__webglFramebuffer=[];for(let q=0;q<E.mipmaps.length;q++)V.__webglFramebuffer[q]=r.createFramebuffer()}else V.__webglFramebuffer=r.createFramebuffer();if(ge)for(let q=0,$=se.length;q<$;q++){const Re=n.get(se[q]);Re.__webglTexture===void 0&&(Re.__webglTexture=r.createTexture(),o.memory.textures++)}if(R.samples>0&&ee(R)===!1){V.__webglMultisampledFramebuffer=r.createFramebuffer(),V.__webglColorRenderbuffer=[],t.bindFramebuffer(r.FRAMEBUFFER,V.__webglMultisampledFramebuffer);for(let q=0;q<se.length;q++){const $=se[q];V.__webglColorRenderbuffer[q]=r.createRenderbuffer(),r.bindRenderbuffer(r.RENDERBUFFER,V.__webglColorRenderbuffer[q]);const Re=s.convert($.format,$.colorSpace),De=s.convert($.type),ve=y($.internalFormat,Re,De,$.normalized,$.colorSpace,R.isXRRenderTarget===!0),_e=Z(R);r.renderbufferStorageMultisample(r.RENDERBUFFER,_e,ve,R.width,R.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+q,r.RENDERBUFFER,V.__webglColorRenderbuffer[q])}r.bindRenderbuffer(r.RENDERBUFFER,null),R.depthBuffer&&(V.__webglDepthRenderbuffer=r.createRenderbuffer(),$e(V.__webglDepthRenderbuffer,R,!0)),t.bindFramebuffer(r.FRAMEBUFFER,null)}}if(fe){t.bindTexture(r.TEXTURE_CUBE_MAP,K.__webglTexture),Ye(r.TEXTURE_CUBE_MAP,E);for(let q=0;q<6;q++)if(E.mipmaps&&E.mipmaps.length>0)for(let $=0;$<E.mipmaps.length;$++)Oe(V.__webglFramebuffer[q][$],R,E,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+q,$);else Oe(V.__webglFramebuffer[q],R,E,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+q,0);m(E)&&x(r.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(ge){for(let q=0,$=se.length;q<$;q++){const Re=se[q],De=n.get(Re);let ve=r.TEXTURE_2D;(R.isWebGL3DRenderTarget||R.isWebGLArrayRenderTarget)&&(ve=R.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY),t.bindTexture(ve,De.__webglTexture),Ye(ve,Re),Oe(V.__webglFramebuffer,R,Re,r.COLOR_ATTACHMENT0+q,ve,0),m(Re)&&x(ve)}t.unbindTexture()}else{let q=r.TEXTURE_2D;if((R.isWebGL3DRenderTarget||R.isWebGLArrayRenderTarget)&&(q=R.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY),t.bindTexture(q,K.__webglTexture),Ye(q,E),E.mipmaps&&E.mipmaps.length>0)for(let $=0;$<E.mipmaps.length;$++)Oe(V.__webglFramebuffer[$],R,E,r.COLOR_ATTACHMENT0,q,$);else Oe(V.__webglFramebuffer,R,E,r.COLOR_ATTACHMENT0,q,0);m(E)&&x(q),t.unbindTexture()}R.depthBuffer&&te(R)}function be(R){const E=R.textures;for(let V=0,K=E.length;V<K;V++){const se=E[V];if(m(se)){const fe=v(R),ge=n.get(se).__webglTexture;t.bindTexture(fe,ge),x(fe),t.unbindTexture()}}}const Se=[],Ke=[];function D(R){if(R.samples>0){if(ee(R)===!1){const E=R.textures,V=R.width,K=R.height;let se=r.COLOR_BUFFER_BIT;const fe=R.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,ge=n.get(R),q=E.length>1;if(q)for(let Re=0;Re<E.length;Re++)t.bindFramebuffer(r.FRAMEBUFFER,ge.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+Re,r.RENDERBUFFER,null),t.bindFramebuffer(r.FRAMEBUFFER,ge.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+Re,r.TEXTURE_2D,null,0);t.bindFramebuffer(r.READ_FRAMEBUFFER,ge.__webglMultisampledFramebuffer);const $=R.texture.mipmaps;$&&$.length>0?t.bindFramebuffer(r.DRAW_FRAMEBUFFER,ge.__webglFramebuffer[0]):t.bindFramebuffer(r.DRAW_FRAMEBUFFER,ge.__webglFramebuffer);for(let Re=0;Re<E.length;Re++){if(R.resolveDepthBuffer&&(R.depthBuffer&&(se|=r.DEPTH_BUFFER_BIT),R.stencilBuffer&&R.resolveStencilBuffer&&(se|=r.STENCIL_BUFFER_BIT)),q){r.framebufferRenderbuffer(r.READ_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.RENDERBUFFER,ge.__webglColorRenderbuffer[Re]);const De=n.get(E[Re]).__webglTexture;r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,De,0)}r.blitFramebuffer(0,0,V,K,0,0,V,K,se,r.NEAREST),l===!0&&(Se.length=0,Ke.length=0,Se.push(r.COLOR_ATTACHMENT0+Re),R.depthBuffer&&R.resolveDepthBuffer===!1&&(Se.push(fe),Ke.push(fe),r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,Ke)),r.invalidateFramebuffer(r.READ_FRAMEBUFFER,Se))}if(t.bindFramebuffer(r.READ_FRAMEBUFFER,null),t.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),q)for(let Re=0;Re<E.length;Re++){t.bindFramebuffer(r.FRAMEBUFFER,ge.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+Re,r.RENDERBUFFER,ge.__webglColorRenderbuffer[Re]);const De=n.get(E[Re]).__webglTexture;t.bindFramebuffer(r.FRAMEBUFFER,ge.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+Re,r.TEXTURE_2D,De,0)}t.bindFramebuffer(r.DRAW_FRAMEBUFFER,ge.__webglMultisampledFramebuffer)}else if(R.depthBuffer&&R.resolveDepthBuffer===!1&&l){const E=R.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT;r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,[E])}}}function Z(R){return Math.min(i.maxSamples,R.samples)}function ee(R){const E=n.get(R);return R.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&E.__useRenderToTexture!==!1}function Pe(R){const E=o.render.frame;h.get(R)!==E&&(h.set(R,E),R.update())}function ne(R,E){const V=R.colorSpace,K=R.format,se=R.type;return R.isCompressedTexture===!0||R.isVideoTexture===!0||V!==pn&&V!==kn&&(ht.getTransfer(V)===mt?(K!==bn||se!==dn)&&ze("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Xe("WebGLTextures: Unsupported texture color space:",V)),E}function Ze(R){return typeof HTMLImageElement<"u"&&R instanceof HTMLImageElement?(a.width=R.naturalWidth||R.width,a.height=R.naturalHeight||R.height):typeof VideoFrame<"u"&&R instanceof VideoFrame?(a.width=R.displayWidth,a.height=R.displayHeight):(a.width=R.width,a.height=R.height),a}this.allocateTextureUnit=O,this.resetTextureUnits=N,this.getTextureUnits=B,this.setTextureUnits=U,this.setTexture2D=J,this.setTexture2DArray=ae,this.setTexture3D=pe,this.setTextureCube=Ee,this.rebindTextures=ue,this.setupRenderTarget=ie,this.updateRenderTargetMipmap=be,this.updateMultisampleRenderTarget=D,this.setupDepthRenderbuffer=te,this.setupFrameBufferTexture=Oe,this.useMultisampledRTT=ee,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function v1(r,e){function t(n,i=kn){let s;const o=ht.getTransfer(i);if(n===dn)return r.UNSIGNED_BYTE;if(n===Hc)return r.UNSIGNED_SHORT_4_4_4_4;if(n===Wc)return r.UNSIGNED_SHORT_5_5_5_1;if(n===Su)return r.UNSIGNED_INT_5_9_9_9_REV;if(n===bu)return r.UNSIGNED_INT_10F_11F_11F_REV;if(n===yu)return r.BYTE;if(n===Mu)return r.SHORT;if(n===lr)return r.UNSIGNED_SHORT;if(n===Vc)return r.INT;if(n===Yn)return r.UNSIGNED_INT;if(n===Sn)return r.FLOAT;if(n===cn)return r.HALF_FLOAT;if(n===wu)return r.ALPHA;if(n===Tu)return r.RGB;if(n===bn)return r.RGBA;if(n===ci)return r.DEPTH_COMPONENT;if(n===Fi)return r.DEPTH_STENCIL;if(n===Xc)return r.RED;if(n===qc)return r.RED_INTEGER;if(n===Gi)return r.RG;if(n===Yc)return r.RG_INTEGER;if(n===Kc)return r.RGBA_INTEGER;if(n===lo||n===ho||n===uo||n===fo)if(o===mt)if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(n===lo)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===ho)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===uo)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===fo)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(n===lo)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===ho)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===uo)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===fo)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===ka||n===Ga||n===Va||n===Ha)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(n===ka)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Ga)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Va)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Ha)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Wa||n===Xa||n===qa||n===Ya||n===Ka||n===_o||n===ja)if(s=e.get("WEBGL_compressed_texture_etc"),s!==null){if(n===Wa||n===Xa)return o===mt?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(n===qa)return o===mt?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC;if(n===Ya)return s.COMPRESSED_R11_EAC;if(n===Ka)return s.COMPRESSED_SIGNED_R11_EAC;if(n===_o)return s.COMPRESSED_RG11_EAC;if(n===ja)return s.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===Ja||n===Za||n===$a||n===Qa||n===ec||n===tc||n===nc||n===ic||n===sc||n===rc||n===oc||n===ac||n===cc||n===lc)if(s=e.get("WEBGL_compressed_texture_astc"),s!==null){if(n===Ja)return o===mt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Za)return o===mt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===$a)return o===mt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Qa)return o===mt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===ec)return o===mt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===tc)return o===mt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===nc)return o===mt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===ic)return o===mt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===sc)return o===mt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===rc)return o===mt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===oc)return o===mt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===ac)return o===mt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===cc)return o===mt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===lc)return o===mt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===hc||n===uc||n===fc)if(s=e.get("EXT_texture_compression_bptc"),s!==null){if(n===hc)return o===mt?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===uc)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===fc)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===dc||n===pc||n===xo||n===mc)if(s=e.get("EXT_texture_compression_rgtc"),s!==null){if(n===dc)return s.COMPRESSED_RED_RGTC1_EXT;if(n===pc)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===xo)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===mc)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===hr?r.UNSIGNED_INT_24_8:r[n]!==void 0?r[n]:null}return{convert:t}}const y1=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,M1=`
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

}`;class S1{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const n=new zu(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,n=new Gt({vertexShader:y1,fragmentShader:M1,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new z(new rn(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class b1 extends Ei{constructor(e,t){super();const n=this;let i=null,s=1,o=null,c="local-floor",l=1,a=null,h=null,u=null,f=null,_=null,d=null;const g=typeof XRWebGLBinding<"u",p=new S1,m={},x=t.getContextAttributes();let v=null,y=null;const b=[],S=[],w=new re;let M=null;const T=new sn;T.viewport=new xt;const A=new sn;A.viewport=new xt;const L=[T,A],I=new _0;let N=null,B=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Q){let we=b[Q];return we===void 0&&(we=new Xo,b[Q]=we),we.getTargetRaySpace()},this.getControllerGrip=function(Q){let we=b[Q];return we===void 0&&(we=new Xo,b[Q]=we),we.getGripSpace()},this.getHand=function(Q){let we=b[Q];return we===void 0&&(we=new Xo,b[Q]=we),we.getHandSpace()};function U(Q){const we=S.indexOf(Q.inputSource);if(we===-1)return;const me=b[we];me!==void 0&&(me.update(Q.inputSource,Q.frame,a||o),me.dispatchEvent({type:Q.type,data:Q.inputSource}))}function O(){i.removeEventListener("select",U),i.removeEventListener("selectstart",U),i.removeEventListener("selectend",U),i.removeEventListener("squeeze",U),i.removeEventListener("squeezestart",U),i.removeEventListener("squeezeend",U),i.removeEventListener("end",O),i.removeEventListener("inputsourceschange",k);for(let Q=0;Q<b.length;Q++){const we=S[Q];we!==null&&(S[Q]=null,b[Q].disconnect(we))}N=null,B=null,p.reset();for(const Q in m)delete m[Q];e.setRenderTarget(v),_=null,f=null,u=null,i=null,y=null,Ye.stop(),n.isPresenting=!1,e.setPixelRatio(M),e.setSize(w.width,w.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Q){s=Q,n.isPresenting===!0&&ze("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Q){c=Q,n.isPresenting===!0&&ze("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return a||o},this.setReferenceSpace=function(Q){a=Q},this.getBaseLayer=function(){return f!==null?f:_},this.getBinding=function(){return u===null&&g&&(u=new XRWebGLBinding(i,t)),u},this.getFrame=function(){return d},this.getSession=function(){return i},this.setSession=async function(Q){if(i=Q,i!==null){if(v=e.getRenderTarget(),i.addEventListener("select",U),i.addEventListener("selectstart",U),i.addEventListener("selectend",U),i.addEventListener("squeeze",U),i.addEventListener("squeezestart",U),i.addEventListener("squeezeend",U),i.addEventListener("end",O),i.addEventListener("inputsourceschange",k),x.xrCompatible!==!0&&await t.makeXRCompatible(),M=e.getPixelRatio(),e.getSize(w),g&&"createProjectionLayer"in XRWebGLBinding.prototype){let me=null,Fe=null,qe=null;x.depth&&(qe=x.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,me=x.stencil?Fi:ci,Fe=x.stencil?hr:Yn);const Oe={colorFormat:t.RGBA8,depthFormat:qe,scaleFactor:s};u=this.getBinding(),f=u.createProjectionLayer(Oe),i.updateRenderState({layers:[f]}),e.setPixelRatio(1),e.setSize(f.textureWidth,f.textureHeight,!1),y=new on(f.textureWidth,f.textureHeight,{format:bn,type:dn,depthTexture:new Ss(f.textureWidth,f.textureHeight,Fe,void 0,void 0,void 0,void 0,void 0,void 0,me),stencilBuffer:x.stencil,colorSpace:e.outputColorSpace,samples:x.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}else{const me={antialias:x.antialias,alpha:!0,depth:x.depth,stencil:x.stencil,framebufferScaleFactor:s};_=new XRWebGLLayer(i,t,me),i.updateRenderState({baseLayer:_}),e.setPixelRatio(1),e.setSize(_.framebufferWidth,_.framebufferHeight,!1),y=new on(_.framebufferWidth,_.framebufferHeight,{format:bn,type:dn,colorSpace:e.outputColorSpace,stencilBuffer:x.stencil,resolveDepthBuffer:_.ignoreDepthValues===!1,resolveStencilBuffer:_.ignoreDepthValues===!1})}y.isXRRenderTarget=!0,this.setFoveation(l),a=null,o=await i.requestReferenceSpace(c),Ye.setContext(i),Ye.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode},this.getDepthTexture=function(){return p.getDepthTexture()};function k(Q){for(let we=0;we<Q.removed.length;we++){const me=Q.removed[we],Fe=S.indexOf(me);Fe>=0&&(S[Fe]=null,b[Fe].disconnect(me))}for(let we=0;we<Q.added.length;we++){const me=Q.added[we];let Fe=S.indexOf(me);if(Fe===-1){for(let Oe=0;Oe<b.length;Oe++)if(Oe>=S.length){S.push(me),Fe=Oe;break}else if(S[Oe]===null){S[Oe]=me,Fe=Oe;break}if(Fe===-1)break}const qe=b[Fe];qe&&qe.connect(me)}}const J=new P,ae=new P;function pe(Q,we,me){J.setFromMatrixPosition(we.matrixWorld),ae.setFromMatrixPosition(me.matrixWorld);const Fe=J.distanceTo(ae),qe=we.projectionMatrix.elements,Oe=me.projectionMatrix.elements,$e=qe[14]/(qe[10]-1),We=qe[14]/(qe[10]+1),te=(qe[9]+1)/qe[5],ue=(qe[9]-1)/qe[5],ie=(qe[8]-1)/qe[0],be=(Oe[8]+1)/Oe[0],Se=$e*ie,Ke=$e*be,D=Fe/(-ie+be),Z=D*-ie;if(we.matrixWorld.decompose(Q.position,Q.quaternion,Q.scale),Q.translateX(Z),Q.translateZ(D),Q.matrixWorld.compose(Q.position,Q.quaternion,Q.scale),Q.matrixWorldInverse.copy(Q.matrixWorld).invert(),qe[10]===-1)Q.projectionMatrix.copy(we.projectionMatrix),Q.projectionMatrixInverse.copy(we.projectionMatrixInverse);else{const ee=$e+D,Pe=We+D,ne=Se-Z,Ze=Ke+(Fe-Z),R=te*We/Pe*ee,E=ue*We/Pe*ee;Q.projectionMatrix.makePerspective(ne,Ze,R,E,ee,Pe),Q.projectionMatrixInverse.copy(Q.projectionMatrix).invert()}}function Ee(Q,we){we===null?Q.matrixWorld.copy(Q.matrix):Q.matrixWorld.multiplyMatrices(we.matrixWorld,Q.matrix),Q.matrixWorldInverse.copy(Q.matrixWorld).invert()}this.updateCamera=function(Q){if(i===null)return;let we=Q.near,me=Q.far;p.texture!==null&&(p.depthNear>0&&(we=p.depthNear),p.depthFar>0&&(me=p.depthFar)),I.near=A.near=T.near=we,I.far=A.far=T.far=me,(N!==I.near||B!==I.far)&&(i.updateRenderState({depthNear:I.near,depthFar:I.far}),N=I.near,B=I.far),I.layers.mask=Q.layers.mask|6,T.layers.mask=I.layers.mask&-5,A.layers.mask=I.layers.mask&-3;const Fe=Q.parent,qe=I.cameras;Ee(I,Fe);for(let Oe=0;Oe<qe.length;Oe++)Ee(qe[Oe],Fe);qe.length===2?pe(I,T,A):I.projectionMatrix.copy(T.projectionMatrix),Ue(Q,I,Fe)};function Ue(Q,we,me){me===null?Q.matrix.copy(we.matrixWorld):(Q.matrix.copy(me.matrixWorld),Q.matrix.invert(),Q.matrix.multiply(we.matrixWorld)),Q.matrix.decompose(Q.position,Q.quaternion,Q.scale),Q.updateMatrixWorld(!0),Q.projectionMatrix.copy(we.projectionMatrix),Q.projectionMatrixInverse.copy(we.projectionMatrixInverse),Q.isPerspectiveCamera&&(Q.fov=Ms*2*Math.atan(1/Q.projectionMatrix.elements[5]),Q.zoom=1)}this.getCamera=function(){return I},this.getFoveation=function(){if(!(f===null&&_===null))return l},this.setFoveation=function(Q){l=Q,f!==null&&(f.fixedFoveation=Q),_!==null&&_.fixedFoveation!==void 0&&(_.fixedFoveation=Q)},this.hasDepthSensing=function(){return p.texture!==null},this.getDepthSensingMesh=function(){return p.getMesh(I)},this.getCameraTexture=function(Q){return m[Q]};let et=null;function nt(Q,we){if(h=we.getViewerPose(a||o),d=we,h!==null){const me=h.views;_!==null&&(e.setRenderTargetFramebuffer(y,_.framebuffer),e.setRenderTarget(y));let Fe=!1;me.length!==I.cameras.length&&(I.cameras.length=0,Fe=!0);for(let We=0;We<me.length;We++){const te=me[We];let ue=null;if(_!==null)ue=_.getViewport(te);else{const be=u.getViewSubImage(f,te);ue=be.viewport,We===0&&(e.setRenderTargetTextures(y,be.colorTexture,be.depthStencilTexture),e.setRenderTarget(y))}let ie=L[We];ie===void 0&&(ie=new sn,ie.layers.enable(We),ie.viewport=new xt,L[We]=ie),ie.matrix.fromArray(te.transform.matrix),ie.matrix.decompose(ie.position,ie.quaternion,ie.scale),ie.projectionMatrix.fromArray(te.projectionMatrix),ie.projectionMatrixInverse.copy(ie.projectionMatrix).invert(),ie.viewport.set(ue.x,ue.y,ue.width,ue.height),We===0&&(I.matrix.copy(ie.matrix),I.matrix.decompose(I.position,I.quaternion,I.scale)),Fe===!0&&I.cameras.push(ie)}const qe=i.enabledFeatures;if(qe&&qe.includes("depth-sensing")&&i.depthUsage=="gpu-optimized"&&g){u=n.getBinding();const We=u.getDepthInformation(me[0]);We&&We.isValid&&We.texture&&p.init(We,i.renderState)}if(qe&&qe.includes("camera-access")&&g){e.state.unbindTexture(),u=n.getBinding();for(let We=0;We<me.length;We++){const te=me[We].camera;if(te){let ue=m[te];ue||(ue=new zu,m[te]=ue);const ie=u.getCameraImage(te);ue.sourceTexture=ie}}}}for(let me=0;me<b.length;me++){const Fe=S[me],qe=b[me];Fe!==null&&qe!==void 0&&qe.update(Fe,we,a||o)}et&&et(Q,we),we.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:we}),d=null}const Ye=new nf;Ye.setAnimationLoop(nt),this.setAnimationLoop=function(Q){et=Q},this.dispose=function(){}}}const w1=new Qe,hf=new it;hf.set(-1,0,0,0,1,0,0,0,1);function T1(r,e){function t(p,m){p.matrixAutoUpdate===!0&&p.updateMatrix(),m.value.copy(p.matrix)}function n(p,m){m.color.getRGB(p.fogColor.value,ju(r)),m.isFog?(p.fogNear.value=m.near,p.fogFar.value=m.far):m.isFogExp2&&(p.fogDensity.value=m.density)}function i(p,m,x,v,y){m.isNodeMaterial?m.uniformsNeedUpdate=!1:m.isMeshBasicMaterial?s(p,m):m.isMeshLambertMaterial?(s(p,m),m.envMap&&(p.envMapIntensity.value=m.envMapIntensity)):m.isMeshToonMaterial?(s(p,m),u(p,m)):m.isMeshPhongMaterial?(s(p,m),h(p,m),m.envMap&&(p.envMapIntensity.value=m.envMapIntensity)):m.isMeshStandardMaterial?(s(p,m),f(p,m),m.isMeshPhysicalMaterial&&_(p,m,y)):m.isMeshMatcapMaterial?(s(p,m),d(p,m)):m.isMeshDepthMaterial?s(p,m):m.isMeshDistanceMaterial?(s(p,m),g(p,m)):m.isMeshNormalMaterial?s(p,m):m.isLineBasicMaterial?(o(p,m),m.isLineDashedMaterial&&c(p,m)):m.isPointsMaterial?l(p,m,x,v):m.isSpriteMaterial?a(p,m):m.isShadowMaterial?(p.color.value.copy(m.color),p.opacity.value=m.opacity):m.isShaderMaterial&&(m.uniformsNeedUpdate=!1)}function s(p,m){p.opacity.value=m.opacity,m.color&&p.diffuse.value.copy(m.color),m.emissive&&p.emissive.value.copy(m.emissive).multiplyScalar(m.emissiveIntensity),m.map&&(p.map.value=m.map,t(m.map,p.mapTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,t(m.alphaMap,p.alphaMapTransform)),m.bumpMap&&(p.bumpMap.value=m.bumpMap,t(m.bumpMap,p.bumpMapTransform),p.bumpScale.value=m.bumpScale,m.side===Yt&&(p.bumpScale.value*=-1)),m.normalMap&&(p.normalMap.value=m.normalMap,t(m.normalMap,p.normalMapTransform),p.normalScale.value.copy(m.normalScale),m.side===Yt&&p.normalScale.value.negate()),m.displacementMap&&(p.displacementMap.value=m.displacementMap,t(m.displacementMap,p.displacementMapTransform),p.displacementScale.value=m.displacementScale,p.displacementBias.value=m.displacementBias),m.emissiveMap&&(p.emissiveMap.value=m.emissiveMap,t(m.emissiveMap,p.emissiveMapTransform)),m.specularMap&&(p.specularMap.value=m.specularMap,t(m.specularMap,p.specularMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest);const x=e.get(m),v=x.envMap,y=x.envMapRotation;v&&(p.envMap.value=v,p.envMapRotation.value.setFromMatrix4(w1.makeRotationFromEuler(y)).transpose(),v.isCubeTexture&&v.isRenderTargetTexture===!1&&p.envMapRotation.value.premultiply(hf),p.reflectivity.value=m.reflectivity,p.ior.value=m.ior,p.refractionRatio.value=m.refractionRatio),m.lightMap&&(p.lightMap.value=m.lightMap,p.lightMapIntensity.value=m.lightMapIntensity,t(m.lightMap,p.lightMapTransform)),m.aoMap&&(p.aoMap.value=m.aoMap,p.aoMapIntensity.value=m.aoMapIntensity,t(m.aoMap,p.aoMapTransform))}function o(p,m){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,m.map&&(p.map.value=m.map,t(m.map,p.mapTransform))}function c(p,m){p.dashSize.value=m.dashSize,p.totalSize.value=m.dashSize+m.gapSize,p.scale.value=m.scale}function l(p,m,x,v){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,p.size.value=m.size*x,p.scale.value=v*.5,m.map&&(p.map.value=m.map,t(m.map,p.uvTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,t(m.alphaMap,p.alphaMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest)}function a(p,m){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,p.rotation.value=m.rotation,m.map&&(p.map.value=m.map,t(m.map,p.mapTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,t(m.alphaMap,p.alphaMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest)}function h(p,m){p.specular.value.copy(m.specular),p.shininess.value=Math.max(m.shininess,1e-4)}function u(p,m){m.gradientMap&&(p.gradientMap.value=m.gradientMap)}function f(p,m){p.metalness.value=m.metalness,m.metalnessMap&&(p.metalnessMap.value=m.metalnessMap,t(m.metalnessMap,p.metalnessMapTransform)),p.roughness.value=m.roughness,m.roughnessMap&&(p.roughnessMap.value=m.roughnessMap,t(m.roughnessMap,p.roughnessMapTransform)),m.envMap&&(p.envMapIntensity.value=m.envMapIntensity)}function _(p,m,x){p.ior.value=m.ior,m.sheen>0&&(p.sheenColor.value.copy(m.sheenColor).multiplyScalar(m.sheen),p.sheenRoughness.value=m.sheenRoughness,m.sheenColorMap&&(p.sheenColorMap.value=m.sheenColorMap,t(m.sheenColorMap,p.sheenColorMapTransform)),m.sheenRoughnessMap&&(p.sheenRoughnessMap.value=m.sheenRoughnessMap,t(m.sheenRoughnessMap,p.sheenRoughnessMapTransform))),m.clearcoat>0&&(p.clearcoat.value=m.clearcoat,p.clearcoatRoughness.value=m.clearcoatRoughness,m.clearcoatMap&&(p.clearcoatMap.value=m.clearcoatMap,t(m.clearcoatMap,p.clearcoatMapTransform)),m.clearcoatRoughnessMap&&(p.clearcoatRoughnessMap.value=m.clearcoatRoughnessMap,t(m.clearcoatRoughnessMap,p.clearcoatRoughnessMapTransform)),m.clearcoatNormalMap&&(p.clearcoatNormalMap.value=m.clearcoatNormalMap,t(m.clearcoatNormalMap,p.clearcoatNormalMapTransform),p.clearcoatNormalScale.value.copy(m.clearcoatNormalScale),m.side===Yt&&p.clearcoatNormalScale.value.negate())),m.dispersion>0&&(p.dispersion.value=m.dispersion),m.iridescence>0&&(p.iridescence.value=m.iridescence,p.iridescenceIOR.value=m.iridescenceIOR,p.iridescenceThicknessMinimum.value=m.iridescenceThicknessRange[0],p.iridescenceThicknessMaximum.value=m.iridescenceThicknessRange[1],m.iridescenceMap&&(p.iridescenceMap.value=m.iridescenceMap,t(m.iridescenceMap,p.iridescenceMapTransform)),m.iridescenceThicknessMap&&(p.iridescenceThicknessMap.value=m.iridescenceThicknessMap,t(m.iridescenceThicknessMap,p.iridescenceThicknessMapTransform))),m.transmission>0&&(p.transmission.value=m.transmission,p.transmissionSamplerMap.value=x.texture,p.transmissionSamplerSize.value.set(x.width,x.height),m.transmissionMap&&(p.transmissionMap.value=m.transmissionMap,t(m.transmissionMap,p.transmissionMapTransform)),p.thickness.value=m.thickness,m.thicknessMap&&(p.thicknessMap.value=m.thicknessMap,t(m.thicknessMap,p.thicknessMapTransform)),p.attenuationDistance.value=m.attenuationDistance,p.attenuationColor.value.copy(m.attenuationColor)),m.anisotropy>0&&(p.anisotropyVector.value.set(m.anisotropy*Math.cos(m.anisotropyRotation),m.anisotropy*Math.sin(m.anisotropyRotation)),m.anisotropyMap&&(p.anisotropyMap.value=m.anisotropyMap,t(m.anisotropyMap,p.anisotropyMapTransform))),p.specularIntensity.value=m.specularIntensity,p.specularColor.value.copy(m.specularColor),m.specularColorMap&&(p.specularColorMap.value=m.specularColorMap,t(m.specularColorMap,p.specularColorMapTransform)),m.specularIntensityMap&&(p.specularIntensityMap.value=m.specularIntensityMap,t(m.specularIntensityMap,p.specularIntensityMapTransform))}function d(p,m){m.matcap&&(p.matcap.value=m.matcap)}function g(p,m){const x=e.get(m).light;p.referencePosition.value.setFromMatrixPosition(x.matrixWorld),p.nearDistance.value=x.shadow.camera.near,p.farDistance.value=x.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:i}}function E1(r,e,t,n){let i={},s={},o=[];const c=r.getParameter(r.MAX_UNIFORM_BUFFER_BINDINGS);function l(x,v){const y=v.program;n.uniformBlockBinding(x,y)}function a(x,v){let y=i[x.id];y===void 0&&(d(x),y=h(x),i[x.id]=y,x.addEventListener("dispose",p));const b=v.program;n.updateUBOMapping(x,b);const S=e.render.frame;s[x.id]!==S&&(f(x),s[x.id]=S)}function h(x){const v=u();x.__bindingPointIndex=v;const y=r.createBuffer(),b=x.__size,S=x.usage;return r.bindBuffer(r.UNIFORM_BUFFER,y),r.bufferData(r.UNIFORM_BUFFER,b,S),r.bindBuffer(r.UNIFORM_BUFFER,null),r.bindBufferBase(r.UNIFORM_BUFFER,v,y),y}function u(){for(let x=0;x<c;x++)if(o.indexOf(x)===-1)return o.push(x),x;return Xe("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(x){const v=i[x.id],y=x.uniforms,b=x.__cache;r.bindBuffer(r.UNIFORM_BUFFER,v);for(let S=0,w=y.length;S<w;S++){const M=Array.isArray(y[S])?y[S]:[y[S]];for(let T=0,A=M.length;T<A;T++){const L=M[T];if(_(L,S,T,b)===!0){const I=L.__offset,N=Array.isArray(L.value)?L.value:[L.value];let B=0;for(let U=0;U<N.length;U++){const O=N[U],k=g(O);typeof O=="number"||typeof O=="boolean"?(L.__data[0]=O,r.bufferSubData(r.UNIFORM_BUFFER,I+B,L.__data)):O.isMatrix3?(L.__data[0]=O.elements[0],L.__data[1]=O.elements[1],L.__data[2]=O.elements[2],L.__data[3]=0,L.__data[4]=O.elements[3],L.__data[5]=O.elements[4],L.__data[6]=O.elements[5],L.__data[7]=0,L.__data[8]=O.elements[6],L.__data[9]=O.elements[7],L.__data[10]=O.elements[8],L.__data[11]=0):ArrayBuffer.isView(O)?L.__data.set(new O.constructor(O.buffer,O.byteOffset,L.__data.length)):(O.toArray(L.__data,B),B+=k.storage/Float32Array.BYTES_PER_ELEMENT)}r.bufferSubData(r.UNIFORM_BUFFER,I,L.__data)}}}r.bindBuffer(r.UNIFORM_BUFFER,null)}function _(x,v,y,b){const S=x.value,w=v+"_"+y;if(b[w]===void 0)return typeof S=="number"||typeof S=="boolean"?b[w]=S:ArrayBuffer.isView(S)?b[w]=S.slice():b[w]=S.clone(),!0;{const M=b[w];if(typeof S=="number"||typeof S=="boolean"){if(M!==S)return b[w]=S,!0}else{if(ArrayBuffer.isView(S))return!0;if(M.equals(S)===!1)return M.copy(S),!0}}return!1}function d(x){const v=x.uniforms;let y=0;const b=16;for(let w=0,M=v.length;w<M;w++){const T=Array.isArray(v[w])?v[w]:[v[w]];for(let A=0,L=T.length;A<L;A++){const I=T[A],N=Array.isArray(I.value)?I.value:[I.value];for(let B=0,U=N.length;B<U;B++){const O=N[B],k=g(O),J=y%b,ae=J%k.boundary,pe=J+ae;y+=ae,pe!==0&&b-pe<k.storage&&(y+=b-pe),I.__data=new Float32Array(k.storage/Float32Array.BYTES_PER_ELEMENT),I.__offset=y,y+=k.storage}}}const S=y%b;return S>0&&(y+=b-S),x.__size=y,x.__cache={},this}function g(x){const v={boundary:0,storage:0};return typeof x=="number"||typeof x=="boolean"?(v.boundary=4,v.storage=4):x.isVector2?(v.boundary=8,v.storage=8):x.isVector3||x.isColor?(v.boundary=16,v.storage=12):x.isVector4?(v.boundary=16,v.storage=16):x.isMatrix3?(v.boundary=48,v.storage=48):x.isMatrix4?(v.boundary=64,v.storage=64):x.isTexture?ze("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(x)?(v.boundary=16,v.storage=x.byteLength):ze("WebGLRenderer: Unsupported uniform value type.",x),v}function p(x){const v=x.target;v.removeEventListener("dispose",p);const y=o.indexOf(v.__bindingPointIndex);o.splice(y,1),r.deleteBuffer(i[v.id]),delete i[v.id],delete s[v.id]}function m(){for(const x in i)r.deleteBuffer(i[x]);o=[],i={},s={}}return{bind:l,update:a,dispose:m}}const A1=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let On=null;function C1(){return On===null&&(On=new tl(A1,16,16,Gi,cn),On.name="DFG_LUT",On.minFilter=kt,On.magFilter=kt,On.wrapS=Gn,On.wrapT=Gn,On.generateMipmaps=!1,On.needsUpdate=!0),On}class R1{constructor(e={}){const{canvas:t=Sd(),context:n=null,depth:i=!0,stencil:s=!1,alpha:o=!1,antialias:c=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:a=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reversedDepthBuffer:f=!1,outputBufferType:_=dn}=e;this.isWebGLRenderer=!0;let d;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");d=n.getContextAttributes().alpha}else d=o;const g=_,p=new Set([Kc,Yc,qc]),m=new Set([dn,Yn,lr,hr,Hc,Wc]),x=new Uint32Array(4),v=new Int32Array(4),y=new P;let b=null,S=null;const w=[],M=[];let T=null;this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=qn,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const A=this;let L=!1,I=null;this._outputColorSpace=Mt;let N=0,B=0,U=null,O=-1,k=null;const J=new xt,ae=new xt;let pe=null;const Ee=new ce(0);let Ue=0,et=t.width,nt=t.height,Ye=1,Q=null,we=null;const me=new xt(0,0,et,nt),Fe=new xt(0,0,et,nt);let qe=!1;const Oe=new il;let $e=!1,We=!1;const te=new Qe,ue=new P,ie=new xt,be={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Se=!1;function Ke(){return U===null?Ye:1}let D=n;function Z(C,G){return t.getContext(C,G)}try{const C={alpha:!0,depth:i,stencil:s,antialias:c,premultipliedAlpha:l,preserveDrawingBuffer:a,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Uc}`),t.addEventListener("webglcontextlost",le,!1),t.addEventListener("webglcontextrestored",ke,!1),t.addEventListener("webglcontextcreationerror",st,!1),D===null){const G="webgl2";if(D=Z(G,C),D===null)throw Z(G)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(C){throw Xe("WebGLRenderer: "+C.message),C}let ee,Pe,ne,Ze,R,E,V,K,se,fe,ge,q,$,Re,De,ve,_e,tt,ot,pt,F,xe,j;function Le(){ee=new C2(D),ee.init(),F=new v1(D,ee),Pe=new y2(D,ee,e,F),ne=new _1(D,ee),Pe.reversedDepthBuffer&&f&&ne.buffers.depth.setReversed(!0),Ze=new L2(D),R=new i1,E=new x1(D,ee,ne,R,Pe,F,Ze),V=new A2(A),K=new U0(D),xe=new x2(D,K),se=new R2(D,K,Ze,xe),fe=new D2(D,se,K,xe,Ze),tt=new I2(D,Pe,E),De=new M2(R),ge=new n1(A,V,ee,Pe,xe,De),q=new T1(A,R),$=new r1,Re=new u1(ee),_e=new _2(A,V,ne,fe,d,l),ve=new g1(A,fe,Pe),j=new E1(D,Ze,Pe,ne),ot=new v2(D,ee,Ze),pt=new P2(D,ee,Ze),Ze.programs=ge.programs,A.capabilities=Pe,A.extensions=ee,A.properties=R,A.renderLists=$,A.shadowMap=ve,A.state=ne,A.info=Ze}Le(),g!==dn&&(T=new U2(g,t.width,t.height,i,s));const ye=new b1(A,D);this.xr=ye,this.getContext=function(){return D},this.getContextAttributes=function(){return D.getContextAttributes()},this.forceContextLoss=function(){const C=ee.get("WEBGL_lose_context");C&&C.loseContext()},this.forceContextRestore=function(){const C=ee.get("WEBGL_lose_context");C&&C.restoreContext()},this.getPixelRatio=function(){return Ye},this.setPixelRatio=function(C){C!==void 0&&(Ye=C,this.setSize(et,nt,!1))},this.getSize=function(C){return C.set(et,nt)},this.setSize=function(C,G,X=!0){if(ye.isPresenting){ze("WebGLRenderer: Can't change size while VR device is presenting.");return}et=C,nt=G,t.width=Math.floor(C*Ye),t.height=Math.floor(G*Ye),X===!0&&(t.style.width=C+"px",t.style.height=G+"px"),T!==null&&T.setSize(t.width,t.height),this.setViewport(0,0,C,G)},this.getDrawingBufferSize=function(C){return C.set(et*Ye,nt*Ye).floor()},this.setDrawingBufferSize=function(C,G,X){et=C,nt=G,Ye=X,t.width=Math.floor(C*X),t.height=Math.floor(G*X),this.setViewport(0,0,C,G)},this.setEffects=function(C){if(g===dn){Xe("THREE.WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(C){for(let G=0;G<C.length;G++)if(C[G].isOutputPass===!0){ze("THREE.WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}T.setEffects(C||[])},this.getCurrentViewport=function(C){return C.copy(J)},this.getViewport=function(C){return C.copy(me)},this.setViewport=function(C,G,X,H){C.isVector4?me.set(C.x,C.y,C.z,C.w):me.set(C,G,X,H),ne.viewport(J.copy(me).multiplyScalar(Ye).round())},this.getScissor=function(C){return C.copy(Fe)},this.setScissor=function(C,G,X,H){C.isVector4?Fe.set(C.x,C.y,C.z,C.w):Fe.set(C,G,X,H),ne.scissor(ae.copy(Fe).multiplyScalar(Ye).round())},this.getScissorTest=function(){return qe},this.setScissorTest=function(C){ne.setScissorTest(qe=C)},this.setOpaqueSort=function(C){Q=C},this.setTransparentSort=function(C){we=C},this.getClearColor=function(C){return C.copy(_e.getClearColor())},this.setClearColor=function(){_e.setClearColor(...arguments)},this.getClearAlpha=function(){return _e.getClearAlpha()},this.setClearAlpha=function(){_e.setClearAlpha(...arguments)},this.clear=function(C=!0,G=!0,X=!0){let H=0;if(C){let W=!1;if(U!==null){const Ce=U.texture.format;W=p.has(Ce)}if(W){const Ce=U.texture.type,Ne=m.has(Ce),Ae=_e.getClearColor(),Be=_e.getClearAlpha(),Ge=Ae.r,rt=Ae.g,ct=Ae.b;Ne?(x[0]=Ge,x[1]=rt,x[2]=ct,x[3]=Be,D.clearBufferuiv(D.COLOR,0,x)):(v[0]=Ge,v[1]=rt,v[2]=ct,v[3]=Be,D.clearBufferiv(D.COLOR,0,v))}else H|=D.COLOR_BUFFER_BIT}G&&(H|=D.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),X&&(H|=D.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),H!==0&&D.clear(H)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(C){C.setRenderer(this),I=C},this.dispose=function(){t.removeEventListener("webglcontextlost",le,!1),t.removeEventListener("webglcontextrestored",ke,!1),t.removeEventListener("webglcontextcreationerror",st,!1),_e.dispose(),$.dispose(),Re.dispose(),R.dispose(),V.dispose(),fe.dispose(),xe.dispose(),j.dispose(),ge.dispose(),ye.dispose(),ye.removeEventListener("sessionstart",yl),ye.removeEventListener("sessionend",Ml),Ai.stop()};function le(C){C.preventDefault(),Mo("WebGLRenderer: Context Lost."),L=!0}function ke(){Mo("WebGLRenderer: Context Restored."),L=!1;const C=Ze.autoReset,G=ve.enabled,X=ve.autoUpdate,H=ve.needsUpdate,W=ve.type;Le(),Ze.autoReset=C,ve.enabled=G,ve.autoUpdate=X,ve.needsUpdate=H,ve.type=W}function st(C){Xe("WebGLRenderer: A WebGL context could not be created. Reason: ",C.statusMessage)}function Dt(C){const G=C.target;G.removeEventListener("dispose",Dt),vt(G)}function vt(C){Zn(C),R.remove(C)}function Zn(C){const G=R.get(C).programs;G!==void 0&&(G.forEach(function(X){ge.releaseProgram(X)}),C.isShaderMaterial&&ge.releaseShaderCache(C))}this.renderBufferDirect=function(C,G,X,H,W,Ce){G===null&&(G=be);const Ne=W.isMesh&&W.matrixWorld.determinant()<0,Ae=Tf(C,G,X,H,W);ne.setMaterial(H,Ne);let Be=X.index,Ge=1;if(H.wireframe===!0){if(Be=se.getWireframeAttribute(X),Be===void 0)return;Ge=2}const rt=X.drawRange,ct=X.attributes.position;let Ve=rt.start*Ge,yt=(rt.start+rt.count)*Ge;Ce!==null&&(Ve=Math.max(Ve,Ce.start*Ge),yt=Math.min(yt,(Ce.start+Ce.count)*Ge)),Be!==null?(Ve=Math.max(Ve,0),yt=Math.min(yt,Be.count)):ct!=null&&(Ve=Math.max(Ve,0),yt=Math.min(yt,ct.count));const Nt=yt-Ve;if(Nt<0||Nt===1/0)return;xe.setup(W,H,Ae,X,Be);let Lt,Tt=ot;if(Be!==null&&(Lt=K.get(Be),Tt=pt,Tt.setIndex(Lt)),W.isMesh)H.wireframe===!0?(ne.setLineWidth(H.wireframeLinewidth*Ke()),Tt.setMode(D.LINES)):Tt.setMode(D.TRIANGLES);else if(W.isLine){let Kt=H.linewidth;Kt===void 0&&(Kt=1),ne.setLineWidth(Kt*Ke()),W.isLineSegments?Tt.setMode(D.LINES):W.isLineLoop?Tt.setMode(D.LINE_LOOP):Tt.setMode(D.LINE_STRIP)}else W.isPoints?Tt.setMode(D.POINTS):W.isSprite&&Tt.setMode(D.TRIANGLES);if(W.isBatchedMesh)if(ee.get("WEBGL_multi_draw"))Tt.renderMultiDraw(W._multiDrawStarts,W._multiDrawCounts,W._multiDrawCount);else{const Kt=W._multiDrawStarts,Ie=W._multiDrawCounts,hn=W._multiDrawCount,ft=Be?K.get(Be).bytesPerElement:1,gn=R.get(H).currentProgram.getUniforms();for(let Un=0;Un<hn;Un++)gn.setValue(D,"_gl_DrawID",Un),Tt.render(Kt[Un]/ft,Ie[Un])}else if(W.isInstancedMesh)Tt.renderInstances(Ve,Nt,W.count);else if(X.isInstancedBufferGeometry){const Kt=X._maxInstanceCount!==void 0?X._maxInstanceCount:1/0,Ie=Math.min(X.instanceCount,Kt);Tt.renderInstances(Ve,Nt,Ie)}else Tt.render(Ve,Nt)};function Nn(C,G,X){C.transparent===!0&&C.side===St&&C.forceSinglePass===!1?(C.side=Yt,C.needsUpdate=!0,Tr(C,G,X),C.side=ai,C.needsUpdate=!0,Tr(C,G,X),C.side=St):Tr(C,G,X)}this.compile=function(C,G,X=null){X===null&&(X=C),S=Re.get(X),S.init(G),M.push(S),X.traverseVisible(function(W){W.isLight&&W.layers.test(G.layers)&&(S.pushLight(W),W.castShadow&&S.pushShadow(W))}),C!==X&&C.traverseVisible(function(W){W.isLight&&W.layers.test(G.layers)&&(S.pushLight(W),W.castShadow&&S.pushShadow(W))}),S.setupLights();const H=new Set;return C.traverse(function(W){if(!(W.isMesh||W.isPoints||W.isLine||W.isSprite))return;const Ce=W.material;if(Ce)if(Array.isArray(Ce))for(let Ne=0;Ne<Ce.length;Ne++){const Ae=Ce[Ne];Nn(Ae,X,W),H.add(Ae)}else Nn(Ce,X,W),H.add(Ce)}),S=M.pop(),H},this.compileAsync=function(C,G,X=null){const H=this.compile(C,G,X);return new Promise(W=>{function Ce(){if(H.forEach(function(Ne){R.get(Ne).currentProgram.isReady()&&H.delete(Ne)}),H.size===0){W(C);return}setTimeout(Ce,10)}ee.get("KHR_parallel_shader_compile")!==null?Ce():setTimeout(Ce,10)})};let Do=null;function bf(C){Do&&Do(C)}function yl(){Ai.stop()}function Ml(){Ai.start()}const Ai=new nf;Ai.setAnimationLoop(bf),typeof self<"u"&&Ai.setContext(self),this.setAnimationLoop=function(C){Do=C,ye.setAnimationLoop(C),C===null?Ai.stop():Ai.start()},ye.addEventListener("sessionstart",yl),ye.addEventListener("sessionend",Ml),this.render=function(C,G){if(G!==void 0&&G.isCamera!==!0){Xe("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(L===!0)return;I!==null&&I.renderStart(C,G);const X=ye.enabled===!0&&ye.isPresenting===!0,H=T!==null&&(U===null||X)&&T.begin(A,U);if(C.matrixWorldAutoUpdate===!0&&C.updateMatrixWorld(),G.parent===null&&G.matrixWorldAutoUpdate===!0&&G.updateMatrixWorld(),ye.enabled===!0&&ye.isPresenting===!0&&(T===null||T.isCompositing()===!1)&&(ye.cameraAutoUpdate===!0&&ye.updateCamera(G),G=ye.getCamera()),C.isScene===!0&&C.onBeforeRender(A,C,G,U),S=Re.get(C,M.length),S.init(G),S.state.textureUnits=E.getTextureUnits(),M.push(S),te.multiplyMatrices(G.projectionMatrix,G.matrixWorldInverse),Oe.setFromProjectionMatrix(te,Hn,G.reversedDepth),We=this.localClippingEnabled,$e=De.init(this.clippingPlanes,We),b=$.get(C,w.length),b.init(),w.push(b),ye.enabled===!0&&ye.isPresenting===!0){const Ne=A.xr.getDepthSensingMesh();Ne!==null&&No(Ne,G,-1/0,A.sortObjects)}No(C,G,0,A.sortObjects),b.finish(),A.sortObjects===!0&&b.sort(Q,we),Se=ye.enabled===!1||ye.isPresenting===!1||ye.hasDepthSensing()===!1,Se&&_e.addToRenderList(b,C),this.info.render.frame++,$e===!0&&De.beginShadows();const W=S.state.shadowsArray;if(ve.render(W,C,G),$e===!0&&De.endShadows(),this.info.autoReset===!0&&this.info.reset(),(H&&T.hasRenderPass())===!1){const Ne=b.opaque,Ae=b.transmissive;if(S.setupLights(),G.isArrayCamera){const Be=G.cameras;if(Ae.length>0)for(let Ge=0,rt=Be.length;Ge<rt;Ge++){const ct=Be[Ge];bl(Ne,Ae,C,ct)}Se&&_e.render(C);for(let Ge=0,rt=Be.length;Ge<rt;Ge++){const ct=Be[Ge];Sl(b,C,ct,ct.viewport)}}else Ae.length>0&&bl(Ne,Ae,C,G),Se&&_e.render(C),Sl(b,C,G)}U!==null&&B===0&&(E.updateMultisampleRenderTarget(U),E.updateRenderTargetMipmap(U)),H&&T.end(A),C.isScene===!0&&C.onAfterRender(A,C,G),xe.resetDefaultState(),O=-1,k=null,M.pop(),M.length>0?(S=M[M.length-1],E.setTextureUnits(S.state.textureUnits),$e===!0&&De.setGlobalState(A.clippingPlanes,S.state.camera)):S=null,w.pop(),w.length>0?b=w[w.length-1]:b=null,I!==null&&I.renderEnd()};function No(C,G,X,H){if(C.visible===!1)return;if(C.layers.test(G.layers)){if(C.isGroup)X=C.renderOrder;else if(C.isLOD)C.autoUpdate===!0&&C.update(G);else if(C.isLightProbeGrid)S.pushLightProbeGrid(C);else if(C.isLight)S.pushLight(C),C.castShadow&&S.pushShadow(C);else if(C.isSprite){if(!C.frustumCulled||Oe.intersectsSprite(C)){H&&ie.setFromMatrixPosition(C.matrixWorld).applyMatrix4(te);const Ne=fe.update(C),Ae=C.material;Ae.visible&&b.push(C,Ne,Ae,X,ie.z,null)}}else if((C.isMesh||C.isLine||C.isPoints)&&(!C.frustumCulled||Oe.intersectsObject(C))){const Ne=fe.update(C),Ae=C.material;if(H&&(C.boundingSphere!==void 0?(C.boundingSphere===null&&C.computeBoundingSphere(),ie.copy(C.boundingSphere.center)):(Ne.boundingSphere===null&&Ne.computeBoundingSphere(),ie.copy(Ne.boundingSphere.center)),ie.applyMatrix4(C.matrixWorld).applyMatrix4(te)),Array.isArray(Ae)){const Be=Ne.groups;for(let Ge=0,rt=Be.length;Ge<rt;Ge++){const ct=Be[Ge],Ve=Ae[ct.materialIndex];Ve&&Ve.visible&&b.push(C,Ne,Ve,X,ie.z,ct)}}else Ae.visible&&b.push(C,Ne,Ae,X,ie.z,null)}}const Ce=C.children;for(let Ne=0,Ae=Ce.length;Ne<Ae;Ne++)No(Ce[Ne],G,X,H)}function Sl(C,G,X,H){const{opaque:W,transmissive:Ce,transparent:Ne}=C;S.setupLightsView(X),$e===!0&&De.setGlobalState(A.clippingPlanes,X),H&&ne.viewport(J.copy(H)),W.length>0&&wr(W,G,X),Ce.length>0&&wr(Ce,G,X),Ne.length>0&&wr(Ne,G,X),ne.buffers.depth.setTest(!0),ne.buffers.depth.setMask(!0),ne.buffers.color.setMask(!0),ne.setPolygonOffset(!1)}function bl(C,G,X,H){if((X.isScene===!0?X.overrideMaterial:null)!==null)return;if(S.state.transmissionRenderTarget[H.id]===void 0){const Ve=ee.has("EXT_color_buffer_half_float")||ee.has("EXT_color_buffer_float");S.state.transmissionRenderTarget[H.id]=new on(1,1,{generateMipmaps:!0,type:Ve?cn:dn,minFilter:Vn,samples:Math.max(4,Pe.samples),stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:ht.workingColorSpace})}const Ce=S.state.transmissionRenderTarget[H.id],Ne=H.viewport||J;Ce.setSize(Ne.z*A.transmissionResolutionScale,Ne.w*A.transmissionResolutionScale);const Ae=A.getRenderTarget(),Be=A.getActiveCubeFace(),Ge=A.getActiveMipmapLevel();A.setRenderTarget(Ce),A.getClearColor(Ee),Ue=A.getClearAlpha(),Ue<1&&A.setClearColor(16777215,.5),A.clear(),Se&&_e.render(X);const rt=A.toneMapping;A.toneMapping=qn;const ct=H.viewport;if(H.viewport!==void 0&&(H.viewport=void 0),S.setupLightsView(H),$e===!0&&De.setGlobalState(A.clippingPlanes,H),wr(C,X,H),E.updateMultisampleRenderTarget(Ce),E.updateRenderTargetMipmap(Ce),ee.has("WEBGL_multisampled_render_to_texture")===!1){let Ve=!1;for(let yt=0,Nt=G.length;yt<Nt;yt++){const Lt=G[yt],{object:Tt,geometry:Kt,material:Ie,group:hn}=Lt;if(Ie.side===St&&Tt.layers.test(H.layers)){const ft=Ie.side;Ie.side=Yt,Ie.needsUpdate=!0,wl(Tt,X,H,Kt,Ie,hn),Ie.side=ft,Ie.needsUpdate=!0,Ve=!0}}Ve===!0&&(E.updateMultisampleRenderTarget(Ce),E.updateRenderTargetMipmap(Ce))}A.setRenderTarget(Ae,Be,Ge),A.setClearColor(Ee,Ue),ct!==void 0&&(H.viewport=ct),A.toneMapping=rt}function wr(C,G,X){const H=G.isScene===!0?G.overrideMaterial:null;for(let W=0,Ce=C.length;W<Ce;W++){const Ne=C[W],{object:Ae,geometry:Be,group:Ge}=Ne;let rt=Ne.material;rt.allowOverride===!0&&H!==null&&(rt=H),Ae.layers.test(X.layers)&&wl(Ae,G,X,Be,rt,Ge)}}function wl(C,G,X,H,W,Ce){C.onBeforeRender(A,G,X,H,W,Ce),C.modelViewMatrix.multiplyMatrices(X.matrixWorldInverse,C.matrixWorld),C.normalMatrix.getNormalMatrix(C.modelViewMatrix),W.onBeforeRender(A,G,X,H,C,Ce),W.transparent===!0&&W.side===St&&W.forceSinglePass===!1?(W.side=Yt,W.needsUpdate=!0,A.renderBufferDirect(X,G,H,W,C,Ce),W.side=ai,W.needsUpdate=!0,A.renderBufferDirect(X,G,H,W,C,Ce),W.side=St):A.renderBufferDirect(X,G,H,W,C,Ce),C.onAfterRender(A,G,X,H,W,Ce)}function Tr(C,G,X){G.isScene!==!0&&(G=be);const H=R.get(C),W=S.state.lights,Ce=S.state.shadowsArray,Ne=W.state.version,Ae=ge.getParameters(C,W.state,Ce,G,X,S.state.lightProbeGridArray),Be=ge.getProgramCacheKey(Ae);let Ge=H.programs;H.environment=C.isMeshStandardMaterial||C.isMeshLambertMaterial||C.isMeshPhongMaterial?G.environment:null,H.fog=G.fog;const rt=C.isMeshStandardMaterial||C.isMeshLambertMaterial&&!C.envMap||C.isMeshPhongMaterial&&!C.envMap;H.envMap=V.get(C.envMap||H.environment,rt),H.envMapRotation=H.environment!==null&&C.envMap===null?G.environmentRotation:C.envMapRotation,Ge===void 0&&(C.addEventListener("dispose",Dt),Ge=new Map,H.programs=Ge);let ct=Ge.get(Be);if(ct!==void 0){if(H.currentProgram===ct&&H.lightsStateVersion===Ne)return El(C,Ae),ct}else Ae.uniforms=ge.getUniforms(C),I!==null&&C.isNodeMaterial&&I.build(C,X,Ae),C.onBeforeCompile(Ae,A),ct=ge.acquireProgram(Ae,Be),Ge.set(Be,ct),H.uniforms=Ae.uniforms;const Ve=H.uniforms;return(!C.isShaderMaterial&&!C.isRawShaderMaterial||C.clipping===!0)&&(Ve.clippingPlanes=De.uniform),El(C,Ae),H.needsLights=Af(C),H.lightsStateVersion=Ne,H.needsLights&&(Ve.ambientLightColor.value=W.state.ambient,Ve.lightProbe.value=W.state.probe,Ve.directionalLights.value=W.state.directional,Ve.directionalLightShadows.value=W.state.directionalShadow,Ve.spotLights.value=W.state.spot,Ve.spotLightShadows.value=W.state.spotShadow,Ve.rectAreaLights.value=W.state.rectArea,Ve.ltc_1.value=W.state.rectAreaLTC1,Ve.ltc_2.value=W.state.rectAreaLTC2,Ve.pointLights.value=W.state.point,Ve.pointLightShadows.value=W.state.pointShadow,Ve.hemisphereLights.value=W.state.hemi,Ve.directionalShadowMatrix.value=W.state.directionalShadowMatrix,Ve.spotLightMatrix.value=W.state.spotLightMatrix,Ve.spotLightMap.value=W.state.spotLightMap,Ve.pointShadowMatrix.value=W.state.pointShadowMatrix),H.lightProbeGrid=S.state.lightProbeGridArray.length>0,H.currentProgram=ct,H.uniformsList=null,ct}function Tl(C){if(C.uniformsList===null){const G=C.currentProgram.getUniforms();C.uniformsList=po.seqWithValue(G.seq,C.uniforms)}return C.uniformsList}function El(C,G){const X=R.get(C);X.outputColorSpace=G.outputColorSpace,X.batching=G.batching,X.batchingColor=G.batchingColor,X.instancing=G.instancing,X.instancingColor=G.instancingColor,X.instancingMorph=G.instancingMorph,X.skinning=G.skinning,X.morphTargets=G.morphTargets,X.morphNormals=G.morphNormals,X.morphColors=G.morphColors,X.morphTargetsCount=G.morphTargetsCount,X.numClippingPlanes=G.numClippingPlanes,X.numIntersection=G.numClipIntersection,X.vertexAlphas=G.vertexAlphas,X.vertexTangents=G.vertexTangents,X.toneMapping=G.toneMapping}function wf(C,G){if(C.length===0)return null;if(C.length===1)return C[0].texture!==null?C[0]:null;y.setFromMatrixPosition(G.matrixWorld);for(let X=0,H=C.length;X<H;X++){const W=C[X];if(W.texture!==null&&W.boundingBox.containsPoint(y))return W}return null}function Tf(C,G,X,H,W){G.isScene!==!0&&(G=be),E.resetTextureUnits();const Ce=G.fog,Ne=H.isMeshStandardMaterial||H.isMeshLambertMaterial||H.isMeshPhongMaterial?G.environment:null,Ae=U===null?A.outputColorSpace:U.isXRRenderTarget===!0?U.texture.colorSpace:ht.workingColorSpace,Be=H.isMeshStandardMaterial||H.isMeshLambertMaterial&&!H.envMap||H.isMeshPhongMaterial&&!H.envMap,Ge=V.get(H.envMap||Ne,Be),rt=H.vertexColors===!0&&!!X.attributes.color&&X.attributes.color.itemSize===4,ct=!!X.attributes.tangent&&(!!H.normalMap||H.anisotropy>0),Ve=!!X.morphAttributes.position,yt=!!X.morphAttributes.normal,Nt=!!X.morphAttributes.color;let Lt=qn;H.toneMapped&&(U===null||U.isXRRenderTarget===!0)&&(Lt=A.toneMapping);const Tt=X.morphAttributes.position||X.morphAttributes.normal||X.morphAttributes.color,Kt=Tt!==void 0?Tt.length:0,Ie=R.get(H),hn=S.state.lights;if($e===!0&&(We===!0||C!==k)){const At=C===k&&H.id===O;De.setState(H,C,At)}let ft=!1;H.version===Ie.__version?(Ie.needsLights&&Ie.lightsStateVersion!==hn.state.version||Ie.outputColorSpace!==Ae||W.isBatchedMesh&&Ie.batching===!1||!W.isBatchedMesh&&Ie.batching===!0||W.isBatchedMesh&&Ie.batchingColor===!0&&W.colorTexture===null||W.isBatchedMesh&&Ie.batchingColor===!1&&W.colorTexture!==null||W.isInstancedMesh&&Ie.instancing===!1||!W.isInstancedMesh&&Ie.instancing===!0||W.isSkinnedMesh&&Ie.skinning===!1||!W.isSkinnedMesh&&Ie.skinning===!0||W.isInstancedMesh&&Ie.instancingColor===!0&&W.instanceColor===null||W.isInstancedMesh&&Ie.instancingColor===!1&&W.instanceColor!==null||W.isInstancedMesh&&Ie.instancingMorph===!0&&W.morphTexture===null||W.isInstancedMesh&&Ie.instancingMorph===!1&&W.morphTexture!==null||Ie.envMap!==Ge||H.fog===!0&&Ie.fog!==Ce||Ie.numClippingPlanes!==void 0&&(Ie.numClippingPlanes!==De.numPlanes||Ie.numIntersection!==De.numIntersection)||Ie.vertexAlphas!==rt||Ie.vertexTangents!==ct||Ie.morphTargets!==Ve||Ie.morphNormals!==yt||Ie.morphColors!==Nt||Ie.toneMapping!==Lt||Ie.morphTargetsCount!==Kt||!!Ie.lightProbeGrid!=S.state.lightProbeGridArray.length>0)&&(ft=!0):(ft=!0,Ie.__version=H.version);let gn=Ie.currentProgram;ft===!0&&(gn=Tr(H,G,W),I&&H.isNodeMaterial&&I.onUpdateProgram(H,gn,Ie));let Un=!1,ui=!1,Xi=!1;const Et=gn.getUniforms(),Ut=Ie.uniforms;if(ne.useProgram(gn.program)&&(Un=!0,ui=!0,Xi=!0),H.id!==O&&(O=H.id,ui=!0),Ie.needsLights){const At=wf(S.state.lightProbeGridArray,W);Ie.lightProbeGrid!==At&&(Ie.lightProbeGrid=At,ui=!0)}if(Un||k!==C){ne.buffers.depth.getReversed()&&C.reversedDepth!==!0&&(C._reversedDepth=!0,C.updateProjectionMatrix()),Et.setValue(D,"projectionMatrix",C.projectionMatrix),Et.setValue(D,"viewMatrix",C.matrixWorldInverse);const di=Et.map.cameraPosition;di!==void 0&&di.setValue(D,ue.setFromMatrixPosition(C.matrixWorld)),Pe.logarithmicDepthBuffer&&Et.setValue(D,"logDepthBufFC",2/(Math.log(C.far+1)/Math.LN2)),(H.isMeshPhongMaterial||H.isMeshToonMaterial||H.isMeshLambertMaterial||H.isMeshBasicMaterial||H.isMeshStandardMaterial||H.isShaderMaterial)&&Et.setValue(D,"isOrthographic",C.isOrthographicCamera===!0),k!==C&&(k=C,ui=!0,Xi=!0)}if(Ie.needsLights&&(hn.state.directionalShadowMap.length>0&&Et.setValue(D,"directionalShadowMap",hn.state.directionalShadowMap,E),hn.state.spotShadowMap.length>0&&Et.setValue(D,"spotShadowMap",hn.state.spotShadowMap,E),hn.state.pointShadowMap.length>0&&Et.setValue(D,"pointShadowMap",hn.state.pointShadowMap,E)),W.isSkinnedMesh){Et.setOptional(D,W,"bindMatrix"),Et.setOptional(D,W,"bindMatrixInverse");const At=W.skeleton;At&&(At.boneTexture===null&&At.computeBoneTexture(),Et.setValue(D,"boneTexture",At.boneTexture,E))}W.isBatchedMesh&&(Et.setOptional(D,W,"batchingTexture"),Et.setValue(D,"batchingTexture",W._matricesTexture,E),Et.setOptional(D,W,"batchingIdTexture"),Et.setValue(D,"batchingIdTexture",W._indirectTexture,E),Et.setOptional(D,W,"batchingColorTexture"),W._colorsTexture!==null&&Et.setValue(D,"batchingColorTexture",W._colorsTexture,E));const fi=X.morphAttributes;if((fi.position!==void 0||fi.normal!==void 0||fi.color!==void 0)&&tt.update(W,X,gn),(ui||Ie.receiveShadow!==W.receiveShadow)&&(Ie.receiveShadow=W.receiveShadow,Et.setValue(D,"receiveShadow",W.receiveShadow)),(H.isMeshStandardMaterial||H.isMeshLambertMaterial||H.isMeshPhongMaterial)&&H.envMap===null&&G.environment!==null&&(Ut.envMapIntensity.value=G.environmentIntensity),Ut.dfgLUT!==void 0&&(Ut.dfgLUT.value=C1()),ui){if(Et.setValue(D,"toneMappingExposure",A.toneMappingExposure),Ie.needsLights&&Ef(Ut,Xi),Ce&&H.fog===!0&&q.refreshFogUniforms(Ut,Ce),q.refreshMaterialUniforms(Ut,H,Ye,nt,S.state.transmissionRenderTarget[C.id]),Ie.needsLights&&Ie.lightProbeGrid){const At=Ie.lightProbeGrid;Ut.probesSH.value=At.texture,Ut.probesMin.value.copy(At.boundingBox.min),Ut.probesMax.value.copy(At.boundingBox.max),Ut.probesResolution.value.copy(At.resolution)}po.upload(D,Tl(Ie),Ut,E)}if(H.isShaderMaterial&&H.uniformsNeedUpdate===!0&&(po.upload(D,Tl(Ie),Ut,E),H.uniformsNeedUpdate=!1),H.isSpriteMaterial&&Et.setValue(D,"center",W.center),Et.setValue(D,"modelViewMatrix",W.modelViewMatrix),Et.setValue(D,"normalMatrix",W.normalMatrix),Et.setValue(D,"modelMatrix",W.matrixWorld),H.uniformsGroups!==void 0){const At=H.uniformsGroups;for(let di=0,qi=At.length;di<qi;di++){const Al=At[di];j.update(Al,gn),j.bind(Al,gn)}}return gn}function Ef(C,G){C.ambientLightColor.needsUpdate=G,C.lightProbe.needsUpdate=G,C.directionalLights.needsUpdate=G,C.directionalLightShadows.needsUpdate=G,C.pointLights.needsUpdate=G,C.pointLightShadows.needsUpdate=G,C.spotLights.needsUpdate=G,C.spotLightShadows.needsUpdate=G,C.rectAreaLights.needsUpdate=G,C.hemisphereLights.needsUpdate=G}function Af(C){return C.isMeshLambertMaterial||C.isMeshToonMaterial||C.isMeshPhongMaterial||C.isMeshStandardMaterial||C.isShadowMaterial||C.isShaderMaterial&&C.lights===!0}this.getActiveCubeFace=function(){return N},this.getActiveMipmapLevel=function(){return B},this.getRenderTarget=function(){return U},this.setRenderTargetTextures=function(C,G,X){const H=R.get(C);H.__autoAllocateDepthBuffer=C.resolveDepthBuffer===!1,H.__autoAllocateDepthBuffer===!1&&(H.__useRenderToTexture=!1),R.get(C.texture).__webglTexture=G,R.get(C.depthTexture).__webglTexture=H.__autoAllocateDepthBuffer?void 0:X,H.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(C,G){const X=R.get(C);X.__webglFramebuffer=G,X.__useDefaultFramebuffer=G===void 0};const Cf=D.createFramebuffer();this.setRenderTarget=function(C,G=0,X=0){U=C,N=G,B=X;let H=null,W=!1,Ce=!1;if(C){const Ae=R.get(C);if(Ae.__useDefaultFramebuffer!==void 0){ne.bindFramebuffer(D.FRAMEBUFFER,Ae.__webglFramebuffer),J.copy(C.viewport),ae.copy(C.scissor),pe=C.scissorTest,ne.viewport(J),ne.scissor(ae),ne.setScissorTest(pe),O=-1;return}else if(Ae.__webglFramebuffer===void 0)E.setupRenderTarget(C);else if(Ae.__hasExternalTextures)E.rebindTextures(C,R.get(C.texture).__webglTexture,R.get(C.depthTexture).__webglTexture);else if(C.depthBuffer){const rt=C.depthTexture;if(Ae.__boundDepthTexture!==rt){if(rt!==null&&R.has(rt)&&(C.width!==rt.image.width||C.height!==rt.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");E.setupDepthRenderbuffer(C)}}const Be=C.texture;(Be.isData3DTexture||Be.isDataArrayTexture||Be.isCompressedArrayTexture)&&(Ce=!0);const Ge=R.get(C).__webglFramebuffer;C.isWebGLCubeRenderTarget?(Array.isArray(Ge[G])?H=Ge[G][X]:H=Ge[G],W=!0):C.samples>0&&E.useMultisampledRTT(C)===!1?H=R.get(C).__webglMultisampledFramebuffer:Array.isArray(Ge)?H=Ge[X]:H=Ge,J.copy(C.viewport),ae.copy(C.scissor),pe=C.scissorTest}else J.copy(me).multiplyScalar(Ye).floor(),ae.copy(Fe).multiplyScalar(Ye).floor(),pe=qe;if(X!==0&&(H=Cf),ne.bindFramebuffer(D.FRAMEBUFFER,H)&&ne.drawBuffers(C,H),ne.viewport(J),ne.scissor(ae),ne.setScissorTest(pe),W){const Ae=R.get(C.texture);D.framebufferTexture2D(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_CUBE_MAP_POSITIVE_X+G,Ae.__webglTexture,X)}else if(Ce){const Ae=G;for(let Be=0;Be<C.textures.length;Be++){const Ge=R.get(C.textures[Be]);D.framebufferTextureLayer(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0+Be,Ge.__webglTexture,X,Ae)}}else if(C!==null&&X!==0){const Ae=R.get(C.texture);D.framebufferTexture2D(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_2D,Ae.__webglTexture,X)}O=-1},this.readRenderTargetPixels=function(C,G,X,H,W,Ce,Ne,Ae=0){if(!(C&&C.isWebGLRenderTarget)){Xe("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Be=R.get(C).__webglFramebuffer;if(C.isWebGLCubeRenderTarget&&Ne!==void 0&&(Be=Be[Ne]),Be){ne.bindFramebuffer(D.FRAMEBUFFER,Be);try{const Ge=C.textures[Ae],rt=Ge.format,ct=Ge.type;if(C.textures.length>1&&D.readBuffer(D.COLOR_ATTACHMENT0+Ae),!Pe.textureFormatReadable(rt)){Xe("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Pe.textureTypeReadable(ct)){Xe("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}G>=0&&G<=C.width-H&&X>=0&&X<=C.height-W&&D.readPixels(G,X,H,W,F.convert(rt),F.convert(ct),Ce)}finally{const Ge=U!==null?R.get(U).__webglFramebuffer:null;ne.bindFramebuffer(D.FRAMEBUFFER,Ge)}}},this.readRenderTargetPixelsAsync=async function(C,G,X,H,W,Ce,Ne,Ae=0){if(!(C&&C.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Be=R.get(C).__webglFramebuffer;if(C.isWebGLCubeRenderTarget&&Ne!==void 0&&(Be=Be[Ne]),Be)if(G>=0&&G<=C.width-H&&X>=0&&X<=C.height-W){ne.bindFramebuffer(D.FRAMEBUFFER,Be);const Ge=C.textures[Ae],rt=Ge.format,ct=Ge.type;if(C.textures.length>1&&D.readBuffer(D.COLOR_ATTACHMENT0+Ae),!Pe.textureFormatReadable(rt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Pe.textureTypeReadable(ct))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Ve=D.createBuffer();D.bindBuffer(D.PIXEL_PACK_BUFFER,Ve),D.bufferData(D.PIXEL_PACK_BUFFER,Ce.byteLength,D.STREAM_READ),D.readPixels(G,X,H,W,F.convert(rt),F.convert(ct),0);const yt=U!==null?R.get(U).__webglFramebuffer:null;ne.bindFramebuffer(D.FRAMEBUFFER,yt);const Nt=D.fenceSync(D.SYNC_GPU_COMMANDS_COMPLETE,0);return D.flush(),await bd(D,Nt,4),D.bindBuffer(D.PIXEL_PACK_BUFFER,Ve),D.getBufferSubData(D.PIXEL_PACK_BUFFER,0,Ce),D.deleteBuffer(Ve),D.deleteSync(Nt),Ce}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(C,G=null,X=0){const H=Math.pow(2,-X),W=Math.floor(C.image.width*H),Ce=Math.floor(C.image.height*H),Ne=G!==null?G.x:0,Ae=G!==null?G.y:0;E.setTexture2D(C,0),D.copyTexSubImage2D(D.TEXTURE_2D,X,0,0,Ne,Ae,W,Ce),ne.unbindTexture()};const Rf=D.createFramebuffer(),Pf=D.createFramebuffer();this.copyTextureToTexture=function(C,G,X=null,H=null,W=0,Ce=0){let Ne,Ae,Be,Ge,rt,ct,Ve,yt,Nt;const Lt=C.isCompressedTexture?C.mipmaps[Ce]:C.image;if(X!==null)Ne=X.max.x-X.min.x,Ae=X.max.y-X.min.y,Be=X.isBox3?X.max.z-X.min.z:1,Ge=X.min.x,rt=X.min.y,ct=X.isBox3?X.min.z:0;else{const Ut=Math.pow(2,-W);Ne=Math.floor(Lt.width*Ut),Ae=Math.floor(Lt.height*Ut),C.isDataArrayTexture?Be=Lt.depth:C.isData3DTexture?Be=Math.floor(Lt.depth*Ut):Be=1,Ge=0,rt=0,ct=0}H!==null?(Ve=H.x,yt=H.y,Nt=H.z):(Ve=0,yt=0,Nt=0);const Tt=F.convert(G.format),Kt=F.convert(G.type);let Ie;G.isData3DTexture?(E.setTexture3D(G,0),Ie=D.TEXTURE_3D):G.isDataArrayTexture||G.isCompressedArrayTexture?(E.setTexture2DArray(G,0),Ie=D.TEXTURE_2D_ARRAY):(E.setTexture2D(G,0),Ie=D.TEXTURE_2D),ne.activeTexture(D.TEXTURE0),ne.pixelStorei(D.UNPACK_FLIP_Y_WEBGL,G.flipY),ne.pixelStorei(D.UNPACK_PREMULTIPLY_ALPHA_WEBGL,G.premultiplyAlpha),ne.pixelStorei(D.UNPACK_ALIGNMENT,G.unpackAlignment);const hn=ne.getParameter(D.UNPACK_ROW_LENGTH),ft=ne.getParameter(D.UNPACK_IMAGE_HEIGHT),gn=ne.getParameter(D.UNPACK_SKIP_PIXELS),Un=ne.getParameter(D.UNPACK_SKIP_ROWS),ui=ne.getParameter(D.UNPACK_SKIP_IMAGES);ne.pixelStorei(D.UNPACK_ROW_LENGTH,Lt.width),ne.pixelStorei(D.UNPACK_IMAGE_HEIGHT,Lt.height),ne.pixelStorei(D.UNPACK_SKIP_PIXELS,Ge),ne.pixelStorei(D.UNPACK_SKIP_ROWS,rt),ne.pixelStorei(D.UNPACK_SKIP_IMAGES,ct);const Xi=C.isDataArrayTexture||C.isData3DTexture,Et=G.isDataArrayTexture||G.isData3DTexture;if(C.isDepthTexture){const Ut=R.get(C),fi=R.get(G),At=R.get(Ut.__renderTarget),di=R.get(fi.__renderTarget);ne.bindFramebuffer(D.READ_FRAMEBUFFER,At.__webglFramebuffer),ne.bindFramebuffer(D.DRAW_FRAMEBUFFER,di.__webglFramebuffer);for(let qi=0;qi<Be;qi++)Xi&&(D.framebufferTextureLayer(D.READ_FRAMEBUFFER,D.COLOR_ATTACHMENT0,R.get(C).__webglTexture,W,ct+qi),D.framebufferTextureLayer(D.DRAW_FRAMEBUFFER,D.COLOR_ATTACHMENT0,R.get(G).__webglTexture,Ce,Nt+qi)),D.blitFramebuffer(Ge,rt,Ne,Ae,Ve,yt,Ne,Ae,D.DEPTH_BUFFER_BIT,D.NEAREST);ne.bindFramebuffer(D.READ_FRAMEBUFFER,null),ne.bindFramebuffer(D.DRAW_FRAMEBUFFER,null)}else if(W!==0||C.isRenderTargetTexture||R.has(C)){const Ut=R.get(C),fi=R.get(G);ne.bindFramebuffer(D.READ_FRAMEBUFFER,Rf),ne.bindFramebuffer(D.DRAW_FRAMEBUFFER,Pf);for(let At=0;At<Be;At++)Xi?D.framebufferTextureLayer(D.READ_FRAMEBUFFER,D.COLOR_ATTACHMENT0,Ut.__webglTexture,W,ct+At):D.framebufferTexture2D(D.READ_FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_2D,Ut.__webglTexture,W),Et?D.framebufferTextureLayer(D.DRAW_FRAMEBUFFER,D.COLOR_ATTACHMENT0,fi.__webglTexture,Ce,Nt+At):D.framebufferTexture2D(D.DRAW_FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_2D,fi.__webglTexture,Ce),W!==0?D.blitFramebuffer(Ge,rt,Ne,Ae,Ve,yt,Ne,Ae,D.COLOR_BUFFER_BIT,D.NEAREST):Et?D.copyTexSubImage3D(Ie,Ce,Ve,yt,Nt+At,Ge,rt,Ne,Ae):D.copyTexSubImage2D(Ie,Ce,Ve,yt,Ge,rt,Ne,Ae);ne.bindFramebuffer(D.READ_FRAMEBUFFER,null),ne.bindFramebuffer(D.DRAW_FRAMEBUFFER,null)}else Et?C.isDataTexture||C.isData3DTexture?D.texSubImage3D(Ie,Ce,Ve,yt,Nt,Ne,Ae,Be,Tt,Kt,Lt.data):G.isCompressedArrayTexture?D.compressedTexSubImage3D(Ie,Ce,Ve,yt,Nt,Ne,Ae,Be,Tt,Lt.data):D.texSubImage3D(Ie,Ce,Ve,yt,Nt,Ne,Ae,Be,Tt,Kt,Lt):C.isDataTexture?D.texSubImage2D(D.TEXTURE_2D,Ce,Ve,yt,Ne,Ae,Tt,Kt,Lt.data):C.isCompressedTexture?D.compressedTexSubImage2D(D.TEXTURE_2D,Ce,Ve,yt,Lt.width,Lt.height,Tt,Lt.data):D.texSubImage2D(D.TEXTURE_2D,Ce,Ve,yt,Ne,Ae,Tt,Kt,Lt);ne.pixelStorei(D.UNPACK_ROW_LENGTH,hn),ne.pixelStorei(D.UNPACK_IMAGE_HEIGHT,ft),ne.pixelStorei(D.UNPACK_SKIP_PIXELS,gn),ne.pixelStorei(D.UNPACK_SKIP_ROWS,Un),ne.pixelStorei(D.UNPACK_SKIP_IMAGES,ui),Ce===0&&G.generateMipmaps&&D.generateMipmap(Ie),ne.unbindTexture()},this.initRenderTarget=function(C){R.get(C).__webglFramebuffer===void 0&&E.setupRenderTarget(C)},this.initTexture=function(C){C.isCubeTexture?E.setTextureCube(C,0):C.isData3DTexture?E.setTexture3D(C,0):C.isDataArrayTexture||C.isCompressedArrayTexture?E.setTexture2DArray(C,0):E.setTexture2D(C,0),ne.unbindTexture()},this.resetState=function(){N=0,B=0,U=null,ne.reset(),xe.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Hn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=ht._getDrawingBufferColorSpace(e),t.unpackColorSpace=ht._getUnpackColorSpace()}}class P1{constructor(){this._previousTime=0,this._currentTime=0,this._startTime=performance.now(),this._delta=0,this._elapsed=0,this._timescale=1,this._document=null,this._pageVisibilityHandler=null}connect(e){this._document=e,e.hidden!==void 0&&(this._pageVisibilityHandler=L1.bind(this),e.addEventListener("visibilitychange",this._pageVisibilityHandler,!1))}disconnect(){this._pageVisibilityHandler!==null&&(this._document.removeEventListener("visibilitychange",this._pageVisibilityHandler),this._pageVisibilityHandler=null),this._document=null}getDelta(){return this._delta/1e3}getElapsed(){return this._elapsed/1e3}getTimescale(){return this._timescale}setTimescale(e){return this._timescale=e,this}reset(){return this._currentTime=performance.now()-this._startTime,this}dispose(){this.disconnect()}update(e){return this._pageVisibilityHandler!==null&&this._document.hidden===!0?this._delta=0:(this._previousTime=this._currentTime,this._currentTime=(e!==void 0?e:performance.now())-this._startTime,this._delta=(this._currentTime-this._previousTime)*this._timescale,this._elapsed+=this._delta),this}}function L1(){this._document.hidden===!1&&this.reset()}const mo={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

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


		}`};class Us{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}}const I1=new Sr(-1,1,1,-1,0,1);class D1 extends wt{constructor(){super(),this.setAttribute("position",new Je([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new Je([0,2,0,0,2,0],2))}}const N1=new D1;class pl{constructor(e){this._mesh=new z(N1,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,I1)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}}class U1 extends Us{constructor(e,t="tDiffuse"){super(),this.textureID=t,this.uniforms=null,this.material=null,e instanceof Gt?(this.uniforms=e.uniforms,this.material=e):e&&(this.uniforms=Ts.clone(e.uniforms),this.material=new Gt({name:e.name!==void 0?e.name:"unspecified",defines:Object.assign({},e.defines),uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader})),this._fsQuad=new pl(this.material)}render(e,t,n){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=n.texture),this._fsQuad.material=this.material,this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}}class eu extends Us{constructor(e,t){super(),this.scene=e,this.camera=t,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(e,t,n){const i=e.getContext(),s=e.state;s.buffers.color.setMask(!1),s.buffers.depth.setMask(!1),s.buffers.color.setLocked(!0),s.buffers.depth.setLocked(!0);let o,c;this.inverse?(o=0,c=1):(o=1,c=0),s.buffers.stencil.setTest(!0),s.buffers.stencil.setOp(i.REPLACE,i.REPLACE,i.REPLACE),s.buffers.stencil.setFunc(i.ALWAYS,o,4294967295),s.buffers.stencil.setClear(c),s.buffers.stencil.setLocked(!0),e.setRenderTarget(n),this.clear&&e.clear(),e.render(this.scene,this.camera),e.setRenderTarget(t),this.clear&&e.clear(),e.render(this.scene,this.camera),s.buffers.color.setLocked(!1),s.buffers.depth.setLocked(!1),s.buffers.color.setMask(!0),s.buffers.depth.setMask(!0),s.buffers.stencil.setLocked(!1),s.buffers.stencil.setFunc(i.EQUAL,1,4294967295),s.buffers.stencil.setOp(i.KEEP,i.KEEP,i.KEEP),s.buffers.stencil.setLocked(!0)}}class F1 extends Us{constructor(){super(),this.needsSwap=!1}render(e){e.state.buffers.stencil.setLocked(!1),e.state.buffers.stencil.setTest(!1)}}class O1{constructor(e,t){if(this.renderer=e,this._pixelRatio=e.getPixelRatio(),t===void 0){const n=e.getSize(new re);this._width=n.width,this._height=n.height,t=new on(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:cn}),t.texture.name="EffectComposer.rt1"}else this._width=t.width,this._height=t.height;this.renderTarget1=t,this.renderTarget2=t.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new U1(mo),this.copyPass.material.blending=Xn,this.timer=new x0}swapBuffers(){const e=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=e}addPass(e){this.passes.push(e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(e,t){this.passes.splice(t,0,e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(e){const t=this.passes.indexOf(e);t!==-1&&this.passes.splice(t,1)}isLastEnabledPass(e){for(let t=e+1;t<this.passes.length;t++)if(this.passes[t].enabled)return!1;return!0}render(e){this.timer.update(),e===void 0&&(e=this.timer.getDelta());const t=this.renderer.getRenderTarget();let n=!1;for(let i=0,s=this.passes.length;i<s;i++){const o=this.passes[i];if(o.enabled!==!1){if(o.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(i),o.render(this.renderer,this.writeBuffer,this.readBuffer,e,n),o.needsSwap){if(n){const c=this.renderer.getContext(),l=this.renderer.state.buffers.stencil;l.setFunc(c.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,e),l.setFunc(c.EQUAL,1,4294967295)}this.swapBuffers()}eu!==void 0&&(o instanceof eu?n=!0:o instanceof F1&&(n=!1))}}this.renderer.setRenderTarget(t)}reset(e){if(e===void 0){const t=this.renderer.getSize(new re);this._pixelRatio=this.renderer.getPixelRatio(),this._width=t.width,this._height=t.height,e=this.renderTarget1.clone(),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=e,this.renderTarget2=e.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(e,t){this._width=e,this._height=t;const n=this._width*this._pixelRatio,i=this._height*this._pixelRatio;this.renderTarget1.setSize(n,i),this.renderTarget2.setSize(n,i);for(let s=0;s<this.passes.length;s++)this.passes[s].setSize(n,i)}setPixelRatio(e){this._pixelRatio=e,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}}class B1 extends Us{constructor(e,t,n=null,i=null,s=null){super(),this.scene=e,this.camera=t,this.overrideMaterial=n,this.clearColor=i,this.clearAlpha=s,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this.isRenderPass=!0,this._oldClearColor=new ce}render(e,t,n){const i=e.autoClear;e.autoClear=!1;let s,o;this.overrideMaterial!==null&&(o=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(e.getClearColor(this._oldClearColor),e.setClearColor(this.clearColor,e.getClearAlpha())),this.clearAlpha!==null&&(s=e.getClearAlpha(),e.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&e.clearDepth(),e.setRenderTarget(this.renderToScreen?null:n),this.clear===!0&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),e.render(this.scene,this.camera),this.clearColor!==null&&e.setClearColor(this._oldClearColor),this.clearAlpha!==null&&e.setClearAlpha(s),this.overrideMaterial!==null&&(this.scene.overrideMaterial=o),e.autoClear=i}}const z1={uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new ce(0)},defaultOpacity:{value:0}},vertexShader:`

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

		}`};class Rs extends Us{constructor(e,t=1,n,i){super(),this.strength=t,this.radius=n,this.threshold=i,this.resolution=e!==void 0?new re(e.x,e.y):new re(256,256),this.clearColor=new ce(0,0,0),this.needsSwap=!1,this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let s=Math.round(this.resolution.x/2),o=Math.round(this.resolution.y/2);this.renderTargetBright=new on(s,o,{type:cn}),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let h=0;h<this.nMips;h++){const u=new on(s,o,{type:cn});u.texture.name="UnrealBloomPass.h"+h,u.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(u);const f=new on(s,o,{type:cn});f.texture.name="UnrealBloomPass.v"+h,f.texture.generateMipmaps=!1,this.renderTargetsVertical.push(f),s=Math.round(s/2),o=Math.round(o/2)}const c=z1;this.highPassUniforms=Ts.clone(c.uniforms),this.highPassUniforms.luminosityThreshold.value=i,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new Gt({uniforms:this.highPassUniforms,vertexShader:c.vertexShader,fragmentShader:c.fragmentShader}),this.separableBlurMaterials=[];const l=[6,10,14,18,22];s=Math.round(this.resolution.x/2),o=Math.round(this.resolution.y/2);for(let h=0;h<this.nMips;h++)this.separableBlurMaterials.push(this._getSeparableBlurMaterial(l[h])),this.separableBlurMaterials[h].uniforms.invSize.value=new re(1/s,1/o),s=Math.round(s/2),o=Math.round(o/2);this.compositeMaterial=this._getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=t,this.compositeMaterial.uniforms.bloomRadius.value=.1;const a=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=a,this.bloomTintColors=[new P(1,1,1),new P(1,1,1),new P(1,1,1),new P(1,1,1),new P(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,this.copyUniforms=Ts.clone(mo.uniforms),this.blendMaterial=new Gt({uniforms:this.copyUniforms,vertexShader:mo.vertexShader,fragmentShader:mo.fragmentShader,premultipliedAlpha:!0,blending:cr,depthTest:!1,depthWrite:!1,transparent:!0}),this._oldClearColor=new ce,this._oldClearAlpha=1,this._basic=new Ct,this._fsQuad=new pl(null)}dispose(){for(let e=0;e<this.renderTargetsHorizontal.length;e++)this.renderTargetsHorizontal[e].dispose();for(let e=0;e<this.renderTargetsVertical.length;e++)this.renderTargetsVertical[e].dispose();this.renderTargetBright.dispose();for(let e=0;e<this.separableBlurMaterials.length;e++)this.separableBlurMaterials[e].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this._basic.dispose(),this._fsQuad.dispose()}setSize(e,t){let n=Math.round(e/2),i=Math.round(t/2);this.renderTargetBright.setSize(n,i);for(let s=0;s<this.nMips;s++)this.renderTargetsHorizontal[s].setSize(n,i),this.renderTargetsVertical[s].setSize(n,i),this.separableBlurMaterials[s].uniforms.invSize.value=new re(1/n,1/i),n=Math.round(n/2),i=Math.round(i/2)}render(e,t,n,i,s){e.getClearColor(this._oldClearColor),this._oldClearAlpha=e.getClearAlpha();const o=e.autoClear;e.autoClear=!1,e.setClearColor(this.clearColor,0),s&&e.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this._fsQuad.material=this._basic,this._basic.map=n.texture,e.setRenderTarget(null),e.clear(),this._fsQuad.render(e)),this.highPassUniforms.tDiffuse.value=n.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this._fsQuad.material=this.materialHighPassFilter,e.setRenderTarget(this.renderTargetBright),e.clear(),this._fsQuad.render(e);let c=this.renderTargetBright;for(let l=0;l<this.nMips;l++)this._fsQuad.material=this.separableBlurMaterials[l],this.separableBlurMaterials[l].uniforms.colorTexture.value=c.texture,this.separableBlurMaterials[l].uniforms.direction.value=Rs.BlurDirectionX,e.setRenderTarget(this.renderTargetsHorizontal[l]),e.clear(),this._fsQuad.render(e),this.separableBlurMaterials[l].uniforms.colorTexture.value=this.renderTargetsHorizontal[l].texture,this.separableBlurMaterials[l].uniforms.direction.value=Rs.BlurDirectionY,e.setRenderTarget(this.renderTargetsVertical[l]),e.clear(),this._fsQuad.render(e),c=this.renderTargetsVertical[l];this._fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,e.setRenderTarget(this.renderTargetsHorizontal[0]),e.clear(),this._fsQuad.render(e),this._fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,s&&e.state.buffers.stencil.setTest(!0),this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(n),this._fsQuad.render(e)),e.setClearColor(this._oldClearColor,this._oldClearAlpha),e.autoClear=o}_getSeparableBlurMaterial(e){const t=[],n=e/3;for(let i=0;i<e;i++)t.push(.39894*Math.exp(-.5*i*i/(n*n))/n);return new Gt({defines:{KERNEL_RADIUS:e},uniforms:{colorTexture:{value:null},invSize:{value:new re(.5,.5)},direction:{value:new re(.5,.5)},gaussianCoefficients:{value:t}},vertexShader:`

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

				}`})}_getCompositeMaterial(e){return new Gt({defines:{NUM_MIPS:e},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`

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

				}`})}}Rs.BlurDirectionX=new re(1,0);Rs.BlurDirectionY=new re(0,1);const oo={name:"OutputShader",uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
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

		}`};class k1 extends Us{constructor(){super(),this.isOutputPass=!0,this.uniforms=Ts.clone(oo.uniforms),this.material=new Ju({name:oo.name,uniforms:this.uniforms,vertexShader:oo.vertexShader,fragmentShader:oo.fragmentShader}),this._fsQuad=new pl(this.material),this._outputColorSpace=null,this._toneMapping=null}render(e,t,n){this.uniforms.tDiffuse.value=n.texture,this.uniforms.toneMappingExposure.value=e.toneMappingExposure,(this._outputColorSpace!==e.outputColorSpace||this._toneMapping!==e.toneMapping)&&(this._outputColorSpace=e.outputColorSpace,this._toneMapping=e.toneMapping,this.material.defines={},ht.getTransfer(this._outputColorSpace)===mt&&(this.material.defines.SRGB_TRANSFER=""),this._toneMapping===Fc?this.material.defines.LINEAR_TONE_MAPPING="":this._toneMapping===Oc?this.material.defines.REINHARD_TONE_MAPPING="":this._toneMapping===Bc?this.material.defines.CINEON_TONE_MAPPING="":this._toneMapping===Ao?this.material.defines.ACES_FILMIC_TONE_MAPPING="":this._toneMapping===kc?this.material.defines.AGX_TONE_MAPPING="":this._toneMapping===Gc?this.material.defines.NEUTRAL_TONE_MAPPING="":this._toneMapping===zc&&(this.material.defines.CUSTOM_TONE_MAPPING=""),this.material.needsUpdate=!0),this.renderToScreen===!0?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}}class Lo extends z{constructor(e,t={}){super(e),this.isReflector=!0,this.type="Reflector",this.forceUpdate=!1,this._reflectionCameras=new WeakMap;const n=this,i=t.color!==void 0?new ce(t.color):new ce(8355711),s=t.textureWidth||512,o=t.textureHeight||512,c=t.clipBias||0,l=t.shader||Lo.ReflectorShader,a=t.multisample!==void 0?t.multisample:4,h=new Si,u=new P,f=new P,_=new P,d=new Qe,g=new P(0,0,-1),p=new xt,m=new P,x=new P,v=new xt,y=new Qe,b=new on(s,o,{samples:a,type:cn}),S=new Gt({name:l.name!==void 0?l.name:"unspecified",uniforms:Ts.clone(l.uniforms),fragmentShader:l.fragmentShader,vertexShader:l.vertexShader});S.uniforms.tDiffuse.value=b.texture,S.uniforms.color.value=i,S.uniforms.textureMatrix.value=y,this.material=S,this.onBeforeRender=function(w,M,T){const A=this._getReflectionCamera(T);if(f.setFromMatrixPosition(n.matrixWorld),_.setFromMatrixPosition(T.matrixWorld),d.extractRotation(n.matrixWorld),u.set(0,0,1),u.applyMatrix4(d),m.subVectors(f,_),m.dot(u)>0===!0&&this.forceUpdate===!1)return;m.reflect(u).negate(),m.add(f),d.extractRotation(T.matrixWorld),g.set(0,0,-1),g.applyMatrix4(d),g.add(_),x.subVectors(f,g),x.reflect(u).negate(),x.add(f),A.position.copy(m),A.up.set(0,1,0),A.up.applyMatrix4(d),A.up.reflect(u),A.lookAt(x),A.far=T.far,A.updateMatrixWorld(),A.projectionMatrix.copy(T.projectionMatrix),y.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),y.multiply(A.projectionMatrix),y.multiply(A.matrixWorldInverse),y.multiply(n.matrixWorld),h.setFromNormalAndCoplanarPoint(u,f),h.applyMatrix4(A.matrixWorldInverse),p.set(h.normal.x,h.normal.y,h.normal.z,h.constant);const I=A.projectionMatrix;A.isOrthographicCamera?(v.x=(Math.sign(p.x)+I.elements[8])/I.elements[0],v.y=(Math.sign(p.y)+I.elements[9])/I.elements[5],v.z=-T.far,v.w=1):(v.x=(Math.sign(p.x)+I.elements[8])/I.elements[0],v.y=(Math.sign(p.y)+I.elements[9])/I.elements[5],v.z=-1,v.w=(1+I.elements[10])/I.elements[14]),p.multiplyScalar(2/p.dot(v)),I.elements[2]=p.x,I.elements[6]=p.y,A.isOrthographicCamera?(I.elements[10]=p.z-c,I.elements[14]=p.w-1):(I.elements[10]=p.z+1-c,I.elements[14]=p.w),n.visible=!1;const N=w.getRenderTarget(),B=w.xr.enabled,U=w.shadowMap.autoUpdate;w.xr.enabled=!1,w.shadowMap.autoUpdate=!1,w.setRenderTarget(b),w.state.buffers.depth.setMask(!0),w.autoClear===!1&&w.clear(),w.render(M,A),w.xr.enabled=B,w.shadowMap.autoUpdate=U,w.setRenderTarget(N);const O=T.viewport;O!==void 0&&w.state.viewport(O),n.visible=!0,this.forceUpdate=!1},this.getRenderTarget=function(){return b},this.dispose=function(){b.dispose(),n.material.dispose()},this._getReflectionCamera=function(w){let M=this._reflectionCameras.get(w);return M===void 0&&(M=w.clone(),this._reflectionCameras.set(w,M)),M}}}Lo.ReflectorShader={name:"ReflectorShader",uniforms:{color:{value:null},tDiffuse:{value:null},textureMatrix:{value:null}},vertexShader:`
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

		}`};function tu(r,e){if(e===ud)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),r;if(e===gc||e===Au){let t=r.getIndex();if(t===null){const o=[],c=r.getAttribute("position");if(c!==void 0){for(let l=0;l<c.count;l++)o.push(l);r.setIndex(o),t=r.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),r}const n=t.count-2,i=[];if(e===gc)for(let o=1;o<=n;o++)i.push(t.getX(0)),i.push(t.getX(o)),i.push(t.getX(o+1));else for(let o=0;o<n;o++)o%2===0?(i.push(t.getX(o)),i.push(t.getX(o+1)),i.push(t.getX(o+2))):(i.push(t.getX(o+2)),i.push(t.getX(o+1)),i.push(t.getX(o)));i.length/3!==n&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");const s=r.clone();return s.setIndex(i),s.clearGroups(),s}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",e),r}function G1(r){const e=new Map,t=new Map,n=r.clone();return uf(r,n,function(i,s){e.set(s,i),t.set(i,s)}),n.traverse(function(i){if(!i.isSkinnedMesh)return;const s=i,o=e.get(i),c=o.skeleton.bones;s.skeleton=o.skeleton.clone(),s.bindMatrix.copy(o.bindMatrix),s.skeleton.bones=c.map(function(l){return t.get(l)}),s.bind(s.skeleton,s.bindMatrix)}),n}function uf(r,e,t){t(r,e);for(let n=0;n<r.children.length;n++)uf(r.children[n],e.children[n],t)}class V1 extends Ds{constructor(e){super(e),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(t){return new Y1(t)}),this.register(function(t){return new K1(t)}),this.register(function(t){return new ix(t)}),this.register(function(t){return new sx(t)}),this.register(function(t){return new rx(t)}),this.register(function(t){return new J1(t)}),this.register(function(t){return new Z1(t)}),this.register(function(t){return new $1(t)}),this.register(function(t){return new Q1(t)}),this.register(function(t){return new q1(t)}),this.register(function(t){return new ex(t)}),this.register(function(t){return new j1(t)}),this.register(function(t){return new nx(t)}),this.register(function(t){return new tx(t)}),this.register(function(t){return new W1(t)}),this.register(function(t){return new nu(t,ut.EXT_MESHOPT_COMPRESSION)}),this.register(function(t){return new nu(t,ut.KHR_MESHOPT_COMPRESSION)}),this.register(function(t){return new ox(t)})}load(e,t,n,i){const s=this;let o;if(this.resourcePath!=="")o=this.resourcePath;else if(this.path!==""){const a=ar.extractUrlBase(e);o=ar.resolveURL(a,this.path)}else o=ar.extractUrlBase(e);this.manager.itemStart(e);const c=function(a){i?i(a):console.error(a),s.manager.itemError(e),s.manager.itemEnd(e)},l=new ef(this.manager);l.setPath(this.path),l.setResponseType("arraybuffer"),l.setRequestHeader(this.requestHeader),l.setWithCredentials(this.withCredentials),l.load(e,function(a){try{s.parse(a,o,function(h){t(h),s.manager.itemEnd(e)},c)}catch(h){c(h)}},n,c)}setDRACOLoader(e){return this.dracoLoader=e,this}setKTX2Loader(e){return this.ktx2Loader=e,this}setMeshoptDecoder(e){return this.meshoptDecoder=e,this}register(e){return this.pluginCallbacks.indexOf(e)===-1&&this.pluginCallbacks.push(e),this}unregister(e){return this.pluginCallbacks.indexOf(e)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}parse(e,t,n,i){let s;const o={},c={},l=new TextDecoder;if(typeof e=="string")s=JSON.parse(e);else if(e instanceof ArrayBuffer)if(l.decode(new Uint8Array(e,0,4))===ff){try{o[ut.KHR_BINARY_GLTF]=new ax(e)}catch(u){i&&i(u);return}s=JSON.parse(o[ut.KHR_BINARY_GLTF].content)}else s=JSON.parse(l.decode(e));else s=e;if(s.asset===void 0||s.asset.version[0]<2){i&&i(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}const a=new yx(s,{path:t||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});a.fileLoader.setRequestHeader(this.requestHeader);for(let h=0;h<this.pluginCallbacks.length;h++){const u=this.pluginCallbacks[h](a);u.name||console.error("THREE.GLTFLoader: Invalid plugin found: missing name"),c[u.name]=u,o[u.name]=!0}if(s.extensionsUsed)for(let h=0;h<s.extensionsUsed.length;++h){const u=s.extensionsUsed[h],f=s.extensionsRequired||[];switch(u){case ut.KHR_MATERIALS_UNLIT:o[u]=new X1;break;case ut.KHR_DRACO_MESH_COMPRESSION:o[u]=new cx(s,this.dracoLoader);break;case ut.KHR_TEXTURE_TRANSFORM:o[u]=new lx;break;case ut.KHR_MESH_QUANTIZATION:o[u]=new hx;break;default:f.indexOf(u)>=0&&c[u]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+u+'".')}}a.setExtensions(o),a.setPlugins(c),a.parse(n,i)}parseAsync(e,t){const n=this;return new Promise(function(i,s){n.parse(e,t,i,s)})}}function H1(){let r={};return{get:function(e){return r[e]},add:function(e,t){r[e]=t},remove:function(e){delete r[e]},removeAll:function(){r={}}}}function Ot(r,e,t){const n=r.json.materials[e];return n.extensions&&n.extensions[t]?n.extensions[t]:null}const ut={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_DISPERSION:"KHR_materials_dispersion",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_MATERIALS_BUMP:"EXT_materials_bump",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",KHR_MESHOPT_COMPRESSION:"KHR_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"};class W1{constructor(e){this.parser=e,this.name=ut.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){const e=this.parser,t=this.parser.json.nodes||[];for(let n=0,i=t.length;n<i;n++){const s=t[n];s.extensions&&s.extensions[this.name]&&s.extensions[this.name].light!==void 0&&e._addNodeRef(this.cache,s.extensions[this.name].light)}}_loadLight(e){const t=this.parser,n="light:"+e;let i=t.cache.get(n);if(i)return i;const s=t.json,l=((s.extensions&&s.extensions[this.name]||{}).lights||[])[e];let a;const h=new ce(16777215);l.color!==void 0&&h.setRGB(l.color[0],l.color[1],l.color[2],pn);const u=l.range!==void 0?l.range:0;switch(l.type){case"directional":a=new Ec(h),a.target.position.set(0,0,-1),a.add(a.target);break;case"point":a=new Mn(h),a.distance=u;break;case"spot":a=new ul(h),a.distance=u,l.spot=l.spot||{},l.spot.innerConeAngle=l.spot.innerConeAngle!==void 0?l.spot.innerConeAngle:0,l.spot.outerConeAngle=l.spot.outerConeAngle!==void 0?l.spot.outerConeAngle:Math.PI/4,a.angle=l.spot.outerConeAngle,a.penumbra=1-l.spot.innerConeAngle/l.spot.outerConeAngle,a.target.position.set(0,0,-1),a.add(a.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+l.type)}return a.position.set(0,0,0),Bn(a,l),l.intensity!==void 0&&(a.intensity=l.intensity),a.name=t.createUniqueName(l.name||"light_"+e),i=Promise.resolve(a),t.cache.add(n,i),i}getDependency(e,t){if(e==="light")return this._loadLight(t)}createNodeAttachment(e){const t=this,n=this.parser,s=n.json.nodes[e],c=(s.extensions&&s.extensions[this.name]||{}).light;return c===void 0?null:this._loadLight(c).then(function(l){return n._getNodeRef(t.cache,c,l)})}}class X1{constructor(){this.name=ut.KHR_MATERIALS_UNLIT}getMaterialType(){return Ct}extendParams(e,t,n){const i=[];e.color=new ce(1,1,1),e.opacity=1;const s=t.pbrMetallicRoughness;if(s){if(Array.isArray(s.baseColorFactor)){const o=s.baseColorFactor;e.color.setRGB(o[0],o[1],o[2],pn),e.opacity=o[3]}s.baseColorTexture!==void 0&&i.push(n.assignTexture(e,"map",s.baseColorTexture,Mt))}return Promise.all(i)}}class q1{constructor(e){this.parser=e,this.name=ut.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(e,t){const n=Ot(this.parser,e,this.name);return n===null||n.emissiveStrength!==void 0&&(t.emissiveIntensity=n.emissiveStrength),Promise.resolve()}}class Y1{constructor(e){this.parser=e,this.name=ut.KHR_MATERIALS_CLEARCOAT}getMaterialType(e){return Ot(this.parser,e,this.name)!==null?mn:null}extendMaterialParams(e,t){const n=Ot(this.parser,e,this.name);if(n===null)return Promise.resolve();const i=[];if(n.clearcoatFactor!==void 0&&(t.clearcoat=n.clearcoatFactor),n.clearcoatTexture!==void 0&&i.push(this.parser.assignTexture(t,"clearcoatMap",n.clearcoatTexture)),n.clearcoatRoughnessFactor!==void 0&&(t.clearcoatRoughness=n.clearcoatRoughnessFactor),n.clearcoatRoughnessTexture!==void 0&&i.push(this.parser.assignTexture(t,"clearcoatRoughnessMap",n.clearcoatRoughnessTexture)),n.clearcoatNormalTexture!==void 0&&(i.push(this.parser.assignTexture(t,"clearcoatNormalMap",n.clearcoatNormalTexture)),n.clearcoatNormalTexture.scale!==void 0)){const s=n.clearcoatNormalTexture.scale;t.clearcoatNormalScale=new re(s,s)}return Promise.all(i)}}class K1{constructor(e){this.parser=e,this.name=ut.KHR_MATERIALS_DISPERSION}getMaterialType(e){return Ot(this.parser,e,this.name)!==null?mn:null}extendMaterialParams(e,t){const n=Ot(this.parser,e,this.name);return n===null||(t.dispersion=n.dispersion!==void 0?n.dispersion:0),Promise.resolve()}}class j1{constructor(e){this.parser=e,this.name=ut.KHR_MATERIALS_IRIDESCENCE}getMaterialType(e){return Ot(this.parser,e,this.name)!==null?mn:null}extendMaterialParams(e,t){const n=Ot(this.parser,e,this.name);if(n===null)return Promise.resolve();const i=[];return n.iridescenceFactor!==void 0&&(t.iridescence=n.iridescenceFactor),n.iridescenceTexture!==void 0&&i.push(this.parser.assignTexture(t,"iridescenceMap",n.iridescenceTexture)),n.iridescenceIor!==void 0&&(t.iridescenceIOR=n.iridescenceIor),t.iridescenceThicknessRange===void 0&&(t.iridescenceThicknessRange=[100,400]),n.iridescenceThicknessMinimum!==void 0&&(t.iridescenceThicknessRange[0]=n.iridescenceThicknessMinimum),n.iridescenceThicknessMaximum!==void 0&&(t.iridescenceThicknessRange[1]=n.iridescenceThicknessMaximum),n.iridescenceThicknessTexture!==void 0&&i.push(this.parser.assignTexture(t,"iridescenceThicknessMap",n.iridescenceThicknessTexture)),Promise.all(i)}}class J1{constructor(e){this.parser=e,this.name=ut.KHR_MATERIALS_SHEEN}getMaterialType(e){return Ot(this.parser,e,this.name)!==null?mn:null}extendMaterialParams(e,t){const n=Ot(this.parser,e,this.name);if(n===null)return Promise.resolve();const i=[];if(t.sheenColor=new ce(0,0,0),t.sheenRoughness=0,t.sheen=1,n.sheenColorFactor!==void 0){const s=n.sheenColorFactor;t.sheenColor.setRGB(s[0],s[1],s[2],pn)}return n.sheenRoughnessFactor!==void 0&&(t.sheenRoughness=n.sheenRoughnessFactor),n.sheenColorTexture!==void 0&&i.push(this.parser.assignTexture(t,"sheenColorMap",n.sheenColorTexture,Mt)),n.sheenRoughnessTexture!==void 0&&i.push(this.parser.assignTexture(t,"sheenRoughnessMap",n.sheenRoughnessTexture)),Promise.all(i)}}class Z1{constructor(e){this.parser=e,this.name=ut.KHR_MATERIALS_TRANSMISSION}getMaterialType(e){return Ot(this.parser,e,this.name)!==null?mn:null}extendMaterialParams(e,t){const n=Ot(this.parser,e,this.name);if(n===null)return Promise.resolve();const i=[];return n.transmissionFactor!==void 0&&(t.transmission=n.transmissionFactor),n.transmissionTexture!==void 0&&i.push(this.parser.assignTexture(t,"transmissionMap",n.transmissionTexture)),Promise.all(i)}}class $1{constructor(e){this.parser=e,this.name=ut.KHR_MATERIALS_VOLUME}getMaterialType(e){return Ot(this.parser,e,this.name)!==null?mn:null}extendMaterialParams(e,t){const n=Ot(this.parser,e,this.name);if(n===null)return Promise.resolve();const i=[];t.thickness=n.thicknessFactor!==void 0?n.thicknessFactor:0,n.thicknessTexture!==void 0&&i.push(this.parser.assignTexture(t,"thicknessMap",n.thicknessTexture)),t.attenuationDistance=n.attenuationDistance||1/0;const s=n.attenuationColor||[1,1,1];return t.attenuationColor=new ce().setRGB(s[0],s[1],s[2],pn),Promise.all(i)}}class Q1{constructor(e){this.parser=e,this.name=ut.KHR_MATERIALS_IOR}getMaterialType(e){return Ot(this.parser,e,this.name)!==null?mn:null}extendMaterialParams(e,t){const n=Ot(this.parser,e,this.name);return n===null||(t.ior=n.ior!==void 0?n.ior:1.5,t.ior===0&&(t.ior=1e3)),Promise.resolve()}}class ex{constructor(e){this.parser=e,this.name=ut.KHR_MATERIALS_SPECULAR}getMaterialType(e){return Ot(this.parser,e,this.name)!==null?mn:null}extendMaterialParams(e,t){const n=Ot(this.parser,e,this.name);if(n===null)return Promise.resolve();const i=[];t.specularIntensity=n.specularFactor!==void 0?n.specularFactor:1,n.specularTexture!==void 0&&i.push(this.parser.assignTexture(t,"specularIntensityMap",n.specularTexture));const s=n.specularColorFactor||[1,1,1];return t.specularColor=new ce().setRGB(s[0],s[1],s[2],pn),n.specularColorTexture!==void 0&&i.push(this.parser.assignTexture(t,"specularColorMap",n.specularColorTexture,Mt)),Promise.all(i)}}class tx{constructor(e){this.parser=e,this.name=ut.EXT_MATERIALS_BUMP}getMaterialType(e){return Ot(this.parser,e,this.name)!==null?mn:null}extendMaterialParams(e,t){const n=Ot(this.parser,e,this.name);if(n===null)return Promise.resolve();const i=[];return t.bumpScale=n.bumpFactor!==void 0?n.bumpFactor:1,n.bumpTexture!==void 0&&i.push(this.parser.assignTexture(t,"bumpMap",n.bumpTexture)),Promise.all(i)}}class nx{constructor(e){this.parser=e,this.name=ut.KHR_MATERIALS_ANISOTROPY}getMaterialType(e){return Ot(this.parser,e,this.name)!==null?mn:null}extendMaterialParams(e,t){const n=Ot(this.parser,e,this.name);if(n===null)return Promise.resolve();const i=[];return n.anisotropyStrength!==void 0&&(t.anisotropy=n.anisotropyStrength),n.anisotropyRotation!==void 0&&(t.anisotropyRotation=n.anisotropyRotation),n.anisotropyTexture!==void 0&&i.push(this.parser.assignTexture(t,"anisotropyMap",n.anisotropyTexture)),Promise.all(i)}}class ix{constructor(e){this.parser=e,this.name=ut.KHR_TEXTURE_BASISU}loadTexture(e){const t=this.parser,n=t.json,i=n.textures[e];if(!i.extensions||!i.extensions[this.name])return null;const s=i.extensions[this.name],o=t.options.ktx2Loader;if(!o){if(n.extensionsRequired&&n.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return t.loadTextureImage(e,s.source,o)}}class sx{constructor(e){this.parser=e,this.name=ut.EXT_TEXTURE_WEBP}loadTexture(e){const t=this.name,n=this.parser,i=n.json,s=i.textures[e];if(!s.extensions||!s.extensions[t])return null;const o=s.extensions[t],c=i.images[o.source];let l=n.textureLoader;if(c.uri){const a=n.options.manager.getHandler(c.uri);a!==null&&(l=a)}return n.loadTextureImage(e,o.source,l)}}class rx{constructor(e){this.parser=e,this.name=ut.EXT_TEXTURE_AVIF}loadTexture(e){const t=this.name,n=this.parser,i=n.json,s=i.textures[e];if(!s.extensions||!s.extensions[t])return null;const o=s.extensions[t],c=i.images[o.source];let l=n.textureLoader;if(c.uri){const a=n.options.manager.getHandler(c.uri);a!==null&&(l=a)}return n.loadTextureImage(e,o.source,l)}}class nu{constructor(e,t){this.name=t,this.parser=e}loadBufferView(e){const t=this.parser.json,n=t.bufferViews[e];if(n.extensions&&n.extensions[this.name]){const i=n.extensions[this.name],s=this.parser.getDependency("buffer",i.buffer),o=this.parser.options.meshoptDecoder;if(!o||!o.supported){if(t.extensionsRequired&&t.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return s.then(function(c){const l=i.byteOffset||0,a=i.byteLength||0,h=i.count,u=i.byteStride,f=new Uint8Array(c,l,a);return o.decodeGltfBufferAsync?o.decodeGltfBufferAsync(h,u,f,i.mode,i.filter).then(function(_){return _.buffer}):o.ready.then(function(){const _=new ArrayBuffer(h*u);return o.decodeGltfBuffer(new Uint8Array(_),h,u,f,i.mode,i.filter),_})})}else return null}}class ox{constructor(e){this.name=ut.EXT_MESH_GPU_INSTANCING,this.parser=e}createNodeMesh(e){const t=this.parser.json,n=t.nodes[e];if(!n.extensions||!n.extensions[this.name]||n.mesh===void 0)return null;const i=t.meshes[n.mesh];for(const a of i.primitives)if(a.mode!==xn.TRIANGLES&&a.mode!==xn.TRIANGLE_STRIP&&a.mode!==xn.TRIANGLE_FAN&&a.mode!==void 0)return null;const o=n.extensions[this.name].attributes,c=[],l={};for(const a in o)c.push(this.parser.getDependency("accessor",o[a]).then(h=>(l[a]=h,l[a])));return c.length<1?null:(c.push(this.parser.createNodeMesh(e)),Promise.all(c).then(a=>{const h=a.pop(),u=h.isGroup?h.children:[h],f=a[0].count,_=[];for(const d of u){const g=new Qe,p=new P,m=new ln,x=new P(1,1,1),v=new tn(d.geometry,d.material,f);for(let y=0;y<f;y++)l.TRANSLATION&&p.fromBufferAttribute(l.TRANSLATION,y),l.ROTATION&&m.fromBufferAttribute(l.ROTATION,y),l.SCALE&&x.fromBufferAttribute(l.SCALE,y),v.setMatrixAt(y,g.compose(p,m,x));for(const y in l)if(y==="_COLOR_0"){const b=l[y];v.instanceColor=new yc(b.array,b.itemSize,b.normalized)}else y!=="TRANSLATION"&&y!=="ROTATION"&&y!=="SCALE"&&d.geometry.setAttribute(y,l[y]);bt.prototype.copy.call(v,d),this.parser.assignFinalMaterial(v),_.push(v)}return h.isGroup?(h.clear(),h.add(..._),h):_[0]}))}}const ff="glTF",Js=12,iu={JSON:1313821514,BIN:5130562};class ax{constructor(e){this.name=ut.KHR_BINARY_GLTF,this.content=null,this.body=null;const t=new DataView(e,0,Js),n=new TextDecoder;if(this.header={magic:n.decode(new Uint8Array(e.slice(0,4))),version:t.getUint32(4,!0),length:t.getUint32(8,!0)},this.header.magic!==ff)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");const i=this.header.length-Js,s=new DataView(e,Js);let o=0;for(;o<i;){const c=s.getUint32(o,!0);o+=4;const l=s.getUint32(o,!0);if(o+=4,l===iu.JSON){const a=new Uint8Array(e,Js+o,c);this.content=n.decode(a)}else if(l===iu.BIN){const a=Js+o;this.body=e.slice(a,a+c)}o+=c}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}}class cx{constructor(e,t){if(!t)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=ut.KHR_DRACO_MESH_COMPRESSION,this.json=e,this.dracoLoader=t,this.dracoLoader.preload()}decodePrimitive(e,t){const n=this.json,i=this.dracoLoader,s=e.extensions[this.name].bufferView,o=e.extensions[this.name].attributes,c={},l={},a={};for(const h in o){const u=Lc[h]||h.toLowerCase();c[u]=o[h]}for(const h in e.attributes){const u=Lc[h]||h.toLowerCase();if(o[h]!==void 0){const f=n.accessors[e.attributes[h]],_=xs[f.componentType];a[u]=_.name,l[u]=f.normalized===!0}}return t.getDependency("bufferView",s).then(function(h){return new Promise(function(u,f){i.decodeDracoFile(h,function(_){for(const d in _.attributes){const g=_.attributes[d],p=l[d];p!==void 0&&(g.normalized=p)}u(_)},c,a,pn,f)})})}}class lx{constructor(){this.name=ut.KHR_TEXTURE_TRANSFORM}extendTexture(e,t){return(t.texCoord===void 0||t.texCoord===e.channel)&&t.offset===void 0&&t.rotation===void 0&&t.scale===void 0||(e=e.clone(),t.texCoord!==void 0&&(e.channel=t.texCoord),t.offset!==void 0&&e.offset.fromArray(t.offset),t.rotation!==void 0&&(e.rotation=t.rotation),t.scale!==void 0&&e.repeat.fromArray(t.scale),e.needsUpdate=!0),e}}class hx{constructor(){this.name=ut.KHR_MESH_QUANTIZATION}}class df extends Ps{constructor(e,t,n,i){super(e,t,n,i)}copySampleValue_(e){const t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,s=e*i*3+i;for(let o=0;o!==i;o++)t[o]=n[s+o];return t}interpolate_(e,t,n,i){const s=this.resultBuffer,o=this.sampleValues,c=this.valueSize,l=c*2,a=c*3,h=i-t,u=(n-t)/h,f=u*u,_=f*u,d=e*a,g=d-a,p=-2*_+3*f,m=_-f,x=1-p,v=m-f+u;for(let y=0;y!==c;y++){const b=o[g+y+c],S=o[g+y+l]*h,w=o[d+y+c],M=o[d+y]*h;s[y]=x*b+v*S+p*w+m*M}return s}}const ux=new ln;class fx extends df{interpolate_(e,t,n,i){const s=super.interpolate_(e,t,n,i);return ux.fromArray(s).normalize().toArray(s),s}}const xn={POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6},xs={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},su={9728:zt,9729:kt,9984:vu,9985:co,9986:Qs,9987:Vn},ru={33071:Gn,33648:go,10497:ki},ba={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},Lc={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},Mi={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},dx={CUBICSPLINE:void 0,LINEAR:fr,STEP:ur},wa={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function px(r){return r.DefaultMaterial===void 0&&(r.DefaultMaterial=new oe({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:ai})),r.DefaultMaterial}function Ii(r,e,t){for(const n in t.extensions)r[n]===void 0&&(e.userData.gltfExtensions=e.userData.gltfExtensions||{},e.userData.gltfExtensions[n]=t.extensions[n])}function Bn(r,e){e.extras!==void 0&&(typeof e.extras=="object"?Object.assign(r.userData,e.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+e.extras))}function mx(r,e,t){let n=!1,i=!1,s=!1;for(let a=0,h=e.length;a<h;a++){const u=e[a];if(u.POSITION!==void 0&&(n=!0),u.NORMAL!==void 0&&(i=!0),u.COLOR_0!==void 0&&(s=!0),n&&i&&s)break}if(!n&&!i&&!s)return Promise.resolve(r);const o=[],c=[],l=[];for(let a=0,h=e.length;a<h;a++){const u=e[a];if(n){const f=u.POSITION!==void 0?t.getDependency("accessor",u.POSITION):r.attributes.position;o.push(f)}if(i){const f=u.NORMAL!==void 0?t.getDependency("accessor",u.NORMAL):r.attributes.normal;c.push(f)}if(s){const f=u.COLOR_0!==void 0?t.getDependency("accessor",u.COLOR_0):r.attributes.color;l.push(f)}}return Promise.all([Promise.all(o),Promise.all(c),Promise.all(l)]).then(function(a){const h=a[0],u=a[1],f=a[2];return n&&(r.morphAttributes.position=h),i&&(r.morphAttributes.normal=u),s&&(r.morphAttributes.color=f),r.morphTargetsRelative=!0,r})}function gx(r,e){if(r.updateMorphTargets(),e.weights!==void 0)for(let t=0,n=e.weights.length;t<n;t++)r.morphTargetInfluences[t]=e.weights[t];if(e.extras&&Array.isArray(e.extras.targetNames)){const t=e.extras.targetNames;if(r.morphTargetInfluences.length===t.length){r.morphTargetDictionary={};for(let n=0,i=t.length;n<i;n++)r.morphTargetDictionary[t[n]]=n}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function _x(r){let e;const t=r.extensions&&r.extensions[ut.KHR_DRACO_MESH_COMPRESSION];if(t?e="draco:"+t.bufferView+":"+t.indices+":"+Ta(t.attributes):e=r.indices+":"+Ta(r.attributes)+":"+r.mode,r.targets!==void 0)for(let n=0,i=r.targets.length;n<i;n++)e+=":"+Ta(r.targets[n]);return e}function Ta(r){let e="";const t=Object.keys(r).sort();for(let n=0,i=t.length;n<i;n++)e+=t[n]+":"+r[t[n]]+";";return e}function Ic(r){switch(r){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function xx(r){return r.search(/\.jpe?g($|\?)/i)>0||r.search(/^data\:image\/jpeg/)===0?"image/jpeg":r.search(/\.webp($|\?)/i)>0||r.search(/^data\:image\/webp/)===0?"image/webp":r.search(/\.ktx2($|\?)/i)>0||r.search(/^data\:image\/ktx2/)===0?"image/ktx2":"image/png"}const vx=new Qe;class yx{constructor(e={},t={}){this.json=e,this.extensions={},this.plugins={},this.options=t,this.cache=new H1,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let n=!1,i=-1,s=!1,o=-1;if(typeof navigator<"u"&&typeof navigator.userAgent<"u"){const c=navigator.userAgent;n=/^((?!chrome|android).)*safari/i.test(c)===!0;const l=c.match(/Version\/(\d+)/);i=n&&l?parseInt(l[1],10):-1,s=c.indexOf("Firefox")>-1,o=s?c.match(/Firefox\/([0-9]+)\./)[1]:-1}typeof createImageBitmap>"u"||n&&i<17||s&&o<98?this.textureLoader=new l0(this.options.manager):this.textureLoader=new m0(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new ef(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials"&&this.fileLoader.setWithCredentials(!0)}setExtensions(e){this.extensions=e}setPlugins(e){this.plugins=e}parse(e,t){const n=this,i=this.json,s=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(o){return o._markDefs&&o._markDefs()}),Promise.all(this._invokeAll(function(o){return o.beforeRoot&&o.beforeRoot()})).then(function(){return Promise.all([n.getDependencies("scene"),n.getDependencies("animation"),n.getDependencies("camera")])}).then(function(o){const c={scene:o[0][i.scene||0],scenes:o[0],animations:o[1],cameras:o[2],asset:i.asset,parser:n,userData:{}};return Ii(s,c,i),Bn(c,i),Promise.all(n._invokeAll(function(l){return l.afterRoot&&l.afterRoot(c)})).then(function(){for(const l of c.scenes)l.updateMatrixWorld();e(c)})}).catch(t)}_markDefs(){const e=this.json.nodes||[],t=this.json.skins||[],n=this.json.meshes||[];for(let i=0,s=t.length;i<s;i++){const o=t[i].joints;for(let c=0,l=o.length;c<l;c++)e[o[c]].isBone=!0}for(let i=0,s=e.length;i<s;i++){const o=e[i];o.mesh!==void 0&&(this._addNodeRef(this.meshCache,o.mesh),o.skin!==void 0&&(n[o.mesh].isSkinnedMesh=!0)),o.camera!==void 0&&this._addNodeRef(this.cameraCache,o.camera)}}_addNodeRef(e,t){t!==void 0&&(e.refs[t]===void 0&&(e.refs[t]=e.uses[t]=0),e.refs[t]++)}_getNodeRef(e,t,n){if(e.refs[t]<=1)return n;const i=n.clone(),s=(o,c)=>{const l=this.associations.get(o);l!=null&&this.associations.set(c,l);for(const[a,h]of o.children.entries())s(h,c.children[a])};return s(n,i),i.name+="_instance_"+e.uses[t]++,i}_invokeOne(e){const t=Object.values(this.plugins);t.push(this);for(let n=0;n<t.length;n++){const i=e(t[n]);if(i)return i}return null}_invokeAll(e){const t=Object.values(this.plugins);t.unshift(this);const n=[];for(let i=0;i<t.length;i++){const s=e(t[i]);s&&n.push(s)}return n}getDependency(e,t){const n=e+":"+t;let i=this.cache.get(n);if(!i){switch(e){case"scene":i=this.loadScene(t);break;case"node":i=this._invokeOne(function(s){return s.loadNode&&s.loadNode(t)});break;case"mesh":i=this._invokeOne(function(s){return s.loadMesh&&s.loadMesh(t)});break;case"accessor":i=this.loadAccessor(t);break;case"bufferView":i=this._invokeOne(function(s){return s.loadBufferView&&s.loadBufferView(t)});break;case"buffer":i=this.loadBuffer(t);break;case"material":i=this._invokeOne(function(s){return s.loadMaterial&&s.loadMaterial(t)});break;case"texture":i=this._invokeOne(function(s){return s.loadTexture&&s.loadTexture(t)});break;case"skin":i=this.loadSkin(t);break;case"animation":i=this._invokeOne(function(s){return s.loadAnimation&&s.loadAnimation(t)});break;case"camera":i=this.loadCamera(t);break;default:if(i=this._invokeOne(function(s){return s!=this&&s.getDependency&&s.getDependency(e,t)}),!i)throw new Error("Unknown type: "+e);break}this.cache.add(n,i)}return i}getDependencies(e){let t=this.cache.get(e);if(!t){const n=this,i=this.json[e+(e==="mesh"?"es":"s")]||[];t=Promise.all(i.map(function(s,o){return n.getDependency(e,o)})),this.cache.add(e,t)}return t}loadBuffer(e){const t=this.json.buffers[e],n=this.fileLoader;if(t.type&&t.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+t.type+" buffer type is not supported.");if(t.uri===void 0&&e===0)return Promise.resolve(this.extensions[ut.KHR_BINARY_GLTF].body);const i=this.options;return new Promise(function(s,o){n.load(ar.resolveURL(t.uri,i.path),s,void 0,function(){o(new Error('THREE.GLTFLoader: Failed to load buffer "'+t.uri+'".'))})})}loadBufferView(e){const t=this.json.bufferViews[e];return this.getDependency("buffer",t.buffer).then(function(n){const i=t.byteLength||0,s=t.byteOffset||0;return n.slice(s,s+i)})}loadAccessor(e){const t=this,n=this.json,i=this.json.accessors[e];if(i.bufferView===void 0&&i.sparse===void 0){const o=ba[i.type],c=xs[i.componentType],l=i.normalized===!0,a=new c(i.count*o);return Promise.resolve(new Rt(a,o,l))}const s=[];return i.bufferView!==void 0?s.push(this.getDependency("bufferView",i.bufferView)):s.push(null),i.sparse!==void 0&&(s.push(this.getDependency("bufferView",i.sparse.indices.bufferView)),s.push(this.getDependency("bufferView",i.sparse.values.bufferView))),Promise.all(s).then(function(o){const c=o[0],l=ba[i.type],a=xs[i.componentType],h=a.BYTES_PER_ELEMENT,u=h*l,f=i.byteOffset||0,_=i.bufferView!==void 0?n.bufferViews[i.bufferView].byteStride:void 0,d=i.normalized===!0;let g,p;if(_&&_!==u){const m=Math.floor(f/_),x="InterleavedBuffer:"+i.bufferView+":"+i.componentType+":"+m+":"+i.count;let v=t.cache.get(x);v||(g=new a(c,m*_,i.count*_/h),v=new Du(g,_/h),t.cache.add(x,v)),p=new mr(v,l,f%_/h,d)}else c===null?g=new a(i.count*l):g=new a(c,f,i.count*l),p=new Rt(g,l,d);if(i.sparse!==void 0){const m=ba.SCALAR,x=xs[i.sparse.indices.componentType],v=i.sparse.indices.byteOffset||0,y=i.sparse.values.byteOffset||0,b=new x(o[1],v,i.sparse.count*m),S=new a(o[2],y,i.sparse.count*l);c!==null&&(p=new Rt(p.array.slice(),p.itemSize,p.normalized)),p.normalized=!1;for(let w=0,M=b.length;w<M;w++){const T=b[w];if(p.setX(T,S[w*l]),l>=2&&p.setY(T,S[w*l+1]),l>=3&&p.setZ(T,S[w*l+2]),l>=4&&p.setW(T,S[w*l+3]),l>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}p.normalized=d}return p})}loadTexture(e){const t=this.json,n=this.options,s=t.textures[e].source,o=t.images[s];let c=this.textureLoader;if(o.uri){const l=n.manager.getHandler(o.uri);l!==null&&(c=l)}return this.loadTextureImage(e,s,c)}loadTextureImage(e,t,n){const i=this,s=this.json,o=s.textures[e],c=s.images[t],l=(c.uri||c.bufferView)+":"+o.sampler;if(this.textureCache[l])return this.textureCache[l];const a=this.loadImageSource(t,n).then(function(h){h.flipY=!1,h.name=o.name||c.name||"",h.name===""&&typeof c.uri=="string"&&c.uri.startsWith("data:image/")===!1&&(h.name=c.uri);const f=(s.samplers||{})[o.sampler]||{};return h.magFilter=su[f.magFilter]||kt,h.minFilter=su[f.minFilter]||Vn,h.wrapS=ru[f.wrapS]||ki,h.wrapT=ru[f.wrapT]||ki,h.generateMipmaps=!h.isCompressedTexture&&h.minFilter!==zt&&h.minFilter!==kt,i.associations.set(h,{textures:e}),h}).catch(function(){return null});return this.textureCache[l]=a,a}loadImageSource(e,t){const n=this,i=this.json,s=this.options;if(this.sourceCache[e]!==void 0)return this.sourceCache[e].then(u=>u.clone());const o=i.images[e],c=self.URL||self.webkitURL;let l=o.uri||"",a=!1;if(o.bufferView!==void 0)l=n.getDependency("bufferView",o.bufferView).then(function(u){a=!0;const f=new Blob([u],{type:o.mimeType});return l=c.createObjectURL(f),l});else if(o.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+e+" is missing URI and bufferView");const h=Promise.resolve(l).then(function(u){return new Promise(function(f,_){let d=f;t.isImageBitmapLoader===!0&&(d=function(g){const p=new Vt(g);p.needsUpdate=!0,f(p)}),t.load(ar.resolveURL(u,s.path),d,void 0,_)})}).then(function(u){return a===!0&&c.revokeObjectURL(l),Bn(u,o),u.userData.mimeType=o.mimeType||xx(o.uri),u}).catch(function(u){throw console.error("THREE.GLTFLoader: Couldn't load texture",l),u});return this.sourceCache[e]=h,h}assignTexture(e,t,n,i){const s=this;return this.getDependency("texture",n.index).then(function(o){if(!o)return null;if(n.texCoord!==void 0&&n.texCoord>0&&(o=o.clone(),o.channel=n.texCoord),s.extensions[ut.KHR_TEXTURE_TRANSFORM]){const c=n.extensions!==void 0?n.extensions[ut.KHR_TEXTURE_TRANSFORM]:void 0;if(c){const l=s.associations.get(o);o=s.extensions[ut.KHR_TEXTURE_TRANSFORM].extendTexture(o,c),s.associations.set(o,l)}}return i!==void 0&&(o.colorSpace=i),e[t]=o,o})}assignFinalMaterial(e){const t=e.geometry;let n=e.material;const i=t.attributes.tangent===void 0,s=t.attributes.color!==void 0,o=t.attributes.normal===void 0;if(e.isPoints){const c="PointsMaterial:"+n.uuid;let l=this.cache.get(c);l||(l=new rl,Ln.prototype.copy.call(l,n),l.color.copy(n.color),l.map=n.map,l.sizeAttenuation=!1,this.cache.add(c,l)),n=l}else if(e.isLine){const c="LineBasicMaterial:"+n.uuid;let l=this.cache.get(c);l||(l=new Fu,Ln.prototype.copy.call(l,n),l.color.copy(n.color),l.map=n.map,this.cache.add(c,l)),n=l}if(i||s||o){let c="ClonedMaterial:"+n.uuid+":";i&&(c+="derivative-tangents:"),s&&(c+="vertex-colors:"),o&&(c+="flat-shading:");let l=this.cache.get(c);l||(l=n.clone(),s&&(l.vertexColors=!0),o&&(l.flatShading=!0),i&&(l.normalScale&&(l.normalScale.y*=-1),l.clearcoatNormalScale&&(l.clearcoatNormalScale.y*=-1)),this.cache.add(c,l),this.associations.set(l,this.associations.get(n))),n=l}e.material=n}getMaterialType(){return oe}loadMaterial(e){const t=this,n=this.json,i=this.extensions,s=n.materials[e];let o;const c={},l=s.extensions||{},a=[];if(l[ut.KHR_MATERIALS_UNLIT]){const u=i[ut.KHR_MATERIALS_UNLIT];o=u.getMaterialType(),a.push(u.extendParams(c,s,t))}else{const u=s.pbrMetallicRoughness||{};if(c.color=new ce(1,1,1),c.opacity=1,Array.isArray(u.baseColorFactor)){const f=u.baseColorFactor;c.color.setRGB(f[0],f[1],f[2],pn),c.opacity=f[3]}u.baseColorTexture!==void 0&&a.push(t.assignTexture(c,"map",u.baseColorTexture,Mt)),c.metalness=u.metallicFactor!==void 0?u.metallicFactor:1,c.roughness=u.roughnessFactor!==void 0?u.roughnessFactor:1,u.metallicRoughnessTexture!==void 0&&(a.push(t.assignTexture(c,"metalnessMap",u.metallicRoughnessTexture)),a.push(t.assignTexture(c,"roughnessMap",u.metallicRoughnessTexture))),o=this._invokeOne(function(f){return f.getMaterialType&&f.getMaterialType(e)}),a.push(Promise.all(this._invokeAll(function(f){return f.extendMaterialParams&&f.extendMaterialParams(e,c)})))}s.doubleSided===!0&&(c.side=St);const h=s.alphaMode||wa.OPAQUE;if(h===wa.BLEND?(c.transparent=!0,c.depthWrite=!1):(c.transparent=!1,h===wa.MASK&&(c.alphaTest=s.alphaCutoff!==void 0?s.alphaCutoff:.5)),s.normalTexture!==void 0&&o!==Ct&&(a.push(t.assignTexture(c,"normalMap",s.normalTexture)),c.normalScale=new re(1,1),s.normalTexture.scale!==void 0)){const u=s.normalTexture.scale;c.normalScale.set(u,u)}if(s.occlusionTexture!==void 0&&o!==Ct&&(a.push(t.assignTexture(c,"aoMap",s.occlusionTexture)),s.occlusionTexture.strength!==void 0&&(c.aoMapIntensity=s.occlusionTexture.strength)),s.emissiveFactor!==void 0&&o!==Ct){const u=s.emissiveFactor;c.emissive=new ce().setRGB(u[0],u[1],u[2],pn)}return s.emissiveTexture!==void 0&&o!==Ct&&a.push(t.assignTexture(c,"emissiveMap",s.emissiveTexture,Mt)),Promise.all(a).then(function(){const u=new o(c);return s.name&&(u.name=s.name),Bn(u,s),t.associations.set(u,{materials:e}),s.extensions&&Ii(i,u,s),u})}createUniqueName(e){const t=gt.sanitizeNodeName(e||"");return t in this.nodeNamesUsed?t+"_"+ ++this.nodeNamesUsed[t]:(this.nodeNamesUsed[t]=0,t)}loadGeometries(e){const t=this,n=this.extensions,i=this.primitiveCache;function s(c){return n[ut.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(c,t).then(function(l){return ou(l,c,t)})}const o=[];for(let c=0,l=e.length;c<l;c++){const a=e[c],h=_x(a),u=i[h];if(u)o.push(u.promise);else{let f;a.extensions&&a.extensions[ut.KHR_DRACO_MESH_COMPRESSION]?f=s(a):f=ou(new wt,a,t),i[h]={primitive:a,promise:f},o.push(f)}}return Promise.all(o)}loadMesh(e){const t=this,n=this.json,i=this.extensions,s=n.meshes[e],o=s.primitives,c=[];for(let l=0,a=o.length;l<a;l++){const h=o[l].material===void 0?px(this.cache):this.getDependency("material",o[l].material);c.push(h)}return c.push(t.loadGeometries(o)),Promise.all(c).then(function(l){const a=l.slice(0,l.length-1),h=l[l.length-1],u=[];for(let _=0,d=h.length;_<d;_++){const g=h[_],p=o[_];let m;const x=a[_];if(p.mode===xn.TRIANGLES||p.mode===xn.TRIANGLE_STRIP||p.mode===xn.TRIANGLE_FAN||p.mode===void 0)m=s.isSkinnedMesh===!0?new op(g,x):new z(g,x),m.isSkinnedMesh===!0&&m.normalizeSkinWeights(),p.mode===xn.TRIANGLE_STRIP?m.geometry=tu(m.geometry,Au):p.mode===xn.TRIANGLE_FAN&&(m.geometry=tu(m.geometry,gc));else if(p.mode===xn.LINES)m=new fp(g,x);else if(p.mode===xn.LINE_STRIP)m=new sl(g,x);else if(p.mode===xn.LINE_LOOP)m=new dp(g,x);else if(p.mode===xn.POINTS)m=new Ou(g,x);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+p.mode);Object.keys(m.geometry.morphAttributes).length>0&&gx(m,s),m.name=t.createUniqueName(s.name||"mesh_"+e),Bn(m,s),p.extensions&&Ii(i,m,p),t.assignFinalMaterial(m),u.push(m)}for(let _=0,d=u.length;_<d;_++)t.associations.set(u[_],{meshes:e,primitives:_});if(u.length===1)return s.extensions&&Ii(i,u[0],s),u[0];const f=new dt;s.extensions&&Ii(i,f,s),t.associations.set(f,{meshes:e});for(let _=0,d=u.length;_<d;_++)f.add(u[_]);return f})}loadCamera(e){let t;const n=this.json.cameras[e],i=n[n.type];if(!i){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return n.type==="perspective"?t=new sn(Oi.radToDeg(i.yfov),i.aspectRatio||1,i.znear||1,i.zfar||2e6):n.type==="orthographic"&&(t=new Sr(-i.xmag,i.xmag,i.ymag,-i.ymag,i.znear,i.zfar)),n.name&&(t.name=this.createUniqueName(n.name)),Bn(t,n),Promise.resolve(t)}loadSkin(e){const t=this.json.skins[e],n=[];for(let i=0,s=t.joints.length;i<s;i++)n.push(this._loadNodeShallow(t.joints[i]));return t.inverseBindMatrices!==void 0?n.push(this.getDependency("accessor",t.inverseBindMatrices)):n.push(null),Promise.all(n).then(function(i){const s=i.pop(),o=i,c=[],l=[];for(let a=0,h=o.length;a<h;a++){const u=o[a];if(u){c.push(u);const f=new Qe;s!==null&&f.fromArray(s.array,a*16),l.push(f)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',t.joints[a])}return new nl(c,l)})}loadAnimation(e){const t=this.json,n=this,i=t.animations[e],s=i.name?i.name:"animation_"+e,o=[],c=[],l=[],a=[],h=[];for(let u=0,f=i.channels.length;u<f;u++){const _=i.channels[u],d=i.samplers[_.sampler],g=_.target,p=g.node,m=i.parameters!==void 0?i.parameters[d.input]:d.input,x=i.parameters!==void 0?i.parameters[d.output]:d.output;g.node!==void 0&&(o.push(this.getDependency("node",p)),c.push(this.getDependency("accessor",m)),l.push(this.getDependency("accessor",x)),a.push(d),h.push(g))}return Promise.all([Promise.all(o),Promise.all(c),Promise.all(l),Promise.all(a),Promise.all(h)]).then(function(u){const f=u[0],_=u[1],d=u[2],g=u[3],p=u[4],m=[];for(let v=0,y=f.length;v<y;v++){const b=f[v],S=_[v],w=d[v],M=g[v],T=p[v];if(b===void 0)continue;b.updateMatrix&&b.updateMatrix();const A=n._createAnimationTracks(b,S,w,M,T);if(A)for(let L=0;L<A.length;L++)m.push(A[L])}const x=new Tc(s,void 0,m);return Bn(x,i),x})}createNodeMesh(e){const t=this.json,n=this,i=t.nodes[e];return i.mesh===void 0?null:n.getDependency("mesh",i.mesh).then(function(s){const o=n._getNodeRef(n.meshCache,i.mesh,s);return i.weights!==void 0&&o.traverse(function(c){if(c.isMesh)for(let l=0,a=i.weights.length;l<a;l++)c.morphTargetInfluences[l]=i.weights[l]}),o})}loadNode(e){const t=this.json,n=this,i=t.nodes[e],s=n._loadNodeShallow(e),o=[],c=i.children||[];for(let a=0,h=c.length;a<h;a++)o.push(n.getDependency("node",c[a]));const l=i.skin===void 0?Promise.resolve(null):n.getDependency("skin",i.skin);return Promise.all([s,Promise.all(o),l]).then(function(a){const h=a[0],u=a[1],f=a[2];f!==null&&h.traverse(function(_){_.isSkinnedMesh&&_.bind(f,vx)});for(let _=0,d=u.length;_<d;_++)h.add(u[_]);if(h.userData.pivot!==void 0&&u.length>0){const _=h.userData.pivot,d=u[0];h.pivot=new P().fromArray(_),h.position.x-=_[0],h.position.y-=_[1],h.position.z-=_[2],d.position.set(0,0,0),delete h.userData.pivot}return h})}_loadNodeShallow(e){const t=this.json,n=this.extensions,i=this;if(this.nodeCache[e]!==void 0)return this.nodeCache[e];const s=t.nodes[e],o=s.name?i.createUniqueName(s.name):"",c=[],l=i._invokeOne(function(a){return a.createNodeMesh&&a.createNodeMesh(e)});return l&&c.push(l),s.camera!==void 0&&c.push(i.getDependency("camera",s.camera).then(function(a){return i._getNodeRef(i.cameraCache,s.camera,a)})),i._invokeAll(function(a){return a.createNodeAttachment&&a.createNodeAttachment(e)}).forEach(function(a){c.push(a)}),this.nodeCache[e]=Promise.all(c).then(function(a){let h;if(s.isBone===!0?h=new Uu:a.length>1?h=new dt:a.length===1?h=a[0]:h=new bt,h!==a[0])for(let u=0,f=a.length;u<f;u++)h.add(a[u]);if(s.name&&(h.userData.name=s.name,h.name=o),Bn(h,s),s.extensions&&Ii(n,h,s),s.matrix!==void 0){const u=new Qe;u.fromArray(s.matrix),h.applyMatrix4(u)}else s.translation!==void 0&&h.position.fromArray(s.translation),s.rotation!==void 0&&h.quaternion.fromArray(s.rotation),s.scale!==void 0&&h.scale.fromArray(s.scale);if(!i.associations.has(h))i.associations.set(h,{});else if(s.mesh!==void 0&&i.meshCache.refs[s.mesh]>1){const u=i.associations.get(h);i.associations.set(h,{...u})}return i.associations.get(h).nodes=e,h}),this.nodeCache[e]}loadScene(e){const t=this.extensions,n=this.json.scenes[e],i=this,s=new dt;n.name&&(s.name=i.createUniqueName(n.name)),Bn(s,n),n.extensions&&Ii(t,s,n);const o=n.nodes||[],c=[];for(let l=0,a=o.length;l<a;l++)c.push(i.getDependency("node",o[l]));return Promise.all(c).then(function(l){for(let h=0,u=l.length;h<u;h++){const f=l[h];f.parent!==null?s.add(G1(f)):s.add(f)}const a=h=>{const u=new Map;for(const[f,_]of i.associations)(f instanceof Ln||f instanceof Vt)&&u.set(f,_);return h.traverse(f=>{const _=i.associations.get(f);_!=null&&u.set(f,_)}),u};return i.associations=a(s),s})}_createAnimationTracks(e,t,n,i,s){const o=[],c=e.name?e.name:e.uuid,l=[];function a(_){_.morphTargetInfluences&&l.push(_.name?_.name:_.uuid)}Mi[s.path]===Mi.weights?(a(e),e.isGroup&&e.children.forEach(a)):l.push(c);let h;switch(Mi[s.path]){case Mi.weights:h=Es;break;case Mi.rotation:h=As;break;case Mi.translation:case Mi.scale:h=Cs;break;default:switch(n.itemSize){case 1:h=Es;break;case 2:case 3:default:h=Cs;break}break}const u=i.interpolation!==void 0?dx[i.interpolation]:fr,f=this._getArrayFromAccessor(n);for(let _=0,d=l.length;_<d;_++){const g=new h(l[_]+"."+Mi[s.path],t.array,f,u);i.interpolation==="CUBICSPLINE"&&this._createCubicSplineTrackInterpolant(g),o.push(g)}return o}_getArrayFromAccessor(e){let t=e.array;if(e.normalized){const n=Ic(t.constructor),i=new Float32Array(t.length);for(let s=0,o=t.length;s<o;s++)i[s]=t[s]*n;t=i}return t}_createCubicSplineTrackInterpolant(e){e.createInterpolant=function(n){const i=this instanceof As?fx:df;return new i(this.times,this.values,this.getValueSize()/3,n)},e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}}function Mx(r,e,t){const n=e.attributes,i=new Kn;if(n.POSITION!==void 0){const c=t.json.accessors[n.POSITION],l=c.min,a=c.max;if(l!==void 0&&a!==void 0){if(i.set(new P(l[0],l[1],l[2]),new P(a[0],a[1],a[2])),c.normalized){const h=Ic(xs[c.componentType]);i.min.multiplyScalar(h),i.max.multiplyScalar(h)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;const s=e.targets;if(s!==void 0){const c=new P,l=new P;for(let a=0,h=s.length;a<h;a++){const u=s[a];if(u.POSITION!==void 0){const f=t.json.accessors[u.POSITION],_=f.min,d=f.max;if(_!==void 0&&d!==void 0){if(l.setX(Math.max(Math.abs(_[0]),Math.abs(d[0]))),l.setY(Math.max(Math.abs(_[1]),Math.abs(d[1]))),l.setZ(Math.max(Math.abs(_[2]),Math.abs(d[2]))),f.normalized){const g=Ic(xs[f.componentType]);l.multiplyScalar(g)}c.max(l)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}i.expandByVector(c)}r.boundingBox=i;const o=new jn;i.getCenter(o.center),o.radius=i.min.distanceTo(i.max)/2,r.boundingSphere=o}function ou(r,e,t){const n=e.attributes,i=[];function s(o,c){return t.getDependency("accessor",o).then(function(l){r.setAttribute(c,l)})}for(const o in n){const c=Lc[o]||o.toLowerCase();c in r.attributes||i.push(s(n[o],c))}if(e.indices!==void 0&&!r.index){const o=t.getDependency("accessor",e.indices).then(function(c){r.setIndex(c)});i.push(o)}return ht.workingColorSpace!==pn&&"COLOR_0"in n&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${ht.workingColorSpace}" not supported.`),Bn(r,e),Mx(r,e,t),Promise.all(i).then(function(){return e.targets!==void 0?mx(r,e.targets,t):r})}const pf=new V1,Ea=new Map;let Aa=null;async function mf(){return Aa||(Aa=fetch("./models/manifest.json").then(r=>r.ok?r.json():null).catch(()=>null)),Aa}function gf(r){return r.startsWith("http")?r:`./${r.replace(/^\//,"")}`}async function _f(r){try{return(await fetch(r,{method:"HEAD"})).ok}catch{return!1}}function xf(r,e,t=1){const n=new Kn().setFromObject(r);if(n.isEmpty())return;const i=n.getSize(new P),s=n.getCenter(new P),o=Math.max(i.x,i.y,i.z,.001),c=e/o*t;r.scale.setScalar(c),r.position.sub(s.multiplyScalar(c)),r.position.y+=i.y*c/2}function Sx(r,e){const t=new Set(e.map(i=>i.toLowerCase()));let n=null;return r.traverse(i=>{var c;if(n)return;const s=i;if(!s.isMesh)return;const o=s.name.toLowerCase();(t.has(o)||t.has(((c=i.parent)==null?void 0:c.name.toLowerCase())??""))&&(n=s)}),n}function vf(r){r.traverse(e=>{const t=e;if(!t.isMesh)return;t.castShadow=!0,t.receiveShadow=!0;const n=Array.isArray(t.material)?t.material:[t.material];for(const i of n)i&&"color"in i&&i instanceof oe&&(i.envMapIntensity=1)})}async function bx(r,e,t){var i,s;const n=gf(r);if(!await _f(n))return null;try{if(!Ea.has(n)){const c=(await pf.loadAsync(n)).scene,l=e.targetHeight??((i=t.defaults)==null?void 0:i.targetHeight)??6;xf(c,l,e.scale??((s=t.defaults)==null?void 0:s.scale)??1),vf(c),Ea.set(n,c)}return Ea.get(n).clone(!0)}catch{return null}}async function wx(r,e,t){var i,s;const n=gf(r);if(!await _f(n))return null;try{const o=await pf.loadAsync(n),c=o.scene,l=e.targetHeight??((i=t.defaults)==null?void 0:i.targetHeight)??1.9;return xf(c,l,e.scale??((s=t.defaults)==null?void 0:s.scale)??1),vf(c),{group:c,clips:o.animations??[]}}catch{return null}}function Tx(r){r.traverse(e=>{const t=e;if(!t.isMesh)return;const n=Array.isArray(t.material)?t.material:[t.material];for(const i of n){if(!i)continue;const s=i;s.name==="Grey"?(s.color.setHex(4015958),s.roughness=.42,s.metalness=.62,s.envMapIntensity=1.1):s.name==="Main"?(s.color.setHex(3104670),s.roughness=.5,s.metalness=.34,s.envMapIntensity=1.15):s.name==="Black"?(s.color.setHex(1316895),s.roughness=.32,s.metalness=.5,s.envMapIntensity=1):(s.roughness=Math.max(.3,Math.min(.9,s.roughness??.7)),s.metalness=Math.max(.1,Math.min(.7,s.metalness??.1)),s.envMapIntensity=1),s.needsUpdate=!0}})}function au(r=1.9){const e=r*1.15,t=document.createElement("canvas");t.width=t.height=128;const n=t.getContext("2d"),i=n.createRadialGradient(64,64,0,64,64,64);i.addColorStop(0,"rgba(0,0,0,0.55)"),i.addColorStop(.45,"rgba(0,0,0,0.28)"),i.addColorStop(1,"rgba(0,0,0,0)"),n.fillStyle=i,n.fillRect(0,0,128,128);const s=new In(t);s.colorSpace=Mt;const o=new z(new rn(e,e),new Ct({map:s,transparent:!0,opacity:.85,depthWrite:!1}));return o.rotation.x=-Math.PI/2,o.position.y=.06,o.renderOrder=-1,o.name="ContactShadow",o}function Io(r,e){return new mn({color:r,emissive:r,emissiveIntensity:e,metalness:.15,roughness:.08,clearcoat:1,clearcoatRoughness:.05,reflectivity:1,transparent:!0,opacity:.92,side:St})}function an(r,e=.82){return new oe({color:r,roughness:e,metalness:.06,envMapIntensity:.4})}function Ca(r){return new oe({color:r,roughness:.88,metalness:.04,emissive:1718816,emissiveIntensity:.06})}function Ex(r){return new oe({color:r?7268279:6000111,emissive:r?3462041:3900150,emissiveIntensity:r?.72:.38,roughness:.18,metalness:.4,transparent:!0,opacity:.88})}function cu(){return new mn({color:1993370,roughness:.06,metalness:.12,transparent:!0,opacity:.72,reflectivity:.95,clearcoat:1,clearcoatRoughness:.08,envMapIntensity:.6})}function Ax(r){const t=document.createElement("canvas");t.width=64,t.height=64;const n=t.getContext("2d"),i=n.createRadialGradient(64/2,64/2,0,64/2,64/2,64/2);return i.addColorStop(0,r),i.addColorStop(.4,"rgba(255,220,140,0.35)"),i.addColorStop(1,"rgba(0,0,0,0)"),n.fillStyle=i,n.fillRect(0,0,64,64),new In(t)}function Cx(){return new oe({color:4871528,roughness:.45,metalness:.85})}function Rx(r){return new mn({color:r,emissive:r,emissiveIntensity:1.4,roughness:.04,metalness:0,transparent:!0,opacity:.82,clearcoat:1})}function Px(r){const e=new wt;let t=0,n=0;const i=r.some(f=>f.attributes.color);for(const f of r)t+=f.attributes.position.count,n+=f.index?f.index.count:f.attributes.position.count;const s=new Float32Array(t*3),o=new Float32Array(t*3),c=new Float32Array(t*2),l=i?new Float32Array(t*3):null,a=new Uint32Array(n);let h=0,u=0;for(const f of r){const _=f.attributes.position,d=f.attributes.normal,g=f.attributes.uv;s.set(_.array,h*3),d&&o.set(d.array,h*3),g&&c.set(g.array,h*2),l&&(f.attributes.color?l.set(f.attributes.color.array,h*3):l.fill(1,h*3,(h+_.count)*3));const p=f.index;if(p)for(let m=0;m<p.count;m++)a[u++]=p.getX(m)+h;else for(let m=0;m<_.count;m++)a[u++]=m+h;h+=_.count}return e.setAttribute("position",new Rt(s,3)),e.setAttribute("normal",new Rt(o,3)),e.setAttribute("uv",new Rt(c,2)),l&&e.setAttribute("color",new Rt(l,3)),e.setIndex(new Rt(a,1)),e}const yf=.58;function Lx(r=7){const e=$t(90210),t=[];for(let n=0;n<r;n++){const i=.26+e()*.32,s=.045+e()*.03,o=(e()-.5)*.3,c=(e()-.5)*.3,l=4,a=[],h=[],u=[];for(let p=0;p<=l;p++){const m=p/l,x=m*i,v=s*(1-m*.9)*.5,y=o*m*m,b=c*m*m;a.push(-v+y,x,b),a.push(v+y,x,b),h.push(0,m,1,m)}for(let p=0;p<l;p++){const m=p*2,x=p*2+1,v=p*2+2,y=p*2+3;u.push(m,v,x,x,v,y)}const f=new wt;f.setAttribute("position",new Je(a,3)),f.setAttribute("uv",new Je(h,2)),f.setIndex(u),f.computeVertexNormals();const _=.82+e()*.34,d=e(),g=new Float32Array(a.length);for(let p=0;p<a.length/3;p++){const m=Oi.clamp(a[p*3+1]/yf,0,1);g[p*3]=(.19+m*.36+d*.06)*_,g[p*3+1]=(.33+m*.5)*_,g[p*3+2]=(.12+m*.24+(1-d)*.05)*_}f.setAttribute("color",new Rt(g,3)),f.rotateZ((e()-.5)*.4),f.rotateY(e()*Math.PI*2),t.push(f)}return Px(t)}function lu(r=1){const e=new dt,t=$t(Math.floor(r*1e4)+77),n=2.6*r,i=new z(new Me(.13*r,.34*r,n,9),an(4863784,.95));i.position.y=n/2,i.rotation.z=(t()-.5)*.09,i.castShadow=!0,i.receiveShadow=!0,e.add(i);for(let a=0;a<4;a++){const h=a/4*Math.PI*2+t()*.4,u=(.85+t()*.6)*r,f=new z(new Me(.045*r,.11*r,u,6),an(4535333,.95));f.position.set(Math.cos(h)*.2*r,n*(.68+a*.07),Math.sin(h)*.2*r),f.rotation.set(Math.cos(h)*.75,0,-Math.sin(h)*.75),f.castShadow=!0,e.add(f)}const s=new z(new Me(.4*r,.52*r,.34*r,9),an(4338463,.95));s.position.y=.14*r,s.receiveShadow=!0,e.add(s);const o=[4160847,4885593,3500867,5609834,3104825],c=n+.4*r,l=[[0,.15,0,1.15],[.65,-.15,.28,.82],[-.62,-.08,-.34,.8],[.2,.7,-.14,.9],[-.28,.58,.56,.72],[.38,.48,-.6,.68],[-.1,1.1,.08,.6]];for(const[a,h,u,f]of l){const _=new oe({color:o[Math.floor(t()*o.length)],roughness:.86,metalness:.02,flatShading:!0}),d=new z(new hi(f*r,1),_);d.position.set(a*r,c+h*r,u*r),d.rotation.set(t()*Math.PI,t()*Math.PI,t()*Math.PI),d.scale.set(1,.86+t()*.2,1),d.castShadow=!0,e.add(d)}return e}function hu(r=1){const e=new dt,t=$t(Math.floor(r*7919)+13),n=1.5*r,i=new z(new Me(.1*r,.2*r,n,8),an(4009506,.9));i.position.y=n/2,i.castShadow=!0,e.add(i);const s=6;for(let o=0;o<s;o++){const c=o/(s-1),l=(1.25-c*.85)*r,a=(1.15-c*.3)*r,h=new ce(2050615).offsetHSL(0,0,(t()-.5)*.06),u=new z(new qt(l,a,9),new oe({color:h,roughness:.8,metalness:.02,flatShading:!0}));u.position.y=(1.15+c*2.5)*r,u.rotation.y=t()*Math.PI,u.castShadow=!0,e.add(u)}return e}function Ix(r=1){const e=new dt,t=$t(Math.floor(r*31337)+5),n=[3828549,4487759,3103290,5080407],i=4+Math.floor(t()*3);for(let s=0;s<i;s++){const o=(.32+t()*.3)*r,c=new z(new hi(o,1),new oe({color:n[Math.floor(t()*n.length)],roughness:.88,metalness:.02,flatShading:!0})),l=t()*Math.PI*2,a=t()*.45*r;c.position.set(Math.cos(l)*a,o*.72,Math.sin(l)*a),c.rotation.set(t()*Math.PI,t()*Math.PI,t()*Math.PI),c.castShadow=!0,e.add(c)}return e}function Dx(r=1){const e=new dt,t=$t(Math.floor(r*6151)+29),n=[15913547,15695784,15790320,12160240,15897419],i=3+Math.floor(t()*3);for(let s=0;s<i;s++){const o=(.28+t()*.28)*r,c=n[Math.floor(t()*n.length)],l=t()*Math.PI*2,a=t()*.22*r,h=Math.cos(l)*a,u=Math.sin(l)*a,f=new z(new Me(.012*r,.016*r,o,4),new oe({color:4880954,roughness:.9}));f.position.set(h,o/2,u);const _=new z(new ol(.075*r,6),new oe({color:c,roughness:.75,metalness:0,side:St,emissive:c,emissiveIntensity:.06}));_.position.set(h,o,u),_.rotation.x=-Math.PI/2+(t()-.5)*.6,e.add(f,_)}return e}function Nx(r=1){const e=new dt,t=$t(Math.floor(r*4111)+3),n=new oe({color:7311178,roughness:.9,side:St,flatShading:!0});for(let i=0;i<5;i++){const s=(.8+t()*.9)*r,o=new z(new rn(.07*r,s),n);o.position.set((t()-.5)*.35*r,s/2,(t()-.5)*.35*r),o.rotation.set((t()-.5)*.3,t()*Math.PI,(t()-.5)*.3),o.castShadow=!0,e.add(o)}return e}function Ux(r=1){const e=$t(Math.floor(r*2027)+11),t=(1.6+e()*1.4)*r,n=new z(new Me(.16*r,.19*r,t,8),an(5258025,.95));return n.rotation.z=Math.PI/2,n.rotation.y=e()*Math.PI,n.position.y=.16*r,n.castShadow=!0,n.receiveShadow=!0,n}function ao(r=1){const e=$t(Math.floor(r*9973)+17),t=new Rn(.55*r,0),n=t.attributes.position;for(let o=0;o<n.count;o++){const c=.82+e()*.36;n.setXYZ(o,n.getX(o)*c,n.getY(o)*(c*.8),n.getZ(o)*c)}t.computeVertexNormals();const i=new ce(6975608).offsetHSL(0,0,(e()-.5)*.1),s=new z(t,new oe({color:i,roughness:.92,metalness:.03,flatShading:!0}));return s.castShadow=!0,s.receiveShadow=!0,s}function Mf(r){const e=new dt,t=new z(new Me(.06,.08,1.4,8),an(3621201,.6));t.position.y=.7;const n=new z(new de(.35,.45,.35),Io(r,.5));n.position.y=1.55;const i=new Mn(r,.8,6);return i.position.y=1.55,e.add(t,n,i),e}const uu={forest:{primary:2051382,secondary:3462041,accent:7268279,crystal:4906624,ground:1717032},coast:{primary:1981023,secondary:3718648,accent:8246268,crystal:6333946,ground:1715778},library:{primary:3878751,secondary:10980346,accent:12891645,crystal:9133302,ground:2762048},market:{primary:4863776,secondary:16498468,accent:16569165,crystal:16096779,ground:4010016},temple:{primary:4857912,secondary:16020150,accent:16361684,crystal:15485081,ground:3481648},plains:{primary:3359061,secondary:9741240,accent:13358561,crystal:6583435,ground:2765888}};function br(r){return uu[r]??uu.plains}function Sf(r,e,t){const n=new z(new Me(.35,.55,1.6,16),an(6045747,.75));n.position.y=1.1,n.castShadow=!0;const i=new z(new He(1.1,.14,10,24,Math.PI),an(4876097,.7));i.rotation.z=Math.PI,i.position.y=2.2;const s=new z(new hi(.95,1),t);return s.position.y=3.5,s.castShadow=!0,r.add(n,i,s),s}function Fx(r,e,t){const n=new z(new de(2.2,.2,1.4),an(7035466,.65));n.position.set(0,.55,.4);const i=new z(new Me(.45,.6,2.8,16),an(13358561,.45));i.position.y=1.8,i.castShadow=!0;const s=new z(new je(.75,1),t);s.position.y=3.6;const o=new Mn(e.crystal,1.2,10);return o.position.y=3.6,r.add(n,i,s,o),s}function Ox(r,e,t){const n=new z(new de(2.6,.5,2.2),an(10265519,.35));n.position.y=.55;const i=new z(new qt(1.8,1.2,4),new oe({color:e.primary,roughness:.4,metalness:.2}));i.position.y=1.4,i.rotation.y=Math.PI/4;const s=new z(new Me(.12,.15,2.2,12),an(13751771,.3));s.position.set(-.9,1.3,0);const o=s.clone();o.position.x=.9;const c=new z(new ll(.55,.16,64,12),t);return c.position.y=3.2,r.add(n,i,s,o,c),c}function Bx(r,e,t){const n=new z(new de(2.4,.15,1.8),an(9136404,.7));n.position.y=.55;const i=new z(new Me(0,1.6,.9,4),new oe({color:e.secondary,roughness:.55,side:St}));i.position.y=1.8,i.rotation.y=Math.PI/4;const s=new z(new Rn(.8,0),t);s.position.y=3.1;const o=Mf(e.accent);return o.position.set(1.1,0,.6),r.add(n,i,s,o),s}function zx(r,e,t){const n=new z(new de(3,.25,2.4),an(10322313,.55));n.position.y=.5;const i=new z(new Me(.25,.4,3.2,8),an(12887477,.4));i.position.y=2.1,i.castShadow=!0;const s=new z(new He(1.3,.06,8,40),new oe({color:e.accent,emissive:e.accent,emissiveIntensity:.6,metalness:.8,roughness:.2}));s.rotation.x=Math.PI/2,s.position.y=3.8;const o=new z(new je(.9,2),t);return o.position.y=4.5,r.add(n,i,s,o),o}const kx={forest:Sf,coast:Fx,library:Ox,market:Bx,temple:zx};function Gx(r,e){const t=br(r.theme),n=new dt,i=r.unlocked,s=i?1:.45,o=new z(new Me(2.4,2.8,.35,24),new oe({color:t.ground,roughness:.55,metalness:.12,transparent:!i,opacity:s}));o.position.y=.18,o.receiveShadow=!0;const c=new z(new He(2.1,.08,12,48),new oe({color:t.secondary,emissive:t.accent,emissiveIntensity:i?.35:.08,roughness:.3,metalness:.55,transparent:!i,opacity:s}));c.rotation.x=Math.PI/2,c.position.y=.38,n.add(o,c);const l=Io(i?t.crystal:7041664,r.cleared?.85:i?.55:.12),a=(kx[r.theme]??Sf)(n,t,l);if(a.userData.isCrystal=!0,e){const h=new z(new Hi(2.3,2.55,48),new Ct({color:16498468,transparent:!0,opacity:.55,side:St}));h.rotation.x=-Math.PI/2,h.position.y=.42,h.userData.isPulse=!0,n.add(h);const u=new ul(16774358,i?2.2:.4,18,Math.PI/5,.4);u.position.set(0,8,2),u.target.position.set(0,2,0),n.add(u,u.target)}if(r.cleared){const h=new z(new he(3.2,24,24),new Ct({color:t.accent,transparent:!0,opacity:.07,depthWrite:!1}));h.position.y=2,n.add(h)}if(r.dueCount&&r.dueCount>0&&i){const h=new z(new Hi(2.65,2.9,48),new Ct({color:16498468,transparent:!0,opacity:.42,side:St}));h.rotation.x=-Math.PI/2,h.position.y=.5,h.userData.isDueRing=!0,n.add(h)}return n}let Ra=null;async function Vx(){return Ra||(Ra=await mf()),Ra}function Hx(r,e){const t=br(e.theme),n=e.unlocked,i=n?1:.45,s=new z(new Me(2.4,2.8,.35,24),new oe({color:t.ground,roughness:.55,metalness:.12,transparent:!n,opacity:i}));s.position.y=.18,s.receiveShadow=!0;const o=new z(new He(2.1,.08,12,48),new oe({color:t.secondary,emissive:t.accent,emissiveIntensity:n?.35:.08,roughness:.3,metalness:.55,transparent:!n,opacity:i}));o.rotation.x=Math.PI/2,o.position.y=.38,r.add(s,o)}function Wx(r,e,t,n,i){if(t){const s=new z(new Hi(2.3,2.55,48),new Ct({color:16498468,transparent:!0,opacity:.55,side:St}));s.rotation.x=-Math.PI/2,s.position.y=.42,s.userData.isPulse=!0,r.add(s);const o=new ul(16774358,n?2.2:.4,18,Math.PI/5,.4);o.position.set(0,8,2),o.target.position.set(0,2,0),r.add(o,o.target)}if(e.cleared){const s=new z(new he(3.2,24,24),new Ct({color:i.accent,transparent:!0,opacity:.07,depthWrite:!1}));s.position.y=2,r.add(s)}if(e.dueCount&&e.dueCount>0&&n){const s=new z(new Hi(2.65,2.9,48),new Ct({color:16498468,transparent:!0,opacity:.42,side:St}));s.rotation.x=-Math.PI/2,s.position.y=.5,s.userData.isDueRing=!0,r.add(s)}}function fu(r,e){const t=br(r.theme),n=new z(new hi(.85,1),Io(r.unlocked?t.crystal:7041664,.65));return n.position.y=3.6,n.castShadow=!0,n.userData.isCrystal=!0,e.add(n),n}function Xx(r){let e=null;return r.traverse(t=>{var i;if(e)return;const n=t;(i=n.userData)!=null&&i.isCrystal&&(e=n)}),e}async function qx(r,e){var l,a,h;const t=await Vx(),n=br(r.theme),i=r.name.includes("学习圣所"),s=t&&!i?((l=t.nodes)==null?void 0:l[r.id])??((a=t.themes)==null?void 0:a[r.theme])??null:null;if(t&&s){const u=await bx(s.file,s,t);if(u){const f=new dt;Hx(f,r),u.position.y=.35,f.add(u);const _=s.pickMeshNames??((h=t.defaults)==null?void 0:h.pickMeshNames)??["Crystal","PICK"];let d=Sx(u,_);return d?d.userData.isCrystal=!0:d=fu(r,f),Wx(f,r,e,r.unlocked,n),{root:f,crystal:d}}}const o=Gx(r,e),c=Xx(o)??fu(r,o);return{root:o,crystal:c}}function du(r,e,t){const n=new dt,i=.4,s=.38,o=.14,c=.115,l=new z(new Ti(o,i,5,10),r);l.position.y=-.24200000000000002,l.castShadow=!0,n.add(l);const a=new dt;a.position.y=-.42800000000000005,n.add(a);const h=new z(new Ti(c,s,5,10),e);h.position.y=-.2245,h.castShadow=!0,a.add(h);const u=new z(new de(.18,.1,.36),t);return u.position.set(0,-.426,.08),u.castShadow=!0,a.add(u),{hip:n,knee:a}}function pu(r,e,t){const n=new dt,i=new z(new Ti(t.upperR,t.upperLen,5,10),r);i.position.y=-(t.upperLen/2+t.upperR),i.castShadow=!0,n.add(i);const s=-(t.upperLen+t.upperR*2),o=new z(new Ti(t.lowerR,t.lowerLen,5,10),e);o.position.y=s-(t.lowerLen/2+t.lowerR),o.castShadow=!0,n.add(o);const c=s-(t.lowerLen+t.lowerR*2);if(t.footMat){const l=new z(new de(t.lowerR*2.1,.1,.34),t.footMat);l.position.set(0,c+.04,.08),l.castShadow=!0,n.add(l)}else if(t.endMat&&t.endR){const l=new z(new he(t.endR,12,10),t.endMat);l.position.y=c,l.castShadow=!0,n.add(l)}return n}function Yx(){const r=new dt;r.name="Explorer";const e=new oe({color:3100538,roughness:.62,metalness:.08}),t=new oe({color:2765632,roughness:.78,metalness:.04}),n=new oe({color:15713440,roughness:.66,metalness:.02}),i=new oe({color:1713456,roughness:.7,metalness:.06}),s=new oe({color:2759958,roughness:.8,metalness:.02}),o=new oe({color:6000111,roughness:.4,metalness:.3,emissive:1784440,emissiveIntensity:.4}),c=new z(new de(.46,.26,.3),t);c.position.y=.98,c.castShadow=!0,r.add(c);const l=new z(new Ti(.3,.4,6,14),e);l.position.y=1.32,l.scale.set(1.12,1,.78),l.castShadow=!0,r.add(l);const a=new z(new He(.26,.04,8,20),o);a.position.y=1.52,a.rotation.x=Math.PI/2,a.scale.set(1.05,.7,1),r.add(a);const h=new z(new de(.5,.08,.34),o);h.position.y=1.1,r.add(h);const u=new z(new de(.4,.5,.22),e);u.position.set(0,1.34,-.32),u.castShadow=!0;const f=new z(new de(.42,.12,.24),o);f.position.set(0,1.5,-.32),r.add(u,f);const _=new dt;_.position.y=1.6;const d=new z(new Me(.1,.12,.14,10),n);d.position.y=.04;const g=new z(new he(.23,22,22),n);g.position.y=.28,g.castShadow=!0;const p=new z(new he(.245,18,14,0,Math.PI*2,0,Math.PI*.62),s);p.position.y=.31,_.add(d,g,p);const m=new oe({color:1450028,roughness:.3,metalness:.1}),x=new he(.035,10,10),v=new z(x,m);v.position.set(.085,.3,.205);const y=new z(x,m);y.position.set(-.085,.3,.205);const b=new oe({color:2759958,roughness:.8}),S=new z(new de(.26,.03,.04),b);S.position.set(0,.37,.2);const w=new oe({color:8011824,roughness:.6}),M=new z(new de(.11,.022,.03),w);M.position.set(0,.2,.216),_.add(v,y,S,M),r.add(_);const T=new dt;T.position.set(0,1.52,-.16);const A=new oe({color:3894230,roughness:.6,metalness:.1,side:St,emissive:1320798,emissiveIntensity:.25}),L=new z(new rn(.66,.95,1,5),A);L.position.y=-.45,L.castShadow=!0,T.add(L),T.rotation.x=-.18,r.add(T);const I=du(t,t,i);I.hip.position.set(.16,.88,0);const N=du(t,t,i);N.hip.position.set(-.16,.88,0),r.add(I.hip,N.hip);const B=pu(e,e,{upperR:.1,upperLen:.26,lowerR:.088,lowerLen:.24,endMat:n,endR:.095});B.position.set(.42,1.5,0);const U=pu(e,e,{upperR:.1,upperLen:.26,lowerR:.088,lowerLen:.24,endMat:n,endR:.095});U.position.set(-.42,1.5,0),r.add(B,U);const O=new z(new he(.12,14,14),Io(16498468,.9));O.position.set(-.5,1,.12);const k=new Mn(16498468,1.2,10);k.position.copy(O.position),r.add(O,k);const J=new z(new Hi(.55,.74,36),new Ct({color:9684477,transparent:!0,opacity:.32,side:St}));J.rotation.x=-Math.PI/2,J.position.y=.03,J.userData.isFootRing=!0,r.add(J);const ae={leftLeg:I,rightLeg:N,leftArm:B,rightArm:U,head:_,cape:T,eyeL:v,eyeR:y,brow:S,mouth:M,mats:{jacket:e,trim:o,cape:A}};return r.userData.rig=ae,r}class Kx{constructor(){Y(this,"yaw",0);Y(this,"orbitAnchorYaw",0);Y(this,"pitch",.38);Y(this,"targetPos",new P);Y(this,"desiredPos",new P);Y(this,"dragElement");Y(this,"activePointerId",null);Y(this,"previousTouchAction","");Y(this,"isDragging",!1);Y(this,"lastX",0);Y(this,"downX",0);Y(this,"onPointerDown",e=>{var t;if(!(this.activePointerId!==null||e.pointerType==="mouse"&&e.button!==0)){this.activePointerId=e.pointerId,this.downX=e.clientX,this.lastX=e.clientX,this.isDragging=!1;try{(t=this.dragElement)==null||t.setPointerCapture(e.pointerId)}catch{}}});Y(this,"onPointerMove",e=>{if(e.pointerId!==this.activePointerId)return;const t=e.clientX-this.lastX;this.lastX=e.clientX,!this.isDragging&&Math.abs(e.clientX-this.downX)>10&&(this.isDragging=!0),this.isDragging&&this.addYaw(-t*.006)});Y(this,"onPointerEnd",e=>{e.pointerId===this.activePointerId&&(this.activePointerId=null,this.isDragging=!1)})}addYaw(e){this.yaw+=e}resetBehind(e){this.yaw=e,this.orbitAnchorYaw=e}update(e,t,n,i,s=!0,o){if(s&&!this.isDragging)this.yaw+=(n-this.yaw)*Math.min(1,i*2.5);else if(!s){const _=Math.atan2(Math.sin(this.yaw-this.orbitAnchorYaw),Math.cos(this.yaw-this.orbitAnchorYaw));this.yaw=this.orbitAnchorYaw+Oi.clamp(_,-1.05,1.05)}const c=Math.cos(this.yaw),l=Math.sin(this.yaw),a=!s&&!!o,h=a?o:t,u=a?Cl+8:Cl,f=Df+Math.sin(this.pitch)*3;return this.desiredPos.set(h.x-l*u,h.y+f,h.z-c*u),e.position.lerp(this.desiredPos,1-Math.exp(-5*i)),this.targetPos.copy(h),a||(this.targetPos.y+=1.55),e.lookAt(this.targetPos),this.yaw}bindDrag(e){this.disposeDrag(),this.dragElement=e,this.previousTouchAction=e.style.touchAction,e.style.touchAction="none",e.addEventListener("pointerdown",this.onPointerDown),e.addEventListener("pointermove",this.onPointerMove),e.addEventListener("pointerup",this.onPointerEnd),e.addEventListener("pointercancel",this.onPointerEnd),e.addEventListener("lostpointercapture",this.onPointerEnd)}disposeDrag(){const e=this.dragElement;e&&(e.removeEventListener("pointerdown",this.onPointerDown),e.removeEventListener("pointermove",this.onPointerMove),e.removeEventListener("pointerup",this.onPointerEnd),e.removeEventListener("pointercancel",this.onPointerEnd),e.removeEventListener("lostpointercapture",this.onPointerEnd),this.activePointerId!==null&&e.hasPointerCapture(this.activePointerId)&&e.releasePointerCapture(this.activePointerId),this.activePointerId=null,this.isDragging=!1,e.style.touchAction=this.previousTouchAction,this.dragElement=void 0)}}const jx=new Set(["w","a","s","d","arrowup","arrowdown","arrowleft","arrowright"]);class Jx{constructor(){Y(this,"position",new P);Y(this,"yaw",0);Y(this,"moveTarget",null);Y(this,"keys",new Set);Y(this,"stick",{x:0,z:0});Y(this,"enabled",!0);Y(this,"sprint",!1);Y(this,"onKeyDown",e=>{if(!this.enabled)return;const t=e.key.toLowerCase();jx.has(t)&&this.keys.add(t),t==="shift"&&(this.sprint=!0)});Y(this,"onKeyUp",e=>{const t=e.key.toLowerCase();this.keys.delete(t),t==="shift"&&(this.sprint=!1)});window.addEventListener("keydown",this.onKeyDown),window.addEventListener("keyup",this.onKeyUp)}dispose(){window.removeEventListener("keydown",this.onKeyDown),window.removeEventListener("keyup",this.onKeyUp)}setEnabled(e){this.enabled=e,e||(this.keys.clear(),this.moveTarget=null)}setPosition(e,t,n){this.position.set(e,t,n),this.moveTarget=null}setMoveTarget(e,t){this.moveTarget=new P(e,0,t)}clearMoveTarget(){this.moveTarget=null}setStickInput(e,t){this.stick.x=e,this.stick.z=t,(Math.abs(e)>.12||Math.abs(t)>.12)&&(this.moveTarget=null)}isMoving(){return this.keys.size>0||this.moveTarget!==null||Math.abs(this.stick.x)>.1||Math.abs(this.stick.z)>.1}update(e,t){if(!this.enabled)return;let n=0,i=0;if(this.moveTarget){const s=new P().subVectors(this.moveTarget,this.position);s.y=0,s.length()<.45?this.moveTarget=null:(s.normalize(),n=s.x,i=s.z,this.yaw=Math.atan2(n,i))}else{let s=(this.keys.has("w")||this.keys.has("arrowup")?1:0)-(this.keys.has("s")||this.keys.has("arrowdown")?1:0),o=(this.keys.has("d")||this.keys.has("arrowright")?1:0)-(this.keys.has("a")||this.keys.has("arrowleft")?1:0);if((Math.abs(this.stick.x)>.1||Math.abs(this.stick.z)>.1)&&(s=this.stick.z,o=this.stick.x),s!==0||o!==0){const c=Math.sin(t),l=Math.cos(t);n=o*l+s*c,i=o*-c+s*l;const a=Math.hypot(n,i)||1;n/=a,i/=a,this.yaw=Math.atan2(n,i)}}if(n!==0||i!==0){const s=Nf*(this.sprint?1.85:1)*e;this.position.x+=n*s,this.position.z+=i*s}this.position.y=Ft(this.position.x,this.position.z,It)+.05}isSprinting(){return this.sprint&&this.isMoving()}}function Zx(r,e){const t=document.createElement("canvas");t.width=512,t.height=128;const n=t.getContext("2d");n.fillStyle=e?"rgba(8, 18, 40, 0.72)":"rgba(40, 40, 40, 0.55)",mu(n,8,8,496,112,20),n.fill(),n.strokeStyle=e?"rgba(147, 197, 253, 0.55)":"rgba(120, 120, 120, 0.4)",n.lineWidth=3,mu(n,8,8,496,112,20),n.stroke(),n.fillStyle=e?"#f3f4f6":"#9ca3af",n.font="bold 28px 'Noto Sans SC', 'Microsoft YaHei', sans-serif";const i=r.length>22?r.slice(0,21)+"…":r;n.fillText(i,24,72);const s=new In(t);s.colorSpace=Mt;const o=new bi({map:s,transparent:!0,depthWrite:!1}),c=new Ni(o);return c.scale.set(10,2.5,1),c.position.y=7.2,c.userData.isSignpost=!0,c}function mu(r,e,t,n,i,s){r.beginPath(),r.moveTo(e+s,t),r.lineTo(e+n-s,t),r.quadraticCurveTo(e+n,t,e+n,t+s),r.lineTo(e+n,t+i-s),r.quadraticCurveTo(e+n,t+i,e+n-s,t+i),r.lineTo(e+s,t+i),r.quadraticCurveTo(e,t+i,e,t+i-s),r.lineTo(e,t+s),r.quadraticCurveTo(e,t,e+s,t),r.closePath()}const $x={unit01:{id:"unit01",label:"数字时代",skyTop:399139,skyMid:1457227,skyBot:7050883,fogColor:4877153,fogDensity:.0026,sunColor:12380115,sunIntensity:1.25,sunDiscScale:20,sunDiscOpacity:.24,sunFocusedDiscScale:24,sunFocusedDiscOpacity:.32,hemiSky:8108723,hemiGround:2177584,ambientColor:4949377,terrainTint:[.06,.42,.1],crystalColor:5286143,orbColor:3531726,glowColor:1609617,pathColor:2391683,decorStyle:"coast",ground:{grass:6060133,dirt:8942682,rock:7634043}},unit02:{id:"unit02",label:"传记人物",skyTop:4216427,skyMid:10195583,skyBot:14469544,fogColor:9800311,fogDensity:.0024,sunColor:16767398,sunIntensity:1.5,hemiSky:14865855,hemiGround:6443844,ambientColor:10982775,terrainTint:[.34,.28,.19],crystalColor:12158786,orbColor:14861696,glowColor:10317105,pathColor:7755311,decorStyle:"market",ground:{grass:9081941,dirt:9268551,rock:9208434},focusedLandscapeScale:.86,focusedLandscapeOffsetZ:7},unit03:{id:"unit03",label:"旅行探索",skyTop:1254700,skyMid:4811098,skyBot:9545621,fogColor:5992549,fogDensity:.0028,sunColor:16765345,sunIntensity:1.2,hemiSky:11388607,hemiGround:4014131,ambientColor:9018504,terrainTint:[.15,.23,.13],crystalColor:8631946,orbColor:12112526,glowColor:7448204,pathColor:5467990,decorStyle:"forest",ground:{grass:5012810,dirt:7166012,rock:6450276}},unit04:{id:"unit04",label:"劳动传统",skyTop:1907482,skyMid:5326395,skyBot:8615781,fogColor:5129275,fogDensity:.0028,sunColor:16766624,sunIntensity:1.25,hemiSky:13351073,hemiGround:3485481,ambientColor:9206116,terrainTint:[.2,.15,.1],crystalColor:13211224,orbColor:14991228,glowColor:11827778,pathColor:7822656,decorStyle:"temple",ground:{grass:8027206,dirt:8216381,rock:7432540}},unit05:{id:"unit05",label:"航天探索",skyTop:1120556,skyMid:3427178,skyBot:7439252,fogColor:5333879,fogDensity:.0026,sunColor:14018047,sunIntensity:1.15,hemiSky:10992338,hemiGround:3356999,ambientColor:7571880,terrainTint:[.2,.21,.25],crystalColor:9682408,orbColor:14412543,glowColor:7973087,pathColor:5401992,decorStyle:"space",ground:{grass:9343645,dirt:8159112,rock:10265261}},unit06:{id:"unit06",label:"共益交易城",skyTop:1059642,skyMid:4287600,skyBot:6323577,fogColor:3427666,fogDensity:.0028,sunColor:16765850,sunIntensity:1.25,hemiSky:10207178,hemiGround:4207917,ambientColor:7903642,terrainTint:[.085,.13,.125],crystalColor:14001007,orbColor:8243632,glowColor:5152657,pathColor:3501415,decorStyle:"exchange",ground:{grass:6061406,dirt:8217929,rock:7171429}}},Dc={id:"default",label:"",skyTop:3824266,skyMid:5929642,skyBot:659488,fogColor:1713472,fogDensity:.0042,sunColor:16774368,sunIntensity:1.45,hemiSky:13164799,hemiGround:2373672,ambientColor:10137804,terrainTint:[.09,.2,.1],crystalColor:6333946,orbColor:8438015,glowColor:4231406,pathColor:3170464,decorStyle:"forest",ground:{grass:5012810,dirt:7166012,rock:6450276}};function Qx(r){return r?$x[r]??Dc:Dc}function ev(r){if(r.ground)return r.ground;const[e,t,n]=r.terrainTint,i=new ce(e,t,n),s={h:0,s:0,l:0};i.getHSL(s);const o=new ce().setHSL(s.h,Math.min(1,s.s*.85+.28),.34),c=new ce().setHSL((s.h+.07)%1,Math.min(1,s.s*.5+.18),.33),l=new ce().setHSL(s.h,Math.min(1,s.s*.16),.46);return{grass:o.getHex(),dirt:c.getHex(),rock:l.getHex()}}function Nc(r,e=Mt,t=1024){const n=document.createElement("canvas");n.width=t,n.height=t,r(n.getContext("2d"),t);const i=new In(n);return i.wrapS=i.wrapT=ki,i.colorSpace=e,i.generateMipmaps=!0,i.minFilter=Vn,i}function tv(){const r=$t(20260616),e=Nc((n,i)=>{n.fillStyle="#9a9a9a",n.fillRect(0,0,i,i);for(let s=0;s<60;s++){const o=r()*i,c=r()*i,l=30+r()*120,a=110+r()*110,h=n.createRadialGradient(o,c,0,o,c,l);h.addColorStop(0,`rgba(${a},${a},${a},0.5)`),h.addColorStop(1,"rgba(0,0,0,0)"),n.fillStyle=h,n.beginPath(),n.arc(o,c,l,0,Math.PI*2),n.fill()}for(let s=0;s<14e3;s++){const o=120+r()*100;n.fillStyle=`rgba(${o},${o},${o},0.5)`,n.fillRect(r()*i,r()*i,1.5,1.5)}},kn),t=Nc((n,i)=>{n.fillStyle="#8080ff",n.fillRect(0,0,i,i);for(let s=0;s<12e3;s++){const o=96+r()*64,c=96+r()*64;n.fillStyle=`rgb(${o|0},${c|0},255)`;const l=1.5+r()*2.5;n.fillRect(r()*i,r()*i,l,l)}for(let s=0;s<40;s++){const o=r()*i,c=r()*i,l=24+r()*90,a=n.createRadialGradient(o,c,0,o,c,l);a.addColorStop(0,`rgba(${100+r()*50|0},${100+r()*50|0},255,0.4)`),a.addColorStop(1,"rgba(128,128,255,0)"),n.fillStyle=a,n.beginPath(),n.arc(o,c,l,0,Math.PI*2),n.fill()}},kn);return e.repeat.set(14,18),t.repeat.set(14,18),{roughness:e,normal:t}}function nv(){const r=$t(20261015),e=Nc((t,n)=>{t.fillStyle="#dcd9cd",t.fillRect(0,0,n,n);for(let i=0;i<130;i++){const s=r()*n,o=r()*n,c=36+r()*150,a=r()>.55?"156,132,98":"116,138,100",h=.045+r()*.085,u=t.createRadialGradient(s,o,0,s,o,c);u.addColorStop(0,`rgba(${a},${h})`),u.addColorStop(1,`rgba(${a},0)`),t.fillStyle=u,t.beginPath(),t.arc(s,o,c,0,Math.PI*2),t.fill()}for(let i=0;i<6e3;i++){const s=r()*n,o=r()*n,c=3+r()*7,l=-Math.PI/2+(r()-.5)*1.3,a=r()>.5;t.strokeStyle=a?`rgba(232,236,214,${.1+r()*.2})`:`rgba(84,100,72,${.08+r()*.17})`,t.lineWidth=.8+r()*1.2,t.beginPath(),t.moveTo(s,o),t.lineTo(s+Math.cos(l)*c,o+Math.sin(l)*c),t.stroke()}for(let i=0;i<1100;i++){const s=r()*n,o=r()*n,c=.8+r()*2.2,l=168+r()*60;t.fillStyle=`rgba(${l|0},${l-4|0},${l-12|0},${.2+r()*.35})`,t.beginPath(),t.arc(s,o,c,0,Math.PI*2),t.fill()}for(let i=0;i<260;i++){const s=r()*n,o=r()*n;t.strokeStyle=`rgba(170,150,104,${.2+r()*.3})`,t.lineWidth=1+r()*1.4,t.beginPath(),t.moveTo(s,o),t.lineTo(s+(r()-.5)*8,o+(r()-.5)*8),t.stroke()}},Mt,1024);return e.repeat.set(56,68),e.anisotropy=8,e}const iv={unit01:{section_a:["message","dialogue","focus","listening-bench"],section_b:["notification","study-desk","filter","offline-rest"],section_c:["clinic","telemedicine","community","community-network"]},unit02:{section_a:["timeline","route-evidence","perseverance","legacy"],section_b:["spotlight","humanitarian","lasting-service","community-witness"],section_c:["fleet","peace-contact","chart-room","exchange-harbor"]},unit03:{section_a:["itinerary","detour","market-encounter","reflection-garden"],section_b:["hostel","open-route","rain-shelter","confidence"],section_c:["rail-platform","rail-car","landscape-window","route-network"]},unit04:{section_a:["career","bench","violin","work-dignity"],section_b:["caliper","craft-quality","craft-evolution","trust-bridge"],section_c:["loom","embroidery-table","heritage","living-heritage"]},unit05:{section_a:["lunar-probe","relay-bridge","sample-lab","moon-horizon"],section_b:["test-console","orbit-adjustment","systems-simulation","mission-control"],section_c:["training","crew-simulation","science-exhibit","future-frontier"]},unit06:{section_a:["bookshop","exchange","resilience","budget-board"],section_b:["exchange-wall","resource-cycle","trust-ledger","sustainable-market"],section_c:["library","digital-lending","community-library","knowledge-bridge"]}};function sv(r,e,t,n){const i=new dt;i.name=["unit-landscape",r.id,t??"hub"].join("-");const s=ov(r,t),o=new ce(s.accent),c=new ce(s.secondary),l=new ce(...r.terrainTint);l.multiplyScalar(.88);const a=new oe({color:l,roughness:.72,metalness:.16}),h=new oe({color:3426398,roughness:.84,metalness:.12}),u=new oe({color:c,emissive:c,emissiveIntensity:1.2,roughness:.2,metalness:.36}),f=new oe({color:o,emissive:o,emissiveIntensity:.75,roughness:.18,metalness:.42});if(h.fog=!1,u.fog=!1,f.fog=!1,Zt(t)&&(u.emissiveIntensity=.56,f.emissiveIntensity=.42,h.color.set(4610672),h.roughness=.86,h.metalness=.08),Zt(t)?rv(i,s.route,f):(lv(i,a,h,u,f),uv(i,h,u,f)),Zt(t)){const d=new dt;gu(d,t,n,a,h,u,f,o,r.id),d.scale.setScalar(.9),d.position.set(0,1.8,-15),i.add(d)}else gu(i,t,n,a,h,u,f,o,r.id)||hv(i,t,a,h,u,f);Zt(t)||cv(i,t,n,s.accent);const _=new dt;switch(r.decorStyle){case"coast":fv(_,h,u,f,Zt(t));break;case"market":r.id==="unit02"&&/^section_b-world-\d+$/.test(t??"")?pv(_,f):dv(_,a,h,u,f);break;case"forest":mv(_,a,u,f,Zt(t));break;case"temple":gv(_,a,h,u,f,Zt(t));break;case"space":_v(_,h,u,f,Zt(t));break;case"exchange":xv(_,a,h,u,f,Zt(t),t);break;default:vv(_,a,h,u,f);break}return Zt(t)?(_.scale.setScalar(r.focusedLandscapeScale??.72),_.position.z=r.focusedLandscapeOffsetZ??14):(_.scale.setScalar(.62),_.position.z=1.5),i.add(_),i.traverse(d=>{const g=d instanceof z&&!d.userData.noLandscapeShadow;d.castShadow=g,d.receiveShadow=g&&!Zt(t)}),i}function Zt(r){return!!(r&&(/^section_[abc]-world-\d+$/.test(r)||/^lab-vocab-\d+$/.test(r)||["lab-grammar","lab-cloze","lab-translation","project-reading","project-listening","project-writing","project-memory"].includes(r)))}function rv(r,e,t){const n=new oe({color:e,emissive:e,emissiveIntensity:.12,roughness:.62,metalness:.12});for(let i=0;i<5;i++){const s=1.8+i*2.1,o=.54+i*.32,c=new z(new de(5.2,.18,3.3),n);c.position.set(i%2===0?-.28:.28,o,s),c.rotation.y=i%2===0?-.035:.035,c.userData.isLandscapeRoute=!0,r.add(c);const l=new z(new je(.34,0),t);l.position.set(0,o+.42,s),l.userData.isLandscapeBeacon=!0,r.add(l)}}function ov(r,e){if(!e||e==="hub")return{accent:r.crystalColor,secondary:r.orbColor,route:r.pathColor};const t=e.match(/^(section_[abc])-world-(\d+)$/);if(t){const l={section_a:[{accent:6478079,secondary:12120575,route:2918143},{accent:7992016,secondary:12713968,route:2329464},{accent:16762218,secondary:16769443,route:10316573},{accent:16032511,secondary:16767339,route:10247423}],section_b:[{accent:7977215,secondary:12048639,route:3633083},{accent:11903231,secondary:14735359,route:6900418},{accent:6809765,secondary:12255189,route:2656598},{accent:16760184,secondary:16768948,route:10971945}],section_c:[{accent:16743282,secondary:16761210,route:14046034},{accent:16164541,secondary:16766692,route:11555446},{accent:8185807,secondary:13041648,route:3313017},{accent:16765802,secondary:16772522,route:10384424}]}[t[1]][(Number(t[2])-1)%4];return{accent:new ce(l.accent).lerp(new ce(r.crystalColor),.66).getHex(),secondary:new ce(l.secondary).lerp(new ce(r.orbColor),.56).getHex(),route:new ce(l.route).lerp(new ce(r.pathColor),.6).getHex()}}const n=e.match(/^lab-vocab-(\d+)$/);if(n){const c=[5625599,7659696,11903231,16760425,16748445,9353215],l=c[(Number(n[1])-1)%c.length];return{accent:new ce(l).lerp(new ce(r.crystalColor),.52).getHex(),secondary:r.orbColor,route:r.pathColor}}const s={"lab-grammar":{accent:8246268,secondary:14412542,route:3766200},"lab-cloze":{accent:8703150,secondary:13761253,route:2521693},"lab-translation":{accent:12887551,secondary:15785215,route:7819445},"project-reading":{accent:16763760,secondary:16772533,route:10777384},"project-listening":{accent:7723007,secondary:12251647,route:3636647},"project-writing":{accent:16754812,secondary:16768705,route:10442550},"project-memory":{accent:13869823,secondary:15850751,route:7491766}}[e];return s?{accent:new ce(s.accent).lerp(new ce(r.crystalColor),.58).getHex(),secondary:new ce(s.secondary).lerp(new ce(r.orbColor),.5).getHex(),route:new ce(s.route).lerp(new ce(r.pathColor),.58).getHex()}:{"section-a":{accent:6478079,secondary:12120575,route:2918143},"section-b":{accent:16762218,secondary:16769443,route:10316573},"stories-of-china":{accent:16743282,secondary:16761210,route:14046034},"learning-lab":{accent:9437118,secondary:8246268,route:3257214},"unit-project":{accent:16032511,secondary:16767339,route:10247423}}[e]??{accent:r.crystalColor,secondary:r.orbColor,route:r.pathColor}}function gu(r,e,t,n,i,s,o,c,l){var p,m;if(!e)return!1;const a=(x,v,y,b,S,w=0)=>{const M=new z(x,v);return M.position.set(y,b,S),M.rotation.y=w,r.add(M),M},h=(x=5.2)=>{const v=s.clone();Zt(e)&&(v.color.copy(c),v.emissive.copy(c),v.emissiveIntensity=.24,v.roughness=.42,v.metalness=.16);const y=a(new je(1.7,1),v,0,x,27);return y.userData.isLandscapeBeacon=!0,y},u=(x,v,y=Math.PI/2)=>{const b=a(new He(x,.16,8,40),o,0,v,27);return b.rotation.x=y,b.userData.isLandscapeRing=!0,b},f=e.match(/^(section_[abc])-world-(\d+)$/);if(f){const x=f[1],v=Number(f[2]),y=(t??"").split(" · ")[0],b=/connection|conversation|communication|dialogue|social/i.test(y),S=a(new Me(7.8,8.8,.48,8),i,0,.92,27);if(S.userData.isLandscapeStage=!0,l==="unit06"&&x==="section_a"&&v===1){const T=new oe({color:6441526,roughness:.78,metalness:.04});a(new de(9.2,4.8,.42),T,0,3.7,29);for(const k of[-4.2,4.2])a(new de(.42,5,.5),o,k,3.8,27.2);for(const k of[1.75,2.7,3.65,4.6])a(new de(7.9,.14,.6),n,0,k,27.15);const A=[15905643,8440756,10205679,14976898].map(k=>new oe({color:k,roughness:.72}));for(let k=0;k<3;k++)for(let J=0;J<8;J++){const ae=.42+(k+J)%3*.1,pe=a(new de(.42,ae,.34),A[(k*3+J)%A.length],-3.5+J,1.84+k*.95+ae/2,26.78);pe.userData.isLandscapeStage=!0}a(new de(6.2,.9,1.05),i,0,1.65,23.7),a(new de(6.45,.16,1.18),s,0,2.18,23.7);for(let k=0;k<3;k++){const J=a(new de(.92,.16,.7),A[k],-1.8+k*1.8,2.37,23.7);J.userData.isLandscapeStage=!0}const L=a(new de(10.2,.32,2.3),n,0,6.25,26.2);L.userData.isLandscapeStage=!0,a(new de(8.45,1.62,.18),T,0,5.55,27.02);const I=document.createElement("canvas");I.width=1024,I.height=192;const N=I.getContext("2d");if(N){N.fillStyle="#24483f",N.fillRect(0,0,I.width,I.height),N.strokeStyle="#d9b77a",N.lineWidth=8,N.strokeRect(12,12,I.width-24,I.height-24),N.fillStyle="#fff4dc",N.textAlign="center",N.textBaseline="middle",N.font="bold 68px Arial, sans-serif",N.fillText("BOOK EXCHANGE",512,67),N.font="bold 32px Arial, sans-serif",N.fillText("LEAVE ONE  ·  TAKE ONE",512,145);const k=new In(I);k.colorSpace=Mt;const J=new z(new rn(8.05,1.38),new Ct({map:k,side:St,toneMapped:!1}));J.position.set(0,5.55,26.88),J.rotation.y=Math.PI,r.add(J)}const B=new Mn(16768160,2.4,18,2);B.position.set(0,5.2,22.6),r.add(B);const U=new Wn([new P(-2.2,2.65,24.2),new P(0,3.3,25.4),new P(2.2,2.65,26.6)]),O=new z(new Pn(U,16,.065,7,!1),o);return O.userData.isLandscapeRoute=!0,r.add(O),!0}const w=(m=(p=iv[l])==null?void 0:p[x])==null?void 0:m[v-1];if(w&&w!=="bookshop"&&!(w==="dialogue"&&x==="section_a"&&v===1&&b))return av(r,w,a,n,i,s,o,h,u),!0;if(x==="section_a")if(v===1&&b){a(new de(6.2,.32,4.8),n,-1.9,4,27,-.12),a(new de(6.2,.32,4.8),s,1.9,4,27,.12);for(const I of[-1.9,1.9]){const N=a(new Me(.24,.34,2.7,8),i,I,2.5,27);N.userData.isLandscapeStage=!0}const T=(I,N,B,U)=>{const O=new yn;O.moveTo(-1.15,-.62),U?(O.lineTo(.22,-.62),O.lineTo(.62,-1.08),O.lineTo(.74,-.62)):(O.lineTo(-.72,-.62),O.lineTo(-.62,-1.08),O.lineTo(-.22,-.62)),O.lineTo(1.02,-.62),O.quadraticCurveTo(1.22,-.62,1.22,-.42),O.lineTo(1.22,.48),O.quadraticCurveTo(1.22,.68,1.02,.68),O.lineTo(-1.02,.68),O.quadraticCurveTo(-1.22,.68,-1.22,.48),O.lineTo(-1.22,-.42),O.quadraticCurveTo(-1.22,-.62,-1.15,-.62);const k=a(new Bi(O,{depth:.34,bevelEnabled:!0,bevelSegments:2,steps:1,bevelSize:.055,bevelThickness:.055,curveSegments:8}),B,I,N,26.7);k.userData.isLandscapeStage=!0};T(-2.1,5.6,o,!0),T(2.1,4.9,s,!1);const A=new oe({color:15857919,emissive:12183551,emissiveIntensity:.24,roughness:.34});for(const[I,N]of[[-2.1,5.6],[2.1,4.9]])for(const B of[-.38,0,.38])a(new he(.085,8,6),A,I+B,N,26.62);const L=new z(new Pn(new Wn([new P(-.9,5.25,26.7),new P(0,4.35,26.7),new P(.9,4.55,26.7)]),20,.08,6,!1),o);L.userData.isLandscapeRoute=!0,r.add(L)}else if(v===1){for(const T of[-3.6,3.6])a(new Me(.55,.82,5.6,8),n,T,3.8,27);a(new de(9,.32,.52),o,0,6.7,27),h(5.1),u(3.2,4.4,.18)}else if(v===2){for(const A of[-4,4])a(new Me(.62,.9,7.2,8),n,A,4.4,27);a(new de(10,.42,.5),o,0,8.2,27),h(4.9).scale.setScalar(.8),u(3.4,4.9,Math.PI/2.3)}else if(v===3){for(const T of[-1,1]){const A=a(new de(2.3,.32,10),n,T*2.8,1.35,27,T*.3);A.userData.isLandscapeRoute=!0}h(5.8),u(3.1,1.7)}else{for(const T of[-4.8,4.8])a(new Me(.72,1,8,8),o,T,4.8,27);a(new He(5,.22,8,40,Math.PI),s,0,8.8,27,Math.PI),h(5.2)}else if(x==="section_b")if(v===1){for(const[T,A]of[[-5,5],[0,8],[5,6]])a(new de(2.4,A,.5),n,T,A/2+1.1,27);for(const T of[3.2,5.8])a(new de(11,.16,.28),o,0,T,27);h(10)}else if(v===2)a(new Me(1.8,2.3,7.4,10),s,0,4.7,27),u(4.8,4.7,.42),u(4.8,4.7,-.42),h(9.2);else if(v===3)a(new Me(5.8,6.5,1,12),n,0,2,27),a(new he(4.2,16,8,0,Math.PI*2,0,Math.PI/2),o,0,2.5,27),a(new Me(1.1,1.6,6.2,8),i,0,5.4,27),h(9.4);else{a(new Me(.55,.9,5.5,8),i,0,3.4,27);const T=a(new de(12,.42,1.1),o,0,6.1,27,.06);T.userData.isLandscapeRoute=!0;for(const A of[-5,5]){const L=a(new he(1.2,12,8),s,A,6.8,27);L.userData.isLandscapeBeacon=!0}u(4.3,1.5)}else if(v===1){for(const[A,L,I]of[[5.8,2.3,8],[4.6,4.3,6],[3.3,6.1,5]])a(new Me(A,A+.55,.72,I),n,0,L,27);const T=a(new je(1.9,1),s,0,9,27);T.userData.isLandscapeBeacon=!0,u(2.8,9)}else if(v===2){for(const T of[0,Math.PI/2,Math.PI,Math.PI*3/2]){const A=Math.cos(T)*4.7,L=27+Math.sin(T)*4.7,I=a(new Me(.5,.78,5.8,8),n,A,3.8,L);I.userData.isLandscapeBeacon=!0;const N=a(new he(.72,10,8),s,A,7.1,L);N.userData.isLandscapeBeacon=!0}u(6,1.8),h(4.5)}else if(v===3){for(const A of[-5,5])a(new Me(.65,1,7.4,8),o,A,4.4,27);const T=a(new de(12,.4,2.6),n,0,3.2,27);T.userData.isLandscapeRoute=!0,a(new He(4.2,.18,8,36),s,0,7.5,27,Math.PI/2),h(5.2)}else{for(const[T,A]of[[-4,24],[4,24],[-4,30],[4,30]])a(new de(1.2,5.6,1.2),n,T,3.8,A);h(8.4),u(4.6,2)}return!0}const _=e.match(/^lab-vocab-(\d+)$/);if(_){const x=Number(_[1]),v={1:Array.from({length:5},(w,M)=>{const T=M/5*Math.PI*2;return[Math.cos(T)*5.1,27+Math.sin(T)*5.1]}),2:[[-6,30],[-3,28.5],[0,27],[3,25.5],[6,24]],3:[[-5.2,30],[-2.6,28.3],[0,26.2],[2.6,28.3],[5.2,30]],4:[[0,23.5],[-4.4,27],[0,27],[4.4,27],[0,30.5]],5:Array.from({length:5},(w,M)=>{const T=-Math.PI/2+M*1.12,A=1.8+M*.92;return[Math.cos(T)*A,27+Math.sin(T)*A]}),6:[[-4.5,24.4],[-4.5,29.6],[0,27],[4.5,24.4],[4.5,29.6]]},y=v[x]??v[1],b=[];for(let w=0;w<5;w++){const[M,T]=y[w],A=x===2?1.7+w*.55:x===3?[2.2,1.6,3.1,1.6,2.2][w]:x===6&&w===2?3.6:2.2+w%2*.65,L=x===2?new Me(.72,.95,A,7):x===5?new qt(.96,A,5):new de(1.35,A,1.35),I=a(L,n,M,1+A/2,T,w*.14);I.userData.isLandscapeStage=!0;const N=1+A+(x===6&&w===2?1.15:.9),B=a(new je(x===6&&w===2?1.15:.72,1),x===6&&w===2?o:s,M,N,T);B.userData.isLandscapeBeacon=!0,b.push(new P(M,N-.35,T))}if(x>1){const w=a(new Pn(new Wn(b),36,.055,6,!1),o,0,0,0);w.userData.isLandscapeRoute=!0}const S=a(new He(x===5?6.6:6.2,.075,7,40),o,0,.8,27);return S.rotation.x=Math.PI/2,!0}if(e==="lab-grammar"){if(l==="unit01"){const x=[],v=(A,L,I=.085)=>{const N=new Wn(A),B=a(new Pn(N,24,I,7,!1),L,0,0,0);B.userData.isLandscapeRoute=!0};for(const A of[-1,1]){const L=A*4.1,I=a(new Me(.68,.92,4.8,8),A<0?n:i,L,3.35,27);I.userData.isLandscapeStage=!0;const N=a(new je(.52,1),A<0?s:o,L,6.15,27);N.userData.isLandscapeBeacon=!0,v([new P(L,5.7,27),new P(A*2.5,6.35,26.5),new P(0,5.2,26.2)],A<0?s:o)}const y=a(new He(4.35,.13,8,40,Math.PI),o,0,5.35,27,Math.PI);y.scale.y=.55,y.userData.isLandscapeStage=!0;const b=a(new je(1.05,1),s,0,5.05,26.15);b.userData.isLandscapeBeacon=!0;for(let A=0;A<3;A++){const L=(A-1)*2.55,I=a(new Me(.62,.82,.38,6),n,L,1.28,23.6);I.userData.isLandscapeStage=!0;const N=a(new Rn(.42,0),A===1?o:s,L,2,23.6);N.userData.isLandscapeBeacon=!0,x.push(new P(L,2.35,23.6))}const S=a(new de(3.3,.28,1.28),i,0,2.72,23.6);S.userData.isLandscapeStage=!0;const w=a(new Me(.32,.48,1.25,8),o,0,3.5,23.6);w.userData.isLandscapeStage=!0;const M=a(new he(.38,12,8),s,0,4.25,23.6);M.userData.isLandscapeBeacon=!0,v([x[0],new P(-1.8,2.55,23.6),new P(0,2.5,23.6)],s,.065),v([x[2],new P(1.8,2.55,23.6),new P(0,2.5,23.6)],o,.065);const T=new oe({color:5020528,emissive:1522474,emissiveIntensity:.14,roughness:.9});for(const A of[-6.1,6.1])for(const L of[24.4,29.6]){const I=a(new Me(.42,.62,.52,7),n,A,1.28,L);I.userData.isLandscapeStage=!0;for(const[N,B,U]of[[-.22,1.95,.48],[.22,2.25,.55],[0,2.65,.45]]){const O=a(new Rn(U,0),T,A+N,B,L);O.userData.isLandscapeStage=!0}}return!0}for(const x of[-4.5,4.5])a(new Me(.7,.95,7.2,8),n,x,4.4,27);return a(new He(4.5,.24,8,40,Math.PI),o,0,8,27,Math.PI),h(4.9),!0}if(e==="lab-cloze"){for(const x of[-4.1,4.1]){const v=a(new de(4.4,.35,5.6),n,x,2,27);v.userData.isLandscapeRoute=!0}for(const x of[-1.5,0,1.5]){const v=a(new je(.62,0),s,x,2.6,27);v.userData.isLandscapeBeacon=!0}return u(5.2,1.2),!0}if(e==="lab-translation"){for(const v of[-4.5,4.5]){a(new Me(.62,.92,7.4,8),n,v,4.4,27);const y=a(new He(2.4,.16,8,32),o,v,5.4,27,Math.PI/2);y.userData.isLandscapeRing=!0}const x=a(new de(8,.26,.28),s,0,5,27);return x.userData.isLandscapeRoute=!0,!0}const g={"project-reading":"reading","project-listening":"listening","project-writing":"writing","project-memory":"memory"}[e];if(!g)return!1;if(g==="reading")a(new de(7.4,.34,5.2),n,-2,3.7,27,-.14),a(new de(7.4,.34,5.2),s,2,3.7,27,.14),a(new de(.3,2.1,5.3),o,0,2.6,27),u(4.6,1.2);else if(g==="listening"){for(const[x,v]of[[2.4,3],[3.8,4.6],[5.3,6.2]]){const y=a(new He(x,.15,8,40),o,0,v,27,Math.PI/2.15);y.userData.isLandscapeRing=!0}h(3.4)}else if(g==="writing"){const x=a(new de(8.5,.55,5.2),i,0,2.4,27);x.userData.isLandscapeStage=!0;const v=new oe({color:15919832,roughness:.88}),y=a(new de(5.8,.14,3.4),v,-.25,2.8,27,-.08);y.userData.isLandscapeStage=!0;for(let T=0;T<5;T++){const A=a(new de(3.6,.035,.045),o,-.25,2.89,26.15+T*.42,-.08);A.userData.isLandscapeRoute=!0}const b=a(new Me(.035,.06,2.15,8),o,1.95,2.98,27.8);b.rotation.z=Math.PI/2,b.rotation.y+=.08,b.userData.isLandscapeStage=!0;for(const T of[-3.4,3.4])a(new de(.35,2.6,.35),o,T,1.2,25.4);const S=a(new Me(.42,.48,.16,12),i,3.05,2.77,26.2);S.userData.isLandscapeStage=!0;const w=a(new Me(.055,.08,1.15,8),o,3.05,3.35,26.2);w.userData.isLandscapeStage=!0;const M=new z(new he(.42,12,8),s);M.position.set(3.05,4,26.2),M.scale.set(1,.72,.78),M.userData.isLandscapeBeacon=!0,r.add(M)}else{for(let x=0;x<4;x++){const v=x*Math.PI/3,y=a(new he(.72,12,8),s,Math.cos(v)*5.3,2.6+x%2,27+Math.sin(v)*5.3);y.userData.isLandscapeBeacon=!0}u(5.6,1.3,.52),h(6.1)}return!0}function av(r,e,t,n,i,s,o,c,l){const a=(d,g,p,m,x,v,y=n,b=0)=>{const S=t(new de(m,x,v),y,d,g,p,b);return S.userData.isLandscapeStage=!0,S},h=(d,g,p,m,x,v=n,y=10)=>{const b=t(new Me(m*.86,m,x,y),v,d,g,p);return b.userData.isLandscapeStage=!0,b},u=(d,g=o,p=.12)=>{const m=new Wn(d.map(([v,y,b])=>new P(v,y,b))),x=new z(new Pn(m,28,p,8,!1),g);x.userData.isLandscapeRoute=!0,x.castShadow=!0,x.receiveShadow=!0,r.add(x)},f=(d,g,p=n,m=27,x=0)=>{a(x-d/2,g/2,m,.52,g,.62,p),a(x+d/2,g/2,m,.52,g,.62,p),a(x,g,m,d+.52,.5,.62,p)},_=(d,g,p,m,x=.48)=>{const v=[n,o,s,i];a(d,g,p,x,.74+m%2*.16,.34,v[m%v.length],(m%3-1)*.035)};switch(e){case"message":{const d=new oe({color:10136465,emissive:2438958,emissiveIntensity:.24,roughness:.9,metalness:.02}),g=new oe({color:3427145,roughness:.78}),p=new oe({color:10864836,emissive:1059883,emissiveIntensity:.12,roughness:.2,metalness:.08,transparent:!0,opacity:.36,depthWrite:!1}),m=new oe({color:7756610,roughness:.88}),x=new yn;x.moveTo(-7.9,-3.275),x.lineTo(7.9,-3.275),x.lineTo(7.9,3.275),x.lineTo(-7.9,3.275),x.closePath();for(const[Z,ee,Pe,ne]of[[-4.55,.2,3.18,2.96],[4.55,.2,3.18,2.96],[0,-1.54,2.6,3.35]]){const Ze=new Sc;Ze.moveTo(Z-Pe/2,ee-ne/2),Ze.lineTo(Z-Pe/2,ee+ne/2),Ze.lineTo(Z+Pe/2,ee+ne/2),Ze.lineTo(Z+Pe/2,ee-ne/2),Ze.closePath(),x.holes.push(Ze)}const v=new z(new Bi(x,{depth:.42,bevelEnabled:!1}),d);v.position.set(0,4.42,30.73),v.userData.isLandscapeStage=!0,r.add(v),a(0,4.42,33.02,15.38,6.55,.42,d);for(const Z of[-1,1]){const ee=Z*7.69;a(ee,6.93,31.98,.42,1.53,2.5,d),a(ee,2.11,31.98,.42,1.93,2.5,d),a(ee,4.62,30.92,.42,3.08,.38,d),a(ee,4.62,33.02,.42,3.08,.42,d),a(ee,4.62,31.97,.035,2.82,1.68,p);for(const Pe of[31.1,32.84])a(ee,4.62,Pe,.42,3.08,.1,g);for(const Pe of[3.13,6.11])a(ee,Pe,31.97,.42,.12,1.84,g)}a(0,7.82,31.95,16.35,.34,2.85,g),a(0,1.28,31.9,15.5,.26,2.6,g);for(const Z of[-4.55,4.55])a(Z,4.62,30.72,3.5,3.28,.16,g),a(Z,4.62,30.6,3.18,2.96,.08,p),a(Z,4.62,30.53,.12,2.96,.06,o),a(Z,4.62,30.53,3.18,.12,.06,o),a(Z,4.62,30.53,.1,2.96,.06,g),a(Z,4.62,30.53,3.18,.1,.06,g);const y=new oe({color:5719608,roughness:.88}),b=new tn(new de(2.8,.075,.42),y,6),S=new tn(new de(.3,.72,.26),new oe({color:16777215,roughness:.84}),30),w=new bt,M=[3.35,4.28,5.21];let T=0,A=0;const L=[12089686,13676146,7310200,7375258,10187640,14209208];for(const Z of[-4.55,4.55])for(const[ee,Pe]of M.entries()){w.position.set(Z,Pe,31.62),w.scale.set(1,1,1),w.rotation.set(0,0,0),w.updateMatrix(),b.setMatrixAt(T++,w.matrix);for(let ne=0;ne<5;ne++)w.position.set(Z-1.08+ne*.54,Pe+.39,31.58),w.scale.set(.78+(ee+ne)%2*.12,.72+(ee*2+ne)%3*.14,.84),w.rotation.set(0,(ne%3-1)*.035,0),w.updateMatrix(),S.setMatrixAt(A,w.matrix),S.setColorAt(A,new ce(L[(ee+ne*2)%L.length])),A++}b.instanceMatrix.needsUpdate=!0,S.instanceMatrix.needsUpdate=!0,S.instanceColor&&(S.instanceColor.needsUpdate=!0),b.castShadow=!0,S.castShadow=!0,r.add(b,S),a(0,4.82,29.78,4.9,.2,1.4,g);for(const Z of[-2.18,2.18])a(Z,3.05,29.78,.16,3.4,.18,g);for(const Z of[-7.1,-2.68,2.68,7.1])a(Z,4.62,30.48,.14,3.02,.22,g);a(0,2.88,30.62,2.6,3.35,.2,g),a(-.62,2.72,30.47,1.08,2.98,.08,p),a(.62,2.72,30.47,1.08,2.98,.08,p),a(0,2.72,30.4,.1,2.98,.06,o),a(.38,2.72,30.35,.08,.12,.08,m),a(0,1.18,29.95,3.5,.22,1.2,m);const I=document.createElement("canvas");I.width=1024,I.height=192;const N=I.getContext("2d");if(N){N.fillStyle="#263e3b",N.fillRect(0,0,I.width,I.height),N.strokeStyle="#d6c19a",N.lineWidth=8,N.strokeRect(12,12,I.width-24,I.height-24),N.fillStyle="#f4edda",N.textAlign="center",N.textBaseline="middle",N.font="bold 66px Arial, sans-serif",N.fillText("CAMPUS LIBRARY",512,98);const Z=new In(I);Z.colorSpace=Mt;const ee=new z(new rn(4.4,.82),new Ct({map:Z,side:St,toneMapped:!1}));ee.position.set(0,6.9,30.55),ee.rotation.y=Math.PI,r.add(ee)}for(const Z of[-2.05,2.05]){a(Z,1.72,25.9,3.05,.24,.68,m),a(Z,2.18,26.18,3.05,.78,.16,m);for(const ee of[Z-1.2,Z+1.2])a(ee,1.38,25.9,.12,.62,.14,g),a(ee,1.84,26.18,.12,.72,.14,g);for(const ee of[Z-1.43,Z+1.43])a(ee,2,25.9,.14,.36,.68,g),a(ee,2.2,25.9,.22,.1,.76,m)}const B=[-2.55,-1.55,1.55,2.55],U=[7374743,10252382,5861225,9077097],O=[3425363,5851456,4545364,5131350],k=[14200202,10250316,13078128,14728094],J=[3156260,3484968,4338731,2566704],ae=new tn(new Ti(.3,.46,4,8),new oe({color:16777215,roughness:.86}),B.length),pe=new tn(new he(1,12,10),new oe({color:16777215,roughness:.92}),B.length*4),Ee=new tn(new he(1,12,8,0,Math.PI*2,0,Math.PI*.43),new oe({color:16777215,roughness:.94}),B.length),Ue=new tn(new he(1,8,6),new oe({color:2632496,roughness:.72}),B.length*2),et=new tn(new de(1,1,1),new oe({color:8477005,roughness:.82}),B.length),nt=new tn(new Me(.075,.09,1,8),new oe({color:16777215,roughness:.88}),B.length*4),Ye=new tn(new Me(.11,.14,1,8),new oe({color:16777215,roughness:.9}),B.length*4),Q=new tn(new de(1,1,1),new oe({color:3160387,roughness:.72}),B.length*2),we=new tn(new he(1,8,6),new oe({color:16777215,roughness:.92}),B.length*2),me=new tn(new de(1,1,1),new oe({color:2503227,roughness:.36,metalness:.26}),B.length),Fe=new tn(new de(1,1,1),new oe({color:6801605,emissive:1934728,emissiveIntensity:.28,roughness:.32}),B.length),qe=[ae,pe,Ee,Ue,et,nt,Ye,Q,we,me,Fe];for(const Z of qe)Z.castShadow=!0,Z.receiveShadow=!0,Z.userData.isLandscapeStage=!0,r.add(Z);const Oe=new bt,$e=(Z,ee,Pe,ne,Ze,R,E,V)=>{Oe.position.set(Pe,ne,Ze),Oe.rotation.set(0,0,0),Oe.scale.set(R,E,V),Oe.updateMatrix(),Z.setMatrixAt(ee,Oe.matrix)},We=(Z,ee,Pe,ne)=>{const Ze=ne.clone().sub(Pe);Oe.position.copy(Pe).add(ne).multiplyScalar(.5),Oe.quaternion.setFromUnitVectors(new P(0,1,0),Ze.clone().normalize()),Oe.scale.set(1,Ze.length(),1),Oe.updateMatrix(),Z.setMatrixAt(ee,Oe.matrix)};let te=0,ue=0,ie=0,be=0,Se=0,Ke=0;for(const[Z,ee]of B.entries()){ae.setColorAt(Z,new ce(U[Z])),Ee.setColorAt(Z,new ce(J[Z])),$e(ae,Z,ee,2.6,25.92,.94,1,.8),$e(Ee,Z,ee,3.38,25.92,.29,.31,.25),$e(pe,te,ee,3.37,25.92,.27,.31,.235),pe.setColorAt(te++,new ce(k[Z])),$e(pe,te,ee,3.29,25.92-.25,.055,.07,.045),pe.setColorAt(te++,new ce(k[Z]));for(const se of[-1,1])$e(pe,te,ee+se*.26,3.35,25.92-.02,.055,.072,.045),pe.setColorAt(te++,new ce(k[Z])),$e(Ue,ue++,ee+se*.082,3.39,25.92-.251,.034,.043,.018);$e(et,Z,ee,3.27,25.92-.249,.075,.018,.012),$e(me,Z,ee,2.48,25.92-.42,.17,.28,.035),$e(Fe,Z,ee,2.48,25.92-.441,.132,.22,.008);const ne=new P(ee-.27,2.88,25.92-.02),Ze=new P(ee+.27,2.88,25.92-.02),R=new P(ee-.29,2.64,25.92-.24),E=new P(ee+.29,2.64,25.92-.24),V=new P(ee-.12,2.52,25.92-.38),K=new P(ee+.12,2.52,25.92-.38);nt.setColorAt(ie,new ce(U[Z])),We(nt,ie++,ne,R),nt.setColorAt(ie,new ce(U[Z])),We(nt,ie++,R,V),nt.setColorAt(ie,new ce(U[Z])),We(nt,ie++,Ze,E),nt.setColorAt(ie,new ce(U[Z])),We(nt,ie++,E,K);for(const se of[-1,1]){const fe=ee+se*.14,ge=new P(fe,2.1,25.92),q=new P(fe,1.75,25.92-.34),$=new P(fe,1.28,25.92-.57);Ye.setColorAt(be,new ce(O[Z])),We(Ye,be++,ge,q),Ye.setColorAt(be,new ce(O[Z])),We(Ye,be++,q,$),$e(Q,Se++,fe,1.24,25.92-.67,.17,.13,.32),$e(we,Ke++,ee+se*.12,2.52,25.92-.39,.075,.075,.075)}}for(const Z of qe)Z.instanceMatrix.needsUpdate=!0,Z.instanceColor&&(Z.instanceColor.needsUpdate=!0);for(const[Z,ee,Pe]of[[-2.9,5.15,1.25],[0,5.75,1.45],[2.9,5.15,1.25]]){a(Z,ee,25.2,Pe,.68,.12,i,Z*.035),a(Z,ee+.1,25.11,Pe*.62,.08,.06,o,Z*.035);const ne=t(new he(.09,8,6),s,Z+Pe*.34,ee+.29,25.08);ne.userData.isLandscapeBeacon=!0}u([[-2.15,5.12,25.14],[0,5.7,25.14],[2.15,5.12,25.14]],s,.06),u([[0,1.24,34],[0,1.28,31],[0,1.28,28],[0,1.34,26.8]],o,.1);for(const Z of[-6.35,6.35]){h(Z,1.43,27.65,.48,.46,m,8),h(Z,2.75,27.65,.1,2.55,g,8);for(const[ee,Pe,ne]of[[-.34,3.55,.72],[.28,3.82,.8],[0,4.38,.72]]){const Ze=t(new Rn(ne,0),n,Z+ee,Pe,27.65);Ze.userData.isLandscapeStage=!0}}const D=new Mn(16766875,.72,16,2);D.position.set(0,5.2,25.2),r.add(D);break}case"dialogue":{for(const[x,v]of[25.1,27.5,29.9].entries()){f(9.3-x*.45,6.45-x*.2,x===1?o:n,v);const y=t(new He(3.95-x*.18,.075,7,24,Math.PI),x===1?s:o,0,2.95,v+.05);y.userData.isLandscapeStage=!0}u([[-4.2,6.35,25.1],[-4.1,6.65,27.5],[-3.9,6.45,29.9]],o,.075),u([[4.2,6.35,25.1],[4.1,6.65,27.5],[3.9,6.45,29.9]],o,.075),u([[0,6.6,25.1],[0,6.9,27.5],[0,6.6,29.9]],s,.075),h(0,1.52,26.35,.34,1.32,i,10),h(0,2.24,26.35,1.68,.22,n,12);const d=t(new je(.34,1),s,0,2.55,26.35);d.userData.isLandscapeBeacon=!0;const g=[o,s,n];for(const[x,v]of[-3.25,0,3.25].entries()){a(v,1.62,28,1.16,.24,.92,i,v*-.04),a(v,2.02,28.38,1.08,.78,.16,n,v*-.04);const y=t(new Me(.34,.48,1.22,8),g[x],v,2.82,28);y.userData.isLandscapeStage=!0;const b=t(new he(.4,12,10),n,v,3.72,28);b.userData.isLandscapeStage=!0}const p=new oe({color:6929809,emissive:1457453,emissiveIntensity:.28,roughness:.86});for(const[x,v]of[[-5.3,26.2],[5.3,26.2],[-5.3,29.1],[5.3,29.1]]){h(x,1.55,v,.43,.62,i,8),h(x,2.22,v,.08,1.05,o,7);const y=t(new Rn(.46,0),p,x,2.95,v);y.scale.set(.8,1.35,.8),y.userData.isLandscapeStage=!0}a(-4.35,1.63,25.55,1.42,.34,.76,i);for(const x of[-4.78,-4.35,-3.92])a(x,1.9,25.48,.24,.08,.38,o);for(const[x,v]of[[.65,4.75],[.98,4.95],[1.31,5.15]]){const y=t(new He(x,.055,7,24,Math.PI),s,0,v,27.78);y.userData.isLandscapeRoute=!0}u([[-3.2,4.25,27.78],[0,5.25,27.78],[3.2,4.25,27.78]],o,.07);const m=new Mn(10283208,.85,16,2);m.position.set(0,5.4,25.7),r.add(m);break}case"focus":{const d=h(0,1.5,27,3.4,.34,n,12);d.userData.isLandscapeRoute=!0,a(0,2.2,27,2.1,.18,1.6,s,-.08);for(const p of[-3.2,3.2]){const m=t(new je(.36,0),i,p,3.4,27);m.userData.isLandscapeBeacon=!0}const g=t(new je(1.02,1),o,0,4.25,27);g.userData.isLandscapeBeacon=!0,l(4.7,1.05,.08);break}case"listening-bench":{h(0,1.18,27,5.1,.34,i,12);for(const g of[-2.25,2.25]){a(g,1.78,27,1.85,.22,.78,n),a(g,2.34,g<0?27.38:26.62,1.85,.78,.18,o,g<0?-.04:.04);for(const p of[26.72,27.28])h(g,1.42,p,.1,.58,i,8)}for(const g of[-1.7,1.7]){const p=h(g,2.55,27,.34,1.02,g<0?o:n,8);p.userData.isLandscapeStage=!0;const m=t(new he(.37,12,10),n,g,3.28,27);m.userData.isLandscapeStage=!0}const d=t(new je(.46,1),s,0,3.22,27);d.userData.isLandscapeBeacon=!0,u([[-1.18,3.05,27],[-.55,3.55,27],[.42,3.55,27],[1.18,3.05,27]],o,.075);for(const[g,p]of[[.82,4.26],[1.18,4.56],[1.54,4.86]]){const m=t(new He(g,.055,7,28,Math.PI),s,0,p,27.25);m.userData.isLandscapeRoute=!0}l(4.75,1.05,.12);break}case"notification":{const d=[{x:-3.4,y:4.1,scale:.86,rows:[.76,1.28,.94,.62]},{x:0,y:5.6,scale:1.08,rows:[1.34,.82,1.12,.68]},{x:3.4,y:4.5,scale:.9,rows:[.92,1.22,.74,1.04]}];for(const{x:g,y:p,scale:m,rows:x}of d){const v=g*.035;a(g,p,27,2.2*m,2.8*m,.42,i,g*.035),a(g,p,26.73,1.88*m,2.44*m,.1,s,v),a(g-.1*m,p+.78*m,26.62,.78*m,.15*m,.06,o,v),x.forEach((b,S)=>{const w=S===1&&g===0?o:i;a(g-.08*m,p+(.34-S*.43)*m,26.62,b*m,.14*m,.06,w,v)});const y=t(new he(.22*m,10,8),o,g+.58*m,p+.68*m,26.6);y.userData.isLandscapeBeacon=!0}u([[-4.4,1.55,27],[0,1.55,27],[4.4,1.55,27]],n,.18);break}case"study-desk":{const d=new oe({color:10318977,emissive:4795195,emissiveIntensity:.2,roughness:.58,metalness:.08}),g=h(0,.24,27,8.1,.42,n,12);g.userData.isLandscapeStage=!0,f(13.2,6.3,o,31.1);const p=t(new He(7.25,.08,7,48),n,0,.5,27);p.rotation.x=Math.PI/2;for(const[b,S]of[2.9,4.15,5.4].entries()){const w=-5.55-b*.18,M=a(w,S,26.45,1.48,.9,.18,i,-.08);M.userData.isLandscapeStage=!0,a(w-.12,S+.17,26.33,.82,.1,.06,d),a(w-.12,S-.08,26.33,1.04,.08,.06,o),a(w-.12,S-.28,26.33,.68,.07,.06,o);const T=t(new he(.14,10,8),d,w+.52,S+.22,26.3);T.userData.isLandscapeBeacon=!0}u([[-7.15,1.28,26.8],[-6.2,1.35,26.55],[-5.25,1.42,26.5]],d,.075),a(0,2.45,27,8.2,.42,3.2,n);for(const b of[-3.45,3.45])for(const S of[25.8,28.2])a(b,1.35,S,.24,2,.24,i);a(0,2.12,27,5.2,.18,.22,i),a(-1.35,2.75,26.25,2.1,.1,1.45,s,-.08),a(-1.35,2.82,26.25,.08,.04,1.35,o,-.08);for(const b of[25.82,26.12,26.42])a(-1.38,2.83,b,1.54,.025,.035,o);a(-.05,2.88,26.9,1.1,.07,.09,i,-.38),a(1.9,2.68,27.45,1.55,.16,1.45,i,-.12),a(1.9,2.79,27.45,.72,.09,1.2,o,-.12),a(1.9,2.85,27.45,.56,.025,1.02,i,-.12),a(0,1.18,29.65,1.9,.26,1.6,i),a(0,2.08,30.35,1.9,1.8,.22,i),h(0,.62,29.65,.14,.86,o,8),a(0,4.05,29.2,4.7,2.5,.18,i),a(0,4.05,29.08,4.34,2.16,.05,s),a(0,4.83,29.02,3.25,.08,.04,o),a(-.65,4.35,29.02,1.95,.07,.04,o),a(.65,4.35,29.02,1.1,.07,.04,o),a(-1.05,3.88,29.02,2.75,.07,.04,o),h(3.15,3.15,27,.12,1.3,o,8),a(2.82,3.82,27,.9,.14,.56,o,-.18);const m=t(new he(.3,10,8),s,2.82,3.55,26.73);m.userData.isLandscapeBeacon=!0,h(5.55,1.55,27.45,.2,2.25,i,10);const x=h(5.55,3.86,26.92,1.18,.16,i,12);x.rotation.x=Math.PI/2;const v=t(new He(1.22,.12,8,32),o,5.55,3.86,26.78);v.userData.isLandscapeStage=!0;for(const[b,S,w,M]of[[5.55,4.68,.12,.28],[5.55,3.04,.12,.28],[4.73,3.86,.28,.12],[6.37,3.86,.28,.12]])a(b,S,26.72,w,M,.08,o);a(5.55,4.08,26.67,.1,.58,.08,s),a(5.77,3.86,26.66,.48,.1,.08,s);const y=t(new he(.16,12,8),s,5.55,3.86,26.58);y.userData.isLandscapeBeacon=!0;break}case"filter":{const d=h(0,.98,27,7.1,.36,i,12);d.userData.isLandscapeStage=!0,f(10.4,6.4,o,28.1);const g=new oe({color:13198187,emissive:7020586,emissiveIntensity:.22,roughness:.72}),p=[-3.35,0,3.35];for(const[S,w]of p.entries())a(w,3.05,25.72,1.84,2.35,.2,i),a(w,3.05,25.59,1.58,2.08,.06,S===1?n:s),a(w,3.88,25.53,1.08,.1,.06,o);for(const S of[-.2,.2]){const w=t(new He(.26,.075,8,20),o,-3.35+S,3.12,25.46);w.rotation.z=S<0?-.62:.62,w.userData.isLandscapeStage=!0}const m=t(new He(.32,.075,8,20,Math.PI),o,0,3.42,25.45);m.userData.isLandscapeStage=!0,a(0,2.96,25.45,.72,.56,.16,o);const x=t(new he(.2,10,8),o,3.35,3.34,25.44);x.userData.isLandscapeStage=!0;const v=t(new he(.36,10,8),o,3.35,2.75,25.44);v.scale.set(1.1,.68,.55),v.userData.isLandscapeStage=!0;const y=new yn;y.moveTo(0,1.16),y.lineTo(1.02,.72),y.lineTo(.86,-.12),y.quadraticCurveTo(.62,-.72,0,-1.08),y.quadraticCurveTo(-.62,-.72,-.86,-.12),y.lineTo(-1.02,.72),y.closePath();const b=t(new Bi(y,{depth:.18,bevelEnabled:!0,bevelSegments:2,bevelSize:.06,bevelThickness:.04}),o,0,5.48,28.4);b.userData.isLandscapeBeacon=!0,u([[-3.35,1.65,25.5],[-3.35,1.85,27.2],[0,2.05,28.2]],g,.1),u([[0,1.65,25.5],[0,2.2,26.9],[0,4.25,28.3]],o,.13),u([[3.35,1.65,25.5],[3.35,1.85,27.2],[0,2.05,28.2]],g,.1),l(5.4,1.24,.08);break}case"offline-rest":{const d=h(0,.98,27,7.1,.36,i,12);d.userData.isLandscapeStage=!0,f(7.2,6.2,o,27),a(-3.1,2.15,27,2.65,.24,.78,n),a(-3.1,2.76,27.34,2.65,.84,.18,o);for(const p of[-4.08,-2.12])for(const m of[26.76,27.24])a(p,1.7,m,.14,.72,.14,i);h(2.55,1.82,27,.78,.16,n,10),h(2.55,1.3,27,.14,.96,i,8),a(2.55,1.98,26.86,.72,.08,.34,i,-.12),a(2.55,2.04,26.86,.56,.025,.22,s,-.12);for(const[p,m]of[[-.68,o],[.68,n]]){h(p,2.35,27,.3,1.05,m,8);const x=t(new he(.29,12,10),m,p,3.08,27);x.userData.isLandscapeStage=!0}u([[-.3,3.23,27],[0,3.62,27],[.3,3.23,27]],s,.065);for(const p of[-5.15,5.15]){h(p,1.3,27,.48,.62,n,8);for(const[m,x,v,y]of[[-.28,2.15,0,.5],[.22,2.45,.08,.58],[0,2.92,-.08,.48]]){const b=t(new Rn(y,0),s,p+m,x,27+v);b.userData.isLandscapeStage=!0}}for(let p=0;p<4;p++){const m=p%2===0?-.32:.32;a(m,1.24,32-p*1.1,.92,.12,.66,p%2===0?n:s,m*.08)}u([[0,1.2,33],[0,1.2,30],[0,1.2,27.5]],o,.1);const g=t(new he(.62,12,10),s,0,4.45,27);g.userData.isLandscapeBeacon=!0;for(const[p,m]of[[.92,4.38],[1.2,4.62]]){const x=t(new He(p,.055,7,28),o,0,m,27);x.userData.isLandscapeRing=!0}break}case"clinic":{const d=new oe({color:7112083,emissive:1321270,emissiveIntensity:.18,roughness:.9});d.fog=!1;const g=a(0,3.45,27,8,4.5,2.3,d);g.userData.isLandscapeStage=!0,a(0,5.82,27,8.55,.3,2.75,i);const p=new oe({color:3493729,roughness:.96});p.fog=!1;for(const[y,b,S,w]of[[-7.7,2.55,32,1],[-6.1,1.75,34,.7],[7.6,2.35,33,.88]]){const M=t(new qt(3.1*w,4.8*w,5),p,y,b,S);M.scale.set(1.2,1,.7),M.userData.isLandscapeStage=!0}a(0,3.38,25.78,1.25,3.18,.18,i),a(-.12,3.42,25.66,.78,2.64,.06,s),a(.58,3.05,25.6,.08,.12,.08,o);for(const y of[-2.5,2.5])a(y,4.05,25.78,1.28,1.24,.18,o),a(y,4.05,25.65,1.08,1.02,.06,s),a(y,4.05,25.59,.08,1.02,.035,n),a(y,4.05,25.59,1.08,.07,.035,n),a(y,3.42,25.55,1.5,.12,.36,i);a(0,4.98,25.16,2.55,.2,.92,o),a(0,6.35,25.64,.55,1.8,.18,o),a(0,6.35,25.62,1.8,.55,.2,o),a(0,1.45,25.12,2.6,.22,1.16,n),a(0,1.24,26.1,3.2,.18,.82,i),u([[0,1.18,33],[0,1.2,30],[0,1.32,27.8],[0,1.48,25.5]],o,.12);for(const y of[-5.1,5.1]){a(y,1.72,27.1,1.85,.18,.62,i),a(y,2.22,27.38,1.85,.68,.14,o);for(const b of[-.68,.68])a(y+b,1.42,27.1,.12,.54,.12,n)}const m=a(4.5,2.72,25.42,1.18,2.12,.28,i);m.userData.isLandscapeStage=!0,a(4.5,2.92,25.24,.92,1.38,.06,s);for(const[y,b]of[[4.28,o],[4.72,n]]){const S=t(new he(.13,8,6),b,y,3.28,25.18);S.userData.isLandscapeStage=!0,a(y,2.92,25.18,.22,.34,.07,b)}u([[4.5,4.12,25.2],[3.6,4.75,26],[2.5,5.2,27]],s,.07);const x=h(2.8,6.02,27.5,.09,.62,i,8);x.userData.isLandscapeStage=!0;const v=t(new He(.58,.08,8,24),o,2.8,6.38,27.5);v.rotation.y=Math.PI/2,v.userData.isLandscapeBeacon=!0;for(const[y,b]of[[.58,6.15],[.82,6.1]]){const S=t(new He(y,.045,7,24,Math.PI),s,2.8,b,27.5);S.rotation.y=Math.PI/2,S.userData.isLandscapeRing=!0}break}case"telemedicine":{const d=h(0,.98,27,7.1,.36,i,12);d.userData.isLandscapeStage=!0,f(9.4,6.5,n,27),a(0,4.5,26.58,4.8,3.2,.16,i),a(0,4.55,26.45,4.18,2.6,.1,s);for(const[x,v]of[[-.88,o],[.88,n]]){const y=t(new he(.27,10,8),v,x,4.98,26.34);y.userData.isLandscapeStage=!0,a(x,4.3,26.34,.68,.72,.1,v)}a(0,4.3,26.32,.12,.68,.08,o),a(0,4.3,26.32,.56,.12,.08,o),a(-3.45,1.92,27,2.55,.28,.88,n),a(-3.45,2.48,27.34,2.55,.82,.2,o);for(const x of[-4.35,-2.55])a(x,1.55,26.72,.14,.72,.14,i),a(x,1.55,27.28,.14,.72,.14,i);const g=h(-3.45,2.63,26.82,.3,.82,n,8);g.userData.isLandscapeStage=!0;const p=t(new he(.27,10,8),n,-3.45,3.26,26.82);p.userData.isLandscapeStage=!0,h(3.15,1.82,27,.76,.16,i,10),h(3.15,1.32,27,.12,.94,i,8),a(3.15,2.3,26.72,.5,.86,.1,o),a(3.15,2.3,26.65,.34,.68,.04,s);const m=t(new He(.19,.055,7,18,Math.PI),o,3.15,2.48,26.6);m.userData.isLandscapeStage=!0,a(3.15,2.24,26.6,.34,.22,.08,o);for(const x of[-4.2,4.2]){const v=t(new he(.55,12,10),o,x,2.7,27);v.userData.isLandscapeBeacon=!0}u([[-4.2,2.9,27],[-3.45,3.35,27],[-1.6,3.6,27],[0,3.2,27],[1.7,3.6,27],[3.15,3.4,27],[4.2,2.9,27]],o,.1);break}case"community":{const d=h(0,.96,27,7.1,.36,i,12);d.userData.isLandscapeStage=!0;for(const[S,w]of[[-5.1,2.8],[-3.05,3.5],[3.05,3.1],[5.1,4]]){a(S,1.3+w/2,27.6,1.7,w,1.65,n);const M=t(new qt(1.28,1.08,4),o,S,1.9+w,27.6);M.rotation.y=Math.PI/4,M.userData.isLandscapeStage=!0}a(0,2.55,26.15,2.45,2.7,1.7,n),a(0,3.98,26.15,2.76,.22,1.98,i),a(0,2.05,25.25,.74,1.62,.14,i),a(-.88,2.8,25.24,.56,.65,.14,s),a(.88,2.8,25.24,.56,.65,.14,s),a(0,4.62,25.2,.28,.96,.12,o),a(0,4.62,25.18,.96,.28,.14,o),a(0,1.32,24.82,1.9,.18,.72,n),u([[0,1.16,31],[0,1.2,28.6],[0,1.28,26.8],[0,1.32,25]],o,.12);const g=new oe({color:7973541,emissive:1585455,emissiveIntensity:.3,roughness:.82}),p=new oe({color:14214117,emissive:2307131,emissiveIntensity:.22,roughness:.78}),m=new oe({color:14002824,roughness:.92}),x=(S,w,M)=>{for(const I of[-.16,.16]){const N=t(new Me(.11,.13,.48,7),i,S+I,1.4,24.18);N.userData.isLandscapeStage=!0}const T=t(new Me(.3,.38,.9,8),w,S,2.02,24.18);T.userData.isLandscapeStage=!0;const A=t(new he(.32,10,8),m,S,2.67,24.18);A.userData.isLandscapeStage=!0;const L=t(new Me(.085,.1,.72,6),w,S+(M<0?.31:-.31),2,24.15);L.rotation.z=M,L.userData.isLandscapeStage=!0};x(-1.82,g,-.92),x(1.82,p,.92),a(-3.8,1.46,24.2,1.55,.18,.48,i);for(const S of[-4.38,-3.22])a(S,1.28,24.2,.12,.38,.14,o);const v=h(3.75,1.7,24.2,.11,1.02,i,8);v.rotation.x=-.12,a(3.75,2.34,24.15,.72,.68,.13,s,-.12),a(3.75,2.34,24.06,.12,.4,.06,o,-.12),a(3.75,2.34,24.05,.4,.12,.06,o,-.12);const y=t(new he(.34,12,10),s,0,4.05,26.15);y.userData.isLandscapeBeacon=!0;for(const S of[-5.1,-3.05,3.05,5.1])u([[S,1.36,27.6],[S*.54,1.28,26.6],[Math.sign(S)*.9,1.26,25.7]],o,.075);const b=new Mn(16766368,.72,11,2);b.position.set(0,4.1,24.2),r.add(b);break}case"community-library":{h(0,1.06,27,6.2,.4,i,14);const d=h(0,1.62,27,2.05,.28,n,12);d.userData.isLandscapeRoute=!0,h(0,1.8,27,1.86,.08,s,12);for(let g=0;g<6;g++){const p=Math.floor(g/3),m=g%3;_(-.74+m*.74,2.07+p*.04,26.45+p*.9,g,.42)}for(const g of[-4.65,4.65]){a(g,3.05,27,1.42,3.6,1.08,i);for(const p of[2.02,3.12,4.22]){a(g,p,26.38,1.28,.12,.16,o);for(let m=0;m<3;m++)_(g-.4+m*.4,p+.46,26.16,m+Math.round(p*2),.24)}}a(0,4.15,29.35,7.8,4.2,.4,i),a(0,4.15,29.08,7.24,3.62,.08,n);for(const g of[-2.3,0,2.3])a(g,4.12,29,.08,2.8,.06,o);for(const g of[3.18,4.12,5.06])a(0,g,28.98,6.8,.06,.06,o);for(const[g,p,m]of[[-1.4,3.55,s],[.85,3.55,o],[-2.25,4.5,o],[1.55,4.5,s],[-.8,5.42,o],[2.25,5.42,s]]){const x=a(g,p,28.86,.48,.34,.08,m,-.04);x.userData.isLandscapeBeacon=!0}for(const[g,[p,m]]of[[-3.15,27],[3.15,27],[0,24.9]].entries()){const x=h(p,2.05,m,.28,.86,g%2?o:i,8);x.userData.isLandscapeStage=!0;const v=t(new he(.25,10,8),n,p,2.64,m);v.userData.isLandscapeStage=!0}a(0,2,23.35,1.72,1.42,1.06,o),a(0,2.38,22.78,1.12,.12,.08,i),a(0,1.42,22.78,.84,.12,.08,s),u([[-4.2,2.08,27],[-2.5,2.02,26.1],[0,2.08,25.7],[2.5,2.02,26.1],[4.2,2.08,27]],s,.08),u([[0,2.3,24],[0,2.75,25.1],[0,2.9,27],[0,3.6,28.4],[0,4,29]],o,.075),l(5.45,1.28,.12);break}case"community-network":{h(0,.98,27,6.1,.34,i,12);const d=a(0,1.34,25.45,8.3,.24,1.72,n);d.userData.isLandscapeRoute=!0,a(0,1.49,25.45,8.08,.08,1.55,i);for(const b of[24.65,26.25]){a(0,2.06,b,8.05,.1,.12,o);for(const S of[-3.65,-1.85,0,1.85,3.65])a(S,1.77,b,.1,.62,.12,i)}const g=t(new de(1.72,.16,4.2),n,0,1.35,22.72);g.rotation.x=-.08,g.userData.isLandscapeRoute=!0;for(const b of[-.98,.98]){const S=t(new de(.08,.09,4.05),o,b,1.76,22.72);S.rotation.x=-.08,S.userData.isLandscapeStage=!0;for(const w of[20.78,24.66]){const M=a(b,1.51,w,.09,.42,.09,i);M.userData.isLandscapeStage=!0}}for(const b of[-4,4])a(b,2.55,27,2.3,2.55,1.8,n),a(b,3.88,27,2.48,.18,1.96,o),a(b-.48,2.55,26.06,.52,.78,.12,s),a(b+.48,2.55,26.06,.52,.78,.12,s);a(-4,4.55,26.02,.28,1.18,.14,o),a(-4,4.55,26.02,1.18,.28,.14,o);for(const b of[-4,0,4]){const S=t(new he(.34,12,10),s,b,b===0?4.1:4.45,27);S.userData.isLandscapeBeacon=!0}const p=a(0,2.15,26.88,1.35,.18,.86,i);p.rotation.z=-.08,a(0,2.72,26.42,.64,.92,.12,o,-.08);const m=a(0,2.75,26.34,.48,.68,.06,s,-.08);m.userData.isLandscapeStage=!0;const x=[7973541,10466753,12163964,8560576],v=new oe({color:14002824,roughness:.92});for(const[b,S]of[-2.75,-1.05,1.05,2.75].entries()){const w=new oe({color:x[b],emissive:x[b],emissiveIntensity:.08,roughness:.86});for(const A of[-.14,.14]){const L=t(new Me(.1,.12,.43,7),i,S+A,1.69,25.45);L.userData.isLandscapeStage=!0}const M=t(new Me(.28,.35,.68,8),w,S,2.14,25.45);M.userData.isLandscapeStage=!0;const T=t(new he(.27,10,8),v,S,2.72,25.45);T.userData.isLandscapeStage=!0;for(const A of[-1,1]){const L=S<0&&A>0||S>0&&A<0,I=t(new Me(.075,.085,.58,6),w,S+A*.29,2.1,25.45);I.rotation.z=-A*(L?.92:.42),I.userData.isLandscapeStage=!0}}u([[-4,4.45,26.65],[-2.35,4.85,26.25],[0,4.15,26.25],[2.35,4.85,26.25],[4,4.45,26.65]],o,.09),u([[-4,1.45,27],[-2.2,1.4,25.9],[0,1.5,25.6],[2.2,1.4,25.9],[4,1.45,27]],s,.08),l(5.35,1.3,.16);const y=new Mn(11134719,.9,16,2);y.position.set(0,5.2,25.4),r.add(y);break}case"timeline":{const d=[-4,0,4];for(const[I,N]of d.entries()){const B=I===1?3.75:3.25,U=3.55;h(N,1.28,27,1.22,.34,i,8),a(N,U,27,2.55,B,.48,i),a(N,U,26.7,2.2,B-.32,.1,n),a(N-1.14,U,26.58,.12,B+.08,.1,o),a(N+1.14,U,26.58,.12,B+.08,.1,o),a(N,U+B/2,26.58,2.38,.12,.1,o),a(N,U-B/2,26.58,2.38,.12,.1,o),a(N,2.55,26.55,1.24,.075,.055,o),a(N,2.33,26.55,.92,.075,.055,o)}u([[d[0]-.84,3.7,26.34],[d[0]+.84,3.7,26.34]],o,.1);for(const I of[-4.84,-4.28,-3.72,-3.16]){const N=t(new he(.16,10,8),s,I,3.7,26.3);N.userData.isLandscapeBeacon=!0}const g=t(new qt(.2,.42,4),o,d[0]+.98,3.7,26.3);g.rotation.z=-Math.PI/2,g.userData.isLandscapeStage=!0;const p=new oe({color:4353656,emissive:1059378,emissiveIntensity:.22,roughness:.62,metalness:.12}),m=t(new Me(2.7,2.9,.22,12),p,0,1.48,25.2);m.scale.z=.58,m.userData.isLandscapeStage=!0;const x=new yn;x.moveTo(-1.7,.18),x.lineTo(-1.28,-.38),x.lineTo(1.2,-.38),x.lineTo(1.7,.18),x.lineTo(.9,.34),x.lineTo(-1.15,.34),x.closePath();const v=new oe({color:7359281,roughness:.82,metalness:.04}),y=t(new Bi(x,{depth:.62,bevelEnabled:!0,bevelSegments:1,steps:1,bevelSize:.06,bevelThickness:.05}),v,0,1.94,24.9);y.userData.isLandscapeStage=!0,u([[-1.48,2.13,24.83],[0,2.23,24.83],[1.48,2.13,24.83]],o,.07);const b=h(0,3.52,25.05,.075,2.95,i,8);b.userData.isLandscapeStage=!0;const S=new oe({color:15916984,roughness:.8,side:St}),w=new yn;w.moveTo(-.08,0),w.lineTo(-.08,2.45),w.lineTo(-1.62,.3),w.closePath();const M=t(new Wi(w),S,0,2.34,24.82);M.userData.isLandscapeStage=!0;const T=new yn;T.moveTo(.08,.08),T.lineTo(.08,1.62),T.lineTo(1.08,.34),T.closePath();const A=t(new Wi(T),o,0,2.42,24.8);A.userData.isLandscapeStage=!0,u([[-1.62,2.2,25],[0,5.05,25],[1.12,2.5,25]],s,.045);for(const[I,N]of[[24.3,0],[25.8,.28],[26.55,-.2]])u([[-2.1,1.61,I],[-.8,1.68+N,I-.08],[.7,1.62,I],[2,1.7+N,I+.08]],s,.045);const L=new Mn(16767398,.9,13,2);L.position.set(0,5.2,24.9),r.add(L),u([[-5.3,1.52,27],[-4,1.52,26.35],[0,1.52,26.35],[4,1.52,26.35],[5.3,1.52,27]],o,.12);break}case"perseverance":{for(let g=0;g<6;g++)a(-4.2+g*1.45,1.15+g*.53,27,1.55,.28,2.1,g===5?o:n);const d=t(new je(.9,1),s,3.3,5.1,27);d.userData.isLandscapeBeacon=!0,u([[-4.2,1.45,26.7],[-1.7,2,26.7],[.2,3.1,26.7],[3.3,5.1,26.7]],o,.09);break}case"route-evidence":{h(0,1.2,27,5.2,.32,i,12),a(0,3.45,27,7.8,3.8,.3,n),a(0,3.45,26.78,7.1,3.1,.08,i),u([[-3.1,2.6,26.62],[-1.7,4.4,26.62],[.4,3.3,26.62],[2.8,4.55,26.62]],o,.09);for(const[d,g]of[-3.1,-1.7,.4,2.8].entries()){const p=t(new je(.3,0),d%2===0?s:o,g,d%2===0?2.6:4.4,26.48);p.userData.isLandscapeBeacon=!0}for(const d of[-1.75,1.75])a(d,3.18,26.45,2.05,1.48,.1,d<0?s:o),a(d,3.18,26.36,1.58,1.02,.06,i);l(4.7,1.05,.1);break}case"legacy":{for(let d=0;d<3;d++){const g=(d-1)*3.2;f(2.4,4.6+d*1.1,d===2?o:n,27,g);const p=t(new he(.34+d*.08,10,8),s,g,5+d,26.55);p.userData.isLandscapeBeacon=!0}u([[-4.6,1.4,27],[0,1.4,27],[4.6,1.4,27]],o,.13);break}case"spotlight":{h(0,1.2,27,4.4,.5,i,12),h(0,1.55,27,2.3,.22,o,12);for(const g of[-4.2,4.2]){const p=t(new qt(1.35,6.8,12,1,!0),s,g,5.1,27);p.rotation.z=g<0?-.22:.22,p.userData.isLandscapeStage=!0}const d=t(new je(.62,1),o,0,3.25,26.4);d.userData.isLandscapeBeacon=!0;break}case"humanitarian":{const d=new oe({color:8557178,roughness:.92,metalness:.02}),g=new oe({color:10122064,roughness:.9,metalness:.02}),p=new oe({color:7052452,emissive:1588552,emissiveIntensity:.16,roughness:.48,metalness:.12});for(const m of[-3.8,3.8])for(const x of[24.6,29.4])h(m,3.1,x,.18,4.8,i,7);a(0,5.55,27,8.5,.28,6.6,d),a(0,5.39,27,8.65,.12,6.72,o);for(const m of[-3.15,3.15]){h(m,1.93,26.6,.52,1.55,p,10),h(m,2.76,26.6,.24,.16,i,8);const x=t(new He(.3,.07,7,20),o,m,2.72,26.6);x.rotation.x=Math.PI/2,x.userData.isLandscapeStage=!0}for(const[m,x]of[-2.1,0,2.1].entries())a(x,1.78,24.8,1.48,1.35,1.18,g),a(x,2.49,24.8,1.56,.12,1.24,m===1?s:n),a(x,1.78,24.17,.1,1.05,.08,o),a(x,1.78,24.15,1.24,.1,.08,o);a(0,3.55,29.82,4.7,2.15,.2,i),a(0,4.63,29.68,4.45,.12,.08,o);for(const[m,x]of[-1.45,0,1.45].entries())a(x,3.84,29.68,.12,1.15,.08,m===1?s:n);u([[-4.5,1.22,27.5],[-2.8,1.38,26.8],[-1.4,1.34,25.8],[0,1.32,25.8],[1.4,1.34,25.8],[2.8,1.38,26.8],[4.5,1.22,27.5]],o,.09);for(const m of[-2.8,0,2.8]){const x=t(new je(.3,1),s,m,3.03,29.5);x.userData.isLandscapeBeacon=!0}break}case"lasting-service":{h(0,1.4,27,3.2,.36,n,12),h(0,4.25,27,.32,5.4,i,8);for(const[d,g]of[[-1.1,5.5],[0,6.1],[1.1,5.5],[-.6,7],[.7,7]]){const p=t(new he(1.05,10,8),s,d,g,27);p.userData.isLandscapeStage=!0}for(const d of[-3.5,3.5]){const g=t(new je(.42,0),o,d,2.1,27);g.userData.isLandscapeBeacon=!0}break}case"community-witness":{h(0,1.18,27,5.7,.34,i,12),h(0,1.56,27,3.3,.18,o,12);for(const[g,p,m]of[[-2.2,28.2,-.3],[0,28.8,0],[2.2,28.2,.3]]){const x=a(g,1.95,p,1.6,.2,.72,n,m);x.userData.isLandscapeStage=!0,a(g,2.34,p-.34,1.6,.62,.16,o,m)}const d=h(0,2.12,26.15,1.08,.2,n,10);d.userData.isLandscapeStage=!0;for(const g of[-3.5,0,3.5]){const p=t(new he(.3,10,8),s,g,3.15,26.55);p.userData.isLandscapeBeacon=!0}u([[-3.7,2.75,26.6],[-1.8,3.3,26.1],[0,2.9,25.95],[1.8,3.3,26.1],[3.7,2.75,26.6]],o,.075),l(4.95,1.08,.12);break}case"fleet":{const d=a(0,2.4,27,8.8,1.15,2.4,i);d.rotation.z=Math.PI;for(const g of[-2.6,0,2.6]){h(g,5.1,27,.1,5.1,o,8);const p=t(new qt(1.65,3.2,3),g===0?s:n,g,5.1,26.7);p.rotation.z=Math.PI/2,p.rotation.y=Math.PI/2,p.userData.isLandscapeStage=!0}u([[-5.5,1.35,27],[-2.8,1.1,26],[0,1.1,27],[2.8,1.1,28],[5.5,1.35,27]],o,.16);break}case"peace-contact":{for(const g of[-4.5,4.5])a(g,2.2,27,2.2,2.1,2.2,n),a(g,4.1,26.55,1.65,1.1,.8,s);const d=a(0,1.7,27,6.8,.34,1.3,o);d.userData.isLandscapeRoute=!0;for(const g of[-1.8,0,1.8])_(g,2.35,26.25,Math.round(g+2));l(5.5,1.2,.12);break}case"chart-room":{h(0,1.25,27,5.7,.42,i,16),h(0,1.52,27,4.25,.14,n,16);const d=h(0,1.64,27,3.72,.12,o,16);d.scale.z=.68,d.userData.isLandscapeStage=!0,u([[-3.1,1.82,27],[-1.8,2.05,26.5],[0,1.9,27.1],[1.55,2.15,26.4],[3.1,1.82,27]],s,.065),u([[-2.65,1.84,27.6],[-1.4,1.96,27.2],[.2,1.86,26.7],[1.95,1.98,27.35],[2.8,1.84,27.6]],o,.065);for(const[m,x]of[[-3.1,27],[-1.8,26.5],[0,27.1],[1.55,26.4],[3.1,27]]){const v=t(new je(.22,0),s,m,2.03,x);v.userData.isLandscapeBeacon=!0}const g=h(0,3.25,26.15,.12,3.2,i,8);g.userData.isLandscapeStage=!0;const p=t(new je(.48,1),o,0,4.98,26.15);p.userData.isLandscapeBeacon=!0,l(5.15,1.12,.1);break}case"exchange-harbor":{h(0,1.05,27,6.2,.36,i,14);for(const g of[-4,4]){a(g,1.62,27,2.1,.42,5.4,n);for(const p of[25.2,27,28.8])h(g,1.2,p,.17,1.1,o,8);a(g,2.15,26.2,1.25,.86,1.1,g<0?s:o),a(g,2.15,27.55,1.25,.86,1.1,n)}const d=a(0,1.78,27,5.4,.28,1.25,o);d.userData.isLandscapeRoute=!0;for(const[g,p]of[[-1.55,2.52],[0,3.15],[1.55,2.52]]){const m=t(new je(.34,0),s,g,p,26.35);m.userData.isLandscapeBeacon=!0}u([[-4.8,1.42,27],[-2.5,1.72,26.2],[0,2.1,26.2],[2.5,1.72,26.2],[4.8,1.42,27]],s,.085),l(5.55,1.18,.14);break}case"itinerary":{const d=new oe({color:14996397,emissive:3354402,emissiveIntensity:.28,roughness:.96}),g=new oe({color:4348748,emissive:1582364,emissiveIntensity:.12,roughness:.8});a(0,3.5,27,9.4,4.6,.42,i),a(0,3.5,26.7,8.7,3.9,.1,d),u([[-3.4,2.4,26.54],[-1.9,4.2,26.54],[.4,3.2,26.54],[2.7,4.5,26.54],[3.6,2.5,26.54]],g,.1);for(const[M,T]of[[-3.4,2.4],[-1.9,4.2],[.4,3.2],[2.7,4.5],[3.6,2.5]]){const A=t(new he(.22,10,8),s,M,T,26.45);A.userData.isLandscapeBeacon=!0}const p=new oe({color:6708036,roughness:.96});u([[-4.8,1.48,25],[-2.8,1.5,24.2],[-.2,1.52,24.6],[2.2,1.52,25.55],[4.5,1.55,25.35]],p,.18),u([[-.2,1.52,24.6],[-1.6,1.5,26.1],[-2.9,1.52,27.8]],o,.085),a(-4.35,1.95,24.9,1.55,1.12,.95,i),a(-4.35,2.56,24.9,1.62,.18,1.02,o);for(const M of[-4.78,-3.92]){const T=t(new he(.16,10,8),n,M,1.35,24.84);T.userData.isLandscapeStage=!0,h(M,2.83,24.9,.055,.55,n,7)}a(-4.35,3.12,24.9,.92,.11,.12,n),h(2.55,2.55,24.95,.12,2.75,i,8),a(2.05,3.48,24.95,1.62,.35,.18,o,-.08),a(3.03,4.02,24.95,1.5,.35,.18,n,.08);const m=t(new je(.26,0),s,2.55,4.35,24.95);m.userData.isLandscapeBeacon=!0;const x=6.85;a(x,2.8,26.45,2.3,2.45,1.5,i),a(x,2.92,25.66,1.9,1.55,.12,d),a(x,4.12,25.72,2.45,.24,1.68,o),a(x,2.1,25.42,2.2,.38,.78,n);for(const M of[x-1.02,x+1.02])a(M,2.92,25.54,.12,1.65,.14,n);for(const M of[x-.5,x,x+.5])a(M,2.42,25.3,.24,.28,.24,s);const v=t(new he(.2,10,8),s,x,4.42,25.56);v.userData.isLandscapeBeacon=!0;const y=t(new Me(.27,.38,.92,8),o,3.95,2.25,25.1);y.userData.isLandscapeStage=!0;const b=t(new he(.29,10,8),n,3.95,2.95,25.1);b.userData.isLandscapeStage=!0;const S=t(new Me(.27,.38,.92,8),i,x+.22,2.92,26.25);S.userData.isLandscapeStage=!0;const w=t(new he(.29,10,8),n,x+.22,3.62,26.25);w.userData.isLandscapeStage=!0,u([[4.12,2.72,25.15],[5.1,3.05,25.15],[x-.72,3.1,25.15]],s,.055);break}case"detour":{for(const[d,g,p]of[[-3.8,27,1.2],[-2.5,28.1,1.5],[2.8,26.6,1.2],[4,27.4,.95]]){const m=t(new Rn(p,0),n,d,1.15,g);m.userData.isLandscapeStage=!0}u([[-5.1,1.35,29],[-2.5,1.5,29.5],[0,1.45,28],[2.1,1.4,25.3],[5,1.3,25.6]],o,.2);for(const d of[-2.4,2.1]){const g=t(new je(.46,0),s,d,2.4,27.2);g.userData.isLandscapeBeacon=!0}break}case"market-encounter":{h(0,1.08,27,5.8,.3,i,12);for(const[d,g]of[-3.35,3.35].entries()){a(g,3.05,27,2.8,.18,2.25,d===0?o:n);for(const p of[-1.05,1.05])h(g+p,2.12,27,.08,1.85,i,7);a(g,2.55,27,2.38,.72,1.8,d===0?n:o);for(const p of[26.5,27.5])a(g,1.82,p,.48,.36,.42,s)}for(const[d,g]of[[-.95,o],[.95,s]]){const p=t(new Me(.24,.33,.88,8),g,d,2.12,25.7);p.userData.isLandscapeStage=!0;const m=t(new he(.25,10,8),n,d,2.78,25.7);m.userData.isLandscapeStage=!0}u([[-4.8,1.38,29],[-2.4,1.46,28.2],[0,1.55,27.6],[2.4,1.46,28.2],[4.8,1.38,29]],s,.08),l(5.1,1.08,.11);break}case"hostel":{a(0,3.2,27,7.6,3.8,2,n),a(0,3,25.9,1.55,2.8,.16,i);for(const g of[-2.3,2.3])a(g,4.05,25.88,1.12,.96,.15,s);const d=t(new he(.42,10,8),o,0,5.55,25.75);d.userData.isLandscapeBeacon=!0,u([[-4.3,1.25,29],[-2.2,1.4,27.6],[0,1.45,26],[2.4,1.35,25]],o,.14);break}case"open-route":{f(8.4,5.4,n,27),u([[0,1.35,30],[0,1.55,28],[-2.5,2.1,26],[-4.1,2.55,24.8]],o,.14),u([[0,1.35,30],[0,1.55,28],[2.5,2.1,26],[4.1,2.55,24.8]],s,.14);for(const d of[-4.1,4.1]){const g=t(new he(.46,10,8),o,d,2.55,24.8);g.userData.isLandscapeBeacon=!0}break}case"confidence":{for(let g=0;g<4;g++)a(0,1.05+g*.47,28-g*.8,7.6-g*1.25,.28,1.2,g===3?o:n);a(0,3.45,24.65,4.6,.28,1.35,i);for(const g of[-1.9,1.9])a(g,3.95,24.65,.22,.9,.22,o);const d=t(new he(.56,12,10),s,0,5.25,24.65);d.userData.isLandscapeBeacon=!0;break}case"reflection-garden":{h(0,1.05,27,6.1,.34,i,14);for(let p=0;p<4;p++)a(0,1.38+p*.42,29-p*1.05,8.2-p*1.25,.24,.82,p%2===0?n:o);const d=h(0,2.05,24.8,2.35,.16,s,16);d.scale.z=.55;for(const p of[-3.45,3.45])a(p,2.1,25.6,1.7,.2,.58,n),a(p,2.62,25.88,1.7,.72,.16,o);const g=t(new je(.48,1),s,0,4.05,24.55);g.userData.isLandscapeBeacon=!0,u([[-4.7,1.45,29.4],[-2.4,1.65,27.8],[0,1.86,26.5],[2.4,1.65,27.8],[4.7,1.45,29.4]],o,.075),l(5.3,1.1,.12);break}case"rain-shelter":{h(0,1.04,27,5.7,.34,i,12);for(const d of[-3.2,3.2])h(d,2.75,26.4,.1,3.15,o,8),h(d,2.75,28.1,.1,3.15,o,8);a(0,4.48,27.25,7.25,.24,3.6,n,-.08),a(0,4.63,27.25,7.25,.12,3.6,o,-.08),a(0,1.95,27.45,3.6,.2,.72,i),a(0,2.42,27.78,3.6,.68,.16,s);for(const d of[-4.1,-2.05,0,2.05,4.1])u([[d,3.35,24.8],[d+.35,2.85,24.8]],o,.045);u([[-4.9,1.38,29.4],[-2.3,1.5,28.8],[0,1.55,28.1],[2.4,1.5,28.8],[4.9,1.38,29.4]],s,.08),l(5.15,1.07,.1);break}case"rail-platform":{for(const d of[25.6,28.5])a(0,1.3,d,10.5,.32,1.3,n);for(const d of[-4.6,4.6]){const g=h(d,4.15,27,.18,5.7,i,8),p=t(new he(.38,10,8),o,d,6.55,26.78);p.userData.isLandscapeBeacon=!0,g.userData.isLandscapeStage=!0}f(8.7,5.8,o,27),u([[-5.5,1.12,25.3],[0,1.12,25.3],[5.5,1.12,25.3]],i,.08);break}case"rail-car":{a(0,3.15,27,9.6,3.6,2.6,i),a(0,5.05,27,8.8,.4,2.3,o);for(const d of[-3.5,-1.2,1.2,3.5])a(d,3.8,25.63,1.65,1.35,.12,s);for(const d of[-3.5,3.5]){const g=t(new he(.52,12,10),n,d,1.15,26.1);g.userData.isLandscapeStage=!0}u([[-5.4,.92,27],[0,.92,27],[5.4,.92,27]],o,.14);break}case"landscape-window":{h(0,1.05,27,5.9,.34,i,14),a(0,3.62,27,8.5,4.8,.42,n),a(0,3.64,26.74,7.75,4.05,.08,i),f(6.9,4.2,o,26.58);for(const[g,p,m,x]of[[-2.9,2.3,2.1,s],[-.9,2.5,3.15,o],[1.35,2.9,2.45,n],[3.05,1.65,1.75,s]]){const v=t(new qt(p,m,5),x,g,1.78+m/2,26.48);v.userData.isLandscapeStage=!0}u([[-3.6,1.7,26.3],[-1.5,2.02,26.3],[.4,1.78,26.3],[3.45,2.08,26.3]],o,.075);const d=t(new he(.4,12,10),s,2.6,4.35,26.25);d.userData.isLandscapeBeacon=!0,l(5.2,1.12,.1);break}case"route-network":{h(0,1.06,27,6.2,.34,i,14);for(const[d,g,p,m]of[[-4,28.3,2.1,1.45],[0,26.1,2.7,1.95],[4,28.3,2.1,1.45]]){const x=a(d,2.05,g,p,m,1.15,d===0?n:o);x.userData.isLandscapeStage=!0;const v=t(new je(d===0?.38:.28,0),s,d,3.1+m/2,g);v.userData.isLandscapeBeacon=!0}u([[-4.2,2.45,28.05],[-2.2,2.15,27.25],[0,2.12,26.75],[2.2,2.15,27.25],[4.2,2.45,28.05]],s,.1),u([[-4.2,1.18,29],[-2.1,1.2,27],[0,1.22,26],[2.1,1.2,27],[4.2,1.18,29]],o,.085),f(7.8,5.1,o,27),l(5.55,1.16,.13);break}case"career":{h(0,1.15,27,6.15,.3,i,12),h(0,2.15,27,3.25,.42,n,12),f(10.4,7.1,o,30.2),a(0,4.75,30.52,6.8,3.5,.3,i);for(const v of[-2.15,0,2.15])a(v,4.75,30.32,1.72,2.88,.12,v===0?s:n),a(v,6.18,30.21,.88,.12,.08,o),a(v,3.55,30.21,1.1,.1,.08,o);for(const v of[-3.6,0,3.6]){h(v,5.95,27.7,.07,1.55,i,6);const y=t(new he(.3,10,8),s,v,5.05,27.7);y.userData.isLandscapeBeacon=!0}for(const v of[0,Math.PI/3,Math.PI*2/3,Math.PI,Math.PI*4/3,Math.PI*5/3]){const y=Math.cos(v)*4.5,b=27+Math.sin(v)*2.4,S=a(y,1.52,b,1.1,.28,.95,i,v+Math.PI/2);S.userData.isLandscapeStage=!0;const w=a(y+Math.cos(v)*.42,2.02,b+Math.sin(v)*.32,1.02,.82,.2,n,v+Math.PI/2);w.userData.isLandscapeStage=!0,u([[y*.72,2.2,27+(b-27)*.7],[0,2.25,27]],o,.055)}const d=new oe({color:14001271,roughness:.86}),g=[new oe({color:8214333,roughness:.9}),new oe({color:4811890,roughness:.88}),new oe({color:9070660,roughness:.9})],p=[{x:4.5,z:27,coat:g[0],facing:Math.PI},{x:-2.25,z:29.08,coat:g[1],facing:-Math.PI/3},{x:2.25,z:24.92,coat:g[2],facing:Math.PI/3}];for(const v of p){const{x:y,z:b,coat:S,facing:w}=v,M=a(y,1.82,b,.66,.32,.48,S,w),T=a(y,2.32,b,.7,.82,.43,S,w),A=t(new he(.3,10,8),d,y,2.98,b),L=t(new he(.305,8,6),i,y,3.08,b+.045);L.scale.set(1,.48,.92);for(const I of[-1,1]){const N=a(y+I*.4,2.29,b-.06,.2,.62,.24,S,w);N.rotation.z=I*-.12;const B=t(new he(.12,8,6),d,y+I*.43,1.98,b-.15);B.userData.isLandscapeStage=!0}for(const I of[M,T,A,L])I.userData.isLandscapeStage=!0}a(-1.18,2.58,26.45,1.12,.16,.78,n,-.08),a(-1.18,2.7,26.45,.92,.08,.68,s,-.08);const m=t(new He(.42,.1,8,16),o,1.25,2.76,26.5);m.userData.isLandscapeStage=!0;const x=t(new je(.62,1),s,0,3.1,26.5);x.userData.isLandscapeBeacon=!0;break}case"violin":{const d=t(new he(1.55,16,12),n,-.58,3.25,27);d.scale.set(.82,1,.28),d.userData.isLandscapeStage=!0;const g=t(new he(1.2,16,12),o,.62,3.65,27);g.scale.set(.78,.86,.27),g.userData.isLandscapeStage=!0,a(0,3.7,27,.66,3.25,.48,i,-.1),a(0,5.42,26.65,.92,.16,.2,o);for(const p of[-.16,0,.16])a(p,4.1,26.62,.035,3.05,.05,s);u([[-2.65,1.65,26.5],[.1,1.45,26.5],[2.8,6.2,26.5]],o,.09);break}case"craft-quality":{a(0,2.05,27,8.6,.42,3.1,i);for(const g of[-3.5,3.5])a(g,1.05,26.05,.34,1.65,.34,n),a(g,1.05,27.95,.34,1.65,.34,n);for(const g of[-2.45,0,2.45]){const p=a(g,2.58,26.92,1.72,.58,1.18,g===0?s:n,g===0?0:.08);p.userData.isLandscapeStage=!0,a(g,2.91,26.92,1.32,.08,.82,o,g===0?0:.08)}for(const g of[25.95,28.05])a(0,3.05,g,6.1,.1,.12,o);u([[-3.7,3.28,25.55],[-1.8,3.68,25.18],[0,3.92,25.02],[1.8,3.68,25.18],[3.7,3.28,25.55]],o,.07),c(4.05).scale.setScalar(.54),l(3.6,3.72);break}case"bench":{f(9.2,5.5,i,30.8),a(0,4.55,30.45,5.35,2.9,.24,i),a(0,4.55,30.29,4.95,2.48,.08,n);for(let p=0;p<3;p++){const m=5.35-p*.64,x=t(new je(.16,0),o,-1.72,m,30.2);x.userData.isLandscapeStage=!0,a(-.25,m,30.2,2.35,.075,.05,s)}for(const p of[-4,4]){a(p,2.35,28.25,1.65,.18,1.25,n);for(const m of[-.58,.58])for(const x of[-.42,.42])a(p+m,1.65,28.25+x,.12,1.3,.12,i);a(p,1.52,26.25,.9,.2,.82,i),a(p,2.12,26.65,.86,.92,.16,o)}a(0,2.35,27,7.2,.4,2.6,n);for(const p of[-3,3])for(const m of[26.1,27.9])a(p,1.35,m,.2,1.8,.2,i);a(-1.55,2.75,26.48,2.2,.22,.92,o),a(1.55,2.8,26.6,1.35,.3,.72,s),h(2.9,3.4,27,.12,1.6,i,8),u([[-3.4,3,26.6],[-1.6,3.45,26.4],[0,3.1,26.1],[1.55,3.5,26.6]],o,.075);const d=a(3.65,1.66,24.55,.98,.2,.86,s,.12);d.rotation.z=.08,a(3.65,2.28,24.94,.9,.92,.17,o,.12);for(const[p,m,x]of[[-.34,-.28,.72],[.34,-.28,.72],[-.34,.28,.42],[.34,.28,.72]])a(3.65+p,1.24,24.55+m,.12,x,.12,i);const g=t(new He(.82,.07,8,24),s,3.65,1.1,24.55);g.rotation.x=Math.PI/2,g.userData.isLandscapeRing=!0;break}case"caliper":{for(const g of[-3.1,3.1])a(g,4.2,27,.42,5.8,.5,o);a(0,7,27,6.6,.42,.5,o),a(-.7,4.95,27,.35,2.5,.45,s),a(.25,3.05,27,2.2,1.25,1.8,n);for(let g=0;g<5;g++)a(-2.35+g*.5,6.55,26.72,.08,.24,.12,i);const d=t(new he(.36,10,8),s,-.78,5.05,26.68);d.userData.isLandscapeBeacon=!0;break}case"trust-bridge":{for(const g of[-5,5])for(const p of[26.2,27.8])h(g,2.5,p,.48,3.4,n,8);const d=a(0,2.25,27,10.5,.42,2.5,o);d.userData.isLandscapeRoute=!0;for(const g of[-4.1,4.1])a(g,4.1,27,.28,3.5,.28,i);u([[-4.1,5.6,27],[0,5.6,27],[4.1,5.6,27]],s,.12);break}case"loom":{f(8.2,6.4,n,27);for(let d=0;d<11;d++){const g=-3.45+d*.69;a(g,3.95,26.55,.075,4.55,.12,d%3===0?o:s)}for(let d=0;d<5;d++)a(0,2.5+d*.65,26.45,7.2,.1,.1,d%2?n:o);l(4.8,1.25,.05);break}case"heritage":{a(0,4.2,27,8.4,5.6,.56,i),a(0,4.2,26.66,7.7,4.9,.12,n);for(let d=0;d<5;d++)for(let g=0;g<7;g++){const p=t(new je(.22+(d+g)%2*.08,0),(d+g)%3===0?o:s,-2.85+g*.95,2.4+d*.85,26.5);p.userData.isLandscapeStage=!0}u([[-4.7,1.2,27],[-2.2,1.5,26],[0,1.35,25.8],[2.3,1.5,26],[4.7,1.2,27]],o,.1);break}case"work-dignity":{h(0,1.18,27,5.6,.32,i,12);for(const[g,p]of[-3.75,-1.25,1.25,3.75].entries()){const m=a(p,1.96,27,1.55,1.15,1.5,g%2===0?n:i);m.userData.isLandscapeStage=!0;const x=t(g%2===0?new je(.56,0):new He(.42,.12,7,16),g%2===0?o:s,p,2.9,26.45);x.userData.isLandscapeStage=!0,u([[p,3.2,26.4],[p/2,3.72,26.2],[0,4.05,26.2]],o,.055)}const d=t(new je(.48,1),s,0,4.25,26.15);d.userData.isLandscapeBeacon=!0,l(5.05,1.12,.08);break}case"craft-evolution":{a(0,1.85,27,8.4,.42,2.9,i);for(const p of[-3.2,3.2])a(p,1.12,26.08,.28,1.35,.28,n),a(p,1.12,27.92,.28,1.35,.28,n);const d=t(new He(.88,.14,8,24),o,-2.25,3.55,26.72);d.userData.isLandscapeStage=!0,a(-2.25,3.55,26.68,.12,1.38,.08,i,-.46),a(2.25,3.55,26.7,2.35,1.7,.22,n),a(2.25,3.55,26.55,1.85,1.16,.08,s);for(const p of[3.3,3.55,3.8])a(2.25,p,26.49,1.2,.055,.04,o);u([[-1.24,3.55,26.52],[0,4.1,26.52],[1.08,3.55,26.52]],s,.085);const g=t(new je(.38,1),o,0,4.45,26.45);g.userData.isLandscapeBeacon=!0;break}case"embroidery-table":{a(0,1.72,27.15,8.2,.4,3.15,i);for(const d of[-3.25,3.25])for(const g of[26.15,28.15])a(d,1.05,g,.24,1.45,.24,n);a(0,3.62,26.58,4.6,3.35,.2,n),a(0,3.62,26.43,4.12,2.88,.08,i);for(let d=0;d<7;d++){const g=-1.5+d*.5,p=a(g,3.62,26.34,.075,2.35,.06,d%2===0?o:s);p.userData.isLandscapeStage=!0}for(let d=0;d<5;d++)a(0,2.68+d*.47,26.32,3.05,.065,.055,d%2===0?s:o);for(const d of[-3.15,3.15]){h(d,2.25,26.55,.3,.85,n,10);const g=t(new He(.34,.1,7,16),o,d,2.75,26.55);g.userData.isLandscapeStage=!0}u([[-3.3,2.45,28.1],[-1.8,2.82,27.1],[0,2.55,26.2],[1.8,2.82,27.1],[3.3,2.45,28.1]],s,.06);break}case"living-heritage":{for(const[d,g]of[29.2,27,24.8].entries()){const p=7.8-d*.75;f(p,5.5-d*.3,d===1?o:n,g);for(let m=0;m<5;m++){const x=t(new je(.2+m%2*.06,0),m%2===0?s:o,-1.6+m*.8,2.5+m%2*.7,g-.36);x.userData.isLandscapeStage=!0}}u([[-3.2,4.65,29.2],[-1.5,5.1,27],[0,4.45,24.8],[1.5,5.1,27],[3.2,4.65,29.2]],o,.08),u([[-3.2,2.1,29.2],[-1.5,2.25,27],[0,2.12,24.8],[1.5,2.25,27],[3.2,2.1,29.2]],s,.065),l(5.1,1.12,.1);break}case"lunar-probe":{const d=t(new he(4.8,18,12,0,Math.PI*2,0,Math.PI/2),n,0,.3,33.5);d.userData.isLandscapeStage=!0;for(const[y,b,S]of[[-3.2,32.2,.72],[-1.6,34,.52],[2.8,32.5,.84],[3.6,34.1,.44]]){const w=t(new He(S,.13,6,18),i,y,.62,b);w.rotation.x=Math.PI/2,w.userData.isLandscapeStage=!0}const g=t(new de(2.25,.86,1.58),n,-1.8,2.02,24.5);g.userData.isLandscapeStage=!0,a(-1.8,2.47,24.5,2.04,.16,1.4,o);const p=new oe({color:2707312,emissive:1058877,emissiveIntensity:.24,roughness:.58,metalness:.3});for(const y of[-3.72,.12]){a(y,2.56,24.5,1.42,.14,1.62,p);for(let b=0;b<4;b++)a(y,2.65,23.92+b*.38,1.3,.035,.035,o);u([[y<-1.8?-2.86:-.74,2.4,24.5],[y,2.45,24.5]],o,.055)}for(const y of[-3,-1.8,-.6])for(const b of[23.58,25.42]){const S=t(new Me(.4,.4,.24,12),i,y,1.62,b);S.rotation.z=Math.PI/2,S.userData.isLandscapeStage=!0}h(-1.8,3.32,24.5,.08,1.72,i,8),a(-1.8,4.2,24.5,.82,.42,.52,n);const m=t(new he(.13,10,8),o,-1.8,4.2,24.2);m.userData.isLandscapeBeacon=!0;const x=t(new je(.58,0),s,-1.8,4.92,24.5);x.userData.isLandscapeBeacon=!0;const v=t(new he(.19,10,8),o,-1.8,5.72,24.5);v.userData.isLandscapeBeacon=!0,u([[-4.5,.82,24.2],[-3.5,.85,23.8],[-1.8,.85,24.5],[.1,.82,25.4]],o,.09);break}case"test-console":{a(0,2.45,27,7.8,.56,2.6,i),a(0,3.25,26.55,7.2,1.1,.28,n,-.16);for(let d=0;d<7;d++){const g=-2.8+d*.92,p=t(new he(.22+d%2*.07,10,8),d%3===0?o:s,g,3.42,26.28);p.userData.isLandscapeBeacon=!0}for(const d of[-2.3,0,2.3])a(d,4.75,27,1.35,1.45,.65,n);u([[-3.3,1.25,29],[-1.7,1.3,27.9],[0,1.28,27],[1.7,1.3,27.9],[3.3,1.25,29]],o,.1);break}case"orbit-adjustment":{const d=t(new he(2.1,16,12),n,0,3.1,27);d.userData.isLandscapeStage=!0;for(const[g,p]of[[.2,0],[.72,.55],[-.5,-.72]]){const m=l(4.4,3.2,g);m.rotation.y=p}for(const[g,p,m]of[[3.6,4.9,27],[-1.8,5.8,27.5],[-2.2,2.2,26.7]]){const x=t(new je(.44,0),o,g,p,m);x.userData.isLandscapeBeacon=!0}u([[3.6,4.9,27],[1.9,5.3,27],[0,5.4,27],[-1.8,5.8,27.5]],s,.07);break}case"training":{f(9,6.2,o,30.2),a(0,4.45,30,5.8,2.7,.22,i),a(0,4.45,29.82,5.35,2.3,.08,n);for(let y=0;y<3;y++){const b=5.2-y*.62;for(const S of[-1.55,0,1.55]){const w=t(new je(.13,0),y===1?s:o,S,b,29.72);w.userData.isLandscapeStage=!0}a(0,b-.2,29.72,3.8,.035,.03,i)}a(0,1.28,26.5,3.25,.28,1.55,i);for(const y of[-1.05,1.05]){const b=t(new Me(.42,.42,.18,12),o,y,1.18,26.5);b.rotation.z=Math.PI/2,b.userData.isLandscapeStage=!0,a(y,2.28,26.45,.16,1.78,.16,n)}const d=new oe({color:14213348,roughness:.76,metalness:.04}),g=new oe({color:3300220,roughness:.22,metalness:.34,emissive:1520715,emissiveIntensity:.18}),p=a(0,2.78,25.6,.78,1.18,.55,d),m=t(new he(.4,12,9),d,0,3.62,25.6),x=t(new he(.28,10,8),g,0,3.64,25.31);x.scale.set(1,.72,.45);for(const y of[-1,1]){const b=a(y*.55,2.72,25.56,.22,.82,.25,d);b.rotation.z=y*-.18,a(y*.22,1.96,25.45,.22,.72,.26,d);const S=t(new He(.17,.055,7,14),o,y*.9,2,26);S.rotation.x=Math.PI/2,S.userData.isLandscapeStage=!0}for(const y of[p,m,x])y.userData.isLandscapeStage=!0;u([[-.8,3.7,25.7],[-.55,4.55,26.1],[0,5.25,26.4],[.65,5.75,27]],s,.07);const v=t(new he(.3,10,8),o,0,5.7,27);v.userData.isLandscapeBeacon=!0,l(3.2,1.08,.1);break}case"science-exhibit":{for(const[d,g,p]of[[-3.5,3.5,.65],[0,5.1,.88],[3.5,3.5,.65]]){const m=t(new he(p,12,10),d===0?o:s,d,g,27);m.userData.isLandscapeBeacon=!0}for(const d of[-2.5,0,2.5]){const g=h(d,2.2,27,.13,2.7,i,8);g.rotation.z=d*.04}l(4.5,5.4,.44),l(2.7,3.6,-.7);break}case"relay-bridge":{f(10.2,6.2,i,29.7);const d=t(new he(1.15,14,10),o,-4.2,3.7,27.7);d.userData.isLandscapeBeacon=!0;const g=t(new he(1.75,16,12),n,4.2,2.7,28.1);g.userData.isLandscapeStage=!0;for(const[m,x,v]of[[3.35,28.1,.38],[4.8,28.1,.52],[5.05,27.75,.24]]){const y=t(new He(v,.09,6,16),i,m,2.72,x);y.rotation.x=Math.PI/2,y.userData.isLandscapeStage=!0}a(0,4.65,27,.92,.68,.7,s);for(const m of[-1.45,1.45]){a(m,4.68,27,1.52,.12,.82,o);for(let x=0;x<3;x++)a(m,4.69,26.72+x*.27,1.38,.035,.035,i)}const p=t(new he(.22,10,8),s,0,5.75,27);p.userData.isLandscapeBeacon=!0,u([[-3.05,4.15,27.5],[-1.5,5.4,27],[0,5.72,27],[1.5,4.3,27.3],[3.2,3.2,27.8]],s,.09),l(3.1,5.2,.36);break}case"sample-lab":{a(0,2.05,27,8.4,.38,3.2,i);for(const g of[-3.4,3.4])for(const p of[25.9,28.1])a(g,1.14,p,.22,1.62,.22,o);a(0,4.7,30,6.8,2.9,.22,n);for(const g of[-2.3,0,2.3]){const p=t(new de(1.55,1.22,1.06),s,g,3,26.55);p.material=new oe({color:10205388,transparent:!0,opacity:.2,roughness:.28,metalness:.08}),p.userData.isLandscapeStage=!0;const m=t(new Rn(.42,0),g===0?o:n,g,2.68,26.42);m.scale.set(1,.72,.82),m.userData.isLandscapeStage=!0,h(g,2.35,26.42,.52,.1,i,12)}for(let g=0;g<3;g++)a(0,5.35-g*.6,29.86,3.4,.06,.035,g===1?s:o);const d=h(3.05,3.35,26.55,.16,1.75,o,10);d.rotation.z=.28,a(3.25,4.05,26.55,.85,.14,.14,s,-.28),u([[-3.4,3.1,28.4],[-1.6,3.7,27.7],[0,3.45,27.2],[1.8,3.1,28.4],[3.05,3.7,27.7]],o,.055);break}case"moon-horizon":{const d=t(new he(6.3,20,12,0,Math.PI*2,0,Math.PI/2),n,0,.55,34.5);d.userData.isLandscapeStage=!0;for(const[p,m,x]of[[-4.3,32.2,.72],[-1.8,34.4,.5],[2.1,33.1,.86],[4.2,35,.48]]){const v=t(new He(x,.11,6,18),i,p,.8,m);v.rotation.x=Math.PI/2,v.userData.isLandscapeStage=!0}a(0,1.55,25.6,8.8,.34,2.7,i);for(const p of[-3.6,3.6])a(p,2.45,25.7,.24,1.62,.24,o);a(0,3.35,25.7,7.4,.22,.35,s);const g=t(new je(.46,0),o,0,4.15,25.7);g.userData.isLandscapeBeacon=!0,u([[-4.1,1.02,28.7],[-2.1,1.06,27.3],[0,1.1,26.6],[2.1,1.06,27.3],[4.1,1.02,28.7]],s,.085);break}case"systems-simulation":{for(const g of[-3.6,0,3.6]){a(g,3.35,27.8,2.35,2.25,.3,i),a(g,3.55,27.58,1.95,1.48,.08,n);for(let p=0;p<3;p++)u([[g-.78,3.05+p*.26,27.48],[g-.18,3.24+p*.26,27.48],[g+.28,3.12+p*.26,27.48],[g+.78,3.36+p*.26,27.48]],p===1?s:o,.035);h(g,1.82,27.8,.1,1.24,o,8)}a(0,1.3,27.7,8.6,.22,2.25,i);const d=t(new hi(.56,1),s,0,5.25,27.48);d.userData.isLandscapeBeacon=!0,u([[-2.3,4.8,27.45],[0,5.2,27.45],[2.3,4.8,27.45]],o,.07);break}case"mission-control":{f(10.8,6.8,o,30.2),a(0,5,30,7.1,3,.24,i);for(let g=0;g<5;g++){const p=-2.4+g*1.2,m=a(p,5,29.82,.88,1.65,.08,g===2?s:n);for(let x=0;x<4;x++)a(p,4.5+x*.27,29.74,.58,.035,.025,x===2?s:o);m.userData.isLandscapeStage=!0}for(const g of[-3.2,0,3.2]){a(g,2.2,26.7,2.15,.35,1.35,o),a(g,2.65,26.3,1.75,.65,.18,n,-.18);for(const p of[-.72,.72])a(g+p,1.65,26.72,.12,1.1,.12,i)}u([[-4.2,3.1,27.2],[-2.1,3.75,27],[0,4.15,27],[2.1,3.75,27],[4.2,3.1,27.2]],s,.065);const d=t(new je(.38,1),s,0,6.95,29.7);d.userData.isLandscapeBeacon=!0;break}case"crew-simulation":{f(8.6,6.1,o,29.5);for(const m of[-3.1,3.1]){const x=t(new he(1.2,12,10),i,m,3.2,27.6);x.scale.set(.9,1.1,.62),x.userData.isLandscapeStage=!0,a(m,3.2,26.96,1.7,.1,.1,s)}const d=new oe({color:14279397,roughness:.78,metalness:.04}),g=new oe({color:3627640,roughness:.24,metalness:.32,emissive:1586250,emissiveIntensity:.16});for(const[m,x,v]of[[-1.8,25.9,-.22],[1.8,25.9,.22]]){const y=a(m,2.55,x,.72,.98,.48,d,v),b=t(new he(.42,12,9),d,m,3.48,x),S=t(new he(.28,10,8),g,m,3.49,x-.22);S.scale.set(1,.72,.48);for(const M of[-1,1])a(m+M*.5,2.48,x-.04,.2,.76,.24,d,v);const w=t(new je(.16,0),o,m,2.75,x-.27);for(const M of[y,b,S,w])M.userData.isLandscapeStage=!0}u([[-2.8,2.1,27.2],[-1.2,2.55,26.7],[0,2.7,26.1],[1.2,2.55,26.7],[2.8,2.1,27.2]],s,.065);const p=t(new he(.28,10,8),o,0,5.15,27.15);p.userData.isLandscapeBeacon=!0;break}case"future-frontier":{const d=t(new he(2.55,16,10,0,Math.PI*2,0,Math.PI/2),s,0,1.42,28);d.userData.isLandscapeStage=!0,a(0,1.45,28,5.15,.18,.3,i);for(const p of[-4.2,4.2]){const m=a(p,2.05,27.3,2.35,.12,1.25,o,p<0?-.12:.12);m.userData.isLandscapeStage=!0;for(let x=0;x<3;x++)a(p,2.14,26.86+x*.42,2.12,.03,.03,i);for(const x of[-.92,.92])a(p+x,1.35,27.3,.12,1.35,.12,i)}for(const p of[0,Math.PI/3,Math.PI*2/3,Math.PI,Math.PI*4/3,Math.PI*5/3]){const m=Math.cos(p)*3.2,x=28+Math.sin(p)*2.6,v=t(new he(.16,8,6),o,m,1.25,x);v.userData.isLandscapeBeacon=!0,u([[m,1.05,x],[m*.55,1.12,28+(x-28)*.55],[0,1.12,28]],s,.045)}const g=t(new je(.48,1),o,0,5.1,28);g.userData.isLandscapeBeacon=!0,l(5.2,1.2,.1);break}case"exchange":{for(const d of[-3.8,3.8]){a(d,3.7,27,.35,5.8,.48,o);for(let g=0;g<3;g++)a(d*.85,2.15+g*1.45,27,1.4,.12,.62,n)}for(let d=0;d<8;d++)_(-3.1+d%4*2.05,2.65+Math.floor(d/4)*1.45,26.55,d,.34);u([[-4.1,1.35,29],[-2.1,1.6,27.5],[0,1.45,26],[2.1,1.6,27.5],[4.1,1.35,29]],o,.12);break}case"resilience":{f(8.6,5.8,n,27);for(let d=0;d<4;d++){const g=-3+d*2;a(g,2.25,26.1,1.28,1.1,.94,d%2?o:s);const p=t(new he(.27,10,8),s,g,3.05,25.72);p.userData.isLandscapeBeacon=!0}u([[-4.5,1.25,29],[-2.2,1.45,27.4],[0,1.45,26],[2.2,1.45,27.4],[4.5,1.25,29]],o,.14);break}case"exchange-wall":{a(0,4,27,9.2,5.8,.56,i),a(0,4,26.65,8.5,5.15,.12,n);for(const d of[2.2,3.4,4.6,5.8])a(0,d,26.35,8.1,.14,.44,o);for(let d=0;d<3;d++)for(let g=0;g<7;g++)_(-3.3+g*1.1,2.68+d*1.2,26.05,d*7+g,.37);u([[-4.4,1.2,29],[0,1.38,28.2],[4.4,1.2,29]],s,.1);break}case"resource-cycle":{for(let g=0;g<3;g++){const p=g/3*Math.PI*2-Math.PI/2,m=Math.cos(p)*3.4,x=27+Math.sin(p)*2.2;h(m,1.55,x,1.05,.5,n,8),_(m,2.2,x-.35,g,.7)}u([[-3.4,2.6,27],[0,3,24.7],[3.4,2.6,27],[0,2.3,29.2],[-3.4,2.6,27]],o,.11);const d=t(new he(.52,12,10),s,0,3.8,27);d.userData.isLandscapeBeacon=!0;break}case"library":{a(0,3.55,27,8.8,4.8,2.3,n);for(const d of[-3.1,0,3.1]){a(d,3.8,25.78,1.8,3.1,.14,i);for(let g=0;g<3;g++){a(d,2.65+g*.92,25.62,1.56,.12,.18,o);for(let p=0;p<3;p++)_(d-.48+p*.48,3.1+g*.92,25.42,g*3+p,.24)}}a(0,3.1,25.68,1.12,2.6,.18,s),f(9.3,6.3,o,28.1);break}case"digital-lending":{a(0,4.1,27,4.3,6,.62,i),a(0,4.1,26.62,3.72,5.4,.12,s);for(const[d,g]of[[-.62,5.6],[.52,4.25],[-.45,2.9]])a(d,g,26.43,1.68,.28,.08,o);for(const d of[-4.2,4.2]){const g=a(d,3.5,27,1.7,4.6,1.2,n);g.userData.isLandscapeStage=!0;for(let p=0;p<3;p++)a(d,2.15+p*1.25,26.35,1.5,.1,.2,o)}u([[-4,2.2,26.1],[-2.2,2.8,26.1],[0,3.2,26.1],[2.2,2.8,26.1],[4,2.2,26.1]],s,.08);break}case"budget-board":{a(0,4.15,28.7,8.8,5.2,.42,i),a(0,4.15,28.46,8.2,4.62,.08,n);for(const d of[-2.7,0,2.7])a(d,4.05,28.38,.08,3.55,.06,o);for(const d of[2.45,3.65,4.85,6.05])a(0,d,28.38,7.8,.07,.06,o);for(const[d,g]of[1.05,1.7,2.5].entries()){const p=a(-1.8+d*1.8,2.55+g/2,28.18,.92,g,.18,d===2?s:o);p.userData.isLandscapeStage=!0}for(let d=0;d<5;d++)h(3.38,1.48+d*.24,27,.48,.13,d%2?o:s,12);u([[-4.5,1.28,29.2],[-2.2,1.35,27.8],[0,1.4,26.3],[2.1,1.48,25.6],[4.4,1.55,26.4]],o,.1),l(5.1,1.08,.1);break}case"trust-ledger":{h(0,1.18,27,6.1,.34,i,12),a(0,1.92,27,7.4,.28,3.5,n),a(-1.75,2.13,26.72,2.5,.12,2.45,s,-.08),a(1.1,2.13,26.72,2.5,.12,2.45,o,.08);for(const d of[-2.45,-1.72,-.98,.38,1.1,1.82])a(d,2.24,26.35,.08,.04,1.72,i);for(const d of[25.85,26.42,27.02])a(-1.73,2.24,d,2.24,.04,.06,i);for(const d of[-4,4]){const g=t(new je(.62,0),d<0?o:s,d,3.45,27);g.userData.isLandscapeBeacon=!0}u([[-4,2.9,27],[-2,2.55,27],[0,2.42,27],[2,2.55,27],[4,2.9,27]],o,.08),l(5.15,1.16,.1);break}case"sustainable-market":{for(const[d,g]of[-3.55,0,3.55].entries()){a(g,2.28,27,2.75,.22,2.2,d===1?o:n);for(const m of[-.98,.98])a(g+m,1.55,27,.16,1.35,.16,i);const p=a(g,4.05,27,3.05,.24,2.5,d===1?s:o,d===1?.03:-.03);p.userData.isLandscapeStage=!0;for(let m=0;m<3;m++){const x=a(g-.78+m*.78,2.76,26.2,.56,.72,.54,m%2?s:i);x.userData.isLandscapeStage=!0}}for(const d of[-1.75,1.75]){const g=t(new Me(.24,.32,.9,8),d<0?o:i,d,1.82,24.9);g.userData.isLandscapeStage=!0,t(new he(.24,10,8),n,d,2.47,24.9)}u([[-5.1,1.2,29.2],[-3,1.28,27.7],[0,1.35,26],[3,1.28,27.7],[5.1,1.2,29.2]],s,.08),l(5.35,1.08,.1);break}case"knowledge-bridge":{for(const g of[-4.15,4.15]){a(g,3.4,27,1.55,4.3,1.55,n);for(let p=0;p<3;p++){a(g,2.15+p*1.12,26.12,1.28,.12,.18,o);for(let m=0;m<3;m++)_(g-.42+m*.42,2.53+p*1.12,25.96,p*3+m,.22)}}f(10.4,5.35,o,28.8);const d=a(0,2.28,27,7.1,.36,2.35,i);d.userData.isLandscapeRoute=!0;for(const g of[-2.3,0,2.3]){const p=a(g,2.5,27,1.18,.14,1.45,g===0?s:o);p.userData.isLandscapeStage=!0}u([[-4.2,2.58,27],[-2.2,2.68,27],[0,2.72,27],[2.2,2.68,27],[4.2,2.58,27]],s,.08),l(5.3,1.12,.1);break}default:c()}}function cv(r,e,t,n){if(!e||!t||e==="hub"||e==="section-a"||e==="section-b"||e==="stories-of-china"||e==="learning-lab"||e==="unit-project")return;const i=document.createElement("canvas");i.width=1024,i.height=256;const s=i.getContext("2d");if(!s)return;s.fillStyle="rgba(7, 14, 27, 0.88)",s.fillRect(20,24,984,208),s.strokeStyle=`#${n.toString(16).padStart(6,"0")}`,s.lineWidth=8,s.strokeRect(24,28,976,200),s.textAlign="center",s.textBaseline="middle",s.font="bold 52px 'Microsoft YaHei', sans-serif",s.fillStyle="#f8fbff",s.fillText(t.slice(0,26),512,126,920);const o=new In(i);o.colorSpace=Mt;const c=new Ni(new bi({map:o,transparent:!0,depthWrite:!1,toneMapped:!1}));c.position.set(0,11,14),c.scale.set(19,4.75,1),c.renderOrder=8,r.add(c)}function lv(r,e,t,n,i){const s=new z(new Me(13,14.5,.65,8),e);s.position.y=.34,r.add(s);const o=new z(new He(11.8,.11,8,48),i);o.rotation.x=Math.PI/2,o.position.y=.72,o.userData.isLandscapeRing=!0,r.add(o);const c=new z(new Me(7.2,7.6,.16,8),t);c.position.y=.76,r.add(c);const l=new z(new He(6.8,.07,8,40),n);l.rotation.x=Math.PI/2,l.position.y=.9,l.userData.isLandscapeRing=!0,r.add(l);const a=new z(new de(.72,8.5,.72),i);a.position.set(-5.2,4.8,8.5);const h=a.clone();h.position.x=5.2;const u=new z(new de(11.1,.72,.72),i);u.position.set(0,8.7,8.5),r.add(a,h,u);const f=new z(new He(2.75,.1,8,40),n);f.position.set(0,4.65,8.5),r.add(f);for(const[_,d]of[[-7,-7],[7,-7],[-7,7],[7,7]]){const g=new z(new Me(.28,.42,4.8,8),t);g.position.set(_,2.6,d),r.add(g);const p=new z(new he(.43,10,8),n);p.position.set(_,5.05,d),p.userData.isLandscapeBeacon=!0,r.add(p)}}function hv(r,e,t,n,i,s){if(!e||e==="hub")return;const o=new z(new Me(7.8,8.8,.4,8),n);switch(o.position.set(0,.86,27),r.add(o),e){case"section-a":{const c=new z(new de(8.4,.42,5.6),t);c.position.set(-2.2,3.5,27),c.rotation.y=-.18;const l=new z(new de(5.8,.16,4.4),i);l.position.set(2.2,3.8,27),l.rotation.y=.18;const a=new z(new de(.32,2.1,5.8),s);a.position.set(0,2.25,27),r.add(c,l,a),Zs(l);break}case"section-b":{for(const a of[-3.8,3.8]){const h=new z(new Me(.72,1.05,8.2,8),t);h.position.set(a,4.9,27),r.add(h)}const c=new z(new He(4.1,.2,8,40,Math.PI),s);c.position.set(0,8.2,27),c.rotation.z=Math.PI,r.add(c);const l=new z(new he(1.25,16,12),i);l.position.set(0,4.9,27),r.add(l),Zs(l);break}case"stories-of-china":{for(const[a,h,u]of[[5.8,2,8],[4.4,4.2,6],[3,6.2,5]]){const f=new z(new Me(a,a+.55,.7,u),t);f.position.set(0,h,27),r.add(f)}const c=new z(new je(1.7,1),i);c.position.set(0,9,27),r.add(c);const l=new z(new He(2.5,.13,8,32),s);l.rotation.x=Math.PI/2,l.position.set(0,9,27),r.add(l),Zs(c),Pa(l);break}case"learning-lab":{const c=new z(new Me(2.4,2.8,6.5,12),i);c.position.set(0,4.3,27),r.add(c);for(const l of[.35,-.35]){const a=new z(new He(4.9,.16,8,48),s);a.position.set(0,4.3,27),a.rotation.set(l,.4,l*1.4),r.add(a),Pa(a)}Zs(c);break}case"unit-project":{const c=new z(new je(2.8,1),i);c.position.set(0,7.4,27),r.add(c);for(const[a,h]of[[-5.3,24],[5.3,24],[-5.3,30],[5.3,30]]){const u=new z(new Me(.5,.78,6.8,8),s);u.position.set(a,3.9,h),r.add(u)}const l=new z(new He(4.5,.18,8,48),s);l.rotation.x=Math.PI/2,l.position.set(0,1.2,27),r.add(l),Zs(c),Pa(l);break}}}function Zs(r){r.userData.isLandscapeBeacon=!0}function Pa(r){r.userData.isLandscapeRing=!0}function uv(r,e,t,n){const i=[{x:-21,z:-20,color:3718648},{x:21,z:-20,color:16498468},{x:-21,z:20,color:4906624},{x:21,z:20,color:16020150}];for(const s of i){const o=new z(new Me(3.3,3.7,.32,6),e);o.position.set(s.x,.7,s.z),r.add(o);const c=t.clone();c.color.setHex(s.color),c.emissive.setHex(s.color),c.emissiveIntensity=1.3;const l=new z(new hi(.95,1),c);l.position.set(s.x,2.2,s.z),l.userData.isLandscapeBeacon=!0,r.add(l);const a=new z(new He(1.55,.08,6,24),n.clone());a.material.color.setHex(s.color),a.material.emissive.setHex(s.color),a.rotation.x=Math.PI/2,a.position.set(s.x,1.25,s.z),a.userData.isLandscapeRing=!0,r.add(a)}}function fv(r,e,t,n,i){if(i){const c=new oe({color:3360862,emissive:1058873,emissiveIntensity:.14,roughness:.78,metalness:.18}),l=new oe({color:5735318,emissive:2646388,emissiveIntensity:.18,roughness:.62,metalness:.12});for(const _ of[-1,1]){const d=new z(new Me(.3,.46,2.8,7),c);d.position.set(_*13.2,1.4,34),r.add(d);for(const g of[.7,1.35,2]){const p=new z(new de(.56,.07,.09),l);p.position.set(_*13.2,g,33.56),p.userData.isLandscapeRoute=!0,r.add(p)}}const a=new oe({color:3891573,emissive:2649216,emissiveIntensity:.28,roughness:.52,metalness:.2}),h=new Wn([new P(-9,5.5,42),new P(-6,8,42),new P(0,9.2,42),new P(6,8,42),new P(9,5.5,42)]),u=new z(new Pn(h,40,.07,6,!1),a);u.userData.isLandscapeRoute=!0,r.add(u);const f=new oe({color:10410461,emissive:5610924,emissiveIntensity:.34,roughness:.4,metalness:.18});for(const _ of[-9,9]){const d=new z(new he(.46,12,8),f);d.position.set(_,5.5,42),d.userData.isLandscapeBeacon=!0,r.add(d)}return}const s=[[-28,35,13],[0,43,18],[28,35,11]];for(const[c,l,a]of s){const h=new z(new Me(2.4,3.3,a,6),e);h.position.set(c,a/2,l),r.add(h);const u=new z(new he(2.2,12,8),t);u.position.set(c,a+1.1,l),u.userData.isLandscapeBeacon=!0,r.add(u);const f=new z(new He(3.6,.08,6,32),n);f.rotation.x=Math.PI/2,f.position.set(c,a*.64,l),f.userData.isLandscapeRing=!0,r.add(f)}const o=new z(new de(54,.18,.34),e);o.position.set(0,6.5,35),r.add(o)}function dv(r,e,t,n,i){const s=new oe({color:2379102,emissive:1059895,emissiveIntensity:.22,roughness:.48,metalness:.22}),o=new oe({color:7755840,roughness:.86,metalness:.04}),c=new oe({color:15261639,roughness:.88,side:St}),l=(y,b,S,w,M)=>{const T=new z(y,b);return T.position.set(S,w,M),r.add(T),T},a=l(new de(78,.22,42),s,0,.46,39);a.userData.isLandscapeStage=!0;const h=l(new de(66,.62,5.2),e,0,.92,29.4);h.userData.isLandscapeRoute=!0;for(const y of[-26,0,26]){const b=l(new de(8.5,.46,14),o,y,.82,36.2);b.userData.isLandscapeRoute=!0;for(const S of[-1,1]){const w=l(new Me(.2,.26,2.2,7),t,y+S*3.45,.45,37.8);w.userData.isLandscapeStage=!0;const M=l(new He(.28,.06,6,16),i,y+S*3.45,1.62,37.8);M.rotation.x=Math.PI/2,M.userData.isLandscapeRing=!0}}const u=new z(new Pn(new Wn([new P(0,1.3,27),new P(0,1.45,33),new P(-2,1.5,40),new P(0,1.6,45),new P(0,1.8,50)]),32,.16,8,!1),n);u.userData.isLandscapeRoute=!0,r.add(u);for(const[y,b]of[-18,-6,6,18].entries()){const S=l(new Me(1.25,1.58,.55,8),t,b,1.2,40.2);S.userData.isLandscapeStage=!0;const w=l(new de(1.12,1.72+y%2*.45,.2),y%2?i:e,b,2.24,40.2);w.userData.isLandscapeStage=!0;const M=l(new je(.36+y%2*.08,0),n,b,3.35+y%2*.45,40.02);M.userData.isLandscapeBeacon=!0}for(const[y,b]of[-23,23].entries()){const S=y===0?37.2:42.1,w=new yn;w.moveTo(-5.3,.48),w.lineTo(5.3,.48),w.lineTo(3.9,-.72),w.lineTo(-3.8,-.72),w.closePath();const M=l(new Bi(w,{depth:2.35,bevelEnabled:!0,bevelSegments:1,steps:1,bevelSize:.08,bevelThickness:.06}),o,b-5.25,1.55,S-1.18);M.userData.isLandscapeStage=!0;const T=l(new Me(.08,.12,4.7,7),t,b,3.55,S);T.userData.isLandscapeStage=!0;const A=new yn;A.moveTo(-.1,-1.2),A.lineTo(-.1,2.35),A.lineTo(-2.55,-.78),A.closePath();const L=l(new Wi(A),y===0?c:n,b-.08,2.9,S-1.3);L.userData.isLandscapeStage=!0;const I=new yn;I.moveTo(.12,-.85),I.lineTo(.12,1.62),I.lineTo(1.88,-.55),I.closePath();const N=l(new Wi(I),y===0?i:c,b+.12,2.55,S-1.34);N.userData.isLandscapeStage=!0;const B=l(new he(.48,10,8),i,b,5.95,S);B.userData.isLandscapeBeacon=!0}const f=l(new de(17.5,9.6,1.2),t,0,4.45,51.2);f.userData.isLandscapeStage=!0;for(const y of[-8.5,8.5]){const b=l(new Me(.72,1.02,9,8),e,y,4.25,50.4);b.userData.isLandscapeStage=!0}const _=l(new de(16.3,.42,.18),i,0,8.32,50.45);_.userData.isLandscapeStage=!0;for(const y of[-5.2,0,5.2]){const b=l(new de(4.35,4.45,.18),e,y,4.75,50.42);b.userData.isLandscapeStage=!0;for(const S of[3.6,4.35,5.1,5.85]){const w=l(new de(2.8+(Math.round(S*10)+Math.round(y))%2*.55,.12,.09),n,y,S,50.28);w.userData.isLandscapeRoute=!0}}const d=document.createElement("canvas");d.width=1024,d.height=192;const g=d.getContext("2d");if(g){g.fillStyle="#182b3b",g.fillRect(0,0,d.width,d.height),g.strokeStyle="#d7b67a",g.lineWidth=8,g.strokeRect(12,12,d.width-24,d.height-24),g.fillStyle="#f4e6c6",g.textAlign="center",g.textBaseline="middle",g.font="bold 66px Arial, sans-serif",g.fillText("THE HARBOR OF LIVES",512,72),g.font="bold 30px Arial, sans-serif",g.fillText("CHOICE  ·  SERVICE  ·  LEGACY",512,145);const y=new In(d);y.colorSpace=Mt;const b=new z(new rn(14.8,2.78),new Ct({map:y,side:St,toneMapped:!1}));b.position.set(0,7.7,50.12),b.rotation.y=Math.PI,r.add(b)}const p=l(new Me(1.28,1.8,8.6,8),e,0,3.65,58.2);p.userData.isLandscapeStage=!0;const m=l(new Me(1.55,1.55,1.1,8),i,0,8.45,58.2);m.userData.isLandscapeStage=!0;const x=l(new je(.94,1),n,0,9.35,58.2);x.userData.isLandscapeBeacon=!0;const v=l(new He(1.48,.1,7,28),i,0,9.35,58.2);v.userData.isLandscapeRing=!0;for(const[y,b]of[[-31,31],[-15,46],[15,46],[31,31]]){const S=new z(new He(2.8,.08,6,28),s);S.rotation.x=Math.PI/2,S.position.set(y,.66,b),S.userData.isLandscapeRing=!0,r.add(S)}}function pv(r,e){const t=new Ct({color:10457207,side:St}),n=new Ct({color:11704947,side:St}),i=new oe({color:11900524,roughness:.96,metalness:0}),s=new oe({color:6705466,roughness:1,metalness:0}),o=new oe({color:7897434,roughness:.96,metalness:0}),c=(a,h,u)=>{const f=new yn;f.moveTo(-82,0),f.lineTo(-82,8*u),f.quadraticCurveTo(-64,17*u,-48,10*u),f.quadraticCurveTo(-28,3*u,-10,12*u),f.quadraticCurveTo(10,21*u,29,11*u),f.quadraticCurveTo(49,3*u,64,12*u),f.quadraticCurveTo(74,16*u,82,8*u),f.lineTo(82,0),f.closePath();const _=new z(new Wi(f,20),h);_.position.set(0,.35,a),_.userData.noLandscapeShadow=!0,r.add(_)};c(76,t,1),c(65,n,.64);for(const[a,h,u,f,_]of[[-1.6,39,5.6,13,.08],[-4.3,51,7.5,15,.2],[-7.1,64,9.4,16,.28]]){const d=new z(new de(u,.08,f),i);d.position.set(a,.49,h),d.rotation.y=_,d.userData.isLandscapeRoute=!0,r.add(d)}for(const[a,h,u]of[[-19,46,1],[19,54,.84],[-28,61,.72]]){const f=new z(new Me(.2,.32,3.6*u,7),s);f.position.set(a,2.3*u,h),r.add(f);const _=new z(new he(1,8,5),o);_.position.set(a,4.1*u,h),_.scale.set(2.6*u,.62*u,1.7*u),_.userData.isLandscapeStage=!0,r.add(_)}const l=new z(new je(.42,0),e);l.position.set(-7.1,1.1,64),l.userData.isLandscapeBeacon=!0,r.add(l)}function mv(r,e,t,n,i=!1){if(i)return;const s=new z(new Me(2.5,4.2,18,8),e);s.position.set(0,9,38),r.add(s);for(const[o,c,l,a]of[[-7,16,38,7],[7,18,38,8],[0,24,38,9]]){const h=new z(new hi(a,1),t);h.position.set(o,c,l),h.userData.isLandscapeBeacon=!0,r.add(h)}for(const o of[-31,31]){const c=new z(new He(4,.16,8,32),n);c.rotation.x=Math.PI/2,c.position.set(o,.9,36),c.userData.isLandscapeRing=!0,r.add(c)}}function gv(r,e,t,n,i,s=!1){if(s){const a=new z(new de(18,.36,8),e);a.position.set(0,.85,39),r.add(a);for(const _ of[-6.2,6.2]){const d=new z(new de(.48,5.8,.5),t);d.position.set(_,3.9,39),r.add(d)}const h=new z(new de(14,.48,6.4),i);h.position.set(0,6.9,39),r.add(h);const u=new z(new de(5.8,.3,1.35),t);u.position.set(0,1.9,35.5),u.userData.isLandscapeStage=!0,r.add(u);for(const _ of[-2.2,2.2]){const d=new z(new de(.22,1.6,.22),i);d.position.set(_,1.05,35.5),r.add(d)}const f=new z(new he(.48,10,8),n);f.position.set(0,5.7,38.6),f.userData.isLandscapeBeacon=!0,r.add(f);return}const o=new z(new de(26,.7,15),e);o.position.set(0,1.1,39),r.add(o);for(const a of[-9,-3,3,9]){const h=new z(new Me(1.1,1.5,13,8),t);h.position.set(a,7.5,40),r.add(h)}const c=new z(new qt(12,5,4),n);c.position.set(0,17,40),c.rotation.y=Math.PI/4,c.userData.isLandscapeBeacon=!0,r.add(c);const l=new z(new He(8,.18,8,48),i);l.rotation.x=Math.PI/2,l.position.set(0,15,40),l.userData.isLandscapeRing=!0,r.add(l)}function _v(r,e,t,n,i=!1){if(i){const a=new z(new Me(5,5.8,.3,10),e);a.position.set(9,.65,40),r.add(a);const h=new z(new qt(1.65,8,8),t);h.position.set(9,4.8,40),h.userData.isLandscapeBeacon=!0,r.add(h);const u=new z(new He(3.7,.13,8,40),n);u.rotation.x=Math.PI/2.4,u.position.set(9,5,40),u.userData.isLandscapeRing=!0,r.add(u);return}const s=new z(new Me(12,14,.55,8),e);s.position.set(0,1.1,40),r.add(s);const o=new z(new qt(3.2,16,8),t);o.position.set(0,9.5,40),o.userData.isLandscapeBeacon=!0,r.add(o);const c=new z(new He(8,.2,8,48),n);c.rotation.x=Math.PI/2.4,c.position.set(0,9,40),c.userData.isLandscapeRing=!0,r.add(c);const l=c.clone();l.rotation.x=-Math.PI/3,l.rotation.z=Math.PI/5,r.add(l)}function xv(r,e,t,n,i,s=!1,o){const c=new z(new de(30,.55,18),e);if(c.position.set(0,1,38),r.add(c),!(s&&/^section_c-world-[1-4]$/.test(o??"")))for(const a of[-12,0,12]){const h=new z(new de(8,.42,5.5),t);h.position.set(a,2,35),r.add(h);const u=new z(new qt(5.7,2.8,4),n);u.position.set(a,5.1,35),u.rotation.y=Math.PI/4,u.userData.isLandscapeBeacon=!0,r.add(u)}if(!s){const a=new z(new de(13,13,2.2),t);a.position.set(0,7.2,49),r.add(a);const h=new z(new de(10.5,8.5,.22),n);h.position.set(0,7.4,47.8),h.userData.isLandscapeBeacon=!0,r.add(h);for(let u=-3;u<=3;u++){const f=new z(new de(7.5,.08,.12),i);f.position.set(0,5+u*1.15,47.62),f.userData.isLandscapeRing=!0,r.add(f)}}}function vv(r,e,t,n,i){const s=new z(new de(20,1,14),e);s.position.set(0,1.2,38),r.add(s);const o=new z(new Me(5.5,7,16,8),t);o.position.set(0,9.5,38),r.add(o);const c=new z(new qt(8,5,8),n);c.position.set(0,20,38),c.userData.isLandscapeBeacon=!0,r.add(c);const l=new z(new He(7,.18,8,40,Math.PI),i);l.rotation.z=Math.PI,l.position.set(0,11,30),l.userData.isLandscapeRing=!0,r.add(l)}const yv={high:{pixelRatio:2,grassRadius:40,grassCell:1.25,reflectors:3,reflectRes:512,reflectDist:300,shadowMap:2048,bloom:!0,bloomScale:1},med:{pixelRatio:1.5,grassRadius:34,grassCell:1.5,reflectors:2,reflectRes:384,reflectDist:220,shadowMap:1536,bloom:!0,bloomScale:.66},low:{pixelRatio:1,grassRadius:26,grassCell:1.9,reflectors:0,reflectRes:256,reflectDist:160,shadowMap:1024,bloom:!1,bloomScale:.5}};function Mv(){var s;if(typeof window>"u")return"med";const r=((s=window.matchMedia)==null?void 0:s.call(window,"(pointer: coarse)").matches)??!1,e=Math.min(window.innerWidth,window.innerHeight)<540,t=navigator.hardwareConcurrency??4,n=navigator.deviceMemory??4,i=r||e;return i&&(t<=4||n<=3)?"low":i||t<=4||n<=4?"med":"high"}const Sv=5,bv=new P(0,1,0),wv=new P(1,0,0);class Cv{constructor(e,t){Y(this,"container");Y(this,"renderer");Y(this,"resizeObserver");Y(this,"scene");Y(this,"camera");Y(this,"raycaster",new D0);Y(this,"pointer",new re);Y(this,"nodeGroups",new Map);Y(this,"pickables",[]);Y(this,"explorer");Y(this,"pathGroup");Y(this,"decorGroup");Y(this,"waterGroup");Y(this,"terrain");Y(this,"terrainMaps");Y(this,"groundDetailMap");Y(this,"envRT");Y(this,"mountains");Y(this,"skyDome");Y(this,"grassMesh");Y(this,"grassUniforms");Y(this,"grassCellSize",1.1);Y(this,"grassRadius",54);Y(this,"grassCellMap",new Map);Y(this,"grassNeeded",new Set);Y(this,"grassFreeSlots",[]);Y(this,"grassLastX",Number.POSITIVE_INFINITY);Y(this,"grassLastZ",Number.POSITIVE_INFINITY);Y(this,"grassDummy",new bt);Y(this,"grassColor",new ce);Y(this,"clouds");Y(this,"unitLandscape");Y(this,"dustGroup");Y(this,"dustPool",[]);Y(this,"lastStep",0);Y(this,"sunDisc");Y(this,"composer");Y(this,"bloomPass");Y(this,"walkPhase",0);Y(this,"avatarYaw",0);Y(this,"avatarLean",0);Y(this,"expression","neutral");Y(this,"blinkTimer",2);Y(this,"blink",0);Y(this,"usingGlb",!1);Y(this,"mixer");Y(this,"glbIdle");Y(this,"glbWalk");Y(this,"glbClips");Y(this,"glbEmoting",!1);Y(this,"contactShadow");Y(this,"_n",new P);Y(this,"_fwd",new P);Y(this,"_right",new P);Y(this,"_basis",new Qe);Y(this,"_q",new ln);Y(this,"_leanQ",new ln);Y(this,"sun");Y(this,"hemi");Y(this,"ambientLight");Y(this,"animId",0);Y(this,"paused",!0);Y(this,"pausedBeforeVisibility",!0);Y(this,"spectatorMode",!1);Y(this,"clock",new P1);Y(this,"_fpsTs",0);Y(this,"_fpsFrames",0);Y(this,"_fpsAdapted",!1);Y(this,"nodes",[]);Y(this,"currentId","");Y(this,"onNodeClick");Y(this,"onProximity");Y(this,"onExploreUpdate");Y(this,"onPickupNear");Y(this,"onPickupCollect");Y(this,"waterMeshes",[]);Y(this,"reflectors",[]);Y(this,"quality",Mv());Y(this,"qcfg",yv[this.quality]);Y(this,"dynamicLightLimit",this.quality==="low"?5:this.quality==="med"?8:12);Y(this,"dynamicLightBudgetFrames",30);Y(this,"_lightPosition",new P);Y(this,"sunDirV",new P);Y(this,"spectatorFocus",new P);Y(this,"hasSpectatorFocus",!1);Y(this,"rebuildToken",0);Y(this,"player",new Jx);Y(this,"explorerCam",new Kx);Y(this,"nearNode",null);Y(this,"currentBiome",Dc);Y(this,"activeUnitId");Y(this,"activeWorldId");Y(this,"activeWorldTitle");Y(this,"pickupGroup");Y(this,"pickupMeshes",new Map);Y(this,"pickupData",[]);Y(this,"nearPickup",null);Y(this,"lastExploreUpdateAt",0);Y(this,"waterFrame",0);Y(this,"onVisibilityChange",()=>{if(document.hidden){this.pausedBeforeVisibility=this.paused,this.pause();return}this.pausedBeforeVisibility||this.resume()});Y(this,"onKeyDown",e=>{this.paused||this.spectatorMode||(e.key.toLowerCase()==="e"||e.key==="Enter")&&this.tryInteract()});Y(this,"onPointerDown",e=>{var s;if(this.paused||this.spectatorMode||e.button!==0)return;const t=this.renderer.domElement.getBoundingClientRect();this.pointer.x=(e.clientX-t.left)/t.width*2-1,this.pointer.y=-((e.clientY-t.top)/t.height)*2+1,this.raycaster.setFromCamera(this.pointer,this.camera);const n=this.raycaster.intersectObjects(this.pickables,!1)[0],i=n==null?void 0:n.object.userData.nodeId;if(i&&((s=this.nearNode)==null?void 0:s.id)===i&&this.nearNode.unlocked){this.onNodeClick(i);return}if(this.terrain){const o=this.raycaster.intersectObject(this.terrain,!1)[0];if(o&&(this.player.setMoveTarget(o.point.x,o.point.z),i)){const c=this.nodes.find(l=>l.id===i);c!=null&&c.unlocked&&this.player.setMoveTarget(c.x+3,c.z+3)}}});Y(this,"onResize",()=>{var n;const e=this.container.clientWidth,t=this.container.clientHeight;!e||!t||(this.camera.aspect=e/t,this.camera.updateProjectionMatrix(),this.renderer.setSize(e,t),(n=this.composer)==null||n.setSize(e,t))});Y(this,"animate",e=>{var o,c,l;if(this.paused){this.animId=0;return}this.animId=requestAnimationFrame(this.animate),this.clock.update(e);const t=Math.min(this.clock.getDelta(),.05),n=this.clock.getElapsed();if(!this._fpsAdapted){this._fpsFrames++;const a=performance.now();if(this._fpsTs===0&&(this._fpsTs=a),a-this._fpsTs>=3e3){if(this._fpsFrames/((a-this._fpsTs)/1e3)<40){const u=this.renderer.getPixelRatio(),f=Math.max(.75,u-.5);f<u?(this.renderer.setPixelRatio(f),(o=this.composer)==null||o.setPixelRatio(f),this._fpsAdapted=f<=.75):this._fpsAdapted=!0}this._fpsTs=a,this._fpsFrames=0}}this.mixer&&this.mixer.update(t);const i=this.explorerCam.update(this.camera,this.player.position,this.player.yaw,t,!this.spectatorMode,this.spectatorMode&&this.hasSpectatorFocus?this.spectatorFocus:void 0);if(this.player.update(t,i),this.explorer){this.explorer.position.lerp(this.player.position,1-Math.exp(-14*t));let a=this.player.yaw-this.avatarYaw;for(;a>Math.PI;)a-=Math.PI*2;for(;a<-Math.PI;)a+=Math.PI*2;this.avatarYaw+=a*Math.min(1,t*12);const h=this.player.isMoving(),u=this.player.isSprinting();if(h){this.walkPhase+=t*(u?15:9.5);const w=Math.floor(this.walkPhase/Math.PI);if(w!==this.lastStep){this.lastStep=w;const M=w%2===0?1:-1,T=Math.cos(this.avatarYaw)*.18*M,A=-Math.sin(this.avatarYaw)*.18*M;this.emitDust(this.player.position.x+T,this.player.position.y,this.player.position.z+A)}}const f=this.explorer.userData.rig;if(f){if(h){const w=u?.95:.6,M=u?1.35:.95,T=Math.sin(this.walkPhase),A=Math.sin(this.walkPhase+Math.PI);f.leftLeg.hip.rotation.x=T*w,f.rightLeg.hip.rotation.x=A*w,f.leftLeg.knee.rotation.x=.12+Math.max(0,-T)*M,f.rightLeg.knee.rotation.x=.12+Math.max(0,-A)*M,f.leftArm.rotation.x=-T*.8,f.rightArm.rotation.x=-A*.8,f.head.rotation.z=0,f.cape.rotation.x=-.18-(.32+Math.abs(Math.sin(this.walkPhase))*.18)*(u?1.3:1),f.cape.rotation.z=Math.sin(this.walkPhase*.5)*.08}else{const w=Math.min(1,t*9);f.leftLeg.hip.rotation.x*=1-w,f.rightLeg.hip.rotation.x*=1-w,f.leftLeg.knee.rotation.x+=(.06-f.leftLeg.knee.rotation.x)*w,f.rightLeg.knee.rotation.x+=(.06-f.rightLeg.knee.rotation.x)*w,f.leftArm.rotation.x*=1-w,f.rightArm.rotation.x*=1-w,f.head.rotation.z=Math.sin(n*1.4)*.05,f.cape.rotation.x+=(-.2-f.cape.rotation.x)*w,f.cape.rotation.z+=(Math.sin(n*1.1)*.04-f.cape.rotation.z)*w}this.updateFace(f,t)}if(this.usingGlb&&this.glbWalk&&this.glbIdle&&!this.glbEmoting){const w=this.glbWalk.getEffectiveWeight(),M=w+((h?1:0)-w)*Math.min(1,t*6);this.glbWalk.setEffectiveWeight(M),this.glbIdle.setEffectiveWeight(1-M)}const _=h?u?.14:.05:0;this.avatarLean+=(_-this.avatarLean)*Math.min(1,t*8);const d=this.explorer.position.x,g=this.explorer.position.z,p=1.6,m=Ft(d-p,g,It),x=Ft(d+p,g,It),v=Ft(d,g-p,It),y=Ft(d,g+p,It);this._n.set(m-x,2*p,v-y).normalize(),this._n.lerp(bv,.55).normalize(),this._fwd.set(Math.sin(this.avatarYaw),0,Math.cos(this.avatarYaw)),this._fwd.addScaledVector(this._n,-this._fwd.dot(this._n)).normalize(),this._right.crossVectors(this._n,this._fwd).normalize(),this._fwd.crossVectors(this._right,this._n).normalize(),this._basis.makeBasis(this._right,this._n,this._fwd),this._q.setFromRotationMatrix(this._basis),this._leanQ.setFromAxisAngle(wv,this.avatarLean),this._q.multiply(this._leanQ),this.explorer.quaternion.slerp(this._q,1-Math.exp(-12*t));const b=h?Math.abs(Math.sin(this.walkPhase))*.06:Math.sin(n*1.4)*.01;this.explorer.position.y=this.player.position.y+b;const S=this.explorer.children.find(w=>{var M;return(M=w.userData)==null?void 0:M.isFootRing});if(S){const w=h?1+Math.sin(this.walkPhase)*.08:1;S.scale.set(w,w,w),S.material.opacity=h?.45:.28}}this.updateProximity(),this.updatePickupProximity(),this.updateDust(t),this.tickScene(n,t);const s=performance.now();(s-this.lastExploreUpdateAt>=66||this.lastExploreUpdateAt===0)&&(this.lastExploreUpdateAt=s,(l=this.onExploreUpdate)==null||l.call(this,{playerX:this.player.position.x,playerZ:this.player.position.z,playerYaw:this.player.yaw,nodes:this.nodes,nearNodeId:(c=this.nearNode)==null?void 0:c.id,pickups:this.pickupData,biome:this.minimapPalette()})),this.composer?this.composer.render():this.renderer.render(this.scene,this.camera)});this.container=e,this.onNodeClick=t.onNodeClick,this.onProximity=t.onProximity,this.onExploreUpdate=t.onExploreUpdate,this.onPickupNear=t.onPickupNear,this.onPickupCollect=t.onPickupCollect;const n=e.clientWidth||360,i=e.clientHeight||420;this.scene=new jl,this.scene.fog=new So(1713472,.0042),this.camera=new sn(50,n/i,.2,900),this.camera.position.set(0,8,20),this.renderer=new R1({antialias:this.quality!=="low",alpha:!1,powerPreference:"high-performance"}),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,this.qcfg.pixelRatio)),this.renderer.setSize(n,i),this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=nr,this.renderer.toneMapping=Ao,this.renderer.toneMappingExposure=1.28,this.renderer.outputColorSpace=Mt,e.appendChild(this.renderer.domElement),this.explorerCam.bindDrag(this.renderer.domElement),this.buildSky(),this.buildClouds(),this.buildLights(),this.buildEnvironment(this.currentBiome),this.buildTerrain(),this.buildMountains(),this.buildGrass(),this.buildDust(),this.spawnExplorer(),this.setupPostFX(n,i),this.bindEvents()}setupPostFX(e,t){if(!this.qcfg.bloom){this.composer=void 0;return}try{const n=new O1(this.renderer);n.addPass(new B1(this.scene,this.camera));const i=this.qcfg.bloomScale,s=new Rs(new re(e*i,t*i),.62,.5,.78);n.addPass(s),n.addPass(new k1),n.setPixelRatio(Math.min(window.devicePixelRatio,this.qcfg.pixelRatio)),n.setSize(e,t),this.composer=n,this.bloomPass=s}catch{this.composer=void 0}}setNodes(e,t,n=!0){if(this.nodes=e,this.currentId=t,this.rebuildPath(),this.rebuildDecor(),n)this.rebuildNodesAsync();else{this.rebuildToken++;for(const i of this.nodeGroups.values())this.scene.remove(i),Fs(i);this.nodeGroups.clear(),this.pickables=[]}this.teleportToNode(t),this.updateDynamicLightBudget(!0)}resume(){this.paused&&(this.paused=!1,this._fpsTs=0,this._fpsFrames=0,this.player.setEnabled(!this.spectatorMode),this.onResize(),this.animId||this.animate())}pause(){this.paused=!0,this.player.setEnabled(!1),this.animId&&(cancelAnimationFrame(this.animId),this.animId=0)}setSpectatorMode(e){this.spectatorMode=e,this.player.setStickInput(0,0),this.player.setEnabled(!e&&!this.paused),this.explorer&&(this.explorer.visible=!e)}tryInteract(){var e,t;return this.spectatorMode||this.paused?!1:this.nearPickup?((e=this.onPickupCollect)==null||e.call(this,this.nearPickup.id),!0):(t=this.nearNode)!=null&&t.unlocked?(this.onNodeClick(this.nearNode.id),!0):!1}setStickInput(e,t){this.player.setStickInput(e,t)}setBiome(e){this.activeUnitId=e,this.activeWorldId=void 0,this.activeWorldTitle=void 0,this.hasSpectatorFocus=!1;const t=Qx(e);this.currentBiome=t,this.grassMesh&&(this.grassMesh.visible=["coast","forest","plains"].includes(t.decorStyle)),this.updateGrassPlacement(!0),this.applyBiomeToSky(t),this.applyBiomeToLights(t),this.buildEnvironment(t),this.applyBiomeToTerrain(t,!1),this.applyOutfitFromBiome(t),this.mountains&&(this.mountains.visible=t.decorStyle==="forest"||t.decorStyle==="plains"),this.scene.fog=new So(t.fogColor,t.fogDensity)}setSubWorld(e,t){if(this.activeWorldId===e&&this.activeWorldTitle===t)return;this.activeWorldId=e,this.activeWorldTitle=t;const n=Zt(e);if(this.hasSpectatorFocus=!1,this.applyBiomeToTerrain(this.currentBiome,n),this.applySunDiscScale(n),this.mountains&&(this.mountains.visible=!n&&(this.currentBiome.decorStyle==="forest"||this.currentBiome.decorStyle==="plains")),this.grassMesh&&(this.grassMesh.visible=["coast","forest","plains"].includes(this.currentBiome.decorStyle)&&!n,this.updateGrassPlacement(!0)),this.bloomPass&&(this.bloomPass.strength=n?.2:Oi.clamp(.5+(1.5-this.currentBiome.sunIntensity)*.28,.45,1.05)),this.activeUnitId&&this.nodes.length>0&&(this.rebuildUnitLandscape(),Zt(e))){const i=this.nodes.find(s=>s.id===this.currentId)??this.nodes[0];if(i){const s=Ft(i.x,i.z,It);this.spectatorFocus.set(i.x-3.5,s+4.8,i.z+11.5),this.hasSpectatorFocus=!0,this.player.yaw=0,this.player.setPosition(i.x,s,i.z+2.5),this.avatarYaw=0,this.explorerCam.resetBehind(0)}}}setOutfitAccent(e){var n;const t=(n=this.explorer)==null?void 0:n.userData.rig;if(t){t.mats.trim.color.setHex(e),t.mats.trim.emissive.setHex(e).multiplyScalar(.4),t.mats.cape.color.setHex(e),t.mats.cape.emissive.setHex(e).multiplyScalar(.35);return}this.usingGlb&&this.explorer&&this.explorer.traverse(i=>{const s=i,o=s.material;if(s.isMesh&&o&&"emissive"in o){const c=s.name;/^Torso$|^Body$/i.test(c)?(o.color.setHex(e),o.emissive.setHex(e).multiplyScalar(.14)):o.emissive.setHex(e).multiplyScalar(.06)}})}setExpression(e){this.expression=e,this.usingGlb&&this.playGlbEmote(e)}playGlbEmote(e){var o;if(!this.mixer||!this.glbClips||!this.glbIdle)return;const t=e==="happy"?"Wave":e==="surprised"?"Jump":null;if(!t){this.glbEmoting=!1,this.glbIdle.reset().fadeIn(.3).play();return}const n=this.glbClips.find(c=>c.name===t);if(!n)return;const i=this.mixer.clipAction(n);i.setLoop(Eu,1),i.clampWhenFinished=!1,i.reset().play(),(o=this.glbWalk)==null||o.setEffectiveWeight(0),this.glbIdle.crossFadeTo(i,.2,!1),this.glbEmoting=!0;const s=c=>{var l;c.action===i&&(this.glbEmoting=!1,i.crossFadeTo(this.glbIdle.reset().play(),.3,!1),(l=this.mixer)==null||l.removeEventListener("finished",s))};this.mixer.addEventListener("finished",s)}applyOutfitFromBiome(e){this.setOutfitAccent(e.crystalColor)}minimapPalette(){const e=this.currentBiome,[t,n,i]=e.terrainTint,s=Math.round(t*255)<<16|Math.round(n*255)<<8|Math.round(i*255),o=Math.min(255,Math.round(t*255)+70)<<16|Math.min(255,Math.round(n*255)+80)<<8|Math.min(255,Math.round(i*255)+60);return{ground:s,highland:o,path:e.pathColor}}grassKey(e,t){return(e+1e5)*262147+(t+1e5)}hideGrassSlot(e){const t=this.grassMesh;t&&(this.grassDummy.position.set(0,-9999,0),this.grassDummy.rotation.set(0,0,0),this.grassDummy.scale.setScalar(0),this.grassDummy.updateMatrix(),t.setMatrixAt(e,this.grassDummy.matrix))}placeGrass(e,t,n){const i=this.grassMesh;if(!i)return;const s=this.grassCellSize,o=Uo(t*1.7,n*2.3),c=Uo(t*3.1+5,n*1.3+7),l=Uo(t*.7+11,n*2.9+3),a=(t+.5)*s+(o-.5)*s,h=(n+.5)*s+(c-.5)*s,u=Ft(a,h,It),f=1.2;if(Math.abs(Ft(a+f,h,It)-Ft(a-f,h,It))/(2*f)>.85){this.hideGrassSlot(e);return}this.grassDummy.position.set(a,u,h),this.grassDummy.rotation.set(0,l*Math.PI*2,0);const d=.68+c*.45;this.grassDummy.scale.set(d,.72+o*.45,d),this.grassDummy.updateMatrix(),i.setMatrixAt(e,this.grassDummy.matrix);const g=c;this.grassColor.setRGB(.86+g*.34,.96+o*.22,.8+(1-g)*.26),i.setColorAt(e,this.grassColor)}updateGrassPlacement(e=!1){const t=this.grassMesh;if(!t||!t.visible)return;const n=this.player.position.x,i=this.player.position.z;if(!e){const _=n-this.grassLastX,d=i-this.grassLastZ;if(_*_+d*d<9)return}this.grassLastX=n,this.grassLastZ=i;const s=this.grassCellSize,o=this.grassRadius,c=o*o,l=Math.floor((n-o)/s),a=Math.ceil((n+o)/s),h=Math.floor((i-o)/s),u=Math.ceil((i+o)/s),f=this.grassNeeded;f.clear();for(let _=l;_<=a;_++)for(let d=h;d<=u;d++){const g=(_+.5)*s-n,p=(d+.5)*s-i;g*g+p*p>c||f.add(this.grassKey(_,d))}for(const[_,d]of this.grassCellMap)f.has(_)||(this.grassCellMap.delete(_),this.hideGrassSlot(d),this.grassFreeSlots.push(d));for(const _ of f){if(this.grassCellMap.has(_))continue;const d=this.grassFreeSlots.pop();if(d===void 0)break;const g=_%262147-1e5,p=(_-(g+1e5))/262147-1e5;this.placeGrass(d,p,g),this.grassCellMap.set(_,d)}t.instanceMatrix.needsUpdate=!0,t.instanceColor&&(t.instanceColor.needsUpdate=!0)}disposeReflectors(){for(const e of this.reflectors)e.getRenderTarget().dispose(),e.geometry.dispose(),e.material.dispose();this.reflectors=[]}updateFace(e,t){this.blinkTimer-=t,this.blinkTimer<=0&&(this.blink=1,this.blinkTimer=2.4+Math.random()*3.2),this.blink=Math.max(0,this.blink-t*9);const n=1-this.blink*.85;e.eyeL.scale.y=n,e.eyeR.scale.y=n;const i=this.nearNode||this.nearPickup?"happy":this.expression;let s=.37,o=1,c=1,l=.2;i==="happy"?(s=.39,o=1.5,c=.85,l=.188):i==="surprised"&&(s=.42,o=.7,c=2.4,l=.192);const a=Math.min(1,t*8);e.brow.position.y+=(s-e.brow.position.y)*a,e.mouth.scale.x+=(o-e.mouth.scale.x)*a,e.mouth.scale.y+=(c-e.mouth.scale.y)*a,e.mouth.position.y+=(l-e.mouth.position.y)*a}setPickups(e){this.pickupData=e,this.rebuildPickups()}markPickupCollected(e){var i,s;const t=this.pickupData.find(o=>o.id===e);t&&(t.collected=!0);const n=this.pickupMeshes.get(e);n&&(n.userData.dying=!0,n.userData.dieTimer=0),((i=this.nearPickup)==null?void 0:i.id)===e&&(this.nearPickup=null,(s=this.onPickupNear)==null||s.call(this,null))}tryCollectPickup(){var e;return this.nearPickup?((e=this.onPickupCollect)==null||e.call(this,this.nearPickup.id),!0):!1}dispose(){var e,t,n,i,s,o,c,l,a;if(cancelAnimationFrame(this.animId),this.animId=0,this.renderer.domElement.removeEventListener("pointerdown",this.onPointerDown),this.explorerCam.disposeDrag(),window.removeEventListener("keydown",this.onKeyDown),window.removeEventListener("resize",this.onResize),document.removeEventListener("visibilitychange",this.onVisibilityChange),(e=this.resizeObserver)==null||e.disconnect(),this.player.dispose(),Qt(this.scene,this.pathGroup),Qt(this.scene,this.decorGroup),Qt(this.scene,this.waterGroup),Qt(this.scene,this.mountains),Qt(this.scene,this.clouds),Qt(this.scene,this.unitLandscape),Qt(this.scene,this.explorer),this.removePickupGroup(),this.grassMesh&&(this.scene.remove(this.grassMesh),this.grassMesh.geometry.dispose(),this.grassMesh.material.dispose()),this.sunDisc&&(this.scene.remove(this.sunDisc),(t=this.sunDisc.material.map)==null||t.dispose(),this.sunDisc.material.dispose()),this.dustGroup){this.scene.remove(this.dustGroup);const h=(n=this.dustPool[0])==null?void 0:n.material;(i=h==null?void 0:h.map)==null||i.dispose();for(const u of this.dustPool)u.material.dispose();this.dustPool=[]}this.disposeReflectors(),(s=this.mixer)==null||s.stopAllAction(),(o=this.composer)==null||o.dispose();for(const h of this.nodeGroups.values())Fs(h);if(this.pickupMeshes.clear(),this.terrain){this.terrain.geometry.dispose();const h=this.terrain.material;for(const u of new Set([h.map,this.groundDetailMap]))u==null||u.dispose();(c=h.roughnessMap)==null||c.dispose(),(l=h.normalMap)==null||l.dispose(),h.dispose()}(a=this.envRT)==null||a.dispose(),this.skyDome&&(this.skyDome.geometry.dispose(),this.skyDome.material.dispose()),this.renderer.dispose(),this.renderer.domElement.remove()}spawnExplorer(){Qt(this.scene,this.explorer),this.explorer=Yx(),this.contactShadow=au(1.9),this.explorer.add(this.contactShadow),this.scene.add(this.explorer),this.explorer.visible=!this.spectatorMode,this.applyOutfitFromBiome(this.currentBiome),this.tryLoadGlbAvatar()}async tryLoadGlbAvatar(){var e;try{const t=await mf(),n=(e=t==null?void 0:t.world)==null?void 0:e.avatar;if(!t||!n)return;const i=await wx(n.file,n,t);if(!i)return;if(Qt(this.scene,this.explorer),Tx(i.group),this.explorer=i.group,this.contactShadow=au(1.9),this.explorer.add(this.contactShadow),this.explorer.position.copy(this.player.position),this.explorer.quaternion.setFromEuler(new li(0,this.avatarYaw,0)),this.scene.add(this.explorer),this.usingGlb=!0,i.clips.length){this.mixer=new I0(this.explorer),this.glbClips=i.clips;const s=i.clips.find(c=>/idle|stand|breath/i.test(c.name))??i.clips[0];this.glbIdle=this.mixer.clipAction(s),this.glbIdle.play();const o=i.clips.find(c=>/walk|run|move/i.test(c.name));o&&(this.glbWalk=this.mixer.clipAction(o),this.glbWalk.play(),this.glbWalk.setEffectiveWeight(0))}}catch{}}teleportToNode(e){const t=this.nodes.find(i=>i.id===e)??this.nodes[0];if(!t)return;const n=Ft(t.x,t.z,It);this.player.yaw=0,this.player.setPosition(t.x+4,n,t.z-8),this.explorer&&(this.explorer.position.copy(this.player.position),this.explorer.rotation.set(0,this.player.yaw,0),this.explorer.quaternion.setFromEuler(this.explorer.rotation)),this.avatarYaw=this.player.yaw,this.avatarLean=0,this.explorerCam.resetBehind(this.player.yaw),this.camera.position.set(t.x+10,n+7,t.z-16),this.camera.lookAt(t.x,n+1.5,t.z)}buildSky(){const e=new Gt({side:Yt,depthWrite:!1,uniforms:{topColor:{value:new ce(3824266)},midColor:{value:new ce(5929642)},bottomColor:{value:new ce(659488)},offset:{value:22},exponent:{value:.52}},vertexShader:`
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
      `});this.skyDome=new z(new he(560,48,32),e),this.scene.add(this.skyDome);const t=new Float32Array(2e3*3),n=$t(42);for(let o=0;o<2e3;o++){const c=300+n()*80,l=n()*Math.PI*2,a=n()*Math.PI*.45;t[o*3]=c*Math.sin(a)*Math.cos(l),t[o*3+1]=c*Math.cos(a)+30,t[o*3+2]=c*Math.sin(a)*Math.sin(l)+Yi}const i=new wt;i.setAttribute("position",new Rt(t,3)),this.scene.add(new Ou(i,new rl({color:15265528,size:.42,transparent:!0,opacity:.82,sizeAttenuation:!0})));const s=new bi({map:this.makeGlowTexture(),color:16773320,transparent:!0,depthWrite:!1,blending:cr,fog:!1});this.sunDisc=new Ni(s),this.sunDisc.scale.set(52,52,1),this.scene.add(this.sunDisc)}buildEnvironment(e){var t;try{const n=new Cc(this.renderer),i=new jl,s=new Gt({side:Yt,depthWrite:!1,uniforms:{topColor:{value:new ce(e.skyTop)},midColor:{value:new ce(e.skyMid)},bottomColor:{value:new ce(e.skyBot)},sunColor:{value:new ce(e.sunColor)},sunDir:{value:new P(.5,.72,.36).normalize()}},vertexShader:`
          varying vec3 vDir;
          void main() {
            vDir = normalize(position);
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,fragmentShader:`
          uniform vec3 topColor, midColor, bottomColor, sunColor, sunDir;
          varying vec3 vDir;
          void main() {
            vec3 d = normalize(vDir);
            vec3 col = mix(bottomColor, midColor, smoothstep(-0.2, 0.35, d.y));
            col = mix(col, topColor, smoothstep(0.2, 0.95, d.y));
            float sd = max(dot(d, normalize(sunDir)), 0.0);
            col += sunColor * pow(sd, 26.0) * 2.6;
            col += sunColor * pow(sd, 3.0) * 0.26;
            gl_FragColor = vec4(col, 1.0);
          }
        `});i.add(new z(new he(10,32,24),s));const o=n.fromScene(i,.02);(t=this.envRT)==null||t.dispose(),this.envRT=o,this.scene.environment=o.texture,i.traverse(c=>{const l=c;l.isMesh&&(l.geometry.dispose(),l.material.dispose())}),n.dispose()}catch{}}makeGlowTexture(){const t=document.createElement("canvas");t.width=t.height=256;const n=t.getContext("2d"),i=n.createRadialGradient(256/2,256/2,0,256/2,256/2,256/2);i.addColorStop(0,"rgba(255,255,255,1)"),i.addColorStop(.18,"rgba(255,245,210,0.95)"),i.addColorStop(.5,"rgba(255,210,140,0.35)"),i.addColorStop(1,"rgba(255,200,120,0)"),n.fillStyle=i,n.fillRect(0,0,256,256);const s=new In(t);return s.colorSpace=Mt,s}buildDust(){const e=this.makeCloudTexture(),t=new dt;for(let n=0;n<28;n++){const i=new bi({map:e,color:13483942,transparent:!0,opacity:0,depthWrite:!1}),s=new Ni(i);s.visible=!1,s.userData={life:0,vx:0,vy:0,vz:0},t.add(s),this.dustPool.push(s)}this.dustGroup=t,this.scene.add(t)}emitDust(e,t,n){let i=0;for(const s of this.dustPool){if(s.userData.life>0)continue;s.position.set(e+(Math.random()-.5)*.2,t+.05,n+(Math.random()-.5)*.2),s.userData.life=1,s.userData.vx=(Math.random()-.5)*.6,s.userData.vy=.3+Math.random()*.45,s.userData.vz=(Math.random()-.5)*.6;const o=.3+Math.random()*.2;if(s.scale.set(o,o,1),s.visible=!0,s.material.opacity=.5,++i>=3)break}}updateDust(e){for(const t of this.dustPool){const n=t.userData.life;if(n<=0)continue;const i=n-e*1.4;if(t.userData.life=i,i<=0){t.visible=!1;continue}t.userData.vy=t.userData.vy-e*.6,t.position.x+=t.userData.vx*e,t.position.y+=t.userData.vy*e,t.position.z+=t.userData.vz*e,t.material.opacity=i*.5;const s=(1.3-i)*.6+.3;t.scale.set(s,s,1)}}buildLights(){this.hemi=new h0(13164799,2373672,.5),this.scene.add(this.hemi),this.ambientLight=new p0(10137804,.18),this.scene.add(this.ambientLight),this.sun=new Ec(16774368,1.45),this.sun.position.set(55,72,35),this.sun.castShadow=!0,this.sun.shadow.mapSize.set(this.qcfg.shadowMap,this.qcfg.shadowMap);const e=this.sun.shadow.camera;e.near=8,e.far=340,e.left=e.bottom=-150,e.right=e.top=150,this.sun.shadow.bias=-35e-5,this.scene.add(this.sun);const t=new Ec(9221375,.5);t.position.set(-40,28,-30);const n=new Mn(10864895,.55,160);n.position.set(-35,28,Yi),n.userData.isGlobalLight=!0,this.scene.add(t,n)}updateDynamicLightBudget(e=!1){if(!e&&++this.dynamicLightBudgetFrames<30)return;this.dynamicLightBudgetFrames=0;const t=[];this.scene.traverse(n=>{const i=n;if(i.userData.isGlobalLight||!i.isLight||!i.isPointLight&&!i.isSpotLight)return;const s=i;s.getWorldPosition(this._lightPosition),t.push({light:s,distance:this._lightPosition.distanceToSquared(this.player.position)})}),t.sort((n,i)=>n.distance-i.distance);for(let n=0;n<t.length;n++)t[n].light.visible=n<this.dynamicLightLimit}applyBiomeToSky(e){if(!this.skyDome)return;const t=this.skyDome.material;t.uniforms.topColor.value.setHex(e.skyTop),t.uniforms.midColor.value.setHex(e.skyMid),t.uniforms.bottomColor.value.setHex(e.skyBot),t.needsUpdate=!0}applyBiomeToLights(e){this.hemi&&(this.hemi.color.setHex(e.hemiSky),this.hemi.groundColor.setHex(e.hemiGround)),this.ambientLight&&this.ambientLight.color.setHex(e.ambientColor),this.sun&&(this.sun.color.setHex(e.sunColor),this.sun.intensity=e.sunIntensity),this.sunDisc&&(this.sunDisc.material.color.setHex(e.sunColor),this.applySunDiscScale(Zt(this.activeWorldId))),this.bloomPass&&(this.bloomPass.strength=Oi.clamp(.5+(1.5-e.sunIntensity)*.28,.45,1.05))}applySunDiscScale(e){if(!this.sunDisc)return;const t=e?this.currentBiome.sunFocusedDiscScale??this.currentBiome.sunDiscScale??52:this.currentBiome.sunDiscScale??52;this.sunDisc.scale.set(t,t,1)}applyBiomeToTerrain(e,t){if(!this.terrain)return;const n=this.terrain.material;n.color.setRGB(1,1,1),n.map=this.groundDetailMap??null,n.vertexColors=!0,n.roughness=t?.95:.9,n.metalness=.02,n.needsUpdate=!0,this.paintTerrain(e,t)}rebuildPickups(){this.removePickupGroup(),this.pickupMeshes.clear(),this.pickupGroup=new dt;for(const e of this.pickupData){if(e.collected)continue;const t=this.createPickupOrb(e);this.pickupGroup.add(t),this.pickupMeshes.set(e.id,t)}this.scene.add(this.pickupGroup),this.updateDynamicLightBudget(!0)}createPickupOrb(e){const t=this.currentBiome,n=new dt;n.position.set(e.x,e.y,e.z),n.userData.pickupId=e.id;const i=new oe({color:t.orbColor,emissive:new ce(t.orbColor),emissiveIntensity:1.8,roughness:.1,metalness:.4,transparent:!0,opacity:.92}),s=new z(new he(.32,14,10),i);s.userData.isOrbCore=!0,n.add(s);const o=new Ct({color:t.glowColor,transparent:!0,opacity:.22,side:Yt,depthWrite:!1}),c=new z(new he(.58,12,8),o);c.userData.isOrbGlow=!0,n.add(c);const l=new He(.52,.04,6,24),a=new Ct({color:t.orbColor,transparent:!0,opacity:.55,depthWrite:!1}),h=new z(l,a);h.userData.isOrbRing=!0,h.rotation.x=Math.PI/3,n.add(h);const u=new Mn(t.glowColor,.6,8);u.userData.isOrbLight=!0,n.add(u);const f=this.createWordSprite(e.word,t.orbColor);return f.position.y=1.1,f.userData.isWordSprite=!0,n.add(f),n.userData.baseY=e.y,n.userData.pickupId=e.id,n}createWordSprite(e,t){var h;const i=`#${new ce(t).getHexString()}`,s=document.createElement("canvas");s.width=256,s.height=64;const o=s.getContext("2d");o.clearRect(0,0,256,64),o.fillStyle="rgba(0,0,0,0.52)",(h=o.roundRect)==null||h.call(o,4,8,248,48,12),o.fill(),o.font="bold 26px 'Arial', sans-serif",o.fillStyle=i,o.textAlign="center",o.textBaseline="middle",o.shadowColor=i,o.shadowBlur=8,o.fillText(e,128,34);const c=new In(s),l=new bi({map:c,transparent:!0,depthWrite:!1}),a=new Ni(l);return a.scale.set(2.4,.6,1),a}disposePickupResources(e){Fs(e)}removePickupGroup(){this.pickupGroup&&(this.scene.remove(this.pickupGroup),this.disposePickupResources(this.pickupGroup),this.pickupGroup=void 0)}buildTerrain(){const e=new rn(pi.width,pi.depth,Rl.w,Rl.d);e.rotateX(-Math.PI/2);const t=e.attributes.position;for(let n=0;n<t.count;n++){const i=t.getX(n),s=t.getZ(n),o=It(i,s);t.setY(n,o)}e.computeVertexNormals(),e.setAttribute("color",new Rt(new Float32Array(t.count*3).fill(1),3)),this.terrainMaps=tv(),this.groundDetailMap=nv(),this.terrain=new z(e,new oe({color:16777215,map:this.groundDetailMap,roughnessMap:this.terrainMaps.roughness,normalMap:this.terrainMaps.normal,normalScale:new re(.7,.7),vertexColors:!0,roughness:.92,metalness:.02,envMapIntensity:.32})),this.terrain.receiveShadow=!0,this.terrain.position.set(0,Uf,Yi),this.scene.add(this.terrain),this.paintTerrain(this.currentBiome,!1)}paintTerrain(e,t){if(!this.terrain)return;const n=this.terrain.geometry,i=n.attributes.position,s=n.attributes.normal,o=n.attributes.color,c=o.array,l=ev(e),a=new ce(l.grass),h=new ce(l.dirt),u=new ce(l.rock),f=t?.72:1,_=new ce,d=new ce;for(let g=0;g<i.count;g++){const p=i.getX(g),m=i.getZ(g),x=i.getY(g),v=Fo(p*.009+31,m*.009+17,4)*.68+Fo(p*.045,m*.045,3)*.32,y=Er(.54,.78,v)*.75,b=1-s.getY(g),S=Er(.22,.55,b);_.copy(a).lerp(h,y).lerp(u,S);const w=.86+Fo(p*.02+5,m*.02+9,3)*.26+Er(6,34,x)*.1;if(_.multiplyScalar(w),_.multiplyScalar(.94+Er(-6,10,x)*.08),f<1){d.copy(_);const M=d.r*.299+d.g*.587+d.b*.114;_.setRGB(M+(_.r-M)*f,M+(_.g-M)*f,M+(_.b-M)*f)}c[g*3]=_.r,c[g*3+1]=_.g,c[g*3+2]=_.b}o.needsUpdate=!0}buildMountains(){Qt(this.scene,this.mountains);const e=new dt,t=$t(7),n=Math.max(pi.width,pi.depth)*.5,i=this.quality==="low"?18:this.quality==="med"?24:30,s=this.quality!=="low";for(let o=0;o<i;o++){const c=o/i*Math.PI*2+(t()-.5)*.18,l=n+t()*40,a=Math.cos(c)*l,h=Math.sin(c)*l+Yi,u=42+t()*78,f=32+t()*46,_=3095634+Math.floor(t()*10)*65793,d=new oe({color:_,roughness:1,metalness:0,flatShading:!0,fog:!0}),g=new z(new qt(f,u,5+Math.floor(t()*3),1),d);if(g.position.set(a,u/2-8,h),g.rotation.y=t()*Math.PI,g.scale.set(1,.8+t()*.5,1),e.add(g),s&&u>70){const p=u*(.18+t()*.12),m=new z(new qt(f*.42,p,5,1),new oe({color:14215416,roughness:.95,metalness:0,flatShading:!0,fog:!0}));m.position.set(a,u-p*.35-8,h),m.rotation.y=g.rotation.y,e.add(m)}}this.mountains=e,this.scene.add(e)}buildGrass(){const e=Lx(),t=new oe({vertexColors:!0,roughness:.92,metalness:0,side:St});t.onBeforeCompile=s=>{s.uniforms.uTime={value:0},s.uniforms.uPlayer={value:new P(0,0,0)},this.grassUniforms=s.uniforms,s.vertexShader=`uniform float uTime;
uniform vec3 uPlayer;
`+s.vertexShader,s.vertexShader=s.vertexShader.replace("#include <begin_vertex>",`#include <begin_vertex>
         float gH = position.y / ${yf.toFixed(3)};
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
         transformed.y -= gTramp * gH * 0.4;`)},this.grassRadius=this.qcfg.grassRadius,this.grassCellSize=this.qcfg.grassCell;const n=Math.ceil(Math.PI*this.grassRadius*this.grassRadius/(this.grassCellSize*this.grassCellSize))+96,i=new tn(e,t,n);i.frustumCulled=!1,i.castShadow=!1,i.receiveShadow=!0,this.grassFreeSlots=[];for(let s=0;s<n;s++)this.grassFreeSlots.push(s),this.hideGrassSlotInit(i,s);i.instanceMatrix.needsUpdate=!0,this.grassMesh=i,i.visible=this.currentBiome.decorStyle!=="space",this.scene.add(i),this.updateGrassPlacement(!0)}hideGrassSlotInit(e,t){this.grassDummy.position.set(0,-9999,0),this.grassDummy.rotation.set(0,0,0),this.grassDummy.scale.setScalar(0),this.grassDummy.updateMatrix(),e.setMatrixAt(t,this.grassDummy.matrix)}buildClouds(){Qt(this.scene,this.clouds);const e=this.makeCloudTexture(),t=new dt;t.position.z=Yi;const n=$t(5150);for(let i=0;i<18;i++){const s=new bi({map:e,transparent:!0,opacity:.42+n()*.28,depthWrite:!1,fog:!1}),o=new Ni(s),c=n()*Math.PI*2,l=130+n()*260;o.position.set(Math.cos(c)*l,86+n()*70,Math.sin(c)*l);const a=70+n()*140;o.scale.set(a,a*(.42+n()*.2),1),t.add(o)}this.clouds=t,this.scene.add(t)}makeCloudTexture(){const t=document.createElement("canvas");t.width=t.height=256;const n=t.getContext("2d");n.clearRect(0,0,256,256);for(let s=0;s<26;s++){const o=256*(.25+Math.random()*.5),c=256*(.35+Math.random()*.3),l=256*(.08+Math.random()*.18),a=n.createRadialGradient(o,c,0,o,c,l);a.addColorStop(0,"rgba(255,255,255,0.5)"),a.addColorStop(1,"rgba(255,255,255,0)"),n.fillStyle=a,n.beginPath(),n.arc(o,c,l,0,Math.PI*2),n.fill()}const i=new In(t);return i.colorSpace=Mt,i}rebuildPath(){if(Qt(this.scene,this.pathGroup),this.pathGroup=new dt,this.nodes.length<2){this.scene.add(this.pathGroup);return}const e=!!this.activeUnitId,t=e?this.nodes.slice(1).map(f=>[this.nodes[0],f]):this.nodes.slice(0,-1).map((f,_)=>[f,this.nodes[_+1]]),n=this.nodes.map(f=>new P(f.x,Ft(f.x,f.z,It)+.45,f.z)),i=new Wn(n,!1,"catmullrom",.35),s=Math.max(n.length*28,80),o=[];for(const[f,_]of t){const d=f.cleared&&_.cleared,g=Ft(f.x,f.z,It)+.45,p=Ft(_.x,_.z,It)+.45,m=new Wn([new P(f.x,g,f.z),new P(_.x,p,_.z)],!1,"catmullrom",.4);if(o.push(m),!e){const x=new z(new Pn(m,16,.48,12,!1),new oe({color:d?4885618:4016732,roughness:.68,metalness:.1}));x.receiveShadow=!0;const v=new z(new Pn(m,16,.26,10,!1),Ex(d));v.position.y=.08,this.pathGroup.add(x,v)}}const c=Ca(e?2834775:7041664),l=Ca(e?3493734:9147295),a=Ca(e?2504779:5595246),h=[c,l,a],u=new de(1.05,.13,.72);if(e)t.forEach(([f,_],d)=>{const g=o[d],p=Math.max(16,Math.ceil(Math.hypot(f.x-_.x,f.z-_.z)/1.6));for(let m=0;m<=p;m++){const x=m/p,v=Math.min(1,(m+.5)/p),y=g.getPoint(x);y.y=Ft(y.x,y.z,It)+.01;const b=g.getPoint(v),S=new z(u,h[m%h.length]);S.position.copy(y),S.lookAt(b.x,y.y,b.z),S.receiveShadow=!0,this.pathGroup.add(S)}});else for(let f=0;f<=s;f++){const _=f/s,d=Math.min(1,(f+.5)/s),g=i.getPoint(_);g.y=Ft(g.x,g.z,It)+.01;const p=i.getPoint(d),m=new z(u,h[f%h.length]);m.position.copy(g),m.lookAt(p.x,g.y,p.z),m.receiveShadow=!0,this.pathGroup.add(m)}if(!e){const f=Ax("rgba(255,220,140,1)"),_=new Me(.055,.07,2.6,7),d=new Me(.03,.03,.8,5),g=new he(.14,8,6),p=Cx(),m=Rx(16769152);for(let x=0;x<this.nodes.length;x+=Math.max(1,Math.floor(this.nodes.length/8))){const v=this.nodes[x],y=Math.min(1,(x+.5)/Math.max(1,this.nodes.length-1)),b=i.getTangent(y),S=new P(-b.z,0,b.x).normalize();for(const w of[-1,1]){const M=v.x+S.x*2.2*w,T=v.z+S.z*2.2*w,A=Ft(M,T,It),L=new z(_,p);L.position.set(M,A+1.3,T),L.castShadow=!0;const I=new z(d,p);I.rotation.z=Math.PI/2,I.position.set(M+.4*w*-1,A+2.55,T);const N=new z(g,m);N.position.set(M+.8*w*-1,A+2.55,T);const B=new Ni(new bi({map:f,transparent:!0,opacity:.7,depthWrite:!1,blending:cr}));B.scale.setScalar(1.8),B.position.set(M+.8*w*-1,A+2.6,T),this.pathGroup.add(L,I,N,B)}}}this.scene.add(this.pathGroup)}rebuildDecor(){this.disposeReflectors(),Qt(this.scene,this.decorGroup),Qt(this.scene,this.waterGroup),this.decorGroup=new dt,this.waterGroup=new dt,this.waterMeshes=[];const e=$t(2024),t=new Set,n=this.activeUnitId?this.nodes.find(m=>m.unlocked)??this.nodes[0]:void 0,i=!!(n&&this.activeUnitId),s=(n==null?void 0:n.x)??0,o=(n==null?void 0:n.z)??Yi,c=(m,x)=>!i&&this.nodes.some(v=>Math.hypot(m-(v.x+4),x-(v.z-8))<26);this.rebuildUnitLandscape();const l=i?this.quality==="low"?8:this.quality==="med"?12:18:this.quality==="low"?16:this.quality==="med"?24:34,a=i?this.quality==="low"?42:this.quality==="med"?64:92:this.quality==="low"?80:this.quality==="med"?120:180;for(const m of this.nodes){const x=$t(m.id.length*997+m.z);for(let v=0;v<l;v++){const y=x()*Math.PI*2,b=i?32+x()*22:6+x()*24,S=m.x+Math.cos(y)*b,w=m.z+Math.sin(y)*b;if(i&&Math.hypot(S-s,w-o)<25||c(S,w))continue;const M=`${Math.round(S)}_${Math.round(w)}`;if(t.has(M))continue;t.add(M);const T=Ft(S,w,It),A=i?.65+x()*.75:.75+x()*1.1;this.addDecorAt(i?this.currentBiome.decorStyle:m.theme,S,T,w,A,x)}}const h=$t(909),u=i?145:pi.width*.46,f=i?190:pi.depth*.46,_=this.currentBiome.decorStyle;for(let m=0;m<a;m++){const x=s+(h()-.5)*2*u,v=o+(h()-.5)*2*f;if(i&&Math.hypot(x-s,v-o)<25||c(x,v)||!i&&Math.abs(x)<14)continue;const y=Ft(x,v,It),b=.8+h()*1.5,S=h();if(_==="space"){const w=ao(b*.72);w.position.set(x,y+.16,v),w.rotation.set(h()*.18,h()*Math.PI*2,h()*.18),this.decorGroup.add(w);continue}if(S<.24){const w=h()>.5?hu(b):lu(b);w.position.set(x,y,v),w.rotation.y=h()*Math.PI*2,this.decorGroup.add(w)}else if(S<.46){const w=Ix(b);w.position.set(x,y,v),w.rotation.y=h()*Math.PI*2,this.decorGroup.add(w)}else if(S<.62){const w=ao(b*.8);w.position.set(x,y+.2,v),w.rotation.set(h(),h(),h()),this.decorGroup.add(w)}else if(S<.8){const w=Dx(.85+h()*.7);w.position.set(x,y,v),this.decorGroup.add(w)}else if(S<.91){const w=Nx(b);w.position.set(x,y,v),w.rotation.y=h()*Math.PI*2,this.decorGroup.add(w)}else{const w=Ux(b*.9);w.position.set(x,y+.12,v),this.decorGroup.add(w)}}const d=i&&this.currentBiome.decorStyle==="space"?0:i?2:6,g=this.qcfg.reflectors;for(let m=0;m<d;m++){const x=m%2===0?-1:1,v=s+x*(i?52+e()*18:60+e()*55),y=o-f*.8+m*(f*1.5/d)+e()*18,b=i?34+e()*14:48+e()*26,S=i?24+e()*12:30+e()*18,w=Ft(v,y,It)-.6;if(m<g){const T=new Lo(new rn(b,S),{textureWidth:this.qcfg.reflectRes,textureHeight:this.qcfg.reflectRes,color:1918038});T.rotation.x=-Math.PI/2,T.position.set(v,w,y),this.reflectors.push(T),this.waterGroup.add(T);const A=new z(new rn(b,S,18,12),cu());A.material.opacity=.26,A.rotation.x=-Math.PI/2,A.position.set(v,w+.05,y),A.userData.isWater=!0,A.userData.baseOpacity=.26,this.waterMeshes.push(A),this.waterGroup.add(A)}else{const T=new z(new rn(b,S,16,10),cu());T.material.opacity=.82,T.rotation.x=-Math.PI/2,T.position.set(v,w+.02,y),T.userData.isWater=!0,T.userData.baseOpacity=.82,this.waterMeshes.push(T),this.waterGroup.add(T)}}const p=new z(new rn(i?u*2.2:pi.width+40,i?f*2.2:pi.depth+40),new Ct({color:10406143,transparent:!0,opacity:.038,depthWrite:!1}));p.rotation.x=-Math.PI/2,p.position.set(s,5,o),this.decorGroup.add(p),this.scene.add(this.decorGroup,this.waterGroup),this.updateDynamicLightBudget(!0)}rebuildUnitLandscape(){Qt(this.scene,this.unitLandscape),this.unitLandscape=void 0;const e=this.activeUnitId?this.nodes.find(t=>t.unlocked)??this.nodes[0]:void 0;!e||!this.activeUnitId||(this.unitLandscape=sv(this.currentBiome,e,this.activeWorldId,this.activeWorldTitle),this.unitLandscape.position.set(e.x,Ft(e.x,e.z,It),e.z),this.scene.add(this.unitLandscape))}addDecorAt(e,t,n,i,s,o){if(e==="forest"||e==="plains"||e==="library"){const c=o()>.4?hu(s):lu(s*1.05);c.position.set(t,n,i),c.rotation.y=o()*Math.PI*2,this.decorGroup.add(c);return}if(e==="coast"&&o()>.45){const c=ao(s*.85);c.position.set(t,n+.3,i),c.rotation.set(o(),o(),o()),this.decorGroup.add(c);return}if(o()>.5){const c=ao(s*.65);c.position.set(t,n+.2,i),this.decorGroup.add(c)}if(o()>.65){const c=Mf(br(e).accent);c.position.set(t,n,i),this.decorGroup.add(c)}}async rebuildNodesAsync(){const e=++this.rebuildToken;for(const t of this.nodeGroups.values())this.scene.remove(t),Fs(t);this.nodeGroups.clear(),this.pickables=[];for(const t of this.nodes){if(e!==this.rebuildToken)return;const n=new dt,i=Ft(t.x,t.z,It);n.position.set(t.x,i,t.z),n.userData.nodeId=t.id;const{root:s,crystal:o}=await qx(t,t.id===this.currentId);if(e!==this.rebuildToken){Fs(s);return}n.add(s),o.userData.nodeId=t.id,this.pickables.push(o);const c=Zx(t.name,t.unlocked);n.add(c),t.unlocked||Ff(n),this.nodeGroups.set(t.id,n),this.scene.add(n),this.updateDynamicLightBudget(!0)}}bindEvents(){this.renderer.domElement.addEventListener("pointerdown",this.onPointerDown),window.addEventListener("keydown",this.onKeyDown),window.addEventListener("resize",this.onResize),typeof ResizeObserver<"u"&&(this.resizeObserver=new ResizeObserver(this.onResize),this.resizeObserver.observe(this.container)),document.addEventListener("visibilitychange",this.onVisibilityChange)}updateProximity(){var n,i;let e=null,t=Of;for(const s of this.nodes){if(!s.unlocked)continue;const o=this.player.position.x-s.x,c=this.player.position.z-s.z,l=Math.hypot(o,c);l<t&&(t=l,e=s)}(e==null?void 0:e.id)!==((n=this.nearNode)==null?void 0:n.id)&&(this.nearNode=e,(i=this.onProximity)==null||i.call(this,e))}updatePickupProximity(){var n,i;let e=null,t=Sv;for(const s of this.pickupData){if(s.collected)continue;const o=this.player.position.x-s.x,c=this.player.position.z-s.z,l=Math.hypot(o,c);l<t&&(t=l,e=s)}(e==null?void 0:e.id)!==((n=this.nearPickup)==null?void 0:n.id)&&(this.nearPickup=e,(i=this.onPickupNear)==null||i.call(this,e))}tickScene(e,t){var l,a,h,u;if(this.updateDynamicLightBudget(),this.waterFrame++,this.sun){const f=e*.03,_=Math.sin(f)*72,d=36+Math.cos(f)*46;this.sun.position.set(_,Math.max(5,d),35);const g=Oi.clamp((d+8)/90,.18,1),p=Zt(this.activeWorldId);if(this.sun.intensity=this.currentBiome.sunIntensity*(p?.9+g*.2:.55+g*.35),this.renderer.toneMappingExposure=p?1.06+g*.12:1+g*.11,this.hemi&&(this.hemi.intensity=p?.6+g*.2:.46+g*.26),this.sunDisc){this.sunDirV.set(_,Math.max(5,d),this.sun.position.z).normalize(),this.sunDisc.position.copy(this.camera.position).addScaledVector(this.sunDirV,480);const m=p?this.currentBiome.sunFocusedDiscOpacity??this.currentBiome.sunDiscOpacity??1:this.currentBiome.sunDiscOpacity??1;this.sunDisc.material.opacity=Oi.clamp(g*1.2*m,0,1)}}this.grassUniforms&&(this.grassUniforms.uTime.value=e,this.grassUniforms.uPlayer.value.copy(this.player.position)),this.updateGrassPlacement(),this.clouds&&(this.clouds.rotation.y=e*.006),(l=this.unitLandscape)==null||l.traverse(f=>{var d,g;const _=f;if((d=_.userData)!=null&&d.isLandscapeRing&&(_.rotation.y+=t*.42),(g=_.userData)!=null&&g.isLandscapeBeacon){_.userData.landscapeBaseY===void 0&&(_.userData.landscapeBaseY=_.position.y);const p=_.userData.landscapeBaseY;_.position.y=p+Math.sin(e*1.5+_.position.x*.08)*.24}});for(const[f,_]of this.pickupMeshes){const d=((a=this.nearPickup)==null?void 0:a.id)===f,g=_.userData.baseY??_.position.y;if(_.userData.dying){_.userData.dieTimer=(_.userData.dieTimer??0)+t*1.4;const p=_.userData.dieTimer;_.scale.setScalar(1-p*.9),_.position.y=g+p*3,_.traverse(m=>{const x=m;x.material&&"opacity"in x.material&&(x.material.opacity*=.85)}),p>=1&&((h=this.pickupGroup)==null||h.remove(_),this.disposePickupResources(_),this.pickupMeshes.delete(f));continue}_.position.y=g+Math.sin(e*1.4+f.length*.5)*.28,_.traverse(p=>{var x,v,y,b,S;const m=p;if((x=m.userData)!=null&&x.isOrbCore){m.rotation.y=e*.8+f.length;const w=d?1+Math.sin(e*4)*.15:1+Math.sin(e*2)*.06;m.scale.setScalar(w);const M=m.material;M.emissiveIntensity=d?3.5+Math.sin(e*5)*.8:1.8+Math.sin(e*2)*.3}if((v=m.userData)!=null&&v.isOrbGlow&&(m.material.opacity=d?.42+Math.sin(e*3)*.15:.18+Math.sin(e*1.5)*.06),(y=m.userData)!=null&&y.isOrbRing&&(m.rotation.z=e*1.2+f.length*.3,m.rotation.x=Math.PI/3+Math.sin(e*.5)*.2,m.material.opacity=d?.8:.45),(b=m.userData)!=null&&b.isOrbLight){const w=m;w.intensity=d?1.4+Math.sin(e*4)*.4:.6+Math.sin(e*2)*.1}if((S=m.userData)!=null&&S.isWordSprite){const w=m;w.material.opacity=d?1:.72+Math.sin(e*1.2)*.12}})}for(const[f,_]of this.nodeGroups){const d=((u=this.nearNode)==null?void 0:u.id)===f;_.traverse(g=>{var m,x,v,y;const p=g;if((m=p.userData)!=null&&m.isSignpost&&(p.visible=!d),(x=p.userData)!=null&&x.isCrystal&&(p.userData.baseY===void 0&&(p.userData.baseY=p.position.y),p.rotation.y=e*.6+f.length*.3,p.position.y=p.userData.baseY+Math.sin(e*1.8+f.length)*(d?.28:.15)),(v=p.userData)!=null&&v.isPulse){const b=1+Math.sin(e*3)*.08;p.scale.set(b,b,b),p.material.opacity=.35+Math.sin(e*3)*.2}(y=p.userData)!=null&&y.isDueRing&&(p.material.opacity=.28+Math.sin(e*2.4+f.length)*.18)})}const n=this.player.position.x,i=this.player.position.z,s=90,o=s*s;for(const f of this.waterMeshes){f.userData.baseY===void 0&&(f.userData.baseY=f.position.y);const _=f.userData.baseOpacity??.68,d=f.position.x-n,g=f.position.z-i,m=d*d+g*g<o;if(f.position.y=f.userData.baseY+Math.sin(e*.9+f.position.x*.03)*.04,f.material.opacity=_+Math.sin(e*.7)*Math.min(.08,_*.12),!m||this.waterFrame%2!==0)continue;const x=f.geometry,v=x.attributes.position;f.userData.flat||(f.userData.flat=Float32Array.from(v.array));const y=f.userData.flat;for(let b=0;b<v.count;b++){const S=y[b*3],w=y[b*3+1];v.setZ(b,Math.sin(S*.22+e*1.7)*.12+Math.cos(w*.27+e*1.25)*.1)}v.needsUpdate=!0,x.computeVertexNormals()}const c=this.qcfg.reflectDist*this.qcfg.reflectDist;for(const f of this.reflectors){const _=f.position.x-n,d=f.position.z-i;f.visible=_*_+d*d<c}}}export{Cv as World3D};
