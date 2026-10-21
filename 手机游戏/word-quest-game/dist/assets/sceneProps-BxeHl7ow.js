var pi=Object.defineProperty;var vi=(o,t,e)=>t in o?pi(o,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):o[t]=e;var F=(o,t,e)=>vi(o,typeof t!="symbol"?t+"":t,e);import{w as W,a9 as gi,Z as Te,aT as da,aU as Le,aV as ma,aW as It,X as Fe,aX as Rs,N as ko,M as Y,V as C,q as $,aF as Ie,ab as ke,c as et,K as To,U as Ao,W as me,Y as Jo,aY as Rt,ae as He,g as Us,aH as on,ax as wt,at as xi,aE as Nt,l as Mo,as as wi,a5 as ut,d as at,J as Mi,a as ct,S as ts,C as pa,D as mt,aB as yi,aC as bi,aZ as Si,B as Gt,F as vt,h as Ct,a1 as es,k as xt,P as At,G as gt,Q as Ue,E as os,v as Xt,R as va,n as to,p as ga,a_ as ki,a$ as xa,a4 as Ti,I as wa,b0 as Ai,b1 as yt,b2 as _i,a2 as Pi,e as yo,b3 as Os,b4 as Di,b5 as Ut,b6 as Ma,b7 as je,b8 as sn,b9 as nn,ay as fs,ba as Ri,bb as Ci,bc as Ei,bd as zi,be as Ni,bf as Fi,bg as Ii,ah as Li,bh as Ui,bi as Oi,bj as Po,bk as an,bl as rn,bm as Gi,bn as Wi,bo as Bi,bp as Vi,ac as Hi,_ as Oe,aA as Do,az as ya,$ as ss,a0 as ns,a6 as Cs,i as Dt,f as ln,bq as ji,br as $i,bs as Xi,bt as Yi,bu as Ki,bv as Zi,a8 as qi}from"./index-fQuUKM_G.js";import{d as Es,a as Yt,m as Ye,P as Qi,e as ba}from"./humanVisual-AySou_pd.js";const Ji={wet:{value:0},rain:{value:0},time:{value:0}};function Ro(o,t,e){let s=Math.imul(o|0,374761393)^Math.imul(t|0,668265263)^Math.imul((e|0)+1,1442695041);return s=Math.imul(s^s>>>13,1274126177),s^=s>>>16,(s>>>0)/4294967295}const cn=o=>o*o*o*(o*(o*6-15)+10);function zs(o,t,e,s){const n=o*e,a=t*e,i=Math.floor(n),r=Math.floor(a),l=cn(n-i),c=cn(a-r),h=(i%e+e)%e,f=(r%e+e)%e,p=(h+1)%e,m=(f+1)%e,u=Ro(h,f,s),v=Ro(p,f,s),w=Ro(h,m,s),M=Ro(p,m,s);return u+(v-u)*l+(w-u)*c+(u-v-w+M)*l*c}function t0(o,t,e){let s=0,n=1,a=4;for(let i=0;i<5;i++){const r=zs(o,t,a,e*17+i*101),l=1-Math.abs(2*r-1);s+=(r*.45+l*.55)*n,n*=.55,a*=2}return s}function e0(o,t){const e=new Float32Array(o*o);let s=1/0,n=-1/0;for(let c=0;c<o;c++)for(let h=0;h<o;h++){const f=t0(h/o,c/o,t);e[c*o+h]=f,f<s&&(s=f),f>n&&(n=f)}const a=new Uint8Array(o*o*4),i=o/256*1.6,r=n-s||1,l=c=>(c+o)%o;for(let c=0;c<o;c++)for(let h=0;h<o;h++){const f=(e[c*o+l(h+1)]-e[c*o+l(h-1)])*.5*i*2.2,p=(e[l(c+1)*o+h]-e[l(c-1)*o+h])*.5*i*2.2,m=Math.hypot(f,p,1),u=(c*o+h)*4;a[u]=Math.round((-f/m*.5+.5)*255),a[u+1]=Math.round((-p/m*.5+.5)*255),a[u+2]=Math.round((1/m*.5+.5)*255),a[u+3]=Math.round((e[c*o+h]-s)/r*255)}return{size:o,data:a}}function o0(o,t){const e=new Uint8Array(o*o*4);for(let s=0;s<o;s++)for(let n=0;n<o;n++){const a=n/o,i=s/o;let r=0,l=.5,c=6;for(let u=0;u<4;u++){const v=zs(a,i,c,t*31+u*53);r+=(1-Math.abs(2*v-1))*l,l*=.5,c*=2}const h=zs(a,i,5,t*7+3),f=Math.min(1,Math.max(0,Math.pow(r/.9375,1.6)*(.55+h*.7))),p=(s*o+n)*4,m=Math.round(f*255);e[p]=m,e[p+1]=m,e[p+2]=m,e[p+3]=255}return{size:o,data:e}}const ho={rate:[.55,.35,.3],alphaMin:.12,alphaMax:.97,alphaRate:.9},ds={time:{value:0},sunDir:{value:new C(.3,.6,-.5).normalize()},sunColor:{value:new W(1,.95,.85)}};let s0=0;const Ns=new Map;function n0(){return{reflection:{value:null},refraction:{value:null},reflectionMatrix:{value:new et},refractionMatrix:{value:new et},ready:{value:0},planeY:{value:0}}}function hn(o){return Ns.get(o.userData.waterViewId)}const Sa=6268306,ka=801342,un=new Map,fn=new Map;function Ta(o,t,e){const s=new Le(o,t,t,To,Ao);return s.wrapS=me,s.wrapT=me,s.magFilter=Fe,s.minFilter=Jo,s.generateMipmaps=!0,s.anisotropy=e,s.colorSpace=ko,s.needsUpdate=!0,s}function a0(o){let t=un.get(o);return t||(t=Ta(e0(o,11).data,o,4),un.set(o,t)),t}function i0(o){let t=fn.get(o);return t||(t=Ta(o0(o,23).data,o,2),fn.set(o,t)),t}const r0=`
  uniform float uWTime;
  uniform vec3 uWSunDir;
  uniform vec3 uWSunColor;
  uniform sampler2D uWNormal;
  uniform vec3 uWShallow;
  uniform vec3 uWDeep;
  uniform vec4 uWRamp; // 无水深纹理时：网格局部 z0, z1, 近处水深, 远处水深
  #ifdef W_DEPTH_TEX
    uniform sampler2D uWDepthTex;
    uniform vec4 uWBox; // minX, minZ, 1/sizeX, 1/sizeZ
  #endif
  #ifdef W_FOAM_TEX
    uniform sampler2D uWFoam;
  #endif
  uniform sampler2D uWReflection,uWRefraction;
  uniform mat4 uWReflectionMatrix,uWRefractionMatrix;
  uniform float uWViewReady,uWPlaneY;
  varying vec3 vWPos;
  varying float vWLocalZ;
`,l0=`
  vec3 wToCam = cameraPosition - vWPos;
  float wDist = length(wToCam);
  vec3 wV = wToCam / max(wDist, 1e-4);
  float wT = uWTime;
  vec2 wP = vWPos.xz;
  // 细节随距离淡出，避免远处闪烁
  float wFa = 1.0 - smoothstep(30.0, 170.0, wDist);
  float wFb = 1.0 - smoothstep(60.0, 250.0, wDist);
  vec4 wNa = texture2D(uWNormal, wP * 0.21 + vec2(0.030, 0.011) * wT);
  vec2 wSa = (wNa.xy - 0.5) * 2.0 / max(wNa.z * 2.0 - 1.0, 0.25);
  // 第二层：旋转 37°、不同尺度和方向，并被第一层轻微扭曲，打散平铺感
  vec2 wPB = vec2(0.8 * wP.x + 0.6 * wP.y, -0.6 * wP.x + 0.8 * wP.y);
  vec4 wNb = texture2D(uWNormal, wPB * 0.083 + vec2(-0.012, 0.019) * wT + wSa * 0.012);
  vec2 wSb = (wNb.xy - 0.5) * 2.0 / max(wNb.z * 2.0 - 1.0, 0.25);
  vec2 wSlope = wSa * 0.5 * wFa + wSb * 0.7 * wFb;
  #ifdef W_FAR
    // 远处低频大波：同一张图的另一个（很低的）频率，同时调制细节振幅，进一步隐藏平铺
    vec4 wNf = texture2D(uWNormal, wP * 0.0113 + vec2(0.004, -0.003) * wT);
    vec2 wSf = (wNf.xy - 0.5) * 2.0 / max(wNf.z * 2.0 - 1.0, 0.25);
    wSlope = wSlope * (0.7 + 0.6 * wNf.a) + wSf * 0.55;
  #endif
  wSlope *= 0.55;
  vec3 wN = normalize(vec3(-wSlope.x, 1.0, -wSlope.y));
  normal = normalize((viewMatrix * vec4(wN, 0.0)).xyz);

  // 水深
  #ifdef W_DEPTH_TEX
    float wDepth = max(-texture2D(uWDepthTex, (vWPos.xz - uWBox.xy) * uWBox.zw).r, 0.0);
  #else
    float wDepth = mix(uWRamp.z, uWRamp.w, smoothstep(uWRamp.x, uWRamp.y, vWLocalZ));
  #endif

  // 吸收（Beer-Lambert）：视线越斜，水中路径越长
  float wNdV = clamp(dot(normal, normalize(vViewPosition)), 0.0, 1.0);
  float wPath = wDepth / max(wNdV, 0.3);
  vec3 wCol = mix(uWShallow, uWDeep, 1.0 - exp(-wPath * vec3(${ho.rate.map(o=>o.toFixed(2)).join(", ")})));
  float wAlpha = ${ho.alphaMin.toFixed(2)} + (${ho.alphaMax.toFixed(2)} - ${ho.alphaMin.toFixed(2)}) * (1.0 - exp(-wPath * ${ho.alphaRate.toFixed(2)}));
  // Schlick 菲涅尔（F0 = 0.02）：俯视透明、平视几乎全反射
  float wFres = 0.02 + 0.98 * pow(1.0 - wNdV, 5.0);
  wAlpha = mix(wAlpha, 1.0, clamp(wFres * 1.6, 0.0, 1.0));

  // 岸边泡沫：浅水处，噪声阈值 + 随时间涌动
  float wFoam = 0.0;
  #ifdef W_DEPTH_TEX
    #ifdef W_FOAM_TEX
      float wFl = texture2D(uWFoam, wP * 0.27 + vec2(0.017, -0.012) * wT + wSa * 0.03).r;
    #else
      float wFl = wNa.a;
    #endif
    float wSwash = 0.5 + 0.5 * sin(wT * 0.8 + wFl * 6.2832 + wP.x * 0.15);
    float wThr = 0.22 + 0.16 * wSwash;
    float wBand = 1.0 - smoothstep(wThr * 0.15, wThr, wDepth);
    wFoam = wBand * smoothstep(0.30, 0.62, wFl + wBand * 0.4);
    wFoam = max(wFoam, (1.0 - smoothstep(0.0, 0.06, wDepth)) * 0.65 * (0.5 + wFl));
    wFoam *= wFa * 0.5 + 0.5;
  #endif
  wCol = mix(wCol, vec3(0.86, 0.92, 0.90), wFoam);
  diffuseColor.rgb = wCol;
  diffuseColor.a = mix(wAlpha, 0.95, wFoam);
  roughnessFactor = mix(0.14, 0.8, wFoam) + smoothstep(80.0, 300.0, wDist) * 0.2;

  // Planar captures contain this scene's shoreline/buildings, not a generic sky.
  if(uWViewReady>.5 && abs(vWPos.y-uWPlaneY)<.12){
    vec4 rp=uWReflectionMatrix*vec4(vWPos,1.0),tp=uWRefractionMatrix*vec4(vWPos,1.0);
    vec2 ruv=rp.xy/rp.w+wSlope*.015,tuv=tp.xy/tp.w+wSlope*.009;
    float edge=smoothstep(0.0,.008,min(min(ruv.x,ruv.y),min(1.0-ruv.x,1.0-ruv.y)));
    vec3 reflected=texture2D(uWReflection,clamp(ruv,.001,.999)).rgb;
    vec3 refracted=texture2D(uWRefraction,clamp(tuv,.001,.999)).rgb;
    vec3 transmitted=refracted*exp(-wPath*vec3(.22,.09,.06));
    vec3 captured=mix(mix(wCol,transmitted,.55),reflected,clamp(wFres*2.5,.12,.92));
    totalEmissiveRadiance+=captured*edge*(1.0-wFoam)*.7;
    diffuseColor.rgb*=1.0-edge*(1.0-wFoam)*.55;
    diffuseColor.a=mix(diffuseColor.a,1.0,edge);
  }

  // 太阳亮点：Blinn，法线碎裂 → 一片闪烁的碎光
  vec3 wR = reflect(-wV, wN);
  float wGlint = pow(max(dot(wR, uWSunDir), 0.0), 520.0);
  totalEmissiveRadiance += uWSunColor * wGlint * 0.9 * (1.0 - wFoam);
`,c0=`
  #if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
    #if defined( W_LOWENV ) && defined( ENVMAP_TYPE_CUBE_UV )
      {
        // low：只取一个 mip 的一次采样
        vec3 wRv = inverseTransformDirection( reflect( - geometryViewDir, geometryNormal ), viewMatrix );
        float wMip = floor( clamp( roughnessToMip( max( material.roughness, 0.0525 ) ), cubeUV_m0, CUBEUV_MAX_MIP ) );
        radiance += bilinearCubeUV( envMap, envMapRotation * wRv, wMip ) * envMapIntensity * ( 1.0 - wFoam * 0.85 );
      }
    #else
      radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness ) * ( 1.0 - wFoam * 0.85 );
    #endif
  #endif
`;function Aa(o){const t=new Ie({color:16777215,roughness:.14,metalness:0,ior:1.333,transparent:!0,depthWrite:!0,envMapIntensity:1});t.fog=o.fog;const e=n0(),s=++s0;Ns.set(s,e),t.userData.waterViewId=s,t.addEventListener("dispose",()=>Ns.delete(s));const n=a0(o.quality==="low"?128:256),a=o.quality==="low"||!o.depthTex?void 0:i0(256),i=new W(o.shallow),r=new W(o.deep),l=o.ramp??new ke(0,1,.8,.8),c=[o.depthTex?"#define W_DEPTH_TEX":"",a?"#define W_FOAM_TEX":"",o.quality!=="low"?"#define W_FAR":"",o.quality==="low"?"#define W_LOWENV":""].join(`
`);t.onBeforeCompile=f=>{f.uniforms.uWReflection=e.reflection,f.uniforms.uWRefraction=e.refraction,f.uniforms.uWReflectionMatrix=e.reflectionMatrix,f.uniforms.uWRefractionMatrix=e.refractionMatrix,f.uniforms.uWViewReady=e.ready,f.uniforms.uWPlaneY=e.planeY,f.uniforms.uWTime=ds.time,f.uniforms.uWSunDir=ds.sunDir,f.uniforms.uWSunColor=ds.sunColor,f.uniforms.uWNormal={value:n},f.uniforms.uWShallow={value:i},f.uniforms.uWDeep={value:r},f.uniforms.uWRamp={value:l},o.depthTex&&(f.uniforms.uWDepthTex={value:o.depthTex},f.uniforms.uWBox={value:o.box??new ke(0,0,1,1)}),a&&(f.uniforms.uWFoam={value:a}),f.vertexShader=`varying vec3 vWPos;
varying float vWLocalZ;
`+f.vertexShader.replace("#include <begin_vertex>",`#include <begin_vertex>
       vWPos = (modelMatrix * vec4(transformed, 1.0)).xyz;
       vWLocalZ = transformed.z;`),f.fragmentShader=c+`
`+r0+f.fragmentShader.replace("#include <normal_fragment_maps>",l0).replace("#include <lights_fragment_maps>",c0).replace("#include <fog_fragment>",`#ifdef USE_FOG
           // 与地形同一套雾公式：远处水面融入雾色
           float tf = 1.0 - exp(-fogDensity * fogDensity * vFogDepth * vFogDepth);
           tf = max(tf, smoothstep(150.0, 340.0, vFogDepth) * 0.92);
           gl_FragColor.rgb = mix(gl_FragColor.rgb, fogColor, tf);
         #endif`)};const h=`water-v1-${o.quality}-${o.depthTex?"d":"f"}-${a?"f":"n"}`;return t.customProgramCacheKey=()=>h,t}function Ac(o){const{outline:t,x:e,y:s,z:n,groundY:a,quality:i}=o,r=new gi(new Te(t),1);r.rotateX(-Math.PI/2);let l=1/0,c=-1/0,h=1/0,f=-1/0;for(const x of t)l=Math.min(l,e+x.x),c=Math.max(c,e+x.x),h=Math.min(h,n-x.y),f=Math.max(f,n-x.y);const p=1.5;l-=p,h-=p,c+=p,f+=p;const m=c-l,u=f-h,v=i==="low"?32:64,w=new Uint16Array(v*v);for(let x=0;x<v;x++){const y=h+(x+.5)/v*u;for(let S=0;S<v;S++){const k=l+(S+.5)/v*m,b=$.clamp(a(k,y)-s,-16,16);w[x*v+S]=da.toHalfFloat(b)}}const M=new Le(w,v,v,ma,It);M.magFilter=Fe,M.minFilter=Fe,M.wrapS=Rs,M.wrapT=Rs,M.generateMipmaps=!1,M.colorSpace=ko,M.needsUpdate=!0;const d=Aa({quality:i,shallow:o.shallowColor??Sa,deep:o.deepColor??ka,fog:!0,depthTex:M,box:new ke(l,h,1/m,1/u)}),g=new Y(r,d);return g.position.set(e,s,n),g.userData.isWater=!0,g.castShadow=!1,g.receiveShadow=!1,{mesh:g,dispose(){r.dispose(),d.dispose(),M.dispose()}}}function h0(o={}){const t=o.depth??.6,e=o.ramp;return Aa({quality:o.quality??"med",shallow:o.shallowColor??Sa,deep:o.deepColor??ka,fog:o.fog??!1,ramp:e?new ke(e.z0,e.z1,e.near,e.far):new ke(0,1,t,t)})}function u0(o,t,e=new He){e.copy(o),o.updateMatrixWorld(),e.position.y=2*t-o.position.y;const s=o.getWorldDirection(new C);return s.y=-s.y,e.up.copy(o.up),e.up.y=-e.up.y,e.lookAt(e.position.clone().add(s)),e.updateMatrixWorld(),e}const dn=new et().set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1);class _c{constructor(t){F(this,"reflection");F(this,"refraction");F(this,"reflected",new He);F(this,"frame",0);F(this,"previousView");this.tier=t;const e=t==="high"?512:256;this.reflection=new Rt(e,e,{type:It}),this.refraction=this.reflection.clone()}update(t,e,s){if(this.tier==="low"||this.frame++%4!==0)return;this.previousView&&(this.previousView.ready.value=0);const n=[];e.updateMatrixWorld();const a=new Us,i=new C;if(e.traverse(u=>{if(!(u instanceof Y)||!u.visible)return;const v=Array.isArray(u.material)?u.material:[u.material];for(const w of v){const M=hn(w);if(!M)continue;a.setFromObject(u),a.getCenter(i);const d=a.distanceToPoint(s.position);s.position.y>a.max.y+.1&&d<65&&n.push({mesh:u,view:M,y:a.max.y,distance:d})}}),!n.length)return;n.sort((u,v)=>u.distance-v.distance);const r=n[0];for(const u of n)u.view.ready.value=0;const l=[];e.traverse(u=>{u instanceof Y&&(Array.isArray(u.material)?u.material:[u.material]).some(v=>!!hn(v))&&(l.push([u,u.visible]),u.visible=!1)});const c=t.getRenderTarget(),h=t.clippingPlanes,f=t.shadowMap.autoUpdate,p=t.xr.enabled,m=t.autoClear;try{t.xr.enabled=!1,t.shadowMap.autoUpdate=!1,t.autoClear=!0,u0(s,r.y,this.reflected),t.clippingPlanes=[new on(new C(0,1,0),-r.y+.03)],t.setRenderTarget(this.reflection),t.clear(),t.render(e,this.reflected),t.clippingPlanes=[new on(new C(0,-1,0),r.y+.03)],t.setRenderTarget(this.refraction),t.clear(),t.render(e,s);const u=r.view;u.reflection.value=this.reflection.texture,u.refraction.value=this.refraction.texture,u.reflectionMatrix.value.copy(dn).multiply(this.reflected.projectionMatrix).multiply(this.reflected.matrixWorldInverse),u.refractionMatrix.value.copy(dn).multiply(s.projectionMatrix).multiply(s.matrixWorldInverse),u.planeY.value=r.y,u.ready.value=1,this.previousView=u}finally{for(const[u,v]of l)u.visible=v;t.clippingPlanes=h,t.shadowMap.autoUpdate=f,t.xr.enabled=p,t.autoClear=m,t.setRenderTarget(c)}}dispose(){this.reflection.dispose(),this.refraction.dispose()}}class as extends Y{constructor(){const t=as.SkyShader,e=new wt({name:t.name,uniforms:Nt.clone(t.uniforms),vertexShader:t.vertexShader,fragmentShader:t.fragmentShader,side:xi,depthWrite:!1});super(new Mo(1,1,1),e),this.isSky=!0}}as.SkyShader={name:"SkyShader",uniforms:{turbidity:{value:2},rayleigh:{value:1},mieCoefficient:{value:.005},mieDirectionalG:{value:.8},sunPosition:{value:new C},up:{value:new C(0,1,0)},cloudScale:{value:2e-4},cloudSpeed:{value:1e-4},cloudCoverage:{value:.4},cloudDensity:{value:.4},cloudElevation:{value:.5},showSunDisc:{value:1},time:{value:0}},vertexShader:`
		uniform vec3 sunPosition;
		uniform float rayleigh;
		uniform float turbidity;
		uniform float mieCoefficient;
		uniform vec3 up;

		varying vec3 vWorldPosition;
		varying vec3 vSunDirection;
		varying float vSunfade;
		varying vec3 vBetaR;
		varying vec3 vBetaM;
		varying float vSunE;

		// constants for atmospheric scattering
		const float e = 2.71828182845904523536028747135266249775724709369995957;
		const float pi = 3.141592653589793238462643383279502884197169;

		// wavelength of used primaries, according to preetham
		const vec3 lambda = vec3( 680E-9, 550E-9, 450E-9 );
		// this pre-calculation replaces older TotalRayleigh(vec3 lambda) function:
		// (8.0 * pow(pi, 3.0) * pow(pow(n, 2.0) - 1.0, 2.0) * (6.0 + 3.0 * pn)) / (3.0 * N * pow(lambda, vec3(4.0)) * (6.0 - 7.0 * pn))
		const vec3 totalRayleigh = vec3( 5.804542996261093E-6, 1.3562911419845635E-5, 3.0265902468824876E-5 );

		// mie stuff
		// K coefficient for the primaries
		const float v = 4.0;
		const vec3 K = vec3( 0.686, 0.678, 0.666 );
		// MieConst = pi * pow( ( 2.0 * pi ) / lambda, vec3( v - 2.0 ) ) * K
		const vec3 MieConst = vec3( 1.8399918514433978E14, 2.7798023919660528E14, 4.0790479543861094E14 );

		// earth shadow hack
		// cutoffAngle = pi / 1.95;
		const float cutoffAngle = 1.6110731556870734;
		const float steepness = 1.5;
		const float EE = 1000.0;

		float sunIntensity( float zenithAngleCos ) {
			zenithAngleCos = clamp( zenithAngleCos, -1.0, 1.0 );
			return EE * max( 0.0, 1.0 - pow( e, -( ( cutoffAngle - acos( zenithAngleCos ) ) / steepness ) ) );
		}

		vec3 totalMie( float T ) {
			float c = ( 0.2 * T ) * 10E-18;
			return 0.434 * c * MieConst;
		}

		void main() {

			vec4 worldPosition = modelMatrix * vec4( position, 1.0 );
			vWorldPosition = worldPosition.xyz;

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			gl_Position.z = gl_Position.w; // set z to camera.far

			vSunDirection = normalize( sunPosition );

			vSunE = sunIntensity( dot( vSunDirection, up ) );

			vSunfade = 1.0 - clamp( 1.0 - exp( ( sunPosition.y / 450000.0 ) ), 0.0, 1.0 );

			float rayleighCoefficient = rayleigh - ( 1.0 * ( 1.0 - vSunfade ) );

			// extinction (absorption + out scattering)
			// rayleigh coefficients
			vBetaR = totalRayleigh * rayleighCoefficient;

			// mie coefficients
			vBetaM = totalMie( turbidity ) * mieCoefficient;

		}`,fragmentShader:`
		varying vec3 vWorldPosition;
		varying vec3 vSunDirection;
		varying vec3 vBetaR;
		varying vec3 vBetaM;
		varying float vSunE;

		uniform float mieDirectionalG;
		uniform vec3 up;
		uniform float cloudScale;
		uniform float cloudSpeed;
		uniform float cloudCoverage;
		uniform float cloudDensity;
		uniform float cloudElevation;
		uniform float showSunDisc;
		uniform float time;

		// Cloud noise functions
		float hash( vec2 p ) {
			return fract( sin( dot( p, vec2( 127.1, 311.7 ) ) ) * 43758.5453123 );
		}

		float noise( vec2 p ) {
			vec2 i = floor( p );
			vec2 f = fract( p );
			f = f * f * ( 3.0 - 2.0 * f );
			float a = hash( i );
			float b = hash( i + vec2( 1.0, 0.0 ) );
			float c = hash( i + vec2( 0.0, 1.0 ) );
			float d = hash( i + vec2( 1.0, 1.0 ) );
			return mix( mix( a, b, f.x ), mix( c, d, f.x ), f.y );
		}

		float fbm( vec2 p ) {
			float value = 0.0;
			float amplitude = 0.5;
			for ( int i = 0; i < 5; i ++ ) {
				value += amplitude * noise( p );
				p *= 2.0;
				amplitude *= 0.5;
			}
			return value;
		}

		// constants for atmospheric scattering
		const float pi = 3.141592653589793238462643383279502884197169;

		const float n = 1.0003; // refractive index of air
		const float N = 2.545E25; // number of molecules per unit volume for air at 288.15K and 1013mb (sea level -45 celsius)

		// optical length at zenith for molecules
		const float rayleighZenithLength = 8.4E3;
		const float mieZenithLength = 1.25E3;
		// 66 arc seconds -> degrees, and the cosine of that
		const float sunAngularDiameterCos = 0.999956676946448443553574619906976478926848692873900859324;

		// 3.0 / ( 16.0 * pi )
		const float THREE_OVER_SIXTEENPI = 0.05968310365946075;
		// 1.0 / ( 4.0 * pi )
		const float ONE_OVER_FOURPI = 0.07957747154594767;

		float rayleighPhase( float cosTheta ) {
			return THREE_OVER_SIXTEENPI * ( 1.0 + pow( cosTheta, 2.0 ) );
		}

		float hgPhase( float cosTheta, float g ) {
			float g2 = pow( g, 2.0 );
			float inverse = 1.0 / pow( 1.0 - 2.0 * g * cosTheta + g2, 1.5 );
			return ONE_OVER_FOURPI * ( ( 1.0 - g2 ) * inverse );
		}

		void main() {

			vec3 direction = normalize( vWorldPosition - cameraPosition );

			// optical length
			// cutoff angle at 90 to avoid singularity in next formula.
			float zenithAngle = acos( max( 0.0, dot( up, direction ) ) );
			float inverse = 1.0 / ( cos( zenithAngle ) + 0.15 * pow( 93.885 - ( ( zenithAngle * 180.0 ) / pi ), -1.253 ) );
			float sR = rayleighZenithLength * inverse;
			float sM = mieZenithLength * inverse;

			// combined extinction factor
			vec3 Fex = exp( -( vBetaR * sR + vBetaM * sM ) );

			// in scattering
			float cosTheta = dot( direction, vSunDirection );

			float rPhase = rayleighPhase( cosTheta * 0.5 + 0.5 );
			vec3 betaRTheta = vBetaR * rPhase;

			float mPhase = hgPhase( cosTheta, mieDirectionalG );
			vec3 betaMTheta = vBetaM * mPhase;

			vec3 Lin = pow( vSunE * ( ( betaRTheta + betaMTheta ) / ( vBetaR + vBetaM ) ) * ( 1.0 - Fex ), vec3( 1.5 ) );
			Lin *= mix( vec3( 1.0 ), pow( vSunE * ( ( betaRTheta + betaMTheta ) / ( vBetaR + vBetaM ) ) * Fex, vec3( 1.0 / 2.0 ) ), clamp( pow( 1.0 - dot( up, vSunDirection ), 5.0 ), 0.0, 1.0 ) );

			// nightsky
			float theta = acos( direction.y ); // elevation --> y-axis, [-pi/2, pi/2]
			float phi = atan( direction.z, direction.x ); // azimuth --> x-axis [-pi/2, pi/2]
			vec2 uv = vec2( phi, theta ) / vec2( 2.0 * pi, pi ) + vec2( 0.5, 0.0 );
			vec3 L0 = vec3( 0.1 ) * Fex;

			// composition + solar disc
			float sundisc = smoothstep( sunAngularDiameterCos, sunAngularDiameterCos + 0.00002, cosTheta ) * showSunDisc;
			L0 += ( vSunE * 19000.0 * Fex ) * sundisc;

			vec3 texColor = ( Lin + L0 ) * 0.04 + vec3( 0.0, 0.0003, 0.00075 );

			// Clouds
			if ( direction.y > 0.0 && cloudCoverage > 0.0 ) {

				// Project to cloud plane (higher elevation = clouds appear lower/closer)
				float elevation = mix( 1.0, 0.1, cloudElevation );
				vec2 cloudUV = direction.xz / ( direction.y * elevation );
				cloudUV *= cloudScale;
				cloudUV += time * cloudSpeed;

				// Multi-octave noise for fluffy clouds
				float cloudNoise = fbm( cloudUV * 1000.0 );
				cloudNoise += 0.5 * fbm( cloudUV * 2000.0 + 3.7 );
				cloudNoise = cloudNoise * 0.5 + 0.5;

				// Apply coverage threshold
				float cloudMask = smoothstep( 1.0 - cloudCoverage, 1.0 - cloudCoverage + 0.3, cloudNoise );

				// Fade clouds near horizon (adjusted by elevation)
				float horizonFade = smoothstep( 0.0, 0.1 + 0.2 * cloudElevation, direction.y );
				cloudMask *= horizonFade;

				// Cloud lighting based on sun position
				float sunInfluence = dot( direction, vSunDirection ) * 0.5 + 0.5;
				float daylight = max( 0.0, vSunDirection.y * 2.0 );

				// Base cloud color affected by atmosphere
				vec3 atmosphereColor = Lin * 0.04;
				vec3 cloudColor = mix( vec3( 0.3 ), vec3( 1.0 ), daylight );
				cloudColor = mix( cloudColor, atmosphereColor + vec3( 1.0 ), sunInfluence * 0.5 );
				cloudColor *= vSunE * 0.00002;

				// Blend clouds with sky
				texColor = mix( texColor, cloudColor, cloudMask * cloudDensity );

			}

			gl_FragColor = vec4( texColor, 1.0 );

			#include <tonemapping_fragment>
			#include <colorspace_fragment>

		}`};const ms=new et;class is{constructor(t){t=t||{},this.zNear=t.webGL===!0?-1:0,this.vertices={near:[new C,new C,new C,new C],far:[new C,new C,new C,new C]},t.projectionMatrix!==void 0&&this.setFromProjectionMatrix(t.projectionMatrix,t.maxFar||1e4)}setFromProjectionMatrix(t,e){const s=this.zNear,n=t.elements[11]===0;return ms.copy(t).invert(),this.vertices.near[0].set(1,1,s),this.vertices.near[1].set(1,-1,s),this.vertices.near[2].set(-1,-1,s),this.vertices.near[3].set(-1,1,s),this.vertices.near.forEach(function(a){a.applyMatrix4(ms)}),this.vertices.far[0].set(1,1,1),this.vertices.far[1].set(1,-1,1),this.vertices.far[2].set(-1,-1,1),this.vertices.far[3].set(-1,1,1),this.vertices.far.forEach(function(a){a.applyMatrix4(ms);const i=Math.abs(a.z);n?a.z*=Math.min(e/i,1):a.multiplyScalar(Math.min(e/i,1))}),this.vertices}split(t,e){for(;t.length>e.length;)e.push(new is);e.length=t.length;for(let s=0;s<t.length;s++){const n=e[s];if(s===0)for(let a=0;a<4;a++)n.vertices.near[a].copy(this.vertices.near[a]);else for(let a=0;a<4;a++)n.vertices.near[a].lerpVectors(this.vertices.near[a],this.vertices.far[a],t[s-1]);if(s===t.length-1)for(let a=0;a<4;a++)n.vertices.far[a].copy(this.vertices.far[a]);else for(let a=0;a<4;a++)n.vertices.far[a].lerpVectors(this.vertices.near[a],this.vertices.far[a],t[s])}}toSpace(t,e){for(let s=0;s<4;s++)e.vertices.near[s].copy(this.vertices.near[s]).applyMatrix4(t),e.vertices.far[s].copy(this.vertices.far[s]).applyMatrix4(t)}}const mn={lights_fragment_begin:`
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
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		// Iridescence F0 approximation
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

		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
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

  		// spot lights are ordered [shadows with maps, shadows without maps, maps without shadows, none]
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

#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct ) && defined( USE_CSM ) && defined( CSM_CASCADES )

	DirectionalLight directionalLight;
	float linearDepth = (vViewPosition.z) / (shadowFar - cameraNear);
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif

	#if defined( USE_SHADOWMAP ) && defined( CSM_FADE )
		vec2 cascade;
		float cascadeCenter;
		float closestEdge;
		float margin;
		float csmx;
		float csmy;

		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {

			directionalLight = directionalLights[ i ];
			getDirectionalLightInfo( directionalLight, directLight );

			#if ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
				// NOTE: Depth gets larger away from the camera.
				// cascade.x is closer, cascade.y is further
				cascade = CSM_cascades[ i ];
				cascadeCenter = ( cascade.x + cascade.y ) / 2.0;
				closestEdge = linearDepth < cascadeCenter ? cascade.x : cascade.y;
				margin = 0.25 * pow( closestEdge, 2.0 );
				csmx = cascade.x - margin / 2.0;
				csmy = cascade.y + margin / 2.0;
				if( linearDepth >= csmx && ( linearDepth < csmy || UNROLLED_LOOP_INDEX == CSM_CASCADES - 1 ) ) {

					float dist = min( linearDepth - csmx, csmy - linearDepth );
					float ratio = clamp( dist / margin, 0.0, 1.0 );

					vec3 prevColor = directLight.color;
					directionalLightShadow = directionalLightShadows[ i ];
					directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;

					bool shouldFadeLastCascade = UNROLLED_LOOP_INDEX == CSM_CASCADES - 1 && linearDepth > cascadeCenter;
					directLight.color = mix( prevColor, directLight.color, shouldFadeLastCascade ? ratio : 1.0 );

					ReflectedLight prevLight = reflectedLight;
					RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );

					bool shouldBlend = UNROLLED_LOOP_INDEX != CSM_CASCADES - 1 || UNROLLED_LOOP_INDEX == CSM_CASCADES - 1 && linearDepth < cascadeCenter;
					float blendRatio = shouldBlend ? ratio : 1.0;

					reflectedLight.directDiffuse = mix( prevLight.directDiffuse, reflectedLight.directDiffuse, blendRatio );
					reflectedLight.directSpecular = mix( prevLight.directSpecular, reflectedLight.directSpecular, blendRatio );
					reflectedLight.indirectDiffuse = mix( prevLight.indirectDiffuse, reflectedLight.indirectDiffuse, blendRatio );
					reflectedLight.indirectSpecular = mix( prevLight.indirectSpecular, reflectedLight.indirectSpecular, blendRatio );

				}
			#endif

		}
		#pragma unroll_loop_end
	#elif defined (USE_SHADOWMAP)

		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {

			directionalLight = directionalLights[ i ];
			getDirectionalLightInfo( directionalLight, directLight );

			#if ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )

				directionalLightShadow = directionalLightShadows[ i ];
				if(linearDepth >= CSM_cascades[UNROLLED_LOOP_INDEX].x && linearDepth < CSM_cascades[UNROLLED_LOOP_INDEX].y) directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;

				if(linearDepth >= CSM_cascades[UNROLLED_LOOP_INDEX].x && (linearDepth < CSM_cascades[UNROLLED_LOOP_INDEX].y || UNROLLED_LOOP_INDEX == CSM_CASCADES - 1)) RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );

			#endif

		}
		#pragma unroll_loop_end

	#elif ( NUM_DIR_LIGHT_SHADOWS > 0 )
		// note: no loop here - all CSM lights are in fact one light only
		getDirectionalLightInfo( directionalLights[0], directLight );
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );

	#endif

	#if ( NUM_DIR_LIGHTS > NUM_DIR_LIGHT_SHADOWS)
		// compute the lights not casting shadows (if any)

		#pragma unroll_loop_start
		for ( int i = NUM_DIR_LIGHT_SHADOWS; i < NUM_DIR_LIGHTS; i ++ ) {

			directionalLight = directionalLights[ i ];

			getDirectionalLightInfo( directionalLight, directLight );

			RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );

		}
		#pragma unroll_loop_end

	#endif

#endif


#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct ) && !defined( USE_CSM ) && !defined( CSM_CASCADES )

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

#endif

#if defined( RE_IndirectSpecular )

	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );

#endif
`,lights_pars_begin:`
#if defined( USE_CSM ) && defined( CSM_CASCADES )
uniform vec2 CSM_cascades[CSM_CASCADES];
uniform float cameraNear;
uniform float shadowFar;
#endif
	`+Es.lights_pars_begin},pn=new et,ps=new is({webGL:!0}),re=new C,f0=new C,uo=new Us,vs=[],gs=[],xs=new et,vn=new et,d0=new C(0,1,0);class m0{constructor(t){this.camera=t.camera,this.parent=t.parent,this.cascades=t.cascades||3,this.maxFar=t.maxFar||1e5,this.mode=t.mode||"practical",this.shadowMapSize=t.shadowMapSize||2048,this.shadowBias=t.shadowBias||1e-6,this.lightDirection=t.lightDirection||new C(1,-1,1).normalize(),this.lightIntensity=t.lightIntensity||3,this.lightNear=t.lightNear||1,this.lightFar=t.lightFar||2e3,this.lightMargin=t.lightMargin||200,this.customSplitsCallback=t.customSplitsCallback,this.fade=!1,this.mainFrustum=new is({webGL:!0}),this.frustums=[],this.breaks=[],this.lights=[],this.shaders=new Map,this._createLights(),this.updateFrustums(),this._injectInclude()}_createLights(){for(let t=0;t<this.cascades;t++){const e=new wi(16777215,this.lightIntensity);e.castShadow=!0,e.shadow.mapSize.width=this.shadowMapSize,e.shadow.mapSize.height=this.shadowMapSize,e.shadow.camera.near=this.lightNear,e.shadow.camera.far=this.lightFar,e.shadow.bias=this.shadowBias,this.parent.add(e),this.parent.add(e.target),this.lights.push(e)}}_initCascades(){const t=this.camera;t.updateProjectionMatrix(),this.mainFrustum.setFromProjectionMatrix(t.projectionMatrix,this.maxFar),this.mainFrustum.split(this.breaks,this.frustums)}_updateShadowBounds(){const t=this.frustums;for(let e=0;e<t.length;e++){const n=this.lights[e].shadow.camera,a=this.frustums[e],i=a.vertices.near,r=a.vertices.far,l=r[0];let c;l.distanceTo(r[2])>l.distanceTo(i[2])?c=r[2]:c=i[2];let h=l.distanceTo(c);if(this.fade){const f=this.camera,p=Math.max(f.far,this.maxFar),m=a.vertices.far[0].z/(p-f.near),u=.25*Math.pow(m,2)*(p-f.near);h+=u}n.left=-h/2,n.right=h/2,n.top=h/2,n.bottom=-h/2,n.updateProjectionMatrix()}}_getBreaks(){const t=this.camera,e=Math.min(t.far,this.maxFar);switch(this.breaks.length=0,this.mode){case"uniform":s(this.cascades,t.near,e,this.breaks);break;case"logarithmic":n(this.cascades,t.near,e,this.breaks);break;case"practical":a(this.cascades,t.near,e,.5,this.breaks);break;case"custom":this.customSplitsCallback===void 0&&console.error("CSM: Custom split scheme callback not defined."),this.customSplitsCallback(this.cascades,t.near,e,this.breaks);break}function s(i,r,l,c){for(let h=1;h<i;h++)c.push((r+(l-r)*h/i)/l);c.push(1)}function n(i,r,l,c){for(let h=1;h<i;h++)c.push(r*(l/r)**(h/i)/l);c.push(1)}function a(i,r,l,c,h){vs.length=0,gs.length=0,n(i,r,l,gs),s(i,r,l,vs);for(let f=1;f<i;f++)h.push($.lerp(vs[f-1],gs[f-1],c));h.push(1)}}update(){const t=this.camera,e=this.frustums;xs.lookAt(f0,this.lightDirection,d0),vn.copy(xs).invert();for(let s=0;s<e.length;s++){const n=this.lights[s],a=n.shadow.camera,i=(a.right-a.left)/this.shadowMapSize,r=(a.top-a.bottom)/this.shadowMapSize;pn.multiplyMatrices(vn,t.matrixWorld),e[s].toSpace(pn,ps);const l=ps.vertices.near,c=ps.vertices.far;uo.makeEmpty();for(let h=0;h<4;h++)uo.expandByPoint(l[h]),uo.expandByPoint(c[h]);uo.getCenter(re),re.z=uo.max.z+this.lightMargin,re.x=Math.floor(re.x/i)*i,re.y=Math.floor(re.y/r)*r,re.applyMatrix4(xs),n.position.copy(re),n.target.position.copy(re),n.target.position.x+=this.lightDirection.x,n.target.position.y+=this.lightDirection.y,n.target.position.z+=this.lightDirection.z}}_injectInclude(){Es.lights_fragment_begin=mn.lights_fragment_begin,Es.lights_pars_begin=mn.lights_pars_begin}setupMaterial(t){t.defines=t.defines||{},t.defines.USE_CSM=1,t.defines.CSM_CASCADES=this.cascades,this.fade&&(t.defines.CSM_FADE="");const e=[],s=this,n=this.shaders;t.onBeforeCompile=function(a){const i=Math.min(s.camera.far,s.maxFar);s._getExtendedBreaks(e),a.uniforms.CSM_cascades={value:e},a.uniforms.cameraNear={value:s.camera.near},a.uniforms.shadowFar={value:i},n.set(t,a)},n.set(t,null)}_updateUniforms(){const t=Math.min(this.camera.far,this.maxFar);this.shaders.forEach(function(s,n){if(s!==null){const a=s.uniforms;this._getExtendedBreaks(a.CSM_cascades.value),a.cameraNear.value=this.camera.near,a.shadowFar.value=t}!this.fade&&"CSM_FADE"in n.defines?(delete n.defines.CSM_FADE,n.needsUpdate=!0):this.fade&&!("CSM_FADE"in n.defines)&&(n.defines.CSM_FADE="",n.needsUpdate=!0)},this)}_getExtendedBreaks(t){for(;t.length<this.breaks.length;)t.push(new ut);t.length=this.breaks.length;for(let e=0;e<this.cascades;e++){const s=this.breaks[e],n=this.breaks[e-1]||0;t[e].x=n,t[e].y=s}}updateFrustums(){this._getBreaks(),this._initCascades(),this._updateShadowBounds(),this._updateUniforms()}remove(){for(let t=0;t<this.lights.length;t++)this.parent.remove(this.lights[t].target),this.parent.remove(this.lights[t])}dispose(){const t=this.shaders;t.forEach(function(e,s){delete s.onBeforeCompile,delete s.defines.USE_CSM,delete s.defines.CSM_CASCADES,delete s.defines.CSM_FADE,e!==null&&(delete e.uniforms.CSM_cascades,delete e.uniforms.cameraNear,delete e.uniforms.shadowFar),s.needsUpdate=!0}),t.clear()}}function _a(o,t=31.2,e=172){const s=$.degToRad($.clamp(t,-89,89)),n=$.degToRad(23.44)*Math.sin(2*Math.PI*(284+e)/365),a=((o%24+24)%24-12)*Math.PI/12;return new C(-Math.cos(n)*Math.sin(a),Math.sin(s)*Math.sin(n)+Math.cos(s)*Math.cos(n)*Math.cos(a),Math.sin(s)*Math.cos(n)*Math.cos(a)-Math.cos(s)*Math.sin(n)).normalize()}function p0(o,t,e){const s=$.clamp(.22/Math.max(.01,t),.72,1.35);return $.lerp(o,s,1-Math.exp(-Math.max(0,Math.min(e,.1))/(s<o?.9:2.4)))}function v0(o){const t=new as;t.name="physical-rayleigh-mie-sky",t.material.fragmentShader=t.material.fragmentShader.replace("vec4( texColor, 1.0 )","vec4( texColor * 0.16, 1.0 )"),t.scale.setScalar(o),t.frustumCulled=!1;const e=t.material.uniforms;return e.turbidity.value=2.5,e.rayleigh.value=1.25,e.mieCoefficient.value=.004,e.mieDirectionalG.value=.78,e.sunPosition.value.copy(_a(14)).multiplyScalar(45e4),e.cloudScale.value=.0015,e.cloudCoverage.value=.25,e.cloudDensity.value=.55,t}class Pc{constructor(t,e,s){F(this,"csm");F(this,"known",new WeakSet);F(this,"scanned",0);F(this,"projection","");this.scene=t,this.camera=e,this.csm=new m0({camera:e,parent:t,cascades:s==="high"?3:2,mode:"practical",maxFar:s==="high"?150:90,shadowMapSize:s==="high"?2048:1024,lightDirection:_a(14).negate(),lightIntensity:1,lightNear:.1,lightFar:650,shadowBias:-5e-5,lightMargin:160}),this.csm.fade=!0;for(const n of this.csm.lights)n.shadow.normalBias=.018,n.shadow.radius=2}update(t,e){this.scanned++%30===0&&this.scene.traverse(n=>{const a=n;if(a.isMesh)for(const i of Array.isArray(a.material)?a.material:[a.material]){if(!(i instanceof at)||this.known.has(i))continue;this.known.add(i);const r=i.onBeforeCompile,l=i.customProgramCacheKey.bind(i);this.csm.setupMaterial(i);const c=i.onBeforeCompile;i.onBeforeCompile=function(h,f){c.call(this,h,f),r.call(this,h,f)},i.customProgramCacheKey=()=>`${l()}|world-csm-${this.csm.cascades}`,i.needsUpdate=!0,i.addEventListener("dispose",()=>this.csm.shaders.delete(i))}});const s=`${this.camera.aspect}/${this.camera.fov}/${this.camera.far}`;s!==this.projection&&(this.projection=s,this.csm.updateFrustums()),this.csm.lightDirection.copy(e).negate();for(const n of this.csm.lights)n.color.copy(t.color),n.intensity=t.intensity;t.visible=!1,this.camera.updateMatrixWorld(),this.csm.update()}dispose(){this.csm.remove(),this.csm.dispose()}}const fo=new C;function Vt(o,t,e,s,n,a){const i=2*Math.PI*n/4,r=Math.max(a-2*n,0),l=Math.PI/4;fo.copy(t),fo[s]=0,fo.normalize();const c=.5*i/(i+r),h=1-fo.angleTo(o)/l;return Math.sign(fo[e])===1?h*c:r/(i+r)+c+c*(1-h)}class Se extends Mo{constructor(t=1,e=1,s=1,n=2,a=.1){const i=n*2+1;if(a=Math.min(t/2,e/2,s/2,a),super(1,1,1,i,i,i),this.type="RoundedBoxGeometry",this.parameters={width:t,height:e,depth:s,segments:n,radius:a},i===1)return;const r=this.toNonIndexed();this.index=null,this.attributes.position=r.attributes.position,this.attributes.normal=r.attributes.normal,this.attributes.uv=r.attributes.uv;const l=new C,c=new C,h=new C(t,e,s).divideScalar(2).subScalar(a),f=this.attributes.position.array,p=this.attributes.normal.array,m=this.attributes.uv.array,u=f.length/6,v=new C,w=.5/i;for(let M=0,d=0;M<f.length;M+=3,d+=2)switch(l.fromArray(f,M),c.copy(l),c.x-=Math.sign(c.x)*w,c.y-=Math.sign(c.y)*w,c.z-=Math.sign(c.z)*w,c.normalize(),f[M+0]=h.x*Math.sign(l.x)+c.x*a,f[M+1]=h.y*Math.sign(l.y)+c.y*a,f[M+2]=h.z*Math.sign(l.z)+c.z*a,p[M+0]=c.x,p[M+1]=c.y,p[M+2]=c.z,Math.floor(M/u)){case 0:v.set(1,0,0),m[d+0]=Vt(v,c,"z","y",a,s),m[d+1]=1-Vt(v,c,"y","z",a,e);break;case 1:v.set(-1,0,0),m[d+0]=1-Vt(v,c,"z","y",a,s),m[d+1]=1-Vt(v,c,"y","z",a,e);break;case 2:v.set(0,1,0),m[d+0]=1-Vt(v,c,"x","z",a,t),m[d+1]=Vt(v,c,"z","x",a,s);break;case 3:v.set(0,-1,0),m[d+0]=1-Vt(v,c,"x","z",a,t),m[d+1]=1-Vt(v,c,"z","x",a,s);break;case 4:v.set(0,0,1),m[d+0]=1-Vt(v,c,"x","y",a,t),m[d+1]=1-Vt(v,c,"y","x",a,e);break;case 5:v.set(0,0,-1),m[d+0]=Vt(v,c,"x","y",a,t),m[d+1]=1-Vt(v,c,"y","x",a,e);break}}static fromJSON(t){return new Se(t.width,t.height,t.depth,t.segments,t.radius)}}const Gs=["masonry","brick","plaster","paving","wood","tiles","metal","concrete"],g0={masonry:2.4,brick:1.2,plaster:1.6,paving:1.8,wood:1.6,tiles:1.2,metal:1,concrete:2};function Pa(o){return Gs.indexOf(o)}const Da=.65,Ra=.87,Ca=.66;function x0(o){let t=o>>>0;return()=>{t=t+1831565813>>>0;let e=t;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}}const ft=(o,t,e)=>{const s=(e-o)/(t-o);return s<=0?0:s>=1?1:s*s*(3-2*s)},$t=(o,t,e)=>o+(t-o)*e,w0=o=>o<0?0:o>1?1:o;function J(o,t,e,s,n,a=.5){const i=new Float32Array(o*o);let r=1,l=0;const c=new Int32Array(o),h=new Int32Array(o),f=new Float32Array(o);for(let m=0;m<n;m++){const u=e<<m,v=s<<m;if(u>o/2||v>o/2)break;const w=new Float32Array(u*v);for(let d=0;d<w.length;d++)w[d]=t();for(let d=0;d<o;d++){const g=d*u/o,x=Math.floor(g),y=g-x;c[d]=x%u,h[d]=(x+1)%u,f[d]=y*y*(3-2*y)}const M=new Float32Array(u);for(let d=0;d<o;d++){const g=d*v/o,x=Math.floor(g),y=g-x,S=y*y*(3-2*y),k=x%v*u,b=(x+1)%v*u;for(let A=0;A<u;A++)M[A]=w[k+A]+(w[b+A]-w[k+A])*S;const T=d*o;for(let A=0;A<o;A++){const _=M[c[A]];i[T+A]+=r*(_+(M[h[A]]-_)*f[A])}}l+=r,r*=a}if(l===0)throw new Error("noiseField: cells exceed size");const p=1/l;for(let m=0;m<i.length;m++)i[m]*=p;return i}function M0(o){const t=o*o;return{S:o,mask:o-1,s:o/512,H:new Float32Array(t),R:new Float32Array(t).fill(1),G:new Float32Array(t).fill(1),B:new Float32Array(t).fill(1),F:new Float32Array(t).fill(Ca),A:new Float32Array(t).fill(1)}}function gn(o,t,e,s,n){const a=o-1,i=Math.ceil(s),r=Math.round(t),l=Math.round(e);for(let c=-i;c<=i;c++)for(let h=-i;h<=i;h++){const f=Math.sqrt(h*h+c*c)/s;f>=1||n((l+c&a)*o+(r+h&a),1-f)}}function Ws(o,t,e){const s=o-1,n=o/512,a=new Int32Array(e.rows+1);{const x=[];let y=0;for(let k=0;k<e.rows;k++){const b=1+(t()-.5)*2*e.rowJitter;x.push(b),y+=b}let S=0;for(let k=0;k<e.rows;k++)a[k]=Math.round(S/y*o),S+=x[k];a[e.rows]=o}const i=new Int16Array(o);for(let x=0;x<e.rows;x++)for(let y=a[x];y<a[x+1];y++)i[y]=x;const r=[],l=new Int32Array(e.rows),c=new Int32Array(e.rows+1),h=new Uint16Array(e.rows*o);let f=0;for(let x=0;x<e.rows;x++){const y=Math.max(1,e.perRow+(e.perRowVar?(t()*3|0)-1:0)),S=[];let k=0;for(let A=0;A<y;A++){const _=1+(t()-.5)*2*e.widthJitter;S.push(_),k+=_}const b=new Int32Array(y+1);let T=0;for(let A=0;A<y;A++)b[A]=Math.round(T/k*o),T+=S[A];b[y]=o,r.push(b),l[x]=e.offset==="random"?Math.floor(t()*o):e.offset==="half"?(x&1)*Math.round(o/y/2):0;for(let A=0;A<y;A++)for(let _=b[A];_<b[A+1];_++)h[x*o+_]=A;c[x]=f,f+=y}c[e.rows]=f;const p=J(o,t,6,6,3),m=e.warp*n*2.6,u=o/3|0,v=o/5|0,w=new Float32Array(o*o),M=new Int32Array(o*o),d=new Float32Array(o*o),g=new Float32Array(o*o);for(let x=0;x<o;x++)for(let y=0;y<o;y++){const S=x*o+y,k=(y+(p[S]-.5)*m|0)&s,b=(x+(p[(x+u&s)*o+(y+v&s)]-.5)*m|0)&s,T=i[b],A=k-l[T]&s,_=h[T*o+A],P=r[T],D=P[_],R=P[_+1],z=a[T],N=a[T+1],I=Math.min(A-D,R-1-A,b-z,N-1-b)+.5;w[S]=I,M[S]=c[T]+_,d[S]=(A-D+.5)/(R-D),g[S]=(b-z+.5)/(N-z)}return{d:w,id:M,fu:d,fv:g,total:f}}function y0(o,t){const e=o.S,s=o.s,n=Ws(e,t,{rows:6,rowJitter:.3,perRow:3,perRowVar:!0,widthJitter:.45,offset:"random",warp:4.5}),a=J(e,t,3,3,3),i=J(e,t,10,10,3),r=J(e,t,e/4,e/4,2),l=J(e,t,4,4,3),c=new Float32Array(n.total),h=new Float32Array(n.total),f=new Float32Array(n.total),p=new Float32Array(n.total*2);for(let u=0;u<n.total;u++)c[u]=(.78+t()*.42)*(t()<.1?.8:1),h[u]=.5+t()*.3,f[u]=(t()-.5)*.1,p[u*2]=(t()-.5)*.16,p[u*2+1]=(t()-.5)*.16;const m=Math.max(2,5*s);for(let u=0;u<e*e;u++){const v=n.d[u],w=n.id[u],M=n.fu[u],d=n.fv[u],g=ft(m*.55,m*.55+8*s,v),x=1-ft(m*.45,m*1.25,v),y=Math.sin(Math.PI*M)*Math.sin(Math.PI*d),S=h[w]*(.82+.26*a[u])+y*.1+(M-.5)*p[w*2]+(d-.5)*p[w*2+1]+(i[u]-.5)*.16+(r[u]-.5)*.08;o.H[u]=$t(.04+(r[u]-.5)*.05,S,g);let k=c[w]*(.88+.28*i[u])*(.9+.2*l[u])*(.84+.16*ft(m,m+12*s,v));k*=.94+.12*r[u];const b=1.04*(.82+.34*r[u]);k=$t(k,b,x);const T=f[w]*(1-x);o.R[u]=k*(1+T+x*.03),o.G[u]=k*(1+T*.3),o.B[u]=k*(1-T*.9-x*.07),o.F[u]=$t(.6+(i[u]-.5)*.3,.95,x),o.A[u]=1-x*.35}}function b0(o,t){const e=o.S,s=o.s,n=Ws(e,t,{rows:16,rowJitter:0,perRow:6,perRowVar:!1,widthJitter:0,offset:"half",warp:.8}),a=J(e,t,8,8,3),i=J(e,t,e/4,e/4,2),r=J(e,t,5,5,3),l=new Float32Array(n.total),c=new Float32Array(n.total),h=new Float32Array(n.total);for(let p=0;p<n.total;p++)l[p]=(.82+t()*.3)*(t()<.08?.72:1)*(t()<.05?1.12:1),c[p]=t()-.5,h[p]=.76+t()*.12;const f=Math.max(2,4*s);for(let p=0;p<e*e;p++){const m=n.d[p],u=n.id[p],v=ft(f*.5,f+2.6*s,m),w=1-ft(f*.4,f*1.15,m),M=(i[p]-.5)*.07;o.H[p]=$t(.06+M*.4,h[u]+M+(a[p]-.5)*.06,v);let d=l[u]*(.9+.2*a[p])*(.92+.16*i[p])*(.94+.12*r[p]);d*=.9+.1*ft(f,f+6*s,m);const g=1.3*(.84+.32*i[p]);d=$t(d,g,w);const x=c[u]*(1-w);o.R[p]=d*(1+x*.16+w*.04),o.G[p]=d*(1-x*.04+w*.14),o.B[p]=d*(1-x*.3+w*.2),o.F[p]=$t(.74+(i[p]-.5)*.2,.96,w),o.A[p]=1-w*.4}}function S0(o,t){const e=o.S,s=o.s,n=Ws(e,t,{rows:3,rowJitter:.04,perRow:3,perRowVar:!1,widthJitter:.05,offset:"random",warp:1.6}),a=J(e,t,3,3,3),i=J(e,t,12,12,3),r=J(e,t,e/4,e/4,2),l=J(e,t,5,5,4),c=new Float32Array(n.total),h=new Float32Array(n.total),f=new Float32Array(n.total),p=new Float32Array(n.total*2);for(let u=0;u<n.total;u++)c[u]=.86+t()*.26,h[u]=(t()-.5)*.08,f[u]=.62+t()*.16,p[u*2]=(t()-.5)*.1,p[u*2+1]=(t()-.5)*.1;const m=Math.max(2,4.5*s);for(let u=0;u<e*e;u++){const v=n.d[u],w=n.id[u],M=ft(m*.5,m+4*s,v),d=1-ft(m*.4,m*1.2,v),g=l[u],x=f[w]+(n.fu[u]-.5)*p[w*2]+(n.fv[u]-.5)*p[w*2+1]-g*.12+(i[u]-.5)*.08+(r[u]-.5)*.05;o.H[u]=$t(.05+(r[u]-.5)*.06,x,M);let y=c[w]*(.9+.2*a[u])*(.9+.2*i[u])*(.95+.1*r[u]);y*=.88+.12*ft(m,m+8*s,v),y=$t(y,.78*(.8+.4*r[u]),d);const S=h[w]*(1-d);o.R[u]=y*(1+S+d*.04),o.G[u]=y*(1+S*.2+d*.02),o.B[u]=y*(1-S*.8-d*.06),o.F[u]=$t(.68+(g-.5)*.3,.96,d),o.A[u]=1-d*.4}}function k0(o,t){const e=o.S,s=o.s,n=o.mask,a=J(e,t,3,3,5),i=J(e,t,12,12,3),r=J(e,t,e/2,e/2,1),l=J(e,t,5,5,3),c=J(e,t,6,6,4),h=J(e,t,24,24,3),f=new Float32Array(e*e),p=(u,v,w,M,d)=>{for(let g=0;g<M;g++){w+=(t()-.5)*.5,u+=Math.cos(w),v+=Math.sin(w);const x=Math.round(u)&n,y=Math.round(v)&n,S=1-g/M*.5,k=y*e+x;f[k]<S&&(f[k]=S);const b=y*e+(x+1&n),T=(y+1&n)*e+x;f[b]=Math.max(f[b],S*.35),f[T]=Math.max(f[T],S*.35),d<2&&t()<.0035&&p(u,v,w+(t()<.5?-1:1)*(.5+t()*.6),M*.45,d+1)}},m=1;for(let u=0;u<m;u++)p(t()*e,t()*e,t()*Math.PI*2,(110+t()*150)*s,0);for(let u=0;u<e*e;u++){const v=ft(.8,.84,c[u]+(h[u]-.5)*.3),w=v*(1-ft(.8,1,v)),M=(r[u]-.5)*2+(t()-.5)*.9,d=f[u],g=.62+(l[u]-.5)*.18+M*.03-v*.2-d*.3+w*.04;o.H[u]=g;let x=(.95+.1*a[u])*(.96+.08*i[u])*(1+M*.035);x=$t(x,x*.94,v),x*=1-d*.18,o.R[u]=x*(1+v*.01),o.G[u]=x*(1-v*.04),o.B[u]=x*(1-v*.12),o.F[u]=$t(.84+(i[u]-.5)*.14,.98,v),o.A[u]=1-d*.3-v*.1}}function T0(o,t){const e=o.S,s=o.s,n=o.mask,a=10,i=new Int32Array(a+1);{const k=[];let b=0;for(let A=0;A<a;A++){const _=.88+t()*.24;k.push(_),b+=_}let T=0;for(let A=0;A<a;A++)i[A]=Math.round(T/b*e),T+=k[A];i[a]=e}const r=new Int16Array(e);for(let k=0;k<a;k++)for(let b=i[k];b<i[k+1];b++)r[b]=k;const l=new Int32Array(a),c=new Int32Array(a),h=new Float32Array(a*2),f=new Float32Array(a*2),p=new Float32Array(a*2),m=new Float32Array(a*2);for(let k=0;k<a;k++){l[k]=Math.floor(t()*e),c[k]=l[k]+Math.round(e*(.38+t()*.24))&n;for(let b=0;b<2;b++)h[k*2+b]=.8+t()*.4,f[k*2+b]=t()-.5,p[k*2+b]=2.5+t()*3.5,m[k*2+b]=t()*6.28}const u=J(e,t,2,32,3),v=J(e,t,6,6,3),w=J(e,t,12,e/2,1),M=J(e,t,4,4,3),d=new Float32Array(e*e),g=[];for(let k=0;k<3;k++)g.push({x:t()*e,y:t()*e,r:(13+t()*9)*s});for(const k of g){const b=Math.ceil(k.r*2.6);for(let T=-b;T<=b;T++)for(let A=-b;A<=b;A++){const _=Math.sqrt(A/1.7*(A/1.7)+T*T)/k.r;if(_>2.6)continue;const P=(Math.round(k.y+T)&n)*e+(Math.round(k.x+A)&n);d[P]+=Math.sign(T||1)*10*s*Math.exp(-_*_*.9)*(_<.2?_/.2:1)}}const x=new Float32Array(e*e).fill(1),y=new Float32Array(e*e);for(const k of g){const b=Math.ceil(k.r*1.2);for(let T=-b;T<=b;T++)for(let A=-b;A<=b;A++){const _=Math.sqrt(A/1.7*(A/1.7)+T*T)/k.r;if(_>=1.1)continue;const P=(Math.round(k.y+T)&n)*e+(Math.round(k.x+A)&n),D=.5+.5*Math.cos(_*16),R=1-ft(.6,1.1,_);x[P]*=1-R*(.5-.18*D),y[P]+=R*(.06+.04*D)-ft(.2,.5,_)*(1-ft(.5,1,_))*.03}}const S=Math.PI*2;for(let k=0;k<e;k++){const b=r[k],T=i[b],A=i[b+1]-T,_=k-T,P=Math.min(_,A-1-_)+.5,D=1-ft(.3*s,2.8*s,P);for(let R=0;R<e;R++){const z=k*e+R,I=(k+(d[z]|0)&n)*e+R,B=Math.abs(R-l[b]),U=Math.abs(R-c[b]),V=Math.min(B,e-B,U,e-U)+.5,G=1-ft(.3*s,2.2*s,V),X=(R-l[b]&n)<(c[b]-l[b]&n)?0:1,H=b*2+X,tt=u[I],dt=v[I],pt=.5+.5*Math.sin(((_+d[z])/A*p[H]+dt*1.7+tt*1.1)*S+m[H]),q=ft(.56,.78,w[I]);let ot=h[H]*(.78+.3*tt+.2*pt)*(.92+.16*M[z])*x[z];ot*=1-q*.22;const lt=Math.max(D,G);ot*=1-lt*.55;const nt=f[H];o.R[z]=ot*(1+nt*.12),o.G[z]=ot*(1+nt*.03),o.B[z]=ot*(1-nt*.16),o.H[z]=(.72+pt*.05-q*.05+(tt-.5)*.04+y[z])*(1-lt*.85),o.F[z]=.7+(tt-.5)*.16+q*.16+lt*.2,o.A[z]=1-lt*.5-q*.12}}}function A0(o,t){const e=o.S,s=o.s,n=o.mask,a=6,i=5,r=J(e,t,4,4,2),l=J(e,t,10,10,3),c=J(e,t,e/4,e/4,2),h=J(e,t,4,4,4),f=new Float32Array(a*i),p=new Float32Array(a*i),m=new Float32Array(a*i),u=new Float32Array(a*i);for(let M=0;M<f.length;M++)f[M]=.8+t()*.36,p[M]=t()-.5,m[M]=(t()-.5)*.14,u[M]=t();const v=2.4*s*2.6,w=Math.PI;for(let M=0;M<e;M++)for(let d=0;d<e;d++){const g=M*e+d,x=d+(r[g]-.5)*v,S=(M+(r[(M+83&n)*e+(d+171&n)]-.5)*v)/e*i;let k=Math.floor(S);const b=S-k;k=(k%i+i)%i;const T=x/e*a+.5*(k&1),A=Math.floor(T),_=T-A,P=(A%a+a)%a,D=k*a+P,R=Math.sqrt(Math.sin(w*_)),z=.5+.5*b*(.4+.6*b),N=1-ft(.9,1,b)*.12,I=R*z*N*.9+m[D]*(b-.5)+(c[g]-.5)*.04+(l[g]-.5)*.05;o.H[g]=I;const B=ft(0,.22,b),U=1-ft(.02,.18,Math.min(_,1-_));let V=f[D]*(.88+.12*B)*(.92+.16*l[g])*(.94+.12*c[g])*(1-.18*ft(.55,.8,h[g]));V*=1+.12*ft(.93,1,b),V*=1-U*.22;const G=p[D];o.R[g]=V*(1+G*.1),o.G[g]=V*(1-G*.01),o.B[g]=V*(1-G*.14),o.F[g]=.62+u[D]*.16+(c[g]-.5)*.1+U*.2,o.A[g]=(.6+.4*B)*(1-U*.25)}}function _0(o,t){const e=o.S,s=o.s,n=o.mask,a=J(e,t,2,e/8,3),i=J(e,t,1,e/4,2),r=J(e,t,3,3,3),l=J(e,t,4,4,5),c=J(e,t,24,24,3),h=J(e,t,e/2,e/2,1),f=new Float32Array(e*e),p=new Float32Array(e*e),m=Math.round(70*s*Math.max(1,s));for(let u=0;u<m;u++){let v=t()*e,w=t()*e;const M=t()<.7?(t()-.5)*.5:t()*Math.PI*2,d=(14+t()*t()*130)*s,g=t()<.15,x=.3+t()*.5,y=Math.cos(M),S=Math.sin(M),k=g?p:f;for(let b=0;b<d;b+=.6){v+=y*.6,w+=S*.6;const T=(Math.round(w)&n)*e+(Math.round(v)&n),A=1-Math.abs(b/d-.5)*1.1;k[T]<x*A&&(k[T]=x*A)}}for(let u=0;u<e*e;u++){const v=(a[u]-.5)*1.4+(i[u]-.5)*.8,w=ft(.56,.8,l[u]+(c[u]-.5)*.28)*(.6+.4*c[u]),M=f[u],d=p[u];let g=(1+v*.2)*(.94+.12*r[u])*(1+(h[u]-.5)*.06);g*=1+M*.38-d*.3,g=$t(g,g*.8,w),o.R[u]=g*(1+w*.07),o.G[u]=g*(1-w*0),o.B[u]=g*(1-w*.14),o.H[u]=.6+v*.03+(r[u]-.5)*.12-M*.12-d*.18+w*.04,o.F[u]=.5+v*.14+M*.18+w*.42+(h[u]-.5)*.06,o.A[u]=1-w*.12-d*.1}}function P0(o,t){const e=o.S,s=o.s,n=J(e,t,3,3,4),a=J(e,t,14,14,3),i=J(e,t,e/2,e/2,1),r=J(e,t,10,2,3),l=new Float32Array(e*e),c=new Float32Array(e*e),h=Math.round(260*s*s);for(let u=0;u<h;u++){const v=(.9+t()*t()*3.6)*s,w=.4+t()*.6;gn(e,t()*e,t()*e,Math.max(1.2,v),(M,d)=>{const g=w*Math.min(1,d*1.8);l[M]<g&&(l[M]=g),c[M]=Math.max(c[M],g)})}const f=e/2,p=new Float32Array(e*e);for(let u=0;u<2;u++)for(let v=0;v<2;v++)for(const[w,M]of[[.25,.25],[.75,.25],[.25,.75],[.75,.75]])gn(e,v*f+w*f,u*f+M*f,5*s,(d,g)=>{const x=Math.min(1,g*1.6);p[d]<x&&(p[d]=x)});const m=[1,.96,1.04,.98];for(let u=0;u<e;u++){const v=Math.min(u%f,f-u%f);for(let w=0;w<e;w++){const M=u*e+w,d=Math.min(w%f,f-w%f),g=1-ft(.2*s,2.4*s,Math.min(d,v)+.5),x=m[(w>=f?1:0)+(u>=f?2:0)],y=(i[M]-.5)*2,S=l[M],k=p[M],b=.68+(a[M]-.5)*.1+y*.035-S*.5-g*.45-k*.55;o.H[M]=b;let T=x*(.9+.2*n[M])*(.94+.12*a[M])*(.86+.28*r[M])*(1+y*.05);T*=1-S*.42-g*.2-k*.5,o.R[M]=T*1.01,o.G[M]=T,o.B[M]=T*.985,o.F[M]=.8+(a[M]-.5)*.18+S*.12,o.A[M]=1-S*.5-g*.25-k*.5}}}const D0={masonry:{normal:3.2,ao:2.4,aoRadius:9},brick:{normal:3,ao:2.2,aoRadius:6},plaster:{normal:2,ao:1.4,aoRadius:5},paving:{normal:3,ao:2.2,aoRadius:8},wood:{normal:2.2,ao:1.8,aoRadius:4},tiles:{normal:4.6,ao:2.4,aoRadius:9},metal:{normal:1.6,ao:1.2,aoRadius:3},concrete:{normal:2.2,ao:1.8,aoRadius:5}};function R0(o,t,e){const s=new Float32Array(t*t),n=new Float32Array(t*t),a=t-1,r=1/(2*e+1);for(let l=0;l<t;l++){const c=l*t;let h=0;for(let f=-e;f<=e;f++)h+=o[c+(f&a)];for(let f=0;f<t;f++)s[c+f]=h*r,h+=o[c+(f+e+1&a)]-o[c+(f-e&a)]}for(let l=0;l<t;l++){let c=0;for(let h=-e;h<=e;h++)c+=s[(h&a)*t+l];for(let h=0;h<t;h++)n[h*t+l]=c*r,c+=s[(h+e+1&a)*t+l]-s[(h-e&a)*t+l]}return n}function C0(o,t){const e=o.S,s=e*e,n=D0[t],a=o.mask,i=x=>x<=0?0:x>=1?255:x*255+.5|0;let r=0;for(let x=0;x<s;x++)r+=o.R[x]*.3+o.G[x]*.59+o.B[x]*.11;const l=Da/(r/s),c=R0(o.H,e,Math.max(2,Math.round(n.aoRadius*o.s))),h=new Float32Array(s);let f=0;for(let x=0;x<s;x++){const y=c[x]-o.H[x],S=w0(1-Math.max(0,y)*n.ao*3.2+Math.max(0,-y)*.25)*o.A[x];h[x]=S<.35?.35:S,f+=h[x]}const p=f/s,m=Math.log(Ra)/Math.log(Math.min(.99,Math.max(.3,p))),u=new Uint8Array(1025);for(let x=0;x<=1024;x++)u[x]=i(Math.pow(x/1024,m));const v=new Uint8Array(s*4),w=new Uint8Array(s*4),M=new Uint8Array(s),d=o.H,g=n.normal;for(let x=0;x<e;x++){const y=(x-1&a)*e,S=x*e,k=(x+1&a)*e;for(let b=0;b<e;b++){const T=b-1&a,A=b+1&a,_=d[y+A]+2*d[S+A]+d[k+A]-d[y+T]-2*d[S+T]-d[k+T],P=d[k+T]+2*d[k+b]+d[k+A]-d[y+T]-2*d[y+b]-d[y+A],D=-_*g/8,R=-P*g/8,z=1/Math.sqrt(D*D+R*R+1),N=S+b,I=N*4;v[I]=i(o.R[N]*l),v[I+1]=i(o.G[N]*l),v[I+2]=i(o.B[N]*l),v[I+3]=u[h[N]*1024+.5|0],w[I]=i(D*z*.5+.5),w[I+1]=i(R*z*.5+.5),w[I+2]=i(z*.5+.5),w[I+3]=i(o.F[N]),M[N]=i(d[N])}}return{size:e,albedo:v,normal:w,height:M}}const E0={masonry:y0,brick:b0,plaster:k0,paving:S0,wood:T0,tiles:A0,metal:_0,concrete:P0};function z0(o,t,e){if(t<64||(t&t-1)!==0)throw new Error("size must be a power of two >= 64");const s=x0(e*7919+Pa(o)*104729+1),n=M0(t);return E0[o](n,s),C0(n,o)}const N0=20260616;let Bs="high",te;function Dc(o){te||(Bs=o)}function F0(){return te?te.quality:Bs}function xn(o,t,e){const s=t*t*4,n=new Uint8Array(s*o.length);o.forEach((i,r)=>n.set(i,r*s));const a=new Mi(n,t,t,o.length);return a.format=To,a.type=Ao,a.colorSpace=ko,a.wrapS=a.wrapT=me,a.magFilter=Fe,a.minFilter=Jo,a.generateMipmaps=!0,a.anisotropy=e,a.userData.shared=!0,a.needsUpdate=!0,a}function I0(o=Bs,t=4){if(te)return te;const e=o==="low"?256:512,s=typeof performance<"u"?performance.now():Date.now(),n=[],a=[];for(const c of Gs){const h=z0(c,e,N0);n.push(h.albedo),a.push(h.normal)}const i=xn(n,e,t),r=xn(a,e,t),l=(typeof performance<"u"?performance.now():Date.now())-s;return te={quality:o,size:e,albedo:i,normal:r,generationMs:l,dispose(){i.dispose(),r.dispose()}},te}function Rc(){te==null||te.dispose(),te=void 0}const Ke="aKitBase";function jo(o){var n;if(o.getAttribute(Ke))return;const t=o.getAttribute("position");if(!t)return;o.boundingBox||o.computeBoundingBox();const e=(n=o.boundingBox)==null?void 0:n.min.y;if(e===void 0||!Number.isFinite(e))return;const s=new Float32Array(t.count*2);for(let a=0;a<t.count;a++)s[a*2]=e,s[a*2+1]=1;o.setAttribute(Ke,new ct(s,2))}function Ea(o){return o.userData.kitKind!==void 0}const L0={masonry:{grime:1,streak:.8,wear:.85,edgeRough:.08},brick:{grime:1,streak:.7,wear:.8,edgeRough:.06},plaster:{grime:1,streak:1,wear:.55,edgeRough:.1},paving:{grime:.5,streak:0,wear:.7,edgeRough:.06},wood:{grime:.7,streak:.4,wear:.9,edgeRough:.06},tiles:{grime:.35,streak:.2,wear:.6,edgeRough:.06},metal:{grime:.4,streak:.35,wear:1,edgeRough:-.28},concrete:{grime:1,streak:1,wear:.5,edgeRough:.06}},De=o=>o.toFixed(3),U0=`
attribute vec2 aKitBase;
varying vec3 vKitWorld;
varying float vKitH;
`,O0=`
{
  vec4 kLocal = vec4(transformed, 1.0);
  vec4 kBase = vec4(0.0, aKitBase.x, 0.0, 1.0);
  #ifdef USE_BATCHING
    kLocal = batchingMatrix * kLocal;
    kBase = batchingMatrix * kBase;
  #endif
  #ifdef USE_INSTANCING
    kLocal = instanceMatrix * kLocal;
    kBase = instanceMatrix * kBase;
  #endif
  vKitWorld = (modelMatrix * kLocal).xyz;
  // no base attribute (aKitBase.y == 0): skip the wall-base grime
  vKitH = aKitBase.y > 0.5 ? vKitWorld.y - (modelMatrix * kBase).y : 100.0;
}
`,G0=`
varying vec3 vKitWorld;
varying float vKitH;
uniform highp sampler2DArray uKitAlb;
uniform highp sampler2DArray uKitNrm;
uniform float uKitGrime;
uniform float uKitWear;
float kHash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float kNoise(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  return mix(mix(kHash(i), kHash(i + vec2(1.0, 0.0)), f.x), mix(kHash(i + vec2(0.0, 1.0)), kHash(i + vec2(1.0, 1.0)), f.x), f.y);
}
`;function W0(o,t){const e=Pa(o).toFixed(1),n=`
  vec3 kN = inverseTransformDirection(normal, viewMatrix);
  vec3 kAbs = abs(kN);
  float kDist = length(vViewPosition);
  vec3 kP = vKitWorld * ${(1/g0[o]).toFixed(5)};
`,a=t?`
  // low quality: top + one dominant side (two planes)
  float kWy = pow(kAbs.y, 4.0);
  float kWs = pow(max(kAbs.x, kAbs.z), 4.0);
  float kWt = kWy / (kWy + kWs + 1e-5);
  bool kSX = kAbs.x > kAbs.z;
  vec3 kUT = vec3(kP.xz + vec2(0.61, 0.29), ${e});
  vec3 kUS = vec3((kSX ? kP.zy + vec2(0.17, 0.43) : kP.xy + vec2(0.83, 0.07)), ${e});
  vec4 kAT = texture(uKitAlb, kUT);
  vec4 kAS = texture(uKitAlb, kUS);
  vec4 kNT = texture(uKitNrm, kUT);
  vec4 kNS = texture(uKitNrm, kUS);
  vec4 kA = mix(kAS, kAT, kWt);
  vec3 kt = kNT.xyz * 2.0 - 1.0;
  vec3 ks = kNS.xyz * 2.0 - 1.0;
  vec3 kTw = vec3(kt.xy + kN.xz, abs(kt.z) * kN.y).xzy;
  vec3 kSw = kSX ? vec3(ks.xy + kN.zy, abs(ks.z) * kN.x).zyx : vec3(ks.xy + kN.xy, abs(ks.z) * kN.z);
  vec3 kBn = normalize(kTw * kWt + kSw * (1.0 - kWt));
  float kRg = mix(kNS.a, kNT.a, kWt);
`:`
  vec3 kW = pow(kAbs, vec3(4.0));
  kW /= (kW.x + kW.y + kW.z + 1e-5);
  vec3 kUX = vec3(kP.zy + vec2(0.17, 0.43), ${e});
  vec3 kUY = vec3(kP.xz + vec2(0.61, 0.29), ${e});
  vec3 kUZ = vec3(kP.xy + vec2(0.83, 0.07), ${e});
  vec4 kA = texture(uKitAlb, kUX) * kW.x + texture(uKitAlb, kUY) * kW.y + texture(uKitAlb, kUZ) * kW.z;
  vec4 kNx = texture(uKitNrm, kUX);
  vec4 kNy = texture(uKitNrm, kUY);
  vec4 kNz = texture(uKitNrm, kUZ);
  vec3 tx = kNx.xyz * 2.0 - 1.0;
  vec3 ty = kNy.xyz * 2.0 - 1.0;
  vec3 tz = kNz.xyz * 2.0 - 1.0;
  tx = vec3(tx.xy + kN.zy, abs(tx.z) * kN.x);
  ty = vec3(ty.xy + kN.xz, abs(ty.z) * kN.y);
  tz = vec3(tz.xy + kN.xy, abs(tz.z) * kN.z);
  vec3 kBn = normalize(tx.zyx * kW.x + ty.xzy * kW.y + tz.xyz * kW.z);
  float kRg = kNx.a * kW.x + kNy.a * kW.y + kNz.a * kW.z;
`;return n+a}function B0(o,t){const e=L0[o];return`
{
${W0(o,t)}
  // edge curvature (1/m) = normal change rate / world position change rate, distance independent; fades out far away
  float kCurv = length(fwidth(kN)) / max(length(fwidth(vKitWorld)), 1e-5);
  float kEdge = smoothstep(7.0, 22.0, kCurv) * (1.0 - smoothstep(18.0, 60.0, kDist)) * uKitWear * ${De(e.wear)};

  // color: modulation around the material color; AO is applied after aomap_fragment
  diffuseColor.rgb *= kA.rgb * ${De(1/Da)};
  kAo = kA.a;
  roughnessFactor = clamp(roughnessFactor * kRg * ${De(1/Ca)}, 0.04, 1.0);

  // normal: relaxes to the geometric normal with distance
  float kNF = 1.0 - 0.7 * smoothstep(30.0, 100.0, kDist);
  normal = normalize((viewMatrix * vec4(normalize(mix(kN, kBn, kNF)), 0.0)).xyz);

  // wall-base grime: vertical faces within 0-1.2 m of the object's lowest point get darker and browner, broken up by noise
  float kWall = 1.0 - smoothstep(0.55, 0.88, kAbs.y);
  float kHu = vKitWorld.x * kAbs.z + vKitWorld.z * kAbs.x;
  float kBreak = kNoise(vec2(kHu * 2.3, vKitWorld.y * 1.1 + 3.0));
  float kG = (1.0 - smoothstep(0.0, 1.15 * (0.45 + 0.9 * kBreak), vKitH)) * kWall * uKitGrime * ${De(e.grime)};
  kG = clamp(kG, 0.0, 1.0);
  diffuseColor.rgb *= mix(vec3(1.0), vec3(0.48, 0.50, 0.49), kG * 0.8);
  roughnessFactor = mix(roughnessFactor, max(roughnessFactor, 0.9), kG * 0.6);
  kAo *= 1.0 - 0.25 * kG * (1.0 - smoothstep(0.0, 0.35, vKitH));
${t||e.streak<=0?"":`
  // vertical rain streaks
  float kS1 = kNoise(vec2(kHu * 8.0, vKitWorld.y * 0.5));
  float kS2 = kNoise(vec2(kHu * 1.4 + 7.0, vKitWorld.y * 0.12));
  float kStr = smoothstep(0.64, 0.9, kS1) * smoothstep(0.4, 0.75, kS2) * kWall * uKitGrime * ${De(e.streak)} * smoothstep(0.3, 1.6, vKitH);
  diffuseColor.rgb *= 1.0 - kStr * vec3(0.26, 0.24, 0.2);
`}
${!t&&["plaster","concrete","brick","masonry"].includes(o)?`
  // Fine weathering close to facades; neutral damp marks avoid an amber wash.
  float kCrackNoise=kNoise(vec2(kHu*1.7,vKitWorld.y*3.2));
  float kHairline=1.0-smoothstep(.004,.018,abs(kCrackNoise-.51));
  kHairline*=kWall*(1.0-smoothstep(6.0,24.0,kDist))*.1;
  diffuseColor.rgb*=1.0-kHairline;
  roughnessFactor=clamp(roughnessFactor+kHairline*.3,0.04,1.0);
`:""}
  // edge wear: brighter, less saturated exposed material
  float kLum = dot(diffuseColor.rgb, vec3(0.299, 0.587, 0.114));
  vec3 kChip = mix(diffuseColor.rgb, vec3(kLum), 0.35) * 1.28 + 0.012;
  diffuseColor.rgb = mix(diffuseColor.rgb, kChip, kEdge * 0.85);
  roughnessFactor = clamp(roughnessFactor + kEdge * ${De(e.edgeRough)}, 0.04, 1.0);
}
`}const V0=`
{
  // normalized by the texture's mean AO so flat areas keep their brightness and only cavities darken
  float kAoN = min(kAo * ${De(1/Ra)}, 1.06);
  reflectedLight.indirectDiffuse *= kAoN;
  reflectedLight.indirectSpecular *= mix(1.0, kAoN, 0.6);
  reflectedLight.directDiffuse *= mix(1.0, kAoN, 0.35);
}
`;function zt(o,t,e={}){const s=o.userData.kitUniforms;if(s){e.grime!==void 0&&(s.grime.value=e.grime),e.wear!==void 0&&(s.wear.value=e.wear);return}const n={grime:{value:e.grime??1},wear:{value:e.wear??1}};o.userData.kitUniforms=n,o.userData.kitKind=t;const a=o.onBeforeCompile,i=o.onBeforeRender,r=o.customProgramCacheKey();o.onBeforeCompile=(l,c)=>{a.call(o,l,c);const h=I0(),f=h.quality==="low";l.uniforms.uKitAlb={value:h.albedo},l.uniforms.uKitNrm={value:h.normal},l.uniforms.uKitGrime=n.grime,l.uniforms.uKitWear=n.wear,l.vertexShader=l.vertexShader.replace("#include <common>",`#include <common>
${U0}`).replace("#include <begin_vertex>",`#include <begin_vertex>
${O0}`),l.fragmentShader=l.fragmentShader.replace("#include <common>",`#include <common>
${G0}`).replace("#include <color_fragment>",`#include <color_fragment>
float kAo = 1.0;`).replace("#include <normal_fragment_maps>",`#include <normal_fragment_maps>
${B0(t,f)}`).replace("#include <aomap_fragment>",`#include <aomap_fragment>
${V0}`)},o.onBeforeRender=(l,c,h,f,p,m)=>{i.call(o,l,c,h,f,p,m),f.getAttribute(Ke)||jo(f)},o.customProgramCacheKey=()=>`kit-v2-${t}-${F0()}+${r}`,o.needsUpdate=!0}const wn={h:0,s:0,l:0};function H0(o,t){if(o.type!=="MeshStandardMaterial"||o.userData.shared||o.map||o.normalMap||o.bumpMap||o.roughnessMap||o.metalnessMap||o.aoMap||o.alphaMap||o.emissiveMap||o.displacementMap||o.lightMap||o.vertexColors||o.transparent||o.opacity<1||o.alphaTest>0||o.wireframe)return null;const e=o.emissive;if(o.emissiveIntensity*Math.max(e.r,e.g,e.b)>.04)return null;const s=t??o.userData.surfaceKind;if(s&&Gs.includes(s))return s;if(o.metalness>.5)return"metal";o.color.getHSL(wn,ts);const{h:n,s:a,l:i}=wn;if(i>.86||i<.1||a>.62)return null;if(a<.08)return i>=.62?"concrete":i>=.18?"masonry":null;if(!(n<.17||n>=.95))return n>=.17&&n<.46&&a>.1||n>=.46&&a>.15?null:i>=.62?"concrete":i>=.18?"masonry":null;if(o.roughness>=.95&&a>=.2||o.roughness>=.99&&a>=.08)return null;if(i>=.6)return"plaster";if(a>.5&&n>=.065&&n<.17)return null;if(a>=.28&&(n<.065||n>=.95)){if(i>=.42)return"tiles";if(n<.04||n>=.95)return"brick"}return a>=.1?i>=.14?"wood":null:i>=.18?"masonry":null}function j0(o,t=5.5){o.userData.isRoadSurface=!0,o.onBeforeCompile=e=>{e.uniforms.uRoadWet=Ji.wet,e.vertexShader=`varying vec3 vCobWorld;
`+e.vertexShader.replace("#include <begin_vertex>",`#include <begin_vertex>
       vCobWorld = (modelMatrix * vec4(transformed, 1.0)).xyz;`),e.fragmentShader=`
      uniform float uRoadWet;
      varying vec3 vCobWorld;
      float cHash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
      vec3 cVor(vec2 p) {
        vec2 i = floor(p), f = fract(p);
        float d1 = 8.0, d2 = 8.0, id = 0.0;
        for (int y = -1; y <= 1; y++) for (int x = -1; x <= 1; x++) {
          vec2 g = vec2(float(x), float(y));
          vec2 o = vec2(cHash(i + g), cHash(i + g + 19.3));
          vec2 r = g + o - f;
          float d = dot(r, r);
          if (d < d1) { d2 = d1; d1 = d; id = cHash(i + g + 7.7); }
          else if (d < d2) { d2 = d; }
        }
        return vec3(sqrt(d1), sqrt(d2), id);
      }
      float cDome(vec2 p) { vec3 v = cVor(p); return smoothstep(0.0, 0.3, v.y - v.x); }
    `+e.fragmentShader.replace("#include <color_fragment>",`#include <color_fragment>
         float cGap = 0.0;
         float cPuddle=0.0;
         {
           vec3 v = cVor(vCobWorld.xz * ${t.toFixed(2)});
           float edge = v.y - v.x;
           cGap = 1.0 - smoothstep(0.03, 0.16, edge);
           diffuseColor.rgb *= (0.78 + v.z * 0.42) * (1.0 - cGap * 0.5);
           float worn=smoothstep(.45,.9,v.z)*(1.0-cGap)*.1;
           diffuseColor.rgb=mix(diffuseColor.rgb,vec3(dot(diffuseColor.rgb,vec3(.2126,.7152,.0722))),worn);
           // Accumulate first in joints/low patches, not uniformly over every stone.
           cPuddle=smoothstep(.25,.85,uRoadWet)*(smoothstep(.6,.9,v.z*.5+cGap*.5));
           diffuseColor.rgb*=1.0-cPuddle*.28;
         }`).replace("#include <roughnessmap_fragment>",`#include <roughnessmap_fragment>
 roughnessFactor = mix(mix(roughnessFactor, 1.0, cGap), .08, cPuddle);`).replace("#include <normal_fragment_maps>",`#include <normal_fragment_maps>
         {
           float cFade = 1.0 - smoothstep(20.0, 70.0, length(vViewPosition));
           if (cFade > 0.01) {
             vec2 q = vCobWorld.xz * ${t.toFixed(2)};
             const float cE = 0.03;
             float h0 = cDome(q);
             vec2 gr = vec2(cDome(q + vec2(cE, 0.0)) - h0, cDome(q + vec2(0.0, cE)) - h0) / cE;
             vec3 gv = mat3(viewMatrix) * vec3(gr.x, 0.0, gr.y);
             gv -= normal * dot(gv, normal);
             normal = normalize(normal - gv * 0.09 * cFade * (1.0-cPuddle));
           }
         }`)},o.customProgramCacheKey=()=>`cobble-weather-${t}`,o.needsUpdate=!0}const Mn=new WeakSet,$0=`
varying vec3 vGrainWorld;
float gHash(vec3 p) {
  p = fract(p * 0.3183099 + vec3(0.1, 0.2, 0.3));
  p *= 17.0;
  return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
}
float gNoise(vec3 x) {
  vec3 i = floor(x);
  vec3 f = fract(x);
  f = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(mix(gHash(i), gHash(i + vec3(1, 0, 0)), f.x), mix(gHash(i + vec3(0, 1, 0)), gHash(i + vec3(1, 1, 0)), f.x), f.y),
    mix(mix(gHash(i + vec3(0, 0, 1)), gHash(i + vec3(1, 0, 1)), f.x), mix(gHash(i + vec3(0, 1, 1)), gHash(i + vec3(1, 1, 1)), f.x), f.y),
    f.z);
}
// 大尺度明暗斑驳（低频，远处也稳定）
float gGrain(vec3 p) {
  return gNoise(p * 1.7) * 0.6 + gNoise(p * 6.5) * 0.4;
}
// 表面起伏高度（取解析梯度，避免 dFdx 产生 2x2 像素马赛克）
float gBump(vec3 p) {
  return gNoise(p * 5.0) * 0.6 + gNoise(p * 17.0) * 0.4;
}
`;function X0(o,t){for(let e=o;e;e=e.parent){if(e.name==="scene-person"||e.userData.noSurface)return!0;if(e===t)break}return!1}function Cc(o,t=1){o.traverse(e=>{const s=e;if(!s.isMesh)return;const n=X0(s,o),a=Array.isArray(s.material)?s.material:[s.material];for(const i of a){if(i.type!=="MeshStandardMaterial")continue;const r=i;if(Ea(r)){jo(s.geometry);continue}if(Mn.has(i)||r.map||r.normalMap||r.bumpMap||r.vertexColors||r.transparent||r.emissiveIntensity>.25&&r.emissive.getHex()!==0)continue;const l=n?null:H0(r,s.userData.surfaceKind??void 0);if(l){zt(r,l,{grime:t,wear:t}),jo(s.geometry);continue}Mn.add(i);const c=r.onBeforeCompile;r.onBeforeCompile=(f,p)=>{c==null||c.call(r,f,p),f.vertexShader=`varying vec3 vGrainWorld;
`+f.vertexShader.replace("#include <begin_vertex>",`#include <begin_vertex>
           vec4 gLocal = vec4(transformed, 1.0);
           #ifdef USE_INSTANCING
             gLocal = instanceMatrix * gLocal;
           #endif
           vGrainWorld = (modelMatrix * gLocal).xyz;`),f.fragmentShader=$0+f.fragmentShader.replace("#include <color_fragment>",`#include <color_fragment>
             float gTone = gGrain(vGrainWorld);
             diffuseColor.rgb *= 1.0 + (gTone - 0.5) * ${(.1*t).toFixed(2)};`).replace("#include <roughnessmap_fragment>",`#include <roughnessmap_fragment>
             roughnessFactor = clamp(roughnessFactor + (gTone - 0.5) * 0.22, 0.05, 1.0);`).replace("#include <normal_fragment_maps>",`#include <normal_fragment_maps>
             {
               // 像素覆盖面积越大（越远）凹凸越弱，避免远处闪烁
               float gFade = 1.0 - smoothstep(0.02, 0.12, length(fwidth(vGrainWorld)));
               const float gE = 0.012;
               vec3 gW = vGrainWorld;
               float gB0 = gBump(gW);
               vec3 gGradW = vec3(
                 gBump(gW + vec3(gE, 0.0, 0.0)) - gB0,
                 gBump(gW + vec3(0.0, gE, 0.0)) - gB0,
                 gBump(gW + vec3(0.0, 0.0, gE)) - gB0) / gE;
               vec3 gGradV = mat3(viewMatrix) * gGradW;
               gGradV -= normal * dot(gGradV, normal);
               normal = normalize(normal - gGradV * ${(.05*t).toFixed(3)} * gFade);
             }`)};const h=r.customProgramCacheKey();r.customProgramCacheKey=()=>`grain+${h}`,r.needsUpdate=!0}})}function Y0(o,t){return new Ie({color:o,emissive:o,emissiveIntensity:t,metalness:.15,roughness:.08,clearcoat:1,clearcoatRoughness:.05,reflectivity:1,transparent:!0,opacity:.92,side:mt})}function Ec(o,t=.82){return new at({color:o,roughness:t,metalness:.06,envMapIntensity:.4})}function zc(o){const e=document.createElement("canvas");e.width=64,e.height=64;const s=e.getContext("2d"),n=s.createRadialGradient(64/2,64/2,0,64/2,64/2,64/2);return n.addColorStop(0,o),n.addColorStop(.4,"rgba(255,220,140,0.35)"),n.addColorStop(1,"rgba(0,0,0,0)"),s.fillStyle=n,s.fillRect(0,0,64,64),new pa(e)}function Nc(){return new at({color:4871528,roughness:.45,metalness:.85})}function Fc(o){return new Ie({color:o,emissive:o,emissiveIntensity:1.4,roughness:.04,metalness:0,transparent:!0,opacity:.82,clearcoat:1})}const ne={broadleaf:0,broadleafDark:1,conifer:2,shrub:3};function K0(o){const t=o%2,e=Math.floor(o/2);return[t*.5,e*.5,t*.5+.5,e*.5+.5]}function za(o){let t=o>>>0;return()=>{t=t+1831565813>>>0;let e=t;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}}function be(o,t,e){let s=Math.imul(o,374761393)+Math.imul(t,668265263)+Math.imul(e,1442695041)|0;return s=Math.imul(s^s>>>13,1274126177),s^=s>>>16,(s>>>0)/4294967296}function $o(o){return o*o*(3-2*o)}function jt(o,t,e){const s=Math.min(1,Math.max(0,(e-o)/(t-o)));return s*s*(3-2*s)}function yn(o,t,e){const s=Math.floor(o),n=Math.floor(t),a=$o(o-s),i=$o(t-n),r=be(s,n,e),l=be(s+1,n,e),c=be(s,n+1,e),h=be(s+1,n+1,e);return r+(l-r)*a+(c-r)*i+(r-l-c+h)*a*i}function bo(o,t){return(o%t+t)%t}const bn=new Map;function Et(o,t,e,s,n){const a=(e*1024+s)*8192+(n&8191);let i=bn.get(a);if(!i){i=new Float32Array(e*s);for(let g=0;g<s;g++)for(let x=0;x<e;x++)i[g*e+x]=be(x,g,n);bn.set(a,i)}const r=Math.floor(o),l=Math.floor(t),c=$o(o-r),h=$o(t-l),f=bo(r,e),p=f+1===e?0:f+1,m=bo(l,s)*e,u=(m+e)%(e*s),v=i[m+f],w=i[m+p],M=i[u+f],d=i[u+p];return v+(w-v)*c+(M-v)*h+(v-w-M+d)*c*h}let we=0,Me=0,ye=0;function Na(o,t,e){o=o-Math.floor(o);const s=Math.floor(o*6),n=o*6-s,a=e*(1-t),i=e*(1-n*t),r=e*(1-(1-n)*t);switch(s%6){case 0:we=e,Me=r,ye=a;break;case 1:we=i,Me=e,ye=a;break;case 2:we=a,Me=e,ye=r;break;case 3:we=a,Me=i,ye=e;break;case 4:we=r,Me=a,ye=e;break;default:we=e,Me=a,ye=i;break}}function Z0(o){const t=o*o;return{size:o,r:new Float32Array(t),g:new Float32Array(t),b:new Float32Array(t),a:new Float32Array(t),h:new Float32Array(t).fill(.5)}}function Fa(o,t,e,s,n,a,i){const r=o.a[t];if(r<=0){o.r[t]=e,o.g[t]=s,o.b[t]=n,o.a[t]=a,o.h[t]=i;return}const l=a+r*(1-a),c=a/l,h=1-c;o.r[t]=o.r[t]*h+e*c,o.g[t]=o.g[t]*h+s*c,o.b[t]=o.b[t]*h+n*c,o.a[t]=l,o.h[t]=o.h[t]*h+i*c}function Xo(o,t,e,s,n,a,i,r,l,c,h,f,p,m){const{B:u,ox:v,oy:w,S:M,m:d}=o,g=Math.max(a,i)+1,x=Math.max(d,Math.floor(Math.min(t,s)-g)),y=Math.min(M-d-1,Math.ceil(Math.max(t,s)+g)),S=Math.max(d,Math.floor(Math.min(e,n)-g)),k=Math.min(M-d-1,Math.ceil(Math.max(e,n)+g)),b=s-t,T=n-e,A=b*b+T*T||1e-6;for(let _=S;_<=k;_++){const P=(w+_)*u.size+v;for(let D=x;D<=y;D++){const R=D+.5-t,z=_+.5-e;let N=(R*b+z*T)/A;N=N<0?0:N>1?1:N;const I=R-b*N,B=z-T*N,U=a+(i-a)*N,V=I*I+B*B,G=U+1;if(V>G*G)continue;const X=Math.sqrt(V)-U,H=X<=-.5?1:X>=.5?0:.5-X;if(H<=.003)continue;const tt=1-Math.min(1,Math.abs(X+U*.5)/(U+.5))*.35;Na(r+(h-r)*N,l+(f-l)*N,(c+(p-c)*N)*tt*(.92+.16*m)),Fa(u,P+D,we,Me,ye,H,.62-Math.min(1,Math.abs(X)/(U+.5))*.2)}}}function q0(o,t){const{B:e,ox:s,oy:n,S:a,m:i}=o,r=Math.cos(t.ang),l=Math.sin(t.ang),c=t.x,h=t.y,f=c+r*t.len,p=h+l*t.len,m=t.wid+2,u=Math.max(i,Math.floor(Math.min(c,f)-m)),v=Math.min(a-i-1,Math.ceil(Math.max(c,f)+m)),w=Math.max(i,Math.floor(Math.min(h,p)-m)),M=Math.min(a-i-1,Math.ceil(Math.max(h,p)+m)),d=Math.max(5,Math.round(t.len/11)),g=1/t.len,x=.5+t.len*.0035;for(let y=w;y<=M;y++){const S=(n+y)*e.size+s;for(let k=u;k<=v;k++){const b=k+.5-c,T=y+.5-h,A=b*r+T*l;if(A<0||A>t.len)continue;const _=A*g,P=-b*l+T*r,D=P<0?-P:P;let R=t.wid*Math.pow(Math.max(0,Math.sin(Math.PI*Math.pow(_,t.shapeExp))),.78);if(R*=1+t.serr*(Math.abs(Math.sin(_*d*Math.PI))-.5),R<.4)continue;const z=R-D+.5;if(z<=.003)continue;const N=z>=1?1:z,I=D/R,B=yn(k*.045,y*.045,t.seed),U=yn(k*.19,y*.19,t.seed+5);let V=t.val*(.8+.3*_)*(.86+.26*B)*(.94+.1*U);V*=1-.24*jt(.76,1,I),V*=1+.12*t.fold*(P/R);let G=t.sat*(1-.18*_);const X=t.hue-.028*_+.03*(B-.5),H=jt(x+.9,x*.4,D)*(1-.5*_),tt=(A-D*.82)/t.veinGap,dt=tt-Math.floor(tt),pt=(dt<.5?dt:1-dt)*t.veinGap*.8,q=jt(1.3,.25,pt)*Math.pow(Math.max(0,1-I),.7)*jt(.06,.2,_)*jt(1,.8,_);let ot=Math.max(H,q*.85);t.back&&(V*=1.16,G*=.62,ot*=1.35),V*=1+.3*ot,G*=1-.38*ot,Na(X,G,Math.min(1,V));const lt=.55+.2*(1-I*I)*(t.back?.6:1)-ot*(t.back?-.1:.16);Fa(e,S+k,we,Me,ye,N,lt)}}}function Ia(o,t,e,s,n,a,i){const r=t+Math.max(2,o*.012),l=o-2*r,c=Math.max(1e-6,n-e),h=Math.max(1e-6,a-s),f=Math.min(l/c,l/h,i);return{scale:f,ox:o/2-(e+n)/2*f,oy:o/2-(s+a)/2*f}}function ws(o,t){const e=za(o.seed),s=o.S,n=[],a=[],i=t.dark?.285+e()*.03:.235+e()*.04,r=(w,M,d,g,x)=>{const y=i+(e()-.5)*(t.dark?.04:.09)+(e()>.88&&!t.dark?-.04:0),S=(t.dark?.5:.42)+e()*.12,k=(t.dark?.27:t.round?.5:.46)+e()*.14;n.push({leaf:{x:w.x,y:w.y,ang:M,len:d,wid:d*g,hue:y,sat:S,val:k,serr:t.round?.04:.08,shapeExp:t.round?.8+e()*.2:.62+e()*.25,back:e()>.74,fold:e()*2-1,veinGap:Math.max(6,d*(t.round?.2:.16)),seed:Math.floor(e()*99999),petiole:x}})};if(t.round){const w=5+Math.floor(e()*2);for(let M=0;M<w;M++){const d=Math.PI/2+(M-(w-1)/2)*.5+(e()-.5)*.15,g=.55+e()*.25,x=(e()-.5)*.5,y=[],S=_=>d+x*_;let k=0,b=0;for(let _=0;_<=8;_++){y.push({x:k,y:b});const P=S(_/8);k+=Math.cos(P)*(g/8),b+=Math.sin(P)*(g/8)}a.push({pts:y,r0:.01});const T=3+Math.floor(e()*3);for(let _=0;_<T;_++){const P=.3+.7*(_/T)+e()*.05,D=Math.min(8,Math.floor(P*8)),R=y[D],z=_%2===0?1:-1;r(R,S(P)+z*(.7+e()*.5),(.2+e()*.12)*(1.1-.3*P),.55+e()*.12,.012)}const A=y[8];r(A,S(1)+(e()-.5)*.4,.26+e()*.08,.6,0)}}else{const w=8+Math.floor(e()*7),M=(e()-.5)*.35,d=[];for(let y=0;y<=12;y++){const S=y/12;d.push({x:M*S*S,y:S})}a.push({pts:d,r0:.014});const g=y=>({p:{x:M*y*y,y},dir:Math.atan2(1,2*M*y)});for(let y=0;y<w;y++){const S=.2+.72*(y/Math.max(1,w-1))+(e()-.5)*.03,{p:k,dir:b}=g(S),T=y%2===0?1:-1,A=.75+e()*.5+(1-S)*.25,_=(.4-.1*S)*(.8+e()*.34);r(k,b+T*A,_,.3+e()*.12,.03)}const x=g(1);r(x.p,x.dir+(e()-.5)*.2,.42*(.9+e()*.2),.34,0)}let l=1/0,c=1/0,h=-1/0,f=-1/0;const p=(w,M)=>{w<l&&(l=w),w>h&&(h=w),M<c&&(c=M),M>f&&(f=M)};for(const{leaf:w}of n){const M=Math.cos(w.ang),d=Math.sin(w.ang);p(w.x,w.y),p(w.x+M*w.len,w.y+d*w.len);for(const g of[.3,.45])for(const x of[-1,1])p(w.x+M*w.len*g-d*w.wid*x,w.y+d*w.len*g+M*w.wid*x)}for(const w of a)for(const M of w.pts)p(M.x,M.y);p(0,-.04);const m=Ia(s,o.m,l,c,h,f,s*.97),u=w=>({x:w.x*m.scale+m.ox,y:w.y*m.scale+m.oy});for(const w of a)for(let M=0;M<w.pts.length-1;M++){const d=u(w.pts[M]),g=u(w.pts[M+1]),x=M/(w.pts.length-1),y=Math.max(1.1,w.r0*m.scale*(1-x*.55)),S=Math.max(.8,w.r0*m.scale*(1-(x+1/(w.pts.length-1))*.55));Xo(o,d.x,d.y,g.x,g.y,y,S,.085,.45,.28,.1,.4,.36,e())}const v=n.map((w,M)=>M).sort(()=>e()-.5);for(const w of v){const M=n[w].leaf,d=u({x:M.x,y:M.y}),g=M.len*m.scale,x={...M,x:d.x,y:d.y,len:g,wid:M.wid*m.scale};if(M.petiole>0){const y=M.petiole*m.scale;Xo(o,d.x,d.y,d.x+Math.cos(M.ang)*y,d.y+Math.sin(M.ang)*y,1.1,.8,.11,.42,.3,.14,.4,.4,e()),x.x+=Math.cos(M.ang)*y*.9,x.y+=Math.sin(M.ang)*y*.9}q0(o,x)}}function Q0(o,t,e,s,n,a,i,r,l,c){const h=t+Math.cos(s)*n,f=e+Math.sin(s)*n;Xo(o,t,e,h,f,a,a*.45,i,r,l*.72,i-.02,r*.9,l*1.12,c)}function J0(o,t){const e=za(t),s=o.S,n=(e()-.5)*.08,a=d=>({x:n*d*d,y:d}),i=[],r=[];r.push({a:a(0),b:a(1),r0:.0105,r1:.003});const l=15,c=(d,g,x)=>{const y=d.length-1;for(let S=0;S<y;S++)for(const k of[0,.34,.67]){const b=d[S],T=d[S+1],A=(S+k)/y,_=b.x+(T.x-b.x)*k,P=b.y+(T.y-b.y)*k,D=g[S];for(const R of[-1,1]){const z=A>x,N=D+R*(.62+e()*.3),I=.1*(1-.4*A)*(.82+e()*.36)*(z?.8:1);i.push({x:_,y:P,ang:N,len:I,hue:z?.22+e()*.04:.37+e()*.04,sat:z?.5:.46+e()*.12,val:z?.58+e()*.08:.36+e()*.12,r:e()})}}};for(let d=0;d<l;d++){const g=.08+.84*(d/(l-1)),x=a(g);for(const y of[-1,1]){const S=.5*Math.pow(1-g*.8,.85)*(.88+e()*.24),k=Math.PI/2-y*(1.08-g*.2+(e()-.5)*.12),b=[x],T=[];let A=x.x,_=x.y;const P=6;for(let D=0;D<P;D++){const R=k+y*(D/P)*.55;T.push(R),A+=Math.cos(R)*(S/P),_+=Math.sin(R)*(S/P),b.push({x:A,y:_})}for(let D=0;D<P;D++)r.push({a:b[D],b:b[D+1],r0:.0055*(1-D/P*.5),r1:.0055*(1-(D+1)/P*.5)});c(b,T,.78);for(let D=0;D<4;D++)i.push({x:A,y:_,ang:T[P-1]+(D-1.5)*.28,len:.06*(.85+e()*.3),hue:.23+e()*.04,sat:.5,val:.58,r:e()})}}{const d=[],g=[];for(let y=0;y<=14;y++)d.push(a(.15+y/14*.85));for(let y=0;y<14;y++)g.push(Math.atan2(d[y+1].y-d[y].y,d[y+1].x-d[y].x));c(d,g,.7);const x=a(1);for(let y=0;y<6;y++)i.push({x:x.x,y:x.y,ang:Math.PI/2+(y-2.5)*.34,len:.07,hue:.23,sat:.5,val:.6,r:e()})}let h=1/0,f=1/0,p=-1/0,m=-1/0;const u=(d,g)=>{d<h&&(h=d),d>p&&(p=d),g<f&&(f=g),g>m&&(m=g)};for(const d of i)u(d.x,d.y),u(d.x+Math.cos(d.ang)*d.len,d.y+Math.sin(d.ang)*d.len);for(const d of r)u(d.a.x,d.a.y),u(d.b.x,d.b.y);u(0,-.03);const v=Ia(s,o.m,h,f,p,m,s*.97),w=d=>({x:d.x*v.scale+v.ox,y:d.y*v.scale+v.oy}),M=Math.max(.9,s*.0034);for(const d of r){const g=w(d.a),x=w(d.b);Xo(o,g.x,g.y,x.x,x.y,Math.max(.9,d.r0*v.scale),Math.max(.8,d.r1*v.scale),.07,.5,.27,.075,.45,.32,e())}i.sort(()=>e()-.5);for(const d of i){const g=w(d);Q0(o,g.x,g.y,d.ang,d.len*v.scale,M,d.hue,d.sat,d.val,d.r)}}function La(o,t,e,s,n){const a=new Uint8Array(e*e*4),i=new Int32Array(e),r=new Int32Array(e);for(let l=0;l<e;l++)i[l]=n?(l+e-1)%e:Math.max(0,l-1),r[l]=n?(l+1)%e:Math.min(e-1,l+1);for(let l=0;l<e;l++){const c=(n?(l+e-1)%e:Math.max(0,l-1))*e,h=l*e,f=(n?(l+1)%e:Math.min(e-1,l+1))*e;for(let p=0;p<e;p++){const m=h+p,u=m*4;if(t&&t[m]<.02){a[u]=128,a[u+1]=128,a[u+2]=255,a[u+3]=255;continue}const v=i[p],w=r[p],M=(o[c+w]+2*o[h+w]+o[f+w]-o[c+v]-2*o[h+v]-o[f+v])/8,d=(o[f+v]+2*o[f+p]+o[f+w]-o[c+v]-2*o[c+p]-o[c+w])/8,g=-M*s,x=-d*s,y=1/Math.sqrt(g*g+x*x+1);a[u]=(g*y*.5+.5)*255+.5|0,a[u+1]=(x*y*.5+.5)*255+.5|0,a[u+2]=(y*.5+.5)*255+.5|0,a[u+3]=255}}return a}function se(o){const t=Math.round(o*255);return t<0?0:t>255?255:t}function tr(o,t){const e=Z0(o),s=Math.floor(o/2),n=Math.max(3,Math.round(s*.03)),a=[{id:ne.broadleaf,paint:c=>ws(c,{dark:!1,round:!1})},{id:ne.broadleafDark,paint:c=>ws(c,{dark:!0,round:!1})},{id:ne.conifer,paint:c=>J0(c,t*31+3)},{id:ne.shrub,paint:c=>ws(c,{dark:!1,round:!0})}],i=new Float32Array(a.length*3);for(const{id:c,paint:h}of a){const f=c%2*s,p=Math.floor(c/2)*s;h({B:e,ox:f,oy:p,S:s,m:n,seed:t});let m=0,u=0,v=0,w=0;for(let M=0;M<s;M++){const d=M>=n&&M<s-n;for(let g=0;g<s;g++){const x=(p+M)*o+f+g;!d||g<n||g>=s-n?(e.a[x]=0,e.h[x]=.5):e.a[x]>.5&&(m+=e.r[x],u+=e.g[x],v+=e.b[x],w++)}}w>0&&(i[c*3]=m/w,i[c*3+1]=u/w,i[c*3+2]=v/w)}const r=new Uint8Array(o*o*4);for(let c=0;c<o;c++)for(let h=0;h<o;h++){const f=c*o+h,p=f*4,m=Math.min(1,Math.floor(h/s))+Math.min(1,Math.floor(c/s))*2,u=e.a[f];u<.004?(r[p]=se(i[m*3]),r[p+1]=se(i[m*3+1]),r[p+2]=se(i[m*3+2]),r[p+3]=0):(r[p]=se(e.r[f]),r[p+1]=se(e.g[f]),r[p+2]=se(e.b[f]),r[p+3]=se(u))}const l=La(e.h,e.a,o,7*(o/1024),!1);return{albedo:{size:o,data:r},normal:{size:o,data:l}}}function Ms(o,t,e){const s=new Float32Array(o*t),n=new Float32Array(o*t),a=new Float32Array(o*t);for(let i=0;i<t;i++)for(let r=0;r<o;r++){const l=i*o+r;s[l]=.15+be(r,i,e)*.7,n[l]=.15+be(r,i,e+17)*.7,a[l]=be(r,i,e+31)}return{gx:o,gy:t,fx:s,fy:n,id:a}}function Sn(o,t,e,s){const{gx:n,gy:a}=e,i=o*n,r=t*a,l=Math.floor(i),c=Math.floor(r);let h=9,f=9,p=0;for(let m=-1;m<=1;m++){const u=c+m,v=bo(u,a);for(let w=-1;w<=1;w++){const M=l+w,d=v*n+bo(M,n),g=i-(M+e.fx[d]),x=r-(u+e.fy[d]),y=g*g+x*x;y<h?(f=h,h=y,p=e.id[d]):y<f&&(f=y)}}s[0]=Math.sqrt(h),s[1]=Math.sqrt(f),s[2]=p}function er(o,t,e){const{gx:s}=t,n=o*s,a=Math.floor(n);let i=9,r=9,l=0;for(let c=-1;c<=1;c++){const h=a+c,f=bo(h,s),p=Math.abs(n-(h+t.fx[f]));p<i?(r=i,i=p,l=t.id[f]):p<r&&(r=p)}e[0]=i,e[1]=r,e[2]=l}function or(o,t,e){const s=o,n=new Uint8Array(s*s*4),a=new Float32Array(s*s),i=[0,0,0],r=t*7+(e==="conifer"?101:3),l=e==="broadleaf"?Ms(10,1,r+9):Ms(11,3,r+9),c=Ms(22,8,r+12);for(let f=0;f<s;f++){const p=(f+.5)/s;for(let m=0;m<s;m++){const u=(m+.5)/s,v=f*s+m;let w,M,d,g;const x=Et(u*4,p*4,4,4,r+1);if(e==="broadleaf"){const S=Et(u*2,p*5,2,5,r+3)-.5,k=Et(u*5,p*11,5,11,r+4)-.5,b=u+.028*S+.01*k;er(b,l,i);const T=i[1]-i[0],A=jt(.3,.6,Et(u*10,p*4,10,4,r+5)),_=1-jt(0,.13,T);Sn(b+.31,p+.07*S,c,i);const P=i[1]-i[0],D=(1-jt(0,.09,P))*.5*jt(.3,.7,Et(u*6,p*9,6,9,r+6)),R=Math.min(1,Math.max(_*(.4+.6*A),D)),z=Et(u*120,p*8,120,8,r+7),N=Et(u*70,p*40,70,40,r+11),I=.9+.2*Et(u*10,p*3,10,3,r+8);g=(1-R*.9)*(.85+.15*z)+.05*N;const B=I*(.82+.4*x)*(.86+.28*z)*(.94+.1*N)*(1-.82*R);w=.4*B,M=.35*B,d=.3*B;const U=jt(.64,.78,Et(u*7,p*7,7,7,r+12))*(1-R)*.2;w+=(.5*B-w)*U,M+=(.54*B-M)*U,d+=(.4*B-d)*U}else{const S=.03*(Et(u*5,p*3,5,3,r+3)-.5)+.012*(Et(u*14,p*8,14,8,r+4)-.5),k=.06*(Et(u*4,p*5,4,5,r+5)-.5);Sn(u+S,p+k,l,i);const b=i[1]-i[0],T=.6+.8*Et(u*7,p*6,7,6,r+6),A=jt(0,.16*T,b),_=1-Math.min(1,i[0]*1.1),P=Et(u*60,p*5,60,5,r+10),D=Et(u*90,p*30,90,30,r+11);g=A*(.5+.35*_)*(.88+.16*P)+.05*D;const z=(.75+.5*i[2])*(.85+.3*x)*(.8+.4*P)*(.9+.2*D)*(.3+.7*A)*(.88+.2*_);w=.37*z,M=.28*z,d=.22*z;const N=jt(.5,.85,i[2])*.4;w+=(.4*z-w)*N,M+=(.34*z-M)*N,d+=(.3*z-d)*N}const y=v*4;n[y]=se(w),n[y+1]=se(M),n[y+2]=se(d),n[y+3]=255,a[v]=g}}const h=La(a,null,s,(e==="broadleaf"?5:6)*(s/512),!0);return{albedo:{size:s,data:n},normal:{size:s,data:h}}}const Ic=5,it={rockA:.16,rockB:.42,hiA:14,hiB:38,dryA:.58,dryB:.78,dryGain:.5,hiGain:.22,dirtA:.54,dirtB:.74,dirtGain:.9,gravelA:.62,gravelB:.76,hBias:.2};function mo(o,t,e){const s=Math.min(1,Math.max(0,(e-o)/(t-o)));return s*s*(3-2*s)}function Lc(o){const t=mo(it.rockA,it.rockB,1-o.normalY),e=mo(it.hiA,it.hiB,o.height),s=Math.min(1,mo(it.dryA,it.dryB,o.nDry)*it.dryGain+e*it.hiGain),n=mo(it.dirtA,it.dirtB,o.nDirt)*it.dirtGain,a=mo(it.gravelA,it.gravelB,o.nGravel),i=1-t,r=i*n,l=i*(1-n),c=l*a,h=l*(1-a),f=h*s,p=h*(1-s),m=o.layerHeights??[.5,.5,.5,.5,.5],u=[p,f,r,c,t];let v=0;const w=u.map((d,g)=>{const x=d*(m[g]+it.hBias),y=x*x;return v+=y,y}),M=1/Math.max(v,1e-6);return[w[0]*M,w[1]*M,w[2]*M,w[3]*M,w[4]*M]}function Lt(o){const t=String(o);return/[.e]/.test(t)?t:`${t}.0`}function Uc(){return`
void layerWeights(float normalY, float height, float nDry, float nDirt, float nGravel, float lh[5], out float w[5]) {
  float rock = smoothstep(${Lt(it.rockA)}, ${Lt(it.rockB)}, 1.0 - normalY);
  float hi = smoothstep(${Lt(it.hiA)}, ${Lt(it.hiB)}, height);
  float dry = min(1.0, smoothstep(${Lt(it.dryA)}, ${Lt(it.dryB)}, nDry) * ${Lt(it.dryGain)} + hi * ${Lt(it.hiGain)});
  float dirt = smoothstep(${Lt(it.dirtA)}, ${Lt(it.dirtB)}, nDirt) * ${Lt(it.dirtGain)};
  float gravel = smoothstep(${Lt(it.gravelA)}, ${Lt(it.gravelB)}, nGravel);
  float flat_ = 1.0 - rock;
  float r1 = flat_ * (1.0 - dirt);
  float r2 = r1 * (1.0 - gravel);
  w[0] = r2 * (1.0 - dry);
  w[1] = r2 * dry;
  w[2] = flat_ * dirt;
  w[3] = r1 * gravel;
  w[4] = rock;
  float sum = 0.0;
  for (int k = 0; k < 5; k++) {
    float v = w[k] * (lh[k] + ${Lt(it.hBias)});
    w[k] = v * v;
    sum += w[k];
  }
  float inv = 1.0 / max(sum, 1e-6);
  for (int k = 0; k < 5; k++) w[k] *= inv;
}
`}function Co(o,t){const e=Math.sin(o*127.1+t*311.7)*43758.5453123;return e-Math.floor(e)}function sr(o,t){const e=Math.floor(o),s=Math.floor(t),n=o-e,a=t-s,i=n*n*(3-2*n),r=a*a*(3-2*a);return Co(e,s)*(1-i)*(1-r)+Co(e+1,s)*i*(1-r)+Co(e,s+1)*(1-i)*r+Co(e+1,s+1)*i*r}function Eo(o,t,e){let s=.5,n=1,a=0,i=0;for(let r=0;r<e;r++)a+=s*sr(o*n,t*n),i+=s,s*=.5,n*=2;return a/i}function Oc(o,t){return{nDry:Eo(o*.012+13,t*.012+71,3),nDirt:Eo(o*.009+31,t*.009+17,4)*.68+Eo(o*.045,t*.045,3)*.32,nGravel:Eo(o*.028+150,t*.028+20,4)}}function Gc(){return`
float tlHash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123); }
float tlNoise(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  return mix(mix(tlHash(i), tlHash(i + vec2(1.0, 0.0)), f.x), mix(tlHash(i + vec2(0.0, 1.0)), tlHash(i + vec2(1.0, 1.0)), f.x), f.y);
}
float tlFbm(vec2 p, int oct) {
  float a = 0.5, f = 1.0, s = 0.0, n = 0.0;
  for (int i = 0; i < 4; i++) {
    if (i >= oct) break;
    s += a * tlNoise(p * f); n += a; a *= 0.5; f *= 2.0;
  }
  return s / n;
}
vec3 terrainNoises(vec2 p) {
#ifdef TL_LOW
  float nDry = tlFbm(p * 0.012 + vec2(13.0, 71.0), 2);
  float nDirt = tlFbm(p * 0.009 + vec2(31.0, 17.0), 3) * 0.68 + tlFbm(p * 0.045, 2) * 0.32;
  float nGravel = tlFbm(p * 0.028 + vec2(150.0, 20.0), 3);
#else
  float nDry = tlFbm(p * 0.012 + vec2(13.0, 71.0), 3);
  float nDirt = tlFbm(p * 0.009 + vec2(31.0, 17.0), 4) * 0.68 + tlFbm(p * 0.045, 3) * 0.32;
  float nGravel = tlFbm(p * 0.028 + vec2(150.0, 20.0), 4);
#endif
  return vec3(nDry, nDirt, nGravel);
}
`}const Bt=o=>[(o>>16&255)/255,(o>>8&255)/255,(o&255)/255],po=o=>{const t=e=>Math.round(Math.min(1,Math.max(0,e))*255);return t(o[0])<<16|t(o[1])<<8|t(o[2])},Ve=(o,t,e)=>[o[0]+(t[0]-o[0])*e,o[1]+(t[1]-o[1])*e,o[2]+(t[2]-o[2])*e],We=o=>o[0]*.299+o[1]*.587+o[2]*.114;function Wc(o){const t=Bt(o.grass),e=Bt(o.dirt),s=Bt(o.rock),n=Ve(t,[We(t),We(t),We(t)],.1),i=Ve(n,[.66,.6,.33],.62),r=Ve(e,[We(e),We(e),We(e)],.08),l=Ve(Ve(s,e,.38),[1,1,1],.1),c=s;return{grass:po(n),dryGrass:po(i),dirt:po(r),gravel:po(l),rock:po(c)}}function nr(o){let t=o>>>0;return()=>{t=t+1831565813>>>0;let e=t;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}}function ar(o){const t=o*o;return{S:o,mask:o-1,R:new Float32Array(t),G:new Float32Array(t),B:new Float32Array(t),H:new Float32Array(t)}}function de(o,t,e,s,n,a=.5){const i=new Float32Array(o*o);let r=1,l=0;const c=new Int32Array(o),h=new Int32Array(o),f=new Float32Array(o);for(let m=0;m<n;m++){const u=e<<m,v=s<<m;if(u>o/2||v>o/2)break;const w=new Float32Array(u*v);for(let M=0;M<w.length;M++)w[M]=t();for(let M=0;M<o;M++){const d=M*u/o,g=Math.floor(d),x=d-g;c[M]=g%u,h[M]=(g+1)%u,f[M]=x*x*(3-2*x)}for(let M=0;M<o;M++){const d=M*v/o,g=Math.floor(d),x=d-g,y=x*x*(3-2*x),S=g%v*u,k=(g+1)%v*u,b=M*o;for(let T=0;T<o;T++){const A=w[S+c[T]],_=w[S+h[T]],P=w[k+c[T]],D=w[k+h[T]],R=f[T],z=A+(_-A)*R;i[b+T]=i[b+T]+r*(z+(P+(D-P)*R-z)*y)}}l+=r,r*=a}const p=1/l;for(let m=0;m<i.length;m++)i[m]*=p;return i}function Yo(o,t){for(let e=0;e<o.length;e++){const s=(o[e]-.5)*t+.5;o[e]=s<0?0:s>1?1:s}}function kn(o,t,e,s,n,a,i,r){const l=(e&o.mask)*o.S+(t&o.mask);o.R[l]+=(s-o.R[l])*i,o.G[l]+=(n-o.G[l])*i,o.B[l]+=(a-o.B[l])*i,r>o.H[l]&&(o.H[l]=r)}function ys(o,t,e){const s=o.S;for(let n=0;n<e.count;n++){let a=t()*s,i=t()*s,r=t()*Math.PI*2;const l=e.lenMin+t()*(e.lenMax-e.lenMin),c=e.wMin+t()*(e.wMax-e.wMin),h=(t()-.5)*e.curve,f=e.bright[0]+t()*(e.bright[1]-e.bright[0]),p=e.alt&&t()<e.alt.p?e.alt.color:e.base,m=(t()-.5)*e.hueJitter,u=Math.max(3,Math.round(l/.8)),v=.8+t()*.2;for(let w=0;w<u;w++){const M=w/(u-1),d=Math.cos(r),g=Math.sin(r),x=Math.max(.9,c*(1-M*.8)),y=e.baseDark+(e.tipLight-e.baseDark)*M,S=p[0]*f*y*(1+m+e.tipYellow*M),k=p[1]*f*y*(1+e.tipYellow*M*.3),b=p[2]*f*y*(1-m-e.tipYellow*M*1.2),T=(.38+.62*Math.pow(M,.55))*v,A=x*.5,_=Math.round(a),P=Math.round(i);if(x<1.5)kn(o,_,P,S,k,b,.9,T);else for(let D=-A;D<=A+.01;D+=1){const R=Math.abs(D)>A-.5?.65:.95;kn(o,Math.round(a-g*D),Math.round(i+d*D),S,k,b,R,T)}a+=d*.8,i+=g*.8,r+=h*.05}}}function Ko(o,t){const e=Math.cos(t.ang),s=Math.sin(t.ang),n=Math.ceil(Math.max(t.rx,t.ry)*1.7)+1,a=Math.round(t.cx),i=Math.round(t.cy),r=-.6,l=-.8;for(let c=-n;c<=n;c++)for(let h=-n;h<=n;h++){const f=h+(a-t.cx),p=c+(i-t.cy),m=(f*e+p*s)/t.rx,u=(-f*s+p*e)/t.ry,v=m*m+u*u;if(v>2.9)continue;const w=(i+c&o.mask)*o.S+(a+h&o.mask);if(v<1){const M=Math.sqrt(1-v),d=(f*r+p*l)/(Math.max(t.rx,t.ry)*1),g=.74+.3*M-.28*d*(1-M*.6),x=v>.8?.8:1;o.R[w]+=(t.color[0]*g-o.R[w])*x,o.G[w]+=(t.color[1]*g-o.G[w])*x,o.B[w]+=(t.color[2]*g-o.B[w])*x;const y=M*t.hScale;y>o.H[w]&&(o.H[w]=y)}else if(t.shadow>0){const M=(f*-r+p*-l)/(Math.sqrt(f*f+p*p)+1e-4),d=1-(Math.sqrt(v)-1)/.7;if(d>0&&M>-.2){const g=1-t.shadow*d*Math.min(1,M+.3);o.R[w]*=g,o.G[w]*=g,o.B[w]*=g}}}}function Fs(o,t,e,s){const n=t*t,a=new Float32Array(n),i=new Float32Array(n),r=new Float32Array(n),l=new Float32Array(n),c=new Float32Array(n),h=new Float32Array(n);for(let u=0;u<n;u++){a[u]=.5+(e()-.5)*.85,i[u]=.5+(e()-.5)*.85;const v=e()*Math.PI;r[u]=Math.cos(v),l[u]=Math.sin(v);const w=s?.75+e()*.7:1,M=s?.8+e()*.45:1;c[u]=1/(M*w),h[u]=1/(M/w)}const f=new Float32Array(o*o),p=new Float32Array(o*o),m=new Int32Array(o*o);for(let u=0;u<o;u++){const v=u*t/o,w=Math.floor(v);for(let M=0;M<o;M++){const d=M*t/o,g=Math.floor(d);let x=1e9,y=1e9,S=0;for(let b=-1;b<=1;b++){const T=w+b,A=(T%t+t)%t;for(let _=-1;_<=1;_++){const P=g+_,D=(P%t+t)%t,R=A*t+D,z=d-(P+a[R]),N=v-(T+i[R]),I=z*r[R]+N*l[R],B=-z*l[R]+N*r[R],U=I*I*c[R]*c[R]+B*B*h[R]*h[R];U<x?(y=x,x=U,S=R):U<y&&(y=U)}}const k=u*o+M;f[k]=Math.sqrt(x),p[k]=Math.sqrt(y),m[k]=S}}return{d1:f,d2:p,id:m}}const Re=(o,t,e)=>{const s=Math.min(1,Math.max(0,(e-o)/(t-o)));return s*s*(3-2*s)};function Tn(o,t,e,s){const n=o.S,a=n/512,i=Bt(e.grass),r=Bt(e.dryGrass),l=Bt(e.dirt),c=de(n,t,4,4,5),h=de(n,t,16,16,3);if(Yo(c,1.8),s){for(let f=0;f<n*n;f++){const p=Re(.5,.72,c[f]),m=h[f];o.R[f]=(r[0]*.62+(l[0]*.8-r[0]*.62)*p*.55)*(.78+.4*m),o.G[f]=(r[1]*.62+(l[1]*.8-r[1]*.62)*p*.55)*(.78+.4*m),o.B[f]=(r[2]*.62+(l[2]*.8-r[2]*.62)*p*.55)*(.78+.4*m),o.H[f]=.1+.18*m}ys(o,t,{count:Math.round(11e3*a*a),lenMin:24*a+4,lenMax:58*a+4,wMin:1.3,wMax:2.1,curve:3.4,base:r,baseDark:.62,tipLight:1.08,tipYellow:.08,bright:[.7,1.3],alt:{p:.12,color:[l[0]*1.1,l[1]*1.05,l[2]]},hueJitter:.1}),ys(o,t,{count:Math.round(1200*a*a),lenMin:10*a+3,lenMax:22*a+3,wMin:1.4,wMax:2,curve:1.4,base:Bt(e.grass),baseDark:.6,tipLight:1.05,tipYellow:.1,bright:[.7,1],hueJitter:.06})}else{const f=[i[0]*.5,i[1]*.5,i[2]*.45];for(let u=0;u<n*n;u++){const v=c[u]*.7+h[u]*.3;o.R[u]=f[0]*(.7+.6*v),o.G[u]=f[1]*(.7+.6*v),o.B[u]=f[2]*(.7+.6*v),o.H[u]=.12+.2*h[u]}ys(o,t,{count:Math.round(26e3*a*a),lenMin:12*a+3,lenMax:30*a+3,wMin:1.5,wMax:2.5,curve:1.2,base:i,baseDark:.58,tipLight:1.12,tipYellow:.16,bright:[.75,1.25],alt:{p:.05,color:r},hueJitter:.08});const p=[[.93,.92,.84],[.93,.78,.22],[.9,.9,.92]],m=Math.round(9*a*a)+3;for(let u=0;u<m;u++){const v=t()*n,w=t()*n,M=p[Math.floor(t()*p.length)],d=(1.3+t()*.8)*Math.max(.8,a);for(let g=0;g<5;g++){const x=g/5*Math.PI*2+t();Ko(o,{cx:v+Math.cos(x)*d,cy:w+Math.sin(x)*d,rx:d*.7,ry:d*.7,ang:0,color:M,hScale:.9,shadow:0})}Ko(o,{cx:v,cy:w,rx:d*.55,ry:d*.55,ang:0,color:[.95,.72,.15],hScale:.95,shadow:0})}}}function ir(o,t,e){const s=o.S,n=s/512,a=Bt(e.dirt),i=Bt(e.rock),r=de(s,t,4,4,5),l=de(s,t,32,32,3);Yo(r,1.8);for(let p=0;p<s*s;p++){const m=.94+t()*.12,u=(.76+.46*r[p])*(.9+.2*l[p])*m,v=r[p]>.55?1.04:.98;o.R[p]=a[0]*u*v,o.G[p]=a[1]*u,o.B[p]=a[2]*u/v,o.H[p]=.28+.2*l[p]+.1*r[p]}const c=Math.round(110*n*n);for(let p=0;p<c;p++){const m=(5+t()*8)*n+1.5,u=.9+t()*.25;Ko(o,{cx:t()*s,cy:t()*s,rx:m*(.8+t()*.5),ry:m*(.8+t()*.5),ang:t()*3.14,color:[a[0]*u,a[1]*u,a[2]*u],hScale:.55+t()*.15,shadow:.2})}const h=Math.round(520*n*n);for(let p=0;p<h;p++){const m=(1.5+Math.pow(t(),2)*5)*Math.max(.7,n),u=t()*.65,v=.72+t()*.55;Ko(o,{cx:t()*s,cy:t()*s,rx:m*(.85+t()*.5),ry:m*(.7+t()*.4),ang:t()*3.14,color:[(i[0]+(a[0]-i[0])*u)*v,(i[1]+(a[1]-i[1])*u)*v,(i[2]+(a[2]-i[2])*u)*v],hScale:.8+t()*.2,shadow:.38})}const f=Math.round(16*n)+4;for(let p=0;p<f;p++){let m=t()*s,u=t()*s,v=t()*Math.PI*2;const w=Math.round((70+t()*150)*n)+20;for(let M=0;M<w;M++){v+=(t()-.5)*.7,m+=Math.cos(v),u+=Math.sin(v);const d=Math.round(m),g=Math.round(u),x=(g&o.mask)*s+(d&o.mask);if(o.R[x]*=.5,o.G[x]*=.5,o.B[x]*=.5,o.H[x]=Math.min(o.H[x],.04),M%3===0){const y=(g&o.mask)*s+(d+1&o.mask);o.R[y]*=.8,o.G[y]*=.8,o.B[y]*=.8,o.H[y]=Math.min(o.H[y],.18)}}}}function rr(o,t,e){const s=o.S,n=s/512,a=Bt(e.gravel),i=Bt(e.dirt),r=Math.round(24*n+2)|0,l=Math.max(8,r),c=Fs(s,l,t,!0),h=new Float32Array(l*l),f=new Float32Array(l*l),p=new Float32Array(l*l);for(let v=0;v<h.length;v++)h[v]=.62+t()*.75,f[v]=t(),p[v]=.6+t()*.4;const m=[i[0]*.38,i[1]*.36,i[2]*.33],u=de(s,t,24,24,2);for(let v=0;v<s*s;v++){const w=c.id[v],M=c.d1[v],d=Re(0,.1,c.d2[v]-M),g=Math.max(0,1-M*.85),x=f[w],y=h[w]*(.86+.28*u[v])*(.78+.3*g)*(.95+t()*.1),S=a[0]*y*(.94+.14*x),k=a[1]*y*(.97+.04*x),b=a[2]*y*(1.04-.14*x),T=d*d;o.R[v]=m[0]+(S-m[0])*T,o.G[v]=m[1]+(k-m[1])*T,o.B[v]=m[2]+(b-m[2])*T,o.H[v]=.04+.96*Math.pow(g,.7)*d*p[w]}}function lr(o,t,e){const s=o.S,n=s/512,a=Bt(e.rock),i=Ve(Bt(e.grass),[.1,.12,.06],.35),r=de(s,t,2,12,5),l=de(s,t,6,6,4),c=de(s,t,32,32,3),h=de(s,t,3,3,4);Yo(r,1.6),Yo(h,1.8);const f=Fs(s,Math.max(4,Math.round(9*Math.max(.7,n))),t,!1),p=Fs(s,Math.max(8,Math.round(15*Math.max(.7,n*1))),t,!1);for(let m=0;m<s*s;m++){const u=r[m]*.5+l[m]*.32+c[m]*.18,v=(c[m]-.5)*.09,w=1-Re(0,.035,f.d2[m]-f.d1[m]+v),M=(1-Re(0,.05,p.d2[m]-p.d1[m]+v))*.55*Re(.35,.7,l[m]),d=Math.min(1,w+M),g=u*(1-.8*d),x=.74+.5*r[m],y=l[m];let S=a[0]*x*(.96+.1*y),k=a[1]*x,b=a[2]*x*(1.04-.1*y);const T=.62+.55*g,A=1-.38*d;S*=T*A,k*=T*A,b*=T*A;const _=Re(.55,.78,h[m])*Re(.6,.2,u)*.55;_>0&&(S+=(i[0]*(.7+.5*c[m])-S)*_,k+=(i[1]*(.7+.5*c[m])-k)*_,b+=(i[2]*(.7+.5*c[m])-b)*_);const P=.94+t()*.12;o.R[m]=S*P,o.G[m]=k*P,o.B[m]=b*P,o.H[m]=g}}const cr={0:1.8,1:1.5,2:2.4,3:3.4,4:3},hr={0:.9,1:.94,2:.97,3:.84,4:.9};function ur(o,t){const e=o.S,s=new Uint8Array(e*e*4),n=new Uint8Array(e*e*4),a=h=>h<=0?0:h>=1?255:h*255+.5|0,i=o.H,r=o.mask,l=cr[t],c=hr[t];for(let h=0;h<e;h++){const f=(h-1&r)*e,p=h*e,m=(h+1&r)*e;for(let u=0;u<e;u++){const v=u-1&r,w=u+1&r,M=i[f+w]+2*i[p+w]+i[m+w]-i[f+v]-2*i[p+v]-i[m+v],d=i[m+v]+2*i[m+u]+i[m+w]-i[f+v]-2*i[f+u]-i[f+w],g=-M*l/8,x=-d*l/8,y=1/Math.sqrt(g*g+x*x+1),S=(p+u)*4,k=p+u;s[S]=a(o.R[k]),s[S+1]=a(o.G[k]),s[S+2]=a(o.B[k]),s[S+3]=a(i[k]),n[S]=a(g*y*.5+.5),n[S+1]=a(x*y*.5+.5),n[S+2]=a(y*.5+.5),n[S+3]=a(c+(.5-i[k])*.12)}}return{size:e,albedo:s,normal:n}}function fr(o,t,e,s){if(t<64||(t&t-1)!==0)throw new Error("size must be a power of two >= 64");const n=nr(e*7919+o*104729+1),a=ar(t);switch(o){case 0:Tn(a,n,s,!1);break;case 1:Tn(a,n,s,!0);break;case 2:ir(a,n,s);break;case 3:rr(a,n,s);break;default:lr(a,n,s)}return ur(a,o)}const dr=256,mr=2207,Vs=1.1,pr={grass:9079172,dryGrass:9079172,dirt:7300698,gravel:9276293,rock:9079172};let qt,Ce;function An(o,t,e){const s=new Le(o,t,t,To,Ao);return s.colorSpace=e?ts:ko,s.wrapS=s.wrapT=me,s.magFilter=Fe,s.minFilter=Jo,s.generateMipmaps=!0,s.anisotropy=4,s.needsUpdate=!0,s}function Ua(){if(qt)return qt;const o=fr(4,dr,mr,pr);return qt={albedo:An(o.albedo,o.size,!0),normal:An(o.normal,o.size,!1)},qt}const _n=`
varying vec3 vRkPos;
varying vec3 vRkNrm;
varying vec3 vRkWorldN;
varying mat3 vRkM;
`,vr=`
uniform sampler2D rkAlbedo;
uniform sampler2D rkNormal;

float rkHash(vec3 p) {
  p = fract(p * 0.3183099 + vec3(0.71, 0.113, 0.419));
  p *= 17.0;
  return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
}
float rkNoise(vec3 x) {
  vec3 i = floor(x);
  vec3 f = fract(x);
  f = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(mix(rkHash(i), rkHash(i + vec3(1, 0, 0)), f.x), mix(rkHash(i + vec3(0, 1, 0)), rkHash(i + vec3(1, 1, 0)), f.x), f.y),
    mix(mix(rkHash(i + vec3(0, 0, 1)), rkHash(i + vec3(1, 0, 1)), f.x), mix(rkHash(i + vec3(0, 1, 1)), rkHash(i + vec3(1, 1, 1)), f.x), f.y),
    f.z);
}
`,gr=`
vRkPos = transformed;
`,xr=`
{
  mat4 rkModel = modelMatrix;
  #ifdef USE_BATCHING
    rkModel = modelMatrix * batchingMatrix;
  #endif
  vRkM = mat3(rkModel);
  vRkNrm = normalize(objectNormal);
  vRkWorldN = normalize(vRkM * objectNormal);
}
`,wr=`
vec3 rkN = normalize(vRkNrm);
vec3 rkW = pow(abs(rkN), vec3(5.0));
rkW /= (rkW.x + rkW.y + rkW.z);
vec3 rkP = vRkPos * ${Vs.toFixed(3)};
vec4 rkAx = texture2D(rkAlbedo, rkP.zy);
vec4 rkAy = texture2D(rkAlbedo, rkP.xz + 0.37);
vec4 rkAz = texture2D(rkAlbedo, rkP.xy + 0.71);
vec4 rkA = rkAx * rkW.x + rkAy * rkW.y + rkAz * rkW.z;
float rkStrata = 0.93 + 0.1 * sin(vRkPos.y * 17.0 + rkNoise(vRkPos * 2.3) * 4.5);
vec3 rkAlb = rkA.rgb * rkStrata;
// 苔藓：世界法线朝上 × 噪声（在凹处略多）
float rkUp = smoothstep(0.55, 0.9, vRkWorldN.y);
float rkMn = rkNoise(vRkPos * 3.1 + 5.0) * 0.6 + rkNoise(vRkPos * 9.0) * 0.4;
float rkMoss = rkUp * smoothstep(0.32, 0.62, rkMn + (0.5 - rkA.a) * 0.35);
// 侧面低处：薄薄一层地衣斑
float rkLichen = smoothstep(0.58, 0.72, rkNoise(vRkPos * 6.5 + 11.0)) * (1.0 - rkUp) * 0.28;
vec3 rkMossCol = mix(vec3(0.20, 0.27, 0.12), vec3(0.31, 0.38, 0.17), rkNoise(vRkPos * 13.0)) * (0.65 + 0.7 * rkA.a);
rkAlb = mix(rkAlb, rkMossCol, clamp(rkMoss * 0.9, 0.0, 0.92));
rkAlb = mix(rkAlb, vec3(0.50, 0.52, 0.36), rkLichen);
// 接地：接触阴影 + 湿润
float rkGround = 1.0 - smoothstep(0.0, 0.2, vRkPos.y);
rkAlb *= mix(1.0, 0.5, rkGround);
diffuseColor.rgb *= rkAlb;
`,Mr=`
{
  vec3 rkNo = normalize(vRkNrm);
  vec3 rkWn = pow(abs(rkNo), vec3(5.0));
  rkWn /= (rkWn.x + rkWn.y + rkWn.z);
  vec3 rkQ = vRkPos * ${Vs.toFixed(3)};
  vec3 tx = texture2D(rkNormal, rkQ.zy).xyz * 2.0 - 1.0;
  vec3 ty = texture2D(rkNormal, rkQ.xz + 0.37).xyz * 2.0 - 1.0;
  vec3 tz = texture2D(rkNormal, rkQ.xy + 0.71).xyz * 2.0 - 1.0;
  tx = vec3(tx.xy + rkNo.zy, abs(tx.z) * rkNo.x);
  ty = vec3(ty.xy + rkNo.xz, abs(ty.z) * rkNo.y);
  tz = vec3(tz.xy + rkNo.xy, abs(tz.z) * rkNo.z);
  vec3 rkBn = normalize(tx.zyx * rkWn.x + ty.xzy * rkWn.y + tz.xyz * rkWn.z);
  rkBn = normalize(mix(rkNo, rkBn, 0.9));
  vec3 rkWorld = normalize(vRkM * rkBn);
  normal = normalize((viewMatrix * vec4(rkWorld, 0.0)).xyz);
}
`,yr=`
{
  vec3 rkNr = normalize(vRkNrm);
  vec3 rkWr = pow(abs(rkNr), vec3(5.0));
  rkWr /= (rkWr.x + rkWr.y + rkWr.z);
  vec3 rkR = vRkPos * ${Vs.toFixed(3)};
  float rkRough = texture2D(rkNormal, rkR.zy).a * rkWr.x + texture2D(rkNormal, rkR.xz + 0.37).a * rkWr.y + texture2D(rkNormal, rkR.xy + 0.71).a * rkWr.z;
  roughnessFactor = mix(rkRough, 0.97, rkMoss * 0.8);
  roughnessFactor = mix(roughnessFactor, roughnessFactor * 0.72, rkGround);
}
`;function br(){if(Ce)return Ce;const o=Ua(),t=new at({color:16777215,vertexColors:!0,roughness:.92,metalness:0});return t.userData.shared=!0,t.onBeforeCompile=e=>{e.uniforms.rkAlbedo={value:o.albedo},e.uniforms.rkNormal={value:o.normal},e.vertexShader=e.vertexShader.replace("#include <common>",`#include <common>
${_n}`).replace("#include <begin_vertex>",`#include <begin_vertex>
${gr}`).replace("#include <beginnormal_vertex>",`#include <beginnormal_vertex>
${xr}`),e.fragmentShader=e.fragmentShader.replace("#include <common>",`#include <common>
${_n}${vr}`).replace("#include <color_fragment>",`#include <color_fragment>
${wr}`).replace("#include <roughnessmap_fragment>",`#include <roughnessmap_fragment>
${yr}`).replace("#include <normal_fragment_maps>",`#include <normal_fragment_maps>
${Mr}`)},t.customProgramCacheKey=()=>"rock-triplanar-v1",Ce=t,t}let ue;function Sr(){if(ue)return ue;const o=Ua();return ue=new at({color:16777215,map:o.albedo,normalMap:o.normal,normalScale:new ut(.7,.7),vertexColors:!0,roughness:.9,metalness:0}),ue.userData.shared=!0,ue}function kr(){Ce==null||Ce.dispose(),Ce=void 0,ue==null||ue.dispose(),ue=void 0,qt==null||qt.albedo.dispose(),qt==null||qt.normal.dispose(),qt=void 0}const Tr={value:0},Ar={value:1},Pn={dir:{value:new C(.4,.8,-.45).normalize()},color:{value:new W(1,.95,.85)}};let Ee="high";function Bc(o){!ze&&Object.keys(Xe).length===0&&(Ee=o)}const _r=.45,Pr=`
uniform float windTime;
uniform float windStrength;
attribute vec2 aSway;
`,Dr=`
{
  #ifdef USE_BATCHING
    mat4 windM = modelMatrix * batchingMatrix;
  #else
    mat4 windM = modelMatrix;
  #endif
  vec3 windOrigin = windM[3].xyz;
  float windPh = dot(windOrigin.xz, vec2(0.23, 0.17));
  float windGust = 0.5 + 0.5 * sin(windTime * 0.8 + windPh * 0.6) + 0.35 * sin(windTime * 1.7 + windPh * 1.3 + 1.3);
  // 世界风向（+x、+z 方向）换算到物体空间（忽略非均匀缩放）
  vec3 windObjDir = normalize(transpose(mat3(windM)) * vec3(0.82, 0.0, 0.57));
  transformed += windObjDir * (windGust * aSway.x * windStrength);
  float windFt = windTime * 5.2 + windPh * 2.1;
  transformed += vec3(
    sin(windFt + position.x * 9.0 + position.y * 3.0),
    0.5 * sin(windFt * 1.31 + position.y * 8.0 + position.z * 2.0),
    sin(windFt * 0.87 + position.z * 9.0 + position.x * 3.0)
  ) * (aSway.y * (0.55 + 0.45 * windGust) * (0.7 + 0.3 * windStrength));
}
`;function Hs(o){o.uniforms.windTime=Tr,o.uniforms.windStrength=Ar,o.vertexShader=o.vertexShader.replace("#include <common>",`#include <common>
${Pr}`).replace("#include <begin_vertex>",`#include <begin_vertex>
${Dr}`)}const Rr=`
uniform vec3 foliageSunDir;
uniform vec3 foliageSunColor;
`,Cr=`
{
  vec3 tlSun = normalize((viewMatrix * vec4(foliageSunDir, 0.0)).xyz);
  vec3 tlView = normalize(vViewPosition);
  float tlBack = pow(max(dot(-tlView, tlSun), 0.0), 4.0);
  totalEmissiveRadiance += diffuseColor.rgb * foliageSunColor * (tlBack * 0.35);
}
`;function Zo(o,t,e,s){const n=new Le(o.data,o.size,o.size,To,Ao);return n.colorSpace=t?ts:ko,n.wrapS=n.wrapT=e?me:Rs,n.magFilter=Fe,n.minFilter=Jo,n.generateMipmaps=!0,n.anisotropy=s,n.needsUpdate=!0,n}const Er=`
#ifdef USE_MAP
  vec2 fTexSz = vec2(textureSize(map, 0));
  vec2 fDx = dFdx(vMapUv * fTexSz);
  vec2 fDy = dFdy(vMapUv * fTexSz);
  float fMip = max(0.0, 0.5 * log2(max(dot(fDx, fDx), dot(fDy, fDy))));
  diffuseColor.a *= 1.0 + fMip * 0.3;
#endif`;function Oa(o){o.fragmentShader=o.fragmentShader.replace("#include <map_fragment>",`#include <map_fragment>
${Er}`)}const zr=4177,Nr=913;let ze;const Xe={},qo=new Map;function Ga(o,t){const e=new yi({depthPacking:bi}),s=new Si;for(const n of[e,s])n.map=o.map,n.alphaTest=o.alphaTest,n.onBeforeCompile=a=>{Hs(a),Oa(a)},n.customProgramCacheKey=()=>`wind-shadow-${t}-v2`;qo.set(o,{depth:e,distance:s})}function Wa(){if(ze)return ze;const t=tr(Ee==="high"?1024:512,zr),e=new at({map:Zo(t.albedo,!0,!1,Ee==="high"?4:2),normalMap:Zo(t.normal,!1,!1,Ee==="high"?4:2),normalScale:new ut(.8,.8),alphaTest:_r,vertexColors:!0,side:mt,roughness:.82,metalness:0});return e.onBeforeCompile=s=>{Hs(s),Oa(s),s.uniforms.foliageSunDir=Pn.dir,s.uniforms.foliageSunColor=Pn.color,s.fragmentShader=s.fragmentShader.replace("#include <common>",`#include <common>
${Rr}`).replace("#include <emissivemap_fragment>",`#include <emissivemap_fragment>
${Cr}`)},e.customProgramCacheKey=()=>"foliage-wind-v2",e.userData.shared=!0,ze=e,Ga(e,"foliage"),e}function js(o){const t=Xe[o];if(t)return t;const s=or(Ee==="high"?512:256,Nr,o),n=new at({map:Zo(s.albedo,!0,!0,Ee==="high"?4:2),normalMap:Zo(s.normal,!1,!0,Ee==="high"?4:2),normalScale:new ut(1,1),vertexColors:!0,roughness:.96,metalness:0});return n.onBeforeCompile=a=>Hs(a),n.customProgramCacheKey=()=>"bark-wind-v1",n.userData.shared=!0,Xe[o]=n,Ga(n,`bark-${o}`),n}function Qo(o,t){const e=qo.get(t);e&&(o.customDepthMaterial=e.depth,o.customDistanceMaterial=e.distance)}function Vc(){var t,e;const o=[];ze&&o.push(ze);for(const s of Object.values(Xe))s&&o.push(s);for(const s of o){(t=s.map)==null||t.dispose(),(e=s.normalMap)==null||e.dispose(),s.dispose();const n=qo.get(s);n==null||n.depth.dispose(),n==null||n.distance.dispose(),qo.delete(s)}kr(),ze=void 0,delete Xe.broadleaf,delete Xe.conifer}function Fr(o){const t=new Gt;let e=0,s=0;const n=o.some(p=>p.attributes.color);for(const p of o)e+=p.attributes.position.count,s+=p.index?p.index.count:p.attributes.position.count;const a=new Float32Array(e*3),i=new Float32Array(e*3),r=new Float32Array(e*2),l=n?new Float32Array(e*3):null,c=new Uint32Array(s);let h=0,f=0;for(const p of o){const m=p.attributes.position,u=p.attributes.normal,v=p.attributes.uv;a.set(m.array,h*3),u&&i.set(u.array,h*3),v&&r.set(v.array,h*2),l&&(p.attributes.color?l.set(p.attributes.color.array,h*3):l.fill(1,h*3,(h+m.count)*3));const w=p.index;if(w)for(let M=0;M<w.count;M++)c[f++]=w.getX(M)+h;else for(let M=0;M<m.count;M++)c[f++]=M+h;h+=m.count}return t.setAttribute("position",new ct(a,3)),t.setAttribute("normal",new ct(i,3)),t.setAttribute("uv",new ct(r,2)),l&&t.setAttribute("color",new ct(l,3)),t.setIndex(new ct(c,1)),t}const Ir=.5;function Hc(o=18){const t=Xt(90210),e=[];for(let s=0;s<o;s++){const n=t(),a=Math.sqrt(n)*.45,i=t()*Math.PI*2,r=Math.cos(i)*a,l=Math.sin(i)*a,c=.16+t()*.34,h=.026+t()*.025,f=.06+a*.7+t()*.12,p=3,m=[],u=[],v=[],w=Math.cos(i),M=Math.sin(i),d=t()*Math.PI,g=Math.cos(d),x=Math.sin(d);for(let T=0;T<=p;T++){const A=T/p,_=A*c,P=h*(1-A*.92)*.5,D=f*A*A,R=r+w*D,z=l+M*D;m.push(R-g*P,_,z-x*P),m.push(R+g*P,_,z+x*P),u.push(0,A,1,A)}for(let T=0;T<p;T++){const A=T*2,_=T*2+1,P=T*2+2,D=T*2+3;v.push(A,P,_,_,P,D)}const y=new Gt;y.setAttribute("position",new vt(m,3)),y.setAttribute("uv",new vt(u,2)),y.setIndex(v),y.computeVertexNormals();const S=.78+t()*.3,k=t()>.93?1:0,b=new Float32Array(m.length);for(let T=0;T<m.length/3;T++){const A=$.clamp(m[T*3+1]/Ir,0,1),_=[.07+A*.27,.15+A*.34,.045+A*.1],P=[.2+A*.34,.17+A*.26,.07+A*.1];for(let D=0;D<3;D++)b[T*3+D]=(_[D]*(1-k)+P[D]*k)*S}y.setAttribute("color",new ct(b,3)),e.push(y)}return Fr(e)}const Dn=new Map;function Ba(o=.88,t="leaf"){const e=`${t}:${o}`;let s=Dn.get(e);return s||(s=new at({color:16777215,vertexColors:!0,roughness:o,metalness:.02}),Dn.set(e,s)),s}function vo(o,t,e,s){return Math.sin(o*2.3+s)*Math.cos(t*2.1+s*1.3)*.5+Math.sin(e*2.7-s*.7+o*1.1)*.35+Math.sin((o+t+e)*4.1+s)*.15}const Rn=new Map;function Lr(o,t,e){const s=`${o}:${t}:${e}`,n=Rn.get(s);if(n)return n;const a=Ye(new wa(1,t),1e-4),i=a.attributes.position,r=new C;for(let l=0;l<i.count;l++){r.fromBufferAttribute(i,l);const c=vo(r.x,r.y,r.z,o);r.multiplyScalar(1+c*e),i.setXYZ(l,r.x,r.y,r.z)}return a.computeVertexNormals(),a.deleteAttribute("uv"),Rn.set(s,a),a}function St(o,t,e,s=()=>1,n=!1){const a=o.clone();n||a.deleteAttribute("uv"),a.attributes.normal||a.computeVertexNormals();const i=a.attributes.position,r=a.attributes.normal,l=new Float32Array(i.count*3);for(let c=0;c<i.count;c++){const h=s(i.getY(c),r.getY(c));l[c*3]=e.r*h,l[c*3+1]=e.g*h,l[c*3+2]=e.b*h}return a.setAttribute("color",new ct(l,3)),a.applyMatrix4(t),a.index?a:Ye(a,1e-4)}const Ur=new et,Cn=new Ue,En=new os,zn=new C,Nn=new C;function Ft(o,t,e,s=1,n=s,a=s,i=0,r=0,l=0){return En.set(i,r,l),Cn.setFromEuler(En),zn.set(o,t,e),Nn.set(s,n,a),Ur.clone().compose(zn,Cn,Nn)}function $s(o,t,e,s=!0){if(t.length===0)return;const n=Yt(t,!1);if(!n)return;const a=new Y(n,e);a.castShadow=s,a.receiveShadow=!0,Qo(a,e),o.add(a)}function Xs(o,t,e,s,n,a=!1,i=16,r=18){const l=[];for(let u=0;u<=i;u++){const v=u/i,w=t*.6*Math.exp(-v*13);l.push(new ut($.lerp(t,e,Math.pow(v,.85))+w,-.08*o+v*o*1.08))}const c=new Ti(l,r),h=c.attributes.position,f=new Float32Array(h.count*3);for(let u=0;u<h.count;u++){const v=h.getX(u),w=h.getZ(u),M=h.getY(u),d=Math.atan2(w,v),g=Math.sin(d*7+M*.9/Math.max(.2,o*.15))*.5+Math.sin(d*13-M*1.7/Math.max(.2,o*.15))*.3+vo(v*3,M*2.2,w*3,3)*.6,x=Math.max(0,Math.sin(d*5+.7))*Math.exp(-Math.max(0,M)/(o*.12)),y=1+g*.055+x*.28;h.setX(u,v*y+n*Math.pow(Math.max(0,M)/o,2)*o),h.setZ(u,w*y);const S=.72+.28*$.clamp(.5+g*.6,0,1),k=.7+.3*Math.min(1,Math.max(0,M)/(o*.3)),b=S*k;f[u*3]=s.r*b,f[u*3+1]=s.g*b,f[u*3+2]=s.b*b}if(c.setAttribute("color",new ct(f,3)),a){const u=c.attributes.uv,v=Math.PI*2*((t+e)/2+t*.1);for(let w=0;w<u.count;w++)u.setY(w,u.getY(w)*o*1.08/v)}else c.deleteAttribute("uv");c.computeVertexNormals();const p=c.attributes.normal,m=i+1;for(let u=0;u<m;u++){const v=u,w=r*m+u,M=p.getX(v)+p.getX(w),d=p.getY(v)+p.getY(w),g=p.getZ(v)+p.getZ(w),x=Math.hypot(M,d,g)||1;p.setXYZ(v,M/x,d/x,g/x),p.setXYZ(w,M/x,d/x,g/x)}return c}const Or=.03,So=.05,fe=new C(0,1,0);class rs{constructor(){F(this,"pos",[]);F(this,"nor",[]);F(this,"uvs",[]);F(this,"col",[]);F(this,"sw",[]);F(this,"idx",[]);F(this,"n",new C)}get cardCount(){return this.pos.length/12}add(t,e,s,n,a,i,r,l,c,h,f,p=!1){this.n.crossVectors(e,s).normalize();const m=this.n.dot(c)<0?-1:1;m<0&&this.n.negate();const u=this.n.clone().multiplyScalar(1-f).addScaledVector(h,f).normalize(),[v,w,M,d]=K0(i),g=this.pos.length/3;for(let x=0;x<4;x++){const y=x===1||x===2?1:0,S=x>=2?1:0,k=(y-.5)*n*m,b=(S-.5)*a;this.pos.push(t.x+e.x*k+s.x*b,t.y+e.y*k+s.y*b,t.z+e.z*k+s.z*b),this.nor.push(u.x,u.y,u.z);const T=p?1-y:y;this.uvs.push(v+(M-v)*T,w+(d-w)*S);const A=.88+.12*S;this.col.push(r[0]*A,r[1]*A,r[2]*A),this.sw.push(0,l*(.3+.7*S))}this.idx.push(g,g+1,g+2,g,g+2,g+3)}build(){const t=new Gt;return t.setAttribute("position",new vt(this.pos,3)),t.setAttribute("normal",new vt(this.nor,3)),t.setAttribute("uv",new vt(this.uvs,2)),t.setAttribute("color",new vt(this.col,3)),t.setAttribute("aSway",new vt(this.sw,2)),t.setIndex(this.pos.length/3>65535?new ki(this.idx,1):new xa(this.idx,1)),t}}function Fn(o,t){const e=o.attributes.position;let s=o.attributes.aSway;s||(s=new ct(new Float32Array(e.count*2),2),o.setAttribute("aSway",s));const n=Or*t;for(let a=0;a<e.count;a++){const i=$.clamp(e.getY(a)/t,0,1);s.setX(a,n*i*i)}s.needsUpdate=!0}function Gr(o){let t=.001;for(const e of o){const s=e.attributes.position;for(let n=0;n<s.count;n++)s.getY(n)>t&&(t=s.getY(n))}return t}function Ys(o,t,e,s){const n=t.length>0?Yt(t,!1):null,a=Gr([...n?[n]:[],...e?[e]:[]]);if(n){Fn(n,a);const i=new Y(n,s);i.castShadow=!0,i.receiveShadow=!0,Qo(i,s),o.add(i)}if(e){Fn(e,a);const i=Wa(),r=new Y(e,i);r.castShadow=!0,r.receiveShadow=!0,Qo(r,i),o.add(r)}}function go(o,t,e,s,n,a,i){const r=t.clone().sub(o),l=r.length(),c=new Ct(s,e,l,n,1,!0);c.translate(0,l/2,0);const h=c.attributes.uv,f=i(),p=i(),m=l/(Math.PI*(e+s));for(let w=0;w<h.count;w++)h.setXY(w,h.getX(w)+f,h.getY(w)*m+p);const u=c.attributes.position,v=new Float32Array(u.count*3);for(let w=0;w<u.count;w++){const M=a*(.78+.22*Math.min(1,u.getY(w)/l));v[w*3]=M,v[w*3+1]=M,v[w*3+2]=M}return c.setAttribute("color",new ct(v,3)),c.applyMatrix4(new et().compose(o,new Ue().setFromUnitVectors(fe,r.normalize()),new C(1,1,1))),c}const Va=new W(1,.96,.9);function Ne(o,t){return t.set(o()+o()+o()-1.5,o()+o()+o()-1.5,o()+o()+o()-1.5),t.lengthSq()<1e-6&&t.set(0,1,0),t.normalize()}function Wr(o,t,e,s,n,a){const i=new rs,r=Ne(e,new C),l=new C().crossVectors(r,Math.abs(r.y)>.9?new C(1,0,0):fe).normalize(),c=new C().crossVectors(r,l).normalize(),h=e()*Math.PI*2,f=l.clone().multiplyScalar(Math.cos(h)).addScaledVector(c,Math.sin(h)),p=c.clone().multiplyScalar(Math.cos(h)).addScaledVector(l,-Math.sin(h)),m=.62+.4*$.clamp(.5+s*.6,0,1),u=.94+e()*.12;return i.add(o,f,p,t,t,ne.shrub,[m*u,m,m*(1.1-(u-.94))],t*So,r,r,.4,e()>.5),i.build()}function Ha(o){const t=new gt,e=Xt(o.seed),s=o.u,n=[],a=(x,y,S,k,b=1)=>{n.push(go(x,y,S,k,o.radial,b,e))},i=13*s;n.push(Xs(i,1.9*s,1.15*s,Va,(e()-.5)*.02,!0,o.trunkRows,o.trunkRadial));for(let x=0;x<o.roots;x++){const y=x/o.roots*Math.PI*2+e()*.4,S=(3.4+e()*2.2)*s;a(new C(Math.cos(y)*s,2.2*s,Math.sin(y)*s),new C(Math.cos(y)*S,-.25*s,Math.sin(y)*S),.7*s,.18*s,.95)}const r=[];for(let x=0;x<o.limbs;x++){const y=x/o.limbs*Math.PI*2+e()*.4,S=i*(.62+e()*.3),k=(7.5+e()*3.5)*s,b=(5+e()*4)*s;let T=new C(Math.cos(y)*.5*s,S,Math.sin(y)*.5*s);for(let A=1;A<=o.segs;A++){const _=A/o.segs,P=new C(Math.cos(y)*k*_,S+b*Math.pow(_,.8)+Math.sin(_*3+x)*.4*s,Math.sin(y)*k*_),D=Math.max(.1*s,.62*s*(1-(A-1)/o.segs*.85)),R=Math.max(.07*s,.62*s*(1-A/o.segs*.85));if(a(T,P,D,R),A>=o.forkFrom)for(const z of[-1,1]){const N=y+z*(.5+e()*.5),I=P.clone().add(new C(Math.cos(N)*(2.2+e()*1.6)*s,(1.6+e()*2.2)*s,Math.sin(N)*(2.2+e()*1.6)*s));a(P,I,R*.8,.05*s),r.push({p:I,r:(1.9+e()*1)*s});for(let B=0;B<o.twigs;B++){const U=N+(B===0?-1:1)*(.6+e()*.7)*(e()>.5?1:-1),V=I.clone().add(new C(Math.cos(U)*(1.3+e()*1.2)*s,(.5+e()*1.6)*s,Math.sin(U)*(1.3+e()*1.2)*s));a(I,V,.05*s,.025*s),r.push({p:V,r:(1.4+e()*.8)*s})}}A===2&&r.push({p:P.clone().add(new C(0,1.2*s,0)),r:(2.2+e()*1)*s}),T=P}r.push({p:T.clone().add(new C(0,.8*s,0)),r:(2.5+e()*1)*s})}r.push({p:new C(0,i+4.5*s,0),r:3.4*s});const l=new C;for(const x of r)l.add(x.p);l.multiplyScalar(1/r.length);let c=.001;for(const x of r)c=Math.max(c,x.p.distanceTo(l)+x.r);let h=0;for(const x of r)h+=x.r*x.r;const f=new rs,p=new C,m=new C,u=new C,v=new C,w=new C,M=new C,d=new C,g=new C;for(const x of r){const y=Math.max(2,Math.round(o.cards*x.r*x.r/h));v.copy(x.p).sub(l).normalize();for(let S=0;S<y;S++){Ne(e,p).multiplyScalar(.8).addScaledVector(v,.55).normalize(),m.copy(x.p).addScaledVector(p,x.r*(.25+e()*.85)),u.copy(m).sub(l);const k=$.clamp(u.length()/c,0,1);u.normalize(),w.copy(u).multiplyScalar(.7).addScaledVector(fe,.45).add(Ne(e,g).multiplyScalar(.55)).normalize(),M.copy(u).addScaledVector(w,-u.dot(w)),M.lengthSq()<.02&&Ne(e,M),M.normalize();const b=(e()-.5)*1.8;g.crossVectors(w,M),M.multiplyScalar(Math.cos(b)).addScaledVector(g,Math.sin(b)).normalize(),d.crossVectors(M,w).normalize();const A=k<.55&&e()<.75?ne.broadleafDark:ne.broadleaf,_=$.lerp(.34,1.02,$.smoothstep(k,.15,1))*(.82+.18*$.clamp(.5+u.y*.8,0,1))*(.9+.2*e()),P=.96+e()*.1,D=(o.cardSize[0]+e()*(o.cardSize[1]-o.cardSize[0]))*s;f.add(m,d,M,D,D,A,[_*P,_,_*(1.08-(P-.96))],D*So,u,u,.55,e()>.5)}}return Ys(t,n,f.build(),js("broadleaf")),t}function jc(o=1,t="high"){const e=t==="low";return Ha({u:.2*o,limbs:4,segs:3,forkFrom:3,roots:3,cards:e?440:1900,cardSize:e?[2.2,3.6]:[1.3,2.3],twigs:e?0:2,radial:e?4:6,trunkRows:e?8:16,trunkRadial:e?8:18,seed:Math.floor(o*1e4)+77})}function $c(){return Ha({u:1,limbs:8,segs:4,forkFrom:2,roots:8,cards:9e3,cardSize:[1.5,2.9],twigs:2,radial:7,trunkRows:16,trunkRadial:18,seed:4411})}function Xc(o=1,t="high"){const e=new gt,s=Xt(Math.floor(o*7919)+13),n=o,a=t==="low",i=4.3*n,r=[];r.push(Xs(i*.97,.15*n,.022*n,Va,(s()-.5)*.03,!0,a?8:16,a?6:12));const l=a?5:9,c=a?2:4,h=new rs,f=new C,p=new C,m=new C,u=new C,v=new C,w=new C,M=new C,d=new C,g=new C,x=new Ue,y=a?1.4:1;for(let k=0;k<l;k++){const b=k/(l-1),T=(.9+b*3.05)*n,A=(1.1-.9*b)*n*(.92+s()*.16),_=a?4:Math.round(7-b*2.5),P=s()*Math.PI*2,D=.4-.1*b;for(let R=0;R<_;R++){const z=P+R/_*Math.PI*2+(s()-.5)*.5,N=A*(.85+s()*.3);v.set(Math.cos(z),0,Math.sin(z)),f.set(0,T+(s()-.5)*.12*n,0);const I=(G,X)=>X.set(v.x*N*G,f.y+N*(.12*G-D*G*G),v.z*N*G),B=a?2:3;p.copy(f);for(let G=1;G<=B;G++){I(G/B,m);const X=Math.max(.006*n,.045*n*(1-.65*b)*(1-(G-1)/B*.8)),H=Math.max(.004*n,.045*n*(1-.65*b)*(1-G/B*.8));r.push(go(p,m,X,H,a?3:4,.85,s)),p.copy(m)}const U=$.clamp(N*.55,.38*n,.8*n)*y,V=$.clamp(Math.round(N/(U*.42)),a?2:3,a?3:7);for(let G=0;G<V;G++){const X=.2+G/Math.max(1,V-1)*.8;I(X,g),I(Math.min(1.02,X+.05),u).sub(g).normalize(),g.addScaledVector(u,U*.35);const H=$.lerp(.5,1.02,$.smoothstep(X,.1,.8));for(let tt=0;tt<c;tt++){const dt=c===4?(tt-1.5)*.5:(tt-.5)*.9;M.copy(u),w.crossVectors(M,fe).normalize(),x.setFromAxisAngle(M,dt+(s()-.5)*.25),w.applyQuaternion(x),d.crossVectors(w,M).normalize();const pt=(s()-.5)*.35;x.setFromAxisAngle(d,pt);const q=M.clone().applyQuaternion(x),ot=w.clone().applyQuaternion(x),lt=c===4&&tt===0?.82:1,nt=H*(.7+.3*b)*lt*(.9+.2*s()),kt=U*(.9+s()*.2);h.add(g,ot,q,kt,kt,ne.conifer,[nt,nt,nt*1.04],kt*So,fe,v.clone().multiplyScalar(.5).addScaledVector(fe,.5).normalize(),.3,s()>.5)}}}}const S=a?2:3;for(let k=0;k<S;k++){const b=k/S*Math.PI+s()*.3;w.set(Math.cos(b),0,Math.sin(b)),g.set(0,i*.9+.12*n,0);const T=.62*n*y;h.add(g,w,fe,T,T,ne.conifer,[1,1,1.04],T*So*.6,d.crossVectors(w,fe),d.clone(),0,s()>.5)}return Ys(e,r,h.build(),js("conifer")),e}function Br(o=1,t="high"){const e=new gt,s=Xt(Math.floor(o*31337)+5),n=t==="low",a=o,i=[],r=n?4:5+Math.floor(s()*5);for(let y=0;y<r;y++){const S=y/r*Math.PI*2+s()*.8,k=(.35+s()*.4)*a,b=(.4+s()*.4)*a,T=new C(Math.cos(S)*k*.35,b*.5,Math.sin(S)*k*.35),A=new C(Math.cos(S)*k,b,Math.sin(S)*k),_=new C(Math.cos(S)*.03*a,0,Math.sin(S)*.03*a);n?i.push(go(_,A,.02*a,.008*a,3,.8,s)):(i.push(go(_,T,.022*a,.014*a,3,.8,s)),i.push(go(T,A,.014*a,.006*a,3,.8,s)))}const l=new rs,c=n?150:520,h=n?[.36,.56]:[.26,.44],f=new C(0,.38*a,0),p=new C,m=new C,u=new C,v=new C,w=new C,M=new C,d=new C;let g=0,x=0;for(;g<c&&x++<c*6;){Ne(s,p);const y=(.4+.6*Math.sqrt(s()))*.72*a;if(m.set(p.x*y,f.y+p.y*y*.85,p.z*y),m.y<.06*a)continue;const S=$.clamp((m.y-.06*a)/(.3*a),0,1);if(s()>.25+.75*S)continue;u.copy(m).sub(f).normalize(),v.copy(u).multiplyScalar(.75).addScaledVector(fe,.35).add(Ne(s,d).multiplyScalar(.5)).normalize(),w.copy(u).addScaledVector(v,-u.dot(v)),w.lengthSq()<.02&&Ne(s,w),w.normalize();const k=(s()-.5)*1.6;d.crossVectors(v,w),w.multiplyScalar(Math.cos(k)).addScaledVector(d,Math.sin(k)).normalize(),M.crossVectors(w,v).normalize();const b=$.clamp(m.distanceTo(f)/(.72*a),0,1),T=$.lerp(.45,1.02,$.smoothstep(b,.2,1))*(.62+.38*S)*(.9+.2*s()),A=.95+s()*.1,_=(h[0]+s()*(h[1]-h[0]))*a;l.add(m,M,w,_,_,ne.shrub,[T*A,T,T*(1.07-(A-.95))],_*So,u,u,.5,s()>.5),g++}if(Ys(e,i,l.build(),js("broadleaf")),!n&&s()>.6){const y=[],S=new xt(.035*o,6,5),k=new W([14240600,6966233,15909198][Math.floor(s()*3)]);for(let b=0;b<9;b++){const T=s()*Math.PI*2,A=(.25+s()*.35)*o;y.push(St(S,Ft(Math.cos(T)*A,(.35+s()*.3)*o,Math.sin(T)*A),k))}$s(e,y,Ba(.5,"berry"),!1)}return e}let bs;function Ks(){return bs||(bs=new at({color:16777215,vertexColors:!0,roughness:.78,metalness:0,side:mt})),bs}function xo(o,t,e,s,n){return new et().makeTranslation(o,t,e).multiply(new et().makeRotationY(s)).multiply(new et().makeRotationX(n))}function Yc(o=1){const t=new gt,e=Xt(Math.floor(o*6151)+29),s=[15913547,15695784,16185072,12160240,15897419,15226959],n=new W(4880954),a=[],i=3+Math.floor(e()*3);for(let r=0;r<i;r++){const l=(.28+e()*.3)*o,c=new W(s[Math.floor(e()*s.length)]),h=e()*Math.PI*2,f=e()*.24*o,p=Math.cos(h)*f,m=Math.sin(h)*f,u=new Ct(.007*o,.012*o,l,5,1);u.translate(0,l/2,0),a.push(St(u,Ft(p,0,m),n.clone().multiplyScalar(.85+e()*.3)));for(let w=0;w<2;w++){const M=new At(.11*o,.034*o,2,1);M.translate(.055*o,0,0),M.rotateX(-Math.PI/2),a.push(St(M,xo(p,l*(.22+w*.22),m,w*Math.PI+e()*2,.35),n.clone().multiplyScalar(1.1+e()*.2)))}const v=6;for(let w=0;w<v;w++){const M=new es(1,8);M.scale(.034*o,.062*o,1),M.translate(0,.064*o,0),M.rotateX(-Math.PI/2),a.push(St(M,xo(p,l,m,w/v*Math.PI*2,-.5),c.clone().multiplyScalar(.92+e()*.16),d=>1))}a.push(St(new xt(.022*o,7,5),Ft(p,l+.01*o,m),new W(14262813)))}return $s(t,a,Ks(),!1),t}function Vr(o,t,e,s,n,a){const r=[],l=[],c=[],h=new W;for(let p=0;p<=4;p++){const m=p/4,u=t*(1-m*.9)/2,v=e*m*m,w=s*m*m;if(r.push(v-u,m*o,w,v+u,m*o,w),h.copy(n).lerp(a,m),l.push(h.r,h.g,h.b,h.r,h.g,h.b),p>0){const M=(p-1)*2;c.push(M,M+2,M+1,M+1,M+2,M+3)}}const f=new Gt;return f.setAttribute("position",new vt(r,3)),f.setAttribute("color",new vt(l,3)),f.setIndex(c),f.computeVertexNormals(),f}function Kc(o=1){const t=new gt,e=Xt(Math.floor(o*4111)+3),s=[],n=new W(10203735),a=new W(4153392);for(let i=0;i<9;i++){const r=(.7+e()*1)*o,l=e()*Math.PI*2,c=Math.sqrt(e())*.28*o,h=Vr(r,(.05+e()*.035)*o,(e()-.5)*.55*o,(e()-.5)*.55*o,a.clone().multiplyScalar(.85+e()*.3),n.clone().multiplyScalar(.85+e()*.3));if(h.applyMatrix4(Ft(Math.cos(l)*c,0,Math.sin(l)*c,1,1,1,0,e()*Math.PI*2,0)),s.push(h),e()>.68){const f=r*(.8+e()*.15),p=new Ct(.006*o,.01*o,f,4,1);p.translate(0,f/2,0),s.push(St(p,Ft(Math.cos(l)*c,0,Math.sin(l)*c),a.clone().multiplyScalar(1.2)));const m=new Ct(.022*o,.022*o,.14*o,7,1);m.translate(0,.07*o,0),s.push(St(m,Ft(Math.cos(l)*c,f*.96,Math.sin(l)*c),new W(5913122)))}}return $s(t,s,Ks(),!1),t}function Zc(o=1){const t=Xt(Math.floor(o*2027)+11),e=(1.8+t()*1.4)*o,s=(.17+t()*.06)*o,n=new W(5652526),a=[],i=Xs(e,s*1.05,s*.85,n,0);i.rotateZ(-Math.PI/2),i.translate(-e/2,s*.82,0),a.push(i);const r=new es(s*.85,14);a.push(St(r,Ft(e/2+.002,s*.82,0,1,1,1,0,Math.PI/2,0),new W(12096874)));const l=new va(s*.35,s*.4,14);a.push(St(l,Ft(e/2+.004,s*.82,0,1,1,1,0,Math.PI/2,0),new W(9070660)));for(let p=0;p<2;p++){const m=new Ct(s*.12,s*.2,s*1.1,6,1);m.translate(0,s*.55,0),a.push(St(m,Ft((t()-.5)*e*.6,s*1.3,(t()>.5?1:-1)*s*.5,1,1,1,(t()-.5)*.7,0,(t()-.5)*.8),n.clone().multiplyScalar(.9)))}const c=new W(5075768);for(let p=0;p<4;p++){const m=s*(.35+t()*.3);a.push(St(Lr(Math.floor(t()*3)+1,1,.3),Ft((t()-.5)*e*.8,s*1.62,(t()-.5)*s*.8,m*1.3,m*.45,m),c.clone().multiplyScalar(.8+t()*.4),(u,v)=>.75+.25*$.clamp(.5+.5*v,0,1)))}const h=Yt(a,!1),f=new Y(h,Ks());return f.rotation.y=t()*Math.PI,f.castShadow=!0,f.receiveShadow=!0,f}const In=new Map;function Hr(o){let t=In.get(o);if(!t){const e=new wa(1,o);e.deleteAttribute("normal"),e.deleteAttribute("uv"),t=Ye(e,1e-4),e.dispose(),In.set(o,t)}return t}function Ln(o,t){const e=Hr(t.detail).clone(),s=e.attributes.position,n=[];for(let m=0;m<t.cuts;m++){const u=new C(o()-.5,o()*1.1-.3,o()-.5).normalize();n.push({n:u,d:.6+o()*.22})}const a=new C((o()-.5)*.55,1,(o()-.5)*.55).normalize(),i=3.2+o()*2.2,r=o()*4,l=new C,c=-.56;for(let m=0;m<s.count;m++){l.fromBufferAttribute(s,m),l.multiplyScalar(1+vo(l.x*1.4,l.y*1.4,l.z*1.4,t.seed)*.2);for(const x of n){const y=l.dot(x.n);y>x.d&&l.addScaledVector(x.n,x.d-y)}const v=l.dot(a)*i+r,w=v-Math.floor(v),g=1+(Math.floor(v)+$.smoothstep(w,.62,1)-v)/i*.55*t.strata;l.x*=g,l.z*=g,l.multiplyScalar(1+vo(l.x*7,l.y*7,l.z*7,t.seed+5)*.035),l.y<c&&(l.y=c),s.setXYZ(m,l.x*t.rx,(l.y-c)*t.ry,l.z*t.rz)}e.computeVertexNormals();const h=e.attributes.normal,f=new Float32Array(s.count*3),p=new Float32Array(s.count*2);for(let m=0;m<s.count;m++){const u=.9+.2*(.5+vo(s.getX(m)*5,s.getY(m)*5,s.getZ(m)*5,t.seed+9));f[m*3]=t.tone.r*u,f[m*3+1]=t.tone.g*u,f[m*3+2]=t.tone.b*u;const v=Math.abs(h.getX(m)),w=Math.abs(h.getY(m)),M=Math.abs(h.getZ(m));w>=v&&w>=M?(p[m*2]=s.getX(m),p[m*2+1]=s.getZ(m)):v>=M?(p[m*2]=s.getZ(m),p[m*2+1]=s.getY(m)):(p[m*2]=s.getX(m),p[m*2+1]=s.getY(m))}return e.setAttribute("color",new ct(f,3)),e.setAttribute("uv",new ct(p,2)),e}function qc(o=1){const t=Xt(Math.floor(o*9973)+17),e=[],s=new W().setHSL(.09+(t()-.5)*.08,.04+t()*.05,.86+(t()-.5)*.12),n=1+Math.floor(t()*2.4);for(let l=0;l<n;l++){const c=(l===0?.55:.2+t()*.22)*o,h=t()*Math.PI*2,f=l===0?0:(.55+t()*.3)*o,p=Ln(t,{detail:l===0?6:4,seed:11+l*5+Math.floor(t()*40),rx:c*(1.05+t()*.25),ry:c*(.82+t()*.3),rz:c*(.9+t()*.25),cuts:4+Math.floor(t()*4),strata:.6+t()*.5,tone:s.clone().offsetHSL(0,0,(t()-.5)*.07)}),m=new et().compose(new C(Math.cos(h)*f,0,Math.sin(h)*f),new Ue().setFromEuler(new os(l===0?0:(t()-.5)*.2,t()*6.28,l===0?0:(t()-.5)*.2)),new C(1,1,1));p.applyMatrix4(m),e.push(p)}const a=2+Math.floor(t()*3);for(let l=0;l<a;l++){const c=(.05+t()*.06)*o,h=t()*Math.PI*2,f=(.6+t()*.5)*o,p=Ln(t,{detail:2,seed:40+l,rx:c*1.2,ry:c*.8,rz:c,cuts:3,strata:.2,tone:s.clone().offsetHSL(0,0,(t()-.5)*.1)});p.rotateY(t()*6.28),p.translate(Math.cos(h)*f,0,Math.sin(h)*f),e.push(p)}const i=Yt(e,!1);for(const l of e)l.dispose();const r=new Y(i,br());return r.castShadow=!0,r.receiveShadow=!0,r}function Qc(o){const t=new gt,e=new W(9210756),s=[],n=(h,f,p=e,m=1,u=1,v=1)=>{s.push(St(h,Ft(0,f,0,m,u,v),p,(w,M)=>.78+.22*$.clamp(.5+.5*M,0,1)))};n(new Se(.46,.14,.46,1,.03),.07),n(new Ct(.075,.1,.62,10),.45),n(new Se(.34,.08,.34,1,.025),.8);for(const[h,f]of[[-.13,-.13],[.13,-.13],[-.13,.13],[.13,.13]])s.push(St(new Mo(.045,.34,.045),Ft(h,1.02,f),e.clone().multiplyScalar(.9)));n(new Se(.4,.07,.4,1,.025),1.22);const a=new to(.34,.24,4,1);s.push(St(a,Ft(0,1.38,0,1,1,1,0,Math.PI/4,0),e.clone().multiplyScalar(.85))),n(new xt(.05,10,8),1.55);const i=new Y(Yt(s,!1),Ba(.9,"lantern"));i.castShadow=!0,i.receiveShadow=!0;const r=Y0(o,.9),l=new Y(new Mo(.2,.3,.2),r);l.position.y=1.02;const c=new ga(o,.8,6);return c.position.y=1.05,t.add(i,l,c),t}function Jc(){const o=[],t=new Ct(.004,.006,.26,4,1);t.translate(0,.13,0),o.push(St(t,Ft(0,0,0),new W(.2,.34,.12)));for(let s=0;s<6;s++){const n=new es(1,7);n.scale(.022,.044,1),n.translate(0,.046,0),n.rotateX(-Math.PI/2),o.push(St(n,xo(0,.27,0,s/6*Math.PI*2,-.45),new W(1,1,1)))}o.push(St(new xt(.014,6,5),Ft(0,.275,0),new W(1,.82,.25)));const e=new At(.07,.022,2,1);return e.translate(.035,0,0),e.rotateX(-Math.PI/2),o.push(St(e,xo(0,.07,0,.6,.4),new W(.22,.4,.14))),o.push(St(e,xo(0,.1,0,3.5,.4),new W(.22,.4,.14))),Yt(o,!1)}function ja(o,t,e=26){const s=Xt(o),n=[];for(let a=0;a<e;a++){const i=new C(s()-.5,s()*.7-.1,s()-.5).normalize();n.push(Wr(i.multiplyScalar(t*(.35+s()*.65)),t*(.7+s()*.5),s,i.y))}return n}function t1(o,t,e){const s=ja(o,t,e),n=Yt(s,!1);for(const a of s)a.dispose();return n}function e1(o=1,t="high"){const e=Br(o,t);e.updateMatrixWorld(!0);const s=[];return e.traverse(n=>{const a=n;if(!a.isMesh)return;const i=a.geometry.clone();i.applyMatrix4(a.matrixWorld),s.push({geometry:i,material:a.material}),a.geometry.dispose()}),s}const ie={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

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


		}`};class pe{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}}const jr=new Ai(-1,1,1,-1,0,1);class $r extends Gt{constructor(){super(),this.setAttribute("position",new vt([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new vt([0,2,0,0,2,0],2))}}const Xr=new $r;class Ge{constructor(t){this._mesh=new Y(Xr,t)}dispose(){this._mesh.geometry.dispose()}render(t){t.render(this._mesh,jr)}get material(){return this._mesh.material}set material(t){this._mesh.material=t}}class Zs extends pe{constructor(t,e="tDiffuse"){super(),this.textureID=e,this.uniforms=null,this.material=null,t instanceof wt?(this.uniforms=t.uniforms,this.material=t):t&&(this.uniforms=Nt.clone(t.uniforms),this.material=new wt({name:t.name!==void 0?t.name:"unspecified",defines:Object.assign({},t.defines),uniforms:this.uniforms,vertexShader:t.vertexShader,fragmentShader:t.fragmentShader})),this._fsQuad=new Ge(this.material)}render(t,e,s){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=s.texture),this._fsQuad.material=this.material,this.renderToScreen?(t.setRenderTarget(null),this._fsQuad.render(t)):(t.setRenderTarget(e),this.clear&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),this._fsQuad.render(t))}dispose(){this.material.dispose(),this._fsQuad.dispose()}}class Un extends pe{constructor(t,e){super(),this.scene=t,this.camera=e,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(t,e,s){const n=t.getContext(),a=t.state;a.buffers.color.setMask(!1),a.buffers.depth.setMask(!1),a.buffers.color.setLocked(!0),a.buffers.depth.setLocked(!0);let i,r;this.inverse?(i=0,r=1):(i=1,r=0),a.buffers.stencil.setTest(!0),a.buffers.stencil.setOp(n.REPLACE,n.REPLACE,n.REPLACE),a.buffers.stencil.setFunc(n.ALWAYS,i,4294967295),a.buffers.stencil.setClear(r),a.buffers.stencil.setLocked(!0),t.setRenderTarget(s),this.clear&&t.clear(),t.render(this.scene,this.camera),t.setRenderTarget(e),this.clear&&t.clear(),t.render(this.scene,this.camera),a.buffers.color.setLocked(!1),a.buffers.depth.setLocked(!1),a.buffers.color.setMask(!0),a.buffers.depth.setMask(!0),a.buffers.stencil.setLocked(!1),a.buffers.stencil.setFunc(n.EQUAL,1,4294967295),a.buffers.stencil.setOp(n.KEEP,n.KEEP,n.KEEP),a.buffers.stencil.setLocked(!0)}}class Yr extends pe{constructor(){super(),this.needsSwap=!1}render(t){t.state.buffers.stencil.setLocked(!1),t.state.buffers.stencil.setTest(!1)}}class Kr{constructor(t,e){if(this.renderer=t,this._pixelRatio=t.getPixelRatio(),e===void 0){const s=t.getSize(new ut);this._width=s.width,this._height=s.height,e=new Rt(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:It}),e.texture.name="EffectComposer.rt1"}else this._width=e.width,this._height=e.height;this.renderTarget1=e,this.renderTarget2=e.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new Zs(ie),this.copyPass.material.blending=yt,this.timer=new _i}swapBuffers(){const t=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=t}addPass(t){this.passes.push(t),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(t,e){this.passes.splice(e,0,t),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(t){const e=this.passes.indexOf(t);e!==-1&&this.passes.splice(e,1)}isLastEnabledPass(t){for(let e=t+1;e<this.passes.length;e++)if(this.passes[e].enabled)return!1;return!0}render(t){this.timer.update(),t===void 0&&(t=this.timer.getDelta());const e=this.renderer.getRenderTarget();let s=!1;for(let n=0,a=this.passes.length;n<a;n++){const i=this.passes[n];if(i.enabled!==!1){if(i.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(n),i.render(this.renderer,this.writeBuffer,this.readBuffer,t,s),i.needsSwap){if(s){const r=this.renderer.getContext(),l=this.renderer.state.buffers.stencil;l.setFunc(r.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,t),l.setFunc(r.EQUAL,1,4294967295)}this.swapBuffers()}Un!==void 0&&(i instanceof Un?s=!0:i instanceof Yr&&(s=!1))}}this.renderer.setRenderTarget(e)}reset(t){if(t===void 0){const e=this.renderer.getSize(new ut);this._pixelRatio=this.renderer.getPixelRatio(),this._width=e.width,this._height=e.height,t=this.renderTarget1.clone(),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=t,this.renderTarget2=t.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(t,e){this._width=t,this._height=e;const s=this._width*this._pixelRatio,n=this._height*this._pixelRatio;this.renderTarget1.setSize(s,n),this.renderTarget2.setSize(s,n);for(let a=0;a<this.passes.length;a++)this.passes[a].setSize(s,n)}setPixelRatio(t){this._pixelRatio=t,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}}class Zr extends pe{constructor(t,e,s=null,n=null,a=null){super(),this.scene=t,this.camera=e,this.overrideMaterial=s,this.clearColor=n,this.clearAlpha=a,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this.isRenderPass=!0,this._oldClearColor=new W}render(t,e,s){const n=t.autoClear;t.autoClear=!1;let a,i;this.overrideMaterial!==null&&(i=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(t.getClearColor(this._oldClearColor),t.setClearColor(this.clearColor,t.getClearAlpha())),this.clearAlpha!==null&&(a=t.getClearAlpha(),t.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&t.clearDepth(),t.setRenderTarget(this.renderToScreen?null:s),this.clear===!0&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),t.render(this.scene,this.camera),this.clearColor!==null&&t.setClearColor(this._oldClearColor),this.clearAlpha!==null&&t.setClearAlpha(a),this.overrideMaterial!==null&&(this.scene.overrideMaterial=i),t.autoClear=n}}const qr={uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new W(0)},defaultOpacity:{value:0}},vertexShader:`

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

		}`};class Ze extends pe{constructor(t,e=1,s,n){super(),this.strength=e,this.radius=s,this.threshold=n,this.resolution=t!==void 0?new ut(t.x,t.y):new ut(256,256),this.clearColor=new W(0,0,0),this.needsSwap=!1,this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let a=Math.round(this.resolution.x/2),i=Math.round(this.resolution.y/2);this.renderTargetBright=new Rt(a,i,{type:It}),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let h=0;h<this.nMips;h++){const f=new Rt(a,i,{type:It});f.texture.name="UnrealBloomPass.h"+h,f.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(f);const p=new Rt(a,i,{type:It});p.texture.name="UnrealBloomPass.v"+h,p.texture.generateMipmaps=!1,this.renderTargetsVertical.push(p),a=Math.round(a/2),i=Math.round(i/2)}const r=qr;this.highPassUniforms=Nt.clone(r.uniforms),this.highPassUniforms.luminosityThreshold.value=n,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new wt({uniforms:this.highPassUniforms,vertexShader:r.vertexShader,fragmentShader:r.fragmentShader}),this.separableBlurMaterials=[];const l=[6,10,14,18,22];a=Math.round(this.resolution.x/2),i=Math.round(this.resolution.y/2);for(let h=0;h<this.nMips;h++)this.separableBlurMaterials.push(this._getSeparableBlurMaterial(l[h])),this.separableBlurMaterials[h].uniforms.invSize.value=new ut(1/a,1/i),a=Math.round(a/2),i=Math.round(i/2);this.compositeMaterial=this._getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=e,this.compositeMaterial.uniforms.bloomRadius.value=.1;const c=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=c,this.bloomTintColors=[new C(1,1,1),new C(1,1,1),new C(1,1,1),new C(1,1,1),new C(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,this.copyUniforms=Nt.clone(ie.uniforms),this.blendMaterial=new wt({uniforms:this.copyUniforms,vertexShader:ie.vertexShader,fragmentShader:ie.fragmentShader,premultipliedAlpha:!0,blending:Pi,depthTest:!1,depthWrite:!1,transparent:!0}),this._oldClearColor=new W,this._oldClearAlpha=1,this._basic=new yo,this._fsQuad=new Ge(null)}dispose(){for(let t=0;t<this.renderTargetsHorizontal.length;t++)this.renderTargetsHorizontal[t].dispose();for(let t=0;t<this.renderTargetsVertical.length;t++)this.renderTargetsVertical[t].dispose();this.renderTargetBright.dispose();for(let t=0;t<this.separableBlurMaterials.length;t++)this.separableBlurMaterials[t].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this._basic.dispose(),this._fsQuad.dispose()}setSize(t,e){let s=Math.round(t/2),n=Math.round(e/2);this.renderTargetBright.setSize(s,n);for(let a=0;a<this.nMips;a++)this.renderTargetsHorizontal[a].setSize(s,n),this.renderTargetsVertical[a].setSize(s,n),this.separableBlurMaterials[a].uniforms.invSize.value=new ut(1/s,1/n),s=Math.round(s/2),n=Math.round(n/2)}render(t,e,s,n,a){t.getClearColor(this._oldClearColor),this._oldClearAlpha=t.getClearAlpha();const i=t.autoClear;t.autoClear=!1,t.setClearColor(this.clearColor,0),a&&t.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this._fsQuad.material=this._basic,this._basic.map=s.texture,t.setRenderTarget(null),t.clear(),this._fsQuad.render(t)),this.highPassUniforms.tDiffuse.value=s.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this._fsQuad.material=this.materialHighPassFilter,t.setRenderTarget(this.renderTargetBright),t.clear(),this._fsQuad.render(t);let r=this.renderTargetBright;for(let l=0;l<this.nMips;l++)this._fsQuad.material=this.separableBlurMaterials[l],this.separableBlurMaterials[l].uniforms.colorTexture.value=r.texture,this.separableBlurMaterials[l].uniforms.direction.value=Ze.BlurDirectionX,t.setRenderTarget(this.renderTargetsHorizontal[l]),t.clear(),this._fsQuad.render(t),this.separableBlurMaterials[l].uniforms.colorTexture.value=this.renderTargetsHorizontal[l].texture,this.separableBlurMaterials[l].uniforms.direction.value=Ze.BlurDirectionY,t.setRenderTarget(this.renderTargetsVertical[l]),t.clear(),this._fsQuad.render(t),r=this.renderTargetsVertical[l];this._fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,t.setRenderTarget(this.renderTargetsHorizontal[0]),t.clear(),this._fsQuad.render(t),this._fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,a&&t.state.buffers.stencil.setTest(!0),this.renderToScreen?(t.setRenderTarget(null),this._fsQuad.render(t)):(t.setRenderTarget(s),this._fsQuad.render(t)),t.setClearColor(this._oldClearColor,this._oldClearAlpha),t.autoClear=i}_getSeparableBlurMaterial(t){const e=[],s=t/3;for(let n=0;n<t;n++)e.push(.39894*Math.exp(-.5*n*n/(s*s))/s);return new wt({defines:{KERNEL_RADIUS:t},uniforms:{colorTexture:{value:null},invSize:{value:new ut(.5,.5)},direction:{value:new ut(.5,.5)},gaussianCoefficients:{value:e}},vertexShader:`

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

				}`})}_getCompositeMaterial(t){return new wt({defines:{NUM_MIPS:t},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`

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

				}`})}}Ze.BlurDirectionX=new ut(1,0);Ze.BlurDirectionY=new ut(0,1);const oe={defines:{MAX_STEP:0,PERSPECTIVE_CAMERA:!0,DISTANCE_ATTENUATION:!0,FRESNEL:!0,INFINITE_THICK:!1,SELECTIVE:!1},uniforms:{tDiffuse:{value:null},tNormal:{value:null},tMetalness:{value:null},tDepth:{value:null},cameraNear:{value:null},cameraFar:{value:null},resolution:{value:new ut},cameraProjectionMatrix:{value:new et},cameraInverseProjectionMatrix:{value:new et},opacity:{value:.5},maxDistance:{value:180},cameraRange:{value:0},thickness:{value:.018}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}

	`,fragmentShader:`
		// precision highp float;
		precision highp sampler2D;
		varying vec2 vUv;
		uniform sampler2D tDepth;
		uniform sampler2D tNormal;
		uniform sampler2D tMetalness;
		uniform sampler2D tDiffuse;
		uniform float cameraRange;
		uniform vec2 resolution;
		uniform float opacity;
		uniform float cameraNear;
		uniform float cameraFar;
		uniform float maxDistance;
		uniform float thickness;
		uniform mat4 cameraProjectionMatrix;
		uniform mat4 cameraInverseProjectionMatrix;
		#include <packing>
		float pointToLineDistance(vec3 x0, vec3 x1, vec3 x2) {
			//x0: point, x1: linePointA, x2: linePointB
			//https://mathworld.wolfram.com/Point-LineDistance3-Dimensional.html
			return length(cross(x0-x1,x0-x2))/length(x2-x1);
		}
		float pointPlaneDistance(vec3 point,vec3 planePoint,vec3 planeNormal){
			// https://mathworld.wolfram.com/Point-PlaneDistance.html
			//// https://en.wikipedia.org/wiki/Plane_(geometry)
			//// http://paulbourke.net/geometry/pointlineplane/
			float a=planeNormal.x,b=planeNormal.y,c=planeNormal.z;
			float x0=point.x,y0=point.y,z0=point.z;
			float x=planePoint.x,y=planePoint.y,z=planePoint.z;
			float d=-(a*x+b*y+c*z);
			float distance=a*x0+b*y0+c*z0+d;
			return distance;
		}
		float getDepth( const in vec2 uv ) {
			return texture2D( tDepth, uv ).x;
		}
		float getViewZ( const in float depth ) {
			#ifdef PERSPECTIVE_CAMERA
				return perspectiveDepthToViewZ( depth, cameraNear, cameraFar );
			#else
				return orthographicDepthToViewZ( depth, cameraNear, cameraFar );
			#endif
		}
		vec3 getViewPosition( const in vec2 uv, const in float depth/*clip space*/, const in float clipW ) {
			vec4 clipPosition = vec4( ( vec3( uv, depth ) - 0.5 ) * 2.0, 1.0 );//ndc
			clipPosition *= clipW; //clip
			return ( cameraInverseProjectionMatrix * clipPosition ).xyz;//view
		}
		vec3 getViewNormal( const in vec2 uv ) {
			return unpackRGBToNormal( texture2D( tNormal, uv ).xyz );
		}
		vec2 viewPositionToXY(vec3 viewPosition){
			vec2 xy;
			vec4 clip=cameraProjectionMatrix*vec4(viewPosition,1);
			xy=clip.xy;//clip
			float clipW=clip.w;
			xy/=clipW;//NDC
			xy=(xy+1.)/2.;//uv
			xy*=resolution;//screen
			return xy;
		}
		void main(){
			#ifdef SELECTIVE
				float metalness=texture2D(tMetalness,vUv).r;
				if(metalness==0.) return;
			#endif

			float depth = getDepth( vUv );
			float viewZ = getViewZ( depth );
			if(-viewZ>=cameraFar) return;

			float clipW = cameraProjectionMatrix[2][3] * viewZ+cameraProjectionMatrix[3][3];
			vec3 viewPosition=getViewPosition( vUv, depth, clipW );

			vec2 d0=gl_FragCoord.xy;
			vec2 d1;

			vec3 viewNormal=getViewNormal( vUv );

			#ifdef PERSPECTIVE_CAMERA
				vec3 viewIncidentDir=normalize(viewPosition);
				vec3 viewReflectDir=reflect(viewIncidentDir,viewNormal);
			#else
				vec3 viewIncidentDir=vec3(0,0,-1);
				vec3 viewReflectDir=reflect(viewIncidentDir,viewNormal);
			#endif

			float maxReflectRayLen=maxDistance/dot(-viewIncidentDir,viewNormal);
			// dot(a,b)==length(a)*length(b)*cos(theta) // https://www.mathsisfun.com/algebra/vectors-dot-product.html
			// if(a.isNormalized&&b.isNormalized) dot(a,b)==cos(theta)
			// maxDistance/maxReflectRayLen=cos(theta)
			// maxDistance/maxReflectRayLen==dot(a,b)
			// maxReflectRayLen==maxDistance/dot(a,b)

			vec3 d1viewPosition=viewPosition+viewReflectDir*maxReflectRayLen;
			#ifdef PERSPECTIVE_CAMERA
				if(d1viewPosition.z>-cameraNear){
					//https://tutorial.math.lamar.edu/Classes/CalcIII/EqnsOfLines.aspx
					float t=(-cameraNear-viewPosition.z)/viewReflectDir.z;
					d1viewPosition=viewPosition+viewReflectDir*t;
				}
			#endif
			d1=viewPositionToXY(d1viewPosition);

			float xLen=d1.x-d0.x;
			float yLen=d1.y-d0.y;
			float totalStep=max(abs(xLen),abs(yLen));
			float xSpan=xLen/totalStep;
			float ySpan=yLen/totalStep;
			float sStep=1./totalStep;
			float s=sStep; // start at sStep since loop starts at i=1
			for(float i=1.;i<float(MAX_STEP);i++){
				if(i>=totalStep) break;
				vec2 xy=vec2(d0.x+i*xSpan,d0.y+i*ySpan);
				if(xy.x<0.||xy.x>resolution.x||xy.y<0.||xy.y>resolution.y) break;
				vec2 uv=xy/resolution;

				float d = getDepth(uv);
				float vZ = getViewZ( d );
				if(-vZ>=cameraFar) continue;
				float cW = cameraProjectionMatrix[2][3] * vZ+cameraProjectionMatrix[3][3];
				vec3 vP=getViewPosition( uv, d, cW );

				#ifdef PERSPECTIVE_CAMERA
					// https://comp.nus.edu.sg/~lowkl/publications/lowk_persp_interp_techrep.pdf
					float recipVPZ=1./viewPosition.z;
					float viewReflectRayZ=1./(recipVPZ+s*(1./d1viewPosition.z-recipVPZ));
				#else
					float viewReflectRayZ=viewPosition.z+s*(d1viewPosition.z-viewPosition.z);
				#endif

				// if(viewReflectRayZ>vZ) continue; // will cause "npm run make-screenshot webgl_postprocessing_ssr" high probability hang.
				// https://github.com/mrdoob/three.js/pull/21539#issuecomment-821061164
				if(viewReflectRayZ<=vZ){

					bool hit;
					#ifdef INFINITE_THICK
						hit=true;
					#else
						float away=pointToLineDistance(vP,viewPosition,d1viewPosition);

						float minThickness;
						vec2 xyNeighbor=xy;
						xyNeighbor.x+=1.;
						vec2 uvNeighbor=xyNeighbor/resolution;
						vec3 vPNeighbor=getViewPosition(uvNeighbor,d,cW);
						minThickness=vPNeighbor.x-vP.x;
						minThickness*=3.;
						float tk=max(minThickness,thickness);

						hit=away<=tk;
					#endif

					if(hit){
						vec3 vN=getViewNormal( uv );
						if(dot(viewReflectDir,vN)>=0.) break; // treat backfaces as opaque
						float distance=pointPlaneDistance(vP,viewPosition,viewNormal);
						if(distance>maxDistance) break;
						float op=opacity;
						#ifdef DISTANCE_ATTENUATION
							float ratio=1.-(distance/maxDistance);
							float attenuation=ratio*ratio;
							op=opacity*attenuation;
						#endif
						#ifdef FRESNEL
							float fresnelCoe=(dot(viewIncidentDir,viewReflectDir)+1.)/2.;
							op*=fresnelCoe;
						#endif
						vec4 reflectColor=texture2D(tDiffuse,uv);
						gl_FragColor.xyz=reflectColor.xyz;
						gl_FragColor.a=op;
						break;
					}
				}
				s+=sStep;
			}
		}
	`},zo={defines:{PERSPECTIVE_CAMERA:1},uniforms:{tDepth:{value:null},cameraNear:{value:null},cameraFar:{value:null}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}

	`,fragmentShader:`

		uniform sampler2D tDepth;

		uniform float cameraNear;
		uniform float cameraFar;

		varying vec2 vUv;

		#include <packing>

		float getLinearDepth( const in vec2 uv ) {

			#if PERSPECTIVE_CAMERA == 1

				float fragCoordZ = texture2D( tDepth, uv ).x;
				float viewZ = perspectiveDepthToViewZ( fragCoordZ, cameraNear, cameraFar );
				return viewZToOrthographicDepth( viewZ, cameraNear, cameraFar );

			#else

				return texture2D( tDepth, uv ).x;

			#endif

		}

		void main() {

			float depth = getLinearDepth( vUv );
			float d = 1.0 - depth;
			// d=(d-.999)*1000.;
			gl_FragColor = vec4( vec3( d ), 1.0 );

		}

	`},ge={uniforms:{tDiffuse:{value:null},resolution:{value:new ut},opacity:{value:.5}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}

	`,fragmentShader:`

		uniform sampler2D tDiffuse;
		uniform vec2 resolution;
		varying vec2 vUv;
		void main() {
			//reverse engineering from PhotoShop blur filter, then change coefficient

			vec2 texelSize = ( 1.0 / resolution );

			vec4 c=texture2D(tDiffuse,vUv);

			vec2 offset;

			offset=(vec2(-1,0))*texelSize;
			vec4 cl=texture2D(tDiffuse,vUv+offset);

			offset=(vec2(1,0))*texelSize;
			vec4 cr=texture2D(tDiffuse,vUv+offset);

			offset=(vec2(0,-1))*texelSize;
			vec4 cb=texture2D(tDiffuse,vUv+offset);

			offset=(vec2(0,1))*texelSize;
			vec4 ct=texture2D(tDiffuse,vUv+offset);

			// float coeCenter=.5;
			// float coeSide=.125;
			float coeCenter=.2;
			float coeSide=.2;
			float a=c.a*coeCenter+cl.a*coeSide+cr.a*coeSide+cb.a*coeSide+ct.a*coeSide;
			vec3 rgb=(c.rgb*c.a*coeCenter+cl.rgb*cl.a*coeSide+cr.rgb*cr.a*coeSide+cb.rgb*cb.a*coeSide+ct.rgb*ct.a*coeSide)/a;
			gl_FragColor=vec4(rgb,a);

		}
	`};class he extends pe{constructor({renderer:t,scene:e,camera:s,width:n=512,height:a=512,selects:i=null,bouncing:r=!1,groundReflector:l=null}){super(),this.width=n,this.height=a,this.clear=!0,this.renderer=t,this.scene=e,this.camera=s,this.groundReflector=l,this.opacity=oe.uniforms.opacity.value,this.output=0,this.maxDistance=oe.uniforms.maxDistance.value,this.thickness=oe.uniforms.thickness.value,this.tempColor=new W,this._selects=i,this._resolutionScale=1,this.selective=Array.isArray(this._selects),Object.defineProperty(this,"selects",{get(){return this._selects},set(h){this._selects!==h&&(this._selects=h,Array.isArray(h)?(this.selective=!0,this.ssrMaterial.defines.SELECTIVE=!0,this.ssrMaterial.needsUpdate=!0):(this.selective=!1,this.ssrMaterial.defines.SELECTIVE=!1,this.ssrMaterial.needsUpdate=!0))}}),this._bouncing=r,Object.defineProperty(this,"bouncing",{get(){return this._bouncing},set(h){this._bouncing!==h&&(this._bouncing=h,h?this.ssrMaterial.uniforms.tDiffuse.value=this.prevRenderTarget.texture:this.ssrMaterial.uniforms.tDiffuse.value=this.beautyRenderTarget.texture)}}),this.blur=!0,this._distanceAttenuation=oe.defines.DISTANCE_ATTENUATION,Object.defineProperty(this,"distanceAttenuation",{get(){return this._distanceAttenuation},set(h){this._distanceAttenuation!==h&&(this._distanceAttenuation=h,this.ssrMaterial.defines.DISTANCE_ATTENUATION=h,this.ssrMaterial.needsUpdate=!0)}}),this._fresnel=oe.defines.FRESNEL,Object.defineProperty(this,"fresnel",{get(){return this._fresnel},set(h){this._fresnel!==h&&(this._fresnel=h,this.ssrMaterial.defines.FRESNEL=h,this.ssrMaterial.needsUpdate=!0)}}),this._infiniteThick=oe.defines.INFINITE_THICK,Object.defineProperty(this,"infiniteThick",{get(){return this._infiniteThick},set(h){this._infiniteThick!==h&&(this._infiniteThick=h,this.ssrMaterial.defines.INFINITE_THICK=h,this.ssrMaterial.needsUpdate=!0)}});const c=new Os;c.type=Di,c.minFilter=Ut,c.magFilter=Ut,this.beautyRenderTarget=new Rt(this.width,this.height,{minFilter:Ut,magFilter:Ut,type:It,depthTexture:c,depthBuffer:!0}),this.prevRenderTarget=new Rt(this.width,this.height,{minFilter:Ut,magFilter:Ut}),this.normalRenderTarget=new Rt(this.width,this.height,{minFilter:Ut,magFilter:Ut,type:It}),this.metalnessRenderTarget=new Rt(this.width,this.height,{minFilter:Ut,magFilter:Ut,type:It}),this.ssrRenderTarget=new Rt(this.width,this.height,{minFilter:Ut,magFilter:Ut}),this.blurRenderTarget=this.ssrRenderTarget.clone(),this.blurRenderTarget2=this.ssrRenderTarget.clone(),this.ssrMaterial=new wt({defines:Object.assign({},oe.defines,{MAX_STEP:Math.sqrt(this.width*this.width+this.height*this.height)}),uniforms:Nt.clone(oe.uniforms),vertexShader:oe.vertexShader,fragmentShader:oe.fragmentShader,blending:yt}),this.ssrMaterial.uniforms.tDiffuse.value=this.beautyRenderTarget.texture,this.ssrMaterial.uniforms.tNormal.value=this.normalRenderTarget.texture,this.ssrMaterial.defines.SELECTIVE=this.selective,this.ssrMaterial.needsUpdate=!0,this.ssrMaterial.uniforms.tMetalness.value=this.metalnessRenderTarget.texture,this.ssrMaterial.uniforms.tDepth.value=this.beautyRenderTarget.depthTexture,this.ssrMaterial.uniforms.cameraNear.value=this.camera.near,this.ssrMaterial.uniforms.cameraFar.value=this.camera.far,this.ssrMaterial.uniforms.thickness.value=this.thickness,this.ssrMaterial.uniforms.resolution.value.set(this.width,this.height),this.ssrMaterial.uniforms.cameraProjectionMatrix.value.copy(this.camera.projectionMatrix),this.ssrMaterial.uniforms.cameraInverseProjectionMatrix.value.copy(this.camera.projectionMatrixInverse),this.normalMaterial=new Ma,this.normalMaterial.blending=yt,this.metalnessOnMaterial=new yo({color:"white"}),this.metalnessOffMaterial=new yo({color:"black"}),this.blurMaterial=new wt({defines:Object.assign({},ge.defines),uniforms:Nt.clone(ge.uniforms),vertexShader:ge.vertexShader,fragmentShader:ge.fragmentShader}),this.blurMaterial.uniforms.tDiffuse.value=this.ssrRenderTarget.texture,this.blurMaterial.uniforms.resolution.value.set(this.width,this.height),this.blurMaterial2=new wt({defines:Object.assign({},ge.defines),uniforms:Nt.clone(ge.uniforms),vertexShader:ge.vertexShader,fragmentShader:ge.fragmentShader}),this.blurMaterial2.uniforms.tDiffuse.value=this.blurRenderTarget.texture,this.blurMaterial2.uniforms.resolution.value.set(this.width,this.height),this.depthRenderMaterial=new wt({defines:Object.assign({},zo.defines),uniforms:Nt.clone(zo.uniforms),vertexShader:zo.vertexShader,fragmentShader:zo.fragmentShader,blending:yt}),this.depthRenderMaterial.uniforms.tDepth.value=this.beautyRenderTarget.depthTexture,this.depthRenderMaterial.uniforms.cameraNear.value=this.camera.near,this.depthRenderMaterial.uniforms.cameraFar.value=this.camera.far,this.copyMaterial=new wt({uniforms:Nt.clone(ie.uniforms),vertexShader:ie.vertexShader,fragmentShader:ie.fragmentShader,transparent:!0,depthTest:!1,depthWrite:!1,blendSrc:nn,blendDst:sn,blendEquation:je,blendSrcAlpha:nn,blendDstAlpha:sn,blendEquationAlpha:je}),this.fsQuad=new Ge(null),this.originalClearColor=new W}get resolutionScale(){return this._resolutionScale}set resolutionScale(t){this._resolutionScale=t,this.setSize(this.width,this.height)}dispose(){this.beautyRenderTarget.dispose(),this.prevRenderTarget.dispose(),this.normalRenderTarget.dispose(),this.metalnessRenderTarget.dispose(),this.ssrRenderTarget.dispose(),this.blurRenderTarget.dispose(),this.blurRenderTarget2.dispose(),this.normalMaterial.dispose(),this.metalnessOnMaterial.dispose(),this.metalnessOffMaterial.dispose(),this.blurMaterial.dispose(),this.blurMaterial2.dispose(),this.copyMaterial.dispose(),this.depthRenderMaterial.dispose(),this.fsQuad.dispose()}render(t,e){switch(t.setRenderTarget(this.beautyRenderTarget),t.clear(),this.groundReflector&&(this.groundReflector.visible=!1,this.groundReflector.doRender(this.renderer,this.scene,this.camera),this.groundReflector.visible=!0),t.render(this.scene,this.camera),this.groundReflector&&(this.groundReflector.visible=!1),this._renderOverride(t,this.normalMaterial,this.normalRenderTarget,0,0),this.selective&&this._renderMetalness(t,this.metalnessOnMaterial,this.metalnessRenderTarget,0,0),this.ssrMaterial.uniforms.opacity.value=this.opacity,this.ssrMaterial.uniforms.maxDistance.value=this.maxDistance,this.ssrMaterial.uniforms.thickness.value=this.thickness,this._renderPass(t,this.ssrMaterial,this.ssrRenderTarget),this.blur&&(this._renderPass(t,this.blurMaterial,this.blurRenderTarget),this._renderPass(t,this.blurMaterial2,this.blurRenderTarget2)),this.output){case he.OUTPUT.Default:this.bouncing?(this.copyMaterial.uniforms.tDiffuse.value=this.beautyRenderTarget.texture,this.copyMaterial.blending=yt,this._renderPass(t,this.copyMaterial,this.prevRenderTarget),this.blur?this.copyMaterial.uniforms.tDiffuse.value=this.blurRenderTarget2.texture:this.copyMaterial.uniforms.tDiffuse.value=this.ssrRenderTarget.texture,this.copyMaterial.blending=fs,this._renderPass(t,this.copyMaterial,this.prevRenderTarget),this.copyMaterial.uniforms.tDiffuse.value=this.prevRenderTarget.texture,this.copyMaterial.blending=yt,this._renderPass(t,this.copyMaterial,this.renderToScreen?null:e)):(this.copyMaterial.uniforms.tDiffuse.value=this.beautyRenderTarget.texture,this.copyMaterial.blending=yt,this._renderPass(t,this.copyMaterial,this.renderToScreen?null:e),this.blur?this.copyMaterial.uniforms.tDiffuse.value=this.blurRenderTarget2.texture:this.copyMaterial.uniforms.tDiffuse.value=this.ssrRenderTarget.texture,this.copyMaterial.blending=fs,this._renderPass(t,this.copyMaterial,this.renderToScreen?null:e));break;case he.OUTPUT.SSR:this.blur?this.copyMaterial.uniforms.tDiffuse.value=this.blurRenderTarget2.texture:this.copyMaterial.uniforms.tDiffuse.value=this.ssrRenderTarget.texture,this.copyMaterial.blending=yt,this._renderPass(t,this.copyMaterial,this.renderToScreen?null:e),this.bouncing&&(this.blur?this.copyMaterial.uniforms.tDiffuse.value=this.blurRenderTarget2.texture:this.copyMaterial.uniforms.tDiffuse.value=this.beautyRenderTarget.texture,this.copyMaterial.blending=yt,this._renderPass(t,this.copyMaterial,this.prevRenderTarget),this.copyMaterial.uniforms.tDiffuse.value=this.ssrRenderTarget.texture,this.copyMaterial.blending=fs,this._renderPass(t,this.copyMaterial,this.prevRenderTarget));break;case he.OUTPUT.Beauty:this.copyMaterial.uniforms.tDiffuse.value=this.beautyRenderTarget.texture,this.copyMaterial.blending=yt,this._renderPass(t,this.copyMaterial,this.renderToScreen?null:e);break;case he.OUTPUT.Depth:this._renderPass(t,this.depthRenderMaterial,this.renderToScreen?null:e);break;case he.OUTPUT.Normal:this.copyMaterial.uniforms.tDiffuse.value=this.normalRenderTarget.texture,this.copyMaterial.blending=yt,this._renderPass(t,this.copyMaterial,this.renderToScreen?null:e);break;case he.OUTPUT.Metalness:this.copyMaterial.uniforms.tDiffuse.value=this.metalnessRenderTarget.texture,this.copyMaterial.blending=yt,this._renderPass(t,this.copyMaterial,this.renderToScreen?null:e);break;default:console.warn("THREE.SSRPass: Unknown output type.")}}setSize(t,e){this.width=t,this.height=e;const s=Math.round(this.resolutionScale*t),n=Math.round(this.resolutionScale*e);this.ssrMaterial.defines.MAX_STEP=Math.sqrt(s*s+n*n),this.ssrMaterial.needsUpdate=!0,this.beautyRenderTarget.setSize(t,e),this.normalRenderTarget.setSize(t,e),this.metalnessRenderTarget.setSize(t,e),this.ssrRenderTarget.setSize(s,n),this.prevRenderTarget.setSize(s,n),this.blurRenderTarget.setSize(s,n),this.blurRenderTarget2.setSize(s,n),this.ssrMaterial.uniforms.resolution.value.set(s,n),this.ssrMaterial.uniforms.cameraProjectionMatrix.value.copy(this.camera.projectionMatrix),this.ssrMaterial.uniforms.cameraInverseProjectionMatrix.value.copy(this.camera.projectionMatrixInverse),this.blurMaterial.uniforms.resolution.value.set(s,n),this.blurMaterial2.uniforms.resolution.value.set(s,n)}_renderPass(t,e,s,n,a){this.originalClearColor.copy(t.getClearColor(this.tempColor));const i=t.getClearAlpha(this.tempColor),r=t.autoClear;t.setRenderTarget(s),t.autoClear=!1,n!=null&&(t.setClearColor(n),t.setClearAlpha(a||0),t.clear()),this.fsQuad.material=e,this.fsQuad.render(t),t.autoClear=r,t.setClearColor(this.originalClearColor),t.setClearAlpha(i)}_renderOverride(t,e,s,n,a){this.originalClearColor.copy(t.getClearColor(this.tempColor));const i=t.getClearAlpha(this.tempColor),r=t.autoClear;t.setRenderTarget(s),t.autoClear=!1,n=e.clearColor||n,a=e.clearAlpha||a,n!=null&&(t.setClearColor(n),t.setClearAlpha(a||0),t.clear()),this.scene.overrideMaterial=e,t.render(this.scene,this.camera),this.scene.overrideMaterial=null,t.autoClear=r,t.setClearColor(this.originalClearColor),t.setClearAlpha(i)}_renderMetalness(t,e,s,n,a){this.originalClearColor.copy(t.getClearColor(this.tempColor));const i=t.getClearAlpha(this.tempColor),r=t.autoClear,l=this.scene.background,c=this.scene.fog;t.setRenderTarget(s),t.autoClear=!1,this.scene.background=null,this.scene.fog=null,n=e.clearColor||n,a=e.clearAlpha||a,n!=null&&(t.setClearColor(n),t.setClearAlpha(a||0),t.clear()),this.scene.traverseVisible(h=>{h._SSRPassBackupMaterial=h.material,this._selects.includes(h)?h.material=this.metalnessOnMaterial:h.material=this.metalnessOffMaterial}),t.render(this.scene,this.camera),this.scene.traverseVisible(h=>{h.material=h._SSRPassBackupMaterial}),t.autoClear=r,t.setClearColor(this.originalClearColor),t.setClearAlpha(i),this.scene.background=l,this.scene.fog=c}}he.OUTPUT={Default:0,SSR:1,Beauty:3,Depth:4,Normal:5,Metalness:7};class Qr extends pe{constructor(e,s){super();F(this,"history",new Rt(1,1,{type:It,depthBuffer:!1}));F(this,"copy",new wt({uniforms:{tex:{value:this.history.texture}},vertexShader:On,fragmentShader:"uniform sampler2D tex;varying vec2 vUv;void main(){gl_FragColor=vec4(texture2D(tex,vUv).rgb,1.0);}"}));F(this,"resolve",new wt({uniforms:{current:{value:null},history:{value:this.history.texture},depth:{value:null},inverseVP:{value:new et},previousVP:{value:new et},resolution:{value:new ut(1,1)},valid:{value:0}},vertexShader:On,fragmentShader:`
    uniform sampler2D current,history,depth;
    uniform mat4 inverseVP,previousVP;uniform vec2 resolution;uniform float valid;varying vec2 vUv;
    void main(){
      float z=texture2D(depth,vUv).r;
      vec4 world=inverseVP*vec4(vUv*2.0-1.0,z*2.0-1.0,1.0);world/=world.w;
      vec4 old=previousVP*world;vec3 oldNdc=old.xyz/old.w;vec2 uv=oldNdc.xy*.5+.5;
      vec3 c=texture2D(current,vUv).rgb,lo=c,hi=c;
      for(int x=-1;x<=1;x++)for(int y=-1;y<=1;y++){
        vec3 n=texture2D(current,vUv+vec2(float(x),float(y))/resolution).rgb;lo=min(lo,n);hi=max(hi,n);
      }
      vec4 h=texture2D(history,clamp(uv,vec2(0.0),vec2(1.0)));
      float allowed=valid*step(0.0,uv.x)*step(uv.x,1.0)*step(0.0,uv.y)*step(uv.y,1.0)*step(0.0,old.w);
      allowed*=1.0-step(.0015,abs(h.a-(oldNdc.z*.5+.5)));
      float motion=length((uv-vUv)*resolution);
      float blend=allowed*.72/(1.0+motion*.12);
      gl_FragColor=vec4(mix(c,clamp(h.rgb,lo,hi),blend),z);
    }`}));F(this,"quad",new Ge(this.resolve));F(this,"resolved",new Rt(1,1,{type:It,depthBuffer:!1}));F(this,"vp",new et);F(this,"previousPosition",new C(1/0,0,0));F(this,"previousRotation",new Ue);F(this,"frame",0);this.camera=e,this.depthSource=s}setSize(e,s){this.history.setSize(e,s),this.resolved.setSize(e,s),this.resolve.uniforms.resolution.value.set(e,s),this.reset()}reset(){this.resolve.uniforms.valid.value=0,this.frame=0}jitter(e,s){const n=this.frame++%8+1;this.camera.setViewOffset(e,s,Gn(n,2)-.5,Gn(n,3)-.5,e,s)}render(e,s,n){this.camera.updateMatrixWorld(),this.vp.multiplyMatrices(this.camera.projectionMatrix,this.camera.matrixWorldInverse),(this.previousPosition.distanceToSquared(this.camera.position)>9||this.previousRotation.angleTo(this.camera.quaternion)>.35)&&this.reset();const a=this.resolve.uniforms;a.current.value=n.texture,a.depth.value=this.depthSource(),a.inverseVP.value.copy(this.vp).invert(),this.quad.material=this.resolve,e.setRenderTarget(this.resolved),this.quad.render(e);const i=this.history;this.history=this.resolved,this.resolved=i,a.history.value=this.history.texture,this.copy.uniforms.tex.value=this.history.texture,this.quad.material=this.copy,e.setRenderTarget(this.renderToScreen?null:s),this.quad.render(e),a.previousVP.value.copy(this.vp),a.valid.value=1,this.previousPosition.copy(this.camera.position),this.previousRotation.copy(this.camera.quaternion),this.camera.clearViewOffset()}dispose(){this.history.dispose(),this.resolved.dispose(),this.copy.dispose(),this.resolve.dispose(),this.quad.dispose()}}const On="varying vec2 vUv;void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}";function Gn(o,t){let e=1,s=0;for(;o>0;)e/=t,s+=e*(o%t),o=Math.floor(o/t);return s}const No={name:"OutputShader",uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
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

		}`};class Jr extends pe{constructor(){super(),this.isOutputPass=!0,this.uniforms=Nt.clone(No.uniforms),this.material=new Ri({name:No.name,uniforms:this.uniforms,vertexShader:No.vertexShader,fragmentShader:No.fragmentShader}),this._fsQuad=new Ge(this.material),this._outputColorSpace=null,this._toneMapping=null}render(t,e,s){this.uniforms.tDiffuse.value=s.texture,this.uniforms.toneMappingExposure.value=t.toneMappingExposure,(this._outputColorSpace!==t.outputColorSpace||this._toneMapping!==t.toneMapping)&&(this._outputColorSpace=t.outputColorSpace,this._toneMapping=t.toneMapping,this.material.defines={},Ci.getTransfer(this._outputColorSpace)===Ei&&(this.material.defines.SRGB_TRANSFER=""),this._toneMapping===zi?this.material.defines.LINEAR_TONE_MAPPING="":this._toneMapping===Ni?this.material.defines.REINHARD_TONE_MAPPING="":this._toneMapping===Fi?this.material.defines.CINEON_TONE_MAPPING="":this._toneMapping===Ii?this.material.defines.ACES_FILMIC_TONE_MAPPING="":this._toneMapping===Li?this.material.defines.AGX_TONE_MAPPING="":this._toneMapping===Ui?this.material.defines.NEUTRAL_TONE_MAPPING="":this._toneMapping===Oi&&(this.material.defines.CUSTOM_TONE_MAPPING=""),this.material.needsUpdate=!0),this.renderToScreen===!0?(t.setRenderTarget(null),this._fsQuad.render(t)):(t.setRenderTarget(e),this.clear&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),this._fsQuad.render(t))}dispose(){this.material.dispose(),this._fsQuad.dispose()}}class tl extends Jr{constructor(){super(...arguments);F(this,"meter",new Rt(1,1,{depthBuffer:!1}));F(this,"mat",new wt({uniforms:{tex:{value:null}},vertexShader:"varying vec2 vUv;void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}",fragmentShader:"uniform sampler2D tex;void main(){float l=0.0;for(int x=0;x<4;x++)for(int y=0;y<4;y++){vec3 c=texture2D(tex,(vec2(float(x),float(y))+.5)/4.0).rgb;l+=log2(max(.0001,dot(c,vec3(.2126,.7152,.0722))));}gl_FragColor=vec4(clamp((l/16.0+12.0)/24.0,0.0,1.0),0.0,0.0,1.0);}"}));F(this,"quad",new Ge(this.mat));F(this,"counter",0);F(this,"luminance",.22);F(this,"exposure",1);F(this,"pending",!1);F(this,"alive",!0)}render(e,s,n,a){if(this.counter++%24===0&&!this.pending){this.mat.uniforms.tex.value=n.texture,e.setRenderTarget(this.meter),this.quad.render(e);const r=new Uint8Array(4);this.pending=!0,e.readRenderTargetPixelsAsync(this.meter,0,0,1,1,r).then(()=>{this.alive&&(this.luminance=Math.pow(2,r[0]/255*24-12))}).catch(()=>{}).finally(()=>{this.pending=!1})}this.exposure=p0(this.exposure,this.luminance,a||1/60);const i=e.toneMappingExposure;e.toneMappingExposure=i*this.exposure;try{super.render(e,s,n,a,!1)}finally{e.toneMappingExposure=i}}dispose(){this.alive=!1,this.meter.dispose(),this.mat.dispose(),this.quad.dispose(),super.dispose()}}function el(o,t,e){const s=new Zs({uniforms:{tDiffuse:{value:null},tDepth:{value:null},inverseProjection:{value:o.projectionMatrixInverse},cameraWorld:{value:o.matrixWorld},eye:{value:o.position},sun:{value:new C(.4,.7,-.4).normalize()},fogColor:{value:new W(.45,.62,.8)},density:{value:8e-4}},vertexShader:"varying vec2 vUv;void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}",fragmentShader:`uniform sampler2D tDiffuse,tDepth;uniform mat4 inverseProjection,cameraWorld;uniform vec3 eye,sun,fogColor;uniform float density;varying vec2 vUv;
    void main(){vec3 c=texture2D(tDiffuse,vUv).rgb;float z=texture2D(tDepth,vUv).r;
      vec4 p=inverseProjection*vec4(vUv*2.0-1.0,z*2.0-1.0,1.0);p/=p.w;
      vec3 end=(cameraWorld*p).xyz;vec3 ray=end-eye;float distance_=min(length(ray),450.0);vec3 direction=normalize(ray);
      float optical=0.0;for(int i=0;i<8;i++){vec3 s=eye+direction*distance_*(float(i)+.5)/8.0;optical+=exp(-max(s.y,0.0)/32.0)*distance_/8.0;}
      float extinction=1.0-exp(-optical*density);float mu=dot(direction,sun);float g=.72;
      float phase=(1.0-g*g)/pow(max(.05,1.0+g*g-2.0*g*mu),1.5);
      vec3 scatter=fogColor*(.7+.18*min(phase,6.0));
      if(z>.99999)extinction*=.2;
      gl_FragColor=vec4(mix(c,scatter,clamp(extinction,0.0,.65)),1.0);
    }`}),n=s.render.bind(s);return s.render=(a,i,r,l,c)=>{s.uniforms.tDepth.value=e();const h=t.fog;h&&(s.uniforms.fogColor.value.copy(h.color),s.uniforms.density.value=Math.min(.004,h.density*.22)),n(a,i,r,l,c)},s}const Fo={defines:{PERSPECTIVE_CAMERA:1,SAMPLES:16,NORMAL_VECTOR_TYPE:1,DEPTH_SWIZZLING:"x",SCREEN_SPACE_RADIUS:0,SCREEN_SPACE_RADIUS_SCALE:100,SCENE_CLIP_BOX:0},uniforms:{tNormal:{value:null},tDepth:{value:null},tNoise:{value:null},resolution:{value:new ut},cameraNear:{value:null},cameraFar:{value:null},cameraProjectionMatrix:{value:new et},cameraProjectionMatrixInverse:{value:new et},cameraWorldMatrix:{value:new et},radius:{value:.25},distanceExponent:{value:1},thickness:{value:1},distanceFallOff:{value:1},scale:{value:1},sceneBoxMin:{value:new C(-1,-1,-1)},sceneBoxMax:{value:new C(1,1,1)}},vertexShader:`

		varying vec2 vUv;

		void main() {
			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
		}`,fragmentShader:`
		varying vec2 vUv;
		uniform highp sampler2D tNormal;
		uniform highp sampler2D tDepth;
		uniform sampler2D tNoise;
		uniform vec2 resolution;
		uniform float cameraNear;
		uniform float cameraFar;
		uniform mat4 cameraProjectionMatrix;
		uniform mat4 cameraProjectionMatrixInverse;
		uniform mat4 cameraWorldMatrix;
		uniform float radius;
		uniform float distanceExponent;
		uniform float thickness;
		uniform float distanceFallOff;
		uniform float scale;
		#if SCENE_CLIP_BOX == 1
			uniform vec3 sceneBoxMin;
			uniform vec3 sceneBoxMax;
		#endif

		#include <common>
		#include <packing>

		#ifndef FRAGMENT_OUTPUT
		#define FRAGMENT_OUTPUT vec4(vec3(ao), 1.)
		#endif

		vec3 getViewPosition( const in vec2 screenPosition, const in float depth ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				vec4 clipSpacePosition = vec4( vec2( screenPosition ) * 2.0 - 1.0, depth, 1.0 );
			#else
				vec4 clipSpacePosition = vec4( vec3( screenPosition, depth ) * 2.0 - 1.0, 1.0 );
			#endif
			vec4 viewSpacePosition = cameraProjectionMatrixInverse * clipSpacePosition;
			return viewSpacePosition.xyz / viewSpacePosition.w;
		}

		float getDepth(const vec2 uv) {
			return textureLod(tDepth, uv.xy, 0.0).DEPTH_SWIZZLING;
		}

		float fetchDepth(const ivec2 uv) {
			return texelFetch(tDepth, uv.xy, 0).DEPTH_SWIZZLING;
		}

		float getViewZ(const in float depth) {
			#if PERSPECTIVE_CAMERA == 1
				return perspectiveDepthToViewZ(depth, cameraNear, cameraFar);
			#else
				return orthographicDepthToViewZ(depth, cameraNear, cameraFar);
			#endif
		}

		vec3 computeNormalFromDepth(const vec2 uv) {
			vec2 size = vec2(textureSize(tDepth, 0));
			ivec2 p = ivec2(uv * size);
			float c0 = fetchDepth(p);
			float l2 = fetchDepth(p - ivec2(2, 0));
			float l1 = fetchDepth(p - ivec2(1, 0));
			float r1 = fetchDepth(p + ivec2(1, 0));
			float r2 = fetchDepth(p + ivec2(2, 0));
			float b2 = fetchDepth(p - ivec2(0, 2));
			float b1 = fetchDepth(p - ivec2(0, 1));
			float t1 = fetchDepth(p + ivec2(0, 1));
			float t2 = fetchDepth(p + ivec2(0, 2));
			float dl = abs((2.0 * l1 - l2) - c0);
			float dr = abs((2.0 * r1 - r2) - c0);
			float db = abs((2.0 * b1 - b2) - c0);
			float dt = abs((2.0 * t1 - t2) - c0);
			vec3 ce = getViewPosition(uv, c0).xyz;
			vec3 dpdx = (dl < dr) ? ce - getViewPosition((uv - vec2(1.0 / size.x, 0.0)), l1).xyz : -ce + getViewPosition((uv + vec2(1.0 / size.x, 0.0)), r1).xyz;
			vec3 dpdy = (db < dt) ? ce - getViewPosition((uv - vec2(0.0, 1.0 / size.y)), b1).xyz : -ce + getViewPosition((uv + vec2(0.0, 1.0 / size.y)), t1).xyz;
			return normalize(cross(dpdx, dpdy));
		}

		vec3 getViewNormal(const vec2 uv) {
			#if NORMAL_VECTOR_TYPE == 2
				return normalize(textureLod(tNormal, uv, 0.).rgb);
			#elif NORMAL_VECTOR_TYPE == 1
				return unpackRGBToNormal(textureLod(tNormal, uv, 0.).rgb);
			#else
				return computeNormalFromDepth(uv);
			#endif
		}

		vec3 getSceneUvAndDepth(vec3 sampleViewPos) {
			vec4 sampleClipPos = cameraProjectionMatrix * vec4(sampleViewPos, 1.);
			vec2 sampleUv = sampleClipPos.xy / sampleClipPos.w * 0.5 + 0.5;
			float sampleSceneDepth = getDepth(sampleUv);
			return vec3(sampleUv, sampleSceneDepth);
		}

		void main() {
			float depth = getDepth(vUv.xy);

			#ifdef USE_REVERSED_DEPTH_BUFFER
				if (depth <= 0.0) {
					discard;
					return;
				}
			#else
				if (depth >= 1.0) {
					discard;
					return;
				}
			#endif
			
			vec3 viewPos = getViewPosition(vUv, depth);
			vec3 viewNormal = getViewNormal(vUv);

			float radiusToUse = radius;
			float distanceFalloffToUse = thickness;
			#if SCREEN_SPACE_RADIUS == 1
				float radiusScale = getViewPosition(vec2(0.5 + float(SCREEN_SPACE_RADIUS_SCALE) / resolution.x, 0.0), depth).x;
				radiusToUse *= radiusScale;
				distanceFalloffToUse *= radiusScale;
			#endif

			#if SCENE_CLIP_BOX == 1
				vec3 worldPos = (cameraWorldMatrix * vec4(viewPos, 1.0)).xyz;
				float boxDistance = length(max(vec3(0.0), max(sceneBoxMin - worldPos, worldPos - sceneBoxMax)));
				if (boxDistance > radiusToUse) {
					discard;
					return;
				}
			#endif

			vec2 noiseResolution = vec2(textureSize(tNoise, 0));
			vec2 noiseUv = vUv * resolution / noiseResolution;
			vec4 noiseTexel = textureLod(tNoise, noiseUv, 0.0);
			vec3 randomVec = noiseTexel.xyz * 2.0 - 1.0;
			vec3 tangent = normalize(vec3(randomVec.xy, 0.));
			vec3 bitangent = vec3(-tangent.y, tangent.x, 0.);
			mat3 kernelMatrix = mat3(tangent, bitangent, vec3(0., 0., 1.));

			const int DIRECTIONS = SAMPLES < 30 ? 3 : 5;
			const int STEPS = (SAMPLES + DIRECTIONS - 1) / DIRECTIONS;
			float ao = 0.0;
			for (int i = 0; i < DIRECTIONS; ++i) {

				float angle = float(i) / float(DIRECTIONS) * PI;
				vec4 sampleDir = vec4(cos(angle), sin(angle), 0., 0.5 + 0.5 * noiseTexel.w);
				sampleDir.xyz = normalize(kernelMatrix * sampleDir.xyz);

				vec3 viewDir = normalize(-viewPos.xyz);
				vec3 sliceBitangent = normalize(cross(sampleDir.xyz, viewDir));
				vec3 sliceTangent = cross(sliceBitangent, viewDir);
				vec3 normalInSlice = normalize(viewNormal - sliceBitangent * dot(viewNormal, sliceBitangent));

				vec3 tangentToNormalInSlice = cross(normalInSlice, sliceBitangent);
				vec2 cosHorizons = vec2(dot(viewDir, tangentToNormalInSlice), dot(viewDir, -tangentToNormalInSlice));

				for (int j = 0; j < STEPS; ++j) {
					vec3 sampleViewOffset = sampleDir.xyz * radiusToUse * sampleDir.w * pow(float(j + 1) / float(STEPS), distanceExponent);

					vec3 sampleSceneUvDepth = getSceneUvAndDepth(viewPos + sampleViewOffset);
					vec3 sampleSceneViewPos = getViewPosition(sampleSceneUvDepth.xy, sampleSceneUvDepth.z);
					vec3 viewDelta = sampleSceneViewPos - viewPos;
					if (abs(viewDelta.z) < thickness) {
						float sampleCosHorizon = dot(viewDir, normalize(viewDelta));
						cosHorizons.x += max(0., (sampleCosHorizon - cosHorizons.x) * mix(1., 2. / float(j + 2), distanceFallOff));
					}

					sampleSceneUvDepth = getSceneUvAndDepth(viewPos - sampleViewOffset);
					sampleSceneViewPos = getViewPosition(sampleSceneUvDepth.xy, sampleSceneUvDepth.z);
					viewDelta = sampleSceneViewPos - viewPos;
					if (abs(viewDelta.z) < thickness) {
						float sampleCosHorizon = dot(viewDir, normalize(viewDelta));
						cosHorizons.y += max(0., (sampleCosHorizon - cosHorizons.y) * mix(1., 2. / float(j + 2), distanceFallOff));
					}
				}

				vec2 sinHorizons = sqrt(1. - cosHorizons * cosHorizons);
				float nx = dot(normalInSlice, sliceTangent);
				float ny = dot(normalInSlice, viewDir);
				float nxb = 1. / 2. * (acos(cosHorizons.y) - acos(cosHorizons.x) + sinHorizons.x * cosHorizons.x - sinHorizons.y * cosHorizons.y);
				float nyb = 1. / 2. * (2. - cosHorizons.x * cosHorizons.x - cosHorizons.y * cosHorizons.y);
				float occlusion = nx * nxb + ny * nyb;
				ao += occlusion;
			}

			ao = clamp(ao / float(DIRECTIONS), 0., 1.);
		#if SCENE_CLIP_BOX == 1
			ao = mix(ao, 1., smoothstep(0., radiusToUse, boxDistance));
		#endif
			ao = pow(ao, scale);

			gl_FragColor = FRAGMENT_OUTPUT;
		}`},Io={defines:{PERSPECTIVE_CAMERA:1},uniforms:{tDepth:{value:null},cameraNear:{value:null},cameraFar:{value:null}},vertexShader:`
		varying vec2 vUv;

		void main() {
			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
		}`,fragmentShader:`
		uniform sampler2D tDepth;
		uniform float cameraNear;
		uniform float cameraFar;
		varying vec2 vUv;

		#include <packing>

		float getLinearDepth( const in vec2 screenPosition ) {
			#if PERSPECTIVE_CAMERA == 1
				float fragCoordZ = texture2D( tDepth, screenPosition ).x;
				float viewZ = perspectiveDepthToViewZ( fragCoordZ, cameraNear, cameraFar );
				return viewZToOrthographicDepth( viewZ, cameraNear, cameraFar );
			#else
				return texture2D( tDepth, screenPosition ).x;
			#endif
		}

		void main() {
			float depth = getLinearDepth( vUv );
			gl_FragColor = vec4( vec3( 1.0 - depth ), 1.0 );

		}`},Ss={uniforms:{tDiffuse:{value:null},intensity:{value:1}},vertexShader:`
		varying vec2 vUv;

		void main() {
			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
		}`,fragmentShader:`
		uniform float intensity;
		uniform sampler2D tDiffuse;
		varying vec2 vUv;

		void main() {
			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = vec4(mix(vec3(1.), texel.rgb, intensity), texel.a);
		}`};function ol(o=5){const t=Math.floor(o)%2===0?Math.floor(o)+1:Math.floor(o),e=sl(t),s=e.length,n=new Uint8Array(s*4);for(let i=0;i<s;++i){const r=e[i],l=2*Math.PI*r/s,c=new C(Math.cos(l),Math.sin(l),0).normalize();n[i*4]=(c.x*.5+.5)*255,n[i*4+1]=(c.y*.5+.5)*255,n[i*4+2]=127,n[i*4+3]=255}const a=new Le(n,t,t);return a.wrapS=me,a.wrapT=me,a.needsUpdate=!0,a}function sl(o){const t=Math.floor(o)%2===0?Math.floor(o)+1:Math.floor(o),e=t*t,s=Array(e).fill(0);let n=Math.floor(t/2),a=t-1;for(let i=1;i<=e;){if(n===-1&&a===t?(a=t-2,n=0):(a===t&&(a=0),n<0&&(n=t-1)),s[n*t+a]!==0){a-=2,n++;continue}else s[n*t+a]=i++;a++,n--}return s}const Lo={defines:{SAMPLES:16,SAMPLE_VECTORS:$a(16,2,1),NORMAL_VECTOR_TYPE:1,DEPTH_VALUE_SOURCE:0},uniforms:{tDiffuse:{value:null},tNormal:{value:null},tDepth:{value:null},tNoise:{value:null},resolution:{value:new ut},cameraProjectionMatrixInverse:{value:new et},lumaPhi:{value:5},depthPhi:{value:5},normalPhi:{value:5},radius:{value:4},index:{value:0}},vertexShader:`

		varying vec2 vUv;

		void main() {
			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
		}`,fragmentShader:`

		varying vec2 vUv;

		uniform sampler2D tDiffuse;
		uniform sampler2D tNormal;
		uniform sampler2D tDepth;
		uniform sampler2D tNoise;
		uniform vec2 resolution;
		uniform mat4 cameraProjectionMatrixInverse;
		uniform float lumaPhi;
		uniform float depthPhi;
		uniform float normalPhi;
		uniform float radius;
		uniform int index;

		#include <common>
		#include <packing>

		#ifndef SAMPLE_LUMINANCE
		#define SAMPLE_LUMINANCE dot(vec3(0.2125, 0.7154, 0.0721), a)
		#endif

		#ifndef FRAGMENT_OUTPUT
		#define FRAGMENT_OUTPUT vec4(denoised, 1.)
		#endif

		float getLuminance(const in vec3 a) {
			return SAMPLE_LUMINANCE;
		}

		const vec3 poissonDisk[SAMPLES] = SAMPLE_VECTORS;

		vec3 getViewPosition( const in vec2 screenPosition, const in float depth ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				vec4 clipSpacePosition = vec4( vec2( screenPosition ) * 2.0 - 1.0, depth, 1.0 );
			#else
				vec4 clipSpacePosition = vec4( vec3( screenPosition, depth ) * 2.0 - 1.0, 1.0 );
			#endif
			vec4 viewSpacePosition = cameraProjectionMatrixInverse * clipSpacePosition;
			return viewSpacePosition.xyz / viewSpacePosition.w;
		}

		float getDepth(const vec2 uv) {
		#if DEPTH_VALUE_SOURCE == 1
			return textureLod(tDepth, uv.xy, 0.0).a;
		#else
			return textureLod(tDepth, uv.xy, 0.0).r;
		#endif
		}

		float fetchDepth(const ivec2 uv) {
			#if DEPTH_VALUE_SOURCE == 1
				return texelFetch(tDepth, uv.xy, 0).a;
			#else
				return texelFetch(tDepth, uv.xy, 0).r;
			#endif
		}

		vec3 computeNormalFromDepth(const vec2 uv) {
			vec2 size = vec2(textureSize(tDepth, 0));
			ivec2 p = ivec2(uv * size);
			float c0 = fetchDepth(p);
			float l2 = fetchDepth(p - ivec2(2, 0));
			float l1 = fetchDepth(p - ivec2(1, 0));
			float r1 = fetchDepth(p + ivec2(1, 0));
			float r2 = fetchDepth(p + ivec2(2, 0));
			float b2 = fetchDepth(p - ivec2(0, 2));
			float b1 = fetchDepth(p - ivec2(0, 1));
			float t1 = fetchDepth(p + ivec2(0, 1));
			float t2 = fetchDepth(p + ivec2(0, 2));
			float dl = abs((2.0 * l1 - l2) - c0);
			float dr = abs((2.0 * r1 - r2) - c0);
			float db = abs((2.0 * b1 - b2) - c0);
			float dt = abs((2.0 * t1 - t2) - c0);
			vec3 ce = getViewPosition(uv, c0).xyz;
			vec3 dpdx = (dl < dr) ?  ce - getViewPosition((uv - vec2(1.0 / size.x, 0.0)), l1).xyz
									: -ce + getViewPosition((uv + vec2(1.0 / size.x, 0.0)), r1).xyz;
			vec3 dpdy = (db < dt) ?  ce - getViewPosition((uv - vec2(0.0, 1.0 / size.y)), b1).xyz
									: -ce + getViewPosition((uv + vec2(0.0, 1.0 / size.y)), t1).xyz;
			return normalize(cross(dpdx, dpdy));
		}

		vec3 getViewNormal(const vec2 uv) {
		#if NORMAL_VECTOR_TYPE == 2
			return normalize(textureLod(tNormal, uv, 0.).rgb);
		#elif NORMAL_VECTOR_TYPE == 1
			return unpackRGBToNormal(textureLod(tNormal, uv, 0.).rgb);
		#else
			return computeNormalFromDepth(uv);
		#endif
		}

		void denoiseSample(in vec3 center, in vec3 viewNormal, in vec3 viewPos, in vec2 sampleUv, inout vec3 denoised, inout float totalWeight) {
			vec4 sampleTexel = textureLod(tDiffuse, sampleUv, 0.0);
			float sampleDepth = getDepth(sampleUv);
			vec3 sampleNormal = getViewNormal(sampleUv);
			vec3 neighborColor = sampleTexel.rgb;
			vec3 viewPosSample = getViewPosition(sampleUv, sampleDepth);

			float normalDiff = dot(viewNormal, sampleNormal);
			float normalSimilarity = pow(max(normalDiff, 0.), normalPhi);
			float lumaDiff = abs(getLuminance(neighborColor) - getLuminance(center));
			float lumaSimilarity = max(1.0 - lumaDiff / lumaPhi, 0.0);
			float depthDiff = abs(dot(viewPos - viewPosSample, viewNormal));
			float depthSimilarity = max(1. - depthDiff / depthPhi, 0.);
			float w = lumaSimilarity * depthSimilarity * normalSimilarity;

			denoised += w * neighborColor;
			totalWeight += w;
		}

		void main() {
			float depth = getDepth(vUv.xy);
			vec3 viewNormal = getViewNormal(vUv);
			if (depth == 1. || dot(viewNormal, viewNormal) == 0.) {
				discard;
				return;
			}
			vec4 texel = textureLod(tDiffuse, vUv, 0.0);
			vec3 center = texel.rgb;
			vec3 viewPos = getViewPosition(vUv, depth);

			vec2 noiseResolution = vec2(textureSize(tNoise, 0));
			vec2 noiseUv = vUv * resolution / noiseResolution;
			vec4 noiseTexel = textureLod(tNoise, noiseUv, 0.0);
      		vec2 noiseVec = vec2(sin(noiseTexel[index % 4] * 2. * PI), cos(noiseTexel[index % 4] * 2. * PI));
    		mat2 rotationMatrix = mat2(noiseVec.x, -noiseVec.y, noiseVec.x, noiseVec.y);

			float totalWeight = 1.0;
			vec3 denoised = texel.rgb;
			for (int i = 0; i < SAMPLES; i++) {
				vec3 sampleDir = poissonDisk[i];
				vec2 offset = rotationMatrix * (sampleDir.xy * (1. + sampleDir.z * (radius - 1.)) / resolution);
				vec2 sampleUv = vUv + offset;
				denoiseSample(center, viewNormal, viewPos, sampleUv, denoised, totalWeight);
			}

			if (totalWeight > 0.) {
				denoised /= totalWeight;
			}
			gl_FragColor = FRAGMENT_OUTPUT;
		}`};function $a(o,t,e){const s=nl(o,t,e);let n="vec3[SAMPLES](";for(let a=0;a<o;a++){const i=s[a];n+=`vec3(${i.x}, ${i.y}, ${i.z})${a<o-1?",":")"}`}return n}function nl(o,t,e){const s=[];for(let n=0;n<o;n++){const a=2*Math.PI*t*n/o,i=Math.pow(n/(o-1),e);s.push(new C(Math.cos(a),Math.sin(a),i))}return s}class al{constructor(t=Math){this.grad3=[[1,1,0],[-1,1,0],[1,-1,0],[-1,-1,0],[1,0,1],[-1,0,1],[1,0,-1],[-1,0,-1],[0,1,1],[0,-1,1],[0,1,-1],[0,-1,-1]],this.grad4=[[0,1,1,1],[0,1,1,-1],[0,1,-1,1],[0,1,-1,-1],[0,-1,1,1],[0,-1,1,-1],[0,-1,-1,1],[0,-1,-1,-1],[1,0,1,1],[1,0,1,-1],[1,0,-1,1],[1,0,-1,-1],[-1,0,1,1],[-1,0,1,-1],[-1,0,-1,1],[-1,0,-1,-1],[1,1,0,1],[1,1,0,-1],[1,-1,0,1],[1,-1,0,-1],[-1,1,0,1],[-1,1,0,-1],[-1,-1,0,1],[-1,-1,0,-1],[1,1,1,0],[1,1,-1,0],[1,-1,1,0],[1,-1,-1,0],[-1,1,1,0],[-1,1,-1,0],[-1,-1,1,0],[-1,-1,-1,0]],this.p=[];for(let e=0;e<256;e++)this.p[e]=Math.floor(t.random()*256);this.perm=[];for(let e=0;e<512;e++)this.perm[e]=this.p[e&255];this.simplex=[[0,1,2,3],[0,1,3,2],[0,0,0,0],[0,2,3,1],[0,0,0,0],[0,0,0,0],[0,0,0,0],[1,2,3,0],[0,2,1,3],[0,0,0,0],[0,3,1,2],[0,3,2,1],[0,0,0,0],[0,0,0,0],[0,0,0,0],[1,3,2,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[1,2,0,3],[0,0,0,0],[1,3,0,2],[0,0,0,0],[0,0,0,0],[0,0,0,0],[2,3,0,1],[2,3,1,0],[1,0,2,3],[1,0,3,2],[0,0,0,0],[0,0,0,0],[0,0,0,0],[2,0,3,1],[0,0,0,0],[2,1,3,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[2,0,1,3],[0,0,0,0],[0,0,0,0],[0,0,0,0],[3,0,1,2],[3,0,2,1],[0,0,0,0],[3,1,2,0],[2,1,0,3],[0,0,0,0],[0,0,0,0],[0,0,0,0],[3,1,0,2],[0,0,0,0],[3,2,0,1],[3,2,1,0]]}noise(t,e){let s,n,a;const i=.5*(Math.sqrt(3)-1),r=(t+e)*i,l=Math.floor(t+r),c=Math.floor(e+r),h=(3-Math.sqrt(3))/6,f=(l+c)*h,p=l-f,m=c-f,u=t-p,v=e-m;let w,M;u>v?(w=1,M=0):(w=0,M=1);const d=u-w+h,g=v-M+h,x=u-1+2*h,y=v-1+2*h,S=l&255,k=c&255,b=this.perm[S+this.perm[k]]%12,T=this.perm[S+w+this.perm[k+M]]%12,A=this.perm[S+1+this.perm[k+1]]%12;let _=.5-u*u-v*v;_<0?s=0:(_*=_,s=_*_*this._dot(this.grad3[b],u,v));let P=.5-d*d-g*g;P<0?n=0:(P*=P,n=P*P*this._dot(this.grad3[T],d,g));let D=.5-x*x-y*y;return D<0?a=0:(D*=D,a=D*D*this._dot(this.grad3[A],x,y)),70*(s+n+a)}noise3d(t,e,s){let n,a,i,r;const c=(t+e+s)*.3333333333333333,h=Math.floor(t+c),f=Math.floor(e+c),p=Math.floor(s+c),m=1/6,u=(h+f+p)*m,v=h-u,w=f-u,M=p-u,d=t-v,g=e-w,x=s-M;let y,S,k,b,T,A;d>=g?g>=x?(y=1,S=0,k=0,b=1,T=1,A=0):d>=x?(y=1,S=0,k=0,b=1,T=0,A=1):(y=0,S=0,k=1,b=1,T=0,A=1):g<x?(y=0,S=0,k=1,b=0,T=1,A=1):d<x?(y=0,S=1,k=0,b=0,T=1,A=1):(y=0,S=1,k=0,b=1,T=1,A=0);const _=d-y+m,P=g-S+m,D=x-k+m,R=d-b+2*m,z=g-T+2*m,N=x-A+2*m,I=d-1+3*m,B=g-1+3*m,U=x-1+3*m,V=h&255,G=f&255,X=p&255,H=this.perm[V+this.perm[G+this.perm[X]]]%12,tt=this.perm[V+y+this.perm[G+S+this.perm[X+k]]]%12,dt=this.perm[V+b+this.perm[G+T+this.perm[X+A]]]%12,pt=this.perm[V+1+this.perm[G+1+this.perm[X+1]]]%12;let q=.6-d*d-g*g-x*x;q<0?n=0:(q*=q,n=q*q*this._dot3(this.grad3[H],d,g,x));let ot=.6-_*_-P*P-D*D;ot<0?a=0:(ot*=ot,a=ot*ot*this._dot3(this.grad3[tt],_,P,D));let lt=.6-R*R-z*z-N*N;lt<0?i=0:(lt*=lt,i=lt*lt*this._dot3(this.grad3[dt],R,z,N));let nt=.6-I*I-B*B-U*U;return nt<0?r=0:(nt*=nt,r=nt*nt*this._dot3(this.grad3[pt],I,B,U)),32*(n+a+i+r)}noise4d(t,e,s,n){const a=this.grad4,i=this.simplex,r=this.perm,l=(Math.sqrt(5)-1)/4,c=(5-Math.sqrt(5))/20;let h,f,p,m,u;const v=(t+e+s+n)*l,w=Math.floor(t+v),M=Math.floor(e+v),d=Math.floor(s+v),g=Math.floor(n+v),x=(w+M+d+g)*c,y=w-x,S=M-x,k=d-x,b=g-x,T=t-y,A=e-S,_=s-k,P=n-b,D=T>A?32:0,R=T>_?16:0,z=A>_?8:0,N=T>P?4:0,I=A>P?2:0,B=_>P?1:0,U=D+R+z+N+I+B,V=i[U][0]>=3?1:0,G=i[U][1]>=3?1:0,X=i[U][2]>=3?1:0,H=i[U][3]>=3?1:0,tt=i[U][0]>=2?1:0,dt=i[U][1]>=2?1:0,pt=i[U][2]>=2?1:0,q=i[U][3]>=2?1:0,ot=i[U][0]>=1?1:0,lt=i[U][1]>=1?1:0,nt=i[U][2]>=1?1:0,kt=i[U][3]>=1?1:0,Tt=T-V+c,E=A-G+c,O=_-X+c,j=P-H+c,K=T-tt+2*c,Mt=A-dt+2*c,Pt=_-pt+2*c,bt=P-q+2*c,Q=T-ot+3*c,_t=A-lt+3*c,ee=_-nt+3*c,ve=P-kt+3*c,Ae=T-1+4*c,cs=A-1+4*c,hs=_-1+4*c,us=P-1+4*c,eo=w&255,oo=M&255,so=d&255,no=g&255,hi=r[eo+r[oo+r[so+r[no]]]]%32,ui=r[eo+V+r[oo+G+r[so+X+r[no+H]]]]%32,fi=r[eo+tt+r[oo+dt+r[so+pt+r[no+q]]]]%32,di=r[eo+ot+r[oo+lt+r[so+nt+r[no+kt]]]]%32,mi=r[eo+1+r[oo+1+r[so+1+r[no+1]]]]%32;let ao=.6-T*T-A*A-_*_-P*P;ao<0?h=0:(ao*=ao,h=ao*ao*this._dot4(a[hi],T,A,_,P));let io=.6-Tt*Tt-E*E-O*O-j*j;io<0?f=0:(io*=io,f=io*io*this._dot4(a[ui],Tt,E,O,j));let ro=.6-K*K-Mt*Mt-Pt*Pt-bt*bt;ro<0?p=0:(ro*=ro,p=ro*ro*this._dot4(a[fi],K,Mt,Pt,bt));let lo=.6-Q*Q-_t*_t-ee*ee-ve*ve;lo<0?m=0:(lo*=lo,m=lo*lo*this._dot4(a[di],Q,_t,ee,ve));let co=.6-Ae*Ae-cs*cs-hs*hs-us*us;return co<0?u=0:(co*=co,u=co*co*this._dot4(a[mi],Ae,cs,hs,us)),27*(h+f+p+m+u)}_dot(t,e,s){return t[0]*e+t[1]*s}_dot3(t,e,s,n){return t[0]*e+t[1]*s+t[2]*n}_dot4(t,e,s,n,a){return t[0]*e+t[1]*s+t[2]*n+t[3]*a}}class Qt extends pe{constructor(t,e,s=512,n=512,a,i,r){super(),this.width=s,this.height=n,this.clear=!0,this.camera=e,this.scene=t,this.output=0,this._renderGBuffer=!0,this._visibilityCache=[],this.blendIntensity=1,this.pdRings=2,this.pdRadiusExponent=2,this.pdSamples=16,this.gtaoNoiseTexture=ol(),this.pdNoiseTexture=this._generateNoise(),this.gtaoRenderTarget=new Rt(this.width,this.height,{type:It}),this.pdRenderTarget=this.gtaoRenderTarget.clone(),this.gtaoMaterial=new wt({defines:Object.assign({},Fo.defines),uniforms:Nt.clone(Fo.uniforms),vertexShader:Fo.vertexShader,fragmentShader:Fo.fragmentShader,blending:yt,depthTest:!1,depthWrite:!1}),this.gtaoMaterial.defines.PERSPECTIVE_CAMERA=this.camera.isPerspectiveCamera?1:0,this.gtaoMaterial.uniforms.tNoise.value=this.gtaoNoiseTexture,this.gtaoMaterial.uniforms.resolution.value.set(this.width,this.height),this.gtaoMaterial.uniforms.cameraNear.value=this.camera.near,this.gtaoMaterial.uniforms.cameraFar.value=this.camera.far,this.normalMaterial=new Ma,this.normalMaterial.blending=yt,this.pdMaterial=new wt({defines:Object.assign({},Lo.defines),uniforms:Nt.clone(Lo.uniforms),vertexShader:Lo.vertexShader,fragmentShader:Lo.fragmentShader,depthTest:!1,depthWrite:!1}),this.pdMaterial.uniforms.tDiffuse.value=this.gtaoRenderTarget.texture,this.pdMaterial.uniforms.tNoise.value=this.pdNoiseTexture,this.pdMaterial.uniforms.resolution.value.set(this.width,this.height),this.pdMaterial.uniforms.lumaPhi.value=10,this.pdMaterial.uniforms.depthPhi.value=2,this.pdMaterial.uniforms.normalPhi.value=3,this.pdMaterial.uniforms.radius.value=8,this.depthRenderMaterial=new wt({defines:Object.assign({},Io.defines),uniforms:Nt.clone(Io.uniforms),vertexShader:Io.vertexShader,fragmentShader:Io.fragmentShader,blending:yt}),this.depthRenderMaterial.uniforms.cameraNear.value=this.camera.near,this.depthRenderMaterial.uniforms.cameraFar.value=this.camera.far,this.copyMaterial=new wt({uniforms:Nt.clone(ie.uniforms),vertexShader:ie.vertexShader,fragmentShader:ie.fragmentShader,transparent:!0,depthTest:!1,depthWrite:!1,blendSrc:rn,blendDst:Po,blendEquation:je,blendSrcAlpha:an,blendDstAlpha:Po,blendEquationAlpha:je}),this.blendMaterial=new wt({uniforms:Nt.clone(Ss.uniforms),vertexShader:Ss.vertexShader,fragmentShader:Ss.fragmentShader,transparent:!0,depthTest:!1,depthWrite:!1,blending:Gi,blendSrc:rn,blendDst:Po,blendEquation:je,blendSrcAlpha:an,blendDstAlpha:Po,blendEquationAlpha:je}),this._fsQuad=new Ge(null),this._originalClearColor=new W,this.setGBuffer(a?a.depthTexture:void 0,a?a.normalTexture:void 0),i!==void 0&&this.updateGtaoMaterial(i),r!==void 0&&this.updatePdMaterial(r)}setSize(t,e){this.width=t,this.height=e,this.gtaoRenderTarget.setSize(t,e),this.normalRenderTarget.setSize(t,e),this.pdRenderTarget.setSize(t,e),this.gtaoMaterial.uniforms.resolution.value.set(t,e),this.gtaoMaterial.uniforms.cameraProjectionMatrix.value.copy(this.camera.projectionMatrix),this.gtaoMaterial.uniforms.cameraProjectionMatrixInverse.value.copy(this.camera.projectionMatrixInverse),this.pdMaterial.uniforms.resolution.value.set(t,e),this.pdMaterial.uniforms.cameraProjectionMatrixInverse.value.copy(this.camera.projectionMatrixInverse)}dispose(){this.gtaoNoiseTexture.dispose(),this.pdNoiseTexture.dispose(),this.normalRenderTarget.dispose(),this.gtaoRenderTarget.dispose(),this.pdRenderTarget.dispose(),this.normalMaterial.dispose(),this.pdMaterial.dispose(),this.copyMaterial.dispose(),this.depthRenderMaterial.dispose(),this._fsQuad.dispose()}get gtaoMap(){return this.pdRenderTarget.texture}setGBuffer(t,e){t!==void 0?(this.depthTexture=t,this.normalTexture=e,this._renderGBuffer=!1):(this.depthTexture=new Os,this.depthTexture.format=Wi,this.depthTexture.type=Bi,this.normalRenderTarget=new Rt(this.width,this.height,{minFilter:Ut,magFilter:Ut,type:It,depthTexture:this.depthTexture}),this.normalTexture=this.normalRenderTarget.texture,this._renderGBuffer=!0);const s=this.normalTexture?1:0,n=this.depthTexture===this.normalTexture?"w":"x";this.gtaoMaterial.defines.NORMAL_VECTOR_TYPE=s,this.gtaoMaterial.defines.DEPTH_SWIZZLING=n,this.gtaoMaterial.uniforms.tNormal.value=this.normalTexture,this.gtaoMaterial.uniforms.tDepth.value=this.depthTexture,this.pdMaterial.defines.NORMAL_VECTOR_TYPE=s,this.pdMaterial.defines.DEPTH_SWIZZLING=n,this.pdMaterial.uniforms.tNormal.value=this.normalTexture,this.pdMaterial.uniforms.tDepth.value=this.depthTexture,this.depthRenderMaterial.uniforms.tDepth.value=this.normalRenderTarget.depthTexture}setSceneClipBox(t){t?(this.gtaoMaterial.needsUpdate=this.gtaoMaterial.defines.SCENE_CLIP_BOX!==1,this.gtaoMaterial.defines.SCENE_CLIP_BOX=1,this.gtaoMaterial.uniforms.sceneBoxMin.value.copy(t.min),this.gtaoMaterial.uniforms.sceneBoxMax.value.copy(t.max)):(this.gtaoMaterial.needsUpdate=this.gtaoMaterial.defines.SCENE_CLIP_BOX===0,this.gtaoMaterial.defines.SCENE_CLIP_BOX=0)}updateGtaoMaterial(t){t.radius!==void 0&&(this.gtaoMaterial.uniforms.radius.value=t.radius),t.distanceExponent!==void 0&&(this.gtaoMaterial.uniforms.distanceExponent.value=t.distanceExponent),t.thickness!==void 0&&(this.gtaoMaterial.uniforms.thickness.value=t.thickness),t.distanceFallOff!==void 0&&(this.gtaoMaterial.uniforms.distanceFallOff.value=t.distanceFallOff,this.gtaoMaterial.needsUpdate=!0),t.scale!==void 0&&(this.gtaoMaterial.uniforms.scale.value=t.scale),t.samples!==void 0&&t.samples!==this.gtaoMaterial.defines.SAMPLES&&(this.gtaoMaterial.defines.SAMPLES=t.samples,this.gtaoMaterial.needsUpdate=!0),t.screenSpaceRadius!==void 0&&(t.screenSpaceRadius?1:0)!==this.gtaoMaterial.defines.SCREEN_SPACE_RADIUS&&(this.gtaoMaterial.defines.SCREEN_SPACE_RADIUS=t.screenSpaceRadius?1:0,this.gtaoMaterial.needsUpdate=!0)}updatePdMaterial(t){let e=!1;t.lumaPhi!==void 0&&(this.pdMaterial.uniforms.lumaPhi.value=t.lumaPhi),t.depthPhi!==void 0&&(this.pdMaterial.uniforms.depthPhi.value=t.depthPhi),t.normalPhi!==void 0&&(this.pdMaterial.uniforms.normalPhi.value=t.normalPhi),t.radius!==void 0&&t.radius!==this.radius&&(this.pdMaterial.uniforms.radius.value=t.radius),t.radiusExponent!==void 0&&t.radiusExponent!==this.pdRadiusExponent&&(this.pdRadiusExponent=t.radiusExponent,e=!0),t.rings!==void 0&&t.rings!==this.pdRings&&(this.pdRings=t.rings,e=!0),t.samples!==void 0&&t.samples!==this.pdSamples&&(this.pdSamples=t.samples,e=!0),e&&(this.pdMaterial.defines.SAMPLES=this.pdSamples,this.pdMaterial.defines.SAMPLE_VECTORS=$a(this.pdSamples,this.pdRings,this.pdRadiusExponent),this.pdMaterial.needsUpdate=!0)}render(t,e,s){switch(this._renderGBuffer&&(this._overrideVisibility(),this._renderOverride(t,this.normalMaterial,this.normalRenderTarget,7829503,1),this._restoreVisibility()),this.gtaoMaterial.uniforms.cameraNear.value=this.camera.near,this.gtaoMaterial.uniforms.cameraFar.value=this.camera.far,this.gtaoMaterial.uniforms.cameraProjectionMatrix.value.copy(this.camera.projectionMatrix),this.gtaoMaterial.uniforms.cameraProjectionMatrixInverse.value.copy(this.camera.projectionMatrixInverse),this.gtaoMaterial.uniforms.cameraWorldMatrix.value.copy(this.camera.matrixWorld),this._renderPass(t,this.gtaoMaterial,this.gtaoRenderTarget,16777215,1),this.pdMaterial.uniforms.cameraProjectionMatrixInverse.value.copy(this.camera.projectionMatrixInverse),this._renderPass(t,this.pdMaterial,this.pdRenderTarget,16777215,1),this.output){case Qt.OUTPUT.Off:break;case Qt.OUTPUT.Diffuse:this.copyMaterial.uniforms.tDiffuse.value=s.texture,this.copyMaterial.blending=yt,this._renderPass(t,this.copyMaterial,this.renderToScreen?null:e);break;case Qt.OUTPUT.AO:this.copyMaterial.uniforms.tDiffuse.value=this.gtaoRenderTarget.texture,this.copyMaterial.blending=yt,this._renderPass(t,this.copyMaterial,this.renderToScreen?null:e);break;case Qt.OUTPUT.Denoise:this.copyMaterial.uniforms.tDiffuse.value=this.pdRenderTarget.texture,this.copyMaterial.blending=yt,this._renderPass(t,this.copyMaterial,this.renderToScreen?null:e);break;case Qt.OUTPUT.Depth:this.depthRenderMaterial.uniforms.cameraNear.value=this.camera.near,this.depthRenderMaterial.uniforms.cameraFar.value=this.camera.far,this._renderPass(t,this.depthRenderMaterial,this.renderToScreen?null:e);break;case Qt.OUTPUT.Normal:this.copyMaterial.uniforms.tDiffuse.value=this.normalRenderTarget.texture,this.copyMaterial.blending=yt,this._renderPass(t,this.copyMaterial,this.renderToScreen?null:e);break;case Qt.OUTPUT.Default:this.copyMaterial.uniforms.tDiffuse.value=s.texture,this.copyMaterial.blending=yt,this._renderPass(t,this.copyMaterial,this.renderToScreen?null:e),this.blendMaterial.uniforms.intensity.value=this.blendIntensity,this.blendMaterial.uniforms.tDiffuse.value=this.pdRenderTarget.texture,this._renderPass(t,this.blendMaterial,this.renderToScreen?null:e);break;default:console.warn("THREE.GTAOPass: Unknown output type.")}}_renderPass(t,e,s,n,a){t.getClearColor(this._originalClearColor);const i=t.getClearAlpha(),r=t.autoClear;t.setRenderTarget(s),t.autoClear=!1,n!=null&&(t.setClearColor(n),t.setClearAlpha(a||0),t.clear()),this._fsQuad.material=e,this._fsQuad.render(t),t.autoClear=r,t.setClearColor(this._originalClearColor),t.setClearAlpha(i)}_renderOverride(t,e,s,n,a){t.getClearColor(this._originalClearColor);const i=t.getClearAlpha(),r=t.autoClear;t.setRenderTarget(s),t.autoClear=!1,n=e.clearColor||n,a=e.clearAlpha||a,n!=null&&(t.setClearColor(n),t.setClearAlpha(a||0),t.clear()),this.scene.overrideMaterial=e,t.render(this.scene,this.camera),this.scene.overrideMaterial=null,t.autoClear=r,t.setClearColor(this._originalClearColor),t.setClearAlpha(i)}_overrideVisibility(){const t=this.scene,e=this._visibilityCache;t.traverse(function(s){(s.isPoints||s.isLine||s.isLine2)&&s.visible&&(s.visible=!1,e.push(s))})}_restoreVisibility(){const t=this._visibilityCache;for(let e=0;e<t.length;e++)t[e].visible=!0;t.length=0}_generateNoise(t=64){const e=new al,s=t*t*4,n=new Uint8Array(s);for(let i=0;i<t;i++)for(let r=0;r<t;r++){const l=i,c=r;n[(i*t+r)*4]=(e.noise(l,c)*.5+.5)*255,n[(i*t+r)*4+1]=(e.noise(l+t,c)*.5+.5)*255,n[(i*t+r)*4+2]=(e.noise(l,c+t)*.5+.5)*255,n[(i*t+r)*4+3]=(e.noise(l+t,c+t)*.5+.5)*255}const a=new Le(n,t,t,To,Ao);return a.wrapS=me,a.wrapT=me,a.needsUpdate=!0,a}}Qt.OUTPUT={Off:-1,Default:0,Diffuse:1,Depth:2,Normal:3,AO:4,Denoise:5};const qs=["fogMul","sunMul","tintAmt","exposure","contrast","saturation","lift","bloom","aberration","scanline","vignette"],Qs=["skyTop","skyMid","skyBot","fog","sun","hemiSky","hemiGround","ambient","shadowTint","highlightTint","dustA","dustB"],xe={fogMul:1,sunMul:1,tintAmt:.14,exposure:1,contrast:1.06,saturation:1.04,lift:.012,bloom:1,aberration:.0016,scanline:.035,vignette:.2},ks={unit01:{...xe,id:"unit01",label:"数字 · 冰蓝",skyTop:2781104,skyMid:8372708,skyBot:14676984,fog:12575722,sun:15661311,hemiSky:12576501,hemiGround:3493978,ambient:11061718,shadowTint:3123396,highlightTint:15267583,dustA:8382719,dustB:13235199,aberration:.0019,scanline:.05},unit02:{...xe,id:"unit02",label:"传记 · 档案银",skyTop:5929108,skyMid:12174544,skyBot:15392739,fog:13882844,sun:16183796,hemiSky:13818340,hemiGround:5196370,ambient:12106436,shadowTint:7245744,highlightTint:16183026,tintAmt:.12,saturation:.94,contrast:1.08,dustA:13620962,dustB:15319244,scanline:.028},unit03:{...xe,id:"unit03",label:"旅行 · 黎明青",skyTop:3112851,skyMid:9227720,skyBot:15981014,fog:12573910,sun:16773614,hemiSky:11984088,hemiGround:4149062,ambient:10930372,shadowTint:2794392,highlightTint:16773360,tintAmt:.15,saturation:1.08,dustA:9429974,dustB:16752527},unit04:{...xe,id:"unit04",label:"工艺 · 石墨",skyTop:4871779,skyMid:10134443,skyBot:14276306,fog:12172480,sun:15986150,hemiSky:13159634,hemiGround:3881532,ambient:11053485,shadowTint:6256264,highlightTint:15920874,tintAmt:.1,saturation:.92,contrast:1.1,dustA:14275789,dustB:11846360,bloom:1.1,scanline:.03},unit05:{...xe,id:"unit05",label:"航天 · 深靛",skyTop:922176,skyMid:3817359,skyBot:9078472,fog:4869772,sun:14672639,hemiSky:9411032,hemiGround:1841728,ambient:7173048,shadowTint:4870096,highlightTint:15131903,tintAmt:.18,exposure:1.04,fogMul:1.1,dustA:12167423,dustB:14933247,bloom:1.2,aberration:.0021},unit06:{...xe,id:"unit06",label:"经济 · 港湾板岩",skyTop:3429742,skyMid:8362664,skyBot:13621976,fog:11123904,sun:15660274,hemiSky:11059396,hemiGround:3162175,ambient:9414314,shadowTint:2923142,highlightTint:15398130,tintAmt:.15,dustA:5235624,dustB:11060428},memory2090:{...xe,id:"memory2090",label:"2090 · 深蓝夜",skyTop:660008,skyMid:1851488,skyBot:2109512,fog:791588,sun:13623551,hemiSky:6260424,hemiGround:1382431,ambient:4876950,shadowTint:2781104,highlightTint:15003647,tintAmt:.16,exposure:1.02,sunMul:.9,dustA:8369407,dustB:12901631,scanline:.04},neutral:{...xe,id:"neutral",label:"回溯 · 冷白",skyTop:4159416,skyMid:10274020,skyBot:15003378,fog:13031650,sun:16054527,hemiSky:12901104,hemiGround:4214876,ambient:11584210,shadowTint:3903416,highlightTint:15397887,dustA:9425128,dustB:13821682}};function o1(o){return o?ks[o]??ks.neutral:ks.neutral}function il(o,t={r:0,g:0,b:0}){return t.r=(o>>16&255)/255,t.g=(o>>8&255)/255,t.b=(o&255)/255,t}function Is(){const o={};for(const t of qs)o[t]=0;for(const t of Qs)o[t]={r:0,g:0,b:0};return o}function Uo(o,t=Is()){for(const e of qs)t[e]=o[e];for(const e of Qs)il(o[e],t[e]);return t}function Wn(o,t,e,s){for(const n of qs)s[n]=o[n]+(t[n]-o[n])*e;for(const n of Qs){const a=o[n],i=t[n],r=s[n];r.r=a.r+(i.r-a.r)*e,r.g=a.g+(i.g-a.g)*e,r.b=a.b+(i.b-a.b)*e}return s}const rl=o=>{const t=o<0?0:o>1?1:o;return t*t*(3-2*t)};class s1{constructor(t){F(this,"current");F(this,"from",Is());F(this,"to",Is());F(this,"elapsed",1);F(this,"duration",1);F(this,"_target");F(this,"version",0);this._target=t,this.current=Uo(t),Uo(t,this.from),Uo(t,this.to)}get target(){return this._target}get settled(){return this.elapsed>=this.duration-1e-6}setTarget(t,e=2){t===this._target&&this.settled||(this._target=t,Wn(this.current,this.current,0,this.from),Uo(t,this.to),this.duration=Math.max(0,e),this.elapsed=0,this.version++,this.duration===0&&this.update(0))}update(t){if(this.settled&&this.duration>0)return this.current;this.elapsed=Math.min(this.duration,this.elapsed+t);const e=this.duration<=0?1:rl(this.elapsed/this.duration);return Wn(this.from,this.to,e,this.current),this.current}}function Bn(o,t){const e=Math.max(.05,o.r*.2126+o.g*.7152+o.b*.0722);return t[0]=o.r/e,t[1]=o.g/e,t[2]=o.b/e,t}const ll={high:{pixelRatio:2,grassRadius:40,grassCell:.8,shadowMap:2048,bloom:!0,bloomScale:.6},med:{pixelRatio:1.5,grassRadius:34,grassCell:1.1,shadowMap:1536,bloom:!0,bloomScale:.45},low:{pixelRatio:1,grassRadius:26,grassCell:1.9,shadowMap:1024,bloom:!1,bloomScale:.5}};function n1(){var a;if(typeof window>"u")return"med";const o=((a=window.matchMedia)==null?void 0:a.call(window,"(pointer: coarse)").matches)??!1,t=Math.min(window.innerWidth,window.innerHeight)<540,e=navigator.hardwareConcurrency??4,s=navigator.deviceMemory??4,n=o||t;return n&&(e<=4||s<=3)?"low":n||e<=4||s<=4?"med":"high"}function a1(o,t,e,s,n={}){const a=ll[s];if(!(!a.bloom&&!n.forceComposer))try{const i=o.getSize(new ut),r=i.x,l=i.y,c=Math.min(window.devicePixelRatio,a.pixelRatio),h=new Rt(Math.max(1,Math.floor(r*c)),Math.max(1,Math.floor(l*c)),{type:It,samples:0,depthTexture:new Os(Math.max(1,Math.floor(r*c)),Math.max(1,Math.floor(l*c)),Vi)}),f=new Kr(o,h),p=new Zr(t,e);let m=null;const u=e instanceof He?new Qr(e,()=>m):void 0,v=s==="high"&&n.ao!==!1&&e instanceof He?new he({renderer:o,scene:t,camera:e,width:r,height:l,selects:[],groundReflector:null}):void 0;if(v){v.opacity=.2,v.maxDistance=10,v.thickness=.08,v.resolutionScale=.5,v.ssrMaterial.defines.MAX_STEP=48;const S=p.setSize.bind(p);p.setSize=(b,T)=>{S(b,T),v.setSize(b,T)};const k=p.dispose.bind(p);p.dispose=()=>{v.dispose(),k()}}let w=0,M=[];const d=new C,g=p.render.bind(p);if(p.render=(S,k,b,T,A)=>{u!=null&&u.enabled?u.jitter(b.width,b.height):e instanceof He&&e.clearViewOffset(),v&&w++%30===0&&(M=[],t.traverse(_=>{const P=_;if(!P.isMesh||(P.getWorldPosition(d),d.distanceToSquared(e.position)>2025))return;(Array.isArray(P.material)?P.material:[P.material]).some(R=>R instanceof at&&R.roughness<.3&&R.metalness>.3)&&M.push(P)}),v.selects=M),v&&M.length?(v.render(S,b,b,T,A),m=v.beautyRenderTarget.depthTexture):(g(S,k,b,T,A),m=b.depthTexture)},f.addPass(p),e instanceof He&&e.far>200&&f.addPass(el(e,t,()=>m)),u&&f.addPass(u),s!=="low"&&n.ao!==!1){const S=new Qt(t,e,r,l),k=S.setSize.bind(S);S.setSize=(b,T)=>k(Math.max(1,Math.floor(b*.5)),Math.max(1,Math.floor(T*.5))),S.output=Qt.OUTPUT.Default,S.blendIntensity=.55,S.updateGtaoMaterial({radius:1.1,distanceExponent:1.4,thickness:2,scale:1.1,samples:12,distanceFallOff:1,screenSpaceRadius:!1}),S.updatePdMaterial({lumaPhi:10,depthPhi:2,normalPhi:3,radius:5,rings:2,samples:8}),f.addPass(S)}let x;if(a.bloom){const S=a.bloomScale;x=new Ze(new ut(r*S,l*S),.62,.5,.78);const k=x.setSize.bind(x);x.setSize=(b,T)=>k(Math.max(1,Math.floor(b*S)),Math.max(1,Math.floor(T*S))),f.addPass(x)}f.addPass(new tl);const y=new Zs({uniforms:{tDiffuse:{value:null},uContrast:{value:1.06},uSat:{value:1.04},uLift:{value:.012},uShadow:{value:new C(.7,1.15,1.3)},uHighlight:{value:new C(.96,1,1.05)},uTintAmt:{value:.14},uAberration:{value:.0016},uScan:{value:.035},uVig:{value:.2},uRes:{value:new ut(1280,720)},uTime:{value:0}},vertexShader:"varying vec2 vUv; void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }",fragmentShader:`
          uniform sampler2D tDiffuse;
          uniform float uContrast, uSat, uLift, uTintAmt, uAberration, uScan, uVig, uTime;
          uniform vec3 uShadow, uHighlight;
          uniform vec2 uRes;
          varying vec2 vUv;
          void main() {
            vec2 q = vUv - 0.5;
            float rr = length(q * vec2(1.0, 1.12));
            // 只在画面边缘（暗角区域）生效的权重：中心为 0
            float edge = smoothstep(0.34, 0.92, rr);
            vec2 dir = normalize(q + 1e-5);
            float ab = uAberration * edge * (0.4 + rr);
            vec3 c;
            c.r = texture2D(tDiffuse, vUv + dir * ab).r;
            c.g = texture2D(tDiffuse, vUv).g;
            c.b = texture2D(tDiffuse, vUv - dir * ab).b;
            float l = dot(c, vec3(0.2126, 0.7152, 0.0722));
            c = mix(vec3(l), c, uSat);
            c = mix(c, c * c * (3.0 - 2.0 * c), clamp((uContrast - 1.0) * 4.0 + 0.2, 0.0, 0.6));
            // 暗部偏冷（微青）、亮部中性偏冷的白；乘子已按亮度归一化，只改色相不改亮度
            c *= mix(vec3(1.0), mix(uShadow, uHighlight, smoothstep(0.04, 0.7, l)), uTintAmt);
            c = c * (1.0 - uLift) + uLift;
            // 全息扫描线：仅边缘，随时间极缓慢流动的亮带
            float scan = 0.5 + 0.5 * sin(vUv.y * uRes.y * 1.15 + uTime * 0.6);
            float band = smoothstep(0.0, 1.0, 0.5 + 0.5 * sin(vUv.y * 5.0 - uTime * 0.35));
            c *= 1.0 - uScan * edge * (scan * 0.6 + band * 0.4);
            c += vec3(0.0, 0.012, 0.018) * uScan * edge * band * 4.0;
            float vig = smoothstep(0.98, 0.3, rr);
            c *= mix(1.0 - uVig * 0.7, 1.0, vig);
            gl_FragColor = vec4(clamp(c, 0.0, 1.0), 1.0);
          }
        `});return f.addPass(y),f.setPixelRatio(Math.min(window.devicePixelRatio,a.pixelRatio)),f.setSize(r,l),{composer:f,bloomPass:x,gradePass:y}}catch{return}}function i1(o,t){try{const e=new Qi(o),s=new Hi,n=v0(10);t.sunDir&&n.material.uniforms.sunPosition.value.copy(t.sunDir).multiplyScalar(45e4),n.material.uniforms.showSunDisc.value=!1,s.add(n);const a=e.fromScene(s,.02);return s.traverse(i=>{const r=i;r.isMesh&&(r.geometry.dispose(),r.material.dispose())}),e.dispose(),a}catch{return}}const Oo=[1,1,1],Go=[1,1,1];function r1(o,t,e,s,n){const a=o.uniforms;a.uContrast.value=t.contrast,a.uSat.value=t.saturation,a.uLift.value=t.lift,a.uTintAmt.value=t.tintAmt,a.uAberration.value=t.aberration,a.uScan.value=t.scanline,a.uVig.value=t.vignette,a.uTime.value=e,a.uRes.value.set(s,n),Bn(t.shadowTint,Oo),Bn(t.highlightTint,Go),a.uShadow.value.set(Oo[0],Oo[1],Oo[2]),a.uHighlight.value.set(Go[0],Go[1],Go[2])}const cl=new et,Vn=new Ue,Hn=new os,jn=new C(1,1,1),$n=new C;function Xa(o,t,e,s=.04){return s<.0075?new Mo(o,t,e):new Se(o,t,e,1,Math.min(s,o/2.01,t/2.01,e/2.01))}function qe(o,t,e,s=16){return new Ct(o,t,e,s,1)}function l1(o,t,e,s=8){const n=new Te;for(let i=0;i<s;i++){const r=(i+.5)/s*Math.PI*2,l=Math.cos(r)*o,c=Math.sin(r)*o;i===0?n.moveTo(l,c):n.lineTo(l,c)}n.closePath();const a=new Oe(n,{depth:Math.max(.001,t-e*2),bevelEnabled:!0,bevelThickness:e,bevelSize:e,bevelSegments:1});return a.rotateX(-Math.PI/2),a.translate(0,e,0),a}function c1(o,t,e,s,n){const a=new Te;a.moveTo(Math.cos(e)*o,Math.sin(e)*o),a.lineTo(Math.cos(e)*t,Math.sin(e)*t),a.absarc(0,0,t,e,s,!1),a.lineTo(Math.cos(s)*o,Math.sin(s)*o),a.absarc(0,0,o,s,e,!0);const i=new Oe(a,{depth:n,bevelEnabled:!1,curveSegments:3});return i.rotateX(-Math.PI/2),i}function hl(o,t,e,s=6){const n=new C(...o),a=new C(...t).sub(n),i=new Ct(e,e,a.length(),s,1),r=new Ue().setFromUnitVectors(new C(0,1,0),a.clone().normalize());return i.applyMatrix4(new et().compose(n.clone().addScaledVector(a,.5),r,new C(1,1,1))),i}function h1(o,t,e,s=.04){const n=new Te;n.absarc(0,0,o,0,Math.PI,!1),n.lineTo(-t,0),n.absarc(0,0,t,Math.PI,0,!0),n.closePath();const a=new Oe(n,{depth:Math.max(.001,e-s*2),bevelEnabled:!0,bevelThickness:s,bevelSize:s*.8,bevelSegments:1,curveSegments:18});return a.translate(0,0,-(e-s*2)/2),a}function Xn(o,t,e){const s=new Te;s.moveTo(-o/2,0),s.lineTo(o/2,0),s.lineTo(0,t),s.closePath();const n=new Oe(s,{depth:e,bevelEnabled:!0,bevelThickness:.03,bevelSize:.03,bevelSegments:1});return n.translate(0,0,-e/2),n}class Ya{constructor(){F(this,"buckets",new Map)}add(t,e,s={}){const n=t.clone();e.map||n.deleteAttribute("uv"),n.deleteAttribute(Ke),Hn.set(s.rx??0,s.ry??0,s.rz??0),Vn.setFromEuler(Hn),$n.set(s.x??0,s.y??0,s.z??0),jn.set(s.sx??1,s.sy??1,s.sz??1),n.applyMatrix4(cl.compose($n,Vn,jn));const a=n.index?n:Ye(n,1e-4),i=this.buckets.get(e)??[];i.push(a),this.buckets.set(e,i)}addMatrix(t,e,s){const n=t.clone();e.map||n.deleteAttribute("uv"),n.deleteAttribute(Ke),n.applyMatrix4(s);const a=n.index?n:Ye(n,1e-4),i=this.buckets.get(e)??[];i.push(a),this.buckets.set(e,i)}build(t,e="detail",s={}){const n=[];let a=0;for(const[i,r]of this.buckets){const l=Yt(r,!1);if(!l)continue;l.computeBoundingSphere(),Ea(i)&&jo(l);const c=new Y(l,i);c.name=`${e}-${a++}`,c.castShadow=!0,c.receiveShadow=!0,Qo(c,i),Object.assign(c.userData,s),t.add(c),n.push(c)}return this.buckets.clear(),n}}function ul(o){var n;o.updateMatrixWorld(!0);const t=new et().copy(o.matrixWorld).invert(),e=new Map,s=[];o.traverse(a=>{a.isMesh&&s.push(a)});for(const a of s){const i=a.geometry.clone();i.deleteAttribute("uv"),i.deleteAttribute(Ke),i.applyMatrix4(new et().multiplyMatrices(t,a.matrixWorld));const r=i.index?i:Ye(i,1e-4),l=e.get(a.material)??[];l.push(r),e.set(a.material,l)}for(const a of s)(n=a.parent)==null||n.remove(a);for(const a of[...o.children])a.type==="Group"&&o.remove(a);for(const[a,i]of e){const r=Yt(i,!1);if(!r)continue;const l=new Y(r,a);l.castShadow=!0,l.receiveShadow=!0,l.userData.isLandscapeStage=!0,o.add(l)}}function u1(o){let t=o>>>0;return()=>{t=t+1831565813>>>0;let e=t;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}}function fl(){const o=(e,s,n=.02,a={})=>{const i=new at({color:e,roughness:s,metalness:n,...a});return i.fog=!1,i},t={stone:o(12170150,.9),stoneDark:o(9078397,.92),stoneWarm:o(13221286,.9),paveA:o(10132116,.95),paveB:o(8751752,.95),slate:o(4870744,.86,.06),wood:o(9071178,.82,.02),woodDark:o(5915440,.85,.02),brass:o(11962940,.36,.8),steel:o(9345444,.4,.8),copper:o(5216908,.52,.55),leaf:o(4157253,.95),leafLight:o(6263120,.95),soil:o(4864812,1),lampGlass:o(15923199,.3,0,{emissive:13625087,emissiveIntensity:.9}),paper:o(15524815,.95),darkSteel:o(3093819,.5,.7),rock:o(8093056,.95),terracottaRoof:o(11887946,.82),glass:(()=>{const e=new Ie({color:7315376,roughness:.04,metalness:0,transparent:!0,opacity:.34,clearcoat:1,envMapIntensity:1.6,depthWrite:!1});return e.fog=!1,e})()};return zt(t.stone,"masonry"),zt(t.stoneDark,"masonry"),zt(t.stoneWarm,"masonry"),zt(t.rock,"masonry"),zt(t.paveA,"paving"),zt(t.paveB,"paving"),zt(t.wood,"wood"),zt(t.woodDark,"wood"),zt(t.terracottaRoof,"tiles"),zt(t.slate,"tiles"),zt(t.brass,"metal"),zt(t.steel,"metal"),zt(t.copper,"metal"),zt(t.darkSteel,"metal"),t}class dl extends Y{constructor(t,e,s=!1,n=!1,a=1e4){const i=new Gt;super(i,e),this.isMarchingCubes=!0;const r=this,l=new Float32Array(36),c=new Float32Array(36),h=new Float32Array(36);this.enableUvs=s,this.enableColors=n,this.init=function(d){this.resolution=d,this.isolation=80,this.size=d,this.size2=this.size*this.size,this.size3=this.size2*this.size,this.halfsize=this.size/2,this.delta=2/this.size,this.yd=this.size,this.zd=this.size2,this.field=new Float32Array(this.size3),this.normal_cache=new Float32Array(this.size3*3),this.palette=new Float32Array(this.size3*3),this.count=0;const g=a*3;this.positionArray=new Float32Array(g*3);const x=new ct(this.positionArray,3);x.setUsage(Do),i.setAttribute("position",x),this.normalArray=new Float32Array(g*3);const y=new ct(this.normalArray,3);if(y.setUsage(Do),i.setAttribute("normal",y),this.enableUvs){this.uvArray=new Float32Array(g*2);const S=new ct(this.uvArray,2);S.setUsage(Do),i.setAttribute("uv",S)}if(this.enableColors){this.colorArray=new Float32Array(g*3);const S=new ct(this.colorArray,3);S.setUsage(Do),i.setAttribute("color",S)}i.boundingSphere=new ya(new C,1)};function f(d,g,x){return d+(g-d)*x}function p(d,g,x,y,S,k,b,T,A,_){const P=(x-b)/(T-b),D=r.normal_cache;l[g+0]=y+P*r.delta,l[g+1]=S,l[g+2]=k,c[g+0]=f(D[d+0],D[d+3],P),c[g+1]=f(D[d+1],D[d+4],P),c[g+2]=f(D[d+2],D[d+5],P),h[g+0]=f(r.palette[A*3+0],r.palette[_*3+0],P),h[g+1]=f(r.palette[A*3+1],r.palette[_*3+1],P),h[g+2]=f(r.palette[A*3+2],r.palette[_*3+2],P)}function m(d,g,x,y,S,k,b,T,A,_){const P=(x-b)/(T-b),D=r.normal_cache;l[g+0]=y,l[g+1]=S+P*r.delta,l[g+2]=k;const R=d+r.yd*3;c[g+0]=f(D[d+0],D[R+0],P),c[g+1]=f(D[d+1],D[R+1],P),c[g+2]=f(D[d+2],D[R+2],P),h[g+0]=f(r.palette[A*3+0],r.palette[_*3+0],P),h[g+1]=f(r.palette[A*3+1],r.palette[_*3+1],P),h[g+2]=f(r.palette[A*3+2],r.palette[_*3+2],P)}function u(d,g,x,y,S,k,b,T,A,_){const P=(x-b)/(T-b),D=r.normal_cache;l[g+0]=y,l[g+1]=S,l[g+2]=k+P*r.delta;const R=d+r.zd*3;c[g+0]=f(D[d+0],D[R+0],P),c[g+1]=f(D[d+1],D[R+1],P),c[g+2]=f(D[d+2],D[R+2],P),h[g+0]=f(r.palette[A*3+0],r.palette[_*3+0],P),h[g+1]=f(r.palette[A*3+1],r.palette[_*3+1],P),h[g+2]=f(r.palette[A*3+2],r.palette[_*3+2],P)}function v(d){const g=d*3;r.normal_cache[g]===0&&(r.normal_cache[g+0]=r.field[d-1]-r.field[d+1],r.normal_cache[g+1]=r.field[d-r.yd]-r.field[d+r.yd],r.normal_cache[g+2]=r.field[d-r.zd]-r.field[d+r.zd])}function w(d,g,x,y,S){const k=y+1,b=y+r.yd,T=y+r.zd,A=k+r.yd,_=k+r.zd,P=y+r.yd+r.zd,D=k+r.yd+r.zd;let R=0;const z=r.field[y],N=r.field[k],I=r.field[b],B=r.field[A],U=r.field[T],V=r.field[_],G=r.field[P],X=r.field[D];z<S&&(R|=1),N<S&&(R|=2),I<S&&(R|=8),B<S&&(R|=4),U<S&&(R|=16),V<S&&(R|=32),G<S&&(R|=128),X<S&&(R|=64);const H=ml[R];if(H===0)return 0;const tt=r.delta,dt=d+tt,pt=g+tt,q=x+tt;H&1&&(v(y),v(k),p(y*3,0,S,d,g,x,z,N,y,k)),H&2&&(v(k),v(A),m(k*3,3,S,dt,g,x,N,B,k,A)),H&4&&(v(b),v(A),p(b*3,6,S,d,pt,x,I,B,b,A)),H&8&&(v(y),v(b),m(y*3,9,S,d,g,x,z,I,y,b)),H&16&&(v(T),v(_),p(T*3,12,S,d,g,q,U,V,T,_)),H&32&&(v(_),v(D),m(_*3,15,S,dt,g,q,V,X,_,D)),H&64&&(v(P),v(D),p(P*3,18,S,d,pt,q,G,X,P,D)),H&128&&(v(T),v(P),m(T*3,21,S,d,g,q,U,G,T,P)),H&256&&(v(y),v(T),u(y*3,24,S,d,g,x,z,U,y,T)),H&512&&(v(k),v(_),u(k*3,27,S,dt,g,x,N,V,k,_)),H&1024&&(v(A),v(D),u(A*3,30,S,dt,pt,x,B,X,A,D)),H&2048&&(v(b),v(P),u(b*3,33,S,d,pt,x,I,G,b,P)),R<<=4;let ot,lt,nt,kt=0,Tt=0;for(;Wo[R+Tt]!=-1;)ot=R+Tt,lt=ot+1,nt=ot+2,M(l,c,h,3*Wo[ot],3*Wo[lt],3*Wo[nt]),Tt+=3,kt++;return kt}function M(d,g,x,y,S,k){const b=r.count*3;if(r.positionArray[b+0]=d[y],r.positionArray[b+1]=d[y+1],r.positionArray[b+2]=d[y+2],r.positionArray[b+3]=d[S],r.positionArray[b+4]=d[S+1],r.positionArray[b+5]=d[S+2],r.positionArray[b+6]=d[k],r.positionArray[b+7]=d[k+1],r.positionArray[b+8]=d[k+2],r.material.flatShading===!0){const T=(g[y+0]+g[S+0]+g[k+0])/3,A=(g[y+1]+g[S+1]+g[k+1])/3,_=(g[y+2]+g[S+2]+g[k+2])/3;r.normalArray[b+0]=T,r.normalArray[b+1]=A,r.normalArray[b+2]=_,r.normalArray[b+3]=T,r.normalArray[b+4]=A,r.normalArray[b+5]=_,r.normalArray[b+6]=T,r.normalArray[b+7]=A,r.normalArray[b+8]=_}else r.normalArray[b+0]=g[y+0],r.normalArray[b+1]=g[y+1],r.normalArray[b+2]=g[y+2],r.normalArray[b+3]=g[S+0],r.normalArray[b+4]=g[S+1],r.normalArray[b+5]=g[S+2],r.normalArray[b+6]=g[k+0],r.normalArray[b+7]=g[k+1],r.normalArray[b+8]=g[k+2];if(r.enableUvs){const T=r.count*2;r.uvArray[T+0]=d[y+0],r.uvArray[T+1]=d[y+2],r.uvArray[T+2]=d[S+0],r.uvArray[T+3]=d[S+2],r.uvArray[T+4]=d[k+0],r.uvArray[T+5]=d[k+2]}r.enableColors&&(r.colorArray[b+0]=x[y+0],r.colorArray[b+1]=x[y+1],r.colorArray[b+2]=x[y+2],r.colorArray[b+3]=x[S+0],r.colorArray[b+4]=x[S+1],r.colorArray[b+5]=x[S+2],r.colorArray[b+6]=x[k+0],r.colorArray[b+7]=x[k+1],r.colorArray[b+8]=x[k+2]),r.count+=3}this.addBall=function(d,g,x,y,S,k){const b=Math.sign(y);y=Math.abs(y);const T=k!=null;let A=new W(d,g,x);if(T)try{A=k instanceof W?k:Array.isArray(k)?new W(Math.min(Math.abs(k[0]),1),Math.min(Math.abs(k[1]),1),Math.min(Math.abs(k[2]),1)):new W(k)}catch{A=new W(d,g,x)}const _=this.size*Math.sqrt(y/S),P=x*this.size,D=g*this.size,R=d*this.size;let z=Math.floor(P-_);z<1&&(z=1);let N=Math.floor(P+_);N>this.size-1&&(N=this.size-1);let I=Math.floor(D-_);I<1&&(I=1);let B=Math.floor(D+_);B>this.size-1&&(B=this.size-1);let U=Math.floor(R-_);U<1&&(U=1);let V=Math.floor(R+_);V>this.size-1&&(V=this.size-1);let G,X,H,tt,dt,pt,q,ot,lt,nt,kt;for(H=z;H<N;H++)for(dt=this.size2*H,ot=H/this.size-x,lt=ot*ot,X=I;X<B;X++)for(tt=dt+this.size*X,q=X/this.size-g,nt=q*q,G=U;G<V;G++)if(pt=G/this.size-d,kt=y/(1e-6+pt*pt+nt+lt)-S,kt>0){this.field[tt+G]+=kt*b;const Tt=Math.sqrt((G-R)*(G-R)+(X-D)*(X-D)+(H-P)*(H-P))/_,E=1-Tt*Tt*Tt*(Tt*(Tt*6-15)+10);this.palette[(tt+G)*3+0]+=A.r*E,this.palette[(tt+G)*3+1]+=A.g*E,this.palette[(tt+G)*3+2]+=A.b*E}},this.addPlaneX=function(d,g){const x=this.size,y=this.yd,S=this.zd,k=this.field;let b,T,A,_,P,D,R,z=x*Math.sqrt(d/g);for(z>x&&(z=x),b=0;b<z;b++)if(D=b/x,_=D*D,P=d/(1e-4+_)-g,P>0)for(T=0;T<x;T++)for(R=b+T*y,A=0;A<x;A++)k[S*A+R]+=P},this.addPlaneY=function(d,g){const x=this.size,y=this.yd,S=this.zd,k=this.field;let b,T,A,_,P,D,R,z,N=x*Math.sqrt(d/g);for(N>x&&(N=x),T=0;T<N;T++)if(D=T/x,_=D*D,P=d/(1e-4+_)-g,P>0)for(R=T*y,b=0;b<x;b++)for(z=R+b,A=0;A<x;A++)k[S*A+z]+=P},this.addPlaneZ=function(d,g){const x=this.size,y=this.yd,S=this.zd,k=this.field;let b,T,A,_,P,D,R,z,N=x*Math.sqrt(d/g);for(N>x&&(N=x),A=0;A<N;A++)if(D=A/x,_=D*D,P=d/(1e-4+_)-g,P>0)for(R=S*A,T=0;T<x;T++)for(z=R+T*y,b=0;b<x;b++)k[z+b]+=P},this.setCell=function(d,g,x,y){const S=this.size2*x+this.size*g+d;this.field[S]=y},this.getCell=function(d,g,x){const y=this.size2*x+this.size*g+d;return this.field[y]},this.blur=function(d=1){const g=this.field,x=g.slice(),y=this.size,S=this.size2;for(let k=0;k<y;k++)for(let b=0;b<y;b++)for(let T=0;T<y;T++){const A=S*T+y*b+k;let _=x[A],P=1;for(let D=-1;D<=1;D+=2){const R=D+k;if(!(R<0||R>=y))for(let z=-1;z<=1;z+=2){const N=z+b;if(!(N<0||N>=y))for(let I=-1;I<=1;I+=2){const B=I+T;if(B<0||B>=y)continue;const U=S*B+y*N+R,V=x[U];P++,_+=d*(V-_)/P}}}g[A]=_}},this.reset=function(){for(let d=0;d<this.size3;d++)this.normal_cache[d*3]=0,this.field[d]=0,this.palette[d*3]=this.palette[d*3+1]=this.palette[d*3+2]=0},this.update=function(){this.count=0;const d=this.size-2;for(let g=1;g<d;g++){const x=this.size2*g,y=(g-this.halfsize)/this.halfsize;for(let S=1;S<d;S++){const k=x+this.size*S,b=(S-this.halfsize)/this.halfsize;for(let T=1;T<d;T++){const A=(T-this.halfsize)/this.halfsize,_=k+T;w(A,b,y,_,this.isolation)}}}this.geometry.setDrawRange(0,this.count),i.getAttribute("position").needsUpdate=!0,i.getAttribute("normal").needsUpdate=!0,this.enableUvs&&(i.getAttribute("uv").needsUpdate=!0),this.enableColors&&(i.getAttribute("color").needsUpdate=!0),this.count/3>a&&console.warn("THREE.MarchingCubes: Geometry buffers too small for rendering. Please create an instance with a higher poly count.")},this.init(t)}}const ml=new Int32Array([0,265,515,778,1030,1295,1541,1804,2060,2309,2575,2822,3082,3331,3593,3840,400,153,915,666,1430,1183,1941,1692,2460,2197,2975,2710,3482,3219,3993,3728,560,825,51,314,1590,1855,1077,1340,2620,2869,2111,2358,3642,3891,3129,3376,928,681,419,170,1958,1711,1445,1196,2988,2725,2479,2214,4010,3747,3497,3232,1120,1385,1635,1898,102,367,613,876,3180,3429,3695,3942,2154,2403,2665,2912,1520,1273,2035,1786,502,255,1013,764,3580,3317,4095,3830,2554,2291,3065,2800,1616,1881,1107,1370,598,863,85,348,3676,3925,3167,3414,2650,2899,2137,2384,1984,1737,1475,1226,966,719,453,204,4044,3781,3535,3270,3018,2755,2505,2240,2240,2505,2755,3018,3270,3535,3781,4044,204,453,719,966,1226,1475,1737,1984,2384,2137,2899,2650,3414,3167,3925,3676,348,85,863,598,1370,1107,1881,1616,2800,3065,2291,2554,3830,4095,3317,3580,764,1013,255,502,1786,2035,1273,1520,2912,2665,2403,2154,3942,3695,3429,3180,876,613,367,102,1898,1635,1385,1120,3232,3497,3747,4010,2214,2479,2725,2988,1196,1445,1711,1958,170,419,681,928,3376,3129,3891,3642,2358,2111,2869,2620,1340,1077,1855,1590,314,51,825,560,3728,3993,3219,3482,2710,2975,2197,2460,1692,1941,1183,1430,666,915,153,400,3840,3593,3331,3082,2822,2575,2309,2060,1804,1541,1295,1030,778,515,265,0]),Wo=new Int32Array([-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,0,8,3,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,0,1,9,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,1,8,3,9,8,1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,1,2,10,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,0,8,3,1,2,10,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,9,2,10,0,2,9,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,2,8,3,2,10,8,10,9,8,-1,-1,-1,-1,-1,-1,-1,3,11,2,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,0,11,2,8,11,0,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,1,9,0,2,3,11,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,1,11,2,1,9,11,9,8,11,-1,-1,-1,-1,-1,-1,-1,3,10,1,11,10,3,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,0,10,1,0,8,10,8,11,10,-1,-1,-1,-1,-1,-1,-1,3,9,0,3,11,9,11,10,9,-1,-1,-1,-1,-1,-1,-1,9,8,10,10,8,11,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,4,7,8,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,4,3,0,7,3,4,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,0,1,9,8,4,7,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,4,1,9,4,7,1,7,3,1,-1,-1,-1,-1,-1,-1,-1,1,2,10,8,4,7,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,3,4,7,3,0,4,1,2,10,-1,-1,-1,-1,-1,-1,-1,9,2,10,9,0,2,8,4,7,-1,-1,-1,-1,-1,-1,-1,2,10,9,2,9,7,2,7,3,7,9,4,-1,-1,-1,-1,8,4,7,3,11,2,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,11,4,7,11,2,4,2,0,4,-1,-1,-1,-1,-1,-1,-1,9,0,1,8,4,7,2,3,11,-1,-1,-1,-1,-1,-1,-1,4,7,11,9,4,11,9,11,2,9,2,1,-1,-1,-1,-1,3,10,1,3,11,10,7,8,4,-1,-1,-1,-1,-1,-1,-1,1,11,10,1,4,11,1,0,4,7,11,4,-1,-1,-1,-1,4,7,8,9,0,11,9,11,10,11,0,3,-1,-1,-1,-1,4,7,11,4,11,9,9,11,10,-1,-1,-1,-1,-1,-1,-1,9,5,4,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,9,5,4,0,8,3,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,0,5,4,1,5,0,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,8,5,4,8,3,5,3,1,5,-1,-1,-1,-1,-1,-1,-1,1,2,10,9,5,4,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,3,0,8,1,2,10,4,9,5,-1,-1,-1,-1,-1,-1,-1,5,2,10,5,4,2,4,0,2,-1,-1,-1,-1,-1,-1,-1,2,10,5,3,2,5,3,5,4,3,4,8,-1,-1,-1,-1,9,5,4,2,3,11,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,0,11,2,0,8,11,4,9,5,-1,-1,-1,-1,-1,-1,-1,0,5,4,0,1,5,2,3,11,-1,-1,-1,-1,-1,-1,-1,2,1,5,2,5,8,2,8,11,4,8,5,-1,-1,-1,-1,10,3,11,10,1,3,9,5,4,-1,-1,-1,-1,-1,-1,-1,4,9,5,0,8,1,8,10,1,8,11,10,-1,-1,-1,-1,5,4,0,5,0,11,5,11,10,11,0,3,-1,-1,-1,-1,5,4,8,5,8,10,10,8,11,-1,-1,-1,-1,-1,-1,-1,9,7,8,5,7,9,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,9,3,0,9,5,3,5,7,3,-1,-1,-1,-1,-1,-1,-1,0,7,8,0,1,7,1,5,7,-1,-1,-1,-1,-1,-1,-1,1,5,3,3,5,7,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,9,7,8,9,5,7,10,1,2,-1,-1,-1,-1,-1,-1,-1,10,1,2,9,5,0,5,3,0,5,7,3,-1,-1,-1,-1,8,0,2,8,2,5,8,5,7,10,5,2,-1,-1,-1,-1,2,10,5,2,5,3,3,5,7,-1,-1,-1,-1,-1,-1,-1,7,9,5,7,8,9,3,11,2,-1,-1,-1,-1,-1,-1,-1,9,5,7,9,7,2,9,2,0,2,7,11,-1,-1,-1,-1,2,3,11,0,1,8,1,7,8,1,5,7,-1,-1,-1,-1,11,2,1,11,1,7,7,1,5,-1,-1,-1,-1,-1,-1,-1,9,5,8,8,5,7,10,1,3,10,3,11,-1,-1,-1,-1,5,7,0,5,0,9,7,11,0,1,0,10,11,10,0,-1,11,10,0,11,0,3,10,5,0,8,0,7,5,7,0,-1,11,10,5,7,11,5,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,10,6,5,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,0,8,3,5,10,6,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,9,0,1,5,10,6,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,1,8,3,1,9,8,5,10,6,-1,-1,-1,-1,-1,-1,-1,1,6,5,2,6,1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,1,6,5,1,2,6,3,0,8,-1,-1,-1,-1,-1,-1,-1,9,6,5,9,0,6,0,2,6,-1,-1,-1,-1,-1,-1,-1,5,9,8,5,8,2,5,2,6,3,2,8,-1,-1,-1,-1,2,3,11,10,6,5,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,11,0,8,11,2,0,10,6,5,-1,-1,-1,-1,-1,-1,-1,0,1,9,2,3,11,5,10,6,-1,-1,-1,-1,-1,-1,-1,5,10,6,1,9,2,9,11,2,9,8,11,-1,-1,-1,-1,6,3,11,6,5,3,5,1,3,-1,-1,-1,-1,-1,-1,-1,0,8,11,0,11,5,0,5,1,5,11,6,-1,-1,-1,-1,3,11,6,0,3,6,0,6,5,0,5,9,-1,-1,-1,-1,6,5,9,6,9,11,11,9,8,-1,-1,-1,-1,-1,-1,-1,5,10,6,4,7,8,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,4,3,0,4,7,3,6,5,10,-1,-1,-1,-1,-1,-1,-1,1,9,0,5,10,6,8,4,7,-1,-1,-1,-1,-1,-1,-1,10,6,5,1,9,7,1,7,3,7,9,4,-1,-1,-1,-1,6,1,2,6,5,1,4,7,8,-1,-1,-1,-1,-1,-1,-1,1,2,5,5,2,6,3,0,4,3,4,7,-1,-1,-1,-1,8,4,7,9,0,5,0,6,5,0,2,6,-1,-1,-1,-1,7,3,9,7,9,4,3,2,9,5,9,6,2,6,9,-1,3,11,2,7,8,4,10,6,5,-1,-1,-1,-1,-1,-1,-1,5,10,6,4,7,2,4,2,0,2,7,11,-1,-1,-1,-1,0,1,9,4,7,8,2,3,11,5,10,6,-1,-1,-1,-1,9,2,1,9,11,2,9,4,11,7,11,4,5,10,6,-1,8,4,7,3,11,5,3,5,1,5,11,6,-1,-1,-1,-1,5,1,11,5,11,6,1,0,11,7,11,4,0,4,11,-1,0,5,9,0,6,5,0,3,6,11,6,3,8,4,7,-1,6,5,9,6,9,11,4,7,9,7,11,9,-1,-1,-1,-1,10,4,9,6,4,10,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,4,10,6,4,9,10,0,8,3,-1,-1,-1,-1,-1,-1,-1,10,0,1,10,6,0,6,4,0,-1,-1,-1,-1,-1,-1,-1,8,3,1,8,1,6,8,6,4,6,1,10,-1,-1,-1,-1,1,4,9,1,2,4,2,6,4,-1,-1,-1,-1,-1,-1,-1,3,0,8,1,2,9,2,4,9,2,6,4,-1,-1,-1,-1,0,2,4,4,2,6,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,8,3,2,8,2,4,4,2,6,-1,-1,-1,-1,-1,-1,-1,10,4,9,10,6,4,11,2,3,-1,-1,-1,-1,-1,-1,-1,0,8,2,2,8,11,4,9,10,4,10,6,-1,-1,-1,-1,3,11,2,0,1,6,0,6,4,6,1,10,-1,-1,-1,-1,6,4,1,6,1,10,4,8,1,2,1,11,8,11,1,-1,9,6,4,9,3,6,9,1,3,11,6,3,-1,-1,-1,-1,8,11,1,8,1,0,11,6,1,9,1,4,6,4,1,-1,3,11,6,3,6,0,0,6,4,-1,-1,-1,-1,-1,-1,-1,6,4,8,11,6,8,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,7,10,6,7,8,10,8,9,10,-1,-1,-1,-1,-1,-1,-1,0,7,3,0,10,7,0,9,10,6,7,10,-1,-1,-1,-1,10,6,7,1,10,7,1,7,8,1,8,0,-1,-1,-1,-1,10,6,7,10,7,1,1,7,3,-1,-1,-1,-1,-1,-1,-1,1,2,6,1,6,8,1,8,9,8,6,7,-1,-1,-1,-1,2,6,9,2,9,1,6,7,9,0,9,3,7,3,9,-1,7,8,0,7,0,6,6,0,2,-1,-1,-1,-1,-1,-1,-1,7,3,2,6,7,2,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,2,3,11,10,6,8,10,8,9,8,6,7,-1,-1,-1,-1,2,0,7,2,7,11,0,9,7,6,7,10,9,10,7,-1,1,8,0,1,7,8,1,10,7,6,7,10,2,3,11,-1,11,2,1,11,1,7,10,6,1,6,7,1,-1,-1,-1,-1,8,9,6,8,6,7,9,1,6,11,6,3,1,3,6,-1,0,9,1,11,6,7,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,7,8,0,7,0,6,3,11,0,11,6,0,-1,-1,-1,-1,7,11,6,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,7,6,11,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,3,0,8,11,7,6,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,0,1,9,11,7,6,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,8,1,9,8,3,1,11,7,6,-1,-1,-1,-1,-1,-1,-1,10,1,2,6,11,7,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,1,2,10,3,0,8,6,11,7,-1,-1,-1,-1,-1,-1,-1,2,9,0,2,10,9,6,11,7,-1,-1,-1,-1,-1,-1,-1,6,11,7,2,10,3,10,8,3,10,9,8,-1,-1,-1,-1,7,2,3,6,2,7,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,7,0,8,7,6,0,6,2,0,-1,-1,-1,-1,-1,-1,-1,2,7,6,2,3,7,0,1,9,-1,-1,-1,-1,-1,-1,-1,1,6,2,1,8,6,1,9,8,8,7,6,-1,-1,-1,-1,10,7,6,10,1,7,1,3,7,-1,-1,-1,-1,-1,-1,-1,10,7,6,1,7,10,1,8,7,1,0,8,-1,-1,-1,-1,0,3,7,0,7,10,0,10,9,6,10,7,-1,-1,-1,-1,7,6,10,7,10,8,8,10,9,-1,-1,-1,-1,-1,-1,-1,6,8,4,11,8,6,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,3,6,11,3,0,6,0,4,6,-1,-1,-1,-1,-1,-1,-1,8,6,11,8,4,6,9,0,1,-1,-1,-1,-1,-1,-1,-1,9,4,6,9,6,3,9,3,1,11,3,6,-1,-1,-1,-1,6,8,4,6,11,8,2,10,1,-1,-1,-1,-1,-1,-1,-1,1,2,10,3,0,11,0,6,11,0,4,6,-1,-1,-1,-1,4,11,8,4,6,11,0,2,9,2,10,9,-1,-1,-1,-1,10,9,3,10,3,2,9,4,3,11,3,6,4,6,3,-1,8,2,3,8,4,2,4,6,2,-1,-1,-1,-1,-1,-1,-1,0,4,2,4,6,2,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,1,9,0,2,3,4,2,4,6,4,3,8,-1,-1,-1,-1,1,9,4,1,4,2,2,4,6,-1,-1,-1,-1,-1,-1,-1,8,1,3,8,6,1,8,4,6,6,10,1,-1,-1,-1,-1,10,1,0,10,0,6,6,0,4,-1,-1,-1,-1,-1,-1,-1,4,6,3,4,3,8,6,10,3,0,3,9,10,9,3,-1,10,9,4,6,10,4,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,4,9,5,7,6,11,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,0,8,3,4,9,5,11,7,6,-1,-1,-1,-1,-1,-1,-1,5,0,1,5,4,0,7,6,11,-1,-1,-1,-1,-1,-1,-1,11,7,6,8,3,4,3,5,4,3,1,5,-1,-1,-1,-1,9,5,4,10,1,2,7,6,11,-1,-1,-1,-1,-1,-1,-1,6,11,7,1,2,10,0,8,3,4,9,5,-1,-1,-1,-1,7,6,11,5,4,10,4,2,10,4,0,2,-1,-1,-1,-1,3,4,8,3,5,4,3,2,5,10,5,2,11,7,6,-1,7,2,3,7,6,2,5,4,9,-1,-1,-1,-1,-1,-1,-1,9,5,4,0,8,6,0,6,2,6,8,7,-1,-1,-1,-1,3,6,2,3,7,6,1,5,0,5,4,0,-1,-1,-1,-1,6,2,8,6,8,7,2,1,8,4,8,5,1,5,8,-1,9,5,4,10,1,6,1,7,6,1,3,7,-1,-1,-1,-1,1,6,10,1,7,6,1,0,7,8,7,0,9,5,4,-1,4,0,10,4,10,5,0,3,10,6,10,7,3,7,10,-1,7,6,10,7,10,8,5,4,10,4,8,10,-1,-1,-1,-1,6,9,5,6,11,9,11,8,9,-1,-1,-1,-1,-1,-1,-1,3,6,11,0,6,3,0,5,6,0,9,5,-1,-1,-1,-1,0,11,8,0,5,11,0,1,5,5,6,11,-1,-1,-1,-1,6,11,3,6,3,5,5,3,1,-1,-1,-1,-1,-1,-1,-1,1,2,10,9,5,11,9,11,8,11,5,6,-1,-1,-1,-1,0,11,3,0,6,11,0,9,6,5,6,9,1,2,10,-1,11,8,5,11,5,6,8,0,5,10,5,2,0,2,5,-1,6,11,3,6,3,5,2,10,3,10,5,3,-1,-1,-1,-1,5,8,9,5,2,8,5,6,2,3,8,2,-1,-1,-1,-1,9,5,6,9,6,0,0,6,2,-1,-1,-1,-1,-1,-1,-1,1,5,8,1,8,0,5,6,8,3,8,2,6,2,8,-1,1,5,6,2,1,6,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,1,3,6,1,6,10,3,8,6,5,6,9,8,9,6,-1,10,1,0,10,0,6,9,5,0,5,6,0,-1,-1,-1,-1,0,3,8,5,6,10,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,10,5,6,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,11,5,10,7,5,11,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,11,5,10,11,7,5,8,3,0,-1,-1,-1,-1,-1,-1,-1,5,11,7,5,10,11,1,9,0,-1,-1,-1,-1,-1,-1,-1,10,7,5,10,11,7,9,8,1,8,3,1,-1,-1,-1,-1,11,1,2,11,7,1,7,5,1,-1,-1,-1,-1,-1,-1,-1,0,8,3,1,2,7,1,7,5,7,2,11,-1,-1,-1,-1,9,7,5,9,2,7,9,0,2,2,11,7,-1,-1,-1,-1,7,5,2,7,2,11,5,9,2,3,2,8,9,8,2,-1,2,5,10,2,3,5,3,7,5,-1,-1,-1,-1,-1,-1,-1,8,2,0,8,5,2,8,7,5,10,2,5,-1,-1,-1,-1,9,0,1,5,10,3,5,3,7,3,10,2,-1,-1,-1,-1,9,8,2,9,2,1,8,7,2,10,2,5,7,5,2,-1,1,3,5,3,7,5,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,0,8,7,0,7,1,1,7,5,-1,-1,-1,-1,-1,-1,-1,9,0,3,9,3,5,5,3,7,-1,-1,-1,-1,-1,-1,-1,9,8,7,5,9,7,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,5,8,4,5,10,8,10,11,8,-1,-1,-1,-1,-1,-1,-1,5,0,4,5,11,0,5,10,11,11,3,0,-1,-1,-1,-1,0,1,9,8,4,10,8,10,11,10,4,5,-1,-1,-1,-1,10,11,4,10,4,5,11,3,4,9,4,1,3,1,4,-1,2,5,1,2,8,5,2,11,8,4,5,8,-1,-1,-1,-1,0,4,11,0,11,3,4,5,11,2,11,1,5,1,11,-1,0,2,5,0,5,9,2,11,5,4,5,8,11,8,5,-1,9,4,5,2,11,3,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,2,5,10,3,5,2,3,4,5,3,8,4,-1,-1,-1,-1,5,10,2,5,2,4,4,2,0,-1,-1,-1,-1,-1,-1,-1,3,10,2,3,5,10,3,8,5,4,5,8,0,1,9,-1,5,10,2,5,2,4,1,9,2,9,4,2,-1,-1,-1,-1,8,4,5,8,5,3,3,5,1,-1,-1,-1,-1,-1,-1,-1,0,4,5,1,0,5,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,8,4,5,8,5,3,9,0,5,0,3,5,-1,-1,-1,-1,9,4,5,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,4,11,7,4,9,11,9,10,11,-1,-1,-1,-1,-1,-1,-1,0,8,3,4,9,7,9,11,7,9,10,11,-1,-1,-1,-1,1,10,11,1,11,4,1,4,0,7,4,11,-1,-1,-1,-1,3,1,4,3,4,8,1,10,4,7,4,11,10,11,4,-1,4,11,7,9,11,4,9,2,11,9,1,2,-1,-1,-1,-1,9,7,4,9,11,7,9,1,11,2,11,1,0,8,3,-1,11,7,4,11,4,2,2,4,0,-1,-1,-1,-1,-1,-1,-1,11,7,4,11,4,2,8,3,4,3,2,4,-1,-1,-1,-1,2,9,10,2,7,9,2,3,7,7,4,9,-1,-1,-1,-1,9,10,7,9,7,4,10,2,7,8,7,0,2,0,7,-1,3,7,10,3,10,2,7,4,10,1,10,0,4,0,10,-1,1,10,2,8,7,4,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,4,9,1,4,1,7,7,1,3,-1,-1,-1,-1,-1,-1,-1,4,9,1,4,1,7,0,8,1,8,7,1,-1,-1,-1,-1,4,0,3,7,4,3,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,4,8,7,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,9,10,8,10,11,8,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,3,0,9,3,9,11,11,9,10,-1,-1,-1,-1,-1,-1,-1,0,1,10,0,10,8,8,10,11,-1,-1,-1,-1,-1,-1,-1,3,1,10,11,3,10,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,1,2,11,1,11,9,9,11,8,-1,-1,-1,-1,-1,-1,-1,3,0,9,3,9,11,1,2,9,2,11,9,-1,-1,-1,-1,0,2,11,8,0,11,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,3,2,11,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,2,3,8,2,8,10,10,8,9,-1,-1,-1,-1,-1,-1,-1,9,10,2,0,9,2,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,2,3,8,2,8,10,0,1,8,1,10,8,-1,-1,-1,-1,1,10,2,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,1,3,8,9,1,8,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,0,9,1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,0,3,8,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1]),ce=(o,t,e,s,n,a,i)=>Math.sqrt((o-s)*(o-s)+(t-n)*(t-n)+(e-a)*(e-a))-i;function st(o,t,e,s,n,a,i,r,l){const c=o-s,h=t-n,f=e-a,p=Math.sqrt((c/i)**2+(h/r)**2+(f/l)**2),m=Math.sqrt((c/(i*i))**2+(h/(r*r))**2+(f/(l*l))**2);return m<1e-9?-Math.min(i,r,l):p*(p-1)/m}function rt(o,t,e,s,n,a,i,r,l,c,h){const f=o-s,p=t-n,m=e-a,u=i-s,v=r-n,w=l-a,M=Math.min(1,Math.max(0,(f*u+p*v+m*w)/(u*u+v*v+w*w))),d=f-u*M,g=p-v*M,x=m-w*M;return Math.sqrt(d*d+g*g+x*x)-(c+(h-c)*M)}function Qe(o,t,e,s,n,a,i,r){const l=Math.sqrt((o-s)*(o-s)+(e-a)*(e-a))-i,c=t-n;return Math.sqrt(l*l+c*c)-r}function Jt(o,t,e,s,n,a,i,r,l,c=0){const h=Math.abs(o-s)-i+c,f=Math.abs(t-n)-r+c,p=Math.abs(e-a)-l+c,m=Math.max(h,0),u=Math.max(f,0),v=Math.max(p,0);return Math.sqrt(m*m+u*u+v*v)+Math.min(Math.max(h,f,p),0)-c}function L(o,t,e){const s=Math.max(e-Math.abs(o-t),0)/e;return Math.min(o,t)-s*s*e*.25}function Ot(o,t,e){const s=Math.max(e-Math.abs(o-t),0)/e;return Math.max(o,t)+s*s*e*.25}function Kt(o,t,e,s,n={}){const a=new dl(s,new yo,!1,!1,n.maxTris??9e4);a.isolation=0;const i=a.field,r=s/2,l=n.boundR!==void 0?n.boundR*n.boundR:1/0;let c=0;for(let u=0;u<s;u++){const v=t[2]+(u-r)/r*e;for(let w=0;w<s;w++){const M=t[1]+(w-r)/r*e;for(let d=0;d<s;d++){const g=t[0]+(d-r)/r*e,x=g-t[0],y=M-t[1],S=v-t[2];x*x+y*y+S*S>l?i[c++]=-1:i[c++]=-o(g,M,v)/e}}}a.update();const h=a.count,f=new Float32Array(h*3),p=new Float32Array(h*3);for(let u=0;u<h*3;u+=3){f[u]=t[0]+a.positionArray[u]*e,f[u+1]=t[1]+a.positionArray[u+1]*e,f[u+2]=t[2]+a.positionArray[u+2]*e;const v=a.normalArray[u],w=a.normalArray[u+1],M=a.normalArray[u+2],d=Math.sqrt(v*v+w*w+M*M)||1;p[u]=v/d,p[u+1]=w/d,p[u+2]=M/d}a.geometry.dispose();const m=new Gt;return m.setAttribute("position",new ct(f,3)),m.setAttribute("normal",new ct(p,3)),m}function wo(o){const t=o.attributes.position.array,e=o.attributes.normal.array,s=t.length/3,n=new Float32Array(t.length),a=new Float32Array(e.length);for(let r=0;r<s;r+=3)for(let l=0;l<3;l++){const c=(r+l)*3,h=(r+(l===1?2:l===2?1:0))*3;n[h]=-t[c],n[h+1]=t[c+1],n[h+2]=t[c+2],a[h]=-e[c],a[h+1]=e[c+1],a[h+2]=e[c+2]}const i=new Gt;return i.setAttribute("position",new ct(n,3)),i.setAttribute("normal",new ct(a,3)),i}function pl(o){const t=o.attributes.position,e=new Float32Array(t.count*3),s=(n,a)=>Math.max(0,1-n/a)**1.5;for(let n=0;n<t.count;n++){const a=Math.abs(t.getX(n)),i=t.getY(n),r=t.getZ(n);let l=1,c=1,h=1;const f=(p,m,u,v)=>{l+=(m-l)*p,c+=(u-c)*p,h+=(v-h)*p};if(r>.06){const p=s(Math.sqrt((a/.024)**2+((i-.132)/.0105)**2),1);f(p*.52,.98,.77,.75),f(s(Math.hypot(a-.047,i-.158,r-.065),.034)*.24,1,.88,.86),f(s(Math.hypot(a-.034,(i-.2)*1.25,r-.075),.03)*.16,.91,.84,.82),f(s(Math.hypot(a-.034,i-.18,r-.075),.014)*.045,.97,.91,.91),f(s(Math.hypot(a-.0066,i-.15,r-.099),.009)*.35,.68,.53,.51),f(s(Math.hypot(a,i-.158,r-.108),.012)*.18,1,.88,.86)}e[n*3]=l,e[n*3+1]=c,e[n*3+2]=h}return o.setAttribute("color",new ct(e,3)),o}function Ka(o=1){return pl(Kt((e,s,n)=>{const a=Math.abs(e);let i=st(a,s,n,0,.217,-.018,.074,.09,.098);return i=L(i,st(a,s,n,0,.187,.02,.06,.076,.068),.052),i=L(i,rt(a,s,n,.042,.15,-.014,0,.116,.059,.0115,.0105),.038),i=L(i,ce(a,s,n,0,.113,.06,.019),.03),i=L(i,ce(a,s,n,.048,.178,.043,.0145),.04),i=L(i,st(a,s,n,.04,.16,.045,.012,.014,.011),.04),i=L(i,rt(a,s,n,0,.212,.078,.046,.207,.069,.0115,.0105),.02),i=L(i,rt(a,s,n,0,.207,.081,0,.168,.092,.0065,.008),.018),i=L(i,ce(a,s,n,0,.16,.094,.009),.014),i=L(i,ce(a,s,n,.0095,.156,.091,.0065),.01),i=L(i,rt(a,s,n,0,.095,-.016,0,0,-.004,.037,.044),.04),i=L(i,ce(a,s,n,0,.07,.04,.0045),.012),i=L(i,st(a,s,n,.0775,.191,-.012,.0085,.034,.022),.012),i=L(i,rt(a,s,n,0,.1372,.0792,.019,.1338,.0725,.0055,.0045),.009),i=L(i,ce(a,s,n,.0042,.1376,.0805,.0036),.005),i=L(i,rt(a,s,n,0,.1222,.0765,.016,.1242,.0705,.006,.005),.009),i=Ot(i,-st(a,s,n,.034,.2,.083,.021,.016,.02),.012),i=Ot(i,-ce(a,s,n,.0066,.149,.097,.0042),.003),i=Ot(i,-st(a,s,n,0,.13,.082,.019,7e-4,.011),.002),i=Ot(i,-rt(a,s,n,.003,.148,.095,.003,.141,.09,9e-4,9e-4),.002),i=Ot(i,-rt(a,s,n,.022,.15,.078,.028,.128,.07,.0012,.001),.005),i=L(i,ce(a,s,n,.05,.15,-.012,.012),.04),i=L(i,rt(a,s,n,.044,.118,-.032,.02,0,.016,.014,.014),.04),i=Ot(i,-st(a,s,n,.085,.19,-.008,.008,.02,.011),.006),i=L(i,st(a,s,n,.034,.2135,.0745,.0165,.0065,.0115),.006),i=L(i,st(a,s,n,.034,.1865,.0745,.0155,.004,.01),.005),i},[0,.16,.02],.2,Math.max(24,Math.round(84*o)),{boundR:.26}))}function Za(o=1){const t=(s,n,a,i,r,l,c)=>{let h=1e9,f=0,p=-.082,m=i,u=0;const v=[r*.5,r*.32,r*.24],w=[l,l*.88,l*.78];for(let M=0;M<3;M++){u+=c*(M===0?.55:1);const d=f-Math.sin(u)*v[M],g=p-Math.cos(u)*v[M];h=Math.min(h,rt(s,n,a,f,p,m,d,g,m,w[M],w[Math.min(M+1,2)]*.96)),f=d,p=g}return h};return Kt((s,n,a)=>{let i=Jt(s,n,a,0,-.044,0,.014,.036,.036,.011);i=L(i,rt(s,n,a,0,.012,0,0,-.02,0,.021,.026),.02),i=L(i,st(s,n,a,-.004,-.032,.03,.014,.024,.013),.015);const r=.52;return i=L(i,t(s,n,a,.027,.074,.0088,r),.006),i=L(i,t(s,n,a,.009,.082,.0091,r+.03),.006),i=L(i,t(s,n,a,-.009,.076,.0086,r+.06),.006),i=L(i,t(s,n,a,-.026,.06,.0078,r+.1),.006),i=L(i,rt(s,n,a,-.004,-.04,.034,-.012,-.066,.046,.0108,.0092),.01),i=L(i,rt(s,n,a,-.012,-.066,.046,-.02,-.086,.05,.0092,.0078),.008),i},[-.02,-.07,.005],.1,Math.max(24,Math.round(64*o)),{boundR:.13})}function vl(o,t){return o===1?t:wo(t)}function Js(o,t,e){const s=Math.abs(o);let n=st(s,t,e,0,1.33,0,.143,.17,.096);n=L(n,st(s,t,e,.055,1.31,.028,.073,.061,.071),.055),n=L(n,st(s,t,e,0,1.14,0,.126,.17,.09),.075),n=L(n,st(s,t,e,0,.97,-.004,.145,.13,.104),.075),n=L(n,rt(s,t,e,.018,1.475,-.01,.145,1.355,-.002,.035,.04),.068),n=L(n,st(s,t,e,.145,1.35,0,.042,.056,.055),.052),n=L(n,rt(s,t,e,0,1.46,-.02,0,1.535,-.02,.061,.046),.065),n=L(n,Qe(s,t,e,0,1.525,0,.074,.026),.02),n=L(n,Jt(s,t,e,.085,1.27,.094,.04,.03,.014,.006),.006),n=Ot(n,.88-t,.03),n=Ot(n,-rt(s,t,e,0,1.43,-.006,0,1.62,-.006,.058,.058),.014);const a=Math.atan2(e,o);return n+=(Math.sin(a*7+t*13)*.5+Math.sin(a*12-t*8+1.7)*.3)*(t<1.15?.0055:.0028),n}function qa(o=1){return Kt(Js,[0,1.22,-.005],.5,Math.max(24,Math.round(92*o)),{boundR:.55,maxTris:16e4})}function gl(){const o=(e,s,n)=>Math.abs(Js(e,s,n)-.0075)-.0075;return Kt((e,s,n)=>{const a=Math.abs(e),i=Jt(a,s,n,.04,1.335,.058,.04,.006,.11,.003),r=Math.abs(s-1.045)-.017,l=Math.min(i,r);return Math.max(o(e,s,n),l)},[0,1.25,-.005],.4,100,{boundR:.46,maxTris:12e4})}function xl(){const o=(e,s,n)=>Math.abs(Js(e,s,n)-.006)-.006;return Kt((e,s,n)=>Math.max(o(e,s,n),Jt(e,s,n,0,1.2,.12,.0055,.265,.1,.002)),[0,1.2,.08],.3,80,{boundR:.34,maxTris:4e4})}function Qa(o=1){return Kt((e,s,n)=>{let a=rt(e,s,n,0,0,0,0,-.28,0,.052,.044);a=L(a,ce(e,s,n,0,.005,0,.052),.024),a=L(a,st(e,s,n,.004,-.045,0,.052,.072,.053),.035),a=L(a,st(e,s,n,0,-.13,.011,.048,.09,.046),.03);const i=Math.atan2(n,e);return a+=(Math.sin(i*6+s*17)*.5+Math.sin(i*3-s*9)*.3)*.0028,a},[0,-.14,0],.23,Math.max(24,Math.round(60*o)),{boundR:.3})}function Ja(o=1){return Kt((e,s,n)=>{let a=rt(e,s,n,0,0,0,0,-.255,0,.046,.039);a=L(a,st(e,s,n,0,-.07,.004,.05,.095,.046),.03),a=L(a,Qe(e,s,n,0,-.246,0,.039,.0092),.01);const i=Math.atan2(n,e);return a+=(Math.sin(i*5+s*21)*.5+Math.sin(i*9-s*11)*.3)*.0026*(s>-.2?1:.4),a},[0,-.13,0],.21,Math.max(24,Math.round(56*o)),{boundR:.24})}function ti(o=1){return Kt((e,s,n)=>{let a=rt(e,s,n,0,0,0,0,-.42,0,.108,.074);a=L(a,st(e,s,n,0,-.16,.02,.1,.17,.095),.05),a=L(a,st(e,s,n,0,-.1,-.035,.092,.12,.085),.05);const i=Math.atan2(n,e);return a+=(Math.sin(i*6+s*15)*.5+Math.sin(i*3-s*8+2.1)*.35)*.0034,a+=Math.max(0,Math.sin(s*70+1.1))*.0018*(s<-.3?1:0),a},[0,-.2,0],.28,Math.max(24,Math.round(60*o)),{boundR:.34})}function ei(o=1){return Kt((e,s,n)=>{let a=rt(e,s,n,0,0,0,0,-.26,0,.074,.058);a=L(a,st(e,s,n,0,-.1,-.03,.06,.12,.06),.04),a=L(a,Qe(e,s,n,0,-.232,0,.063,.014),.012),a=L(a,Qe(e,s,n,0,-.215,0,.066,.012),.01);const i=Math.atan2(n,e);return a+=(Math.sin(i*5+s*19)*.5+Math.sin(i*8-s*9)*.3)*.0028,a},[0,-.13,0],.22,Math.max(24,Math.round(56*o)),{boundR:.26})}function oi(o=1){return Kt((e,s,n)=>{const a=Math.abs(e);let i=rt(a,s,n,0,-.17,0,0,-.39,.012,.06,.058);i=L(i,st(a,s,n,0,-.432,-.04,.046,.042,.048),.03),i=L(i,st(a,s,n,0,-.436,.03,.05,.04,.085),.03),i=L(i,st(a,s,n,0,-.446,.12,.051,.034,.062),.03),i=L(i,Qe(a,s,n,0,-.285,0,.059,.011),.01);const r=Jt(a,s-Math.max(0,n-.11)*.18,n,0,-.468,.062,.06,.02,.148,.014);return i=L(i,r,.008),i+=Math.max(0,Math.sin(n*120))*.0012*(s<-.482?1:0),i},[0,-.36,.04],.24,Math.max(24,Math.round(80*o)),{boundR:.28})}function Ls(o=1,t="short"){const e=t==="long",s=h=>Math.min(1,Math.max(0,h)),n=[[-.052,.261,.064,-.058,.239,.084],[-.036,.265,.07,-.045,.234,.091],[-.019,.267,.073,-.023,.239,.094],[0,.267,.075,.007,.231,.095],[.02,.266,.071,.03,.238,.092],[.039,.263,.067,.05,.241,.086],[.053,.258,.062,.06,.244,.08]],r=Kt((h,f,p)=>{const m=Math.abs(h);let u=st(m,f,p,0,.221,-.018,.0855,.099,.106);u=L(u,st(m,f,p,0,.205,-.055,.078,.088,.07),.02),e&&(u=L(u,rt(m,f,p,0,.17,-.078,0,-.04,-.09,.072,.06),.05));const v=.262-.05*(m/.08)*(m/.08),w=s((p+.01)/.03);u=Ot(u,(v-f)*w-(1-w)*.5,.014),u=Ot(u,-st(m,f,p,.079,.191,-.012,.022,.044,.034),.01),u=Ot(u,(e?-.07:.158)-f,.014);for(const d of n)u=L(u,rt(h,f,p,d[0],d[1],d[2],d[3],d[4],d[5],.006,.0028),.005);const M=Math.atan2(h,p);return u+=.0012*Math.sin(M*80+Math.sin(f*45)*2.2),u},e?[0,.1,-.04]:[0,.19,-.015],e?.24:.15,Math.max(24,Math.round(80*o)),{boundR:e?.3:.2}),l=r.attributes.position,c=new Float32Array(l.count*3);for(let h=0;h<l.count;h++){const f=l.getX(h),p=l.getY(h),m=l.getZ(h),u=Math.atan2(f,m),v=Math.sin(u*70+Math.sin(p*45)*2.2)*.5+.5,w=Math.sin(u*9+p*22)*.5+.5,M=.55+v*.45+w*.25+Math.max(0,p-.28)*2.2;c[h*3]=.075*M,c[h*3+1]=.05*M,c[h*3+2]=.034*M}return r.setAttribute("color",new ct(c,3)),r}function wl(o=1){return Kt((e,s,n)=>{const a=Math.abs(e);let i=Jt(a,s,n,0,1.3,-.165,.122,.182,.072,.05);return i=L(i,Jt(a,s,n,0,1.46,-.168,.116,.036,.08,.03),.012),i=L(i,Jt(a,s,n,0,1.425,-.092,.118,.012,.012,.006),.008),i=L(i,Jt(a,s,n,0,1.19,-.235,.095,.07,.024,.02),.012),i=L(i,rt(a,s,n,.14,1.14,-.165,.14,1.27,-.165,.03,.028),.01),i=L(i,rt(a,s,n,-.11,1.1,-.18,.11,1.1,-.18,.034,.034),.01),i+=.0016*Math.exp(-(((a-.07)/.003)**2))*(s>1.1?1:0),i=Ot(i,-Jt(a,s,n,0,1.2,-.285,.003,.07,.01,.001),.001),i},[0,1.25,-.17],.3,Math.max(24,Math.round(88*o)),{boundR:.4,maxTris:9e4})}const Ml=`
varying vec3 vAvLoc;
varying mat3 vAvNM;
float avH(vec3 p) { p = fract(p * 0.3183099 + vec3(0.1, 0.2, 0.3)); p *= 17.0; return fract(p.x * p.y * p.z * (p.x + p.y + p.z)); }
float avN(vec3 x) {
  vec3 i = floor(x), f = fract(x);
  f = f * f * (3.0 - 2.0 * f);
  return mix(mix(mix(avH(i), avH(i + vec3(1, 0, 0)), f.x), mix(avH(i + vec3(0, 1, 0)), avH(i + vec3(1, 1, 0)), f.x), f.y),
             mix(mix(avH(i + vec3(0, 0, 1)), avH(i + vec3(1, 0, 1)), f.x), mix(avH(i + vec3(0, 1, 1)), avH(i + vec3(1, 1, 1)), f.x), f.y), f.z);
}
`,yl={fabric:{fine:260,mid:48,weave:1,bump:4e-4,tone:.06,rough:.1},leather:{fine:210,mid:34,weave:0,bump:.0012,tone:.1,rough:.16},skin:{fine:330,mid:70,weave:0,bump:22e-5,tone:.025,rough:.06},metal:{fine:420,mid:22,weave:0,bump:6e-4,tone:.1,rough:.12}};function Zt(o,t){const e=yl[t];return o.onBeforeCompile=s=>{s.vertexShader=`varying vec3 vAvLoc;
varying mat3 vAvNM;
`+s.vertexShader.replace("#include <begin_vertex>",`#include <begin_vertex>
 vAvLoc = position;
 vAvNM = normalMatrix;`);const n=t==="metal"?`avN(vec3(p.x * ${e.fine.toFixed(1)}, p.y * 6.0, p.z * ${e.fine.toFixed(1)})) * 0.5 + avN(p * ${e.mid.toFixed(1)}) * 0.5`:`avN(p * ${e.mid.toFixed(1)}) * 0.55 + avN(p * ${e.fine.toFixed(1)}) * 0.45${e.weave?" + (sin(p.x * 520.0) * sin(p.y * 520.0) + sin(p.y * 520.0 + 1.0) * sin(p.z * 520.0)) * 0.12":""}`;s.fragmentShader=Ml+`float avHeight(vec3 p) { return ${n}; }
`+s.fragmentShader.replace("#include <color_fragment>",`#include <color_fragment>
         float avT = avN(vAvLoc * ${e.mid.toFixed(1)} * 0.6);
         diffuseColor.rgb *= 1.0 + (avT - 0.5) * ${(e.tone*2).toFixed(3)};`).replace("#include <roughnessmap_fragment>",`#include <roughnessmap_fragment>
         roughnessFactor = clamp(roughnessFactor + (avT - 0.5) * ${(e.rough*2).toFixed(3)}, 0.05, 1.0);`).replace("#include <normal_fragment_maps>",`#include <normal_fragment_maps>
         {
           float avFade = 1.0 - smoothstep(0.004, 0.03, length(fwidth(vAvLoc)));
           if (avFade > 0.01) {
             const float aE = 0.0008;
             vec3 p0 = vAvLoc;
             float h0 = avHeight(p0);
             vec3 g = vec3(avHeight(p0 + vec3(aE, 0.0, 0.0)) - h0, avHeight(p0 + vec3(0.0, aE, 0.0)) - h0, avHeight(p0 + vec3(0.0, 0.0, aE)) - h0) / aE;
             vec3 gv = vAvNM * g;
             gv -= normal * dot(gv, normal);
             normal = normalize(normal - gv * ${e.bump.toFixed(4)} * avFade);
           }
         }`).replace("#include <opaque_fragment>",`${t==="skin"?`{
           // 皮肤次表面散射近似：掠射角处偏暖红的透光边缘
           float avF = pow(1.0 - clamp(abs(dot(normalize(normal), normalize(vViewPosition))), 0.0, 1.0), 2.6);
           outgoingLight += vec3(0.3, 0.09, 0.05) * avF * 0.1;
         }`:""}
         #include <opaque_fragment>`)},o.customProgramCacheKey=()=>`avatar-${t}-${o.vertexColors?"vc":"plain"}`,o.needsUpdate=!0,o}function bl(){const o=(e,s,n=.02,a={})=>new at({color:e,roughness:s,metalness:n,...a});return{jacket:Zt(o(4147772,.84,0,{side:mt}),"fabric"),inner:Zt(o(15526626,.9,0,{side:mt}),"fabric"),trousers:Zt(o(3425628,.88),"fabric"),skin:Zt(o(14858392,.55,0,{emissive:3806728,emissiveIntensity:.05}),"skin"),skinFace:Zt(o(14858392,.5,0,{emissive:3806728,emissiveIntensity:.05,vertexColors:!0}),"skin"),leather:Zt(o(7030320,.62,.04),"leather"),leatherDark:Zt(o(4139549,.66,.04),"leather"),boot:Zt(o(7031344,.6,.05),"leather"),sole:o(1775637,.9),hair:new at({color:16777215,vertexColors:!0,roughness:.42,metalness:.15,side:mt}),brow:o(3811356,.7),trim:o(13214282,.4,.75,{emissive:5913096,emissiveIntensity:.18}),scarf:Zt(o(10238510,.9,0,{side:mt}),"fabric"),brass:Zt(o(11962940,.34,.85),"metal"),armor:Object.assign(new Ie({color:1845043,roughness:.38,metalness:.6,clearcoat:.7,clearcoatRoughness:.25}),{}),eyeWhite:new Ie({color:15986410,roughness:.22,clearcoat:.9,clearcoatRoughness:.08}),lip:o(10113096,.46),tunicVc:Zt(o(16777215,.84,0,{vertexColors:!0,side:mt}),"fabric"),paper:o(16769696,.5,0,{emissive:16753978,emissiveIntensity:1,transparent:!0,opacity:.92})}}class _o{constructor(){F(this,"b",new Ya)}add(t,e,s={}){this.b.add(t,e,s)}box(t,e,s,n,a={},i=.01){this.b.add(new Se(e,s,n,2,Math.min(i,e/2.05,s/2.05,n/2.05)),t,a)}cyl(t,e,s,n,a={},i=16){this.b.add(new Ct(e,s,n,i,1),t,a)}ball(t,e,s={},n=14){this.b.add(new xt(e,n,Math.max(8,n-4)),t,s)}torus(t,e,s,n={},a=Math.PI*2,i=22){this.b.add(new Dt(e,s,8,i,a),t,n)}build(t,e){this.b.build(t,e,{})}}function Je(o,t,e){const s=new gt;return s.position.set(o,t,e),s}function Sl(){const t=document.createElement("canvas");t.width=t.height=256;const e=t.getContext("2d"),s=Xt(77);e.fillStyle="#2a1a10",e.fillRect(0,0,256,256);const n=256/2,a=e.createRadialGradient(n,n,256*.08,n,n,256*.5);a.addColorStop(0,"#5a3a1f"),a.addColorStop(.55,"#8a5a2c"),a.addColorStop(.88,"#3a2412"),a.addColorStop(1,"#150c06"),e.fillStyle=a,e.beginPath(),e.arc(n,n,256*.5,0,Math.PI*2),e.fill();for(let r=0;r<220;r++){const l=s()*Math.PI*2,c=256*(.1+s()*.08),h=256*(.28+s()*.2);e.strokeStyle=`rgba(${s()>.5?"190,140,80":"60,36,18"},${.12+s()*.25})`,e.lineWidth=1+s()*1.4,e.beginPath(),e.moveTo(n+Math.cos(l)*c,n+Math.sin(l)*c),e.lineTo(n+Math.cos(l+(s()-.5)*.12)*h,n+Math.sin(l+(s()-.5)*.12)*h),e.stroke()}e.fillStyle="#060403",e.beginPath(),e.arc(n,n,256*.115,0,Math.PI*2),e.fill();const i=new pa(t);return i.colorSpace=ts,i}let Yn;function Kn(o,t){const e=new Y(new xt(.0115,20,14),o.eyeWhite);e.position.set(t*.034,.2,.062),e.scale.set(1,.94,1),Yn??(Yn=Sl());const s=new gt;s.position.z=.0112;const n=new Y(new es(.0072,28),new at({map:Yn,roughness:.28,metalness:0}));n.position.set(0,0,.002);const a=new Y(new xt(.0072,18,12,0,Math.PI*2,0,Math.PI*.5),new Ie({color:16777215,roughness:.02,metalness:0,transparent:!0,opacity:.16,clearcoat:1,clearcoatRoughness:.02}));a.rotation.x=Math.PI/2,a.position.set(0,0,5e-4);const i=(h,f)=>new xt(.0139,22,10,0,Math.PI*2,h,f-h),r=new Y(i(0,Math.PI*.45),o.skin),l=new Y(i(Math.PI*.86,Math.PI),o.skin),c=new Y(new Dt(.0132,6e-4,4,18,Math.PI*.85),o.brow);return c.rotation.set(0,0,Math.PI*.075),c.position.set(0,0,0),c.scale.set(1,1,.5),c.rotation.x=-.38,c.position.set(0,.004,.0058),s.add(n,a),e.add(s,r,l,c),{eye:e,gaze:s}}function kl(o,t){const e=Je(0,1.5,0),s=new Y(Ka(),o.skinFace);s.castShadow=!0,e.add(s);const n=Kn(o,1),a=Kn(o,-1),i=[];for(const p of[-1,1]){const m=new ss([new C(p*.016,-.001,0),new C(p*.034,.004,.003),new C(p*.052,.002,0),new C(p*.062,-.005,-.006)]),u=new ns(m,10,.0032,6,!1);u.scale(1,.7,.55),i.push(u)}const r=.2165,l=new Y(Yt(i.map(p=>{const m=p.toNonIndexed();return m.deleteAttribute("uv"),m})),o.brow);l.position.set(0,r,.0925),l.rotation.x=-.1;const c=.132,h=new Y(new Cs(.0026,.03,3,8),o.lip);h.rotation.z=Math.PI/2,h.scale.set(1,1,.6),h.position.set(0,c,.0875);const f=new Y(Ls(),o.hair);return f.castShadow=!0,e.add(n.eye,a.eye,l,h,f),t.eyeL=n.eye,t.eyeR=a.eye,t.gazeL=n.gaze,t.gazeR=a.gaze,t.brow=l,t.mouth=h,{head:e,browY:r,mouthY:c}}let ht={};function Zn(o,t){const e=new gt;ht.upper??(ht.upper=Qa()),ht.lower??(ht.lower=Ja()),ht.hand??(ht.hand=Za());const s=c=>t===1?c:wo(c),n=new Y(s(ht.upper),o.jacket);n.castShadow=!0,e.add(n);const a=Je(0,-.28,0);a.rotation.x=-.22,e.add(a),e.userData.elbow=a;const i=new Y(s(ht.lower),o.jacket);i.castShadow=!0,a.add(i);const r=Je(0,-.27,0);r.rotation.z=t*.04;const l=new Y(vl(t,ht.hand),o.skin);if(l.castShadow=!0,r.add(l),t===1){const c=new _o;c.box(o.leatherDark,.026,.155,.115,{x:-.044,y:-.108,z:.02,rz:-.06},.006),c.box(o.inner,.016,.146,.104,{x:-.034,y:-.108,z:.02,rz:-.06},.003),c.box(o.brass,.03,.15,.008,{x:-.044,y:-.108,z:-.036,rz:-.06},.003),c.build(r,"notebook")}return a.add(r),e}function qn(o,t){const e=new gt;ht.thigh??(ht.thigh=ti()),ht.shin??(ht.shin=ei()),ht.boot??(ht.boot=oi());const s=new Y(ht.thigh.clone(),o.trousers);s.castShadow=!0,e.add(s);const n=Je(0,-.42,0);e.add(n);const a=new Y(ht.shin.clone(),o.trousers);a.castShadow=!0,n.add(a);const i=Je(0,-.43,0);n.add(i);const r=ht.boot.clone();r.translate(0,.43,0);const l=new Y(r,o.boot);l.castShadow=!0,i.add(l);const c=new _o;for(let h=0;h<5;h++)c.box(o.inner,.056,.005,.005,{y:.032-h*.002,z:.052+h*.016,rx:-.4},.002),c.ball(o.brass,.0036,{x:.03,y:.035-h*.002,z:.052+h*.016},6),c.ball(o.brass,.0036,{x:-.03,y:.035-h*.002,z:.052+h*.016},6);return c.build(i,"laces"),{hip:e,knee:n,ankle:i}}function Tl(o){const t=new Y(qa(),o.jacket);return t.castShadow=!0,t}function Al(o){const t=new _o;t.box(o.trousers,.35,.2,.21,{y:.97},.06),t.box(o.brass,.034,.028,.012,{y:1.04,z:.14},.004),t.torus(o.jacket,.085,.024,{y:1.51,rx:Math.PI/2,sx:1.06},Math.PI*2,26),t.torus(o.inner,.078,.014,{y:1.532,rx:Math.PI/2},Math.PI*2,26);for(const e of[-1,1])t.ball(o.brass,.0048,{x:e*.085,y:1.262,z:.112},6);return t.torus(o.scarf,.074,.032,{y:1.54,rx:Math.PI/2},Math.PI*2,26),t.torus(o.scarf,.082,.026,{y:1.51,rx:Math.PI/2-.12},Math.PI*2,26),t.ball(o.scarf,.044,{x:-.056,y:1.5,z:.075,sy:1.1,sz:.9},12),t}function _l(o){const t=Je(.07,1.48,-.08),e=new At(.15,.52,3,10);e.translate(0,-.26,0);const s=e.attributes.position;for(let i=0;i<s.count;i++){const r=s.getX(i),l=s.getY(i);s.setZ(i,Math.sin(r*60+l*8)*.008*(1+-l*1.5)- -l*.03)}e.computeVertexNormals();const n=new Y(e,o.scarf);n.castShadow=!0;const a=new _o;for(let i=0;i<8;i++)a.cyl(o.scarf,.0016,.0016,.035,{x:-.066+i*.019,y:-.54,z:-.018},4);return a.build(t,"scarf-fringe"),t.add(n),t.rotation.x=.16,t}function Pl(o){const t=new gt,e=new _o;e.cyl(o.paper,.046,.04,.1,{y:0},6),e.cyl(o.brass,.06,.05,.016,{y:.058},6),e.add(new to(.066,.05,6),o.brass,{y:.09}),e.cyl(o.brass,.05,.05,.014,{y:-.057},6);for(let n=0;n<6;n++){const a=n/6*Math.PI*2;e.cyl(o.brass,.0022,.0022,.1,{x:Math.cos(a)*.045,y:0,z:Math.sin(a)*.045},4)}e.torus(o.brass,.034,.0035,{y:.108},Math.PI,12),e.ball(o.brass,.008,{y:.122},8),e.build(t,"lantern");const s=new ga(16757575,1.2,10);return t.add(s),t}function f1(o){const t=new gt;t.name="Explorer";const e=bl(),s=new gt;s.position.y=.98;const n=new gt;n.position.y=-.98,s.add(n),t.add(s),n.add(Tl(e));const a=new Y(gl(),e.leatherDark);a.castShadow=!0;const i=new Y(xl(),e.brass),r=new Y(wl(),e.leather);r.castShadow=!0,n.add(a,i,r),Al(e).build(n,"torso");const l={},{head:c,browY:h,mouthY:f}=kl(e,l);c.position.y-=.98,s.add(c);const p=_l(e);p.position.y-=.98,s.add(p);const m=qn(e);m.hip.position.set(.09,.91,0);const u=qn(e);u.hip.position.set(-.09,.91,0),t.add(m.hip,u.hip);const v=Zn(e,1);v.position.set(.166,1.405-.98,0);const w=Zn(e,-1);w.position.set(-.166,1.405-.98,0),v.rotation.z=.035,w.rotation.z=-.035,s.add(v,w);const M=Pl(e);M.name="ExplorerLantern",M.position.set(0,-.69,.1),w.add(M);const d=new Y(new va(.5,.64,36),new yo({color:9684477,transparent:!0,opacity:.22,side:mt}));d.rotation.x=-Math.PI/2,d.position.y=.03,d.userData.isFootRing=!0,t.add(d);const g={leftLeg:m,rightLeg:u,spine:s,leftArm:v,rightArm:w,head:c,cape:p,eyeL:l.eyeL,eyeR:l.eyeR,gazeL:l.gazeL,gazeR:l.gazeR,brow:l.brow,mouth:l.mouth,faceRest:{browY:h,mouthY:f},mats:{jacket:e.jacket,trim:e.trim,cape:e.scarf}};return t.userData.rig=g,ba(t,{body:g.spine,bodyRestY:.98,head:g.head,leftArm:g.leftArm,rightArm:g.rightArm,leftElbow:g.leftArm.userData.elbow,rightElbow:g.rightArm.userData.elbow,leftHip:g.leftLeg.hip,rightHip:g.rightLeg.hip,leftKnee:g.leftLeg.knee,rightKnee:g.rightLeg.knee,leftAnkle:g.leftLeg.ankle,rightAnkle:g.rightLeg.ankle,blinkLeft:()=>1-g.eyeL.scale.y,blinkRight:()=>1-g.eyeR.scale.y,mouthOpen:()=>Math.max(0,g.mouth.scale.y-1)*.15,smile:()=>Math.max(0,g.mouth.scale.x-1)*.6,gazeX:()=>g.gazeL.position.x*80,gazeY:()=>g.gazeL.position.y*80},"male",{model:o}),t}function si(o){return[{off:-o-.55,lift:-.04,tone:.55},{off:-o-.18,lift:.1,tone:.78},{off:-o,lift:.17,tone:.95},{off:-o*.7,lift:.09,tone:1},{off:0,lift:.13,tone:1.06},{off:o*.7,lift:.09,tone:1},{off:o,lift:.17,tone:.95},{off:o+.18,lift:.1,tone:.78},{off:o+.55,lift:-.04,tone:.55}]}function Dl(o,t){const e=si(t);if(o<=e[0].off)return e[0].lift;for(let s=1;s<e.length;s++)if(o<=e[s].off){const n=e[s-1],a=e[s],i=(o-n.off)/(a.off-n.off||1);return n.lift+(a.lift-n.lift)*i}return e[e.length-1].lift}function d1(o,t){const e=new gt;e.name="road";const s=t.width/2,n=new W(t.base),a=si(s),i=a.length,r=[],l=[],c=[],h=new C,f=new C,p=new W,m=new W(5208632);for(let M=0;M<=t.steps;M++){const d=M/t.steps;o.getPoint(d,h),o.getTangent(d,f);const g=-f.z,x=f.x,y=Math.hypot(g,x)||1;for(let S=0;S<i;S++){const{off:k,lift:b,tone:T}=a[S],A=h.x+g/y*k,_=h.z+x/y*k;r.push(A,t.groundY(A,_)+b,_);const P=.88+.24*ln(A*1.7,_*1.7,2);p.copy(n).multiplyScalar(T*P);const D=1-.14*Math.exp(-Math.pow((Math.abs(k)-s*.5)/(s*.18),2));if(p.multiplyScalar(D),Math.abs(k)>s){const R=.4+.5*ln(A*.9+40,_*.9+12,2);p.lerp(m,Math.min(.95,R*((Math.abs(k)-s)/.55+.35)))}l.push(p.r,p.g,p.b)}if(M>0){const S=M*i,k=(M-1)*i;for(let b=0;b<i-1;b++)c.push(k+b,S+b,k+b+1,k+b+1,S+b,S+b+1)}}const u=new Gt;u.setAttribute("position",new vt(r,3)),u.setAttribute("color",new vt(l,3)),u.setIndex(c),u.computeVertexNormals();const v=new at({color:16777215,vertexColors:!0,roughness:.96,metalness:.02,side:mt});j0(v);const w=new Y(u,v);if(w.receiveShadow=!0,e.add(w),t.inlay){const M=[],d=[];for(let S=0;S<=t.steps;S++){const k=S/t.steps;o.getPoint(k,h),o.getTangent(k,f);const b=-f.z,T=f.x,A=Math.hypot(b,T)||1;for(const _ of[-.09,.09]){const P=h.x+b/A*_,D=h.z+T/A*_;M.push(P,t.groundY(P,D)+.17,D)}if(S>0){const _=S*2,P=(S-1)*2;d.push(P,_,P+1,P+1,_,_+1)}}const g=new Gt;g.setAttribute("position",new vt(M,3)),g.setIndex(d),g.computeVertexNormals();const x=new at({color:t.inlay.color,emissive:t.inlay.emissive,emissiveIntensity:t.inlay.intensity,roughness:.4,side:mt}),y=new Y(g,x);y.userData.noShadow=!0,e.add(y)}return e}const Ts=[.02,.04],Rl=.1;function ni(o){let t=0;for(let e=0;e<o.length;e++){const[s,n]=o[e],[a,i]=o[(e+1)%o.length];t+=s*i-a*n}return t*.5}function ai(o,t,e,s){const n=[];for(let a=0;a<o.length;a++){const i=o[a],r=o[(a+1)%o.length],l=t*i[0]+e*i[1]-s,c=t*r[0]+e*r[1]-s;if(l<=0&&n.push(i),l<0&&c>0||l>0&&c<0){const h=l/(l-c);n.push([i[0]+(r[0]-i[0])*h,i[1]+(r[1]-i[1])*h])}}return n}function Cl(o,t){let e=o;const s=o.length;for(let n=0;n<s&&e.length>=3;n++){const a=o[n],i=o[(n+1)%s],r=i[0]-a[0],l=i[1]-a[1],c=Math.hypot(r,l);if(c<1e-6)continue;const h=l/c,f=-r/c;e=ai(e,h,f,h*a[0]+f*a[1]-t)}return e}function Qn(o,t=1e-5){const e=[];for(const s of o){const n=e[e.length-1];(!n||Math.hypot(s[0]-n[0],s[1]-n[1])>t)&&e.push(s)}for(;e.length>1&&Math.hypot(e[0][0]-e[e.length-1][0],e[0][1]-e[e.length-1][1])<=t;)e.pop();return e}function El(o){const t=o.slice();for(;t.length>8;){let e=0,s=1/0;for(let n=0;n<t.length;n++){const a=t[(n+t.length-1)%t.length],i=t[n],r=t[(n+1)%t.length],l=Math.abs((i[0]-a[0])*(r[1]-a[1])-(r[0]-a[0])*(i[1]-a[1]));l<s&&(s=l,e=n)}t.splice(e,1)}for(;t.length<5;){let e=0,s=-1;for(let c=0;c<t.length;c++){const h=t[c],f=t[(c+1)%t.length],p=Math.hypot(f[0]-h[0],f[1]-h[1]);p>s&&(s=p,e=c)}const n=t[e],a=t[(e+1)%t.length],i=a[0]-n[0],r=a[1]-n[1],l=Math.hypot(i,r)||1;t.splice(e+1,0,[(n[0]+a[0])/2+r/l*.003,(n[1]+a[1])/2-i/l*.003])}return t}function zl(o){const t=[o[0].x],e=[o[0].z],s=[0];for(let l=1;l<o.length;l++){const c=Math.hypot(o[l].x-o[l-1].x,o[l].z-o[l-1].z);c<1e-6||(t.push(o[l].x),e.push(o[l].z),s.push(s[s.length-1]+c))}const n=s[s.length-1],a=t.length,i=[],r=[];for(let l=0;l<a;l++){const c=Math.max(0,l-1),h=Math.min(a-1,l+1),f=t[h]-t[c],p=e[h]-e[c],m=Math.hypot(f,p)||1;i.push(f/m),r.push(p/m)}return{length:n,at(l){const c=Math.min(n,Math.max(0,l));let h=0,f=a-1;for(;f-h>1;){const M=h+f>>1;s[M]<=c?h=M:f=M}const p=Math.max(1e-9,s[f]-s[h]),m=(c-s[h])/p;let u=i[h]+(i[f]-i[h])*m,v=r[h]+(r[f]-r[h])*m;const w=Math.hypot(u,v)||1;return u/=w,v/=w,{x:t[h]+(t[f]-t[h])*m,z:e[h]+(e[f]-e[h])*m,tx:u,tz:v}}}}function Jn(o,t,e){const s=o.at(t);return[s.x-s.tz*e,s.z+s.tx*e]}function Nl(o,t,e,s=0,n=o){const a=Xt(Math.floor(e)*2654435+91),i=Math.max(2,Math.round(t/.82)),r=t/i,l=r*1.3,c=t/2,h=Math.floor(s/l)-1,f=Math.ceil(n/l)+1,p=[];for(let u=h;u<=f;u++)for(let v=0;v<i;v++)p.push({s:(u+.5+.5*(v&1))*l+(a()-.5)*.6*l,t:-c+(v+.5)*r+(a()-.5)*.6*r});const m=[];for(let u=0;u<p.length;u++){const v=p[u],w=-c+a()*.1,M=c-a()*.1,d=a()<.04,g=Ts[0]+a()*(Ts[1]-Ts[0]),x=a();if(v.s<s-l||v.s>n+l)continue;let y=[[Math.max(s,v.s-2*l),w],[Math.min(n,v.s+2*l),w],[Math.min(n,v.s+2*l),M],[Math.max(s,v.s-2*l),M]];if(y[0][0]>=y[1][0])continue;const S=Math.max(0,u-4*i),k=Math.min(p.length,u+4*i+1);for(let _=S;_<k&&y.length>=3;_++){if(_===u)continue;const P=p[_];if(Math.abs(P.s-v.s)>2.6*l||Math.abs(P.t-v.t)>2.6*r)continue;const D=P.s-v.s,R=P.t-v.t,z=(P.s+v.s)/2,N=(P.t+v.t)/2;y=ai(y,D,R,D*z+R*N)}if(y.length<3||d||(y=Qn(y),y.length<3)||(y=Qn(Cl(y,g)),y.length<3)||ni(y)<Rl)continue;y=El(y);let T=0,A=0;for(const _ of y)T+=_[0],A+=_[1];m.push({poly:y,cs:T/y.length,ct:A/y.length,tone:x})}return m}function m1(o,t=6){if(o.length<3)return o.map(s=>({x:s.x,z:s.z}));const e=[{x:o[0].x,z:o[0].z}];for(let s=1;s<o.length-1;s++){const n=o[s-1],a=o[s],i=o[s+1],r=Math.hypot(a.x-n.x,a.z-n.z)||1,l=Math.hypot(i.x-a.x,i.z-a.z)||1,c=Math.min(t,r*.45),h=Math.min(t,l*.45);e.push({x:a.x+(n.x-a.x)/r*c,z:a.z+(n.z-a.z)/r*c},{x:a.x,z:a.z},{x:a.x+(i.x-a.x)/l*h,z:a.z+(i.z-a.z)/l*h})}return e.push({x:o[o.length-1].x,z:o[o.length-1].z}),e}const Fl=[13094096,13619146,14208703,12897224],Il=[8095636,7502984,6910847,7700618],Ll=new W(5202741),Ht=.7;function ta(o,t,e,s,n,a,i,r){const l=t.length;let c=0,h=0;for(const T of t)c+=T[0],h+=T[1];c/=l,h/=l;const f=[];for(let T=0;T<l;T++){const[A,_]=t[T];f.push(s(A,_)+n(e[T])+(ji(A*2.1+3,_*2.1)-.5)*.02)}const p=f.reduce((T,A)=>T+A,0)/l,m=new W(a[Math.min(a.length-1,Math.floor(i.tone*a.length))]),u=new W(a[Math.min(a.length-1,Math.floor(i.tone*a.length)+1)%a.length]);m.lerp(u,i.tone*a.length%1),m.multiplyScalar(.84+r()*.26);const v=new W,w=(T,A,_,P,D,R,z)=>(v.copy(m).multiplyScalar(z).lerp(Ll,R),o.pos.push(T,A,_),o.col.push(v.r,v.g,v.b),o.uv.push(P,D),o.pos.length/3-1),M=t.map(([T,A])=>{const _=T-c,P=A-h,D=Math.hypot(_,P)||1,R=Math.min(i.bevel,D*.35)/D;return[T-_*R,A-P*R]}),d=w(c,p+.008,h,c*Ht,h*Ht,0,1.04),g=[];for(let T=0;T<l;T++){const A=.93+r()*.07;g.push(w(M[T][0],f[T],M[T][1],M[T][0]*Ht,M[T][1]*Ht,i.mossy*.25*r(),A))}for(let T=0;T<l;T++)o.idx.push(d,g[(T+1)%l],g[T]);const x=[],y=[];for(let T=0;T<l;T++)x.push(w(M[T][0],f[T],M[T][1],M[T][0]*Ht,M[T][1]*Ht,i.mossy*.25,.94)),y.push(w(t[T][0],f[T]-i.drop-r()*.006,t[T][1],t[T][0]*Ht,t[T][1]*Ht,i.mossy*.55*(.5+r()),.8));const S=[],k=[];let b=0;for(let T=0;T<l;T++){const[A,_]=t[T],P=t[(T+l-1)%l];b+=Math.hypot(A-P[0],_-P[1]);const D=f[T]-i.drop,R=Math.min(D-i.thickness+i.drop,s(A,_)-.06);S.push(w(A,D,_,b*Ht,D*Ht,i.mossy*.7,.72)),k.push(w(A,R,_,b*Ht,R*Ht,i.mossy*.9,.45))}for(let T=0;T<l;T++){const A=(T+1)%l;o.idx.push(x[T],x[A],y[T],x[A],y[A],y[T]),o.idx.push(S[T],S[A],k[T],S[A],k[A],k[T])}}function Ul(o,t,e,s){const n=5+Math.floor(s()*2),a=s()*6.28,i=.85+s()*.5,r=[];for(let l=0;l<n;l++){const c=a+l/n*Math.PI*2+(s()-.5)*.4,h=e*(.75+s()*.5);r.push([o+Math.cos(c)*h*i,t+Math.sin(c)*h])}return r}function Ol(o,t){const e=new gt;e.name="flagstone-path";const s={pos:[],col:[],uv:[],idx:[]},n=t.width/2,a=t.lift??(h=>Dl(h,n)+.05),i=t.palette==="unit"?Il:Fl,r=t.quality==="high"?1.2:t.quality==="med"?.7:.3;if(o.forEach((h,f)=>{if(h.length<2)return;const p=zl(h),m=t.startInset??0,u=p.length-(t.endInset??0);if(u-m<1)return;const v=t.seed+f*977,w=Xt(v*31+7);for(const d of Nl(p.length,t.width,v,m,u)){const g=d.poly.map(([y,S])=>Jn(p,y,S)),x=d.poly.map(([,y])=>y);ni(g)<0&&(g.reverse(),x.reverse()),ta(s,g,x,t.groundY,a,i,{thickness:.08+w()*.04,bevel:.022+w()*.012,drop:.02+w()*.01,tone:d.tone,mossy:w()<.4?.3+w()*.7:w()*.25},w)}const M=Math.floor((u-m)*r);for(let d=0;d<M;d++){const g=d&1?1:-1,x=m+w()*(u-m),y=g*(n-.15+Math.pow(w(),1.6)*.75),[S,k]=Jn(p,x,y),b=.045+w()*w()*.12,T=Ul(S,k,b,w);ta(s,T,T.map(()=>y),t.groundY,A=>Math.max(.012,a(A)-.04),i,{thickness:.05,bevel:Math.min(.015,b*.3),drop:.012,tone:w(),mossy:w()*.6},w)}}),s.idx.length===0)return e;const l=new Gt;l.setAttribute("position",new vt(s.pos,3)),l.setAttribute("color",new vt(s.col,3)),l.setAttribute("uv",new vt(s.uv,2)),l.setIndex(new ct(s.pos.length/3>65535?new Uint32Array(s.idx):new Uint16Array(s.idx),1)),l.computeVertexNormals(),l.computeBoundingSphere();const c=new Y(l,Sr());return c.name="flagstones",c.receiveShadow=!0,c.castShadow=!1,e.add(c),e}function p1(o,t){const e=o.getLength(),s=o.getSpacedPoints(Math.max(4,Math.ceil(e/.5))).map(n=>({x:n.x,z:n.z}));return Ol([s],t)}class v1{constructor(t){F(this,"ratio");F(this,"avgMs",16.7);F(this,"max");F(this,"min");F(this,"step");F(this,"high");F(this,"low");F(this,"hold");F(this,"slow",0);F(this,"fast",0);F(this,"cooldown",0);F(this,"clock",0);F(this,"lastRaiseAt",-1/0);F(this,"ceiling",1/0);F(this,"ceilingUntil",0);this.max=t.max,this.min=Math.min(t.min??.75,t.max),this.step=t.step??.25,this.high=t.high??18,this.low=t.low??12,this.hold=t.hold??2,this.ratio=Math.min(t.max,Math.max(this.min,t.initial??t.max))}setMax(t){this.max=t,this.ratio>t&&(this.ratio=t)}push(t,e){if(!(t>0)||t>300||!(e>0)||e>.5)return null;if(this.clock+=e,this.avgMs+=(t-this.avgMs)*(1-Math.exp(-e/.35)),this.cooldown>0)return this.cooldown-=e,this.slow=this.fast=0,null;if(this.avgMs>this.high?(this.slow+=e,this.fast=0):this.avgMs<this.low?(this.fast+=e,this.slow=0):this.slow=this.fast=0,this.slow>=this.hold&&this.ratio>this.min+1e-6){const n=Math.max(this.min,this.ratio-this.step);return this.clock-this.lastRaiseAt<12&&(this.ceiling=n,this.ceilingUntil=this.clock+30),this.apply(n)}const s=this.clock<this.ceilingUntil?Math.min(this.max,this.ceiling):this.max;return this.fast>=this.hold&&this.ratio<s-1e-6?(this.lastRaiseAt=this.clock,this.apply(Math.min(s,this.ratio+this.step))):null}apply(t){return this.ratio=t,this.slow=this.fast=0,this.cooldown=this.hold,t}}function g1(){return!1}function x1(o,t,e){const s=document.createElement("div");s.setAttribute("data-perf-overlay",""),s.style.cssText="position:absolute;left:8px;bottom:8px;z-index:9999;padding:6px 8px;border-radius:6px;background:rgba(6,14,24,.72);color:#9fe8ff;font:11px/1.45 ui-monospace,monospace;pointer-events:none;white-space:pre",t.appendChild(s),o.info.autoReset=!1;let n=0,a=0,i=0;return{update(r){if(a++,i+=r,n+=r,n>=250){const l=i/a,c=o.info.render;s.textContent=`${(1e3/Math.max(.1,l)).toFixed(0)} fps  ${l.toFixed(1)} ms
calls ${Math.round(c.calls)}  tris ${Math.round(c.triangles)}
ratio ${o.getPixelRatio().toFixed(2)}${e?`  avg ${e.avgMs.toFixed(1)} ms`:""}`,n=0,a=0,i=0}o.info.reset()},dispose(){o.info.autoReset=!0,s.remove()}}}const Gl=["clear","overcast","lightRain","heavyRain","drizzleMist","snow","windGusts","dusk","night"];function w1(o){return typeof o=="string"&&Gl.includes(o)}const Wl=["cloud","sunMul","hemiMul","envMul","exposureMul","fogMul","skyGrey","skyDark","sunTintR","sunTintG","sunTintB","skyTintR","skyTintG","skyTintB","skyTintAmt","rain","snow","mist","wind","gust","wetTarget"],le=o=>({cloud:.12,sunMul:1,hemiMul:1,envMul:1,exposureMul:1,fogMul:1,skyGrey:0,skyDark:1,sunTintR:1,sunTintG:1,sunTintB:1,skyTintR:.5,skyTintG:.5,skyTintB:.5,skyTintAmt:0,rain:0,snow:0,mist:0,wind:.25,gust:.15,wetTarget:0,...o}),As={clear:le({}),overcast:le({cloud:.85,sunMul:.35,hemiMul:.95,envMul:.85,fogMul:1.25,skyGrey:.55,skyDark:.82,sunTintR:.94,sunTintG:.97,sunTintB:1,wind:.35,gust:.25}),lightRain:le({cloud:.92,sunMul:.22,hemiMul:.85,envMul:.8,exposureMul:1.02,fogMul:1.5,skyGrey:.66,skyDark:.72,sunTintR:.9,sunTintG:.95,sunTintB:1,rain:.45,wind:.4,gust:.3,wetTarget:.7}),heavyRain:le({cloud:1,sunMul:.1,hemiMul:.7,envMul:.65,exposureMul:1.06,fogMul:2.1,skyGrey:.8,skyDark:.55,sunTintR:.86,sunTintG:.92,sunTintB:1,rain:1,wind:.7,gust:.6,wetTarget:1}),drizzleMist:le({cloud:.8,sunMul:.28,hemiMul:.9,envMul:.85,fogMul:2.8,skyGrey:.6,skyDark:.85,sunTintR:.94,sunTintG:.98,sunTintB:1,rain:.16,mist:1,wind:.12,gust:.08,wetTarget:.5}),snow:le({cloud:.9,sunMul:.3,hemiMul:1,envMul:1,exposureMul:1.05,fogMul:1.8,skyGrey:.5,skyDark:.9,sunTintR:.95,sunTintG:.98,sunTintB:1.05,snow:.8,wind:.3,gust:.2,wetTarget:.2}),windGusts:le({cloud:.45,sunMul:.8,skyGrey:.15,wind:.85,gust:1}),dusk:le({cloud:.4,sunMul:.55,hemiMul:.72,envMul:.7,exposureMul:.97,fogMul:1.2,skyDark:.78,sunTintR:1,sunTintG:.72,sunTintB:.82,skyTintR:.78,skyTintG:.5,skyTintB:.68,skyTintAmt:.38,wind:.2,gust:.1}),night:le({cloud:.3,sunMul:.08,hemiMul:.38,envMul:.32,exposureMul:1.15,fogMul:1.3,skyDark:.14,sunTintR:.55,sunTintG:.7,sunTintB:1.15,skyTintR:.05,skyTintG:.1,skyTintB:.24,skyTintAmt:.86,wind:.18,gust:.1})},Bl={high:1.5,med:1,low:.5},Vl=2e3,Hl=1200,jl=160;function $l(o){const t=Bl[o];return{drops:Math.floor(Vl*t),flakes:Math.floor(Hl*t),splashes:Math.floor(jl*t)}}const ea=(o,t)=>1-Math.exp(-Math.max(0,o)*t);class M1{constructor(t="clear"){F(this,"kind");F(this,"target");F(this,"params");F(this,"wet",0);F(this,"rate",1);F(this,"transitioning",!1);F(this,"version",0);this.kind=this.target=t,this.params={...As[t]},this.wet=this.params.wetTarget}set(t,e=4){if(!(t===this.target&&!(e<=0&&this.transitioning))){if(this.target=t,this.kind=t,this.version++,e<=0){Object.assign(this.params,As[t]),this.wet=this.params.wetTarget,this.transitioning=!1,this.rate=1;return}this.rate=4/e,this.transitioning=!0}}update(t){if(t<=0)return;const e=As[this.target],s=this.params,n=ea(t,this.rate);let a=0;for(const r of Wl){let l=e[r];(r==="snow"&&l>0&&s.rain>.02||r==="rain"&&l>0&&s.snow>.02)&&(l=0);const c=(r==="rain"||r==="snow")&&l<s[r]?Math.min(1,n*1.6):n;s[r]+=(l-s[r])*c,a=Math.max(a,Math.abs(e[r]-s[r]))}this.transitioning&&a<.004&&(Object.assign(s,e),this.transitioning=!1);const i=ea(t,s.wetTarget>this.wet?.25:.05);this.wet+=(s.wetTarget-this.wet)*i}windNow(t){const e=Math.max(0,Math.sin(t*.31)*Math.sin(t*.83+1.7));return this.params.wind+this.params.gust*e*e*1.6}get precipitating(){return this.params.rain>.01||this.params.snow>.01}}function y1(o){return .75+Math.min(1.4,o)*1.1}function b1(o,t,e,s=1){const n=1-(1-t.skyDark)*s;let a=o.r*n,i=o.g*n,r=o.b*n;const l=a*.2126+i*.7152+r*.0722,c=t.skyGrey*s;a+=(l-a)*c,i+=(l-i)*c,r+=(l-r)*c;const h=t.skyTintAmt*s,f=Math.max(.05,t.skyTintR*.2126+t.skyTintG*.7152+t.skyTintB*.0722),p=Math.max(l,.02)/f;return e.r=a+(Math.min(1,t.skyTintR*p)-a)*h,e.g=i+(Math.min(1,t.skyTintG*p)-i)*h,e.b=r+(Math.min(1,t.skyTintB*p)-r)*h,e}const S1={unit01:"clear",unit02:"overcast",unit03:"drizzleMist",unit04:"windGusts",unit05:"night",unit06:"lightRain"};class Xl{constructor(t,e=44,s=32){F(this,"texture");F(this,"box",new ke(0,0,1,1));F(this,"lastX",1/0);F(this,"lastZ",1/0);this.sample=t,this.span=e,this.size=s,this.texture=new Le(new Uint16Array(s*s),s,s,ma,It),this.texture.minFilter=this.texture.magFilter=Fe,this.texture.generateMipmaps=!1}update(t,e){const s=Math.round(t/2)*2,n=Math.round(e/2)*2;if(s===this.lastX&&n===this.lastZ)return!1;this.lastX=s,this.lastZ=n;const a=s-this.span/2,i=n-this.span/2;this.box.set(a,i,1/this.span,1/this.span);const r=this.texture.image.data;for(let l=0;l<this.size;l++)for(let c=0;c<this.size;c++)r[l*this.size+c]=da.toHalfFloat(this.sample(a+(c+.5)/this.size*this.span,i+(l+.5)/this.size*this.span));return this.texture.needsUpdate=!0,!0}dispose(){this.texture.dispose()}}const Yl=new Float32Array([-.5,-.5,0,.5,-.5,0,.5,.5,0,-.5,.5,0]),Kl=new Float32Array([0,0,1,0,1,1,0,1]),Zl=[0,1,2,0,2,3];function _s(o,t){const e=new $i;e.setAttribute("position",new ct(Yl,3)),e.setAttribute("uv",new ct(Kl,2)),e.setIndex(Zl);const s=new Float32Array(o*4);let n=t>>>0;const a=()=>{n=n+1831565813>>>0;let i=n;return i=Math.imul(i^i>>>15,i|1),i^=i+Math.imul(i^i>>>7,i|61),((i^i>>>14)>>>0)/4294967296};for(let i=0;i<o;i++)s[i*4]=a(),s[i*4+1]=a(),s[i*4+2]=a(),s[i*4+3]=(i+a())/Math.max(1,o);return e.setAttribute("aRnd",new Xi(s,4)),e.instanceCount=o,e.boundingSphere=new ya(new C,1e6),e.boundingBox=new Us(new C(-1e6,-1e6,-1e6),new C(1e6,1e6,1e6)),e}const oa=`
attribute vec4 aRnd;
uniform vec3 uBoxMin;
uniform vec3 uVol;
uniform vec3 uOff;      // 累积位移（风 + 下落）
uniform vec3 uVel;      // 当前速度方向参考（只用于条纹朝向）
uniform float uIntensity;
uniform float uGroundY;

uniform sampler2D uGroundTex;
uniform vec4 uGroundBox;
uniform float uUseGroundMap;
float weatherGround(vec2 p){return uUseGroundMap>.5?texture2D(uGroundTex,(p-uGroundBox.xy)*uGroundBox.zw).r:uGroundY;}

uniform float uMode;    // 1 雨线 0 雪片
uniform float uLen;
uniform float uWidth;
uniform float uPx;      // 每米距离对应的像素世界尺寸
uniform float uT;
varying vec2 vUv;
varying float vA;
void main() {
  float vis = step(aRnd.w, uIntensity);
  float sv = 0.85 + 0.3 * fract(aRnd.w * 37.0);
  vec3 p = aRnd.xyz * uVol + uOff * sv;
  if (uMode < 0.5) {
    p.x += sin(uT * 0.9 + aRnd.x * 40.0) * 0.35;
    p.z += cos(uT * 0.7 + aRnd.z * 31.0) * 0.35;
  }
  p = uBoxMin + mod(p - uBoxMin, uVol);
  vec3 toCam = cameraPosition - p;
  float dist = length(toCam);
  float below = step(weatherGround(p.xz), p.y);
  vec3 wp;
  float widthW = max(uWidth, dist * uPx * 1.1);
  float aComp = clamp(uWidth / widthW, 0.15, 1.0);
  if (uMode > 0.5) {
    vec3 axis = normalize(uVel);
    vec3 side = normalize(cross(axis, toCam / max(dist, 1e-3)));
    wp = p + axis * position.y * uLen * sv + side * position.x * widthW;
  } else {
    vec3 right = vec3(viewMatrix[0][0], viewMatrix[1][0], viewMatrix[2][0]);
    vec3 up = vec3(viewMatrix[0][1], viewMatrix[1][1], viewMatrix[2][1]);
    float sz = max(uWidth * (0.7 + 0.6 * fract(aRnd.w * 91.0)), dist * uPx * 1.4);
    wp = p + right * position.x * sz + up * position.y * sz;
    aComp = clamp(uWidth / sz, 0.2, 1.0);
  }
  vUv = uv;
  float nearFade = smoothstep(0.5, 1.6, dist);
  float farFade = 1.0 - smoothstep(0.55, 1.0, dist / (0.5 * min(uVol.x, uVol.z)));
  vA = vis * below * nearFade * farFade * aComp;
  gl_Position = (vis * below > 0.5) ? projectionMatrix * viewMatrix * vec4(wp, 1.0) : vec4(2.0, 2.0, 2.0, 1.0);
}
`,ql=`
uniform vec3 uColor;
uniform float uOpacity;
varying vec2 vUv;
varying float vA;
void main() {
  float x = abs(vUv.x - 0.5) * 2.0;
  float a = (1.0 - x * x) * smoothstep(0.0, 0.2, vUv.y) * smoothstep(1.0, 0.55, vUv.y);
  a *= vA * uOpacity;
  if (a < 0.004) discard;
  gl_FragColor = vec4(uColor, a);
}
`,Ql=`
uniform vec3 uColor;
uniform float uOpacity;
varying vec2 vUv;
varying float vA;
void main() {
  float r = length(vUv - 0.5) * 2.0;
  float a = (1.0 - smoothstep(0.35, 1.0, r)) * vA * uOpacity;
  if (a < 0.004) discard;
  gl_FragColor = vec4(uColor, a);
}
`,Jl=`
attribute vec4 aRnd;
uniform vec3 uCamXZ;
uniform float uRadius;
uniform float uGroundY;

uniform sampler2D uGroundTex;
uniform vec4 uGroundBox;
uniform float uUseGroundMap;
float weatherGround(vec2 p){return uUseGroundMap>.5?texture2D(uGroundTex,(p-uGroundBox.xy)*uGroundBox.zw).r:uGroundY;}

uniform float uIntensity;
uniform float uT;
varying vec2 vUv;
varying float vA;
varying float vAge;
void main() {
  float period = 0.55 + 0.5 * fract(aRnd.w * 53.0);
  float ph = fract(uT / period + aRnd.y * 7.0);
  vec2 off = (aRnd.xz - 0.5) * 2.0 * uRadius;
  // 先把相位对应的整数周期换成新的落点，让每一圈涟漪出现在不同位置
  float cycle = floor(uT / period + aRnd.y * 7.0);
  off = (fract(aRnd.xz * 3.7 + cycle * vec2(0.618, 0.382)) - 0.5) * 2.0 * uRadius;
  vec2 wp2 = uCamXZ.xz + off;
  float vis = step(aRnd.w, uIntensity);
  float size = (0.08 + 0.2 * ph) * (0.8 + 0.5 * fract(aRnd.w * 17.0));
  vec3 wp = vec3(wp2.x + position.x * size * 2.0, weatherGround(wp2) + 0.028, wp2.y + position.y * size * 2.0);
  vUv = uv;
  vAge = ph;
  float d = length(off) / uRadius;
  vA = vis * (1.0 - ph) * (1.0 - ph) * (1.0 - smoothstep(0.6, 1.0, d));
  vec4 mv = viewMatrix * vec4(wp, 1.0);
  gl_Position = vis > 0.5 ? projectionMatrix * mv : vec4(2.0, 2.0, 2.0, 1.0);
}
`,tc=`
uniform vec3 uColor;
uniform float uOpacity;
varying vec2 vUv;
varying float vA;
varying float vAge;
void main() {
  float r = length(vUv - 0.5) * 2.0;
  float ring = smoothstep(0.22, 0.0, abs(r - 0.78)) + 0.4 * smoothstep(0.18, 0.0, abs(r - 0.42)) * (1.0 - vAge);
  float a = ring * vA * uOpacity;
  if (a < 0.004) discard;
  gl_FragColor = vec4(uColor, a);
}
`,ec=`
varying vec2 vUv;
void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }
`,oc=`
uniform float uT;
uniform float uWet;     // 玻璃上的水量 0..1
uniform float uSnow;
uniform vec2 uSize;
uniform vec3 uTint;     // 窗外灰色天光
uniform float uOpacity;
varying vec2 vUv;
float h11(float n) { return fract(sin(n * 127.1) * 43758.5453); }
float h21(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
// 一层下滑的水痕：按列分布，头部是一粒水珠，身后拖着渐隐的细痕
float streakLayer(vec2 p, float scale, float seed, float t) {
  vec2 g = vec2(p.x * scale, p.y * scale * 0.42);
  float col = floor(g.x);
  float r = h11(col + seed);
  float x = fract(g.x) - 0.5;
  x += (h11(col * 1.7 + seed) - 0.5) * 0.55;
  float speed = 0.04 + r * 0.1;
  float y = fract(g.y * 0.5 + t * speed + r * 9.0);
  float head = 0.12;
  float dy = y - head;
  float bead = smoothstep(0.075, 0.0, length(vec2(x * 1.15, dy * 2.6)));
  float trail = smoothstep(0.045, 0.0, abs(x)) * smoothstep(0.0, 0.85, dy) * (1.0 - smoothstep(0.85, 1.0, dy)) * step(0.0, dy) * 0.5;
  return (bead + trail) * step(0.35, h11(col * 3.1 + seed * 2.0));
}
// 附着不动的小水珠
float beads(vec2 p, float scale) {
  vec2 g = p * scale;
  vec2 id = floor(g);
  vec2 f = fract(g) - 0.5;
  float h = h21(id);
  vec2 c = (vec2(h21(id + 3.1), h21(id + 7.7)) - 0.5) * 0.5;
  float d = length(f - c);
  return smoothstep(0.17 * h, 0.0, d) * step(0.45, h);
}
void main() {
  vec2 p = vUv * uSize;
  float s = streakLayer(p, 5.0, 1.0, uT) + streakLayer(p + 3.3, 9.0, 4.0, uT * 1.2) * 0.8 + streakLayer(p + 7.1, 14.0, 9.0, uT * 0.8) * 0.6;
  float b = beads(p, 24.0) * 0.7 + beads(p + 2.0, 42.0) * 0.5;
  float water = clamp((s * 0.9 + b) * uWet, 0.0, 1.0);
  // 雪天：窗边结一圈柔霜
  float frost = uSnow * (smoothstep(0.35, 0.0, min(min(vUv.x, 1.0 - vUv.x), min(vUv.y, 1.0 - vUv.y))) * 0.5 + b * 0.3);
  float haze = (0.5 * uWet + 0.4 * uSnow) * 0.22;
  float a = (water * 0.55 + frost * 0.5 + haze) * uOpacity;
  vec3 col = mix(uTint * 0.9, vec3(0.88, 0.94, 1.0), water * 0.7 + frost);
  if (a < 0.004) discard;
  gl_FragColor = vec4(col, a);
}
`,sc=`
varying vec3 vW;
varying vec2 vUv;
void main() { vec4 w = modelMatrix * vec4(position, 1.0); vW = w.xyz; vUv = uv; gl_Position = projectionMatrix * viewMatrix * w; }
`,nc=`
uniform float uWet;
uniform vec3 uSky;
varying vec3 vW;
varying vec2 vUv;
float h21(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float n2(vec2 p) { vec2 i = floor(p), f = fract(p); f = f * f * (3.0 - 2.0 * f);
  return mix(mix(h21(i), h21(i + vec2(1, 0)), f.x), mix(h21(i + vec2(0, 1)), h21(i + vec2(1, 1)), f.x), f.y); }
void main() {
  float n = n2(vW.xz * 0.45) * 0.65 + n2(vW.xz * 1.3) * 0.35;
  float mask = smoothstep(0.58 - uWet * 0.18, 0.7 - uWet * 0.18, n) * smoothstep(0.25, 0.7, uWet);
  vec3 vd = normalize(cameraPosition - vW);
  float fres = pow(1.0 - clamp(vd.y, 0.0, 1.0), 3.0);
  float edge = 1.0 - smoothstep(0.35, 0.5, length(vUv - 0.5));
  float a = mask * edge * (0.25 + 0.6 * fres);
  if (a < 0.004) discard;
  gl_FragColor = vec4(uSky * (0.6 + 0.5 * fres), a);
}
`,Be=new C;class k1{constructor(t){F(this,"object",new gt);F(this,"rain");F(this,"snow");F(this,"ripples");F(this,"glass");F(this,"puddle");F(this,"rainU");F(this,"snowU");F(this,"rippleU");F(this,"glassU");F(this,"puddleU");F(this,"disposables",[]);F(this,"off",new C);F(this,"snowOff",new C);F(this,"vel",new C(0,-9,0));F(this,"vol");F(this,"boxMin",new C);F(this,"t",0);F(this,"groundY");F(this,"opts");F(this,"heightField");var r,l;this.opts=t,this.groundY=t.groundY??0,t.groundHeight&&(this.heightField=new Xl(t.groundHeight,(t.radius??12)*2+16),this.disposables.push(this.heightField));const e=t.radius??12;this.vol=new C(e*2,14,e*2),this.object.name="weather-fx";const s=$l(t.quality),n=()=>{var c,h;return{uBoxMin:{value:this.boxMin},uVol:{value:this.vol},uOff:{value:this.off},uVel:{value:this.vel},uIntensity:{value:0},uGroundTex:{value:((c=this.heightField)==null?void 0:c.texture)??null},uGroundBox:{value:((h=this.heightField)==null?void 0:h.box)??new ke},uUseGroundMap:{value:this.heightField?1:0},uGroundY:{value:this.groundY},uMode:{value:1},uLen:{value:.55},uWidth:{value:.012},uPx:{value:.0015},uT:{value:0},uColor:{value:new W(.62,.74,.86)},uOpacity:{value:.5}}};this.rainU=n(),this.snowU=n(),this.snowU.uMode.value=0,this.snowU.uOff.value=this.snowOff,this.snowU.uWidth.value=.028,this.snowU.uColor.value=new W(.9,.95,1),this.snowU.uOpacity.value=.85,this.rippleU={uCamXZ:{value:new C},uRadius:{value:9},uGroundTex:{value:((r=this.heightField)==null?void 0:r.texture)??null},uGroundBox:{value:((l=this.heightField)==null?void 0:l.box)??new ke},uUseGroundMap:{value:this.heightField?1:0},uGroundY:{value:this.groundY},uIntensity:{value:0},uT:{value:0},uColor:{value:new W(.7,.8,.9)},uOpacity:{value:.5}},this.glassU={uT:{value:0},uWet:{value:0},uSnow:{value:0},uSize:{value:new ut(1,1)},uTint:{value:new W(.6,.66,.72)},uOpacity:{value:1}},this.puddleU={uWet:{value:0},uSky:{value:new W(.55,.65,.78)}};const a=(c,h,f,p={})=>{const m=new wt({vertexShader:c,fragmentShader:h,uniforms:f,transparent:!0,depthWrite:!1,fog:!1,side:mt,...p});return this.disposables.push(m),m},i=(c,h,f,p)=>{this.disposables.push(c);const m=new Y(c,h);return m.frustumCulled=!1,m.renderOrder=f,m.name=p,m.raycast=()=>{},m.visible=!1,this.object.add(m),m};if(t.mode==="outdoor"){if(this.rain=i(_s(s.drops,101),a(oa,ql,this.rainU),12,"weather-rain"),this.snow=i(_s(s.flakes,202),a(oa,Ql,this.snowU),12,"weather-snow"),this.ripples=i(_s(s.splashes,303),a(Jl,tc,this.rippleU),11,"weather-ripples"),t.flatGround){const c=new At(60,60);c.rotateX(-Math.PI/2),this.puddle=i(c,a(sc,nc,this.puddleU,{polygonOffset:!0,polygonOffsetFactor:-2,polygonOffsetUnits:-2}),10,"weather-puddle")}}else if(t.mode==="window"&&t.window){const c=t.window,h=new At(c.width,c.height);this.glassU.uSize.value.set(c.width,c.height),this.glass=i(h,a(ec,oc,this.glassU),13,"weather-glass"),this.glass.position.set(c.x,c.y,c.z)}}setGround(t){this.groundY=t}get mode(){return this.opts.mode}update(t,e,s,n,a,i,r){var g;this.t+=t;const l=e.params,c=this.opts.mode;if(c==="window"){if(!this.glass)return;const x=Math.min(1,l.rain*1.1+l.mist*.55),y=x>.01||l.snow>.01;this.glass.visible=y,y&&(this.glassU.uT.value=this.t,this.glassU.uWet.value=x,this.glassU.uSnow.value=l.snow,this.glassU.uTint.value.setRGB(.5+.2*n,.56+.2*n,.64+.2*n));return}if(c!=="outdoor")return;const h=.82*r*4.5,f=.57*r*4.5;this.vel.set(h,-9,f),this.off.x+=h*t,this.off.y+=-9*t,this.off.z+=f*t,this.snowOff.x+=h*.5*t,this.snowOff.y+=-1.3*t,this.snowOff.z+=f*.5*t,this.off.x%=this.vol.x*64,this.off.y%=this.vol.y*64,this.off.z%=this.vol.z*64,this.snowOff.x%=this.vol.x*64,this.snowOff.y%=this.vol.y*64,this.snowOff.z%=this.vol.z*64,s.getWorldDirection(Be),Be.y=0,Be.lengthSq()>1e-4&&Be.normalize();const p=s.position.x+Be.x*this.vol.x*.18,m=s.position.z+Be.z*this.vol.z*.18,u=s.position.y;this.boxMin.set(p-this.vol.x*.5,u-this.vol.y*.55,m-this.vol.z*.5);const v=2*Math.tan($.degToRad(i)/2)/Math.max(1,a),w=.25+.75*n;(l.rain>.005||l.snow>.005)&&((g=this.heightField)==null||g.update(s.position.x,s.position.z));const M=l.rain>.005;if(this.rain){this.rain.visible=M;const x=this.rainU;x.uT.value=this.t,x.uIntensity.value=l.rain,x.uGroundY.value=this.groundY,x.uPx.value=v,x.uOpacity.value=.42*w,x.uLen.value=.5+.2*l.rain}const d=l.snow>.005;if(this.snow){this.snow.visible=d;const x=this.snowU;x.uT.value=this.t,x.uIntensity.value=l.snow,x.uGroundY.value=this.groundY,x.uPx.value=v,x.uOpacity.value=.85*(.4+.6*w)}if(this.ripples){this.ripples.visible=M;const x=this.rippleU;x.uIntensity.value=l.rain,x.uT.value=this.t,x.uGroundY.value=this.groundY,x.uCamXZ.value.set(s.position.x,0,s.position.z),x.uOpacity.value=.5*w}if(this.puddle){const x=e.wet;this.puddle.visible=x>.2,this.puddle.visible&&(this.puddle.position.set(Math.round(s.position.x/4)*4,this.groundY+.012,Math.round(s.position.z/4)*4),this.puddleU.uWet.value=x,this.puddleU.uSky.value.setRGB(.4+.35*n,.48+.35*n,.6+.3*n))}}dispose(){for(const t of this.disposables)t.dispose();this.disposables.length=0,this.object.removeFromParent()}}class T1{constructor(){F(this,"roots",new Set);F(this,"applied",-1)}add(t){t&&!this.roots.has(t)&&(this.roots.add(t),this.applied=-1)}clear(){this.roots.clear(),this.applied=-1}invalidate(){this.applied=-1}apply(t){if(Math.abs(t-this.applied)<.01&&this.applied>=0)return;this.applied=t;const e=1-.34*t;for(const s of this.roots)s.traverse(n=>{const a=n;if(!a.isMesh||a.isSkinnedMesh)return;for(let r=a;r;r=r.parent)if(r.name==="scene-person"||r.name==="explorer-avatar"||r.userData.noSurface)return;const i=Array.isArray(a.material)?a.material:[a.material];for(const r of i){const l=r;if(!l.isMeshStandardMaterial||!l.color)continue;let c=l.userData.wetBase;c||(c={r:l.color.r,g:l.color.g,b:l.color.b,rough:l.roughness},l.userData.wetBase=c),l.color.setRGB(c.r*e,c.g*e,c.b*(1-.3*t)),l.roughness=Math.max(.1,c.rough*(1-.5*t))}})}}const ac={low:{pathSegments:10,radialSegments:4,lineRadius:.0014,buttonSegments:6},high:{pathSegments:22,radialSegments:5,lineRadius:.0011,buttonSegments:8}};function sa(o,t,e){const s=Math.abs(o);let n=st(s,t,e,0,1.33,0,.143,.17,.096);n=L(n,st(s,t,e,.055,1.31,.028,.073,.061,.071),.055),n=L(n,st(s,t,e,0,1.14,0,.126,.17,.09),.075),n=L(n,st(s,t,e,0,.97,-.004,.145,.13,.104),.075),n=L(n,rt(s,t,e,.018,1.492,-.01,.147,1.417,-.002,.043,.047),.085),n=L(n,st(s,t,e,.151,1.405,0,.048,.064,.061),.058),n=L(n,rt(s,t,e,0,1.46,-.02,0,1.535,-.02,.061,.046),.065),n=L(n,Qe(s,t,e,0,1.525,0,.074,.026),.02),n=L(n,Jt(s,t,e,.085,1.27,.094,.04,.03,.014,.006),.006),n=Ot(n,.88-t,.03),n=Ot(n,-rt(s,t,e,0,1.43,-.006,0,1.62,-.006,.058,.058),.014);const a=Math.atan2(e,o);return n+=(Math.sin(a*7+t*13)*.5+Math.sin(a*12-t*8+1.7)*.3)*(t<1.15?.0055:.0028),n}function tn(o,t){let e=0,s=.32;if(sa(o,t,e)>0)return .066;for(let n=0;n<18;n++){const a=(e+s)/2;sa(o,t,a)<=0?e=a:s=a}return(e+s)/2+.004}function Vo(o,t){const e=$.clamp(Math.abs(t)/(o==="upperArm"?.28:.255),0,1);return o==="upperArm"?[$.lerp(.058,.046,e),$.lerp(.06,.046,e)]:[$.lerp(.039,.05,1-e),$.lerp(.038,.046,1-e)]}function ic(o,t,e){const[s,n]=Vo(o,e),a=Math.max(.12,1-(t/s)**2);return n*Math.sqrt(a)+.0035}function Ho(o,t,e,s){const n=`${t}:${e}:${s}`;let a=o.get(n);return a||(a={anchor:t,side:e,material:s,parts:[]},o.set(n,a)),a}function ae(o,t,e,s=e.lineRadius,n=!1){if(t.length<3)return;const a=new ss(t,n,"centripetal");o.parts.push(new ns(a,e.pathSegments,s,e.radialSegments,n))}function $e(o){return o.map(([t,e])=>new C(t,e,tn(t,e)))}function rc(o,t){const e=[],s=t.pathSegments;for(let n=0;n<=s;n++){const a=$.lerp(-Math.PI/2,Math.PI/2,n/s),i=.057*Math.sin(a),r=1.495-.043*Math.cos(a);e.push(new C(i,r,Math.max(tn(i,r),.086)))}ae(o,e,t,t.lineRadius*1.25)}function Bo(o,t,e,s,n,a,i=!1,r){const l=t-s/2,c=t+s/2,h=e-n/2,f=e+n/2,p=[[l+.006,h],[c-.006,h],[c,h+.006],[c,f-.006],[c-.006,f],[l+.006,f],[l,f-.006],[l,h+.006]],m=v=>v.map(w=>w.setZ(r??w.z)),u=m($e(p));ae(o,u,a,a.lineRadius*1.1,!0),i&&ae(o,m($e([[l+.006,f-.012],[t,f-.012],[c-.006,f-.012]])),a,a.lineRadius*1.15)}function lc(o,t,e){const s=Ho(e,"torso",0,"cloth");if(rc(s,t),o==="tee"){for(const r of[-1,1])ae(s,$e([[r*.056,1.48],[r*.082,1.455],[r*.111,1.425],[r*.127,1.395]]),t,t.lineRadius);Bo(s,-.077,1.265,.045,.061,t,!0,.111);return}if(o==="hoodie"){const r=Ho(e,"torso",0,"trim");for(const l of[-1,1])ae(r,$e([[l*.012,1.465],[l*.016,1.405],[l*.021,1.335]]),t,t.lineRadius*1.4);Bo(s,0,1,.178,.066,t,!1,.141);return}const n=Ho(e,"torso",0,"trim");ae(s,$e([[0,1.49],[0,1.38],[0,1.25],[0,1.11],[0,.99]]),t,t.lineRadius*1.8);for(const r of[-1,1])ae(s,$e([[r*.026,1.49],[r*.05,1.43],[r*.081,1.35],[r*.102,1.26]]),t,t.lineRadius*1.3),Bo(s,r*.09,1.045,.052,.06,t,!0);Bo(s,.078,1.267,.047,.052,t,!0,.111);const i=t.pathSegments>10?4:3;for(let r=0;r<i;r++){const l=$.lerp(1.405,1.055,r/(i-1)),c=new Ct(.0034,.0034,.0016,t.buttonSegments,1);c.rotateX(Math.PI/2),c.translate(0,l,tn(0,l)),n.parts.push(c)}}function cc(o,t,e,s){const n=[];for(let a=0;a<s;a++){const i=a/s*Math.PI*2;n.push(new C(Math.cos(i)*o,e,Math.sin(i)*t))}return n}function na(o,t,e,s,n){const a=Ho(s,o,n,"cloth"),i=o==="upperArm"?-.265:-.226,[r,l]=Vo(o,i);ae(a,cc(r*1.04,l*1.04,i,e.pathSegments),e,e.lineRadius*1.35,!0);const c=o==="forearm"&&e.pathSegments>10?3:1;for(let h=0;h<c;h++){const f=o==="forearm"?-.025-h*.036:-.12,[p]=Vo(o,f),m=p*.72,u=[],v=e.pathSegments;for(let w=0;w<=v;w++){const M=w/v*2-1,d=M*m,g=f+.006*M+Math.sin((M+1)*Math.PI)*(h%2?-.0025:.0025);u.push(new C(d,g,ic(o,d,g)+.001))}ae(a,u,e,e.lineRadius*(o==="forearm"?1.2:1))}if(o==="upperArm"&&t!=="tee"&&e.pathSegments>10){const h=[];for(let f=0;f<=e.pathSegments;f++){const p=$.lerp(-.025,-.23,f/e.pathSegments),[m,u]=Vo(o,p);h.push(new C(n*m*1.01,p,u*.18+.002))}ae(a,h,e,e.lineRadius*.9)}}function hc(o){const t=ac[o.detail],e=new Map;lc(o.style,t,e);for(const n of[-1,1])na("upperArm",o.style,t,e,n),na("forearm",o.style,t,e,n);const s={torso:0,upperArm:1,forearm:2};return[...e.values()].sort((n,a)=>s[n.anchor]-s[a.anchor]||n.side-a.side||n.material.localeCompare(a.material)).map(n=>{const a=Yt(n.parts,!1);if(!a)throw new Error(`Could not merge garment details for ${n.anchor}:${n.side}:${n.material}`);return n.parts.forEach(i=>i.dispose()),a.computeBoundingBox(),a.computeBoundingSphere(),a.userData.garmentDetail={anchor:n.anchor,side:n.side,material:n.material},{anchor:n.anchor,side:n.side,material:n.material,geometry:a}})}let Ps;const _e=.4;function uc(){if(!Ps){const o=Qa(_e),t=Ja(_e),e=Za(_e);Ps={head:Ka(.58),hair:{short:Ls(.5,"short"),long:Ls(.5,"long")},jacket:qa(_e),upper:o,upperR:wo(o),lower:t,lowerR:wo(t),hand:e,handR:wo(e),thigh:ti(_e),shin:ei(_e),boot:oi(_e)}}return Ps}const ii=(()=>{let o;return()=>(o??(o={eyeWhite:new at({color:15854822,roughness:.25}),iris:new at({color:4861984,roughness:.3}),lip:new at({color:10113096,roughness:.5}),shoe:new at({color:4863526,roughness:.65}),phone:new at({color:2107181,roughness:.35,metalness:.3}),screen:new at({color:8049872,emissive:2071200,emissiveIntensity:.55,roughness:.3})}),o)})();function Z(o,t){const e=new Y(o,t);return e.castShadow=!0,e.receiveShadow=!0,e.userData.isLandscapeStage=!0,e}function Pe(o,t,e,s,n){return Z(new Se(o,t,e,1,Math.min(s,o/2.01,t/2.01,e/2.01)),n)}function Wt(o){return o?new Yi:new gt}const ri={stand:{left:{shoulder:.04,elbow:-.15},right:{shoulder:-.04,elbow:-.15}},phone:{left:{shoulder:-.7,elbow:-1.35,side:-.06},right:{shoulder:-.7,elbow:-1.35,side:.06}},listen:{left:{shoulder:-.55,elbow:-.95},right:{shoulder:-.5,elbow:-.95}},talk:{left:{shoulder:-.5,elbow:-.95},right:{shoulder:-1.15,elbow:-.75,side:.1}},write:{left:{shoulder:-.55,elbow:-.9},right:{shoulder:-.85,elbow:-1.2,side:.05}},read:{left:{shoulder:-.38,elbow:-1,side:-.12},right:{shoulder:-.38,elbow:-1,side:.12}},walk:{left:{shoulder:.45,elbow:-.25},right:{shoulder:-.45,elbow:-.5}},point:{left:{shoulder:.04,elbow:-.15},right:{shoulder:-1.45,elbow:-.1,side:.12}},lap:{left:{shoulder:-.42,elbow:-.55,side:-.08},right:{shoulder:-.42,elbow:-.55,side:-.08}},reach1:{left:{shoulder:-.42,elbow:-.55,side:-.08},right:{shoulder:-.55,elbow:-.62,side:-.08}},reach2:{left:{shoulder:-.42,elbow:-.55,side:-.08},right:{shoulder:-.78,elbow:-.72,side:-.1}},reach3:{left:{shoulder:-.42,elbow:-.55,side:-.08},right:{shoulder:-.98,elbow:-.8,side:-.12}},reach4:{left:{shoulder:-.42,elbow:-.55,side:-.08},right:{shoulder:-1.12,elbow:-.86,side:-.12}}};function A1(o){const t=ii(),e=uc(),s=o.animated===!0,n=new gt;n.name="scene-person";const a=o.seated??!1,i=o.pose??(a?"listen":"stand"),r=new Set,l=(E,O,j={})=>{const K=new at({color:E,roughness:O,metalness:.02,...j});return r.add(K),K},c=new W(o.skin??14858392),h=new W(o.shirt),f={h:0,s:0,l:0},p={h:0,s:0,l:0};h.getHSL(f),c.getHSL(p),Math.min(Math.abs(f.h-p.h),1-Math.abs(f.h-p.h))<.055&&f.s>.18&&Math.abs(f.l-p.l)<.24&&h.set(5205894).offsetHSL(0,0,(f.l-.5)*.2);const u=l(h.getHex(),.86,{side:mt}),v=l(o.trousers??3753562,.88),w=l(o.skin??14858392,.55,{emissive:3806728,emissiveIntensity:.05});w.name="person-skin";const M=new at({color:w.color.getHex(),roughness:.55,metalness:.02,vertexColors:!0,emissive:3806728,emissiveIntensity:.05});M.name="person-face";const d=new at({color:16777215,vertexColors:!0,roughness:.42,metalness:.08,side:mt});d.name="person-hair",r.add(M),r.add(d);const g=o.hair??2825494,x=l(new W(g).multiplyScalar(.8).getHex(),.7);x.name="person-face-detail";const y=a?.1:.91,S=Wt(s);S.position.y=y,S.rotation.x=o.lean??0,n.add(S);const k=Wt(s);k.position.y=-.91,S.add(k),k.add(Z(e.jacket,u));const b=Wt(s);b.position.y=1.5,b.rotation.x=i==="phone"||i==="read"?.38:i==="write"?.3:o.lean?-o.lean*.6:0,k.add(b),b.add(Z(e.head,M));const T=[],A=[],_=[];for(const E of[-1,1]){const O=Wt(s);O.position.set(E*.034,.2,.0685);const j=Z(new xt(.0125,16,12),t.eyeWhite);O.add(j);const K=Wt(s);K.position.z=.0118;const Mt=Z(new xt(.0072,12,10),t.iris);Mt.scale.set(1,1,.35),K.add(Mt);const Pt=Z(new xt(.0021,8,6),t.eyeWhite);Pt.position.set(-.0022,.0027,.0023),K.add(Pt),O.add(K);const bt=Z(new Dt(.0118,.0017,5,16,Math.PI),w);bt.position.set(0,.001,.006),bt.scale.y=.72,O.add(bt),T.push(O),A.push(K),b.add(O);const Q=Wt(s);Q.position.set(E*.037,.2165,.0885),Q.rotation.z=-E*.1;const _t=new ss([new C(-E*.015,-.001,0),new C(-E*.004,.003,.001),new C(E*.009,.002,0)]);Q.add(Z(new ns(_t,8,.0027,5,!1),x)),b.add(Q),_.push(Q)}const P=Wt(s);P.position.set(0,.132,.0875);const D=l(5515817,.78);D.name="person-face-detail";const R=Z(new xt(.0058,12,8),D);R.scale.set(1.7,.55,.4),P.add(R);const z=Z(new Cs(.0023,.025,3,8),t.lip);z.rotation.z=Math.PI/2,z.scale.set(1,1,.55),z.position.y=.001,P.add(z);const N=Z(new Cs(.0016,.019,3,8),w);N.rotation.z=Math.PI/2,N.position.set(0,-.0042,.001),P.add(N),b.add(P);const I=o.hairStyle??"short",B=(I==="long"?e.hair.long:e.hair.short).clone(),U=new W(g),V=(U.r+U.g+U.b)/3,G=B.attributes.color;for(let E=0;E<G.count;E++){const O=(G.getX(E)+G.getY(E)+G.getZ(E))/3/.05;G.setXYZ(E,U.r*O*(.35/Math.max(.05,V))*.6,U.g*O*(.35/Math.max(.05,V))*.6,U.b*O*(.35/Math.max(.05,V))*.6)}if(b.add(Z(B,d)),I==="bun"){const E=Z(new xt(.05,14,10),l(g,.7));E.scale.set(1,.9,1),E.position.set(0,.3,-.07),b.add(E)}if(o.helmet){const E=Z(new xt(.145,24,16),l(15659764,.3,{metalness:.2}));E.scale.set(1,1.12,1.08),E.position.y=.2,b.add(E);const O=Z(new xt(.12,20,12),l(1782855,.12,{metalness:.7}));O.scale.set(.95,.68,.55),O.position.set(0,.2,.108),b.add(O);const j=Z(new Dt(.1,.018,8,20),l(13226196,.4,{metalness:.5}));j.rotation.x=Math.PI/2,j.position.y=.07,b.add(j)}if(o.glasses){const E=l(1710618,.4,{metalness:.4});for(const j of[-1,1]){const K=Z(new Dt(.0245,.0032,6,18),E);K.position.set(j*.034,.2,.092),b.add(K)}const O=Z(new Ct(.0028,.0028,.02,5),E);O.rotation.z=Math.PI/2,O.position.set(0,.204,.093),b.add(O)}const X=l(15657696,.9,{side:mt}),H=Z(new Dt(.07,.012,8,24),X);if(H.rotation.x=Math.PI/2,H.position.y=1.535,H.scale.set(1.05,1,1),k.add(H),o.scarf!==void 0){const E=Z(new Dt(.074,.032,8,20),l(o.scarf,.92));E.rotation.x=Math.PI/2,E.position.y=1.54,k.add(E)}if(o.backpack!==void 0){const E=Pe(.29,.4,.15,.06,l(o.backpack,.85));E.position.set(0,1.27+.2-.2,-.155),k.add(E)}const tt=(Math.imul(o.shirt^(o.hair??0)*31,2654435761)>>>16)+(o.hairStyle==="long"?3:0),dt=o.outfit??(o.helmet||o.scarf!==void 0?"tee":["tee","hoodie","coat","dress","tee","hoodie"][tt%6]),pt=(o.hairStyle??"short")==="long",q=dt==="dress"&&!pt&&o.hairStyle!=="bun"?"coat":dt;if(q==="hoodie"&&!o.helmet){const E=Z(new Dt(.083,.03,10,24),u);E.rotation.x=Math.PI/2-.35,E.position.set(0,1.545,-.03),E.scale.set(1.05,1,1.15),k.add(E);const O=Pe(.2,.09,.02,.01,u);O.position.set(0,1,.128),k.add(O)}if(!a&&(q==="coat"||q==="dress")){const E=q==="coat"?.62:.46,O=Z(new Ct(.19,q==="coat"?.235:.27,E,28,1,!0),u);if(O.scale.set(1.12,1,.9),O.position.y=1-E/2+.02,O.receiveShadow=!1,k.add(O),q==="coat"){const j=Pe(.016,.5,.02,.006,X);j.position.set(0,1.25,.121),k.add(j)}}const ot=o.hat??(tt%7===3&&!a?8010555:tt%7===5&&!a?3099231:void 0);if(ot!==void 0&&!o.helmet){const E=l(ot,.9),O=Z(new xt(.098,20,12,0,Math.PI*2,0,Math.PI*.52),E);O.scale.set(.9,1.06,1.06),O.position.set(0,.215,-.014),b.add(O);const j=Z(new Dt(.09,.012,8,20),E);j.rotation.x=Math.PI/2,j.scale.set(.92,1.08,1),j.position.set(0,.2,-.014),b.add(j)}const lt=ri[i],nt={},kt={};for(const E of[-1,1]){const O=E===1?lt.left:lt.right,j=Wt(s);j.position.set(E*.19,1.42,0),j.rotation.x=O.shoulder,j.rotation.z=(O.side??0)*E,k.add(j),j.add(Z(E===1?e.upper:e.upperR,u));const K=Wt(s);K.position.y=-.28,K.rotation.x=O.elbow,j.add(K),K.add(Z(E===1?e.lower:e.lowerR,u));const Mt=Z(new xt(.043,12,9),u);Mt.scale.set(.95,.86,.95),K.add(Mt);const Pt=Z(new Dt(.041,.008,6,16),X);Pt.rotation.x=Math.PI/2,Pt.position.y=-.252,K.add(Pt);const bt=Wt(s);if(bt.position.y=-.27,K.add(bt),bt.add(Z(E===1?e.hand:e.handR,w)),s&&E===1){const Q=new gt;Q.name="actor-book-prop";const _t=Pe(.2,.03,.27,.008,l(3104138,.8));_t.position.set(-.12,-.12,.06),_t.rotation.set(1.2,0,.1),Q.add(_t),Q.userData.personDynamicAccessory=!0,Q.visible=i==="read",bt.add(Q),kt.book=Q;const ee=new gt;ee.name="actor-phone-prop";const ve=Pe(.075,.016,.15,.006,t.phone);ve.position.set(-.05,-.1,.02),ve.rotation.set(-.4,0,.1),ee.add(ve);const Ae=Z(new At(.062,.128),t.screen);Ae.rotation.x=-Math.PI/2,Ae.position.set(0,.0085,0),ve.add(Ae),ee.userData.personDynamicAccessory=!0,ee.visible=i==="phone",bt.add(ee),kt.phone=ee}else if(i==="read"&&E===1){const Q=Pe(.2,.03,.27,.008,l(3104138,.8));Q.position.set(-.12,-.12,.06),Q.rotation.set(1.2,0,.1),bt.add(Q)}if(s&&E===-1){const Q=new gt;Q.name="actor-pen-prop";const _t=Z(new Ct(.008,.008,.15,6),l(1911629,.4));_t.position.set(0,-.12,.03),_t.rotation.x=-.9,Q.add(_t),Q.userData.personDynamicAccessory=!0,Q.visible=i==="write",bt.add(Q),kt.pen=Q}else if(i==="write"&&E===-1){const Q=Z(new Ct(.008,.008,.15,6),l(1911629,.4));Q.position.set(0,-.12,.03),Q.rotation.x=-.9,bt.add(Q)}if(!s&&i==="phone"&&E===1){const Q=Pe(.075,.016,.15,.006,t.phone);Q.position.set(-.05,-.1,.02),Q.rotation.set(-.4,0,.1),bt.add(Q);const _t=Z(new At(.062,.128),t.screen);_t.rotation.x=-Math.PI/2,_t.position.set(0,.0085,0),Q.add(_t)}E===1?nt.left={shoulder:j,elbow:K,hand:bt}:nt.right={shoulder:j,elbow:K,hand:bt}}const Tt={};for(const E of[-1,1]){const O=Wt(s);O.position.set(E*.09,.91,0),O.rotation.x=a?-Math.PI/2+.03:i==="walk"?.42*-E:0,k.add(O),O.add(Z(e.thigh,v));const j=Wt(s);j.position.y=-.42,j.rotation.x=a?Math.PI/2-.03:i==="walk"&&E===1?.55:.03,O.add(j);const K=Z(new xt(.068,14,10),v);K.scale.set(1,.86,.9),j.add(K),j.add(Z(e.shin,v));const Mt=Wt(s);Mt.position.y=-.26,j.add(Mt);const Pt=e.boot.clone();Pt.translate(0,.26,0),Mt.add(Z(Pt,t.shoe)),E===1?Tt.left={hip:O,knee:j,ankle:Mt}:Tt.right={hip:O,knee:j,ankle:Mt}}if(s){const E=q==="hoodie"?"hoodie":q==="coat"||q==="dress"?"coat":"tee";for(const O of hc({style:E,detail:o.garmentDetail??"low"})){const j=O.anchor==="torso"?k:O.anchor==="upperArm"?O.side===1?nt.left.shoulder:nt.right.shoulder:O.side===1?nt.left.elbow:nt.right.elbow,K=Z(O.geometry,O.material==="cloth"?u:X);K.name=`garment-${O.anchor}-${O.side}-${O.material}`,K.userData.garmentGeometry=!0,j.add(K)}}if(n.scale.setScalar(o.scale??1),s){const E={body:S,head:b,arms:nt,legs:Tt,eyes:T,gazes:A,brows:_,mouth:P,props:kt,setExpression:()=>{},setPose:()=>{},update:()=>{}};fc(E,i,a,o.lean??0);const O=new Set([e.head,e.hair.short,e.hair.long,e.jacket,e.upper,e.upperR,e.lower,e.lowerR,e.hand,e.handR,e.thigh,e.shin,e.boot]);dc(n,O,r),n.userData.personRig=E,n.userData.ownedMaterials=r;const j=ba(n,{body:E.body,bodyRestY:.91,head:E.head,props:[...[E.props.book,E.props.phone].filter(K=>!!K).map(K=>({object:K,hand:"LeftHand"})),...E.props.pen?[{object:E.props.pen,hand:"RightHand"}]:[]],grip:()=>{var K,Mt,Pt;return(K=E.props.book)!=null&&K.visible||(Mt=E.props.phone)!=null&&Mt.visible||(Pt=E.props.pen)!=null&&Pt.visible?.6:0},leftArm:E.arms.left.shoulder,rightArm:E.arms.right.shoulder,leftElbow:E.arms.left.elbow,rightElbow:E.arms.right.elbow,leftHip:E.legs.left.hip,rightHip:E.legs.right.hip,leftKnee:E.legs.left.knee,rightKnee:E.legs.right.knee,leftAnkle:E.legs.left.ankle,rightAnkle:E.legs.right.ankle,blinkLeft:()=>1-E.eyes[1].scale.y,blinkRight:()=>1-E.eyes[0].scale.y,mouthOpen:()=>Math.max(0,E.mouth.scale.y-.08)*.65,smile:()=>Math.max(0,E.mouth.scale.x-1)*10,browLift:()=>Math.max(0,E.brows[0].position.y-.2165)*100,gazeX:()=>E.gazes[0].position.x*80,gazeY:()=>E.gazes[0].position.y*80},o.hairStyle==="long"||o.hairStyle==="bun"?"female":"male",{model:o.model,shirt:o.shirt,trousers:o.trousers,hair:o.hair,skin:o.skin,outfit:o.humanOutfit,aged:o.aged,glasses:o.glasses,seed:o.seed,look:o.humanLook});if(j){const K=E.update;E.update=(...Mt)=>{K(...Mt),j()}}}else ul(n);return n}function aa(o,t,e,s){const n=ri[t],a=n.left,i=n.right,r=[{node:o.body,path:"position",axis:"y",value:e?.1:.91},{node:o.body,path:"rotation",axis:"x",value:s+(t==="talk"?-.025:0)},{node:o.body,path:"rotation",axis:"z",value:t==="talk"?.012:0},{node:o.head,path:"rotation",axis:"x",value:t==="phone"||t==="read"?.34:t==="write"?.25:t==="lap"||t.startsWith("reach")?-.035:-s*.5},{node:o.head,path:"rotation",axis:"y",value:t==="point"?.08:0},{node:o.arms.left.shoulder,path:"rotation",axis:"x",value:a.shoulder},{node:o.arms.left.shoulder,path:"rotation",axis:"z",value:a.side??0},{node:o.arms.left.elbow,path:"rotation",axis:"x",value:a.elbow},{node:o.arms.left.hand,path:"rotation",axis:"x",value:t==="phone"||t==="read"?-.14:-.04},{node:o.arms.right.shoulder,path:"rotation",axis:"x",value:i.shoulder},{node:o.arms.right.shoulder,path:"rotation",axis:"z",value:-(i.side??0)},{node:o.arms.right.elbow,path:"rotation",axis:"x",value:i.elbow},{node:o.arms.right.hand,path:"rotation",axis:"x",value:t==="phone"||t==="read"?-.14:-.04}];for(const l of[o.legs.left,o.legs.right])r.push({node:l.hip,path:"rotation",axis:"x",value:e?-Math.PI/2+.03:0},{node:l.knee,path:"rotation",axis:"x",value:e?Math.PI/2-.03:.03},{node:l.ankle,path:"rotation",axis:"x",value:0});return r}function Ds(o){return o.node[o.path][o.axis]}function ia(o,t){o.node[o.path][o.axis]=t}function ra(o){return o==="talk"?"talk":o==="listen"?"listen":o==="read"||o==="write"||o==="phone"?"think":o==="stand"?"softSmile":"neutral"}function la(o){switch(o){case"listen":return[.0022,.018,.16,.15,0];case"think":return[8e-4,-.012,.1,0,7e-4];case"softSmile":return[0,0,.1,.38,0];case"talk":return[.0012,.006,.48,.08,0];default:return[0,0,.08,.02,0]}}function fc(o,t,e,s){let n=aa(o,t,e,s),a=n.map(f=>({...f,value:Ds(f)})),i=null,r=ra(t),l=la(r),c=null,h=0;o.setExpression=(f,p=.24)=>{if(f===r)return;const m=la(f);c=p>0?{from:l.slice(),to:m,elapsed:0,duration:p}:null,r=f,p<=0&&(l=m)},o.setPose=(f,p,m=.42)=>{n=aa(o,f,p,s);const u=n.map(w=>w.value),v=n.map((w,M)=>{const d=a[M];return Ds(d||w)});i=m>0?{from:v,to:u,elapsed:0,duration:m}:null,a=n.map((w,M)=>({...w,value:m>0?v[M]:u[M]})),m<=0&&a.forEach((w,M)=>ia(w,u[M])),o.setExpression(ra(f),Math.min(.32,m)),o.props.book&&(o.props.book.visible=f==="read"),o.props.phone&&(o.props.phone.visible=f==="phone"),o.props.pen&&(o.props.pen.visible=f==="write")},o.update=(f,p,m,u,v)=>{if(i){i.elapsed+=f;const S=Math.min(1,i.elapsed/i.duration),k=S*S*(3-2*S);a=n.map((b,T)=>({...b,value:$.lerp(i.from[T],i.to[T],k)})),S>=1&&(i=null)}for(const S of a)ia(S,S.value);if(c){c.elapsed+=f;const S=Math.min(1,c.elapsed/c.duration),k=S*S*(3-2*S);l=c.from.map((b,T)=>$.lerp(b,c.to[T],k)),S>=1&&(c=null)}const w=Math.sin(p*1.65+v)*.003;if(o.body.position.y+=m?Math.abs(Math.sin(u*2))*.007:w*.7,o.body.scale.y=1+w*.35,o.body.rotation.x+=m?.025:w*1.4,o.body.rotation.y=Math.sin(p*.47+v)*(m?.012:.008),o.body.rotation.z+=m?Math.sin(u)*.016:Math.sin(p*.72+v)*.009,o.head.rotation.y+=Math.sin(p*.38+v*1.7)*.027,o.head.rotation.z=Math.sin(p*.63+v)*.014,m){const S=Math.sin(u),k=Math.sin(u+Math.PI);o.legs.left.hip.rotation.x+=S*.36,o.legs.right.hip.rotation.x+=k*.36,o.legs.left.knee.rotation.x+=Math.max(0,Math.cos(u))*.62,o.legs.right.knee.rotation.x+=Math.max(0,Math.cos(u+Math.PI))*.62,o.legs.left.ankle.rotation.x=-o.legs.left.hip.rotation.x*.45-o.legs.left.knee.rotation.x*.7,o.legs.right.ankle.rotation.x=-o.legs.right.hip.rotation.x*.45-o.legs.right.knee.rotation.x*.7,o.arms.left.shoulder.rotation.x-=S*.19,o.arms.right.shoulder.rotation.x-=k*.19,o.arms.left.elbow.rotation.x+=.08+Math.max(0,S)*.12,o.arms.right.elbow.rotation.x+=.08+Math.max(0,k)*.12}else o.arms.left.shoulder.rotation.z+=Math.sin(p*.8+v)*.012,o.arms.right.shoulder.rotation.z-=Math.sin(p*.8+v)*.012;const M=$.euclideanModulo(p+v*1.31,4.2);o.eyes.forEach((S,k)=>{const b=$.euclideanModulo(M+k*.09,4.2),T=b<.13?Math.sin(b/.13*Math.PI):0;S.scale.y=1-T*.9;const A=o.gazes[k];if(A){const _=r==="listen"?Math.sin(p*.19+v*.8)*.0015:Math.sin(p*.31+v+k*.2)*.0022;A.position.x=_,A.position.y=Math.sin(p*.24+v*.7)*.0011-l[4]}});const[d,g,x,y]=l;o.brows.forEach((S,k)=>{const b=k===0?-1:1;S.position.y=.2165+d+Math.sin(p*.53+v+k*1.8)*(r==="listen"?4e-4:15e-5),S.rotation.z=-b*.1+b*g}),h+=r==="talk"?f*(5.5+Math.sin(p*1.9)*1.1):-h*Math.min(1,f*8),o.mouth.scale.x=1+y*.12-x*.08,o.mouth.scale.y=.08+x*(r==="talk"?.75+Math.sin(h)*.45:.32),o.mouth.rotation.z=y*.075+Math.sin(p*.55+v)*.004,o.mouth.position.y=.132+y*6e-4},o.setPose(t,e,0)}function dc(o,t,e){o.updateMatrixWorld(!0);const s=o.matrixWorld.clone().invert(),n=[],a=[];o.traverse(d=>{if(d.isBone&&a.push(d),d.isMesh){let g=d;for(;g&&g!==o&&!g.userData.personDynamicAccessory;)g=g.parent;g!=null&&g.userData.personDynamicAccessory||n.push(d)}});const i=new Map(a.map((d,g)=>[d,g])),r=new Map,l=new Set,c=ii(),h=d=>d===c.eyeWhite?"eyeWhite":d===c.iris?"iris":d===c.lip?"faceDetail":d===c.phone?"phone":d===c.screen?"screen":d.name==="person-hair"?"hair":d.name==="person-face-detail"?"faceDetail":d.name==="person-skin"||d.name==="person-face"?"skin":"cloth",f=d=>{if(d==="phone")return c.phone;if(d==="screen")return c.screen;const g={color:16777215,vertexColors:!0,metalness:.02,side:mt};d==="skin"?Object.assign(g,{roughness:.55,emissive:3806728,emissiveIntensity:.05}):d==="hair"?Object.assign(g,{roughness:.42,metalness:.08}):d==="eyeWhite"?Object.assign(g,{roughness:.3,metalness:0}):d==="iris"?Object.assign(g,{roughness:.34,metalness:0}):d==="faceDetail"?Object.assign(g,{roughness:.72,metalness:0}):Object.assign(g,{roughness:.86});const x=new at(g);return x.name=`person-${d}`,e.add(x),x},p=new Map;for(const d of n){let g=d;for(;g&&!g.isBone;)g=g.parent;if(!g)throw new Error(`Animated character mesh "${d.name}" has no bone parent`);const x=i.get(g);if(x===void 0)throw new Error("Animated character bone is absent from its skeleton");let y=d.geometry.clone();if(y.index){const R=y.toNonIndexed();y.dispose(),y=R}y.applyMatrix4(new et().multiplyMatrices(s,d.matrixWorld));const S=y.getAttribute("color");for(const R of Object.keys(y.attributes))["position","normal","color"].includes(R)||y.deleteAttribute(R);y.getAttribute("normal")||y.computeVertexNormals();const k=d.material,b=h(k),T=p.get(b)??f(b);p.set(b,T);const A=y.getAttribute("position").count;if(b!=="phone"&&b!=="screen"){const R=new Float32Array(A*3),z=k.color??new W(1,1,1);for(let N=0;N<A;N++){const I=k.vertexColors&&S&&N<S.count;R[N*3]=z.r*(I?S.getX(N):1),R[N*3+1]=z.g*(I?S.getY(N):1),R[N*3+2]=z.b*(I?S.getZ(N):1)}y.setAttribute("color",new vt(R,3))}else y.deleteAttribute("color"),b==="phone"&&y.deleteAttribute("uv");const _=new Uint16Array(A*4),P=new Float32Array(A*4);for(let R=0;R<A;R++)_[R*4]=x,P[R*4]=1;y.setAttribute("skinIndex",new xa(_,4)),y.setAttribute("skinWeight",new vt(P,4));const D=r.get(b)??[];D.push(y),r.set(b,D),t.has(d.geometry)||l.add(d.geometry)}const m=new Ki(a);m.calculateInverses();const u=new Set(n.map(d=>d.material).filter(d=>!Array.isArray(d)));for(const[d,g]of r){const x=Yt(g,!1);if(g.forEach(S=>S.dispose()),!x)throw new Error(`Could not merge animated character ${d} geometry`);const y=new Zi(x,p.get(d));y.name="person-skin",y.castShadow=!0,y.receiveShadow=!0,y.bind(m,o.matrixWorld.clone()),o.add(y)}n.forEach(d=>d.removeFromParent()),l.forEach(d=>d.dispose()),u.forEach(d=>{e.has(d)&&(d.dispose(),e.delete(d))});let v=0,w=0,M=0;o.traverse(d=>{var S;if(!d.isMesh)return;const g=d,x=g.geometry.getAttribute("position").count;M+=x,w+=(((S=g.geometry.index)==null?void 0:S.count)??x)/3;let y=d;for(;y&&y!==o&&!y.userData.personDynamicAccessory;)y=y.parent;y!=null&&y.userData.personDynamicAccessory&&(v+=1)}),o.userData.personGeometryStats={draws:r.size+v,triangles:w,vertices:M,joints:a.length}}function en(o){const t=$.clamp(o,0,1);return .025+.02*Math.sin(t*Math.PI)+.006*t}function mc(o,t=10){const e=new Te,s=a=>o*(.004+a*.201);e.moveTo(s(0),.014),e.lineTo(s(1),.014);for(let a=t;a>=0;a--){const i=a/t;e.lineTo(s(i),en(i))}e.closePath();const n=new Oe(e,{depth:.274,steps:1,bevelEnabled:!1,curveSegments:1});return n.translate(0,0,-.137),n}function pc(o){const t=[],e=[];for(let a=0;a<10;a++){const i=-.108+a*.022,r=a===0?.68:a===5||a===9?.58:.86+a%3*.025,l=a===0?.004:.0018,c=a===0?2:5+a%2,h=.023,f=(r-.13-h*(c-1))/c;for(let p=0;p<c;p++){const m=t.length/3,u=.13+p*(f+h);for(let v=0;v<=2;v++){const w=u+f*v/2,M=o*(.004+w*.201),d=en(w)+.001;if(t.push(M,d,i,M,d,i+l),v===2)continue;const g=m+v*2,x=[g,g+1,g+2,g+1,g+3,g+2];e.push(...o===1?x:[g,g+2,g+1,g+1,g+2,g+3])}}}const n=new Gt;return n.setAttribute("position",new vt(t,3)),n.setIndex(e),n.computeVertexNormals(),n}function vc(){const o=[],t=[],e=en(.5771144278606964)+.0018;for(let n=0;n<=10;n++){const a=.065+n*.0115,i=$.clamp((a-.137)/.043,0,1),r=e-i*i*.032;if(o.push(.114,r,a,.126,r,a),n<10){const l=n*2;t.push(l,l+2,l+1,l+1,l+2,l+3)}}const s=new Gt;return s.setAttribute("position",new vt(o,3)),s.setIndex(t),s.computeVertexNormals(),s}function gc(o,t=.055){const e=new Te;e.absarc(0,0,o*1.05,0,Math.PI*2,!1);const s=new qi;s.absarc(0,0,o*.86,0,Math.PI*2,!0),e.holes.push(s);const n=new Oe(e,{depth:t,bevelEnabled:!1,steps:1,curveSegments:16});return n.rotateX(-Math.PI/2),n}function xc(){const o=[0,0,0],t=8;for(let n=0;n<t;n++){const a=n/t*Math.PI*2,i=.55+Math.cos(a)*.55;o.push(Math.sin(a)*.32,i*i*.2,i)}const e=[];for(let n=0;n<t;n++)e.push(0,n+1,(n+1)%t+1);const s=new Gt;return s.setAttribute("position",new vt(o,3)),s.setIndex(e),s.computeVertexNormals(),s}function _1(o="high"){const t=(s,n=.85,a=.02,i={})=>{const r=new at({color:s,roughness:n,metalness:a,...i});return r.fog=!1,r},e=[10173754,3104138,4160079,13081146,6965898,14209208,8018490,2964038];return{detail:o,kit:new Ya,m:fl(),p:{books:e.map(s=>t(s,.82)),fabricRed:t(11553344,.95,0,{side:mt}),fabricBlue:t(3891087,.95,0,{side:mt}),fabricGreen:t(5077589,.95,0,{side:mt}),fabricGrey:t(8225932,.95,0,{side:mt}),fabricCream:t(15261382,.95,0,{side:mt}),screenOn:t(8049872,.3,.1,{emissive:2071200,emissiveIntensity:.7}),screenOff:t(1317150,.2,.4),boardGreen:t(3099199,.9),boardWhite:t(15790056,.6),ceramic:t(15854818,.35),leather:t(5913128,.7,.05),plasticDark:t(2106923,.45,.2),printInk:t(4278605,.98,0),water:h0({depth:.55,quality:o==="low"?"low":"high"}),canvasOlive:t(8359786,.95,0,{side:mt})}}}const ca=new et,ha=new et,wc=new et,ua=new os;class li{constructor(t,e=0,s=0,n=0,a=0,i=1,r=new et){this.kit=t,this.x=e,this.y=s,this.z=n,this.ry=a,this.s=i,this.base=r,this.base=new et().makeTranslation(e,s,n).multiply(new et().makeRotationY(a)).multiply(new et().makeScale(i,i,i))}child(t,e,s,n=0){const a=new li(this.kit,0,0,0,0,1);return a.base=this.base.clone().multiply(ca.makeTranslation(t,e,s)).multiply(ha.makeRotationY(n)),a}put(t,e,s=0,n=0,a=0,i=0,r=0,l=0,c=1,h=1,f=1){ua.set(i,r,l);const p=this.base.clone().multiply(ca.makeTranslation(s,n,a)).multiply(ha.makeRotationFromEuler(ua)).multiply(wc.makeScale(c,h,f));this.kit.addMatrix(t,e,p)}box(t,e,s,n,a,i,r,l=.02,c=0,h=0,f=0){this.put(Xa(e,s,n,l),t,a,i+s/2,r,c,h,f)}cyl(t,e,s,n,a,i,r,l=20){this.put(qe(e,s,n,l),t,a,i+n/2,r)}strut(t,e,s,n,a=6){this.put(hl(e,s,n,a),t)}ball(t,e,s,n,a,i=1,r=1,l=1){this.put(new xt(e,14,10),t,s,n,a,0,0,0,i,r,l)}}function P1(o,t,e=1.8){const{m:s}=o;for(let n=0;n<4;n++)t.box(s.wood,e,.035,.085,0,.44,-.18+n*.1,.008);for(let n=0;n<3;n++)t.box(s.wood,e,.08,.03,0,.62+n*.12,-.27-n*.02,.008,-.12);for(const n of[-1,1]){const a=n*(e-.12)/2;for(const r of[-.23,.19])t.box(s.darkSteel,.1,.035,.13,a,0,r,.006),t.strut(s.darkSteel,[a,.035,r],[a,.435,r*.78],.026,8);t.strut(s.darkSteel,[a,.425,-.28],[a,.425,.23],.027,8),t.strut(s.darkSteel,[a,.4,-.27],[a,.96,-.35],.024,8);const i=new ss([new C(a,.58,.2),new C(a,.65,.13),new C(a,.66,-.14),new C(a,.63,-.29)]);if(t.put(new ns(i,o.detail==="high"?12:6,.024,6,!1),s.darkSteel),t.strut(s.darkSteel,[a,.45,.18],[a,.61,.18],.02,6),o.detail==="high"){for(let r=0;r<4;r++)t.cyl(s.steel,.008,.008,.004,a,.476,-.18+r*.1,6);for(let r=0;r<3;r++)t.put(qe(.008,.008,.004,6),s.steel,a,.66+r*.12,-.248-r*.02,Math.PI/2)}}}function D1(o,t,e=o.m.wood){const{m:s}=o;t.box(e,.42,.04,.42,0,.44,0,.01),t.box(e,.42,.34,.03,0,.5,-.2,.01,-.08);for(const n of[-1,1])for(const a of[-1,1])t.cyl(s.woodDark,.018,.022,.44,n*.18,0,a*.18,8);t.box(s.woodDark,.38,.02,.02,0,.18,.18,.005)}function R1(o,t,e=.46){t.cyl(o.m.wood,.17,.17,.04,0,e-.04,0,20);for(let s=0;s<3;s++){const n=s/3*Math.PI*2;t.strut(o.m.woodDark,[Math.cos(n)*.13,e-.04,Math.sin(n)*.13],[Math.cos(n)*.2,0,Math.sin(n)*.2],.018,6)}}function C1(o,t,e=1.4,s=.8,n=.75,a=o.m.wood){t.box(a,e,.045,s,0,n-.045,0,.012);for(const i of[-1,1])for(const r of[-1,1])t.box(o.m.woodDark,.06,n-.045,.06,i*(e/2-.08),0,r*(s/2-.08),.01);t.box(o.m.woodDark,e-.2,.05,.03,0,n-.13,s/2-.08,.008)}function E1(o,t,e=.6,s=.74){t.cyl(o.m.wood,e,e,.04,0,s-.04,0,36),t.cyl(o.m.woodDark,.05,.07,s-.04,0,0,0,12),t.cyl(o.m.woodDark,.28,.3,.04,0,0,0,20)}function z1(o,t,e=1.5,s=.75,n=.75){const{m:a}=o;t.box(a.wood,e,.04,s,0,n-.04,0,.012),t.box(a.woodDark,.04,n-.04,s-.06,-e/2+.05,0,0,.008),t.box(a.woodDark,.5,n-.04,s-.06,e/2-.3,0,0,.008);for(let i=0;i<3;i++)t.box(a.wood,.44,.17,.02,e/2-.3,.06+i*.21,s/2-.02,.006),t.box(a.brass,.1,.014,.014,e/2-.3,.14+i*.21,s/2+.005,.004)}function N1(o,t,e=2.2,s=2.4,n=5,a=1){const{m:i,p:r}=o,l=ls(a);t.box(i.woodDark,.05,s,.34,-e/2+.025,0,0,.008),t.box(i.woodDark,.05,s,.34,e/2-.025,0,0,.008),t.box(i.woodDark,e,s,.02,0,0,-.16,.006),t.box(i.wood,e,.05,.36,0,s,0,.01);const c=(s-.1)/n;for(let h=0;h<=n;h++)t.box(i.wood,e-.08,.035,.32,0,.05+h*c,0,.008);for(let h=0;h<n;h++){let f=-e/2+.08;for(;f<e/2-.12;){const p=.03+l()*.035,m=c*(.55+l()*.38);l()>.07&&t.box(r.books[Math.floor(l()*r.books.length)],p,m,.22+l()*.05,f+p/2,.085+h*c,.01,.004,0,0,(l()-.5)*(l()>.9?.4:0)),f+=p+.004}}}function F1(o,t,e=4,s=3){const n=ls(s);let a=0;for(let i=0;i<e;i++){const r=.03+n()*.03,l=o.p.books[Math.floor(n()*o.p.books.length)],c=Math.max(.1,.26-i*.012),h=t.child(0,a,0,(n()-.5)*.4);if(h.box(l,c,.003,.19,0,0,0,.001),h.box(o.m.paper,c-.01,r-.006,.18,.002,.003,0,.001),h.box(l,c,.003,.19,0,r-.003,0,.001),h.box(l,.006,r,.19,-c/2+.003,0,0,.001),o.detail==="high"){for(const f of[-.06,.06])h.box(o.m.brass,.001,r*.6,.006,-c/2-6e-4,r*.2,f,0);h.box(o.m.brass,c*.45,8e-4,.035,0,r+2e-4,0,0)}a+=r}}function I1(o,t){for(const e of[-1,1])t.box(o.p.leather,.216,.009,.3,e*.108,.002,0,.003),t.put(mc(e,o.detail==="high"?10:4),o.m.paper),o.detail==="high"&&t.put(pc(e),o.p.printInk);t.strut(o.p.leather,[0,.015,-.15],[0,.015,.15],.008,8),o.detail==="high"&&t.put(vc(),o.p.fabricRed)}function L1(o,t,e=.62,s=.36,n=o.p.screenOn){t.cyl(o.p.plasticDark,.1,.13,.015,0,0,0,16),t.box(o.p.plasticDark,.04,.2,.03,0,.01,0,.006),t.box(o.p.plasticDark,e+.03,s+.03,.03,0,.2,0,.01),t.put(new At(e,s),n,0,.2+(s+.03)/2,.0166)}function U1(o,t,e=o.p.screenOn){t.box(o.m.steel,.34,.015,.23,0,0,0,.005),t.box(o.p.plasticDark,.292,.0015,.101,0,.0152,-.026,.001),t.box(o.p.plasticDark,.098,.001,.048,0,.0153,.073,.001),t.box(o.m.steel,.094,.001,.044,0,.0164,.073,.001),t.strut(o.m.darkSteel,[-.115,.018,-.103],[.115,.018,-.103],.008,8);const s=.3,n=Math.cos(s),a=Math.sin(s),i=(r,l,c,h,f)=>t.put(r,l,c,.018+h*n+f*a,-.103-h*a+f*n,-s);if(i(Xa(.34,.22,.009,.004),o.m.steel,0,.11,0),i(new At(.315,.193),o.p.plasticDark,0,.11,.005),i(new At(.295,.169),e,0,.11,.0056),o.detail==="high"){for(let r=0;r<4;r++)for(let l=0;l<10;l++)t.box(o.m.darkSteel,.023,.0018,.017,-.125+l*.0278,.0168,-.063+r*.023,5e-4);t.box(o.m.darkSteel,.11,.0018,.013,0,.0168,.026,5e-4);for(const r of[-.157,.157])for(let l=0;l<6;l++)t.box(o.p.plasticDark,.003,6e-4,.01,r,.0155,-.067+l*.016,0);i(new At(.258,.009),o.m.paper,0,.174,.0059);for(let r=0;r<4;r++)i(new At(.16-r*.018,.003),o.m.paper,-.024,.145-r*.02,.0059);i(new At(.003,.003),o.p.plasticDark,0,.212,.0058)}}function O1(o,t,e=o.p.screenOn){t.box(o.p.plasticDark,.07,.008,.145,0,0,0,.004),t.put(new At(.062,.13),e,0,.0085,0,-Math.PI/2)}function G1(o,t){t.box(o.m.woodDark,.6,1,.45,0,0,0,.015),t.box(o.m.wood,.7,.04,.55,0,1,0,.01,-.28),t.box(o.m.brass,.4,.012,.012,0,.98,.22,.003)}function W1(o,t,e=2.4,s=1.2,n=o.p.boardGreen){t.box(o.m.woodDark,e+.12,s+.12,.05,0,0,0,.012),t.box(n,e,s,.02,0,.06,.03,.006),t.box(o.m.wood,e*.7,.04,.08,0,.04,.07,.008)}function B1(o,t,e=.5,s=5){const n=ls(s);t.put(new Ct(e,e*1.04,.38,24,1,!0),o.m.stoneDark,0,.19,0),t.put(gc(e,.08),o.m.stone,0,.355,0),t.cyl(o.m.soil,e*.88,e*.88,.045,0,.31,0,24);const a=Wa();for(const i of ja(s*13+5,e*.62,o.detail==="high"?96:30)){const r=i.attributes.color;for(let l=0;l<r.count;l++)r.setXYZ(l,r.getX(l)*.82,r.getY(l)*.82,r.getZ(l)*.82);t.put(i,a,0,.66,0)}for(let i=0;i<(o.detail==="high"?7:3);i++){const r=n()*Math.PI*2,l=Math.sqrt(n())*e*.6,c=Math.cos(r)*l,h=Math.sin(r)*l,f=.78+n()*.22,p=e*(.12+n()*.05);t.strut(o.m.leaf,[c*.85,.35,h*.85],[c,f,h],.008,5);const m=t.child(c,f,h,r),u=o.detail==="high"?6:4;for(let v=0;v<u;v++)m.put(xc(),i%2?o.p.fabricCream:o.p.fabricRed,0,0,0,0,v/u*Math.PI*2,0,p,p,p);m.put(new xt(p*.25,8,5),o.p.books[3],0,.008,0,0,0,0,1,.55,1)}}function V1(o,t,e=3.4){t.cyl(o.m.slate,.14,.18,.18,0,0,0,10),t.cyl(o.m.slate,.045,.065,e,0,.18,0,8),t.strut(o.m.slate,[0,e+.18,0],[.45,e+.3,0],.03,5),t.put(new to(.26,.2,8),o.m.slate,.5,e+.34),t.cyl(o.m.lampGlass,.12,.18,.32,.5,e-.02,0,8)}function H1(o,t,e,s=1,n=o.m.steel){const a=Math.max(2,Math.round(e/1));for(let i=0;i<=a;i++)t.cyl(n,.02,.025,s,i/a*e,0,0,8);t.box(n,e,.04,.04,e/2,s,0,.01),t.box(n,e,.025,.025,e/2,s*.5,0,.006)}function j1(o,t,e=2,s=4,n=.17,a=.32){for(let i=0;i<s;i++)t.box(o.m.stoneWarm,e,n*(i+1),a,0,0,i*a,.015)}function $1(o,t,e=.6,s=.45,n=.5){t.box(o.m.wood,e,s,n,0,0,0,.012);for(let a=1;a<3;a++)t.box(o.m.woodDark,e+.004,.025,n+.004,0,s*a/3,0,.004);for(const a of[-1,1])t.box(o.m.woodDark,.04,s+.004,n+.004,a*(e/2-.03),0,0,.004)}function X1(o,t,e=.28,s=.7){t.put(qe(e*.92,e*.92,s,20),o.m.woodDark,0,s/2,0),t.put(qe(e,e,s*.5,20),o.m.woodDark,0,s/2,0);for(const n of[.14,.4,.6])t.put(new Dt(e*.98,.012,5,24),o.m.darkSteel,0,n*(s/.74),0,Math.PI/2)}function Y1(o,t,e=.5,s=.7,n=.25,a=o.p.fabricBlue){t.box(a,e,s,n,0,.05,0,.04),t.box(o.m.darkSteel,.03,s*.5,.03,0,s+.05,-n*.2,.005),t.box(o.m.darkSteel,e*.5,.025,.03,0,s+.28,-n*.2,.005);for(const i of[-1,1])t.cyl(o.p.plasticDark,.025,.025,.05,i*(e/2-.06),0,0,10)}function K1(o,t,e=.6,s=.45,n=o.p.fabricCream){t.box(o.m.woodDark,e+.06,s+.06,.03,0,0,0,.008),t.put(new At(e,s),n,0,s/2+.03,.017)}function Z1(o,t,e=.2){t.cyl(o.m.brass,.1,.12,.03,0,0,0,16),t.cyl(o.m.brass,.015,.015,.2,0,.03,0,8),t.put(new xt(e,24,16),o.p.fabricBlue,0,.3+e*.5,0,.4),t.put(new Dt(e*1.08,.01,6,36,Math.PI*1.5),o.m.brass,0,.3+e*.5,0,.4,Math.PI/2)}function q1(o,t){t.cyl(o.p.ceramic,.055,.055,.008,0,0,0,16),t.cyl(o.p.ceramic,.04,.03,.065,0,.008,0,16),t.put(new Dt(.02,.006,5,10,Math.PI),o.p.ceramic,.05,.04,0,0,0,-Math.PI/2)}function Q1(o,t,e=2.4,s=1,n=8,a=o.p.fabricRed,i=o.p.fabricCream){for(let r=0;r<n;r++)t.box(r%2?i:a,e/n,.015,s,-e/2+(r+.5)*(e/n),2.3,s/2,.004,.32);t.box(o.m.woodDark,e+.06,.05,.05,0,2.62,.02,.01);for(const r of[-1,1])t.cyl(o.m.woodDark,.025,.03,2.4,r*(e/2),0,s-.05,8)}function J1(o,t,e=1.4,s=o.m.terracottaRoof){for(const[n,a]of[[-1,-1],[1,-1],[-1,1],[1,1]])t.cyl(o.m.woodDark,.06,.07,2.4,n*e,0,a*e,10);t.box(o.m.woodDark,e*2+.2,.1,.1,0,2.4,-e,.01),t.box(o.m.woodDark,e*2+.2,.1,.1,0,2.4,e,.01),t.box(o.m.woodDark,.1,.1,e*2+.2,-e,2.4,0,.01),t.box(o.m.woodDark,.1,.1,e*2+.2,e,2.4,0,.01),t.put(new to(e*1.7,1,4),s,0,3,0,0,Math.PI/4),t.ball(o.m.brass,.07,0,3.55,0)}const ci=.045;function Mc(o,t){const e=Math.min(1.65,t-.35),s=Math.min(.56,Math.max(.2,(o-1.25)/2)),n=Math.min(1.2,t-.8),a=Math.min(.64,t-n-.16),i=.025,r=.025,l=.05,c=Math.max(i,r,ci),h=o/2-l-c-s/2;return[{kind:"door",x:0,y:.3,width:Math.min(.82,o-.08),height:e},{kind:"window",x:-h,y:n,width:s,height:a,sillOverhang:i,lintelOverhang:r},{kind:"window",x:h,y:n,width:s,height:a,curtain:!0,sillOverhang:i,lintelOverhang:r}]}function yc(o,t,e,s,n,a,i,r){const l=[...new Set([-e/2,e/2,...r.flatMap(c=>[c.x-c.width/2,c.x+c.width/2])])].sort((c,h)=>c-h);for(let c=0;c<l.length-1;c++){const h=l[c],f=l[c+1];if(f-h<.006)continue;const p=(h+f)/2,m=r.filter(v=>p>v.x-v.width/2&&p<v.x+v.width/2).sort((v,w)=>v.y-w.y);let u=a;for(const v of m){const w=$.clamp(v.y,a,s),M=$.clamp(v.y+v.height,a,s);w-u>.006&&o.box(t,f-h,w-u,i,p,u,n-i/2,0),u=Math.max(u,M)}s-u>.006&&o.box(t,f-h,s-u,i,p,u,n-i/2,0)}}function th(o,t,e=2.4,s=2.6,n=2.2,a=o.m.terracottaRoof,i=o.m.paper){const{m:r}=o,l=.3,c=Math.max(.1,s-l),h=Math.min(.16,n*.12),f=n/2,p=Mc(e,s),m=p[0],u=p.slice(1);t.box(r.stoneDark,e+.1,l,n+.1,0,0,0,.02),t.box(i,h,c,n,-e/2+h/2,l,0,0),t.box(i,h,c,n,e/2-h/2,l,0,0),t.box(i,e,c,h,0,l,-n/2+h/2,0),yc(t,i,e,s,f,l,h,p),t.put(Xn(e+.5,.95+e*.12,n+.5),a,0,s,0),t.put(Xn(e+.3,.8+e*.12,n+.3),r.woodDark,0,s-.04,0,0,0,0,1,.97,.99);const v=.06,w=f+.008,M=m.x-m.width/2,d=m.x+m.width/2,g=f-h/2+.01,x=Math.max(.2,m.height-.08),y=m.y+x;t.box(r.woodDark,v,x,h+.04,M+v/2,m.y,g,.008),t.box(r.woodDark,v,x,h+.04,d-v/2,m.y,g,.008),t.box(r.woodDark,m.width,.08,h+.04,m.x,y,g,.008);const S=Math.max(.48,m.width-v*2-.08),k=m.height-.11;if(t.box(r.wood,S,k,.055,m.x,m.y,w,.008),o.detail==="high"){for(const b of[m.y+.56,m.y+1.12])b<m.y+k-.04&&t.box(r.woodDark,S-.08,.025,.012,m.x,b,w+.034,.003);for(const b of[-.14,0,.14])t.box(r.woodDark,.012,k-.12,.012,m.x+b,m.y+.06,w+.034,.002);for(const b of[m.y+.16,m.y+m.height-.22])t.box(r.brass,.035,.075,.012,M+v/2,b,w+.038,.003)}t.box(r.stoneWarm,Math.max(.9,m.width+.38),.16,.45,0,0,f+.22,.02),t.box(r.brass,.05,.05,.04,m.x+Math.min(.24,S*.4),m.y+Math.min(.75,k*.49),w+.04,.008);for(const b of u){const T=t.child(b.x,b.y,f+.006);bc(o,T,b.width,b.height,{cols:o.detail==="high"?2:1,rows:o.detail==="high"?2:1,curtain:o.detail==="high"&&b.curtain,lit:!0,frame:r.woodDark,recess:h+.03,sillOverhang:b.sillOverhang,lintelOverhang:b.lintelOverhang});const A=h,_=f-A/2;for(const P of[-1,1])t.box(r.woodDark,.025,b.height,A,b.x+P*b.width/2,b.y,_,.003)}t.box(r.stoneDark,.32,1,.32,e/2-.45,s+.15,-n/4,.02)}function eh(o,t,e=2.4,s=1,n=1){t.put(qe(e+.28,e+.34,.3,40),o.m.stoneDark,0,.15,0,0,0,0,s,1,n),t.put(qe(e,e,.2,40),o.p.water,0,.27,0,0,0,0,s,1,n)}function oh(o,t,e=3.2,s=1,n=o.p.fabricCream,a=o.m.woodDark){const{m:i}=o,r=e*.3,l=e*.22,c=new Te;c.moveTo(-e/2,l),c.lineTo(-e*.36,0),c.lineTo(e*.3,0),c.quadraticCurveTo(e*.5,l*.25,e/2+.12,l*.92),c.lineTo(-e/2,l);const h=new Oe(c,{depth:r,bevelEnabled:!0,bevelThickness:.03,bevelSize:.03,bevelSegments:1});h.translate(0,0,-r/2),t.put(h,a,0,.05,0),t.box(o.p.fabricRed,e*.98,.05,.04,0,l*.95,r/2+.02,.01),t.box(o.p.fabricRed,e*.98,.05,.04,0,l*.95,-r/2-.02,.01),t.box(i.wood,e*.9,.04,r*.92,0,l*.9,0,.01);for(let p=0;p<9;p++)for(const m of[-1,1])t.box(i.woodDark,.02,l*.22,.02,-e*.42+p*e*.1,l*.95,m*(r/2-.02),.004);t.box(i.woodDark,e*.22,l*.55,r*.7,-e*.3,l*.92,0,.02),t.box(i.slate,e*.1,.1,.02,-e*.3,l*1.25,r*.36,.005),t.box(i.woodDark,.02,l*.6,r*.12,-e/2-.02,l*.2,0,.004),t.strut(i.woodDark,[-e/2-.02,l*.75,0],[-e/2+.2,l*1,0],.012,5),t.strut(i.woodDark,[e/2-.1,l*.95,0],[e/2+.28,l*1.35,0],.02,6),t.put(new Dt(.05,.01,6,14,Math.PI),i.darkSteel,e*.36,l*.9,r/2+.05,0,0,Math.PI),t.strut(i.darkSteel,[e*.36,l*.9,r/2+.05],[e*.36,l*.9+.14,r/2+.05],.008,4),t.cyl(i.wood,.07,.07,.04,e*.2,l*.93,r*.25,12);const f=e*.5/Math.max(1,s);for(let p=0;p<s;p++){const m=e*.12-p*f*.9,u=e*(.95-p*.12),v=l*.92;t.cyl(i.woodDark,.022,.04,u,m,v,0,10);const w=v+u*.92,M=v+u*.3,d=e*.34;t.strut(i.woodDark,[m,w,-d/2],[m,w,d/2],.014,6),t.strut(i.woodDark,[m,M,-d/2*1.1],[m,M,d/2*1.1],.016,6);const g=new At(1,1,12,10),x=g.attributes.position,y=w-M;for(let S=0;S<x.count;S++){const k=x.getX(S)+.5,b=x.getY(S)+.5,T=d/2*(.78+.22*(1-b)),A=(k-.5)*2*T,_=M+b*y,P=Math.sin(k*Math.PI)*Math.sin(b*Math.PI*.9+.2)*.1*e*.3;x.setXYZ(S,P,_,A)}g.computeVertexNormals(),t.put(g,n,m,0,0);for(let S=1;S<5;S++)t.strut(i.woodDark,[m+.012,M+y*S/5,-d/2*.86],[m+.012,M+y*S/5,d/2*.86],.004,4);t.cyl(i.woodDark,.07,.06,.04,m,w+.02,0,10),t.strut(i.steel,[m,v+u,0],[e/2+.05,l*.9,0],.008,4),t.strut(i.steel,[m,v+u,0],[-e/2,l*1,0],.008,4);for(const S of[-1,1]){t.strut(i.steel,[m,w,0],[m,l*.95,S*(r/2+.03)],.006,4);for(let k=1;k<6;k++){const b=k/6;t.strut(i.steel,[m,w-(w-l*.95)*b,S*(r/2+.03)*b],[m+.001,w-(w-l*.95)*b,S*(r/2+.03)*b+0],.004,3)}}p===0&&t.box(o.p.fabricRed,.22,.14,.01,m+.11,v+u+.06,0,.003)}}function sh(o,t,e=4.4,s=3.4,n=2.6,a=o.p.canvasOlive){for(const i of[-1,1])for(const r of[-1,1])t.cyl(o.m.woodDark,.05,.06,n,i*(e/2-.1),0,r*(s/2-.1),10);for(const i of[-1,1])t.box(a,e+.4,.04,s*.62,0,n+.28,i*s*.27,.01,-i*.22);t.box(o.m.woodDark,e+.1,.06,.06,0,n+.5,0,.01),t.box(a,e+.3,.45,.03,0,n-.4,s/2+.02,.01)}function nh(o,t,e,s=2.6){t.cyl(o.m.woodDark,.06,.085,s,0,0,0,10),t.cyl(o.m.stoneDark,.2,.24,.18,0,0,0,12),e.forEach((n,a)=>{const i=s-.3-a*.34,r=n.len??.95,l=t.child(0,i,0,n.yaw);l.box(n.tone??o.m.wood,r,.24,.045,r/2-.05,0,0,.012),l.put(new to(.16,.2,3),n.tone??o.m.wood,r+.04,.12,0,0,0,-Math.PI/2,1,1,.3),l.box(o.m.paper,r*.6,.05,.01,r/2-.05,.1,.03,.003)}),t.ball(o.m.brass,.07,0,s+.05,0)}function ah(o,t,e=o.p.fabricRed){const{m:s}=o;for(const n of[-.55,.55]){t.put(new Dt(.33,.018,8,28),s.darkSteel,n,.36,0);for(let a=0;a<6;a++){const i=a/6*Math.PI;t.strut(s.steel,[n+Math.cos(i)*.32,.36+Math.sin(i)*.32,0],[n-Math.cos(i)*.32,.36-Math.sin(i)*.32,0],.004,3)}t.cyl(s.steel,.03,.03,.05,n,.36,0,8)}t.strut(e,[-.55,.36,0],[-.1,.38,0],.016,6),t.strut(e,[-.1,.38,0],[.4,.74,0],.016,6),t.strut(e,[-.55,.36,0],[-.1,.75,0],.016,6),t.strut(e,[-.1,.75,0],[.4,.74,0],.016,6),t.strut(e,[.4,.74,0],[.55,.36,0],.016,6),t.box(o.p.leather,.22,.04,.1,-.12,.8,0,.015),t.strut(s.darkSteel,[.4,.74,0],[.38,.95,0],.012,5),t.box(s.darkSteel,.03,.03,.4,.38,.95,0,.008)}function ih(o,t,e=6,s=.72){const n=Math.floor(e/.42);for(let a=0;a<=n;a++)t.box(o.m.woodDark,.2,.1,s+.7,a/n*e,0,0,.02);for(const a of[-1,1])t.box(o.m.steel,e,.07,.07,e/2,.1,a*s/2,.012)}function rh(o,t,e=.55,s=o.p.fabricRed){t.cyl(o.m.darkSteel,.012,.012,1.5,0,0,0,6),t.put(new to(e,.28,16,1,!0),s,0,1.58,0),t.ball(o.m.brass,.025,0,1.76,0)}function lh(o,t,e=2.4){for(const a of[-1,1])t.strut(o.m.wood,[a*.22,0,.3],[a*.22,e,.3-e*.2],.025,6);const n=Math.floor(e/.3);for(let a=1;a<=n;a++){const i=a*.3/e;t.box(o.m.woodDark,.44,.03,.08,0,i*e-.015,.3-i*e*.2,.008)}for(const a of[-1,1])t.cyl(o.p.plasticDark,.03,.03,.04,a*.22,0,.3,8)}function ch(o,t,e=2){const s=ls(e);t.box(o.m.wood,1.2,.05,.5,0,.35,0,.012),t.box(o.m.woodDark,1.2,.3,.04,0,.35,-.23,.01);for(const n of[-1,1])t.box(o.m.woodDark,.05,.8,.5,n*.58,.35,0,.01);t.box(o.m.woodDark,1.2,.04,.4,0,.7,0,.01,-.2);for(const n of[-1,1])for(const a of[-1,1])t.put(new Dt(.1,.03,8,14),o.m.darkSteel,n*.5,.12,a*.2,0,Math.PI/2);for(let n=0;n<2;n++){let a=-.52;for(;a<.5;){const i=.04+s()*.03;t.box(o.p.books[Math.floor(s()*o.p.books.length)],i,.18+s()*.1,.22,a+i/2,n===0?.4:.74,-.02,.004,0,0,n===1?-.2:0),a+=i+.004}}}function ls(o){let t=o>>>0;return()=>{t=t+1831565813>>>0;let e=t;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}}const fa=new WeakMap;function bc(o,t,e,s,n={}){const{m:a}=o,i=n.cols??2,r=n.rows??2,l=n.frame??a.woodDark;let c=fa.get(o);c||(c={glow:new at({color:16769704,emissive:16757850,emissiveIntensity:.55,roughness:.7}),curtain:new at({color:14272680,roughness:.95,side:mt})},fa.set(o,c));const h=ci;n.lit!==!1&&t.box(c.glow,e-h,s-h,.01,0,h/2,-(n.recess??.02),.002),t.put(new At(e-h*1.4,s-h*1.4),a.glass,0,s/2,.02),t.box(l,e+h*2,h,.08,0,-h,0,.006),t.box(l,e+h*2,h,.08,0,s,0,.006),t.box(l,h,s+h*2,.08,-e/2-h/2,-h,0,.006),t.box(l,h,s+h*2,.08,e/2+h/2,-h,0,.006);for(let m=1;m<i;m++)t.box(l,.022,s,.05,-e/2+e*m/i,0,.03,.003);for(let m=1;m<r;m++)t.box(l,e,.022,.05,0,s*m/r,.03,.003);const f=Math.max(0,n.sillOverhang??.11),p=Math.max(0,n.lintelOverhang??.1);if(t.box(a.stoneWarm,e+f*2,.05,.16,0,-h-.05,.05,.01),t.box(a.stoneDark,e+p*2,.06,.1,0,s+h,.03,.01),n.curtain){for(const m of[-1,1]){const u=new At(e*.3,s*.92,5,1),v=u.attributes.position;for(let w=0;w<v.count;w++)v.setZ(w,Math.sin(v.getX(w)*40)*.012);u.computeVertexNormals(),t.put(u,c.curtain,m*e*.33,s*.5,.06)}t.box(a.brass,e+.08,.015,.015,0,s-.03,.07,.004)}}export{K1 as $,V1 as A,C1 as B,$1 as C,F1 as D,P1 as E,li as F,E1 as G,Y1 as H,B1 as I,J1 as J,q1 as K,Ic as L,Ya as M,O1 as N,z1 as O,D1 as P,U1 as Q,I1 as R,W1 as S,Q1 as T,X1 as U,Z1 as V,h1 as W,oh as X,sh as Y,j1 as Z,G1 as _,Qo as a,Rc as a$,eh as a0,ih as a1,rh as a2,nh as a3,bc as a4,ah as a5,br as a6,R1 as a7,Xn as a8,lh as a9,f1 as aA,v0 as aB,i1 as aC,Wc as aD,hr as aE,Gc as aF,Uc as aG,Hc as aH,Ar as aI,Pn as aJ,Ir as aK,Jc as aL,d1 as aM,m1 as aN,zc as aO,Nc as aP,Fc as aQ,Kc as aR,Yc as aS,Zc as aT,Ac as aU,b1 as aV,ds as aW,r1 as aX,y1 as aY,_a as aZ,Tr as a_,ch as aa,N1 as ab,L1 as ac,Se as ad,h0 as ae,$c as af,s1 as ag,o1 as ah,M1 as ai,T1 as aj,n1 as ak,ll as al,Bc as am,Dc as an,I0 as ao,Pc as ap,_c as aq,v1 as ar,g1 as as,x1 as at,k1 as au,a1 as av,S1 as aw,il as ax,Lc as ay,Vc as az,Xc as b,Oc as b0,Ji as b1,Zs as b2,w1 as b3,zt as b4,p1 as b5,ks as b6,jc as c,Br as d,qc as e,Qc as f,Y0 as g,Cc as h,fl as i,qe as j,Ol as k,hl as l,fr as m,c1 as n,Xa as o,l1 as p,Wa as q,t1 as r,Ec as s,e1 as t,u1 as u,Ba as v,_1 as w,A1 as x,H1 as y,th as z};
