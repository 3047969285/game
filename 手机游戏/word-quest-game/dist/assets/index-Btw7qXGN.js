var Iu=Object.defineProperty;var Lu=(t,n,e)=>n in t?Iu(t,n,{enumerable:!0,configurable:!0,writable:!0,value:e}):t[n]=e;var Z=(t,n,e)=>Lu(t,typeof n!="symbol"?n+"":n,e);import{U as Rn,c as Nu,N as Io,S as yt,C as oe,M as at,R as ku,e as Wt,w as Rt,V as un,l as H0,F as vd,W as V0,a as wn,b as Xt,L as Yn,H as Cn,D as qe,B as Dn,d as Js,f as X,p as Uu,g as Ui,h as ei,i as V,j as jt,O as Fa,P as Ys,k as Ye,m as Tt,n as ti,o as Jt,q as xd,r as Bt,E as Fu,A as Ou,s as tr,t as ot,u as kn,v as bs,x as ni,y as oi,z as Ps,G as zu,I as Ls,J as si,K as en,Q as Cs,T as nn,X as vn,Y as Oa,Z as lt,_ as _o,$ as Bu,a0 as io,a1 as W0,a2 as Gu,a3 as Hu,a4 as zo,a5 as Vu,a6 as Wu,a7 as Xu,a8 as Ku,a9 as qu,aa as Yu,ab as $u,ac as ju,ad as Ir,ae as Lr,af as Zu,ag as Qu,ah as Ju,ai as eh,aj as Ti,ak as _d,al as Hn,am as ha,an as Ei,ao as Md,ap as go,aq as th,ar as nh,as as e0,at as oh,au as t0,av as sh,aw as ih,ax as ah,ay as wt,az as rh,aA as wd,aB as bd,aC as Pi,aD as Sd,aE as Ai,aF as is,aG as ch,aH as yd,aI as Td,aJ as Ed,aK as wa,aL as Ad,aM as Rd,aN as Pd,aO as Qe,aP as lh,aQ as dh,aR as fh,aS as uh,aT as Cd,aU as hh,aV as ph,aW as Dd,aX as nr,aY as or,aZ as sr,a_ as ir,a$ as X0,b0 as K0,b1 as q0,b2 as Y0,b3 as $0,b4 as j0,b5 as Z0,b6 as Q0,b7 as J0,b8 as Nr,b9 as ec,ba as tc,bb as nc,bc as oc,bd as sc,be as ic,bf as ac,bg as rc,bh as cc,bi as lc,bj as dc,bk as fc,bl as uc,bm as hc,bn as pc,bo as mc,bp as gc,bq as vc,br as xc,bs as _c,bt as kr,bu as Mc,bv as mh,bw as gh,bx as vh,by as xh,bz as _h,bA as Mh,bB as wh,bC as bh,bD as wc,bE as Sh,bF as pa,bG as Id,bH as bc,bI as Sc,bJ as ys,bK as za,bL as Po,bM as yc,bN as yh,bO as Ld,bP as Ur,bQ as Nd,bR as Th,bS as n0,bT as o0,bU as Ba,bV as s0,bW as i0,bX as a0,bY as r0,bZ as Tc,b_ as kd,b$ as ar,c0 as rr,c1 as Ud,c2 as Fd,c3 as Ec,c4 as Bn,c5 as Eh,c6 as Ah,c7 as Rh,c8 as Ph,c9 as Ch,ca as Dh,cb as Fr,cc as Ih,cd as Lh,ce as Nh,cf as kh,cg as Or,ch as Od,ci as Zt,cj as ge,ck as bn,cl as Uh,cm as bt,cn as we,co as Ds,cp as Se,cq as Xe,cr as _n,cs as fs,ct as fn,cu as ii,cv as xt,cw as ro,cx as Ga,cy as Ns,cz as Fh,cA as Oh,cB as zh,cC as Bh,cD as Ci,cE as zd,cF as c0,cG as zr,cH as Gn,cI as Gh,cJ as Wi,cK as Hh,cL as Vh,cM as Wh,cN as ma,cO as cr,cP as Xh,cQ as Kh,cR as qh,cS as Yh,cT as $h,cU as jh,cV as ga,cW as Zh,cX as Qh,cY as Jh,cZ as e1,c_ as Bd,c$ as t1,d0 as Ac,d1 as Rc,d2 as Pc,d3 as n1,d4 as Gd,d5 as Hd,d6 as he,d7 as Mo,d8 as Xi,d9 as o1,da as Tn,db as Fn,dc as Qi,dd as Vn,de as Zn,df as l0,dg as Cc,dh as s1,di as Co,dj as i1,dk as ba,dl as Vd,dm as a1,dn as r1,dp as Ot,dq as It,dr as Ks,ds as qs,dt as Wd,du as Xd,dv as c1,dw as Dc,dx as lr,dy as mi,dz as l1,dA as gi,dB as In,dC as d1,dD as Zo,dE as f1,dF as u1,dG as Qo,dH as Ic,dI as dr,dJ as h1,dK as p1}from"./index-B_NiGr1X.js";/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function Kd(){let t=null,n=!1,e=null,o=null;function s(i,a){e(i,a),o=t.requestAnimationFrame(s)}return{start:function(){n!==!0&&e!==null&&t!==null&&(o=t.requestAnimationFrame(s),n=!0)},stop:function(){t!==null&&t.cancelAnimationFrame(o),n=!1},setAnimationLoop:function(i){e=i},setContext:function(i){t=i}}}function m1(t){const n=new WeakMap;function e(r,c){const l=r.array,d=r.usage,f=l.byteLength,u=t.createBuffer();t.bindBuffer(c,u),t.bufferData(c,l,d),r.onUploadCallback();let h;if(l instanceof Float32Array)h=t.FLOAT;else if(typeof Float16Array<"u"&&l instanceof Float16Array)h=t.HALF_FLOAT;else if(l instanceof Uint16Array)r.isFloat16BufferAttribute?h=t.HALF_FLOAT:h=t.UNSIGNED_SHORT;else if(l instanceof Int16Array)h=t.SHORT;else if(l instanceof Uint32Array)h=t.UNSIGNED_INT;else if(l instanceof Int32Array)h=t.INT;else if(l instanceof Int8Array)h=t.BYTE;else if(l instanceof Uint8Array)h=t.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)h=t.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:u,type:h,bytesPerElement:l.BYTES_PER_ELEMENT,version:r.version,size:f}}function o(r,c,l){const d=c.array,f=c.updateRanges;if(t.bindBuffer(l,r),f.length===0)t.bufferSubData(l,0,d);else{f.sort((h,p)=>h.start-p.start);let u=0;for(let h=1;h<f.length;h++){const p=f[u],x=f[h];x.start<=p.start+p.count+1?p.count=Math.max(p.count,x.start+x.count-p.start):(++u,f[u]=x)}f.length=u+1;for(let h=0,p=f.length;h<p;h++){const x=f[h];t.bufferSubData(l,x.start*d.BYTES_PER_ELEMENT,d,x.start,x.count)}c.clearUpdateRanges()}c.onUploadCallback()}function s(r){return r.isInterleavedBufferAttribute&&(r=r.data),n.get(r)}function i(r){r.isInterleavedBufferAttribute&&(r=r.data);const c=n.get(r);c&&(t.deleteBuffer(c.buffer),n.delete(r))}function a(r,c){if(r.isInterleavedBufferAttribute&&(r=r.data),r.isGLBufferAttribute){const d=n.get(r);(!d||d.version<r.version)&&n.set(r,{buffer:r.buffer,type:r.type,bytesPerElement:r.elementSize,version:r.version});return}const l=n.get(r);if(l===void 0)n.set(r,e(r,c));else if(l.version<r.version){if(l.size!==r.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");o(l.buffer,r,c),l.version=r.version}}return{get:s,remove:i,update:a}}var g1=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,v1=`#ifdef USE_ALPHAHASH
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
#endif`,x1=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,_1=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,M1=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,w1=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,b1=`#ifdef USE_AOMAP
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
#endif`,S1=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,y1=`#ifdef USE_BATCHING
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
#endif`,T1=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,E1=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,A1=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,R1=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,P1=`#ifdef USE_IRIDESCENCE
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
#endif`,C1=`#ifdef USE_BUMPMAP
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
#endif`,D1=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,I1=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,L1=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,N1=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,k1=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,U1=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,F1=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,O1=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,z1=`#define PI 3.141592653589793
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
} // validated`,B1=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,G1=`vec3 transformedNormal = objectNormal;
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
#endif`,H1=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,V1=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,W1=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,X1=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,K1="gl_FragColor = linearToOutputTexel( gl_FragColor );",q1=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Y1=`#ifdef USE_ENVMAP
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
#endif`,$1=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,j1=`#ifdef USE_ENVMAP
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
#endif`,Z1=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Q1=`#ifdef USE_ENVMAP
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
#endif`,J1=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,ep=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,tp=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,np=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,op=`#ifdef USE_GRADIENTMAP
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
}`,sp=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,ip=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,ap=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,rp=`uniform bool receiveShadow;
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
#include <lightprobes_pars_fragment>`,cp=`#ifdef USE_ENVMAP
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
#endif`,lp=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,dp=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,fp=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,up=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,hp=`PhysicalMaterial material;
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
#endif`,pp=`uniform sampler2D dfgLUT;
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
}`,mp=`
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
#endif`,gp=`#if defined( RE_IndirectDiffuse )
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
#endif`,vp=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,xp=`#ifdef USE_LIGHT_PROBES_GRID
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
#endif`,_p=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Mp=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,wp=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,bp=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Sp=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,yp=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Tp=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Ep=`#if defined( USE_POINTS_UV )
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
#endif`,Ap=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Rp=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Pp=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Cp=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Dp=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Ip=`#ifdef USE_MORPHTARGETS
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
#endif`,Lp=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Np=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,kp=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,Up=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Fp=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Op=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,zp=`#ifdef USE_NORMALMAP
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
#endif`,Bp=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Gp=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Hp=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Vp=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Wp=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Xp=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,Kp=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,qp=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Yp=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,$p=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,jp=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Zp=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Qp=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Jp=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,e2=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,t2=`float getShadowMask() {
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
}`,n2=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,o2=`#ifdef USE_SKINNING
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
#endif`,s2=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,i2=`#ifdef USE_SKINNING
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
#endif`,a2=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,r2=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,c2=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,l2=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,d2=`#ifdef USE_TRANSMISSION
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
#endif`,f2=`#ifdef USE_TRANSMISSION
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
#endif`,u2=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,h2=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,p2=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,m2=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const g2=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,v2=`uniform sampler2D t2D;
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
}`,x2=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,_2=`#ifdef ENVMAP_TYPE_CUBE
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
}`,M2=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,w2=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,b2=`#include <common>
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
}`,S2=`#if DEPTH_PACKING == 3200
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
}`,y2=`#define DISTANCE
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
}`,T2=`#define DISTANCE
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
}`,E2=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,A2=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,R2=`uniform float scale;
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
}`,P2=`uniform vec3 diffuse;
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
}`,C2=`#include <common>
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
}`,D2=`uniform vec3 diffuse;
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
}`,I2=`#define LAMBERT
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
}`,L2=`#define LAMBERT
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
}`,N2=`#define MATCAP
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
}`,k2=`#define MATCAP
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
}`,U2=`#define NORMAL
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
}`,F2=`#define NORMAL
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
}`,O2=`#define PHONG
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
}`,z2=`#define PHONG
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
}`,B2=`#define STANDARD
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
}`,G2=`#define STANDARD
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
}`,H2=`#define TOON
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
}`,V2=`#define TOON
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
}`,W2=`uniform float size;
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
}`,X2=`uniform vec3 diffuse;
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
}`,K2=`#include <common>
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
}`,q2=`uniform vec3 color;
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
}`,Y2=`uniform float rotation;
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
}`,$2=`uniform vec3 diffuse;
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
}`,ct={alphahash_fragment:g1,alphahash_pars_fragment:v1,alphamap_fragment:x1,alphamap_pars_fragment:_1,alphatest_fragment:M1,alphatest_pars_fragment:w1,aomap_fragment:b1,aomap_pars_fragment:S1,batching_pars_vertex:y1,batching_vertex:T1,begin_vertex:E1,beginnormal_vertex:A1,bsdfs:R1,iridescence_fragment:P1,bumpmap_pars_fragment:C1,clipping_planes_fragment:D1,clipping_planes_pars_fragment:I1,clipping_planes_pars_vertex:L1,clipping_planes_vertex:N1,color_fragment:k1,color_pars_fragment:U1,color_pars_vertex:F1,color_vertex:O1,common:z1,cube_uv_reflection_fragment:B1,defaultnormal_vertex:G1,displacementmap_pars_vertex:H1,displacementmap_vertex:V1,emissivemap_fragment:W1,emissivemap_pars_fragment:X1,colorspace_fragment:K1,colorspace_pars_fragment:q1,envmap_fragment:Y1,envmap_common_pars_fragment:$1,envmap_pars_fragment:j1,envmap_pars_vertex:Z1,envmap_physical_pars_fragment:cp,envmap_vertex:Q1,fog_vertex:J1,fog_pars_vertex:ep,fog_fragment:tp,fog_pars_fragment:np,gradientmap_pars_fragment:op,lightmap_pars_fragment:sp,lights_lambert_fragment:ip,lights_lambert_pars_fragment:ap,lights_pars_begin:rp,lights_toon_fragment:lp,lights_toon_pars_fragment:dp,lights_phong_fragment:fp,lights_phong_pars_fragment:up,lights_physical_fragment:hp,lights_physical_pars_fragment:pp,lights_fragment_begin:mp,lights_fragment_maps:gp,lights_fragment_end:vp,lightprobes_pars_fragment:xp,logdepthbuf_fragment:_p,logdepthbuf_pars_fragment:Mp,logdepthbuf_pars_vertex:wp,logdepthbuf_vertex:bp,map_fragment:Sp,map_pars_fragment:yp,map_particle_fragment:Tp,map_particle_pars_fragment:Ep,metalnessmap_fragment:Ap,metalnessmap_pars_fragment:Rp,morphinstance_vertex:Pp,morphcolor_vertex:Cp,morphnormal_vertex:Dp,morphtarget_pars_vertex:Ip,morphtarget_vertex:Lp,normal_fragment_begin:Np,normal_fragment_maps:kp,normal_pars_fragment:Up,normal_pars_vertex:Fp,normal_vertex:Op,normalmap_pars_fragment:zp,clearcoat_normal_fragment_begin:Bp,clearcoat_normal_fragment_maps:Gp,clearcoat_pars_fragment:Hp,iridescence_pars_fragment:Vp,opaque_fragment:Wp,packing:Xp,premultiplied_alpha_fragment:Kp,project_vertex:qp,dithering_fragment:Yp,dithering_pars_fragment:$p,roughnessmap_fragment:jp,roughnessmap_pars_fragment:Zp,shadowmap_pars_fragment:Qp,shadowmap_pars_vertex:Jp,shadowmap_vertex:e2,shadowmask_pars_fragment:t2,skinbase_vertex:n2,skinning_pars_vertex:o2,skinning_vertex:s2,skinnormal_vertex:i2,specularmap_fragment:a2,specularmap_pars_fragment:r2,tonemapping_fragment:c2,tonemapping_pars_fragment:l2,transmission_fragment:d2,transmission_pars_fragment:f2,uv_pars_fragment:u2,uv_pars_vertex:h2,uv_vertex:p2,worldpos_vertex:m2,background_vert:g2,background_frag:v2,backgroundCube_vert:x2,backgroundCube_frag:_2,cube_vert:M2,cube_frag:w2,depth_vert:b2,depth_frag:S2,distance_vert:y2,distance_frag:T2,equirect_vert:E2,equirect_frag:A2,linedashed_vert:R2,linedashed_frag:P2,meshbasic_vert:C2,meshbasic_frag:D2,meshlambert_vert:I2,meshlambert_frag:L2,meshmatcap_vert:N2,meshmatcap_frag:k2,meshnormal_vert:U2,meshnormal_frag:F2,meshphong_vert:O2,meshphong_frag:z2,meshphysical_vert:B2,meshphysical_frag:G2,meshtoon_vert:H2,meshtoon_frag:V2,points_vert:W2,points_frag:X2,shadow_vert:K2,shadow_frag:q2,sprite_vert:Y2,sprite_frag:$2},Pe={common:{diffuse:{value:new oe(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new wt},alphaMap:{value:null},alphaMapTransform:{value:new wt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new wt}},envmap:{envMap:{value:null},envMapRotation:{value:new wt},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new wt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new wt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new wt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new wt},normalScale:{value:new ot(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new wt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new wt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new wt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new wt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new oe(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new X},probesMax:{value:new X},probesResolution:{value:new X}},points:{diffuse:{value:new oe(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new wt},alphaTest:{value:0},uvTransform:{value:new wt}},sprite:{diffuse:{value:new oe(16777215)},opacity:{value:1},center:{value:new ot(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new wt},alphaMap:{value:null},alphaMapTransform:{value:new wt},alphaTest:{value:0}}},Ro={basic:{uniforms:Bn([Pe.common,Pe.specularmap,Pe.envmap,Pe.aomap,Pe.lightmap,Pe.fog]),vertexShader:ct.meshbasic_vert,fragmentShader:ct.meshbasic_frag},lambert:{uniforms:Bn([Pe.common,Pe.specularmap,Pe.envmap,Pe.aomap,Pe.lightmap,Pe.emissivemap,Pe.bumpmap,Pe.normalmap,Pe.displacementmap,Pe.fog,Pe.lights,{emissive:{value:new oe(0)},envMapIntensity:{value:1}}]),vertexShader:ct.meshlambert_vert,fragmentShader:ct.meshlambert_frag},phong:{uniforms:Bn([Pe.common,Pe.specularmap,Pe.envmap,Pe.aomap,Pe.lightmap,Pe.emissivemap,Pe.bumpmap,Pe.normalmap,Pe.displacementmap,Pe.fog,Pe.lights,{emissive:{value:new oe(0)},specular:{value:new oe(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:ct.meshphong_vert,fragmentShader:ct.meshphong_frag},standard:{uniforms:Bn([Pe.common,Pe.envmap,Pe.aomap,Pe.lightmap,Pe.emissivemap,Pe.bumpmap,Pe.normalmap,Pe.displacementmap,Pe.roughnessmap,Pe.metalnessmap,Pe.fog,Pe.lights,{emissive:{value:new oe(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:ct.meshphysical_vert,fragmentShader:ct.meshphysical_frag},toon:{uniforms:Bn([Pe.common,Pe.aomap,Pe.lightmap,Pe.emissivemap,Pe.bumpmap,Pe.normalmap,Pe.displacementmap,Pe.gradientmap,Pe.fog,Pe.lights,{emissive:{value:new oe(0)}}]),vertexShader:ct.meshtoon_vert,fragmentShader:ct.meshtoon_frag},matcap:{uniforms:Bn([Pe.common,Pe.bumpmap,Pe.normalmap,Pe.displacementmap,Pe.fog,{matcap:{value:null}}]),vertexShader:ct.meshmatcap_vert,fragmentShader:ct.meshmatcap_frag},points:{uniforms:Bn([Pe.points,Pe.fog]),vertexShader:ct.points_vert,fragmentShader:ct.points_frag},dashed:{uniforms:Bn([Pe.common,Pe.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:ct.linedashed_vert,fragmentShader:ct.linedashed_frag},depth:{uniforms:Bn([Pe.common,Pe.displacementmap]),vertexShader:ct.depth_vert,fragmentShader:ct.depth_frag},normal:{uniforms:Bn([Pe.common,Pe.bumpmap,Pe.normalmap,Pe.displacementmap,{opacity:{value:1}}]),vertexShader:ct.meshnormal_vert,fragmentShader:ct.meshnormal_frag},sprite:{uniforms:Bn([Pe.sprite,Pe.fog]),vertexShader:ct.sprite_vert,fragmentShader:ct.sprite_frag},background:{uniforms:{uvTransform:{value:new wt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:ct.background_vert,fragmentShader:ct.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new wt}},vertexShader:ct.backgroundCube_vert,fragmentShader:ct.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:ct.cube_vert,fragmentShader:ct.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:ct.equirect_vert,fragmentShader:ct.equirect_frag},distance:{uniforms:Bn([Pe.common,Pe.displacementmap,{referencePosition:{value:new X},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:ct.distance_vert,fragmentShader:ct.distance_frag},shadow:{uniforms:Bn([Pe.lights,Pe.fog,{color:{value:new oe(0)},opacity:{value:1}}]),vertexShader:ct.shadow_vert,fragmentShader:ct.shadow_frag}};Ro.physical={uniforms:Bn([Ro.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new wt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new wt},clearcoatNormalScale:{value:new ot(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new wt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new wt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new wt},sheen:{value:0},sheenColor:{value:new oe(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new wt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new wt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new wt},transmissionSamplerSize:{value:new ot},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new wt},attenuationDistance:{value:0},attenuationColor:{value:new oe(0)},specularColor:{value:new oe(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new wt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new wt},anisotropyVector:{value:new ot},anisotropyMap:{value:null},anisotropyMapTransform:{value:new wt}}]),vertexShader:ct.meshphysical_vert,fragmentShader:ct.meshphysical_frag};const Ji={r:0,b:0,g:0},j2=new at,qd=new wt;qd.set(-1,0,0,0,1,0,0,0,1);function Z2(t,n,e,o,s,i){const a=new oe(0);let r=s===!0?0:1,c,l,d=null,f=0,u=null;function h(v){let w=v.isScene===!0?v.background:null;if(w&&w.isTexture){const M=v.backgroundBlurriness>0;w=n.get(w,M)}return w}function p(v){let w=!1;const M=h(v);M===null?m(a,r):M&&M.isColor&&(m(M,1),w=!0);const y=t.xr.getEnvironmentBlendMode();y==="additive"?e.buffers.color.setClear(0,0,0,1,i):y==="alpha-blend"&&e.buffers.color.setClear(0,0,0,0,i),(t.autoClear||w)&&(e.buffers.depth.setTest(!0),e.buffers.depth.setMask(!0),e.buffers.color.setMask(!0),t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil))}function x(v,w){const M=h(w);M&&(M.isCubeTexture||M.mapping===Oa)?(l===void 0&&(l=new V(new Ye(1,1,1),new nn({name:"BackgroundCubeMaterial",uniforms:Ur(Ro.backgroundCube.uniforms),vertexShader:Ro.backgroundCube.vertexShader,fragmentShader:Ro.backgroundCube.fragmentShader,side:Dn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),l.geometry.deleteAttribute("uv"),l.onBeforeRender=function(y,b,T){this.matrixWorld.copyPosition(T.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),o.update(l)),l.material.uniforms.envMap.value=M,l.material.uniforms.backgroundBlurriness.value=w.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=w.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4(j2.makeRotationFromEuler(w.backgroundRotation)).transpose(),M.isCubeTexture&&M.isRenderTargetTexture===!1&&l.material.uniforms.backgroundRotation.value.premultiply(qd),l.material.toneMapped=Xt.getTransfer(M.colorSpace)!==Bt,(d!==M||f!==M.version||u!==t.toneMapping)&&(l.material.needsUpdate=!0,d=M,f=M.version,u=t.toneMapping),l.layers.enableAll(),v.unshift(l,l.geometry,l.material,0,0,null)):M&&M.isTexture&&(c===void 0&&(c=new V(new Qe(2,2),new nn({name:"BackgroundMaterial",uniforms:Ur(Ro.background.uniforms),vertexShader:Ro.background.vertexShader,fragmentShader:Ro.background.fragmentShader,side:Js,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),o.update(c)),c.material.uniforms.t2D.value=M,c.material.uniforms.backgroundIntensity.value=w.backgroundIntensity,c.material.toneMapped=Xt.getTransfer(M.colorSpace)!==Bt,M.matrixAutoUpdate===!0&&M.updateMatrix(),c.material.uniforms.uvTransform.value.copy(M.matrix),(d!==M||f!==M.version||u!==t.toneMapping)&&(c.material.needsUpdate=!0,d=M,f=M.version,u=t.toneMapping),c.layers.enableAll(),v.unshift(c,c.geometry,c.material,0,0,null))}function m(v,w){v.getRGB(Ji,Ld(t)),e.buffers.color.setClear(Ji.r,Ji.g,Ji.b,w,i)}function g(){l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return a},setClearColor:function(v,w=1){a.set(v),r=w,m(a,r)},getClearAlpha:function(){return r},setClearAlpha:function(v){r=v,m(a,r)},render:p,addToRenderList:x,dispose:g}}function Q2(t,n){const e=t.getParameter(t.MAX_VERTEX_ATTRIBS),o={},s=u(null);let i=s,a=!1;function r(A,R,C,I,L){let N=!1;const U=f(A,I,C,R);i!==U&&(i=U,l(i.object)),N=h(A,I,C,L),N&&p(A,I,C,L),L!==null&&n.update(L,t.ELEMENT_ARRAY_BUFFER),(N||a)&&(a=!1,M(A,R,C,I),L!==null&&t.bindBuffer(t.ELEMENT_ARRAY_BUFFER,n.get(L).buffer))}function c(){return t.createVertexArray()}function l(A){return t.bindVertexArray(A)}function d(A){return t.deleteVertexArray(A)}function f(A,R,C,I){const L=I.wireframe===!0;let N=o[R.id];N===void 0&&(N={},o[R.id]=N);const U=A.isInstancedMesh===!0?A.id:0;let F=N[U];F===void 0&&(F={},N[U]=F);let z=F[C.id];z===void 0&&(z={},F[C.id]=z);let G=z[L];return G===void 0&&(G=u(c()),z[L]=G),G}function u(A){const R=[],C=[],I=[];for(let L=0;L<e;L++)R[L]=0,C[L]=0,I[L]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:R,enabledAttributes:C,attributeDivisors:I,object:A,attributes:{},index:null}}function h(A,R,C,I){const L=i.attributes,N=R.attributes;let U=0;const F=C.getAttributes();for(const z in F)if(F[z].location>=0){const O=L[z];let B=N[z];if(B===void 0&&(z==="instanceMatrix"&&A.instanceMatrix&&(B=A.instanceMatrix),z==="instanceColor"&&A.instanceColor&&(B=A.instanceColor)),O===void 0||O.attribute!==B||B&&O.data!==B.data)return!0;U++}return i.attributesNum!==U||i.index!==I}function p(A,R,C,I){const L={},N=R.attributes;let U=0;const F=C.getAttributes();for(const z in F)if(F[z].location>=0){let O=N[z];O===void 0&&(z==="instanceMatrix"&&A.instanceMatrix&&(O=A.instanceMatrix),z==="instanceColor"&&A.instanceColor&&(O=A.instanceColor));const B={};B.attribute=O,O&&O.data&&(B.data=O.data),L[z]=B,U++}i.attributes=L,i.attributesNum=U,i.index=I}function x(){const A=i.newAttributes;for(let R=0,C=A.length;R<C;R++)A[R]=0}function m(A){g(A,0)}function g(A,R){const C=i.newAttributes,I=i.enabledAttributes,L=i.attributeDivisors;C[A]=1,I[A]===0&&(t.enableVertexAttribArray(A),I[A]=1),L[A]!==R&&(t.vertexAttribDivisor(A,R),L[A]=R)}function v(){const A=i.newAttributes,R=i.enabledAttributes;for(let C=0,I=R.length;C<I;C++)R[C]!==A[C]&&(t.disableVertexAttribArray(C),R[C]=0)}function w(A,R,C,I,L,N,U){U===!0?t.vertexAttribIPointer(A,R,C,L,N):t.vertexAttribPointer(A,R,C,I,L,N)}function M(A,R,C,I){x();const L=I.attributes,N=C.getAttributes(),U=R.defaultAttributeValues;for(const F in N){const z=N[F];if(z.location>=0){let G=L[F];if(G===void 0&&(F==="instanceMatrix"&&A.instanceMatrix&&(G=A.instanceMatrix),F==="instanceColor"&&A.instanceColor&&(G=A.instanceColor)),G!==void 0){const O=G.normalized,B=G.itemSize,J=n.get(G);if(J===void 0)continue;const ue=J.buffer,xe=J.type,j=J.bytesPerElement,ie=xe===t.INT||xe===t.UNSIGNED_INT||G.gpuType===Cd;if(G.isInterleavedBufferAttribute){const ne=G.data,ye=ne.stride,Ie=G.offset;if(ne.isInstancedInterleavedBuffer){for(let Fe=0;Fe<z.locationSize;Fe++)g(z.location+Fe,ne.meshPerAttribute);A.isInstancedMesh!==!0&&I._maxInstanceCount===void 0&&(I._maxInstanceCount=ne.meshPerAttribute*ne.count)}else for(let Fe=0;Fe<z.locationSize;Fe++)m(z.location+Fe);t.bindBuffer(t.ARRAY_BUFFER,ue);for(let Fe=0;Fe<z.locationSize;Fe++)w(z.location+Fe,B/z.locationSize,xe,O,ye*j,(Ie+B/z.locationSize*Fe)*j,ie)}else{if(G.isInstancedBufferAttribute){for(let ne=0;ne<z.locationSize;ne++)g(z.location+ne,G.meshPerAttribute);A.isInstancedMesh!==!0&&I._maxInstanceCount===void 0&&(I._maxInstanceCount=G.meshPerAttribute*G.count)}else for(let ne=0;ne<z.locationSize;ne++)m(z.location+ne);t.bindBuffer(t.ARRAY_BUFFER,ue);for(let ne=0;ne<z.locationSize;ne++)w(z.location+ne,B/z.locationSize,xe,O,B*j,B/z.locationSize*ne*j,ie)}}else if(U!==void 0){const O=U[F];if(O!==void 0)switch(O.length){case 2:t.vertexAttrib2fv(z.location,O);break;case 3:t.vertexAttrib3fv(z.location,O);break;case 4:t.vertexAttrib4fv(z.location,O);break;default:t.vertexAttrib1fv(z.location,O)}}}}v()}function y(){S();for(const A in o){const R=o[A];for(const C in R){const I=R[C];for(const L in I){const N=I[L];for(const U in N)d(N[U].object),delete N[U];delete I[L]}}delete o[A]}}function b(A){if(o[A.id]===void 0)return;const R=o[A.id];for(const C in R){const I=R[C];for(const L in I){const N=I[L];for(const U in N)d(N[U].object),delete N[U];delete I[L]}}delete o[A.id]}function T(A){for(const R in o){const C=o[R];for(const I in C){const L=C[I];if(L[A.id]===void 0)continue;const N=L[A.id];for(const U in N)d(N[U].object),delete N[U];delete L[A.id]}}}function _(A){for(const R in o){const C=o[R],I=A.isInstancedMesh===!0?A.id:0,L=C[I];if(L!==void 0){for(const N in L){const U=L[N];for(const F in U)d(U[F].object),delete U[F];delete L[N]}delete C[I],Object.keys(C).length===0&&delete o[R]}}}function S(){E(),a=!0,i!==s&&(i=s,l(i.object))}function E(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:r,reset:S,resetDefaultState:E,dispose:y,releaseStatesOfGeometry:b,releaseStatesOfObject:_,releaseStatesOfProgram:T,initAttributes:x,enableAttribute:m,disableUnusedAttributes:v}}function J2(t,n,e){let o;function s(c){o=c}function i(c,l){t.drawArrays(o,c,l),e.update(l,o,1)}function a(c,l,d){d!==0&&(t.drawArraysInstanced(o,c,l,d),e.update(l,o,d))}function r(c,l,d){if(d===0)return;n.get("WEBGL_multi_draw").multiDrawArraysWEBGL(o,c,0,l,0,d);let u=0;for(let h=0;h<d;h++)u+=l[h];e.update(u,o,1)}this.setMode=s,this.render=i,this.renderInstances=a,this.renderMultiDraw=r}function em(t,n,e,o){let s;function i(){if(s!==void 0)return s;if(n.has("EXT_texture_filter_anisotropic")===!0){const T=n.get("EXT_texture_filter_anisotropic");s=t.getParameter(T.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(T){return!(T!==kn&&o.convert(T)!==t.getParameter(t.IMPLEMENTATION_COLOR_READ_FORMAT))}function r(T){const _=T===Cn&&(n.has("EXT_color_buffer_half_float")||n.has("EXT_color_buffer_float"));return!(T!==Rn&&o.convert(T)!==t.getParameter(t.IMPLEMENTATION_COLOR_READ_TYPE)&&T!==is&&!_)}function c(T){if(T==="highp"){if(t.getShaderPrecisionFormat(t.VERTEX_SHADER,t.HIGH_FLOAT).precision>0&&t.getShaderPrecisionFormat(t.FRAGMENT_SHADER,t.HIGH_FLOAT).precision>0)return"highp";T="mediump"}return T==="mediump"&&t.getShaderPrecisionFormat(t.VERTEX_SHADER,t.MEDIUM_FLOAT).precision>0&&t.getShaderPrecisionFormat(t.FRAGMENT_SHADER,t.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=e.precision!==void 0?e.precision:"highp";const d=c(l);d!==l&&(Rt("WebGLRenderer:",l,"not supported, using",d,"instead."),l=d);const f=e.logarithmicDepthBuffer===!0,u=e.reversedDepthBuffer===!0&&n.has("EXT_clip_control");e.reversedDepthBuffer===!0&&u===!1&&Rt("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");const h=t.getParameter(t.MAX_TEXTURE_IMAGE_UNITS),p=t.getParameter(t.MAX_VERTEX_TEXTURE_IMAGE_UNITS),x=t.getParameter(t.MAX_TEXTURE_SIZE),m=t.getParameter(t.MAX_CUBE_MAP_TEXTURE_SIZE),g=t.getParameter(t.MAX_VERTEX_ATTRIBS),v=t.getParameter(t.MAX_VERTEX_UNIFORM_VECTORS),w=t.getParameter(t.MAX_VARYING_VECTORS),M=t.getParameter(t.MAX_FRAGMENT_UNIFORM_VECTORS),y=t.getParameter(t.MAX_SAMPLES),b=t.getParameter(t.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:i,getMaxPrecision:c,textureFormatReadable:a,textureTypeReadable:r,precision:l,logarithmicDepthBuffer:f,reversedDepthBuffer:u,maxTextures:h,maxVertexTextures:p,maxTextureSize:x,maxCubemapSize:m,maxAttributes:g,maxVertexUniforms:v,maxVaryings:w,maxFragmentUniforms:M,maxSamples:y,samples:b}}function tm(t){const n=this;let e=null,o=0,s=!1,i=!1;const a=new rh,r=new wt,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(f,u){const h=f.length!==0||u||o!==0||s;return s=u,o=f.length,h},this.beginShadows=function(){i=!0,d(null)},this.endShadows=function(){i=!1},this.setGlobalState=function(f,u){e=d(f,u,0)},this.setState=function(f,u,h){const p=f.clippingPlanes,x=f.clipIntersection,m=f.clipShadows,g=t.get(f);if(!s||p===null||p.length===0||i&&!m)i?d(null):l();else{const v=i?0:o,w=v*4;let M=g.clippingState||null;c.value=M,M=d(p,u,w,h);for(let y=0;y!==w;++y)M[y]=e[y];g.clippingState=M,this.numIntersection=x?this.numPlanes:0,this.numPlanes+=v}};function l(){c.value!==e&&(c.value=e,c.needsUpdate=o>0),n.numPlanes=o,n.numIntersection=0}function d(f,u,h,p){const x=f!==null?f.length:0;let m=null;if(x!==0){if(m=c.value,p!==!0||m===null){const g=h+x*4,v=u.matrixWorldInverse;r.getNormalMatrix(v),(m===null||m.length<g)&&(m=new Float32Array(g));for(let w=0,M=h;w!==x;++w,M+=4)a.copy(f[w]).applyMatrix4(v,r),a.normal.toArray(m,M),m[M+3]=a.constant}c.value=m,c.needsUpdate=!0}return n.numPlanes=x,n.numIntersection=0,m}}const as=4,Lc=[.125,.215,.35,.446,.526,.582],Ms=20,nm=256,vi=new Fa,Nc=new oe;let fr=null,ur=0,hr=0,pr=!1;const om=new X;class Br{constructor(n){this._renderer=n,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(n,e=0,o=.1,s=100,i={}){const{size:a=256,position:r=om}=i;fr=this._renderer.getRenderTarget(),ur=this._renderer.getActiveCubeFace(),hr=this._renderer.getActiveMipmapLevel(),pr=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);const c=this._allocateTargets();return c.depthBuffer=!0,this._sceneToCubeUV(n,o,s,c,r),e>0&&this._blur(c,0,0,e),this._applyPMREM(c),this._cleanup(c),c}fromEquirectangular(n,e=null){return this._fromTexture(n,e)}fromCubemap(n,e=null){return this._fromTexture(n,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Fc(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Uc(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(n){this._lodMax=Math.floor(Math.log2(n)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let n=0;n<this._lodMeshes.length;n++)this._lodMeshes[n].geometry.dispose()}_cleanup(n){this._renderer.setRenderTarget(fr,ur,hr),this._renderer.xr.enabled=pr,n.scissorTest=!1,Bs(n,0,0,n.width,n.height)}_fromTexture(n,e){n.mapping===Ui||n.mapping===ei?this._setSize(n.image.length===0?16:n.image[0].width||n.image[0].image.width):this._setSize(n.image.width/4),fr=this._renderer.getRenderTarget(),ur=this._renderer.getActiveCubeFace(),hr=this._renderer.getActiveMipmapLevel(),pr=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const o=e||this._allocateTargets();return this._textureToCubeUV(n,o),this._applyPMREM(o),this._cleanup(o),o}_allocateTargets(){const n=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,o={magFilter:en,minFilter:en,generateMipmaps:!1,type:Cn,format:kn,colorSpace:_o,depthBuffer:!1},s=kc(n,e,o);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==n||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=kc(n,e,o);const{_lodMax:i}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=sm(i)),this._blurMaterial=am(i,n,e),this._ggxMaterial=im(i,n,e)}return s}_compileMaterial(n){const e=new V(new jt,n);this._renderer.compile(e,vi)}_sceneToCubeUV(n,e,o,s,i){const c=new Ys(90,1,e,o),l=[1,-1,1,1,1,1],d=[1,1,1,-1,-1,-1],f=this._renderer,u=f.autoClear,h=f.toneMapping;f.getClearColor(Nc),f.toneMapping=Io,f.autoClear=!1,f.state.buffers.depth.getReversed()&&(f.setRenderTarget(s),f.clearDepth(),f.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new V(new Ye,new Tt({name:"PMREM.Background",side:Dn,depthWrite:!1,depthTest:!1})));const x=this._backgroundBox,m=x.material;let g=!1;const v=n.background;v?v.isColor&&(m.color.copy(v),n.background=null,g=!0):(m.color.copy(Nc),g=!0);for(let w=0;w<6;w++){const M=w%3;M===0?(c.up.set(0,l[w],0),c.position.set(i.x,i.y,i.z),c.lookAt(i.x+d[w],i.y,i.z)):M===1?(c.up.set(0,0,l[w]),c.position.set(i.x,i.y,i.z),c.lookAt(i.x,i.y+d[w],i.z)):(c.up.set(0,l[w],0),c.position.set(i.x,i.y,i.z),c.lookAt(i.x,i.y,i.z+d[w]));const y=this._cubeSize;Bs(s,M*y,w>2?y:0,y,y),f.setRenderTarget(s),g&&f.render(x,c),f.render(n,c)}f.toneMapping=h,f.autoClear=u,n.background=v}_textureToCubeUV(n,e){const o=this._renderer,s=n.mapping===Ui||n.mapping===ei;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Fc()),this._cubemapMaterial.uniforms.flipEnvMap.value=n.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Uc());const i=s?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=i;const r=i.uniforms;r.envMap.value=n;const c=this._cubeSize;Bs(e,0,0,3*c,2*c),o.setRenderTarget(e),o.render(a,vi)}_applyPMREM(n){const e=this._renderer,o=e.autoClear;e.autoClear=!1;const s=this._lodMeshes.length;for(let i=1;i<s;i++)this._applyGGXFilter(n,i-1,i);e.autoClear=o}_applyGGXFilter(n,e,o){const s=this._renderer,i=this._pingPongRenderTarget,a=this._ggxMaterial,r=this._lodMeshes[o];r.material=a;const c=a.uniforms,l=o/(this._lodMeshes.length-1),d=e/(this._lodMeshes.length-1),f=Math.sqrt(l*l-d*d),u=0+l*1.25,h=f*u,{_lodMax:p}=this,x=this._sizeLods[o],m=3*x*(o>p-as?o-p+as:0),g=4*(this._cubeSize-x);c.envMap.value=n.texture,c.roughness.value=h,c.mipInt.value=p-e,Bs(i,m,g,3*x,2*x),s.setRenderTarget(i),s.render(r,vi),c.envMap.value=i.texture,c.roughness.value=0,c.mipInt.value=p-o,Bs(n,m,g,3*x,2*x),s.setRenderTarget(n),s.render(r,vi)}_blur(n,e,o,s,i){const a=this._pingPongRenderTarget;this._halfBlur(n,a,e,o,s,"latitudinal",i),this._halfBlur(a,n,o,o,s,"longitudinal",i)}_halfBlur(n,e,o,s,i,a,r){const c=this._renderer,l=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&Wt("blur direction must be either latitudinal or longitudinal!");const d=3,f=this._lodMeshes[s];f.material=l;const u=l.uniforms,h=this._sizeLods[o]-1,p=isFinite(i)?Math.PI/(2*h):2*Math.PI/(2*Ms-1),x=i/p,m=isFinite(i)?1+Math.floor(d*x):Ms;m>Ms&&Rt(`sigmaRadians, ${i}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Ms}`);const g=[];let v=0;for(let T=0;T<Ms;++T){const _=T/x,S=Math.exp(-_*_/2);g.push(S),T===0?v+=S:T<m&&(v+=2*S)}for(let T=0;T<g.length;T++)g[T]=g[T]/v;u.envMap.value=n.texture,u.samples.value=m,u.weights.value=g,u.latitudinal.value=a==="latitudinal",r&&(u.poleAxis.value=r);const{_lodMax:w}=this;u.dTheta.value=p,u.mipInt.value=w-o;const M=this._sizeLods[s],y=3*M*(s>w-as?s-w+as:0),b=4*(this._cubeSize-M);Bs(e,y,b,3*M,2*M),c.setRenderTarget(e),c.render(f,vi)}}function sm(t){const n=[],e=[],o=[];let s=t;const i=t-as+1+Lc.length;for(let a=0;a<i;a++){const r=Math.pow(2,s);n.push(r);let c=1/r;a>t-as?c=Lc[a-t+as-1]:a===0&&(c=0),e.push(c);const l=1/(r-2),d=-l,f=1+l,u=[d,d,f,d,f,f,d,d,f,f,d,f],h=6,p=6,x=3,m=2,g=1,v=new Float32Array(x*p*h),w=new Float32Array(m*p*h),M=new Float32Array(g*p*h);for(let b=0;b<h;b++){const T=b%3*2/3-1,_=b>2?0:-1,S=[T,_,0,T+2/3,_,0,T+2/3,_+1,0,T,_,0,T+2/3,_+1,0,T,_+1,0];v.set(S,x*p*b),w.set(u,m*p*b);const E=[b,b,b,b,b,b];M.set(E,g*p*b)}const y=new jt;y.setAttribute("position",new lt(v,x)),y.setAttribute("uv",new lt(w,m)),y.setAttribute("faceIndex",new lt(M,g)),o.push(new V(y,null)),s>as&&s--}return{lodMeshes:o,sizeLods:n,sigmas:e}}function kc(t,n,e){const o=new wn(t,n,e);return o.texture.mapping=Oa,o.texture.name="PMREM.cubeUv",o.scissorTest=!0,o}function Bs(t,n,e,o,s){t.viewport.set(n,e,o,s),t.scissor.set(n,e,o,s)}function im(t,n,e){return new nn({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:nm,CUBEUV_TEXEL_WIDTH:1/n,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${t}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:Ha(),fragmentShader:`

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
		`,blending:vn,depthTest:!1,depthWrite:!1})}function am(t,n,e){const o=new Float32Array(Ms),s=new X(0,1,0);return new nn({name:"SphericalGaussianBlur",defines:{n:Ms,CUBEUV_TEXEL_WIDTH:1/n,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${t}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:o},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:Ha(),fragmentShader:`

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
		`,blending:vn,depthTest:!1,depthWrite:!1})}function Uc(){return new nn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Ha(),fragmentShader:`

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
		`,blending:vn,depthTest:!1,depthWrite:!1})}function Fc(){return new nn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Ha(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:vn,depthTest:!1,depthWrite:!1})}function Ha(){return`

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
	`}class Yd extends wn{constructor(n=1,e={}){super(n,n,e),this.isWebGLCubeRenderTarget=!0;const o={width:n,height:n,depth:1},s=[o,o,o,o,o,o];this.texture=new Nd(s),this._setTextureOptions(e),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(n,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const o={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new Ye(5,5,5),i=new nn({name:"CubemapFromEquirect",uniforms:Ur(o.uniforms),vertexShader:o.vertexShader,fragmentShader:o.fragmentShader,side:Dn,blending:vn});i.uniforms.tEquirect.value=e;const a=new V(s,i),r=e.minFilter;return e.minFilter===Yn&&(e.minFilter=en),new Th(1,10,this).update(n,a),e.minFilter=r,a.geometry.dispose(),a.material.dispose(),this}clear(n,e=!0,o=!0,s=!0){const i=n.getRenderTarget();for(let a=0;a<6;a++)n.setRenderTarget(this,a),n.clear(e,o,s);n.setRenderTarget(i)}}function rm(t){let n=new WeakMap,e=new WeakMap,o=null;function s(u,h=!1){return u==null?null:h?a(u):i(u)}function i(u){if(u&&u.isTexture){const h=u.mapping;if(h===ar||h===rr)if(n.has(u)){const p=n.get(u).texture;return r(p,u.mapping)}else{const p=u.image;if(p&&p.height>0){const x=new Yd(p.height);return x.fromEquirectangularTexture(t,u),n.set(u,x),u.addEventListener("dispose",l),r(x.texture,u.mapping)}else return null}}return u}function a(u){if(u&&u.isTexture){const h=u.mapping,p=h===ar||h===rr,x=h===Ui||h===ei;if(p||x){let m=e.get(u);const g=m!==void 0?m.texture.pmremVersion:0;if(u.isRenderTargetTexture&&u.pmremVersion!==g)return o===null&&(o=new Br(t)),m=p?o.fromEquirectangular(u,m):o.fromCubemap(u,m),m.texture.pmremVersion=u.pmremVersion,e.set(u,m),m.texture;if(m!==void 0)return m.texture;{const v=u.image;return p&&v&&v.height>0||x&&v&&c(v)?(o===null&&(o=new Br(t)),m=p?o.fromEquirectangular(u):o.fromCubemap(u),m.texture.pmremVersion=u.pmremVersion,e.set(u,m),u.addEventListener("dispose",d),m.texture):null}}}return u}function r(u,h){return h===ar?u.mapping=Ui:h===rr&&(u.mapping=ei),u}function c(u){let h=0;const p=6;for(let x=0;x<p;x++)u[x]!==void 0&&h++;return h===p}function l(u){const h=u.target;h.removeEventListener("dispose",l);const p=n.get(h);p!==void 0&&(n.delete(h),p.dispose())}function d(u){const h=u.target;h.removeEventListener("dispose",d);const p=e.get(h);p!==void 0&&(e.delete(h),p.dispose())}function f(){n=new WeakMap,e=new WeakMap,o!==null&&(o.dispose(),o=null)}return{get:s,dispose:f}}function cm(t){const n={};function e(o){if(n[o]!==void 0)return n[o];const s=t.getExtension(o);return n[o]=s,s}return{has:function(o){return e(o)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(o){const s=e(o);return s===null&&Bu("WebGLRenderer: "+o+" extension not supported."),s}}}function lm(t,n,e,o){const s={},i=new WeakMap;function a(f){const u=f.target;u.index!==null&&n.remove(u.index);for(const p in u.attributes)n.remove(u.attributes[p]);u.removeEventListener("dispose",a),delete s[u.id];const h=i.get(u);h&&(n.remove(h),i.delete(u)),o.releaseStatesOfGeometry(u),u.isInstancedBufferGeometry===!0&&delete u._maxInstanceCount,e.memory.geometries--}function r(f,u){return s[u.id]===!0||(u.addEventListener("dispose",a),s[u.id]=!0,e.memory.geometries++),u}function c(f){const u=f.attributes;for(const h in u)n.update(u[h],t.ARRAY_BUFFER)}function l(f){const u=[],h=f.index,p=f.attributes.position;let x=0;if(p===void 0)return;if(h!==null){const v=h.array;x=h.version;for(let w=0,M=v.length;w<M;w+=3){const y=v[w+0],b=v[w+1],T=v[w+2];u.push(y,b,b,T,T,y)}}else{const v=p.array;x=p.version;for(let w=0,M=v.length/3-1;w<M;w+=3){const y=w+0,b=w+1,T=w+2;u.push(y,b,b,T,T,y)}}const m=new(p.count>=65535?Ud:Fd)(u,1);m.version=x;const g=i.get(f);g&&n.remove(g),i.set(f,m)}function d(f){const u=i.get(f);if(u){const h=f.index;h!==null&&u.version<h.version&&l(f)}else l(f);return i.get(f)}return{get:r,update:c,getWireframeAttribute:d}}function dm(t,n,e){let o;function s(f){o=f}let i,a;function r(f){i=f.type,a=f.bytesPerElement}function c(f,u){t.drawElements(o,u,i,f*a),e.update(u,o,1)}function l(f,u,h){h!==0&&(t.drawElementsInstanced(o,u,i,f*a,h),e.update(u,o,h))}function d(f,u,h){if(h===0)return;n.get("WEBGL_multi_draw").multiDrawElementsWEBGL(o,u,0,i,f,0,h);let x=0;for(let m=0;m<h;m++)x+=u[m];e.update(x,o,1)}this.setMode=s,this.setIndex=r,this.render=c,this.renderInstances=l,this.renderMultiDraw=d}function fm(t){const n={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function o(i,a,r){switch(e.calls++,a){case t.TRIANGLES:e.triangles+=r*(i/3);break;case t.LINES:e.lines+=r*(i/2);break;case t.LINE_STRIP:e.lines+=r*(i-1);break;case t.LINE_LOOP:e.lines+=r*i;break;case t.POINTS:e.points+=r*i;break;default:Wt("WebGLInfo: Unknown draw mode:",a);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:n,render:e,programs:null,autoReset:!0,reset:s,update:o}}function um(t,n,e){const o=new WeakMap,s=new un;function i(a,r,c){const l=a.morphTargetInfluences,d=r.morphAttributes.position||r.morphAttributes.normal||r.morphAttributes.color,f=d!==void 0?d.length:0;let u=o.get(r);if(u===void 0||u.count!==f){let S=function(){T.dispose(),o.delete(r),r.removeEventListener("dispose",S)};u!==void 0&&u.texture.dispose();const h=r.morphAttributes.position!==void 0,p=r.morphAttributes.normal!==void 0,x=r.morphAttributes.color!==void 0,m=r.morphAttributes.position||[],g=r.morphAttributes.normal||[],v=r.morphAttributes.color||[];let w=0;h===!0&&(w=1),p===!0&&(w=2),x===!0&&(w=3);let M=r.attributes.position.count*w,y=1;M>n.maxTextureSize&&(y=Math.ceil(M/n.maxTextureSize),M=n.maxTextureSize);const b=new Float32Array(M*y*4*f),T=new za(b,M,y,f);T.type=is,T.needsUpdate=!0;const _=w*4;for(let E=0;E<f;E++){const A=m[E],R=g[E],C=v[E],I=M*y*4*E;for(let L=0;L<A.count;L++){const N=L*_;h===!0&&(s.fromBufferAttribute(A,L),b[I+N+0]=s.x,b[I+N+1]=s.y,b[I+N+2]=s.z,b[I+N+3]=0),p===!0&&(s.fromBufferAttribute(R,L),b[I+N+4]=s.x,b[I+N+5]=s.y,b[I+N+6]=s.z,b[I+N+7]=0),x===!0&&(s.fromBufferAttribute(C,L),b[I+N+8]=s.x,b[I+N+9]=s.y,b[I+N+10]=s.z,b[I+N+11]=C.itemSize===4?s.w:1)}}u={count:f,texture:T,size:new ot(M,y)},o.set(r,u),r.addEventListener("dispose",S)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)c.getUniforms().setValue(t,"morphTexture",a.morphTexture,e);else{let h=0;for(let x=0;x<l.length;x++)h+=l[x];const p=r.morphTargetsRelative?1:1-h;c.getUniforms().setValue(t,"morphTargetBaseInfluence",p),c.getUniforms().setValue(t,"morphTargetInfluences",l)}c.getUniforms().setValue(t,"morphTargetsTexture",u.texture,e),c.getUniforms().setValue(t,"morphTargetsTextureSize",u.size)}return{update:i}}function hm(t,n,e,o,s){let i=new WeakMap;function a(l){const d=s.render.frame,f=l.geometry,u=n.get(l,f);if(i.get(u)!==d&&(n.update(u),i.set(u,d)),l.isInstancedMesh&&(l.hasEventListener("dispose",c)===!1&&l.addEventListener("dispose",c),i.get(l)!==d&&(e.update(l.instanceMatrix,t.ARRAY_BUFFER),l.instanceColor!==null&&e.update(l.instanceColor,t.ARRAY_BUFFER),i.set(l,d))),l.isSkinnedMesh){const h=l.skeleton;i.get(h)!==d&&(h.update(),i.set(h,d))}return u}function r(){i=new WeakMap}function c(l){const d=l.target;d.removeEventListener("dispose",c),o.releaseStatesOfObject(d),e.remove(d.instanceMatrix),d.instanceColor!==null&&e.remove(d.instanceColor)}return{update:a,dispose:r}}const pm={[r0]:"LINEAR_TONE_MAPPING",[a0]:"REINHARD_TONE_MAPPING",[i0]:"CINEON_TONE_MAPPING",[s0]:"ACES_FILMIC_TONE_MAPPING",[Ba]:"AGX_TONE_MAPPING",[o0]:"NEUTRAL_TONE_MAPPING",[n0]:"CUSTOM_TONE_MAPPING"};function mm(t,n,e,o,s){const i=new wn(n,e,{type:t,depthBuffer:o,stencilBuffer:s,depthTexture:o?new ti(n,e):void 0}),a=new wn(n,e,{type:Cn,depthBuffer:!1,stencilBuffer:!1}),r=new jt;r.setAttribute("position",new Jt([-1,3,0,-1,-1,0,3,-1,0],3)),r.setAttribute("uv",new Jt([0,2,0,0,2,0],2));const c=new xd({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),l=new V(r,c),d=new Fa(-1,1,1,-1,0,1);let f=null,u=null,h=!1,p,x=null,m=[],g=!1;this.setSize=function(v,w){i.setSize(v,w),a.setSize(v,w);for(let M=0;M<m.length;M++){const y=m[M];y.setSize&&y.setSize(v,w)}},this.setEffects=function(v){m=v,g=m.length>0&&m[0].isRenderPass===!0;const w=i.width,M=i.height;for(let y=0;y<m.length;y++){const b=m[y];b.setSize&&b.setSize(w,M)}},this.begin=function(v,w){if(h||v.toneMapping===Io&&m.length===0)return!1;if(x=w,w!==null){const M=w.width,y=w.height;(i.width!==M||i.height!==y)&&this.setSize(M,y)}return g===!1&&v.setRenderTarget(i),p=v.toneMapping,v.toneMapping=Io,!0},this.hasRenderPass=function(){return g},this.end=function(v,w){v.toneMapping=p,h=!0;let M=i,y=a;for(let b=0;b<m.length;b++){const T=m[b];if(T.enabled!==!1&&(T.render(v,y,M,w),T.needsSwap!==!1)){const _=M;M=y,y=_}}if(f!==v.outputColorSpace||u!==v.toneMapping){f=v.outputColorSpace,u=v.toneMapping,c.defines={},Xt.getTransfer(f)===Bt&&(c.defines.SRGB_TRANSFER="");const b=pm[u];b&&(c.defines[b]=""),c.needsUpdate=!0}c.uniforms.tDiffuse.value=M.texture,v.setRenderTarget(x),v.render(l,d),x=null,h=!1},this.isCompositing=function(){return h},this.dispose=function(){i.depthTexture&&i.depthTexture.dispose(),i.dispose(),a.dispose(),r.dispose(),c.dispose()}}const $d=new Fr,Gr=new ti(1,1),jd=new za,Zd=new Ah,Qd=new Nd,Oc=[],zc=[],Bc=new Float32Array(16),Gc=new Float32Array(9),Hc=new Float32Array(4);function hi(t,n,e){const o=t[0];if(o<=0||o>0)return t;const s=n*e;let i=Oc[s];if(i===void 0&&(i=new Float32Array(s),Oc[s]=i),n!==0){o.toArray(i,0);for(let a=1,r=0;a!==n;++a)r+=e,t[a].toArray(i,r)}return i}function pn(t,n){if(t.length!==n.length)return!1;for(let e=0,o=t.length;e<o;e++)if(t[e]!==n[e])return!1;return!0}function mn(t,n){for(let e=0,o=n.length;e<o;e++)t[e]=n[e]}function Va(t,n){let e=zc[n];e===void 0&&(e=new Int32Array(n),zc[n]=e);for(let o=0;o!==n;++o)e[o]=t.allocateTextureUnit();return e}function gm(t,n){const e=this.cache;e[0]!==n&&(t.uniform1f(this.addr,n),e[0]=n)}function vm(t,n){const e=this.cache;if(n.x!==void 0)(e[0]!==n.x||e[1]!==n.y)&&(t.uniform2f(this.addr,n.x,n.y),e[0]=n.x,e[1]=n.y);else{if(pn(e,n))return;t.uniform2fv(this.addr,n),mn(e,n)}}function xm(t,n){const e=this.cache;if(n.x!==void 0)(e[0]!==n.x||e[1]!==n.y||e[2]!==n.z)&&(t.uniform3f(this.addr,n.x,n.y,n.z),e[0]=n.x,e[1]=n.y,e[2]=n.z);else if(n.r!==void 0)(e[0]!==n.r||e[1]!==n.g||e[2]!==n.b)&&(t.uniform3f(this.addr,n.r,n.g,n.b),e[0]=n.r,e[1]=n.g,e[2]=n.b);else{if(pn(e,n))return;t.uniform3fv(this.addr,n),mn(e,n)}}function _m(t,n){const e=this.cache;if(n.x!==void 0)(e[0]!==n.x||e[1]!==n.y||e[2]!==n.z||e[3]!==n.w)&&(t.uniform4f(this.addr,n.x,n.y,n.z,n.w),e[0]=n.x,e[1]=n.y,e[2]=n.z,e[3]=n.w);else{if(pn(e,n))return;t.uniform4fv(this.addr,n),mn(e,n)}}function Mm(t,n){const e=this.cache,o=n.elements;if(o===void 0){if(pn(e,n))return;t.uniformMatrix2fv(this.addr,!1,n),mn(e,n)}else{if(pn(e,o))return;Hc.set(o),t.uniformMatrix2fv(this.addr,!1,Hc),mn(e,o)}}function wm(t,n){const e=this.cache,o=n.elements;if(o===void 0){if(pn(e,n))return;t.uniformMatrix3fv(this.addr,!1,n),mn(e,n)}else{if(pn(e,o))return;Gc.set(o),t.uniformMatrix3fv(this.addr,!1,Gc),mn(e,o)}}function bm(t,n){const e=this.cache,o=n.elements;if(o===void 0){if(pn(e,n))return;t.uniformMatrix4fv(this.addr,!1,n),mn(e,n)}else{if(pn(e,o))return;Bc.set(o),t.uniformMatrix4fv(this.addr,!1,Bc),mn(e,o)}}function Sm(t,n){const e=this.cache;e[0]!==n&&(t.uniform1i(this.addr,n),e[0]=n)}function ym(t,n){const e=this.cache;if(n.x!==void 0)(e[0]!==n.x||e[1]!==n.y)&&(t.uniform2i(this.addr,n.x,n.y),e[0]=n.x,e[1]=n.y);else{if(pn(e,n))return;t.uniform2iv(this.addr,n),mn(e,n)}}function Tm(t,n){const e=this.cache;if(n.x!==void 0)(e[0]!==n.x||e[1]!==n.y||e[2]!==n.z)&&(t.uniform3i(this.addr,n.x,n.y,n.z),e[0]=n.x,e[1]=n.y,e[2]=n.z);else{if(pn(e,n))return;t.uniform3iv(this.addr,n),mn(e,n)}}function Em(t,n){const e=this.cache;if(n.x!==void 0)(e[0]!==n.x||e[1]!==n.y||e[2]!==n.z||e[3]!==n.w)&&(t.uniform4i(this.addr,n.x,n.y,n.z,n.w),e[0]=n.x,e[1]=n.y,e[2]=n.z,e[3]=n.w);else{if(pn(e,n))return;t.uniform4iv(this.addr,n),mn(e,n)}}function Am(t,n){const e=this.cache;e[0]!==n&&(t.uniform1ui(this.addr,n),e[0]=n)}function Rm(t,n){const e=this.cache;if(n.x!==void 0)(e[0]!==n.x||e[1]!==n.y)&&(t.uniform2ui(this.addr,n.x,n.y),e[0]=n.x,e[1]=n.y);else{if(pn(e,n))return;t.uniform2uiv(this.addr,n),mn(e,n)}}function Pm(t,n){const e=this.cache;if(n.x!==void 0)(e[0]!==n.x||e[1]!==n.y||e[2]!==n.z)&&(t.uniform3ui(this.addr,n.x,n.y,n.z),e[0]=n.x,e[1]=n.y,e[2]=n.z);else{if(pn(e,n))return;t.uniform3uiv(this.addr,n),mn(e,n)}}function Cm(t,n){const e=this.cache;if(n.x!==void 0)(e[0]!==n.x||e[1]!==n.y||e[2]!==n.z||e[3]!==n.w)&&(t.uniform4ui(this.addr,n.x,n.y,n.z,n.w),e[0]=n.x,e[1]=n.y,e[2]=n.z,e[3]=n.w);else{if(pn(e,n))return;t.uniform4uiv(this.addr,n),mn(e,n)}}function Dm(t,n,e){const o=this.cache,s=e.allocateTextureUnit();o[0]!==s&&(t.uniform1i(this.addr,s),o[0]=s);let i;this.type===t.SAMPLER_2D_SHADOW?(Gr.compareFunction=e.isReversedDepthBuffer()?e0:t0,i=Gr):i=$d,e.setTexture2D(n||i,s)}function Im(t,n,e){const o=this.cache,s=e.allocateTextureUnit();o[0]!==s&&(t.uniform1i(this.addr,s),o[0]=s),e.setTexture3D(n||Zd,s)}function Lm(t,n,e){const o=this.cache,s=e.allocateTextureUnit();o[0]!==s&&(t.uniform1i(this.addr,s),o[0]=s),e.setTextureCube(n||Qd,s)}function Nm(t,n,e){const o=this.cache,s=e.allocateTextureUnit();o[0]!==s&&(t.uniform1i(this.addr,s),o[0]=s),e.setTexture2DArray(n||jd,s)}function km(t){switch(t){case 5126:return gm;case 35664:return vm;case 35665:return xm;case 35666:return _m;case 35674:return Mm;case 35675:return wm;case 35676:return bm;case 5124:case 35670:return Sm;case 35667:case 35671:return ym;case 35668:case 35672:return Tm;case 35669:case 35673:return Em;case 5125:return Am;case 36294:return Rm;case 36295:return Pm;case 36296:return Cm;case 35678:case 36198:case 36298:case 36306:case 35682:return Dm;case 35679:case 36299:case 36307:return Im;case 35680:case 36300:case 36308:case 36293:return Lm;case 36289:case 36303:case 36311:case 36292:return Nm}}function Um(t,n){t.uniform1fv(this.addr,n)}function Fm(t,n){const e=hi(n,this.size,2);t.uniform2fv(this.addr,e)}function Om(t,n){const e=hi(n,this.size,3);t.uniform3fv(this.addr,e)}function zm(t,n){const e=hi(n,this.size,4);t.uniform4fv(this.addr,e)}function Bm(t,n){const e=hi(n,this.size,4);t.uniformMatrix2fv(this.addr,!1,e)}function Gm(t,n){const e=hi(n,this.size,9);t.uniformMatrix3fv(this.addr,!1,e)}function Hm(t,n){const e=hi(n,this.size,16);t.uniformMatrix4fv(this.addr,!1,e)}function Vm(t,n){t.uniform1iv(this.addr,n)}function Wm(t,n){t.uniform2iv(this.addr,n)}function Xm(t,n){t.uniform3iv(this.addr,n)}function Km(t,n){t.uniform4iv(this.addr,n)}function qm(t,n){t.uniform1uiv(this.addr,n)}function Ym(t,n){t.uniform2uiv(this.addr,n)}function $m(t,n){t.uniform3uiv(this.addr,n)}function jm(t,n){t.uniform4uiv(this.addr,n)}function Zm(t,n,e){const o=this.cache,s=n.length,i=Va(e,s);pn(o,i)||(t.uniform1iv(this.addr,i),mn(o,i));let a;this.type===t.SAMPLER_2D_SHADOW?a=Gr:a=$d;for(let r=0;r!==s;++r)e.setTexture2D(n[r]||a,i[r])}function Qm(t,n,e){const o=this.cache,s=n.length,i=Va(e,s);pn(o,i)||(t.uniform1iv(this.addr,i),mn(o,i));for(let a=0;a!==s;++a)e.setTexture3D(n[a]||Zd,i[a])}function Jm(t,n,e){const o=this.cache,s=n.length,i=Va(e,s);pn(o,i)||(t.uniform1iv(this.addr,i),mn(o,i));for(let a=0;a!==s;++a)e.setTextureCube(n[a]||Qd,i[a])}function eg(t,n,e){const o=this.cache,s=n.length,i=Va(e,s);pn(o,i)||(t.uniform1iv(this.addr,i),mn(o,i));for(let a=0;a!==s;++a)e.setTexture2DArray(n[a]||jd,i[a])}function tg(t){switch(t){case 5126:return Um;case 35664:return Fm;case 35665:return Om;case 35666:return zm;case 35674:return Bm;case 35675:return Gm;case 35676:return Hm;case 5124:case 35670:return Vm;case 35667:case 35671:return Wm;case 35668:case 35672:return Xm;case 35669:case 35673:return Km;case 5125:return qm;case 36294:return Ym;case 36295:return $m;case 36296:return jm;case 35678:case 36198:case 36298:case 36306:case 35682:return Zm;case 35679:case 36299:case 36307:return Qm;case 35680:case 36300:case 36308:case 36293:return Jm;case 36289:case 36303:case 36311:case 36292:return eg}}class ng{constructor(n,e,o){this.id=n,this.addr=o,this.cache=[],this.type=e.type,this.setValue=km(e.type)}}class og{constructor(n,e,o){this.id=n,this.addr=o,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=tg(e.type)}}class sg{constructor(n){this.id=n,this.seq=[],this.map={}}setValue(n,e,o){const s=this.seq;for(let i=0,a=s.length;i!==a;++i){const r=s[i];r.setValue(n,e[r.id],o)}}}const mr=/(\w+)(\])?(\[|\.)?/g;function Vc(t,n){t.seq.push(n),t.map[n.id]=n}function ig(t,n,e){const o=t.name,s=o.length;for(mr.lastIndex=0;;){const i=mr.exec(o),a=mr.lastIndex;let r=i[1];const c=i[2]==="]",l=i[3];if(c&&(r=r|0),l===void 0||l==="["&&a+2===s){Vc(e,l===void 0?new ng(r,t,n):new og(r,t,n));break}else{let f=e.map[r];f===void 0&&(f=new sg(r),Vc(e,f)),e=f}}}class va{constructor(n,e){this.seq=[],this.map={};const o=n.getProgramParameter(e,n.ACTIVE_UNIFORMS);for(let a=0;a<o;++a){const r=n.getActiveUniform(e,a),c=n.getUniformLocation(e,r.name);ig(r,c,this)}const s=[],i=[];for(const a of this.seq)a.type===n.SAMPLER_2D_SHADOW||a.type===n.SAMPLER_CUBE_SHADOW||a.type===n.SAMPLER_2D_ARRAY_SHADOW?s.push(a):i.push(a);s.length>0&&(this.seq=s.concat(i))}setValue(n,e,o,s){const i=this.map[e];i!==void 0&&i.setValue(n,o,s)}setOptional(n,e,o){const s=e[o];s!==void 0&&this.setValue(n,o,s)}static upload(n,e,o,s){for(let i=0,a=e.length;i!==a;++i){const r=e[i],c=o[r.id];c.needsUpdate!==!1&&r.setValue(n,c.value,s)}}static seqWithValue(n,e){const o=[];for(let s=0,i=n.length;s!==i;++s){const a=n[s];a.id in e&&o.push(a)}return o}}function Wc(t,n,e){const o=t.createShader(n);return t.shaderSource(o,e),t.compileShader(o),o}const ag=37297;let rg=0;function cg(t,n){const e=t.split(`
`),o=[],s=Math.max(n-6,0),i=Math.min(n+6,e.length);for(let a=s;a<i;a++){const r=a+1;o.push(`${r===n?">":" "} ${r}: ${e[a]}`)}return o.join(`
`)}const Xc=new wt;function lg(t){Xt._getMatrix(Xc,Xt.workingColorSpace,t);const n=`mat3( ${Xc.elements.map(e=>e.toFixed(4))} )`;switch(Xt.getTransfer(t)){case kd:return[n,"LinearTransferOETF"];case Bt:return[n,"sRGBTransferOETF"];default:return Rt("WebGLProgram: Unsupported color space: ",t),[n,"LinearTransferOETF"]}}function Kc(t,n,e){const o=t.getShaderParameter(n,t.COMPILE_STATUS),i=(t.getShaderInfoLog(n)||"").trim();if(o&&i==="")return"";const a=/ERROR: 0:(\d+)/.exec(i);if(a){const r=parseInt(a[1]);return e.toUpperCase()+`

`+i+`

`+cg(t.getShaderSource(n),r)}else return i}function dg(t,n){const e=lg(n);return[`vec4 ${t}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}const fg={[r0]:"Linear",[a0]:"Reinhard",[i0]:"Cineon",[s0]:"ACESFilmic",[Ba]:"AgX",[o0]:"Neutral",[n0]:"Custom"};function ug(t,n){const e=fg[n];return e===void 0?(Rt("WebGLProgram: Unsupported toneMapping:",n),"vec3 "+t+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+t+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const ea=new X;function hg(){Xt.getLuminanceCoefficients(ea);const t=ea.x.toFixed(4),n=ea.y.toFixed(4),e=ea.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${t}, ${n}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function pg(t){return[t.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",t.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Ri).join(`
`)}function mg(t){const n=[];for(const e in t){const o=t[e];o!==!1&&n.push("#define "+e+" "+o)}return n.join(`
`)}function gg(t,n){const e={},o=t.getProgramParameter(n,t.ACTIVE_ATTRIBUTES);for(let s=0;s<o;s++){const i=t.getActiveAttrib(n,s),a=i.name;let r=1;i.type===t.FLOAT_MAT2&&(r=2),i.type===t.FLOAT_MAT3&&(r=3),i.type===t.FLOAT_MAT4&&(r=4),e[a]={type:i.type,location:t.getAttribLocation(n,a),locationSize:r}}return e}function Ri(t){return t!==""}function qc(t,n){const e=n.numSpotLightShadows+n.numSpotLightMaps-n.numSpotLightShadowsWithMaps;return t.replace(/NUM_DIR_LIGHTS/g,n.numDirLights).replace(/NUM_SPOT_LIGHTS/g,n.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,n.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,n.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,n.numPointLights).replace(/NUM_HEMI_LIGHTS/g,n.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,n.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,n.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,n.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,n.numPointLightShadows)}function Yc(t,n){return t.replace(/NUM_CLIPPING_PLANES/g,n.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,n.numClippingPlanes-n.numClipIntersection)}const vg=/^[ \t]*#include +<([\w\d./]+)>/gm;function Hr(t){return t.replace(vg,_g)}const xg=new Map;function _g(t,n){let e=ct[n];if(e===void 0){const o=xg.get(n);if(o!==void 0)e=ct[o],Rt('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',n,o);else throw new Error("Can not resolve #include <"+n+">")}return Hr(e)}const Mg=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function $c(t){return t.replace(Mg,wg)}function wg(t,n,e,o){let s="";for(let i=parseInt(n);i<parseInt(e);i++)s+=o.replace(/\[\s*i\s*\]/g,"[ "+i+" ]").replace(/UNROLLED_LOOP_INDEX/g,i);return s}function jc(t){let n=`precision ${t.precision} float;
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
#define LOW_PRECISION`),n}const bg={[Pi]:"SHADOWMAP_TYPE_PCF",[Ai]:"SHADOWMAP_TYPE_VSM"};function Sg(t){return bg[t.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const yg={[Ui]:"ENVMAP_TYPE_CUBE",[ei]:"ENVMAP_TYPE_CUBE",[Oa]:"ENVMAP_TYPE_CUBE_UV"};function Tg(t){return t.envMap===!1?"ENVMAP_TYPE_CUBE":yg[t.envMapMode]||"ENVMAP_TYPE_CUBE"}const Eg={[ei]:"ENVMAP_MODE_REFRACTION"};function Ag(t){return t.envMap===!1?"ENVMAP_MODE_REFLECTION":Eg[t.envMapMode]||"ENVMAP_MODE_REFLECTION"}const Rg={[Dh]:"ENVMAP_BLENDING_MULTIPLY",[Ch]:"ENVMAP_BLENDING_MIX",[Ph]:"ENVMAP_BLENDING_ADD"};function Pg(t){return t.envMap===!1?"ENVMAP_BLENDING_NONE":Rg[t.combine]||"ENVMAP_BLENDING_NONE"}function Cg(t){const n=t.envMapCubeUVHeight;if(n===null)return null;const e=Math.log2(n)-2,o=1/n;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:o,maxMip:e}}function Dg(t,n,e,o){const s=t.getContext(),i=e.defines;let a=e.vertexShader,r=e.fragmentShader;const c=Sg(e),l=Tg(e),d=Ag(e),f=Pg(e),u=Cg(e),h=pg(e),p=mg(i),x=s.createProgram();let m,g,v=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,p].filter(Ri).join(`
`),m.length>0&&(m+=`
`),g=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,p].filter(Ri).join(`
`),g.length>0&&(g+=`
`)):(m=[jc(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,p,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+d:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexNormals?"#define HAS_NORMAL":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Ri).join(`
`),g=[jc(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,p,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+l:"",e.envMap?"#define "+d:"",e.envMap?"#define "+f:"",u?"#define CUBEUV_TEXEL_WIDTH "+u.texelWidth:"",u?"#define CUBEUV_TEXEL_HEIGHT "+u.texelHeight:"",u?"#define CUBEUV_MAX_MIP "+u.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor?"#define USE_COLOR":"",e.vertexAlphas||e.batchingColor?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==Io?"#define TONE_MAPPING":"",e.toneMapping!==Io?ct.tonemapping_pars_fragment:"",e.toneMapping!==Io?ug("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",ct.colorspace_pars_fragment,dg("linearToOutputTexel",e.outputColorSpace),hg(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(Ri).join(`
`)),a=Hr(a),a=qc(a,e),a=Yc(a,e),r=Hr(r),r=qc(r,e),r=Yc(r,e),a=$c(a),r=$c(r),e.isRawShaderMaterial!==!0&&(v=`#version 300 es
`,m=[h,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,g=["#define varying in",e.glslVersion===Ec?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===Ec?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+g);const w=v+m+a,M=v+g+r,y=Wc(s,s.VERTEX_SHADER,w),b=Wc(s,s.FRAGMENT_SHADER,M);s.attachShader(x,y),s.attachShader(x,b),e.index0AttributeName!==void 0?s.bindAttribLocation(x,0,e.index0AttributeName):e.morphTargets===!0&&s.bindAttribLocation(x,0,"position"),s.linkProgram(x);function T(A){if(t.debug.checkShaderErrors){const R=s.getProgramInfoLog(x)||"",C=s.getShaderInfoLog(y)||"",I=s.getShaderInfoLog(b)||"",L=R.trim(),N=C.trim(),U=I.trim();let F=!0,z=!0;if(s.getProgramParameter(x,s.LINK_STATUS)===!1)if(F=!1,typeof t.debug.onShaderError=="function")t.debug.onShaderError(s,x,y,b);else{const G=Kc(s,y,"vertex"),O=Kc(s,b,"fragment");Wt("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(x,s.VALIDATE_STATUS)+`

Material Name: `+A.name+`
Material Type: `+A.type+`

Program Info Log: `+L+`
`+G+`
`+O)}else L!==""?Rt("WebGLProgram: Program Info Log:",L):(N===""||U==="")&&(z=!1);z&&(A.diagnostics={runnable:F,programLog:L,vertexShader:{log:N,prefix:m},fragmentShader:{log:U,prefix:g}})}s.deleteShader(y),s.deleteShader(b),_=new va(s,x),S=gg(s,x)}let _;this.getUniforms=function(){return _===void 0&&T(this),_};let S;this.getAttributes=function(){return S===void 0&&T(this),S};let E=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return E===!1&&(E=s.getProgramParameter(x,ag)),E},this.destroy=function(){o.releaseStatesOfProgram(this),s.deleteProgram(x),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=rg++,this.cacheKey=n,this.usedTimes=1,this.program=x,this.vertexShader=y,this.fragmentShader=b,this}let Ig=0;class Lg{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(n){const e=n.vertexShader,o=n.fragmentShader,s=this._getShaderStage(e),i=this._getShaderStage(o),a=this._getShaderCacheForMaterial(n);return a.has(s)===!1&&(a.add(s),s.usedTimes++),a.has(i)===!1&&(a.add(i),i.usedTimes++),this}remove(n){const e=this.materialCache.get(n);for(const o of e)o.usedTimes--,o.usedTimes===0&&this.shaderCache.delete(o.code);return this.materialCache.delete(n),this}getVertexShaderID(n){return this._getShaderStage(n.vertexShader).id}getFragmentShaderID(n){return this._getShaderStage(n.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(n){const e=this.materialCache;let o=e.get(n);return o===void 0&&(o=new Set,e.set(n,o)),o}_getShaderStage(n){const e=this.shaderCache;let o=e.get(n);return o===void 0&&(o=new Ng(n),e.set(n,o)),o}}class Ng{constructor(n){this.id=Ig++,this.code=n,this.usedTimes=0}}function kg(t){return t===si||t===Nr||t===kr}function Ug(t,n,e,o,s,i){const a=new Eh,r=new Lg,c=new Set,l=[],d=new Map,f=o.logarithmicDepthBuffer;let u=o.precision;const h={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function p(_){return c.add(_),_===0?"uv":`uv${_}`}function x(_,S,E,A,R,C){const I=A.fog,L=R.geometry,N=_.isMeshStandardMaterial||_.isMeshLambertMaterial||_.isMeshPhongMaterial?A.environment:null,U=_.isMeshStandardMaterial||_.isMeshLambertMaterial&&!_.envMap||_.isMeshPhongMaterial&&!_.envMap,F=n.get(_.envMap||N,U),z=F&&F.mapping===Oa?F.image.height:null,G=h[_.type];_.precision!==null&&(u=o.getMaxPrecision(_.precision),u!==_.precision&&Rt("WebGLProgram.getParameters:",_.precision,"not supported, using",u,"instead."));const O=L.morphAttributes.position||L.morphAttributes.normal||L.morphAttributes.color,B=O!==void 0?O.length:0;let J=0;L.morphAttributes.position!==void 0&&(J=1),L.morphAttributes.normal!==void 0&&(J=2),L.morphAttributes.color!==void 0&&(J=3);let ue,xe,j,ie;if(G){const st=Ro[G];ue=st.vertexShader,xe=st.fragmentShader}else ue=_.vertexShader,xe=_.fragmentShader,r.update(_),j=r.getVertexShaderID(_),ie=r.getFragmentShaderID(_);const ne=t.getRenderTarget(),ye=t.state.buffers.depth.getReversed(),Ie=R.isInstancedMesh===!0,Fe=R.isBatchedMesh===!0,tt=!!_.map,je=!!_.matcap,_t=!!F,gt=!!_.aoMap,nt=!!_.lightMap,Pt=!!_.bumpMap,kt=!!_.normalMap,xn=!!_.displacementMap,W=!!_.emissiveMap,Qt=!!_.metalnessMap,rt=!!_.roughnessMap,At=_.anisotropy>0,Te=_.clearcoat>0,Ht=_.dispersion>0,k=_.iridescence>0,P=_.sheen>0,q=_.transmission>0,se=At&&!!_.anisotropyMap,de=Te&&!!_.clearcoatMap,pe=Te&&!!_.clearcoatNormalMap,Me=Te&&!!_.clearcoatRoughnessMap,ee=k&&!!_.iridescenceMap,re=k&&!!_.iridescenceThicknessMap,Ce=P&&!!_.sheenColorMap,Oe=P&&!!_.sheenRoughnessMap,ve=!!_.specularMap,me=!!_.specularColorMap,$e=!!_.specularIntensityMap,Ze=q&&!!_.transmissionMap,ht=q&&!!_.thicknessMap,H=!!_.gradientMap,_e=!!_.alphaMap,ae=_.alphaTest>0,ke=!!_.alphaHash,be=!!_.extensions;let fe=Io;_.toneMapped&&(ne===null||ne.isXRRenderTarget===!0)&&(fe=t.toneMapping);const He={shaderID:G,shaderType:_.type,shaderName:_.name,vertexShader:ue,fragmentShader:xe,defines:_.defines,customVertexShaderID:j,customFragmentShaderID:ie,isRawShaderMaterial:_.isRawShaderMaterial===!0,glslVersion:_.glslVersion,precision:u,batching:Fe,batchingColor:Fe&&R._colorsTexture!==null,instancing:Ie,instancingColor:Ie&&R.instanceColor!==null,instancingMorph:Ie&&R.morphTexture!==null,outputColorSpace:ne===null?t.outputColorSpace:ne.isXRRenderTarget===!0?ne.texture.colorSpace:Xt.workingColorSpace,alphaToCoverage:!!_.alphaToCoverage,map:tt,matcap:je,envMap:_t,envMapMode:_t&&F.mapping,envMapCubeUVHeight:z,aoMap:gt,lightMap:nt,bumpMap:Pt,normalMap:kt,displacementMap:xn,emissiveMap:W,normalMapObjectSpace:kt&&_.normalMapType===yh,normalMapTangentSpace:kt&&_.normalMapType===yc,packedNormalMap:kt&&_.normalMapType===yc&&kg(_.normalMap.format),metalnessMap:Qt,roughnessMap:rt,anisotropy:At,anisotropyMap:se,clearcoat:Te,clearcoatMap:de,clearcoatNormalMap:pe,clearcoatRoughnessMap:Me,dispersion:Ht,iridescence:k,iridescenceMap:ee,iridescenceThicknessMap:re,sheen:P,sheenColorMap:Ce,sheenRoughnessMap:Oe,specularMap:ve,specularColorMap:me,specularIntensityMap:$e,transmission:q,transmissionMap:Ze,thicknessMap:ht,gradientMap:H,opaque:_.transparent===!1&&_.blending===pa&&_.alphaToCoverage===!1,alphaMap:_e,alphaTest:ae,alphaHash:ke,combine:_.combine,mapUv:tt&&p(_.map.channel),aoMapUv:gt&&p(_.aoMap.channel),lightMapUv:nt&&p(_.lightMap.channel),bumpMapUv:Pt&&p(_.bumpMap.channel),normalMapUv:kt&&p(_.normalMap.channel),displacementMapUv:xn&&p(_.displacementMap.channel),emissiveMapUv:W&&p(_.emissiveMap.channel),metalnessMapUv:Qt&&p(_.metalnessMap.channel),roughnessMapUv:rt&&p(_.roughnessMap.channel),anisotropyMapUv:se&&p(_.anisotropyMap.channel),clearcoatMapUv:de&&p(_.clearcoatMap.channel),clearcoatNormalMapUv:pe&&p(_.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Me&&p(_.clearcoatRoughnessMap.channel),iridescenceMapUv:ee&&p(_.iridescenceMap.channel),iridescenceThicknessMapUv:re&&p(_.iridescenceThicknessMap.channel),sheenColorMapUv:Ce&&p(_.sheenColorMap.channel),sheenRoughnessMapUv:Oe&&p(_.sheenRoughnessMap.channel),specularMapUv:ve&&p(_.specularMap.channel),specularColorMapUv:me&&p(_.specularColorMap.channel),specularIntensityMapUv:$e&&p(_.specularIntensityMap.channel),transmissionMapUv:Ze&&p(_.transmissionMap.channel),thicknessMapUv:ht&&p(_.thicknessMap.channel),alphaMapUv:_e&&p(_.alphaMap.channel),vertexTangents:!!L.attributes.tangent&&(kt||At),vertexNormals:!!L.attributes.normal,vertexColors:_.vertexColors,vertexAlphas:_.vertexColors===!0&&!!L.attributes.color&&L.attributes.color.itemSize===4,pointsUvs:R.isPoints===!0&&!!L.attributes.uv&&(tt||_e),fog:!!I,useFog:_.fog===!0,fogExp2:!!I&&I.isFogExp2,flatShading:_.wireframe===!1&&(_.flatShading===!0||L.attributes.normal===void 0&&kt===!1&&(_.isMeshLambertMaterial||_.isMeshPhongMaterial||_.isMeshStandardMaterial||_.isMeshPhysicalMaterial)),sizeAttenuation:_.sizeAttenuation===!0,logarithmicDepthBuffer:f,reversedDepthBuffer:ye,skinning:R.isSkinnedMesh===!0,morphTargets:L.morphAttributes.position!==void 0,morphNormals:L.morphAttributes.normal!==void 0,morphColors:L.morphAttributes.color!==void 0,morphTargetsCount:B,morphTextureStride:J,numDirLights:S.directional.length,numPointLights:S.point.length,numSpotLights:S.spot.length,numSpotLightMaps:S.spotLightMap.length,numRectAreaLights:S.rectArea.length,numHemiLights:S.hemi.length,numDirLightShadows:S.directionalShadowMap.length,numPointLightShadows:S.pointShadowMap.length,numSpotLightShadows:S.spotShadowMap.length,numSpotLightShadowsWithMaps:S.numSpotLightShadowsWithMaps,numLightProbes:S.numLightProbes,numLightProbeGrids:C.length,numClippingPlanes:i.numPlanes,numClipIntersection:i.numIntersection,dithering:_.dithering,shadowMapEnabled:t.shadowMap.enabled&&E.length>0,shadowMapType:t.shadowMap.type,toneMapping:fe,decodeVideoTexture:tt&&_.map.isVideoTexture===!0&&Xt.getTransfer(_.map.colorSpace)===Bt,decodeVideoTextureEmissive:W&&_.emissiveMap.isVideoTexture===!0&&Xt.getTransfer(_.emissiveMap.colorSpace)===Bt,premultipliedAlpha:_.premultipliedAlpha,doubleSided:_.side===qe,flipSided:_.side===Dn,useDepthPacking:_.depthPacking>=0,depthPacking:_.depthPacking||0,index0AttributeName:_.index0AttributeName,extensionClipCullDistance:be&&_.extensions.clipCullDistance===!0&&e.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(be&&_.extensions.multiDraw===!0||Fe)&&e.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:e.has("KHR_parallel_shader_compile"),customProgramCacheKey:_.customProgramCacheKey()};return He.vertexUv1s=c.has(1),He.vertexUv2s=c.has(2),He.vertexUv3s=c.has(3),c.clear(),He}function m(_){const S=[];if(_.shaderID?S.push(_.shaderID):(S.push(_.customVertexShaderID),S.push(_.customFragmentShaderID)),_.defines!==void 0)for(const E in _.defines)S.push(E),S.push(_.defines[E]);return _.isRawShaderMaterial===!1&&(g(S,_),v(S,_),S.push(t.outputColorSpace)),S.push(_.customProgramCacheKey),S.join()}function g(_,S){_.push(S.precision),_.push(S.outputColorSpace),_.push(S.envMapMode),_.push(S.envMapCubeUVHeight),_.push(S.mapUv),_.push(S.alphaMapUv),_.push(S.lightMapUv),_.push(S.aoMapUv),_.push(S.bumpMapUv),_.push(S.normalMapUv),_.push(S.displacementMapUv),_.push(S.emissiveMapUv),_.push(S.metalnessMapUv),_.push(S.roughnessMapUv),_.push(S.anisotropyMapUv),_.push(S.clearcoatMapUv),_.push(S.clearcoatNormalMapUv),_.push(S.clearcoatRoughnessMapUv),_.push(S.iridescenceMapUv),_.push(S.iridescenceThicknessMapUv),_.push(S.sheenColorMapUv),_.push(S.sheenRoughnessMapUv),_.push(S.specularMapUv),_.push(S.specularColorMapUv),_.push(S.specularIntensityMapUv),_.push(S.transmissionMapUv),_.push(S.thicknessMapUv),_.push(S.combine),_.push(S.fogExp2),_.push(S.sizeAttenuation),_.push(S.morphTargetsCount),_.push(S.morphAttributeCount),_.push(S.numDirLights),_.push(S.numPointLights),_.push(S.numSpotLights),_.push(S.numSpotLightMaps),_.push(S.numHemiLights),_.push(S.numRectAreaLights),_.push(S.numDirLightShadows),_.push(S.numPointLightShadows),_.push(S.numSpotLightShadows),_.push(S.numSpotLightShadowsWithMaps),_.push(S.numLightProbes),_.push(S.shadowMapType),_.push(S.toneMapping),_.push(S.numClippingPlanes),_.push(S.numClipIntersection),_.push(S.depthPacking)}function v(_,S){a.disableAll(),S.instancing&&a.enable(0),S.instancingColor&&a.enable(1),S.instancingMorph&&a.enable(2),S.matcap&&a.enable(3),S.envMap&&a.enable(4),S.normalMapObjectSpace&&a.enable(5),S.normalMapTangentSpace&&a.enable(6),S.clearcoat&&a.enable(7),S.iridescence&&a.enable(8),S.alphaTest&&a.enable(9),S.vertexColors&&a.enable(10),S.vertexAlphas&&a.enable(11),S.vertexUv1s&&a.enable(12),S.vertexUv2s&&a.enable(13),S.vertexUv3s&&a.enable(14),S.vertexTangents&&a.enable(15),S.anisotropy&&a.enable(16),S.alphaHash&&a.enable(17),S.batching&&a.enable(18),S.dispersion&&a.enable(19),S.batchingColor&&a.enable(20),S.gradientMap&&a.enable(21),S.packedNormalMap&&a.enable(22),S.vertexNormals&&a.enable(23),_.push(a.mask),a.disableAll(),S.fog&&a.enable(0),S.useFog&&a.enable(1),S.flatShading&&a.enable(2),S.logarithmicDepthBuffer&&a.enable(3),S.reversedDepthBuffer&&a.enable(4),S.skinning&&a.enable(5),S.morphTargets&&a.enable(6),S.morphNormals&&a.enable(7),S.morphColors&&a.enable(8),S.premultipliedAlpha&&a.enable(9),S.shadowMapEnabled&&a.enable(10),S.doubleSided&&a.enable(11),S.flipSided&&a.enable(12),S.useDepthPacking&&a.enable(13),S.dithering&&a.enable(14),S.transmission&&a.enable(15),S.sheen&&a.enable(16),S.opaque&&a.enable(17),S.pointsUvs&&a.enable(18),S.decodeVideoTexture&&a.enable(19),S.decodeVideoTextureEmissive&&a.enable(20),S.alphaToCoverage&&a.enable(21),S.numLightProbeGrids>0&&a.enable(22),_.push(a.mask)}function w(_){const S=h[_.type];let E;if(S){const A=Ro[S];E=Po.clone(A.uniforms)}else E=_.uniforms;return E}function M(_,S){let E=d.get(S);return E!==void 0?++E.usedTimes:(E=new Dg(t,S,_,s),l.push(E),d.set(S,E)),E}function y(_){if(--_.usedTimes===0){const S=l.indexOf(_);l[S]=l[l.length-1],l.pop(),d.delete(_.cacheKey),_.destroy()}}function b(_){r.remove(_)}function T(){r.dispose()}return{getParameters:x,getProgramCacheKey:m,getUniforms:w,acquireProgram:M,releaseProgram:y,releaseShaderCache:b,programs:l,dispose:T}}function Fg(){let t=new WeakMap;function n(a){return t.has(a)}function e(a){let r=t.get(a);return r===void 0&&(r={},t.set(a,r)),r}function o(a){t.delete(a)}function s(a,r,c){t.get(a)[r]=c}function i(){t=new WeakMap}return{has:n,get:e,remove:o,update:s,dispose:i}}function Og(t,n){return t.groupOrder!==n.groupOrder?t.groupOrder-n.groupOrder:t.renderOrder!==n.renderOrder?t.renderOrder-n.renderOrder:t.material.id!==n.material.id?t.material.id-n.material.id:t.materialVariant!==n.materialVariant?t.materialVariant-n.materialVariant:t.z!==n.z?t.z-n.z:t.id-n.id}function Zc(t,n){return t.groupOrder!==n.groupOrder?t.groupOrder-n.groupOrder:t.renderOrder!==n.renderOrder?t.renderOrder-n.renderOrder:t.z!==n.z?n.z-t.z:t.id-n.id}function Qc(){const t=[];let n=0;const e=[],o=[],s=[];function i(){n=0,e.length=0,o.length=0,s.length=0}function a(u){let h=0;return u.isInstancedMesh&&(h+=2),u.isSkinnedMesh&&(h+=1),h}function r(u,h,p,x,m,g){let v=t[n];return v===void 0?(v={id:u.id,object:u,geometry:h,material:p,materialVariant:a(u),groupOrder:x,renderOrder:u.renderOrder,z:m,group:g},t[n]=v):(v.id=u.id,v.object=u,v.geometry=h,v.material=p,v.materialVariant=a(u),v.groupOrder=x,v.renderOrder=u.renderOrder,v.z=m,v.group=g),n++,v}function c(u,h,p,x,m,g){const v=r(u,h,p,x,m,g);p.transmission>0?o.push(v):p.transparent===!0?s.push(v):e.push(v)}function l(u,h,p,x,m,g){const v=r(u,h,p,x,m,g);p.transmission>0?o.unshift(v):p.transparent===!0?s.unshift(v):e.unshift(v)}function d(u,h){e.length>1&&e.sort(u||Og),o.length>1&&o.sort(h||Zc),s.length>1&&s.sort(h||Zc)}function f(){for(let u=n,h=t.length;u<h;u++){const p=t[u];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:e,transmissive:o,transparent:s,init:i,push:c,unshift:l,finish:f,sort:d}}function zg(){let t=new WeakMap;function n(o,s){const i=t.get(o);let a;return i===void 0?(a=new Qc,t.set(o,[a])):s>=i.length?(a=new Qc,i.push(a)):a=i[s],a}function e(){t=new WeakMap}return{get:n,dispose:e}}function Bg(){const t={};return{get:function(n){if(t[n.id]!==void 0)return t[n.id];let e;switch(n.type){case"DirectionalLight":e={direction:new X,color:new oe};break;case"SpotLight":e={position:new X,direction:new X,color:new oe,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new X,color:new oe,distance:0,decay:0};break;case"HemisphereLight":e={direction:new X,skyColor:new oe,groundColor:new oe};break;case"RectAreaLight":e={color:new oe,position:new X,halfWidth:new X,halfHeight:new X};break}return t[n.id]=e,e}}}function Gg(){const t={};return{get:function(n){if(t[n.id]!==void 0)return t[n.id];let e;switch(n.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ot};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ot};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ot,shadowCameraNear:1,shadowCameraFar:1e3};break}return t[n.id]=e,e}}}let Hg=0;function Vg(t,n){return(n.castShadow?2:0)-(t.castShadow?2:0)+(n.map?1:0)-(t.map?1:0)}function Wg(t){const n=new Bg,e=Gg(),o={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)o.probe.push(new X);const s=new X,i=new at,a=new at;function r(l){let d=0,f=0,u=0;for(let S=0;S<9;S++)o.probe[S].set(0,0,0);let h=0,p=0,x=0,m=0,g=0,v=0,w=0,M=0,y=0,b=0,T=0;l.sort(Vg);for(let S=0,E=l.length;S<E;S++){const A=l[S],R=A.color,C=A.intensity,I=A.distance;let L=null;if(A.shadow&&A.shadow.map&&(A.shadow.map.texture.format===si?L=A.shadow.map.texture:L=A.shadow.map.depthTexture||A.shadow.map.texture),A.isAmbientLight)d+=R.r*C,f+=R.g*C,u+=R.b*C;else if(A.isLightProbe){for(let N=0;N<9;N++)o.probe[N].addScaledVector(A.sh.coefficients[N],C);T++}else if(A.isDirectionalLight){const N=n.get(A);if(N.color.copy(A.color).multiplyScalar(A.intensity),A.castShadow){const U=A.shadow,F=e.get(A);F.shadowIntensity=U.intensity,F.shadowBias=U.bias,F.shadowNormalBias=U.normalBias,F.shadowRadius=U.radius,F.shadowMapSize=U.mapSize,o.directionalShadow[h]=F,o.directionalShadowMap[h]=L,o.directionalShadowMatrix[h]=A.shadow.matrix,v++}o.directional[h]=N,h++}else if(A.isSpotLight){const N=n.get(A);N.position.setFromMatrixPosition(A.matrixWorld),N.color.copy(R).multiplyScalar(C),N.distance=I,N.coneCos=Math.cos(A.angle),N.penumbraCos=Math.cos(A.angle*(1-A.penumbra)),N.decay=A.decay,o.spot[x]=N;const U=A.shadow;if(A.map&&(o.spotLightMap[y]=A.map,y++,U.updateMatrices(A),A.castShadow&&b++),o.spotLightMatrix[x]=U.matrix,A.castShadow){const F=e.get(A);F.shadowIntensity=U.intensity,F.shadowBias=U.bias,F.shadowNormalBias=U.normalBias,F.shadowRadius=U.radius,F.shadowMapSize=U.mapSize,o.spotShadow[x]=F,o.spotShadowMap[x]=L,M++}x++}else if(A.isRectAreaLight){const N=n.get(A);N.color.copy(R).multiplyScalar(C),N.halfWidth.set(A.width*.5,0,0),N.halfHeight.set(0,A.height*.5,0),o.rectArea[m]=N,m++}else if(A.isPointLight){const N=n.get(A);if(N.color.copy(A.color).multiplyScalar(A.intensity),N.distance=A.distance,N.decay=A.decay,A.castShadow){const U=A.shadow,F=e.get(A);F.shadowIntensity=U.intensity,F.shadowBias=U.bias,F.shadowNormalBias=U.normalBias,F.shadowRadius=U.radius,F.shadowMapSize=U.mapSize,F.shadowCameraNear=U.camera.near,F.shadowCameraFar=U.camera.far,o.pointShadow[p]=F,o.pointShadowMap[p]=L,o.pointShadowMatrix[p]=A.shadow.matrix,w++}o.point[p]=N,p++}else if(A.isHemisphereLight){const N=n.get(A);N.skyColor.copy(A.color).multiplyScalar(C),N.groundColor.copy(A.groundColor).multiplyScalar(C),o.hemi[g]=N,g++}}m>0&&(t.has("OES_texture_float_linear")===!0?(o.rectAreaLTC1=Pe.LTC_FLOAT_1,o.rectAreaLTC2=Pe.LTC_FLOAT_2):(o.rectAreaLTC1=Pe.LTC_HALF_1,o.rectAreaLTC2=Pe.LTC_HALF_2)),o.ambient[0]=d,o.ambient[1]=f,o.ambient[2]=u;const _=o.hash;(_.directionalLength!==h||_.pointLength!==p||_.spotLength!==x||_.rectAreaLength!==m||_.hemiLength!==g||_.numDirectionalShadows!==v||_.numPointShadows!==w||_.numSpotShadows!==M||_.numSpotMaps!==y||_.numLightProbes!==T)&&(o.directional.length=h,o.spot.length=x,o.rectArea.length=m,o.point.length=p,o.hemi.length=g,o.directionalShadow.length=v,o.directionalShadowMap.length=v,o.pointShadow.length=w,o.pointShadowMap.length=w,o.spotShadow.length=M,o.spotShadowMap.length=M,o.directionalShadowMatrix.length=v,o.pointShadowMatrix.length=w,o.spotLightMatrix.length=M+y-b,o.spotLightMap.length=y,o.numSpotLightShadowsWithMaps=b,o.numLightProbes=T,_.directionalLength=h,_.pointLength=p,_.spotLength=x,_.rectAreaLength=m,_.hemiLength=g,_.numDirectionalShadows=v,_.numPointShadows=w,_.numSpotShadows=M,_.numSpotMaps=y,_.numLightProbes=T,o.version=Hg++)}function c(l,d){let f=0,u=0,h=0,p=0,x=0;const m=d.matrixWorldInverse;for(let g=0,v=l.length;g<v;g++){const w=l[g];if(w.isDirectionalLight){const M=o.directional[f];M.direction.setFromMatrixPosition(w.matrixWorld),s.setFromMatrixPosition(w.target.matrixWorld),M.direction.sub(s),M.direction.transformDirection(m),f++}else if(w.isSpotLight){const M=o.spot[h];M.position.setFromMatrixPosition(w.matrixWorld),M.position.applyMatrix4(m),M.direction.setFromMatrixPosition(w.matrixWorld),s.setFromMatrixPosition(w.target.matrixWorld),M.direction.sub(s),M.direction.transformDirection(m),h++}else if(w.isRectAreaLight){const M=o.rectArea[p];M.position.setFromMatrixPosition(w.matrixWorld),M.position.applyMatrix4(m),a.identity(),i.copy(w.matrixWorld),i.premultiply(m),a.extractRotation(i),M.halfWidth.set(w.width*.5,0,0),M.halfHeight.set(0,w.height*.5,0),M.halfWidth.applyMatrix4(a),M.halfHeight.applyMatrix4(a),p++}else if(w.isPointLight){const M=o.point[u];M.position.setFromMatrixPosition(w.matrixWorld),M.position.applyMatrix4(m),u++}else if(w.isHemisphereLight){const M=o.hemi[x];M.direction.setFromMatrixPosition(w.matrixWorld),M.direction.transformDirection(m),x++}}}return{setup:r,setupView:c,state:o}}function Jc(t){const n=new Wg(t),e=[],o=[],s=[];function i(u){f.camera=u,e.length=0,o.length=0,s.length=0}function a(u){e.push(u)}function r(u){o.push(u)}function c(u){s.push(u)}function l(){n.setup(e)}function d(u){n.setupView(e,u)}const f={lightsArray:e,shadowsArray:o,lightProbeGridArray:s,camera:null,lights:n,transmissionRenderTarget:{},textureUnits:0};return{init:i,state:f,setupLights:l,setupLightsView:d,pushLight:a,pushShadow:r,pushLightProbeGrid:c}}function Xg(t){let n=new WeakMap;function e(s,i=0){const a=n.get(s);let r;return a===void 0?(r=new Jc(t),n.set(s,[r])):i>=a.length?(r=new Jc(t),a.push(r)):r=a[i],r}function o(){n=new WeakMap}return{get:e,dispose:o}}const Kg=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,qg=`uniform sampler2D shadow_pass;
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
}`,Yg=[new X(1,0,0),new X(-1,0,0),new X(0,1,0),new X(0,-1,0),new X(0,0,1),new X(0,0,-1)],$g=[new X(0,-1,0),new X(0,-1,0),new X(0,0,1),new X(0,0,-1),new X(0,-1,0),new X(0,-1,0)],el=new at,xi=new X,gr=new X;function jg(t,n,e){let o=new vd;const s=new ot,i=new ot,a=new un,r=new wd,c=new bd,l={},d=e.maxTextureSize,f={[Js]:Dn,[Dn]:Js,[qe]:qe},u=new nn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new ot},radius:{value:4}},vertexShader:Kg,fragmentShader:qg}),h=u.clone();h.defines.HORIZONTAL_PASS=1;const p=new jt;p.setAttribute("position",new lt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const x=new V(p,u),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Pi;let g=this.type;this.render=function(b,T,_){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||b.length===0)return;this.type===Sd&&(Rt("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."),this.type=Pi);const S=t.getRenderTarget(),E=t.getActiveCubeFace(),A=t.getActiveMipmapLevel(),R=t.state;R.setBlending(vn),R.buffers.depth.getReversed()===!0?R.buffers.color.setClear(0,0,0,0):R.buffers.color.setClear(1,1,1,1),R.buffers.depth.setTest(!0),R.setScissorTest(!1);const C=g!==this.type;C&&T.traverse(function(I){I.material&&(Array.isArray(I.material)?I.material.forEach(L=>L.needsUpdate=!0):I.material.needsUpdate=!0)});for(let I=0,L=b.length;I<L;I++){const N=b[I],U=N.shadow;if(U===void 0){Rt("WebGLShadowMap:",N,"has no shadow.");continue}if(U.autoUpdate===!1&&U.needsUpdate===!1)continue;s.copy(U.mapSize);const F=U.getFrameExtents();s.multiply(F),i.copy(U.mapSize),(s.x>d||s.y>d)&&(s.x>d&&(i.x=Math.floor(d/F.x),s.x=i.x*F.x,U.mapSize.x=i.x),s.y>d&&(i.y=Math.floor(d/F.y),s.y=i.y*F.y,U.mapSize.y=i.y));const z=t.state.buffers.depth.getReversed();if(U.camera._reversedDepth=z,U.map===null||C===!0){if(U.map!==null&&(U.map.depthTexture!==null&&(U.map.depthTexture.dispose(),U.map.depthTexture=null),U.map.dispose()),this.type===Ai){if(N.isPointLight){Rt("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}U.map=new wn(s.x,s.y,{format:si,type:Cn,minFilter:en,magFilter:en,generateMipmaps:!1}),U.map.texture.name=N.name+".shadowMap",U.map.depthTexture=new ti(s.x,s.y,is),U.map.depthTexture.name=N.name+".shadowMapDepth",U.map.depthTexture.format=ni,U.map.depthTexture.compareFunction=null,U.map.depthTexture.minFilter=go,U.map.depthTexture.magFilter=go}else N.isPointLight?(U.map=new Yd(s.x),U.map.depthTexture=new ch(s.x,Ps)):(U.map=new wn(s.x,s.y),U.map.depthTexture=new ti(s.x,s.y,Ps)),U.map.depthTexture.name=N.name+".shadowMap",U.map.depthTexture.format=ni,this.type===Pi?(U.map.depthTexture.compareFunction=z?e0:t0,U.map.depthTexture.minFilter=en,U.map.depthTexture.magFilter=en):(U.map.depthTexture.compareFunction=null,U.map.depthTexture.minFilter=go,U.map.depthTexture.magFilter=go);U.camera.updateProjectionMatrix()}const G=U.map.isWebGLCubeRenderTarget?6:1;for(let O=0;O<G;O++){if(U.map.isWebGLCubeRenderTarget)t.setRenderTarget(U.map,O),t.clear();else{O===0&&(t.setRenderTarget(U.map),t.clear());const B=U.getViewport(O);a.set(i.x*B.x,i.y*B.y,i.x*B.z,i.y*B.w),R.viewport(a)}if(N.isPointLight){const B=U.camera,J=U.matrix,ue=N.distance||B.far;ue!==B.far&&(B.far=ue,B.updateProjectionMatrix()),xi.setFromMatrixPosition(N.matrixWorld),B.position.copy(xi),gr.copy(B.position),gr.add(Yg[O]),B.up.copy($g[O]),B.lookAt(gr),B.updateMatrixWorld(),J.makeTranslation(-xi.x,-xi.y,-xi.z),el.multiplyMatrices(B.projectionMatrix,B.matrixWorldInverse),U._frustum.setFromProjectionMatrix(el,B.coordinateSystem,B.reversedDepth)}else U.updateMatrices(N);o=U.getFrustum(),M(T,_,U.camera,N,this.type)}U.isPointLightShadow!==!0&&this.type===Ai&&v(U,_),U.needsUpdate=!1}g=this.type,m.needsUpdate=!1,t.setRenderTarget(S,E,A)};function v(b,T){const _=n.update(x);u.defines.VSM_SAMPLES!==b.blurSamples&&(u.defines.VSM_SAMPLES=b.blurSamples,h.defines.VSM_SAMPLES=b.blurSamples,u.needsUpdate=!0,h.needsUpdate=!0),b.mapPass===null&&(b.mapPass=new wn(s.x,s.y,{format:si,type:Cn})),u.uniforms.shadow_pass.value=b.map.depthTexture,u.uniforms.resolution.value=b.mapSize,u.uniforms.radius.value=b.radius,t.setRenderTarget(b.mapPass),t.clear(),t.renderBufferDirect(T,null,_,u,x,null),h.uniforms.shadow_pass.value=b.mapPass.texture,h.uniforms.resolution.value=b.mapSize,h.uniforms.radius.value=b.radius,t.setRenderTarget(b.map),t.clear(),t.renderBufferDirect(T,null,_,h,x,null)}function w(b,T,_,S){let E=null;const A=_.isPointLight===!0?b.customDistanceMaterial:b.customDepthMaterial;if(A!==void 0)E=A;else if(E=_.isPointLight===!0?c:r,t.localClippingEnabled&&T.clipShadows===!0&&Array.isArray(T.clippingPlanes)&&T.clippingPlanes.length!==0||T.displacementMap&&T.displacementScale!==0||T.alphaMap&&T.alphaTest>0||T.map&&T.alphaTest>0||T.alphaToCoverage===!0){const R=E.uuid,C=T.uuid;let I=l[R];I===void 0&&(I={},l[R]=I);let L=I[C];L===void 0&&(L=E.clone(),I[C]=L,T.addEventListener("dispose",y)),E=L}if(E.visible=T.visible,E.wireframe=T.wireframe,S===Ai?E.side=T.shadowSide!==null?T.shadowSide:T.side:E.side=T.shadowSide!==null?T.shadowSide:f[T.side],E.alphaMap=T.alphaMap,E.alphaTest=T.alphaToCoverage===!0?.5:T.alphaTest,E.map=T.map,E.clipShadows=T.clipShadows,E.clippingPlanes=T.clippingPlanes,E.clipIntersection=T.clipIntersection,E.displacementMap=T.displacementMap,E.displacementScale=T.displacementScale,E.displacementBias=T.displacementBias,E.wireframeLinewidth=T.wireframeLinewidth,E.linewidth=T.linewidth,_.isPointLight===!0&&E.isMeshDistanceMaterial===!0){const R=t.properties.get(E);R.light=_}return E}function M(b,T,_,S,E){if(b.visible===!1)return;if(b.layers.test(T.layers)&&(b.isMesh||b.isLine||b.isPoints)&&(b.castShadow||b.receiveShadow&&E===Ai)&&(!b.frustumCulled||o.intersectsObject(b))){b.modelViewMatrix.multiplyMatrices(_.matrixWorldInverse,b.matrixWorld);const C=n.update(b),I=b.material;if(Array.isArray(I)){const L=C.groups;for(let N=0,U=L.length;N<U;N++){const F=L[N],z=I[F.materialIndex];if(z&&z.visible){const G=w(b,z,S,E);b.onBeforeShadow(t,b,T,_,C,G,F),t.renderBufferDirect(_,null,C,G,b,F),b.onAfterShadow(t,b,T,_,C,G,F)}}}else if(I.visible){const L=w(b,I,S,E);b.onBeforeShadow(t,b,T,_,C,L,null),t.renderBufferDirect(_,null,C,L,b,null),b.onAfterShadow(t,b,T,_,C,L,null)}}const R=b.children;for(let C=0,I=R.length;C<I;C++)M(R[C],T,_,S,E)}function y(b){b.target.removeEventListener("dispose",y);for(const _ in l){const S=l[_],E=b.target.uuid;E in S&&(S[E].dispose(),delete S[E])}}}function Zg(t,n){function e(){let H=!1;const _e=new un;let ae=null;const ke=new un(0,0,0,0);return{setMask:function(be){ae!==be&&!H&&(t.colorMask(be,be,be,be),ae=be)},setLocked:function(be){H=be},setClear:function(be,fe,He,st,an){an===!0&&(be*=st,fe*=st,He*=st),_e.set(be,fe,He,st),ke.equals(_e)===!1&&(t.clearColor(be,fe,He,st),ke.copy(_e))},reset:function(){H=!1,ae=null,ke.set(-1,0,0,0)}}}function o(){let H=!1,_e=!1,ae=null,ke=null,be=null;return{setReversed:function(fe){if(_e!==fe){const He=n.get("EXT_clip_control");fe?He.clipControlEXT(He.LOWER_LEFT_EXT,He.ZERO_TO_ONE_EXT):He.clipControlEXT(He.LOWER_LEFT_EXT,He.NEGATIVE_ONE_TO_ONE_EXT),_e=fe;const st=be;be=null,this.setClear(st)}},getReversed:function(){return _e},setTest:function(fe){fe?ne(t.DEPTH_TEST):ye(t.DEPTH_TEST)},setMask:function(fe){ae!==fe&&!H&&(t.depthMask(fe),ae=fe)},setFunc:function(fe){if(_e&&(fe=Ih[fe]),ke!==fe){switch(fe){case wh:t.depthFunc(t.NEVER);break;case Mh:t.depthFunc(t.ALWAYS);break;case _h:t.depthFunc(t.LESS);break;case W0:t.depthFunc(t.LEQUAL);break;case xh:t.depthFunc(t.EQUAL);break;case vh:t.depthFunc(t.GEQUAL);break;case gh:t.depthFunc(t.GREATER);break;case mh:t.depthFunc(t.NOTEQUAL);break;default:t.depthFunc(t.LEQUAL)}ke=fe}},setLocked:function(fe){H=fe},setClear:function(fe){be!==fe&&(be=fe,_e&&(fe=1-fe),t.clearDepth(fe))},reset:function(){H=!1,ae=null,ke=null,be=null,_e=!1}}}function s(){let H=!1,_e=null,ae=null,ke=null,be=null,fe=null,He=null,st=null,an=null;return{setTest:function(Ct){H||(Ct?ne(t.STENCIL_TEST):ye(t.STENCIL_TEST))},setMask:function(Ct){_e!==Ct&&!H&&(t.stencilMask(Ct),_e=Ct)},setFunc:function(Ct,Uo,bo){(ae!==Ct||ke!==Uo||be!==bo)&&(t.stencilFunc(Ct,Uo,bo),ae=Ct,ke=Uo,be=bo)},setOp:function(Ct,Uo,bo){(fe!==Ct||He!==Uo||st!==bo)&&(t.stencilOp(Ct,Uo,bo),fe=Ct,He=Uo,st=bo)},setLocked:function(Ct){H=Ct},setClear:function(Ct){an!==Ct&&(t.clearStencil(Ct),an=Ct)},reset:function(){H=!1,_e=null,ae=null,ke=null,be=null,fe=null,He=null,st=null,an=null}}}const i=new e,a=new o,r=new s,c=new WeakMap,l=new WeakMap;let d={},f={},u={},h=new WeakMap,p=[],x=null,m=!1,g=null,v=null,w=null,M=null,y=null,b=null,T=null,_=new oe(0,0,0),S=0,E=!1,A=null,R=null,C=null,I=null,L=null;const N=t.getParameter(t.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let U=!1,F=0;const z=t.getParameter(t.VERSION);z.indexOf("WebGL")!==-1?(F=parseFloat(/^WebGL (\d)/.exec(z)[1]),U=F>=1):z.indexOf("OpenGL ES")!==-1&&(F=parseFloat(/^OpenGL ES (\d)/.exec(z)[1]),U=F>=2);let G=null,O={};const B=t.getParameter(t.SCISSOR_BOX),J=t.getParameter(t.VIEWPORT),ue=new un().fromArray(B),xe=new un().fromArray(J);function j(H,_e,ae,ke){const be=new Uint8Array(4),fe=t.createTexture();t.bindTexture(H,fe),t.texParameteri(H,t.TEXTURE_MIN_FILTER,t.NEAREST),t.texParameteri(H,t.TEXTURE_MAG_FILTER,t.NEAREST);for(let He=0;He<ae;He++)H===t.TEXTURE_3D||H===t.TEXTURE_2D_ARRAY?t.texImage3D(_e,0,t.RGBA,1,1,ke,0,t.RGBA,t.UNSIGNED_BYTE,be):t.texImage2D(_e+He,0,t.RGBA,1,1,0,t.RGBA,t.UNSIGNED_BYTE,be);return fe}const ie={};ie[t.TEXTURE_2D]=j(t.TEXTURE_2D,t.TEXTURE_2D,1),ie[t.TEXTURE_CUBE_MAP]=j(t.TEXTURE_CUBE_MAP,t.TEXTURE_CUBE_MAP_POSITIVE_X,6),ie[t.TEXTURE_2D_ARRAY]=j(t.TEXTURE_2D_ARRAY,t.TEXTURE_2D_ARRAY,1,1),ie[t.TEXTURE_3D]=j(t.TEXTURE_3D,t.TEXTURE_3D,1,1),i.setClear(0,0,0,1),a.setClear(1),r.setClear(0),ne(t.DEPTH_TEST),a.setFunc(W0),Pt(!1),kt(wc),ne(t.CULL_FACE),gt(vn);function ne(H){d[H]!==!0&&(t.enable(H),d[H]=!0)}function ye(H){d[H]!==!1&&(t.disable(H),d[H]=!1)}function Ie(H,_e){return u[H]!==_e?(t.bindFramebuffer(H,_e),u[H]=_e,H===t.DRAW_FRAMEBUFFER&&(u[t.FRAMEBUFFER]=_e),H===t.FRAMEBUFFER&&(u[t.DRAW_FRAMEBUFFER]=_e),!0):!1}function Fe(H,_e){let ae=p,ke=!1;if(H){ae=h.get(_e),ae===void 0&&(ae=[],h.set(_e,ae));const be=H.textures;if(ae.length!==be.length||ae[0]!==t.COLOR_ATTACHMENT0){for(let fe=0,He=be.length;fe<He;fe++)ae[fe]=t.COLOR_ATTACHMENT0+fe;ae.length=be.length,ke=!0}}else ae[0]!==t.BACK&&(ae[0]=t.BACK,ke=!0);ke&&t.drawBuffers(ae)}function tt(H){return x!==H?(t.useProgram(H),x=H,!0):!1}const je={[zo]:t.FUNC_ADD,[Hu]:t.FUNC_SUBTRACT,[Gu]:t.FUNC_REVERSE_SUBTRACT};je[Lh]=t.MIN,je[Nh]=t.MAX;const _t={[Ti]:t.ZERO,[eh]:t.ONE,[Ju]:t.SRC_COLOR,[Qu]:t.SRC_ALPHA,[Zu]:t.SRC_ALPHA_SATURATE,[Lr]:t.DST_COLOR,[Ir]:t.DST_ALPHA,[ju]:t.ONE_MINUS_SRC_COLOR,[$u]:t.ONE_MINUS_SRC_ALPHA,[Yu]:t.ONE_MINUS_DST_COLOR,[qu]:t.ONE_MINUS_DST_ALPHA,[Ku]:t.CONSTANT_COLOR,[Xu]:t.ONE_MINUS_CONSTANT_COLOR,[Wu]:t.CONSTANT_ALPHA,[Vu]:t.ONE_MINUS_CONSTANT_ALPHA};function gt(H,_e,ae,ke,be,fe,He,st,an,Ct){if(H===vn){m===!0&&(ye(t.BLEND),m=!1);return}if(m===!1&&(ne(t.BLEND),m=!0),H!==Id){if(H!==g||Ct!==E){if((v!==zo||y!==zo)&&(t.blendEquation(t.FUNC_ADD),v=zo,y=zo),Ct)switch(H){case pa:t.blendFuncSeparate(t.ONE,t.ONE_MINUS_SRC_ALPHA,t.ONE,t.ONE_MINUS_SRC_ALPHA);break;case ys:t.blendFunc(t.ONE,t.ONE);break;case Sc:t.blendFuncSeparate(t.ZERO,t.ONE_MINUS_SRC_COLOR,t.ZERO,t.ONE);break;case bc:t.blendFuncSeparate(t.DST_COLOR,t.ONE_MINUS_SRC_ALPHA,t.ZERO,t.ONE);break;default:Wt("WebGLState: Invalid blending: ",H);break}else switch(H){case pa:t.blendFuncSeparate(t.SRC_ALPHA,t.ONE_MINUS_SRC_ALPHA,t.ONE,t.ONE_MINUS_SRC_ALPHA);break;case ys:t.blendFuncSeparate(t.SRC_ALPHA,t.ONE,t.ONE,t.ONE);break;case Sc:Wt("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case bc:Wt("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Wt("WebGLState: Invalid blending: ",H);break}w=null,M=null,b=null,T=null,_.set(0,0,0),S=0,g=H,E=Ct}return}be=be||_e,fe=fe||ae,He=He||ke,(_e!==v||be!==y)&&(t.blendEquationSeparate(je[_e],je[be]),v=_e,y=be),(ae!==w||ke!==M||fe!==b||He!==T)&&(t.blendFuncSeparate(_t[ae],_t[ke],_t[fe],_t[He]),w=ae,M=ke,b=fe,T=He),(st.equals(_)===!1||an!==S)&&(t.blendColor(st.r,st.g,st.b,an),_.copy(st),S=an),g=H,E=!1}function nt(H,_e){H.side===qe?ye(t.CULL_FACE):ne(t.CULL_FACE);let ae=H.side===Dn;_e&&(ae=!ae),Pt(ae),H.blending===pa&&H.transparent===!1?gt(vn):gt(H.blending,H.blendEquation,H.blendSrc,H.blendDst,H.blendEquationAlpha,H.blendSrcAlpha,H.blendDstAlpha,H.blendColor,H.blendAlpha,H.premultipliedAlpha),a.setFunc(H.depthFunc),a.setTest(H.depthTest),a.setMask(H.depthWrite),i.setMask(H.colorWrite);const ke=H.stencilWrite;r.setTest(ke),ke&&(r.setMask(H.stencilWriteMask),r.setFunc(H.stencilFunc,H.stencilRef,H.stencilFuncMask),r.setOp(H.stencilFail,H.stencilZFail,H.stencilZPass)),W(H.polygonOffset,H.polygonOffsetFactor,H.polygonOffsetUnits),H.alphaToCoverage===!0?ne(t.SAMPLE_ALPHA_TO_COVERAGE):ye(t.SAMPLE_ALPHA_TO_COVERAGE)}function Pt(H){A!==H&&(H?t.frontFace(t.CW):t.frontFace(t.CCW),A=H)}function kt(H){H!==bh?(ne(t.CULL_FACE),H!==R&&(H===wc?t.cullFace(t.BACK):H===Sh?t.cullFace(t.FRONT):t.cullFace(t.FRONT_AND_BACK))):ye(t.CULL_FACE),R=H}function xn(H){H!==C&&(U&&t.lineWidth(H),C=H)}function W(H,_e,ae){H?(ne(t.POLYGON_OFFSET_FILL),(I!==_e||L!==ae)&&(I=_e,L=ae,a.getReversed()&&(_e=-_e),t.polygonOffset(_e,ae))):ye(t.POLYGON_OFFSET_FILL)}function Qt(H){H?ne(t.SCISSOR_TEST):ye(t.SCISSOR_TEST)}function rt(H){H===void 0&&(H=t.TEXTURE0+N-1),G!==H&&(t.activeTexture(H),G=H)}function At(H,_e,ae){ae===void 0&&(G===null?ae=t.TEXTURE0+N-1:ae=G);let ke=O[ae];ke===void 0&&(ke={type:void 0,texture:void 0},O[ae]=ke),(ke.type!==H||ke.texture!==_e)&&(G!==ae&&(t.activeTexture(ae),G=ae),t.bindTexture(H,_e||ie[H]),ke.type=H,ke.texture=_e)}function Te(){const H=O[G];H!==void 0&&H.type!==void 0&&(t.bindTexture(H.type,null),H.type=void 0,H.texture=void 0)}function Ht(){try{t.compressedTexImage2D(...arguments)}catch(H){Wt("WebGLState:",H)}}function k(){try{t.compressedTexImage3D(...arguments)}catch(H){Wt("WebGLState:",H)}}function P(){try{t.texSubImage2D(...arguments)}catch(H){Wt("WebGLState:",H)}}function q(){try{t.texSubImage3D(...arguments)}catch(H){Wt("WebGLState:",H)}}function se(){try{t.compressedTexSubImage2D(...arguments)}catch(H){Wt("WebGLState:",H)}}function de(){try{t.compressedTexSubImage3D(...arguments)}catch(H){Wt("WebGLState:",H)}}function pe(){try{t.texStorage2D(...arguments)}catch(H){Wt("WebGLState:",H)}}function Me(){try{t.texStorage3D(...arguments)}catch(H){Wt("WebGLState:",H)}}function ee(){try{t.texImage2D(...arguments)}catch(H){Wt("WebGLState:",H)}}function re(){try{t.texImage3D(...arguments)}catch(H){Wt("WebGLState:",H)}}function Ce(H){return f[H]!==void 0?f[H]:t.getParameter(H)}function Oe(H,_e){f[H]!==_e&&(t.pixelStorei(H,_e),f[H]=_e)}function ve(H){ue.equals(H)===!1&&(t.scissor(H.x,H.y,H.z,H.w),ue.copy(H))}function me(H){xe.equals(H)===!1&&(t.viewport(H.x,H.y,H.z,H.w),xe.copy(H))}function $e(H,_e){let ae=l.get(_e);ae===void 0&&(ae=new WeakMap,l.set(_e,ae));let ke=ae.get(H);ke===void 0&&(ke=t.getUniformBlockIndex(_e,H.name),ae.set(H,ke))}function Ze(H,_e){const ke=l.get(_e).get(H);c.get(_e)!==ke&&(t.uniformBlockBinding(_e,ke,H.__bindingPointIndex),c.set(_e,ke))}function ht(){t.disable(t.BLEND),t.disable(t.CULL_FACE),t.disable(t.DEPTH_TEST),t.disable(t.POLYGON_OFFSET_FILL),t.disable(t.SCISSOR_TEST),t.disable(t.STENCIL_TEST),t.disable(t.SAMPLE_ALPHA_TO_COVERAGE),t.blendEquation(t.FUNC_ADD),t.blendFunc(t.ONE,t.ZERO),t.blendFuncSeparate(t.ONE,t.ZERO,t.ONE,t.ZERO),t.blendColor(0,0,0,0),t.colorMask(!0,!0,!0,!0),t.clearColor(0,0,0,0),t.depthMask(!0),t.depthFunc(t.LESS),a.setReversed(!1),t.clearDepth(1),t.stencilMask(4294967295),t.stencilFunc(t.ALWAYS,0,4294967295),t.stencilOp(t.KEEP,t.KEEP,t.KEEP),t.clearStencil(0),t.cullFace(t.BACK),t.frontFace(t.CCW),t.polygonOffset(0,0),t.activeTexture(t.TEXTURE0),t.bindFramebuffer(t.FRAMEBUFFER,null),t.bindFramebuffer(t.DRAW_FRAMEBUFFER,null),t.bindFramebuffer(t.READ_FRAMEBUFFER,null),t.useProgram(null),t.lineWidth(1),t.scissor(0,0,t.canvas.width,t.canvas.height),t.viewport(0,0,t.canvas.width,t.canvas.height),t.pixelStorei(t.PACK_ALIGNMENT,4),t.pixelStorei(t.UNPACK_ALIGNMENT,4),t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL,!1),t.pixelStorei(t.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),t.pixelStorei(t.UNPACK_COLORSPACE_CONVERSION_WEBGL,t.BROWSER_DEFAULT_WEBGL),t.pixelStorei(t.PACK_ROW_LENGTH,0),t.pixelStorei(t.PACK_SKIP_PIXELS,0),t.pixelStorei(t.PACK_SKIP_ROWS,0),t.pixelStorei(t.UNPACK_ROW_LENGTH,0),t.pixelStorei(t.UNPACK_IMAGE_HEIGHT,0),t.pixelStorei(t.UNPACK_SKIP_PIXELS,0),t.pixelStorei(t.UNPACK_SKIP_ROWS,0),t.pixelStorei(t.UNPACK_SKIP_IMAGES,0),d={},f={},G=null,O={},u={},h=new WeakMap,p=[],x=null,m=!1,g=null,v=null,w=null,M=null,y=null,b=null,T=null,_=new oe(0,0,0),S=0,E=!1,A=null,R=null,C=null,I=null,L=null,ue.set(0,0,t.canvas.width,t.canvas.height),xe.set(0,0,t.canvas.width,t.canvas.height),i.reset(),a.reset(),r.reset()}return{buffers:{color:i,depth:a,stencil:r},enable:ne,disable:ye,bindFramebuffer:Ie,drawBuffers:Fe,useProgram:tt,setBlending:gt,setMaterial:nt,setFlipSided:Pt,setCullFace:kt,setLineWidth:xn,setPolygonOffset:W,setScissorTest:Qt,activeTexture:rt,bindTexture:At,unbindTexture:Te,compressedTexImage2D:Ht,compressedTexImage3D:k,texImage2D:ee,texImage3D:re,pixelStorei:Oe,getParameter:Ce,updateUBOMapping:$e,uniformBlockBinding:Ze,texStorage2D:pe,texStorage3D:Me,texSubImage2D:P,texSubImage3D:q,compressedTexSubImage2D:se,compressedTexSubImage3D:de,scissor:ve,viewport:me,reset:ht}}function Qg(t,n,e,o,s,i,a){const r=n.has("WEBGL_multisampled_render_to_texture")?n.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new ot,d=new WeakMap,f=new Set;let u;const h=new WeakMap;let p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function x(k,P){return p?new OffscreenCanvas(k,P):Rh("canvas")}function m(k,P,q){let se=1;const de=Ht(k);if((de.width>q||de.height>q)&&(se=q/Math.max(de.width,de.height)),se<1)if(typeof HTMLImageElement<"u"&&k instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&k instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&k instanceof ImageBitmap||typeof VideoFrame<"u"&&k instanceof VideoFrame){const pe=Math.floor(se*de.width),Me=Math.floor(se*de.height);u===void 0&&(u=x(pe,Me));const ee=P?x(pe,Me):u;return ee.width=pe,ee.height=Me,ee.getContext("2d").drawImage(k,0,0,pe,Me),Rt("WebGLRenderer: Texture has been resized from ("+de.width+"x"+de.height+") to ("+pe+"x"+Me+")."),ee}else return"data"in k&&Rt("WebGLRenderer: Image in DataTexture is too big ("+de.width+"x"+de.height+")."),k;return k}function g(k){return k.generateMipmaps}function v(k){t.generateMipmap(k)}function w(k){return k.isWebGLCubeRenderTarget?t.TEXTURE_CUBE_MAP:k.isWebGL3DRenderTarget?t.TEXTURE_3D:k.isWebGLArrayRenderTarget||k.isCompressedArrayTexture?t.TEXTURE_2D_ARRAY:t.TEXTURE_2D}function M(k,P,q,se,de,pe=!1){if(k!==null){if(t[k]!==void 0)return t[k];Rt("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+k+"'")}let Me;se&&(Me=n.get("EXT_texture_norm16"),Me||Rt("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let ee=P;if(P===t.RED&&(q===t.FLOAT&&(ee=t.R32F),q===t.HALF_FLOAT&&(ee=t.R16F),q===t.UNSIGNED_BYTE&&(ee=t.R8),q===t.UNSIGNED_SHORT&&Me&&(ee=Me.R16_EXT),q===t.SHORT&&Me&&(ee=Me.R16_SNORM_EXT)),P===t.RED_INTEGER&&(q===t.UNSIGNED_BYTE&&(ee=t.R8UI),q===t.UNSIGNED_SHORT&&(ee=t.R16UI),q===t.UNSIGNED_INT&&(ee=t.R32UI),q===t.BYTE&&(ee=t.R8I),q===t.SHORT&&(ee=t.R16I),q===t.INT&&(ee=t.R32I)),P===t.RG&&(q===t.FLOAT&&(ee=t.RG32F),q===t.HALF_FLOAT&&(ee=t.RG16F),q===t.UNSIGNED_BYTE&&(ee=t.RG8),q===t.UNSIGNED_SHORT&&Me&&(ee=Me.RG16_EXT),q===t.SHORT&&Me&&(ee=Me.RG16_SNORM_EXT)),P===t.RG_INTEGER&&(q===t.UNSIGNED_BYTE&&(ee=t.RG8UI),q===t.UNSIGNED_SHORT&&(ee=t.RG16UI),q===t.UNSIGNED_INT&&(ee=t.RG32UI),q===t.BYTE&&(ee=t.RG8I),q===t.SHORT&&(ee=t.RG16I),q===t.INT&&(ee=t.RG32I)),P===t.RGB_INTEGER&&(q===t.UNSIGNED_BYTE&&(ee=t.RGB8UI),q===t.UNSIGNED_SHORT&&(ee=t.RGB16UI),q===t.UNSIGNED_INT&&(ee=t.RGB32UI),q===t.BYTE&&(ee=t.RGB8I),q===t.SHORT&&(ee=t.RGB16I),q===t.INT&&(ee=t.RGB32I)),P===t.RGBA_INTEGER&&(q===t.UNSIGNED_BYTE&&(ee=t.RGBA8UI),q===t.UNSIGNED_SHORT&&(ee=t.RGBA16UI),q===t.UNSIGNED_INT&&(ee=t.RGBA32UI),q===t.BYTE&&(ee=t.RGBA8I),q===t.SHORT&&(ee=t.RGBA16I),q===t.INT&&(ee=t.RGBA32I)),P===t.RGB&&(q===t.UNSIGNED_SHORT&&Me&&(ee=Me.RGB16_EXT),q===t.SHORT&&Me&&(ee=Me.RGB16_SNORM_EXT),q===t.UNSIGNED_INT_5_9_9_9_REV&&(ee=t.RGB9_E5),q===t.UNSIGNED_INT_10F_11F_11F_REV&&(ee=t.R11F_G11F_B10F)),P===t.RGBA){const re=pe?kd:Xt.getTransfer(de);q===t.FLOAT&&(ee=t.RGBA32F),q===t.HALF_FLOAT&&(ee=t.RGBA16F),q===t.UNSIGNED_BYTE&&(ee=re===Bt?t.SRGB8_ALPHA8:t.RGBA8),q===t.UNSIGNED_SHORT&&Me&&(ee=Me.RGBA16_EXT),q===t.SHORT&&Me&&(ee=Me.RGBA16_SNORM_EXT),q===t.UNSIGNED_SHORT_4_4_4_4&&(ee=t.RGBA4),q===t.UNSIGNED_SHORT_5_5_5_1&&(ee=t.RGB5_A1)}return(ee===t.R16F||ee===t.R32F||ee===t.RG16F||ee===t.RG32F||ee===t.RGBA16F||ee===t.RGBA32F)&&n.get("EXT_color_buffer_float"),ee}function y(k,P){let q;return k?P===null||P===Ps||P===oi?q=t.DEPTH24_STENCIL8:P===is?q=t.DEPTH32F_STENCIL8:P===wa&&(q=t.DEPTH24_STENCIL8,Rt("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):P===null||P===Ps||P===oi?q=t.DEPTH_COMPONENT24:P===is?q=t.DEPTH_COMPONENT32F:P===wa&&(q=t.DEPTH_COMPONENT16),q}function b(k,P){return g(k)===!0||k.isFramebufferTexture&&k.minFilter!==go&&k.minFilter!==en?Math.log2(Math.max(P.width,P.height))+1:k.mipmaps!==void 0&&k.mipmaps.length>0?k.mipmaps.length:k.isCompressedTexture&&Array.isArray(k.image)?P.mipmaps.length:1}function T(k){const P=k.target;P.removeEventListener("dispose",T),S(P),P.isVideoTexture&&d.delete(P),P.isHTMLTexture&&f.delete(P)}function _(k){const P=k.target;P.removeEventListener("dispose",_),A(P)}function S(k){const P=o.get(k);if(P.__webglInit===void 0)return;const q=k.source,se=h.get(q);if(se){const de=se[P.__cacheKey];de.usedTimes--,de.usedTimes===0&&E(k),Object.keys(se).length===0&&h.delete(q)}o.remove(k)}function E(k){const P=o.get(k);t.deleteTexture(P.__webglTexture);const q=k.source,se=h.get(q);delete se[P.__cacheKey],a.memory.textures--}function A(k){const P=o.get(k);if(k.depthTexture&&(k.depthTexture.dispose(),o.remove(k.depthTexture)),k.isWebGLCubeRenderTarget)for(let se=0;se<6;se++){if(Array.isArray(P.__webglFramebuffer[se]))for(let de=0;de<P.__webglFramebuffer[se].length;de++)t.deleteFramebuffer(P.__webglFramebuffer[se][de]);else t.deleteFramebuffer(P.__webglFramebuffer[se]);P.__webglDepthbuffer&&t.deleteRenderbuffer(P.__webglDepthbuffer[se])}else{if(Array.isArray(P.__webglFramebuffer))for(let se=0;se<P.__webglFramebuffer.length;se++)t.deleteFramebuffer(P.__webglFramebuffer[se]);else t.deleteFramebuffer(P.__webglFramebuffer);if(P.__webglDepthbuffer&&t.deleteRenderbuffer(P.__webglDepthbuffer),P.__webglMultisampledFramebuffer&&t.deleteFramebuffer(P.__webglMultisampledFramebuffer),P.__webglColorRenderbuffer)for(let se=0;se<P.__webglColorRenderbuffer.length;se++)P.__webglColorRenderbuffer[se]&&t.deleteRenderbuffer(P.__webglColorRenderbuffer[se]);P.__webglDepthRenderbuffer&&t.deleteRenderbuffer(P.__webglDepthRenderbuffer)}const q=k.textures;for(let se=0,de=q.length;se<de;se++){const pe=o.get(q[se]);pe.__webglTexture&&(t.deleteTexture(pe.__webglTexture),a.memory.textures--),o.remove(q[se])}o.remove(k)}let R=0;function C(){R=0}function I(){return R}function L(k){R=k}function N(){const k=R;return k>=s.maxTextures&&Rt("WebGLTextures: Trying to use "+k+" texture units while this GPU supports only "+s.maxTextures),R+=1,k}function U(k){const P=[];return P.push(k.wrapS),P.push(k.wrapT),P.push(k.wrapR||0),P.push(k.magFilter),P.push(k.minFilter),P.push(k.anisotropy),P.push(k.internalFormat),P.push(k.format),P.push(k.type),P.push(k.generateMipmaps),P.push(k.premultiplyAlpha),P.push(k.flipY),P.push(k.unpackAlignment),P.push(k.colorSpace),P.join()}function F(k,P){const q=o.get(k);if(k.isVideoTexture&&At(k),k.isRenderTargetTexture===!1&&k.isExternalTexture!==!0&&k.version>0&&q.__version!==k.version){const se=k.image;if(se===null)Rt("WebGLRenderer: Texture marked for update but no image data found.");else if(se.complete===!1)Rt("WebGLRenderer: Texture marked for update but image is incomplete");else{ye(q,k,P);return}}else k.isExternalTexture&&(q.__webglTexture=k.sourceTexture?k.sourceTexture:null);e.bindTexture(t.TEXTURE_2D,q.__webglTexture,t.TEXTURE0+P)}function z(k,P){const q=o.get(k);if(k.isRenderTargetTexture===!1&&k.version>0&&q.__version!==k.version){ye(q,k,P);return}else k.isExternalTexture&&(q.__webglTexture=k.sourceTexture?k.sourceTexture:null);e.bindTexture(t.TEXTURE_2D_ARRAY,q.__webglTexture,t.TEXTURE0+P)}function G(k,P){const q=o.get(k);if(k.isRenderTargetTexture===!1&&k.version>0&&q.__version!==k.version){ye(q,k,P);return}e.bindTexture(t.TEXTURE_3D,q.__webglTexture,t.TEXTURE0+P)}function O(k,P){const q=o.get(k);if(k.isCubeDepthTexture!==!0&&k.version>0&&q.__version!==k.version){Ie(q,k,P);return}e.bindTexture(t.TEXTURE_CUBE_MAP,q.__webglTexture,t.TEXTURE0+P)}const B={[Hn]:t.REPEAT,[Cs]:t.CLAMP_TO_EDGE,[_d]:t.MIRRORED_REPEAT},J={[go]:t.NEAREST,[Md]:t.NEAREST_MIPMAP_NEAREST,[Ei]:t.NEAREST_MIPMAP_LINEAR,[en]:t.LINEAR,[ha]:t.LINEAR_MIPMAP_NEAREST,[Yn]:t.LINEAR_MIPMAP_LINEAR},ue={[ah]:t.NEVER,[ih]:t.ALWAYS,[sh]:t.LESS,[t0]:t.LEQUAL,[oh]:t.EQUAL,[e0]:t.GEQUAL,[nh]:t.GREATER,[th]:t.NOTEQUAL};function xe(k,P){if(P.type===is&&n.has("OES_texture_float_linear")===!1&&(P.magFilter===en||P.magFilter===ha||P.magFilter===Ei||P.magFilter===Yn||P.minFilter===en||P.minFilter===ha||P.minFilter===Ei||P.minFilter===Yn)&&Rt("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),t.texParameteri(k,t.TEXTURE_WRAP_S,B[P.wrapS]),t.texParameteri(k,t.TEXTURE_WRAP_T,B[P.wrapT]),(k===t.TEXTURE_3D||k===t.TEXTURE_2D_ARRAY)&&t.texParameteri(k,t.TEXTURE_WRAP_R,B[P.wrapR]),t.texParameteri(k,t.TEXTURE_MAG_FILTER,J[P.magFilter]),t.texParameteri(k,t.TEXTURE_MIN_FILTER,J[P.minFilter]),P.compareFunction&&(t.texParameteri(k,t.TEXTURE_COMPARE_MODE,t.COMPARE_REF_TO_TEXTURE),t.texParameteri(k,t.TEXTURE_COMPARE_FUNC,ue[P.compareFunction])),n.has("EXT_texture_filter_anisotropic")===!0){if(P.magFilter===go||P.minFilter!==Ei&&P.minFilter!==Yn||P.type===is&&n.has("OES_texture_float_linear")===!1)return;if(P.anisotropy>1||o.get(P).__currentAnisotropy){const q=n.get("EXT_texture_filter_anisotropic");t.texParameterf(k,q.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(P.anisotropy,s.getMaxAnisotropy())),o.get(P).__currentAnisotropy=P.anisotropy}}}function j(k,P){let q=!1;k.__webglInit===void 0&&(k.__webglInit=!0,P.addEventListener("dispose",T));const se=P.source;let de=h.get(se);de===void 0&&(de={},h.set(se,de));const pe=U(P);if(pe!==k.__cacheKey){de[pe]===void 0&&(de[pe]={texture:t.createTexture(),usedTimes:0},a.memory.textures++,q=!0),de[pe].usedTimes++;const Me=de[k.__cacheKey];Me!==void 0&&(de[k.__cacheKey].usedTimes--,Me.usedTimes===0&&E(P)),k.__cacheKey=pe,k.__webglTexture=de[pe].texture}return q}function ie(k,P,q){return Math.floor(Math.floor(k/q)/P)}function ne(k,P,q,se){const pe=k.updateRanges;if(pe.length===0)e.texSubImage2D(t.TEXTURE_2D,0,0,0,P.width,P.height,q,se,P.data);else{pe.sort((Oe,ve)=>Oe.start-ve.start);let Me=0;for(let Oe=1;Oe<pe.length;Oe++){const ve=pe[Me],me=pe[Oe],$e=ve.start+ve.count,Ze=ie(me.start,P.width,4),ht=ie(ve.start,P.width,4);me.start<=$e+1&&Ze===ht&&ie(me.start+me.count-1,P.width,4)===Ze?ve.count=Math.max(ve.count,me.start+me.count-ve.start):(++Me,pe[Me]=me)}pe.length=Me+1;const ee=e.getParameter(t.UNPACK_ROW_LENGTH),re=e.getParameter(t.UNPACK_SKIP_PIXELS),Ce=e.getParameter(t.UNPACK_SKIP_ROWS);e.pixelStorei(t.UNPACK_ROW_LENGTH,P.width);for(let Oe=0,ve=pe.length;Oe<ve;Oe++){const me=pe[Oe],$e=Math.floor(me.start/4),Ze=Math.ceil(me.count/4),ht=$e%P.width,H=Math.floor($e/P.width),_e=Ze,ae=1;e.pixelStorei(t.UNPACK_SKIP_PIXELS,ht),e.pixelStorei(t.UNPACK_SKIP_ROWS,H),e.texSubImage2D(t.TEXTURE_2D,0,ht,H,_e,ae,q,se,P.data)}k.clearUpdateRanges(),e.pixelStorei(t.UNPACK_ROW_LENGTH,ee),e.pixelStorei(t.UNPACK_SKIP_PIXELS,re),e.pixelStorei(t.UNPACK_SKIP_ROWS,Ce)}}function ye(k,P,q){let se=t.TEXTURE_2D;(P.isDataArrayTexture||P.isCompressedArrayTexture)&&(se=t.TEXTURE_2D_ARRAY),P.isData3DTexture&&(se=t.TEXTURE_3D);const de=j(k,P),pe=P.source;e.bindTexture(se,k.__webglTexture,t.TEXTURE0+q);const Me=o.get(pe);if(pe.version!==Me.__version||de===!0){if(e.activeTexture(t.TEXTURE0+q),(typeof ImageBitmap<"u"&&P.image instanceof ImageBitmap)===!1){const ae=Xt.getPrimaries(Xt.workingColorSpace),ke=P.colorSpace===io?null:Xt.getPrimaries(P.colorSpace),be=P.colorSpace===io||ae===ke?t.NONE:t.BROWSER_DEFAULT_WEBGL;e.pixelStorei(t.UNPACK_FLIP_Y_WEBGL,P.flipY),e.pixelStorei(t.UNPACK_PREMULTIPLY_ALPHA_WEBGL,P.premultiplyAlpha),e.pixelStorei(t.UNPACK_COLORSPACE_CONVERSION_WEBGL,be)}e.pixelStorei(t.UNPACK_ALIGNMENT,P.unpackAlignment);let re=m(P.image,!1,s.maxTextureSize);re=Te(P,re);const Ce=i.convert(P.format,P.colorSpace),Oe=i.convert(P.type);let ve=M(P.internalFormat,Ce,Oe,P.normalized,P.colorSpace,P.isVideoTexture);xe(se,P);let me;const $e=P.mipmaps,Ze=P.isVideoTexture!==!0,ht=Me.__version===void 0||de===!0,H=pe.dataReady,_e=b(P,re);if(P.isDepthTexture)ve=y(P.format===bs,P.type),ht&&(Ze?e.texStorage2D(t.TEXTURE_2D,1,ve,re.width,re.height):e.texImage2D(t.TEXTURE_2D,0,ve,re.width,re.height,0,Ce,Oe,null));else if(P.isDataTexture)if($e.length>0){Ze&&ht&&e.texStorage2D(t.TEXTURE_2D,_e,ve,$e[0].width,$e[0].height);for(let ae=0,ke=$e.length;ae<ke;ae++)me=$e[ae],Ze?H&&e.texSubImage2D(t.TEXTURE_2D,ae,0,0,me.width,me.height,Ce,Oe,me.data):e.texImage2D(t.TEXTURE_2D,ae,ve,me.width,me.height,0,Ce,Oe,me.data);P.generateMipmaps=!1}else Ze?(ht&&e.texStorage2D(t.TEXTURE_2D,_e,ve,re.width,re.height),H&&ne(P,re,Ce,Oe)):e.texImage2D(t.TEXTURE_2D,0,ve,re.width,re.height,0,Ce,Oe,re.data);else if(P.isCompressedTexture)if(P.isCompressedArrayTexture){Ze&&ht&&e.texStorage3D(t.TEXTURE_2D_ARRAY,_e,ve,$e[0].width,$e[0].height,re.depth);for(let ae=0,ke=$e.length;ae<ke;ae++)if(me=$e[ae],P.format!==kn)if(Ce!==null)if(Ze){if(H)if(P.layerUpdates.size>0){const be=Tc(me.width,me.height,P.format,P.type);for(const fe of P.layerUpdates){const He=me.data.subarray(fe*be/me.data.BYTES_PER_ELEMENT,(fe+1)*be/me.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(t.TEXTURE_2D_ARRAY,ae,0,0,fe,me.width,me.height,1,Ce,He)}P.clearLayerUpdates()}else e.compressedTexSubImage3D(t.TEXTURE_2D_ARRAY,ae,0,0,0,me.width,me.height,re.depth,Ce,me.data)}else e.compressedTexImage3D(t.TEXTURE_2D_ARRAY,ae,ve,me.width,me.height,re.depth,0,me.data,0,0);else Rt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Ze?H&&e.texSubImage3D(t.TEXTURE_2D_ARRAY,ae,0,0,0,me.width,me.height,re.depth,Ce,Oe,me.data):e.texImage3D(t.TEXTURE_2D_ARRAY,ae,ve,me.width,me.height,re.depth,0,Ce,Oe,me.data)}else{Ze&&ht&&e.texStorage2D(t.TEXTURE_2D,_e,ve,$e[0].width,$e[0].height);for(let ae=0,ke=$e.length;ae<ke;ae++)me=$e[ae],P.format!==kn?Ce!==null?Ze?H&&e.compressedTexSubImage2D(t.TEXTURE_2D,ae,0,0,me.width,me.height,Ce,me.data):e.compressedTexImage2D(t.TEXTURE_2D,ae,ve,me.width,me.height,0,me.data):Rt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ze?H&&e.texSubImage2D(t.TEXTURE_2D,ae,0,0,me.width,me.height,Ce,Oe,me.data):e.texImage2D(t.TEXTURE_2D,ae,ve,me.width,me.height,0,Ce,Oe,me.data)}else if(P.isDataArrayTexture)if(Ze){if(ht&&e.texStorage3D(t.TEXTURE_2D_ARRAY,_e,ve,re.width,re.height,re.depth),H)if(P.layerUpdates.size>0){const ae=Tc(re.width,re.height,P.format,P.type);for(const ke of P.layerUpdates){const be=re.data.subarray(ke*ae/re.data.BYTES_PER_ELEMENT,(ke+1)*ae/re.data.BYTES_PER_ELEMENT);e.texSubImage3D(t.TEXTURE_2D_ARRAY,0,0,0,ke,re.width,re.height,1,Ce,Oe,be)}P.clearLayerUpdates()}else e.texSubImage3D(t.TEXTURE_2D_ARRAY,0,0,0,0,re.width,re.height,re.depth,Ce,Oe,re.data)}else e.texImage3D(t.TEXTURE_2D_ARRAY,0,ve,re.width,re.height,re.depth,0,Ce,Oe,re.data);else if(P.isData3DTexture)Ze?(ht&&e.texStorage3D(t.TEXTURE_3D,_e,ve,re.width,re.height,re.depth),H&&e.texSubImage3D(t.TEXTURE_3D,0,0,0,0,re.width,re.height,re.depth,Ce,Oe,re.data)):e.texImage3D(t.TEXTURE_3D,0,ve,re.width,re.height,re.depth,0,Ce,Oe,re.data);else if(P.isFramebufferTexture){if(ht)if(Ze)e.texStorage2D(t.TEXTURE_2D,_e,ve,re.width,re.height);else{let ae=re.width,ke=re.height;for(let be=0;be<_e;be++)e.texImage2D(t.TEXTURE_2D,be,ve,ae,ke,0,Ce,Oe,null),ae>>=1,ke>>=1}}else if(P.isHTMLTexture){if("texElementImage2D"in t){const ae=t.canvas;if(ae.hasAttribute("layoutsubtree")||ae.setAttribute("layoutsubtree","true"),re.parentNode!==ae){ae.appendChild(re),f.add(P),ae.onpaint=st=>{const an=st.changedElements;for(const Ct of f)an.includes(Ct.image)&&(Ct.needsUpdate=!0)},ae.requestPaint();return}const ke=0,be=t.RGBA,fe=t.RGBA,He=t.UNSIGNED_BYTE;t.texElementImage2D(t.TEXTURE_2D,ke,be,fe,He,re),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.CLAMP_TO_EDGE),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,t.CLAMP_TO_EDGE)}}else if($e.length>0){if(Ze&&ht){const ae=Ht($e[0]);e.texStorage2D(t.TEXTURE_2D,_e,ve,ae.width,ae.height)}for(let ae=0,ke=$e.length;ae<ke;ae++)me=$e[ae],Ze?H&&e.texSubImage2D(t.TEXTURE_2D,ae,0,0,Ce,Oe,me):e.texImage2D(t.TEXTURE_2D,ae,ve,Ce,Oe,me);P.generateMipmaps=!1}else if(Ze){if(ht){const ae=Ht(re);e.texStorage2D(t.TEXTURE_2D,_e,ve,ae.width,ae.height)}H&&e.texSubImage2D(t.TEXTURE_2D,0,0,0,Ce,Oe,re)}else e.texImage2D(t.TEXTURE_2D,0,ve,Ce,Oe,re);g(P)&&v(se),Me.__version=pe.version,P.onUpdate&&P.onUpdate(P)}k.__version=P.version}function Ie(k,P,q){if(P.image.length!==6)return;const se=j(k,P),de=P.source;e.bindTexture(t.TEXTURE_CUBE_MAP,k.__webglTexture,t.TEXTURE0+q);const pe=o.get(de);if(de.version!==pe.__version||se===!0){e.activeTexture(t.TEXTURE0+q);const Me=Xt.getPrimaries(Xt.workingColorSpace),ee=P.colorSpace===io?null:Xt.getPrimaries(P.colorSpace),re=P.colorSpace===io||Me===ee?t.NONE:t.BROWSER_DEFAULT_WEBGL;e.pixelStorei(t.UNPACK_FLIP_Y_WEBGL,P.flipY),e.pixelStorei(t.UNPACK_PREMULTIPLY_ALPHA_WEBGL,P.premultiplyAlpha),e.pixelStorei(t.UNPACK_ALIGNMENT,P.unpackAlignment),e.pixelStorei(t.UNPACK_COLORSPACE_CONVERSION_WEBGL,re);const Ce=P.isCompressedTexture||P.image[0].isCompressedTexture,Oe=P.image[0]&&P.image[0].isDataTexture,ve=[];for(let fe=0;fe<6;fe++)!Ce&&!Oe?ve[fe]=m(P.image[fe],!0,s.maxCubemapSize):ve[fe]=Oe?P.image[fe].image:P.image[fe],ve[fe]=Te(P,ve[fe]);const me=ve[0],$e=i.convert(P.format,P.colorSpace),Ze=i.convert(P.type),ht=M(P.internalFormat,$e,Ze,P.normalized,P.colorSpace),H=P.isVideoTexture!==!0,_e=pe.__version===void 0||se===!0,ae=de.dataReady;let ke=b(P,me);xe(t.TEXTURE_CUBE_MAP,P);let be;if(Ce){H&&_e&&e.texStorage2D(t.TEXTURE_CUBE_MAP,ke,ht,me.width,me.height);for(let fe=0;fe<6;fe++){be=ve[fe].mipmaps;for(let He=0;He<be.length;He++){const st=be[He];P.format!==kn?$e!==null?H?ae&&e.compressedTexSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+fe,He,0,0,st.width,st.height,$e,st.data):e.compressedTexImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+fe,He,ht,st.width,st.height,0,st.data):Rt("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):H?ae&&e.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+fe,He,0,0,st.width,st.height,$e,Ze,st.data):e.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+fe,He,ht,st.width,st.height,0,$e,Ze,st.data)}}}else{if(be=P.mipmaps,H&&_e){be.length>0&&ke++;const fe=Ht(ve[0]);e.texStorage2D(t.TEXTURE_CUBE_MAP,ke,ht,fe.width,fe.height)}for(let fe=0;fe<6;fe++)if(Oe){H?ae&&e.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+fe,0,0,0,ve[fe].width,ve[fe].height,$e,Ze,ve[fe].data):e.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+fe,0,ht,ve[fe].width,ve[fe].height,0,$e,Ze,ve[fe].data);for(let He=0;He<be.length;He++){const an=be[He].image[fe].image;H?ae&&e.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+fe,He+1,0,0,an.width,an.height,$e,Ze,an.data):e.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+fe,He+1,ht,an.width,an.height,0,$e,Ze,an.data)}}else{H?ae&&e.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+fe,0,0,0,$e,Ze,ve[fe]):e.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+fe,0,ht,$e,Ze,ve[fe]);for(let He=0;He<be.length;He++){const st=be[He];H?ae&&e.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+fe,He+1,0,0,$e,Ze,st.image[fe]):e.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+fe,He+1,ht,$e,Ze,st.image[fe])}}}g(P)&&v(t.TEXTURE_CUBE_MAP),pe.__version=de.version,P.onUpdate&&P.onUpdate(P)}k.__version=P.version}function Fe(k,P,q,se,de,pe){const Me=i.convert(q.format,q.colorSpace),ee=i.convert(q.type),re=M(q.internalFormat,Me,ee,q.normalized,q.colorSpace),Ce=o.get(P),Oe=o.get(q);if(Oe.__renderTarget=P,!Ce.__hasExternalTextures){const ve=Math.max(1,P.width>>pe),me=Math.max(1,P.height>>pe);de===t.TEXTURE_3D||de===t.TEXTURE_2D_ARRAY?e.texImage3D(de,pe,re,ve,me,P.depth,0,Me,ee,null):e.texImage2D(de,pe,re,ve,me,0,Me,ee,null)}e.bindFramebuffer(t.FRAMEBUFFER,k),rt(P)?r.framebufferTexture2DMultisampleEXT(t.FRAMEBUFFER,se,de,Oe.__webglTexture,0,Qt(P)):(de===t.TEXTURE_2D||de>=t.TEXTURE_CUBE_MAP_POSITIVE_X&&de<=t.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&t.framebufferTexture2D(t.FRAMEBUFFER,se,de,Oe.__webglTexture,pe),e.bindFramebuffer(t.FRAMEBUFFER,null)}function tt(k,P,q){if(t.bindRenderbuffer(t.RENDERBUFFER,k),P.depthBuffer){const se=P.depthTexture,de=se&&se.isDepthTexture?se.type:null,pe=y(P.stencilBuffer,de),Me=P.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT;rt(P)?r.renderbufferStorageMultisampleEXT(t.RENDERBUFFER,Qt(P),pe,P.width,P.height):q?t.renderbufferStorageMultisample(t.RENDERBUFFER,Qt(P),pe,P.width,P.height):t.renderbufferStorage(t.RENDERBUFFER,pe,P.width,P.height),t.framebufferRenderbuffer(t.FRAMEBUFFER,Me,t.RENDERBUFFER,k)}else{const se=P.textures;for(let de=0;de<se.length;de++){const pe=se[de],Me=i.convert(pe.format,pe.colorSpace),ee=i.convert(pe.type),re=M(pe.internalFormat,Me,ee,pe.normalized,pe.colorSpace);rt(P)?r.renderbufferStorageMultisampleEXT(t.RENDERBUFFER,Qt(P),re,P.width,P.height):q?t.renderbufferStorageMultisample(t.RENDERBUFFER,Qt(P),re,P.width,P.height):t.renderbufferStorage(t.RENDERBUFFER,re,P.width,P.height)}}t.bindRenderbuffer(t.RENDERBUFFER,null)}function je(k,P,q){const se=P.isWebGLCubeRenderTarget===!0;if(e.bindFramebuffer(t.FRAMEBUFFER,k),!(P.depthTexture&&P.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const de=o.get(P.depthTexture);if(de.__renderTarget=P,(!de.__webglTexture||P.depthTexture.image.width!==P.width||P.depthTexture.image.height!==P.height)&&(P.depthTexture.image.width=P.width,P.depthTexture.image.height=P.height,P.depthTexture.needsUpdate=!0),se){if(de.__webglInit===void 0&&(de.__webglInit=!0,P.depthTexture.addEventListener("dispose",T)),de.__webglTexture===void 0){de.__webglTexture=t.createTexture(),e.bindTexture(t.TEXTURE_CUBE_MAP,de.__webglTexture),xe(t.TEXTURE_CUBE_MAP,P.depthTexture);const Ce=i.convert(P.depthTexture.format),Oe=i.convert(P.depthTexture.type);let ve;P.depthTexture.format===ni?ve=t.DEPTH_COMPONENT24:P.depthTexture.format===bs&&(ve=t.DEPTH24_STENCIL8);for(let me=0;me<6;me++)t.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+me,0,ve,P.width,P.height,0,Ce,Oe,null)}}else F(P.depthTexture,0);const pe=de.__webglTexture,Me=Qt(P),ee=se?t.TEXTURE_CUBE_MAP_POSITIVE_X+q:t.TEXTURE_2D,re=P.depthTexture.format===bs?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT;if(P.depthTexture.format===ni)rt(P)?r.framebufferTexture2DMultisampleEXT(t.FRAMEBUFFER,re,ee,pe,0,Me):t.framebufferTexture2D(t.FRAMEBUFFER,re,ee,pe,0);else if(P.depthTexture.format===bs)rt(P)?r.framebufferTexture2DMultisampleEXT(t.FRAMEBUFFER,re,ee,pe,0,Me):t.framebufferTexture2D(t.FRAMEBUFFER,re,ee,pe,0);else throw new Error("Unknown depthTexture format")}function _t(k){const P=o.get(k),q=k.isWebGLCubeRenderTarget===!0;if(P.__boundDepthTexture!==k.depthTexture){const se=k.depthTexture;if(P.__depthDisposeCallback&&P.__depthDisposeCallback(),se){const de=()=>{delete P.__boundDepthTexture,delete P.__depthDisposeCallback,se.removeEventListener("dispose",de)};se.addEventListener("dispose",de),P.__depthDisposeCallback=de}P.__boundDepthTexture=se}if(k.depthTexture&&!P.__autoAllocateDepthBuffer)if(q)for(let se=0;se<6;se++)je(P.__webglFramebuffer[se],k,se);else{const se=k.texture.mipmaps;se&&se.length>0?je(P.__webglFramebuffer[0],k,0):je(P.__webglFramebuffer,k,0)}else if(q){P.__webglDepthbuffer=[];for(let se=0;se<6;se++)if(e.bindFramebuffer(t.FRAMEBUFFER,P.__webglFramebuffer[se]),P.__webglDepthbuffer[se]===void 0)P.__webglDepthbuffer[se]=t.createRenderbuffer(),tt(P.__webglDepthbuffer[se],k,!1);else{const de=k.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT,pe=P.__webglDepthbuffer[se];t.bindRenderbuffer(t.RENDERBUFFER,pe),t.framebufferRenderbuffer(t.FRAMEBUFFER,de,t.RENDERBUFFER,pe)}}else{const se=k.texture.mipmaps;if(se&&se.length>0?e.bindFramebuffer(t.FRAMEBUFFER,P.__webglFramebuffer[0]):e.bindFramebuffer(t.FRAMEBUFFER,P.__webglFramebuffer),P.__webglDepthbuffer===void 0)P.__webglDepthbuffer=t.createRenderbuffer(),tt(P.__webglDepthbuffer,k,!1);else{const de=k.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT,pe=P.__webglDepthbuffer;t.bindRenderbuffer(t.RENDERBUFFER,pe),t.framebufferRenderbuffer(t.FRAMEBUFFER,de,t.RENDERBUFFER,pe)}}e.bindFramebuffer(t.FRAMEBUFFER,null)}function gt(k,P,q){const se=o.get(k);P!==void 0&&Fe(se.__webglFramebuffer,k,k.texture,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,0),q!==void 0&&_t(k)}function nt(k){const P=k.texture,q=o.get(k),se=o.get(P);k.addEventListener("dispose",_);const de=k.textures,pe=k.isWebGLCubeRenderTarget===!0,Me=de.length>1;if(Me||(se.__webglTexture===void 0&&(se.__webglTexture=t.createTexture()),se.__version=P.version,a.memory.textures++),pe){q.__webglFramebuffer=[];for(let ee=0;ee<6;ee++)if(P.mipmaps&&P.mipmaps.length>0){q.__webglFramebuffer[ee]=[];for(let re=0;re<P.mipmaps.length;re++)q.__webglFramebuffer[ee][re]=t.createFramebuffer()}else q.__webglFramebuffer[ee]=t.createFramebuffer()}else{if(P.mipmaps&&P.mipmaps.length>0){q.__webglFramebuffer=[];for(let ee=0;ee<P.mipmaps.length;ee++)q.__webglFramebuffer[ee]=t.createFramebuffer()}else q.__webglFramebuffer=t.createFramebuffer();if(Me)for(let ee=0,re=de.length;ee<re;ee++){const Ce=o.get(de[ee]);Ce.__webglTexture===void 0&&(Ce.__webglTexture=t.createTexture(),a.memory.textures++)}if(k.samples>0&&rt(k)===!1){q.__webglMultisampledFramebuffer=t.createFramebuffer(),q.__webglColorRenderbuffer=[],e.bindFramebuffer(t.FRAMEBUFFER,q.__webglMultisampledFramebuffer);for(let ee=0;ee<de.length;ee++){const re=de[ee];q.__webglColorRenderbuffer[ee]=t.createRenderbuffer(),t.bindRenderbuffer(t.RENDERBUFFER,q.__webglColorRenderbuffer[ee]);const Ce=i.convert(re.format,re.colorSpace),Oe=i.convert(re.type),ve=M(re.internalFormat,Ce,Oe,re.normalized,re.colorSpace,k.isXRRenderTarget===!0),me=Qt(k);t.renderbufferStorageMultisample(t.RENDERBUFFER,me,ve,k.width,k.height),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0+ee,t.RENDERBUFFER,q.__webglColorRenderbuffer[ee])}t.bindRenderbuffer(t.RENDERBUFFER,null),k.depthBuffer&&(q.__webglDepthRenderbuffer=t.createRenderbuffer(),tt(q.__webglDepthRenderbuffer,k,!0)),e.bindFramebuffer(t.FRAMEBUFFER,null)}}if(pe){e.bindTexture(t.TEXTURE_CUBE_MAP,se.__webglTexture),xe(t.TEXTURE_CUBE_MAP,P);for(let ee=0;ee<6;ee++)if(P.mipmaps&&P.mipmaps.length>0)for(let re=0;re<P.mipmaps.length;re++)Fe(q.__webglFramebuffer[ee][re],k,P,t.COLOR_ATTACHMENT0,t.TEXTURE_CUBE_MAP_POSITIVE_X+ee,re);else Fe(q.__webglFramebuffer[ee],k,P,t.COLOR_ATTACHMENT0,t.TEXTURE_CUBE_MAP_POSITIVE_X+ee,0);g(P)&&v(t.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(Me){for(let ee=0,re=de.length;ee<re;ee++){const Ce=de[ee],Oe=o.get(Ce);let ve=t.TEXTURE_2D;(k.isWebGL3DRenderTarget||k.isWebGLArrayRenderTarget)&&(ve=k.isWebGL3DRenderTarget?t.TEXTURE_3D:t.TEXTURE_2D_ARRAY),e.bindTexture(ve,Oe.__webglTexture),xe(ve,Ce),Fe(q.__webglFramebuffer,k,Ce,t.COLOR_ATTACHMENT0+ee,ve,0),g(Ce)&&v(ve)}e.unbindTexture()}else{let ee=t.TEXTURE_2D;if((k.isWebGL3DRenderTarget||k.isWebGLArrayRenderTarget)&&(ee=k.isWebGL3DRenderTarget?t.TEXTURE_3D:t.TEXTURE_2D_ARRAY),e.bindTexture(ee,se.__webglTexture),xe(ee,P),P.mipmaps&&P.mipmaps.length>0)for(let re=0;re<P.mipmaps.length;re++)Fe(q.__webglFramebuffer[re],k,P,t.COLOR_ATTACHMENT0,ee,re);else Fe(q.__webglFramebuffer,k,P,t.COLOR_ATTACHMENT0,ee,0);g(P)&&v(ee),e.unbindTexture()}k.depthBuffer&&_t(k)}function Pt(k){const P=k.textures;for(let q=0,se=P.length;q<se;q++){const de=P[q];if(g(de)){const pe=w(k),Me=o.get(de).__webglTexture;e.bindTexture(pe,Me),v(pe),e.unbindTexture()}}}const kt=[],xn=[];function W(k){if(k.samples>0){if(rt(k)===!1){const P=k.textures,q=k.width,se=k.height;let de=t.COLOR_BUFFER_BIT;const pe=k.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT,Me=o.get(k),ee=P.length>1;if(ee)for(let Ce=0;Ce<P.length;Ce++)e.bindFramebuffer(t.FRAMEBUFFER,Me.__webglMultisampledFramebuffer),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0+Ce,t.RENDERBUFFER,null),e.bindFramebuffer(t.FRAMEBUFFER,Me.__webglFramebuffer),t.framebufferTexture2D(t.DRAW_FRAMEBUFFER,t.COLOR_ATTACHMENT0+Ce,t.TEXTURE_2D,null,0);e.bindFramebuffer(t.READ_FRAMEBUFFER,Me.__webglMultisampledFramebuffer);const re=k.texture.mipmaps;re&&re.length>0?e.bindFramebuffer(t.DRAW_FRAMEBUFFER,Me.__webglFramebuffer[0]):e.bindFramebuffer(t.DRAW_FRAMEBUFFER,Me.__webglFramebuffer);for(let Ce=0;Ce<P.length;Ce++){if(k.resolveDepthBuffer&&(k.depthBuffer&&(de|=t.DEPTH_BUFFER_BIT),k.stencilBuffer&&k.resolveStencilBuffer&&(de|=t.STENCIL_BUFFER_BIT)),ee){t.framebufferRenderbuffer(t.READ_FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.RENDERBUFFER,Me.__webglColorRenderbuffer[Ce]);const Oe=o.get(P[Ce]).__webglTexture;t.framebufferTexture2D(t.DRAW_FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,Oe,0)}t.blitFramebuffer(0,0,q,se,0,0,q,se,de,t.NEAREST),c===!0&&(kt.length=0,xn.length=0,kt.push(t.COLOR_ATTACHMENT0+Ce),k.depthBuffer&&k.resolveDepthBuffer===!1&&(kt.push(pe),xn.push(pe),t.invalidateFramebuffer(t.DRAW_FRAMEBUFFER,xn)),t.invalidateFramebuffer(t.READ_FRAMEBUFFER,kt))}if(e.bindFramebuffer(t.READ_FRAMEBUFFER,null),e.bindFramebuffer(t.DRAW_FRAMEBUFFER,null),ee)for(let Ce=0;Ce<P.length;Ce++){e.bindFramebuffer(t.FRAMEBUFFER,Me.__webglMultisampledFramebuffer),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0+Ce,t.RENDERBUFFER,Me.__webglColorRenderbuffer[Ce]);const Oe=o.get(P[Ce]).__webglTexture;e.bindFramebuffer(t.FRAMEBUFFER,Me.__webglFramebuffer),t.framebufferTexture2D(t.DRAW_FRAMEBUFFER,t.COLOR_ATTACHMENT0+Ce,t.TEXTURE_2D,Oe,0)}e.bindFramebuffer(t.DRAW_FRAMEBUFFER,Me.__webglMultisampledFramebuffer)}else if(k.depthBuffer&&k.resolveDepthBuffer===!1&&c){const P=k.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT;t.invalidateFramebuffer(t.DRAW_FRAMEBUFFER,[P])}}}function Qt(k){return Math.min(s.maxSamples,k.samples)}function rt(k){const P=o.get(k);return k.samples>0&&n.has("WEBGL_multisampled_render_to_texture")===!0&&P.__useRenderToTexture!==!1}function At(k){const P=a.render.frame;d.get(k)!==P&&(d.set(k,P),k.update())}function Te(k,P){const q=k.colorSpace,se=k.format,de=k.type;return k.isCompressedTexture===!0||k.isVideoTexture===!0||q!==_o&&q!==io&&(Xt.getTransfer(q)===Bt?(se!==kn||de!==Rn)&&Rt("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Wt("WebGLTextures: Unsupported texture color space:",q)),P}function Ht(k){return typeof HTMLImageElement<"u"&&k instanceof HTMLImageElement?(l.width=k.naturalWidth||k.width,l.height=k.naturalHeight||k.height):typeof VideoFrame<"u"&&k instanceof VideoFrame?(l.width=k.displayWidth,l.height=k.displayHeight):(l.width=k.width,l.height=k.height),l}this.allocateTextureUnit=N,this.resetTextureUnits=C,this.getTextureUnits=I,this.setTextureUnits=L,this.setTexture2D=F,this.setTexture2DArray=z,this.setTexture3D=G,this.setTextureCube=O,this.rebindTextures=gt,this.setupRenderTarget=nt,this.updateRenderTargetMipmap=Pt,this.updateMultisampleRenderTarget=W,this.setupDepthRenderbuffer=_t,this.setupFrameBufferTexture=Fe,this.useMultisampledRTT=rt,this.isReversedDepthBuffer=function(){return e.buffers.depth.getReversed()}}function Jg(t,n){function e(o,s=io){let i;const a=Xt.getTransfer(s);if(o===Rn)return t.UNSIGNED_BYTE;if(o===Ad)return t.UNSIGNED_SHORT_4_4_4_4;if(o===Rd)return t.UNSIGNED_SHORT_5_5_5_1;if(o===lh)return t.UNSIGNED_INT_5_9_9_9_REV;if(o===dh)return t.UNSIGNED_INT_10F_11F_11F_REV;if(o===fh)return t.BYTE;if(o===uh)return t.SHORT;if(o===wa)return t.UNSIGNED_SHORT;if(o===Cd)return t.INT;if(o===Ps)return t.UNSIGNED_INT;if(o===is)return t.FLOAT;if(o===Cn)return t.HALF_FLOAT;if(o===hh)return t.ALPHA;if(o===ph)return t.RGB;if(o===kn)return t.RGBA;if(o===ni)return t.DEPTH_COMPONENT;if(o===bs)return t.DEPTH_STENCIL;if(o===Dd)return t.RED;if(o===Ed)return t.RED_INTEGER;if(o===si)return t.RG;if(o===Td)return t.RG_INTEGER;if(o===yd)return t.RGBA_INTEGER;if(o===nr||o===or||o===sr||o===ir)if(a===Bt)if(i=n.get("WEBGL_compressed_texture_s3tc_srgb"),i!==null){if(o===nr)return i.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(o===or)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(o===sr)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(o===ir)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(i=n.get("WEBGL_compressed_texture_s3tc"),i!==null){if(o===nr)return i.COMPRESSED_RGB_S3TC_DXT1_EXT;if(o===or)return i.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(o===sr)return i.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(o===ir)return i.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(o===X0||o===K0||o===q0||o===Y0)if(i=n.get("WEBGL_compressed_texture_pvrtc"),i!==null){if(o===X0)return i.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(o===K0)return i.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(o===q0)return i.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(o===Y0)return i.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(o===$0||o===j0||o===Z0||o===Q0||o===J0||o===Nr||o===ec)if(i=n.get("WEBGL_compressed_texture_etc"),i!==null){if(o===$0||o===j0)return a===Bt?i.COMPRESSED_SRGB8_ETC2:i.COMPRESSED_RGB8_ETC2;if(o===Z0)return a===Bt?i.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:i.COMPRESSED_RGBA8_ETC2_EAC;if(o===Q0)return i.COMPRESSED_R11_EAC;if(o===J0)return i.COMPRESSED_SIGNED_R11_EAC;if(o===Nr)return i.COMPRESSED_RG11_EAC;if(o===ec)return i.COMPRESSED_SIGNED_RG11_EAC}else return null;if(o===tc||o===nc||o===oc||o===sc||o===ic||o===ac||o===rc||o===cc||o===lc||o===dc||o===fc||o===uc||o===hc||o===pc)if(i=n.get("WEBGL_compressed_texture_astc"),i!==null){if(o===tc)return a===Bt?i.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:i.COMPRESSED_RGBA_ASTC_4x4_KHR;if(o===nc)return a===Bt?i.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:i.COMPRESSED_RGBA_ASTC_5x4_KHR;if(o===oc)return a===Bt?i.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:i.COMPRESSED_RGBA_ASTC_5x5_KHR;if(o===sc)return a===Bt?i.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:i.COMPRESSED_RGBA_ASTC_6x5_KHR;if(o===ic)return a===Bt?i.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:i.COMPRESSED_RGBA_ASTC_6x6_KHR;if(o===ac)return a===Bt?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:i.COMPRESSED_RGBA_ASTC_8x5_KHR;if(o===rc)return a===Bt?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:i.COMPRESSED_RGBA_ASTC_8x6_KHR;if(o===cc)return a===Bt?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:i.COMPRESSED_RGBA_ASTC_8x8_KHR;if(o===lc)return a===Bt?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:i.COMPRESSED_RGBA_ASTC_10x5_KHR;if(o===dc)return a===Bt?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:i.COMPRESSED_RGBA_ASTC_10x6_KHR;if(o===fc)return a===Bt?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:i.COMPRESSED_RGBA_ASTC_10x8_KHR;if(o===uc)return a===Bt?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:i.COMPRESSED_RGBA_ASTC_10x10_KHR;if(o===hc)return a===Bt?i.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:i.COMPRESSED_RGBA_ASTC_12x10_KHR;if(o===pc)return a===Bt?i.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:i.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(o===mc||o===gc||o===vc)if(i=n.get("EXT_texture_compression_bptc"),i!==null){if(o===mc)return a===Bt?i.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:i.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(o===gc)return i.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(o===vc)return i.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(o===xc||o===_c||o===kr||o===Mc)if(i=n.get("EXT_texture_compression_rgtc"),i!==null){if(o===xc)return i.COMPRESSED_RED_RGTC1_EXT;if(o===_c)return i.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(o===kr)return i.COMPRESSED_RED_GREEN_RGTC2_EXT;if(o===Mc)return i.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return o===oi?t.UNSIGNED_INT_24_8:t[o]!==void 0?t[o]:null}return{convert:e}}const e3=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,t3=`
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

}`;class n3{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(n,e){if(this.texture===null){const o=new Pd(n.texture);(n.depthNear!==e.depthNear||n.depthFar!==e.depthFar)&&(this.depthNear=n.depthNear,this.depthFar=n.depthFar),this.texture=o}}getMesh(n){if(this.texture!==null&&this.mesh===null){const e=n.cameras[0].viewport,o=new nn({vertexShader:e3,fragmentShader:t3,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new V(new Qe(20,20),o)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class o3 extends Fu{constructor(n,e){super();const o=this;let s=null,i=1,a=null,r="local-floor",c=1,l=null,d=null,f=null,u=null,h=null,p=null;const x=typeof XRWebGLBinding<"u",m=new n3,g={},v=e.getContextAttributes();let w=null,M=null;const y=[],b=[],T=new ot;let _=null;const S=new Ys;S.viewport=new un;const E=new Ys;E.viewport=new un;const A=[S,E],R=new Ou;let C=null,I=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(j){let ie=y[j];return ie===void 0&&(ie=new tr,y[j]=ie),ie.getTargetRaySpace()},this.getControllerGrip=function(j){let ie=y[j];return ie===void 0&&(ie=new tr,y[j]=ie),ie.getGripSpace()},this.getHand=function(j){let ie=y[j];return ie===void 0&&(ie=new tr,y[j]=ie),ie.getHandSpace()};function L(j){const ie=b.indexOf(j.inputSource);if(ie===-1)return;const ne=y[ie];ne!==void 0&&(ne.update(j.inputSource,j.frame,l||a),ne.dispatchEvent({type:j.type,data:j.inputSource}))}function N(){s.removeEventListener("select",L),s.removeEventListener("selectstart",L),s.removeEventListener("selectend",L),s.removeEventListener("squeeze",L),s.removeEventListener("squeezestart",L),s.removeEventListener("squeezeend",L),s.removeEventListener("end",N),s.removeEventListener("inputsourceschange",U);for(let j=0;j<y.length;j++){const ie=b[j];ie!==null&&(b[j]=null,y[j].disconnect(ie))}C=null,I=null,m.reset();for(const j in g)delete g[j];n.setRenderTarget(w),h=null,u=null,f=null,s=null,M=null,xe.stop(),o.isPresenting=!1,n.setPixelRatio(_),n.setSize(T.width,T.height,!1),o.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(j){i=j,o.isPresenting===!0&&Rt("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(j){r=j,o.isPresenting===!0&&Rt("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||a},this.setReferenceSpace=function(j){l=j},this.getBaseLayer=function(){return u!==null?u:h},this.getBinding=function(){return f===null&&x&&(f=new XRWebGLBinding(s,e)),f},this.getFrame=function(){return p},this.getSession=function(){return s},this.setSession=async function(j){if(s=j,s!==null){if(w=n.getRenderTarget(),s.addEventListener("select",L),s.addEventListener("selectstart",L),s.addEventListener("selectend",L),s.addEventListener("squeeze",L),s.addEventListener("squeezestart",L),s.addEventListener("squeezeend",L),s.addEventListener("end",N),s.addEventListener("inputsourceschange",U),v.xrCompatible!==!0&&await e.makeXRCompatible(),_=n.getPixelRatio(),n.getSize(T),x&&"createProjectionLayer"in XRWebGLBinding.prototype){let ne=null,ye=null,Ie=null;v.depth&&(Ie=v.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,ne=v.stencil?bs:ni,ye=v.stencil?oi:Ps);const Fe={colorFormat:e.RGBA8,depthFormat:Ie,scaleFactor:i};f=this.getBinding(),u=f.createProjectionLayer(Fe),s.updateRenderState({layers:[u]}),n.setPixelRatio(1),n.setSize(u.textureWidth,u.textureHeight,!1),M=new wn(u.textureWidth,u.textureHeight,{format:kn,type:Rn,depthTexture:new ti(u.textureWidth,u.textureHeight,ye,void 0,void 0,void 0,void 0,void 0,void 0,ne),stencilBuffer:v.stencil,colorSpace:n.outputColorSpace,samples:v.antialias?4:0,resolveDepthBuffer:u.ignoreDepthValues===!1,resolveStencilBuffer:u.ignoreDepthValues===!1})}else{const ne={antialias:v.antialias,alpha:!0,depth:v.depth,stencil:v.stencil,framebufferScaleFactor:i};h=new XRWebGLLayer(s,e,ne),s.updateRenderState({baseLayer:h}),n.setPixelRatio(1),n.setSize(h.framebufferWidth,h.framebufferHeight,!1),M=new wn(h.framebufferWidth,h.framebufferHeight,{format:kn,type:Rn,colorSpace:n.outputColorSpace,stencilBuffer:v.stencil,resolveDepthBuffer:h.ignoreDepthValues===!1,resolveStencilBuffer:h.ignoreDepthValues===!1})}M.isXRRenderTarget=!0,this.setFoveation(c),l=null,a=await s.requestReferenceSpace(r),xe.setContext(s),xe.start(),o.isPresenting=!0,o.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function U(j){for(let ie=0;ie<j.removed.length;ie++){const ne=j.removed[ie],ye=b.indexOf(ne);ye>=0&&(b[ye]=null,y[ye].disconnect(ne))}for(let ie=0;ie<j.added.length;ie++){const ne=j.added[ie];let ye=b.indexOf(ne);if(ye===-1){for(let Fe=0;Fe<y.length;Fe++)if(Fe>=b.length){b.push(ne),ye=Fe;break}else if(b[Fe]===null){b[Fe]=ne,ye=Fe;break}if(ye===-1)break}const Ie=y[ye];Ie&&Ie.connect(ne)}}const F=new X,z=new X;function G(j,ie,ne){F.setFromMatrixPosition(ie.matrixWorld),z.setFromMatrixPosition(ne.matrixWorld);const ye=F.distanceTo(z),Ie=ie.projectionMatrix.elements,Fe=ne.projectionMatrix.elements,tt=Ie[14]/(Ie[10]-1),je=Ie[14]/(Ie[10]+1),_t=(Ie[9]+1)/Ie[5],gt=(Ie[9]-1)/Ie[5],nt=(Ie[8]-1)/Ie[0],Pt=(Fe[8]+1)/Fe[0],kt=tt*nt,xn=tt*Pt,W=ye/(-nt+Pt),Qt=W*-nt;if(ie.matrixWorld.decompose(j.position,j.quaternion,j.scale),j.translateX(Qt),j.translateZ(W),j.matrixWorld.compose(j.position,j.quaternion,j.scale),j.matrixWorldInverse.copy(j.matrixWorld).invert(),Ie[10]===-1)j.projectionMatrix.copy(ie.projectionMatrix),j.projectionMatrixInverse.copy(ie.projectionMatrixInverse);else{const rt=tt+W,At=je+W,Te=kt-Qt,Ht=xn+(ye-Qt),k=_t*je/At*rt,P=gt*je/At*rt;j.projectionMatrix.makePerspective(Te,Ht,k,P,rt,At),j.projectionMatrixInverse.copy(j.projectionMatrix).invert()}}function O(j,ie){ie===null?j.matrixWorld.copy(j.matrix):j.matrixWorld.multiplyMatrices(ie.matrixWorld,j.matrix),j.matrixWorldInverse.copy(j.matrixWorld).invert()}this.updateCamera=function(j){if(s===null)return;let ie=j.near,ne=j.far;m.texture!==null&&(m.depthNear>0&&(ie=m.depthNear),m.depthFar>0&&(ne=m.depthFar)),R.near=E.near=S.near=ie,R.far=E.far=S.far=ne,(C!==R.near||I!==R.far)&&(s.updateRenderState({depthNear:R.near,depthFar:R.far}),C=R.near,I=R.far),R.layers.mask=j.layers.mask|6,S.layers.mask=R.layers.mask&-5,E.layers.mask=R.layers.mask&-3;const ye=j.parent,Ie=R.cameras;O(R,ye);for(let Fe=0;Fe<Ie.length;Fe++)O(Ie[Fe],ye);Ie.length===2?G(R,S,E):R.projectionMatrix.copy(S.projectionMatrix),B(j,R,ye)};function B(j,ie,ne){ne===null?j.matrix.copy(ie.matrixWorld):(j.matrix.copy(ne.matrixWorld),j.matrix.invert(),j.matrix.multiply(ie.matrixWorld)),j.matrix.decompose(j.position,j.quaternion,j.scale),j.updateMatrixWorld(!0),j.projectionMatrix.copy(ie.projectionMatrix),j.projectionMatrixInverse.copy(ie.projectionMatrixInverse),j.isPerspectiveCamera&&(j.fov=zu*2*Math.atan(1/j.projectionMatrix.elements[5]),j.zoom=1)}this.getCamera=function(){return R},this.getFoveation=function(){if(!(u===null&&h===null))return c},this.setFoveation=function(j){c=j,u!==null&&(u.fixedFoveation=j),h!==null&&h.fixedFoveation!==void 0&&(h.fixedFoveation=j)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(R)},this.getCameraTexture=function(j){return g[j]};let J=null;function ue(j,ie){if(d=ie.getViewerPose(l||a),p=ie,d!==null){const ne=d.views;h!==null&&(n.setRenderTargetFramebuffer(M,h.framebuffer),n.setRenderTarget(M));let ye=!1;ne.length!==R.cameras.length&&(R.cameras.length=0,ye=!0);for(let je=0;je<ne.length;je++){const _t=ne[je];let gt=null;if(h!==null)gt=h.getViewport(_t);else{const Pt=f.getViewSubImage(u,_t);gt=Pt.viewport,je===0&&(n.setRenderTargetTextures(M,Pt.colorTexture,Pt.depthStencilTexture),n.setRenderTarget(M))}let nt=A[je];nt===void 0&&(nt=new Ys,nt.layers.enable(je),nt.viewport=new un,A[je]=nt),nt.matrix.fromArray(_t.transform.matrix),nt.matrix.decompose(nt.position,nt.quaternion,nt.scale),nt.projectionMatrix.fromArray(_t.projectionMatrix),nt.projectionMatrixInverse.copy(nt.projectionMatrix).invert(),nt.viewport.set(gt.x,gt.y,gt.width,gt.height),je===0&&(R.matrix.copy(nt.matrix),R.matrix.decompose(R.position,R.quaternion,R.scale)),ye===!0&&R.cameras.push(nt)}const Ie=s.enabledFeatures;if(Ie&&Ie.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&x){f=o.getBinding();const je=f.getDepthInformation(ne[0]);je&&je.isValid&&je.texture&&m.init(je,s.renderState)}if(Ie&&Ie.includes("camera-access")&&x){n.state.unbindTexture(),f=o.getBinding();for(let je=0;je<ne.length;je++){const _t=ne[je].camera;if(_t){let gt=g[_t];gt||(gt=new Pd,g[_t]=gt);const nt=f.getCameraImage(_t);gt.sourceTexture=nt}}}}for(let ne=0;ne<y.length;ne++){const ye=b[ne],Ie=y[ne];ye!==null&&Ie!==void 0&&Ie.update(ye,ie,l||a)}J&&J(j,ie),ie.detectedPlanes&&o.dispatchEvent({type:"planesdetected",data:ie}),p=null}const xe=new Kd;xe.setAnimationLoop(ue),this.setAnimationLoop=function(j){J=j},this.dispose=function(){}}}const s3=new at,Jd=new wt;Jd.set(-1,0,0,0,1,0,0,0,1);function i3(t,n){function e(m,g){m.matrixAutoUpdate===!0&&m.updateMatrix(),g.value.copy(m.matrix)}function o(m,g){g.color.getRGB(m.fogColor.value,Ld(t)),g.isFog?(m.fogNear.value=g.near,m.fogFar.value=g.far):g.isFogExp2&&(m.fogDensity.value=g.density)}function s(m,g,v,w,M){g.isNodeMaterial?g.uniformsNeedUpdate=!1:g.isMeshBasicMaterial?i(m,g):g.isMeshLambertMaterial?(i(m,g),g.envMap&&(m.envMapIntensity.value=g.envMapIntensity)):g.isMeshToonMaterial?(i(m,g),f(m,g)):g.isMeshPhongMaterial?(i(m,g),d(m,g),g.envMap&&(m.envMapIntensity.value=g.envMapIntensity)):g.isMeshStandardMaterial?(i(m,g),u(m,g),g.isMeshPhysicalMaterial&&h(m,g,M)):g.isMeshMatcapMaterial?(i(m,g),p(m,g)):g.isMeshDepthMaterial?i(m,g):g.isMeshDistanceMaterial?(i(m,g),x(m,g)):g.isMeshNormalMaterial?i(m,g):g.isLineBasicMaterial?(a(m,g),g.isLineDashedMaterial&&r(m,g)):g.isPointsMaterial?c(m,g,v,w):g.isSpriteMaterial?l(m,g):g.isShadowMaterial?(m.color.value.copy(g.color),m.opacity.value=g.opacity):g.isShaderMaterial&&(g.uniformsNeedUpdate=!1)}function i(m,g){m.opacity.value=g.opacity,g.color&&m.diffuse.value.copy(g.color),g.emissive&&m.emissive.value.copy(g.emissive).multiplyScalar(g.emissiveIntensity),g.map&&(m.map.value=g.map,e(g.map,m.mapTransform)),g.alphaMap&&(m.alphaMap.value=g.alphaMap,e(g.alphaMap,m.alphaMapTransform)),g.bumpMap&&(m.bumpMap.value=g.bumpMap,e(g.bumpMap,m.bumpMapTransform),m.bumpScale.value=g.bumpScale,g.side===Dn&&(m.bumpScale.value*=-1)),g.normalMap&&(m.normalMap.value=g.normalMap,e(g.normalMap,m.normalMapTransform),m.normalScale.value.copy(g.normalScale),g.side===Dn&&m.normalScale.value.negate()),g.displacementMap&&(m.displacementMap.value=g.displacementMap,e(g.displacementMap,m.displacementMapTransform),m.displacementScale.value=g.displacementScale,m.displacementBias.value=g.displacementBias),g.emissiveMap&&(m.emissiveMap.value=g.emissiveMap,e(g.emissiveMap,m.emissiveMapTransform)),g.specularMap&&(m.specularMap.value=g.specularMap,e(g.specularMap,m.specularMapTransform)),g.alphaTest>0&&(m.alphaTest.value=g.alphaTest);const v=n.get(g),w=v.envMap,M=v.envMapRotation;w&&(m.envMap.value=w,m.envMapRotation.value.setFromMatrix4(s3.makeRotationFromEuler(M)).transpose(),w.isCubeTexture&&w.isRenderTargetTexture===!1&&m.envMapRotation.value.premultiply(Jd),m.reflectivity.value=g.reflectivity,m.ior.value=g.ior,m.refractionRatio.value=g.refractionRatio),g.lightMap&&(m.lightMap.value=g.lightMap,m.lightMapIntensity.value=g.lightMapIntensity,e(g.lightMap,m.lightMapTransform)),g.aoMap&&(m.aoMap.value=g.aoMap,m.aoMapIntensity.value=g.aoMapIntensity,e(g.aoMap,m.aoMapTransform))}function a(m,g){m.diffuse.value.copy(g.color),m.opacity.value=g.opacity,g.map&&(m.map.value=g.map,e(g.map,m.mapTransform))}function r(m,g){m.dashSize.value=g.dashSize,m.totalSize.value=g.dashSize+g.gapSize,m.scale.value=g.scale}function c(m,g,v,w){m.diffuse.value.copy(g.color),m.opacity.value=g.opacity,m.size.value=g.size*v,m.scale.value=w*.5,g.map&&(m.map.value=g.map,e(g.map,m.uvTransform)),g.alphaMap&&(m.alphaMap.value=g.alphaMap,e(g.alphaMap,m.alphaMapTransform)),g.alphaTest>0&&(m.alphaTest.value=g.alphaTest)}function l(m,g){m.diffuse.value.copy(g.color),m.opacity.value=g.opacity,m.rotation.value=g.rotation,g.map&&(m.map.value=g.map,e(g.map,m.mapTransform)),g.alphaMap&&(m.alphaMap.value=g.alphaMap,e(g.alphaMap,m.alphaMapTransform)),g.alphaTest>0&&(m.alphaTest.value=g.alphaTest)}function d(m,g){m.specular.value.copy(g.specular),m.shininess.value=Math.max(g.shininess,1e-4)}function f(m,g){g.gradientMap&&(m.gradientMap.value=g.gradientMap)}function u(m,g){m.metalness.value=g.metalness,g.metalnessMap&&(m.metalnessMap.value=g.metalnessMap,e(g.metalnessMap,m.metalnessMapTransform)),m.roughness.value=g.roughness,g.roughnessMap&&(m.roughnessMap.value=g.roughnessMap,e(g.roughnessMap,m.roughnessMapTransform)),g.envMap&&(m.envMapIntensity.value=g.envMapIntensity)}function h(m,g,v){m.ior.value=g.ior,g.sheen>0&&(m.sheenColor.value.copy(g.sheenColor).multiplyScalar(g.sheen),m.sheenRoughness.value=g.sheenRoughness,g.sheenColorMap&&(m.sheenColorMap.value=g.sheenColorMap,e(g.sheenColorMap,m.sheenColorMapTransform)),g.sheenRoughnessMap&&(m.sheenRoughnessMap.value=g.sheenRoughnessMap,e(g.sheenRoughnessMap,m.sheenRoughnessMapTransform))),g.clearcoat>0&&(m.clearcoat.value=g.clearcoat,m.clearcoatRoughness.value=g.clearcoatRoughness,g.clearcoatMap&&(m.clearcoatMap.value=g.clearcoatMap,e(g.clearcoatMap,m.clearcoatMapTransform)),g.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=g.clearcoatRoughnessMap,e(g.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),g.clearcoatNormalMap&&(m.clearcoatNormalMap.value=g.clearcoatNormalMap,e(g.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(g.clearcoatNormalScale),g.side===Dn&&m.clearcoatNormalScale.value.negate())),g.dispersion>0&&(m.dispersion.value=g.dispersion),g.iridescence>0&&(m.iridescence.value=g.iridescence,m.iridescenceIOR.value=g.iridescenceIOR,m.iridescenceThicknessMinimum.value=g.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=g.iridescenceThicknessRange[1],g.iridescenceMap&&(m.iridescenceMap.value=g.iridescenceMap,e(g.iridescenceMap,m.iridescenceMapTransform)),g.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=g.iridescenceThicknessMap,e(g.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),g.transmission>0&&(m.transmission.value=g.transmission,m.transmissionSamplerMap.value=v.texture,m.transmissionSamplerSize.value.set(v.width,v.height),g.transmissionMap&&(m.transmissionMap.value=g.transmissionMap,e(g.transmissionMap,m.transmissionMapTransform)),m.thickness.value=g.thickness,g.thicknessMap&&(m.thicknessMap.value=g.thicknessMap,e(g.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=g.attenuationDistance,m.attenuationColor.value.copy(g.attenuationColor)),g.anisotropy>0&&(m.anisotropyVector.value.set(g.anisotropy*Math.cos(g.anisotropyRotation),g.anisotropy*Math.sin(g.anisotropyRotation)),g.anisotropyMap&&(m.anisotropyMap.value=g.anisotropyMap,e(g.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=g.specularIntensity,m.specularColor.value.copy(g.specularColor),g.specularColorMap&&(m.specularColorMap.value=g.specularColorMap,e(g.specularColorMap,m.specularColorMapTransform)),g.specularIntensityMap&&(m.specularIntensityMap.value=g.specularIntensityMap,e(g.specularIntensityMap,m.specularIntensityMapTransform))}function p(m,g){g.matcap&&(m.matcap.value=g.matcap)}function x(m,g){const v=n.get(g).light;m.referencePosition.value.setFromMatrixPosition(v.matrixWorld),m.nearDistance.value=v.shadow.camera.near,m.farDistance.value=v.shadow.camera.far}return{refreshFogUniforms:o,refreshMaterialUniforms:s}}function a3(t,n,e,o){let s={},i={},a=[];const r=t.getParameter(t.MAX_UNIFORM_BUFFER_BINDINGS);function c(v,w){const M=w.program;o.uniformBlockBinding(v,M)}function l(v,w){let M=s[v.id];M===void 0&&(p(v),M=d(v),s[v.id]=M,v.addEventListener("dispose",m));const y=w.program;o.updateUBOMapping(v,y);const b=n.render.frame;i[v.id]!==b&&(u(v),i[v.id]=b)}function d(v){const w=f();v.__bindingPointIndex=w;const M=t.createBuffer(),y=v.__size,b=v.usage;return t.bindBuffer(t.UNIFORM_BUFFER,M),t.bufferData(t.UNIFORM_BUFFER,y,b),t.bindBuffer(t.UNIFORM_BUFFER,null),t.bindBufferBase(t.UNIFORM_BUFFER,w,M),M}function f(){for(let v=0;v<r;v++)if(a.indexOf(v)===-1)return a.push(v),v;return Wt("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function u(v){const w=s[v.id],M=v.uniforms,y=v.__cache;t.bindBuffer(t.UNIFORM_BUFFER,w);for(let b=0,T=M.length;b<T;b++){const _=Array.isArray(M[b])?M[b]:[M[b]];for(let S=0,E=_.length;S<E;S++){const A=_[S];if(h(A,b,S,y)===!0){const R=A.__offset,C=Array.isArray(A.value)?A.value:[A.value];let I=0;for(let L=0;L<C.length;L++){const N=C[L],U=x(N);typeof N=="number"||typeof N=="boolean"?(A.__data[0]=N,t.bufferSubData(t.UNIFORM_BUFFER,R+I,A.__data)):N.isMatrix3?(A.__data[0]=N.elements[0],A.__data[1]=N.elements[1],A.__data[2]=N.elements[2],A.__data[3]=0,A.__data[4]=N.elements[3],A.__data[5]=N.elements[4],A.__data[6]=N.elements[5],A.__data[7]=0,A.__data[8]=N.elements[6],A.__data[9]=N.elements[7],A.__data[10]=N.elements[8],A.__data[11]=0):ArrayBuffer.isView(N)?A.__data.set(new N.constructor(N.buffer,N.byteOffset,A.__data.length)):(N.toArray(A.__data,I),I+=U.storage/Float32Array.BYTES_PER_ELEMENT)}t.bufferSubData(t.UNIFORM_BUFFER,R,A.__data)}}}t.bindBuffer(t.UNIFORM_BUFFER,null)}function h(v,w,M,y){const b=v.value,T=w+"_"+M;if(y[T]===void 0)return typeof b=="number"||typeof b=="boolean"?y[T]=b:ArrayBuffer.isView(b)?y[T]=b.slice():y[T]=b.clone(),!0;{const _=y[T];if(typeof b=="number"||typeof b=="boolean"){if(_!==b)return y[T]=b,!0}else{if(ArrayBuffer.isView(b))return!0;if(_.equals(b)===!1)return _.copy(b),!0}}return!1}function p(v){const w=v.uniforms;let M=0;const y=16;for(let T=0,_=w.length;T<_;T++){const S=Array.isArray(w[T])?w[T]:[w[T]];for(let E=0,A=S.length;E<A;E++){const R=S[E],C=Array.isArray(R.value)?R.value:[R.value];for(let I=0,L=C.length;I<L;I++){const N=C[I],U=x(N),F=M%y,z=F%U.boundary,G=F+z;M+=z,G!==0&&y-G<U.storage&&(M+=y-G),R.__data=new Float32Array(U.storage/Float32Array.BYTES_PER_ELEMENT),R.__offset=M,M+=U.storage}}}const b=M%y;return b>0&&(M+=y-b),v.__size=M,v.__cache={},this}function x(v){const w={boundary:0,storage:0};return typeof v=="number"||typeof v=="boolean"?(w.boundary=4,w.storage=4):v.isVector2?(w.boundary=8,w.storage=8):v.isVector3||v.isColor?(w.boundary=16,w.storage=12):v.isVector4?(w.boundary=16,w.storage=16):v.isMatrix3?(w.boundary=48,w.storage=48):v.isMatrix4?(w.boundary=64,w.storage=64):v.isTexture?Rt("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(v)?(w.boundary=16,w.storage=v.byteLength):Rt("WebGLRenderer: Unsupported uniform value type.",v),w}function m(v){const w=v.target;w.removeEventListener("dispose",m);const M=a.indexOf(w.__bindingPointIndex);a.splice(M,1),t.deleteBuffer(s[w.id]),delete s[w.id],delete i[w.id]}function g(){for(const v in s)t.deleteBuffer(s[v]);a=[],s={},i={}}return{bind:c,update:l,dispose:g}}const r3=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let yo=null;function c3(){return yo===null&&(yo=new Ls(r3,16,16,si,Cn),yo.name="DFG_LUT",yo.minFilter=en,yo.magFilter=en,yo.wrapS=Cs,yo.wrapT=Cs,yo.generateMipmaps=!1,yo.needsUpdate=!0),yo}class l3{constructor(n={}){const{canvas:e=Nu(),context:o=null,depth:s=!0,stencil:i=!1,alpha:a=!1,antialias:r=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:d="default",failIfMajorPerformanceCaveat:f=!1,reversedDepthBuffer:u=!1,outputBufferType:h=Rn}=n;this.isWebGLRenderer=!0;let p;if(o!==null){if(typeof WebGLRenderingContext<"u"&&o instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");p=o.getContextAttributes().alpha}else p=a;const x=h,m=new Set([yd,Td,Ed]),g=new Set([Rn,Ps,wa,oi,Ad,Rd]),v=new Uint32Array(4),w=new Int32Array(4),M=new X;let y=null,b=null;const T=[],_=[];let S=null;this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Io,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const E=this;let A=!1,R=null;this._outputColorSpace=yt;let C=0,I=0,L=null,N=-1,U=null;const F=new un,z=new un;let G=null;const O=new oe(0);let B=0,J=e.width,ue=e.height,xe=1,j=null,ie=null;const ne=new un(0,0,J,ue),ye=new un(0,0,J,ue);let Ie=!1;const Fe=new vd;let tt=!1,je=!1;const _t=new at,gt=new X,nt=new un,Pt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let kt=!1;function xn(){return L===null?xe:1}let W=o;function Qt(D,K){return e.getContext(D,K)}try{const D={alpha:!0,depth:s,stencil:i,antialias:r,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:d,failIfMajorPerformanceCaveat:f};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${ku}`),e.addEventListener("webglcontextlost",fe,!1),e.addEventListener("webglcontextrestored",He,!1),e.addEventListener("webglcontextcreationerror",st,!1),W===null){const K="webgl2";if(W=Qt(K,D),W===null)throw Qt(K)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(D){throw Wt("WebGLRenderer: "+D.message),D}let rt,At,Te,Ht,k,P,q,se,de,pe,Me,ee,re,Ce,Oe,ve,me,$e,Ze,ht,H,_e,ae;function ke(){rt=new cm(W),rt.init(),H=new Jg(W,rt),At=new em(W,rt,n,H),Te=new Zg(W,rt),At.reversedDepthBuffer&&u&&Te.buffers.depth.setReversed(!0),Ht=new fm(W),k=new Fg,P=new Qg(W,rt,Te,k,At,H,Ht),q=new rm(E),se=new m1(W),_e=new Q2(W,se),de=new lm(W,se,Ht,_e),pe=new hm(W,de,se,_e,Ht),$e=new um(W,At,P),Oe=new tm(k),Me=new Ug(E,q,rt,At,_e,Oe),ee=new i3(E,k),re=new zg,Ce=new Xg(rt),me=new Z2(E,q,Te,pe,p,c),ve=new jg(E,pe,At),ae=new a3(W,Ht,At,Te),Ze=new J2(W,rt,Ht),ht=new dm(W,rt,Ht),Ht.programs=Me.programs,E.capabilities=At,E.extensions=rt,E.properties=k,E.renderLists=re,E.shadowMap=ve,E.state=Te,E.info=Ht}ke(),x!==Rn&&(S=new mm(x,e.width,e.height,s,i));const be=new o3(E,W);this.xr=be,this.getContext=function(){return W},this.getContextAttributes=function(){return W.getContextAttributes()},this.forceContextLoss=function(){const D=rt.get("WEBGL_lose_context");D&&D.loseContext()},this.forceContextRestore=function(){const D=rt.get("WEBGL_lose_context");D&&D.restoreContext()},this.getPixelRatio=function(){return xe},this.setPixelRatio=function(D){D!==void 0&&(xe=D,this.setSize(J,ue,!1))},this.getSize=function(D){return D.set(J,ue)},this.setSize=function(D,K,Q=!0){if(be.isPresenting){Rt("WebGLRenderer: Can't change size while VR device is presenting.");return}J=D,ue=K,e.width=Math.floor(D*xe),e.height=Math.floor(K*xe),Q===!0&&(e.style.width=D+"px",e.style.height=K+"px"),S!==null&&S.setSize(e.width,e.height),this.setViewport(0,0,D,K)},this.getDrawingBufferSize=function(D){return D.set(J*xe,ue*xe).floor()},this.setDrawingBufferSize=function(D,K,Q){J=D,ue=K,xe=Q,e.width=Math.floor(D*Q),e.height=Math.floor(K*Q),this.setViewport(0,0,D,K)},this.setEffects=function(D){if(x===Rn){Wt("THREE.WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(D){for(let K=0;K<D.length;K++)if(D[K].isOutputPass===!0){Rt("THREE.WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}S.setEffects(D||[])},this.getCurrentViewport=function(D){return D.copy(F)},this.getViewport=function(D){return D.copy(ne)},this.setViewport=function(D,K,Q,Y){D.isVector4?ne.set(D.x,D.y,D.z,D.w):ne.set(D,K,Q,Y),Te.viewport(F.copy(ne).multiplyScalar(xe).round())},this.getScissor=function(D){return D.copy(ye)},this.setScissor=function(D,K,Q,Y){D.isVector4?ye.set(D.x,D.y,D.z,D.w):ye.set(D,K,Q,Y),Te.scissor(z.copy(ye).multiplyScalar(xe).round())},this.getScissorTest=function(){return Ie},this.setScissorTest=function(D){Te.setScissorTest(Ie=D)},this.setOpaqueSort=function(D){j=D},this.setTransparentSort=function(D){ie=D},this.getClearColor=function(D){return D.copy(me.getClearColor())},this.setClearColor=function(){me.setClearColor(...arguments)},this.getClearAlpha=function(){return me.getClearAlpha()},this.setClearAlpha=function(){me.setClearAlpha(...arguments)},this.clear=function(D=!0,K=!0,Q=!0){let Y=0;if(D){let $=!1;if(L!==null){const Le=L.texture.format;$=m.has(Le)}if($){const Le=L.texture.type,Be=g.has(Le),De=me.getClearColor(),Ge=me.getClearAlpha(),We=De.r,it=De.g,ft=De.b;Be?(v[0]=We,v[1]=it,v[2]=ft,v[3]=Ge,W.clearBufferuiv(W.COLOR,0,v)):(w[0]=We,w[1]=it,w[2]=ft,w[3]=Ge,W.clearBufferiv(W.COLOR,0,w))}else Y|=W.COLOR_BUFFER_BIT}K&&(Y|=W.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),Q&&(Y|=W.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),Y!==0&&W.clear(Y)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(D){D.setRenderer(this),R=D},this.dispose=function(){e.removeEventListener("webglcontextlost",fe,!1),e.removeEventListener("webglcontextrestored",He,!1),e.removeEventListener("webglcontextcreationerror",st,!1),me.dispose(),re.dispose(),Ce.dispose(),k.dispose(),q.dispose(),pe.dispose(),_e.dispose(),ae.dispose(),Me.dispose(),be.dispose(),be.removeEventListener("sessionstart",N0),be.removeEventListener("sessionend",k0),gs.stop()};function fe(D){D.preventDefault(),H0("WebGLRenderer: Context Lost."),A=!0}function He(){H0("WebGLRenderer: Context Restored."),A=!1;const D=Ht.autoReset,K=ve.enabled,Q=ve.autoUpdate,Y=ve.needsUpdate,$=ve.type;ke(),Ht.autoReset=D,ve.enabled=K,ve.autoUpdate=Q,ve.needsUpdate=Y,ve.type=$}function st(D){Wt("WebGLRenderer: A WebGL context could not be created. Reason: ",D.statusMessage)}function an(D){const K=D.target;K.removeEventListener("dispose",an),Ct(K)}function Ct(D){Uo(D),k.remove(D)}function Uo(D){const K=k.get(D).programs;K!==void 0&&(K.forEach(function(Q){Me.releaseProgram(Q)}),D.isShaderMaterial&&Me.releaseShaderCache(D))}this.renderBufferDirect=function(D,K,Q,Y,$,Le){K===null&&(K=Pt);const Be=$.isMesh&&$.matrixWorld.determinant()<0,De=Eu(D,K,Q,Y,$);Te.setMaterial(Y,Be);let Ge=Q.index,We=1;if(Y.wireframe===!0){if(Ge=de.getWireframeAttribute(Q),Ge===void 0)return;We=2}const it=Q.drawRange,ft=Q.attributes.position;let Ke=it.start*We,Dt=(it.start+it.count)*We;Le!==null&&(Ke=Math.max(Ke,Le.start*We),Dt=Math.min(Dt,(Le.start+Le.count)*We)),Ge!==null?(Ke=Math.max(Ke,0),Dt=Math.min(Dt,Ge.count)):ft!=null&&(Ke=Math.max(Ke,0),Dt=Math.min(Dt,ft.count));const rn=Dt-Ke;if(rn<0||rn===1/0)return;_e.setup($,Y,De,Q,Ge);let tn,Ut=Ze;if(Ge!==null&&(tn=se.get(Ge),Ut=ht,Ut.setIndex(tn)),$.isMesh)Y.wireframe===!0?(Te.setLineWidth(Y.wireframeLinewidth*xn()),Ut.setMode(W.LINES)):Ut.setMode(W.TRIANGLES);else if($.isLine){let En=Y.linewidth;En===void 0&&(En=1),Te.setLineWidth(En*xn()),$.isLineSegments?Ut.setMode(W.LINES):$.isLineLoop?Ut.setMode(W.LINE_LOOP):Ut.setMode(W.LINE_STRIP)}else $.isPoints?Ut.setMode(W.POINTS):$.isSprite&&Ut.setMode(W.TRIANGLES);if($.isBatchedMesh)if(rt.get("WEBGL_multi_draw"))Ut.renderMultiDraw($._multiDrawStarts,$._multiDrawCounts,$._multiDrawCount);else{const En=$._multiDrawStarts,ze=$._multiDrawCounts,qn=$._multiDrawCount,St=Ge?se.get(Ge).bytesPerElement:1,Qn=k.get(Y).currentProgram.getUniforms();for(let So=0;So<qn;So++)Qn.setValue(W,"_gl_DrawID",So),Ut.render(En[So]/St,ze[So])}else if($.isInstancedMesh)Ut.renderInstances(Ke,rn,$.count);else if(Q.isInstancedBufferGeometry){const En=Q._maxInstanceCount!==void 0?Q._maxInstanceCount:1/0,ze=Math.min(Q.instanceCount,En);Ut.renderInstances(Ke,rn,ze)}else Ut.render(Ke,rn)};function bo(D,K,Q){D.transparent===!0&&D.side===qe&&D.forceSinglePass===!1?(D.side=Dn,D.needsUpdate=!0,Zi(D,K,Q),D.side=Js,D.needsUpdate=!0,Zi(D,K,Q),D.side=qe):Zi(D,K,Q)}this.compile=function(D,K,Q=null){Q===null&&(Q=D),b=Ce.get(Q),b.init(K),_.push(b),Q.traverseVisible(function($){$.isLight&&$.layers.test(K.layers)&&(b.pushLight($),$.castShadow&&b.pushShadow($))}),D!==Q&&D.traverseVisible(function($){$.isLight&&$.layers.test(K.layers)&&(b.pushLight($),$.castShadow&&b.pushShadow($))}),b.setupLights();const Y=new Set;return D.traverse(function($){if(!($.isMesh||$.isPoints||$.isLine||$.isSprite))return;const Le=$.material;if(Le)if(Array.isArray(Le))for(let Be=0;Be<Le.length;Be++){const De=Le[Be];bo(De,Q,$),Y.add(De)}else bo(Le,Q,$),Y.add(Le)}),b=_.pop(),Y},this.compileAsync=function(D,K,Q=null){const Y=this.compile(D,K,Q);return new Promise($=>{function Le(){if(Y.forEach(function(Be){k.get(Be).currentProgram.isReady()&&Y.delete(Be)}),Y.size===0){$(D);return}setTimeout(Le,10)}rt.get("KHR_parallel_shader_compile")!==null?Le():setTimeout(Le,10)})};let Ja=null;function yu(D){Ja&&Ja(D)}function N0(){gs.stop()}function k0(){gs.start()}const gs=new Kd;gs.setAnimationLoop(yu),typeof self<"u"&&gs.setContext(self),this.setAnimationLoop=function(D){Ja=D,be.setAnimationLoop(D),D===null?gs.stop():gs.start()},be.addEventListener("sessionstart",N0),be.addEventListener("sessionend",k0),this.render=function(D,K){if(K!==void 0&&K.isCamera!==!0){Wt("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(A===!0)return;R!==null&&R.renderStart(D,K);const Q=be.enabled===!0&&be.isPresenting===!0,Y=S!==null&&(L===null||Q)&&S.begin(E,L);if(D.matrixWorldAutoUpdate===!0&&D.updateMatrixWorld(),K.parent===null&&K.matrixWorldAutoUpdate===!0&&K.updateMatrixWorld(),be.enabled===!0&&be.isPresenting===!0&&(S===null||S.isCompositing()===!1)&&(be.cameraAutoUpdate===!0&&be.updateCamera(K),K=be.getCamera()),D.isScene===!0&&D.onBeforeRender(E,D,K,L),b=Ce.get(D,_.length),b.init(K),b.state.textureUnits=P.getTextureUnits(),_.push(b),_t.multiplyMatrices(K.projectionMatrix,K.matrixWorldInverse),Fe.setFromProjectionMatrix(_t,V0,K.reversedDepth),je=this.localClippingEnabled,tt=Oe.init(this.clippingPlanes,je),y=re.get(D,T.length),y.init(),T.push(y),be.enabled===!0&&be.isPresenting===!0){const Be=E.xr.getDepthSensingMesh();Be!==null&&er(Be,K,-1/0,E.sortObjects)}er(D,K,0,E.sortObjects),y.finish(),E.sortObjects===!0&&y.sort(j,ie),kt=be.enabled===!1||be.isPresenting===!1||be.hasDepthSensing()===!1,kt&&me.addToRenderList(y,D),this.info.render.frame++,tt===!0&&Oe.beginShadows();const $=b.state.shadowsArray;if(ve.render($,D,K),tt===!0&&Oe.endShadows(),this.info.autoReset===!0&&this.info.reset(),(Y&&S.hasRenderPass())===!1){const Be=y.opaque,De=y.transmissive;if(b.setupLights(),K.isArrayCamera){const Ge=K.cameras;if(De.length>0)for(let We=0,it=Ge.length;We<it;We++){const ft=Ge[We];F0(Be,De,D,ft)}kt&&me.render(D);for(let We=0,it=Ge.length;We<it;We++){const ft=Ge[We];U0(y,D,ft,ft.viewport)}}else De.length>0&&F0(Be,De,D,K),kt&&me.render(D),U0(y,D,K)}L!==null&&I===0&&(P.updateMultisampleRenderTarget(L),P.updateRenderTargetMipmap(L)),Y&&S.end(E),D.isScene===!0&&D.onAfterRender(E,D,K),_e.resetDefaultState(),N=-1,U=null,_.pop(),_.length>0?(b=_[_.length-1],P.setTextureUnits(b.state.textureUnits),tt===!0&&Oe.setGlobalState(E.clippingPlanes,b.state.camera)):b=null,T.pop(),T.length>0?y=T[T.length-1]:y=null,R!==null&&R.renderEnd()};function er(D,K,Q,Y){if(D.visible===!1)return;if(D.layers.test(K.layers)){if(D.isGroup)Q=D.renderOrder;else if(D.isLOD)D.autoUpdate===!0&&D.update(K);else if(D.isLightProbeGrid)b.pushLightProbeGrid(D);else if(D.isLight)b.pushLight(D),D.castShadow&&b.pushShadow(D);else if(D.isSprite){if(!D.frustumCulled||Fe.intersectsSprite(D)){Y&&nt.setFromMatrixPosition(D.matrixWorld).applyMatrix4(_t);const Be=pe.update(D),De=D.material;De.visible&&y.push(D,Be,De,Q,nt.z,null)}}else if((D.isMesh||D.isLine||D.isPoints)&&(!D.frustumCulled||Fe.intersectsObject(D))){const Be=pe.update(D),De=D.material;if(Y&&(D.boundingSphere!==void 0?(D.boundingSphere===null&&D.computeBoundingSphere(),nt.copy(D.boundingSphere.center)):(Be.boundingSphere===null&&Be.computeBoundingSphere(),nt.copy(Be.boundingSphere.center)),nt.applyMatrix4(D.matrixWorld).applyMatrix4(_t)),Array.isArray(De)){const Ge=Be.groups;for(let We=0,it=Ge.length;We<it;We++){const ft=Ge[We],Ke=De[ft.materialIndex];Ke&&Ke.visible&&y.push(D,Be,Ke,Q,nt.z,ft)}}else De.visible&&y.push(D,Be,De,Q,nt.z,null)}}const Le=D.children;for(let Be=0,De=Le.length;Be<De;Be++)er(Le[Be],K,Q,Y)}function U0(D,K,Q,Y){const{opaque:$,transmissive:Le,transparent:Be}=D;b.setupLightsView(Q),tt===!0&&Oe.setGlobalState(E.clippingPlanes,Q),Y&&Te.viewport(F.copy(Y)),$.length>0&&ji($,K,Q),Le.length>0&&ji(Le,K,Q),Be.length>0&&ji(Be,K,Q),Te.buffers.depth.setTest(!0),Te.buffers.depth.setMask(!0),Te.buffers.color.setMask(!0),Te.setPolygonOffset(!1)}function F0(D,K,Q,Y){if((Q.isScene===!0?Q.overrideMaterial:null)!==null)return;if(b.state.transmissionRenderTarget[Y.id]===void 0){const Ke=rt.has("EXT_color_buffer_half_float")||rt.has("EXT_color_buffer_float");b.state.transmissionRenderTarget[Y.id]=new wn(1,1,{generateMipmaps:!0,type:Ke?Cn:Rn,minFilter:Yn,samples:Math.max(4,At.samples),stencilBuffer:i,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Xt.workingColorSpace})}const Le=b.state.transmissionRenderTarget[Y.id],Be=Y.viewport||F;Le.setSize(Be.z*E.transmissionResolutionScale,Be.w*E.transmissionResolutionScale);const De=E.getRenderTarget(),Ge=E.getActiveCubeFace(),We=E.getActiveMipmapLevel();E.setRenderTarget(Le),E.getClearColor(O),B=E.getClearAlpha(),B<1&&E.setClearColor(16777215,.5),E.clear(),kt&&me.render(Q);const it=E.toneMapping;E.toneMapping=Io;const ft=Y.viewport;if(Y.viewport!==void 0&&(Y.viewport=void 0),b.setupLightsView(Y),tt===!0&&Oe.setGlobalState(E.clippingPlanes,Y),ji(D,Q,Y),P.updateMultisampleRenderTarget(Le),P.updateRenderTargetMipmap(Le),rt.has("WEBGL_multisampled_render_to_texture")===!1){let Ke=!1;for(let Dt=0,rn=K.length;Dt<rn;Dt++){const tn=K[Dt],{object:Ut,geometry:En,material:ze,group:qn}=tn;if(ze.side===qe&&Ut.layers.test(Y.layers)){const St=ze.side;ze.side=Dn,ze.needsUpdate=!0,O0(Ut,Q,Y,En,ze,qn),ze.side=St,ze.needsUpdate=!0,Ke=!0}}Ke===!0&&(P.updateMultisampleRenderTarget(Le),P.updateRenderTargetMipmap(Le))}E.setRenderTarget(De,Ge,We),E.setClearColor(O,B),ft!==void 0&&(Y.viewport=ft),E.toneMapping=it}function ji(D,K,Q){const Y=K.isScene===!0?K.overrideMaterial:null;for(let $=0,Le=D.length;$<Le;$++){const Be=D[$],{object:De,geometry:Ge,group:We}=Be;let it=Be.material;it.allowOverride===!0&&Y!==null&&(it=Y),De.layers.test(Q.layers)&&O0(De,K,Q,Ge,it,We)}}function O0(D,K,Q,Y,$,Le){D.onBeforeRender(E,K,Q,Y,$,Le),D.modelViewMatrix.multiplyMatrices(Q.matrixWorldInverse,D.matrixWorld),D.normalMatrix.getNormalMatrix(D.modelViewMatrix),$.onBeforeRender(E,K,Q,Y,D,Le),$.transparent===!0&&$.side===qe&&$.forceSinglePass===!1?($.side=Dn,$.needsUpdate=!0,E.renderBufferDirect(Q,K,Y,$,D,Le),$.side=Js,$.needsUpdate=!0,E.renderBufferDirect(Q,K,Y,$,D,Le),$.side=qe):E.renderBufferDirect(Q,K,Y,$,D,Le),D.onAfterRender(E,K,Q,Y,$,Le)}function Zi(D,K,Q){K.isScene!==!0&&(K=Pt);const Y=k.get(D),$=b.state.lights,Le=b.state.shadowsArray,Be=$.state.version,De=Me.getParameters(D,$.state,Le,K,Q,b.state.lightProbeGridArray),Ge=Me.getProgramCacheKey(De);let We=Y.programs;Y.environment=D.isMeshStandardMaterial||D.isMeshLambertMaterial||D.isMeshPhongMaterial?K.environment:null,Y.fog=K.fog;const it=D.isMeshStandardMaterial||D.isMeshLambertMaterial&&!D.envMap||D.isMeshPhongMaterial&&!D.envMap;Y.envMap=q.get(D.envMap||Y.environment,it),Y.envMapRotation=Y.environment!==null&&D.envMap===null?K.environmentRotation:D.envMapRotation,We===void 0&&(D.addEventListener("dispose",an),We=new Map,Y.programs=We);let ft=We.get(Ge);if(ft!==void 0){if(Y.currentProgram===ft&&Y.lightsStateVersion===Be)return B0(D,De),ft}else De.uniforms=Me.getUniforms(D),R!==null&&D.isNodeMaterial&&R.build(D,Q,De),D.onBeforeCompile(De,E),ft=Me.acquireProgram(De,Ge),We.set(Ge,ft),Y.uniforms=De.uniforms;const Ke=Y.uniforms;return(!D.isShaderMaterial&&!D.isRawShaderMaterial||D.clipping===!0)&&(Ke.clippingPlanes=Oe.uniform),B0(D,De),Y.needsLights=Ru(D),Y.lightsStateVersion=Be,Y.needsLights&&(Ke.ambientLightColor.value=$.state.ambient,Ke.lightProbe.value=$.state.probe,Ke.directionalLights.value=$.state.directional,Ke.directionalLightShadows.value=$.state.directionalShadow,Ke.spotLights.value=$.state.spot,Ke.spotLightShadows.value=$.state.spotShadow,Ke.rectAreaLights.value=$.state.rectArea,Ke.ltc_1.value=$.state.rectAreaLTC1,Ke.ltc_2.value=$.state.rectAreaLTC2,Ke.pointLights.value=$.state.point,Ke.pointLightShadows.value=$.state.pointShadow,Ke.hemisphereLights.value=$.state.hemi,Ke.directionalShadowMatrix.value=$.state.directionalShadowMatrix,Ke.spotLightMatrix.value=$.state.spotLightMatrix,Ke.spotLightMap.value=$.state.spotLightMap,Ke.pointShadowMatrix.value=$.state.pointShadowMatrix),Y.lightProbeGrid=b.state.lightProbeGridArray.length>0,Y.currentProgram=ft,Y.uniformsList=null,ft}function z0(D){if(D.uniformsList===null){const K=D.currentProgram.getUniforms();D.uniformsList=va.seqWithValue(K.seq,D.uniforms)}return D.uniformsList}function B0(D,K){const Q=k.get(D);Q.outputColorSpace=K.outputColorSpace,Q.batching=K.batching,Q.batchingColor=K.batchingColor,Q.instancing=K.instancing,Q.instancingColor=K.instancingColor,Q.instancingMorph=K.instancingMorph,Q.skinning=K.skinning,Q.morphTargets=K.morphTargets,Q.morphNormals=K.morphNormals,Q.morphColors=K.morphColors,Q.morphTargetsCount=K.morphTargetsCount,Q.numClippingPlanes=K.numClippingPlanes,Q.numIntersection=K.numClipIntersection,Q.vertexAlphas=K.vertexAlphas,Q.vertexTangents=K.vertexTangents,Q.toneMapping=K.toneMapping}function Tu(D,K){if(D.length===0)return null;if(D.length===1)return D[0].texture!==null?D[0]:null;M.setFromMatrixPosition(K.matrixWorld);for(let Q=0,Y=D.length;Q<Y;Q++){const $=D[Q];if($.texture!==null&&$.boundingBox.containsPoint(M))return $}return null}function Eu(D,K,Q,Y,$){K.isScene!==!0&&(K=Pt),P.resetTextureUnits();const Le=K.fog,Be=Y.isMeshStandardMaterial||Y.isMeshLambertMaterial||Y.isMeshPhongMaterial?K.environment:null,De=L===null?E.outputColorSpace:L.isXRRenderTarget===!0?L.texture.colorSpace:Xt.workingColorSpace,Ge=Y.isMeshStandardMaterial||Y.isMeshLambertMaterial&&!Y.envMap||Y.isMeshPhongMaterial&&!Y.envMap,We=q.get(Y.envMap||Be,Ge),it=Y.vertexColors===!0&&!!Q.attributes.color&&Q.attributes.color.itemSize===4,ft=!!Q.attributes.tangent&&(!!Y.normalMap||Y.anisotropy>0),Ke=!!Q.morphAttributes.position,Dt=!!Q.morphAttributes.normal,rn=!!Q.morphAttributes.color;let tn=Io;Y.toneMapped&&(L===null||L.isXRRenderTarget===!0)&&(tn=E.toneMapping);const Ut=Q.morphAttributes.position||Q.morphAttributes.normal||Q.morphAttributes.color,En=Ut!==void 0?Ut.length:0,ze=k.get(Y),qn=b.state.lights;if(tt===!0&&(je===!0||D!==U)){const Vt=D===U&&Y.id===N;Oe.setState(Y,D,Vt)}let St=!1;Y.version===ze.__version?(ze.needsLights&&ze.lightsStateVersion!==qn.state.version||ze.outputColorSpace!==De||$.isBatchedMesh&&ze.batching===!1||!$.isBatchedMesh&&ze.batching===!0||$.isBatchedMesh&&ze.batchingColor===!0&&$.colorTexture===null||$.isBatchedMesh&&ze.batchingColor===!1&&$.colorTexture!==null||$.isInstancedMesh&&ze.instancing===!1||!$.isInstancedMesh&&ze.instancing===!0||$.isSkinnedMesh&&ze.skinning===!1||!$.isSkinnedMesh&&ze.skinning===!0||$.isInstancedMesh&&ze.instancingColor===!0&&$.instanceColor===null||$.isInstancedMesh&&ze.instancingColor===!1&&$.instanceColor!==null||$.isInstancedMesh&&ze.instancingMorph===!0&&$.morphTexture===null||$.isInstancedMesh&&ze.instancingMorph===!1&&$.morphTexture!==null||ze.envMap!==We||Y.fog===!0&&ze.fog!==Le||ze.numClippingPlanes!==void 0&&(ze.numClippingPlanes!==Oe.numPlanes||ze.numIntersection!==Oe.numIntersection)||ze.vertexAlphas!==it||ze.vertexTangents!==ft||ze.morphTargets!==Ke||ze.morphNormals!==Dt||ze.morphColors!==rn||ze.toneMapping!==tn||ze.morphTargetsCount!==En||!!ze.lightProbeGrid!=b.state.lightProbeGridArray.length>0)&&(St=!0):(St=!0,ze.__version=Y.version);let Qn=ze.currentProgram;St===!0&&(Qn=Zi(Y,K,$),R&&Y.isNodeMaterial&&R.onUpdateProgram(Y,Qn,ze));let So=!1,Yo=!1,Os=!1;const Ft=Qn.getUniforms(),cn=ze.uniforms;if(Te.useProgram(Qn.program)&&(So=!0,Yo=!0,Os=!0),Y.id!==N&&(N=Y.id,Yo=!0),ze.needsLights){const Vt=Tu(b.state.lightProbeGridArray,$);ze.lightProbeGrid!==Vt&&(ze.lightProbeGrid=Vt,Yo=!0)}if(So||U!==D){Te.buffers.depth.getReversed()&&D.reversedDepth!==!0&&(D._reversedDepth=!0,D.updateProjectionMatrix()),Ft.setValue(W,"projectionMatrix",D.projectionMatrix),Ft.setValue(W,"viewMatrix",D.matrixWorldInverse);const jo=Ft.map.cameraPosition;jo!==void 0&&jo.setValue(W,gt.setFromMatrixPosition(D.matrixWorld)),At.logarithmicDepthBuffer&&Ft.setValue(W,"logDepthBufFC",2/(Math.log(D.far+1)/Math.LN2)),(Y.isMeshPhongMaterial||Y.isMeshToonMaterial||Y.isMeshLambertMaterial||Y.isMeshBasicMaterial||Y.isMeshStandardMaterial||Y.isShaderMaterial)&&Ft.setValue(W,"isOrthographic",D.isOrthographicCamera===!0),U!==D&&(U=D,Yo=!0,Os=!0)}if(ze.needsLights&&(qn.state.directionalShadowMap.length>0&&Ft.setValue(W,"directionalShadowMap",qn.state.directionalShadowMap,P),qn.state.spotShadowMap.length>0&&Ft.setValue(W,"spotShadowMap",qn.state.spotShadowMap,P),qn.state.pointShadowMap.length>0&&Ft.setValue(W,"pointShadowMap",qn.state.pointShadowMap,P)),$.isSkinnedMesh){Ft.setOptional(W,$,"bindMatrix"),Ft.setOptional(W,$,"bindMatrixInverse");const Vt=$.skeleton;Vt&&(Vt.boneTexture===null&&Vt.computeBoneTexture(),Ft.setValue(W,"boneTexture",Vt.boneTexture,P))}$.isBatchedMesh&&(Ft.setOptional(W,$,"batchingTexture"),Ft.setValue(W,"batchingTexture",$._matricesTexture,P),Ft.setOptional(W,$,"batchingIdTexture"),Ft.setValue(W,"batchingIdTexture",$._indirectTexture,P),Ft.setOptional(W,$,"batchingColorTexture"),$._colorsTexture!==null&&Ft.setValue(W,"batchingColorTexture",$._colorsTexture,P));const $o=Q.morphAttributes;if(($o.position!==void 0||$o.normal!==void 0||$o.color!==void 0)&&$e.update($,Q,Qn),(Yo||ze.receiveShadow!==$.receiveShadow)&&(ze.receiveShadow=$.receiveShadow,Ft.setValue(W,"receiveShadow",$.receiveShadow)),(Y.isMeshStandardMaterial||Y.isMeshLambertMaterial||Y.isMeshPhongMaterial)&&Y.envMap===null&&K.environment!==null&&(cn.envMapIntensity.value=K.environmentIntensity),cn.dfgLUT!==void 0&&(cn.dfgLUT.value=c3()),Yo){if(Ft.setValue(W,"toneMappingExposure",E.toneMappingExposure),ze.needsLights&&Au(cn,Os),Le&&Y.fog===!0&&ee.refreshFogUniforms(cn,Le),ee.refreshMaterialUniforms(cn,Y,xe,ue,b.state.transmissionRenderTarget[D.id]),ze.needsLights&&ze.lightProbeGrid){const Vt=ze.lightProbeGrid;cn.probesSH.value=Vt.texture,cn.probesMin.value.copy(Vt.boundingBox.min),cn.probesMax.value.copy(Vt.boundingBox.max),cn.probesResolution.value.copy(Vt.resolution)}va.upload(W,z0(ze),cn,P)}if(Y.isShaderMaterial&&Y.uniformsNeedUpdate===!0&&(va.upload(W,z0(ze),cn,P),Y.uniformsNeedUpdate=!1),Y.isSpriteMaterial&&Ft.setValue(W,"center",$.center),Ft.setValue(W,"modelViewMatrix",$.modelViewMatrix),Ft.setValue(W,"normalMatrix",$.normalMatrix),Ft.setValue(W,"modelMatrix",$.matrixWorld),Y.uniformsGroups!==void 0){const Vt=Y.uniformsGroups;for(let jo=0,zs=Vt.length;jo<zs;jo++){const G0=Vt[jo];ae.update(G0,Qn),ae.bind(G0,Qn)}}return Qn}function Au(D,K){D.ambientLightColor.needsUpdate=K,D.lightProbe.needsUpdate=K,D.directionalLights.needsUpdate=K,D.directionalLightShadows.needsUpdate=K,D.pointLights.needsUpdate=K,D.pointLightShadows.needsUpdate=K,D.spotLights.needsUpdate=K,D.spotLightShadows.needsUpdate=K,D.rectAreaLights.needsUpdate=K,D.hemisphereLights.needsUpdate=K}function Ru(D){return D.isMeshLambertMaterial||D.isMeshToonMaterial||D.isMeshPhongMaterial||D.isMeshStandardMaterial||D.isShadowMaterial||D.isShaderMaterial&&D.lights===!0}this.getActiveCubeFace=function(){return C},this.getActiveMipmapLevel=function(){return I},this.getRenderTarget=function(){return L},this.setRenderTargetTextures=function(D,K,Q){const Y=k.get(D);Y.__autoAllocateDepthBuffer=D.resolveDepthBuffer===!1,Y.__autoAllocateDepthBuffer===!1&&(Y.__useRenderToTexture=!1),k.get(D.texture).__webglTexture=K,k.get(D.depthTexture).__webglTexture=Y.__autoAllocateDepthBuffer?void 0:Q,Y.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(D,K){const Q=k.get(D);Q.__webglFramebuffer=K,Q.__useDefaultFramebuffer=K===void 0};const Pu=W.createFramebuffer();this.setRenderTarget=function(D,K=0,Q=0){L=D,C=K,I=Q;let Y=null,$=!1,Le=!1;if(D){const De=k.get(D);if(De.__useDefaultFramebuffer!==void 0){Te.bindFramebuffer(W.FRAMEBUFFER,De.__webglFramebuffer),F.copy(D.viewport),z.copy(D.scissor),G=D.scissorTest,Te.viewport(F),Te.scissor(z),Te.setScissorTest(G),N=-1;return}else if(De.__webglFramebuffer===void 0)P.setupRenderTarget(D);else if(De.__hasExternalTextures)P.rebindTextures(D,k.get(D.texture).__webglTexture,k.get(D.depthTexture).__webglTexture);else if(D.depthBuffer){const it=D.depthTexture;if(De.__boundDepthTexture!==it){if(it!==null&&k.has(it)&&(D.width!==it.image.width||D.height!==it.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");P.setupDepthRenderbuffer(D)}}const Ge=D.texture;(Ge.isData3DTexture||Ge.isDataArrayTexture||Ge.isCompressedArrayTexture)&&(Le=!0);const We=k.get(D).__webglFramebuffer;D.isWebGLCubeRenderTarget?(Array.isArray(We[K])?Y=We[K][Q]:Y=We[K],$=!0):D.samples>0&&P.useMultisampledRTT(D)===!1?Y=k.get(D).__webglMultisampledFramebuffer:Array.isArray(We)?Y=We[Q]:Y=We,F.copy(D.viewport),z.copy(D.scissor),G=D.scissorTest}else F.copy(ne).multiplyScalar(xe).floor(),z.copy(ye).multiplyScalar(xe).floor(),G=Ie;if(Q!==0&&(Y=Pu),Te.bindFramebuffer(W.FRAMEBUFFER,Y)&&Te.drawBuffers(D,Y),Te.viewport(F),Te.scissor(z),Te.setScissorTest(G),$){const De=k.get(D.texture);W.framebufferTexture2D(W.FRAMEBUFFER,W.COLOR_ATTACHMENT0,W.TEXTURE_CUBE_MAP_POSITIVE_X+K,De.__webglTexture,Q)}else if(Le){const De=K;for(let Ge=0;Ge<D.textures.length;Ge++){const We=k.get(D.textures[Ge]);W.framebufferTextureLayer(W.FRAMEBUFFER,W.COLOR_ATTACHMENT0+Ge,We.__webglTexture,Q,De)}}else if(D!==null&&Q!==0){const De=k.get(D.texture);W.framebufferTexture2D(W.FRAMEBUFFER,W.COLOR_ATTACHMENT0,W.TEXTURE_2D,De.__webglTexture,Q)}N=-1},this.readRenderTargetPixels=function(D,K,Q,Y,$,Le,Be,De=0){if(!(D&&D.isWebGLRenderTarget)){Wt("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ge=k.get(D).__webglFramebuffer;if(D.isWebGLCubeRenderTarget&&Be!==void 0&&(Ge=Ge[Be]),Ge){Te.bindFramebuffer(W.FRAMEBUFFER,Ge);try{const We=D.textures[De],it=We.format,ft=We.type;if(D.textures.length>1&&W.readBuffer(W.COLOR_ATTACHMENT0+De),!At.textureFormatReadable(it)){Wt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!At.textureTypeReadable(ft)){Wt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}K>=0&&K<=D.width-Y&&Q>=0&&Q<=D.height-$&&W.readPixels(K,Q,Y,$,H.convert(it),H.convert(ft),Le)}finally{const We=L!==null?k.get(L).__webglFramebuffer:null;Te.bindFramebuffer(W.FRAMEBUFFER,We)}}},this.readRenderTargetPixelsAsync=async function(D,K,Q,Y,$,Le,Be,De=0){if(!(D&&D.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Ge=k.get(D).__webglFramebuffer;if(D.isWebGLCubeRenderTarget&&Be!==void 0&&(Ge=Ge[Be]),Ge)if(K>=0&&K<=D.width-Y&&Q>=0&&Q<=D.height-$){Te.bindFramebuffer(W.FRAMEBUFFER,Ge);const We=D.textures[De],it=We.format,ft=We.type;if(D.textures.length>1&&W.readBuffer(W.COLOR_ATTACHMENT0+De),!At.textureFormatReadable(it))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!At.textureTypeReadable(ft))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Ke=W.createBuffer();W.bindBuffer(W.PIXEL_PACK_BUFFER,Ke),W.bufferData(W.PIXEL_PACK_BUFFER,Le.byteLength,W.STREAM_READ),W.readPixels(K,Q,Y,$,H.convert(it),H.convert(ft),0);const Dt=L!==null?k.get(L).__webglFramebuffer:null;Te.bindFramebuffer(W.FRAMEBUFFER,Dt);const rn=W.fenceSync(W.SYNC_GPU_COMMANDS_COMPLETE,0);return W.flush(),await Uu(W,rn,4),W.bindBuffer(W.PIXEL_PACK_BUFFER,Ke),W.getBufferSubData(W.PIXEL_PACK_BUFFER,0,Le),W.deleteBuffer(Ke),W.deleteSync(rn),Le}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(D,K=null,Q=0){const Y=Math.pow(2,-Q),$=Math.floor(D.image.width*Y),Le=Math.floor(D.image.height*Y),Be=K!==null?K.x:0,De=K!==null?K.y:0;P.setTexture2D(D,0),W.copyTexSubImage2D(W.TEXTURE_2D,Q,0,0,Be,De,$,Le),Te.unbindTexture()};const Cu=W.createFramebuffer(),Du=W.createFramebuffer();this.copyTextureToTexture=function(D,K,Q=null,Y=null,$=0,Le=0){let Be,De,Ge,We,it,ft,Ke,Dt,rn;const tn=D.isCompressedTexture?D.mipmaps[Le]:D.image;if(Q!==null)Be=Q.max.x-Q.min.x,De=Q.max.y-Q.min.y,Ge=Q.isBox3?Q.max.z-Q.min.z:1,We=Q.min.x,it=Q.min.y,ft=Q.isBox3?Q.min.z:0;else{const cn=Math.pow(2,-$);Be=Math.floor(tn.width*cn),De=Math.floor(tn.height*cn),D.isDataArrayTexture?Ge=tn.depth:D.isData3DTexture?Ge=Math.floor(tn.depth*cn):Ge=1,We=0,it=0,ft=0}Y!==null?(Ke=Y.x,Dt=Y.y,rn=Y.z):(Ke=0,Dt=0,rn=0);const Ut=H.convert(K.format),En=H.convert(K.type);let ze;K.isData3DTexture?(P.setTexture3D(K,0),ze=W.TEXTURE_3D):K.isDataArrayTexture||K.isCompressedArrayTexture?(P.setTexture2DArray(K,0),ze=W.TEXTURE_2D_ARRAY):(P.setTexture2D(K,0),ze=W.TEXTURE_2D),Te.activeTexture(W.TEXTURE0),Te.pixelStorei(W.UNPACK_FLIP_Y_WEBGL,K.flipY),Te.pixelStorei(W.UNPACK_PREMULTIPLY_ALPHA_WEBGL,K.premultiplyAlpha),Te.pixelStorei(W.UNPACK_ALIGNMENT,K.unpackAlignment);const qn=Te.getParameter(W.UNPACK_ROW_LENGTH),St=Te.getParameter(W.UNPACK_IMAGE_HEIGHT),Qn=Te.getParameter(W.UNPACK_SKIP_PIXELS),So=Te.getParameter(W.UNPACK_SKIP_ROWS),Yo=Te.getParameter(W.UNPACK_SKIP_IMAGES);Te.pixelStorei(W.UNPACK_ROW_LENGTH,tn.width),Te.pixelStorei(W.UNPACK_IMAGE_HEIGHT,tn.height),Te.pixelStorei(W.UNPACK_SKIP_PIXELS,We),Te.pixelStorei(W.UNPACK_SKIP_ROWS,it),Te.pixelStorei(W.UNPACK_SKIP_IMAGES,ft);const Os=D.isDataArrayTexture||D.isData3DTexture,Ft=K.isDataArrayTexture||K.isData3DTexture;if(D.isDepthTexture){const cn=k.get(D),$o=k.get(K),Vt=k.get(cn.__renderTarget),jo=k.get($o.__renderTarget);Te.bindFramebuffer(W.READ_FRAMEBUFFER,Vt.__webglFramebuffer),Te.bindFramebuffer(W.DRAW_FRAMEBUFFER,jo.__webglFramebuffer);for(let zs=0;zs<Ge;zs++)Os&&(W.framebufferTextureLayer(W.READ_FRAMEBUFFER,W.COLOR_ATTACHMENT0,k.get(D).__webglTexture,$,ft+zs),W.framebufferTextureLayer(W.DRAW_FRAMEBUFFER,W.COLOR_ATTACHMENT0,k.get(K).__webglTexture,Le,rn+zs)),W.blitFramebuffer(We,it,Be,De,Ke,Dt,Be,De,W.DEPTH_BUFFER_BIT,W.NEAREST);Te.bindFramebuffer(W.READ_FRAMEBUFFER,null),Te.bindFramebuffer(W.DRAW_FRAMEBUFFER,null)}else if($!==0||D.isRenderTargetTexture||k.has(D)){const cn=k.get(D),$o=k.get(K);Te.bindFramebuffer(W.READ_FRAMEBUFFER,Cu),Te.bindFramebuffer(W.DRAW_FRAMEBUFFER,Du);for(let Vt=0;Vt<Ge;Vt++)Os?W.framebufferTextureLayer(W.READ_FRAMEBUFFER,W.COLOR_ATTACHMENT0,cn.__webglTexture,$,ft+Vt):W.framebufferTexture2D(W.READ_FRAMEBUFFER,W.COLOR_ATTACHMENT0,W.TEXTURE_2D,cn.__webglTexture,$),Ft?W.framebufferTextureLayer(W.DRAW_FRAMEBUFFER,W.COLOR_ATTACHMENT0,$o.__webglTexture,Le,rn+Vt):W.framebufferTexture2D(W.DRAW_FRAMEBUFFER,W.COLOR_ATTACHMENT0,W.TEXTURE_2D,$o.__webglTexture,Le),$!==0?W.blitFramebuffer(We,it,Be,De,Ke,Dt,Be,De,W.COLOR_BUFFER_BIT,W.NEAREST):Ft?W.copyTexSubImage3D(ze,Le,Ke,Dt,rn+Vt,We,it,Be,De):W.copyTexSubImage2D(ze,Le,Ke,Dt,We,it,Be,De);Te.bindFramebuffer(W.READ_FRAMEBUFFER,null),Te.bindFramebuffer(W.DRAW_FRAMEBUFFER,null)}else Ft?D.isDataTexture||D.isData3DTexture?W.texSubImage3D(ze,Le,Ke,Dt,rn,Be,De,Ge,Ut,En,tn.data):K.isCompressedArrayTexture?W.compressedTexSubImage3D(ze,Le,Ke,Dt,rn,Be,De,Ge,Ut,tn.data):W.texSubImage3D(ze,Le,Ke,Dt,rn,Be,De,Ge,Ut,En,tn):D.isDataTexture?W.texSubImage2D(W.TEXTURE_2D,Le,Ke,Dt,Be,De,Ut,En,tn.data):D.isCompressedTexture?W.compressedTexSubImage2D(W.TEXTURE_2D,Le,Ke,Dt,tn.width,tn.height,Ut,tn.data):W.texSubImage2D(W.TEXTURE_2D,Le,Ke,Dt,Be,De,Ut,En,tn);Te.pixelStorei(W.UNPACK_ROW_LENGTH,qn),Te.pixelStorei(W.UNPACK_IMAGE_HEIGHT,St),Te.pixelStorei(W.UNPACK_SKIP_PIXELS,Qn),Te.pixelStorei(W.UNPACK_SKIP_ROWS,So),Te.pixelStorei(W.UNPACK_SKIP_IMAGES,Yo),Le===0&&K.generateMipmaps&&W.generateMipmap(ze),Te.unbindTexture()},this.initRenderTarget=function(D){k.get(D).__webglFramebuffer===void 0&&P.setupRenderTarget(D)},this.initTexture=function(D){D.isCubeTexture?P.setTextureCube(D,0):D.isData3DTexture?P.setTexture3D(D,0):D.isDataArrayTexture||D.isCompressedArrayTexture?P.setTexture2DArray(D,0):P.setTexture2D(D,0),Te.unbindTexture()},this.resetState=function(){C=0,I=0,L=null,Te.reset(),_e.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return V0}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(n){this._outputColorSpace=n;const e=this.getContext();e.drawingBufferColorSpace=Xt._getDrawingBufferColorSpace(n),e.unpackColorSpace=Xt._getUnpackColorSpace()}}const _i=new X;function Jn(t,n,e,o,s,i){const a=2*Math.PI*s/4,r=Math.max(i-2*s,0),c=Math.PI/4;_i.copy(n),_i[o]=0,_i.normalize();const l=.5*a/(a+r),d=1-_i.angleTo(t)/c;return Math.sign(_i[e])===1?d*l:r/(a+r)+l+l*(1-d)}class Wo extends Ye{constructor(n=1,e=1,o=1,s=2,i=.1){const a=s*2+1;if(i=Math.min(n/2,e/2,o/2,i),super(1,1,1,a,a,a),this.type="RoundedBoxGeometry",this.parameters={width:n,height:e,depth:o,segments:s,radius:i},a===1)return;const r=this.toNonIndexed();this.index=null,this.attributes.position=r.attributes.position,this.attributes.normal=r.attributes.normal,this.attributes.uv=r.attributes.uv;const c=new X,l=new X,d=new X(n,e,o).divideScalar(2).subScalar(i),f=this.attributes.position.array,u=this.attributes.normal.array,h=this.attributes.uv.array,p=f.length/6,x=new X,m=.5/a;for(let g=0,v=0;g<f.length;g+=3,v+=2)switch(c.fromArray(f,g),l.copy(c),l.x-=Math.sign(l.x)*m,l.y-=Math.sign(l.y)*m,l.z-=Math.sign(l.z)*m,l.normalize(),f[g+0]=d.x*Math.sign(c.x)+l.x*i,f[g+1]=d.y*Math.sign(c.y)+l.y*i,f[g+2]=d.z*Math.sign(c.z)+l.z*i,u[g+0]=l.x,u[g+1]=l.y,u[g+2]=l.z,Math.floor(g/p)){case 0:x.set(1,0,0),h[v+0]=Jn(x,l,"z","y",i,o),h[v+1]=1-Jn(x,l,"y","z",i,e);break;case 1:x.set(-1,0,0),h[v+0]=1-Jn(x,l,"z","y",i,o),h[v+1]=1-Jn(x,l,"y","z",i,e);break;case 2:x.set(0,1,0),h[v+0]=1-Jn(x,l,"x","z",i,n),h[v+1]=Jn(x,l,"z","x",i,o);break;case 3:x.set(0,-1,0),h[v+0]=1-Jn(x,l,"x","z",i,n),h[v+1]=1-Jn(x,l,"z","x",i,o);break;case 4:x.set(0,0,1),h[v+0]=1-Jn(x,l,"x","y",i,n),h[v+1]=1-Jn(x,l,"y","x",i,e);break;case 5:x.set(0,0,-1),h[v+0]=Jn(x,l,"x","y",i,n),h[v+1]=1-Jn(x,l,"y","x",i,e);break}}static fromJSON(n){return new Wo(n.width,n.height,n.depth,n.segments,n.radius)}}function Wn(t,n=!1){const e=t[0].index!==null,o=new Set(Object.keys(t[0].attributes)),s=new Set(Object.keys(t[0].morphAttributes)),i={},a={},r=t[0].morphTargetsRelative,c=new jt;let l=0;for(let d=0;d<t.length;++d){const f=t[d];let u=0;if(e!==(f.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+d+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(const h in f.attributes){if(!o.has(h))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+d+'. All geometries must have compatible attributes; make sure "'+h+'" attribute exists among all geometries, or in none of them.'),null;i[h]===void 0&&(i[h]=[]),i[h].push(f.attributes[h]),u++}if(u!==o.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+d+". Make sure all geometries have the same number of attributes."),null;if(r!==f.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+d+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(const h in f.morphAttributes){if(!s.has(h))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+d+".  .morphAttributes must be consistent throughout all geometries."),null;a[h]===void 0&&(a[h]=[]),a[h].push(f.morphAttributes[h])}if(n){let h;if(e)h=f.index.count;else if(f.attributes.position!==void 0)h=f.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+d+". The geometry must have either an index or a position attribute"),null;c.addGroup(l,h,d),l+=h}}if(e){let d=0;const f=[];for(let u=0;u<t.length;++u){const h=t[u].index;for(let p=0;p<h.count;++p)f.push(h.getX(p)+d);d+=t[u].attributes.position.count}c.setIndex(f)}for(const d in i){const f=tl(i[d]);if(!f)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+d+" attribute."),null;c.setAttribute(d,f)}for(const d in a){const f=a[d][0].length;if(f!==0){c.morphAttributes=c.morphAttributes||{},c.morphAttributes[d]=[];for(let u=0;u<f;++u){const h=[];for(let x=0;x<a[d].length;++x)h.push(a[d][x][u]);const p=tl(h);if(!p)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+d+" morphAttribute."),null;c.morphAttributes[d].push(p)}}}return c}function tl(t){let n,e,o,s=-1,i=0;for(let l=0;l<t.length;++l){const d=t[l];if(n===void 0&&(n=d.array.constructor),n!==d.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(e===void 0&&(e=d.itemSize),e!==d.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(o===void 0&&(o=d.normalized),o!==d.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(s===-1&&(s=d.gpuType),s!==d.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;i+=d.count*e}const a=new n(i),r=new lt(a,e,o);let c=0;for(let l=0;l<t.length;++l){const d=t[l];if(d.isInterleavedBufferAttribute){const f=c/e;for(let u=0,h=d.count;u<h;u++)for(let p=0;p<e;p++){const x=d.getComponent(u,p);r.setComponent(u+f,p,x)}}else a.set(d.array,c);c+=d.count*e}return s!==void 0&&(r.gpuType=s),r}function Is(t,n=1e-4){n=Math.max(n,Number.EPSILON);const e={},o=t.getIndex(),s=t.getAttribute("position"),i=o?o.count:s.count;let a=0;const r=Object.keys(t.attributes),c={},l={},d=[],f=["getX","getY","getZ","getW"],u=["setX","setY","setZ","setW"];for(let v=0,w=r.length;v<w;v++){const M=r[v],y=t.attributes[M];c[M]=new y.constructor(new y.array.constructor(y.count*y.itemSize),y.itemSize,y.normalized);const b=t.morphAttributes[M];b&&(l[M]||(l[M]=[]),b.forEach((T,_)=>{const S=new T.array.constructor(T.count*T.itemSize);l[M][_]=new T.constructor(S,T.itemSize,T.normalized)}))}const h=n*.5,p=Math.log10(1/n),x=Math.pow(10,p),m=h*x;for(let v=0;v<i;v++){const w=o?o.getX(v):v;let M="";for(let y=0,b=r.length;y<b;y++){const T=r[y],_=t.getAttribute(T),S=_.itemSize;for(let E=0;E<S;E++)M+=`${~~(_[f[E]](w)*x+m)},`}if(M in e)d.push(e[M]);else{for(let y=0,b=r.length;y<b;y++){const T=r[y],_=t.getAttribute(T),S=t.morphAttributes[T],E=_.itemSize,A=c[T],R=l[T];for(let C=0;C<E;C++){const I=f[C],L=u[C];if(A[L](a,_[I](w)),S)for(let N=0,U=S.length;N<U;N++)R[N][L](a,S[N][I](w))}}e[M]=a,d.push(a),a++}}const g=t.clone();for(const v in t.attributes){const w=c[v];if(g.setAttribute(v,new w.constructor(w.array.slice(0,a*w.itemSize),w.itemSize,w.normalized)),v in l)for(let M=0;M<l[v].length;M++){const y=l[v][M];g.morphAttributes[v][M]=new y.constructor(y.array.slice(0,a*y.itemSize),y.itemSize,y.normalized)}}return g.setIndex(d),g}function nl(t,n){if(n===kh)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),t;if(n===Or||n===Od){let e=t.getIndex();if(e===null){const a=[],r=t.getAttribute("position");if(r!==void 0){for(let c=0;c<r.count;c++)a.push(c);t.setIndex(a),e=t.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),t}const o=e.count-2,s=[];if(n===Or)for(let a=1;a<=o;a++)s.push(e.getX(0)),s.push(e.getX(a)),s.push(e.getX(a+1));else for(let a=0;a<o;a++)a%2===0?(s.push(e.getX(a)),s.push(e.getX(a+1)),s.push(e.getX(a+2))):(s.push(e.getX(a+2)),s.push(e.getX(a+1)),s.push(e.getX(a)));s.length/3!==o&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");const i=t.clone();return i.setIndex(s),i.clearGroups(),i}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",n),t}const d0=["masonry","brick","plaster","paving","wood","tiles","metal","concrete"],d3={masonry:2.4,brick:1.2,plaster:1.6,paving:1.8,wood:1.6,tiles:1.2,metal:1,concrete:2};function ef(t){return d0.indexOf(t)}const tf=.65,nf=.87,of=.66;function f3(t){let n=t>>>0;return()=>{n=n+1831565813>>>0;let e=n;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}}const $t=(t,n,e)=>{const o=(e-t)/(n-t);return o<=0?0:o>=1?1:o*o*(3-2*o)},co=(t,n,e)=>t+(n-t)*e,u3=t=>t<0?0:t>1?1:t;function vt(t,n,e,o,s,i=.5){const a=new Float32Array(t*t);let r=1,c=0;const l=new Int32Array(t),d=new Int32Array(t),f=new Float32Array(t);for(let h=0;h<s;h++){const p=e<<h,x=o<<h;if(p>t/2||x>t/2)break;const m=new Float32Array(p*x);for(let v=0;v<m.length;v++)m[v]=n();for(let v=0;v<t;v++){const w=v*p/t,M=Math.floor(w),y=w-M;l[v]=M%p,d[v]=(M+1)%p,f[v]=y*y*(3-2*y)}const g=new Float32Array(p);for(let v=0;v<t;v++){const w=v*x/t,M=Math.floor(w),y=w-M,b=y*y*(3-2*y),T=M%x*p,_=(M+1)%x*p;for(let E=0;E<p;E++)g[E]=m[T+E]+(m[_+E]-m[T+E])*b;const S=v*t;for(let E=0;E<t;E++){const A=g[l[E]];a[S+E]+=r*(A+(g[d[E]]-A)*f[E])}}c+=r,r*=i}if(c===0)throw new Error("noiseField: cells exceed size");const u=1/c;for(let h=0;h<a.length;h++)a[h]*=u;return a}function h3(t){const n=t*t;return{S:t,mask:t-1,s:t/512,H:new Float32Array(n),R:new Float32Array(n).fill(1),G:new Float32Array(n).fill(1),B:new Float32Array(n).fill(1),F:new Float32Array(n).fill(of),A:new Float32Array(n).fill(1)}}function ol(t,n,e,o,s){const i=t-1,a=Math.ceil(o),r=Math.round(n),c=Math.round(e);for(let l=-a;l<=a;l++)for(let d=-a;d<=a;d++){const f=Math.sqrt(d*d+l*l)/o;f>=1||s((c+l&i)*t+(r+d&i),1-f)}}function f0(t,n,e){const o=t-1,s=t/512,i=new Int32Array(e.rows+1);{const M=[];let y=0;for(let T=0;T<e.rows;T++){const _=1+(n()-.5)*2*e.rowJitter;M.push(_),y+=_}let b=0;for(let T=0;T<e.rows;T++)i[T]=Math.round(b/y*t),b+=M[T];i[e.rows]=t}const a=new Int16Array(t);for(let M=0;M<e.rows;M++)for(let y=i[M];y<i[M+1];y++)a[y]=M;const r=[],c=new Int32Array(e.rows),l=new Int32Array(e.rows+1),d=new Uint16Array(e.rows*t);let f=0;for(let M=0;M<e.rows;M++){const y=Math.max(1,e.perRow+(e.perRowVar?(n()*3|0)-1:0)),b=[];let T=0;for(let E=0;E<y;E++){const A=1+(n()-.5)*2*e.widthJitter;b.push(A),T+=A}const _=new Int32Array(y+1);let S=0;for(let E=0;E<y;E++)_[E]=Math.round(S/T*t),S+=b[E];_[y]=t,r.push(_),c[M]=e.offset==="random"?Math.floor(n()*t):e.offset==="half"?(M&1)*Math.round(t/y/2):0;for(let E=0;E<y;E++)for(let A=_[E];A<_[E+1];A++)d[M*t+A]=E;l[M]=f,f+=y}l[e.rows]=f;const u=vt(t,n,6,6,3),h=e.warp*s*2.6,p=t/3|0,x=t/5|0,m=new Float32Array(t*t),g=new Int32Array(t*t),v=new Float32Array(t*t),w=new Float32Array(t*t);for(let M=0;M<t;M++)for(let y=0;y<t;y++){const b=M*t+y,T=(y+(u[b]-.5)*h|0)&o,_=(M+(u[(M+p&o)*t+(y+x&o)]-.5)*h|0)&o,S=a[_],E=T-c[S]&o,A=d[S*t+E],R=r[S],C=R[A],I=R[A+1],L=i[S],N=i[S+1],U=Math.min(E-C,I-1-E,_-L,N-1-_)+.5;m[b]=U,g[b]=l[S]+A,v[b]=(E-C+.5)/(I-C),w[b]=(_-L+.5)/(N-L)}return{d:m,id:g,fu:v,fv:w,total:f}}function p3(t,n){const e=t.S,o=t.s,s=f0(e,n,{rows:6,rowJitter:.3,perRow:3,perRowVar:!0,widthJitter:.45,offset:"random",warp:4.5}),i=vt(e,n,3,3,3),a=vt(e,n,10,10,3),r=vt(e,n,e/4,e/4,2),c=vt(e,n,4,4,3),l=new Float32Array(s.total),d=new Float32Array(s.total),f=new Float32Array(s.total),u=new Float32Array(s.total*2);for(let p=0;p<s.total;p++)l[p]=(.78+n()*.42)*(n()<.1?.8:1),d[p]=.5+n()*.3,f[p]=(n()-.5)*.1,u[p*2]=(n()-.5)*.16,u[p*2+1]=(n()-.5)*.16;const h=Math.max(2,5*o);for(let p=0;p<e*e;p++){const x=s.d[p],m=s.id[p],g=s.fu[p],v=s.fv[p],w=$t(h*.55,h*.55+8*o,x),M=1-$t(h*.45,h*1.25,x),y=Math.sin(Math.PI*g)*Math.sin(Math.PI*v),b=d[m]*(.82+.26*i[p])+y*.1+(g-.5)*u[m*2]+(v-.5)*u[m*2+1]+(a[p]-.5)*.16+(r[p]-.5)*.08;t.H[p]=co(.04+(r[p]-.5)*.05,b,w);let T=l[m]*(.88+.28*a[p])*(.9+.2*c[p])*(.84+.16*$t(h,h+12*o,x));T*=.94+.12*r[p];const _=1.04*(.82+.34*r[p]);T=co(T,_,M);const S=f[m]*(1-M);t.R[p]=T*(1+S+M*.03),t.G[p]=T*(1+S*.3),t.B[p]=T*(1-S*.9-M*.07),t.F[p]=co(.6+(a[p]-.5)*.3,.95,M),t.A[p]=1-M*.35}}function m3(t,n){const e=t.S,o=t.s,s=f0(e,n,{rows:16,rowJitter:0,perRow:6,perRowVar:!1,widthJitter:0,offset:"half",warp:.8}),i=vt(e,n,8,8,3),a=vt(e,n,e/4,e/4,2),r=vt(e,n,5,5,3),c=new Float32Array(s.total),l=new Float32Array(s.total),d=new Float32Array(s.total);for(let u=0;u<s.total;u++)c[u]=(.82+n()*.3)*(n()<.08?.72:1)*(n()<.05?1.12:1),l[u]=n()-.5,d[u]=.76+n()*.12;const f=Math.max(2,4*o);for(let u=0;u<e*e;u++){const h=s.d[u],p=s.id[u],x=$t(f*.5,f+2.6*o,h),m=1-$t(f*.4,f*1.15,h),g=(a[u]-.5)*.07;t.H[u]=co(.06+g*.4,d[p]+g+(i[u]-.5)*.06,x);let v=c[p]*(.9+.2*i[u])*(.92+.16*a[u])*(.94+.12*r[u]);v*=.9+.1*$t(f,f+6*o,h);const w=1.3*(.84+.32*a[u]);v=co(v,w,m);const M=l[p]*(1-m);t.R[u]=v*(1+M*.16+m*.04),t.G[u]=v*(1-M*.04+m*.14),t.B[u]=v*(1-M*.3+m*.2),t.F[u]=co(.74+(a[u]-.5)*.2,.96,m),t.A[u]=1-m*.4}}function g3(t,n){const e=t.S,o=t.s,s=f0(e,n,{rows:3,rowJitter:.04,perRow:3,perRowVar:!1,widthJitter:.05,offset:"random",warp:1.6}),i=vt(e,n,3,3,3),a=vt(e,n,12,12,3),r=vt(e,n,e/4,e/4,2),c=vt(e,n,5,5,4),l=new Float32Array(s.total),d=new Float32Array(s.total),f=new Float32Array(s.total),u=new Float32Array(s.total*2);for(let p=0;p<s.total;p++)l[p]=.86+n()*.26,d[p]=(n()-.5)*.08,f[p]=.62+n()*.16,u[p*2]=(n()-.5)*.1,u[p*2+1]=(n()-.5)*.1;const h=Math.max(2,4.5*o);for(let p=0;p<e*e;p++){const x=s.d[p],m=s.id[p],g=$t(h*.5,h+4*o,x),v=1-$t(h*.4,h*1.2,x),w=c[p],M=f[m]+(s.fu[p]-.5)*u[m*2]+(s.fv[p]-.5)*u[m*2+1]-w*.12+(a[p]-.5)*.08+(r[p]-.5)*.05;t.H[p]=co(.05+(r[p]-.5)*.06,M,g);let y=l[m]*(.9+.2*i[p])*(.9+.2*a[p])*(.95+.1*r[p]);y*=.88+.12*$t(h,h+8*o,x),y=co(y,.78*(.8+.4*r[p]),v);const b=d[m]*(1-v);t.R[p]=y*(1+b+v*.04),t.G[p]=y*(1+b*.2+v*.02),t.B[p]=y*(1-b*.8-v*.06),t.F[p]=co(.68+(w-.5)*.3,.96,v),t.A[p]=1-v*.4}}function v3(t,n){const e=t.S,o=t.s,s=t.mask,i=vt(e,n,3,3,5),a=vt(e,n,12,12,3),r=vt(e,n,e/2,e/2,1),c=vt(e,n,5,5,3),l=vt(e,n,6,6,4),d=vt(e,n,24,24,3),f=new Float32Array(e*e),u=(p,x,m,g,v)=>{for(let w=0;w<g;w++){m+=(n()-.5)*.5,p+=Math.cos(m),x+=Math.sin(m);const M=Math.round(p)&s,y=Math.round(x)&s,b=1-w/g*.5,T=y*e+M;f[T]<b&&(f[T]=b);const _=y*e+(M+1&s),S=(y+1&s)*e+M;f[_]=Math.max(f[_],b*.35),f[S]=Math.max(f[S],b*.35),v<2&&n()<.0035&&u(p,x,m+(n()<.5?-1:1)*(.5+n()*.6),g*.45,v+1)}},h=4;for(let p=0;p<h;p++)u(n()*e,n()*e,n()*Math.PI*2,(110+n()*150)*o,0);for(let p=0;p<e*e;p++){const x=$t(.69,.74,l[p]+(d[p]-.5)*.3),m=x*(1-$t(.8,1,x)),g=(r[p]-.5)*2+(n()-.5)*.9,v=f[p],w=.62+(c[p]-.5)*.18+g*.03-x*.2-v*.3+m*.04;t.H[p]=w;let M=(.9+.2*i[p])*(.94+.12*a[p])*(1+g*.035);M=co(M,M*.88,x),M*=1-v*.34,t.R[p]=M*(1+x*.01),t.G[p]=M*(1-x*.04),t.B[p]=M*(1-x*.12),t.F[p]=co(.84+(a[p]-.5)*.14,.98,x),t.A[p]=1-v*.3-x*.1}}function x3(t,n){const e=t.S,o=t.s,s=t.mask,i=10,a=new Int32Array(i+1);{const T=[];let _=0;for(let E=0;E<i;E++){const A=.88+n()*.24;T.push(A),_+=A}let S=0;for(let E=0;E<i;E++)a[E]=Math.round(S/_*e),S+=T[E];a[i]=e}const r=new Int16Array(e);for(let T=0;T<i;T++)for(let _=a[T];_<a[T+1];_++)r[_]=T;const c=new Int32Array(i),l=new Int32Array(i),d=new Float32Array(i*2),f=new Float32Array(i*2),u=new Float32Array(i*2),h=new Float32Array(i*2);for(let T=0;T<i;T++){c[T]=Math.floor(n()*e),l[T]=c[T]+Math.round(e*(.38+n()*.24))&s;for(let _=0;_<2;_++)d[T*2+_]=.8+n()*.4,f[T*2+_]=n()-.5,u[T*2+_]=2.5+n()*3.5,h[T*2+_]=n()*6.28}const p=vt(e,n,2,32,3),x=vt(e,n,6,6,3),m=vt(e,n,12,e/2,1),g=vt(e,n,4,4,3),v=new Float32Array(e*e),w=[];for(let T=0;T<3;T++)w.push({x:n()*e,y:n()*e,r:(13+n()*9)*o});for(const T of w){const _=Math.ceil(T.r*2.6);for(let S=-_;S<=_;S++)for(let E=-_;E<=_;E++){const A=Math.sqrt(E/1.7*(E/1.7)+S*S)/T.r;if(A>2.6)continue;const R=(Math.round(T.y+S)&s)*e+(Math.round(T.x+E)&s);v[R]+=Math.sign(S||1)*10*o*Math.exp(-A*A*.9)*(A<.2?A/.2:1)}}const M=new Float32Array(e*e).fill(1),y=new Float32Array(e*e);for(const T of w){const _=Math.ceil(T.r*1.2);for(let S=-_;S<=_;S++)for(let E=-_;E<=_;E++){const A=Math.sqrt(E/1.7*(E/1.7)+S*S)/T.r;if(A>=1.1)continue;const R=(Math.round(T.y+S)&s)*e+(Math.round(T.x+E)&s),C=.5+.5*Math.cos(A*16),I=1-$t(.6,1.1,A);M[R]*=1-I*(.5-.18*C),y[R]+=I*(.06+.04*C)-$t(.2,.5,A)*(1-$t(.5,1,A))*.03}}const b=Math.PI*2;for(let T=0;T<e;T++){const _=r[T],S=a[_],E=a[_+1]-S,A=T-S,R=Math.min(A,E-1-A)+.5,C=1-$t(.3*o,2.8*o,R);for(let I=0;I<e;I++){const L=T*e+I,U=(T+(v[L]|0)&s)*e+I,F=Math.abs(I-c[_]),z=Math.abs(I-l[_]),G=Math.min(F,e-F,z,e-z)+.5,O=1-$t(.3*o,2.2*o,G),B=(I-c[_]&s)<(l[_]-c[_]&s)?0:1,J=_*2+B,ue=p[U],xe=x[U],j=.5+.5*Math.sin(((A+v[L])/E*u[J]+xe*1.7+ue*1.1)*b+h[J]),ie=$t(.56,.78,m[U]);let ne=d[J]*(.78+.3*ue+.2*j)*(.92+.16*g[L])*M[L];ne*=1-ie*.22;const ye=Math.max(C,O);ne*=1-ye*.55;const Ie=f[J];t.R[L]=ne*(1+Ie*.12),t.G[L]=ne*(1+Ie*.03),t.B[L]=ne*(1-Ie*.16),t.H[L]=(.72+j*.05-ie*.05+(ue-.5)*.04+y[L])*(1-ye*.85),t.F[L]=.7+(ue-.5)*.16+ie*.16+ye*.2,t.A[L]=1-ye*.5-ie*.12}}}function _3(t,n){const e=t.S,o=t.s,s=t.mask,i=6,a=5,r=vt(e,n,4,4,2),c=vt(e,n,10,10,3),l=vt(e,n,e/4,e/4,2),d=vt(e,n,4,4,4),f=new Float32Array(i*a),u=new Float32Array(i*a),h=new Float32Array(i*a),p=new Float32Array(i*a);for(let g=0;g<f.length;g++)f[g]=.8+n()*.36,u[g]=n()-.5,h[g]=(n()-.5)*.14,p[g]=n();const x=2.4*o*2.6,m=Math.PI;for(let g=0;g<e;g++)for(let v=0;v<e;v++){const w=g*e+v,M=v+(r[w]-.5)*x,b=(g+(r[(g+83&s)*e+(v+171&s)]-.5)*x)/e*a;let T=Math.floor(b);const _=b-T;T=(T%a+a)%a;const S=M/e*i+.5*(T&1),E=Math.floor(S),A=S-E,R=(E%i+i)%i,C=T*i+R,I=Math.sqrt(Math.sin(m*A)),L=.5+.5*_*(.4+.6*_),N=1-$t(.9,1,_)*.12,U=I*L*N*.9+h[C]*(_-.5)+(l[w]-.5)*.04+(c[w]-.5)*.05;t.H[w]=U;const F=$t(0,.22,_),z=1-$t(.02,.18,Math.min(A,1-A));let G=f[C]*(.88+.12*F)*(.92+.16*c[w])*(.94+.12*l[w])*(1-.18*$t(.55,.8,d[w]));G*=1+.12*$t(.93,1,_),G*=1-z*.22;const O=u[C];t.R[w]=G*(1+O*.1),t.G[w]=G*(1-O*.01),t.B[w]=G*(1-O*.14),t.F[w]=.62+p[C]*.16+(l[w]-.5)*.1+z*.2,t.A[w]=(.6+.4*F)*(1-z*.25)}}function M3(t,n){const e=t.S,o=t.s,s=t.mask,i=vt(e,n,2,e/8,3),a=vt(e,n,1,e/4,2),r=vt(e,n,3,3,3),c=vt(e,n,4,4,5),l=vt(e,n,24,24,3),d=vt(e,n,e/2,e/2,1),f=new Float32Array(e*e),u=new Float32Array(e*e),h=Math.round(70*o*Math.max(1,o));for(let p=0;p<h;p++){let x=n()*e,m=n()*e;const g=n()<.7?(n()-.5)*.5:n()*Math.PI*2,v=(14+n()*n()*130)*o,w=n()<.15,M=.3+n()*.5,y=Math.cos(g),b=Math.sin(g),T=w?u:f;for(let _=0;_<v;_+=.6){x+=y*.6,m+=b*.6;const S=(Math.round(m)&s)*e+(Math.round(x)&s),E=1-Math.abs(_/v-.5)*1.1;T[S]<M*E&&(T[S]=M*E)}}for(let p=0;p<e*e;p++){const x=(i[p]-.5)*1.4+(a[p]-.5)*.8,m=$t(.56,.8,c[p]+(l[p]-.5)*.28)*(.6+.4*l[p]),g=f[p],v=u[p];let w=(1+x*.2)*(.94+.12*r[p])*(1+(d[p]-.5)*.06);w*=1+g*.38-v*.3,w=co(w,w*.8,m),t.R[p]=w*(1+m*.07),t.G[p]=w*(1-m*0),t.B[p]=w*(1-m*.14),t.H[p]=.6+x*.03+(r[p]-.5)*.12-g*.12-v*.18+m*.04,t.F[p]=.5+x*.14+g*.18+m*.42+(d[p]-.5)*.06,t.A[p]=1-m*.12-v*.1}}function w3(t,n){const e=t.S,o=t.s,s=vt(e,n,3,3,4),i=vt(e,n,14,14,3),a=vt(e,n,e/2,e/2,1),r=vt(e,n,10,2,3),c=new Float32Array(e*e),l=new Float32Array(e*e),d=Math.round(260*o*o);for(let p=0;p<d;p++){const x=(.9+n()*n()*3.6)*o,m=.4+n()*.6;ol(e,n()*e,n()*e,Math.max(1.2,x),(g,v)=>{const w=m*Math.min(1,v*1.8);c[g]<w&&(c[g]=w),l[g]=Math.max(l[g],w)})}const f=e/2,u=new Float32Array(e*e);for(let p=0;p<2;p++)for(let x=0;x<2;x++)for(const[m,g]of[[.25,.25],[.75,.25],[.25,.75],[.75,.75]])ol(e,x*f+m*f,p*f+g*f,5*o,(v,w)=>{const M=Math.min(1,w*1.6);u[v]<M&&(u[v]=M)});const h=[1,.96,1.04,.98];for(let p=0;p<e;p++){const x=Math.min(p%f,f-p%f);for(let m=0;m<e;m++){const g=p*e+m,v=Math.min(m%f,f-m%f),w=1-$t(.2*o,2.4*o,Math.min(v,x)+.5),M=h[(m>=f?1:0)+(p>=f?2:0)],y=(a[g]-.5)*2,b=c[g],T=u[g],_=.68+(i[g]-.5)*.1+y*.035-b*.5-w*.45-T*.55;t.H[g]=_;let S=M*(.9+.2*s[g])*(.94+.12*i[g])*(.86+.28*r[g])*(1+y*.05);S*=1-b*.42-w*.2-T*.5,t.R[g]=S*1.01,t.G[g]=S,t.B[g]=S*.985,t.F[g]=.8+(i[g]-.5)*.18+b*.12,t.A[g]=1-b*.5-w*.25-T*.5}}}const b3={masonry:{normal:3.2,ao:2.4,aoRadius:9},brick:{normal:3,ao:2.2,aoRadius:6},plaster:{normal:2,ao:1.4,aoRadius:5},paving:{normal:3,ao:2.2,aoRadius:8},wood:{normal:2.2,ao:1.8,aoRadius:4},tiles:{normal:4.6,ao:2.4,aoRadius:9},metal:{normal:1.6,ao:1.2,aoRadius:3},concrete:{normal:2.2,ao:1.8,aoRadius:5}};function S3(t,n,e){const o=new Float32Array(n*n),s=new Float32Array(n*n),i=n-1,r=1/(2*e+1);for(let c=0;c<n;c++){const l=c*n;let d=0;for(let f=-e;f<=e;f++)d+=t[l+(f&i)];for(let f=0;f<n;f++)o[l+f]=d*r,d+=t[l+(f+e+1&i)]-t[l+(f-e&i)]}for(let c=0;c<n;c++){let l=0;for(let d=-e;d<=e;d++)l+=o[(d&i)*n+c];for(let d=0;d<n;d++)s[d*n+c]=l*r,l+=o[(d+e+1&i)*n+c]-o[(d-e&i)*n+c]}return s}function y3(t,n){const e=t.S,o=e*e,s=b3[n],i=t.mask,a=M=>M<=0?0:M>=1?255:M*255+.5|0;let r=0;for(let M=0;M<o;M++)r+=t.R[M]*.3+t.G[M]*.59+t.B[M]*.11;const c=tf/(r/o),l=S3(t.H,e,Math.max(2,Math.round(s.aoRadius*t.s))),d=new Float32Array(o);let f=0;for(let M=0;M<o;M++){const y=l[M]-t.H[M],b=u3(1-Math.max(0,y)*s.ao*3.2+Math.max(0,-y)*.25)*t.A[M];d[M]=b<.35?.35:b,f+=d[M]}const u=f/o,h=Math.log(nf)/Math.log(Math.min(.99,Math.max(.3,u))),p=new Uint8Array(1025);for(let M=0;M<=1024;M++)p[M]=a(Math.pow(M/1024,h));const x=new Uint8Array(o*4),m=new Uint8Array(o*4),g=new Uint8Array(o),v=t.H,w=s.normal;for(let M=0;M<e;M++){const y=(M-1&i)*e,b=M*e,T=(M+1&i)*e;for(let _=0;_<e;_++){const S=_-1&i,E=_+1&i,A=v[y+E]+2*v[b+E]+v[T+E]-v[y+S]-2*v[b+S]-v[T+S],R=v[T+S]+2*v[T+_]+v[T+E]-v[y+S]-2*v[y+_]-v[y+E],C=-A*w/8,I=-R*w/8,L=1/Math.sqrt(C*C+I*I+1),N=b+_,U=N*4;x[U]=a(t.R[N]*c),x[U+1]=a(t.G[N]*c),x[U+2]=a(t.B[N]*c),x[U+3]=p[d[N]*1024+.5|0],m[U]=a(C*L*.5+.5),m[U+1]=a(I*L*.5+.5),m[U+2]=a(L*.5+.5),m[U+3]=a(t.F[N]),g[N]=a(v[N])}}return{size:e,albedo:x,normal:m,height:g}}const T3={masonry:p3,brick:m3,plaster:v3,paving:g3,wood:x3,tiles:_3,metal:M3,concrete:w3};function E3(t,n,e){if(n<64||(n&n-1)!==0)throw new Error("size must be a power of two >= 64");const o=f3(e*7919+ef(t)*104729+1),s=h3(n);return T3[t](s,o),y3(s,t)}const A3=20260616;let u0="high",vo;function R3(t){vo||(u0=t)}function P3(){return vo?vo.quality:u0}function sl(t,n,e){const o=n*n*4,s=new Uint8Array(o*t.length);t.forEach((a,r)=>s.set(a,r*o));const i=new za(s,n,n,t.length);return i.format=kn,i.type=Rn,i.colorSpace=io,i.wrapS=i.wrapT=Hn,i.magFilter=en,i.minFilter=Yn,i.generateMipmaps=!0,i.anisotropy=e,i.userData.shared=!0,i.needsUpdate=!0,i}function sf(t=u0,n=4){if(vo)return vo;const e=t==="low"?256:512,o=typeof performance<"u"?performance.now():Date.now(),s=[],i=[];for(const l of d0){const d=E3(l,e,A3);s.push(d.albedo),i.push(d.normal)}const a=sl(s,e,n),r=sl(i,e,n),c=(typeof performance<"u"?performance.now():Date.now())-o;return vo={quality:t,size:e,albedo:a,normal:r,generationMs:c,dispose(){a.dispose(),r.dispose()}},vo}function C3(){vo==null||vo.dispose(),vo=void 0}const ai="aKitBase";function Sa(t){var s;if(t.getAttribute(ai))return;const n=t.getAttribute("position");if(!n)return;t.boundingBox||t.computeBoundingBox();const e=(s=t.boundingBox)==null?void 0:s.min.y;if(e===void 0||!Number.isFinite(e))return;const o=new Float32Array(n.count*2);for(let i=0;i<n.count;i++)o[i*2]=e,o[i*2+1]=1;t.setAttribute(ai,new lt(o,2))}function af(t){return t.userData.kitKind!==void 0}const D3={masonry:{grime:1,streak:.8,wear:.85,edgeRough:.08},brick:{grime:1,streak:.7,wear:.8,edgeRough:.06},plaster:{grime:1,streak:1,wear:.55,edgeRough:.1},paving:{grime:.5,streak:0,wear:.7,edgeRough:.06},wood:{grime:.7,streak:.4,wear:.9,edgeRough:.06},tiles:{grime:.35,streak:.2,wear:.6,edgeRough:.06},metal:{grime:.4,streak:.35,wear:1,edgeRough:-.28},concrete:{grime:1,streak:1,wear:.5,edgeRough:.06}},_s=t=>t.toFixed(3),I3=`
attribute vec2 aKitBase;
varying vec3 vKitWorld;
varying float vKitH;
`,L3=`
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
`,N3=`
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
`;function k3(t,n){const e=ef(t).toFixed(1),s=`
  vec3 kN = inverseTransformDirection(normal, viewMatrix);
  vec3 kAbs = abs(kN);
  float kDist = length(vViewPosition);
  vec3 kP = vKitWorld * ${(1/d3[t]).toFixed(5)};
`,i=n?`
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
`;return s+i}function U3(t,n){const e=D3[t];return`
{
${k3(t,n)}
  // edge curvature (1/m) = normal change rate / world position change rate, distance independent; fades out far away
  float kCurv = length(fwidth(kN)) / max(length(fwidth(vKitWorld)), 1e-5);
  float kEdge = smoothstep(7.0, 22.0, kCurv) * (1.0 - smoothstep(18.0, 60.0, kDist)) * uKitWear * ${_s(e.wear)};

  // color: modulation around the material color; AO is applied after aomap_fragment
  diffuseColor.rgb *= kA.rgb * ${_s(1/tf)};
  kAo = kA.a;
  roughnessFactor = clamp(roughnessFactor * kRg * ${_s(1/of)}, 0.04, 1.0);

  // normal: relaxes to the geometric normal with distance
  float kNF = 1.0 - 0.7 * smoothstep(30.0, 100.0, kDist);
  normal = normalize((viewMatrix * vec4(normalize(mix(kN, kBn, kNF)), 0.0)).xyz);

  // wall-base grime: vertical faces within 0-1.2 m of the object's lowest point get darker and browner, broken up by noise
  float kWall = 1.0 - smoothstep(0.55, 0.88, kAbs.y);
  float kHu = vKitWorld.x * kAbs.z + vKitWorld.z * kAbs.x;
  float kBreak = kNoise(vec2(kHu * 2.3, vKitWorld.y * 1.1 + 3.0));
  float kG = (1.0 - smoothstep(0.0, 1.15 * (0.45 + 0.9 * kBreak), vKitH)) * kWall * uKitGrime * ${_s(e.grime)};
  kG = clamp(kG, 0.0, 1.0);
  diffuseColor.rgb *= mix(vec3(1.0), vec3(0.5, 0.43, 0.35), kG * 0.8);
  roughnessFactor = mix(roughnessFactor, max(roughnessFactor, 0.9), kG * 0.6);
  kAo *= 1.0 - 0.25 * kG * (1.0 - smoothstep(0.0, 0.35, vKitH));
${n||e.streak<=0?"":`
  // vertical rain streaks
  float kS1 = kNoise(vec2(kHu * 8.0, vKitWorld.y * 0.5));
  float kS2 = kNoise(vec2(kHu * 1.4 + 7.0, vKitWorld.y * 0.12));
  float kStr = smoothstep(0.64, 0.9, kS1) * smoothstep(0.4, 0.75, kS2) * kWall * uKitGrime * ${_s(e.streak)} * smoothstep(0.3, 1.6, vKitH);
  diffuseColor.rgb *= 1.0 - kStr * vec3(0.26, 0.24, 0.2);
`}
  // edge wear: brighter, less saturated exposed material
  float kLum = dot(diffuseColor.rgb, vec3(0.299, 0.587, 0.114));
  vec3 kChip = mix(diffuseColor.rgb, vec3(kLum), 0.35) * 1.28 + 0.012;
  diffuseColor.rgb = mix(diffuseColor.rgb, kChip, kEdge * 0.85);
  roughnessFactor = clamp(roughnessFactor + kEdge * ${_s(e.edgeRough)}, 0.04, 1.0);
}
`}const F3=`
{
  // normalized by the texture's mean AO so flat areas keep their brightness and only cavities darken
  float kAoN = min(kAo * ${_s(1/nf)}, 1.06);
  reflectedLight.indirectDiffuse *= kAoN;
  reflectedLight.indirectSpecular *= mix(1.0, kAoN, 0.6);
  reflectedLight.directDiffuse *= mix(1.0, kAoN, 0.35);
}
`;function Nn(t,n,e={}){const o=t.userData.kitUniforms;if(o){e.grime!==void 0&&(o.grime.value=e.grime),e.wear!==void 0&&(o.wear.value=e.wear);return}const s={grime:{value:e.grime??1},wear:{value:e.wear??1}};t.userData.kitUniforms=s,t.userData.kitKind=n;const i=t.onBeforeCompile,a=t.onBeforeRender,r=t.customProgramCacheKey();t.onBeforeCompile=(c,l)=>{i.call(t,c,l);const d=sf(),f=d.quality==="low";c.uniforms.uKitAlb={value:d.albedo},c.uniforms.uKitNrm={value:d.normal},c.uniforms.uKitGrime=s.grime,c.uniforms.uKitWear=s.wear,c.vertexShader=c.vertexShader.replace("#include <common>",`#include <common>
${I3}`).replace("#include <begin_vertex>",`#include <begin_vertex>
${L3}`),c.fragmentShader=c.fragmentShader.replace("#include <common>",`#include <common>
${N3}`).replace("#include <color_fragment>",`#include <color_fragment>
float kAo = 1.0;`).replace("#include <normal_fragment_maps>",`#include <normal_fragment_maps>
${U3(n,f)}`).replace("#include <aomap_fragment>",`#include <aomap_fragment>
${F3}`)},t.onBeforeRender=(c,l,d,f,u,h)=>{a.call(t,c,l,d,f,u,h),f.getAttribute(ai)||Sa(f)},t.customProgramCacheKey=()=>`kit-v2-${n}-${P3()}+${r}`,t.needsUpdate=!0}const il={h:0,s:0,l:0};function O3(t,n){if(t.type!=="MeshStandardMaterial"||t.userData.shared||t.map||t.normalMap||t.bumpMap||t.roughnessMap||t.metalnessMap||t.aoMap||t.alphaMap||t.emissiveMap||t.displacementMap||t.lightMap||t.vertexColors||t.transparent||t.opacity<1||t.alphaTest>0||t.wireframe)return null;const e=t.emissive;if(t.emissiveIntensity*Math.max(e.r,e.g,e.b)>.04)return null;const o=n??t.userData.surfaceKind;if(o&&d0.includes(o))return o;if(t.metalness>.5)return"metal";t.color.getHSL(il,yt);const{h:s,s:i,l:a}=il;if(a>.86||a<.1||i>.62)return null;if(i<.08)return a>=.62?"concrete":a>=.18?"masonry":null;if(!(s<.17||s>=.95))return s>=.17&&s<.46&&i>.1||s>=.46&&i>.15?null:a>=.62?"concrete":a>=.18?"masonry":null;if(t.roughness>=.95&&i>=.2||t.roughness>=.99&&i>=.08)return null;if(a>=.6)return"plaster";if(i>.5&&s>=.065&&s<.17)return null;if(i>=.28&&(s<.065||s>=.95)){if(a>=.42)return"tiles";if(s<.04||s>=.95)return"brick"}return i>=.1?a>=.14?"wood":null:a>=.18?"masonry":null}function z3(t,n=5.5){t.onBeforeCompile=e=>{e.vertexShader=`varying vec3 vCobWorld;
`+e.vertexShader.replace("#include <begin_vertex>",`#include <begin_vertex>
       vCobWorld = (modelMatrix * vec4(transformed, 1.0)).xyz;`),e.fragmentShader=`
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
         {
           vec3 v = cVor(vCobWorld.xz * ${n.toFixed(2)});
           float edge = v.y - v.x;
           cGap = 1.0 - smoothstep(0.03, 0.16, edge);
           diffuseColor.rgb *= (0.78 + v.z * 0.42) * (1.0 - cGap * 0.5);
         }`).replace("#include <roughnessmap_fragment>",`#include <roughnessmap_fragment>
 roughnessFactor = mix(roughnessFactor, 1.0, cGap);`).replace("#include <normal_fragment_maps>",`#include <normal_fragment_maps>
         {
           float cFade = 1.0 - smoothstep(20.0, 70.0, length(vViewPosition));
           if (cFade > 0.01) {
             vec2 q = vCobWorld.xz * ${n.toFixed(2)};
             const float cE = 0.03;
             float h0 = cDome(q);
             vec2 gr = vec2(cDome(q + vec2(cE, 0.0)) - h0, cDome(q + vec2(0.0, cE)) - h0) / cE;
             vec3 gv = mat3(viewMatrix) * vec3(gr.x, 0.0, gr.y);
             gv -= normal * dot(gv, normal);
             normal = normalize(normal - gv * 0.09 * cFade);
           }
         }`)},t.customProgramCacheKey=()=>`cobble-${n}`,t.needsUpdate=!0}const al=new WeakSet,B3=`
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
`;function G3(t,n){for(let e=t;e;e=e.parent){if(e.name==="scene-person"||e.userData.noSurface)return!0;if(e===n)break}return!1}function rf(t,n=1){t.traverse(e=>{const o=e;if(!o.isMesh)return;const s=G3(o,t),i=Array.isArray(o.material)?o.material:[o.material];for(const a of i){if(a.type!=="MeshStandardMaterial")continue;const r=a;if(af(r)){Sa(o.geometry);continue}if(al.has(a)||r.map||r.normalMap||r.bumpMap||r.vertexColors||r.transparent||r.emissiveIntensity>.25&&r.emissive.getHex()!==0)continue;const c=s?null:O3(r,o.userData.surfaceKind??void 0);if(c){Nn(r,c,{grime:n,wear:n}),Sa(o.geometry);continue}al.add(a);const l=r.onBeforeCompile;r.onBeforeCompile=(f,u)=>{l==null||l.call(r,f,u),f.vertexShader=`varying vec3 vGrainWorld;
`+f.vertexShader.replace("#include <begin_vertex>",`#include <begin_vertex>
           vec4 gLocal = vec4(transformed, 1.0);
           #ifdef USE_INSTANCING
             gLocal = instanceMatrix * gLocal;
           #endif
           vGrainWorld = (modelMatrix * gLocal).xyz;`),f.fragmentShader=B3+f.fragmentShader.replace("#include <color_fragment>",`#include <color_fragment>
             float gTone = gGrain(vGrainWorld);
             diffuseColor.rgb *= 1.0 + (gTone - 0.5) * ${(.1*n).toFixed(2)};`).replace("#include <roughnessmap_fragment>",`#include <roughnessmap_fragment>
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
               normal = normalize(normal - gGradV * ${(.05*n).toFixed(3)} * gFade);
             }`)};const d=r.customProgramCacheKey();r.customProgramCacheKey=()=>`grain+${d}`,r.needsUpdate=!0}})}function h0(t,n){return new bn({color:t,emissive:t,emissiveIntensity:n,metalness:.15,roughness:.08,clearcoat:1,clearcoatRoughness:.05,reflectivity:1,transparent:!0,opacity:.92,side:qe})}function Xo(t,n=.82){return new ge({color:t,roughness:n,metalness:.06,envMapIntensity:.4})}function H3(t){const e=document.createElement("canvas");e.width=64,e.height=64;const o=e.getContext("2d"),s=o.createRadialGradient(64/2,64/2,0,64/2,64/2,64/2);return s.addColorStop(0,t),s.addColorStop(.4,"rgba(255,220,140,0.35)"),s.addColorStop(1,"rgba(0,0,0,0)"),o.fillStyle=s,o.fillRect(0,0,64,64),new Zt(e)}function V3(){return new ge({color:4871528,roughness:.45,metalness:.85})}function W3(t){return new bn({color:t,emissive:t,emissiveIntensity:1.4,roughness:.04,metalness:0,transparent:!0,opacity:.82,clearcoat:1})}const Do={broadleaf:0,broadleafDark:1,conifer:2,shrub:3};function X3(t){const n=t%2,e=Math.floor(t/2);return[n*.5,e*.5,n*.5+.5,e*.5+.5]}function cf(t){let n=t>>>0;return()=>{n=n+1831565813>>>0;let e=n;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}}function rs(t,n,e){let o=Math.imul(t,374761393)+Math.imul(n,668265263)+Math.imul(e,1442695041)|0;return o=Math.imul(o^o>>>13,1274126177),o^=o>>>16,(o>>>0)/4294967296}function ya(t){return t*t*(3-2*t)}function no(t,n,e){const o=Math.min(1,Math.max(0,(e-t)/(n-t)));return o*o*(3-2*o)}function rl(t,n,e){const o=Math.floor(t),s=Math.floor(n),i=ya(t-o),a=ya(n-s),r=rs(o,s,e),c=rs(o+1,s,e),l=rs(o,s+1,e),d=rs(o+1,s+1,e);return r+(c-r)*i+(l-r)*a+(r-c-l+d)*i*a}function Fi(t,n){return(t%n+n)%n}const cl=new Map;function Ln(t,n,e,o,s){const i=(e*1024+o)*8192+(s&8191);let a=cl.get(i);if(!a){a=new Float32Array(e*o);for(let w=0;w<o;w++)for(let M=0;M<e;M++)a[w*e+M]=rs(M,w,s);cl.set(i,a)}const r=Math.floor(t),c=Math.floor(n),l=ya(t-r),d=ya(n-c),f=Fi(r,e),u=f+1===e?0:f+1,h=Fi(c,o)*e,p=(h+e)%(e*o),x=a[h+f],m=a[h+u],g=a[p+f],v=a[p+u];return x+(m-x)*l+(g-x)*d+(x-m-g+v)*l*d}let es=0,ts=0,ns=0;function lf(t,n,e){t=t-Math.floor(t);const o=Math.floor(t*6),s=t*6-o,i=e*(1-n),a=e*(1-s*n),r=e*(1-(1-s)*n);switch(o%6){case 0:es=e,ts=r,ns=i;break;case 1:es=a,ts=e,ns=i;break;case 2:es=i,ts=e,ns=r;break;case 3:es=i,ts=a,ns=e;break;case 4:es=r,ts=i,ns=e;break;default:es=e,ts=i,ns=a;break}}function K3(t){const n=t*t;return{size:t,r:new Float32Array(n),g:new Float32Array(n),b:new Float32Array(n),a:new Float32Array(n),h:new Float32Array(n).fill(.5)}}function df(t,n,e,o,s,i,a){const r=t.a[n];if(r<=0){t.r[n]=e,t.g[n]=o,t.b[n]=s,t.a[n]=i,t.h[n]=a;return}const c=i+r*(1-i),l=i/c,d=1-l;t.r[n]=t.r[n]*d+e*l,t.g[n]=t.g[n]*d+o*l,t.b[n]=t.b[n]*d+s*l,t.a[n]=c,t.h[n]=t.h[n]*d+a*l}function Ta(t,n,e,o,s,i,a,r,c,l,d,f,u,h){const{B:p,ox:x,oy:m,S:g,m:v}=t,w=Math.max(i,a)+1,M=Math.max(v,Math.floor(Math.min(n,o)-w)),y=Math.min(g-v-1,Math.ceil(Math.max(n,o)+w)),b=Math.max(v,Math.floor(Math.min(e,s)-w)),T=Math.min(g-v-1,Math.ceil(Math.max(e,s)+w)),_=o-n,S=s-e,E=_*_+S*S||1e-6;for(let A=b;A<=T;A++){const R=(m+A)*p.size+x;for(let C=M;C<=y;C++){const I=C+.5-n,L=A+.5-e;let N=(I*_+L*S)/E;N=N<0?0:N>1?1:N;const U=I-_*N,F=L-S*N,z=i+(a-i)*N,G=U*U+F*F,O=z+1;if(G>O*O)continue;const B=Math.sqrt(G)-z,J=B<=-.5?1:B>=.5?0:.5-B;if(J<=.003)continue;const ue=1-Math.min(1,Math.abs(B+z*.5)/(z+.5))*.35;lf(r+(d-r)*N,c+(f-c)*N,(l+(u-l)*N)*ue*(.92+.16*h)),df(p,R+C,es,ts,ns,J,.62-Math.min(1,Math.abs(B)/(z+.5))*.2)}}}function q3(t,n){const{B:e,ox:o,oy:s,S:i,m:a}=t,r=Math.cos(n.ang),c=Math.sin(n.ang),l=n.x,d=n.y,f=l+r*n.len,u=d+c*n.len,h=n.wid+2,p=Math.max(a,Math.floor(Math.min(l,f)-h)),x=Math.min(i-a-1,Math.ceil(Math.max(l,f)+h)),m=Math.max(a,Math.floor(Math.min(d,u)-h)),g=Math.min(i-a-1,Math.ceil(Math.max(d,u)+h)),v=Math.max(5,Math.round(n.len/11)),w=1/n.len,M=.5+n.len*.0035;for(let y=m;y<=g;y++){const b=(s+y)*e.size+o;for(let T=p;T<=x;T++){const _=T+.5-l,S=y+.5-d,E=_*r+S*c;if(E<0||E>n.len)continue;const A=E*w,R=-_*c+S*r,C=R<0?-R:R;let I=n.wid*Math.pow(Math.max(0,Math.sin(Math.PI*Math.pow(A,n.shapeExp))),.78);if(I*=1+n.serr*(Math.abs(Math.sin(A*v*Math.PI))-.5),I<.4)continue;const L=I-C+.5;if(L<=.003)continue;const N=L>=1?1:L,U=C/I,F=rl(T*.045,y*.045,n.seed),z=rl(T*.19,y*.19,n.seed+5);let G=n.val*(.8+.3*A)*(.86+.26*F)*(.94+.1*z);G*=1-.24*no(.76,1,U),G*=1+.12*n.fold*(R/I);let O=n.sat*(1-.18*A);const B=n.hue-.028*A+.03*(F-.5),J=no(M+.9,M*.4,C)*(1-.5*A),ue=(E-C*.82)/n.veinGap,xe=ue-Math.floor(ue),j=(xe<.5?xe:1-xe)*n.veinGap*.8,ie=no(1.3,.25,j)*Math.pow(Math.max(0,1-U),.7)*no(.06,.2,A)*no(1,.8,A);let ne=Math.max(J,ie*.85);n.back&&(G*=1.16,O*=.62,ne*=1.35),G*=1+.3*ne,O*=1-.38*ne,lf(B,O,Math.min(1,G));const ye=.55+.2*(1-U*U)*(n.back?.6:1)-ne*(n.back?-.1:.16);df(e,b+T,es,ts,ns,N,ye)}}}function ff(t,n,e,o,s,i,a){const r=n+Math.max(2,t*.012),c=t-2*r,l=Math.max(1e-6,s-e),d=Math.max(1e-6,i-o),f=Math.min(c/l,c/d,a);return{scale:f,ox:t/2-(e+s)/2*f,oy:t/2-(o+i)/2*f}}function vr(t,n){const e=cf(t.seed),o=t.S,s=[],i=[],a=n.dark?.285+e()*.03:.235+e()*.04,r=(m,g,v,w,M)=>{const y=a+(e()-.5)*(n.dark?.04:.09)+(e()>.88&&!n.dark?-.04:0),b=(n.dark?.5:.42)+e()*.12,T=(n.dark?.27:n.round?.5:.46)+e()*.14;s.push({leaf:{x:m.x,y:m.y,ang:g,len:v,wid:v*w,hue:y,sat:b,val:T,serr:n.round?.04:.08,shapeExp:n.round?.8+e()*.2:.62+e()*.25,back:e()>.74,fold:e()*2-1,veinGap:Math.max(6,v*(n.round?.2:.16)),seed:Math.floor(e()*99999),petiole:M}})};if(n.round){const m=5+Math.floor(e()*2);for(let g=0;g<m;g++){const v=Math.PI/2+(g-(m-1)/2)*.5+(e()-.5)*.15,w=.55+e()*.25,M=(e()-.5)*.5,y=[],b=A=>v+M*A;let T=0,_=0;for(let A=0;A<=8;A++){y.push({x:T,y:_});const R=b(A/8);T+=Math.cos(R)*(w/8),_+=Math.sin(R)*(w/8)}i.push({pts:y,r0:.01});const S=3+Math.floor(e()*3);for(let A=0;A<S;A++){const R=.3+.7*(A/S)+e()*.05,C=Math.min(8,Math.floor(R*8)),I=y[C],L=A%2===0?1:-1;r(I,b(R)+L*(.7+e()*.5),(.2+e()*.12)*(1.1-.3*R),.55+e()*.12,.012)}const E=y[8];r(E,b(1)+(e()-.5)*.4,.26+e()*.08,.6,0)}}else{const m=8+Math.floor(e()*7),g=(e()-.5)*.35,v=[];for(let y=0;y<=12;y++){const b=y/12;v.push({x:g*b*b,y:b})}i.push({pts:v,r0:.014});const w=y=>({p:{x:g*y*y,y},dir:Math.atan2(1,2*g*y)});for(let y=0;y<m;y++){const b=.2+.72*(y/Math.max(1,m-1))+(e()-.5)*.03,{p:T,dir:_}=w(b),S=y%2===0?1:-1,E=.75+e()*.5+(1-b)*.25,A=(.4-.1*b)*(.8+e()*.34);r(T,_+S*E,A,.3+e()*.12,.03)}const M=w(1);r(M.p,M.dir+(e()-.5)*.2,.42*(.9+e()*.2),.34,0)}let c=1/0,l=1/0,d=-1/0,f=-1/0;const u=(m,g)=>{m<c&&(c=m),m>d&&(d=m),g<l&&(l=g),g>f&&(f=g)};for(const{leaf:m}of s){const g=Math.cos(m.ang),v=Math.sin(m.ang);u(m.x,m.y),u(m.x+g*m.len,m.y+v*m.len);for(const w of[.3,.45])for(const M of[-1,1])u(m.x+g*m.len*w-v*m.wid*M,m.y+v*m.len*w+g*m.wid*M)}for(const m of i)for(const g of m.pts)u(g.x,g.y);u(0,-.04);const h=ff(o,t.m,c,l,d,f,o*.97),p=m=>({x:m.x*h.scale+h.ox,y:m.y*h.scale+h.oy});for(const m of i)for(let g=0;g<m.pts.length-1;g++){const v=p(m.pts[g]),w=p(m.pts[g+1]),M=g/(m.pts.length-1),y=Math.max(1.1,m.r0*h.scale*(1-M*.55)),b=Math.max(.8,m.r0*h.scale*(1-(M+1/(m.pts.length-1))*.55));Ta(t,v.x,v.y,w.x,w.y,y,b,.085,.45,.28,.1,.4,.36,e())}const x=s.map((m,g)=>g).sort(()=>e()-.5);for(const m of x){const g=s[m].leaf,v=p({x:g.x,y:g.y}),w=g.len*h.scale,M={...g,x:v.x,y:v.y,len:w,wid:g.wid*h.scale};if(g.petiole>0){const y=g.petiole*h.scale;Ta(t,v.x,v.y,v.x+Math.cos(g.ang)*y,v.y+Math.sin(g.ang)*y,1.1,.8,.11,.42,.3,.14,.4,.4,e()),M.x+=Math.cos(g.ang)*y*.9,M.y+=Math.sin(g.ang)*y*.9}q3(t,M)}}function Y3(t,n,e,o,s,i,a,r,c,l){const d=n+Math.cos(o)*s,f=e+Math.sin(o)*s;Ta(t,n,e,d,f,i,i*.45,a,r,c*.72,a-.02,r*.9,c*1.12,l)}function $3(t,n){const e=cf(n),o=t.S,s=(e()-.5)*.08,i=v=>({x:s*v*v,y:v}),a=[],r=[];r.push({a:i(0),b:i(1),r0:.0105,r1:.003});const c=15,l=(v,w,M)=>{const y=v.length-1;for(let b=0;b<y;b++)for(const T of[0,.34,.67]){const _=v[b],S=v[b+1],E=(b+T)/y,A=_.x+(S.x-_.x)*T,R=_.y+(S.y-_.y)*T,C=w[b];for(const I of[-1,1]){const L=E>M,N=C+I*(.62+e()*.3),U=.1*(1-.4*E)*(.82+e()*.36)*(L?.8:1);a.push({x:A,y:R,ang:N,len:U,hue:L?.22+e()*.04:.37+e()*.04,sat:L?.5:.46+e()*.12,val:L?.58+e()*.08:.36+e()*.12,r:e()})}}};for(let v=0;v<c;v++){const w=.08+.84*(v/(c-1)),M=i(w);for(const y of[-1,1]){const b=.5*Math.pow(1-w*.8,.85)*(.88+e()*.24),T=Math.PI/2-y*(1.08-w*.2+(e()-.5)*.12),_=[M],S=[];let E=M.x,A=M.y;const R=6;for(let C=0;C<R;C++){const I=T+y*(C/R)*.55;S.push(I),E+=Math.cos(I)*(b/R),A+=Math.sin(I)*(b/R),_.push({x:E,y:A})}for(let C=0;C<R;C++)r.push({a:_[C],b:_[C+1],r0:.0055*(1-C/R*.5),r1:.0055*(1-(C+1)/R*.5)});l(_,S,.78);for(let C=0;C<4;C++)a.push({x:E,y:A,ang:S[R-1]+(C-1.5)*.28,len:.06*(.85+e()*.3),hue:.23+e()*.04,sat:.5,val:.58,r:e()})}}{const v=[],w=[];for(let y=0;y<=14;y++)v.push(i(.15+y/14*.85));for(let y=0;y<14;y++)w.push(Math.atan2(v[y+1].y-v[y].y,v[y+1].x-v[y].x));l(v,w,.7);const M=i(1);for(let y=0;y<6;y++)a.push({x:M.x,y:M.y,ang:Math.PI/2+(y-2.5)*.34,len:.07,hue:.23,sat:.5,val:.6,r:e()})}let d=1/0,f=1/0,u=-1/0,h=-1/0;const p=(v,w)=>{v<d&&(d=v),v>u&&(u=v),w<f&&(f=w),w>h&&(h=w)};for(const v of a)p(v.x,v.y),p(v.x+Math.cos(v.ang)*v.len,v.y+Math.sin(v.ang)*v.len);for(const v of r)p(v.a.x,v.a.y),p(v.b.x,v.b.y);p(0,-.03);const x=ff(o,t.m,d,f,u,h,o*.97),m=v=>({x:v.x*x.scale+x.ox,y:v.y*x.scale+x.oy}),g=Math.max(.9,o*.0034);for(const v of r){const w=m(v.a),M=m(v.b);Ta(t,w.x,w.y,M.x,M.y,Math.max(.9,v.r0*x.scale),Math.max(.8,v.r1*x.scale),.07,.5,.27,.075,.45,.32,e())}a.sort(()=>e()-.5);for(const v of a){const w=m(v);Y3(t,w.x,w.y,v.ang,v.len*x.scale,g,v.hue,v.sat,v.val,v.r)}}function uf(t,n,e,o,s){const i=new Uint8Array(e*e*4),a=new Int32Array(e),r=new Int32Array(e);for(let c=0;c<e;c++)a[c]=s?(c+e-1)%e:Math.max(0,c-1),r[c]=s?(c+1)%e:Math.min(e-1,c+1);for(let c=0;c<e;c++){const l=(s?(c+e-1)%e:Math.max(0,c-1))*e,d=c*e,f=(s?(c+1)%e:Math.min(e-1,c+1))*e;for(let u=0;u<e;u++){const h=d+u,p=h*4;if(n&&n[h]<.02){i[p]=128,i[p+1]=128,i[p+2]=255,i[p+3]=255;continue}const x=a[u],m=r[u],g=(t[l+m]+2*t[d+m]+t[f+m]-t[l+x]-2*t[d+x]-t[f+x])/8,v=(t[f+x]+2*t[f+u]+t[f+m]-t[l+x]-2*t[l+u]-t[l+m])/8,w=-g*o,M=-v*o,y=1/Math.sqrt(w*w+M*M+1);i[p]=(w*y*.5+.5)*255+.5|0,i[p+1]=(M*y*.5+.5)*255+.5|0,i[p+2]=(y*.5+.5)*255+.5|0,i[p+3]=255}}return i}function Ao(t){const n=Math.round(t*255);return n<0?0:n>255?255:n}function j3(t,n){const e=K3(t),o=Math.floor(t/2),s=Math.max(3,Math.round(o*.03)),i=[{id:Do.broadleaf,paint:l=>vr(l,{dark:!1,round:!1})},{id:Do.broadleafDark,paint:l=>vr(l,{dark:!0,round:!1})},{id:Do.conifer,paint:l=>$3(l,n*31+3)},{id:Do.shrub,paint:l=>vr(l,{dark:!1,round:!0})}],a=new Float32Array(i.length*3);for(const{id:l,paint:d}of i){const f=l%2*o,u=Math.floor(l/2)*o;d({B:e,ox:f,oy:u,S:o,m:s,seed:n});let h=0,p=0,x=0,m=0;for(let g=0;g<o;g++){const v=g>=s&&g<o-s;for(let w=0;w<o;w++){const M=(u+g)*t+f+w;!v||w<s||w>=o-s?(e.a[M]=0,e.h[M]=.5):e.a[M]>.5&&(h+=e.r[M],p+=e.g[M],x+=e.b[M],m++)}}m>0&&(a[l*3]=h/m,a[l*3+1]=p/m,a[l*3+2]=x/m)}const r=new Uint8Array(t*t*4);for(let l=0;l<t;l++)for(let d=0;d<t;d++){const f=l*t+d,u=f*4,h=Math.min(1,Math.floor(d/o))+Math.min(1,Math.floor(l/o))*2,p=e.a[f];p<.004?(r[u]=Ao(a[h*3]),r[u+1]=Ao(a[h*3+1]),r[u+2]=Ao(a[h*3+2]),r[u+3]=0):(r[u]=Ao(e.r[f]),r[u+1]=Ao(e.g[f]),r[u+2]=Ao(e.b[f]),r[u+3]=Ao(p))}const c=uf(e.h,e.a,t,7*(t/1024),!1);return{albedo:{size:t,data:r},normal:{size:t,data:c}}}function xr(t,n,e){const o=new Float32Array(t*n),s=new Float32Array(t*n),i=new Float32Array(t*n);for(let a=0;a<n;a++)for(let r=0;r<t;r++){const c=a*t+r;o[c]=.15+rs(r,a,e)*.7,s[c]=.15+rs(r,a,e+17)*.7,i[c]=rs(r,a,e+31)}return{gx:t,gy:n,fx:o,fy:s,id:i}}function ll(t,n,e,o){const{gx:s,gy:i}=e,a=t*s,r=n*i,c=Math.floor(a),l=Math.floor(r);let d=9,f=9,u=0;for(let h=-1;h<=1;h++){const p=l+h,x=Fi(p,i);for(let m=-1;m<=1;m++){const g=c+m,v=x*s+Fi(g,s),w=a-(g+e.fx[v]),M=r-(p+e.fy[v]),y=w*w+M*M;y<d?(f=d,d=y,u=e.id[v]):y<f&&(f=y)}}o[0]=Math.sqrt(d),o[1]=Math.sqrt(f),o[2]=u}function Z3(t,n,e){const{gx:o}=n,s=t*o,i=Math.floor(s);let a=9,r=9,c=0;for(let l=-1;l<=1;l++){const d=i+l,f=Fi(d,o),u=Math.abs(s-(d+n.fx[f]));u<a?(r=a,a=u,c=n.id[f]):u<r&&(r=u)}e[0]=a,e[1]=r,e[2]=c}function Q3(t,n,e){const o=t,s=new Uint8Array(o*o*4),i=new Float32Array(o*o),a=[0,0,0],r=n*7+(e==="conifer"?101:3),c=e==="broadleaf"?xr(10,1,r+9):xr(11,3,r+9),l=xr(22,8,r+12);for(let f=0;f<o;f++){const u=(f+.5)/o;for(let h=0;h<o;h++){const p=(h+.5)/o,x=f*o+h;let m,g,v,w;const M=Ln(p*4,u*4,4,4,r+1);if(e==="broadleaf"){const b=Ln(p*2,u*5,2,5,r+3)-.5,T=Ln(p*5,u*11,5,11,r+4)-.5,_=p+.028*b+.01*T;Z3(_,c,a);const S=a[1]-a[0],E=no(.3,.6,Ln(p*10,u*4,10,4,r+5)),A=1-no(0,.13,S);ll(_+.31,u+.07*b,l,a);const R=a[1]-a[0],C=(1-no(0,.09,R))*.5*no(.3,.7,Ln(p*6,u*9,6,9,r+6)),I=Math.min(1,Math.max(A*(.4+.6*E),C)),L=Ln(p*120,u*8,120,8,r+7),N=Ln(p*70,u*40,70,40,r+11),U=.9+.2*Ln(p*10,u*3,10,3,r+8);w=(1-I*.9)*(.85+.15*L)+.05*N;const F=U*(.82+.4*M)*(.86+.28*L)*(.94+.1*N)*(1-.82*I);m=.4*F,g=.35*F,v=.3*F;const z=no(.64,.78,Ln(p*7,u*7,7,7,r+12))*(1-I)*.2;m+=(.5*F-m)*z,g+=(.54*F-g)*z,v+=(.4*F-v)*z}else{const b=.03*(Ln(p*5,u*3,5,3,r+3)-.5)+.012*(Ln(p*14,u*8,14,8,r+4)-.5),T=.06*(Ln(p*4,u*5,4,5,r+5)-.5);ll(p+b,u+T,c,a);const _=a[1]-a[0],S=.6+.8*Ln(p*7,u*6,7,6,r+6),E=no(0,.16*S,_),A=1-Math.min(1,a[0]*1.1),R=Ln(p*60,u*5,60,5,r+10),C=Ln(p*90,u*30,90,30,r+11);w=E*(.5+.35*A)*(.88+.16*R)+.05*C;const L=(.75+.5*a[2])*(.85+.3*M)*(.8+.4*R)*(.9+.2*C)*(.3+.7*E)*(.88+.2*A);m=.37*L,g=.28*L,v=.22*L;const N=no(.5,.85,a[2])*.4;m+=(.4*L-m)*N,g+=(.34*L-g)*N,v+=(.3*L-v)*N}const y=x*4;s[y]=Ao(m),s[y+1]=Ao(g),s[y+2]=Ao(v),s[y+3]=255,i[x]=w}}const d=uf(i,null,o,(e==="broadleaf"?5:6)*(o/512),!0);return{albedo:{size:o,data:s},normal:{size:o,data:d}}}const J3=5,Lt={rockA:.16,rockB:.42,hiA:14,hiB:38,dryA:.58,dryB:.78,dryGain:.5,hiGain:.22,dirtA:.54,dirtB:.74,dirtGain:.9,gravelA:.62,gravelB:.76,hBias:.2};function Mi(t,n,e){const o=Math.min(1,Math.max(0,(e-t)/(n-t)));return o*o*(3-2*o)}function e5(t){const n=Mi(Lt.rockA,Lt.rockB,1-t.normalY),e=Mi(Lt.hiA,Lt.hiB,t.height),o=Math.min(1,Mi(Lt.dryA,Lt.dryB,t.nDry)*Lt.dryGain+e*Lt.hiGain),s=Mi(Lt.dirtA,Lt.dirtB,t.nDirt)*Lt.dirtGain,i=Mi(Lt.gravelA,Lt.gravelB,t.nGravel),a=1-n,r=a*s,c=a*(1-s),l=c*i,d=c*(1-i),f=d*o,u=d*(1-o),h=t.layerHeights??[.5,.5,.5,.5,.5],p=[u,f,r,l,n];let x=0;const m=p.map((v,w)=>{const M=v*(h[w]+Lt.hBias),y=M*M;return x+=y,y}),g=1/Math.max(x,1e-6);return[m[0]*g,m[1]*g,m[2]*g,m[3]*g,m[4]*g]}function zn(t){const n=String(t);return/[.e]/.test(n)?n:`${n}.0`}function t5(){return`
void layerWeights(float normalY, float height, float nDry, float nDirt, float nGravel, float lh[5], out float w[5]) {
  float rock = smoothstep(${zn(Lt.rockA)}, ${zn(Lt.rockB)}, 1.0 - normalY);
  float hi = smoothstep(${zn(Lt.hiA)}, ${zn(Lt.hiB)}, height);
  float dry = min(1.0, smoothstep(${zn(Lt.dryA)}, ${zn(Lt.dryB)}, nDry) * ${zn(Lt.dryGain)} + hi * ${zn(Lt.hiGain)});
  float dirt = smoothstep(${zn(Lt.dirtA)}, ${zn(Lt.dirtB)}, nDirt) * ${zn(Lt.dirtGain)};
  float gravel = smoothstep(${zn(Lt.gravelA)}, ${zn(Lt.gravelB)}, nGravel);
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
    float v = w[k] * (lh[k] + ${zn(Lt.hBias)});
    w[k] = v * v;
    sum += w[k];
  }
  float inv = 1.0 / max(sum, 1e-6);
  for (int k = 0; k < 5; k++) w[k] *= inv;
}
`}function ta(t,n){const e=Math.sin(t*127.1+n*311.7)*43758.5453123;return e-Math.floor(e)}function n5(t,n){const e=Math.floor(t),o=Math.floor(n),s=t-e,i=n-o,a=s*s*(3-2*s),r=i*i*(3-2*i);return ta(e,o)*(1-a)*(1-r)+ta(e+1,o)*a*(1-r)+ta(e,o+1)*(1-a)*r+ta(e+1,o+1)*a*r}function na(t,n,e){let o=.5,s=1,i=0,a=0;for(let r=0;r<e;r++)i+=o*n5(t*s,n*s),a+=o,o*=.5,s*=2;return i/a}function o5(t,n){return{nDry:na(t*.012+13,n*.012+71,3),nDirt:na(t*.009+31,n*.009+17,4)*.68+na(t*.045,n*.045,3)*.32,nGravel:na(t*.028+150,n*.028+20,4)}}function s5(){return`
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
`}const $n=t=>[(t>>16&255)/255,(t>>8&255)/255,(t&255)/255],wi=t=>{const n=e=>Math.round(Math.min(1,Math.max(0,e))*255);return n(t[0])<<16|n(t[1])<<8|n(t[2])},Xs=(t,n,e)=>[t[0]+(n[0]-t[0])*e,t[1]+(n[1]-t[1])*e,t[2]+(n[2]-t[2])*e],Gs=t=>t[0]*.299+t[1]*.587+t[2]*.114;function dl(t){const n=$n(t.grass),e=$n(t.dirt),o=$n(t.rock),s=Xs(n,[Gs(n),Gs(n),Gs(n)],.1),a=Xs(s,[.66,.6,.33],.62),r=Xs(e,[Gs(e),Gs(e),Gs(e)],.08),c=Xs(Xs(o,e,.38),[1,1,1],.1),l=o;return{grass:wi(s),dryGrass:wi(a),dirt:wi(r),gravel:wi(c),rock:wi(l)}}function i5(t){let n=t>>>0;return()=>{n=n+1831565813>>>0;let e=n;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}}function a5(t){const n=t*t;return{S:t,mask:t-1,R:new Float32Array(n),G:new Float32Array(n),B:new Float32Array(n),H:new Float32Array(n)}}function Ho(t,n,e,o,s,i=.5){const a=new Float32Array(t*t);let r=1,c=0;const l=new Int32Array(t),d=new Int32Array(t),f=new Float32Array(t);for(let h=0;h<s;h++){const p=e<<h,x=o<<h;if(p>t/2||x>t/2)break;const m=new Float32Array(p*x);for(let g=0;g<m.length;g++)m[g]=n();for(let g=0;g<t;g++){const v=g*p/t,w=Math.floor(v),M=v-w;l[g]=w%p,d[g]=(w+1)%p,f[g]=M*M*(3-2*M)}for(let g=0;g<t;g++){const v=g*x/t,w=Math.floor(v),M=v-w,y=M*M*(3-2*M),b=w%x*p,T=(w+1)%x*p,_=g*t;for(let S=0;S<t;S++){const E=m[b+l[S]],A=m[b+d[S]],R=m[T+l[S]],C=m[T+d[S]],I=f[S],L=E+(A-E)*I;a[_+S]=a[_+S]+r*(L+(R+(C-R)*I-L)*y)}}c+=r,r*=i}const u=1/c;for(let h=0;h<a.length;h++)a[h]*=u;return a}function Ea(t,n){for(let e=0;e<t.length;e++){const o=(t[e]-.5)*n+.5;t[e]=o<0?0:o>1?1:o}}function fl(t,n,e,o,s,i,a,r){const c=(e&t.mask)*t.S+(n&t.mask);t.R[c]+=(o-t.R[c])*a,t.G[c]+=(s-t.G[c])*a,t.B[c]+=(i-t.B[c])*a,r>t.H[c]&&(t.H[c]=r)}function _r(t,n,e){const o=t.S;for(let s=0;s<e.count;s++){let i=n()*o,a=n()*o,r=n()*Math.PI*2;const c=e.lenMin+n()*(e.lenMax-e.lenMin),l=e.wMin+n()*(e.wMax-e.wMin),d=(n()-.5)*e.curve,f=e.bright[0]+n()*(e.bright[1]-e.bright[0]),u=e.alt&&n()<e.alt.p?e.alt.color:e.base,h=(n()-.5)*e.hueJitter,p=Math.max(3,Math.round(c/.8)),x=.8+n()*.2;for(let m=0;m<p;m++){const g=m/(p-1),v=Math.cos(r),w=Math.sin(r),M=Math.max(.9,l*(1-g*.8)),y=e.baseDark+(e.tipLight-e.baseDark)*g,b=u[0]*f*y*(1+h+e.tipYellow*g),T=u[1]*f*y*(1+e.tipYellow*g*.3),_=u[2]*f*y*(1-h-e.tipYellow*g*1.2),S=(.38+.62*Math.pow(g,.55))*x,E=M*.5,A=Math.round(i),R=Math.round(a);if(M<1.5)fl(t,A,R,b,T,_,.9,S);else for(let C=-E;C<=E+.01;C+=1){const I=Math.abs(C)>E-.5?.65:.95;fl(t,Math.round(i-w*C),Math.round(a+v*C),b,T,_,I,S)}i+=v*.8,a+=w*.8,r+=d*.05}}}function Aa(t,n){const e=Math.cos(n.ang),o=Math.sin(n.ang),s=Math.ceil(Math.max(n.rx,n.ry)*1.7)+1,i=Math.round(n.cx),a=Math.round(n.cy),r=-.6,c=-.8;for(let l=-s;l<=s;l++)for(let d=-s;d<=s;d++){const f=d+(i-n.cx),u=l+(a-n.cy),h=(f*e+u*o)/n.rx,p=(-f*o+u*e)/n.ry,x=h*h+p*p;if(x>2.9)continue;const m=(a+l&t.mask)*t.S+(i+d&t.mask);if(x<1){const g=Math.sqrt(1-x),v=(f*r+u*c)/(Math.max(n.rx,n.ry)*1),w=.74+.3*g-.28*v*(1-g*.6),M=x>.8?.8:1;t.R[m]+=(n.color[0]*w-t.R[m])*M,t.G[m]+=(n.color[1]*w-t.G[m])*M,t.B[m]+=(n.color[2]*w-t.B[m])*M;const y=g*n.hScale;y>t.H[m]&&(t.H[m]=y)}else if(n.shadow>0){const g=(f*-r+u*-c)/(Math.sqrt(f*f+u*u)+1e-4),v=1-(Math.sqrt(x)-1)/.7;if(v>0&&g>-.2){const w=1-n.shadow*v*Math.min(1,g+.3);t.R[m]*=w,t.G[m]*=w,t.B[m]*=w}}}}function Vr(t,n,e,o){const s=n*n,i=new Float32Array(s),a=new Float32Array(s),r=new Float32Array(s),c=new Float32Array(s),l=new Float32Array(s),d=new Float32Array(s);for(let p=0;p<s;p++){i[p]=.5+(e()-.5)*.85,a[p]=.5+(e()-.5)*.85;const x=e()*Math.PI;r[p]=Math.cos(x),c[p]=Math.sin(x);const m=o?.75+e()*.7:1,g=o?.8+e()*.45:1;l[p]=1/(g*m),d[p]=1/(g/m)}const f=new Float32Array(t*t),u=new Float32Array(t*t),h=new Int32Array(t*t);for(let p=0;p<t;p++){const x=p*n/t,m=Math.floor(x);for(let g=0;g<t;g++){const v=g*n/t,w=Math.floor(v);let M=1e9,y=1e9,b=0;for(let _=-1;_<=1;_++){const S=m+_,E=(S%n+n)%n;for(let A=-1;A<=1;A++){const R=w+A,C=(R%n+n)%n,I=E*n+C,L=v-(R+i[I]),N=x-(S+a[I]),U=L*r[I]+N*c[I],F=-L*c[I]+N*r[I],z=U*U*l[I]*l[I]+F*F*d[I]*d[I];z<M?(y=M,M=z,b=I):z<y&&(y=z)}}const T=p*t+g;f[T]=Math.sqrt(M),u[T]=Math.sqrt(y),h[T]=b}}return{d1:f,d2:u,id:h}}const ws=(t,n,e)=>{const o=Math.min(1,Math.max(0,(e-t)/(n-t)));return o*o*(3-2*o)};function ul(t,n,e,o){const s=t.S,i=s/512,a=$n(e.grass),r=$n(e.dryGrass),c=$n(e.dirt),l=Ho(s,n,4,4,5),d=Ho(s,n,16,16,3);if(Ea(l,1.8),o){for(let f=0;f<s*s;f++){const u=ws(.5,.72,l[f]),h=d[f];t.R[f]=(r[0]*.62+(c[0]*.8-r[0]*.62)*u*.55)*(.78+.4*h),t.G[f]=(r[1]*.62+(c[1]*.8-r[1]*.62)*u*.55)*(.78+.4*h),t.B[f]=(r[2]*.62+(c[2]*.8-r[2]*.62)*u*.55)*(.78+.4*h),t.H[f]=.1+.18*h}_r(t,n,{count:Math.round(11e3*i*i),lenMin:24*i+4,lenMax:58*i+4,wMin:1.3,wMax:2.1,curve:3.4,base:r,baseDark:.62,tipLight:1.08,tipYellow:.08,bright:[.7,1.3],alt:{p:.12,color:[c[0]*1.1,c[1]*1.05,c[2]]},hueJitter:.1}),_r(t,n,{count:Math.round(1200*i*i),lenMin:10*i+3,lenMax:22*i+3,wMin:1.4,wMax:2,curve:1.4,base:$n(e.grass),baseDark:.6,tipLight:1.05,tipYellow:.1,bright:[.7,1],hueJitter:.06})}else{const f=[a[0]*.5,a[1]*.5,a[2]*.45];for(let p=0;p<s*s;p++){const x=l[p]*.7+d[p]*.3;t.R[p]=f[0]*(.7+.6*x),t.G[p]=f[1]*(.7+.6*x),t.B[p]=f[2]*(.7+.6*x),t.H[p]=.12+.2*d[p]}_r(t,n,{count:Math.round(26e3*i*i),lenMin:12*i+3,lenMax:30*i+3,wMin:1.5,wMax:2.5,curve:1.2,base:a,baseDark:.58,tipLight:1.12,tipYellow:.16,bright:[.75,1.25],alt:{p:.05,color:r},hueJitter:.08});const u=[[.93,.92,.84],[.93,.78,.22],[.9,.9,.92]],h=Math.round(9*i*i)+3;for(let p=0;p<h;p++){const x=n()*s,m=n()*s,g=u[Math.floor(n()*u.length)],v=(1.3+n()*.8)*Math.max(.8,i);for(let w=0;w<5;w++){const M=w/5*Math.PI*2+n();Aa(t,{cx:x+Math.cos(M)*v,cy:m+Math.sin(M)*v,rx:v*.7,ry:v*.7,ang:0,color:g,hScale:.9,shadow:0})}Aa(t,{cx:x,cy:m,rx:v*.55,ry:v*.55,ang:0,color:[.95,.72,.15],hScale:.95,shadow:0})}}}function r5(t,n,e){const o=t.S,s=o/512,i=$n(e.dirt),a=$n(e.rock),r=Ho(o,n,4,4,5),c=Ho(o,n,32,32,3);Ea(r,1.8);for(let u=0;u<o*o;u++){const h=.94+n()*.12,p=(.76+.46*r[u])*(.9+.2*c[u])*h,x=r[u]>.55?1.04:.98;t.R[u]=i[0]*p*x,t.G[u]=i[1]*p,t.B[u]=i[2]*p/x,t.H[u]=.28+.2*c[u]+.1*r[u]}const l=Math.round(110*s*s);for(let u=0;u<l;u++){const h=(5+n()*8)*s+1.5,p=.9+n()*.25;Aa(t,{cx:n()*o,cy:n()*o,rx:h*(.8+n()*.5),ry:h*(.8+n()*.5),ang:n()*3.14,color:[i[0]*p,i[1]*p,i[2]*p],hScale:.55+n()*.15,shadow:.2})}const d=Math.round(520*s*s);for(let u=0;u<d;u++){const h=(1.5+Math.pow(n(),2)*5)*Math.max(.7,s),p=n()*.65,x=.72+n()*.55;Aa(t,{cx:n()*o,cy:n()*o,rx:h*(.85+n()*.5),ry:h*(.7+n()*.4),ang:n()*3.14,color:[(a[0]+(i[0]-a[0])*p)*x,(a[1]+(i[1]-a[1])*p)*x,(a[2]+(i[2]-a[2])*p)*x],hScale:.8+n()*.2,shadow:.38})}const f=Math.round(16*s)+4;for(let u=0;u<f;u++){let h=n()*o,p=n()*o,x=n()*Math.PI*2;const m=Math.round((70+n()*150)*s)+20;for(let g=0;g<m;g++){x+=(n()-.5)*.7,h+=Math.cos(x),p+=Math.sin(x);const v=Math.round(h),w=Math.round(p),M=(w&t.mask)*o+(v&t.mask);if(t.R[M]*=.5,t.G[M]*=.5,t.B[M]*=.5,t.H[M]=Math.min(t.H[M],.04),g%3===0){const y=(w&t.mask)*o+(v+1&t.mask);t.R[y]*=.8,t.G[y]*=.8,t.B[y]*=.8,t.H[y]=Math.min(t.H[y],.18)}}}}function c5(t,n,e){const o=t.S,s=o/512,i=$n(e.gravel),a=$n(e.dirt),r=Math.round(24*s+2)|0,c=Math.max(8,r),l=Vr(o,c,n,!0),d=new Float32Array(c*c),f=new Float32Array(c*c),u=new Float32Array(c*c);for(let x=0;x<d.length;x++)d[x]=.62+n()*.75,f[x]=n(),u[x]=.6+n()*.4;const h=[a[0]*.38,a[1]*.36,a[2]*.33],p=Ho(o,n,24,24,2);for(let x=0;x<o*o;x++){const m=l.id[x],g=l.d1[x],v=ws(0,.1,l.d2[x]-g),w=Math.max(0,1-g*.85),M=f[m],y=d[m]*(.86+.28*p[x])*(.78+.3*w)*(.95+n()*.1),b=i[0]*y*(.94+.14*M),T=i[1]*y*(.97+.04*M),_=i[2]*y*(1.04-.14*M),S=v*v;t.R[x]=h[0]+(b-h[0])*S,t.G[x]=h[1]+(T-h[1])*S,t.B[x]=h[2]+(_-h[2])*S,t.H[x]=.04+.96*Math.pow(w,.7)*v*u[m]}}function l5(t,n,e){const o=t.S,s=o/512,i=$n(e.rock),a=Xs($n(e.grass),[.1,.12,.06],.35),r=Ho(o,n,2,12,5),c=Ho(o,n,6,6,4),l=Ho(o,n,32,32,3),d=Ho(o,n,3,3,4);Ea(r,1.6),Ea(d,1.8);const f=Vr(o,Math.max(4,Math.round(9*Math.max(.7,s))),n,!1),u=Vr(o,Math.max(8,Math.round(15*Math.max(.7,s*1))),n,!1);for(let h=0;h<o*o;h++){const p=r[h]*.5+c[h]*.32+l[h]*.18,x=(l[h]-.5)*.09,m=1-ws(0,.035,f.d2[h]-f.d1[h]+x),g=(1-ws(0,.05,u.d2[h]-u.d1[h]+x))*.55*ws(.35,.7,c[h]),v=Math.min(1,m+g),w=p*(1-.8*v),M=.74+.5*r[h],y=c[h];let b=i[0]*M*(.96+.1*y),T=i[1]*M,_=i[2]*M*(1.04-.1*y);const S=.62+.55*w,E=1-.38*v;b*=S*E,T*=S*E,_*=S*E;const A=ws(.55,.78,d[h])*ws(.6,.2,p)*.55;A>0&&(b+=(a[0]*(.7+.5*l[h])-b)*A,T+=(a[1]*(.7+.5*l[h])-T)*A,_+=(a[2]*(.7+.5*l[h])-_)*A);const R=.94+n()*.12;t.R[h]=b*R,t.G[h]=T*R,t.B[h]=_*R,t.H[h]=w}}const d5={0:1.8,1:1.5,2:2.4,3:3.4,4:3},hf={0:.9,1:.94,2:.97,3:.84,4:.9};function f5(t,n){const e=t.S,o=new Uint8Array(e*e*4),s=new Uint8Array(e*e*4),i=d=>d<=0?0:d>=1?255:d*255+.5|0,a=t.H,r=t.mask,c=d5[n],l=hf[n];for(let d=0;d<e;d++){const f=(d-1&r)*e,u=d*e,h=(d+1&r)*e;for(let p=0;p<e;p++){const x=p-1&r,m=p+1&r,g=a[f+m]+2*a[u+m]+a[h+m]-a[f+x]-2*a[u+x]-a[h+x],v=a[h+x]+2*a[h+p]+a[h+m]-a[f+x]-2*a[f+p]-a[f+m],w=-g*c/8,M=-v*c/8,y=1/Math.sqrt(w*w+M*M+1),b=(u+p)*4,T=u+p;o[b]=i(t.R[T]),o[b+1]=i(t.G[T]),o[b+2]=i(t.B[T]),o[b+3]=i(a[T]),s[b]=i(w*y*.5+.5),s[b+1]=i(M*y*.5+.5),s[b+2]=i(y*.5+.5),s[b+3]=i(l+(.5-a[T])*.12)}}return{size:e,albedo:o,normal:s}}function pf(t,n,e,o){if(n<64||(n&n-1)!==0)throw new Error("size must be a power of two >= 64");const s=i5(e*7919+t*104729+1),i=a5(n);switch(t){case 0:ul(i,s,o,!1);break;case 1:ul(i,s,o,!0);break;case 2:r5(i,s,o);break;case 3:c5(i,s,o);break;default:l5(i,s,o)}return f5(i,t)}const u5=256,h5=2207,p0=1.1,p5={grass:9079172,dryGrass:9079172,dirt:7300698,gravel:9276293,rock:9079172};let uo,Ss;function hl(t,n,e){const o=new Ls(t,n,n,kn,Rn);return o.colorSpace=e?yt:io,o.wrapS=o.wrapT=Hn,o.magFilter=en,o.minFilter=Yn,o.generateMipmaps=!0,o.anisotropy=4,o.needsUpdate=!0,o}function mf(){if(uo)return uo;const t=pf(4,u5,h5,p5);return uo={albedo:hl(t.albedo,t.size,!0),normal:hl(t.normal,t.size,!1)},uo}const pl=`
varying vec3 vRkPos;
varying vec3 vRkNrm;
varying vec3 vRkWorldN;
varying mat3 vRkM;
`,m5=`
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
`,g5=`
vRkPos = transformed;
`,v5=`
{
  mat4 rkModel = modelMatrix;
  #ifdef USE_BATCHING
    rkModel = modelMatrix * batchingMatrix;
  #endif
  vRkM = mat3(rkModel);
  vRkNrm = normalize(objectNormal);
  vRkWorldN = normalize(vRkM * objectNormal);
}
`,x5=`
vec3 rkN = normalize(vRkNrm);
vec3 rkW = pow(abs(rkN), vec3(5.0));
rkW /= (rkW.x + rkW.y + rkW.z);
vec3 rkP = vRkPos * ${p0.toFixed(3)};
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
`,_5=`
{
  vec3 rkNo = normalize(vRkNrm);
  vec3 rkWn = pow(abs(rkNo), vec3(5.0));
  rkWn /= (rkWn.x + rkWn.y + rkWn.z);
  vec3 rkQ = vRkPos * ${p0.toFixed(3)};
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
`,M5=`
{
  vec3 rkNr = normalize(vRkNrm);
  vec3 rkWr = pow(abs(rkNr), vec3(5.0));
  rkWr /= (rkWr.x + rkWr.y + rkWr.z);
  vec3 rkR = vRkPos * ${p0.toFixed(3)};
  float rkRough = texture2D(rkNormal, rkR.zy).a * rkWr.x + texture2D(rkNormal, rkR.xz + 0.37).a * rkWr.y + texture2D(rkNormal, rkR.xy + 0.71).a * rkWr.z;
  roughnessFactor = mix(rkRough, 0.97, rkMoss * 0.8);
  roughnessFactor = mix(roughnessFactor, roughnessFactor * 0.72, rkGround);
}
`;function m0(){if(Ss)return Ss;const t=mf(),n=new ge({color:16777215,vertexColors:!0,roughness:.92,metalness:0});return n.userData.shared=!0,n.onBeforeCompile=e=>{e.uniforms.rkAlbedo={value:t.albedo},e.uniforms.rkNormal={value:t.normal},e.vertexShader=e.vertexShader.replace("#include <common>",`#include <common>
${pl}`).replace("#include <begin_vertex>",`#include <begin_vertex>
${g5}`).replace("#include <beginnormal_vertex>",`#include <beginnormal_vertex>
${v5}`),e.fragmentShader=e.fragmentShader.replace("#include <common>",`#include <common>
${pl}${m5}`).replace("#include <color_fragment>",`#include <color_fragment>
${x5}`).replace("#include <roughnessmap_fragment>",`#include <roughnessmap_fragment>
${M5}`).replace("#include <normal_fragment_maps>",`#include <normal_fragment_maps>
${_5}`)},n.customProgramCacheKey=()=>"rock-triplanar-v1",Ss=n,n}let Bo;function w5(){if(Bo)return Bo;const t=mf();return Bo=new ge({color:16777215,map:t.albedo,normalMap:t.normal,normalScale:new ot(.7,.7),vertexColors:!0,roughness:.9,metalness:0}),Bo.userData.shared=!0,Bo}function b5(){Ss==null||Ss.dispose(),Ss=void 0,Bo==null||Bo.dispose(),Bo=void 0,uo==null||uo.albedo.dispose(),uo==null||uo.normal.dispose(),uo=void 0}const gf={value:0},Ra={dir:{value:new X(.4,.8,-.45).normalize()},color:{value:new oe(1,.95,.85)}};let Ts="high";function S5(t){!Es&&Object.keys($s).length===0&&(Ts=t)}const y5=.45,T5=`
uniform float windTime;
attribute vec2 aSway;
`,E5=`
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
  transformed += windObjDir * (windGust * aSway.x);
  float windFt = windTime * 5.2 + windPh * 2.1;
  transformed += vec3(
    sin(windFt + position.x * 9.0 + position.y * 3.0),
    0.5 * sin(windFt * 1.31 + position.y * 8.0 + position.z * 2.0),
    sin(windFt * 0.87 + position.z * 9.0 + position.x * 3.0)
  ) * (aSway.y * (0.55 + 0.45 * windGust));
}
`;function g0(t){t.uniforms.windTime=gf,t.vertexShader=t.vertexShader.replace("#include <common>",`#include <common>
${T5}`).replace("#include <begin_vertex>",`#include <begin_vertex>
${E5}`)}const A5=`
uniform vec3 foliageSunDir;
uniform vec3 foliageSunColor;
`,R5=`
{
  vec3 tlSun = normalize((viewMatrix * vec4(foliageSunDir, 0.0)).xyz);
  vec3 tlView = normalize(vViewPosition);
  float tlBack = pow(max(dot(-tlView, tlSun), 0.0), 4.0);
  totalEmissiveRadiance += diffuseColor.rgb * foliageSunColor * (tlBack * 0.35);
}
`;function Pa(t,n,e,o){const s=new Ls(t.data,t.size,t.size,kn,Rn);return s.colorSpace=n?yt:io,s.wrapS=s.wrapT=e?Hn:Cs,s.magFilter=en,s.minFilter=Yn,s.generateMipmaps=!0,s.anisotropy=o,s.needsUpdate=!0,s}const P5=`
#ifdef USE_MAP
  vec2 fTexSz = vec2(textureSize(map, 0));
  vec2 fDx = dFdx(vMapUv * fTexSz);
  vec2 fDy = dFdy(vMapUv * fTexSz);
  float fMip = max(0.0, 0.5 * log2(max(dot(fDx, fDx), dot(fDy, fDy))));
  diffuseColor.a *= 1.0 + fMip * 0.3;
#endif`;function vf(t){t.fragmentShader=t.fragmentShader.replace("#include <map_fragment>",`#include <map_fragment>
${P5}`)}const C5=4177,D5=913;let Es;const $s={},Ca=new Map;function xf(t,n){const e=new wd({depthPacking:Uh}),o=new bd;for(const s of[e,o])s.map=t.map,s.alphaTest=t.alphaTest,s.onBeforeCompile=i=>{g0(i),vf(i)},s.customProgramCacheKey=()=>`wind-shadow-${n}-v2`;Ca.set(t,{depth:e,distance:o})}function po(){if(Es)return Es;const n=j3(Ts==="high"?1024:512,C5),e=new ge({map:Pa(n.albedo,!0,!1,Ts==="high"?4:2),normalMap:Pa(n.normal,!1,!1,Ts==="high"?4:2),normalScale:new ot(.8,.8),alphaTest:y5,vertexColors:!0,side:qe,roughness:.82,metalness:0});return e.onBeforeCompile=o=>{g0(o),vf(o),o.uniforms.foliageSunDir=Ra.dir,o.uniforms.foliageSunColor=Ra.color,o.fragmentShader=o.fragmentShader.replace("#include <common>",`#include <common>
${A5}`).replace("#include <emissivemap_fragment>",`#include <emissivemap_fragment>
${R5}`)},e.customProgramCacheKey=()=>"foliage-wind-v2",e.userData.shared=!0,Es=e,xf(e,"foliage"),e}function v0(t){const n=$s[t];if(n)return n;const o=Q3(Ts==="high"?512:256,D5,t),s=new ge({map:Pa(o.albedo,!0,!0,Ts==="high"?4:2),normalMap:Pa(o.normal,!1,!0,Ts==="high"?4:2),normalScale:new ot(1,1),vertexColors:!0,roughness:.96,metalness:0});return s.onBeforeCompile=i=>g0(i),s.customProgramCacheKey=()=>"bark-wind-v1",s.userData.shared=!0,$s[t]=s,xf(s,`bark-${t}`),s}function ls(t,n){const e=Ca.get(n);e&&(t.customDepthMaterial=e.depth,t.customDistanceMaterial=e.distance)}function I5(){var n,e;const t=[];Es&&t.push(Es);for(const o of Object.values($s))o&&t.push(o);for(const o of t){(n=o.map)==null||n.dispose(),(e=o.normalMap)==null||e.dispose(),o.dispose();const s=Ca.get(o);s==null||s.depth.dispose(),s==null||s.distance.dispose(),Ca.delete(o)}b5(),Es=void 0,delete $s.broadleaf,delete $s.conifer}function L5(t){const n=new jt;let e=0,o=0;const s=t.some(u=>u.attributes.color);for(const u of t)e+=u.attributes.position.count,o+=u.index?u.index.count:u.attributes.position.count;const i=new Float32Array(e*3),a=new Float32Array(e*3),r=new Float32Array(e*2),c=s?new Float32Array(e*3):null,l=new Uint32Array(o);let d=0,f=0;for(const u of t){const h=u.attributes.position,p=u.attributes.normal,x=u.attributes.uv;i.set(h.array,d*3),p&&a.set(p.array,d*3),x&&r.set(x.array,d*2),c&&(u.attributes.color?c.set(u.attributes.color.array,d*3):c.fill(1,d*3,(d+h.count)*3));const m=u.index;if(m)for(let g=0;g<m.count;g++)l[f++]=m.getX(g)+d;else for(let g=0;g<h.count;g++)l[f++]=g+d;d+=h.count}return n.setAttribute("position",new lt(i,3)),n.setAttribute("normal",new lt(a,3)),n.setAttribute("uv",new lt(r,2)),c&&n.setAttribute("color",new lt(c,3)),n.setIndex(new lt(l,1)),n}const _f=.5;function N5(t=18){const n=fn(90210),e=[];for(let o=0;o<t;o++){const s=n(),i=Math.sqrt(s)*.45,a=n()*Math.PI*2,r=Math.cos(a)*i,c=Math.sin(a)*i,l=.16+n()*.34,d=.05+n()*.04,f=.06+i*.7+n()*.12,u=3,h=[],p=[],x=[],m=Math.cos(a),g=Math.sin(a),v=n()*Math.PI,w=Math.cos(v),M=Math.sin(v);for(let S=0;S<=u;S++){const E=S/u,A=E*l,R=d*(1-E*.92)*.5,C=f*E*E,I=r+m*C,L=c+g*C;h.push(I-w*R,A,L-M*R),h.push(I+w*R,A,L+M*R),p.push(0,E,1,E)}for(let S=0;S<u;S++){const E=S*2,A=S*2+1,R=S*2+2,C=S*2+3;x.push(E,R,A,A,R,C)}const y=new jt;y.setAttribute("position",new Jt(h,3)),y.setAttribute("uv",new Jt(p,2)),y.setIndex(x),y.computeVertexNormals();const b=.78+n()*.3,T=n()>.82?1:0,_=new Float32Array(h.length);for(let S=0;S<h.length/3;S++){const E=bt.clamp(h[S*3+1]/_f,0,1),A=[.07+E*.27,.15+E*.34,.045+E*.1],R=[.2+E*.34,.17+E*.26,.07+E*.1];for(let C=0;C<3;C++)_[S*3+C]=(A[C]*(1-T)+R[C]*T)*b}y.setAttribute("color",new lt(_,3)),e.push(y)}return L5(e)}const ml=new Map;function x0(t=.88,n="leaf"){const e=`${n}:${t}`;let o=ml.get(e);return o||(o=new ge({color:16777215,vertexColors:!0,roughness:t,metalness:.02}),ml.set(e,o)),o}function Di(t,n,e,o){return Math.sin(t*2.3+o)*Math.cos(n*2.1+o*1.3)*.5+Math.sin(e*2.7-o*.7+t*1.1)*.35+Math.sin((t+n+e)*4.1+o)*.15}const gl=new Map;function k5(t,n,e){const o=`${t}:${n}:${e}`,s=gl.get(o);if(s)return s;const i=Is(new Ns(1,n),1e-4),a=i.attributes.position,r=new X;for(let c=0;c<a.count;c++){r.fromBufferAttribute(a,c);const l=Di(r.x,r.y,r.z,t);r.multiplyScalar(1+l*e),a.setXYZ(c,r.x,r.y,r.z)}return i.computeVertexNormals(),i.deleteAttribute("uv"),gl.set(o,i),i}function hn(t,n,e,o=()=>1,s=!1){const i=t.clone();s||i.deleteAttribute("uv"),i.attributes.normal||i.computeVertexNormals();const a=i.attributes.position,r=i.attributes.normal,c=new Float32Array(a.count*3);for(let l=0;l<a.count;l++){const d=o(a.getY(l),r.getY(l));c[l*3]=e.r*d,c[l*3+1]=e.g*d,c[l*3+2]=e.b*d}return i.setAttribute("color",new lt(c,3)),i.applyMatrix4(n),i.index?i:Is(i,1e-4)}const U5=new at,vl=new _n,xl=new fs,_l=new X,Ml=new X;function Un(t,n,e,o=1,s=o,i=o,a=0,r=0,c=0){return xl.set(a,r,c),vl.setFromEuler(xl),_l.set(t,n,e),Ml.set(o,s,i),U5.clone().compose(_l,vl,Ml)}function _0(t,n,e,o=!0){if(n.length===0)return;const s=Wn(n,!1);if(!s)return;const i=new V(s,e);i.castShadow=o,i.receiveShadow=!0,ls(i,e),t.add(i)}function M0(t,n,e,o,s,i=!1,a=16,r=18){const c=[];for(let p=0;p<=a;p++){const x=p/a,m=n*.6*Math.exp(-x*13);c.push(new ot(bt.lerp(n,e,Math.pow(x,.85))+m,-.08*t+x*t*1.08))}const l=new Ga(c,r),d=l.attributes.position,f=new Float32Array(d.count*3);for(let p=0;p<d.count;p++){const x=d.getX(p),m=d.getZ(p),g=d.getY(p),v=Math.atan2(m,x),w=Math.sin(v*7+g*.9/Math.max(.2,t*.15))*.5+Math.sin(v*13-g*1.7/Math.max(.2,t*.15))*.3+Di(x*3,g*2.2,m*3,3)*.6,M=Math.max(0,Math.sin(v*5+.7))*Math.exp(-Math.max(0,g)/(t*.12)),y=1+w*.055+M*.28;d.setX(p,x*y+s*Math.pow(Math.max(0,g)/t,2)*t),d.setZ(p,m*y);const b=.72+.28*bt.clamp(.5+w*.6,0,1),T=.7+.3*Math.min(1,Math.max(0,g)/(t*.3)),_=b*T;f[p*3]=o.r*_,f[p*3+1]=o.g*_,f[p*3+2]=o.b*_}if(l.setAttribute("color",new lt(f,3)),i){const p=l.attributes.uv,x=Math.PI*2*((n+e)/2+n*.1);for(let m=0;m<p.count;m++)p.setY(m,p.getY(m)*t*1.08/x)}else l.deleteAttribute("uv");l.computeVertexNormals();const u=l.attributes.normal,h=a+1;for(let p=0;p<h;p++){const x=p,m=r*h+p,g=u.getX(x)+u.getX(m),v=u.getY(x)+u.getY(m),w=u.getZ(x)+u.getZ(m),M=Math.hypot(g,v,w)||1;u.setXYZ(x,g/M,v/M,w/M),u.setXYZ(m,g/M,v/M,w/M)}return l}const F5=.03,Oi=.05,Go=new X(0,1,0);class Wa{constructor(){Z(this,"pos",[]);Z(this,"nor",[]);Z(this,"uvs",[]);Z(this,"col",[]);Z(this,"sw",[]);Z(this,"idx",[]);Z(this,"n",new X)}get cardCount(){return this.pos.length/12}add(n,e,o,s,i,a,r,c,l,d,f,u=!1){this.n.crossVectors(e,o).normalize();const h=this.n.dot(l)<0?-1:1;h<0&&this.n.negate();const p=this.n.clone().multiplyScalar(1-f).addScaledVector(d,f).normalize(),[x,m,g,v]=X3(a),w=this.pos.length/3;for(let M=0;M<4;M++){const y=M===1||M===2?1:0,b=M>=2?1:0,T=(y-.5)*s*h,_=(b-.5)*i;this.pos.push(n.x+e.x*T+o.x*_,n.y+e.y*T+o.y*_,n.z+e.z*T+o.z*_),this.nor.push(p.x,p.y,p.z);const S=u?1-y:y;this.uvs.push(x+(g-x)*S,m+(v-m)*b);const E=.88+.12*b;this.col.push(r[0]*E,r[1]*E,r[2]*E),this.sw.push(0,c*(.3+.7*b))}this.idx.push(w,w+1,w+2,w,w+2,w+3)}build(){const n=new jt;return n.setAttribute("position",new Jt(this.pos,3)),n.setAttribute("normal",new Jt(this.nor,3)),n.setAttribute("uv",new Jt(this.uvs,2)),n.setAttribute("color",new Jt(this.col,3)),n.setAttribute("aSway",new Jt(this.sw,2)),n.setIndex(this.pos.length/3>65535?new Ud(this.idx,1):new Fd(this.idx,1)),n}}function wl(t,n){const e=t.attributes.position;let o=t.attributes.aSway;o||(o=new lt(new Float32Array(e.count*2),2),t.setAttribute("aSway",o));const s=F5*n;for(let i=0;i<e.count;i++){const a=bt.clamp(e.getY(i)/n,0,1);o.setX(i,s*a*a)}o.needsUpdate=!0}function O5(t){let n=.001;for(const e of t){const o=e.attributes.position;for(let s=0;s<o.count;s++)o.getY(s)>n&&(n=o.getY(s))}return n}function w0(t,n,e,o){const s=n.length>0?Wn(n,!1):null,i=O5([...s?[s]:[],...e?[e]:[]]);if(s){wl(s,i);const a=new V(s,o);a.castShadow=!0,a.receiveShadow=!0,ls(a,o),t.add(a)}if(e){wl(e,i);const a=po(),r=new V(e,a);r.castShadow=!0,r.receiveShadow=!0,ls(r,a),t.add(r)}}function Ii(t,n,e,o,s,i,a){const r=n.clone().sub(t),c=r.length(),l=new we(o,e,c,s,1,!0);l.translate(0,c/2,0);const d=l.attributes.uv,f=a(),u=a(),h=c/(Math.PI*(e+o));for(let m=0;m<d.count;m++)d.setXY(m,d.getX(m)+f,d.getY(m)*h+u);const p=l.attributes.position,x=new Float32Array(p.count*3);for(let m=0;m<p.count;m++){const g=i*(.78+.22*Math.min(1,p.getY(m)/c));x[m*3]=g,x[m*3+1]=g,x[m*3+2]=g}return l.setAttribute("color",new lt(x,3)),l.applyMatrix4(new at().compose(t,new _n().setFromUnitVectors(Go,r.normalize()),new X(1,1,1))),l}const Mf=new oe(1,.96,.9);function As(t,n){return n.set(t()+t()+t()-1.5,t()+t()+t()-1.5,t()+t()+t()-1.5),n.lengthSq()<1e-6&&n.set(0,1,0),n.normalize()}function z5(t,n,e,o,s,i){const a=new Wa,r=As(e,new X),c=new X().crossVectors(r,Math.abs(r.y)>.9?new X(1,0,0):Go).normalize(),l=new X().crossVectors(r,c).normalize(),d=e()*Math.PI*2,f=c.clone().multiplyScalar(Math.cos(d)).addScaledVector(l,Math.sin(d)),u=l.clone().multiplyScalar(Math.cos(d)).addScaledVector(c,-Math.sin(d)),h=.62+.4*bt.clamp(.5+o*.6,0,1),p=.94+e()*.12;return a.add(t,f,u,n,n,Do.shrub,[h*p,h,h*(1.1-(p-.94))],n*Oi,r,r,.4,e()>.5),a.build()}function wf(t){const n=new Xe,e=fn(t.seed),o=t.u,s=[],i=(M,y,b,T,_=1)=>{s.push(Ii(M,y,b,T,t.radial,_,e))},a=13*o;s.push(M0(a,1.9*o,1.15*o,Mf,(e()-.5)*.02,!0,t.trunkRows,t.trunkRadial));for(let M=0;M<t.roots;M++){const y=M/t.roots*Math.PI*2+e()*.4,b=(3.4+e()*2.2)*o;i(new X(Math.cos(y)*o,2.2*o,Math.sin(y)*o),new X(Math.cos(y)*b,-.25*o,Math.sin(y)*b),.7*o,.18*o,.95)}const r=[];for(let M=0;M<t.limbs;M++){const y=M/t.limbs*Math.PI*2+e()*.4,b=a*(.62+e()*.3),T=(7.5+e()*3.5)*o,_=(5+e()*4)*o;let S=new X(Math.cos(y)*.5*o,b,Math.sin(y)*.5*o);for(let E=1;E<=t.segs;E++){const A=E/t.segs,R=new X(Math.cos(y)*T*A,b+_*Math.pow(A,.8)+Math.sin(A*3+M)*.4*o,Math.sin(y)*T*A),C=Math.max(.1*o,.62*o*(1-(E-1)/t.segs*.85)),I=Math.max(.07*o,.62*o*(1-E/t.segs*.85));if(i(S,R,C,I),E>=t.forkFrom)for(const L of[-1,1]){const N=y+L*(.5+e()*.5),U=R.clone().add(new X(Math.cos(N)*(2.2+e()*1.6)*o,(1.6+e()*2.2)*o,Math.sin(N)*(2.2+e()*1.6)*o));i(R,U,I*.8,.05*o),r.push({p:U,r:(1.9+e()*1)*o});for(let F=0;F<t.twigs;F++){const z=N+(F===0?-1:1)*(.6+e()*.7)*(e()>.5?1:-1),G=U.clone().add(new X(Math.cos(z)*(1.3+e()*1.2)*o,(.5+e()*1.6)*o,Math.sin(z)*(1.3+e()*1.2)*o));i(U,G,.05*o,.025*o),r.push({p:G,r:(1.4+e()*.8)*o})}}E===2&&r.push({p:R.clone().add(new X(0,1.2*o,0)),r:(2.2+e()*1)*o}),S=R}r.push({p:S.clone().add(new X(0,.8*o,0)),r:(2.5+e()*1)*o})}r.push({p:new X(0,a+4.5*o,0),r:3.4*o});const c=new X;for(const M of r)c.add(M.p);c.multiplyScalar(1/r.length);let l=.001;for(const M of r)l=Math.max(l,M.p.distanceTo(c)+M.r);let d=0;for(const M of r)d+=M.r*M.r;const f=new Wa,u=new X,h=new X,p=new X,x=new X,m=new X,g=new X,v=new X,w=new X;for(const M of r){const y=Math.max(2,Math.round(t.cards*M.r*M.r/d));x.copy(M.p).sub(c).normalize();for(let b=0;b<y;b++){As(e,u).multiplyScalar(.8).addScaledVector(x,.55).normalize(),h.copy(M.p).addScaledVector(u,M.r*(.25+e()*.85)),p.copy(h).sub(c);const T=bt.clamp(p.length()/l,0,1);p.normalize(),m.copy(p).multiplyScalar(.7).addScaledVector(Go,.45).add(As(e,w).multiplyScalar(.55)).normalize(),g.copy(p).addScaledVector(m,-p.dot(m)),g.lengthSq()<.02&&As(e,g),g.normalize();const _=(e()-.5)*1.8;w.crossVectors(m,g),g.multiplyScalar(Math.cos(_)).addScaledVector(w,Math.sin(_)).normalize(),v.crossVectors(g,m).normalize();const E=T<.55&&e()<.75?Do.broadleafDark:Do.broadleaf,A=bt.lerp(.34,1.02,bt.smoothstep(T,.15,1))*(.82+.18*bt.clamp(.5+p.y*.8,0,1))*(.9+.2*e()),R=.96+e()*.1,C=(t.cardSize[0]+e()*(t.cardSize[1]-t.cardSize[0]))*o;f.add(h,v,g,C,C,E,[A*R,A,A*(1.08-(R-.96))],C*Oi,p,p,.55,e()>.5)}}return w0(n,s,f.build(),v0("broadleaf")),n}function ks(t=1,n="high"){const e=n==="low";return wf({u:.2*t,limbs:4,segs:3,forkFrom:3,roots:3,cards:e?440:1900,cardSize:e?[2.2,3.6]:[1.3,2.3],twigs:e?0:2,radial:e?4:6,trunkRows:e?8:16,trunkRadial:e?8:18,seed:Math.floor(t*1e4)+77})}function B5(){return wf({u:1,limbs:8,segs:4,forkFrom:2,roots:8,cards:9e3,cardSize:[1.5,2.9],twigs:2,radial:7,trunkRows:16,trunkRadial:18,seed:4411})}function Ki(t=1,n="high"){const e=new Xe,o=fn(Math.floor(t*7919)+13),s=t,i=n==="low",a=4.3*s,r=[];r.push(M0(a*.97,.15*s,.022*s,Mf,(o()-.5)*.03,!0,i?8:16,i?6:12));const c=i?5:9,l=i?2:4,d=new Wa,f=new X,u=new X,h=new X,p=new X,x=new X,m=new X,g=new X,v=new X,w=new X,M=new _n,y=i?1.4:1;for(let T=0;T<c;T++){const _=T/(c-1),S=(.9+_*3.05)*s,E=(1.1-.9*_)*s*(.92+o()*.16),A=i?4:Math.round(7-_*2.5),R=o()*Math.PI*2,C=.4-.1*_;for(let I=0;I<A;I++){const L=R+I/A*Math.PI*2+(o()-.5)*.5,N=E*(.85+o()*.3);x.set(Math.cos(L),0,Math.sin(L)),f.set(0,S+(o()-.5)*.12*s,0);const U=(O,B)=>B.set(x.x*N*O,f.y+N*(.12*O-C*O*O),x.z*N*O),F=i?2:3;u.copy(f);for(let O=1;O<=F;O++){U(O/F,h);const B=Math.max(.006*s,.045*s*(1-.65*_)*(1-(O-1)/F*.8)),J=Math.max(.004*s,.045*s*(1-.65*_)*(1-O/F*.8));r.push(Ii(u,h,B,J,i?3:4,.85,o)),u.copy(h)}const z=bt.clamp(N*.55,.38*s,.8*s)*y,G=bt.clamp(Math.round(N/(z*.42)),i?2:3,i?3:7);for(let O=0;O<G;O++){const B=.2+O/Math.max(1,G-1)*.8;U(B,w),U(Math.min(1.02,B+.05),p).sub(w).normalize(),w.addScaledVector(p,z*.35);const J=bt.lerp(.5,1.02,bt.smoothstep(B,.1,.8));for(let ue=0;ue<l;ue++){const xe=l===4?(ue-1.5)*.5:(ue-.5)*.9;g.copy(p),m.crossVectors(g,Go).normalize(),M.setFromAxisAngle(g,xe+(o()-.5)*.25),m.applyQuaternion(M),v.crossVectors(m,g).normalize();const j=(o()-.5)*.35;M.setFromAxisAngle(v,j);const ie=g.clone().applyQuaternion(M),ne=m.clone().applyQuaternion(M),ye=l===4&&ue===0?.82:1,Ie=J*(.7+.3*_)*ye*(.9+.2*o()),Fe=z*(.9+o()*.2);d.add(w,ne,ie,Fe,Fe,Do.conifer,[Ie,Ie,Ie*1.04],Fe*Oi,Go,x.clone().multiplyScalar(.5).addScaledVector(Go,.5).normalize(),.3,o()>.5)}}}}const b=i?2:3;for(let T=0;T<b;T++){const _=T/b*Math.PI+o()*.3;m.set(Math.cos(_),0,Math.sin(_)),w.set(0,a*.9+.12*s,0);const S=.62*s*y;d.add(w,m,Go,S,S,Do.conifer,[1,1,1.04],S*Oi*.6,v.crossVectors(m,Go),v.clone(),0,o()>.5)}return w0(e,r,d.build(),v0("conifer")),e}function b0(t=1,n="high"){const e=new Xe,o=fn(Math.floor(t*31337)+5),s=n==="low",i=t,a=[],r=s?4:5+Math.floor(o()*5);for(let y=0;y<r;y++){const b=y/r*Math.PI*2+o()*.8,T=(.35+o()*.4)*i,_=(.4+o()*.4)*i,S=new X(Math.cos(b)*T*.35,_*.5,Math.sin(b)*T*.35),E=new X(Math.cos(b)*T,_,Math.sin(b)*T),A=new X(Math.cos(b)*.03*i,0,Math.sin(b)*.03*i);s?a.push(Ii(A,E,.02*i,.008*i,3,.8,o)):(a.push(Ii(A,S,.022*i,.014*i,3,.8,o)),a.push(Ii(S,E,.014*i,.006*i,3,.8,o)))}const c=new Wa,l=s?150:520,d=s?[.36,.56]:[.26,.44],f=new X(0,.38*i,0),u=new X,h=new X,p=new X,x=new X,m=new X,g=new X,v=new X;let w=0,M=0;for(;w<l&&M++<l*6;){As(o,u);const y=(.4+.6*Math.sqrt(o()))*.72*i;if(h.set(u.x*y,f.y+u.y*y*.85,u.z*y),h.y<.06*i)continue;const b=bt.clamp((h.y-.06*i)/(.3*i),0,1);if(o()>.25+.75*b)continue;p.copy(h).sub(f).normalize(),x.copy(p).multiplyScalar(.75).addScaledVector(Go,.35).add(As(o,v).multiplyScalar(.5)).normalize(),m.copy(p).addScaledVector(x,-p.dot(x)),m.lengthSq()<.02&&As(o,m),m.normalize();const T=(o()-.5)*1.6;v.crossVectors(x,m),m.multiplyScalar(Math.cos(T)).addScaledVector(v,Math.sin(T)).normalize(),g.crossVectors(m,x).normalize();const _=bt.clamp(h.distanceTo(f)/(.72*i),0,1),S=bt.lerp(.45,1.02,bt.smoothstep(_,.2,1))*(.62+.38*b)*(.9+.2*o()),E=.95+o()*.1,A=(d[0]+o()*(d[1]-d[0]))*i;c.add(h,g,m,A,A,Do.shrub,[S*E,S,S*(1.07-(E-.95))],A*Oi,p,p,.5,o()>.5),w++}if(w0(e,a,c.build(),v0("broadleaf")),!s&&o()>.6){const y=[],b=new Se(.035*t,6,5),T=new oe([14240600,6966233,15909198][Math.floor(o()*3)]);for(let _=0;_<9;_++){const S=o()*Math.PI*2,E=(.25+o()*.35)*t;y.push(hn(b,Un(Math.cos(S)*E,(.35+o()*.3)*t,Math.sin(S)*E),T))}_0(e,y,x0(.5,"berry"),!1)}return e}let Mr;function S0(){return Mr||(Mr=new ge({color:16777215,vertexColors:!0,roughness:.78,metalness:0,side:qe})),Mr}function Li(t,n,e,o,s){return new at().makeTranslation(t,n,e).multiply(new at().makeRotationY(o)).multiply(new at().makeRotationX(s))}function G5(t=1){const n=new Xe,e=fn(Math.floor(t*6151)+29),o=[15913547,15695784,16185072,12160240,15897419,15226959],s=new oe(4880954),i=[],a=3+Math.floor(e()*3);for(let r=0;r<a;r++){const c=(.28+e()*.3)*t,l=new oe(o[Math.floor(e()*o.length)]),d=e()*Math.PI*2,f=e()*.24*t,u=Math.cos(d)*f,h=Math.sin(d)*f,p=new we(.007*t,.012*t,c,5,1);p.translate(0,c/2,0),i.push(hn(p,Un(u,0,h),s.clone().multiplyScalar(.85+e()*.3)));for(let m=0;m<2;m++){const g=new Qe(.11*t,.034*t,2,1);g.translate(.055*t,0,0),g.rotateX(-Math.PI/2),i.push(hn(g,Li(u,c*(.22+m*.22),h,m*Math.PI+e()*2,.35),s.clone().multiplyScalar(1.1+e()*.2)))}const x=6;for(let m=0;m<x;m++){const g=new Ds(1,8);g.scale(.034*t,.062*t,1),g.translate(0,.064*t,0),g.rotateX(-Math.PI/2),i.push(hn(g,Li(u,c,h,m/x*Math.PI*2,-.5),l.clone().multiplyScalar(.92+e()*.16),v=>1))}i.push(hn(new Se(.022*t,7,5),Un(u,c+.01*t,h),new oe(14262813)))}return _0(n,i,S0(),!1),n}function H5(t,n,e,o,s,i){const r=[],c=[],l=[],d=new oe;for(let u=0;u<=4;u++){const h=u/4,p=n*(1-h*.9)/2,x=e*h*h,m=o*h*h;if(r.push(x-p,h*t,m,x+p,h*t,m),d.copy(s).lerp(i,h),c.push(d.r,d.g,d.b,d.r,d.g,d.b),u>0){const g=(u-1)*2;l.push(g,g+2,g+1,g+1,g+2,g+3)}}const f=new jt;return f.setAttribute("position",new Jt(r,3)),f.setAttribute("color",new Jt(c,3)),f.setIndex(l),f.computeVertexNormals(),f}function bl(t=1){const n=new Xe,e=fn(Math.floor(t*4111)+3),o=[],s=new oe(10203735),i=new oe(4153392);for(let a=0;a<9;a++){const r=(.7+e()*1)*t,c=e()*Math.PI*2,l=Math.sqrt(e())*.28*t,d=H5(r,(.05+e()*.035)*t,(e()-.5)*.55*t,(e()-.5)*.55*t,i.clone().multiplyScalar(.85+e()*.3),s.clone().multiplyScalar(.85+e()*.3));if(d.applyMatrix4(Un(Math.cos(c)*l,0,Math.sin(c)*l,1,1,1,0,e()*Math.PI*2,0)),o.push(d),e()>.68){const f=r*(.8+e()*.15),u=new we(.006*t,.01*t,f,4,1);u.translate(0,f/2,0),o.push(hn(u,Un(Math.cos(c)*l,0,Math.sin(c)*l),i.clone().multiplyScalar(1.2)));const h=new we(.022*t,.022*t,.14*t,7,1);h.translate(0,.07*t,0),o.push(hn(h,Un(Math.cos(c)*l,f*.96,Math.sin(c)*l),new oe(5913122)))}}return _0(n,o,S0(),!1),n}function V5(t=1){const n=fn(Math.floor(t*2027)+11),e=(1.8+n()*1.4)*t,o=(.17+n()*.06)*t,s=new oe(5652526),i=[],a=M0(e,o*1.05,o*.85,s,0);a.rotateZ(-Math.PI/2),a.translate(-e/2,o*.82,0),i.push(a);const r=new Ds(o*.85,14);i.push(hn(r,Un(e/2+.002,o*.82,0,1,1,1,0,Math.PI/2,0),new oe(12096874)));const c=new ii(o*.35,o*.4,14);i.push(hn(c,Un(e/2+.004,o*.82,0,1,1,1,0,Math.PI/2,0),new oe(9070660)));for(let u=0;u<2;u++){const h=new we(o*.12,o*.2,o*1.1,6,1);h.translate(0,o*.55,0),i.push(hn(h,Un((n()-.5)*e*.6,o*1.3,(n()>.5?1:-1)*o*.5,1,1,1,(n()-.5)*.7,0,(n()-.5)*.8),s.clone().multiplyScalar(.9)))}const l=new oe(5075768);for(let u=0;u<4;u++){const h=o*(.35+n()*.3);i.push(hn(k5(Math.floor(n()*3)+1,1,.3),Un((n()-.5)*e*.8,o*1.62,(n()-.5)*o*.8,h*1.3,h*.45,h),l.clone().multiplyScalar(.8+n()*.4),(p,x)=>.75+.25*bt.clamp(.5+.5*x,0,1)))}const d=Wn(i,!1),f=new V(d,S0());return f.rotation.y=n()*Math.PI,f.castShadow=!0,f.receiveShadow=!0,f}const Sl=new Map;function W5(t){let n=Sl.get(t);if(!n){const e=new Ns(1,t);e.deleteAttribute("normal"),e.deleteAttribute("uv"),n=Is(e,1e-4),e.dispose(),Sl.set(t,n)}return n}function yl(t,n){const e=W5(n.detail).clone(),o=e.attributes.position,s=[];for(let h=0;h<n.cuts;h++){const p=new X(t()-.5,t()*1.1-.3,t()-.5).normalize();s.push({n:p,d:.6+t()*.22})}const i=new X((t()-.5)*.55,1,(t()-.5)*.55).normalize(),a=3.2+t()*2.2,r=t()*4,c=new X,l=-.56;for(let h=0;h<o.count;h++){c.fromBufferAttribute(o,h),c.multiplyScalar(1+Di(c.x*1.4,c.y*1.4,c.z*1.4,n.seed)*.2);for(const M of s){const y=c.dot(M.n);y>M.d&&c.addScaledVector(M.n,M.d-y)}const x=c.dot(i)*a+r,m=x-Math.floor(x),w=1+(Math.floor(x)+bt.smoothstep(m,.62,1)-x)/a*.55*n.strata;c.x*=w,c.z*=w,c.multiplyScalar(1+Di(c.x*7,c.y*7,c.z*7,n.seed+5)*.035),c.y<l&&(c.y=l),o.setXYZ(h,c.x*n.rx,(c.y-l)*n.ry,c.z*n.rz)}e.computeVertexNormals();const d=e.attributes.normal,f=new Float32Array(o.count*3),u=new Float32Array(o.count*2);for(let h=0;h<o.count;h++){const p=.9+.2*(.5+Di(o.getX(h)*5,o.getY(h)*5,o.getZ(h)*5,n.seed+9));f[h*3]=n.tone.r*p,f[h*3+1]=n.tone.g*p,f[h*3+2]=n.tone.b*p;const x=Math.abs(d.getX(h)),m=Math.abs(d.getY(h)),g=Math.abs(d.getZ(h));m>=x&&m>=g?(u[h*2]=o.getX(h),u[h*2+1]=o.getZ(h)):x>=g?(u[h*2]=o.getZ(h),u[h*2+1]=o.getY(h)):(u[h*2]=o.getX(h),u[h*2+1]=o.getY(h))}return e.setAttribute("color",new lt(f,3)),e.setAttribute("uv",new lt(u,2)),e}function os(t=1){const n=fn(Math.floor(t*9973)+17),e=[],o=new oe().setHSL(.09+(n()-.5)*.08,.04+n()*.05,.86+(n()-.5)*.12),s=1+Math.floor(n()*2.4);for(let c=0;c<s;c++){const l=(c===0?.55:.2+n()*.22)*t,d=n()*Math.PI*2,f=c===0?0:(.55+n()*.3)*t,u=yl(n,{detail:c===0?6:4,seed:11+c*5+Math.floor(n()*40),rx:l*(1.05+n()*.25),ry:l*(.82+n()*.3),rz:l*(.9+n()*.25),cuts:4+Math.floor(n()*4),strata:.6+n()*.5,tone:o.clone().offsetHSL(0,0,(n()-.5)*.07)}),h=new at().compose(new X(Math.cos(d)*f,0,Math.sin(d)*f),new _n().setFromEuler(new fs(c===0?0:(n()-.5)*.2,n()*6.28,c===0?0:(n()-.5)*.2)),new X(1,1,1));u.applyMatrix4(h),e.push(u)}const i=2+Math.floor(n()*3);for(let c=0;c<i;c++){const l=(.05+n()*.06)*t,d=n()*Math.PI*2,f=(.6+n()*.5)*t,u=yl(n,{detail:2,seed:40+c,rx:l*1.2,ry:l*.8,rz:l,cuts:3,strata:.2,tone:o.clone().offsetHSL(0,0,(n()-.5)*.1)});u.rotateY(n()*6.28),u.translate(Math.cos(d)*f,0,Math.sin(d)*f),e.push(u)}const a=Wn(e,!1);for(const c of e)c.dispose();const r=new V(a,m0());return r.castShadow=!0,r.receiveShadow=!0,r}function bf(t){const n=new Xe,e=new oe(9210756),o=[],s=(d,f,u=e,h=1,p=1,x=1)=>{o.push(hn(d,Un(0,f,0,h,p,x),u,(m,g)=>.78+.22*bt.clamp(.5+.5*g,0,1)))};s(new Wo(.46,.14,.46,1,.03),.07),s(new we(.075,.1,.62,10),.45),s(new Wo(.34,.08,.34,1,.025),.8);for(const[d,f]of[[-.13,-.13],[.13,-.13],[-.13,.13],[.13,.13]])o.push(hn(new Ye(.045,.34,.045),Un(d,1.02,f),e.clone().multiplyScalar(.9)));s(new Wo(.4,.07,.4,1,.025),1.22);const i=new xt(.34,.24,4,1);o.push(hn(i,Un(0,1.38,0,1,1,1,0,Math.PI/4,0),e.clone().multiplyScalar(.85))),s(new Se(.05,10,8),1.55);const a=new V(Wn(o,!1),x0(.9,"lantern"));a.castShadow=!0,a.receiveShadow=!0;const r=h0(t,.9),c=new V(new Ye(.2,.3,.2),r);c.position.y=1.02;const l=new ro(t,.8,6);return l.position.y=1.05,n.add(a,c,l),n}function X5(){const t=[],n=new we(.004,.006,.26,4,1);n.translate(0,.13,0),t.push(hn(n,Un(0,0,0),new oe(.2,.34,.12)));for(let o=0;o<6;o++){const s=new Ds(1,7);s.scale(.022,.044,1),s.translate(0,.046,0),s.rotateX(-Math.PI/2),t.push(hn(s,Li(0,.27,0,o/6*Math.PI*2,-.45),new oe(1,1,1)))}t.push(hn(new Se(.014,6,5),Un(0,.275,0),new oe(1,.82,.25)));const e=new Qe(.07,.022,2,1);return e.translate(.035,0,0),e.rotateX(-Math.PI/2),t.push(hn(e,Li(0,.07,0,.6,.4),new oe(.22,.4,.14))),t.push(hn(e,Li(0,.1,0,3.5,.4),new oe(.22,.4,.14))),Wn(t,!1)}function Sf(t,n,e=26){const o=fn(t),s=[];for(let i=0;i<e;i++){const a=new X(o()-.5,o()*.7-.1,o()-.5).normalize();s.push(z5(a.multiplyScalar(n*(.35+o()*.65)),n*(.7+o()*.5),o,a.y))}return s}function js(t,n,e){const o=Sf(t,n,e),s=Wn(o,!1);for(const i of o)i.dispose();return s}function yf(t=1,n="high"){const e=b0(t,n);e.updateMatrixWorld(!0);const o=[];return e.traverse(s=>{const i=s;if(!i.isMesh)return;const a=i.geometry.clone();a.applyMatrix4(i.matrixWorld),o.push({geometry:a,material:i.material}),i.geometry.dispose()}),o}const zi=3,K5={broadleaf:900,pine:1100,bush:1200,rock:500},q5={high:1,med:.6,low:.35},Tf=60,Y5={broadleaf:[.8,1.6],pine:[.9,2],bush:[.7,1.5],rock:[.5,1.3]};function $5(t){let n=(t|0)>>>0;return()=>{n=n+1831565813>>>0;let e=n;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}}function oa(t,n,e){let o=Math.imul(t,374761393)^Math.imul(n,668265263)^Math.imul(e|0,2246822519);return o=Math.imul(o^o>>>13,1274126177),o^=o>>>16,(o>>>0)/4294967296}function Tl(t,n,e){const o=Math.floor(t),s=Math.floor(n),i=t-o,a=n-s,r=i*i*(3-2*i),c=a*a*(3-2*a),l=oa(o,s,e),d=oa(o+1,s,e),f=oa(o,s+1,e),u=oa(o+1,s+1,e);return l+(d-l)*r+(f-l)*c+(l-d-f+u)*r*c}function Wr(t,n,e){const o=Math.min(1,Math.max(0,(e-t)/(n-t)));return o*o*(3-2*o)}function Ef(t,n,e){return Math.min(e.halfW-Math.abs(t-e.centerX),e.halfD-Math.abs(n-e.centerZ))}function j5(t,n,e){const o=Tl(t/85,n/85,e.seed)*.7+Tl(t/34,n/34,e.seed+101)*.3,s=Wr(.42,.62,o),i=1-Wr(0,Tf,Math.max(0,Ef(t,n,e)));return Math.min(1,Math.max(s,i*.95))}function Z5(t,n,e){if(Math.abs(t-e.centerX)<(e.clearCenterStrip??0))return!0;for(const[o,s,i]of e.avoidCircles??[])if(Math.hypot(t-o,n-s)<=i)return!0;for(const o of e.avoidEllipses??[]){const s=(t-o.x)/o.rx,i=(n-o.z)/o.rz;if(s*s+i*i<=1)return!0}for(const o of e.avoidSegments??[]){const s=o.bx-o.ax,i=o.bz-o.az,a=s*s+i*i,r=a>0?Math.min(1,Math.max(0,((t-o.ax)*s+(n-o.az)*i)/a)):0;if(Math.hypot(t-(o.ax+s*r),n-(o.az+i*r))<=o.halfWidth)return!0}return!1}function Q5(t){if(!(t.halfW>0)||!(t.halfD>0))return[];const n=t.decorStyle==="space",e=$5(t.seed*2654435761+12345),o=4*t.halfW*t.halfD,s=Math.min(6,Math.max(3.5,Math.sqrt(o/14e3))),i=Math.ceil(t.halfW*2/s),a=Math.ceil(t.halfD*2/s),r=t.centerX-t.halfW,c=t.centerZ-t.halfD,l=[];for(let u=0;u<a;u++)for(let h=0;h<i;h++){const p=e(),x=e(),m=e(),g=e(),v=e(),w=e(),M=e(),y=e(),b=e(),T=e(),_=r+(h+p)*s,S=c+(u+x)*s;if(_<r||_>r+t.halfW*2||S<c||S>c+t.halfD*2)continue;const E=j5(_,S,t),A=1-Wr(0,Tf,Math.max(0,Ef(_,S,t)));let R;if(n?m<.12&&(R="rock"):E>.5&&m<(E-.3)*1.1?R=g<.3+.6*A?"pine":"broadleaf":E>.2&&v<.18+.3*E?R="bush":w<.05&&(R="rock"),!R||Z5(_,S,t))continue;const C=t.groundY(_,S);if(!Number.isFinite(C))continue;const[I,L]=Y5[R],N=I+M*(L-I);l.push({kind:R,variant:Math.min(zi-1,Math.floor(y*zi)),x:_,y:R==="rock"?C-.04*N:C,z:S,scale:N,rotY:b*Math.PI*2,keep:T*(1.15-E)})}const d=q5[t.quality]??1,f=[];for(const u of["broadleaf","pine","bush","rock"]){const h=Math.floor(K5[u]*d),p=l.filter(m=>m.kind===u).sort((m,g)=>m.keep-g.keep||m.x-g.x||m.z-g.z),x=Math.min(h,Math.floor(p.length*d));for(let m=0;m<x;m++){const{keep:g,...v}=p[m];f.push(v)}}return f}const J5=[1,1.13,1.27],El=.4;function ev(t,n,e){const o=J5[n%zi];return t==="broadleaf"?ks(o,e):t==="pine"?Ki(o,e):t==="bush"?b0(o,e):os(o)}function tv(t){const n=t.attributes.position.count,e=new jt;if(e.setAttribute("position",t.attributes.position.clone()),e.setAttribute("normal",t.attributes.normal?t.attributes.normal.clone():new lt(new Float32Array(n*3),3)),t.attributes.color?e.setAttribute("color",t.attributes.color.clone()):e.setAttribute("color",new lt(new Float32Array(n*3).fill(1),3)),e.setAttribute("uv",t.attributes.uv?t.attributes.uv.clone():new lt(new Float32Array(n*2),2)),t.attributes.aSway&&e.setAttribute("aSway",t.attributes.aSway.clone()),t.index)e.setIndex(t.index.clone());else{const o=new Uint32Array(n);for(let s=0;s<n;s++)o[s]=s;e.setIndex(new lt(o,1))}return t.attributes.normal||e.computeVertexNormals(),e}function nv(t){t.updateMatrixWorld(!0);const n=[];return t.traverse(e=>{const o=e;if(!o.isMesh)return;const s=tv(o.geometry),i=new at().copy(t.matrixWorld).invert().multiply(o.matrixWorld);i.equals(new at)||s.applyMatrix4(i),n.push({material:o.material,geometry:s}),o.geometry.dispose()}),n}function Af(t,n={}){const e=x0(.5,"berry"),o=n.lodDistance??70,s=n.castShadow??!0,i=new Xe;i.name="vegetation";const a=new Map,r=(E,A)=>{const R=`${E}:${A}`;let C=a.get(R);if(!C){C={high:new Map,low:new Map};for(const I of["high","low"]){if(E==="rock"&&I==="low"){C.low=C.high;continue}const L=ev(E,A,I),N=nv(L),U=I==="high"?C.high:C.low;for(const F of N)I==="low"&&F.material===e||U.has(F.material)?F.geometry.dispose():U.set(F.material,F.geometry)}a.set(R,C)}return C},c=new Map;for(const E of t){const A=`${E.kind}:${E.variant}`,R=c.get(A);R?R.push(E):c.set(A,[E])}for(const E of c.keys()){const[A,R]=E.split(":");r(A,Number(R))}const l=new Map,d=E=>{let A=l.get(E);return A||(A={material:E,geos:new Set,instanceCount:0},l.set(E,A)),A};for(const[E,A]of c){const R=a.get(E),C=new Set([...R.high.keys(),...R.low.keys()]);for(const I of C){const L=d(I),N=R.high.get(I),U=R.low.get(I);N&&L.geos.add(N),U&&L.geos.add(U),L.instanceCount+=A.length}}const f=new Map,u=new Map,h=[];for(const[E,A]of l){let R=0,C=0;for(const L of A.geos)R+=L.attributes.position.count,C+=L.index.count,h.push(L);const I=new Fh(Math.max(1,A.instanceCount),Math.max(1,R),Math.max(1,C),E);I.perObjectFrustumCulled=!0,I.frustumCulled=!1,I.castShadow=s,I.receiveShadow=!0,I.sortObjects=!1,ls(I,E);for(const L of A.geos)u.set(L,I.addGeometry(L));f.set(E,I),i.add(I)}const p=[],x=new at,m=new _n,g=new X,v=new X,w=new X(0,1,0);for(const E of t){const A=a.get(`${E.kind}:${E.variant}`);g.set(E.x,E.y,E.z),m.setFromAxisAngle(w,E.rotY),v.setScalar(E.scale),x.compose(g,m,v);const R=[],C=new Set([...A.high.keys(),...A.low.keys()]);for(const I of C){const L=f.get(I),N=A.high.get(I),U=A.low.get(I),F=N?u.get(N):-1,z=U?u.get(U):-1,G=L.addInstance(F>=0?F:z);L.setMatrixAt(G,x),R.push({batch:L,instanceId:G,highGeo:F,lowGeo:z})}p.push({x:E.x,z:E.z,slots:R,lod:null})}const M=o*o;let y=El,b=performance.now();const T=new X,_=(E,A)=>{E.lod=A;for(const R of E.slots){const C=A==="high"?R.highGeo:R.lowGeo;C<0?R.batch.setVisibleAt(R.instanceId,!1):(R.batch.setGeometryIdAt(R.instanceId,C),R.batch.setVisibleAt(R.instanceId,!0))}};return{group:i,update(E){const A=performance.now();if(y+=(A-b)/1e3,b=A,!(y<El)){y=0,E.getWorldPosition(T);for(const R of p){const C=R.x-T.x,I=R.z-T.z,L=C*C+I*I<M?"high":"low";L!==R.lod&&_(R,L)}}},dispose(){for(const E of f.values())i.remove(E),E.dispose();f.clear();for(const E of h)E.dispose();h.length=0,p.length=0,i.removeFromParent()}}}class ov{constructor(){this._previousTime=0,this._currentTime=0,this._startTime=performance.now(),this._delta=0,this._elapsed=0,this._timescale=1,this._document=null,this._pageVisibilityHandler=null}connect(n){this._document=n,n.hidden!==void 0&&(this._pageVisibilityHandler=sv.bind(this),n.addEventListener("visibilitychange",this._pageVisibilityHandler,!1))}disconnect(){this._pageVisibilityHandler!==null&&(this._document.removeEventListener("visibilitychange",this._pageVisibilityHandler),this._pageVisibilityHandler=null),this._document=null}getDelta(){return this._delta/1e3}getElapsed(){return this._elapsed/1e3}getTimescale(){return this._timescale}setTimescale(n){return this._timescale=n,this}reset(){return this._currentTime=performance.now()-this._startTime,this}dispose(){this.disconnect()}update(n){return this._pageVisibilityHandler!==null&&this._document.hidden===!0?this._delta=0:(this._previousTime=this._currentTime,this._currentTime=(n!==void 0?n:performance.now())-this._startTime,this._delta=(this._currentTime-this._previousTime)*this._timescale,this._elapsed+=this._delta),this}}function sv(){this._document.hidden===!1&&this.reset()}const Rs={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

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


		}`};class Us{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}}const iv=new Fa(-1,1,1,-1,0,1);class av extends jt{constructor(){super(),this.setAttribute("position",new Jt([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new Jt([0,2,0,0,2,0],2))}}const rv=new av;class Xa{constructor(n){this._mesh=new V(rv,n)}dispose(){this._mesh.geometry.dispose()}render(n){n.render(this._mesh,iv)}get material(){return this._mesh.material}set material(n){this._mesh.material=n}}class Rf extends Us{constructor(n,e="tDiffuse"){super(),this.textureID=e,this.uniforms=null,this.material=null,n instanceof nn?(this.uniforms=n.uniforms,this.material=n):n&&(this.uniforms=Po.clone(n.uniforms),this.material=new nn({name:n.name!==void 0?n.name:"unspecified",defines:Object.assign({},n.defines),uniforms:this.uniforms,vertexShader:n.vertexShader,fragmentShader:n.fragmentShader})),this._fsQuad=new Xa(this.material)}render(n,e,o){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=o.texture),this._fsQuad.material=this.material,this.renderToScreen?(n.setRenderTarget(null),this._fsQuad.render(n)):(n.setRenderTarget(e),this.clear&&n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil),this._fsQuad.render(n))}dispose(){this.material.dispose(),this._fsQuad.dispose()}}class Al extends Us{constructor(n,e){super(),this.scene=n,this.camera=e,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(n,e,o){const s=n.getContext(),i=n.state;i.buffers.color.setMask(!1),i.buffers.depth.setMask(!1),i.buffers.color.setLocked(!0),i.buffers.depth.setLocked(!0);let a,r;this.inverse?(a=0,r=1):(a=1,r=0),i.buffers.stencil.setTest(!0),i.buffers.stencil.setOp(s.REPLACE,s.REPLACE,s.REPLACE),i.buffers.stencil.setFunc(s.ALWAYS,a,4294967295),i.buffers.stencil.setClear(r),i.buffers.stencil.setLocked(!0),n.setRenderTarget(o),this.clear&&n.clear(),n.render(this.scene,this.camera),n.setRenderTarget(e),this.clear&&n.clear(),n.render(this.scene,this.camera),i.buffers.color.setLocked(!1),i.buffers.depth.setLocked(!1),i.buffers.color.setMask(!0),i.buffers.depth.setMask(!0),i.buffers.stencil.setLocked(!1),i.buffers.stencil.setFunc(s.EQUAL,1,4294967295),i.buffers.stencil.setOp(s.KEEP,s.KEEP,s.KEEP),i.buffers.stencil.setLocked(!0)}}class cv extends Us{constructor(){super(),this.needsSwap=!1}render(n){n.state.buffers.stencil.setLocked(!1),n.state.buffers.stencil.setTest(!1)}}class lv{constructor(n,e){if(this.renderer=n,this._pixelRatio=n.getPixelRatio(),e===void 0){const o=n.getSize(new ot);this._width=o.width,this._height=o.height,e=new wn(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:Cn}),e.texture.name="EffectComposer.rt1"}else this._width=e.width,this._height=e.height;this.renderTarget1=e,this.renderTarget2=e.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new Rf(Rs),this.copyPass.material.blending=vn,this.timer=new Oh}swapBuffers(){const n=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=n}addPass(n){this.passes.push(n),n.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(n,e){this.passes.splice(e,0,n),n.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(n){const e=this.passes.indexOf(n);e!==-1&&this.passes.splice(e,1)}isLastEnabledPass(n){for(let e=n+1;e<this.passes.length;e++)if(this.passes[e].enabled)return!1;return!0}render(n){this.timer.update(),n===void 0&&(n=this.timer.getDelta());const e=this.renderer.getRenderTarget();let o=!1;for(let s=0,i=this.passes.length;s<i;s++){const a=this.passes[s];if(a.enabled!==!1){if(a.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(s),a.render(this.renderer,this.writeBuffer,this.readBuffer,n,o),a.needsSwap){if(o){const r=this.renderer.getContext(),c=this.renderer.state.buffers.stencil;c.setFunc(r.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,n),c.setFunc(r.EQUAL,1,4294967295)}this.swapBuffers()}Al!==void 0&&(a instanceof Al?o=!0:a instanceof cv&&(o=!1))}}this.renderer.setRenderTarget(e)}reset(n){if(n===void 0){const e=this.renderer.getSize(new ot);this._pixelRatio=this.renderer.getPixelRatio(),this._width=e.width,this._height=e.height,n=this.renderTarget1.clone(),n.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=n,this.renderTarget2=n.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(n,e){this._width=n,this._height=e;const o=this._width*this._pixelRatio,s=this._height*this._pixelRatio;this.renderTarget1.setSize(o,s),this.renderTarget2.setSize(o,s);for(let i=0;i<this.passes.length;i++)this.passes[i].setSize(o,s)}setPixelRatio(n){this._pixelRatio=n,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}}class dv extends Us{constructor(n,e,o=null,s=null,i=null){super(),this.scene=n,this.camera=e,this.overrideMaterial=o,this.clearColor=s,this.clearAlpha=i,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this.isRenderPass=!0,this._oldClearColor=new oe}render(n,e,o){const s=n.autoClear;n.autoClear=!1;let i,a;this.overrideMaterial!==null&&(a=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(n.getClearColor(this._oldClearColor),n.setClearColor(this.clearColor,n.getClearAlpha())),this.clearAlpha!==null&&(i=n.getClearAlpha(),n.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&n.clearDepth(),n.setRenderTarget(this.renderToScreen?null:o),this.clear===!0&&n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil),n.render(this.scene,this.camera),this.clearColor!==null&&n.setClearColor(this._oldClearColor),this.clearAlpha!==null&&n.setClearAlpha(i),this.overrideMaterial!==null&&(this.scene.overrideMaterial=a),n.autoClear=s}}const fv={uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new oe(0)},defaultOpacity:{value:0}},vertexShader:`

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

		}`};class ri extends Us{constructor(n,e=1,o,s){super(),this.strength=e,this.radius=o,this.threshold=s,this.resolution=n!==void 0?new ot(n.x,n.y):new ot(256,256),this.clearColor=new oe(0,0,0),this.needsSwap=!1,this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let i=Math.round(this.resolution.x/2),a=Math.round(this.resolution.y/2);this.renderTargetBright=new wn(i,a,{type:Cn}),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let d=0;d<this.nMips;d++){const f=new wn(i,a,{type:Cn});f.texture.name="UnrealBloomPass.h"+d,f.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(f);const u=new wn(i,a,{type:Cn});u.texture.name="UnrealBloomPass.v"+d,u.texture.generateMipmaps=!1,this.renderTargetsVertical.push(u),i=Math.round(i/2),a=Math.round(a/2)}const r=fv;this.highPassUniforms=Po.clone(r.uniforms),this.highPassUniforms.luminosityThreshold.value=s,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new nn({uniforms:this.highPassUniforms,vertexShader:r.vertexShader,fragmentShader:r.fragmentShader}),this.separableBlurMaterials=[];const c=[6,10,14,18,22];i=Math.round(this.resolution.x/2),a=Math.round(this.resolution.y/2);for(let d=0;d<this.nMips;d++)this.separableBlurMaterials.push(this._getSeparableBlurMaterial(c[d])),this.separableBlurMaterials[d].uniforms.invSize.value=new ot(1/i,1/a),i=Math.round(i/2),a=Math.round(a/2);this.compositeMaterial=this._getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=e,this.compositeMaterial.uniforms.bloomRadius.value=.1;const l=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=l,this.bloomTintColors=[new X(1,1,1),new X(1,1,1),new X(1,1,1),new X(1,1,1),new X(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,this.copyUniforms=Po.clone(Rs.uniforms),this.blendMaterial=new nn({uniforms:this.copyUniforms,vertexShader:Rs.vertexShader,fragmentShader:Rs.fragmentShader,premultipliedAlpha:!0,blending:ys,depthTest:!1,depthWrite:!1,transparent:!0}),this._oldClearColor=new oe,this._oldClearAlpha=1,this._basic=new Tt,this._fsQuad=new Xa(null)}dispose(){for(let n=0;n<this.renderTargetsHorizontal.length;n++)this.renderTargetsHorizontal[n].dispose();for(let n=0;n<this.renderTargetsVertical.length;n++)this.renderTargetsVertical[n].dispose();this.renderTargetBright.dispose();for(let n=0;n<this.separableBlurMaterials.length;n++)this.separableBlurMaterials[n].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this._basic.dispose(),this._fsQuad.dispose()}setSize(n,e){let o=Math.round(n/2),s=Math.round(e/2);this.renderTargetBright.setSize(o,s);for(let i=0;i<this.nMips;i++)this.renderTargetsHorizontal[i].setSize(o,s),this.renderTargetsVertical[i].setSize(o,s),this.separableBlurMaterials[i].uniforms.invSize.value=new ot(1/o,1/s),o=Math.round(o/2),s=Math.round(s/2)}render(n,e,o,s,i){n.getClearColor(this._oldClearColor),this._oldClearAlpha=n.getClearAlpha();const a=n.autoClear;n.autoClear=!1,n.setClearColor(this.clearColor,0),i&&n.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this._fsQuad.material=this._basic,this._basic.map=o.texture,n.setRenderTarget(null),n.clear(),this._fsQuad.render(n)),this.highPassUniforms.tDiffuse.value=o.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this._fsQuad.material=this.materialHighPassFilter,n.setRenderTarget(this.renderTargetBright),n.clear(),this._fsQuad.render(n);let r=this.renderTargetBright;for(let c=0;c<this.nMips;c++)this._fsQuad.material=this.separableBlurMaterials[c],this.separableBlurMaterials[c].uniforms.colorTexture.value=r.texture,this.separableBlurMaterials[c].uniforms.direction.value=ri.BlurDirectionX,n.setRenderTarget(this.renderTargetsHorizontal[c]),n.clear(),this._fsQuad.render(n),this.separableBlurMaterials[c].uniforms.colorTexture.value=this.renderTargetsHorizontal[c].texture,this.separableBlurMaterials[c].uniforms.direction.value=ri.BlurDirectionY,n.setRenderTarget(this.renderTargetsVertical[c]),n.clear(),this._fsQuad.render(n),r=this.renderTargetsVertical[c];this._fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,n.setRenderTarget(this.renderTargetsHorizontal[0]),n.clear(),this._fsQuad.render(n),this._fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,i&&n.state.buffers.stencil.setTest(!0),this.renderToScreen?(n.setRenderTarget(null),this._fsQuad.render(n)):(n.setRenderTarget(o),this._fsQuad.render(n)),n.setClearColor(this._oldClearColor,this._oldClearAlpha),n.autoClear=a}_getSeparableBlurMaterial(n){const e=[],o=n/3;for(let s=0;s<n;s++)e.push(.39894*Math.exp(-.5*s*s/(o*o))/o);return new nn({defines:{KERNEL_RADIUS:n},uniforms:{colorTexture:{value:null},invSize:{value:new ot(.5,.5)},direction:{value:new ot(.5,.5)},gaussianCoefficients:{value:e}},vertexShader:`

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

				}`})}_getCompositeMaterial(n){return new nn({defines:{NUM_MIPS:n},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`

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

				}`})}}ri.BlurDirectionX=new ot(1,0);ri.BlurDirectionY=new ot(0,1);const sa={name:"OutputShader",uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
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

		}`};class uv extends Us{constructor(){super(),this.isOutputPass=!0,this.uniforms=Po.clone(sa.uniforms),this.material=new xd({name:sa.name,uniforms:this.uniforms,vertexShader:sa.vertexShader,fragmentShader:sa.fragmentShader}),this._fsQuad=new Xa(this.material),this._outputColorSpace=null,this._toneMapping=null}render(n,e,o){this.uniforms.tDiffuse.value=o.texture,this.uniforms.toneMappingExposure.value=n.toneMappingExposure,(this._outputColorSpace!==n.outputColorSpace||this._toneMapping!==n.toneMapping)&&(this._outputColorSpace=n.outputColorSpace,this._toneMapping=n.toneMapping,this.material.defines={},Xt.getTransfer(this._outputColorSpace)===Bt&&(this.material.defines.SRGB_TRANSFER=""),this._toneMapping===r0?this.material.defines.LINEAR_TONE_MAPPING="":this._toneMapping===a0?this.material.defines.REINHARD_TONE_MAPPING="":this._toneMapping===i0?this.material.defines.CINEON_TONE_MAPPING="":this._toneMapping===s0?this.material.defines.ACES_FILMIC_TONE_MAPPING="":this._toneMapping===Ba?this.material.defines.AGX_TONE_MAPPING="":this._toneMapping===o0?this.material.defines.NEUTRAL_TONE_MAPPING="":this._toneMapping===n0&&(this.material.defines.CUSTOM_TONE_MAPPING=""),this.material.needsUpdate=!0),this.renderToScreen===!0?(n.setRenderTarget(null),this._fsQuad.render(n)):(n.setRenderTarget(e),this.clear&&n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil),this._fsQuad.render(n))}dispose(){this.material.dispose(),this._fsQuad.dispose()}}const ia={defines:{PERSPECTIVE_CAMERA:1,SAMPLES:16,NORMAL_VECTOR_TYPE:1,DEPTH_SWIZZLING:"x",SCREEN_SPACE_RADIUS:0,SCREEN_SPACE_RADIUS_SCALE:100,SCENE_CLIP_BOX:0},uniforms:{tNormal:{value:null},tDepth:{value:null},tNoise:{value:null},resolution:{value:new ot},cameraNear:{value:null},cameraFar:{value:null},cameraProjectionMatrix:{value:new at},cameraProjectionMatrixInverse:{value:new at},cameraWorldMatrix:{value:new at},radius:{value:.25},distanceExponent:{value:1},thickness:{value:1},distanceFallOff:{value:1},scale:{value:1},sceneBoxMin:{value:new X(-1,-1,-1)},sceneBoxMax:{value:new X(1,1,1)}},vertexShader:`

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
		}`},aa={defines:{PERSPECTIVE_CAMERA:1},uniforms:{tDepth:{value:null},cameraNear:{value:null},cameraFar:{value:null}},vertexShader:`
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

		}`},wr={uniforms:{tDiffuse:{value:null},intensity:{value:1}},vertexShader:`
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
		}`};function hv(t=5){const n=Math.floor(t)%2===0?Math.floor(t)+1:Math.floor(t),e=pv(n),o=e.length,s=new Uint8Array(o*4);for(let a=0;a<o;++a){const r=e[a],c=2*Math.PI*r/o,l=new X(Math.cos(c),Math.sin(c),0).normalize();s[a*4]=(l.x*.5+.5)*255,s[a*4+1]=(l.y*.5+.5)*255,s[a*4+2]=127,s[a*4+3]=255}const i=new Ls(s,n,n);return i.wrapS=Hn,i.wrapT=Hn,i.needsUpdate=!0,i}function pv(t){const n=Math.floor(t)%2===0?Math.floor(t)+1:Math.floor(t),e=n*n,o=Array(e).fill(0);let s=Math.floor(n/2),i=n-1;for(let a=1;a<=e;){if(s===-1&&i===n?(i=n-2,s=0):(i===n&&(i=0),s<0&&(s=n-1)),o[s*n+i]!==0){i-=2,s++;continue}else o[s*n+i]=a++;i++,s--}return o}const ra={defines:{SAMPLES:16,SAMPLE_VECTORS:Pf(16,2,1),NORMAL_VECTOR_TYPE:1,DEPTH_VALUE_SOURCE:0},uniforms:{tDiffuse:{value:null},tNormal:{value:null},tDepth:{value:null},tNoise:{value:null},resolution:{value:new ot},cameraProjectionMatrixInverse:{value:new at},lumaPhi:{value:5},depthPhi:{value:5},normalPhi:{value:5},radius:{value:4},index:{value:0}},vertexShader:`

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
		}`};function Pf(t,n,e){const o=mv(t,n,e);let s="vec3[SAMPLES](";for(let i=0;i<t;i++){const a=o[i];s+=`vec3(${a.x}, ${a.y}, ${a.z})${i<t-1?",":")"}`}return s}function mv(t,n,e){const o=[];for(let s=0;s<t;s++){const i=2*Math.PI*n*s/t,a=Math.pow(s/(t-1),e);o.push(new X(Math.cos(i),Math.sin(i),a))}return o}class gv{constructor(n=Math){this.grad3=[[1,1,0],[-1,1,0],[1,-1,0],[-1,-1,0],[1,0,1],[-1,0,1],[1,0,-1],[-1,0,-1],[0,1,1],[0,-1,1],[0,1,-1],[0,-1,-1]],this.grad4=[[0,1,1,1],[0,1,1,-1],[0,1,-1,1],[0,1,-1,-1],[0,-1,1,1],[0,-1,1,-1],[0,-1,-1,1],[0,-1,-1,-1],[1,0,1,1],[1,0,1,-1],[1,0,-1,1],[1,0,-1,-1],[-1,0,1,1],[-1,0,1,-1],[-1,0,-1,1],[-1,0,-1,-1],[1,1,0,1],[1,1,0,-1],[1,-1,0,1],[1,-1,0,-1],[-1,1,0,1],[-1,1,0,-1],[-1,-1,0,1],[-1,-1,0,-1],[1,1,1,0],[1,1,-1,0],[1,-1,1,0],[1,-1,-1,0],[-1,1,1,0],[-1,1,-1,0],[-1,-1,1,0],[-1,-1,-1,0]],this.p=[];for(let e=0;e<256;e++)this.p[e]=Math.floor(n.random()*256);this.perm=[];for(let e=0;e<512;e++)this.perm[e]=this.p[e&255];this.simplex=[[0,1,2,3],[0,1,3,2],[0,0,0,0],[0,2,3,1],[0,0,0,0],[0,0,0,0],[0,0,0,0],[1,2,3,0],[0,2,1,3],[0,0,0,0],[0,3,1,2],[0,3,2,1],[0,0,0,0],[0,0,0,0],[0,0,0,0],[1,3,2,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[1,2,0,3],[0,0,0,0],[1,3,0,2],[0,0,0,0],[0,0,0,0],[0,0,0,0],[2,3,0,1],[2,3,1,0],[1,0,2,3],[1,0,3,2],[0,0,0,0],[0,0,0,0],[0,0,0,0],[2,0,3,1],[0,0,0,0],[2,1,3,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[2,0,1,3],[0,0,0,0],[0,0,0,0],[0,0,0,0],[3,0,1,2],[3,0,2,1],[0,0,0,0],[3,1,2,0],[2,1,0,3],[0,0,0,0],[0,0,0,0],[0,0,0,0],[3,1,0,2],[0,0,0,0],[3,2,0,1],[3,2,1,0]]}noise(n,e){let o,s,i;const a=.5*(Math.sqrt(3)-1),r=(n+e)*a,c=Math.floor(n+r),l=Math.floor(e+r),d=(3-Math.sqrt(3))/6,f=(c+l)*d,u=c-f,h=l-f,p=n-u,x=e-h;let m,g;p>x?(m=1,g=0):(m=0,g=1);const v=p-m+d,w=x-g+d,M=p-1+2*d,y=x-1+2*d,b=c&255,T=l&255,_=this.perm[b+this.perm[T]]%12,S=this.perm[b+m+this.perm[T+g]]%12,E=this.perm[b+1+this.perm[T+1]]%12;let A=.5-p*p-x*x;A<0?o=0:(A*=A,o=A*A*this._dot(this.grad3[_],p,x));let R=.5-v*v-w*w;R<0?s=0:(R*=R,s=R*R*this._dot(this.grad3[S],v,w));let C=.5-M*M-y*y;return C<0?i=0:(C*=C,i=C*C*this._dot(this.grad3[E],M,y)),70*(o+s+i)}noise3d(n,e,o){let s,i,a,r;const l=(n+e+o)*.3333333333333333,d=Math.floor(n+l),f=Math.floor(e+l),u=Math.floor(o+l),h=1/6,p=(d+f+u)*h,x=d-p,m=f-p,g=u-p,v=n-x,w=e-m,M=o-g;let y,b,T,_,S,E;v>=w?w>=M?(y=1,b=0,T=0,_=1,S=1,E=0):v>=M?(y=1,b=0,T=0,_=1,S=0,E=1):(y=0,b=0,T=1,_=1,S=0,E=1):w<M?(y=0,b=0,T=1,_=0,S=1,E=1):v<M?(y=0,b=1,T=0,_=0,S=1,E=1):(y=0,b=1,T=0,_=1,S=1,E=0);const A=v-y+h,R=w-b+h,C=M-T+h,I=v-_+2*h,L=w-S+2*h,N=M-E+2*h,U=v-1+3*h,F=w-1+3*h,z=M-1+3*h,G=d&255,O=f&255,B=u&255,J=this.perm[G+this.perm[O+this.perm[B]]]%12,ue=this.perm[G+y+this.perm[O+b+this.perm[B+T]]]%12,xe=this.perm[G+_+this.perm[O+S+this.perm[B+E]]]%12,j=this.perm[G+1+this.perm[O+1+this.perm[B+1]]]%12;let ie=.6-v*v-w*w-M*M;ie<0?s=0:(ie*=ie,s=ie*ie*this._dot3(this.grad3[J],v,w,M));let ne=.6-A*A-R*R-C*C;ne<0?i=0:(ne*=ne,i=ne*ne*this._dot3(this.grad3[ue],A,R,C));let ye=.6-I*I-L*L-N*N;ye<0?a=0:(ye*=ye,a=ye*ye*this._dot3(this.grad3[xe],I,L,N));let Ie=.6-U*U-F*F-z*z;return Ie<0?r=0:(Ie*=Ie,r=Ie*Ie*this._dot3(this.grad3[j],U,F,z)),32*(s+i+a+r)}noise4d(n,e,o,s){const i=this.grad4,a=this.simplex,r=this.perm,c=(Math.sqrt(5)-1)/4,l=(5-Math.sqrt(5))/20;let d,f,u,h,p;const x=(n+e+o+s)*c,m=Math.floor(n+x),g=Math.floor(e+x),v=Math.floor(o+x),w=Math.floor(s+x),M=(m+g+v+w)*l,y=m-M,b=g-M,T=v-M,_=w-M,S=n-y,E=e-b,A=o-T,R=s-_,C=S>E?32:0,I=S>A?16:0,L=E>A?8:0,N=S>R?4:0,U=E>R?2:0,F=A>R?1:0,z=C+I+L+N+U+F,G=a[z][0]>=3?1:0,O=a[z][1]>=3?1:0,B=a[z][2]>=3?1:0,J=a[z][3]>=3?1:0,ue=a[z][0]>=2?1:0,xe=a[z][1]>=2?1:0,j=a[z][2]>=2?1:0,ie=a[z][3]>=2?1:0,ne=a[z][0]>=1?1:0,ye=a[z][1]>=1?1:0,Ie=a[z][2]>=1?1:0,Fe=a[z][3]>=1?1:0,tt=S-G+l,je=E-O+l,_t=A-B+l,gt=R-J+l,nt=S-ue+2*l,Pt=E-xe+2*l,kt=A-j+2*l,xn=R-ie+2*l,W=S-ne+3*l,Qt=E-ye+3*l,rt=A-Ie+3*l,At=R-Fe+3*l,Te=S-1+4*l,Ht=E-1+4*l,k=A-1+4*l,P=R-1+4*l,q=m&255,se=g&255,de=v&255,pe=w&255,Me=r[q+r[se+r[de+r[pe]]]]%32,ee=r[q+G+r[se+O+r[de+B+r[pe+J]]]]%32,re=r[q+ue+r[se+xe+r[de+j+r[pe+ie]]]]%32,Ce=r[q+ne+r[se+ye+r[de+Ie+r[pe+Fe]]]]%32,Oe=r[q+1+r[se+1+r[de+1+r[pe+1]]]]%32;let ve=.6-S*S-E*E-A*A-R*R;ve<0?d=0:(ve*=ve,d=ve*ve*this._dot4(i[Me],S,E,A,R));let me=.6-tt*tt-je*je-_t*_t-gt*gt;me<0?f=0:(me*=me,f=me*me*this._dot4(i[ee],tt,je,_t,gt));let $e=.6-nt*nt-Pt*Pt-kt*kt-xn*xn;$e<0?u=0:($e*=$e,u=$e*$e*this._dot4(i[re],nt,Pt,kt,xn));let Ze=.6-W*W-Qt*Qt-rt*rt-At*At;Ze<0?h=0:(Ze*=Ze,h=Ze*Ze*this._dot4(i[Ce],W,Qt,rt,At));let ht=.6-Te*Te-Ht*Ht-k*k-P*P;return ht<0?p=0:(ht*=ht,p=ht*ht*this._dot4(i[Oe],Te,Ht,k,P)),27*(d+f+u+h+p)}_dot(n,e,o){return n[0]*e+n[1]*o}_dot3(n,e,o,s){return n[0]*e+n[1]*o+n[2]*s}_dot4(n,e,o,s,i){return n[0]*e+n[1]*o+n[2]*s+n[3]*i}}class ho extends Us{constructor(n,e,o=512,s=512,i,a,r){super(),this.width=o,this.height=s,this.clear=!0,this.camera=e,this.scene=n,this.output=0,this._renderGBuffer=!0,this._visibilityCache=[],this.blendIntensity=1,this.pdRings=2,this.pdRadiusExponent=2,this.pdSamples=16,this.gtaoNoiseTexture=hv(),this.pdNoiseTexture=this._generateNoise(),this.gtaoRenderTarget=new wn(this.width,this.height,{type:Cn}),this.pdRenderTarget=this.gtaoRenderTarget.clone(),this.gtaoMaterial=new nn({defines:Object.assign({},ia.defines),uniforms:Po.clone(ia.uniforms),vertexShader:ia.vertexShader,fragmentShader:ia.fragmentShader,blending:vn,depthTest:!1,depthWrite:!1}),this.gtaoMaterial.defines.PERSPECTIVE_CAMERA=this.camera.isPerspectiveCamera?1:0,this.gtaoMaterial.uniforms.tNoise.value=this.gtaoNoiseTexture,this.gtaoMaterial.uniforms.resolution.value.set(this.width,this.height),this.gtaoMaterial.uniforms.cameraNear.value=this.camera.near,this.gtaoMaterial.uniforms.cameraFar.value=this.camera.far,this.normalMaterial=new zh,this.normalMaterial.blending=vn,this.pdMaterial=new nn({defines:Object.assign({},ra.defines),uniforms:Po.clone(ra.uniforms),vertexShader:ra.vertexShader,fragmentShader:ra.fragmentShader,depthTest:!1,depthWrite:!1}),this.pdMaterial.uniforms.tDiffuse.value=this.gtaoRenderTarget.texture,this.pdMaterial.uniforms.tNoise.value=this.pdNoiseTexture,this.pdMaterial.uniforms.resolution.value.set(this.width,this.height),this.pdMaterial.uniforms.lumaPhi.value=10,this.pdMaterial.uniforms.depthPhi.value=2,this.pdMaterial.uniforms.normalPhi.value=3,this.pdMaterial.uniforms.radius.value=8,this.depthRenderMaterial=new nn({defines:Object.assign({},aa.defines),uniforms:Po.clone(aa.uniforms),vertexShader:aa.vertexShader,fragmentShader:aa.fragmentShader,blending:vn}),this.depthRenderMaterial.uniforms.cameraNear.value=this.camera.near,this.depthRenderMaterial.uniforms.cameraFar.value=this.camera.far,this.copyMaterial=new nn({uniforms:Po.clone(Rs.uniforms),vertexShader:Rs.vertexShader,fragmentShader:Rs.fragmentShader,transparent:!0,depthTest:!1,depthWrite:!1,blendSrc:Lr,blendDst:Ti,blendEquation:zo,blendSrcAlpha:Ir,blendDstAlpha:Ti,blendEquationAlpha:zo}),this.blendMaterial=new nn({uniforms:Po.clone(wr.uniforms),vertexShader:wr.vertexShader,fragmentShader:wr.fragmentShader,transparent:!0,depthTest:!1,depthWrite:!1,blending:Id,blendSrc:Lr,blendDst:Ti,blendEquation:zo,blendSrcAlpha:Ir,blendDstAlpha:Ti,blendEquationAlpha:zo}),this._fsQuad=new Xa(null),this._originalClearColor=new oe,this.setGBuffer(i?i.depthTexture:void 0,i?i.normalTexture:void 0),a!==void 0&&this.updateGtaoMaterial(a),r!==void 0&&this.updatePdMaterial(r)}setSize(n,e){this.width=n,this.height=e,this.gtaoRenderTarget.setSize(n,e),this.normalRenderTarget.setSize(n,e),this.pdRenderTarget.setSize(n,e),this.gtaoMaterial.uniforms.resolution.value.set(n,e),this.gtaoMaterial.uniforms.cameraProjectionMatrix.value.copy(this.camera.projectionMatrix),this.gtaoMaterial.uniforms.cameraProjectionMatrixInverse.value.copy(this.camera.projectionMatrixInverse),this.pdMaterial.uniforms.resolution.value.set(n,e),this.pdMaterial.uniforms.cameraProjectionMatrixInverse.value.copy(this.camera.projectionMatrixInverse)}dispose(){this.gtaoNoiseTexture.dispose(),this.pdNoiseTexture.dispose(),this.normalRenderTarget.dispose(),this.gtaoRenderTarget.dispose(),this.pdRenderTarget.dispose(),this.normalMaterial.dispose(),this.pdMaterial.dispose(),this.copyMaterial.dispose(),this.depthRenderMaterial.dispose(),this._fsQuad.dispose()}get gtaoMap(){return this.pdRenderTarget.texture}setGBuffer(n,e){n!==void 0?(this.depthTexture=n,this.normalTexture=e,this._renderGBuffer=!1):(this.depthTexture=new ti,this.depthTexture.format=bs,this.depthTexture.type=oi,this.normalRenderTarget=new wn(this.width,this.height,{minFilter:go,magFilter:go,type:Cn,depthTexture:this.depthTexture}),this.normalTexture=this.normalRenderTarget.texture,this._renderGBuffer=!0);const o=this.normalTexture?1:0,s=this.depthTexture===this.normalTexture?"w":"x";this.gtaoMaterial.defines.NORMAL_VECTOR_TYPE=o,this.gtaoMaterial.defines.DEPTH_SWIZZLING=s,this.gtaoMaterial.uniforms.tNormal.value=this.normalTexture,this.gtaoMaterial.uniforms.tDepth.value=this.depthTexture,this.pdMaterial.defines.NORMAL_VECTOR_TYPE=o,this.pdMaterial.defines.DEPTH_SWIZZLING=s,this.pdMaterial.uniforms.tNormal.value=this.normalTexture,this.pdMaterial.uniforms.tDepth.value=this.depthTexture,this.depthRenderMaterial.uniforms.tDepth.value=this.normalRenderTarget.depthTexture}setSceneClipBox(n){n?(this.gtaoMaterial.needsUpdate=this.gtaoMaterial.defines.SCENE_CLIP_BOX!==1,this.gtaoMaterial.defines.SCENE_CLIP_BOX=1,this.gtaoMaterial.uniforms.sceneBoxMin.value.copy(n.min),this.gtaoMaterial.uniforms.sceneBoxMax.value.copy(n.max)):(this.gtaoMaterial.needsUpdate=this.gtaoMaterial.defines.SCENE_CLIP_BOX===0,this.gtaoMaterial.defines.SCENE_CLIP_BOX=0)}updateGtaoMaterial(n){n.radius!==void 0&&(this.gtaoMaterial.uniforms.radius.value=n.radius),n.distanceExponent!==void 0&&(this.gtaoMaterial.uniforms.distanceExponent.value=n.distanceExponent),n.thickness!==void 0&&(this.gtaoMaterial.uniforms.thickness.value=n.thickness),n.distanceFallOff!==void 0&&(this.gtaoMaterial.uniforms.distanceFallOff.value=n.distanceFallOff,this.gtaoMaterial.needsUpdate=!0),n.scale!==void 0&&(this.gtaoMaterial.uniforms.scale.value=n.scale),n.samples!==void 0&&n.samples!==this.gtaoMaterial.defines.SAMPLES&&(this.gtaoMaterial.defines.SAMPLES=n.samples,this.gtaoMaterial.needsUpdate=!0),n.screenSpaceRadius!==void 0&&(n.screenSpaceRadius?1:0)!==this.gtaoMaterial.defines.SCREEN_SPACE_RADIUS&&(this.gtaoMaterial.defines.SCREEN_SPACE_RADIUS=n.screenSpaceRadius?1:0,this.gtaoMaterial.needsUpdate=!0)}updatePdMaterial(n){let e=!1;n.lumaPhi!==void 0&&(this.pdMaterial.uniforms.lumaPhi.value=n.lumaPhi),n.depthPhi!==void 0&&(this.pdMaterial.uniforms.depthPhi.value=n.depthPhi),n.normalPhi!==void 0&&(this.pdMaterial.uniforms.normalPhi.value=n.normalPhi),n.radius!==void 0&&n.radius!==this.radius&&(this.pdMaterial.uniforms.radius.value=n.radius),n.radiusExponent!==void 0&&n.radiusExponent!==this.pdRadiusExponent&&(this.pdRadiusExponent=n.radiusExponent,e=!0),n.rings!==void 0&&n.rings!==this.pdRings&&(this.pdRings=n.rings,e=!0),n.samples!==void 0&&n.samples!==this.pdSamples&&(this.pdSamples=n.samples,e=!0),e&&(this.pdMaterial.defines.SAMPLES=this.pdSamples,this.pdMaterial.defines.SAMPLE_VECTORS=Pf(this.pdSamples,this.pdRings,this.pdRadiusExponent),this.pdMaterial.needsUpdate=!0)}render(n,e,o){switch(this._renderGBuffer&&(this._overrideVisibility(),this._renderOverride(n,this.normalMaterial,this.normalRenderTarget,7829503,1),this._restoreVisibility()),this.gtaoMaterial.uniforms.cameraNear.value=this.camera.near,this.gtaoMaterial.uniforms.cameraFar.value=this.camera.far,this.gtaoMaterial.uniforms.cameraProjectionMatrix.value.copy(this.camera.projectionMatrix),this.gtaoMaterial.uniforms.cameraProjectionMatrixInverse.value.copy(this.camera.projectionMatrixInverse),this.gtaoMaterial.uniforms.cameraWorldMatrix.value.copy(this.camera.matrixWorld),this._renderPass(n,this.gtaoMaterial,this.gtaoRenderTarget,16777215,1),this.pdMaterial.uniforms.cameraProjectionMatrixInverse.value.copy(this.camera.projectionMatrixInverse),this._renderPass(n,this.pdMaterial,this.pdRenderTarget,16777215,1),this.output){case ho.OUTPUT.Off:break;case ho.OUTPUT.Diffuse:this.copyMaterial.uniforms.tDiffuse.value=o.texture,this.copyMaterial.blending=vn,this._renderPass(n,this.copyMaterial,this.renderToScreen?null:e);break;case ho.OUTPUT.AO:this.copyMaterial.uniforms.tDiffuse.value=this.gtaoRenderTarget.texture,this.copyMaterial.blending=vn,this._renderPass(n,this.copyMaterial,this.renderToScreen?null:e);break;case ho.OUTPUT.Denoise:this.copyMaterial.uniforms.tDiffuse.value=this.pdRenderTarget.texture,this.copyMaterial.blending=vn,this._renderPass(n,this.copyMaterial,this.renderToScreen?null:e);break;case ho.OUTPUT.Depth:this.depthRenderMaterial.uniforms.cameraNear.value=this.camera.near,this.depthRenderMaterial.uniforms.cameraFar.value=this.camera.far,this._renderPass(n,this.depthRenderMaterial,this.renderToScreen?null:e);break;case ho.OUTPUT.Normal:this.copyMaterial.uniforms.tDiffuse.value=this.normalRenderTarget.texture,this.copyMaterial.blending=vn,this._renderPass(n,this.copyMaterial,this.renderToScreen?null:e);break;case ho.OUTPUT.Default:this.copyMaterial.uniforms.tDiffuse.value=o.texture,this.copyMaterial.blending=vn,this._renderPass(n,this.copyMaterial,this.renderToScreen?null:e),this.blendMaterial.uniforms.intensity.value=this.blendIntensity,this.blendMaterial.uniforms.tDiffuse.value=this.pdRenderTarget.texture,this._renderPass(n,this.blendMaterial,this.renderToScreen?null:e);break;default:console.warn("THREE.GTAOPass: Unknown output type.")}}_renderPass(n,e,o,s,i){n.getClearColor(this._originalClearColor);const a=n.getClearAlpha(),r=n.autoClear;n.setRenderTarget(o),n.autoClear=!1,s!=null&&(n.setClearColor(s),n.setClearAlpha(i||0),n.clear()),this._fsQuad.material=e,this._fsQuad.render(n),n.autoClear=r,n.setClearColor(this._originalClearColor),n.setClearAlpha(a)}_renderOverride(n,e,o,s,i){n.getClearColor(this._originalClearColor);const a=n.getClearAlpha(),r=n.autoClear;n.setRenderTarget(o),n.autoClear=!1,s=e.clearColor||s,i=e.clearAlpha||i,s!=null&&(n.setClearColor(s),n.setClearAlpha(i||0),n.clear()),this.scene.overrideMaterial=e,n.render(this.scene,this.camera),this.scene.overrideMaterial=null,n.autoClear=r,n.setClearColor(this._originalClearColor),n.setClearAlpha(a)}_overrideVisibility(){const n=this.scene,e=this._visibilityCache;n.traverse(function(o){(o.isPoints||o.isLine||o.isLine2)&&o.visible&&(o.visible=!1,e.push(o))})}_restoreVisibility(){const n=this._visibilityCache;for(let e=0;e<n.length;e++)n[e].visible=!0;n.length=0}_generateNoise(n=64){const e=new gv,o=n*n*4,s=new Uint8Array(o);for(let a=0;a<n;a++)for(let r=0;r<n;r++){const c=a,l=r;s[(a*n+r)*4]=(e.noise(c,l)*.5+.5)*255,s[(a*n+r)*4+1]=(e.noise(c+n,l)*.5+.5)*255,s[(a*n+r)*4+2]=(e.noise(c,l+n)*.5+.5)*255,s[(a*n+r)*4+3]=(e.noise(c+n,l+n)*.5+.5)*255}const i=new Ls(s,n,n,kn,Rn);return i.wrapS=Hn,i.wrapT=Hn,i.needsUpdate=!0,i}}ho.OUTPUT={Off:-1,Default:0,Diffuse:1,Depth:2,Normal:3,AO:4,Denoise:5};function vv(t){const n=new Map,e=new Map,o=t.clone();return Cf(t,o,function(s,i){n.set(i,s),e.set(s,i)}),o.traverse(function(s){if(!s.isSkinnedMesh)return;const i=s,a=n.get(s),r=a.skeleton.bones;i.skeleton=a.skeleton.clone(),i.bindMatrix.copy(a.bindMatrix),i.skeleton.bones=r.map(function(c){return e.get(c)}),i.bind(i.skeleton,i.bindMatrix)}),o}function Cf(t,n,e){e(t,n);for(let o=0;o<t.children.length;o++)Cf(t.children[o],n.children[o],e)}class xv extends Bh{constructor(n){super(n),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(e){return new Sv(e)}),this.register(function(e){return new yv(e)}),this.register(function(e){return new Lv(e)}),this.register(function(e){return new Nv(e)}),this.register(function(e){return new kv(e)}),this.register(function(e){return new Ev(e)}),this.register(function(e){return new Av(e)}),this.register(function(e){return new Rv(e)}),this.register(function(e){return new Pv(e)}),this.register(function(e){return new bv(e)}),this.register(function(e){return new Cv(e)}),this.register(function(e){return new Tv(e)}),this.register(function(e){return new Iv(e)}),this.register(function(e){return new Dv(e)}),this.register(function(e){return new Mv(e)}),this.register(function(e){return new Rl(e,pt.EXT_MESHOPT_COMPRESSION)}),this.register(function(e){return new Rl(e,pt.KHR_MESHOPT_COMPRESSION)}),this.register(function(e){return new Uv(e)})}load(n,e,o,s){const i=this;let a;if(this.resourcePath!=="")a=this.resourcePath;else if(this.path!==""){const l=Ci.extractUrlBase(n);a=Ci.resolveURL(l,this.path)}else a=Ci.extractUrlBase(n);this.manager.itemStart(n);const r=function(l){s?s(l):console.error(l),i.manager.itemError(n),i.manager.itemEnd(n)},c=new zd(this.manager);c.setPath(this.path),c.setResponseType("arraybuffer"),c.setRequestHeader(this.requestHeader),c.setWithCredentials(this.withCredentials),c.load(n,function(l){try{i.parse(l,a,function(d){e(d),i.manager.itemEnd(n)},r)}catch(d){r(d)}},o,r)}setDRACOLoader(n){return this.dracoLoader=n,this}setKTX2Loader(n){return this.ktx2Loader=n,this}setMeshoptDecoder(n){return this.meshoptDecoder=n,this}register(n){return this.pluginCallbacks.indexOf(n)===-1&&this.pluginCallbacks.push(n),this}unregister(n){return this.pluginCallbacks.indexOf(n)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(n),1),this}parse(n,e,o,s){let i;const a={},r={},c=new TextDecoder;if(typeof n=="string")i=JSON.parse(n);else if(n instanceof ArrayBuffer)if(c.decode(new Uint8Array(n,0,4))===Df){try{a[pt.KHR_BINARY_GLTF]=new Fv(n)}catch(f){s&&s(f);return}i=JSON.parse(a[pt.KHR_BINARY_GLTF].content)}else i=JSON.parse(c.decode(n));else i=n;if(i.asset===void 0||i.asset.version[0]<2){s&&s(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}const l=new jv(i,{path:e||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});l.fileLoader.setRequestHeader(this.requestHeader);for(let d=0;d<this.pluginCallbacks.length;d++){const f=this.pluginCallbacks[d](l);f.name||console.error("THREE.GLTFLoader: Invalid plugin found: missing name"),r[f.name]=f,a[f.name]=!0}if(i.extensionsUsed)for(let d=0;d<i.extensionsUsed.length;++d){const f=i.extensionsUsed[d],u=i.extensionsRequired||[];switch(f){case pt.KHR_MATERIALS_UNLIT:a[f]=new wv;break;case pt.KHR_DRACO_MESH_COMPRESSION:a[f]=new Ov(i,this.dracoLoader);break;case pt.KHR_TEXTURE_TRANSFORM:a[f]=new zv;break;case pt.KHR_MESH_QUANTIZATION:a[f]=new Bv;break;default:u.indexOf(f)>=0&&r[f]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+f+'".')}}l.setExtensions(a),l.setPlugins(r),l.parse(o,s)}parseAsync(n,e){const o=this;return new Promise(function(s,i){o.parse(n,e,s,i)})}}function _v(){let t={};return{get:function(n){return t[n]},add:function(n,e){t[n]=e},remove:function(n){delete t[n]},removeAll:function(){t={}}}}function ln(t,n,e){const o=t.json.materials[n];return o.extensions&&o.extensions[e]?o.extensions[e]:null}const pt={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_DISPERSION:"KHR_materials_dispersion",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_MATERIALS_BUMP:"EXT_materials_bump",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",KHR_MESHOPT_COMPRESSION:"KHR_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"};class Mv{constructor(n){this.parser=n,this.name=pt.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){const n=this.parser,e=this.parser.json.nodes||[];for(let o=0,s=e.length;o<s;o++){const i=e[o];i.extensions&&i.extensions[this.name]&&i.extensions[this.name].light!==void 0&&n._addNodeRef(this.cache,i.extensions[this.name].light)}}_loadLight(n){const e=this.parser,o="light:"+n;let s=e.cache.get(o);if(s)return s;const i=e.json,c=((i.extensions&&i.extensions[this.name]||{}).lights||[])[n];let l;const d=new oe(16777215);c.color!==void 0&&d.setRGB(c.color[0],c.color[1],c.color[2],_o);const f=c.range!==void 0?c.range:0;switch(c.type){case"directional":l=new zr(d),l.target.position.set(0,0,-1),l.add(l.target);break;case"point":l=new ro(d),l.distance=f;break;case"spot":l=new c0(d),l.distance=f,c.spot=c.spot||{},c.spot.innerConeAngle=c.spot.innerConeAngle!==void 0?c.spot.innerConeAngle:0,c.spot.outerConeAngle=c.spot.outerConeAngle!==void 0?c.spot.outerConeAngle:Math.PI/4,l.angle=c.spot.outerConeAngle,l.penumbra=1-c.spot.innerConeAngle/c.spot.outerConeAngle,l.target.position.set(0,0,-1),l.add(l.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+c.type)}return l.position.set(0,0,0),Eo(l,c),c.intensity!==void 0&&(l.intensity=c.intensity),l.name=e.createUniqueName(c.name||"light_"+n),s=Promise.resolve(l),e.cache.add(o,s),s}getDependency(n,e){if(n==="light")return this._loadLight(e)}createNodeAttachment(n){const e=this,o=this.parser,i=o.json.nodes[n],r=(i.extensions&&i.extensions[this.name]||{}).light;return r===void 0?null:this._loadLight(r).then(function(c){return o._getNodeRef(e.cache,r,c)})}}class wv{constructor(){this.name=pt.KHR_MATERIALS_UNLIT}getMaterialType(){return Tt}extendParams(n,e,o){const s=[];n.color=new oe(1,1,1),n.opacity=1;const i=e.pbrMetallicRoughness;if(i){if(Array.isArray(i.baseColorFactor)){const a=i.baseColorFactor;n.color.setRGB(a[0],a[1],a[2],_o),n.opacity=a[3]}i.baseColorTexture!==void 0&&s.push(o.assignTexture(n,"map",i.baseColorTexture,yt))}return Promise.all(s)}}class bv{constructor(n){this.parser=n,this.name=pt.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(n,e){const o=ln(this.parser,n,this.name);return o===null||o.emissiveStrength!==void 0&&(e.emissiveIntensity=o.emissiveStrength),Promise.resolve()}}class Sv{constructor(n){this.parser=n,this.name=pt.KHR_MATERIALS_CLEARCOAT}getMaterialType(n){return ln(this.parser,n,this.name)!==null?bn:null}extendMaterialParams(n,e){const o=ln(this.parser,n,this.name);if(o===null)return Promise.resolve();const s=[];if(o.clearcoatFactor!==void 0&&(e.clearcoat=o.clearcoatFactor),o.clearcoatTexture!==void 0&&s.push(this.parser.assignTexture(e,"clearcoatMap",o.clearcoatTexture)),o.clearcoatRoughnessFactor!==void 0&&(e.clearcoatRoughness=o.clearcoatRoughnessFactor),o.clearcoatRoughnessTexture!==void 0&&s.push(this.parser.assignTexture(e,"clearcoatRoughnessMap",o.clearcoatRoughnessTexture)),o.clearcoatNormalTexture!==void 0&&(s.push(this.parser.assignTexture(e,"clearcoatNormalMap",o.clearcoatNormalTexture)),o.clearcoatNormalTexture.scale!==void 0)){const i=o.clearcoatNormalTexture.scale;e.clearcoatNormalScale=new ot(i,i)}return Promise.all(s)}}class yv{constructor(n){this.parser=n,this.name=pt.KHR_MATERIALS_DISPERSION}getMaterialType(n){return ln(this.parser,n,this.name)!==null?bn:null}extendMaterialParams(n,e){const o=ln(this.parser,n,this.name);return o===null||(e.dispersion=o.dispersion!==void 0?o.dispersion:0),Promise.resolve()}}class Tv{constructor(n){this.parser=n,this.name=pt.KHR_MATERIALS_IRIDESCENCE}getMaterialType(n){return ln(this.parser,n,this.name)!==null?bn:null}extendMaterialParams(n,e){const o=ln(this.parser,n,this.name);if(o===null)return Promise.resolve();const s=[];return o.iridescenceFactor!==void 0&&(e.iridescence=o.iridescenceFactor),o.iridescenceTexture!==void 0&&s.push(this.parser.assignTexture(e,"iridescenceMap",o.iridescenceTexture)),o.iridescenceIor!==void 0&&(e.iridescenceIOR=o.iridescenceIor),e.iridescenceThicknessRange===void 0&&(e.iridescenceThicknessRange=[100,400]),o.iridescenceThicknessMinimum!==void 0&&(e.iridescenceThicknessRange[0]=o.iridescenceThicknessMinimum),o.iridescenceThicknessMaximum!==void 0&&(e.iridescenceThicknessRange[1]=o.iridescenceThicknessMaximum),o.iridescenceThicknessTexture!==void 0&&s.push(this.parser.assignTexture(e,"iridescenceThicknessMap",o.iridescenceThicknessTexture)),Promise.all(s)}}class Ev{constructor(n){this.parser=n,this.name=pt.KHR_MATERIALS_SHEEN}getMaterialType(n){return ln(this.parser,n,this.name)!==null?bn:null}extendMaterialParams(n,e){const o=ln(this.parser,n,this.name);if(o===null)return Promise.resolve();const s=[];if(e.sheenColor=new oe(0,0,0),e.sheenRoughness=0,e.sheen=1,o.sheenColorFactor!==void 0){const i=o.sheenColorFactor;e.sheenColor.setRGB(i[0],i[1],i[2],_o)}return o.sheenRoughnessFactor!==void 0&&(e.sheenRoughness=o.sheenRoughnessFactor),o.sheenColorTexture!==void 0&&s.push(this.parser.assignTexture(e,"sheenColorMap",o.sheenColorTexture,yt)),o.sheenRoughnessTexture!==void 0&&s.push(this.parser.assignTexture(e,"sheenRoughnessMap",o.sheenRoughnessTexture)),Promise.all(s)}}class Av{constructor(n){this.parser=n,this.name=pt.KHR_MATERIALS_TRANSMISSION}getMaterialType(n){return ln(this.parser,n,this.name)!==null?bn:null}extendMaterialParams(n,e){const o=ln(this.parser,n,this.name);if(o===null)return Promise.resolve();const s=[];return o.transmissionFactor!==void 0&&(e.transmission=o.transmissionFactor),o.transmissionTexture!==void 0&&s.push(this.parser.assignTexture(e,"transmissionMap",o.transmissionTexture)),Promise.all(s)}}class Rv{constructor(n){this.parser=n,this.name=pt.KHR_MATERIALS_VOLUME}getMaterialType(n){return ln(this.parser,n,this.name)!==null?bn:null}extendMaterialParams(n,e){const o=ln(this.parser,n,this.name);if(o===null)return Promise.resolve();const s=[];e.thickness=o.thicknessFactor!==void 0?o.thicknessFactor:0,o.thicknessTexture!==void 0&&s.push(this.parser.assignTexture(e,"thicknessMap",o.thicknessTexture)),e.attenuationDistance=o.attenuationDistance||1/0;const i=o.attenuationColor||[1,1,1];return e.attenuationColor=new oe().setRGB(i[0],i[1],i[2],_o),Promise.all(s)}}class Pv{constructor(n){this.parser=n,this.name=pt.KHR_MATERIALS_IOR}getMaterialType(n){return ln(this.parser,n,this.name)!==null?bn:null}extendMaterialParams(n,e){const o=ln(this.parser,n,this.name);return o===null||(e.ior=o.ior!==void 0?o.ior:1.5,e.ior===0&&(e.ior=1e3)),Promise.resolve()}}class Cv{constructor(n){this.parser=n,this.name=pt.KHR_MATERIALS_SPECULAR}getMaterialType(n){return ln(this.parser,n,this.name)!==null?bn:null}extendMaterialParams(n,e){const o=ln(this.parser,n,this.name);if(o===null)return Promise.resolve();const s=[];e.specularIntensity=o.specularFactor!==void 0?o.specularFactor:1,o.specularTexture!==void 0&&s.push(this.parser.assignTexture(e,"specularIntensityMap",o.specularTexture));const i=o.specularColorFactor||[1,1,1];return e.specularColor=new oe().setRGB(i[0],i[1],i[2],_o),o.specularColorTexture!==void 0&&s.push(this.parser.assignTexture(e,"specularColorMap",o.specularColorTexture,yt)),Promise.all(s)}}class Dv{constructor(n){this.parser=n,this.name=pt.EXT_MATERIALS_BUMP}getMaterialType(n){return ln(this.parser,n,this.name)!==null?bn:null}extendMaterialParams(n,e){const o=ln(this.parser,n,this.name);if(o===null)return Promise.resolve();const s=[];return e.bumpScale=o.bumpFactor!==void 0?o.bumpFactor:1,o.bumpTexture!==void 0&&s.push(this.parser.assignTexture(e,"bumpMap",o.bumpTexture)),Promise.all(s)}}class Iv{constructor(n){this.parser=n,this.name=pt.KHR_MATERIALS_ANISOTROPY}getMaterialType(n){return ln(this.parser,n,this.name)!==null?bn:null}extendMaterialParams(n,e){const o=ln(this.parser,n,this.name);if(o===null)return Promise.resolve();const s=[];return o.anisotropyStrength!==void 0&&(e.anisotropy=o.anisotropyStrength),o.anisotropyRotation!==void 0&&(e.anisotropyRotation=o.anisotropyRotation),o.anisotropyTexture!==void 0&&s.push(this.parser.assignTexture(e,"anisotropyMap",o.anisotropyTexture)),Promise.all(s)}}class Lv{constructor(n){this.parser=n,this.name=pt.KHR_TEXTURE_BASISU}loadTexture(n){const e=this.parser,o=e.json,s=o.textures[n];if(!s.extensions||!s.extensions[this.name])return null;const i=s.extensions[this.name],a=e.options.ktx2Loader;if(!a){if(o.extensionsRequired&&o.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return e.loadTextureImage(n,i.source,a)}}class Nv{constructor(n){this.parser=n,this.name=pt.EXT_TEXTURE_WEBP}loadTexture(n){const e=this.name,o=this.parser,s=o.json,i=s.textures[n];if(!i.extensions||!i.extensions[e])return null;const a=i.extensions[e],r=s.images[a.source];let c=o.textureLoader;if(r.uri){const l=o.options.manager.getHandler(r.uri);l!==null&&(c=l)}return o.loadTextureImage(n,a.source,c)}}class kv{constructor(n){this.parser=n,this.name=pt.EXT_TEXTURE_AVIF}loadTexture(n){const e=this.name,o=this.parser,s=o.json,i=s.textures[n];if(!i.extensions||!i.extensions[e])return null;const a=i.extensions[e],r=s.images[a.source];let c=o.textureLoader;if(r.uri){const l=o.options.manager.getHandler(r.uri);l!==null&&(c=l)}return o.loadTextureImage(n,a.source,c)}}class Rl{constructor(n,e){this.name=e,this.parser=n}loadBufferView(n){const e=this.parser.json,o=e.bufferViews[n];if(o.extensions&&o.extensions[this.name]){const s=o.extensions[this.name],i=this.parser.getDependency("buffer",s.buffer),a=this.parser.options.meshoptDecoder;if(!a||!a.supported){if(e.extensionsRequired&&e.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return i.then(function(r){const c=s.byteOffset||0,l=s.byteLength||0,d=s.count,f=s.byteStride,u=new Uint8Array(r,c,l);return a.decodeGltfBufferAsync?a.decodeGltfBufferAsync(d,f,u,s.mode,s.filter).then(function(h){return h.buffer}):a.ready.then(function(){const h=new ArrayBuffer(d*f);return a.decodeGltfBuffer(new Uint8Array(h),d,f,u,s.mode,s.filter),h})})}else return null}}class Uv{constructor(n){this.name=pt.EXT_MESH_GPU_INSTANCING,this.parser=n}createNodeMesh(n){const e=this.parser.json,o=e.nodes[n];if(!o.extensions||!o.extensions[this.name]||o.mesh===void 0)return null;const s=e.meshes[o.mesh];for(const l of s.primitives)if(l.mode!==to.TRIANGLES&&l.mode!==to.TRIANGLE_STRIP&&l.mode!==to.TRIANGLE_FAN&&l.mode!==void 0)return null;const a=o.extensions[this.name].attributes,r=[],c={};for(const l in a)r.push(this.parser.getDependency("accessor",a[l]).then(d=>(c[l]=d,c[l])));return r.length<1?null:(r.push(this.parser.createNodeMesh(n)),Promise.all(r).then(l=>{const d=l.pop(),f=d.isGroup?d.children:[d],u=l[0].count,h=[];for(const p of f){const x=new at,m=new X,g=new _n,v=new X(1,1,1),w=new Gn(p.geometry,p.material,u);for(let M=0;M<u;M++)c.TRANSLATION&&m.fromBufferAttribute(c.TRANSLATION,M),c.ROTATION&&g.fromBufferAttribute(c.ROTATION,M),c.SCALE&&v.fromBufferAttribute(c.SCALE,M),w.setMatrixAt(M,x.compose(m,g,v));for(const M in c)if(M==="_COLOR_0"){const y=c[M];w.instanceColor=new Gh(y.array,y.itemSize,y.normalized)}else M!=="TRANSLATION"&&M!=="ROTATION"&&M!=="SCALE"&&p.geometry.setAttribute(M,c[M]);Wi.prototype.copy.call(w,p),this.parser.assignFinalMaterial(w),h.push(w)}return d.isGroup?(d.clear(),d.add(...h),d):h[0]}))}}const Df="glTF",bi=12,Pl={JSON:1313821514,BIN:5130562};class Fv{constructor(n){this.name=pt.KHR_BINARY_GLTF,this.content=null,this.body=null;const e=new DataView(n,0,bi),o=new TextDecoder;if(this.header={magic:o.decode(new Uint8Array(n.slice(0,4))),version:e.getUint32(4,!0),length:e.getUint32(8,!0)},this.header.magic!==Df)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");const s=this.header.length-bi,i=new DataView(n,bi);let a=0;for(;a<s;){const r=i.getUint32(a,!0);a+=4;const c=i.getUint32(a,!0);if(a+=4,c===Pl.JSON){const l=new Uint8Array(n,bi+a,r);this.content=o.decode(l)}else if(c===Pl.BIN){const l=bi+a;this.body=n.slice(l,l+r)}a+=r}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}}class Ov{constructor(n,e){if(!e)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=pt.KHR_DRACO_MESH_COMPRESSION,this.json=n,this.dracoLoader=e,this.dracoLoader.preload()}decodePrimitive(n,e){const o=this.json,s=this.dracoLoader,i=n.extensions[this.name].bufferView,a=n.extensions[this.name].attributes,r={},c={},l={};for(const d in a){const f=Xr[d]||d.toLowerCase();r[f]=a[d]}for(const d in n.attributes){const f=Xr[d]||d.toLowerCase();if(a[d]!==void 0){const u=o.accessors[n.attributes[d]],h=Zs[u.componentType];l[f]=h.name,c[f]=u.normalized===!0}}return e.getDependency("bufferView",i).then(function(d){return new Promise(function(f,u){s.decodeDracoFile(d,function(h){for(const p in h.attributes){const x=h.attributes[p],m=c[p];m!==void 0&&(x.normalized=m)}f(h)},r,l,_o,u)})})}}class zv{constructor(){this.name=pt.KHR_TEXTURE_TRANSFORM}extendTexture(n,e){return(e.texCoord===void 0||e.texCoord===n.channel)&&e.offset===void 0&&e.rotation===void 0&&e.scale===void 0||(n=n.clone(),e.texCoord!==void 0&&(n.channel=e.texCoord),e.offset!==void 0&&n.offset.fromArray(e.offset),e.rotation!==void 0&&(n.rotation=e.rotation),e.scale!==void 0&&n.repeat.fromArray(e.scale),n.needsUpdate=!0),n}}class Bv{constructor(){this.name=pt.KHR_MESH_QUANTIZATION}}class If extends n1{constructor(n,e,o,s){super(n,e,o,s)}copySampleValue_(n){const e=this.resultBuffer,o=this.sampleValues,s=this.valueSize,i=n*s*3+s;for(let a=0;a!==s;a++)e[a]=o[i+a];return e}interpolate_(n,e,o,s){const i=this.resultBuffer,a=this.sampleValues,r=this.valueSize,c=r*2,l=r*3,d=s-e,f=(o-e)/d,u=f*f,h=u*f,p=n*l,x=p-l,m=-2*h+3*u,g=h-u,v=1-m,w=g-u+f;for(let M=0;M!==r;M++){const y=a[x+M+r],b=a[x+M+c]*d,T=a[p+M+r],_=a[p+M]*d;i[M]=v*y+w*b+m*T+g*_}return i}}const Gv=new _n;class Hv extends If{interpolate_(n,e,o,s){const i=super.interpolate_(n,e,o,s);return Gv.fromArray(i).normalize().toArray(i),i}}const to={POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6},Zs={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},Cl={9728:go,9729:en,9984:Md,9985:ha,9986:Ei,9987:Yn},Dl={33071:Cs,33648:_d,10497:Hn},br={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},Xr={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},Jo={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},Vv={CUBICSPLINE:void 0,LINEAR:Bd,STEP:e1},Sr={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function Wv(t){return t.DefaultMaterial===void 0&&(t.DefaultMaterial=new ge({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:Js})),t.DefaultMaterial}function vs(t,n,e){for(const o in e.extensions)t[o]===void 0&&(n.userData.gltfExtensions=n.userData.gltfExtensions||{},n.userData.gltfExtensions[o]=e.extensions[o])}function Eo(t,n){n.extras!==void 0&&(typeof n.extras=="object"?Object.assign(t.userData,n.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+n.extras))}function Xv(t,n,e){let o=!1,s=!1,i=!1;for(let l=0,d=n.length;l<d;l++){const f=n[l];if(f.POSITION!==void 0&&(o=!0),f.NORMAL!==void 0&&(s=!0),f.COLOR_0!==void 0&&(i=!0),o&&s&&i)break}if(!o&&!s&&!i)return Promise.resolve(t);const a=[],r=[],c=[];for(let l=0,d=n.length;l<d;l++){const f=n[l];if(o){const u=f.POSITION!==void 0?e.getDependency("accessor",f.POSITION):t.attributes.position;a.push(u)}if(s){const u=f.NORMAL!==void 0?e.getDependency("accessor",f.NORMAL):t.attributes.normal;r.push(u)}if(i){const u=f.COLOR_0!==void 0?e.getDependency("accessor",f.COLOR_0):t.attributes.color;c.push(u)}}return Promise.all([Promise.all(a),Promise.all(r),Promise.all(c)]).then(function(l){const d=l[0],f=l[1],u=l[2];return o&&(t.morphAttributes.position=d),s&&(t.morphAttributes.normal=f),i&&(t.morphAttributes.color=u),t.morphTargetsRelative=!0,t})}function Kv(t,n){if(t.updateMorphTargets(),n.weights!==void 0)for(let e=0,o=n.weights.length;e<o;e++)t.morphTargetInfluences[e]=n.weights[e];if(n.extras&&Array.isArray(n.extras.targetNames)){const e=n.extras.targetNames;if(t.morphTargetInfluences.length===e.length){t.morphTargetDictionary={};for(let o=0,s=e.length;o<s;o++)t.morphTargetDictionary[e[o]]=o}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function qv(t){let n;const e=t.extensions&&t.extensions[pt.KHR_DRACO_MESH_COMPRESSION];if(e?n="draco:"+e.bufferView+":"+e.indices+":"+yr(e.attributes):n=t.indices+":"+yr(t.attributes)+":"+t.mode,t.targets!==void 0)for(let o=0,s=t.targets.length;o<s;o++)n+=":"+yr(t.targets[o]);return n}function yr(t){let n="";const e=Object.keys(t).sort();for(let o=0,s=e.length;o<s;o++)n+=e[o]+":"+t[e[o]]+";";return n}function Kr(t){switch(t){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function Yv(t){return t.search(/\.jpe?g($|\?)/i)>0||t.search(/^data\:image\/jpeg/)===0?"image/jpeg":t.search(/\.webp($|\?)/i)>0||t.search(/^data\:image\/webp/)===0?"image/webp":t.search(/\.ktx2($|\?)/i)>0||t.search(/^data\:image\/ktx2/)===0?"image/ktx2":"image/png"}const $v=new at;class jv{constructor(n={},e={}){this.json=n,this.extensions={},this.plugins={},this.options=e,this.cache=new _v,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let o=!1,s=-1,i=!1,a=-1;if(typeof navigator<"u"&&typeof navigator.userAgent<"u"){const r=navigator.userAgent;o=/^((?!chrome|android).)*safari/i.test(r)===!0;const c=r.match(/Version\/(\d+)/);s=o&&c?parseInt(c[1],10):-1,i=r.indexOf("Firefox")>-1,a=i?r.match(/Firefox\/([0-9]+)\./)[1]:-1}typeof createImageBitmap>"u"||o&&s<17||i&&a<98?this.textureLoader=new Hh(this.options.manager):this.textureLoader=new Vh(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new zd(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials"&&this.fileLoader.setWithCredentials(!0)}setExtensions(n){this.extensions=n}setPlugins(n){this.plugins=n}parse(n,e){const o=this,s=this.json,i=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(a){return a._markDefs&&a._markDefs()}),Promise.all(this._invokeAll(function(a){return a.beforeRoot&&a.beforeRoot()})).then(function(){return Promise.all([o.getDependencies("scene"),o.getDependencies("animation"),o.getDependencies("camera")])}).then(function(a){const r={scene:a[0][s.scene||0],scenes:a[0],animations:a[1],cameras:a[2],asset:s.asset,parser:o,userData:{}};return vs(i,r,s),Eo(r,s),Promise.all(o._invokeAll(function(c){return c.afterRoot&&c.afterRoot(r)})).then(function(){for(const c of r.scenes)c.updateMatrixWorld();n(r)})}).catch(e)}_markDefs(){const n=this.json.nodes||[],e=this.json.skins||[],o=this.json.meshes||[];for(let s=0,i=e.length;s<i;s++){const a=e[s].joints;for(let r=0,c=a.length;r<c;r++)n[a[r]].isBone=!0}for(let s=0,i=n.length;s<i;s++){const a=n[s];a.mesh!==void 0&&(this._addNodeRef(this.meshCache,a.mesh),a.skin!==void 0&&(o[a.mesh].isSkinnedMesh=!0)),a.camera!==void 0&&this._addNodeRef(this.cameraCache,a.camera)}}_addNodeRef(n,e){e!==void 0&&(n.refs[e]===void 0&&(n.refs[e]=n.uses[e]=0),n.refs[e]++)}_getNodeRef(n,e,o){if(n.refs[e]<=1)return o;const s=o.clone(),i=(a,r)=>{const c=this.associations.get(a);c!=null&&this.associations.set(r,c);for(const[l,d]of a.children.entries())i(d,r.children[l])};return i(o,s),s.name+="_instance_"+n.uses[e]++,s}_invokeOne(n){const e=Object.values(this.plugins);e.push(this);for(let o=0;o<e.length;o++){const s=n(e[o]);if(s)return s}return null}_invokeAll(n){const e=Object.values(this.plugins);e.unshift(this);const o=[];for(let s=0;s<e.length;s++){const i=n(e[s]);i&&o.push(i)}return o}getDependency(n,e){const o=n+":"+e;let s=this.cache.get(o);if(!s){switch(n){case"scene":s=this.loadScene(e);break;case"node":s=this._invokeOne(function(i){return i.loadNode&&i.loadNode(e)});break;case"mesh":s=this._invokeOne(function(i){return i.loadMesh&&i.loadMesh(e)});break;case"accessor":s=this.loadAccessor(e);break;case"bufferView":s=this._invokeOne(function(i){return i.loadBufferView&&i.loadBufferView(e)});break;case"buffer":s=this.loadBuffer(e);break;case"material":s=this._invokeOne(function(i){return i.loadMaterial&&i.loadMaterial(e)});break;case"texture":s=this._invokeOne(function(i){return i.loadTexture&&i.loadTexture(e)});break;case"skin":s=this.loadSkin(e);break;case"animation":s=this._invokeOne(function(i){return i.loadAnimation&&i.loadAnimation(e)});break;case"camera":s=this.loadCamera(e);break;default:if(s=this._invokeOne(function(i){return i!=this&&i.getDependency&&i.getDependency(n,e)}),!s)throw new Error("Unknown type: "+n);break}this.cache.add(o,s)}return s}getDependencies(n){let e=this.cache.get(n);if(!e){const o=this,s=this.json[n+(n==="mesh"?"es":"s")]||[];e=Promise.all(s.map(function(i,a){return o.getDependency(n,a)})),this.cache.add(n,e)}return e}loadBuffer(n){const e=this.json.buffers[n],o=this.fileLoader;if(e.type&&e.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+e.type+" buffer type is not supported.");if(e.uri===void 0&&n===0)return Promise.resolve(this.extensions[pt.KHR_BINARY_GLTF].body);const s=this.options;return new Promise(function(i,a){o.load(Ci.resolveURL(e.uri,s.path),i,void 0,function(){a(new Error('THREE.GLTFLoader: Failed to load buffer "'+e.uri+'".'))})})}loadBufferView(n){const e=this.json.bufferViews[n];return this.getDependency("buffer",e.buffer).then(function(o){const s=e.byteLength||0,i=e.byteOffset||0;return o.slice(i,i+s)})}loadAccessor(n){const e=this,o=this.json,s=this.json.accessors[n];if(s.bufferView===void 0&&s.sparse===void 0){const a=br[s.type],r=Zs[s.componentType],c=s.normalized===!0,l=new r(s.count*a);return Promise.resolve(new lt(l,a,c))}const i=[];return s.bufferView!==void 0?i.push(this.getDependency("bufferView",s.bufferView)):i.push(null),s.sparse!==void 0&&(i.push(this.getDependency("bufferView",s.sparse.indices.bufferView)),i.push(this.getDependency("bufferView",s.sparse.values.bufferView))),Promise.all(i).then(function(a){const r=a[0],c=br[s.type],l=Zs[s.componentType],d=l.BYTES_PER_ELEMENT,f=d*c,u=s.byteOffset||0,h=s.bufferView!==void 0?o.bufferViews[s.bufferView].byteStride:void 0,p=s.normalized===!0;let x,m;if(h&&h!==f){const g=Math.floor(u/h),v="InterleavedBuffer:"+s.bufferView+":"+s.componentType+":"+g+":"+s.count;let w=e.cache.get(v);w||(x=new l(r,g*h,s.count*h/d),w=new Wh(x,h/d),e.cache.add(v,w)),m=new t1(w,c,u%h/d,p)}else r===null?x=new l(s.count*c):x=new l(r,u,s.count*c),m=new lt(x,c,p);if(s.sparse!==void 0){const g=br.SCALAR,v=Zs[s.sparse.indices.componentType],w=s.sparse.indices.byteOffset||0,M=s.sparse.values.byteOffset||0,y=new v(a[1],w,s.sparse.count*g),b=new l(a[2],M,s.sparse.count*c);r!==null&&(m=new lt(m.array.slice(),m.itemSize,m.normalized)),m.normalized=!1;for(let T=0,_=y.length;T<_;T++){const S=y[T];if(m.setX(S,b[T*c]),c>=2&&m.setY(S,b[T*c+1]),c>=3&&m.setZ(S,b[T*c+2]),c>=4&&m.setW(S,b[T*c+3]),c>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}m.normalized=p}return m})}loadTexture(n){const e=this.json,o=this.options,i=e.textures[n].source,a=e.images[i];let r=this.textureLoader;if(a.uri){const c=o.manager.getHandler(a.uri);c!==null&&(r=c)}return this.loadTextureImage(n,i,r)}loadTextureImage(n,e,o){const s=this,i=this.json,a=i.textures[n],r=i.images[e],c=(r.uri||r.bufferView)+":"+a.sampler;if(this.textureCache[c])return this.textureCache[c];const l=this.loadImageSource(e,o).then(function(d){d.flipY=!1,d.name=a.name||r.name||"",d.name===""&&typeof r.uri=="string"&&r.uri.startsWith("data:image/")===!1&&(d.name=r.uri);const u=(i.samplers||{})[a.sampler]||{};return d.magFilter=Cl[u.magFilter]||en,d.minFilter=Cl[u.minFilter]||Yn,d.wrapS=Dl[u.wrapS]||Hn,d.wrapT=Dl[u.wrapT]||Hn,d.generateMipmaps=!d.isCompressedTexture&&d.minFilter!==go&&d.minFilter!==en,s.associations.set(d,{textures:n}),d}).catch(function(){return null});return this.textureCache[c]=l,l}loadImageSource(n,e){const o=this,s=this.json,i=this.options;if(this.sourceCache[n]!==void 0)return this.sourceCache[n].then(f=>f.clone());const a=s.images[n],r=self.URL||self.webkitURL;let c=a.uri||"",l=!1;if(a.bufferView!==void 0)c=o.getDependency("bufferView",a.bufferView).then(function(f){l=!0;const u=new Blob([f],{type:a.mimeType});return c=r.createObjectURL(u),c});else if(a.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+n+" is missing URI and bufferView");const d=Promise.resolve(c).then(function(f){return new Promise(function(u,h){let p=u;e.isImageBitmapLoader===!0&&(p=function(x){const m=new Fr(x);m.needsUpdate=!0,u(m)}),e.load(Ci.resolveURL(f,i.path),p,void 0,h)})}).then(function(f){return l===!0&&r.revokeObjectURL(c),Eo(f,a),f.userData.mimeType=a.mimeType||Yv(a.uri),f}).catch(function(f){throw console.error("THREE.GLTFLoader: Couldn't load texture",c),f});return this.sourceCache[n]=d,d}assignTexture(n,e,o,s){const i=this;return this.getDependency("texture",o.index).then(function(a){if(!a)return null;if(o.texCoord!==void 0&&o.texCoord>0&&(a=a.clone(),a.channel=o.texCoord),i.extensions[pt.KHR_TEXTURE_TRANSFORM]){const r=o.extensions!==void 0?o.extensions[pt.KHR_TEXTURE_TRANSFORM]:void 0;if(r){const c=i.associations.get(a);a=i.extensions[pt.KHR_TEXTURE_TRANSFORM].extendTexture(a,r),i.associations.set(a,c)}}return s!==void 0&&(a.colorSpace=s),n[e]=a,a})}assignFinalMaterial(n){const e=n.geometry;let o=n.material;const s=e.attributes.tangent===void 0,i=e.attributes.color!==void 0,a=e.attributes.normal===void 0;if(n.isPoints){const r="PointsMaterial:"+o.uuid;let c=this.cache.get(r);c||(c=new ma,cr.prototype.copy.call(c,o),c.color.copy(o.color),c.map=o.map,c.sizeAttenuation=!1,this.cache.add(r,c)),o=c}else if(n.isLine){const r="LineBasicMaterial:"+o.uuid;let c=this.cache.get(r);c||(c=new Xh,cr.prototype.copy.call(c,o),c.color.copy(o.color),c.map=o.map,this.cache.add(r,c)),o=c}if(s||i||a){let r="ClonedMaterial:"+o.uuid+":";s&&(r+="derivative-tangents:"),i&&(r+="vertex-colors:"),a&&(r+="flat-shading:");let c=this.cache.get(r);c||(c=o.clone(),i&&(c.vertexColors=!0),a&&(c.flatShading=!0),s&&(c.normalScale&&(c.normalScale.y*=-1),c.clearcoatNormalScale&&(c.clearcoatNormalScale.y*=-1)),this.cache.add(r,c),this.associations.set(c,this.associations.get(o))),o=c}n.material=o}getMaterialType(){return ge}loadMaterial(n){const e=this,o=this.json,s=this.extensions,i=o.materials[n];let a;const r={},c=i.extensions||{},l=[];if(c[pt.KHR_MATERIALS_UNLIT]){const f=s[pt.KHR_MATERIALS_UNLIT];a=f.getMaterialType(),l.push(f.extendParams(r,i,e))}else{const f=i.pbrMetallicRoughness||{};if(r.color=new oe(1,1,1),r.opacity=1,Array.isArray(f.baseColorFactor)){const u=f.baseColorFactor;r.color.setRGB(u[0],u[1],u[2],_o),r.opacity=u[3]}f.baseColorTexture!==void 0&&l.push(e.assignTexture(r,"map",f.baseColorTexture,yt)),r.metalness=f.metallicFactor!==void 0?f.metallicFactor:1,r.roughness=f.roughnessFactor!==void 0?f.roughnessFactor:1,f.metallicRoughnessTexture!==void 0&&(l.push(e.assignTexture(r,"metalnessMap",f.metallicRoughnessTexture)),l.push(e.assignTexture(r,"roughnessMap",f.metallicRoughnessTexture))),a=this._invokeOne(function(u){return u.getMaterialType&&u.getMaterialType(n)}),l.push(Promise.all(this._invokeAll(function(u){return u.extendMaterialParams&&u.extendMaterialParams(n,r)})))}i.doubleSided===!0&&(r.side=qe);const d=i.alphaMode||Sr.OPAQUE;if(d===Sr.BLEND?(r.transparent=!0,r.depthWrite=!1):(r.transparent=!1,d===Sr.MASK&&(r.alphaTest=i.alphaCutoff!==void 0?i.alphaCutoff:.5)),i.normalTexture!==void 0&&a!==Tt&&(l.push(e.assignTexture(r,"normalMap",i.normalTexture)),r.normalScale=new ot(1,1),i.normalTexture.scale!==void 0)){const f=i.normalTexture.scale;r.normalScale.set(f,f)}if(i.occlusionTexture!==void 0&&a!==Tt&&(l.push(e.assignTexture(r,"aoMap",i.occlusionTexture)),i.occlusionTexture.strength!==void 0&&(r.aoMapIntensity=i.occlusionTexture.strength)),i.emissiveFactor!==void 0&&a!==Tt){const f=i.emissiveFactor;r.emissive=new oe().setRGB(f[0],f[1],f[2],_o)}return i.emissiveTexture!==void 0&&a!==Tt&&l.push(e.assignTexture(r,"emissiveMap",i.emissiveTexture,yt)),Promise.all(l).then(function(){const f=new a(r);return i.name&&(f.name=i.name),Eo(f,i),e.associations.set(f,{materials:n}),i.extensions&&vs(s,f,i),f})}createUniqueName(n){const e=Kh.sanitizeNodeName(n||"");return e in this.nodeNamesUsed?e+"_"+ ++this.nodeNamesUsed[e]:(this.nodeNamesUsed[e]=0,e)}loadGeometries(n){const e=this,o=this.extensions,s=this.primitiveCache;function i(r){return o[pt.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(r,e).then(function(c){return Il(c,r,e)})}const a=[];for(let r=0,c=n.length;r<c;r++){const l=n[r],d=qv(l),f=s[d];if(f)a.push(f.promise);else{let u;l.extensions&&l.extensions[pt.KHR_DRACO_MESH_COMPRESSION]?u=i(l):u=Il(new jt,l,e),s[d]={primitive:l,promise:u},a.push(u)}}return Promise.all(a)}loadMesh(n){const e=this,o=this.json,s=this.extensions,i=o.meshes[n],a=i.primitives,r=[];for(let c=0,l=a.length;c<l;c++){const d=a[c].material===void 0?Wv(this.cache):this.getDependency("material",a[c].material);r.push(d)}return r.push(e.loadGeometries(a)),Promise.all(r).then(function(c){const l=c.slice(0,c.length-1),d=c[c.length-1],f=[];for(let h=0,p=d.length;h<p;h++){const x=d[h],m=a[h];let g;const v=l[h];if(m.mode===to.TRIANGLES||m.mode===to.TRIANGLE_STRIP||m.mode===to.TRIANGLE_FAN||m.mode===void 0)g=i.isSkinnedMesh===!0?new qh(x,v):new V(x,v),g.isSkinnedMesh===!0&&g.normalizeSkinWeights(),m.mode===to.TRIANGLE_STRIP?g.geometry=nl(g.geometry,Od):m.mode===to.TRIANGLE_FAN&&(g.geometry=nl(g.geometry,Or));else if(m.mode===to.LINES)g=new Yh(x,v);else if(m.mode===to.LINE_STRIP)g=new $h(x,v);else if(m.mode===to.LINE_LOOP)g=new jh(x,v);else if(m.mode===to.POINTS)g=new ga(x,v);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+m.mode);Object.keys(g.geometry.morphAttributes).length>0&&Kv(g,i),g.name=e.createUniqueName(i.name||"mesh_"+n),Eo(g,i),m.extensions&&vs(s,g,m),e.assignFinalMaterial(g),f.push(g)}for(let h=0,p=f.length;h<p;h++)e.associations.set(f[h],{meshes:n,primitives:h});if(f.length===1)return i.extensions&&vs(s,f[0],i),f[0];const u=new Xe;i.extensions&&vs(s,u,i),e.associations.set(u,{meshes:n});for(let h=0,p=f.length;h<p;h++)u.add(f[h]);return u})}loadCamera(n){let e;const o=this.json.cameras[n],s=o[o.type];if(!s){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return o.type==="perspective"?e=new Ys(bt.radToDeg(s.yfov),s.aspectRatio||1,s.znear||1,s.zfar||2e6):o.type==="orthographic"&&(e=new Fa(-s.xmag,s.xmag,s.ymag,-s.ymag,s.znear,s.zfar)),o.name&&(e.name=this.createUniqueName(o.name)),Eo(e,o),Promise.resolve(e)}loadSkin(n){const e=this.json.skins[n],o=[];for(let s=0,i=e.joints.length;s<i;s++)o.push(this._loadNodeShallow(e.joints[s]));return e.inverseBindMatrices!==void 0?o.push(this.getDependency("accessor",e.inverseBindMatrices)):o.push(null),Promise.all(o).then(function(s){const i=s.pop(),a=s,r=[],c=[];for(let l=0,d=a.length;l<d;l++){const f=a[l];if(f){r.push(f);const u=new at;i!==null&&u.fromArray(i.array,l*16),c.push(u)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',e.joints[l])}return new Zh(r,c)})}loadAnimation(n){const e=this.json,o=this,s=e.animations[n],i=s.name?s.name:"animation_"+n,a=[],r=[],c=[],l=[],d=[];for(let f=0,u=s.channels.length;f<u;f++){const h=s.channels[f],p=s.samplers[h.sampler],x=h.target,m=x.node,g=s.parameters!==void 0?s.parameters[p.input]:p.input,v=s.parameters!==void 0?s.parameters[p.output]:p.output;x.node!==void 0&&(a.push(this.getDependency("node",m)),r.push(this.getDependency("accessor",g)),c.push(this.getDependency("accessor",v)),l.push(p),d.push(x))}return Promise.all([Promise.all(a),Promise.all(r),Promise.all(c),Promise.all(l),Promise.all(d)]).then(function(f){const u=f[0],h=f[1],p=f[2],x=f[3],m=f[4],g=[];for(let w=0,M=u.length;w<M;w++){const y=u[w],b=h[w],T=p[w],_=x[w],S=m[w];if(y===void 0)continue;y.updateMatrix&&y.updateMatrix();const E=o._createAnimationTracks(y,b,T,_,S);if(E)for(let A=0;A<E.length;A++)g.push(E[A])}const v=new Qh(i,void 0,g);return Eo(v,s),v})}createNodeMesh(n){const e=this.json,o=this,s=e.nodes[n];return s.mesh===void 0?null:o.getDependency("mesh",s.mesh).then(function(i){const a=o._getNodeRef(o.meshCache,s.mesh,i);return s.weights!==void 0&&a.traverse(function(r){if(r.isMesh)for(let c=0,l=s.weights.length;c<l;c++)r.morphTargetInfluences[c]=s.weights[c]}),a})}loadNode(n){const e=this.json,o=this,s=e.nodes[n],i=o._loadNodeShallow(n),a=[],r=s.children||[];for(let l=0,d=r.length;l<d;l++)a.push(o.getDependency("node",r[l]));const c=s.skin===void 0?Promise.resolve(null):o.getDependency("skin",s.skin);return Promise.all([i,Promise.all(a),c]).then(function(l){const d=l[0],f=l[1],u=l[2];u!==null&&d.traverse(function(h){h.isSkinnedMesh&&h.bind(u,$v)});for(let h=0,p=f.length;h<p;h++)d.add(f[h]);if(d.userData.pivot!==void 0&&f.length>0){const h=d.userData.pivot,p=f[0];d.pivot=new X().fromArray(h),d.position.x-=h[0],d.position.y-=h[1],d.position.z-=h[2],p.position.set(0,0,0),delete d.userData.pivot}return d})}_loadNodeShallow(n){const e=this.json,o=this.extensions,s=this;if(this.nodeCache[n]!==void 0)return this.nodeCache[n];const i=e.nodes[n],a=i.name?s.createUniqueName(i.name):"",r=[],c=s._invokeOne(function(l){return l.createNodeMesh&&l.createNodeMesh(n)});return c&&r.push(c),i.camera!==void 0&&r.push(s.getDependency("camera",i.camera).then(function(l){return s._getNodeRef(s.cameraCache,i.camera,l)})),s._invokeAll(function(l){return l.createNodeAttachment&&l.createNodeAttachment(n)}).forEach(function(l){r.push(l)}),this.nodeCache[n]=Promise.all(r).then(function(l){let d;if(i.isBone===!0?d=new Jh:l.length>1?d=new Xe:l.length===1?d=l[0]:d=new Wi,d!==l[0])for(let f=0,u=l.length;f<u;f++)d.add(l[f]);if(i.name&&(d.userData.name=i.name,d.name=a),Eo(d,i),i.extensions&&vs(o,d,i),i.matrix!==void 0){const f=new at;f.fromArray(i.matrix),d.applyMatrix4(f)}else i.translation!==void 0&&d.position.fromArray(i.translation),i.rotation!==void 0&&d.quaternion.fromArray(i.rotation),i.scale!==void 0&&d.scale.fromArray(i.scale);if(!s.associations.has(d))s.associations.set(d,{});else if(i.mesh!==void 0&&s.meshCache.refs[i.mesh]>1){const f=s.associations.get(d);s.associations.set(d,{...f})}return s.associations.get(d).nodes=n,d}),this.nodeCache[n]}loadScene(n){const e=this.extensions,o=this.json.scenes[n],s=this,i=new Xe;o.name&&(i.name=s.createUniqueName(o.name)),Eo(i,o),o.extensions&&vs(e,i,o);const a=o.nodes||[],r=[];for(let c=0,l=a.length;c<l;c++)r.push(s.getDependency("node",a[c]));return Promise.all(r).then(function(c){for(let d=0,f=c.length;d<f;d++){const u=c[d];u.parent!==null?i.add(vv(u)):i.add(u)}const l=d=>{const f=new Map;for(const[u,h]of s.associations)(u instanceof cr||u instanceof Fr)&&f.set(u,h);return d.traverse(u=>{const h=s.associations.get(u);h!=null&&f.set(u,h)}),f};return s.associations=l(i),i})}_createAnimationTracks(n,e,o,s,i){const a=[],r=n.name?n.name:n.uuid,c=[];function l(h){h.morphTargetInfluences&&c.push(h.name?h.name:h.uuid)}Jo[i.path]===Jo.weights?(l(n),n.isGroup&&n.children.forEach(l)):c.push(r);let d;switch(Jo[i.path]){case Jo.weights:d=Rc;break;case Jo.rotation:d=Pc;break;case Jo.translation:case Jo.scale:d=Ac;break;default:switch(o.itemSize){case 1:d=Rc;break;case 2:case 3:default:d=Ac;break}break}const f=s.interpolation!==void 0?Vv[s.interpolation]:Bd,u=this._getArrayFromAccessor(o);for(let h=0,p=c.length;h<p;h++){const x=new d(c[h]+"."+Jo[i.path],e.array,u,f);s.interpolation==="CUBICSPLINE"&&this._createCubicSplineTrackInterpolant(x),a.push(x)}return a}_getArrayFromAccessor(n){let e=n.array;if(n.normalized){const o=Kr(e.constructor),s=new Float32Array(e.length);for(let i=0,a=e.length;i<a;i++)s[i]=e[i]*o;e=s}return e}_createCubicSplineTrackInterpolant(n){n.createInterpolant=function(o){const s=this instanceof Pc?Hv:If;return new s(this.times,this.values,this.getValueSize()/3,o)},n.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}}function Zv(t,n,e){const o=n.attributes,s=new Gd;if(o.POSITION!==void 0){const r=e.json.accessors[o.POSITION],c=r.min,l=r.max;if(c!==void 0&&l!==void 0){if(s.set(new X(c[0],c[1],c[2]),new X(l[0],l[1],l[2])),r.normalized){const d=Kr(Zs[r.componentType]);s.min.multiplyScalar(d),s.max.multiplyScalar(d)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;const i=n.targets;if(i!==void 0){const r=new X,c=new X;for(let l=0,d=i.length;l<d;l++){const f=i[l];if(f.POSITION!==void 0){const u=e.json.accessors[f.POSITION],h=u.min,p=u.max;if(h!==void 0&&p!==void 0){if(c.setX(Math.max(Math.abs(h[0]),Math.abs(p[0]))),c.setY(Math.max(Math.abs(h[1]),Math.abs(p[1]))),c.setZ(Math.max(Math.abs(h[2]),Math.abs(p[2]))),u.normalized){const x=Kr(Zs[u.componentType]);c.multiplyScalar(x)}r.max(c)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}s.expandByVector(r)}t.boundingBox=s;const a=new Hd;s.getCenter(a.center),a.radius=s.min.distanceTo(s.max)/2,t.boundingSphere=a}function Il(t,n,e){const o=n.attributes,s=[];function i(a,r){return e.getDependency("accessor",a).then(function(c){t.setAttribute(r,c)})}for(const a in o){const r=Xr[a]||a.toLowerCase();r in t.attributes||s.push(i(o[a],r))}if(n.indices!==void 0&&!t.index){const a=e.getDependency("accessor",n.indices).then(function(r){t.setIndex(r)});s.push(a)}return Xt.workingColorSpace!==_o&&"COLOR_0"in o&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${Xt.workingColorSpace}" not supported.`),Eo(t,n),Zv(t,n,e),Promise.all(s).then(function(){return n.targets!==void 0?Xv(t,n.targets,e):t})}const Lf=new xv,Tr=new Map;let Er=null;async function Nf(){return Er||(Er=fetch("./models/manifest.json").then(t=>t.ok?t.json():null).catch(()=>null)),Er}function kf(t){return t.startsWith("http")?t:`./${t.replace(/^\//,"")}`}async function Uf(t){try{return(await fetch(t,{method:"HEAD"})).ok}catch{return!1}}function Ff(t,n,e=1){const o=new Gd().setFromObject(t);if(o.isEmpty())return;const s=o.getSize(new X),i=o.getCenter(new X),a=Math.max(s.x,s.y,s.z,.001),r=n/a*e;t.scale.setScalar(r),t.position.sub(i.multiplyScalar(r)),t.position.y+=s.y*r/2}function Qv(t,n){const e=new Set(n.map(s=>s.toLowerCase()));let o=null;return t.traverse(s=>{var r;if(o)return;const i=s;if(!i.isMesh)return;const a=i.name.toLowerCase();(e.has(a)||e.has(((r=s.parent)==null?void 0:r.name.toLowerCase())??""))&&(o=i)}),o}function Of(t){t.traverse(n=>{const e=n;if(!e.isMesh)return;e.castShadow=!0,e.receiveShadow=!0;const o=Array.isArray(e.material)?e.material:[e.material];for(const s of o)s&&"color"in s&&s instanceof ge&&(s.envMapIntensity=1)})}async function Jv(t,n,e){var s,i;const o=kf(t);if(!await Uf(o))return null;try{if(!Tr.has(o)){const r=(await Lf.loadAsync(o)).scene,c=n.targetHeight??((s=e.defaults)==null?void 0:s.targetHeight)??6;Ff(r,c,n.scale??((i=e.defaults)==null?void 0:i.scale)??1),Of(r),Tr.set(o,r)}return Tr.get(o).clone(!0)}catch{return null}}async function ex(t,n,e){var s,i;const o=kf(t);if(!await Uf(o))return null;try{const a=await Lf.loadAsync(o),r=a.scene,c=n.targetHeight??((s=e.defaults)==null?void 0:s.targetHeight)??1.9;return Ff(r,c,n.scale??((i=e.defaults)==null?void 0:i.scale)??1),Of(r),{group:r,clips:a.animations??[]}}catch{return null}}function tx(t){t.traverse(n=>{const e=n;if(!e.isMesh)return;const o=Array.isArray(e.material)?e.material:[e.material];for(const s of o){if(!s)continue;const i=s;i.name==="Grey"?(i.color.setHex(4015958),i.roughness=.42,i.metalness=.62,i.envMapIntensity=1.1):i.name==="Main"?(i.color.setHex(3104670),i.roughness=.5,i.metalness=.34,i.envMapIntensity=1.15):i.name==="Black"?(i.color.setHex(1316895),i.roughness=.32,i.metalness=.5,i.envMapIntensity=1):(i.roughness=Math.max(.3,Math.min(.9,i.roughness??.7)),i.metalness=Math.max(.1,Math.min(.7,i.metalness??.1)),i.envMapIntensity=1),i.needsUpdate=!0}})}function Ll(t=1.9){const n=t*1.15,e=document.createElement("canvas");e.width=e.height=128;const o=e.getContext("2d"),s=o.createRadialGradient(64,64,0,64,64,64);s.addColorStop(0,"rgba(0,0,0,0.55)"),s.addColorStop(.45,"rgba(0,0,0,0.28)"),s.addColorStop(1,"rgba(0,0,0,0)"),o.fillStyle=s,o.fillRect(0,0,128,128);const i=new Zt(e);i.colorSpace=yt;const a=new V(new Qe(n,n),new Tt({map:i,transparent:!0,opacity:.85,depthWrite:!1}));return a.rotation.x=-Math.PI/2,a.position.y=.06,a.renderOrder=-1,a.name="ContactShadow",a}const Nl={forest:{primary:2051382,secondary:3462041,accent:7268279,crystal:4906624,ground:1717032},coast:{primary:1981023,secondary:3718648,accent:8246268,crystal:6333946,ground:1715778},library:{primary:3878751,secondary:10980346,accent:12891645,crystal:9133302,ground:2762048},market:{primary:4863776,secondary:16498468,accent:16569165,crystal:16096779,ground:4010016},temple:{primary:4857912,secondary:16020150,accent:16361684,crystal:15485081,ground:3481648},plains:{primary:3359061,secondary:9741240,accent:13358561,crystal:6583435,ground:2765888}};function qi(t){return Nl[t]??Nl.plains}function zf(t,n,e){const o=new V(new we(.35,.55,1.6,16),Xo(6045747,.75));o.position.y=1.1,o.castShadow=!0;const s=new V(new he(1.1,.14,10,24,Math.PI),Xo(4876097,.7));s.rotation.z=Math.PI,s.position.y=2.2;const i=new V(new Ns(.95,1),e);return i.position.y=3.5,i.castShadow=!0,t.add(o,s,i),i}function nx(t,n,e){const o=new V(new Ye(2.2,.2,1.4),Xo(7035466,.65));o.position.set(0,.55,.4);const s=new V(new we(.45,.6,2.8,16),Xo(13358561,.45));s.position.y=1.8,s.castShadow=!0;const i=new V(new Mo(.75,1),e);i.position.y=3.6;const a=new ro(n.crystal,1.2,10);return a.position.y=3.6,t.add(o,s,i,a),i}function ox(t,n,e){const o=new V(new Ye(2.6,.5,2.2),Xo(10265519,.35));o.position.y=.55;const s=new V(new xt(1.8,1.2,4),new ge({color:n.primary,roughness:.4,metalness:.2}));s.position.y=1.4,s.rotation.y=Math.PI/4;const i=new V(new we(.12,.15,2.2,12),Xo(13751771,.3));i.position.set(-.9,1.3,0);const a=i.clone();a.position.x=.9;const r=new V(new o1(.55,.16,64,12),e);return r.position.y=3.2,t.add(o,s,i,a,r),r}function sx(t,n,e){const o=new V(new Ye(2.4,.15,1.8),Xo(9136404,.7));o.position.y=.55;const s=new V(new we(0,1.6,.9,4),new ge({color:n.secondary,roughness:.55,side:qe}));s.position.y=1.8,s.rotation.y=Math.PI/4;const i=new V(new Xi(.8,0),e);i.position.y=3.1;const a=bf(n.accent);return a.position.set(1.1,0,.6),t.add(o,s,i,a),i}function ix(t,n,e){const o=new V(new Ye(3,.25,2.4),Xo(10322313,.55));o.position.y=.5;const s=new V(new we(.25,.4,3.2,8),Xo(12887477,.4));s.position.y=2.1,s.castShadow=!0;const i=new V(new he(1.3,.06,8,40),new ge({color:n.accent,emissive:n.accent,emissiveIntensity:.6,metalness:.8,roughness:.2}));i.rotation.x=Math.PI/2,i.position.y=3.8;const a=new V(new Mo(.9,2),e);return a.position.y=4.5,t.add(o,s,i,a),a}const ax={forest:zf,coast:nx,library:ox,market:sx,temple:ix};function rx(t,n){const e=qi(t.theme),o=new Xe,s=t.unlocked,i=s?1:.45,a=new V(new we(2.4,2.8,.35,24),new ge({color:e.ground,roughness:.55,metalness:.12,transparent:!s,opacity:i}));a.position.y=.18,a.receiveShadow=!0;const r=new V(new he(2.1,.08,12,48),new ge({color:e.secondary,emissive:e.accent,emissiveIntensity:s?.35:.08,roughness:.3,metalness:.55,transparent:!s,opacity:i}));r.rotation.x=Math.PI/2,r.position.y=.38,o.add(a,r);const c=h0(s?e.crystal:7041664,t.cleared?.85:s?.55:.12),l=(ax[t.theme]??zf)(o,e,c);if(l.userData.isCrystal=!0,n){const d=new V(new ii(2.3,2.55,48),new Tt({color:16498468,transparent:!0,opacity:.55,side:qe}));d.rotation.x=-Math.PI/2,d.position.y=.42,d.userData.isPulse=!0,o.add(d);const f=new c0(16774358,s?2.2:.4,18,Math.PI/5,.4);f.position.set(0,8,2),f.target.position.set(0,2,0),o.add(f,f.target)}if(t.cleared){const d=new V(new Se(3.2,24,24),new Tt({color:e.accent,transparent:!0,opacity:.07,depthWrite:!1}));d.position.y=2,o.add(d)}if(t.dueCount&&t.dueCount>0&&s){const d=new V(new ii(2.65,2.9,48),new Tt({color:16498468,transparent:!0,opacity:.42,side:qe}));d.rotation.x=-Math.PI/2,d.position.y=.5,d.userData.isDueRing=!0,o.add(d)}return o}let Ar=null;async function cx(){return Ar||(Ar=await Nf()),Ar}function lx(t,n){const e=qi(n.theme),o=n.unlocked,s=o?1:.45,i=new V(new we(2.4,2.8,.35,24),new ge({color:e.ground,roughness:.55,metalness:.12,transparent:!o,opacity:s}));i.position.y=.18,i.receiveShadow=!0;const a=new V(new he(2.1,.08,12,48),new ge({color:e.secondary,emissive:e.accent,emissiveIntensity:o?.35:.08,roughness:.3,metalness:.55,transparent:!o,opacity:s}));a.rotation.x=Math.PI/2,a.position.y=.38,t.add(i,a)}function dx(t,n,e,o,s){if(e){const i=new V(new ii(2.3,2.55,48),new Tt({color:16498468,transparent:!0,opacity:.55,side:qe}));i.rotation.x=-Math.PI/2,i.position.y=.42,i.userData.isPulse=!0,t.add(i);const a=new c0(16774358,o?2.2:.4,18,Math.PI/5,.4);a.position.set(0,8,2),a.target.position.set(0,2,0),t.add(a,a.target)}if(n.cleared){const i=new V(new Se(3.2,24,24),new Tt({color:s.accent,transparent:!0,opacity:.07,depthWrite:!1}));i.position.y=2,t.add(i)}if(n.dueCount&&n.dueCount>0&&o){const i=new V(new ii(2.65,2.9,48),new Tt({color:16498468,transparent:!0,opacity:.42,side:qe}));i.rotation.x=-Math.PI/2,i.position.y=.5,i.userData.isDueRing=!0,t.add(i)}}function kl(t,n){const e=qi(t.theme),o=new V(new Ns(.85,1),h0(t.unlocked?e.crystal:7041664,.65));return o.position.y=3.6,o.castShadow=!0,o.userData.isCrystal=!0,n.add(o),o}function fx(t){let n=null;return t.traverse(e=>{var s;if(n)return;const o=e;(s=o.userData)!=null&&s.isCrystal&&(n=o)}),n}async function ux(t,n){var c,l,d;const e=await cx(),o=qi(t.theme),s=t.name.includes("学习圣所"),i=e&&!s?((c=e.nodes)==null?void 0:c[t.id])??((l=e.themes)==null?void 0:l[t.theme])??null:null;if(e&&i){const f=await Jv(i.file,i,e);if(f){const u=new Xe;lx(u,t),f.position.y=.35,rf(f,.3),u.add(f);const h=i.pickMeshNames??((d=e.defaults)==null?void 0:d.pickMeshNames)??["Crystal","PICK"];let p=Qv(f,h);return p?p.userData.isCrystal=!0:p=kl(t,u),dx(u,t,n,t.unlocked,o),{root:u,crystal:p}}}const a=rx(t,n),r=fx(a)??kl(t,a);return{root:a,crystal:r}}const hx=new at,Ul=new _n,Fl=new fs,Ol=new X(1,1,1),zl=new X;function le(t,n,e,o=.04){return o<.0075?new Ye(t,n,e):new Wo(t,n,e,1,Math.min(o,t/2.01,n/2.01,e/2.01))}function et(t,n,e,o=16){return new we(t,n,e,o,1)}function Mn(t,n,e,o=8){const s=new Tn;for(let a=0;a<o;a++){const r=(a+.5)/o*Math.PI*2,c=Math.cos(r)*t,l=Math.sin(r)*t;a===0?s.moveTo(c,l):s.lineTo(c,l)}s.closePath();const i=new Fn(s,{depth:Math.max(.001,n-e*2),bevelEnabled:!0,bevelThickness:e,bevelSize:e,bevelSegments:1});return i.rotateX(-Math.PI/2),i.translate(0,e,0),i}function Bf(t,n,e,o,s){const i=new Tn;i.moveTo(Math.cos(e)*t,Math.sin(e)*t),i.lineTo(Math.cos(e)*n,Math.sin(e)*n),i.absarc(0,0,n,e,o,!1),i.lineTo(Math.cos(o)*t,Math.sin(o)*t),i.absarc(0,0,t,o,e,!0);const a=new Fn(i,{depth:s,bevelEnabled:!1,curveSegments:3});return a.rotateX(-Math.PI/2),a}function Nt(t,n,e,o=6){const s=new X(...t),i=new X(...n).sub(s),a=new we(e,e,i.length(),o,1),r=new _n().setFromUnitVectors(new X(0,1,0),i.clone().normalize());return a.applyMatrix4(new at().compose(s.clone().addScaledVector(i,.5),r,new X(1,1,1))),a}function qo(t,n,e,o=.04){const s=new Tn;s.absarc(0,0,t,0,Math.PI,!1),s.lineTo(-n,0),s.absarc(0,0,n,Math.PI,0,!0),s.closePath();const i=new Fn(s,{depth:Math.max(.001,e-o*2),bevelEnabled:!0,bevelThickness:o,bevelSize:o*.8,bevelSegments:1,curveSegments:18});return i.translate(0,0,-(e-o*2)/2),i}function ao(t,n,e){const o=new Tn;o.moveTo(-t/2,0),o.lineTo(t/2,0),o.lineTo(0,n),o.closePath();const s=new Fn(o,{depth:e,bevelEnabled:!0,bevelThickness:.03,bevelSize:.03,bevelSegments:1});return s.translate(0,0,-e/2),s}class On{constructor(){Z(this,"buckets",new Map)}add(n,e,o={}){const s=n.clone();e.map||s.deleteAttribute("uv"),s.deleteAttribute(ai),Fl.set(o.rx??0,o.ry??0,o.rz??0),Ul.setFromEuler(Fl),zl.set(o.x??0,o.y??0,o.z??0),Ol.set(o.sx??1,o.sy??1,o.sz??1),s.applyMatrix4(hx.compose(zl,Ul,Ol));const i=s.index?s:Is(s,1e-4),a=this.buckets.get(e)??[];a.push(i),this.buckets.set(e,a)}addMatrix(n,e,o){const s=n.clone();e.map||s.deleteAttribute("uv"),s.deleteAttribute(ai),s.applyMatrix4(o);const i=s.index?s:Is(s,1e-4),a=this.buckets.get(e)??[];a.push(i),this.buckets.set(e,a)}build(n,e="detail",o={}){const s=[];let i=0;for(const[a,r]of this.buckets){const c=Wn(r,!1);if(!c)continue;c.computeBoundingSphere(),af(a)&&Sa(c);const l=new V(c,a);l.name=`${e}-${i++}`,l.castShadow=!0,l.receiveShadow=!0,ls(l,a),Object.assign(l.userData,o),n.add(l),s.push(l)}return this.buckets.clear(),s}}function px(t){var s;t.updateMatrixWorld(!0);const n=new at().copy(t.matrixWorld).invert(),e=new Map,o=[];t.traverse(i=>{i.isMesh&&o.push(i)});for(const i of o){const a=i.geometry.clone();a.deleteAttribute("uv"),a.deleteAttribute(ai),a.applyMatrix4(new at().multiplyMatrices(n,i.matrixWorld));const r=a.index?a:Is(a,1e-4),c=e.get(i.material)??[];c.push(r),e.set(i.material,c)}for(const i of o)(s=i.parent)==null||s.remove(i);for(const i of[...t.children])i.type==="Group"&&t.remove(i);for(const[i,a]of e){const r=Wn(a,!1);if(!r)continue;const c=new V(r,i);c.castShadow=!0,c.receiveShadow=!0,c.userData.isLandscapeStage=!0,t.add(c)}}function Yi(t){let n=t>>>0;return()=>{n=n+1831565813>>>0;let e=n;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}}function Kn(){const t=(e,o,s=.02,i={})=>{const a=new ge({color:e,roughness:o,metalness:s,...i});return a.fog=!1,a},n={stone:t(12170150,.9),stoneDark:t(9078397,.92),stoneWarm:t(13221286,.9),paveA:t(10132116,.95),paveB:t(8751752,.95),slate:t(4870744,.86,.06),wood:t(9071178,.82,.02),woodDark:t(5915440,.85,.02),brass:t(11962940,.36,.8),steel:t(9345444,.4,.8),copper:t(5216908,.52,.55),leaf:t(4157253,.95),leafLight:t(6263120,.95),soil:t(4864812,1),lampGlass:t(16773320,.3,0,{emissive:16761178,emissiveIntensity:.9}),paper:t(15524815,.95),darkSteel:t(3093819,.5,.7),rock:t(8093056,.95),terracottaRoof:t(11887946,.82),glass:(()=>{const e=new bn({color:7315376,roughness:.04,metalness:0,transparent:!0,opacity:.34,clearcoat:1,envMapIntensity:1.6,depthWrite:!1});return e.fog=!1,e})()};return Nn(n.stone,"masonry"),Nn(n.stoneDark,"masonry"),Nn(n.stoneWarm,"masonry"),Nn(n.rock,"masonry"),Nn(n.paveA,"paving"),Nn(n.paveB,"paving"),Nn(n.wood,"wood"),Nn(n.woodDark,"wood"),Nn(n.terracottaRoof,"tiles"),Nn(n.slate,"tiles"),Nn(n.brass,"metal"),Nn(n.steel,"metal"),Nn(n.copper,"metal"),Nn(n.darkSteel,"metal"),n}class mx extends V{constructor(n,e,o=!1,s=!1,i=1e4){const a=new jt;super(a,e),this.isMarchingCubes=!0;const r=this,c=new Float32Array(36),l=new Float32Array(36),d=new Float32Array(36);this.enableUvs=o,this.enableColors=s,this.init=function(v){this.resolution=v,this.isolation=80,this.size=v,this.size2=this.size*this.size,this.size3=this.size2*this.size,this.halfsize=this.size/2,this.delta=2/this.size,this.yd=this.size,this.zd=this.size2,this.field=new Float32Array(this.size3),this.normal_cache=new Float32Array(this.size3*3),this.palette=new Float32Array(this.size3*3),this.count=0;const w=i*3;this.positionArray=new Float32Array(w*3);const M=new lt(this.positionArray,3);M.setUsage(Qi),a.setAttribute("position",M),this.normalArray=new Float32Array(w*3);const y=new lt(this.normalArray,3);if(y.setUsage(Qi),a.setAttribute("normal",y),this.enableUvs){this.uvArray=new Float32Array(w*2);const b=new lt(this.uvArray,2);b.setUsage(Qi),a.setAttribute("uv",b)}if(this.enableColors){this.colorArray=new Float32Array(w*3);const b=new lt(this.colorArray,3);b.setUsage(Qi),a.setAttribute("color",b)}a.boundingSphere=new Hd(new X,1)};function f(v,w,M){return v+(w-v)*M}function u(v,w,M,y,b,T,_,S,E,A){const R=(M-_)/(S-_),C=r.normal_cache;c[w+0]=y+R*r.delta,c[w+1]=b,c[w+2]=T,l[w+0]=f(C[v+0],C[v+3],R),l[w+1]=f(C[v+1],C[v+4],R),l[w+2]=f(C[v+2],C[v+5],R),d[w+0]=f(r.palette[E*3+0],r.palette[A*3+0],R),d[w+1]=f(r.palette[E*3+1],r.palette[A*3+1],R),d[w+2]=f(r.palette[E*3+2],r.palette[A*3+2],R)}function h(v,w,M,y,b,T,_,S,E,A){const R=(M-_)/(S-_),C=r.normal_cache;c[w+0]=y,c[w+1]=b+R*r.delta,c[w+2]=T;const I=v+r.yd*3;l[w+0]=f(C[v+0],C[I+0],R),l[w+1]=f(C[v+1],C[I+1],R),l[w+2]=f(C[v+2],C[I+2],R),d[w+0]=f(r.palette[E*3+0],r.palette[A*3+0],R),d[w+1]=f(r.palette[E*3+1],r.palette[A*3+1],R),d[w+2]=f(r.palette[E*3+2],r.palette[A*3+2],R)}function p(v,w,M,y,b,T,_,S,E,A){const R=(M-_)/(S-_),C=r.normal_cache;c[w+0]=y,c[w+1]=b,c[w+2]=T+R*r.delta;const I=v+r.zd*3;l[w+0]=f(C[v+0],C[I+0],R),l[w+1]=f(C[v+1],C[I+1],R),l[w+2]=f(C[v+2],C[I+2],R),d[w+0]=f(r.palette[E*3+0],r.palette[A*3+0],R),d[w+1]=f(r.palette[E*3+1],r.palette[A*3+1],R),d[w+2]=f(r.palette[E*3+2],r.palette[A*3+2],R)}function x(v){const w=v*3;r.normal_cache[w]===0&&(r.normal_cache[w+0]=r.field[v-1]-r.field[v+1],r.normal_cache[w+1]=r.field[v-r.yd]-r.field[v+r.yd],r.normal_cache[w+2]=r.field[v-r.zd]-r.field[v+r.zd])}function m(v,w,M,y,b){const T=y+1,_=y+r.yd,S=y+r.zd,E=T+r.yd,A=T+r.zd,R=y+r.yd+r.zd,C=T+r.yd+r.zd;let I=0;const L=r.field[y],N=r.field[T],U=r.field[_],F=r.field[E],z=r.field[S],G=r.field[A],O=r.field[R],B=r.field[C];L<b&&(I|=1),N<b&&(I|=2),U<b&&(I|=8),F<b&&(I|=4),z<b&&(I|=16),G<b&&(I|=32),O<b&&(I|=128),B<b&&(I|=64);const J=gx[I];if(J===0)return 0;const ue=r.delta,xe=v+ue,j=w+ue,ie=M+ue;J&1&&(x(y),x(T),u(y*3,0,b,v,w,M,L,N,y,T)),J&2&&(x(T),x(E),h(T*3,3,b,xe,w,M,N,F,T,E)),J&4&&(x(_),x(E),u(_*3,6,b,v,j,M,U,F,_,E)),J&8&&(x(y),x(_),h(y*3,9,b,v,w,M,L,U,y,_)),J&16&&(x(S),x(A),u(S*3,12,b,v,w,ie,z,G,S,A)),J&32&&(x(A),x(C),h(A*3,15,b,xe,w,ie,G,B,A,C)),J&64&&(x(R),x(C),u(R*3,18,b,v,j,ie,O,B,R,C)),J&128&&(x(S),x(R),h(S*3,21,b,v,w,ie,z,O,S,R)),J&256&&(x(y),x(S),p(y*3,24,b,v,w,M,L,z,y,S)),J&512&&(x(T),x(A),p(T*3,27,b,xe,w,M,N,G,T,A)),J&1024&&(x(E),x(C),p(E*3,30,b,xe,j,M,F,B,E,C)),J&2048&&(x(_),x(R),p(_*3,33,b,v,j,M,U,O,_,R)),I<<=4;let ne,ye,Ie,Fe=0,tt=0;for(;ca[I+tt]!=-1;)ne=I+tt,ye=ne+1,Ie=ne+2,g(c,l,d,3*ca[ne],3*ca[ye],3*ca[Ie]),tt+=3,Fe++;return Fe}function g(v,w,M,y,b,T){const _=r.count*3;if(r.positionArray[_+0]=v[y],r.positionArray[_+1]=v[y+1],r.positionArray[_+2]=v[y+2],r.positionArray[_+3]=v[b],r.positionArray[_+4]=v[b+1],r.positionArray[_+5]=v[b+2],r.positionArray[_+6]=v[T],r.positionArray[_+7]=v[T+1],r.positionArray[_+8]=v[T+2],r.material.flatShading===!0){const S=(w[y+0]+w[b+0]+w[T+0])/3,E=(w[y+1]+w[b+1]+w[T+1])/3,A=(w[y+2]+w[b+2]+w[T+2])/3;r.normalArray[_+0]=S,r.normalArray[_+1]=E,r.normalArray[_+2]=A,r.normalArray[_+3]=S,r.normalArray[_+4]=E,r.normalArray[_+5]=A,r.normalArray[_+6]=S,r.normalArray[_+7]=E,r.normalArray[_+8]=A}else r.normalArray[_+0]=w[y+0],r.normalArray[_+1]=w[y+1],r.normalArray[_+2]=w[y+2],r.normalArray[_+3]=w[b+0],r.normalArray[_+4]=w[b+1],r.normalArray[_+5]=w[b+2],r.normalArray[_+6]=w[T+0],r.normalArray[_+7]=w[T+1],r.normalArray[_+8]=w[T+2];if(r.enableUvs){const S=r.count*2;r.uvArray[S+0]=v[y+0],r.uvArray[S+1]=v[y+2],r.uvArray[S+2]=v[b+0],r.uvArray[S+3]=v[b+2],r.uvArray[S+4]=v[T+0],r.uvArray[S+5]=v[T+2]}r.enableColors&&(r.colorArray[_+0]=M[y+0],r.colorArray[_+1]=M[y+1],r.colorArray[_+2]=M[y+2],r.colorArray[_+3]=M[b+0],r.colorArray[_+4]=M[b+1],r.colorArray[_+5]=M[b+2],r.colorArray[_+6]=M[T+0],r.colorArray[_+7]=M[T+1],r.colorArray[_+8]=M[T+2]),r.count+=3}this.addBall=function(v,w,M,y,b,T){const _=Math.sign(y);y=Math.abs(y);const S=T!=null;let E=new oe(v,w,M);if(S)try{E=T instanceof oe?T:Array.isArray(T)?new oe(Math.min(Math.abs(T[0]),1),Math.min(Math.abs(T[1]),1),Math.min(Math.abs(T[2]),1)):new oe(T)}catch{E=new oe(v,w,M)}const A=this.size*Math.sqrt(y/b),R=M*this.size,C=w*this.size,I=v*this.size;let L=Math.floor(R-A);L<1&&(L=1);let N=Math.floor(R+A);N>this.size-1&&(N=this.size-1);let U=Math.floor(C-A);U<1&&(U=1);let F=Math.floor(C+A);F>this.size-1&&(F=this.size-1);let z=Math.floor(I-A);z<1&&(z=1);let G=Math.floor(I+A);G>this.size-1&&(G=this.size-1);let O,B,J,ue,xe,j,ie,ne,ye,Ie,Fe;for(J=L;J<N;J++)for(xe=this.size2*J,ne=J/this.size-M,ye=ne*ne,B=U;B<F;B++)for(ue=xe+this.size*B,ie=B/this.size-w,Ie=ie*ie,O=z;O<G;O++)if(j=O/this.size-v,Fe=y/(1e-6+j*j+Ie+ye)-b,Fe>0){this.field[ue+O]+=Fe*_;const tt=Math.sqrt((O-I)*(O-I)+(B-C)*(B-C)+(J-R)*(J-R))/A,je=1-tt*tt*tt*(tt*(tt*6-15)+10);this.palette[(ue+O)*3+0]+=E.r*je,this.palette[(ue+O)*3+1]+=E.g*je,this.palette[(ue+O)*3+2]+=E.b*je}},this.addPlaneX=function(v,w){const M=this.size,y=this.yd,b=this.zd,T=this.field;let _,S,E,A,R,C,I,L=M*Math.sqrt(v/w);for(L>M&&(L=M),_=0;_<L;_++)if(C=_/M,A=C*C,R=v/(1e-4+A)-w,R>0)for(S=0;S<M;S++)for(I=_+S*y,E=0;E<M;E++)T[b*E+I]+=R},this.addPlaneY=function(v,w){const M=this.size,y=this.yd,b=this.zd,T=this.field;let _,S,E,A,R,C,I,L,N=M*Math.sqrt(v/w);for(N>M&&(N=M),S=0;S<N;S++)if(C=S/M,A=C*C,R=v/(1e-4+A)-w,R>0)for(I=S*y,_=0;_<M;_++)for(L=I+_,E=0;E<M;E++)T[b*E+L]+=R},this.addPlaneZ=function(v,w){const M=this.size,y=this.yd,b=this.zd,T=this.field;let _,S,E,A,R,C,I,L,N=M*Math.sqrt(v/w);for(N>M&&(N=M),E=0;E<N;E++)if(C=E/M,A=C*C,R=v/(1e-4+A)-w,R>0)for(I=b*E,S=0;S<M;S++)for(L=I+S*y,_=0;_<M;_++)T[L+_]+=R},this.setCell=function(v,w,M,y){const b=this.size2*M+this.size*w+v;this.field[b]=y},this.getCell=function(v,w,M){const y=this.size2*M+this.size*w+v;return this.field[y]},this.blur=function(v=1){const w=this.field,M=w.slice(),y=this.size,b=this.size2;for(let T=0;T<y;T++)for(let _=0;_<y;_++)for(let S=0;S<y;S++){const E=b*S+y*_+T;let A=M[E],R=1;for(let C=-1;C<=1;C+=2){const I=C+T;if(!(I<0||I>=y))for(let L=-1;L<=1;L+=2){const N=L+_;if(!(N<0||N>=y))for(let U=-1;U<=1;U+=2){const F=U+S;if(F<0||F>=y)continue;const z=b*F+y*N+I,G=M[z];R++,A+=v*(G-A)/R}}}w[E]=A}},this.reset=function(){for(let v=0;v<this.size3;v++)this.normal_cache[v*3]=0,this.field[v]=0,this.palette[v*3]=this.palette[v*3+1]=this.palette[v*3+2]=0},this.update=function(){this.count=0;const v=this.size-2;for(let w=1;w<v;w++){const M=this.size2*w,y=(w-this.halfsize)/this.halfsize;for(let b=1;b<v;b++){const T=M+this.size*b,_=(b-this.halfsize)/this.halfsize;for(let S=1;S<v;S++){const E=(S-this.halfsize)/this.halfsize,A=T+S;m(E,_,y,A,this.isolation)}}}this.geometry.setDrawRange(0,this.count),a.getAttribute("position").needsUpdate=!0,a.getAttribute("normal").needsUpdate=!0,this.enableUvs&&(a.getAttribute("uv").needsUpdate=!0),this.enableColors&&(a.getAttribute("color").needsUpdate=!0),this.count/3>i&&console.warn("THREE.MarchingCubes: Geometry buffers too small for rendering. Please create an instance with a higher poly count.")},this.init(n)}}const gx=new Int32Array([0,265,515,778,1030,1295,1541,1804,2060,2309,2575,2822,3082,3331,3593,3840,400,153,915,666,1430,1183,1941,1692,2460,2197,2975,2710,3482,3219,3993,3728,560,825,51,314,1590,1855,1077,1340,2620,2869,2111,2358,3642,3891,3129,3376,928,681,419,170,1958,1711,1445,1196,2988,2725,2479,2214,4010,3747,3497,3232,1120,1385,1635,1898,102,367,613,876,3180,3429,3695,3942,2154,2403,2665,2912,1520,1273,2035,1786,502,255,1013,764,3580,3317,4095,3830,2554,2291,3065,2800,1616,1881,1107,1370,598,863,85,348,3676,3925,3167,3414,2650,2899,2137,2384,1984,1737,1475,1226,966,719,453,204,4044,3781,3535,3270,3018,2755,2505,2240,2240,2505,2755,3018,3270,3535,3781,4044,204,453,719,966,1226,1475,1737,1984,2384,2137,2899,2650,3414,3167,3925,3676,348,85,863,598,1370,1107,1881,1616,2800,3065,2291,2554,3830,4095,3317,3580,764,1013,255,502,1786,2035,1273,1520,2912,2665,2403,2154,3942,3695,3429,3180,876,613,367,102,1898,1635,1385,1120,3232,3497,3747,4010,2214,2479,2725,2988,1196,1445,1711,1958,170,419,681,928,3376,3129,3891,3642,2358,2111,2869,2620,1340,1077,1855,1590,314,51,825,560,3728,3993,3219,3482,2710,2975,2197,2460,1692,1941,1183,1430,666,915,153,400,3840,3593,3331,3082,2822,2575,2309,2060,1804,1541,1295,1030,778,515,265,0]),ca=new Int32Array([-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,0,8,3,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,0,1,9,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,1,8,3,9,8,1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,1,2,10,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,0,8,3,1,2,10,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,9,2,10,0,2,9,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,2,8,3,2,10,8,10,9,8,-1,-1,-1,-1,-1,-1,-1,3,11,2,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,0,11,2,8,11,0,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,1,9,0,2,3,11,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,1,11,2,1,9,11,9,8,11,-1,-1,-1,-1,-1,-1,-1,3,10,1,11,10,3,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,0,10,1,0,8,10,8,11,10,-1,-1,-1,-1,-1,-1,-1,3,9,0,3,11,9,11,10,9,-1,-1,-1,-1,-1,-1,-1,9,8,10,10,8,11,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,4,7,8,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,4,3,0,7,3,4,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,0,1,9,8,4,7,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,4,1,9,4,7,1,7,3,1,-1,-1,-1,-1,-1,-1,-1,1,2,10,8,4,7,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,3,4,7,3,0,4,1,2,10,-1,-1,-1,-1,-1,-1,-1,9,2,10,9,0,2,8,4,7,-1,-1,-1,-1,-1,-1,-1,2,10,9,2,9,7,2,7,3,7,9,4,-1,-1,-1,-1,8,4,7,3,11,2,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,11,4,7,11,2,4,2,0,4,-1,-1,-1,-1,-1,-1,-1,9,0,1,8,4,7,2,3,11,-1,-1,-1,-1,-1,-1,-1,4,7,11,9,4,11,9,11,2,9,2,1,-1,-1,-1,-1,3,10,1,3,11,10,7,8,4,-1,-1,-1,-1,-1,-1,-1,1,11,10,1,4,11,1,0,4,7,11,4,-1,-1,-1,-1,4,7,8,9,0,11,9,11,10,11,0,3,-1,-1,-1,-1,4,7,11,4,11,9,9,11,10,-1,-1,-1,-1,-1,-1,-1,9,5,4,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,9,5,4,0,8,3,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,0,5,4,1,5,0,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,8,5,4,8,3,5,3,1,5,-1,-1,-1,-1,-1,-1,-1,1,2,10,9,5,4,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,3,0,8,1,2,10,4,9,5,-1,-1,-1,-1,-1,-1,-1,5,2,10,5,4,2,4,0,2,-1,-1,-1,-1,-1,-1,-1,2,10,5,3,2,5,3,5,4,3,4,8,-1,-1,-1,-1,9,5,4,2,3,11,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,0,11,2,0,8,11,4,9,5,-1,-1,-1,-1,-1,-1,-1,0,5,4,0,1,5,2,3,11,-1,-1,-1,-1,-1,-1,-1,2,1,5,2,5,8,2,8,11,4,8,5,-1,-1,-1,-1,10,3,11,10,1,3,9,5,4,-1,-1,-1,-1,-1,-1,-1,4,9,5,0,8,1,8,10,1,8,11,10,-1,-1,-1,-1,5,4,0,5,0,11,5,11,10,11,0,3,-1,-1,-1,-1,5,4,8,5,8,10,10,8,11,-1,-1,-1,-1,-1,-1,-1,9,7,8,5,7,9,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,9,3,0,9,5,3,5,7,3,-1,-1,-1,-1,-1,-1,-1,0,7,8,0,1,7,1,5,7,-1,-1,-1,-1,-1,-1,-1,1,5,3,3,5,7,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,9,7,8,9,5,7,10,1,2,-1,-1,-1,-1,-1,-1,-1,10,1,2,9,5,0,5,3,0,5,7,3,-1,-1,-1,-1,8,0,2,8,2,5,8,5,7,10,5,2,-1,-1,-1,-1,2,10,5,2,5,3,3,5,7,-1,-1,-1,-1,-1,-1,-1,7,9,5,7,8,9,3,11,2,-1,-1,-1,-1,-1,-1,-1,9,5,7,9,7,2,9,2,0,2,7,11,-1,-1,-1,-1,2,3,11,0,1,8,1,7,8,1,5,7,-1,-1,-1,-1,11,2,1,11,1,7,7,1,5,-1,-1,-1,-1,-1,-1,-1,9,5,8,8,5,7,10,1,3,10,3,11,-1,-1,-1,-1,5,7,0,5,0,9,7,11,0,1,0,10,11,10,0,-1,11,10,0,11,0,3,10,5,0,8,0,7,5,7,0,-1,11,10,5,7,11,5,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,10,6,5,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,0,8,3,5,10,6,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,9,0,1,5,10,6,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,1,8,3,1,9,8,5,10,6,-1,-1,-1,-1,-1,-1,-1,1,6,5,2,6,1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,1,6,5,1,2,6,3,0,8,-1,-1,-1,-1,-1,-1,-1,9,6,5,9,0,6,0,2,6,-1,-1,-1,-1,-1,-1,-1,5,9,8,5,8,2,5,2,6,3,2,8,-1,-1,-1,-1,2,3,11,10,6,5,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,11,0,8,11,2,0,10,6,5,-1,-1,-1,-1,-1,-1,-1,0,1,9,2,3,11,5,10,6,-1,-1,-1,-1,-1,-1,-1,5,10,6,1,9,2,9,11,2,9,8,11,-1,-1,-1,-1,6,3,11,6,5,3,5,1,3,-1,-1,-1,-1,-1,-1,-1,0,8,11,0,11,5,0,5,1,5,11,6,-1,-1,-1,-1,3,11,6,0,3,6,0,6,5,0,5,9,-1,-1,-1,-1,6,5,9,6,9,11,11,9,8,-1,-1,-1,-1,-1,-1,-1,5,10,6,4,7,8,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,4,3,0,4,7,3,6,5,10,-1,-1,-1,-1,-1,-1,-1,1,9,0,5,10,6,8,4,7,-1,-1,-1,-1,-1,-1,-1,10,6,5,1,9,7,1,7,3,7,9,4,-1,-1,-1,-1,6,1,2,6,5,1,4,7,8,-1,-1,-1,-1,-1,-1,-1,1,2,5,5,2,6,3,0,4,3,4,7,-1,-1,-1,-1,8,4,7,9,0,5,0,6,5,0,2,6,-1,-1,-1,-1,7,3,9,7,9,4,3,2,9,5,9,6,2,6,9,-1,3,11,2,7,8,4,10,6,5,-1,-1,-1,-1,-1,-1,-1,5,10,6,4,7,2,4,2,0,2,7,11,-1,-1,-1,-1,0,1,9,4,7,8,2,3,11,5,10,6,-1,-1,-1,-1,9,2,1,9,11,2,9,4,11,7,11,4,5,10,6,-1,8,4,7,3,11,5,3,5,1,5,11,6,-1,-1,-1,-1,5,1,11,5,11,6,1,0,11,7,11,4,0,4,11,-1,0,5,9,0,6,5,0,3,6,11,6,3,8,4,7,-1,6,5,9,6,9,11,4,7,9,7,11,9,-1,-1,-1,-1,10,4,9,6,4,10,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,4,10,6,4,9,10,0,8,3,-1,-1,-1,-1,-1,-1,-1,10,0,1,10,6,0,6,4,0,-1,-1,-1,-1,-1,-1,-1,8,3,1,8,1,6,8,6,4,6,1,10,-1,-1,-1,-1,1,4,9,1,2,4,2,6,4,-1,-1,-1,-1,-1,-1,-1,3,0,8,1,2,9,2,4,9,2,6,4,-1,-1,-1,-1,0,2,4,4,2,6,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,8,3,2,8,2,4,4,2,6,-1,-1,-1,-1,-1,-1,-1,10,4,9,10,6,4,11,2,3,-1,-1,-1,-1,-1,-1,-1,0,8,2,2,8,11,4,9,10,4,10,6,-1,-1,-1,-1,3,11,2,0,1,6,0,6,4,6,1,10,-1,-1,-1,-1,6,4,1,6,1,10,4,8,1,2,1,11,8,11,1,-1,9,6,4,9,3,6,9,1,3,11,6,3,-1,-1,-1,-1,8,11,1,8,1,0,11,6,1,9,1,4,6,4,1,-1,3,11,6,3,6,0,0,6,4,-1,-1,-1,-1,-1,-1,-1,6,4,8,11,6,8,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,7,10,6,7,8,10,8,9,10,-1,-1,-1,-1,-1,-1,-1,0,7,3,0,10,7,0,9,10,6,7,10,-1,-1,-1,-1,10,6,7,1,10,7,1,7,8,1,8,0,-1,-1,-1,-1,10,6,7,10,7,1,1,7,3,-1,-1,-1,-1,-1,-1,-1,1,2,6,1,6,8,1,8,9,8,6,7,-1,-1,-1,-1,2,6,9,2,9,1,6,7,9,0,9,3,7,3,9,-1,7,8,0,7,0,6,6,0,2,-1,-1,-1,-1,-1,-1,-1,7,3,2,6,7,2,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,2,3,11,10,6,8,10,8,9,8,6,7,-1,-1,-1,-1,2,0,7,2,7,11,0,9,7,6,7,10,9,10,7,-1,1,8,0,1,7,8,1,10,7,6,7,10,2,3,11,-1,11,2,1,11,1,7,10,6,1,6,7,1,-1,-1,-1,-1,8,9,6,8,6,7,9,1,6,11,6,3,1,3,6,-1,0,9,1,11,6,7,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,7,8,0,7,0,6,3,11,0,11,6,0,-1,-1,-1,-1,7,11,6,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,7,6,11,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,3,0,8,11,7,6,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,0,1,9,11,7,6,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,8,1,9,8,3,1,11,7,6,-1,-1,-1,-1,-1,-1,-1,10,1,2,6,11,7,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,1,2,10,3,0,8,6,11,7,-1,-1,-1,-1,-1,-1,-1,2,9,0,2,10,9,6,11,7,-1,-1,-1,-1,-1,-1,-1,6,11,7,2,10,3,10,8,3,10,9,8,-1,-1,-1,-1,7,2,3,6,2,7,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,7,0,8,7,6,0,6,2,0,-1,-1,-1,-1,-1,-1,-1,2,7,6,2,3,7,0,1,9,-1,-1,-1,-1,-1,-1,-1,1,6,2,1,8,6,1,9,8,8,7,6,-1,-1,-1,-1,10,7,6,10,1,7,1,3,7,-1,-1,-1,-1,-1,-1,-1,10,7,6,1,7,10,1,8,7,1,0,8,-1,-1,-1,-1,0,3,7,0,7,10,0,10,9,6,10,7,-1,-1,-1,-1,7,6,10,7,10,8,8,10,9,-1,-1,-1,-1,-1,-1,-1,6,8,4,11,8,6,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,3,6,11,3,0,6,0,4,6,-1,-1,-1,-1,-1,-1,-1,8,6,11,8,4,6,9,0,1,-1,-1,-1,-1,-1,-1,-1,9,4,6,9,6,3,9,3,1,11,3,6,-1,-1,-1,-1,6,8,4,6,11,8,2,10,1,-1,-1,-1,-1,-1,-1,-1,1,2,10,3,0,11,0,6,11,0,4,6,-1,-1,-1,-1,4,11,8,4,6,11,0,2,9,2,10,9,-1,-1,-1,-1,10,9,3,10,3,2,9,4,3,11,3,6,4,6,3,-1,8,2,3,8,4,2,4,6,2,-1,-1,-1,-1,-1,-1,-1,0,4,2,4,6,2,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,1,9,0,2,3,4,2,4,6,4,3,8,-1,-1,-1,-1,1,9,4,1,4,2,2,4,6,-1,-1,-1,-1,-1,-1,-1,8,1,3,8,6,1,8,4,6,6,10,1,-1,-1,-1,-1,10,1,0,10,0,6,6,0,4,-1,-1,-1,-1,-1,-1,-1,4,6,3,4,3,8,6,10,3,0,3,9,10,9,3,-1,10,9,4,6,10,4,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,4,9,5,7,6,11,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,0,8,3,4,9,5,11,7,6,-1,-1,-1,-1,-1,-1,-1,5,0,1,5,4,0,7,6,11,-1,-1,-1,-1,-1,-1,-1,11,7,6,8,3,4,3,5,4,3,1,5,-1,-1,-1,-1,9,5,4,10,1,2,7,6,11,-1,-1,-1,-1,-1,-1,-1,6,11,7,1,2,10,0,8,3,4,9,5,-1,-1,-1,-1,7,6,11,5,4,10,4,2,10,4,0,2,-1,-1,-1,-1,3,4,8,3,5,4,3,2,5,10,5,2,11,7,6,-1,7,2,3,7,6,2,5,4,9,-1,-1,-1,-1,-1,-1,-1,9,5,4,0,8,6,0,6,2,6,8,7,-1,-1,-1,-1,3,6,2,3,7,6,1,5,0,5,4,0,-1,-1,-1,-1,6,2,8,6,8,7,2,1,8,4,8,5,1,5,8,-1,9,5,4,10,1,6,1,7,6,1,3,7,-1,-1,-1,-1,1,6,10,1,7,6,1,0,7,8,7,0,9,5,4,-1,4,0,10,4,10,5,0,3,10,6,10,7,3,7,10,-1,7,6,10,7,10,8,5,4,10,4,8,10,-1,-1,-1,-1,6,9,5,6,11,9,11,8,9,-1,-1,-1,-1,-1,-1,-1,3,6,11,0,6,3,0,5,6,0,9,5,-1,-1,-1,-1,0,11,8,0,5,11,0,1,5,5,6,11,-1,-1,-1,-1,6,11,3,6,3,5,5,3,1,-1,-1,-1,-1,-1,-1,-1,1,2,10,9,5,11,9,11,8,11,5,6,-1,-1,-1,-1,0,11,3,0,6,11,0,9,6,5,6,9,1,2,10,-1,11,8,5,11,5,6,8,0,5,10,5,2,0,2,5,-1,6,11,3,6,3,5,2,10,3,10,5,3,-1,-1,-1,-1,5,8,9,5,2,8,5,6,2,3,8,2,-1,-1,-1,-1,9,5,6,9,6,0,0,6,2,-1,-1,-1,-1,-1,-1,-1,1,5,8,1,8,0,5,6,8,3,8,2,6,2,8,-1,1,5,6,2,1,6,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,1,3,6,1,6,10,3,8,6,5,6,9,8,9,6,-1,10,1,0,10,0,6,9,5,0,5,6,0,-1,-1,-1,-1,0,3,8,5,6,10,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,10,5,6,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,11,5,10,7,5,11,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,11,5,10,11,7,5,8,3,0,-1,-1,-1,-1,-1,-1,-1,5,11,7,5,10,11,1,9,0,-1,-1,-1,-1,-1,-1,-1,10,7,5,10,11,7,9,8,1,8,3,1,-1,-1,-1,-1,11,1,2,11,7,1,7,5,1,-1,-1,-1,-1,-1,-1,-1,0,8,3,1,2,7,1,7,5,7,2,11,-1,-1,-1,-1,9,7,5,9,2,7,9,0,2,2,11,7,-1,-1,-1,-1,7,5,2,7,2,11,5,9,2,3,2,8,9,8,2,-1,2,5,10,2,3,5,3,7,5,-1,-1,-1,-1,-1,-1,-1,8,2,0,8,5,2,8,7,5,10,2,5,-1,-1,-1,-1,9,0,1,5,10,3,5,3,7,3,10,2,-1,-1,-1,-1,9,8,2,9,2,1,8,7,2,10,2,5,7,5,2,-1,1,3,5,3,7,5,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,0,8,7,0,7,1,1,7,5,-1,-1,-1,-1,-1,-1,-1,9,0,3,9,3,5,5,3,7,-1,-1,-1,-1,-1,-1,-1,9,8,7,5,9,7,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,5,8,4,5,10,8,10,11,8,-1,-1,-1,-1,-1,-1,-1,5,0,4,5,11,0,5,10,11,11,3,0,-1,-1,-1,-1,0,1,9,8,4,10,8,10,11,10,4,5,-1,-1,-1,-1,10,11,4,10,4,5,11,3,4,9,4,1,3,1,4,-1,2,5,1,2,8,5,2,11,8,4,5,8,-1,-1,-1,-1,0,4,11,0,11,3,4,5,11,2,11,1,5,1,11,-1,0,2,5,0,5,9,2,11,5,4,5,8,11,8,5,-1,9,4,5,2,11,3,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,2,5,10,3,5,2,3,4,5,3,8,4,-1,-1,-1,-1,5,10,2,5,2,4,4,2,0,-1,-1,-1,-1,-1,-1,-1,3,10,2,3,5,10,3,8,5,4,5,8,0,1,9,-1,5,10,2,5,2,4,1,9,2,9,4,2,-1,-1,-1,-1,8,4,5,8,5,3,3,5,1,-1,-1,-1,-1,-1,-1,-1,0,4,5,1,0,5,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,8,4,5,8,5,3,9,0,5,0,3,5,-1,-1,-1,-1,9,4,5,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,4,11,7,4,9,11,9,10,11,-1,-1,-1,-1,-1,-1,-1,0,8,3,4,9,7,9,11,7,9,10,11,-1,-1,-1,-1,1,10,11,1,11,4,1,4,0,7,4,11,-1,-1,-1,-1,3,1,4,3,4,8,1,10,4,7,4,11,10,11,4,-1,4,11,7,9,11,4,9,2,11,9,1,2,-1,-1,-1,-1,9,7,4,9,11,7,9,1,11,2,11,1,0,8,3,-1,11,7,4,11,4,2,2,4,0,-1,-1,-1,-1,-1,-1,-1,11,7,4,11,4,2,8,3,4,3,2,4,-1,-1,-1,-1,2,9,10,2,7,9,2,3,7,7,4,9,-1,-1,-1,-1,9,10,7,9,7,4,10,2,7,8,7,0,2,0,7,-1,3,7,10,3,10,2,7,4,10,1,10,0,4,0,10,-1,1,10,2,8,7,4,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,4,9,1,4,1,7,7,1,3,-1,-1,-1,-1,-1,-1,-1,4,9,1,4,1,7,0,8,1,8,7,1,-1,-1,-1,-1,4,0,3,7,4,3,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,4,8,7,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,9,10,8,10,11,8,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,3,0,9,3,9,11,11,9,10,-1,-1,-1,-1,-1,-1,-1,0,1,10,0,10,8,8,10,11,-1,-1,-1,-1,-1,-1,-1,3,1,10,11,3,10,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,1,2,11,1,11,9,9,11,8,-1,-1,-1,-1,-1,-1,-1,3,0,9,3,9,11,1,2,9,2,11,9,-1,-1,-1,-1,0,2,11,8,0,11,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,3,2,11,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,2,3,8,2,8,10,10,8,9,-1,-1,-1,-1,-1,-1,-1,9,10,2,0,9,2,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,2,3,8,2,8,10,0,1,8,1,10,8,-1,-1,-1,-1,1,10,2,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,1,3,8,9,1,8,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,0,9,1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,0,3,8,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1]),Oo=(t,n,e,o,s,i,a)=>Math.sqrt((t-o)*(t-o)+(n-s)*(n-s)+(e-i)*(e-i))-a;function Gt(t,n,e,o,s,i,a,r,c){const l=t-o,d=n-s,f=e-i,u=Math.sqrt((l/a)**2+(d/r)**2+(f/c)**2),h=Math.sqrt((l/(a*a))**2+(d/(r*r))**2+(f/(c*c))**2);return h<1e-9?-Math.min(a,r,c):u*(u-1)/h}function Kt(t,n,e,o,s,i,a,r,c,l,d){const f=t-o,u=n-s,h=e-i,p=a-o,x=r-s,m=c-i,g=Math.min(1,Math.max(0,(f*p+u*x+h*m)/(p*p+x*x+m*m))),v=f-p*g,w=u-x*g,M=h-m*g;return Math.sqrt(v*v+w*w+M*M)-(l+(d-l)*g)}function Bi(t,n,e,o,s,i,a,r){const c=Math.sqrt((t-o)*(t-o)+(e-i)*(e-i))-a,l=n-s;return Math.sqrt(c*c+l*l)-r}function mo(t,n,e,o,s,i,a,r,c,l=0){const d=Math.abs(t-o)-a+l,f=Math.abs(n-s)-r+l,u=Math.abs(e-i)-c+l,h=Math.max(d,0),p=Math.max(f,0),x=Math.max(u,0);return Math.sqrt(h*h+p*p+x*x)+Math.min(Math.max(d,f,u),0)-l}function Ve(t,n,e){const o=Math.max(e-Math.abs(t-n),0)/e;return Math.min(t,n)-o*o*e*.25}function oo(t,n,e){const o=Math.max(e-Math.abs(t-n),0)/e;return Math.max(t,n)+o*o*e*.25}function lo(t,n,e,o,s={}){const i=new mx(o,new Tt,!1,!1,s.maxTris??9e4);i.isolation=0;const a=i.field,r=o/2,c=s.boundR!==void 0?s.boundR*s.boundR:1/0;let l=0;for(let p=0;p<o;p++){const x=n[2]+(p-r)/r*e;for(let m=0;m<o;m++){const g=n[1]+(m-r)/r*e;for(let v=0;v<o;v++){const w=n[0]+(v-r)/r*e,M=w-n[0],y=g-n[1],b=x-n[2];M*M+y*y+b*b>c?a[l++]=-1:a[l++]=-t(w,g,x)/e}}}i.update();const d=i.count,f=new Float32Array(d*3),u=new Float32Array(d*3);for(let p=0;p<d*3;p+=3){f[p]=n[0]+i.positionArray[p]*e,f[p+1]=n[1]+i.positionArray[p+1]*e,f[p+2]=n[2]+i.positionArray[p+2]*e;const x=i.normalArray[p],m=i.normalArray[p+1],g=i.normalArray[p+2],v=Math.sqrt(x*x+m*m+g*g)||1;u[p]=x/v,u[p+1]=m/v,u[p+2]=g/v}i.geometry.dispose();const h=new jt;return h.setAttribute("position",new lt(f,3)),h.setAttribute("normal",new lt(u,3)),h}function Da(t){const n=t.attributes.position.array,e=t.attributes.normal.array,o=n.length/3,s=new Float32Array(n.length),i=new Float32Array(e.length);for(let r=0;r<o;r+=3)for(let c=0;c<3;c++){const l=(r+c)*3,d=(r+(c===1?2:c===2?1:0))*3;s[d]=-n[l],s[d+1]=n[l+1],s[d+2]=n[l+2],i[d]=-e[l],i[d+1]=e[l+1],i[d+2]=e[l+2]}const a=new jt;return a.setAttribute("position",new lt(s,3)),a.setAttribute("normal",new lt(i,3)),a}function vx(t){const n=t.attributes.position,e=new Float32Array(n.count*3),o=(s,i)=>Math.max(0,1-s/i)**1.5;for(let s=0;s<n.count;s++){const i=Math.abs(n.getX(s)),a=n.getY(s),r=n.getZ(s);let c=1,l=1,d=1;const f=(u,h,p,x)=>{c+=(h-c)*u,l+=(p-l)*u,d+=(x-d)*u};if(r>.06){const u=o(Math.sqrt((i/.024)**2+((a-.1205)/.0105)**2),1);f(u*.85,.96,.66,.64),f(o(Math.hypot(i-.047,a-.158,r-.065),.034)*.45,1,.84,.82),f(o(Math.hypot(i-.034,(a-.2)*1.25,r-.075),.03)*.5,.82,.68,.66),f(o(Math.hypot(i-.034,a-.18,r-.075),.014)*.25,.9,.78,.8),f(o(Math.hypot(i-.0066,a-.149,r-.099),.009)*.9,.5,.36,.34),f(o(Math.hypot(i,a-.158,r-.108),.012)*.3,1,.82,.8)}e[s*3]=c,e[s*3+1]=l,e[s*3+2]=d}return t.setAttribute("color",new lt(e,3)),t}function Gf(t=1){return vx(lo((e,o,s)=>{const i=Math.abs(e);let a=Gt(i,o,s,0,.217,-.018,.074,.09,.098);return a=Ve(a,Gt(i,o,s,0,.183,.02,.06,.082,.068),.045),a=Ve(a,Kt(i,o,s,.042,.146,-.014,0,.098,.059,.023,.02),.03),a=Ve(a,Oo(i,o,s,0,.094,.06,.0215),.02),a=Ve(a,Oo(i,o,s,.048,.176,.046,.0225),.03),a=Ve(a,Gt(i,o,s,.04,.155,.048,.017,.02,.014),.03),a=Ve(a,Kt(i,o,s,0,.212,.078,.046,.207,.069,.0115,.0105),.02),a=Ve(a,Kt(i,o,s,0,.206,.082,0,.166,.096,.0075,.0095),.012),a=Ve(a,Oo(i,o,s,0,.159,.097,.0108),.01),a=Ve(a,Oo(i,o,s,.0105,.155,.092,.0075),.008),a=Ve(a,Kt(i,o,s,0,.12,-.016,0,0,-.004,.041,.05),.045),a=Ve(a,Oo(i,o,s,0,.07,.04,.009),.02),a=Ve(a,Gt(i,o,s,.0775,.191,-.012,.0085,.034,.022),.012),a=Ve(a,Kt(i,o,s,0,.1292,.0792,.019,.1258,.0725,.0062,.0055),.007),a=Ve(a,Oo(i,o,s,.0042,.1296,.0805,.0046),.004),a=Ve(a,Kt(i,o,s,0,.1132,.0765,.016,.1152,.0705,.0076,.0064),.007),a=oo(a,-Gt(i,o,s,.034,.2,.083,.021,.016,.02),.012),a=oo(a,-Oo(i,o,s,.0066,.149,.097,.0042),.003),a=oo(a,-Gt(i,o,s,0,.1212,.082,.021,.0013,.013),.002),a=oo(a,-Kt(i,o,s,.003,.14,.098,.003,.132,.091,.0016,.0016),.002),a=oo(a,-Kt(i,o,s,.022,.15,.078,.028,.122,.07,.0022,.0018),.004),a=Ve(a,Oo(i,o,s,.05,.14,-.012,.017),.03),a=Ve(a,Kt(i,o,s,.044,.125,-.032,.02,0,.016,.017,.016),.03),a=oo(a,-Gt(i,o,s,.085,.19,-.008,.008,.02,.011),.006),a=Ve(a,Gt(i,o,s,.034,.2135,.0745,.0165,.0065,.0115),.006),a=Ve(a,Gt(i,o,s,.034,.1865,.0745,.0155,.004,.01),.005),a},[0,.1,.02],.16,Math.max(24,Math.round(84*t)),{boundR:.2}))}function Hf(t=1){const n=(o,s,i,a,r,c,l)=>{let d=1e9,f=0,u=-.082,h=a,p=0;const x=[r*.5,r*.32,r*.24],m=[c,c*.88,c*.78];for(let g=0;g<3;g++){p+=l*(g===0?.55:1);const v=f-Math.sin(p)*x[g],w=u-Math.cos(p)*x[g];d=Math.min(d,Kt(o,s,i,f,u,h,v,w,h,m[g],m[Math.min(g+1,2)]*.96)),f=v,u=w}return d};return lo((o,s,i)=>{let a=mo(o,s,i,0,-.044,0,.014,.036,.036,.011);a=Ve(a,Kt(o,s,i,0,.012,0,0,-.02,0,.021,.026),.02),a=Ve(a,Gt(o,s,i,-.004,-.032,.03,.014,.024,.013),.015);const r=.52;return a=Ve(a,n(o,s,i,.027,.074,.0088,r),.006),a=Ve(a,n(o,s,i,.009,.082,.0091,r+.03),.006),a=Ve(a,n(o,s,i,-.009,.076,.0086,r+.06),.006),a=Ve(a,n(o,s,i,-.026,.06,.0078,r+.1),.006),a=Ve(a,Kt(o,s,i,-.004,-.04,.034,-.012,-.066,.046,.0108,.0092),.01),a=Ve(a,Kt(o,s,i,-.012,-.066,.046,-.02,-.086,.05,.0092,.0078),.008),a},[-.02,-.07,.005],.1,Math.max(24,Math.round(64*t)),{boundR:.13})}function Vf(t,n){return t===1?n:Da(n)}function y0(t,n,e){const o=Math.abs(t);let s=Gt(o,n,e,0,1.34,0,.156,.172,.1);s=Ve(s,Gt(o,n,e,.065,1.31,.026,.08,.065,.075),.05),s=Ve(s,Gt(o,n,e,0,1.14,0,.14,.17,.092),.06),s=Ve(s,Gt(o,n,e,0,.97,-.004,.155,.13,.108),.06),s=Ve(s,Kt(o,n,e,.03,1.518,-.012,.188,1.452,-.002,.064,.054),.085),s=Ve(s,Gt(o,n,e,.2,1.445,0,.06,.062,.066),.05),s=Ve(s,Kt(o,n,e,0,1.47,-.02,0,1.54,-.02,.095,.058),.07),s=Ve(s,Bi(o,n,e,0,1.525,0,.074,.026),.02),s=Ve(s,mo(o,n,e,.085,1.27,.094,.04,.03,.014,.006),.006),s=oo(s,.88-n,.03),s=oo(s,-Kt(o,n,e,0,1.43,-.006,0,1.62,-.006,.058,.058),.014);const i=Math.atan2(e,t);return s+=(Math.sin(i*7+n*13)*.5+Math.sin(i*12-n*8+1.7)*.3)*(n<1.15?.0055:.0028),s}function Wf(t=1){return lo(y0,[0,1.22,-.005],.5,Math.max(24,Math.round(92*t)),{boundR:.55,maxTris:16e4})}function xx(){const t=(e,o,s)=>Math.abs(y0(e,o,s)-.0075)-.0075;return lo((e,o,s)=>{const i=Math.abs(e),a=mo(i,o,s,.093,1.34,-.01,.022,.2,.24,.004),r=mo(i,o,s,.05,1.335,.05,.05,.009,.14,.003),c=Math.abs(o-1.045)-.017,l=Math.min(a,r,c);return Math.max(t(e,o,s),l)},[0,1.25,-.005],.4,100,{boundR:.46,maxTris:12e4})}function _x(){const t=(e,o,s)=>Math.abs(y0(e,o,s)-.006)-.006;return lo((e,o,s)=>Math.max(t(e,o,s),mo(e,o,s,0,1.2,.12,.0055,.265,.1,.002)),[0,1.2,.08],.3,80,{boundR:.34,maxTris:4e4})}function Xf(t=1){return lo((e,o,s)=>{let i=Kt(e,o,s,0,0,0,0,-.28,0,.056,.046);i=Ve(i,Oo(e,o,s,0,.005,0,.062),.03),i=Ve(i,Gt(e,o,s,.004,-.045,0,.058,.08,.06),.04),i=Ve(i,Gt(e,o,s,0,-.13,.011,.048,.09,.046),.03);const a=Math.atan2(s,e);return i+=(Math.sin(a*6+o*17)*.5+Math.sin(a*3-o*9)*.3)*.0028,i},[0,-.14,0],.2,Math.max(24,Math.round(60*t)),{boundR:.26})}function Kf(t=1){return lo((e,o,s)=>{let i=Kt(e,o,s,0,0,0,0,-.255,0,.046,.039);i=Ve(i,Gt(e,o,s,0,-.07,.004,.05,.095,.046),.03),i=Ve(i,Bi(e,o,s,0,-.246,0,.039,.0092),.01);const a=Math.atan2(s,e);return i+=(Math.sin(a*5+o*21)*.5+Math.sin(a*9-o*11)*.3)*.0026*(o>-.2?1:.4),i},[0,-.13,0],.19,Math.max(24,Math.round(56*t)),{boundR:.24})}function qf(t=1){return lo((e,o,s)=>{let i=Kt(e,o,s,0,0,0,0,-.42,0,.108,.074);i=Ve(i,Gt(e,o,s,0,-.16,.02,.1,.17,.095),.05),i=Ve(i,Gt(e,o,s,0,-.1,-.035,.092,.12,.085),.05);const a=Math.atan2(s,e);return i+=(Math.sin(a*6+o*15)*.5+Math.sin(a*3-o*8+2.1)*.35)*.0034,i+=Math.max(0,Math.sin(o*70+1.1))*.0018*(o<-.3?1:0),i},[0,-.2,0],.28,Math.max(24,Math.round(60*t)),{boundR:.34})}function Yf(t=1){return lo((e,o,s)=>{let i=Kt(e,o,s,0,0,0,0,-.26,0,.074,.058);i=Ve(i,Gt(e,o,s,0,-.1,-.03,.06,.12,.06),.04),i=Ve(i,Bi(e,o,s,0,-.232,0,.063,.014),.012),i=Ve(i,Bi(e,o,s,0,-.215,0,.066,.012),.01);const a=Math.atan2(s,e);return i+=(Math.sin(a*5+o*19)*.5+Math.sin(a*8-o*9)*.3)*.0028,i},[0,-.13,0],.2,Math.max(24,Math.round(56*t)),{boundR:.26})}function $f(t=1){return lo((e,o,s)=>{const i=Math.abs(e);let a=Kt(i,o,s,0,-.17,0,0,-.39,.012,.06,.058);a=Ve(a,Gt(i,o,s,0,-.432,-.04,.046,.042,.048),.03),a=Ve(a,Gt(i,o,s,0,-.436,.03,.05,.04,.085),.03),a=Ve(a,Gt(i,o,s,0,-.446,.12,.051,.034,.062),.03),a=Ve(a,Bi(i,o,s,0,-.285,0,.059,.011),.01);const r=mo(i,o-Math.max(0,s-.11)*.18,s,0,-.468,.062,.06,.02,.148,.014);return a=Ve(a,r,.008),a+=Math.max(0,Math.sin(s*120))*.0012*(o<-.482?1:0),a},[0,-.36,.04],.21,Math.max(24,Math.round(80*t)),{boundR:.28})}function qr(t=1,n="short"){const e=n==="long",o=d=>Math.min(1,Math.max(0,d)),s=[[-.045,.262,.066,-.052,.236,.086],[-.025,.264,.07,-.032,.232,.091],[-.004,.266,.072,.012,.234,.093],[.02,.265,.07,.038,.236,.09],[.042,.262,.066,.058,.24,.083]],r=lo((d,f,u)=>{const h=Math.abs(d);let p=Gt(h,f,u,0,.221,-.018,.0855,.099,.106);p=Ve(p,Gt(h,f,u,0,.205,-.055,.078,.088,.07),.02),e&&(p=Ve(p,Kt(h,f,u,0,.17,-.078,0,-.04,-.09,.072,.06),.05));const x=.262-.05*(h/.08)*(h/.08),m=o((u+.01)/.03);p=oo(p,(x-f)*m-(1-m)*.5,.014),p=oo(p,-Gt(h,f,u,.079,.191,-.012,.022,.044,.034),.01),p=oo(p,(e?-.07:.158)-f,.014);for(const v of s)p=Ve(p,Kt(d,f,u,v[0],v[1],v[2],v[3],v[4],v[5],.0075,.0035),.006);const g=Math.atan2(d,u);return p+=.0012*Math.sin(g*80+Math.sin(f*45)*2.2),p},e?[0,.1,-.04]:[0,.19,-.015],e?.24:.15,Math.max(24,Math.round(80*t)),{boundR:e?.3:.2}),c=r.attributes.position,l=new Float32Array(c.count*3);for(let d=0;d<c.count;d++){const f=c.getX(d),u=c.getY(d),h=c.getZ(d),p=Math.atan2(f,h),x=Math.sin(p*70+Math.sin(u*45)*2.2)*.5+.5,m=Math.sin(p*9+u*22)*.5+.5,g=.55+x*.45+m*.25+Math.max(0,u-.28)*2.2;l[d*3]=.075*g,l[d*3+1]=.05*g,l[d*3+2]=.034*g}return r.setAttribute("color",new lt(l,3)),r}function Mx(t=1){return lo((e,o,s)=>{const i=Math.abs(e);let a=mo(i,o,s,0,1.3,-.165,.122,.182,.072,.05);return a=Ve(a,mo(i,o,s,0,1.46,-.168,.116,.036,.08,.03),.012),a=Ve(a,mo(i,o,s,0,1.425,-.092,.118,.012,.012,.006),.008),a=Ve(a,mo(i,o,s,0,1.19,-.235,.095,.07,.024,.02),.012),a=Ve(a,Kt(i,o,s,.14,1.14,-.165,.14,1.27,-.165,.03,.028),.01),a=Ve(a,Kt(i,o,s,-.11,1.1,-.18,.11,1.1,-.18,.034,.034),.01),a+=.0016*Math.exp(-(((i-.07)/.003)**2))*(o>1.1?1:0),a=oo(a,-mo(i,o,s,0,1.2,-.285,.003,.07,.01,.001),.001),a},[0,1.25,-.17],.3,Math.max(24,Math.round(88*t)),{boundR:.4,maxTris:9e4})}const wx=`
varying vec3 vAvLoc;
varying mat3 vAvNM;
float avH(vec3 p) { p = fract(p * 0.3183099 + vec3(0.1, 0.2, 0.3)); p *= 17.0; return fract(p.x * p.y * p.z * (p.x + p.y + p.z)); }
float avN(vec3 x) {
  vec3 i = floor(x), f = fract(x);
  f = f * f * (3.0 - 2.0 * f);
  return mix(mix(mix(avH(i), avH(i + vec3(1, 0, 0)), f.x), mix(avH(i + vec3(0, 1, 0)), avH(i + vec3(1, 1, 0)), f.x), f.y),
             mix(mix(avH(i + vec3(0, 0, 1)), avH(i + vec3(1, 0, 1)), f.x), mix(avH(i + vec3(0, 1, 1)), avH(i + vec3(1, 1, 1)), f.x), f.y), f.z);
}
`,bx={fabric:{fine:260,mid:48,weave:1,bump:4e-4,tone:.06,rough:.1},leather:{fine:210,mid:34,weave:0,bump:.0012,tone:.1,rough:.16},skin:{fine:330,mid:70,weave:0,bump:22e-5,tone:.025,rough:.06},metal:{fine:420,mid:22,weave:0,bump:6e-4,tone:.1,rough:.12}};function fo(t,n){const e=bx[n];return t.onBeforeCompile=o=>{o.vertexShader=`varying vec3 vAvLoc;
varying mat3 vAvNM;
`+o.vertexShader.replace("#include <begin_vertex>",`#include <begin_vertex>
 vAvLoc = position;
 vAvNM = normalMatrix;`);const s=n==="metal"?`avN(vec3(p.x * ${e.fine.toFixed(1)}, p.y * 6.0, p.z * ${e.fine.toFixed(1)})) * 0.5 + avN(p * ${e.mid.toFixed(1)}) * 0.5`:`avN(p * ${e.mid.toFixed(1)}) * 0.55 + avN(p * ${e.fine.toFixed(1)}) * 0.45${e.weave?" + (sin(p.x * 520.0) * sin(p.y * 520.0) + sin(p.y * 520.0 + 1.0) * sin(p.z * 520.0)) * 0.12":""}`;o.fragmentShader=wx+`float avHeight(vec3 p) { return ${s}; }
`+o.fragmentShader.replace("#include <color_fragment>",`#include <color_fragment>
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
         }`).replace("#include <opaque_fragment>",`${n==="skin"?`{
           // 皮肤次表面散射近似：掠射角处偏暖红的透光边缘
           float avF = pow(1.0 - clamp(abs(dot(normalize(normal), normalize(vViewPosition))), 0.0, 1.0), 2.6);
           outgoingLight += vec3(0.3, 0.09, 0.05) * avF * 0.1;
         }`:""}
         #include <opaque_fragment>`)},t.customProgramCacheKey=()=>`avatar-${n}-${t.vertexColors?"vc":"plain"}`,t.needsUpdate=!0,t}function Sx(){const t=(e,o,s=.02,i={})=>new ge({color:e,roughness:o,metalness:s,...i});return{jacket:fo(t(4147772,.84,0,{side:qe}),"fabric"),inner:fo(t(15526626,.9,0,{side:qe}),"fabric"),trousers:fo(t(3425628,.88),"fabric"),skin:fo(t(14858392,.55,0,{emissive:3806728,emissiveIntensity:.05}),"skin"),skinFace:fo(t(14858392,.5,0,{emissive:3806728,emissiveIntensity:.05,vertexColors:!0}),"skin"),leather:fo(t(7030320,.62,.04),"leather"),leatherDark:fo(t(4139549,.66,.04),"leather"),boot:fo(t(7031344,.6,.05),"leather"),sole:t(1775637,.9),hair:new ge({color:16777215,vertexColors:!0,roughness:.42,metalness:.15,side:qe}),brow:t(3811356,.7),trim:t(13214282,.4,.75,{emissive:5913096,emissiveIntensity:.18}),scarf:fo(t(10238510,.9,0,{side:qe}),"fabric"),brass:fo(t(11962940,.34,.85),"metal"),armor:Object.assign(new bn({color:1845043,roughness:.38,metalness:.6,clearcoat:.7,clearcoatRoughness:.25}),{}),eyeWhite:new bn({color:15986410,roughness:.22,clearcoat:.9,clearcoatRoughness:.08}),lip:t(10113096,.46),tunicVc:fo(t(16777215,.84,0,{vertexColors:!0,side:qe}),"fabric"),paper:t(16769696,.5,0,{emissive:16753978,emissiveIntensity:1,transparent:!0,opacity:.92})}}class $i{constructor(){Z(this,"b",new On)}add(n,e,o={}){this.b.add(n,e,o)}box(n,e,o,s,i={},a=.01){this.b.add(new Wo(e,o,s,2,Math.min(a,e/2.05,o/2.05,s/2.05)),n,i)}cyl(n,e,o,s,i={},a=16){this.b.add(new we(e,o,s,a,1),n,i)}ball(n,e,o={},s=14){this.b.add(new Se(e,s,Math.max(8,s-4)),n,o)}torus(n,e,o,s={},i=Math.PI*2,a=22){this.b.add(new he(e,o,8,a,i),n,s)}build(n,e){this.b.build(n,e,{})}}function ci(t,n,e){const o=new Xe;return o.position.set(t,n,e),o}function yx(){const n=document.createElement("canvas");n.width=n.height=256;const e=n.getContext("2d"),o=fn(77);e.fillStyle="#2a1a10",e.fillRect(0,0,256,256);const s=256/2,i=e.createRadialGradient(s,s,256*.08,s,s,256*.5);i.addColorStop(0,"#5a3a1f"),i.addColorStop(.55,"#8a5a2c"),i.addColorStop(.88,"#3a2412"),i.addColorStop(1,"#150c06"),e.fillStyle=i,e.beginPath(),e.arc(s,s,256*.5,0,Math.PI*2),e.fill();for(let r=0;r<220;r++){const c=o()*Math.PI*2,l=256*(.1+o()*.08),d=256*(.28+o()*.2);e.strokeStyle=`rgba(${o()>.5?"190,140,80":"60,36,18"},${.12+o()*.25})`,e.lineWidth=1+o()*1.4,e.beginPath(),e.moveTo(s+Math.cos(c)*l,s+Math.sin(c)*l),e.lineTo(s+Math.cos(c+(o()-.5)*.12)*d,s+Math.sin(c+(o()-.5)*.12)*d),e.stroke()}e.fillStyle="#060403",e.beginPath(),e.arc(s,s,256*.115,0,Math.PI*2),e.fill();const a=new Zt(n);return a.colorSpace=yt,a}let Bl;function Gl(t,n){const e=new V(new Se(.0128,22,16),t.eyeWhite);e.position.set(n*.034,.2,.0685),e.scale.set(1,.94,1),Bl??(Bl=yx());const o=new V(new Ds(.0072,28),new ge({map:Bl,roughness:.28,metalness:0}));o.position.set(0,0,.0124);const s=new V(new Se(.0072,18,12,0,Math.PI*2,0,Math.PI*.5),new bn({color:16777215,roughness:.02,metalness:0,transparent:!0,opacity:.16,clearcoat:1,clearcoatRoughness:.02}));s.rotation.x=Math.PI/2,s.position.set(0,0,.0098);const i=(l,d)=>new Se(.0139,22,10,0,Math.PI*2,l,d-l),a=new V(i(0,Math.PI*.45),t.skin),r=new V(i(Math.PI*.86,Math.PI),t.skin),c=new V(new he(.0132,6e-4,4,18,Math.PI*.85),t.brow);return c.rotation.set(0,0,Math.PI*.075),c.position.set(0,0,0),c.scale.set(1,1,.5),c.rotation.x=-.38,c.position.set(0,.004,.0058),e.add(o,s,a,r,c),e}function Tx(t,n){const e=ci(0,1.5,0),o=new V(Gf(),t.skinFace);o.castShadow=!0,e.add(o);const s=Gl(t,1),i=Gl(t,-1),a=[];for(const u of[-1,1]){const h=new Vn([new X(u*.016,-.001,0),new X(u*.034,.004,.003),new X(u*.052,.002,0),new X(u*.062,-.005,-.006)]),p=new Zn(h,10,.0032,6,!1);p.scale(1,.7,.55),a.push(p)}const r=.2165,c=new V(Wn(a.map(u=>{const h=u.toNonIndexed();return h.deleteAttribute("uv"),h})),t.brow);c.position.set(0,r,.0925),c.rotation.x=-.1;const l=.1215,d=new V(new l0(.0026,.03,3,8),t.lip);d.rotation.z=Math.PI/2,d.scale.set(1,1,.6),d.position.set(0,l,.0875);const f=new V(qr(),t.hair);return f.castShadow=!0,e.add(s,i,c,d,f),n.eyeL=s,n.eyeR=i,n.brow=c,n.mouth=d,{head:e,browY:r,mouthY:l}}let Yt={};function Hl(t,n){const e=new Xe;Yt.upper??(Yt.upper=Xf()),Yt.lower??(Yt.lower=Kf()),Yt.hand??(Yt.hand=Hf());const o=l=>n===1?l:Da(l),s=new V(o(Yt.upper),t.jacket);s.castShadow=!0,e.add(s);const i=ci(0,-.28,0);i.rotation.x=-.22,e.add(i),e.userData.elbow=i;const a=new V(o(Yt.lower),t.jacket);a.castShadow=!0,i.add(a);const r=ci(0,-.27,0);r.rotation.z=n*.04;const c=new V(Vf(n,Yt.hand),t.skin);if(c.castShadow=!0,r.add(c),n===1){const l=new $i;l.box(t.leatherDark,.026,.155,.115,{x:-.044,y:-.108,z:.02,rz:-.06},.006),l.box(t.inner,.016,.146,.104,{x:-.034,y:-.108,z:.02,rz:-.06},.003),l.box(t.brass,.03,.15,.008,{x:-.044,y:-.108,z:-.036,rz:-.06},.003),l.build(r,"notebook")}return i.add(r),e}function Vl(t,n){const e=new Xe;Yt.thigh??(Yt.thigh=qf()),Yt.shin??(Yt.shin=Yf()),Yt.boot??(Yt.boot=$f());const o=new V(Yt.thigh.clone(),t.trousers);o.castShadow=!0,e.add(o);const s=ci(0,-.42,0);e.add(s);const i=new V(Yt.shin.clone(),t.trousers);i.castShadow=!0,s.add(i);const a=ci(0,-.43,0);s.add(a);const r=Yt.boot.clone();r.translate(0,.43,0);const c=new V(r,t.boot);c.castShadow=!0,a.add(c);const l=new $i;for(let d=0;d<5;d++)l.box(t.inner,.056,.005,.005,{y:.032-d*.002,z:.052+d*.016,rx:-.4},.002),l.ball(t.brass,.0036,{x:.03,y:.035-d*.002,z:.052+d*.016},6),l.ball(t.brass,.0036,{x:-.03,y:.035-d*.002,z:.052+d*.016},6);return l.build(a,"laces"),{hip:e,knee:s,ankle:a}}function Ex(t){const n=new V(Wf(),t.jacket);return n.castShadow=!0,n}function Ax(t){const n=new $i;n.box(t.trousers,.35,.2,.21,{y:.97},.06),n.box(t.brass,.034,.028,.012,{y:1.04,z:.14},.004),n.torus(t.jacket,.085,.024,{y:1.51,rx:Math.PI/2,sx:1.06},Math.PI*2,26),n.torus(t.inner,.078,.014,{y:1.532,rx:Math.PI/2},Math.PI*2,26);for(const e of[-1,1])n.ball(t.brass,.0048,{x:e*.085,y:1.262,z:.112},6);return n.torus(t.scarf,.074,.032,{y:1.54,rx:Math.PI/2},Math.PI*2,26),n.torus(t.scarf,.082,.026,{y:1.51,rx:Math.PI/2-.12},Math.PI*2,26),n.ball(t.scarf,.044,{x:-.056,y:1.5,z:.075,sy:1.1,sz:.9},12),n}function Rx(t){const n=ci(.07,1.48,-.08),e=new Qe(.15,.52,3,10);e.translate(0,-.26,0);const o=e.attributes.position;for(let a=0;a<o.count;a++){const r=o.getX(a),c=o.getY(a);o.setZ(a,Math.sin(r*60+c*8)*.008*(1+-c*1.5)- -c*.03)}e.computeVertexNormals();const s=new V(e,t.scarf);s.castShadow=!0;const i=new $i;for(let a=0;a<8;a++)i.cyl(t.scarf,.0016,.0016,.035,{x:-.066+a*.019,y:-.54,z:-.018},4);return i.build(n,"scarf-fringe"),n.add(s),n.rotation.x=.16,n}function Px(t){const n=new Xe,e=new $i;e.cyl(t.paper,.046,.04,.1,{y:0},6),e.cyl(t.brass,.06,.05,.016,{y:.058},6),e.add(new xt(.066,.05,6),t.brass,{y:.09}),e.cyl(t.brass,.05,.05,.014,{y:-.057},6);for(let s=0;s<6;s++){const i=s/6*Math.PI*2;e.cyl(t.brass,.0022,.0022,.1,{x:Math.cos(i)*.045,y:0,z:Math.sin(i)*.045},4)}e.torus(t.brass,.034,.0035,{y:.108},Math.PI,12),e.ball(t.brass,.008,{y:.122},8),e.build(n,"lantern");const o=new ro(16757575,1.2,10);return n.add(o),n}function Cx(){const t=new Xe;t.name="Explorer";const n=Sx();t.add(Ex(n));const e=new V(xx(),n.leatherDark);e.castShadow=!0;const o=new V(_x(),n.brass),s=new V(Mx(),n.leather);s.castShadow=!0,t.add(e,o,s),Ax(n).build(t,"torso");const i={},{head:a,browY:r,mouthY:c}=Tx(n,i);t.add(a);const l=Rx(n);t.add(l);const d=Vl(n);d.hip.position.set(.09,.91,0);const f=Vl(n);f.hip.position.set(-.09,.91,0),t.add(d.hip,f.hip);const u=Hl(n,1);u.position.set(.2,1.46,0);const h=Hl(n,-1);h.position.set(-.2,1.46,0),t.add(u,h);const p=Px(n);p.position.set(0,-.69,.1),h.add(p);const x=new V(new ii(.5,.64,36),new Tt({color:9684477,transparent:!0,opacity:.22,side:qe}));x.rotation.x=-Math.PI/2,x.position.y=.03,x.userData.isFootRing=!0,t.add(x);const m={leftLeg:d,rightLeg:f,leftArm:u,rightArm:h,head:a,cape:l,eyeL:i.eyeL,eyeR:i.eyeR,brow:i.brow,mouth:i.mouth,faceRest:{browY:r,mouthY:c},mats:{jacket:n.jacket,trim:n.trim,cape:n.scarf}};return t.userData.rig=m,t}class Dx{constructor(){Z(this,"yaw",0);Z(this,"orbitAnchorYaw",0);Z(this,"pitch",.38);Z(this,"targetPos",new X);Z(this,"desiredPos",new X);Z(this,"dragElement");Z(this,"activePointerId",null);Z(this,"previousTouchAction","");Z(this,"zoom",1);Z(this,"onWheel",n=>{n.preventDefault(),this.zoom=bt.clamp(this.zoom*Math.exp(n.deltaY*.0012),.22,1.4)});Z(this,"isDragging",!1);Z(this,"lastX",0);Z(this,"downX",0);Z(this,"onPointerDown",n=>{var e;if(!(this.activePointerId!==null||n.pointerType==="mouse"&&n.button!==0)){this.activePointerId=n.pointerId,this.downX=n.clientX,this.lastX=n.clientX,this.isDragging=!1;try{(e=this.dragElement)==null||e.setPointerCapture(n.pointerId)}catch{}}});Z(this,"onPointerMove",n=>{if(n.pointerId!==this.activePointerId)return;const e=n.clientX-this.lastX;this.lastX=n.clientX,!this.isDragging&&Math.abs(n.clientX-this.downX)>10&&(this.isDragging=!0),this.isDragging&&this.addYaw(-e*.006)});Z(this,"onPointerEnd",n=>{n.pointerId===this.activePointerId&&(this.activePointerId=null,this.isDragging=!1)})}addYaw(n){this.yaw+=n}resetBehind(n){this.yaw=n,this.orbitAnchorYaw=n}update(n,e,o,s,i=!0,a){if(i&&!this.isDragging)this.yaw+=(o-this.yaw)*Math.min(1,s*2.5);else if(!i){const h=Math.atan2(Math.sin(this.yaw-this.orbitAnchorYaw),Math.cos(this.yaw-this.orbitAnchorYaw));this.yaw=this.orbitAnchorYaw+bt.clamp(h,-1.05,1.05)}const r=Math.cos(this.yaw),c=Math.sin(this.yaw),l=!i&&!!a,d=l?a:e,f=(l?Cc+8:Cc)*this.zoom,u=(s1+Math.sin(this.pitch)*3)*(l?1:.4+.6*this.zoom);return this.desiredPos.set(d.x-c*f,d.y+u,d.z-r*f),n.position.lerp(this.desiredPos,1-Math.exp(-5*s)),this.targetPos.copy(d),l||(this.targetPos.y+=1.55),n.lookAt(this.targetPos),this.yaw}bindDrag(n){this.disposeDrag(),this.dragElement=n,this.previousTouchAction=n.style.touchAction,n.style.touchAction="none",n.addEventListener("pointerdown",this.onPointerDown),n.addEventListener("pointermove",this.onPointerMove),n.addEventListener("pointerup",this.onPointerEnd),n.addEventListener("pointercancel",this.onPointerEnd),n.addEventListener("lostpointercapture",this.onPointerEnd),n.addEventListener("wheel",this.onWheel,{passive:!1})}disposeDrag(){const n=this.dragElement;n&&(n.removeEventListener("pointerdown",this.onPointerDown),n.removeEventListener("pointermove",this.onPointerMove),n.removeEventListener("pointerup",this.onPointerEnd),n.removeEventListener("pointercancel",this.onPointerEnd),n.removeEventListener("lostpointercapture",this.onPointerEnd),n.removeEventListener("wheel",this.onWheel),this.activePointerId!==null&&n.hasPointerCapture(this.activePointerId)&&n.releasePointerCapture(this.activePointerId),this.activePointerId=null,this.isDragging=!1,n.style.touchAction=this.previousTouchAction,this.dragElement=void 0)}}function jf(t){return[{off:-t-.55,lift:-.04,tone:.55},{off:-t-.18,lift:.1,tone:.78},{off:-t,lift:.17,tone:.95},{off:-t*.7,lift:.09,tone:1},{off:0,lift:.13,tone:1.06},{off:t*.7,lift:.09,tone:1},{off:t,lift:.17,tone:.95},{off:t+.18,lift:.1,tone:.78},{off:t+.55,lift:-.04,tone:.55}]}function Ix(t,n){const e=jf(n);if(t<=e[0].off)return e[0].lift;for(let o=1;o<e.length;o++)if(t<=e[o].off){const s=e[o-1],i=e[o],a=(t-s.off)/(i.off-s.off||1);return s.lift+(i.lift-s.lift)*a}return e[e.length-1].lift}function Lx(t,n){const e=new Xe;e.name="road";const o=n.width/2,s=new oe(n.base),i=jf(o),a=i.length,r=[],c=[],l=[],d=new X,f=new X,u=new oe,h=new oe(5208632);for(let g=0;g<=n.steps;g++){const v=g/n.steps;t.getPoint(v,d),t.getTangent(v,f);const w=-f.z,M=f.x,y=Math.hypot(w,M)||1;for(let b=0;b<a;b++){const{off:T,lift:_,tone:S}=i[b],E=d.x+w/y*T,A=d.z+M/y*T;r.push(E,n.groundY(E,A)+_,A);const R=.88+.24*Co(E*1.7,A*1.7,2);u.copy(s).multiplyScalar(S*R);const C=1-.14*Math.exp(-Math.pow((Math.abs(T)-o*.5)/(o*.18),2));if(u.multiplyScalar(C),Math.abs(T)>o){const I=.4+.5*Co(E*.9+40,A*.9+12,2);u.lerp(h,Math.min(.95,I*((Math.abs(T)-o)/.55+.35)))}c.push(u.r,u.g,u.b)}if(g>0){const b=g*a,T=(g-1)*a;for(let _=0;_<a-1;_++)l.push(T+_,b+_,T+_+1,T+_+1,b+_,b+_+1)}}const p=new jt;p.setAttribute("position",new Jt(r,3)),p.setAttribute("color",new Jt(c,3)),p.setIndex(l),p.computeVertexNormals();const x=new ge({color:16777215,vertexColors:!0,roughness:.96,metalness:.02,side:qe});z3(x);const m=new V(p,x);if(m.receiveShadow=!0,e.add(m),n.inlay){const g=[],v=[];for(let b=0;b<=n.steps;b++){const T=b/n.steps;t.getPoint(T,d),t.getTangent(T,f);const _=-f.z,S=f.x,E=Math.hypot(_,S)||1;for(const A of[-.09,.09]){const R=d.x+_/E*A,C=d.z+S/E*A;g.push(R,n.groundY(R,C)+.17,C)}if(b>0){const A=b*2,R=(b-1)*2;v.push(R,A,R+1,R+1,A,A+1)}}const w=new jt;w.setAttribute("position",new Jt(g,3)),w.setIndex(v),w.computeVertexNormals();const M=new ge({color:n.inlay.color,emissive:n.inlay.emissive,emissiveIntensity:n.inlay.intensity,roughness:.4,side:qe}),y=new V(w,M);y.userData.noShadow=!0,e.add(y)}return e}const Rr=[.02,.04],Nx=.1;function Zf(t){let n=0;for(let e=0;e<t.length;e++){const[o,s]=t[e],[i,a]=t[(e+1)%t.length];n+=o*a-i*s}return n*.5}function Qf(t,n,e,o){const s=[];for(let i=0;i<t.length;i++){const a=t[i],r=t[(i+1)%t.length],c=n*a[0]+e*a[1]-o,l=n*r[0]+e*r[1]-o;if(c<=0&&s.push(a),c<0&&l>0||c>0&&l<0){const d=c/(c-l);s.push([a[0]+(r[0]-a[0])*d,a[1]+(r[1]-a[1])*d])}}return s}function kx(t,n){let e=t;const o=t.length;for(let s=0;s<o&&e.length>=3;s++){const i=t[s],a=t[(s+1)%o],r=a[0]-i[0],c=a[1]-i[1],l=Math.hypot(r,c);if(l<1e-6)continue;const d=c/l,f=-r/l;e=Qf(e,d,f,d*i[0]+f*i[1]-n)}return e}function Wl(t,n=1e-5){const e=[];for(const o of t){const s=e[e.length-1];(!s||Math.hypot(o[0]-s[0],o[1]-s[1])>n)&&e.push(o)}for(;e.length>1&&Math.hypot(e[0][0]-e[e.length-1][0],e[0][1]-e[e.length-1][1])<=n;)e.pop();return e}function Ux(t){const n=t.slice();for(;n.length>8;){let e=0,o=1/0;for(let s=0;s<n.length;s++){const i=n[(s+n.length-1)%n.length],a=n[s],r=n[(s+1)%n.length],c=Math.abs((a[0]-i[0])*(r[1]-i[1])-(r[0]-i[0])*(a[1]-i[1]));c<o&&(o=c,e=s)}n.splice(e,1)}for(;n.length<5;){let e=0,o=-1;for(let l=0;l<n.length;l++){const d=n[l],f=n[(l+1)%n.length],u=Math.hypot(f[0]-d[0],f[1]-d[1]);u>o&&(o=u,e=l)}const s=n[e],i=n[(e+1)%n.length],a=i[0]-s[0],r=i[1]-s[1],c=Math.hypot(a,r)||1;n.splice(e+1,0,[(s[0]+i[0])/2+r/c*.003,(s[1]+i[1])/2-a/c*.003])}return n}function Fx(t){const n=[t[0].x],e=[t[0].z],o=[0];for(let c=1;c<t.length;c++){const l=Math.hypot(t[c].x-t[c-1].x,t[c].z-t[c-1].z);l<1e-6||(n.push(t[c].x),e.push(t[c].z),o.push(o[o.length-1]+l))}const s=o[o.length-1],i=n.length,a=[],r=[];for(let c=0;c<i;c++){const l=Math.max(0,c-1),d=Math.min(i-1,c+1),f=n[d]-n[l],u=e[d]-e[l],h=Math.hypot(f,u)||1;a.push(f/h),r.push(u/h)}return{length:s,at(c){const l=Math.min(s,Math.max(0,c));let d=0,f=i-1;for(;f-d>1;){const g=d+f>>1;o[g]<=l?d=g:f=g}const u=Math.max(1e-9,o[f]-o[d]),h=(l-o[d])/u;let p=a[d]+(a[f]-a[d])*h,x=r[d]+(r[f]-r[d])*h;const m=Math.hypot(p,x)||1;return p/=m,x/=m,{x:n[d]+(n[f]-n[d])*h,z:e[d]+(e[f]-e[d])*h,tx:p,tz:x}}}}function Xl(t,n,e){const o=t.at(n);return[o.x-o.tz*e,o.z+o.tx*e]}function Ox(t,n,e,o=0,s=t){const i=fn(Math.floor(e)*2654435+91),a=Math.max(2,Math.round(n/.82)),r=n/a,c=r*1.3,l=n/2,d=Math.floor(o/c)-1,f=Math.ceil(s/c)+1,u=[];for(let p=d;p<=f;p++)for(let x=0;x<a;x++)u.push({s:(p+.5+.5*(x&1))*c+(i()-.5)*.6*c,t:-l+(x+.5)*r+(i()-.5)*.6*r});const h=[];for(let p=0;p<u.length;p++){const x=u[p],m=-l+i()*.1,g=l-i()*.1,v=i()<.04,w=Rr[0]+i()*(Rr[1]-Rr[0]),M=i();if(x.s<o-c||x.s>s+c)continue;let y=[[Math.max(o,x.s-2*c),m],[Math.min(s,x.s+2*c),m],[Math.min(s,x.s+2*c),g],[Math.max(o,x.s-2*c),g]];if(y[0][0]>=y[1][0])continue;const b=Math.max(0,p-4*a),T=Math.min(u.length,p+4*a+1);for(let A=b;A<T&&y.length>=3;A++){if(A===p)continue;const R=u[A];if(Math.abs(R.s-x.s)>2.6*c||Math.abs(R.t-x.t)>2.6*r)continue;const C=R.s-x.s,I=R.t-x.t,L=(R.s+x.s)/2,N=(R.t+x.t)/2;y=Qf(y,C,I,C*L+I*N)}if(y.length<3||v||(y=Wl(y),y.length<3)||(y=Wl(kx(y,w)),y.length<3)||Zf(y)<Nx)continue;y=Ux(y);let S=0,E=0;for(const A of y)S+=A[0],E+=A[1];h.push({poly:y,cs:S/y.length,ct:E/y.length,tone:M})}return h}function zx(t,n=6){if(t.length<3)return t.map(o=>({x:o.x,z:o.z}));const e=[{x:t[0].x,z:t[0].z}];for(let o=1;o<t.length-1;o++){const s=t[o-1],i=t[o],a=t[o+1],r=Math.hypot(i.x-s.x,i.z-s.z)||1,c=Math.hypot(a.x-i.x,a.z-i.z)||1,l=Math.min(n,r*.45),d=Math.min(n,c*.45);e.push({x:i.x+(s.x-i.x)/r*l,z:i.z+(s.z-i.z)/r*l},{x:i.x,z:i.z},{x:i.x+(a.x-i.x)/c*d,z:i.z+(a.z-i.z)/c*d})}return e.push({x:t[t.length-1].x,z:t[t.length-1].z}),e}const Bx=[13094096,13619146,14208703,12897224],Gx=[8095636,7502984,6910847,7700618],Hx=new oe(5202741),eo=.7;function Kl(t,n,e,o,s,i,a,r){const c=n.length;let l=0,d=0;for(const S of n)l+=S[0],d+=S[1];l/=c,d/=c;const f=[];for(let S=0;S<c;S++){const[E,A]=n[S];f.push(o(E,A)+s(e[S])+(i1(E*2.1+3,A*2.1)-.5)*.02)}const u=f.reduce((S,E)=>S+E,0)/c,h=new oe(i[Math.min(i.length-1,Math.floor(a.tone*i.length))]),p=new oe(i[Math.min(i.length-1,Math.floor(a.tone*i.length)+1)%i.length]);h.lerp(p,a.tone*i.length%1),h.multiplyScalar(.84+r()*.26);const x=new oe,m=(S,E,A,R,C,I,L)=>(x.copy(h).multiplyScalar(L).lerp(Hx,I),t.pos.push(S,E,A),t.col.push(x.r,x.g,x.b),t.uv.push(R,C),t.pos.length/3-1),g=n.map(([S,E])=>{const A=S-l,R=E-d,C=Math.hypot(A,R)||1,I=Math.min(a.bevel,C*.35)/C;return[S-A*I,E-R*I]}),v=m(l,u+.008,d,l*eo,d*eo,0,1.04),w=[];for(let S=0;S<c;S++){const E=.93+r()*.07;w.push(m(g[S][0],f[S],g[S][1],g[S][0]*eo,g[S][1]*eo,a.mossy*.25*r(),E))}for(let S=0;S<c;S++)t.idx.push(v,w[(S+1)%c],w[S]);const M=[],y=[];for(let S=0;S<c;S++)M.push(m(g[S][0],f[S],g[S][1],g[S][0]*eo,g[S][1]*eo,a.mossy*.25,.94)),y.push(m(n[S][0],f[S]-a.drop-r()*.006,n[S][1],n[S][0]*eo,n[S][1]*eo,a.mossy*.55*(.5+r()),.8));const b=[],T=[];let _=0;for(let S=0;S<c;S++){const[E,A]=n[S],R=n[(S+c-1)%c];_+=Math.hypot(E-R[0],A-R[1]);const C=f[S]-a.drop,I=Math.min(C-a.thickness+a.drop,o(E,A)-.06);b.push(m(E,C,A,_*eo,C*eo,a.mossy*.7,.72)),T.push(m(E,I,A,_*eo,I*eo,a.mossy*.9,.45))}for(let S=0;S<c;S++){const E=(S+1)%c;t.idx.push(M[S],M[E],y[S],M[E],y[E],y[S]),t.idx.push(b[S],b[E],T[S],b[E],T[E],T[S])}}function Vx(t,n,e,o){const s=5+Math.floor(o()*2),i=o()*6.28,a=.85+o()*.5,r=[];for(let c=0;c<s;c++){const l=i+c/s*Math.PI*2+(o()-.5)*.4,d=e*(.75+o()*.5);r.push([t+Math.cos(l)*d*a,n+Math.sin(l)*d])}return r}function Yr(t,n){const e=new Xe;e.name="flagstone-path";const o={pos:[],col:[],uv:[],idx:[]},s=n.width/2,i=n.lift??(d=>Ix(d,s)+.05),a=n.palette==="unit"?Gx:Bx,r=n.quality==="high"?1.2:n.quality==="med"?.7:.3;if(t.forEach((d,f)=>{if(d.length<2)return;const u=Fx(d),h=n.startInset??0,p=u.length-(n.endInset??0);if(p-h<1)return;const x=n.seed+f*977,m=fn(x*31+7);for(const v of Ox(u.length,n.width,x,h,p)){const w=v.poly.map(([y,b])=>Xl(u,y,b)),M=v.poly.map(([,y])=>y);Zf(w)<0&&(w.reverse(),M.reverse()),Kl(o,w,M,n.groundY,i,a,{thickness:.08+m()*.04,bevel:.022+m()*.012,drop:.02+m()*.01,tone:v.tone,mossy:m()<.4?.3+m()*.7:m()*.25},m)}const g=Math.floor((p-h)*r);for(let v=0;v<g;v++){const w=v&1?1:-1,M=h+m()*(p-h),y=w*(s-.15+Math.pow(m(),1.6)*.75),[b,T]=Xl(u,M,y),_=.045+m()*m()*.12,S=Vx(b,T,_,m);Kl(o,S,S.map(()=>y),n.groundY,E=>Math.max(.012,i(E)-.04),a,{thickness:.05,bevel:Math.min(.015,_*.3),drop:.012,tone:m(),mossy:m()*.6},m)}}),o.idx.length===0)return e;const c=new jt;c.setAttribute("position",new Jt(o.pos,3)),c.setAttribute("color",new Jt(o.col,3)),c.setAttribute("uv",new Jt(o.uv,2)),c.setIndex(new lt(o.pos.length/3>65535?new Uint32Array(o.idx):new Uint16Array(o.idx),1)),c.computeVertexNormals(),c.computeBoundingSphere();const l=new V(c,w5());return l.name="flagstones",l.receiveShadow=!0,l.castShadow=!1,e.add(l),e}function la(t,n,e,o){const s=new Gn(t,n,e);s.castShadow=o,s.receiveShadow=!0,s.userData.nearScatter=!0;const i={count:0};return{mesh:s,get count(){return i.count},push(a,r){i.count>=e||(s.setMatrixAt(i.count,a),r&&s.setColorAt(i.count,r),i.count++)}}}const Wx=new at,ql=new _n,Yl=new fs,$l=new X,jl=new X,Zl=new oe;function da(t,n,e,o,s,i,a=0,r=0,c=0){return Yl.set(a,r,c),ql.setFromEuler(Yl),$l.set(t,n,e),jl.set(o,s,i),Wx.compose($l,ql,jl)}function Xx(t){const n=new Xe;n.name="near-scatter";const e=fn(t.seed??4242),o=t.density,s=(N,U,F=0)=>t.avoid.some(([z,G,O])=>Math.hypot(N-z,U-G)<O+F),i=Kn(),a=(N,U=.9)=>new ge({color:N,roughness:U,metalness:.02}),r=(N=.9)=>a(16777215,N),c=et(.012,.014,1,4);c.translate(0,.5,0);const l=new Se(.06,7,5),d=et(.3,.32,1,9);d.rotateZ(Math.PI/2);const f=et(.34,.42,.5,9),u=[],h=()=>Math.min(zi-1,Math.floor(e()*zi)),p=Math.round(46*o),x=Math.round(26*o),m=Math.round(70*o),g=Math.round(40*o),v=Math.round(34*o),w=Math.round(7*o),M=la(c,a(5143100,.9),v*14+1,!1),y=la(l,r(.7),v*14+1,!1),b=la(d,a(6968384,.95),w+1,!0),T=la(f,a(8020551,.95),w+1,!0),_=(N,U,F)=>{for(let z=0;z<14;z++){const G=e()*Math.PI*2,O=N+Math.sqrt(e())*(U-N),B=t.centerX+Math.cos(G)*O,J=t.centerZ+Math.sin(G)*O;if(!s(B,J,F))return[B,J]}return null};for(let N=0;N<p;N++){const U=_(18,56,3.5);if(!U)continue;const[F,z]=U;u.push({kind:"broadleaf",variant:h(),x:F,y:t.groundY(F,z),z,scale:.85+e()*.65,rotY:e()*Math.PI*2})}for(let N=0;N<x;N++){const U=_(20,60,3);if(!U)continue;const[F,z]=U;u.push({kind:"pine",variant:h(),x:F,y:t.groundY(F,z),z,scale:.9+e()*.7,rotY:e()*Math.PI*2})}for(let N=0;N<m;N++){const U=_(16.5,46,1.8);if(!U)continue;const[F,z]=U;u.push({kind:"bush",variant:h(),x:F,y:t.groundY(F,z),z,scale:.7+e()*.8,rotY:e()*Math.PI*2})}for(let N=0;N<g;N++){const U=_(16.5,52,1.5);if(!U)continue;const[F,z]=U,G=Math.min(2.2,(.3+Math.pow(e(),2)*1.5)*1.6);u.push({kind:"rock",variant:h(),x:F,y:t.groundY(F,z)-.04*G,z,scale:G,rotY:e()*Math.PI*2})}const S=[15909198,15233146,16052702,11635424,16752222,8175848];for(let N=0;N<v;N++){const U=_(16.5,38,1.2);if(!U)continue;const[F,z]=U,G=S[Math.floor(e()*S.length)],O=8+Math.floor(e()*6);for(let B=0;B<O;B++){const J=e()*Math.PI*2,ue=Math.sqrt(e())*1.1,xe=F+Math.cos(J)*ue,j=z+Math.sin(J)*ue,ie=t.groundY(xe,j),ne=.35+e()*.3;M.push(da(xe,ie,j,1,ne,1,(e()-.5)*.3,0,(e()-.5)*.3)),Zl.setHex(G).offsetHSL((e()-.5)*.03,0,(e()-.5)*.08),y.push(da(xe,ie+ne,j,1,.7,1),Zl.clone())}}for(let N=0;N<w;N++){const U=_(20,50,2);if(!U)continue;const[F,z]=U,G=t.groundY(F,z),O=1.6+e()*1.6;b.push(da(F,G+.28,z,O,1,1,0,e()*Math.PI,(e()-.5)*.12));const B=_(20,50,2);B&&T.push(da(B[0],t.groundY(B[0],B[1])+.24,B[1],1,.8+e()*.6,1))}const E=N=>({x:t.centerX+Math.sin(N*5.2)*3.2*Math.min(1,N*2.2),z:t.centerZ+15.2+N*38}),A=[];let R=[];const C=160;for(let N=0;N<=C;N++){const U=E(N/C);s(U.x,U.z,-1.5)?(R.length>1&&A.push(R),R=[]):R.push(U)}if(R.length>1&&A.push(R),A.length>0){const N=Yr(A,{width:1.6,groundY:t.groundY,seed:(t.seed??4242)+5,quality:o>=1?"high":o>=.75?"med":"low",lift:()=>.06});N.name="near-flagstones",n.add(N)}for(const N of[M,y,b,T])N.mesh.count=N.count,N.mesh.instanceMatrix.needsUpdate=!0,N.mesh.instanceColor&&(N.mesh.instanceColor.needsUpdate=!0),N.mesh.computeBoundingSphere(),N.count>0&&n.add(N.mesh);const I=Af(u,{lodDistance:45,castShadow:o>.5});n.add(I.group);const L=new On;for(let N=0;N<6;N++){const U=(N+.5)/6,F=t.centerZ+15.2+U*34,z=N%2?1:-1,G=t.centerX+Math.sin(U*5.2)*3.2*Math.min(1,U*2.2)+z*2.4;if(s(G,F,-1))continue;const O=t.groundY(G,F);L.add(et(.14,.18,.18,8),i.slate,{x:G,y:O+.09,z:F}),L.add(Nt([G,O,F],[G,O+3.4,F],.05,6),i.slate),L.add(Nt([G,O+3.4,F],[G-z*.5,O+3.55,F],.035,5),i.slate),L.add(new xt(.28,.2,8),i.slate,{x:G-z*.55,y:O+3.52,z:F}),L.add(et(.14,.2,.36,8),i.lampGlass,{x:G-z*.55,y:O+3.3,z:F})}return L.build(n,"near-lamps",{}),{group:n,update:N=>I.update(N),dispose:()=>I.dispose()}}function Kx(t){const n=new Xe;n.name="mountain-ring";const e=fn(t.seed??7),o=[],s=new X,i=new oe(6976642),a=new oe(8091247),r=new oe(3892808),c=new oe(15331835),l=new oe,d=[{mul:1,hMul:1,radMul:1,n:t.count},{mul:1.32,hMul:.72,radMul:1.35,n:Math.round(t.count*1.3)}];for(const u of d)for(let h=0;h<u.n;h++){const p=h/u.n*Math.PI*2+(e()-.5)*.18,x=t.ringRadius*u.mul+e()*40,m=Math.cos(p)*x,g=Math.sin(p)*x+t.originZ,v=(46+e()*82)*u.hMul,w=(34+e()*48)*u.radMul,M=e()*100,y=new xt(1,1,40,22,!0),b=Is(y,1e-4),T=b.attributes.position,_=new Float32Array(T.count*3);for(let S=0;S<T.count;S++){s.fromBufferAttribute(T,S);const E=s.y+.5,A=Math.atan2(s.z,s.x),R=Math.abs(Math.sin(A*5+M))*.22+Math.abs(Math.sin(A*11+M*1.7+E*4))*.1+(Co(Math.cos(A)*3+M,Math.sin(A)*3+E*6,3)-.5)*.28,C=Math.pow(1-E,.82),I=.55+R*(.4+.6*(1-E))+.45*C;let L=E-.5;L+=(Co(Math.cos(A)*2.2+M,Math.sin(A)*2.2+M,3)-.5)*.06*(1-E),T.setXYZ(S,s.x*I,L,s.z*I);const N=.92+.08*Math.sin(E*38+R*6);l.copy(i).lerp(a,Co(A*2+M,E*7,2)),l.multiplyScalar(N);const U=1-ba(.08,.34,E+(Co(A*3,E*9,2)-.5)*.12);if(l.lerp(r,U*.85),t.snow){const F=.62+(Co(A*4+M,E*8,3)-.5)*.18,z=ba(F-.04,F+.08,E);l.lerp(c,z)}_[S*3]=l.r,_[S*3+1]=l.g,_[S*3+2]=l.b}b.setAttribute("color",new lt(_,3)),b.deleteAttribute("uv"),b.computeVertexNormals(),b.scale(w,v,w),b.rotateY(e()*Math.PI*2),b.translate(m,v/2-8,g),o.push(b)}const f=Wn(o,!1);if(f){const u=new ge({color:16777215,vertexColors:!0,roughness:1,metalness:0,side:qe,fog:!0});u.onBeforeCompile=p=>{p.fragmentShader=p.fragmentShader.replace("#include <fog_fragment>",`#ifdef USE_FOG
          float mFog = 1.0 - exp(-fogDensity * fogDensity * vFogDepth * vFogDepth * 6.5);
          gl_FragColor.rgb = mix(gl_FragColor.rgb, fogColor, clamp(mFog, 0.0, 0.9));
        #endif`)},u.customProgramCacheKey=()=>"mountain-haze";const h=new V(f,u);h.castShadow=!1,h.receiveShadow=!1,n.add(h)}return n}function fa(t,n,e){let o=Math.imul(t|0,374761393)^Math.imul(n|0,668265263)^Math.imul((e|0)+1,1442695041);return o=Math.imul(o^o>>>13,1274126177),o^=o>>>16,(o>>>0)/4294967295}const Ql=t=>t*t*t*(t*(t*6-15)+10);function $r(t,n,e,o){const s=t*e,i=n*e,a=Math.floor(s),r=Math.floor(i),c=Ql(s-a),l=Ql(i-r),d=(a%e+e)%e,f=(r%e+e)%e,u=(d+1)%e,h=(f+1)%e,p=fa(d,f,o),x=fa(u,f,o),m=fa(d,h,o),g=fa(u,h,o);return p+(x-p)*c+(m-p)*l+(p-x-m+g)*c*l}function qx(t,n,e){let o=0,s=1,i=4;for(let a=0;a<5;a++){const r=$r(t,n,i,e*17+a*101),c=1-Math.abs(2*r-1);o+=(r*.45+c*.55)*s,s*=.55,i*=2}return o}function Yx(t,n){const e=new Float32Array(t*t);let o=1/0,s=-1/0;for(let l=0;l<t;l++)for(let d=0;d<t;d++){const f=qx(d/t,l/t,n);e[l*t+d]=f,f<o&&(o=f),f>s&&(s=f)}const i=new Uint8Array(t*t*4),a=t/256*1.6,r=s-o||1,c=l=>(l+t)%t;for(let l=0;l<t;l++)for(let d=0;d<t;d++){const f=(e[l*t+c(d+1)]-e[l*t+c(d-1)])*.5*a*2.2,u=(e[c(l+1)*t+d]-e[c(l-1)*t+d])*.5*a*2.2,h=Math.hypot(f,u,1),p=(l*t+d)*4;i[p]=Math.round((-f/h*.5+.5)*255),i[p+1]=Math.round((-u/h*.5+.5)*255),i[p+2]=Math.round((1/h*.5+.5)*255),i[p+3]=Math.round((e[l*t+d]-o)/r*255)}return{size:t,data:i}}function $x(t,n){const e=new Uint8Array(t*t*4);for(let o=0;o<t;o++)for(let s=0;s<t;s++){const i=s/t,a=o/t;let r=0,c=.5,l=6;for(let p=0;p<4;p++){const x=$r(i,a,l,n*31+p*53);r+=(1-Math.abs(2*x-1))*c,c*=.5,l*=2}const d=$r(i,a,5,n*7+3),f=Math.min(1,Math.max(0,Math.pow(r/.9375,1.6)*(.55+d*.7))),u=(o*t+s)*4,h=Math.round(f*255);e[u]=h,e[u+1]=h,e[u+2]=h,e[u+3]=255}return{size:t,data:e}}const Si={rate:[.55,.35,.3],alphaMin:.12,alphaMax:.97,alphaRate:.9},Qs={time:{value:0},sunDir:{value:new X(.3,.6,-.5).normalize()},sunColor:{value:new oe(1,.95,.85)}},Jf=6268306,eu=801342,Jl=new Map,ed=new Map;function tu(t,n,e){const o=new Ls(t,n,n,kn,Rn);return o.wrapS=Hn,o.wrapT=Hn,o.magFilter=en,o.minFilter=Yn,o.generateMipmaps=!0,o.anisotropy=e,o.colorSpace=io,o.needsUpdate=!0,o}function jx(t){let n=Jl.get(t);return n||(n=tu(Yx(t,11).data,t,4),Jl.set(t,n)),n}function Zx(t){let n=ed.get(t);return n||(n=tu($x(t,23).data,t,2),ed.set(t,n)),n}const Qx=`
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
  varying vec3 vWPos;
  varying float vWLocalZ;
`,Jx=`
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
  vec3 wCol = mix(uWShallow, uWDeep, 1.0 - exp(-wPath * vec3(${Si.rate.map(t=>t.toFixed(2)).join(", ")})));
  float wAlpha = ${Si.alphaMin.toFixed(2)} + (${Si.alphaMax.toFixed(2)} - ${Si.alphaMin.toFixed(2)}) * (1.0 - exp(-wPath * ${Si.alphaRate.toFixed(2)}));
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

  // 太阳亮点：Blinn，法线碎裂 → 一片闪烁的碎光
  vec3 wR = reflect(-wV, wN);
  float wGlint = pow(max(dot(wR, uWSunDir), 0.0), 520.0);
  totalEmissiveRadiance += uWSunColor * wGlint * 0.9 * (1.0 - wFoam);
`,e4=`
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
`;function nu(t){const n=new bn({color:16777215,roughness:.14,metalness:0,ior:1.333,transparent:!0,depthWrite:!0,envMapIntensity:1});n.fog=t.fog;const e=jx(t.quality==="low"?128:256),o=t.quality==="low"||!t.depthTex?void 0:Zx(256),s=new oe(t.shallow),i=new oe(t.deep),a=t.ramp??new un(0,1,.8,.8),r=[t.depthTex?"#define W_DEPTH_TEX":"",o?"#define W_FOAM_TEX":"",t.quality!=="low"?"#define W_FAR":"",t.quality==="low"?"#define W_LOWENV":""].join(`
`);n.onBeforeCompile=l=>{l.uniforms.uWTime=Qs.time,l.uniforms.uWSunDir=Qs.sunDir,l.uniforms.uWSunColor=Qs.sunColor,l.uniforms.uWNormal={value:e},l.uniforms.uWShallow={value:s},l.uniforms.uWDeep={value:i},l.uniforms.uWRamp={value:a},t.depthTex&&(l.uniforms.uWDepthTex={value:t.depthTex},l.uniforms.uWBox={value:t.box??new un(0,0,1,1)}),o&&(l.uniforms.uWFoam={value:o}),l.vertexShader=`varying vec3 vWPos;
varying float vWLocalZ;
`+l.vertexShader.replace("#include <begin_vertex>",`#include <begin_vertex>
       vWPos = (modelMatrix * vec4(transformed, 1.0)).xyz;
       vWLocalZ = transformed.z;`),l.fragmentShader=r+`
`+Qx+l.fragmentShader.replace("#include <normal_fragment_maps>",Jx).replace("#include <lights_fragment_maps>",e4).replace("#include <fog_fragment>",`#ifdef USE_FOG
           // 与地形同一套雾公式：远处水面融入雾色
           float tf = 1.0 - exp(-fogDensity * fogDensity * vFogDepth * vFogDepth);
           tf = max(tf, smoothstep(150.0, 340.0, vFogDepth) * 0.92);
           gl_FragColor.rgb = mix(gl_FragColor.rgb, fogColor, tf);
         #endif`)};const c=`water-v1-${t.quality}-${t.depthTex?"d":"f"}-${o?"f":"n"}`;return n.customProgramCacheKey=()=>c,n}function t4(t){const{outline:n,x:e,y:o,z:s,groundY:i,quality:a}=t,r=new Vd(new Tn(n),1);r.rotateX(-Math.PI/2);let c=1/0,l=-1/0,d=1/0,f=-1/0;for(const M of n)c=Math.min(c,e+M.x),l=Math.max(l,e+M.x),d=Math.min(d,s-M.y),f=Math.max(f,s-M.y);const u=1.5;c-=u,d-=u,l+=u,f+=u;const h=l-c,p=f-d,x=a==="low"?32:64,m=new Uint16Array(x*x);for(let M=0;M<x;M++){const y=d+(M+.5)/x*p;for(let b=0;b<x;b++){const T=c+(b+.5)/x*h,_=bt.clamp(i(T,y)-o,-16,16);m[M*x+b]=a1.toHalfFloat(_)}}const g=new Ls(m,x,x,Dd,Cn);g.magFilter=en,g.minFilter=en,g.wrapS=Cs,g.wrapT=Cs,g.generateMipmaps=!1,g.colorSpace=io,g.needsUpdate=!0;const v=nu({quality:a,shallow:t.shallowColor??Jf,deep:t.deepColor??eu,fog:!0,depthTex:g,box:new un(c,d,1/h,1/p)}),w=new V(r,v);return w.position.set(e,o,s),w.userData.isWater=!0,w.castShadow=!1,w.receiveShadow=!1,{mesh:w,dispose(){r.dispose(),v.dispose(),g.dispose()}}}function Ka(t={}){const n=t.depth??.6,e=t.ramp;return nu({quality:t.quality??"med",shallow:t.shallowColor??Jf,deep:t.deepColor??eu,fog:t.fog??!1,ramp:e?new un(e.z0,e.z1,e.near,e.far):new un(0,1,n,n)})}const n4=new Set(["w","a","s","d","arrowup","arrowdown","arrowleft","arrowright"]);class o4{constructor(){Z(this,"position",new X);Z(this,"yaw",0);Z(this,"moveTarget",null);Z(this,"keys",new Set);Z(this,"stick",{x:0,z:0});Z(this,"enabled",!0);Z(this,"sprint",!1);Z(this,"onKeyDown",n=>{if(!this.enabled)return;const e=n.key.toLowerCase();n4.has(e)&&this.keys.add(e),e==="shift"&&(this.sprint=!0)});Z(this,"onKeyUp",n=>{const e=n.key.toLowerCase();this.keys.delete(e),e==="shift"&&(this.sprint=!1)});window.addEventListener("keydown",this.onKeyDown),window.addEventListener("keyup",this.onKeyUp)}dispose(){window.removeEventListener("keydown",this.onKeyDown),window.removeEventListener("keyup",this.onKeyUp)}setEnabled(n){this.enabled=n,n||(this.keys.clear(),this.moveTarget=null)}setPosition(n,e,o){this.position.set(n,e,o),this.moveTarget=null}setMoveTarget(n,e){this.moveTarget=new X(n,0,e)}clearMoveTarget(){this.moveTarget=null}setStickInput(n,e){this.stick.x=n,this.stick.z=e,(Math.abs(n)>.12||Math.abs(e)>.12)&&(this.moveTarget=null)}isMoving(){return this.keys.size>0||this.moveTarget!==null||Math.abs(this.stick.x)>.1||Math.abs(this.stick.z)>.1}update(n,e){if(!this.enabled)return;let o=0,s=0;if(this.moveTarget){const i=new X().subVectors(this.moveTarget,this.position);i.y=0,i.length()<.45?this.moveTarget=null:(i.normalize(),o=i.x,s=i.z,this.yaw=Math.atan2(o,s))}else{let i=(this.keys.has("w")||this.keys.has("arrowup")?1:0)-(this.keys.has("s")||this.keys.has("arrowdown")?1:0),a=(this.keys.has("d")||this.keys.has("arrowright")?1:0)-(this.keys.has("a")||this.keys.has("arrowleft")?1:0);if((Math.abs(this.stick.x)>.1||Math.abs(this.stick.z)>.1)&&(i=this.stick.z,a=this.stick.x),i!==0||a!==0){const r=Math.sin(e),c=Math.cos(e);o=-a*c+i*r,s=a*r+i*c;const l=Math.hypot(o,s)||1;o/=l,s/=l,this.yaw=Math.atan2(o,s)}}if(o!==0||s!==0){const i=r1*(this.sprint?1.85:1)*n;this.position.x+=o*i,this.position.z+=s*i}this.position.y=Ot(this.position.x,this.position.z,It)+.05}isSprinting(){return this.sprint&&this.isMoving()}}function s4(t,n){const e=document.createElement("canvas");e.width=512,e.height=128;const o=e.getContext("2d");o.fillStyle=n?"rgba(8, 18, 40, 0.72)":"rgba(40, 40, 40, 0.55)",td(o,8,8,496,112,20),o.fill(),o.strokeStyle=n?"rgba(147, 197, 253, 0.55)":"rgba(120, 120, 120, 0.4)",o.lineWidth=3,td(o,8,8,496,112,20),o.stroke(),o.fillStyle=n?"#f3f4f6":"#9ca3af",o.font="bold 28px 'Noto Sans SC', 'Microsoft YaHei', sans-serif";const s=t.length>22?t.slice(0,21)+"…":t;o.fillText(s,24,72);const i=new Zt(e);i.colorSpace=yt;const a=new Ks({map:i,transparent:!0,depthWrite:!1}),r=new qs(a);return r.scale.set(10,2.5,1),r.position.y=7.2,r.userData.isSignpost=!0,r}function td(t,n,e,o,s,i){t.beginPath(),t.moveTo(n+i,e),t.lineTo(n+o-i,e),t.quadraticCurveTo(n+o,e,n+o,e+i),t.lineTo(n+o,e+s-i),t.quadraticCurveTo(n+o,e+s,n+o-i,e+s),t.lineTo(n+i,e+s),t.quadraticCurveTo(n,e+s,n,e+s-i),t.lineTo(n,e+i),t.quadraticCurveTo(n,e,n+i,e),t.closePath()}const i4={unit01:{id:"unit01",label:"数字时代",skyTop:3831990,skyMid:8435164,skyBot:14215400,fogColor:11849680,fogDensity:.0012,sunColor:16773848,sunIntensity:2,sunDiscScale:20,sunDiscOpacity:.3,sunFocusedDiscScale:24,sunFocusedDiscOpacity:.32,hemiSky:12048110,hemiGround:5069373,ambientColor:11188680,terrainTint:[.06,.42,.1],crystalColor:5286143,orbColor:3531726,glowColor:1609617,pathColor:2391683,decorStyle:"coast",ground:{grass:5671486,dirt:8810575,rock:8027768}},unit02:{id:"unit02",label:"传记人物",skyTop:5078960,skyMid:11125976,skyBot:15786436,fogColor:14208176,fogDensity:.0012,sunColor:16769200,sunIntensity:2,hemiSky:14213870,hemiGround:6970440,ambientColor:12629148,terrainTint:[.34,.28,.19],crystalColor:12158786,orbColor:14861696,glowColor:10317105,pathColor:7755311,decorStyle:"market",ground:{grass:9081941,dirt:9268551,rock:9208434},focusedLandscapeScale:.86,focusedLandscapeOffsetZ:7},unit03:{id:"unit03",label:"旅行探索",skyTop:4160168,skyMid:9288656,skyBot:14412e3,fogColor:11848120,fogDensity:.0012,sunColor:16773328,sunIntensity:1.9,hemiSky:12638420,hemiGround:4869174,ambientColor:11123624,terrainTint:[.15,.23,.13],crystalColor:8631946,orbColor:12112526,glowColor:7448204,pathColor:5467990,decorStyle:"forest",ground:{grass:5012810,dirt:7166012,rock:6450276}},unit04:{id:"unit04",label:"劳动传统",skyTop:4879520,skyMid:10533064,skyBot:15391936,fogColor:13483942,fogDensity:.0018,sunColor:16769716,sunIntensity:1.9,hemiSky:14076342,hemiGround:4866100,ambientColor:11574404,terrainTint:[.2,.15,.1],crystalColor:13211224,orbColor:14991228,glowColor:11827778,pathColor:7822656,decorStyle:"temple",ground:{grass:8027206,dirt:8216381,rock:7432540}},unit05:{id:"unit05",label:"航天探索",skyTop:1714764,skyMid:4876950,skyBot:11452368,fogColor:9347252,fogDensity:.0012,sunColor:15134975,sunIntensity:2,hemiSky:12110044,hemiGround:4738652,ambientColor:9479360,terrainTint:[.2,.21,.25],crystalColor:9682408,orbColor:14412543,glowColor:7973087,pathColor:5401992,decorStyle:"space",ground:{grass:9343645,dirt:8159112,rock:10265261}},unit06:{id:"unit06",label:"共益交易城",skyTop:4028584,skyMid:8828620,skyBot:14477020,fogColor:11914180,fogDensity:.0012,sunColor:16770752,sunIntensity:1.9,hemiSky:11850458,hemiGround:4865844,ambientColor:10007732,terrainTint:[.085,.13,.125],crystalColor:14001007,orbColor:8243632,glowColor:5152657,pathColor:3501415,decorStyle:"exchange",ground:{grass:5932100,dirt:8217929,rock:7434086}}},jr={id:"default",label:"",skyTop:4159416,skyMid:8828126,skyBot:14673898,fogColor:12439772,fogDensity:.0012,sunColor:16773330,sunIntensity:2.1,hemiSky:12375794,hemiGround:5986878,ambientColor:11846868,terrainTint:[.12,.3,.1],crystalColor:6333946,orbColor:8438015,glowColor:4231406,pathColor:3170464,decorStyle:"forest",ground:{grass:6130236,dirt:8020032,rock:8027512}};function a4(t){return t?i4[t]??jr:jr}function nd(t){if(t.ground)return t.ground;const[n,e,o]=t.terrainTint,s=new oe(n,e,o),i={h:0,s:0,l:0};s.getHSL(i);const a=new oe().setHSL(i.h,Math.min(1,i.s*.85+.28),.34),r=new oe().setHSL((i.h+.07)%1,Math.min(1,i.s*.5+.18),.33),c=new oe().setHSL(i.h,Math.min(1,i.s*.16),.46);return{grass:a.getHex(),dirt:r.getHex(),rock:c.getHex()}}function od(t,n,e,o){const s=n*n*4,i=new Uint8Array(s*t.length);t.forEach((r,c)=>i.set(r,c*s));const a=new za(i,n,n,t.length);return a.format=kn,a.type=Rn,a.colorSpace=e?yt:io,a.wrapS=a.wrapT=Hn,a.magFilter=en,a.minFilter=Yn,a.generateMipmaps=!0,a.anisotropy=o,a.needsUpdate=!0,a}function r4(t,n,e,o=4){const s=[],i=[];for(let c=0;c<J3;c++){const l=pf(c,n,e,t);s.push(l.albedo),i.push(l.normal)}const a=od(s,n,!0,o),r=od(i,n,!1,o);return{key:`${t.grass}-${t.dirt}-${t.rock}-${n}`,albedo:a,normal:r,dispose(){a.dispose(),r.dispose()}}}function Pr(t,n,e,o){const s=Math.cos(t.ry),i=Math.sin(t.ry);return{x:t.x+n*s+o*i,y:e,z:t.z-n*i+o*s,ry:t.ry}}function c4(t,n,e={}){const o=new Xe;o.name="unit1-sanctuary";const s=Kn(),i=e.greenery??!0;if(e.tint!==void 0){const _=new oe(e.tint);for(const S of["stone","stoneWarm","stoneDark","paveA","paveB"])s[S].color.lerp(_,.16)}const a=new On,r=Yi(1701);a.add(Mn(14.5,.3,.04),s.stoneDark,{y:0}),a.add(Mn(13.6,.22,.035),s.stone,{y:.3}),a.add(Mn(12.8,.16,.03),s.stoneWarm,{y:.52});const c=.68;[[8.1,9.3,34],[9.4,10.6,40],[10.7,12.5,48]].forEach(([_,S,E],A)=>{const R=Math.PI*2/E;for(let C=0;C<E;C++){const I=C*R+.006+A%2*R*.5;a.add(Bf(_,S,I,I+R-.012,.028),(C+A)%2?s.paveA:s.paveB,{y:c})}}),a.add(Mn(7.5,.09,.02,16),s.stoneDark,{y:c}),a.add(Mn(7.1,.09,.02,16),s.stone,{y:c+.09});const d=c+.18;for(let _=0;_<8;_++)a.add(le(.14,.012,5.4,.004),s.slate,{y:d+.006,ry:_/8*Math.PI,z:0});const f=new he(5.6,.045,5,72);a.add(f,s.slate,{y:d+.012,rx:Math.PI/2});const u=[];for(const[_,S]of[[-7,-7],[7,-7],[-7,7],[7,7]]){const E=c;a.add(le(1.1,.34,1.1,.05),s.stoneDark,{x:_,y:E+.17,z:S}),a.add(le(.86,.2,.86,.04),s.stone,{x:_,y:E+.44,z:S}),a.add(et(.3,.36,3,14),s.stone,{x:_,y:E+.54+1.5,z:S});for(const I of[.16,.84])a.add(new he(.33-.03*I,.035,6,20),s.stoneDark,{x:_,y:E+.54+3*I,z:S,rx:Math.PI/2});const A=E+3.54;a.add(et(.46,.28,.26,14),s.stoneWarm,{x:_,y:A+.13,z:S}),a.add(le(.98,.14,.98,.04),s.stoneDark,{x:_,y:A+.33,z:S});const R=A+.4,C=.95;for(let I=0;I<4;I++){const L=I/4*Math.PI*2+Math.PI/4;a.add(Nt([_+Math.cos(L)*.3,R,S+Math.sin(L)*.3],[_+Math.cos(L)*.3,R+C,S+Math.sin(L)*.3],.022,6),s.brass)}a.add(new he(.31,.03,5,20),s.brass,{x:_,y:R,z:S,rx:Math.PI/2}),a.add(new he(.31,.03,5,20),s.brass,{x:_,y:R+C,z:S,rx:Math.PI/2}),a.add(new xt(.4,.32,10),s.copper,{x:_,y:R+C+.16,z:S}),a.add(new Se(.05,8,6),s.brass,{x:_,y:R+C+.34,z:S}),u.push([_,R+C/2,S])}const h=8.5;for(const _ of[-1,1]){const S=_*5.3;a.add(le(1.7,.55,1.7,.06),s.stoneDark,{x:S,y:c+.275,z:h}),a.add(le(1.2,5,1.2,.08),s.stone,{x:S,y:c+.55+2.5,z:h});for(const E of[-1,1])a.add(le(.14,4.4,.05,.01),s.stoneDark,{x:S+_*0,y:c+.55+2.5,z:h+E*.62});a.add(le(1.55,.3,1.55,.05),s.stoneWarm,{x:S,y:c+.55+5.15,z:h}),a.add(le(1.75,.1,1.75,.03),s.stoneDark,{x:S,y:c+.55+5.35,z:h})}const p=c+.55+5.4+.5;a.add(le(12.7,1,1.3,.07),s.stone,{y:p,z:h}),a.add(le(13.3,.22,1.7,.04),s.stoneWarm,{y:p+.62,z:h}),a.add(le(13,.08,1.55,.02),s.stoneDark,{y:p+.77,z:h});for(let _=0;_<43;_++)a.add(le(.14,.14,.12,.015),s.stoneDark,{x:-6.3+_*.3,y:p-.58,z:h+.7});const x=new Tn;x.moveTo(-2.4,0),x.lineTo(2.4,0),x.lineTo(0,1.2),x.closePath();const m=new Fn(x,{depth:.9,bevelEnabled:!0,bevelThickness:.06,bevelSize:.06,bevelSegments:1});m.translate(0,0,-.45),a.add(m,s.stone,{y:p+.81,z:h}),a.add(le(3.4,.62,.1,.02),s.slate,{y:p+.02,z:h+.7}),a.add(le(3.55,.05,.08,.01),s.brass,{y:p+.36,z:h+.72}),a.add(le(3.55,.05,.08,.01),s.brass,{y:p-.32,z:h+.72});for(const _ of[-2.6,2.6])a.add(Nt([_,p-.5,h+.45],[_,p-1.4,h+.45],.012,4),s.steel),a.add(new xt(.2,.16,8),s.copper,{x:_,y:p-1.42,z:h+.45}),a.add(et(.14,.17,.34,8),s.lampGlass,{x:_,y:p-1.67,z:h+.45}),a.add(et(.12,.12,.05,8),s.brass,{x:_,y:p-1.87,z:h+.45});const g=po(),v=[0,1,2,3].map(_=>js(301+_,.17,9)),w=(_,S,E,A)=>{a.add(v[Math.floor(r()*v.length)],g,{x:_,y:S,z:E,ry:r()*6.28,sx:A,sy:A*.85,sz:A})};for(const _ of i?[-1,1]:[])for(let S=0;S<26;S++){const E=S/26;w(_*(5.3+(r()-.5)*1.1),c+.9+E*4.3,h+.62+r()*.18,.55+r()*.7)}for(let _=0;_<(i?34:0);_++){const S=-6+r()*12;w(S,p-.58-r()*(Math.abs(S)>4.5?.9:.35),h+.7+r()*.15,.5+r()*.6)}const M=[.22,Math.PI-.22,Math.PI+.22,-.22];for(const _ of M){const E={x:Math.cos(_)*11.2,z:Math.sin(_)*11.2,ry:Math.atan2(-Math.cos(_),-Math.sin(_))};a.add(le(2.1,.09,.56,.025),s.wood,Pr(E,0,c+.5,0)),a.add(le(2.1,.46,.07,.02),s.wood,{...Pr(E,0,c+.82,-.27),rx:0});for(const A of[-.9,.9])a.add(le(.12,.5,.58,.02),s.stoneDark,Pr(E,A,c+.25,0))}for(let _=0;_<8;_++){const S=_/8*Math.PI*2+Math.PI/8,E=12,A=Math.cos(S)*E,R=Math.sin(S)*E;if(!(!i||Math.abs(A)<6.8&&R>6)){a.add(et(.95,1.05,.42,14),s.stoneDark,{x:A,y:c+.21,z:R}),a.add(et(.8,.8,.05,14),s.soil,{x:A,y:c+.44,z:R});for(const C of yf(.8+_%4*.04,"high"))a.add(C.geometry,C.material,{x:A,y:c+.44,z:R,ry:_*.9})}}a.build(o,"unit1-sanctuary",{isLandscapeStage:!0});const y=new V(new he(11.8,.07,8,64),n);y.rotation.x=Math.PI/2,y.position.y=c+.03,y.userData.isLandscapeRing=!0,o.add(y);const b=new V(new he(6.8,.055,8,56),t);b.rotation.x=Math.PI/2,b.position.y=d+.04,b.userData.isLandscapeRing=!0,o.add(b);const T=new V(new he(2.4,.07,8,48),t);T.position.set(0,c+4.4,h),o.add(T);for(const[_,S,E]of u){const A=new V(new Se(.2,18,14),t);A.position.set(_,S,E),A.userData.isLandscapeBeacon=!0,o.add(A)}return o}let sd;const To=.4;function l4(){return sd??(sd={head:Gf(To),hair:{short:qr(To,"short"),long:qr(To,"long")},jacket:Wf(To),upper:Xf(To),lower:Kf(To),hand:Hf(To),thigh:qf(To),shin:Yf(To),boot:$f(To)}),sd}const d4=(()=>{let t;return()=>(t??(t={eyeWhite:new ge({color:15854822,roughness:.25}),iris:new ge({color:4861984,roughness:.3}),lip:new ge({color:10113096,roughness:.5}),shoe:new ge({color:4863526,roughness:.65}),phone:new ge({color:2107181,roughness:.35,metalness:.3}),screen:new ge({color:8049872,emissive:2071200,emissiveIntensity:.55,roughness:.3})}),t)})();function zt(t,n){const e=new V(t,n);return e.castShadow=!0,e.receiveShadow=!0,e.userData.isLandscapeStage=!0,e}function Hs(t,n,e,o,s){return zt(new Wo(t,n,e,1,Math.min(o,t/2.01,n/2.01,e/2.01)),s)}const f4={stand:{left:{shoulder:.04,elbow:-.15},right:{shoulder:-.04,elbow:-.15}},phone:{left:{shoulder:-.7,elbow:-1.35,side:-.06},right:{shoulder:-.7,elbow:-1.35,side:.06}},listen:{left:{shoulder:-.55,elbow:-.95},right:{shoulder:-.5,elbow:-.95}},talk:{left:{shoulder:-.5,elbow:-.95},right:{shoulder:-1.15,elbow:-.75,side:.1}},write:{left:{shoulder:-.55,elbow:-.9},right:{shoulder:-.85,elbow:-1.2,side:.05}},read:{left:{shoulder:-.95,elbow:-1.45,side:-.1},right:{shoulder:-.95,elbow:-1.45,side:.1}},walk:{left:{shoulder:.45,elbow:-.25},right:{shoulder:-.45,elbow:-.5}},point:{left:{shoulder:.04,elbow:-.15},right:{shoulder:-1.45,elbow:-.1,side:.12}}};function xa(t){const n=d4(),e=l4(),o=new Xe;o.name="scene-person";const s=t.seated??!1,i=t.pose??(s?"listen":"stand"),a=(O,B,J={})=>new ge({color:O,roughness:B,metalness:.02,...J}),r=new oe(t.skin??14858392),c=new oe(t.shirt),l={h:0,s:0,l:0},d={h:0,s:0,l:0};c.getHSL(l),r.getHSL(d),Math.min(Math.abs(l.h-d.h),1-Math.abs(l.h-d.h))<.055&&l.s>.18&&Math.abs(l.l-d.l)<.24&&c.set(5205894).offsetHSL(0,0,(l.l-.5)*.2);const u=a(c.getHex(),.86,{side:qe}),h=a(t.trousers??3753562,.88),p=a(t.skin??14858392,.55,{emissive:3806728,emissiveIntensity:.05}),x=new ge({color:p.color.getHex(),roughness:.55,metalness:.02,vertexColors:!0,emissive:3806728,emissiveIntensity:.05}),m=new ge({color:16777215,vertexColors:!0,roughness:.42,metalness:.15,side:qe}),g=t.hair??2825494,v=a(new oe(g).multiplyScalar(.8).getHex(),.7),w=s?.1:.91,M=new Xe;M.position.y=w,M.rotation.x=t.lean??0,o.add(M);const y=new Xe;y.position.y=-.91,M.add(y),y.add(zt(e.jacket,u));const b=new Xe;b.position.y=1.5,b.rotation.x=i==="phone"||i==="read"?.38:i==="write"?.3:t.lean?-t.lean*.6:0,y.add(b),b.add(zt(e.head,x));for(const O of[-1,1]){const B=zt(new Se(.0125,12,9),n.eyeWhite);B.position.set(O*.034,.2,.0685);const J=new V(new Se(.0072,10,8),n.iris);J.scale.set(1,1,.35),J.position.z=.0118,B.add(J),b.add(B);const ue=Hs(.046,.009,.012,.004,v);ue.position.set(O*.037,.2165,.0885),ue.rotation.z=-O*.1,b.add(ue)}const T=zt(new l0(.0026,.026,3,8),n.lip);T.rotation.z=Math.PI/2,T.scale.set(1,1,.6),T.position.set(0,.1215,.0875),b.add(T);const _=t.hairStyle??"short",S=(_==="long"?e.hair.long:e.hair.short).clone(),E=new oe(g),A=(E.r+E.g+E.b)/3,R=S.attributes.color;for(let O=0;O<R.count;O++){const B=(R.getX(O)+R.getY(O)+R.getZ(O))/3/.05;R.setXYZ(O,E.r*B*(.35/Math.max(.05,A))*.6,E.g*B*(.35/Math.max(.05,A))*.6,E.b*B*(.35/Math.max(.05,A))*.6)}if(b.add(zt(S,m)),_==="bun"){const O=zt(new Se(.05,14,10),a(g,.7));O.scale.set(1,.9,1),O.position.set(0,.3,-.07),b.add(O)}if(t.helmet){const O=zt(new Se(.145,24,16),a(15659764,.3,{metalness:.2}));O.scale.set(1,1.12,1.08),O.position.y=.2,b.add(O);const B=zt(new Se(.12,20,12),a(1782855,.12,{metalness:.7}));B.scale.set(.95,.68,.55),B.position.set(0,.2,.108),b.add(B);const J=zt(new he(.1,.018,8,20),a(13226196,.4,{metalness:.5}));J.rotation.x=Math.PI/2,J.position.y=.07,b.add(J)}if(t.glasses){const O=a(1710618,.4,{metalness:.4});for(const J of[-1,1]){const ue=zt(new he(.0245,.0032,6,18),O);ue.position.set(J*.034,.2,.092),b.add(ue)}const B=zt(new we(.0028,.0028,.02,5),O);B.rotation.z=Math.PI/2,B.position.set(0,.204,.093),b.add(B)}const C=a(15657696,.9,{side:qe}),I=zt(new he(.07,.012,8,24),C);if(I.rotation.x=Math.PI/2,I.position.y=1.535,I.scale.set(1.05,1,1),y.add(I),t.scarf!==void 0){const O=zt(new he(.074,.032,8,20),a(t.scarf,.92));O.rotation.x=Math.PI/2,O.position.y=1.54,y.add(O)}if(t.backpack!==void 0){const O=Hs(.29,.4,.15,.06,a(t.backpack,.85));O.position.set(0,1.27+.2-.2,-.155),y.add(O)}const L=(Math.imul(t.shirt^(t.hair??0)*31,2654435761)>>>16)+(t.hairStyle==="long"?3:0),N=t.outfit??(t.helmet||t.scarf!==void 0?"tee":["tee","hoodie","coat","dress","tee","hoodie"][L%6]),U=(t.hairStyle??"short")==="long",F=N==="dress"&&!U&&t.hairStyle!=="bun"?"coat":N;if(F==="hoodie"&&!t.helmet){const O=zt(new he(.083,.03,10,24),u);O.rotation.x=Math.PI/2-.35,O.position.set(0,1.545,-.03),O.scale.set(1.05,1,1.15),y.add(O);const B=Hs(.2,.09,.02,.01,u);B.position.set(0,1,.128),y.add(B)}if(!s&&(F==="coat"||F==="dress")){const O=F==="coat"?.62:.46,B=zt(new we(.19,F==="coat"?.235:.27,O,28,1,!0),u);if(B.scale.set(1.12,1,.9),B.position.y=1-O/2+.02,B.receiveShadow=!1,y.add(B),F==="coat"){const J=Hs(.016,.5,.02,.006,C);J.position.set(0,1.25,.121),y.add(J)}}const z=t.hat??(L%7===3&&!s?8010555:L%7===5&&!s?3099231:void 0);if(z!==void 0&&!t.helmet){const O=a(z,.9),B=zt(new Se(.098,20,12,0,Math.PI*2,0,Math.PI*.52),O);B.scale.set(.9,1.06,1.06),B.position.set(0,.215,-.014),b.add(B);const J=zt(new he(.09,.012,8,20),O);J.rotation.x=Math.PI/2,J.scale.set(.92,1.08,1),J.position.set(0,.2,-.014),b.add(J)}const G=f4[i];for(const O of[-1,1]){const B=O===1?G.left:G.right,J=new Xe;J.position.set(O*.2,1.46,0),J.rotation.x=B.shoulder,J.rotation.z=(B.side??0)*O,y.add(J),J.add(zt(O===1?e.upper:Da(e.upper),u));const ue=new Xe;ue.position.y=-.28,ue.rotation.x=B.elbow,J.add(ue),ue.add(zt(O===1?e.lower:Da(e.lower),u));const xe=zt(new he(.041,.008,6,16),C);xe.rotation.x=Math.PI/2,xe.position.y=-.252,ue.add(xe);const j=new Xe;if(j.position.y=-.27,ue.add(j),j.add(zt(Vf(O,e.hand),p)),i==="read"&&O===1){const ie=Hs(.2,.03,.27,.008,a(3104138,.8));ie.position.set(-.12,-.12,.06),ie.rotation.set(-.9,0,.1),j.add(ie)}if(i==="write"&&O===-1){const ie=zt(new we(.008,.008,.15,6),a(1911629,.4));ie.position.set(0,-.12,.03),ie.rotation.x=-.9,j.add(ie)}if(i==="phone"&&O===1){const ie=Hs(.075,.016,.15,.006,n.phone);ie.position.set(-.05,-.1,.02),ie.rotation.set(-.4,0,.1),j.add(ie);const ne=zt(new Qe(.062,.128),n.screen);ne.rotation.x=-Math.PI/2,ne.position.set(0,.0085,0),ie.add(ne)}}for(const O of[-1,1]){const B=new Xe;B.position.set(O*.09,.91,0),B.rotation.x=s?-Math.PI/2+.03:i==="walk"?.42*-O:0,y.add(B),B.add(zt(e.thigh,h));const J=new Xe;J.position.y=-.42,J.rotation.x=s?Math.PI/2-.03:i==="walk"&&O===1?.55:.03,B.add(J),J.add(zt(e.shin,h)),J.add(zt(e.boot,n.shoe))}return px(o),o.scale.setScalar(t.scale??1),o}function id(t){const n=new Xe;n.name="focused-terrace",n.position.set(0,0,27);const e=Kn(),o=new On;o.add(Mn(8.8,.2,.03),e.stoneDark,{y:.68}),o.add(Mn(8.4,.16,.025),e.stone,{y:.88}),o.add(Mn(8,.12,.02),e.stoneWarm,{y:1.04}),[[5.4,6.6,30],[6.7,7.8,38]].forEach(([r,c,l],d)=>{const f=Math.PI*2/l;for(let u=0;u<l;u++){const h=u*f+.007+d%2*f*.5;o.add(Bf(r,c,h,h+f-.014,.026),(u+d)%2?e.paveA:e.paveB,{y:1.16})}}),o.add(new he(5.2,.04,5,64),e.slate,{y:1.18,rx:Math.PI/2}),o.build(n,"focused-terrace",{isLandscapeStage:!0});const i=new ge({color:t,emissive:t,emissiveIntensity:.18,roughness:.5,metalness:.15});i.fog=!1;const a=new V(new he(7.95,.05,6,72),i);return a.rotation.x=Math.PI/2,a.position.y=1.19,a.castShadow=!1,a.userData.noLandscapeShadow=!0,n.add(a),n}function u4(t){const n=new Xe,e=Kn(),o=new On;o.add(le(5.2,.18,3.3,.05),e.stoneWarm,{y:0}),o.add(le(5,.04,3.1,.02),e.paveA,{y:.1}),o.build(n,"approach-slab",{isLandscapeStage:!0});const s=new ge({color:t,emissive:t,emissiveIntensity:.16,roughness:.5});s.fog=!1;for(const i of[-1,1]){const a=new V(new Ye(.1,.03,2.9),s);a.position.set(i*2.35,.13,0),a.userData.noLandscapeShadow=!0,n.add(a)}return n}const ua=1.16;function h4(t,n,e,o){const s=new Xe;s.name="portal-trim";const i=Kn(),a=new On,r=i.stoneDark,c=i.woodDark;for(const d of[-1,1]){const f=d*t/2;a.add(le(.96,.26,1,.04),r,{x:f,y:ua+.13,z:e}),a.add(le(.86,.1,.9,.03),r,{x:f,y:ua+.31,z:e}),a.add(le(.8,.14,.86,.03),c,{x:f,y:n-.38,z:e});const u=new Tn;u.moveTo(0,0),u.lineTo(.95,0),u.lineTo(0,-.95),u.closePath();const h=new Fn(u,{depth:.14,bevelEnabled:!0,bevelThickness:.03,bevelSize:.03,bevelSegments:1});h.translate(0,0,-.07),a.add(h,c,{x:f-d*.26,y:n-.25,z:e,sx:-d});for(const p of[-.33,.33])a.add(le(.06,(n-ua)*.86,.04,.01),r,{x:f,y:(n+ua)/2,z:e+p})}a.add(le(t+1.1,.14,.78,.035),c,{y:n+.32,z:e}),a.add(le(t-.3,.08,.7,.02),c,{y:n-.28,z:e});const l=Math.round(t/.9);for(let d=0;d<=l;d++)a.add(et(.035,.035,.05,8),i.brass,{x:-t/2+d*t/l,y:n,z:e-.33,rx:Math.PI/2});for(const d of[-t/4,t/4])a.add(Nt([d,n-.3,e-.34],[d,n-.8,e-.34],.015,5),i.steel),a.add(new Se(.06,8,6),i.lampGlass,{x:d,y:n-.86,z:e-.34});return a.build(s,"portal-trim",{isLandscapeStage:!0}),s}function p4(t,n,e,o,s){const i=new Xe;i.name="sign-frame";const a=Kn(),r=new On,c=.16;r.add(le(t+c*2,c,.34,.04),a.woodDark,{x:e,y:o+n/2+c/2,z:s}),r.add(le(t+c*2,c,.34,.04),a.woodDark,{x:e,y:o-n/2-c/2,z:s});for(const l of[-1,1])r.add(le(c,n,.34,.04),a.woodDark,{x:e+l*(t/2+c/2),y:o,z:s});for(const l of[-t/3,0,t/3])r.add(Nt([l+e,o+n/2+c,s-.14],[l+e,o+n/2+.5,s-.34],.02,5),a.brass),r.add(new xt(.17,.2,10),a.brass,{x:l+e,y:o+n/2+.5,z:s-.4,rx:.5});return r.build(i,"sign-frame",{isLandscapeStage:!0}),i}function T0(t){const n=bt.clamp(t,0,1);return .025+.02*Math.sin(n*Math.PI)+.006*n}function m4(t,n=10){const e=new Tn,o=i=>t*(.004+i*.201);e.moveTo(o(0),.014),e.lineTo(o(1),.014);for(let i=n;i>=0;i--){const a=i/n;e.lineTo(o(a),T0(a))}e.closePath();const s=new Fn(e,{depth:.274,steps:1,bevelEnabled:!1,curveSegments:1});return s.translate(0,0,-.137),s}function g4(t){const n=[],e=[];for(let i=0;i<10;i++){const a=-.108+i*.022,r=i===0?.68:i===5||i===9?.58:.86+i%3*.025,c=i===0?.004:.0018,l=i===0?2:5+i%2,d=.023,f=(r-.13-d*(l-1))/l;for(let u=0;u<l;u++){const h=n.length/3,p=.13+u*(f+d);for(let x=0;x<=2;x++){const m=p+f*x/2,g=t*(.004+m*.201),v=T0(m)+.001;if(n.push(g,v,a,g,v,a+c),x===2)continue;const w=h+x*2,M=[w,w+1,w+2,w+1,w+3,w+2];e.push(...t===1?M:[w,w+2,w+1,w+1,w+2,w+3])}}}const s=new jt;return s.setAttribute("position",new Jt(n,3)),s.setIndex(e),s.computeVertexNormals(),s}function v4(){const t=[],n=[],e=T0(.5771144278606964)+.0018;for(let s=0;s<=10;s++){const i=.065+s*.0115,a=bt.clamp((i-.137)/.043,0,1),r=e-a*a*.032;if(t.push(.114,r,i,.126,r,i),s<10){const c=s*2;n.push(c,c+2,c+1,c+1,c+2,c+3)}}const o=new jt;return o.setAttribute("position",new Jt(t,3)),o.setIndex(n),o.computeVertexNormals(),o}function x4(t,n=.055){const e=new Tn;e.absarc(0,0,t*1.05,0,Math.PI*2,!1);const o=new Wd;o.absarc(0,0,t*.86,0,Math.PI*2,!0),e.holes.push(o);const s=new Fn(e,{depth:n,bevelEnabled:!1,steps:1,curveSegments:16});return s.rotateX(-Math.PI/2),s}function _4(){const t=[0,0,0],n=8;for(let s=0;s<n;s++){const i=s/n*Math.PI*2,a=.55+Math.cos(i)*.55;t.push(Math.sin(i)*.32,a*a*.2,a)}const e=[];for(let s=0;s<n;s++)e.push(0,s+1,(s+1)%n+1);const o=new jt;return o.setAttribute("position",new Jt(t,3)),o.setIndex(e),o.computeVertexNormals(),o}function M4(t="high"){const n=(o,s=.85,i=.02,a={})=>{const r=new ge({color:o,roughness:s,metalness:i,...a});return r.fog=!1,r},e=[10173754,3104138,4160079,13081146,6965898,14209208,8018490,2964038];return{detail:t,kit:new On,m:Kn(),p:{books:e.map(o=>n(o,.82)),fabricRed:n(11553344,.95,0,{side:qe}),fabricBlue:n(3891087,.95,0,{side:qe}),fabricGreen:n(5077589,.95,0,{side:qe}),fabricGrey:n(8225932,.95,0,{side:qe}),fabricCream:n(15261382,.95,0,{side:qe}),screenOn:n(8049872,.3,.1,{emissive:2071200,emissiveIntensity:.7}),screenOff:n(1317150,.2,.4),boardGreen:n(3099199,.9),boardWhite:n(15790056,.6),ceramic:n(15854818,.35),leather:n(5913128,.7,.05),plasticDark:n(2106923,.45,.2),printInk:n(4278605,.98,0),water:Ka({depth:.55}),canvasOlive:n(8359786,.95,0,{side:qe})}}}const ad=new at,rd=new at,w4=new at,cd=new fs;class E0{constructor(n,e=0,o=0,s=0,i=0,a=1,r=new at){this.kit=n,this.x=e,this.y=o,this.z=s,this.ry=i,this.s=a,this.base=r,this.base=new at().makeTranslation(e,o,s).multiply(new at().makeRotationY(i)).multiply(new at().makeScale(a,a,a))}child(n,e,o,s=0){const i=new E0(this.kit,0,0,0,0,1);return i.base=this.base.clone().multiply(ad.makeTranslation(n,e,o)).multiply(rd.makeRotationY(s)),i}put(n,e,o=0,s=0,i=0,a=0,r=0,c=0,l=1,d=1,f=1){cd.set(a,r,c);const u=this.base.clone().multiply(ad.makeTranslation(o,s,i)).multiply(rd.makeRotationFromEuler(cd)).multiply(w4.makeScale(l,d,f));this.kit.addMatrix(n,e,u)}box(n,e,o,s,i,a,r,c=.02,l=0,d=0,f=0){this.put(le(e,o,s,c),n,i,a+o/2,r,l,d,f)}cyl(n,e,o,s,i,a,r,c=20){this.put(et(e,o,s,c),n,i,a+s/2,r)}strut(n,e,o,s,i=6){this.put(Nt(e,o,s,i),n)}ball(n,e,o,s,i,a=1,r=1,c=1){this.put(new Se(e,14,10),n,o,s,i,0,0,0,a,r,c)}}function on(t,n,e=1.8){const{m:o}=t;for(let s=0;s<4;s++)n.box(o.wood,e,.035,.085,0,.44,-.18+s*.1,.008);for(let s=0;s<3;s++)n.box(o.wood,e,.08,.03,0,.62+s*.12,-.27-s*.02,.008,-.12);for(const s of[-1,1]){const i=s*(e-.12)/2;for(const r of[-.23,.19])n.box(o.darkSteel,.1,.035,.13,i,0,r,.006),n.strut(o.darkSteel,[i,.035,r],[i,.435,r*.78],.026,8);n.strut(o.darkSteel,[i,.425,-.28],[i,.425,.23],.027,8),n.strut(o.darkSteel,[i,.4,-.27],[i,.96,-.35],.024,8);const a=new Vn([new X(i,.58,.2),new X(i,.65,.13),new X(i,.66,-.14),new X(i,.63,-.29)]);if(n.put(new Zn(a,t.detail==="high"?12:6,.024,6,!1),o.darkSteel),n.strut(o.darkSteel,[i,.45,.18],[i,.61,.18],.02,6),t.detail==="high"){for(let r=0;r<4;r++)n.cyl(o.steel,.008,.008,.004,i,.476,-.18+r*.1,6);for(let r=0;r<3;r++)n.put(et(.008,.008,.004,6),o.steel,i,.66+r*.12,-.248-r*.02,Math.PI/2)}}}function sn(t,n,e=t.m.wood){const{m:o}=t;n.box(e,.42,.04,.42,0,.44,0,.01),n.box(e,.42,.34,.03,0,.5,-.2,.01,-.08);for(const s of[-1,1])for(const i of[-1,1])n.cyl(o.woodDark,.018,.022,.44,s*.18,0,i*.18,8);n.box(o.woodDark,.38,.02,.02,0,.18,.18,.005)}function b4(t,n,e=.46){n.cyl(t.m.wood,.17,.17,.04,0,e-.04,0,20);for(let o=0;o<3;o++){const s=o/3*Math.PI*2;n.strut(t.m.woodDark,[Math.cos(s)*.13,e-.04,Math.sin(s)*.13],[Math.cos(s)*.2,0,Math.sin(s)*.2],.018,6)}}function gn(t,n,e=1.4,o=.8,s=.75,i=t.m.wood){n.box(i,e,.045,o,0,s-.045,0,.012);for(const a of[-1,1])for(const r of[-1,1])n.box(t.m.woodDark,.06,s-.045,.06,a*(e/2-.08),0,r*(o/2-.08),.01);n.box(t.m.woodDark,e-.2,.05,.03,0,s-.13,o/2-.08,.008)}function hs(t,n,e=.6,o=.74){n.cyl(t.m.wood,e,e,.04,0,o-.04,0,36),n.cyl(t.m.woodDark,.05,.07,o-.04,0,0,0,12),n.cyl(t.m.woodDark,.28,.3,.04,0,0,0,20)}function li(t,n,e=1.5,o=.75,s=.75){const{m:i}=t;n.box(i.wood,e,.04,o,0,s-.04,0,.012),n.box(i.woodDark,.04,s-.04,o-.06,-e/2+.05,0,0,.008),n.box(i.woodDark,.5,s-.04,o-.06,e/2-.3,0,0,.008);for(let a=0;a<3;a++)n.box(i.wood,.44,.17,.02,e/2-.3,.06+a*.21,o/2-.02,.006),n.box(i.brass,.1,.014,.014,e/2-.3,.14+a*.21,o/2+.005,.004)}function ou(t,n,e=2.2,o=2.4,s=5,i=1){const{m:a,p:r}=t,c=Za(i);n.box(a.woodDark,.05,o,.34,-e/2+.025,0,0,.008),n.box(a.woodDark,.05,o,.34,e/2-.025,0,0,.008),n.box(a.woodDark,e,o,.02,0,0,-.16,.006),n.box(a.wood,e,.05,.36,0,o,0,.01);const l=(o-.1)/s;for(let d=0;d<=s;d++)n.box(a.wood,e-.08,.035,.32,0,.05+d*l,0,.008);for(let d=0;d<s;d++){let f=-e/2+.08;for(;f<e/2-.12;){const u=.03+c()*.035,h=l*(.55+c()*.38);c()>.07&&n.box(r.books[Math.floor(c()*r.books.length)],u,h,.22+c()*.05,f+u/2,.085+d*l,.01,.004,0,0,(c()-.5)*(c()>.9?.4:0)),f+=u+.004}}}function Xn(t,n,e=4,o=3){const s=Za(o);let i=0;for(let a=0;a<e;a++){const r=.03+s()*.03,c=t.p.books[Math.floor(s()*t.p.books.length)],l=Math.max(.1,.26-a*.012),d=n.child(0,i,0,(s()-.5)*.4);if(d.box(c,l,.003,.19,0,0,0,.001),d.box(t.m.paper,l-.01,r-.006,.18,.002,.003,0,.001),d.box(c,l,.003,.19,0,r-.003,0,.001),d.box(c,.006,r,.19,-l/2+.003,0,0,.001),t.detail==="high"){for(const f of[-.06,.06])d.box(t.m.brass,.001,r*.6,.006,-l/2-6e-4,r*.2,f,0);d.box(t.m.brass,l*.45,8e-4,.035,0,r+2e-4,0,0)}i+=r}}function Sn(t,n){for(const e of[-1,1])n.box(t.p.leather,.216,.009,.3,e*.108,.002,0,.003),n.put(m4(e,t.detail==="high"?10:4),t.m.paper),t.detail==="high"&&n.put(g4(e),t.p.printInk);n.strut(t.p.leather,[0,.015,-.15],[0,.015,.15],.008,8),t.detail==="high"&&n.put(v4(),t.p.fabricRed)}function S4(t,n,e=.62,o=.36,s=t.p.screenOn){n.cyl(t.p.plasticDark,.1,.13,.015,0,0,0,16),n.box(t.p.plasticDark,.04,.2,.03,0,.01,0,.006),n.box(t.p.plasticDark,e+.03,o+.03,.03,0,.2,0,.01),n.put(new Qe(e,o),s,0,.2+(o+.03)/2,.0166)}function qa(t,n,e=t.p.screenOn){n.box(t.m.steel,.34,.015,.23,0,0,0,.005),n.box(t.p.plasticDark,.292,.0015,.101,0,.0152,-.026,.001),n.box(t.p.plasticDark,.098,.001,.048,0,.0153,.073,.001),n.box(t.m.steel,.094,.001,.044,0,.0164,.073,.001),n.strut(t.m.darkSteel,[-.115,.018,-.103],[.115,.018,-.103],.008,8);const o=.3,s=Math.cos(o),i=Math.sin(o),a=(r,c,l,d,f)=>n.put(r,c,l,.018+d*s+f*i,-.103-d*i+f*s,-o);if(a(le(.34,.22,.009,.004),t.m.steel,0,.11,0),a(new Qe(.315,.193),t.p.plasticDark,0,.11,.005),a(new Qe(.295,.169),e,0,.11,.0056),t.detail==="high"){for(let r=0;r<4;r++)for(let c=0;c<10;c++)n.box(t.m.darkSteel,.023,.0018,.017,-.125+c*.0278,.0168,-.063+r*.023,5e-4);n.box(t.m.darkSteel,.11,.0018,.013,0,.0168,.026,5e-4);for(const r of[-.157,.157])for(let c=0;c<6;c++)n.box(t.p.plasticDark,.003,6e-4,.01,r,.0155,-.067+c*.016,0);a(new Qe(.258,.009),t.m.paper,0,.174,.0059);for(let r=0;r<4;r++)a(new Qe(.16-r*.018,.003),t.m.paper,-.024,.145-r*.02,.0059);a(new Qe(.003,.003),t.p.plasticDark,0,.212,.0058)}}function A0(t,n,e=t.p.screenOn){n.box(t.p.plasticDark,.07,.008,.145,0,0,0,.004),n.put(new Qe(.062,.13),e,0,.0085,0,-Math.PI/2)}function su(t,n){n.box(t.m.woodDark,.6,1,.45,0,0,0,.015),n.box(t.m.wood,.7,.04,.55,0,1,0,.01,-.28),n.box(t.m.brass,.4,.012,.012,0,.98,.22,.003)}function Ya(t,n,e=2.4,o=1.2,s=t.p.boardGreen){n.box(t.m.woodDark,e+.12,o+.12,.05,0,0,0,.012),n.box(s,e,o,.02,0,.06,.03,.006),n.box(t.m.wood,e*.7,.04,.08,0,.04,.07,.008)}function dt(t,n,e=.5,o=5){const s=Za(o);n.put(new we(e,e*1.04,.38,24,1,!0),t.m.stoneDark,0,.19,0),n.put(x4(e,.08),t.m.stone,0,.355,0),n.cyl(t.m.soil,e*.88,e*.88,.045,0,.31,0,24);const i=po();for(const a of Sf(o*13+5,e*.62,t.detail==="high"?96:30)){const r=a.attributes.color;for(let c=0;c<r.count;c++)r.setXYZ(c,r.getX(c)*.82,r.getY(c)*.82,r.getZ(c)*.82);n.put(a,i,0,.66,0)}for(let a=0;a<(t.detail==="high"?7:3);a++){const r=s()*Math.PI*2,c=Math.sqrt(s())*e*.6,l=Math.cos(r)*c,d=Math.sin(r)*c,f=.78+s()*.22,u=e*(.12+s()*.05);n.strut(t.m.leaf,[l*.85,.35,d*.85],[l,f,d],.008,5);const h=n.child(l,f,d,r),p=t.detail==="high"?6:4;for(let x=0;x<p;x++)h.put(_4(),a%2?t.p.fabricCream:t.p.fabricRed,0,0,0,0,x/p*Math.PI*2,0,u,u,u);h.put(new Se(u*.25,8,5),t.p.books[3],0,.008,0,0,0,0,1,.55,1)}}function te(t,n,e=3.4){n.cyl(t.m.slate,.14,.18,.18,0,0,0,10),n.cyl(t.m.slate,.045,.065,e,0,.18,0,8),n.strut(t.m.slate,[0,e+.18,0],[.45,e+.3,0],.03,5),n.put(new xt(.26,.2,8),t.m.slate,.5,e+.34),n.cyl(t.m.lampGlass,.12,.18,.32,.5,e-.02,0,8)}function ds(t,n,e,o=1,s=t.m.steel){const i=Math.max(2,Math.round(e/1));for(let a=0;a<=i;a++)n.cyl(s,.02,.025,o,a/i*e,0,0,8);n.box(s,e,.04,.04,e/2,o,0,.01),n.box(s,e,.025,.025,e/2,o*.5,0,.006)}function iu(t,n,e=2,o=4,s=.17,i=.32){for(let a=0;a<o;a++)n.box(t.m.stoneWarm,e,s*(a+1),i,0,0,a*i,.015)}function Lo(t,n,e=.6,o=.45,s=.5){n.box(t.m.wood,e,o,s,0,0,0,.012);for(let i=1;i<3;i++)n.box(t.m.woodDark,e+.004,.025,s+.004,0,o*i/3,0,.004);for(const i of[-1,1])n.box(t.m.woodDark,.04,o+.004,s+.004,i*(e/2-.03),0,0,.004)}function Gi(t,n,e=.28,o=.7){n.put(et(e*.92,e*.92,o,20),t.m.woodDark,0,o/2,0),n.put(et(e,e,o*.5,20),t.m.woodDark,0,o/2,0);for(const s of[.14,.4,.6])n.put(new he(e*.98,.012,5,24),t.m.darkSteel,0,s*(o/.74),0,Math.PI/2)}function di(t,n,e=.5,o=.7,s=.25,i=t.p.fabricBlue){n.box(i,e,o,s,0,.05,0,.04),n.box(t.m.darkSteel,.03,o*.5,.03,0,o+.05,-s*.2,.005),n.box(t.m.darkSteel,e*.5,.025,.03,0,o+.28,-s*.2,.005);for(const a of[-1,1])n.cyl(t.p.plasticDark,.025,.025,.05,a*(e/2-.06),0,0,10)}function y4(t,n,e=.6,o=.45,s=t.p.fabricCream){n.box(t.m.woodDark,e+.06,o+.06,.03,0,0,0,.008),n.put(new Qe(e,o),s,0,o/2+.03,.017)}function R0(t,n,e=.2){n.cyl(t.m.brass,.1,.12,.03,0,0,0,16),n.cyl(t.m.brass,.015,.015,.2,0,.03,0,8),n.put(new Se(e,24,16),t.p.fabricBlue,0,.3+e*.5,0,.4),n.put(new he(e*1.08,.01,6,36,Math.PI*1.5),t.m.brass,0,.3+e*.5,0,.4,Math.PI/2)}function ko(t,n){n.cyl(t.p.ceramic,.055,.055,.008,0,0,0,16),n.cyl(t.p.ceramic,.04,.03,.065,0,.008,0,16),n.put(new he(.02,.006,5,10,Math.PI),t.p.ceramic,.05,.04,0,0,0,-Math.PI/2)}function $a(t,n,e=2.4,o=1,s=8,i=t.p.fabricRed,a=t.p.fabricCream){for(let r=0;r<s;r++)n.box(r%2?a:i,e/s,.015,o,-e/2+(r+.5)*(e/s),2.3,o/2,.004,.32);n.box(t.m.woodDark,e+.06,.05,.05,0,2.62,.02,.01);for(const r of[-1,1])n.cyl(t.m.woodDark,.025,.03,2.4,r*(e/2),0,o-.05,8)}function au(t,n,e=1.4,o=t.m.terracottaRoof){for(const[s,i]of[[-1,-1],[1,-1],[-1,1],[1,1]])n.cyl(t.m.woodDark,.06,.07,2.4,s*e,0,i*e,10);n.box(t.m.woodDark,e*2+.2,.1,.1,0,2.4,-e,.01),n.box(t.m.woodDark,e*2+.2,.1,.1,0,2.4,e,.01),n.box(t.m.woodDark,.1,.1,e*2+.2,-e,2.4,0,.01),n.box(t.m.woodDark,.1,.1,e*2+.2,e,2.4,0,.01),n.put(new xt(e*1.7,1,4),o,0,3,0,0,Math.PI/4),n.ball(t.m.brass,.07,0,3.55,0)}const ru=.045;function T4(t,n){const e=Math.min(1.65,n-.35),o=Math.min(.56,Math.max(.2,(t-1.25)/2)),s=Math.min(1.2,n-.8),i=Math.min(.64,n-s-.16),a=.025,r=.025,c=.05,l=Math.max(a,r,ru),d=t/2-c-l-o/2;return[{kind:"door",x:0,y:.3,width:Math.min(.82,t-.08),height:e},{kind:"window",x:-d,y:s,width:o,height:i,sillOverhang:a,lintelOverhang:r},{kind:"window",x:d,y:s,width:o,height:i,curtain:!0,sillOverhang:a,lintelOverhang:r}]}function E4(t,n,e,o,s,i,a,r){const c=[...new Set([-e/2,e/2,...r.flatMap(l=>[l.x-l.width/2,l.x+l.width/2])])].sort((l,d)=>l-d);for(let l=0;l<c.length-1;l++){const d=c[l],f=c[l+1];if(f-d<.006)continue;const u=(d+f)/2,h=r.filter(x=>u>x.x-x.width/2&&u<x.x+x.width/2).sort((x,m)=>x.y-m.y);let p=i;for(const x of h){const m=bt.clamp(x.y,i,o),g=bt.clamp(x.y+x.height,i,o);m-p>.006&&t.box(n,f-d,m-p,a,u,p,s-a/2,0),p=Math.max(p,g)}o-p>.006&&t.box(n,f-d,o-p,a,u,p,s-a/2,0)}}function us(t,n,e=2.4,o=2.6,s=2.2,i=t.m.terracottaRoof,a=t.m.paper){const{m:r}=t,c=.3,l=Math.max(.1,o-c),d=Math.min(.16,s*.12),f=s/2,u=T4(e,o),h=u[0],p=u.slice(1);n.box(r.stoneDark,e+.1,c,s+.1,0,0,0,.02),n.box(a,d,l,s,-e/2+d/2,c,0,0),n.box(a,d,l,s,e/2-d/2,c,0,0),n.box(a,e,l,d,0,c,-s/2+d/2,0),E4(n,a,e,o,f,c,d,u),n.put(ao(e+.5,.95+e*.12,s+.5),i,0,o,0),n.put(ao(e+.3,.8+e*.12,s+.3),r.woodDark,0,o-.04,0,0,0,0,1,.97,.99);const x=.06,m=f+.008,g=h.x-h.width/2,v=h.x+h.width/2,w=f-d/2+.01,M=Math.max(.2,h.height-.08),y=h.y+M;n.box(r.woodDark,x,M,d+.04,g+x/2,h.y,w,.008),n.box(r.woodDark,x,M,d+.04,v-x/2,h.y,w,.008),n.box(r.woodDark,h.width,.08,d+.04,h.x,y,w,.008);const b=Math.max(.48,h.width-x*2-.08),T=h.height-.11;if(n.box(r.wood,b,T,.055,h.x,h.y,m,.008),t.detail==="high"){for(const _ of[h.y+.56,h.y+1.12])_<h.y+T-.04&&n.box(r.woodDark,b-.08,.025,.012,h.x,_,m+.034,.003);for(const _ of[-.14,0,.14])n.box(r.woodDark,.012,T-.12,.012,h.x+_,h.y+.06,m+.034,.002);for(const _ of[h.y+.16,h.y+h.height-.22])n.box(r.brass,.035,.075,.012,g+x/2,_,m+.038,.003)}n.box(r.stoneWarm,Math.max(.9,h.width+.38),.16,.45,0,0,f+.22,.02),n.box(r.brass,.05,.05,.04,h.x+Math.min(.24,b*.4),h.y+Math.min(.75,T*.49),m+.04,.008);for(const _ of p){const S=n.child(_.x,_.y,f+.006);P0(t,S,_.width,_.height,{cols:t.detail==="high"?2:1,rows:t.detail==="high"?2:1,curtain:t.detail==="high"&&_.curtain,lit:!0,frame:r.woodDark,recess:d+.03,sillOverhang:_.sillOverhang,lintelOverhang:_.lintelOverhang});const E=d,A=f-E/2;for(const R of[-1,1])n.box(r.woodDark,.025,_.height,E,_.x+R*_.width/2,_.y,A,.003)}n.box(r.stoneDark,.32,1,.32,e/2-.45,o+.15,-s/4,.02)}function cu(t,n,e=2.4,o=1,s=1){n.put(et(e+.28,e+.34,.3,40),t.m.stoneDark,0,.15,0,0,0,0,o,1,s),n.put(et(e,e,.2,40),t.p.water,0,.27,0,0,0,0,o,1,s)}function lu(t,n,e=3.2,o=1,s=t.p.fabricCream,i=t.m.woodDark){const{m:a}=t,r=e*.3,c=e*.22,l=new Tn;l.moveTo(-e/2,c),l.lineTo(-e*.36,0),l.lineTo(e*.3,0),l.quadraticCurveTo(e*.5,c*.25,e/2+.12,c*.92),l.lineTo(-e/2,c);const d=new Fn(l,{depth:r,bevelEnabled:!0,bevelThickness:.03,bevelSize:.03,bevelSegments:1});d.translate(0,0,-r/2),n.put(d,i,0,.05,0),n.box(t.p.fabricRed,e*.98,.05,.04,0,c*.95,r/2+.02,.01),n.box(t.p.fabricRed,e*.98,.05,.04,0,c*.95,-r/2-.02,.01),n.box(a.wood,e*.9,.04,r*.92,0,c*.9,0,.01);for(let u=0;u<9;u++)for(const h of[-1,1])n.box(a.woodDark,.02,c*.22,.02,-e*.42+u*e*.1,c*.95,h*(r/2-.02),.004);n.box(a.woodDark,e*.22,c*.55,r*.7,-e*.3,c*.92,0,.02),n.box(a.slate,e*.1,.1,.02,-e*.3,c*1.25,r*.36,.005),n.box(a.woodDark,.02,c*.6,r*.12,-e/2-.02,c*.2,0,.004),n.strut(a.woodDark,[-e/2-.02,c*.75,0],[-e/2+.2,c*1,0],.012,5),n.strut(a.woodDark,[e/2-.1,c*.95,0],[e/2+.28,c*1.35,0],.02,6),n.put(new he(.05,.01,6,14,Math.PI),a.darkSteel,e*.36,c*.9,r/2+.05,0,0,Math.PI),n.strut(a.darkSteel,[e*.36,c*.9,r/2+.05],[e*.36,c*.9+.14,r/2+.05],.008,4),n.cyl(a.wood,.07,.07,.04,e*.2,c*.93,r*.25,12);const f=e*.5/Math.max(1,o);for(let u=0;u<o;u++){const h=e*.12-u*f*.9,p=e*(.95-u*.12),x=c*.92;n.cyl(a.woodDark,.022,.04,p,h,x,0,10);const m=x+p*.92,g=x+p*.3,v=e*.34;n.strut(a.woodDark,[h,m,-v/2],[h,m,v/2],.014,6),n.strut(a.woodDark,[h,g,-v/2*1.1],[h,g,v/2*1.1],.016,6);const w=new Qe(1,1,12,10),M=w.attributes.position,y=m-g;for(let b=0;b<M.count;b++){const T=M.getX(b)+.5,_=M.getY(b)+.5,S=v/2*(.78+.22*(1-_)),E=(T-.5)*2*S,A=g+_*y,R=Math.sin(T*Math.PI)*Math.sin(_*Math.PI*.9+.2)*.1*e*.3;M.setXYZ(b,R,A,E)}w.computeVertexNormals(),n.put(w,s,h,0,0);for(let b=1;b<5;b++)n.strut(a.woodDark,[h+.012,g+y*b/5,-v/2*.86],[h+.012,g+y*b/5,v/2*.86],.004,4);n.cyl(a.woodDark,.07,.06,.04,h,m+.02,0,10),n.strut(a.steel,[h,x+p,0],[e/2+.05,c*.9,0],.008,4),n.strut(a.steel,[h,x+p,0],[-e/2,c*1,0],.008,4);for(const b of[-1,1]){n.strut(a.steel,[h,m,0],[h,c*.95,b*(r/2+.03)],.006,4);for(let T=1;T<6;T++){const _=T/6;n.strut(a.steel,[h,m-(m-c*.95)*_,b*(r/2+.03)*_],[h+.001,m-(m-c*.95)*_,b*(r/2+.03)*_+0],.004,3)}}u===0&&n.box(t.p.fabricRed,.22,.14,.01,h+.11,x+p+.06,0,.003)}}function A4(t,n,e=4.4,o=3.4,s=2.6,i=t.p.canvasOlive){for(const a of[-1,1])for(const r of[-1,1])n.cyl(t.m.woodDark,.05,.06,s,a*(e/2-.1),0,r*(o/2-.1),10);for(const a of[-1,1])n.box(i,e+.4,.04,o*.62,0,s+.28,a*o*.27,.01,-a*.22);n.box(t.m.woodDark,e+.1,.06,.06,0,s+.5,0,.01),n.box(i,e+.3,.45,.03,0,s-.4,o/2+.02,.01)}function Hi(t,n,e,o=2.6){n.cyl(t.m.woodDark,.06,.085,o,0,0,0,10),n.cyl(t.m.stoneDark,.2,.24,.18,0,0,0,12),e.forEach((s,i)=>{const a=o-.3-i*.34,r=s.len??.95,c=n.child(0,a,0,s.yaw);c.box(s.tone??t.m.wood,r,.24,.045,r/2-.05,0,0,.012),c.put(new xt(.16,.2,3),s.tone??t.m.wood,r+.04,.12,0,0,0,-Math.PI/2,1,1,.3),c.box(t.m.paper,r*.6,.05,.01,r/2-.05,.1,.03,.003)}),n.ball(t.m.brass,.07,0,o+.05,0)}function ld(t,n,e=t.p.fabricRed){const{m:o}=t;for(const s of[-.55,.55]){n.put(new he(.33,.018,8,28),o.darkSteel,s,.36,0);for(let i=0;i<6;i++){const a=i/6*Math.PI;n.strut(o.steel,[s+Math.cos(a)*.32,.36+Math.sin(a)*.32,0],[s-Math.cos(a)*.32,.36-Math.sin(a)*.32,0],.004,3)}n.cyl(o.steel,.03,.03,.05,s,.36,0,8)}n.strut(e,[-.55,.36,0],[-.1,.38,0],.016,6),n.strut(e,[-.1,.38,0],[.4,.74,0],.016,6),n.strut(e,[-.55,.36,0],[-.1,.75,0],.016,6),n.strut(e,[-.1,.75,0],[.4,.74,0],.016,6),n.strut(e,[.4,.74,0],[.55,.36,0],.016,6),n.box(t.p.leather,.22,.04,.1,-.12,.8,0,.015),n.strut(o.darkSteel,[.4,.74,0],[.38,.95,0],.012,5),n.box(o.darkSteel,.03,.03,.4,.38,.95,0,.008)}function Zr(t,n,e=6,o=.72){const s=Math.floor(e/.42);for(let i=0;i<=s;i++)n.box(t.m.woodDark,.2,.1,o+.7,i/s*e,0,0,.02);for(const i of[-1,1])n.box(t.m.steel,e,.07,.07,e/2,.1,i*o/2,.012)}function R4(t,n,e=.55,o=t.p.fabricRed){n.cyl(t.m.darkSteel,.012,.012,1.5,0,0,0,6),n.put(new xt(e,.28,16,1,!0),o,0,1.58,0),n.ball(t.m.brass,.025,0,1.76,0)}function ja(t,n,e=2.4){for(const i of[-1,1])n.strut(t.m.wood,[i*.22,0,.3],[i*.22,e,.3-e*.2],.025,6);const s=Math.floor(e/.3);for(let i=1;i<=s;i++){const a=i*.3/e;n.box(t.m.woodDark,.44,.03,.08,0,a*e-.015,.3-a*e*.2,.008)}for(const i of[-1,1])n.cyl(t.p.plasticDark,.03,.03,.04,i*.22,0,.3,8)}function P4(t,n,e=2){const o=Za(e);n.box(t.m.wood,1.2,.05,.5,0,.35,0,.012),n.box(t.m.woodDark,1.2,.3,.04,0,.35,-.23,.01);for(const s of[-1,1])n.box(t.m.woodDark,.05,.8,.5,s*.58,.35,0,.01);n.box(t.m.woodDark,1.2,.04,.4,0,.7,0,.01,-.2);for(const s of[-1,1])for(const i of[-1,1])n.put(new he(.1,.03,8,14),t.m.darkSteel,s*.5,.12,i*.2,0,Math.PI/2);for(let s=0;s<2;s++){let i=-.52;for(;i<.5;){const a=.04+o()*.03;n.box(t.p.books[Math.floor(o()*t.p.books.length)],a,.18+o()*.1,.22,i+a/2,s===0?.4:.74,-.02,.004,0,0,s===1?-.2:0),i+=a+.004}}}function Za(t){let n=t>>>0;return()=>{n=n+1831565813>>>0;let e=n;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}}const dd=new WeakMap;function P0(t,n,e,o,s={}){const{m:i}=t,a=s.cols??2,r=s.rows??2,c=s.frame??i.woodDark;let l=dd.get(t);l||(l={glow:new ge({color:16769704,emissive:16757850,emissiveIntensity:.55,roughness:.7}),curtain:new ge({color:14272680,roughness:.95,side:qe})},dd.set(t,l));const d=ru;s.lit!==!1&&n.box(l.glow,e-d,o-d,.01,0,d/2,-(s.recess??.02),.002),n.put(new Qe(e-d*1.4,o-d*1.4),i.glass,0,o/2,.02),n.box(c,e+d*2,d,.08,0,-d,0,.006),n.box(c,e+d*2,d,.08,0,o,0,.006),n.box(c,d,o+d*2,.08,-e/2-d/2,-d,0,.006),n.box(c,d,o+d*2,.08,e/2+d/2,-d,0,.006);for(let h=1;h<a;h++)n.box(c,.022,o,.05,-e/2+e*h/a,0,.03,.003);for(let h=1;h<r;h++)n.box(c,e,.022,.05,0,o*h/r,.03,.003);const f=Math.max(0,s.sillOverhang??.11),u=Math.max(0,s.lintelOverhang??.1);if(n.box(i.stoneWarm,e+f*2,.05,.16,0,-d-.05,.05,.01),n.box(i.stoneDark,e+u*2,.06,.1,0,o+d,.03,.01),s.curtain){for(const h of[-1,1]){const p=new Qe(e*.3,o*.92,5,1),x=p.attributes.position;for(let m=0;m<x.count;m++)x.setZ(m,Math.sin(x.getX(m)*40)*.012);p.computeVertexNormals(),n.put(p,l.curtain,h*e*.33,o*.5,.06)}n.box(i.brass,e+.08,.015,.015,0,o-.03,.07,.004)}}const Ee=1.5,Je=1.16,du=27;function Ae(t){const n=M4(t.detail),e=new E0(n.kit,0,Je,du,Math.PI,Ee);return{ctx:t,k:n,f:e}}function Et(t,n){return[-t*Ee,du-n*Ee]}function ce(t,n,e,o,s,i=0){const a=xa({scale:Ee,...n}),[r,c]=Et(e,s);return a.position.set(r,Je+o*Ee,c),a.rotation.y=Math.PI+i,t.root.add(a),a}function Ne(t,n,e,o,s,i=.12){const a=new V(new Se(i*Ee,20,14),n),[r,c]=Et(e,s);return a.position.set(r,Je+o*Ee,c),a.userData.isLandscapeBeacon=!0,t.root.add(a),a}function Ia(t,n,e,o,s,i,a,r=0,c=!0){const l=new V(new Ye(i*Ee,a*Ee,.04*Ee),n),[d,f]=Et(e,s);return l.position.set(d,Je+o*Ee,f),l.rotation.y=Math.PI+r,c&&(l.userData.isLandscapeBeacon=!0),t.root.add(l),l}function Re(t,n){t.k.kit.build(t.ctx.root,n,{isLandscapeStage:!0})}function wo(t,n={}){const e=document.createElement("canvas");e.width=n.width??1200,e.height=n.height??320;const o=e.getContext("2d");if(!o)return;o.fillStyle=n.background??"#263d3b",o.fillRect(0,0,e.width,e.height),o.strokeStyle=n.border??"#d6c49d",o.lineWidth=8,o.strokeRect(14,14,e.width-28,e.height-28),o.textAlign="center",o.textBaseline="middle";for(const i of t)o.font=i.font,o.fillStyle=i.color??"#f6eedb",o.fillText(i.text,e.width/2,i.y);const s=new Zt(e);return s.colorSpace=yt,s.anisotropy=4,s}function dn(t,n,e,o,s,i,a,r=0,c=0){if(!n)return;const l=new V(new Qe(i*Ee,a*Ee),new Tt({map:n,side:qe,toneMapped:!1})),[d,f]=Et(e,s);l.position.set(d,Je+o*Ee,f),l.rotation.set(c,Math.PI+r,0),l.userData.isLandscapeStage=!0,l.userData.noLandscapeShadow=!0,t.root.add(l)}function fu(t){const n=document.createElement("canvas");n.width=1400,n.height=740;const e=n.getContext("2d");if(!e)return;e.fillStyle="#b9d3d6",e.fillRect(0,0,n.width,n.height),e.strokeStyle="rgba(60,100,120,0.18)",e.lineWidth=1;for(let s=0;s<28;s++)e.beginPath(),e.moveTo(s*52,0),e.lineTo(s*52,n.height),e.stroke();for(let s=0;s<15;s++)e.beginPath(),e.moveTo(0,s*52),e.lineTo(n.width,s*52),e.stroke();e.fillStyle="#d7c9a4";for(const[s,i,a,r]of[[230,250,210,150],[1120,200,240,130],[700,640,330,90],[1150,560,150,110]])e.beginPath(),e.ellipse(s,i,a,r,.2,0,Math.PI*2),e.fill();e.strokeStyle="#7a6b45",e.lineWidth=3,e.setLineDash([]),e.stroke(),e.strokeStyle="#b8473f",e.lineWidth=6,e.setLineDash([18,12]),e.beginPath(),t.forEach(([s,i],a)=>a===0?e.moveTo(s*n.width,i*n.height):e.lineTo(s*n.width,i*n.height)),e.stroke(),e.setLineDash([]),e.fillStyle="#3a2d1a",e.font="bold 34px Georgia, serif",e.fillText("N",1310,90),e.beginPath(),e.moveTo(1322,100),e.lineTo(1312,150),e.lineTo(1332,150),e.fill();const o=new Zt(n);return o.colorSpace=yt,o.anisotropy=4,o}const Fs=(t,n=.8)=>{const e=new ge({color:t,emissive:t,emissiveIntensity:n,roughness:.35,metalness:.1});return e.fog=!1,e},Ni=(t,n=.85,e=.02,o={})=>{const s=new ge({color:t,roughness:n,metalness:e});return Object.assign(s.userData,o),s.fog=!1,s};function uu(t,n,e,o,s,i,a){const{k:r,f:c}=t,l=c.child(n,0,e,i);l.box(r.m.slate,.8,.12,.55,0,0,0,.03),l.box(r.m.darkSteel,.12,s*.45,.1,0,.12,0,.01);const d=.12+s*.45,f=s*.62;l.box(r.p.plasticDark,o,f,.1,0,d,0,.08),l.put(new Qe(o-.12,f-.14),r.p.screenOn,0,d+f/2,.052),l.box(r.p.plasticDark,.22,.03,.012,0,d+f-.07,.055,.005);for(let u=0;u<4;u++){const h=(o-.42)*(.55+.4*Math.abs(Math.sin(a+u*1.7))),p=d+f-.3-u*(f-.5)/4;l.cyl(r.m.paper,.06,.06,.012,-o/2+.17,p,.056,14),l.box(r.m.paper,h,.045,.012,-o/2+.3+h/2,p+.02,.056,.008),l.box(r.m.stoneWarm,h*.6,.03,.012,-o/2+.3+h*.3,p-.04,.056,.006)}return{badgeAt:[n+o*.42,d+f-.1,e+.1]}}const C4=t=>{const n=Ae(t),{k:e,f:o}=n,s=Fs(14701917,1);[{x:-2.7,z:-.8,w:1,h:2.1,yaw:-.3},{x:0,z:-1.7,w:1.3,h:2.6,yaw:0},{x:2.7,z:-.8,w:1.05,h:2.2,yaw:.3}].forEach((a,r)=>{const{badgeAt:c}=uu(n,a.x,a.z,a.w,a.h,a.yaw,r*2.3);Ne(t,s,c[0],c[1],c[2],.1)});for(const[a,r,c,l,d]of[[-1.3,2.5,.4,.55,.22],[1.2,2.1,.2,.5,.22],[.1,3,-.2,.62,.24],[-2,1.9,1,.45,.2],[2.1,2.7,.9,.48,.2]])Ia(t,t.edge,a,r,c,l,d);ce(t,{shirt:6982312,hair:2825494,scarf:14256970,pose:"phone",lean:.04},0,0,1.3,0),on(e,o.child(-3.9,0,1.6,-.6),1.7),dt(e,o.child(3.8,0,1.6),.55,3),dt(e,o.child(-4.1,0,-1.2),.5,9),te(e,o.child(4.3,0,-1.6)),te(e,o.child(-4.6,0,.6));for(let a=0;a<5;a++)o.box(a%2?e.m.paveA:e.m.paveB,.9,.05,.6,0,0,2.2+a*.68,.02);Re(n,"scene-notification")},D4=t=>{const n=Ae(t),{k:e,f:o}=n,{m:s,p:i}=e;o.cyl(i.fabricGrey,3.1,3.1,.03,0,0,0,40),o.cyl(i.fabricCream,2.7,2.7,.035,0,0,0,40),li(e,o.child(0,0,.4,Math.PI),1.7,.8);const a=o.child(0,0,-.55,0);sn(e,a,s.wood),ce(t,{shirt:8229284,hair:2825494,glasses:!0,seated:!0,pose:"write",lean:.14},0,.45,-.55,0),qa(e,o.child(-.4,.75,.45,Math.PI)),Sn(e,o.child(.25,.75,.45,.2)),ko(e,o.child(.65,.75,.2)),A0(e,o.child(.72,.75,.6,3.14),e.p.screenOff);const r=o.child(-.75,.75,.15);r.cyl(s.darkSteel,.08,.1,.03,0,0,0,16),r.strut(s.darkSteel,[0,.03,0],[.12,.38,0],.012,6),r.strut(s.darkSteel,[.12,.38,0],[.04,.55,.05],.012,6),r.put(new xt(.1,.12,14,1,!0),s.brass,.04,.56,.05,Math.PI),Ne(t,t.glow,...pi(-.75+.04,.75+.5,.2),.05);const c=o.child(0,0,-2,0);Ya(e,c,3,1.3,i.boardWhite);for(const[f,u]of[[0,s.copper],[1,s.brass],[2,s.stone]])c.box(u,.7,.55,.012,-.9+f*.9,.5,.065,.01),c.box(s.slate,.5,.04,.012,-.9+f*.9,.35,.07,.004);const l=o.child(-3.2,0,0,.45);l.box(s.steel,.06,.06,2.2,0,0,0,.01),l.box(s.steel,.06,.06,2.2,0,2.2,0,.01);for(const f of[-1.07,0,1.07])l.box(s.steel,.06,2.26,.06,0,0,f,.01);l.put(new Qe(2.1,2.1),s.glass,0,1.1,0,0,Math.PI/2);for(const[f,u]of[[0,.9],[1,1.5],[2,2]])l.box(s.stoneDark,.05,.22,.55,-.12,u,-.55+f*.5,.03);const d=o.child(3.2,0,.2,-.3);d.cyl(s.darkSteel,.05,.07,1.9,0,0,0,10),d.cyl(s.slate,.2,.25,.1,0,0,0,16),d.put(new we(.5,.5,.08,36),i.ceramic,0,2.1,0,Math.PI/2),d.put(new he(.52,.045,10,40),s.brass,0,2.1,.04);for(let f=0;f<12;f++){const u=f/12*Math.PI*2;d.box(s.slate,.025,f%3===0?.1:.06,.012,Math.sin(u)*.4,2.1+Math.cos(u)*.4-.04,.05,.003,0,0,-u)}d.box(s.darkSteel,.03,.3,.012,0,2.1,.06,.004),d.box(s.darkSteel,.025,.2,.012,.08,2.1,.065,.004,0,0,-1.2),Ne(t,t.glow,...z4(3.2,2.1,.4),.05),dt(e,o.child(-2.1,0,2.2),.5,4),dt(e,o.child(2.3,0,2.2),.5,7),Re(n,"scene-study-desk")},I4=t=>{const n=Ae(t),{k:e,f:o}=n,{m:s,p:i}=e,a=Ni(11884380,.7),r=Ni(4889222,.7);[-2.9,0,2.9].forEach((x,m)=>{const g=o.child(x,0,1.2,0);g.box(s.slate,1.3,.14,.6,0,0,0,.03),g.box(s.darkSteel,.12,.9,.1,0,.14,0,.01),g.box(i.plasticDark,1.25,1.55,.1,0,1,0,.07),g.put(new Qe(1.1,1.4),m===1?i.screenOn:Fs(5940936,.45),0,1.78,.052);const v=g.child(0,1.7,.06);m===0?(v.put(new he(.2,.05,10,24),s.brass,-.14,0,.02,0,0,-.6),v.put(new he(.2,.05,10,24),s.brass,.14,0,.02,0,0,.6)):m===1?(v.box(s.brass,.46,.34,.1,0,-.2,0,.03),v.put(new he(.17,.045,8,20,Math.PI),s.brass,0,.12,.04),v.cyl(s.darkSteel,.03,.03,.12,0,-.14,.055,8)):(v.ball(s.stoneWarm,.17,0,.15,.04),v.put(new Se(.3,18,12,0,Math.PI*2,0,Math.PI/2),s.stoneWarm,0,-.32,.04,0,0,0,1,.85,.5));for(let w=0;w<4;w++){const M=.4-w*.65,y=x*(1-.85*(w+1)/4);o.box(s.paveA,.9,.05,.6,y,0,M,.02,0,-x*.04),o.box(m===1?r:a,.9,.012,.08,y,.05,M+.25,.004,0,-x*.04)}});const l=o.child(0,0,-2.5,0);for(const x of[-1,1])l.box(s.stoneDark,.7,.3,.7,x*1.6,0,0,.04),l.cyl(s.stone,.26,.3,3,x*1.6,.3,0,18),l.box(s.stoneDark,.7,.18,.7,x*1.6,3.3,0,.03);l.box(s.stone,4,.4,.7,0,3.4,0,.04);const d=new Tn;d.moveTo(0,.75),d.lineTo(.68,.5),d.lineTo(.58,-.1),d.quadraticCurveTo(.4,-.5,0,-.78),d.quadraticCurveTo(-.4,-.5,-.58,-.1),d.lineTo(-.68,.5),d.closePath();const f=new Fn(d,{depth:.12,bevelEnabled:!0,bevelSegments:2,bevelSize:.05,bevelThickness:.04}),u=new V(f,t.edge),[h,p]=Et(0,-2.5+.1);u.scale.setScalar(Ee*1.3),u.position.set(h,Je+2.2*Ee,p),u.rotation.y=Math.PI,u.userData.isLandscapeBeacon=!0,t.root.add(u),l.put(f,e.m.steel,0,1.2,-.12,0,0,0,1,1,.5),ce(t,{shirt:6982312,hair:4864554,pose:"read",backpack:3104138},-1.3,0,2.4,-.2),te(e,o.child(4.5,0,-.5)),te(e,o.child(-4.5,0,-.5)),dt(e,o.child(4,0,2.4),.5,2),dt(e,o.child(-4.2,0,3),.5,5),Re(n,"scene-filter")},L4=t=>{const n=Ae(t),{k:e,f:o}=n,{m:s,p:i}=e;o.cyl(s.stoneWarm,3.4,3.5,.08,0,0,0,40),o.cyl(i.fabricCream,1.9,1.9,.09,0,0,0,36),au(e,o.child(0,0,-.3),2,s.terracottaRoof),on(e,o.child(0,0,-.9,Math.PI),2),ce(t,{shirt:12681576,hair:2825494,hairStyle:"long",seated:!0,pose:"listen",lean:-.04},.45,.46,-.65,0),ce(t,{shirt:7902858,hair:4471348,seated:!0,pose:"talk",lean:.03},-.45,.46,-.65,0),hs(e,o.child(0,0,.5),.45,.5),ko(e,o.child(-.15,.5,.45)),ko(e,o.child(.15,.5,.55)),o.cyl(s.copper,.1,.12,.2,0,.5,.5,14);const a=o.child(2.7,0,.9);a.cyl(s.wood,.34,.26,.4,0,0,0,18),a.put(new he(.34,.025,6,22),s.woodDark,0,.4,0,Math.PI/2);for(let r=0;r<3;r++)A0(e,a.child((r-1)*.1,.34,r%2*.05-.02,r*.7),e.p.screenOff);dt(e,o.child(-2.8,0,.9),.55,11),dt(e,o.child(-3,0,-1.4),.5,13),dt(e,o.child(3,0,-1.4),.5,17),te(e,o.child(-3.7,0,1.8)),Ne(t,t.glow,...pi(0,3.6,-.3),.2),t.ring(1.2,Je+5,Math.PI/2).position.set(...fi(0,3.5,-.3)),t.ring(.9,Je+5,Math.PI/2).position.set(...fi(0,3.7,-.3)),Re(n,"scene-offline-rest")},N4=t=>{const n=Ae(t),{k:e,f:o}=n,{m:s,p:i}=e,a=Fs(14701917,.7);us(e,o.child(0,0,-1.4),4.8,3,2.8,s.terracottaRoof,s.paper);const r=o.child(0,3.4,-0);r.box(a,.2,.7,.05,0,0,0,.02),r.box(a,.7,.2,.05,0,.25,0,.02);for(const d of[-1,1])o.cyl(s.woodDark,.07,.09,2.2,d*.85,.2,.55,10);o.box(s.woodDark,2.1,.12,.8,0,2.4,.2,.02,-.08),o.box(s.stoneWarm,1.6,.1,2.4,0,0,1.6,.02,-.07);for(const d of[-1,1])ds(e,o.child(d*.85,.25,1,Math.PI/2),2,.85);on(e,o.child(-2.4,0,.7,0),1.6),on(e,o.child(2,0,2.6,.2),1.4),ce(t,{shirt:15856885,trousers:5857386,hair:2825494,glasses:!0,pose:"talk"},-.5,0,2.4,.3),ce(t,{shirt:10466753,hair:6974058,seated:!0,pose:"listen"},-2.4,.46,.55,0);const c=o.child(3.4,0,-.2,-.35);c.box(s.slate,1.2,.14,.7,0,0,0,.03),c.box(i.plasticDark,1.1,1.5,.12,0,.14,0,.06),c.put(new Qe(.96,1.3),i.screenOn,0,.86,.064);for(const[d,f]of[[-.24,s.stoneWarm],[.24,s.copper]])c.ball(f,.1,d,1,.07),c.put(new Se(.17,14,8,0,Math.PI*2,0,Math.PI/2),f,d,.7,.07,0,0,0,1,.8,.4);const l=o.child(-3.4,0,-1.8);l.cyl(s.steel,.05,.08,4.2,0,0,0,10),l.put(new Se(.4,22,10,0,Math.PI*2,0,Math.PI/3),i.ceramic,.25,3.9,.15,-1.2),l.strut(s.steel,[0,3.9,0],[.5,4.1,.3],.02,5),Ne(t,t.edge,...pi(-3.4,4.5,-1.8),.12),dt(e,o.child(-1.6,0,3),.5,21),te(e,o.child(1.8,0,.4),3),Re(n,"scene-clinic")},k4=t=>{const n=Ae(t),{k:e,f:o}=n,{m:s,p:i}=e;o.cyl(i.fabricGrey,3.4,3.4,.03,0,0,0,40);const a=o.child(0,0,-2);a.box(s.slate,4.6,.3,.5,0,0,0,.04),a.box(i.plasticDark,4.4,2.5,.14,0,.3,0,.08),a.put(new Qe(4.2,2.3),Fs(2776951,.55),0,1.45,.075);for(const[d,f]of[[-.95,s.stoneWarm],[.95,s.copper]])a.ball(f,.28,d,1.85,.09),a.put(new Se(.62,18,10,0,Math.PI*2,0,Math.PI/2),i.fabricCream,d,.95,.09,0,0,0,1,.9,.3);a.box(i.fabricCream,.12,.7,.02,0,1.2,.09,.01),a.box(i.fabricCream,.7,.12,.02,0,1.49,.09,.01),on(e,o.child(-.6,0,1.1,Math.PI+.25),2),ce(t,{shirt:10129260,hair:5592405,scarf:11553344,seated:!0,pose:"listen",lean:.05},-.6,.46,.95,Math.PI+.25),hs(e,o.child(2,0,.6),.4,.55),di(e,o.child(2,.55,.6,.4),.3,.2,.16,e.p.fabricGreen);const r=o.child(3.5,0,0,-.4);r.box(s.slate,.8,.12,.5,0,0,0,.03),r.box(i.plasticDark,.62,1,.1,0,.12,0,.06),r.put(new Qe(.5,.88),i.screenOn,0,.62,.052),r.box(s.brass,.3,.22,.08,0,.5,.07,.02),r.put(new he(.1,.03,8,16,Math.PI),s.brass,0,.74,.07);for(const d of[-1,1]){const f=o.child(d*4.2,0,.2);f.cyl(s.stoneDark,.3,.38,.4,0,0,0,14),f.cyl(s.steel,.06,.1,2.3,0,.4,0,10),Ne(t,t.edge,...pi(d*4.2,3,.2),.3)}const c=new Vn([-4.2,-2.2,0,2.2,4.2].map((d,f)=>new X(...fi(d,2.9+(f%2?.5:-.1),.2)))),l=new V(new Zn(c,48,.05,6,!1),t.edge);l.userData.isLandscapeRoute=!0,l.castShadow=!0,t.root.add(l),te(e,o.child(-3.9,0,1.8),3),dt(e,o.child(3.9,0,2),.5,8),Re(n,"scene-telemedicine")},U4=t=>{const n=Ae(t),{k:e,f:o}=n,{m:s,p:i}=e;o.cyl(s.stoneWarm,3.7,3.8,.06,0,0,0,40);const a=[s.terracottaRoof,s.slate,s.terracottaRoof,s.slate];[[-3.4,-2.3,2,2.3],[-1.5,-2.9,2.2,3],[1.7,-2.9,2.2,2.7],[3.5,-2.2,2,3.4]].forEach(([f,u,h,p],x)=>{us(e,o.child(f,0,u,(x-1.5)*-.18),h,p,1.8,a[x],x%2?i.fabricCream:s.paper)});const r=o.child(0,0,-.8);us(e,r,3.2,3.2,2.4,s.terracottaRoof,s.paper);const c=Fs(14701917,.7);r.box(c,.18,.62,.05,0,3.75,1.35,.02),r.box(c,.62,.18,.05,0,3.97,1.35,.02),ce(t,{shirt:7973541,hair:2825494,pose:"talk",backpack:13081146},-.75,0,1.9,.5),ce(t,{shirt:15659506,trousers:5857386,hair:3811868,glasses:!0,pose:"listen"},.75,0,1.9,-.5);const l=o.child(3.2,0,1.6,-.3);l.box(s.slate,.7,.1,.5,0,0,0,.02),l.box(s.darkSteel,.08,.95,.08,0,.1,0,.01),l.box(i.plasticDark,.8,.55,.08,0,1,0,.05,-.12),l.put(new Qe(.7,.45),i.screenOn,0,1.28,.042,-.12),gn(e,o.child(-3.2,0,1.6,.3),1.5,.7,.75),Lo(e,o.child(-3.4,.75,1.6),.4,.3,.3),Xn(e,o.child(-2.9,.75,1.6),3,5);for(let f=0;f<4;f++)o.box(s.paveA,.7,.04,.5,-2.3+f*.55,0,-1.2+f*.5,.02,0,.5),o.box(s.paveB,.7,.04,.5,2.3-f*.55,0,-1.2+f*.5,.02,0,-.5),o.box(s.paveA,.9,.04,.55,0,0,.8+f*.6,.02);Ne(t,t.glow,...pi(0,4.5,-.8+.8),.22),te(e,o.child(-4.4,0,.4),3),te(e,o.child(4.4,0,.4),3);const d=new ro(16766368,.72,11,2);d.position.set(...fi(0,3.5,1.6)),t.root.add(d),Re(n,"scene-community")},F4=t=>{const n=Ae(t),{k:e,f:o}=n,{m:s}=e;o.cyl(s.stoneWarm,3.6,3.7,.06,0,0,0,40);const i=6.4;for(let h=0;h<20;h++)o.box(h%2?s.wood:s.woodDark,.3,.07,1.3,-i/2+h*(i/19),.6,.2,.01);o.box(s.woodDark,i,.14,.12,0,.5,-.4,.02),o.box(s.woodDark,i,.14,.12,0,.5,.8,.02);for(const h of[-2.4,0,2.4])o.box(s.stoneDark,.5,.6,1.6,h,0,.2,.03);for(const h of[-.4,.8])ds(e,o.child(-i/2,.68,h,0),i,.95,s.woodDark);o.box(s.stoneWarm,1.5,.08,2.6,0,.1,2,.02,-.19);for(const h of[-1,1])us(e,o.child(h*4,0,-.6,h*.18),2.3,2.9,2,h<0?s.terracottaRoof:s.slate,e.m.paper);const a=Fs(14701917,.7);o.box(a,.16,.56,.05,-4,3.55,.45,.02),o.box(a,.56,.16,.05,-4,3.75,.45,.02);const r=[{shirt:7973541,hair:2825494,pose:"talk",yaw:.45,x:-2.2},{shirt:10466753,hair:6974058,pose:"listen",yaw:-.2,x:-.7},{shirt:12163964,hair:3811868,pose:"point",yaw:.2,x:.7},{shirt:8560576,hair:2825494,pose:"listen",yaw:-.45,x:2.2}];for(const h of r)ce(t,{shirt:h.shirt,hair:h.hair,pose:h.pose,backpack:h.x<0?13081146:void 0},h.x,.67,.2,h.yaw);const c=o.child(0,.67,1.1,0);c.box(s.darkSteel,.06,.8,.06,0,0,0,.01),c.box(e.p.plasticDark,.7,.5,.05,0,.8,0,.03,-.25),c.put(new Qe(.6,.42),e.p.screenOn,0,1.05,.028,-.25);const l=[[-4,4.3,-.6],[0,3.9,-.6],[4,4.3,-.6]];for(const[h,p,x]of l)o.cyl(s.steel,.04,.06,p-.4,h,0,x-.9,8),Ne(t,t.glow,...pi(h,p,x-.9),.26);const d=new Vn(l.map(([h,p,x],m)=>new X(...fi(h,p-(m===1?0:.1),x-.9)))),f=new V(new Zn(d,40,.05,6,!1),t.edge);f.userData.isLandscapeRoute=!0,t.root.add(f),t.ring(5.35*0+5.2,Je+.2,Math.PI/2),te(e,o.child(-4.8,0,1.8),3),te(e,o.child(4.8,0,1.8),3);const u=new ro(11134719,.9,16,2);u.position.set(...fi(0,5,.6)),t.root.add(u),Re(n,"scene-community-network")},O4=t=>{const n=Ae(t),{k:e,f:o}=n,{m:s,p:i}=e,a=[Ni(7441817,.7),Ni(7311996,.7),Ni(12159845,.7)];o.cyl(s.stoneWarm,1.5,1.55,.05,0,0,.6,40),o.put(new he(1.4,.03,6,48),s.brass,0,.06,.6,Math.PI/2);for(let p=0;p<8;p++)o.box(p%2?s.slate:s.brass,.07,.012,p%2?1:1.35,0,.05,.6,.003,0,p/8*Math.PI);const r=[[-3.4,.4],[0,-1.9],[3.4,.4]];r.forEach(([p,x],m)=>{const g=p-0,v=x-.6,w=Math.hypot(g,v)-1.8,M=Math.atan2(g,v),y=.9+w/2;for(let b=0;b<Math.ceil(w/.55);b++){const T=1.6+b*.55;o.box(s.paveA,.55,.045,.42,Math.sin(M)*T,0,.6+Math.cos(M)*T,.015,0,M)}o.box(a[m],.08,.012,w,Math.sin(M)*y*1,.045,.6+Math.cos(M)*y,.003,0,M)});const c=new V(new xt(.2*Ee,.7*Ee,4),t.edge),[l,d]=Et(0,.6);c.position.set(l,Je+1.5*Ee,d),c.rotation.x=Math.PI/2,c.userData.isLandscapeBeacon=!0,t.root.add(c),gn(e,o.child(-3.4,0,1,.3),1.2,.6,.72),uu(n,-3.4,-.5,1,2,.35,1.3),A0(e,o.child(-3.35,.72,1,.3)),Ia(t,t.edge,-3,2.3,-.1,.5,.2),Ia(t,t.glow,-3.9,2.1,.1,.42,.18);const f=o.child(0,0,-1.9,0);gn(e,f.child(0,0,.5),1.6,.7,.72),f.box(s.slate,2.3,.14,.5,0,0,-.2,.03),f.box(s.darkSteel,.1,.6,.1,0,.14,-.2,.01),f.box(i.plasticDark,2.2,1.35,.1,0,.74,-.2,.07),f.put(new Qe(2.04,1.19),Fs(2776951,.55),0,1.42,-.145),f.cyl(i.plasticDark,.04,.04,.05,0,2.09,-.17,12);for(const[p,x]of[[-.5,s.stoneWarm],[.5,s.copper]])f.ball(x,.2,p,1.62,-.14),f.put(new Se(.42,18,10,0,Math.PI*2,0,Math.PI/2),i.fabricCream,p,1.05,-.14,0,0,0,1,.9,.3);qa(e,f.child(.3,.72,.5,Math.PI)),hs(e,o.child(3.4,0,.4),.5,.72),ko(e,o.child(3.3,.72,.4)),ko(e,o.child(3.55,.72,.45)),sn(e,o.child(2.55,0,.4,Math.PI/2)),sn(e,o.child(4.25,0,.4,-Math.PI/2)),ce(t,{shirt:12681576,hair:2825494,hairStyle:"long",seated:!0,pose:"talk",lean:.04},2.55,.45,.4,-Math.PI/2),ce(t,{shirt:7902858,hair:4471348,seated:!0,pose:"listen",lean:.05},4.25,.45,.4,Math.PI/2);for(const[p,x]of r)Ne(t,t.edge,p,3.3,x,.18);const u=o.child(0,0,-3.4,0);for(const p of[-1,1])u.box(s.stoneDark,.5,.25,.5,p*3,0,0,.03),u.cyl(s.woodDark,.12,.14,3.6,p*3,.25,0,12);u.box(s.woodDark,6.4,.2,.3,0,3.7,0,.03);const h=wo([{text:"CHOOSE BY PURPOSE",y:65,font:"bold 54px Arial, sans-serif"},{text:"QUICK MESSAGE",y:145,font:"bold 34px Arial, sans-serif"},{text:"ONE CLUB · FOUR WEEKS · NOT A UNIVERSAL RULE",y:265,font:"bold 25px Arial, sans-serif",color:"#d8c598"}]);if(h){const[p,x]=Et(0,-3.3),m=new V(new Qe(5.6*Ee,1.4*Ee),new Tt({map:h,side:qe,toneMapped:!1}));m.position.set(p,Je+2.7*Ee,x),m.rotation.y=Math.PI,m.userData.isLandscapeStage=!0,t.root.add(m)}u.box(s.woodDark,5.8,1.5,.12,0,1.95,-.02,.03),te(e,o.child(-4.8,0,2.2)),te(e,o.child(4.8,0,2.2)),dt(e,o.child(-1.8,0,2.4),.5,31),dt(e,o.child(1.8,0,2.4),.5,37),Re(n,"scene-focus")};function fi(t,n,e){const[o,s]=Et(t,e);return[o,Je+n*Ee,s]}function pi(t,n,e){return[t,n,e]}function z4(t,n,e,o){return[t,n,e]}const B4={focus:O4,notification:C4,"study-desk":D4,filter:I4,"offline-rest":L4,clinic:N4,telemedicine:k4,community:U4,"community-network":F4},G4=t=>{const n=Ae(t),{k:e,f:o}=n,{m:s,p:i}=e,a=["DEPARTURE","CROSSING","ARRIVAL"];[-3.6,0,3.6].forEach((r,c)=>{const l=o.child(r,0,-2,(1-c)*.12);l.box(s.stoneDark,2,.16,.6,0,0,0,.03);for(const f of[-1,1])l.cyl(s.woodDark,.06,.07,2.6,f*.85,.16,0,10);l.box(s.woodDark,2.1,1.7,.08,0,.7,0,.03),l.box(i.boardWhite,1.9,1.5,.04,0,.8,.05,.01),l.box(s.paper,1.5,.7,.012,0,1.4,.075,.004),l.box([s.copper,s.brass,e.p.fabricRed][c],1.5,.1,.012,0,1.2,.08,.004);for(let f=0;f<3;f++)l.box(s.stoneDark,1.1-f*.2,.05,.012,-.2+f*.1*-1,1.08-f*.15,.08,.004);l.box(s.woodDark,2.2,.08,.2,0,2.7,0,.02);const d=wo([{text:a[c],y:160,font:"bold 78px Arial, sans-serif"}],{width:640,height:320,background:"#2c3e50"});dn(t,d,r+Math.sin((1-c)*.12)*0,2.45,-1.9,1.5,.5,(1-c)*.12)}),cu(e,o.child(0,0,1),2.5,1.35,.78),lu(e,o.child(-.2,.3,1,.25),3.1,2);for(let r=0;r<12;r++)o.box(r%2?s.paveA:s.paveB,.7,.045,.5,-4.6+r*.84,0,-1,.015);[-3.6,0,3.6].forEach(r=>Ne(t,t.glow,r,.4,-1,.13)),on(e,o.child(-4.6,0,1.4,-.7),1.6),on(e,o.child(4.6,0,1.4,.7),1.6),te(e,o.child(-5.3,0,-1.6)),te(e,o.child(5.3,0,-1.6)),Re(n,"scene-timeline")},H4=t=>{const n=Ae(t),{k:e,f:o}=n,{m:s}=e,i=[[.16,.7],[.36,.34],[.58,.62],[.82,.3]],a=o.child(0,0,-2.2,0);a.box(s.stoneDark,6.2,.2,.8,0,0,0,.03);for(const r of[-1,1])a.cyl(s.woodDark,.09,.1,3.4,r*3,.2,0,12);a.box(s.woodDark,6.2,.2,.3,0,3.4,0,.03),a.box(s.woodDark,5.8,2.8,.1,0,.5,0,.03),dn(t,fu(i),0,.5+1.4+.2-.2,-2.2+.07,5.5,2.5),i.forEach(([r,c],l)=>{Ne(t,l%2?t.edge:t.glow,(r-.5)*-5.5*-1*-1,.5+.2+(1-c)*2.5+.05,-2.2+.2,.12)});for(const[r,c]of[[-2.2,.3],[2.2,-.3]]){const l=o.child(r,0,.7,c);gn(e,l,1.7,.9,.8),l.put(new Ye(1.5,.12,.7),s.glass,0,.88,0),Sn(e,l.child(-.3,.805,0,.1)),Xn(e,l.child(.4,.805,.05,.3),3,8),y4(e,l.child(0,.805,.25,-.2),.3,.22)}ce(t,{shirt:6982312,hair:3811868,glasses:!0,pose:"point",backpack:13081146},.2,0,.1,0),te(e,o.child(-4.4,0,1.6)),te(e,o.child(4.4,0,1.6)),dt(e,o.child(0,0,3),.5,41),Re(n,"scene-route-evidence")},V4=t=>{const n=Ae(t),{k:e,f:o}=n,{m:s}=e;for(let f=0;f<6;f++){const u=-3.9+f*1.6,h=.35+f*.45;o.box(f%2?s.stoneDark:s.stone,1.75,h,2,u,0,-.2,.06),o.box(s.leafLight,1.7,.08,1.9,u,h,-.2,.04);for(let p=0;p<3;p++)o.put(new Xi(.16+p%2*.05,1),s.rock,u-.4+p*.4,h+.1,.5,0,p,0,1,.7,1)}for(let f=0;f<6;f++)o.cyl(s.woodDark,.03,.04,.9,-4.3+f*1.6,.35+f*.45,.85,8);o.strut(s.woodDark,[-4.3,1.25,.85],[5-.6+0,3.55+.9-.35,.85],.02,6),o.cyl(s.steel,.03,.04,2.6,4.1,3.05,-.2,8),o.box(e.p.fabricRed,.9,.5,.02,4.55,4.9,-.2,.005),Ne(t,t.glow,3.4,4.2,-.2,.3),ce(t,{shirt:12681576,hair:2825494,backpack:3104138,pose:"walk"},-.35,1.55,.6,-.9);const i=Ki(1.4),[a,r]=Et(-4.6,-1.5);i.position.set(a,Je,r),t.root.add(i);const c=ks(1),[l,d]=Et(5,-1.7);c.position.set(l,Je+3,d),t.root.add(c),te(e,o.child(-5.3,0,1.2),3),Re(n,"scene-perseverance")},W4=t=>{const n=Ae(t),{k:e,f:o}=n,{m:s}=e;[0,1,2].forEach(i=>{const a=(i-1)*3.3,r=2.8+i*.7,c=o.child(a,0,-.6-i*.6,0),l=2.1;for(const f of[-1,1])c.box(s.stoneDark,.8,.3,.9,f*(l/2+.2),0,0,.04),c.box(s.stone,.62,r-.3,.72,f*(l/2+.2),.3,0,.05);c.put(qo(l/2+.52,l/2-.1,.72,.05),i===2?s.stoneWarm:s.stone,0,r,0),c.box(s.stoneDark,.5,.55,.8,0,r+l/2+.3,0,.05),c.put(new Se(.14,12,10),s.brass,0,r+l/2+.95,0),c.strut(s.steel,[0,r+l/2,0],[0,r+.5,0],.01,4),Ne(t,t.glow,a,r+.35,-.6-i*.6,.2+i*.05);const d=o.child(a,0,1.3-i*.2,0);d.box(s.stoneDark,.9,.18,.5,0,0,0,.03),d.box(s.stone,.7,1.1+i*.15,.2,0,.18,0,.05),d.box(s.slate,.5,.5,.02,0,.55+i*.05,.11,.01)});for(let i=0;i<14;i++)o.box(i%2?s.paveA:s.paveB,.65,.04,.5,-4.8+i*.74,0,2.5,.015);ce(t,{shirt:10129260,hair:6974058,scarf:11553344,pose:"point"},-3.6,0,1.6,.5),ce(t,{shirt:7973541,hair:2825494,scale:1},-2.8,0,1.9,-.4),te(e,o.child(-5.3,0,1)),te(e,o.child(5.3,0,1)),dt(e,o.child(4.3,0,2.5),.5,3),Re(n,"scene-legacy")},X4=t=>{const n=Ae(t),{k:e,f:o}=n,{m:s,p:i}=e;o.box(s.woodDark,7,.5,3.2,0,0,-1.4,.05);for(let r=0;r<10;r++)o.box(r%2?s.wood:s.woodDark,6.8,.02,.3,0,.5,-2.9+r*.32,.005);iu(e,o.child(0,0,1,Math.PI),2.2,3,.16,.3);for(let r=0;r<16;r++)o.box(i.fabricRed,.45,3.2,.12,-3.4+r*.45,.5,-3-r%2*.05,.03);o.box(s.woodDark,7.4,.35,.3,0,3.7,-3,.04);for(const r of[-1,1])for(let c=0;c<4;c++)o.box(i.fabricRed,.5,2.9-c*.3,.2,r*(3.5+c*.12),.5,-2.7+c*.35,.04);for(const r of[-1,1]){const c=o.child(r*4.5,0,.3);for(const[u,h]of[[-.22,-.22],[.22,-.22],[-.22,.22],[.22,.22]])c.strut(s.steel,[u,0,h],[u*.6,4.2,h*.6],.035,6);for(let u=0;u<=6;u++){const h=u/6,p=1-h*.4;c.strut(s.steel,[-.22*p,h*4.2,-.22*p],[.22*p,h*4.2,-.22*p],.015,4),c.strut(s.steel,[-.22*p,h*4.2,.22*p],[.22*p,h*4.2,.22*p],.015,4)}for(let u=0;u<3;u++)c.put(new we(.15,.2,.34,14),i.plasticDark,-r*.4,3+u*.35,.3,.5,0,r*.9);const l=new V(new xt(1.5*Ee,7*Ee,18,1,!0),new Tt({color:16773824,transparent:!0,opacity:.1,side:qe,depthWrite:!1,blending:ys})),[d,f]=Et(r*4.5-r*2,.3-1);l.position.set(d,Je+2.8*Ee,f),l.rotation.z=r*.5,l.userData.noLandscapeShadow=!0,t.root.add(l)}su(e,o.child(-1.2,.5,-1.4,.15)),ce(t,{shirt:3891087,hair:2825494,pose:"talk"},-2.1,.5,-1.3,.3);const a=o.child(1.3,.5,-1.4);a.cyl(s.stoneDark,.3,.38,.5,0,0,0,20),a.cyl(s.brass,.06,.08,.5,0,.5,0,12),Ne(t,t.edge,1.3,1.9,-1.4,.28);for(let r=0;r<4;r++)sn(e,o.child(-1.8+r*1.2,0,2.3,Math.PI));ce(t,{shirt:12681576,hair:2825494,hairStyle:"long",seated:!0,pose:"listen"},-.6,.45,2.3,Math.PI),ce(t,{shirt:7902858,hair:4471348,seated:!0,pose:"listen"},.6,.45,2.3,Math.PI),te(e,o.child(-5.4,0,2.2)),te(e,o.child(5.4,0,2.2)),Re(n,"scene-spotlight")},K4=t=>{const n=Ae(t),{k:e,f:o}=n,{m:s,p:i}=e;o.cyl(s.stoneWarm,3.8,3.9,.05,0,0,0,40),A4(e,o.child(0,0,-.4),7,5,2.9,i.canvasOlive);for(const r of[-1,1]){const c=o.child(r*2.6,0,-1.4);c.cyl(s.steel,.46,.5,1.3,0,.2,0,20),c.cyl(s.darkSteel,.46,.46,.06,0,1.5,0,20),c.put(new he(.46,.02,6,24),s.darkSteel,0,.8,0,Math.PI/2),c.cyl(s.brass,.03,.03,.2,0,.5,.55,8),c.box(s.wood,1,.2,1,0,0,0,.03)}[-1.6,0,1.6].forEach((r,c)=>{Lo(e,o.child(r,0,-.1,.05*(c-1)),1.1,.8,.8),Lo(e,o.child(r,.8,-.1,.3*(c-1)),.8,.5,.7),o.box(c===1?s.brass:e.p.fabricRed,.5,.012,.1,r,1.31,-.1,.003,0,0,0)});for(let r=0;r<4;r++)o.put(new Se(.3,12,10),e.p.fabricCream,3.3,.18+r%2*.2,-.5+r*.5,0,r,0,1.2,.6,.8);const a=o.child(0,0,-2.6);a.cyl(s.woodDark,.07,.08,2.6,-1.9,0,0,10),a.cyl(s.woodDark,.07,.08,2.6,1.9,0,0,10),Ya(e,a.child(0,.5,0),3.4,1.4,i.boardGreen);for(let r=0;r<3;r++)a.box(r===1?s.brass:s.paper,.7,.9,.01,-1.1+r*1.1,.75,.11,.004);[-1.1,0,1.1].forEach(r=>Ne(t,t.glow,r,2.35,-2.5,.12)),ce(t,{shirt:7311996,hair:2825494,pose:"talk",backpack:13081146},-.7,0,1.5,.4),ce(t,{shirt:12163964,hair:3811868,scarf:11553344,pose:"listen"},.7,0,1.5,-.4),te(e,o.child(-4.4,0,1.4)),te(e,o.child(4.4,0,1.4)),Re(n,"scene-humanitarian")},q4=t=>{const n=Ae(t),{k:e,f:o}=n,{m:s}=e;o.cyl(s.leafLight,3.7,3.8,.05,0,0,0,40);const i=ks(2.3),[a,r]=Et(0,-.8);i.position.set(a,Je,r),t.root.add(i),o.cyl(s.stoneDark,1.5,1.6,.3,0,0,-.8,28),o.cyl(s.soil,1.3,1.3,.05,0,.3,-.8,28);for(let d=0;d<9;d++){const f=d/9*Math.PI*2+.1;Math.sin(f)<-.2||(o.box(s.wood,.9,.08,.38,Math.cos(f)*2.3,.4,-.8+Math.sin(f)*2.3*.9,.015,0,-f+Math.PI/2),o.box(s.stoneDark,.12,.4,.3,Math.cos(f)*2.3,0,-.8+Math.sin(f)*2.3*.9,.02,0,-f+Math.PI/2))}const c=o.child(1.2,0,1.4,-.3);c.box(s.stoneDark,.9,.15,.5,0,0,0,.03),c.box(s.stone,.7,.8,.14,0,.15,0,.04,-.15),c.box(s.brass,.5,.3,.02,0,.5,.09,.005,-.15);const l=o.child(-1.3,0,1.4);l.cyl(s.copper,.16,.18,.3,0,0,0,14),l.strut(s.copper,[.12,.2,0],[.5,.45,0],.025,6),Ne(t,t.edge,-3.4,1,.4,.2),Ne(t,t.edge,3.4,1,.4,.2),ce(t,{shirt:7973541,hair:2825494,pose:"point"},0,0,2.3,0),dt(e,o.child(-4.2,0,1.2),.55,6),dt(e,o.child(4.2,0,1.2),.55,8),te(e,o.child(-4.8,0,-1.6)),te(e,o.child(4.8,0,-1.6)),Re(n,"scene-lasting-service")},Y4=t=>{const n=Ae(t),{k:e,f:o}=n,{m:s,p:i}=e;o.cyl(s.stoneWarm,3.6,3.7,.06,0,0,0,40),o.cyl(i.fabricCream,2.7,2.7,.08,0,0,0,40),hs(e,o.child(0,0,.7),.7,.72);const a=o.child(0,.72,.7);a.cyl(s.brass,.08,.1,.03,0,0,0,12),a.cyl(s.lampGlass,.07,.07,.2,0,.03,0,12),a.put(new xt(.11,.1,12),s.brass,0,.28,0),[[-2.5,-.5,-.65],[0,-1.7,0],[2.5,-.5,.65]].forEach(([l,d,f])=>on(e,o.child(l,0,d,Math.PI*0+f*-1+Math.PI),1.9));const c=[{x:-2.5,z:-.35,yaw:-.65,shirt:7973541,hair:2825494,pose:"talk"},{x:-.5,z:-1.55,yaw:0,shirt:12163964,hair:3811868,pose:"listen"},{x:.6,z:-1.55,yaw:0,shirt:8560576,hair:2825494,pose:"listen"},{x:2.5,z:-.35,yaw:.65,shirt:12681576,hair:5592405,pose:"listen"}];for(const l of c)ce(t,{shirt:l.shirt,hair:l.hair,seated:!0,pose:l.pose},l.x,.46,l.z,l.yaw);for(const l of[-3.2,0,3.2])Ne(t,t.glow,l,2.6,.3,.2);te(e,o.child(-4.4,0,-1.6)),te(e,o.child(4.4,0,-1.6)),dt(e,o.child(-3.6,0,2.6),.5,10),dt(e,o.child(3.6,0,2.6),.5,12),Re(n,"scene-community-witness")},$4=t=>{const n=Ae(t),{k:e,f:o}=n,{m:s}=e;o.put(new we(5,5,.2,48),e.p.water,0,.12,0),o.box(s.stoneDark,11.6,.36,.5,0,0,3.6,.03);for(let i=0;i<22;i++)o.box(i%2?s.wood:s.woodDark,.38,.06,1.5,-4.2+i*.4,.6,2.6,.01);for(let i=0;i<8;i++)o.cyl(s.woodDark,.09,.11,.9,-4+i*1.15,0,3.3,10),o.cyl(s.woodDark,.09,.11,.9,-4+i*1.15,0,1.9,10);[[-3.2,3,-.5],[0,2,.3],[3.2,3,.1]].forEach(([i,a,r],c)=>{lu(e,o.child(i,.2,r,.12-c*.12),c===1?3.6:3,a,c===1?e.p.fabricRed:e.p.fabricCream)}),Gi(e,o.child(-4.4,.66,2.9)),Lo(e,o.child(4.4,.66,2.6),.6,.5,.5);for(const i of[-1.5,1.5])Lo(e,o.child(i,.66,2.8,i*.1),.55,.45,.5);te(e,o.child(-5.2,.66,2)),te(e,o.child(5.2,.66,2)),ce(t,{shirt:3891087,hair:2825494,pose:"point",scarf:11553344},.9,.66,2.6,.2),Ne(t,t.glow,0,5.2,.3,.2),Re(n,"scene-fleet")},j4=t=>{const n=Ae(t),{k:e,f:o}=n,{m:s}=e;o.put(new we(5,5,.2,48),e.p.water,0,.12,.2);for(const i of[-1,1])o.box(s.stoneDark,3.4,.3,3,i*4.2,0,.1,.04),us(e,o.child(i*4.2,.3,.1,-i*.1),3,3.2,2.4,i<0?s.terracottaRoof:s.slate,s.stoneWarm);o.box(s.stone,5.2,.28,1.5,0,1,.1,.04),o.put(qo(2.5,2.1,1.4,.04),s.stoneDark,0,.25,.1);for(const i of[-.65,.85]){o.box(s.stoneDark,5.2,.12,.14,0,1.28+.65,i,.02);for(let a=0;a<7;a++)o.box(s.stoneDark,.1,.65,.1,-2.4+a*.8,1.28,i,.015)}ce(t,{shirt:7973541,hair:2825494,pose:"talk"},-.55,1.28,.1,Math.PI/2+.3),ce(t,{shirt:12681576,hair:5592405,pose:"talk"},.55,1.28,.1,-Math.PI/2-.3);for(const i of[-1,1]){const a=o.child(i*1.9,0,2.3,0);a.cyl(s.stoneDark,.3,.38,.8,0,0,0,14),a.box(s.stone,.8,.06,.6,0,.8,0,.015),Sn(e,a.child(0,.86,0,i*.4)),Xn(e,a.child(i*.28,.86,.1,.2),3,12+i)}Ne(t,t.glow,0,3.2,.1,.22),te(e,o.child(-5.4,0,2.2)),te(e,o.child(5.4,0,2.2)),Re(n,"scene-peace-contact")},Z4=t=>{const n=Ae(t),{k:e,f:o}=n,{m:s,p:i}=e;o.cyl(i.fabricGrey,3.7,3.7,.04,0,0,0,40),o.cyl(i.fabricCream,3.3,3.3,.05,0,0,0,40),o.cyl(s.woodDark,2,2,.12,0,.78,0,48),o.cyl(s.wood,2.1,2.1,.06,0,.72,0,48),o.cyl(s.woodDark,.18,.28,.78,0,0,0,14),o.cyl(s.woodDark,.8,.9,.08,0,0,0,24);const a=document.createElement("canvas");a.width=900,a.height=900;const r=a.getContext("2d");let c;if(r){r.fillStyle="#e2d3ac",r.fillRect(0,0,900,900),r.strokeStyle="#6a8a96",r.lineWidth=2;for(let u=0;u<18;u++)r.beginPath(),r.moveTo(u*52,0),r.lineTo(u*52,900),r.moveTo(0,u*52),r.lineTo(900,u*52),r.stroke();r.fillStyle="#b8c9a0",r.beginPath(),r.ellipse(250,300,150,100,.4,0,Math.PI*2),r.ellipse(650,620,170,110,-.3,0,Math.PI*2),r.fill(),r.strokeStyle="#b8473f",r.lineWidth=6,r.setLineDash([16,12]),r.beginPath(),r.moveTo(150,700),r.bezierCurveTo(350,450,500,650,760,200),r.stroke(),r.setLineDash([]),r.translate(740,160),r.fillStyle="#3a2d1a";for(let u=0;u<8;u++)r.rotate(Math.PI/4),r.beginPath(),r.moveTo(0,0),r.lineTo(10,-50),r.lineTo(-10,-50),r.fill();c=new Zt(a),c.colorSpace=yt,c.anisotropy=4}if(c){const u=new V(new Ds(1.9*Ee,48),new Tt({map:c,toneMapped:!1})),[h,p]=Et(0,0);u.rotation.x=-Math.PI/2,u.position.set(h,Je+.912*Ee,p),u.userData.noLandscapeShadow=!0,t.root.add(u)}const l=o.child(-.8,.84,.3,.6);l.strut(s.brass,[0,0,0],[.12,.28,0],.012,5),l.strut(s.brass,[.24,0,0],[.12,.28,0],.012,5);const d=o.child(.8,.84,.4);d.cyl(s.brass,.14,.14,.05,0,0,0,20),d.put(new Ds(.12,20),i.ceramic,0,.052,0,-Math.PI/2),R0(e,o.child(3.1,0,-1.2));const f=o.child(-3.3,0,-1.5,.3);f.box(s.woodDark,1.4,1.6,.4,0,0,0,.03);for(let u=0;u<3;u++)for(let h=0;h<4;h++)f.put(new we(.06,.06,.38,10),i.fabricCream,-.5+h*.33,.28+u*.45,0,Math.PI/2,0,0);ce(t,{shirt:3891087,hair:2825494,glasses:!0,pose:"point"},.1,0,2.3,.2),te(e,o.child(-4.6,0,1.6)),te(e,o.child(4.6,0,1.6)),Ne(t,t.edge,0,3,-.9,.28),Re(n,"scene-chart-room")},Q4=t=>{const n=Ae(t),{k:e,f:o}=n,{m:s,p:i}=e;o.put(new we(5,5,.2,48),i.water,0,.12,0);for(const r of[-1,1]){const c=o.child(r*3.9,0,.1);for(let l=0;l<12;l++)c.box(l%2?s.wood:s.woodDark,2.4,.07,.36,0,.62,-2+l*.37,.01);for(const l of[-1.1,1.1])for(const d of[-2,0,2])c.cyl(s.woodDark,.09,.11,.7,l,0,d,10);$a(e,c.child(0,.65,-.4),2.2,1.2,7,r<0?i.fabricRed:i.fabricBlue,i.fabricCream),gn(e,c.child(0,.65,-.1),1.6,.6,.7),Lo(e,c.child(-.7,.65,1.2,.2),.5,.4,.45),Gi(e,c.child(.8,.65,1.2),.24,.6)}for(let r=0;r<14;r++)o.box(r%2?s.wood:s.woodDark,.38,.07,1.4,-2.7+r*.415,.78,.1,.01,0,0,0);for(const r of[-.55,.75])ds(e,o.child(-2.8,.82,r,0),5.6,.9,s.woodDark);Lo(e,o.child(-.7,.85,.1,.1),.55,.45,.5),Lo(e,o.child(.7,.85,.1,-.2),.55,.45,.5);const a=o.child(0,.85,.8);a.cyl(s.brass,.04,.06,.6,0,0,0,10),a.box(s.brass,.9,.035,.035,0,.6,0,.008);for(const r of[-1,1])a.strut(s.steel,[r*.42,.6,0],[r*.42,.28,0],.006,4),a.cyl(s.brass,.14,.14,.02,r*.42,.27,0,16);[-1.6,0,1.6].forEach(r=>Ne(t,t.glow,r,2.8+(r===0?.4:0),-.1,.17)),ce(t,{shirt:12163964,hair:2825494,pose:"talk"},-1.8,.65,.2,.9),ce(t,{shirt:7973541,hair:5592405,pose:"listen"},1.8,.65,.2,-.9),te(e,o.child(-5.3,0,2.2)),te(e,o.child(5.3,0,2.2)),Re(n,"scene-exchange-harbor")},J4={timeline:G4,"route-evidence":H4,perseverance:V4,legacy:W4,spotlight:X4,humanitarian:K4,"lasting-service":q4,"community-witness":Y4,fleet:$4,"peace-contact":j4,"chart-room":Z4,"exchange-harbor":Q4};function Vo(t,n,e,o=.8,s=.6){const{f:i}=t;for(let a=0;a<n.length-1;a++){const[r,c]=n[a],[l,d]=n[a+1],f=Math.hypot(l-r,d-c),u=Math.atan2(l-r,d-c),h=Math.max(1,Math.round(f/s));for(let p=0;p<h;p++){const x=(p+.5)/h;i.box(e,o,.05,s*.82,r+(l-r)*x,0,c+(d-c)*x,.02,0,u+Math.sin(a*7+p*3)*.08)}}}function e_(){const t=document.createElement("canvas");t.width=1200,t.height=700;const n=t.getContext("2d");if(!n)return;const e=n.createLinearGradient(0,0,0,420);e.addColorStop(0,"#7fb2de"),e.addColorStop(1,"#f6e7c4"),n.fillStyle=e,n.fillRect(0,0,1200,700),n.fillStyle="#fff4c8",n.beginPath(),n.arc(880,180,62,0,Math.PI*2),n.fill(),n.fillStyle="rgba(255,255,255,0.8)";for(const[i,a,r]of[[200,120,160],[520,90,120],[1020,80,140]])n.beginPath(),n.ellipse(i,a,r,28,0,0,Math.PI*2),n.fill();const o=[["#8aa7b8",330,90],["#6f9a86",400,70],["#4f7f5a",470,50]];for(const[i,a,r]of o){n.fillStyle=i,n.beginPath(),n.moveTo(0,700);for(let c=0;c<=1200;c+=20)n.lineTo(c,a-Math.abs(Math.sin(c*.006+a))*r-Math.sin(c*.017)*14);n.lineTo(1200,700),n.fill()}n.fillStyle="#b9c98a",n.fillRect(0,560,1200,140),n.strokeStyle="rgba(60,90,40,0.45)",n.lineWidth=3;for(let i=0;i<12;i++)n.beginPath(),n.moveTo(i*120-100,700),n.lineTo(560+(i-6)*20,560),n.stroke();const s=new Zt(t);return s.colorSpace=yt,s.anisotropy=4,s}const t_=t=>{const n=Ae(t),{k:e,f:o}=n,{m:s,p:i}=e,a=[[.12,.72],[.3,.3],[.52,.58],[.74,.25],[.9,.7]],r=o.child(0,0,-2.4,0);r.box(s.stoneDark,6.6,.2,.8,0,0,0,.03);for(const f of[-1,1])r.cyl(s.woodDark,.09,.1,3.5,f*3.2,.2,0,12);r.box(s.woodDark,6.7,.2,.3,0,3.5,0,.03),r.box(s.woodDark,6.2,2.9,.1,0,.55,0,.03),dn(t,fu(a),0,.55+1.45,-2.4+.07,5.8,2.65),a.forEach(([f,u])=>Ne(t,t.glow,(f-.5)*5.8*-1*-1,.55+.1+(1-u)*2.65,-2.2,.12));const c=o.child(-4,0,.4,.4);c.box(s.darkSteel,1.2,.06,.8,0,.3,0,.015);for(const[f,u]of[[-.5,-.32],[.5,-.32],[-.5,.32],[.5,.32]])c.put(new he(.12,.035,8,16),s.darkSteel,f,.15,u,0,Math.PI/2);c.strut(s.darkSteel,[-.55,.33,-.3],[-.55,1.15,-.3],.02,6),c.strut(s.darkSteel,[-.55,.33,.3],[-.55,1.15,.3],.02,6),c.strut(s.darkSteel,[-.55,1.15,-.3],[-.55,1.15,.3],.02,6),di(e,c.child(.1,.33,0,.1),.6,.5,.34,i.fabricBlue),di(e,c.child(.1,.8,0,-.2),.5,.36,.3,i.fabricRed);const l=jn(8022604);Vo(n,[[-2.8,1.8],[-1,1],[.8,1.3],[2.6,.9]],l,.9,.6),Vo(n,[[.8,1.3],[.2,2.4],[-.4,3.2]],s.paveA,.6,.55),Hi(e,o.child(1.6,0,.5,.3),[{yaw:Math.PI/2-.4,len:1.1},{yaw:-Math.PI/2+.3,len:.9,tone:s.copper}]),Ne(t,t.glow,1.6,3.1,.5,.12);const d=o.child(4.1,0,-.7,-.35);us(e,d,2.5,2.7,1.8,s.terracottaRoof,i.fabricCream),gn(e,d.child(0,0,1.55),1.8,.6,.9,s.wood);for(let f=0;f<4;f++)d.cyl(i.ceramic,.09,.08,.2,-.6+f*.4,.9,1.5,12);Ne(t,t.glow,3.7,3.3,-.1,.15),ce(t,{shirt:13081146,hair:3811868,pose:"talk"},4,0,.55,.2),ce(t,{shirt:6982312,hair:2825494,backpack:11553344,pose:"point"},2.9,0,1.3,-1),te(e,o.child(-4.9,0,2.2)),te(e,o.child(4.9,0,2.6)),Re(n,"scene-itinerary")};function jn(t,n=.9){const e=new ge({color:t,roughness:n,metalness:.02});return e.fog=!1,e}const n_=t=>{const n=Ae(t),{k:e,f:o}=n,{m:s,p:i}=e;Vo(n,[[-4.8,2.6],[-2.4,2.4],[0,1.8]],s.paveA,.9,.6);for(const[r,c,l]of[[-.5,1.4,.85],[.5,1.8,.7],[.1,.8,.6],[1.2,1.1,.5],[-1.1,.9,.45]]){const d=l/.62;o.put(os(1+Math.abs(r*.37+c*.19)).geometry,m0(),r,-.03*d,c,0,r*3+c,0,d*1.1,d*.95,d)}for(let r=0;r<18;r++)o.put(new Xi(.08+r%4*.03,0),s.stoneDark,-1.6+r%6*.65,.06,.6+Math.floor(r/6)*.5,r,r*2,0);for(const r of[-1,1])o.cyl(s.woodDark,.05,.06,1,r*1.8,0,2.2,8);for(let r=0;r<6;r++)o.box(r%2?i.fabricCream:i.fabricRed,.55,.14,.04,-1.4+r*.56,.7,2.2,.01);o.box(s.darkSteel,.9,.5,.04,0,1.15,2.2,.02),o.box(i.fabricRed,.7,.3,.01,0,1.25,2.23,.005);const a=jn(8022604);Vo(n,[[-2.4,2.4],[-3,.4],[-1.6,-1.6],[1.2,-2],[3.6,-.6],[4.6,1.8]],a,.85,.55),Hi(e,o.child(-2.6,0,1.9,.2),[{yaw:-Math.PI/2+.2,len:1.1,tone:s.copper}]),Hi(e,o.child(3.8,0,.4,-.2),[{yaw:Math.PI/2+.5,len:1,tone:s.copper}]),Ne(t,t.glow,-2.6,3.1,1.9,.14),Ne(t,t.glow,3.8,3.1,.4,.14),ce(t,{shirt:12681576,hair:2825494,backpack:3104138,scarf:14725194,pose:"walk"},-2.9,0,-.3,.5);for(const[r,c,l]of[[-4.6,-1.2,1.1],[4.8,-1.8,1],[.4,-3.2,1.3]]){const d=Ki(l),[f,u]=Et(r,c);d.position.set(f,Je,u),t.root.add(d)}te(e,o.child(-4.8,0,3)),Re(n,"scene-detour")},o_=t=>{const n=Ae(t),{k:e,f:o}=n,{m:s,p:i}=e;o.cyl(s.stoneWarm,3.7,3.8,.05,0,0,0,40),[-3.4,3.4].forEach((c,l)=>{const d=o.child(c,0,-.2,-c*.07);$a(e,d.child(0,0,-1,Math.PI),2.6,1.3,8,l===0?i.fabricRed:i.fabricBlue,i.fabricCream),gn(e,d.child(0,0,.3),2.2,.7,.85,s.wood);for(let f=0;f<6;f++){const u=[14240573,15903035,8042056,14707599,6966233,15909198][f];d.put(new Se(.1,10,8),jn(u,.6),-.8+f*.32,.95,.3+f%2*.12)}Lo(e,d.child(-1.4,0,-.5,.2),.6,.45,.5),Gi(e,d.child(1.4,0,-.5),.26,.65);for(let f=0;f<3;f++)Xn(e,d.child(-.6+f*.6,.85,.6,f),2+f,20+f)});const a=[-3.6,-1.8,0,1.8,3.6].map((c,l)=>new X(...p_(c,3.2-(l===2?.55:l%2?.3:0),-.4))),r=new V(new Zn(new Vn(a),40,.02,5,!1),jn(2304045));r.userData.isLandscapeRoute=!0,t.root.add(r);for(let c=0;c<9;c++){const l=new Vn(a).getPoint(c/8),d=new V(new Se(.1*Ee,10,8),t.glow);d.position.copy(l).add(new X(0,-.12,0)),d.userData.isLandscapeBeacon=c%2===0,t.root.add(d)}ce(t,{shirt:6982312,hair:2825494,backpack:11553344,pose:"talk"},-.8,0,1.4,.45),ce(t,{shirt:12681576,hair:5592405,scarf:5077589,pose:"listen"},.8,0,1.4,-.45),dt(e,o.child(-1.7,0,3),.5,22),dt(e,o.child(1.7,0,3),.5,24),te(e,o.child(-4.9,0,2)),te(e,o.child(4.9,0,2)),Re(n,"scene-market-encounter")},s_=t=>{const n=Ae(t),{k:e,f:o}=n,{m:s}=e;for(let l=0;l<4;l++){const d=-3+l*.75,f=7.6-l*.9;o.box(s.stoneDark,f,.35+(3-l)*.3,.7,0,0,d,.04),o.box(s.soil,f-.2,.05,.5,0,.33+(3-l)*.3,d,.01);for(let u=0;u<Math.floor(f/.6);u++)o.put(js(31+l*17+u,.2+u%3*.04+.06,16),po(),-f/2+.4+u*.6,.55+(3-l)*.3,d,0,u*1.7,0,1,.85,1)}o.put(new we(2,2,.2,40),e.p.water,0,.14,1.3,0,0,0,1.3,1,.75),o.put(new he(2,.12,8,40),s.stoneDark,0,.24,1.3,Math.PI/2,0,0,1.3,.75,1);for(let l=0;l<5;l++)o.cyl(s.stone,.26,.28,.08,-1.6+l*.8,.22,1.3+Math.sin(l*1.4)*.25,14);for(const[l,d]of[[-1,1.7],[.6,.9],[1.6,1.6]])o.cyl(s.leaf,.2,.2,.02,l,.26,d,14),o.ball(e.p.fabricCream,.07,l+.04,.3,d,1,.7,1);on(e,o.child(-3.4,0,1.5,-.5),1.8),on(e,o.child(3.4,0,1.5,.5),1.8),ce(t,{shirt:13081146,hair:2825494,hairStyle:"bun",seated:!0,pose:"write",lean:.1},-3.3,.44,1.5,-.5);const i=o.child(-2.6,0,3);i.cyl(s.stoneDark,.18,.22,.2,0,0,0,10),i.cyl(s.stone,.07,.09,.9,0,.2,0,10),i.box(s.stone,.4,.3,.4,0,1.1,0,.03),i.cyl(s.lampGlass,.12,.12,.2,0,1.14,0,8),i.put(new xt(.34,.2,4),s.stoneDark,0,1.5,0,0,Math.PI/4);const a=ks(1.5),[r,c]=Et(3.9,-2.2);a.position.set(r,Je+.6,c),t.root.add(a),Ne(t,t.glow,0,3,-.2,.22),te(e,o.child(4.8,0,2.6)),Re(n,"scene-reflection-garden")},i_=t=>{const n=Ae(t),{k:e,f:o}=n,{m:s,p:i}=e,a=o.child(0,0,-1.6);us(e,a,6.6,3.4,2.8,s.terracottaRoof,i.fabricCream);for(const c of[-2.2,0,2.2])P0(e,a.child(c,2.16,1.42),.8,.86,{cols:2,rows:2,curtain:c!==0}),a.box(s.wood,1.05,.06,.34,c,1.98,1.58,.01);const r=wo([{text:"HOSTEL",y:110,font:"bold 96px Arial, sans-serif"},{text:"BEDS · TEA · MAPS",y:220,font:"bold 36px Arial, sans-serif",color:"#d8c598"}],{width:720,height:300,background:"#3a2d20"});dn(t,r,0,3.1,-1.6+1.52,2,.85),Ne(t,t.glow,0,4.9,-.3,.2),on(e,o.child(-3.4,0,.9,.35),1.7),ld(e,o.child(3,0,1,.3),e.p.fabricRed),ld(e,o.child(3.5,0,.7,.2),e.p.fabricBlue),o.box(s.darkSteel,1.6,.05,.05,3.2,.5,1.3,.01),di(e,o.child(-1.6,0,1.4,.4),.55,.62,.3,i.fabricGreen),Vo(n,[[0,3.6],[0,2.4],[0,1.4]],s.paveA,.9,.6),ce(t,{shirt:6982312,hair:2825494,backpack:13081146,pose:"walk"},-.2,0,2.3,.1),ce(t,{shirt:12163964,hair:5592405,scarf:11553344,pose:"talk"},.9,0,.9,-.3),dt(e,o.child(-4.6,0,0),.5,5),te(e,o.child(-4.9,0,2.4)),te(e,o.child(4.9,0,2.4)),Re(n,"scene-hostel")},a_=t=>{const n=Ae(t),{k:e,f:o}=n,{m:s,p:i}=e,a=o.child(0,0,-1.2,0);for(const r of[-1,1])a.box(s.stoneDark,1.2,.4,1.2,r*2.6,0,0,.05),a.box(s.stone,.95,3.4,.95,r*2.6,.4,0,.06),a.box(s.stoneDark,1.25,.25,1.25,r*2.6,3.8,0,.05);a.put(qo(2.6,2,1,.06),s.stone,0,4.05,0),a.box(s.stoneDark,.8,.8,1.1,0,6.5,0,.06),a.put(new Se(.2,14,10),s.brass,0,7.5,0),Vo(n,[[0,2.6],[0,.9],[-.9,-.4]],s.paveA,.9,.55),Vo(n,[[0,2.6],[0,.9],[.9,-.4]],s.paveB,.9,.55),Vo(n,[[-.9,-.4],[-2.4,-1.4],[-3.9,-2.4]],jn(6982287),.85,.55),Vo(n,[[.9,-.4],[2.4,-1.4],[3.9,-2.4]],jn(8036474),.85,.55);for(const r of[-1,1])Hi(e,o.child(r*4,0,-2.8,-r*.4),[{yaw:r*(Math.PI/2-.5),len:1.1,tone:r<0?s.copper:s.leaf}],2.4),Ne(t,t.edge,r*4,2.9,-2.8,.34);ce(t,{shirt:12681576,hair:2825494,backpack:3104138,pose:"read"},0,0,2.2,0),on(e,o.child(-3.8,0,1.6,-.5),1.6),dt(e,o.child(3.8,0,1.8),.5,27),te(e,o.child(-4.9,0,2.6)),te(e,o.child(4.9,0,2.6)),Re(n,"scene-open-route")},r_=t=>{const n=Ae(t),{k:e,f:o}=n,{m:s,p:i}=e;for(let c=0;c<4;c++){const l=7.6-c*1.2;o.box(c%2?s.stoneWarm:s.stone,l,.4+c*.4,1.1,0,0,1.6-c*.95,.05)}const a=.4+3*.4+.4;o.box(s.stoneDark,4.4,.4,1.7,0,a-.4,-1.6,.05),ds(e,o.child(-2,a,-.85,0),4,.95,s.darkSteel),ds(e,o.child(-2,a,-2.4,0),4,.95,s.darkSteel);for(const c of[-1,1])ds(e,o.child(c*2,a,-2.4,Math.PI/2*-c),1.6,.95,s.darkSteel);const r=o.child(1.5,a,-1.2,-.4);r.cyl(s.darkSteel,.06,.1,1.1,0,0,0,10),r.put(new we(.1,.12,.7,16),s.steel,.1,1.22,.2,Math.PI/2-.4),r.put(new he(.12,.025,8,16),s.brass,.1,1.2,.5,Math.PI/2-.4),o.cyl(s.steel,.03,.04,3,-1.8,a,-2.2,8),o.box(i.fabricRed,1,.55,.02,-1.3,a+2.4,-2.2,.005),Ne(t,t.glow,0,2.2+a,-2.2,.4),ce(t,{shirt:7973541,hair:2825494,backpack:13081146,pose:"point"},-.2,a,-1.6,0),dt(e,o.child(-3.6,0,2.4),.5,29),dt(e,o.child(3.6,0,2.4),.5,31),te(e,o.child(-4.8,0,1.2)),te(e,o.child(4.8,0,1.2)),Re(n,"scene-confidence")},c_=t=>{const n=Ae(t),{k:e,f:o}=n,{m:s,p:i}=e;o.cyl(s.stoneWarm,3.6,3.7,.05,0,0,0,40);for(const l of[-3.2,0,3.2])for(const d of[-1.6,1])o.cyl(s.woodDark,.09,.11,2.8,l,0,d,12);for(const l of[-1.6,1])o.box(s.woodDark,7.2,.2,.2,0,2.8,l,.03);for(const l of[-3.2,0,3.2])o.box(s.woodDark,.18,.18,2.8,l,2.8,-.3,.02);for(const l of[-1,1])o.box(s.terracottaRoof,7.8,.1,1.9,0,3.2,-.3+l*.85,.02,-l*.38);o.box(s.brass,7.9,.12,.2,0,3.55,-.3,.02),on(e,o.child(0,0,-1.2,Math.PI),3.2),di(e,o.child(-1.9,0,.3,.5),.5,.55,.28,i.fabricBlue);for(const l of[-1.8,1.8])o.strut(s.darkSteel,[l,2.8,-.3],[l,2.3,-.3],.012,4),o.cyl(s.lampGlass,.1,.14,.3,l,2,-.3,8);ce(t,{shirt:12163964,hair:2825494,seated:!0,pose:"listen",scarf:11553344},.5,.45,-1,0),ce(t,{shirt:6982312,hair:5592405,seated:!0,pose:"talk"},-.5,.45,-1,0),R4(e,o.child(3.2,0,2.6,0),.62,i.fabricRed),ce(t,{shirt:5077589,hair:2825494,pose:"walk"},3.2,0,2.6,.9);for(const[l,d,f]of[[-2.4,2.4,.7],[.4,2.8,.55],[-3.8,.8,.5]])o.cyl(i.water,f,f,.015,l,0,d,20);const a=new Tt({color:12575730,transparent:!0,opacity:.55,depthWrite:!1}),r=new Gn(new we(.008*Ee,.008*Ee,.7*Ee,4),a,140),c=new Wi;for(let l=0;l<140;l++){const d=l*2.399%(Math.PI*2),f=1.2+l*37%100/100*3.6,u=Math.cos(d)*f*1.2,h=1.2+Math.sin(d)*f*.7,[p,x]=Et(u,h);c.position.set(p,Je+(.8+l*53%100/100*3.4)*Ee,x),c.rotation.z=.12,c.updateMatrix(),r.setMatrixAt(l,c.matrix)}r.userData.noLandscapeShadow=!0,r.castShadow=!1,t.root.add(r),te(e,o.child(-4.8,0,2.2)),Re(n,"scene-rain-shelter")},l_=t=>{const n=Ae(t),{k:e,f:o}=n,{m:s,p:i}=e;o.box(s.stoneDark,10.4,.5,2.6,0,0,.2,.04),o.box(s.paveA,10.2,.04,2.4,0,.5,.2,.01),o.box(i.fabricCream,10.2,.012,.12,0,.54,1.3,.003);for(const c of[-4.2,-1.4,1.4,4.2])o.cyl(s.darkSteel,.1,.12,3.5,c,.54,-.6,12),o.box(s.darkSteel,.4,.15,.4,c,.54,-.6,.02);o.box(s.darkSteel,10.2,.14,.14,0,4,-.6,.02);for(let c=0;c<4;c++)o.box(s.slate,2.6,.08,2.6,-3.9+c*2.6,4.12,.25,.015,.14);o.box(i.fabricRed,10.4,.1,.1,0,4,1.5,.01);const a=o.child(0,3.2,-.6,0);a.put(new we(.4,.4,.1,32),i.ceramic,0,0,.1,Math.PI/2),a.put(new he(.42,.04,8,32),s.brass,0,0,.14),a.box(s.darkSteel,.025,.28,.01,0,-.14,.18,.004),a.box(s.darkSteel,.02,.2,.01,.1,-.1,.19,.004,0,0,-1.1);const r=wo([{text:"PLATFORM 3",y:120,font:"bold 80px Arial, sans-serif"},{text:"COAST EXPRESS",y:230,font:"bold 40px Arial, sans-serif",color:"#d8c598"}],{width:720,height:340,background:"#1f3a5f"});dn(t,r,3.3,3.1,-.6+.1,1.6,.75),Zr(e,o.child(-5.2,0,2.8,0),10.4,.72),Zr(e,o.child(-5.2,0,4.3,0),10.4,.72);for(const c of[-1,1]){const l=o.child(c*4.9,0,3.4);l.cyl(s.darkSteel,.05,.07,3.2,0,0,0,8),l.box(i.plasticDark,.3,.8,.2,0,3,0,.03),l.ball(c<0?jn(4112746,.3):jn(14701917,.3),.08,0,3.25,.12),Ne(t,c<0?t.glow:t.edge,c*4.9,3.9,3.4,.14)}on(e,o.child(-3,.54,.2,Math.PI),1.8),on(e,o.child(3,.54,.2,Math.PI),1.8),ce(t,{shirt:6982312,hair:2825494,backpack:13081146,seated:!0,pose:"listen"},-3.3,.54+.45,0,0),di(e,o.child(-1.8,.54,.6,.3),.55,.6,.3,i.fabricGreen),ce(t,{shirt:12681576,hair:5592405,scarf:11553344,pose:"stand"},1,.54,.8,0),ce(t,{shirt:7973541,hair:2825494,pose:"phone"},2.8,.54,.7,-.3),Re(n,"scene-rail-platform")},d_=t=>{const n=Ae(t),{k:e,f:o}=n,{m:s,p:i}=e;Zr(e,o.child(-5.4,0,.2,0),10.8,.9);const a=jn(3104138,.5),r=jn(15262936,.5);o.box(s.darkSteel,9,.35,2.3,0,.5,.2,.05),o.box(a,9.2,.7,2.5,0,.85,.2,.06),o.box(r,9.22,.12,2.52,0,1.55,.2,.02),o.box(a,9.2,1.45,2.5,0,1.65,.2,.08),o.box(r,9,.28,2.32,0,3.1,.2,.05),o.put(new we(1.2,1.2,9,24,1,!1,-Math.PI/2-.9,1.8),s.darkSteel,0,3.25,.2,0,0,Math.PI/2,1,1,.7);const c=[-3.5,-1.75,0,1.75,3.5];c.forEach(l=>{o.box(s.darkSteel,1.42,1,.06,l,1.75,1.45,.02),o.put(new Qe(1.3,.88),s.glass,l,2.25,1.49)});for(const l of c)o.box(i.fabricBlue,.7,.18,.5,l,1.45,.7,.04),o.box(i.fabricBlue,.7,.6,.12,l,1.5,.45,.04,-.1);ce(t,{shirt:12681576,hair:2825494,hairStyle:"long",seated:!0,pose:"read"},-1.75,1.5,.55,Math.PI),ce(t,{shirt:7902858,hair:4471348,seated:!0,pose:"phone"},1.75,1.5,.55,Math.PI),o.box(r,1.1,2,.06,4.15,.9,1.46,.02),o.box(s.slate,.9,.12,.35,4.15,.55,1.65,.02);for(const l of[-3,3]){o.box(s.darkSteel,1.7,.2,.3,l,.28,1.2,.03);for(const d of[-.55,.55])o.put(new we(.34,.34,.12,24),s.steel,l+d,.34,1.3,Math.PI/2)}for(const l of[-3,0,3])o.cyl(s.steel,.2,.22,.18,l,3.9,.2,14);Ne(t,t.glow,0,5,.2,.22),te(e,o.child(-5,0,3)),te(e,o.child(5,0,3)),Re(n,"scene-rail-car")},f_=t=>{const n=Ae(t),{k:e,f:o}=n,{m:s,p:i}=e;o.cyl(i.fabricGrey,3.6,3.6,.04,0,0,0,40);const a=jn(14142901,.9);o.box(a,2.6,4.8,.25,-2.9,0,-2.2,.03),o.box(a,2.6,4.8,.25,2.9,0,-2.2,.03),o.box(a,3.4,1.4,.25,0,3.4,-2.2,.03),o.box(a,3.4,.9,.25,0,0,-2.2,.03),o.put(qo(1.85,1.65,.3,.04),s.woodDark,0,2.2,-2.2),o.box(s.woodDark,.12,2.2,.3,-1.7,.9,-2.2,.02),o.box(s.woodDark,.12,2.2,.3,1.7,.9,-2.2,.02),dn(t,e_(),0,2.5,-2.5,3.4,2),o.put(new Qe(3.3,1.8),s.glass,0,2.5,-2.25);for(const r of[-1,1]){for(let c=0;c<4;c++)o.box(i.fabricRed,.18,2.4-c*.1,.1,r*(1.55+c*.1),1.2,-2+c*.01,.03);o.box(s.brass,.1,.06,.14,r*1.55,1.9,-2,.01)}gn(e,o.child(0,0,-1.4),1,.5,.74,s.wood),ko(e,o.child(-.2,.74,-1.4)),Sn(e,o.child(.25,.74,-1.4,.2)),sn(e,o.child(-.6,0,-.4,Math.PI),s.woodDark),ce(t,{shirt:12681576,hair:2825494,hairStyle:"long",seated:!0,pose:"listen"},-.6,.45,-.4,Math.PI),sn(e,o.child(.6,0,-.4,Math.PI),s.woodDark),ce(t,{shirt:6982312,hair:5592405,seated:!0,pose:"point",glasses:!0},.6,.45,-.4,Math.PI-.3),te(e,o.child(-4.8,0,2.2)),te(e,o.child(4.8,0,2.2)),dt(e,o.child(-3.6,0,1.8),.5,33),dt(e,o.child(3.6,0,1.8),.5,35),Ne(t,t.glow,1.1,3.9,-2,.28),Re(n,"scene-landscape-window")},u_=t=>{const n=Ae(t),{k:e,f:o}=n,{m:s,p:i}=e;o.box(s.woodDark,8.6,.95,4.4,0,0,-.9,.06),o.box(jn(8297058,.95),8.2,.05,4,0,.95,-.9,.02),[[-3,-1.2,1.1],[.2,-1.8,1.4],[3,-1,1]].forEach(([l,d,f],u)=>{for(let h=0;h<9;h++){const p=l+(h%3-1)*.5*f,x=d+(Math.floor(h/3)-1)*.45*f,m=(.3+(h*37+u*11)%10/10*.8)*f;o.box(h%2?s.stoneWarm:i.fabricCream,.36*f,m,.34*f,p,1,x,.02),o.box(s.slate,.4*f,.03,.38*f,p,1+m,x,.005)}Ne(t,t.glow,l,1+1.6*f+.3,d,.18*f)}),[[-3,-1.2,.2,-1.8],[.2,-1.8,3,-1],[-3,-1.2,3,-1]].forEach(([l,d,f,u],h)=>{const p=Math.hypot(f-l,u-d),x=Math.atan2(u-d,f-l),m=Math.round(p/.3);for(let g=0;g<m;g++){const v=(g+.5)/m,w=l+(f-l)*v,M=d+(u-d)*v+(h===2?.9*Math.sin(v*Math.PI):0);o.box(h===2?s.paveA:s.woodDark,.12,.03,.34,w,1,M,.008,0,-x)}if(h!==2)for(const g of[-.1,.1])o.box(s.steel,p,.025,.025,(l+f)/2,1.03,(d+u)/2+g,.005,0,-x)}),o.box(jn(12073778,.5),.5,.18,.2,-1.4,1.04,-1.5,.04,0,.25),o.box(s.darkSteel,.3,.12,.18,-1,1.04,-1.62,.03,0,.25),ce(t,{shirt:7973541,hair:2825494,backpack:13081146,pose:"point",lean:.12},.3,0,2.3,0),ce(t,{shirt:12681576,hair:5592405,pose:"listen"},-1.4,0,2.5,.3);const c=wo([{text:"ROUTE NETWORK",y:110,font:"bold 70px Arial, sans-serif"}],{width:720,height:220,background:"#1f3a5f"});dn(t,c,0,.55,1.35,1.8,.55,0,-.18),te(e,o.child(-4.9,0,2.4)),te(e,o.child(4.9,0,2.4)),Re(n,"scene-route-network")},h_={itinerary:t_,detour:n_,"market-encounter":o_,"reflection-garden":s_,hostel:i_,"open-route":a_,"rain-shelter":c_,confidence:r_,"rail-platform":l_,"rail-car":d_,"landscape-window":f_,"route-network":u_};function p_(t,n,e){const[o,s]=Et(t,e);return[o,Je+n*Ee,s]}const xo=(t,n=.85,e=.02,o={})=>{const s=new ge({color:t,roughness:n,metalness:e,...o});return s.fog=!1,s};function hu(t,n,e){const s=document.createElement("canvas");s.width=t*120,s.height=n*120;const i=s.getContext("2d");if(!i)return;const a=["#b83b32","#2f5d8a","#c79a3a","#3f7a4f","#e8dec6","#6a4a8a"];for(let c=0;c<n;c++)for(let l=0;l<t;l++){const d=c*t+l+e,f=l*120,u=c*120;i.fillStyle=a[d*5%a.length],i.fillRect(f,u,120,120),i.fillStyle=a[(d*3+4)%a.length];const h=d%3;h===0?(i.beginPath(),i.moveTo(f+120/2,u+14),i.lineTo(f+120-14,u+120/2),i.lineTo(f+120/2,u+120-14),i.lineTo(f+14,u+120/2),i.closePath(),i.fill()):h===1?(i.beginPath(),i.arc(f+120/2,u+120/2,38,0,Math.PI*2),i.fill(),i.fillStyle=a[d*5%a.length],i.beginPath(),i.arc(f+120/2,u+120/2,18,0,Math.PI*2),i.fill()):(i.lineWidth=10,i.strokeStyle=a[(d*3+4)%a.length],i.strokeRect(f+20,u+20,80,80),i.strokeRect(f+40,u+40,40,40)),i.strokeStyle="rgba(0,0,0,0.2)",i.lineWidth=2,i.strokeRect(f,u,120,120)}const r=new Zt(s);return r.colorSpace=yt,r.anisotropy=4,r}function C0(t,n,e,o,s=0){const{k:i,f:a}=t,r=a.child(n,0,e,s);r.box(i.m.woodDark,o,.12,1,0,.8,0,.02),r.box(i.m.wood,o+.1,.06,1.05,0,.92,0,.015);for(const c of[-1,1])r.box(i.m.woodDark,.12,.8,.9,c*(o/2-.1),0,0,.02);r.box(i.m.woodDark,o-.4,.1,.1,0,.3,-.4,.01);for(let c=0;c<2;c++)r.box(i.m.wood,.9,.5,.04,-o/2+.8+c*1.05,.12,.47,.01);r.box(i.m.darkSteel,.3,.2,.22,o/2-.5,.98,.3,.02),r.cyl(i.m.darkSteel,.02,.02,.4,o/2-.5,1,.55,8)}function D0(t,n,e,o=2.6,s=1.4){const{k:i,f:a}=t,r=a.child(n,0,e,0);r.box(i.m.wood,o,s,.06,0,1.2,0,.015);for(let c=0;c<4;c++){const l=-o/2+.4+c*(o-.8)/3;r.box(i.m.darkSteel,.05,.5,.03,l,1.6-c%2*.1,.06,.008),r.box(c%2?i.m.brass:i.m.steel,.2,.1,.04,l,2.1-c%2*.1,.06,.01)}}function Ko(t,n,e,o,s,i=.2){Ne(t.ctx,n,e,o,s,i)}const m_=t=>{const n=Ae(t),{k:e,f:o}=n,{m:s,p:i}=e;o.cyl(i.fabricGrey,3.7,3.7,.04,0,0,0,40),o.cyl(i.fabricCream,3.2,3.2,.05,0,0,0,40),hs(e,o.child(0,0,.2),1.1,.74),qa(e,o.child(-.3,.74,.4,Math.PI)),Sn(e,o.child(.45,.74,0,.3)),ko(e,o.child(0,.74,.7)),[-2.6,0,2.6].forEach((r,c)=>{const l=o.child(r,0,-2.2,(1-c)*.25);if(l.box(s.stoneDark,1.9,.14,.5,0,0,0,.03),l.box(s.woodDark,.1,2.4,.1,-.85,.14,0,.01),l.box(s.woodDark,.1,2.4,.1,.85,.14,0,.01),l.box(i.boardWhite,1.7,1.9,.06,0,.5,0,.015),l.box([s.copper,s.brass,s.steel][c],1.5,.16,.02,0,2.2,.04,.005),c===0){l.put(new he(.35,.09,8,20),s.steel,0,1.3,.06);for(let d=0;d<8;d++){const f=d/8*Math.PI*2;l.box(s.steel,.12,.2,.08,Math.cos(f)*.48,1.3+Math.sin(f)*.48-.1,.06,.01,0,0,f+Math.PI/2)}}else c===1?(Sn(e,l.child(0,.9,.08,0)),l.box(s.brass,.7,.04,.02,0,1.55,.05,.005)):(l.box(s.steel,.12,.9,.05,0,.85,.06,.02,0,0,.7),l.put(new he(.17,.06,8,16,Math.PI*1.5),s.steel,-.24,1.55,.06,0,0,.7))});const a=[[-1.8,.4,Math.PI/2+.15,8214333,"talk",2825494],[1.8,.4,-Math.PI/2-.15,4811890,"listen",5592405],[0,2,Math.PI,9070660,"write",3811868]];for(const[r,c,l,d,f,u]of a)sn(e,o.child(r,0,c,l),s.wood),ce(t,{shirt:d,hair:u,seated:!0,pose:f,glasses:f==="write"},r,.45,c,l);for(const r of[-2,0,2])o.strut(s.darkSteel,[r,5.5,.2],[r,4.2,.2],.01,4),o.cyl(s.lampGlass,.2,.28,.4,r,3.9,.2,12),o.put(new xt(.3,.18,12),s.brass,r,4.38,.2);Ko(n,t.glow,0,3.6,.2,.28),te(e,o.child(-4.7,0,1.2)),te(e,o.child(4.7,0,1.2)),dt(e,o.child(-3.6,0,2.8),.5,41),dt(e,o.child(3.6,0,2.8),.5,43),Re(n,"scene-career")},g_=t=>{const n=Ae(t),{k:e,f:o}=n,{m:s,p:i}=e;o.cyl(i.fabricGrey,3.7,3.7,.04,0,0,0,40);const a=o.child(0,0,-2.4,0);a.box(s.stoneDark,4.6,.16,.5,0,0,0,.03);for(const h of[-1,1])a.box(s.woodDark,.12,2.8,.12,h*2.1,.16,0,.01);a.box(s.woodDark,4.6,.14,.2,0,2.95,0,.02),a.box(i.boardWhite,4.2,2.3,.05,0,.55,0,.01);for(let h=0;h<4;h++)a.box(s.slate,2.4-h%2*.5,.06,.012,.3,2.35-h*.5,.04,.004),a.cyl(h<2?s.leaf:s.stoneDark,.1,.1,.012,-1.6,2.28-h*.5,.04,14);[-3,-1,1].forEach(h=>{li(e,o.child(h,0,0,0),1.4,.7,.75),sn(e,o.child(h,0,.8,Math.PI),s.wood)});const r=o.child(3,0,0);li(e,r,1.4,.7,.75);const c=r.child(0,0,.8,Math.PI+.2);c.box(s.wood,.42,.04,.42,0,.4,0,.01),c.box(s.wood,.42,.34,.03,0,.46,-.2,.01,-.08);for(const[h,p,x]of[[-1,-1,.4],[1,-1,.4],[-1,1,.25],[1,1,.4]])c.cyl(s.woodDark,.018,.022,x,h*.18,0,p*.18,8);const l=t.ring(.9,Je+.15,Math.PI/2);l.scale.setScalar(.8);const[d,f]=Et(3,.8);l.position.set(d,Je+.25,f);const u=o.child(2,0,1.5,.3);u.box(i.fabricRed,.6,.28,.28,0,0,0,.03),u.box(s.darkSteel,.5,.04,.08,0,.28,0,.01),ce(t,{shirt:3104138,trousers:3817285,hair:2825494,pose:"point",backpack:13081146},1.3,0,1.8,.5),Ne(t,t.glow,-1.6,3.2,-1.9,.14),te(e,o.child(-4.6,0,1.4)),te(e,o.child(4.6,0,1.4)),Re(n,"scene-bench")},v_=t=>{const n=Ae(t),{k:e,f:o}=n,{m:s,p:i}=e,a=xo(11031327,.35,.05),r=xo(2823688,.5,.1);o.cyl(s.stoneDark,2.2,2.4,.4,0,0,-.4,24),o.cyl(s.stone,1.9,2,.3,0,.4,-.4,24);const c=o.child(0,.85,-.4,0);c.put(new Se(1,32,20),a,0,1,0,0,0,0,.95,1.1,.28),c.put(new Se(.78,32,20),a,0,2.15,0,0,0,0,.9,.95,.27),c.put(new we(.5,.5,.36,24),a,0,1.6,0,Math.PI/2,0,0,1,1,1.1);for(const f of[-1,1])c.box(r,.06,.55,.02,f*.34,1.4,.31,.01,0,0,f*.12);c.box(xo(14200944,.5),.5,.1,.1,0,1,.33,.02),c.box(r,.8,.18,.1,0,.2,.3,.02),c.box(r,.22,2.4,.14,0,1.8,.3,.03),c.box(a,.2,.5,.2,0,4.1,.15,.04),c.put(new he(.2,.07,10,20,Math.PI*1.7),a,0,4.75,.15,0,0,.6);for(let f=0;f<4;f++)c.cyl(s.brass,.045,.045,.22,(f%2?1:-1)*.2,4+(f>1?.28:0),.15,8),c.strut(s.steel,[-.075+f*.05,4,.38],[-.075+f*.05,.4,.38],.008,4);Ko(n,t.edge,0,5.8,-.4,.28);const l=o.child(2.2,0,.4,0);l.strut(s.woodDark,[0,0,0],[.5,3.4,0],.025,6),l.strut(i.fabricCream,[.04,.2,.05],[.46,3.2,.05],.012,4);const d=o.child(-2.8,0,1.3,.3);d.cyl(s.darkSteel,.03,.05,1.4,0,0,0,8),d.box(s.darkSteel,.7,.4,.03,0,1.4,0,.01,-.35),d.box(s.paper,.6,.32,.01,0,1.43,.03,.003,-.35),ce(t,{shirt:7973541,hair:2825494,hairStyle:"long",pose:"listen"},2.8,0,1.4,-.4),te(e,o.child(-4.5,0,-.8)),te(e,o.child(4.5,0,-.8)),dt(e,o.child(-3.6,0,2.8),.5,45),dt(e,o.child(3.6,0,2.8),.5,47),Re(n,"scene-violin")},x_=t=>{const n=Ae(t),{k:e,f:o}=n,{m:s}=e;o.cyl(s.stoneWarm,3.7,3.8,.05,0,0,0,40),o.cyl(s.paveA,2.6,2.6,.06,0,0,0,40),[-3.6,-1.2,1.2,3.6].forEach((a,r)=>{const c=o.child(a,0,.2,(r-1.5)*-.1);c.box(s.stoneDark,1.3,.3,1.3,0,0,0,.04),c.box(s.stone,1.05,1,1.05,0,.3,0,.05),c.box(s.brass,.7,.28,.03,0,.62,.54,.008);const l=c.child(0,1.5,0);if(r===0)l.box(s.woodDark,.12,1.1,.12,0,-.1,0,.02,0,0,.35),l.box(s.steel,.5,.26,.26,-.17,.5,0,.03,0,0,.35);else if(r===1)l.box(s.steel,.16,1.3,.08,0,-.1,0,.03,0,0,-.4),l.put(new he(.2,.08,8,20,Math.PI*1.6),s.steel,.28,.58,0,0,0,-.4);else if(r===2){l.put(new he(.4,.12,10,24),s.brass,0,.35,0);for(let d=0;d<10;d++){const f=d/10*Math.PI*2;l.box(s.brass,.14,.2,.2,Math.cos(f)*.55,.35+Math.sin(f)*.55-.1,0,.02,0,0,f+Math.PI/2)}}else l.strut(s.steel,[0,.9,0],[-.35,-.3,0],.035,6),l.strut(s.steel,[0,.9,0],[.35,-.3,0],.035,6),l.ball(s.brass,.09,0,.9,0)}),Ko(n,t.glow,0,3.9,.2,.3),t.ring(4.8,Je+.12,Math.PI/2);for(const a of[-2.4,0,2.4])on(e,o.child(a,0,2.6,0),1.6);te(e,o.child(-4.8,0,1.6)),te(e,o.child(4.8,0,1.6)),Re(n,"scene-work-dignity")},__=t=>{const n=Ae(t),{k:e,f:o}=n,{m:s,p:i}=e;o.cyl(i.fabricGrey,3.7,3.7,.04,0,0,0,40),C0(n,0,-.4,6.6,0);const a=o.child(0,1,-.4,0);a.box(s.steel,5.6,.16,.5,0,0,0,.02);for(let r=0;r<=56;r++)a.box(s.darkSteel,.014,r%5===0?.12:.07,.01,-2.8+r*.1,r%5===0?.04:.08,.255,.002);a.box(s.steel,.2,1.4,.5,-2.7,-0,0,.02),a.box(s.steel,.2,1.4,.5,-.2,0,0,.02),a.box(s.steel,1.2,.5,.52,.45,.16,0,.03),a.box(i.plasticDark,.6,.26,.04,.5,.45,.28,.02),a.put(new Qe(.5,.18),i.screenOn,.5,.58,.304),a.cyl(s.darkSteel,.08,.08,.1,.9,.68,0,14),a.cyl(s.brass,.5,.5,1.2,-1.45,.16,0,24),Ko(n,t.glow,-.2,2.6,-.4,.28),Ko(n,t.edge,.5,2,-.4,.16),D0(n,0,-2.4,3.6,1.6),ce(t,{shirt:4811890,trousers:3817285,hair:2825494,glasses:!0,pose:"point"},0,0,1.6,0),te(e,o.child(-4.8,0,1.4)),te(e,o.child(4.8,0,1.4)),Re(n,"scene-caliper")},M_=t=>{const n=Ae(t),{k:e,f:o}=n,{m:s,p:i}=e;o.cyl(i.fabricGrey,3.7,3.7,.04,0,0,0,40),C0(n,0,-.5,7,0);const a=.98,r=o.child(-2.3,a,-.5);r.cyl(s.wood,.35,.35,.06,0,.55,0,24);for(let f=0;f<4;f++){const u=f/4*Math.PI*2+Math.PI/4;r.strut(s.woodDark,[Math.cos(u)*.25,.55,Math.sin(u)*.25],[Math.cos(u)*.38,0,Math.sin(u)*.38],.04,8)}const c=o.child(0,a,-.5);c.put(new Ga([new ot(.01,0),new ot(.28,.02),new ot(.4,.35),new ot(.22,.7),new ot(.14,.9),new ot(.2,1)].map(f=>f),28),e.p.ceramic,0,0,0),c.put(new he(.34,.015,6,28),xo(3104138,.4),0,.4,0,Math.PI/2);const l=o.child(2.3,a,-.5);l.cyl(s.brass,.38,.38,.12,0,0,0,28),l.cyl(s.brass,.24,.24,.3,0,.12,0,20);for(let f=0;f<6;f++){const u=f/6*Math.PI*2;l.cyl(s.darkSteel,.04,.04,.02,Math.cos(u)*.3,.12,Math.sin(u)*.3,8)}const d=o.child(-3.2,a,-.9);d.cyl(s.darkSteel,.1,.12,.04,0,0,0,14),d.strut(s.darkSteel,[0,.04,0],[.5,.9,0],.02,6),d.strut(s.darkSteel,[.5,.9,0],[1.4,1.4,.1],.02,6),d.put(new xt(.2,.3,14,1,!0),s.brass,1.45,1.35,.1,Math.PI),[-2.3,0,2.3].forEach(f=>Ne(t,f===0?t.glow:t.edge,f,3.1,-.5,.14)),D0(n,0,-2.4,3.8,1.5),ce(t,{shirt:8214333,hair:2825494,hairStyle:"short",glasses:!0,pose:"write"},-1.3,0,.9,.2),ce(t,{shirt:4811890,hair:5592405,pose:"point",scarf:13081146},1.3,0,.9,-.2),te(e,o.child(-4.8,0,1.4)),te(e,o.child(4.8,0,1.4)),Re(n,"scene-craft-quality")},w_=t=>{const n=Ae(t),{k:e,f:o}=n,{m:s,p:i}=e;o.cyl(i.fabricGrey,3.7,3.7,.04,0,0,0,40),C0(n,0,-.6,7.4,0);const a=.98,r=o.child(-2.4,a,-.6,.15);r.cyl(s.darkSteel,.05,.07,1,0,0,0,10),r.cyl(s.slate,.2,.25,.08,0,0,0,16),r.put(new we(.62,.62,.14,40),i.ceramic,0,1.4,0,Math.PI/2),r.put(new he(.64,.07,10,40),s.brass,0,1.4,.08);for(let u=0;u<24;u++){const h=u/24*Math.PI*2;r.box(s.darkSteel,.02,u%6===0?.13:.07,.01,Math.sin(h)*.5,1.4+Math.cos(h)*.5-.05,.085,.002,0,0,-h)}r.box(i.fabricRed,.025,.46,.01,.05,1.4,.1,.004,0,0,-.5),r.cyl(s.darkSteel,.03,.03,.3,0,.9,0,8);const c=o.child(2.4,a,-.6,-.15);c.cyl(s.darkSteel,.05,.07,1,0,0,0,10),c.cyl(s.slate,.2,.25,.08,0,0,0,16),c.box(i.plasticDark,1.5,1,.12,0,.9,0,.06);const l=wo([{text:"12.347",y:120,font:"bold 110px 'Courier New', monospace",color:"#8ff0d8"},{text:"mm",y:230,font:"bold 48px Arial, sans-serif",color:"#7ab8a8"}],{width:600,height:340,background:"#10252a",border:"#2e6a64"});dn(t,l,2.4*1+.02,a+1.42,-.6+.08,1.3,.78,-.15),c.cyl(s.steel,.03,.03,.4,0,.5,.2,8);const d=[[-1.6,3],[-.8,3.9],[0,4.2],[.8,3.9],[1.6,3]].map(([u,h])=>new X(Et(u,-.6)[0],Je+h*Ee,Et(u,-.6)[1])),f=new V(new Zn(new Vn(d),36,.05,6,!1),t.glow);f.userData.isLandscapeRoute=!0,t.root.add(f),Ko(n,t.edge,0,4.6,-.6,.26),D0(n,0,-2.5,3.8,1.5),ce(t,{shirt:8214333,hair:2825494,glasses:!0,pose:"point"},0,0,1.1,0),te(e,o.child(-4.8,0,1.4)),te(e,o.child(4.8,0,1.4)),Re(n,"scene-craft-evolution")},b_=t=>{const n=Ae(t),{k:e,f:o}=n,{m:s}=e;o.put(new we(5,5,.2,48),e.p.water,0,.12,0);const i=1.6;for(const a of[-1,1])o.box(s.stoneDark,1.5,.5,2.2,a*4,0,0,.04),o.box(s.stone,1.2,i-.5,1.8,a*4,.5,0,.05);for(let a=0;a<24;a++)o.box(a%2?s.wood:s.woodDark,.34,.08,1.5,-4+a*.35,i,0,.01);for(const a of[-.8,.8])o.box(s.darkSteel,8.6,.14,.12,0,i-.12,a,.02);for(const a of[-3.4,3.4]){for(const r of[-.9,.9])o.box(s.stone,.4,3.6,.4,a,i,r,.04);o.box(s.stoneDark,.5,.3,2.2,a,i+3.6,0,.04)}for(const a of[-.9,.9]){const r=[];for(let l=0;l<=12;l++){const d=l/12,f=-4.2+d*8.4,u=i+3.8-Math.sin(d*Math.PI)*2.6+(Math.abs(f)>3.4,0);r.push(new X(Et(f,a)[0],Je+u*Ee,Et(f,a)[1]))}const c=new V(new Zn(new Vn(r),40,.035*Ee,6,!1),xo(2830390,.5,.6));c.userData.isLandscapeRoute=!0,t.root.add(c);for(let l=1;l<12;l++){const d=l/12,f=-4.2+d*8.4,u=i+3.8-Math.sin(d*Math.PI)*2.6;o.strut(s.steel,[f,i+.1,a],[f,u,a],.012,4)}}for(const a of[-.78,.78])ds(e,o.child(-4,i+.08,a,0),8,.95,s.woodDark);ce(t,{shirt:4811890,trousers:3817285,hair:2825494,backpack:13081146,pose:"talk"},-.55,i+.08,0,Math.PI/2+.3),ce(t,{shirt:8214333,hair:5592405,scarf:11553344,pose:"talk"},.55,i+.08,0,-Math.PI/2-.3),Ko(n,t.glow,0,5.6,0,.3),te(e,o.child(-4.8,0,2.2)),te(e,o.child(4.8,0,2.2)),Re(n,"scene-trust-bridge")},S_=t=>{const n=Ae(t),{k:e,f:o}=n,{m:s,p:i}=e;o.cyl(i.fabricGrey,3.7,3.7,.04,0,0,0,40);const a=o.child(0,0,-1.2,0);for(const c of[-1,1])a.box(s.woodDark,.3,.2,1.3,c*2,0,0,.03),a.box(s.wood,.22,4.4,.22,c*2,.2,0,.03);a.box(s.wood,4.4,.24,.24,0,4.4,0,.03),a.box(s.woodDark,4.2,.18,.2,0,.9,0,.02);const r=[12073778,3104138,13081146,4160079,15261382];for(let c=0;c<22;c++)a.cyl(c%3===0?xo(15261382,.9):xo(r[c%r.length],.9),.014,.014,3.4,-1.9+c*.18,1,0,5);for(let c=0;c<4;c++)a.box(xo(r[(c+1)%r.length],.9),3.9,.22,.04,0,1+c*.24,.03,.008);a.box(s.woodDark,4,.08,.12,0,2.6,.1,.01),a.box(s.wood,3.9,.05,.1,0,3.2,-.05,.01);for(let c=0;c<6;c++)a.cyl(s.stoneDark,.1,.12,.3,-1.8+c*.72,.5,.2,10);o.box(s.woodDark,.5,.05,.1,.9,1.5,-1,.02,0,0,.1),b4(e,o.child(0,0,.6),.46),ce(t,{shirt:12073778,hair:2825494,hairStyle:"bun",seated:!0,pose:"write",lean:.1},0,.46,.6,Math.PI);for(const[c,l]of[[-3,.6],[3,.8]]){const d=o.child(c,0,l);d.cyl(s.wood,.4,.3,.45,0,0,0,18);for(let f=0;f<5;f++)d.ball(xo(r[f%r.length],.9),.14,Math.cos(f*1.3)*.18,.5,Math.sin(f*1.3)*.18)}Ko(n,t.glow,0,5.6,-1.2,.26),te(e,o.child(-4.8,0,1.6)),te(e,o.child(4.8,0,1.6)),Re(n,"scene-loom")},y_=t=>{const n=Ae(t),{k:e,f:o}=n,{m:s,p:i}=e;o.cyl(i.fabricGrey,3.7,3.7,.04,0,0,0,40),gn(e,o.child(0,0,.2),4.4,1.1,.78,s.wood);const a=o.child(0,.78,-.1,0);for(const h of[-1,1])a.box(s.woodDark,.1,2.2,.1,h*1.35,0,-.1,.01);a.box(s.woodDark,2.9,.1,.1,0,2.2,-.1,.01),a.put(new he(1.1,.07,10,40),s.wood,0,1.3,-.1);const r=document.createElement("canvas");r.width=800,r.height=800;const c=r.getContext("2d");let l;if(c){c.fillStyle="#efe6d0",c.fillRect(0,0,800,800);const h=["#c13b4a","#e0a63a","#3f7a4f","#2f5d8a"];c.translate(400,400);for(let p=0;p<3;p++)for(let x=0;x<8;x++)c.save(),c.rotate(x/8*Math.PI*2+p*.2),c.fillStyle=h[(x+p)%4],c.beginPath(),c.ellipse(0,-170+p*45-p*15,52-p*10,120-p*28,0,0,Math.PI*2),c.fill(),c.restore();c.fillStyle="#e0a63a",c.beginPath(),c.arc(0,0,46,0,Math.PI*2),c.fill(),l=new Zt(r),l.colorSpace=yt,l.anisotropy=4}if(l){const h=new V(new Ds(1.06*Ee,48),new Tt({map:l,toneMapped:!1,side:qe})),[p,x]=Et(0,-.1-.05);h.position.set(p,Je+(.78+1.3)*Ee,x),h.rotation.y=Math.PI,h.userData.noLandscapeShadow=!0,t.root.add(h)}const d=o.child(-3.6,0,-.9,.2);d.box(s.woodDark,.9,2,.3,0,0,0,.02);const f=[12073778,3104138,13081146,4160079,6965898,15261382];for(let h=0;h<5;h++)for(let p=0;p<4;p++)d.cyl(xo(f[(h*3+p)%f.length],.8),.07,.07,.14,-.3+p*.2,.25+h*.36,.15,12);for(let h=0;h<6;h++)o.cyl(xo(f[h%f.length],.8),.06,.06,.12,-1.7+h*.22,.78,.65,12);o.box(s.woodDark,.5,.14,.34,1.6,.78,.6,.03),o.strut(s.steel,[1,.8,.7],[1.3,.82,.78],.01,4),ko(e,o.child(-.4,.78,.7));const u=o.child(2,.78,0);u.cyl(s.darkSteel,.1,.12,.04,0,0,0,14),u.strut(s.darkSteel,[0,.04,0],[.1,.9,0],.02,6),u.put(new xt(.2,.22,14,1,!0),s.brass,.12,.95,0,Math.PI),Ko(n,t.glow,2.12,2.2,0,.1),sn(e,o.child(-.6,0,1.4,Math.PI),s.woodDark),ce(t,{shirt:4160079,hair:2825494,hairStyle:"long",glasses:!0,seated:!0,pose:"write",lean:.12},-.6,.45,1.4,Math.PI),te(e,o.child(-4.8,0,2.2)),te(e,o.child(4.8,0,2.2)),Re(n,"scene-embroidery")},T_=t=>{const n=Ae(t),{k:e,f:o}=n,{m:s,p:i}=e;o.cyl(i.fabricGrey,3.7,3.7,.04,0,0,0,40);const a=o.child(0,0,-2.2,0);a.box(s.stoneDark,6.6,.2,.8,0,0,0,.03);for(const r of[-1,1])a.box(s.woodDark,.2,4.4,.3,r*3.2,.2,0,.02);a.box(s.woodDark,6.6,.22,.3,0,4.4,0,.02),a.box(s.woodDark,6.2,4,.1,0,.35,0,.02),dn(t,hu(7,5,3),0,.35+2,-2.2+.07,5.9,3.85);for(const r of[-1,1]){const c=o.child(r*2.4,0,.5,-r*.15);c.box(s.woodDark,1.8,.8,.9,0,0,0,.03),c.put(new Ye(1.7,.5,.8),s.glass,0,1.05,0),c.box(r<0?i.fabricRed:i.fabricBlue,1.4,.04,.6,0,.82,0,.01),c.box(i.fabricCream,1,.04,.5,0,.86,0,.01,0,.2)}Ne(t,t.glow,0,4.6,-2,.24),ce(t,{shirt:6965898,hair:2825494,hairStyle:"bun",pose:"read"},0,0,1.6,0),on(e,o.child(-4.4,0,1.8,.4),1.6),te(e,o.child(-4.8,0,.2)),te(e,o.child(4.8,0,.2)),Re(n,"scene-heritage")},E_=t=>{const n=Ae(t),{k:e,f:o}=n,{m:s,p:i}=e;o.cyl(i.fabricGrey,3.7,3.7,.04,0,0,0,40),[0,1,2].forEach(r=>{const c=-.2-r*1.15,l=2.5-r*.45,d=3.3-r*.2,f=o.child(0,0,c,0);for(const h of[-1,1])f.box(s.stoneDark,.8,.26,.8,h*(l+.1),0,0,.04),f.box(s.stone,.56,d-.26,.56,h*(l+.1),.26,0,.05);f.put(qo(l+.4,l-.16,.56,.05),r===1?s.stoneWarm:s.stone,0,d,0);const u=hu(2,5,r*4+1);dn(t,u,0,2.2,c+.05,l*.7,2.6-r*.2),f.box(s.woodDark,l*.8,.08,.1,0,3.55-r*.2,0,.015),Ne(t,r===1?t.edge:t.glow,0,d+l+.5,c,.16)});const a=o.child(-2.8,0,1.8,.4);a.put(new he(.6,.05,8,32),s.wood,0,.8,0);for(let r=0;r<8;r++){const c=r/8*Math.PI*2;a.strut(s.wood,[0,.8,0],[Math.cos(c)*.58,.8+Math.sin(c)*.58,0],.02,5)}a.cyl(s.woodDark,.06,.06,.12,0,.76,0,10),a.box(s.woodDark,.12,.8,.12,0,0,0,.02),a.box(s.woodDark,1.4,.1,.5,.3,.12,0,.02),a.strut(s.steel,[.7,.9,0],[1.2,.9,0],.015,4),a.cyl(i.fabricCream,.1,.1,.2,1.2,.78,0,10),ce(t,{shirt:6965898,hair:5592405,hairStyle:"bun",pose:"point"},.9,0,1.6,.4),ce(t,{shirt:4160079,hair:2825494,pose:"listen"},2,0,1.5,-.4),te(e,o.child(-4.8,0,.2)),te(e,o.child(4.8,0,.2)),dt(e,o.child(3.8,0,2.6),.5,49),Re(n,"scene-living-heritage")},A_={career:m_,bench:g_,violin:v_,"work-dignity":x_,caliper:__,"craft-quality":M_,"craft-evolution":w_,"trust-bridge":b_,loom:S_,"embroidery-table":y_,heritage:T_,"living-heritage":E_},yn=(t,n=.85,e=.02,o={})=>{const s=new ge({color:t,roughness:n,metalness:e,...o});return s.fog=!1,s},La=(t,n=.8)=>yn(t,.35,.1,{emissive:t,emissiveIntensity:n}),Pn=yn(15331056,.4,.25),Mt=yn(10134440,.5,.4),mt=yn(2107181,.5,.5),Qa=yn(1911629,.25,.6),pu=yn(9276037,1),Na=yn(7170920,1);function mu(){const t=document.createElement("canvas");t.width=800,t.height=400;const n=t.getContext("2d");if(!n)return;n.fillStyle="#9b9893",n.fillRect(0,0,800,400);for(let o=0;o<260;o++){const s=o*197%800,i=o*89%400,a=4+o*53%40;n.fillStyle=`rgba(${90+o%40},${88+o%40},${85+o%40},0.55)`,n.beginPath(),n.arc(s,i,a,0,Math.PI*2),n.fill(),n.strokeStyle="rgba(220,218,212,0.35)",n.lineWidth=2,n.stroke()}const e=new Zt(t);return e.colorSpace=yt,e}function gu(){const t=document.createElement("canvas");t.width=800,t.height=400;const n=t.getContext("2d");if(!n)return;n.fillStyle="#2a5f9a",n.fillRect(0,0,800,400),n.fillStyle="#4f8f4a";for(const[o,s,i,a]of[[160,150,90,70],[300,260,60,80],[520,130,110,60],[620,250,70,50],[700,110,50,40]])n.beginPath(),n.ellipse(o,s,i,a,.3,0,Math.PI*2),n.fill();n.fillStyle="rgba(255,255,255,0.7)";for(let o=0;o<24;o++)n.beginPath(),n.ellipse(o*131%800,o*61%400,50+o%5*12,10+o%3*6,.2,0,Math.PI*2),n.fill();const e=new Zt(t);return e.colorSpace=yt,e}function Vi(t,n="#7ef0d4"){const e=document.createElement("canvas");e.width=640,e.height=420;const o=e.getContext("2d");if(!o)return;o.fillStyle="#0d1c24",o.fillRect(0,0,640,420),o.strokeStyle="rgba(120,200,190,0.2)",o.lineWidth=1;for(let i=0;i<13;i++)o.beginPath(),o.moveTo(i*50,0),o.lineTo(i*50,420),o.stroke();for(let i=0;i<9;i++)o.beginPath(),o.moveTo(0,i*50),o.lineTo(640,i*50),o.stroke();for(const[i,a]of[[n,0],["#f0b85a",1.7]]){o.strokeStyle=i,o.lineWidth=4,o.beginPath();for(let r=0;r<=640;r+=6){const c=210+Math.sin(r*.014+t+a)*90+Math.sin(r*.05+t*2)*26;r===0?o.moveTo(r,c):o.lineTo(r,c)}o.stroke()}o.fillStyle="#7ef0d4",o.font="bold 28px 'Courier New', monospace",o.fillText(`TLM-${t*37%90+10}`,18,38);const s=new Zt(e);return s.colorSpace=yt,s.anisotropy=4,s}function I0(t,n,e,o,s=1){const{f:i,k:a}=t,r=i.child(n,0,e);r.put(new we(o,o*1.04,.28,48),pu,0,.14,0);for(let c=0;c<9;c++){const l=c*2.4+s,d=(.25+c*.37%.6)*o,f=.25+(c*29+s)%10*.05;r.put(new he(f,.06,6,22),Na,Math.cos(l)*d,.3,Math.sin(l)*d*.9,Math.PI/2),r.put(new we(f*.92,f*.92,.03,20),Na,Math.cos(l)*d,.28,Math.sin(l)*d*.9)}for(let c=0;c<16;c++){const l=c*1.9+s*3,d=(.2+c*.53%.75)*o;r.put(new Xi(.06+c%4*.045,1),a.m.rock,Math.cos(l)*d,.3,Math.sin(l)*d*.9,c,c*2,0,1.3,.7,1)}}function R_(t,n,e,o,s=1){const{f:i}=t,a=i.child(n,.3,e,o),r=c=>c*s;a.put(new Ye(r(1.6),r(.5),r(1)),Pn,0,r(.6),0),a.box(Mt,r(1.5),r(.08),r(.9),0,r(.88),0,.02);for(const c of[-1,1]){a.box(Qa,r(1.3),r(.05),r(.8),0,r(.95),c*r(.95),.01,c*.5);for(let l=1;l<4;l++)a.box(Mt,r(1.3),r(.02),r(.015),0,r(.98)+c*.03,c*r(.95)+c*(l-2)*r(.16),.004,c*.5)}for(const c of[-.6,0,.6])for(const l of[-.62,.62])a.put(new we(r(.26),r(.26),r(.2),20),mt,r(c),r(.28),r(l),Math.PI/2),a.put(new he(r(.26),r(.03),6,20),Mt,r(c),r(.28),r(l)+(l>0?.1:-.1)*s),a.strut(Mt,[r(c),r(.28),r(l)],[r(c*.6),r(.5),r(l*.5)],.02*s,5);a.cyl(Mt,r(.03),r(.04),r(1),r(.5),r(1.1),0,8),a.box(Pn,r(.4),r(.26),r(.3),r(.5),r(2.05),0,.03),a.put(new we(r(.06),r(.06),r(.08),12),mt,r(.5),r(2.18),r(.17),Math.PI/2),a.put(new Se(r(.28),20,8,0,Math.PI*2,0,Math.PI/3),Pn,r(-.5),r(1.5),0,-.9),a.strut(Mt,[r(-.5),r(.9),0],[r(-.5),r(1.4),0],.025*s,6)}function vu(t,n,e,o,s=0,i=-.25){const{f:a,k:r}=t,c=a.child(n,0,e,s);c.box(mt,o,.75,.9,0,0,0,.03),c.box(Mt,o,.06,1,0,.75,0,.015),c.box(mt,o,.5,.5,0,.78,-.2,.03,i);const l=[5959864,15775834,14701917,5943536];for(let d=0;d<Math.floor(o/.22);d++)c.cyl(yn(l[d%4],.4,.2,{emissive:l[d%4],emissiveIntensity:d%3===0?.6:.15}),.035,.035,.03,-o/2+.22+d*.22,.84,.06,10);for(let d=0;d<4;d++)c.box(r.p.plasticDark,.16,.02,.1,-o/2+.4+d*(o-.8)/3,.79,.28,.005)}function xu(t,n,e,o,s,i,a,r=0){const{f:c,k:l}=t;c.child(e,o-a/2-.08,s,r).box(l.p.plasticDark,i+.12,a+.12,.08,0,0,0,.03),dn(t.ctx,n,e,o,s+.05,i,a,r)}const P_=t=>{const n=Ae(t),{f:e,k:o}=n;I0(n,0,.2,4.3,3),R_(n,-.8,-.3,.35,1.5);for(let s=0;s<14;s++){const i=s/13;for(const a of[-.5,.5])e.box(Na,.3,.02,.18,-3+i*2,.3,1.2+i*-1+a,.005,0,-.45)}for(let s=0;s<6;s++)e.box(Na,.16,.02,.3,1+s*.28,.3,1.9-s*.12+(s%2?.1:-.1),.01);e.cyl(o.m.steel,.02,.025,2.4,2.6,.3,-.8,8),e.box(o.p.fabricRed,.9,.55,.02,3.05,2,-.8,.004),Ne(t,t.glow,-.8,4.2,-.3,.24),Ne(t,t.edge,.2,2.9,.1,.1),ce(t,{shirt:15331056,trousers:15331056,hair:2825494,helmet:!0,pose:"point",backpack:14212576},1.9,.3,1.3,-.6),te(o,e.child(-4.8,0,2.2)),te(o,e.child(4.8,0,2.2)),Re(n,"scene-lunar-probe")},C_=t=>{const n=Ae(t),{f:e,k:o}=n,s=gu(),i=mu(),a=(d,f,u,h)=>{const p=e.child(d,0,-.6);p.cyl(Mt,.7,.8,.3,0,0,0,24),p.cyl(mt,.1,.12,.9,0,.3,0,12);const x=new V(new Se(u*Ee,36,24),f?new ge({map:f,roughness:.7}):h),[m,g]=Et(d,-.6);x.position.set(m,Je+(1.2+u)*Ee,g),x.castShadow=!0,x.userData.isLandscapeStage=!0,t.root.add(x),p.put(new he(u*1.2,.03,6,40,Math.PI*1.7),o.m.brass,0,1.2+u,0,.6,0,.4)};a(-3.4,s,1,Pn),a(3.4,i,.75,Mt);const r=e.child(0,0,-1.2);r.cyl(Mt,.5,.6,.3,0,0,0,20),r.cyl(Pn,.28,.34,1.5,0,.3,0,20),r.box(Pn,.7,.5,.7,0,1.8,0,.06);for(const d of[-1,1]){r.box(Qa,1.5,.05,.9,d*1.35,2,0,.01,0,0,d*.08);for(let f=1;f<5;f++)r.box(Mt,.015,.06,.9,d*(.6+f*.3),2,0,.003);r.put(new Se(.5,24,10,0,Math.PI*2,0,Math.PI/3),Pn,d*.62,2.7,.15,-1.1,0,d*.4),r.strut(Mt,[d*.4,2,0],[d*.62,2.6,.2],.02,5)}const c=[[-3.4,2.6],[-1.6,4],[0,4.3],[1.6,3.8],[3.4,2.5]].map(([d,f])=>new X(Et(d,-.9)[0],Je+f*Ee,Et(d,-.9)[1])),l=new V(new Zn(new Vn(c),40,.04*Ee,6,!1),t.glow);l.userData.isLandscapeRoute=!0,t.root.add(l),Ne(t,t.edge,0,4.7,-1.2,.18),vu(n,0,1.6,3.2,Math.PI),ce(t,{shirt:4811890,hair:2825494,glasses:!0,seated:!0,pose:"write"},0,.45,2.5,0),sn(o,e.child(0,0,2.5,0),Mt),te(o,e.child(-4.8,0,2)),te(o,e.child(4.8,0,2)),Re(n,"scene-relay-bridge")},D_=t=>{const n=Ae(t),{f:e,k:o}=n,{m:s,p:i}=o;e.cyl(i.fabricGrey,3.7,3.7,.04,0,0,0,40),e.box(Pn,7,.85,1.4,0,0,-.8,.04),e.box(mt,7.1,.06,1.5,0,.85,-.8,.015);for(let l=0;l<6;l++)e.box(Mt,1,.7,.03,-2.9+l*1.16,.08,-.08,.008);[-2.4,0,2.4].forEach((l,d)=>{const f=e.child(l,.91,-.8);f.cyl(mt,.5,.55,.12,0,0,0,24),f.put(new Xi(.3+d%2*.06,1),d===1?yn(8023904,.9):s.rock,0,.42,0,d,d*2,0,1.1,.75,.9),f.put(new we(.62,.62,1,28,1,!0),s.glass,0,.62,0),f.cyl(Mt,.64,.64,.04,0,1.12,0,28),f.box(s.brass,.3,.1,.02,0,.12,.54,.004)});const a=e.child(3.2,.91,-.3,-.3);a.box(mt,.5,.06,.4,0,0,0,.02),a.strut(Mt,[0,.06,-.12],[0,.7,-.12],.045,8),a.put(new we(.06,.06,.6,14),Mt,0,.56,0,.5),a.put(new we(.04,.05,.14,12),mt,0,.88,-.14,.5),a.cyl(mt,.1,.1,.04,0,.22,.08,16);const r=e.child(-3.3,.91,-.4);r.cyl(Pn,.3,.34,.3,0,0,0,20),r.cyl(mt,.28,.28,.04,0,.3,0,20);for(let l=0;l<8;l++)r.cyl(yn(10205388,.3,.1,{transparent:!0,opacity:.8}),.02,.02,.1,-.6+l*.09,0,.35,8);const c=e.child(0,0,-2.5);Ya(o,c.child(0,1.2,0),3.4,1.4,i.boardWhite);for(let l=0;l<3;l++)c.box(s.slate,2.2-l*.4,.05,.02,-.4,2.2-l*.35,.07,.004);c.box(mt,.1,2.6,.1,-1.9,0,0,.01),c.box(mt,.1,2.6,.1,1.9,0,0,.01),ce(t,{shirt:15856885,trousers:5857386,hair:2825494,glasses:!0,pose:"write"},-.8,0,.9,.2),Ne(t,t.glow,0,3.2,-.8,.16),te(o,e.child(-4.8,0,1.6)),te(o,e.child(4.8,0,1.6)),Re(n,"scene-sample-lab")},I_=t=>{const n=Ae(t),{f:e,k:o}=n,{m:s}=o;I0(n,0,-2.2,3.8,5),e.put(new Se(7,40,16,0,Math.PI*2,0,Math.PI/6),pu,0,-6.6,-4.2);const i=new V(new Se(1.1*Ee,28,20),new ge({map:gu(),roughness:.8})),[a,r]=Et(-1,-4.2);i.position.set(a,Je+3.8*Ee,r),i.userData.isLandscapeBeacon=!0,t.root.add(i);const c=new V(new Ye(11*Ee,.12*Ee,.1),La(16767120,1)),[l,d]=Et(0,-4);c.position.set(l,Je+.9*Ee,d),c.userData.noLandscapeShadow=!0,t.root.add(c),e.box(mt,6.4,.3,2.2,0,0,1.2,.05),e.box(Mt,6.2,.04,2,0,.3,1.2,.02),ds(o,e.child(-3.1,.34,.3,0),6.2,.95,s.steel);const f=e.child(1.6,.34,1,-.3);f.cyl(mt,.06,.1,1,0,0,0,10),f.put(new we(.12,.15,.9,18),Pn,.1,1.15,-.2,1.2),ce(t,{shirt:15331056,trousers:15331056,hair:2825494,helmet:!0,pose:"point"},-.9,.34,1.2,.1),ce(t,{shirt:15331056,trousers:15331056,hair:5592405,helmet:!0,pose:"listen"},.5,.34,1.5,-.3),Ne(t,t.edge,0,4.9,.4,.2),te(o,e.child(-4.7,0,2.2)),te(o,e.child(4.7,0,2.2)),Re(n,"scene-moon-horizon")},L_=t=>{const n=Ae(t),{f:e,k:o}=n,{m:s,p:i}=o;e.cyl(i.fabricGrey,3.7,3.7,.04,0,0,0,40),vu(n,0,.4,5.8,Math.PI),[-1.9,0,1.9].forEach((r,c)=>xu(n,Vi(c*2.1+1),r,2.7,-.4,1.7,1.1));for(const r of[-1.9,0,1.9])e.box(mt,.1,1.5,.1,r,.8,-.5,.01);const a=e.child(0,0,-2.4);a.box(mt,2.6,.2,1.6,0,0,0,.04);for(const r of[-1,1])a.box(Mt,.2,2.2,.2,r*1,.2,0,.03);a.put(new we(.35,.8,1.3,28,1,!0),yn(12093244,.35,.8),0,1.4,0,0,0,0,1,-1,1),a.cyl(Mt,.4,.4,.7,0,1.9,0,24),a.put(new he(.62,.03,6,28),s.copper,0,1.2,0,Math.PI/2),a.strut(s.copper,[.5,2,0],[1,.6,.4],.04,6),a.strut(s.steel,[-.5,2,0],[-1,.6,.4],.04,6);for(let r=0;r<7;r++)Ne(t,r%3===0?t.edge:t.glow,-2.6+r*.87,1.25,.1,.08);sn(o,e.child(0,0,1.7,0),Mt),ce(t,{shirt:4811890,hair:2825494,glasses:!0,seated:!0,pose:"write",lean:.1},0,.45,1.7,Math.PI),te(o,e.child(-4.8,0,1.6)),te(o,e.child(4.8,0,1.6)),Re(n,"scene-test-console")},N_=t=>{const n=Ae(t),{f:e,k:o}=n;e.cyl(mt,3,3.2,.3,0,0,-.2,40),e.cyl(Mt,.5,.7,.8,0,.3,-.2,20);const s=new V(new Se(1.2*Ee,40,28),new ge({map:mu(),roughness:.95})),[i,a]=Et(0,-.2);s.position.set(i,Je+2.6*Ee,a),s.castShadow=!0,s.userData.isLandscapeStage=!0,t.root.add(s);for(const[l,d,f]of[[.2,0,2.4],[.78,.55,2.9],[-.55,-.72,3.3]]){const u=t.ring(f*Ee,Je+2.6*Ee,l);u.rotation.y=d,u.position.set(i,Je+2.6*Ee,a),u.scale.setScalar(.5)}const r=(l,d,f,u)=>{const h=e.child(l,d,f,u);h.box(Mt,.4,.3,.3,0,0,0,.03);for(const p of[-1,1])h.box(Qa,.7,.03,.34,p*.62,.15,0,.008);h.put(new Se(.14,14,6,0,Math.PI*2,0,Math.PI/2.4),Pn,0,.3,0,-.4),Ne(t,t.edge,l,d+.35,f,.06)};r(2.4,4.2,.2,.3),r(-1.8,5,.1,-.5),r(-2.2,1.8,-.5,.8);const c=e.child(-3.8,0,1.6,.4);c.cyl(mt,.06,.08,1.1,0,0,0,10),c.box(o.p.plasticDark,.8,.5,.05,0,1.1,0,.03,-.35),c.put(new Qe(.7,.4),o.p.screenOn,0,1.3,.03,-.35),ce(t,{shirt:15331056,trousers:5857386,hair:2825494,glasses:!0,pose:"point"},-2.6,0,1.8,.3),te(o,e.child(-4.9,0,0)),te(o,e.child(4.9,0,0)),Re(n,"scene-orbit-adjustment")},k_=t=>{const n=Ae(t),{f:e,k:o}=n;e.cyl(o.p.fabricGrey,3.7,3.7,.04,0,0,0,40),[-3,0,3].forEach((r,c)=>{e.box(mt,.12,1.7,.12,r,0,-1.6,.01),e.box(Mt,1.4,.1,.6,r,0,-1.6,.02),xu(n,Vi(c*1.7+3,c===1?"#f0b85a":"#7ef0d4"),r,3,-1.6,2.3,1.5,(1-c)*.12)}),gn(o,e.child(0,0,.8),4.2,.9,.75,yn(2764854,.5,.3));for(const r of[-1.2,0,1.2])e.box(o.p.plasticDark,.5,.02,.18,r,.75,.9,.006),e.box(o.p.plasticDark,.07,.03,.11,r+.38,.75,.9,.012);const[s,i]=Et(0,-.2),a=new V(new Ns(.5*Ee,2),t.glow);a.position.set(s,Je+2.1*Ee,i),a.userData.isLandscapeBeacon=!0,t.root.add(a);for(const r of[.8,1.1]){const c=t.ring(r*Ee,Je+2.1*Ee,Math.PI/2+r*.4);c.position.set(s,Je+2.1*Ee,i),c.scale.setScalar(.3)}e.cyl(mt,.5,.6,.8,0,0,-.2,20),sn(o,e.child(0,0,1.9,0),Mt),ce(t,{shirt:6982312,hair:2825494,glasses:!0,seated:!0,pose:"write",lean:.12},0,.45,1.9,Math.PI),te(o,e.child(-4.8,0,1.6)),te(o,e.child(4.8,0,1.6)),Re(n,"scene-systems-simulation")},U_=t=>{const n=Ae(t),{f:e,k:o}=n,{m:s}=o;e.cyl(o.p.fabricGrey,3.7,3.7,.04,0,0,0,40),e.box(mt,6.8,.2,.7,0,0,-2.6,.03),e.box(mt,6.6,3.2,.15,0,.2,-2.6,.04),[-2.6,-1.3,0,1.3,2.6].forEach((a,r)=>dn(t,Vi(r*1.3+2,r%2?"#f0b85a":"#7ef0d4"),a,2.35,-2.5,1.18,.9));const i=wo([{text:"T-00:42:17",y:160,font:"bold 110px 'Courier New', monospace",color:"#ff9a6a"}],{width:720,height:320,background:"#140d0a",border:"#7a3a28"});dn(t,i,0,1.15,-2.5,3.3,.95),[[.9,0],[-.1,.25],[-1.1,.5]].forEach(([a,r],c)=>{for(const l of[-2.2,0,2.2]){const d=e.child(l,r,a,0);d.box(mt,1.9,.7,.8,0,0,0,.03),d.box(Mt,1.9,.05,.85,0,.7,0,.012),d.box(mt,1.2,.5,.06,0,.74,-.25,.02,-.12),d.put(new Qe(1.1,.42),c===1&&l===0?La(2781066,.6):La(2051935,.5),0,.99,-.215,-.12)}c<2&&e.box(s.stoneDark,7.2,.25,.7,0,0,a-.5,.02)});for(const[a,r]of[[-2.2,0],[0,1],[2.2,2]]){const c=[.9,-.1,-1.1][r]+.8,l=[0,.25,.5][r];sn(o,e.child(a,l,c,Math.PI),Mt),ce(t,{shirt:[4811890,6982312,8214333][r],hair:2825494,seated:!0,pose:"write"},a,l+.45,c,Math.PI)}ce(t,{shirt:15856885,trousers:5857386,hair:5592405,glasses:!0,pose:"point"},3.6,0,1.8,-.5),Ne(t,t.glow,0,4.3,-2.2,.24),te(o,e.child(-4.8,0,2.2)),te(o,e.child(4.8,0,2.2)),Re(n,"scene-mission-control")},F_=t=>{const n=Ae(t),{f:e,k:o}=n,{m:s,p:i}=o;e.cyl(i.fabricGrey,3.7,3.7,.04,0,0,0,40);const a=e.child(0,0,-2.4);a.box(mt,4.2,.2,.7,0,0,0,.03),a.put(new he(1.6,.18,12,40),Mt,0,2.3,0),a.put(new we(1.4,1.4,.12,40),yn(2897469,.5,.5),0,2.3,-.02,Math.PI/2);for(let l=0;l<8;l++){const d=l/8*Math.PI*2;a.cyl(s.brass,.06,.06,.08,Math.cos(d)*1.28,2.3+Math.sin(d)*1.28-.04,.07,10)}a.put(new he(.4,.06,8,24),s.brass,0,2.3,.08);const r=e.child(-3.6,0,-1.2,.3);Ya(o,r.child(0,.5,0),1.8,1.8,i.boardWhite);for(let l=0;l<5;l++)r.box(s.slate,1.2,.05,.02,0,2-l*.28,.07,.004),r.cyl(l<3?s.leaf:s.stoneDark,.06,.06,.012,-.8,2-l*.28,.07,10);const c=e.child(.6,0,.6,0);c.box(mt,1,.25,2.4,0,0,0,.05),c.box(yn(3159611,.8),.8,.03,2.2,0,.25,0,.01),c.box(mt,.08,1.5,.08,-.5,.25,-1.1,.01),c.box(mt,.08,1.5,.08,.5,.25,-1.1,.01),c.box(mt,1.2,.08,.08,0,1.75,-1.1,.01),c.box(i.fabricRed,.6,.08,.04,0,1.2,-1.1,.01),ce(t,{shirt:15331056,trousers:15331056,hair:2825494,helmet:!0,pose:"walk",backpack:14212576},.6,.26,.6,Math.PI/2+Math.PI/2*0),ce(t,{shirt:3891087,hair:5592405,glasses:!0,pose:"read"},2.6,0,1.2,-.5),Ne(t,t.edge,0,4.8,-2.3,.22),t.ring(3*Ee,Je+.12,Math.PI/2),te(o,e.child(-4.8,0,1.8)),te(o,e.child(4.8,0,1.8)),Re(n,"scene-training")},O_=t=>{const n=Ae(t),{f:e,k:o}=n,{m:s,p:i}=o;e.cyl(i.fabricGrey,3.7,3.7,.04,0,0,0,40);const a=(c,l)=>{const d=e.child(c,0,-1.4,l);d.box(mt,2.4,.3,2,0,0,0,.05),d.put(new l0(.95,1.5,12,28),Pn,0,1.6,0,0,0,Math.PI/2*0,1,1.3,1),d.put(new we(.34,.34,.12,28),s.glass,0,1.75,.92,Math.PI/2),d.put(new he(.34,.06,8,28),Mt,0,1.75,.95),d.put(new he(.62,.05,8,32),s.brass,0,1,.9),d.box(mt,.8,.08,.5,0,.3,1,.02);for(let f=0;f<6;f++)d.cyl(f%2?s.brass:Mt,.04,.04,.04,-.4+f*.16,.9,.96,8)};a(-2.6,.2),a(2.6,-.2);const r=e.child(0,0,.5);r.cyl(mt,.04,.05,1.2,0,0,0,8),r.box(o.p.plasticDark,.7,.9,.05,0,1.15,0,.03),r.put(new Qe(.6,.8),Vi(8)?new Tt({map:Vi(8),toneMapped:!1}):o.p.screenOn,0,1.6,.03),ce(t,{shirt:15331056,trousers:15331056,hair:2825494,helmet:!0,pose:"talk",backpack:14212576},-1,0,1.5,.5),ce(t,{shirt:15331056,trousers:15331056,hair:5592405,helmet:!0,pose:"listen",backpack:14212576},1,0,1.5,-.5),Ne(t,t.glow,0,4.4,-.2,.26),te(o,e.child(-4.8,0,1.8)),te(o,e.child(4.8,0,1.8)),Re(n,"scene-crew-simulation")},z_=t=>{const n=Ae(t),{f:e,k:o}=n,{m:s,p:i}=o;e.cyl(i.fabricGrey,3.7,3.7,.04,0,0,0,40),e.cyl(mt,2,2.2,.35,0,0,-.4,36),e.cyl(Mt,.3,.4,.5,0,.35,-.4,16);const[a,r]=Et(0,-.4),c=new V(new Se(.42*Ee,28,20),La(16761178,1));c.position.set(a,Je+1.7*Ee,r),c.userData.isLandscapeBeacon=!0,t.root.add(c);const l=[[1,.12,11576720,.4],[1.6,.18,3899332,1.9],[2.3,.3,13672544,3.4],[3,.22,13199946,5]];for(const[d,f,u,h]of l){e.put(new he(d,.012,6,56),s.brass,0,1.7,-.4,Math.PI/2);const p=Math.cos(h)*d,x=-.4+Math.sin(h)*d*.9;e.strut(Mt,[p,1.7,x],[p*.6,.4,-.4+(x+.4)*.6],.012,4),e.put(new Se(f,18,12),yn(u,.6),p,1.7,x)}e.put(new he(.45,.025,6,30),yn(14207392,.5),Math.cos(3.4)*2.3,1.7,-.4+Math.sin(3.4)*2.3*.9,Math.PI/2-.4);for(const d of[-1,1]){const f=e.child(d*3.6,0,.8,-d*.5);f.box(s.stoneDark,.8,.14,.5,0,0,0,.03),f.cyl(mt,.04,.05,.9,0,.14,0,8),f.box(mt,1,.7,.05,0,.95,0,.03,-.3),f.box(i.boardWhite,.9,.6,.012,0,.99,.03,.004,-.3)}ce(t,{shirt:8214333,hair:2825494,hairStyle:"bun",pose:"point"},-1.2,0,2,.3),ce(t,{shirt:6982312,hair:5592405,backpack:13081146,pose:"read",scale:1},1.4,0,2.2,-.3),on(o,e.child(0,0,3.4,Math.PI),1.8),te(o,e.child(-4.8,0,1.2)),te(o,e.child(4.8,0,1.2)),Re(n,"scene-science-exhibit")},B_=t=>{const n=Ae(t),{f:e,k:o}=n,{m:s}=o;I0(n,0,0,4.4,9);const i=e.child(0,.3,-.6);i.cyl(Pn,2.7,2.8,.4,0,0,0,40),i.put(new Se(2.5,40,20,0,Math.PI*2,0,Math.PI/2),yn(10475752,.12,.2,{transparent:!0,opacity:.38,emissive:2781066,emissiveIntensity:.25}),0,.4,0);for(let a=0;a<10;a++){const r=a/10*Math.PI,c=[];for(let f=0;f<=12;f++){const u=f/12*(Math.PI/2);c.push([Math.cos(r)*Math.cos(u)*2.52,.4+Math.sin(u)*2.52,Math.sin(r)*Math.cos(u)*2.52])}for(let f=0;f<12;f++)i.strut(Pn,c[f],c[f+1],.03,5);const l=a/10*Math.PI+Math.PI,d=[];for(let f=0;f<=12;f++){const u=f/12*(Math.PI/2);d.push([Math.cos(l)*Math.cos(u)*2.52,.4+Math.sin(u)*2.52,Math.sin(l)*Math.cos(u)*2.52])}for(let f=0;f<12;f++)i.strut(Pn,d[f],d[f+1],.03,5)}i.put(new he(2.5,.06,8,40),Pn,0,.42,0,Math.PI/2),i.box(mt,.9,1.3,.1,0,.4,2.45,.03);for(const a of[-1,1]){const r=e.child(a*3.9,.3,.2,-a*.2);for(let c=0;c<2;c++){r.box(Qa,1.6,.06,1.1,0,.95+c*.08,-.6+c*1.2,.01,-.45);for(let l=1;l<4;l++)r.box(Mt,1.6,.012,.016,0,.99+c*.08,-.6+c*1.2,.002,-.45)}r.box(Mt,.1,1,.1,-.6,0,0,.01),r.box(Mt,.1,1,.1,.6,0,0,.01)}for(let a=0;a<10;a++){const r=a/10*Math.PI*2;Ne(t,a%2?t.edge:t.glow,Math.cos(r)*3.6,.5,1+Math.sin(r)*3,.07)}Ne(t,t.glow,0,4.6,-.6,.3),ce(t,{shirt:15331056,trousers:15331056,hair:2825494,helmet:!0,pose:"point",backpack:14212576},-.8,.3,2.2,.2),te(o,e.child(-4.8,0,2.4)),te(o,e.child(4.8,0,2.4)),Re(n,"scene-future-frontier")},G_={"lunar-probe":P_,"relay-bridge":C_,"sample-lab":D_,"moon-horizon":I_,"test-console":L_,"orbit-adjustment":N_,"systems-simulation":k_,"mission-control":U_,training:F_,"crew-simulation":O_,"science-exhibit":z_,"future-frontier":B_},ui=(t,n=.85,e=.02,o={})=>{const s=new ge({color:t,roughness:n,metalness:e,...o});return s.fog=!1,s};function No(t,n,e,o,s,i,a,r,c=0){ou(t.k,t.f.child(n,e,o,c),s,i,a,r)}function H_(){const t=document.createElement("canvas");t.width=1e3,t.height=600;const n=t.getContext("2d");if(!n)return;n.fillStyle="#f3efe2",n.fillRect(0,0,1e3,600),n.strokeStyle="rgba(60,80,70,0.25)",n.lineWidth=2;for(let o=0;o<6;o++)n.beginPath(),n.moveTo(80,120+o*80),n.lineTo(940,120+o*80),n.stroke();n.fillStyle="#24483f",n.font="bold 54px Arial, sans-serif",n.fillText("COMMUNITY BUDGET",80,74),n.font="bold 30px Arial, sans-serif",n.fillStyle="#4a6a60",n.fillText("BOOKS",190,575),n.fillText("TOOLS",470,575),n.fillText("SHARED",740,575);const e=new Zt(t);return e.colorSpace=yt,e.anisotropy=4,e}function V_(){const t=document.createElement("canvas");t.width=900,t.height=700;const n=t.getContext("2d");if(!n)return;n.fillStyle="#12232c",n.fillRect(0,0,900,700),n.fillStyle="#7ef0d4",n.font="bold 44px Arial, sans-serif",n.fillText("DIGITAL LENDING",40,70);const e=["#b83b32","#2f5d8a","#c79a3a","#3f7a4f","#6a4a8a","#e8dec6"];for(let s=0;s<3;s++)for(let i=0;i<5;i++){const a=40+i*168,r=110+s*190;n.fillStyle=e[(s*5+i)%e.length],n.fillRect(a,r,140,170),n.fillStyle="rgba(255,255,255,0.8)",n.fillRect(a+14,r+20,112,10),n.fillRect(a+14,r+44,80,8)}n.fillStyle="#7ef0d4",n.fillRect(40,660,300,14);const o=new Zt(t);return o.colorSpace=yt,o.anisotropy=4,o}const W_=t=>{const n=Ae(t),{k:e,f:o}=n,{m:s,p:i}=e,a=o.child(0,0,-1.8,0),r=ui(4090718,.85);a.box(s.stoneDark,7.4,.3,2.8,0,0,0,.03),a.box(r,7.2,3.4,2.6,0,.3,0,.04),a.box(s.woodDark,7.4,.4,2.8,0,3.7,0,.03),a.put(ao(7.6,.9,2.9),s.slate,0,4.1,0);for(const f of[-1,1]){P0(e,a.child(f*2.3,.78,1.32),2.3,1.9,{cols:3,rows:2,lit:!0,frame:s.woodDark});for(let u=0;u<3;u++){a.box(s.wood,2.2,.04,.12,f*2.3,1+u*.6,1.31,.008);for(let h=0;h<14;h++)a.box(i.books[(h+u*3+(f>0?5:0))%i.books.length],.07,.2+(h*7+u)%4*.03,.1,f*2.3-1+h*.15,1.04+u*.6,1.31,.004)}}a.box(s.woodDark,1.4,2.5,.1,0,.3,1.32,.02),a.box(s.wood,1.2,2.3,.07,0,.35,1.36,.015),a.put(new Qe(.7,1.2),s.glass,0,1.7,1.41),a.box(s.brass,.06,.06,.05,.4,1.3,1.42,.01),$a(e,a.child(0,.4,1.35,0),6.8,1.2,12,i.fabricGreen,i.fabricCream);const c=wo([{text:"BOOK EXCHANGE",y:78,font:"bold 70px Arial, sans-serif",color:"#fff4dc"},{text:"LEAVE ONE  ·  TAKE ONE",y:150,font:"bold 32px Arial, sans-serif",color:"#fff4dc"}],{width:1024,height:192,background:"#24483f",border:"#d9b77a"});dn(t,c,0,3.5,-1.8+1.5,5.4,1),Ne(t,t.glow,-3.3,4.2,-.2,.14),P4(e,o.child(-3.3,0,.9,.3),3),gn(e,o.child(3.2,0,.9,-.2),1.6,.7,.8,s.wood),Xn(e,o.child(2.8,.8,.9,.2),5,4),Sn(e,o.child(3.5,.8,.85,-.3));const l=o.child(1.9,0,2,-.35);l.box(s.woodDark,.8,1.1,.06,0,0,0,.015,-.12),l.box(i.boardGreen,.7,.95,.02,0,.07,.04,.005,-.12),ce(t,{shirt:13081146,hair:5592405,glasses:!0,pose:"talk",scarf:4160079},.9,0,1.4,-.2),ce(t,{shirt:6982312,hair:2825494,backpack:11553344,pose:"read"},-1.2,0,1.8,.3);const d=new ro(16768160,1.8,16,2);d.position.set(..._a(0,2.2,.4)),t.root.add(d),te(e,o.child(-4.9,0,2.2)),te(e,o.child(4.9,0,2.2)),dt(e,o.child(-1.9,0,3),.5,51),Re(n,"scene-bookshop")},X_=t=>{const n=Ae(t),{k:e,f:o}=n,{m:s,p:i}=e;o.cyl(i.fabricGrey,3.7,3.7,.04,0,0,0,40),o.cyl(i.fabricCream,3.2,3.2,.05,0,0,0,40),No(n,-3.5,0,-.9,2.6,3.4,7,11,.5),No(n,3.5,0,-.9,2.6,3.4,7,17,-.5),No(n,0,0,-2.5,3.2,3,6,23,0),ja(e,o.child(1.6,0,-2.2,0),2.6),gn(e,o.child(0,0,.4),3,.9,.78,s.wood),Xn(e,o.child(-.8,.78,.4,.2),6,8),Xn(e,o.child(.7,.78,.45,-.3),4,9),Sn(e,o.child(0,.78,.6,.1));const a=wo([{text:"SWAP A BOOK",y:100,font:"bold 70px Arial, sans-serif"}],{width:720,height:220,background:"#3a2d20"});dn(t,a,0,1.25,.95,1.2,.36,0,-.25),ce(t,{shirt:6982312,hair:2825494,pose:"talk",backpack:13081146},-1.5,0,1.4,.5),ce(t,{shirt:12681576,hair:5592405,hairStyle:"bun",pose:"listen"},1.5,0,1.4,-.5);for(const r of[-2.2,0,2.2])Ne(t,t.glow,r,4,.2,.14);te(e,o.child(-4.8,0,1.8)),te(e,o.child(4.8,0,1.8)),Re(n,"scene-exchange")},K_=t=>{const n=Ae(t),{k:e,f:o}=n,{m:s,p:i}=e;o.cyl(s.stoneWarm,3.7,3.8,.05,0,0,0,40);const a=o.child(0,0,-2.4,0);for(const r of[-1,1])a.box(s.stoneDark,1.2,.35,1.2,r*3.4,0,0,.05),a.box(s.stone,.95,3.6,.95,r*3.4,.35,0,.06);a.put(qo(3.9,3,1,.06),s.stone,0,3.95,0),a.box(s.stoneDark,.9,.8,1.1,0,7,0,.05),[-3,-1,1,3].forEach((r,c)=>{us(e,o.child(r,0,0,(c-1.5)*.12),1.7,2,1.5,c%2?s.terracottaRoof:s.slate,i.fabricCream),te(e,o.child(r,0,1.1),2),Ne(t,c%2?t.edge:t.glow,r,3.5,0,.2)});for(let r=0;r<12;r++)o.box(r%2?s.paveA:s.paveB,.8,.045,.5,(r-5.5)*.12,0,2.6-r*.28-0,.015);ce(t,{shirt:7973541,hair:2825494,backpack:13081146,pose:"walk"},-.6,0,2.6,.2),ce(t,{shirt:12163964,hair:5592405,scarf:11553344,pose:"talk"},.6,0,2.4,-.3),dt(e,o.child(-4.6,0,2.2),.5,53),dt(e,o.child(4.6,0,2.2),.5,55),Re(n,"scene-resilience")},q_=t=>{const n=Ae(t),{k:e,f:o}=n,{m:s,p:i}=e;o.cyl(i.fabricGrey,3.7,3.7,.04,0,0,0,40);const a=o.child(0,0,-2.4,0);a.box(s.stoneDark,6.4,.2,.8,0,0,0,.03);for(const c of[-1,1])a.box(s.woodDark,.18,4.2,.22,c*3,.2,0,.02);a.box(s.woodDark,6.4,.2,.3,0,4.2,0,.02),a.box(s.woodDark,5.9,3.7,.1,0,.45,0,.02),dn(t,H_(),0,.45+1.85,-2.4+.07,5.6,3.4);const r=[1,1.7,2.5];[-1.7,.1,1.9].forEach((c,l)=>{const d=[s.copper,s.brass,s.leaf][l];a.box(d,.95,r[l],.22,c,.85,.14,.03),a.box(s.paper,.6,.06,.02,c,.85+r[l]-.15,.26,.004)}),Ne(t,t.glow,1.9,.85+2.5+.35,-2.2,.2);for(let c=0;c<5;c++){const l=o.child(3+c%2*.45,0,.6+Math.floor(c/2)*.45);for(let d=0;d<3+c;d++)l.cyl(s.brass,.17,.17,.04,0,d*.045,0,18)}gn(e,o.child(-2.6,0,.8,.2),1.6,.7,.8,s.wood),Sn(e,o.child(-2.6,.8,.8,.2)),ko(e,o.child(-2.1,.8,.8)),ce(t,{shirt:4811890,hair:2825494,glasses:!0,pose:"point"},0,0,1.4,0),te(e,o.child(-4.8,0,1.4)),te(e,o.child(4.8,0,1.4)),Re(n,"scene-budget-board")},Y_=t=>{const n=Ae(t),{k:e,f:o}=n,{m:s,p:i}=e;o.cyl(i.fabricGrey,3.7,3.7,.04,0,0,0,40);const a=o.child(0,0,-2.3,0);a.box(s.woodDark,7.4,.25,.9,0,0,0,.03),a.box(s.woodDark,7.4,4,.12,0,.25,-.35,.02);for(const c of[-1,1])a.box(s.woodDark,.16,4,.7,c*3.6,.25,0,.02);a.box(s.woodDark,7.4,.18,.74,0,4.25,0,.02);for(let c=0;c<=4;c++)a.box(s.wood,7.1,.06,.66,0,.3+c*.95,0,.012);for(let c=1;c<7;c++)a.box(s.wood,.05,3.8,.66,-3.55+c*1.015,.3,0,.01);const r=c=>(Math.sin(c*12.9898)*43758.5453%1+1)%1;for(let c=0;c<4;c++)for(let l=0;l<7;l++){const d=-3.55+l*1.015+.55;let f=d-.42,u=0;for(;f<d+.4;){const h=.05+r(c*77+l*13+u)*.05;a.box(i.books[Math.floor(r(c*31+l*7+u*5)*i.books.length)],h,.4+r(c*5+l*11+u)*.35,.34,f+h/2,.36+c*.95,-.05,.004),f+=h+.003,u++}}ja(e,o.child(-1,0,-1.7,0),3.2),ce(t,{shirt:12681576,hair:2825494,hairStyle:"long",pose:"read"},-1,1.4,-1.55,0),sn(e,o.child(2.3,0,.6,Math.PI*.8),s.woodDark),hs(e,o.child(3.2,0,.3),.42,.55),ko(e,o.child(3.2,.55,.3)),ce(t,{shirt:6982312,hair:5592405,seated:!0,pose:"read",glasses:!0},2.3,.45,.6,Math.PI*.8),Xn(e,o.child(.6,0,1,.3),5,6),Ne(t,t.glow,0,5,-1.9,.2),te(e,o.child(-4.8,0,1.4)),te(e,o.child(4.8,0,1.4)),Re(n,"scene-exchange-wall")},$_=t=>{const n=Ae(t),{k:e,f:o}=n,{m:s,p:i}=e;o.cyl(s.stoneWarm,3.7,3.8,.05,0,0,0,40);const a=[[0,-1.8],[2.8,1.3],[-2.8,1.3]];a.forEach(([c,l],d)=>{const f=o.child(c,0,l,0);if(f.cyl(s.stoneDark,1,1.1,.35,0,0,0,24),f.cyl(s.stone,.85,.9,.3,0,.35,0,24),d===0)Xn(e,f.child(-.25,.65,0,.3),5,3),Sn(e,f.child(.3,.65,.1,-.2));else if(d===1)for(let u=0;u<5;u++){const h=u*1.3;f.cyl(s.soil,.12,.1,.12,Math.cos(h)*.4,.65,Math.sin(h)*.4,10),f.cyl(s.leaf,.02,.02,.28,Math.cos(h)*.4,.77,Math.sin(h)*.4,5),f.put(js(401+u,.11,12),po(),Math.cos(h)*.4,1.08,Math.sin(h)*.4,0,h,0,1,.85,1)}else f.box(i.leather,.7,.14,.3,0,.65,0,.02),f.box(s.woodDark,.12,.7,.12,-.1,.79,0,.015,0,0,.6),f.box(s.steel,.4,.2,.2,-.3,1.35,0,.02,0,0,.6),f.put(new he(.2,.06,8,18,Math.PI*1.5),s.steel,.35,.95,0)});const r=(c,l)=>{const d=[(c[0]+l[0])/2*1.35,(c[1]+l[1])/2*1.35-.2],f=new Xd(new X(..._a(c[0]*.65,1.8,c[1]*.65)),new X(..._a(d[0],2.5,d[1])),new X(..._a(l[0]*.65,1.8,l[1]*.65))),u=new V(new Zn(f,30,.06*Ee,6,!1),t.edge);u.userData.isLandscapeRoute=!0,t.root.add(u);const h=f.getPoint(1),p=f.getTangent(1),x=new V(new xt(.18*Ee,.45*Ee,12),t.edge);x.position.copy(h),x.quaternion.setFromUnitVectors(new X(0,1,0),p),t.root.add(x)};r(a[0],a[1]),r(a[1],a[2]),r(a[2],a[0]),Ne(t,t.glow,0,3.6,.2,.3),ce(t,{shirt:7973541,hair:2825494,backpack:13081146,pose:"walk"},.4,0,2.6,.3),te(e,o.child(-4.8,0,2.2)),te(e,o.child(4.8,0,2.2)),Re(n,"scene-resource-cycle")},j_=t=>{const n=Ae(t),{k:e,f:o}=n,{m:s,p:i}=e;o.cyl(i.fabricGrey,3.7,3.7,.04,0,0,0,40),gn(e,o.child(0,0,-.4),6.2,2.2,.82,s.woodDark),o.box(i.fabricGreen,5.8,.02,1.9,0,.82,-.4,.005);const a=o.child(0,.84,-.4,0);a.box(i.leather,4.4,.12,1.7,0,0,0,.04),a.box(s.paper,2,.1,1.55,-1.05,.12,0,.02,0,0,.03),a.box(s.paper,2,.1,1.55,1.05,.12,0,.02,0,0,-.03),a.box(s.stoneDark,.08,.14,1.6,0,.1,0,.01);for(let l=0;l<9;l++)a.box(s.slate,1.8,.008,.012,-1.05,.225,-.65+l*.16,.002),a.box(s.slate,1.8,.008,.012,1.05,.225,-.65+l*.16,.002);for(const l of[-1.7,-1.1,-.5,.5,1.1,1.7])a.box(s.slate,.012,.008,1.4,l,.225,0,.002);a.box(i.fabricRed,.5,.01,.25,1.4,.23,-.5,.003);const r=o.child(2.3,.84,.3,.4);r.strut(i.fabricCream,[0,0,0],[.5,.25,0],.014,5),r.put(new xt(.04,.2,5),i.fabricCream,.55,.28,0,0,0,-1.2);const c=o.child(2.8,.84,-.2);c.cyl(ui(1911629,.2,.2),.1,.12,.14,0,0,0,14),c.cyl(s.brass,.06,.06,.04,0,.14,0,10),o.cyl(i.fabricRed,.1,.1,.02,1.4,.84,.6,14);for(const l of[-1,1]){const d=o.child(l*3.9,0,-.2);d.cyl(s.stoneDark,.5,.6,.4,0,0,0,20),d.cyl(s.stone,.3,.4,.8,0,.4,0,16),d.box(s.brass,.4,.06,.4,0,1.2,0,.01),Ne(t,l<0?t.edge:t.glow,l*3.9,2,-.2,.3)}t.ring(4.6*Ee,Je+.12,Math.PI/2),sn(e,o.child(0,0,1.2,Math.PI),s.woodDark),ce(t,{shirt:4811890,hair:5592405,glasses:!0,seated:!0,pose:"write",lean:.1},0,.45,1.2,Math.PI),te(e,o.child(-4.9,0,1.8)),te(e,o.child(4.9,0,1.8)),Re(n,"scene-trust-ledger")},Z_=t=>{const n=Ae(t),{k:e,f:o}=n,{m:s,p:i}=e;o.cyl(s.stoneWarm,3.7,3.8,.05,0,0,0,40),[-3.3,0,3.3].forEach((r,c)=>{const l=o.child(r,0,-.5,-r*.04);$a(e,l.child(0,0,-1.1,Math.PI),2.6,1.3,8,c===1?i.fabricGreen:i.fabricBlue,i.fabricCream),gn(e,l.child(0,0,.2),2.2,.7,.85,s.wood);for(let d=0;d<3;d++){l.cyl(s.wood,.28,.22,.2,-.7+d*.7,.85,.2,16);for(let f=0;f<6;f++)l.ball(ui([8042056,14240573,15903035][(c+d+f)%3],.6),.08,-.7+d*.7+Math.cos(f*1.1)*.12,1.1,.2+Math.sin(f*1.1)*.1)}Lo(e,l.child(-1.3,0,-.6,.2),.6,.5,.5);for(let d=0;d<3;d++)l.box(i.fabricCream,.22,.34,.04,.2+d*.3,1,.9,.01)});const a=o.child(0,0,-.5);for(const r of[-.9,.9])a.box(ui(1911629,.25,.6),2.4,.06,.9,0,3.15,r,.01,r>0?-.2:.2);Gi(e,o.child(-4.7,0,-.4),.34,.9),Gi(e,o.child(4.7,0,-.4),.34,.9),ce(t,{shirt:6982312,hair:2825494,backpack:13081146,pose:"walk"},-1.6,0,1.8,.4),ce(t,{shirt:12681576,hair:5592405,scarf:4160079,pose:"listen"},1.5,0,1.9,-.4),[-3.3,0,3.3].forEach(r=>Ne(t,t.glow,r,3.9,-.4,.14)),dt(e,o.child(-1.8,0,3),.5,57),dt(e,o.child(1.8,0,3),.5,59),te(e,o.child(-4.9,0,2.2)),te(e,o.child(4.9,0,2.2)),Re(n,"scene-sustainable-market")},Q_=t=>{const n=Ae(t),{k:e,f:o}=n,{m:s,p:i}=e;o.cyl(i.fabricGrey,3.7,3.7,.04,0,0,0,40),o.cyl(i.fabricCream,3.2,3.2,.05,0,0,0,40);const a=o.child(0,0,-2.5,0);a.box(s.stoneDark,8,.3,1,0,0,0,.03),a.box(s.paper,7.8,4.2,.2,0,.3,-.35,.03),a.put(qo(3.9,3.5,.9,.05),s.stone,0,3.8,0),No(n,-2.9,0,-2.2,2.3,3.4,7,31,0),No(n,2.9,0,-2.2,2.3,3.4,7,37,0),No(n,0,0,-2.2,2.3,3.4,7,41,0),ja(e,o.child(1.6,0,-1.9,0),3);for(const r of[-1.8,1.8]){gn(e,o.child(r,0,.5),1.6,.8,.76,s.wood);const c=o.child(r-.4,.76,.5);c.cyl(s.brass,.1,.12,.03,0,0,0,14),c.cyl(s.brass,.012,.012,.36,0,.03,0,6),c.put(new we(.1,.15,.12,14,1,!0),ui(3108687,.5),0,.42,0),Sn(e,o.child(r+.1,.76,.5,.2)),sn(e,o.child(r,0,1.3,Math.PI),s.woodDark)}R0(e,o.child(3.4,0,.8)),ce(t,{shirt:6982312,hair:2825494,glasses:!0,seated:!0,pose:"read"},-1.8,.45,1.3,Math.PI),ce(t,{shirt:12681576,hair:5592405,hairStyle:"bun",seated:!0,pose:"read"},1.8,.45,1.3,Math.PI),Ne(t,t.glow,0,5.2,-2,.22),te(e,o.child(-4.8,0,1.8)),te(e,o.child(4.8,0,1.8)),Re(n,"scene-library")},J_=t=>{const n=Ae(t),{k:e,f:o}=n,{m:s,p:i}=e;o.cyl(i.fabricGrey,3.7,3.7,.04,0,0,0,40);const a=o.child(0,0,-2.2,0);a.box(s.slate,5,.3,.7,0,0,0,.04),a.box(i.plasticDark,4.6,3.4,.16,0,.3,0,.08),dn(t,V_(),0,.3+1.7,-2.2+.09,4.3,3.1),No(n,-3.9,0,-1.7,2,3.6,7,43,.3),No(n,3.9,0,-1.7,2,3.6,7,47,-.3);for(const r of[-1,1]){const c=o.child(r*2.8,0,.4,-r*.3);c.cyl(s.darkSteel,.1,.14,1.1,0,0,0,14),c.box(i.plasticDark,.34,.16,.3,0,1.1,0,.04,-.3),c.box(i.screenOn,.26,.01,.2,0,1.2,0,.002,-.3)}gn(e,o.child(0,0,1.6),2.4,.8,.72,s.wood);for(let r=0;r<4;r++){const c=o.child(-.8+r*.5,.72,1.6);c.box(i.plasticDark,.34,.02,.24,0,0,0,.006,0,0,0),c.put(new Qe(.3,.2),r%2?i.screenOn:i.screenOff,0,.022,0,-Math.PI/2)}ce(t,{shirt:6982312,hair:2825494,backpack:3104138,pose:"point"},-.6,0,.3,0),ce(t,{shirt:12681576,hair:5592405,glasses:!0,pose:"phone"},1,0,.4,-.2),Ne(t,t.glow,0,4.4,-2,.22),te(e,o.child(-4.8,0,1.8)),te(e,o.child(4.8,0,1.8)),Re(n,"scene-digital-lending")},eM=t=>{const n=Ae(t),{k:e,f:o}=n,{m:s,p:i}=e;o.cyl(i.fabricGrey,3.7,3.7,.04,0,0,0,40),o.cyl(i.fabricCream,3.2,3.2,.05,0,0,0,40),No(n,-4,0,-.6,2.2,3.4,7,53,.45),No(n,4,0,-.6,2.2,3.4,7,59,-.45);const a=o.child(0,0,-2.5,0);a.box(s.woodDark,5.6,.2,.5,0,0,0,.03),a.box(s.woodDark,5.6,3.2,.1,0,.2,-.1,.02);const r=[15909198,15233146,8175848,8042056,16052702,11635424];for(let l=0;l<5;l++)for(let d=0;d<9;d++)a.box(ui(r[(l*3+d)%r.length],.9),.4,.4,.012,-2.4+d*.6,.5+l*.58,-.04,.004,0,0,((l+d)%3-1)*.06);[[-1.4,3.2],[.9,3.4],[-.2,4.1]].forEach(([l,d])=>Ia(t,t.glow,l,d,-2.2,.4,.3)),hs(e,o.child(0,0,.3),1,.76),Sn(e,o.child(-.3,.76,.3,.3)),Xn(e,o.child(.4,.76,.2,.2),3,7),[[-1.6,.4,Math.PI/2+.2,7973541],[1.6,.4,-Math.PI/2-.2,12163964],[0,1.8,Math.PI,6982312]].forEach(([l,d,f,u],h)=>{sn(e,o.child(l,0,d,f),s.wood),ce(t,{shirt:u,hair:h===1?5592405:2825494,seated:!0,pose:h===2?"write":"read"},l,.45,d,f)});const c=o.child(3,0,2.2,-.4);c.box(s.woodDark,1.6,1,.6,0,0,0,.03),c.box(s.wood,1.7,.06,.7,0,1,0,.012),c.box(s.brass,.5,.04,.02,0,.7,.31,.004),Xn(e,c.child(.3,1.06,0,.1),4,12),te(e,o.child(-4.8,0,2)),te(e,o.child(-3.2,0,3.2),3),Re(n,"scene-community-library")},tM=t=>{const n=Ae(t),{k:e,f:o}=n,{m:s}=e;o.put(new we(5,5,.2,48),nM(e),0,.12,0);for(const i of[-1,1]){const a=o.child(i*4,0,0,0);a.box(s.stoneDark,2,.4,2,0,0,0,.05),a.box(s.stone,1.7,3.6,1.7,0,.4,0,.05);for(let r=0;r<4;r++){a.box(s.wood,1.5,.06,.2,0,.8+r*.8,.86,.01);for(let c=0;c<6;c++)a.box(e.p.books[(r*3+c)%e.p.books.length],.14,.4,.16,-.6+c*.24,.86+r*.8,.88,.004)}a.put(ao(2,.9,2),s.slate,0,4,0)}o.box(s.stone,6.4,.3,1.8,0,1.4,0,.04),o.put(qo(2.8,2.4,1.7,.04),s.stoneDark,0,.3,0);for(let i=0;i<6;i++)o.box(i%2?s.wood:s.woodDark,.8,.08,1.5,-2.5+i*1,1.7,0,.012);for(const i of[-.85,.85]){o.box(s.stoneDark,6.4,.14,.16,0,2.55,i,.02);for(let a=0;a<8;a++)o.box(s.stoneDark,.14,.8,.14,-3+a*.86,1.75,i,.015)}ce(t,{shirt:6982312,hair:2825494,backpack:13081146,pose:"walk"},-1.4,1.7,0,Math.PI/2),ce(t,{shirt:12681576,hair:5592405,hairStyle:"bun",pose:"read"},1.2,1.7,0,.2),Ne(t,t.glow,0,4.6,0,.3),te(e,o.child(-4.8,0,2.2)),te(e,o.child(4.8,0,2.2)),Re(n,"scene-knowledge-bridge")};function nM(t){return t.p.water}function _a(t,n,e){const[o,s]=Et(t,e);return[o,Je+n*Ee,s]}const oM={bookshop:W_,exchange:X_,resilience:K_,"budget-board":q_,"exchange-wall":Y_,"resource-cycle":$_,"trust-ledger":j_,"sustainable-market":Z_,library:Q_,"digital-lending":J_,"community-library":eM,"knowledge-bridge":tM},_u={...B4,...J4,...h_,...A_,...G_,...oM},ki=(t,n=.85,e=.02,o={})=>{const s=new ge({color:t,roughness:n,metalness:e,...o});return s.fog=!1,s};function ps(t,n=3.7){t.f.cyl(t.k.p.fabricGrey,n,n,.04,0,0,0,40),t.f.cyl(t.k.p.fabricCream,n-.5,n-.5,.05,0,0,0,40)}function ms(t,n=1.8){te(t.k,t.f.child(-4.8,0,n)),te(t.k,t.f.child(4.8,0,n)),dt(t.k,t.f.child(-4.3,0,n+1),.5,41),dt(t.k,t.f.child(4.3,0,n+1),.5,43)}function Mu(t,n,e,o,s,i,a=!1){const{m:r}=t.k,c=t.f.child(e,0,o,i*.3),l=a?.55:.4;c.cyl(r.stoneDark,l+.14,l+.2,.2,0,0,0,8),c.cyl(r.stone,l,l+.08,s,0,.2,0,8),c.cyl(r.brass,l+.06,l+.06,.06,0,.2+s,0,8);const d=new V(new Mo((a?.3:.2)*Ee,1),i%2?n.edge:n.glow);d.position.set(-e*Ee,Je+(s+.7+(a?.2:0))*Ee,27-o*Ee),d.userData.isLandscapeBeacon=!0,n.root.add(d)}function wu(t,n,e){for(let o=0;o<e.length-1;o++){const[s,i]=e[o],[a,r]=e[o+1],c=Math.max(1,Math.round(Math.hypot(a-s,r-i)/.45));for(let l=1;l<c;l++){const d=l/c;t.box(l%2?n.m.paveA:n.m.paveB,.34,.03,.26,s+(a-s)*d,.04,i+(r-i)*d,.01,0,Math.atan2(a-s,r-i))}}}const fd={1:{pts:Array.from({length:5},(t,n)=>[Math.cos(n/5*Math.PI*2-.6)*2.7,Math.sin(n/5*Math.PI*2-.6)*2.2-.2]),h:t=>.7+t%2*.2},2:{pts:[[-3.2,1.2],[-1.6,.6],[0,0],[1.6,-.6],[3.2,-1.2]],h:t=>.5+t*.28},3:{pts:[[-3,1.2],[-1.5,.2],[0,-.9],[1.5,.2],[3,1.2]],h:t=>[.7,.55,1.4,.55,.7][t]},4:{pts:[[0,-1.8],[-2.6,0],[0,0],[2.6,0],[0,1.9]],h:t=>t===2?1.2:.7},5:{pts:Array.from({length:5},(t,n)=>[Math.cos(-Math.PI/2+n*1.12)*(.9+n*.5),Math.sin(-Math.PI/2+n*1.12)*(.7+n*.4)]),h:t=>.6+t*.12},6:{pts:[[-2.7,-1.3],[-2.7,1.3],[0,0],[2.7,-1.3],[2.7,1.3]],h:t=>t===2?1.5:.75}},Vs=t=>n=>{const e=Ae(n),{k:o,f:s}=e,{m:i}=o,a=fd[t]??fd[1];ps(e,4),wu(s,o,a.pts),a.pts.forEach(([r,c],l)=>Mu(e,n,r,c,a.h(l),l,t===6&&l===2)),t===1?(hs(o,s.child(0,0,-.2),.55,.74),Xn(o,s.child(0,.74,-.2,.3),4,7)):t===2?(iu(o,s.child(0,0,-2.6),3.2,4),Sn(o,s.child(-1,0,1.9,.2))):t===3?(s.cyl(i.stoneDark,.9,1,.1,0,0,.6,20),cu(o,s.child(0,.1,.6),.8)):t===4?su(o,s.child(0,0,.9)):t===5?dt(o,s.child(0,0,.2),.7,61):(s.cyl(i.stoneDark,.8,.9,.2,0,0,0,12),s.cyl(i.stone,.32,.5,2.4,0,.2,0,4),s.cyl(i.brass,.05,.32,.4,0,2.6,0,4)),on(o,s.child(-2.9,0,2.2,.4),1.5),on(o,s.child(2.9,0,2.2,-.4),1.5),ce(n,{shirt:[6982312,12681576,7973541,13081146,11553344,4811890][(t-1)%6],hair:2825494,pose:t%2?"read":"phone",backpack:3891087},t===4?1.2:.2,0,1.9,t%2?.2:-.3),n.ring(4.6*Ee,Je+.08,Math.PI/2),ms(e,2.4),Re(e,`scene-lab-vocab-${t}`)};function bu(t,n="#243b34",e=1024,o=560){const s=document.createElement("canvas");s.width=e,s.height=o;const i=s.getContext("2d");if(!i)return;i.fillStyle=n,i.fillRect(0,0,e,o),i.textAlign="center",i.textBaseline="middle";for(const[r,c,l,d]of t)i.fillStyle=d,i.font=r.length>16?"bold 40px Arial, sans-serif":"bold 64px Arial, sans-serif",i.fillText(r,c,l);const a=new Zt(s);return a.colorSpace=yt,a.anisotropy=4,a}const sM=t=>{const n=Ae(t),{k:e,f:o}=n,{m:s}=e;ps(n);const i=o.child(0,0,-2.4);i.box(s.stoneDark,6.4,.2,.8,0,0,0);for(const c of[-1,1])i.box(s.woodDark,.18,4,.22,c*3,.2,0,.02);i.box(s.woodDark,6.4,.2,.3,0,4,0,.02),i.box(s.woodDark,5.9,3.5,.1,0,.45,0,.02);const a=bu([["Subject",220,150,"#9ee7ff"],["+",380,150,"#f6eedb"],["Verb",520,150,"#ffd58a"],["+",660,150,"#f6eedb"],["Object",830,150,"#ffb3a8"],["The students  read  new books.",512,330,"#f6eedb"],["S            V            O",512,420,"#9ec9b6"]]);dn(t,a,0,.45+1.75,-2.4+.07,5.5,3.2),i.box(s.wood,5.6,.08,.2,0,.4,.2,.02);const r=[6469592,14263361,14248026,7319166];for(let c=0;c<4;c++)o.box(ki(r[c],.6),.34,.34,.34,-1.3+c*.5,.78,.3,.04,0,c*.2);gn(e,o.child(0,0,.3),2.8,.7,.78,s.wood),Sn(e,o.child(1,.78,.3,.2)),Ne(t,t.glow,0,4.9,-2.1,.22),ce(t,{shirt:4811890,hair:5592405,glasses:!0,pose:"point"},-1.9,0,.3,.3),sn(e,o.child(1.7,0,1.6,Math.PI),s.woodDark),ce(t,{shirt:12681576,hair:2825494,hairStyle:"bun",seated:!0,pose:"write"},1.7,.45,1.6,Math.PI),ms(n),Re(n,"scene-lab-grammar")},iM=t=>{const n=Ae(t),{k:e,f:o}=n,{m:s}=e;ps(n);const i=o.child(0,0,-2.2);i.box(s.stoneDark,5.8,.3,1,0,0,0,.04),i.box(s.stone,5.4,3.2,.5,0,.3,0,.05),i.box(s.stoneDark,5.7,.2,.62,0,3.5,0,.04);const a=bu([["The sun ______ in the east.",512,200,"#2a2a2a"],["( rises / rose / rising )",512,380,"#7a6a4a"]],"#e8dec6");dn(t,a,0,2,-2.2+.28,4.8,2.4);const r=o.child(0,0,.4);r.box(s.woodDark,4,.1,.6,0,.7,0,.02);for(const c of[-1,1])r.box(s.woodDark,.12,.7,.5,c*1.9,0,0,.02);for(let c=0;c<3;c++){const l=(c-1)*1.25;r.box(s.paper,1,.5,.06,l,.8,.1,.02,-.25),r.box(ki([6469592,14263361,14248026][c],.7),.7,.08,.02,l,1.05,.15,.005,-.25)}Ne(t,t.glow,0,1.9,.4,.17),ce(t,{shirt:7973541,hair:2825494,pose:"point",backpack:13081146},-2.4,0,1.4,.4),ce(t,{shirt:13081146,hair:5592405,pose:"listen",glasses:!0},2.4,0,1.4,-.4),Hi(e,o.child(3.5,0,-.4),[{yaw:-.5,len:.9,tone:e.p.fabricGreen}],1.8),ms(n),Re(n,"scene-lab-cloze")},aM=t=>{const n=Ae(t),{k:e,f:o}=n,{m:s}=e;ps(n),o.put(qo(3.6,2.4,.5,.06),s.stone,0,0,-.8);for(const c of[-1,1])o.box(s.stoneDark,.8,.3,.9,c*1.8,0,-.8,.04);const i=t.ring(2*Ee,Je+2.6*Ee,0);i.position.z=27+.8*Ee;for(const c of[-1,1]){const l=o.child(c*2.9,0,.6,-c*.35);li(e,l,1.6,.8,.76),Sn(e,l.child(-.3,.76,0,.2)),Xn(e,l.child(.45,.76,0),4,c>0?3:5),sn(e,l.child(0,0,.95,Math.PI),s.woodDark),ce(t,{shirt:c<0?6982312:11553344,hair:2825494,hairStyle:c<0?void 0:"bun",seated:!0,pose:"write"},c*2.9+-c*.35*0,.45,1.6,Math.PI)}const a=wo([{text:"EN",y:90,font:"bold 90px Arial, sans-serif"}],{width:400,height:180,background:"#2f4a6a"}),r=wo([{text:"中文",y:90,font:"bold 90px 'Microsoft YaHei', sans-serif"}],{width:400,height:180,background:"#7a3a36"});dn(t,a,-2.9,2.2,.6,1.2,.54),dn(t,r,2.9,2.2,.6,1.2,.54),Ne(t,t.glow,0,1.6,-.8,.28),Ne(t,t.edge,-.7,1.2,.1,.12),Ne(t,t.edge,.7,1.2,.1,.12),ms(n,2.4),Re(n,"scene-lab-translation")},rM=t=>{const n=Ae(t),{k:e,f:o}=n,{m:s}=e;ps(n);for(const[a,r,c,l]of[[-3.4,-1.2,.5,71],[0,-2.6,0,73],[3.4,-1.2,-.5,75]])ou(e,o.child(a,0,r,c),2.6,3.2,7,l);ja(e,o.child(1.7,0,-2.3),2.6),gn(e,o.child(0,0,.5),3,1,.78,s.wood),Sn(e,o.child(-.8,.78,.5,.1)),Sn(e,o.child(.9,.78,.6,-.2)),Xn(e,o.child(0,.78,.2,.3),5,9);const i=o.child(-1.3,.78,.2);i.cyl(s.brass,.1,.12,.04,0,0,0,12),i.strut(s.brass,[0,.04,0],[.05,.5,0],.012),i.cyl(e.p.fabricGreen,.04,.14,.14,.05,.5,0,12),Ne(t,t.glow,-1.25,1.55,.2,.14);for(const a of[-1,1])sn(e,o.child(a*.9,0,1.7,Math.PI),s.woodDark),ce(t,{shirt:a<0?6982312:12681576,hair:2825494,hairStyle:a<0?void 0:"bun",glasses:a<0,seated:!0,pose:"read"},a*.9,.45,1.7,Math.PI);t.ring(4.6*Ee,Je+.08,Math.PI/2),ms(n,2.2),Re(n,"scene-project-reading")},cM=t=>{const n=Ae(t),{k:e,f:o}=n,{m:s}=e;ps(n);const i=c=>{const l=o.child(c,0,-1.3,-c*.1);l.box(s.darkSteel,1.1,2,.8,0,0,0,.05),l.cyl(s.steel,.38,.38,.06,0,1.2,.4,24),l.put(new we(.34,.34,.06,24),s.darkSteel,0,1.4,.44,Math.PI/2),l.put(new we(.17,.17,.06,20),s.darkSteel,0,.55,.43,Math.PI/2),l.put(new we(.08,.08,.02,16),s.steel,0,1.4,.47,Math.PI/2)};i(-3),i(3);const a=o.child(0,0,.1);li(e,a,2.8,.9,.78),a.box(s.darkSteel,2.2,.08,.6,0,.78,0,.02,-.2);for(let c=0;c<8;c++)a.cyl(s.brass,.03,.03,.04,-.95+c*.27,.86,.1,10);S4(e,a.child(.95,.78,-.15),.5,.3);const r=o.child(-1.9,0,.8);r.cyl(s.darkSteel,.2,.22,.04,0,0,0,14),r.strut(s.steel,[0,.04,0],[0,1.5,0],.015),r.ball(s.darkSteel,.06,0,1.58,0,1,1.5,1),sn(e,o.child(.4,0,1.6,Math.PI),s.woodDark),ce(t,{shirt:4811890,hair:2825494,seated:!0,pose:"listen",glasses:!0},.4,.45,1.6,Math.PI),ce(t,{shirt:13081146,hair:5592405,pose:"talk",scarf:11553344},-1.9,0,1.4,.4);for(const c of[2.4,3.6,4.8]){const l=t.ring(c*Ee*.8,Je+.16+c*.35,Math.PI/2.15);l.userData.isLandscapeRing=!0}Ne(t,t.glow,0,2.4,-.8,.2),ms(n,2.4),Re(n,"scene-project-listening")},lM=t=>{const n=Ae(t),{k:e,f:o}=n,{m:s}=e;ps(n);const i=o.child(0,0,-2.4);i.box(s.woodDark,5.6,3,.12,0,.8,0,.03),i.box(ki(12159831,.95),5.3,2.7,.05,0,.95,.07,.01),[16179850,15902624,10412228,11127026,16179850,15902624,10412228,11127026].forEach((l,d)=>i.box(ki(l,.9),.7,.7,.02,-2+d%4*1.35,1.2+Math.floor(d/4)*1.15,.11,.01,0,(d%3-1)*.08));const r=o.child(0,0,.5);li(e,r,3.2,1.2,.78),r.box(s.paper,1,.03,.72,-.2,.78,.1,.005,0,.08),r.box(s.paper,.9,.05,.65,.9,.78,-.2,.005,0,-.1),r.cyl(ki(1911629,.2,.2),.07,.08,.1,1.2,.78,.3,12),r.strut(s.brass,[-.1,.8,.1],[.4,.95,.1],.012),qa(e,r.child(-1.1,.78,-.2,.2));const c=r.child(1.3,.78,-.35);c.cyl(s.brass,.1,.12,.04,0,0,0,12),c.strut(s.brass,[0,.04,0],[-.1,.55,0],.012),c.cyl(e.p.fabricGreen,.04,.14,.14,-.1,.55,0,12),Ne(t,t.glow,1.2,1.7,.15,.14),sn(e,o.child(0,0,1.9,Math.PI),s.woodDark),ce(t,{shirt:4811890,hair:5592405,glasses:!0,seated:!0,pose:"write",lean:.12},0,.45,1.9,Math.PI),o.cyl(s.darkSteel,.2,.17,.4,2.7,0,1,12);for(let l=0;l<3;l++)o.ball(s.paper,.1,2.65+l*.05,.5+l*.1,1);ms(n,2.4),Re(n,"scene-project-writing")},dM=t=>{const n=Ae(t),{k:e,f:o}=n,{m:s}=e;ps(n,4.1),au(e,o.child(0,0,-.6),1.6,s.slate),R0(e,o.child(0,.2,-.6),.28),o.cyl(s.stoneDark,.3,.4,.2,0,0,-.6,12);for(let i=0;i<4;i++){const a=(i-1.5)*1.9,r=1.3-Math.abs(i-1.5)*.45;Mu(n,t,a,r,.8,i)}wu(o,e,[[-3.2,1.6],[-1.9,1.2],[0,1],[1.9,1.2],[3.2,1.6]]),on(e,o.child(-3,0,-.9,.6),1.4),on(e,o.child(3,0,-.9,-.6),1.4),ce(t,{shirt:11553344,hair:2825494,hairStyle:"bun",pose:"read"},-.8,0,2.3,.2),ce(t,{shirt:6982312,hair:5592405,pose:"talk",glasses:!0},.8,0,2.3,-.3),t.ring(4.8*Ee,Je+.08,Math.PI/2),ms(n,2.8),Re(n,"scene-project-memory")},fM={"lab-vocab-1":Vs(1),"lab-vocab-2":Vs(2),"lab-vocab-3":Vs(3),"lab-vocab-4":Vs(4),"lab-vocab-5":Vs(5),"lab-vocab-6":Vs(6),"lab-grammar":sM,"lab-cloze":iM,"lab-translation":aM,"project-reading":rM,"project-listening":cM,"project-writing":lM,"project-memory":dM},Qr=new Map;function uM(t){const n=Qr.get(t);if(n)return n;let e=t;const o=t.type,s=t.parameters;if(s)if(o==="BoxGeometry"){const{width:i,height:a,depth:r}=s,c=Math.min(i,a,r);if(c>=.05&&s.widthSegments<=1&&s.heightSegments<=1&&s.depthSegments<=1){const l=bt.clamp(c*.2,.012,.085);e=new Wo(i,a,r,2,l)}}else if(o==="CylinderGeometry"){const i=s.radialSegments;i>=9&&i<24&&(e=new we(s.radiusTop,s.radiusBottom,s.height,28,s.heightSegments,s.openEnded===1,s.thetaStart,s.thetaLength))}else if(o==="ConeGeometry"){const i=s.radialSegments;i>=9&&i<24&&s.radius>.2&&(e=new xt(s.radius,s.height,28,s.heightSegments,s.openEnded===1,s.thetaStart,s.thetaLength))}else o==="SphereGeometry"?s.widthSegments<=14&&s.heightSegments<=10&&s.radius>.08&&(e=new Se(s.radius,28,18,s.phiStart,s.phiLength,s.thetaStart,s.thetaLength)):o==="TorusGeometry"&&s.radius>.3&&(s.radialSegments<10||s.tubularSegments<40)&&(e=new he(s.radius,s.tube,Math.max(s.radialSegments,12),Math.max(s.tubularSegments,64),s.arc));return Qr.set(t,e),e}function hM(t){const n=[];t.traverse(e=>{const o=e;if(!o.isMesh||o.userData.keepGeometry)return;const s=o.geometry,i=uM(s);i!==s&&(o.geometry=i,n.push(s),o.isInstancedMesh&&o.computeBoundingSphere())});for(const e of new Set(n))e.dispose();Qr.clear()}const pM=[{x:-21,z:-20,color:3718648},{x:21,z:-20,color:16498468},{x:-21,z:20,color:4906624},{x:21,z:20,color:16020150}];function mM(){const t=new Xe;t.name="study-stations";const n=Kn();for(const e of pM){const o=new On,s=new ge({color:e.color,roughness:.82,side:qe});s.fog=!1;const i=new ge({color:new oe(e.color).lerp(new oe(16777215),.55),roughness:.82,side:qe});i.fog=!1;const{x:a,z:r}=e;o.add(Mn(3.7,.2,.025,6),n.stoneDark,{x:a,y:.62,z:r}),o.add(Mn(3.3,.16,.02,6),n.stone,{x:a,y:.82,z:r}),o.add(new he(2.6,.03,5,6),n.slate,{x:a,y:1,z:r,rx:Math.PI/2,rz:Math.PI/6});const c=.98,l=1.75;for(const[m,g]of[[-l,-l],[l,-l],[-l,l],[l,l]])o.add(le(.34,.12,.34,.03),n.stoneDark,{x:a+m*.78,y:c+.06,z:r+g*.78}),o.add(et(.075,.095,2.3,12),n.wood,{x:a+m*.78,y:c+1.27,z:r+g*.78});const d=c+2.42;for(const m of[-1,1])o.add(le(l*1.56+.3,.16,.14,.02),n.woodDark,{x:a,y:d,z:r+m*l*.78});for(const m of[-1,1])o.add(le(.14,.16,l*1.56+.3,.02),n.woodDark,{x:a+m*l*.78,y:d,z:r});const f=new xt(2.6,.95,4,1);o.add(f,s,{x:a,y:d+.5,z:r,ry:Math.PI/4}),o.add(new xt(2.3,.78,4,1),i,{x:a,y:d+.42,z:r,ry:Math.PI/4,sy:.96}),o.add(new Se(.09,8,6),n.brass,{x:a,y:d+1.02,z:r}),o.add(et(.14,.2,1,12),n.woodDark,{x:a,y:c+.5,z:r}),o.add(le(.9,.06,.62,.02),n.wood,{x:a,y:c+1.04,z:r,rx:-.3}),o.add(le(.4,.03,.5,.01),n.paper,{x:a-.21,y:c+1.09,z:r-.02,rx:-.3,rz:.06}),o.add(le(.4,.03,.5,.01),n.paper,{x:a+.21,y:c+1.09,z:r-.02,rx:-.3,rz:-.06});for(const m of[-1,1])o.add(le(.7,.07,.34,.02),n.wood,{x:a+m*1.1,y:c+.42,z:r+1.05}),o.add(le(.07,.4,.3,.012),n.woodDark,{x:a+m*1.1-.28,y:c+.2,z:r+1.05}),o.add(le(.07,.4,.3,.012),n.woodDark,{x:a+m*1.1+.28,y:c+.2,z:r+1.05});for(const m of[-1,1])o.add(Nt([a+m*1.1,d-.08,r+1.3],[a+m*1.1,d-.5,r+1.3],.01,4),n.steel),o.add(et(.1,.12,.22,8),n.lampGlass,{x:a+m*1.1,y:d-.62,z:r+1.3});o.build(t,"study-station",{isLandscapeStage:!0});const u=new ge({color:e.color,emissive:e.color,emissiveIntensity:1.1,roughness:.2,metalness:.3});u.fog=!1;const h=new V(new Ns(.36,2),u);h.position.set(a,c+1.9,r),h.userData.isLandscapeBeacon=!0,t.add(h);const p=new ge({color:e.color,emissive:e.color,emissiveIntensity:.7,roughness:.3,metalness:.4});p.fog=!1;const x=new V(new he(.62,.035,8,40),p);x.rotation.x=Math.PI/2,x.position.set(a,c+1.9,r),x.userData.isLandscapeRing=!0,t.add(x)}return t}function gM(t,n){const e=new Xe;e.name="signal-masts";const o=Kn(),s=[[-28,35,13],[0,43,18],[28,35,11]],i=new On,a=[];for(const[d,f,u]of s){i.add(Mn(3.2,.5,.04,8),o.stoneDark,{x:d,y:0,z:f}),i.add(Mn(2.6,.3,.03,8),o.stone,{x:d,y:.5,z:f});const h=.8,p=1.9,x=.55,m=[];for(let y=0;y<4;y++){const b=y/4*Math.PI*2+Math.PI/4;m.push([[d+Math.cos(b)*p,h,f+Math.sin(b)*p],[d+Math.cos(b)*x,h+u,f+Math.sin(b)*x]]),i.add(Nt(m[y][0],m[y][1],.13,8),o.steel),i.add(le(.5,.3,.5,.05),o.stoneDark,{x:m[y][0][0],y:h+.15,z:m[y][0][2]})}const g=(y,b)=>[m[y][0][0]+(m[y][1][0]-m[y][0][0])*b,m[y][0][1]+(m[y][1][1]-m[y][0][1])*b,m[y][0][2]+(m[y][1][2]-m[y][0][2])*b],v=Math.round(u/1.6);for(let y=0;y<=v;y++){const b=y/v;for(let T=0;T<4;T++)i.add(Nt(g(T,b),g((T+1)%4,b),.05,6),o.steel),y<v&&(i.add(Nt(g(T,b),g((T+1)%4,b+1/v),.035,5),o.steel),i.add(Nt(g((T+1)%4,b),g(T,b+1/v),.035,5),o.steel))}const w=h+u*.66,M=p+(x-p)*.66+.55;i.add(Mn(M,.12,.015,8),o.slate,{x:d,y:w,z:f});for(let y=0;y<16;y++){const b=y/16*Math.PI*2;i.add(Nt([d+Math.cos(b)*(M-.05),w+.12,f+Math.sin(b)*(M-.05)],[d+Math.cos(b)*(M-.05),w+.62,f+Math.sin(b)*(M-.05)],.02,4),o.steel)}i.add(new he(M-.05,.025,5,32),o.steel,{x:d,y:w+.62,z:f,rx:Math.PI/2});for(let y=0;y<3;y++){const b=y/3*Math.PI*2+.4;i.add(le(.35,1.2,.1,.02),o.paper,{x:d+Math.cos(b)*(x+.5),y:h+u*.86,z:f+Math.sin(b)*(x+.5),ry:-b+Math.PI/2})}i.add(new Se(.7,20,8,0,Math.PI*2,0,Math.PI/3),o.paper,{x:d+x+.9,y:h+u*.74,z:f,rz:-Math.PI/2+.2}),i.add(Nt([d+x,h+u*.74,f],[d+x+.55,h+u*.74,f],.06,6),o.steel),i.add(Nt([d,h+u,f],[d,h+u+1.8,f],.04,6),o.steel),i.add(et(.09,.14,.2,8),o.brass,{x:d,y:h+u+.2,z:f}),a.push([d,h+u+1.4,f])}i.build(e,"signal-mast",{isLandscapeStage:!0});const r=new ge({color:2830390,roughness:.6,metalness:.5});r.fog=!1;const c=(d,f)=>{const u=[(d[0]+f[0])/2,Math.min(d[1],f[1])-1.6,(d[2]+f[2])/2],h=new Xd(new X(...d),new X(...u),new X(...f)),p=new V(new Zn(h,32,.04,5,!1),r);p.userData.isLandscapeRoute=!0,e.add(p)},l=d=>[s[d][0],.8+s[d][2]*.7,s[d][1]];return c(l(0),l(1)),c(l(1),l(2)),s.forEach(([d,f,u],h)=>{const p=new V(new Se(.55,20,14),t);p.position.set(a[h][0],a[h][1]+.2,a[h][2]),p.userData.isLandscapeBeacon=!0,e.add(p);const x=new V(new he(2.8,.06,6,40),n);x.rotation.x=Math.PI/2,x.position.set(d,.8+u*.4,f),x.userData.isLandscapeRing=!0,e.add(x)}),e}const ka=new Map,cs=t=>{const n=`c${t}`;let e=ka.get(n);return e||(e=new ge({color:t,roughness:.92,side:qe}),e.fog=!1,ka.set(n,e)),e},ss=(t,n=.55,e=.1)=>{const o=`p${t}:${n}:${e}`;let s=ka.get(o);return s||(s=new ge({color:t,roughness:n,metalness:e}),s.fog=!1,ka.set(o,s)),s},Ue=(t,n,e,o,s,i,a,r,c=0,l=.03)=>t.add(le(e,o,s,l),n,{x:i,y:a,z:r,ry:c}),qt=(t,n,e,o,s,i,a,r,c=16)=>t.add(et(e,o,s,c),n,{x:i,y:a,z:r}),ut=(t,n,e,o,s=.03)=>t.add(Nt(e,o,s,5),n),Ua=(t,n=18)=>new Ga(t.map(([e,o])=>new ot(e,o)),n);function Jr(t,n,e,o,s,i,a=1){t.add(le(1.3*a,.5*a,1.3*a,.05),n.stoneDark,{x:e,y:o+.25*a,z:s,ry:i}),t.add(le(1*a,1.5*a,1*a,.05),n.stone,{x:e,y:o+1.25*a,z:s,ry:i}),t.add(le(1.15*a,.2*a,1.15*a,.04),n.stoneDark,{x:e,y:o+2.1*a,z:s,ry:i});const r=o+2.2*a;t.add(Ua([[.02,0],[.42,.02],[.36,.9],[.28,1.5],[.3,1.95],[.14,2.15],[0,2.2]],18),n.stoneWarm,{x:e,y:r,z:s,sx:a,sy:a,sz:a,ry:i}),t.add(new Se(.2,14,10),n.stoneWarm,{x:e,y:r+2.4*a,z:s,sx:a,sy:a*1.1,sz:a});const c=Math.cos(i),l=Math.sin(i);ut(t,n.stoneWarm,[e+.28*a*c,r+1.75*a,s-.28*a*l],[e+.5*a*c,r+2.55*a,s-.5*a*l],.07*a),t.add(et(.05*a,.05*a,.6*a,8),n.brass,{x:e+.52*a*c,y:r+2.7*a,z:s-.52*a*l})}function L0(t,n,e,o,s,i=4.4){qt(t,n.darkSteel,.28,.34,.4,e,o+.2,s,10),qt(t,n.darkSteel,.08,.13,i,e,o+.4+i/2,s,10),t.add(new he(.13,.025,6,14),n.darkSteel,{x:e,y:o+1.2,z:s,rx:Math.PI/2}),qt(t,n.lampGlass,.2,.15,.55,e,o+.4+i+.28,s,8),t.add(new xt(.3,.28,8),n.darkSteel,{x:e,y:o+.4+i+.7,z:s})}function vM(t,n,e){const s=cs(14208176),i=ss(12073778,.6,.05),a=ss(2312808,.55,.05);for(const r of[-5.2,0,5.2]){Ue(t,n.stone,.5,.7,.4,r,8.75,51.2-.95,0,.04),Ue(t,n.stoneDark,5,.28,.6,r,.55+2.2-.14,51.2-1,0,.03),Ue(t,n.darkSteel,.1,4.2,.08,r,4.4,51.2-.92,0,.01);for(const c of[3,5.2])Ue(t,n.darkSteel,4,.08,.08,r,c,51.2-.92,0,.01);for(const c of[-1,1])Ue(t,n.stone,.3,4.4,.35,r+c*2.5,4.6,51.2-1,0,.03)}Ue(t,n.woodDark,3.2,4.8,.3,0,3.2,51.2-1.35,0,.04);for(const r of[-.8,.8]){Ue(t,n.wood,1.4,4.2,.18,r,3.1,51.2-1.55,0,.03);for(let c=0;c<5;c++)for(let l=0;l<3;l++)t.add(new Se(.06,6,5),n.brass,{x:r-.4+l*.4,y:1.6+c*.75,z:51.2-1.66})}t.add(Su(3.4,2.7,.4),n.stoneDark,{x:0,y:5.4,z:51.2-1.35});for(let r=0;r<38;r++)Ue(t,n.stoneDark,.28,.2,.3,-9+r*.48,9.35,51.2-1.48,0,.02);t.add(ao(19.2,3,7),n.slate,{x:0,y:10.55,z:51.2+2.6});for(const r of[-6.5,6.5])Ue(t,n.stoneDark,.9,3,.9,r,12.2,51.2+1,0,.04),Ue(t,n.stone,1.1,.2,1.1,r,13.75,51.2+1,0,.03);qt(t,n.stoneWarm,1.15,1.2,1.4,0,14.3,51.2+1.8,8),t.add(new Se(1.2,16,8,0,Math.PI*2,0,Math.PI/2),n.copper,{x:0,y:15,z:51.2+1.8}),ut(t,n.brass,[0,16.2,51.2+1.8],[0,17.8,51.2+1.8],.04),ut(t,n.brass,[-.6,17.4,51.2+1.8],[.6,17.4,51.2+1.8],.03);for(const r of[-7.6,7.6])ut(t,n.steel,[r,1.8,51.2-2.4],[r,9,51.2-2.4],.07),Ue(t,i,1.5,.9,.04,r+(r<0?.85:-.85),8.3,51.2-2.4,0,.005);for(let r=0;r<8;r++)L0(t,n,-28+r*8+0,1.66,27,3.6);for(const r of[-14,14]){Ue(t,n.darkSteel,2.2,.5,2.2,r,1.9,28.8,0,.05),qt(t,a,.55,.7,5.8,r,5,28.8,14),Ue(t,n.stoneDark,1.8,1.2,1.8,r,8.4,28.8,0,.05),ut(t,n.steel,[r,8.4,28.8],[r,8.5,38.5],.14),ut(t,n.steel,[r,8.4,28.8],[r,6.6,27],.12),Ue(t,n.darkSteel,1.6,1.1,1.6,r,7.2,26.2,0,.05),ut(t,n.darkSteel,[r,8.45,36],[r,4.4,36],.02),Ue(t,n.brass,.34,.34,.34,r,4.2,36,0,.03),ut(t,n.steel,[r,9,28.8],[r,8.5,38.2],.04);for(let c=1;c<6;c++)ut(t,n.steel,[r+.45,8.6,29+c*1.6],[r+.45,9-c*.04,28.9+c*1.6+.6],.02)}for(const[r,c]of[[-6,28.4],[8,28.8],[20,28.2],[-22,28.9]]){for(let l=0;l<6;l++)Ue(t,l%2?n.wood:n.woodDark,1,.85,1,r+l%3*1.05,1.67+0+Math.floor(l/3)*.85,c+l%2*.1,e()*.3,.04);for(let l=0;l<4;l++)t.add(new Se(.34,10,8),s,{x:r+3.1+l%2*.6,y:1.9+Math.floor(l/2)*.35,z:c-.2+l%2*.4,sy:.6});for(let l=0;l<5;l++)t.add(new he(.3,.07,6,14),n.wood,{x:r-1.4,y:1.7+l*.12,z:c+.3,rx:Math.PI/2})}ut(t,n.darkSteel,[2.6,1.7,28.2],[2.6,3.5,28.2],.09),t.add(new he(.5,.07,8,16,Math.PI),n.darkSteel,{x:2.6,y:1.8,z:28.2,rz:Math.PI}),ut(t,n.darkSteel,[2,3.2,28.2],[3.2,3.2,28.2],.07);for(const[r,c]of[-23,23].entries()){const l=r===0?37.2:42.1;for(const d of[-1,1])for(const f of[1.15,1.45])Ue(t,n.woodDark,.05,.07,10.2,c+d*1.14,f,l,0,.01);ut(t,n.woodDark,[c,2.2,l+5.5],[c,3.4,l+8.4],.1),t.add(new Qe(2.8,3),s,{x:c,y:3.9,z:l+6,ry:Math.PI/2,sx:1,sy:1}),ut(t,n.steel,[c,6.6,l],[c,3.4,l+8.4],.015),Ue(t,n.woodDark,.12,1.6,.5,c,1.5,l-5.7,0,.02),qt(t,n.lampGlass,.14,.12,.3,c,3,l-5,8),ut(t,n.woodDark,[c,2,l-5],[c,3.4,l-5],.04);for(const d of[-1,1]){ut(t,n.steel,[c,7.2,l+.1],[c+d*1.1,1.65,l-.9],.012),ut(t,n.steel,[c,7.2,l+.1],[c+d*1.1,1.65,l+1],.012);for(let f=1;f<8;f++){const u=f/8;ut(t,n.steel,[c+d*1.1*u,7.2-5.55*u,l+.1-1*u],[c+d*1.1*u,7.2-5.55*u,l+.1+1.1*u],.01)}}}}function Su(t,n,e){const o=new Tn;o.absarc(0,0,t/2+.3,0,Math.PI,!1),o.lineTo(-t/2,0),o.absarc(0,0,t/2,Math.PI,0,!0);const s=new Fn(o,{depth:e,bevelEnabled:!1,curveSegments:16});return s.translate(0,n-t/2,-e/2),s}function xM(t,n,e){const o=new Xe,s=40,i=1.8,a=i+.95*.7+9.6+.95;for(let l=0;l<24;l++){const d=-11+l*.96+.48;Ue(t,l%2?n.stoneWarm:n.stone,.62,.74,.08,d,a+.2,s-7.12,0,.01),Ue(t,n.stoneDark,.06,.74,.1,d-.16,a+.2,s-7.16,0,.005),Ue(t,n.stoneDark,.06,.74,.1,d+.16,a+.2,s-7.16,0,.005)}for(let l=0;l<26;l++)t.add(new xt(.2,.34,6),n.terracottaRoof,{x:-12+l*.96,y:a+1.55,z:s-7.9,rx:Math.PI/2});for(const l of[-1,1])t.add(new xt(.55,1.5,8),n.stoneWarm,{x:l*12.4,y:a+2.2,z:s-7.2,sz:.4}),t.add(new xt(.5,1.4,8),n.stoneWarm,{x:l*12.4,y:a+2.2,z:s+7.2,sz:.4});t.add(new xt(.8,2,8),n.stoneWarm,{x:0,y:a+6,z:s-7.3,sz:.4});for(const[l,d,f]of[[-4.6,.8,.3],[-2.4,1.3,.12],[0,1.9,0],[2.4,1.3,-.12],[4.6,.8,-.3]])t.add(Ua([[.01,0],[.34,.1],[.3,d*.7],[.18,d],[.01,d*1.05]],12),n.stoneWarm,{x:l,y:a+2+(.9-d*.2),z:s-7.35,rz:f,sz:.6}),t.add(new Se(.17,10,8),n.stoneWarm,{x:l-f*d,y:a+2+(.9-d*.2)+d*1.15,z:s-7.35});for(const l of[-1,1])Ue(t,n.stoneDark,.9,1.4,2.8,l*4.8,.9,s-10.8,0,.05),Ue(t,n.stone,1.1,.2,3,l*4.8,1.7,s-10.8,0,.04),Jr(t,n,l*8.4,i,s-8.2,(l>0,Math.PI),.95),Jr(t,n,l*12.2,i,s-8.2,Math.PI,.8);Ue(t,n.stoneDark,3.4,5,.3,0,i+2.5,s-4.9,0,.05);for(const l of[-.65,.65]){Ue(t,n.brass,1.2,4,.12,l,i+2,s-5,0,.03);for(let d=0;d<5;d++)for(let f=0;f<2;f++)t.add(new Se(.05,6,5),n.stoneWarm,{x:l-.25+f*.5,y:i+.7+d*.7,z:s-5.08})}for(const l of[-5.5,5.5])Ue(t,n.stoneDark,1.6,2.8,.2,l,i+3.2,s-4.9,0,.04),Ue(t,n.slate,1.2,2.4,.1,l,i+3.2,s-4.98,0,.03);for(let l=-3;l<=3;l++)for(let d=0;d<3;d++)Ue(t,(l+d)%2?n.paveA:n.paveB,3.9,.06,3.9,l*4,.62,s-14-d*4,0,.01);qt(t,n.stoneDark,2.8,3,.5,0,.9,s-18,24),qt(t,n.stone,2.5,2.7,.28,0,1.3,s-18,24),qt(t,n.stoneWarm,.3,.5,2,0,2.3,s-18,12),qt(t,n.stone,1.3,1.1,.25,0,3,s-18,20),qt(t,n.stoneWarm,.14,.3,1.2,0,3.7,s-18,10);const r=Ka({depth:.45}),c=new V(new we(2.4,2.4,.06,28),r);c.position.set(0,1.46,s-18),c.userData.isLandscapeStage=!0,o.add(c);for(const[l,d,f]of[[-17,s-6,1.1],[17,s-6,1.1],[-17,s+6,1.3],[17,s+6,1.3],[-14,s-18,.9],[14,s-18,.9]]){const u=e()>.4?ks(f):Ki(f*1.1);u.position.set(l,.6,d),o.add(u)}for(const[l,d]of[[-13,s-9.6],[13,s-9.6]])L0(t,n,l,1.8,d,3.4);return o}function _M(t,n){const e=ss(15659508,.4,.25),o=ss(12663602,.45,.25),s=ss(2575247,.45,.25),i=ss(2765112,.5,.6),a=ss(15843890,.55,.1),r=40,c=1.8;for(let f=0;f<4;f++){const u=f/4*Math.PI*2+Math.PI/4,h=Math.cos(u)*2.2,p=r+Math.sin(u)*2.2;t.add(Ua([[0,0],[.5,0],[.52,.2],[.52,5.4]],20),e,{x:h,y:c+.6,z:p}),t.add(Ua([[.52,0],[.4,.8],[.18,1.6],[0,2.1]],20),o,{x:h,y:c+6,z:p}),t.add(new we(.2,.34,.6,14,1,!0),i,{x:h,y:c+.3,z:p}),ut(t,n.steel,[h*.7+Math.cos(u)*-.4,c+2,r+(p-r)*.7],[h,c+2,p],.07)}for(const f of[1.2,2.6,4,6,6.9,8.8,9.5,11.4])t.add(new he(1.6,.03,6,40),n.steel,{x:0,y:c+f+1,z:r,rx:Math.PI/2});t.add(new we(1.62,1.62,.42,40,1,!0),s,{x:0,y:c+7.45,z:r}),t.add(new we(1.62,1.62,.12,40,1,!0),e,{x:0,y:c+7.05,z:r});for(const f of[0,Math.PI])Ue(t,i,.3,2.2,.06,Math.sin(f)*1.6,c+5,r-Math.cos(f)*1.6,f,.01);for(let f=0;f<5;f++){const u=f/5*Math.PI*2;t.add(new we(.34,.6,.9,16,1,!0),i,{x:Math.cos(u)*.9,y:c+.5,z:r+Math.sin(u)*.9})}Ue(t,i,3.4,.9,7.8,0,1,r,0,.03),Ue(t,a,4.4,.05,.3,0,1.64,r-3.2,0,.005),Ue(t,a,4.4,.05,.3,0,1.64,r+3.2,0,.005),t.add(new xt(1.5,1.2,4),n.darkSteel,{x:0,y:1.5,z:r,ry:Math.PI/4});for(let f=0;f<12;f++){const u=f/12*Math.PI*2;t.add(new we(.1,.1,.08,6),n.brass,{x:Math.cos(u)*3,y:1.66,z:r+Math.sin(u)*3})}const l=6.8;for(const f of[8.5,12.5]){Ue(t,n.darkSteel,2.2,.12,2,l-1.3,1.4+f-.6,r,0,.02);for(const u of[-1,1])ut(t,n.steel,[l-2.3,1.4+f,r+u*1],[l-.2,1.4+f,r+u*1],.04);ut(t,o,[l-4.8,1.4+f,r-.25],[l-1.6,1.4+f-.3,r-.25],.06),ut(t,n.darkSteel,[l-4.8,1.4+f-.2,r+.25],[l-1.6,1.4+f-.5,r+.25],.05)}for(const[f,u]of[[l-.7,r-.7],[l+.7,r+.7]])t.add(new we(.08,.08,18,6),o,{x:f,y:1.4+9,z:u});for(const[f,u]of[[-12,r-11],[12,r-11],[0,r+14]])ut(t,n.steel,[f,1.4,u],[f,21,u],.08),ut(t,n.steel,[f-.8,1.4,u+.8],[f,14,u],.04),ut(t,n.steel,[f+.8,1.4,u+.8],[f,14,u],.04),t.add(new Se(.14,8,6),n.brass,{x:f,y:21.1,z:u});for(const[f,u]of[[-9,r-9],[9,r-9],[-9,r+9],[9,r+9]]){qt(t,n.darkSteel,.1,.16,7.2,f,1.4+3.6,u,8),Ue(t,n.darkSteel,1.6,.9,.3,f,1.4+7.4,u,0,.03);for(let h=0;h<6;h++)t.add(new Se(.15,8,6),n.lampGlass,{x:f-.55+h%3*.55,y:1.4+7.2+(h<3?.2:.62),z:u-.2})}Ue(t,n.stone,15,14,12,-22,7.6,r+7,0,.1);for(let f=0;f<6;f++)Ue(t,n.stoneDark,.3,14,12.2,-29+f*2.8,7.6,r+7,0,.03);Ue(t,n.darkSteel,6,9.5,.3,-22,6.2,r+.95,0,.05);for(let f=0;f<4;f++)Ue(t,a,6.2,.35,.34,-22,3+f*2.4,r+.88,0,.02);Ue(t,e,15.4,.5,12.4,-22,14.9,r+7,0,.05);for(const[f,u]of[[-26,3.4],[-18,3.4]])Ue(t,o,u,1.2,.2,f,11.6,r+.9,0,.02);for(let f=0;f<9;f++)Ue(t,f%2?n.paveA:n.paveB,11,.06,4.2,-10+f%1*0+f*0,.8,r+0,0,.01);for(const[f,u,h]of[[16,r-2,0],[20,r+4,.5]])qt(t,n.darkSteel,.35,.55,3.2,f,1.6+1.6,u,10),t.add(new Se(2.2,20,8,0,Math.PI*2,0,Math.PI/3),e,{x:f,y:5,z:u,rx:-.9,ry:h}),ut(t,n.steel,[f,5,u],[f+Math.sin(h)*0,7,u-1.2],.04);for(const[f,u,h]of[[10,r-13,.3],[-4,r-14,-.2],[14,r+12,1.2]]){Ue(t,e,3.2,1.3,1.6,f,1.4+1.2,u,h,.08),Ue(t,n.glass,1,.7,1.62,f-.9*Math.cos(h),1.4+1.5,u+.9*Math.sin(h),h,.04);for(const p of[-1.1,1.1])for(const x of[-.8,.8])t.add(new we(.34,.34,.26,12),n.darkSteel,{x:f+p*Math.cos(h),y:1.4+.34,z:u-p*Math.sin(h)+x,rz:Math.PI/2,ry:h})}for(const f of[r-6,r+6]){for(let u=0;u<4;u++)t.add(new we(.16,.16,6,8),n.steel,{x:-12+u*1.5,y:2.4+u*0,z:f,rz:Math.PI/2});Ue(t,n.darkSteel,.3,1.8,.3,-9,2.2,f,0,.03),Ue(t,n.darkSteel,.3,1.8,.3,-15,2.2,f,0,.03)}const d=19;for(let f=0;f<44;f++){const u=f/44*Math.PI*2,h=Math.cos(u)*d,p=r+Math.sin(u)*d;p>r+4&&h<-8||(ut(t,n.darkSteel,[h,.9,p],[h,3,p],.05),f%2&&ut(t,n.steel,[h,2.7,p],[Math.cos(u+.143)*d,2.7,r+Math.sin(u+.143)*d],.012))}ut(t,n.steel,[24,1.4,r-8],[24,8.4,r-8],.07),t.add(new xt(.35,2.4,8,1,!0),o,{x:24.9,y:8.2,z:r-8,rz:Math.PI/2})}function MM(t,n,e,o){const s=new Xe,i=cs(13191741),a=cs(3104138),r=38;if(e.ledger){for(let f=0;f<44;f++)Ue(t,n.stoneDark,.34,.26,.34,-10.4+f*.5,13.35,49-2.1,0,.02);Ue(t,n.woodDark,4.4,5.6,.3,0,3.7,49-1.75,0,.05);for(const f of[-1,1]){Ue(t,n.brass,1.9,4.8,.12,f,3.3,49-1.9,0,.03);for(let u=0;u<6;u++)for(let h=0;h<2;h++)t.add(new Se(.06,6,5),n.stoneWarm,{x:f-.45+h*.9,y:1.4+u*.7,z:49-1.98})}t.add(Su(4.4,3.2,.4),n.stoneDark,{x:0,y:6.9,z:49-1.75});for(let f=0;f<6;f++)Ue(t,f%2?n.stone:n.stoneWarm,18+f*0-f*0,.18,1.2,0,.18+0+f*0,49-4.6-f*.5,0,.02);for(const f of[-7,7])Ue(t,n.stoneDark,1.5,3.2,.25,f,4,49-1.7,0,.04),Jr(t,n,f,1.3,49-4.2,Math.PI,.8);qt(t,n.brass,1.15,1.15,.25,0,11.9,49-2.3,28),t.add(new he(1.1,.1,8,36),n.brass,{x:0,y:11.9,z:49-2.45}),ut(t,n.darkSteel,[0,11.9,49-2.5],[.6,12.4,49-2.5],.04),ut(t,n.darkSteel,[0,11.9,49-2.5],[-.15,12.9,49-2.5],.035);for(const f of[-13.4,13.4])ut(t,n.steel,[f,1.3,45],[f,11.3,45],.08),Ue(t,f<0?i:a,2,1.2,.05,f+(f<0?1.1:-1.1),10.4,45,0,.005)}qt(t,n.stoneDark,3.6,3.8,.6,0,1.55,r+3,28),qt(t,n.stone,3.3,3.5,.4,0,2.15,r+3,28),qt(t,n.stoneWarm,.45,.7,2.4,0,3,r+3,12),qt(t,n.stone,1.7,1.4,.3,0,4,r+3,22),qt(t,n.stoneWarm,.2,.4,1.4,0,4.9,r+3,10);for(let d=0;d<6;d++){const f=d/6*Math.PI*2;t.add(new Se(.28,12,8),n.brass,{x:Math.cos(f)*.75,y:6,z:r+3+Math.sin(f)*.75}),ut(t,n.brass,[0,5.6,r+3],[Math.cos(f)*.75,6,r+3+Math.sin(f)*.75],.035)}const c=Ka({depth:.6}),l=new V(new we(3.15,3.15,.05,30),c);if(l.position.set(0,2.38,r+3),l.userData.isLandscapeStage=!0,s.add(l),e.stalls)for(const d of[-12,0,12]){for(let u=0;u<4;u++){qt(t,n.wood,.34,.26,.28,d-2.6+u*1.5,3,35+.7,14);for(let h=0;h<5;h++)t.add(new Se(.12,8,6),ss([14240573,15903035,8042056,14707599][(u+h)%4],.55,0),{x:d-2.6+u*1.5+(h-2)*.1,y:3.22+h%2*.04,z:35+.7+(h*7%3-1)*.1})}for(let u=0;u<4;u++)qt(t,cs([13191741,3104138,14266954,5077589][u]),.2,.2,1.2,d+3,1.9+u*0,35-1.1+u*.4,12);ut(t,n.brass,[d-.5,3.5,35+.9],[d-.5,3,35+.9],.03),t.add(new he(.2,.025,6,14,Math.PI),n.brass,{x:d-.5,y:3.5,z:35+.9,rz:Math.PI});for(let u=0;u<8;u++)t.add(new Se(.1,8,6),n.lampGlass,{x:d-3.4+u*1,y:4.8+Math.sin(u*.8)*.12-0,z:35-2.3});for(const u of[-1,1]){Ue(t,n.woodDark,.1,3,.1,d+u*3.9,1.4+1.5,35+.4,0,.01);for(const h of[2.2,3])Ue(t,n.wood,.8,.06,.5,d+u*3.9,h,35+.4,0,.01)}}for(const[d,f,u]of[[-14,r+6,0],[14,r+6,0],[-6,r+8,Math.PI],[6,r+8,Math.PI]]){Ue(t,n.woodDark,2.2,.12,.7,d,1.8,f,u,.02),Ue(t,n.woodDark,2.2,.5,.1,d,2.2,f-.3*Math.cos(u),u,.02);for(const h of[-.9,.9])Ue(t,n.darkSteel,.1,.4,.6,d+h,1.6,f,u,.02)}for(const d of[-15,-7.5,7.5,15])L0(t,n,d,1.35,r-7.5,3.8);for(const[d,f]of[[-17,r+1],[17,r+1]]){qt(t,n.stoneDark,1,1.15,.9,d,1.8,f,12);const u=ks(.85);u.position.set(d,2.25,f),s.add(u)}Ue(t,n.woodDark,.15,2.4,.15,-9,2.6,r-8.5,0,.02),Ue(t,n.woodDark,.15,2.4,.15,-6,2.6,r-8.5,0,.02),Ue(t,n.wood,3.4,1.3,.1,-7.5,3.3,r-8.5,0,.02);for(let d=0;d<8;d++)Ue(t,n.paper,.6,.4,.02,-8.8+d%4*.82,3+Math.floor(d/4)*.55,r-8.58,(o()-.5)*.15,.005);return s}function wM(t,n,e,o){const s=new Xe,i=38,a=[cs(13191741),cs(14266954),cs(4160140),cs(9067176)];for(let f=0;f<18;f++){const u=f/18*Math.PI*2,h=Math.cos(u)*9,p=i+Math.sin(u)*9;if(Ue(t,n.stoneDark,.9,.1,.16,h,1.18+f%3*0,p,-u,.01),f%3===0){Ue(t,n.stone,1,2.4,.45,h*1.12,1.4,i+(p-i)*1.12,-u+Math.PI/2,.08);const x=new V(new Ye(.12,.9,.02),o);x.position.set(h*1.12-Math.sin(u)*0,1.6,i+(p-i)*1.12),x.rotation.y=-u+Math.PI/2,x.userData.isLandscapeBeacon=!0,s.add(x)}}for(let f=0;f<6;f++){const u=f/6*Math.PI*2+.3,h=Math.cos(u)*5.6,p=i+Math.sin(u)*5.6;Ue(t,n.woodDark,2.2,.14,.6,h,.95,p,-u+Math.PI/2,.02),Ue(t,n.woodDark,2.2,.5,.08,h-Math.cos(u)*.3,1.3,p-Math.sin(u)*.3,-u+Math.PI/2,.02);for(const x of[-.9,.9])Ue(t,n.darkSteel,.1,.5,.5,h+Math.sin(u)*x,.7,p-Math.cos(u)*x,-u+Math.PI/2,.02)}for(let f=0;f<14;f++)Ue(t,f%2?n.paveA:n.paveB,1.6,.08,1.1,f%2?.3:-.3,.64,25+f*.55,.05*(f%3),.01);for(let f=0;f<24;f++){const u=e()*Math.PI*2,h=3.2+e()*6;for(const p of yf(.7+e()*.5,"low"))t.add(p.geometry,p.material,{x:Math.cos(u)*h,y:.45,z:i+Math.sin(u)*h,ry:e()*6.28,sy:.5})}for(let f=0;f<70;f++){const u=e()*Math.PI*2,h=2.5+e()*8.5,p=11+e()*9,x=Math.cos(u)*h,m=i+Math.sin(u)*h,g=1.2+e()*2.2;ut(t,n.wood,[x,p,m],[x,p-g,m],.012);const v=a[f%4];t.add(new Qe(.22,.7+e()*.4),v,{x,y:p-g-.25,z:m,ry:e()*3.14}),f%3===0&&Ue(t,n.wood,.3,.46,.03,x+.2,p-g*.5,m,e()*3.14,.01)}const r=16,c=i-6;Ue(t,n.stoneDark,3.4,.5,3.4,r,.85,c,0,.05);for(const f of[-1.3,1.3])for(const u of[-1.3,1.3])qt(t,n.woodDark,.14,.17,2.6,r+f,2.4,c+u,10);t.add(Mn(2.7,.3,.05,4),n.terracottaRoof,{x:r,y:3.7,z:c,ry:Math.PI/4}),t.add(new xt(2.4,1.1,4),n.terracottaRoof,{x:r,y:4.5,z:c,ry:Math.PI/4}),qt(t,n.stone,.4,.5,.8,r,1.5,c,10),qt(t,n.lampGlass,.14,.12,.3,r,2.1,c,8);const l=-15,d=i+6;return ut(t,n.woodDark,[l-1.4,.6,d],[l-.9,5.2,d],.1),ut(t,n.woodDark,[l+1.4,.6,d],[l+.9,5.2,d],.1),ut(t,n.woodDark,[l-1,5.1,d],[l+1,5.1,d],.11),ut(t,n.wood,[l-.4,5,d],[l-.4,1.4,d],.015),ut(t,n.wood,[l+.4,5,d],[l+.4,1.4,d],.015),Ue(t,n.wood,.9,.06,.3,l,1.35,d,0,.01),s}const so=(t,n=.85,e=.02,o={})=>{const s=new ge({color:t,roughness:n,metalness:e,...o});return s.fog=!1,s};function Ws(t,n=32){return new Ga(t.map(([e,o])=>new ot(e,o)),n)}function Ma(t,n,e,o,s,i,a){t.add(le(a*3,a*.7,a*3,.05),n.stoneDark,{x:e,y:o+a*.35,z:s}),t.add(et(a*.82,a,i,24),n.stone,{x:e,y:o+a*.7+i/2,z:s});for(let r=0;r<12;r++){const c=r/12*Math.PI*2;t.add(et(a*.045,a*.045,i*.92,4),n.stoneDark,{x:e+Math.cos(c)*a*.9,y:o+a*.7+i/2,z:s+Math.sin(c)*a*.9})}t.add(new he(a*.84,a*.07,6,24),n.stoneDark,{x:e,y:o+a*.7+i-a*.2,z:s,rx:Math.PI/2}),t.add(et(a*1.3,a*.82,a*.5,24),n.stoneWarm,{x:e,y:o+a*.7+i+a*.25,z:s}),t.add(le(a*3,a*.45,a*3,.04),n.stoneDark,{x:e,y:o+a*.7+i+a*.72,z:s})}function bM(t,n,e){const o=new Xe;o.name="harbor-hub";const s=Kn(),i=new On,a=Yi(202),r=so(15261639,.9,0,{side:qe}),c=so(7031347,.8),l=so(12073778,.7),d=new Qe(78,42,78,42);d.rotateX(-Math.PI/2);const f=d.attributes.position;for(let b=0;b<f.count;b++){const T=f.getX(b),_=f.getZ(b);f.setY(b,Math.sin(T*.45+_*.3)*.07+Math.cos(T*.21-_*.52)*.06)}d.computeVertexNormals();const u=Ka({ramp:{z0:-21,z1:21,near:.35,far:7},deepColor:868171}),h=so(9425108,.4,.05,{transparent:!0,opacity:.55}),p=new V(d,u);p.position.set(0,.52,39),p.userData.isLandscapeStage=!0,p.userData.noLandscapeShadow=!0,o.add(p),i.add(le(66,1.1,5.2,.08),s.stoneDark,{y:.45,z:29.4}),i.add(le(66.6,.22,5.6,.05),s.stone,{y:1.56,z:29.4});for(let b=0;b<44;b++)i.add(le(.04,.9,.06,.01),s.slate,{x:-32.5+b*1.5,y:.5,z:26.82});for(let b=0;b<12;b++){const T=-30+b*5.45;i.add(et(.14,.18,.5,12),s.darkSteel,{x:T,y:1.78,z:27.3}),i.add(et(.22,.14,.1,12),s.darkSteel,{x:T,y:2.28,z:27.3})}for(const b of[-26,0,26]){for(let T=0;T<20;T++)i.add(le(8.5,.1,.62,.015),T%2?s.wood:s.woodDark,{x:b,y:1.48,z:29.6+T*.7});for(const T of[-1,1]){i.add(le(.26,.3,14,.03),s.woodDark,{x:b+T*4.1,y:1.28,z:36.2});for(let _=0;_<4;_++){const S=31+_*3.8;i.add(et(.18,.2,2.3,10),s.woodDark,{x:b+T*4.1,y:.5,z:S}),i.add(new he(.2,.05,6,14),s.wood,{x:b+T*4.1,y:1,z:S,rx:Math.PI/2})}}}for(const b of[-26,0,26])i.add(et(.07,.09,2.6,8),s.darkSteel,{x:b,y:1.5,z:42.6}),i.add(et(.2,.26,.5,8),s.lampGlass,{x:b,y:4,z:42.6}),i.add(new xt(.34,.3,8),s.darkSteel,{x:b,y:4.45,z:42.6});for(const[b,T]of[-23,23].entries()){const _=b===0?37.2:42.1,S=new Tn;S.moveTo(-5.3,.55),S.quadraticCurveTo(-5.9,.5,-5,.1),S.lineTo(-3.8,-.8),S.lineTo(3.8,-.8),S.quadraticCurveTo(5.3,-.2,5.8,.55),S.closePath();const E=new Fn(S,{depth:2.2,bevelEnabled:!0,bevelSegments:2,bevelSize:.1,bevelThickness:.08});E.translate(0,0,-1.1),i.add(E,c,{x:T,y:1,z:_,ry:Math.PI/2}),i.add(le(.14,.14,10.8,.02),l,{x:T+1.12,y:1.55,z:_}),i.add(le(.14,.14,10.8,.02),l,{x:T-1.12,y:1.55,z:_});for(let C=0;C<14;C++)i.add(le(2.1,.06,.55,.01),C%2?s.wood:s.woodDark,{x:T,y:1.62,z:_-4.6+C*.72});i.add(le(1.2,.8,1.6,.04),s.wood,{x:T,y:1.66,z:_-2.6}),i.add(le(1.3,.08,1.7,.02),s.woodDark,{x:T,y:2.5,z:_-2.6}),i.add(et(.07,.12,6.4,10),s.woodDark,{x:T,y:1.6,z:_}),i.add(et(.05,.05,3.4,8),s.woodDark,{x:T,y:4.6,z:_-.1,rx:Math.PI/2});const A=new Qe(3.2,3.9,8,8),R=A.attributes.position;for(let C=0;C<R.count;C++)R.setZ(C,Math.cos(R.getX(C)/3.2*Math.PI)*.35);A.computeVertexNormals(),i.add(A,b===0?r:so(12571880,.9,0,{side:qe}),{x:T,y:4.2,z:_,ry:Math.PI/2}),i.add(Nt([T,7.9,_],[T,1.6,_-5.3],.012,4),s.steel),i.add(Nt([T,7.9,_],[T,1.6,_+5.5],.012,4),s.steel)}const x=51.2;i.add(le(17.5,9.6,1.2,.08),s.stoneWarm,{y:0,z:x});for(let b=1;b<12;b++)i.add(le(17.6,.05,1.22,.01),s.stoneDark,{y:b*.8,z:x});for(const b of[-8.5,8.5])i.add(le(1.6,.8,1.9,.06),s.stoneDark,{x:b,y:0,z:x-.55}),i.add(et(.62,.78,8.2,20),s.stone,{x:b,y:.8,z:x-.55}),i.add(le(1.8,.6,2,.06),s.stoneDark,{x:b,y:9,z:x-.55});i.add(le(18.6,.7,2.1,.06),s.stoneDark,{y:9.6,z:x-.2}),i.add(ao(18.2,2.8,1.2),s.stone,{y:10.3,z:x-.2});for(let b=0;b<6;b++)i.add(le(.34,.34,.14,.02),s.stoneDark,{x:-7.5+b*3,y:9.35,z:x-1.28});for(const b of[-5.2,0,5.2])i.add(le(4.6,4.8,.3,.05),s.stoneDark,{x:b,y:2.2,z:x-.7}),i.add(le(4.2,4.4,.2,.04),s.slate,{x:b,y:2.4,z:x-.8}),i.add(new we(2.1,2.1,.2,24,1,!1,0,Math.PI),s.slate,{x:b,y:6.8,z:x-.8,rx:Math.PI/2});i.add(le(17.6,.5,1.4,.05),s.brass,{y:8.7,z:x-.75});for(let b=0;b<4;b++)i.add(le(5.2-b*.2,.16,.5,.02),s.stone,{x:0,y:0+b*.16,z:x-2.2-b*.2});const m=0,g=58.2,v=so(12073778,.7);i.add(et(2.1,2.5,.8,32),s.stoneDark,{x:m,y:0,z:g});let w=.8;for(let b=0;b<6;b++)i.add(et(1.65-b*.07-.07,1.65-b*.07+0,1.05,32),b%2?v:s.stone,{x:m,y:w,z:g}),w+=1.05;i.add(et(2,1.45,.3,36),s.stoneDark,{x:m,y:w,z:g});for(let b=0;b<20;b++){const T=b/20*Math.PI*2;i.add(Nt([m+Math.cos(T)*1.9,w+.3,g+Math.sin(T)*1.9],[m+Math.cos(T)*1.9,w+1,g+Math.sin(T)*1.9],.025,4),s.steel)}i.add(new he(1.9,.03,5,36),s.steel,{x:m,y:w+1,z:g,rx:Math.PI/2}),i.add(et(1.05,1.1,1.1,24),s.glass,{x:m,y:w+.3,z:g});for(let b=0;b<8;b++){const T=b/8*Math.PI*2;i.add(Nt([m+Math.cos(T)*1.08,w+.3,g+Math.sin(T)*1.08],[m+Math.cos(T)*1.08,w+1.4,g+Math.sin(T)*1.08],.04,5),s.darkSteel)}i.add(et(1.35,1.15,.15,28),s.darkSteel,{x:m,y:w+1.4,z:g}),i.add(new xt(1.35,.8,28),v,{x:m,y:w+1.95,z:g}),i.add(Nt([m,w+2.3,g],[m,w+3,g],.03,4),s.steel);for(let b=0;b<10;b++){const T=-28+a()*56;a()>.5?i.add(et(.4,.4,.9,16),s.woodDark,{x:T,y:1.68,z:28.2+a()*1.4}):i.add(le(.8,.7,.8,.04),s.wood,{x:T,y:1.68,z:28.2+a()*1.4,ry:a()*3})}vM(i,s,a),i.build(o,"harbor-hub",{isLandscapeStage:!0});for(const[b,T]of[-18,-6,6,18].entries()){const _=new V(new Mo(.36+b%2*.08,0),t);_.position.set(T,3.5+b%2*.45,40),_.userData.isLandscapeBeacon=!0,o.add(_);const S=new V(new we(1.1,1.4,1.1,24),s.stoneDark);S.position.set(T,1,40.2),S.castShadow=!0,S.userData.isLandscapeStage=!0,o.add(S);const E=new V(new Ye(1,1.4+b%2*.4,.2),b%2?n:s.stone);E.position.set(T,2.5,40.2),E.castShadow=!0,E.userData.isLandscapeStage=!0,o.add(E)}for(const b of[-26,0,26]){const T=new V(new he(.3,.06,6,16),n);T.rotation.x=Math.PI/2,T.position.set(b+3.45,1.62,37.8),T.userData.isLandscapeRing=!0,o.add(T)}const M=new V(new Se(.62,20,14),t);M.position.set(m,w+.9,g),M.userData.isLandscapeBeacon=!0,o.add(M);const y=new V(new he(1.7,.08,7,36),n);y.rotation.x=Math.PI/2,y.position.set(m,w+.9,g),y.userData.isLandscapeRing=!0,o.add(y);for(const[b,T]of[[-31,31],[-15,46],[15,46],[31,31]]){const _=new V(new he(2.8,.08,6,32),h);_.rotation.x=Math.PI/2,_.position.set(b,.66,T),_.userData.isLandscapeRing=!0,o.add(_)}if(e){const b=new V(new Qe(14.8,2.78),new Tt({map:e,side:qe,toneMapped:!1}));b.position.set(0,7.7,x-1.1),b.rotation.y=Math.PI,o.add(b)}return o}function SM(t,n){const e=new Xe;e.name="memory-tree-hub";const o=Yi(303),s=B5();s.position.set(0,0,38),e.add(s);const i=t.clone();i.emissiveIntensity=1.4;for(let c=0;c<26;c++){const l=o()*Math.PI*2,d=4+o()*7,f=21+(o()-.2)*9,u=new V(new Se(.55+o()*.4,14,10),i);u.position.set(Math.cos(l)*d,f,38+Math.sin(l)*d),u.userData.isLandscapeBeacon=!0,e.add(u)}const a=Kn(),r=new On;for(let c=0;c<18;c++){const l=c/18*Math.PI*2;r.add(le(1.8+o()*.6,.8,1.2,.12),c%2?a.stone:a.stoneDark,{x:Math.cos(l)*9,y:.3+o()*.2,z:38+Math.sin(l)*9,ry:-l})}for(let c=0;c<7;c++){const l=o()*Math.PI*2,d=(.7+o()*.9)/.55;r.add(os(1+c*.11).geometry,m0(),{x:Math.cos(l)*(11+o()*4),y:-.04*d,z:38+Math.sin(l)*(11+o()*4),sx:d,sy:d*.85,sz:d,ry:o()*6.28})}e.add(wM(r,a,o,t)),r.build(e,"memory-tree-ring",{isLandscapeStage:!0});for(const c of[-31,31]){const l=new V(new he(4,.16,8,48),n);l.rotation.x=Math.PI/2,l.position.set(c,.9,36),l.userData.isLandscapeRing=!0,e.add(l)}return e}function yM(t,n){const e=new Xe;e.name="idea-temple-hub";const o=Kn(),s=new On,i=40;s.add(le(30,.4,19,.07),o.stoneDark,{y:.6,z:i}),s.add(le(28.2,.4,17.4,.06),o.stone,{y:1,z:i}),s.add(le(26.6,.4,16,.06),o.stoneWarm,{y:1.4,z:i});const a=1.8;for(let p=0;p<4;p++)s.add(le(9,.2,1.4,.04),o.stoneWarm,{x:0,y:.6+p*.4,z:i-9.6-(3-p)*.6});const r=9.6,c=.95,l=[-10.4,-6.24,-2.08,2.08,6.24,10.4];for(const p of l)Ma(s,o,p,a,i-6.2,r,c),Ma(s,o,p,a,i+6.2,r,c);for(const p of[-10.4,10.4])for(const x of[i-2.07,i+2.07])Ma(s,o,p,a,x,r,c);const d=a+c*.7+r+c*.95+0;s.add(le(23.2,1.3,14,.08),o.stoneWarm,{y:d,z:i});for(let p=0;p<24;p++)s.add(le(.4,.9,.18,.03),o.stoneDark,{x:-11+p*.96,y:d+.2,z:i-7.05});s.add(le(24.4,.5,15.3,.06),o.stone,{y:d+1.3,z:i}),s.add(ao(24.2,3.6,1.2),o.stone,{y:d+1.8,z:i-6.9}),s.add(ao(24.2,3.6,1.2),o.stone,{y:d+1.8,z:i+6.9}),s.add(ao(19.8,2.7,.3),o.slate,{y:d+2.2,z:i-7.4}),s.add(ao(25,3.7,15.2),o.stoneWarm,{y:d+1.85,z:i}),s.add(ao(24.4,3.3,15.4),o.terracottaRoof,{y:d+1.95,z:i}),s.add(le(25.6,.4,.5,.06),o.stone,{y:d+5.2,z:i}),s.add(le(16.4,r,9.4,.06),o.stone,{y:a,z:i}),s.add(le(2.4,4.2,.4,.05),o.slate,{y:a,z:i-4.75}),s.add(le(2.9,.3,.6,.04),o.stoneDark,{y:a+4.2,z:i-4.8});for(const p of[-1,1])for(const x of[-5,5])s.add(le(1.4,2.4,.3,.04),o.slate,{x,y:a+3.2,z:i-4.75+(p>0,0)});for(const p of[-1,1])s.add(et(.5,.2,1.1,14),o.brass,{x:p*3.4,y:a,z:i-8.2}),s.add(et(.75,.5,.35,16),o.brass,{x:p*3.4,y:a+1.1,z:i-8.2});e.add(xM(s,o,Yi(404))),s.build(e,"idea-temple",{isLandscapeStage:!0});const f=new V(new we(1.1,1.1,.12,28),t);f.rotation.x=Math.PI/2,f.position.set(0,d+3,i-7.58),e.add(f);const u=new V(new Mo(1.3,1),t);u.position.set(0,d+6.6,i),u.userData.isLandscapeBeacon=!0,e.add(u);const h=new V(new he(8,.18,8,56),n);h.rotation.x=Math.PI/2,h.position.set(0,d+5.4,i),h.userData.isLandscapeRing=!0,e.add(h);for(const p of[-1,1]){const x=new V(new Ns(.42,1),t);x.position.set(p*3.4,a+1.7,i-8.2),x.userData.isLandscapeBeacon=!0,e.add(x)}return e}function ud(t,n,e=!0){const o=new Xe;o.name="launch-complex";const s=Kn(),i=new On,a=so(15659508,.4,.3),r=so(12663602,.45,.3),c=so(2765112,.5,.6),l=40,d=1.4;i.add(Mn(14.6,.5,.05,8),s.stoneDark,{y:.6,z:l}),i.add(Mn(13.4,.35,.04,8),s.slate,{y:1.1,z:l}),i.add(Mn(10,.15,.03,8),s.stone,{y:1.45,z:l});for(let v=0;v<16;v++){const w=v/16*Math.PI*2;i.add(le(1.5,.04,.5,.01),v%2?s.brass:s.darkSteel,{x:Math.cos(w)*12.4,y:1.47,z:l+Math.sin(w)*12.4,ry:-w})}i.add(le(4.2,.1,5.2,.03),s.darkSteel,{y:1.62,z:l});const f=0,u=d+.4;i.add(Ws([[0,0],[1.1,0],[1.5,.2],[1.55,1.6]],40),c,{x:f,y:u,z:l}),i.add(Ws([[1.55,0],[1.6,4.4]],40),a,{x:f,y:u+1.6,z:l}),i.add(Ws([[1.6,0],[1.6,.9]],40),r,{x:f,y:u+6,z:l}),i.add(Ws([[1.6,0],[1.55,2.6]],40),a,{x:f,y:u+6.9,z:l}),i.add(Ws([[1.55,0],[1.3,1.2],[.9,2.6],[.45,3.8],[0,4.6]].map(([v,w])=>[v,w]),40),a,{x:f,y:u+9.5,z:l}),i.add(Ws([[.45,0],[.5,.5]],20),r,{x:f,y:u+13.5,z:l});const h=new Tn;h.moveTo(0,0),h.lineTo(2.2,-.6),h.lineTo(2.2,1.4),h.lineTo(0,3.4),h.closePath();const p=new Fn(h,{depth:.14,bevelEnabled:!0,bevelThickness:.03,bevelSize:.03,bevelSegments:1});p.translate(0,0,-.07);for(let v=0;v<4;v++){const w=v/4*Math.PI*2+Math.PI/4;i.add(p,r,{x:f+Math.cos(w)*1.5,y:u+1.2,z:l+Math.sin(w)*1.5,ry:-w})}for(let v=0;v<4;v++){const w=v/4*Math.PI*2;i.add(new we(.25,.4,.7,14,1,!0),c,{x:f+Math.cos(w)*.65,y:u-.35,z:l+Math.sin(w)*.65})}for(const v of[11.1,11.9])i.add(new he(.2,.05,8,18),s.steel,{x:f,y:u+v-2,z:l-1.5,rx:0});if(e){const M=[];for(const[b,T]of[[-.7,-.7],[.7,-.7],[-.7,.7],[.7,.7]])M.push([[6.8+b,d,l+T],[6.8+b*.8,d+17,l+T*.8]]),i.add(Nt(M[M.length-1][0],M[M.length-1][1],.09,8),s.steel);const y=11;for(let b=0;b<=y;b++){const T=b/y,_=(E,A)=>[M[E][0][0]+(M[E][1][0]-M[E][0][0])*A,M[E][0][1]+(M[E][1][1]-M[E][0][1])*A,M[E][0][2]+(M[E][1][2]-M[E][0][2])*A],S=[0,1,3,2];for(let E=0;E<4;E++)i.add(Nt(_(S[E],T),_(S[(E+1)%4],T),.04,5),s.steel),b<y&&i.add(Nt(_(S[E],T),_(S[(E+1)%4],T+1/y),.03,4),s.steel)}for(const b of[8.5,12.5])i.add(le(5.2,.16,.5,.03),s.darkSteel,{x:6.8-2.8,y:d+b,z:l}),i.add(Nt([6.8-.8,d+b,l],[6.8-5.3,d+b-.05,l],.07,6),s.darkSteel);i.add(Nt([6.8,d+17,l],[6.8,d+17+2.4,l],.04,5),s.steel);for(const b of[-3.6,3.6])i.add(et(1.1,1.1,3.2,24),a,{x:-7.6,y:d,z:l+b}),i.add(new Se(1.1,24,12,0,Math.PI*2,0,Math.PI/2),a,{x:-7.6,y:d+3.2,z:l+b}),i.add(Nt([-6.5,d+.8,l+b],[-1.8,d+.4,l+b*.3],.1,8),s.steel);i.add(le(5.2,2.6,3.6,.08),s.stone,{x:-3,y:d,z:l+10.5}),i.add(le(5.5,.2,3.9,.04),s.slate,{x:-3,y:d+2.6,z:l+10.5}),i.add(le(4.2,.9,.1,.02),s.glass,{x:-3,y:d+1.2,z:l+8.65}),i.add(Nt([-1.4,d+2.8,l+10.5],[-1.4,d+5.2,l+10.5],.05,6),s.steel),i.add(new Se(.9,20,8,0,Math.PI*2,0,Math.PI/3),a,{x:-2.2,y:d+5,z:l+10.5,rx:-.9})}e&&_M(i,s),i.build(o,"launch-complex",{isLandscapeStage:!0});const x=new V(new Se(.38,16,12),t);x.position.set(f,u+14.3,l),x.userData.isLandscapeBeacon=!0,o.add(x);const m=new V(new he(8,.2,8,56),n);m.rotation.x=Math.PI/2.4,m.position.set(0,9,l),m.userData.isLandscapeRing=!0,o.add(m);const g=m.clone();return g.rotation.x=-Math.PI/3,g.rotation.z=Math.PI/5,o.add(g),o}function TM(t,n,e){const o=new Xe;o.name="exchange-hub";const s=Kn(),i=new On,a=Yi(606),r=38;i.add(le(32,.5,20,.06),s.stoneDark,{y:.55,z:r}),i.add(le(30.4,.3,18.4,.05),s.stone,{y:1.05,z:r});for(let l=-7;l<=7;l++)i.add(le(.04,.02,18.2,.005),s.slate,{x:l*2,y:1.36,z:r});for(let l=-4;l<=4;l++)i.add(le(30.2,.02,.04,.005),s.slate,{y:1.36,z:r+l*2});if(e.stalls)for(const l of[-12,0,12]){const f=[so(13191741,.9,0,{side:qe}),so(15853778,.9,0,{side:qe})];for(const u of[-1,1])for(const h of[-1,1])i.add(et(.1,.12,3.6,10),s.woodDark,{x:l+u*3.4,y:1.4,z:35+h*2.2});i.add(le(7.8,.14,.14,.02),s.woodDark,{x:l,y:5,z:35-2.2}),i.add(le(7.8,.14,.14,.02),s.woodDark,{x:l,y:5,z:35+2.2});for(let u=0;u<10;u++)i.add(le(.82,.05,5.4,.01),f[u%2],{x:l-3.7+u*.82,y:5.35,z:35,rx:0});i.add(le(7.2,1.3,1.5,.06),s.wood,{x:l,y:1.4,z:36}),i.add(le(7.4,.12,1.7,.03),s.woodDark,{x:l,y:2.7,z:36});for(let u=0;u<14;u++){const h=[14240573,15903035,8042056,14707599][u%4];i.add(new Se(.15,10,8),so(h,.6),{x:l-3+u%7*1,y:2.95,z:35+.65+Math.floor(u/7)*.5})}i.add(le(1.2,.9,.9,.05),s.wood,{x:l+2.6,y:1.4,z:35-1.2,ry:a()*2}),i.add(et(.45,.45,.95,16),s.woodDark,{x:l-2.6,y:1.4,z:35-1.2})}if(e.ledger){i.add(le(21,12.4,3.6,.08),s.stoneWarm,{y:1.3,z:49});for(let d=1;d<15;d++)i.add(le(21.1,.05,3.62,.01),s.stoneDark,{y:1.3+d*.8,z:49});for(const d of[-9,-4.5,0,4.5,9])Ma(i,s,d,1.3,49-2.7,8.6,.45);i.add(le(22,1,2.2,.06),s.stone,{y:10.2,z:49-2.5}),i.add(le(22.8,.5,4.2,.06),s.stoneDark,{y:13.7,z:49}),i.add(ao(22.4,2.4,1.2),s.stone,{y:14.2,z:49-1.2}),i.add(le(11.2,7,.3,.06),s.slate,{y:3.2,z:49-1.6});for(let d=-3;d<=3;d++)i.add(le(7.5,.08,.12,.01),s.brass,{y:5+d*.7-1.3,z:49-1.85});i.add(le(13,.4,.4,.05),s.brass,{y:10.3,z:49-3.7})}if(o.add(MM(i,s,e,a)),i.build(o,"exchange-hub",{isLandscapeStage:!0}),e.ledger){const l=new V(new Ye(10.4,6.4,.18),t);l.position.set(0,6,49-1.78),l.castShadow=!1,o.add(l)}if(e.stalls)for(const l of[-12,0,12]){const d=new V(new Se(.28,14,10),t);d.position.set(l,4.6,33),d.userData.isLandscapeBeacon=!0,o.add(d)}const c=new V(new he(2.4,.07,8,48),n);return c.rotation.x=Math.PI/2,c.position.set(0,1.5,r+4),c.userData.isLandscapeRing=!0,o.add(c),o}const EM={unit01:{section_a:["message","dialogue","focus","listening-bench"],section_b:["notification","study-desk","filter","offline-rest"],section_c:["clinic","telemedicine","community","community-network"]},unit02:{section_a:["timeline","route-evidence","perseverance","legacy"],section_b:["spotlight","humanitarian","lasting-service","community-witness"],section_c:["fleet","peace-contact","chart-room","exchange-harbor"]},unit03:{section_a:["itinerary","detour","market-encounter","reflection-garden"],section_b:["hostel","open-route","rain-shelter","confidence"],section_c:["rail-platform","rail-car","landscape-window","route-network"]},unit04:{section_a:["career","bench","violin","work-dignity"],section_b:["caliper","craft-quality","craft-evolution","trust-bridge"],section_c:["loom","embroidery-table","heritage","living-heritage"]},unit05:{section_a:["lunar-probe","relay-bridge","sample-lab","moon-horizon"],section_b:["test-console","orbit-adjustment","systems-simulation","mission-control"],section_c:["training","crew-simulation","science-exhibit","future-frontier"]},unit06:{section_a:["bookshop","exchange","resilience","budget-board"],section_b:["exchange-wall","resource-cycle","trust-ledger","sustainable-market"],section_c:["library","digital-lending","community-library","knowledge-bridge"]}};function AM(t,n,e,o,s="high"){const i=new Xe;i.name=["unit-landscape",t.id,e??"hub"].join("-");const a=PM(t,e),r=new oe(a.accent),c=new oe(a.secondary),l=new oe(...t.terrainTint);l.multiplyScalar(.88);const d=new ge({color:l,roughness:.72,metalness:.16}),f=new ge({color:3426398,roughness:.84,metalness:.12}),u=new ge({color:c,emissive:c,emissiveIntensity:1.2,roughness:.2,metalness:.36}),h=new ge({color:r,emissive:r,emissiveIntensity:.75,roughness:.18,metalness:.42});if(f.fog=!1,u.fog=!1,h.fog=!1,An(e)&&(u.emissiveIntensity=.56,h.emissiveIntensity=.42,f.color.set(4610672),f.roughness=.86,f.metalness=.08),An(e)?RM(i,a.route,h):(i.add(c4(u,h,{tint:t.crystalColor,greenery:t.decorStyle!=="space"})),i.add(mM())),An(e)){const x=new Xe;hd(x,e,o,d,f,u,h,r,t.id,s),x.scale.setScalar(.9),x.position.set(0,1.8,-15),i.add(x)}else hd(i,e,o,d,f,u,h,r,t.id,s)||IM(i,e,d,f,u,h);An(e)||DM(i,e,o,a.accent);const p=new Xe;switch(t.decorStyle){case"coast":LM(p,f,u,h,An(e));break;case"market":t.id==="unit02"&&/^section_b-world-\d+$/.test(e??"")?kM(p,h):NM(p,d,f,u,h);break;case"forest":UM(p,d,u,h,An(e));break;case"temple":FM(p,d,f,u,h,An(e));break;case"space":OM(p,f,u,h,An(e));break;case"exchange":zM(p,d,f,u,h,An(e),e);break;default:BM(p,d,f,u,h);break}return An(e)?(p.scale.setScalar(t.focusedLandscapeScale??.72),p.position.z=t.focusedLandscapeOffsetZ??14):(p.scale.setScalar(.62),p.position.z=1.5),i.add(p),hM(i),i.traverse(x=>{const m=x instanceof V&&!x.userData.noLandscapeShadow;x.castShadow=m,x.receiveShadow=m&&!An(e)}),i}function An(t){return!!(t&&(/^section_[abc]-world-\d+$/.test(t)||/^lab-vocab-\d+$/.test(t)||["lab-grammar","lab-cloze","lab-translation","project-reading","project-listening","project-writing","project-memory"].includes(t)))}function RM(t,n,e){for(let o=0;o<5;o++){const s=1.8+o*2.1,i=.54+o*.32,a=u4(n);a.position.set(o%2===0?-.28:.28,i,s),a.rotation.y=o%2===0?-.035:.035,t.add(a);const r=new V(new Mo(.34,0),e);r.position.set(0,i+.42,s),r.userData.isLandscapeBeacon=!0,t.add(r)}}function PM(t,n){if(!n||n==="hub")return{accent:t.crystalColor,secondary:t.orbColor,route:t.pathColor};const e=n.match(/^(section_[abc])-world-(\d+)$/);if(e){const c={section_a:[{accent:6478079,secondary:12120575,route:2918143},{accent:7992016,secondary:12713968,route:2329464},{accent:16762218,secondary:16769443,route:10316573},{accent:16032511,secondary:16767339,route:10247423}],section_b:[{accent:7977215,secondary:12048639,route:3633083},{accent:11903231,secondary:14735359,route:6900418},{accent:6809765,secondary:12255189,route:2656598},{accent:16760184,secondary:16768948,route:10971945}],section_c:[{accent:16743282,secondary:16761210,route:14046034},{accent:16164541,secondary:16766692,route:11555446},{accent:8185807,secondary:13041648,route:3313017},{accent:16765802,secondary:16772522,route:10384424}]}[e[1]][(Number(e[2])-1)%4];return{accent:new oe(c.accent).lerp(new oe(t.crystalColor),.66).getHex(),secondary:new oe(c.secondary).lerp(new oe(t.orbColor),.56).getHex(),route:new oe(c.route).lerp(new oe(t.pathColor),.6).getHex()}}const o=n.match(/^lab-vocab-(\d+)$/);if(o){const r=[5625599,7659696,11903231,16760425,16748445,9353215],c=r[(Number(o[1])-1)%r.length];return{accent:new oe(c).lerp(new oe(t.crystalColor),.52).getHex(),secondary:t.orbColor,route:t.pathColor}}const i={"lab-grammar":{accent:8246268,secondary:14412542,route:3766200},"lab-cloze":{accent:8703150,secondary:13761253,route:2521693},"lab-translation":{accent:12887551,secondary:15785215,route:7819445},"project-reading":{accent:16763760,secondary:16772533,route:10777384},"project-listening":{accent:7723007,secondary:12251647,route:3636647},"project-writing":{accent:16754812,secondary:16768705,route:10442550},"project-memory":{accent:13869823,secondary:15850751,route:7491766}}[n];return i?{accent:new oe(i.accent).lerp(new oe(t.crystalColor),.58).getHex(),secondary:new oe(i.secondary).lerp(new oe(t.orbColor),.5).getHex(),route:new oe(i.route).lerp(new oe(t.pathColor),.58).getHex()}:{"section-a":{accent:6478079,secondary:12120575,route:2918143},"section-b":{accent:16762218,secondary:16769443,route:10316573},"stories-of-china":{accent:16743282,secondary:16761210,route:14046034},"learning-lab":{accent:9437118,secondary:8246268,route:3257214},"unit-project":{accent:16032511,secondary:16767339,route:10247423}}[n]??{accent:t.crystalColor,secondary:t.orbColor,route:t.pathColor}}function hd(t,n,e,o,s,i,a,r,c,l){var x,m;if(!n)return!1;const d=fM[n];if(d){t.add(id(r.getHex()));const g=(w=5.2)=>{const M=new V(new Mo(1.7,1),i);return M.position.set(0,w,27),M.userData.isLandscapeBeacon=!0,t.add(M),M},v=(w,M,y=Math.PI/2)=>{const b=new V(new he(w,.1,8,64),a);return b.position.set(0,M,27),b.rotation.x=y,b.userData.isLandscapeRing=!0,t.add(b),b};return d({root:t,glow:i,edge:a,dark:s,ground:o,detail:l,accent:r.clone(),beacon:g,ring:v}),!0}const f=(g,v,w,M,y,b=0)=>{const T=new V(g,v);return T.position.set(w,M,y),T.rotation.y=b,t.add(T),T},u=(g=5.2)=>{const v=i.clone();An(n)&&(v.color.copy(r),v.emissive.copy(r),v.emissiveIntensity=.24,v.roughness=.42,v.metalness=.16);const w=f(new Mo(1.7,1),v,0,g,27);return w.userData.isLandscapeBeacon=!0,w},h=(g,v,w=Math.PI/2)=>{const M=f(new he(g,.16,8,40),a,0,v,27);return M.rotation.x=w,M.userData.isLandscapeRing=!0,M},p=n.match(/^(section_[abc])-world-(\d+)$/);if(p){const g=p[1],v=Number(p[2]),w=(e??"").split(" · ")[0],M=/connection|conversation|communication|dialogue|social/i.test(w);if(t.add(id(r.getHex())),c==="unit06"&&g==="section_a"&&v===1)return _u.bookshop({root:t,glow:i,edge:a,dark:s,ground:o,detail:l,accent:new oe(16777215),beacon:u,ring:h}),!0;const y=(m=(x=EM[c])==null?void 0:x[g])==null?void 0:m[v-1];if(y&&y!=="bookshop"&&!(y==="dialogue"&&g==="section_a"&&v===1&&M))return CM(t,y,f,o,s,i,a,u,h,l),!0;if(g==="section_a"&&v===1&&M){f(new Ye(6.2,.32,4.8),o,-1.9,4,27,-.12),f(new Ye(6.2,.32,4.8),i,1.9,4,27,.12);for(const E of[-1.9,1.9]){const A=f(new we(.24,.34,2.7,8),s,E,2.5,27);A.userData.isLandscapeStage=!0}const T=(E,A,R,C)=>{const I=new Tn;I.moveTo(-1.15,-.62),C?(I.lineTo(.22,-.62),I.lineTo(.62,-1.08),I.lineTo(.74,-.62)):(I.lineTo(-.72,-.62),I.lineTo(-.62,-1.08),I.lineTo(-.22,-.62)),I.lineTo(1.02,-.62),I.quadraticCurveTo(1.22,-.62,1.22,-.42),I.lineTo(1.22,.48),I.quadraticCurveTo(1.22,.68,1.02,.68),I.lineTo(-1.02,.68),I.quadraticCurveTo(-1.22,.68,-1.22,.48),I.lineTo(-1.22,-.42),I.quadraticCurveTo(-1.22,-.62,-1.15,-.62);const L=f(new Fn(I,{depth:.34,bevelEnabled:!0,bevelSegments:2,steps:1,bevelSize:.055,bevelThickness:.055,curveSegments:8}),R,E,A,26.7);L.userData.isLandscapeStage=!0};T(-2.1,5.6,a,!0),T(2.1,4.9,i,!1);const _=new ge({color:15857919,emissive:12183551,emissiveIntensity:.24,roughness:.34});for(const[E,A]of[[-2.1,5.6],[2.1,4.9]])for(const R of[-.38,0,.38])f(new Se(.085,8,6),_,E+R,A,26.62);const S=new V(new Zn(new Vn([new X(-.9,5.25,26.7),new X(0,4.35,26.7),new X(.9,4.55,26.7)]),20,.08,6,!1),a);S.userData.isLandscapeRoute=!0,t.add(S)}return!0}return!1}function CM(t,n,e,o,s,i,a,r,c,l){const d=_u[n];if(d){d({root:t,glow:i,edge:a,dark:s,ground:o,detail:l,accent:new oe(16777215),beacon:r,ring:c});return}const f=(x,m,g,v,w,M,y=o,b=0)=>{const T=e(new Ye(v,w,M),y,x,m,g,b);return T.userData.isLandscapeStage=!0,T},u=(x,m,g,v,w,M=o,y=10)=>{const b=e(new we(v*.86,v,w,y),M,x,m,g);return b.userData.isLandscapeStage=!0,b},h=(x,m=a,g=.12)=>{const v=new Vn(x.map(([M,y,b])=>new X(M,y,b))),w=new V(new Zn(v,28,g,8,!1),m);w.userData.isLandscapeRoute=!0,w.castShadow=!0,w.receiveShadow=!0,t.add(w)},p=(x,m,g=o,v=27,w=0)=>{f(w-x/2,m/2,v,.52,m,.62,g),f(w+x/2,m/2,v,.52,m,.62,g),f(w,m,v,x+.52,.5,.62,g)};switch(n){case"message":{const x=new ge({color:10136465,emissive:2438958,emissiveIntensity:.24,roughness:.9,metalness:.02}),m=new ge({color:3427145,roughness:.78}),g=new ge({color:10864836,emissive:1059883,emissiveIntensity:.12,roughness:.2,metalness:.08,transparent:!0,opacity:.36,depthWrite:!1}),v=new ge({color:7756610,roughness:.88}),w=new Tn;w.moveTo(-7.9,-3.275),w.lineTo(7.9,-3.275),w.lineTo(7.9,3.275),w.lineTo(-7.9,3.275),w.closePath();for(const[F,z,G,O]of[[-4.55,.2,3.18,2.96],[4.55,.2,3.18,2.96],[0,-1.54,2.6,3.35]]){const B=new Wd;B.moveTo(F-G/2,z-O/2),B.lineTo(F-G/2,z+O/2),B.lineTo(F+G/2,z+O/2),B.lineTo(F+G/2,z-O/2),B.closePath(),w.holes.push(B)}const M=new V(new Fn(w,{depth:.42,bevelEnabled:!1}),x);M.position.set(0,4.42,30.73),M.userData.isLandscapeStage=!0,t.add(M),f(0,4.42,33.02,15.38,6.55,.42,x);for(const F of[-1,1]){const z=F*7.69;f(z,6.93,31.98,.42,1.53,2.5,x),f(z,2.11,31.98,.42,1.93,2.5,x),f(z,4.62,30.92,.42,3.08,.38,x),f(z,4.62,33.02,.42,3.08,.42,x),f(z,4.62,31.97,.035,2.82,1.68,g);for(const G of[31.1,32.84])f(z,4.62,G,.42,3.08,.1,m);for(const G of[3.13,6.11])f(z,G,31.97,.42,.12,1.84,m)}f(0,7.82,31.95,16.35,.34,2.85,m),f(0,1.28,31.9,15.5,.26,2.6,m);for(const F of[-4.55,4.55])f(F,4.62,30.72,3.5,3.28,.16,m),f(F,4.62,30.6,3.18,2.96,.08,g),f(F,4.62,30.53,.12,2.96,.06,a),f(F,4.62,30.53,3.18,.12,.06,a),f(F,4.62,30.53,.1,2.96,.06,m),f(F,4.62,30.53,3.18,.1,.06,m);const y=new ge({color:5719608,roughness:.88}),b=new Gn(new Ye(2.8,.075,.42),y,6),T=new Gn(new Ye(.3,.72,.26),new ge({color:16777215,roughness:.84}),30),_=new Wi,S=[3.35,4.28,5.21];let E=0,A=0;const R=[12089686,13676146,7310200,7375258,10187640,14209208];for(const F of[-4.55,4.55])for(const[z,G]of S.entries()){_.position.set(F,G,31.62),_.scale.set(1,1,1),_.rotation.set(0,0,0),_.updateMatrix(),b.setMatrixAt(E++,_.matrix);for(let O=0;O<5;O++)_.position.set(F-1.08+O*.54,G+.39,31.58),_.scale.set(.78+(z+O)%2*.12,.72+(z*2+O)%3*.14,.84),_.rotation.set(0,(O%3-1)*.035,0),_.updateMatrix(),T.setMatrixAt(A,_.matrix),T.setColorAt(A,new oe(R[(z+O*2)%R.length])),A++}b.instanceMatrix.needsUpdate=!0,T.instanceMatrix.needsUpdate=!0,T.instanceColor&&(T.instanceColor.needsUpdate=!0),b.castShadow=!0,T.castShadow=!0,t.add(b,T),f(0,4.82,29.78,4.9,.2,1.4,m);for(const F of[-2.18,2.18])f(F,3.05,29.78,.16,3.4,.18,m);for(const F of[-7.1,-2.68,2.68,7.1])f(F,4.62,30.48,.14,3.02,.22,m);f(0,2.88,30.62,2.6,3.35,.2,m),f(-.62,2.72,30.47,1.08,2.98,.08,g),f(.62,2.72,30.47,1.08,2.98,.08,g),f(0,2.72,30.4,.1,2.98,.06,a),f(.38,2.72,30.35,.08,.12,.08,v),f(0,1.18,29.95,3.5,.22,1.2,v);const C=document.createElement("canvas");C.width=1024,C.height=192;const I=C.getContext("2d");if(I){I.fillStyle="#263e3b",I.fillRect(0,0,C.width,C.height),I.strokeStyle="#d6c19a",I.lineWidth=8,I.strokeRect(12,12,C.width-24,C.height-24),I.fillStyle="#f4edda",I.textAlign="center",I.textBaseline="middle",I.font="bold 66px Arial, sans-serif",I.fillText("CAMPUS LIBRARY",512,98);const F=new Zt(C);F.colorSpace=yt;const z=new V(new Qe(4.4,.82),new Tt({map:F,side:qe,toneMapped:!1}));z.position.set(0,6.9,30.55),z.rotation.y=Math.PI,t.add(z)}for(const F of[-2.05,2.05]){f(F,1.72,25.9,3.05,.24,.68,v),f(F,2.18,26.18,3.05,.78,.16,v);for(const z of[F-1.2,F+1.2])f(z,1.38,25.9,.12,.62,.14,m),f(z,1.84,26.18,.12,.72,.14,m);for(const z of[F-1.43,F+1.43])f(z,2,25.9,.14,.36,.68,m),f(z,2.2,25.9,.22,.1,.76,v)}const L=[-2.55,-1.55,1.55,2.55],N=[{shirt:7374743,hair:3156260,skin:14200202,trousers:3425363,style:"short"},{shirt:10252382,hair:3484968,skin:10250316,trousers:5851456,style:"long"},{shirt:5861225,hair:4338731,skin:13078128,trousers:4545364,style:"bun"},{shirt:9077097,hair:2566704,skin:14728094,trousers:5131350,style:"short"}];for(const[F,z]of L.entries()){const G=N[F],O=xa({shirt:G.shirt,hair:G.hair,hairStyle:G.style,skin:G.skin,trousers:G.trousers,seated:!0,pose:"phone",lean:.08,scale:1.6});O.position.set(z,1.84,25.98),O.rotation.y=Math.PI,t.add(O)}for(const[F,z,G]of[[-2.9,5.15,1.25],[0,5.75,1.45],[2.9,5.15,1.25]]){f(F,z,25.2,G,.68,.12,s,F*.035),f(F,z+.1,25.11,G*.62,.08,.06,a,F*.035);const O=e(new Se(.09,8,6),i,F+G*.34,z+.29,25.08);O.userData.isLandscapeBeacon=!0}h([[-2.15,5.12,25.14],[0,5.7,25.14],[2.15,5.12,25.14]],i,.06),h([[0,1.24,34],[0,1.28,31],[0,1.28,28],[0,1.34,26.8]],a,.1);for(const F of[-6.35,6.35]){u(F,1.43,27.65,.48,.46,v,8),u(F,2.75,27.65,.1,2.55,m,8);const z=[[-.34,3.55,.72],[.28,3.82,.8],[0,4.38,.72]].map(([O,B,J],ue)=>js(61+ue+(F>0?7:0),J*.82,110).translate(O,B,0)),G=e(Wn(z,!1),po(),F,0,27.65);for(const O of z)O.dispose();G.castShadow=!0,ls(G,po()),G.userData.isLandscapeStage=!0}const U=new ro(16766875,.72,16,2);U.position.set(0,5.2,25.2),t.add(U);break}case"dialogue":{const x=new ge({color:13748142,roughness:.9}),m=new ge({color:7691075,roughness:.84}),g=new ge({color:8942943,roughness:.92}),v=new ge({color:5401699,roughness:.82}),w=new ge({color:10995645,emissive:1914160,emissiveIntensity:.08,roughness:.24,metalness:.04,transparent:!0,opacity:.28,depthWrite:!1}),M=(B,J,ue,xe="stage")=>{const j=new Gn(B,J,ue.length),ie=new X,ne=new X,ye=new _n,Ie=new fs,Fe=new at;return ue.forEach((tt,je)=>{ie.set(...tt.position),Ie.set(...tt.rotation??[0,0,0]),ye.setFromEuler(Ie),ne.set(...tt.scale??[1,1,1]),Fe.compose(ie,ye,ne),j.setMatrixAt(je,Fe)}),j.instanceMatrix.needsUpdate=!0,j.computeBoundingSphere(),j.userData[`isLandscape${xe[0].toUpperCase()}${xe.slice(1)}`]=!0,t.add(j),j};f(0,1.19,28.15,12.1,.08,9.2,g),M(new Ye(11.85,.018,.035),m,[24.15,24.95,25.75,26.55,27.35,28.15,28.95,29.75,30.55,31.35,32.15].map(B=>({position:[0,1.235,B]}))),M(new Ye(.26,4,9),x,[{position:[-6.05,3.2,28.25]},{position:[6.05,3.2,28.25]}]),M(new Ye(1.9,5.4,.28),x,[{position:[-5.55,3.9,23.85]},{position:[5.55,3.9,23.85]}]),f(0,1.78,23.85,9.2,1.16,.28,x),f(0,6.02,23.85,9.2,1.28,.28,x),M(new Ye(.12,3.02,.12),m,[-4.58,-1.53,1.53,4.58].map(B=>({position:[B,3.93,24.02]}))),M(new Ye(9.2,.12,.12),m,[2.43,5.43].map(B=>({position:[0,B,24.02]})));const y=M(new Ye(2.92,2.88,.045),w,[-3.05,0,3.05].map(B=>({position:[B,3.93,24.015]})));y.userData.noLandscapeShadow=!0,M(new Ye(12.15,.18,.24),m,[24.1,26.3,28.5,30.7,32.85].map(B=>({position:[0,6.34,B]}))),M(new Ye(.3,4,.3),v,[{position:[-6.03,3.2,32.75]},{position:[6.03,3.2,32.75]}]),f(0,6.32,32.75,12.25,.2,.32,m),M(new we(.103,.12,1.8,7),m,[-3.35,0,3.35].map(B=>({position:[B,2.12,21.55]})));const b=M(js(83,.95,150),po(),[{position:[-3.35,3.55,21.55],scale:[1.18,.9,.78],rotation:[0,.4,0]},{position:[0,3.95,21.55],scale:[1.18,.9,.78],rotation:[0,2.1,0]},{position:[3.35,3.6,21.55],scale:[1.18,.9,.78],rotation:[0,4,0]}]);b.castShadow=!0,ls(b,po()),f(0,1.56,20.35,5.2,.28,.52,v),M(new Ye(.16,.62,.4),m,[-2.1,2.1].map(B=>({position:[B,1.33,20.35]})));const T=[{x:-2.55,y:1.22,z:28,yaw:Math.PI/2,shirt:7902858,hair:4733489},{x:2.55,y:1.22,z:28,yaw:-Math.PI/2,shirt:12681576,hair:3423043},{x:0,y:1.22,z:25.45,yaw:0,shirt:7441058,hair:6113078}],_=(B,J,ue)=>{const xe=new Gn(B,J,ue.length),j=new X(0,1,0),ie=new X,ne=new X,ye=new X,Ie=new _n,Fe=new _n,tt=new _n,je=new fs,_t=new at;return ue.forEach((gt,nt)=>{const Pt=T[gt.person];Ie.setFromAxisAngle(j,Pt.yaw),ie.set(...gt.offset).applyQuaternion(Ie),ne.set(Pt.x,Pt.y,Pt.z).add(ie),je.set(...gt.rotation??[0,0,0]),Fe.setFromEuler(je),tt.copy(Ie).multiply(Fe),ye.set(...gt.scale??[1,1,1]),_t.compose(ne,tt,ye),xe.setMatrixAt(nt,_t),gt.color!==void 0&&xe.setColorAt(nt,new oe(gt.color))}),xe.instanceMatrix.needsUpdate=!0,xe.instanceColor&&(xe.instanceColor.needsUpdate=!0),xe.computeBoundingSphere(),xe.userData.isLandscapeStage=!0,t.add(xe),xe},S=new Ye(1.1,.14,.9),E=new Ye(1.08,.78,.13),A=new we(.055,.07,.56,6),R=[],C=[],I=[];T.forEach((B,J)=>{R.push({person:J,offset:[0,.48,-.35]}),C.push({person:J,offset:[0,.91,-.79],rotation:[-.06,0,0]});for(const ue of[-.43,.43])for(const xe of[-.68,-.05])I.push({person:J,offset:[ue,.17,xe]})}),_(S,m,R),_(E,m,C),_(A,m,I),u(0,1.63,27.95,.22,.82,m,10),u(0,2.08,27.95,1.28,.16,m,16),M(new Ye(.34,.035,.5),new ge({color:16777215,roughness:.92}),[{position:[-.42,2.18,27.95],scale:[1,1,1],rotation:[0,0,0]},{position:[0,2.18,27.95],scale:[1,1,1],rotation:[0,0,0]},{position:[.42,2.18,27.95],scale:[1,1,1],rotation:[0,0,0]}]),T.forEach((B,J)=>{const ue=xa({shirt:B.shirt,hair:B.hair,hairStyle:J===0?"long":"short",skin:[14262396,12156250,14857875][J],seated:!0,pose:J===2?"talk":"listen",lean:J===2?0:.05,scale:1.45});ue.position.set(B.x,B.y+.55,B.z),ue.rotation.y=B.yaw,t.add(ue)}),u(4.65,1.48,32.05,.54,.46,m,10);const L=e(new he(.54,.075,7,24),v,4.65,1.73,32.05);L.rotation.x=Math.PI/2,L.userData.isLandscapeStage=!0;const N=new Ye(.22,.045,.38),U=[{position:[4.38,1.75,31.98],rotation:-.3},{position:[4.66,1.76,32.02],rotation:.18},{position:[4.91,1.75,32.14],rotation:-.12}];M(N,s,U.map(B=>({position:B.position,rotation:[0,B.rotation,0],scale:[1,.8,1]}))),M(new Ye(.16,.012,.28),v,U.map(B=>({position:[B.position[0],B.position[1]+.03,B.position[2]],rotation:[0,B.rotation,0]}))),M(new Ye(.12,.48,.5),v,[2.85,3.7,4.55].map(B=>({position:[-5.88,B,29.9]}))),M(new Ye(.12,.48,.5),a,[{position:[-5.88,5.4,29.9]}]),M(new Se(.11,8,6),i,[2.85,3.7,4.55,5.4].map(B=>({position:[-5.78,B,29.55]})),"beacon");const F=new we(.2408,.28,.055,10);M(F,a,[31.5,29.15].map(B=>({position:[0,1.285,B]})),"route"),M(F,i,[{position:[0,1.285,30.05]}],"route");for(const[B,J]of[[.72,4.45],[1.08,4.78]]){const ue=e(new he(B,.045,6,24,Math.PI),i,0,J,27.35);ue.userData.isLandscapeRoute=!0}f(0,5.92,32.75,9.9,1.48,.24,m);const z=document.createElement("canvas");z.width=1024,z.height=192;const G=z.getContext("2d");if(G){G.fillStyle="#36574d",G.fillRect(0,0,z.width,z.height),G.strokeStyle="#d6c49d",G.lineWidth=8,G.strokeRect(12,12,z.width-24,z.height-24),G.fillStyle="#f6eedb",G.textAlign="center",G.textBaseline="middle",G.font="bold 48px Arial, sans-serif",G.fillText("FOUR-WEEK LISTENING EXPERIMENT",512,65),G.font="bold 29px Arial, sans-serif",G.fillText("20 MIN  ·  ASK ONE FOLLOW-UP  ·  SUMMARIZE BEFORE REPLYING",512,130);const B=new Zt(z);B.colorSpace=yt;const J=new V(new Qe(9.45,1.22),new Tt({map:B,side:qe,toneMapped:!1}));J.position.set(0,5.92,33.02),J.userData.isLandscapeStage=!0,t.add(J)}const O=new ro(16766882,.72,17,2);O.position.set(0,5.35,27.2),t.add(O);break}case"listening-bench":{const x=new ge({color:9277573,roughness:.92}),m=new ge({color:7305073,roughness:.86}),g=new ge({color:7756613,roughness:.88}),v=new ge({color:4999481,roughness:1}),w=new ge({color:15524815,roughness:.96}),M=u(0,1.18,27,5.25,.34,x,16);M.userData.isLandscapeRoute=!0;for(const G of[3.55,4.7]){const O=e(new he(G,.026,6,56),m,0,1.37,27);O.rotation.x=Math.PI/2,O.userData.isLandscapeRoute=!0,O.userData.noLandscapeShadow=!0}const y=new Gn(new Ye(.9,.18,1.9),g,2),b=new Gn(new Ye(.16,.82,1.9),g,2),T=new Gn(new Ye(.12,.48,.12),s,8),_=new at,S=[-1.65,1.65];S.forEach((G,O)=>{_.makeTranslation(G,1.82,27),y.setMatrixAt(O,_),_.makeTranslation(Math.sign(G)*2.14,2.31,27),b.setMatrixAt(O,_)});let E=0;for(const G of S)for(const O of[-.3,.3])for(const B of[-.68,.68])_.makeTranslation(G+O,1.59,27+B),T.setMatrixAt(E++,_);for(const[G,O]of[[y,"echo-bench-seats"],[b,"echo-bench-backs"],[T,"echo-bench-legs"]])G.instanceMatrix.needsUpdate=!0,G.computeBoundingSphere(),G.name=O,G.userData.isLandscapeStage=!0,t.add(G);for(const[G,O,B,J,ue]of[[-1.78,Math.PI/2,7902597,4471348,!0],[1.78,-Math.PI/2,8229284,2827296,!1]]){const xe=xa({shirt:B,hair:J,hairStyle:ue?"short":"long",skin:ue?14262396:14857875,seated:!0,pose:ue?"talk":"listen",lean:ue?0:.07,scale:1.4});xe.name=ue?"echo-speaker":"echo-listener",xe.position.set(G,1.91,27),xe.rotation.y=O,t.add(xe)}u(0,1.55,27,.15,.36,g,10),u(0,1.78,27,.62,.16,g,12),f(-.17,1.875,27,.36,.025,.46,w,.08),f(.17,1.875,27,.36,.025,.46,w,-.08),f(0,1.895,27,.025,.018,.46,m),f(-.42,1.9,27.25,.035,.025,.42,s,-.18);for(const G of[-.43,.43]){u(G,1.95,27.32,.075,.14,w,8);const O=e(new he(.045,.012,6,12),w,G+Math.sign(G)*.07,1.95,27.32);O.userData.noLandscapeShadow=!0}for(const G of[-4.05,4.05])f(G,1.57,27,1.3,.44,2.7,g),f(G,1.81,27,1.15,.06,2.52,v);const A=new Gn(new we(.09,.14,1.2,7),g,2),R=new at;[-4.05,4.05].forEach((G,O)=>{R.makeTranslation(G,2.42,27),A.setMatrixAt(O,R)}),A.instanceMatrix.needsUpdate=!0,A.computeBoundingSphere(),A.name="echo-garden-tree-trunks",A.userData.isLandscapeStage=!0,t.add(A);const C=new Gn(js(97,.44,70),po(),6);C.castShadow=!0,ls(C,po());const I=new at,L=new X,N=new X;for(const[G,[O,B]]of[[-4.05,26.42],[-4.05,27.12],[-4.05,27.78],[4.05,26.42],[4.05,27.12],[4.05,27.78]].entries())L.set(O,3.05+G%2*.2,B),N.set(1.1,.94+G%2*.14,.96),I.compose(L,new _n().setFromAxisAngle(new X(0,1,0),G*1.3),N),C.setMatrixAt(G,I);C.instanceMatrix.needsUpdate=!0,C.computeBoundingSphere(),C.name="echo-garden-canopies",C.userData.isLandscapeStage=!0,t.add(C),p(9.2,5.65,g,31.15),t.add(h4(9.2,5.65,31.15)),t.add(p4(8.55,1.9,0,4.55,31.15)),f(0,4.55,31.15,8.55,1.9,.24,g);const U=document.createElement("canvas");U.width=1200,U.height=280;const F=U.getContext("2d");if(F){F.fillStyle="#3a5045",F.fillRect(0,0,U.width,U.height),F.strokeStyle="#d8c9a8",F.lineWidth=8,F.strokeRect(14,14,U.width-28,U.height-28),F.textAlign="center",F.textBaseline="middle",F.fillStyle="#f4eddd",F.font="bold 48px Arial, sans-serif",F.fillText("THE ECHO BENCH",600,52),F.font="bold 40px Arial, sans-serif",F.fillText("DID SOMEONE FEEL HEARD TODAY?",600,132),F.fillStyle="#e5cf9d",F.font="bold 30px Arial, sans-serif",F.fillText("LISTEN · ASK · REFLECT   |   I heard you say...",600,218);const G=new Zt(U);G.colorSpace=yt;const O=new V(new Qe(8.2,1.72),new Tt({map:G,side:qe,toneMapped:!1}));O.position.set(0,4.55,31.28),O.name="echo-reflection-sign",O.userData.isLandscapeStage=!0,O.userData.noLandscapeShadow=!0,t.add(O)}f(0,1.62,29.25,1.25,.14,.62,g);for(const G of[-.48,.48])for(const O of[29.05,29.45])f(G,1.48,O,.08,.28,.08,g);f(.34,1.715,29.25,.18,.025,.32,s,.12);const z=new ro(16767405,.42,11,2);z.position.set(0,4.6,27.4),t.add(z);break}default:r()}}function DM(t,n,e,o){if(!n||!e||n==="hub"||n==="section-a"||n==="section-b"||n==="stories-of-china"||n==="learning-lab"||n==="unit-project")return;const s=document.createElement("canvas");s.width=1024,s.height=256;const i=s.getContext("2d");if(!i)return;i.fillStyle="rgba(7, 14, 27, 0.88)",i.fillRect(20,24,984,208),i.strokeStyle=`#${o.toString(16).padStart(6,"0")}`,i.lineWidth=8,i.strokeRect(24,28,976,200),i.textAlign="center",i.textBaseline="middle",i.font="bold 52px 'Microsoft YaHei', sans-serif",i.fillStyle="#f8fbff",i.fillText(e.slice(0,26),512,126,920);const a=new Zt(s);a.colorSpace=yt;const r=new qs(new Ks({map:a,transparent:!0,depthWrite:!1,toneMapped:!1}));r.position.set(0,11,14),r.scale.set(19,4.75,1),r.renderOrder=8,t.add(r)}function IM(t,n,e,o,s,i){if(!n||n==="hub")return;const a=new V(new we(7.8,8.8,.4,8),o);switch(a.position.set(0,.86,27),t.add(a),n){case"section-a":{const r=new V(new Ye(8.4,.42,5.6),e);r.position.set(-2.2,3.5,27),r.rotation.y=-.18;const c=new V(new Ye(5.8,.16,4.4),s);c.position.set(2.2,3.8,27),c.rotation.y=.18;const l=new V(new Ye(.32,2.1,5.8),i);l.position.set(0,2.25,27),t.add(r,c,l),yi(c);break}case"section-b":{for(const l of[-3.8,3.8]){const d=new V(new we(.72,1.05,8.2,8),e);d.position.set(l,4.9,27),t.add(d)}const r=new V(new he(4.1,.2,8,40,Math.PI),i);r.position.set(0,8.2,27),r.rotation.z=Math.PI,t.add(r);const c=new V(new Se(1.25,16,12),s);c.position.set(0,4.9,27),t.add(c),yi(c);break}case"stories-of-china":{for(const[l,d,f]of[[5.8,2,8],[4.4,4.2,6],[3,6.2,5]]){const u=new V(new we(l,l+.55,.7,f),e);u.position.set(0,d,27),t.add(u)}const r=new V(new Mo(1.7,1),s);r.position.set(0,9,27),t.add(r);const c=new V(new he(2.5,.13,8,32),i);c.rotation.x=Math.PI/2,c.position.set(0,9,27),t.add(c),yi(r),Cr(c);break}case"learning-lab":{const r=new V(new we(2.4,2.8,6.5,12),s);r.position.set(0,4.3,27),t.add(r);for(const c of[.35,-.35]){const l=new V(new he(4.9,.16,8,48),i);l.position.set(0,4.3,27),l.rotation.set(c,.4,c*1.4),t.add(l),Cr(l)}yi(r);break}case"unit-project":{const r=new V(new Mo(2.8,1),s);r.position.set(0,7.4,27),t.add(r);for(const[l,d]of[[-5.3,24],[5.3,24],[-5.3,30],[5.3,30]]){const f=new V(new we(.5,.78,6.8,8),i);f.position.set(l,3.9,d),t.add(f)}const c=new V(new he(4.5,.18,8,48),i);c.rotation.x=Math.PI/2,c.position.set(0,1.2,27),t.add(c),yi(r),Cr(c);break}}}function yi(t){t.userData.isLandscapeBeacon=!0}function Cr(t){t.userData.isLandscapeRing=!0}function LM(t,n,e,o,s){if(s){const i=new ge({color:3360862,emissive:1058873,emissiveIntensity:.14,roughness:.78,metalness:.18}),a=new ge({color:5735318,emissive:2646388,emissiveIntensity:.18,roughness:.62,metalness:.12});for(const f of[-1,1]){const u=new V(new we(.3,.46,2.8,7),i);u.position.set(f*13.2,1.4,34),t.add(u);for(const h of[.7,1.35,2]){const p=new V(new Ye(.56,.07,.09),a);p.position.set(f*13.2,h,33.56),p.userData.isLandscapeRoute=!0,t.add(p)}}const r=new ge({color:3891573,emissive:2649216,emissiveIntensity:.28,roughness:.52,metalness:.2}),c=new Vn([new X(-9,5.5,42),new X(-6,8,42),new X(0,9.2,42),new X(6,8,42),new X(9,5.5,42)]),l=new V(new Zn(c,40,.07,6,!1),r);l.userData.isLandscapeRoute=!0,t.add(l);const d=new ge({color:10410461,emissive:5610924,emissiveIntensity:.34,roughness:.4,metalness:.18});for(const f of[-9,9]){const u=new V(new Se(.46,12,8),d);u.position.set(f,5.5,42),u.userData.isLandscapeBeacon=!0,t.add(u)}return}t.add(gM(e,o))}function NM(t,n,e,o,s){let i;const a=document.createElement("canvas");a.width=1024,a.height=192;const r=a.getContext("2d");r&&(r.fillStyle="#182b3b",r.fillRect(0,0,a.width,a.height),r.strokeStyle="#d7b67a",r.lineWidth=8,r.strokeRect(12,12,a.width-24,a.height-24),r.fillStyle="#f4e6c6",r.textAlign="center",r.textBaseline="middle",r.font="bold 66px Arial, sans-serif",r.fillText("THE HARBOR OF LIVES",512,72),r.font="bold 30px Arial, sans-serif",r.fillText("CHOICE  ·  SERVICE  ·  LEGACY",512,145),i=new Zt(a),i.colorSpace=yt),t.add(bM(o,s,i))}function kM(t,n){const e=new Tt({color:10457207,side:qe}),o=new Tt({color:11704947,side:qe}),s=new ge({color:11900524,roughness:.96,metalness:0}),i=new ge({color:6705466,roughness:1,metalness:0}),a=new ge({color:7897434,roughness:.96,metalness:0}),r=(l,d,f)=>{const u=new Tn;u.moveTo(-82,0),u.lineTo(-82,8*f),u.quadraticCurveTo(-64,17*f,-48,10*f),u.quadraticCurveTo(-28,3*f,-10,12*f),u.quadraticCurveTo(10,21*f,29,11*f),u.quadraticCurveTo(49,3*f,64,12*f),u.quadraticCurveTo(74,16*f,82,8*f),u.lineTo(82,0),u.closePath();const h=new V(new Vd(u,20),d);h.position.set(0,.35,l),h.userData.noLandscapeShadow=!0,t.add(h)};r(76,e,1),r(65,o,.64);for(const[l,d,f,u,h]of[[-1.6,39,5.6,13,.08],[-4.3,51,7.5,15,.2],[-7.1,64,9.4,16,.28]]){const p=new V(new Ye(f,.08,u),s);p.position.set(l,.49,d),p.rotation.y=h,p.userData.isLandscapeRoute=!0,t.add(p)}for(const[l,d,f]of[[-19,46,1],[19,54,.84],[-28,61,.72]]){const u=new V(new we(.2,.32,3.6*f,7),i);u.position.set(l,2.3*f,d),t.add(u);const h=new V(new Se(1,8,5),a);h.position.set(l,4.1*f,d),h.scale.set(2.6*f,.62*f,1.7*f),h.userData.isLandscapeStage=!0,t.add(h)}const c=new V(new Mo(.42,0),n);c.position.set(-7.1,1.1,64),c.userData.isLandscapeBeacon=!0,t.add(c)}function UM(t,n,e,o,s=!1){s||t.add(SM(e,o))}function FM(t,n,e,o,s,i=!1){if(i){const a=new V(new Ye(18,.36,8),n);a.position.set(0,.85,39),t.add(a);for(const d of[-6.2,6.2]){const f=new V(new Ye(.48,5.8,.5),e);f.position.set(d,3.9,39),t.add(f)}const r=new V(new Ye(14,.48,6.4),s);r.position.set(0,6.9,39),t.add(r);const c=new V(new Ye(5.8,.3,1.35),e);c.position.set(0,1.9,35.5),c.userData.isLandscapeStage=!0,t.add(c);for(const d of[-2.2,2.2]){const f=new V(new Ye(.22,1.6,.22),s);f.position.set(d,1.05,35.5),t.add(f)}const l=new V(new Se(.48,10,8),o);l.position.set(0,5.7,38.6),l.userData.isLandscapeBeacon=!0,t.add(l);return}t.add(yM(o,s))}function OM(t,n,e,o,s=!1){if(s){const i=new Xe;i.position.set(9,0,40);const a=ud(e,o,!1);a.position.set(0,0,-40),i.scale.setScalar(.62),i.add(a),t.add(i);return}t.add(ud(e,o,!0))}function zM(t,n,e,o,s,i=!1,a){const r=i&&/^section_c-world-[1-4]$/.test(a??"");t.add(TM(o,s,{stalls:!r,ledger:!i}))}function BM(t,n,e,o,s){const i=new V(new Ye(20,1,14),n);i.position.set(0,1.2,38),t.add(i);const a=new V(new we(5.5,7,16,8),e);a.position.set(0,9.5,38),t.add(a);const r=new V(new xt(8,5,8),o);r.position.set(0,20,38),r.userData.isLandscapeBeacon=!0,t.add(r);const c=new V(new he(7,.18,8,40,Math.PI),s);c.rotation.z=Math.PI,c.position.set(0,11,30),c.userData.isLandscapeRing=!0,t.add(c)}const GM={high:{pixelRatio:2,grassRadius:40,grassCell:1.1,shadowMap:2048,bloom:!0,bloomScale:1},med:{pixelRatio:1.5,grassRadius:34,grassCell:1.5,shadowMap:1536,bloom:!0,bloomScale:.66},low:{pixelRatio:1,grassRadius:26,grassCell:1.9,shadowMap:1024,bloom:!1,bloomScale:.5}};function HM(){var i;if(typeof window>"u")return"med";const t=((i=window.matchMedia)==null?void 0:i.call(window,"(pointer: coarse)").matches)??!1,n=Math.min(window.innerWidth,window.innerHeight)<540,e=navigator.hardwareConcurrency??4,o=navigator.deviceMemory??4,s=t||n;return s&&(e<=4||o<=3)?"low":s||e<=4||o<=4?"med":"high"}const VM=5,Fo=70,pd=12,Dr={value:0},md=`float cHash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float cNoise(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  return mix(mix(cHash(i), cHash(i + vec2(1.0, 0.0)), f.x), mix(cHash(i + vec2(0.0, 1.0)), cHash(i + vec2(1.0, 1.0)), f.x), f.y);
}
float cloudK(vec2 p, float t) {
  // 与天空积云同一类 fbm：世界坐标 / 120 m 为一个云团，随时间漂移（与天空云同向）
  vec2 q = p * 0.0085 + vec2(t * 0.010, t * 0.004);
  float base = cNoise(q) * 0.5 + cNoise(q * 2.07 + 13.1) * 0.25 + cNoise(q * 4.3 + 7.0) * 0.125;
  float cover = smoothstep(0.38, 0.62, base);
  return 1.04 - 0.24 * cover;
}
`,WM=new oe(16757611),XM=new X(0,1,0),KM=new X(1,0,0),xs=8;function gd(t,n,e,o=56){const s=[];for(let i=0;i<o;i++){const a=i/o*Math.PI*2,r=1+Math.sin(a*3+e)*.12+Math.sin(a*5+e*1.7)*.07+Math.sin(a*9+e*2.3)*.035;s.push(new ot(Math.cos(a)*t*r,Math.sin(a)*n*r))}return s}class $M{constructor(n,e){Z(this,"container");Z(this,"renderer");Z(this,"resizeObserver");Z(this,"scene");Z(this,"camera");Z(this,"raycaster",new c1);Z(this,"pointer",new ot);Z(this,"nodeGroups",new Map);Z(this,"pickables",[]);Z(this,"explorer");Z(this,"pathGroup");Z(this,"decorGroup");Z(this,"vegetation");Z(this,"nearScatter");Z(this,"waterGroup");Z(this,"terrain");Z(this,"terrainTex");Z(this,"lakeUniforms",{uLakeA:{value:Array.from({length:xs},()=>new un(0,0,1,1))},uLakeL:{value:new Array(xs).fill(0)},uLakeN:{value:0}});Z(this,"terrainUniforms",{uTerrAlbedo:{value:null},uTerrNormal:{value:null},uTerrDesat:{value:1}});Z(this,"grassBaseColor",new oe(6130236));Z(this,"grassDryColor",new oe(10525272));Z(this,"grassHsl",{h:0,s:0,l:0});Z(this,"envRT");Z(this,"mountains");Z(this,"skyDome");Z(this,"grassMesh");Z(this,"flowerMesh");Z(this,"grassUniforms");Z(this,"grassCellSize",1.1);Z(this,"grassRadius",54);Z(this,"grassCellMap",new Map);Z(this,"grassNeeded",new Set);Z(this,"grassFreeSlots",[]);Z(this,"grassLastX",Number.POSITIVE_INFINITY);Z(this,"grassLastZ",Number.POSITIVE_INFINITY);Z(this,"grassDummy",new Wi);Z(this,"grassColor",new oe);Z(this,"clouds");Z(this,"unitLandscape");Z(this,"dustGroup");Z(this,"motes");Z(this,"moteBase");Z(this,"dustPool",[]);Z(this,"lastStep",0);Z(this,"sunDisc");Z(this,"composer");Z(this,"bloomPass");Z(this,"walkPhase",0);Z(this,"avatarYaw",0);Z(this,"avatarLean",0);Z(this,"expression","neutral");Z(this,"blinkTimer",2);Z(this,"blink",0);Z(this,"usingGlb",!1);Z(this,"mixer");Z(this,"glbIdle");Z(this,"glbWalk");Z(this,"glbClips");Z(this,"glbEmoting",!1);Z(this,"contactShadow");Z(this,"_n",new X);Z(this,"_fwd",new X);Z(this,"_right",new X);Z(this,"_basis",new at);Z(this,"_q",new _n);Z(this,"_leanQ",new _n);Z(this,"sun");Z(this,"hemi");Z(this,"ambientLight");Z(this,"animId",0);Z(this,"paused",!0);Z(this,"pausedBeforeVisibility",!0);Z(this,"spectatorMode",!1);Z(this,"clock",new ov);Z(this,"_fpsTs",0);Z(this,"_fpsFrames",0);Z(this,"_fpsAdapted",!1);Z(this,"nodes",[]);Z(this,"currentId","");Z(this,"onNodeClick");Z(this,"onProximity");Z(this,"onExploreUpdate");Z(this,"onPickupNear");Z(this,"onPickupCollect");Z(this,"waterBodies",[]);Z(this,"quality",HM());Z(this,"qcfg",GM[this.quality]);Z(this,"dynamicLightLimit",this.quality==="low"?5:this.quality==="med"?8:12);Z(this,"dynamicLightBudgetFrames",30);Z(this,"_lightPosition",new X);Z(this,"sunDirV",new X);Z(this,"spectatorFocus",new X);Z(this,"hasSpectatorFocus",!1);Z(this,"rebuildToken",0);Z(this,"player",new o4);Z(this,"explorerCam",new Dx);Z(this,"nearNode",null);Z(this,"currentBiome",jr);Z(this,"activeUnitId");Z(this,"activeWorldId");Z(this,"activeWorldTitle");Z(this,"pickupGroup");Z(this,"pickupMeshes",new Map);Z(this,"pickupData",[]);Z(this,"nearPickup",null);Z(this,"lastExploreUpdateAt",0);Z(this,"waterFrame",0);Z(this,"onVisibilityChange",()=>{if(document.hidden){this.pausedBeforeVisibility=this.paused,this.pause();return}this.pausedBeforeVisibility||this.resume()});Z(this,"onKeyDown",n=>{this.paused||this.spectatorMode||(n.key.toLowerCase()==="e"||n.key==="Enter")&&this.tryInteract()});Z(this,"onPointerDown",n=>{var i;if(this.paused||this.spectatorMode||n.button!==0)return;const e=this.renderer.domElement.getBoundingClientRect();this.pointer.x=(n.clientX-e.left)/e.width*2-1,this.pointer.y=-((n.clientY-e.top)/e.height)*2+1,this.raycaster.setFromCamera(this.pointer,this.camera);const o=this.raycaster.intersectObjects(this.pickables,!1)[0],s=o==null?void 0:o.object.userData.nodeId;if(s&&((i=this.nearNode)==null?void 0:i.id)===s&&this.nearNode.unlocked){this.onNodeClick(s);return}if(this.terrain){const a=this.raycaster.intersectObject(this.terrain,!1)[0];if(a&&(this.player.setMoveTarget(a.point.x,a.point.z),s)){const r=this.nodes.find(c=>c.id===s);r!=null&&r.unlocked&&this.player.setMoveTarget(r.x+3,r.z+3)}}});Z(this,"onResize",()=>{var o;const n=this.container.clientWidth,e=this.container.clientHeight;!n||!e||(this.camera.aspect=n/e,this.camera.updateProjectionMatrix(),this.renderer.setSize(n,e),(o=this.composer)==null||o.setSize(n,e))});Z(this,"animate",n=>{var a,r,c;if(this.paused){this.animId=0;return}this.animId=requestAnimationFrame(this.animate),this.clock.update(n);const e=Math.min(this.clock.getDelta(),.05),o=this.clock.getElapsed();if(!this._fpsAdapted){this._fpsFrames++;const l=performance.now();if(this._fpsTs===0&&(this._fpsTs=l),l-this._fpsTs>=3e3){if(this._fpsFrames/((l-this._fpsTs)/1e3)<40){const f=this.renderer.getPixelRatio(),u=Math.max(.75,f-.5);u<f?(this.renderer.setPixelRatio(u),(a=this.composer)==null||a.setPixelRatio(u),this._fpsAdapted=u<=.75):this._fpsAdapted=!0}this._fpsTs=l,this._fpsFrames=0}}this.mixer&&this.mixer.update(e);const s=this.explorerCam.update(this.camera,this.player.position,this.player.yaw,e,!this.spectatorMode,this.spectatorMode&&this.hasSpectatorFocus?this.spectatorFocus:void 0);if(this.player.update(e,s),this.explorer){this.explorer.position.lerp(this.player.position,1-Math.exp(-14*e));let l=this.player.yaw-this.avatarYaw;for(;l>Math.PI;)l-=Math.PI*2;for(;l<-Math.PI;)l+=Math.PI*2;this.avatarYaw+=l*Math.min(1,e*12);const d=this.player.isMoving(),f=this.player.isSprinting();if(d){this.walkPhase+=e*(f?15:9.5);const T=Math.floor(this.walkPhase/Math.PI);if(T!==this.lastStep){this.lastStep=T;const _=T%2===0?1:-1,S=Math.cos(this.avatarYaw)*.18*_,E=-Math.sin(this.avatarYaw)*.18*_;this.emitDust(this.player.position.x+S,this.player.position.y,this.player.position.z+E)}}const u=this.explorer.userData.rig;if(u){if(d){const T=f?.95:.6,_=f?1.35:.95,S=Math.sin(this.walkPhase),E=Math.sin(this.walkPhase+Math.PI);u.leftLeg.hip.rotation.x=S*T,u.rightLeg.hip.rotation.x=E*T,u.leftLeg.knee.rotation.x=.12+Math.max(0,-S)*_,u.rightLeg.knee.rotation.x=.12+Math.max(0,-E)*_,u.leftArm.rotation.x=-S*.8,u.rightArm.rotation.x=-E*.8,u.leftArm.userData.elbow.rotation.x=-.25-Math.max(0,S)*.55,u.rightArm.userData.elbow.rotation.x=-.25-Math.max(0,E)*.55,u.leftLeg.ankle.rotation.x=-(u.leftLeg.hip.rotation.x+u.leftLeg.knee.rotation.x)*.9-Math.max(0,S)*.12,u.rightLeg.ankle.rotation.x=-(u.rightLeg.hip.rotation.x+u.rightLeg.knee.rotation.x)*.9-Math.max(0,E)*.12,u.head.rotation.z=0,u.cape.rotation.x=.16+(.3+Math.abs(Math.sin(this.walkPhase))*.2)*(f?1.4:1),u.cape.rotation.z=Math.sin(this.walkPhase*.5)*.08}else{const T=Math.min(1,e*9);u.leftLeg.hip.rotation.x*=1-T,u.rightLeg.hip.rotation.x*=1-T,u.leftLeg.knee.rotation.x+=(.06-u.leftLeg.knee.rotation.x)*T,u.rightLeg.knee.rotation.x+=(.06-u.rightLeg.knee.rotation.x)*T,u.leftArm.rotation.x*=1-T,u.rightArm.rotation.x*=1-T;const _=u.leftArm.userData.elbow,S=u.rightArm.userData.elbow;_.rotation.x+=(-.22-_.rotation.x)*T,S.rotation.x+=(-.22-S.rotation.x)*T,u.leftLeg.ankle.rotation.x*=1-T,u.rightLeg.ankle.rotation.x*=1-T,u.head.rotation.z=Math.sin(o*1.4)*.05,u.cape.rotation.x+=(.16-u.cape.rotation.x)*T,u.cape.rotation.z+=(Math.sin(o*1.1)*.04-u.cape.rotation.z)*T}this.updateFace(u,e)}if(this.usingGlb&&this.glbWalk&&this.glbIdle&&!this.glbEmoting){const T=this.glbWalk.getEffectiveWeight(),_=T+((d?1:0)-T)*Math.min(1,e*6);this.glbWalk.setEffectiveWeight(_),this.glbIdle.setEffectiveWeight(1-_)}const h=d?f?.14:.05:0;this.avatarLean+=(h-this.avatarLean)*Math.min(1,e*8);const p=this.explorer.position.x,x=this.explorer.position.z,m=1.6,g=Ot(p-m,x,It),v=Ot(p+m,x,It),w=Ot(p,x-m,It),M=Ot(p,x+m,It);this._n.set(g-v,2*m,w-M).normalize(),this._n.lerp(XM,.55).normalize(),this._fwd.set(Math.sin(this.avatarYaw),0,Math.cos(this.avatarYaw)),this._fwd.addScaledVector(this._n,-this._fwd.dot(this._n)).normalize(),this._right.crossVectors(this._n,this._fwd).normalize(),this._fwd.crossVectors(this._right,this._n).normalize(),this._basis.makeBasis(this._right,this._n,this._fwd),this._q.setFromRotationMatrix(this._basis),this._leanQ.setFromAxisAngle(KM,this.avatarLean),this._q.multiply(this._leanQ),this.explorer.quaternion.slerp(this._q,1-Math.exp(-12*e));const y=d?Math.abs(Math.sin(this.walkPhase))*.06:Math.sin(o*1.4)*.01;this.explorer.position.y=this.player.position.y+y;const b=this.explorer.children.find(T=>{var _;return(_=T.userData)==null?void 0:_.isFootRing});if(b){const T=d?1+Math.sin(this.walkPhase)*.08:1;b.scale.set(T,T,T),b.material.opacity=d?.45:.28}}this.updateProximity(),this.updatePickupProximity(),this.updateDust(e),this.tickScene(o,e);const i=performance.now();(i-this.lastExploreUpdateAt>=66||this.lastExploreUpdateAt===0)&&(this.lastExploreUpdateAt=i,(c=this.onExploreUpdate)==null||c.call(this,{playerX:this.player.position.x,playerZ:this.player.position.z,playerYaw:this.player.yaw,nodes:this.nodes,nearNodeId:(r=this.nearNode)==null?void 0:r.id,pickups:this.pickupData,biome:this.minimapPalette()})),this.composer?this.composer.render():this.renderer.render(this.scene,this.camera)});this.container=n,this.onNodeClick=e.onNodeClick,this.onProximity=e.onProximity,this.onExploreUpdate=e.onExploreUpdate,this.onPickupNear=e.onPickupNear,this.onPickupCollect=e.onPickupCollect,S5(this.quality==="low"?"low":"high");const o=n.clientWidth||360,s=n.clientHeight||420;this.scene=new Dc,this.scene.fog=new lr(1713472,.0042),this.camera=new Ys(50,o/s,.2,900),this.camera.position.set(0,8,20),this.renderer=new l3({antialias:this.quality!=="low",alpha:!1,powerPreference:"high-performance"}),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,this.qcfg.pixelRatio)),this.renderer.setSize(o,s),this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=this.quality==="low"?Pi:Sd,this.renderer.toneMapping=Ba,this.renderer.toneMappingExposure=1.28,this.renderer.outputColorSpace=yt,n.appendChild(this.renderer.domElement),R3(this.quality==="low"?"low":"high"),sf(this.quality==="low"?"low":"high",Math.min(this.renderer.capabilities.getMaxAnisotropy(),this.quality==="high"?8:4)),this.explorerCam.bindDrag(this.renderer.domElement),this.buildSky(),this.buildClouds(),this.buildLights(),this.buildEnvironment(this.currentBiome),this.applyBiomeToSky(this.currentBiome),this.applyBiomeToLights(this.currentBiome),this.scene.fog=new lr(this.currentBiome.fogColor,this.currentBiome.fogDensity),this.buildTerrain(),this.buildMountains(),this.buildGrass(),this.buildDust(),this.buildMotes(),this.spawnExplorer(),this.setupPostFX(o,s),this.bindEvents()}setupPostFX(n,e){if(!this.qcfg.bloom){this.composer=void 0;return}try{const o=Math.min(window.devicePixelRatio,this.qcfg.pixelRatio),s=new wn(Math.max(1,Math.floor(n*o)),Math.max(1,Math.floor(e*o)),{type:Cn,samples:this.quality==="high"?4:2}),i=new lv(this.renderer,s);if(i.addPass(new dv(this.scene,this.camera)),this.quality==="high"){const c=new ho(this.scene,this.camera,n,e);c.output=ho.OUTPUT.Default,c.blendIntensity=.85,c.updateGtaoMaterial({radius:1.1,distanceExponent:1.4,thickness:2,scale:1.1,samples:12,distanceFallOff:1,screenSpaceRadius:!1}),c.updatePdMaterial({lumaPhi:10,depthPhi:2,normalPhi:3,radius:5,rings:2,samples:8}),i.addPass(c)}const a=this.qcfg.bloomScale,r=new ri(new ot(n*a,e*a),.62,.5,.78);i.addPass(r),i.addPass(new uv),i.addPass(new Rf({uniforms:{tDiffuse:{value:null}},vertexShader:"varying vec2 vUv; void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }",fragmentShader:`
          uniform sampler2D tDiffuse;
          varying vec2 vUv;
          void main() {
            vec3 c = texture2D(tDiffuse, vUv).rgb;
            float l = dot(c, vec3(0.2126, 0.7152, 0.0722));
            // 写实调色：轻微饱和与对比（AgX 已经压过高光），弱分离色调，柔和暗角
            c = mix(vec3(l), c, 1.3);
            c = mix(c, c * c * (3.0 - 2.0 * c), 0.32);
            c += vec3(-0.006, 0.0, 0.01) * (1.0 - l) + vec3(0.012, 0.005, -0.008) * l * 0.6;
            vec2 q = vUv - 0.5;
            float vig = smoothstep(0.98, 0.3, length(q * vec2(1.0, 1.12)));
            c *= mix(0.86, 1.0, vig);
            gl_FragColor = vec4(clamp(c, 0.0, 1.0), 1.0);
          }
        `})),i.setPixelRatio(Math.min(window.devicePixelRatio,this.qcfg.pixelRatio)),i.setSize(n,e),this.composer=i,this.bloomPass=r}catch{this.composer=void 0}}setNodes(n,e,o=!0){if(this.nodes=n,this.currentId=e,this.rebuildPath(),this.rebuildDecor(),o)this.rebuildNodesAsync();else{this.rebuildToken++;for(const s of this.nodeGroups.values())this.scene.remove(s),mi(s);this.nodeGroups.clear(),this.pickables=[]}this.teleportToNode(e),this.updateDynamicLightBudget(!0)}resume(){this.paused&&(this.paused=!1,this._fpsTs=0,this._fpsFrames=0,this.player.setEnabled(!this.spectatorMode),this.onResize(),this.animId||this.animate())}pause(){this.paused=!0,this.player.setEnabled(!1),this.animId&&(cancelAnimationFrame(this.animId),this.animId=0)}setSpectatorMode(n){this.spectatorMode=n,this.player.setStickInput(0,0),this.player.setEnabled(!n&&!this.paused),this.explorer&&(this.explorer.visible=!n)}tryInteract(){var n,e;return this.spectatorMode||this.paused?!1:this.nearPickup?((n=this.onPickupCollect)==null||n.call(this,this.nearPickup.id),!0):(e=this.nearNode)!=null&&e.unlocked?(this.onNodeClick(this.nearNode.id),!0):!1}setStickInput(n,e){this.player.setStickInput(n,e)}setBiome(n){this.activeUnitId=n,this.activeWorldId=void 0,this.activeWorldTitle=void 0,this.hasSpectatorFocus=!1;const e=a4(n);this.currentBiome=e,this.grassMesh&&(this.grassMesh.visible=["coast","forest","plains"].includes(e.decorStyle)),this.updateGrassPlacement(!0),this.applyBiomeToSky(e),this.applyBiomeToLights(e),this.buildEnvironment(e),this.applyBiomeToTerrain(e,!1),this.applyOutfitFromBiome(e),this.mountains&&(this.mountains.visible=e.decorStyle==="forest"||e.decorStyle==="plains"),this.scene.fog=new lr(e.fogColor,e.fogDensity)}setSubWorld(n,e){if(this.activeWorldId===n&&this.activeWorldTitle===e)return;this.activeWorldId=n,this.activeWorldTitle=e;const o=An(n);if(this.hasSpectatorFocus=!1,this.applyBiomeToTerrain(this.currentBiome,o),this.applySunDiscScale(o),this.mountains&&(this.mountains.visible=!o&&(this.currentBiome.decorStyle==="forest"||this.currentBiome.decorStyle==="plains")),this.grassMesh&&(this.grassMesh.visible=["coast","forest","plains"].includes(this.currentBiome.decorStyle)&&!o,this.updateGrassPlacement(!0)),this.bloomPass&&(this.bloomPass.strength=o?.2:bt.clamp(.5+(1.5-this.currentBiome.sunIntensity)*.28,.45,1.05)),this.activeUnitId&&this.nodes.length>0&&(this.rebuildUnitLandscape(),An(n))){const s=this.nodes.find(i=>i.id===this.currentId)??this.nodes[0];if(s){const i=Ot(s.x,s.z,It);this.spectatorFocus.set(s.x-3.5,i+4.8,s.z+11.5),this.hasSpectatorFocus=!0,this.player.yaw=0,this.player.setPosition(s.x,i,s.z+2.5),this.avatarYaw=0,this.explorerCam.resetBehind(0)}}}setOutfitAccent(n){var o;const e=(o=this.explorer)==null?void 0:o.userData.rig;if(e){e.mats.trim.color.setHex(n),e.mats.trim.emissive.setHex(n).multiplyScalar(.4),e.mats.cape.color.setHex(n),e.mats.cape.emissive.setHex(n).multiplyScalar(.35);return}this.usingGlb&&this.explorer&&this.explorer.traverse(s=>{const i=s,a=i.material;if(i.isMesh&&a&&"emissive"in a){const r=i.name;/^Torso$|^Body$/i.test(r)?(a.color.setHex(n),a.emissive.setHex(n).multiplyScalar(.14)):a.emissive.setHex(n).multiplyScalar(.06)}})}setExpression(n){this.expression=n,this.usingGlb&&this.playGlbEmote(n)}playGlbEmote(n){var a;if(!this.mixer||!this.glbClips||!this.glbIdle)return;const e=n==="happy"?"Wave":n==="surprised"?"Jump":null;if(!e){this.glbEmoting=!1,this.glbIdle.reset().fadeIn(.3).play();return}const o=this.glbClips.find(r=>r.name===e);if(!o)return;const s=this.mixer.clipAction(o);s.setLoop(l1,1),s.clampWhenFinished=!1,s.reset().play(),(a=this.glbWalk)==null||a.setEffectiveWeight(0),this.glbIdle.crossFadeTo(s,.2,!1),this.glbEmoting=!0;const i=r=>{var c;r.action===s&&(this.glbEmoting=!1,s.crossFadeTo(this.glbIdle.reset().play(),.3,!1),(c=this.mixer)==null||c.removeEventListener("finished",i))};this.mixer.addEventListener("finished",i)}applyOutfitFromBiome(n){this.setOutfitAccent(n.crystalColor)}minimapPalette(){const n=this.currentBiome,[e,o,s]=n.terrainTint,i=Math.round(e*255)<<16|Math.round(o*255)<<8|Math.round(s*255),a=Math.min(255,Math.round(e*255)+70)<<16|Math.min(255,Math.round(o*255)+80)<<8|Math.min(255,Math.round(s*255)+60);return{ground:i,highland:a,path:n.pathColor}}grassKey(n,e){return(n+1e5)*262147+(e+1e5)}hideGrassSlot(n){var o;const e=this.grassMesh;e&&(this.grassDummy.position.set(0,-9999,0),this.grassDummy.rotation.set(0,0,0),this.grassDummy.scale.setScalar(0),this.grassDummy.updateMatrix(),e.setMatrixAt(n,this.grassDummy.matrix),(o=this.flowerMesh)==null||o.setMatrixAt(n,this.grassDummy.matrix))}placeGrass(n,e,o){const s=this.grassMesh;if(!s)return;const i=this.grassCellSize,a=gi(e*1.7,o*2.3),r=gi(e*3.1+5,o*1.3+7),c=gi(e*.7+11,o*2.9+3),l=(e+.5)*i+(a-.5)*i,d=(o+.5)*i+(r-.5)*i,f=Ot(l,d,It),u=1.2,h=(Ot(l+u,d,It)-Ot(l-u,d,It))/(2*u),p=(Ot(l,d+u,It)-Ot(l,d-u,It))/(2*u),x=Math.hypot(h,p);if(x>.85){this.hideGrassSlot(n);return}const m=o5(l,d-Zo),g=e5({normalY:1/Math.sqrt(1+x*x),height:f-dr,...m}),v=g[2]+g[3]+g[4];if(gi(e*9.1+3,o*4.7+1)<v*.9){this.hideGrassSlot(n);return}this.grassDummy.position.set(l,f,d),this.grassDummy.rotation.set(0,c*Math.PI*2,0);const w=.68+r*.45;this.grassDummy.scale.set(w*(1-.25*v),(.72+a*.45)*(1-.55*v-.15*g[1]),w*(1-.25*v)),this.grassDummy.updateMatrix(),s.setMatrixAt(n,this.grassDummy.matrix);const M=r;this.grassColor.copy(this.grassBaseColor).lerp(this.grassDryColor,Math.min(1,g[1]*.9+v*.8)),this.grassColor.getHSL(this.grassHsl),this.grassColor.setHSL((this.grassHsl.h+(M-.5)*.06+1)%1,this.grassHsl.s,this.grassHsl.l*(1+(a-.5)*.24)),this.grassColor.r=this.grassColor.r*1.2/.19,this.grassColor.g=this.grassColor.g*1.2/.3,this.grassColor.b=this.grassColor.b*1.2/.088,s.setColorAt(n,this.grassColor);const y=this.flowerMesh;if(y){const b=Co(l*.035+210,d*.035+55,2),T=gi(e*5.3+9,o*7.1+2);if(b>.54&&T>.25){this.grassDummy.position.set(l+(c-.5)*i*.8,f,d+(a-.5)*i*.8),this.grassDummy.rotation.set(0,r*6.28,0);const _=1.1+T*1.1;this.grassDummy.scale.set(_,_*(.8+c*.5),_),this.grassDummy.updateMatrix(),y.setMatrixAt(n,this.grassDummy.matrix);const S=[16184040,16044874,15233935,11109864,15899210],E=Math.floor(b*17)%S.length,A=T>.85?Math.floor(a*S.length):E;this.grassColor.setHex(S[A]),y.setColorAt(n,this.grassColor)}else this.grassDummy.position.set(0,-9999,0),this.grassDummy.scale.setScalar(0),this.grassDummy.updateMatrix(),y.setMatrixAt(n,this.grassDummy.matrix)}}updateGrassPlacement(n=!1){const e=this.grassMesh;if(!e||!e.visible)return;const o=this.player.position.x,s=this.player.position.z;if(!n){const h=o-this.grassLastX,p=s-this.grassLastZ;if(h*h+p*p<9)return}this.grassLastX=o,this.grassLastZ=s;const i=this.grassCellSize,a=this.grassRadius,r=a*a,c=Math.floor((o-a)/i),l=Math.ceil((o+a)/i),d=Math.floor((s-a)/i),f=Math.ceil((s+a)/i),u=this.grassNeeded;u.clear();for(let h=c;h<=l;h++)for(let p=d;p<=f;p++){const x=(h+.5)*i-o,m=(p+.5)*i-s;x*x+m*m>r||u.add(this.grassKey(h,p))}for(const[h,p]of this.grassCellMap)u.has(h)||(this.grassCellMap.delete(h),this.hideGrassSlot(p),this.grassFreeSlots.push(p));for(const h of u){if(this.grassCellMap.has(h))continue;const p=this.grassFreeSlots.pop();if(p===void 0)break;const x=h%262147-1e5,m=(h-(x+1e5))/262147-1e5;this.placeGrass(p,m,x),this.grassCellMap.set(h,p)}e.instanceMatrix.needsUpdate=!0,e.instanceColor&&(e.instanceColor.needsUpdate=!0),this.flowerMesh&&(this.flowerMesh.instanceMatrix.needsUpdate=!0,this.flowerMesh.instanceColor&&(this.flowerMesh.instanceColor.needsUpdate=!0))}disposeWaterBodies(){for(const n of this.waterBodies)n.dispose();this.waterBodies=[]}updateFace(n,e){this.blinkTimer-=e,this.blinkTimer<=0&&(this.blink=1,this.blinkTimer=2.4+Math.random()*3.2),this.blink=Math.max(0,this.blink-e*9);const o=1-this.blink*.85;n.eyeL.scale.y=o,n.eyeR.scale.y=o;const s=this.nearNode||this.nearPickup?"happy":this.expression;let i=n.faceRest.browY,a=1,r=1,c=n.faceRest.mouthY;s==="happy"?(i+=.006,a=1.45,r=.9,c-=.004):s==="surprised"&&(i+=.014,a=.6,r=2.2,c-=.006);const l=Math.min(1,e*8);n.brow.position.y+=(i-n.brow.position.y)*l,n.mouth.scale.x+=(a-n.mouth.scale.x)*l,n.mouth.scale.y+=(r-n.mouth.scale.y)*l,n.mouth.position.y+=(c-n.mouth.position.y)*l}setPickups(n){this.pickupData=n,this.rebuildPickups()}markPickupCollected(n){var s,i;const e=this.pickupData.find(a=>a.id===n);e&&(e.collected=!0);const o=this.pickupMeshes.get(n);o&&(o.userData.dying=!0,o.userData.dieTimer=0),((s=this.nearPickup)==null?void 0:s.id)===n&&(this.nearPickup=null,(i=this.onPickupNear)==null||i.call(this,null))}tryCollectPickup(){var n;return this.nearPickup?((n=this.onPickupCollect)==null||n.call(this,this.nearPickup.id),!0):!1}dispose(){var n,e,o,s,i,a,r,c,l,d,f;if(cancelAnimationFrame(this.animId),this.animId=0,this.renderer.domElement.removeEventListener("pointerdown",this.onPointerDown),this.explorerCam.disposeDrag(),window.removeEventListener("keydown",this.onKeyDown),window.removeEventListener("resize",this.onResize),document.removeEventListener("visibilitychange",this.onVisibilityChange),(n=this.resizeObserver)==null||n.disconnect(),(e=this.vegetation)==null||e.dispose(),this.vegetation=void 0,(o=this.nearScatter)==null||o.dispose(),this.nearScatter=void 0,this.player.dispose(),In(this.scene,this.pathGroup),In(this.scene,this.decorGroup),In(this.scene,this.waterGroup),In(this.scene,this.mountains),In(this.scene,this.clouds),In(this.scene,this.unitLandscape),In(this.scene,this.explorer),this.removePickupGroup(),this.grassMesh&&(this.scene.remove(this.grassMesh),this.grassMesh.geometry.dispose(),this.grassMesh.material.dispose()),this.sunDisc&&(this.scene.remove(this.sunDisc),(s=this.sunDisc.material.map)==null||s.dispose(),this.sunDisc.material.dispose()),this.dustGroup){this.scene.remove(this.dustGroup);const u=(i=this.dustPool[0])==null?void 0:i.material;(a=u==null?void 0:u.map)==null||a.dispose();for(const h of this.dustPool)h.material.dispose();this.dustPool=[]}if(this.motes){this.scene.remove(this.motes),this.motes.geometry.dispose();const u=this.motes.material;(r=u.map)==null||r.dispose(),u.dispose(),this.motes=void 0}this.disposeWaterBodies(),(c=this.mixer)==null||c.stopAllAction(),(l=this.composer)==null||l.dispose();for(const u of this.nodeGroups.values())mi(u);this.pickupMeshes.clear(),this.terrain&&(this.terrain.geometry.dispose(),this.terrain.material.dispose(),(d=this.terrainTex)==null||d.dispose(),this.terrainTex=void 0),(f=this.envRT)==null||f.dispose(),this.skyDome&&(this.skyDome.geometry.dispose(),this.skyDome.material.dispose()),I5(),C3(),this.renderer.dispose(),this.renderer.domElement.remove()}spawnExplorer(){In(this.scene,this.explorer),this.explorer=Cx(),this.contactShadow=Ll(1.9),this.explorer.add(this.contactShadow),this.scene.add(this.explorer),this.explorer.visible=!this.spectatorMode,this.applyOutfitFromBiome(this.currentBiome),this.tryLoadGlbAvatar()}async tryLoadGlbAvatar(){var n;try{const e=await Nf(),o=(n=e==null?void 0:e.world)==null?void 0:n.avatar;if(!e||!o)return;const s=await ex(o.file,o,e);if(!s)return;if(In(this.scene,this.explorer),tx(s.group),this.explorer=s.group,this.contactShadow=Ll(1.9),this.explorer.add(this.contactShadow),this.explorer.position.copy(this.player.position),this.explorer.quaternion.setFromEuler(new fs(0,this.avatarYaw,0)),this.scene.add(this.explorer),this.usingGlb=!0,s.clips.length){this.mixer=new d1(this.explorer),this.glbClips=s.clips;const i=s.clips.find(r=>/idle|stand|breath/i.test(r.name))??s.clips[0];this.glbIdle=this.mixer.clipAction(i),this.glbIdle.play();const a=s.clips.find(r=>/walk|run|move/i.test(r.name));a&&(this.glbWalk=this.mixer.clipAction(a),this.glbWalk.play(),this.glbWalk.setEffectiveWeight(0))}}catch{}}teleportToNode(n){const e=this.nodes.find(s=>s.id===n)??this.nodes[0];if(!e)return;const o=Ot(e.x,e.z,It);this.player.yaw=0,this.player.setPosition(e.x+4,o,e.z-8),this.explorer&&(this.explorer.position.copy(this.player.position),this.explorer.rotation.set(0,this.player.yaw,0),this.explorer.quaternion.setFromEuler(this.explorer.rotation)),this.avatarYaw=this.player.yaw,this.avatarLean=0,this.explorerCam.resetBehind(this.player.yaw),this.camera.position.set(e.x+10,o+7,e.z-16),this.camera.lookAt(e.x,o+1.5,e.z)}buildSky(){const n=new nn({side:Dn,depthWrite:!1,uniforms:{topColor:{value:new oe(3824266)},midColor:{value:new oe(5929642)},bottomColor:{value:new oe(659488)},horizonColor:{value:new oe(12439772)},sunDir:{value:new X(.5,.72,.36).normalize()},sunColor:{value:new oe(16773320)},uTime:{value:0}},vertexShader:`
        varying vec3 vWorldPosition;
        void main() {
          vec4 wp = modelMatrix * vec4(position, 1.0);
          vWorldPosition = wp.xyz;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,fragmentShader:`
        uniform vec3 topColor, midColor, bottomColor, horizonColor, sunColor, sunDir;
        uniform float uTime;
        varying vec3 vWorldPosition;
        float sHash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
        float sNoise(vec2 p) {
          vec2 i = floor(p), f = fract(p);
          f = f * f * (3.0 - 2.0 * f);
          return mix(mix(sHash(i), sHash(i + vec2(1.0, 0.0)), f.x), mix(sHash(i + vec2(0.0, 1.0)), sHash(i + vec2(1.0, 1.0)), f.x), f.y);
        }
        float sFbm(vec2 p) {
          float v = 0.0, a = 0.5;
          for (int i = 0; i < 6; i++) { v += a * sNoise(p); p = p * 2.07 + 13.1; a *= 0.5; }
          return v;
        }
        // 积云密度：基础覆盖 + 边缘侵蚀
        float cumulus(vec2 p, float t) {
          vec2 q = p + vec2(t * 0.010, t * 0.004);
          float base = sFbm(q * 0.9);
          float detail = sFbm(q * 3.2 + 7.0);
          return smoothstep(0.55, 0.8, base * 0.82 + detail * 0.26);
        }
        void main() {
          vec3 dir = normalize(vWorldPosition - cameraPosition);
          float h = dir.y;
          vec3 sd3 = normalize(sunDir);
          float sd = max(dot(dir, sd3), 0.0);

          // 天色：地平线雾色 → 中层 → 天顶，指数过渡让地平线带更宽更柔
          float up = clamp(h, 0.0, 1.0);
          vec3 col = mix(horizonColor, midColor, pow(smoothstep(0.0, 0.75, up), 0.9));
          col = mix(col, topColor, pow(smoothstep(0.25, 1.0, up), 0.9));
          col = mix(col, bottomColor, smoothstep(0.0, -0.35, h) * 0.55);
          // 地平线下方直接用雾色（和远处地形 / 山体融为一体）
          col = mix(col, horizonColor, smoothstep(0.02, -0.06, h));

          // 太阳：核心 + 光晕 + 米氏前向散射（靠近地平线更暖）
          float warm = 1.0 - clamp(sd3.y * 1.6, 0.0, 1.0);
          vec3 sunTint = mix(sunColor, vec3(1.0, 0.62, 0.34), warm * 0.7);
          col += sunTint * pow(sd, 6.0) * 0.18;
          col += sunTint * pow(sd, 64.0) * 0.55;
          col += sunTint * smoothstep(0.9993, 0.9998, sd) * 2.4;
          col += sunTint * exp(-abs(h) * 6.0) * (0.04 + pow(sd, 3.0) * 0.32);

          // 云：积云层（有明暗体积）+ 高空卷云
          if (h > 0.015) {
            vec2 cp = dir.xz / (h + 0.28) * 1.15;
            float d = cumulus(cp, uTime);
            // 向太阳方向偏移采样一次：密度差决定受光面 / 背光面
            float dS = cumulus(cp + sd3.xz * 0.075, uTime);
            float lit = clamp(0.62 + (d - dS) * 3.2, 0.0, 1.0);
            vec3 shade = mix(vec3(0.54, 0.6, 0.7), vec3(1.02, 0.99, 0.96), lit);
            shade = mix(shade, shade * vec3(1.0, 0.86, 0.72), warm * 0.5);
            shade += sunTint * pow(sd, 5.0) * 0.28 * (1.0 - d * 0.5);
            // 云底更暗，云顶边缘透光
            shade *= 0.88 + 0.12 * smoothstep(0.0, 0.5, d);
            float fadeH = smoothstep(0.015, 0.2, h);
            col = mix(col, shade, d * 0.94 * fadeH);

            vec2 ci = dir.xz / (h + 0.1) * vec2(0.5, 1.9) + vec2(uTime * 0.006, 0.0);
            float cir = smoothstep(0.52, 0.88, sFbm(ci * 1.4)) * smoothstep(0.18, 0.6, h);
            col = mix(col, vec3(1.0), cir * 0.2);
          }
          gl_FragColor = vec4(col, 1.0);
        }
      `});this.skyDome=new V(new Se(560,48,32),n),this.scene.add(this.skyDome);const e=new Float32Array(2e3*3),o=fn(42);for(let a=0;a<2e3;a++){const r=300+o()*80,c=o()*Math.PI*2,l=o()*Math.PI*.45;e[a*3]=r*Math.sin(l)*Math.cos(c),e[a*3+1]=r*Math.cos(l)+30,e[a*3+2]=r*Math.sin(l)*Math.sin(c)+Zo}const s=new jt;s.setAttribute("position",new lt(e,3)),this.scene.add(new ga(s,new ma({color:15265528,size:.42,transparent:!0,opacity:0,sizeAttenuation:!0,visible:!1})));const i=new Ks({map:this.makeGlowTexture(),color:16773320,transparent:!0,depthWrite:!1,blending:ys,fog:!1});this.sunDisc=new qs(i),this.sunDisc.scale.set(52,52,1),this.scene.add(this.sunDisc)}buildEnvironment(n){var e;try{const o=new Br(this.renderer),s=new Dc,i=new nn({side:Dn,depthWrite:!1,uniforms:{topColor:{value:new oe(n.skyTop)},midColor:{value:new oe(n.skyMid)},bottomColor:{value:new oe(n.skyBot)},sunColor:{value:new oe(n.sunColor)},sunDir:{value:new X(.5,.72,.36).normalize()}},vertexShader:`
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
        `});s.add(new V(new Se(10,32,24),i));const a=o.fromScene(s,.02);(e=this.envRT)==null||e.dispose(),this.envRT=a,this.scene.environment=a.texture,s.traverse(r=>{const c=r;c.isMesh&&(c.geometry.dispose(),c.material.dispose())}),o.dispose()}catch{}}makeGlowTexture(){const e=document.createElement("canvas");e.width=e.height=256;const o=e.getContext("2d"),s=o.createRadialGradient(256/2,256/2,0,256/2,256/2,256/2);s.addColorStop(0,"rgba(255,255,255,1)"),s.addColorStop(.18,"rgba(255,245,210,0.95)"),s.addColorStop(.5,"rgba(255,210,140,0.35)"),s.addColorStop(1,"rgba(255,200,120,0)"),o.fillStyle=s,o.fillRect(0,0,256,256);const i=new Zt(e);return i.colorSpace=yt,i}buildDust(){const n=this.makeCloudTexture(),e=new Xe;for(let o=0;o<28;o++){const s=new Ks({map:n,color:13483942,transparent:!0,opacity:0,depthWrite:!1}),i=new qs(s);i.visible=!1,i.userData={life:0,vx:0,vy:0,vz:0},e.add(i),this.dustPool.push(i)}this.dustGroup=e,this.scene.add(e)}buildMotes(){const n=this.quality==="low"?70:this.quality==="med"?120:190,e=fn(7311),o=new Float32Array(n*3);for(let i=0;i<n;i++)o[i*3]=(e()-.5)*Fo,o[i*3+1]=e()*pd,o[i*3+2]=(e()-.5)*Fo;const s=new jt;s.setAttribute("position",new lt(o,3)),this.motes=new ga(s,new ma({map:this.makeGlowTexture(),color:this.currentBiome.sunColor,size:.5,transparent:!0,opacity:.55,depthWrite:!1,blending:ys,sizeAttenuation:!0,fog:!1})),this.motes.frustumCulled=!1,this.moteBase=o.slice(),this.scene.add(this.motes)}updateMotes(n,e){if(!this.motes||!this.moteBase)return;const o=this.player.position.x,s=this.player.position.z,i=this.player.position.y,a=this.motes.geometry.attributes.position,r=a.array,c=Fo/2;for(let d=0;d<a.count;d++){const f=this.moteBase[d*3],u=this.moteBase[d*3+1],h=this.moteBase[d*3+2];let p=f-o,x=h-s;p=((p+c)%Fo+Fo)%Fo-c,x=((x+c)%Fo+Fo)%Fo-c,r[d*3]=o+p+Math.sin(n*.35+d*1.7)*.9,r[d*3+1]=i+.4+(u+n*.12*(.4+d%5*.15))%pd+Math.sin(n*.6+d)*.25,r[d*3+2]=s+x+Math.cos(n*.3+d*2.3)*.9}a.needsUpdate=!0;const l=this.motes.material;l.color.setHex(this.currentBiome.sunColor),l.opacity=.26+Math.sin(n*.8)*.07}emitDust(n,e,o){let s=0;for(const i of this.dustPool){if(i.userData.life>0)continue;i.position.set(n+(Math.random()-.5)*.2,e+.05,o+(Math.random()-.5)*.2),i.userData.life=1,i.userData.vx=(Math.random()-.5)*.6,i.userData.vy=.3+Math.random()*.45,i.userData.vz=(Math.random()-.5)*.6;const a=.3+Math.random()*.2;if(i.scale.set(a,a,1),i.visible=!0,i.material.opacity=.5,++s>=3)break}}updateDust(n){for(const e of this.dustPool){const o=e.userData.life;if(o<=0)continue;const s=o-n*1.4;if(e.userData.life=s,s<=0){e.visible=!1;continue}e.userData.vy=e.userData.vy-n*.6,e.position.x+=e.userData.vx*n,e.position.y+=e.userData.vy*n,e.position.z+=e.userData.vz*n,e.material.opacity=s*.5;const i=(1.3-s)*.6+.3;e.scale.set(i,i,1)}}buildLights(){this.hemi=new f1(13164799,2373672,.5),this.scene.add(this.hemi),this.ambientLight=new u1(10137804,.18),this.scene.add(this.ambientLight),this.sun=new zr(16774368,1.45),this.sun.position.set(55,72,35),this.sun.castShadow=!0,this.sun.shadow.mapSize.set(this.qcfg.shadowMap,this.qcfg.shadowMap);const n=this.sun.shadow.camera;n.near=8,n.far=340,n.left=n.bottom=-70,n.right=n.top=70,this.sun.shadow.bias=-3e-4,this.sun.shadow.normalBias=.04,this.scene.add(this.sun,this.sun.target);const e=new zr(14674175,.22);e.position.set(-40,28,-30);const o=new ro(10864895,.1,160);o.position.set(-35,28,Zo),o.userData.isGlobalLight=!0,this.scene.add(e,o)}updateDynamicLightBudget(n=!1){if(!n&&++this.dynamicLightBudgetFrames<30)return;this.dynamicLightBudgetFrames=0;const e=[];this.scene.traverse(o=>{const s=o;if(s.userData.isGlobalLight||!s.isLight||!s.isPointLight&&!s.isSpotLight)return;const i=s;i.getWorldPosition(this._lightPosition),e.push({light:i,distance:this._lightPosition.distanceToSquared(this.player.position)})}),e.sort((o,s)=>o.distance-s.distance);for(let o=0;o<e.length;o++)e[o].light.visible=o<this.dynamicLightLimit}applyBiomeToSky(n){if(!this.skyDome)return;const e=this.skyDome.material;e.uniforms.topColor.value.setHex(n.skyTop),e.uniforms.midColor.value.setHex(n.skyMid),e.uniforms.bottomColor.value.setHex(n.skyBot),e.uniforms.horizonColor.value.setHex(n.fogColor),e.needsUpdate=!0}applyBiomeToLights(n){this.hemi&&(this.hemi.color.setHex(n.hemiSky),this.hemi.groundColor.setHex(n.hemiGround)),this.ambientLight&&this.ambientLight.color.setHex(n.ambientColor),this.sun&&(this.sun.color.setHex(n.sunColor),this.sun.intensity=n.sunIntensity),this.sunDisc&&(this.sunDisc.material.color.setHex(n.sunColor),this.applySunDiscScale(An(this.activeWorldId))),this.bloomPass&&(this.bloomPass.strength=bt.clamp(.5+(1.5-n.sunIntensity)*.28,.45,1.05))}applySunDiscScale(n){if(!this.sunDisc)return;const e=n?this.currentBiome.sunFocusedDiscScale??this.currentBiome.sunDiscScale??52:this.currentBiome.sunDiscScale??52;this.sunDisc.scale.set(e,e,1)}applyBiomeToTerrain(n,e){if(!this.terrain)return;const o=this.terrain.material;o.color.setRGB(1,1,1),o.vertexColors=!0,o.roughness=e?.95:.9,o.metalness=.02,o.needsUpdate=!0,this.terrainUniforms.uTerrDesat.value=e?.72:1,this.applyTerrainTextures(dl(nd(n))),this.paintTerrain(n,e)}applyTerrainTextures(n){var s,i;const e=this.quality==="low"?256:512,o=`${n.grass}-${n.dirt}-${n.rock}-${e}`;if(this.grassBaseColor.setHex(n.grass),this.grassDryColor.setHex(n.dryGrass),((s=this.terrainTex)==null?void 0:s.key)!==o){const a=Math.min(this.renderer.capabilities.getMaxAnisotropy(),this.quality==="high"?8:4),r=r4(n,e,20260616,a);this.terrainUniforms.uTerrAlbedo.value=r.albedo,this.terrainUniforms.uTerrNormal.value=r.normal,(i=this.terrainTex)==null||i.dispose(),this.terrainTex=r}for(const[a,r]of this.grassCellMap){const c=a%262147-1e5,l=(a-(c+1e5))/262147-1e5;this.placeGrass(r,l,c)}this.grassMesh&&(this.grassMesh.instanceMatrix.needsUpdate=!0,this.grassMesh.instanceColor&&(this.grassMesh.instanceColor.needsUpdate=!0)),this.flowerMesh&&(this.flowerMesh.instanceMatrix.needsUpdate=!0,this.flowerMesh.instanceColor&&(this.flowerMesh.instanceColor.needsUpdate=!0))}rebuildPickups(){this.removePickupGroup(),this.pickupMeshes.clear(),this.pickupGroup=new Xe;for(const n of this.pickupData){if(n.collected)continue;const e=this.createPickupOrb(n);this.pickupGroup.add(e),this.pickupMeshes.set(n.id,e)}this.scene.add(this.pickupGroup),this.updateDynamicLightBudget(!0)}createPickupOrb(n){const e=this.currentBiome,o=new Xe;o.position.set(n.x,n.y,n.z),o.userData.pickupId=n.id;const s=new ge({color:e.orbColor,emissive:new oe(e.orbColor),emissiveIntensity:1.8,roughness:.1,metalness:.4,transparent:!0,opacity:.92}),i=new V(new Se(.32,14,10),s);i.userData.isOrbCore=!0,o.add(i);const a=new Tt({color:e.glowColor,transparent:!0,opacity:.22,side:Dn,depthWrite:!1}),r=new V(new Se(.58,12,8),a);r.userData.isOrbGlow=!0,o.add(r);const c=new he(.52,.04,6,24),l=new Tt({color:e.orbColor,transparent:!0,opacity:.55,depthWrite:!1}),d=new V(c,l);d.userData.isOrbRing=!0,d.rotation.x=Math.PI/3,o.add(d);const f=new ro(e.glowColor,.6,8);f.userData.isOrbLight=!0,o.add(f);const u=this.createWordSprite(n.word,e.orbColor);return u.position.y=1.1,u.userData.isWordSprite=!0,o.add(u),o.userData.baseY=n.y,o.userData.pickupId=n.id,o}createWordSprite(n,e){var d;const s=`#${new oe(e).getHexString()}`,i=document.createElement("canvas");i.width=256,i.height=64;const a=i.getContext("2d");a.clearRect(0,0,256,64),a.fillStyle="rgba(0,0,0,0.52)",(d=a.roundRect)==null||d.call(a,4,8,248,48,12),a.fill(),a.font="bold 26px 'Arial', sans-serif",a.fillStyle=s,a.textAlign="center",a.textBaseline="middle",a.shadowColor=s,a.shadowBlur=8,a.fillText(n,128,34);const r=new Zt(i),c=new Ks({map:r,transparent:!0,depthWrite:!1}),l=new qs(c);return l.scale.set(2.4,.6,1),l}disposePickupResources(n){mi(n)}removePickupGroup(){this.pickupGroup&&(this.scene.remove(this.pickupGroup),this.disposePickupResources(this.pickupGroup),this.pickupGroup=void 0)}buildTerrain(){const n=new Qe(Qo.width,Qo.depth,Ic.w,Ic.d);n.rotateX(-Math.PI/2);const e=n.attributes.position;for(let i=0;i<e.count;i++){const a=e.getX(i),r=e.getZ(i),c=It(a,r);e.setY(i,c)}n.computeVertexNormals(),n.setAttribute("color",new lt(new Float32Array(e.count*3).fill(1),3));const o=new ge({color:16777215,vertexColors:!0,roughness:.9,metalness:.02,envMapIntensity:.32}),s=this.quality!=="low";o.onBeforeCompile=i=>{i.uniforms.uCloudT=Dr,i.uniforms.uTerrAlbedo=this.terrainUniforms.uTerrAlbedo,i.uniforms.uTerrNormal=this.terrainUniforms.uTerrNormal,i.uniforms.uTerrDesat=this.terrainUniforms.uTerrDesat,i.uniforms.uLakeA=this.lakeUniforms.uLakeA,i.uniforms.uLakeL=this.lakeUniforms.uLakeL,i.uniforms.uLakeN=this.lakeUniforms.uLakeN,i.vertexShader=`varying vec3 vTerrWorld;
varying vec3 vTerrN;
`+i.vertexShader.replace("#include <begin_vertex>",`#include <begin_vertex>
         vTerrWorld = (modelMatrix * vec4(transformed, 1.0)).xyz;
         vTerrN = mat3(modelMatrix) * normal;`);const a=[0,1,2,3,4].map(r=>hf[r].toFixed(3)).join(", ");i.fragmentShader=`
        ${s?"#define TERR_HI":"#define TL_LOW"}
        uniform float uCloudT;
        uniform float uTerrDesat;
        uniform vec4 uLakeA[${xs}];
        uniform float uLakeL[${xs}];
        uniform int uLakeN;
        uniform highp sampler2DArray uTerrAlbedo;
        uniform highp sampler2DArray uTerrNormal;
        ${md}
        varying vec3 vTerrWorld;
        varying vec3 vTerrN;
        float tHash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
        float tNoise(vec2 p) {
          vec2 i = floor(p), f = fract(p);
          f = f * f * (3.0 - 2.0 * f);
          return mix(mix(tHash(i), tHash(i + vec2(1.0, 0.0)), f.x), mix(tHash(i + vec2(0.0, 1.0)), tHash(i + vec2(1.0, 1.0)), f.x), f.y);
        }
        ${s5()}
        ${t5()}
        vec4 tlA(float l, vec2 uv, vec2 gx, vec2 gy) { return textureGrad(uTerrAlbedo, vec3(uv, l), gx, gy); }
        vec4 tlN(float l, vec2 uv, vec2 gx, vec2 gy) { return textureGrad(uTerrNormal, vec3(uv, l), gx, gy); }
        const float TL_ROUGH[5] = float[5](${a});
      `+i.fragmentShader.replace("#include <map_fragment>",`
         vec3 tN = normalize(vTerrN);
         vec3 wp = vTerrWorld;
         vec3 dX = dFdx(wp);
         vec3 dY = dFdy(wp);
         const float TS = 0.2857143; // 3.5 m 一块
         vec2 uvA = wp.xz * TS;
         vec2 gxA = dX.xz * TS;
         vec2 gyA = dY.xz * TS;
         vec3 tnz = terrainNoises(vec2(wp.x, wp.z - ${Zo.toFixed(1)}));
         float tHgt = wp.y - (${dr.toFixed(1)});
         float lh[5];
         float w[5];
         for (int k = 0; k < 5; k++) lh[k] = 0.5;
         layerWeights(tN.y, tHgt, tnz.x, tnz.y, tnz.z, lh, w);
         vec4 cc[5];
         cc[0] = tlA(0.0, uvA, gxA, gyA);
         cc[1] = tlA(1.0, uvA, gxA, gyA);
         cc[2] = tlA(2.0, uvA, gxA, gyA);
         cc[3] = tlA(3.0, uvA, gxA, gyA);
         cc[4] = vec4(0.5);
         vec3 tbw = vec3(0.0);
         bool tRock = false;
         vec2 tOff = vec2(0.13, 0.41);
         #ifdef TERR_HI
           tRock = w[4] > 0.003;
           if (tRock) {
             tbw = pow(abs(tN), vec3(4.0));
             tbw /= (tbw.x + tbw.y + tbw.z);
             cc[4] = tlA(4.0, uvA + tOff, gxA, gyA) * tbw.y
                   + tlA(4.0, wp.xy * TS + tOff, dX.xy * TS, dY.xy * TS) * tbw.z
                   + tlA(4.0, wp.zy * TS + tOff, dX.zy * TS, dY.zy * TS) * tbw.x;
           }
         #else
           cc[4] = tlA(4.0, uvA, gxA, gyA);
         #endif
         for (int k = 0; k < 5; k++) lh[k] = cc[k].a;
         layerWeights(tN.y, tHgt, tnz.x, tnz.y, tnz.z, lh, w);
         vec3 tAlb = cc[0].rgb * w[0] + cc[1].rgb * w[1] + cc[2].rgb * w[2] + cc[3].rgb * w[3] + cc[4].rgb * w[4];
         // 主导的平地层
         int td = 0;
         float twm = w[0];
         #ifdef TERR_HI
           for (int k = 1; k < 4; k++) if (w[k] > twm) { twm = w[k]; td = k; }
         #else
           for (int k = 1; k < 5; k++) if (w[k] > twm) { twm = w[k]; td = k; }
         #endif
         #ifdef TERR_HI
           // 去重复：主导层再用旋转 37° 的另一尺度采样，按世界噪声遮罩切换
           mat2 tRot = mat2(0.7986, 0.6018, -0.6018, 0.7986);
           vec2 uvB = tRot * (uvA * 0.61) + vec2(0.31, 0.17);
           vec4 sB = tlA(float(td), uvB, tRot * (gxA * 0.61), tRot * (gyA * 0.61));
           float tMask = smoothstep(0.4, 0.6, tNoise(wp.xz * 0.31));
           tAlb += w[td] * (mix(cc[td].rgb, sB.rgb, tMask) - cc[td].rgb);
         #endif
         vec4 nD = tlN(float(td), uvA, gxA, gyA);
         vec3 tTs = nD.xyz * 2.0 - 1.0;
         tTs.xy *= 0.9;
         vec3 tT = normalize(vec3(1.0, 0.0, 0.0) - tN * tN.x + vec3(0.0, 0.0, 1e-4));
         vec3 tB = cross(tT, tN);
         vec3 tWN = normalize(tT * tTs.x + tB * tTs.y + tN * tTs.z);
         float tRough = 0.0;
         for (int k = 0; k < 5; k++) tRough += w[k] * TL_ROUGH[k];
         tRough += w[td] * (nD.a - TL_ROUGH[td]);
         #ifdef TERR_HI
           if (tRock) {
             vec4 nx_ = tlN(4.0, wp.zy * TS + tOff, dX.zy * TS, dY.zy * TS);
             vec4 ny_ = tlN(4.0, uvA + tOff, gxA, gyA);
             vec4 nz_ = tlN(4.0, wp.xy * TS + tOff, dX.xy * TS, dY.xy * TS);
             vec3 rx = nx_.xyz * 2.0 - 1.0;
             vec3 ry = ny_.xyz * 2.0 - 1.0;
             vec3 rz = nz_.xyz * 2.0 - 1.0;
             rx = vec3(rx.xy + tN.zy, abs(rx.z) * tN.x);
             ry = vec3(ry.xy + tN.xz, abs(ry.z) * tN.y);
             rz = vec3(rz.xy + tN.xy, abs(rz.z) * tN.z);
             vec3 nR = normalize(rx.zyx * tbw.x + ry.xzy * tbw.y + rz.xyz * tbw.z);
             tWN = normalize(mix(tWN, nR, w[4]));
             tRough += w[4] * ((nx_.a * tbw.x + ny_.a * tbw.y + nz_.a * tbw.z) - TL_ROUGH[4]);
           }
         #endif
         float tLum = dot(tAlb, vec3(0.299, 0.587, 0.114));
         tAlb = mix(vec3(tLum), tAlb, uTerrDesat);
         diffuseColor.rgb *= tAlb;
         float tMacro = tNoise(vTerrWorld.xz * 0.035) * 0.6 + tNoise(vTerrWorld.xz * 0.15) * 0.4;
         diffuseColor.rgb *= 0.88 + tMacro * 0.24;
         diffuseColor.rgb *= cloudK(vTerrWorld.xz, uCloudT);
         // 湖岸湿润带：水位 -0.1 ~ +0.5 米之间的土壤变暗、变光滑
         float tWet = 0.0;
         for (int li = 0; li < ${xs}; li++) {
           if (li >= uLakeN) break;
           vec4 lk = uLakeA[li];
           vec2 lq = (wp.xz - lk.xy) / lk.zw;
           if (dot(lq, lq) < 2.1) {
             float lvl = uLakeL[li];
             float lUp = 0.22 + 0.28 * tNoise(wp.xz * 0.9 + float(li) * 13.0);
             float lw = smoothstep(lvl - 0.12, lvl - 0.02, wp.y) * (1.0 - smoothstep(lvl + 0.12, lvl + lUp, wp.y));
             tWet = max(tWet, lw);
           }
         }
         diffuseColor.rgb *= 1.0 - tWet * (0.15 + 0.1 * tNoise(wp.xz * 2.3));`).replace("#include <roughnessmap_fragment>","float roughnessFactor = clamp(tRough, 0.4, 1.0) * (roughness / 0.9) * (1.0 - 0.45 * tWet);").replace("#include <normal_fragment_maps>","normal = normalize((viewMatrix * vec4(tWN, 0.0)).xyz);").replace("#include <fog_fragment>",`#ifdef USE_FOG
           // 远处地形向雾色渐隐（大气透视），并让山谷外缘与远山融为一体
           float tf = 1.0 - exp(-fogDensity * fogDensity * vFogDepth * vFogDepth);
           tf = max(tf, smoothstep(150.0, 340.0, vFogDepth) * 0.92);
           gl_FragColor.rgb = mix(gl_FragColor.rgb, fogColor, tf);
         #endif`)},o.customProgramCacheKey=()=>"terrain-v5-"+this.quality,this.terrain=new V(n,o),this.terrain.receiveShadow=!0,this.terrain.position.set(0,dr,Zo),this.scene.add(this.terrain),this.applyTerrainTextures(dl(nd(this.currentBiome))),this.paintTerrain(this.currentBiome,!1)}paintTerrain(n,e){if(!this.terrain)return;const o=this.terrain.geometry,s=o.attributes.position,i=o.attributes.color,a=i.array;for(let r=0;r<s.count;r++){const c=s.getX(r),l=s.getZ(r),d=s.getY(r),f=Co(c*.017+91,l*.017+47,3)-.5,u=(.86+Co(c*.02+5,l*.02+9,3)*.26+ba(6,34,d)*.1)*(.94+ba(-6,10,d)*.08);a[r*3]=u*(1+f*.16),a[r*3+1]=u,a[r*3+2]=u*(1-f*.16)}i.needsUpdate=!0}buildMountains(){In(this.scene,this.mountains);const n=Kx({count:this.quality==="low"?18:this.quality==="med"?24:30,ringRadius:Math.max(Qo.width,Qo.depth)*.5,originZ:Zo,snow:this.quality!=="low"});this.mountains=n,this.scene.add(n)}buildGrass(){const n=N5(),e=new ge({vertexColors:!0,roughness:.92,metalness:0,side:qe});e.onBeforeCompile=a=>{a.uniforms.uTime={value:0},a.uniforms.uPlayer={value:new X(0,0,0)},a.uniforms.uCloudT=Dr,a.uniforms.uFade={value:new ot(this.grassRadius*.55,this.grassRadius*.96)},this.grassUniforms=a.uniforms,a.vertexShader=`uniform float uTime;
uniform vec3 uPlayer;
uniform vec2 uFade;
uniform float uCloudT;
varying float vCloud;
`+md+a.vertexShader,a.fragmentShader=`varying float vCloud;
`+a.fragmentShader.replace("#include <color_fragment>",`#include <color_fragment>
 diffuseColor.rgb *= vCloud;`),a.vertexShader=a.vertexShader.replace("#include <begin_vertex>",`#include <begin_vertex>
         float gH = position.y / ${_f.toFixed(3)};
         vec4 gWp = instanceMatrix * vec4(0.0, 0.0, 0.0, 1.0);
         vCloud = cloudK(gWp.xz, uCloudT);
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
         transformed.y -= gTramp * gH * 0.4;
         // 外圈渐隐：草簇随距离缩小直至消失，避免铺草范围出现生硬的圆形边界
         transformed *= 1.0 - smoothstep(uFade.x, uFade.y, gd);`)},this.grassRadius=this.qcfg.grassRadius,this.grassCellSize=this.qcfg.grassCell;const o=Math.ceil(Math.PI*this.grassRadius*this.grassRadius/(this.grassCellSize*this.grassCellSize))+96,s=new Gn(n,e,o);s.frustumCulled=!1,s.castShadow=!1,s.receiveShadow=!0,this.grassFreeSlots=[];for(let a=0;a<o;a++)this.grassFreeSlots.push(a),this.hideGrassSlotInit(s,a);s.instanceMatrix.needsUpdate=!0;const i=new Gn(X5(),new ge({vertexColors:!0,roughness:.75,metalness:0,side:qe}),o);i.frustumCulled=!1,i.castShadow=!1;for(let a=0;a<o;a++)this.hideGrassSlotInit(i,a);i.instanceMatrix.needsUpdate=!0,s.add(i),this.flowerMesh=i,this.grassMesh=s,s.visible=this.currentBiome.decorStyle!=="space",this.scene.add(s),this.updateGrassPlacement(!0)}hideGrassSlotInit(n,e){this.grassDummy.position.set(0,-9999,0),this.grassDummy.rotation.set(0,0,0),this.grassDummy.scale.setScalar(0),this.grassDummy.updateMatrix(),n.setMatrixAt(e,this.grassDummy.matrix)}buildClouds(){In(this.scene,this.clouds);const n=this.makeCloudTexture(),e=new Xe;e.position.z=Zo;const o=fn(5150);for(let s=0;s<18;s++){const i=new Ks({map:n,transparent:!0,opacity:.42+o()*.28,depthWrite:!1,fog:!1}),a=new qs(i),r=o()*Math.PI*2,c=130+o()*260;a.position.set(Math.cos(r)*c,86+o()*70,Math.sin(r)*c);const l=70+o()*140;a.scale.set(l,l*(.42+o()*.2),1),e.add(a)}this.clouds=e,e.visible=!1,this.scene.add(e)}makeCloudTexture(){const e=document.createElement("canvas");e.width=e.height=256;const o=e.getContext("2d");o.clearRect(0,0,256,256);for(let i=0;i<26;i++){const a=256*(.25+Math.random()*.5),r=256*(.35+Math.random()*.3),c=256*(.08+Math.random()*.18),l=o.createRadialGradient(a,r,0,a,r,c);l.addColorStop(0,"rgba(255,255,255,0.5)"),l.addColorStop(1,"rgba(255,255,255,0)"),o.fillStyle=l,o.beginPath(),o.arc(a,r,c,0,Math.PI*2),o.fill()}const s=new Zt(e);return s.colorSpace=yt,s}rebuildPath(){if(In(this.scene,this.pathGroup),this.pathGroup=new Xe,this.nodes.length<2){this.scene.add(this.pathGroup);return}const n=!!this.activeUnitId,e=n?this.nodes.slice(1).map(a=>[this.nodes[0],a]):this.nodes.slice(0,-1).map((a,r)=>[a,this.nodes[r+1]]),o=[],s=(a,r)=>Ot(a,r,It);for(const[a,r]of e){const c=a.cleared&&r.cleared,l=Ot(a.x,a.z,It)+.45,d=Ot(r.x,r.z,It)+.45,f=new Vn([new X(a.x,l,a.z),new X(r.x,d,r.z)],!1,"catmullrom",.4);o.push(f),n||this.pathGroup.add(Lx(f,{width:3.4,steps:Math.max(24,Math.ceil(f.getLength()/1.4)),groundY:s,base:c?7301720:7037008,inlay:c?{color:8365455,emissive:4160866,intensity:.1}:{color:6979752,emissive:3822992,intensity:.05}}))}const i=this.quality;if(n){const a=o.map(r=>{const c=r.getLength();return r.getSpacedPoints(Math.max(4,Math.ceil(c/.5))).map(l=>({x:l.x,z:l.z}))});this.pathGroup.add(Yr(a,{width:1.5,groundY:s,seed:1207,quality:i,palette:"unit",lift:()=>.07,startInset:2.5,endInset:1}))}else{const a=zx(this.nodes.map(r=>({x:r.x,z:r.z})),6);this.pathGroup.add(Yr([a],{width:3.4,groundY:s,seed:1207,quality:i}))}if(!n){const a=new Vn(this.nodes.map(p=>new X(p.x,Ot(p.x,p.z,It)+.45,p.z)),!1,"catmullrom",.35),r=H3("rgba(255,220,140,1)"),c=new we(.055,.07,2.6,7),l=new we(.03,.03,.8,5);l.rotateZ(Math.PI/2);const d=new Se(.14,8,6),f=[],u=[],h=[];for(let p=0;p<this.nodes.length;p+=Math.max(1,Math.floor(this.nodes.length/8))){const x=this.nodes[p],m=Math.min(1,(p+.5)/Math.max(1,this.nodes.length-1)),g=a.getTangent(m),v=new X(-g.z,0,g.x).normalize();for(const w of[-1,1]){const M=x.x+v.x*2.2*w,y=x.z+v.z*2.2*w,b=Ot(M,y,It);f.push(c.clone().translate(M,b+1.3,y),l.clone().translate(M+.4*w*-1,b+2.55,y)),u.push(d.clone().translate(M+.8*w*-1,b+2.55,y)),h.push(M+.8*w*-1,b+2.6,y)}}if(c.dispose(),l.dispose(),d.dispose(),f.length>0){const p=new V(Wn(f,!1),V3());p.castShadow=!0;const x=new V(Wn(u,!1),W3(16769152));for(const v of[...f,...u])v.dispose();const m=new jt;m.setAttribute("position",new Jt(h,3));const g=new ga(m,new ma({map:r,size:1.8,sizeAttenuation:!0,transparent:!0,opacity:.7,depthWrite:!1,blending:ys}));g.frustumCulled=!1,this.pathGroup.add(p,x,g)}}this.scene.add(this.pathGroup)}applyWetLakes(n){const e=Math.min(n.length,xs);for(let o=0;o<e;o++){const s=n[o];this.lakeUniforms.uLakeA.value[o].set(s.x,s.z,s.rx,s.rz),this.lakeUniforms.uLakeL.value[o]=s.level}this.lakeUniforms.uLakeN.value=e}addLakeShore(n,e,o,s,i){if(this.decorGroup)for(let a=0;a<n.length;a+=4){const r=n[a],c=1.03+i()*.12,l=e+r.x*c,d=s-r.y*c,f=Ot(l,d,It),u=i();if(u<.55){const h=bl(1+i()*.8);h.position.set(l,Math.min(f,o+.5),d),this.decorGroup.add(h)}else if(u<.68){const h=os(.5+i()*.7);h.position.set(l,f-.03,d),h.rotation.y=i()*Math.PI*2,this.decorGroup.add(h)}}}rebuildDecor(){var T,_;this.disposeWaterBodies(),(T=this.vegetation)==null||T.dispose(),this.vegetation=void 0,(_=this.nearScatter)==null||_.dispose(),this.nearScatter=void 0,In(this.scene,this.decorGroup),In(this.scene,this.waterGroup),this.decorGroup=new Xe,this.waterGroup=new Xe;const n=fn(2024),e=new Set,o=this.activeUnitId?this.nodes.find(S=>S.unlocked)??this.nodes[0]:void 0,s=!!(o&&this.activeUnitId),i=(o==null?void 0:o.x)??0,a=(o==null?void 0:o.z)??Zo,r=(S,E)=>!s&&this.nodes.some(A=>Math.hypot(S-(A.x+4),E-(A.z-8))<26);this.rebuildUnitLandscape();const c=s?this.quality==="low"?8:this.quality==="med"?12:18:this.quality==="low"?16:this.quality==="med"?24:34,l=s?this.quality==="low"?42:this.quality==="med"?64:92:this.quality==="low"?80:this.quality==="med"?120:180;for(const S of this.nodes){const E=fn(S.id.length*997+S.z);for(let A=0;A<c;A++){const R=E()*Math.PI*2,C=s?32+E()*22:6+E()*24,I=S.x+Math.cos(R)*C,L=S.z+Math.sin(R)*C;if(s&&Math.hypot(I-i,L-a)<25||r(I,L))continue;const N=`${Math.round(I)}_${Math.round(L)}`;if(e.has(N))continue;e.add(N);const U=Ot(I,L,It),F=s?.65+E()*.75:.75+E()*1.1;this.addDecorAt(s?this.currentBiome.decorStyle:S.theme,I,U,L,F,E)}}const d=fn(909),f=s?145:Qo.width*.46,u=s?190:Qo.depth*.46,h=this.currentBiome.decorStyle;for(let S=0;S<l;S++){const E=i+(d()-.5)*2*f,A=a+(d()-.5)*2*u;if(s&&Math.hypot(E-i,A-a)<25||r(E,A)||!s&&Math.abs(E)<14)continue;const R=Ot(E,A,It),C=.8+d()*1.5,I=d();if(h==="space"){const L=os(C*.72);L.position.set(E,R-.03,A),L.rotation.set(d()*.12,d()*Math.PI*2,d()*.12),this.decorGroup.add(L);continue}if(!(I<.24))if(I<.46){const L=b0(C);L.position.set(E,R,A),L.rotation.y=d()*Math.PI*2,this.decorGroup.add(L)}else if(I<.62){const L=os(C*.8);L.position.set(E,R-.03,A),L.rotation.set(d()*.12,d()*Math.PI*2,d()*.12),this.decorGroup.add(L)}else if(I<.8){const L=G5(.85+d()*.7);L.position.set(E,R,A),this.decorGroup.add(L)}else if(I<.91){const L=bl(C);L.position.set(E,R,A),L.rotation.y=d()*Math.PI*2,this.decorGroup.add(L)}else{const L=V5(C*.9);L.position.set(E,R+.12,A),this.decorGroup.add(L)}}const p=[[i,a,16],[i,a+9.3,17],[i-21,a-20,6.5],[i+21,a-20,6.5],[i-21,a+20,6.5],[i+21,a+20,6.5],[i-17.4,a+23.2,6],[i,a+28.2,6.5],[i+17.4,a+23.2,6]];s&&h!=="space"&&(this.nearScatter=Xx({centerX:i,centerZ:a,groundY:(S,E)=>Ot(S,E,It),density:this.quality==="low"?.5:this.quality==="med"?.75:1,avoid:p}),this.decorGroup.add(this.nearScatter.group));const x=s&&this.currentBiome.decorStyle==="space"?0:s?2:6,m=[],g=[];for(let S=0;S<x;S++){const E=S%2===0?-1:1,A=i+E*(s?52+n()*18:60+n()*55),R=a-u*.8+S*(u*1.5/x)+n()*18,C=s?34+n()*14:48+n()*26,I=s?24+n()*12:30+n()*18;let L=Ot(A,R,It),N=0;const U=gd(C*.5,I*.5,S*7+3,24);for(const O of U){const B=Ot(A+O.x*.97,R-O.y*.97,It);L=Math.min(L,B),N+=B}const F=(L+N/U.length)/2-.1;m.push({x:A,z:R,rx:C/2*1.15,rz:I/2*1.15});const z=gd(C*.5,I*.5,S*7+3);this.addLakeShore(z,A,F,R,n);const G=t4({outline:z,x:A,y:F,z:R,groundY:(O,B)=>Ot(O,B,It),quality:this.quality});this.waterBodies.push(G),this.waterGroup.add(G.mesh),g.length<xs&&g.push({x:A,z:R,rx:C*.5,rz:I*.5,level:F})}this.applyWetLakes(g);const v=(s?this.nodes.slice(1).map(S=>[this.nodes[0],S]):this.nodes.slice(0,-1).map((S,E)=>[S,this.nodes[E+1]])).map(([S,E])=>({ax:S.x,az:S.z,bx:E.x,bz:E.z,halfWidth:7})),w=s?[[i,a,25],...p]:this.nodes.map(S=>[S.x+4,S.z-8,26]);let M=2024;if(s&&this.activeUnitId){M=7;for(let S=0;S<this.activeUnitId.length;S++)M=Math.imul(M,31)+this.activeUnitId.charCodeAt(S)>>>0}const y=Q5({centerX:i,centerZ:a,halfW:f,halfD:u,quality:this.quality,decorStyle:h,seed:M,groundY:(S,E)=>Ot(S,E,It),avoidCircles:w,avoidEllipses:m,avoidSegments:v,clearCenterStrip:s?0:14});this.vegetation=Af(y,{castShadow:this.quality!=="low"}),this.decorGroup.add(this.vegetation.group);const b=new V(new Qe(s?f*2.2:Qo.width+40,s?u*2.2:Qo.depth+40),new Tt({color:10406143,transparent:!0,opacity:.038,depthWrite:!1}));b.rotation.x=-Math.PI/2,b.position.set(i,5,a),this.decorGroup.add(b),this.scene.add(this.decorGroup,this.waterGroup),this.updateDynamicLightBudget(!0)}rebuildUnitLandscape(){In(this.scene,this.unitLandscape),this.unitLandscape=void 0;const n=this.activeUnitId?this.nodes.find(e=>e.unlocked)??this.nodes[0]:void 0;!n||!this.activeUnitId||(this.unitLandscape=AM(this.currentBiome,n,this.activeWorldId,this.activeWorldTitle,this.quality==="low"?"low":"high"),this.unitLandscape.position.set(n.x,Ot(n.x,n.z,It),n.z),rf(this.unitLandscape),this.scene.add(this.unitLandscape))}addDecorAt(n,e,o,s,i,a){if(n==="forest"||n==="plains"||n==="library"){const r=a()>.4?Ki(i):ks(i*1.05);r.position.set(e,o,s),r.rotation.y=a()*Math.PI*2,this.decorGroup.add(r);return}if(n==="coast"&&a()>.45){const r=os(i*.85);r.position.set(e,o-.03,s),r.rotation.set(a()*.12,a()*Math.PI*2,a()*.12),this.decorGroup.add(r);return}if(a()>.5){const r=os(i*.65);r.position.set(e,o-.03,s),this.decorGroup.add(r)}if(a()>.65){const r=bf(qi(n).accent);r.position.set(e,o,s),this.decorGroup.add(r)}}async rebuildNodesAsync(){const n=++this.rebuildToken;for(const e of this.nodeGroups.values())this.scene.remove(e),mi(e);this.nodeGroups.clear(),this.pickables=[];for(const e of this.nodes){if(n!==this.rebuildToken)return;const o=new Xe,s=Ot(e.x,e.z,It);o.position.set(e.x,s,e.z),o.userData.nodeId=e.id;const{root:i,crystal:a}=await ux(e,e.id===this.currentId);if(n!==this.rebuildToken){mi(i);return}o.add(i),a.userData.nodeId=e.id,this.pickables.push(a);const r=s4(e.name,e.unlocked);o.add(r),e.unlocked||h1(o),this.nodeGroups.set(e.id,o),this.scene.add(o),this.updateDynamicLightBudget(!0)}}bindEvents(){this.renderer.domElement.addEventListener("pointerdown",this.onPointerDown),window.addEventListener("keydown",this.onKeyDown),window.addEventListener("resize",this.onResize),typeof ResizeObserver<"u"&&(this.resizeObserver=new ResizeObserver(this.onResize),this.resizeObserver.observe(this.container)),document.addEventListener("visibilitychange",this.onVisibilityChange)}updateProximity(){var o,s;let n=null,e=p1;for(const i of this.nodes){if(!i.unlocked)continue;const a=this.player.position.x-i.x,r=this.player.position.z-i.z,c=Math.hypot(a,r);c<e&&(e=c,n=i)}(n==null?void 0:n.id)!==((o=this.nearNode)==null?void 0:o.id)&&(this.nearNode=n,(s=this.onProximity)==null||s.call(this,n))}updatePickupProximity(){var o,s;let n=null,e=VM;for(const i of this.pickupData){if(i.collected)continue;const a=this.player.position.x-i.x,r=this.player.position.z-i.z,c=Math.hypot(a,r);c<e&&(e=c,n=i)}(n==null?void 0:n.id)!==((o=this.nearPickup)==null?void 0:o.id)&&(this.nearPickup=n,(s=this.onPickupNear)==null||s.call(this,n))}tickScene(n,e){var o,s,i,a,r,c;if((o=this.vegetation)==null||o.update(this.camera),(s=this.nearScatter)==null||s.update(this.camera),this.updateDynamicLightBudget(),this.waterFrame++,this.sun){const l=n*.02,d=bt.degToRad(34+Math.cos(l)*16),f=Math.sin(l)*.8;this.sunDirV.set(Math.sin(f)*Math.cos(d)+.25,Math.sin(d),-.55*Math.cos(d)).normalize();const u=3,h=Math.round(this.player.position.x/u)*u,p=Math.round(this.player.position.z/u)*u;this.sun.target.position.set(h,this.player.position.y,p),this.sun.target.updateMatrixWorld(),this.sun.position.set(h,this.player.position.y,p).addScaledVector(this.sunDirV,140);const x=bt.clamp((Math.sin(d)-.15)/.6,.3,1),m=An(this.activeWorldId);if(this.sun.color.setHex(this.currentBiome.sunColor).lerp(WM,(1-x)*.6),this.sun.intensity=this.currentBiome.sunIntensity*(m?.92:.88+x*.12),Qs.sunDir.value.copy(this.sunDirV),Qs.sunColor.value.copy(this.sun.color).multiplyScalar(Math.min(this.sun.intensity,3)),Ra.dir.value.copy(this.sunDirV),Ra.color.value.copy(this.sun.color).multiplyScalar(this.sun.intensity/1.45),this.renderer.toneMappingExposure=m?1.16:1.1+x*.08,this.hemi&&(this.hemi.intensity=m?.66:.58+x*.12),this.sunDisc){this.sunDisc.position.copy(this.camera.position).addScaledVector(this.sunDirV,480);const g=m?this.currentBiome.sunFocusedDiscOpacity??this.currentBiome.sunDiscOpacity??1:this.currentBiome.sunDiscOpacity??1;this.sunDisc.material.opacity=bt.clamp(x*1.2*g,0,1)}}if(gf.value=n,this.grassUniforms&&(this.grassUniforms.uTime.value=n,Dr.value=n,this.grassUniforms.uPlayer.value.copy(this.player.position)),this.updateGrassPlacement(),this.clouds&&(this.clouds.rotation.y=n*.006),this.skyDome){this.skyDome.position.copy(this.camera.position);const l=this.skyDome.material.uniforms;l.uTime.value=n,l.sunDir.value.copy(this.sunDirV),l.sunColor.value.setHex(this.currentBiome.sunColor)}this.updateMotes(n,e),(i=this.unitLandscape)==null||i.traverse(l=>{var f,u;const d=l;if((f=d.userData)!=null&&f.isLandscapeRing&&(d.rotation.y+=e*.42),(u=d.userData)!=null&&u.isLandscapeBeacon){d.userData.landscapeBaseY===void 0&&(d.userData.landscapeBaseY=d.position.y);const h=d.userData.landscapeBaseY;d.position.y=h+Math.sin(n*1.5+d.position.x*.08)*.24}});for(const[l,d]of this.pickupMeshes){const f=((a=this.nearPickup)==null?void 0:a.id)===l,u=d.userData.baseY??d.position.y;if(d.userData.dying){d.userData.dieTimer=(d.userData.dieTimer??0)+e*1.4;const h=d.userData.dieTimer;d.scale.setScalar(1-h*.9),d.position.y=u+h*3,d.traverse(p=>{const x=p;x.material&&"opacity"in x.material&&(x.material.opacity*=.85)}),h>=1&&((r=this.pickupGroup)==null||r.remove(d),this.disposePickupResources(d),this.pickupMeshes.delete(l));continue}d.position.y=u+Math.sin(n*1.4+l.length*.5)*.28,d.traverse(h=>{var x,m,g,v,w;const p=h;if((x=p.userData)!=null&&x.isOrbCore){p.rotation.y=n*.8+l.length;const M=f?1+Math.sin(n*4)*.15:1+Math.sin(n*2)*.06;p.scale.setScalar(M);const y=p.material;y.emissiveIntensity=f?3.5+Math.sin(n*5)*.8:1.8+Math.sin(n*2)*.3}if((m=p.userData)!=null&&m.isOrbGlow&&(p.material.opacity=f?.42+Math.sin(n*3)*.15:.18+Math.sin(n*1.5)*.06),(g=p.userData)!=null&&g.isOrbRing&&(p.rotation.z=n*1.2+l.length*.3,p.rotation.x=Math.PI/3+Math.sin(n*.5)*.2,p.material.opacity=f?.8:.45),(v=p.userData)!=null&&v.isOrbLight){const M=p;M.intensity=f?1.4+Math.sin(n*4)*.4:.6+Math.sin(n*2)*.1}if((w=p.userData)!=null&&w.isWordSprite){const M=p;M.material.opacity=f?1:.72+Math.sin(n*1.2)*.12}})}for(const[l,d]of this.nodeGroups){const f=((c=this.nearNode)==null?void 0:c.id)===l;d.traverse(u=>{var p,x,m,g;const h=u;if((p=h.userData)!=null&&p.isSignpost&&(h.visible=!f),(x=h.userData)!=null&&x.isCrystal&&(h.userData.baseY===void 0&&(h.userData.baseY=h.position.y),h.rotation.y=n*.6+l.length*.3,h.position.y=h.userData.baseY+Math.sin(n*1.8+l.length)*(f?.28:.15)),(m=h.userData)!=null&&m.isPulse){const v=1+Math.sin(n*3)*.08;h.scale.set(v,v,v),h.material.opacity=.35+Math.sin(n*3)*.2}(g=h.userData)!=null&&g.isDueRing&&(h.material.opacity=.28+Math.sin(n*2.4+l.length)*.18)})}Qs.time.value=n}}export{$M as World3D};
