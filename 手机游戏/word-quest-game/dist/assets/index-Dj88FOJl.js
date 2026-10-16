var gr=Object.defineProperty;var vr=(t,n,e)=>n in t?gr(t,n,{enumerable:!0,configurable:!0,writable:!0,value:e}):t[n]=e;var K=(t,n,e)=>vr(t,typeof n!="symbol"?n+"":n,e);import{U as rn,c as xr,N as ln,S as Ct,C as ue,M as At,R as Sr,e as gt,w as rt,V as Ot,l as zs,F as Mo,W as Ws,a as zt,b as vt,L as pn,H as qt,D as ct,B as Gt,d as Vn,f as j,p as Mr,g as ui,h as zn,i as U,j as vn,O as Di,P as Hn,k as ee,m as xt,n as fi,o as Wn,q as Eo,r as mt,E as Er,A as Tr,s as ki,t as ut,u as hn,v as Gn,x as Xn,y as di,z as Un,G as wr,I as br,J as Kn,K as Bt,Q as Li,T as Dt,X as un,Y as Ii,Z as kt,_ as Jt,$ as Rr,a0 as wn,a1 as Xs,a2 as Ar,a3 as yr,a4 as Qn,a5 as Cr,a6 as Lr,a7 as Pr,a8 as Dr,a9 as Ir,aa as Ur,ab as Nr,ac as Fr,ad as Or,ae as Br,af as Gr,ag as Hr,ah as kr,ai as Vr,aj as zr,ak as To,al as pi,am as Ri,an as si,ao as wo,ap as mn,aq as Wr,ar as Xr,as as bs,at as Kr,au as Rs,av as qr,aw as Yr,ax as $r,ay as st,az as bo,aA as jr,aB as Zr,aC as ri,aD as Qr,aE as ai,aF as bn,aG as Jr,aH as Ro,aI as Ao,aJ as yo,aK as Pi,aL as Co,aM as Lo,aN as Po,aO as Vt,aP as ec,aQ as tc,aR as nc,aS as ic,aT as Do,aU as sc,aV as ac,aW as oc,aX as Vi,aY as zi,aZ as Wi,a_ as Xi,a$ as Ks,b0 as qs,b1 as Ys,b2 as $s,b3 as js,b4 as Zs,b5 as Qs,b6 as Js,b7 as ea,b8 as fs,b9 as ta,ba as na,bb as ia,bc as sa,bd as aa,be as oa,bf as ra,bg as ca,bh as la,bi as ua,bj as fa,bk as da,bl as pa,bm as ha,bn as ma,bo as _a,bp as ga,bq as va,br as xa,bs as Sa,bt as ds,bu as Ma,bv as rc,bw as cc,bx as lc,by as uc,bz as fc,bA as dc,bB as pc,bC as hc,bD as Ea,bE as mc,bF as Ai,bG as _c,bH as Ta,bI as wa,bJ as hi,bK as Io,bL as qn,bM as ba,bN as gc,bO as Uo,bP as ps,bQ as No,bR as vc,bS as As,bT as ys,bU as Cs,bV as Ui,bW as Ls,bX as Ps,bY as Ds,bZ as Ra,b_ as Fo,b$ as Ki,c0 as qi,c1 as xc,c2 as Sc,c3 as Aa,c4 as Xt,c5 as Mc,c6 as Ec,c7 as Tc,c8 as wc,c9 as bc,ca as Rc,cb as hs,cc as Ac,cd as yc,ce as Cc,cf as Lc,cg as Pc,ch as ms,ci as Oo,cj as Dc,ck as ci,cl as Bo,cm as $t,cn as Is,co as Qt,cp as _s,cq as St,cr as an,cs as Ic,ct as mi,cu as Uc,cv as Nc,cw as Fc,cx as Go,cy as Yi,cz as Oc,cA as q,cB as Bc,cC as Gc,cD as Hc,cE as kc,cF as Vc,cG as Ho,cH as lt,cI as In,cJ as zc,cK as Wc,cL as Xc,cM as Kc,cN as ko,cO as qc,cP as ya,cQ as Ca,cR as La,cS as Yc,cT as Vo,cU as $c,cV as Yt,cW as Ft,cX as dn,cY as he,cZ as It,c_ as An,c$ as jc,d0 as ze,d1 as _i,d2 as ie,d3 as je,d4 as Zc,d5 as Yn,d6 as Qc,d7 as Pa,d8 as Jc,d9 as Rt,da as Et,db as Ln,dc as Pn,dd as _n,de as gn,df as cn,dg as li,dh as gi,di as el,dj as gs,dk as tl,dl as Da,dm as Ia,dn as Jn,dp as nl,dq as Ht,dr as il,ds as On,dt as sl,du as al,dv as En,dw as Ua,dx as ol,dy as Mi,dz as rl,dA as $i,dB as ji,dC as cl}from"./index-BV5znJqG.js";/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function zo(){let t=null,n=!1,e=null,i=null;function a(s,o){e(s,o),i=t.requestAnimationFrame(a)}return{start:function(){n!==!0&&e!==null&&t!==null&&(i=t.requestAnimationFrame(a),n=!0)},stop:function(){t!==null&&t.cancelAnimationFrame(i),n=!1},setAnimationLoop:function(s){e=s},setContext:function(s){t=s}}}function ll(t){const n=new WeakMap;function e(u,f){const r=u.array,m=u.usage,_=r.byteLength,h=t.createBuffer();t.bindBuffer(f,h),t.bufferData(f,r,m),u.onUploadCallback();let v;if(r instanceof Float32Array)v=t.FLOAT;else if(typeof Float16Array<"u"&&r instanceof Float16Array)v=t.HALF_FLOAT;else if(r instanceof Uint16Array)u.isFloat16BufferAttribute?v=t.HALF_FLOAT:v=t.UNSIGNED_SHORT;else if(r instanceof Int16Array)v=t.SHORT;else if(r instanceof Uint32Array)v=t.UNSIGNED_INT;else if(r instanceof Int32Array)v=t.INT;else if(r instanceof Int8Array)v=t.BYTE;else if(r instanceof Uint8Array)v=t.UNSIGNED_BYTE;else if(r instanceof Uint8ClampedArray)v=t.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+r);return{buffer:h,type:v,bytesPerElement:r.BYTES_PER_ELEMENT,version:u.version,size:_}}function i(u,f,r){const m=f.array,_=f.updateRanges;if(t.bindBuffer(r,u),_.length===0)t.bufferSubData(r,0,m);else{_.sort((v,p)=>v.start-p.start);let h=0;for(let v=1;v<_.length;v++){const p=_[h],d=_[v];d.start<=p.start+p.count+1?p.count=Math.max(p.count,d.start+d.count-p.start):(++h,_[h]=d)}_.length=h+1;for(let v=0,p=_.length;v<p;v++){const d=_[v];t.bufferSubData(r,d.start*m.BYTES_PER_ELEMENT,m,d.start,d.count)}f.clearUpdateRanges()}f.onUploadCallback()}function a(u){return u.isInterleavedBufferAttribute&&(u=u.data),n.get(u)}function s(u){u.isInterleavedBufferAttribute&&(u=u.data);const f=n.get(u);f&&(t.deleteBuffer(f.buffer),n.delete(u))}function o(u,f){if(u.isInterleavedBufferAttribute&&(u=u.data),u.isGLBufferAttribute){const m=n.get(u);(!m||m.version<u.version)&&n.set(u,{buffer:u.buffer,type:u.type,bytesPerElement:u.elementSize,version:u.version});return}const r=n.get(u);if(r===void 0)n.set(u,e(u,f));else if(r.version<u.version){if(r.size!==u.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(r.buffer,u,f),r.version=u.version}}return{get:a,remove:s,update:o}}var ul=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,fl=`#ifdef USE_ALPHAHASH
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
#endif`,dl=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,pl=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,hl=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,ml=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,_l=`#ifdef USE_AOMAP
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
#endif`,gl=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,vl=`#ifdef USE_BATCHING
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
#endif`,xl=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Sl=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Ml=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,El=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Tl=`#ifdef USE_IRIDESCENCE
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
#endif`,wl=`#ifdef USE_BUMPMAP
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
#endif`,bl=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Rl=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Al=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,yl=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Cl=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,Ll=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,Pl=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,Dl=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,Il=`#define PI 3.141592653589793
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
} // validated`,Ul=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,Nl=`vec3 transformedNormal = objectNormal;
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
#endif`,Fl=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Ol=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Bl=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Gl=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Hl="gl_FragColor = linearToOutputTexel( gl_FragColor );",kl=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Vl=`#ifdef USE_ENVMAP
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
#endif`,zl=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,Wl=`#ifdef USE_ENVMAP
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
#endif`,Xl=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Kl=`#ifdef USE_ENVMAP
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
#endif`,ql=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Yl=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,$l=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,jl=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Zl=`#ifdef USE_GRADIENTMAP
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
}`,Ql=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Jl=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,eu=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,tu=`uniform bool receiveShadow;
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
#include <lightprobes_pars_fragment>`,nu=`#ifdef USE_ENVMAP
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
#endif`,iu=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,su=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,au=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,ou=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,ru=`PhysicalMaterial material;
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
#endif`,cu=`uniform sampler2D dfgLUT;
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
}`,lu=`
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
#endif`,uu=`#if defined( RE_IndirectDiffuse )
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
#endif`,fu=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,du=`#ifdef USE_LIGHT_PROBES_GRID
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
#endif`,pu=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,hu=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,mu=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,_u=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,gu=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,vu=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,xu=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Su=`#if defined( USE_POINTS_UV )
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
#endif`,Mu=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Eu=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Tu=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,wu=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,bu=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Ru=`#ifdef USE_MORPHTARGETS
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
#endif`,Au=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,yu=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,Cu=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,Lu=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Pu=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Du=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Iu=`#ifdef USE_NORMALMAP
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
#endif`,Uu=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Nu=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Fu=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Ou=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Bu=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Gu=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,Hu=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,ku=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Vu=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,zu=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Wu=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Xu=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Ku=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,qu=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Yu=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,$u=`float getShadowMask() {
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
}`,ju=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Zu=`#ifdef USE_SKINNING
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
#endif`,Qu=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Ju=`#ifdef USE_SKINNING
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
#endif`,ef=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,tf=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,nf=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,sf=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,af=`#ifdef USE_TRANSMISSION
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
#endif`,of=`#ifdef USE_TRANSMISSION
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
#endif`,rf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,cf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,lf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,uf=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const ff=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,df=`uniform sampler2D t2D;
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
}`,pf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,hf=`#ifdef ENVMAP_TYPE_CUBE
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
}`,mf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,_f=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,gf=`#include <common>
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
}`,vf=`#if DEPTH_PACKING == 3200
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
}`,xf=`#define DISTANCE
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
}`,Sf=`#define DISTANCE
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
}`,Mf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Ef=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Tf=`uniform float scale;
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
}`,wf=`uniform vec3 diffuse;
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
}`,bf=`#include <common>
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
}`,Rf=`uniform vec3 diffuse;
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
}`,Af=`#define LAMBERT
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
}`,yf=`#define LAMBERT
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
}`,Cf=`#define MATCAP
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
}`,Lf=`#define MATCAP
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
}`,Pf=`#define NORMAL
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
}`,Df=`#define NORMAL
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
}`,If=`#define PHONG
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
}`,Uf=`#define PHONG
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
}`,Nf=`#define STANDARD
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
}`,Ff=`#define STANDARD
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
}`,Of=`#define TOON
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
}`,Bf=`#define TOON
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
}`,Gf=`uniform float size;
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
}`,Hf=`uniform vec3 diffuse;
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
}`,kf=`#include <common>
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
}`,Vf=`uniform vec3 color;
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
}`,zf=`uniform float rotation;
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
}`,Wf=`uniform vec3 diffuse;
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
}`,et={alphahash_fragment:ul,alphahash_pars_fragment:fl,alphamap_fragment:dl,alphamap_pars_fragment:pl,alphatest_fragment:hl,alphatest_pars_fragment:ml,aomap_fragment:_l,aomap_pars_fragment:gl,batching_pars_vertex:vl,batching_vertex:xl,begin_vertex:Sl,beginnormal_vertex:Ml,bsdfs:El,iridescence_fragment:Tl,bumpmap_pars_fragment:wl,clipping_planes_fragment:bl,clipping_planes_pars_fragment:Rl,clipping_planes_pars_vertex:Al,clipping_planes_vertex:yl,color_fragment:Cl,color_pars_fragment:Ll,color_pars_vertex:Pl,color_vertex:Dl,common:Il,cube_uv_reflection_fragment:Ul,defaultnormal_vertex:Nl,displacementmap_pars_vertex:Fl,displacementmap_vertex:Ol,emissivemap_fragment:Bl,emissivemap_pars_fragment:Gl,colorspace_fragment:Hl,colorspace_pars_fragment:kl,envmap_fragment:Vl,envmap_common_pars_fragment:zl,envmap_pars_fragment:Wl,envmap_pars_vertex:Xl,envmap_physical_pars_fragment:nu,envmap_vertex:Kl,fog_vertex:ql,fog_pars_vertex:Yl,fog_fragment:$l,fog_pars_fragment:jl,gradientmap_pars_fragment:Zl,lightmap_pars_fragment:Ql,lights_lambert_fragment:Jl,lights_lambert_pars_fragment:eu,lights_pars_begin:tu,lights_toon_fragment:iu,lights_toon_pars_fragment:su,lights_phong_fragment:au,lights_phong_pars_fragment:ou,lights_physical_fragment:ru,lights_physical_pars_fragment:cu,lights_fragment_begin:lu,lights_fragment_maps:uu,lights_fragment_end:fu,lightprobes_pars_fragment:du,logdepthbuf_fragment:pu,logdepthbuf_pars_fragment:hu,logdepthbuf_pars_vertex:mu,logdepthbuf_vertex:_u,map_fragment:gu,map_pars_fragment:vu,map_particle_fragment:xu,map_particle_pars_fragment:Su,metalnessmap_fragment:Mu,metalnessmap_pars_fragment:Eu,morphinstance_vertex:Tu,morphcolor_vertex:wu,morphnormal_vertex:bu,morphtarget_pars_vertex:Ru,morphtarget_vertex:Au,normal_fragment_begin:yu,normal_fragment_maps:Cu,normal_pars_fragment:Lu,normal_pars_vertex:Pu,normal_vertex:Du,normalmap_pars_fragment:Iu,clearcoat_normal_fragment_begin:Uu,clearcoat_normal_fragment_maps:Nu,clearcoat_pars_fragment:Fu,iridescence_pars_fragment:Ou,opaque_fragment:Bu,packing:Gu,premultiplied_alpha_fragment:Hu,project_vertex:ku,dithering_fragment:Vu,dithering_pars_fragment:zu,roughnessmap_fragment:Wu,roughnessmap_pars_fragment:Xu,shadowmap_pars_fragment:Ku,shadowmap_pars_vertex:qu,shadowmap_vertex:Yu,shadowmask_pars_fragment:$u,skinbase_vertex:ju,skinning_pars_vertex:Zu,skinning_vertex:Qu,skinnormal_vertex:Ju,specularmap_fragment:ef,specularmap_pars_fragment:tf,tonemapping_fragment:nf,tonemapping_pars_fragment:sf,transmission_fragment:af,transmission_pars_fragment:of,uv_pars_fragment:rf,uv_pars_vertex:cf,uv_vertex:lf,worldpos_vertex:uf,background_vert:ff,background_frag:df,backgroundCube_vert:pf,backgroundCube_frag:hf,cube_vert:mf,cube_frag:_f,depth_vert:gf,depth_frag:vf,distance_vert:xf,distance_frag:Sf,equirect_vert:Mf,equirect_frag:Ef,linedashed_vert:Tf,linedashed_frag:wf,meshbasic_vert:bf,meshbasic_frag:Rf,meshlambert_vert:Af,meshlambert_frag:yf,meshmatcap_vert:Cf,meshmatcap_frag:Lf,meshnormal_vert:Pf,meshnormal_frag:Df,meshphong_vert:If,meshphong_frag:Uf,meshphysical_vert:Nf,meshphysical_frag:Ff,meshtoon_vert:Of,meshtoon_frag:Bf,points_vert:Gf,points_frag:Hf,shadow_vert:kf,shadow_frag:Vf,sprite_vert:zf,sprite_frag:Wf},Se={common:{diffuse:{value:new ue(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new st},alphaMap:{value:null},alphaMapTransform:{value:new st},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new st}},envmap:{envMap:{value:null},envMapRotation:{value:new st},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new st}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new st}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new st},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new st},normalScale:{value:new ut(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new st},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new st}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new st}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new st}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new ue(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new j},probesMax:{value:new j},probesResolution:{value:new j}},points:{diffuse:{value:new ue(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new st},alphaTest:{value:0},uvTransform:{value:new st}},sprite:{diffuse:{value:new ue(16777215)},opacity:{value:1},center:{value:new ut(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new st},alphaMap:{value:null},alphaMapTransform:{value:new st},alphaTest:{value:0}}},on={basic:{uniforms:Xt([Se.common,Se.specularmap,Se.envmap,Se.aomap,Se.lightmap,Se.fog]),vertexShader:et.meshbasic_vert,fragmentShader:et.meshbasic_frag},lambert:{uniforms:Xt([Se.common,Se.specularmap,Se.envmap,Se.aomap,Se.lightmap,Se.emissivemap,Se.bumpmap,Se.normalmap,Se.displacementmap,Se.fog,Se.lights,{emissive:{value:new ue(0)},envMapIntensity:{value:1}}]),vertexShader:et.meshlambert_vert,fragmentShader:et.meshlambert_frag},phong:{uniforms:Xt([Se.common,Se.specularmap,Se.envmap,Se.aomap,Se.lightmap,Se.emissivemap,Se.bumpmap,Se.normalmap,Se.displacementmap,Se.fog,Se.lights,{emissive:{value:new ue(0)},specular:{value:new ue(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:et.meshphong_vert,fragmentShader:et.meshphong_frag},standard:{uniforms:Xt([Se.common,Se.envmap,Se.aomap,Se.lightmap,Se.emissivemap,Se.bumpmap,Se.normalmap,Se.displacementmap,Se.roughnessmap,Se.metalnessmap,Se.fog,Se.lights,{emissive:{value:new ue(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:et.meshphysical_vert,fragmentShader:et.meshphysical_frag},toon:{uniforms:Xt([Se.common,Se.aomap,Se.lightmap,Se.emissivemap,Se.bumpmap,Se.normalmap,Se.displacementmap,Se.gradientmap,Se.fog,Se.lights,{emissive:{value:new ue(0)}}]),vertexShader:et.meshtoon_vert,fragmentShader:et.meshtoon_frag},matcap:{uniforms:Xt([Se.common,Se.bumpmap,Se.normalmap,Se.displacementmap,Se.fog,{matcap:{value:null}}]),vertexShader:et.meshmatcap_vert,fragmentShader:et.meshmatcap_frag},points:{uniforms:Xt([Se.points,Se.fog]),vertexShader:et.points_vert,fragmentShader:et.points_frag},dashed:{uniforms:Xt([Se.common,Se.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:et.linedashed_vert,fragmentShader:et.linedashed_frag},depth:{uniforms:Xt([Se.common,Se.displacementmap]),vertexShader:et.depth_vert,fragmentShader:et.depth_frag},normal:{uniforms:Xt([Se.common,Se.bumpmap,Se.normalmap,Se.displacementmap,{opacity:{value:1}}]),vertexShader:et.meshnormal_vert,fragmentShader:et.meshnormal_frag},sprite:{uniforms:Xt([Se.sprite,Se.fog]),vertexShader:et.sprite_vert,fragmentShader:et.sprite_frag},background:{uniforms:{uvTransform:{value:new st},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:et.background_vert,fragmentShader:et.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new st}},vertexShader:et.backgroundCube_vert,fragmentShader:et.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:et.cube_vert,fragmentShader:et.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:et.equirect_vert,fragmentShader:et.equirect_frag},distance:{uniforms:Xt([Se.common,Se.displacementmap,{referencePosition:{value:new j},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:et.distance_vert,fragmentShader:et.distance_frag},shadow:{uniforms:Xt([Se.lights,Se.fog,{color:{value:new ue(0)},opacity:{value:1}}]),vertexShader:et.shadow_vert,fragmentShader:et.shadow_frag}};on.physical={uniforms:Xt([on.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new st},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new st},clearcoatNormalScale:{value:new ut(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new st},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new st},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new st},sheen:{value:0},sheenColor:{value:new ue(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new st},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new st},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new st},transmissionSamplerSize:{value:new ut},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new st},attenuationDistance:{value:0},attenuationColor:{value:new ue(0)},specularColor:{value:new ue(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new st},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new st},anisotropyVector:{value:new ut},anisotropyMap:{value:null},anisotropyMapTransform:{value:new st}}]),vertexShader:et.meshphysical_vert,fragmentShader:et.meshphysical_frag};const Ei={r:0,b:0,g:0},Xf=new At,Wo=new st;Wo.set(-1,0,0,0,1,0,0,0,1);function Kf(t,n,e,i,a,s){const o=new ue(0);let u=a===!0?0:1,f,r,m=null,_=0,h=null;function v(g){let E=g.isScene===!0?g.background:null;if(E&&E.isTexture){const x=g.backgroundBlurriness>0;E=n.get(E,x)}return E}function p(g){let E=!1;const x=v(g);x===null?c(o,u):x&&x.isColor&&(c(x,1),E=!0);const R=t.xr.getEnvironmentBlendMode();R==="additive"?e.buffers.color.setClear(0,0,0,1,s):R==="alpha-blend"&&e.buffers.color.setClear(0,0,0,0,s),(t.autoClear||E)&&(e.buffers.depth.setTest(!0),e.buffers.depth.setMask(!0),e.buffers.color.setMask(!0),t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil))}function d(g,E){const x=v(E);x&&(x.isCubeTexture||x.mapping===Ii)?(r===void 0&&(r=new U(new ee(1,1,1),new Dt({name:"BackgroundCubeMaterial",uniforms:ps(on.backgroundCube.uniforms),vertexShader:on.backgroundCube.vertexShader,fragmentShader:on.backgroundCube.fragmentShader,side:Gt,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),r.geometry.deleteAttribute("normal"),r.geometry.deleteAttribute("uv"),r.onBeforeRender=function(R,T,w){this.matrixWorld.copyPosition(w.matrixWorld)},Object.defineProperty(r.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(r)),r.material.uniforms.envMap.value=x,r.material.uniforms.backgroundBlurriness.value=E.backgroundBlurriness,r.material.uniforms.backgroundIntensity.value=E.backgroundIntensity,r.material.uniforms.backgroundRotation.value.setFromMatrix4(Xf.makeRotationFromEuler(E.backgroundRotation)).transpose(),x.isCubeTexture&&x.isRenderTargetTexture===!1&&r.material.uniforms.backgroundRotation.value.premultiply(Wo),r.material.toneMapped=vt.getTransfer(x.colorSpace)!==mt,(m!==x||_!==x.version||h!==t.toneMapping)&&(r.material.needsUpdate=!0,m=x,_=x.version,h=t.toneMapping),r.layers.enableAll(),g.unshift(r,r.geometry,r.material,0,0,null)):x&&x.isTexture&&(f===void 0&&(f=new U(new Vt(2,2),new Dt({name:"BackgroundMaterial",uniforms:ps(on.background.uniforms),vertexShader:on.background.vertexShader,fragmentShader:on.background.fragmentShader,side:Vn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),f.geometry.deleteAttribute("normal"),Object.defineProperty(f.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(f)),f.material.uniforms.t2D.value=x,f.material.uniforms.backgroundIntensity.value=E.backgroundIntensity,f.material.toneMapped=vt.getTransfer(x.colorSpace)!==mt,x.matrixAutoUpdate===!0&&x.updateMatrix(),f.material.uniforms.uvTransform.value.copy(x.matrix),(m!==x||_!==x.version||h!==t.toneMapping)&&(f.material.needsUpdate=!0,m=x,_=x.version,h=t.toneMapping),f.layers.enableAll(),g.unshift(f,f.geometry,f.material,0,0,null))}function c(g,E){g.getRGB(Ei,Uo(t)),e.buffers.color.setClear(Ei.r,Ei.g,Ei.b,E,s)}function l(){r!==void 0&&(r.geometry.dispose(),r.material.dispose(),r=void 0),f!==void 0&&(f.geometry.dispose(),f.material.dispose(),f=void 0)}return{getClearColor:function(){return o},setClearColor:function(g,E=1){o.set(g),u=E,c(o,u)},getClearAlpha:function(){return u},setClearAlpha:function(g){u=g,c(o,u)},render:p,addToRenderList:d,dispose:l}}function qf(t,n){const e=t.getParameter(t.MAX_VERTEX_ATTRIBS),i={},a=h(null);let s=a,o=!1;function u(L,P,F,k,G){let O=!1;const B=_(L,k,F,P);s!==B&&(s=B,r(s.object)),O=v(L,k,F,G),O&&p(L,k,F,G),G!==null&&n.update(G,t.ELEMENT_ARRAY_BUFFER),(O||o)&&(o=!1,x(L,P,F,k),G!==null&&t.bindBuffer(t.ELEMENT_ARRAY_BUFFER,n.get(G).buffer))}function f(){return t.createVertexArray()}function r(L){return t.bindVertexArray(L)}function m(L){return t.deleteVertexArray(L)}function _(L,P,F,k){const G=k.wireframe===!0;let O=i[P.id];O===void 0&&(O={},i[P.id]=O);const B=L.isInstancedMesh===!0?L.id:0;let J=O[B];J===void 0&&(J={},O[B]=J);let fe=J[F.id];fe===void 0&&(fe={},J[F.id]=fe);let xe=fe[G];return xe===void 0&&(xe=h(f()),fe[G]=xe),xe}function h(L){const P=[],F=[],k=[];for(let G=0;G<e;G++)P[G]=0,F[G]=0,k[G]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:P,enabledAttributes:F,attributeDivisors:k,object:L,attributes:{},index:null}}function v(L,P,F,k){const G=s.attributes,O=P.attributes;let B=0;const J=F.getAttributes();for(const fe in J)if(J[fe].location>=0){const Oe=G[fe];let Ie=O[fe];if(Ie===void 0&&(fe==="instanceMatrix"&&L.instanceMatrix&&(Ie=L.instanceMatrix),fe==="instanceColor"&&L.instanceColor&&(Ie=L.instanceColor)),Oe===void 0||Oe.attribute!==Ie||Ie&&Oe.data!==Ie.data)return!0;B++}return s.attributesNum!==B||s.index!==k}function p(L,P,F,k){const G={},O=P.attributes;let B=0;const J=F.getAttributes();for(const fe in J)if(J[fe].location>=0){let Oe=O[fe];Oe===void 0&&(fe==="instanceMatrix"&&L.instanceMatrix&&(Oe=L.instanceMatrix),fe==="instanceColor"&&L.instanceColor&&(Oe=L.instanceColor));const Ie={};Ie.attribute=Oe,Oe&&Oe.data&&(Ie.data=Oe.data),G[fe]=Ie,B++}s.attributes=G,s.attributesNum=B,s.index=k}function d(){const L=s.newAttributes;for(let P=0,F=L.length;P<F;P++)L[P]=0}function c(L){l(L,0)}function l(L,P){const F=s.newAttributes,k=s.enabledAttributes,G=s.attributeDivisors;F[L]=1,k[L]===0&&(t.enableVertexAttribArray(L),k[L]=1),G[L]!==P&&(t.vertexAttribDivisor(L,P),G[L]=P)}function g(){const L=s.newAttributes,P=s.enabledAttributes;for(let F=0,k=P.length;F<k;F++)P[F]!==L[F]&&(t.disableVertexAttribArray(F),P[F]=0)}function E(L,P,F,k,G,O,B){B===!0?t.vertexAttribIPointer(L,P,F,G,O):t.vertexAttribPointer(L,P,F,k,G,O)}function x(L,P,F,k){d();const G=k.attributes,O=F.getAttributes(),B=P.defaultAttributeValues;for(const J in O){const fe=O[J];if(fe.location>=0){let xe=G[J];if(xe===void 0&&(J==="instanceMatrix"&&L.instanceMatrix&&(xe=L.instanceMatrix),J==="instanceColor"&&L.instanceColor&&(xe=L.instanceColor)),xe!==void 0){const Oe=xe.normalized,Ie=xe.itemSize,it=n.get(xe);if(it===void 0)continue;const Ke=it.buffer,We=it.type,Z=it.bytesPerElement,ve=We===t.INT||We===t.UNSIGNED_INT||xe.gpuType===Do;if(xe.isInterleavedBufferAttribute){const le=xe.data,Be=le.stride,Xe=xe.offset;if(le.isInstancedInterleavedBuffer){for(let Re=0;Re<fe.locationSize;Re++)l(fe.location+Re,le.meshPerAttribute);L.isInstancedMesh!==!0&&k._maxInstanceCount===void 0&&(k._maxInstanceCount=le.meshPerAttribute*le.count)}else for(let Re=0;Re<fe.locationSize;Re++)c(fe.location+Re);t.bindBuffer(t.ARRAY_BUFFER,Ke);for(let Re=0;Re<fe.locationSize;Re++)E(fe.location+Re,Ie/fe.locationSize,We,Oe,Be*Z,(Xe+Ie/fe.locationSize*Re)*Z,ve)}else{if(xe.isInstancedBufferAttribute){for(let le=0;le<fe.locationSize;le++)l(fe.location+le,xe.meshPerAttribute);L.isInstancedMesh!==!0&&k._maxInstanceCount===void 0&&(k._maxInstanceCount=xe.meshPerAttribute*xe.count)}else for(let le=0;le<fe.locationSize;le++)c(fe.location+le);t.bindBuffer(t.ARRAY_BUFFER,Ke);for(let le=0;le<fe.locationSize;le++)E(fe.location+le,Ie/fe.locationSize,We,Oe,Ie*Z,Ie/fe.locationSize*le*Z,ve)}}else if(B!==void 0){const Oe=B[J];if(Oe!==void 0)switch(Oe.length){case 2:t.vertexAttrib2fv(fe.location,Oe);break;case 3:t.vertexAttrib3fv(fe.location,Oe);break;case 4:t.vertexAttrib4fv(fe.location,Oe);break;default:t.vertexAttrib1fv(fe.location,Oe)}}}}g()}function R(){A();for(const L in i){const P=i[L];for(const F in P){const k=P[F];for(const G in k){const O=k[G];for(const B in O)m(O[B].object),delete O[B];delete k[G]}}delete i[L]}}function T(L){if(i[L.id]===void 0)return;const P=i[L.id];for(const F in P){const k=P[F];for(const G in k){const O=k[G];for(const B in O)m(O[B].object),delete O[B];delete k[G]}}delete i[L.id]}function w(L){for(const P in i){const F=i[P];for(const k in F){const G=F[k];if(G[L.id]===void 0)continue;const O=G[L.id];for(const B in O)m(O[B].object),delete O[B];delete G[L.id]}}}function S(L){for(const P in i){const F=i[P],k=L.isInstancedMesh===!0?L.id:0,G=F[k];if(G!==void 0){for(const O in G){const B=G[O];for(const J in B)m(B[J].object),delete B[J];delete G[O]}delete F[k],Object.keys(F).length===0&&delete i[P]}}}function A(){C(),o=!0,s!==a&&(s=a,r(s.object))}function C(){a.geometry=null,a.program=null,a.wireframe=!1}return{setup:u,reset:A,resetDefaultState:C,dispose:R,releaseStatesOfGeometry:T,releaseStatesOfObject:S,releaseStatesOfProgram:w,initAttributes:d,enableAttribute:c,disableUnusedAttributes:g}}function Yf(t,n,e){let i;function a(f){i=f}function s(f,r){t.drawArrays(i,f,r),e.update(r,i,1)}function o(f,r,m){m!==0&&(t.drawArraysInstanced(i,f,r,m),e.update(r,i,m))}function u(f,r,m){if(m===0)return;n.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,f,0,r,0,m);let h=0;for(let v=0;v<m;v++)h+=r[v];e.update(h,i,1)}this.setMode=a,this.render=s,this.renderInstances=o,this.renderMultiDraw=u}function $f(t,n,e,i){let a;function s(){if(a!==void 0)return a;if(n.has("EXT_texture_filter_anisotropic")===!0){const w=n.get("EXT_texture_filter_anisotropic");a=t.getParameter(w.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else a=0;return a}function o(w){return!(w!==hn&&i.convert(w)!==t.getParameter(t.IMPLEMENTATION_COLOR_READ_FORMAT))}function u(w){const S=w===qt&&(n.has("EXT_color_buffer_half_float")||n.has("EXT_color_buffer_float"));return!(w!==rn&&i.convert(w)!==t.getParameter(t.IMPLEMENTATION_COLOR_READ_TYPE)&&w!==bn&&!S)}function f(w){if(w==="highp"){if(t.getShaderPrecisionFormat(t.VERTEX_SHADER,t.HIGH_FLOAT).precision>0&&t.getShaderPrecisionFormat(t.FRAGMENT_SHADER,t.HIGH_FLOAT).precision>0)return"highp";w="mediump"}return w==="mediump"&&t.getShaderPrecisionFormat(t.VERTEX_SHADER,t.MEDIUM_FLOAT).precision>0&&t.getShaderPrecisionFormat(t.FRAGMENT_SHADER,t.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let r=e.precision!==void 0?e.precision:"highp";const m=f(r);m!==r&&(rt("WebGLRenderer:",r,"not supported, using",m,"instead."),r=m);const _=e.logarithmicDepthBuffer===!0,h=e.reversedDepthBuffer===!0&&n.has("EXT_clip_control");e.reversedDepthBuffer===!0&&h===!1&&rt("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");const v=t.getParameter(t.MAX_TEXTURE_IMAGE_UNITS),p=t.getParameter(t.MAX_VERTEX_TEXTURE_IMAGE_UNITS),d=t.getParameter(t.MAX_TEXTURE_SIZE),c=t.getParameter(t.MAX_CUBE_MAP_TEXTURE_SIZE),l=t.getParameter(t.MAX_VERTEX_ATTRIBS),g=t.getParameter(t.MAX_VERTEX_UNIFORM_VECTORS),E=t.getParameter(t.MAX_VARYING_VECTORS),x=t.getParameter(t.MAX_FRAGMENT_UNIFORM_VECTORS),R=t.getParameter(t.MAX_SAMPLES),T=t.getParameter(t.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:f,textureFormatReadable:o,textureTypeReadable:u,precision:r,logarithmicDepthBuffer:_,reversedDepthBuffer:h,maxTextures:v,maxVertexTextures:p,maxTextureSize:d,maxCubemapSize:c,maxAttributes:l,maxVertexUniforms:g,maxVaryings:E,maxFragmentUniforms:x,maxSamples:R,samples:T}}function jf(t){const n=this;let e=null,i=0,a=!1,s=!1;const o=new bo,u=new st,f={value:null,needsUpdate:!1};this.uniform=f,this.numPlanes=0,this.numIntersection=0,this.init=function(_,h){const v=_.length!==0||h||i!==0||a;return a=h,i=_.length,v},this.beginShadows=function(){s=!0,m(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(_,h){e=m(_,h,0)},this.setState=function(_,h,v){const p=_.clippingPlanes,d=_.clipIntersection,c=_.clipShadows,l=t.get(_);if(!a||p===null||p.length===0||s&&!c)s?m(null):r();else{const g=s?0:i,E=g*4;let x=l.clippingState||null;f.value=x,x=m(p,h,E,v);for(let R=0;R!==E;++R)x[R]=e[R];l.clippingState=x,this.numIntersection=d?this.numPlanes:0,this.numPlanes+=g}};function r(){f.value!==e&&(f.value=e,f.needsUpdate=i>0),n.numPlanes=i,n.numIntersection=0}function m(_,h,v,p){const d=_!==null?_.length:0;let c=null;if(d!==0){if(c=f.value,p!==!0||c===null){const l=v+d*4,g=h.matrixWorldInverse;u.getNormalMatrix(g),(c===null||c.length<l)&&(c=new Float32Array(l));for(let E=0,x=v;E!==d;++E,x+=4)o.copy(_[E]).applyMatrix4(g,u),o.normal.toArray(c,x),c[x+3]=o.constant}f.value=c,f.needsUpdate=!0}return n.numPlanes=d,n.numIntersection=0,c}}const Rn=4,Na=[.125,.215,.35,.446,.526,.582],Dn=20,Zf=256,ei=new Di,Fa=new ue;let Zi=null,Qi=0,Ji=0,es=!1;const Qf=new j;class vs{constructor(n){this._renderer=n,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(n,e=0,i=.1,a=100,s={}){const{size:o=256,position:u=Qf}=s;Zi=this._renderer.getRenderTarget(),Qi=this._renderer.getActiveCubeFace(),Ji=this._renderer.getActiveMipmapLevel(),es=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(o);const f=this._allocateTargets();return f.depthBuffer=!0,this._sceneToCubeUV(n,i,a,f,u),e>0&&this._blur(f,0,0,e),this._applyPMREM(f),this._cleanup(f),f}fromEquirectangular(n,e=null){return this._fromTexture(n,e)}fromCubemap(n,e=null){return this._fromTexture(n,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Ga(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Ba(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(n){this._lodMax=Math.floor(Math.log2(n)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let n=0;n<this._lodMeshes.length;n++)this._lodMeshes[n].geometry.dispose()}_cleanup(n){this._renderer.setRenderTarget(Zi,Qi,Ji),this._renderer.xr.enabled=es,n.scissorTest=!1,Bn(n,0,0,n.width,n.height)}_fromTexture(n,e){n.mapping===ui||n.mapping===zn?this._setSize(n.image.length===0?16:n.image[0].width||n.image[0].image.width):this._setSize(n.image.width/4),Zi=this._renderer.getRenderTarget(),Qi=this._renderer.getActiveCubeFace(),Ji=this._renderer.getActiveMipmapLevel(),es=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=e||this._allocateTargets();return this._textureToCubeUV(n,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const n=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,i={magFilter:Bt,minFilter:Bt,generateMipmaps:!1,type:qt,format:hn,colorSpace:Jt,depthBuffer:!1},a=Oa(n,e,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==n||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Oa(n,e,i);const{_lodMax:s}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=Jf(s)),this._blurMaterial=td(s,n,e),this._ggxMaterial=ed(s,n,e)}return a}_compileMaterial(n){const e=new U(new vn,n);this._renderer.compile(e,ei)}_sceneToCubeUV(n,e,i,a,s){const f=new Hn(90,1,e,i),r=[1,-1,1,1,1,1],m=[1,1,1,-1,-1,-1],_=this._renderer,h=_.autoClear,v=_.toneMapping;_.getClearColor(Fa),_.toneMapping=ln,_.autoClear=!1,_.state.buffers.depth.getReversed()&&(_.setRenderTarget(a),_.clearDepth(),_.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new U(new ee,new xt({name:"PMREM.Background",side:Gt,depthWrite:!1,depthTest:!1})));const d=this._backgroundBox,c=d.material;let l=!1;const g=n.background;g?g.isColor&&(c.color.copy(g),n.background=null,l=!0):(c.color.copy(Fa),l=!0);for(let E=0;E<6;E++){const x=E%3;x===0?(f.up.set(0,r[E],0),f.position.set(s.x,s.y,s.z),f.lookAt(s.x+m[E],s.y,s.z)):x===1?(f.up.set(0,0,r[E]),f.position.set(s.x,s.y,s.z),f.lookAt(s.x,s.y+m[E],s.z)):(f.up.set(0,r[E],0),f.position.set(s.x,s.y,s.z),f.lookAt(s.x,s.y,s.z+m[E]));const R=this._cubeSize;Bn(a,x*R,E>2?R:0,R,R),_.setRenderTarget(a),l&&_.render(d,f),_.render(n,f)}_.toneMapping=v,_.autoClear=h,n.background=g}_textureToCubeUV(n,e){const i=this._renderer,a=n.mapping===ui||n.mapping===zn;a?(this._cubemapMaterial===null&&(this._cubemapMaterial=Ga()),this._cubemapMaterial.uniforms.flipEnvMap.value=n.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Ba());const s=a?this._cubemapMaterial:this._equirectMaterial,o=this._lodMeshes[0];o.material=s;const u=s.uniforms;u.envMap.value=n;const f=this._cubeSize;Bn(e,0,0,3*f,2*f),i.setRenderTarget(e),i.render(o,ei)}_applyPMREM(n){const e=this._renderer,i=e.autoClear;e.autoClear=!1;const a=this._lodMeshes.length;for(let s=1;s<a;s++)this._applyGGXFilter(n,s-1,s);e.autoClear=i}_applyGGXFilter(n,e,i){const a=this._renderer,s=this._pingPongRenderTarget,o=this._ggxMaterial,u=this._lodMeshes[i];u.material=o;const f=o.uniforms,r=i/(this._lodMeshes.length-1),m=e/(this._lodMeshes.length-1),_=Math.sqrt(r*r-m*m),h=0+r*1.25,v=_*h,{_lodMax:p}=this,d=this._sizeLods[i],c=3*d*(i>p-Rn?i-p+Rn:0),l=4*(this._cubeSize-d);f.envMap.value=n.texture,f.roughness.value=v,f.mipInt.value=p-e,Bn(s,c,l,3*d,2*d),a.setRenderTarget(s),a.render(u,ei),f.envMap.value=s.texture,f.roughness.value=0,f.mipInt.value=p-i,Bn(n,c,l,3*d,2*d),a.setRenderTarget(n),a.render(u,ei)}_blur(n,e,i,a,s){const o=this._pingPongRenderTarget;this._halfBlur(n,o,e,i,a,"latitudinal",s),this._halfBlur(o,n,i,i,a,"longitudinal",s)}_halfBlur(n,e,i,a,s,o,u){const f=this._renderer,r=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&gt("blur direction must be either latitudinal or longitudinal!");const m=3,_=this._lodMeshes[a];_.material=r;const h=r.uniforms,v=this._sizeLods[i]-1,p=isFinite(s)?Math.PI/(2*v):2*Math.PI/(2*Dn-1),d=s/p,c=isFinite(s)?1+Math.floor(m*d):Dn;c>Dn&&rt(`sigmaRadians, ${s}, is too large and will clip, as it requested ${c} samples when the maximum is set to ${Dn}`);const l=[];let g=0;for(let w=0;w<Dn;++w){const S=w/d,A=Math.exp(-S*S/2);l.push(A),w===0?g+=A:w<c&&(g+=2*A)}for(let w=0;w<l.length;w++)l[w]=l[w]/g;h.envMap.value=n.texture,h.samples.value=c,h.weights.value=l,h.latitudinal.value=o==="latitudinal",u&&(h.poleAxis.value=u);const{_lodMax:E}=this;h.dTheta.value=p,h.mipInt.value=E-i;const x=this._sizeLods[a],R=3*x*(a>E-Rn?a-E+Rn:0),T=4*(this._cubeSize-x);Bn(e,R,T,3*x,2*x),f.setRenderTarget(e),f.render(_,ei)}}function Jf(t){const n=[],e=[],i=[];let a=t;const s=t-Rn+1+Na.length;for(let o=0;o<s;o++){const u=Math.pow(2,a);n.push(u);let f=1/u;o>t-Rn?f=Na[o-t+Rn-1]:o===0&&(f=0),e.push(f);const r=1/(u-2),m=-r,_=1+r,h=[m,m,_,m,_,_,m,m,_,_,m,_],v=6,p=6,d=3,c=2,l=1,g=new Float32Array(d*p*v),E=new Float32Array(c*p*v),x=new Float32Array(l*p*v);for(let T=0;T<v;T++){const w=T%3*2/3-1,S=T>2?0:-1,A=[w,S,0,w+2/3,S,0,w+2/3,S+1,0,w,S,0,w+2/3,S+1,0,w,S+1,0];g.set(A,d*p*T),E.set(h,c*p*T);const C=[T,T,T,T,T,T];x.set(C,l*p*T)}const R=new vn;R.setAttribute("position",new kt(g,d)),R.setAttribute("uv",new kt(E,c)),R.setAttribute("faceIndex",new kt(x,l)),i.push(new U(R,null)),a>Rn&&a--}return{lodMeshes:i,sizeLods:n,sigmas:e}}function Oa(t,n,e){const i=new zt(t,n,e);return i.texture.mapping=Ii,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function Bn(t,n,e,i,a){t.viewport.set(n,e,i,a),t.scissor.set(n,e,i,a)}function ed(t,n,e){return new Dt({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:Zf,CUBEUV_TEXEL_WIDTH:1/n,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${t}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:Ni(),fragmentShader:`

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
		`,blending:un,depthTest:!1,depthWrite:!1})}function td(t,n,e){const i=new Float32Array(Dn),a=new j(0,1,0);return new Dt({name:"SphericalGaussianBlur",defines:{n:Dn,CUBEUV_TEXEL_WIDTH:1/n,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${t}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:a}},vertexShader:Ni(),fragmentShader:`

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
		`,blending:un,depthTest:!1,depthWrite:!1})}function Ba(){return new Dt({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Ni(),fragmentShader:`

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
		`,blending:un,depthTest:!1,depthWrite:!1})}function Ga(){return new Dt({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Ni(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:un,depthTest:!1,depthWrite:!1})}function Ni(){return`

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
	`}class Xo extends zt{constructor(n=1,e={}){super(n,n,e),this.isWebGLCubeRenderTarget=!0;const i={width:n,height:n,depth:1},a=[i,i,i,i,i,i];this.texture=new No(a),this._setTextureOptions(e),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(n,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},a=new ee(5,5,5),s=new Dt({name:"CubemapFromEquirect",uniforms:ps(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:Gt,blending:un});s.uniforms.tEquirect.value=e;const o=new U(a,s),u=e.minFilter;return e.minFilter===pn&&(e.minFilter=Bt),new vc(1,10,this).update(n,o),e.minFilter=u,o.geometry.dispose(),o.material.dispose(),this}clear(n,e=!0,i=!0,a=!0){const s=n.getRenderTarget();for(let o=0;o<6;o++)n.setRenderTarget(this,o),n.clear(e,i,a);n.setRenderTarget(s)}}function nd(t){let n=new WeakMap,e=new WeakMap,i=null;function a(h,v=!1){return h==null?null:v?o(h):s(h)}function s(h){if(h&&h.isTexture){const v=h.mapping;if(v===Ki||v===qi)if(n.has(h)){const p=n.get(h).texture;return u(p,h.mapping)}else{const p=h.image;if(p&&p.height>0){const d=new Xo(p.height);return d.fromEquirectangularTexture(t,h),n.set(h,d),h.addEventListener("dispose",r),u(d.texture,h.mapping)}else return null}}return h}function o(h){if(h&&h.isTexture){const v=h.mapping,p=v===Ki||v===qi,d=v===ui||v===zn;if(p||d){let c=e.get(h);const l=c!==void 0?c.texture.pmremVersion:0;if(h.isRenderTargetTexture&&h.pmremVersion!==l)return i===null&&(i=new vs(t)),c=p?i.fromEquirectangular(h,c):i.fromCubemap(h,c),c.texture.pmremVersion=h.pmremVersion,e.set(h,c),c.texture;if(c!==void 0)return c.texture;{const g=h.image;return p&&g&&g.height>0||d&&g&&f(g)?(i===null&&(i=new vs(t)),c=p?i.fromEquirectangular(h):i.fromCubemap(h),c.texture.pmremVersion=h.pmremVersion,e.set(h,c),h.addEventListener("dispose",m),c.texture):null}}}return h}function u(h,v){return v===Ki?h.mapping=ui:v===qi&&(h.mapping=zn),h}function f(h){let v=0;const p=6;for(let d=0;d<p;d++)h[d]!==void 0&&v++;return v===p}function r(h){const v=h.target;v.removeEventListener("dispose",r);const p=n.get(v);p!==void 0&&(n.delete(v),p.dispose())}function m(h){const v=h.target;v.removeEventListener("dispose",m);const p=e.get(v);p!==void 0&&(e.delete(v),p.dispose())}function _(){n=new WeakMap,e=new WeakMap,i!==null&&(i.dispose(),i=null)}return{get:a,dispose:_}}function id(t){const n={};function e(i){if(n[i]!==void 0)return n[i];const a=t.getExtension(i);return n[i]=a,a}return{has:function(i){return e(i)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(i){const a=e(i);return a===null&&Rr("WebGLRenderer: "+i+" extension not supported."),a}}}function sd(t,n,e,i){const a={},s=new WeakMap;function o(_){const h=_.target;h.index!==null&&n.remove(h.index);for(const p in h.attributes)n.remove(h.attributes[p]);h.removeEventListener("dispose",o),delete a[h.id];const v=s.get(h);v&&(n.remove(v),s.delete(h)),i.releaseStatesOfGeometry(h),h.isInstancedBufferGeometry===!0&&delete h._maxInstanceCount,e.memory.geometries--}function u(_,h){return a[h.id]===!0||(h.addEventListener("dispose",o),a[h.id]=!0,e.memory.geometries++),h}function f(_){const h=_.attributes;for(const v in h)n.update(h[v],t.ARRAY_BUFFER)}function r(_){const h=[],v=_.index,p=_.attributes.position;let d=0;if(p===void 0)return;if(v!==null){const g=v.array;d=v.version;for(let E=0,x=g.length;E<x;E+=3){const R=g[E+0],T=g[E+1],w=g[E+2];h.push(R,T,T,w,w,R)}}else{const g=p.array;d=p.version;for(let E=0,x=g.length/3-1;E<x;E+=3){const R=E+0,T=E+1,w=E+2;h.push(R,T,T,w,w,R)}}const c=new(p.count>=65535?xc:Sc)(h,1);c.version=d;const l=s.get(_);l&&n.remove(l),s.set(_,c)}function m(_){const h=s.get(_);if(h){const v=_.index;v!==null&&h.version<v.version&&r(_)}else r(_);return s.get(_)}return{get:u,update:f,getWireframeAttribute:m}}function ad(t,n,e){let i;function a(_){i=_}let s,o;function u(_){s=_.type,o=_.bytesPerElement}function f(_,h){t.drawElements(i,h,s,_*o),e.update(h,i,1)}function r(_,h,v){v!==0&&(t.drawElementsInstanced(i,h,s,_*o,v),e.update(h,i,v))}function m(_,h,v){if(v===0)return;n.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,h,0,s,_,0,v);let d=0;for(let c=0;c<v;c++)d+=h[c];e.update(d,i,1)}this.setMode=a,this.setIndex=u,this.render=f,this.renderInstances=r,this.renderMultiDraw=m}function od(t){const n={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function i(s,o,u){switch(e.calls++,o){case t.TRIANGLES:e.triangles+=u*(s/3);break;case t.LINES:e.lines+=u*(s/2);break;case t.LINE_STRIP:e.lines+=u*(s-1);break;case t.LINE_LOOP:e.lines+=u*s;break;case t.POINTS:e.points+=u*s;break;default:gt("WebGLInfo: Unknown draw mode:",o);break}}function a(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:n,render:e,programs:null,autoReset:!0,reset:a,update:i}}function rd(t,n,e){const i=new WeakMap,a=new Ot;function s(o,u,f){const r=o.morphTargetInfluences,m=u.morphAttributes.position||u.morphAttributes.normal||u.morphAttributes.color,_=m!==void 0?m.length:0;let h=i.get(u);if(h===void 0||h.count!==_){let A=function(){w.dispose(),i.delete(u),u.removeEventListener("dispose",A)};h!==void 0&&h.texture.dispose();const v=u.morphAttributes.position!==void 0,p=u.morphAttributes.normal!==void 0,d=u.morphAttributes.color!==void 0,c=u.morphAttributes.position||[],l=u.morphAttributes.normal||[],g=u.morphAttributes.color||[];let E=0;v===!0&&(E=1),p===!0&&(E=2),d===!0&&(E=3);let x=u.attributes.position.count*E,R=1;x>n.maxTextureSize&&(R=Math.ceil(x/n.maxTextureSize),x=n.maxTextureSize);const T=new Float32Array(x*R*4*_),w=new Io(T,x,R,_);w.type=bn,w.needsUpdate=!0;const S=E*4;for(let C=0;C<_;C++){const L=c[C],P=l[C],F=g[C],k=x*R*4*C;for(let G=0;G<L.count;G++){const O=G*S;v===!0&&(a.fromBufferAttribute(L,G),T[k+O+0]=a.x,T[k+O+1]=a.y,T[k+O+2]=a.z,T[k+O+3]=0),p===!0&&(a.fromBufferAttribute(P,G),T[k+O+4]=a.x,T[k+O+5]=a.y,T[k+O+6]=a.z,T[k+O+7]=0),d===!0&&(a.fromBufferAttribute(F,G),T[k+O+8]=a.x,T[k+O+9]=a.y,T[k+O+10]=a.z,T[k+O+11]=F.itemSize===4?a.w:1)}}h={count:_,texture:w,size:new ut(x,R)},i.set(u,h),u.addEventListener("dispose",A)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)f.getUniforms().setValue(t,"morphTexture",o.morphTexture,e);else{let v=0;for(let d=0;d<r.length;d++)v+=r[d];const p=u.morphTargetsRelative?1:1-v;f.getUniforms().setValue(t,"morphTargetBaseInfluence",p),f.getUniforms().setValue(t,"morphTargetInfluences",r)}f.getUniforms().setValue(t,"morphTargetsTexture",h.texture,e),f.getUniforms().setValue(t,"morphTargetsTextureSize",h.size)}return{update:s}}function cd(t,n,e,i,a){let s=new WeakMap;function o(r){const m=a.render.frame,_=r.geometry,h=n.get(r,_);if(s.get(h)!==m&&(n.update(h),s.set(h,m)),r.isInstancedMesh&&(r.hasEventListener("dispose",f)===!1&&r.addEventListener("dispose",f),s.get(r)!==m&&(e.update(r.instanceMatrix,t.ARRAY_BUFFER),r.instanceColor!==null&&e.update(r.instanceColor,t.ARRAY_BUFFER),s.set(r,m))),r.isSkinnedMesh){const v=r.skeleton;s.get(v)!==m&&(v.update(),s.set(v,m))}return h}function u(){s=new WeakMap}function f(r){const m=r.target;m.removeEventListener("dispose",f),i.releaseStatesOfObject(m),e.remove(m.instanceMatrix),m.instanceColor!==null&&e.remove(m.instanceColor)}return{update:o,dispose:u}}const ld={[Ds]:"LINEAR_TONE_MAPPING",[Ps]:"REINHARD_TONE_MAPPING",[Ls]:"CINEON_TONE_MAPPING",[Ui]:"ACES_FILMIC_TONE_MAPPING",[Cs]:"AGX_TONE_MAPPING",[ys]:"NEUTRAL_TONE_MAPPING",[As]:"CUSTOM_TONE_MAPPING"};function ud(t,n,e,i,a){const s=new zt(n,e,{type:t,depthBuffer:i,stencilBuffer:a,depthTexture:i?new fi(n,e):void 0}),o=new zt(n,e,{type:qt,depthBuffer:!1,stencilBuffer:!1}),u=new vn;u.setAttribute("position",new Wn([-1,3,0,-1,-1,0,3,-1,0],3)),u.setAttribute("uv",new Wn([0,2,0,0,2,0],2));const f=new Eo({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),r=new U(u,f),m=new Di(-1,1,1,-1,0,1);let _=null,h=null,v=!1,p,d=null,c=[],l=!1;this.setSize=function(g,E){s.setSize(g,E),o.setSize(g,E);for(let x=0;x<c.length;x++){const R=c[x];R.setSize&&R.setSize(g,E)}},this.setEffects=function(g){c=g,l=c.length>0&&c[0].isRenderPass===!0;const E=s.width,x=s.height;for(let R=0;R<c.length;R++){const T=c[R];T.setSize&&T.setSize(E,x)}},this.begin=function(g,E){if(v||g.toneMapping===ln&&c.length===0)return!1;if(d=E,E!==null){const x=E.width,R=E.height;(s.width!==x||s.height!==R)&&this.setSize(x,R)}return l===!1&&g.setRenderTarget(s),p=g.toneMapping,g.toneMapping=ln,!0},this.hasRenderPass=function(){return l},this.end=function(g,E){g.toneMapping=p,v=!0;let x=s,R=o;for(let T=0;T<c.length;T++){const w=c[T];if(w.enabled!==!1&&(w.render(g,R,x,E),w.needsSwap!==!1)){const S=x;x=R,R=S}}if(_!==g.outputColorSpace||h!==g.toneMapping){_=g.outputColorSpace,h=g.toneMapping,f.defines={},vt.getTransfer(_)===mt&&(f.defines.SRGB_TRANSFER="");const T=ld[h];T&&(f.defines[T]=""),f.needsUpdate=!0}f.uniforms.tDiffuse.value=x.texture,g.setRenderTarget(d),g.render(r,m),d=null,v=!1},this.isCompositing=function(){return v},this.dispose=function(){s.depthTexture&&s.depthTexture.dispose(),s.dispose(),o.dispose(),u.dispose(),f.dispose()}}const Ko=new hs,xs=new fi(1,1),qo=new Io,Yo=new Ec,$o=new No,Ha=[],ka=[],Va=new Float32Array(16),za=new Float32Array(9),Wa=new Float32Array(4);function jn(t,n,e){const i=t[0];if(i<=0||i>0)return t;const a=n*e;let s=Ha[a];if(s===void 0&&(s=new Float32Array(a),Ha[a]=s),n!==0){i.toArray(s,0);for(let o=1,u=0;o!==n;++o)u+=e,t[o].toArray(s,u)}return s}function Lt(t,n){if(t.length!==n.length)return!1;for(let e=0,i=t.length;e<i;e++)if(t[e]!==n[e])return!1;return!0}function Pt(t,n){for(let e=0,i=n.length;e<i;e++)t[e]=n[e]}function Fi(t,n){let e=ka[n];e===void 0&&(e=new Int32Array(n),ka[n]=e);for(let i=0;i!==n;++i)e[i]=t.allocateTextureUnit();return e}function fd(t,n){const e=this.cache;e[0]!==n&&(t.uniform1f(this.addr,n),e[0]=n)}function dd(t,n){const e=this.cache;if(n.x!==void 0)(e[0]!==n.x||e[1]!==n.y)&&(t.uniform2f(this.addr,n.x,n.y),e[0]=n.x,e[1]=n.y);else{if(Lt(e,n))return;t.uniform2fv(this.addr,n),Pt(e,n)}}function pd(t,n){const e=this.cache;if(n.x!==void 0)(e[0]!==n.x||e[1]!==n.y||e[2]!==n.z)&&(t.uniform3f(this.addr,n.x,n.y,n.z),e[0]=n.x,e[1]=n.y,e[2]=n.z);else if(n.r!==void 0)(e[0]!==n.r||e[1]!==n.g||e[2]!==n.b)&&(t.uniform3f(this.addr,n.r,n.g,n.b),e[0]=n.r,e[1]=n.g,e[2]=n.b);else{if(Lt(e,n))return;t.uniform3fv(this.addr,n),Pt(e,n)}}function hd(t,n){const e=this.cache;if(n.x!==void 0)(e[0]!==n.x||e[1]!==n.y||e[2]!==n.z||e[3]!==n.w)&&(t.uniform4f(this.addr,n.x,n.y,n.z,n.w),e[0]=n.x,e[1]=n.y,e[2]=n.z,e[3]=n.w);else{if(Lt(e,n))return;t.uniform4fv(this.addr,n),Pt(e,n)}}function md(t,n){const e=this.cache,i=n.elements;if(i===void 0){if(Lt(e,n))return;t.uniformMatrix2fv(this.addr,!1,n),Pt(e,n)}else{if(Lt(e,i))return;Wa.set(i),t.uniformMatrix2fv(this.addr,!1,Wa),Pt(e,i)}}function _d(t,n){const e=this.cache,i=n.elements;if(i===void 0){if(Lt(e,n))return;t.uniformMatrix3fv(this.addr,!1,n),Pt(e,n)}else{if(Lt(e,i))return;za.set(i),t.uniformMatrix3fv(this.addr,!1,za),Pt(e,i)}}function gd(t,n){const e=this.cache,i=n.elements;if(i===void 0){if(Lt(e,n))return;t.uniformMatrix4fv(this.addr,!1,n),Pt(e,n)}else{if(Lt(e,i))return;Va.set(i),t.uniformMatrix4fv(this.addr,!1,Va),Pt(e,i)}}function vd(t,n){const e=this.cache;e[0]!==n&&(t.uniform1i(this.addr,n),e[0]=n)}function xd(t,n){const e=this.cache;if(n.x!==void 0)(e[0]!==n.x||e[1]!==n.y)&&(t.uniform2i(this.addr,n.x,n.y),e[0]=n.x,e[1]=n.y);else{if(Lt(e,n))return;t.uniform2iv(this.addr,n),Pt(e,n)}}function Sd(t,n){const e=this.cache;if(n.x!==void 0)(e[0]!==n.x||e[1]!==n.y||e[2]!==n.z)&&(t.uniform3i(this.addr,n.x,n.y,n.z),e[0]=n.x,e[1]=n.y,e[2]=n.z);else{if(Lt(e,n))return;t.uniform3iv(this.addr,n),Pt(e,n)}}function Md(t,n){const e=this.cache;if(n.x!==void 0)(e[0]!==n.x||e[1]!==n.y||e[2]!==n.z||e[3]!==n.w)&&(t.uniform4i(this.addr,n.x,n.y,n.z,n.w),e[0]=n.x,e[1]=n.y,e[2]=n.z,e[3]=n.w);else{if(Lt(e,n))return;t.uniform4iv(this.addr,n),Pt(e,n)}}function Ed(t,n){const e=this.cache;e[0]!==n&&(t.uniform1ui(this.addr,n),e[0]=n)}function Td(t,n){const e=this.cache;if(n.x!==void 0)(e[0]!==n.x||e[1]!==n.y)&&(t.uniform2ui(this.addr,n.x,n.y),e[0]=n.x,e[1]=n.y);else{if(Lt(e,n))return;t.uniform2uiv(this.addr,n),Pt(e,n)}}function wd(t,n){const e=this.cache;if(n.x!==void 0)(e[0]!==n.x||e[1]!==n.y||e[2]!==n.z)&&(t.uniform3ui(this.addr,n.x,n.y,n.z),e[0]=n.x,e[1]=n.y,e[2]=n.z);else{if(Lt(e,n))return;t.uniform3uiv(this.addr,n),Pt(e,n)}}function bd(t,n){const e=this.cache;if(n.x!==void 0)(e[0]!==n.x||e[1]!==n.y||e[2]!==n.z||e[3]!==n.w)&&(t.uniform4ui(this.addr,n.x,n.y,n.z,n.w),e[0]=n.x,e[1]=n.y,e[2]=n.z,e[3]=n.w);else{if(Lt(e,n))return;t.uniform4uiv(this.addr,n),Pt(e,n)}}function Rd(t,n,e){const i=this.cache,a=e.allocateTextureUnit();i[0]!==a&&(t.uniform1i(this.addr,a),i[0]=a);let s;this.type===t.SAMPLER_2D_SHADOW?(xs.compareFunction=e.isReversedDepthBuffer()?bs:Rs,s=xs):s=Ko,e.setTexture2D(n||s,a)}function Ad(t,n,e){const i=this.cache,a=e.allocateTextureUnit();i[0]!==a&&(t.uniform1i(this.addr,a),i[0]=a),e.setTexture3D(n||Yo,a)}function yd(t,n,e){const i=this.cache,a=e.allocateTextureUnit();i[0]!==a&&(t.uniform1i(this.addr,a),i[0]=a),e.setTextureCube(n||$o,a)}function Cd(t,n,e){const i=this.cache,a=e.allocateTextureUnit();i[0]!==a&&(t.uniform1i(this.addr,a),i[0]=a),e.setTexture2DArray(n||qo,a)}function Ld(t){switch(t){case 5126:return fd;case 35664:return dd;case 35665:return pd;case 35666:return hd;case 35674:return md;case 35675:return _d;case 35676:return gd;case 5124:case 35670:return vd;case 35667:case 35671:return xd;case 35668:case 35672:return Sd;case 35669:case 35673:return Md;case 5125:return Ed;case 36294:return Td;case 36295:return wd;case 36296:return bd;case 35678:case 36198:case 36298:case 36306:case 35682:return Rd;case 35679:case 36299:case 36307:return Ad;case 35680:case 36300:case 36308:case 36293:return yd;case 36289:case 36303:case 36311:case 36292:return Cd}}function Pd(t,n){t.uniform1fv(this.addr,n)}function Dd(t,n){const e=jn(n,this.size,2);t.uniform2fv(this.addr,e)}function Id(t,n){const e=jn(n,this.size,3);t.uniform3fv(this.addr,e)}function Ud(t,n){const e=jn(n,this.size,4);t.uniform4fv(this.addr,e)}function Nd(t,n){const e=jn(n,this.size,4);t.uniformMatrix2fv(this.addr,!1,e)}function Fd(t,n){const e=jn(n,this.size,9);t.uniformMatrix3fv(this.addr,!1,e)}function Od(t,n){const e=jn(n,this.size,16);t.uniformMatrix4fv(this.addr,!1,e)}function Bd(t,n){t.uniform1iv(this.addr,n)}function Gd(t,n){t.uniform2iv(this.addr,n)}function Hd(t,n){t.uniform3iv(this.addr,n)}function kd(t,n){t.uniform4iv(this.addr,n)}function Vd(t,n){t.uniform1uiv(this.addr,n)}function zd(t,n){t.uniform2uiv(this.addr,n)}function Wd(t,n){t.uniform3uiv(this.addr,n)}function Xd(t,n){t.uniform4uiv(this.addr,n)}function Kd(t,n,e){const i=this.cache,a=n.length,s=Fi(e,a);Lt(i,s)||(t.uniform1iv(this.addr,s),Pt(i,s));let o;this.type===t.SAMPLER_2D_SHADOW?o=xs:o=Ko;for(let u=0;u!==a;++u)e.setTexture2D(n[u]||o,s[u])}function qd(t,n,e){const i=this.cache,a=n.length,s=Fi(e,a);Lt(i,s)||(t.uniform1iv(this.addr,s),Pt(i,s));for(let o=0;o!==a;++o)e.setTexture3D(n[o]||Yo,s[o])}function Yd(t,n,e){const i=this.cache,a=n.length,s=Fi(e,a);Lt(i,s)||(t.uniform1iv(this.addr,s),Pt(i,s));for(let o=0;o!==a;++o)e.setTextureCube(n[o]||$o,s[o])}function $d(t,n,e){const i=this.cache,a=n.length,s=Fi(e,a);Lt(i,s)||(t.uniform1iv(this.addr,s),Pt(i,s));for(let o=0;o!==a;++o)e.setTexture2DArray(n[o]||qo,s[o])}function jd(t){switch(t){case 5126:return Pd;case 35664:return Dd;case 35665:return Id;case 35666:return Ud;case 35674:return Nd;case 35675:return Fd;case 35676:return Od;case 5124:case 35670:return Bd;case 35667:case 35671:return Gd;case 35668:case 35672:return Hd;case 35669:case 35673:return kd;case 5125:return Vd;case 36294:return zd;case 36295:return Wd;case 36296:return Xd;case 35678:case 36198:case 36298:case 36306:case 35682:return Kd;case 35679:case 36299:case 36307:return qd;case 35680:case 36300:case 36308:case 36293:return Yd;case 36289:case 36303:case 36311:case 36292:return $d}}class Zd{constructor(n,e,i){this.id=n,this.addr=i,this.cache=[],this.type=e.type,this.setValue=Ld(e.type)}}class Qd{constructor(n,e,i){this.id=n,this.addr=i,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=jd(e.type)}}class Jd{constructor(n){this.id=n,this.seq=[],this.map={}}setValue(n,e,i){const a=this.seq;for(let s=0,o=a.length;s!==o;++s){const u=a[s];u.setValue(n,e[u.id],i)}}}const ts=/(\w+)(\])?(\[|\.)?/g;function Xa(t,n){t.seq.push(n),t.map[n.id]=n}function ep(t,n,e){const i=t.name,a=i.length;for(ts.lastIndex=0;;){const s=ts.exec(i),o=ts.lastIndex;let u=s[1];const f=s[2]==="]",r=s[3];if(f&&(u=u|0),r===void 0||r==="["&&o+2===a){Xa(e,r===void 0?new Zd(u,t,n):new Qd(u,t,n));break}else{let _=e.map[u];_===void 0&&(_=new Jd(u),Xa(e,_)),e=_}}}class yi{constructor(n,e){this.seq=[],this.map={};const i=n.getProgramParameter(e,n.ACTIVE_UNIFORMS);for(let o=0;o<i;++o){const u=n.getActiveUniform(e,o),f=n.getUniformLocation(e,u.name);ep(u,f,this)}const a=[],s=[];for(const o of this.seq)o.type===n.SAMPLER_2D_SHADOW||o.type===n.SAMPLER_CUBE_SHADOW||o.type===n.SAMPLER_2D_ARRAY_SHADOW?a.push(o):s.push(o);a.length>0&&(this.seq=a.concat(s))}setValue(n,e,i,a){const s=this.map[e];s!==void 0&&s.setValue(n,i,a)}setOptional(n,e,i){const a=e[i];a!==void 0&&this.setValue(n,i,a)}static upload(n,e,i,a){for(let s=0,o=e.length;s!==o;++s){const u=e[s],f=i[u.id];f.needsUpdate!==!1&&u.setValue(n,f.value,a)}}static seqWithValue(n,e){const i=[];for(let a=0,s=n.length;a!==s;++a){const o=n[a];o.id in e&&i.push(o)}return i}}function Ka(t,n,e){const i=t.createShader(n);return t.shaderSource(i,e),t.compileShader(i),i}const tp=37297;let np=0;function ip(t,n){const e=t.split(`
`),i=[],a=Math.max(n-6,0),s=Math.min(n+6,e.length);for(let o=a;o<s;o++){const u=o+1;i.push(`${u===n?">":" "} ${u}: ${e[o]}`)}return i.join(`
`)}const qa=new st;function sp(t){vt._getMatrix(qa,vt.workingColorSpace,t);const n=`mat3( ${qa.elements.map(e=>e.toFixed(4))} )`;switch(vt.getTransfer(t)){case Fo:return[n,"LinearTransferOETF"];case mt:return[n,"sRGBTransferOETF"];default:return rt("WebGLProgram: Unsupported color space: ",t),[n,"LinearTransferOETF"]}}function Ya(t,n,e){const i=t.getShaderParameter(n,t.COMPILE_STATUS),s=(t.getShaderInfoLog(n)||"").trim();if(i&&s==="")return"";const o=/ERROR: 0:(\d+)/.exec(s);if(o){const u=parseInt(o[1]);return e.toUpperCase()+`

`+s+`

`+ip(t.getShaderSource(n),u)}else return s}function ap(t,n){const e=sp(n);return[`vec4 ${t}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}const op={[Ds]:"Linear",[Ps]:"Reinhard",[Ls]:"Cineon",[Ui]:"ACESFilmic",[Cs]:"AgX",[ys]:"Neutral",[As]:"Custom"};function rp(t,n){const e=op[n];return e===void 0?(rt("WebGLProgram: Unsupported toneMapping:",n),"vec3 "+t+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+t+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const Ti=new j;function cp(){vt.getLuminanceCoefficients(Ti);const t=Ti.x.toFixed(4),n=Ti.y.toFixed(4),e=Ti.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${t}, ${n}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function lp(t){return[t.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",t.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(oi).join(`
`)}function up(t){const n=[];for(const e in t){const i=t[e];i!==!1&&n.push("#define "+e+" "+i)}return n.join(`
`)}function fp(t,n){const e={},i=t.getProgramParameter(n,t.ACTIVE_ATTRIBUTES);for(let a=0;a<i;a++){const s=t.getActiveAttrib(n,a),o=s.name;let u=1;s.type===t.FLOAT_MAT2&&(u=2),s.type===t.FLOAT_MAT3&&(u=3),s.type===t.FLOAT_MAT4&&(u=4),e[o]={type:s.type,location:t.getAttribLocation(n,o),locationSize:u}}return e}function oi(t){return t!==""}function $a(t,n){const e=n.numSpotLightShadows+n.numSpotLightMaps-n.numSpotLightShadowsWithMaps;return t.replace(/NUM_DIR_LIGHTS/g,n.numDirLights).replace(/NUM_SPOT_LIGHTS/g,n.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,n.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,n.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,n.numPointLights).replace(/NUM_HEMI_LIGHTS/g,n.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,n.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,n.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,n.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,n.numPointLightShadows)}function ja(t,n){return t.replace(/NUM_CLIPPING_PLANES/g,n.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,n.numClippingPlanes-n.numClipIntersection)}const dp=/^[ \t]*#include +<([\w\d./]+)>/gm;function Ss(t){return t.replace(dp,hp)}const pp=new Map;function hp(t,n){let e=et[n];if(e===void 0){const i=pp.get(n);if(i!==void 0)e=et[i],rt('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',n,i);else throw new Error("Can not resolve #include <"+n+">")}return Ss(e)}const mp=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Za(t){return t.replace(mp,_p)}function _p(t,n,e,i){let a="";for(let s=parseInt(n);s<parseInt(e);s++)a+=i.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return a}function Qa(t){let n=`precision ${t.precision} float;
	precision ${t.precision} int;
	precision ${t.precision} sampler2D;
	precision ${t.precision} samplerCube;
	precision ${t.precision} sampler3D;
	precision ${t.precision} sampler2DArray;
	precision ${t.precision} sampler2DShadow;
	precision ${t.precision} samplerCubeShadow;
	precision ${t.precision} sampler2DArrayShadow;
	precision ${t.precision} isampler2D;
	precision ${t.precision} isampler3D;
	precision ${t.precision} isamplerCube;
	precision ${t.precision} isampler2DArray;
	precision ${t.precision} usampler2D;
	precision ${t.precision} usampler3D;
	precision ${t.precision} usamplerCube;
	precision ${t.precision} usampler2DArray;
	`;return t.precision==="highp"?n+=`
#define HIGH_PRECISION`:t.precision==="mediump"?n+=`
#define MEDIUM_PRECISION`:t.precision==="lowp"&&(n+=`
#define LOW_PRECISION`),n}const gp={[ri]:"SHADOWMAP_TYPE_PCF",[ai]:"SHADOWMAP_TYPE_VSM"};function vp(t){return gp[t.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const xp={[ui]:"ENVMAP_TYPE_CUBE",[zn]:"ENVMAP_TYPE_CUBE",[Ii]:"ENVMAP_TYPE_CUBE_UV"};function Sp(t){return t.envMap===!1?"ENVMAP_TYPE_CUBE":xp[t.envMapMode]||"ENVMAP_TYPE_CUBE"}const Mp={[zn]:"ENVMAP_MODE_REFRACTION"};function Ep(t){return t.envMap===!1?"ENVMAP_MODE_REFLECTION":Mp[t.envMapMode]||"ENVMAP_MODE_REFLECTION"}const Tp={[Rc]:"ENVMAP_BLENDING_MULTIPLY",[bc]:"ENVMAP_BLENDING_MIX",[wc]:"ENVMAP_BLENDING_ADD"};function wp(t){return t.envMap===!1?"ENVMAP_BLENDING_NONE":Tp[t.combine]||"ENVMAP_BLENDING_NONE"}function bp(t){const n=t.envMapCubeUVHeight;if(n===null)return null;const e=Math.log2(n)-2,i=1/n;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:i,maxMip:e}}function Rp(t,n,e,i){const a=t.getContext(),s=e.defines;let o=e.vertexShader,u=e.fragmentShader;const f=vp(e),r=Sp(e),m=Ep(e),_=wp(e),h=bp(e),v=lp(e),p=up(s),d=a.createProgram();let c,l,g=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(c=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,p].filter(oi).join(`
`),c.length>0&&(c+=`
`),l=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,p].filter(oi).join(`
`),l.length>0&&(l+=`
`)):(c=[Qa(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,p,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+m:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexNormals?"#define HAS_NORMAL":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+f:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(oi).join(`
`),l=[Qa(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,p,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+r:"",e.envMap?"#define "+m:"",e.envMap?"#define "+_:"",h?"#define CUBEUV_TEXEL_WIDTH "+h.texelWidth:"",h?"#define CUBEUV_TEXEL_HEIGHT "+h.texelHeight:"",h?"#define CUBEUV_MAX_MIP "+h.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor?"#define USE_COLOR":"",e.vertexAlphas||e.batchingColor?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+f:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==ln?"#define TONE_MAPPING":"",e.toneMapping!==ln?et.tonemapping_pars_fragment:"",e.toneMapping!==ln?rp("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",et.colorspace_pars_fragment,ap("linearToOutputTexel",e.outputColorSpace),cp(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(oi).join(`
`)),o=Ss(o),o=$a(o,e),o=ja(o,e),u=Ss(u),u=$a(u,e),u=ja(u,e),o=Za(o),u=Za(u),e.isRawShaderMaterial!==!0&&(g=`#version 300 es
`,c=[v,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+c,l=["#define varying in",e.glslVersion===Aa?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===Aa?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+l);const E=g+c+o,x=g+l+u,R=Ka(a,a.VERTEX_SHADER,E),T=Ka(a,a.FRAGMENT_SHADER,x);a.attachShader(d,R),a.attachShader(d,T),e.index0AttributeName!==void 0?a.bindAttribLocation(d,0,e.index0AttributeName):e.morphTargets===!0&&a.bindAttribLocation(d,0,"position"),a.linkProgram(d);function w(L){if(t.debug.checkShaderErrors){const P=a.getProgramInfoLog(d)||"",F=a.getShaderInfoLog(R)||"",k=a.getShaderInfoLog(T)||"",G=P.trim(),O=F.trim(),B=k.trim();let J=!0,fe=!0;if(a.getProgramParameter(d,a.LINK_STATUS)===!1)if(J=!1,typeof t.debug.onShaderError=="function")t.debug.onShaderError(a,d,R,T);else{const xe=Ya(a,R,"vertex"),Oe=Ya(a,T,"fragment");gt("THREE.WebGLProgram: Shader Error "+a.getError()+" - VALIDATE_STATUS "+a.getProgramParameter(d,a.VALIDATE_STATUS)+`

Material Name: `+L.name+`
Material Type: `+L.type+`

Program Info Log: `+G+`
`+xe+`
`+Oe)}else G!==""?rt("WebGLProgram: Program Info Log:",G):(O===""||B==="")&&(fe=!1);fe&&(L.diagnostics={runnable:J,programLog:G,vertexShader:{log:O,prefix:c},fragmentShader:{log:B,prefix:l}})}a.deleteShader(R),a.deleteShader(T),S=new yi(a,d),A=fp(a,d)}let S;this.getUniforms=function(){return S===void 0&&w(this),S};let A;this.getAttributes=function(){return A===void 0&&w(this),A};let C=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return C===!1&&(C=a.getProgramParameter(d,tp)),C},this.destroy=function(){i.releaseStatesOfProgram(this),a.deleteProgram(d),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=np++,this.cacheKey=n,this.usedTimes=1,this.program=d,this.vertexShader=R,this.fragmentShader=T,this}let Ap=0;class yp{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(n){const e=n.vertexShader,i=n.fragmentShader,a=this._getShaderStage(e),s=this._getShaderStage(i),o=this._getShaderCacheForMaterial(n);return o.has(a)===!1&&(o.add(a),a.usedTimes++),o.has(s)===!1&&(o.add(s),s.usedTimes++),this}remove(n){const e=this.materialCache.get(n);for(const i of e)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(n),this}getVertexShaderID(n){return this._getShaderStage(n.vertexShader).id}getFragmentShaderID(n){return this._getShaderStage(n.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(n){const e=this.materialCache;let i=e.get(n);return i===void 0&&(i=new Set,e.set(n,i)),i}_getShaderStage(n){const e=this.shaderCache;let i=e.get(n);return i===void 0&&(i=new Cp(n),e.set(n,i)),i}}class Cp{constructor(n){this.id=Ap++,this.code=n,this.usedTimes=0}}function Lp(t){return t===Kn||t===fs||t===ds}function Pp(t,n,e,i,a,s){const o=new Mc,u=new yp,f=new Set,r=[],m=new Map,_=i.logarithmicDepthBuffer;let h=i.precision;const v={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function p(S){return f.add(S),S===0?"uv":`uv${S}`}function d(S,A,C,L,P,F){const k=L.fog,G=P.geometry,O=S.isMeshStandardMaterial||S.isMeshLambertMaterial||S.isMeshPhongMaterial?L.environment:null,B=S.isMeshStandardMaterial||S.isMeshLambertMaterial&&!S.envMap||S.isMeshPhongMaterial&&!S.envMap,J=n.get(S.envMap||O,B),fe=J&&J.mapping===Ii?J.image.height:null,xe=v[S.type];S.precision!==null&&(h=i.getMaxPrecision(S.precision),h!==S.precision&&rt("WebGLProgram.getParameters:",S.precision,"not supported, using",h,"instead."));const Oe=G.morphAttributes.position||G.morphAttributes.normal||G.morphAttributes.color,Ie=Oe!==void 0?Oe.length:0;let it=0;G.morphAttributes.position!==void 0&&(it=1),G.morphAttributes.normal!==void 0&&(it=2),G.morphAttributes.color!==void 0&&(it=3);let Ke,We,Z,ve;if(xe){const Ze=on[xe];Ke=Ze.vertexShader,We=Ze.fragmentShader}else Ke=S.vertexShader,We=S.fragmentShader,u.update(S),Z=u.getVertexShaderID(S),ve=u.getFragmentShaderID(S);const le=t.getRenderTarget(),Be=t.state.buffers.depth.getReversed(),Xe=P.isInstancedMesh===!0,Re=P.isBatchedMesh===!0,Ne=!!S.map,Ae=!!S.matcap,re=!!J,De=!!S.aoMap,we=!!S.lightMap,qe=!!S.bumpMap,be=!!S.normalMap,Ve=!!S.displacementMap,I=!!S.emissiveMap,se=!!S.metalnessMap,oe=!!S.roughnessMap,He=S.anisotropy>0,te=S.clearcoat>0,$e=S.dispersion>0,y=S.iridescence>0,M=S.sheen>0,H=S.transmission>0,Y=He&&!!S.anisotropyMap,ne=te&&!!S.clearcoatMap,ce=te&&!!S.clearcoatNormalMap,me=te&&!!S.clearcoatRoughnessMap,X=y&&!!S.iridescenceMap,Q=y&&!!S.iridescenceThicknessMap,Te=M&&!!S.sheenColorMap,Le=M&&!!S.sheenRoughnessMap,_e=!!S.specularMap,de=!!S.specularColorMap,Ye=!!S.specularIntensityMap,Je=H&&!!S.transmissionMap,ot=H&&!!S.thicknessMap,D=!!S.gradientMap,pe=!!S.alphaMap,$=S.alphaTest>0,ye=!!S.alphaHash,ge=!!S.extensions;let ae=ln;S.toneMapped&&(le===null||le.isXRRenderTarget===!0)&&(ae=t.toneMapping);const Fe={shaderID:xe,shaderType:S.type,shaderName:S.name,vertexShader:Ke,fragmentShader:We,defines:S.defines,customVertexShaderID:Z,customFragmentShaderID:ve,isRawShaderMaterial:S.isRawShaderMaterial===!0,glslVersion:S.glslVersion,precision:h,batching:Re,batchingColor:Re&&P._colorsTexture!==null,instancing:Xe,instancingColor:Xe&&P.instanceColor!==null,instancingMorph:Xe&&P.morphTexture!==null,outputColorSpace:le===null?t.outputColorSpace:le.isXRRenderTarget===!0?le.texture.colorSpace:vt.workingColorSpace,alphaToCoverage:!!S.alphaToCoverage,map:Ne,matcap:Ae,envMap:re,envMapMode:re&&J.mapping,envMapCubeUVHeight:fe,aoMap:De,lightMap:we,bumpMap:qe,normalMap:be,displacementMap:Ve,emissiveMap:I,normalMapObjectSpace:be&&S.normalMapType===gc,normalMapTangentSpace:be&&S.normalMapType===ba,packedNormalMap:be&&S.normalMapType===ba&&Lp(S.normalMap.format),metalnessMap:se,roughnessMap:oe,anisotropy:He,anisotropyMap:Y,clearcoat:te,clearcoatMap:ne,clearcoatNormalMap:ce,clearcoatRoughnessMap:me,dispersion:$e,iridescence:y,iridescenceMap:X,iridescenceThicknessMap:Q,sheen:M,sheenColorMap:Te,sheenRoughnessMap:Le,specularMap:_e,specularColorMap:de,specularIntensityMap:Ye,transmission:H,transmissionMap:Je,thicknessMap:ot,gradientMap:D,opaque:S.transparent===!1&&S.blending===Ai&&S.alphaToCoverage===!1,alphaMap:pe,alphaTest:$,alphaHash:ye,combine:S.combine,mapUv:Ne&&p(S.map.channel),aoMapUv:De&&p(S.aoMap.channel),lightMapUv:we&&p(S.lightMap.channel),bumpMapUv:qe&&p(S.bumpMap.channel),normalMapUv:be&&p(S.normalMap.channel),displacementMapUv:Ve&&p(S.displacementMap.channel),emissiveMapUv:I&&p(S.emissiveMap.channel),metalnessMapUv:se&&p(S.metalnessMap.channel),roughnessMapUv:oe&&p(S.roughnessMap.channel),anisotropyMapUv:Y&&p(S.anisotropyMap.channel),clearcoatMapUv:ne&&p(S.clearcoatMap.channel),clearcoatNormalMapUv:ce&&p(S.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:me&&p(S.clearcoatRoughnessMap.channel),iridescenceMapUv:X&&p(S.iridescenceMap.channel),iridescenceThicknessMapUv:Q&&p(S.iridescenceThicknessMap.channel),sheenColorMapUv:Te&&p(S.sheenColorMap.channel),sheenRoughnessMapUv:Le&&p(S.sheenRoughnessMap.channel),specularMapUv:_e&&p(S.specularMap.channel),specularColorMapUv:de&&p(S.specularColorMap.channel),specularIntensityMapUv:Ye&&p(S.specularIntensityMap.channel),transmissionMapUv:Je&&p(S.transmissionMap.channel),thicknessMapUv:ot&&p(S.thicknessMap.channel),alphaMapUv:pe&&p(S.alphaMap.channel),vertexTangents:!!G.attributes.tangent&&(be||He),vertexNormals:!!G.attributes.normal,vertexColors:S.vertexColors,vertexAlphas:S.vertexColors===!0&&!!G.attributes.color&&G.attributes.color.itemSize===4,pointsUvs:P.isPoints===!0&&!!G.attributes.uv&&(Ne||pe),fog:!!k,useFog:S.fog===!0,fogExp2:!!k&&k.isFogExp2,flatShading:S.wireframe===!1&&(S.flatShading===!0||G.attributes.normal===void 0&&be===!1&&(S.isMeshLambertMaterial||S.isMeshPhongMaterial||S.isMeshStandardMaterial||S.isMeshPhysicalMaterial)),sizeAttenuation:S.sizeAttenuation===!0,logarithmicDepthBuffer:_,reversedDepthBuffer:Be,skinning:P.isSkinnedMesh===!0,morphTargets:G.morphAttributes.position!==void 0,morphNormals:G.morphAttributes.normal!==void 0,morphColors:G.morphAttributes.color!==void 0,morphTargetsCount:Ie,morphTextureStride:it,numDirLights:A.directional.length,numPointLights:A.point.length,numSpotLights:A.spot.length,numSpotLightMaps:A.spotLightMap.length,numRectAreaLights:A.rectArea.length,numHemiLights:A.hemi.length,numDirLightShadows:A.directionalShadowMap.length,numPointLightShadows:A.pointShadowMap.length,numSpotLightShadows:A.spotShadowMap.length,numSpotLightShadowsWithMaps:A.numSpotLightShadowsWithMaps,numLightProbes:A.numLightProbes,numLightProbeGrids:F.length,numClippingPlanes:s.numPlanes,numClipIntersection:s.numIntersection,dithering:S.dithering,shadowMapEnabled:t.shadowMap.enabled&&C.length>0,shadowMapType:t.shadowMap.type,toneMapping:ae,decodeVideoTexture:Ne&&S.map.isVideoTexture===!0&&vt.getTransfer(S.map.colorSpace)===mt,decodeVideoTextureEmissive:I&&S.emissiveMap.isVideoTexture===!0&&vt.getTransfer(S.emissiveMap.colorSpace)===mt,premultipliedAlpha:S.premultipliedAlpha,doubleSided:S.side===ct,flipSided:S.side===Gt,useDepthPacking:S.depthPacking>=0,depthPacking:S.depthPacking||0,index0AttributeName:S.index0AttributeName,extensionClipCullDistance:ge&&S.extensions.clipCullDistance===!0&&e.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(ge&&S.extensions.multiDraw===!0||Re)&&e.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:e.has("KHR_parallel_shader_compile"),customProgramCacheKey:S.customProgramCacheKey()};return Fe.vertexUv1s=f.has(1),Fe.vertexUv2s=f.has(2),Fe.vertexUv3s=f.has(3),f.clear(),Fe}function c(S){const A=[];if(S.shaderID?A.push(S.shaderID):(A.push(S.customVertexShaderID),A.push(S.customFragmentShaderID)),S.defines!==void 0)for(const C in S.defines)A.push(C),A.push(S.defines[C]);return S.isRawShaderMaterial===!1&&(l(A,S),g(A,S),A.push(t.outputColorSpace)),A.push(S.customProgramCacheKey),A.join()}function l(S,A){S.push(A.precision),S.push(A.outputColorSpace),S.push(A.envMapMode),S.push(A.envMapCubeUVHeight),S.push(A.mapUv),S.push(A.alphaMapUv),S.push(A.lightMapUv),S.push(A.aoMapUv),S.push(A.bumpMapUv),S.push(A.normalMapUv),S.push(A.displacementMapUv),S.push(A.emissiveMapUv),S.push(A.metalnessMapUv),S.push(A.roughnessMapUv),S.push(A.anisotropyMapUv),S.push(A.clearcoatMapUv),S.push(A.clearcoatNormalMapUv),S.push(A.clearcoatRoughnessMapUv),S.push(A.iridescenceMapUv),S.push(A.iridescenceThicknessMapUv),S.push(A.sheenColorMapUv),S.push(A.sheenRoughnessMapUv),S.push(A.specularMapUv),S.push(A.specularColorMapUv),S.push(A.specularIntensityMapUv),S.push(A.transmissionMapUv),S.push(A.thicknessMapUv),S.push(A.combine),S.push(A.fogExp2),S.push(A.sizeAttenuation),S.push(A.morphTargetsCount),S.push(A.morphAttributeCount),S.push(A.numDirLights),S.push(A.numPointLights),S.push(A.numSpotLights),S.push(A.numSpotLightMaps),S.push(A.numHemiLights),S.push(A.numRectAreaLights),S.push(A.numDirLightShadows),S.push(A.numPointLightShadows),S.push(A.numSpotLightShadows),S.push(A.numSpotLightShadowsWithMaps),S.push(A.numLightProbes),S.push(A.shadowMapType),S.push(A.toneMapping),S.push(A.numClippingPlanes),S.push(A.numClipIntersection),S.push(A.depthPacking)}function g(S,A){o.disableAll(),A.instancing&&o.enable(0),A.instancingColor&&o.enable(1),A.instancingMorph&&o.enable(2),A.matcap&&o.enable(3),A.envMap&&o.enable(4),A.normalMapObjectSpace&&o.enable(5),A.normalMapTangentSpace&&o.enable(6),A.clearcoat&&o.enable(7),A.iridescence&&o.enable(8),A.alphaTest&&o.enable(9),A.vertexColors&&o.enable(10),A.vertexAlphas&&o.enable(11),A.vertexUv1s&&o.enable(12),A.vertexUv2s&&o.enable(13),A.vertexUv3s&&o.enable(14),A.vertexTangents&&o.enable(15),A.anisotropy&&o.enable(16),A.alphaHash&&o.enable(17),A.batching&&o.enable(18),A.dispersion&&o.enable(19),A.batchingColor&&o.enable(20),A.gradientMap&&o.enable(21),A.packedNormalMap&&o.enable(22),A.vertexNormals&&o.enable(23),S.push(o.mask),o.disableAll(),A.fog&&o.enable(0),A.useFog&&o.enable(1),A.flatShading&&o.enable(2),A.logarithmicDepthBuffer&&o.enable(3),A.reversedDepthBuffer&&o.enable(4),A.skinning&&o.enable(5),A.morphTargets&&o.enable(6),A.morphNormals&&o.enable(7),A.morphColors&&o.enable(8),A.premultipliedAlpha&&o.enable(9),A.shadowMapEnabled&&o.enable(10),A.doubleSided&&o.enable(11),A.flipSided&&o.enable(12),A.useDepthPacking&&o.enable(13),A.dithering&&o.enable(14),A.transmission&&o.enable(15),A.sheen&&o.enable(16),A.opaque&&o.enable(17),A.pointsUvs&&o.enable(18),A.decodeVideoTexture&&o.enable(19),A.decodeVideoTextureEmissive&&o.enable(20),A.alphaToCoverage&&o.enable(21),A.numLightProbeGrids>0&&o.enable(22),S.push(o.mask)}function E(S){const A=v[S.type];let C;if(A){const L=on[A];C=qn.clone(L.uniforms)}else C=S.uniforms;return C}function x(S,A){let C=m.get(A);return C!==void 0?++C.usedTimes:(C=new Rp(t,A,S,a),r.push(C),m.set(A,C)),C}function R(S){if(--S.usedTimes===0){const A=r.indexOf(S);r[A]=r[r.length-1],r.pop(),m.delete(S.cacheKey),S.destroy()}}function T(S){u.remove(S)}function w(){u.dispose()}return{getParameters:d,getProgramCacheKey:c,getUniforms:E,acquireProgram:x,releaseProgram:R,releaseShaderCache:T,programs:r,dispose:w}}function Dp(){let t=new WeakMap;function n(o){return t.has(o)}function e(o){let u=t.get(o);return u===void 0&&(u={},t.set(o,u)),u}function i(o){t.delete(o)}function a(o,u,f){t.get(o)[u]=f}function s(){t=new WeakMap}return{has:n,get:e,remove:i,update:a,dispose:s}}function Ip(t,n){return t.groupOrder!==n.groupOrder?t.groupOrder-n.groupOrder:t.renderOrder!==n.renderOrder?t.renderOrder-n.renderOrder:t.material.id!==n.material.id?t.material.id-n.material.id:t.materialVariant!==n.materialVariant?t.materialVariant-n.materialVariant:t.z!==n.z?t.z-n.z:t.id-n.id}function Ja(t,n){return t.groupOrder!==n.groupOrder?t.groupOrder-n.groupOrder:t.renderOrder!==n.renderOrder?t.renderOrder-n.renderOrder:t.z!==n.z?n.z-t.z:t.id-n.id}function eo(){const t=[];let n=0;const e=[],i=[],a=[];function s(){n=0,e.length=0,i.length=0,a.length=0}function o(h){let v=0;return h.isInstancedMesh&&(v+=2),h.isSkinnedMesh&&(v+=1),v}function u(h,v,p,d,c,l){let g=t[n];return g===void 0?(g={id:h.id,object:h,geometry:v,material:p,materialVariant:o(h),groupOrder:d,renderOrder:h.renderOrder,z:c,group:l},t[n]=g):(g.id=h.id,g.object=h,g.geometry=v,g.material=p,g.materialVariant=o(h),g.groupOrder=d,g.renderOrder=h.renderOrder,g.z=c,g.group=l),n++,g}function f(h,v,p,d,c,l){const g=u(h,v,p,d,c,l);p.transmission>0?i.push(g):p.transparent===!0?a.push(g):e.push(g)}function r(h,v,p,d,c,l){const g=u(h,v,p,d,c,l);p.transmission>0?i.unshift(g):p.transparent===!0?a.unshift(g):e.unshift(g)}function m(h,v){e.length>1&&e.sort(h||Ip),i.length>1&&i.sort(v||Ja),a.length>1&&a.sort(v||Ja)}function _(){for(let h=n,v=t.length;h<v;h++){const p=t[h];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:e,transmissive:i,transparent:a,init:s,push:f,unshift:r,finish:_,sort:m}}function Up(){let t=new WeakMap;function n(i,a){const s=t.get(i);let o;return s===void 0?(o=new eo,t.set(i,[o])):a>=s.length?(o=new eo,s.push(o)):o=s[a],o}function e(){t=new WeakMap}return{get:n,dispose:e}}function Np(){const t={};return{get:function(n){if(t[n.id]!==void 0)return t[n.id];let e;switch(n.type){case"DirectionalLight":e={direction:new j,color:new ue};break;case"SpotLight":e={position:new j,direction:new j,color:new ue,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new j,color:new ue,distance:0,decay:0};break;case"HemisphereLight":e={direction:new j,skyColor:new ue,groundColor:new ue};break;case"RectAreaLight":e={color:new ue,position:new j,halfWidth:new j,halfHeight:new j};break}return t[n.id]=e,e}}}function Fp(){const t={};return{get:function(n){if(t[n.id]!==void 0)return t[n.id];let e;switch(n.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ut};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ut};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ut,shadowCameraNear:1,shadowCameraFar:1e3};break}return t[n.id]=e,e}}}let Op=0;function Bp(t,n){return(n.castShadow?2:0)-(t.castShadow?2:0)+(n.map?1:0)-(t.map?1:0)}function Gp(t){const n=new Np,e=Fp(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let r=0;r<9;r++)i.probe.push(new j);const a=new j,s=new At,o=new At;function u(r){let m=0,_=0,h=0;for(let A=0;A<9;A++)i.probe[A].set(0,0,0);let v=0,p=0,d=0,c=0,l=0,g=0,E=0,x=0,R=0,T=0,w=0;r.sort(Bp);for(let A=0,C=r.length;A<C;A++){const L=r[A],P=L.color,F=L.intensity,k=L.distance;let G=null;if(L.shadow&&L.shadow.map&&(L.shadow.map.texture.format===Kn?G=L.shadow.map.texture:G=L.shadow.map.depthTexture||L.shadow.map.texture),L.isAmbientLight)m+=P.r*F,_+=P.g*F,h+=P.b*F;else if(L.isLightProbe){for(let O=0;O<9;O++)i.probe[O].addScaledVector(L.sh.coefficients[O],F);w++}else if(L.isDirectionalLight){const O=n.get(L);if(O.color.copy(L.color).multiplyScalar(L.intensity),L.castShadow){const B=L.shadow,J=e.get(L);J.shadowIntensity=B.intensity,J.shadowBias=B.bias,J.shadowNormalBias=B.normalBias,J.shadowRadius=B.radius,J.shadowMapSize=B.mapSize,i.directionalShadow[v]=J,i.directionalShadowMap[v]=G,i.directionalShadowMatrix[v]=L.shadow.matrix,g++}i.directional[v]=O,v++}else if(L.isSpotLight){const O=n.get(L);O.position.setFromMatrixPosition(L.matrixWorld),O.color.copy(P).multiplyScalar(F),O.distance=k,O.coneCos=Math.cos(L.angle),O.penumbraCos=Math.cos(L.angle*(1-L.penumbra)),O.decay=L.decay,i.spot[d]=O;const B=L.shadow;if(L.map&&(i.spotLightMap[R]=L.map,R++,B.updateMatrices(L),L.castShadow&&T++),i.spotLightMatrix[d]=B.matrix,L.castShadow){const J=e.get(L);J.shadowIntensity=B.intensity,J.shadowBias=B.bias,J.shadowNormalBias=B.normalBias,J.shadowRadius=B.radius,J.shadowMapSize=B.mapSize,i.spotShadow[d]=J,i.spotShadowMap[d]=G,x++}d++}else if(L.isRectAreaLight){const O=n.get(L);O.color.copy(P).multiplyScalar(F),O.halfWidth.set(L.width*.5,0,0),O.halfHeight.set(0,L.height*.5,0),i.rectArea[c]=O,c++}else if(L.isPointLight){const O=n.get(L);if(O.color.copy(L.color).multiplyScalar(L.intensity),O.distance=L.distance,O.decay=L.decay,L.castShadow){const B=L.shadow,J=e.get(L);J.shadowIntensity=B.intensity,J.shadowBias=B.bias,J.shadowNormalBias=B.normalBias,J.shadowRadius=B.radius,J.shadowMapSize=B.mapSize,J.shadowCameraNear=B.camera.near,J.shadowCameraFar=B.camera.far,i.pointShadow[p]=J,i.pointShadowMap[p]=G,i.pointShadowMatrix[p]=L.shadow.matrix,E++}i.point[p]=O,p++}else if(L.isHemisphereLight){const O=n.get(L);O.skyColor.copy(L.color).multiplyScalar(F),O.groundColor.copy(L.groundColor).multiplyScalar(F),i.hemi[l]=O,l++}}c>0&&(t.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=Se.LTC_FLOAT_1,i.rectAreaLTC2=Se.LTC_FLOAT_2):(i.rectAreaLTC1=Se.LTC_HALF_1,i.rectAreaLTC2=Se.LTC_HALF_2)),i.ambient[0]=m,i.ambient[1]=_,i.ambient[2]=h;const S=i.hash;(S.directionalLength!==v||S.pointLength!==p||S.spotLength!==d||S.rectAreaLength!==c||S.hemiLength!==l||S.numDirectionalShadows!==g||S.numPointShadows!==E||S.numSpotShadows!==x||S.numSpotMaps!==R||S.numLightProbes!==w)&&(i.directional.length=v,i.spot.length=d,i.rectArea.length=c,i.point.length=p,i.hemi.length=l,i.directionalShadow.length=g,i.directionalShadowMap.length=g,i.pointShadow.length=E,i.pointShadowMap.length=E,i.spotShadow.length=x,i.spotShadowMap.length=x,i.directionalShadowMatrix.length=g,i.pointShadowMatrix.length=E,i.spotLightMatrix.length=x+R-T,i.spotLightMap.length=R,i.numSpotLightShadowsWithMaps=T,i.numLightProbes=w,S.directionalLength=v,S.pointLength=p,S.spotLength=d,S.rectAreaLength=c,S.hemiLength=l,S.numDirectionalShadows=g,S.numPointShadows=E,S.numSpotShadows=x,S.numSpotMaps=R,S.numLightProbes=w,i.version=Op++)}function f(r,m){let _=0,h=0,v=0,p=0,d=0;const c=m.matrixWorldInverse;for(let l=0,g=r.length;l<g;l++){const E=r[l];if(E.isDirectionalLight){const x=i.directional[_];x.direction.setFromMatrixPosition(E.matrixWorld),a.setFromMatrixPosition(E.target.matrixWorld),x.direction.sub(a),x.direction.transformDirection(c),_++}else if(E.isSpotLight){const x=i.spot[v];x.position.setFromMatrixPosition(E.matrixWorld),x.position.applyMatrix4(c),x.direction.setFromMatrixPosition(E.matrixWorld),a.setFromMatrixPosition(E.target.matrixWorld),x.direction.sub(a),x.direction.transformDirection(c),v++}else if(E.isRectAreaLight){const x=i.rectArea[p];x.position.setFromMatrixPosition(E.matrixWorld),x.position.applyMatrix4(c),o.identity(),s.copy(E.matrixWorld),s.premultiply(c),o.extractRotation(s),x.halfWidth.set(E.width*.5,0,0),x.halfHeight.set(0,E.height*.5,0),x.halfWidth.applyMatrix4(o),x.halfHeight.applyMatrix4(o),p++}else if(E.isPointLight){const x=i.point[h];x.position.setFromMatrixPosition(E.matrixWorld),x.position.applyMatrix4(c),h++}else if(E.isHemisphereLight){const x=i.hemi[d];x.direction.setFromMatrixPosition(E.matrixWorld),x.direction.transformDirection(c),d++}}}return{setup:u,setupView:f,state:i}}function to(t){const n=new Gp(t),e=[],i=[],a=[];function s(h){_.camera=h,e.length=0,i.length=0,a.length=0}function o(h){e.push(h)}function u(h){i.push(h)}function f(h){a.push(h)}function r(){n.setup(e)}function m(h){n.setupView(e,h)}const _={lightsArray:e,shadowsArray:i,lightProbeGridArray:a,camera:null,lights:n,transmissionRenderTarget:{},textureUnits:0};return{init:s,state:_,setupLights:r,setupLightsView:m,pushLight:o,pushShadow:u,pushLightProbeGrid:f}}function Hp(t){let n=new WeakMap;function e(a,s=0){const o=n.get(a);let u;return o===void 0?(u=new to(t),n.set(a,[u])):s>=o.length?(u=new to(t),o.push(u)):u=o[s],u}function i(){n=new WeakMap}return{get:e,dispose:i}}const kp=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Vp=`uniform sampler2D shadow_pass;
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
}`,zp=[new j(1,0,0),new j(-1,0,0),new j(0,1,0),new j(0,-1,0),new j(0,0,1),new j(0,0,-1)],Wp=[new j(0,-1,0),new j(0,-1,0),new j(0,0,1),new j(0,0,-1),new j(0,-1,0),new j(0,-1,0)],no=new At,ti=new j,ns=new j;function Xp(t,n,e){let i=new Mo;const a=new ut,s=new ut,o=new Ot,u=new jr,f=new Zr,r={},m=e.maxTextureSize,_={[Vn]:Gt,[Gt]:Vn,[ct]:ct},h=new Dt({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new ut},radius:{value:4}},vertexShader:kp,fragmentShader:Vp}),v=h.clone();v.defines.HORIZONTAL_PASS=1;const p=new vn;p.setAttribute("position",new kt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const d=new U(p,h),c=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=ri;let l=this.type;this.render=function(T,w,S){if(c.enabled===!1||c.autoUpdate===!1&&c.needsUpdate===!1||T.length===0)return;this.type===Qr&&(rt("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."),this.type=ri);const A=t.getRenderTarget(),C=t.getActiveCubeFace(),L=t.getActiveMipmapLevel(),P=t.state;P.setBlending(un),P.buffers.depth.getReversed()===!0?P.buffers.color.setClear(0,0,0,0):P.buffers.color.setClear(1,1,1,1),P.buffers.depth.setTest(!0),P.setScissorTest(!1);const F=l!==this.type;F&&w.traverse(function(k){k.material&&(Array.isArray(k.material)?k.material.forEach(G=>G.needsUpdate=!0):k.material.needsUpdate=!0)});for(let k=0,G=T.length;k<G;k++){const O=T[k],B=O.shadow;if(B===void 0){rt("WebGLShadowMap:",O,"has no shadow.");continue}if(B.autoUpdate===!1&&B.needsUpdate===!1)continue;a.copy(B.mapSize);const J=B.getFrameExtents();a.multiply(J),s.copy(B.mapSize),(a.x>m||a.y>m)&&(a.x>m&&(s.x=Math.floor(m/J.x),a.x=s.x*J.x,B.mapSize.x=s.x),a.y>m&&(s.y=Math.floor(m/J.y),a.y=s.y*J.y,B.mapSize.y=s.y));const fe=t.state.buffers.depth.getReversed();if(B.camera._reversedDepth=fe,B.map===null||F===!0){if(B.map!==null&&(B.map.depthTexture!==null&&(B.map.depthTexture.dispose(),B.map.depthTexture=null),B.map.dispose()),this.type===ai){if(O.isPointLight){rt("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}B.map=new zt(a.x,a.y,{format:Kn,type:qt,minFilter:Bt,magFilter:Bt,generateMipmaps:!1}),B.map.texture.name=O.name+".shadowMap",B.map.depthTexture=new fi(a.x,a.y,bn),B.map.depthTexture.name=O.name+".shadowMapDepth",B.map.depthTexture.format=Xn,B.map.depthTexture.compareFunction=null,B.map.depthTexture.minFilter=mn,B.map.depthTexture.magFilter=mn}else O.isPointLight?(B.map=new Xo(a.x),B.map.depthTexture=new Jr(a.x,Un)):(B.map=new zt(a.x,a.y),B.map.depthTexture=new fi(a.x,a.y,Un)),B.map.depthTexture.name=O.name+".shadowMap",B.map.depthTexture.format=Xn,this.type===ri?(B.map.depthTexture.compareFunction=fe?bs:Rs,B.map.depthTexture.minFilter=Bt,B.map.depthTexture.magFilter=Bt):(B.map.depthTexture.compareFunction=null,B.map.depthTexture.minFilter=mn,B.map.depthTexture.magFilter=mn);B.camera.updateProjectionMatrix()}const xe=B.map.isWebGLCubeRenderTarget?6:1;for(let Oe=0;Oe<xe;Oe++){if(B.map.isWebGLCubeRenderTarget)t.setRenderTarget(B.map,Oe),t.clear();else{Oe===0&&(t.setRenderTarget(B.map),t.clear());const Ie=B.getViewport(Oe);o.set(s.x*Ie.x,s.y*Ie.y,s.x*Ie.z,s.y*Ie.w),P.viewport(o)}if(O.isPointLight){const Ie=B.camera,it=B.matrix,Ke=O.distance||Ie.far;Ke!==Ie.far&&(Ie.far=Ke,Ie.updateProjectionMatrix()),ti.setFromMatrixPosition(O.matrixWorld),Ie.position.copy(ti),ns.copy(Ie.position),ns.add(zp[Oe]),Ie.up.copy(Wp[Oe]),Ie.lookAt(ns),Ie.updateMatrixWorld(),it.makeTranslation(-ti.x,-ti.y,-ti.z),no.multiplyMatrices(Ie.projectionMatrix,Ie.matrixWorldInverse),B._frustum.setFromProjectionMatrix(no,Ie.coordinateSystem,Ie.reversedDepth)}else B.updateMatrices(O);i=B.getFrustum(),x(w,S,B.camera,O,this.type)}B.isPointLightShadow!==!0&&this.type===ai&&g(B,S),B.needsUpdate=!1}l=this.type,c.needsUpdate=!1,t.setRenderTarget(A,C,L)};function g(T,w){const S=n.update(d);h.defines.VSM_SAMPLES!==T.blurSamples&&(h.defines.VSM_SAMPLES=T.blurSamples,v.defines.VSM_SAMPLES=T.blurSamples,h.needsUpdate=!0,v.needsUpdate=!0),T.mapPass===null&&(T.mapPass=new zt(a.x,a.y,{format:Kn,type:qt})),h.uniforms.shadow_pass.value=T.map.depthTexture,h.uniforms.resolution.value=T.mapSize,h.uniforms.radius.value=T.radius,t.setRenderTarget(T.mapPass),t.clear(),t.renderBufferDirect(w,null,S,h,d,null),v.uniforms.shadow_pass.value=T.mapPass.texture,v.uniforms.resolution.value=T.mapSize,v.uniforms.radius.value=T.radius,t.setRenderTarget(T.map),t.clear(),t.renderBufferDirect(w,null,S,v,d,null)}function E(T,w,S,A){let C=null;const L=S.isPointLight===!0?T.customDistanceMaterial:T.customDepthMaterial;if(L!==void 0)C=L;else if(C=S.isPointLight===!0?f:u,t.localClippingEnabled&&w.clipShadows===!0&&Array.isArray(w.clippingPlanes)&&w.clippingPlanes.length!==0||w.displacementMap&&w.displacementScale!==0||w.alphaMap&&w.alphaTest>0||w.map&&w.alphaTest>0||w.alphaToCoverage===!0){const P=C.uuid,F=w.uuid;let k=r[P];k===void 0&&(k={},r[P]=k);let G=k[F];G===void 0&&(G=C.clone(),k[F]=G,w.addEventListener("dispose",R)),C=G}if(C.visible=w.visible,C.wireframe=w.wireframe,A===ai?C.side=w.shadowSide!==null?w.shadowSide:w.side:C.side=w.shadowSide!==null?w.shadowSide:_[w.side],C.alphaMap=w.alphaMap,C.alphaTest=w.alphaToCoverage===!0?.5:w.alphaTest,C.map=w.map,C.clipShadows=w.clipShadows,C.clippingPlanes=w.clippingPlanes,C.clipIntersection=w.clipIntersection,C.displacementMap=w.displacementMap,C.displacementScale=w.displacementScale,C.displacementBias=w.displacementBias,C.wireframeLinewidth=w.wireframeLinewidth,C.linewidth=w.linewidth,S.isPointLight===!0&&C.isMeshDistanceMaterial===!0){const P=t.properties.get(C);P.light=S}return C}function x(T,w,S,A,C){if(T.visible===!1)return;if(T.layers.test(w.layers)&&(T.isMesh||T.isLine||T.isPoints)&&(T.castShadow||T.receiveShadow&&C===ai)&&(!T.frustumCulled||i.intersectsObject(T))){T.modelViewMatrix.multiplyMatrices(S.matrixWorldInverse,T.matrixWorld);const F=n.update(T),k=T.material;if(Array.isArray(k)){const G=F.groups;for(let O=0,B=G.length;O<B;O++){const J=G[O],fe=k[J.materialIndex];if(fe&&fe.visible){const xe=E(T,fe,A,C);T.onBeforeShadow(t,T,w,S,F,xe,J),t.renderBufferDirect(S,null,F,xe,T,J),T.onAfterShadow(t,T,w,S,F,xe,J)}}}else if(k.visible){const G=E(T,k,A,C);T.onBeforeShadow(t,T,w,S,F,G,null),t.renderBufferDirect(S,null,F,G,T,null),T.onAfterShadow(t,T,w,S,F,G,null)}}const P=T.children;for(let F=0,k=P.length;F<k;F++)x(P[F],w,S,A,C)}function R(T){T.target.removeEventListener("dispose",R);for(const S in r){const A=r[S],C=T.target.uuid;C in A&&(A[C].dispose(),delete A[C])}}}function Kp(t,n){function e(){let D=!1;const pe=new Ot;let $=null;const ye=new Ot(0,0,0,0);return{setMask:function(ge){$!==ge&&!D&&(t.colorMask(ge,ge,ge,ge),$=ge)},setLocked:function(ge){D=ge},setClear:function(ge,ae,Fe,Ze,Tt){Tt===!0&&(ge*=Ze,ae*=Ze,Fe*=Ze),pe.set(ge,ae,Fe,Ze),ye.equals(pe)===!1&&(t.clearColor(ge,ae,Fe,Ze),ye.copy(pe))},reset:function(){D=!1,$=null,ye.set(-1,0,0,0)}}}function i(){let D=!1,pe=!1,$=null,ye=null,ge=null;return{setReversed:function(ae){if(pe!==ae){const Fe=n.get("EXT_clip_control");ae?Fe.clipControlEXT(Fe.LOWER_LEFT_EXT,Fe.ZERO_TO_ONE_EXT):Fe.clipControlEXT(Fe.LOWER_LEFT_EXT,Fe.NEGATIVE_ONE_TO_ONE_EXT),pe=ae;const Ze=ge;ge=null,this.setClear(Ze)}},getReversed:function(){return pe},setTest:function(ae){ae?le(t.DEPTH_TEST):Be(t.DEPTH_TEST)},setMask:function(ae){$!==ae&&!D&&(t.depthMask(ae),$=ae)},setFunc:function(ae){if(pe&&(ae=Ac[ae]),ye!==ae){switch(ae){case pc:t.depthFunc(t.NEVER);break;case dc:t.depthFunc(t.ALWAYS);break;case fc:t.depthFunc(t.LESS);break;case Xs:t.depthFunc(t.LEQUAL);break;case uc:t.depthFunc(t.EQUAL);break;case lc:t.depthFunc(t.GEQUAL);break;case cc:t.depthFunc(t.GREATER);break;case rc:t.depthFunc(t.NOTEQUAL);break;default:t.depthFunc(t.LEQUAL)}ye=ae}},setLocked:function(ae){D=ae},setClear:function(ae){ge!==ae&&(ge=ae,pe&&(ae=1-ae),t.clearDepth(ae))},reset:function(){D=!1,$=null,ye=null,ge=null,pe=!1}}}function a(){let D=!1,pe=null,$=null,ye=null,ge=null,ae=null,Fe=null,Ze=null,Tt=null;return{setTest:function(ft){D||(ft?le(t.STENCIL_TEST):Be(t.STENCIL_TEST))},setMask:function(ft){pe!==ft&&!D&&(t.stencilMask(ft),pe=ft)},setFunc:function(ft,fn,en){($!==ft||ye!==fn||ge!==en)&&(t.stencilFunc(ft,fn,en),$=ft,ye=fn,ge=en)},setOp:function(ft,fn,en){(ae!==ft||Fe!==fn||Ze!==en)&&(t.stencilOp(ft,fn,en),ae=ft,Fe=fn,Ze=en)},setLocked:function(ft){D=ft},setClear:function(ft){Tt!==ft&&(t.clearStencil(ft),Tt=ft)},reset:function(){D=!1,pe=null,$=null,ye=null,ge=null,ae=null,Fe=null,Ze=null,Tt=null}}}const s=new e,o=new i,u=new a,f=new WeakMap,r=new WeakMap;let m={},_={},h={},v=new WeakMap,p=[],d=null,c=!1,l=null,g=null,E=null,x=null,R=null,T=null,w=null,S=new ue(0,0,0),A=0,C=!1,L=null,P=null,F=null,k=null,G=null;const O=t.getParameter(t.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let B=!1,J=0;const fe=t.getParameter(t.VERSION);fe.indexOf("WebGL")!==-1?(J=parseFloat(/^WebGL (\d)/.exec(fe)[1]),B=J>=1):fe.indexOf("OpenGL ES")!==-1&&(J=parseFloat(/^OpenGL ES (\d)/.exec(fe)[1]),B=J>=2);let xe=null,Oe={};const Ie=t.getParameter(t.SCISSOR_BOX),it=t.getParameter(t.VIEWPORT),Ke=new Ot().fromArray(Ie),We=new Ot().fromArray(it);function Z(D,pe,$,ye){const ge=new Uint8Array(4),ae=t.createTexture();t.bindTexture(D,ae),t.texParameteri(D,t.TEXTURE_MIN_FILTER,t.NEAREST),t.texParameteri(D,t.TEXTURE_MAG_FILTER,t.NEAREST);for(let Fe=0;Fe<$;Fe++)D===t.TEXTURE_3D||D===t.TEXTURE_2D_ARRAY?t.texImage3D(pe,0,t.RGBA,1,1,ye,0,t.RGBA,t.UNSIGNED_BYTE,ge):t.texImage2D(pe+Fe,0,t.RGBA,1,1,0,t.RGBA,t.UNSIGNED_BYTE,ge);return ae}const ve={};ve[t.TEXTURE_2D]=Z(t.TEXTURE_2D,t.TEXTURE_2D,1),ve[t.TEXTURE_CUBE_MAP]=Z(t.TEXTURE_CUBE_MAP,t.TEXTURE_CUBE_MAP_POSITIVE_X,6),ve[t.TEXTURE_2D_ARRAY]=Z(t.TEXTURE_2D_ARRAY,t.TEXTURE_2D_ARRAY,1,1),ve[t.TEXTURE_3D]=Z(t.TEXTURE_3D,t.TEXTURE_3D,1,1),s.setClear(0,0,0,1),o.setClear(1),u.setClear(0),le(t.DEPTH_TEST),o.setFunc(Xs),qe(!1),be(Ea),le(t.CULL_FACE),De(un);function le(D){m[D]!==!0&&(t.enable(D),m[D]=!0)}function Be(D){m[D]!==!1&&(t.disable(D),m[D]=!1)}function Xe(D,pe){return h[D]!==pe?(t.bindFramebuffer(D,pe),h[D]=pe,D===t.DRAW_FRAMEBUFFER&&(h[t.FRAMEBUFFER]=pe),D===t.FRAMEBUFFER&&(h[t.DRAW_FRAMEBUFFER]=pe),!0):!1}function Re(D,pe){let $=p,ye=!1;if(D){$=v.get(pe),$===void 0&&($=[],v.set(pe,$));const ge=D.textures;if($.length!==ge.length||$[0]!==t.COLOR_ATTACHMENT0){for(let ae=0,Fe=ge.length;ae<Fe;ae++)$[ae]=t.COLOR_ATTACHMENT0+ae;$.length=ge.length,ye=!0}}else $[0]!==t.BACK&&($[0]=t.BACK,ye=!0);ye&&t.drawBuffers($)}function Ne(D){return d!==D?(t.useProgram(D),d=D,!0):!1}const Ae={[Qn]:t.FUNC_ADD,[yr]:t.FUNC_SUBTRACT,[Ar]:t.FUNC_REVERSE_SUBTRACT};Ae[yc]=t.MIN,Ae[Cc]=t.MAX;const re={[zr]:t.ZERO,[Vr]:t.ONE,[kr]:t.SRC_COLOR,[Hr]:t.SRC_ALPHA,[Gr]:t.SRC_ALPHA_SATURATE,[Br]:t.DST_COLOR,[Or]:t.DST_ALPHA,[Fr]:t.ONE_MINUS_SRC_COLOR,[Nr]:t.ONE_MINUS_SRC_ALPHA,[Ur]:t.ONE_MINUS_DST_COLOR,[Ir]:t.ONE_MINUS_DST_ALPHA,[Dr]:t.CONSTANT_COLOR,[Pr]:t.ONE_MINUS_CONSTANT_COLOR,[Lr]:t.CONSTANT_ALPHA,[Cr]:t.ONE_MINUS_CONSTANT_ALPHA};function De(D,pe,$,ye,ge,ae,Fe,Ze,Tt,ft){if(D===un){c===!0&&(Be(t.BLEND),c=!1);return}if(c===!1&&(le(t.BLEND),c=!0),D!==_c){if(D!==l||ft!==C){if((g!==Qn||R!==Qn)&&(t.blendEquation(t.FUNC_ADD),g=Qn,R=Qn),ft)switch(D){case Ai:t.blendFuncSeparate(t.ONE,t.ONE_MINUS_SRC_ALPHA,t.ONE,t.ONE_MINUS_SRC_ALPHA);break;case hi:t.blendFunc(t.ONE,t.ONE);break;case wa:t.blendFuncSeparate(t.ZERO,t.ONE_MINUS_SRC_COLOR,t.ZERO,t.ONE);break;case Ta:t.blendFuncSeparate(t.DST_COLOR,t.ONE_MINUS_SRC_ALPHA,t.ZERO,t.ONE);break;default:gt("WebGLState: Invalid blending: ",D);break}else switch(D){case Ai:t.blendFuncSeparate(t.SRC_ALPHA,t.ONE_MINUS_SRC_ALPHA,t.ONE,t.ONE_MINUS_SRC_ALPHA);break;case hi:t.blendFuncSeparate(t.SRC_ALPHA,t.ONE,t.ONE,t.ONE);break;case wa:gt("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Ta:gt("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:gt("WebGLState: Invalid blending: ",D);break}E=null,x=null,T=null,w=null,S.set(0,0,0),A=0,l=D,C=ft}return}ge=ge||pe,ae=ae||$,Fe=Fe||ye,(pe!==g||ge!==R)&&(t.blendEquationSeparate(Ae[pe],Ae[ge]),g=pe,R=ge),($!==E||ye!==x||ae!==T||Fe!==w)&&(t.blendFuncSeparate(re[$],re[ye],re[ae],re[Fe]),E=$,x=ye,T=ae,w=Fe),(Ze.equals(S)===!1||Tt!==A)&&(t.blendColor(Ze.r,Ze.g,Ze.b,Tt),S.copy(Ze),A=Tt),l=D,C=!1}function we(D,pe){D.side===ct?Be(t.CULL_FACE):le(t.CULL_FACE);let $=D.side===Gt;pe&&($=!$),qe($),D.blending===Ai&&D.transparent===!1?De(un):De(D.blending,D.blendEquation,D.blendSrc,D.blendDst,D.blendEquationAlpha,D.blendSrcAlpha,D.blendDstAlpha,D.blendColor,D.blendAlpha,D.premultipliedAlpha),o.setFunc(D.depthFunc),o.setTest(D.depthTest),o.setMask(D.depthWrite),s.setMask(D.colorWrite);const ye=D.stencilWrite;u.setTest(ye),ye&&(u.setMask(D.stencilWriteMask),u.setFunc(D.stencilFunc,D.stencilRef,D.stencilFuncMask),u.setOp(D.stencilFail,D.stencilZFail,D.stencilZPass)),I(D.polygonOffset,D.polygonOffsetFactor,D.polygonOffsetUnits),D.alphaToCoverage===!0?le(t.SAMPLE_ALPHA_TO_COVERAGE):Be(t.SAMPLE_ALPHA_TO_COVERAGE)}function qe(D){L!==D&&(D?t.frontFace(t.CW):t.frontFace(t.CCW),L=D)}function be(D){D!==hc?(le(t.CULL_FACE),D!==P&&(D===Ea?t.cullFace(t.BACK):D===mc?t.cullFace(t.FRONT):t.cullFace(t.FRONT_AND_BACK))):Be(t.CULL_FACE),P=D}function Ve(D){D!==F&&(B&&t.lineWidth(D),F=D)}function I(D,pe,$){D?(le(t.POLYGON_OFFSET_FILL),(k!==pe||G!==$)&&(k=pe,G=$,o.getReversed()&&(pe=-pe),t.polygonOffset(pe,$))):Be(t.POLYGON_OFFSET_FILL)}function se(D){D?le(t.SCISSOR_TEST):Be(t.SCISSOR_TEST)}function oe(D){D===void 0&&(D=t.TEXTURE0+O-1),xe!==D&&(t.activeTexture(D),xe=D)}function He(D,pe,$){$===void 0&&(xe===null?$=t.TEXTURE0+O-1:$=xe);let ye=Oe[$];ye===void 0&&(ye={type:void 0,texture:void 0},Oe[$]=ye),(ye.type!==D||ye.texture!==pe)&&(xe!==$&&(t.activeTexture($),xe=$),t.bindTexture(D,pe||ve[D]),ye.type=D,ye.texture=pe)}function te(){const D=Oe[xe];D!==void 0&&D.type!==void 0&&(t.bindTexture(D.type,null),D.type=void 0,D.texture=void 0)}function $e(){try{t.compressedTexImage2D(...arguments)}catch(D){gt("WebGLState:",D)}}function y(){try{t.compressedTexImage3D(...arguments)}catch(D){gt("WebGLState:",D)}}function M(){try{t.texSubImage2D(...arguments)}catch(D){gt("WebGLState:",D)}}function H(){try{t.texSubImage3D(...arguments)}catch(D){gt("WebGLState:",D)}}function Y(){try{t.compressedTexSubImage2D(...arguments)}catch(D){gt("WebGLState:",D)}}function ne(){try{t.compressedTexSubImage3D(...arguments)}catch(D){gt("WebGLState:",D)}}function ce(){try{t.texStorage2D(...arguments)}catch(D){gt("WebGLState:",D)}}function me(){try{t.texStorage3D(...arguments)}catch(D){gt("WebGLState:",D)}}function X(){try{t.texImage2D(...arguments)}catch(D){gt("WebGLState:",D)}}function Q(){try{t.texImage3D(...arguments)}catch(D){gt("WebGLState:",D)}}function Te(D){return _[D]!==void 0?_[D]:t.getParameter(D)}function Le(D,pe){_[D]!==pe&&(t.pixelStorei(D,pe),_[D]=pe)}function _e(D){Ke.equals(D)===!1&&(t.scissor(D.x,D.y,D.z,D.w),Ke.copy(D))}function de(D){We.equals(D)===!1&&(t.viewport(D.x,D.y,D.z,D.w),We.copy(D))}function Ye(D,pe){let $=r.get(pe);$===void 0&&($=new WeakMap,r.set(pe,$));let ye=$.get(D);ye===void 0&&(ye=t.getUniformBlockIndex(pe,D.name),$.set(D,ye))}function Je(D,pe){const ye=r.get(pe).get(D);f.get(pe)!==ye&&(t.uniformBlockBinding(pe,ye,D.__bindingPointIndex),f.set(pe,ye))}function ot(){t.disable(t.BLEND),t.disable(t.CULL_FACE),t.disable(t.DEPTH_TEST),t.disable(t.POLYGON_OFFSET_FILL),t.disable(t.SCISSOR_TEST),t.disable(t.STENCIL_TEST),t.disable(t.SAMPLE_ALPHA_TO_COVERAGE),t.blendEquation(t.FUNC_ADD),t.blendFunc(t.ONE,t.ZERO),t.blendFuncSeparate(t.ONE,t.ZERO,t.ONE,t.ZERO),t.blendColor(0,0,0,0),t.colorMask(!0,!0,!0,!0),t.clearColor(0,0,0,0),t.depthMask(!0),t.depthFunc(t.LESS),o.setReversed(!1),t.clearDepth(1),t.stencilMask(4294967295),t.stencilFunc(t.ALWAYS,0,4294967295),t.stencilOp(t.KEEP,t.KEEP,t.KEEP),t.clearStencil(0),t.cullFace(t.BACK),t.frontFace(t.CCW),t.polygonOffset(0,0),t.activeTexture(t.TEXTURE0),t.bindFramebuffer(t.FRAMEBUFFER,null),t.bindFramebuffer(t.DRAW_FRAMEBUFFER,null),t.bindFramebuffer(t.READ_FRAMEBUFFER,null),t.useProgram(null),t.lineWidth(1),t.scissor(0,0,t.canvas.width,t.canvas.height),t.viewport(0,0,t.canvas.width,t.canvas.height),t.pixelStorei(t.PACK_ALIGNMENT,4),t.pixelStorei(t.UNPACK_ALIGNMENT,4),t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL,!1),t.pixelStorei(t.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),t.pixelStorei(t.UNPACK_COLORSPACE_CONVERSION_WEBGL,t.BROWSER_DEFAULT_WEBGL),t.pixelStorei(t.PACK_ROW_LENGTH,0),t.pixelStorei(t.PACK_SKIP_PIXELS,0),t.pixelStorei(t.PACK_SKIP_ROWS,0),t.pixelStorei(t.UNPACK_ROW_LENGTH,0),t.pixelStorei(t.UNPACK_IMAGE_HEIGHT,0),t.pixelStorei(t.UNPACK_SKIP_PIXELS,0),t.pixelStorei(t.UNPACK_SKIP_ROWS,0),t.pixelStorei(t.UNPACK_SKIP_IMAGES,0),m={},_={},xe=null,Oe={},h={},v=new WeakMap,p=[],d=null,c=!1,l=null,g=null,E=null,x=null,R=null,T=null,w=null,S=new ue(0,0,0),A=0,C=!1,L=null,P=null,F=null,k=null,G=null,Ke.set(0,0,t.canvas.width,t.canvas.height),We.set(0,0,t.canvas.width,t.canvas.height),s.reset(),o.reset(),u.reset()}return{buffers:{color:s,depth:o,stencil:u},enable:le,disable:Be,bindFramebuffer:Xe,drawBuffers:Re,useProgram:Ne,setBlending:De,setMaterial:we,setFlipSided:qe,setCullFace:be,setLineWidth:Ve,setPolygonOffset:I,setScissorTest:se,activeTexture:oe,bindTexture:He,unbindTexture:te,compressedTexImage2D:$e,compressedTexImage3D:y,texImage2D:X,texImage3D:Q,pixelStorei:Le,getParameter:Te,updateUBOMapping:Ye,uniformBlockBinding:Je,texStorage2D:ce,texStorage3D:me,texSubImage2D:M,texSubImage3D:H,compressedTexSubImage2D:Y,compressedTexSubImage3D:ne,scissor:_e,viewport:de,reset:ot}}function qp(t,n,e,i,a,s,o){const u=n.has("WEBGL_multisampled_render_to_texture")?n.get("WEBGL_multisampled_render_to_texture"):null,f=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),r=new ut,m=new WeakMap,_=new Set;let h;const v=new WeakMap;let p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function d(y,M){return p?new OffscreenCanvas(y,M):Tc("canvas")}function c(y,M,H){let Y=1;const ne=$e(y);if((ne.width>H||ne.height>H)&&(Y=H/Math.max(ne.width,ne.height)),Y<1)if(typeof HTMLImageElement<"u"&&y instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&y instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&y instanceof ImageBitmap||typeof VideoFrame<"u"&&y instanceof VideoFrame){const ce=Math.floor(Y*ne.width),me=Math.floor(Y*ne.height);h===void 0&&(h=d(ce,me));const X=M?d(ce,me):h;return X.width=ce,X.height=me,X.getContext("2d").drawImage(y,0,0,ce,me),rt("WebGLRenderer: Texture has been resized from ("+ne.width+"x"+ne.height+") to ("+ce+"x"+me+")."),X}else return"data"in y&&rt("WebGLRenderer: Image in DataTexture is too big ("+ne.width+"x"+ne.height+")."),y;return y}function l(y){return y.generateMipmaps}function g(y){t.generateMipmap(y)}function E(y){return y.isWebGLCubeRenderTarget?t.TEXTURE_CUBE_MAP:y.isWebGL3DRenderTarget?t.TEXTURE_3D:y.isWebGLArrayRenderTarget||y.isCompressedArrayTexture?t.TEXTURE_2D_ARRAY:t.TEXTURE_2D}function x(y,M,H,Y,ne,ce=!1){if(y!==null){if(t[y]!==void 0)return t[y];rt("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+y+"'")}let me;Y&&(me=n.get("EXT_texture_norm16"),me||rt("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let X=M;if(M===t.RED&&(H===t.FLOAT&&(X=t.R32F),H===t.HALF_FLOAT&&(X=t.R16F),H===t.UNSIGNED_BYTE&&(X=t.R8),H===t.UNSIGNED_SHORT&&me&&(X=me.R16_EXT),H===t.SHORT&&me&&(X=me.R16_SNORM_EXT)),M===t.RED_INTEGER&&(H===t.UNSIGNED_BYTE&&(X=t.R8UI),H===t.UNSIGNED_SHORT&&(X=t.R16UI),H===t.UNSIGNED_INT&&(X=t.R32UI),H===t.BYTE&&(X=t.R8I),H===t.SHORT&&(X=t.R16I),H===t.INT&&(X=t.R32I)),M===t.RG&&(H===t.FLOAT&&(X=t.RG32F),H===t.HALF_FLOAT&&(X=t.RG16F),H===t.UNSIGNED_BYTE&&(X=t.RG8),H===t.UNSIGNED_SHORT&&me&&(X=me.RG16_EXT),H===t.SHORT&&me&&(X=me.RG16_SNORM_EXT)),M===t.RG_INTEGER&&(H===t.UNSIGNED_BYTE&&(X=t.RG8UI),H===t.UNSIGNED_SHORT&&(X=t.RG16UI),H===t.UNSIGNED_INT&&(X=t.RG32UI),H===t.BYTE&&(X=t.RG8I),H===t.SHORT&&(X=t.RG16I),H===t.INT&&(X=t.RG32I)),M===t.RGB_INTEGER&&(H===t.UNSIGNED_BYTE&&(X=t.RGB8UI),H===t.UNSIGNED_SHORT&&(X=t.RGB16UI),H===t.UNSIGNED_INT&&(X=t.RGB32UI),H===t.BYTE&&(X=t.RGB8I),H===t.SHORT&&(X=t.RGB16I),H===t.INT&&(X=t.RGB32I)),M===t.RGBA_INTEGER&&(H===t.UNSIGNED_BYTE&&(X=t.RGBA8UI),H===t.UNSIGNED_SHORT&&(X=t.RGBA16UI),H===t.UNSIGNED_INT&&(X=t.RGBA32UI),H===t.BYTE&&(X=t.RGBA8I),H===t.SHORT&&(X=t.RGBA16I),H===t.INT&&(X=t.RGBA32I)),M===t.RGB&&(H===t.UNSIGNED_SHORT&&me&&(X=me.RGB16_EXT),H===t.SHORT&&me&&(X=me.RGB16_SNORM_EXT),H===t.UNSIGNED_INT_5_9_9_9_REV&&(X=t.RGB9_E5),H===t.UNSIGNED_INT_10F_11F_11F_REV&&(X=t.R11F_G11F_B10F)),M===t.RGBA){const Q=ce?Fo:vt.getTransfer(ne);H===t.FLOAT&&(X=t.RGBA32F),H===t.HALF_FLOAT&&(X=t.RGBA16F),H===t.UNSIGNED_BYTE&&(X=Q===mt?t.SRGB8_ALPHA8:t.RGBA8),H===t.UNSIGNED_SHORT&&me&&(X=me.RGBA16_EXT),H===t.SHORT&&me&&(X=me.RGBA16_SNORM_EXT),H===t.UNSIGNED_SHORT_4_4_4_4&&(X=t.RGBA4),H===t.UNSIGNED_SHORT_5_5_5_1&&(X=t.RGB5_A1)}return(X===t.R16F||X===t.R32F||X===t.RG16F||X===t.RG32F||X===t.RGBA16F||X===t.RGBA32F)&&n.get("EXT_color_buffer_float"),X}function R(y,M){let H;return y?M===null||M===Un||M===di?H=t.DEPTH24_STENCIL8:M===bn?H=t.DEPTH32F_STENCIL8:M===Pi&&(H=t.DEPTH24_STENCIL8,rt("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):M===null||M===Un||M===di?H=t.DEPTH_COMPONENT24:M===bn?H=t.DEPTH_COMPONENT32F:M===Pi&&(H=t.DEPTH_COMPONENT16),H}function T(y,M){return l(y)===!0||y.isFramebufferTexture&&y.minFilter!==mn&&y.minFilter!==Bt?Math.log2(Math.max(M.width,M.height))+1:y.mipmaps!==void 0&&y.mipmaps.length>0?y.mipmaps.length:y.isCompressedTexture&&Array.isArray(y.image)?M.mipmaps.length:1}function w(y){const M=y.target;M.removeEventListener("dispose",w),A(M),M.isVideoTexture&&m.delete(M),M.isHTMLTexture&&_.delete(M)}function S(y){const M=y.target;M.removeEventListener("dispose",S),L(M)}function A(y){const M=i.get(y);if(M.__webglInit===void 0)return;const H=y.source,Y=v.get(H);if(Y){const ne=Y[M.__cacheKey];ne.usedTimes--,ne.usedTimes===0&&C(y),Object.keys(Y).length===0&&v.delete(H)}i.remove(y)}function C(y){const M=i.get(y);t.deleteTexture(M.__webglTexture);const H=y.source,Y=v.get(H);delete Y[M.__cacheKey],o.memory.textures--}function L(y){const M=i.get(y);if(y.depthTexture&&(y.depthTexture.dispose(),i.remove(y.depthTexture)),y.isWebGLCubeRenderTarget)for(let Y=0;Y<6;Y++){if(Array.isArray(M.__webglFramebuffer[Y]))for(let ne=0;ne<M.__webglFramebuffer[Y].length;ne++)t.deleteFramebuffer(M.__webglFramebuffer[Y][ne]);else t.deleteFramebuffer(M.__webglFramebuffer[Y]);M.__webglDepthbuffer&&t.deleteRenderbuffer(M.__webglDepthbuffer[Y])}else{if(Array.isArray(M.__webglFramebuffer))for(let Y=0;Y<M.__webglFramebuffer.length;Y++)t.deleteFramebuffer(M.__webglFramebuffer[Y]);else t.deleteFramebuffer(M.__webglFramebuffer);if(M.__webglDepthbuffer&&t.deleteRenderbuffer(M.__webglDepthbuffer),M.__webglMultisampledFramebuffer&&t.deleteFramebuffer(M.__webglMultisampledFramebuffer),M.__webglColorRenderbuffer)for(let Y=0;Y<M.__webglColorRenderbuffer.length;Y++)M.__webglColorRenderbuffer[Y]&&t.deleteRenderbuffer(M.__webglColorRenderbuffer[Y]);M.__webglDepthRenderbuffer&&t.deleteRenderbuffer(M.__webglDepthRenderbuffer)}const H=y.textures;for(let Y=0,ne=H.length;Y<ne;Y++){const ce=i.get(H[Y]);ce.__webglTexture&&(t.deleteTexture(ce.__webglTexture),o.memory.textures--),i.remove(H[Y])}i.remove(y)}let P=0;function F(){P=0}function k(){return P}function G(y){P=y}function O(){const y=P;return y>=a.maxTextures&&rt("WebGLTextures: Trying to use "+y+" texture units while this GPU supports only "+a.maxTextures),P+=1,y}function B(y){const M=[];return M.push(y.wrapS),M.push(y.wrapT),M.push(y.wrapR||0),M.push(y.magFilter),M.push(y.minFilter),M.push(y.anisotropy),M.push(y.internalFormat),M.push(y.format),M.push(y.type),M.push(y.generateMipmaps),M.push(y.premultiplyAlpha),M.push(y.flipY),M.push(y.unpackAlignment),M.push(y.colorSpace),M.join()}function J(y,M){const H=i.get(y);if(y.isVideoTexture&&He(y),y.isRenderTargetTexture===!1&&y.isExternalTexture!==!0&&y.version>0&&H.__version!==y.version){const Y=y.image;if(Y===null)rt("WebGLRenderer: Texture marked for update but no image data found.");else if(Y.complete===!1)rt("WebGLRenderer: Texture marked for update but image is incomplete");else{Be(H,y,M);return}}else y.isExternalTexture&&(H.__webglTexture=y.sourceTexture?y.sourceTexture:null);e.bindTexture(t.TEXTURE_2D,H.__webglTexture,t.TEXTURE0+M)}function fe(y,M){const H=i.get(y);if(y.isRenderTargetTexture===!1&&y.version>0&&H.__version!==y.version){Be(H,y,M);return}else y.isExternalTexture&&(H.__webglTexture=y.sourceTexture?y.sourceTexture:null);e.bindTexture(t.TEXTURE_2D_ARRAY,H.__webglTexture,t.TEXTURE0+M)}function xe(y,M){const H=i.get(y);if(y.isRenderTargetTexture===!1&&y.version>0&&H.__version!==y.version){Be(H,y,M);return}e.bindTexture(t.TEXTURE_3D,H.__webglTexture,t.TEXTURE0+M)}function Oe(y,M){const H=i.get(y);if(y.isCubeDepthTexture!==!0&&y.version>0&&H.__version!==y.version){Xe(H,y,M);return}e.bindTexture(t.TEXTURE_CUBE_MAP,H.__webglTexture,t.TEXTURE0+M)}const Ie={[pi]:t.REPEAT,[Li]:t.CLAMP_TO_EDGE,[To]:t.MIRRORED_REPEAT},it={[mn]:t.NEAREST,[wo]:t.NEAREST_MIPMAP_NEAREST,[si]:t.NEAREST_MIPMAP_LINEAR,[Bt]:t.LINEAR,[Ri]:t.LINEAR_MIPMAP_NEAREST,[pn]:t.LINEAR_MIPMAP_LINEAR},Ke={[$r]:t.NEVER,[Yr]:t.ALWAYS,[qr]:t.LESS,[Rs]:t.LEQUAL,[Kr]:t.EQUAL,[bs]:t.GEQUAL,[Xr]:t.GREATER,[Wr]:t.NOTEQUAL};function We(y,M){if(M.type===bn&&n.has("OES_texture_float_linear")===!1&&(M.magFilter===Bt||M.magFilter===Ri||M.magFilter===si||M.magFilter===pn||M.minFilter===Bt||M.minFilter===Ri||M.minFilter===si||M.minFilter===pn)&&rt("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),t.texParameteri(y,t.TEXTURE_WRAP_S,Ie[M.wrapS]),t.texParameteri(y,t.TEXTURE_WRAP_T,Ie[M.wrapT]),(y===t.TEXTURE_3D||y===t.TEXTURE_2D_ARRAY)&&t.texParameteri(y,t.TEXTURE_WRAP_R,Ie[M.wrapR]),t.texParameteri(y,t.TEXTURE_MAG_FILTER,it[M.magFilter]),t.texParameteri(y,t.TEXTURE_MIN_FILTER,it[M.minFilter]),M.compareFunction&&(t.texParameteri(y,t.TEXTURE_COMPARE_MODE,t.COMPARE_REF_TO_TEXTURE),t.texParameteri(y,t.TEXTURE_COMPARE_FUNC,Ke[M.compareFunction])),n.has("EXT_texture_filter_anisotropic")===!0){if(M.magFilter===mn||M.minFilter!==si&&M.minFilter!==pn||M.type===bn&&n.has("OES_texture_float_linear")===!1)return;if(M.anisotropy>1||i.get(M).__currentAnisotropy){const H=n.get("EXT_texture_filter_anisotropic");t.texParameterf(y,H.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(M.anisotropy,a.getMaxAnisotropy())),i.get(M).__currentAnisotropy=M.anisotropy}}}function Z(y,M){let H=!1;y.__webglInit===void 0&&(y.__webglInit=!0,M.addEventListener("dispose",w));const Y=M.source;let ne=v.get(Y);ne===void 0&&(ne={},v.set(Y,ne));const ce=B(M);if(ce!==y.__cacheKey){ne[ce]===void 0&&(ne[ce]={texture:t.createTexture(),usedTimes:0},o.memory.textures++,H=!0),ne[ce].usedTimes++;const me=ne[y.__cacheKey];me!==void 0&&(ne[y.__cacheKey].usedTimes--,me.usedTimes===0&&C(M)),y.__cacheKey=ce,y.__webglTexture=ne[ce].texture}return H}function ve(y,M,H){return Math.floor(Math.floor(y/H)/M)}function le(y,M,H,Y){const ce=y.updateRanges;if(ce.length===0)e.texSubImage2D(t.TEXTURE_2D,0,0,0,M.width,M.height,H,Y,M.data);else{ce.sort((Le,_e)=>Le.start-_e.start);let me=0;for(let Le=1;Le<ce.length;Le++){const _e=ce[me],de=ce[Le],Ye=_e.start+_e.count,Je=ve(de.start,M.width,4),ot=ve(_e.start,M.width,4);de.start<=Ye+1&&Je===ot&&ve(de.start+de.count-1,M.width,4)===Je?_e.count=Math.max(_e.count,de.start+de.count-_e.start):(++me,ce[me]=de)}ce.length=me+1;const X=e.getParameter(t.UNPACK_ROW_LENGTH),Q=e.getParameter(t.UNPACK_SKIP_PIXELS),Te=e.getParameter(t.UNPACK_SKIP_ROWS);e.pixelStorei(t.UNPACK_ROW_LENGTH,M.width);for(let Le=0,_e=ce.length;Le<_e;Le++){const de=ce[Le],Ye=Math.floor(de.start/4),Je=Math.ceil(de.count/4),ot=Ye%M.width,D=Math.floor(Ye/M.width),pe=Je,$=1;e.pixelStorei(t.UNPACK_SKIP_PIXELS,ot),e.pixelStorei(t.UNPACK_SKIP_ROWS,D),e.texSubImage2D(t.TEXTURE_2D,0,ot,D,pe,$,H,Y,M.data)}y.clearUpdateRanges(),e.pixelStorei(t.UNPACK_ROW_LENGTH,X),e.pixelStorei(t.UNPACK_SKIP_PIXELS,Q),e.pixelStorei(t.UNPACK_SKIP_ROWS,Te)}}function Be(y,M,H){let Y=t.TEXTURE_2D;(M.isDataArrayTexture||M.isCompressedArrayTexture)&&(Y=t.TEXTURE_2D_ARRAY),M.isData3DTexture&&(Y=t.TEXTURE_3D);const ne=Z(y,M),ce=M.source;e.bindTexture(Y,y.__webglTexture,t.TEXTURE0+H);const me=i.get(ce);if(ce.version!==me.__version||ne===!0){if(e.activeTexture(t.TEXTURE0+H),(typeof ImageBitmap<"u"&&M.image instanceof ImageBitmap)===!1){const $=vt.getPrimaries(vt.workingColorSpace),ye=M.colorSpace===wn?null:vt.getPrimaries(M.colorSpace),ge=M.colorSpace===wn||$===ye?t.NONE:t.BROWSER_DEFAULT_WEBGL;e.pixelStorei(t.UNPACK_FLIP_Y_WEBGL,M.flipY),e.pixelStorei(t.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),e.pixelStorei(t.UNPACK_COLORSPACE_CONVERSION_WEBGL,ge)}e.pixelStorei(t.UNPACK_ALIGNMENT,M.unpackAlignment);let Q=c(M.image,!1,a.maxTextureSize);Q=te(M,Q);const Te=s.convert(M.format,M.colorSpace),Le=s.convert(M.type);let _e=x(M.internalFormat,Te,Le,M.normalized,M.colorSpace,M.isVideoTexture);We(Y,M);let de;const Ye=M.mipmaps,Je=M.isVideoTexture!==!0,ot=me.__version===void 0||ne===!0,D=ce.dataReady,pe=T(M,Q);if(M.isDepthTexture)_e=R(M.format===Gn,M.type),ot&&(Je?e.texStorage2D(t.TEXTURE_2D,1,_e,Q.width,Q.height):e.texImage2D(t.TEXTURE_2D,0,_e,Q.width,Q.height,0,Te,Le,null));else if(M.isDataTexture)if(Ye.length>0){Je&&ot&&e.texStorage2D(t.TEXTURE_2D,pe,_e,Ye[0].width,Ye[0].height);for(let $=0,ye=Ye.length;$<ye;$++)de=Ye[$],Je?D&&e.texSubImage2D(t.TEXTURE_2D,$,0,0,de.width,de.height,Te,Le,de.data):e.texImage2D(t.TEXTURE_2D,$,_e,de.width,de.height,0,Te,Le,de.data);M.generateMipmaps=!1}else Je?(ot&&e.texStorage2D(t.TEXTURE_2D,pe,_e,Q.width,Q.height),D&&le(M,Q,Te,Le)):e.texImage2D(t.TEXTURE_2D,0,_e,Q.width,Q.height,0,Te,Le,Q.data);else if(M.isCompressedTexture)if(M.isCompressedArrayTexture){Je&&ot&&e.texStorage3D(t.TEXTURE_2D_ARRAY,pe,_e,Ye[0].width,Ye[0].height,Q.depth);for(let $=0,ye=Ye.length;$<ye;$++)if(de=Ye[$],M.format!==hn)if(Te!==null)if(Je){if(D)if(M.layerUpdates.size>0){const ge=Ra(de.width,de.height,M.format,M.type);for(const ae of M.layerUpdates){const Fe=de.data.subarray(ae*ge/de.data.BYTES_PER_ELEMENT,(ae+1)*ge/de.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(t.TEXTURE_2D_ARRAY,$,0,0,ae,de.width,de.height,1,Te,Fe)}M.clearLayerUpdates()}else e.compressedTexSubImage3D(t.TEXTURE_2D_ARRAY,$,0,0,0,de.width,de.height,Q.depth,Te,de.data)}else e.compressedTexImage3D(t.TEXTURE_2D_ARRAY,$,_e,de.width,de.height,Q.depth,0,de.data,0,0);else rt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Je?D&&e.texSubImage3D(t.TEXTURE_2D_ARRAY,$,0,0,0,de.width,de.height,Q.depth,Te,Le,de.data):e.texImage3D(t.TEXTURE_2D_ARRAY,$,_e,de.width,de.height,Q.depth,0,Te,Le,de.data)}else{Je&&ot&&e.texStorage2D(t.TEXTURE_2D,pe,_e,Ye[0].width,Ye[0].height);for(let $=0,ye=Ye.length;$<ye;$++)de=Ye[$],M.format!==hn?Te!==null?Je?D&&e.compressedTexSubImage2D(t.TEXTURE_2D,$,0,0,de.width,de.height,Te,de.data):e.compressedTexImage2D(t.TEXTURE_2D,$,_e,de.width,de.height,0,de.data):rt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Je?D&&e.texSubImage2D(t.TEXTURE_2D,$,0,0,de.width,de.height,Te,Le,de.data):e.texImage2D(t.TEXTURE_2D,$,_e,de.width,de.height,0,Te,Le,de.data)}else if(M.isDataArrayTexture)if(Je){if(ot&&e.texStorage3D(t.TEXTURE_2D_ARRAY,pe,_e,Q.width,Q.height,Q.depth),D)if(M.layerUpdates.size>0){const $=Ra(Q.width,Q.height,M.format,M.type);for(const ye of M.layerUpdates){const ge=Q.data.subarray(ye*$/Q.data.BYTES_PER_ELEMENT,(ye+1)*$/Q.data.BYTES_PER_ELEMENT);e.texSubImage3D(t.TEXTURE_2D_ARRAY,0,0,0,ye,Q.width,Q.height,1,Te,Le,ge)}M.clearLayerUpdates()}else e.texSubImage3D(t.TEXTURE_2D_ARRAY,0,0,0,0,Q.width,Q.height,Q.depth,Te,Le,Q.data)}else e.texImage3D(t.TEXTURE_2D_ARRAY,0,_e,Q.width,Q.height,Q.depth,0,Te,Le,Q.data);else if(M.isData3DTexture)Je?(ot&&e.texStorage3D(t.TEXTURE_3D,pe,_e,Q.width,Q.height,Q.depth),D&&e.texSubImage3D(t.TEXTURE_3D,0,0,0,0,Q.width,Q.height,Q.depth,Te,Le,Q.data)):e.texImage3D(t.TEXTURE_3D,0,_e,Q.width,Q.height,Q.depth,0,Te,Le,Q.data);else if(M.isFramebufferTexture){if(ot)if(Je)e.texStorage2D(t.TEXTURE_2D,pe,_e,Q.width,Q.height);else{let $=Q.width,ye=Q.height;for(let ge=0;ge<pe;ge++)e.texImage2D(t.TEXTURE_2D,ge,_e,$,ye,0,Te,Le,null),$>>=1,ye>>=1}}else if(M.isHTMLTexture){if("texElementImage2D"in t){const $=t.canvas;if($.hasAttribute("layoutsubtree")||$.setAttribute("layoutsubtree","true"),Q.parentNode!==$){$.appendChild(Q),_.add(M),$.onpaint=Ze=>{const Tt=Ze.changedElements;for(const ft of _)Tt.includes(ft.image)&&(ft.needsUpdate=!0)},$.requestPaint();return}const ye=0,ge=t.RGBA,ae=t.RGBA,Fe=t.UNSIGNED_BYTE;t.texElementImage2D(t.TEXTURE_2D,ye,ge,ae,Fe,Q),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.CLAMP_TO_EDGE),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,t.CLAMP_TO_EDGE)}}else if(Ye.length>0){if(Je&&ot){const $=$e(Ye[0]);e.texStorage2D(t.TEXTURE_2D,pe,_e,$.width,$.height)}for(let $=0,ye=Ye.length;$<ye;$++)de=Ye[$],Je?D&&e.texSubImage2D(t.TEXTURE_2D,$,0,0,Te,Le,de):e.texImage2D(t.TEXTURE_2D,$,_e,Te,Le,de);M.generateMipmaps=!1}else if(Je){if(ot){const $=$e(Q);e.texStorage2D(t.TEXTURE_2D,pe,_e,$.width,$.height)}D&&e.texSubImage2D(t.TEXTURE_2D,0,0,0,Te,Le,Q)}else e.texImage2D(t.TEXTURE_2D,0,_e,Te,Le,Q);l(M)&&g(Y),me.__version=ce.version,M.onUpdate&&M.onUpdate(M)}y.__version=M.version}function Xe(y,M,H){if(M.image.length!==6)return;const Y=Z(y,M),ne=M.source;e.bindTexture(t.TEXTURE_CUBE_MAP,y.__webglTexture,t.TEXTURE0+H);const ce=i.get(ne);if(ne.version!==ce.__version||Y===!0){e.activeTexture(t.TEXTURE0+H);const me=vt.getPrimaries(vt.workingColorSpace),X=M.colorSpace===wn?null:vt.getPrimaries(M.colorSpace),Q=M.colorSpace===wn||me===X?t.NONE:t.BROWSER_DEFAULT_WEBGL;e.pixelStorei(t.UNPACK_FLIP_Y_WEBGL,M.flipY),e.pixelStorei(t.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),e.pixelStorei(t.UNPACK_ALIGNMENT,M.unpackAlignment),e.pixelStorei(t.UNPACK_COLORSPACE_CONVERSION_WEBGL,Q);const Te=M.isCompressedTexture||M.image[0].isCompressedTexture,Le=M.image[0]&&M.image[0].isDataTexture,_e=[];for(let ae=0;ae<6;ae++)!Te&&!Le?_e[ae]=c(M.image[ae],!0,a.maxCubemapSize):_e[ae]=Le?M.image[ae].image:M.image[ae],_e[ae]=te(M,_e[ae]);const de=_e[0],Ye=s.convert(M.format,M.colorSpace),Je=s.convert(M.type),ot=x(M.internalFormat,Ye,Je,M.normalized,M.colorSpace),D=M.isVideoTexture!==!0,pe=ce.__version===void 0||Y===!0,$=ne.dataReady;let ye=T(M,de);We(t.TEXTURE_CUBE_MAP,M);let ge;if(Te){D&&pe&&e.texStorage2D(t.TEXTURE_CUBE_MAP,ye,ot,de.width,de.height);for(let ae=0;ae<6;ae++){ge=_e[ae].mipmaps;for(let Fe=0;Fe<ge.length;Fe++){const Ze=ge[Fe];M.format!==hn?Ye!==null?D?$&&e.compressedTexSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+ae,Fe,0,0,Ze.width,Ze.height,Ye,Ze.data):e.compressedTexImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+ae,Fe,ot,Ze.width,Ze.height,0,Ze.data):rt("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):D?$&&e.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+ae,Fe,0,0,Ze.width,Ze.height,Ye,Je,Ze.data):e.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+ae,Fe,ot,Ze.width,Ze.height,0,Ye,Je,Ze.data)}}}else{if(ge=M.mipmaps,D&&pe){ge.length>0&&ye++;const ae=$e(_e[0]);e.texStorage2D(t.TEXTURE_CUBE_MAP,ye,ot,ae.width,ae.height)}for(let ae=0;ae<6;ae++)if(Le){D?$&&e.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+ae,0,0,0,_e[ae].width,_e[ae].height,Ye,Je,_e[ae].data):e.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+ae,0,ot,_e[ae].width,_e[ae].height,0,Ye,Je,_e[ae].data);for(let Fe=0;Fe<ge.length;Fe++){const Tt=ge[Fe].image[ae].image;D?$&&e.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+ae,Fe+1,0,0,Tt.width,Tt.height,Ye,Je,Tt.data):e.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+ae,Fe+1,ot,Tt.width,Tt.height,0,Ye,Je,Tt.data)}}else{D?$&&e.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+ae,0,0,0,Ye,Je,_e[ae]):e.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+ae,0,ot,Ye,Je,_e[ae]);for(let Fe=0;Fe<ge.length;Fe++){const Ze=ge[Fe];D?$&&e.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+ae,Fe+1,0,0,Ye,Je,Ze.image[ae]):e.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+ae,Fe+1,ot,Ye,Je,Ze.image[ae])}}}l(M)&&g(t.TEXTURE_CUBE_MAP),ce.__version=ne.version,M.onUpdate&&M.onUpdate(M)}y.__version=M.version}function Re(y,M,H,Y,ne,ce){const me=s.convert(H.format,H.colorSpace),X=s.convert(H.type),Q=x(H.internalFormat,me,X,H.normalized,H.colorSpace),Te=i.get(M),Le=i.get(H);if(Le.__renderTarget=M,!Te.__hasExternalTextures){const _e=Math.max(1,M.width>>ce),de=Math.max(1,M.height>>ce);ne===t.TEXTURE_3D||ne===t.TEXTURE_2D_ARRAY?e.texImage3D(ne,ce,Q,_e,de,M.depth,0,me,X,null):e.texImage2D(ne,ce,Q,_e,de,0,me,X,null)}e.bindFramebuffer(t.FRAMEBUFFER,y),oe(M)?u.framebufferTexture2DMultisampleEXT(t.FRAMEBUFFER,Y,ne,Le.__webglTexture,0,se(M)):(ne===t.TEXTURE_2D||ne>=t.TEXTURE_CUBE_MAP_POSITIVE_X&&ne<=t.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&t.framebufferTexture2D(t.FRAMEBUFFER,Y,ne,Le.__webglTexture,ce),e.bindFramebuffer(t.FRAMEBUFFER,null)}function Ne(y,M,H){if(t.bindRenderbuffer(t.RENDERBUFFER,y),M.depthBuffer){const Y=M.depthTexture,ne=Y&&Y.isDepthTexture?Y.type:null,ce=R(M.stencilBuffer,ne),me=M.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT;oe(M)?u.renderbufferStorageMultisampleEXT(t.RENDERBUFFER,se(M),ce,M.width,M.height):H?t.renderbufferStorageMultisample(t.RENDERBUFFER,se(M),ce,M.width,M.height):t.renderbufferStorage(t.RENDERBUFFER,ce,M.width,M.height),t.framebufferRenderbuffer(t.FRAMEBUFFER,me,t.RENDERBUFFER,y)}else{const Y=M.textures;for(let ne=0;ne<Y.length;ne++){const ce=Y[ne],me=s.convert(ce.format,ce.colorSpace),X=s.convert(ce.type),Q=x(ce.internalFormat,me,X,ce.normalized,ce.colorSpace);oe(M)?u.renderbufferStorageMultisampleEXT(t.RENDERBUFFER,se(M),Q,M.width,M.height):H?t.renderbufferStorageMultisample(t.RENDERBUFFER,se(M),Q,M.width,M.height):t.renderbufferStorage(t.RENDERBUFFER,Q,M.width,M.height)}}t.bindRenderbuffer(t.RENDERBUFFER,null)}function Ae(y,M,H){const Y=M.isWebGLCubeRenderTarget===!0;if(e.bindFramebuffer(t.FRAMEBUFFER,y),!(M.depthTexture&&M.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const ne=i.get(M.depthTexture);if(ne.__renderTarget=M,(!ne.__webglTexture||M.depthTexture.image.width!==M.width||M.depthTexture.image.height!==M.height)&&(M.depthTexture.image.width=M.width,M.depthTexture.image.height=M.height,M.depthTexture.needsUpdate=!0),Y){if(ne.__webglInit===void 0&&(ne.__webglInit=!0,M.depthTexture.addEventListener("dispose",w)),ne.__webglTexture===void 0){ne.__webglTexture=t.createTexture(),e.bindTexture(t.TEXTURE_CUBE_MAP,ne.__webglTexture),We(t.TEXTURE_CUBE_MAP,M.depthTexture);const Te=s.convert(M.depthTexture.format),Le=s.convert(M.depthTexture.type);let _e;M.depthTexture.format===Xn?_e=t.DEPTH_COMPONENT24:M.depthTexture.format===Gn&&(_e=t.DEPTH24_STENCIL8);for(let de=0;de<6;de++)t.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+de,0,_e,M.width,M.height,0,Te,Le,null)}}else J(M.depthTexture,0);const ce=ne.__webglTexture,me=se(M),X=Y?t.TEXTURE_CUBE_MAP_POSITIVE_X+H:t.TEXTURE_2D,Q=M.depthTexture.format===Gn?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT;if(M.depthTexture.format===Xn)oe(M)?u.framebufferTexture2DMultisampleEXT(t.FRAMEBUFFER,Q,X,ce,0,me):t.framebufferTexture2D(t.FRAMEBUFFER,Q,X,ce,0);else if(M.depthTexture.format===Gn)oe(M)?u.framebufferTexture2DMultisampleEXT(t.FRAMEBUFFER,Q,X,ce,0,me):t.framebufferTexture2D(t.FRAMEBUFFER,Q,X,ce,0);else throw new Error("Unknown depthTexture format")}function re(y){const M=i.get(y),H=y.isWebGLCubeRenderTarget===!0;if(M.__boundDepthTexture!==y.depthTexture){const Y=y.depthTexture;if(M.__depthDisposeCallback&&M.__depthDisposeCallback(),Y){const ne=()=>{delete M.__boundDepthTexture,delete M.__depthDisposeCallback,Y.removeEventListener("dispose",ne)};Y.addEventListener("dispose",ne),M.__depthDisposeCallback=ne}M.__boundDepthTexture=Y}if(y.depthTexture&&!M.__autoAllocateDepthBuffer)if(H)for(let Y=0;Y<6;Y++)Ae(M.__webglFramebuffer[Y],y,Y);else{const Y=y.texture.mipmaps;Y&&Y.length>0?Ae(M.__webglFramebuffer[0],y,0):Ae(M.__webglFramebuffer,y,0)}else if(H){M.__webglDepthbuffer=[];for(let Y=0;Y<6;Y++)if(e.bindFramebuffer(t.FRAMEBUFFER,M.__webglFramebuffer[Y]),M.__webglDepthbuffer[Y]===void 0)M.__webglDepthbuffer[Y]=t.createRenderbuffer(),Ne(M.__webglDepthbuffer[Y],y,!1);else{const ne=y.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT,ce=M.__webglDepthbuffer[Y];t.bindRenderbuffer(t.RENDERBUFFER,ce),t.framebufferRenderbuffer(t.FRAMEBUFFER,ne,t.RENDERBUFFER,ce)}}else{const Y=y.texture.mipmaps;if(Y&&Y.length>0?e.bindFramebuffer(t.FRAMEBUFFER,M.__webglFramebuffer[0]):e.bindFramebuffer(t.FRAMEBUFFER,M.__webglFramebuffer),M.__webglDepthbuffer===void 0)M.__webglDepthbuffer=t.createRenderbuffer(),Ne(M.__webglDepthbuffer,y,!1);else{const ne=y.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT,ce=M.__webglDepthbuffer;t.bindRenderbuffer(t.RENDERBUFFER,ce),t.framebufferRenderbuffer(t.FRAMEBUFFER,ne,t.RENDERBUFFER,ce)}}e.bindFramebuffer(t.FRAMEBUFFER,null)}function De(y,M,H){const Y=i.get(y);M!==void 0&&Re(Y.__webglFramebuffer,y,y.texture,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,0),H!==void 0&&re(y)}function we(y){const M=y.texture,H=i.get(y),Y=i.get(M);y.addEventListener("dispose",S);const ne=y.textures,ce=y.isWebGLCubeRenderTarget===!0,me=ne.length>1;if(me||(Y.__webglTexture===void 0&&(Y.__webglTexture=t.createTexture()),Y.__version=M.version,o.memory.textures++),ce){H.__webglFramebuffer=[];for(let X=0;X<6;X++)if(M.mipmaps&&M.mipmaps.length>0){H.__webglFramebuffer[X]=[];for(let Q=0;Q<M.mipmaps.length;Q++)H.__webglFramebuffer[X][Q]=t.createFramebuffer()}else H.__webglFramebuffer[X]=t.createFramebuffer()}else{if(M.mipmaps&&M.mipmaps.length>0){H.__webglFramebuffer=[];for(let X=0;X<M.mipmaps.length;X++)H.__webglFramebuffer[X]=t.createFramebuffer()}else H.__webglFramebuffer=t.createFramebuffer();if(me)for(let X=0,Q=ne.length;X<Q;X++){const Te=i.get(ne[X]);Te.__webglTexture===void 0&&(Te.__webglTexture=t.createTexture(),o.memory.textures++)}if(y.samples>0&&oe(y)===!1){H.__webglMultisampledFramebuffer=t.createFramebuffer(),H.__webglColorRenderbuffer=[],e.bindFramebuffer(t.FRAMEBUFFER,H.__webglMultisampledFramebuffer);for(let X=0;X<ne.length;X++){const Q=ne[X];H.__webglColorRenderbuffer[X]=t.createRenderbuffer(),t.bindRenderbuffer(t.RENDERBUFFER,H.__webglColorRenderbuffer[X]);const Te=s.convert(Q.format,Q.colorSpace),Le=s.convert(Q.type),_e=x(Q.internalFormat,Te,Le,Q.normalized,Q.colorSpace,y.isXRRenderTarget===!0),de=se(y);t.renderbufferStorageMultisample(t.RENDERBUFFER,de,_e,y.width,y.height),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0+X,t.RENDERBUFFER,H.__webglColorRenderbuffer[X])}t.bindRenderbuffer(t.RENDERBUFFER,null),y.depthBuffer&&(H.__webglDepthRenderbuffer=t.createRenderbuffer(),Ne(H.__webglDepthRenderbuffer,y,!0)),e.bindFramebuffer(t.FRAMEBUFFER,null)}}if(ce){e.bindTexture(t.TEXTURE_CUBE_MAP,Y.__webglTexture),We(t.TEXTURE_CUBE_MAP,M);for(let X=0;X<6;X++)if(M.mipmaps&&M.mipmaps.length>0)for(let Q=0;Q<M.mipmaps.length;Q++)Re(H.__webglFramebuffer[X][Q],y,M,t.COLOR_ATTACHMENT0,t.TEXTURE_CUBE_MAP_POSITIVE_X+X,Q);else Re(H.__webglFramebuffer[X],y,M,t.COLOR_ATTACHMENT0,t.TEXTURE_CUBE_MAP_POSITIVE_X+X,0);l(M)&&g(t.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(me){for(let X=0,Q=ne.length;X<Q;X++){const Te=ne[X],Le=i.get(Te);let _e=t.TEXTURE_2D;(y.isWebGL3DRenderTarget||y.isWebGLArrayRenderTarget)&&(_e=y.isWebGL3DRenderTarget?t.TEXTURE_3D:t.TEXTURE_2D_ARRAY),e.bindTexture(_e,Le.__webglTexture),We(_e,Te),Re(H.__webglFramebuffer,y,Te,t.COLOR_ATTACHMENT0+X,_e,0),l(Te)&&g(_e)}e.unbindTexture()}else{let X=t.TEXTURE_2D;if((y.isWebGL3DRenderTarget||y.isWebGLArrayRenderTarget)&&(X=y.isWebGL3DRenderTarget?t.TEXTURE_3D:t.TEXTURE_2D_ARRAY),e.bindTexture(X,Y.__webglTexture),We(X,M),M.mipmaps&&M.mipmaps.length>0)for(let Q=0;Q<M.mipmaps.length;Q++)Re(H.__webglFramebuffer[Q],y,M,t.COLOR_ATTACHMENT0,X,Q);else Re(H.__webglFramebuffer,y,M,t.COLOR_ATTACHMENT0,X,0);l(M)&&g(X),e.unbindTexture()}y.depthBuffer&&re(y)}function qe(y){const M=y.textures;for(let H=0,Y=M.length;H<Y;H++){const ne=M[H];if(l(ne)){const ce=E(y),me=i.get(ne).__webglTexture;e.bindTexture(ce,me),g(ce),e.unbindTexture()}}}const be=[],Ve=[];function I(y){if(y.samples>0){if(oe(y)===!1){const M=y.textures,H=y.width,Y=y.height;let ne=t.COLOR_BUFFER_BIT;const ce=y.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT,me=i.get(y),X=M.length>1;if(X)for(let Te=0;Te<M.length;Te++)e.bindFramebuffer(t.FRAMEBUFFER,me.__webglMultisampledFramebuffer),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0+Te,t.RENDERBUFFER,null),e.bindFramebuffer(t.FRAMEBUFFER,me.__webglFramebuffer),t.framebufferTexture2D(t.DRAW_FRAMEBUFFER,t.COLOR_ATTACHMENT0+Te,t.TEXTURE_2D,null,0);e.bindFramebuffer(t.READ_FRAMEBUFFER,me.__webglMultisampledFramebuffer);const Q=y.texture.mipmaps;Q&&Q.length>0?e.bindFramebuffer(t.DRAW_FRAMEBUFFER,me.__webglFramebuffer[0]):e.bindFramebuffer(t.DRAW_FRAMEBUFFER,me.__webglFramebuffer);for(let Te=0;Te<M.length;Te++){if(y.resolveDepthBuffer&&(y.depthBuffer&&(ne|=t.DEPTH_BUFFER_BIT),y.stencilBuffer&&y.resolveStencilBuffer&&(ne|=t.STENCIL_BUFFER_BIT)),X){t.framebufferRenderbuffer(t.READ_FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.RENDERBUFFER,me.__webglColorRenderbuffer[Te]);const Le=i.get(M[Te]).__webglTexture;t.framebufferTexture2D(t.DRAW_FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,Le,0)}t.blitFramebuffer(0,0,H,Y,0,0,H,Y,ne,t.NEAREST),f===!0&&(be.length=0,Ve.length=0,be.push(t.COLOR_ATTACHMENT0+Te),y.depthBuffer&&y.resolveDepthBuffer===!1&&(be.push(ce),Ve.push(ce),t.invalidateFramebuffer(t.DRAW_FRAMEBUFFER,Ve)),t.invalidateFramebuffer(t.READ_FRAMEBUFFER,be))}if(e.bindFramebuffer(t.READ_FRAMEBUFFER,null),e.bindFramebuffer(t.DRAW_FRAMEBUFFER,null),X)for(let Te=0;Te<M.length;Te++){e.bindFramebuffer(t.FRAMEBUFFER,me.__webglMultisampledFramebuffer),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0+Te,t.RENDERBUFFER,me.__webglColorRenderbuffer[Te]);const Le=i.get(M[Te]).__webglTexture;e.bindFramebuffer(t.FRAMEBUFFER,me.__webglFramebuffer),t.framebufferTexture2D(t.DRAW_FRAMEBUFFER,t.COLOR_ATTACHMENT0+Te,t.TEXTURE_2D,Le,0)}e.bindFramebuffer(t.DRAW_FRAMEBUFFER,me.__webglMultisampledFramebuffer)}else if(y.depthBuffer&&y.resolveDepthBuffer===!1&&f){const M=y.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT;t.invalidateFramebuffer(t.DRAW_FRAMEBUFFER,[M])}}}function se(y){return Math.min(a.maxSamples,y.samples)}function oe(y){const M=i.get(y);return y.samples>0&&n.has("WEBGL_multisampled_render_to_texture")===!0&&M.__useRenderToTexture!==!1}function He(y){const M=o.render.frame;m.get(y)!==M&&(m.set(y,M),y.update())}function te(y,M){const H=y.colorSpace,Y=y.format,ne=y.type;return y.isCompressedTexture===!0||y.isVideoTexture===!0||H!==Jt&&H!==wn&&(vt.getTransfer(H)===mt?(Y!==hn||ne!==rn)&&rt("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):gt("WebGLTextures: Unsupported texture color space:",H)),M}function $e(y){return typeof HTMLImageElement<"u"&&y instanceof HTMLImageElement?(r.width=y.naturalWidth||y.width,r.height=y.naturalHeight||y.height):typeof VideoFrame<"u"&&y instanceof VideoFrame?(r.width=y.displayWidth,r.height=y.displayHeight):(r.width=y.width,r.height=y.height),r}this.allocateTextureUnit=O,this.resetTextureUnits=F,this.getTextureUnits=k,this.setTextureUnits=G,this.setTexture2D=J,this.setTexture2DArray=fe,this.setTexture3D=xe,this.setTextureCube=Oe,this.rebindTextures=De,this.setupRenderTarget=we,this.updateRenderTargetMipmap=qe,this.updateMultisampleRenderTarget=I,this.setupDepthRenderbuffer=re,this.setupFrameBufferTexture=Re,this.useMultisampledRTT=oe,this.isReversedDepthBuffer=function(){return e.buffers.depth.getReversed()}}function Yp(t,n){function e(i,a=wn){let s;const o=vt.getTransfer(a);if(i===rn)return t.UNSIGNED_BYTE;if(i===Co)return t.UNSIGNED_SHORT_4_4_4_4;if(i===Lo)return t.UNSIGNED_SHORT_5_5_5_1;if(i===ec)return t.UNSIGNED_INT_5_9_9_9_REV;if(i===tc)return t.UNSIGNED_INT_10F_11F_11F_REV;if(i===nc)return t.BYTE;if(i===ic)return t.SHORT;if(i===Pi)return t.UNSIGNED_SHORT;if(i===Do)return t.INT;if(i===Un)return t.UNSIGNED_INT;if(i===bn)return t.FLOAT;if(i===qt)return t.HALF_FLOAT;if(i===sc)return t.ALPHA;if(i===ac)return t.RGB;if(i===hn)return t.RGBA;if(i===Xn)return t.DEPTH_COMPONENT;if(i===Gn)return t.DEPTH_STENCIL;if(i===oc)return t.RED;if(i===yo)return t.RED_INTEGER;if(i===Kn)return t.RG;if(i===Ao)return t.RG_INTEGER;if(i===Ro)return t.RGBA_INTEGER;if(i===Vi||i===zi||i===Wi||i===Xi)if(o===mt)if(s=n.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(i===Vi)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===zi)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===Wi)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===Xi)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=n.get("WEBGL_compressed_texture_s3tc"),s!==null){if(i===Vi)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===zi)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===Wi)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===Xi)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===Ks||i===qs||i===Ys||i===$s)if(s=n.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(i===Ks)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===qs)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===Ys)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===$s)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===js||i===Zs||i===Qs||i===Js||i===ea||i===fs||i===ta)if(s=n.get("WEBGL_compressed_texture_etc"),s!==null){if(i===js||i===Zs)return o===mt?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(i===Qs)return o===mt?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC;if(i===Js)return s.COMPRESSED_R11_EAC;if(i===ea)return s.COMPRESSED_SIGNED_R11_EAC;if(i===fs)return s.COMPRESSED_RG11_EAC;if(i===ta)return s.COMPRESSED_SIGNED_RG11_EAC}else return null;if(i===na||i===ia||i===sa||i===aa||i===oa||i===ra||i===ca||i===la||i===ua||i===fa||i===da||i===pa||i===ha||i===ma)if(s=n.get("WEBGL_compressed_texture_astc"),s!==null){if(i===na)return o===mt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===ia)return o===mt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===sa)return o===mt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===aa)return o===mt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===oa)return o===mt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===ra)return o===mt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===ca)return o===mt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===la)return o===mt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===ua)return o===mt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===fa)return o===mt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===da)return o===mt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===pa)return o===mt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===ha)return o===mt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===ma)return o===mt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===_a||i===ga||i===va)if(s=n.get("EXT_texture_compression_bptc"),s!==null){if(i===_a)return o===mt?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===ga)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===va)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===xa||i===Sa||i===ds||i===Ma)if(s=n.get("EXT_texture_compression_rgtc"),s!==null){if(i===xa)return s.COMPRESSED_RED_RGTC1_EXT;if(i===Sa)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===ds)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===Ma)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===di?t.UNSIGNED_INT_24_8:t[i]!==void 0?t[i]:null}return{convert:e}}const $p=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,jp=`
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

}`;class Zp{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(n,e){if(this.texture===null){const i=new Po(n.texture);(n.depthNear!==e.depthNear||n.depthFar!==e.depthFar)&&(this.depthNear=n.depthNear,this.depthFar=n.depthFar),this.texture=i}}getMesh(n){if(this.texture!==null&&this.mesh===null){const e=n.cameras[0].viewport,i=new Dt({vertexShader:$p,fragmentShader:jp,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new U(new Vt(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class Qp extends Er{constructor(n,e){super();const i=this;let a=null,s=1,o=null,u="local-floor",f=1,r=null,m=null,_=null,h=null,v=null,p=null;const d=typeof XRWebGLBinding<"u",c=new Zp,l={},g=e.getContextAttributes();let E=null,x=null;const R=[],T=[],w=new ut;let S=null;const A=new Hn;A.viewport=new Ot;const C=new Hn;C.viewport=new Ot;const L=[A,C],P=new Tr;let F=null,k=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Z){let ve=R[Z];return ve===void 0&&(ve=new ki,R[Z]=ve),ve.getTargetRaySpace()},this.getControllerGrip=function(Z){let ve=R[Z];return ve===void 0&&(ve=new ki,R[Z]=ve),ve.getGripSpace()},this.getHand=function(Z){let ve=R[Z];return ve===void 0&&(ve=new ki,R[Z]=ve),ve.getHandSpace()};function G(Z){const ve=T.indexOf(Z.inputSource);if(ve===-1)return;const le=R[ve];le!==void 0&&(le.update(Z.inputSource,Z.frame,r||o),le.dispatchEvent({type:Z.type,data:Z.inputSource}))}function O(){a.removeEventListener("select",G),a.removeEventListener("selectstart",G),a.removeEventListener("selectend",G),a.removeEventListener("squeeze",G),a.removeEventListener("squeezestart",G),a.removeEventListener("squeezeend",G),a.removeEventListener("end",O),a.removeEventListener("inputsourceschange",B);for(let Z=0;Z<R.length;Z++){const ve=T[Z];ve!==null&&(T[Z]=null,R[Z].disconnect(ve))}F=null,k=null,c.reset();for(const Z in l)delete l[Z];n.setRenderTarget(E),v=null,h=null,_=null,a=null,x=null,We.stop(),i.isPresenting=!1,n.setPixelRatio(S),n.setSize(w.width,w.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Z){s=Z,i.isPresenting===!0&&rt("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Z){u=Z,i.isPresenting===!0&&rt("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return r||o},this.setReferenceSpace=function(Z){r=Z},this.getBaseLayer=function(){return h!==null?h:v},this.getBinding=function(){return _===null&&d&&(_=new XRWebGLBinding(a,e)),_},this.getFrame=function(){return p},this.getSession=function(){return a},this.setSession=async function(Z){if(a=Z,a!==null){if(E=n.getRenderTarget(),a.addEventListener("select",G),a.addEventListener("selectstart",G),a.addEventListener("selectend",G),a.addEventListener("squeeze",G),a.addEventListener("squeezestart",G),a.addEventListener("squeezeend",G),a.addEventListener("end",O),a.addEventListener("inputsourceschange",B),g.xrCompatible!==!0&&await e.makeXRCompatible(),S=n.getPixelRatio(),n.getSize(w),d&&"createProjectionLayer"in XRWebGLBinding.prototype){let le=null,Be=null,Xe=null;g.depth&&(Xe=g.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,le=g.stencil?Gn:Xn,Be=g.stencil?di:Un);const Re={colorFormat:e.RGBA8,depthFormat:Xe,scaleFactor:s};_=this.getBinding(),h=_.createProjectionLayer(Re),a.updateRenderState({layers:[h]}),n.setPixelRatio(1),n.setSize(h.textureWidth,h.textureHeight,!1),x=new zt(h.textureWidth,h.textureHeight,{format:hn,type:rn,depthTexture:new fi(h.textureWidth,h.textureHeight,Be,void 0,void 0,void 0,void 0,void 0,void 0,le),stencilBuffer:g.stencil,colorSpace:n.outputColorSpace,samples:g.antialias?4:0,resolveDepthBuffer:h.ignoreDepthValues===!1,resolveStencilBuffer:h.ignoreDepthValues===!1})}else{const le={antialias:g.antialias,alpha:!0,depth:g.depth,stencil:g.stencil,framebufferScaleFactor:s};v=new XRWebGLLayer(a,e,le),a.updateRenderState({baseLayer:v}),n.setPixelRatio(1),n.setSize(v.framebufferWidth,v.framebufferHeight,!1),x=new zt(v.framebufferWidth,v.framebufferHeight,{format:hn,type:rn,colorSpace:n.outputColorSpace,stencilBuffer:g.stencil,resolveDepthBuffer:v.ignoreDepthValues===!1,resolveStencilBuffer:v.ignoreDepthValues===!1})}x.isXRRenderTarget=!0,this.setFoveation(f),r=null,o=await a.requestReferenceSpace(u),We.setContext(a),We.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(a!==null)return a.environmentBlendMode},this.getDepthTexture=function(){return c.getDepthTexture()};function B(Z){for(let ve=0;ve<Z.removed.length;ve++){const le=Z.removed[ve],Be=T.indexOf(le);Be>=0&&(T[Be]=null,R[Be].disconnect(le))}for(let ve=0;ve<Z.added.length;ve++){const le=Z.added[ve];let Be=T.indexOf(le);if(Be===-1){for(let Re=0;Re<R.length;Re++)if(Re>=T.length){T.push(le),Be=Re;break}else if(T[Re]===null){T[Re]=le,Be=Re;break}if(Be===-1)break}const Xe=R[Be];Xe&&Xe.connect(le)}}const J=new j,fe=new j;function xe(Z,ve,le){J.setFromMatrixPosition(ve.matrixWorld),fe.setFromMatrixPosition(le.matrixWorld);const Be=J.distanceTo(fe),Xe=ve.projectionMatrix.elements,Re=le.projectionMatrix.elements,Ne=Xe[14]/(Xe[10]-1),Ae=Xe[14]/(Xe[10]+1),re=(Xe[9]+1)/Xe[5],De=(Xe[9]-1)/Xe[5],we=(Xe[8]-1)/Xe[0],qe=(Re[8]+1)/Re[0],be=Ne*we,Ve=Ne*qe,I=Be/(-we+qe),se=I*-we;if(ve.matrixWorld.decompose(Z.position,Z.quaternion,Z.scale),Z.translateX(se),Z.translateZ(I),Z.matrixWorld.compose(Z.position,Z.quaternion,Z.scale),Z.matrixWorldInverse.copy(Z.matrixWorld).invert(),Xe[10]===-1)Z.projectionMatrix.copy(ve.projectionMatrix),Z.projectionMatrixInverse.copy(ve.projectionMatrixInverse);else{const oe=Ne+I,He=Ae+I,te=be-se,$e=Ve+(Be-se),y=re*Ae/He*oe,M=De*Ae/He*oe;Z.projectionMatrix.makePerspective(te,$e,y,M,oe,He),Z.projectionMatrixInverse.copy(Z.projectionMatrix).invert()}}function Oe(Z,ve){ve===null?Z.matrixWorld.copy(Z.matrix):Z.matrixWorld.multiplyMatrices(ve.matrixWorld,Z.matrix),Z.matrixWorldInverse.copy(Z.matrixWorld).invert()}this.updateCamera=function(Z){if(a===null)return;let ve=Z.near,le=Z.far;c.texture!==null&&(c.depthNear>0&&(ve=c.depthNear),c.depthFar>0&&(le=c.depthFar)),P.near=C.near=A.near=ve,P.far=C.far=A.far=le,(F!==P.near||k!==P.far)&&(a.updateRenderState({depthNear:P.near,depthFar:P.far}),F=P.near,k=P.far),P.layers.mask=Z.layers.mask|6,A.layers.mask=P.layers.mask&-5,C.layers.mask=P.layers.mask&-3;const Be=Z.parent,Xe=P.cameras;Oe(P,Be);for(let Re=0;Re<Xe.length;Re++)Oe(Xe[Re],Be);Xe.length===2?xe(P,A,C):P.projectionMatrix.copy(A.projectionMatrix),Ie(Z,P,Be)};function Ie(Z,ve,le){le===null?Z.matrix.copy(ve.matrixWorld):(Z.matrix.copy(le.matrixWorld),Z.matrix.invert(),Z.matrix.multiply(ve.matrixWorld)),Z.matrix.decompose(Z.position,Z.quaternion,Z.scale),Z.updateMatrixWorld(!0),Z.projectionMatrix.copy(ve.projectionMatrix),Z.projectionMatrixInverse.copy(ve.projectionMatrixInverse),Z.isPerspectiveCamera&&(Z.fov=wr*2*Math.atan(1/Z.projectionMatrix.elements[5]),Z.zoom=1)}this.getCamera=function(){return P},this.getFoveation=function(){if(!(h===null&&v===null))return f},this.setFoveation=function(Z){f=Z,h!==null&&(h.fixedFoveation=Z),v!==null&&v.fixedFoveation!==void 0&&(v.fixedFoveation=Z)},this.hasDepthSensing=function(){return c.texture!==null},this.getDepthSensingMesh=function(){return c.getMesh(P)},this.getCameraTexture=function(Z){return l[Z]};let it=null;function Ke(Z,ve){if(m=ve.getViewerPose(r||o),p=ve,m!==null){const le=m.views;v!==null&&(n.setRenderTargetFramebuffer(x,v.framebuffer),n.setRenderTarget(x));let Be=!1;le.length!==P.cameras.length&&(P.cameras.length=0,Be=!0);for(let Ae=0;Ae<le.length;Ae++){const re=le[Ae];let De=null;if(v!==null)De=v.getViewport(re);else{const qe=_.getViewSubImage(h,re);De=qe.viewport,Ae===0&&(n.setRenderTargetTextures(x,qe.colorTexture,qe.depthStencilTexture),n.setRenderTarget(x))}let we=L[Ae];we===void 0&&(we=new Hn,we.layers.enable(Ae),we.viewport=new Ot,L[Ae]=we),we.matrix.fromArray(re.transform.matrix),we.matrix.decompose(we.position,we.quaternion,we.scale),we.projectionMatrix.fromArray(re.projectionMatrix),we.projectionMatrixInverse.copy(we.projectionMatrix).invert(),we.viewport.set(De.x,De.y,De.width,De.height),Ae===0&&(P.matrix.copy(we.matrix),P.matrix.decompose(P.position,P.quaternion,P.scale)),Be===!0&&P.cameras.push(we)}const Xe=a.enabledFeatures;if(Xe&&Xe.includes("depth-sensing")&&a.depthUsage=="gpu-optimized"&&d){_=i.getBinding();const Ae=_.getDepthInformation(le[0]);Ae&&Ae.isValid&&Ae.texture&&c.init(Ae,a.renderState)}if(Xe&&Xe.includes("camera-access")&&d){n.state.unbindTexture(),_=i.getBinding();for(let Ae=0;Ae<le.length;Ae++){const re=le[Ae].camera;if(re){let De=l[re];De||(De=new Po,l[re]=De);const we=_.getCameraImage(re);De.sourceTexture=we}}}}for(let le=0;le<R.length;le++){const Be=T[le],Xe=R[le];Be!==null&&Xe!==void 0&&Xe.update(Be,ve,r||o)}it&&it(Z,ve),ve.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:ve}),p=null}const We=new zo;We.setAnimationLoop(Ke),this.setAnimationLoop=function(Z){it=Z},this.dispose=function(){}}}const Jp=new At,jo=new st;jo.set(-1,0,0,0,1,0,0,0,1);function eh(t,n){function e(c,l){c.matrixAutoUpdate===!0&&c.updateMatrix(),l.value.copy(c.matrix)}function i(c,l){l.color.getRGB(c.fogColor.value,Uo(t)),l.isFog?(c.fogNear.value=l.near,c.fogFar.value=l.far):l.isFogExp2&&(c.fogDensity.value=l.density)}function a(c,l,g,E,x){l.isNodeMaterial?l.uniformsNeedUpdate=!1:l.isMeshBasicMaterial?s(c,l):l.isMeshLambertMaterial?(s(c,l),l.envMap&&(c.envMapIntensity.value=l.envMapIntensity)):l.isMeshToonMaterial?(s(c,l),_(c,l)):l.isMeshPhongMaterial?(s(c,l),m(c,l),l.envMap&&(c.envMapIntensity.value=l.envMapIntensity)):l.isMeshStandardMaterial?(s(c,l),h(c,l),l.isMeshPhysicalMaterial&&v(c,l,x)):l.isMeshMatcapMaterial?(s(c,l),p(c,l)):l.isMeshDepthMaterial?s(c,l):l.isMeshDistanceMaterial?(s(c,l),d(c,l)):l.isMeshNormalMaterial?s(c,l):l.isLineBasicMaterial?(o(c,l),l.isLineDashedMaterial&&u(c,l)):l.isPointsMaterial?f(c,l,g,E):l.isSpriteMaterial?r(c,l):l.isShadowMaterial?(c.color.value.copy(l.color),c.opacity.value=l.opacity):l.isShaderMaterial&&(l.uniformsNeedUpdate=!1)}function s(c,l){c.opacity.value=l.opacity,l.color&&c.diffuse.value.copy(l.color),l.emissive&&c.emissive.value.copy(l.emissive).multiplyScalar(l.emissiveIntensity),l.map&&(c.map.value=l.map,e(l.map,c.mapTransform)),l.alphaMap&&(c.alphaMap.value=l.alphaMap,e(l.alphaMap,c.alphaMapTransform)),l.bumpMap&&(c.bumpMap.value=l.bumpMap,e(l.bumpMap,c.bumpMapTransform),c.bumpScale.value=l.bumpScale,l.side===Gt&&(c.bumpScale.value*=-1)),l.normalMap&&(c.normalMap.value=l.normalMap,e(l.normalMap,c.normalMapTransform),c.normalScale.value.copy(l.normalScale),l.side===Gt&&c.normalScale.value.negate()),l.displacementMap&&(c.displacementMap.value=l.displacementMap,e(l.displacementMap,c.displacementMapTransform),c.displacementScale.value=l.displacementScale,c.displacementBias.value=l.displacementBias),l.emissiveMap&&(c.emissiveMap.value=l.emissiveMap,e(l.emissiveMap,c.emissiveMapTransform)),l.specularMap&&(c.specularMap.value=l.specularMap,e(l.specularMap,c.specularMapTransform)),l.alphaTest>0&&(c.alphaTest.value=l.alphaTest);const g=n.get(l),E=g.envMap,x=g.envMapRotation;E&&(c.envMap.value=E,c.envMapRotation.value.setFromMatrix4(Jp.makeRotationFromEuler(x)).transpose(),E.isCubeTexture&&E.isRenderTargetTexture===!1&&c.envMapRotation.value.premultiply(jo),c.reflectivity.value=l.reflectivity,c.ior.value=l.ior,c.refractionRatio.value=l.refractionRatio),l.lightMap&&(c.lightMap.value=l.lightMap,c.lightMapIntensity.value=l.lightMapIntensity,e(l.lightMap,c.lightMapTransform)),l.aoMap&&(c.aoMap.value=l.aoMap,c.aoMapIntensity.value=l.aoMapIntensity,e(l.aoMap,c.aoMapTransform))}function o(c,l){c.diffuse.value.copy(l.color),c.opacity.value=l.opacity,l.map&&(c.map.value=l.map,e(l.map,c.mapTransform))}function u(c,l){c.dashSize.value=l.dashSize,c.totalSize.value=l.dashSize+l.gapSize,c.scale.value=l.scale}function f(c,l,g,E){c.diffuse.value.copy(l.color),c.opacity.value=l.opacity,c.size.value=l.size*g,c.scale.value=E*.5,l.map&&(c.map.value=l.map,e(l.map,c.uvTransform)),l.alphaMap&&(c.alphaMap.value=l.alphaMap,e(l.alphaMap,c.alphaMapTransform)),l.alphaTest>0&&(c.alphaTest.value=l.alphaTest)}function r(c,l){c.diffuse.value.copy(l.color),c.opacity.value=l.opacity,c.rotation.value=l.rotation,l.map&&(c.map.value=l.map,e(l.map,c.mapTransform)),l.alphaMap&&(c.alphaMap.value=l.alphaMap,e(l.alphaMap,c.alphaMapTransform)),l.alphaTest>0&&(c.alphaTest.value=l.alphaTest)}function m(c,l){c.specular.value.copy(l.specular),c.shininess.value=Math.max(l.shininess,1e-4)}function _(c,l){l.gradientMap&&(c.gradientMap.value=l.gradientMap)}function h(c,l){c.metalness.value=l.metalness,l.metalnessMap&&(c.metalnessMap.value=l.metalnessMap,e(l.metalnessMap,c.metalnessMapTransform)),c.roughness.value=l.roughness,l.roughnessMap&&(c.roughnessMap.value=l.roughnessMap,e(l.roughnessMap,c.roughnessMapTransform)),l.envMap&&(c.envMapIntensity.value=l.envMapIntensity)}function v(c,l,g){c.ior.value=l.ior,l.sheen>0&&(c.sheenColor.value.copy(l.sheenColor).multiplyScalar(l.sheen),c.sheenRoughness.value=l.sheenRoughness,l.sheenColorMap&&(c.sheenColorMap.value=l.sheenColorMap,e(l.sheenColorMap,c.sheenColorMapTransform)),l.sheenRoughnessMap&&(c.sheenRoughnessMap.value=l.sheenRoughnessMap,e(l.sheenRoughnessMap,c.sheenRoughnessMapTransform))),l.clearcoat>0&&(c.clearcoat.value=l.clearcoat,c.clearcoatRoughness.value=l.clearcoatRoughness,l.clearcoatMap&&(c.clearcoatMap.value=l.clearcoatMap,e(l.clearcoatMap,c.clearcoatMapTransform)),l.clearcoatRoughnessMap&&(c.clearcoatRoughnessMap.value=l.clearcoatRoughnessMap,e(l.clearcoatRoughnessMap,c.clearcoatRoughnessMapTransform)),l.clearcoatNormalMap&&(c.clearcoatNormalMap.value=l.clearcoatNormalMap,e(l.clearcoatNormalMap,c.clearcoatNormalMapTransform),c.clearcoatNormalScale.value.copy(l.clearcoatNormalScale),l.side===Gt&&c.clearcoatNormalScale.value.negate())),l.dispersion>0&&(c.dispersion.value=l.dispersion),l.iridescence>0&&(c.iridescence.value=l.iridescence,c.iridescenceIOR.value=l.iridescenceIOR,c.iridescenceThicknessMinimum.value=l.iridescenceThicknessRange[0],c.iridescenceThicknessMaximum.value=l.iridescenceThicknessRange[1],l.iridescenceMap&&(c.iridescenceMap.value=l.iridescenceMap,e(l.iridescenceMap,c.iridescenceMapTransform)),l.iridescenceThicknessMap&&(c.iridescenceThicknessMap.value=l.iridescenceThicknessMap,e(l.iridescenceThicknessMap,c.iridescenceThicknessMapTransform))),l.transmission>0&&(c.transmission.value=l.transmission,c.transmissionSamplerMap.value=g.texture,c.transmissionSamplerSize.value.set(g.width,g.height),l.transmissionMap&&(c.transmissionMap.value=l.transmissionMap,e(l.transmissionMap,c.transmissionMapTransform)),c.thickness.value=l.thickness,l.thicknessMap&&(c.thicknessMap.value=l.thicknessMap,e(l.thicknessMap,c.thicknessMapTransform)),c.attenuationDistance.value=l.attenuationDistance,c.attenuationColor.value.copy(l.attenuationColor)),l.anisotropy>0&&(c.anisotropyVector.value.set(l.anisotropy*Math.cos(l.anisotropyRotation),l.anisotropy*Math.sin(l.anisotropyRotation)),l.anisotropyMap&&(c.anisotropyMap.value=l.anisotropyMap,e(l.anisotropyMap,c.anisotropyMapTransform))),c.specularIntensity.value=l.specularIntensity,c.specularColor.value.copy(l.specularColor),l.specularColorMap&&(c.specularColorMap.value=l.specularColorMap,e(l.specularColorMap,c.specularColorMapTransform)),l.specularIntensityMap&&(c.specularIntensityMap.value=l.specularIntensityMap,e(l.specularIntensityMap,c.specularIntensityMapTransform))}function p(c,l){l.matcap&&(c.matcap.value=l.matcap)}function d(c,l){const g=n.get(l).light;c.referencePosition.value.setFromMatrixPosition(g.matrixWorld),c.nearDistance.value=g.shadow.camera.near,c.farDistance.value=g.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:a}}function th(t,n,e,i){let a={},s={},o=[];const u=t.getParameter(t.MAX_UNIFORM_BUFFER_BINDINGS);function f(g,E){const x=E.program;i.uniformBlockBinding(g,x)}function r(g,E){let x=a[g.id];x===void 0&&(p(g),x=m(g),a[g.id]=x,g.addEventListener("dispose",c));const R=E.program;i.updateUBOMapping(g,R);const T=n.render.frame;s[g.id]!==T&&(h(g),s[g.id]=T)}function m(g){const E=_();g.__bindingPointIndex=E;const x=t.createBuffer(),R=g.__size,T=g.usage;return t.bindBuffer(t.UNIFORM_BUFFER,x),t.bufferData(t.UNIFORM_BUFFER,R,T),t.bindBuffer(t.UNIFORM_BUFFER,null),t.bindBufferBase(t.UNIFORM_BUFFER,E,x),x}function _(){for(let g=0;g<u;g++)if(o.indexOf(g)===-1)return o.push(g),g;return gt("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function h(g){const E=a[g.id],x=g.uniforms,R=g.__cache;t.bindBuffer(t.UNIFORM_BUFFER,E);for(let T=0,w=x.length;T<w;T++){const S=Array.isArray(x[T])?x[T]:[x[T]];for(let A=0,C=S.length;A<C;A++){const L=S[A];if(v(L,T,A,R)===!0){const P=L.__offset,F=Array.isArray(L.value)?L.value:[L.value];let k=0;for(let G=0;G<F.length;G++){const O=F[G],B=d(O);typeof O=="number"||typeof O=="boolean"?(L.__data[0]=O,t.bufferSubData(t.UNIFORM_BUFFER,P+k,L.__data)):O.isMatrix3?(L.__data[0]=O.elements[0],L.__data[1]=O.elements[1],L.__data[2]=O.elements[2],L.__data[3]=0,L.__data[4]=O.elements[3],L.__data[5]=O.elements[4],L.__data[6]=O.elements[5],L.__data[7]=0,L.__data[8]=O.elements[6],L.__data[9]=O.elements[7],L.__data[10]=O.elements[8],L.__data[11]=0):ArrayBuffer.isView(O)?L.__data.set(new O.constructor(O.buffer,O.byteOffset,L.__data.length)):(O.toArray(L.__data,k),k+=B.storage/Float32Array.BYTES_PER_ELEMENT)}t.bufferSubData(t.UNIFORM_BUFFER,P,L.__data)}}}t.bindBuffer(t.UNIFORM_BUFFER,null)}function v(g,E,x,R){const T=g.value,w=E+"_"+x;if(R[w]===void 0)return typeof T=="number"||typeof T=="boolean"?R[w]=T:ArrayBuffer.isView(T)?R[w]=T.slice():R[w]=T.clone(),!0;{const S=R[w];if(typeof T=="number"||typeof T=="boolean"){if(S!==T)return R[w]=T,!0}else{if(ArrayBuffer.isView(T))return!0;if(S.equals(T)===!1)return S.copy(T),!0}}return!1}function p(g){const E=g.uniforms;let x=0;const R=16;for(let w=0,S=E.length;w<S;w++){const A=Array.isArray(E[w])?E[w]:[E[w]];for(let C=0,L=A.length;C<L;C++){const P=A[C],F=Array.isArray(P.value)?P.value:[P.value];for(let k=0,G=F.length;k<G;k++){const O=F[k],B=d(O),J=x%R,fe=J%B.boundary,xe=J+fe;x+=fe,xe!==0&&R-xe<B.storage&&(x+=R-xe),P.__data=new Float32Array(B.storage/Float32Array.BYTES_PER_ELEMENT),P.__offset=x,x+=B.storage}}}const T=x%R;return T>0&&(x+=R-T),g.__size=x,g.__cache={},this}function d(g){const E={boundary:0,storage:0};return typeof g=="number"||typeof g=="boolean"?(E.boundary=4,E.storage=4):g.isVector2?(E.boundary=8,E.storage=8):g.isVector3||g.isColor?(E.boundary=16,E.storage=12):g.isVector4?(E.boundary=16,E.storage=16):g.isMatrix3?(E.boundary=48,E.storage=48):g.isMatrix4?(E.boundary=64,E.storage=64):g.isTexture?rt("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(g)?(E.boundary=16,E.storage=g.byteLength):rt("WebGLRenderer: Unsupported uniform value type.",g),E}function c(g){const E=g.target;E.removeEventListener("dispose",c);const x=o.indexOf(E.__bindingPointIndex);o.splice(x,1),t.deleteBuffer(a[E.id]),delete a[E.id],delete s[E.id]}function l(){for(const g in a)t.deleteBuffer(a[g]);o=[],a={},s={}}return{bind:f,update:r,dispose:l}}const nh=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let nn=null;function ih(){return nn===null&&(nn=new br(nh,16,16,Kn,qt),nn.name="DFG_LUT",nn.minFilter=Bt,nn.magFilter=Bt,nn.wrapS=Li,nn.wrapT=Li,nn.generateMipmaps=!1,nn.needsUpdate=!0),nn}class sh{constructor(n={}){const{canvas:e=xr(),context:i=null,depth:a=!0,stencil:s=!1,alpha:o=!1,antialias:u=!1,premultipliedAlpha:f=!0,preserveDrawingBuffer:r=!1,powerPreference:m="default",failIfMajorPerformanceCaveat:_=!1,reversedDepthBuffer:h=!1,outputBufferType:v=rn}=n;this.isWebGLRenderer=!0;let p;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");p=i.getContextAttributes().alpha}else p=o;const d=v,c=new Set([Ro,Ao,yo]),l=new Set([rn,Un,Pi,di,Co,Lo]),g=new Uint32Array(4),E=new Int32Array(4),x=new j;let R=null,T=null;const w=[],S=[];let A=null;this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=ln,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const C=this;let L=!1,P=null;this._outputColorSpace=Ct;let F=0,k=0,G=null,O=-1,B=null;const J=new Ot,fe=new Ot;let xe=null;const Oe=new ue(0);let Ie=0,it=e.width,Ke=e.height,We=1,Z=null,ve=null;const le=new Ot(0,0,it,Ke),Be=new Ot(0,0,it,Ke);let Xe=!1;const Re=new Mo;let Ne=!1,Ae=!1;const re=new At,De=new j,we=new Ot,qe={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let be=!1;function Ve(){return G===null?We:1}let I=i;function se(b,N){return e.getContext(b,N)}try{const b={alpha:!0,depth:a,stencil:s,antialias:u,premultipliedAlpha:f,preserveDrawingBuffer:r,powerPreference:m,failIfMajorPerformanceCaveat:_};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${Sr}`),e.addEventListener("webglcontextlost",ae,!1),e.addEventListener("webglcontextrestored",Fe,!1),e.addEventListener("webglcontextcreationerror",Ze,!1),I===null){const N="webgl2";if(I=se(N,b),I===null)throw se(N)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(b){throw gt("WebGLRenderer: "+b.message),b}let oe,He,te,$e,y,M,H,Y,ne,ce,me,X,Q,Te,Le,_e,de,Ye,Je,ot,D,pe,$;function ye(){oe=new id(I),oe.init(),D=new Yp(I,oe),He=new $f(I,oe,n,D),te=new Kp(I,oe),He.reversedDepthBuffer&&h&&te.buffers.depth.setReversed(!0),$e=new od(I),y=new Dp,M=new qp(I,oe,te,y,He,D,$e),H=new nd(C),Y=new ll(I),pe=new qf(I,Y),ne=new sd(I,Y,$e,pe),ce=new cd(I,ne,Y,pe,$e),Ye=new rd(I,He,M),Le=new jf(y),me=new Pp(C,H,oe,He,pe,Le),X=new eh(C,y),Q=new Up,Te=new Hp(oe),de=new Kf(C,H,te,ce,p,f),_e=new Xp(C,ce,He),$=new th(I,$e,He,te),Je=new Yf(I,oe,$e),ot=new ad(I,oe,$e),$e.programs=me.programs,C.capabilities=He,C.extensions=oe,C.properties=y,C.renderLists=Q,C.shadowMap=_e,C.state=te,C.info=$e}ye(),d!==rn&&(A=new ud(d,e.width,e.height,a,s));const ge=new Qp(C,I);this.xr=ge,this.getContext=function(){return I},this.getContextAttributes=function(){return I.getContextAttributes()},this.forceContextLoss=function(){const b=oe.get("WEBGL_lose_context");b&&b.loseContext()},this.forceContextRestore=function(){const b=oe.get("WEBGL_lose_context");b&&b.restoreContext()},this.getPixelRatio=function(){return We},this.setPixelRatio=function(b){b!==void 0&&(We=b,this.setSize(it,Ke,!1))},this.getSize=function(b){return b.set(it,Ke)},this.setSize=function(b,N,W=!0){if(ge.isPresenting){rt("WebGLRenderer: Can't change size while VR device is presenting.");return}it=b,Ke=N,e.width=Math.floor(b*We),e.height=Math.floor(N*We),W===!0&&(e.style.width=b+"px",e.style.height=N+"px"),A!==null&&A.setSize(e.width,e.height),this.setViewport(0,0,b,N)},this.getDrawingBufferSize=function(b){return b.set(it*We,Ke*We).floor()},this.setDrawingBufferSize=function(b,N,W){it=b,Ke=N,We=W,e.width=Math.floor(b*W),e.height=Math.floor(N*W),this.setViewport(0,0,b,N)},this.setEffects=function(b){if(d===rn){gt("THREE.WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(b){for(let N=0;N<b.length;N++)if(b[N].isOutputPass===!0){rt("THREE.WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}A.setEffects(b||[])},this.getCurrentViewport=function(b){return b.copy(J)},this.getViewport=function(b){return b.copy(le)},this.setViewport=function(b,N,W,V){b.isVector4?le.set(b.x,b.y,b.z,b.w):le.set(b,N,W,V),te.viewport(J.copy(le).multiplyScalar(We).round())},this.getScissor=function(b){return b.copy(Be)},this.setScissor=function(b,N,W,V){b.isVector4?Be.set(b.x,b.y,b.z,b.w):Be.set(b,N,W,V),te.scissor(fe.copy(Be).multiplyScalar(We).round())},this.getScissorTest=function(){return Xe},this.setScissorTest=function(b){te.setScissorTest(Xe=b)},this.setOpaqueSort=function(b){Z=b},this.setTransparentSort=function(b){ve=b},this.getClearColor=function(b){return b.copy(de.getClearColor())},this.setClearColor=function(){de.setClearColor(...arguments)},this.getClearAlpha=function(){return de.getClearAlpha()},this.setClearAlpha=function(){de.setClearAlpha(...arguments)},this.clear=function(b=!0,N=!0,W=!0){let V=0;if(b){let z=!1;if(G!==null){const Ee=G.texture.format;z=c.has(Ee)}if(z){const Ee=G.texture.type,Pe=l.has(Ee),Me=de.getClearColor(),Ue=de.getClearAlpha(),Ge=Me.r,Qe=Me.g,tt=Me.b;Pe?(g[0]=Ge,g[1]=Qe,g[2]=tt,g[3]=Ue,I.clearBufferuiv(I.COLOR,0,g)):(E[0]=Ge,E[1]=Qe,E[2]=tt,E[3]=Ue,I.clearBufferiv(I.COLOR,0,E))}else V|=I.COLOR_BUFFER_BIT}N&&(V|=I.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),W&&(V|=I.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),V!==0&&I.clear(V)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(b){b.setRenderer(this),P=b},this.dispose=function(){e.removeEventListener("webglcontextlost",ae,!1),e.removeEventListener("webglcontextrestored",Fe,!1),e.removeEventListener("webglcontextcreationerror",Ze,!1),de.dispose(),Q.dispose(),Te.dispose(),y.dispose(),H.dispose(),ce.dispose(),pe.dispose(),$.dispose(),me.dispose(),ge.dispose(),ge.removeEventListener("sessionstart",Ns),ge.removeEventListener("sessionend",Fs),yn.stop()};function ae(b){b.preventDefault(),zs("WebGLRenderer: Context Lost."),L=!0}function Fe(){zs("WebGLRenderer: Context Restored."),L=!1;const b=$e.autoReset,N=_e.enabled,W=_e.autoUpdate,V=_e.needsUpdate,z=_e.type;ye(),$e.autoReset=b,_e.enabled=N,_e.autoUpdate=W,_e.needsUpdate=V,_e.type=z}function Ze(b){gt("WebGLRenderer: A WebGL context could not be created. Reason: ",b.statusMessage)}function Tt(b){const N=b.target;N.removeEventListener("dispose",Tt),ft(N)}function ft(b){fn(b),y.remove(b)}function fn(b){const N=y.get(b).programs;N!==void 0&&(N.forEach(function(W){me.releaseProgram(W)}),b.isShaderMaterial&&me.releaseShaderCache(b))}this.renderBufferDirect=function(b,N,W,V,z,Ee){N===null&&(N=qe);const Pe=z.isMesh&&z.matrixWorld.determinant()<0,Me=fr(b,N,W,V,z);te.setMaterial(V,Pe);let Ue=W.index,Ge=1;if(V.wireframe===!0){if(Ue=ne.getWireframeAttribute(W),Ue===void 0)return;Ge=2}const Qe=W.drawRange,tt=W.attributes.position;let ke=Qe.start*Ge,dt=(Qe.start+Qe.count)*Ge;Ee!==null&&(ke=Math.max(ke,Ee.start*Ge),dt=Math.min(dt,(Ee.start+Ee.count)*Ge)),Ue!==null?(ke=Math.max(ke,0),dt=Math.min(dt,Ue.count)):tt!=null&&(ke=Math.max(ke,0),dt=Math.min(dt,tt.count));const wt=dt-ke;if(wt<0||wt===1/0)return;pe.setup(z,V,Me,W,Ue);let Mt,pt=Je;if(Ue!==null&&(Mt=Y.get(Ue),pt=ot,pt.setIndex(Mt)),z.isMesh)V.wireframe===!0?(te.setLineWidth(V.wireframeLinewidth*Ve()),pt.setMode(I.LINES)):pt.setMode(I.TRIANGLES);else if(z.isLine){let Ut=V.linewidth;Ut===void 0&&(Ut=1),te.setLineWidth(Ut*Ve()),z.isLineSegments?pt.setMode(I.LINES):z.isLineLoop?pt.setMode(I.LINE_LOOP):pt.setMode(I.LINE_STRIP)}else z.isPoints?pt.setMode(I.POINTS):z.isSprite&&pt.setMode(I.TRIANGLES);if(z.isBatchedMesh)if(oe.get("WEBGL_multi_draw"))pt.renderMultiDraw(z._multiDrawStarts,z._multiDrawCounts,z._multiDrawCount);else{const Ut=z._multiDrawStarts,Ce=z._multiDrawCounts,Kt=z._multiDrawCount,at=Ue?Y.get(Ue).bytesPerElement:1,jt=y.get(V).currentProgram.getUniforms();for(let tn=0;tn<Kt;tn++)jt.setValue(I,"_gl_DrawID",tn),pt.render(Ut[tn]/at,Ce[tn])}else if(z.isInstancedMesh)pt.renderInstances(ke,wt,z.count);else if(W.isInstancedBufferGeometry){const Ut=W._maxInstanceCount!==void 0?W._maxInstanceCount:1/0,Ce=Math.min(W.instanceCount,Ut);pt.renderInstances(ke,wt,Ce)}else pt.render(ke,wt)};function en(b,N,W){b.transparent===!0&&b.side===ct&&b.forceSinglePass===!1?(b.side=Gt,b.needsUpdate=!0,Si(b,N,W),b.side=Vn,b.needsUpdate=!0,Si(b,N,W),b.side=ct):Si(b,N,W)}this.compile=function(b,N,W=null){W===null&&(W=b),T=Te.get(W),T.init(N),S.push(T),W.traverseVisible(function(z){z.isLight&&z.layers.test(N.layers)&&(T.pushLight(z),z.castShadow&&T.pushShadow(z))}),b!==W&&b.traverseVisible(function(z){z.isLight&&z.layers.test(N.layers)&&(T.pushLight(z),z.castShadow&&T.pushShadow(z))}),T.setupLights();const V=new Set;return b.traverse(function(z){if(!(z.isMesh||z.isPoints||z.isLine||z.isSprite))return;const Ee=z.material;if(Ee)if(Array.isArray(Ee))for(let Pe=0;Pe<Ee.length;Pe++){const Me=Ee[Pe];en(Me,W,z),V.add(Me)}else en(Ee,W,z),V.add(Ee)}),T=S.pop(),V},this.compileAsync=function(b,N,W=null){const V=this.compile(b,N,W);return new Promise(z=>{function Ee(){if(V.forEach(function(Pe){y.get(Pe).currentProgram.isReady()&&V.delete(Pe)}),V.size===0){z(b);return}setTimeout(Ee,10)}oe.get("KHR_parallel_shader_compile")!==null?Ee():setTimeout(Ee,10)})};let Gi=null;function lr(b){Gi&&Gi(b)}function Ns(){yn.stop()}function Fs(){yn.start()}const yn=new zo;yn.setAnimationLoop(lr),typeof self<"u"&&yn.setContext(self),this.setAnimationLoop=function(b){Gi=b,ge.setAnimationLoop(b),b===null?yn.stop():yn.start()},ge.addEventListener("sessionstart",Ns),ge.addEventListener("sessionend",Fs),this.render=function(b,N){if(N!==void 0&&N.isCamera!==!0){gt("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(L===!0)return;P!==null&&P.renderStart(b,N);const W=ge.enabled===!0&&ge.isPresenting===!0,V=A!==null&&(G===null||W)&&A.begin(C,G);if(b.matrixWorldAutoUpdate===!0&&b.updateMatrixWorld(),N.parent===null&&N.matrixWorldAutoUpdate===!0&&N.updateMatrixWorld(),ge.enabled===!0&&ge.isPresenting===!0&&(A===null||A.isCompositing()===!1)&&(ge.cameraAutoUpdate===!0&&ge.updateCamera(N),N=ge.getCamera()),b.isScene===!0&&b.onBeforeRender(C,b,N,G),T=Te.get(b,S.length),T.init(N),T.state.textureUnits=M.getTextureUnits(),S.push(T),re.multiplyMatrices(N.projectionMatrix,N.matrixWorldInverse),Re.setFromProjectionMatrix(re,Ws,N.reversedDepth),Ae=this.localClippingEnabled,Ne=Le.init(this.clippingPlanes,Ae),R=Q.get(b,w.length),R.init(),w.push(R),ge.enabled===!0&&ge.isPresenting===!0){const Pe=C.xr.getDepthSensingMesh();Pe!==null&&Hi(Pe,N,-1/0,C.sortObjects)}Hi(b,N,0,C.sortObjects),R.finish(),C.sortObjects===!0&&R.sort(Z,ve),be=ge.enabled===!1||ge.isPresenting===!1||ge.hasDepthSensing()===!1,be&&de.addToRenderList(R,b),this.info.render.frame++,Ne===!0&&Le.beginShadows();const z=T.state.shadowsArray;if(_e.render(z,b,N),Ne===!0&&Le.endShadows(),this.info.autoReset===!0&&this.info.reset(),(V&&A.hasRenderPass())===!1){const Pe=R.opaque,Me=R.transmissive;if(T.setupLights(),N.isArrayCamera){const Ue=N.cameras;if(Me.length>0)for(let Ge=0,Qe=Ue.length;Ge<Qe;Ge++){const tt=Ue[Ge];Bs(Pe,Me,b,tt)}be&&de.render(b);for(let Ge=0,Qe=Ue.length;Ge<Qe;Ge++){const tt=Ue[Ge];Os(R,b,tt,tt.viewport)}}else Me.length>0&&Bs(Pe,Me,b,N),be&&de.render(b),Os(R,b,N)}G!==null&&k===0&&(M.updateMultisampleRenderTarget(G),M.updateRenderTargetMipmap(G)),V&&A.end(C),b.isScene===!0&&b.onAfterRender(C,b,N),pe.resetDefaultState(),O=-1,B=null,S.pop(),S.length>0?(T=S[S.length-1],M.setTextureUnits(T.state.textureUnits),Ne===!0&&Le.setGlobalState(C.clippingPlanes,T.state.camera)):T=null,w.pop(),w.length>0?R=w[w.length-1]:R=null,P!==null&&P.renderEnd()};function Hi(b,N,W,V){if(b.visible===!1)return;if(b.layers.test(N.layers)){if(b.isGroup)W=b.renderOrder;else if(b.isLOD)b.autoUpdate===!0&&b.update(N);else if(b.isLightProbeGrid)T.pushLightProbeGrid(b);else if(b.isLight)T.pushLight(b),b.castShadow&&T.pushShadow(b);else if(b.isSprite){if(!b.frustumCulled||Re.intersectsSprite(b)){V&&we.setFromMatrixPosition(b.matrixWorld).applyMatrix4(re);const Pe=ce.update(b),Me=b.material;Me.visible&&R.push(b,Pe,Me,W,we.z,null)}}else if((b.isMesh||b.isLine||b.isPoints)&&(!b.frustumCulled||Re.intersectsObject(b))){const Pe=ce.update(b),Me=b.material;if(V&&(b.boundingSphere!==void 0?(b.boundingSphere===null&&b.computeBoundingSphere(),we.copy(b.boundingSphere.center)):(Pe.boundingSphere===null&&Pe.computeBoundingSphere(),we.copy(Pe.boundingSphere.center)),we.applyMatrix4(b.matrixWorld).applyMatrix4(re)),Array.isArray(Me)){const Ue=Pe.groups;for(let Ge=0,Qe=Ue.length;Ge<Qe;Ge++){const tt=Ue[Ge],ke=Me[tt.materialIndex];ke&&ke.visible&&R.push(b,Pe,ke,W,we.z,tt)}}else Me.visible&&R.push(b,Pe,Me,W,we.z,null)}}const Ee=b.children;for(let Pe=0,Me=Ee.length;Pe<Me;Pe++)Hi(Ee[Pe],N,W,V)}function Os(b,N,W,V){const{opaque:z,transmissive:Ee,transparent:Pe}=b;T.setupLightsView(W),Ne===!0&&Le.setGlobalState(C.clippingPlanes,W),V&&te.viewport(J.copy(V)),z.length>0&&xi(z,N,W),Ee.length>0&&xi(Ee,N,W),Pe.length>0&&xi(Pe,N,W),te.buffers.depth.setTest(!0),te.buffers.depth.setMask(!0),te.buffers.color.setMask(!0),te.setPolygonOffset(!1)}function Bs(b,N,W,V){if((W.isScene===!0?W.overrideMaterial:null)!==null)return;if(T.state.transmissionRenderTarget[V.id]===void 0){const ke=oe.has("EXT_color_buffer_half_float")||oe.has("EXT_color_buffer_float");T.state.transmissionRenderTarget[V.id]=new zt(1,1,{generateMipmaps:!0,type:ke?qt:rn,minFilter:pn,samples:Math.max(4,He.samples),stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:vt.workingColorSpace})}const Ee=T.state.transmissionRenderTarget[V.id],Pe=V.viewport||J;Ee.setSize(Pe.z*C.transmissionResolutionScale,Pe.w*C.transmissionResolutionScale);const Me=C.getRenderTarget(),Ue=C.getActiveCubeFace(),Ge=C.getActiveMipmapLevel();C.setRenderTarget(Ee),C.getClearColor(Oe),Ie=C.getClearAlpha(),Ie<1&&C.setClearColor(16777215,.5),C.clear(),be&&de.render(W);const Qe=C.toneMapping;C.toneMapping=ln;const tt=V.viewport;if(V.viewport!==void 0&&(V.viewport=void 0),T.setupLightsView(V),Ne===!0&&Le.setGlobalState(C.clippingPlanes,V),xi(b,W,V),M.updateMultisampleRenderTarget(Ee),M.updateRenderTargetMipmap(Ee),oe.has("WEBGL_multisampled_render_to_texture")===!1){let ke=!1;for(let dt=0,wt=N.length;dt<wt;dt++){const Mt=N[dt],{object:pt,geometry:Ut,material:Ce,group:Kt}=Mt;if(Ce.side===ct&&pt.layers.test(V.layers)){const at=Ce.side;Ce.side=Gt,Ce.needsUpdate=!0,Gs(pt,W,V,Ut,Ce,Kt),Ce.side=at,Ce.needsUpdate=!0,ke=!0}}ke===!0&&(M.updateMultisampleRenderTarget(Ee),M.updateRenderTargetMipmap(Ee))}C.setRenderTarget(Me,Ue,Ge),C.setClearColor(Oe,Ie),tt!==void 0&&(V.viewport=tt),C.toneMapping=Qe}function xi(b,N,W){const V=N.isScene===!0?N.overrideMaterial:null;for(let z=0,Ee=b.length;z<Ee;z++){const Pe=b[z],{object:Me,geometry:Ue,group:Ge}=Pe;let Qe=Pe.material;Qe.allowOverride===!0&&V!==null&&(Qe=V),Me.layers.test(W.layers)&&Gs(Me,N,W,Ue,Qe,Ge)}}function Gs(b,N,W,V,z,Ee){b.onBeforeRender(C,N,W,V,z,Ee),b.modelViewMatrix.multiplyMatrices(W.matrixWorldInverse,b.matrixWorld),b.normalMatrix.getNormalMatrix(b.modelViewMatrix),z.onBeforeRender(C,N,W,V,b,Ee),z.transparent===!0&&z.side===ct&&z.forceSinglePass===!1?(z.side=Gt,z.needsUpdate=!0,C.renderBufferDirect(W,N,V,z,b,Ee),z.side=Vn,z.needsUpdate=!0,C.renderBufferDirect(W,N,V,z,b,Ee),z.side=ct):C.renderBufferDirect(W,N,V,z,b,Ee),b.onAfterRender(C,N,W,V,z,Ee)}function Si(b,N,W){N.isScene!==!0&&(N=qe);const V=y.get(b),z=T.state.lights,Ee=T.state.shadowsArray,Pe=z.state.version,Me=me.getParameters(b,z.state,Ee,N,W,T.state.lightProbeGridArray),Ue=me.getProgramCacheKey(Me);let Ge=V.programs;V.environment=b.isMeshStandardMaterial||b.isMeshLambertMaterial||b.isMeshPhongMaterial?N.environment:null,V.fog=N.fog;const Qe=b.isMeshStandardMaterial||b.isMeshLambertMaterial&&!b.envMap||b.isMeshPhongMaterial&&!b.envMap;V.envMap=H.get(b.envMap||V.environment,Qe),V.envMapRotation=V.environment!==null&&b.envMap===null?N.environmentRotation:b.envMapRotation,Ge===void 0&&(b.addEventListener("dispose",Tt),Ge=new Map,V.programs=Ge);let tt=Ge.get(Ue);if(tt!==void 0){if(V.currentProgram===tt&&V.lightsStateVersion===Pe)return ks(b,Me),tt}else Me.uniforms=me.getUniforms(b),P!==null&&b.isNodeMaterial&&P.build(b,W,Me),b.onBeforeCompile(Me,C),tt=me.acquireProgram(Me,Ue),Ge.set(Ue,tt),V.uniforms=Me.uniforms;const ke=V.uniforms;return(!b.isShaderMaterial&&!b.isRawShaderMaterial||b.clipping===!0)&&(ke.clippingPlanes=Le.uniform),ks(b,Me),V.needsLights=pr(b),V.lightsStateVersion=Pe,V.needsLights&&(ke.ambientLightColor.value=z.state.ambient,ke.lightProbe.value=z.state.probe,ke.directionalLights.value=z.state.directional,ke.directionalLightShadows.value=z.state.directionalShadow,ke.spotLights.value=z.state.spot,ke.spotLightShadows.value=z.state.spotShadow,ke.rectAreaLights.value=z.state.rectArea,ke.ltc_1.value=z.state.rectAreaLTC1,ke.ltc_2.value=z.state.rectAreaLTC2,ke.pointLights.value=z.state.point,ke.pointLightShadows.value=z.state.pointShadow,ke.hemisphereLights.value=z.state.hemi,ke.directionalShadowMatrix.value=z.state.directionalShadowMatrix,ke.spotLightMatrix.value=z.state.spotLightMatrix,ke.spotLightMap.value=z.state.spotLightMap,ke.pointShadowMatrix.value=z.state.pointShadowMatrix),V.lightProbeGrid=T.state.lightProbeGridArray.length>0,V.currentProgram=tt,V.uniformsList=null,tt}function Hs(b){if(b.uniformsList===null){const N=b.currentProgram.getUniforms();b.uniformsList=yi.seqWithValue(N.seq,b.uniforms)}return b.uniformsList}function ks(b,N){const W=y.get(b);W.outputColorSpace=N.outputColorSpace,W.batching=N.batching,W.batchingColor=N.batchingColor,W.instancing=N.instancing,W.instancingColor=N.instancingColor,W.instancingMorph=N.instancingMorph,W.skinning=N.skinning,W.morphTargets=N.morphTargets,W.morphNormals=N.morphNormals,W.morphColors=N.morphColors,W.morphTargetsCount=N.morphTargetsCount,W.numClippingPlanes=N.numClippingPlanes,W.numIntersection=N.numClipIntersection,W.vertexAlphas=N.vertexAlphas,W.vertexTangents=N.vertexTangents,W.toneMapping=N.toneMapping}function ur(b,N){if(b.length===0)return null;if(b.length===1)return b[0].texture!==null?b[0]:null;x.setFromMatrixPosition(N.matrixWorld);for(let W=0,V=b.length;W<V;W++){const z=b[W];if(z.texture!==null&&z.boundingBox.containsPoint(x))return z}return null}function fr(b,N,W,V,z){N.isScene!==!0&&(N=qe),M.resetTextureUnits();const Ee=N.fog,Pe=V.isMeshStandardMaterial||V.isMeshLambertMaterial||V.isMeshPhongMaterial?N.environment:null,Me=G===null?C.outputColorSpace:G.isXRRenderTarget===!0?G.texture.colorSpace:vt.workingColorSpace,Ue=V.isMeshStandardMaterial||V.isMeshLambertMaterial&&!V.envMap||V.isMeshPhongMaterial&&!V.envMap,Ge=H.get(V.envMap||Pe,Ue),Qe=V.vertexColors===!0&&!!W.attributes.color&&W.attributes.color.itemSize===4,tt=!!W.attributes.tangent&&(!!V.normalMap||V.anisotropy>0),ke=!!W.morphAttributes.position,dt=!!W.morphAttributes.normal,wt=!!W.morphAttributes.color;let Mt=ln;V.toneMapped&&(G===null||G.isXRRenderTarget===!0)&&(Mt=C.toneMapping);const pt=W.morphAttributes.position||W.morphAttributes.normal||W.morphAttributes.color,Ut=pt!==void 0?pt.length:0,Ce=y.get(V),Kt=T.state.lights;if(Ne===!0&&(Ae===!0||b!==B)){const _t=b===B&&V.id===O;Le.setState(V,b,_t)}let at=!1;V.version===Ce.__version?(Ce.needsLights&&Ce.lightsStateVersion!==Kt.state.version||Ce.outputColorSpace!==Me||z.isBatchedMesh&&Ce.batching===!1||!z.isBatchedMesh&&Ce.batching===!0||z.isBatchedMesh&&Ce.batchingColor===!0&&z.colorTexture===null||z.isBatchedMesh&&Ce.batchingColor===!1&&z.colorTexture!==null||z.isInstancedMesh&&Ce.instancing===!1||!z.isInstancedMesh&&Ce.instancing===!0||z.isSkinnedMesh&&Ce.skinning===!1||!z.isSkinnedMesh&&Ce.skinning===!0||z.isInstancedMesh&&Ce.instancingColor===!0&&z.instanceColor===null||z.isInstancedMesh&&Ce.instancingColor===!1&&z.instanceColor!==null||z.isInstancedMesh&&Ce.instancingMorph===!0&&z.morphTexture===null||z.isInstancedMesh&&Ce.instancingMorph===!1&&z.morphTexture!==null||Ce.envMap!==Ge||V.fog===!0&&Ce.fog!==Ee||Ce.numClippingPlanes!==void 0&&(Ce.numClippingPlanes!==Le.numPlanes||Ce.numIntersection!==Le.numIntersection)||Ce.vertexAlphas!==Qe||Ce.vertexTangents!==tt||Ce.morphTargets!==ke||Ce.morphNormals!==dt||Ce.morphColors!==wt||Ce.toneMapping!==Mt||Ce.morphTargetsCount!==Ut||!!Ce.lightProbeGrid!=T.state.lightProbeGridArray.length>0)&&(at=!0):(at=!0,Ce.__version=V.version);let jt=Ce.currentProgram;at===!0&&(jt=Si(V,N,z),P&&V.isNodeMaterial&&P.onUpdateProgram(V,jt,Ce));let tn=!1,xn=!1,Nn=!1;const ht=jt.getUniforms(),bt=Ce.uniforms;if(te.useProgram(jt.program)&&(tn=!0,xn=!0,Nn=!0),V.id!==O&&(O=V.id,xn=!0),Ce.needsLights){const _t=ur(T.state.lightProbeGridArray,z);Ce.lightProbeGrid!==_t&&(Ce.lightProbeGrid=_t,xn=!0)}if(tn||B!==b){te.buffers.depth.getReversed()&&b.reversedDepth!==!0&&(b._reversedDepth=!0,b.updateProjectionMatrix()),ht.setValue(I,"projectionMatrix",b.projectionMatrix),ht.setValue(I,"viewMatrix",b.matrixWorldInverse);const Mn=ht.map.cameraPosition;Mn!==void 0&&Mn.setValue(I,De.setFromMatrixPosition(b.matrixWorld)),He.logarithmicDepthBuffer&&ht.setValue(I,"logDepthBufFC",2/(Math.log(b.far+1)/Math.LN2)),(V.isMeshPhongMaterial||V.isMeshToonMaterial||V.isMeshLambertMaterial||V.isMeshBasicMaterial||V.isMeshStandardMaterial||V.isShaderMaterial)&&ht.setValue(I,"isOrthographic",b.isOrthographicCamera===!0),B!==b&&(B=b,xn=!0,Nn=!0)}if(Ce.needsLights&&(Kt.state.directionalShadowMap.length>0&&ht.setValue(I,"directionalShadowMap",Kt.state.directionalShadowMap,M),Kt.state.spotShadowMap.length>0&&ht.setValue(I,"spotShadowMap",Kt.state.spotShadowMap,M),Kt.state.pointShadowMap.length>0&&ht.setValue(I,"pointShadowMap",Kt.state.pointShadowMap,M)),z.isSkinnedMesh){ht.setOptional(I,z,"bindMatrix"),ht.setOptional(I,z,"bindMatrixInverse");const _t=z.skeleton;_t&&(_t.boneTexture===null&&_t.computeBoneTexture(),ht.setValue(I,"boneTexture",_t.boneTexture,M))}z.isBatchedMesh&&(ht.setOptional(I,z,"batchingTexture"),ht.setValue(I,"batchingTexture",z._matricesTexture,M),ht.setOptional(I,z,"batchingIdTexture"),ht.setValue(I,"batchingIdTexture",z._indirectTexture,M),ht.setOptional(I,z,"batchingColorTexture"),z._colorsTexture!==null&&ht.setValue(I,"batchingColorTexture",z._colorsTexture,M));const Sn=W.morphAttributes;if((Sn.position!==void 0||Sn.normal!==void 0||Sn.color!==void 0)&&Ye.update(z,W,jt),(xn||Ce.receiveShadow!==z.receiveShadow)&&(Ce.receiveShadow=z.receiveShadow,ht.setValue(I,"receiveShadow",z.receiveShadow)),(V.isMeshStandardMaterial||V.isMeshLambertMaterial||V.isMeshPhongMaterial)&&V.envMap===null&&N.environment!==null&&(bt.envMapIntensity.value=N.environmentIntensity),bt.dfgLUT!==void 0&&(bt.dfgLUT.value=ih()),xn){if(ht.setValue(I,"toneMappingExposure",C.toneMappingExposure),Ce.needsLights&&dr(bt,Nn),Ee&&V.fog===!0&&X.refreshFogUniforms(bt,Ee),X.refreshMaterialUniforms(bt,V,We,Ke,T.state.transmissionRenderTarget[b.id]),Ce.needsLights&&Ce.lightProbeGrid){const _t=Ce.lightProbeGrid;bt.probesSH.value=_t.texture,bt.probesMin.value.copy(_t.boundingBox.min),bt.probesMax.value.copy(_t.boundingBox.max),bt.probesResolution.value.copy(_t.resolution)}yi.upload(I,Hs(Ce),bt,M)}if(V.isShaderMaterial&&V.uniformsNeedUpdate===!0&&(yi.upload(I,Hs(Ce),bt,M),V.uniformsNeedUpdate=!1),V.isSpriteMaterial&&ht.setValue(I,"center",z.center),ht.setValue(I,"modelViewMatrix",z.modelViewMatrix),ht.setValue(I,"normalMatrix",z.normalMatrix),ht.setValue(I,"modelMatrix",z.matrixWorld),V.uniformsGroups!==void 0){const _t=V.uniformsGroups;for(let Mn=0,Fn=_t.length;Mn<Fn;Mn++){const Vs=_t[Mn];$.update(Vs,jt),$.bind(Vs,jt)}}return jt}function dr(b,N){b.ambientLightColor.needsUpdate=N,b.lightProbe.needsUpdate=N,b.directionalLights.needsUpdate=N,b.directionalLightShadows.needsUpdate=N,b.pointLights.needsUpdate=N,b.pointLightShadows.needsUpdate=N,b.spotLights.needsUpdate=N,b.spotLightShadows.needsUpdate=N,b.rectAreaLights.needsUpdate=N,b.hemisphereLights.needsUpdate=N}function pr(b){return b.isMeshLambertMaterial||b.isMeshToonMaterial||b.isMeshPhongMaterial||b.isMeshStandardMaterial||b.isShadowMaterial||b.isShaderMaterial&&b.lights===!0}this.getActiveCubeFace=function(){return F},this.getActiveMipmapLevel=function(){return k},this.getRenderTarget=function(){return G},this.setRenderTargetTextures=function(b,N,W){const V=y.get(b);V.__autoAllocateDepthBuffer=b.resolveDepthBuffer===!1,V.__autoAllocateDepthBuffer===!1&&(V.__useRenderToTexture=!1),y.get(b.texture).__webglTexture=N,y.get(b.depthTexture).__webglTexture=V.__autoAllocateDepthBuffer?void 0:W,V.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(b,N){const W=y.get(b);W.__webglFramebuffer=N,W.__useDefaultFramebuffer=N===void 0};const hr=I.createFramebuffer();this.setRenderTarget=function(b,N=0,W=0){G=b,F=N,k=W;let V=null,z=!1,Ee=!1;if(b){const Me=y.get(b);if(Me.__useDefaultFramebuffer!==void 0){te.bindFramebuffer(I.FRAMEBUFFER,Me.__webglFramebuffer),J.copy(b.viewport),fe.copy(b.scissor),xe=b.scissorTest,te.viewport(J),te.scissor(fe),te.setScissorTest(xe),O=-1;return}else if(Me.__webglFramebuffer===void 0)M.setupRenderTarget(b);else if(Me.__hasExternalTextures)M.rebindTextures(b,y.get(b.texture).__webglTexture,y.get(b.depthTexture).__webglTexture);else if(b.depthBuffer){const Qe=b.depthTexture;if(Me.__boundDepthTexture!==Qe){if(Qe!==null&&y.has(Qe)&&(b.width!==Qe.image.width||b.height!==Qe.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");M.setupDepthRenderbuffer(b)}}const Ue=b.texture;(Ue.isData3DTexture||Ue.isDataArrayTexture||Ue.isCompressedArrayTexture)&&(Ee=!0);const Ge=y.get(b).__webglFramebuffer;b.isWebGLCubeRenderTarget?(Array.isArray(Ge[N])?V=Ge[N][W]:V=Ge[N],z=!0):b.samples>0&&M.useMultisampledRTT(b)===!1?V=y.get(b).__webglMultisampledFramebuffer:Array.isArray(Ge)?V=Ge[W]:V=Ge,J.copy(b.viewport),fe.copy(b.scissor),xe=b.scissorTest}else J.copy(le).multiplyScalar(We).floor(),fe.copy(Be).multiplyScalar(We).floor(),xe=Xe;if(W!==0&&(V=hr),te.bindFramebuffer(I.FRAMEBUFFER,V)&&te.drawBuffers(b,V),te.viewport(J),te.scissor(fe),te.setScissorTest(xe),z){const Me=y.get(b.texture);I.framebufferTexture2D(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_CUBE_MAP_POSITIVE_X+N,Me.__webglTexture,W)}else if(Ee){const Me=N;for(let Ue=0;Ue<b.textures.length;Ue++){const Ge=y.get(b.textures[Ue]);I.framebufferTextureLayer(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0+Ue,Ge.__webglTexture,W,Me)}}else if(b!==null&&W!==0){const Me=y.get(b.texture);I.framebufferTexture2D(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_2D,Me.__webglTexture,W)}O=-1},this.readRenderTargetPixels=function(b,N,W,V,z,Ee,Pe,Me=0){if(!(b&&b.isWebGLRenderTarget)){gt("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ue=y.get(b).__webglFramebuffer;if(b.isWebGLCubeRenderTarget&&Pe!==void 0&&(Ue=Ue[Pe]),Ue){te.bindFramebuffer(I.FRAMEBUFFER,Ue);try{const Ge=b.textures[Me],Qe=Ge.format,tt=Ge.type;if(b.textures.length>1&&I.readBuffer(I.COLOR_ATTACHMENT0+Me),!He.textureFormatReadable(Qe)){gt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!He.textureTypeReadable(tt)){gt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}N>=0&&N<=b.width-V&&W>=0&&W<=b.height-z&&I.readPixels(N,W,V,z,D.convert(Qe),D.convert(tt),Ee)}finally{const Ge=G!==null?y.get(G).__webglFramebuffer:null;te.bindFramebuffer(I.FRAMEBUFFER,Ge)}}},this.readRenderTargetPixelsAsync=async function(b,N,W,V,z,Ee,Pe,Me=0){if(!(b&&b.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Ue=y.get(b).__webglFramebuffer;if(b.isWebGLCubeRenderTarget&&Pe!==void 0&&(Ue=Ue[Pe]),Ue)if(N>=0&&N<=b.width-V&&W>=0&&W<=b.height-z){te.bindFramebuffer(I.FRAMEBUFFER,Ue);const Ge=b.textures[Me],Qe=Ge.format,tt=Ge.type;if(b.textures.length>1&&I.readBuffer(I.COLOR_ATTACHMENT0+Me),!He.textureFormatReadable(Qe))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!He.textureTypeReadable(tt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const ke=I.createBuffer();I.bindBuffer(I.PIXEL_PACK_BUFFER,ke),I.bufferData(I.PIXEL_PACK_BUFFER,Ee.byteLength,I.STREAM_READ),I.readPixels(N,W,V,z,D.convert(Qe),D.convert(tt),0);const dt=G!==null?y.get(G).__webglFramebuffer:null;te.bindFramebuffer(I.FRAMEBUFFER,dt);const wt=I.fenceSync(I.SYNC_GPU_COMMANDS_COMPLETE,0);return I.flush(),await Mr(I,wt,4),I.bindBuffer(I.PIXEL_PACK_BUFFER,ke),I.getBufferSubData(I.PIXEL_PACK_BUFFER,0,Ee),I.deleteBuffer(ke),I.deleteSync(wt),Ee}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(b,N=null,W=0){const V=Math.pow(2,-W),z=Math.floor(b.image.width*V),Ee=Math.floor(b.image.height*V),Pe=N!==null?N.x:0,Me=N!==null?N.y:0;M.setTexture2D(b,0),I.copyTexSubImage2D(I.TEXTURE_2D,W,0,0,Pe,Me,z,Ee),te.unbindTexture()};const mr=I.createFramebuffer(),_r=I.createFramebuffer();this.copyTextureToTexture=function(b,N,W=null,V=null,z=0,Ee=0){let Pe,Me,Ue,Ge,Qe,tt,ke,dt,wt;const Mt=b.isCompressedTexture?b.mipmaps[Ee]:b.image;if(W!==null)Pe=W.max.x-W.min.x,Me=W.max.y-W.min.y,Ue=W.isBox3?W.max.z-W.min.z:1,Ge=W.min.x,Qe=W.min.y,tt=W.isBox3?W.min.z:0;else{const bt=Math.pow(2,-z);Pe=Math.floor(Mt.width*bt),Me=Math.floor(Mt.height*bt),b.isDataArrayTexture?Ue=Mt.depth:b.isData3DTexture?Ue=Math.floor(Mt.depth*bt):Ue=1,Ge=0,Qe=0,tt=0}V!==null?(ke=V.x,dt=V.y,wt=V.z):(ke=0,dt=0,wt=0);const pt=D.convert(N.format),Ut=D.convert(N.type);let Ce;N.isData3DTexture?(M.setTexture3D(N,0),Ce=I.TEXTURE_3D):N.isDataArrayTexture||N.isCompressedArrayTexture?(M.setTexture2DArray(N,0),Ce=I.TEXTURE_2D_ARRAY):(M.setTexture2D(N,0),Ce=I.TEXTURE_2D),te.activeTexture(I.TEXTURE0),te.pixelStorei(I.UNPACK_FLIP_Y_WEBGL,N.flipY),te.pixelStorei(I.UNPACK_PREMULTIPLY_ALPHA_WEBGL,N.premultiplyAlpha),te.pixelStorei(I.UNPACK_ALIGNMENT,N.unpackAlignment);const Kt=te.getParameter(I.UNPACK_ROW_LENGTH),at=te.getParameter(I.UNPACK_IMAGE_HEIGHT),jt=te.getParameter(I.UNPACK_SKIP_PIXELS),tn=te.getParameter(I.UNPACK_SKIP_ROWS),xn=te.getParameter(I.UNPACK_SKIP_IMAGES);te.pixelStorei(I.UNPACK_ROW_LENGTH,Mt.width),te.pixelStorei(I.UNPACK_IMAGE_HEIGHT,Mt.height),te.pixelStorei(I.UNPACK_SKIP_PIXELS,Ge),te.pixelStorei(I.UNPACK_SKIP_ROWS,Qe),te.pixelStorei(I.UNPACK_SKIP_IMAGES,tt);const Nn=b.isDataArrayTexture||b.isData3DTexture,ht=N.isDataArrayTexture||N.isData3DTexture;if(b.isDepthTexture){const bt=y.get(b),Sn=y.get(N),_t=y.get(bt.__renderTarget),Mn=y.get(Sn.__renderTarget);te.bindFramebuffer(I.READ_FRAMEBUFFER,_t.__webglFramebuffer),te.bindFramebuffer(I.DRAW_FRAMEBUFFER,Mn.__webglFramebuffer);for(let Fn=0;Fn<Ue;Fn++)Nn&&(I.framebufferTextureLayer(I.READ_FRAMEBUFFER,I.COLOR_ATTACHMENT0,y.get(b).__webglTexture,z,tt+Fn),I.framebufferTextureLayer(I.DRAW_FRAMEBUFFER,I.COLOR_ATTACHMENT0,y.get(N).__webglTexture,Ee,wt+Fn)),I.blitFramebuffer(Ge,Qe,Pe,Me,ke,dt,Pe,Me,I.DEPTH_BUFFER_BIT,I.NEAREST);te.bindFramebuffer(I.READ_FRAMEBUFFER,null),te.bindFramebuffer(I.DRAW_FRAMEBUFFER,null)}else if(z!==0||b.isRenderTargetTexture||y.has(b)){const bt=y.get(b),Sn=y.get(N);te.bindFramebuffer(I.READ_FRAMEBUFFER,mr),te.bindFramebuffer(I.DRAW_FRAMEBUFFER,_r);for(let _t=0;_t<Ue;_t++)Nn?I.framebufferTextureLayer(I.READ_FRAMEBUFFER,I.COLOR_ATTACHMENT0,bt.__webglTexture,z,tt+_t):I.framebufferTexture2D(I.READ_FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_2D,bt.__webglTexture,z),ht?I.framebufferTextureLayer(I.DRAW_FRAMEBUFFER,I.COLOR_ATTACHMENT0,Sn.__webglTexture,Ee,wt+_t):I.framebufferTexture2D(I.DRAW_FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_2D,Sn.__webglTexture,Ee),z!==0?I.blitFramebuffer(Ge,Qe,Pe,Me,ke,dt,Pe,Me,I.COLOR_BUFFER_BIT,I.NEAREST):ht?I.copyTexSubImage3D(Ce,Ee,ke,dt,wt+_t,Ge,Qe,Pe,Me):I.copyTexSubImage2D(Ce,Ee,ke,dt,Ge,Qe,Pe,Me);te.bindFramebuffer(I.READ_FRAMEBUFFER,null),te.bindFramebuffer(I.DRAW_FRAMEBUFFER,null)}else ht?b.isDataTexture||b.isData3DTexture?I.texSubImage3D(Ce,Ee,ke,dt,wt,Pe,Me,Ue,pt,Ut,Mt.data):N.isCompressedArrayTexture?I.compressedTexSubImage3D(Ce,Ee,ke,dt,wt,Pe,Me,Ue,pt,Mt.data):I.texSubImage3D(Ce,Ee,ke,dt,wt,Pe,Me,Ue,pt,Ut,Mt):b.isDataTexture?I.texSubImage2D(I.TEXTURE_2D,Ee,ke,dt,Pe,Me,pt,Ut,Mt.data):b.isCompressedTexture?I.compressedTexSubImage2D(I.TEXTURE_2D,Ee,ke,dt,Mt.width,Mt.height,pt,Mt.data):I.texSubImage2D(I.TEXTURE_2D,Ee,ke,dt,Pe,Me,pt,Ut,Mt);te.pixelStorei(I.UNPACK_ROW_LENGTH,Kt),te.pixelStorei(I.UNPACK_IMAGE_HEIGHT,at),te.pixelStorei(I.UNPACK_SKIP_PIXELS,jt),te.pixelStorei(I.UNPACK_SKIP_ROWS,tn),te.pixelStorei(I.UNPACK_SKIP_IMAGES,xn),Ee===0&&N.generateMipmaps&&I.generateMipmap(Ce),te.unbindTexture()},this.initRenderTarget=function(b){y.get(b).__webglFramebuffer===void 0&&M.setupRenderTarget(b)},this.initTexture=function(b){b.isCubeTexture?M.setTextureCube(b,0):b.isData3DTexture?M.setTexture3D(b,0):b.isDataArrayTexture||b.isCompressedArrayTexture?M.setTexture2DArray(b,0):M.setTexture2D(b,0),te.unbindTexture()},this.resetState=function(){F=0,k=0,G=null,te.reset(),pe.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Ws}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(n){this._outputColorSpace=n;const e=this.getContext();e.drawingBufferColorSpace=vt._getDrawingBufferColorSpace(n),e.unpackColorSpace=vt._getUnpackColorSpace()}}class ah{constructor(){this._previousTime=0,this._currentTime=0,this._startTime=performance.now(),this._delta=0,this._elapsed=0,this._timescale=1,this._document=null,this._pageVisibilityHandler=null}connect(n){this._document=n,n.hidden!==void 0&&(this._pageVisibilityHandler=oh.bind(this),n.addEventListener("visibilitychange",this._pageVisibilityHandler,!1))}disconnect(){this._pageVisibilityHandler!==null&&(this._document.removeEventListener("visibilitychange",this._pageVisibilityHandler),this._pageVisibilityHandler=null),this._document=null}getDelta(){return this._delta/1e3}getElapsed(){return this._elapsed/1e3}getTimescale(){return this._timescale}setTimescale(n){return this._timescale=n,this}reset(){return this._currentTime=performance.now()-this._startTime,this}dispose(){this.disconnect()}update(n){return this._pageVisibilityHandler!==null&&this._document.hidden===!0?this._delta=0:(this._previousTime=this._currentTime,this._currentTime=(n!==void 0?n:performance.now())-this._startTime,this._delta=(this._currentTime-this._previousTime)*this._timescale,this._elapsed+=this._delta),this}}function oh(){this._document.hidden===!1&&this.reset()}const Ci={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

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


		}`};class Zn{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}}const rh=new Di(-1,1,1,-1,0,1);class ch extends vn{constructor(){super(),this.setAttribute("position",new Wn([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new Wn([0,2,0,0,2,0],2))}}const lh=new ch;class Us{constructor(n){this._mesh=new U(lh,n)}dispose(){this._mesh.geometry.dispose()}render(n){n.render(this._mesh,rh)}get material(){return this._mesh.material}set material(n){this._mesh.material=n}}class uh extends Zn{constructor(n,e="tDiffuse"){super(),this.textureID=e,this.uniforms=null,this.material=null,n instanceof Dt?(this.uniforms=n.uniforms,this.material=n):n&&(this.uniforms=qn.clone(n.uniforms),this.material=new Dt({name:n.name!==void 0?n.name:"unspecified",defines:Object.assign({},n.defines),uniforms:this.uniforms,vertexShader:n.vertexShader,fragmentShader:n.fragmentShader})),this._fsQuad=new Us(this.material)}render(n,e,i){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=i.texture),this._fsQuad.material=this.material,this.renderToScreen?(n.setRenderTarget(null),this._fsQuad.render(n)):(n.setRenderTarget(e),this.clear&&n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil),this._fsQuad.render(n))}dispose(){this.material.dispose(),this._fsQuad.dispose()}}class io extends Zn{constructor(n,e){super(),this.scene=n,this.camera=e,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(n,e,i){const a=n.getContext(),s=n.state;s.buffers.color.setMask(!1),s.buffers.depth.setMask(!1),s.buffers.color.setLocked(!0),s.buffers.depth.setLocked(!0);let o,u;this.inverse?(o=0,u=1):(o=1,u=0),s.buffers.stencil.setTest(!0),s.buffers.stencil.setOp(a.REPLACE,a.REPLACE,a.REPLACE),s.buffers.stencil.setFunc(a.ALWAYS,o,4294967295),s.buffers.stencil.setClear(u),s.buffers.stencil.setLocked(!0),n.setRenderTarget(i),this.clear&&n.clear(),n.render(this.scene,this.camera),n.setRenderTarget(e),this.clear&&n.clear(),n.render(this.scene,this.camera),s.buffers.color.setLocked(!1),s.buffers.depth.setLocked(!1),s.buffers.color.setMask(!0),s.buffers.depth.setMask(!0),s.buffers.stencil.setLocked(!1),s.buffers.stencil.setFunc(a.EQUAL,1,4294967295),s.buffers.stencil.setOp(a.KEEP,a.KEEP,a.KEEP),s.buffers.stencil.setLocked(!0)}}class fh extends Zn{constructor(){super(),this.needsSwap=!1}render(n){n.state.buffers.stencil.setLocked(!1),n.state.buffers.stencil.setTest(!1)}}class dh{constructor(n,e){if(this.renderer=n,this._pixelRatio=n.getPixelRatio(),e===void 0){const i=n.getSize(new ut);this._width=i.width,this._height=i.height,e=new zt(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:qt}),e.texture.name="EffectComposer.rt1"}else this._width=e.width,this._height=e.height;this.renderTarget1=e,this.renderTarget2=e.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new uh(Ci),this.copyPass.material.blending=un,this.timer=new Lc}swapBuffers(){const n=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=n}addPass(n){this.passes.push(n),n.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(n,e){this.passes.splice(e,0,n),n.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(n){const e=this.passes.indexOf(n);e!==-1&&this.passes.splice(e,1)}isLastEnabledPass(n){for(let e=n+1;e<this.passes.length;e++)if(this.passes[e].enabled)return!1;return!0}render(n){this.timer.update(),n===void 0&&(n=this.timer.getDelta());const e=this.renderer.getRenderTarget();let i=!1;for(let a=0,s=this.passes.length;a<s;a++){const o=this.passes[a];if(o.enabled!==!1){if(o.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(a),o.render(this.renderer,this.writeBuffer,this.readBuffer,n,i),o.needsSwap){if(i){const u=this.renderer.getContext(),f=this.renderer.state.buffers.stencil;f.setFunc(u.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,n),f.setFunc(u.EQUAL,1,4294967295)}this.swapBuffers()}io!==void 0&&(o instanceof io?i=!0:o instanceof fh&&(i=!1))}}this.renderer.setRenderTarget(e)}reset(n){if(n===void 0){const e=this.renderer.getSize(new ut);this._pixelRatio=this.renderer.getPixelRatio(),this._width=e.width,this._height=e.height,n=this.renderTarget1.clone(),n.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=n,this.renderTarget2=n.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(n,e){this._width=n,this._height=e;const i=this._width*this._pixelRatio,a=this._height*this._pixelRatio;this.renderTarget1.setSize(i,a),this.renderTarget2.setSize(i,a);for(let s=0;s<this.passes.length;s++)this.passes[s].setSize(i,a)}setPixelRatio(n){this._pixelRatio=n,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}}class ph extends Zn{constructor(n,e,i=null,a=null,s=null){super(),this.scene=n,this.camera=e,this.overrideMaterial=i,this.clearColor=a,this.clearAlpha=s,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this.isRenderPass=!0,this._oldClearColor=new ue}render(n,e,i){const a=n.autoClear;n.autoClear=!1;let s,o;this.overrideMaterial!==null&&(o=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(n.getClearColor(this._oldClearColor),n.setClearColor(this.clearColor,n.getClearAlpha())),this.clearAlpha!==null&&(s=n.getClearAlpha(),n.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&n.clearDepth(),n.setRenderTarget(this.renderToScreen?null:i),this.clear===!0&&n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil),n.render(this.scene,this.camera),this.clearColor!==null&&n.setClearColor(this._oldClearColor),this.clearAlpha!==null&&n.setClearAlpha(s),this.overrideMaterial!==null&&(this.scene.overrideMaterial=o),n.autoClear=a}}const hh={uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new ue(0)},defaultOpacity:{value:0}},vertexShader:`

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

		}`};class $n extends Zn{constructor(n,e=1,i,a){super(),this.strength=e,this.radius=i,this.threshold=a,this.resolution=n!==void 0?new ut(n.x,n.y):new ut(256,256),this.clearColor=new ue(0,0,0),this.needsSwap=!1,this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let s=Math.round(this.resolution.x/2),o=Math.round(this.resolution.y/2);this.renderTargetBright=new zt(s,o,{type:qt}),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let m=0;m<this.nMips;m++){const _=new zt(s,o,{type:qt});_.texture.name="UnrealBloomPass.h"+m,_.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(_);const h=new zt(s,o,{type:qt});h.texture.name="UnrealBloomPass.v"+m,h.texture.generateMipmaps=!1,this.renderTargetsVertical.push(h),s=Math.round(s/2),o=Math.round(o/2)}const u=hh;this.highPassUniforms=qn.clone(u.uniforms),this.highPassUniforms.luminosityThreshold.value=a,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new Dt({uniforms:this.highPassUniforms,vertexShader:u.vertexShader,fragmentShader:u.fragmentShader}),this.separableBlurMaterials=[];const f=[6,10,14,18,22];s=Math.round(this.resolution.x/2),o=Math.round(this.resolution.y/2);for(let m=0;m<this.nMips;m++)this.separableBlurMaterials.push(this._getSeparableBlurMaterial(f[m])),this.separableBlurMaterials[m].uniforms.invSize.value=new ut(1/s,1/o),s=Math.round(s/2),o=Math.round(o/2);this.compositeMaterial=this._getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=e,this.compositeMaterial.uniforms.bloomRadius.value=.1;const r=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=r,this.bloomTintColors=[new j(1,1,1),new j(1,1,1),new j(1,1,1),new j(1,1,1),new j(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,this.copyUniforms=qn.clone(Ci.uniforms),this.blendMaterial=new Dt({uniforms:this.copyUniforms,vertexShader:Ci.vertexShader,fragmentShader:Ci.fragmentShader,premultipliedAlpha:!0,blending:hi,depthTest:!1,depthWrite:!1,transparent:!0}),this._oldClearColor=new ue,this._oldClearAlpha=1,this._basic=new xt,this._fsQuad=new Us(null)}dispose(){for(let n=0;n<this.renderTargetsHorizontal.length;n++)this.renderTargetsHorizontal[n].dispose();for(let n=0;n<this.renderTargetsVertical.length;n++)this.renderTargetsVertical[n].dispose();this.renderTargetBright.dispose();for(let n=0;n<this.separableBlurMaterials.length;n++)this.separableBlurMaterials[n].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this._basic.dispose(),this._fsQuad.dispose()}setSize(n,e){let i=Math.round(n/2),a=Math.round(e/2);this.renderTargetBright.setSize(i,a);for(let s=0;s<this.nMips;s++)this.renderTargetsHorizontal[s].setSize(i,a),this.renderTargetsVertical[s].setSize(i,a),this.separableBlurMaterials[s].uniforms.invSize.value=new ut(1/i,1/a),i=Math.round(i/2),a=Math.round(a/2)}render(n,e,i,a,s){n.getClearColor(this._oldClearColor),this._oldClearAlpha=n.getClearAlpha();const o=n.autoClear;n.autoClear=!1,n.setClearColor(this.clearColor,0),s&&n.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this._fsQuad.material=this._basic,this._basic.map=i.texture,n.setRenderTarget(null),n.clear(),this._fsQuad.render(n)),this.highPassUniforms.tDiffuse.value=i.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this._fsQuad.material=this.materialHighPassFilter,n.setRenderTarget(this.renderTargetBright),n.clear(),this._fsQuad.render(n);let u=this.renderTargetBright;for(let f=0;f<this.nMips;f++)this._fsQuad.material=this.separableBlurMaterials[f],this.separableBlurMaterials[f].uniforms.colorTexture.value=u.texture,this.separableBlurMaterials[f].uniforms.direction.value=$n.BlurDirectionX,n.setRenderTarget(this.renderTargetsHorizontal[f]),n.clear(),this._fsQuad.render(n),this.separableBlurMaterials[f].uniforms.colorTexture.value=this.renderTargetsHorizontal[f].texture,this.separableBlurMaterials[f].uniforms.direction.value=$n.BlurDirectionY,n.setRenderTarget(this.renderTargetsVertical[f]),n.clear(),this._fsQuad.render(n),u=this.renderTargetsVertical[f];this._fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,n.setRenderTarget(this.renderTargetsHorizontal[0]),n.clear(),this._fsQuad.render(n),this._fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,s&&n.state.buffers.stencil.setTest(!0),this.renderToScreen?(n.setRenderTarget(null),this._fsQuad.render(n)):(n.setRenderTarget(i),this._fsQuad.render(n)),n.setClearColor(this._oldClearColor,this._oldClearAlpha),n.autoClear=o}_getSeparableBlurMaterial(n){const e=[],i=n/3;for(let a=0;a<n;a++)e.push(.39894*Math.exp(-.5*a*a/(i*i))/i);return new Dt({defines:{KERNEL_RADIUS:n},uniforms:{colorTexture:{value:null},invSize:{value:new ut(.5,.5)},direction:{value:new ut(.5,.5)},gaussianCoefficients:{value:e}},vertexShader:`

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

				}`})}_getCompositeMaterial(n){return new Dt({defines:{NUM_MIPS:n},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`

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

				}`})}}$n.BlurDirectionX=new ut(1,0);$n.BlurDirectionY=new ut(0,1);const wi={name:"OutputShader",uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
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

		}`};class mh extends Zn{constructor(){super(),this.isOutputPass=!0,this.uniforms=qn.clone(wi.uniforms),this.material=new Eo({name:wi.name,uniforms:this.uniforms,vertexShader:wi.vertexShader,fragmentShader:wi.fragmentShader}),this._fsQuad=new Us(this.material),this._outputColorSpace=null,this._toneMapping=null}render(n,e,i){this.uniforms.tDiffuse.value=i.texture,this.uniforms.toneMappingExposure.value=n.toneMappingExposure,(this._outputColorSpace!==n.outputColorSpace||this._toneMapping!==n.toneMapping)&&(this._outputColorSpace=n.outputColorSpace,this._toneMapping=n.toneMapping,this.material.defines={},vt.getTransfer(this._outputColorSpace)===mt&&(this.material.defines.SRGB_TRANSFER=""),this._toneMapping===Ds?this.material.defines.LINEAR_TONE_MAPPING="":this._toneMapping===Ps?this.material.defines.REINHARD_TONE_MAPPING="":this._toneMapping===Ls?this.material.defines.CINEON_TONE_MAPPING="":this._toneMapping===Ui?this.material.defines.ACES_FILMIC_TONE_MAPPING="":this._toneMapping===Cs?this.material.defines.AGX_TONE_MAPPING="":this._toneMapping===ys?this.material.defines.NEUTRAL_TONE_MAPPING="":this._toneMapping===As&&(this.material.defines.CUSTOM_TONE_MAPPING=""),this.material.needsUpdate=!0),this.renderToScreen===!0?(n.setRenderTarget(null),this._fsQuad.render(n)):(n.setRenderTarget(e),this.clear&&n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil),this._fsQuad.render(n))}dispose(){this.material.dispose(),this._fsQuad.dispose()}}class Oi extends U{constructor(n,e={}){super(n),this.isReflector=!0,this.type="Reflector",this.forceUpdate=!1,this._reflectionCameras=new WeakMap;const i=this,a=e.color!==void 0?new ue(e.color):new ue(8355711),s=e.textureWidth||512,o=e.textureHeight||512,u=e.clipBias||0,f=e.shader||Oi.ReflectorShader,r=e.multisample!==void 0?e.multisample:4,m=new bo,_=new j,h=new j,v=new j,p=new At,d=new j(0,0,-1),c=new Ot,l=new j,g=new j,E=new Ot,x=new At,R=new zt(s,o,{samples:r,type:qt}),T=new Dt({name:f.name!==void 0?f.name:"unspecified",uniforms:qn.clone(f.uniforms),fragmentShader:f.fragmentShader,vertexShader:f.vertexShader});T.uniforms.tDiffuse.value=R.texture,T.uniforms.color.value=a,T.uniforms.textureMatrix.value=x,this.material=T,this.onBeforeRender=function(w,S,A){const C=this._getReflectionCamera(A);if(h.setFromMatrixPosition(i.matrixWorld),v.setFromMatrixPosition(A.matrixWorld),p.extractRotation(i.matrixWorld),_.set(0,0,1),_.applyMatrix4(p),l.subVectors(h,v),l.dot(_)>0===!0&&this.forceUpdate===!1)return;l.reflect(_).negate(),l.add(h),p.extractRotation(A.matrixWorld),d.set(0,0,-1),d.applyMatrix4(p),d.add(v),g.subVectors(h,d),g.reflect(_).negate(),g.add(h),C.position.copy(l),C.up.set(0,1,0),C.up.applyMatrix4(p),C.up.reflect(_),C.lookAt(g),C.far=A.far,C.updateMatrixWorld(),C.projectionMatrix.copy(A.projectionMatrix),x.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),x.multiply(C.projectionMatrix),x.multiply(C.matrixWorldInverse),x.multiply(i.matrixWorld),m.setFromNormalAndCoplanarPoint(_,h),m.applyMatrix4(C.matrixWorldInverse),c.set(m.normal.x,m.normal.y,m.normal.z,m.constant);const P=C.projectionMatrix;C.isOrthographicCamera?(E.x=(Math.sign(c.x)+P.elements[8])/P.elements[0],E.y=(Math.sign(c.y)+P.elements[9])/P.elements[5],E.z=-A.far,E.w=1):(E.x=(Math.sign(c.x)+P.elements[8])/P.elements[0],E.y=(Math.sign(c.y)+P.elements[9])/P.elements[5],E.z=-1,E.w=(1+P.elements[10])/P.elements[14]),c.multiplyScalar(2/c.dot(E)),P.elements[2]=c.x,P.elements[6]=c.y,C.isOrthographicCamera?(P.elements[10]=c.z-u,P.elements[14]=c.w-1):(P.elements[10]=c.z+1-u,P.elements[14]=c.w),i.visible=!1;const F=w.getRenderTarget(),k=w.xr.enabled,G=w.shadowMap.autoUpdate;w.xr.enabled=!1,w.shadowMap.autoUpdate=!1,w.setRenderTarget(R),w.state.buffers.depth.setMask(!0),w.autoClear===!1&&w.clear(),w.render(S,C),w.xr.enabled=k,w.shadowMap.autoUpdate=G,w.setRenderTarget(F);const O=A.viewport;O!==void 0&&w.state.viewport(O),i.visible=!0,this.forceUpdate=!1},this.getRenderTarget=function(){return R},this.dispose=function(){R.dispose(),i.material.dispose()},this._getReflectionCamera=function(w){let S=this._reflectionCameras.get(w);return S===void 0&&(S=w.clone(),this._reflectionCameras.set(w,S)),S}}}Oi.ReflectorShader={name:"ReflectorShader",uniforms:{color:{value:null},tDiffuse:{value:null},textureMatrix:{value:null}},vertexShader:`
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

		}`};function so(t,n){if(n===Pc)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),t;if(n===ms||n===Oo){let e=t.getIndex();if(e===null){const o=[],u=t.getAttribute("position");if(u!==void 0){for(let f=0;f<u.count;f++)o.push(f);t.setIndex(o),e=t.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),t}const i=e.count-2,a=[];if(n===ms)for(let o=1;o<=i;o++)a.push(e.getX(0)),a.push(e.getX(o)),a.push(e.getX(o+1));else for(let o=0;o<i;o++)o%2===0?(a.push(e.getX(o)),a.push(e.getX(o+1)),a.push(e.getX(o+2))):(a.push(e.getX(o+2)),a.push(e.getX(o+1)),a.push(e.getX(o)));a.length/3!==i&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");const s=t.clone();return s.setIndex(a),s.clearGroups(),s}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",n),t}function _h(t){const n=new Map,e=new Map,i=t.clone();return Zo(t,i,function(a,s){n.set(s,a),e.set(a,s)}),i.traverse(function(a){if(!a.isSkinnedMesh)return;const s=a,o=n.get(a),u=o.skeleton.bones;s.skeleton=o.skeleton.clone(),s.bindMatrix.copy(o.bindMatrix),s.skeleton.bones=u.map(function(f){return e.get(f)}),s.bind(s.skeleton,s.bindMatrix)}),i}function Zo(t,n,e){e(t,n);for(let i=0;i<t.children.length;i++)Zo(t.children[i],n.children[i],e)}class gh extends Dc{constructor(n){super(n),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(e){return new Eh(e)}),this.register(function(e){return new Th(e)}),this.register(function(e){return new Dh(e)}),this.register(function(e){return new Ih(e)}),this.register(function(e){return new Uh(e)}),this.register(function(e){return new bh(e)}),this.register(function(e){return new Rh(e)}),this.register(function(e){return new Ah(e)}),this.register(function(e){return new yh(e)}),this.register(function(e){return new Mh(e)}),this.register(function(e){return new Ch(e)}),this.register(function(e){return new wh(e)}),this.register(function(e){return new Ph(e)}),this.register(function(e){return new Lh(e)}),this.register(function(e){return new xh(e)}),this.register(function(e){return new ao(e,nt.EXT_MESHOPT_COMPRESSION)}),this.register(function(e){return new ao(e,nt.KHR_MESHOPT_COMPRESSION)}),this.register(function(e){return new Nh(e)})}load(n,e,i,a){const s=this;let o;if(this.resourcePath!=="")o=this.resourcePath;else if(this.path!==""){const r=ci.extractUrlBase(n);o=ci.resolveURL(r,this.path)}else o=ci.extractUrlBase(n);this.manager.itemStart(n);const u=function(r){a?a(r):console.error(r),s.manager.itemError(n),s.manager.itemEnd(n)},f=new Bo(this.manager);f.setPath(this.path),f.setResponseType("arraybuffer"),f.setRequestHeader(this.requestHeader),f.setWithCredentials(this.withCredentials),f.load(n,function(r){try{s.parse(r,o,function(m){e(m),s.manager.itemEnd(n)},u)}catch(m){u(m)}},i,u)}setDRACOLoader(n){return this.dracoLoader=n,this}setKTX2Loader(n){return this.ktx2Loader=n,this}setMeshoptDecoder(n){return this.meshoptDecoder=n,this}register(n){return this.pluginCallbacks.indexOf(n)===-1&&this.pluginCallbacks.push(n),this}unregister(n){return this.pluginCallbacks.indexOf(n)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(n),1),this}parse(n,e,i,a){let s;const o={},u={},f=new TextDecoder;if(typeof n=="string")s=JSON.parse(n);else if(n instanceof ArrayBuffer)if(f.decode(new Uint8Array(n,0,4))===Qo){try{o[nt.KHR_BINARY_GLTF]=new Fh(n)}catch(_){a&&a(_);return}s=JSON.parse(o[nt.KHR_BINARY_GLTF].content)}else s=JSON.parse(f.decode(n));else s=n;if(s.asset===void 0||s.asset.version[0]<2){a&&a(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}const r=new $h(s,{path:e||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});r.fileLoader.setRequestHeader(this.requestHeader);for(let m=0;m<this.pluginCallbacks.length;m++){const _=this.pluginCallbacks[m](r);_.name||console.error("THREE.GLTFLoader: Invalid plugin found: missing name"),u[_.name]=_,o[_.name]=!0}if(s.extensionsUsed)for(let m=0;m<s.extensionsUsed.length;++m){const _=s.extensionsUsed[m],h=s.extensionsRequired||[];switch(_){case nt.KHR_MATERIALS_UNLIT:o[_]=new Sh;break;case nt.KHR_DRACO_MESH_COMPRESSION:o[_]=new Oh(s,this.dracoLoader);break;case nt.KHR_TEXTURE_TRANSFORM:o[_]=new Bh;break;case nt.KHR_MESH_QUANTIZATION:o[_]=new Gh;break;default:h.indexOf(_)>=0&&u[_]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+_+'".')}}r.setExtensions(o),r.setPlugins(u),r.parse(i,a)}parseAsync(n,e){const i=this;return new Promise(function(a,s){i.parse(n,e,a,s)})}}function vh(){let t={};return{get:function(n){return t[n]},add:function(n,e){t[n]=e},remove:function(n){delete t[n]},removeAll:function(){t={}}}}function yt(t,n,e){const i=t.json.materials[n];return i.extensions&&i.extensions[e]?i.extensions[e]:null}const nt={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_DISPERSION:"KHR_materials_dispersion",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_MATERIALS_BUMP:"EXT_materials_bump",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",KHR_MESHOPT_COMPRESSION:"KHR_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"};class xh{constructor(n){this.parser=n,this.name=nt.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){const n=this.parser,e=this.parser.json.nodes||[];for(let i=0,a=e.length;i<a;i++){const s=e[i];s.extensions&&s.extensions[this.name]&&s.extensions[this.name].light!==void 0&&n._addNodeRef(this.cache,s.extensions[this.name].light)}}_loadLight(n){const e=this.parser,i="light:"+n;let a=e.cache.get(i);if(a)return a;const s=e.json,f=((s.extensions&&s.extensions[this.name]||{}).lights||[])[n];let r;const m=new ue(16777215);f.color!==void 0&&m.setRGB(f.color[0],f.color[1],f.color[2],Jt);const _=f.range!==void 0?f.range:0;switch(f.type){case"directional":r=new _s(m),r.target.position.set(0,0,-1),r.add(r.target);break;case"point":r=new Qt(m),r.distance=_;break;case"spot":r=new Is(m),r.distance=_,f.spot=f.spot||{},f.spot.innerConeAngle=f.spot.innerConeAngle!==void 0?f.spot.innerConeAngle:0,f.spot.outerConeAngle=f.spot.outerConeAngle!==void 0?f.spot.outerConeAngle:Math.PI/4,r.angle=f.spot.outerConeAngle,r.penumbra=1-f.spot.innerConeAngle/f.spot.outerConeAngle,r.target.position.set(0,0,-1),r.add(r.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+f.type)}return r.position.set(0,0,0),sn(r,f),f.intensity!==void 0&&(r.intensity=f.intensity),r.name=e.createUniqueName(f.name||"light_"+n),a=Promise.resolve(r),e.cache.add(i,a),a}getDependency(n,e){if(n==="light")return this._loadLight(e)}createNodeAttachment(n){const e=this,i=this.parser,s=i.json.nodes[n],u=(s.extensions&&s.extensions[this.name]||{}).light;return u===void 0?null:this._loadLight(u).then(function(f){return i._getNodeRef(e.cache,u,f)})}}class Sh{constructor(){this.name=nt.KHR_MATERIALS_UNLIT}getMaterialType(){return xt}extendParams(n,e,i){const a=[];n.color=new ue(1,1,1),n.opacity=1;const s=e.pbrMetallicRoughness;if(s){if(Array.isArray(s.baseColorFactor)){const o=s.baseColorFactor;n.color.setRGB(o[0],o[1],o[2],Jt),n.opacity=o[3]}s.baseColorTexture!==void 0&&a.push(i.assignTexture(n,"map",s.baseColorTexture,Ct))}return Promise.all(a)}}class Mh{constructor(n){this.parser=n,this.name=nt.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(n,e){const i=yt(this.parser,n,this.name);return i===null||i.emissiveStrength!==void 0&&(e.emissiveIntensity=i.emissiveStrength),Promise.resolve()}}class Eh{constructor(n){this.parser=n,this.name=nt.KHR_MATERIALS_CLEARCOAT}getMaterialType(n){return yt(this.parser,n,this.name)!==null?$t:null}extendMaterialParams(n,e){const i=yt(this.parser,n,this.name);if(i===null)return Promise.resolve();const a=[];if(i.clearcoatFactor!==void 0&&(e.clearcoat=i.clearcoatFactor),i.clearcoatTexture!==void 0&&a.push(this.parser.assignTexture(e,"clearcoatMap",i.clearcoatTexture)),i.clearcoatRoughnessFactor!==void 0&&(e.clearcoatRoughness=i.clearcoatRoughnessFactor),i.clearcoatRoughnessTexture!==void 0&&a.push(this.parser.assignTexture(e,"clearcoatRoughnessMap",i.clearcoatRoughnessTexture)),i.clearcoatNormalTexture!==void 0&&(a.push(this.parser.assignTexture(e,"clearcoatNormalMap",i.clearcoatNormalTexture)),i.clearcoatNormalTexture.scale!==void 0)){const s=i.clearcoatNormalTexture.scale;e.clearcoatNormalScale=new ut(s,s)}return Promise.all(a)}}class Th{constructor(n){this.parser=n,this.name=nt.KHR_MATERIALS_DISPERSION}getMaterialType(n){return yt(this.parser,n,this.name)!==null?$t:null}extendMaterialParams(n,e){const i=yt(this.parser,n,this.name);return i===null||(e.dispersion=i.dispersion!==void 0?i.dispersion:0),Promise.resolve()}}class wh{constructor(n){this.parser=n,this.name=nt.KHR_MATERIALS_IRIDESCENCE}getMaterialType(n){return yt(this.parser,n,this.name)!==null?$t:null}extendMaterialParams(n,e){const i=yt(this.parser,n,this.name);if(i===null)return Promise.resolve();const a=[];return i.iridescenceFactor!==void 0&&(e.iridescence=i.iridescenceFactor),i.iridescenceTexture!==void 0&&a.push(this.parser.assignTexture(e,"iridescenceMap",i.iridescenceTexture)),i.iridescenceIor!==void 0&&(e.iridescenceIOR=i.iridescenceIor),e.iridescenceThicknessRange===void 0&&(e.iridescenceThicknessRange=[100,400]),i.iridescenceThicknessMinimum!==void 0&&(e.iridescenceThicknessRange[0]=i.iridescenceThicknessMinimum),i.iridescenceThicknessMaximum!==void 0&&(e.iridescenceThicknessRange[1]=i.iridescenceThicknessMaximum),i.iridescenceThicknessTexture!==void 0&&a.push(this.parser.assignTexture(e,"iridescenceThicknessMap",i.iridescenceThicknessTexture)),Promise.all(a)}}class bh{constructor(n){this.parser=n,this.name=nt.KHR_MATERIALS_SHEEN}getMaterialType(n){return yt(this.parser,n,this.name)!==null?$t:null}extendMaterialParams(n,e){const i=yt(this.parser,n,this.name);if(i===null)return Promise.resolve();const a=[];if(e.sheenColor=new ue(0,0,0),e.sheenRoughness=0,e.sheen=1,i.sheenColorFactor!==void 0){const s=i.sheenColorFactor;e.sheenColor.setRGB(s[0],s[1],s[2],Jt)}return i.sheenRoughnessFactor!==void 0&&(e.sheenRoughness=i.sheenRoughnessFactor),i.sheenColorTexture!==void 0&&a.push(this.parser.assignTexture(e,"sheenColorMap",i.sheenColorTexture,Ct)),i.sheenRoughnessTexture!==void 0&&a.push(this.parser.assignTexture(e,"sheenRoughnessMap",i.sheenRoughnessTexture)),Promise.all(a)}}class Rh{constructor(n){this.parser=n,this.name=nt.KHR_MATERIALS_TRANSMISSION}getMaterialType(n){return yt(this.parser,n,this.name)!==null?$t:null}extendMaterialParams(n,e){const i=yt(this.parser,n,this.name);if(i===null)return Promise.resolve();const a=[];return i.transmissionFactor!==void 0&&(e.transmission=i.transmissionFactor),i.transmissionTexture!==void 0&&a.push(this.parser.assignTexture(e,"transmissionMap",i.transmissionTexture)),Promise.all(a)}}class Ah{constructor(n){this.parser=n,this.name=nt.KHR_MATERIALS_VOLUME}getMaterialType(n){return yt(this.parser,n,this.name)!==null?$t:null}extendMaterialParams(n,e){const i=yt(this.parser,n,this.name);if(i===null)return Promise.resolve();const a=[];e.thickness=i.thicknessFactor!==void 0?i.thicknessFactor:0,i.thicknessTexture!==void 0&&a.push(this.parser.assignTexture(e,"thicknessMap",i.thicknessTexture)),e.attenuationDistance=i.attenuationDistance||1/0;const s=i.attenuationColor||[1,1,1];return e.attenuationColor=new ue().setRGB(s[0],s[1],s[2],Jt),Promise.all(a)}}class yh{constructor(n){this.parser=n,this.name=nt.KHR_MATERIALS_IOR}getMaterialType(n){return yt(this.parser,n,this.name)!==null?$t:null}extendMaterialParams(n,e){const i=yt(this.parser,n,this.name);return i===null||(e.ior=i.ior!==void 0?i.ior:1.5,e.ior===0&&(e.ior=1e3)),Promise.resolve()}}class Ch{constructor(n){this.parser=n,this.name=nt.KHR_MATERIALS_SPECULAR}getMaterialType(n){return yt(this.parser,n,this.name)!==null?$t:null}extendMaterialParams(n,e){const i=yt(this.parser,n,this.name);if(i===null)return Promise.resolve();const a=[];e.specularIntensity=i.specularFactor!==void 0?i.specularFactor:1,i.specularTexture!==void 0&&a.push(this.parser.assignTexture(e,"specularIntensityMap",i.specularTexture));const s=i.specularColorFactor||[1,1,1];return e.specularColor=new ue().setRGB(s[0],s[1],s[2],Jt),i.specularColorTexture!==void 0&&a.push(this.parser.assignTexture(e,"specularColorMap",i.specularColorTexture,Ct)),Promise.all(a)}}class Lh{constructor(n){this.parser=n,this.name=nt.EXT_MATERIALS_BUMP}getMaterialType(n){return yt(this.parser,n,this.name)!==null?$t:null}extendMaterialParams(n,e){const i=yt(this.parser,n,this.name);if(i===null)return Promise.resolve();const a=[];return e.bumpScale=i.bumpFactor!==void 0?i.bumpFactor:1,i.bumpTexture!==void 0&&a.push(this.parser.assignTexture(e,"bumpMap",i.bumpTexture)),Promise.all(a)}}class Ph{constructor(n){this.parser=n,this.name=nt.KHR_MATERIALS_ANISOTROPY}getMaterialType(n){return yt(this.parser,n,this.name)!==null?$t:null}extendMaterialParams(n,e){const i=yt(this.parser,n,this.name);if(i===null)return Promise.resolve();const a=[];return i.anisotropyStrength!==void 0&&(e.anisotropy=i.anisotropyStrength),i.anisotropyRotation!==void 0&&(e.anisotropyRotation=i.anisotropyRotation),i.anisotropyTexture!==void 0&&a.push(this.parser.assignTexture(e,"anisotropyMap",i.anisotropyTexture)),Promise.all(a)}}class Dh{constructor(n){this.parser=n,this.name=nt.KHR_TEXTURE_BASISU}loadTexture(n){const e=this.parser,i=e.json,a=i.textures[n];if(!a.extensions||!a.extensions[this.name])return null;const s=a.extensions[this.name],o=e.options.ktx2Loader;if(!o){if(i.extensionsRequired&&i.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return e.loadTextureImage(n,s.source,o)}}class Ih{constructor(n){this.parser=n,this.name=nt.EXT_TEXTURE_WEBP}loadTexture(n){const e=this.name,i=this.parser,a=i.json,s=a.textures[n];if(!s.extensions||!s.extensions[e])return null;const o=s.extensions[e],u=a.images[o.source];let f=i.textureLoader;if(u.uri){const r=i.options.manager.getHandler(u.uri);r!==null&&(f=r)}return i.loadTextureImage(n,o.source,f)}}class Uh{constructor(n){this.parser=n,this.name=nt.EXT_TEXTURE_AVIF}loadTexture(n){const e=this.name,i=this.parser,a=i.json,s=a.textures[n];if(!s.extensions||!s.extensions[e])return null;const o=s.extensions[e],u=a.images[o.source];let f=i.textureLoader;if(u.uri){const r=i.options.manager.getHandler(u.uri);r!==null&&(f=r)}return i.loadTextureImage(n,o.source,f)}}class ao{constructor(n,e){this.name=e,this.parser=n}loadBufferView(n){const e=this.parser.json,i=e.bufferViews[n];if(i.extensions&&i.extensions[this.name]){const a=i.extensions[this.name],s=this.parser.getDependency("buffer",a.buffer),o=this.parser.options.meshoptDecoder;if(!o||!o.supported){if(e.extensionsRequired&&e.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return s.then(function(u){const f=a.byteOffset||0,r=a.byteLength||0,m=a.count,_=a.byteStride,h=new Uint8Array(u,f,r);return o.decodeGltfBufferAsync?o.decodeGltfBufferAsync(m,_,h,a.mode,a.filter).then(function(v){return v.buffer}):o.ready.then(function(){const v=new ArrayBuffer(m*_);return o.decodeGltfBuffer(new Uint8Array(v),m,_,h,a.mode,a.filter),v})})}else return null}}class Nh{constructor(n){this.name=nt.EXT_MESH_GPU_INSTANCING,this.parser=n}createNodeMesh(n){const e=this.parser.json,i=e.nodes[n];if(!i.extensions||!i.extensions[this.name]||i.mesh===void 0)return null;const a=e.meshes[i.mesh];for(const r of a.primitives)if(r.mode!==Zt.TRIANGLES&&r.mode!==Zt.TRIANGLE_STRIP&&r.mode!==Zt.TRIANGLE_FAN&&r.mode!==void 0)return null;const o=i.extensions[this.name].attributes,u=[],f={};for(const r in o)u.push(this.parser.getDependency("accessor",o[r]).then(m=>(f[r]=m,f[r])));return u.length<1?null:(u.push(this.parser.createNodeMesh(n)),Promise.all(u).then(r=>{const m=r.pop(),_=m.isGroup?m.children:[m],h=r[0].count,v=[];for(const p of _){const d=new At,c=new j,l=new an,g=new j(1,1,1),E=new St(p.geometry,p.material,h);for(let x=0;x<h;x++)f.TRANSLATION&&c.fromBufferAttribute(f.TRANSLATION,x),f.ROTATION&&l.fromBufferAttribute(f.ROTATION,x),f.SCALE&&g.fromBufferAttribute(f.SCALE,x),E.setMatrixAt(x,d.compose(c,l,g));for(const x in f)if(x==="_COLOR_0"){const R=f[x];E.instanceColor=new Ic(R.array,R.itemSize,R.normalized)}else x!=="TRANSLATION"&&x!=="ROTATION"&&x!=="SCALE"&&p.geometry.setAttribute(x,f[x]);mi.prototype.copy.call(E,p),this.parser.assignFinalMaterial(E),v.push(E)}return m.isGroup?(m.clear(),m.add(...v),m):v[0]}))}}const Qo="glTF",ni=12,oo={JSON:1313821514,BIN:5130562};class Fh{constructor(n){this.name=nt.KHR_BINARY_GLTF,this.content=null,this.body=null;const e=new DataView(n,0,ni),i=new TextDecoder;if(this.header={magic:i.decode(new Uint8Array(n.slice(0,4))),version:e.getUint32(4,!0),length:e.getUint32(8,!0)},this.header.magic!==Qo)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");const a=this.header.length-ni,s=new DataView(n,ni);let o=0;for(;o<a;){const u=s.getUint32(o,!0);o+=4;const f=s.getUint32(o,!0);if(o+=4,f===oo.JSON){const r=new Uint8Array(n,ni+o,u);this.content=i.decode(r)}else if(f===oo.BIN){const r=ni+o;this.body=n.slice(r,r+u)}o+=u}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}}class Oh{constructor(n,e){if(!e)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=nt.KHR_DRACO_MESH_COMPRESSION,this.json=n,this.dracoLoader=e,this.dracoLoader.preload()}decodePrimitive(n,e){const i=this.json,a=this.dracoLoader,s=n.extensions[this.name].bufferView,o=n.extensions[this.name].attributes,u={},f={},r={};for(const m in o){const _=Ms[m]||m.toLowerCase();u[_]=o[m]}for(const m in n.attributes){const _=Ms[m]||m.toLowerCase();if(o[m]!==void 0){const h=i.accessors[n.attributes[m]],v=kn[h.componentType];r[_]=v.name,f[_]=h.normalized===!0}}return e.getDependency("bufferView",s).then(function(m){return new Promise(function(_,h){a.decodeDracoFile(m,function(v){for(const p in v.attributes){const d=v.attributes[p],c=f[p];c!==void 0&&(d.normalized=c)}_(v)},u,r,Jt,h)})})}}class Bh{constructor(){this.name=nt.KHR_TEXTURE_TRANSFORM}extendTexture(n,e){return(e.texCoord===void 0||e.texCoord===n.channel)&&e.offset===void 0&&e.rotation===void 0&&e.scale===void 0||(n=n.clone(),e.texCoord!==void 0&&(n.channel=e.texCoord),e.offset!==void 0&&n.offset.fromArray(e.offset),e.rotation!==void 0&&(n.rotation=e.rotation),e.scale!==void 0&&n.repeat.fromArray(e.scale),n.needsUpdate=!0),n}}class Gh{constructor(){this.name=nt.KHR_MESH_QUANTIZATION}}class Jo extends Yc{constructor(n,e,i,a){super(n,e,i,a)}copySampleValue_(n){const e=this.resultBuffer,i=this.sampleValues,a=this.valueSize,s=n*a*3+a;for(let o=0;o!==a;o++)e[o]=i[s+o];return e}interpolate_(n,e,i,a){const s=this.resultBuffer,o=this.sampleValues,u=this.valueSize,f=u*2,r=u*3,m=a-e,_=(i-e)/m,h=_*_,v=h*_,p=n*r,d=p-r,c=-2*v+3*h,l=v-h,g=1-c,E=l-h+_;for(let x=0;x!==u;x++){const R=o[d+x+u],T=o[d+x+f]*m,w=o[p+x+u],S=o[p+x]*m;s[x]=g*R+E*T+c*w+l*S}return s}}const Hh=new an;class kh extends Jo{interpolate_(n,e,i,a){const s=super.interpolate_(n,e,i,a);return Hh.fromArray(s).normalize().toArray(s),s}}const Zt={POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6},kn={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},ro={9728:mn,9729:Bt,9984:wo,9985:Ri,9986:si,9987:pn},co={33071:Li,33648:To,10497:pi},is={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},Ms={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},Tn={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},Vh={CUBICSPLINE:void 0,LINEAR:ko,STEP:Kc},ss={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function zh(t){return t.DefaultMaterial===void 0&&(t.DefaultMaterial=new q({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:Vn})),t.DefaultMaterial}function Cn(t,n,e){for(const i in e.extensions)t[i]===void 0&&(n.userData.gltfExtensions=n.userData.gltfExtensions||{},n.userData.gltfExtensions[i]=e.extensions[i])}function sn(t,n){n.extras!==void 0&&(typeof n.extras=="object"?Object.assign(t.userData,n.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+n.extras))}function Wh(t,n,e){let i=!1,a=!1,s=!1;for(let r=0,m=n.length;r<m;r++){const _=n[r];if(_.POSITION!==void 0&&(i=!0),_.NORMAL!==void 0&&(a=!0),_.COLOR_0!==void 0&&(s=!0),i&&a&&s)break}if(!i&&!a&&!s)return Promise.resolve(t);const o=[],u=[],f=[];for(let r=0,m=n.length;r<m;r++){const _=n[r];if(i){const h=_.POSITION!==void 0?e.getDependency("accessor",_.POSITION):t.attributes.position;o.push(h)}if(a){const h=_.NORMAL!==void 0?e.getDependency("accessor",_.NORMAL):t.attributes.normal;u.push(h)}if(s){const h=_.COLOR_0!==void 0?e.getDependency("accessor",_.COLOR_0):t.attributes.color;f.push(h)}}return Promise.all([Promise.all(o),Promise.all(u),Promise.all(f)]).then(function(r){const m=r[0],_=r[1],h=r[2];return i&&(t.morphAttributes.position=m),a&&(t.morphAttributes.normal=_),s&&(t.morphAttributes.color=h),t.morphTargetsRelative=!0,t})}function Xh(t,n){if(t.updateMorphTargets(),n.weights!==void 0)for(let e=0,i=n.weights.length;e<i;e++)t.morphTargetInfluences[e]=n.weights[e];if(n.extras&&Array.isArray(n.extras.targetNames)){const e=n.extras.targetNames;if(t.morphTargetInfluences.length===e.length){t.morphTargetDictionary={};for(let i=0,a=e.length;i<a;i++)t.morphTargetDictionary[e[i]]=i}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function Kh(t){let n;const e=t.extensions&&t.extensions[nt.KHR_DRACO_MESH_COMPRESSION];if(e?n="draco:"+e.bufferView+":"+e.indices+":"+as(e.attributes):n=t.indices+":"+as(t.attributes)+":"+t.mode,t.targets!==void 0)for(let i=0,a=t.targets.length;i<a;i++)n+=":"+as(t.targets[i]);return n}function as(t){let n="";const e=Object.keys(t).sort();for(let i=0,a=e.length;i<a;i++)n+=e[i]+":"+t[e[i]]+";";return n}function Es(t){switch(t){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function qh(t){return t.search(/\.jpe?g($|\?)/i)>0||t.search(/^data\:image\/jpeg/)===0?"image/jpeg":t.search(/\.webp($|\?)/i)>0||t.search(/^data\:image\/webp/)===0?"image/webp":t.search(/\.ktx2($|\?)/i)>0||t.search(/^data\:image\/ktx2/)===0?"image/ktx2":"image/png"}const Yh=new At;class $h{constructor(n={},e={}){this.json=n,this.extensions={},this.plugins={},this.options=e,this.cache=new vh,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let i=!1,a=-1,s=!1,o=-1;if(typeof navigator<"u"&&typeof navigator.userAgent<"u"){const u=navigator.userAgent;i=/^((?!chrome|android).)*safari/i.test(u)===!0;const f=u.match(/Version\/(\d+)/);a=i&&f?parseInt(f[1],10):-1,s=u.indexOf("Firefox")>-1,o=s?u.match(/Firefox\/([0-9]+)\./)[1]:-1}typeof createImageBitmap>"u"||i&&a<17||s&&o<98?this.textureLoader=new Uc(this.options.manager):this.textureLoader=new Nc(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new Bo(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials"&&this.fileLoader.setWithCredentials(!0)}setExtensions(n){this.extensions=n}setPlugins(n){this.plugins=n}parse(n,e){const i=this,a=this.json,s=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(o){return o._markDefs&&o._markDefs()}),Promise.all(this._invokeAll(function(o){return o.beforeRoot&&o.beforeRoot()})).then(function(){return Promise.all([i.getDependencies("scene"),i.getDependencies("animation"),i.getDependencies("camera")])}).then(function(o){const u={scene:o[0][a.scene||0],scenes:o[0],animations:o[1],cameras:o[2],asset:a.asset,parser:i,userData:{}};return Cn(s,u,a),sn(u,a),Promise.all(i._invokeAll(function(f){return f.afterRoot&&f.afterRoot(u)})).then(function(){for(const f of u.scenes)f.updateMatrixWorld();n(u)})}).catch(e)}_markDefs(){const n=this.json.nodes||[],e=this.json.skins||[],i=this.json.meshes||[];for(let a=0,s=e.length;a<s;a++){const o=e[a].joints;for(let u=0,f=o.length;u<f;u++)n[o[u]].isBone=!0}for(let a=0,s=n.length;a<s;a++){const o=n[a];o.mesh!==void 0&&(this._addNodeRef(this.meshCache,o.mesh),o.skin!==void 0&&(i[o.mesh].isSkinnedMesh=!0)),o.camera!==void 0&&this._addNodeRef(this.cameraCache,o.camera)}}_addNodeRef(n,e){e!==void 0&&(n.refs[e]===void 0&&(n.refs[e]=n.uses[e]=0),n.refs[e]++)}_getNodeRef(n,e,i){if(n.refs[e]<=1)return i;const a=i.clone(),s=(o,u)=>{const f=this.associations.get(o);f!=null&&this.associations.set(u,f);for(const[r,m]of o.children.entries())s(m,u.children[r])};return s(i,a),a.name+="_instance_"+n.uses[e]++,a}_invokeOne(n){const e=Object.values(this.plugins);e.push(this);for(let i=0;i<e.length;i++){const a=n(e[i]);if(a)return a}return null}_invokeAll(n){const e=Object.values(this.plugins);e.unshift(this);const i=[];for(let a=0;a<e.length;a++){const s=n(e[a]);s&&i.push(s)}return i}getDependency(n,e){const i=n+":"+e;let a=this.cache.get(i);if(!a){switch(n){case"scene":a=this.loadScene(e);break;case"node":a=this._invokeOne(function(s){return s.loadNode&&s.loadNode(e)});break;case"mesh":a=this._invokeOne(function(s){return s.loadMesh&&s.loadMesh(e)});break;case"accessor":a=this.loadAccessor(e);break;case"bufferView":a=this._invokeOne(function(s){return s.loadBufferView&&s.loadBufferView(e)});break;case"buffer":a=this.loadBuffer(e);break;case"material":a=this._invokeOne(function(s){return s.loadMaterial&&s.loadMaterial(e)});break;case"texture":a=this._invokeOne(function(s){return s.loadTexture&&s.loadTexture(e)});break;case"skin":a=this.loadSkin(e);break;case"animation":a=this._invokeOne(function(s){return s.loadAnimation&&s.loadAnimation(e)});break;case"camera":a=this.loadCamera(e);break;default:if(a=this._invokeOne(function(s){return s!=this&&s.getDependency&&s.getDependency(n,e)}),!a)throw new Error("Unknown type: "+n);break}this.cache.add(i,a)}return a}getDependencies(n){let e=this.cache.get(n);if(!e){const i=this,a=this.json[n+(n==="mesh"?"es":"s")]||[];e=Promise.all(a.map(function(s,o){return i.getDependency(n,o)})),this.cache.add(n,e)}return e}loadBuffer(n){const e=this.json.buffers[n],i=this.fileLoader;if(e.type&&e.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+e.type+" buffer type is not supported.");if(e.uri===void 0&&n===0)return Promise.resolve(this.extensions[nt.KHR_BINARY_GLTF].body);const a=this.options;return new Promise(function(s,o){i.load(ci.resolveURL(e.uri,a.path),s,void 0,function(){o(new Error('THREE.GLTFLoader: Failed to load buffer "'+e.uri+'".'))})})}loadBufferView(n){const e=this.json.bufferViews[n];return this.getDependency("buffer",e.buffer).then(function(i){const a=e.byteLength||0,s=e.byteOffset||0;return i.slice(s,s+a)})}loadAccessor(n){const e=this,i=this.json,a=this.json.accessors[n];if(a.bufferView===void 0&&a.sparse===void 0){const o=is[a.type],u=kn[a.componentType],f=a.normalized===!0,r=new u(a.count*o);return Promise.resolve(new kt(r,o,f))}const s=[];return a.bufferView!==void 0?s.push(this.getDependency("bufferView",a.bufferView)):s.push(null),a.sparse!==void 0&&(s.push(this.getDependency("bufferView",a.sparse.indices.bufferView)),s.push(this.getDependency("bufferView",a.sparse.values.bufferView))),Promise.all(s).then(function(o){const u=o[0],f=is[a.type],r=kn[a.componentType],m=r.BYTES_PER_ELEMENT,_=m*f,h=a.byteOffset||0,v=a.bufferView!==void 0?i.bufferViews[a.bufferView].byteStride:void 0,p=a.normalized===!0;let d,c;if(v&&v!==_){const l=Math.floor(h/v),g="InterleavedBuffer:"+a.bufferView+":"+a.componentType+":"+l+":"+a.count;let E=e.cache.get(g);E||(d=new r(u,l*v,a.count*v/m),E=new Fc(d,v/m),e.cache.add(g,E)),c=new qc(E,f,h%v/m,p)}else u===null?d=new r(a.count*f):d=new r(u,h,a.count*f),c=new kt(d,f,p);if(a.sparse!==void 0){const l=is.SCALAR,g=kn[a.sparse.indices.componentType],E=a.sparse.indices.byteOffset||0,x=a.sparse.values.byteOffset||0,R=new g(o[1],E,a.sparse.count*l),T=new r(o[2],x,a.sparse.count*f);u!==null&&(c=new kt(c.array.slice(),c.itemSize,c.normalized)),c.normalized=!1;for(let w=0,S=R.length;w<S;w++){const A=R[w];if(c.setX(A,T[w*f]),f>=2&&c.setY(A,T[w*f+1]),f>=3&&c.setZ(A,T[w*f+2]),f>=4&&c.setW(A,T[w*f+3]),f>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}c.normalized=p}return c})}loadTexture(n){const e=this.json,i=this.options,s=e.textures[n].source,o=e.images[s];let u=this.textureLoader;if(o.uri){const f=i.manager.getHandler(o.uri);f!==null&&(u=f)}return this.loadTextureImage(n,s,u)}loadTextureImage(n,e,i){const a=this,s=this.json,o=s.textures[n],u=s.images[e],f=(u.uri||u.bufferView)+":"+o.sampler;if(this.textureCache[f])return this.textureCache[f];const r=this.loadImageSource(e,i).then(function(m){m.flipY=!1,m.name=o.name||u.name||"",m.name===""&&typeof u.uri=="string"&&u.uri.startsWith("data:image/")===!1&&(m.name=u.uri);const h=(s.samplers||{})[o.sampler]||{};return m.magFilter=ro[h.magFilter]||Bt,m.minFilter=ro[h.minFilter]||pn,m.wrapS=co[h.wrapS]||pi,m.wrapT=co[h.wrapT]||pi,m.generateMipmaps=!m.isCompressedTexture&&m.minFilter!==mn&&m.minFilter!==Bt,a.associations.set(m,{textures:n}),m}).catch(function(){return null});return this.textureCache[f]=r,r}loadImageSource(n,e){const i=this,a=this.json,s=this.options;if(this.sourceCache[n]!==void 0)return this.sourceCache[n].then(_=>_.clone());const o=a.images[n],u=self.URL||self.webkitURL;let f=o.uri||"",r=!1;if(o.bufferView!==void 0)f=i.getDependency("bufferView",o.bufferView).then(function(_){r=!0;const h=new Blob([_],{type:o.mimeType});return f=u.createObjectURL(h),f});else if(o.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+n+" is missing URI and bufferView");const m=Promise.resolve(f).then(function(_){return new Promise(function(h,v){let p=h;e.isImageBitmapLoader===!0&&(p=function(d){const c=new hs(d);c.needsUpdate=!0,h(c)}),e.load(ci.resolveURL(_,s.path),p,void 0,v)})}).then(function(_){return r===!0&&u.revokeObjectURL(f),sn(_,o),_.userData.mimeType=o.mimeType||qh(o.uri),_}).catch(function(_){throw console.error("THREE.GLTFLoader: Couldn't load texture",f),_});return this.sourceCache[n]=m,m}assignTexture(n,e,i,a){const s=this;return this.getDependency("texture",i.index).then(function(o){if(!o)return null;if(i.texCoord!==void 0&&i.texCoord>0&&(o=o.clone(),o.channel=i.texCoord),s.extensions[nt.KHR_TEXTURE_TRANSFORM]){const u=i.extensions!==void 0?i.extensions[nt.KHR_TEXTURE_TRANSFORM]:void 0;if(u){const f=s.associations.get(o);o=s.extensions[nt.KHR_TEXTURE_TRANSFORM].extendTexture(o,u),s.associations.set(o,f)}}return a!==void 0&&(o.colorSpace=a),n[e]=o,o})}assignFinalMaterial(n){const e=n.geometry;let i=n.material;const a=e.attributes.tangent===void 0,s=e.attributes.color!==void 0,o=e.attributes.normal===void 0;if(n.isPoints){const u="PointsMaterial:"+i.uuid;let f=this.cache.get(u);f||(f=new Go,Yi.prototype.copy.call(f,i),f.color.copy(i.color),f.map=i.map,f.sizeAttenuation=!1,this.cache.add(u,f)),i=f}else if(n.isLine){const u="LineBasicMaterial:"+i.uuid;let f=this.cache.get(u);f||(f=new Oc,Yi.prototype.copy.call(f,i),f.color.copy(i.color),f.map=i.map,this.cache.add(u,f)),i=f}if(a||s||o){let u="ClonedMaterial:"+i.uuid+":";a&&(u+="derivative-tangents:"),s&&(u+="vertex-colors:"),o&&(u+="flat-shading:");let f=this.cache.get(u);f||(f=i.clone(),s&&(f.vertexColors=!0),o&&(f.flatShading=!0),a&&(f.normalScale&&(f.normalScale.y*=-1),f.clearcoatNormalScale&&(f.clearcoatNormalScale.y*=-1)),this.cache.add(u,f),this.associations.set(f,this.associations.get(i))),i=f}n.material=i}getMaterialType(){return q}loadMaterial(n){const e=this,i=this.json,a=this.extensions,s=i.materials[n];let o;const u={},f=s.extensions||{},r=[];if(f[nt.KHR_MATERIALS_UNLIT]){const _=a[nt.KHR_MATERIALS_UNLIT];o=_.getMaterialType(),r.push(_.extendParams(u,s,e))}else{const _=s.pbrMetallicRoughness||{};if(u.color=new ue(1,1,1),u.opacity=1,Array.isArray(_.baseColorFactor)){const h=_.baseColorFactor;u.color.setRGB(h[0],h[1],h[2],Jt),u.opacity=h[3]}_.baseColorTexture!==void 0&&r.push(e.assignTexture(u,"map",_.baseColorTexture,Ct)),u.metalness=_.metallicFactor!==void 0?_.metallicFactor:1,u.roughness=_.roughnessFactor!==void 0?_.roughnessFactor:1,_.metallicRoughnessTexture!==void 0&&(r.push(e.assignTexture(u,"metalnessMap",_.metallicRoughnessTexture)),r.push(e.assignTexture(u,"roughnessMap",_.metallicRoughnessTexture))),o=this._invokeOne(function(h){return h.getMaterialType&&h.getMaterialType(n)}),r.push(Promise.all(this._invokeAll(function(h){return h.extendMaterialParams&&h.extendMaterialParams(n,u)})))}s.doubleSided===!0&&(u.side=ct);const m=s.alphaMode||ss.OPAQUE;if(m===ss.BLEND?(u.transparent=!0,u.depthWrite=!1):(u.transparent=!1,m===ss.MASK&&(u.alphaTest=s.alphaCutoff!==void 0?s.alphaCutoff:.5)),s.normalTexture!==void 0&&o!==xt&&(r.push(e.assignTexture(u,"normalMap",s.normalTexture)),u.normalScale=new ut(1,1),s.normalTexture.scale!==void 0)){const _=s.normalTexture.scale;u.normalScale.set(_,_)}if(s.occlusionTexture!==void 0&&o!==xt&&(r.push(e.assignTexture(u,"aoMap",s.occlusionTexture)),s.occlusionTexture.strength!==void 0&&(u.aoMapIntensity=s.occlusionTexture.strength)),s.emissiveFactor!==void 0&&o!==xt){const _=s.emissiveFactor;u.emissive=new ue().setRGB(_[0],_[1],_[2],Jt)}return s.emissiveTexture!==void 0&&o!==xt&&r.push(e.assignTexture(u,"emissiveMap",s.emissiveTexture,Ct)),Promise.all(r).then(function(){const _=new o(u);return s.name&&(_.name=s.name),sn(_,s),e.associations.set(_,{materials:n}),s.extensions&&Cn(a,_,s),_})}createUniqueName(n){const e=Bc.sanitizeNodeName(n||"");return e in this.nodeNamesUsed?e+"_"+ ++this.nodeNamesUsed[e]:(this.nodeNamesUsed[e]=0,e)}loadGeometries(n){const e=this,i=this.extensions,a=this.primitiveCache;function s(u){return i[nt.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(u,e).then(function(f){return lo(f,u,e)})}const o=[];for(let u=0,f=n.length;u<f;u++){const r=n[u],m=Kh(r),_=a[m];if(_)o.push(_.promise);else{let h;r.extensions&&r.extensions[nt.KHR_DRACO_MESH_COMPRESSION]?h=s(r):h=lo(new vn,r,e),a[m]={primitive:r,promise:h},o.push(h)}}return Promise.all(o)}loadMesh(n){const e=this,i=this.json,a=this.extensions,s=i.meshes[n],o=s.primitives,u=[];for(let f=0,r=o.length;f<r;f++){const m=o[f].material===void 0?zh(this.cache):this.getDependency("material",o[f].material);u.push(m)}return u.push(e.loadGeometries(o)),Promise.all(u).then(function(f){const r=f.slice(0,f.length-1),m=f[f.length-1],_=[];for(let v=0,p=m.length;v<p;v++){const d=m[v],c=o[v];let l;const g=r[v];if(c.mode===Zt.TRIANGLES||c.mode===Zt.TRIANGLE_STRIP||c.mode===Zt.TRIANGLE_FAN||c.mode===void 0)l=s.isSkinnedMesh===!0?new Gc(d,g):new U(d,g),l.isSkinnedMesh===!0&&l.normalizeSkinWeights(),c.mode===Zt.TRIANGLE_STRIP?l.geometry=so(l.geometry,Oo):c.mode===Zt.TRIANGLE_FAN&&(l.geometry=so(l.geometry,ms));else if(c.mode===Zt.LINES)l=new Hc(d,g);else if(c.mode===Zt.LINE_STRIP)l=new kc(d,g);else if(c.mode===Zt.LINE_LOOP)l=new Vc(d,g);else if(c.mode===Zt.POINTS)l=new Ho(d,g);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+c.mode);Object.keys(l.geometry.morphAttributes).length>0&&Xh(l,s),l.name=e.createUniqueName(s.name||"mesh_"+n),sn(l,s),c.extensions&&Cn(a,l,c),e.assignFinalMaterial(l),_.push(l)}for(let v=0,p=_.length;v<p;v++)e.associations.set(_[v],{meshes:n,primitives:v});if(_.length===1)return s.extensions&&Cn(a,_[0],s),_[0];const h=new lt;s.extensions&&Cn(a,h,s),e.associations.set(h,{meshes:n});for(let v=0,p=_.length;v<p;v++)h.add(_[v]);return h})}loadCamera(n){let e;const i=this.json.cameras[n],a=i[i.type];if(!a){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return i.type==="perspective"?e=new Hn(In.radToDeg(a.yfov),a.aspectRatio||1,a.znear||1,a.zfar||2e6):i.type==="orthographic"&&(e=new Di(-a.xmag,a.xmag,a.ymag,-a.ymag,a.znear,a.zfar)),i.name&&(e.name=this.createUniqueName(i.name)),sn(e,i),Promise.resolve(e)}loadSkin(n){const e=this.json.skins[n],i=[];for(let a=0,s=e.joints.length;a<s;a++)i.push(this._loadNodeShallow(e.joints[a]));return e.inverseBindMatrices!==void 0?i.push(this.getDependency("accessor",e.inverseBindMatrices)):i.push(null),Promise.all(i).then(function(a){const s=a.pop(),o=a,u=[],f=[];for(let r=0,m=o.length;r<m;r++){const _=o[r];if(_){u.push(_);const h=new At;s!==null&&h.fromArray(s.array,r*16),f.push(h)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',e.joints[r])}return new zc(u,f)})}loadAnimation(n){const e=this.json,i=this,a=e.animations[n],s=a.name?a.name:"animation_"+n,o=[],u=[],f=[],r=[],m=[];for(let _=0,h=a.channels.length;_<h;_++){const v=a.channels[_],p=a.samplers[v.sampler],d=v.target,c=d.node,l=a.parameters!==void 0?a.parameters[p.input]:p.input,g=a.parameters!==void 0?a.parameters[p.output]:p.output;d.node!==void 0&&(o.push(this.getDependency("node",c)),u.push(this.getDependency("accessor",l)),f.push(this.getDependency("accessor",g)),r.push(p),m.push(d))}return Promise.all([Promise.all(o),Promise.all(u),Promise.all(f),Promise.all(r),Promise.all(m)]).then(function(_){const h=_[0],v=_[1],p=_[2],d=_[3],c=_[4],l=[];for(let E=0,x=h.length;E<x;E++){const R=h[E],T=v[E],w=p[E],S=d[E],A=c[E];if(R===void 0)continue;R.updateMatrix&&R.updateMatrix();const C=i._createAnimationTracks(R,T,w,S,A);if(C)for(let L=0;L<C.length;L++)l.push(C[L])}const g=new Wc(s,void 0,l);return sn(g,a),g})}createNodeMesh(n){const e=this.json,i=this,a=e.nodes[n];return a.mesh===void 0?null:i.getDependency("mesh",a.mesh).then(function(s){const o=i._getNodeRef(i.meshCache,a.mesh,s);return a.weights!==void 0&&o.traverse(function(u){if(u.isMesh)for(let f=0,r=a.weights.length;f<r;f++)u.morphTargetInfluences[f]=a.weights[f]}),o})}loadNode(n){const e=this.json,i=this,a=e.nodes[n],s=i._loadNodeShallow(n),o=[],u=a.children||[];for(let r=0,m=u.length;r<m;r++)o.push(i.getDependency("node",u[r]));const f=a.skin===void 0?Promise.resolve(null):i.getDependency("skin",a.skin);return Promise.all([s,Promise.all(o),f]).then(function(r){const m=r[0],_=r[1],h=r[2];h!==null&&m.traverse(function(v){v.isSkinnedMesh&&v.bind(h,Yh)});for(let v=0,p=_.length;v<p;v++)m.add(_[v]);if(m.userData.pivot!==void 0&&_.length>0){const v=m.userData.pivot,p=_[0];m.pivot=new j().fromArray(v),m.position.x-=v[0],m.position.y-=v[1],m.position.z-=v[2],p.position.set(0,0,0),delete m.userData.pivot}return m})}_loadNodeShallow(n){const e=this.json,i=this.extensions,a=this;if(this.nodeCache[n]!==void 0)return this.nodeCache[n];const s=e.nodes[n],o=s.name?a.createUniqueName(s.name):"",u=[],f=a._invokeOne(function(r){return r.createNodeMesh&&r.createNodeMesh(n)});return f&&u.push(f),s.camera!==void 0&&u.push(a.getDependency("camera",s.camera).then(function(r){return a._getNodeRef(a.cameraCache,s.camera,r)})),a._invokeAll(function(r){return r.createNodeAttachment&&r.createNodeAttachment(n)}).forEach(function(r){u.push(r)}),this.nodeCache[n]=Promise.all(u).then(function(r){let m;if(s.isBone===!0?m=new Xc:r.length>1?m=new lt:r.length===1?m=r[0]:m=new mi,m!==r[0])for(let _=0,h=r.length;_<h;_++)m.add(r[_]);if(s.name&&(m.userData.name=s.name,m.name=o),sn(m,s),s.extensions&&Cn(i,m,s),s.matrix!==void 0){const _=new At;_.fromArray(s.matrix),m.applyMatrix4(_)}else s.translation!==void 0&&m.position.fromArray(s.translation),s.rotation!==void 0&&m.quaternion.fromArray(s.rotation),s.scale!==void 0&&m.scale.fromArray(s.scale);if(!a.associations.has(m))a.associations.set(m,{});else if(s.mesh!==void 0&&a.meshCache.refs[s.mesh]>1){const _=a.associations.get(m);a.associations.set(m,{..._})}return a.associations.get(m).nodes=n,m}),this.nodeCache[n]}loadScene(n){const e=this.extensions,i=this.json.scenes[n],a=this,s=new lt;i.name&&(s.name=a.createUniqueName(i.name)),sn(s,i),i.extensions&&Cn(e,s,i);const o=i.nodes||[],u=[];for(let f=0,r=o.length;f<r;f++)u.push(a.getDependency("node",o[f]));return Promise.all(u).then(function(f){for(let m=0,_=f.length;m<_;m++){const h=f[m];h.parent!==null?s.add(_h(h)):s.add(h)}const r=m=>{const _=new Map;for(const[h,v]of a.associations)(h instanceof Yi||h instanceof hs)&&_.set(h,v);return m.traverse(h=>{const v=a.associations.get(h);v!=null&&_.set(h,v)}),_};return a.associations=r(s),s})}_createAnimationTracks(n,e,i,a,s){const o=[],u=n.name?n.name:n.uuid,f=[];function r(v){v.morphTargetInfluences&&f.push(v.name?v.name:v.uuid)}Tn[s.path]===Tn.weights?(r(n),n.isGroup&&n.children.forEach(r)):f.push(u);let m;switch(Tn[s.path]){case Tn.weights:m=Ca;break;case Tn.rotation:m=La;break;case Tn.translation:case Tn.scale:m=ya;break;default:switch(i.itemSize){case 1:m=Ca;break;case 2:case 3:default:m=ya;break}break}const _=a.interpolation!==void 0?Vh[a.interpolation]:ko,h=this._getArrayFromAccessor(i);for(let v=0,p=f.length;v<p;v++){const d=new m(f[v]+"."+Tn[s.path],e.array,h,_);a.interpolation==="CUBICSPLINE"&&this._createCubicSplineTrackInterpolant(d),o.push(d)}return o}_getArrayFromAccessor(n){let e=n.array;if(n.normalized){const i=Es(e.constructor),a=new Float32Array(e.length);for(let s=0,o=e.length;s<o;s++)a[s]=e[s]*i;e=a}return e}_createCubicSplineTrackInterpolant(n){n.createInterpolant=function(i){const a=this instanceof La?kh:Jo;return new a(this.times,this.values,this.getValueSize()/3,i)},n.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}}function jh(t,n,e){const i=n.attributes,a=new Vo;if(i.POSITION!==void 0){const u=e.json.accessors[i.POSITION],f=u.min,r=u.max;if(f!==void 0&&r!==void 0){if(a.set(new j(f[0],f[1],f[2]),new j(r[0],r[1],r[2])),u.normalized){const m=Es(kn[u.componentType]);a.min.multiplyScalar(m),a.max.multiplyScalar(m)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;const s=n.targets;if(s!==void 0){const u=new j,f=new j;for(let r=0,m=s.length;r<m;r++){const _=s[r];if(_.POSITION!==void 0){const h=e.json.accessors[_.POSITION],v=h.min,p=h.max;if(v!==void 0&&p!==void 0){if(f.setX(Math.max(Math.abs(v[0]),Math.abs(p[0]))),f.setY(Math.max(Math.abs(v[1]),Math.abs(p[1]))),f.setZ(Math.max(Math.abs(v[2]),Math.abs(p[2]))),h.normalized){const d=Es(kn[h.componentType]);f.multiplyScalar(d)}u.max(f)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}a.expandByVector(u)}t.boundingBox=a;const o=new $c;a.getCenter(o.center),o.radius=a.min.distanceTo(a.max)/2,t.boundingSphere=o}function lo(t,n,e){const i=n.attributes,a=[];function s(o,u){return e.getDependency("accessor",o).then(function(f){t.setAttribute(u,f)})}for(const o in i){const u=Ms[o]||o.toLowerCase();u in t.attributes||a.push(s(i[o],u))}if(n.indices!==void 0&&!t.index){const o=e.getDependency("accessor",n.indices).then(function(u){t.setIndex(u)});a.push(o)}return vt.workingColorSpace!==Jt&&"COLOR_0"in i&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${vt.workingColorSpace}" not supported.`),sn(t,n),jh(t,n,e),Promise.all(a).then(function(){return n.targets!==void 0?Wh(t,n.targets,e):t})}const er=new gh,os=new Map;let rs=null;async function tr(){return rs||(rs=fetch("./models/manifest.json").then(t=>t.ok?t.json():null).catch(()=>null)),rs}function nr(t){return t.startsWith("http")?t:`./${t.replace(/^\//,"")}`}async function ir(t){try{return(await fetch(t,{method:"HEAD"})).ok}catch{return!1}}function sr(t,n,e=1){const i=new Vo().setFromObject(t);if(i.isEmpty())return;const a=i.getSize(new j),s=i.getCenter(new j),o=Math.max(a.x,a.y,a.z,.001),u=n/o*e;t.scale.setScalar(u),t.position.sub(s.multiplyScalar(u)),t.position.y+=a.y*u/2}function Zh(t,n){const e=new Set(n.map(a=>a.toLowerCase()));let i=null;return t.traverse(a=>{var u;if(i)return;const s=a;if(!s.isMesh)return;const o=s.name.toLowerCase();(e.has(o)||e.has(((u=a.parent)==null?void 0:u.name.toLowerCase())??""))&&(i=s)}),i}function ar(t){t.traverse(n=>{const e=n;if(!e.isMesh)return;e.castShadow=!0,e.receiveShadow=!0;const i=Array.isArray(e.material)?e.material:[e.material];for(const a of i)a&&"color"in a&&a instanceof q&&(a.envMapIntensity=1)})}async function Qh(t,n,e){var a,s;const i=nr(t);if(!await ir(i))return null;try{if(!os.has(i)){const u=(await er.loadAsync(i)).scene,f=n.targetHeight??((a=e.defaults)==null?void 0:a.targetHeight)??6;sr(u,f,n.scale??((s=e.defaults)==null?void 0:s.scale)??1),ar(u),os.set(i,u)}return os.get(i).clone(!0)}catch{return null}}async function Jh(t,n,e){var a,s;const i=nr(t);if(!await ir(i))return null;try{const o=await er.loadAsync(i),u=o.scene,f=n.targetHeight??((a=e.defaults)==null?void 0:a.targetHeight)??1.9;return sr(u,f,n.scale??((s=e.defaults)==null?void 0:s.scale)??1),ar(u),{group:u,clips:o.animations??[]}}catch{return null}}function e0(t){t.traverse(n=>{const e=n;if(!e.isMesh)return;const i=Array.isArray(e.material)?e.material:[e.material];for(const a of i){if(!a)continue;const s=a;s.name==="Grey"?(s.color.setHex(4015958),s.roughness=.42,s.metalness=.62,s.envMapIntensity=1.1):s.name==="Main"?(s.color.setHex(3104670),s.roughness=.5,s.metalness=.34,s.envMapIntensity=1.15):s.name==="Black"?(s.color.setHex(1316895),s.roughness=.32,s.metalness=.5,s.envMapIntensity=1):(s.roughness=Math.max(.3,Math.min(.9,s.roughness??.7)),s.metalness=Math.max(.1,Math.min(.7,s.metalness??.1)),s.envMapIntensity=1),s.needsUpdate=!0}})}function uo(t=1.9){const n=t*1.15,e=document.createElement("canvas");e.width=e.height=128;const i=e.getContext("2d"),a=i.createRadialGradient(64,64,0,64,64,64);a.addColorStop(0,"rgba(0,0,0,0.55)"),a.addColorStop(.45,"rgba(0,0,0,0.28)"),a.addColorStop(1,"rgba(0,0,0,0)"),i.fillStyle=a,i.fillRect(0,0,128,128);const s=new Yt(e);s.colorSpace=Ct;const o=new U(new Vt(n,n),new xt({map:s,transparent:!0,opacity:.85,depthWrite:!1}));return o.rotation.x=-Math.PI/2,o.position.y=.06,o.renderOrder=-1,o.name="ContactShadow",o}function Bi(t,n){return new $t({color:t,emissive:t,emissiveIntensity:n,metalness:.15,roughness:.08,clearcoat:1,clearcoatRoughness:.05,reflectivity:1,transparent:!0,opacity:.92,side:ct})}function Wt(t,n=.82){return new q({color:t,roughness:n,metalness:.06,envMapIntensity:.4})}function cs(t){return new q({color:t,roughness:.88,metalness:.04,emissive:1718816,emissiveIntensity:.06})}function t0(t){return new q({color:t?7268279:6000111,emissive:t?3462041:3900150,emissiveIntensity:t?.72:.38,roughness:.18,metalness:.4,transparent:!0,opacity:.88})}function fo(){return new $t({color:1993370,roughness:.06,metalness:.12,transparent:!0,opacity:.72,reflectivity:.95,clearcoat:1,clearcoatRoughness:.08,envMapIntensity:.6})}function n0(t){const e=document.createElement("canvas");e.width=64,e.height=64;const i=e.getContext("2d"),a=i.createRadialGradient(64/2,64/2,0,64/2,64/2,64/2);return a.addColorStop(0,t),a.addColorStop(.4,"rgba(255,220,140,0.35)"),a.addColorStop(1,"rgba(0,0,0,0)"),i.fillStyle=a,i.fillRect(0,0,64,64),new Yt(e)}function i0(){return new q({color:4871528,roughness:.45,metalness:.85})}function s0(t){return new $t({color:t,emissive:t,emissiveIntensity:1.4,roughness:.04,metalness:0,transparent:!0,opacity:.82,clearcoat:1})}function a0(t){const n=new vn;let e=0,i=0;const a=t.some(h=>h.attributes.color);for(const h of t)e+=h.attributes.position.count,i+=h.index?h.index.count:h.attributes.position.count;const s=new Float32Array(e*3),o=new Float32Array(e*3),u=new Float32Array(e*2),f=a?new Float32Array(e*3):null,r=new Uint32Array(i);let m=0,_=0;for(const h of t){const v=h.attributes.position,p=h.attributes.normal,d=h.attributes.uv;s.set(v.array,m*3),p&&o.set(p.array,m*3),d&&u.set(d.array,m*2),f&&(h.attributes.color?f.set(h.attributes.color.array,m*3):f.fill(1,m*3,(m+v.count)*3));const c=h.index;if(c)for(let l=0;l<c.count;l++)r[_++]=c.getX(l)+m;else for(let l=0;l<v.count;l++)r[_++]=l+m;m+=v.count}return n.setAttribute("position",new kt(s,3)),n.setAttribute("normal",new kt(o,3)),n.setAttribute("uv",new kt(u,2)),f&&n.setAttribute("color",new kt(f,3)),n.setIndex(new kt(r,1)),n}const or=.58;function o0(t=7){const n=Ft(90210),e=[];for(let i=0;i<t;i++){const a=.26+n()*.32,s=.045+n()*.03,o=(n()-.5)*.3,u=(n()-.5)*.3,f=4,r=[],m=[],_=[];for(let c=0;c<=f;c++){const l=c/f,g=l*a,E=s*(1-l*.9)*.5,x=o*l*l,R=u*l*l;r.push(-E+x,g,R),r.push(E+x,g,R),m.push(0,l,1,l)}for(let c=0;c<f;c++){const l=c*2,g=c*2+1,E=c*2+2,x=c*2+3;_.push(l,E,g,g,E,x)}const h=new vn;h.setAttribute("position",new Wn(r,3)),h.setAttribute("uv",new Wn(m,2)),h.setIndex(_),h.computeVertexNormals();const v=.82+n()*.34,p=n(),d=new Float32Array(r.length);for(let c=0;c<r.length/3;c++){const l=In.clamp(r[c*3+1]/or,0,1);d[c*3]=(.19+l*.36+p*.06)*v,d[c*3+1]=(.33+l*.5)*v,d[c*3+2]=(.12+l*.24+(1-p)*.05)*v}h.setAttribute("color",new kt(d,3)),h.rotateZ((n()-.5)*.4),h.rotateY(n()*Math.PI*2),e.push(h)}return a0(e)}function po(t=1){const n=new lt,e=Ft(Math.floor(t*1e4)+77),i=2.6*t,a=new U(new he(.13*t,.34*t,i,9),Wt(4863784,.95));a.position.y=i/2,a.rotation.z=(e()-.5)*.09,a.castShadow=!0,a.receiveShadow=!0,n.add(a);for(let r=0;r<4;r++){const m=r/4*Math.PI*2+e()*.4,_=(.85+e()*.6)*t,h=new U(new he(.045*t,.11*t,_,6),Wt(4535333,.95));h.position.set(Math.cos(m)*.2*t,i*(.68+r*.07),Math.sin(m)*.2*t),h.rotation.set(Math.cos(m)*.75,0,-Math.sin(m)*.75),h.castShadow=!0,n.add(h)}const s=new U(new he(.4*t,.52*t,.34*t,9),Wt(4338463,.95));s.position.y=.14*t,s.receiveShadow=!0,n.add(s);const o=[4160847,4885593,3500867,5609834,3104825],u=i+.4*t,f=[[0,.15,0,1.15],[.65,-.15,.28,.82],[-.62,-.08,-.34,.8],[.2,.7,-.14,.9],[-.28,.58,.56,.72],[.38,.48,-.6,.68],[-.1,1.1,.08,.6]];for(const[r,m,_,h]of f){const v=new q({color:o[Math.floor(e()*o.length)],roughness:.86,metalness:.02,flatShading:!0}),p=new U(new An(h*t,1),v);p.position.set(r*t,u+m*t,_*t),p.rotation.set(e()*Math.PI,e()*Math.PI,e()*Math.PI),p.scale.set(1,.86+e()*.2,1),p.castShadow=!0,n.add(p)}return n}function ho(t=1){const n=new lt,e=Ft(Math.floor(t*7919)+13),i=1.5*t,a=new U(new he(.1*t,.2*t,i,8),Wt(4009506,.9));a.position.y=i/2,a.castShadow=!0,n.add(a);const s=6;for(let o=0;o<s;o++){const u=o/(s-1),f=(1.25-u*.85)*t,r=(1.15-u*.3)*t,m=new ue(2050615).offsetHSL(0,0,(e()-.5)*.06),_=new U(new It(f,r,9),new q({color:m,roughness:.8,metalness:.02,flatShading:!0}));_.position.y=(1.15+u*2.5)*t,_.rotation.y=e()*Math.PI,_.castShadow=!0,n.add(_)}return n}function r0(t=1){const n=new lt,e=Ft(Math.floor(t*31337)+5),i=[3828549,4487759,3103290,5080407],a=4+Math.floor(e()*3);for(let s=0;s<a;s++){const o=(.32+e()*.3)*t,u=new U(new An(o,1),new q({color:i[Math.floor(e()*i.length)],roughness:.88,metalness:.02,flatShading:!0})),f=e()*Math.PI*2,r=e()*.45*t;u.position.set(Math.cos(f)*r,o*.72,Math.sin(f)*r),u.rotation.set(e()*Math.PI,e()*Math.PI,e()*Math.PI),u.castShadow=!0,n.add(u)}return n}function c0(t=1){const n=new lt,e=Ft(Math.floor(t*6151)+29),i=[15913547,15695784,15790320,12160240,15897419],a=3+Math.floor(e()*3);for(let s=0;s<a;s++){const o=(.28+e()*.28)*t,u=i[Math.floor(e()*i.length)],f=e()*Math.PI*2,r=e()*.22*t,m=Math.cos(f)*r,_=Math.sin(f)*r,h=new U(new he(.012*t,.016*t,o,4),new q({color:4880954,roughness:.9}));h.position.set(m,o/2,_);const v=new U(new jc(.075*t,6),new q({color:u,roughness:.75,metalness:0,side:ct,emissive:u,emissiveIntensity:.06}));v.position.set(m,o,_),v.rotation.x=-Math.PI/2+(e()-.5)*.6,n.add(h,v)}return n}function l0(t=1){const n=new lt,e=Ft(Math.floor(t*4111)+3),i=new q({color:7311178,roughness:.9,side:ct,flatShading:!0});for(let a=0;a<5;a++){const s=(.8+e()*.9)*t,o=new U(new Vt(.07*t,s),i);o.position.set((e()-.5)*.35*t,s/2,(e()-.5)*.35*t),o.rotation.set((e()-.5)*.3,e()*Math.PI,(e()-.5)*.3),o.castShadow=!0,n.add(o)}return n}function u0(t=1){const n=Ft(Math.floor(t*2027)+11),e=(1.6+n()*1.4)*t,i=new U(new he(.16*t,.19*t,e,8),Wt(5258025,.95));return i.rotation.z=Math.PI/2,i.rotation.y=n()*Math.PI,i.position.y=.16*t,i.castShadow=!0,i.receiveShadow=!0,i}function bi(t=1){const n=Ft(Math.floor(t*9973)+17),e=new dn(.55*t,0),i=e.attributes.position;for(let o=0;o<i.count;o++){const u=.82+n()*.36;i.setXYZ(o,i.getX(o)*u,i.getY(o)*(u*.8),i.getZ(o)*u)}e.computeVertexNormals();const a=new ue(6975608).offsetHSL(0,0,(n()-.5)*.1),s=new U(e,new q({color:a,roughness:.92,metalness:.03,flatShading:!0}));return s.castShadow=!0,s.receiveShadow=!0,s}function rr(t){const n=new lt,e=new U(new he(.06,.08,1.4,8),Wt(3621201,.6));e.position.y=.7;const i=new U(new ee(.35,.45,.35),Bi(t,.5));i.position.y=1.55;const a=new Qt(t,.8,6);return a.position.y=1.55,n.add(e,i,a),n}const mo={forest:{primary:2051382,secondary:3462041,accent:7268279,crystal:4906624,ground:1717032},coast:{primary:1981023,secondary:3718648,accent:8246268,crystal:6333946,ground:1715778},library:{primary:3878751,secondary:10980346,accent:12891645,crystal:9133302,ground:2762048},market:{primary:4863776,secondary:16498468,accent:16569165,crystal:16096779,ground:4010016},temple:{primary:4857912,secondary:16020150,accent:16361684,crystal:15485081,ground:3481648},plains:{primary:3359061,secondary:9741240,accent:13358561,crystal:6583435,ground:2765888}};function vi(t){return mo[t]??mo.plains}function cr(t,n,e){const i=new U(new he(.35,.55,1.6,16),Wt(6045747,.75));i.position.y=1.1,i.castShadow=!0;const a=new U(new ze(1.1,.14,10,24,Math.PI),Wt(4876097,.7));a.rotation.z=Math.PI,a.position.y=2.2;const s=new U(new An(.95,1),e);return s.position.y=3.5,s.castShadow=!0,t.add(i,a,s),s}function f0(t,n,e){const i=new U(new ee(2.2,.2,1.4),Wt(7035466,.65));i.position.set(0,.55,.4);const a=new U(new he(.45,.6,2.8,16),Wt(13358561,.45));a.position.y=1.8,a.castShadow=!0;const s=new U(new je(.75,1),e);s.position.y=3.6;const o=new Qt(n.crystal,1.2,10);return o.position.y=3.6,t.add(i,a,s,o),s}function d0(t,n,e){const i=new U(new ee(2.6,.5,2.2),Wt(10265519,.35));i.position.y=.55;const a=new U(new It(1.8,1.2,4),new q({color:n.primary,roughness:.4,metalness:.2}));a.position.y=1.4,a.rotation.y=Math.PI/4;const s=new U(new he(.12,.15,2.2,12),Wt(13751771,.3));s.position.set(-.9,1.3,0);const o=s.clone();o.position.x=.9;const u=new U(new Zc(.55,.16,64,12),e);return u.position.y=3.2,t.add(i,a,s,o,u),u}function p0(t,n,e){const i=new U(new ee(2.4,.15,1.8),Wt(9136404,.7));i.position.y=.55;const a=new U(new he(0,1.6,.9,4),new q({color:n.secondary,roughness:.55,side:ct}));a.position.y=1.8,a.rotation.y=Math.PI/4;const s=new U(new dn(.8,0),e);s.position.y=3.1;const o=rr(n.accent);return o.position.set(1.1,0,.6),t.add(i,a,s,o),s}function h0(t,n,e){const i=new U(new ee(3,.25,2.4),Wt(10322313,.55));i.position.y=.5;const a=new U(new he(.25,.4,3.2,8),Wt(12887477,.4));a.position.y=2.1,a.castShadow=!0;const s=new U(new ze(1.3,.06,8,40),new q({color:n.accent,emissive:n.accent,emissiveIntensity:.6,metalness:.8,roughness:.2}));s.rotation.x=Math.PI/2,s.position.y=3.8;const o=new U(new je(.9,2),e);return o.position.y=4.5,t.add(i,a,s,o),o}const m0={forest:cr,coast:f0,library:d0,market:p0,temple:h0};function _0(t,n){const e=vi(t.theme),i=new lt,a=t.unlocked,s=a?1:.45,o=new U(new he(2.4,2.8,.35,24),new q({color:e.ground,roughness:.55,metalness:.12,transparent:!a,opacity:s}));o.position.y=.18,o.receiveShadow=!0;const u=new U(new ze(2.1,.08,12,48),new q({color:e.secondary,emissive:e.accent,emissiveIntensity:a?.35:.08,roughness:.3,metalness:.55,transparent:!a,opacity:s}));u.rotation.x=Math.PI/2,u.position.y=.38,i.add(o,u);const f=Bi(a?e.crystal:7041664,t.cleared?.85:a?.55:.12),r=(m0[t.theme]??cr)(i,e,f);if(r.userData.isCrystal=!0,n){const m=new U(new _i(2.3,2.55,48),new xt({color:16498468,transparent:!0,opacity:.55,side:ct}));m.rotation.x=-Math.PI/2,m.position.y=.42,m.userData.isPulse=!0,i.add(m);const _=new Is(16774358,a?2.2:.4,18,Math.PI/5,.4);_.position.set(0,8,2),_.target.position.set(0,2,0),i.add(_,_.target)}if(t.cleared){const m=new U(new ie(3.2,24,24),new xt({color:e.accent,transparent:!0,opacity:.07,depthWrite:!1}));m.position.y=2,i.add(m)}if(t.dueCount&&t.dueCount>0&&a){const m=new U(new _i(2.65,2.9,48),new xt({color:16498468,transparent:!0,opacity:.42,side:ct}));m.rotation.x=-Math.PI/2,m.position.y=.5,m.userData.isDueRing=!0,i.add(m)}return i}let ls=null;async function g0(){return ls||(ls=await tr()),ls}function v0(t,n){const e=vi(n.theme),i=n.unlocked,a=i?1:.45,s=new U(new he(2.4,2.8,.35,24),new q({color:e.ground,roughness:.55,metalness:.12,transparent:!i,opacity:a}));s.position.y=.18,s.receiveShadow=!0;const o=new U(new ze(2.1,.08,12,48),new q({color:e.secondary,emissive:e.accent,emissiveIntensity:i?.35:.08,roughness:.3,metalness:.55,transparent:!i,opacity:a}));o.rotation.x=Math.PI/2,o.position.y=.38,t.add(s,o)}function x0(t,n,e,i,a){if(e){const s=new U(new _i(2.3,2.55,48),new xt({color:16498468,transparent:!0,opacity:.55,side:ct}));s.rotation.x=-Math.PI/2,s.position.y=.42,s.userData.isPulse=!0,t.add(s);const o=new Is(16774358,i?2.2:.4,18,Math.PI/5,.4);o.position.set(0,8,2),o.target.position.set(0,2,0),t.add(o,o.target)}if(n.cleared){const s=new U(new ie(3.2,24,24),new xt({color:a.accent,transparent:!0,opacity:.07,depthWrite:!1}));s.position.y=2,t.add(s)}if(n.dueCount&&n.dueCount>0&&i){const s=new U(new _i(2.65,2.9,48),new xt({color:16498468,transparent:!0,opacity:.42,side:ct}));s.rotation.x=-Math.PI/2,s.position.y=.5,s.userData.isDueRing=!0,t.add(s)}}function _o(t,n){const e=vi(t.theme),i=new U(new An(.85,1),Bi(t.unlocked?e.crystal:7041664,.65));return i.position.y=3.6,i.castShadow=!0,i.userData.isCrystal=!0,n.add(i),i}function S0(t){let n=null;return t.traverse(e=>{var a;if(n)return;const i=e;(a=i.userData)!=null&&a.isCrystal&&(n=i)}),n}async function M0(t,n){var f,r,m;const e=await g0(),i=vi(t.theme),a=t.name.includes("学习圣所"),s=e&&!a?((f=e.nodes)==null?void 0:f[t.id])??((r=e.themes)==null?void 0:r[t.theme])??null:null;if(e&&s){const _=await Qh(s.file,s,e);if(_){const h=new lt;v0(h,t),_.position.y=.35,h.add(_);const v=s.pickMeshNames??((m=e.defaults)==null?void 0:m.pickMeshNames)??["Crystal","PICK"];let p=Zh(_,v);return p?p.userData.isCrystal=!0:p=_o(t,h),x0(h,t,n,t.unlocked,i),{root:h,crystal:p}}}const o=_0(t,n),u=S0(o)??_o(t,o);return{root:o,crystal:u}}function go(t,n,e){const i=new lt,a=.4,s=.38,o=.14,u=.115,f=new U(new Yn(o,a,5,10),t);f.position.y=-.24200000000000002,f.castShadow=!0,i.add(f);const r=new lt;r.position.y=-.42800000000000005,i.add(r);const m=new U(new Yn(u,s,5,10),n);m.position.y=-.2245,m.castShadow=!0,r.add(m);const _=new U(new ee(.18,.1,.36),e);return _.position.set(0,-.426,.08),_.castShadow=!0,r.add(_),{hip:i,knee:r}}function vo(t,n,e){const i=new lt,a=new U(new Yn(e.upperR,e.upperLen,5,10),t);a.position.y=-(e.upperLen/2+e.upperR),a.castShadow=!0,i.add(a);const s=-(e.upperLen+e.upperR*2),o=new U(new Yn(e.lowerR,e.lowerLen,5,10),n);o.position.y=s-(e.lowerLen/2+e.lowerR),o.castShadow=!0,i.add(o);const u=s-(e.lowerLen+e.lowerR*2);if(e.footMat){const f=new U(new ee(e.lowerR*2.1,.1,.34),e.footMat);f.position.set(0,u+.04,.08),f.castShadow=!0,i.add(f)}else if(e.endMat&&e.endR){const f=new U(new ie(e.endR,12,10),e.endMat);f.position.y=u,f.castShadow=!0,i.add(f)}return i}function E0(){const t=new lt;t.name="Explorer";const n=new q({color:3100538,roughness:.62,metalness:.08}),e=new q({color:2765632,roughness:.78,metalness:.04}),i=new q({color:15713440,roughness:.66,metalness:.02}),a=new q({color:1713456,roughness:.7,metalness:.06}),s=new q({color:2759958,roughness:.8,metalness:.02}),o=new q({color:6000111,roughness:.4,metalness:.3,emissive:1784440,emissiveIntensity:.4}),u=new U(new ee(.46,.26,.3),e);u.position.y=.98,u.castShadow=!0,t.add(u);const f=new U(new Yn(.3,.4,6,14),n);f.position.y=1.32,f.scale.set(1.12,1,.78),f.castShadow=!0,t.add(f);const r=new U(new ze(.26,.04,8,20),o);r.position.y=1.52,r.rotation.x=Math.PI/2,r.scale.set(1.05,.7,1),t.add(r);const m=new U(new ee(.5,.08,.34),o);m.position.y=1.1,t.add(m);const _=new U(new ee(.4,.5,.22),n);_.position.set(0,1.34,-.32),_.castShadow=!0;const h=new U(new ee(.42,.12,.24),o);h.position.set(0,1.5,-.32),t.add(_,h);const v=new lt;v.position.y=1.6;const p=new U(new he(.1,.12,.14,10),i);p.position.y=.04;const d=new U(new ie(.23,22,22),i);d.position.y=.28,d.castShadow=!0;const c=new U(new ie(.245,18,14,0,Math.PI*2,0,Math.PI*.62),s);c.position.y=.31,v.add(p,d,c);const l=new q({color:1450028,roughness:.3,metalness:.1}),g=new ie(.035,10,10),E=new U(g,l);E.position.set(.085,.3,.205);const x=new U(g,l);x.position.set(-.085,.3,.205);const R=new q({color:2759958,roughness:.8}),T=new U(new ee(.26,.03,.04),R);T.position.set(0,.37,.2);const w=new q({color:8011824,roughness:.6}),S=new U(new ee(.11,.022,.03),w);S.position.set(0,.2,.216),v.add(E,x,T,S),t.add(v);const A=new lt;A.position.set(0,1.52,-.16);const C=new q({color:3894230,roughness:.6,metalness:.1,side:ct,emissive:1320798,emissiveIntensity:.25}),L=new U(new Vt(.66,.95,1,5),C);L.position.y=-.45,L.castShadow=!0,A.add(L),A.rotation.x=-.18,t.add(A);const P=go(e,e,a);P.hip.position.set(.16,.88,0);const F=go(e,e,a);F.hip.position.set(-.16,.88,0),t.add(P.hip,F.hip);const k=vo(n,n,{upperR:.1,upperLen:.26,lowerR:.088,lowerLen:.24,endMat:i,endR:.095});k.position.set(.42,1.5,0);const G=vo(n,n,{upperR:.1,upperLen:.26,lowerR:.088,lowerLen:.24,endMat:i,endR:.095});G.position.set(-.42,1.5,0),t.add(k,G);const O=new U(new ie(.12,14,14),Bi(16498468,.9));O.position.set(-.5,1,.12);const B=new Qt(16498468,1.2,10);B.position.copy(O.position),t.add(O,B);const J=new U(new _i(.55,.74,36),new xt({color:9684477,transparent:!0,opacity:.32,side:ct}));J.rotation.x=-Math.PI/2,J.position.y=.03,J.userData.isFootRing=!0,t.add(J);const fe={leftLeg:P,rightLeg:F,leftArm:k,rightArm:G,head:v,cape:A,eyeL:E,eyeR:x,brow:T,mouth:S,mats:{jacket:n,trim:o,cape:C}};return t.userData.rig=fe,t}class T0{constructor(){K(this,"yaw",0);K(this,"orbitAnchorYaw",0);K(this,"pitch",.38);K(this,"targetPos",new j);K(this,"desiredPos",new j);K(this,"dragElement");K(this,"activePointerId",null);K(this,"previousTouchAction","");K(this,"isDragging",!1);K(this,"lastX",0);K(this,"downX",0);K(this,"onPointerDown",n=>{var e;if(!(this.activePointerId!==null||n.pointerType==="mouse"&&n.button!==0)){this.activePointerId=n.pointerId,this.downX=n.clientX,this.lastX=n.clientX,this.isDragging=!1;try{(e=this.dragElement)==null||e.setPointerCapture(n.pointerId)}catch{}}});K(this,"onPointerMove",n=>{if(n.pointerId!==this.activePointerId)return;const e=n.clientX-this.lastX;this.lastX=n.clientX,!this.isDragging&&Math.abs(n.clientX-this.downX)>10&&(this.isDragging=!0),this.isDragging&&this.addYaw(-e*.006)});K(this,"onPointerEnd",n=>{n.pointerId===this.activePointerId&&(this.activePointerId=null,this.isDragging=!1)})}addYaw(n){this.yaw+=n}resetBehind(n){this.yaw=n,this.orbitAnchorYaw=n}update(n,e,i,a,s=!0,o){if(s&&!this.isDragging)this.yaw+=(i-this.yaw)*Math.min(1,a*2.5);else if(!s){const v=Math.atan2(Math.sin(this.yaw-this.orbitAnchorYaw),Math.cos(this.yaw-this.orbitAnchorYaw));this.yaw=this.orbitAnchorYaw+In.clamp(v,-1.05,1.05)}const u=Math.cos(this.yaw),f=Math.sin(this.yaw),r=!s&&!!o,m=r?o:e,_=r?Pa+8:Pa,h=Qc+Math.sin(this.pitch)*3;return this.desiredPos.set(m.x-f*_,m.y+h,m.z-u*_),n.position.lerp(this.desiredPos,1-Math.exp(-5*a)),this.targetPos.copy(m),r||(this.targetPos.y+=1.55),n.lookAt(this.targetPos),this.yaw}bindDrag(n){this.disposeDrag(),this.dragElement=n,this.previousTouchAction=n.style.touchAction,n.style.touchAction="none",n.addEventListener("pointerdown",this.onPointerDown),n.addEventListener("pointermove",this.onPointerMove),n.addEventListener("pointerup",this.onPointerEnd),n.addEventListener("pointercancel",this.onPointerEnd),n.addEventListener("lostpointercapture",this.onPointerEnd)}disposeDrag(){const n=this.dragElement;n&&(n.removeEventListener("pointerdown",this.onPointerDown),n.removeEventListener("pointermove",this.onPointerMove),n.removeEventListener("pointerup",this.onPointerEnd),n.removeEventListener("pointercancel",this.onPointerEnd),n.removeEventListener("lostpointercapture",this.onPointerEnd),this.activePointerId!==null&&n.hasPointerCapture(this.activePointerId)&&n.releasePointerCapture(this.activePointerId),this.activePointerId=null,this.isDragging=!1,n.style.touchAction=this.previousTouchAction,this.dragElement=void 0)}}const w0=new Set(["w","a","s","d","arrowup","arrowdown","arrowleft","arrowright"]);class b0{constructor(){K(this,"position",new j);K(this,"yaw",0);K(this,"moveTarget",null);K(this,"keys",new Set);K(this,"stick",{x:0,z:0});K(this,"enabled",!0);K(this,"sprint",!1);K(this,"onKeyDown",n=>{if(!this.enabled)return;const e=n.key.toLowerCase();w0.has(e)&&this.keys.add(e),e==="shift"&&(this.sprint=!0)});K(this,"onKeyUp",n=>{const e=n.key.toLowerCase();this.keys.delete(e),e==="shift"&&(this.sprint=!1)});window.addEventListener("keydown",this.onKeyDown),window.addEventListener("keyup",this.onKeyUp)}dispose(){window.removeEventListener("keydown",this.onKeyDown),window.removeEventListener("keyup",this.onKeyUp)}setEnabled(n){this.enabled=n,n||(this.keys.clear(),this.moveTarget=null)}setPosition(n,e,i){this.position.set(n,e,i),this.moveTarget=null}setMoveTarget(n,e){this.moveTarget=new j(n,0,e)}clearMoveTarget(){this.moveTarget=null}setStickInput(n,e){this.stick.x=n,this.stick.z=e,(Math.abs(n)>.12||Math.abs(e)>.12)&&(this.moveTarget=null)}isMoving(){return this.keys.size>0||this.moveTarget!==null||Math.abs(this.stick.x)>.1||Math.abs(this.stick.z)>.1}update(n,e){if(!this.enabled)return;let i=0,a=0;if(this.moveTarget){const s=new j().subVectors(this.moveTarget,this.position);s.y=0,s.length()<.45?this.moveTarget=null:(s.normalize(),i=s.x,a=s.z,this.yaw=Math.atan2(i,a))}else{let s=(this.keys.has("w")||this.keys.has("arrowup")?1:0)-(this.keys.has("s")||this.keys.has("arrowdown")?1:0),o=(this.keys.has("d")||this.keys.has("arrowright")?1:0)-(this.keys.has("a")||this.keys.has("arrowleft")?1:0);if((Math.abs(this.stick.x)>.1||Math.abs(this.stick.z)>.1)&&(s=this.stick.z,o=this.stick.x),s!==0||o!==0){const u=Math.sin(e),f=Math.cos(e);i=o*f+s*u,a=o*-u+s*f;const r=Math.hypot(i,a)||1;i/=r,a/=r,this.yaw=Math.atan2(i,a)}}if(i!==0||a!==0){const s=Jc*(this.sprint?1.85:1)*n;this.position.x+=i*s,this.position.z+=a*s}this.position.y=Rt(this.position.x,this.position.z,Et)+.05}isSprinting(){return this.sprint&&this.isMoving()}}function R0(t,n){const e=document.createElement("canvas");e.width=512,e.height=128;const i=e.getContext("2d");i.fillStyle=n?"rgba(8, 18, 40, 0.72)":"rgba(40, 40, 40, 0.55)",xo(i,8,8,496,112,20),i.fill(),i.strokeStyle=n?"rgba(147, 197, 253, 0.55)":"rgba(120, 120, 120, 0.4)",i.lineWidth=3,xo(i,8,8,496,112,20),i.stroke(),i.fillStyle=n?"#f3f4f6":"#9ca3af",i.font="bold 28px 'Noto Sans SC', 'Microsoft YaHei', sans-serif";const a=t.length>22?t.slice(0,21)+"…":t;i.fillText(a,24,72);const s=new Yt(e);s.colorSpace=Ct;const o=new Ln({map:s,transparent:!0,depthWrite:!1}),u=new Pn(o);return u.scale.set(10,2.5,1),u.position.y=7.2,u.userData.isSignpost=!0,u}function xo(t,n,e,i,a,s){t.beginPath(),t.moveTo(n+s,e),t.lineTo(n+i-s,e),t.quadraticCurveTo(n+i,e,n+i,e+s),t.lineTo(n+i,e+a-s),t.quadraticCurveTo(n+i,e+a,n+i-s,e+a),t.lineTo(n+s,e+a),t.quadraticCurveTo(n,e+a,n,e+a-s),t.lineTo(n,e+s),t.quadraticCurveTo(n,e,n+s,e),t.closePath()}const A0={unit01:{id:"unit01",label:"数字时代",skyTop:399139,skyMid:1457227,skyBot:7050883,fogColor:4877153,fogDensity:.0026,sunColor:12380115,sunIntensity:1.25,sunDiscScale:20,sunDiscOpacity:.24,sunFocusedDiscScale:24,sunFocusedDiscOpacity:.32,hemiSky:8108723,hemiGround:2177584,ambientColor:4949377,terrainTint:[.06,.42,.1],crystalColor:5286143,orbColor:3531726,glowColor:1609617,pathColor:2391683,decorStyle:"coast",ground:{grass:6060133,dirt:8942682,rock:7634043}},unit02:{id:"unit02",label:"传记人物",skyTop:4216427,skyMid:10195583,skyBot:14469544,fogColor:9800311,fogDensity:.0024,sunColor:16767398,sunIntensity:1.5,hemiSky:14865855,hemiGround:6443844,ambientColor:10982775,terrainTint:[.34,.28,.19],crystalColor:12158786,orbColor:14861696,glowColor:10317105,pathColor:7755311,decorStyle:"market",ground:{grass:9081941,dirt:9268551,rock:9208434},focusedLandscapeScale:.86,focusedLandscapeOffsetZ:7},unit03:{id:"unit03",label:"旅行探索",skyTop:1254700,skyMid:4811098,skyBot:9545621,fogColor:5992549,fogDensity:.0028,sunColor:16765345,sunIntensity:1.2,hemiSky:11388607,hemiGround:4014131,ambientColor:9018504,terrainTint:[.15,.23,.13],crystalColor:8631946,orbColor:12112526,glowColor:7448204,pathColor:5467990,decorStyle:"forest",ground:{grass:5012810,dirt:7166012,rock:6450276}},unit04:{id:"unit04",label:"劳动传统",skyTop:1907482,skyMid:5326395,skyBot:8615781,fogColor:5129275,fogDensity:.0028,sunColor:16766624,sunIntensity:1.25,hemiSky:13351073,hemiGround:3485481,ambientColor:9206116,terrainTint:[.2,.15,.1],crystalColor:13211224,orbColor:14991228,glowColor:11827778,pathColor:7822656,decorStyle:"temple",ground:{grass:8027206,dirt:8216381,rock:7432540}},unit05:{id:"unit05",label:"航天探索",skyTop:1120556,skyMid:3427178,skyBot:7439252,fogColor:5333879,fogDensity:.0026,sunColor:14018047,sunIntensity:1.15,hemiSky:10992338,hemiGround:3356999,ambientColor:7571880,terrainTint:[.2,.21,.25],crystalColor:9682408,orbColor:14412543,glowColor:7973087,pathColor:5401992,decorStyle:"space",ground:{grass:9343645,dirt:8159112,rock:10265261}},unit06:{id:"unit06",label:"共益交易城",skyTop:1059642,skyMid:4287600,skyBot:6323577,fogColor:3427666,fogDensity:.0028,sunColor:16765850,sunIntensity:1.25,hemiSky:10207178,hemiGround:4207917,ambientColor:7903642,terrainTint:[.085,.13,.125],crystalColor:14001007,orbColor:8243632,glowColor:5152657,pathColor:3501415,decorStyle:"exchange",ground:{grass:6061406,dirt:8217929,rock:7171429}}},Ts={id:"default",label:"",skyTop:3824266,skyMid:5929642,skyBot:659488,fogColor:1713472,fogDensity:.0042,sunColor:16774368,sunIntensity:1.45,hemiSky:13164799,hemiGround:2373672,ambientColor:10137804,terrainTint:[.09,.2,.1],crystalColor:6333946,orbColor:8438015,glowColor:4231406,pathColor:3170464,decorStyle:"forest",ground:{grass:5012810,dirt:7166012,rock:6450276}};function y0(t){return t?A0[t]??Ts:Ts}function C0(t){if(t.ground)return t.ground;const[n,e,i]=t.terrainTint,a=new ue(n,e,i),s={h:0,s:0,l:0};a.getHSL(s);const o=new ue().setHSL(s.h,Math.min(1,s.s*.85+.28),.34),u=new ue().setHSL((s.h+.07)%1,Math.min(1,s.s*.5+.18),.33),f=new ue().setHSL(s.h,Math.min(1,s.s*.16),.46);return{grass:o.getHex(),dirt:u.getHex(),rock:f.getHex()}}function ws(t,n=Ct,e=1024){const i=document.createElement("canvas");i.width=e,i.height=e,t(i.getContext("2d"),e);const a=new Yt(i);return a.wrapS=a.wrapT=pi,a.colorSpace=n,a.generateMipmaps=!0,a.minFilter=pn,a}function L0(){const t=Ft(20260616),n=ws((i,a)=>{i.fillStyle="#9a9a9a",i.fillRect(0,0,a,a);for(let s=0;s<60;s++){const o=t()*a,u=t()*a,f=30+t()*120,r=110+t()*110,m=i.createRadialGradient(o,u,0,o,u,f);m.addColorStop(0,`rgba(${r},${r},${r},0.5)`),m.addColorStop(1,"rgba(0,0,0,0)"),i.fillStyle=m,i.beginPath(),i.arc(o,u,f,0,Math.PI*2),i.fill()}for(let s=0;s<14e3;s++){const o=120+t()*100;i.fillStyle=`rgba(${o},${o},${o},0.5)`,i.fillRect(t()*a,t()*a,1.5,1.5)}},wn),e=ws((i,a)=>{i.fillStyle="#8080ff",i.fillRect(0,0,a,a);for(let s=0;s<12e3;s++){const o=96+t()*64,u=96+t()*64;i.fillStyle=`rgb(${o|0},${u|0},255)`;const f=1.5+t()*2.5;i.fillRect(t()*a,t()*a,f,f)}for(let s=0;s<40;s++){const o=t()*a,u=t()*a,f=24+t()*90,r=i.createRadialGradient(o,u,0,o,u,f);r.addColorStop(0,`rgba(${100+t()*50|0},${100+t()*50|0},255,0.4)`),r.addColorStop(1,"rgba(128,128,255,0)"),i.fillStyle=r,i.beginPath(),i.arc(o,u,f,0,Math.PI*2),i.fill()}},wn);return n.repeat.set(14,18),e.repeat.set(14,18),{roughness:n,normal:e}}function P0(){const t=Ft(20261015),n=ws((e,i)=>{e.fillStyle="#dcd9cd",e.fillRect(0,0,i,i);for(let a=0;a<130;a++){const s=t()*i,o=t()*i,u=36+t()*150,r=t()>.55?"156,132,98":"116,138,100",m=.045+t()*.085,_=e.createRadialGradient(s,o,0,s,o,u);_.addColorStop(0,`rgba(${r},${m})`),_.addColorStop(1,`rgba(${r},0)`),e.fillStyle=_,e.beginPath(),e.arc(s,o,u,0,Math.PI*2),e.fill()}for(let a=0;a<6e3;a++){const s=t()*i,o=t()*i,u=3+t()*7,f=-Math.PI/2+(t()-.5)*1.3,r=t()>.5;e.strokeStyle=r?`rgba(232,236,214,${.1+t()*.2})`:`rgba(84,100,72,${.08+t()*.17})`,e.lineWidth=.8+t()*1.2,e.beginPath(),e.moveTo(s,o),e.lineTo(s+Math.cos(f)*u,o+Math.sin(f)*u),e.stroke()}for(let a=0;a<1100;a++){const s=t()*i,o=t()*i,u=.8+t()*2.2,f=168+t()*60;e.fillStyle=`rgba(${f|0},${f-4|0},${f-12|0},${.2+t()*.35})`,e.beginPath(),e.arc(s,o,u,0,Math.PI*2),e.fill()}for(let a=0;a<260;a++){const s=t()*i,o=t()*i;e.strokeStyle=`rgba(170,150,104,${.2+t()*.3})`,e.lineWidth=1+t()*1.4,e.beginPath(),e.moveTo(s,o),e.lineTo(s+(t()-.5)*8,o+(t()-.5)*8),e.stroke()}},Ct,1024);return n.repeat.set(56,68),n.anisotropy=8,n}const D0={unit01:{section_a:["message","dialogue","focus","listening-bench"],section_b:["notification","study-desk","filter","offline-rest"],section_c:["clinic","telemedicine","community","community-network"]},unit02:{section_a:["timeline","route-evidence","perseverance","legacy"],section_b:["spotlight","humanitarian","lasting-service","community-witness"],section_c:["fleet","peace-contact","chart-room","exchange-harbor"]},unit03:{section_a:["itinerary","detour","market-encounter","reflection-garden"],section_b:["hostel","open-route","rain-shelter","confidence"],section_c:["rail-platform","rail-car","landscape-window","route-network"]},unit04:{section_a:["career","bench","violin","work-dignity"],section_b:["caliper","craft-quality","craft-evolution","trust-bridge"],section_c:["loom","embroidery-table","heritage","living-heritage"]},unit05:{section_a:["lunar-probe","relay-bridge","sample-lab","moon-horizon"],section_b:["test-console","orbit-adjustment","systems-simulation","mission-control"],section_c:["training","crew-simulation","science-exhibit","future-frontier"]},unit06:{section_a:["bookshop","exchange","resilience","budget-board"],section_b:["exchange-wall","resource-cycle","trust-ledger","sustainable-market"],section_c:["library","digital-lending","community-library","knowledge-bridge"]}};function I0(t,n,e,i){const a=new lt;a.name=["unit-landscape",t.id,e??"hub"].join("-");const s=N0(t,e),o=new ue(s.accent),u=new ue(s.secondary),f=new ue(...t.terrainTint);f.multiplyScalar(.88);const r=new q({color:f,roughness:.72,metalness:.16}),m=new q({color:3426398,roughness:.84,metalness:.12}),_=new q({color:u,emissive:u,emissiveIntensity:1.2,roughness:.2,metalness:.36}),h=new q({color:o,emissive:o,emissiveIntensity:.75,roughness:.18,metalness:.42});if(m.fog=!1,_.fog=!1,h.fog=!1,Nt(e)&&(_.emissiveIntensity=.56,h.emissiveIntensity=.42,m.color.set(4610672),m.roughness=.86,m.metalness=.08),Nt(e)?U0(a,s.route,h):(B0(a,r,m,_,h),H0(a,m,_,h)),Nt(e)){const p=new lt;So(p,e,i,r,m,_,h,o,t.id),p.scale.setScalar(.9),p.position.set(0,1.8,-15),a.add(p)}else So(a,e,i,r,m,_,h,o,t.id)||G0(a,e,r,m,_,h);Nt(e)||O0(a,e,i,s.accent);const v=new lt;switch(t.decorStyle){case"coast":k0(v,m,_,h,Nt(e));break;case"market":t.id==="unit02"&&/^section_b-world-\d+$/.test(e??"")?z0(v,h):V0(v,r,m,_,h);break;case"forest":W0(v,r,_,h,Nt(e));break;case"temple":X0(v,r,m,_,h,Nt(e));break;case"space":K0(v,m,_,h,Nt(e));break;case"exchange":q0(v,r,m,_,h,Nt(e),e);break;default:Y0(v,r,m,_,h);break}return Nt(e)?(v.scale.setScalar(t.focusedLandscapeScale??.72),v.position.z=t.focusedLandscapeOffsetZ??14):(v.scale.setScalar(.62),v.position.z=1.5),a.add(v),a.traverse(p=>{const d=p instanceof U&&!p.userData.noLandscapeShadow;p.castShadow=d,p.receiveShadow=d&&!Nt(e)}),a}function Nt(t){return!!(t&&(/^section_[abc]-world-\d+$/.test(t)||/^lab-vocab-\d+$/.test(t)||["lab-grammar","lab-cloze","lab-translation","project-reading","project-listening","project-writing","project-memory"].includes(t)))}function U0(t,n,e){const i=new q({color:n,emissive:n,emissiveIntensity:.12,roughness:.62,metalness:.12});for(let a=0;a<5;a++){const s=1.8+a*2.1,o=.54+a*.32,u=new U(new ee(5.2,.18,3.3),i);u.position.set(a%2===0?-.28:.28,o,s),u.rotation.y=a%2===0?-.035:.035,u.userData.isLandscapeRoute=!0,t.add(u);const f=new U(new je(.34,0),e);f.position.set(0,o+.42,s),f.userData.isLandscapeBeacon=!0,t.add(f)}}function N0(t,n){if(!n||n==="hub")return{accent:t.crystalColor,secondary:t.orbColor,route:t.pathColor};const e=n.match(/^(section_[abc])-world-(\d+)$/);if(e){const f={section_a:[{accent:6478079,secondary:12120575,route:2918143},{accent:7992016,secondary:12713968,route:2329464},{accent:16762218,secondary:16769443,route:10316573},{accent:16032511,secondary:16767339,route:10247423}],section_b:[{accent:7977215,secondary:12048639,route:3633083},{accent:11903231,secondary:14735359,route:6900418},{accent:6809765,secondary:12255189,route:2656598},{accent:16760184,secondary:16768948,route:10971945}],section_c:[{accent:16743282,secondary:16761210,route:14046034},{accent:16164541,secondary:16766692,route:11555446},{accent:8185807,secondary:13041648,route:3313017},{accent:16765802,secondary:16772522,route:10384424}]}[e[1]][(Number(e[2])-1)%4];return{accent:new ue(f.accent).lerp(new ue(t.crystalColor),.66).getHex(),secondary:new ue(f.secondary).lerp(new ue(t.orbColor),.56).getHex(),route:new ue(f.route).lerp(new ue(t.pathColor),.6).getHex()}}const i=n.match(/^lab-vocab-(\d+)$/);if(i){const u=[5625599,7659696,11903231,16760425,16748445,9353215],f=u[(Number(i[1])-1)%u.length];return{accent:new ue(f).lerp(new ue(t.crystalColor),.52).getHex(),secondary:t.orbColor,route:t.pathColor}}const s={"lab-grammar":{accent:8246268,secondary:14412542,route:3766200},"lab-cloze":{accent:8703150,secondary:13761253,route:2521693},"lab-translation":{accent:12887551,secondary:15785215,route:7819445},"project-reading":{accent:16763760,secondary:16772533,route:10777384},"project-listening":{accent:7723007,secondary:12251647,route:3636647},"project-writing":{accent:16754812,secondary:16768705,route:10442550},"project-memory":{accent:13869823,secondary:15850751,route:7491766}}[n];return s?{accent:new ue(s.accent).lerp(new ue(t.crystalColor),.58).getHex(),secondary:new ue(s.secondary).lerp(new ue(t.orbColor),.5).getHex(),route:new ue(s.route).lerp(new ue(t.pathColor),.58).getHex()}:{"section-a":{accent:6478079,secondary:12120575,route:2918143},"section-b":{accent:16762218,secondary:16769443,route:10316573},"stories-of-china":{accent:16743282,secondary:16761210,route:14046034},"learning-lab":{accent:9437118,secondary:8246268,route:3257214},"unit-project":{accent:16032511,secondary:16767339,route:10247423}}[n]??{accent:t.crystalColor,secondary:t.orbColor,route:t.pathColor}}function So(t,n,e,i,a,s,o,u,f){var c,l;if(!n)return!1;const r=(g,E,x,R,T,w=0)=>{const S=new U(g,E);return S.position.set(x,R,T),S.rotation.y=w,t.add(S),S},m=(g=5.2)=>{const E=s.clone();Nt(n)&&(E.color.copy(u),E.emissive.copy(u),E.emissiveIntensity=.24,E.roughness=.42,E.metalness=.16);const x=r(new je(1.7,1),E,0,g,27);return x.userData.isLandscapeBeacon=!0,x},_=(g,E,x=Math.PI/2)=>{const R=r(new ze(g,.16,8,40),o,0,E,27);return R.rotation.x=x,R.userData.isLandscapeRing=!0,R},h=n.match(/^(section_[abc])-world-(\d+)$/);if(h){const g=h[1],E=Number(h[2]),x=(e??"").split(" · ")[0],R=/connection|conversation|communication|dialogue|social/i.test(x),T=r(new he(7.8,8.8,.48,8),a,0,.92,27);if(T.userData.isLandscapeStage=!0,f==="unit06"&&g==="section_a"&&E===1){const A=new q({color:6441526,roughness:.78,metalness:.04});r(new ee(9.2,4.8,.42),A,0,3.7,29);for(const B of[-4.2,4.2])r(new ee(.42,5,.5),o,B,3.8,27.2);for(const B of[1.75,2.7,3.65,4.6])r(new ee(7.9,.14,.6),i,0,B,27.15);const C=[15905643,8440756,10205679,14976898].map(B=>new q({color:B,roughness:.72}));for(let B=0;B<3;B++)for(let J=0;J<8;J++){const fe=.42+(B+J)%3*.1,xe=r(new ee(.42,fe,.34),C[(B*3+J)%C.length],-3.5+J,1.84+B*.95+fe/2,26.78);xe.userData.isLandscapeStage=!0}r(new ee(6.2,.9,1.05),a,0,1.65,23.7),r(new ee(6.45,.16,1.18),s,0,2.18,23.7);for(let B=0;B<3;B++){const J=r(new ee(.92,.16,.7),C[B],-1.8+B*1.8,2.37,23.7);J.userData.isLandscapeStage=!0}const L=r(new ee(10.2,.32,2.3),i,0,6.25,26.2);L.userData.isLandscapeStage=!0,r(new ee(8.45,1.62,.18),A,0,5.55,27.02);const P=document.createElement("canvas");P.width=1024,P.height=192;const F=P.getContext("2d");if(F){F.fillStyle="#24483f",F.fillRect(0,0,P.width,P.height),F.strokeStyle="#d9b77a",F.lineWidth=8,F.strokeRect(12,12,P.width-24,P.height-24),F.fillStyle="#fff4dc",F.textAlign="center",F.textBaseline="middle",F.font="bold 68px Arial, sans-serif",F.fillText("BOOK EXCHANGE",512,67),F.font="bold 32px Arial, sans-serif",F.fillText("LEAVE ONE  ·  TAKE ONE",512,145);const B=new Yt(P);B.colorSpace=Ct;const J=new U(new Vt(8.05,1.38),new xt({map:B,side:ct,toneMapped:!1}));J.position.set(0,5.55,26.88),J.rotation.y=Math.PI,t.add(J)}const k=new Qt(16768160,2.4,18,2);k.position.set(0,5.2,22.6),t.add(k);const G=new _n([new j(-2.2,2.65,24.2),new j(0,3.3,25.4),new j(2.2,2.65,26.6)]),O=new U(new gn(G,16,.065,7,!1),o);return O.userData.isLandscapeRoute=!0,t.add(O),!0}const w=(l=(c=D0[f])==null?void 0:c[g])==null?void 0:l[E-1];if(w&&w!=="bookshop"&&!(w==="dialogue"&&g==="section_a"&&E===1&&R))return F0(t,w,r,i,a,s,o,m,_),!0;if(g==="section_a")if(E===1&&R){r(new ee(6.2,.32,4.8),i,-1.9,4,27,-.12),r(new ee(6.2,.32,4.8),s,1.9,4,27,.12);for(const P of[-1.9,1.9]){const F=r(new he(.24,.34,2.7,8),a,P,2.5,27);F.userData.isLandscapeStage=!0}const A=(P,F,k,G)=>{const O=new cn;O.moveTo(-1.15,-.62),G?(O.lineTo(.22,-.62),O.lineTo(.62,-1.08),O.lineTo(.74,-.62)):(O.lineTo(-.72,-.62),O.lineTo(-.62,-1.08),O.lineTo(-.22,-.62)),O.lineTo(1.02,-.62),O.quadraticCurveTo(1.22,-.62,1.22,-.42),O.lineTo(1.22,.48),O.quadraticCurveTo(1.22,.68,1.02,.68),O.lineTo(-1.02,.68),O.quadraticCurveTo(-1.22,.68,-1.22,.48),O.lineTo(-1.22,-.42),O.quadraticCurveTo(-1.22,-.62,-1.15,-.62);const B=r(new li(O,{depth:.34,bevelEnabled:!0,bevelSegments:2,steps:1,bevelSize:.055,bevelThickness:.055,curveSegments:8}),k,P,F,26.7);B.userData.isLandscapeStage=!0};A(-2.1,5.6,o,!0),A(2.1,4.9,s,!1);const C=new q({color:15857919,emissive:12183551,emissiveIntensity:.24,roughness:.34});for(const[P,F]of[[-2.1,5.6],[2.1,4.9]])for(const k of[-.38,0,.38])r(new ie(.085,8,6),C,P+k,F,26.62);const L=new U(new gn(new _n([new j(-.9,5.25,26.7),new j(0,4.35,26.7),new j(.9,4.55,26.7)]),20,.08,6,!1),o);L.userData.isLandscapeRoute=!0,t.add(L)}else if(E===1){for(const A of[-3.6,3.6])r(new he(.55,.82,5.6,8),i,A,3.8,27);r(new ee(9,.32,.52),o,0,6.7,27),m(5.1),_(3.2,4.4,.18)}else if(E===2){for(const C of[-4,4])r(new he(.62,.9,7.2,8),i,C,4.4,27);r(new ee(10,.42,.5),o,0,8.2,27),m(4.9).scale.setScalar(.8),_(3.4,4.9,Math.PI/2.3)}else if(E===3){for(const A of[-1,1]){const C=r(new ee(2.3,.32,10),i,A*2.8,1.35,27,A*.3);C.userData.isLandscapeRoute=!0}m(5.8),_(3.1,1.7)}else{for(const A of[-4.8,4.8])r(new he(.72,1,8,8),o,A,4.8,27);r(new ze(5,.22,8,40,Math.PI),s,0,8.8,27,Math.PI),m(5.2)}else if(g==="section_b")if(E===1){for(const[A,C]of[[-5,5],[0,8],[5,6]])r(new ee(2.4,C,.5),i,A,C/2+1.1,27);for(const A of[3.2,5.8])r(new ee(11,.16,.28),o,0,A,27);m(10)}else if(E===2)r(new he(1.8,2.3,7.4,10),s,0,4.7,27),_(4.8,4.7,.42),_(4.8,4.7,-.42),m(9.2);else if(E===3)r(new he(5.8,6.5,1,12),i,0,2,27),r(new ie(4.2,16,8,0,Math.PI*2,0,Math.PI/2),o,0,2.5,27),r(new he(1.1,1.6,6.2,8),a,0,5.4,27),m(9.4);else{r(new he(.55,.9,5.5,8),a,0,3.4,27);const A=r(new ee(12,.42,1.1),o,0,6.1,27,.06);A.userData.isLandscapeRoute=!0;for(const C of[-5,5]){const L=r(new ie(1.2,12,8),s,C,6.8,27);L.userData.isLandscapeBeacon=!0}_(4.3,1.5)}else if(E===1){for(const[C,L,P]of[[5.8,2.3,8],[4.6,4.3,6],[3.3,6.1,5]])r(new he(C,C+.55,.72,P),i,0,L,27);const A=r(new je(1.9,1),s,0,9,27);A.userData.isLandscapeBeacon=!0,_(2.8,9)}else if(E===2){for(const A of[0,Math.PI/2,Math.PI,Math.PI*3/2]){const C=Math.cos(A)*4.7,L=27+Math.sin(A)*4.7,P=r(new he(.5,.78,5.8,8),i,C,3.8,L);P.userData.isLandscapeBeacon=!0;const F=r(new ie(.72,10,8),s,C,7.1,L);F.userData.isLandscapeBeacon=!0}_(6,1.8),m(4.5)}else if(E===3){for(const C of[-5,5])r(new he(.65,1,7.4,8),o,C,4.4,27);const A=r(new ee(12,.4,2.6),i,0,3.2,27);A.userData.isLandscapeRoute=!0,r(new ze(4.2,.18,8,36),s,0,7.5,27,Math.PI/2),m(5.2)}else{for(const[A,C]of[[-4,24],[4,24],[-4,30],[4,30]])r(new ee(1.2,5.6,1.2),i,A,3.8,C);m(8.4),_(4.6,2)}return!0}const v=n.match(/^lab-vocab-(\d+)$/);if(v){const g=Number(v[1]),E={1:Array.from({length:5},(w,S)=>{const A=S/5*Math.PI*2;return[Math.cos(A)*5.1,27+Math.sin(A)*5.1]}),2:[[-6,30],[-3,28.5],[0,27],[3,25.5],[6,24]],3:[[-5.2,30],[-2.6,28.3],[0,26.2],[2.6,28.3],[5.2,30]],4:[[0,23.5],[-4.4,27],[0,27],[4.4,27],[0,30.5]],5:Array.from({length:5},(w,S)=>{const A=-Math.PI/2+S*1.12,C=1.8+S*.92;return[Math.cos(A)*C,27+Math.sin(A)*C]}),6:[[-4.5,24.4],[-4.5,29.6],[0,27],[4.5,24.4],[4.5,29.6]]},x=E[g]??E[1],R=[];for(let w=0;w<5;w++){const[S,A]=x[w],C=g===2?1.7+w*.55:g===3?[2.2,1.6,3.1,1.6,2.2][w]:g===6&&w===2?3.6:2.2+w%2*.65,L=g===2?new he(.72,.95,C,7):g===5?new It(.96,C,5):new ee(1.35,C,1.35),P=r(L,i,S,1+C/2,A,w*.14);P.userData.isLandscapeStage=!0;const F=1+C+(g===6&&w===2?1.15:.9),k=r(new je(g===6&&w===2?1.15:.72,1),g===6&&w===2?o:s,S,F,A);k.userData.isLandscapeBeacon=!0,R.push(new j(S,F-.35,A))}if(g>1){const w=r(new gn(new _n(R),36,.055,6,!1),o,0,0,0);w.userData.isLandscapeRoute=!0}const T=r(new ze(g===5?6.6:6.2,.075,7,40),o,0,.8,27);return T.rotation.x=Math.PI/2,!0}if(n==="lab-grammar"){if(f==="unit01"){const g=[],E=(C,L,P=.085)=>{const F=new _n(C),k=r(new gn(F,24,P,7,!1),L,0,0,0);k.userData.isLandscapeRoute=!0};for(const C of[-1,1]){const L=C*4.1,P=r(new he(.68,.92,4.8,8),C<0?i:a,L,3.35,27);P.userData.isLandscapeStage=!0;const F=r(new je(.52,1),C<0?s:o,L,6.15,27);F.userData.isLandscapeBeacon=!0,E([new j(L,5.7,27),new j(C*2.5,6.35,26.5),new j(0,5.2,26.2)],C<0?s:o)}const x=r(new ze(4.35,.13,8,40,Math.PI),o,0,5.35,27,Math.PI);x.scale.y=.55,x.userData.isLandscapeStage=!0;const R=r(new je(1.05,1),s,0,5.05,26.15);R.userData.isLandscapeBeacon=!0;for(let C=0;C<3;C++){const L=(C-1)*2.55,P=r(new he(.62,.82,.38,6),i,L,1.28,23.6);P.userData.isLandscapeStage=!0;const F=r(new dn(.42,0),C===1?o:s,L,2,23.6);F.userData.isLandscapeBeacon=!0,g.push(new j(L,2.35,23.6))}const T=r(new ee(3.3,.28,1.28),a,0,2.72,23.6);T.userData.isLandscapeStage=!0;const w=r(new he(.32,.48,1.25,8),o,0,3.5,23.6);w.userData.isLandscapeStage=!0;const S=r(new ie(.38,12,8),s,0,4.25,23.6);S.userData.isLandscapeBeacon=!0,E([g[0],new j(-1.8,2.55,23.6),new j(0,2.5,23.6)],s,.065),E([g[2],new j(1.8,2.55,23.6),new j(0,2.5,23.6)],o,.065);const A=new q({color:5020528,emissive:1522474,emissiveIntensity:.14,roughness:.9});for(const C of[-6.1,6.1])for(const L of[24.4,29.6]){const P=r(new he(.42,.62,.52,7),i,C,1.28,L);P.userData.isLandscapeStage=!0;for(const[F,k,G]of[[-.22,1.95,.48],[.22,2.25,.55],[0,2.65,.45]]){const O=r(new dn(G,0),A,C+F,k,L);O.userData.isLandscapeStage=!0}}return!0}for(const g of[-4.5,4.5])r(new he(.7,.95,7.2,8),i,g,4.4,27);return r(new ze(4.5,.24,8,40,Math.PI),o,0,8,27,Math.PI),m(4.9),!0}if(n==="lab-cloze"){for(const g of[-4.1,4.1]){const E=r(new ee(4.4,.35,5.6),i,g,2,27);E.userData.isLandscapeRoute=!0}for(const g of[-1.5,0,1.5]){const E=r(new je(.62,0),s,g,2.6,27);E.userData.isLandscapeBeacon=!0}return _(5.2,1.2),!0}if(n==="lab-translation"){for(const E of[-4.5,4.5]){r(new he(.62,.92,7.4,8),i,E,4.4,27);const x=r(new ze(2.4,.16,8,32),o,E,5.4,27,Math.PI/2);x.userData.isLandscapeRing=!0}const g=r(new ee(8,.26,.28),s,0,5,27);return g.userData.isLandscapeRoute=!0,!0}const d={"project-reading":"reading","project-listening":"listening","project-writing":"writing","project-memory":"memory"}[n];if(!d)return!1;if(d==="reading")r(new ee(7.4,.34,5.2),i,-2,3.7,27,-.14),r(new ee(7.4,.34,5.2),s,2,3.7,27,.14),r(new ee(.3,2.1,5.3),o,0,2.6,27),_(4.6,1.2);else if(d==="listening"){for(const[g,E]of[[2.4,3],[3.8,4.6],[5.3,6.2]]){const x=r(new ze(g,.15,8,40),o,0,E,27,Math.PI/2.15);x.userData.isLandscapeRing=!0}m(3.4)}else if(d==="writing"){const g=r(new ee(8.5,.55,5.2),a,0,2.4,27);g.userData.isLandscapeStage=!0;const E=new q({color:15919832,roughness:.88}),x=r(new ee(5.8,.14,3.4),E,-.25,2.8,27,-.08);x.userData.isLandscapeStage=!0;for(let A=0;A<5;A++){const C=r(new ee(3.6,.035,.045),o,-.25,2.89,26.15+A*.42,-.08);C.userData.isLandscapeRoute=!0}const R=r(new he(.035,.06,2.15,8),o,1.95,2.98,27.8);R.rotation.z=Math.PI/2,R.rotation.y+=.08,R.userData.isLandscapeStage=!0;for(const A of[-3.4,3.4])r(new ee(.35,2.6,.35),o,A,1.2,25.4);const T=r(new he(.42,.48,.16,12),a,3.05,2.77,26.2);T.userData.isLandscapeStage=!0;const w=r(new he(.055,.08,1.15,8),o,3.05,3.35,26.2);w.userData.isLandscapeStage=!0;const S=new U(new ie(.42,12,8),s);S.position.set(3.05,4,26.2),S.scale.set(1,.72,.78),S.userData.isLandscapeBeacon=!0,t.add(S)}else{for(let g=0;g<4;g++){const E=g*Math.PI/3,x=r(new ie(.72,12,8),s,Math.cos(E)*5.3,2.6+g%2,27+Math.sin(E)*5.3);x.userData.isLandscapeBeacon=!0}_(5.6,1.3,.52),m(6.1)}return!0}function F0(t,n,e,i,a,s,o,u,f){const r=(p,d,c,l,g,E,x=i,R=0)=>{const T=e(new ee(l,g,E),x,p,d,c,R);return T.userData.isLandscapeStage=!0,T},m=(p,d,c,l,g,E=i,x=10)=>{const R=e(new he(l*.86,l,g,x),E,p,d,c);return R.userData.isLandscapeStage=!0,R},_=(p,d=o,c=.12)=>{const l=new _n(p.map(([E,x,R])=>new j(E,x,R))),g=new U(new gn(l,28,c,8,!1),d);g.userData.isLandscapeRoute=!0,g.castShadow=!0,g.receiveShadow=!0,t.add(g)},h=(p,d,c=i,l=27,g=0)=>{r(g-p/2,d/2,l,.52,d,.62,c),r(g+p/2,d/2,l,.52,d,.62,c),r(g,d,l,p+.52,.5,.62,c)},v=(p,d,c,l,g=.48)=>{const E=[i,o,s,a];r(p,d,c,g,.74+l%2*.16,.34,E[l%E.length],(l%3-1)*.035)};switch(n){case"message":{const p=new q({color:10136465,emissive:2438958,emissiveIntensity:.24,roughness:.9,metalness:.02}),d=new q({color:3427145,roughness:.78}),c=new q({color:10864836,emissive:1059883,emissiveIntensity:.12,roughness:.2,metalness:.08,transparent:!0,opacity:.36,depthWrite:!1}),l=new q({color:7756610,roughness:.88}),g=new cn;g.moveTo(-7.9,-3.275),g.lineTo(7.9,-3.275),g.lineTo(7.9,3.275),g.lineTo(-7.9,3.275),g.closePath();for(const[se,oe,He,te]of[[-4.55,.2,3.18,2.96],[4.55,.2,3.18,2.96],[0,-1.54,2.6,3.35]]){const $e=new el;$e.moveTo(se-He/2,oe-te/2),$e.lineTo(se-He/2,oe+te/2),$e.lineTo(se+He/2,oe+te/2),$e.lineTo(se+He/2,oe-te/2),$e.closePath(),g.holes.push($e)}const E=new U(new li(g,{depth:.42,bevelEnabled:!1}),p);E.position.set(0,4.42,30.73),E.userData.isLandscapeStage=!0,t.add(E),r(0,4.42,33.02,15.38,6.55,.42,p);for(const se of[-1,1]){const oe=se*7.69;r(oe,6.93,31.98,.42,1.53,2.5,p),r(oe,2.11,31.98,.42,1.93,2.5,p),r(oe,4.62,30.92,.42,3.08,.38,p),r(oe,4.62,33.02,.42,3.08,.42,p),r(oe,4.62,31.97,.035,2.82,1.68,c);for(const He of[31.1,32.84])r(oe,4.62,He,.42,3.08,.1,d);for(const He of[3.13,6.11])r(oe,He,31.97,.42,.12,1.84,d)}r(0,7.82,31.95,16.35,.34,2.85,d),r(0,1.28,31.9,15.5,.26,2.6,d);for(const se of[-4.55,4.55])r(se,4.62,30.72,3.5,3.28,.16,d),r(se,4.62,30.6,3.18,2.96,.08,c),r(se,4.62,30.53,.12,2.96,.06,o),r(se,4.62,30.53,3.18,.12,.06,o),r(se,4.62,30.53,.1,2.96,.06,d),r(se,4.62,30.53,3.18,.1,.06,d);const x=new q({color:5719608,roughness:.88}),R=new St(new ee(2.8,.075,.42),x,6),T=new St(new ee(.3,.72,.26),new q({color:16777215,roughness:.84}),30),w=new mi,S=[3.35,4.28,5.21];let A=0,C=0;const L=[12089686,13676146,7310200,7375258,10187640,14209208];for(const se of[-4.55,4.55])for(const[oe,He]of S.entries()){w.position.set(se,He,31.62),w.scale.set(1,1,1),w.rotation.set(0,0,0),w.updateMatrix(),R.setMatrixAt(A++,w.matrix);for(let te=0;te<5;te++)w.position.set(se-1.08+te*.54,He+.39,31.58),w.scale.set(.78+(oe+te)%2*.12,.72+(oe*2+te)%3*.14,.84),w.rotation.set(0,(te%3-1)*.035,0),w.updateMatrix(),T.setMatrixAt(C,w.matrix),T.setColorAt(C,new ue(L[(oe+te*2)%L.length])),C++}R.instanceMatrix.needsUpdate=!0,T.instanceMatrix.needsUpdate=!0,T.instanceColor&&(T.instanceColor.needsUpdate=!0),R.castShadow=!0,T.castShadow=!0,t.add(R,T),r(0,4.82,29.78,4.9,.2,1.4,d);for(const se of[-2.18,2.18])r(se,3.05,29.78,.16,3.4,.18,d);for(const se of[-7.1,-2.68,2.68,7.1])r(se,4.62,30.48,.14,3.02,.22,d);r(0,2.88,30.62,2.6,3.35,.2,d),r(-.62,2.72,30.47,1.08,2.98,.08,c),r(.62,2.72,30.47,1.08,2.98,.08,c),r(0,2.72,30.4,.1,2.98,.06,o),r(.38,2.72,30.35,.08,.12,.08,l),r(0,1.18,29.95,3.5,.22,1.2,l);const P=document.createElement("canvas");P.width=1024,P.height=192;const F=P.getContext("2d");if(F){F.fillStyle="#263e3b",F.fillRect(0,0,P.width,P.height),F.strokeStyle="#d6c19a",F.lineWidth=8,F.strokeRect(12,12,P.width-24,P.height-24),F.fillStyle="#f4edda",F.textAlign="center",F.textBaseline="middle",F.font="bold 66px Arial, sans-serif",F.fillText("CAMPUS LIBRARY",512,98);const se=new Yt(P);se.colorSpace=Ct;const oe=new U(new Vt(4.4,.82),new xt({map:se,side:ct,toneMapped:!1}));oe.position.set(0,6.9,30.55),oe.rotation.y=Math.PI,t.add(oe)}for(const se of[-2.05,2.05]){r(se,1.72,25.9,3.05,.24,.68,l),r(se,2.18,26.18,3.05,.78,.16,l);for(const oe of[se-1.2,se+1.2])r(oe,1.38,25.9,.12,.62,.14,d),r(oe,1.84,26.18,.12,.72,.14,d);for(const oe of[se-1.43,se+1.43])r(oe,2,25.9,.14,.36,.68,d),r(oe,2.2,25.9,.22,.1,.76,l)}const k=[-2.55,-1.55,1.55,2.55],G=[7374743,10252382,5861225,9077097],O=[3425363,5851456,4545364,5131350],B=[14200202,10250316,13078128,14728094],J=[3156260,3484968,4338731,2566704],fe=new St(new Yn(.3,.46,4,8),new q({color:16777215,roughness:.86}),k.length),xe=new St(new ie(1,12,10),new q({color:16777215,roughness:.92}),k.length*4),Oe=new St(new ie(1,12,8,0,Math.PI*2,0,Math.PI*.43),new q({color:16777215,roughness:.94}),k.length),Ie=new St(new ie(1,8,6),new q({color:2632496,roughness:.72}),k.length*2),it=new St(new ee(1,1,1),new q({color:8477005,roughness:.82}),k.length),Ke=new St(new he(.075,.09,1,8),new q({color:16777215,roughness:.88}),k.length*4),We=new St(new he(.11,.14,1,8),new q({color:16777215,roughness:.9}),k.length*4),Z=new St(new ee(1,1,1),new q({color:3160387,roughness:.72}),k.length*2),ve=new St(new ie(1,8,6),new q({color:16777215,roughness:.92}),k.length*2),le=new St(new ee(1,1,1),new q({color:2503227,roughness:.36,metalness:.26}),k.length),Be=new St(new ee(1,1,1),new q({color:6801605,emissive:1934728,emissiveIntensity:.28,roughness:.32}),k.length),Xe=[fe,xe,Oe,Ie,it,Ke,We,Z,ve,le,Be];for(const se of Xe)se.castShadow=!0,se.receiveShadow=!0,se.userData.isLandscapeStage=!0,t.add(se);const Re=new mi,Ne=(se,oe,He,te,$e,y,M,H)=>{Re.position.set(He,te,$e),Re.rotation.set(0,0,0),Re.scale.set(y,M,H),Re.updateMatrix(),se.setMatrixAt(oe,Re.matrix)},Ae=(se,oe,He,te)=>{const $e=te.clone().sub(He);Re.position.copy(He).add(te).multiplyScalar(.5),Re.quaternion.setFromUnitVectors(new j(0,1,0),$e.clone().normalize()),Re.scale.set(1,$e.length(),1),Re.updateMatrix(),se.setMatrixAt(oe,Re.matrix)};let re=0,De=0,we=0,qe=0,be=0,Ve=0;for(const[se,oe]of k.entries()){fe.setColorAt(se,new ue(G[se])),Oe.setColorAt(se,new ue(J[se])),Ne(fe,se,oe,2.6,25.92,.94,1,.8),Ne(Oe,se,oe,3.38,25.92,.29,.31,.25),Ne(xe,re,oe,3.37,25.92,.27,.31,.235),xe.setColorAt(re++,new ue(B[se])),Ne(xe,re,oe,3.29,25.92-.25,.055,.07,.045),xe.setColorAt(re++,new ue(B[se]));for(const ne of[-1,1])Ne(xe,re,oe+ne*.26,3.35,25.92-.02,.055,.072,.045),xe.setColorAt(re++,new ue(B[se])),Ne(Ie,De++,oe+ne*.082,3.39,25.92-.251,.034,.043,.018);Ne(it,se,oe,3.27,25.92-.249,.075,.018,.012),Ne(le,se,oe,2.48,25.92-.42,.17,.28,.035),Ne(Be,se,oe,2.48,25.92-.441,.132,.22,.008);const te=new j(oe-.27,2.88,25.92-.02),$e=new j(oe+.27,2.88,25.92-.02),y=new j(oe-.29,2.64,25.92-.24),M=new j(oe+.29,2.64,25.92-.24),H=new j(oe-.12,2.52,25.92-.38),Y=new j(oe+.12,2.52,25.92-.38);Ke.setColorAt(we,new ue(G[se])),Ae(Ke,we++,te,y),Ke.setColorAt(we,new ue(G[se])),Ae(Ke,we++,y,H),Ke.setColorAt(we,new ue(G[se])),Ae(Ke,we++,$e,M),Ke.setColorAt(we,new ue(G[se])),Ae(Ke,we++,M,Y);for(const ne of[-1,1]){const ce=oe+ne*.14,me=new j(ce,2.1,25.92),X=new j(ce,1.75,25.92-.34),Q=new j(ce,1.28,25.92-.57);We.setColorAt(qe,new ue(O[se])),Ae(We,qe++,me,X),We.setColorAt(qe,new ue(O[se])),Ae(We,qe++,X,Q),Ne(Z,be++,ce,1.24,25.92-.67,.17,.13,.32),Ne(ve,Ve++,oe+ne*.12,2.52,25.92-.39,.075,.075,.075)}}for(const se of Xe)se.instanceMatrix.needsUpdate=!0,se.instanceColor&&(se.instanceColor.needsUpdate=!0);for(const[se,oe,He]of[[-2.9,5.15,1.25],[0,5.75,1.45],[2.9,5.15,1.25]]){r(se,oe,25.2,He,.68,.12,a,se*.035),r(se,oe+.1,25.11,He*.62,.08,.06,o,se*.035);const te=e(new ie(.09,8,6),s,se+He*.34,oe+.29,25.08);te.userData.isLandscapeBeacon=!0}_([[-2.15,5.12,25.14],[0,5.7,25.14],[2.15,5.12,25.14]],s,.06),_([[0,1.24,34],[0,1.28,31],[0,1.28,28],[0,1.34,26.8]],o,.1);for(const se of[-6.35,6.35]){m(se,1.43,27.65,.48,.46,l,8),m(se,2.75,27.65,.1,2.55,d,8);for(const[oe,He,te]of[[-.34,3.55,.72],[.28,3.82,.8],[0,4.38,.72]]){const $e=e(new dn(te,0),i,se+oe,He,27.65);$e.userData.isLandscapeStage=!0}}const I=new Qt(16766875,.72,16,2);I.position.set(0,5.2,25.2),t.add(I);break}case"dialogue":{const p=new q({color:13748142,roughness:.9}),d=new q({color:7691075,roughness:.84}),c=new q({color:8942943,roughness:.92}),l=new q({color:5401699,roughness:.82}),g=new q({color:10995645,emissive:1914160,emissiveIntensity:.08,roughness:.24,metalness:.04,transparent:!0,opacity:.28,depthWrite:!1}),E=new q({color:7507305,roughness:.94}),x=(re,De,we,qe="stage")=>{const be=new St(re,De,we.length),Ve=new j,I=new j,se=new an,oe=new gs,He=new At;return we.forEach((te,$e)=>{Ve.set(...te.position),oe.set(...te.rotation??[0,0,0]),se.setFromEuler(oe),I.set(...te.scale??[1,1,1]),He.compose(Ve,se,I),be.setMatrixAt($e,He)}),be.instanceMatrix.needsUpdate=!0,be.computeBoundingSphere(),be.userData[`isLandscape${qe[0].toUpperCase()}${qe.slice(1)}`]=!0,t.add(be),be};r(0,1.19,28.15,12.1,.08,9.2,c),x(new ee(11.85,.018,.035),d,[24.15,24.95,25.75,26.55,27.35,28.15,28.95,29.75,30.55,31.35,32.15].map(re=>({position:[0,1.235,re]}))),x(new ee(.26,4,9),p,[{position:[-6.05,3.2,28.25]},{position:[6.05,3.2,28.25]}]),x(new ee(1.9,5.4,.28),p,[{position:[-5.55,3.9,23.85]},{position:[5.55,3.9,23.85]}]),r(0,1.78,23.85,9.2,1.16,.28,p),r(0,6.02,23.85,9.2,1.28,.28,p),x(new ee(.12,3.02,.12),d,[-4.58,-1.53,1.53,4.58].map(re=>({position:[re,3.93,24.02]}))),x(new ee(9.2,.12,.12),d,[2.43,5.43].map(re=>({position:[0,re,24.02]})));const R=x(new ee(2.92,2.88,.045),g,[-3.05,0,3.05].map(re=>({position:[re,3.93,24.015]})));R.userData.noLandscapeShadow=!0,x(new ee(12.15,.18,.24),d,[24.1,26.3,28.5,30.7,32.85].map(re=>({position:[0,6.34,re]}))),x(new ee(.3,4,.3),l,[{position:[-6.03,3.2,32.75]},{position:[6.03,3.2,32.75]}]),r(0,6.32,32.75,12.25,.2,.32,d),x(new he(.103,.12,1.8,7),d,[-3.35,0,3.35].map(re=>({position:[re,2.12,21.55]}))),x(new dn(1.08,1),E,[{position:[-3.35,3.55,21.55],scale:[1.18,.9,.72]},{position:[0,3.95,21.55],scale:[1.18,.9,.72]},{position:[3.35,3.6,21.55],scale:[1.18,.9,.72]}]),r(0,1.56,20.35,5.2,.28,.52,l),x(new ee(.16,.62,.4),d,[-2.1,2.1].map(re=>({position:[re,1.33,20.35]})));const T=[{x:-2.55,y:1.22,z:28,yaw:Math.PI/2,shirt:7902858,hair:4733489},{x:2.55,y:1.22,z:28,yaw:-Math.PI/2,shirt:12681576,hair:3423043},{x:0,y:1.22,z:25.45,yaw:0,shirt:7441058,hair:6113078}],w=(re,De,we)=>{const qe=new St(re,De,we.length),be=new j(0,1,0),Ve=new j,I=new j,se=new j,oe=new an,He=new an,te=new an,$e=new gs,y=new At;return we.forEach((M,H)=>{const Y=T[M.person];oe.setFromAxisAngle(be,Y.yaw),Ve.set(...M.offset).applyQuaternion(oe),I.set(Y.x,Y.y,Y.z).add(Ve),$e.set(...M.rotation??[0,0,0]),He.setFromEuler($e),te.copy(oe).multiply(He),se.set(...M.scale??[1,1,1]),y.compose(I,te,se),qe.setMatrixAt(H,y),M.color!==void 0&&qe.setColorAt(H,new ue(M.color))}),qe.instanceMatrix.needsUpdate=!0,qe.instanceColor&&(qe.instanceColor.needsUpdate=!0),qe.computeBoundingSphere(),qe.userData.isLandscapeStage=!0,t.add(qe),qe},S=new ee(1.1,.14,.9),A=new ee(1.08,.78,.13),C=new he(.055,.07,.56,6),L=[],P=[],F=[];T.forEach((re,De)=>{L.push({person:De,offset:[0,.48,-.35]}),P.push({person:De,offset:[0,.91,-.79],rotation:[-.06,0,0]});for(const we of[-.43,.43])for(const qe of[-.68,-.05])F.push({person:De,offset:[we,.17,qe]})}),w(S,d,L),w(A,d,P),w(C,d,F),m(0,1.63,27.95,.22,.82,d,10),m(0,2.08,27.95,1.28,.16,d,16),x(new ee(.34,.035,.5),new q({color:16777215,roughness:.92}),[{position:[-.42,2.18,27.95],scale:[1,1,1],rotation:[0,0,0]},{position:[0,2.18,27.95],scale:[1,1,1],rotation:[0,0,0]},{position:[.42,2.18,27.95],scale:[1,1,1],rotation:[0,0,0]}]);const k=new q({color:16777215,roughness:.86}),G=new q({color:16777215,roughness:.92}),O=new q({color:4739674,roughness:.9}),B=new q({color:14267287,roughness:.84}),J=new q({color:15986400,roughness:.7}),fe=new q({color:3748911,roughness:.8});w(new he(.31,.42,.8,10),k,T.map((re,De)=>({person:De,offset:[0,1.05,0],color:re.shirt}))),w(new he(.12,.14,.18,8),B,T.map((re,De)=>({person:De,offset:[0,1.47,.02]}))),w(new ie(.32,12,10),B,T.map((re,De)=>({person:De,offset:[0,1.76,.04],scale:[1,1.04,.95]}))),w(new ie(.34,10,8),G,T.map((re,De)=>({person:De,offset:[0,1.98,.015],scale:[1,.42,1],color:re.hair})));const xe=[],Oe=[];T.forEach((re,De)=>{for(const we of[-.105,.105])xe.push({person:De,offset:[we,1.79,.335],scale:[.052,.052,.028]}),Oe.push({person:De,offset:[we,1.79,.36],scale:[.024,.03,.018]})}),w(new ie(1,8,6),J,xe),w(new ie(1,8,6),fe,Oe),w(new ie(.06,8,6),fe,T.map((re,De)=>({person:De,offset:[0,1.65,.36],scale:[.9,.32,.4]})));const Ie=[],it=[],Ke=[],We=[],Z=[];T.forEach((re,De)=>{for(const we of[-1,1]){Ie.push({person:De,offset:[we*.17,.54,.3],rotation:[.1,0,we*.06]}),it.push({person:De,offset:[we*.18,.14,.65],scale:[1,.52,1.3]});const qe=De===2&&we===1;Ke.push({person:De,offset:[we*.34,qe?1.34:1.2,.04],rotation:[qe?-.35:.72,0,we*.38]}),We.push({person:De,offset:[we*.48,qe?1.47:.87,qe?.18:.43],rotation:[qe?-.1:1.18,0,we*.18]}),Z.push({person:De,offset:[we*.5,qe?1.72:.69,qe?.22:.75],scale:[.13,.12,.13]})}}),w(new ee(.3,.28,.58),O,Ie),w(new ee(.22,.12,.28),O,it),w(new he(.1,.13,.54,8),k,Ke.map(re=>({...re,color:T[re.person].shirt}))),w(new he(.075,.095,.48,8),k,We.map(re=>({...re,color:T[re.person].shirt}))),w(new ie(1,8,6),B,Z),m(4.65,1.48,32.05,.54,.46,d,10);const ve=e(new ze(.54,.075,7,24),l,4.65,1.73,32.05);ve.rotation.x=Math.PI/2,ve.userData.isLandscapeStage=!0;const le=new ee(.22,.045,.38),Be=[{position:[4.38,1.75,31.98],rotation:-.3},{position:[4.66,1.76,32.02],rotation:.18},{position:[4.91,1.75,32.14],rotation:-.12}];x(le,a,Be.map(re=>({position:re.position,rotation:[0,re.rotation,0],scale:[1,.8,1]}))),x(new ee(.16,.012,.28),l,Be.map(re=>({position:[re.position[0],re.position[1]+.03,re.position[2]],rotation:[0,re.rotation,0]}))),x(new ee(.12,.48,.5),l,[2.85,3.7,4.55].map(re=>({position:[-5.88,re,29.9]}))),x(new ee(.12,.48,.5),o,[{position:[-5.88,5.4,29.9]}]),x(new ie(.11,8,6),s,[2.85,3.7,4.55,5.4].map(re=>({position:[-5.78,re,29.55]})),"beacon");const Xe=new he(.2408,.28,.055,10);x(Xe,o,[31.5,29.15].map(re=>({position:[0,1.285,re]})),"route"),x(Xe,s,[{position:[0,1.285,30.05]}],"route");for(const[re,De]of[[.72,4.45],[1.08,4.78]]){const we=e(new ze(re,.045,6,24,Math.PI),s,0,De,27.35);we.userData.isLandscapeRoute=!0}r(0,5.92,32.75,9.9,1.48,.24,d);const Re=document.createElement("canvas");Re.width=1024,Re.height=192;const Ne=Re.getContext("2d");if(Ne){Ne.fillStyle="#36574d",Ne.fillRect(0,0,Re.width,Re.height),Ne.strokeStyle="#d6c49d",Ne.lineWidth=8,Ne.strokeRect(12,12,Re.width-24,Re.height-24),Ne.fillStyle="#f6eedb",Ne.textAlign="center",Ne.textBaseline="middle",Ne.font="bold 48px Arial, sans-serif",Ne.fillText("FOUR-WEEK LISTENING EXPERIMENT",512,65),Ne.font="bold 29px Arial, sans-serif",Ne.fillText("20 MIN  ·  ASK ONE FOLLOW-UP  ·  SUMMARIZE BEFORE REPLYING",512,130);const re=new Yt(Re);re.colorSpace=Ct;const De=new U(new Vt(9.45,1.22),new xt({map:re,side:ct,toneMapped:!1}));De.position.set(0,5.92,33.02),De.userData.isLandscapeStage=!0,t.add(De)}const Ae=new Qt(16766882,.72,17,2);Ae.position.set(0,5.35,27.2),t.add(Ae);break}case"focus":{const p=new q({color:9144952,roughness:.9}),d=new q({color:7625283,roughness:.86}),c=new q({color:2573375,emissive:1917240,emissiveIntensity:.3,roughness:.32,metalness:.12}),l=new q({color:15261641,roughness:.92}),g=new q({color:10205617,roughness:.18,metalness:.08,transparent:!0,opacity:.28,depthWrite:!1}),E=new q({color:16777215,roughness:.94}),x=new q({color:7441817,roughness:.72}),R=new q({color:7311996,roughness:.72}),T=new q({color:12159845,roughness:.72}),w=m(0,1.18,27,6.65,.2,p,12);w.userData.isLandscapeRoute=!0,f(6.15,1.31,.08),h(12.4,7.15,o,31.25);const S=new St(new ee(.16,1.05,.16),d,6),A=new At,C=new j,L=new j(1,1,1),P=new an;let F=0;for(const be of[-1,1])for(const Ve of[24.25,27.15,30.05])C.set(be*5.75,1.78,Ve),A.compose(C,P,L),S.setMatrixAt(F++,A);S.instanceMatrix.needsUpdate=!0,S.computeBoundingSphere(),S.name="focus-terrace-rail-posts",S.userData.isLandscapeStage=!0,t.add(S);for(const be of[-1,1])r(be*5.75,2.24,27.15,.14,.14,5.8,d);const k=new St(new ee(.055,.84,2.72),g,4),G=new At;let O=0;for(const be of[-1,1])for(const Ve of[25.7,28.6])G.makeTranslation(be*5.75,1.76,Ve),k.setMatrixAt(O++,G);k.instanceMatrix.needsUpdate=!0,k.computeBoundingSphere(),k.name="focus-terrace-glass-rails",k.userData.isLandscapeStage=!0,k.userData.noLandscapeShadow=!0,t.add(k);const B=new St(new ee(.22,4.55,.22),d,4),J=new At;let fe=0;for(const be of[-5.25,5.25])for(const Ve of[24.35,29.15])J.makeTranslation(be,4.05,Ve),B.setMatrixAt(fe++,J);B.instanceMatrix.needsUpdate=!0,B.computeBoundingSphere(),B.name="focus-pergola-posts",B.userData.isLandscapeStage=!0,t.add(B);const xe=new St(new ee(.18,.14,4.9),d,2),Oe=new At;[-5.25,5.25].forEach((be,Ve)=>{Oe.makeTranslation(be,6.25,26.75),xe.setMatrixAt(Ve,Oe)}),xe.instanceMatrix.needsUpdate=!0,xe.computeBoundingSphere(),xe.name="focus-pergola-side-beams",xe.userData.isLandscapeStage=!0,t.add(xe);const Ie=new St(new ee(10.6,.14,.28),d,3),it=new At;[25.15,27.05,28.95].forEach((be,Ve)=>{it.makeTranslation(0,6.25,be),Ie.setMatrixAt(Ve,it)}),Ie.instanceMatrix.needsUpdate=!0,Ie.computeBoundingSphere(),Ie.name="focus-pergola-slats",Ie.userData.isLandscapeStage=!0,t.add(Ie);for(const be of[-4.6,4.6])r(be,1.52,30.05,1.88,.48,1.08,d),r(be,1.78,30.05,1.72,.08,.92,i);const Ke=new St(new An(.46,1),E,6),We=new At,Z=new j,ve=new j,le=new an,Be=[6718829,9545597,7901815,9545597,6718829,7901815];[-5.08,-4.6,-4.12,4.12,4.6,5.08].forEach((be,Ve)=>{Z.set(be,2.02+Ve%2*.08,30.05),ve.set(.92+Ve%3*.12,.82+Ve%2*.18,.78+Ve%3*.1),We.compose(Z,le,ve),Ke.setMatrixAt(Ve,We),Ke.setColorAt(Ve,new ue(Be[Ve]))}),Ke.instanceMatrix.needsUpdate=!0,Ke.instanceColor&&(Ke.instanceColor.needsUpdate=!0),Ke.computeBoundingSphere(),Ke.name="focus-raised-planter-shrubs",Ke.userData.isLandscapeStage=!0,t.add(Ke);const Re=r(0,5.05,31.25,10.9,2.25,.24,a);Re.userData.isLandscapeStage=!0;const Ne=document.createElement("canvas");Ne.width=1200,Ne.height=320;const Ae=Ne.getContext("2d");if(Ae){Ae.fillStyle="#263d3b",Ae.fillRect(0,0,Ne.width,Ne.height),Ae.strokeStyle="#d6c49d",Ae.lineWidth=8,Ae.strokeRect(14,14,Ne.width-28,Ne.height-28),Ae.textAlign="center",Ae.textBaseline="middle",Ae.fillStyle="#f6eedb",Ae.font="bold 54px Arial, sans-serif",Ae.fillText("CHOOSE BY PURPOSE",600,65),Ae.font="bold 34px Arial, sans-serif",Ae.fillText("QUICK MESSAGE",205,145),Ae.fillText("CHAT / VIDEO",600,145),Ae.fillText("FACE-TO-FACE",995,145),Ae.font="26px Arial, sans-serif",Ae.fillText("Simple information",205,194),Ae.fillText("Distant friends / planning",600,194),Ae.fillText("Emotion / trust",995,194),Ae.fillStyle="#d8c598",Ae.font="bold 25px Arial, sans-serif",Ae.fillText("ONE CLUB · FOUR WEEKS · NOT A UNIVERSAL RULE",600,265);const be=new Yt(Ne);be.colorSpace=Ct;const Ve=new U(new Vt(10.45,1.98),new xt({map:be,side:ct,toneMapped:!1}));Ve.position.set(0,5.05,31.39),Ve.name="focus-channel-choice-sign",Ve.userData.isLandscapeStage=!0,Ve.userData.noLandscapeShadow=!0,t.add(Ve)}m(0,1.43,29.45,.95,.24,a,12);const re=f(.9,1.58,Math.PI/2);re.position.z=29.45;const De=e(new It(.38,1.02,4),o,0,2.12,29.45);De.rotation.x=Math.PI/2,De.userData.isLandscapeBeacon=!0,_([[0,1.315,29.45],[-1.35,1.315,28.55],[-4.12,1.315,27.55]],x,.035),_([[0,1.315,29.45],[0,1.315,27.55],[0,1.315,25.85]],R,.035),_([[0,1.315,29.45],[1.35,1.315,28.55],[4.12,1.315,27.55]],T,.035),m(-4.25,1.38,27.4,1.14,.18,i,10),r(-4.25,1.72,27.4,1.72,.28,1.04,d),r(-4.25,2.12,27.4,.16,.62,.16,a),r(-4.25,3.08,27.4,1.48,1.56,.18,a);const we=r(-4.25,3.08,27.51,1.2,1.26,.045,c);we.userData.noLandscapeShadow=!0;for(const[be,Ve]of[.78,.58,.9].entries())r(-4.18,3.44-be*.3,27.55,Ve,.055,.025,be===0?s:o);for(const be of[-4.62,-4.25,-3.88]){const Ve=e(new ie(.075,8,6),be===-4.25?s:o,be,2.68,27.56);Ve.userData.isLandscapeBeacon=!0}m(0,1.38,25.3,1.12,.18,i,10),r(0,1.92,25.3,.2,1.04,.2,d),r(0,2.78,25.3,2.45,1.68,.2,a);const qe=r(0,2.78,25.42,2.2,1.42,.05,c);qe.userData.noLandscapeShadow=!0;for(const be of[-.57,.57]){const Ve=e(new ie(.25,10,8),be<0?o:s,be,3.08,25.49);Ve.userData.isLandscapeStage=!0,r(be,2.62,25.49,.42,.22,.08,be<0?o:s)}_([[-.28,3.1,25.54],[0,3.34,25.54],[.28,3.1,25.54]],s,.035),m(4.3,1.62,27.4,.16,.72,d,9),r(4.3,2.02,27.4,1.48,.16,.92,d),r(4.3,2.12,27.4,.52,.035,.38,l);for(const be of[3.02,5.58]){r(be,1.58,27.4,.94,.16,.9,a),r(be,2.02,27.02,.94,.78,.14,i);for(const Ve of[27.08,27.72])m(be,1.34,Ve,.07,.48,d,6)}for(const[be,Ve,I]of[[-4.25,27.4,o],[0,25.3,s],[4.3,27.4,o]]){const se=e(new je(.32,1),I,be,4.35,Ve);se.userData.isLandscapeBeacon=!0}break}case"listening-bench":{m(0,1.18,27,5.1,.34,a,12);for(const d of[-2.25,2.25]){r(d,1.78,27,1.85,.22,.78,i),r(d,2.34,d<0?27.38:26.62,1.85,.78,.18,o,d<0?-.04:.04);for(const c of[26.72,27.28])m(d,1.42,c,.1,.58,a,8)}for(const d of[-1.7,1.7]){const c=m(d,2.55,27,.34,1.02,d<0?o:i,8);c.userData.isLandscapeStage=!0;const l=e(new ie(.37,12,10),i,d,3.28,27);l.userData.isLandscapeStage=!0}const p=e(new je(.46,1),s,0,3.22,27);p.userData.isLandscapeBeacon=!0,_([[-1.18,3.05,27],[-.55,3.55,27],[.42,3.55,27],[1.18,3.05,27]],o,.075);for(const[d,c]of[[.82,4.26],[1.18,4.56],[1.54,4.86]]){const l=e(new ze(d,.055,7,28,Math.PI),s,0,c,27.25);l.userData.isLandscapeRoute=!0}f(4.75,1.05,.12);break}case"notification":{const p=[{x:-3.4,y:4.1,scale:.86,rows:[.76,1.28,.94,.62]},{x:0,y:5.6,scale:1.08,rows:[1.34,.82,1.12,.68]},{x:3.4,y:4.5,scale:.9,rows:[.92,1.22,.74,1.04]}];for(const{x:d,y:c,scale:l,rows:g}of p){const E=d*.035;r(d,c,27,2.2*l,2.8*l,.42,a,d*.035),r(d,c,26.73,1.88*l,2.44*l,.1,s,E),r(d-.1*l,c+.78*l,26.62,.78*l,.15*l,.06,o,E),g.forEach((R,T)=>{const w=T===1&&d===0?o:a;r(d-.08*l,c+(.34-T*.43)*l,26.62,R*l,.14*l,.06,w,E)});const x=e(new ie(.22*l,10,8),o,d+.58*l,c+.68*l,26.6);x.userData.isLandscapeBeacon=!0}_([[-4.4,1.55,27],[0,1.55,27],[4.4,1.55,27]],i,.18);break}case"study-desk":{const p=new q({color:10318977,emissive:4795195,emissiveIntensity:.2,roughness:.58,metalness:.08}),d=m(0,.24,27,8.1,.42,i,12);d.userData.isLandscapeStage=!0,h(13.2,6.3,o,31.1);const c=e(new ze(7.25,.08,7,48),i,0,.5,27);c.rotation.x=Math.PI/2;for(const[R,T]of[2.9,4.15,5.4].entries()){const w=-5.55-R*.18,S=r(w,T,26.45,1.48,.9,.18,a,-.08);S.userData.isLandscapeStage=!0,r(w-.12,T+.17,26.33,.82,.1,.06,p),r(w-.12,T-.08,26.33,1.04,.08,.06,o),r(w-.12,T-.28,26.33,.68,.07,.06,o);const A=e(new ie(.14,10,8),p,w+.52,T+.22,26.3);A.userData.isLandscapeBeacon=!0}_([[-7.15,1.28,26.8],[-6.2,1.35,26.55],[-5.25,1.42,26.5]],p,.075),r(0,2.45,27,8.2,.42,3.2,i);for(const R of[-3.45,3.45])for(const T of[25.8,28.2])r(R,1.35,T,.24,2,.24,a);r(0,2.12,27,5.2,.18,.22,a),r(-1.35,2.75,26.25,2.1,.1,1.45,s,-.08),r(-1.35,2.82,26.25,.08,.04,1.35,o,-.08);for(const R of[25.82,26.12,26.42])r(-1.38,2.83,R,1.54,.025,.035,o);r(-.05,2.88,26.9,1.1,.07,.09,a,-.38),r(1.9,2.68,27.45,1.55,.16,1.45,a,-.12),r(1.9,2.79,27.45,.72,.09,1.2,o,-.12),r(1.9,2.85,27.45,.56,.025,1.02,a,-.12),r(0,1.18,29.65,1.9,.26,1.6,a),r(0,2.08,30.35,1.9,1.8,.22,a),m(0,.62,29.65,.14,.86,o,8),r(0,4.05,29.2,4.7,2.5,.18,a),r(0,4.05,29.08,4.34,2.16,.05,s),r(0,4.83,29.02,3.25,.08,.04,o),r(-.65,4.35,29.02,1.95,.07,.04,o),r(.65,4.35,29.02,1.1,.07,.04,o),r(-1.05,3.88,29.02,2.75,.07,.04,o),m(3.15,3.15,27,.12,1.3,o,8),r(2.82,3.82,27,.9,.14,.56,o,-.18);const l=e(new ie(.3,10,8),s,2.82,3.55,26.73);l.userData.isLandscapeBeacon=!0,m(5.55,1.55,27.45,.2,2.25,a,10);const g=m(5.55,3.86,26.92,1.18,.16,a,12);g.rotation.x=Math.PI/2;const E=e(new ze(1.22,.12,8,32),o,5.55,3.86,26.78);E.userData.isLandscapeStage=!0;for(const[R,T,w,S]of[[5.55,4.68,.12,.28],[5.55,3.04,.12,.28],[4.73,3.86,.28,.12],[6.37,3.86,.28,.12]])r(R,T,26.72,w,S,.08,o);r(5.55,4.08,26.67,.1,.58,.08,s),r(5.77,3.86,26.66,.48,.1,.08,s);const x=e(new ie(.16,12,8),s,5.55,3.86,26.58);x.userData.isLandscapeBeacon=!0;break}case"filter":{const p=m(0,.98,27,7.1,.36,a,12);p.userData.isLandscapeStage=!0,h(10.4,6.4,o,28.1);const d=new q({color:13198187,emissive:7020586,emissiveIntensity:.22,roughness:.72}),c=[-3.35,0,3.35];for(const[T,w]of c.entries())r(w,3.05,25.72,1.84,2.35,.2,a),r(w,3.05,25.59,1.58,2.08,.06,T===1?i:s),r(w,3.88,25.53,1.08,.1,.06,o);for(const T of[-.2,.2]){const w=e(new ze(.26,.075,8,20),o,-3.35+T,3.12,25.46);w.rotation.z=T<0?-.62:.62,w.userData.isLandscapeStage=!0}const l=e(new ze(.32,.075,8,20,Math.PI),o,0,3.42,25.45);l.userData.isLandscapeStage=!0,r(0,2.96,25.45,.72,.56,.16,o);const g=e(new ie(.2,10,8),o,3.35,3.34,25.44);g.userData.isLandscapeStage=!0;const E=e(new ie(.36,10,8),o,3.35,2.75,25.44);E.scale.set(1.1,.68,.55),E.userData.isLandscapeStage=!0;const x=new cn;x.moveTo(0,1.16),x.lineTo(1.02,.72),x.lineTo(.86,-.12),x.quadraticCurveTo(.62,-.72,0,-1.08),x.quadraticCurveTo(-.62,-.72,-.86,-.12),x.lineTo(-1.02,.72),x.closePath();const R=e(new li(x,{depth:.18,bevelEnabled:!0,bevelSegments:2,bevelSize:.06,bevelThickness:.04}),o,0,5.48,28.4);R.userData.isLandscapeBeacon=!0,_([[-3.35,1.65,25.5],[-3.35,1.85,27.2],[0,2.05,28.2]],d,.1),_([[0,1.65,25.5],[0,2.2,26.9],[0,4.25,28.3]],o,.13),_([[3.35,1.65,25.5],[3.35,1.85,27.2],[0,2.05,28.2]],d,.1),f(5.4,1.24,.08);break}case"offline-rest":{const p=m(0,.98,27,7.1,.36,a,12);p.userData.isLandscapeStage=!0,h(7.2,6.2,o,27),r(-3.1,2.15,27,2.65,.24,.78,i),r(-3.1,2.76,27.34,2.65,.84,.18,o);for(const c of[-4.08,-2.12])for(const l of[26.76,27.24])r(c,1.7,l,.14,.72,.14,a);m(2.55,1.82,27,.78,.16,i,10),m(2.55,1.3,27,.14,.96,a,8),r(2.55,1.98,26.86,.72,.08,.34,a,-.12),r(2.55,2.04,26.86,.56,.025,.22,s,-.12);for(const[c,l]of[[-.68,o],[.68,i]]){m(c,2.35,27,.3,1.05,l,8);const g=e(new ie(.29,12,10),l,c,3.08,27);g.userData.isLandscapeStage=!0}_([[-.3,3.23,27],[0,3.62,27],[.3,3.23,27]],s,.065);for(const c of[-5.15,5.15]){m(c,1.3,27,.48,.62,i,8);for(const[l,g,E,x]of[[-.28,2.15,0,.5],[.22,2.45,.08,.58],[0,2.92,-.08,.48]]){const R=e(new dn(x,0),s,c+l,g,27+E);R.userData.isLandscapeStage=!0}}for(let c=0;c<4;c++){const l=c%2===0?-.32:.32;r(l,1.24,32-c*1.1,.92,.12,.66,c%2===0?i:s,l*.08)}_([[0,1.2,33],[0,1.2,30],[0,1.2,27.5]],o,.1);const d=e(new ie(.62,12,10),s,0,4.45,27);d.userData.isLandscapeBeacon=!0;for(const[c,l]of[[.92,4.38],[1.2,4.62]]){const g=e(new ze(c,.055,7,28),o,0,l,27);g.userData.isLandscapeRing=!0}break}case"clinic":{const p=new q({color:7112083,emissive:1321270,emissiveIntensity:.18,roughness:.9});p.fog=!1;const d=r(0,3.45,27,8,4.5,2.3,p);d.userData.isLandscapeStage=!0,r(0,5.82,27,8.55,.3,2.75,a);const c=new q({color:3493729,roughness:.96});c.fog=!1;for(const[x,R,T,w]of[[-7.7,2.55,32,1],[-6.1,1.75,34,.7],[7.6,2.35,33,.88]]){const S=e(new It(3.1*w,4.8*w,5),c,x,R,T);S.scale.set(1.2,1,.7),S.userData.isLandscapeStage=!0}r(0,3.38,25.78,1.25,3.18,.18,a),r(-.12,3.42,25.66,.78,2.64,.06,s),r(.58,3.05,25.6,.08,.12,.08,o);for(const x of[-2.5,2.5])r(x,4.05,25.78,1.28,1.24,.18,o),r(x,4.05,25.65,1.08,1.02,.06,s),r(x,4.05,25.59,.08,1.02,.035,i),r(x,4.05,25.59,1.08,.07,.035,i),r(x,3.42,25.55,1.5,.12,.36,a);r(0,4.98,25.16,2.55,.2,.92,o),r(0,6.35,25.64,.55,1.8,.18,o),r(0,6.35,25.62,1.8,.55,.2,o),r(0,1.45,25.12,2.6,.22,1.16,i),r(0,1.24,26.1,3.2,.18,.82,a),_([[0,1.18,33],[0,1.2,30],[0,1.32,27.8],[0,1.48,25.5]],o,.12);for(const x of[-5.1,5.1]){r(x,1.72,27.1,1.85,.18,.62,a),r(x,2.22,27.38,1.85,.68,.14,o);for(const R of[-.68,.68])r(x+R,1.42,27.1,.12,.54,.12,i)}const l=r(4.5,2.72,25.42,1.18,2.12,.28,a);l.userData.isLandscapeStage=!0,r(4.5,2.92,25.24,.92,1.38,.06,s);for(const[x,R]of[[4.28,o],[4.72,i]]){const T=e(new ie(.13,8,6),R,x,3.28,25.18);T.userData.isLandscapeStage=!0,r(x,2.92,25.18,.22,.34,.07,R)}_([[4.5,4.12,25.2],[3.6,4.75,26],[2.5,5.2,27]],s,.07);const g=m(2.8,6.02,27.5,.09,.62,a,8);g.userData.isLandscapeStage=!0;const E=e(new ze(.58,.08,8,24),o,2.8,6.38,27.5);E.rotation.y=Math.PI/2,E.userData.isLandscapeBeacon=!0;for(const[x,R]of[[.58,6.15],[.82,6.1]]){const T=e(new ze(x,.045,7,24,Math.PI),s,2.8,R,27.5);T.rotation.y=Math.PI/2,T.userData.isLandscapeRing=!0}break}case"telemedicine":{const p=m(0,.98,27,7.1,.36,a,12);p.userData.isLandscapeStage=!0,h(9.4,6.5,i,27),r(0,4.5,26.58,4.8,3.2,.16,a),r(0,4.55,26.45,4.18,2.6,.1,s);for(const[g,E]of[[-.88,o],[.88,i]]){const x=e(new ie(.27,10,8),E,g,4.98,26.34);x.userData.isLandscapeStage=!0,r(g,4.3,26.34,.68,.72,.1,E)}r(0,4.3,26.32,.12,.68,.08,o),r(0,4.3,26.32,.56,.12,.08,o),r(-3.45,1.92,27,2.55,.28,.88,i),r(-3.45,2.48,27.34,2.55,.82,.2,o);for(const g of[-4.35,-2.55])r(g,1.55,26.72,.14,.72,.14,a),r(g,1.55,27.28,.14,.72,.14,a);const d=m(-3.45,2.63,26.82,.3,.82,i,8);d.userData.isLandscapeStage=!0;const c=e(new ie(.27,10,8),i,-3.45,3.26,26.82);c.userData.isLandscapeStage=!0,m(3.15,1.82,27,.76,.16,a,10),m(3.15,1.32,27,.12,.94,a,8),r(3.15,2.3,26.72,.5,.86,.1,o),r(3.15,2.3,26.65,.34,.68,.04,s);const l=e(new ze(.19,.055,7,18,Math.PI),o,3.15,2.48,26.6);l.userData.isLandscapeStage=!0,r(3.15,2.24,26.6,.34,.22,.08,o);for(const g of[-4.2,4.2]){const E=e(new ie(.55,12,10),o,g,2.7,27);E.userData.isLandscapeBeacon=!0}_([[-4.2,2.9,27],[-3.45,3.35,27],[-1.6,3.6,27],[0,3.2,27],[1.7,3.6,27],[3.15,3.4,27],[4.2,2.9,27]],o,.1);break}case"community":{const p=m(0,.96,27,7.1,.36,a,12);p.userData.isLandscapeStage=!0;for(const[T,w]of[[-5.1,2.8],[-3.05,3.5],[3.05,3.1],[5.1,4]]){r(T,1.3+w/2,27.6,1.7,w,1.65,i);const S=e(new It(1.28,1.08,4),o,T,1.9+w,27.6);S.rotation.y=Math.PI/4,S.userData.isLandscapeStage=!0}r(0,2.55,26.15,2.45,2.7,1.7,i),r(0,3.98,26.15,2.76,.22,1.98,a),r(0,2.05,25.25,.74,1.62,.14,a),r(-.88,2.8,25.24,.56,.65,.14,s),r(.88,2.8,25.24,.56,.65,.14,s),r(0,4.62,25.2,.28,.96,.12,o),r(0,4.62,25.18,.96,.28,.14,o),r(0,1.32,24.82,1.9,.18,.72,i),_([[0,1.16,31],[0,1.2,28.6],[0,1.28,26.8],[0,1.32,25]],o,.12);const d=new q({color:7973541,emissive:1585455,emissiveIntensity:.3,roughness:.82}),c=new q({color:14214117,emissive:2307131,emissiveIntensity:.22,roughness:.78}),l=new q({color:14002824,roughness:.92}),g=(T,w,S)=>{for(const P of[-.16,.16]){const F=e(new he(.11,.13,.48,7),a,T+P,1.4,24.18);F.userData.isLandscapeStage=!0}const A=e(new he(.3,.38,.9,8),w,T,2.02,24.18);A.userData.isLandscapeStage=!0;const C=e(new ie(.32,10,8),l,T,2.67,24.18);C.userData.isLandscapeStage=!0;const L=e(new he(.085,.1,.72,6),w,T+(S<0?.31:-.31),2,24.15);L.rotation.z=S,L.userData.isLandscapeStage=!0};g(-1.82,d,-.92),g(1.82,c,.92),r(-3.8,1.46,24.2,1.55,.18,.48,a);for(const T of[-4.38,-3.22])r(T,1.28,24.2,.12,.38,.14,o);const E=m(3.75,1.7,24.2,.11,1.02,a,8);E.rotation.x=-.12,r(3.75,2.34,24.15,.72,.68,.13,s,-.12),r(3.75,2.34,24.06,.12,.4,.06,o,-.12),r(3.75,2.34,24.05,.4,.12,.06,o,-.12);const x=e(new ie(.34,12,10),s,0,4.05,26.15);x.userData.isLandscapeBeacon=!0;for(const T of[-5.1,-3.05,3.05,5.1])_([[T,1.36,27.6],[T*.54,1.28,26.6],[Math.sign(T)*.9,1.26,25.7]],o,.075);const R=new Qt(16766368,.72,11,2);R.position.set(0,4.1,24.2),t.add(R);break}case"community-library":{m(0,1.06,27,6.2,.4,a,14);const p=m(0,1.62,27,2.05,.28,i,12);p.userData.isLandscapeRoute=!0,m(0,1.8,27,1.86,.08,s,12);for(let d=0;d<6;d++){const c=Math.floor(d/3),l=d%3;v(-.74+l*.74,2.07+c*.04,26.45+c*.9,d,.42)}for(const d of[-4.65,4.65]){r(d,3.05,27,1.42,3.6,1.08,a);for(const c of[2.02,3.12,4.22]){r(d,c,26.38,1.28,.12,.16,o);for(let l=0;l<3;l++)v(d-.4+l*.4,c+.46,26.16,l+Math.round(c*2),.24)}}r(0,4.15,29.35,7.8,4.2,.4,a),r(0,4.15,29.08,7.24,3.62,.08,i);for(const d of[-2.3,0,2.3])r(d,4.12,29,.08,2.8,.06,o);for(const d of[3.18,4.12,5.06])r(0,d,28.98,6.8,.06,.06,o);for(const[d,c,l]of[[-1.4,3.55,s],[.85,3.55,o],[-2.25,4.5,o],[1.55,4.5,s],[-.8,5.42,o],[2.25,5.42,s]]){const g=r(d,c,28.86,.48,.34,.08,l,-.04);g.userData.isLandscapeBeacon=!0}for(const[d,[c,l]]of[[-3.15,27],[3.15,27],[0,24.9]].entries()){const g=m(c,2.05,l,.28,.86,d%2?o:a,8);g.userData.isLandscapeStage=!0;const E=e(new ie(.25,10,8),i,c,2.64,l);E.userData.isLandscapeStage=!0}r(0,2,23.35,1.72,1.42,1.06,o),r(0,2.38,22.78,1.12,.12,.08,a),r(0,1.42,22.78,.84,.12,.08,s),_([[-4.2,2.08,27],[-2.5,2.02,26.1],[0,2.08,25.7],[2.5,2.02,26.1],[4.2,2.08,27]],s,.08),_([[0,2.3,24],[0,2.75,25.1],[0,2.9,27],[0,3.6,28.4],[0,4,29]],o,.075),f(5.45,1.28,.12);break}case"community-network":{m(0,.98,27,6.1,.34,a,12);const p=r(0,1.34,25.45,8.3,.24,1.72,i);p.userData.isLandscapeRoute=!0,r(0,1.49,25.45,8.08,.08,1.55,a);for(const R of[24.65,26.25]){r(0,2.06,R,8.05,.1,.12,o);for(const T of[-3.65,-1.85,0,1.85,3.65])r(T,1.77,R,.1,.62,.12,a)}const d=e(new ee(1.72,.16,4.2),i,0,1.35,22.72);d.rotation.x=-.08,d.userData.isLandscapeRoute=!0;for(const R of[-.98,.98]){const T=e(new ee(.08,.09,4.05),o,R,1.76,22.72);T.rotation.x=-.08,T.userData.isLandscapeStage=!0;for(const w of[20.78,24.66]){const S=r(R,1.51,w,.09,.42,.09,a);S.userData.isLandscapeStage=!0}}for(const R of[-4,4])r(R,2.55,27,2.3,2.55,1.8,i),r(R,3.88,27,2.48,.18,1.96,o),r(R-.48,2.55,26.06,.52,.78,.12,s),r(R+.48,2.55,26.06,.52,.78,.12,s);r(-4,4.55,26.02,.28,1.18,.14,o),r(-4,4.55,26.02,1.18,.28,.14,o);for(const R of[-4,0,4]){const T=e(new ie(.34,12,10),s,R,R===0?4.1:4.45,27);T.userData.isLandscapeBeacon=!0}const c=r(0,2.15,26.88,1.35,.18,.86,a);c.rotation.z=-.08,r(0,2.72,26.42,.64,.92,.12,o,-.08);const l=r(0,2.75,26.34,.48,.68,.06,s,-.08);l.userData.isLandscapeStage=!0;const g=[7973541,10466753,12163964,8560576],E=new q({color:14002824,roughness:.92});for(const[R,T]of[-2.75,-1.05,1.05,2.75].entries()){const w=new q({color:g[R],emissive:g[R],emissiveIntensity:.08,roughness:.86});for(const C of[-.14,.14]){const L=e(new he(.1,.12,.43,7),a,T+C,1.69,25.45);L.userData.isLandscapeStage=!0}const S=e(new he(.28,.35,.68,8),w,T,2.14,25.45);S.userData.isLandscapeStage=!0;const A=e(new ie(.27,10,8),E,T,2.72,25.45);A.userData.isLandscapeStage=!0;for(const C of[-1,1]){const L=T<0&&C>0||T>0&&C<0,P=e(new he(.075,.085,.58,6),w,T+C*.29,2.1,25.45);P.rotation.z=-C*(L?.92:.42),P.userData.isLandscapeStage=!0}}_([[-4,4.45,26.65],[-2.35,4.85,26.25],[0,4.15,26.25],[2.35,4.85,26.25],[4,4.45,26.65]],o,.09),_([[-4,1.45,27],[-2.2,1.4,25.9],[0,1.5,25.6],[2.2,1.4,25.9],[4,1.45,27]],s,.08),f(5.35,1.3,.16);const x=new Qt(11134719,.9,16,2);x.position.set(0,5.2,25.4),t.add(x);break}case"timeline":{const p=[-4,0,4];for(const[P,F]of p.entries()){const k=P===1?3.75:3.25,G=3.55;m(F,1.28,27,1.22,.34,a,8),r(F,G,27,2.55,k,.48,a),r(F,G,26.7,2.2,k-.32,.1,i),r(F-1.14,G,26.58,.12,k+.08,.1,o),r(F+1.14,G,26.58,.12,k+.08,.1,o),r(F,G+k/2,26.58,2.38,.12,.1,o),r(F,G-k/2,26.58,2.38,.12,.1,o),r(F,2.55,26.55,1.24,.075,.055,o),r(F,2.33,26.55,.92,.075,.055,o)}_([[p[0]-.84,3.7,26.34],[p[0]+.84,3.7,26.34]],o,.1);for(const P of[-4.84,-4.28,-3.72,-3.16]){const F=e(new ie(.16,10,8),s,P,3.7,26.3);F.userData.isLandscapeBeacon=!0}const d=e(new It(.2,.42,4),o,p[0]+.98,3.7,26.3);d.rotation.z=-Math.PI/2,d.userData.isLandscapeStage=!0;const c=new q({color:4353656,emissive:1059378,emissiveIntensity:.22,roughness:.62,metalness:.12}),l=e(new he(2.7,2.9,.22,12),c,0,1.48,25.2);l.scale.z=.58,l.userData.isLandscapeStage=!0;const g=new cn;g.moveTo(-1.7,.18),g.lineTo(-1.28,-.38),g.lineTo(1.2,-.38),g.lineTo(1.7,.18),g.lineTo(.9,.34),g.lineTo(-1.15,.34),g.closePath();const E=new q({color:7359281,roughness:.82,metalness:.04}),x=e(new li(g,{depth:.62,bevelEnabled:!0,bevelSegments:1,steps:1,bevelSize:.06,bevelThickness:.05}),E,0,1.94,24.9);x.userData.isLandscapeStage=!0,_([[-1.48,2.13,24.83],[0,2.23,24.83],[1.48,2.13,24.83]],o,.07);const R=m(0,3.52,25.05,.075,2.95,a,8);R.userData.isLandscapeStage=!0;const T=new q({color:15916984,roughness:.8,side:ct}),w=new cn;w.moveTo(-.08,0),w.lineTo(-.08,2.45),w.lineTo(-1.62,.3),w.closePath();const S=e(new gi(w),T,0,2.34,24.82);S.userData.isLandscapeStage=!0;const A=new cn;A.moveTo(.08,.08),A.lineTo(.08,1.62),A.lineTo(1.08,.34),A.closePath();const C=e(new gi(A),o,0,2.42,24.8);C.userData.isLandscapeStage=!0,_([[-1.62,2.2,25],[0,5.05,25],[1.12,2.5,25]],s,.045);for(const[P,F]of[[24.3,0],[25.8,.28],[26.55,-.2]])_([[-2.1,1.61,P],[-.8,1.68+F,P-.08],[.7,1.62,P],[2,1.7+F,P+.08]],s,.045);const L=new Qt(16767398,.9,13,2);L.position.set(0,5.2,24.9),t.add(L),_([[-5.3,1.52,27],[-4,1.52,26.35],[0,1.52,26.35],[4,1.52,26.35],[5.3,1.52,27]],o,.12);break}case"perseverance":{for(let d=0;d<6;d++)r(-4.2+d*1.45,1.15+d*.53,27,1.55,.28,2.1,d===5?o:i);const p=e(new je(.9,1),s,3.3,5.1,27);p.userData.isLandscapeBeacon=!0,_([[-4.2,1.45,26.7],[-1.7,2,26.7],[.2,3.1,26.7],[3.3,5.1,26.7]],o,.09);break}case"route-evidence":{m(0,1.2,27,5.2,.32,a,12),r(0,3.45,27,7.8,3.8,.3,i),r(0,3.45,26.78,7.1,3.1,.08,a),_([[-3.1,2.6,26.62],[-1.7,4.4,26.62],[.4,3.3,26.62],[2.8,4.55,26.62]],o,.09);for(const[p,d]of[-3.1,-1.7,.4,2.8].entries()){const c=e(new je(.3,0),p%2===0?s:o,d,p%2===0?2.6:4.4,26.48);c.userData.isLandscapeBeacon=!0}for(const p of[-1.75,1.75])r(p,3.18,26.45,2.05,1.48,.1,p<0?s:o),r(p,3.18,26.36,1.58,1.02,.06,a);f(4.7,1.05,.1);break}case"legacy":{for(let p=0;p<3;p++){const d=(p-1)*3.2;h(2.4,4.6+p*1.1,p===2?o:i,27,d);const c=e(new ie(.34+p*.08,10,8),s,d,5+p,26.55);c.userData.isLandscapeBeacon=!0}_([[-4.6,1.4,27],[0,1.4,27],[4.6,1.4,27]],o,.13);break}case"spotlight":{m(0,1.2,27,4.4,.5,a,12),m(0,1.55,27,2.3,.22,o,12);for(const d of[-4.2,4.2]){const c=e(new It(1.35,6.8,12,1,!0),s,d,5.1,27);c.rotation.z=d<0?-.22:.22,c.userData.isLandscapeStage=!0}const p=e(new je(.62,1),o,0,3.25,26.4);p.userData.isLandscapeBeacon=!0;break}case"humanitarian":{const p=new q({color:8557178,roughness:.92,metalness:.02}),d=new q({color:10122064,roughness:.9,metalness:.02}),c=new q({color:7052452,emissive:1588552,emissiveIntensity:.16,roughness:.48,metalness:.12});for(const l of[-3.8,3.8])for(const g of[24.6,29.4])m(l,3.1,g,.18,4.8,a,7);r(0,5.55,27,8.5,.28,6.6,p),r(0,5.39,27,8.65,.12,6.72,o);for(const l of[-3.15,3.15]){m(l,1.93,26.6,.52,1.55,c,10),m(l,2.76,26.6,.24,.16,a,8);const g=e(new ze(.3,.07,7,20),o,l,2.72,26.6);g.rotation.x=Math.PI/2,g.userData.isLandscapeStage=!0}for(const[l,g]of[-2.1,0,2.1].entries())r(g,1.78,24.8,1.48,1.35,1.18,d),r(g,2.49,24.8,1.56,.12,1.24,l===1?s:i),r(g,1.78,24.17,.1,1.05,.08,o),r(g,1.78,24.15,1.24,.1,.08,o);r(0,3.55,29.82,4.7,2.15,.2,a),r(0,4.63,29.68,4.45,.12,.08,o);for(const[l,g]of[-1.45,0,1.45].entries())r(g,3.84,29.68,.12,1.15,.08,l===1?s:i);_([[-4.5,1.22,27.5],[-2.8,1.38,26.8],[-1.4,1.34,25.8],[0,1.32,25.8],[1.4,1.34,25.8],[2.8,1.38,26.8],[4.5,1.22,27.5]],o,.09);for(const l of[-2.8,0,2.8]){const g=e(new je(.3,1),s,l,3.03,29.5);g.userData.isLandscapeBeacon=!0}break}case"lasting-service":{m(0,1.4,27,3.2,.36,i,12),m(0,4.25,27,.32,5.4,a,8);for(const[p,d]of[[-1.1,5.5],[0,6.1],[1.1,5.5],[-.6,7],[.7,7]]){const c=e(new ie(1.05,10,8),s,p,d,27);c.userData.isLandscapeStage=!0}for(const p of[-3.5,3.5]){const d=e(new je(.42,0),o,p,2.1,27);d.userData.isLandscapeBeacon=!0}break}case"community-witness":{m(0,1.18,27,5.7,.34,a,12),m(0,1.56,27,3.3,.18,o,12);for(const[d,c,l]of[[-2.2,28.2,-.3],[0,28.8,0],[2.2,28.2,.3]]){const g=r(d,1.95,c,1.6,.2,.72,i,l);g.userData.isLandscapeStage=!0,r(d,2.34,c-.34,1.6,.62,.16,o,l)}const p=m(0,2.12,26.15,1.08,.2,i,10);p.userData.isLandscapeStage=!0;for(const d of[-3.5,0,3.5]){const c=e(new ie(.3,10,8),s,d,3.15,26.55);c.userData.isLandscapeBeacon=!0}_([[-3.7,2.75,26.6],[-1.8,3.3,26.1],[0,2.9,25.95],[1.8,3.3,26.1],[3.7,2.75,26.6]],o,.075),f(4.95,1.08,.12);break}case"fleet":{const p=r(0,2.4,27,8.8,1.15,2.4,a);p.rotation.z=Math.PI;for(const d of[-2.6,0,2.6]){m(d,5.1,27,.1,5.1,o,8);const c=e(new It(1.65,3.2,3),d===0?s:i,d,5.1,26.7);c.rotation.z=Math.PI/2,c.rotation.y=Math.PI/2,c.userData.isLandscapeStage=!0}_([[-5.5,1.35,27],[-2.8,1.1,26],[0,1.1,27],[2.8,1.1,28],[5.5,1.35,27]],o,.16);break}case"peace-contact":{for(const d of[-4.5,4.5])r(d,2.2,27,2.2,2.1,2.2,i),r(d,4.1,26.55,1.65,1.1,.8,s);const p=r(0,1.7,27,6.8,.34,1.3,o);p.userData.isLandscapeRoute=!0;for(const d of[-1.8,0,1.8])v(d,2.35,26.25,Math.round(d+2));f(5.5,1.2,.12);break}case"chart-room":{m(0,1.25,27,5.7,.42,a,16),m(0,1.52,27,4.25,.14,i,16);const p=m(0,1.64,27,3.72,.12,o,16);p.scale.z=.68,p.userData.isLandscapeStage=!0,_([[-3.1,1.82,27],[-1.8,2.05,26.5],[0,1.9,27.1],[1.55,2.15,26.4],[3.1,1.82,27]],s,.065),_([[-2.65,1.84,27.6],[-1.4,1.96,27.2],[.2,1.86,26.7],[1.95,1.98,27.35],[2.8,1.84,27.6]],o,.065);for(const[l,g]of[[-3.1,27],[-1.8,26.5],[0,27.1],[1.55,26.4],[3.1,27]]){const E=e(new je(.22,0),s,l,2.03,g);E.userData.isLandscapeBeacon=!0}const d=m(0,3.25,26.15,.12,3.2,a,8);d.userData.isLandscapeStage=!0;const c=e(new je(.48,1),o,0,4.98,26.15);c.userData.isLandscapeBeacon=!0,f(5.15,1.12,.1);break}case"exchange-harbor":{m(0,1.05,27,6.2,.36,a,14);for(const d of[-4,4]){r(d,1.62,27,2.1,.42,5.4,i);for(const c of[25.2,27,28.8])m(d,1.2,c,.17,1.1,o,8);r(d,2.15,26.2,1.25,.86,1.1,d<0?s:o),r(d,2.15,27.55,1.25,.86,1.1,i)}const p=r(0,1.78,27,5.4,.28,1.25,o);p.userData.isLandscapeRoute=!0;for(const[d,c]of[[-1.55,2.52],[0,3.15],[1.55,2.52]]){const l=e(new je(.34,0),s,d,c,26.35);l.userData.isLandscapeBeacon=!0}_([[-4.8,1.42,27],[-2.5,1.72,26.2],[0,2.1,26.2],[2.5,1.72,26.2],[4.8,1.42,27]],s,.085),f(5.55,1.18,.14);break}case"itinerary":{const p=new q({color:14996397,emissive:3354402,emissiveIntensity:.28,roughness:.96}),d=new q({color:4348748,emissive:1582364,emissiveIntensity:.12,roughness:.8});r(0,3.5,27,9.4,4.6,.42,a),r(0,3.5,26.7,8.7,3.9,.1,p),_([[-3.4,2.4,26.54],[-1.9,4.2,26.54],[.4,3.2,26.54],[2.7,4.5,26.54],[3.6,2.5,26.54]],d,.1);for(const[S,A]of[[-3.4,2.4],[-1.9,4.2],[.4,3.2],[2.7,4.5],[3.6,2.5]]){const C=e(new ie(.22,10,8),s,S,A,26.45);C.userData.isLandscapeBeacon=!0}const c=new q({color:6708036,roughness:.96});_([[-4.8,1.48,25],[-2.8,1.5,24.2],[-.2,1.52,24.6],[2.2,1.52,25.55],[4.5,1.55,25.35]],c,.18),_([[-.2,1.52,24.6],[-1.6,1.5,26.1],[-2.9,1.52,27.8]],o,.085),r(-4.35,1.95,24.9,1.55,1.12,.95,a),r(-4.35,2.56,24.9,1.62,.18,1.02,o);for(const S of[-4.78,-3.92]){const A=e(new ie(.16,10,8),i,S,1.35,24.84);A.userData.isLandscapeStage=!0,m(S,2.83,24.9,.055,.55,i,7)}r(-4.35,3.12,24.9,.92,.11,.12,i),m(2.55,2.55,24.95,.12,2.75,a,8),r(2.05,3.48,24.95,1.62,.35,.18,o,-.08),r(3.03,4.02,24.95,1.5,.35,.18,i,.08);const l=e(new je(.26,0),s,2.55,4.35,24.95);l.userData.isLandscapeBeacon=!0;const g=6.85;r(g,2.8,26.45,2.3,2.45,1.5,a),r(g,2.92,25.66,1.9,1.55,.12,p),r(g,4.12,25.72,2.45,.24,1.68,o),r(g,2.1,25.42,2.2,.38,.78,i);for(const S of[g-1.02,g+1.02])r(S,2.92,25.54,.12,1.65,.14,i);for(const S of[g-.5,g,g+.5])r(S,2.42,25.3,.24,.28,.24,s);const E=e(new ie(.2,10,8),s,g,4.42,25.56);E.userData.isLandscapeBeacon=!0;const x=e(new he(.27,.38,.92,8),o,3.95,2.25,25.1);x.userData.isLandscapeStage=!0;const R=e(new ie(.29,10,8),i,3.95,2.95,25.1);R.userData.isLandscapeStage=!0;const T=e(new he(.27,.38,.92,8),a,g+.22,2.92,26.25);T.userData.isLandscapeStage=!0;const w=e(new ie(.29,10,8),i,g+.22,3.62,26.25);w.userData.isLandscapeStage=!0,_([[4.12,2.72,25.15],[5.1,3.05,25.15],[g-.72,3.1,25.15]],s,.055);break}case"detour":{for(const[p,d,c]of[[-3.8,27,1.2],[-2.5,28.1,1.5],[2.8,26.6,1.2],[4,27.4,.95]]){const l=e(new dn(c,0),i,p,1.15,d);l.userData.isLandscapeStage=!0}_([[-5.1,1.35,29],[-2.5,1.5,29.5],[0,1.45,28],[2.1,1.4,25.3],[5,1.3,25.6]],o,.2);for(const p of[-2.4,2.1]){const d=e(new je(.46,0),s,p,2.4,27.2);d.userData.isLandscapeBeacon=!0}break}case"market-encounter":{m(0,1.08,27,5.8,.3,a,12);for(const[p,d]of[-3.35,3.35].entries()){r(d,3.05,27,2.8,.18,2.25,p===0?o:i);for(const c of[-1.05,1.05])m(d+c,2.12,27,.08,1.85,a,7);r(d,2.55,27,2.38,.72,1.8,p===0?i:o);for(const c of[26.5,27.5])r(d,1.82,c,.48,.36,.42,s)}for(const[p,d]of[[-.95,o],[.95,s]]){const c=e(new he(.24,.33,.88,8),d,p,2.12,25.7);c.userData.isLandscapeStage=!0;const l=e(new ie(.25,10,8),i,p,2.78,25.7);l.userData.isLandscapeStage=!0}_([[-4.8,1.38,29],[-2.4,1.46,28.2],[0,1.55,27.6],[2.4,1.46,28.2],[4.8,1.38,29]],s,.08),f(5.1,1.08,.11);break}case"hostel":{r(0,3.2,27,7.6,3.8,2,i),r(0,3,25.9,1.55,2.8,.16,a);for(const d of[-2.3,2.3])r(d,4.05,25.88,1.12,.96,.15,s);const p=e(new ie(.42,10,8),o,0,5.55,25.75);p.userData.isLandscapeBeacon=!0,_([[-4.3,1.25,29],[-2.2,1.4,27.6],[0,1.45,26],[2.4,1.35,25]],o,.14);break}case"open-route":{h(8.4,5.4,i,27),_([[0,1.35,30],[0,1.55,28],[-2.5,2.1,26],[-4.1,2.55,24.8]],o,.14),_([[0,1.35,30],[0,1.55,28],[2.5,2.1,26],[4.1,2.55,24.8]],s,.14);for(const p of[-4.1,4.1]){const d=e(new ie(.46,10,8),o,p,2.55,24.8);d.userData.isLandscapeBeacon=!0}break}case"confidence":{for(let d=0;d<4;d++)r(0,1.05+d*.47,28-d*.8,7.6-d*1.25,.28,1.2,d===3?o:i);r(0,3.45,24.65,4.6,.28,1.35,a);for(const d of[-1.9,1.9])r(d,3.95,24.65,.22,.9,.22,o);const p=e(new ie(.56,12,10),s,0,5.25,24.65);p.userData.isLandscapeBeacon=!0;break}case"reflection-garden":{m(0,1.05,27,6.1,.34,a,14);for(let c=0;c<4;c++)r(0,1.38+c*.42,29-c*1.05,8.2-c*1.25,.24,.82,c%2===0?i:o);const p=m(0,2.05,24.8,2.35,.16,s,16);p.scale.z=.55;for(const c of[-3.45,3.45])r(c,2.1,25.6,1.7,.2,.58,i),r(c,2.62,25.88,1.7,.72,.16,o);const d=e(new je(.48,1),s,0,4.05,24.55);d.userData.isLandscapeBeacon=!0,_([[-4.7,1.45,29.4],[-2.4,1.65,27.8],[0,1.86,26.5],[2.4,1.65,27.8],[4.7,1.45,29.4]],o,.075),f(5.3,1.1,.12);break}case"rain-shelter":{m(0,1.04,27,5.7,.34,a,12);for(const p of[-3.2,3.2])m(p,2.75,26.4,.1,3.15,o,8),m(p,2.75,28.1,.1,3.15,o,8);r(0,4.48,27.25,7.25,.24,3.6,i,-.08),r(0,4.63,27.25,7.25,.12,3.6,o,-.08),r(0,1.95,27.45,3.6,.2,.72,a),r(0,2.42,27.78,3.6,.68,.16,s);for(const p of[-4.1,-2.05,0,2.05,4.1])_([[p,3.35,24.8],[p+.35,2.85,24.8]],o,.045);_([[-4.9,1.38,29.4],[-2.3,1.5,28.8],[0,1.55,28.1],[2.4,1.5,28.8],[4.9,1.38,29.4]],s,.08),f(5.15,1.07,.1);break}case"rail-platform":{for(const p of[25.6,28.5])r(0,1.3,p,10.5,.32,1.3,i);for(const p of[-4.6,4.6]){const d=m(p,4.15,27,.18,5.7,a,8),c=e(new ie(.38,10,8),o,p,6.55,26.78);c.userData.isLandscapeBeacon=!0,d.userData.isLandscapeStage=!0}h(8.7,5.8,o,27),_([[-5.5,1.12,25.3],[0,1.12,25.3],[5.5,1.12,25.3]],a,.08);break}case"rail-car":{r(0,3.15,27,9.6,3.6,2.6,a),r(0,5.05,27,8.8,.4,2.3,o);for(const p of[-3.5,-1.2,1.2,3.5])r(p,3.8,25.63,1.65,1.35,.12,s);for(const p of[-3.5,3.5]){const d=e(new ie(.52,12,10),i,p,1.15,26.1);d.userData.isLandscapeStage=!0}_([[-5.4,.92,27],[0,.92,27],[5.4,.92,27]],o,.14);break}case"landscape-window":{m(0,1.05,27,5.9,.34,a,14),r(0,3.62,27,8.5,4.8,.42,i),r(0,3.64,26.74,7.75,4.05,.08,a),h(6.9,4.2,o,26.58);for(const[d,c,l,g]of[[-2.9,2.3,2.1,s],[-.9,2.5,3.15,o],[1.35,2.9,2.45,i],[3.05,1.65,1.75,s]]){const E=e(new It(c,l,5),g,d,1.78+l/2,26.48);E.userData.isLandscapeStage=!0}_([[-3.6,1.7,26.3],[-1.5,2.02,26.3],[.4,1.78,26.3],[3.45,2.08,26.3]],o,.075);const p=e(new ie(.4,12,10),s,2.6,4.35,26.25);p.userData.isLandscapeBeacon=!0,f(5.2,1.12,.1);break}case"route-network":{m(0,1.06,27,6.2,.34,a,14);for(const[p,d,c,l]of[[-4,28.3,2.1,1.45],[0,26.1,2.7,1.95],[4,28.3,2.1,1.45]]){const g=r(p,2.05,d,c,l,1.15,p===0?i:o);g.userData.isLandscapeStage=!0;const E=e(new je(p===0?.38:.28,0),s,p,3.1+l/2,d);E.userData.isLandscapeBeacon=!0}_([[-4.2,2.45,28.05],[-2.2,2.15,27.25],[0,2.12,26.75],[2.2,2.15,27.25],[4.2,2.45,28.05]],s,.1),_([[-4.2,1.18,29],[-2.1,1.2,27],[0,1.22,26],[2.1,1.2,27],[4.2,1.18,29]],o,.085),h(7.8,5.1,o,27),f(5.55,1.16,.13);break}case"career":{m(0,1.15,27,6.15,.3,a,12),m(0,2.15,27,3.25,.42,i,12),h(10.4,7.1,o,30.2),r(0,4.75,30.52,6.8,3.5,.3,a);for(const E of[-2.15,0,2.15])r(E,4.75,30.32,1.72,2.88,.12,E===0?s:i),r(E,6.18,30.21,.88,.12,.08,o),r(E,3.55,30.21,1.1,.1,.08,o);for(const E of[-3.6,0,3.6]){m(E,5.95,27.7,.07,1.55,a,6);const x=e(new ie(.3,10,8),s,E,5.05,27.7);x.userData.isLandscapeBeacon=!0}for(const E of[0,Math.PI/3,Math.PI*2/3,Math.PI,Math.PI*4/3,Math.PI*5/3]){const x=Math.cos(E)*4.5,R=27+Math.sin(E)*2.4,T=r(x,1.52,R,1.1,.28,.95,a,E+Math.PI/2);T.userData.isLandscapeStage=!0;const w=r(x+Math.cos(E)*.42,2.02,R+Math.sin(E)*.32,1.02,.82,.2,i,E+Math.PI/2);w.userData.isLandscapeStage=!0,_([[x*.72,2.2,27+(R-27)*.7],[0,2.25,27]],o,.055)}const p=new q({color:14001271,roughness:.86}),d=[new q({color:8214333,roughness:.9}),new q({color:4811890,roughness:.88}),new q({color:9070660,roughness:.9})],c=[{x:4.5,z:27,coat:d[0],facing:Math.PI},{x:-2.25,z:29.08,coat:d[1],facing:-Math.PI/3},{x:2.25,z:24.92,coat:d[2],facing:Math.PI/3}];for(const E of c){const{x,z:R,coat:T,facing:w}=E,S=r(x,1.82,R,.66,.32,.48,T,w),A=r(x,2.32,R,.7,.82,.43,T,w),C=e(new ie(.3,10,8),p,x,2.98,R),L=e(new ie(.305,8,6),a,x,3.08,R+.045);L.scale.set(1,.48,.92);for(const P of[-1,1]){const F=r(x+P*.4,2.29,R-.06,.2,.62,.24,T,w);F.rotation.z=P*-.12;const k=e(new ie(.12,8,6),p,x+P*.43,1.98,R-.15);k.userData.isLandscapeStage=!0}for(const P of[S,A,C,L])P.userData.isLandscapeStage=!0}r(-1.18,2.58,26.45,1.12,.16,.78,i,-.08),r(-1.18,2.7,26.45,.92,.08,.68,s,-.08);const l=e(new ze(.42,.1,8,16),o,1.25,2.76,26.5);l.userData.isLandscapeStage=!0;const g=e(new je(.62,1),s,0,3.1,26.5);g.userData.isLandscapeBeacon=!0;break}case"violin":{const p=e(new ie(1.55,16,12),i,-.58,3.25,27);p.scale.set(.82,1,.28),p.userData.isLandscapeStage=!0;const d=e(new ie(1.2,16,12),o,.62,3.65,27);d.scale.set(.78,.86,.27),d.userData.isLandscapeStage=!0,r(0,3.7,27,.66,3.25,.48,a,-.1),r(0,5.42,26.65,.92,.16,.2,o);for(const c of[-.16,0,.16])r(c,4.1,26.62,.035,3.05,.05,s);_([[-2.65,1.65,26.5],[.1,1.45,26.5],[2.8,6.2,26.5]],o,.09);break}case"craft-quality":{r(0,2.05,27,8.6,.42,3.1,a);for(const d of[-3.5,3.5])r(d,1.05,26.05,.34,1.65,.34,i),r(d,1.05,27.95,.34,1.65,.34,i);for(const d of[-2.45,0,2.45]){const c=r(d,2.58,26.92,1.72,.58,1.18,d===0?s:i,d===0?0:.08);c.userData.isLandscapeStage=!0,r(d,2.91,26.92,1.32,.08,.82,o,d===0?0:.08)}for(const d of[25.95,28.05])r(0,3.05,d,6.1,.1,.12,o);_([[-3.7,3.28,25.55],[-1.8,3.68,25.18],[0,3.92,25.02],[1.8,3.68,25.18],[3.7,3.28,25.55]],o,.07),u(4.05).scale.setScalar(.54),f(3.6,3.72);break}case"bench":{h(9.2,5.5,a,30.8),r(0,4.55,30.45,5.35,2.9,.24,a),r(0,4.55,30.29,4.95,2.48,.08,i);for(let c=0;c<3;c++){const l=5.35-c*.64,g=e(new je(.16,0),o,-1.72,l,30.2);g.userData.isLandscapeStage=!0,r(-.25,l,30.2,2.35,.075,.05,s)}for(const c of[-4,4]){r(c,2.35,28.25,1.65,.18,1.25,i);for(const l of[-.58,.58])for(const g of[-.42,.42])r(c+l,1.65,28.25+g,.12,1.3,.12,a);r(c,1.52,26.25,.9,.2,.82,a),r(c,2.12,26.65,.86,.92,.16,o)}r(0,2.35,27,7.2,.4,2.6,i);for(const c of[-3,3])for(const l of[26.1,27.9])r(c,1.35,l,.2,1.8,.2,a);r(-1.55,2.75,26.48,2.2,.22,.92,o),r(1.55,2.8,26.6,1.35,.3,.72,s),m(2.9,3.4,27,.12,1.6,a,8),_([[-3.4,3,26.6],[-1.6,3.45,26.4],[0,3.1,26.1],[1.55,3.5,26.6]],o,.075);const p=r(3.65,1.66,24.55,.98,.2,.86,s,.12);p.rotation.z=.08,r(3.65,2.28,24.94,.9,.92,.17,o,.12);for(const[c,l,g]of[[-.34,-.28,.72],[.34,-.28,.72],[-.34,.28,.42],[.34,.28,.72]])r(3.65+c,1.24,24.55+l,.12,g,.12,a);const d=e(new ze(.82,.07,8,24),s,3.65,1.1,24.55);d.rotation.x=Math.PI/2,d.userData.isLandscapeRing=!0;break}case"caliper":{for(const d of[-3.1,3.1])r(d,4.2,27,.42,5.8,.5,o);r(0,7,27,6.6,.42,.5,o),r(-.7,4.95,27,.35,2.5,.45,s),r(.25,3.05,27,2.2,1.25,1.8,i);for(let d=0;d<5;d++)r(-2.35+d*.5,6.55,26.72,.08,.24,.12,a);const p=e(new ie(.36,10,8),s,-.78,5.05,26.68);p.userData.isLandscapeBeacon=!0;break}case"trust-bridge":{for(const d of[-5,5])for(const c of[26.2,27.8])m(d,2.5,c,.48,3.4,i,8);const p=r(0,2.25,27,10.5,.42,2.5,o);p.userData.isLandscapeRoute=!0;for(const d of[-4.1,4.1])r(d,4.1,27,.28,3.5,.28,a);_([[-4.1,5.6,27],[0,5.6,27],[4.1,5.6,27]],s,.12);break}case"loom":{h(8.2,6.4,i,27);for(let p=0;p<11;p++){const d=-3.45+p*.69;r(d,3.95,26.55,.075,4.55,.12,p%3===0?o:s)}for(let p=0;p<5;p++)r(0,2.5+p*.65,26.45,7.2,.1,.1,p%2?i:o);f(4.8,1.25,.05);break}case"heritage":{r(0,4.2,27,8.4,5.6,.56,a),r(0,4.2,26.66,7.7,4.9,.12,i);for(let p=0;p<5;p++)for(let d=0;d<7;d++){const c=e(new je(.22+(p+d)%2*.08,0),(p+d)%3===0?o:s,-2.85+d*.95,2.4+p*.85,26.5);c.userData.isLandscapeStage=!0}_([[-4.7,1.2,27],[-2.2,1.5,26],[0,1.35,25.8],[2.3,1.5,26],[4.7,1.2,27]],o,.1);break}case"work-dignity":{m(0,1.18,27,5.6,.32,a,12);for(const[d,c]of[-3.75,-1.25,1.25,3.75].entries()){const l=r(c,1.96,27,1.55,1.15,1.5,d%2===0?i:a);l.userData.isLandscapeStage=!0;const g=e(d%2===0?new je(.56,0):new ze(.42,.12,7,16),d%2===0?o:s,c,2.9,26.45);g.userData.isLandscapeStage=!0,_([[c,3.2,26.4],[c/2,3.72,26.2],[0,4.05,26.2]],o,.055)}const p=e(new je(.48,1),s,0,4.25,26.15);p.userData.isLandscapeBeacon=!0,f(5.05,1.12,.08);break}case"craft-evolution":{r(0,1.85,27,8.4,.42,2.9,a);for(const c of[-3.2,3.2])r(c,1.12,26.08,.28,1.35,.28,i),r(c,1.12,27.92,.28,1.35,.28,i);const p=e(new ze(.88,.14,8,24),o,-2.25,3.55,26.72);p.userData.isLandscapeStage=!0,r(-2.25,3.55,26.68,.12,1.38,.08,a,-.46),r(2.25,3.55,26.7,2.35,1.7,.22,i),r(2.25,3.55,26.55,1.85,1.16,.08,s);for(const c of[3.3,3.55,3.8])r(2.25,c,26.49,1.2,.055,.04,o);_([[-1.24,3.55,26.52],[0,4.1,26.52],[1.08,3.55,26.52]],s,.085);const d=e(new je(.38,1),o,0,4.45,26.45);d.userData.isLandscapeBeacon=!0;break}case"embroidery-table":{r(0,1.72,27.15,8.2,.4,3.15,a);for(const p of[-3.25,3.25])for(const d of[26.15,28.15])r(p,1.05,d,.24,1.45,.24,i);r(0,3.62,26.58,4.6,3.35,.2,i),r(0,3.62,26.43,4.12,2.88,.08,a);for(let p=0;p<7;p++){const d=-1.5+p*.5,c=r(d,3.62,26.34,.075,2.35,.06,p%2===0?o:s);c.userData.isLandscapeStage=!0}for(let p=0;p<5;p++)r(0,2.68+p*.47,26.32,3.05,.065,.055,p%2===0?s:o);for(const p of[-3.15,3.15]){m(p,2.25,26.55,.3,.85,i,10);const d=e(new ze(.34,.1,7,16),o,p,2.75,26.55);d.userData.isLandscapeStage=!0}_([[-3.3,2.45,28.1],[-1.8,2.82,27.1],[0,2.55,26.2],[1.8,2.82,27.1],[3.3,2.45,28.1]],s,.06);break}case"living-heritage":{for(const[p,d]of[29.2,27,24.8].entries()){const c=7.8-p*.75;h(c,5.5-p*.3,p===1?o:i,d);for(let l=0;l<5;l++){const g=e(new je(.2+l%2*.06,0),l%2===0?s:o,-1.6+l*.8,2.5+l%2*.7,d-.36);g.userData.isLandscapeStage=!0}}_([[-3.2,4.65,29.2],[-1.5,5.1,27],[0,4.45,24.8],[1.5,5.1,27],[3.2,4.65,29.2]],o,.08),_([[-3.2,2.1,29.2],[-1.5,2.25,27],[0,2.12,24.8],[1.5,2.25,27],[3.2,2.1,29.2]],s,.065),f(5.1,1.12,.1);break}case"lunar-probe":{const p=e(new ie(4.8,18,12,0,Math.PI*2,0,Math.PI/2),i,0,.3,33.5);p.userData.isLandscapeStage=!0;for(const[x,R,T]of[[-3.2,32.2,.72],[-1.6,34,.52],[2.8,32.5,.84],[3.6,34.1,.44]]){const w=e(new ze(T,.13,6,18),a,x,.62,R);w.rotation.x=Math.PI/2,w.userData.isLandscapeStage=!0}const d=e(new ee(2.25,.86,1.58),i,-1.8,2.02,24.5);d.userData.isLandscapeStage=!0,r(-1.8,2.47,24.5,2.04,.16,1.4,o);const c=new q({color:2707312,emissive:1058877,emissiveIntensity:.24,roughness:.58,metalness:.3});for(const x of[-3.72,.12]){r(x,2.56,24.5,1.42,.14,1.62,c);for(let R=0;R<4;R++)r(x,2.65,23.92+R*.38,1.3,.035,.035,o);_([[x<-1.8?-2.86:-.74,2.4,24.5],[x,2.45,24.5]],o,.055)}for(const x of[-3,-1.8,-.6])for(const R of[23.58,25.42]){const T=e(new he(.4,.4,.24,12),a,x,1.62,R);T.rotation.z=Math.PI/2,T.userData.isLandscapeStage=!0}m(-1.8,3.32,24.5,.08,1.72,a,8),r(-1.8,4.2,24.5,.82,.42,.52,i);const l=e(new ie(.13,10,8),o,-1.8,4.2,24.2);l.userData.isLandscapeBeacon=!0;const g=e(new je(.58,0),s,-1.8,4.92,24.5);g.userData.isLandscapeBeacon=!0;const E=e(new ie(.19,10,8),o,-1.8,5.72,24.5);E.userData.isLandscapeBeacon=!0,_([[-4.5,.82,24.2],[-3.5,.85,23.8],[-1.8,.85,24.5],[.1,.82,25.4]],o,.09);break}case"test-console":{r(0,2.45,27,7.8,.56,2.6,a),r(0,3.25,26.55,7.2,1.1,.28,i,-.16);for(let p=0;p<7;p++){const d=-2.8+p*.92,c=e(new ie(.22+p%2*.07,10,8),p%3===0?o:s,d,3.42,26.28);c.userData.isLandscapeBeacon=!0}for(const p of[-2.3,0,2.3])r(p,4.75,27,1.35,1.45,.65,i);_([[-3.3,1.25,29],[-1.7,1.3,27.9],[0,1.28,27],[1.7,1.3,27.9],[3.3,1.25,29]],o,.1);break}case"orbit-adjustment":{const p=e(new ie(2.1,16,12),i,0,3.1,27);p.userData.isLandscapeStage=!0;for(const[d,c]of[[.2,0],[.72,.55],[-.5,-.72]]){const l=f(4.4,3.2,d);l.rotation.y=c}for(const[d,c,l]of[[3.6,4.9,27],[-1.8,5.8,27.5],[-2.2,2.2,26.7]]){const g=e(new je(.44,0),o,d,c,l);g.userData.isLandscapeBeacon=!0}_([[3.6,4.9,27],[1.9,5.3,27],[0,5.4,27],[-1.8,5.8,27.5]],s,.07);break}case"training":{h(9,6.2,o,30.2),r(0,4.45,30,5.8,2.7,.22,a),r(0,4.45,29.82,5.35,2.3,.08,i);for(let x=0;x<3;x++){const R=5.2-x*.62;for(const T of[-1.55,0,1.55]){const w=e(new je(.13,0),x===1?s:o,T,R,29.72);w.userData.isLandscapeStage=!0}r(0,R-.2,29.72,3.8,.035,.03,a)}r(0,1.28,26.5,3.25,.28,1.55,a);for(const x of[-1.05,1.05]){const R=e(new he(.42,.42,.18,12),o,x,1.18,26.5);R.rotation.z=Math.PI/2,R.userData.isLandscapeStage=!0,r(x,2.28,26.45,.16,1.78,.16,i)}const p=new q({color:14213348,roughness:.76,metalness:.04}),d=new q({color:3300220,roughness:.22,metalness:.34,emissive:1520715,emissiveIntensity:.18}),c=r(0,2.78,25.6,.78,1.18,.55,p),l=e(new ie(.4,12,9),p,0,3.62,25.6),g=e(new ie(.28,10,8),d,0,3.64,25.31);g.scale.set(1,.72,.45);for(const x of[-1,1]){const R=r(x*.55,2.72,25.56,.22,.82,.25,p);R.rotation.z=x*-.18,r(x*.22,1.96,25.45,.22,.72,.26,p);const T=e(new ze(.17,.055,7,14),o,x*.9,2,26);T.rotation.x=Math.PI/2,T.userData.isLandscapeStage=!0}for(const x of[c,l,g])x.userData.isLandscapeStage=!0;_([[-.8,3.7,25.7],[-.55,4.55,26.1],[0,5.25,26.4],[.65,5.75,27]],s,.07);const E=e(new ie(.3,10,8),o,0,5.7,27);E.userData.isLandscapeBeacon=!0,f(3.2,1.08,.1);break}case"science-exhibit":{for(const[p,d,c]of[[-3.5,3.5,.65],[0,5.1,.88],[3.5,3.5,.65]]){const l=e(new ie(c,12,10),p===0?o:s,p,d,27);l.userData.isLandscapeBeacon=!0}for(const p of[-2.5,0,2.5]){const d=m(p,2.2,27,.13,2.7,a,8);d.rotation.z=p*.04}f(4.5,5.4,.44),f(2.7,3.6,-.7);break}case"relay-bridge":{h(10.2,6.2,a,29.7);const p=e(new ie(1.15,14,10),o,-4.2,3.7,27.7);p.userData.isLandscapeBeacon=!0;const d=e(new ie(1.75,16,12),i,4.2,2.7,28.1);d.userData.isLandscapeStage=!0;for(const[l,g,E]of[[3.35,28.1,.38],[4.8,28.1,.52],[5.05,27.75,.24]]){const x=e(new ze(E,.09,6,16),a,l,2.72,g);x.rotation.x=Math.PI/2,x.userData.isLandscapeStage=!0}r(0,4.65,27,.92,.68,.7,s);for(const l of[-1.45,1.45]){r(l,4.68,27,1.52,.12,.82,o);for(let g=0;g<3;g++)r(l,4.69,26.72+g*.27,1.38,.035,.035,a)}const c=e(new ie(.22,10,8),s,0,5.75,27);c.userData.isLandscapeBeacon=!0,_([[-3.05,4.15,27.5],[-1.5,5.4,27],[0,5.72,27],[1.5,4.3,27.3],[3.2,3.2,27.8]],s,.09),f(3.1,5.2,.36);break}case"sample-lab":{r(0,2.05,27,8.4,.38,3.2,a);for(const d of[-3.4,3.4])for(const c of[25.9,28.1])r(d,1.14,c,.22,1.62,.22,o);r(0,4.7,30,6.8,2.9,.22,i);for(const d of[-2.3,0,2.3]){const c=e(new ee(1.55,1.22,1.06),s,d,3,26.55);c.material=new q({color:10205388,transparent:!0,opacity:.2,roughness:.28,metalness:.08}),c.userData.isLandscapeStage=!0;const l=e(new dn(.42,0),d===0?o:i,d,2.68,26.42);l.scale.set(1,.72,.82),l.userData.isLandscapeStage=!0,m(d,2.35,26.42,.52,.1,a,12)}for(let d=0;d<3;d++)r(0,5.35-d*.6,29.86,3.4,.06,.035,d===1?s:o);const p=m(3.05,3.35,26.55,.16,1.75,o,10);p.rotation.z=.28,r(3.25,4.05,26.55,.85,.14,.14,s,-.28),_([[-3.4,3.1,28.4],[-1.6,3.7,27.7],[0,3.45,27.2],[1.8,3.1,28.4],[3.05,3.7,27.7]],o,.055);break}case"moon-horizon":{const p=e(new ie(6.3,20,12,0,Math.PI*2,0,Math.PI/2),i,0,.55,34.5);p.userData.isLandscapeStage=!0;for(const[c,l,g]of[[-4.3,32.2,.72],[-1.8,34.4,.5],[2.1,33.1,.86],[4.2,35,.48]]){const E=e(new ze(g,.11,6,18),a,c,.8,l);E.rotation.x=Math.PI/2,E.userData.isLandscapeStage=!0}r(0,1.55,25.6,8.8,.34,2.7,a);for(const c of[-3.6,3.6])r(c,2.45,25.7,.24,1.62,.24,o);r(0,3.35,25.7,7.4,.22,.35,s);const d=e(new je(.46,0),o,0,4.15,25.7);d.userData.isLandscapeBeacon=!0,_([[-4.1,1.02,28.7],[-2.1,1.06,27.3],[0,1.1,26.6],[2.1,1.06,27.3],[4.1,1.02,28.7]],s,.085);break}case"systems-simulation":{for(const d of[-3.6,0,3.6]){r(d,3.35,27.8,2.35,2.25,.3,a),r(d,3.55,27.58,1.95,1.48,.08,i);for(let c=0;c<3;c++)_([[d-.78,3.05+c*.26,27.48],[d-.18,3.24+c*.26,27.48],[d+.28,3.12+c*.26,27.48],[d+.78,3.36+c*.26,27.48]],c===1?s:o,.035);m(d,1.82,27.8,.1,1.24,o,8)}r(0,1.3,27.7,8.6,.22,2.25,a);const p=e(new An(.56,1),s,0,5.25,27.48);p.userData.isLandscapeBeacon=!0,_([[-2.3,4.8,27.45],[0,5.2,27.45],[2.3,4.8,27.45]],o,.07);break}case"mission-control":{h(10.8,6.8,o,30.2),r(0,5,30,7.1,3,.24,a);for(let d=0;d<5;d++){const c=-2.4+d*1.2,l=r(c,5,29.82,.88,1.65,.08,d===2?s:i);for(let g=0;g<4;g++)r(c,4.5+g*.27,29.74,.58,.035,.025,g===2?s:o);l.userData.isLandscapeStage=!0}for(const d of[-3.2,0,3.2]){r(d,2.2,26.7,2.15,.35,1.35,o),r(d,2.65,26.3,1.75,.65,.18,i,-.18);for(const c of[-.72,.72])r(d+c,1.65,26.72,.12,1.1,.12,a)}_([[-4.2,3.1,27.2],[-2.1,3.75,27],[0,4.15,27],[2.1,3.75,27],[4.2,3.1,27.2]],s,.065);const p=e(new je(.38,1),s,0,6.95,29.7);p.userData.isLandscapeBeacon=!0;break}case"crew-simulation":{h(8.6,6.1,o,29.5);for(const l of[-3.1,3.1]){const g=e(new ie(1.2,12,10),a,l,3.2,27.6);g.scale.set(.9,1.1,.62),g.userData.isLandscapeStage=!0,r(l,3.2,26.96,1.7,.1,.1,s)}const p=new q({color:14279397,roughness:.78,metalness:.04}),d=new q({color:3627640,roughness:.24,metalness:.32,emissive:1586250,emissiveIntensity:.16});for(const[l,g,E]of[[-1.8,25.9,-.22],[1.8,25.9,.22]]){const x=r(l,2.55,g,.72,.98,.48,p,E),R=e(new ie(.42,12,9),p,l,3.48,g),T=e(new ie(.28,10,8),d,l,3.49,g-.22);T.scale.set(1,.72,.48);for(const S of[-1,1])r(l+S*.5,2.48,g-.04,.2,.76,.24,p,E);const w=e(new je(.16,0),o,l,2.75,g-.27);for(const S of[x,R,T,w])S.userData.isLandscapeStage=!0}_([[-2.8,2.1,27.2],[-1.2,2.55,26.7],[0,2.7,26.1],[1.2,2.55,26.7],[2.8,2.1,27.2]],s,.065);const c=e(new ie(.28,10,8),o,0,5.15,27.15);c.userData.isLandscapeBeacon=!0;break}case"future-frontier":{const p=e(new ie(2.55,16,10,0,Math.PI*2,0,Math.PI/2),s,0,1.42,28);p.userData.isLandscapeStage=!0,r(0,1.45,28,5.15,.18,.3,a);for(const c of[-4.2,4.2]){const l=r(c,2.05,27.3,2.35,.12,1.25,o,c<0?-.12:.12);l.userData.isLandscapeStage=!0;for(let g=0;g<3;g++)r(c,2.14,26.86+g*.42,2.12,.03,.03,a);for(const g of[-.92,.92])r(c+g,1.35,27.3,.12,1.35,.12,a)}for(const c of[0,Math.PI/3,Math.PI*2/3,Math.PI,Math.PI*4/3,Math.PI*5/3]){const l=Math.cos(c)*3.2,g=28+Math.sin(c)*2.6,E=e(new ie(.16,8,6),o,l,1.25,g);E.userData.isLandscapeBeacon=!0,_([[l,1.05,g],[l*.55,1.12,28+(g-28)*.55],[0,1.12,28]],s,.045)}const d=e(new je(.48,1),o,0,5.1,28);d.userData.isLandscapeBeacon=!0,f(5.2,1.2,.1);break}case"exchange":{for(const p of[-3.8,3.8]){r(p,3.7,27,.35,5.8,.48,o);for(let d=0;d<3;d++)r(p*.85,2.15+d*1.45,27,1.4,.12,.62,i)}for(let p=0;p<8;p++)v(-3.1+p%4*2.05,2.65+Math.floor(p/4)*1.45,26.55,p,.34);_([[-4.1,1.35,29],[-2.1,1.6,27.5],[0,1.45,26],[2.1,1.6,27.5],[4.1,1.35,29]],o,.12);break}case"resilience":{h(8.6,5.8,i,27);for(let p=0;p<4;p++){const d=-3+p*2;r(d,2.25,26.1,1.28,1.1,.94,p%2?o:s);const c=e(new ie(.27,10,8),s,d,3.05,25.72);c.userData.isLandscapeBeacon=!0}_([[-4.5,1.25,29],[-2.2,1.45,27.4],[0,1.45,26],[2.2,1.45,27.4],[4.5,1.25,29]],o,.14);break}case"exchange-wall":{r(0,4,27,9.2,5.8,.56,a),r(0,4,26.65,8.5,5.15,.12,i);for(const p of[2.2,3.4,4.6,5.8])r(0,p,26.35,8.1,.14,.44,o);for(let p=0;p<3;p++)for(let d=0;d<7;d++)v(-3.3+d*1.1,2.68+p*1.2,26.05,p*7+d,.37);_([[-4.4,1.2,29],[0,1.38,28.2],[4.4,1.2,29]],s,.1);break}case"resource-cycle":{for(let d=0;d<3;d++){const c=d/3*Math.PI*2-Math.PI/2,l=Math.cos(c)*3.4,g=27+Math.sin(c)*2.2;m(l,1.55,g,1.05,.5,i,8),v(l,2.2,g-.35,d,.7)}_([[-3.4,2.6,27],[0,3,24.7],[3.4,2.6,27],[0,2.3,29.2],[-3.4,2.6,27]],o,.11);const p=e(new ie(.52,12,10),s,0,3.8,27);p.userData.isLandscapeBeacon=!0;break}case"library":{r(0,3.55,27,8.8,4.8,2.3,i);for(const p of[-3.1,0,3.1]){r(p,3.8,25.78,1.8,3.1,.14,a);for(let d=0;d<3;d++){r(p,2.65+d*.92,25.62,1.56,.12,.18,o);for(let c=0;c<3;c++)v(p-.48+c*.48,3.1+d*.92,25.42,d*3+c,.24)}}r(0,3.1,25.68,1.12,2.6,.18,s),h(9.3,6.3,o,28.1);break}case"digital-lending":{r(0,4.1,27,4.3,6,.62,a),r(0,4.1,26.62,3.72,5.4,.12,s);for(const[p,d]of[[-.62,5.6],[.52,4.25],[-.45,2.9]])r(p,d,26.43,1.68,.28,.08,o);for(const p of[-4.2,4.2]){const d=r(p,3.5,27,1.7,4.6,1.2,i);d.userData.isLandscapeStage=!0;for(let c=0;c<3;c++)r(p,2.15+c*1.25,26.35,1.5,.1,.2,o)}_([[-4,2.2,26.1],[-2.2,2.8,26.1],[0,3.2,26.1],[2.2,2.8,26.1],[4,2.2,26.1]],s,.08);break}case"budget-board":{r(0,4.15,28.7,8.8,5.2,.42,a),r(0,4.15,28.46,8.2,4.62,.08,i);for(const p of[-2.7,0,2.7])r(p,4.05,28.38,.08,3.55,.06,o);for(const p of[2.45,3.65,4.85,6.05])r(0,p,28.38,7.8,.07,.06,o);for(const[p,d]of[1.05,1.7,2.5].entries()){const c=r(-1.8+p*1.8,2.55+d/2,28.18,.92,d,.18,p===2?s:o);c.userData.isLandscapeStage=!0}for(let p=0;p<5;p++)m(3.38,1.48+p*.24,27,.48,.13,p%2?o:s,12);_([[-4.5,1.28,29.2],[-2.2,1.35,27.8],[0,1.4,26.3],[2.1,1.48,25.6],[4.4,1.55,26.4]],o,.1),f(5.1,1.08,.1);break}case"trust-ledger":{m(0,1.18,27,6.1,.34,a,12),r(0,1.92,27,7.4,.28,3.5,i),r(-1.75,2.13,26.72,2.5,.12,2.45,s,-.08),r(1.1,2.13,26.72,2.5,.12,2.45,o,.08);for(const p of[-2.45,-1.72,-.98,.38,1.1,1.82])r(p,2.24,26.35,.08,.04,1.72,a);for(const p of[25.85,26.42,27.02])r(-1.73,2.24,p,2.24,.04,.06,a);for(const p of[-4,4]){const d=e(new je(.62,0),p<0?o:s,p,3.45,27);d.userData.isLandscapeBeacon=!0}_([[-4,2.9,27],[-2,2.55,27],[0,2.42,27],[2,2.55,27],[4,2.9,27]],o,.08),f(5.15,1.16,.1);break}case"sustainable-market":{for(const[p,d]of[-3.55,0,3.55].entries()){r(d,2.28,27,2.75,.22,2.2,p===1?o:i);for(const l of[-.98,.98])r(d+l,1.55,27,.16,1.35,.16,a);const c=r(d,4.05,27,3.05,.24,2.5,p===1?s:o,p===1?.03:-.03);c.userData.isLandscapeStage=!0;for(let l=0;l<3;l++){const g=r(d-.78+l*.78,2.76,26.2,.56,.72,.54,l%2?s:a);g.userData.isLandscapeStage=!0}}for(const p of[-1.75,1.75]){const d=e(new he(.24,.32,.9,8),p<0?o:a,p,1.82,24.9);d.userData.isLandscapeStage=!0,e(new ie(.24,10,8),i,p,2.47,24.9)}_([[-5.1,1.2,29.2],[-3,1.28,27.7],[0,1.35,26],[3,1.28,27.7],[5.1,1.2,29.2]],s,.08),f(5.35,1.08,.1);break}case"knowledge-bridge":{for(const d of[-4.15,4.15]){r(d,3.4,27,1.55,4.3,1.55,i);for(let c=0;c<3;c++){r(d,2.15+c*1.12,26.12,1.28,.12,.18,o);for(let l=0;l<3;l++)v(d-.42+l*.42,2.53+c*1.12,25.96,c*3+l,.22)}}h(10.4,5.35,o,28.8);const p=r(0,2.28,27,7.1,.36,2.35,a);p.userData.isLandscapeRoute=!0;for(const d of[-2.3,0,2.3]){const c=r(d,2.5,27,1.18,.14,1.45,d===0?s:o);c.userData.isLandscapeStage=!0}_([[-4.2,2.58,27],[-2.2,2.68,27],[0,2.72,27],[2.2,2.68,27],[4.2,2.58,27]],s,.08),f(5.3,1.12,.1);break}default:u()}}function O0(t,n,e,i){if(!n||!e||n==="hub"||n==="section-a"||n==="section-b"||n==="stories-of-china"||n==="learning-lab"||n==="unit-project")return;const a=document.createElement("canvas");a.width=1024,a.height=256;const s=a.getContext("2d");if(!s)return;s.fillStyle="rgba(7, 14, 27, 0.88)",s.fillRect(20,24,984,208),s.strokeStyle=`#${i.toString(16).padStart(6,"0")}`,s.lineWidth=8,s.strokeRect(24,28,976,200),s.textAlign="center",s.textBaseline="middle",s.font="bold 52px 'Microsoft YaHei', sans-serif",s.fillStyle="#f8fbff",s.fillText(e.slice(0,26),512,126,920);const o=new Yt(a);o.colorSpace=Ct;const u=new Pn(new Ln({map:o,transparent:!0,depthWrite:!1,toneMapped:!1}));u.position.set(0,11,14),u.scale.set(19,4.75,1),u.renderOrder=8,t.add(u)}function B0(t,n,e,i,a){const s=new U(new he(13,14.5,.65,8),n);s.position.y=.34,t.add(s);const o=new U(new ze(11.8,.11,8,48),a);o.rotation.x=Math.PI/2,o.position.y=.72,o.userData.isLandscapeRing=!0,t.add(o);const u=new U(new he(7.2,7.6,.16,8),e);u.position.y=.76,t.add(u);const f=new U(new ze(6.8,.07,8,40),i);f.rotation.x=Math.PI/2,f.position.y=.9,f.userData.isLandscapeRing=!0,t.add(f);const r=new U(new ee(.72,8.5,.72),a);r.position.set(-5.2,4.8,8.5);const m=r.clone();m.position.x=5.2;const _=new U(new ee(11.1,.72,.72),a);_.position.set(0,8.7,8.5),t.add(r,m,_);const h=new U(new ze(2.75,.1,8,40),i);h.position.set(0,4.65,8.5),t.add(h);for(const[v,p]of[[-7,-7],[7,-7],[-7,7],[7,7]]){const d=new U(new he(.28,.42,4.8,8),e);d.position.set(v,2.6,p),t.add(d);const c=new U(new ie(.43,10,8),i);c.position.set(v,5.05,p),c.userData.isLandscapeBeacon=!0,t.add(c)}}function G0(t,n,e,i,a,s){if(!n||n==="hub")return;const o=new U(new he(7.8,8.8,.4,8),i);switch(o.position.set(0,.86,27),t.add(o),n){case"section-a":{const u=new U(new ee(8.4,.42,5.6),e);u.position.set(-2.2,3.5,27),u.rotation.y=-.18;const f=new U(new ee(5.8,.16,4.4),a);f.position.set(2.2,3.8,27),f.rotation.y=.18;const r=new U(new ee(.32,2.1,5.8),s);r.position.set(0,2.25,27),t.add(u,f,r),ii(f);break}case"section-b":{for(const r of[-3.8,3.8]){const m=new U(new he(.72,1.05,8.2,8),e);m.position.set(r,4.9,27),t.add(m)}const u=new U(new ze(4.1,.2,8,40,Math.PI),s);u.position.set(0,8.2,27),u.rotation.z=Math.PI,t.add(u);const f=new U(new ie(1.25,16,12),a);f.position.set(0,4.9,27),t.add(f),ii(f);break}case"stories-of-china":{for(const[r,m,_]of[[5.8,2,8],[4.4,4.2,6],[3,6.2,5]]){const h=new U(new he(r,r+.55,.7,_),e);h.position.set(0,m,27),t.add(h)}const u=new U(new je(1.7,1),a);u.position.set(0,9,27),t.add(u);const f=new U(new ze(2.5,.13,8,32),s);f.rotation.x=Math.PI/2,f.position.set(0,9,27),t.add(f),ii(u),us(f);break}case"learning-lab":{const u=new U(new he(2.4,2.8,6.5,12),a);u.position.set(0,4.3,27),t.add(u);for(const f of[.35,-.35]){const r=new U(new ze(4.9,.16,8,48),s);r.position.set(0,4.3,27),r.rotation.set(f,.4,f*1.4),t.add(r),us(r)}ii(u);break}case"unit-project":{const u=new U(new je(2.8,1),a);u.position.set(0,7.4,27),t.add(u);for(const[r,m]of[[-5.3,24],[5.3,24],[-5.3,30],[5.3,30]]){const _=new U(new he(.5,.78,6.8,8),s);_.position.set(r,3.9,m),t.add(_)}const f=new U(new ze(4.5,.18,8,48),s);f.rotation.x=Math.PI/2,f.position.set(0,1.2,27),t.add(f),ii(u),us(f);break}}}function ii(t){t.userData.isLandscapeBeacon=!0}function us(t){t.userData.isLandscapeRing=!0}function H0(t,n,e,i){const a=[{x:-21,z:-20,color:3718648},{x:21,z:-20,color:16498468},{x:-21,z:20,color:4906624},{x:21,z:20,color:16020150}];for(const s of a){const o=new U(new he(3.3,3.7,.32,6),n);o.position.set(s.x,.7,s.z),t.add(o);const u=e.clone();u.color.setHex(s.color),u.emissive.setHex(s.color),u.emissiveIntensity=1.3;const f=new U(new An(.95,1),u);f.position.set(s.x,2.2,s.z),f.userData.isLandscapeBeacon=!0,t.add(f);const r=new U(new ze(1.55,.08,6,24),i.clone());r.material.color.setHex(s.color),r.material.emissive.setHex(s.color),r.rotation.x=Math.PI/2,r.position.set(s.x,1.25,s.z),r.userData.isLandscapeRing=!0,t.add(r)}}function k0(t,n,e,i,a){if(a){const u=new q({color:3360862,emissive:1058873,emissiveIntensity:.14,roughness:.78,metalness:.18}),f=new q({color:5735318,emissive:2646388,emissiveIntensity:.18,roughness:.62,metalness:.12});for(const v of[-1,1]){const p=new U(new he(.3,.46,2.8,7),u);p.position.set(v*13.2,1.4,34),t.add(p);for(const d of[.7,1.35,2]){const c=new U(new ee(.56,.07,.09),f);c.position.set(v*13.2,d,33.56),c.userData.isLandscapeRoute=!0,t.add(c)}}const r=new q({color:3891573,emissive:2649216,emissiveIntensity:.28,roughness:.52,metalness:.2}),m=new _n([new j(-9,5.5,42),new j(-6,8,42),new j(0,9.2,42),new j(6,8,42),new j(9,5.5,42)]),_=new U(new gn(m,40,.07,6,!1),r);_.userData.isLandscapeRoute=!0,t.add(_);const h=new q({color:10410461,emissive:5610924,emissiveIntensity:.34,roughness:.4,metalness:.18});for(const v of[-9,9]){const p=new U(new ie(.46,12,8),h);p.position.set(v,5.5,42),p.userData.isLandscapeBeacon=!0,t.add(p)}return}const s=[[-28,35,13],[0,43,18],[28,35,11]];for(const[u,f,r]of s){const m=new U(new he(2.4,3.3,r,6),n);m.position.set(u,r/2,f),t.add(m);const _=new U(new ie(2.2,12,8),e);_.position.set(u,r+1.1,f),_.userData.isLandscapeBeacon=!0,t.add(_);const h=new U(new ze(3.6,.08,6,32),i);h.rotation.x=Math.PI/2,h.position.set(u,r*.64,f),h.userData.isLandscapeRing=!0,t.add(h)}const o=new U(new ee(54,.18,.34),n);o.position.set(0,6.5,35),t.add(o)}function V0(t,n,e,i,a){const s=new q({color:2379102,emissive:1059895,emissiveIntensity:.22,roughness:.48,metalness:.22}),o=new q({color:7755840,roughness:.86,metalness:.04}),u=new q({color:15261639,roughness:.88,side:ct}),f=(x,R,T,w,S)=>{const A=new U(x,R);return A.position.set(T,w,S),t.add(A),A},r=f(new ee(78,.22,42),s,0,.46,39);r.userData.isLandscapeStage=!0;const m=f(new ee(66,.62,5.2),n,0,.92,29.4);m.userData.isLandscapeRoute=!0;for(const x of[-26,0,26]){const R=f(new ee(8.5,.46,14),o,x,.82,36.2);R.userData.isLandscapeRoute=!0;for(const T of[-1,1]){const w=f(new he(.2,.26,2.2,7),e,x+T*3.45,.45,37.8);w.userData.isLandscapeStage=!0;const S=f(new ze(.28,.06,6,16),a,x+T*3.45,1.62,37.8);S.rotation.x=Math.PI/2,S.userData.isLandscapeRing=!0}}const _=new U(new gn(new _n([new j(0,1.3,27),new j(0,1.45,33),new j(-2,1.5,40),new j(0,1.6,45),new j(0,1.8,50)]),32,.16,8,!1),i);_.userData.isLandscapeRoute=!0,t.add(_);for(const[x,R]of[-18,-6,6,18].entries()){const T=f(new he(1.25,1.58,.55,8),e,R,1.2,40.2);T.userData.isLandscapeStage=!0;const w=f(new ee(1.12,1.72+x%2*.45,.2),x%2?a:n,R,2.24,40.2);w.userData.isLandscapeStage=!0;const S=f(new je(.36+x%2*.08,0),i,R,3.35+x%2*.45,40.02);S.userData.isLandscapeBeacon=!0}for(const[x,R]of[-23,23].entries()){const T=x===0?37.2:42.1,w=new cn;w.moveTo(-5.3,.48),w.lineTo(5.3,.48),w.lineTo(3.9,-.72),w.lineTo(-3.8,-.72),w.closePath();const S=f(new li(w,{depth:2.35,bevelEnabled:!0,bevelSegments:1,steps:1,bevelSize:.08,bevelThickness:.06}),o,R-5.25,1.55,T-1.18);S.userData.isLandscapeStage=!0;const A=f(new he(.08,.12,4.7,7),e,R,3.55,T);A.userData.isLandscapeStage=!0;const C=new cn;C.moveTo(-.1,-1.2),C.lineTo(-.1,2.35),C.lineTo(-2.55,-.78),C.closePath();const L=f(new gi(C),x===0?u:i,R-.08,2.9,T-1.3);L.userData.isLandscapeStage=!0;const P=new cn;P.moveTo(.12,-.85),P.lineTo(.12,1.62),P.lineTo(1.88,-.55),P.closePath();const F=f(new gi(P),x===0?a:u,R+.12,2.55,T-1.34);F.userData.isLandscapeStage=!0;const k=f(new ie(.48,10,8),a,R,5.95,T);k.userData.isLandscapeBeacon=!0}const h=f(new ee(17.5,9.6,1.2),e,0,4.45,51.2);h.userData.isLandscapeStage=!0;for(const x of[-8.5,8.5]){const R=f(new he(.72,1.02,9,8),n,x,4.25,50.4);R.userData.isLandscapeStage=!0}const v=f(new ee(16.3,.42,.18),a,0,8.32,50.45);v.userData.isLandscapeStage=!0;for(const x of[-5.2,0,5.2]){const R=f(new ee(4.35,4.45,.18),n,x,4.75,50.42);R.userData.isLandscapeStage=!0;for(const T of[3.6,4.35,5.1,5.85]){const w=f(new ee(2.8+(Math.round(T*10)+Math.round(x))%2*.55,.12,.09),i,x,T,50.28);w.userData.isLandscapeRoute=!0}}const p=document.createElement("canvas");p.width=1024,p.height=192;const d=p.getContext("2d");if(d){d.fillStyle="#182b3b",d.fillRect(0,0,p.width,p.height),d.strokeStyle="#d7b67a",d.lineWidth=8,d.strokeRect(12,12,p.width-24,p.height-24),d.fillStyle="#f4e6c6",d.textAlign="center",d.textBaseline="middle",d.font="bold 66px Arial, sans-serif",d.fillText("THE HARBOR OF LIVES",512,72),d.font="bold 30px Arial, sans-serif",d.fillText("CHOICE  ·  SERVICE  ·  LEGACY",512,145);const x=new Yt(p);x.colorSpace=Ct;const R=new U(new Vt(14.8,2.78),new xt({map:x,side:ct,toneMapped:!1}));R.position.set(0,7.7,50.12),R.rotation.y=Math.PI,t.add(R)}const c=f(new he(1.28,1.8,8.6,8),n,0,3.65,58.2);c.userData.isLandscapeStage=!0;const l=f(new he(1.55,1.55,1.1,8),a,0,8.45,58.2);l.userData.isLandscapeStage=!0;const g=f(new je(.94,1),i,0,9.35,58.2);g.userData.isLandscapeBeacon=!0;const E=f(new ze(1.48,.1,7,28),a,0,9.35,58.2);E.userData.isLandscapeRing=!0;for(const[x,R]of[[-31,31],[-15,46],[15,46],[31,31]]){const T=new U(new ze(2.8,.08,6,28),s);T.rotation.x=Math.PI/2,T.position.set(x,.66,R),T.userData.isLandscapeRing=!0,t.add(T)}}function z0(t,n){const e=new xt({color:10457207,side:ct}),i=new xt({color:11704947,side:ct}),a=new q({color:11900524,roughness:.96,metalness:0}),s=new q({color:6705466,roughness:1,metalness:0}),o=new q({color:7897434,roughness:.96,metalness:0}),u=(r,m,_)=>{const h=new cn;h.moveTo(-82,0),h.lineTo(-82,8*_),h.quadraticCurveTo(-64,17*_,-48,10*_),h.quadraticCurveTo(-28,3*_,-10,12*_),h.quadraticCurveTo(10,21*_,29,11*_),h.quadraticCurveTo(49,3*_,64,12*_),h.quadraticCurveTo(74,16*_,82,8*_),h.lineTo(82,0),h.closePath();const v=new U(new gi(h,20),m);v.position.set(0,.35,r),v.userData.noLandscapeShadow=!0,t.add(v)};u(76,e,1),u(65,i,.64);for(const[r,m,_,h,v]of[[-1.6,39,5.6,13,.08],[-4.3,51,7.5,15,.2],[-7.1,64,9.4,16,.28]]){const p=new U(new ee(_,.08,h),a);p.position.set(r,.49,m),p.rotation.y=v,p.userData.isLandscapeRoute=!0,t.add(p)}for(const[r,m,_]of[[-19,46,1],[19,54,.84],[-28,61,.72]]){const h=new U(new he(.2,.32,3.6*_,7),s);h.position.set(r,2.3*_,m),t.add(h);const v=new U(new ie(1,8,5),o);v.position.set(r,4.1*_,m),v.scale.set(2.6*_,.62*_,1.7*_),v.userData.isLandscapeStage=!0,t.add(v)}const f=new U(new je(.42,0),n);f.position.set(-7.1,1.1,64),f.userData.isLandscapeBeacon=!0,t.add(f)}function W0(t,n,e,i,a=!1){if(a)return;const s=new U(new he(2.5,4.2,18,8),n);s.position.set(0,9,38),t.add(s);for(const[o,u,f,r]of[[-7,16,38,7],[7,18,38,8],[0,24,38,9]]){const m=new U(new An(r,1),e);m.position.set(o,u,f),m.userData.isLandscapeBeacon=!0,t.add(m)}for(const o of[-31,31]){const u=new U(new ze(4,.16,8,32),i);u.rotation.x=Math.PI/2,u.position.set(o,.9,36),u.userData.isLandscapeRing=!0,t.add(u)}}function X0(t,n,e,i,a,s=!1){if(s){const r=new U(new ee(18,.36,8),n);r.position.set(0,.85,39),t.add(r);for(const v of[-6.2,6.2]){const p=new U(new ee(.48,5.8,.5),e);p.position.set(v,3.9,39),t.add(p)}const m=new U(new ee(14,.48,6.4),a);m.position.set(0,6.9,39),t.add(m);const _=new U(new ee(5.8,.3,1.35),e);_.position.set(0,1.9,35.5),_.userData.isLandscapeStage=!0,t.add(_);for(const v of[-2.2,2.2]){const p=new U(new ee(.22,1.6,.22),a);p.position.set(v,1.05,35.5),t.add(p)}const h=new U(new ie(.48,10,8),i);h.position.set(0,5.7,38.6),h.userData.isLandscapeBeacon=!0,t.add(h);return}const o=new U(new ee(26,.7,15),n);o.position.set(0,1.1,39),t.add(o);for(const r of[-9,-3,3,9]){const m=new U(new he(1.1,1.5,13,8),e);m.position.set(r,7.5,40),t.add(m)}const u=new U(new It(12,5,4),i);u.position.set(0,17,40),u.rotation.y=Math.PI/4,u.userData.isLandscapeBeacon=!0,t.add(u);const f=new U(new ze(8,.18,8,48),a);f.rotation.x=Math.PI/2,f.position.set(0,15,40),f.userData.isLandscapeRing=!0,t.add(f)}function K0(t,n,e,i,a=!1){if(a){const r=new U(new he(5,5.8,.3,10),n);r.position.set(9,.65,40),t.add(r);const m=new U(new It(1.65,8,8),e);m.position.set(9,4.8,40),m.userData.isLandscapeBeacon=!0,t.add(m);const _=new U(new ze(3.7,.13,8,40),i);_.rotation.x=Math.PI/2.4,_.position.set(9,5,40),_.userData.isLandscapeRing=!0,t.add(_);return}const s=new U(new he(12,14,.55,8),n);s.position.set(0,1.1,40),t.add(s);const o=new U(new It(3.2,16,8),e);o.position.set(0,9.5,40),o.userData.isLandscapeBeacon=!0,t.add(o);const u=new U(new ze(8,.2,8,48),i);u.rotation.x=Math.PI/2.4,u.position.set(0,9,40),u.userData.isLandscapeRing=!0,t.add(u);const f=u.clone();f.rotation.x=-Math.PI/3,f.rotation.z=Math.PI/5,t.add(f)}function q0(t,n,e,i,a,s=!1,o){const u=new U(new ee(30,.55,18),n);if(u.position.set(0,1,38),t.add(u),!(s&&/^section_c-world-[1-4]$/.test(o??"")))for(const r of[-12,0,12]){const m=new U(new ee(8,.42,5.5),e);m.position.set(r,2,35),t.add(m);const _=new U(new It(5.7,2.8,4),i);_.position.set(r,5.1,35),_.rotation.y=Math.PI/4,_.userData.isLandscapeBeacon=!0,t.add(_)}if(!s){const r=new U(new ee(13,13,2.2),e);r.position.set(0,7.2,49),t.add(r);const m=new U(new ee(10.5,8.5,.22),i);m.position.set(0,7.4,47.8),m.userData.isLandscapeBeacon=!0,t.add(m);for(let _=-3;_<=3;_++){const h=new U(new ee(7.5,.08,.12),a);h.position.set(0,5+_*1.15,47.62),h.userData.isLandscapeRing=!0,t.add(h)}}}function Y0(t,n,e,i,a){const s=new U(new ee(20,1,14),n);s.position.set(0,1.2,38),t.add(s);const o=new U(new he(5.5,7,16,8),e);o.position.set(0,9.5,38),t.add(o);const u=new U(new It(8,5,8),i);u.position.set(0,20,38),u.userData.isLandscapeBeacon=!0,t.add(u);const f=new U(new ze(7,.18,8,40,Math.PI),a);f.rotation.z=Math.PI,f.position.set(0,11,30),f.userData.isLandscapeRing=!0,t.add(f)}const $0={high:{pixelRatio:2,grassRadius:40,grassCell:1.25,reflectors:3,reflectRes:512,reflectDist:300,shadowMap:2048,bloom:!0,bloomScale:1},med:{pixelRatio:1.5,grassRadius:34,grassCell:1.5,reflectors:2,reflectRes:384,reflectDist:220,shadowMap:1536,bloom:!0,bloomScale:.66},low:{pixelRatio:1,grassRadius:26,grassCell:1.9,reflectors:0,reflectRes:256,reflectDist:160,shadowMap:1024,bloom:!1,bloomScale:.5}};function j0(){var s;if(typeof window>"u")return"med";const t=((s=window.matchMedia)==null?void 0:s.call(window,"(pointer: coarse)").matches)??!1,n=Math.min(window.innerWidth,window.innerHeight)<540,e=navigator.hardwareConcurrency??4,i=navigator.deviceMemory??4,a=t||n;return a&&(e<=4||i<=3)?"low":a||e<=4||i<=4?"med":"high"}const Z0=5,Q0=new j(0,1,0),J0=new j(1,0,0);class nm{constructor(n,e){K(this,"container");K(this,"renderer");K(this,"resizeObserver");K(this,"scene");K(this,"camera");K(this,"raycaster",new tl);K(this,"pointer",new ut);K(this,"nodeGroups",new Map);K(this,"pickables",[]);K(this,"explorer");K(this,"pathGroup");K(this,"decorGroup");K(this,"waterGroup");K(this,"terrain");K(this,"terrainMaps");K(this,"groundDetailMap");K(this,"envRT");K(this,"mountains");K(this,"skyDome");K(this,"grassMesh");K(this,"grassUniforms");K(this,"grassCellSize",1.1);K(this,"grassRadius",54);K(this,"grassCellMap",new Map);K(this,"grassNeeded",new Set);K(this,"grassFreeSlots",[]);K(this,"grassLastX",Number.POSITIVE_INFINITY);K(this,"grassLastZ",Number.POSITIVE_INFINITY);K(this,"grassDummy",new mi);K(this,"grassColor",new ue);K(this,"clouds");K(this,"unitLandscape");K(this,"dustGroup");K(this,"dustPool",[]);K(this,"lastStep",0);K(this,"sunDisc");K(this,"composer");K(this,"bloomPass");K(this,"walkPhase",0);K(this,"avatarYaw",0);K(this,"avatarLean",0);K(this,"expression","neutral");K(this,"blinkTimer",2);K(this,"blink",0);K(this,"usingGlb",!1);K(this,"mixer");K(this,"glbIdle");K(this,"glbWalk");K(this,"glbClips");K(this,"glbEmoting",!1);K(this,"contactShadow");K(this,"_n",new j);K(this,"_fwd",new j);K(this,"_right",new j);K(this,"_basis",new At);K(this,"_q",new an);K(this,"_leanQ",new an);K(this,"sun");K(this,"hemi");K(this,"ambientLight");K(this,"animId",0);K(this,"paused",!0);K(this,"pausedBeforeVisibility",!0);K(this,"spectatorMode",!1);K(this,"clock",new ah);K(this,"_fpsTs",0);K(this,"_fpsFrames",0);K(this,"_fpsAdapted",!1);K(this,"nodes",[]);K(this,"currentId","");K(this,"onNodeClick");K(this,"onProximity");K(this,"onExploreUpdate");K(this,"onPickupNear");K(this,"onPickupCollect");K(this,"waterMeshes",[]);K(this,"reflectors",[]);K(this,"quality",j0());K(this,"qcfg",$0[this.quality]);K(this,"dynamicLightLimit",this.quality==="low"?5:this.quality==="med"?8:12);K(this,"dynamicLightBudgetFrames",30);K(this,"_lightPosition",new j);K(this,"sunDirV",new j);K(this,"spectatorFocus",new j);K(this,"hasSpectatorFocus",!1);K(this,"rebuildToken",0);K(this,"player",new b0);K(this,"explorerCam",new T0);K(this,"nearNode",null);K(this,"currentBiome",Ts);K(this,"activeUnitId");K(this,"activeWorldId");K(this,"activeWorldTitle");K(this,"pickupGroup");K(this,"pickupMeshes",new Map);K(this,"pickupData",[]);K(this,"nearPickup",null);K(this,"lastExploreUpdateAt",0);K(this,"waterFrame",0);K(this,"onVisibilityChange",()=>{if(document.hidden){this.pausedBeforeVisibility=this.paused,this.pause();return}this.pausedBeforeVisibility||this.resume()});K(this,"onKeyDown",n=>{this.paused||this.spectatorMode||(n.key.toLowerCase()==="e"||n.key==="Enter")&&this.tryInteract()});K(this,"onPointerDown",n=>{var s;if(this.paused||this.spectatorMode||n.button!==0)return;const e=this.renderer.domElement.getBoundingClientRect();this.pointer.x=(n.clientX-e.left)/e.width*2-1,this.pointer.y=-((n.clientY-e.top)/e.height)*2+1,this.raycaster.setFromCamera(this.pointer,this.camera);const i=this.raycaster.intersectObjects(this.pickables,!1)[0],a=i==null?void 0:i.object.userData.nodeId;if(a&&((s=this.nearNode)==null?void 0:s.id)===a&&this.nearNode.unlocked){this.onNodeClick(a);return}if(this.terrain){const o=this.raycaster.intersectObject(this.terrain,!1)[0];if(o&&(this.player.setMoveTarget(o.point.x,o.point.z),a)){const u=this.nodes.find(f=>f.id===a);u!=null&&u.unlocked&&this.player.setMoveTarget(u.x+3,u.z+3)}}});K(this,"onResize",()=>{var i;const n=this.container.clientWidth,e=this.container.clientHeight;!n||!e||(this.camera.aspect=n/e,this.camera.updateProjectionMatrix(),this.renderer.setSize(n,e),(i=this.composer)==null||i.setSize(n,e))});K(this,"animate",n=>{var o,u,f;if(this.paused){this.animId=0;return}this.animId=requestAnimationFrame(this.animate),this.clock.update(n);const e=Math.min(this.clock.getDelta(),.05),i=this.clock.getElapsed();if(!this._fpsAdapted){this._fpsFrames++;const r=performance.now();if(this._fpsTs===0&&(this._fpsTs=r),r-this._fpsTs>=3e3){if(this._fpsFrames/((r-this._fpsTs)/1e3)<40){const _=this.renderer.getPixelRatio(),h=Math.max(.75,_-.5);h<_?(this.renderer.setPixelRatio(h),(o=this.composer)==null||o.setPixelRatio(h),this._fpsAdapted=h<=.75):this._fpsAdapted=!0}this._fpsTs=r,this._fpsFrames=0}}this.mixer&&this.mixer.update(e);const a=this.explorerCam.update(this.camera,this.player.position,this.player.yaw,e,!this.spectatorMode,this.spectatorMode&&this.hasSpectatorFocus?this.spectatorFocus:void 0);if(this.player.update(e,a),this.explorer){this.explorer.position.lerp(this.player.position,1-Math.exp(-14*e));let r=this.player.yaw-this.avatarYaw;for(;r>Math.PI;)r-=Math.PI*2;for(;r<-Math.PI;)r+=Math.PI*2;this.avatarYaw+=r*Math.min(1,e*12);const m=this.player.isMoving(),_=this.player.isSprinting();if(m){this.walkPhase+=e*(_?15:9.5);const w=Math.floor(this.walkPhase/Math.PI);if(w!==this.lastStep){this.lastStep=w;const S=w%2===0?1:-1,A=Math.cos(this.avatarYaw)*.18*S,C=-Math.sin(this.avatarYaw)*.18*S;this.emitDust(this.player.position.x+A,this.player.position.y,this.player.position.z+C)}}const h=this.explorer.userData.rig;if(h){if(m){const w=_?.95:.6,S=_?1.35:.95,A=Math.sin(this.walkPhase),C=Math.sin(this.walkPhase+Math.PI);h.leftLeg.hip.rotation.x=A*w,h.rightLeg.hip.rotation.x=C*w,h.leftLeg.knee.rotation.x=.12+Math.max(0,-A)*S,h.rightLeg.knee.rotation.x=.12+Math.max(0,-C)*S,h.leftArm.rotation.x=-A*.8,h.rightArm.rotation.x=-C*.8,h.head.rotation.z=0,h.cape.rotation.x=-.18-(.32+Math.abs(Math.sin(this.walkPhase))*.18)*(_?1.3:1),h.cape.rotation.z=Math.sin(this.walkPhase*.5)*.08}else{const w=Math.min(1,e*9);h.leftLeg.hip.rotation.x*=1-w,h.rightLeg.hip.rotation.x*=1-w,h.leftLeg.knee.rotation.x+=(.06-h.leftLeg.knee.rotation.x)*w,h.rightLeg.knee.rotation.x+=(.06-h.rightLeg.knee.rotation.x)*w,h.leftArm.rotation.x*=1-w,h.rightArm.rotation.x*=1-w,h.head.rotation.z=Math.sin(i*1.4)*.05,h.cape.rotation.x+=(-.2-h.cape.rotation.x)*w,h.cape.rotation.z+=(Math.sin(i*1.1)*.04-h.cape.rotation.z)*w}this.updateFace(h,e)}if(this.usingGlb&&this.glbWalk&&this.glbIdle&&!this.glbEmoting){const w=this.glbWalk.getEffectiveWeight(),S=w+((m?1:0)-w)*Math.min(1,e*6);this.glbWalk.setEffectiveWeight(S),this.glbIdle.setEffectiveWeight(1-S)}const v=m?_?.14:.05:0;this.avatarLean+=(v-this.avatarLean)*Math.min(1,e*8);const p=this.explorer.position.x,d=this.explorer.position.z,c=1.6,l=Rt(p-c,d,Et),g=Rt(p+c,d,Et),E=Rt(p,d-c,Et),x=Rt(p,d+c,Et);this._n.set(l-g,2*c,E-x).normalize(),this._n.lerp(Q0,.55).normalize(),this._fwd.set(Math.sin(this.avatarYaw),0,Math.cos(this.avatarYaw)),this._fwd.addScaledVector(this._n,-this._fwd.dot(this._n)).normalize(),this._right.crossVectors(this._n,this._fwd).normalize(),this._fwd.crossVectors(this._right,this._n).normalize(),this._basis.makeBasis(this._right,this._n,this._fwd),this._q.setFromRotationMatrix(this._basis),this._leanQ.setFromAxisAngle(J0,this.avatarLean),this._q.multiply(this._leanQ),this.explorer.quaternion.slerp(this._q,1-Math.exp(-12*e));const R=m?Math.abs(Math.sin(this.walkPhase))*.06:Math.sin(i*1.4)*.01;this.explorer.position.y=this.player.position.y+R;const T=this.explorer.children.find(w=>{var S;return(S=w.userData)==null?void 0:S.isFootRing});if(T){const w=m?1+Math.sin(this.walkPhase)*.08:1;T.scale.set(w,w,w),T.material.opacity=m?.45:.28}}this.updateProximity(),this.updatePickupProximity(),this.updateDust(e),this.tickScene(i,e);const s=performance.now();(s-this.lastExploreUpdateAt>=66||this.lastExploreUpdateAt===0)&&(this.lastExploreUpdateAt=s,(f=this.onExploreUpdate)==null||f.call(this,{playerX:this.player.position.x,playerZ:this.player.position.z,playerYaw:this.player.yaw,nodes:this.nodes,nearNodeId:(u=this.nearNode)==null?void 0:u.id,pickups:this.pickupData,biome:this.minimapPalette()})),this.composer?this.composer.render():this.renderer.render(this.scene,this.camera)});this.container=n,this.onNodeClick=e.onNodeClick,this.onProximity=e.onProximity,this.onExploreUpdate=e.onExploreUpdate,this.onPickupNear=e.onPickupNear,this.onPickupCollect=e.onPickupCollect;const i=n.clientWidth||360,a=n.clientHeight||420;this.scene=new Da,this.scene.fog=new Ia(1713472,.0042),this.camera=new Hn(50,i/a,.2,900),this.camera.position.set(0,8,20),this.renderer=new sh({antialias:this.quality!=="low",alpha:!1,powerPreference:"high-performance"}),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,this.qcfg.pixelRatio)),this.renderer.setSize(i,a),this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=ri,this.renderer.toneMapping=Ui,this.renderer.toneMappingExposure=1.28,this.renderer.outputColorSpace=Ct,n.appendChild(this.renderer.domElement),this.explorerCam.bindDrag(this.renderer.domElement),this.buildSky(),this.buildClouds(),this.buildLights(),this.buildEnvironment(this.currentBiome),this.buildTerrain(),this.buildMountains(),this.buildGrass(),this.buildDust(),this.spawnExplorer(),this.setupPostFX(i,a),this.bindEvents()}setupPostFX(n,e){if(!this.qcfg.bloom){this.composer=void 0;return}try{const i=new dh(this.renderer);i.addPass(new ph(this.scene,this.camera));const a=this.qcfg.bloomScale,s=new $n(new ut(n*a,e*a),.62,.5,.78);i.addPass(s),i.addPass(new mh),i.setPixelRatio(Math.min(window.devicePixelRatio,this.qcfg.pixelRatio)),i.setSize(n,e),this.composer=i,this.bloomPass=s}catch{this.composer=void 0}}setNodes(n,e,i=!0){if(this.nodes=n,this.currentId=e,this.rebuildPath(),this.rebuildDecor(),i)this.rebuildNodesAsync();else{this.rebuildToken++;for(const a of this.nodeGroups.values())this.scene.remove(a),Jn(a);this.nodeGroups.clear(),this.pickables=[]}this.teleportToNode(e),this.updateDynamicLightBudget(!0)}resume(){this.paused&&(this.paused=!1,this._fpsTs=0,this._fpsFrames=0,this.player.setEnabled(!this.spectatorMode),this.onResize(),this.animId||this.animate())}pause(){this.paused=!0,this.player.setEnabled(!1),this.animId&&(cancelAnimationFrame(this.animId),this.animId=0)}setSpectatorMode(n){this.spectatorMode=n,this.player.setStickInput(0,0),this.player.setEnabled(!n&&!this.paused),this.explorer&&(this.explorer.visible=!n)}tryInteract(){var n,e;return this.spectatorMode||this.paused?!1:this.nearPickup?((n=this.onPickupCollect)==null||n.call(this,this.nearPickup.id),!0):(e=this.nearNode)!=null&&e.unlocked?(this.onNodeClick(this.nearNode.id),!0):!1}setStickInput(n,e){this.player.setStickInput(n,e)}setBiome(n){this.activeUnitId=n,this.activeWorldId=void 0,this.activeWorldTitle=void 0,this.hasSpectatorFocus=!1;const e=y0(n);this.currentBiome=e,this.grassMesh&&(this.grassMesh.visible=["coast","forest","plains"].includes(e.decorStyle)),this.updateGrassPlacement(!0),this.applyBiomeToSky(e),this.applyBiomeToLights(e),this.buildEnvironment(e),this.applyBiomeToTerrain(e,!1),this.applyOutfitFromBiome(e),this.mountains&&(this.mountains.visible=e.decorStyle==="forest"||e.decorStyle==="plains"),this.scene.fog=new Ia(e.fogColor,e.fogDensity)}setSubWorld(n,e){if(this.activeWorldId===n&&this.activeWorldTitle===e)return;this.activeWorldId=n,this.activeWorldTitle=e;const i=Nt(n);if(this.hasSpectatorFocus=!1,this.applyBiomeToTerrain(this.currentBiome,i),this.applySunDiscScale(i),this.mountains&&(this.mountains.visible=!i&&(this.currentBiome.decorStyle==="forest"||this.currentBiome.decorStyle==="plains")),this.grassMesh&&(this.grassMesh.visible=["coast","forest","plains"].includes(this.currentBiome.decorStyle)&&!i,this.updateGrassPlacement(!0)),this.bloomPass&&(this.bloomPass.strength=i?.2:In.clamp(.5+(1.5-this.currentBiome.sunIntensity)*.28,.45,1.05)),this.activeUnitId&&this.nodes.length>0&&(this.rebuildUnitLandscape(),Nt(n))){const a=this.nodes.find(s=>s.id===this.currentId)??this.nodes[0];if(a){const s=Rt(a.x,a.z,Et);this.spectatorFocus.set(a.x-3.5,s+4.8,a.z+11.5),this.hasSpectatorFocus=!0,this.player.yaw=0,this.player.setPosition(a.x,s,a.z+2.5),this.avatarYaw=0,this.explorerCam.resetBehind(0)}}}setOutfitAccent(n){var i;const e=(i=this.explorer)==null?void 0:i.userData.rig;if(e){e.mats.trim.color.setHex(n),e.mats.trim.emissive.setHex(n).multiplyScalar(.4),e.mats.cape.color.setHex(n),e.mats.cape.emissive.setHex(n).multiplyScalar(.35);return}this.usingGlb&&this.explorer&&this.explorer.traverse(a=>{const s=a,o=s.material;if(s.isMesh&&o&&"emissive"in o){const u=s.name;/^Torso$|^Body$/i.test(u)?(o.color.setHex(n),o.emissive.setHex(n).multiplyScalar(.14)):o.emissive.setHex(n).multiplyScalar(.06)}})}setExpression(n){this.expression=n,this.usingGlb&&this.playGlbEmote(n)}playGlbEmote(n){var o;if(!this.mixer||!this.glbClips||!this.glbIdle)return;const e=n==="happy"?"Wave":n==="surprised"?"Jump":null;if(!e){this.glbEmoting=!1,this.glbIdle.reset().fadeIn(.3).play();return}const i=this.glbClips.find(u=>u.name===e);if(!i)return;const a=this.mixer.clipAction(i);a.setLoop(nl,1),a.clampWhenFinished=!1,a.reset().play(),(o=this.glbWalk)==null||o.setEffectiveWeight(0),this.glbIdle.crossFadeTo(a,.2,!1),this.glbEmoting=!0;const s=u=>{var f;u.action===a&&(this.glbEmoting=!1,a.crossFadeTo(this.glbIdle.reset().play(),.3,!1),(f=this.mixer)==null||f.removeEventListener("finished",s))};this.mixer.addEventListener("finished",s)}applyOutfitFromBiome(n){this.setOutfitAccent(n.crystalColor)}minimapPalette(){const n=this.currentBiome,[e,i,a]=n.terrainTint,s=Math.round(e*255)<<16|Math.round(i*255)<<8|Math.round(a*255),o=Math.min(255,Math.round(e*255)+70)<<16|Math.min(255,Math.round(i*255)+80)<<8|Math.min(255,Math.round(a*255)+60);return{ground:s,highland:o,path:n.pathColor}}grassKey(n,e){return(n+1e5)*262147+(e+1e5)}hideGrassSlot(n){const e=this.grassMesh;e&&(this.grassDummy.position.set(0,-9999,0),this.grassDummy.rotation.set(0,0,0),this.grassDummy.scale.setScalar(0),this.grassDummy.updateMatrix(),e.setMatrixAt(n,this.grassDummy.matrix))}placeGrass(n,e,i){const a=this.grassMesh;if(!a)return;const s=this.grassCellSize,o=$i(e*1.7,i*2.3),u=$i(e*3.1+5,i*1.3+7),f=$i(e*.7+11,i*2.9+3),r=(e+.5)*s+(o-.5)*s,m=(i+.5)*s+(u-.5)*s,_=Rt(r,m,Et),h=1.2;if(Math.abs(Rt(r+h,m,Et)-Rt(r-h,m,Et))/(2*h)>.85){this.hideGrassSlot(n);return}this.grassDummy.position.set(r,_,m),this.grassDummy.rotation.set(0,f*Math.PI*2,0);const p=.68+u*.45;this.grassDummy.scale.set(p,.72+o*.45,p),this.grassDummy.updateMatrix(),a.setMatrixAt(n,this.grassDummy.matrix);const d=u;this.grassColor.setRGB(.86+d*.34,.96+o*.22,.8+(1-d)*.26),a.setColorAt(n,this.grassColor)}updateGrassPlacement(n=!1){const e=this.grassMesh;if(!e||!e.visible)return;const i=this.player.position.x,a=this.player.position.z;if(!n){const v=i-this.grassLastX,p=a-this.grassLastZ;if(v*v+p*p<9)return}this.grassLastX=i,this.grassLastZ=a;const s=this.grassCellSize,o=this.grassRadius,u=o*o,f=Math.floor((i-o)/s),r=Math.ceil((i+o)/s),m=Math.floor((a-o)/s),_=Math.ceil((a+o)/s),h=this.grassNeeded;h.clear();for(let v=f;v<=r;v++)for(let p=m;p<=_;p++){const d=(v+.5)*s-i,c=(p+.5)*s-a;d*d+c*c>u||h.add(this.grassKey(v,p))}for(const[v,p]of this.grassCellMap)h.has(v)||(this.grassCellMap.delete(v),this.hideGrassSlot(p),this.grassFreeSlots.push(p));for(const v of h){if(this.grassCellMap.has(v))continue;const p=this.grassFreeSlots.pop();if(p===void 0)break;const d=v%262147-1e5,c=(v-(d+1e5))/262147-1e5;this.placeGrass(p,c,d),this.grassCellMap.set(v,p)}e.instanceMatrix.needsUpdate=!0,e.instanceColor&&(e.instanceColor.needsUpdate=!0)}disposeReflectors(){for(const n of this.reflectors)n.getRenderTarget().dispose(),n.geometry.dispose(),n.material.dispose();this.reflectors=[]}updateFace(n,e){this.blinkTimer-=e,this.blinkTimer<=0&&(this.blink=1,this.blinkTimer=2.4+Math.random()*3.2),this.blink=Math.max(0,this.blink-e*9);const i=1-this.blink*.85;n.eyeL.scale.y=i,n.eyeR.scale.y=i;const a=this.nearNode||this.nearPickup?"happy":this.expression;let s=.37,o=1,u=1,f=.2;a==="happy"?(s=.39,o=1.5,u=.85,f=.188):a==="surprised"&&(s=.42,o=.7,u=2.4,f=.192);const r=Math.min(1,e*8);n.brow.position.y+=(s-n.brow.position.y)*r,n.mouth.scale.x+=(o-n.mouth.scale.x)*r,n.mouth.scale.y+=(u-n.mouth.scale.y)*r,n.mouth.position.y+=(f-n.mouth.position.y)*r}setPickups(n){this.pickupData=n,this.rebuildPickups()}markPickupCollected(n){var a,s;const e=this.pickupData.find(o=>o.id===n);e&&(e.collected=!0);const i=this.pickupMeshes.get(n);i&&(i.userData.dying=!0,i.userData.dieTimer=0),((a=this.nearPickup)==null?void 0:a.id)===n&&(this.nearPickup=null,(s=this.onPickupNear)==null||s.call(this,null))}tryCollectPickup(){var n;return this.nearPickup?((n=this.onPickupCollect)==null||n.call(this,this.nearPickup.id),!0):!1}dispose(){var n,e,i,a,s,o,u,f,r;if(cancelAnimationFrame(this.animId),this.animId=0,this.renderer.domElement.removeEventListener("pointerdown",this.onPointerDown),this.explorerCam.disposeDrag(),window.removeEventListener("keydown",this.onKeyDown),window.removeEventListener("resize",this.onResize),document.removeEventListener("visibilitychange",this.onVisibilityChange),(n=this.resizeObserver)==null||n.disconnect(),this.player.dispose(),Ht(this.scene,this.pathGroup),Ht(this.scene,this.decorGroup),Ht(this.scene,this.waterGroup),Ht(this.scene,this.mountains),Ht(this.scene,this.clouds),Ht(this.scene,this.unitLandscape),Ht(this.scene,this.explorer),this.removePickupGroup(),this.grassMesh&&(this.scene.remove(this.grassMesh),this.grassMesh.geometry.dispose(),this.grassMesh.material.dispose()),this.sunDisc&&(this.scene.remove(this.sunDisc),(e=this.sunDisc.material.map)==null||e.dispose(),this.sunDisc.material.dispose()),this.dustGroup){this.scene.remove(this.dustGroup);const m=(i=this.dustPool[0])==null?void 0:i.material;(a=m==null?void 0:m.map)==null||a.dispose();for(const _ of this.dustPool)_.material.dispose();this.dustPool=[]}this.disposeReflectors(),(s=this.mixer)==null||s.stopAllAction(),(o=this.composer)==null||o.dispose();for(const m of this.nodeGroups.values())Jn(m);if(this.pickupMeshes.clear(),this.terrain){this.terrain.geometry.dispose();const m=this.terrain.material;for(const _ of new Set([m.map,this.groundDetailMap]))_==null||_.dispose();(u=m.roughnessMap)==null||u.dispose(),(f=m.normalMap)==null||f.dispose(),m.dispose()}(r=this.envRT)==null||r.dispose(),this.skyDome&&(this.skyDome.geometry.dispose(),this.skyDome.material.dispose()),this.renderer.dispose(),this.renderer.domElement.remove()}spawnExplorer(){Ht(this.scene,this.explorer),this.explorer=E0(),this.contactShadow=uo(1.9),this.explorer.add(this.contactShadow),this.scene.add(this.explorer),this.explorer.visible=!this.spectatorMode,this.applyOutfitFromBiome(this.currentBiome),this.tryLoadGlbAvatar()}async tryLoadGlbAvatar(){var n;try{const e=await tr(),i=(n=e==null?void 0:e.world)==null?void 0:n.avatar;if(!e||!i)return;const a=await Jh(i.file,i,e);if(!a)return;if(Ht(this.scene,this.explorer),e0(a.group),this.explorer=a.group,this.contactShadow=uo(1.9),this.explorer.add(this.contactShadow),this.explorer.position.copy(this.player.position),this.explorer.quaternion.setFromEuler(new gs(0,this.avatarYaw,0)),this.scene.add(this.explorer),this.usingGlb=!0,a.clips.length){this.mixer=new il(this.explorer),this.glbClips=a.clips;const s=a.clips.find(u=>/idle|stand|breath/i.test(u.name))??a.clips[0];this.glbIdle=this.mixer.clipAction(s),this.glbIdle.play();const o=a.clips.find(u=>/walk|run|move/i.test(u.name));o&&(this.glbWalk=this.mixer.clipAction(o),this.glbWalk.play(),this.glbWalk.setEffectiveWeight(0))}}catch{}}teleportToNode(n){const e=this.nodes.find(a=>a.id===n)??this.nodes[0];if(!e)return;const i=Rt(e.x,e.z,Et);this.player.yaw=0,this.player.setPosition(e.x+4,i,e.z-8),this.explorer&&(this.explorer.position.copy(this.player.position),this.explorer.rotation.set(0,this.player.yaw,0),this.explorer.quaternion.setFromEuler(this.explorer.rotation)),this.avatarYaw=this.player.yaw,this.avatarLean=0,this.explorerCam.resetBehind(this.player.yaw),this.camera.position.set(e.x+10,i+7,e.z-16),this.camera.lookAt(e.x,i+1.5,e.z)}buildSky(){const n=new Dt({side:Gt,depthWrite:!1,uniforms:{topColor:{value:new ue(3824266)},midColor:{value:new ue(5929642)},bottomColor:{value:new ue(659488)},offset:{value:22},exponent:{value:.52}},vertexShader:`
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
      `});this.skyDome=new U(new ie(560,48,32),n),this.scene.add(this.skyDome);const e=new Float32Array(2e3*3),i=Ft(42);for(let o=0;o<2e3;o++){const u=300+i()*80,f=i()*Math.PI*2,r=i()*Math.PI*.45;e[o*3]=u*Math.sin(r)*Math.cos(f),e[o*3+1]=u*Math.cos(r)+30,e[o*3+2]=u*Math.sin(r)*Math.sin(f)+On}const a=new vn;a.setAttribute("position",new kt(e,3)),this.scene.add(new Ho(a,new Go({color:15265528,size:.42,transparent:!0,opacity:.82,sizeAttenuation:!0})));const s=new Ln({map:this.makeGlowTexture(),color:16773320,transparent:!0,depthWrite:!1,blending:hi,fog:!1});this.sunDisc=new Pn(s),this.sunDisc.scale.set(52,52,1),this.scene.add(this.sunDisc)}buildEnvironment(n){var e;try{const i=new vs(this.renderer),a=new Da,s=new Dt({side:Gt,depthWrite:!1,uniforms:{topColor:{value:new ue(n.skyTop)},midColor:{value:new ue(n.skyMid)},bottomColor:{value:new ue(n.skyBot)},sunColor:{value:new ue(n.sunColor)},sunDir:{value:new j(.5,.72,.36).normalize()}},vertexShader:`
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
        `});a.add(new U(new ie(10,32,24),s));const o=i.fromScene(a,.02);(e=this.envRT)==null||e.dispose(),this.envRT=o,this.scene.environment=o.texture,a.traverse(u=>{const f=u;f.isMesh&&(f.geometry.dispose(),f.material.dispose())}),i.dispose()}catch{}}makeGlowTexture(){const e=document.createElement("canvas");e.width=e.height=256;const i=e.getContext("2d"),a=i.createRadialGradient(256/2,256/2,0,256/2,256/2,256/2);a.addColorStop(0,"rgba(255,255,255,1)"),a.addColorStop(.18,"rgba(255,245,210,0.95)"),a.addColorStop(.5,"rgba(255,210,140,0.35)"),a.addColorStop(1,"rgba(255,200,120,0)"),i.fillStyle=a,i.fillRect(0,0,256,256);const s=new Yt(e);return s.colorSpace=Ct,s}buildDust(){const n=this.makeCloudTexture(),e=new lt;for(let i=0;i<28;i++){const a=new Ln({map:n,color:13483942,transparent:!0,opacity:0,depthWrite:!1}),s=new Pn(a);s.visible=!1,s.userData={life:0,vx:0,vy:0,vz:0},e.add(s),this.dustPool.push(s)}this.dustGroup=e,this.scene.add(e)}emitDust(n,e,i){let a=0;for(const s of this.dustPool){if(s.userData.life>0)continue;s.position.set(n+(Math.random()-.5)*.2,e+.05,i+(Math.random()-.5)*.2),s.userData.life=1,s.userData.vx=(Math.random()-.5)*.6,s.userData.vy=.3+Math.random()*.45,s.userData.vz=(Math.random()-.5)*.6;const o=.3+Math.random()*.2;if(s.scale.set(o,o,1),s.visible=!0,s.material.opacity=.5,++a>=3)break}}updateDust(n){for(const e of this.dustPool){const i=e.userData.life;if(i<=0)continue;const a=i-n*1.4;if(e.userData.life=a,a<=0){e.visible=!1;continue}e.userData.vy=e.userData.vy-n*.6,e.position.x+=e.userData.vx*n,e.position.y+=e.userData.vy*n,e.position.z+=e.userData.vz*n,e.material.opacity=a*.5;const s=(1.3-a)*.6+.3;e.scale.set(s,s,1)}}buildLights(){this.hemi=new sl(13164799,2373672,.5),this.scene.add(this.hemi),this.ambientLight=new al(10137804,.18),this.scene.add(this.ambientLight),this.sun=new _s(16774368,1.45),this.sun.position.set(55,72,35),this.sun.castShadow=!0,this.sun.shadow.mapSize.set(this.qcfg.shadowMap,this.qcfg.shadowMap);const n=this.sun.shadow.camera;n.near=8,n.far=340,n.left=n.bottom=-150,n.right=n.top=150,this.sun.shadow.bias=-35e-5,this.scene.add(this.sun);const e=new _s(9221375,.5);e.position.set(-40,28,-30);const i=new Qt(10864895,.55,160);i.position.set(-35,28,On),i.userData.isGlobalLight=!0,this.scene.add(e,i)}updateDynamicLightBudget(n=!1){if(!n&&++this.dynamicLightBudgetFrames<30)return;this.dynamicLightBudgetFrames=0;const e=[];this.scene.traverse(i=>{const a=i;if(a.userData.isGlobalLight||!a.isLight||!a.isPointLight&&!a.isSpotLight)return;const s=a;s.getWorldPosition(this._lightPosition),e.push({light:s,distance:this._lightPosition.distanceToSquared(this.player.position)})}),e.sort((i,a)=>i.distance-a.distance);for(let i=0;i<e.length;i++)e[i].light.visible=i<this.dynamicLightLimit}applyBiomeToSky(n){if(!this.skyDome)return;const e=this.skyDome.material;e.uniforms.topColor.value.setHex(n.skyTop),e.uniforms.midColor.value.setHex(n.skyMid),e.uniforms.bottomColor.value.setHex(n.skyBot),e.needsUpdate=!0}applyBiomeToLights(n){this.hemi&&(this.hemi.color.setHex(n.hemiSky),this.hemi.groundColor.setHex(n.hemiGround)),this.ambientLight&&this.ambientLight.color.setHex(n.ambientColor),this.sun&&(this.sun.color.setHex(n.sunColor),this.sun.intensity=n.sunIntensity),this.sunDisc&&(this.sunDisc.material.color.setHex(n.sunColor),this.applySunDiscScale(Nt(this.activeWorldId))),this.bloomPass&&(this.bloomPass.strength=In.clamp(.5+(1.5-n.sunIntensity)*.28,.45,1.05))}applySunDiscScale(n){if(!this.sunDisc)return;const e=n?this.currentBiome.sunFocusedDiscScale??this.currentBiome.sunDiscScale??52:this.currentBiome.sunDiscScale??52;this.sunDisc.scale.set(e,e,1)}applyBiomeToTerrain(n,e){if(!this.terrain)return;const i=this.terrain.material;i.color.setRGB(1,1,1),i.map=this.groundDetailMap??null,i.vertexColors=!0,i.roughness=e?.95:.9,i.metalness=.02,i.needsUpdate=!0,this.paintTerrain(n,e)}rebuildPickups(){this.removePickupGroup(),this.pickupMeshes.clear(),this.pickupGroup=new lt;for(const n of this.pickupData){if(n.collected)continue;const e=this.createPickupOrb(n);this.pickupGroup.add(e),this.pickupMeshes.set(n.id,e)}this.scene.add(this.pickupGroup),this.updateDynamicLightBudget(!0)}createPickupOrb(n){const e=this.currentBiome,i=new lt;i.position.set(n.x,n.y,n.z),i.userData.pickupId=n.id;const a=new q({color:e.orbColor,emissive:new ue(e.orbColor),emissiveIntensity:1.8,roughness:.1,metalness:.4,transparent:!0,opacity:.92}),s=new U(new ie(.32,14,10),a);s.userData.isOrbCore=!0,i.add(s);const o=new xt({color:e.glowColor,transparent:!0,opacity:.22,side:Gt,depthWrite:!1}),u=new U(new ie(.58,12,8),o);u.userData.isOrbGlow=!0,i.add(u);const f=new ze(.52,.04,6,24),r=new xt({color:e.orbColor,transparent:!0,opacity:.55,depthWrite:!1}),m=new U(f,r);m.userData.isOrbRing=!0,m.rotation.x=Math.PI/3,i.add(m);const _=new Qt(e.glowColor,.6,8);_.userData.isOrbLight=!0,i.add(_);const h=this.createWordSprite(n.word,e.orbColor);return h.position.y=1.1,h.userData.isWordSprite=!0,i.add(h),i.userData.baseY=n.y,i.userData.pickupId=n.id,i}createWordSprite(n,e){var m;const a=`#${new ue(e).getHexString()}`,s=document.createElement("canvas");s.width=256,s.height=64;const o=s.getContext("2d");o.clearRect(0,0,256,64),o.fillStyle="rgba(0,0,0,0.52)",(m=o.roundRect)==null||m.call(o,4,8,248,48,12),o.fill(),o.font="bold 26px 'Arial', sans-serif",o.fillStyle=a,o.textAlign="center",o.textBaseline="middle",o.shadowColor=a,o.shadowBlur=8,o.fillText(n,128,34);const u=new Yt(s),f=new Ln({map:u,transparent:!0,depthWrite:!1}),r=new Pn(f);return r.scale.set(2.4,.6,1),r}disposePickupResources(n){Jn(n)}removePickupGroup(){this.pickupGroup&&(this.scene.remove(this.pickupGroup),this.disposePickupResources(this.pickupGroup),this.pickupGroup=void 0)}buildTerrain(){const n=new Vt(En.width,En.depth,Ua.w,Ua.d);n.rotateX(-Math.PI/2);const e=n.attributes.position;for(let i=0;i<e.count;i++){const a=e.getX(i),s=e.getZ(i),o=Et(a,s);e.setY(i,o)}n.computeVertexNormals(),n.setAttribute("color",new kt(new Float32Array(e.count*3).fill(1),3)),this.terrainMaps=L0(),this.groundDetailMap=P0(),this.terrain=new U(n,new q({color:16777215,map:this.groundDetailMap,roughnessMap:this.terrainMaps.roughness,normalMap:this.terrainMaps.normal,normalScale:new ut(.7,.7),vertexColors:!0,roughness:.92,metalness:.02,envMapIntensity:.32})),this.terrain.receiveShadow=!0,this.terrain.position.set(0,ol,On),this.scene.add(this.terrain),this.paintTerrain(this.currentBiome,!1)}paintTerrain(n,e){if(!this.terrain)return;const i=this.terrain.geometry,a=i.attributes.position,s=i.attributes.normal,o=i.attributes.color,u=o.array,f=C0(n),r=new ue(f.grass),m=new ue(f.dirt),_=new ue(f.rock),h=e?.72:1,v=new ue,p=new ue;for(let d=0;d<a.count;d++){const c=a.getX(d),l=a.getZ(d),g=a.getY(d),E=ji(c*.009+31,l*.009+17,4)*.68+ji(c*.045,l*.045,3)*.32,x=Mi(.54,.78,E)*.75,R=1-s.getY(d),T=Mi(.22,.55,R);v.copy(r).lerp(m,x).lerp(_,T);const w=.86+ji(c*.02+5,l*.02+9,3)*.26+Mi(6,34,g)*.1;if(v.multiplyScalar(w),v.multiplyScalar(.94+Mi(-6,10,g)*.08),h<1){p.copy(v);const S=p.r*.299+p.g*.587+p.b*.114;v.setRGB(S+(v.r-S)*h,S+(v.g-S)*h,S+(v.b-S)*h)}u[d*3]=v.r,u[d*3+1]=v.g,u[d*3+2]=v.b}o.needsUpdate=!0}buildMountains(){Ht(this.scene,this.mountains);const n=new lt,e=Ft(7),i=Math.max(En.width,En.depth)*.5,a=this.quality==="low"?18:this.quality==="med"?24:30,s=this.quality!=="low";for(let o=0;o<a;o++){const u=o/a*Math.PI*2+(e()-.5)*.18,f=i+e()*40,r=Math.cos(u)*f,m=Math.sin(u)*f+On,_=42+e()*78,h=32+e()*46,v=3095634+Math.floor(e()*10)*65793,p=new q({color:v,roughness:1,metalness:0,flatShading:!0,fog:!0}),d=new U(new It(h,_,5+Math.floor(e()*3),1),p);if(d.position.set(r,_/2-8,m),d.rotation.y=e()*Math.PI,d.scale.set(1,.8+e()*.5,1),n.add(d),s&&_>70){const c=_*(.18+e()*.12),l=new U(new It(h*.42,c,5,1),new q({color:14215416,roughness:.95,metalness:0,flatShading:!0,fog:!0}));l.position.set(r,_-c*.35-8,m),l.rotation.y=d.rotation.y,n.add(l)}}this.mountains=n,this.scene.add(n)}buildGrass(){const n=o0(),e=new q({vertexColors:!0,roughness:.92,metalness:0,side:ct});e.onBeforeCompile=s=>{s.uniforms.uTime={value:0},s.uniforms.uPlayer={value:new j(0,0,0)},this.grassUniforms=s.uniforms,s.vertexShader=`uniform float uTime;
uniform vec3 uPlayer;
`+s.vertexShader,s.vertexShader=s.vertexShader.replace("#include <begin_vertex>",`#include <begin_vertex>
         float gH = position.y / ${or.toFixed(3)};
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
         transformed.y -= gTramp * gH * 0.4;`)},this.grassRadius=this.qcfg.grassRadius,this.grassCellSize=this.qcfg.grassCell;const i=Math.ceil(Math.PI*this.grassRadius*this.grassRadius/(this.grassCellSize*this.grassCellSize))+96,a=new St(n,e,i);a.frustumCulled=!1,a.castShadow=!1,a.receiveShadow=!0,this.grassFreeSlots=[];for(let s=0;s<i;s++)this.grassFreeSlots.push(s),this.hideGrassSlotInit(a,s);a.instanceMatrix.needsUpdate=!0,this.grassMesh=a,a.visible=this.currentBiome.decorStyle!=="space",this.scene.add(a),this.updateGrassPlacement(!0)}hideGrassSlotInit(n,e){this.grassDummy.position.set(0,-9999,0),this.grassDummy.rotation.set(0,0,0),this.grassDummy.scale.setScalar(0),this.grassDummy.updateMatrix(),n.setMatrixAt(e,this.grassDummy.matrix)}buildClouds(){Ht(this.scene,this.clouds);const n=this.makeCloudTexture(),e=new lt;e.position.z=On;const i=Ft(5150);for(let a=0;a<18;a++){const s=new Ln({map:n,transparent:!0,opacity:.42+i()*.28,depthWrite:!1,fog:!1}),o=new Pn(s),u=i()*Math.PI*2,f=130+i()*260;o.position.set(Math.cos(u)*f,86+i()*70,Math.sin(u)*f);const r=70+i()*140;o.scale.set(r,r*(.42+i()*.2),1),e.add(o)}this.clouds=e,this.scene.add(e)}makeCloudTexture(){const e=document.createElement("canvas");e.width=e.height=256;const i=e.getContext("2d");i.clearRect(0,0,256,256);for(let s=0;s<26;s++){const o=256*(.25+Math.random()*.5),u=256*(.35+Math.random()*.3),f=256*(.08+Math.random()*.18),r=i.createRadialGradient(o,u,0,o,u,f);r.addColorStop(0,"rgba(255,255,255,0.5)"),r.addColorStop(1,"rgba(255,255,255,0)"),i.fillStyle=r,i.beginPath(),i.arc(o,u,f,0,Math.PI*2),i.fill()}const a=new Yt(e);return a.colorSpace=Ct,a}rebuildPath(){if(Ht(this.scene,this.pathGroup),this.pathGroup=new lt,this.nodes.length<2){this.scene.add(this.pathGroup);return}const n=!!this.activeUnitId,e=n?this.nodes.slice(1).map(h=>[this.nodes[0],h]):this.nodes.slice(0,-1).map((h,v)=>[h,this.nodes[v+1]]),i=this.nodes.map(h=>new j(h.x,Rt(h.x,h.z,Et)+.45,h.z)),a=new _n(i,!1,"catmullrom",.35),s=Math.max(i.length*28,80),o=[];for(const[h,v]of e){const p=h.cleared&&v.cleared,d=Rt(h.x,h.z,Et)+.45,c=Rt(v.x,v.z,Et)+.45,l=new _n([new j(h.x,d,h.z),new j(v.x,c,v.z)],!1,"catmullrom",.4);if(o.push(l),!n){const g=new U(new gn(l,16,.48,12,!1),new q({color:p?4885618:4016732,roughness:.68,metalness:.1}));g.receiveShadow=!0;const E=new U(new gn(l,16,.26,10,!1),t0(p));E.position.y=.08,this.pathGroup.add(g,E)}}const u=cs(n?2834775:7041664),f=cs(n?3493734:9147295),r=cs(n?2504779:5595246),m=[u,f,r],_=new ee(1.05,.13,.72);if(n)e.forEach(([h,v],p)=>{const d=o[p],c=Math.max(16,Math.ceil(Math.hypot(h.x-v.x,h.z-v.z)/1.6));for(let l=0;l<=c;l++){const g=l/c,E=Math.min(1,(l+.5)/c),x=d.getPoint(g);x.y=Rt(x.x,x.z,Et)+.01;const R=d.getPoint(E),T=new U(_,m[l%m.length]);T.position.copy(x),T.lookAt(R.x,x.y,R.z),T.receiveShadow=!0,this.pathGroup.add(T)}});else for(let h=0;h<=s;h++){const v=h/s,p=Math.min(1,(h+.5)/s),d=a.getPoint(v);d.y=Rt(d.x,d.z,Et)+.01;const c=a.getPoint(p),l=new U(_,m[h%m.length]);l.position.copy(d),l.lookAt(c.x,d.y,c.z),l.receiveShadow=!0,this.pathGroup.add(l)}if(!n){const h=n0("rgba(255,220,140,1)"),v=new he(.055,.07,2.6,7),p=new he(.03,.03,.8,5),d=new ie(.14,8,6),c=i0(),l=s0(16769152);for(let g=0;g<this.nodes.length;g+=Math.max(1,Math.floor(this.nodes.length/8))){const E=this.nodes[g],x=Math.min(1,(g+.5)/Math.max(1,this.nodes.length-1)),R=a.getTangent(x),T=new j(-R.z,0,R.x).normalize();for(const w of[-1,1]){const S=E.x+T.x*2.2*w,A=E.z+T.z*2.2*w,C=Rt(S,A,Et),L=new U(v,c);L.position.set(S,C+1.3,A),L.castShadow=!0;const P=new U(p,c);P.rotation.z=Math.PI/2,P.position.set(S+.4*w*-1,C+2.55,A);const F=new U(d,l);F.position.set(S+.8*w*-1,C+2.55,A);const k=new Pn(new Ln({map:h,transparent:!0,opacity:.7,depthWrite:!1,blending:hi}));k.scale.setScalar(1.8),k.position.set(S+.8*w*-1,C+2.6,A),this.pathGroup.add(L,P,F,k)}}}this.scene.add(this.pathGroup)}rebuildDecor(){this.disposeReflectors(),Ht(this.scene,this.decorGroup),Ht(this.scene,this.waterGroup),this.decorGroup=new lt,this.waterGroup=new lt,this.waterMeshes=[];const n=Ft(2024),e=new Set,i=this.activeUnitId?this.nodes.find(l=>l.unlocked)??this.nodes[0]:void 0,a=!!(i&&this.activeUnitId),s=(i==null?void 0:i.x)??0,o=(i==null?void 0:i.z)??On,u=(l,g)=>!a&&this.nodes.some(E=>Math.hypot(l-(E.x+4),g-(E.z-8))<26);this.rebuildUnitLandscape();const f=a?this.quality==="low"?8:this.quality==="med"?12:18:this.quality==="low"?16:this.quality==="med"?24:34,r=a?this.quality==="low"?42:this.quality==="med"?64:92:this.quality==="low"?80:this.quality==="med"?120:180;for(const l of this.nodes){const g=Ft(l.id.length*997+l.z);for(let E=0;E<f;E++){const x=g()*Math.PI*2,R=a?32+g()*22:6+g()*24,T=l.x+Math.cos(x)*R,w=l.z+Math.sin(x)*R;if(a&&Math.hypot(T-s,w-o)<25||u(T,w))continue;const S=`${Math.round(T)}_${Math.round(w)}`;if(e.has(S))continue;e.add(S);const A=Rt(T,w,Et),C=a?.65+g()*.75:.75+g()*1.1;this.addDecorAt(a?this.currentBiome.decorStyle:l.theme,T,A,w,C,g)}}const m=Ft(909),_=a?145:En.width*.46,h=a?190:En.depth*.46,v=this.currentBiome.decorStyle;for(let l=0;l<r;l++){const g=s+(m()-.5)*2*_,E=o+(m()-.5)*2*h;if(a&&Math.hypot(g-s,E-o)<25||u(g,E)||!a&&Math.abs(g)<14)continue;const x=Rt(g,E,Et),R=.8+m()*1.5,T=m();if(v==="space"){const w=bi(R*.72);w.position.set(g,x+.16,E),w.rotation.set(m()*.18,m()*Math.PI*2,m()*.18),this.decorGroup.add(w);continue}if(T<.24){const w=m()>.5?ho(R):po(R);w.position.set(g,x,E),w.rotation.y=m()*Math.PI*2,this.decorGroup.add(w)}else if(T<.46){const w=r0(R);w.position.set(g,x,E),w.rotation.y=m()*Math.PI*2,this.decorGroup.add(w)}else if(T<.62){const w=bi(R*.8);w.position.set(g,x+.2,E),w.rotation.set(m(),m(),m()),this.decorGroup.add(w)}else if(T<.8){const w=c0(.85+m()*.7);w.position.set(g,x,E),this.decorGroup.add(w)}else if(T<.91){const w=l0(R);w.position.set(g,x,E),w.rotation.y=m()*Math.PI*2,this.decorGroup.add(w)}else{const w=u0(R*.9);w.position.set(g,x+.12,E),this.decorGroup.add(w)}}const p=a&&this.currentBiome.decorStyle==="space"?0:a?2:6,d=this.qcfg.reflectors;for(let l=0;l<p;l++){const g=l%2===0?-1:1,E=s+g*(a?52+n()*18:60+n()*55),x=o-h*.8+l*(h*1.5/p)+n()*18,R=a?34+n()*14:48+n()*26,T=a?24+n()*12:30+n()*18,w=Rt(E,x,Et)-.6;if(l<d){const A=new Oi(new Vt(R,T),{textureWidth:this.qcfg.reflectRes,textureHeight:this.qcfg.reflectRes,color:1918038});A.rotation.x=-Math.PI/2,A.position.set(E,w,x),this.reflectors.push(A),this.waterGroup.add(A);const C=new U(new Vt(R,T,18,12),fo());C.material.opacity=.26,C.rotation.x=-Math.PI/2,C.position.set(E,w+.05,x),C.userData.isWater=!0,C.userData.baseOpacity=.26,this.waterMeshes.push(C),this.waterGroup.add(C)}else{const A=new U(new Vt(R,T,16,10),fo());A.material.opacity=.82,A.rotation.x=-Math.PI/2,A.position.set(E,w+.02,x),A.userData.isWater=!0,A.userData.baseOpacity=.82,this.waterMeshes.push(A),this.waterGroup.add(A)}}const c=new U(new Vt(a?_*2.2:En.width+40,a?h*2.2:En.depth+40),new xt({color:10406143,transparent:!0,opacity:.038,depthWrite:!1}));c.rotation.x=-Math.PI/2,c.position.set(s,5,o),this.decorGroup.add(c),this.scene.add(this.decorGroup,this.waterGroup),this.updateDynamicLightBudget(!0)}rebuildUnitLandscape(){Ht(this.scene,this.unitLandscape),this.unitLandscape=void 0;const n=this.activeUnitId?this.nodes.find(e=>e.unlocked)??this.nodes[0]:void 0;!n||!this.activeUnitId||(this.unitLandscape=I0(this.currentBiome,n,this.activeWorldId,this.activeWorldTitle),this.unitLandscape.position.set(n.x,Rt(n.x,n.z,Et),n.z),this.scene.add(this.unitLandscape))}addDecorAt(n,e,i,a,s,o){if(n==="forest"||n==="plains"||n==="library"){const u=o()>.4?ho(s):po(s*1.05);u.position.set(e,i,a),u.rotation.y=o()*Math.PI*2,this.decorGroup.add(u);return}if(n==="coast"&&o()>.45){const u=bi(s*.85);u.position.set(e,i+.3,a),u.rotation.set(o(),o(),o()),this.decorGroup.add(u);return}if(o()>.5){const u=bi(s*.65);u.position.set(e,i+.2,a),this.decorGroup.add(u)}if(o()>.65){const u=rr(vi(n).accent);u.position.set(e,i,a),this.decorGroup.add(u)}}async rebuildNodesAsync(){const n=++this.rebuildToken;for(const e of this.nodeGroups.values())this.scene.remove(e),Jn(e);this.nodeGroups.clear(),this.pickables=[];for(const e of this.nodes){if(n!==this.rebuildToken)return;const i=new lt,a=Rt(e.x,e.z,Et);i.position.set(e.x,a,e.z),i.userData.nodeId=e.id;const{root:s,crystal:o}=await M0(e,e.id===this.currentId);if(n!==this.rebuildToken){Jn(s);return}i.add(s),o.userData.nodeId=e.id,this.pickables.push(o);const u=R0(e.name,e.unlocked);i.add(u),e.unlocked||rl(i),this.nodeGroups.set(e.id,i),this.scene.add(i),this.updateDynamicLightBudget(!0)}}bindEvents(){this.renderer.domElement.addEventListener("pointerdown",this.onPointerDown),window.addEventListener("keydown",this.onKeyDown),window.addEventListener("resize",this.onResize),typeof ResizeObserver<"u"&&(this.resizeObserver=new ResizeObserver(this.onResize),this.resizeObserver.observe(this.container)),document.addEventListener("visibilitychange",this.onVisibilityChange)}updateProximity(){var i,a;let n=null,e=cl;for(const s of this.nodes){if(!s.unlocked)continue;const o=this.player.position.x-s.x,u=this.player.position.z-s.z,f=Math.hypot(o,u);f<e&&(e=f,n=s)}(n==null?void 0:n.id)!==((i=this.nearNode)==null?void 0:i.id)&&(this.nearNode=n,(a=this.onProximity)==null||a.call(this,n))}updatePickupProximity(){var i,a;let n=null,e=Z0;for(const s of this.pickupData){if(s.collected)continue;const o=this.player.position.x-s.x,u=this.player.position.z-s.z,f=Math.hypot(o,u);f<e&&(e=f,n=s)}(n==null?void 0:n.id)!==((i=this.nearPickup)==null?void 0:i.id)&&(this.nearPickup=n,(a=this.onPickupNear)==null||a.call(this,n))}tickScene(n,e){var f,r,m,_;if(this.updateDynamicLightBudget(),this.waterFrame++,this.sun){const h=n*.03,v=Math.sin(h)*72,p=36+Math.cos(h)*46;this.sun.position.set(v,Math.max(5,p),35);const d=In.clamp((p+8)/90,.18,1),c=Nt(this.activeWorldId);if(this.sun.intensity=this.currentBiome.sunIntensity*(c?.9+d*.2:.55+d*.35),this.renderer.toneMappingExposure=c?1.06+d*.12:1+d*.11,this.hemi&&(this.hemi.intensity=c?.6+d*.2:.46+d*.26),this.sunDisc){this.sunDirV.set(v,Math.max(5,p),this.sun.position.z).normalize(),this.sunDisc.position.copy(this.camera.position).addScaledVector(this.sunDirV,480);const l=c?this.currentBiome.sunFocusedDiscOpacity??this.currentBiome.sunDiscOpacity??1:this.currentBiome.sunDiscOpacity??1;this.sunDisc.material.opacity=In.clamp(d*1.2*l,0,1)}}this.grassUniforms&&(this.grassUniforms.uTime.value=n,this.grassUniforms.uPlayer.value.copy(this.player.position)),this.updateGrassPlacement(),this.clouds&&(this.clouds.rotation.y=n*.006),(f=this.unitLandscape)==null||f.traverse(h=>{var p,d;const v=h;if((p=v.userData)!=null&&p.isLandscapeRing&&(v.rotation.y+=e*.42),(d=v.userData)!=null&&d.isLandscapeBeacon){v.userData.landscapeBaseY===void 0&&(v.userData.landscapeBaseY=v.position.y);const c=v.userData.landscapeBaseY;v.position.y=c+Math.sin(n*1.5+v.position.x*.08)*.24}});for(const[h,v]of this.pickupMeshes){const p=((r=this.nearPickup)==null?void 0:r.id)===h,d=v.userData.baseY??v.position.y;if(v.userData.dying){v.userData.dieTimer=(v.userData.dieTimer??0)+e*1.4;const c=v.userData.dieTimer;v.scale.setScalar(1-c*.9),v.position.y=d+c*3,v.traverse(l=>{const g=l;g.material&&"opacity"in g.material&&(g.material.opacity*=.85)}),c>=1&&((m=this.pickupGroup)==null||m.remove(v),this.disposePickupResources(v),this.pickupMeshes.delete(h));continue}v.position.y=d+Math.sin(n*1.4+h.length*.5)*.28,v.traverse(c=>{var g,E,x,R,T;const l=c;if((g=l.userData)!=null&&g.isOrbCore){l.rotation.y=n*.8+h.length;const w=p?1+Math.sin(n*4)*.15:1+Math.sin(n*2)*.06;l.scale.setScalar(w);const S=l.material;S.emissiveIntensity=p?3.5+Math.sin(n*5)*.8:1.8+Math.sin(n*2)*.3}if((E=l.userData)!=null&&E.isOrbGlow&&(l.material.opacity=p?.42+Math.sin(n*3)*.15:.18+Math.sin(n*1.5)*.06),(x=l.userData)!=null&&x.isOrbRing&&(l.rotation.z=n*1.2+h.length*.3,l.rotation.x=Math.PI/3+Math.sin(n*.5)*.2,l.material.opacity=p?.8:.45),(R=l.userData)!=null&&R.isOrbLight){const w=l;w.intensity=p?1.4+Math.sin(n*4)*.4:.6+Math.sin(n*2)*.1}if((T=l.userData)!=null&&T.isWordSprite){const w=l;w.material.opacity=p?1:.72+Math.sin(n*1.2)*.12}})}for(const[h,v]of this.nodeGroups){const p=((_=this.nearNode)==null?void 0:_.id)===h;v.traverse(d=>{var l,g,E,x;const c=d;if((l=c.userData)!=null&&l.isSignpost&&(c.visible=!p),(g=c.userData)!=null&&g.isCrystal&&(c.userData.baseY===void 0&&(c.userData.baseY=c.position.y),c.rotation.y=n*.6+h.length*.3,c.position.y=c.userData.baseY+Math.sin(n*1.8+h.length)*(p?.28:.15)),(E=c.userData)!=null&&E.isPulse){const R=1+Math.sin(n*3)*.08;c.scale.set(R,R,R),c.material.opacity=.35+Math.sin(n*3)*.2}(x=c.userData)!=null&&x.isDueRing&&(c.material.opacity=.28+Math.sin(n*2.4+h.length)*.18)})}const i=this.player.position.x,a=this.player.position.z,s=90,o=s*s;for(const h of this.waterMeshes){h.userData.baseY===void 0&&(h.userData.baseY=h.position.y);const v=h.userData.baseOpacity??.68,p=h.position.x-i,d=h.position.z-a,l=p*p+d*d<o;if(h.position.y=h.userData.baseY+Math.sin(n*.9+h.position.x*.03)*.04,h.material.opacity=v+Math.sin(n*.7)*Math.min(.08,v*.12),!l||this.waterFrame%2!==0)continue;const g=h.geometry,E=g.attributes.position;h.userData.flat||(h.userData.flat=Float32Array.from(E.array));const x=h.userData.flat;for(let R=0;R<E.count;R++){const T=x[R*3],w=x[R*3+1];E.setZ(R,Math.sin(T*.22+n*1.7)*.12+Math.cos(w*.27+n*1.25)*.1)}E.needsUpdate=!0,g.computeVertexNormals()}const u=this.qcfg.reflectDist*this.qcfg.reflectDist;for(const h of this.reflectors){const v=h.position.x-i,p=h.position.z-a;h.visible=v*v+p*p<u}}}export{nm as World3D};
